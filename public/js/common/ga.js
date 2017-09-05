/*
* Original implementation attributed to Schalk Neethling (see {@link https://github.com/schalkneethling/dnt-helper}). The embedded license applies strictly to the `dnt()` function.
*
* The implementation, as included here, has been modified from the original.
*/

/*
The MIT License (MIT)

Copyright (c) 2015 Schalk Neethling

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
(function script() {
	var RE_WINDOWS = /Windows.+?(?=;)/g; // matches from Windows up to the first occurrence of `;` non-greedily
	var RE_FIREFOX = /Firefox\/(\d+)/;
	var RE_IE = /MSIE|Trident/i;

	// List of Windows versions known to not implement DNT according to the standard.
	var anomalousWinVersions = [
		'Windows NT 6.1',
		'Windows NT 6.2',
		'Windows NT 6.3'
	];

	/**
	* Returns a boolean indicating whether `doNotTack` (DNT) is enabled.
	*
	* ## Notes
	*
	* * The function takes into account anomalies, such as !bugzilla 887703, which affect versions of Firefox 31 and lower.
	* * The function handles IE versions on Windows 7, 8 and 8.1, where the DNT implementation does not honor the spec.
	*
	*
	* [1]: https://bugzilla.mozilla.org/show_bug.cgi?id=1217896
	* [2]: link http://schalkneethling.github.io/blog/2015/11/06/respect-user-choice-do-not-track/
	* [3]: https://github.com/schalkneethling/dnt-helper/blob/master/js/dnt-helper.js
	*
	* @private
	* @returns {boolean} boolean indicating whether `doNotTrack` is enabled
	*/
	function dnt() {
		'use strict';

		var platform;
		var status;
		var lookup;
		var match;
		var isIE;
		var ua;

		// Browser value lookup table:
		lookup = {
			'0': false, // disabled
			'1': true // enabled
		};

		// For old versions of IE, we need to use the `msDoNotTrack` property of `navigator`. On newer versions, and newer platforms, this is `doNotTrack` but, on the `window` object. Safari also exposes the property on the `window` object.
		status = navigator.doNotTrack || window.doNotTrack || navigator.msDoNotTrack;
		ua = navigator.userAgent;

		isIE = RE_IE.test( ua );

		// With old versions of IE, DNT did not exist so we simply return false;
		if ( isIE && typeof Array.prototype.indexOf !== 'function') {
			return false;
		}
		match = ua.match( RE_FIREFOX );
		if ( match && parseInt( match[ 1 ], 10 ) < 32 ) {
			// Cannot say for sure if it is 1 or 0, due to Firefox bug 887703...
			return false; // "Unspecified"
		}
		platform = ua.match( RE_WINDOWS );
		if ( isIE && platform && anomalousWinVersions.indexOf( platform[ 0 ] ) !== -1 ) {
			// Default is on, which does not honor the specification...
			return false; // "Unspecified"
		}
		status = lookup[ status ];
		if ( status === void 0 ) {
			return false;
		}
		return true;
	}

	if ( dnt() === false ) {
		(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
		  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
		  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
		  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

		ga( 'create', 'UA-105890493-1', 'auto' );
		ga( 'send', 'pageview' );
	}
})();
