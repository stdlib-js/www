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
* Renders a component displaying information concerning how to install namespaces.
*
* @private
* @param {Object} props - component properties
* @returns {JSX} rendered component
*/
function Namespaces() {
	return (
		<Fragment>
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
		</Fragment>
	);
}


// EXPORTS //

export default Namespaces;
