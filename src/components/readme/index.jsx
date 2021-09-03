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


// MAIN //

/**
* Component for rendering a README.
*
* @private
* @param {Object} props - component properties
* @param {string} props.html - README HTML
* @param {Callback} props.onClick - callback to invoke upon clicking on README content
* @returns {ReactElement} React element
*/
function Readme( props ) {
	return (
		<div
			id="readme"
			className="readme"
			onClick={ props.onClick }
			suppressHydrationWarning
			dangerouslySetInnerHTML={ { '__html': props.html } }
		/>
	);
}


// EXPORTS //

export default Readme;
