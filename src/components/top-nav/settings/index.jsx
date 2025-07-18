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
import PropTypes from 'prop-types';
import GearIcon from './../../icons/gear.jsx';
import ChevronDownIcon from './../../icons/chevron_down.jsx';
import Head from './head.jsx';


// VARIABLES //

var THEMES = [
	// value, display_name
	'light', 'Light',
	'dark', 'Dark',
	'auto', 'Auto'
];

var MODES = [
	// value, display_name
	'default', 'Default'
	// 'standalone', 'Standalone',
	// 'repl', 'REPL',
	// 'c', 'C'
];

var PREV_NEXT_MODES = [
	// value, display_name
	'alphabetical', 'Alphabetical',
	'random', 'Random'
];

var EXAMPLE_SYNTAX = [
	// value, display_name
	'es5', 'ES5'
	// 'es6', 'ES6+'
];

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
	* @param {boolean} props.allowSettingsCookies - boolean indicating whether to allow the use of cookies for storing settings
	* @param {string} props.theme - current theme
	* @param {string} props.mode - current documentation "mode"
	* @param {string} props.exampleSyntax - current example code syntax
	* @param {string} props.prevNextNavigation - current previous/next package navigation mode
	* @param {Callback} props.onAllowSettingsCookiesChange - callback to invoke upon changing the setting indicating whether to allow cookies for storing settings
	* @param {Callback} props.onThemeChange - callback to invoke upon changing the documentation theme
	* @param {Callback} props.onModeChange - callback to invoke upon changing the documentation "mode"
	* @param {Callback} props.onExampleSyntaxChange - callback to invoke upon changing the example code syntax
	* @param {Callback} props.onPrevNextNavChange - callback to invoke upon changing the previous/next package navigation mode
	* @returns {ReactComponent} React component
	*/
	constructor( props ) {
		super( props );

		this.state = {
			// Boolean indicating whether the settings menu is open or closed:
			'open': false,
			'selectedTheme': props.theme
		};
	}

	/**
	* Toggles the settings menu.
	*
	* @private
	* @param {Object} event - event object
	*/
	_toggleMenu = () => {
		this.setState({
			'open': !this.state.open
		});
	}

	/**
	* Callback invoked upon changing the setting indicating whether to allow the use of cookies for storing settings.
	*
	* @private
	* @param {Object} event - event object
	*/
	_onAllowSettingsCookiesChange = () => {
		this.props.onAllowSettingsCookiesChange( !this.props.allowSettingsCookies );
	}

	/**
	* Callback invoked upon clicking the label of a checkbox for indicating whether to allow the use of cookies for storing settings.
	*
	* @private
	* @param {Object} event - event object
	*/
	_onAllowSettingsCookiesLabelClick = () => {
		this.props.onAllowSettingsCookiesChange( !this.props.allowSettingsCookies );
	}

	/**
	* Callback invoked upon changing the documentation theme.
	*
	* @private
	* @param {Object} event - event object
	*/
	_onThemeChange = ( event ) => {
		const selectedTheme = event.target.value;
		let effectiveTheme = selectedTheme;
		if(selectedTheme === 'auto'){
			const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
			effectiveTheme = prefersDark ? 'dark' : 'light';
		}
		this.setState({ selectedTheme });
		this.props.onThemeChange(effectiveTheme);
	}

	/**
	* Callback invoked upon changing the documentation "mode".
	*
	* @private
	* @param {Object} event - event object
	*/
	_onModeChange = ( event ) => {
		this.props.onModeChange( event.target.value );
	}

	/**
	* Callback invoked upon changing the example code syntax.
	*
	* @private
	* @param {Object} event - event object
	*/
	_onExampleSyntaxChange = ( event ) => {
		this.props.onExampleSyntaxChange( event.target.value );
	}

	/**
	* Callback invoked upon changing the previous/next package navigation mode.
	*
	* @private
	* @param {Object} event - event object
	*/
	_onPrevNextNavChange = ( event ) => {
		this.props.onPrevNextNavChange( event.target.value );
	}

	/**
	* Callback invoked upon explicitly closing the settings menu.
	*
	* @private
	* @param {Object} event - event object
	*/
	_onClose = ( event ) => {
		// Prevent the event from bubbling up the DOM tree, as we'll explicitly close the menu from within this callback:
		event.stopPropagation();
		event.preventDefault();

		// Toggle the menu display state:
		this._toggleMenu( event );
	}

	/**
	* Callback invoked upon clicking on the settings menu.
	*
	* @private
	* @param {Object} event - event object
	*/
	_onWrapperClick = ( event ) => {
		// Note that the following is intentional in order to avoid closing the menu when clicking within the menu element...
		event.stopPropagation();
		event.preventDefault();
	}

	/**
	* Returns an option.
	*
	* @private
	* @param {string} value - theme value
	* @param {string} displayName - theme display name
	* @param {boolean} isSelected - boolean indicating whether an option is selected
	* @returns {ReactElement} React element
	*/
	_renderOption( value, displayName, isSelected ) {
		return (
			<option
				key={ value }
				value={ value }
				selected={ isSelected }
			>
				{ displayName }
			</option>
		);
	}

	/**
	* Returns a list of menu options.
	*
	* @private
	* @param {Array<string>} options - strided array of interleaved option values and display names
	* @param {string} selected - selected option
	* @returns {Array<ReactElement>} list of menu options
	*/
	_renderOptions( options, selected ) {
		var list;
		var v;
		var i;

		list = [];
		for ( i = 0; i < options.length; i += 2 ) {
			v = options[ i ];
			list.push( this._renderOption( v, options[ i+1 ], v === selected ) );
		}
		return list;
	}

	/**
	* Returns a menu for selecting a theme.
	*
	* @private
	* @returns {ReactElement} React element
	*/
	_renderThemeMenu() {
		return (
			<Fragment>
				<label className="settings-menu-item-label">
					Theme
				</label>
				<div className="settings-select-wrapper">
					<select
						className="settings-select"
						onChange={ this._onThemeChange }
					>
						{ this._renderOptions( THEMES, this.state.selectedTheme ) }
					</select>
					<div className="settings-select-custom">
						<ChevronDownIcon className="settings-select-custom-icon"/>
					</div>
				</div>
			</Fragment>
		);
	}

	/**
	* Returns a menu for selecting a documentation mode.
	*
	* @private
	* @returns {ReactElement} React element
	*/
	_renderModeMenu() {
		return (
			<Fragment>
				<label className="settings-menu-item-label">
					Documentation Mode
				</label>
				<div className="settings-select-wrapper">
					<select
						className="settings-select"
						onChange={ this._onModeChange }
					>
						{ this._renderOptions( MODES, this.props.mode ) }
					</select>
					<div className="settings-select-custom">
						<ChevronDownIcon className="settings-select-custom-icon"/>
					</div>
				</div>
			</Fragment>
		);
	}

	/**
	* Returns a menu for selecting a previous/next package navigation mode.
	*
	* @private
	* @returns {ReactElement} React element
	*/
	_renderPrevNextNavMenu() {
		return (
			<Fragment>
				<label className="settings-menu-item-label">
					Previous/Next Package Navigation
				</label>
				<div className="settings-select-wrapper">
					<select
						className="settings-select"
						onChange={ this._onPrevNextNavChange }
					>
						{ this._renderOptions( PREV_NEXT_MODES, this.props.prevNextNavigation ) }
					</select>
					<div className="settings-select-custom">
						<ChevronDownIcon className="settings-select-custom-icon"/>
					</div>
				</div>
			</Fragment>
		);
	}

	/**
	* Returns a menu for selecting example code syntax.
	*
	* @private
	* @returns {ReactElement} React element
	*/
	_renderExampleSyntaxMenu() {
		return (
			<Fragment>
				<label className="settings-menu-item-label">
					Example Code Syntax
				</label>
				<div className="settings-select-wrapper">
					<select
						className="settings-select"
						onChange={ this._oExampleSyntaxChange }
					>
						{ this._renderOptions( EXAMPLE_SYNTAX, this.props.exampleSyntax ) }
					</select>
					<div className="settings-select-custom">
						<ChevronDownIcon className="settings-select-custom-icon"/>
					</div>
				</div>
			</Fragment>
		);
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
					onClick={ this._toggleMenu }
					aria-label="settings menu"
					aria-hidden={ ( this.state.open ) ? null : "true" }
				>
					<div
						className="settings-menu-wrapper"
						onClick={ this._onWrapperClick }
					>

						<Head onClose={ this._onClose } />

						<div className="settings-menu-item">
							{ this._renderThemeMenu() }
						</div>

						<div className="settings-menu-item">
							{ this._renderModeMenu() }
						</div>

						<div className="settings-menu-item">
							{ this._renderPrevNextNavMenu() }
						</div>

						<div className="settings-menu-item">
							{ this._renderExampleSyntaxMenu() }
						</div>

						<div className="settings-menu-item settings-checkbox-wrapper">
							<input
								key={ Math.random() }
								className="settings-checkbox"
								type="checkbox"
								id="settings-checkbox-allow-settings-cookies"
								name="settings-checkbox-allow-settings-cookies"
								value="allowSettingsCookies"
								checked={ this.props.allowSettingsCookies }
								onChange={ this._onAllowSettingsCookiesChange }
							></input>
							<label
								htmlFor="settings-checkbox-allow-settings-cookies"
								className="settings-checkbox-label disable-select"
								onClick={ this._onAllowSettingsCookiesLabelClick }
							>
								<p>
									Enable saving your preferences as <span className="text-bold">cookies</span>.
								</p>
								<p>
									If settings cookies are not enabled, your preferences will be lost upon either refreshing or closing the current browser tab.
								</p>
								<p>
									You can delete settings cookies for this site at any time by unchecking this checkbox.
								</p>
								<p>
									When enabled, settings cookies only store setting values and do <span className="text-bold">not</span> store any personally identifiable information.
								</p>
							</label>
						</div>
					</div>
				</div>
			</Fragment>
		);
	}
}

/**
* Component property types.
*
* @constant
* @name propTypes
* @memberof Settings
* @type {Object}
*/
Settings.propTypes = {
	'allowSettingsCookies': PropTypes.bool.isRequired,
	'theme': PropTypes.string.isRequired,
	'mode': PropTypes.string.isRequired,
	'exampleSyntax': PropTypes.string.isRequired,
	'prevNextNavigation': PropTypes.string.isRequired,
	'onAllowSettingsCookiesChange': PropTypes.func.isRequired,
	'onThemeChange': PropTypes.func.isRequired,
	'onModeChange': PropTypes.func.isRequired,
	'onExampleSyntaxChange': PropTypes.func.isRequired,
	'onPrevNextNavChange': PropTypes.func.isRequired
};


// EXPORTS //

export default Settings;
