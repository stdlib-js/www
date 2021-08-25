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
* Renders a list of project prerequisites.
*
* @private
* @param {Object} props - component properties
* @returns {JSX} rendered component
*/
function Prerequisites( props ) {
	return (
		<Fragment>
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
		</Fragment>
	);
}


// EXPORTS //

export default Prerequisites;
