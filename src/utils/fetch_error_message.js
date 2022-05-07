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

import qs from 'qs';
import config from './../config.js';


// VARIABLES //

var OPTS = {
	'arrayFormat': 'brackets'
};


// MAIN //

/**
* Retrieves a formatted error message.
*
* @private
* @param {string} version - documentation version
* @param {string} code - error code
* @param {Array} args - argument list
* @param {Callback} clbk - callback invoked upon receiving a formatted error message
* @returns {void}
*/
function fetchErrorMessage( version, code, args, clbk ) {
	fetch( config.mount+version+'/error/'+code+'?'+qs.stringify( { 'arg': args }, OPTS ) )
		.then( toJSON )
		.then( onResponse )
		.catch( done );

	/**
	* Callback invoked upon receiving a JSON resource.
	*
	* @private
	* @param {Object} res - response
	* @returns {Promise} promise to resolve the response as JSON
	*/
	function toJSON( res ) {
		return res.json();
	}

	/**
	* Callback invoked upon receiving a formatted error message.
	*
	* @private
	* @param {Object} json - JSON object
	* @param {string} json.code - error code
	* @param {Array} json.args - argument list
	* @param {string} json.pkg - package name
	* @param {string} json.msg - formatted error message
	*/
	function onResponse( json ) {
		done( null, json );
	}

	/**
	* Callback invoked upon resolving a formatted error message.
	*
	* @private
	* @param {(Error|null)} error - error object
	* @param {Object} [results] - results
	* @returns {void}
	*/
	function done( error, results ) {
		if ( error ) {
			return clbk( error );
		}
		clbk( null, results );
	}
}


// EXPORTS //

export default fetchErrorMessage;
