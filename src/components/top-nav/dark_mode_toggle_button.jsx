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
import IconButton from '@mui/material/IconButton';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';


// MAIN //

/**
* Component for displaying a button to toggle between light and dark mode.
*
* @param {Object} props - component properties
* @param {boolean} props.darkMode - boolean indicating whether the documentation is displayed in dark mode
* @param {Callback} props.onToggle - callback to invoke upon clicking the button to toggle dark mode
* @returns {ReactComponent} React component
*/
function DarkModeToggleButton( props ) {
	if ( props.darkMode ) {
		return (
			<IconButton
				className="icon-button top-nav-download-button"
				title="Switch to light mode"
				aria-label="switch to light mode"
				size="large"
				onClick={props.onToggle}
			>
				<LightModeIcon aria-hidden="true" />
			</IconButton>
		);
	}
	return (
		<IconButton
			className="icon-button top-nav-download-button"
			title="Switch to dark mode"
			aria-label="switch to dark mode"
			size="large"
			onClick={props.onToggle}
		>
			<DarkModeIcon aria-hidden="true" />
		</IconButton>
	);
}



// EXPORTS //

export default DarkModeToggleButton;
