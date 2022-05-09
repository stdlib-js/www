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

var status = require( './status' );
var ping = require( './ping' );
var home = require( './home' );
var help = require( './help' );
var errorDecoder = require( './error/decoder' );
var errorMessage = require( './error/message' );
var version = require( './version' );
var landing = require( './landing' );
var search = require( './search' );
var pkgs = require( './packages.jsx' );
var packageData = require( './package/data' );
var packageDesc = require( './package/desc' );
var packageIndex = require( './package/index' );
var packageList = require( './package/list' );
var namespaceList = require( './package/namespaces' );
var packageOrder = require( './package/order' );
var packageResources = require( './package/resources' );
var packageTree = require( './package/tree' );
var packageTreeArray = require( './package/tree-array' );


// MAIN //

/**
* Registers routes on a Fastify instance.
*
* @private
* @param {Object} fastify - Fastify instance
* @param {Object} options - options
* @param {Function} done - callback to invoke upon registering route handlers
*/
function register( fastify, options, done ) {
	// Status routes:
	fastify.route( status() );                    // /status
	fastify.route( ping() );                      // /ping

	// Landing page routes:
	fastify.route( home() );                      // /docs/api
	fastify.route( version() );                   // /docs/api/:version
	fastify.route( landing() );                   // /docs/api/:version/@stdlib

	// Package search:
	fastify.route( search() );                    // /docs/api/:version/search

	// Help page:
	fastify.route( help() );                      // /docs/api/:version/help

	// Error decoder routes:
	fastify.route( errorDecoder() );              // /docs/api/:version/error/decoder
	fastify.route( errorMessage() );              // /docs/api/:version/error/:code

	// Package data files:
	fastify.route( packageData() );               // /docs/api/:version/package/data.json
	fastify.route( packageDesc() );               // /docs/api/:version/package/desc.json
	fastify.route( packageIndex() );              // /docs/api/:version/package/index.json
	fastify.route( packageList() );               // /docs/api/:version/package/list.json
	fastify.route( namespaceList() );             // /docs/api/:version/package/namespaces.json
	fastify.route( packageOrder() );              // /docs/api/:version/package/order.json
	fastify.route( packageResources() );          // /docs/api/:version/package/resources.json
	fastify.route( packageTree() );               // /docs/api/:version/package/tree.json
	fastify.route( packageTreeArray() );          // /docs/api/:version/package/tree-array.json

	// Package asset routes:
	fastify.route( pkgs( options ) );             // /docs/api/:version/@stdlib/*

	done();
}


// EXPORTS //

module.exports = register;
