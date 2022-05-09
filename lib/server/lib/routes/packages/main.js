/**
* @license Apache-2.0
*
* Copyright (c) 2019 The Stdlib Authors.
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

/* eslint-disable no-invalid-this */

'use strict';

// MODULES //

var fs = require( 'fs' );
var path = require( 'path' );
var render = require( 'react-dom/server' ).renderToString;
var ServerStyleSheets = require( '@mui/styles' ).ServerStyleSheets;
var readFile = require( '@stdlib/fs/read-file' );
var pkg2title = require( 'pkg2title' );
var packageData = require( 'package-data' );
var parallel = require( 'parallel' );
var onError = require( './error.js');
var app = require( './app.jsx' );


// VARIABLES //

var RE_BUNDLE = /\/(test|benchmark)[^\/]*\.js$/; // eslint-disable-line no-useless-escape
var RE_ASSET = /^(.+)\/(tests|benchmarks)$/;
var FOPTS = {
	'encoding': 'utf8'
};


// FUNCTIONS //

/**
* Returns a function which invokes a provided callback with a specified constant value.
*
* @private
* @param {*} value - constant value
* @returns {Function} function
*/
function constantFunction( value ) {
	return fcn;

	/**
	* Invokes a provided callback with a specified constant value.
	*
	* @private
	* @param {Function} clbk - callback function
	*/
	function fcn( clbk ) {
		clbk( null, value );
	}
}


// MAIN //

/**
* Callback invoked upon receiving an HTTP request.
*
* @private
* @param {Object} request - request object
* @param {Object} reply - reply object
* @returns {void}
*/
function handler( request, reply ) {
	var match;
	var fcns;
	var self;
	var pkg;
	var p;
	var f;
	var v;

	self = this;

	v = request.params.version;
	request.log.info( 'Version: %s', v );
	if ( v === 'latest' ) {
		v = this.latestVersion;
		request.log.info( 'Resolved version: %s', v );
	}
	p = request.params[ '*' ];

	// Check whether we need to serve a package's benchmark or test bundles...
	match = p.match( RE_BUNDLE );
	if ( match ) {
		// Resolve the bundle path:
		p = '@stdlib/' + p;
		request.log.info( 'Path: %s', p );

		p = path.resolve( this.rootDir, v, p );
		request.log.info( 'Resolved path: %s', p );

		// Ensure we have not received a request for an asset above the root directory:
		if ( p.substring( 0, this.rootDir.length ) !== this.rootDir ) {
			reply.callNotFound();
			return;
		}
		request.log.info( 'Requested a %s package asset.', match[ 1 ] );
		reply.type( 'text/javascript' );
		return reply.send( fs.createReadStream( p, FOPTS ) );
	}
	// Determine whether we need to serve a package's benchmark or test page...
	match = p.match( RE_ASSET );
	if ( match ) {
		pkg = match[ 1 ];
		f = match[ 2 ];

		// At this point, the request is for either a `benchmark.html`, `test.html`, or `index.html` file...
	} else {
		// If unable to match an asset, assume the request is for a directory (i.e., `index.html` file)...
		request.log.info( 'Failed to match file path. Serving `index.html`...' );
		if ( p[ p.length-1 ] === '/' ) {
			pkg = p.substring( 0, p.length-1 );
		} else {
			pkg = p;
			p += '/';
		}
		p += 'index.html';
		f = 'index';
	}
	p = '@stdlib/' + p;
	request.log.info( 'Path: %s', p );

	p = path.resolve( this.rootDir, v, p );
	request.log.info( 'Resolved path: %s', p );

	// Ensure we have not received a request for an asset above the root directory:
	if ( p.substring( 0, this.rootDir.length ) !== this.rootDir ) {
		reply.callNotFound();
		return;
	}
	// At this point, we should only be serving HTML files...
	reply.type( 'text/html' );

	// Check whether we should serve a package's README as a fragment or as part of a rendered application...
	if ( f === 'index' && request.query.fragment ) {
		request.log.info( 'Requested a fragment.' );
		return reply.send( fs.createReadStream( p, FOPTS ) );
	}
	// We need to serve a rendered application...
	request.log.info( 'Requested an application.' );

	// If the request is for a benchmark or test asset, we need to return an application shell; otherwise, we need to return the application with a rendered README...
	fcns = [];
	if ( f === 'index' ) {
		request.log.info( 'Returning an application with a rendered README.' );
		fcns.push( [ readFile, p, FOPTS ] );
	} else {
		request.log.info( 'Returning an application shell.' );
		fcns.push( [ constantFunction( '' ) ] );
	}
	fcns.push( [ packageData, this.rootDir, v ] );

	// Resolve application data:
	parallel( fcns, onResults );

	/**
	* Callback invoked upon resolving application data.
	*
	* @private
	* @param {(Error|null)} error - error object
	* @param {Array} results - application data
	* @param {string} results.0 - file contents
	* @param {Object} results.1 - package data
	* @returns {void}
	*/
	function onResults( error, results ) {
		var sheets;
		var html;
		var desc;
		var data;
		var file;
		var url;
		var css;
		var idx;

		if ( error ) {
			request.log.error( error );
			return onError( error, request, reply );
		}
		file = results[ 0 ];
		data = results[ 1 ];

		// Resolve a normalized URL:
		url = request.url;
		if ( url[ url.length-1 ] === '/' ) {
			url = url.substring( 0, url.length-1 );
		}
		// Initialize a means for generating Material-UI CSS:
		sheets = new ServerStyleSheets();

		// Render the application component as parameterized by request data:
		html = render( sheets.collect( app( self.App, url, v, file, data, {} ) ) );  // eslint-disable-line max-len

		// Generate Material-UI CSS:
		css = sheets.toString();

		// Resolve a page description...
		idx = data.order[ pkg ];
		if ( typeof idx === 'number' ) {
			desc = data.descriptions[ idx ];
		}
		if ( desc === void 0 ) {
			request.log.info( 'Unable to resolve document description.' );

			// Fallback to default description:
			desc = self.appinfo.description;
		}
		// Insert the rendered application into the application template:
		html = self.template
			.title( pkg2title( pkg ) )
			.description( desc )
			.url( url )
			.css( css )
			.content( html )
			.toString();

		// Send the response data:
		reply.send( html );
	}
}


// EXPORTS //

module.exports = handler;
