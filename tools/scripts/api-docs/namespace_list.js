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
var mkdir = require( 'fs' ).mkdirSync;
var exists = require( '@stdlib/fs/exists' ).sync;
var writeFile = require( '@stdlib/fs/write-file' ).sync;
var namespaces = require( '@stdlib/_tools/pkgs/namespaces' ).sync;
var documentationPath = require( './../utils/api_docs_path.js' );


// VARIABLES //

var OUTPUT = 'namespace_list.json';


// MAIN //

/**
* Main execution sequence.
*
* @private
* @throws {Error} unexpected error
*/
function main() {
	var opts;
	var list;
	var dir;
	var i;

	dir = documentationPath();
	if ( !exists( dir ) ) {
		mkdir( dir );
	}
	// Resolve the list of namespaces:
	opts = {
		'ignore': [
			'**/_tools/**'
		]
	};
	list = namespaces( opts );

	// Remove the `@stdlib/` prefix...
	for ( i = 0; i < list.length; i++ ) {
		list[ i ] = list[ i ].substring( 8 ); // '@stdlib/' is 8 characters long
	}
	// Save as JSON file:
	opts = {
		'encoding': 'utf8'
	};
	writeFile( join( dir, OUTPUT ), JSON.stringify( list ), opts );
}

main();
