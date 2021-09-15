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

// VARIABLES //

// Note: this regular expression is intentionally not exhaustive. Primary intent is to roughly group packages according to what should be relative common/popular top-level namespaces...
var RE_NAMESPACE = /^(assert|blas|datasets|fs|math|ml|net|random|regexp|simulate|stats|streams|time|utils)\//;

// Note: this regular expression is intentionally not exhaustive. Primary intent is to help disambiguate packages whose basenames may be present in multiple sub-namespaces...
var RE_SUBNAMESPACE = /\/(base|dists|incr|iter|strided)\//;


// MAIN //

/**
* Returns a package "kind" based on the package path.
*
* ## Notes
*
* -   This is invariably not exhaustive.
*
* @private
* @param {string} str - package name
* @returns {string} kind
*/
function packageKind( pkg ) {
	var match;
	var kind;

	kind = [];

	match = pkg.match( RE_NAMESPACE );
	if ( match ) {
		kind.push( match[ 1 ] );
	}
	match = pkg.match( RE_SUBNAMESPACE );
	if ( match ) {
		kind.push( match[ 1 ] );
	}
	return kind.join( ', ' );
}


// EXPORTS //

export default packageKind;
