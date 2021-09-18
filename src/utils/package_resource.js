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

import packageResources from './package_resources.js';
import packageOrder from './package_order.js';


// VARIABLES //

var OFFSETS = {
	'benchmark': 0,
	'test': 1,
	'typescript': 2
};


// MAIN //

/**
* Returns a value indicating whether a package has a specified resource for a specified documentation version.
*
* @private
* @param {string} pkg - package name
* @param {string} resource - resource name
* @param {string} version - documentation version
* @returns {(NonNegativeInteger|null)} value indicating whether a package has a specified resource
*/
function packageResource( pkg, resource, version ) {
	var resources;
	var order;
	var i;
	var j;

	resources = packageResources( version );
	if ( resources === null ) {
		return null;
	}
	order = packageOrder( version );
	if ( order === null ) {
		return null;
	}
	i = order[ pkg ];
	if ( i === void 0 ) {
		return null;
	}
	j = OFFSETS[ resource ];
	if ( j === void 0 ) {
		return null;
	}
	return resources[ (i*3) + j ];
}


// EXPORTS //

export default packageResource;
