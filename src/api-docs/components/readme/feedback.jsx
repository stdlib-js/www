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
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';
import ThumbsUpIcon from './../icons/thumbs_up.jsx';
import ThumbsDownIcon from './../icons/thumbs_down.jsx';


// MAIN //

/**
* Component rendering a feedback form to collect user feedback for an individual package.
*
* @private
*/
class Feedback extends React.Component {
	/**
	* Returns a component for rendering a feedback form.
	*
	* @private
	* @constructor
	* @param {Object} props - component properties
	* @param {string} props.pkg - package name (e.g., `math/base/special/sin`)
	* @param {string} props.url - resource URL
	* @param {string} props.version - documentation version
	*/
	constructor( props ) {
		super( props );
		this.state = {
			'sentiment': '',
			'explanation': '',
			'error': false,
			'submitted': false
		};
	}

	/**
	* Callback invoked upon changing the feedback sentiment (either `positive` or `negative`).
	*
	* @private
	* @param {Object} event - event object
	*/
	_onSentimentChange = ( event ) => {
		this.setState({
			'sentiment': event.target.value
		});
	}

	/**
	* Callback invoked upon changing the feedback explanation text.
	*
	* @private
	* @param {Object} event - event object
	*/
	_onExplanationChange = ( event ) => {
		this.setState({
			'explanation': event.target.value
		});
	}

	/**
	* Callback invoked upon canceling submission of the feedback form.
	*
	* @private
	*/
	_cancelSubmission = () => {
		this.setState({
			'sentiment': '',
			'explanation': '',
			'error': false,
			'submitted': false
		});
	}

	/**
	* Callback invoked upon submitting the feedback form.
	*
	* @private
	* @param {Object} event - event object
	*/
	_onSubmit = ( event ) => {
		var blob;
		var self;
		var el;

		self = this;

		event.preventDefault();
		el = event.target;

		this.setState({
			'error': false,
			'submitted': false
		});

		blob = {
			'method': 'POST',
			'headers': {
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			},
			'body': JSON.stringify({
				'pkg': this.props.pkg,
				'version': this.props.version,

				'sentiment': this.state.sentiment,
				'explanation': this.state.explanation,

				'_subject': 'Re: [feedback] @stdlib/' + this.props.pkg,
				'_template': 'table',
				'_url': 'https://stdlib.io',
				'_cc': 'pburckhardt@outlook.com',
				'_captcha': 'false',
				'_honey': el.elements[ '__invisible_input__' ].value
			})
		};

		fetch( 'https://formsubmit.co/ajax/7a22568a376a058e7a22f1e4d8eead4a', blob )
			.then( toJSON )
			.then( onData )
			.catch( onError );

		/**
		* Callback invoked upon receiving a JSON resource.
		*
		* @private
		* @param {Object} res - response
		* @returns {Promise} promise to resolve the response as JSON
		*/
		function toJSON( res ) {
			return res.json();
		}

		/**
		* Callback invoked upon resolving response data.
		*
		* @private
		* @param {Object} data - response data
		* @returns {void}
		*/
		function onData( data ) {
			var err = ( data.success === 'false' );
			if ( err ) {
				console.log( 'Error: unexpected error. Unable to submit feedback. ' + data.message );
			}
			self.setState({
				'error': err,
				'submitted': true
			});
		}

		/**
		* Callback invoked upon encountering an error.
		*
		* @private
		* @param {Error} error - error object
		*/
		function onError( error ) {
			console.log( 'Error: unexpected error. Unable to submit feedback. ' + error.message );
			self.setState({
				'error': true,
				'submitted': false
			});
		}
	}

	/**
	* Renders form elements for indicating positive or negative sentiment.
	*
	* @private
	* @returns {ReactElement} React element
	*/
	_renderSentiment() {
		return (
			<fieldset>
				<legend>Did you find this page helpful?</legend>
				<div
					className={ 'readme-feedback-sentiment-wrapper ' + ( ( this.state.sentiment ) ? 'readme-feedback-has-sentiment' : 'readme-feedback-no-sentiment' ) }
					role="radiogroup"
					aria-label="sentiment"
				>
					<input
						type="radio"
						name="readme-feedback-sentiment"
						id="readme-feedback-positive-sentiment"
						className="readme-feedback-sentiment-radio"
						value="positive"
						title="Yes, I found this page helpful."
						checked={ this.state.sentiment === 'positive' }
						onChange={ this._onSentimentChange }
					/>
					<label
						htmlFor="readme-feedback-positive-sentiment"
						className="disable-select readme-feedback-sentiment-label readme-feedback-positive-sentiment"
					>
						<ThumbsUpIcon/>
						<span className="visually-hidden">Yes</span>
					</label>

					<input
						type="radio"
						name="readme-feedback-sentiment"
						id="readme-feedback-negative-sentiment"
						className="readme-feedback-sentiment-radio"
						value="negative"
						title="No, I didn't find this page helpful."
						checked={ this.state.sentiment === 'negative' }
						onChange={ this._onSentimentChange }
					/>
					<label
						htmlFor="readme-feedback-negative-sentiment"
						className="disable-select readme-feedback-sentiment-label readme-feedback-negative-sentiment"
					>
						<ThumbsDownIcon/>
						<span className="visually-hidden">No</span>
					</label>
				</div>
			</fieldset>
		);
	}

	/**
	* Renders a form element for providing an explanation.
	*
	* @private
	* @returns {ReactElement} react element
	*/
	_renderExplanation() {
		return (
			<TextField
				name="explanation"
				label={ this.state.sentiment === 'positive' ? 'What do you like about this page?' : 'How can we improve this page?' }
				multiline
				rows={ 3 }
				maxRows={ 12 }
				value={ this.state.explanation }
				onChange={ this._onExplanationChange }
				fullWidth
			/>
		);
	}

	/**
	* Renders form elements providing buttons for submitting feedback.
	*
	* @private
	* @returns {ReactElement} React element
	*/
	_renderSubmitButtons() {
		return (
			<div className="readme-feedback-submit-buttons">
				<button
					type="button"
					className="readme-feedback-cancel-button"
					onClick={ this._cancelSubmission }
				>
					Cancel
				</button>
				<button
					type="submit"
					className="readme-feedback-submit-button"
				>
					Submit
				</button>
			</div>
		);
	}

	/**
	* Renders a form footnote.
	*
	* @private
	*/
	_renderFootnote() {
		if ( this.state.error ) {
			return (
				<div className="readme-feedback-footnote readme-feedback-error">
					<p>
						Uh oh! An unexpected error occurred when attempting to submit your feedback. Please try again.
					</p>
					<p>
						If this issue persists, please reach out to us over chat! Thank you again for choosing stdlib. Your feedback is greatly appreciated!
					</p>
				</div>
			);
		}
		return (
			<div className="readme-feedback-footnote">
				<p>
					<sup>*</sup>Please note that we can't reply to your submitted feedback. If you have questions, please reach out to us over chat!
				</p>
			</div>
		);
	}

	/**
	* Renders form elements for submitting feedback.
	*
	* @private
	* @returns {ReactElement} React element
	*/
	_renderSubmit() {
		if ( this.state.submitted && !this.state.error ) {
			return (
				<h3>Thank you for your feedback! Your feedback has been received!</h3>
			);
		}
		return (
			<Fragment>
				<h3>Thank you for your feedback!</h3>
				{ this._renderExplanation() }
				{ this._renderSubmitButtons() }
				{ this._renderFootnote() }
			</Fragment>
		);
	}

	/**
	* Renders the component.
	*
	* @private
	* @returns {ReactElement} React element
	*/
	render() {
		return (
			<form
				className="readme-feedback"
				onSubmit={ this._onSubmit }
			>
				{ this._renderSentiment() }
				{ ( this.state.sentiment ) ? this._renderSubmit() : null }
				<input className="invisible" type="text" name="__invisible_input__" />
			</form>
		);
	}
}

/**
* Component property types.
*
* @constant
* @name propTypes
* @memberof Feedback
* @type {Object}
*/
Feedback.propTypes = {
	'pkg': PropTypes.string.isRequired,
	'url': PropTypes.string.isRequired,
	'version': PropTypes.string.isRequired
}


// EXPORTS //

export default withRouter( Feedback );
