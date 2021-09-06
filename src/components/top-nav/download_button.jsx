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
import IconButton from '@material-ui/core/IconButton';
import GetAppIcon from '@material-ui/icons/GetApp';
import CancelIcon from '@material-ui/icons/Cancel';
import fetchPackageList from './../../utils/fetch_package_list.js';
import packageList from './../../utils/package_list.js';
import download from './../../utils/download_assets.js';
import log from './../../utils/log.js';


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
		var self = this;

		// TODO: what about other versions???
		fetchPackageList( this.props.version, clbk );

		/**
		* Callback invoked upon resolving a package list.
		*
		* @private
		* @param {(Error|null)} error - error object
		* @returns {void}
		*/
		function clbk( error ) {
			var list;
			if ( error ) {
				// TODO: display message to user that unable to download assets
				log( error.message );
				return;
			}
			list = packageList( self.props.version );
			self._download = download( list, self.props.version, self._onProgress );
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
				<IconButton
					className="icon-button top-nav-download-button"
					aria-label="cancel download"
					title="Cancel download"
					onClick={ this._onDownloadCancel }
				>
					<CancelIcon />
				</IconButton>
			);
		}
		return (
			<IconButton
				className="icon-button top-nav-download-button"
				aria-label="download documentation for offline access"
				title="Download documentation for offline access"
				onClick={ this._onDownloadClick }
			>
				<GetAppIcon />
			</IconButton>
		);
	}
}



// EXPORTS //

export default DownloadButton;
