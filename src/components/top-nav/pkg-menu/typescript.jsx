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
import PropTypes from 'prop-types';


// VARIABLES //

var RE_UNDERSCORE_REPLACE = /[\/-]/g; // eslint-disable-line no-useless-escape
var RE_STDLIB_PREFIX = /^@stdlib\//;
var PATH = [
	'/docs/ts/',
	'',
	'/modules/_',
	'',
	'_docs_types_index_d_.html'
];


// MAIN //

/**
* Component for navigating to a package's TypeScript type declarations.
*
* @private
* @param {Object} props - component properties
* @param {string} props.pkg - package name (e.g., `math/base/special/sin`)
* @param {string} props.version - documentation version
* @param {boolean} props.shortcuts - boolean indicating whether keyboard shortcuts are active
* @returns {ReactElement} React element
*/
function TypeScript( props ) {
	var pkg = props.pkg;

	PATH[ 1 ] = props.version;

	pkg = pkg.replace( RE_STDLIB_PREFIX, '' );
	PATH[ 3 ] = pkg.replace( RE_UNDERSCORE_REPLACE, '_' );

	var location = window.location;
	var path = location.protocol + "//" + location.hostname;
	// when port is available 
	path += location.port ? ":" + location.port : "";
	path += PATH.join( '' );

	const openTSDocs = useCallback(( event ) => {
		// Open when 'shift+T' is pressed down while shortcuts are active
		if ( event.key === "T" && event.shiftKey && props.shortcuts ) {
			window.location.href = path;
		}
	}, [props]);

	useEffect(() => {
		// Add event listener when the component mounts
		document.addEventListener( "keydown", openTSDocs );

		// Cleanup the event listener when the component unmounts
		return () => {
			document.removeEventListener( "keydown", openTSDocs );
		};
	}, [openTSDocs]);

	return (
		<li key="typescript" className="top-nav-item" role="menuitem">
			<a href={ PATH.join( '' ) } title="View TypeScript type definitions">typescript</a>
		</li>
	);
}

/**
* Component property types.
*
* @constant
* @name propTypes
* @memberof TypeScript
* @type {Object}
*/
TypeScript.propTypes = {
	'pkg': PropTypes.string.isRequired,
	'version': PropTypes.string.isRequired,
	'shortcuts': PropTypes.bool.isRequired
};


// EXPORTS //

export default TypeScript;
