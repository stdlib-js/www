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

'use strict';

// MODULES //

var join = require( 'path' ).join;
var exists = require( '@stdlib/fs/exists' ).sync;
var replace = require( '@stdlib/string/replace' );
var writeFile = require( '@stdlib/fs/write-file' ).sync;
var readJSON = require( '@stdlib/fs/read-json' ).sync;
var documentationPath = require( './../utils/api_docs_path.js' );
var tsPath = require( './../utils/ts_docs_path.js' );


// VARIABLES //

var OUTPUT = 'package/resources.json';
var TS_SUFFIX = '_docs_types_index_d_.html';
var RE_UNDERSCORE_REPLACE = /[\/-]/g; // eslint-disable-line no-useless-escape


// MAIN //

/**
* Main execution sequence.
*
* @private
* @throws {Error} unexpected error
*/
function main() {
	var tspath;
	var order;
	var dpath;
	var opts;
	var pkgs;
	var out;
	var p;
	var i;
	var j;

	// Resolve the API documentation path:
	dpath = documentationPath();

	// Resolve the TypeScript documentation path:
	tspath = tsPath();

	// Load the API documentation package list:
	opts = {
		'encoding': 'utf8'
	};
	pkgs = readJSON( join( dpath, 'package/list.json' ), opts );
	if ( pkgs instanceof Error ) {
		throw pkgs;
	}
	// Load the API documentation package order:
	order = readJSON( join( dpath, 'package/order.json' ), opts );
	if ( order instanceof Error ) {
		throw order;
	}
	// Initialize a strided array having layout: [ <benchmark>, <test>, <typescript>, <benchmark>, <test>, ... ]
	out = new Array( pkgs.length*3 );

	// Determine whether various package resources exist...
	for ( i = 0; i < pkgs.length; i++ ) {
		p = pkgs[ i ];
		j = order[ p ];
		if ( j === void 0 ) {
			throw new Error( 'unexpected error. Unable to find package `' + p + '` in the package order. The data may be out-of-sync.' );
		}
		j *= 3; // idx x stride
		out[ j ] = exists( join( dpath, '@stdlib', p, 'benchmark.html' ) ) ? 1 : 0;
		out[ j+1 ] = exists( join( dpath, '@stdlib', p, 'test.html' ) ) ? 1 : 0;
		out[ j+2 ] = exists( join( tspath, '_' + replace( p, RE_UNDERSCORE_REPLACE, '_' ) + TS_SUFFIX ) ) ? 1 : 0;
	}
	// Write the database to file:
	writeFile( join( dpath, OUTPUT ), JSON.stringify( out ) );
}

main();
