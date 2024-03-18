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
import PropTypes from 'prop-types';
import fetchFragment from 'fetch-fragment';
import log from 'log';
import NotFound from './../not-found/index.jsx';
import Breadcrumbs from './breadcrumbs.jsx';
import ReadmeContent from './content.jsx';
import EditLink from './edit_link.jsx';
import Feedback from './feedback.jsx';
import Pagination from './pagination.jsx';
import PrintButton from './print_button.jsx';


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
	* @constructor
	* @param {Object} props - component properties
	* @param {string} props.url - resource URL
	* @param {string} props.pkg - package name (e.g., `math/base/special/sin`)
	* @param {string} props.version - documentation version
	* @param {string} [props.content] - initial content
	* @param {string} [props.prev] - previous package name
	* @param {string} [props.next] - next package name
	* @param {boolean} props.shortcuts - boolean indicating whether keyboard shortcuts are active
	* @param {Callback} props.onClick - callback to invoke upon clicking on README content
	* @returns {ReactComponent} React component
	*/
	constructor( props ) {
		super( props );
		this.state = {
			// README content to render:
			'content': props.content || '',

			// Boolean indicating whether a resource could not be found:
			'notFound': false
		};
	}

	/**
	* Fetches a package README fragment.
	*
	* @private
	* @param {string} path - fragment path (i.e., URL)
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
						'content': '',
						'notFound': true
					});
				}
				return log( error );
			}
			// Guard against race conditions (e.g., a fragment is resolved *after* a user subsequently navigated to a different package whose associated fragment already resolved)...
			if ( path === self.props.url ) {
				self.setState({
					'content': fragment,
					'notFound': false
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
		// NOTE: we make rendering the addendum conditional on the content in order to avoid a flash while resolving the README HTML...
		return (
			<div
				id="readme"
				className="readme"
			>
				<Breadcrumbs
					pkg={ this.props.pkg }
					version={ this.props.version }
				/>
				{ ( this.state.notFound ) ?
					<NotFound />
					:
					<ReadmeContent
						html={ this.state.content }
						onClick={ this.props.onClick }
					/>
				}
				{ ( this.state.content ) ?
					<section className="readme-addendum">
						<nav className="readme-bottom-nav">
							<div className="edit-print-wrapper">
								<PrintButton
									version={ this.props.version }
									url={ this.props.url }
								/>
								<EditLink pkg={ this.props.pkg } />
							</div>
							<Pagination
								prev={ this.props.prev }
								next={ this.props.next }
								version={ this.props.version }
								shortcuts={ this.props.shortcuts }
								aria-label="pagination"
							/>
						</nav>
						<Feedback
							key={ this.props.pkg }
							pkg={ this.props.pkg }
							url={ this.props.url }
							version={ this.props.version }
						/>
					</section>
					:
					null
				}
			</div>
		);
	}
}

/**
* Component property types.
*
* @constant
* @name propTypes
* @memberof Readme
* @type {Object}
*/
Readme.propTypes = {
	'url': PropTypes.string.isRequired,
	'pkg': PropTypes.string.isRequired,
	'version': PropTypes.string.isRequired,
	'content': PropTypes.string,
	'prev': PropTypes.string,
	'next': PropTypes.string,
	'onClick': PropTypes.func.isRequired,
	'shortcuts': PropTypes.bool.isRequired
};


// EXPORTS //

export default Readme;
