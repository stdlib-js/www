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

import path from 'path';
import pkgKind from './pkg_kind.js';


// MAIN //

/**
* Generates a document title from a specified package name.
*
* @private
* @param {string} pkg - package name (e.g., `math/base/special/sin`)
* @returns {string} document title
*
* @example
* var t = createTitle( 'math/base/special/sin' );
* // returns 'sin | math.base | stdlib'
*
* @example
* var t = createTitle( 'utils/copy' );
* // returns 'copy | utils | stdlib'
*/
function createTitle( pkg ) {
	return path.basename( pkg ) + ' | ' + pkgKind( pkg, '.' ) + ' | stdlib';
}


// EXPORTS //

module.exports = createTitle;
