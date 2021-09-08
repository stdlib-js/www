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

import HTML_FRAGMENT_CACHE from './caches/html_fragments.js';


// MAIN //

/**
* Fetches an HTML fragment.
*
* @private
* @param {string} path - fragment path
* @param {Callback} clbk - callback to invoke upon fetching a fragment
* @returns {(string|null)} fragment (if cached); otherwise, `null`
*/
function fetchFragment( path, clbk ) {
	var text = HTML_FRAGMENT_CACHE[ path ];
	if ( text ) {
		return clbk( null, text );
	}
	fetch( path+'?fragment=true' )
		.then( onResponse )
		.then( onText )
		.catch( onError );

	return null;

	/**
	* Callback invoked upon receiving an HTTP response.
	*
	* @private
	* @param {Object} response - HTTP response
	* @returns {(Promise|void)} promise
	*/
	function onResponse( response ) {
		var err;
		if ( response.ok ) {
			return response.text();
		}
		if ( response.status === 404 ) {
			err = new Error( 'resource not found. Resource: ' + path + '.' );
		} else {
			err = new Error( 'unexpected error. Resource: ' + path + '. Status code: ' + response.status + '.' );
		}
		onError( err );
	}

	/**
	* Callback invoked upon resolving a response body as text.
	*
	* @private
	* @param {string} text - response body
	*/
	function onText( text ) {
		HTML_FRAGMENT_CACHE[ path ] = text;
		clbk( null, text );
	}

	/**
	* Callback invoked upon encountering an error while fetching a fragment.
	*
	* @private
	* @param {Error} error - error object
	*/
	function onError( error ) {
		clbk( error );
	}
}


// EXPORTS //

export default fetchFragment;
