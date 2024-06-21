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
import config from 'config';


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
				<a href={ config.funding } title="Help support the project">Sponsor</a>
				<span aria-hidden="true"> / </span>
				<Link to={ config.mount } title="Documentation">Docs</Link>
				<span aria-hidden="true"> / </span>
				<a href={ config.blog } title="Read our blog">Blog</a>
				<span aria-hidden="true"> / </span>
				<a href={ config.twitter } title="Follow us on Twitter!">Twitter</a>
				<span aria-hidden="true"> / </span>
				<a href={ config.repository } title="Contribute to stdlib">Contribute</a>
				<span aria-hidden="true"> / </span>
				<a href={ config.status } title="Status and uptime">Status</a>
			</nav>
		</footer>
	);
}


// EXPORTS //

export default Footer;
