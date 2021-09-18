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

import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import resetScroll from './utils/reset_scroll.js';
import viewportWidth from './utils/viewport_width.js';
import config from './config.js';
import App from './app.jsx';


// MAIN //

/**
* Component for rendering a client application.
*
* ## Notes
*
* -   The client application defaults to the latest documentation version.
*
* @private
* @returns {ReactElement} React element
*/
function ClientApp() {
	var bool;
	var w;

	// Query the current viewport width:
	w = viewportWidth();

	// Default to showing the side menu, except on smaller devices:
	bool = Boolean( w && ( w >= 1080 ) );

	return (
		<BrowserRouter onUpdate={ resetScroll } >
			<App
				sideMenu={ bool }
				version={ config.versions[ 0 ] }
			/>
		</BrowserRouter>
	);
}


// EXPORTS //

export default ClientApp;
