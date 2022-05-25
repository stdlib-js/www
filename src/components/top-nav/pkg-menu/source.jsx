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
import config from 'config';


// MAIN //

/**
* Component for navigating to a package's hosted source code.
*
* @private
* @param {Object} props - component properties
* @param {string} props.pkg - package name (e.g., `math/base/special/sin`)
* @param {string} props.version - documentation version
* @returns {ReactElement} React element
*/
function Source( props ) {
	var path = config.repository+'/tree/'+props.version+'/lib/node_modules/@stdlib/'+props.pkg;
	return (
		<li key="source" className="top-nav-item" role="menuitem">
			<a href={ path } title="View source code">source</a>
		</li>
	);
}

/**
* Component property types.
*
* @constant
* @name propTypes
* @memberof Source
* @type {Object}
*/
Source.propTypes = {
	'pkg': PropTypes.string.isRequired,
	'version': PropTypes.string.isRequired
};


// EXPORTS //

export default Source;
