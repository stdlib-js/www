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
* @param {Object} props - component properties
* @param {Callback} props.onChange - callback to invoke upon a change to the search input element
* @returns {ReactElement} React element
*/
function SearchInput( props ) {
	return (
		<Fragment>
			<InputBase
				id="top-nav-search-input"
				className="top-nav-search"
				placeholder="Search documentation"
				name="top-nav-search-input"
				type="text"
				inputProps={{
					'aria-label': 'search documentation'
				}}
				onChange={ props.onChange }
			/>
			<IconButton
				type="submit"
				className="icon-button top-nav-search-button"
				aria-label="search"
			>
				<SearchIcon />
			</IconButton>
		</Fragment>
	);
}


// EXPORTS //

export default SearchInput;
