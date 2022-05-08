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
var flattenObject = require( '@stdlib/utils/flatten-object' );
var merge = require( '@stdlib/utils/merge' );
var objectKeys = require( '@stdlib/utils/keys' );
var writeFile = require( '@stdlib/fs/write-file' ).sync;
var readJSON = require( '@stdlib/fs/read-json' ).sync;
var documentationPath = require( './../utils/api_docs_path.js' );


// VARIABLES //

var OUTPUT = 'package/list.json';


// MAIN //

/**
* Main execution sequence.
*
* @private
* @throws {Error} unexpected error
*/
function main() {
	var dpath;
	var tree;
	var opts;
	var pkgs;
	var keys;
	var db;
	var i;

	// Resolve the API documentation path:
	dpath = documentationPath();

	// Load the API documentation package tree...
	opts = {
		'encoding': 'utf8'
	};
	tree = readJSON( join( dpath, 'package/tree.json' ), opts );
	if ( tree instanceof Error ) {
		throw tree;
	}
	// Build an API documentation asset database...
	opts = {
		'delimiter': '/',
		'depth': 0
	};
	db = flattenObject( tree, opts );
	while ( opts.depth <= 6 ) {
		db = merge( db, flattenObject( tree, opts ) );
		opts.depth += 1;
	}
	keys = objectKeys( db );

	// Prune `__namespace__` pseudo-packages...
	pkgs = [];
	for ( i = 0; i < keys.length; i++ ) {
		if ( !keys[ i ].includes( '__namespace__' ) ) {
			pkgs.push( keys[ i ] );
		}
	}
	// Sort the list alphabetically:
	pkgs.sort();

	// Write the database to file:
	writeFile( join( dpath, OUTPUT ), JSON.stringify( pkgs ) );
}

main();
