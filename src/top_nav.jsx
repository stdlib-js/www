/**
* @license Apache-2.0
*
* Copyright (c) 2019 The Stdlib Authors.
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
import pkgPath from './pkg_doc_path.js';


// VARIABLES //

var RE_UNDERSCORE_REPLACE = /[\/-]/g;


// FUNCTIONS //

/**
* Returns a React component for navigating to package documentation.
*
* @private
* @param {string} path - package documentation URL
* @returns {ReactComponent} React component
*/
function docs( path ) {
	return (
		<Link to={path}>Documentation</Link>
	);
}

/**
* Returns a React component for navigating to package benchmarks.
*
* @private
* @param {string} path - package documentation URL
* @returns {ReactComponent} React component
*/
function bench( path ) {
	path += 'benchmark.html';
	return (
		<Link to={path}>Benchmarks</Link>
	);
}

/**
* Returns a React component for navigating to package tests.
*
* @private
* @param {string} path - package documentation URL
* @returns {ReactComponent} React component
*/
function test( path ) {
	path += 'test.html';
	return (
		<Link to={path}>Tests</Link>
	);
}

/**
* Returns a React component for navigating to a package's hosted source code.
*
* @private
* @param {string} pkg - package name
* @param {string} version - version
* @returns {ReactComponent} React component
*/
function src( pkg, version ) {
	var path = 'https://github.com/stdlib-js/stdlib/tree/'+version+'/lib/node_modules/@stdlib/'+pkg;
	return (
		<a href={path}>Source</a>
	);
}

/**
* Returns a path to a package TypeScript type declarations.
*
* @private
* @param {string} pkg - package name
* @returns {string} resource path
*/
function ts( pkg ) {
	var path;
	pkg = pkg.replace( RE_UNDERSCORE_REPLACE, '_' );
	path = '/docs/ts/modules/_'+pkg+'_docs_types_index_d_.html';
	return (
		<a href={path}>TypeScript</a>
	);
}


// MAIN //

/**
* Returns a React component for rendering top navigation.
*
* @private
* @param {Object} params - component parameters
* @param {string} params.version - version
* @param {string} params.pkg - package name
* @param {boolean} [params.docs] - boolean indicating whether to link to package documentation
* @param {boolean} [params.src] - boolean indicating whether to link to package source
* @param {boolean} [params.benchmarks] - boolean indicating whether to link to package benchmarks
* @param {boolean} [params.tests] - boolean indicating whether to link to package tests
* @param {boolean} [params.typescript] - boolean indicating whether to link to TypeScript type declarations
* @returns {ReactComponent} React component
*/
function topnav( params ) {
	var path = pkgPath( params.pkg, params.version );
	return (
		<nav className="top-nav" role="navigation">
			{ params.docs ? docs( path ) : null }
			{ params.benchmarks ? bench( path ) : null }
			{ params.tests ? test( path ) : null }
			{ params.src ? src( params.pkg, params.version ) : null }
			{ params.typescript ? ts( params.pkg ) : null }
		</nav>
	);
}


// EXPORTS //

export default topnav;
