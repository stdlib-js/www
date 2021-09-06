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
import { Route, Redirect, Switch, matchPath, withRouter } from 'react-router-dom';
import lunr from 'lunr';
import IframeResizer from './components/iframe-resizer/index.jsx';
import Welcome from './components/welcome/index.jsx';
import Footer from './components/footer/index.jsx';
import Readme from './components/readme/index.jsx';
import NotFound from './components/not-found/index.jsx';
import notFoundHTML from './components/not-found/html.js';
import TopNav from './components/top-nav/index.jsx';
import log from './utils/log.js';
import fetchFragment from './utils/fetch_fragment.js';
import fetchPackageData from './utils/fetch_package_data.js';
import fetchSearchData from './utils/fetch_search_data.js';
import packageResources from './utils/package_resources.js';
import packageResource from './utils/package_resource.js';
import packageDescription from './utils/package_description.js';
import viewportWidth from './utils/viewport_width.js';
import resetScroll from './utils/reset_scroll.js';
import config from './config.js';
import routes from './routes.js';


// VARIABLES //

var RE_INTERNAL_URL = new RegExp( '^'+config.mount );
var RENDER_METHOD_NAMES = {
	'welcome': '_renderWelcome',
	'readme': '_renderReadme',
	'benchmark': '_renderBenchmark',
	'test': '_renderTest'
};


// FUNCTIONS //

/**
* Parses the current URL path.
*
* @private
* @param {string} pathname - current URL path
* @param {string} version - default documentation version
* @returns {(Object|null)} parse results
*/
function matchCurrentPath( pathname, version ) {
	var match;

	// Try to find the matching route...
	match = matchPath( pathname, {
		'path': routes.PACKAGE_BENCHMARKS,
		'exact': true
	});
	if ( match ) {
		return match;
	}
	match = matchPath( pathname, {
		'path': routes.PACKAGE_TESTS,
		'exact': true
	});
	if ( match ) {
		return match;
	}
	match = matchPath( pathname, {
		'path': routes.PACKAGE_DEFAULT,
		'exact': true
	});
	if ( match ) {
		return match;
	}
	match = matchPath( pathname, {
		'path': routes.VERSION_DEFAULT,
		'exact': true
	});
	if ( match ) {
		return match;
	}
	// Default to version landing page:
	return {
		'path': routes.VERSION_DEFAULT,
		'url': pathname,
		'params': {
			'version': version
		}
	};
}

/**
* Updates rendered README content.
*
* ## Notes
*
* -   This function updates rendered content **outside** of the standard component lifecyle.
*
* @private
* @param {string} html - README content
*/
function updateReadme( html ) {
	var el = document.getElementById( 'readme' );
	if ( el ) {
		el.innerHTML = html;
	}
}


// MAIN //

/**
* Component for rendering the main application.
*
* @private
*/
class App extends React.Component {
	/**
	* Returns a component which renders the main application.
	*
	* @constructor
	* @param {Object} props - component properties
	* @param {Object} props.history - history object for navigation
	* @returns {ReactComponent} React component
	*/
	constructor( props ) {
		var w;

		// Register component properties:
		super( props );

		// Query the current viewport width:
		w = viewportWidth();

		// Set the initial component state:
		this.state = {
			// Boolean indicating whether to show the side menu:
			'sideMenu': ( w ) ? ( w >= 1080 ) : true,  // default to showing the side menu, except on smaller devices

			// Current documentation version:
			'version': config.versions[ 0 ]            // default to the latest version
		};

		// Search index:
		this._searchIndex = null;
	}

	/**
	* Fetches a package README fragment.
	*
	* ## Notes
	*
	* -   If unable to immediately resolve a fragment, the method attempts to asynchronously resolve the fragment and manually update the rendered application.
	*
	* @private
	* @param {string} path - fragment path
	* @returns {string} HTML string
	*/
	_fetchFragment( path ) {
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
					updateReadme( notFoundHTML() );
				}
				return log( error );
			}
			// Guard against race conditions (e.g., a fragment is resolved *after* a user subsequently navigated to a different package whose associated fragment already resolved)...
			if ( path === self.props.history.location.pathname ) {
				updateReadme( fragment );
			}
		}
	}

	/**
	* Callback invoked upon toggling the side menu.
	*
	* @private
	* @param {boolean} bool - boolean indicating whether the side menu is open or closed
	*/
	_onSideMenuToggle = ( bool ) => {
		this.setState({
			'sideMenu': bool
		});
	}

	/**
	* Callback invoked upon clicking on README content.
	*
	* ## Notes
	*
	* -   This `click` handler intercepts hyperlink navigation in order to notify the application router and ensure that internal documentation navigation does not trigger a fresh page load.
	*
	* @private
	* @param {Object} event - event object
	* @returns {void}
	*/
	_onReadmeClick = ( event ) => {
		var target;
		var href;

		// Find the nearest parent anchor element:
		target = event.target.closest( 'a' );
		if ( !target ) {
			return;
		}
		// Allow links to external resources to proceed unhindered:
		href = target.getAttribute( 'href' );
		if ( RE_INTERNAL_URL.test( href ) === false ) {
			return;
		}
		// Prevent the application from navigating to a documentation page via a fresh page load:
		event.preventDefault();

		// Notify the router that the user has navigated to a different documentation page:
		this.props.history.push( href );
	}

	/**
	* Callback invoked upon a change to the current package.
	*
	* @private
	* @param {string} path - package path
	*/
	_onPackageChange = ( path ) => {
		// Update the history in order to navigate to the desired package:
		this.props.history.push( path );
	}

	/**
	* Callback invoked upon a change to the current documentation version.
	*
	* @private
	* @param {string} version - version
	*/
	_onVersionChange = ( version ) => {
		this._updateVersion( version, done );

		/**
		* Callback invoked upon updating the version.
		*
		* @private
		* @param {Error} [error] - error object
		*/
		function done( error ) {
			if ( error ) {
				// TODO: render a modal indicating that we are unable to update the version (e.g., due to network error, etc) (Note: we may need to reset the triggering UI element; e.g., the dropdown menu in the side menu)
				return log( error );
			}
		}
	}

	/**
	* Callback invoked upon updating a search input element.
	*
	* @private
	* @param {string} query - search query
	*/
	_onSearchChange = ( query ) => {
		var version;
		var self;

		self = this;

		// Cache the version in order to avoid race conditions:
		version = this.state.version;

		// If we do not currently have a search index, create one...
		if ( this._searchIndex === null ) {
			fetchSearchData( this.props.version, done );
		}

		/**
		* Callback invoked upon retrieving search data.
		*
		* @private
		* @param {(Error|null)} error - error object
		* @param {Object} data - search data
		* @returns {void}
		*/
		function done( error, data ) {
			if ( error ) {
				return log( error );
			}
			// Check that the version has remained the same...
			if ( version === self.state.version ) {
				// Load the serialized index into Lunr:
				self._searchIndex = lunr.Index.load( data.index );
			}
		}
	}

	/**
	* Callback invoked upon submitting a search query.
	*
	* @private
	* @param {string} query - search query
	*/
	_onSearchSubmit = ( query ) => {
		var results;
		var out;
		var pkg;
		var i;

		results = this._searchIndex.search( query );
		out = [];
		for ( i = 0; i < results.length; i++ ) {
			pkg = results[ i ].id;
			out.push({
				'name': pkg,
				'desc': packageDescription( pkg, this.state.version )
			});
		}
		log( out );
	}

	/**
	* Updates the documentation version.
	*
	* @private
	* @param {string} version - version
	* @param {Callback} done - callback to invoke upon completion
	*/
	_updateVersion( version, done ) {
		var self = this;

		// TODO: we should overlay a progress indicator while we load package data (see, e.g., https://material-ui.com/components/backdrop/)...
		fetchPackageData( version, clbk );

		/**
		* Callback invoked upon fetching package resources associated with a specified version.
		*
		* @private
		* @param {Error} [error] - error object
		* @returns {void}
		*/
		function clbk( error ) {
			var pathname;
			var state;
			if ( error ) {
				return done( error );
			}
			pathname = self.props.history.location.pathname;
			if ( pathname === config.mount ) {
				pathname += version + '/';
			} else {
				// FIXME: what happens when we change the version while viewing a package and the package has either moved or does not exist in the new version of the docs?
				pathname = pathname.replace( self.state.version, version );
			}
			self.props.history.push( pathname );

			self._searchIndex = null;
			state = {
				'version': version
			};
			self.setState( state, onState );
		}

		/**
		* Callback invoked upon updating the component state.
		*
		* @private
		*/
		function onState() {
			done();
		}
	}

	/**
	* Renders top navigation.
	*
	* @private
	* @returns {ReactElement} React element
	*/
	_renderTopNav() {
		var resources;
		var match;
		var props;
		var path;

		// Parse the current URL path:
		match = matchCurrentPath( this.props.history.location.pathname, this.state.version );
		path = match.path;

		// Define default property values:
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
		// Update property values based on the current "view"...
		if ( path === routes.VERSION_DEFAULT ) {
			props.home = true;
			props.version = this.state.version;
		} else {
			// We are currently rendering a package view...
			props.pkg = '@stdlib/' + match.params.pkg;
			props.version = match.params.version;
			props.src = true;

			// Attempt to resolve package resources for the current package...
			resources = packageResources( props.version );
			if ( resources ) {
				resources = resources[ match.params.pkg ];
			}
			// If we were able to resolve package resources, determine which links we want to display in the top navigation...
			if ( resources ) {
				props.typescript = Boolean( resources.typescript );
				if ( path === routes.PACKAGE_DEFAULT ) {
					props.benchmarks = Boolean( resources.benchmark );
					props.tests = Boolean( resources.test );
				} else if ( path === routes.PACKAGE_BENCHMARKS ) {
					props.docs = true;
					props.tests = Boolean( resources.test );
				} else if ( path === routes.PACKAGE_TESTS ) {
					props.docs = true;
					props.benchmarks = Boolean( resources.benchmark );
				}
			}
		}
		return (
			<TopNav
				onSideMenuToggle={ this._onSideMenuToggle }
				onPackageChange={ this._onPackageChange }
				onVersionChange={ this._onVersionChange }
				onSearchSubmit={ this._onSearchSubmit }
				sideMenu={ this.state.sideMenu }
				{...props}
			/>
		);
	}

	/**
	* Renders a README.
	*
	* @private
	* @param {Object} match - match object
	* @param {string} match.url - resource URL
	* @returns {ReactElement} React element
	*/
	_renderReadme( match ) {
		return (
			<Readme
				html={ this._fetchFragment( match.url ) }
				onClick={ this._onReadmeClick }
			/>
		);
	}

	/**
	* Renders a benchmark.
	*
	* @private
	* @param {Object} match - match object
	* @param {string} match.url - resource URL
	* @param {Object} match.params - URL parameters
	* @param {string} match.params.pkg - package name
	* @param {string} match.params.version - documentation version
	* @returns {ReactElement} React element
	*/
	_renderBenchmark( match ) {
		var rsrc = packageResource( match.params.pkg, 'benchmark', match.params.version );
		if ( rsrc ) {
			return (
				<IframeResizer
					className="embedded-iframe"
					url={ match.url }
					title="Benchmarks"
					width="100%"
				/>
			);
		}
		return (
			<NotFound />
		);
	}

	/**
	* Renders tests.
	*
	* @private
	* @param {Object} match - match object
	* @param {string} match.url - resource URL
	* @param {Object} match.params - URL parameters
	* @param {string} match.params.pkg - package name
	* @param {string} match.params.version - documentation version
	* @returns {ReactElement} React element
	*/
	_renderTest( match ) {
		var rsrc = packageResource( match.params.pkg, 'test', match.params.version );
		if ( rsrc ) {
			return (
				<IframeResizer
					className="embedded-iframe"
					url={ match.url }
					title="Tests"
					width="100%"
				/>
			);
		}
		return (
			<NotFound />
		);
	}

	/**
	* Renders landing page content.
	*
	* @private
	* @param {Object} match - match object
	* @param {string} match.url - resource URL
	* @param {Object} match.params - URL parameters
	* @param {string} match.params.version - documentation version
	* @returns {ReactElement} React element
	*/
	_renderWelcome( match ) {
		return (
			<Welcome version={ match.params.version } />
		);
	}

	/**
	* Returns a rendering function.
	*
	* @private
	* @param {string} content - content type
	* @returns {Function} rendering function
	*/
	_renderer( content ) {
		var method;
		var self;

		self = this;
		method = RENDER_METHOD_NAMES[ content ];

		return render;

		/**
		* Renders the main content.
		*
		* @private
		* @param {Object} props - route properties
		* @param {Object} props.match - match object
		* @returns {ReactElement} React element
		*/
		function render( props ) {
			return (
				<div
					class={ 'main '+( self.state.sideMenu ? 'translate-right' : '' ) }
					role="main"
				>
					{ self[ method ]( props.match ) }
				</div>
			);
		}
	}

	/**
	* Callback invoked immediately after mounting a component (i.e., is inserted into a tree).
	*/
	componentDidMount() {
		var pathname;
		var version;
		var prefix;
		var i;
		var j;

		prefix = config.mount;
		pathname = this.props.history.location.pathname;

		// Extract the version from the current window location...
		i = pathname.indexOf( prefix ) + prefix.length;
		j = pathname.substring( i ).indexOf( '/' );
		if ( j === -1 ) {
			version = '';
		} else {
			version = pathname.substring( i, i+j );
		}
		// If the extracted version is not supported, default to the latest supported version...
		if ( !version || !config.versions.includes( version ) || version === 'latest' ) {
			// TODO: should we inform the user that a version is not supported? Presumably. We could display a banner at the top, or something.
			version = config.versions[ 0 ];
		}
		this._updateVersion( version, done );

		/**
		* Callback invoked upon updating the current version.
		*
		* @private
		* @param {Error} [error] - error object
		*/
		function done( error ) {
			if ( error ) {
				// TODO: render a modal indicating that we are unable to set the version (e.g., due to network error, etc)
				return log( error );
			}
			// TODO: if the updated version is not the latest supported version, display a message indicating that this version of the docs is "out-of-date"
		}
	}

	/**
	* Renders the component.
	*
	* @returns {ReactElement} React element
	*/
	render() {
		// Whenever we navigate to a new page, reset the window scroll position:
		resetScroll();

		return (
			<Fragment>
				{ this._renderTopNav() }
				<Switch>
					<Redirect
						exact
						from={ routes.PACKAGE_INDEX }
						to={ routes.PACKAGE_DEFAULT }
					/>
					<Route
						exact
						path={ routes.PACKAGE_BENCHMARKS }
						render={ this._renderer( 'benchmark' ) }
					/>
					<Route
						exact
						path={ routes.PACKAGE_TESTS }
						render={ this._renderer( 'test' ) }
					/>
					<Route
						exact
						path={ routes.PACKAGE_DEFAULT }
						render={ this._renderer( 'readme' ) }
					/>
					<Redirect
						exact
						from={ routes.NONPACKAGE_DEFAULT }
						to={ routes.VERSION_DEFAULT }
					/>
					<Route
						exact
						path={ routes.VERSION_DEFAULT }
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
