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
var mkdir = require( 'fs' ).mkdirSync;
var exists = require( '@stdlib/fs/exists' ).sync;
var readFile = require('@stdlib/fs/read-file').sync;
var readdir = require('@stdlib/fs/read-dir').sync;
var writeFile = require('@stdlib/fs/write-file').sync;
var build = require( '@stdlib/_tools/docs/www/readme-fragment-file-tree' );
var stdlibPath = require( './../utils/stdlib_path.js' );
var stdlibVersion = require( './../utils/stdlib_version.js' );
var documentationPath = require( './../utils/api_docs_path.js' );


// MAIN //

/**
* Main execution sequence.
*
* @private
*/
function main() {
	var opts;
	var dir;

	dir = documentationPath();
	if ( !exists( dir ) ) {
		mkdir( dir );
	}
	opts = {
		'base': '/docs/api/'+stdlibVersion()+'/',
		'dir': join( stdlibPath(), 'lib', 'node_modules' ),
		'ignore': [
			'benchmark/**',
			'bin/**',
			'build/**',
			'docs/**',
			'etc/**',
			'examples/**',
			'reports/**',
			'scripts/**',
			'test/**',
			'**/_tools/**'
		]
	};
	build( dir, opts, done );

	/**
	* Callback invoked upon completion.
	*
	* @private
	* @param {Error} [err] - error object
	* @throws {Error} unexpected error
	*/
	function done( err ) {
		if ( err ) {
			throw err;
		}
		console.log( 'Finished generating HTML fragments.' );
		processHeadings(dir);
	}
}

/**
* Processes html files to add anchor tag with ids to headings.
* @param {string} baseDir - Api docs directory
*/

function processHeadings(baseDir){
	const outputDir = join(baseDir, '@stdlib');
	
	function processDir(currentDir){
		const items = readdir(currentDir);
		if(items instanceof Error){
			console.error(`Error: ${items.message}`);
			return;
		}
		
		items.forEach(item => {
			const fullPath = join(currentDir, item)
			if(!exists(fullPath)){
				return;
			}
			 
			const dirContents = readdir(fullPath);
			if(dirContents && !(dirContents instanceof Error)){
				processDir(fullPath);
			}else if(item === 'index.html'){
				
				let html = readFile(fullPath, 'utf8');
				if(html instanceof Error){
					console.error(`Error: ${html.message}`);
					return;
				}
				
				const headingRegex = /<(h[1-6])(.*?)>(.*?)<\/\1>/gi;
				html = html.replace(headingRegex, (match, tag, attrs, content) => {
					let id = content.toLowerCase().replace(/[^a-z0-9\s]/g, '').trim().replace(/\s+/g, '-').replace(/-+/g, '-');
					return `<a id="${id}" class="heading-link" href="#${id}"></a><${tag}${attrs}>${content}</${tag}>`;
					
				})
				
				const err = writeFile(fullPath, html);
				if(err){
					console.error(`Error: ${err.message}`);
				}
			}
		});
		
	}
	processDir(outputDir);
}

main();
