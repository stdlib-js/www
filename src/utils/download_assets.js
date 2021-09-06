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

import config from './../config.js';
import HTML_FRAGMENT_CACHE from './caches/html_fragments.js';
import fetchSearchData from './fetch_search_data.js';
import log from './log.js';


// VARIABLES //

var hasOwnProp = Object.prototype.hasOwnProperty;


// MAIN //

/**
* Returns a download "manager" for downloading package assets.
*
* @private
* @constructor
* @param {Array<string>} pkgs - list of packages
* @param {string} version - version
* @param {Function} onProgress - callback invoked to report download progress
* @returns {Download} download manager instance
*/
function Download( pkgs, version, onProgress ) {
	if ( !( this instanceof Download ) ) {
		return new Download( pkgs, version, onProgress );
	}
	this._idx = -1;
	this._pkgs = pkgs;
	this._N = pkgs.length;
	this._version = version;
	this._mount = config.mount + version + '/@stdlib/';
	this._onProgress = onProgress;
	this._canceled = false;
	this._paused = false;

	this._init();

	return this;
}

/**
* Performs initial download tasks.
*
* @private
* @name _init
* @memberof Download.prototype
* @type {Function}
*/
Download.prototype._init = function init() {
	var self = this;

	fetchSearchData( this._version, done );

	/**
	* Callback invoked upon retrieving search data.
	*
	* @private
	* @param {(Error|null)} error - error object
	* @returns {void}
	*/
	function done( error ) {
		if ( error ) {
			return log( error );
		}
		self._next();
	}
};

/**
* Downloads the next package asset.
*
* @private
* @name _next
* @memberof Download.prototype
* @type {Function}
* @returns {Download} download manager instance
*/
Download.prototype._next = function next() {
	var self;
	var path;
	var idx;
	var N;

	if ( this._canceled || this._paused ) {
		return this;
	}
	self = this;
	this._idx += 1;

	idx = this._idx;
	N = this._N;

	if ( idx >= N ) {
		this._onProgress( 100.0 );
		return this;
	}
	path = this._mount + this._pkgs[ idx ];

	// Check whether we have already fetched this asset...
	if ( hasOwnProp.call( HTML_FRAGMENT_CACHE, path ) && HTML_FRAGMENT_CACHE[ path ] ) {
		setTimeout( next, 0 ); // ensure consistent async behavior (i.e., don't release the zalgo)
		return this;
	}
	// Retrieve the HTML fragment for this package:
	fetch( path+'?fragment=true' )
		.then( onResponse )
		.then( onText )
		.catch( onError );

	return this;

	/**
	* Callback invoked upon receiving an HTTP response.
	*
	* @private
	* @param {Object} response - HTTP response
	* @returns {(Promise|void)} promise
	*/
	function onResponse( response ) {
		var err;
		if ( response.ok ) {
			return response.text();
		}
		if ( response.status === 404 ) {
			err = new Error( 'resource not found. Resource: ' + path + '.' );
		} else {
			err = new Error( 'unexpected error. Resource: ' + path + '. Status code: ' + response.status + '.' );
		}
		onError( err );
	}

	/**
	* Callback invoked upon resolving a response body as text.
	*
	* @private
	* @param {string} text - response body
	*/
	function onText( text ) {
		HTML_FRAGMENT_CACHE[ path ] = text;
		self._onProgress( ( idx/N ) * 100.0 );
		self._next();
	}

	/**
	* Callback invoked upon encountering an error while fetching a fragment.
	*
	* @private
	* @param {Error} error - error object
	*/
	function onError( error ) {
		log( error );
	}

	/**
	* Callback invoked after a subsequent turn of the event loop.
	*
	* @private
	*/
	function next() {
		self._onProgress( ( idx/N ) * 100.0 );
		self._next();
	}
};

/**
* Pauses an in-progress download.
*
* @private
* @name pause
* @memberof Download.prototype
* @type {Function}
* @returns {Download} download manager instance
*/
Download.prototype.pause = function pause() {
	this._paused = true;
	return this;
};

/**
* Resumes a paused in-progress download.
*
* @private
* @name resume
* @memberof Download.prototype
* @type {Function}
* @returns {Download} download manager instance
*/
Download.prototype.resume = function resume() {
	this._paused = false;
	return this;
};

/**
* Cancels an in-progress download.
*
* ## Notes
*
* -   Once canceled, downloads can never be resumed.
*
* @private
* @name cancel
* @memberof Download.prototype
* @type {Function}
* @returns {Download} download manager instance
*/
Download.prototype.cancel = function cancel() {
	this._canceled = true;
	return this;
};


// EXPORTS //

export default Download;
