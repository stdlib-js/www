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
import SideMenu from './side-menu/index.jsx';
import PackageMenu from './pkg-menu/index.jsx';
import SearchInput from './search_input.jsx';
import DownloadButton from './download_button.jsx';
import DownloadProgressBar from './download_progress_bar.jsx';


// MAIN //

/**
* Component for rendering top navigation.
*
* @private
*/
class TopNav extends React.Component {
	/**
	* Returns a component for rendering top navigation.
	*
	* @private
	* @constructor
	* @param {Object} props - component properties
	* @param {string} props.version - version
	* @param {string} props.pkg - package name (e.g., `math/base/special/sin`)
	* @param {string} props.query - search query
	* @param {Callback} props.onSideMenuToggle - callback to invoke upon a change to the side menu
	* @param {Callback} props.onPackageChange - callback to invoke upon selecting a package
	* @param {Callback} props.onVersionChange - callback to invoke upon selecting a version
	* @param {Callback} props.onFilterFocus - callback to invoke when the side menu filter receives focus
	* @param {Callback} props.onFilterBlur - callback to invoke when the side menu filter loses focus
	* @param {Callback} props.onSearchSubmit - callback to invoke upon submitting a search query
	* @param {Callback} props.onSearchChange - callback to invoke upon updating a search input element
	* @param {Callback} props.onSearchFocus - callback to invoke when search input receives focus
	* @param {Callback} props.onSearchBlur - callback to invoke when search input loses focus
	* @param {boolean} props.home - boolean indicating whether to link to the main website
	* @param {boolean} props.docs - boolean indicating whether to link to package documentation
	* @param {boolean} props.src - boolean indicating whether to link to package source
	* @param {boolean} props.benchmarks - boolean indicating whether to link to package benchmarks
	* @param {boolean} props.tests - boolean indicating whether to link to package tests
	* @param {boolean} props.typescript - boolean indicating whether to link to TypeScript type declarations
	* @param {boolean} props.sideMenu - boolean indicating whether to expand the side menu
	* @returns {ReactComponent} React component
	*/
	constructor( props ) {
		super( props );
		this.state = {
			// Boolean indicating whether to show the package menu:
			'packageMenu': false,

			// Value indicating progress when downloading documentation assets (e.g., for offline use):
			'downloadProgress': 0.0
		}
	}

	/**
	* Callback invoked upon a download progress update.
	*
	* ## Notes
	*
	* -   Progress is `null` when a download is canceled.
	*
	* @private
	* @param {(number|null)} progress - current progress
	*/
	_onDownloadProgress = ( progress ) => {
		this.setState({
			'downloadProgress': progress
		});

		// Check whether we have finished...
		if ( progress === 100.0 ) {
			// Reset the progress bar:
			this.setState({
				'downloadProgress': 0.0
			});
		}
	}

	/**
	* Callback invoked upon toggling the package navigation menu.
	*
	* @private
	* @param {boolean} bool - boolean indicating whether a package menu is open or closed
	*/
	_onPackageMenuToggle = ( bool ) => {
		this.setState({
			'packageMenu': bool
		});
	}

	/**
	* Callback invoked upon toggling the side menu.
	*
	* @private
	* @param {boolean} bool - boolean indicating whether a side menu is open or closed
	*/
	_onSideMenuToggle = ( bool ) => {
		this.props.onSideMenuToggle( bool );

		// When toggling the side menu, always close the package menu:
		this.setState({
			'packageMenu': false
		});
	}

	/**
	* Renders the component.
	*
	* @private
	* @returns {ReactElement} React element
	*/
	render() {
		var progress = this.state.downloadProgress;
		return (
			<Fragment>
				<nav
					className={ 'top-nav '+( this.props.sideMenu ? 'side-menu-open' : '' ) }
					aria-label="primary"
					aria-controls="main"
				>
					<SideMenu
						open={ this.props.sideMenu }
						pkg={ this.props.pkg }
						version={ this.props.version }
						onToggle={ this._onSideMenuToggle }
						onPackageChange={ this.props.onPackageChange }
						onVersionChange={ this.props.onVersionChange }
						onFilterFocus={ this.props.onFilterFocus }
						onFilterBlur={ this.props.onFilterBlur }
					/>

					<SearchInput
						value={ this.props.query }
						onSubmit={ this.props.onSearchSubmit }
						onChange={ this.props.onSearchChange }
						onFocus={ this.props.onSearchFocus }
						onBlur={ this.props.onSearchBlur }
					/>

					<span class="top-nav-divider"></span>
					<PackageMenu
						open={ this.state.packageMenu }
						pkg={ this.props.pkg }
						version={ this.props.version }
						home={ this.props.home }
						docs={ this.props.docs }
						benchmarks={ this.props.benchmarks }
						tests={ this.props.tests }
						src={ this.props.src }
						typescript={ this.props.typescript }
						onToggle={ this._onPackageMenuToggle }
					/>

					<DownloadButton
						version={ this.props.version }
						onProgress={ this._onDownloadProgress }
					/>

					{ progress ? <DownloadProgressBar value={ progress } /> : null }
				</nav>
			</Fragment>
		);
	}
}


// EXPORTS //

export default TopNav;
