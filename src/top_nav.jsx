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
		<Link to={ path } title="View package documentation">Documentation</Link>
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
		<Link to={ path } title="Run package benchmarks">Benchmarks</Link>
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
		<Link to={ path } title="Run package tests">Tests</Link>
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
		<a href={ path } title="View source code">Source</a>
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
		<a href={ path } title="View TypeScript type definitions">TypeScript</a>
	);
}


// MAIN //

/**
* Returns a React component for rendering top navigation.
*
* @private
* @param {Object} props - component properties
* @param {string} props.version - version
* @param {string} props.pkg - package name
* @param {boolean} [props.docs] - boolean indicating whether to link to package documentation
* @param {boolean} [props.src] - boolean indicating whether to link to package source
* @param {boolean} [props.benchmarks] - boolean indicating whether to link to package benchmarks
* @param {boolean} [props.tests] - boolean indicating whether to link to package tests
* @param {boolean} [props.typescript] - boolean indicating whether to link to TypeScript type declarations
* @returns {ReactComponent} React component
*/
function TopNav( props ) {
	var path = pkgPath( props.pkg, props.version );
	return (
		<nav className="top-nav" ariaLabel="Main">
			{ props.docs ? docs( path ) : null }
			{ props.benchmarks ? bench( path ) : null }
			{ props.tests ? test( path ) : null }
			{ props.src ? src( props.pkg, props.version ) : null }
			{ props.typescript ? ts( props.pkg ) : null }
		</nav>
	);
}


// EXPORTS //

export default TopNav;
