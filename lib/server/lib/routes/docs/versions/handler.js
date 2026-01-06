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
var ListObjectsV2Command = require( '@aws-sdk/client-s3' ).ListObjectsV2Command;


// VARIABLES //

var SERVE_FROM_R2 = process.env.SERVE_DOCS_FROM_R2 === 'true';
var R2_BUCKET_NAME = process.env.R2_BUCKET_NAME || 'stdlib-docs';

// FUNCTIONS //

/**
* Scans local filesystem for available documentation versions.
*
* @private
* @param {string} docsPath - path to docs directory
* @returns {Array<string>} list of versions
*/
function getLocalVersions( docsPath ) {
	var versions = [];
	var apiPath = join( docsPath, 'api' );
	var tsPath = join( docsPath, 'ts' );
	var files;
	var i;

	// Scan API docs:
	if ( fs.existsSync( apiPath ) ) {
		files = fs.readdirSync( apiPath );
		for ( i = 0; i < files.length; i++ ) {
			if ( fs.statSync( join( apiPath, files[ i ] ) ).isDirectory() ) {
				if ( versions.indexOf( files[ i ] ) === -1 ) {
					versions.push( files[ i ] );
				}
			}
		}
	}

	// Scan TypeScript docs:
	if ( fs.existsSync( tsPath ) ) {
		files = fs.readdirSync( tsPath );
		for ( i = 0; i < files.length; i++ ) {
			if ( fs.statSync( join( tsPath, files[ i ] ) ).isDirectory() ) {
				if ( versions.indexOf( files[ i ] ) === -1 ) {
					versions.push( files[ i ] );
				}
			}
		}
	}

	return versions;
}

/**
* Queries R2 bucket for available documentation versions.
*
* @private
* @param {Function} callback - callback function
* @returns {void}
*/
async function getR2Versions(callback) {
	var endpoint;
	var client;
	var command;
	var response;
	var versions;
	var items;
	var prefix;
	var parts;
	var i;

	// Use R2 API endpoint (not the public bucket URL):
	endpoint = process.env.RCLONE_CONFIG_R2_ENDPOINT;
	if ( !endpoint ) {
		callback( new Error( 'RCLONE_CONFIG_R2_ENDPOINT not configured' ), [] );
		return;
	}

	client = new S3Client({
		region: 'auto',
		endpoint: endpoint,
		credentials: {
			accessKeyId: process.env.RCLONE_CONFIG_R2_ACCESS_KEY_ID || '',
			secretAccessKey: process.env.RCLONE_CONFIG_R2_SECRET_ACCESS_KEY || ''
		}
	});

	versions = {};

	try {
		// List objects in api/ prefix:
		command = new ListObjectsV2Command({
			Bucket: R2_BUCKET_NAME,
			Prefix: 'docs/api/',
			Delimiter: '/'
		});
		response = await client.send( command );

		if ( response.CommonPrefixes ) {
			for ( i = 0; i < response.CommonPrefixes.length; i++ ) {
				prefix = response.CommonPrefixes[ i ].Prefix;
				parts = prefix.split( '/' );
				if ( parts.length >= 3 ) {
					versions[ parts[ 2 ] ] = true;
				}
			}
		}

		// List objects in ts/ prefix:
		command = new ListObjectsV2Command({
			Bucket: R2_BUCKET_NAME,
			Prefix: 'docs/ts/',
			Delimiter: '/'
		});
		response = await client.send( command );

		if ( response.CommonPrefixes ) {
			for ( i = 0; i < response.CommonPrefixes.length; i++ ) {
				prefix = response.CommonPrefixes[ i ].Prefix;
				parts = prefix.split( '/' );
				if ( parts.length >= 3 ) {
					versions[ parts[ 2 ] ] = true;
				}
			}
		}

		callback( null, Object.keys( versions ) );
	} catch ( error ) {
		callback( error, [] );
	}
}


// MAIN //

/**
* Callback invoked upon receiving an HTTP request for available versions.
*
* @private
* @param {Object} request - request object
* @param {Object} reply - reply object
* @returns {void}
*/
function handler( request, reply ) {
	var docsPath;

	if ( SERVE_FROM_R2 ) {
		getR2Versions( function onVersions( error, versions ) {
			if ( error ) {
				request.log.error( 'Error fetching versions from R2: ' + error.message );
				reply.code( 500 ).send({ error: 'Failed to fetch versions' });
				return;
			}
			reply.type( 'application/json' );
			reply.send({ versions: versions });
		});
	} else {
		console.log('hi!')
		docsPath = join( this.rootDir, '..' );
		try {
			reply.type( 'application/json' );
			reply.send({ versions: getLocalVersions( docsPath ) });
		} catch ( error ) {
			request.log.error( 'Error reading local versions: ' + error.message );
			reply.code( 500 ).send({ error: 'Failed to read versions' });
		}
	}
}


// EXPORTS //

module.exports = handler;
