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
import { Link } from 'react-router-dom';
import pkgPath from './../../utils/pkg_doc_path.js';
import pkgKind from 'pkg-kind';
import pkgBasename from 'pkg-basename';


// MAIN //

/**
* Component for rendering a pagination link to the next package.
*
* @private
* @param {Object} props - component properties
* @param {string} props.pkg - package
* @param {string} props.version - documentation version
* @returns {ReactElement} React element
*/
function PaginationNext( props ) {
	var basename;
	var name;
	var kind;
	var pkg;

	pkg = props.pkg;
	name = '@stdlib/' + pkg;

	// Isolate the basename of the package path:
	basename = pkgBasename( pkg ); // e.g., `sin`

	// Determine if we can resolve a package "kind":
	kind = pkgKind( pkg );

	return (
		<Link
			className="pagination-link pagination-link-next"
			to={ pkgPath( name, props.version ) }
			title="Next package"
			rel="next"
		>
			<div class="pagination-link-type">Next</div>
			<div class="pagination-link-label">{ basename }<span aria-hidden="true"> »</span></div>
			<div class="pagination-link-sublabel">{  ( kind ) ? ' ('+kind+')' : null }</div>
		</Link>
	);
}


// EXPORTS //

export default PaginationNext;
