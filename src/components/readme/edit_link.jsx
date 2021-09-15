/**
* @license Apache-2.0
*
* Copyright (c) 2019 The Stdlib Authors.
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
import EditIcon from '@material-ui/icons/Edit';
import config from './../../config.js';


// MAIN //

/**
* Component for rendering a link to edit a README on GitHub.
*
* @private
* @param {Object} props - component properties
* @param {string} props.pkg - package name (e.g., `math/base/special/sin`)
* @returns {ReactElement} React element
*/
function EditLink( props ) {
	return (
		<a
			href={ config.repository + '/edit/develop/lib/node_modules/@stdlib/' + props.pkg + '/README.md' }
		>
			<EditIcon fontSize="inherit" aria-hidden="true" /> Edit on GitHub
		</a>
	);
}


// EXPORTS //

export default EditLink;
