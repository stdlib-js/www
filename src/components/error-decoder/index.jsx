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

import React, { Fragment } from 'react';
import ClearIcon from './../icons/close.jsx';


// MAIN //

/**
* Component for displaying decoded error messages.
*
* @private
*/
class ErrorDecoder extends React.Component {
	/**
	* Returns a component for displaying decoding error messages.
	*
	* @private
	* @constructor
	* @param {Object} props - component properties
	* @param {string} props.content - error message content
	* @param {Callback} props.onClose - callback to invoke upon closing the error decoder
	* @returns {ReactComponent} React component
	*/
	constructor( props ) {
		super( props );
	}

	/**
	* Renders a landing message.
	*
	* @private
	* @returns {ReactElement} React element
	*/
	_renderLanding() {
		return (
			<p className="error-decoder-landing">
				When you encounter an exception, you will receive a link to this page and for that specific error, and this page will display the full error message in the space below.
			</p>
		);
	}

	/**
	* Renders an error message.
	*
	* @private
	* @param {string} msg - error message
	* @returns {ReactElement} React element
	*/
	_renderError( msg ) {
		return (
			<div className="error-decoder-message">
				<p>
					The full text of the error you encountered is the following:
				</p>
				<code>
					{ msg }
				</code>
			</div>
		);
	}

	/**
	* Renders the component.
	*
	* @private
	* @returns {ReactElement} React element
	*/
	render() {
		return (
			<Fragment>
				<div id="readme" className="readme error-decoder" >
					<h1>
						<span>Error Decoder</span>
						<button
							className="icon-button"
							title="Close decoder"
							aria-label="close"
							onClick={ this.props.onClose }
						>
							<ClearIcon />
						</button>
					</h1>
					<section className="error-decoder-content">
						<blockquote>
							<p>
								In minified stdlib production builds, we avoid including full error messages in order to reduce bundle sizes and, thus, the number of bytes sent over the wire.
							</p>
						</blockquote>
						<p>
							If you are directly depending on stdlib packages and wanting to debug locally, one option is to install unminified stdlib packages and bundle from source, thus allowing access to full error messages. Otherwise, if you encounter an exception while using a production build, this page will reassemble the original text of the error.
						</p>
						{ this.props.content ? this._renderError( this.props.content ) : this._renderLanding() }
					</section>
				</div>
			</Fragment>
		);
	}
}


// EXPORTS //

export default ErrorDecoder;
