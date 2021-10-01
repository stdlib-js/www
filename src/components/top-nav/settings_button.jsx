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
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import SettingsIcon from '@mui/icons-material/Settings';
import ClearIcon from '@mui/icons-material/Clear';
import Drawer from '@mui/material/Drawer';
import DarkModeToggleButton from './dark_mode_toggle_button.jsx';
import Divider from '@mui/material/Divider';


// MAIN //

/**
* Button for toggling the settings menu for the documentation.
*
* @private
*/
class SettingsButton extends React.Component {
	/**
	* Returns a button for toggling the settings menu for the documentation.
	*
	* @private
	* @constructor
	* @param {Object} props - component properties
	* @param {string} props.mode - current mode (either `'light'` or `'dark'`)
	* @param {Callback} props.onModeToggle - callback to invoke upon clicking the button to toggle between dark and light mode
	* @returns {ReactComponent} React component
	*/
	constructor( props ) {
		super( props );

		this.state = {
			open: false
		};
	}

	/**
	* Toggles the settings menu.
	*
	* @private
	*/
	_toggleDrawer = () => {
		this.setState({
			open: !this.state.open
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
				<IconButton
					className="icon-button"
					title="Open settings"
					aria-label="settings"
					size="large"
					onClick={ this._toggleDrawer }
				>
					<SettingsIcon aria-hidden="true" />
				</IconButton>
				<Drawer
					anchor="right"
					variant="temporary"
					open={ this.state.open }
					onClose={ this._toggleDrawer }
				>
					<Box
						sx={{ width: 250, paddingLeft: 3, paddingRight: 3 }}
						className="settings"
						role="presentation"
					>
						<Typography variant="h4" component="h1" >
							Settings
							<IconButton aria-label="close" size="large" >
								<ClearIcon
									className="settings-close"
									title="Close settings"
									onClick={ this._toggleDrawer }
								/>
							</IconButton>
						</Typography>
						<Divider />
						<Typography variant="h5" component="h2">
							Mode
						</Typography>
						<DarkModeToggleButton
							mode={ this.props.mode }
							onToggle={ this.props.onModeToggle }
						/>
					</Box>
				</Drawer>
			</Fragment>
		);
	}
}


// EXPORTS //

export default SettingsButton;
