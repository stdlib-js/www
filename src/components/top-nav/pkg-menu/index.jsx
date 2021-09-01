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
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import pkgPath from './../../../utils/pkg_doc_path.js';
import Benchmarks from './benchmarks.jsx';
import Docs from './docs.jsx';
import Home from './home.jsx';
import Source from './source.jsx';
import Tests from './tests.jsx';
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
	* @constructor
	* @param {Object} props - component properties
	* @param {string} props.pkg - package name
	* @param {string} props.version - documentation version
	* @param {boolean} props.open - boolean indicating whether to expand the menu
	* @param {Callback} props.onToggle - callback to invoke upon a change to the package navigation menu
	* @param {boolean} [props.home] - boolean indicating whether to link to the main website
	* @param {boolean} [props.docs] - boolean indicating whether to link to package documentation
	* @param {boolean} [props.src] - boolean indicating whether to link to package source
	* @param {boolean} [props.benchmarks] - boolean indicating whether to link to package benchmarks
	* @param {boolean} [props.tests] - boolean indicating whether to link to package tests
	* @param {boolean} [props.typescript] - boolean indicating whether to link to TypeScript type declarations
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
	* @returns {ReactElement} React element
	*/
	render() {
		var path = pkgPath( this.props.pkg, this.props.version );
		var version = 'develop'; // FIXME: we are hardcoding `develop`, but the `Source` component link should use `this.props.version`, and, if `latest`, we should map to the first version in `config.versions`

		return (
			<Fragment>
				<IconButton
					className="icon-button top-nav-items-menu-button"
					aria-label="toggle navigation menu"
					title="Toggle package navigation menu"
					onClick={ this._onMenuClick }
				>
					<ExpandMoreIcon />
				</IconButton>
				<ul
					className={ this.props.open ? 'top-nav-items-dropdown' : 'top-nav-items' }
					onClick={ this._onMenuClose }
				>
					{ this.props.home ? <Home /> : null }
					{ this.props.docs ? <Docs path={ path } /> : null }
					{ this.props.benchmarks ? <Benchmarks path={ path } /> : null }
					{ this.props.tests ? <Tests path={ path } /> : null }
					{ this.props.src ? <Source pkg={ this.props.pkg } version={ version } /> : null }
					{ this.props.typescript ? <TypeScript pkg={ this.props.pkg } version={ this.props.version } /> : null }
				</ul>
			</Fragment>
		);
	}
}


// EXPORTS //

export default PackageMenu;
