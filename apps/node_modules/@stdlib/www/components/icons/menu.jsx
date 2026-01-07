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


// MAIN //

/**
* Component for rendering a menu icon.
*
* @private
* @param {Object} props - component properties
* @returns {ReactElement} React element
*/
function MenuIcon( props ) {
	return (
		<svg className="icon menu-icon" version="1.1" xmlns="http://www.w3.org/2000/svg" x="0" y="0" viewBox="0 0 24 24" focusable="false" aria-hidden="true" {...props}><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path></svg>
	);
}


// EXPORTS //

export default MenuIcon;
