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
var readJSON = require( '@stdlib/fs/read-json' ).sync;
var replace = require( '@stdlib/string/replace' );
var documentationPath = require( './api_docs_path.js' );
var stdlibPath = require( './stdlib_path.js' );


// VARIABLES //

var RE_BACKTICK = /`/g;
var STDLIB_PATH = join( stdlibPath(), 'lib', 'node_modules' );
var OUTPUT = 'package_desc.json';


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
	var pkgs;
	var out;
	var pkg;
	var i;

	// Resolve the API documentation path:
	dpath = documentationPath();

	// Load the list of packages...
	opts = {
		'encoding': 'utf8'
	};
	pkgs = readJSON( join( dpath, 'package_list.json' ), opts );
	if ( pkgs instanceof Error ) {
		throw pkgs;
	}
	// For each package, resolve the package description...
	out = {};
	for ( i = 0; i < pkgs.length; i++ ) {
		pkg = readJSON( join( STDLIB_PATH, '@stdlib', pkgs[ i ], 'package.json' ), opts );
		if ( pkg instanceof Error ) {
			continue;
		}
		out[ pkgs[ i ] ] = replace( pkg.description, RE_BACKTICK, '' );
	}
	// Write the database to file:
	writeFile( join( dpath, OUTPUT ), JSON.stringify( out ) );
}

main();
