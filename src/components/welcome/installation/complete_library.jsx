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
* Component for displaying information concerning how to install the entire library.
*
* @private
* @param {Object} props - component properties
* @returns {ReactElement} React element
*/
function CompleteLibrary() {
	return (
		<Fragment>
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
					<span className="hljs-keyword">var</span> ndarray = <span className="hljs-built_in">require</span>( <span className="hljs-string">'@stdlib/ndarray/array'</span> );
					<br/>
					<br/>
					<span className="hljs-keyword">var</span> arr = ndarray( [ [ <span className="hljs-number">1</span>, <span className="hljs-number">2</span> ], [ <span className="hljs-number">3</span>, <span className="hljs-number">4</span> ] ] );
					<br/>
					<span className="hljs-comment">// returns &#x3C;ndarray></span>
				</code>
			</pre>

			<p>
				and to use <code>import</code>
			</p>

			<pre>
				<code className="hljs language-javascript">
					<span className="hljs-keyword">import</span> ndarray <span className="hljs-keyword">from</span> <span className="hljs-string">'@stdlib/ndarray/array'</span>;
					<br/>
					<br/>
					<span className="hljs-keyword">var</span> arr = ndarray( [ [ <span className="hljs-number">1</span>, <span className="hljs-number">2</span> ], [ <span className="hljs-number">3</span>, <span className="hljs-number">4</span> ] ] );
					<br/>
					<span className="hljs-comment">// returns &#x3C;ndarray></span>
				</code>
			</pre>
		</Fragment>
	);
}


// EXPORTS //

export default CompleteLibrary;
