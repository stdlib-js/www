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
import PropTypes from 'prop-types';
import config from 'config';
import PrintIcon from './../icons/print.jsx';


// MAIN //

/**
* Component for rendering a button to print the current page.
*
* @private
*/
class PrintButton extends React.Component {
	/**
	* Returns a component which renders a button to print the current page.
	*
	* @private
	* @constructor
	* @param {Object} props - component properties
	* @param {string} props.url - resource URL
	* @param {string} props.version - documentation version
	* @returns {ReactComponent} React component
	*/
	constructor( props ) {
		super( props );

		// Current theme:
		this._theme = '';

		// DOM nodes added during printing:
		this._$footer = null;
	}

	/**
	* Callback invoked upon clicking a button to print the current page.
	*
	* @private
	* @param {Object} event - event
	*/
	_onClick = ( event ) => {
		// Prevent default button behavior:
		event.preventDefault();

		// Add event listeners:
		window.onbeforeprint = this._onBeforePrint;
		window.onafterprint = this._onAfterPrint;

		// Open the print dialog:
		window.print();
	}

	/**
	* Callback invoked before printing.
	*
	* @private
	*/
	_onBeforePrint = () => {
		var $readme;
		var text;

		// Cache the current theme:
		this._theme = document.documentElement.getAttribute( 'data-theme' );

		// Switch the theme to "light" for printing:
		document.documentElement.setAttribute( 'data-theme', 'light' );

		// Create a footer:
		this._$footer = document.createElement( 'section' );
		this._$footer.className = 'print-addendum';

		text = '<p>';
		text += 'Copyright (c) 2016-'+( new Date() ).getFullYear()+' The Stdlib Authors.';
		text += '</p>';
		text += '<p>';
		text += 'If you have any questions, please join the discussion on <a href="'+config.gitter+'">Gitter</a>.';
		text += '</p>';

		this._$footer.innerHTML = text;

		// Add the footer after the README content:
		$readme = document.getElementById( 'readme' );
		$readme.parentNode.insertBefore( this._$footer, $readme.nextSibling );
	}

	/**
	* Callback invoked after printing.
	*
	* @private
	*/
	_onAfterPrint = () => {
		// Restore the original theme:
		document.documentElement.setAttribute( 'data-theme', this._theme );

		// Remove the DOM nodes added during printing:
		this._$footer.parentNode.removeChild( this._$footer );

		// Remove the event listeners:
		delete window.onbeforeprint;
		delete window.onafterprint;
	}

	/**
	* Renders the component.
	*
	* @private
	* @returns {ReactElement} React element
	*/
	render() {
		return (
			<button className="print-button" onClick={ this._onClick } >
				<PrintIcon /> Print this page
			</button>
		);
	}
}

/**
* Component property types.
*
* @constant
* @name propTypes
* @memberof PrintButton
* @type {Object}
*/
PrintButton.propTypes = {
	'url': PropTypes.string.isRequired,
	'version': PropTypes.string.isRequired
};


// EXPORTS //

export default PrintButton;
