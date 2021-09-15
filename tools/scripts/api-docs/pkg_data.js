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
var documentationPath = require( './../utils/api_docs_path.js' );


// VARIABLES //

var OUTPUT = 'package_data.json';
var FOPTS = {
	'encoding': 'utf8'
};



// MAIN //

/**
* Main execution sequence.
*
* @private
* @throws {Error} unexpected error
*/
function main() {
	var dpath;
	var data;
	var out;

	out = {};

	// Resolve the API documentation path:
	dpath = documentationPath();

	// Load the list of packages...
	data = readJSON( join( dpath, 'package_list.json' ), FOPTS );
	if ( data instanceof Error ) {
		throw data;
	}
	out.packages = data;

	// Load the package tree...
	data = readJSON( join( dpath, 'package_tree_array.json' ), FOPTS );
	if ( data instanceof Error ) {
		throw data;
	}
	out.tree = data;

	// Load package resources...
	data = readJSON( join( dpath, 'package_resources.json' ), FOPTS );
	if ( data instanceof Error ) {
		throw data;
	}
	out.resources = data;

	// Load the package order...
	data = readJSON( join( dpath, 'package_order.json' ), FOPTS );
	if ( data instanceof Error ) {
		throw data;
	}
	out.order = data;

	// Load the list of namespaces...
	data = readJSON( join( dpath, 'namespace_list.json' ), FOPTS );
	if ( data instanceof Error ) {
		throw data;
	}
	out.namespaces = data;

	// Write the database to file:
	writeFile( join( dpath, OUTPUT ), JSON.stringify( out ) );
}

main();
