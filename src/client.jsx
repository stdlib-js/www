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
import { HelmetProvider } from 'react-helmet-async';
import qs from 'qs';
import fetchPackageData from './utils/fetch_package_data.js';
import resetScroll from './utils/reset_scroll.js';
import log from './utils/log.js';
import config from './config.js';
import App from './app.jsx';


// MAIN //

/**
* Component for rendering a client application.
*
* @private
*/
class ClientApp extends React.Component {
	/**
	* Returns a component for rendering a client application.
	*
	* @private
	* @constructor
	* @param {Object} props - component properties
	* @returns {ReactComponent} React component
	*/
	constructor( props ) {
		var pathname;
		var version;
		var query;
		var loc;
		var i;
		var j;

		super( props );

		// Retrieve the current window location:
		loc = window.location;
		pathname = loc.pathname;

		// Extract the version from the current window location...
		i = pathname.indexOf( config.mount ) + config.mount.length;
		j = pathname.substring( i ).indexOf( '/' );
		if ( j === -1 ) {
			version = '';
		} else {
			version = pathname.substring( i, i+j );
		}
		// If the extracted version is not supported, default to the latest supported version...
		if ( !version || !config.versions.includes( version ) || version === 'latest' ) {
			// TODO: should we inform the user that a version is not supported? Presumably. We could display a banner at the top, or something.
			version = config.versions[ 0 ];
		}
		// Resolve an initial search query, if present...
		query = loc.search || '';
		if ( query ) {
			query = qs.parse( query, {
				'ignoreQueryPrefix': true
			});
			query = query.q || '';
		}

		// Set the initial component state:
		this.state = {
			// Documentation version:
			'version': version,

			// Package data:
			'data': {},

			// Initial search query:
			'query': query
		}
	}

	/**
	* Callback invoked upon a change to the current documentation version.
	*
	* @private
	* @param {string} version - version
	*/
	_onVersionChange = ( version ) => {
		var self = this;

		// TODO: we should overlay a progress indicator while we load package data and lock the UI to prevent race conditions (see, e.g., https://material-ui.com/components/backdrop/; e.g., could pass down `loading` property to have the <App /> render the overlay)...
		fetchPackageData( version, clbk );

		/**
		* Callback invoked upon fetching package resources associated with a specified version.
		*
		* @private
		* @param {(Error|null)} error - error object
		* @param {Object} [data] - package data
		* @returns {void}
		*/
		function clbk( error, data ) {
			if ( error ) {
				// TODO: render a modal indicating that we are unable to update the version (e.g., due to network error, etc) (Note: we may need to reset the triggering UI element; e.g., the dropdown menu in the side menu)
				return log( error );
			}
			self.setState({
				'version': version,
				'data': data
			});
		}
	}

	/**
	* Callback invoked immediately after mounting a component (i.e., is inserted into a tree).
	*
	* @private
	*/
	componentDidMount() {
		var self;
		var el;

		self = this;

		// Remove any server-side generated Material-UI styles:
		el = document.querySelector( '#mui-ssr-styles' );
		if ( el ) {
			el.parentElement.removeChild( el );
		}
		// TODO: we should overlay a progress indicator while we load package data and lock the UI to prevent race conditions (see, e.g., https://material-ui.com/components/backdrop/)...
		fetchPackageData( this.state.version, clbk );

		/**
		* Callback invoked upon fetching package resources associated with a specified version.
		*
		* @param {(Error|null)} error - error object
		* @param {Object} [data] - package data
		* @returns {void}
		*/
		function clbk( error, data ) {
			if ( error ) {
				// TODO: render a modal indicating that we are unable to fetch package data (e.g., due to network error, etc)
				return log( error );
			}
			self.setState({
				'data': data
			});
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
			<BrowserRouter onUpdate={ resetScroll } >
				<HelmetProvider>
					<App
						version={ this.state.version }
						data={ this.state.data }
						query={ this.state.query }
						readme=""
						onVersionChange={ this._onVersionChange }
						onPackageChange={ this._onPackageChange }
					/>
				</HelmetProvider>
			</BrowserRouter>
		);
	}
}


// EXPORTS //

export default ClientApp;
