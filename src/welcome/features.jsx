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
import config from './../config.js';


// MAIN //

/**
* Renders a list of project features.
*
* @private
* @param {Object} props - component properties
* @param {string} props.version - version
* @returns {JSX} rendered component
*/
function Features( props ) {
	return (
		<Fragment>
			<ul>
				<li>35+ <a href={ config.mount+props.version+'/@stdlib/stats/base/dists/' }>probability distributions</a>, with support for evaluating probability density functions (PDFs), cumulative distribution functions (CDFs), quantiles, moments, and more.</li>
				<li>40+ seedable <a href={ config.mount+props.version+'/@stdlib/random/base/' }>pseudorandom number generators</a> (PRNGs).</li>
				<li>200+ general <a href={ config.mount+props.version+'/@stdlib/utils/' }>utilities</a> for data transformation, functional programming, and asynchronous control flow.</li>
				<li>200+ <a href={ config.mount+props.version+'/@stdlib/assert/' }>assertion utilities</a> for data validation and feature detection.</li>
				<li>50+ <a href={ config.mount+props.version+'/@stdlib/datasets/' }>sample datasets</a> for testing and development.</li>
				<li>A <a href={ config.mount+props.version+'/@stdlib/plot/ctor' }>plot API</a> for data visualization and exploratory data analysis.</li>
				<li>Native add-ons for interfacing with BLAS libraries, with pure JavaScript fallbacks.</li>
				<li>A <a href={ config.mount+props.version+'/@stdlib/bench/harness' }>benchmark framework</a> supporting TAP.</li>
				<li>REPL environment with integrated help and examples.</li>
				<li>Can be bundled using <a href="http://browserify.org/">Browserify</a>, <a href="https://webpack.js.org/">Webpack</a>, and other bundlers for use in web browsers.</li>
			</ul>
		</Fragment>
	);
}


// EXPORTS //

export default Features;
