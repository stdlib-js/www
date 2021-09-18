/**
* @license Apache-2.0
*
* Copyright (c) 2021 The Stdlib Authors.
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


// VARIABLES //

var TITLE = 'Search | stdlib | ';
var RE_PATHNAME = /(\/docs\/api\/.+\/search)\//;


// MAIN //

/**
* Defines a route handler for searching documentation.
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
		'url': '/docs/api/:version/search',
		'schema': {
			'querystring': {
				'q': {
					'type': 'string'
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
		var html;
		var ctx;
		var url;
		var v;
		var q;

		v = request.params.version;
		request.log.info( 'Version: %s', v );

		q = request.query.q;
		request.log.info( 'Query: %s', q );

		url = request.url.replace( RE_PATHNAME, '$1' );
		request.log.info( 'Resolved URL: %s', url );

		request.log.info( 'Returning application.' );
		reply.type( 'text/html' );

		// Render the application component as parameterized by request data...
		ctx = {};
		html = render( <App
			url={ url }
			version={ v }
			data={ {} }
			query={ q }
			context={ ctx }
		/> );

		// Insert the rendered application into the application template...
		tmpl.title( TITLE+v )
			.description( opts.meta.description )
			.url( '/docs/api/'+v+'/search' )
			.content( html );

		// Send the response data:
		reply.send( tmpl.toString() );
	}
}


// EXPORTS //

module.exports = route;
