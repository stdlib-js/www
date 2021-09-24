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
var render = require( 'react-dom/server' ).renderToString;
var styles = require( '@mui/styles' );


// VARIABLES //

var ServerStyleSheets = styles.ServerStyleSheets;
var StylesProvider = styles.StylesProvider;
var TITLE = 'Documentation | stdlib';


// MAIN //

/**
* Defines a route handler for returning a documentation landing page.
*
* @private
* @param {Options} opts - options
* @param {string} opts.latest - latest documentation version
* @param {Template} opts.template - application template
* @param {(ReactComponent|null)} opts.app - application component
* @param {Object} opts.meta - default meta data
* @returns {Object} route declaration
*/
function route( opts ) {
	var version;
	var schema;
	var tmpl;
	var App;

	schema = {
		'method': 'GET',
		'url': '/docs/api',
		'schema': {
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
	version = opts.latest;

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
		var sheets;
		var html;
		var url;
		var css;
		var ctx;

		url = request.url;
		if ( url[ url.length-1 ] !== '/' ) {
			url += '/';
		}
		url += version;
		request.log.info( 'Resolved URL: %s', url );

		request.log.info( 'Version: %s', version );

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
					version={ version }
					data={ {} }
					query=''
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
