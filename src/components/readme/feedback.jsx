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

import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import qs from 'qs';
import TextField from '@mui/material/TextField';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';


// MAIN //

/**
* Component rendering a feedback form to collect user feedback for an individual package.
*
* @private
*/
class Feedback extends Component {
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
			'sentiment': null,
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
			sentiment: event.target.value
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
			explanation: event.target.value
		});
	}

	/**
	* Callback invoked upon canceling submission of the feedback form.
	*
	* @private
	*/
	_cancelSubmission = () => {
		this.setState({
			'sentiment': null,
			'explanation': ''
		});
	}

	/**
	* Renders the component.
	*
	* @private
	* @returns {ReactElement} React element
	*/
	render() {
		/* eslint-disable no-restricted-globals */
		const origin = typeof window !== 'undefined' ? window.location.origin : '';
		const subject = 'Feedback on documentation for @stdlib/' + this.props.pkg;
		return (
			<form
				className="readme-feedback" action="https://formsubmit.co/7a22568a376a058e7a22f1e4d8eead4a"
				method="post"
			>
				<input type="hidden" name="pkg" value={ this.props.pkg } />
				<input type="hidden" name="version" value={ this.props.version } />
				<FormControl component="fieldset">
					<FormLabel component="legend">Was this documentation useful for you?</FormLabel>
					<RadioGroup
						aria-label="sentiment"
						name="sentiment"
						row
						onChange={ this._onSentimentChange }
					>
						<FormControlLabel
							value="positive"
							control={
								<Radio
									checked={ this.state.sentiment === 'positive' }
									icon={ <ThumbUpIcon /> }
									checkedIcon={ <ThumbUpIcon color="success" /> }
								/>
							}
							label="Yes" />
						<FormControlLabel
							value="negative"
							control={
								<Radio
									checked={ this.state.sentiment === 'negative' }
									icon={ <ThumbDownIcon /> }
									checkedIcon={ <ThumbDownIcon color="error" /> }
								/>
							}
							label="No"
						/>
					</RadioGroup>
				</FormControl>
				{ this.state.sentiment ?
					<Fragment>
						<h3>Thank you for your feedback!</h3>
						<div>
							<TextField
								name="explanation"
								label={ this.state.sentiment === 'positive' ? 'What do you like about this documentation?' : 'What could we improve?' }
								multiline
								rows={ 3 }
								maxRows={ 12 }
								value={ this.state.explanation }
								onChange={ this._onExplanationChange }
								fullWidth
							/>
							<Stack
								direction="row"
								justify="right"
								align="right"
							>
								<Button
									variant="text"
									onClick={ this._cancelSubmission }
								>
									Cancel
								</Button>
								<Button
									variant="text"
									type="submit"
								>
									Submit
								</Button>
							</Stack>
						</div>
					</Fragment> : null
				}
				<input type="hidden" name="_next" value={ origin + this.props.url + '?' + qs.stringify({
					'notification': 'Feedback successfully submitted.'
				}) } />
				<input type="hidden" name="_template" value="table" />
				<input type="hidden" name="_url" value="https://stdlib.io" />
				<input type="hidden" name="_captcha" value="false" />
				<input type="text" name="_honey" style={{ display: 'none' }} />
				<input type="hidden" name="_subject" value={ subject } />
				<input type="hidden" name="_cc" value="pburckhardt@outlook.com" />
			</form>
		);
		/* eslint-enable no-restricted-globals */
	}
}


// EXPORTS //

export default withRouter( Feedback );
