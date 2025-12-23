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
			<h4 id="install_env_builds_jquery">jQuery-like Bundle</h4>

			<p>
				For those wanting a jQuery-like bundle, one can use pre-built distributable UMD bundles for use in browser environments or as shared ("vendored") libraries in server environments, see the <a href={ config.repository+'/tree/develop/dist' }><code>dist</code></a> directory and associated <a href={ config.repository+'/tree/develop/dist' }>guide</a>.
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
				and then include the following <code>&#x3C;script></code> tag in our HTML document
			</p>

			<pre>
				<code className="hljs language-html">
					<span className="hljs-tag">&#x3C;<span className="hljs-name">script</span> <span className="hljs-attr">type</span>=<span className="hljs-string">"text/javascript"</span> <span className="hljs-attr">src</span>=<span className="hljs-string">"/path/to/@stdlib/dist-math-base-special-flat/build/bundle.min.js"</span>></span><span className="hljs-tag">&#x3C;/<span className="hljs-name">script</span>></span>
				</code>
			</pre>

			<p>
				making sure to modify the script path based on the local installation directory.
			</p>

			<p>
				If no recognized module system is present, one can access bundle contents in another <code>&#x3C;script></code> tag via the global scope.
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

			<h4 id="install_env_builds_esm">ES Modules</h4>

			<p>
				To use ES Modules via a <code>&#x3C;script></code> tag, use <b>ES Module builds</b> available in each package's repository via a dedicated <code>esm</code> branch (e.g., see the <a href="https://github.com/stdlib-js/math-base-special-erf/tree/esm"><code>esm</code></a> branch for <a href="https://github.com/stdlib-js/math-base-special-erf/tree/esm"><code>@stdlib/math-base-special-erf</code></a>). For example,
			</p>

			<pre>
				<code className="hljs language-html">
					<span className="hljs-tag">&#x3C;<span className="hljs-name">script</span> <span className="hljs-attr">type</span>=<span className="hljs-string">"module"</span>></span><span className="javascript">
					<br/>
					<span className="hljs-keyword">import</span> linspace <span className="hljs-keyword">from</span> <span className="hljs-string">'https://cdn.jsdelivr.net/gh/stdlib-js/array-base-linspace@esm/index.mjs'</span>;
					<br/>
					<span className="hljs-keyword">import</span> erf <span className="hljs-keyword">from</span> <span className="hljs-string">'https://cdn.jsdelivr.net/gh/stdlib-js/math-base-special-erf@esm/index.mjs'</span>;
					<br/>
					<br/>
					<span className="hljs-keyword">const</span> x = linspace( -<span className="hljs-number">10.0</span>, <span className="hljs-number">10.0</span>, <span className="hljs-number">100</span> );
					<br/>
					<br/>
					<span className="hljs-keyword">for</span> ( <span className="hljs-keyword">let</span> i = <span className="hljs-number">0</span>; i &#x3C; x.length; i++ ) &#123;
					<br/>
					&nbsp;&nbsp;<span className="hljs-built_in">console</span>.log( <span className="hljs-string">'x: %d, erf(x): %d'</span>, x[ i ], erf( x[ i ] ) );
					<br/>
					&#125;
					<br/>
					</span><span className="hljs-tag">&#x3C;/<span className="hljs-name">script</span>></span>
				</code>
			</pre>

			<h4 id="install_env_builds_deno">Deno</h4>

			<p>
				To use individual packages in Deno, use <b>Deno builds</b> available in each package's repository via a dedicated <code>deno</code> branch (e.g., see the <a href="https://github.com/stdlib-js/ndarray-array/tree/deno"><code>deno</code></a> branch for <a href="https://github.com/stdlib-js/ndarray-array/tree/deno"><code>@stdlib/ndarray-array</code></a>). For example,
			</p>

			<pre>
				<code className="hljs language-javascript">
					<span className="hljs-keyword">import</span> ndarray <span className="hljs-keyword">from</span> <span className="hljs-string">'https://cdn.jsdelivr.net/gh/stdlib-js/ndarray-array@deno/mod.js'</span>;
					<br/>
					<br/>
					<span className="hljs-keyword">var</span> arr = ndarray( [ [ <span className="hljs-number">1</span>, <span className="hljs-number">2</span> ], [ <span className="hljs-number">3</span>, <span className="hljs-number">4</span> ] ] );
					<br/>
					<span className="hljs-comment">// returns &#x3C;ndarray></span>
				</code>
			</pre>

			<h4 id="install_env_builds_umd">UMD</h4>

			<p>
				To use UMD bundles either via a <code>&#x3C;script></code> tag or in <a href="https://observablehq.com/">Observable</a>, use UMD <b>browser builds</b> available in each package's repository via a dedicated <code>umd</code> branch (e.g., see the <a href="https://github.com/stdlib-js/math-base-special-erf/tree/umd"><code>umd</code></a> branch for <a href="https://github.com/stdlib-js/math-base-special-erf/tree/umd"><code>@stdlib/math-base-special-erf</code></a>). For example,
			</p>

			<pre>
				<code className="hljs language-html">
					<span className="hljs-tag">&#x3C;<span className="hljs-name">script</span> <span className="hljs-attr">type</span>=<span className="hljs-string">"text/javascript"</span> <span className="hljs-attr">src</span>=<span className="hljs-string">"https://cdn.jsdelivr.net/gh/stdlib-js/array-base-linspace@umd/browser.js"</span>></span><span className="hljs-tag">&#x3C;/<span className="hljs-name">script</span>></span>
					<br/>
					<span className="hljs-tag">&#x3C;<span className="hljs-name">script</span> <span className="hljs-attr">type</span>=<span className="hljs-string">"text/javascript"</span> <span className="hljs-attr">src</span>=<span className="hljs-string">"https://cdn.jsdelivr.net/gh/stdlib-js/math-base-special-erf@umd/browser.js"</span>></span><span className="hljs-tag">&#x3C;/<span className="hljs-name">script</span>></span>
					<br/>
					<span className="hljs-tag">&#x3C;<span className="hljs-name">script</span> <span className="hljs-attr">type</span>=<span className="hljs-string">"text/javascript"</span>></span><span className="javascript">
					<br/>
					(<span className="hljs-function"><span className="hljs-keyword">function</span> (<span className="hljs-params"></span>) </span>&#123;
					<br/>
					<br/>
					<span className="hljs-keyword">var</span> x = linspace( -<span className="hljs-number">10.0</span>, <span className="hljs-number">10.0</span>, <span className="hljs-number">100</span> );
					<br/>
					<br/>
					<span className="hljs-keyword">for</span> ( <span className="hljs-keyword">var</span> i = <span className="hljs-number">0</span>; i &#x3C; x.length; i++ ) &#123;
					<br/>
					&nbsp;&nbsp;<span className="hljs-built_in">console</span>.log( <span className="hljs-string">'x: %d, erf(x): %d'</span>, x[ i ], erf( x[ i ] ) );
					<br/>
					&#125;
					<br/>
					<br/>
					})();
					<br/>
					</span><span className="hljs-tag">&#x3C;/<span className="hljs-name">script</span>></span>
				</code>
			</pre>

			<h4 id="install_env_builds_nodejs">Node.js</h4>

			<p>
				To <b>vendor</b> stdlib functionality and avoid installing dependency trees, use UMD <b>server builds</b> available in each package's repository via a dedicated <code>umd</code> branch (e.g., see the <a href="https://github.com/stdlib-js/math-base-special-erf/tree/umd"><code>umd</code></a> branch for <a href="https://github.com/stdlib-js/math-base-special-erf/tree/umd"><code>@stdlib/math-base-special-erf</code></a>). For example,
			</p>

			<pre>
				<code className="hljs language-javascript">
					<span className="hljs-keyword">var</span> linspace = <span className="hljs-built_in">require</span>( <span className="hljs-string">'/path/to/vendor/umd/@stdlib/array-base-linspace'</span> );
					<br/>
					<span className="hljs-keyword">var</span> erf = <span className="hljs-built_in">require</span>( <span className="hljs-string">'/path/to/vendor/umd/@stdlib/math-base-special-erf'</span> );
					<br/>
					<br/>
					<span className="hljs-keyword">var</span> x = linspace( -<span className="hljs-number">10.0</span>, <span className="hljs-number">10.0</span>, <span className="hljs-number">100</span> );
					<br/>
					<br/>
					<span className="hljs-keyword">for</span> ( <span className="hljs-keyword">var</span> i = <span className="hljs-number">0</span>; i &#x3C; x.length; i++ ) &#123;
					<br/>
					&nbsp;&nbsp;<span className="hljs-built_in">console</span>.log( <span className="hljs-string">'x: %d, erf(x): %d'</span>, x[ i ], erf( x[ i ] ) );
					<br/>
					&#125;
				</code>
			</pre>
		</Fragment>
	);
}


// EXPORTS //

export default BrowserBundles;
