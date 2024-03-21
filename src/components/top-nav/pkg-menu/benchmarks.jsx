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

import React, { useEffect, useCallback } from 'react';
import { Link , useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';


// MAIN //

/**
* Component for navigating to package benchmarks.
*
* @private
* @param {Object} props - component properties
* @param {string} props.pkg - package name (e.g., `math/base/special/sin`)
* @param {string} props.path - package documentation URL
* @param {boolean} props.shortcuts - boolean indicating whether keyboard shortcuts are active
* @returns {ReactElement} React element
*/
function Benchmarks( props ) {
	var history = useHistory();

	const openBenchmarkPage = useCallback(( event ) => {
		// Open when 'b' is pressed down while shortcuts are active
		if ( event.key === "b" && props.shortcuts ) {
			history.push( props.path + "/benchmarks" );
		}
	}, [props]);

	useEffect(() => {
		// Add event listener when the component mounts
		document.addEventListener( "keydown", openBenchmarkPage );

		// Cleanup the event listener when the component unmounts
		return () => {
			document.removeEventListener( "keydown", openBenchmarkPage );
		};
	}, [openBenchmarkPage]);

	return (
		<li key="benchmarks" className="top-nav-item" role="menuitem">
			<Link to={ props.path+'/benchmarks' } title="Run package benchmarks">benchmarks</Link>
		</li>
	);
}

/**
* Component property types.
*
* @constant
* @name propTypes
* @memberof Benchmarks
* @type {Object}
*/
Benchmarks.propTypes = {
	'pkg': PropTypes.string.isRequired,
	'path': PropTypes.string.isRequired,
	'shortcuts': PropTypes.bool.isRequired
};


// EXPORTS //

export default Benchmarks;
