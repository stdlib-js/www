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
import viewportWidth from './../../utils/viewport_width.js';
import ForumIcon from './../icons/forum.jsx';
import CloseIcon from './../icons/close.jsx';


// VARIABLES //

var APPEND_SCRIPT_DELAY = 5000; // 5 seconds
var SCRIPT_URL = '/js/common/gitter_sidecar.min.js';
var ROOM = 'stdlib-js/stdlib';


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
			// Reference to the chat application constructor:
			'Chat': null,

			// Reference to the chat application:
			'chat': null,

			// Boolean indicating whether the chat is currently open:
			'open': false
		};
	}

	/**
	* Callback invoked once a chat application is ready.
	*
	* @private
	* @param {Object} event - event object
	*/
	_onChatReady = ( event ) => {
		this.setState({
			'Chat': event.detail.Chat
		});
	}

	/**
	* Callback invoked upon clicking the chat button.
	*
	* @private
	* @param {Object} event - event object
	*/
	_onClick = () => {
		var bool;
		var chat;

		// Toggle the open state:
		bool = !this.state.open;

		// Determine whether we need to open the chat...
		if ( bool ) {
			chat = new this.state.Chat({
				'room': ROOM
			});
		} else {
			this.state.chat.destroy();
			chat = null;
		}
		this.setState({
			'open': bool,
			'chat': chat
		});
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
			setTimeout( onTimeout, APPEND_SCRIPT_DELAY );
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
			script.src = SCRIPT_URL;
			script.async = true;
			script.defer = true;

			// Append the script to the document body:
			document.body.appendChild( script );

			// Cache a reference to the created DOM node:
			self._$script = script;

			// Listen for when the chat application is ready:
			document.addEventListener( 'gitter-sidecar-ready', self._onChatReady );
		}
	}

	/**
	* Callback invoked immediately before a component is unmounted and destroyed.
	*
	* @private
	*/
	componentWillUnmount() {
		document.body.removeChild( this._$script );
		document.removeEventListener( 'gitter-sidecar-ready', this._onChatReady );
	}

	/**
	* Renders the component.
	*
	* @private
	* @returns {(ReactElement|null)} React element
	*/
	render() {
		if ( this.state.Chat === null ) {
			return null;
		}
		return (
			<button
				className="icon-button toggle-chat-button"
				title="Talk to us on Gitter!"
				aria-label={ ( this.state.open ) ? 'close chat' : 'open chat' }
				onClick={ this._onClick }
			>
				{ ( this.state.open ) ? <CloseIcon /> : <ForumIcon /> }
			</button
			>
		);
	}
}


// EXPORTS //

export default Chat;
