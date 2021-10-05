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
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';


// MAIN //

/**
* Component for displaying a button to toggle between light and dark mode.
*
* @param {Object} props - component properties
* @param {string} props.mode - current mode (either `'light'` or `'dark'`)
* @param {Callback} props.onToggle - callback to invoke upon clicking the button to toggle between dark and light mode
* @returns {ReactComponent} React component
*/
function DarkModeToggleButton( props ) {
	return (
		<ToggleButtonGroup
			value={props.mode}
			exclusive
			onChange={props.onToggle}
			aria-label="theme"
		>
			<ToggleButton value="light" aria-label="light theme" >
				<LightModeIcon aria-hidden="true" /> Light
			</ToggleButton>
			<ToggleButton value="dark" aria-label="dark theme" >
				<DarkModeIcon aria-hidden="true" /> Dark
			</ToggleButton>
		</ToggleButtonGroup>
	);
}



// EXPORTS //

export default DarkModeToggleButton;
