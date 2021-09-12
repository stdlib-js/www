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
	* @constructor
	* @param {Object} props - component properties
	* @param {string} props.version - documentation version
	* @param {string} props.pkg - package name (e.g., `math/base/special/sin`)
	* @param {Callback} props.onToggle - callback to invoke upon toggling the side menu
	* @param {Callback} props.onPackageChange - callback to invoke upon a change to the selected package
	* @param {Callback} props.onVersionChange - callback to invoke upon a change to the selected documentation version
	* @param {Callback} props.onFilterFocus - callback to invoke when the side menu filter receives focus
	* @param {Callback} props.onFilterBlur - callback to invoke when the side menu filter loses focus
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
	}

	/**
	* Renders the component.
	*
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
						onPackageChange={ this.props.onPackageChange }
						onVersionChange={ this.props.onVersionChange }
						onFilterFocus={ this.props.onFilterFocus }
						onFilterBlur={ this.props.onFilterBlur }
					/>
				</div>
			</Fragment>
		);
	}
}


// EXPORTS //

export default SideMenu;
