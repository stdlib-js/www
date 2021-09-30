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

// MODULES //

import React from 'react';
import PrintIcon from '@mui/icons-material/Print';


// FUNCTIONS //

/**
* Callback invoked upon clicking a button to print the current page.
*
* @private
* @param {Object} event - event
*/
function onClick( event ) {
	var theme;

	// Prevent default button behavior:
	event.preventDefault();

	// Cache the current theme value:
	theme = document.documentElement.getAttribute( 'data-theme' );

	 // Switch the theme to "light" for printing:
	document.documentElement.setAttribute( 'data-theme', 'light' );

	// Open the print dialog:
	window.print();

	// Restore the original theme:
	document.documentElement.setAttribute( 'data-theme', theme );
}


// MAIN //

/**
* Component for rendering a button to print the current page.
*
* @private
* @returns {ReactElement} React element
*/
function PrintButton() {
	return (
		<button className="print-button" onClick={ onClick } >
			<PrintIcon fontSize="inherit" aria-hidden="true" /> Print this page
		</button>
	);
}


// EXPORTS //

export default PrintButton;
