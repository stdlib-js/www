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
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import qs from 'qs';
import substringBeforeLast from '@stdlib/string/substring-before-last';
import Welcome from './components/welcome/index.jsx';
import Footer from './components/footer/index.jsx';
import Readme from './components/readme/index.jsx';
import TopNav from './components/top-nav/index.jsx';
import Search from './components/search/index.jsx';
import Head from './components/head/new_page.jsx';
import Help from './components/help/index.jsx';
import TestRunner from './components/runner/test.jsx';
import BenchmarkRunner from './components/runner/benchmark.jsx';
import Chat from './components/chat/index.jsx';
import log from './utils/log.js';
import fetchSearchData from './utils/fetch_search_data.js';
import resetScroll from './utils/reset_scroll.js';
import viewportWidth from './utils/viewport_width.js';
import pkgBasename from './utils/pkg_basename.js';
import pkgKind from './utils/pkg_kind.js';
import OFFSETS from './utils/package_resource_offsets.js';
import config from './config.js';
import routes from './routes.js';


// VARIABLES //

var RE_INTERNAL_URL = new RegExp( '^'+config.mount );
var RE_SEARCH_URL = /\/search\/?/;
var RE_FORWARD_SLASH = /\//g;
var RE_PLOT_PKG = /\/plot/;

var RENDER_METHOD_NAMES = {
	'welcome': '_renderWelcome',
	'search': '_renderSearch',
	'readme': '_renderReadme',
	'benchmark': '_renderBenchmark',
	'test': '_renderTest',
	'help': '_renderHelp',
	'error': '_renderError'
};
var SIDE_MENU_TIMEOUT = 1000; // milliseconds


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
		'path': routes.ERROR,
		'exact': true
	});
	if ( match ) {
		return match;
	}
	match = matchPath( pathname, {
		'path': routes.SEARCH,
		'exact': true
	});
	if ( match ) {
		return match;
	}
	match = matchPath( pathname, {
		'path': routes.HELP,
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

/**
* Generates a document title for a provided package name.
*
* @private
* @param {string} pkg - package name
* @returns {string} document title
*/
function pkg2title( pkg ) {
	var t = pkgKind( pkg, '.' ); // try determining the "kind" first, as top-level namespaces don't have a "kind", and we want to avoid an empty slot (e.g., 'array | | stdlib')
	if ( t ) {
		t = pkgBasename( pkg ) + ' | ' + t;
	} else {
		t = pkgBasename( pkg );
	}
	return t;
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
	* @param {boolean} props.isClient - boolean indicating whether the application is being rendered on the server or the client
	* @param {Object} props.history - history object for navigation
	* @param {string} props.version - documentation version
	* @param {string} props.data - package data
	* @param {ObjectArray} props.data.tree - package tree array
	* @param {NonNegativeIntegerArray} props.data.resources - package resources
	* @param {StringArray} props.data.packages - list of packages
	* @param {Object} props.data.order - package order hash
	* @param {StringArray} props.data.namespaces - list of namespace packages
	* @param {StringArray} props.data.descriptions - list of package descriptions
	* @param {string} props.query - initial search query
	* @param {string} props.readme - initial README content
	* @param {Callback} props.onVersionChange - callback to invoke upon changing the documentation version
	* @param {Callback} props.onPackageChange - callback to invoke upon changing the current package
	* @returns {ReactComponent} React component
	*/
	constructor( props ) {
		// Register component properties:
		super( props );

		// Set the initial component state:
		this.state = {
			// Search query:
			'query': props.query || '',

			// Boolean indicating whether to show the side menu:
			'sideMenu': false,

			// Boolean indicating whether keyboard shortcuts are active:
			'shortcuts': true,

			// Boolean indicating whether a notification is currently displayed:
			'notification': props.location.search.indexOf( 'notification' ) >= 0,

			// Current theme:
			'theme': 'light'
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
	* Callback invoked upon changing the theme.
	*
	* @private
	* @param {Object} event - event
	* @param {string} value - theme
	*/
	_onThemeChange = ( event, value ) => {
		if ( value !== 'light' && value !== 'dark' ) {
			return;
		}
		document.documentElement.setAttribute( 'data-theme', value );
		this.setState({
			'theme': value
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
		version = this.props.version;

		// If we do not currently have a search index, try to eagerly create one...
		fetchSearchData( this.props.version, done );

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
			if ( version !== self.props.version ) {
				// Try eagerly creating another search index based on the current version:
				fetchSearchData( self.props.version, done );
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
		path = config.mount + this.props.version + '/search?q=' + encodeURIComponent( this.state.query );

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
	* Closes a notification.
	*
	* @private
	*/
	_closeNotification = () => {
		this.setState({
			'notification': false
		});
	}

	/**
	* Callback invoked upon closing help page.
	*
	* @private
	*/
	_onHelpClose = () => {
		// Manually update the history to trigger navigation to a previous page:
		this.props.history.goBack();
	}

	/**
	* Renders a notification message if present in query string.
	*
	* @private
	* @returns {ReactElement} React element
	*/
	_renderNotification = () => {
		var query;
		var msg;
		if ( this.state.notification ) {
			query = qs.parse( this.props.location.search || '', {
				'ignoreQueryPrefix': true
			});
			msg = query.notification;
		}
		return (
			<Snackbar
				open={this.state.notification} autoHideDuration={6000}
				onClose={this._closeNotification}
				anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
			>
				<Alert onClose={this._closeNotification} variant="filled" severity="success" sx={{ width: '100%' }} >
					{msg}
				</Alert>
			</Snackbar>
		);
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
		var order;
		var path;
		var ptr;

		// Parse the current URL path:
		match = matchCurrentPath( this.props.history.location.pathname, this.props.version );
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
			'npm': false,
			'tests': false,
			'typescript': false
		};
		// Update property values based on the current "view"...
		if ( path === routes.VERSION_DEFAULT || path === routes.HELP ) {
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
			props.npm = ( RE_PLOT_PKG.test( props.pkg ) === false );

			// Attempt to resolve package resources for the current package...
			order = this.props.data.order;
			if ( order ) {
				ptr = order[ match.params.pkg ];
			}
			resources = this.props.data.resources;

			// If we were able to resolve package resources, determine which links we want to display in the top navigation...
			if ( this.props.isClient && resources && typeof ptr === 'number' ) {
				ptr *= 3; // Note: the resources array is a strided array
				props.typescript = Boolean( resources[ ptr+OFFSETS.typescript ] );
				if ( path === routes.PACKAGE_DEFAULT ) {
					props.benchmarks = Boolean( resources[ ptr+OFFSETS.benchmark ] );
					props.tests = Boolean( resources[ ptr+OFFSETS.test ] );
				} else if ( path === routes.PACKAGE_BENCHMARKS ) {
					props.docs = true;
					props.tests = Boolean( resources[ ptr+OFFSETS.test ] );
				} else if ( path === routes.PACKAGE_TESTS ) {
					props.docs = true;
					props.benchmarks = Boolean( resources[ ptr+OFFSETS.benchmark ] );
				}
			}
		}
		return (
			<TopNav
				onSideMenuToggle={ this._onSideMenuToggle }
				onVersionChange={ this.props.onVersionChange }
				onSearchChange={ this._onSearchChange }
				onSearchSubmit={ this._onSearchSubmit }
				onSearchFocus={ this._onSearchFocus }
				onSearchBlur={ this._onSearchBlur }
				onThemeChange={ this._onThemeChange }
				onFilterFocus={ this._onFilterFocus }
				onFilterBlur={ this._onFilterBlur }
				sideMenu={ this.state.sideMenu }
				theme={ this.state.theme }
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
		var desc;
		var pkg;
		var ord;
		var idx;
		var t;

		version = match.params.version;
		pkg = match.params.pkg;

		// Resolve the package order for the current documentation version:
		ord = this.props.data.order;
		if ( ord ) {
			// Resolve the list of packages for the current documentation version:
			list = this.props.data.packages;

			// Resolve the index of the current package:
			idx = ord[ pkg ];

			// Resolve the previous package:
			prev = list[ idx-1 ] || null;

			// Resolve the next package:
			next = list[ idx+1 ] || null;

			// Resolve the list of package descriptions for the current documentation version:
			desc = this.props.data.descriptions;

			// Resolve the description of the current package:
			desc = desc[ idx ];
		} else {
			prev = null;
			next = null;
		}
		t = pkg2title( pkg );
		return (
			<Fragment>
				<Head
					title={ t }
					description={ desc || config.description }
					url={ match.url }
				/>
				<Readme
					pkg={ pkg }
					version={ version }
					prev={ prev }
					next={ next }
					url={ match.url }
					content={ this.props.readme }
					onClick={ this._onReadmeClick }
				/>
			</Fragment>
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
		var version;
		var table;
		var order;
		var desc;
		var ptr;
		var pkg;
		var flg;
		var url;
		var t;

		pkg = match.params.pkg;

		order = this.props.data.order;
		if ( order ) {
			ptr = order[ pkg ];

			// Resolve the list of package descriptions for the current documentation version:
			desc = this.props.data.descriptions;

			// Resolve the description of the current package:
			desc = desc[ ptr ];
		}
		table = this.props.data.resources;
		if ( table && typeof ptr === 'number' ) {
			ptr *= 3; // Note: resources is a strided array
			flg = table[ ptr+OFFSETS.benchmark ];
		}
		url = substringBeforeLast( match.url, '/' );
		t = pkg2title( pkg );
		if ( flg ) {
			// FIXME: we are hardcoding `develop`, but the we should use `match.params.version`, and, if `latest`, we should map to the first version in `config.versions`...
			version = 'develop';
			return (
				<Fragment>
					<Head
						title={ t }
						description={ desc || config.description }
						url={ url }
					/>
					<BenchmarkRunner
						title="Benchmarks"
						url={ url + '/benchmark_bundle.js' }
						pkg={ pkg }
						version={ version }
					/>
				</Fragment>
			);
		}
		return null;
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
		var version;
		var table;
		var order;
		var desc;
		var ptr;
		var flg;
		var url;
		var t;

		order = this.props.data.order;
		if ( order ) {
			ptr = order[ match.params.pkg ];

			// Resolve the list of package descriptions for the current documentation version:
			desc = this.props.data.descriptions;

			// Resolve the description of the current package:
			desc = desc[ ptr ];
		}
		table = this.props.data.resources;
		if ( table && typeof ptr === 'number' ) {
			ptr *= 3; // Note: resources is a strided array
			flg = table[ ptr+OFFSETS.test ];
		}
		url = substringBeforeLast( match.url, '/' );
		if ( flg ) {
			// FIXME: we are hardcoding `develop`, but the we should use `match.params.version`, and, if `latest`, we should map to the first version in `config.versions`...
			version = 'develop';
			t = pkg2title( match.params.pkg );
			return (
				<Fragment>
					<Head
						title={ t }
						description={ desc || config.description }
						url={ url }
					/>
					<TestRunner
						title="Tests"
						url={ url + '/test_bundle.js' }
						pkg={ match.params.pkg }
						version={ version }
						standalone={ match.params.pkg.replace( RE_FORWARD_SLASH, '-' ) }
					/>
				</Fragment>
			);
		}
		return null;
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
			<Fragment>
				<Head
					title={ config.title }
					description={ config.description }
					url={ match.url }
				/>
				<Welcome version={ match.params.version } />
			</Fragment>
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
			<Fragment>
				<Head
					title='Search'
					description={ config.description }
					url={ match.url }
				/>
				<Search
					version={ match.params.version }
					query={ query }
					onClose={ this._onSearchClose }
				/>
			</Fragment>
		);
	}

	/**
	* Renders a help page.
	*
	* @private
	* @param {Object} match - match object
	* @param {string} match.url - resource URL
	* @returns {ReactElement} React element
	*/
	_renderHelp( match ) {
		return (
			<Fragment>
				<Head
					title='Help'
					description={ config.description }
					url={ match.url }
				/>
				<Help
					onClose={ this._onHelpClose }
				/>
			</Fragment>
		);
	}

	/**
	* Renders an error page.
	*
	* @private
	* @param {Object} match - match object
	* @param {string} match.url - resource URL
	* @returns {ReactElement} React element
	*/
	_renderError( match ) {
		return (
			<Fragment>
				<Head
					title='Error'
					description={ config.description }
					url={ match.url }
				/>
				<p>Hello World!</p>
			</Fragment>
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
					<div class="skip-links" tabIndex="-1" ref={ self._focusRef } role="navigation" aria-label="Skip links post nav">
						<a class="skip-link" href="#main">Skip to main content</a>
						<a class="skip-link" href="#top-nav-search">Skip to search</a>
						<a class="skip-link" href="#top-nav-package-menu">Skip to top navigation</a>
						<a class="skip-link" href="#side-menu-list">Skip to package tree</a>
						<a class="skip-link" href="#bottom-nav">Skip to bottom navigation</a>
					</div>
					<main
						id="main"
						class={ 'main '+( ( self.state.sideMenu ) ? 'translate-right' : '' ) }
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
		var self;
		var bool;
		var w;

		self = this;

		// TODO: if the version is not the latest supported version, display a message indicating that this version of the docs is "out-of-date"

		// Query the current viewport width:
		w = viewportWidth();

		// Default to showing the side menu, except on smaller devices:
		bool = Boolean( w && ( w >= 1080 ) );

		// Delay showing the side menu in order to avoid a flash:
		setTimeout( onTimeout, SIDE_MENU_TIMEOUT );

		/**
		* Callback invoked after a specified duration.
		*
		* @private
		*/
		function onTimeout() {
			self.setState({
				'sideMenu': bool
			});
		}
	}

	/**
	* Callback invoked immediately after updating a component.
	*
	* @private
	* @param {Object} prevProps - previous properties
	* @param {Object} prevState - previous state
	*/
	componentDidUpdate( prevProps, prevState ) {
		// TODO: if the version is not the latest supported version, display a message indicating that this version of the docs is "out-of-date"

		// Whenever we navigate to a new page, reset the window scroll position and focus...
		if ( this.props.location !== prevProps.location ) {
			resetScroll();
			this._focusRef.current.focus();

			if (
				this.props.location.search !== prevProps.location.search &&
				!prevState.notification
			) {
				this.setState({
					'notification': this.props.location.search.indexOf( 'notification' ) >= 0
				});
			}
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
				{ this._renderNotification() }
				<Switch>
					<Redirect
						exact
						from={ routes.PACKAGE_INDEX }
						to={ routes.PACKAGE_DEFAULT }
					/>
					<Route
						exact
						path={ routes.ERROR }
						render={ this._renderer( 'error' ) }
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
					<Route
						exact
						path={ routes.HELP }
						render={ this._renderer( 'help' ) }
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
					<Redirect to={ config.mount+this.props.version } />
				</Switch>
				<Footer
					version={ this.props.version }
				/>
				<Chat />
			</Fragment>
		);
	}
}


// EXPORTS //

export default withRouter( App );
