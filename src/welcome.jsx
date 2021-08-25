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
* Renders a welcome page.
*
* @private
* @param {Object} props - component properties
* @param {string} props.version - version
* @returns {JSX} rendered component
*/
function Welcome( props ) {
	return (
		<Fragment>
			<div className="readme" >
				<section className="banner" >
					<div className="image" align="center" >
						<br />
						<br />
						<img src="/img/logo_banner.svg" alt="stdlib logo" />
						<br />
						<br />
						<br />
						<br />
					</div>
				</section>
				<section className="intro">
					<p>
						stdlib (<a href="https://en.wikipedia.org/wiki/Help:IPA/English">/ˈstændərd lɪb/</a> "standard lib") is a standard library for JavaScript and Node.js, with an emphasis on numerical and scientific computing applications. The library provides a collection of robust, high performance libraries for mathematics, statistics, data processing, streams, and more and includes many of the utilities you would expect from a standard library.
					</p>
				</section>
				<section>
					<h2>Features</h2>

					<ul>
						<li>35+ <a href={ config.mount+props.version+'/@stdlib/stats/base/dists/' }>probability distributions</a>, with support for evaluating probability density functions (PDFs), cumulative distribution functions (CDFs), quantiles, moments, and more.</li>
						<li>40+ <a href={ config.mount+props.version+'/@stdlib/random/base/' }>seedable pseudorandom number generators</a> (PRNGs).</li>
						<li>200+ general <a href={ config.mount+props.version+'/@stdlib/utils/' }>utilities</a> for data transformation, functional programming, and asynchronous control flow.</li>
						<li>200+ <a href={ config.mount+props.version+'/@stdlib/assert/' }>assertion utilities</a> for data validation and feature detection.</li>
						<li>50+ <a href={ config.mount+props.version+'/@stdlib/datasets/' }>sample datasets</a> for testing and development.</li>
						<li>A <a href={ config.mount+props.version+'/@stdlib/plot/ctor' }>plot API</a> for data visualization and exploratory data analysis.</li>
						<li>Native add-ons for interfacing with BLAS libraries, with pure JavaScript fallbacks.</li>
						<li>A <a href={ config.mount+props.version+'/@stdlib/bench/harness' }>benchmark framework</a> supporting TAP.</li>
						<li>REPL environment with integrated help and examples.</li>
						<li>Can be bundled using <a href="http://browserify.org/">Browserify</a>, <a href="https://webpack.js.org/">Webpack</a>, and other bundlers for use in web browsers.</li>
					</ul>

					<h2>Getting Help</h2>

					<p>
						Ask questions and get help from the community on the project's <a href={ config.gitter }>Gitter</a> channel.
					</p>

					<h2>Installation</h2>

					<p>
						To accommodate various use cases, stdlib can be consumed in multiple ways. The preferred means of consumption depends on your individual use case. We've provided some user stories to help you identify the best approach.
					</p>

					<p>
						While this project's installation instructions defaults to using <a href="https://www.npmjs.com/package/@stdlib/stdlib">npm</a> for package management, installation via other package managers, such as <a href="https://yarnpkg.com/package/@stdlib/stdlib">yarn</a>, should be a matter of simply swapping out <a href="https://www.npmjs.com/">npm</a> commands with those of the relevant package manager.
					</p>

					<h3>User Stories</h3>

					<ul>
						<li>
							<p>
								I want to perform <b>data analysis</b> and/or <b>data science</b> related tasks in JavaScript and Node.js, similar to how I might use IPython, Julia, R, and/or MATLAB.
							</p>
							<ul>
								<li>
									<p>
										Install the entire project as a <a href="#install_command_line_utility">command-line utility</a>.
									</p>
								</li>
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
										<li>
											<p>
												Install <a href="#install_individual_packages">individual packages</a>. Installing the entire project is likely unnecessary and will lead to slower installation times.
											</p>
										</li>
									</ul>
								</li>
								<li>
									<p>
										I would like to <b>vendor</b> a custom bundle containing various stdlib functionality.
									</p>
									<ul>
										<li>
											<p>
												Follow the steps for creating <a href="#install_custom_bundles">custom bundles</a>.
											</p>
										</li>
									</ul>
								</li>
								<li>
									<p>
										I would like to include stdlib functionality by just using a <code>script</code> tag.
									</p>
									<ul>
										<li>
											<p>
												Install one of the pre-built UMD <a href="install_browser_bundles">browser bundles</a> or consume one of the pre-built bundles via a CDN, such as <a href="https://unpkg.com/">unpkg</a>.
											</p>
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
										<li>
											<p>
												Install <a href="#install_individual_packages">individual packages</a>. Installing the entire project is likely unnecessary and will lead to slower installation times.
											</p>
										</li>
									</ul>
								</li>
								<li>
									<p>
										I am interested in using a substantial amount of functionality found in a top-level stdlib namespace and don't want to separately install hundreds of individual packages.
									</p>
									<ul>
										<li>
											<p>
												Install one or more top-level <a href="#install_namespaces">namespaces</a>. Installing the entire project is likely unnecessary and will lead to slower installation times. Installing a top-level namespace is likely to mean installing functionality which will never be used; however, installing a top-level namespace is likely to be easier and less time-consuming than installing many individual packages separately.
											</p>
										</li>
									</ul>
								</li>
							</ul>
						</li>
						<li>
							<p>
								I am using <b>Deno</b>.
							</p>
							<ul>
    							<li>
    								<p>
    									Use <a href="https://www.skypack.dev/view/@stdlib/stdlib">skypack</a> to import <a href="#install_individual_packages">individual packages</a>.
									</p>
								</li>
							</ul>
						</li>
						<li>
							<p>
								I would like to use stdlib functionality in an <a href="https://observablehq.com/">Observable</a> notebook.
							</p>
							<ul>
								<li>
									<p>
										Consume one of the pre-built <a href="#install_browser_bundles">browser bundles</a> via a CDN, such as <a href="https://unpkg.com/">unpkg</a>.
									</p>
								</li>
							</ul>
						</li>
						<li>
							<p>
								I want to hack at stdlib, possibly even creating <b>customized</b> builds to link to platform-specific native libraries (such as Intel's MKL or some other numerical library).
							</p>
							<ul>
								<li>
									<p>
										Install the project as a <a href="#install_system_library">system library</a> by cloning this repository and following the <a href={ config.repository+'/blob/develop/docs/development.md#installation' }>installation</a> instructions as described in the <a href={ config.repository+'/blob/develop/docs/development.md' }>development guide</a>.
									</p>
								</li>
							</ul>
						</li>
					</ul>

					<a name="install_complete_library"></a>

					<h3>Complete Library</h3>

					<p>
						To install the entire project as a library or application dependency,
					</p>

					<pre>
						<code className="hljs language-bash">
							$ npm install @stdlib/stdlib
						</code>
					</pre>

					<p>
						Once installed, stdlib packages can be individually required/imported to minimize load times and decrease bundle sizes. For example, to use <code>require</code>
					</p>

					<pre>
						<code className="hljs language-javascript">
							<span class="hljs-keyword">var</span> ndarray = <span class="hljs-built_in">require</span>( <span class="hljs-string">'@stdlib/ndarray/ctor'</span> );
							<br/>
							<br/>
							<span class="hljs-keyword">var</span> arr = ndarray( [ [ <span class="hljs-number">1</span>, <span class="hljs-number">2</span> ], [ <span class="hljs-number">3</span>, <span class="hljs-number">4</span> ] ] );
							<br/>
							<span class="hljs-comment">// returns &#x3C;ndarray></span>
						</code>
					</pre>

					<p>
						and to use <code>import</code>
					</p>

					<pre>
						<code className="hljs language-javascript">
							<span class="hljs-keyword">import</span> ndarray <span class="hljs-keyword">from</span> <span class="hljs-string">'@stdlib/ndarray/ctor'</span>;
							<br/>
							<br/>
							<span class="hljs-keyword">var</span> arr = ndarray( [ [ <span class="hljs-number">1</span>, <span class="hljs-number">2</span> ], [ <span class="hljs-number">3</span>, <span class="hljs-number">4</span> ] ] );
							<br/>
							<span class="hljs-comment">// returns &#x3C;ndarray></span>
						</code>
					</pre>

					<a name="install_individual_packages"></a>

					<h3>Individual Packages</h3>

					<p>
						stdlib is designed to allow decomposition of the main project into individual packages which can be independently consumed. Accordingly, users of the project can avoid installing all project functionality and only install the exact functionality they need.
					</p>

					<p>
						To install individual packages, replace forward slashes <code>/</code> after <code>@stdlib/</code> with hyphens <code>-</code>. For example,
					</p>

					<pre>
						<code className="hljs language-bash">
							$ npm install @stdlib/ndarray-ctor
						</code>
					</pre>

					<p>
						Once installed, individual packages can be required/imported. For example, to use <code>require</code>
					</p>

					<pre>
						<code className="hljs language-javascript">
							<span class="hljs-keyword">var</span> ndarray = <span class="hljs-built_in">require</span>( <span class="hljs-string">'@stdlib/ndarray-ctor'</span> );
							<br/>
							<br/>
							<span class="hljs-keyword">var</span> arr = ndarray( [ [ <span class="hljs-number">1</span>, <span class="hljs-number">2</span> ], [ <span class="hljs-number">3</span>, <span class="hljs-number">4</span> ] ] );
							<br/>
							<span class="hljs-comment">// returns &#x3C;ndarray></span>
						</code>
					</pre>

					<p>
						and to use <code>import</code>
					</p>

					<pre>
						<code className="hljs language-javascript">
							<span class="hljs-keyword">import</span> ndarray <span class="hljs-keyword">from</span> <span class="hljs-string">'@stdlib/ndarray-ctor'</span>;
							<br/>
							<br/>
							<span class="hljs-keyword">var</span> arr = ndarray( [ [ <span class="hljs-number">1</span>, <span class="hljs-number">2</span> ], [ <span class="hljs-number">3</span>, <span class="hljs-number">4</span> ] ] );
							<br/>
							<span class="hljs-comment">// returns &#x3C;ndarray></span>
						</code>
					</pre>

					<a name="install_namespaces"></a>

					<h3>Namespaces</h3>

					<p>
						stdlib is comprised of various top-level namespaces (i.e., collections of related functionality united by common themes). For example, to install all math functionality found in the top-level <code>math</code> namespace,
					</p>

					<pre>
						<code className="hljs language-bash">
							$ npm install @stdlib/math
						</code>
					</pre>

					<p>
						Once installed, packages within a top-level namespace can be individually required/imported to minimize load times and decrease bundle sizes. For example, to use <code>require</code>
					</p>

					<pre>
						<code className="hljs language-javascript">
							<span class="hljs-keyword">var</span> sin = <span class="hljs-built_in">require</span>( <span class="hljs-string">'@stdlib/math/base/special/sin'</span> );
							<br/>
							<br/>
							<span class="hljs-keyword">var</span> v = sin( <span class="hljs-number">3.14</span> );
							<br/>
							<span class="hljs-comment">// returns &#x3C;number></span>
						</code>
					</pre>

					<p>
						and to use <code>import</code>
					</p>

					<pre>
						<code className="hljs language-javascript">
							<span class="hljs-keyword">import</span> sin <span class="hljs-keyword">from</span> <span class="hljs-string">'@stdlib/math/base/special/sin'</span>;
							<br/>
							<br/>
							<span class="hljs-keyword">var</span> v = sin( <span class="hljs-number">3.14</span> );
							<br/>
							<span class="hljs-comment">// returns &#x3C;number></span>
						</code>
					</pre>

					<p>
						<b>Note</b>: installing nested namespaces found within top-level namespaces (e.g., <code>math/base</code>) is <b>not</b> supported. Consider installing individual packages or the relevant top-level namespace.
					</p>

					<a name="install_command_line_utility"></a>

					<h3>Command-line Utility</h3>

					<p>
						To install globally for use as a command-line utility and/or use the <a href={ config.mount+props.version+'/@stdlib/repl' }>REPL</a>,
					</p>

					<pre>
						<code className="hljs language-bash">
							$ npm install -g @stdlib/stdlib
						</code>
					</pre>

					<p>
						which will expose the <code>stdlib</code> command. For example, to see available sub-commands
					</p>

					<pre>
						<code className="hljs language-bash">
							$ stdlib <span class="hljs-built_in">help</span>
						</code>
					</pre>

					<p>
						and to run the <a href={ config.mount+props.version+'/@stdlib/repl' }>REPL</a>
					</p>

					<pre>
						<code className="hljs language-bash">
							$ stdlib repl
						</code>
					</pre>

					<a name="install_browser_bundles"></a>

					<h3>Browser Bundles</h3>

					<p>
						For pre-built distributable UMD bundles for use in browser environments or as shared ("vendored") libraries in server environments, see the <a href={ config.repository+'/tree/develop/dist' }><code>dist</code></a> directory and associated <a href={ config.repository+'/tree/develop/dist' }>guide</a>.
					</p>

					<p>
						As an example, to include a UMD bundle exposing lower-level special <a href={ config.mount+props.version+'/@stdlib/math/base/special' }>math functions</a> in a webpage, we can first locally install the UMD bundle package using <a href="https://www.npmjs.com/">npm</a>
					</p>

					<pre>
						<code className="hljs language-bash">
							$ npm install @stdlib/dist-math-base-special-flat
						</code>
					</pre>

					<p>
						and then include the following <code>&lt;script&gt;</code> tag in our HTML document
					</p>

					<pre>
						<code className="hljs language-html">
							<span class="hljs-tag">&#x3C;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"/path/to/@stdlib/dist-math-base-special-flat/build/bundle.min.js"</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span>></span><span class="hljs-tag">&#x3C;/<span class="hljs-name">script</span>></span>
						</code>
					</pre>

					<p>
						making sure to modify the script path based on the local installation directory.
					</p>

					<p>
						If no recognized module system is present, one can access bundle contents in another <code>&lt;script&gt;</code> tag via the global scope.
					</p>

					<pre>
						<code className="hljs language-html">
							<span class="hljs-tag">&#x3C;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span>></span><span class="javascript">
							<br/>
							&nbsp;&nbsp;<span class="hljs-comment">// If no recognized module system present, exposed to global scope:</span>
							<br/>
							&nbsp;&nbsp;<span class="hljs-keyword">var</span> erf = stdlib_math_base_special_flat.erf;
							<br/>
							&nbsp;&nbsp;<span class="hljs-built_in">console</span>.log( erf( <span class="hljs-number">0.5</span> ) );
							<br/>
							</span><span class="hljs-tag">&#x3C;/<span class="hljs-name">script</span>></span>
						</code>
					</pre>

					<p>
						For more details and available bundles, see the <a href={ config.repository+'/tree/develop/dist/README.md' }><code>dist</code></a> directory and associated <a href={ config.repository+'/tree/develop/dist' }>guide</a>. The <a href={ config.repository+'/tree/develop/dist' }>guide</a> includes instructions for consuming via CDNs, such as <a href="https://unpkg.com/">unpkg</a>.
					</p>

					<a name="install_custom_bundles"></a>

					<h3>Custom Bundles</h3>

					<p>
						To create a custom bundle based on project needs,
					</p>
					<ol>
						<li>
							<p>
							follow the <a href={ config.repository+'/blob/develop/docs/development.md' }>download</a>, <a href={ config.repository+'/blob/develop/docs/development.md' }>configuration</a>, and <a href={ config.repository+'/blob/develop/docs/development.md' }>installation</a> instructions as described in the <a href={ config.repository+'/blob/develop/docs/development.md' }>development guide</a>.
							</p>
						</li>
						<li>
							<p>
								navigate to the local installation directory.
							</p>
						</li>
						<li>
							<p>run the following command to print help documentation for providing a list of stdlib package names to bundle
							</p>

							<pre>
								<code class="hljs language-bash">$ NODE_PATH=./lib/node_modules node ./bin/cli bundle-pkg-list -- -h
								</code>
							</pre>
						</li>
						<li>
							<p>
								modify and run the above command with the list of packages to bundle
							</p>
							<pre>
								<code class="hljs language-bash">$ NODE_PATH=./lib/node_modules node ./bin/cli bundle-pkg-list -- &#x3C;pkg> &#x3C;pkg> &#x3C;pkg> ...
								</code>
							</pre>
						</li>
					</ol>

					<p>
						Upon generating a bundle, the bundle can be loaded via a <code>&#x3C;script></code> tag as described above for pre-built distributable UMD bundles.
					</p>

					<a name="install_system_library"></a>

					<h3 id="system-library">System Library</h3>

					<p>
						To install as a system library (e.g., for the purposes of creating custom builds), follow the <a href={ config.repository+'/blob/develop/docs/development.md' }>download</a>, <a href={ config.repository+'/blob/develop/docs/development.md' }>configuration</a>, and <a href={ config.repository+'/blob/develop/docs/development.md' }>installation</a> instructions as described in the <a href={ config.repository+'/blob/develop/docs/development.md' }>development guide</a>.
					</p>

					<hr/>

					<h2>Prerequisites</h2>

					<p>
						Installing and running stdlib for use in <a href="https://nodejs.org/en/">Node.js</a> <b>requires</b> the following prerequisites:
					</p>

					<ul>
						<li>
							<a href="https://nodejs.org/en/">Node.js</a>: JavaScript runtime (version <code>>= 0.10</code>)
						</li>
						<li>
							<a href="https://www.npmjs.com/">npm</a>: package manager (version <code>> 2.7.0</code>; if Node <code>&#x3C; 1.0.0</code>, version <code>> 2.7.0</code> and <code>&#x3C; 4.0.0</code>; if Node <code>&#x3C;= 10.x.x</code>, version <code>> 2.7.0</code> and <code>&#x3C; 6.0.0</code>)
						</li>
					</ul>

					<p>
						Most functionality in stdlib is implemented in JavaScript and no further prerequisites are required to use stdlib (i.e., you can safely avoid installing any additional prerequisites); however, some implementations try to capture performance benefits by using <a href="https://nodejs.org/api/addons.html">native bindings</a> and/or <a href="https://webassembly.org/">WebAssembly</a>. While <strong>not</strong> required to run stdlib, as <strong>every</strong> stdlib implementation has a JavaScript fallback, the following dependencies are <strong>required</strong> for building native add-ons, including linking to BLAS and LAPACK libraries:
					</p>

					<ul>
						<li>
							<a href="https://www.gnu.org/software/make/">GNU make</a> development utility and task runner
						</li>
						<li>
							<a href="https://www.gnu.org/software/bash/">GNU bash</a>: an sh-compatible shell
						</li>
						<li>
							<a href="http://gcc.gnu.org/">gcc &#x26; g++</a> or <a href="https://clang.llvm.org/">Clang</a>: C/C++ compilation and linking (g++ version <code>>= 4.8</code>; clang version <code>>= 3.5</code>, Xcode version <code>>=8.3.1</code> on OS X)
						</li>
						<li>
							<a href="https://gcc.gnu.org/fortran/">gfortran</a>: Fortran compilation and linking (version <code>>= 4.8</code>)
						</li>
					</ul>

					<p>
						While <b>not</b> required to run stdlib, the following dependencies are <b>required</b> for automatically downloading external libraries:
					</p>

					<ul>
						<li>
							<a href="https://curl.se/">curl</a>, <a href="https://www.gnu.org/software/wget/">wget</a>, or <a href="https://www.freebsd.org/cgi/man.cgi?fetch%281%29">fetch</a> (FreeBSD): utilities for downloading remote resources
						</li>
					</ul>

					<p>
						The following external libraries can be automatically downloaded and compiled from source using <code>make</code>:
					</p>

					<ul>
						<li>
							<a href="https://github.com/xianyi/OpenBLAS">OpenBLAS</a>: optimized BLAS library
						</li>
						<li>
							<a href="https://www.electronjs.org/">Electron</a>: framework for cross-platform desktop applications
						</li>
					</ul>

					<hr/>

					<h2>License</h2>

					<p>
						See <a href={ 'https://raw.githubusercontent.com/stdlib-js/stdlib/develop/LICENSE' }>LICENSE</a>.
					</p>

					<h2>Copyright</h2>

					<p>
						Copyright &copy; 2016-2021. The Stdlib <a href={ config.repository+'/graphs/contributors' } >Authors</a>.
					</p>

				</section>
			</div>
		</Fragment>
	);
};


// EXPORTS //

export default Welcome;
