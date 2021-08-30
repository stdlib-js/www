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
import config from './../../config.js';


// MAIN //

/**
* Component for displaying information concerning how to create custom project bundles.
*
* @private
* @param {Object} props - component properties
* @returns {ReactElement} React element
*/
function CustomBundles() {
	return (
		<Fragment>
			<p>
				To create a custom bundle based on project needs,
			</p>
			<ol>
				<li>
					follow the <a href={ config.repository+'/blob/develop/docs/development.md' }>download</a>, <a href={ config.repository+'/blob/develop/docs/development.md' }>configuration</a>, and <a href={ config.repository+'/blob/develop/docs/development.md' }>installation</a> instructions as described in the <a href={ config.repository+'/blob/develop/docs/development.md' }>development guide</a>.
				</li>
				<li>
					navigate to the local installation directory.
				</li>
				<li>
					<p>
						run the following command to print help documentation for providing a list of stdlib package names to bundle
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
		</Fragment>
	);
}


// EXPORTS //

export default CustomBundles;
