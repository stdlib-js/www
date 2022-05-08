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

/* eslint-disable no-invalid-this */

'use strict';

// MODULES //

var resolve = require( 'path' ).resolve;
var fs = require( 'fs' );


// VARIABLES //

var FOPTS = {
	'encoding': 'utf8'
};


// MAIN //

/**
* Callback invoked upon receiving an HTTP request.
*
* @private
* @param {Object} request - request object
* @param {Object} reply - reply object
* @returns {void}
*/
function handler( request, reply ) {
	var p;
	var v;

	v = request.params.version;
	request.log.info( 'Version: %s', v );

	p = resolve( this.rootDir, v, 'package', 'order.json' );
	request.log.info( 'Resolved path: %s', p );

	request.log.info( 'Returning file.' );
	reply.type( 'application/json' );
	reply.send( fs.createReadStream( p, FOPTS ) );
}


// EXPORTS //

module.exports = handler;
