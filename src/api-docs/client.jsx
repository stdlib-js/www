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
import fetchPackageData from 'fetch-pkg-data';
import getCookies from 'get-cookies';
import cookieString from 'cookie-string';
import resetScroll from 'reset-scroll';
import log from 'log';
import config from 'config';
import App from './app.jsx';


// VARIABLES //

var COOKIES = [
	'theme',
	'mode',
	'examplesyntax',
	'prevnextnavigation'
];

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
		var allowCookies;
		var afterMount;
		var pathname;
		var version;
		var cookies;
		var query;
		var loc;
		var i;
		var j;

		super( props );

		// Retrieve the current window location:
		loc = window.location;
		pathname = loc.pathname;

		// Extract the version from the current window location...
		if ( pathname.startsWith( config.mount ) ) {
			// Remove the mount prefix (e.g., '/docs/api/'):
			afterMount = pathname.substring( config.mount.length );
			
			// Get the first segment (the version), up to the next '/':
			version = afterMount.split( '/' )[0] || '';
		} else {
			version = '';
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
		// Get the current list of cookies:
		cookies = document.cookie;

		// Resolve the current set of applicable cookie values:
		cookies = getCookies( cookies, COOKIES );

		// If cookies are present, we ASSUME that this means that a user has **opted-in** to allowing us to use cookies to store user preferences...
		allowCookies = false;
		for ( i = 0; i < COOKIES.length; i++ ) {
			if ( cookies[ COOKIES[ i ] ] ) {
				allowCookies = true;
				break;
			}
		}
		// Set the initial component state:
		this.state = {
			// Documentation version:
			'version': version,

			// Package data:
			'data': {},

			// Initial search query:
			'query': query,

			// Boolean indicating whether to allow use cookies for storing settings:
			'allowSettingsCookies': allowCookies,

			// Documentation theme:
			'theme': cookies.theme || config.theme,

			// Documentation "mode":
			'mode': cookies.mode || config.mode,

			// Example code syntax:
			'exampleSyntax': cookies.examplesyntax || config.exampleSyntax,

			// Previous/next package navigation:
			'prevNextNavigation': cookies.prevnextnavigation || config.prevNextNavigation
		};
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
	* Callback invoked upon a change to the setting indicating whether to allow cookies for storing settings.
	*
	* @private
	* @param {boolean} value - preference
	*/
	_onAllowSettingsCookiesChange = ( value ) => {
		var opts;

		// Check whether we should save settings as cookies...
		if ( value ) {
			document.cookie = cookieString( 'theme', this.state.theme );
			document.cookie = cookieString( 'mode', this.state.mode );
			document.cookie = cookieString( 'examplesyntax', this.state.exampleSyntax );
			document.cookie = cookieString( 'prevnextnavigation', this.state.prevNextNavigation );
		}
		// Otherwise, remove all existing setting cookies...
		else {
			opts = {
				'maxAge': -1
			};
			document.cookie = cookieString( 'theme', this.state.theme, opts );
			document.cookie = cookieString( 'mode', this.state.mode, opts );
			document.cookie = cookieString( 'examplesyntax', this.state.exampleSyntax, opts );
			document.cookie = cookieString( 'prevnextnavigation', this.state.prevNextNavigation, opts );
		}
		this.setState({
			'allowSettingsCookies': value
		});
	}

	/**
	* Callback invoked upon a change to the documentation theme.
	*
	* @private
	* @param {string} value - documentation theme
	*/
	_onThemeChange = ( value ) => {
		// Modify the document to reflect the desired theme:
		document.documentElement.setAttribute( 'data-theme', value );

		// If allowed, set the setting cookie...
		if ( this.state.allowSettingsCookies ) {
			document.cookie = cookieString( 'theme', value );
		}
		// Update the application to reflect the setting change:
		this.setState({
			'theme': value
		});
	}

	/**
	* Callback invoked upon a change to the documentation "mode".
	*
	* @private
	* @param {string} value - documentation "mode"
	*/
	_onModeChange = ( value ) => {
		// If allowed, set the setting cookie...
		if ( this.state.allowSettingsCookies ) {
			document.cookie = cookieString( 'mode', value );
		}
		// Update the application to reflect the setting change:
		this.setState({
			'mode': value
		});
	}

	/**
	* Callback invoked upon a change to the example code syntax.
	*
	* @private
	* @param {string} value - code syntax
	*/
	_onExampleSyntaxChange = ( value ) => {
		// If allowed, set the setting cookie...
		if ( this.state.allowSettingsCookies ) {
			document.cookie = cookieString( 'examplesyntax', value );
		}
		// Update the application to reflect the setting change:
		this.setState({
			'exampleSyntax': value
		});
	}

	/**
	* Callback invoked upon a change to the previous/next package navigation mode.
	*
	* @private
	* @param {string} value - navigation mode
	*/
	_onPrevNextNavChange = ( value ) => {
		// If allowed, set the setting cookie...
		if ( this.state.allowSettingsCookies ) {
			document.cookie = cookieString( 'prevnextnavigation', value );
		}
		// Update the application to reflect the setting change:
		this.setState({
			'prevNextNavigation': value
		});
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
						isClient={ true }

						version={ this.state.version }
						data={ this.state.data }
						query={ this.state.query }
						content=""

						allowSettingsCookies={ this.state.allowSettingsCookies }
						theme={ this.state.theme }
						mode={ this.state.mode }
						exampleSyntax={ this.state.exampleSyntax }
						prevNextNavigation={ this.state.prevNextNavigation }

						onVersionChange={ this._onVersionChange }

						onAllowSettingsCookiesChange={ this._onAllowSettingsCookiesChange }
						onThemeChange={ this._onThemeChange }
						onModeChange={ this._onModeChange }
						onExampleSyntaxChange={ this._onExampleSyntaxChange }
						onPrevNextNavChange={ this._onPrevNextNavChange }
					/>
				</HelmetProvider>
			</BrowserRouter>
		);
	}
}


// EXPORTS //

export default ClientApp;
