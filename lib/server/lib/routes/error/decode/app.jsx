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

/* eslint-disable no-restricted-syntax */

'use strict';

// MODULES //

var React = require( 'react' );
var StylesProvider = require( '@mui/styles' ).StylesProvider;


// MAIN //

/**
* Returns a wrapped application for server-side rendering.
*
* @private
* @param {ReactElement} App - application element
* @param {string} url - request URL
* @param {string} version - documentation version
* @param {Object} content - initial content (for SSR)
* @param {Object} context - server-side router context
* @returns {ReactElement} React element
*/
function WrappedApp( App, url, version, content, context ) {
	return (
		<StylesProvider>
			<App
				url={ url }
				version={ version }
				data={ {} }
				query=''
				content={ content }
				context={ context }
			/>
		</StylesProvider>
	);
}


// EXPORTS //

module.exports = WrappedApp;
