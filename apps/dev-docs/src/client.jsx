/**
* @license Apache-2.0
*
* Copyright (c) 2026 The Stdlib Authors.
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
import getCookies from 'get-cookies';
import cookieString from 'cookie-string';
import resetScroll from 'reset-scroll';
import log from 'log';
import config from 'config';
import App from './app.jsx';


// VARIABLES //

var COOKIES = [
	'theme'
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
		var pathname;
		var cookies;
		var query;
		var loc;
		var i;

		super( props );

		// Retrieve the current window location:
		loc = window.location;
		pathname = loc.pathname;

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
			// Initial search query:
			'query': query,

			// Boolean indicating whether to allow use cookies for storing settings:
			'allowSettingsCookies': allowCookies,

			// Documentation theme:
			'theme': cookies.theme || config.theme
		};
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
		}
		// Otherwise, remove all existing setting cookies...
		else {
			opts = {
				'maxAge': -1
			};
			document.cookie = cookieString( 'theme', this.state.theme, opts );
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
	* Callback invoked immediately after mounting a component (i.e., is inserted into a tree).
	*
	* @private
	*/
	componentDidMount() {
		var el;

		// Remove any server-side generated Material-UI styles:
		el = document.querySelector( '#mui-ssr-styles' );
		if ( el ) {
			el.parentElement.removeChild( el );
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

						query={ this.state.query }
						content=""

						allowSettingsCookies={ this.state.allowSettingsCookies }
						theme={ this.state.theme }

						onAllowSettingsCookiesChange={ this._onAllowSettingsCookiesChange }
						onThemeChange={ this._onThemeChange }
					/>
				</HelmetProvider>
			</BrowserRouter>
		);
	}
}


// EXPORTS //

export default ClientApp;
