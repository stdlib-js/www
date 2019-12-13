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


// MAIN //

/**
* Returns a React component for rendering the application footer.
*
* @private
* @param {Object} props - component properties
* @returns {ReactComponent} React component
*/
function Footer( props ) {
	return (
		<footer className={props.fullPage ? 'readme-footer-full' : 'readme-footer'} >
			<div class="readme-footer-bottom-nav">
				<a href="https://www.patreon.com/athan">Donate</a>
				<span className="nav-separator">/</span>
				<a href="/docs/api/">Docs</a>
				<span className="nav-separator">/</span>
				<a href="https://gitter.im/stdlib-js/stdlib">Chat</a>
				<span className="nav-separator">/</span>
				<a href="https://twitter.com/stdlibjs">Twitter</a>
				<span className="nav-separator">/</span>
				<a href="https://github.com/stdlib-js/stdlib">Contribute</a>
			</div>
		</footer>
	);
};


// EXPORTS //

export default Footer;
