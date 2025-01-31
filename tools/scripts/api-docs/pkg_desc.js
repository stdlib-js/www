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
var stdlibPath = require( './../utils/stdlib_path.js' );
var documentationPath = require( './../utils/api_docs_path.js' );


// VARIABLES //

var RE_BACKTICK = /`/g;
var STDLIB_PATH = join( stdlibPath(), 'lib', 'node_modules' );
var OUTPUT = 'package/desc.json';


// MAIN //

/**
* Main execution sequence.
*
* @private
* @throws {Error} unexpected error
*/
function main() {
	var order;
	var dpath;
	var opts;
	var pkgs;
	var out;
	var pkg;
	var i;
	var j;

	// Resolve the API documentation path:
	dpath = documentationPath();

	// Load the list of packages...
	opts = {
		'encoding': 'utf8'
	};
	pkgs = readJSON( join( dpath, 'package/list.json' ), opts );
	if ( pkgs instanceof Error ) {
		throw pkgs;
	}
	// Load the package order...
	order = readJSON( join( dpath, 'package/order.json' ), opts );
	if ( order instanceof Error ) {
		throw order;
	}
	// For each package, resolve the package description...
	out = new Array( pkgs.length );
	for ( i = 0; i < pkgs.length; i++ ) {
		pkg = readJSON( join( STDLIB_PATH, '@stdlib', pkgs[ i ], 'package.json' ), opts );
		if ( pkg instanceof Error ) {
			continue;
		}
		j = order[ pkgs[ i ] ];
		if ( j === void 0 ) {
			throw new Error( 'unexpected error. Unable to find package `' + pkgs[ i ] + '` in the package order. The data may be out-of-sync.' );
		}
		out[ j ] = replace( pkg.description, RE_BACKTICK, '' );
	}
	// Write the database to file:
	writeFile( join( dpath, OUTPUT ), JSON.stringify( out ) );
}

main();
