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
import { Link } from 'react-router-dom';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import IconButton from '@mui/material/IconButton';
import config from './../../../config.js';
import Logo from './logo.jsx';


// MAIN //

/**
* Component for rendering the side menu head.
*
* @private
* @param {Object} props - component properties
* @param {string} props.version - current documentation version
* @param {Callback} props.onClose - callback to invoke upon a "close" event
* @returns {ReactElement} React element
*/
function SideMenuHead( props ) {
	return (
		<div className="side-menu-head" >
			<Link
				to={ config.mount + props.version }
				title="Navigate to documentation home"
				aria-label="home"
			>
				<Logo />
			</Link>
			<IconButton
				onClick={ props.onClose }
				edge="start"
				title="Close documentation navigation menu"
				aria-label="close drawer"
				size="large"
			>
				<ChevronLeftIcon className="MuiSvgIcon-root menu-close-icon" />
			</IconButton>
		</div>
	);
}


// EXPORTS //

export default SideMenuHead;
