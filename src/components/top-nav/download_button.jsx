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
import fetchDownloadData from 'fetch-download-data';
import download from 'download-assets';
import log from 'log';
import DownloadIcon from './../icons/download.jsx';
import CancelIcon from './../icons/close.jsx';


// MAIN //

/**
* Component for displaying a download button and downloading assets.
*
* @private
*/
class DownloadButton extends React.Component {
	/**
	* Returns a component for displaying a download button and downloading assets.
	*
	* @private
	* @constructor
	* @param {Object} props - component properties
	* @param {string} props.version - documentation version
	* @param {Callback} props.onProgress - callback to invoke to report download progress
	* @returns {ReactComponent} React component
	*/
	constructor( props ) {
		super( props );
		this.state = {
			'progress': 0.0
		};
		this._download = null;
	}

	/**
	* Callback invoked upon a progress update.
	*
	* @private
	* @param {number} progress - current progress
	*/
	_onProgress = ( progress ) => {
		if ( this._download ) {
			this.setState({
				'progress': progress
			});
			this.props.onProgress( progress );
		}
		// Check whether we have finished...
		if ( progress === 100.0 ) {
			this._download = null;
			this.setState({
				'progress': 0.0
			});
		}
	}

	/**
	* Callback invoked upon clicking a download button.
	*
	* @private
	* @param {Object} event - event object
	*/
	_onDownloadClick = () => {
		var version = this.props.version;
		var self = this;

		// TODO: what about other versions???
		fetchDownloadData( version, clbk );

		/**
		* Callback invoked upon resolving package data.
		*
		* @private
		* @param {(Error|null)} error - error object
		* @param {Object} data - package data
		* @returns {void}
		*/
		function clbk( error, data ) {
			if ( error ) {
				// TODO: display message to user that we are unable to download assets
				log( error.message );
				return;
			}
			self._download = download( data.packages, version, self._onProgress );
		}
	}

	/**
	* Callback invoked upon clicking a button to cancel downloading assets.
	*
	* @private
	* @param {Object} event - event object
	*/
	_onDownloadCancel = () => {
		var d = this._download;
		this._download = null;
		if ( d ) {
			d.cancel();
			this.setState({
				'progress': 0.0
			});
			this.props.onProgress( null );
		}
	}

	/**
	* Renders the component.
	*
	* @private
	* @returns {ReactElement} React element
	*/
	render() {
		if ( this.state.progress ) {
			return (
				<button
					className="icon-button top-nav-download-button"
					title="Cancel download"
					aria-label="cancel download"
					onClick={ this._onDownloadCancel }
				>
					<CancelIcon />
				</button>
			);
		}
		return (
			<button
				className="icon-button top-nav-download-button"
				title="Download documentation for offline access"
				aria-label="download documentation"
				onClick={ this._onDownloadClick }
			>
				<DownloadIcon />
			</button>
		);
	}
}

/**
* Component property types.
*
* @constant
* @name propTypes
* @memberof DownloadButton
* @type {Object}
*/
DownloadButton.propTypes = {
	'version': PropTypes.string.isRequired,
	'onProgress': PropTypes.func.isRequired
}


// EXPORTS //

export default DownloadButton;
