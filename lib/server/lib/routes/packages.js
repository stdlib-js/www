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

'use strict';

// MODULES //

var React = require( 'react' );
var ReactDOMServer = require( 'react-dom/server' );
var path = require( 'path' );
var fs = require( 'fs' );
var replace = require( '@stdlib/string/replace' );
var readFile = require( '@stdlib/fs/read-file' );
var extname = require( '@stdlib/utils/extname' );


// VARIABLES //

var FOPTS = {
	'encoding': 'utf8'
};
var RE_TRAILING_SLASH = /\/$/;
var RE_ROOT = /<div id="root"><\/div>/;
var RE_BASENAME = /^(test|benchmark).*\.(js|html)$/;
var ROOT = [
	'<div id="root">',
	'',
	'</div>'
];


// MAIN //

/**
* Defines a route handler for package documentation (including benchmark and test assets).
*
* @private
* @param {Options} opts - options
* @param {string} options.latest - path to the "latest" documentation
* @param {string} options.root - root documentation directory
* @param {string} options.template - application shell template
* @param {(ReactComponent|null)} options.app - application component
* @returns {Object} route declaration
*/
function route( opts ) {
	var schema = {
		'method': 'GET',
		'url': '/docs/api/:version/@stdlib/*',
		'schema': {
			'querystring': {
				'fragment': {
					'type': 'boolean'
				}
			},
			'response': {
				'200': {
					'type': 'string'
				}
			}
		},
		'handler': onRequest
	};

	return schema;

	/**
	* Callback invoked upon receiving an HTTP request.
	*
	* @private
	* @param {Object} request - request object
	* @param {Object} reply - reply object
	* @returns {void}
	*/
	function onRequest( request, reply ) {
		var p;
		var v;

		v = request.params.version;
		request.log.info( 'Version: %s', v );
		if ( v === 'latest' ) {
			v = opts.latest;
			request.log.info( 'Resolved version: %s', v );
		}
		p = '@stdlib/' + request.params[ '*' ];
		request.log.info( 'Path: %s', p );

		p = path.resolve( opts.root, v, p );
		request.log.info( 'Resolved path: %s', p );

		// Ensure we have not received a request for an asset above the root directory:
		if ( p.length < opts.root.length ) {
			reply.callNotFound();
			return;
		}
		// Stat the path:
		fs.stat( p, onStat );

		/**
		* Callback invoked upon receiving path stats.
		*
		* @private
		* @param {(Error|null)} error - error object
		* @param {Object} stats - stats
		* @returns {void}
		*/
		function onStat( error, stats ) {
			var match;
			var ext;
			var f;

			if ( error ) {
				request.log.error( error.message );
				return reply.callNotFound();
			}
			// Check whether we need to serve a package's README...
			if ( stats.isDirectory() ) {
				request.log.info( 'Path is a directory. Serving `index.html`...' );
				p = path.resolve( p, 'index.html' );
				return fs.stat( p, onStat );
			}
			// Check whether we need to serve a package's benchmark or test assets...
			f = path.basename( p );
			match = f.match( RE_BASENAME );
			if ( match ) {
				request.log.info( 'Requested a %s package asset.', match[ 1 ] );
				if ( match[ 2 ] === 'html' ) {
					reply.type( 'text/html' );
				} else {
					reply.type( 'text/javascript' );
				}
				return reply.send( fs.createReadStream( p, FOPTS ) );
			}
			// At this point, we should only be serving HTML files...
			ext = extname( p );
			if ( ext !== '.html' ) {
				reply.callNotFound();
				return;
			}
			// Check whether we should serve a package's README as a fragment or as part of a rendered application...
			if ( request.query.fragment ) {
				request.log.info( 'Requested a fragment.' );
				reply.type( 'text/html' );
				return reply.send( fs.createReadStream( p, FOPTS ) );
			}
			// We need to serve a package's README as part of a rendered application...
			request.log.info( 'Requested an application.' );
			readFile( p, FOPTS, onRead );
		}

		/**
		* Callback invoked upon reading a file.
		*
		* @private
		* @param {(Error|null)} error - error object
		* @param {string} file - file contents
		* @returns {void}
		*/
		function onRead( error, file ) {
			var html;
			var App;
			var ctx;

			if ( error ) {
				request.log.error( error.message );
				return reply.callNotFound();
			}
			reply.type( 'text/html' );

			// Check whether we need to render an application component...
			App = opts.app;
			if ( App === null ) {
				return reply.send( replace( opts.template, RE_ROOT, file ) );
			}
			// Render the application component as parameterized by request data...
			ctx = {};
			html = ReactDOMServer.renderToString( <App
				url={ request.url }
				version={ v }
				data={ {} }
				query=''
				context={ ctx }
			/> );

			// Insert the rendered application into the application shell...
			ROOT[ 1 ] = html;
			html = replace( opts.template, RE_ROOT, ROOT.join( '' ) );

			// Send the response data:
			reply.send( html );
		}
	}
}


// EXPORTS //

module.exports = route;
