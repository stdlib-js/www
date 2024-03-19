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

import React, { Fragment, useEffect,  useCallback } from 'react';
import PropTypes from 'prop-types';
import ClearIcon from './../icons/close.jsx';


// MAIN //

/**
* Component for displaying documentation help.
*
* @private
* @param {Object} props - component properties
* @param {Callback} props.onClose - callback to invoke upon closing documentation help
* @param {boolean} props.shortcuts - boolean indicating whether keyboard shortcuts are active
* @returns {ReactElement} React element
*/
function Help( props ) {

	const closeHelpPage = useCallback(( event ) => {
		// Close help page only after the settings menu gets closed
		var isSettingsClosed = document.querySelector( 'div.settings-menu-overlay.invisible' ) !== null;

		if ( event.key === "Escape" && props.shortcuts && isSettingsClosed ) {
			props.onClose();
		}
	}, [props]);

	useEffect(() => {
		// Add event listener when the component mounts
		document.addEventListener( "keydown", closeHelpPage );

		// Cleanup the event listener when the component unmounts
		return () => {
			document.removeEventListener( "keydown", closeHelpPage );
		};
	}, [closeHelpPage]);

	return (
		<Fragment>
			<div id="readme" className="readme help" >
				<h1>
					<span>Documentation Help</span>
					<button
						className="icon-button"
						title="Close help"
						aria-label="close"
						onClick={ props.onClose }
					>
						<ClearIcon />
					</button>
				</h1>
				<section>
					<h2>Keyboard Shortcuts</h2>
					<div className="keyboard-shortcut-section">
						<h3>Globals</h3>
						<div>
							<div className="keyboard-shortcut">
								<p>Focus search input</p>
								<kbd>/</kbd>
							</div>
							<div className="keyboard-shortcut">
								<p>Display help page</p>
								<span><kbd>?</kbd></span>
							</div>
							<div className="keyboard-shortcut">
								<p>Toggle theme</p>
								<span><kbd>shift </kbd> + <kbd> a</kbd></span>
							</div>
							<div className="keyboard-shortcut">
								<p>Close search results/help/settings menu</p>
								<span><kbd>esc</kbd></span>
							</div>
						</div>
					</div>
					<div className="keyboard-shortcut-section">
						<h3>Side Menu</h3>
						<div>
							<div className="keyboard-shortcut">
								<p>Toggle side menu</p>
								<kbd>m</kbd>
							</div>
							<div className="keyboard-shortcut">
								<p>Focus side menu filter</p>
								<span><kbd>shift </kbd> + <kbd> f</kbd></span>
							</div>
							<div className="keyboard-shortcut">
								<p>Navigate to previous package</p>
								<span><kbd>ctrl </kbd> + <kbd> &larr;</kbd></span>
							</div>
							<div className="keyboard-shortcut">
								<p>Navigate to next package</p>
								<span><kbd>ctrl </kbd> + <kbd> &rarr;</kbd></span>
							</div>
						</div>
					</div>
					<div className="keyboard-shortcut-section">
						<h3>Package Menu</h3>
						<div>
							<div className="keyboard-shortcut">
								<p>Open benchmarks page</p>
								<kbd>b</kbd>
							</div>
							<div className="keyboard-shortcut">
								<p>Open tests page</p>
								<span><kbd>t</kbd></span>
							</div>
							<div className="keyboard-shortcut">
								<p>Navigate to Typescript Docs</p>
								<span><kbd>shift </kbd> + <kbd> t</kbd></span>
							</div>
							<div className="keyboard-shortcut">
								<p>Navigate to source code</p>
								<span><kbd>s</kbd></span>
							</div>
							<div className="keyboard-shortcut">
								<p>Navigate to package doc page</p>
								<span><kbd>p</kbd></span>
							</div>
						</div>
					</div>
				</section>
			</div>
		</Fragment>
	);
}

/**
* Component property types.
*
* @constant
* @name propTypes
* @memberof Help
* @type {Object}
*/
Help.propTypes = {
	'onClose': PropTypes.func.isRequired,
	'shortcuts': PropTypes.bool.isRequired
};


// EXPORTS //

export default Help;
