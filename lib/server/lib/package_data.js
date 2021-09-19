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

// MODULES //

var resolve = require( 'path' ).resolve;
var readJSON = require( '@stdlib/fs/read-json' );


// VARIABLES //

var OPTS = {
	'encoding': 'utf8'
};

// In-memory cache for storing package data:
var CACHE = {};


// MAIN //

/**
* Returns package data for a specified documentation version.
*
* @private
* @param {string} root - root documentation directory
* @param {string} version - documentation version (e.g., `latest` or `v0.0.90`)
* @param {Callback} clbk - callback to invoke with resolved data
* @returns {void}
*/
function packageData( root, version, clbk ) {
	var fpath = resolve( root, version, 'package_data.json' );
	if ( CACHE[ fpath ] ) {
		return clbk( null, CACHE[ fpath ] );
	}
	readJSON( fpath, OPTS, onData );

	/**
	* Callback invoked upon reading package data.
	*
	* @private
	* @param {(Error|null)} error - error object
	* @param {Object} [data] - package data
	* @returns {void}
	*/
	function onData( error, data ) {
		var i;
		if ( error ) {
			return clbk( error );
		}
		// Reconstitute the list of namespaces...
		for ( i = 0; i < data.namespaces.length; i++ ) {
			data.namespaces[ i ] = data.packages[ data.namespaces[ i ] ];
		}
		// Cache/memoize the package data:
		CACHE[ fpath ] = data;

		// Return the results:
		clbk( null, data );
	}
}


// EXPORTS //

module.exports = packageData;
