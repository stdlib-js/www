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
import config from 'config';


// MAIN //

/**
* Component for displaying installation user stories.
*
* @private
* @param {Object} props - component properties
* @returns {ReactElement} React element
*/
function UserStories() {
	return (
		<Fragment>
			<ul>
				<li>
					<p>
						I want to perform <b>data analysis</b> and/or <b>data science</b> related tasks in JavaScript and Node.js, similar to how I might use IPython, Julia, R, and/or MATLAB.
					</p>
					<ul>
						<li>Install the entire project as a <a href="#install_command_line_utility">command-line utility</a>.</li>
					</ul>
				</li>
				<li>
					<p>
						I am building a <b>web application</b>.
					</p>
					<ul>
						<li>
							<p>
								I plan on using <a href="http://browserify.org/">Browserify</a>, <a href="https://webpack.js.org/">Webpack</a>, and other bundlers for use in web browsers.
							</p>
							<ul>
								<li>Install <a href="#install_individual_packages">individual packages</a>. Installing the entire project is likely unnecessary and will lead to slower installation times.
								</li>
							</ul>
						</li>
						<li>
							<p>
								I would like to <b>vendor</b> a custom bundle containing various stdlib functionality.
							</p>
							<ul>
								<li>Follow the steps for creating <a href="#install_custom_bundles">custom bundles</a>.
								</li>
							</ul>
						</li>
						<li>
							<p>
								I would like to include stdlib functionality by just using a <code>script</code> tag.
							</p>
							<ul>
								<li>
									<p>I would like to use ES Modules.</p>
									<ul>
										<li>Use an individual package's ES Module <a href="#install_env_builds_esm">build</a>.</li>
									</ul>
								</li>
								<li>
									<p>I would like to use a pre-built bundle (possibly via a CDN, such as <a href="https://unpkg.com/#/">unpkg</a> or <a href="https://www.jsdelivr.com/">jsDelivr</a>).</p>
									<ul>
										<li>Install (or consume via a CDN) an individual package's pre-built UMD <a href="#install_env_builds_umd">browser bundle</a>.</li>
									</ul>
								</li>
							</ul>
						</li>
						<li>
							<p>
								I am interested in using a substantial amount of functionality found in a top-level stdlib namespace and don't want to separately install hundreds of individual packages (e.g., if building an on-line calculator application and wanting all of stdlib's math functionality).
							</p>
							<ul>
								<li>
									<p>
										Install one or more top-level <a href="#install_namespaces">namespaces</a>. Installing the entire project is likely unnecessary and will lead to slower installation times. Installing a top-level namespace is likely to mean installing functionality which will never be used; however, installing a top-level namespace is likely to be easier and less time-consuming than installing many individual packages separately.
									</p>
									<p>
    									When bundling, installing a top-level namespace should not be a concern, as individual functionality can still be independently required/imported. Project installation times may, however, be somewhat slower.
									</p>
								</li>
							</ul>
						</li>
					</ul>
				</li>
				<li>
					<p>
						I am building a <a href="https://nodejs.org/en/">Node.js</a> <b>server application</b>.
					</p>
					<ul>
						<li>
							<p>
								I am interested in using various functionality found in stdlib.
							</p>
							<ul>
								<li>Install <a href="#install_individual_packages">individual packages</a>. Installing the entire project is likely unnecessary and will lead to slower installation times.
								</li>
							</ul>
						</li>
						<li>
							<p>I would like to <b>vendor</b> stdlib functionality and avoid dependency trees.</p>
							<ul>
								<li>Install individual package UMD <a href="#install_env_builds_nodejs">bundles</a>.</li>
							</ul>
						</li>
						<li>
							<p>
								I am interested in using a <b>substantial</b> amount of functionality found in a top-level stdlib namespace and don't want to separately install hundreds of individual packages.
							</p>
							<ul>
								<li>Install one or more top-level <a href="#install_namespaces">namespaces</a>. Installing the entire project is likely unnecessary and will lead to slower installation times. Installing a top-level namespace is likely to mean installing functionality which will never be used; however, installing a top-level namespace is likely to be easier and less time-consuming than installing many individual packages separately.</li>
							</ul>
						</li>
					</ul>
				</li>
				<li>
					<p>
						I am using <b>Deno</b>.
					</p>
					<ul>
						<li>Import <a href="#install_env_builds_deno">individual packages</a> using pre-built Deno builds.</li>
					</ul>
				</li>
				<li>
					<p>
						I would like to use stdlib functionality in an <a href="https://observablehq.com/">Observable</a> notebook.
					</p>
					<ul>
						<li>Consume a pre-built <a href="#install_env_builds_umd">browser bundles</a> via a CDN, such as <a href="https://unpkg.com/#/">unpkg</a> or <a href="https://www.jsdelivr.com/">jsDelivr</a>.</li>
					</ul>
				</li>
				<li>
					<p>
						I want to hack at stdlib, possibly even creating <b>customized</b> builds to link to platform-specific native libraries (such as Intel's MKL or some other numerical library).
					</p>
					<ul>
						<li>Install the project as a <a href="#install_system_library">system library</a> by cloning this repository and following the <a href={ config.repository+'/blob/develop/docs/development.md#installation' }>installation instructions</a> as described in the <a href={ config.repository+'/blob/develop/docs/development.md' }>development guide</a>.</li>
					</ul>
				</li>
			</ul>
		</Fragment>
	);
}


// EXPORTS //

export default UserStories;
