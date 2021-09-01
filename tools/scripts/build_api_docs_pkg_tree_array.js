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
var documentationPath = require( './api_docs_path.js' );


// VARIABLES //

var OUTPUT = 'package_tree_array.json';


// FUNCTIONS //

/**
* Recursively builds a package tree array.
*
* ## Notes
*
* -   A package tree "node" has the following properties:
*
*     -   **key**: the last part of the package name (e.g., `math/base/special/sin` => `sin`). This corresponds to the "leaf" name.
*     -   **name**: full package name (e.g., `math/base/special/sin`).
*
* -   A namespace tree "node" has the same properties as a package tree "node" and has the following additional properties:
*
*     -   **children**: list of children "nodes".
*
* -   The returned array should look similar to the following:
*
*     ```text
*     [
*         {
*             "key": "array",
*             "name": "@stdlib/array",
*             "children": [
*                 {
*                     "key": "base",
*                     "name": "@stdlib/array/base",
*                     "children": [
*                         {
*                             "key": "foo",
*                             "name": "@stdlib/array/base/foo"
*                         },
*                         ...
*                     ]
*                 },
*                 ...,
*                 {
*                     "key": "bar",
*                     "name": "@stdlib/array/bar"
*                 },
*                 ...
*             ]
*         },
*         ...
*         {
*             "key": "types",
*             "name": "@stdlib/types"
*         },
*         ...
*     ]
*     ```
*
* @private
* @param {Object} tree
* @returns {ObjectArray} array of tree nodes
*/
function recurse( tree ) {
	var keys;
	var node;
	var out;
	var o;
	var i;
	var k;

	keys = objectKeys( tree );
	out = [];
	for ( i = 0; i < keys.length; i++ ) {
		k = keys[ i ];
		if ( k === '__namespace__' ) {
			continue;
		}
		node = tree[ k ];

		o = {};
		o.key = k;
		if ( typeof node === 'object' ) {
			o.name = node[ '__namespace__' ];
			o.children = recurse( node );
		} else {
			o.name = node;
		}
		out.push( o );
	}
	return out;
}


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
	var tree;
	var out;

	// Resolve the API documentation path:
	dpath = documentationPath();

	// Load the package tree...
	opts = {
		'encoding': 'utf8'
	};
	tree = readJSON( join( dpath, 'package_tree.json' ), opts );
	if ( tree instanceof Error ) {
		throw tree;
	}
	// Convert the tree to a "tree array":
	out = recurse( tree );

	// Write the database to file:
	writeFile( join( dpath, OUTPUT ), JSON.stringify( out ) );
}

main();
