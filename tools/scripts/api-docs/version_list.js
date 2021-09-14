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
var stat = require( 'fs' ).statSync;
var readDir = require( '@stdlib/fs/read-dir' ).sync;
var writeFile = require( '@stdlib/fs/write-file' ).sync;
var dirname = require( '@stdlib/utils/dirname' );
var documentationPath = require( './../utils/api_docs_path.js' );


// VARIABLES //

var EXCLUDE = [
	'static'
];
var OUTPUT = 'versions.json';


// MAIN //

/**
* Resolves a list of documentation versions.
*
* @private
* @throws {Error} unexpected error
*/
function main() {
	var stats;
	var list;
	var dir;
	var out;
	var f;
	var i;

	// Resolve the API documentation directory:
	dir = dirname( documentationPath() );

	// Get the list of directory contents:
	list = readDir( dir );
	if ( list instanceof Error ) {
		throw list;
	}
	// Resolve the list of version directories...
	out = [];
	for ( i = 0; i < list.length; i++ ) {
		f = list[ i ];
		stats = stat( join( dir, f ) );
		if ( stats.isDirectory() === false ) {
			continue;
		}
		if ( EXCLUDE.indexOf( f ) >= 0 ) {
			continue;
		}
		out.push( f );
	}
	// Write the list of versions to file:
	writeFile( join( dir, OUTPUT ), JSON.stringify( out ) );
}

main();
