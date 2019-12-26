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

// MODULES //

import React from 'react';
import ReactDOMServer from 'react-dom/server';
import fs from 'fs';
import { resolve, join } from 'path';
import httpServer from '@stdlib/_tools/docs/www/server';
import config from './../src/config.js';
import App from './../src/server.jsx';


// VARIABLES //

var BUILD_DIR = resolve( __dirname, '..', 'public', 'docs', 'api' );
var PORT = 3000;


// FUNCTIONS //

/**
* Returns an application shell template.
*
* @private
* @returns {string} template
*/
function template() {
	var str = fs.readFileSync( join( BUILD_DIR, 'index.html' ), 'utf8' );
	return str.replace( '<div id="root"></div>', `<div id="root">${ReactDOMServer.renderToString( <App /> )}</div>` );
}

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
		'logger': true,
		'port': PORT,
		'prefix': '/docs/api/',
		'root': BUILD_DIR,
		'static': BUILD_DIR,
		'template': template()
	};
	httpServer( opts )( done );
}

main();
