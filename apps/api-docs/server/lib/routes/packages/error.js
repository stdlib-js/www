/**
* @license Apache-2.0
*
* Copyright (c) 2022 The Stdlib Authors.
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

// MAIN //

/**
* Callback invoked upon encountering an error.
*
* @private
* @param {Error} error - error object
* @param {Object} request - request object
* @param {Object} reply - reply object
* @returns {void}
*/
function handler( error, request, reply ) {
	if ( error.statusCode >= 500 ) {
		request.log.error( error );
	} else if ( error.statusCode >= 400 ) {
		request.log.info( error );
	} else {
		request.log.error( error );
	}
	return reply.status( 404 ).send( JSON.stringify({
		'statusCode': 404,
		'error': 'Not Found',
		'message': 'Route GET ' + request.url + ' not found'
	}));
}


// EXPORTS //

module.exports = handler;
