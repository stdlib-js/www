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
import fetchFragment from './../../utils/fetch_fragment.js';
import log from './../../utils/log.js';
import notFoundHTML from './../not-found/html.js';
import ReadmeContent from './content.jsx';
import EditLink from './edit_link.jsx';


// MAIN //

/**
* Component for rendering a README.
*
* @private
*/
class Readme extends React.Component {
	/**
	* Returns a component for rendering a README.
	*
	* @private
	* @param {Object} props - component properties
	* @param {string} props.url - resource URL
	* @param {string} props.pkg - package name (e.g., `math/base/special/sin`)
	* @param {Callback} props.onClick - callback to invoke upon clicking on README content
	* @returns {ReactComponent} React component
	*/
	constructor( props ) {
		super( props );
		this.state = {
			// README content to render:
			'content': ''
		};
	}

	/**
	* Fetches a package README fragment.
	*
	* @private
	* @param {string} path - fragment path (i.e., URL)
	* @returns {string} HTML string
	*/
	_fetchFragment( path ) {
		var self;

		self = this;

		// Fetch a package README fragment:
		fetchFragment( path, clbk );

		/**
		* Callback invoked upon fetching a fragment.
		*
		* @private
		* @param {(Error|null)} error - error object
		* @param {string} fragment - README fragment
		* @returns {void}
		*/
		function clbk( error, fragment ) {
			if ( error ) {
				// Guard against race conditions (e.g., a fragment fails to resolve *after* a user subsequently navigated to a different package whose associated fragment already resolved)...
				if ( path === self.props.url ) {
					self.setState({
						'content': notFoundHTML()
					});
				}
				return log( error );
			}
			// Guard against race conditions (e.g., a fragment is resolved *after* a user subsequently navigated to a different package whose associated fragment already resolved)...
			if ( path === self.props.url ) {
				self.setState({
					'content': fragment
				});
			}
		}
	}

	/**
	* Callback invoked immediately after mounting a component (i.e., is inserted into a tree).
	*
	* @private
	*/
	componentDidMount() {
		this._fetchFragment( this.props.url );
	}

	/**
	* Callback invoked immediately after updating a component.
	*
	* @private
	* @param {Object} prevProps - previous properties
	* @param {Object} prevState - previous state
	*/
	componentDidUpdate( prevProps ) {
		if ( this.props.url !== prevProps.url ) {
			this._fetchFragment( this.props.url );
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
			<div
				id="readme"
				className="readme"
			>
				<ReadmeContent
					html={ this.state.content }
					onClick={ this.props.onClick }
				/>
				<section className="readme-addendum" role="navigation">
					{ ( this.state.content ) ? <EditLink pkg={ this.props.pkg } /> : null }
				</section>
			</div>
		);
	}
}


// EXPORTS //

export default Readme;
