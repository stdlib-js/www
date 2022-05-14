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
import GearIcon from './../../icons/gear.jsx';
import ChevronDownIcon from './../../icons/chevron_down.jsx';
import Head from './head.jsx';


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
			// Boolean indicating whether the settings menu is open or closed:
			'open': false
		};
	}

	/**
	* Toggles the settings menu.
	*
	* @private
	*/
	_toggleMenu = () => {
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
					onClick={ this._toggleMenu }
				>
					<GearIcon />
				</button>

				<div
					className={ 'settings-menu-overlay' + ( ( this.state.open ) ? '' : ' invisible' ) }
					aria-label="settings menu"
					aria-hidden={ ( this.state.open ) ? null : "true" }
				>
					<div className="settings-menu-wrapper">

						<Head onClose={ this._toggleMenu } />

						<div className="settings-menu-item">
							<label class="settings-menu-item-label">
								Theme
							</label>
							<div className="settings-theme-select-wrapper">
								<select
									className="settings-theme-select"
									onChange={ this.props.onThemeChange }
								>
									<option value="light">Light</option>
									<option value="dark">Dark</option>
								</select>
								<div className="settings-theme-select-custom">
									<ChevronDownIcon className="settings-theme-select-custom-icon"/>
								</div>
							</div>
						</div>

						<div className="settings-menu-item">
							<label class="settings-menu-item-label">
								Documentation Mode
							</label>
							<div className="settings-theme-select-wrapper">
								<select className="settings-theme-select">
									<option value="nested">Nested</option>
									{/*<option value="standalone">Standalone</option>*/}
									{/*<option value="repl">REPL</option>*/}
								</select>
								<div className="settings-theme-select-custom">
									<ChevronDownIcon className="settings-theme-select-custom-icon"/>
								</div>
							</div>
						</div>

						<div className="settings-menu-item">
							<label class="settings-menu-item-label">
								Left/Right Package Navigation
							</label>
							<div className="settings-theme-select-wrapper">
								<select className="settings-theme-select">
									<option value="alphabetical">Alphabetical</option>
									{/*<option value="random">Random</option>*/}
								</select>
								<div className="settings-theme-select-custom">
									<ChevronDownIcon className="settings-theme-select-custom-icon"/>
								</div>
							</div>
						</div>

						<div className="settings-menu-item">
							<label class="settings-menu-item-label">
								Code Examples
							</label>
							<div className="settings-theme-select-wrapper">
								<select className="settings-theme-select">
									<option value="es5">ES5</option>
									{/*<option value="es6">ES6+</option>*/}
								</select>
								<div className="settings-theme-select-custom">
									<ChevronDownIcon className="settings-theme-select-custom-icon"/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</Fragment>
		);
	}
}


// EXPORTS //

export default Settings;
