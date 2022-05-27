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
import { StaticRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import App from './app.jsx';


// FUNCTIONS //

/**
* Function which does nothing.
*
* @private
*/
function noop() {
	// No-op...
}


// MAIN //

/**
* Component for rendering an application on the server.
*
* @private
* @param {Object} props - component properties
* @param {string} props.url - request URL
* @param {Object} props.context - router context
* @param {string} props.version - documentation version
* @param {Object} props.data - package data
* @param {string} props.query - search query
* @param {(string|Object)} props.content - initial content
* @param {string} props.theme - documentation theme
* @param {string} props.mode - documentation "mode"
* @param {string} props.exampleSyntax - example code syntax
* @param {string} props.prevNextNavigation - previous/next package navigation mode
* @returns {ReactElement} React element
*/
function ServerApp( props ) {
	return (
		<StaticRouter location={ props.url } context={ props.context } >
			<HelmetProvider context={ {} }>
				<App
					isClient={ false }

					version={ props.version }
					data={ props.data }
					query={ props.query }
					content={ props.content }

					allowSettingsCookies={ false }
					theme={ props.theme }
					mode={ props.mode }
					exampleSyntax={ props.exampleSyntax }
					prevNextNavigation={ props.prevNextNavigation }

					onVersionChange={ noop }

					onAllowSettingsCookiesChange={ noop }
					onThemeChange={ noop }
					onModeChange={ noop }
					onExampleSyntaxChange={ noop }
					onPrevNextNavChange={ noop }
				/>
			</HelmetProvider>
		</StaticRouter>
	);
}

/**
* Component property types.
*
* @constant
* @name propTypes
* @memberof ServerApp
* @type {Object}
*/
ServerApp.propTypes = {
	'url': PropTypes.string.isRequired,
	'context': PropTypes.object.isRequired,
	'version': PropTypes.string.isRequired,
	'data': PropTypes.object.isRequired,
	'query': PropTypes.string.isRequired,
	'content': PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.object
	]).isRequired,
	'theme': PropTypes.string.isRequired,
	'mode': PropTypes.string.isRequired,
	'exampleSyntax': PropTypes.string.isRequired,
	'prevNextNavigation': PropTypes.string.isRequired
};


// EXPORTS //

export default ServerApp;
