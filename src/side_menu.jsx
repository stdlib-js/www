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
import Logo from './logo.jsx';
import config from './config.js';


// VARIABLES //

const RE_FORWARD_SLASH = /\//g;
const COLLAPSE_TRANSITION_TIMEOUT = 500;


// MAIN //

class MenuBar extends React.Component {
	constructor( props ) {
		super( props )
		this.state = {
			'activePkg': null,
			'filter': '',
			'found': {}
		};
	}

	_onDrawerOpen = () => {
		this.props.onDrawerChange( true );
	}

	_onDrawerClose = () => {
		this.props.onDrawerChange( false );
	}

	_onClickFactory( pkg ) {
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
				state.activePkg = pkg;
				self.props.onPackageChange( path );
			}
			return state;
		}
	}

	_onPackageClick( pkg ) {
		this.setState({
			'activePkg': pkg
		});
	}

	_renderItems( namespace, path, level ) {
		var keys = Object.keys( namespace );
		return keys.map( ( pkg ) => {
			var pkgPath = path + '/' + pkg;
			if ( pkg === '__namespace__' ) {
				return null;
			}
			if ( typeof namespace[ pkg ] !== 'object' ) {
				// Case: Individual package
				if (
					this.state.filter &&
					!pkgPath.includes( this.state.filter )
				) {
					return null;
				}
				return (
					<div key={ pkgPath }>
						<ListItem
							button
							key={ pkgPath+'-item' }
							className={ 'side-menu-list-item '+( (this.state.activePkg === pkgPath) ? 'active-package' : '' ) }
							onClick={() => {
								var path = config.mount + this.props.version + '/' + pkgPath;
								this._onPackageClick( pkgPath );
								this.props.onPackageChange( path );
							}}
							style={{
								paddingLeft: 16 + 10 * level
							}}
						>
							{pkg}
						</ListItem>
					</div>
				)
			}
			// Case: Namespace package
			if (
				this.state.filter &&
				!this.state.found[ pkgPath ] &&
				!path.endsWith( this.state.filter )
			) {
				// Case: Filter does not match package or parent namespace
				return null;
			}
			return (
				<div key={pkgPath} >
					<ListItem
						button
						onClick={ this._onClickFactory( pkgPath ) }
						className={ 'side-menu-list-item-namespace '+( (this.state.activePkg === pkgPath) ? 'active-package' : '' ) }
						style={{
							paddingLeft: 16 + 10 * level
						}}
					>
						{pkg}
						<span
							className="side-menu-list-item-namespace-icon"
							title={ this.state[ pkgPath ] ? 'Collapse sub-menu' : 'Expand sub-menu' }
						>
							{ this.state[ pkgPath ] ?
								<RemoveIcon className="side-menu-list-item-collapse-icon" /> :
								<AddIcon className="side-menu-list-item-expand-icon" />
							}
						</span>
					</ListItem>
					<Collapse
						in={ this.state[ pkgPath ] }
						timeout={ COLLAPSE_TRANSITION_TIMEOUT }
						unmountOnExit
					>
						{this._renderItems( namespace[ pkg ], pkgPath, level+1 )}
					</Collapse>
				</div>
			)
		} )
	}

	_onFilterChange = ( event ) => {
		var newFilter = event.target.value;
		var self = this;
		this.setState({
			'filter': newFilter.toLowerCase()
		}, clbk );

		/**
		* Callback invoked after setting component state.
		*
		* @private
		*/
		function clbk() {
			if ( !self.debounced ) {
				self.debounced = debounce( 300, self._applyFilterChange );
			}
			self.debounced();
		}
	}

	_applyFilterChange = () => {
		var found;
		var state;
		var keys;
		var i;
		if ( this.state.filter ) {
			found = {};
			this._checkFilter( found, this.props.packageTree, '@stdlib', this.state.filter );
			keys = Object.keys( found );
			state = {};
			for ( i = 0; i < keys.length; i++ ) {
				state[ keys[ i ] ] = true;
			}
			this.setState({
				...state,
				'found': found
			});
		} else {
			this._resetFilter();
		}
	}

	_resetFilter = () => {
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

	_checkFilter( state, docs, path, filter ) {
		var matched;
		var keys;
		var pkg;
		var flg;
		var i;

		keys = Object.keys( docs );
		for ( i = 0; i < keys.length; i++ ) {
			pkg = keys[ i ];
			if ( typeof docs[ pkg ] !== 'object' ) {
				if ( pkg.includes( filter ) ) {
					matched = true;
				}
			} else if ( pkg.includes( filter ) ) {
				matched = true;
				state[ path+'/'+pkg ] = true;
			} else {
				flg = this._checkFilter( state, docs[ pkg ], path+'/'+pkg, filter );
				if ( flg ) {
					matched = true;
				}
			}
		}
		if ( matched  ) {
			state[ path ] = true;
		}
		return matched;
	}

	componentDidUpdate( _, prev ) {
		var pathname;
		var match;
		var state;
		var path;
		var el;

		pathname = this.props.history.location.pathname;
		if ( !pathname.endsWith( this.state.activePkg ) ) {
			path = pathname.substring( pathname.indexOf( '@stdlib' ) );
			state = {};
			state[ path ] = true;
			state.activePkg = path;
			while ( ( match = RE_FORWARD_SLASH.exec( path) ) !== null ) {
				state[ path.substring( 0, match.index ) ] = true;
			}
			this.setState( state );
		}
		if ( this.state.activePkg !== prev.activePkg ) {
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

	render() {
		return (
			<Fragment>
				<IconButton
					color="inherit"
					aria-label="open drawer"
					onClick={ this._onDrawerOpen }
					edge="start"
					id="menu-icon-button"
					title="Open documentation navigation menu"
				>
					<MenuIcon id="menu-icon" />
				</IconButton>
				<div>
					<Drawer
						className="side-menu-drawer"
						variant="persistent"
						anchor="left"
						open={ this.props.open }
						classes={{
							paper: 'side-menu-drawer'
						}}
					>
						<div className="side-menu-head" >
							<Link to={ config.mount+this.props.version+'/' } title="Navigate to documentation home">
								<Logo />
							</Link>
							<IconButton
								aria-label="close drawer"
								onClick={ this._onDrawerClose }
								edge="start"
								title="Close documentation navigation menu"
							>
								<ChevronLeftIcon className="MuiSvgIcon-root menu-close-icon" />
							</IconButton>
						</div>
						<select
							className="side-menu-version-select"
							onChange={ this.props.onVersionChange }
							value={ this.props.version }
							title="Select documentation version"
						>
							{config.versions.map( ( val, key ) => <option key={ key } value={ val }>{ val }</option> )}
						</select>
						<div className="side-menu-filter" >
							<input
								className="side-menu-filter-input"
								type="text"
								onChange={ this._onFilterChange }
								value={ this.state.filter }
								placeholder="Type here to filter menu..."
								title="Filter documentation menu"
							/>
							{ this.state.filter ? <ClearIcon
								className="side-menu-filter-clear"
								title="Clear the current filter"
								onClick={ this._resetFilter }
							/> : null }
						</div>
						<div className="side-menu-list-wrapper" >
							<List disablePadding >
								{ this.props.packageTree ?
									this._renderItems( this.props.packageTree, '@stdlib', 0 ) :
									null
								}
							</List>
						</div>
					</Drawer>
				</div>
			</Fragment>
		);
	}
}


// EXPORTS //

export default withRouter( MenuBar );
