/**
* @license Apache-2.0
*
* Copyright (c) 2021 The Stdlib Authors.
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
import PropTypes from 'prop-types';
import log from 'log';
import config from 'config';
import LogoIcon from './../icons/logo.jsx';


// VARIABLES //

var WORKER_SCRIPT = '/js/docs/worker.js';
var CODECOV_URL_PRE = 'https://codecov.io/github/stdlib-js/';
var CODECOV_QS = '?branch=main';
var GITHUB_PRE = 'https://github.com/stdlib-js/';
var GITHUB_WORKFLOW = '/actions/workflows/test.yml';


// FUNCTIONS //

/**
* Returns a display file name for a provided test file.
*
* @private
* @param {string} file - file name
* @returns {string} display file name
*/
function filename( file ) {
	var idx = file.lastIndexOf( '/test/' ); // Note: we are assuming the convention `/foo/bar/test/*.js`, where test files are always located in a `/test/` folder
	return file.substring( idx+1 );
}


// MAIN //

/**
* Component for running a test script and displaying the results.
*
* @private
*/
class TestRunner extends React.Component {
	/**
	* Returns a component which runs a test script and displays the results.
	*
	* @private
	* @constructor
	* @param {Object} props - component properties
	* @param {string} props.url - resource URL
	* @param {string} props.title - page title
	* @param {string} props.version - documentation version
	* @param {string} props.standalone - standalone package name (e.g., `math-base-special-sin`)
	* @returns {ReactComponent} React component
	*/
	constructor( props ) {
		super( props );
		this.state = {
			'content': [],
			'update': 0
		};
		this._prevLine = '';

		this._worker = null;
	}

	/**
	* Processes a single TAP line.
	*
	* @private
	* @param {string} line - TAP line
	*/
	_processLine( line ) {
		var content;
		var match;
		var o;
		var r;

		// Check for an empty line...
		if ( line === '' ) {
			// We can ignore this line...
			return;
		}
		content = this.state.content;
		if ( content.length ) {
			o = content[ content.length-1 ];
			if ( o.results.length ) {
				r = o.results[ o.results.length-1 ];
			}
		}
		// Check for a passing test...
		if ( /^ok \d+ .+/.test( line ) ) {
			// Check whether we have begun processing tests for a new file...
			match = line.match( /^ok \d+ (\/lib\/node_modules\/.+)$/ ); // Note: this is based on the convention that, in a test file, we always print the test filename as an assertion within the first test block
			if ( match ) {
				// We need to create a new object for holding all test results belonging to the new test file...
				r = {
					'desc': this._prevLine.substring( 2 ),
					'pass': 0,
					'fail': 0,
					'failures': []
				};
				o = {
					'file': filename( match[ 1 ] ),
					'url': config.repository+'/tree/'+this.props.version+match[ 1 ],
					'results': [ r ]
				};
				content.push( o );
			}
			// Check if preceded by a test description...
			else if ( /^#/.test( this._prevLine ) ) {
				r = {
					'desc': this._prevLine.substring( 2 ),
					'pass': 0,
					'fail': 0,
					'failures': []
				};
				o.results.push( r );
			}
			r.pass += 1;
		}
		// Check for a failing test...
		else if ( /^not ok \d+ .+/.test( line ) ) {
			// Check if preceded by a test description...
			if ( /^#/.test( this._prevLine ) ) {
				r = {
					'desc': this._prevLine.substring( 2 ),
					'pass': 0,
					'fail': 0,
					'failures': []
				};
				o.results.push( r );
			}
			r.fail += 1;
			r.failures.push({
				'assertion': line.replace( /^not ok \d+ /, '' ),
				'diagnostics': []
			});
		}
		// Check for a diagnostic line...
		else if ( /^#/.test( line ) ) {
			// We can ignore this line, as we will process a test description upon encountering the next test...
			return;
		}
		// Check for the version line...
		else if ( /^TAP .+/.test( line ) ) {
			// We can ignore this line...
			return;
		}
		// Check for the plan...
		else if ( /1\.\.\d+/.test( line ) ) {
			// We can ignore this line...
			return;
		}
		// Check whether we have entered a YAML block...
		else if ( /---$/.test( line ) ) {
			// We can ignore this line...
			return;
		}
		// Check whether we have left a YAML block...
		else if ( /\.\.\.$/.test( line ) ) {
			// We can ignore this line...
			return;
		}
		// We can assume that we are within a YAML block...
		else {
			r.failures[ r.failures.length-1 ].diagnostics.push( line );
		}
		// Update component state:
		this.setState({
			'update': this.state.update + 1
		});
	}

	/**
	* Callback invoked upon receiving a message from a web worker.
	*
	* @private
	* @param {Object} event - event object
	*/
	_onMessage = ( event ) => {
		this._processLine( event.data );
		this._prevLine = event.data;
	}

	/**
	* Callback invoked upon encountering a web worker error.
	*
	* @private
	* @param {Object} event - event object
	*/
	_onError = ( event ) => {
		log( 'Encountered a worker error...' );
		log( event );
	}

	/**
	* Starts a web worker for running a script.
	*
	* @private
	*/
	_startWorker() {
		log( 'Starting worker...' );
		this._worker = new Worker( WORKER_SCRIPT );
		this._worker.onmessage = this._onMessage;
		this._worker.onerror = this._onError;
		this._worker.postMessage( this.props.url );
	}

	/**
	* Stops a web worker.
	*
	* @private
	*/
	_stopWorker() {
		if ( this._worker ) {
			log( 'Stopping worker...' );
			this._worker.terminate();
		}
	}

	/**
	* Renders a test failure.
	*
	* @private
	* @param {Object} failure - test failure
	* @param {string} failure.assertion - test assertion
	* @param {StringArray} failure.diagnostics - test diagnostics
	* @returns {ReactElement} React element
	*/
	_renderFailure( failure ) {
		return (
			<Fragment>
				<p className="test-failure-assertion">
					<span className="test-result-icon test-fail-icon" role="img" aria-hidden="true">-</span>
					<span className="test-assertion-message">{ failure.assertion }</span>
				</p>
				<pre className="test-failure-diagnostics">{ failure.diagnostics.join( '\n' ) }</pre>
			</Fragment>
		);
	}

	/**
	* Renders a list of test failures.
	*
	* @private
	* @param {ObjectArray} list - list of failures
	* @returns {Array<ReactElement>} list of React elements
	*/
	_renderFailures( list ) {
		var out;
		var i;

		out = [];
		for ( i = 0; i < list.length; i++ ) {
			out.push( this._renderFailure( list[ i ] ) );
		}
		return out;
	}

	/**
	* Renders a test result.
	*
	* @private
	* @param {Object} result - test result
	* @param {string} result.desc - test description
	* @param {NonNegativeInteger} result.pass - number of passing tests
	* @param {NonNegativeInteger} result.fail - number of failing tests
	* @param {ObjectArray} result.failures - list of test failures
	*/
	_renderResult( result ) {
		return (
			<div className="test-block">
				<p className="test-description">{ result.desc }</p>
				<p className="test-pass">
					<span className="test-result-icon test-pass-icon" role="img" aria-hidden="true">-</span>
					<span className="test-result-label">Pass: </span>
					<span className="test-result-value">{ result.pass }</span>
				</p>
				<p className="test-fail">
					<span className="test-result-icon test-fail-icon" role="img" aria-hidden="true">-</span>
					<span className="test-result-label">Fail: </span>
					<span className="test-result-value">{ result.fail }</span>
				</p>
				{ ( result.failures.length ) ?
					<div className="test-failures">{ this._renderFailures( result.failures ) }</div>
					:
					null
				}
			</div>
		);
	}

	/**
	* Renders test results.
	*
	* @private
	* @param {ObjectArray} results - list of results
	* @returns {Array<ReactElement>} list of React elements
	*/
	_renderResults( results ) {
		var out;
		var i;

		out = [];
		for ( i = 0; i < results.length; i++ ) {
			out.push( this._renderResult( results[ i ] ) );
		}
		return out;
	}

	/**
	* Renders results for a test file.
	*
	* @private
	* @param {Object} result - result
	* @param {string} result.url - test file URL
	* @param {string} result.file - test file name
	* @param {ObjectArray} result.results - test results
	* @returns {ReactElement} React element
	*/
	_renderFile( result ) {
		return (
			<section className="test">
				<h2 className="test-file">
					<LogoIcon />
					<a href={ result.url } title="View test file">{ result.file }</a>
				</h2>
				{ this._renderResults( result.results ) }
			</section>
		);
	}

	/**
	* Renders results.
	*
	* @private
	* @param {ObjectArray} results - list of results
	* @returns {Array<ReactElement>} list of React elements
	*/
	_render( results ) {
		var out;
		var i;

		out = [];
		for ( i = 0; i < results.length; i++ ) {
			out.push( this._renderFile( results[ i ] ) );
		}
		return out;
	}

	/**
	* Callback invoked immediately after mounting a component (i.e., is inserted into a tree).
	*
	* @private
	*/
	componentDidMount() {
		this._startWorker();
	}

	/**
	* Callback invoked immediately after updating a component.
	*
	* @private
	* @param {Object} prevProps - previous properties
	* @param {Object} prevState - previous state
	*/
	componentDidUpdate( prevProps ) {
		var content;
		if ( this.props.url !== prevProps.url ) {
			content = this.state.content;
			content.length = 0;

			this.setState({
				'update': this.state.update + 1
			});

			this._stopWorker();
			this._startWorker();
		}
	}

	/**
	* Callback invoked immediately before a component is unmounted and destroyed.
	*
	* @private
	*/
	componentWillUnmount() {
		this._stopWorker();
	}

	/**
	* Renders the component.
	*
	* @private
	* @returns {ReactElement} React element
	*/
	render() {
		return (
			<div id="readme" className="readme runner">
				<h1>{ this.props.title }</h1>

				<nav className="badges" aria-label="badges">
					<ul className="disable-select badge-list">
						<li className="badge">
							<a title="View build status" href={ GITHUB_PRE + this.props.standalone + GITHUB_WORKFLOW } >Build Status</a>
						</li>
						<li className="badge">
							<a title="View code coverage" href={ CODECOV_URL_PRE + this.props.standalone + CODECOV_QS } >Code Coverage</a>
						</li>
					</ul>
				</nav>

				<section className="runner-results tests">
					{ this._render( this.state.content ) }
				</section>
			</div>
		);
	}
}

/**
* Component property types.
*
* @constant
* @name propTypes
* @memberof TestRunner
* @type {Object}
*/
TestRunner.propTypes = {
	'url': PropTypes.string.isRequired,
	'title': PropTypes.string.isRequired,
	'version': PropTypes.string.isRequired,
	'standalone': PropTypes.string.isRequired
};


// EXPORTS //

export default TestRunner;
