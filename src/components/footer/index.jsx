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
import { Link } from 'react-router-dom';
import Tooltip from '@mui/material/Tooltip';
import config from './../../config.js';


// MAIN //

/**
* Component for rendering the application footer.
*
* @private
* @param {Object} props - component properties
* @param {string} props.version - documentation version
* @returns {ReactElement} React element
*/
function Footer( props ) {
	return (
		<footer>
			<nav
				id="bottom-nav"
				className="bottom-nav center"
				aria-label="secondary"
			>
				<a href={ config.funding } title="Help support the project">Donate</a>
				{ ' / ' }
				<Link to={ config.mount } title="Documentation">Docs</Link>
				{ ' / ' }
				<a href={ config.twitter } title="Follow us on Twitter!">Twitter</a>
				{ ' / ' }
				<a href={ config.repository } title="Contribute to stdlib">Contribute</a>
				<Tooltip title="Talk to us on Gitter!" placement="top" arrow >
					<a className="js-gitter-toggle-chat-button bottom-button" href={ config.gitter } >
						Chat
					</a>
				</Tooltip>
				<Tooltip title="How to use this documentation" placement="top" arrow >
					<Link to={ config.mount + props.version + '/help' } className="help-page-button bottom-button" >
						Help
					</Link>
				</Tooltip>
			</nav>
		</footer>
	);
}


// EXPORTS //

export default Footer;
