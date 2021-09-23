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

import React from 'react';
import log from './../../utils/log.js';


// VARIABLES //

var WORKER_SCRIPT = '/js/docs/worker.js';


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
			// Check whether we have begun processing the tests for another file...
			match = line.match( /^ok \d+ (\/lib\/node_modules\/.+)$/ ); // Note: this is based on the convention that, in a test file, we always print the test filename as an assertion within the first test block
			if ( match ) {
				// We need to create a new object for holding all test results belonging to a particular test file...
				o = {
					'file': match[ 1 ],
					'results': [
						{
							'desc': this._prevLine,
							'pass': 0,
							'fail': 0,
							'failures': []
						}
					]
				};
				r = o.results[ 0 ];
				content.push( o );
			}
			// Check if preceded by a test description...
			else if ( /^#/.test( this._prevLine ) ) {
				r = {
					'desc': this._prevLine,
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
					'desc': this._prevLine,
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
			// Check whether the description is empty...
			if ( line === '#' ) {
				// We can ignore this line...
				return;
			}
			// Check whether this is a summary line...
			if ( /^# total \d+$|^# tests \d+$|^# (?:pass|fail) {2}\d+$|^# ok/.test( line ) ) {
				// We can ignore this line...
				return;
			}
			// Check whether this line indicates a skipped test...
			if ( /^# SKIP.*$/.test( line ) ) {
				// We can ignore this line...
				return;
			}
			// We found a test description...
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
				<p>{ 'Pass: ' + result.pass }</p>
				<p>{ 'Fail: ' + result.fail }</p>
				{ ( result.failures.length ) ?
					<pre>{ result.failures.join( '\n' ) }</pre>
					:
					null
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
				<section className="runner-results tests">
					{ this._renderResults( this.state.content ) }
				</section>
			</div>
		);
	}
}


// EXPORTS //

export default TestRunner;
