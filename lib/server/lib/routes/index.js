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
var home = require( './home.jsx' );
var help = require( './help.jsx' );
var errorDecoder = require( './error_decoder.jsx' );
var errorMessage = require( './error_message.js' );
var version = require( './version.jsx' );
var landing = require( './landing.js' );
var search = require( './search.jsx' );
var pkgs = require( './packages.jsx' );
var namespaceList = require( './namespace_list.js' );
var packageData = require( './package_data' );
var packageDesc = require( './package_desc' );
var packageIndex = require( './package_index' );
var packageList = require( './package_list' );
var packageOrder = require( './package_order' );
var packageResources = require( './package_resources' );
var packageTree = require( './package_tree' );
var packageTreeArray = require( './package_tree_array' );


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
	fastify.route( home( options ) );             // /docs/api
	fastify.route( version( options ) );          // /docs/api/:version
	fastify.route( landing() );                   // /docs/api/:version/@stdlib

	// Package search:
	fastify.route( search( options ) );           // /docs/api/:version/search

	// Help page:
	fastify.route( help( options ) );             // /docs/api/:version/help

	// Error decoder routes:
	fastify.route( errorDecoder( options ) );     // /docs/api/:version/error/decoder
	fastify.route( errorMessage( options ) );     // /docs/api/:version/error/:code

	// Package data files:
	fastify.route( namespaceList( options ) );    // /docs/api/:version/namespace_list.json
	fastify.route( packageData( options ) );      // /docs/api/:version/package_data.json
	fastify.route( packageDesc( options ) );      // /docs/api/:version/package_desc.json
	fastify.route( packageIndex( options ) );     // /docs/api/:version/package_index.json
	fastify.route( packageList( options ) );      // /docs/api/:version/package_list.json
	fastify.route( packageOrder( options ) );     // /docs/api/:version/package_order.json
	fastify.route( packageResources( options ) ); // /docs/api/:version/package_resources.json
	fastify.route( packageTree( options ) );      // /docs/api/:version/package_tree.json
	fastify.route( packageTreeArray( options ) ); // /docs/api/:version/package_tree_array.json

	// Package asset routes:
	fastify.route( pkgs( options ) );             // /docs/api/:version/@stdlib/*

	done();
}


// EXPORTS //

module.exports = register;
