/**
* @license Apache-2.0
*
* Copyright (c) 2022 The Stdlib Authors.
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
import CloseIcon from './../../icons/close.jsx';


// MAIN //

/**
* Component for rendering the settings menu head.
*
* @private
* @param {Object} props - component properties
* @param {Callback} props.onClose - callback to invoke upon a "close" event
* @returns {ReactElement} React element
*/
function Head( props ) {
	return (
		<div className="settings-menu-head" >
			<h1>
				<span>Settings</span>
				<button
					className="icon-button settings-menu-close-button"
					title="Close settings menu"
					aria-label="close settings"
					onClick={ props.onClose }
				>
					<CloseIcon />
				</button>
			</h1>
		</div>
	);
}


// EXPORTS //

export default Head;
