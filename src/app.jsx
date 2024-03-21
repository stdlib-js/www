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
import substringBeforeLast from '@stdlib/string/substring-before-last';
import log from 'log';
import fetchSearchData from 'fetch-search-data';
import resetScroll from 'reset-scroll';
import viewportWidth from 'viewport-width';
import pkg2title from 'pkg2title';
import randomInt from 'random-integer';
import OFFSETS from 'pkg-resource-offsets';
import config from 'config';
import Welcome from './components/welcome/index.jsx';
import Footer from './components/footer/index.jsx';
import Readme from './components/readme/index.jsx';
import TopNav from './components/top-nav/index.jsx';
import Search from './components/search/index.jsx';
import Head from './components/head/new_page.jsx';
import Help from './components/help/index.jsx';
import ErrorDecoder from './components/error-decoder/index.jsx';
import TestRunner from './components/runner/test.jsx';
import BenchmarkRunner from './components/runner/benchmark.jsx';
import routes from './routes.js';


// VARIABLES //

var RE_INTERNAL_URL = new RegExp( '^'+config.mount );
var RE_SEARCH_OR_HELP_URL = /(\/search|\/help)\/?/;
var RE_FORWARD_SLASH = /\//g;
var RE_PLOT_PKG = /\/plot/;

var SIDE_MENU_TIMEOUT = 1000; // milliseconds

var ROUTE_LIST = [
	// Note: order matters...
	routes.SEARCH,
	routes.HELP,
	routes.ERROR_DECODER,
	routes.ERROR_DECODER_DEFAULT,
	routes.PACKAGE_BENCHMARKS,
	routes.PACKAGE_TESTS,
	routes.PACKAGE_DEFAULT,
	routes.VERSION_DEFAULT
];

var RENDER_METHOD_NAMES = {
	'welcome': '_renderWelcome',
	'search': '_renderSearch',
	'readme': '_renderReadme',
	'benchmark': '_renderBenchmark',
	'test': '_renderTest',
	'help': '_renderHelp',
	'error': '_renderErrorDecoder'
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
	var i;

	// Try to find the matching route...
	for ( i = 0; i < ROUTE_LIST.length; i++ ) {
		match = matchPath( pathname, {
			'path': ROUTE_LIST[ i ],
			'exact': true
		});
		if ( match ) {
			return match;
		}
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
	* @param {boolean} props.allowSettingsCookies - boolean indicating whether to allow the use of cookies for storing settings
	* @param {string} props.theme - documentation theme
	* @param {string} props.mode - documentation "mode"
	* @param {string} props.exampleSyntax - example code syntax
	* @param {string} props.prevNextNavigation - previous/next package navigation mode
	* @param {string} props.query - initial search query
	* @param {(string|Object)} props.content - initial content
	* @param {Callback} props.onVersionChange - callback to invoke upon changing the documentation version
	* @param {Callback} props.onAllowSettingsCookiesChange - callback to invoke upon changing the setting indicating whether to allow cookies for storing settings
	* @param {Callback} props.onThemeChange - callback to invoke upon changing the documentation theme
	* @param {Callback} props.onModeChange - callback to invoke upon changing the documentation "mode"
	* @param {Callback} props.onExampleSyntaxChange - callback to invoke upon changing the example code syntax
	* @param {Callback} props.onPrevNextNavChange - callback to invoke upon changing the previous/next package navigation mode
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

			// Boolean indicating whether a notification is currently displayed:
			'notification': props.location.search.indexOf( 'notification' ) >= 0
		};

		// Previous (non-search/help) location (e.g., used for navigating to previous page after closing search results):
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
		// If we are coming from a non-search/help page, cache the current location...
		path = this.props.location.pathname;
		if ( RE_SEARCH_OR_HELP_URL.test( path ) === false ) {
			this._prevLocation = path;
		}
		// Resolve a search URL based on the search query:
		path = config.mount + this.props.version + '/search?q=' + encodeURIComponent( this.state.query );

		// Manually update the history to trigger navigation to the search page:
		this.props.history.push( path );
	}

	/**
	* Callback invoked upon submitting a search query.
	*
	* @private
	* @returns {void}
	*/
	_onHelpOpen = () => {
		var path = config.mount + this.props.version + '/help';

		// Manually update the history to trigger navigation to the help page:
		this.props.history.push( path );
	}

	/**
	* Callback invoked upon closing search results.
	*
	* @private
	*/
	_onSearchClose = () => {
		// Manually update the history to trigger navigation to a previous (non-search/help) page:
		this.props.history.push( this._prevLocation );

		// Update the component state:
		this.setState({
			'query': '' // reset the search input element
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
	* Callback invoked upon closing the error decoder.
	*
	* @private
	*/
	_onErrorDecoderClose = () => {
		// Manually update the history to trigger navigation to the home page:
		this.props.history.push( this._prevLocation );
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
		if (
			path === routes.VERSION_DEFAULT ||
			path === routes.HELP ||
			path === routes.ERROR_DECODER ||
			path === routes.ERROR_DECODER_DEFAULT
		) {
			props.home = true;
			props.version = match.params.version;
		} else if ( path === routes.SEARCH ) {
			props.home = true;
			props.version = match.params.version;
			props.pkg = match.params.pkg || ''; // e.g., `math/base/special/sin`
		} else {
			// We are currently rendering a package view...
			props.version = match.params.version;
			props.pkg = match.params.pkg || ''; // e.g., `math/base/special/sin`
			props.src = true;
			props.npm = ( RE_PLOT_PKG.test( props.pkg ) === false );

			// Attempt to resolve package resources for the current package...
			order = this.props.data.order;
			if ( order ) {
				ptr = order[ match.params.pkg ];
			}
			resources = this.props.data.resources;

			// If we were able to resolve package resources, determine which links we want to display in the top navigation... (NOTE: the `isClient` check is to ensure that client side rendering matches SSR during first render)
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

				onSearchChange={ this._onSearchChange }
				onSearchSubmit={ this._onSearchSubmit }
				onSearchFocus={ this.props.onSearchFocus }
				onSearchBlur={ this.props.onSearchBlur }

				onFilterFocus={ this.props.onFilterFocus }
				onFilterBlur={ this.props.onFilterBlur }

				onVersionChange={ this.props.onVersionChange }

				onHelpOpen={ this._onHelpOpen }

				onAllowSettingsCookiesChange={ this.props.onAllowSettingsCookiesChange }
				onThemeChange={ this.props.onThemeChange }
				onModeChange={ this.props.onModeChange }
				onExampleSyntaxChange={ this.props.onExampleSyntaxChange }
				onPrevNextNavChange={ this.props.onPrevNextNavChange }

				sideMenu={ this.state.sideMenu }
				shortcuts = { this.props.shortcuts }
				allowSettingsCookies={ this.props.allowSettingsCookies }
				theme={ this.props.theme }
				mode={ this.props.mode }
				exampleSyntax={ this.props.exampleSyntax }
				prevNextNavigation={ this.props.prevNextNavigation }

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
		var mode;
		var pkg;
		var ord;
		var idx;

		version = match.params.version;
		pkg = match.params.pkg;

		mode = this.props.prevNextNavigation;

		// Resolve the package order for the current documentation version:
		ord = this.props.data.order;
		if ( ord ) {
			// Resolve the list of packages for the current documentation version:
			list = this.props.data.packages;

			// Resolve the index of the current package:
			idx = ord[ pkg ];

			// Resolve the "previous" and "next" packages
			if ( mode === 'alphabetical' ) {
				prev = list[ idx-1 ] || null;
				next = list[ idx+1 ] || null;
			} else if ( mode === 'random' ) {
				prev = idx;
				while ( prev === idx ) {
					prev = randomInt( 0, list.length );
				}
				next = idx;
				while ( next === idx || next === prev ) {
					next = randomInt( 0, list.length );
				}
				prev = list[ prev ];
				next = list[ next ];
			}
			// Resolve the list of package descriptions for the current documentation version:
			desc = this.props.data.descriptions;

			// Resolve the description of the current package:
			desc = desc[ idx ];
		} else {
			prev = null;
			next = null;
		}
		return (
			<Fragment>
				<Head
					title={ pkg2title( pkg ) }
					description={ desc || config.description }
					url={ match.url }
				/>
				<Readme
					pkg={ pkg }
					version={ version }
					prev={ prev }
					next={ next }
					url={ match.url }
					shortcuts={ this.props.shortcuts }
					content={ this.props.content }
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
			// FIXME: we are hardcoding `develop`, but we should use `match.params.version`, and, if `latest`, we should map to the first version in `config.versions`...
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
			// FIXME: we are hardcoding `develop`, but we should use `match.params.version`, and, if `latest`, we should map to the first version in `config.versions`...
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
					shortcuts={ this.props.shortcuts }
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
					shortcuts={ this.props.shortcuts }
				/>
			</Fragment>
		);
	}

	/**
	* Renders an error decoder.
	*
	* @private
	* @param {Object} match - match object
	* @param {string} match.url - resource URL
	* @param {Object} match.params - URL parameters
	* @param {string} match.params.version - documentation version
	* @param {string} [match.params.code] - error code
	* @returns {ReactElement} React element
	*/
	_renderErrorDecoder( match ) {
		var query;
		var args;
		var pkg;
		var msg;

		query = this.props.location.search || '';
		if ( query ) {
			query = qs.parse( query, {
				'ignoreQueryPrefix': true
			});
			args = query.arg;
			if ( args === void 0 ) {
				args = [];
			} else if ( typeof args === 'string' ) {
				args = [ args ];
			}
		}
		if ( this.props.content ) {
			pkg = this.props.content.pkg;
			msg = this.props.content.msg;
		}
		return (
			<Fragment>
				<Head
					title='Error Decoder'
					description={ config.description }
					url={ match.url }
				/>
				<ErrorDecoder
					version={ match.params.version }
					code={ match.params.code || '' }
					args={ args || [] }
					pkg={ pkg || '' }
					content={ msg || '' }
					onClose={ this._onErrorDecoderClose }
				/>
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
					<div className="skip-links" tabIndex="-1" ref={ self._focusRef } role="navigation" aria-label="Skip links post nav">
						<a className="skip-link" href="#main">Skip to main content</a>
						<a className="skip-link" href="#top-nav-search">Skip to search</a>
						<a className="skip-link" href="#top-nav-package-menu">Skip to top navigation</a>
						<a className="skip-link" href="#side-menu-list">Skip to package tree</a>
						<a className="skip-link" href="#bottom-nav">Skip to bottom navigation</a>
					</div>
					<main
						id="main"
						className={ 'main '+( ( self.state.sideMenu ) ? 'translate-right' : '' ) }
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
			if ( this._focusRef.current ) {
				this._focusRef.current.focus();
			}
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
				<Switch>
					<Redirect
						exact
						from={ routes.PACKAGE_INDEX }
						to={ routes.PACKAGE_DEFAULT }
					/>
					<Route
						exact
						path={ routes.ERROR_DECODER }
						render={ this._renderer( 'error' ) }
					/>
					<Route
						exact
						path={ routes.ERROR_DECODER_DEFAULT }
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
			</Fragment>
		);
	}
}


// EXPORTS //

export default withRouter( App );
