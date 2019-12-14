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
import config from './config.js';


// VARIABLES //

var RE_UNDERSCORE_REPLACE = /[\/-]/g;


// FUNCTIONS //

/**
* Returns a path to a package benchmark resource.
*
* @private
* @param {string} path - package documentation URL
* @returns {string} resource path
*/
function bench( path ) {
	return path + 'benchmark.html';
}

/**
* Returns a path to a package test resource.
*
* @private
* @param {string} path - package documentation URL
* @returns {string} resource path
*/
function test( path ) {
	return path + 'test.html';
}

/**
* Returns a path to a package's hosted source code.
*
* @private
* @param {string} pkg - package name
* @param {string} version - version
* @returns {string} path
*/
function src( pkg, version ) {
	return 'https://github.com/stdlib-js/stdlib/tree/'+version+'/lib/node_modules/@stdlib/'+pkg;
}

/**
* Returns a path to a package TypeScript type declarations.
*
* @private
* @param {string} pkg - package name
* @returns {string} resource path
*/
function ts( pkg ) {
	pkg = pkg.replace( RE_UNDERSCORE_REPLACE, '_' );
	return '/docs/ts/modules/_'+pkg+'_docs_types_index_d_.html';
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
	var path = config.mount+params.version+'/@stdlib/'+params.pkg+'/';
	return (
		<nav className="top-nav">
			{ params.docs ? <Link to={path}>Documentation</Link> : null }
			{ params.benchmarks ? <Link to={bench( path )}>Benchmarks</Link> : null }
			{ params.tests ? <Link to={test( path )}>Tests</Link> : null }
			{ params.src ? <a href={src( params.pkg, params.version )}>Source</a> : null }
			{ params.typescript ? <a href={ts( params.pkg )}>TypeScript</a> : null }
		</nav>
	);
}


// EXPORTS //

export default topnav;
