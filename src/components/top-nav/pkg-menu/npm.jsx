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
import PropTypes from 'prop-types';


// VARIABLES //

var NPM_BASE_URL = 'https://www.npmjs.com/package/';
var RE_FORWARD_SLASH = /\//g;


// MAIN //

/**
* Component for navigating to the respective standalone npm package.
*
* @private
* @param {Object} props - component properties
* @param {string} props.pkg - package name (e.g., `math/base/special/sin`)
* @returns {ReactElement} React element
*/
function NPM( props ) {
	return (
		<li key="npm" className="top-nav-item" role="menuitem">
			<a href={ NPM_BASE_URL + '@stdlib/' + props.pkg.replace( RE_FORWARD_SLASH, '-' ) } title="View npm package">npm</a>
		</li>
	);
}

/**
* Component property types.
*
* @constant
* @name propTypes
* @memberof NPM
* @type {Object}
*/
NPM.propTypes = {
	'pkg': PropTypes.string.isRequired
};


// EXPORTS //

export default NPM;
