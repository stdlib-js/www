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
import MenuIcon from '@mui/icons-material/Menu';


// MAIN //

/**
* Component for rendering a button to open the side menu.
*
* @private
* @param {Object} props - component properties
* @param {boolean} props.hide - callback indicating whether to hide the button
* @param {Callback} props.onClick - callback to invoke upon clicking on the button
* @returns {ReactElement} React element
*/
function OpenButton( props ) {
	return (
		<IconButton
			id="menu-icon-button"
			className={ 'icon-button ' + ( ( props.hide ) ? 'invisible' : '' ) }
			color="inherit"
			onClick={ props.onClick }
			title="Open documentation navigation menu"
			aria-label="open drawer"
			aria-pressed={ ( props.hide ) ? 'true' : 'false' }
			size="large"
		>
			<MenuIcon id="menu-icon" />
		</IconButton>
	);
}


// EXPORTS //

export default OpenButton;
