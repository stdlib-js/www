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
*/
function fetchPackageData( version, clbk ) {
	var total;
	var count;
	var o;

	total = 5;
	count = 0;

	o = PACKAGE_DATA_CACHE[ version ];

	// Fetch data necessary for rendering the application...
	if ( o && o.tree ) {
		done();
	} else {
		fetch( config.mount+version+'/package_tree_array.json' )
			.then( toJSON )
			.then( onTree )
			.catch( done );
	}
	if ( o && o.resources ) {
		done();
	} else {
		fetch( config.mount+version+'/package_resources.json' )
			.then( toJSON )
			.then( onResources )
			.catch( done );
	}
	if ( o && o.packages ) {
		done();
	} else {
		fetch( config.mount+version+'/package_list.json' )
			.then( toJSON )
			.then( onList )
			.catch( done );
	}
	if ( o && o.order ) {
		done();
	} else {
		fetch( config.mount+version+'/package_order.json' )
			.then( toJSON )
			.then( onOrder )
			.catch( done );
	}
	if ( o && o.namespaces ) {
		done();
	} else {
		fetch( config.mount+version+'/namespace_list.json' )
			.then( toJSON )
			.then( onNamespaces )
			.catch( done );
	}

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
	* Callback invoked upon resolving a package tree.
	*
	* @private
	* @param {Object} json - JSON object
	*/
	function onTree( json ) {
		if ( PACKAGE_DATA_CACHE[ version ] === void 0 ) {
			PACKAGE_DATA_CACHE[ version ] = {};
		}
		PACKAGE_DATA_CACHE[ version ].tree = json;
		done();
	}

	/**
	* Callback invoked upon resolving package resources.
	*
	* @private
	* @param {Object} json - JSON object
	*/
	function onResources( json ) {
		if ( PACKAGE_DATA_CACHE[ version ] === void 0 ) {
			PACKAGE_DATA_CACHE[ version ] = {};
		}
		PACKAGE_DATA_CACHE[ version ].resources = json;
		done();
	}

	/**
	* Callback invoked upon resolving a package list.
	*
	* @private
	* @param {StringArray} list - list of packages
	*/
	function onList( list ) {
		if ( PACKAGE_DATA_CACHE[ version ] === void 0 ) {
			PACKAGE_DATA_CACHE[ version ] = {};
		}
		PACKAGE_DATA_CACHE[ version ].packages = list;
		done();
	}

	/**
	* Callback invoked upon resolving the package order hash.
	*
	* @private
	* @param {Object} json - JSON object
	*/
	function onOrder( json ) {
		if ( PACKAGE_DATA_CACHE[ version ] === void 0 ) {
			PACKAGE_DATA_CACHE[ version ] = {};
		}
		PACKAGE_DATA_CACHE[ version ].order = json;
		done();
	}

	/**
	* Callback invoked upon resolving a list of namespace packages.
	*
	* @private
	* @param {StringArray} list - list of namespace packages
	*/
	function onNamespaces( list ) {
		if ( PACKAGE_DATA_CACHE[ version ] === void 0 ) {
			PACKAGE_DATA_CACHE[ version ] = {};
		}
		PACKAGE_DATA_CACHE[ version ].namespaces = list;
		done();
	}

	/**
	* Callback invoked upon resolving a package resource.
	*
	* @private
	* @param {Error} [error] - error object
	* @returns {void}
	*/
	function done( error ) {
		if ( error ) {
			return clbk( error );
		}
		count += 1;
		if ( count === total ) {
			return clbk( null, PACKAGE_DATA_CACHE[ version ] );
		}
	}
}


// EXPORTS //

export default fetchPackageData;
