#!/usr/bin/env node

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

// MAIN //

// @babel/register hook to ignore imported style files when running in Node.js:
require( 'ignore-styles' );

// Register `require` hooks to allow import JSX and other non-standard Node.js behavior when dynamically compiling the React-based web application:
require( '@babel/register' )({
	ignore: [ /(node_modules)/ ],
	root: './server',
	plugins: [
		'@babel/plugin-transform-react-jsx',
		'@babel/plugin-proposal-function-bind',

		'@babel/plugin-proposal-export-default-from',
		'@babel/plugin-transform-logical-assignment-operators',
		[ '@babel/plugin-transform-optional-chaining', { 'loose': false } ],
		[ '@babel/plugin-proposal-pipeline-operator', { 'proposal': 'minimal' } ],
		[ '@babel/plugin-transform-nullish-coalescing-operator', { 'loose': false } ],
		'@babel/plugin-proposal-do-expressions',

		[ '@babel/plugin-proposal-decorators', { 'version': '2023-11' } ],
		[ '@babel/plugin-transform-class-properties', { 'loose': true } ],
		'@babel/plugin-proposal-function-sent',
		'@babel/plugin-proposal-export-namespace-from',
		'@babel/plugin-transform-numeric-separator',
		'@babel/plugin-proposal-throw-expressions',

		'@babel/plugin-transform-modules-commonjs',
		'@babel/plugin-syntax-dynamic-import',
		'@babel/plugin-syntax-import-meta'
	]
});

// Run the web server:
require( './server.js' );
