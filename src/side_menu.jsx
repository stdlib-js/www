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
import { debounce } from 'throttle-debounce';
import { Link, withRouter } from 'react-router-dom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Collapse from '@material-ui/core/Collapse';
import Drawer from '@material-ui/core/Drawer';
import MenuIcon from '@material-ui/icons/Menu';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import getPackageTree from './get_package_tree.js';
import Logo from './logo.jsx';
import config from './config.js';


// VARIABLES //

const RE_FORWARD_SLASH = /\//g;
const COLLAPSE_TRANSITION_TIMEOUT = 500;


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
	* @param {Callback} props.onToggle - callback to invoke upon toggling the side menu
	* @param {Callback} props.onPackageChange - callback to invoke upon a change to the selected package
	* @param {Callback} props.onVersionChange - callback to invoke upon a change to the selected documentation version
	* @param {boolean} props.open - boolean indicating whether the side menu is open
	* @param {string} props.version - documentation version
	* @returns {ReactComponent} component
	*/
	constructor( props ) {
		super( props )
		this.state = {
			'active': null,
			'filter': '',
			'found': {}
		};
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
	* Callback invoked upon closing the side menu.
	*
	* @private
	* @param {Object} event - event object
	*/
	_onMenuClose = () => {
		this.props.onToggle( false );
	}

	/**
	* Callback invoked upon changing the version.
	*
	* @private
	* @param {Object} event - event object
	*/
	_onVersionChange = ( event ) => {
		this.props.onVersionChange( event.target.value );
	}

	/**
	* Returns a callback which is invoked upon clicking on a specified namespace package.
	*
	* @private
	* @param {string} pkg - package namespace
	* @returns {Callback} event handler
	*/
	_onNamespaceClickFactory( pkg ) {
		var self;
		var path;

		self = this;
		path = config.mount + this.props.version + '/' + pkg;

		return onClick;

		/**
		* Callback invoked upon a "click" event.
		*
		* @private
		*/
		function onClick() {
			self.setState( setState );
		}

		/**
		* Updates the component state.
		*
		* @private
		* @param {Object} prev - previous state
		* @returns {Object} updated state
		*/
		function setState( prev ) {
			var active;
			var state;

			active = !prev[ pkg ];
			state = {};
			state[ pkg ] = active;
			if ( active ) {
				state.active = pkg;
				self.props.onPackageChange( path );
			}
			return state;
		}
	}

	/**
	* Returns a callback which is invoked upon clicking on a specified package.
	*
	* @private
	* @param {string} pkg - package name
	* @returns {Callback} event handler
	*/
	_onPackageClickFactory( pkg ) {
		var self;
		var path;

		self = this;
		path = config.mount + this.props.version + '/' + pkg;

		return onClick;

		/**
		* Callback invoked upon clicking on a package.
		*
		* @private
		* @param {Object} event - event object
		*/
		function onClick() {
			self.props.onPackageChange( path );
			self.setState({
				'active': pkg
			});
		}
	}

	/**
	* Callback invoked upon a change to the menu filter.
	*
	* @private
	* @param {Object} event - event object
	*/
	_onFilterChange = ( event ) => {
		var state;
		var self;

		self = this;
		state = {
			'filter': event.target.value.toLowerCase()
		};
		this.setState( state, clbk );

		/**
		* Callback invoked after setting component state.
		*
		* @private
		*/
		function clbk() {
			if ( !self._debounced ) {
				self._debounced = debounce( 300, self._filterMenu );
			}
			self._debounced();
		}
	}

	/**
	* Filters the menu.
	*
	* @private
	* @returns {void}
	*/
	_filterMenu() {
		var found;
		var state;
		var keys;
		var tree;
		var i;

		if ( !this.state.filter ) {
			return this._resetFilter();
		}
		tree = getPackageTree( this.props.version );
		found = {};
		this._applyFilter( found, tree, '@stdlib', this.state.filter );

		keys = Object.keys( found );
		state = {};
		for ( i = 0; i < keys.length; i++ ) {
			state[ keys[ i ] ] = true;
		}
		this.setState({
			...state,
			'found': found
		});
	}

	/**
	* Callback invoked upon clicking a button to reset the menu filter.
	*
	* @private
	* @param {Object} event - event object
	*/
	_onResetFilterClick = () => {
		this._resetFilter();
	}

	/**
	* Resets a menu filter.
	*
	* @private
	*/
	_resetFilter() {
		var state;
		var keys;
		var i;

		keys = Object.keys( this.state.found );
		state = {};
		for ( i = 0; i < keys.length; i++ ) {
			state[ keys[ i ] ] = false;
		}
		this.setState({
			...state,
			'filter': '',
			'found': {}
		});
	}

	/**
	* Applies a filter.
	*
	* @private
	* @param {Object} out - destination object
	* @param {Object} tree - package tree
	* @param {string} path - namespace path
	* @param {string} filter - filter to apply
	* @returns {boolean} boolean indicating whether a match was found
	*/
	_applyFilter( out, tree, path, filter ) {
		var matched;
		var keys;
		var pkg;
		var flg;
		var i;

		keys = Object.keys( tree );
		for ( i = 0; i < keys.length; i++ ) {
			pkg = keys[ i ];
			if ( typeof tree[ pkg ] !== 'object' ) {
				if ( pkg.includes( filter ) ) {
					matched = true;
				}
			} else if ( pkg.includes( filter ) ) {
				matched = true;
				out[ path+'/'+pkg ] = true;
			} else {
				flg = this._applyFilter( out, tree[ pkg ], path+'/'+pkg, filter );
				if ( flg ) {
					matched = true;
				}
			}
		}
		if ( matched  ) {
			out[ path ] = true;
		}
		return matched || false;
	}

	/**
	* Renders menu items for a specified namespace.
	*
	* @private
	* @param {Object} namespace - namespace
	* @param {string} path - namespace path
	* @param {number} level - namespace level
	* @returns {Array<JSX>} rendered components
	*/
	_renderItems( namespace, path, level ) {
		var self;
		var keys;

		self = this;
		keys = Object.keys( namespace );

		return keys.map( render );

		/**
		* Renders a menu item.
		*
		* @private
		* @param {string} pkg - package name
		* @param {number} idx - package index
		* @returns {JSX} rendering component
		*/
		function render( pkg ) {
			var pkgPath = path + '/' + pkg;
			if ( pkg === '__namespace__' ) {
				return null;
			}
			if ( typeof namespace[ pkg ] !== 'object' ) {
				// Case: Individual package
				if (
					self.state.filter &&
					!pkgPath.includes( self.state.filter )
				) {
					return null;
				}
				return (
					<div key={ pkgPath }>
						<ListItem
							button
							key={ pkgPath+'-item' }
							className={ 'side-menu-list-item '+( (self.state.active === pkgPath) ? 'active-package' : '' ) }
							onClick={ self._onPackageClickFactory( pkgPath ) }
							style={{
								paddingLeft: 16 + 10*level
							}}
						>
							{ pkg }
						</ListItem>
					</div>
				);
			}
			// Case: Namespace package
			if (
				self.state.filter &&
				!self.state.found[ pkgPath ] &&
				!path.endsWith( self.state.filter )
			) {
				// Case: Filter does not match package or parent namespace
				return null;
			}
			return (
				<div key={ pkgPath } >
					<ListItem
						button
						onClick={ self._onNamespaceClickFactory( pkgPath ) }
						className={ 'side-menu-list-item-namespace '+( (self.state.active === pkgPath) ? 'active-package' : '' ) }
						style={{
							paddingLeft: 16 + 10*level
						}}
					>
						{ pkg }
						<span
							className="side-menu-list-item-namespace-icon"
							title={ self.state[ pkgPath ] ? 'Collapse sub-menu' : 'Expand sub-menu' }
						>
							{ self.state[ pkgPath ]
								? <RemoveIcon className="side-menu-list-item-collapse-icon" />
								: <AddIcon className="side-menu-list-item-expand-icon" />
							}
						</span>
					</ListItem>
					<Collapse
						in={ self.state[ pkgPath ] }
						timeout={ COLLAPSE_TRANSITION_TIMEOUT }
						unmountOnExit
					>
						{ self._renderItems( namespace[ pkg ], pkgPath, level+1 ) }
					</Collapse>
				</div>
			);
		}
	}

	/**
	* Renders the menu "head".
	*
	* @private
	* @returns {JSX} rendered component
	*/
	_renderHead() {
		return (
			<div className="side-menu-head" >
				<Link
					to={ config.mount+this.props.version+'/' }
					title="Navigate to documentation home"
				>
					<Logo />
				</Link>
				<IconButton
					aria-label="close drawer"
					onClick={ this._onMenuClose }
					edge="start"
					title="Close documentation navigation menu"
				>
					<ChevronLeftIcon className="MuiSvgIcon-root menu-close-icon" />
				</IconButton>
			</div>
		);
	}

	/**
	* Renders a menu to select a documentation version.
	*
	* @private
	* @returns {JSX} rendered component
	*/
	_renderVersionMenu() {
		return (
			<select
				className="side-menu-version-select"
				onChange={ this._onVersionChange }
				value={ this.props.version }
				title="Select documentation version"
			>
				{ config.versions.map( onOption ) }
			</select>
		);

		/**
		* Renders a menu option.
		*
		* @private
		* @param {string} version - version
		* @param {number} idx - index
		* @returns {JSX} rendered component
		*/
		function onOption( version, idx ) {
			return (
				<option key={ idx } value={ version }>{ version }</option>
			);
		}
	}

	/**
	* Renders a component to filter a menu.
	*
	* @private
	* @returns {JSX} rendered component
	*/
	_renderFilter() {
		return (
			<div className="side-menu-filter" >
				<input
					className="side-menu-filter-input"
					type="text"
					onChange={ this._onFilterChange }
					value={ this.state.filter }
					placeholder="Type here to filter menu..."
					title="Filter documentation menu"
				/>
				{ this.state.filter
					? <ClearIcon
						className="side-menu-filter-clear"
						title="Clear the current filter"
						onClick={ this._onResetFilterClick }
					/>
					: null
				}
			</div>
		);
	}

	/**
	* Renders the menu list of packages.
	*
	* @private
	* @returns {JSX} rendered component
	*/
	_renderList() {
		var tree = getPackageTree( this.props.version );
		return (
			<div className="side-menu-list-wrapper" >
				<List disablePadding >
					{ tree ? this._renderItems( tree, '@stdlib', 0 ) : null }
				</List>
			</div>
		);
	}

	/**
	* Callback invoked immediately after updating a component.
	*
	* @private
	* @param {Object} _ - previous properties
	* @param {Object} prev - previous state
	*/
	componentDidUpdate( _, prev ) {
		var pathname;
		var match;
		var state;
		var path;
		var el;

		pathname = this.props.history.location.pathname;
		if ( !pathname.endsWith( this.state.active ) ) {
			path = pathname.substring( pathname.indexOf( '@stdlib' ) );
			state = {};
			state[ path ] = true;
			state.active = path;
			match = RE_FORWARD_SLASH.exec( path );
			while ( match ) {
				state[ path.substring( 0, match.index ) ] = true;
				match = RE_FORWARD_SLASH.exec( path );
			}
			this.setState( state );
		}
		if ( this.state.active !== prev.active ) {
			el = document.getElementsByClassName( 'active-package' );
			if ( el.length > 0 ) {
				el = el[ 0 ];
				setTimeout( onTimeout, COLLAPSE_TRANSITION_TIMEOUT );
			}
		}

		/**
		* Callback invoked after a timeout.
		*
		* @private
		*/
		function onTimeout() {
			el.scrollIntoViewIfNeeded();
		}
	}

	/**
	* Renders a component.
	*
	* @returns {JSX} rendered component
	*/
	render() {
		if ( !this.props.version ) {
			return null;
		}
		return (
			<Fragment>
				<IconButton
					id="menu-icon-button"
					className="icon-button"
					color="inherit"
					aria-label="open drawer"
					onClick={ this._onMenuOpen }
					title="Open documentation navigation menu"
				>
					<MenuIcon id="menu-icon" />
				</IconButton>
				<div className="side-menu-wrapper">
					<Drawer
						className="side-menu-drawer"
						variant="persistent"
						anchor="left"
						open={ this.props.open }
						classes={{
							paper: 'side-menu-drawer'
						}}
					>
						{ this._renderHead() }
						{ this._renderVersionMenu() }
						{ this._renderFilter() }
						{ this._renderList() }
					</Drawer>
				</div>
			</Fragment>
		);
	}
}


// EXPORTS //

export default withRouter( SideMenu );
