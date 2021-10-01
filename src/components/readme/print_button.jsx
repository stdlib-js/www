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


// MAIN //

/**
* Component for rendering a button to print the current page.
*
* @private
* @param {Object} props - component properties
* @param {string} props.version - documentation version
* @param {string} props.url - resource URL
* @returns {ReactElement} React element
*/
function PrintButton( props ) {
	var referenceNode;
	var footerNode;
	var headerNode;
	var footer;
	var header;
	var theme;
	var url;

	if ( typeof window !== 'undefined' ) {
		window.onbeforeprint = beforePrint;
		window.onafterprint = afterPrint;
	}
	return (
		<button className="print-button" onClick={ onClick } >
			<PrintIcon fontSize="inherit" aria-hidden="true" /> Print this page
		</button>
	);

	/**
	* Event handler invoked before printing.
	*
	* @private
	*/
	function beforePrint() {
		// Cache the current theme value:
		theme = document.documentElement.getAttribute( 'data-theme' );

		// Switch the theme to "light" for printing:
		document.documentElement.setAttribute( 'data-theme', 'light' );

		// Add a top margin header to the first page:
		headerNode = document.createElement( 'span' );
		headerNode.className = 'print-addendum';
		header = 'stdlib-js documentation';
		header += ' - Version: ' + props.version;
		header += ' - The Stdlib Authors © 2016-'+ ( new Date() ).getFullYear() + '.';
		headerNode.innerHTML = header;

		referenceNode = document.getElementById( 'readme' );
		referenceNode.parentNode.insertBefore( headerNode, referenceNode );

		// Add a bottom margin footer to the last page:
		footerNode = document.createElement( 'p' );
		footerNode.className = 'print-addendum';
		footer = 'Thank you for reading the documentation! If you have any questions, please join the discussion in our ';
		footer += '<a href="https://gitter.im/stdlib-js/stdlib-js">Gitter chat room</a>.';
		footer += '<br /><br />';
		url = window.location.origin + props.url;
		footer += 'Source: <a href="' + url + '" >' + url + '</a>';
		footer += ' (printed on: ' + new Date().toLocaleDateString() + ')';
		footerNode.innerHTML = footer;

		referenceNode = document.getElementById( 'readme' );
		referenceNode.parentNode.insertBefore( footerNode, referenceNode.nextSibling );
	}

	/**
	* Callback invoked upon clicking a button to print the current page.
	*
	* @private
	* @param {Object} event - event
	*/
	function onClick( event ) {
		// Prevent default button behavior:
		event.preventDefault();

		// Open the print dialog:
		window.print();
	}

	/**
	* Event handler invoked after printing.
	*
	* @private
	*/
	function afterPrint() {
		// Restore the original theme:
		document.documentElement.setAttribute( 'data-theme', theme );

		headerNode.parentNode.removeChild( headerNode );
		footerNode.parentNode.removeChild( footerNode );
	}
}


// EXPORTS //

export default PrintButton;
