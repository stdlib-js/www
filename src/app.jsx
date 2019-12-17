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
import { Route, Switch, withRouter } from 'react-router-dom';
import LinearProgress from '@material-ui/core/LinearProgress';
import GetAppIcon from '@material-ui/icons/GetApp';
import CancelIcon from '@material-ui/icons/Cancel';
import IconButton from '@material-ui/core/IconButton';
import IframeResizer from './iframe_resizer.jsx';
import SideMenu from './side_menu.jsx';
import Welcome from './welcome.jsx';
import Readme from './readme.jsx';
import FourZeroFour from './404.jsx';
import Footer from './footer.jsx';
import TopNav from './top_nav.jsx';
import log from './log.js';
import downloadAssets from './download_assets.js';
import HTML_FRAGMENT_CACHE from './html_fragment_cache.js';
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
		i = pathname.indexOf( prefix ) + prefix.length;
		j = pathname.substring( i ).indexOf( '/' );
		if ( j === -1 ) {
			version = '';
		} else {
			version = pathname.substring( i, i+j );
		}
		if ( !config.versions.includes( version ) ) {
			pathname = pathname.replace( prefix+version, prefix+config.versions[0]+'/' );
			this.props.history.push( pathname );
			version = config.versions[ 0 ];
		}
		this.state = {
			'downloadProgress': 0,
			'slideoutIsOpen': true,
			'version': version,
			'packageTree': null,
			'packageResources': {}
		};
	}

	_handleSlideOutChange = ( value ) => {
		this.setState({
			'slideoutIsOpen': value
		});
	}

	_fetchJSONFiles = () => {
		var tpath;
		var rpath;

		tpath = config.mount+this.state.version+'/package_tree.json';
		if ( JSON_CACHE[ tpath ] ) {
			this.setState({
				'packageTree': JSON_CACHE[ tpath ]
			});
		} else {
			fetch( tpath )
				.then( res => res.json() )
				.then( res => {
					JSON_CACHE[ tpath ] = res;
					this.setState({
						'packageTree': res
					});
				})
				.catch( log );
		}
		rpath = config.mount+this.state.version+'/package_resources.json';
		if ( JSON_CACHE[ rpath ] ) {
			this.setState({
				'packageResources': JSON_CACHE[ rpath ]
			});
		} else {
			fetch( rpath )
				.then( res => res.json() )
				.then( res => {
					JSON_CACHE[ rpath ] = res;
					this.setState({
						'packageResources': res
					});
				})
				.catch( log );
		}
	}

	_fetchFragment = ( path ) => {
		window.scrollTo( 0, 0 );
		this.props.history.push( path );
		if ( HTML_FRAGMENT_CACHE[ path ] ) {
			this._replaceReadmeContainer( HTML_FRAGMENT_CACHE[ path ] );
		} else {
			fetch( path+'?fragment=true' )
				.then( res => res.text() )
				.then( res => {
					HTML_FRAGMENT_CACHE[ path ] = res;
					this._replaceReadmeContainer( res );
				})
				.catch( log )
		}
	}

	_downloadAssets = () => {
		var self = this;
		downloadAssets( Object.keys( this.state.packageResources ), this.state.version, onDownload );

		function onDownload( progress ) {
			self.setState({
				downloadProgress: progress
			});
		}
	}

	_selectVersion = ( event ) => {
		var pathname = this.props.history.location.pathname;
		var version = event.target.value;

		pathname = pathname.replace( this.state.version, version );
		this.props.history.push( pathname );

		this.setState({
			'version': version
		}, this._fetchJSONFiles );
	}

	_replaceReadmeContainer( res ) {
		var el = document.getElementById( 'readme' );
		if ( el ) {
			el.innerHTML = res;
		}
	}

	_renderReadme = ( match ) => {
		return (
			<Readme path={ match.url } />
		);
	}

	_renderBenchmark = ( match ) => {
		var resources;
		var iframe;

		resources = this.state.packageResources[ match.params.pkg ];
		if ( resources.benchmark ) {
			iframe = <IframeResizer
				className="embedded-iframe"
				url={ match.url }
				title="Benchmarks"
				width="100%"
			/>;
		} else {
			iframe = <FourZeroFour />;
		}
		return iframe;
	}

	_renderTest = ( match ) => {
		var resources;
		var iframe;

		resources = this.state.packageResources[ match.params.pkg ];
		if ( resources.test ) {
			iframe = <IframeResizer
				className="embedded-iframe"
				url={ match.url }
				title="Tests"
				width="100%"
			/>;
		} else {
			iframe = <FourZeroFour />
		}
		return iframe;
	}

	_renderWelcome = () => {
		return (
			<Welcome version={this.state.version} />
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
			<TopNav
				pkg={ props.pkg }
				version={ props.version }
				benchmarks={ props.benchmarks }
				docs={ props.docs }
				home={ props.home }
				src={ props.src }
				tests={ props.tests }
				typescript={ props.typescript }
			/>
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
						<div className={ 'main-content '+( self.state.slideoutIsOpen ? 'side-menu-adjacent' : '' ) }>
							{ self[ method ]( props.match ) }
						</div>
					</div>
				</Fragment>
			);
		}
	}

	componentDidMount() {
		this._fetchJSONFiles();
	}

	render() {
		// TODO: toggle class to apply CSS transform
		return (
			<Fragment>
				{ this.state.downloadProgress ? <LinearProgress
					id="download-progress"
					variant="determinate"
					value={ this.state.downloadProgress }
				/> : null }
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
				<SideMenu
					onDrawerChange={ this._handleSlideOutChange }
					onReadmeChange={ this._fetchFragment }
					onVersionChange={ this._selectVersion }
					open={ this.state.slideoutIsOpen }
					version={ this.state.version }
					packageTree={ this.state.packageTree }
				/>
				<Switch>
					<Route
						exact
						path={ config.mount+':version/@stdlib/:pkg*/benchmark.html' }
						render={ this._renderer( 'benchmark' ) }
					/>
					<Route
						exact
						path={ config.mount+':version/@stdlib/:pkg*/test.html' }
						render={ this._renderer( 'test' ) }
					/>
					<Route
						exact
						path={ config.mount+':version/@stdlib/:pkg*/index.html' }
						render={ this._renderer( 'readme' ) }
					/>
					<Route
						exact
						path={ config.mount+':version/@stdlib/:pkg*' }
						render={ this._renderer( 'readme' ) }
					/>
					<Route
						exact
						path={ config.mount+':version' }
						render={ this._renderer( 'welcome' ) }
					/>
				</Switch>
				<Footer />
			</Fragment>
		);
	}
}


// EXPORTS //

export default withRouter( App );
