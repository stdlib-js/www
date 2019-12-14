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
import HTML_FRAGMENT_CACHE from './html_fragment_cache.js';


// MAIN //

/**
* Returns a React component for rendering a README.
*
* @private
* @param {Object} props - component properties
* @returns {ReactComponent} React component
*/
function ReadmePage( props ) {
	// TODO: consider whether to redirect to a 404 page
	var html = HTML_FRAGMENT_CACHE[ props.path ] || '{{ FRAGMENT }}';
	return (
		<div
			id="readme-container"
			className="readme"
			suppressHydrationWarning
			dangerouslySetInnerHTML={{ __html: html }}
		/>
	);
};


// EXPORTS //

export default ReadmePage;
