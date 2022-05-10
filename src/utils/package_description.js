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

import packageDescriptions from './package_descriptions.js';
import packageOrder from 'pkg-order';


// MAIN //

/**
* Returns a package description for a specified documentation version.
*
* @private
* @param {string} pkg - package name
* @param {string} version - documentation version
* @returns {(string|null)} package description
*/
function packageDescription( pkg, version ) {
	var order;
	var desc;

	desc = packageDescriptions( version );
	if ( desc === null ) {
		return null;
	}
	order = packageOrder( version );
	if ( order === null ) {
		return null;
	}
	return desc[ order[ pkg ] ] || null;
}


// EXPORTS //

export default packageDescription;
