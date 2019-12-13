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

import React, { Component, Fragment } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import IframeResizer from 'iframe-resizer-react';
import SideMenu from './side_menu.jsx';
import WelcomePage from './welcome_page.jsx';
import ReadmePage from './readme_page.jsx';
import Footer from './footer.jsx';
import generateHTMLBoilerplate from './generate_html_boilerplate.js';
import VERSIONS from './versions.json';
import HTML_FRAGMENT_CACHE from './html_fragment_cache.js';
import JSON_CACHE from './json_cache.js';


// VARIABLES //

var RE_UNDERSCORE_REPLACE = /[\/-]/g;
var PREFIX = '/docs/api/';


// FUNCTIONS //

/**
* Logs an error.
*
* @private
* @param {Error} error - error object
*/
function logError( error ) {
	console.error( error );
}


// MAIN //

class App extends Component {
	constructor( props ) {
		var pathname;
		var version;
		var i;
		var j;

		super( props );

		pathname = props.history.location.pathname;
		i = pathname.indexOf( PREFIX ) + PREFIX.length;
		j = pathname.substring( i ).indexOf( '/' );
		if ( j === -1 ) {
			version = '';
		} else {
			version = pathname.substring( i, i+j );
		}
		if ( !VERSIONS.includes( version ) ) {
			pathname = pathname.replace( PREFIX+version, PREFIX+VERSIONS[0]+'/' );
			this.props.history.push( pathname );
			version = VERSIONS[ 0 ];
		}
		this.state = {
			'slideoutIsOpen': true,
			'version': version,
			'packageTree': null,
			'packageResources': {}
		};
	}

	componentDidMount() {
		this.fetchJSONFiles();
	}

	handleSlideOutChange = ( value ) => {
		this.setState({
			'slideoutIsOpen': value
		});
	}

	replaceReadmeContainer( res ) {
		var el = document.getElementById( 'readme-container' );
		if ( el ) {
			el.innerHTML = res;
		}
	}

	renderReadme = ({ match }) => {
		var benchmarks;
		var resources;
		var tests;
		var path;
		var ts;

		path = `/docs/api/${match.params.version}/@stdlib/${match.params.pkg}`;
		resources = this.state.packageResources[ match.params.pkg ];
		if ( resources ) {
			tests = resources.test;
			benchmarks = resources.benchmark;
			ts = resources.typescript;
		}
		return (
			<Fragment>
				<nav className="navbar">
					{ benchmarks ? <Link to={`${path}/benchmark.html`}>Benchmarks</Link> : null}
					{ tests ? <Link to={`${path}/test.html`}>Tests</Link> : null}
					{ resources ? <a href={`https://github.com/stdlib-js/stdlib/tree/${match.params.version}/lib/node_modules/@stdlib/${match.params.pkg}`}>Source</a> : null}
					{ ts ? <a href={`/docs/ts/modules/_${match.params.pkg.replace( RE_UNDERSCORE_REPLACE, '_' )}_docs_types_index_d_.html`}>TypeScript</a> : null}
				</nav>
				<ReadmePage path={match.url} />
			</Fragment>
		);
	}

	fetchJSONFiles = () => {
		var tpath;
		var rpath;

		tpath = `/docs/api/${this.state.version}/package_tree.json`;
		if ( !JSON_CACHE[ tpath ] ) {
			fetch( tpath )
				.then( res => res.json() )
				.then( res => {
					JSON_CACHE[ tpath ] = res;
					this.setState({
						'packageTree': res
					});
				})
				.catch( logError );
		} else {
			this.setState({
				'packageTree': JSON_CACHE[ tpath ]
			});
		}
		rpath = `/docs/api/${this.state.version}/package_resources.json`;
		if ( !JSON_CACHE[ rpath ] ) {
			fetch( rpath )
				.then( res => res.json() )
				.then( res => {
					JSON_CACHE[ rpath ] = res;
					this.setState({
						'packageResources': res
					});
				})
				.catch( logError );
		} else {
			this.setState({
				'packageResources': JSON_CACHE[ rpath ]
			});
		}
	}

	fetchAndCacheFragment = ( path ) => {
		this.props.history.push( path );
		window.scrollTo( 0, 0 );
		if ( !HTML_FRAGMENT_CACHE[ path ] ) {
			fetch( `${path}?fragment=true` )
				.then( res => res.text() )
				.then( res => {
					HTML_FRAGMENT_CACHE[ path ] = res;
					this.replaceReadmeContainer( res );
				})
				.catch( logError )
		} else {
			this.replaceReadmeContainer( HTML_FRAGMENT_CACHE[ path ] );
		}
	}

	selectVersion = ( event ) => {
		var pathname = this.props.history.location.pathname;
		pathname = pathname.replace( this.state.version, event.target.value );
		this.props.history.push( pathname );
		this.setState({
			'version': event.target.value
		}, this.fetchJSONFiles );
	}

	render() {
		return (
			<div className="app">
				<SideMenu
					onDrawerChange={this.handleSlideOutChange}
					onReadmeChange={this.fetchAndCacheFragment}
					open={this.state.slideoutIsOpen}
					version={this.state.version}
					onVersionChange={this.selectVersion}
					packageTree={this.state.packageTree}
				/>
				<div className="readme-outer-container" style={{
					marginLeft: this.state.slideoutIsOpen ? 350 : 0
				}}>
					<Switch>
						<Route
							exact
							path="/docs/api/:version/@stdlib/:pkg*/benchmark.html"
							render={({ match }) => {
								var benchmarks;
								var resources;
								var iframe;
								var tests;
								var path;
								var html;
								var ts;

								path = `/docs/api/${match.params.version}/@stdlib/${match.params.pkg}`;
								resources = this.state.packageResources[ match.params.pkg ];
								if ( resources ) {
									tests = resources.test;
									benchmarks = resources.benchmark;
									ts = resources.typescript;
								}
								if ( benchmarks ) {
									html = generateHTMLBoilerplate( `/docs/api/${match.params.version}/@stdlib/${match.params.pkg}/benchmark.html` )
									iframe = <IframeResizer
										className="readme-iframe"
										srcdoc={html}
										title="Benchmarks"
										width="100%"
										checkOrigin={false}
									/>;
								} else {
									iframe = <h2><code>{match.params.pkg}</code> does not have any benchmarks.</h2>;
								}
								return (
									<Fragment>
										<nav className="navbar">
											<Link to={path} >Documentation</Link>
											{ benchmarks ? <Link to={`${path}/benchmark.html`}>Benchmarks</Link> : null}
											{ tests ? <Link to={`${path}/test.html`}>Tests</Link> : null}
											{ resources ? <a href={`https://github.com/stdlib-js/stdlib/tree/${match.params.version}/lib/node_modules/@stdlib/${match.params.pkg}`}>Source</a> : null}
											{ ts ? <a href={`/docs/ts/modules/_${match.params.pkg.replace( RE_UNDERSCORE_REPLACE, '_' )}_docs_types_index_d_.html`}>TypeScript</a> : null}
										</nav>
										{iframe}
									</Fragment>
								);
							}}
						/>
						<Route
							exact
							path="/docs/api/:version/@stdlib/:pkg*/test.html"
							render={({ match }) => {
								var benchmarks;
								var resources;
								var iframe;
								var tests;
								var path;
								var html;
								var ts;

								path = `/docs/api/${match.params.version}/@stdlib/${match.params.pkg}`;
								resources = this.state.packageResources[ match.params.pkg ];
								if ( resources ) {
									tests = resources.test;
									benchmarks = resources.benchmark;
									ts = resources.typescript;
								}
								if ( tests ) {
									const html = generateHTMLBoilerplate( `/docs/api/${match.params.version}/@stdlib/${match.params.pkg}/test.html` );
									iframe = <IframeResizer
										className="readme-iframe"
										srcdoc={html}
										title="Tests"
										width="100%"
										checkOrigin={false}
									/>;
								} else {
									iframe = <h2><code>{match.params.pkg}</code> does not have any tests.</h2>;
								}
								return (
									<Fragment>
										<nav className="navbar">
											<Link to={path} >Documentation</Link>
											{ benchmarks ? <Link to={`${path}/benchmark.html`}>Benchmarks</Link> : null}
											{ tests ? <Link to={`${path}/test.html`}>Tests</Link> : null}
											{ resources ? <a href={`https://github.com/stdlib-js/stdlib/tree/${match.params.version}/lib/node_modules/@stdlib/${match.params.pkg}`}>Source</a> : null}
											{ ts ? <a href={`/docs/ts/modules/_${match.params.pkg.replace( RE_UNDERSCORE_REPLACE, '_' )}_docs_types_index_d_.html`}>TypeScript</a> : null}
										</nav>
										{iframe}
									</Fragment>
								);
							}}
						/>
						<Route
							exact
							path="/docs/api/:version//@stdlib/:pkg*/index.html"
							render={this.renderReadme}
						/>
						<Route
							exact
							path="/docs/api/:version/@stdlib/:pkg*"
							render={this.renderReadme}
						/>
						<Route exact path="/docs/api/:version?" >
							<WelcomePage version={this.state.version} />
						</Route>
					</Switch>
					{ this.state.slideoutIsOpen ? <Footer /> : null }
				</div>
				{ !this.state.slideoutIsOpen ? <Footer fullPage /> : null }
			</div>
		)
	}
}


// EXPORTS //

export default withRouter( App );
