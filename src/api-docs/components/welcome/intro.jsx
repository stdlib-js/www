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
* Component for displaying an introduction to the project.
*
* @private
* @param {Object} props - component properties
* @returns {ReactElement} React element
*/
function Intro() {
	return (
		<Fragment>
			<p>
				stdlib (<a href="https://en.wikipedia.org/wiki/Help:IPA/English">/ˈstændərd lɪb/</a> "standard lib") is a standard library for JavaScript and Node.js, with an emphasis on numerical and scientific computing applications. The library provides a collection of robust, high performance libraries for mathematics, statistics, data processing, streams, and more and includes many of the utilities you would expect from a standard library.
			</p>
		</Fragment>
	);
}


// EXPORTS //

export default Intro;
