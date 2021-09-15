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
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';


// MAIN //

/**
* Component for displaying a search input element.
*
* @private
*/
class SearchInput extends React.Component {
	/**
	* Returns a component for displaying a search input element.
	*
	* @private
	* @constructor
	* @param {Object} props - component properties
	* @param {string} value - value of input element
	* @param {Callback} props.onChange - callback to invoke upon updating a search input element
	* @param {Callback} props.onSubmit - callback to invoke upon a user submitting a search query
	* @param {Callback} props.onFocus - callback to invoke when search input element receives focus
	* @param {Callback} props.onBlur - callback to invoke when search input element loses focus
	* @returns {ReactComponent} React component
	*/
	constructor( props ) {
		super( props );
		this.state = {
			// Boolean indicating whether a search input element is "active" (e.g., is focused or contains a search query):
			'active': false
		};
	}

	/**
	* Callback invoked upon updating a search input element.
	*
	* @private
	* @param {Object} event - event object
	*/
	_onChange = ( event ) => {
		this.props.onChange( event.target.value );
	}

	/**
	* Callback invoked upon a user releasing a key on a keyboard when using a search input element.
	*
	* @private
	* @param {Object} event - event object
	* @returns {void}
	*/
	_onKeyUp = ( event ) => {
		if ( event.charCode === 13 || event.key === 'Enter' ) {
			this.props.onSubmit();
		}
	}

	/**
	* Callback invoked upon the search input element being focused.
	*
	* @private
	* @param {Object} event - event object
	*/
	_onFocus = ( event ) => {
		this.setState({
			'active': true
		});
		this.props.onFocus( event );
	}

	/**
	* Callback invoked upon the search input element losing focus.
	*
	* @private
	* @param {Object} event - event object
	*/
	_onBlur = ( event ) => {
		this.setState({
			'active': false
		});
		this.props.onBlur( event );
	}

	/**
	* Callback invoked upon clicking a submit button.
	*
	* @private
	*/
	_onSubmitClick = () => {
		this.props.onSubmit();
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
				<InputBase
					id="top-nav-search"
					className={ 'top-nav-search ' + ( ( this.state.active || this.props.value ) ? 'top-nav-search-active' : '' ) }
					placeholder="Search documentation"
					value={ this.props.value }
					type="text"
					inputProps={{
						'aria-label': 'search text'
					}}
					onChange={ this._onChange }
					onKeyUp={ this._onKeyUp }
					onFocus={ this._onFocus }
					onBlur={ this._onBlur }
				/>
				<IconButton
					type="button"
					className="icon-button top-nav-search-button"
					onClick={ this._onSubmitClick }
					aria-label="search"
				>
					<SearchIcon />
				</IconButton>
			</Fragment>
		);
	}
}


// EXPORTS //

export default SearchInput;
