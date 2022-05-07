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

var format = require( '@stdlib/string/format' );
var id2msg = require( '@stdlib/error/tools/id2msg' );
var id2pkg = require( '@stdlib/error/tools/id2pkg' );


// MAIN //

/**
* Returns a formatted error message.
*
* ## Notes
*
* -   The returned object has the following properties:
*
*     -   **pkg**: package name
*     -   **msg**: formatted error message
*
* @private
* @param {string} code - error code
* @param {Array} args - arguments
* @returns {Object} results formatted error message
*/
function errorMessage( code, args ) {
	var pkg;
	var msg;
	var tmp;
	var i;

	// Split the error code into a package prefix identifier (first three characters) and an error message identifier (last two characters)...
	pkg = id2pkg( code.substring( 0, 3 ) );
	if ( !pkg ) {
		return {
			'pkg': '',
			'msg': '(invalid error code. Cannot display error message. Unable to resolve the package from which error originated based on the provided error code.)'
		};
	}
	msg = id2msg( code.substring( 3 ) );
	if ( !msg ) {
		return {
			'pkg': pkg,
			'msg': '(invalid error code. Cannot display error message. Unable to resolve an error message associated with the provided error code.)'
		};
	}
	tmp =[ msg ];
	for ( i = 0; i < args.length; i++ ) {
		tmp.push( args[ i ] );
	}
	return {
		'pkg': pkg,
		'msg': format.apply( null, tmp )
	};
}


// EXPORTS //

module.exports = errorMessage;
