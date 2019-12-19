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
import { Route, Redirect, Switch, withRouter } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import IframeResizer from './iframe_resizer.jsx';
import SideMenu from './side_menu.jsx';
import Welcome from './welcome.jsx';
import Readme from './readme.jsx';
import NotFound from './not_found.jsx';
import notFoundHTML from './not_found_html.js';
import Footer from './footer.jsx';
import TopNav from './top_nav.jsx';
import log from './log.js';
import fetchFragment from './fetch_fragment.js';
import JSON_CACHE from './json_cache.js';
import config from './config.js';


// MAIN //

class App extends React.Component {
	constructor( props ) {
		var pathname;
		var version;
		var prefix;
		var i;
		var j;

		super( props );

		prefix = config.mount;
		pathname = props.history.location.pathname;

		// Extract the version from the current window location...
		i = pathname.indexOf( prefix ) + prefix.length;
		j = pathname.substring( i ).indexOf( '/' );
		if ( j === -1 ) {
			version = '';
		} else {
			version = pathname.substring( i, i+j );
		}
		// If the extracted version is not supported, default to the latest supported version...
		if ( !version || !config.versions.includes( version ) ) {
			version = config.versions[ 0 ];
		}
		this.state = {
			'sideMenu': true,
			'version': version,
			'packageTree': null,
			'packageResources': {}
		};
	}

	_fetchPackageData = ( version ) => {
		var o;

		o = JSON_CACHE[ version ];
		if ( o && o.tree ) {
			this.setState({
				'packageTree': o.tree
			});
		} else {
			fetch( config.mount+version+'/package_tree.json' )
				.then( res => res.json() )
				.then( res => {
					if ( JSON_CACHE[ version ] === void 0 ) {
						JSON_CACHE[ version ] = {};
					}
					JSON_CACHE[ version ].tree = res;

					// Guard against race conditions (e.g., this request resolving *after* a user subsequently selected a different version whose associated request already resolved)...
					if ( version === this.state.version ) {
						this.setState({
							'packageTree': res
						});
					}
				})
				.catch( log );
		}
		if ( o && o.resources ) {
			this.setState({
				'packageResources': o.resources
			});
		} else {
			fetch( config.mount+version+'/package_resources.json' )
				.then( res => res.json() )
				.then( res => {
					if ( JSON_CACHE[ version ] === void 0 ) {
						JSON_CACHE[ version ] = {};
					}
					JSON_CACHE[ version ].resources = res;

					// Guard against race conditions (e.g., this request resolving *after* a user subsequently selected a different version whose associated request already resolved)...
					if ( version === this.state.version ) {
						this.setState({
							'packageResources': res
						});
					}
				})
				.catch( log );
		}
	}

	_fetchFragment = ( path ) => {
		var self;
		var html;

		self = this;

		// Attempt to fetch a package README fragment:
		html = fetchFragment( path, clbk );

		// If we were unable to resolve a fragment synchronously, return an empty string in the hopes that we'll be able to quickly resolve the fragment asynchronously...
		if ( html === null ) {
			return '';
		}
		return html;

		/**
		* Callback invoked upon fetching a fragment.
		*
		* @private
		* @param {(Error|null)} error - error object
		* @param {string} fragment
		* @returns {void}
		*/
		function clbk( error, fragment ) {
			if ( error ) {
				// Guard against race conditions (e.g., a fragment fails to resolve *after* a user subsequently navigated to a different package whose associated fragment already resolved)...
				if ( path === self.props.history.location.pathname ) {
					self._updateReadme( notFoundHTML() );
				}
				return log( error );
			}
			// Guard against race conditions (e.g., a fragment is resolved *after* a user subsequently navigated to a different package whose associated fragment already resolved)...
			if ( path === self.props.history.location.pathname ) {
				self._updateReadme( fragment );
			}
		}
	}

	_onSideMenuChange = ( value ) => {
		this.setState({
			'sideMenu': value
		});
	}

	_onPackageChange = ( path ) => {
		// Update the history in order to navigate to the desired package:
		this.props.history.push( path );

		// Scroll back to the top of the page:
		window.scrollTo( 0, 0 );
	}

	_onVersionChange = ( event ) => {
		var pathname;
		var version;
		var state;
		var self;

		self = this;
		version = event.target.value;

		pathname = this.props.history.location.pathname;
		pathname = pathname.replace( this.state.version, version );
		this.props.history.push( pathname );

		state = {
			'version': version
		};
		this.setState( state, clbk );

		/**
		* Callback invoked upon setting component state and re-rendering a component.
		*
		* @private
		*/
		function clbk() {
			self._fetchPackageData( version );
		}
	}

	_updateReadme( html ) {
		var el = document.getElementById( 'readme' );
		if ( el ) {
			el.innerHTML = html;
		}
	}

	_renderReadme = ( match ) => {
		return (
			<Readme html={ this._fetchFragment( match.url ) } />
		);
	}

	_renderBenchmark = ( match ) => {
		var resources = this.state.packageResources[ match.params.pkg ];
		if ( !resources.benchmark ) {
			return (
				<NotFound />
			);
		}
		return (
			<IframeResizer
				className="embedded-iframe"
				url={ match.url }
				title="Benchmarks"
				width="100%"
			/>
		);
	}

	_renderTest = ( match ) => {
		var resources = this.state.packageResources[ match.params.pkg ];
		if ( !resources.test ) {
			return (
				<NotFound />
			);
		}
		return (
			<IframeResizer
				className="embedded-iframe"
				url={ match.url }
				title="Tests"
				width="100%"
			/>
		);
	}

	_renderWelcome = () => {
		return (
			<Welcome version={ this.state.version } />
		);
	}

	_renderTopNav = ( content, match ) => {
		var resources;
		var props;

		props = {
			'pkg': '',
			'version': '',
			'benchmarks': false,
			'docs': false,
			'home': false,
			'src': false,
			'tests': false,
			'typescript': false
		};
		if ( content === 'welcome' ) {
			props.home = true;
		} else {
			props.pkg = match.params.pkg;
			props.version = match.params.version;

			resources = this.state.packageResources[ props.pkg ];
			if ( resources ) {
				props.src = true;
				props.typescript = Boolean( resources.typescript );
				if ( content === 'readme' ) {
					props.benchmarks = Boolean( resources.benchmark );
					props.tests = Boolean( resources.test );
				} else if ( content === 'benchmark' ) {
					props.docs = true;
					props.tests = Boolean( resources.test );
				} else if ( content === 'test' ) {
					props.docs = true;
					props.benchmarks = Boolean( resources.benchmark );
				}
			}
		}
		return (
			<TopNav {...props} />
		);
	}

	_renderer = ( content ) => {
		var method;
		var self;

		self = this;
		if ( content === 'welcome' ) {
			method = '_renderWelcome';
		} else if ( content === 'readme' ) {
			method = '_renderReadme';
		} else if ( content === 'benchmark' ) {
			method = '_renderBenchmark';
		} else if ( content === 'test' ) {
			method = '_renderTest';
		}
		return render;

		/**
		* Returns a React component for rendering the main content.
		*
		* @private
		* @param {Object} props - route properties
		* @param {Object} props.match - match properties
		* @returns {ReactComponent} React component
		*/
		function render( props ) {
			return (
				<Fragment>
					{ self._renderTopNav( content, props.match ) }
					<div class="main" role="main">
						<div className={ 'main-content '+( self.state.sideMenu ? 'side-menu-adjacent' : '' ) }>
							{ self[ method ]( props.match ) }
						</div>
					</div>
				</Fragment>
			);
		}
	}

	componentDidMount() {
		this._fetchPackageData( this.state.version );
	}

	render() {
		return (
			<Fragment>
				<SideMenu
					onDrawerChange={ this._onSideMenuChange }
					onPackageChange={ this._onPackageChange }
					onVersionChange={ this._onVersionChange }
					open={ this.state.sideMenu }
					version={ this.state.version }
					packageTree={ this.state.packageTree }
				/>
				<Switch>
					<Redirect
						exact
						from={ config.mount+':version/@stdlib/:pkg+/index.html' }
						to={ config.mount+':version/@stdlib/:pkg+' }
					/>
					<Route
						exact
						path={ config.mount+':version/@stdlib/:pkg+/benchmark.html' }
						render={ this._renderer( 'benchmark' ) }
					/>
					<Route
						exact
						path={ config.mount+':version/@stdlib/:pkg+/test.html' }
						render={ this._renderer( 'test' ) }
					/>
					<Route
						exact
						path={ config.mount+':version/@stdlib/:pkg+' }
						render={ this._renderer( 'readme' ) }
					/>
					<Redirect
						exact
						from={ config.mount+':version/*' }
						to={ config.mount+':version' }
					/>
					<Route
						exact
						path={ config.mount+':version' }
						render={ this._renderer( 'welcome' ) }
					/>
					<Redirect to={ config.mount+this.state.version } />
				</Switch>
				<Footer />
			</Fragment>
		);
	}
}


// EXPORTS //

export default withRouter( App );
