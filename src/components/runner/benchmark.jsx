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
import CircularProgress from '@mui/material/CircularProgress';
import log from './../../utils/log.js';
import config from './../../config.js';


// VARIABLES //

var WORKER_SCRIPT = '/js/docs/worker.js';


// MAIN //

/**
* Component for running a benchmark script and displaying the results.
*
* @private
*/
class BenchmarkRunner extends React.Component {
	/**
	* Returns a component which runs a benchmark script and displays the results.
	*
	* @private
	* @constructor
	* @param {Object} props - component properties
	* @param {string} props.url - resource URL
	* @param {string} props.title - page title
	* @param {string} props.pkg - package name
	* @param {string} props.version - documentation version
	* @returns {ReactComponent} React component
	*/
	constructor( props ) {
		super( props );
		this.state = {
			'content': [],
			'update': 0
		};
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

		// Check for an empty line...
		if ( line === '' ) {
			// We can ignore this line...
			return;
		}
		content = this.state.content;
		if ( content.length ) {
			o = content[ content.length-1 ];
		}
		// Check for a passing test...
		if ( /^ok \d+ .+/.test( line ) ) {
			o.pass += 1;
		}
		// Check for a failing test...
		else if ( /^not ok \d+ .+/.test( line ) ) {
			o.fail += 1;
			o.flg = true;
			o.failures.push({
				'assertion': line.replace( /^not ok \d+ /, '' ),
				'diagnostics': []
			});

		}
		// Check for a diagnostic line...
		else if ( /^#/.test( line ) ) {
			// Check whether the diagnostic line is empty...
			if ( line === '#' ) {
				// We can ignore this line...
				return;
			}
			// Check whether this is a summary line...
			if ( /^# total \d+$|^# (?:pass|fail) {2}\d+$|^# ok/.test( line ) ) {
				// We can ignore this line...
				return;
			}
			// Check whether this line indicates a skipped benchmark...
			if ( /^# SKIP.*$/.test( line ) ) {
				// We can ignore this line...
				return;
			}
			// We found a benchmark description...
			content.push({
				'desc': line.substring( 2 ),
				'pass': 0,
				'results': {
					'iterations': 0,
					'elapsed': 0.0,
					'rate': 0.0
				},
				'fail': 0,
				'failures': [],
				'flg': false
			});
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
			if ( o.flg ) {
				o.flag = false;
			}
			// We can ignore this line...
			return;
		}
		// We can assume that we are within a YAML block...
		else if ( o.flg ) {
			o.failures[ o.failures.length-1 ].diagnostics.push( line );
		}
		// Handle benchmark results...
		else {
			match = line.match( /iterations: (\d+)$/ );
			if ( match ) {
				o.results.iterations = parseInt( match[ 1 ], 10 );
			} else {
				match = line.match( /elapsed: ([0-9.]+)$/ );
				if ( match ) {
					o.results.elapsed = parseFloat( match[ 1 ] ).toLocaleString( 'en-US' );
				} else {
					match = line.match( /rate: ([0-9.]+)$/ );
					if ( match ) {
						o.results.rate = parseFloat( match[ 1 ] ).toLocaleString( 'en-US' );
					}
				}
			}
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
	* Renders an assertion failure.
	*
	* @private
	* @param {Object} failure - assertion failure
	* @param {string} failure.assertion - assertion
	* @param {StringArray} failure.diagnostics - assertion diagnostics
	* @returns {ReactElement} React element
	*/
	_renderFailure( failure ) {
		return (
			<Fragment>
				<p className="benchmark-failure-assertion">
					<span className="benchmark-result-icon benchmark-fail-icon" role="img" aria-hidden="true">-</span>
					<span className="benchmark-assertion-message">{ failure.assertion }</span>
				</p>
				<pre className="benchmark-failure-diagnostics">{ failure.diagnostics.join( '\n' ) }</pre>
			</Fragment>
		);
	}

	/**
	* Renders a list of assertion failures.
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
	* Renders a result.
	*
	* @private
	* @param {Object} result - result
	* @param {string} result.desc - benchmark description
	* @param {Object} result.results - benchmark results
	* @param {ObjectArray} result.failures - list of assertion failures
	* @returns {ReactElement} React element
	*/
	_renderResult( result ) {
		if ( result.failures.length ) {
			return (
				<div className="benchmark-block">
					<p className="benchmark-description">{ result.desc }</p>
					<div className="benchmark-failures">{ this._renderFailures( result.failures ) }</div>
				</div>
			);
		}
		return (
			<div className="benchmark-block">
				<p className="benchmark-description">{ result.desc }</p>
				<p className="benchmark-iterations">
					<span className="benchmark-result-icon benchmark-iterations-icon" role="img" aria-hidden="true">-</span>
					<span className="benchmark-result-label">Iterations: </span>
					<span className="benchmark-result-value">{ result.results.iterations }</span>
				</p>
				<p className="benchmark-elapsed">
					<span className="benchmark-result-icon benchmark-elapsed-icon" role="img" aria-hidden="true">-</span>
					<span className="benchmark-result-label">Elapsed: </span>
					<span className="benchmark-result-value">{ result.results.elapsed }</span>
					<span className="benchmark-result-units"> sec</span>
				</p>
				<p className="benchmark-rate">
					<span className="benchmark-result-icon benchmark-rate-icon" role="img" aria-hidden="true">-</span>
					<span className="benchmark-result-label">Rate: </span>
					<span className="benchmark-result-value">{ result.results.rate }</span>
					<span className="benchmark-result-units"> ops/sec</span>
				</p>
			</div>
		);
	}

	/**
	* Renders results.
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
				<section className="runner-results benchmarks">
					<h2 className="benchmark-file">
						<span className="logo-icon stdlib-logo-icon" role="img" aria-hidden="true"></span>
						<a href={ config.repository+'/tree/lib_nodules/@stdlib/'+this.props.pkg+'/benchmark' } title="View benchmark files">benchmark/</a>
					</h2>
					{ ( this.state.content.length ) ? this._renderResults( this.state.content ) : <CircularProgress /> }
				</section>
			</div>
		);
	}
}


// EXPORTS //

export default BenchmarkRunner;
