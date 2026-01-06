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
import PropTypes from 'prop-types';
import config from 'config';
import Logo from 'components/logo/index.jsx';
import ChevronLeftIcon from 'components/icons/chevron_left.jsx';


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
				<Logo width={110.25} height={35} />
			</Link>
			<button
				className="icon-button side-menu-close-button"
				title="Close documentation navigation menu"
				aria-label="close drawer"
				onClick={ props.onClose }
			>
				<ChevronLeftIcon />
			</button>
		</div>
	);
}

/**
* Component property types.
*
* @constant
* @name propTypes
* @memberof
* @type {Object}
*/
SideMenuHead.propTypes = {
	'version': PropTypes.string.isRequired,
	'onClose': PropTypes.func.isRequired
};



// EXPORTS //

export default SideMenuHead;
