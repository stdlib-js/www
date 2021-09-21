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
import iframeResizer from 'iframe-resizer/js/iframeResizer.js';
import bootstrap from './bootstrap.js';


// MAIN //

/**
* Component for rendering an `iframe` which automatically resizes based on its content.
*
* @private
*/
class IframeResizer extends React.Component {
	/**
	* Returns a component which renders an `iframe` which automatically resizes based on its content.
	*
	* @private
	* @constructor
	* @param {Object} props - component properties
	* @param {string} props.className - class name
	* @param {string} props.url - resource URL
	* @param {string} props.title - title
	* @param {number} props.width - width
	* @returns {ReactComponent} React component
	*/
	constructor( props ) {
		super( props );
		this._ref = React.createRef();
	}

	/**
	* Callback invoked immediately after mounting a component (i.e., is inserted into a tree).
	*
	* @private
	*/
	componentDidMount() {
		var opts = {
			'checkOrigin': false
		};
		iframeResizer( opts, this._ref.current );
	}

	/**
	* Callback invoked immediately before a component is unmounted and destroyed.
	*
	* @private
	*/
	componentWillUnmount() {
		var iframe = this._ref.current;
		if ( iframe && iframe.iFrameResizer ) {
			iframe.iFrameResizer.removeListeners();
		}
	}

	/**
	* Renders the component.
	*
	* @private
	* @returns {ReactElement} React element
	*/
	render() {
		return (
			<iframe
				className={ this.props.className }
				srcdoc={ bootstrap( this.props.url ) }
				title={ this.props.title }
				width={ this.props.width }
				checkOrigin={ false }
				ref={ this._ref }
			/>
		);
	}
}


// EXPORTS //

export default IframeResizer;
