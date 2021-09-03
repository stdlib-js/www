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


// MAIN //

/**
* Returns a package resource for a specified documentation version.
*
* @private
* @param {string} pkg - package name
* @param {string} resource - resource name
* @param {string} version - documentation version
* @returns {(string|null)} package resource
*/
function packageResource( pkg, resource, version ) {
	var resources = packageResources( version );
	if ( resources === null ) {
		return null;
	}
	resources = resources[ pkg ];
	if ( !resources ) {
		return null;
	}
	return resources[ resource ] || null;
}


// EXPORTS //

export default packageResource;
