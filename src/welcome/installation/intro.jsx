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

import React, { Fragment } from 'react';


// MAIN //

/**
* Component for displaying an introduction to installation information.
*
* @private
* @param {Object} props - component properties
* @returns {ReactElement} React element
*/
function Intro() {
	return (
		<Fragment>
			<p>
				To accommodate various use cases, stdlib can be consumed in multiple ways. The preferred means of consumption depends on your individual use case. We've provided some user stories to help you identify the best approach.
			</p>

			<p>
				While this project's installation instructions defaults to using <a href="https://www.npmjs.com/package/@stdlib/stdlib">npm</a> for package management, installation via other package managers, such as <a href="https://yarnpkg.com/package/@stdlib/stdlib">yarn</a>, should be a matter of simply swapping out <a href="https://www.npmjs.com/">npm</a> commands with those of the relevant package manager.
			</p>
		</Fragment>
	);
}


// EXPORTS //

export default Intro;
