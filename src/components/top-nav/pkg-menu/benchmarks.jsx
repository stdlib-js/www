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

import React from 'react';
import { Link } from 'react-router-dom';


// MAIN //

/**
* Component for navigating to package benchmarks.
*
* @private
* @param {Object} props - component properties
* @param {string} props.path - package documentation URL
* @returns {ReactElement} React element
*/
function Benchmarks( props ) {
	return (
		<li key="benchmarks" class="top-nav-item" role="menuitem">
			<Link to={ props.path+'/benchmark.html' } title="Run package benchmarks">benchmarks</Link>
		</li>
	);
}


// EXPORTS //

export default Benchmarks;
