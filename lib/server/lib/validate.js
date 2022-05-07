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

'use strict';

// MODULES //

var hasOwnProp = require( '@stdlib/assert/has-own-property' );
var isObject = require( '@stdlib/assert/is-plain-object' );
var isNonNegativeInteger = require( '@stdlib/assert/is-nonnegative-integer' ).isPrimitive;
var isString = require( '@stdlib/assert/is-string' ).isPrimitive;
var isStringArray = require( '@stdlib/assert/is-string-array' ).primitives;
var isBoolean = require( '@stdlib/assert/is-boolean' ).isPrimitive;
var format = require( '@stdlib/string/format' );


// MAIN //

/**
* Validates function options.
*
* @private
* @param {Object} opts - destination object
* @param {Options} options - function options
* @param {string} [options.address] - server address
* @param {string} [options.hostname] - server hostname
* @param {string} [options.latest] - latest documentation version
* @param {(boolean|string)} [options.logger] - either boolean indicating whether to enable logging or a log level
* @param {NonNegativeInteger} [options.port] - server port
* @param {(string|StringArray)} [options.prefix] - URL path prefix(es) used to create a virtual mount path(s) for static directories
* @param {string} [options.root] - root documentation directory
* @param {(string|StringArray)} [options.static] - path of the directory (or directories) containing static files to serve
* @param {boolean} [options.trustProxy] - boolean indicating whether to trust `X-forwarded-by` headers when the server is sitting behind a proxy
* @param {boolean} [options.ignoreTrailingSlash] - boolean indicating whether to ignore trailing slashes in routes
* @returns {(Error|null)} error or null
*
* @example
* var options = {
*     'port': 7331,
*     'address': '127.0.0.1'
* };
* var opts = {};
* var err = validate( opts, options );
* if ( err ) {
*     throw err;
* }
*/
function validate( opts, options ) {
	if ( !isObject( options ) ) {
		return new TypeError( format( 'invalid argument. Options argument must be an object. Value: `%s.`', options ) );
	}
	if ( hasOwnProp( options, 'address' ) ) {
		opts.address = options.address;
		if ( !isString( opts.address ) ) {
			return new TypeError( format( 'invalid option. `address` option must be a string. Option: `%s`.', opts.address ) );
		}
	}
	if ( hasOwnProp( options, 'hostname' ) ) {
		opts.hostname = options.hostname;
		if ( !isString( opts.hostname ) ) {
			return new TypeError( format( 'invalid option. `hostname` option must be a string. Option: `%s`.', opts.hostname ) );
		}
	}
	if ( hasOwnProp( options, 'latest' ) ) {
		opts.latest = options.latest;
		if ( !isString( opts.latest ) ) {
			return new TypeError( format( 'invalid option. `latest` option must be a string. Option: `%s`.', opts.latest ) );
		}
	}
	if ( hasOwnProp( options, 'logger' ) ) {
		opts.logger = options.logger;
		if ( isString( opts.logger ) ) {
			opts.logger = {
				'level': opts.logger
			};
		} else if ( !isBoolean( opts.logger ) ) {
			return new TypeError( format( 'invalid option. `logger` option must be either a boolean or a string. Option: `%s`.', opts.logger ) );
		}
	}
	if ( hasOwnProp( options, 'port' ) ) {
		opts.port = options.port;
		if ( !isNonNegativeInteger( opts.port ) ) {
			return new TypeError( format( 'invalid option. `port` must be a nonnegative integer. Option: `%s`.', opts.port ) );
		}
	}
	if ( hasOwnProp( options, 'prefix' ) ) {
		opts.prefix = options.prefix;
		if ( !isString( opts.prefix ) && !isStringArray( opts.prefix ) ) {
			return new TypeError( format( 'invalid option. `prefix` option must be either a string or an array of strings. Option: `%s`.', opts.prefix ) );
		}
	}
	if ( hasOwnProp( options, 'root' ) ) {
		opts.root = options.root;
		if ( !isString( opts.root ) ) {
			return new TypeError( format( 'invalid option. `root` option must be a string. Option: `%s`.', opts.root ) );
		}
	}
	if ( hasOwnProp( options, 'static' ) ) {
		opts.static = options.static;
		if ( !isString( opts.static ) && !isStringArray( opts.static ) ) {
			return new TypeError( format( 'invalid option. `static` option must be either a string or an array of strings. Option: `%s`.', opts.static ) );
		}
	}
	if ( hasOwnProp( options, 'trustProxy' ) ) {
		opts.trustProxy = options.trustProxy;
		if ( !isBoolean( opts.trustProxy ) ) {
			return new TypeError( format( 'invalid option. `trustProxy` option must be a boolean. Option: `%s`.', opts.trustProxy ) );
		}
	}
	if ( hasOwnProp( options, 'ignoreTrailingSlash' ) ) {
		opts.ignoreTrailingSlash = options.ignoreTrailingSlash;
		if ( !isBoolean( opts.ignoreTrailingSlash ) ) {
			return new TypeError( format( 'invalid option. `ignoreTrailingSlash` option must be a boolean. Option: `%s`.', opts.ignoreTrailingSlash ) );
		}
	}
	return null;
}


// EXPORTS //

module.exports = validate;
