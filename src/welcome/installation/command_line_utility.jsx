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
* Component for displaying information concerning how to install the project as a command-line utility.
*
* @private
* @param {Object} props - component properties
* @param {string} props.version - version
* @returns {ReactElement} React element
*/
function CommandLineUtility( props ) {
	return (
		<Fragment>
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
		</Fragment>
	);
}


// EXPORTS //

export default CommandLineUtility;
