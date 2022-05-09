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

import lastIndexOf from 'last-index-of';


// MAIN //

/**
* Returns the basename of a package.
*
* @private
* @param {string} pkg - package name (e.g., `@stdlib/math/base/special/sin` or `math/base/special/sin`)
* @returns {string} basename
*/
function basename( pkg ) {
	var idx = lastIndexOf( pkg, '/' );
	return pkg.substring( idx+1 ); // e.g., `sin`
}


// EXPORTS //

export default basename;
