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
import { Helmet } from 'react-helmet-async';


// MAIN //

/**
* Component for updating the `<head>` of the document when navigating to a new page.
*
* @private
* @param {Object} props - component properties
* @param {string} props.title - document title
* @param {string} props.description - document description
* @param {string} props.url - document URL
* @returns {ReactElement} React element
*/
function Head( props ) {
	var url;
	var t;

	t = props.title + ' | stdlib';
	url = 'https://stdlib.io' + props.url;

	return (
		<Helmet>
			<title>{ t }</title>
			<meta name="description" content={ props.description } />

			<link rel="canonical" href={ url } />

			<meta property="og:url" content={ url } />
			<meta property="og:title" content={ t } />
			<meta property="og:description" content={ props.description } />

			<meta name="twitter:card" content={ t } />
			<meta name="twitter:url" content={ url } />
			<meta name="twitter:description" content={ props.description } />
		</Helmet>
	);
}

/**
* Component property types.
*
* @constant
* @name propTypes
* @memberof Head
* @type {Object}
*/
Head.propTypes = {
	'title': PropTypes.string.isRequired,
	'description': PropTypes.string.isRequired,
	'url': PropTypes.string.isRequired
};


// EXPORTS //

export default Head;
