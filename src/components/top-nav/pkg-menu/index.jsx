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
import pkgPath from 'pkg-doc-path';
import ExpandMoreIcon from './../../icons/expand_more.jsx';
import Benchmarks from './benchmarks.jsx';
import Docs from './docs.jsx';
import Home from './home.jsx';
import Source from './source.jsx';
import Tests from './tests.jsx';
import NPM from './npm.jsx';
import TypeScript from './typescript.jsx';


// MAIN //

/**
* Component for rendering a package navigation menu.
*
* @private
*/
class PackageMenu extends React.Component {
	/**
	* Returns a component for rendering a package navigation menu.
	*
	* @private
	* @constructor
	* @param {Object} props - component properties
	* @param {string} props.pkg - package name (e.g., `math/base/special/sin`)
	* @param {string} props.version - documentation version
	* @param {boolean} props.open - boolean indicating whether to expand the menu
	* @param {boolean} props.shortcuts - boolean indicating whether keyboard shortcuts are active
	* @param {Callback} props.onToggle - callback to invoke upon a change to the package navigation menu
	* @param {boolean} props.home - boolean indicating whether to link to the main website
	* @param {boolean} props.docs - boolean indicating whether to link to package documentation
	* @param {boolean} props.src - boolean indicating whether to link to package source
	* @param {boolean} props.npm - boolean indicating whether to link to standalone NPM package
	* @param {boolean} props.benchmarks - boolean indicating whether to link to package benchmarks
	* @param {boolean} props.tests - boolean indicating whether to link to package tests
	* @param {boolean} props.typescript - boolean indicating whether to link to TypeScript type declarations
	* @returns {ReactComponent} React component
	*/
	constructor( props ) {
		super( props );
	}

	/**
	* Callback invoked upon clicking the menu.
	*
	* @private
	* @param {Object} event - event object
	*/
	_onMenuClick = () => {
		this.props.onToggle( !this.props.open );
	}

	/**
	* Callback invoked upon closing the menu.
	*
	* @private
	* @param {Object} event - event object
	*/
	_onMenuClose = () => {
		this.props.onToggle( false );
	}

	/**
	* Renders the component.
	*
	* @private
	* @returns {ReactElement} React element
	*/
	render() {
		var version;
		var path;

		// FIXME: we are hardcoding `develop`, but the `Source` component link should use `this.props.version`, and, if `latest`, we should map to the first version in `config.versions`...
		version = 'develop';

		// Generate the URL for the current package:
		path = pkgPath( this.props.pkg, this.props.version );

		return (
			<Fragment>
				<button
					className="icon-button top-nav-items-menu-button"
					title="Toggle navigation menu"
					aria-label="toggle menu"
					aria-controls="top-nav-package-menu"
					aria-expanded={ this.props.open }
					aria-haspopup="menu"
					onClick={ this._onMenuClick }
				>
					<ExpandMoreIcon />
				</button>
				<ul
					id='top-nav-package-menu'
					className={ 'disable-select ' + ( ( this.props.open ) ? 'top-nav-items-dropdown' : 'top-nav-items' ) }
					onClick={ this._onMenuClose }
					role="menubar"
				>
					{ this.props.home ? <Home /> : null }
					{ this.props.docs ? <Docs pkg={ this.props.pkg } path={ path } shortcuts={ this.props.shortcuts } /> : null }
					{ this.props.benchmarks ? <Benchmarks pkg={ this.props.pkg } path={ path } shortcuts={ this.props.shortcuts } /> : null }
					{ this.props.tests ? <Tests pkg={ this.props.pkg } path={ path } shortcuts={ this.props.shortcuts } /> : null }
					{ this.props.src ? <Source pkg={ this.props.pkg } version={ version } shortcuts={ this.props.shortcuts } /> : null }
					{ this.props.npm ? <NPM pkg={ this.props.pkg } /> : null }
					{ this.props.typescript ? <TypeScript pkg={ this.props.pkg } version={ this.props.version } shortcuts={ this.props.shortcuts } /> : null }
				</ul>
			</Fragment>
		);
	}
}

/**
* Component property types.
*
* @constant
* @name propTypes
* @memberof PackageMenu
* @type {Object}
*/
PackageMenu.propTypes = {
	'pkg': PropTypes.string.isRequired,
	'version': PropTypes.string.isRequired,
	'open': PropTypes.bool.isRequired,
	'shortcuts': PropTypes.bool.isRequired,
	'onToggle': PropTypes.func.isRequired,
	'home': PropTypes.bool,
	'docs': PropTypes.bool,
	'src': PropTypes.bool,
	'npm': PropTypes.bool,
	'benchmarks': PropTypes.bool,
	'tests': PropTypes.bool,
	'typescript': PropTypes.bool
};


// EXPORTS //

export default PackageMenu;
