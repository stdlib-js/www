/**
* @license Apache-2.0
*
* Copyright (c) 2019 The Stdlib Authors.
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


// MAIN //

/**
* Component for rendering README content.
*
* @private
*/
class ReadmeContent extends React.Component {
	/**
	* Returns a component for rendering README content.
	*
	* @private
	* @constructor
	* @param {Object} props - component properties
	* @param {string} props.html - README HTML
	* @param {Callback} props.onClick - callback to invoke upon clicking on README content
	* @returns {ReactElement} React element
	*/
	constructor( props ) {
		super( props );

		this.state = {
			html: props.html
		};
	}

	/**
	* Callback invoked immediately after mounting a component (i.e., is inserted into a tree).
	*
	* @private
	*/
	componentDidMount() {
		// Add anchor links to each heading:
		const headings = this.content.querySelectorAll( 'h1,h2,h3,h4,h5,h6' );
		for ( let i = 0; i < headings.length; i++ ) {
			const heading = headings[ i ];
			const id = heading.id;
			const link = document.createElement( 'a' );
			link.className = 'anchor';
			link[ 'aria-hidden' ] = true;
			link.href = '#'+id;
			link.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" ><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>';
			heading.insertBefore( link, heading.firstChild );
		}
		this.setState( {
			html: this.content.innerHTML
		} );
	}

	/**
	* Renders the component.
	*
	* @private
	* @returns {ReactElement} React element
	*/
	render() {
		return (
			<section
				id="readme-content"
				className="readme-content"
				suppressHydrationWarning
				dangerouslySetInnerHTML={ {
					__html: this.state.html
				} }
				onClick={ this.props.onClick }
				ref={ ( el ) => {
					this.content = el;
				} }
			/>
		);
	}
}


// EXPORTS //

export default ReadmeContent;
