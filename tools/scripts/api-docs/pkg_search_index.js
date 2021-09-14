#!/usr/bin/env node

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

'use strict';

// MODULES //

var join = require( 'path' ).join;
var writeFile = require( '@stdlib/fs/write-file' ).sync;
var pkgIndex = require( '@stdlib/_tools/search/pkg-index' );
var stdlibPath = require( './../utils/stdlib_path.js' );
var documentationPath = require( './docs_path.js' );


// VARIABLES //

var STDLIB_PATH = join( stdlibPath(), 'lib', 'node_modules' );
var OUTPUT = 'package_index.json';


// MAIN //

/**
* Main execution sequence.
*
* @private
* @throws {Error} unexpected error
*/
function main() {
	var dpath;
	var opts;

	// Resolve the API documentation path:
	dpath = documentationPath();

	// Generate a package search index:
	opts = {
		'dir': STDLIB_PATH,
		'ignore': [
			'**/_tools/**'
		]
	};
	pkgIndex( opts, clbk );

	/**
	* Callback invoked upon generating a package search index.
	*
	* @private
	* @param {(Error|null)} error - error object
	* @param {Object} idx - search index
	*/
	function clbk( error, idx ) {
		var opts;
		if ( error ) {
			throw error;
		}
		// Save as JSON file:
		opts = {
			'encoding': 'utf8'
		};
		writeFile( join( dpath, OUTPUT ), JSON.stringify( idx ), opts );
	}
}

main();
