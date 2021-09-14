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
var objectKeys = require( '@stdlib/utils/keys' );
var writeFile = require( '@stdlib/fs/write-file' ).sync;
var readJSON = require( '@stdlib/fs/read-json' ).sync;
var documentationPath = require( './../utils/api_docs_path.js' );


// VARIABLES //

var OUTPUT = 'package_list.json';


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
	var res;
	var tmp;
	var i;

	// Resolve the API documentation path:
	dpath = documentationPath();

	// Load the API documentation package resources database...
	opts = {
		'encoding': 'utf8'
	};
	res = readJSON( join( dpath, 'package_resources.json' ), opts );
	if ( res instanceof Error ) {
		throw res;
	}
	// Get the list of packages:
	tmp = objectKeys( res );

	// Prune `__namespace__` pseudo-packages...
	pkgs = [];
	for ( i = 0; i < tmp.length; i++ ) {
		if ( !tmp[ i ].includes( '__namespace__' ) ) {
			pkgs.push( tmp[ i ] );
		}
	}
	// Sort the list alphabetically:
	pkgs.sort();

	// Write the database to file:
	writeFile( join( dpath, OUTPUT ), JSON.stringify( pkgs ) );
}

main();
