/**
* @license Apache-2.0
*
* Copyright (c) 2026 The Stdlib Authors.
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

/**
* Create an HTTP server for serving developer documentation.
*
* @module path/to/apps/dev-docs/server
*
* @example
* var httpServer = require( 'path/to/apps/dev-docs/server' );
* var App = require( 'my-app' );
*
* var opts = {
*     'port': 7331,
*     'address': '0.0.0.0'
* };
* var createServer = httpServer( opts );
*
* function done( error, fastify ) {
*     if ( error ) {
*         return console.error( error.message );
*     }
*     console.log( 'Success!' );
*     fastify.close();
* }
*
* createServer( App, done );
*/

// MODULES //

var main = require( './main.js' );


// EXPORTS //

module.exports = main;
