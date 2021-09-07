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
import lunr from 'lunr';
import { Link } from 'react-router-dom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import fetchSearchData from './../../utils/fetch_search_data.js';
import packageDescription from './../../utils/package_description.js';
import deprefix from './../../utils/deprefix_package_name.js';
import pkgPath from './../../utils/pkg_doc_path.js';
import log from './../../utils/log.js';


// MAIN //

/**
* Component for rendering documentation search.
*
* @private
*/
class Search extends React.Component {
	/**
	* Returns a component for rendering documentation search.
	*
	* @constructor
	* @param {Object} props - component properties
	* @param {string} props.version - version
	* @param {string} props.query - search query
	* @param {Callback} props.onPackageChange - callback to invoke upon selecting a package
	* @returns {ReactComponent} React component
	*/
	constructor( props ) {
		super( props );
		this.state = {
			// Search index:
			'index': null
		}
	}

	/**
	* Returns a callback which is invoked upon clicking on a specified package.
	*
	* @private
	* @param {string} pkg - package name
	* @returns {Callback} event handler
	*/
	_onPackageClickFactory( pkg ) {
		var self = this;
		return onClick;

		/**
		* Callback invoked upon clicking on a package.
		*
		* @private
		* @param {Object} event - event object
		*/
		function onClick() {
			// Notify the application that a user has selected a package:
			self.props.onPackageChange( pkg );
		}
	}

	/**
	* Updates the search index.
	*
	* @private
	*/
	_updateSearchIndex() {
		var self = this;

		// Update the component state:
		this.setState({
			'index': null
		});

		// Fetch search data:
		fetchSearchData( this.props.version, clbk );

		/**
		* Callback invoked upon resolving search data.
		*
		* @private
		* @param {(Error|null)} error - error object
		* @param {Object} data - search data
		* @returns {void}
		*/
		function clbk( error, data ) {
			if ( error ) {
				// TODO: display toast/error message to user to ask that they retry their search
				return log( error );
			}
			// Load the serialized index into Lunr:
			self.setState({
				'index': lunr.Index.load( data.index )
			});
		}
	}

	/**
	* Renders a list of search results.
	*
	* @private
	* @param {ObjectArray} results - list of results
	* @returns {Array<ReactElement>} list of React elements
	*/
	_renderItems( results ) {
		var out;
		var i;

		out = [];
		for ( i = 0; i < results.length; i++ ) {
			out.push( this._renderItem( results[ i ] ) );
		}
		return out;
	}

	/**
	* Renders a search result.
	*
	* @private
	* @param {Object} result - search result
	* @returns {ReactElement} React element
	*/
	_renderItem( result ) {
		var name;
		var desc;
		var pkg;

		name = result.ref;
		pkg = deprefix( name );
		desc = packageDescription( pkg, this.props.version ) || '(no description)';

		return (
			<ListItem
				key={ pkg }
				className="search-results-list-item"
			>
				<span class="package-name">
					<Link
						to={ pkgPath( name, this.props.version ) }
						title={ name }
						onClick={ this._onPackageClickFactory( pkg ) }
					>
						{ pkg }
					</Link>
				</span>
				<span class="delimiter">: </span>
				<span class="description">
					{ desc }
				</span>
			</ListItem>
		);
	}

	/**
	* Callback invoked immediately after mounting a component (i.e., is inserted into a tree).
	*/
	componentDidMount() {
		this._updateSearchIndex();
	}

	/**
	* Callback invoked immediately after updating a component.
	*
	* @private
	* @param {Object} prevProps - previous properties
	* @param {Object} prevState - previous state
	*/
	componentDidUpdate( prevProps, prevState ) {
		if ( this.props.version !== prevProps.version ) {
			this._updateSearchIndex();
		}
	}

	/**
	* Renders the component.
	*
	* @returns {ReactElement} React element
	*/
	render() {
		var results;
		if ( this.props.query === '' ) {
			// TODO: display message or show "advanced" search interface
			return null;
		}
		if ( this.state.index === null ) {
			// TODO: display pending search message
			return null;
		}
		results = this.state.index.search( this.props.query );
		return (
			<div id="readme" className="readme">
				<h1>Search Results</h1>
				<List
					disablePadding
					className="search-results-list"
				>
					{ this._renderItems( results ) }
				</List>
			</div>
		);
	}
}


// EXPORTS //

export default Search;
