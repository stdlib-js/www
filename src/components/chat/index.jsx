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
import viewportWidth from 'viewport-width';
import config from 'config';
import ForumIcon from './../icons/forum.jsx';


// MAIN //

/**
* Component for rendering an embedded chat application.
*
* @private
*/
class Chat extends React.Component {
	/**
	* Returns a component which renders an embedded chat application.
	*
	* @private
	* @constructor
	* @param {Object} props - component properties
	* @returns {ReactComponent} React component
	*/
	constructor( props ) {
		super( props );

		// Reference to an appended DOM node which loads a chat application script:
		this._$script = null;

		// Initialize component state:
		this.state = {
			// Reference to the chat application:
			'chat': null
		};
	}

	/**
	* Callback invoked once Gitter is ready.
	*
	* @private
	* @param {Object} event - event object
	*/
	_onGitterReady = ( event ) => {
		var chat;

		// Create a new chat instance:
		chat = new event.detail.Chat({
			'room': config.gitter_room,
			'activationElement': false
		});

		// Update component state:
		this.setState({
			'chat': chat
		});
	}

	/**
	* Callback invoked upon clicking the chat button.
	*
	* @private
	* @param {Object} event - event object
	*/
	_onClick = () => {
		// Toggle chat visibility:
		this.state.chat.toggleChat( true );
	}

	/**
	* Callback invoked immediately after mounting a component (i.e., is inserted into a tree).
	*
	* @private
	*/
	componentDidMount() {
		var self;
		var w;

		self = this;

		// Query the current viewport width:
		w = viewportWidth();

		// Only initialize chat on larger devices, based on the assumption that small devices are likely to be mobile devices:
		if ( w && w >= 1080 ) {
			setTimeout( onTimeout, config.gitter_load_delay );
		}

		/**
		* Callback invoked after a delay.
		*
		* @private
		*/
		function onTimeout() {
			var script;

			// Create a script for loading the chat application script:
			script = document.createElement( 'script' );
			script.src = config.gitter_script;
			script.async = true;
			script.defer = true;

			// Append the script to the document body:
			document.body.appendChild( script );

			// Cache a reference to the created DOM node:
			self._$script = script;

			// Listen for when Gitter is ready:
			document.addEventListener( 'gitter-sidecar-ready', self._onGitterReady );
		}
	}

	/**
	* Callback invoked immediately before a component is unmounted and destroyed.
	*
	* @private
	*/
	componentWillUnmount() {
		if ( this._$script ) {
			document.body.removeChild( this._$script );
			document.removeEventListener( 'gitter-sidecar-ready', this._onGitterReady );
		}
		if ( this.state.chat ) {
			this.state.chat.destroy();
		}
		this.setState({
			'chat': null
		});
	}

	/**
	* Renders the component.
	*
	* @private
	* @returns {(ReactElement|null)} React element
	*/
	render() {
		if ( this.state.chat === null ) {
			return null;
		}
		return (
			<Fragment>
				<button
					className="icon-button toggle-chat-button"
					title="Talk to us on Gitter!"
					aria-label="open chat"
					onClick={ this._onClick }
				>
					<ForumIcon />
				</button>
			</Fragment>
		);
	}
}


// EXPORTS //

export default Chat;
