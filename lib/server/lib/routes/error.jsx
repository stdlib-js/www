
/**
* @license Apache-2.0
*
* Copyright (c) 2022 The Stdlib Authors.
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
var render = require( 'react-dom/server' ).renderToString;
var styles = require( '@mui/styles' );
var isString = require( '@stdlib/assert/is-string' ).isPrimitive;
var format = require( '@stdlib/string/format' );
var id2msg = require( '@stdlib/error/tools/id2msg' );
var id2pkg = require( '@stdlib/error/tools/id2pkg' );


// VARIABLES //

var ServerStyleSheets = styles.ServerStyleSheets;
var StylesProvider = styles.StylesProvider;
var TITLE = 'Error Decoder | stdlib';


// MAIN //

/**
* Defines a route handler for parsing an error code.
*
* @private
* @param {Options} opts - options
* @param {Template} opts.template - application template
* @param {(ReactComponent|null)} opts.app - application component
* @param {Object} opts.meta - default meta data
* @returns {Object} route declaration
*/
function route( opts ) {
	var schema;
	var tmpl;
	var App;

	schema = {
		'method': 'GET',
		'url': '/docs/api/:version/error',
		'schema': {
			'querystring': {
				'code': {
					'type': 'string'
				},
				'arg': {
					'type': 'array'
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
		var content;
		var sheets;
		var html;
		var args;
		var url;
		var css;
		var ctx;
		var pkg;
		var msg;
		var q;
		var v;

		v = request.params.version;
		request.log.info( 'Version: %s', v );

		url = request.url;
		if ( url[ url.length-1 ] === '/' ) {
			url = url.substring( 0, url.length-1 );
		}
		request.log.info( 'Resolved URL: %s', url );

		q = request.query;

		// Split the error code into a package prefix identifier (first three characters) and an error message identifier (last two characters):
		pkg = id2pkg( q.code.substring( 0, 3 ) );
		msg = id2msg( q.code.substring( 3 ) );

		if ( !pkg ) {
			content = '(invalid error code. Cannot display error message. Unable to resolve the package from which error originated based on the provided error code.)';
		} else if ( msg ) {
			args = q[ 'arg[]' ];
			if ( isString( args ) ) {
				args = [ msg, args ];
			} else {
				args.unshift( msg );
			}
			content = format.apply( null, args );
		} else {
			content = '(invalid error code. Cannot display error message. Unable to resolve an error message associated with the provided error code.)';
		}

		request.log.info( 'Returning application.' );
		reply.type( 'text/html' );

		// Initialize a means for generating Material-UI CSS:
		sheets = new ServerStyleSheets();

		// Render the application component as parameterized by request data...
		ctx = {};
		html = render(sheets.collect(
			<StylesProvider>
				<App
					url={ url }
					version={ v }
					data={ {} }
					query=''
					content={ content }
					context={ ctx }
				/>
			</StylesProvider>
		));

		// Generate Material-UI CSS:
		css = sheets.toString();

		// Insert the rendered application into the application template...
		tmpl.title( TITLE )
			.description( opts.meta.description )
			.url( url )
			.css( css )
			.content( html );

		// Send the response data:
		reply.send( tmpl.toString() );
	}
}


// EXPORTS //

module.exports = route;
