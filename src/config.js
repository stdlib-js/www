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

// MAIN //

/**
* Application configuration.
*
* @private
* @constant
* @type {Object}
*/
const config = {
	// Base URL path for API documentation:
	'mount': '/docs/api/',

	// Supported documentation versions:
	'versions': [
		// NOTE: keep in reverse order (i.e., the latest version first)...
		'latest'
	],

	// Publicly hosted Git repository:
	'repository': 'https://github.com/stdlib-js/stdlib',

	// Twitter:
	'twitter': 'https://twitter.com/stdlibjs',

	// Gitter:
	'gitter': 'https://gitter.im/stdlib-js/stdlib',

	// Sponsorship/funding URL:
	'funding': 'https://www.patreon.com/athan',

	// Document title:
	'title': 'Documentation | stdlib',

	'description': 'Documentation for stdlib, a standard library for JavaScript and Node.js, with an emphasis on numerical and scientific computing.'
};


// EXPORTS //

export default config;
