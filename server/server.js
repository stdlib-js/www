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

var path = require( 'path' );
var httpServer = require( './../lib/server' );
var config = require( './../src/node_modules/config' );
var App = require( './../src/server.jsx' ).default;


// VARIABLES //

var PUBLIC_DIR = path.resolve( __dirname, '..', 'public' );
var BUILD_DIR = path.join( PUBLIC_DIR, 'docs', 'api' );
var PORT = 3000;


// FUNCTIONS //

/**
* Callback invoked upon starting a server.
*
* @private
* @param {(Error|null)} error - error object
* @param {Object} fastify - fastify instance
*/
function done( error ) {
	if ( error ) {
		throw error;
	}
	console.log( 'Server is running...' );
}


// MAIN //

/**
* Main execution sequence.
*
* @private
*/
function main() {
	var opts = {
		'latest': config.versions[ 0 ],
		'logger': 'info',
		'port': PORT,
		'prefix': [
			// Note: number of prefixes must equal the number of static directories...
			'/docs/api/static/',
			'/css/',
			'/js/',
			'/img/'
		],
		'root': BUILD_DIR,
		'static': [
			// Note: number of static directories must equal the number of prefixes...
			path.join( BUILD_DIR, 'static' ),
			path.join( PUBLIC_DIR, 'css' ),
			path.join( PUBLIC_DIR, 'js' ),
			path.join( PUBLIC_DIR, 'img' )
		]
	};
	httpServer( opts )( App, done );
}

main();
