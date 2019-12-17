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

import React, { Fragment } from 'react';
import config from './config.js';


// MAIN //

/**
* Returns a React component for rendering a 404 page.
*
* @private
* @param {Object} props - component properties
* @returns {ReactComponent} React component
*/
function FourZeroFour() {
	return (
		<Fragment>
			<div className="readme">
				<section>
					<h1>Whoops!</h1>

					<p>
						The page you are looking for does not exist. 😢
					</p>
					<p>
						If you think this page would be useful and want to help make this page happen, consider becoming a <a href={ config.funding }>financial sponsor</a>!
					</p>
				</section>
			</div>
		</Fragment>
	);
};


// EXPORTS //

export default FourZeroFour;
