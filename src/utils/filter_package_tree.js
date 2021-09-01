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

// MAIN //

/**
* Applies a regular expression filter to a provide package tree.
*
* @private
* @param {ObjectArray} tree - package tree to filter
* @param {RegExp} filter - filter to apply
* @returns {(ObjectArray|null)} filtered tree
*/
function filterTree( tree, filter ) {
	var node;
	var pkg;
	var out;
	var tmp;
	var o;
	var i;

	out = [];
	for ( i = 0; i < tree.length; i++ ) {
		node = tree[ i ];

		// Check if the current package satisfies the filter...
		if ( filter.test( node.name ) ) {
			// We found a match! We don't need to recurse any further...
			out.push( node );
			continue;
		}
		// Check if the current package is a namespace (i.e., has children), and, if so, we need to continue descending down the tree to see if any child nodes satisfy the filter...
		if ( node.children ) {
			tmp = filterTree( node.children, filter );

			// If we were able to resolve packages satisfying the filter, we need to copy the current (pruned) node in order to avoid mutation (we're modifying the `children` property)...
			if ( tmp ) {
				o = {
					'key': node.key,
					'name': node.name,
					'children': tmp
				}
				out.push( o );
				continue;
			}
		}
	}
	if ( out.length === 0 ) {
		return null;
	}
	return out;
}


// EXPORTS //

export default filterTree;
