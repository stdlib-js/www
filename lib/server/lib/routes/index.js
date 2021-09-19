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

var status = require( './status.js' );
var ping = require( './ping.js' );
var home = require( './home.jsx' );
var version = require( './version.jsx' );
var landing = require( './landing.js' );
var search = require( './search.jsx' );
var pkgs = require( './packages.jsx' );
var namespaceList = require( './namespace_list.js' );
var packageData = require( './package_data.js' );
var packageDesc = require( './package_desc.js' );
var packageIndex = require( './package_index.js' );
var packageList = require( './package_list.js' );
var packageOrder = require( './package_order.js' );
var packageResources = require( './package_resources.js' );
var packageTree = require( './package_tree.js' );
var packageTreeArray = require( './package_tree_array.js' );


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
