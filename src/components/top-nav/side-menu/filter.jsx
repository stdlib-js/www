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
import PropTypes from 'prop-types';
import ClearIcon from '@mui/icons-material/Clear'; // FIXME: replace within internal icon


// MAIN //

/**
* Component for displaying a menu filter.
*
* @private
*/
class SideMenuFilter extends React.Component {
	/**
	* Returns a component for displaying a menu filter.
	*
	* @private
	* @constructor
	* @param {Object} props - component properties
	* @param {string} props.filter - text the user has entered to filter the list of packages displayed in the side menu
	* @param {Callback} props.onFocus - callback to invoke when the menu filter receives focus
	* @param {Callback} props.onBlur - callback to invoke when the menu filter loses focus
	* @param {Callback} props.onChange - callback to invoke upon a change in the filter
	* @returns {ReactComponent} React component
	*/
	constructor( props ) {
		super( props );
	}

	/**
	* Callback invoked upon a change to the menu filter.
	*
	* @private
	* @param {Object} event - event object
	*/
	_onFilterChange = ( event ) => {
		this.props.onChange( event.target.value );
	}

	/**
	* Callback invoked upon clicking a button to reset the menu filter.
	*
	* @private
	* @param {Object} event - event object
	*/
	_onResetFilterClick = () => {
		this.props.onChange( '' );
	}

	/**
	* Renders the component.
	*
	* @private
	* @returns {ReactElement} React element
	*/
	render() {
		return (
			<div className="side-menu-filter" >
				<input
					className="side-menu-filter-input"
					type="text"
					onChange={ this._onFilterChange }
					onFocus={ this.props.onFocus }
					onBlur={ this.props.onBlur }
					value={ this.props.filter }
					placeholder="Type here to filter menu..."
					title="Filter package menu"
					aria-label="filter menu"
				/>
				{ this.props.filter
					? <ClearIcon
						className="side-menu-filter-clear"
						title="Clear the current filter"
						onClick={ this._onResetFilterClick }
						aria-label="clear"
					/>
					: null
				}
			</div>
		);
	}
}

/**
* Component property types.
*
* @constant
* @name propTypes
* @memberof SideMenuFilter
* @type {Object}
*/
SideMenuFilter.propTypes = {
	'filter': PropTypes.string.isRequired,
	'onFocus': PropTypes.func.isRequired,
	'onBlur': PropTypes.func.isRequired,
	'onChange': PropTypes.func.isRequired
};


// EXPORTS //

export default SideMenuFilter;
