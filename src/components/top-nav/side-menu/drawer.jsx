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
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import IconButton from '@material-ui/core/IconButton';
import pkgPath from './../../../utils/pkg_doc_path.js';
import packageTree from './../../../utils/package_tree.js';
import namespaces from './../../../utils/namespace_list.js';
import filter from './../../../utils/filter_package_tree.js';
import deprefix from './../../../utils/deprefix_package_name.js';
import config from './../../../config.js';
import VersionMenu from './version_menu.jsx';
import Head from './head.jsx';
import Filter from './filter.jsx';


// VARIABLES //

var RE_TRAILING_SLASH = /\/$/;
var COLLAPSE_TRANSITION_TIMEOUT = 500;
var DEBOUNCE_INTERVAL = 300;


// FUNCTIONS //

/**
* Expands (or collapses) ancestor namespaces.
*
* ## Notes
*
* -   If `state` is `true`, ancestor namespaces are expanded; otherwise, if `state` is `false`, ancestor namespaces are collapsed.
*
* @private
* @param {Object} hash - hash for setting the collapse state
* @param {string} pkg - package name
* @param {boolean} state - collapse state
* @returns {Object} collapse state hash
*/
function expandAncestors( hash, pkg, state ) {
	var parts;
	var i;

	// Split the package name into its path components (e.g., `foo/bar` => `[ 'foo', 'bar' ]`):
	parts = pkg.split( '/' );

	// Update the collapse states of ancestor namespaces...
	for ( i = 0; i < parts.length-1; i++ ) {
		hash[ parts.slice( 0, i+1 ).join( '/' ) ] = state;
	}

	return hash;
}

/**
* Updates the side menu view to ensure that the active package is visible.
*
* @private
*/
function resetView() {
	var el = document.getElementsByClassName( 'active-package' );
	if ( el.length > 0 ) {
		el = el[ 0 ];
		setTimeout( onTimeout, COLLAPSE_TRANSITION_TIMEOUT );
	}

	/**
	* Callback invoked after a timeout.
	*
	* @private
	*/
	function onTimeout() {
		el.scrollIntoView();
	}
}


// MAIN //

/**
* Component for rendering a side menu drawer for navigating project packages.
*
* @private
*/
class SideMenuDrawer extends React.Component {
	/**
	* Returns a component for rendering a side menu drawer for navigating project packages.
	*
	* @constructor
	* @param {Object} props - component properties
	* @param {boolean} props.open - boolean indicating whether the side menu is open
	* @param {string} props.version - documentation version
	* @param {Callback} props.onToggle - callback to invoke upon toggling the side menu
	* @param {Callback} props.onPackageChange - callback to invoke upon a change to the selected package
	* @param {Callback} props.onVersionChange - callback to invoke upon a change to the selected documentation version
	* @returns {ReactComponent} component
	*/
	constructor( props ) {
		var pathname;
		var ns;
		var i;

		// Pass provided properties to parent constructor:
		super( props );

		// Set the initial state...
		this.state = {
			// Package which is currently selected by the user:
			'active': '',

			// Text the user has entered to filter the list of packages displayed in the side menu:
			'filter': null,

			// Filtered tree:
			'filteredTree': null,

			// Hash for tracking the collapse state of namespaces:
			'expanded': {},

			// Hash for tracking the collapse state of namespaces during filtering:
			'filteredExpanded': null,

			// Update counter for triggering component rendering on updates to the `expanded` hash:
			'update': 0
		};

		// Debounce callback to prevent thrashing the UI when a user attempts to filter the menu:
		this._debounce = null;

		// Snapshot of the component state:
		this._cachedState = null;

		// For each namespace package, set the initial collapse state...
		ns = namespaces( props.version );
		if ( ns ) {
			for ( i = 0; i < ns.length; i++ ) {
				// By default, all namespaces are collapsed...
				this.state.expanded[ ns[i] ] = false;
			}
		}
		// Get the current URL:
		pathname = this.props.history.location.pathname;
		pathname = pathname.replace( RE_TRAILING_SLASH, '' );

		// Isolate the package path, if such a path exists (e.g., /docs/api/@stdlib/foo/bar => @stdlib/foo/bar):
		i = pathname.indexOf( '@stdlib/' );

		// Toggle the display for the current package, its siblings, and its ancestors (note: why are we doing this? Because, if a user is dropped into package documentation, we want the side menu to be automatically expanded to show the location of the package in the package tree)...
		if ( i >= 0 ) {
			// Update the state for the current package, making it the "active" package:
			this.state.active = deprefix( pathname.substring( i ) );

			// Update the collapse states of ancestor namespaces:
			expandAncestors( this.state.expanded, this.state.active, true );
		}
		return this;
	}

	/**
	* Returns the current component state for select properties.
	*
	* ## Notes
	*
	* -   Only select properties are captured. Accordingly, the returned snapshot **cannot** be used for more generally "rewinding" component state.
	*
	* @private
	* @returns {Object} current component state for select properties
	*/
	_snapshot() {
		var dest;
		var out;
		var src;
		var ns;
		var k;
		var i;

		out = {};

		// Capture the current active package:
		out.active = this.state.active;

		// Get the list of namespaces for the current documentation version:
		ns = namespaces( this.props.version );
		if ( ns === null ) {
			console.log( 'unexpected error. Unable to resolve list of namespaces for current documentation version. Version: ' + this.props.version + '.' );
			return out;
		}
		// Copy the current namespace collapse states to a new object...
		src = this.state.expanded;
		dest = {};
		for ( i = 0; i < ns.length; i++ ) {
			k = ns[ i ];
			dest[ k ] = src[ k ];
		}
		out.expanded = dest;

		return out;
	}

	/**
	* Restores component state to a cached version.
	*
	* @private
	* @returns {void}
	*/
	_restoreState() {
		var state;
		var dest;
		var src;
		var tmp;
		var ns;
		var k;
		var i;

		tmp = this._cachedState;

		// If we don't have a snapshot, nothing to restore...
		if ( !tmp ) {
			return;
		}
		state = {};

		// Restore the active package:
		state.active = tmp.active;

		// Get the list of namespaces for the current documentation version:
		ns = namespaces( this.props.version );

		// Restore the namespace collapse states...
		if ( ns ) {
			dest = this.state.expanded;
			src = tmp.expanded;
			for ( i = 0; i < ns.length; i++ ) {
				k = ns[ i ];
				dest[ k ] = src[ k ];
			}
		} else {
			console.log( 'unexpected error. Unable to resolve the list of namespaces for the current documentation version. Version: ' + this.props.version + '.' );
		}
		// Set the update counter to indicate that the component should re-render:
		state.update = this.state.update + 1;

		// Reset the filtered tree:
		state.filteredTree = null;

		// Reset the filtered expanded hash:
		state.filteredExpanded = null;

		// Discard any cached state:
		this._cachedState = null;

		// Discard any references to a debounced function:
		this._debounced = null;

		// Update the component state:
		this.setState( state, resetView );
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
		var path = pkgPath( pkg, this.props.version );
		var self = this;
		return onClick;

		/**
		* Callback invoked upon a "click" event.
		*
		* @private
		*/
		function onClick() {
			// Notify the application that a user has selected a new package:
			self.props.onPackageChange( path );

			// Check whether a user is currently applying a menu filter...
			if ( self.state.filter ) {
				// If already active and expanded, collapse...
				if ( self.state.active === pkg && self.state.filteredExpanded[ pkg ] ) {
					self.state.filteredExpanded[ pkg ] = false; // collapse
				}
				// Otherwise, activate and expand the selected namespace...
				else {
					self.state.filteredExpanded[ pkg ] = true; // expand
				}
				// If a user has selected a namespace package while applying a filter to the side menu, we want to preserve the current component state, so that, when a user clears the filter, the package and its associated namespace path are still displayed in the menu...
				self._cachedState.active = pkg;
				self._cachedState.expanded[ pkg ] = self.state.filteredExpanded[ pkg ];
			} else {
				// If already active and expanded, collapse...
				if ( self.state.active === pkg && self.state.expanded[ pkg ] ) {
					self.state.expanded[ pkg ] = false; // collapse
				}
				// Otherwise, activate and expand the selected namespace...
				else {
					self.state.expanded[ pkg ] = true; // expand
				}
			}
			// Update the component state:
			self.setState({
				'active': pkg,
				'update': self.state.update + 1
			});
		}
	}

	/**
	* Returns a callback which is invoked upon clicking on a specified namespace package icon for collapsing/expanding a list of namespace packages.
	*
	* @private
	* @param {string} pkg - package namespace
	* @returns {Callback} event handler
	*/
	_onNamespaceIconClickFactory( pkg ) {
		var self = this;
		return onClick;

		/**
		* Callback invoked upon a "click" event.
		*
		* @private
		*/
		function onClick() {
			// If expanded, collapse, and, if collapsed, expand...
			if ( self.state.filter ) {
				self.state.filteredExpanded[ pkg ] = !self.state.filteredExpanded[ pkg ];
			} else {
				self.state.expanded[ pkg ] = !self.state.expanded[ pkg ];
			}
			// Signal that we need to re-render the component:
			self.setState({
				'update': self.state.update + 1
			});
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
		var path = pkgPath( pkg, this.props.version );
		var self = this;
		return onClick;

		/**
		* Callback invoked upon clicking on a package.
		*
		* @private
		* @param {Object} event - event object
		*/
		function onClick() {
			// Notify the application that a user has selected a package:
			self.props.onPackageChange( path );

			// If a user has selected a package while applying a filter to the side menu, we want to preserve the current component state, so that, when a user clears the filter, the package and its associated namespace path are still displayed in the menu...
			if ( self.state.filter ) {
				// Check whether we need to collapse a previously active namespace path during filtering...
				if ( self.state.active !== pkg ) {
					expandAncestors( self._cachedState.expanded, self.state.active, false );
				}
				self._cachedState.active = pkg;
				expandAncestors( self._cachedState.expanded, pkg, true );
			}
			// Update the component state:
			self.setState({
				'active': pkg
			});
		}
	}

	/**
	* Callback invoked upon a change to the menu filter.
	*
	* @private
	* @param {string} filter - filter string
	* @returns {void}
	*/
	_onFilterChange = ( filter ) => {
		var snapshot;
		var state;
		var self;

		self = this;

		// Check whether this is a new filter, and, if so, take a snapshot of the current component state so we can restore the side menu layout once the filter is cleared...
		if ( this.state.filter === null ) {
			snapshot = this._snapshot();
		}
		filter = filter.toLowerCase();

		// Check whether the filter has been manually cleared, and if so, restore the component to its snapshot layout state...
		if ( filter === '' ) {
			this.setState({
				'filter': null,
				'filteredTree': null,
				'filteredExpanded': null
			});
			return this._restoreState();
		}
		// Cache the snapshot...
		if ( snapshot ) {
			this._cachedState = snapshot;
		}
		// Update component state...
		state = {
			'filter': filter
		};
		this.setState( state, clbk );

		/**
		* Callback invoked after setting component state.
		*
		* @private
		*/
		function clbk() {
			if ( !self._debounced ) {
				self._debounced = debounce( DEBOUNCE_INTERVAL, self._filterMenu );
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
		var expanded;
		var parts;
		var tree;
		var list;
		var pkg;
		var i;
		var j;

		// Check whether the filter has been reset...
		if ( this.state.filter === null ) {
			return this._restoreState();
		}
		// Get the package tree for the current documentation version:
		tree = packageTree( this.props.version );
		if ( tree === null ) {
			return;
		}
		// Filter the package tree:
		list = [];
		tree = filter( tree, this.state.filter, list );
		if ( tree === null ) {
			tree = [];
		}
		// Automatically expand ancestor namespaces for each match...
		expanded = {};
		for ( i = 0; i < list.length; i++ ) {
			expandAncestors( expanded, deprefix( list[ i ] ), true );
		}

		// Update the component state:
		this.setState({
			'filteredTree': tree,
			'filteredExpanded': expanded
		});
	}

	/**
	* Renders a namespace tree node.
	*
	* @private
	* @param {Object} node - namespace tree node
	* @param {string} node.name - namespace package name (e.g., `@stdlib/foo/bar`)
	* @param {string} node.key - the last part of the package name (e.g., `@stdlib/foo/bar` => `bar`)
	* @param {ObjectArray} node.children - list of children nodes (i.e., namespaces and/or leaf packages)
	* @parma {Object} hash - hash indicating whether a namespace tree node is expanded
	* @param {NonNegativeInteger} level - namespace level
	* @returns {ReactElement} React element
	*/
	_renderNamespace( node, hash, level ) {
		var expanded;
		var name;
		var pkg;

		name = node.name;
		pkg = deprefix( name );

		expanded = hash[ pkg ];

		return (
			<Fragment>
				<ListItem
					key={ name }
					className={ 'side-menu-list-item-namespace '+( ( this.state.active === pkg ) ? 'active-package' : '' ) }
				>
					<Link
						to={ pkgPath( name, this.props.version ) }
						title={ name }
						onClick={ this._onNamespaceClickFactory( pkg ) }
						style={{
							paddingLeft: 16 + 10*level
						}}
					>
						{ node.key }
					</Link>
					<IconButton
						className="side-menu-list-item-namespace-icon"
						title={ ( expanded ) ? 'Collapse submenu' : 'Expand submenu' }
						onClick={ this._onNamespaceIconClickFactory( pkg ) }
						aria-label={ ( expanded ) ? 'collapse submenu' : 'expand submenu' }
						size="small"
					>
						{ ( expanded )
							? <RemoveIcon className="side-menu-list-item-collapse-icon" />
							: <AddIcon className="side-menu-list-item-expand-icon" />
						}
					</IconButton>
				</ListItem>
				<Collapse
					key={ name+'-submenu' }
					in={ expanded }
					timeout={ COLLAPSE_TRANSITION_TIMEOUT }
					unmountOnExit
				>
					<List disablePadding >
						{ this._renderTree( node.children, hash, level+1 ) }
					</List>
				</Collapse>
			</Fragment>
		);
	}

	/**
	* Renders an individual package tree node.
	*
	* @private
	* @param {Object} node - tree node
	* @param {string} node.name - package name (e.g., `@stdlib/foo/bar/beep`)
	* @param {string} node.key -  - the last part of the package name (e.g., `@stdlib/foo/bar` => `bar`)
	* @param {NonNegativeInteger} level - package level
	* @returns {ReactElement} React element
	*/
	_renderPackage( node, level ) {
		var name;
		var pkg;

		name = node.name;
		pkg = deprefix( name );

		return (
			<ListItem
				key={ name }
				className={ 'side-menu-list-item '+( ( this.state.active === pkg ) ? 'active-package' : '' ) }
			>
				<Link
					to={ pkgPath( name, this.props.version ) }
					title={ name }
					onClick={ this._onPackageClickFactory( pkg ) }
					style={{
						paddingLeft: 16 + 10*level
					}}
				>
					{ node.key }
				</Link>
			</ListItem>
		);
	}

	/**
	* Renders the menu package tree.
	*
	* @private
	* @param {ObjectArray} tree - package tree
	* @param {Object} expanded - hash indicating whether a namespace node (i.e., package) is expanded
	* @param {number} level - tree level (depth)
	* @returns {Array<ReactElement>} React elements
	*/
	_renderTree( tree, expanded, level ) {
		var pkg;
		var out;
		var el;
		var i;

		out = [];
		for ( i = 0; i < tree.length; i++ ) {
			pkg = tree[ i ];
			if ( pkg.children ) {
				el = this._renderNamespace( pkg, expanded, level );
			} else {
				el = this._renderPackage( pkg, level );
			}
			out.push( el );
		}
		return out;
	}

	/**
	* Callback invoked immediately after mounting a component (i.e., is inserted into the tree).
	*
	* @private
	*/
	componentDidMount() {
		setTimeout( resetView, 1000 );
	}

	/**
	* Callback invoked immediately after updating a component.
	*
	* @private
	* @param {Object} props - previous properties
	* @param {Object} prevState - previous state
	*/
	componentDidUpdate( props, prevState ) {
		var pathname;
		var parts;
		var state;
		var tree;
		var path;
		var list;
		var ns;
		var el;
		var o;
		var i;
		var j;
		var k;

		// FIXME: this method is called when, e.g., the docs version changes (due to updated props); what happens if the location does not point to a package which exists in that version? The app should 404, but what happens to the side  menu?

		// If the version changed, we need to update various resources...
		if ( this.props.version !== props.version ) {
			state = {};

			// Get the list of namespaces for the current version:
			ns = namespaces( this.props.version );

			// For each namespace package, (re)set the collapse state...
			o = {};
			for ( i = 0; i < ns.length; i++ ) {
				k = ns[ i ];

				// By default, all namespaces are collapsed...
				o[ k ] = Boolean( prev.expanded[ k ] );
			}
			state.expanded = o;

			// If a filtered is applied, we need to filter the new package tree... (TODO: is this desired? Or should we automatically clear the filter when the version changes?)
			if ( this.state.filter ) {
				tree = packageTree( this.props.version );
				list = [];
				tree = filter( tree, this.state.filter, list );
				if ( tree === null ) {
					tree = [];
				}
				state.filteredTree = tree;

				// Automatically expand ancestor namespaces for each match...
				o = {};
				for ( i = 0; i < list.length; i++ ) {
					expandAncestors( o, deprefix( list[ i ] ), true );
				}
				state.filteredExpanded = o;
			}
			// Update component state:
			this.setState( state );
		}
		// Get the current URL:
		pathname = this.props.history.location.pathname;
		pathname = pathname.replace( RE_TRAILING_SLASH, '' );

		// If the current URL does not match the "active" package, update the current state to match URL...
		if ( !pathname.endsWith( this.state.active ) ) {
			// Isolate the package path (e.g., /docs/api/latest/@stdlib/foo/bar => @stdlib/foo/bar => foo/bar):
			path = deprefix( pathname.substring( pathname.indexOf( '@stdlib' ) ) );

			// Expand ancestor namespace packages:
			expandAncestors( this.state.expanded, path, true );

			// Update the component state:
			this.setState({
				'active': path
			});
		}
		// If the current "active" package is different from the previous active package, we want to reset the scroll position to ensure that the current active package is in view...
		if ( this.state.active !== prevState.active ) {
			resetView();
		}
	}

	/**
	* Renders the component.
	*
	* @returns {ReactElement} React element
	*/
	render() {
		var expanded;
		var tree;

		// Ensure that we can resolve a package tree for the current documentation version:
		tree = packageTree( this.props.version );
		if ( tree === null ) {
			return null;
		}
		// Check whether a user is currently applying a menu filter...
		if ( this.state.filteredTree ) {
			tree = this.state.filteredTree;
			expanded = this.state.filteredExpanded;
		} else {
			expanded = this.state.expanded;
		}
		return (
			<Drawer
				className="side-menu-drawer"
				variant="persistent"
				anchor="left"
				open={ this.props.open }
				classes={{
					paper: 'side-menu-drawer'
				}}
			>
				<Head
					version={ this.props.version }
					onClose={ this._onMenuClose }
				/>
				<VersionMenu
					version={ this.props.version }
					onChange={ this._onVersionChange }
				/>
				<Filter
					onChange={ this._onFilterChange }
				/>

				<div className="side-menu-list-wrapper" >
					<List
						disablePadding
						className="side-menu-list"
					>
						{ this._renderTree( tree, expanded, 0 ) }
					</List>
				</div>
			</Drawer>
		);
	}
}


// EXPORTS //

export default withRouter( SideMenuDrawer );
