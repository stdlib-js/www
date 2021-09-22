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
import log from './../../utils/log.js';


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
	* Callback invoked upon receiving a message from a web worker.
	*
	* @private
	* @param {Object} event - event object
	*/
	_onMessage = ( event ) => {
		var content;
		var match;
		var line;
		var o;

		line = event.data;
		content = this.state.content;
		if ( content.length ) {
			o = content[ content.length-1 ];
		}
		// Check for an empty line...
		if ( line === '' ) {
			// We can ignore this line...
			return;
		}
		// Check for a passing test...
		if ( /^ok \d+ .+/.test( line ) ) {
			o.pass += 1;
			match = line.match( /^ok \d+ (\/lib\/node_modules\/.+)$/ );
			if ( match ) {
				o.file = match[ 1 ];
			}
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
			// Check whether the description is empty...
			if ( line === '#' ) {
				// We can ignore this line...
				return;
			}
			// Check whether this is a summary line...
			if ( /^# tests \d+$|^# total \d+$|^# (?:pass|fail) {2}\d+$|^# ok/.test( line ) ) {
				// We can ignore this line...
				return;
			}
			// Check whether this line indicates a skipped test...
			if ( /^# SKIP.*$/.test( line ) ) {
				// We can ignore this line...
				return;
			}
			// We found a test description...
			content.push({
				'desc': line,
				'file': '',
				'pass': 0,
				'results': {},
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
					o.results.elapsed = parseFloat( match[ 1 ] );
				} else {
					match = line.match( /rate: ([0-9.]+)$/ );
					if ( match ) {
						o.results.rate = parseFloat( match[ 1 ] );
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
	* Renders a result.
	*
	* @private
	* @param {Object} result - result
	* @returns {ReactElement} React element
	*/
	_renderResult( result ) {
		/*
		* TODO:
		*
		* -  if starts with `TAP version 13`, skip
		* -  if starts with `#`, treat as comment
		* -  if starts with `ok`, print a green checkmark and then the result
		*    -   if the result is `ok \d+` followed by `lib/node_modules/*`, wrap the path in a link and link to the GitHub source
		* -  if starts with `not ok`, print a red `x` and then the result
		* -  otherwise, print as paragraph
		*/
		return (
			<div>
				<p>{ result.file }</p>
				<p>{ result.desc }</p>
				{ ( result.failures.length ) ?
					<pre>{ result.failures.join( '\n' ) }</pre>
					:
					(
						<Fragment>
							<p>{ 'Iterations: ' + result.results.iterations }</p>
							<p>{ 'Elapsed: ' + result.results.elapsed }</p>
							<p>{ 'Rate: ' + result.results.rate }</p>
						</Fragment>
					)
				}
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
				<section className="runner-results">
					<h2>
						Running...
					</h2>
					{ this._renderResults( this.state.content ) }
				</section>
			</div>
		);
	}
}


// EXPORTS //

export default BenchmarkRunner;
