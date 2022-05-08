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

// MODULES //

import config from './../config.js';
import PACKAGE_DATA_CACHE from './caches/package_data.js';


// MAIN //

/**
* Retrieves package data for a specified documentation version.
*
* @private
* @param {string} version - documentation version
* @param {Callback} clbk - callback invoked upon retrieving package data
* @returns {void}
*/
function fetchPackageData( version, clbk ) {
	var o = PACKAGE_DATA_CACHE[ version ];

	// Check whether we have already retrieved package data for this version...
	if ( o ) {
		return done();
	}
	o = {};

	// Fetch data necessary for rendering the application...
	fetch( config.mount+version+'/package/data' )
		.then( toJSON )
		.then( onData )
		.catch( done );

	/**
	* Callback invoked upon receiving a JSON resource.
	*
	* @private
	* @param {Object} res - response
	* @returns {Promise} promise to resolve the response as JSON
	*/
	function toJSON( res ) {
		return res.json();
	}

	/**
	* Callback invoked upon resolving package data.
	*
	* @private
	* @param {Object} json - JSON object
	* @param {Array<Object>} json.tree - package tree array
	* @param {NonNegativeIntegerArray} json.resources - package resources
	* @param {StringArray} json.packages - list of packages
	* @param {Object} json.order - package order hash
	* @param {StringArray} json.descriptions - package descriptions
	* @param {NonNegativeIntegerArray} json.namespaces - list of namespace packages
	*/
	function onData( json ) {
		var i;

		// Assign resolved data to variable in parent scope:
		o = json;

		// Reconstitute a list of namespaces...
		for ( i = 0; i < o.namespaces.length; i++ ) {
			o.namespaces[ i ] = o.packages[ o.namespaces[ i ] ];
		}
		// Cache the resolved data:
		PACKAGE_DATA_CACHE[ version ] = o;

		done();
	}

	/**
	* Callback invoked upon resolving package data.
	*
	* @private
	* @param {Error} [error] - error object
	* @returns {void}
	*/
	function done( error ) {
		if ( error ) {
			return clbk( error );
		}
		clbk( null, o );
	}
}


// EXPORTS //

export default fetchPackageData;
