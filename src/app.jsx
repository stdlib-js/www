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
import qs from 'qs';
import IframeResizer from './components/iframe-resizer/index.jsx';
import Welcome from './components/welcome/index.jsx';
import Footer from './components/footer/index.jsx';
import Readme from './components/readme/index.jsx';
import NotFound from './components/not-found/index.jsx';
import TopNav from './components/top-nav/index.jsx';
import Search from './components/search/index.jsx';
import log from './utils/log.js';
import fetchPackageData from './utils/fetch_package_data.js';
import fetchSearchData from './utils/fetch_search_data.js';
import packageResources from './utils/package_resources.js';
import packageResource from './utils/package_resource.js';
import packageList from './utils/package_list.js';
import packageOrder from './utils/package_order.js';
import resetScroll from './utils/reset_scroll.js';
import deprefix from './utils/deprefix_package_name.js';
import config from './config.js';
import routes from './routes.js';


// VARIABLES //

var RE_INTERNAL_URL = new RegExp( '^'+config.mount );
var RE_SEARCH_URL = /\/search\/?/;
var RENDER_METHOD_NAMES = {
	'welcome': '_renderWelcome',
	'search': '_renderSearch',
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
		'path': routes.SEARCH,
		'exact': true
	});
	if ( match ) {
		return match;
	}
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
	* @param {string} props.version - documentation version
	* @param {boolean} [props.sideMenu] - boolean indicating whether the side menu should be **initially** open
	* @param {string} [props.pkg] - active package (e.g., `math/base/special/sin` or `@stdlib/math/base/special/sin`)
	* @param {string} [props.query] - initial search query
	* @returns {ReactComponent} React component
	*/
	constructor( props ) {
		// Register component properties:
		super( props );

		// Set the initial component state:
		this.state = {
			// Currently active package:
			'active': ( props.pkg ) ? deprefix( props.pkg ) : '', // e.g., `math/base/special/sin`

			// Search query:
			'query': props.query || '',

			// Boolean indicating whether to show the side menu:
			'sideMenu': Boolean( props.sideMenu ),

			// Current documentation version:
			'version': props.version,

			// Boolean indicating whether keyboard shortcuts are active:
			'shortcuts': true
		};

		// Previous (non-search) location (e.g., used for navigating to previous page after closing search results):
		this._prevLocation = config.mount; // default is API docs landing page

		// Create a `ref` to point to a DOM element for resetting focus on page change:
		this._focusRef = React.createRef();
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
		// Check that the user is navigating to a different page:
		if ( href === this.props.history.location.pathname ) {
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
	* @param {string} pkg - package name (e.g., `math/base/special/sin`)
	*/
	_onPackageChange = ( pkg ) => {
		this.setState({
			'active': pkg
		});
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

		// Update the component state:
		this.setState({
			'query': query
		});

		// Cache the version in order to avoid race conditions:
		version = this.state.version;

		// If we do not currently have a search index, try to eagerly create one...
		fetchSearchData( this.state.version, done );

		/**
		* Callback invoked upon retrieving search data.
		*
		* @private
		* @param {(Error|null)} error - error object
		* @returns {void}
		*/
		function done( error ) {
			if ( error ) {
				return log( error );
			}
			// Check whether the version has changed...
			if ( version !== self.state.version ) {
				// Try eagerly creating another search index based on the current version:
				fetchSearchData( self.state.version, done );
			}
		}
	}

	/**
	* Callback invoked upon submitting a search query.
	*
	* @private
	* @returns {void}
	*/
	_onSearchSubmit = () => {
		var path;

		// Check whether a user has entered a search query...
		if ( this.state.query === '' ) {
			return;
		}
		// If we are coming from a non-search page, cache the current location...
		path = this.props.location.pathname;
		if ( RE_SEARCH_URL.test( path ) === false ) {
			this._prevLocation = path;
		}
		// Resolve a search URL based on the search query:
		path = config.mount + this.state.version + '/search?q=' + encodeURIComponent( this.state.query );

		// Manually update the history to trigger navigation to the search page:
		this.props.history.push( path );
	}

	/**
	* Callback invoked upon closing search results.
	*
	* @private
	*/
	_onSearchClose = () => {
		// Manually update the history to trigger navigation to a previous (non-search) page:
		this.props.history.push( this._prevLocation );

		// Update the component state:
		this.setState({
			'query': '' // reset the search input element
		});
	}

	/**
	* Callback invoked when the search input element receives focus.
	*
	* @private
	*/
	_onSearchFocus = () => {
		// Whenever the search input element receives focus, we want to disable keyboard shortcuts:
		this.setState({
			'shortcuts': false
		});
	}

	/**
	* Callback invoked when the search input element loses focus.
	*
	* @private
	*/
	_onSearchBlur = () => {
		// Whenever the search input element loses focus, we can enable keyboard shortcuts:
		this.setState({
			'shortcuts': true
		});
	}

	/**
	* Callback invoked when the side menu filter receives focus.
	*
	* @private
	*/
	_onFilterFocus = () => {
		// Whenever the side menu filter receives focus, we want to disable keyboard shortcuts:
		this.setState({
			'shortcuts': false
		});
	}

	/**
	* Callback invoked when the side menu filter loses focus.
	*
	* @private
	*/
	_onFilterBlur = () => {
		// Whenever the side menu filter loses focus, we can enable keyboard shortcuts:
		this.setState({
			'shortcuts': true
		});
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
			if ( pathname !== self.props.history.location.pathname ) {
				self.props.history.push( pathname );
			}
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
			'query': this.state.query,
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
			props.version = match.params.version;
		} else if ( path === routes.SEARCH ) {
			props.home = true;
			props.version = match.params.version;
			props.pkg = match.params.pkg; // e.g., `math/base/special/sin`
		} else {
			// We are currently rendering a package view...
			props.version = match.params.version;
			props.pkg = match.params.pkg; // e.g., `math/base/special/sin`
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
				onSearchChange={ this._onSearchChange }
				onSearchSubmit={ this._onSearchSubmit }
				onSearchFocus={ this._onSearchFocus }
				onSearchBlur={ this._onSearchBlur }
				onFilterFocus={ this._onFilterFocus }
				onFilterBlur={ this._onFilterBlur }
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
	* @param {Object} match.params - URL parameters
	* @param {string} match.params.pkg - package name (e.g., `math/base/special/sin`)
	* @param {string} match.params.version - documentation version
	* @returns {ReactElement} React element
	*/
	_renderReadme( match ) {
		var version;
		var next;
		var prev;
		var list;
		var pkg;
		var ord;
		var idx;

		version = match.params.version;
		pkg = match.params.pkg;

		// Resolve the package order for the current documentation version:
		ord = packageOrder( version );
		if ( ord ) {
			// Resolve the list of packages for the current documentation version:
			list = packageList( version );

			// Resolve the index of the current package:
			idx = ord[ pkg ];

			// Resolve the previous package:
			prev = list[ idx-1 ] || null;

			// Resolve the next package:
			next = list[ idx+1 ] || null;
		}
		return (
			<Readme
				pkg={ pkg }
				version={ version }
				prev={ prev }
				next={ next }
				url={ match.url }
				onClick={ this._onReadmeClick }
				onPackageChange={ this._onPackageChange }
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
	* @param {string} match.params.pkg - package name (e.g., `math/base/special/sin`)
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
	* @param {string} match.params.pkg - package name (e.g., `math/base/special/sin`)
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
	* Renders search results.
	*
	* @private
	* @param {Object} match - match object
	* @param {string} match.url - resource URL
	* @param {Object} match.params - URL parameters
	* @param {string} match.params.version - documentation version
	* @returns {ReactElement} React element
	*/
	_renderSearch( match ) {
		var query = this.props.location.search || '';
		if ( query ) {
			query = qs.parse( query, {
				'ignoreQueryPrefix': true
			});
			query = query.q || '';
		}
		return (
			<Search
				version={ match.params.version }
				query={ query }
				onPackageChange={ this._onPackageChange }
				onClose={ this._onSearchClose }
			/>
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
				<Fragment>
					<div class="skip-links" tabIndex="-1" ref={ self._focusRef } role="navigation" aria-label="Skip links">
						<a class="skip-link" href="#main">Skip to main content</a>
						<a class="skip-link" href="#top-nav-search">Skip to search</a>
						<a class="skip-link" href="#top-nav-package-menu">Skip to top navigation</a>
						<a class="skip-link" href="#side-menu-list">Skip to package tree</a>
						<a class="skip-link" href="#bottom-nav">Skip to bottom navigation</a>
					</div>
					<main
						id="main"
						class={ 'main '+( self.state.sideMenu ? 'translate-right' : '' ) }
						aria-live="polite"
						aria-atomic="true"
					>
						{ self[ method ]( props.match ) }
					</main>
				</Fragment>
			);
		}
	}

	/**
	* Callback invoked immediately after mounting a component (i.e., is inserted into a tree).
	*
	* @private
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
	* Callback invoked immediately after updating a component.
	*
	* @private
	* @param {Object} prevProps - previous properties
	* @param {Object} prevState - previous state
	*/
	componentDidUpdate( prevProps ) {
		// Whenever we navigate to a new page, reset the window scroll position and focus...
		if ( this.props.location !== prevProps.location ) {
			resetScroll();
			this._focusRef.current.focus();
		}
	}

	/**
	* Renders the component.
	*
	* @private
	* @returns {ReactElement} React element
	*/
	render() {
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
					<Route
						exact
						path={ routes.SEARCH }
						render={ this._renderer( 'search' ) }
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
