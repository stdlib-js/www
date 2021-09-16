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

import React from 'react';


// VARIABLES //

var RE_UNDERSCORE_REPLACE = /[\/-]/g; // eslint-disable-line no-useless-escape
var RE_STDLIB_PREFIX = /^@stdlib\//;
var PATH = [
	'/docs/ts/',
	'',
	'/modules/_',
	'',
	'_docs_types_index_d_.html'
];


// MAIN //

/**
* Component for navigating to a package's TypeScript type declarations.
*
* @private
* @param {Object} props - component properties
* @param {string} props.pkg - package name (e.g., `math/base/special/sin`)
* @param {string} props.version - documentation version
* @returns {ReactElement} React element
*/
function TypeScript( props ) {
	var pkg = props.pkg;

	PATH[ 1 ] = props.version;

	pkg = pkg.replace( RE_STDLIB_PREFIX, '' );
	PATH[ 3 ] = pkg.replace( RE_UNDERSCORE_REPLACE, '_' );

	return (
		<li class="top-nav-item" role="menuitem">
			<a href={ PATH.join( '' ) } title="View TypeScript type definitions">typescript</a>
		</li>
	);
}


// EXPORTS //

export default TypeScript;
