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
import { Link } from 'react-router-dom';
import config from 'config';


// MAIN //

/**
* Component for displaying information concerning how to install browser bundles.
*
* @private
* @param {Object} props - component properties
* @param {string} props.version - version
* @returns {ReactElement} React element
*/
function BrowserBundles( props ) {
	return (
		<Fragment>
			<p>
				For pre-built distributable UMD bundles for use in browser environments or as shared ("vendored") libraries in server environments, see the <a href={ config.repository+'/tree/develop/dist' }><code>dist</code></a> directory and associated <a href={ config.repository+'/tree/develop/dist' }>guide</a>.
			</p>

			<p>
				As an example, to include a UMD bundle exposing lower-level special <Link to={ config.mount+props.version+'/@stdlib/math/base/special' }>math functions</Link> in a webpage, we can first locally install the UMD bundle package using <a href="https://www.npmjs.com/">npm</a>
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
					<span className="hljs-tag">&#x3C;<span className="hljs-name">script</span> <span className="hljs-attr">src</span>=<span className="hljs-string">"/path/to/@stdlib/dist-math-base-special-flat/build/bundle.min.js"</span> <span className="hljs-attr">type</span>=<span className="hljs-string">"text/javascript"</span>></span><span className="hljs-tag">&#x3C;/<span className="hljs-name">script</span>></span>
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
					<span className="hljs-tag">&#x3C;<span className="hljs-name">script</span> <span className="hljs-attr">type</span>=<span className="hljs-string">"text/javascript"</span>></span><span className="javascript">
					<br/>
					&nbsp;&nbsp;<span className="hljs-comment">// If no recognized module system present, exposed to global scope:</span>
					<br/>
					&nbsp;&nbsp;<span className="hljs-keyword">var</span> erf = stdlib_math_base_special_flat.erf;
					<br/>
					&nbsp;&nbsp;<span className="hljs-built_in">console</span>.log( erf( <span className="hljs-number">0.5</span> ) );
					<br/>
					</span><span className="hljs-tag">&#x3C;/<span className="hljs-name">script</span>></span>
				</code>
			</pre>

			<p>
				For more details and available bundles, see the <a href={ config.repository+'/tree/develop/dist' }><code>dist</code></a> directory and associated <a href={ config.repository+'/tree/develop/dist' }>guide</a>. The <a href={ config.repository+'/tree/develop/dist' }>guide</a> includes instructions for consuming via CDNs, such as <a href="https://unpkg.com/">unpkg</a>.
			</p>
		</Fragment>
	);
}


// EXPORTS //

export default BrowserBundles;
