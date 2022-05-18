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
			'explanation': ''
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
			'explanation': ''
		});
	}

	/**
	* Callback invoked upon submitting the feedback form.
	*
	* @private
	* @param {Object} event - event object
	*/
	_onSubmit = ( event ) => {
		event.preventDefault();

		// TODO: add AJAX logic => https://formsubmit.co/7a22568a376a058e7a22f1e4d8eead4a
		console.log( 'Form submitted' );
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
	* Renders form elements for submitting feedback.
	*
	* @private
	* @returns {ReactElement} React element
	*/
	_renderSubmit() {
		return (
			<Fragment>
				<h3>Thank you for your feedback!</h3>
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
				<p>
					<sup>*</sup>Please note that we can't reply to your submitted feedback. If you have questions, please reach out to us over chat!
				</p>
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

				<input type="hidden" name="pkg" value={ this.props.pkg } />
				<input type="hidden" name="version" value={ this.props.version } />

				<input type="hidden" name="_subject" value={ '[feedback] Package Documentation: @stdlib/' + this.props.pkg } />
				<input type="hidden" name="_template" value="table" />
				<input type="hidden" name="_url" value="https://stdlib.io" />
				<input type="hidden" name="_cc" value="pburckhardt@outlook.com" />

				<input type="hidden" name="_captcha" value="false" />
				<input className="invisible" type="text" name="_honey" />
			</form>
		);
	}
}


// EXPORTS //

export default withRouter( Feedback );
