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
import { Link } from 'react-router-dom';
import LinearProgress from '@material-ui/core/LinearProgress';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import SearchIcon from '@material-ui/icons/Search';
import GetAppIcon from '@material-ui/icons/GetApp';
import CancelIcon from '@material-ui/icons/Cancel';
import Divider from '@material-ui/core/Divider';
import pkgPath from './pkg_doc_path.js';
import config from './config.js';
import downloadAssets from './download_assets.js';
import JSON_CACHE from './json_cache.js';


// VARIABLES //

var RE_UNDERSCORE_REPLACE = /[\/-]/g;


// FUNCTIONS //

/**
* Returns a React component for navigating to the main website.
*
* @private
* @returns {ReactComponent} React component
*/
function home() {
	return (
		<li class="top-nav-item"><a href="/" title="Go to the main website">home</a></li>
	);
}

/**
* Returns a React component for navigating to package documentation.
*
* @private
* @param {string} path - package documentation URL
* @returns {ReactComponent} React component
*/
function docs( path ) {
	// Check for a trailing slash (e.g., `@stdlib/assert/contains/`)...
	if ( path[ path.length-1 ] === '/' ) {
		path = path.substring( 0, path.length-1 );
	}
	return (
		<li class="top-nav-item"><Link to={ path } title="View package documentation">documentation</Link></li>
	);
}

/**
* Returns a React component for navigating to package benchmarks.
*
* @private
* @param {string} path - package documentation URL
* @returns {ReactComponent} React component
*/
function bench( path ) {
	path += 'benchmark.html';
	return (
		<li class="top-nav-item"><Link to={ path } title="Run package benchmarks">benchmarks</Link></li>
	);
}

/**
* Returns a React component for navigating to package tests.
*
* @private
* @param {string} path - package documentation URL
* @returns {ReactComponent} React component
*/
function test( path ) {
	path += 'test.html';
	return (
		<li class="top-nav-item"><Link to={ path } title="Run package tests">tests</Link></li>
	);
}

/**
* Returns a React component for navigating to a package's hosted source code.
*
* @private
* @param {string} pkg - package name
* @param {string} version - version
* @returns {ReactComponent} React component
*/
function src( pkg, version ) {
	var path = config.repository+'/tree/'+version+'/lib/node_modules/@stdlib/'+pkg;
	return (
		<li class="top-nav-item"><a href={ path } title="View source code">source</a></li>
	);
}

/**
* Returns a path to a package TypeScript type declarations.
*
* @private
* @param {string} pkg - package name
* @returns {string} resource path
*/
function ts( pkg ) {
	var path;
	pkg = pkg.replace( RE_UNDERSCORE_REPLACE, '_' );
	path = '/docs/ts/modules/_'+pkg+'_docs_types_index_d_.html';
	return (
		<li class="top-nav-item"><a href={ path } title="View TypeScript type definitions">typescript</a></li>
	);
}


// MAIN //

/**
* React component for rendering top navigation.
*
* @private
*/
class TopNav extends React.Component {
	/**
	* Returns a React component for rendering top navigation.
	*
	* @constructor
	* @param {Object} props - component properties
	* @param {string} props.version - version
	* @param {string} props.pkg - package name
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
		this.state = {
			'downloadProgress': 0
		}
	}

	_downloadAssets = () => {
		var self = this;
		var res;

		// TODO: what about other versions???
		res = JSON_CACHE[ this.props.version ].resources;
		downloadAssets( Object.keys( res ), this.props.version, onProgress );

		function onProgress( progress ) {
			self.setState({
				'downloadProgress': progress
			});
		}
	}

	render() {
		var path = pkgPath( this.props.pkg, this.props.version );
		return (
			<Fragment>
				{ this.state.downloadProgress ?
					<LinearProgress
						id="download-progress"
						variant="determinate"
						value={ this.state.downloadProgress }
					/>
					: null
				}
				<input class="top-nav-input" id="top-nav-input" name="top-nav-input" type="checkbox" />
				<label class="top-nav-label" for="top-nav-input">
					<span class="top-nav-menu-icon-button" title="Toggle package navigation menu" aria-label="toggle package navigation menu">
						<ExpandMoreIcon class="MuiSvgIcon-root top-nav-menu-icon" />
					</span>
				</label>
				<nav className="top-nav" aria-label="Main">
					<InputBase
						className="top-nav-search"
						id="top-nav-search-input"
						placeholder="Search documentation"
						name="top-nav-search-input"
						type="text"
						inputProps={{
							'aria-label': 'search documentation'
						}}
					/>
					<IconButton type="submit" className="top-nav-search-button" aria-label="search">
						<SearchIcon />
					</IconButton>
					<span class="top-nav-divider"></span>
					<ul class="top-nav-items">
						{ this.props.home ? home() : null }
						{ this.props.docs ? docs( path ) : null }
						{ this.props.benchmarks ? bench( path ) : null }
						{ this.props.tests ? test( path ) : null }
						{ this.props.src ? src( this.props.pkg, this.props.version ) : null }
						{ this.props.typescript ? ts( this.props.pkg ) : null }
					</ul>
					{ this.state.downloadProgress ?
						<IconButton
							aria-label="cancel download"
							id="download-icon-button"
							edge="start"
							title="Cancel download"
							onClick={ () => console.log( "TODO" ) }
						>
							<CancelIcon />
						</IconButton>
						:
						<IconButton
							aria-label="download documentation for offline access"
							id="download-icon-button"
							edge="start"
							title="Download documentation for offline access"
							onClick={ this._downloadAssets }
						>
							<GetAppIcon />
						</IconButton>
					}
				</nav>
			</Fragment>
		);
	}
}


// EXPORTS //

export default TopNav;
