/**
* @license Apache-2.0
*
* Copyright (c) 2024 The Stdlib Authors.
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

import React from "react";
import PropTypes from 'prop-types';
import InfoIcon from "../icons/info";

// MAIN //

/**
* Component for navigating to package benchmarks.
*
* @private
* @param {Object} props - component properties
* @param {Callback} props.onOpen - callback to invoke upon clicking the help button
* @returns {ReactElement} React element
*/
function DocsHelp( props ) {
	return (
		<button className="icon-button top-nav-docs-button" onClick={ props.onHelpOpen }>
			<InfoIcon />
		</button>
	);
}

/**
* Component property types.
*
* @constant
* @name propTypes
* @memberof DocsHelp
* @type {Object}
*/
DocsHelp.propTypes = {
	'onOpen': PropTypes.func.isRequired
};


// EXPORTS //

export default DocsHelp;