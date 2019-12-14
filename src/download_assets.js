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
import log from './log.js';
import config from './config.js';


// MAIN //

/**
* Downloads package assets.
*
* @private
* @param {Array<string>} pkgs - list of packages
* @param {string} version - version
*/
function download( pkgs, version ) {
	var len;
	var i;

	len = pkgs.length;
	i = -1;

	next();

	/**
	* Downloads assets for the next package in the package list.
	*
	* @private
	* @returns {void}
	*/
	function next() {
		var path;

		i += 1;
		if ( i >= len ) {
			return;
		}
		path = config.mount + version + '/@stdlib/' + pkgs[ i ];
		if ( path.includes( '__namespace__' ) ) {
			return next();
		}
		fetch( path+'fragment=true' )
			.then( res => res.text() )
			.then( text => {
				HTML_FRAGMENT_CACHE[ path ] = text;
				next();
			})
			.catch( log );
	};
}


// EXPORTS //

export default download;
