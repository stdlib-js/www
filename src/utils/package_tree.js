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

import PACKAGE_DATA_CACHE from 'pkg-data-cache';


// MAIN //

/**
* Retrieves a package tree for a specified version.
*
* @private
* @param {string} version - version
* @returns {(Object|null)} package tree
*/
function packageTree( version ) {
	var o = PACKAGE_DATA_CACHE[ version ];
	if ( o ) {
		if ( o.tree ) {
			return o.tree;
		}
	}
	return null;
}


// EXPORTS //

export default packageTree;
