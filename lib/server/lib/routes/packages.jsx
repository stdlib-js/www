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

var fs = require( 'fs' );
var path = require( 'path' );
var React = require( 'react' );
var render = require( 'react-dom/server' ).renderToString;
var styles = require( '@material-ui/core/styles' );
var readFile = require( '@stdlib/fs/read-file' );
var extname = require( '@stdlib/utils/extname' );
var pkg2title = require( './../title.js' );
var packageData = require( './../package_data.js' );
var parallel = require( './../parallel.js' );


// VARIABLES //

var ServerStyleSheets = styles.ServerStyleSheets;
var StylesProvider = styles.StylesProvider;

var FOPTS = {
	'encoding': 'utf8'
};

var RE_BASENAME = /^(test|benchmark).*\.(js|html)$/;


// MAIN //

/**
* Defines a route handler for package documentation (including benchmark and test assets).
*
* @private
* @param {Options} opts - options
* @param {string} opts.latest - latest documentation version
* @param {string} opts.root - root documentation directory
* @param {(ReactComponent|null)} opts.app - application component
* @returns {Object} route declaration
*/
function route( opts ) {
	var schema;
	var tmpl;
	var App;

	schema = {
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

	App = opts.app;
	tmpl = opts.template.clone();

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
			var fcns;
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
			fcns = [
				[ readFile, p, FOPTS ],
				[ packageData, opts.root, v ]
			];
			parallel( fcns, onResults );
		}

		/**
		* Callback invoked upon resolving application data.
		*
		* @private
		* @param {(Error|null)} error - error object
		* @param {Array<string|Object>} results - application data
		* @returns {void}
		*/
		function onResults( error, results ) {
			var sheets;
			var html;
			var desc;
			var data;
			var file;
			var ctx;
			var url;
			var css;
			var pkg;
			var idx;

			if ( error ) {
				request.log.error( error.message );
				return reply.callNotFound();
			}
			file = results[ 0 ];
			data = results[ 1 ];

			reply.type( 'text/html' );

			// Resolve a normalized URL:
			url = request.url;
			if ( url[ url.length-1 ] === '/' ) {
				url = url.substring( 0, url.length-1 );
			}
			// Get the package name:
			pkg = request.params[ '*' ];

			// Initialize a means for generating Material-UI CSS:
			sheets = new ServerStyleSheets();

			// Render the application component as parameterized by request data...
			ctx = {};
			html = render(sheets.collect(
				<StylesProvider>
					<App
						url={ url }
						version={ v }
						data={ data }
						query=''
						readme={ file }
						context={ ctx }
					/>
				</StylesProvider>
			));

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
				desc = opts.meta.description;
			}
			// Insert the rendered application into the application template...
			tmpl.title( pkg2title( pkg ) )
				.description( desc )
				.url( url )
				.css( css )
				.content( html );

			// Send the response data:
			reply.send( tmpl.toString() );
		}
	}
}


// EXPORTS //

module.exports = route;
