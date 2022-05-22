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
import PropTypes from 'prop-types';
import pkgPath from 'pkg-doc-path';
import config from 'config';
import LogoIcon from './../icons/logo.jsx';


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
		<li>
			<span className="breadcrumb-separator" aria-hidden="true">/</span>
			<Link
				key={ label }
				to={ url }
				aria-current={ ( current ) ? 'page' : null }
			>
				{ label }
			</Link>
		</li>
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
		<nav
			className="readme-breadcrumbs"
			aria-label="breadcrumb"
		>
			<ol>
				<li>
					<Link
						key="stdlib"
						to={ config.mount + props.version }
						title="Return to homepage"
					>
						<LogoIcon />
						stdlib
					</Link>
				</li>
				{ links }
			</ol>
		</nav>
	);
}

/**
* Component property types.
*
* @constant
* @name propTypes
* @memberof BreadcrumbsNavigation
* @type {Object}
*/
BreadcrumbsNavigation.propTypes = {
	'pkg': PropTypes.string.isRequired,
	'version': PropTypes.string.isRequired
};


// EXPORTS //

export default BreadcrumbsNavigation;
