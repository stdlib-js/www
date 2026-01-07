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
* Component for rendering a download icon.
*
* @private
* @param {Object} props - component properties
* @returns {ReactElement} React element
*/
function DownloadIcon( props ) {
	return (
		<svg className="icon download-icon" version="1.1" xmlns="http://www.w3.org/2000/svg" x="0" y="0" viewBox="0 0 24 24" focusable="false" aria-hidden="true" {...props}><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"></path></svg>
	);
}


// EXPORTS //

export default DownloadIcon;
