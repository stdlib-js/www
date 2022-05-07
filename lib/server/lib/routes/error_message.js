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

var isString = require( '@stdlib/assert/is-string' ).isPrimitive;
var errorMessage = require( './../error_message.js' );


// MAIN //

/**
* Defines a route handler for returning a formatted error message.
*
* @private
* @param {Options} opts - options
* @returns {Object} route declaration
*/
function route() {
	var schema = {
		'method': 'GET',
		'url': '/docs/api/:version/error/:code',
		'schema': {
			'querystring': {
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
		var code;
		var args;
		var o;
		var q;
		var v;

		v = request.params.version;
		request.log.info( 'Version: %s', v );

		code = request.params.code;
		request.log.info( 'Error code: %s', code );

		q = request.query;
		args = q[ 'arg[]' ];
		if ( args === void 0 ) {
			args = [];
		} else if ( isString( args ) ) {
			args = [ args ];
		}
		o = {
			'code': code,
			'args': args,
			'message': errorMessage( code, args )
		};
		request.log.info( 'Returning error message.' );
		reply.type( 'application/json' );
		reply.send( JSON.stringify( o ) );
	}
}


// EXPORTS //

module.exports = route;
