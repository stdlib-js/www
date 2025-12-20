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
* Component for displaying information concerning how to install the project as a "system" library.
*
* @private
* @param {Object} props - component properties
* @returns {ReactElement} React element
*/
function SystemLibrary() {
	return (
		<Fragment>
			<p>
				To install as a system library (e.g., for the purposes of creating custom builds), follow the <a href={ config.repository+'/blob/develop/docs/development.md' }>download</a>, <a href={ config.repository+'/blob/develop/docs/development.md' }>configuration</a>, and <a href={ config.repository+'/blob/develop/docs/development.md' }>installation</a> instructions as described in the <a href={ config.repository+'/blob/develop/docs/development.md' }>development guide</a>.
			</p>
		</Fragment>
	);
}


// EXPORTS //

export default SystemLibrary;
