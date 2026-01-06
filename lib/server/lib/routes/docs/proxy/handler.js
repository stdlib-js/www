/**
* @license Apache-2.0
*
* Copyright (c) 2025 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var join = require( 'path' ).join;
var fs = require( 'fs' );
var S3Client = require( '@aws-sdk/client-s3' ).S3Client;
var GetObjectCommand = require( '@aws-sdk/client-s3' ).GetObjectCommand;
var mime = require( 'mime-types' );


// VARIABLES //

var SERVE_FROM_R2 = process.env.SERVE_DOCS_FROM_R2 === 'true';
var R2_BUCKET_NAME = process.env.R2_BUCKET_NAME || 'stdlib-docs';
var R2_ENDPOINT = process.env.RCLONE_CONFIG_R2_ENDPOINT;
var s3Client;

// Initialize S3 client if serving from R2:
if ( SERVE_FROM_R2 && R2_ENDPOINT ) {
	s3Client = new S3Client({
		region: 'auto',
		endpoint: R2_ENDPOINT,
		credentials: {
			accessKeyId: process.env.RCLONE_CONFIG_R2_ACCESS_KEY_ID || '',
			secretAccessKey: process.env.RCLONE_CONFIG_R2_SECRET_ACCESS_KEY || ''
		}
	});
}


// FUNCTIONS //

/**
* Serves file from local filesystem.
*
* @private
* @param {Object} request - request object
* @param {Object} reply - reply object
* @param {string} filePath - path to file
* @param {string} docPath - documentation path (e.g., "api/latest/index.html")
* @returns {void}
*/
function serveLocal( request, reply, filePath, docPath ) {
	// Check if file exists:
	if ( !fs.existsSync( filePath ) ) {
		request.log.info( 'File not found: ' + filePath );
		reply.code( 404 ).send( 'Not Found' );
		return;
	}

	// Check if it's a file (not a directory):
	if ( !fs.statSync( filePath ).isFile() ) {
		request.log.info( 'Path is not a file: ' + filePath );
		reply.code( 404 ).send( 'Not Found' );
		return;
	}

	// Determine content type:
	var contentType = mime.lookup( filePath ) || 'application/octet-stream';
	reply.type( contentType );

	// Stream the file:
	var stream = fs.createReadStream( filePath );
	reply.send( stream );
}

/**
* Proxies file from R2 bucket.
*
* @private
* @param {Object} request - request object
* @param {Object} reply - reply object
* @param {string} key - R2 object key
* @returns {void}
*/
async function proxyFromR2( request, reply, key ) {
	var command;
	var response;
	var stream;

	try {
		command = new GetObjectCommand({
			Bucket: R2_BUCKET_NAME,
			Key: key
		});

		response = await s3Client.send( command );

		// Set content type:
		if ( response.ContentType ) {
			reply.type( response.ContentType );
		} else {
			var contentType = mime.lookup( key ) || 'application/octet-stream';
			reply.type( contentType );
		}

		// Stream the response body:
		reply.send( response.Body );

	} catch ( error ) {
		if ( error.name === 'NoSuchKey' || error.$metadata?.httpStatusCode === 404 ) {
			request.log.info( 'File not found in R2: ' + key );
			reply.code( 404 ).send( 'Not Found' );
		} else {
			request.log.error( 'Error fetching from R2: ' + error.message );
			reply.code( 500 ).send( 'Internal Server Error' );
		}
	}
}


// MAIN //

/**
* Callback invoked upon receiving an HTTP request for documentation files.
*
* @private
* @param {Object} request - request object
* @param {Object} reply - reply object
* @returns {void}
*/
function handler( request, reply ) {
	// Extract the path after /docs/:
	var docPath = request.params[ '*' ];
	var filePath;
	var key;

	if ( SERVE_FROM_R2 ) {
		// Proxy to R2:
		key = 'docs/' + docPath;
		proxyFromR2( request, reply, key );
	} else {
		// Serve from local filesystem:
		filePath = join( this.rootDir, '..', docPath );
		serveLocal( request, reply, filePath, docPath );
	}
}


// EXPORTS //

module.exports = handler;
