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
import Next from './next.jsx';
import Prev from './prev.jsx';
import Placeholder from './placeholder.jsx';


// MAIN //

/**
* Component for rendering pagination links.
*
* @private
* @param {Object} props - component properties
* @param {string} props.next - name of next package
* @param {string} props.prev - name of previous package
* @param {string} props.version - documentation version
* @returns {(ReactElement|null)} React element
*/
function Pagination( props ) {
	var prev = props.prev;
	var next = props.next;
	if ( !prev && !next ) {
		return null;
	}
	return (
		<div className="pagination">
			{ ( prev ) ? <Prev pkg={ prev } version={ props.version }/> : <Placeholder /> }
			{ ( next ) ? <Next pkg={ next } version={ props.version }/> : <Placeholder /> }
		</div>
	);
}

/**
* Component property types.
*
* @constant
* @name propTypes
* @memberof Pagination
* @type {Object}
*/
Pagination.propTypes = {
	'next': PropTypes.string,
	'prev': PropTypes.string,
	'version': PropTypes.string
};


// EXPORTS //

export default Pagination;
