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
import { Link } from 'react-router-dom';
import fetchMessage from './../../utils/fetch_error_message.js';
import pkgPath from './../../utils/pkg_doc_path.js';
import log from './../../utils/log.js';
import NotFound from './../not-found/index.jsx';
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
	* @param {string} props.code - error code
	* @param {Array} props.args - argument list
	* @param {Callback} props.onClose - callback to invoke upon closing the error decoder
	* @param {string} [props.pkg] - package name
	* @param {string} [props.content] - initial error message content
	* @returns {ReactComponent} React component
	*/
	constructor( props ) {
		super( props );
		this.state = {
			// Affected package:
			'pkg': props.pkg || '',

			// Error message to render:
			'content': props.content || '',

			// Boolean indicating whether a resource could not be found:
			'notFound': false
		}
	}

	/**
	* Fetches a formatted error message.
	*
	* @private
	* @param {string} code - error code
	* @param {Array} args - argument list
	*/
	_fetchMessage( code, args ) {
		var self = this;

		// WARNING: we hardcode the version to `latest`, as we expect the underlying error database to be append-only (meaning, the error message database will contain the error messages from the current version and all prior versions)...
		fetchMessage( 'latest', code, args, clbk );

		/**
		* Callback invoked upon fetching a formatted error message.
		*
		* @private
		* @param {(Error|null)} error - error object
		* @param {Object} res - formatted error message
		* @returns {void}
		*/
		function clbk( error, res ) {
			if ( error ) {
				// Guard against race conditions (e.g., a user subsequently navigated to a different error decoder page whose associated error message already resolved)...
				if ( code === self.props.code && JSON.stringify( args ) === JSON.stringify( self.props.args ) ) {
					self.setState({
						'pkg': '',
						'content': '',
						'notFound': true
					});
				}
				return log( error );
			}
			// Guard against race conditions (e.g.,a user subsequently navigated to a different error decoder page whose associated error message already resolved)...
			if ( res.code === self.props.code && JSON.stringify( res.args ) === JSON.stringify( self.props.args ) ) {
				self.setState({
					'pkg': res.pkg,
					'content': res.msg,
					'notFound': false
				});
			}
		}
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
				When you encounter an exception, you will receive a link to this page for that specific error, and, upon opening the provided link, this page will display the full error message in the space below.
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
				<pre><code>
{ msg }
				</code></pre>
				{ this.state.pkg ?
					<p>
						<span>Package: </span>
						<Link to={ pkgPath( this.state.pkg, 'latest' ) } >
							{ this.state.pkg }
						</Link>
					</p>
					:
					null
				}
			</div>
		);
	}

	/**
	* Callback invoked immediately after mounting a component (i.e., is inserted into a tree).
	*
	* @private
	*/
	componentDidMount() {
		if ( this.props.code ) {
			this._fetchMessage( this.props.code, this.props.args );
		}
	}

	/**
	* Callback invoked immediately after updating a component.
	*
	* @private
	* @param {Object} prevProps - previous properties
	* @param {Object} prevState - previous state
	*/
	componentDidUpdate( prevProps ) {
		if ( this.props.code !== prevProps.code || JSON.stringify( this.props.args ) !== JSON.stringify( prevProps.args ) ) {
			this._fetchMessage( this.props.code, this.props.args );
		}
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
					{ ( this.state.notFound ) ?
						<NotFound />
						:
						<Fragment>
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
								{ this.state.content ? this._renderError( this.state.content ) : this._renderLanding() }
							</section>
						</Fragment>
					}
				</div>
			</Fragment>
		);
	}
}


// EXPORTS //

export default ErrorDecoder;
