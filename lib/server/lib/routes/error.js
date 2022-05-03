
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
var format = require( '@stdlib/string/format' );
var id2msg = require( '@stdlib/error/tools/id2msg' );
var id2pkg = require( '@stdlib/error/tools/id2pkg' );


// MAIN //

/**
* Defines a route handler for parsing an error code.
*
* @private
* @returns {Object} route declaration
*/
function route() {
	var schema = {
		'method': 'GET',
		'url': '/docs/api/error',
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
		var query = request.query;
		var code = query.code;
		var args = query[ 'arg[]' ];
		var out;

		if ( isString( args ) ) {
			args = [ args ];
		}
		// Split code into package prefix identifier (first three characters) and error message identifier (last two characters):
		var pkg = id2pkg( code.substring( 0, 3 ) );
		var msg = id2msg( code.substring( 3 ) );

		if ( !pkg || !msg ) {
			// Display message if neither package nor message can be resolved:
			out = [
				'<div class="error-decoder-wrapper" >',
				'\t<h1>Error Message:</h1>',
				'',
				'\t<pre>',
				'\t\tInvalid error code; unable to resolve package or message.',
				'\t</pre>',
				'</div>'
			].join( '\n' );
		} else {
			// Format error message:
			msg = format.apply( null, [ msg ].concat( args ) );
			out = [
				'<div class="error-decoder-wrapper" >',
				'<h1>Error Message:</h1>',
				'',
				'\t<p>The following error occurred in package `'+pkg+'`:</p>',
				'\t<pre>',
				'\t\t'+msg,
				'\t</pre>',
				'</div>'
			].join( '\n' );
		}
		reply.type( 'text/html' );
		reply.send( out );
	}
}


// EXPORTS //

module.exports = route;
