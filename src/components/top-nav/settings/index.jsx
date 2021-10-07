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
import ClearIcon from '@mui/icons-material/Clear';
import Drawer from '@mui/material/Drawer';
import GearIcon from './../../icons/gear.jsx';
import DarkModeToggleButton from './dark_mode_toggle_button.jsx';


// MAIN //

/**
* Component for rendering a documentation settings menu.
*
* @private
*/
class Settings extends React.Component {
	/**
	* Returns a component for rendering a documentation settings menu.
	*
	* @private
	* @constructor
	* @param {Object} props - component properties
	* @param {string} props.theme - current theme
	* @param {Callback} props.onThemeChange - callback to invoke when the theme changes
	* @returns {ReactComponent} React component
	*/
	constructor( props ) {
		super( props );

		this.state = {
			'open': false
		};
	}

	/**
	* Toggles the settings menu.
	*
	* @private
	*/
	_toggleDrawer = () => {
		this.setState({
			'open': !this.state.open
		});
	}

	/**
	* Renders the component.
	*
	* @private
	* @returns {ReactElement} React element
	*/
	render() {
		return (
			<Fragment>
				<button
					className="icon-button top-nav-settings-button"
					title="Open settings"
					aria-label="settings"
					aria-pressed={ ( this.state.open ) ? 'true' : 'false' }
					onClick={ this._toggleDrawer }
				>
					<GearIcon />
				</button>
				<Drawer
					className="settings-menu-drawer"
					anchor="right"
					variant="temporary"
					open={ this.state.open }
					onClose={ this._toggleDrawer }
				>
					<div className="settings-menu-wrapper">
						<div className="head">
							<h1>Settings</h1>
							<button
								className="icon-button"
								title="Close settings menu"
								aria-label="close"
								onClick={ this._toggleDrawer }
							>
								<ClearIcon />
							</button>
						</div>

						<h2>Theme</h2>
						<DarkModeToggleButton
							mode={ this.props.theme }
							onToggle={ this.props.onThemeChange }
						/>
					</div>
				</Drawer>
			</Fragment>
		);
	}
}


// EXPORTS //

export default Settings;
