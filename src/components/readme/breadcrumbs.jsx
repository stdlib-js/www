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
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import pkgPath from './../../utils/pkg_doc_path.js';
import config from './../../config.js';


// VARIABLES //

var RE_TRAILING_SLASH = /\/$/;


// FUNCTIONS //

/**
* Returns a component for rendering a breadcumb link.
*
* @private
* @param {string} label - link text (label)
* @param {string} url - link URL
* @param {boolean} current - boolean indicating whether a link points to the current page
* @returns {ReactElement} React element
*/
function breadcrumb( label, url, current ) {
	return (
		<Link
			key={ label }
			to={ url }
			aria-current={ ( current ) ? true : null }
		>
			{ label }
		</Link>
	);
}


// MAIN //

/**
* Component for rendering breadcrumb navigation.
*
* @private
* @param {Object} props - component properties
* @param {string} props.pkg - package name (e.g., `math/base/special/sin`)
* @param {string} props.version - documentation version
* @returns {ReactElement} React element
*/
function BreadcrumbsNavigation( props ) {
	var parts;
	var links;
	var N;
	var p;
	var i;

	// Split the package name into its component parts (e.g., 'math/base/special/sin' => [ 'math', 'base', 'special', 'sin' ])
	parts = props.pkg.split( '/' );
	N = parts.length;

	// Resolve the base documentation path for the current version and package:
	p = pkgPath( '', props.version );
	p = p.replace( RE_TRAILING_SLASH, '' );

	// Create a link for each part of the package name path...
	links = [];
	for ( i = 0; i < N; i++ ) {
		p += '/' + parts[ i ];
		links.push( breadcrumb( parts[ i ], p, i === N-1 ) );
	}
	return (
		<Breadcrumbs
			className="readme-breadcrumbs"
			separator="/"
			aria-label="breadcrumb"
		>
			<Link
				key="stdlib"
				to={ config.mount + props.version }
				title="Return to homepage"
			>
				<span className="logo-icon stdlib-logo-icon" role="img" aria-hidden="true"></span>
				stdlib
			</Link>
			{ links }
		</Breadcrumbs>
	);
}


// EXPORTS //

export default BreadcrumbsNavigation;
