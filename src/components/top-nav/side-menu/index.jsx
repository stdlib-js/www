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

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import OpenButton from './open_button.jsx';
import Drawer from './drawer.jsx';


// MAIN //

/**
* Component for rendering a side menu for navigating project packages.
*
* @private
*/
class SideMenu extends React.Component {
	/**
	* Returns a component for rendering a side menu for navigating project packages.
	*
	* @private
	* @constructor
	* @param {Object} props - component properties
	* @param {string} props.version - documentation version
	* @param {string} props.pkg - package name (e.g., `math/base/special/sin`)
	* @param {Callback} props.onToggle - callback to invoke upon toggling the side menu
	* @param {Callback} props.onVersionChange - callback to invoke upon a change to the selected documentation version
	* @param {Callback} props.onFilterFocus - callback to invoke when the side menu filter receives focus
	* @param {Callback} props.onFilterBlur - callback to invoke when the side menu filter loses focus
	* @param {boolean} props.shortcuts - boolean indicating whether keyboard shortcuts are active
	* @param {boolean} props.open - boolean indicating whether the side menu is open
	* @returns {ReactComponent} component
	*/
	constructor( props ) {
		super( props );
	}

	/**
	* Callback invoked upon opening the side menu.
	*
	* @private
	* @param {Object} event - event object
	*/
	_onMenuOpen = () => {
		this.props.onToggle( true );
	};

	/**
	* Callback invoked upon a user press down a key to toggle the side menu view
	*
	* @private
	* @param {Object} event - event object
	* @returns {void}
	*/
	_sideMenuToggle = ( event ) => {
		// Toggle when 'm' was pressed down while shortcuts are active
		if ( event.key === "m" && this.props.shortcuts ) {
			this.props.onToggle( !this.props.open );
		}
	};

	/**
	* Callback invoked immediately after unmounting a component (i.e., is removed from a tree).
	*
	* @private
	*/
	componentDidMount() {
		// Add event listener for key down event
		document.addEventListener( "keydown", this._sideMenuToggle );
	}

	/**
	* Callback invoked immediately after unmounting a component (i.e., is removed from a tree).
	*
	* @private
	*/
	componentWillUnmount() {
		// Clean up event listener
		document.removeEventListener( "keydown", this._sideMenuToggle );
	}

	/**
	* Renders the component.
	*
	* @private
	* @returns {ReactElement} React element
	*/
	render() {
		if ( !this.props.version ) {
			return null;
		}
		return (
			<Fragment>
				<OpenButton
					hide={ this.props.open }
					onClick={ this._onMenuOpen }
				/>
				<div className="side-menu-wrapper">
					<Drawer
						open={ this.props.open }
						version={ this.props.version }
						pkg={ this.props.pkg }
						onToggle={ this.props.onToggle }
						onVersionChange={ this.props.onVersionChange }
						onFilterFocus={ this.props.onFilterFocus }
						onFilterBlur={ this.props.onFilterBlur }
						shortcuts={ this.props.shortcuts }
					/>
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
* @memberof SideMenu
* @type {Object}
*/
SideMenu.propTypes = {
	'version': PropTypes.string.isRequired,
	'pkg': PropTypes.string.isRequired,
	'onToggle': PropTypes.func.isRequired,
	'onVersionChange': PropTypes.func.isRequired,
	'onFilterFocus': PropTypes.func.isRequired,
	'onFilterBlur': PropTypes.func.isRequired,
	'open': PropTypes.bool.isRequired,
	'shortcuts' : PropTypes.bool.isRequired
};


// EXPORTS //

export default SideMenu;
