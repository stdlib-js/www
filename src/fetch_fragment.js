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

import HTML_FRAGMENT_CACHE from './html_fragment_cache.js';


// MAIN //

/**
* Fetches an HTML fragment.
*
* @private
* @param {string} path - fragment path
* @param {Callback} clbk - callback to invoke upon asynchronously fetching a fragment
* @returns {(string|null)} fragment (if cached); otherwise, `null`
*/
function fetchFragment( path, clbk ) {
	if ( HTML_FRAGMENT_CACHE[ path ] ) {
		return HTML_FRAGMENT_CACHE[ path ];
	}
	fetch( path+'?fragment=true' )
		.then( res => res.text() )
		.then( res => {
			HTML_FRAGMENT_CACHE[ path ] = res;
			clbk( null, res );
		})
		.catch( onError );

	return null;

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
