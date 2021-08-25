// modules are defined as an array
// [ module function, map of requireuires ]
//
// map of requireuires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the requireuire for previous bundles

(function outer (modules, cache, entry) {
    // Save the require from previous bundle to this closure if any
    var previousRequire = typeof require == "function" && require;

    function findProxyquireifyName() {
        var deps = Object.keys(modules)
            .map(function (k) { return modules[k][1]; });

        for (var i = 0; i < deps.length; i++) {
            var pq = deps[i]['proxyquireify'];
            if (pq) return pq;
        }
    }

    var proxyquireifyName = findProxyquireifyName();

    function newRequire(name, jumped){
        // Find the proxyquireify module, if present
        var pqify = (proxyquireifyName != null) && cache[proxyquireifyName];

        // Proxyquireify provides a separate cache that is used when inside
        // a proxyquire call, and is set to null outside a proxyquire call.
        // This allows the regular caching semantics to work correctly both
        // inside and outside proxyquire calls while keeping the cached
        // modules isolated.
        // When switching from one proxyquire call to another, it clears
        // the cache to prevent contamination between different sets
        // of stubs.
        var currentCache = (pqify && pqify.exports._cache) || cache;

        if(!currentCache[name]) {
            if(!modules[name]) {
                // if we cannot find the the module within our internal map or
                // cache jump to the current global require ie. the last bundle
                // that was added to the page.
                var currentRequire = typeof require == "function" && require;
                if (!jumped && currentRequire) return currentRequire(name, true);

                // If there are other bundles on this page the require from the
                // previous one is saved to 'previousRequire'. Repeat this as
                // many times as there are bundles until the module is found or
                // we exhaust the require chain.
                if (previousRequire) return previousRequire(name, true);
                var err = new Error('Cannot find module \'' + name + '\'');
                err.code = 'MODULE_NOT_FOUND';
                throw err;
            }
            var m = currentCache[name] = {exports:{}};

            // The normal browserify require function
            var req = function(x){
                var id = modules[name][1][x];
                return newRequire(id ? id : x);
            };

            // The require function substituted for proxyquireify
            var moduleRequire = function(x){
                var pqify = (proxyquireifyName != null) && cache[proxyquireifyName];
                // Only try to use the proxyquireify version if it has been `require`d
                if (pqify && pqify.exports._proxy) {
                    return pqify.exports._proxy(req, x);
                } else {
                    return req(x);
                }
            };

            modules[name][0].call(m.exports,moduleRequire,m,m.exports,outer,modules,currentCache,entry);
        }
        return currentCache[name].exports;
    }
    for(var i=0;i<entry.length;i++) newRequire(entry[i]);

    // Override the current require with this new one
    return newRequire;
})
({1:[function(require,module,exports){
(function (Buffer){(function (){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
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

// MAIN //

var main = ( typeof Buffer === 'function' ) ? Buffer : null; // eslint-disable-line stdlib/require-globals


// EXPORTS //

module.exports = main;

}).call(this)}).call(this,require("buffer").Buffer)
},{"buffer":104}],2:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
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

/**
* Test for native `Buffer` support.
*
* @module @stdlib/assert/has-node-buffer-support
*
* @example
* var hasNodeBufferSupport = require( '@stdlib/assert/has-node-buffer-support' );
*
* var bool = hasNodeBufferSupport();
* // returns <boolean>
*/

// MODULES //

var hasNodeBufferSupport = require( './main.js' );


// EXPORTS //

module.exports = hasNodeBufferSupport;

},{"./main.js":3}],3:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
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

var isBuffer = require( '@stdlib/assert/is-buffer' );
var GlobalBuffer = require( './buffer.js' );


// MAIN //

/**
* Tests for native `Buffer` support.
*
* @returns {boolean} boolean indicating if an environment has `Buffer` support
*
* @example
* var bool = hasNodeBufferSupport();
* // returns <boolean>
*/
function hasNodeBufferSupport() {
	var bool;
	var b;

	if ( typeof GlobalBuffer !== 'function' ) {
		return false;
	}
	// Test basic support...
	try {
		if ( typeof GlobalBuffer.from === 'function' ) {
			b = GlobalBuffer.from( [ 1, 2, 3, 4 ] );
		} else {
			b = new GlobalBuffer( [ 1, 2, 3, 4 ] ); // Note: this is deprecated behavior starting in Node v6 (see https://nodejs.org/api/buffer.html#buffer_new_buffer_array)
		}
		bool = (
			isBuffer( b ) &&
			b[ 0 ] === 1 &&
			b[ 1 ] === 2 &&
			b[ 2 ] === 3 &&
			b[ 3 ] === 4
		);
	} catch ( err ) { // eslint-disable-line no-unused-vars
		bool = false;
	}
	return bool;
}


// EXPORTS //

module.exports = hasNodeBufferSupport;

},{"./buffer.js":1,"@stdlib/assert/is-buffer":19}],4:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
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

/**
* Test whether an object has a specified property.
*
* @module @stdlib/assert/has-own-property
*
* @example
* var hasOwnProp = require( '@stdlib/assert/has-own-property' );
*
* var beep = {
*     'boop': true
* };
*
* var bool = hasOwnProp( beep, 'boop' );
* // returns true
*
* bool = hasOwnProp( beep, 'bop' );
* // returns false
*/

// MODULES //

var hasOwnProp = require( './main.js' );


// EXPORTS //

module.exports = hasOwnProp;

},{"./main.js":5}],5:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
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

// FUNCTIONS //

var has = Object.prototype.hasOwnProperty;


// MAIN //

/**
* Tests if an object has a specified property.
*
* @param {*} value - value to test
* @param {*} property - property to test
* @returns {boolean} boolean indicating if an object has a specified property
*
* @example
* var beep = {
*     'boop': true
* };
*
* var bool = hasOwnProp( beep, 'boop' );
* // returns true
*
* @example
* var beep = {
*     'boop': true
* };
*
* var bool = hasOwnProp( beep, 'bap' );
* // returns false
*/
function hasOwnProp( value, property ) {
	if (
		value === void 0 ||
		value === null
	) {
		return false;
	}
	return has.call( value, property );
}


// EXPORTS //

module.exports = hasOwnProp;

},{}],6:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
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

/**
* Test for native `Symbol` support.
*
* @module @stdlib/assert/has-symbol-support
*
* @example
* var hasSymbolSupport = require( '@stdlib/assert/has-symbol-support' );
*
* var bool = hasSymbolSupport();
* // returns <boolean>
*/

// MODULES //

var hasSymbolSupport = require( './main.js' );


// EXPORTS //

module.exports = hasSymbolSupport;

},{"./main.js":7}],7:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
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

// MAIN //

/**
* Tests for native `Symbol` support.
*
* @returns {boolean} boolean indicating if an environment has `Symbol` support
*
* @example
* var bool = hasSymbolSupport();
* // returns <boolean>
*/
function hasSymbolSupport() {
	return (
		typeof Symbol === 'function' &&
		typeof Symbol( 'foo' ) === 'symbol'
	);
}


// EXPORTS //

module.exports = hasSymbolSupport;

},{}],8:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
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

/**
* Test for native `toStringTag` support.
*
* @module @stdlib/assert/has-tostringtag-support
*
* @example
* var hasToStringTagSupport = require( '@stdlib/assert/has-tostringtag-support' );
*
* var bool = hasToStringTagSupport();
* // returns <boolean>
*/

// MODULES //

var hasToStringTagSupport = require( './main.js' );


// EXPORTS //

module.exports = hasToStringTagSupport;

},{"./main.js":9}],9:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
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

var hasSymbols = require( '@stdlib/assert/has-symbol-support' );


// VARIABLES //

var FLG = hasSymbols();


// MAIN //

/**
* Tests for native `toStringTag` support.
*
* @returns {boolean} boolean indicating if an environment has `toStringTag` support
*
* @example
* var bool = hasToStringTagSupport();
* // returns <boolean>
*/
function hasToStringTagSupport() {
	return ( FLG && typeof Symbol.toStringTag === 'symbol' );
}


// EXPORTS //

module.exports = hasToStringTagSupport;

},{"@stdlib/assert/has-symbol-support":6}],10:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
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

/**
* Test if a value is an array.
*
* @module @stdlib/assert/is-array
*
* @example
* var isArray = require( '@stdlib/assert/is-array' );
*
* var bool = isArray( [] );
* // returns true
*
* bool = isArray( {} );
* // returns false
*/

// MODULES //

var isArray = require( './main.js' );


// EXPORTS //

module.exports = isArray;

},{"./main.js":11}],11:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
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

var nativeClass = require( '@stdlib/utils/native-class' );


// VARIABLES //

var f;


// FUNCTIONS //

/**
* Tests if a value is an array.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating whether value is an array
*
* @example
* var bool = isArray( [] );
* // returns true
*
* @example
* var bool = isArray( {} );
* // returns false
*/
function isArray( value ) {
	return ( nativeClass( value ) === '[object Array]' );
}


// MAIN //

if ( Array.isArray ) {
	f = Array.isArray;
} else {
	f = isArray;
}


// EXPORTS //

module.exports = f;

},{"@stdlib/utils/native-class":72}],12:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
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

/**
* Test if a value is a boolean.
*
* @module @stdlib/assert/is-boolean
*
* @example
* var isBoolean = require( '@stdlib/assert/is-boolean' );
*
* var bool = isBoolean( false );
* // returns true
*
* bool = isBoolean( new Boolean( false ) );
* // returns true
*
* @example
* // Use interface to check for boolean primitives...
* var isBoolean = require( '@stdlib/assert/is-boolean' ).isPrimitive;
*
* var bool = isBoolean( false );
* // returns true
*
* bool = isBoolean( new Boolean( true ) );
* // returns false
*
* @example
* // Use interface to check for boolean objects...
* var isBoolean = require( '@stdlib/assert/is-boolean' ).isObject;
*
* var bool = isBoolean( true );
* // returns false
*
* bool = isBoolean( new Boolean( false ) );
* // returns true
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-nonenumerable-read-only-property' );
var isBoolean = require( './main.js' );
var isPrimitive = require( './primitive.js' );
var isObject = require( './object.js' );


// MAIN //

setReadOnly( isBoolean, 'isPrimitive', isPrimitive );
setReadOnly( isBoolean, 'isObject', isObject );


// EXPORTS //

module.exports = isBoolean;

},{"./main.js":13,"./object.js":14,"./primitive.js":15,"@stdlib/utils/define-nonenumerable-read-only-property":59}],13:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
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

var isPrimitive = require( './primitive.js' );
var isObject = require( './object.js' );


// MAIN //

/**
* Tests if a value is a boolean.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating whether value is a boolean
*
* @example
* var bool = isBoolean( false );
* // returns true
*
* @example
* var bool = isBoolean( true );
* // returns true
*
* @example
* var bool = isBoolean( new Boolean( false ) );
* // returns true
*
* @example
* var bool = isBoolean( new Boolean( true ) );
* // returns true
*/
function isBoolean( value ) {
	return ( isPrimitive( value ) || isObject( value ) );
}


// EXPORTS //

module.exports = isBoolean;

},{"./object.js":14,"./primitive.js":15}],14:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
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

var hasToStringTag = require( '@stdlib/assert/has-tostringtag-support' );
var nativeClass = require( '@stdlib/utils/native-class' );
var test = require( './try2serialize.js' );


// VARIABLES //

var FLG = hasToStringTag();


// MAIN //

/**
* Tests if a value is a boolean object.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating if a value is a boolean object
*
* @example
* var bool = isBoolean( true );
* // returns false
*
* @example
* var bool = isBoolean( new Boolean( false ) );
* // returns true
*/
function isBoolean( value ) {
	if ( typeof value === 'object' ) {
		if ( value instanceof Boolean ) {
			return true;
		}
		if ( FLG ) {
			return test( value );
		}
		return ( nativeClass( value ) === '[object Boolean]' );
	}
	return false;
}


// EXPORTS //

module.exports = isBoolean;

},{"./try2serialize.js":17,"@stdlib/assert/has-tostringtag-support":8,"@stdlib/utils/native-class":72}],15:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
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

/**
* Tests if a value is a boolean primitive.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating if a value is a boolean primitive
*
* @example
* var bool = isBoolean( true );
* // returns true
*
* @example
* var bool = isBoolean( false );
* // returns true
*
* @example
* var bool = isBoolean( new Boolean( true ) );
* // returns false
*/
function isBoolean( value ) {
	return ( typeof value === 'boolean' );
}


// EXPORTS //

module.exports = isBoolean;

},{}],16:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
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

// eslint-disable-next-line stdlib/no-redeclare
var toString = Boolean.prototype.toString; // non-generic


// EXPORTS //

module.exports = toString;

},{}],17:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
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

var toString = require( './tostring.js' ); // eslint-disable-line stdlib/no-redeclare


// MAIN //

/**
* Attempts to serialize a value to a string.
*
* @private
* @param {*} value - value to test
* @returns {boolean} boolean indicating if a value can be serialized
*/
function test( value ) {
	try {
		toString.call( value );
		return true;
	} catch ( err ) { // eslint-disable-line no-unused-vars
		return false;
	}
}


// EXPORTS //

module.exports = test;

},{"./tostring.js":16}],18:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
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

// EXPORTS //

module.exports = true;

},{}],19:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
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

/**
* Test if a value is a Buffer instance.
*
* @module @stdlib/assert/is-buffer
*
* @example
* var isBuffer = require( '@stdlib/assert/is-buffer' );
*
* var v = isBuffer( new Buffer( 'beep' ) );
* // returns true
*
* v = isBuffer( {} );
* // returns false
*/

// MODULES //

var isBuffer = require( './main.js' );


// EXPORTS //

module.exports = isBuffer;

},{"./main.js":20}],20:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
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

var isObjectLike = require( '@stdlib/assert/is-object-like' );


// MAIN //

/**
* Tests if a value is a Buffer instance.
*
* @param {*} value - value to validate
* @returns {boolean} boolean indicating if a value is a Buffer instance
*
* @example
* var v = isBuffer( new Buffer( 'beep' ) );
* // returns true
*
* @example
* var v = isBuffer( new Buffer( [1,2,3,4] ) );
* // returns true
*
* @example
* var v = isBuffer( {} );
* // returns false
*
* @example
* var v = isBuffer( [] );
* // returns false
*/
function isBuffer( value ) {
	return (
		isObjectLike( value ) &&
		(
			// eslint-disable-next-line no-underscore-dangle
			value._isBuffer || // for envs missing Object.prototype.constructor (e.g., Safari 5-7)
			(
				value.constructor &&

				// WARNING: `typeof` is not a foolproof check, as certain envs consider RegExp and NodeList instances to be functions
				typeof value.constructor.isBuffer === 'function' &&
				value.constructor.isBuffer( value )
			)
		)
	);
}


// EXPORTS //

module.exports = isBuffer;

},{"@stdlib/assert/is-object-like":23}],21:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
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

/**
* Test if a value is a function.
*
* @module @stdlib/assert/is-function
*
* @example
* var isFunction = require( '@stdlib/assert/is-function' );
*
* function beep() {
*     return 'beep';
* }
*
* var bool = isFunction( beep );
* // returns true
*/

// MODULES //

var isFunction = require( './main.js' );


// EXPORTS //

module.exports = isFunction;

},{"./main.js":22}],22:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
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

var typeOf = require( '@stdlib/utils/type-of' );


// MAIN //

/**
* Tests if a value is a function.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating whether value is a function
*
* @example
* function beep() {
*     return 'beep';
* }
*
* var bool = isFunction( beep );
* // returns true
*/
function isFunction( value ) {
	// Note: cannot use `typeof` directly, as various browser engines incorrectly return `'function'` when operating on non-function objects, such as regular expressions and NodeLists.
	return ( typeOf( value ) === 'function' );
}


// EXPORTS //

module.exports = isFunction;

},{"@stdlib/utils/type-of":81}],23:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
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

/**
* Test if a value is object-like.
*
* @module @stdlib/assert/is-object-like
*
* @example
* var isObjectLike = require( '@stdlib/assert/is-object-like' );
*
* var bool = isObjectLike( {} );
* // returns true
*
* bool = isObjectLike( [] );
* // returns true
*
* bool = isObjectLike( null );
* // returns false
*
* @example
* var isObjectLike = require( '@stdlib/assert/is-object-like' ).isObjectLikeArray;
*
* var bool = isObjectLike( [ {}, [] ] );
* // returns true
*
* bool = isObjectLike( [ {}, '3.0' ] );
* // returns false
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-nonenumerable-read-only-property' );
var arrayfun = require( '@stdlib/assert/tools/array-function' );
var isObjectLike = require( './main.js' );


// MAIN //

setReadOnly( isObjectLike, 'isObjectLikeArray', arrayfun( isObjectLike ) );


// EXPORTS //

module.exports = isObjectLike;

},{"./main.js":24,"@stdlib/assert/tools/array-function":33,"@stdlib/utils/define-nonenumerable-read-only-property":59}],24:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
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

/**
* Tests if a value is object-like.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating whether a value is object-like
*
* @example
* var bool = isObjectLike( {} );
* // returns true
*
* @example
* var bool = isObjectLike( [] );
* // returns true
*
* @example
* var bool = isObjectLike( null );
* // returns false
*/
function isObjectLike( value ) {
	return (
		value !== null &&
		typeof value === 'object'
	);
}


// EXPORTS //

module.exports = isObjectLike;

},{}],25:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
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

/**
* Test if a value is a string.
*
* @module @stdlib/assert/is-string
*
* @example
* var isString = require( '@stdlib/assert/is-string' );
*
* var bool = isString( 'beep' );
* // returns true
*
* bool = isString( new String( 'beep' ) );
* // returns true
*
* bool = isString( 5 );
* // returns false
*
* @example
* var isString = require( '@stdlib/assert/is-string' ).isObject;
*
* var bool = isString( new String( 'beep' ) );
* // returns true
*
* bool = isString( 'beep' );
* // returns false
*
* @example
* var isString = require( '@stdlib/assert/is-string' ).isPrimitive;
*
* var bool = isString( 'beep' );
* // returns true
*
* bool = isString( new String( 'beep' ) );
* // returns false
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-nonenumerable-read-only-property' );
var isString = require( './main.js' );
var isPrimitive = require( './primitive.js' );
var isObject = require( './object.js' );


// MAIN //

setReadOnly( isString, 'isPrimitive', isPrimitive );
setReadOnly( isString, 'isObject', isObject );


// EXPORTS //

module.exports = isString;

},{"./main.js":26,"./object.js":27,"./primitive.js":28,"@stdlib/utils/define-nonenumerable-read-only-property":59}],26:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
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

var isPrimitive = require( './primitive.js' );
var isObject = require( './object.js' );


// MAIN //

/**
* Tests if a value is a string.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating whether value is a string
*
* @example
* var bool = isString( new String( 'beep' ) );
* // returns true
*
* @example
* var bool = isString( 'beep' );
* // returns true
*/
function isString( value ) {
	return ( isPrimitive( value ) || isObject( value ) );
}


// EXPORTS //

module.exports = isString;

},{"./object.js":27,"./primitive.js":28}],27:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
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

var hasToStringTag = require( '@stdlib/assert/has-tostringtag-support' );
var nativeClass = require( '@stdlib/utils/native-class' );
var test = require( './try2valueof.js' );


// VARIABLES //

var FLG = hasToStringTag();


// MAIN //

/**
* Tests if a value is a string object.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating if a value is a string object
*
* @example
* var bool = isString( new String( 'beep' ) );
* // returns true
*
* @example
* var bool = isString( 'beep' );
* // returns false
*/
function isString( value ) {
	if ( typeof value === 'object' ) {
		if ( value instanceof String ) {
			return true;
		}
		if ( FLG ) {
			return test( value );
		}
		return ( nativeClass( value ) === '[object String]' );
	}
	return false;
}


// EXPORTS //

module.exports = isString;

},{"./try2valueof.js":29,"@stdlib/assert/has-tostringtag-support":8,"@stdlib/utils/native-class":72}],28:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
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

/**
* Tests if a value is a string primitive.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating if a value is a string primitive
*
* @example
* var bool = isString( 'beep' );
* // returns true
*
* @example
* var bool = isString( new String( 'beep' ) );
* // returns false
*/
function isString( value ) {
	return ( typeof value === 'string' );
}


// EXPORTS //

module.exports = isString;

},{}],29:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
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

var valueOf = require( './valueof.js' ); // eslint-disable-line stdlib/no-redeclare


// MAIN //

/**
* Attempts to extract a string value.
*
* @private
* @param {*} value - value to test
* @returns {boolean} boolean indicating if a string can be extracted
*/
function test( value ) {
	try {
		valueOf.call( value );
		return true;
	} catch ( err ) { // eslint-disable-line no-unused-vars
		return false;
	}
}


// EXPORTS //

module.exports = test;

},{"./valueof.js":30}],30:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
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

// eslint-disable-next-line stdlib/no-redeclare
var valueOf = String.prototype.valueOf; // non-generic


// EXPORTS //

module.exports = valueOf;

},{}],31:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
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

/**
* Boolean indicating if the current process is running on Windows.
*
* @module @stdlib/assert/is-windows
* @type {boolean}
*
* @example
* var PLATFORM = require( '@stdlib/os/platform' );
* var IS_WINDOWS = require( '@stdlib/assert/is-windows' );
*
* if ( IS_WINDOWS ) {
*     console.log( 'Running on Windows...' );
* } else {
*     console.log( 'Running on %s...', PLATFORM );
* }
*/

// MODULES //

var PLATFORM = require( '@stdlib/os/platform' );


// MAIN //

/**
* Boolean indicating if the current process is running on Windows.
*
* @constant
* @type {boolean}
*/
var IS_WINDOWS = ( PLATFORM === 'win32' );


// EXPORTS //

module.exports = IS_WINDOWS;

},{"@stdlib/os/platform":52}],32:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
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

var isArray = require( '@stdlib/assert/is-array' );


// MAIN //

/**
* Returns a function which tests if every element in an array passes a test condition.
*
* @param {Function} predicate - function to apply
* @throws {TypeError} must provide a function
* @returns {Function} an array function
*
* @example
* var isOdd = require( '@stdlib/assert/is-odd' );
*
* var arr1 = [ 1, 3, 5, 7 ];
* var arr2 = [ 3, 5, 8 ];
*
* var validate = arrayfcn( isOdd );
*
* var bool = validate( arr1 );
* // returns true
*
* bool = validate( arr2 );
* // returns false
*/
function arrayfcn( predicate ) {
	if ( typeof predicate !== 'function' ) {
		throw new TypeError( 'invalid argument. Must provide a function. Value: `' + predicate + '`.' );
	}
	return every;

	/**
	* Tests if every element in an array passes a test condition.
	*
	* @private
	* @param {*} value - value to test
	* @returns {boolean} boolean indicating whether a value is an array for which all elements pass a test condition
	*/
	function every( value ) {
		var len;
		var i;
		if ( !isArray( value ) ) {
			return false;
		}
		len = value.length;
		if ( len === 0 ) {
			return false;
		}
		for ( i = 0; i < len; i++ ) {
			if ( predicate( value[ i ] ) === false ) {
				return false;
			}
		}
		return true;
	}
}


// EXPORTS //

module.exports = arrayfcn;

},{"@stdlib/assert/is-array":10}],33:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
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

/**
* Return a function which tests if every element in an array passes a test condition.
*
* @module @stdlib/assert/tools/array-function
*
* @example
* var isOdd = require( '@stdlib/assert/is-odd' );
* var arrayfcn = require( '@stdlib/assert/tools/array-function' );
*
* var arr1 = [ 1, 3, 5, 7 ];
* var arr2 = [ 3, 5, 8 ];
*
* var validate = arrayfcn( isOdd );
*
* var bool = validate( arr1 );
* // returns true
*
* bool = validate( arr2 );
* // returns false
*/

// MODULES //

var arrayfcn = require( './arrayfcn.js' );


// EXPORTS //

module.exports = arrayfcn;

},{"./arrayfcn.js":32}],34:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
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

// MAIN //

var ctor = require( 'buffer' ).Buffer; // eslint-disable-line stdlib/require-globals


// EXPORTS //

module.exports = ctor;

},{"buffer":104}],35:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
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

/**
* Buffer constructor.
*
* @module @stdlib/buffer/ctor
*
* @example
* var ctor = require( '@stdlib/buffer/ctor' );
*
* var b = new ctor( [ 1, 2, 3, 4 ] );
* // returns <Buffer>
*/

// MODULES //

var hasNodeBufferSupport = require( '@stdlib/assert/has-node-buffer-support' );
var main = require( './buffer.js' );
var polyfill = require( './polyfill.js' );


// MAIN //

var ctor;
if ( hasNodeBufferSupport() ) {
	ctor = main;
} else {
	ctor = polyfill;
}


// EXPORTS //

module.exports = ctor;

},{"./buffer.js":34,"./polyfill.js":36,"@stdlib/assert/has-node-buffer-support":2}],36:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
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

// TODO: write (browser) polyfill

// MAIN //

/**
* Buffer constructor.
*
* @throws {Error} not implemented
*/
function polyfill() {
	throw new Error( 'not implemented' );
}


// EXPORTS //

module.exports = polyfill;

},{}],37:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
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

var isFunction = require( '@stdlib/assert/is-function' );
var Buffer = require( '@stdlib/buffer/ctor' );


// MAIN //

var bool = isFunction( Buffer.from );


// EXPORTS //

module.exports = bool;

},{"@stdlib/assert/is-function":21,"@stdlib/buffer/ctor":35}],38:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
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

/**
* Allocate a buffer containing a provided string.
*
* @module @stdlib/buffer/from-string
*
* @example
* var string2buffer = require( '@stdlib/buffer/from-string' );
*
* var buf = string2buffer( 'beep boop' );
* // returns <Buffer>
*/

// MODULES //

var hasFrom = require( './has_from.js' );
var main = require( './main.js' );
var polyfill = require( './polyfill.js' );


// MAIN //

var string2buffer;
if ( hasFrom ) {
	string2buffer = main;
} else {
	string2buffer = polyfill;
}


// EXPORTS //

module.exports = string2buffer;

},{"./has_from.js":37,"./main.js":39,"./polyfill.js":40}],39:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
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

var isString = require( '@stdlib/assert/is-string' ).isPrimitive;
var Buffer = require( '@stdlib/buffer/ctor' );


// MAIN //

/**
* Allocates a buffer containing a provided string.
*
* @param {string} str - input string
* @param {string} [encoding="utf8"] - character encoding
* @throws {TypeError} first argument must be a string
* @throws {TypeError} second argument must be a string
* @throws {TypeError} second argument must be a valid encoding
* @returns {Buffer} new `Buffer` instance
*
* @example
* var buf = fromString( 'beep boop' );
* // returns <Buffer>
*/
function fromString( str, encoding ) {
	if ( !isString( str ) ) {
		throw new TypeError( 'invalid argument. First argument must be a string. Value: `' + str + '`' );
	}
	if ( arguments.length > 1 ) {
		if ( !isString( encoding ) ) {
			throw new TypeError( 'invalid argument. Second argument must be a string. Value: `' + encoding + '`' );
		}
		return Buffer.from( str, encoding );
	}
	return Buffer.from( str, 'utf8' );
}


// EXPORTS //

module.exports = fromString;

},{"@stdlib/assert/is-string":25,"@stdlib/buffer/ctor":35}],40:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
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

var isString = require( '@stdlib/assert/is-string' ).isPrimitive;
var Buffer = require( '@stdlib/buffer/ctor' );


// MAIN //

/**
* Allocates a buffer containing a provided string.
*
* @param {string} str - input string
* @param {string} [encoding="utf8"] - character encoding
* @throws {TypeError} first argument must be a string
* @throws {TypeError} second argument must be a string
* @throws {TypeError} second argument must be a valid encoding
* @returns {Buffer} new `Buffer` instance
*
* @example
* var buf = fromString( 'beep boop' );
* // returns <Buffer>
*/
function fromString( str, encoding ) {
	if ( !isString( str ) ) {
		throw new TypeError( 'invalid argument. First argument must be a string. Value: `' + str + '`' );
	}
	if ( arguments.length > 1 ) {
		if ( !isString( encoding ) ) {
			throw new TypeError( 'invalid argument. Second argument must be a string. Value: `' + encoding + '`' );
		}
		return new Buffer( str, encoding ); // eslint-disable-line no-buffer-constructor
	}
	return new Buffer( str, 'utf8' ); // eslint-disable-line no-buffer-constructor
}


// EXPORTS //

module.exports = fromString;

},{"@stdlib/assert/is-string":25,"@stdlib/buffer/ctor":35}],41:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
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

var string2buffer = require( '@stdlib/buffer/from-string' );
var data = require( './data.js' );


// MAIN //

/**
* Returns twenty-four views of a house cat.
*
* @returns {Buffer} image
*
* @example
* var img = image();
* // returns <Buffer>
*/
function image() {
	return string2buffer( data, 'base64' );
}


// EXPORTS //

module.exports = image;

},{"./data.js":42,"@stdlib/buffer/from-string":38}],42:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
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

var data = '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YWN0SW5mbyByZGY6cGFyc2VUeXBlPSdSZXNvdXJjZSc+CiAgIDxJcHRjNHhtcENvcmU6Q2lBZHJDaXR5PkxvcyBBbmdlbGVzPC9JcHRjNHhtcENvcmU6Q2lBZHJDaXR5PgogICA8SXB0YzR4bXBDb3JlOkNpQWRyQ3RyeT5Vbml0ZWQgU3RhdGVzPC9JcHRjNHhtcENvcmU6Q2lBZHJDdHJ5PgogICA8SXB0YzR4bXBDb3JlOkNpQWRyRXh0YWRyPjEyMDAgR2V0dHkgQ2VudGVyIERyaXZlPC9JcHRjNHhtcENvcmU6Q2lBZHJFeHRhZHI+CiAgIDxJcHRjNHhtcENvcmU6Q2lBZHJQY29kZT45MDA0OTwvSXB0YzR4bXBDb3JlOkNpQWRyUGNvZGU+CiAgIDxJcHRjNHhtcENvcmU6Q2lBZHJSZWdpb24+Q2FsaWZvcm5pYTwvSXB0YzR4bXBDb3JlOkNpQWRyUmVnaW9uPgogICA8SXB0YzR4bXBDb3JlOkNpRW1haWxXb3JrPnJpZ2h0c0BnZXR0eS5lZHU8L0lwdGM0eG1wQ29yZTpDaUVtYWlsV29yaz4KICAgPElwdGM0eG1wQ29yZTpDaVVybFdvcms+d3d3LmdldHR5LmVkdTwvSXB0YzR4bXBDb3JlOkNpVXJsV29yaz4KICA8L0lwdGM0eG1wQ29yZTpDcmVhdG9yQ29udGFjdEluZm8+CiA8L3JkZjpEZXNjcmlwdGlvbj4KCiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0nJwogIHhtbG5zOklwdGM0eG1wRXh0PSdodHRwOi8vaXB0Yy5vcmcvc3RkL0lwdGM0eG1wRXh0LzIwMDgtMDItMjkvJz4KICA8SXB0YzR4bXBFeHQ6QXJ0d29ya09yT2JqZWN0PgogICA8cmRmOkJhZz4KICAgIDxyZGY6bGkgcmRmOnBhcnNlVHlwZT0nUmVzb3VyY2UnPgogICAgIDxJcHRjNHhtcEV4dDpBT0NyZWF0b3I+CiAgICAgIDxyZGY6U2VxPgogICAgICAgPHJkZjpsaT5FYWR3ZWFyZCBKLiBNdXlicmlkZ2U8L3JkZjpsaT4KICAgICAgPC9yZGY6U2VxPgogICAgIDwvSXB0YzR4bXBFeHQ6QU9DcmVhdG9yPgogICAgIDxJcHRjNHhtcEV4dDpBT0RhdGVDcmVhdGVkPjE4ODc8L0lwdGM0eG1wRXh0OkFPRGF0ZUNyZWF0ZWQ+CiAgICAgPElwdGM0eG1wRXh0OkFPU291cmNlPlRoZSBKLiBQYXVsIEdldHR5IE11c2V1bSwgTG9zIEFuZ2VsZXM8L0lwdGM0eG1wRXh0OkFPU291cmNlPgogICAgIDxJcHRjNHhtcEV4dDpBT1NvdXJjZUludk5vPjg0LlhNLjYyOC41NjwvSXB0YzR4bXBFeHQ6QU9Tb3VyY2VJbnZObz4KICAgICA8SXB0YzR4bXBFeHQ6QU9UaXRsZT4KICAgICAgPHJkZjpBbHQ+CiAgICAgICA8cmRmOmxpIHhtbDpsYW5nPSd4LWRlZmF1bHQnPkFuaW1hbCBMb2NvbW90aW9uPC9yZGY6bGk+CiAgICAgIDwvcmRmOkFsdD4KICAgICA8L0lwdGM0eG1wRXh0OkFPVGl0bGU+CiAgICA8L3JkZjpsaT4KICAgPC9yZGY6QmFnPgogIDwvSXB0YzR4bXBFeHQ6QXJ0d29ya09yT2JqZWN0PgogPC9yZGY6RGVzY3JpcHRpb24+CgogPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9JycKICB4bWxuczpkYz0naHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8nPgogIDxkYzpjcmVhdG9yPgogICA8cmRmOlNlcT4KICAgIDxyZGY6bGk+VGhlIEouIFBhdWwgR2V0dHkgTXVzZXVtPC9yZGY6bGk+CiAgIDwvcmRmOlNlcT4KICA8L2RjOmNyZWF0b3I+CiAgPGRjOmRlc2NyaXB0aW9uPgogICA8cmRmOkFsdD4KICAgIDxyZGY6bGkgeG1sOmxhbmc9J3gtZGVmYXVsdCc+QW5pbWFsIExvY29tb3Rpb247IEVhZHdlYXJkIEouIE11eWJyaWRnZSAoQW1lcmljYW4sIGJvcm4gRW5nbGFuZCwgMTgzMCAtIDE5MDQpOyAxODg3OyBDb2xsb3R5cGU7IDE4LjkgeCAzOC43IGNtICg3IDcvMTYgeCAxNSAxLzQgaW4uKTsgODQuWE0uNjI4LjU2PC9yZGY6bGk+CiAgIDwvcmRmOkFsdD4KICA8L2RjOmRlc2NyaXB0aW9uPgogIDxkYzp0aXRsZT4KICAgPHJkZjpBbHQ+CiAgICA8cmRmOmxpIHhtbDpsYW5nPSd4LWRlZmF1bHQnPkFuaW1hbCBMb2NvbW90aW9uPC9yZGY6bGk+CiAgIDwvcmRmOkFsdD4KICA8L2RjOnRpdGxlPgogPC9yZGY6RGVzY3JpcHRpb24+CgogPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9JycKICB4bWxuczpwaG90b3Nob3A9J2h0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8nPgogIDxwaG90b3Nob3A6U291cmNlPlRoZSBKLiBQYXVsIEdldHR5IE11c2V1bSwgTG9zIEFuZ2VsZXM8L3Bob3Rvc2hvcDpTb3VyY2U+CiA8L3JkZjpEZXNjcmlwdGlvbj4KCiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0nJwogIHhtbG5zOnhtcD0naHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyc+CiAgPHhtcDpNZXRhZGF0YURhdGU+MjAxNi0wNC0xM1QxNDo1MTozNDwveG1wOk1ldGFkYXRhRGF0ZT4KIDwvcmRmOkRlc2NyaXB0aW9uPgoKIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PScnCiAgeG1sbnM6eG1wUmlnaHRzPSdodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvcmlnaHRzLyc+CiAgPHhtcFJpZ2h0czpVc2FnZVRlcm1zPgogICA8cmRmOkFsdD4KICAgIDxyZGY6bGkgeG1sOmxhbmc9J3gtZGVmYXVsdCc+aHR0cDovL3d3dy5nZXR0eS5lZHUvbGVnYWwvaW1hZ2VfcmVxdWVzdC88L3JkZjpsaT4KICAgPC9yZGY6QWx0PgogIDwveG1wUmlnaHRzOlVzYWdlVGVybXM+CiA8L3JkZjpEZXNjcmlwdGlvbj4KPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKPD94cGFja2V0IGVuZD0ndyc/Pv/bAEMAAgEBAQEBAgEBAQICAgICBAMCAgICBQQEAwQGBQYGBgUGBgYHCQgGBwkHBgYICwgJCgoKCgoGCAsMCwoMCQoKCv/bAEMBAgICAgICBQMDBQoHBgcKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCv/AABEIAf4EAAMBEQACEQEDEQH/xAAdAAABBAMBAQAAAAAAAAAAAAAEAgMFBgEHCAAJ/8QAWxAAAQMCBAQEAgcFBgMGAgAXAQIDBAURAAYSIQcTMUEIIlFhFHEJFSMygZGhFkKxwfAkM1LR4fEXJWIYJjRDU3IZgpI1RFRzojZjZIOTwid0lKMoN6Sys8TS/8QAGgEAAwEBAQEAAAAAAAAAAAAAAAECAwQFBv/EADcRAAICAQMDAgUDAwUAAgMBAQABAhEhAxIxBBNBIlEUMmFxkVKBoQUVQiOxweHwM9EkQ/E0Yv/aAAwDAQACEQMRAD8A4TeccDw0qJt91Kj07Y8mPB6jEJdkJQXl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';


// EXPORTS //

module.exports = data;

},{}],43:[function(require,module,exports){
(function (__dirname){(function (){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
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

var resolve = require( 'path' ).resolve;
var readFile = require( '@stdlib/fs/read-file' ).sync;


// VARIABLES //

var fpath = resolve( __dirname, '..', 'data', 'image.jpg' );


// MAIN //

/**
* Returns twenty-four views of a house cat.
*
* ## Notes
*
* -   This function synchronously reads data from disk for each invocation. Such behavior is intentional and so is the avoidance of `require`. We assume that invocations are infrequent, and we want to avoid the `require` cache. This means that we allow data to be garbage collected and a user is responsible for explicitly caching data.
*
*
* @throws {Error} unable to read data
* @returns {Buffer} image
*
* @example
* var img = image();
* // returns <Buffer>
*/
function image() {
	var data = readFile( fpath );
	if ( data instanceof Error ) {
		throw data;
	}
	return data;
}


// EXPORTS //

module.exports = image;

}).call(this)}).call(this,"/lib/node_modules/@stdlib/datasets/img-locomotion-house-cat/lib")
},{"@stdlib/fs/read-file":49,"path":88}],44:[function(require,module,exports){
module.exports={
  "name": "@stdlib/datasets/img-locomotion-house-cat",
  "version": "0.0.0",
  "description": "Twenty-four views of a house cat.",
  "license": "Apache-2.0",
  "author": {
    "name": "The Stdlib Authors",
    "url": "https://github.com/stdlib-js/stdlib/graphs/contributors"
  },
  "contributors": [
    {
      "name": "The Stdlib Authors",
      "url": "https://github.com/stdlib-js/stdlib/graphs/contributors"
    }
  ],
  "bin": {
    "img-locomotion-house-cat": "./bin/cli"
  },
  "main": "./lib",
  "browser": "./lib/browser.js",
  "directories": {
    "benchmark": "./benchmark",
    "data": "./data",
    "doc": "./docs",
    "example": "./examples",
    "lib": "./lib",
    "test": "./test"
  },
  "types": "./docs/types",
  "scripts": {},
  "homepage": "https://github.com/stdlib-js/stdlib",
  "repository": {
    "type": "git",
    "url": "git://github.com/stdlib-js/stdlib.git"
  },
  "bugs": {
    "url": "https://github.com/stdlib-js/stdlib/issues"
  },
  "dependencies": {},
  "devDependencies": {},
  "engines": {
    "node": ">=0.10.0",
    "npm": ">2.7.0"
  },
  "os": [
    "aix",
    "darwin",
    "freebsd",
    "linux",
    "macos",
    "openbsd",
    "sunos",
    "win32",
    "windows"
  ],
  "keywords": [
    "stdlib",
    "datasets",
    "dataset",
    "data",
    "image",
    "img",
    "cat",
    "kitty",
    "feline",
    "animal",
    "mammal",
    "locomotion",
    "moving",
    "movement"
  ]
}

},{}],45:[function(require,module,exports){
(function (__filename){(function (){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
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

var tape = require( 'tape' );
var isBuffer = require( '@stdlib/assert/is-buffer' );
var image = require( './../lib/browser.js' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.equal( typeof image, 'function', 'main export is a function' );
	t.end();
});

tape( 'the function returns a buffer object', function test( t ) {
	var data = image();
	t.equal( isBuffer( data ), true, 'returns a buffer object' );
	t.end();
});

}).call(this)}).call(this,"/lib/node_modules/@stdlib/datasets/img-locomotion-house-cat/test/test.browser.js")
},{"./../lib/browser.js":41,"@stdlib/assert/is-buffer":19,"tape":192}],46:[function(require,module,exports){
(function (__filename,__dirname){(function (){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
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

var resolve = require( 'path' ).resolve;
var exec = require( 'child_process' ).exec;
var tape = require( 'tape' );
var IS_BROWSER = require( '@stdlib/assert/is-browser' );
var IS_WINDOWS = require( '@stdlib/assert/is-windows' );
var EXEC_PATH = require( '@stdlib/process/exec-path' );
var readFileSync = require( '@stdlib/fs/read-file' ).sync;
var string2buffer = require( '@stdlib/buffer/from-string' );


// VARIABLES //

var fpath = resolve( __dirname, '..', 'bin', 'cli' );
var opts = {
	'skip': IS_BROWSER || IS_WINDOWS
};


// FIXTURES //

var PKG_VERSION = require( './../package.json' ).version;


// TESTS //

tape( 'command-line interface', function test( t ) {
	t.ok( true, __filename );
	t.end();
});

tape( 'when invoked with a `--help` flag, the command-line interface prints the help text to `stderr`', opts, function test( t ) {
	var expected;
	var cmd;

	expected = readFileSync( resolve( __dirname, '..', 'docs', 'usage.txt' ), {
		'encoding': 'utf8'
	});
	cmd = [
		EXEC_PATH,
		fpath,
		'--help'
	];

	exec( cmd.join( ' ' ), done );

	function done( error, stdout, stderr ) {
		if ( error ) {
			t.fail( error.message );
		} else {
			t.strictEqual( stdout.toString(), '', 'does not print to `stdout`' );
			t.strictEqual( stderr.toString(), expected+'\n', 'expected value' );
		}
		t.end();
	}
});

tape( 'when invoked with a `-h` flag, the command-line interface prints the help text to `stderr`', opts, function test( t ) {
	var expected;
	var cmd;

	expected = readFileSync( resolve( __dirname, '..', 'docs', 'usage.txt' ), {
		'encoding': 'utf8'
	});
	cmd = [
		EXEC_PATH,
		fpath,
		'-h'
	];

	exec( cmd.join( ' ' ), done );

	function done( error, stdout, stderr ) {
		if ( error ) {
			t.fail( error.message );
		} else {
			t.strictEqual( stdout.toString(), '', 'does not print to `stdout`' );
			t.strictEqual( stderr.toString(), expected+'\n', 'expected value' );
		}
		t.end();
	}
});

tape( 'when invoked with a `--version` flag, the command-line interface prints the version to `stderr`', opts, function test( t ) {
	var cmd = [
		EXEC_PATH,
		fpath,
		'--version'
	];

	exec( cmd.join( ' ' ), done );

	function done( error, stdout, stderr ) {
		if ( error ) {
			t.fail( error.message );
		} else {
			t.strictEqual( stdout.toString(), '', 'does not print to `stdout`' );
			t.strictEqual( stderr.toString(), PKG_VERSION+'\n', 'expected value' );
		}
		t.end();
	}
});

tape( 'when invoked with a `-V` flag, the command-line interface prints the version to `stderr`', opts, function test( t ) {
	var cmd = [
		EXEC_PATH,
		fpath,
		'-V'
	];

	exec( cmd.join( ' ' ), done );

	function done( error, stdout, stderr ) {
		if ( error ) {
			t.fail( error.message );
		} else {
			t.strictEqual( stdout.toString(), '', 'does not print to `stdout`' );
			t.strictEqual( stderr.toString(), PKG_VERSION+'\n', 'expected value' );
		}
		t.end();
	}
});

tape( 'the command-line interface prints the image buffer data', opts, function test( t ) {
	var expected;
	var opts;
	var cmd;

	cmd = [
		EXEC_PATH,
		fpath
	];

	expected = readFileSync( resolve( __dirname, '..', 'data', 'image.jpg' ) );
	expected = string2buffer( expected.toString(), 'base64' );

	opts = {
		'maxBuffer': 600*1024
	};
	exec( cmd.join( ' ' ), opts, done );

	function done( error, stdout, stderr ) {
		var i;
		if ( error ) {
			t.fail( error.message );
		} else {
			stdout = string2buffer( stdout.toString(), 'base64' );
			for ( i = 0; i < expected.length; i++ ) {
				t.strictEqual( stdout[ i ], expected[ i ], 'prints byte ' + i );
			}
			t.strictEqual( stderr.toString(), '', 'does not print to `stderr`' );
		}
		t.end();
	}
});

}).call(this)}).call(this,"/lib/node_modules/@stdlib/datasets/img-locomotion-house-cat/test/test.cli.js","/lib/node_modules/@stdlib/datasets/img-locomotion-house-cat/test")
},{"./../package.json":44,"@stdlib/assert/is-browser":18,"@stdlib/assert/is-windows":31,"@stdlib/buffer/from-string":38,"@stdlib/fs/read-file":49,"@stdlib/process/exec-path":53,"child_process":86,"path":88,"tape":192}],47:[function(require,module,exports){
(function (__filename){(function (){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
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

var tape = require( 'tape' );
var IS_BROWSER = require( '@stdlib/assert/is-browser' );
var isBuffer = require( '@stdlib/assert/is-buffer' );
var image = require( './../lib' );


// VARIABLES //

var opts = {
	'skip': IS_BROWSER
};


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.equal( typeof image, 'function', 'main export is a function' );
	t.end();
});

tape( 'the function returns a buffer object', opts, function test( t ) {
	var data = image();
	t.equal( isBuffer( data ), true, 'returns a buffer object' );
	t.end();
});

}).call(this)}).call(this,"/lib/node_modules/@stdlib/datasets/img-locomotion-house-cat/test/test.js")
},{"./../lib":41,"@stdlib/assert/is-browser":18,"@stdlib/assert/is-buffer":19,"tape":192}],48:[function(require,module,exports){
(function (__filename){(function (){
/* proxyquireify injected requires to make browserify include dependencies in the bundle */ /* istanbul ignore next */; (function __makeBrowserifyIncludeModule__() { require('./../lib/main.js');});/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
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

var tape = require( 'tape' );
var proxyquire = require('proxyquireify')(require);
var image = require( './../lib/main.js' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.strictEqual( typeof image, 'function', 'main export is a function' );
	t.end();
});

tape( 'the function throws an error if unable to load data', function test( t ) {
	var image = proxyquire( './../lib/main.js', {
		'@stdlib/fs/read-file': {
			'sync': readFile
		}
	});
	t.throws( image, Error, 'throws an error' );
	t.end();

	function readFile() {
		return new Error( 'unable to read data' );
	}
});

}).call(this)}).call(this,"/lib/node_modules/@stdlib/datasets/img-locomotion-house-cat/test/test.main.js")
},{"./../lib/main.js":43,"proxyquireify":184,"tape":192}],49:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
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

/**
* Read the entire contents of a file.
*
* @module @stdlib/fs/read-file
*
* @example
* var readFile = require( '@stdlib/fs/read-file' );
*
* function onFile( error, data ) {
*     if ( error ) {
*         throw error;
*     }
*     console.log( data );
* }
* readFile( __filename, onFile );
*
* @example
* var readFileSync = require( '@stdlib/fs/read-file' ).sync;
*
* var out = readFileSync( __filename );
* if ( out instanceof Error ) {
*     throw out;
* }
* console.log( out );
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-nonenumerable-read-only-property' );
var readFile = require( './main.js' );
var sync = require( './sync.js' );


// MAIN //

setReadOnly( readFile, 'sync', sync );


// EXPORTS //

module.exports = readFile;

},{"./main.js":50,"./sync.js":51,"@stdlib/utils/define-nonenumerable-read-only-property":59}],50:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
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

var readfile = require( 'fs' ).readFile;


// MAIN //

/**
* Asynchronously reads the entire contents of a file.
*
* @param {(string|Buffer|integer)} file - file path or file descriptor
* @param {(Object|string)} [options] - options
* @param {(string|null)} [options.encoding] - file encoding
* @param {string} [options.flag] - file status flag
* @param {Function} clbk - callback to invoke after reading file contents
*
* @example
* function onFile( error, data ) {
*     if ( error ) {
*         throw error;
*     }
*     console.log( data );
* }
* readFile( __filename, onFile );
*/
function readFile() {
	var args;
	var i;
	args = [];
	for ( i = 0; i < arguments.length; i++ ) {
		args.push( arguments[ i ] );
	}
	readfile.apply( null, args );
}


// EXPORTS //

module.exports = readFile;

},{"fs":86}],51:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
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

var readfileSync = require( 'fs' ).readFileSync; // eslint-disable-line no-sync


// MAIN //

/**
* Synchronously reads the entire contents of a file.
*
* @param {(string|Buffer|integer)} file - file path or file descriptor
* @param {(Object|string)} [options] - options
* @param {(string|null)} [options.encoding] - file encoding
* @param {string} [options.flag] - file status flag
* @returns {(Buffer|string|Error)} file contents or an error
*
* @example
* var out = readFileSync( __filename );
* if ( out instanceof Error ) {
*     throw out;
* }
* console.log( out );
*/
function readFileSync( file, options ) {
	var f;
	try {
		if ( arguments.length > 1 ) {
			f = readfileSync( file, options );
		} else {
			f = readfileSync( file );
		}
	} catch ( err ) {
		return err;
	}
	return f;
}


// EXPORTS //

module.exports = readFileSync;

},{"fs":86}],52:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2020 The Stdlib Authors.
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

// MAIN //

/**
* Platform on which the current process is running.
*
* @constant
* @type {string}
*/
var PLATFORM = '';


// EXPORTS //

module.exports = PLATFORM;

},{}],53:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2020 The Stdlib Authors.
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

// EXPORTS //

module.exports = null;

},{}],54:[function(require,module,exports){
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

'use strict';

/**
* Regular expression to capture everything that is not a space immediately after the `function` keyword and before the first left parenthesis.
*
* @module @stdlib/regexp/function-name
*
* @example
* var reFunctionName = require( '@stdlib/regexp/function-name' );
* var RE_FUNCTION_NAME = reFunctionName();
*
* function fname( fcn ) {
*     return RE_FUNCTION_NAME.exec( fcn.toString() )[ 1 ];
* }
*
* var fn = fname( Math.sqrt );
* // returns 'sqrt'
*
* fn = fname( Int8Array );
* // returns 'Int8Array'
*
* fn = fname( Object.prototype.toString );
* // returns 'toString'
*
* fn = fname( function(){} );
* // returns ''
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-nonenumerable-read-only-property' );
var reFunctionName = require( './main.js' );
var REGEXP = require( './regexp.js' );


// MAIN //

setReadOnly( reFunctionName, 'REGEXP', REGEXP );


// EXPORTS //

module.exports = reFunctionName;

},{"./main.js":55,"./regexp.js":56,"@stdlib/utils/define-nonenumerable-read-only-property":59}],55:[function(require,module,exports){
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

'use strict';

// MAIN //

/**
* Returns a regular expression to capture everything that is not a space immediately after the `function` keyword and before the first left parenthesis.
*
* @returns {RegExp} regular expression
*
* @example
* var RE_FUNCTION_NAME = reFunctionName();
*
* function fname( fcn ) {
*     return RE_FUNCTION_NAME.exec( fcn.toString() )[ 1 ];
* }
*
* var fn = fname( Math.sqrt );
* // returns 'sqrt'
*
* fn = fname( Int8Array );
* // returns 'Int8Array'
*
* fn = fname( Object.prototype.toString );
* // returns 'toString'
*
* fn = fname( function(){} );
* // returns ''
*/
function reFunctionName() {
	return /^\s*function\s*([^(]*)/i;
}


// EXPORTS //

module.exports = reFunctionName;

},{}],56:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
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

var reFunctionName = require( './main.js' );


// MAIN //

/**
* Captures everything that is not a space immediately after the `function` keyword and before the first left parenthesis.
*
* Regular expression: `/^\s*function\s*([^(]*)/i`
*
* -   `/^\s*`
*     -   Match zero or more spaces at beginning
*
* -   `function`
*     -   Match the word `function`
*
* -   `\s*`
*     -   Match zero or more spaces after the word `function`
*
* -   `()`
*     -   Capture
*
* -   `[^(]*`
*     -   Match anything except a left parenthesis `(` zero or more times
*
* -   `/i`
*     -   ignore case
*
* @constant
* @type {RegExp}
* @default /^\s*function\s*([^(]*)/i
*/
var RE_FUNCTION_NAME = reFunctionName();


// EXPORTS //

module.exports = RE_FUNCTION_NAME;

},{"./main.js":55}],57:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
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

/**
* Determine the name of a value's constructor.
*
* @module @stdlib/utils/constructor-name
*
* @example
* var constructorName = require( '@stdlib/utils/constructor-name' );
*
* var v = constructorName( 'a' );
* // returns 'String'
*
* v = constructorName( {} );
* // returns 'Object'
*
* v = constructorName( true );
* // returns 'Boolean'
*/

// MODULES //

var constructorName = require( './main.js' );


// EXPORTS //

module.exports = constructorName;

},{"./main.js":58}],58:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
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

var nativeClass = require( '@stdlib/utils/native-class' );
var RE = require( '@stdlib/regexp/function-name' ).REGEXP;
var isBuffer = require( '@stdlib/assert/is-buffer' );


// MAIN //

/**
* Determines the name of a value's constructor.
*
* @param {*} v - input value
* @returns {string} name of a value's constructor
*
* @example
* var v = constructorName( 'a' );
* // returns 'String'
*
* @example
* var v = constructorName( 5 );
* // returns 'Number'
*
* @example
* var v = constructorName( null );
* // returns 'Null'
*
* @example
* var v = constructorName( undefined );
* // returns 'Undefined'
*
* @example
* var v = constructorName( function noop() {} );
* // returns 'Function'
*/
function constructorName( v ) {
	var match;
	var name;
	var ctor;
	name = nativeClass( v ).slice( 8, -1 );
	if ( (name === 'Object' || name === 'Error') && v.constructor ) {
		ctor = v.constructor;
		if ( typeof ctor.name === 'string' ) {
			return ctor.name;
		}
		match = RE.exec( ctor.toString() );
		if ( match ) {
			return match[ 1 ];
		}
	}
	if ( isBuffer( v ) ) {
		return 'Buffer';
	}
	return name;
}


// EXPORTS //

module.exports = constructorName;

},{"@stdlib/assert/is-buffer":19,"@stdlib/regexp/function-name":54,"@stdlib/utils/native-class":72}],59:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
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

/**
* Define a non-enumerable read-only property.
*
* @module @stdlib/utils/define-nonenumerable-read-only-property
*
* @example
* var setNonEnumerableReadOnly = require( '@stdlib/utils/define-nonenumerable-read-only-property' );
*
* var obj = {};
*
* setNonEnumerableReadOnly( obj, 'foo', 'bar' );
*
* try {
*     obj.foo = 'boop';
* } catch ( err ) {
*     console.error( err.message );
* }
*/

// MODULES //

var setNonEnumerableReadOnly = require( './main.js' );


// EXPORTS //

module.exports = setNonEnumerableReadOnly;

},{"./main.js":60}],60:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
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

var defineProperty = require( '@stdlib/utils/define-property' );


// MAIN //

/**
* Defines a non-enumerable read-only property.
*
* @param {Object} obj - object on which to define the property
* @param {(string|symbol)} prop - property name
* @param {*} value - value to set
*
* @example
* var obj = {};
*
* setNonEnumerableReadOnly( obj, 'foo', 'bar' );
*
* try {
*     obj.foo = 'boop';
* } catch ( err ) {
*     console.error( err.message );
* }
*/
function setNonEnumerableReadOnly( obj, prop, value ) {
	defineProperty( obj, prop, {
		'configurable': false,
		'enumerable': false,
		'writable': false,
		'value': value
	});
}


// EXPORTS //

module.exports = setNonEnumerableReadOnly;

},{"@stdlib/utils/define-property":64}],61:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
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

// MAIN //

/**
* Defines (or modifies) an object property.
*
* ## Notes
*
* -   Property descriptors come in two flavors: **data descriptors** and **accessor descriptors**. A data descriptor is a property that has a value, which may or may not be writable. An accessor descriptor is a property described by a getter-setter function pair. A descriptor must be one of these two flavors and cannot be both.
*
* @name defineProperty
* @type {Function}
* @param {Object} obj - object on which to define the property
* @param {(string|symbol)} prop - property name
* @param {Object} descriptor - property descriptor
* @param {boolean} [descriptor.configurable=false] - boolean indicating if property descriptor can be changed and if the property can be deleted from the provided object
* @param {boolean} [descriptor.enumerable=false] - boolean indicating if the property shows up when enumerating object properties
* @param {boolean} [descriptor.writable=false] - boolean indicating if the value associated with the property can be changed with an assignment operator
* @param {*} [descriptor.value] - property value
* @param {(Function|void)} [descriptor.get=undefined] - function which serves as a getter for the property, or, if no getter, undefined. When the property is accessed, a getter function is called without arguments and with the `this` context set to the object through which the property is accessed (which may not be the object on which the property is defined due to inheritance). The return value will be used as the property value.
* @param {(Function|void)} [descriptor.set=undefined] - function which serves as a setter for the property, or, if no setter, undefined. When assigning a property value, a setter function is called with one argument (the value being assigned to the property) and with the `this` context set to the object through which the property is assigned.
* @throws {TypeError} first argument must be an object
* @throws {TypeError} third argument must be an object
* @throws {Error} property descriptor cannot have both a value and a setter and/or getter
* @returns {Object} object with added property
*
* @example
* var obj = {};
*
* defineProperty( obj, 'foo', {
*     'value': 'bar'
* });
*
* var str = obj.foo;
* // returns 'bar'
*/
var defineProperty = Object.defineProperty;


// EXPORTS //

module.exports = defineProperty;

},{}],62:[function(require,module,exports){
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

'use strict';

// MAIN //

var main = ( typeof Object.defineProperty === 'function' ) ? Object.defineProperty : null;


// EXPORTS //

module.exports = main;

},{}],63:[function(require,module,exports){
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

'use strict';

// MODULES //

var defineProperty = require( './define_property.js' );


// MAIN //

/**
* Tests for `Object.defineProperty` support.
*
* @private
* @returns {boolean} boolean indicating if an environment has `Object.defineProperty` support
*
* @example
* var bool = hasDefinePropertySupport();
* // returns <boolean>
*/
function hasDefinePropertySupport() {
	// Test basic support...
	try {
		defineProperty( {}, 'x', {} );
		return true;
	} catch ( err ) { // eslint-disable-line no-unused-vars
		return false;
	}
}


// EXPORTS //

module.exports = hasDefinePropertySupport;

},{"./define_property.js":62}],64:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
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

/**
* Define (or modify) an object property.
*
* @module @stdlib/utils/define-property
*
* @example
* var defineProperty = require( '@stdlib/utils/define-property' );
*
* var obj = {};
* defineProperty( obj, 'foo', {
*     'value': 'bar',
*     'writable': false,
*     'configurable': false,
*     'enumerable': false
* });
* obj.foo = 'boop'; // => throws
*/

// MODULES //

var hasDefinePropertySupport = require( './has_define_property_support.js' );
var builtin = require( './builtin.js' );
var polyfill = require( './polyfill.js' );


// MAIN //

var defineProperty;
if ( hasDefinePropertySupport() ) {
	defineProperty = builtin;
} else {
	defineProperty = polyfill;
}


// EXPORTS //

module.exports = defineProperty;

},{"./builtin.js":61,"./has_define_property_support.js":63,"./polyfill.js":65}],65:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
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

/* eslint-disable no-underscore-dangle, no-proto */

'use strict';

// VARIABLES //

var objectProtoype = Object.prototype;
var toStr = objectProtoype.toString;
var defineGetter = objectProtoype.__defineGetter__;
var defineSetter = objectProtoype.__defineSetter__;
var lookupGetter = objectProtoype.__lookupGetter__;
var lookupSetter = objectProtoype.__lookupSetter__;


// MAIN //

/**
* Defines (or modifies) an object property.
*
* ## Notes
*
* -   Property descriptors come in two flavors: **data descriptors** and **accessor descriptors**. A data descriptor is a property that has a value, which may or may not be writable. An accessor descriptor is a property described by a getter-setter function pair. A descriptor must be one of these two flavors and cannot be both.
*
* @param {Object} obj - object on which to define the property
* @param {string} prop - property name
* @param {Object} descriptor - property descriptor
* @param {boolean} [descriptor.configurable=false] - boolean indicating if property descriptor can be changed and if the property can be deleted from the provided object
* @param {boolean} [descriptor.enumerable=false] - boolean indicating if the property shows up when enumerating object properties
* @param {boolean} [descriptor.writable=false] - boolean indicating if the value associated with the property can be changed with an assignment operator
* @param {*} [descriptor.value] - property value
* @param {(Function|void)} [descriptor.get=undefined] - function which serves as a getter for the property, or, if no getter, undefined. When the property is accessed, a getter function is called without arguments and with the `this` context set to the object through which the property is accessed (which may not be the object on which the property is defined due to inheritance). The return value will be used as the property value.
* @param {(Function|void)} [descriptor.set=undefined] - function which serves as a setter for the property, or, if no setter, undefined. When assigning a property value, a setter function is called with one argument (the value being assigned to the property) and with the `this` context set to the object through which the property is assigned.
* @throws {TypeError} first argument must be an object
* @throws {TypeError} third argument must be an object
* @throws {Error} property descriptor cannot have both a value and a setter and/or getter
* @returns {Object} object with added property
*
* @example
* var obj = {};
*
* defineProperty( obj, 'foo', {
*     'value': 'bar'
* });
*
* var str = obj.foo;
* // returns 'bar'
*/
function defineProperty( obj, prop, descriptor ) {
	var prototype;
	var hasValue;
	var hasGet;
	var hasSet;

	if ( typeof obj !== 'object' || obj === null || toStr.call( obj ) === '[object Array]' ) {
		throw new TypeError( 'invalid argument. First argument must be an object. Value: `' + obj + '`.' );
	}
	if ( typeof descriptor !== 'object' || descriptor === null || toStr.call( descriptor ) === '[object Array]' ) {
		throw new TypeError( 'invalid argument. Property descriptor must be an object. Value: `' + descriptor + '`.' );
	}
	hasValue = ( 'value' in descriptor );
	if ( hasValue ) {
		if (
			lookupGetter.call( obj, prop ) ||
			lookupSetter.call( obj, prop )
		) {
			// Override `__proto__` to avoid touching inherited accessors:
			prototype = obj.__proto__;
			obj.__proto__ = objectProtoype;

			// Delete property as existing getters/setters prevent assigning value to specified property:
			delete obj[ prop ];
			obj[ prop ] = descriptor.value;

			// Restore original prototype:
			obj.__proto__ = prototype;
		} else {
			obj[ prop ] = descriptor.value;
		}
	}
	hasGet = ( 'get' in descriptor );
	hasSet = ( 'set' in descriptor );

	if ( hasValue && ( hasGet || hasSet ) ) {
		throw new Error( 'invalid argument. Cannot specify one or more accessors and a value or writable attribute in the property descriptor.' );
	}

	if ( hasGet && defineGetter ) {
		defineGetter.call( obj, prop, descriptor.get );
	}
	if ( hasSet && defineSetter ) {
		defineSetter.call( obj, prop, descriptor.set );
	}
	return obj;
}


// EXPORTS //

module.exports = defineProperty;

},{}],66:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
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

// MAIN //

/**
* Returns the global object using code generation.
*
* @private
* @returns {Object} global object
*/
function getGlobal() {
	return new Function( 'return this;' )(); // eslint-disable-line no-new-func
}


// EXPORTS //

module.exports = getGlobal;

},{}],67:[function(require,module,exports){
(function (global){(function (){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
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

// MAIN //

var obj = ( typeof global === 'object' ) ? global : null;


// EXPORTS //

module.exports = obj;

}).call(this)}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],68:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
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

/**
* Return the global object.
*
* @module @stdlib/utils/global
*
* @example
* var getGlobal = require( '@stdlib/utils/global' );
*
* var g = getGlobal();
* // returns {...}
*/

// MODULES //

var getGlobal = require( './main.js' );


// EXPORTS //

module.exports = getGlobal;

},{"./main.js":69}],69:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
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

var isBoolean = require( '@stdlib/assert/is-boolean' ).isPrimitive;
var getThis = require( './codegen.js' );
var Self = require( './self.js' );
var Win = require( './window.js' );
var Global = require( './global.js' );


// MAIN //

/**
* Returns the global object.
*
* ## Notes
*
* -   Using code generation is the **most** reliable way to resolve the global object; however, doing so is likely to violate content security policies (CSPs) in, e.g., Chrome Apps and elsewhere.
*
* @param {boolean} [codegen=false] - boolean indicating whether to use code generation to resolve the global object
* @throws {TypeError} must provide a boolean
* @throws {Error} unable to resolve global object
* @returns {Object} global object
*
* @example
* var g = getGlobal();
* // returns {...}
*/
function getGlobal( codegen ) {
	if ( arguments.length ) {
		if ( !isBoolean( codegen ) ) {
			throw new TypeError( 'invalid argument. Must provide a boolean primitive. Value: `'+codegen+'`.' );
		}
		if ( codegen ) {
			return getThis();
		}
		// Fall through...
	}
	// Case: browsers and web workers
	if ( Self ) {
		return Self;
	}
	// Case: browsers
	if ( Win ) {
		return Win;
	}
	// Case: Node.js
	if ( Global ) {
		return Global;
	}
	// Case: unknown
	throw new Error( 'unexpected error. Unable to resolve global object.' );
}


// EXPORTS //

module.exports = getGlobal;

},{"./codegen.js":66,"./global.js":67,"./self.js":70,"./window.js":71,"@stdlib/assert/is-boolean":12}],70:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
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

// MAIN //

var obj = ( typeof self === 'object' ) ? self : null;


// EXPORTS //

module.exports = obj;

},{}],71:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
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

// MAIN //

var obj = ( typeof window === 'object' ) ? window : null;


// EXPORTS //

module.exports = obj;

},{}],72:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
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

/**
* Return a string value indicating a specification defined classification of an object.
*
* @module @stdlib/utils/native-class
*
* @example
* var nativeClass = require( '@stdlib/utils/native-class' );
*
* var str = nativeClass( 'a' );
* // returns '[object String]'
*
* str = nativeClass( 5 );
* // returns '[object Number]'
*
* function Beep() {
*     return this;
* }
* str = nativeClass( new Beep() );
* // returns '[object Object]'
*/

// MODULES //

var hasToStringTag = require( '@stdlib/assert/has-tostringtag-support' );
var builtin = require( './native_class.js' );
var polyfill = require( './polyfill.js' );


// MAIN //

var nativeClass;
if ( hasToStringTag() ) {
	nativeClass = polyfill;
} else {
	nativeClass = builtin;
}


// EXPORTS //

module.exports = nativeClass;

},{"./native_class.js":73,"./polyfill.js":74,"@stdlib/assert/has-tostringtag-support":8}],73:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
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

var toStr = require( './tostring.js' );


// MAIN //

/**
* Returns a string value indicating a specification defined classification (via the internal property `[[Class]]`) of an object.
*
* @param {*} v - input value
* @returns {string} string value indicating a specification defined classification of the input value
*
* @example
* var str = nativeClass( 'a' );
* // returns '[object String]'
*
* @example
* var str = nativeClass( 5 );
* // returns '[object Number]'
*
* @example
* function Beep() {
*     return this;
* }
* var str = nativeClass( new Beep() );
* // returns '[object Object]'
*/
function nativeClass( v ) {
	return toStr.call( v );
}


// EXPORTS //

module.exports = nativeClass;

},{"./tostring.js":75}],74:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
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
var toStringTag = require( './tostringtag.js' );
var toStr = require( './tostring.js' );


// MAIN //

/**
* Returns a string value indicating a specification defined classification of an object in environments supporting `Symbol.toStringTag`.
*
* @param {*} v - input value
* @returns {string} string value indicating a specification defined classification of the input value
*
* @example
* var str = nativeClass( 'a' );
* // returns '[object String]'
*
* @example
* var str = nativeClass( 5 );
* // returns '[object Number]'
*
* @example
* function Beep() {
*     return this;
* }
* var str = nativeClass( new Beep() );
* // returns '[object Object]'
*/
function nativeClass( v ) {
	var isOwn;
	var tag;
	var out;

	if ( v === null || v === void 0 ) {
		return toStr.call( v );
	}
	tag = v[ toStringTag ];
	isOwn = hasOwnProp( v, toStringTag );

	// Attempt to override the `toStringTag` property. For built-ins having a `Symbol.toStringTag` property (e.g., `JSON`, `Math`, etc), the `Symbol.toStringTag` property is read-only (e.g., , so we need to wrap in a `try/catch`.
	try {
		v[ toStringTag ] = void 0;
	} catch ( err ) { // eslint-disable-line no-unused-vars
		return toStr.call( v );
	}
	out = toStr.call( v );

	if ( isOwn ) {
		v[ toStringTag ] = tag;
	} else {
		delete v[ toStringTag ];
	}
	return out;
}


// EXPORTS //

module.exports = nativeClass;

},{"./tostring.js":75,"./tostringtag.js":76,"@stdlib/assert/has-own-property":4}],75:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
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

// MAIN //

var toStr = Object.prototype.toString;


// EXPORTS //

module.exports = toStr;

},{}],76:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
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

// MAIN //

var toStrTag = ( typeof Symbol === 'function' ) ? Symbol.toStringTag : '';


// EXPORTS //

module.exports = toStrTag;

},{}],77:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
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

var RE = require( './fixtures/re.js' );
var nodeList = require( './fixtures/nodelist.js' );
var typedarray = require( './fixtures/typedarray.js' );


// MAIN //

/**
* Checks whether a polyfill is needed when using the `typeof` operator.
*
* @private
* @returns {boolean} boolean indicating whether a polyfill is needed
*/
function check() {
	if (
		// Chrome 1-12 returns 'function' for regular expression instances (see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof):
		typeof RE === 'function' ||

		// Safari 8 returns 'object' for typed array and weak map constructors (underscore #1929):
		typeof typedarray === 'object' ||

		// PhantomJS 1.9 returns 'function' for `NodeList` instances (underscore #2236):
		typeof nodeList === 'function'
	) {
		return true;
	}
	return false;
}


// EXPORTS //

module.exports = check;

},{"./fixtures/nodelist.js":78,"./fixtures/re.js":79,"./fixtures/typedarray.js":80}],78:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
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

var getGlobal = require( '@stdlib/utils/global' );


// MAIN //

var root = getGlobal();
var nodeList = root.document && root.document.childNodes;


// EXPORTS //

module.exports = nodeList;

},{"@stdlib/utils/global":68}],79:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
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

var RE = /./;


// EXPORTS //

module.exports = RE;

},{}],80:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
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

var typedarray = Int8Array; // eslint-disable-line stdlib/require-globals


// EXPORTS //

module.exports = typedarray;

},{}],81:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
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

/**
* Determine a value's type.
*
* @module @stdlib/utils/type-of
*
* @example
* var typeOf = require( '@stdlib/utils/type-of' );
*
* var str = typeOf( 'a' );
* // returns 'string'
*
* str = typeOf( 5 );
* // returns 'number'
*/

// MODULES //

var usePolyfill = require( './check.js' );
var typeOf = require( './typeof.js' );
var polyfill = require( './polyfill.js' );


// MAIN //

var main = ( usePolyfill() ) ? polyfill : typeOf;


// EXPORTS //

module.exports = main;

},{"./check.js":77,"./polyfill.js":82,"./typeof.js":83}],82:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
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

var ctorName = require( '@stdlib/utils/constructor-name' );


// MAIN //

/**
* Determines a value's type.
*
* @param {*} v - input value
* @returns {string} string indicating the value's type
*/
function typeOf( v ) {
	return ctorName( v ).toLowerCase();
}


// EXPORTS //

module.exports = typeOf;

},{"@stdlib/utils/constructor-name":57}],83:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
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

var ctorName = require( '@stdlib/utils/constructor-name' );


// NOTES //

/*
* Built-in `typeof` operator behavior:
*
* ```text
* typeof null => 'object'
* typeof undefined => 'undefined'
* typeof 'a' => 'string'
* typeof 5 => 'number'
* typeof NaN => 'number'
* typeof true => 'boolean'
* typeof false => 'boolean'
* typeof {} => 'object'
* typeof [] => 'object'
* typeof function foo(){} => 'function'
* typeof function* foo(){} => 'object'
* typeof Symbol() => 'symbol'
* ```
*
*/


// MAIN //

/**
* Determines a value's type.
*
* @param {*} v - input value
* @returns {string} string indicating the value's type
*/
function typeOf( v ) {
	var type;

	// Address `typeof null` => `object` (see http://wiki.ecmascript.org/doku.php?id=harmony:typeof_null):
	if ( v === null ) {
		return 'null';
	}
	type = typeof v;

	// If the `typeof` operator returned something other than `object`, we are done. Otherwise, we need to check for an internal class name or search for a constructor.
	if ( type === 'object' ) {
		return ctorName( v ).toLowerCase();
	}
	return type;
}


// EXPORTS //

module.exports = typeOf;

},{"@stdlib/utils/constructor-name":57}],84:[function(require,module,exports){
'use strict'

exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

// Support decoding URL-safe base64 strings, as Node.js does.
// See: https://en.wikipedia.org/wiki/Base64#URL_applications
revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function getLens (b64) {
  var len = b64.length

  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // Trim off extra bytes after placeholder bytes are found
  // See: https://github.com/beatgammit/base64-js/issues/42
  var validLen = b64.indexOf('=')
  if (validLen === -1) validLen = len

  var placeHoldersLen = validLen === len
    ? 0
    : 4 - (validLen % 4)

  return [validLen, placeHoldersLen]
}

// base64 is 4/3 + up to two characters of the original data
function byteLength (b64) {
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function _byteLength (b64, validLen, placeHoldersLen) {
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function toByteArray (b64) {
  var tmp
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]

  var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen))

  var curByte = 0

  // if there are placeholders, only get up to the last complete 4 chars
  var len = placeHoldersLen > 0
    ? validLen - 4
    : validLen

  var i
  for (i = 0; i < len; i += 4) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 18) |
      (revLookup[b64.charCodeAt(i + 1)] << 12) |
      (revLookup[b64.charCodeAt(i + 2)] << 6) |
      revLookup[b64.charCodeAt(i + 3)]
    arr[curByte++] = (tmp >> 16) & 0xFF
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 2) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 2) |
      (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 1) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 10) |
      (revLookup[b64.charCodeAt(i + 1)] << 4) |
      (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] +
    lookup[num >> 12 & 0x3F] +
    lookup[num >> 6 & 0x3F] +
    lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp =
      ((uint8[i] << 16) & 0xFF0000) +
      ((uint8[i + 1] << 8) & 0xFF00) +
      (uint8[i + 2] & 0xFF)
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    parts.push(
      lookup[tmp >> 2] +
      lookup[(tmp << 4) & 0x3F] +
      '=='
    )
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + uint8[len - 1]
    parts.push(
      lookup[tmp >> 10] +
      lookup[(tmp >> 4) & 0x3F] +
      lookup[(tmp << 2) & 0x3F] +
      '='
    )
  }

  return parts.join('')
}

},{}],85:[function(require,module,exports){

},{}],86:[function(require,module,exports){
arguments[4][85][0].apply(exports,arguments)
},{"dup":85}],87:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

'use strict';

var R = typeof Reflect === 'object' ? Reflect : null
var ReflectApply = R && typeof R.apply === 'function'
  ? R.apply
  : function ReflectApply(target, receiver, args) {
    return Function.prototype.apply.call(target, receiver, args);
  }

var ReflectOwnKeys
if (R && typeof R.ownKeys === 'function') {
  ReflectOwnKeys = R.ownKeys
} else if (Object.getOwnPropertySymbols) {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target)
      .concat(Object.getOwnPropertySymbols(target));
  };
} else {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target);
  };
}

function ProcessEmitWarning(warning) {
  if (console && console.warn) console.warn(warning);
}

var NumberIsNaN = Number.isNaN || function NumberIsNaN(value) {
  return value !== value;
}

function EventEmitter() {
  EventEmitter.init.call(this);
}
module.exports = EventEmitter;
module.exports.once = once;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._eventsCount = 0;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
var defaultMaxListeners = 10;

function checkListener(listener) {
  if (typeof listener !== 'function') {
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
  }
}

Object.defineProperty(EventEmitter, 'defaultMaxListeners', {
  enumerable: true,
  get: function() {
    return defaultMaxListeners;
  },
  set: function(arg) {
    if (typeof arg !== 'number' || arg < 0 || NumberIsNaN(arg)) {
      throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + '.');
    }
    defaultMaxListeners = arg;
  }
});

EventEmitter.init = function() {

  if (this._events === undefined ||
      this._events === Object.getPrototypeOf(this)._events) {
    this._events = Object.create(null);
    this._eventsCount = 0;
  }

  this._maxListeners = this._maxListeners || undefined;
};

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
  if (typeof n !== 'number' || n < 0 || NumberIsNaN(n)) {
    throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n + '.');
  }
  this._maxListeners = n;
  return this;
};

function _getMaxListeners(that) {
  if (that._maxListeners === undefined)
    return EventEmitter.defaultMaxListeners;
  return that._maxListeners;
}

EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
  return _getMaxListeners(this);
};

EventEmitter.prototype.emit = function emit(type) {
  var args = [];
  for (var i = 1; i < arguments.length; i++) args.push(arguments[i]);
  var doError = (type === 'error');

  var events = this._events;
  if (events !== undefined)
    doError = (doError && events.error === undefined);
  else if (!doError)
    return false;

  // If there is no 'error' event listener then throw.
  if (doError) {
    var er;
    if (args.length > 0)
      er = args[0];
    if (er instanceof Error) {
      // Note: The comments on the `throw` lines are intentional, they show
      // up in Node's output if this results in an unhandled exception.
      throw er; // Unhandled 'error' event
    }
    // At least give some kind of context to the user
    var err = new Error('Unhandled error.' + (er ? ' (' + er.message + ')' : ''));
    err.context = er;
    throw err; // Unhandled 'error' event
  }

  var handler = events[type];

  if (handler === undefined)
    return false;

  if (typeof handler === 'function') {
    ReflectApply(handler, this, args);
  } else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      ReflectApply(listeners[i], this, args);
  }

  return true;
};

function _addListener(target, type, listener, prepend) {
  var m;
  var events;
  var existing;

  checkListener(listener);

  events = target._events;
  if (events === undefined) {
    events = target._events = Object.create(null);
    target._eventsCount = 0;
  } else {
    // To avoid recursion in the case that type === "newListener"! Before
    // adding it to the listeners, first emit "newListener".
    if (events.newListener !== undefined) {
      target.emit('newListener', type,
                  listener.listener ? listener.listener : listener);

      // Re-assign `events` because a newListener handler could have caused the
      // this._events to be assigned to a new object
      events = target._events;
    }
    existing = events[type];
  }

  if (existing === undefined) {
    // Optimize the case of one listener. Don't need the extra array object.
    existing = events[type] = listener;
    ++target._eventsCount;
  } else {
    if (typeof existing === 'function') {
      // Adding the second element, need to change to array.
      existing = events[type] =
        prepend ? [listener, existing] : [existing, listener];
      // If we've already got an array, just append.
    } else if (prepend) {
      existing.unshift(listener);
    } else {
      existing.push(listener);
    }

    // Check for listener leak
    m = _getMaxListeners(target);
    if (m > 0 && existing.length > m && !existing.warned) {
      existing.warned = true;
      // No error code for this since it is a Warning
      // eslint-disable-next-line no-restricted-syntax
      var w = new Error('Possible EventEmitter memory leak detected. ' +
                          existing.length + ' ' + String(type) + ' listeners ' +
                          'added. Use emitter.setMaxListeners() to ' +
                          'increase limit');
      w.name = 'MaxListenersExceededWarning';
      w.emitter = target;
      w.type = type;
      w.count = existing.length;
      ProcessEmitWarning(w);
    }
  }

  return target;
}

EventEmitter.prototype.addListener = function addListener(type, listener) {
  return _addListener(this, type, listener, false);
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.prependListener =
    function prependListener(type, listener) {
      return _addListener(this, type, listener, true);
    };

function onceWrapper() {
  if (!this.fired) {
    this.target.removeListener(this.type, this.wrapFn);
    this.fired = true;
    if (arguments.length === 0)
      return this.listener.call(this.target);
    return this.listener.apply(this.target, arguments);
  }
}

function _onceWrap(target, type, listener) {
  var state = { fired: false, wrapFn: undefined, target: target, type: type, listener: listener };
  var wrapped = onceWrapper.bind(state);
  wrapped.listener = listener;
  state.wrapFn = wrapped;
  return wrapped;
}

EventEmitter.prototype.once = function once(type, listener) {
  checkListener(listener);
  this.on(type, _onceWrap(this, type, listener));
  return this;
};

EventEmitter.prototype.prependOnceListener =
    function prependOnceListener(type, listener) {
      checkListener(listener);
      this.prependListener(type, _onceWrap(this, type, listener));
      return this;
    };

// Emits a 'removeListener' event if and only if the listener was removed.
EventEmitter.prototype.removeListener =
    function removeListener(type, listener) {
      var list, events, position, i, originalListener;

      checkListener(listener);

      events = this._events;
      if (events === undefined)
        return this;

      list = events[type];
      if (list === undefined)
        return this;

      if (list === listener || list.listener === listener) {
        if (--this._eventsCount === 0)
          this._events = Object.create(null);
        else {
          delete events[type];
          if (events.removeListener)
            this.emit('removeListener', type, list.listener || listener);
        }
      } else if (typeof list !== 'function') {
        position = -1;

        for (i = list.length - 1; i >= 0; i--) {
          if (list[i] === listener || list[i].listener === listener) {
            originalListener = list[i].listener;
            position = i;
            break;
          }
        }

        if (position < 0)
          return this;

        if (position === 0)
          list.shift();
        else {
          spliceOne(list, position);
        }

        if (list.length === 1)
          events[type] = list[0];

        if (events.removeListener !== undefined)
          this.emit('removeListener', type, originalListener || listener);
      }

      return this;
    };

EventEmitter.prototype.off = EventEmitter.prototype.removeListener;

EventEmitter.prototype.removeAllListeners =
    function removeAllListeners(type) {
      var listeners, events, i;

      events = this._events;
      if (events === undefined)
        return this;

      // not listening for removeListener, no need to emit
      if (events.removeListener === undefined) {
        if (arguments.length === 0) {
          this._events = Object.create(null);
          this._eventsCount = 0;
        } else if (events[type] !== undefined) {
          if (--this._eventsCount === 0)
            this._events = Object.create(null);
          else
            delete events[type];
        }
        return this;
      }

      // emit removeListener for all listeners on all events
      if (arguments.length === 0) {
        var keys = Object.keys(events);
        var key;
        for (i = 0; i < keys.length; ++i) {
          key = keys[i];
          if (key === 'removeListener') continue;
          this.removeAllListeners(key);
        }
        this.removeAllListeners('removeListener');
        this._events = Object.create(null);
        this._eventsCount = 0;
        return this;
      }

      listeners = events[type];

      if (typeof listeners === 'function') {
        this.removeListener(type, listeners);
      } else if (listeners !== undefined) {
        // LIFO order
        for (i = listeners.length - 1; i >= 0; i--) {
          this.removeListener(type, listeners[i]);
        }
      }

      return this;
    };

function _listeners(target, type, unwrap) {
  var events = target._events;

  if (events === undefined)
    return [];

  var evlistener = events[type];
  if (evlistener === undefined)
    return [];

  if (typeof evlistener === 'function')
    return unwrap ? [evlistener.listener || evlistener] : [evlistener];

  return unwrap ?
    unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
}

EventEmitter.prototype.listeners = function listeners(type) {
  return _listeners(this, type, true);
};

EventEmitter.prototype.rawListeners = function rawListeners(type) {
  return _listeners(this, type, false);
};

EventEmitter.listenerCount = function(emitter, type) {
  if (typeof emitter.listenerCount === 'function') {
    return emitter.listenerCount(type);
  } else {
    return listenerCount.call(emitter, type);
  }
};

EventEmitter.prototype.listenerCount = listenerCount;
function listenerCount(type) {
  var events = this._events;

  if (events !== undefined) {
    var evlistener = events[type];

    if (typeof evlistener === 'function') {
      return 1;
    } else if (evlistener !== undefined) {
      return evlistener.length;
    }
  }

  return 0;
}

EventEmitter.prototype.eventNames = function eventNames() {
  return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
};

function arrayClone(arr, n) {
  var copy = new Array(n);
  for (var i = 0; i < n; ++i)
    copy[i] = arr[i];
  return copy;
}

function spliceOne(list, index) {
  for (; index + 1 < list.length; index++)
    list[index] = list[index + 1];
  list.pop();
}

function unwrapListeners(arr) {
  var ret = new Array(arr.length);
  for (var i = 0; i < ret.length; ++i) {
    ret[i] = arr[i].listener || arr[i];
  }
  return ret;
}

function once(emitter, name) {
  return new Promise(function (resolve, reject) {
    function errorListener(err) {
      emitter.removeListener(name, resolver);
      reject(err);
    }

    function resolver() {
      if (typeof emitter.removeListener === 'function') {
        emitter.removeListener('error', errorListener);
      }
      resolve([].slice.call(arguments));
    };

    eventTargetAgnosticAddListener(emitter, name, resolver, { once: true });
    if (name !== 'error') {
      addErrorHandlerIfEventEmitter(emitter, errorListener, { once: true });
    }
  });
}

function addErrorHandlerIfEventEmitter(emitter, handler, flags) {
  if (typeof emitter.on === 'function') {
    eventTargetAgnosticAddListener(emitter, 'error', handler, flags);
  }
}

function eventTargetAgnosticAddListener(emitter, name, listener, flags) {
  if (typeof emitter.on === 'function') {
    if (flags.once) {
      emitter.once(name, listener);
    } else {
      emitter.on(name, listener);
    }
  } else if (typeof emitter.addEventListener === 'function') {
    // EventTarget does not have `error` event semantics like Node
    // EventEmitters, we do not listen for `error` events here.
    emitter.addEventListener(name, function wrapListener(arg) {
      // IE does not have builtin `{ once: true }` support so we
      // have to do it manually.
      if (flags.once) {
        emitter.removeEventListener(name, wrapListener);
      }
      listener(arg);
    });
  } else {
    throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof emitter);
  }
}

},{}],88:[function(require,module,exports){
(function (process){(function (){
// 'path' module extracted from Node.js v8.11.1 (only the posix part)
// transplited with Babel

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

'use strict';

function assertPath(path) {
  if (typeof path !== 'string') {
    throw new TypeError('Path must be a string. Received ' + JSON.stringify(path));
  }
}

// Resolves . and .. elements in a path with directory names
function normalizeStringPosix(path, allowAboveRoot) {
  var res = '';
  var lastSegmentLength = 0;
  var lastSlash = -1;
  var dots = 0;
  var code;
  for (var i = 0; i <= path.length; ++i) {
    if (i < path.length)
      code = path.charCodeAt(i);
    else if (code === 47 /*/*/)
      break;
    else
      code = 47 /*/*/;
    if (code === 47 /*/*/) {
      if (lastSlash === i - 1 || dots === 1) {
        // NOOP
      } else if (lastSlash !== i - 1 && dots === 2) {
        if (res.length < 2 || lastSegmentLength !== 2 || res.charCodeAt(res.length - 1) !== 46 /*.*/ || res.charCodeAt(res.length - 2) !== 46 /*.*/) {
          if (res.length > 2) {
            var lastSlashIndex = res.lastIndexOf('/');
            if (lastSlashIndex !== res.length - 1) {
              if (lastSlashIndex === -1) {
                res = '';
                lastSegmentLength = 0;
              } else {
                res = res.slice(0, lastSlashIndex);
                lastSegmentLength = res.length - 1 - res.lastIndexOf('/');
              }
              lastSlash = i;
              dots = 0;
              continue;
            }
          } else if (res.length === 2 || res.length === 1) {
            res = '';
            lastSegmentLength = 0;
            lastSlash = i;
            dots = 0;
            continue;
          }
        }
        if (allowAboveRoot) {
          if (res.length > 0)
            res += '/..';
          else
            res = '..';
          lastSegmentLength = 2;
        }
      } else {
        if (res.length > 0)
          res += '/' + path.slice(lastSlash + 1, i);
        else
          res = path.slice(lastSlash + 1, i);
        lastSegmentLength = i - lastSlash - 1;
      }
      lastSlash = i;
      dots = 0;
    } else if (code === 46 /*.*/ && dots !== -1) {
      ++dots;
    } else {
      dots = -1;
    }
  }
  return res;
}

function _format(sep, pathObject) {
  var dir = pathObject.dir || pathObject.root;
  var base = pathObject.base || (pathObject.name || '') + (pathObject.ext || '');
  if (!dir) {
    return base;
  }
  if (dir === pathObject.root) {
    return dir + base;
  }
  return dir + sep + base;
}

var posix = {
  // path.resolve([from ...], to)
  resolve: function resolve() {
    var resolvedPath = '';
    var resolvedAbsolute = false;
    var cwd;

    for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
      var path;
      if (i >= 0)
        path = arguments[i];
      else {
        if (cwd === undefined)
          cwd = process.cwd();
        path = cwd;
      }

      assertPath(path);

      // Skip empty entries
      if (path.length === 0) {
        continue;
      }

      resolvedPath = path + '/' + resolvedPath;
      resolvedAbsolute = path.charCodeAt(0) === 47 /*/*/;
    }

    // At this point the path should be resolved to a full absolute path, but
    // handle relative paths to be safe (might happen when process.cwd() fails)

    // Normalize the path
    resolvedPath = normalizeStringPosix(resolvedPath, !resolvedAbsolute);

    if (resolvedAbsolute) {
      if (resolvedPath.length > 0)
        return '/' + resolvedPath;
      else
        return '/';
    } else if (resolvedPath.length > 0) {
      return resolvedPath;
    } else {
      return '.';
    }
  },

  normalize: function normalize(path) {
    assertPath(path);

    if (path.length === 0) return '.';

    var isAbsolute = path.charCodeAt(0) === 47 /*/*/;
    var trailingSeparator = path.charCodeAt(path.length - 1) === 47 /*/*/;

    // Normalize the path
    path = normalizeStringPosix(path, !isAbsolute);

    if (path.length === 0 && !isAbsolute) path = '.';
    if (path.length > 0 && trailingSeparator) path += '/';

    if (isAbsolute) return '/' + path;
    return path;
  },

  isAbsolute: function isAbsolute(path) {
    assertPath(path);
    return path.length > 0 && path.charCodeAt(0) === 47 /*/*/;
  },

  join: function join() {
    if (arguments.length === 0)
      return '.';
    var joined;
    for (var i = 0; i < arguments.length; ++i) {
      var arg = arguments[i];
      assertPath(arg);
      if (arg.length > 0) {
        if (joined === undefined)
          joined = arg;
        else
          joined += '/' + arg;
      }
    }
    if (joined === undefined)
      return '.';
    return posix.normalize(joined);
  },

  relative: function relative(from, to) {
    assertPath(from);
    assertPath(to);

    if (from === to) return '';

    from = posix.resolve(from);
    to = posix.resolve(to);

    if (from === to) return '';

    // Trim any leading backslashes
    var fromStart = 1;
    for (; fromStart < from.length; ++fromStart) {
      if (from.charCodeAt(fromStart) !== 47 /*/*/)
        break;
    }
    var fromEnd = from.length;
    var fromLen = fromEnd - fromStart;

    // Trim any leading backslashes
    var toStart = 1;
    for (; toStart < to.length; ++toStart) {
      if (to.charCodeAt(toStart) !== 47 /*/*/)
        break;
    }
    var toEnd = to.length;
    var toLen = toEnd - toStart;

    // Compare paths to find the longest common path from root
    var length = fromLen < toLen ? fromLen : toLen;
    var lastCommonSep = -1;
    var i = 0;
    for (; i <= length; ++i) {
      if (i === length) {
        if (toLen > length) {
          if (to.charCodeAt(toStart + i) === 47 /*/*/) {
            // We get here if `from` is the exact base path for `to`.
            // For example: from='/foo/bar'; to='/foo/bar/baz'
            return to.slice(toStart + i + 1);
          } else if (i === 0) {
            // We get here if `from` is the root
            // For example: from='/'; to='/foo'
            return to.slice(toStart + i);
          }
        } else if (fromLen > length) {
          if (from.charCodeAt(fromStart + i) === 47 /*/*/) {
            // We get here if `to` is the exact base path for `from`.
            // For example: from='/foo/bar/baz'; to='/foo/bar'
            lastCommonSep = i;
          } else if (i === 0) {
            // We get here if `to` is the root.
            // For example: from='/foo'; to='/'
            lastCommonSep = 0;
          }
        }
        break;
      }
      var fromCode = from.charCodeAt(fromStart + i);
      var toCode = to.charCodeAt(toStart + i);
      if (fromCode !== toCode)
        break;
      else if (fromCode === 47 /*/*/)
        lastCommonSep = i;
    }

    var out = '';
    // Generate the relative path based on the path difference between `to`
    // and `from`
    for (i = fromStart + lastCommonSep + 1; i <= fromEnd; ++i) {
      if (i === fromEnd || from.charCodeAt(i) === 47 /*/*/) {
        if (out.length === 0)
          out += '..';
        else
          out += '/..';
      }
    }

    // Lastly, append the rest of the destination (`to`) path that comes after
    // the common path parts
    if (out.length > 0)
      return out + to.slice(toStart + lastCommonSep);
    else {
      toStart += lastCommonSep;
      if (to.charCodeAt(toStart) === 47 /*/*/)
        ++toStart;
      return to.slice(toStart);
    }
  },

  _makeLong: function _makeLong(path) {
    return path;
  },

  dirname: function dirname(path) {
    assertPath(path);
    if (path.length === 0) return '.';
    var code = path.charCodeAt(0);
    var hasRoot = code === 47 /*/*/;
    var end = -1;
    var matchedSlash = true;
    for (var i = path.length - 1; i >= 1; --i) {
      code = path.charCodeAt(i);
      if (code === 47 /*/*/) {
          if (!matchedSlash) {
            end = i;
            break;
          }
        } else {
        // We saw the first non-path separator
        matchedSlash = false;
      }
    }

    if (end === -1) return hasRoot ? '/' : '.';
    if (hasRoot && end === 1) return '//';
    return path.slice(0, end);
  },

  basename: function basename(path, ext) {
    if (ext !== undefined && typeof ext !== 'string') throw new TypeError('"ext" argument must be a string');
    assertPath(path);

    var start = 0;
    var end = -1;
    var matchedSlash = true;
    var i;

    if (ext !== undefined && ext.length > 0 && ext.length <= path.length) {
      if (ext.length === path.length && ext === path) return '';
      var extIdx = ext.length - 1;
      var firstNonSlashEnd = -1;
      for (i = path.length - 1; i >= 0; --i) {
        var code = path.charCodeAt(i);
        if (code === 47 /*/*/) {
            // If we reached a path separator that was not part of a set of path
            // separators at the end of the string, stop now
            if (!matchedSlash) {
              start = i + 1;
              break;
            }
          } else {
          if (firstNonSlashEnd === -1) {
            // We saw the first non-path separator, remember this index in case
            // we need it if the extension ends up not matching
            matchedSlash = false;
            firstNonSlashEnd = i + 1;
          }
          if (extIdx >= 0) {
            // Try to match the explicit extension
            if (code === ext.charCodeAt(extIdx)) {
              if (--extIdx === -1) {
                // We matched the extension, so mark this as the end of our path
                // component
                end = i;
              }
            } else {
              // Extension does not match, so our result is the entire path
              // component
              extIdx = -1;
              end = firstNonSlashEnd;
            }
          }
        }
      }

      if (start === end) end = firstNonSlashEnd;else if (end === -1) end = path.length;
      return path.slice(start, end);
    } else {
      for (i = path.length - 1; i >= 0; --i) {
        if (path.charCodeAt(i) === 47 /*/*/) {
            // If we reached a path separator that was not part of a set of path
            // separators at the end of the string, stop now
            if (!matchedSlash) {
              start = i + 1;
              break;
            }
          } else if (end === -1) {
          // We saw the first non-path separator, mark this as the end of our
          // path component
          matchedSlash = false;
          end = i + 1;
        }
      }

      if (end === -1) return '';
      return path.slice(start, end);
    }
  },

  extname: function extname(path) {
    assertPath(path);
    var startDot = -1;
    var startPart = 0;
    var end = -1;
    var matchedSlash = true;
    // Track the state of characters (if any) we see before our first dot and
    // after any path separator we find
    var preDotState = 0;
    for (var i = path.length - 1; i >= 0; --i) {
      var code = path.charCodeAt(i);
      if (code === 47 /*/*/) {
          // If we reached a path separator that was not part of a set of path
          // separators at the end of the string, stop now
          if (!matchedSlash) {
            startPart = i + 1;
            break;
          }
          continue;
        }
      if (end === -1) {
        // We saw the first non-path separator, mark this as the end of our
        // extension
        matchedSlash = false;
        end = i + 1;
      }
      if (code === 46 /*.*/) {
          // If this is our first dot, mark it as the start of our extension
          if (startDot === -1)
            startDot = i;
          else if (preDotState !== 1)
            preDotState = 1;
      } else if (startDot !== -1) {
        // We saw a non-dot and non-path separator before our dot, so we should
        // have a good chance at having a non-empty extension
        preDotState = -1;
      }
    }

    if (startDot === -1 || end === -1 ||
        // We saw a non-dot character immediately before the dot
        preDotState === 0 ||
        // The (right-most) trimmed path component is exactly '..'
        preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
      return '';
    }
    return path.slice(startDot, end);
  },

  format: function format(pathObject) {
    if (pathObject === null || typeof pathObject !== 'object') {
      throw new TypeError('The "pathObject" argument must be of type Object. Received type ' + typeof pathObject);
    }
    return _format('/', pathObject);
  },

  parse: function parse(path) {
    assertPath(path);

    var ret = { root: '', dir: '', base: '', ext: '', name: '' };
    if (path.length === 0) return ret;
    var code = path.charCodeAt(0);
    var isAbsolute = code === 47 /*/*/;
    var start;
    if (isAbsolute) {
      ret.root = '/';
      start = 1;
    } else {
      start = 0;
    }
    var startDot = -1;
    var startPart = 0;
    var end = -1;
    var matchedSlash = true;
    var i = path.length - 1;

    // Track the state of characters (if any) we see before our first dot and
    // after any path separator we find
    var preDotState = 0;

    // Get non-dir info
    for (; i >= start; --i) {
      code = path.charCodeAt(i);
      if (code === 47 /*/*/) {
          // If we reached a path separator that was not part of a set of path
          // separators at the end of the string, stop now
          if (!matchedSlash) {
            startPart = i + 1;
            break;
          }
          continue;
        }
      if (end === -1) {
        // We saw the first non-path separator, mark this as the end of our
        // extension
        matchedSlash = false;
        end = i + 1;
      }
      if (code === 46 /*.*/) {
          // If this is our first dot, mark it as the start of our extension
          if (startDot === -1) startDot = i;else if (preDotState !== 1) preDotState = 1;
        } else if (startDot !== -1) {
        // We saw a non-dot and non-path separator before our dot, so we should
        // have a good chance at having a non-empty extension
        preDotState = -1;
      }
    }

    if (startDot === -1 || end === -1 ||
    // We saw a non-dot character immediately before the dot
    preDotState === 0 ||
    // The (right-most) trimmed path component is exactly '..'
    preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
      if (end !== -1) {
        if (startPart === 0 && isAbsolute) ret.base = ret.name = path.slice(1, end);else ret.base = ret.name = path.slice(startPart, end);
      }
    } else {
      if (startPart === 0 && isAbsolute) {
        ret.name = path.slice(1, startDot);
        ret.base = path.slice(1, end);
      } else {
        ret.name = path.slice(startPart, startDot);
        ret.base = path.slice(startPart, end);
      }
      ret.ext = path.slice(startDot, end);
    }

    if (startPart > 0) ret.dir = path.slice(0, startPart - 1);else if (isAbsolute) ret.dir = '/';

    return ret;
  },

  sep: '/',
  delimiter: ':',
  win32: null,
  posix: null
};

posix.posix = posix;

module.exports = posix;

}).call(this)}).call(this,require('_process'))
},{"_process":183}],89:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

module.exports = Stream;

var EE = require('events').EventEmitter;
var inherits = require('inherits');

inherits(Stream, EE);
Stream.Readable = require('readable-stream/lib/_stream_readable.js');
Stream.Writable = require('readable-stream/lib/_stream_writable.js');
Stream.Duplex = require('readable-stream/lib/_stream_duplex.js');
Stream.Transform = require('readable-stream/lib/_stream_transform.js');
Stream.PassThrough = require('readable-stream/lib/_stream_passthrough.js');
Stream.finished = require('readable-stream/lib/internal/streams/end-of-stream.js')
Stream.pipeline = require('readable-stream/lib/internal/streams/pipeline.js')

// Backwards-compat with node 0.4.x
Stream.Stream = Stream;



// old-style streams.  Note that the pipe method (the only relevant
// part of this class) is overridden in the Readable class.

function Stream() {
  EE.call(this);
}

Stream.prototype.pipe = function(dest, options) {
  var source = this;

  function ondata(chunk) {
    if (dest.writable) {
      if (false === dest.write(chunk) && source.pause) {
        source.pause();
      }
    }
  }

  source.on('data', ondata);

  function ondrain() {
    if (source.readable && source.resume) {
      source.resume();
    }
  }

  dest.on('drain', ondrain);

  // If the 'end' option is not supplied, dest.end() will be called when
  // source gets the 'end' or 'close' events.  Only dest.end() once.
  if (!dest._isStdio && (!options || options.end !== false)) {
    source.on('end', onend);
    source.on('close', onclose);
  }

  var didOnEnd = false;
  function onend() {
    if (didOnEnd) return;
    didOnEnd = true;

    dest.end();
  }


  function onclose() {
    if (didOnEnd) return;
    didOnEnd = true;

    if (typeof dest.destroy === 'function') dest.destroy();
  }

  // don't leave dangling pipes when there are errors.
  function onerror(er) {
    cleanup();
    if (EE.listenerCount(this, 'error') === 0) {
      throw er; // Unhandled stream error in pipe.
    }
  }

  source.on('error', onerror);
  dest.on('error', onerror);

  // remove all the event listeners that were added.
  function cleanup() {
    source.removeListener('data', ondata);
    dest.removeListener('drain', ondrain);

    source.removeListener('end', onend);
    source.removeListener('close', onclose);

    source.removeListener('error', onerror);
    dest.removeListener('error', onerror);

    source.removeListener('end', cleanup);
    source.removeListener('close', cleanup);

    dest.removeListener('close', cleanup);
  }

  source.on('end', cleanup);
  source.on('close', cleanup);

  dest.on('close', cleanup);

  dest.emit('pipe', source);

  // Allow for unix-like usage: A.pipe(B).pipe(C)
  return dest;
};

},{"events":87,"inherits":175,"readable-stream/lib/_stream_duplex.js":91,"readable-stream/lib/_stream_passthrough.js":92,"readable-stream/lib/_stream_readable.js":93,"readable-stream/lib/_stream_transform.js":94,"readable-stream/lib/_stream_writable.js":95,"readable-stream/lib/internal/streams/end-of-stream.js":99,"readable-stream/lib/internal/streams/pipeline.js":101}],90:[function(require,module,exports){
'use strict';

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var codes = {};

function createErrorType(code, message, Base) {
  if (!Base) {
    Base = Error;
  }

  function getMessage(arg1, arg2, arg3) {
    if (typeof message === 'string') {
      return message;
    } else {
      return message(arg1, arg2, arg3);
    }
  }

  var NodeError =
  /*#__PURE__*/
  function (_Base) {
    _inheritsLoose(NodeError, _Base);

    function NodeError(arg1, arg2, arg3) {
      return _Base.call(this, getMessage(arg1, arg2, arg3)) || this;
    }

    return NodeError;
  }(Base);

  NodeError.prototype.name = Base.name;
  NodeError.prototype.code = code;
  codes[code] = NodeError;
} // https://github.com/nodejs/node/blob/v10.8.0/lib/internal/errors.js


function oneOf(expected, thing) {
  if (Array.isArray(expected)) {
    var len = expected.length;
    expected = expected.map(function (i) {
      return String(i);
    });

    if (len > 2) {
      return "one of ".concat(thing, " ").concat(expected.slice(0, len - 1).join(', '), ", or ") + expected[len - 1];
    } else if (len === 2) {
      return "one of ".concat(thing, " ").concat(expected[0], " or ").concat(expected[1]);
    } else {
      return "of ".concat(thing, " ").concat(expected[0]);
    }
  } else {
    return "of ".concat(thing, " ").concat(String(expected));
  }
} // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/startsWith


function startsWith(str, search, pos) {
  return str.substr(!pos || pos < 0 ? 0 : +pos, search.length) === search;
} // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/endsWith


function endsWith(str, search, this_len) {
  if (this_len === undefined || this_len > str.length) {
    this_len = str.length;
  }

  return str.substring(this_len - search.length, this_len) === search;
} // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes


function includes(str, search, start) {
  if (typeof start !== 'number') {
    start = 0;
  }

  if (start + search.length > str.length) {
    return false;
  } else {
    return str.indexOf(search, start) !== -1;
  }
}

createErrorType('ERR_INVALID_OPT_VALUE', function (name, value) {
  return 'The value "' + value + '" is invalid for option "' + name + '"';
}, TypeError);
createErrorType('ERR_INVALID_ARG_TYPE', function (name, expected, actual) {
  // determiner: 'must be' or 'must not be'
  var determiner;

  if (typeof expected === 'string' && startsWith(expected, 'not ')) {
    determiner = 'must not be';
    expected = expected.replace(/^not /, '');
  } else {
    determiner = 'must be';
  }

  var msg;

  if (endsWith(name, ' argument')) {
    // For cases like 'first argument'
    msg = "The ".concat(name, " ").concat(determiner, " ").concat(oneOf(expected, 'type'));
  } else {
    var type = includes(name, '.') ? 'property' : 'argument';
    msg = "The \"".concat(name, "\" ").concat(type, " ").concat(determiner, " ").concat(oneOf(expected, 'type'));
  }

  msg += ". Received type ".concat(typeof actual);
  return msg;
}, TypeError);
createErrorType('ERR_STREAM_PUSH_AFTER_EOF', 'stream.push() after EOF');
createErrorType('ERR_METHOD_NOT_IMPLEMENTED', function (name) {
  return 'The ' + name + ' method is not implemented';
});
createErrorType('ERR_STREAM_PREMATURE_CLOSE', 'Premature close');
createErrorType('ERR_STREAM_DESTROYED', function (name) {
  return 'Cannot call ' + name + ' after a stream was destroyed';
});
createErrorType('ERR_MULTIPLE_CALLBACK', 'Callback called multiple times');
createErrorType('ERR_STREAM_CANNOT_PIPE', 'Cannot pipe, not readable');
createErrorType('ERR_STREAM_WRITE_AFTER_END', 'write after end');
createErrorType('ERR_STREAM_NULL_VALUES', 'May not write null values to stream', TypeError);
createErrorType('ERR_UNKNOWN_ENCODING', function (arg) {
  return 'Unknown encoding: ' + arg;
}, TypeError);
createErrorType('ERR_STREAM_UNSHIFT_AFTER_END_EVENT', 'stream.unshift() after end event');
module.exports.codes = codes;

},{}],91:[function(require,module,exports){
(function (process){(function (){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
// a duplex stream is just a stream that is both readable and writable.
// Since JS doesn't have multiple prototypal inheritance, this class
// prototypally inherits from Readable, and then parasitically from
// Writable.
'use strict';
/*<replacement>*/

var objectKeys = Object.keys || function (obj) {
  var keys = [];

  for (var key in obj) {
    keys.push(key);
  }

  return keys;
};
/*</replacement>*/


module.exports = Duplex;

var Readable = require('./_stream_readable');

var Writable = require('./_stream_writable');

require('inherits')(Duplex, Readable);

{
  // Allow the keys array to be GC'ed.
  var keys = objectKeys(Writable.prototype);

  for (var v = 0; v < keys.length; v++) {
    var method = keys[v];
    if (!Duplex.prototype[method]) Duplex.prototype[method] = Writable.prototype[method];
  }
}

function Duplex(options) {
  if (!(this instanceof Duplex)) return new Duplex(options);
  Readable.call(this, options);
  Writable.call(this, options);
  this.allowHalfOpen = true;

  if (options) {
    if (options.readable === false) this.readable = false;
    if (options.writable === false) this.writable = false;

    if (options.allowHalfOpen === false) {
      this.allowHalfOpen = false;
      this.once('end', onend);
    }
  }
}

Object.defineProperty(Duplex.prototype, 'writableHighWaterMark', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function get() {
    return this._writableState.highWaterMark;
  }
});
Object.defineProperty(Duplex.prototype, 'writableBuffer', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function get() {
    return this._writableState && this._writableState.getBuffer();
  }
});
Object.defineProperty(Duplex.prototype, 'writableLength', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function get() {
    return this._writableState.length;
  }
}); // the no-half-open enforcer

function onend() {
  // If the writable side ended, then we're ok.
  if (this._writableState.ended) return; // no more data can be written.
  // But allow more writes to happen in this tick.

  process.nextTick(onEndNT, this);
}

function onEndNT(self) {
  self.end();
}

Object.defineProperty(Duplex.prototype, 'destroyed', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function get() {
    if (this._readableState === undefined || this._writableState === undefined) {
      return false;
    }

    return this._readableState.destroyed && this._writableState.destroyed;
  },
  set: function set(value) {
    // we ignore the value if the stream
    // has not been initialized yet
    if (this._readableState === undefined || this._writableState === undefined) {
      return;
    } // backward compatibility, the user is explicitly
    // managing destroyed


    this._readableState.destroyed = value;
    this._writableState.destroyed = value;
  }
});
}).call(this)}).call(this,require('_process'))
},{"./_stream_readable":93,"./_stream_writable":95,"_process":183,"inherits":175}],92:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
// a passthrough stream.
// basically just the most minimal sort of Transform stream.
// Every written chunk gets output as-is.
'use strict';

module.exports = PassThrough;

var Transform = require('./_stream_transform');

require('inherits')(PassThrough, Transform);

function PassThrough(options) {
  if (!(this instanceof PassThrough)) return new PassThrough(options);
  Transform.call(this, options);
}

PassThrough.prototype._transform = function (chunk, encoding, cb) {
  cb(null, chunk);
};
},{"./_stream_transform":94,"inherits":175}],93:[function(require,module,exports){
(function (process,global){(function (){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
'use strict';

module.exports = Readable;
/*<replacement>*/

var Duplex;
/*</replacement>*/

Readable.ReadableState = ReadableState;
/*<replacement>*/

var EE = require('events').EventEmitter;

var EElistenerCount = function EElistenerCount(emitter, type) {
  return emitter.listeners(type).length;
};
/*</replacement>*/

/*<replacement>*/


var Stream = require('./internal/streams/stream');
/*</replacement>*/


var Buffer = require('buffer').Buffer;

var OurUint8Array = global.Uint8Array || function () {};

function _uint8ArrayToBuffer(chunk) {
  return Buffer.from(chunk);
}

function _isUint8Array(obj) {
  return Buffer.isBuffer(obj) || obj instanceof OurUint8Array;
}
/*<replacement>*/


var debugUtil = require('util');

var debug;

if (debugUtil && debugUtil.debuglog) {
  debug = debugUtil.debuglog('stream');
} else {
  debug = function debug() {};
}
/*</replacement>*/


var BufferList = require('./internal/streams/buffer_list');

var destroyImpl = require('./internal/streams/destroy');

var _require = require('./internal/streams/state'),
    getHighWaterMark = _require.getHighWaterMark;

var _require$codes = require('../errors').codes,
    ERR_INVALID_ARG_TYPE = _require$codes.ERR_INVALID_ARG_TYPE,
    ERR_STREAM_PUSH_AFTER_EOF = _require$codes.ERR_STREAM_PUSH_AFTER_EOF,
    ERR_METHOD_NOT_IMPLEMENTED = _require$codes.ERR_METHOD_NOT_IMPLEMENTED,
    ERR_STREAM_UNSHIFT_AFTER_END_EVENT = _require$codes.ERR_STREAM_UNSHIFT_AFTER_END_EVENT; // Lazy loaded to improve the startup performance.


var StringDecoder;
var createReadableStreamAsyncIterator;
var from;

require('inherits')(Readable, Stream);

var errorOrDestroy = destroyImpl.errorOrDestroy;
var kProxyEvents = ['error', 'close', 'destroy', 'pause', 'resume'];

function prependListener(emitter, event, fn) {
  // Sadly this is not cacheable as some libraries bundle their own
  // event emitter implementation with them.
  if (typeof emitter.prependListener === 'function') return emitter.prependListener(event, fn); // This is a hack to make sure that our error handler is attached before any
  // userland ones.  NEVER DO THIS. This is here only because this code needs
  // to continue to work with older versions of Node.js that do not include
  // the prependListener() method. The goal is to eventually remove this hack.

  if (!emitter._events || !emitter._events[event]) emitter.on(event, fn);else if (Array.isArray(emitter._events[event])) emitter._events[event].unshift(fn);else emitter._events[event] = [fn, emitter._events[event]];
}

function ReadableState(options, stream, isDuplex) {
  Duplex = Duplex || require('./_stream_duplex');
  options = options || {}; // Duplex streams are both readable and writable, but share
  // the same options object.
  // However, some cases require setting options to different
  // values for the readable and the writable sides of the duplex stream.
  // These options can be provided separately as readableXXX and writableXXX.

  if (typeof isDuplex !== 'boolean') isDuplex = stream instanceof Duplex; // object stream flag. Used to make read(n) ignore n and to
  // make all the buffer merging and length checks go away

  this.objectMode = !!options.objectMode;
  if (isDuplex) this.objectMode = this.objectMode || !!options.readableObjectMode; // the point at which it stops calling _read() to fill the buffer
  // Note: 0 is a valid value, means "don't call _read preemptively ever"

  this.highWaterMark = getHighWaterMark(this, options, 'readableHighWaterMark', isDuplex); // A linked list is used to store data chunks instead of an array because the
  // linked list can remove elements from the beginning faster than
  // array.shift()

  this.buffer = new BufferList();
  this.length = 0;
  this.pipes = null;
  this.pipesCount = 0;
  this.flowing = null;
  this.ended = false;
  this.endEmitted = false;
  this.reading = false; // a flag to be able to tell if the event 'readable'/'data' is emitted
  // immediately, or on a later tick.  We set this to true at first, because
  // any actions that shouldn't happen until "later" should generally also
  // not happen before the first read call.

  this.sync = true; // whenever we return null, then we set a flag to say
  // that we're awaiting a 'readable' event emission.

  this.needReadable = false;
  this.emittedReadable = false;
  this.readableListening = false;
  this.resumeScheduled = false;
  this.paused = true; // Should close be emitted on destroy. Defaults to true.

  this.emitClose = options.emitClose !== false; // Should .destroy() be called after 'end' (and potentially 'finish')

  this.autoDestroy = !!options.autoDestroy; // has it been destroyed

  this.destroyed = false; // Crypto is kind of old and crusty.  Historically, its default string
  // encoding is 'binary' so we have to make this configurable.
  // Everything else in the universe uses 'utf8', though.

  this.defaultEncoding = options.defaultEncoding || 'utf8'; // the number of writers that are awaiting a drain event in .pipe()s

  this.awaitDrain = 0; // if true, a maybeReadMore has been scheduled

  this.readingMore = false;
  this.decoder = null;
  this.encoding = null;

  if (options.encoding) {
    if (!StringDecoder) StringDecoder = require('string_decoder/').StringDecoder;
    this.decoder = new StringDecoder(options.encoding);
    this.encoding = options.encoding;
  }
}

function Readable(options) {
  Duplex = Duplex || require('./_stream_duplex');
  if (!(this instanceof Readable)) return new Readable(options); // Checking for a Stream.Duplex instance is faster here instead of inside
  // the ReadableState constructor, at least with V8 6.5

  var isDuplex = this instanceof Duplex;
  this._readableState = new ReadableState(options, this, isDuplex); // legacy

  this.readable = true;

  if (options) {
    if (typeof options.read === 'function') this._read = options.read;
    if (typeof options.destroy === 'function') this._destroy = options.destroy;
  }

  Stream.call(this);
}

Object.defineProperty(Readable.prototype, 'destroyed', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function get() {
    if (this._readableState === undefined) {
      return false;
    }

    return this._readableState.destroyed;
  },
  set: function set(value) {
    // we ignore the value if the stream
    // has not been initialized yet
    if (!this._readableState) {
      return;
    } // backward compatibility, the user is explicitly
    // managing destroyed


    this._readableState.destroyed = value;
  }
});
Readable.prototype.destroy = destroyImpl.destroy;
Readable.prototype._undestroy = destroyImpl.undestroy;

Readable.prototype._destroy = function (err, cb) {
  cb(err);
}; // Manually shove something into the read() buffer.
// This returns true if the highWaterMark has not been hit yet,
// similar to how Writable.write() returns true if you should
// write() some more.


Readable.prototype.push = function (chunk, encoding) {
  var state = this._readableState;
  var skipChunkCheck;

  if (!state.objectMode) {
    if (typeof chunk === 'string') {
      encoding = encoding || state.defaultEncoding;

      if (encoding !== state.encoding) {
        chunk = Buffer.from(chunk, encoding);
        encoding = '';
      }

      skipChunkCheck = true;
    }
  } else {
    skipChunkCheck = true;
  }

  return readableAddChunk(this, chunk, encoding, false, skipChunkCheck);
}; // Unshift should *always* be something directly out of read()


Readable.prototype.unshift = function (chunk) {
  return readableAddChunk(this, chunk, null, true, false);
};

function readableAddChunk(stream, chunk, encoding, addToFront, skipChunkCheck) {
  debug('readableAddChunk', chunk);
  var state = stream._readableState;

  if (chunk === null) {
    state.reading = false;
    onEofChunk(stream, state);
  } else {
    var er;
    if (!skipChunkCheck) er = chunkInvalid(state, chunk);

    if (er) {
      errorOrDestroy(stream, er);
    } else if (state.objectMode || chunk && chunk.length > 0) {
      if (typeof chunk !== 'string' && !state.objectMode && Object.getPrototypeOf(chunk) !== Buffer.prototype) {
        chunk = _uint8ArrayToBuffer(chunk);
      }

      if (addToFront) {
        if (state.endEmitted) errorOrDestroy(stream, new ERR_STREAM_UNSHIFT_AFTER_END_EVENT());else addChunk(stream, state, chunk, true);
      } else if (state.ended) {
        errorOrDestroy(stream, new ERR_STREAM_PUSH_AFTER_EOF());
      } else if (state.destroyed) {
        return false;
      } else {
        state.reading = false;

        if (state.decoder && !encoding) {
          chunk = state.decoder.write(chunk);
          if (state.objectMode || chunk.length !== 0) addChunk(stream, state, chunk, false);else maybeReadMore(stream, state);
        } else {
          addChunk(stream, state, chunk, false);
        }
      }
    } else if (!addToFront) {
      state.reading = false;
      maybeReadMore(stream, state);
    }
  } // We can push more data if we are below the highWaterMark.
  // Also, if we have no data yet, we can stand some more bytes.
  // This is to work around cases where hwm=0, such as the repl.


  return !state.ended && (state.length < state.highWaterMark || state.length === 0);
}

function addChunk(stream, state, chunk, addToFront) {
  if (state.flowing && state.length === 0 && !state.sync) {
    state.awaitDrain = 0;
    stream.emit('data', chunk);
  } else {
    // update the buffer info.
    state.length += state.objectMode ? 1 : chunk.length;
    if (addToFront) state.buffer.unshift(chunk);else state.buffer.push(chunk);
    if (state.needReadable) emitReadable(stream);
  }

  maybeReadMore(stream, state);
}

function chunkInvalid(state, chunk) {
  var er;

  if (!_isUint8Array(chunk) && typeof chunk !== 'string' && chunk !== undefined && !state.objectMode) {
    er = new ERR_INVALID_ARG_TYPE('chunk', ['string', 'Buffer', 'Uint8Array'], chunk);
  }

  return er;
}

Readable.prototype.isPaused = function () {
  return this._readableState.flowing === false;
}; // backwards compatibility.


Readable.prototype.setEncoding = function (enc) {
  if (!StringDecoder) StringDecoder = require('string_decoder/').StringDecoder;
  var decoder = new StringDecoder(enc);
  this._readableState.decoder = decoder; // If setEncoding(null), decoder.encoding equals utf8

  this._readableState.encoding = this._readableState.decoder.encoding; // Iterate over current buffer to convert already stored Buffers:

  var p = this._readableState.buffer.head;
  var content = '';

  while (p !== null) {
    content += decoder.write(p.data);
    p = p.next;
  }

  this._readableState.buffer.clear();

  if (content !== '') this._readableState.buffer.push(content);
  this._readableState.length = content.length;
  return this;
}; // Don't raise the hwm > 1GB


var MAX_HWM = 0x40000000;

function computeNewHighWaterMark(n) {
  if (n >= MAX_HWM) {
    // TODO(ronag): Throw ERR_VALUE_OUT_OF_RANGE.
    n = MAX_HWM;
  } else {
    // Get the next highest power of 2 to prevent increasing hwm excessively in
    // tiny amounts
    n--;
    n |= n >>> 1;
    n |= n >>> 2;
    n |= n >>> 4;
    n |= n >>> 8;
    n |= n >>> 16;
    n++;
  }

  return n;
} // This function is designed to be inlinable, so please take care when making
// changes to the function body.


function howMuchToRead(n, state) {
  if (n <= 0 || state.length === 0 && state.ended) return 0;
  if (state.objectMode) return 1;

  if (n !== n) {
    // Only flow one buffer at a time
    if (state.flowing && state.length) return state.buffer.head.data.length;else return state.length;
  } // If we're asking for more than the current hwm, then raise the hwm.


  if (n > state.highWaterMark) state.highWaterMark = computeNewHighWaterMark(n);
  if (n <= state.length) return n; // Don't have enough

  if (!state.ended) {
    state.needReadable = true;
    return 0;
  }

  return state.length;
} // you can override either this method, or the async _read(n) below.


Readable.prototype.read = function (n) {
  debug('read', n);
  n = parseInt(n, 10);
  var state = this._readableState;
  var nOrig = n;
  if (n !== 0) state.emittedReadable = false; // if we're doing read(0) to trigger a readable event, but we
  // already have a bunch of data in the buffer, then just trigger
  // the 'readable' event and move on.

  if (n === 0 && state.needReadable && ((state.highWaterMark !== 0 ? state.length >= state.highWaterMark : state.length > 0) || state.ended)) {
    debug('read: emitReadable', state.length, state.ended);
    if (state.length === 0 && state.ended) endReadable(this);else emitReadable(this);
    return null;
  }

  n = howMuchToRead(n, state); // if we've ended, and we're now clear, then finish it up.

  if (n === 0 && state.ended) {
    if (state.length === 0) endReadable(this);
    return null;
  } // All the actual chunk generation logic needs to be
  // *below* the call to _read.  The reason is that in certain
  // synthetic stream cases, such as passthrough streams, _read
  // may be a completely synchronous operation which may change
  // the state of the read buffer, providing enough data when
  // before there was *not* enough.
  //
  // So, the steps are:
  // 1. Figure out what the state of things will be after we do
  // a read from the buffer.
  //
  // 2. If that resulting state will trigger a _read, then call _read.
  // Note that this may be asynchronous, or synchronous.  Yes, it is
  // deeply ugly to write APIs this way, but that still doesn't mean
  // that the Readable class should behave improperly, as streams are
  // designed to be sync/async agnostic.
  // Take note if the _read call is sync or async (ie, if the read call
  // has returned yet), so that we know whether or not it's safe to emit
  // 'readable' etc.
  //
  // 3. Actually pull the requested chunks out of the buffer and return.
  // if we need a readable event, then we need to do some reading.


  var doRead = state.needReadable;
  debug('need readable', doRead); // if we currently have less than the highWaterMark, then also read some

  if (state.length === 0 || state.length - n < state.highWaterMark) {
    doRead = true;
    debug('length less than watermark', doRead);
  } // however, if we've ended, then there's no point, and if we're already
  // reading, then it's unnecessary.


  if (state.ended || state.reading) {
    doRead = false;
    debug('reading or ended', doRead);
  } else if (doRead) {
    debug('do read');
    state.reading = true;
    state.sync = true; // if the length is currently zero, then we *need* a readable event.

    if (state.length === 0) state.needReadable = true; // call internal read method

    this._read(state.highWaterMark);

    state.sync = false; // If _read pushed data synchronously, then `reading` will be false,
    // and we need to re-evaluate how much data we can return to the user.

    if (!state.reading) n = howMuchToRead(nOrig, state);
  }

  var ret;
  if (n > 0) ret = fromList(n, state);else ret = null;

  if (ret === null) {
    state.needReadable = state.length <= state.highWaterMark;
    n = 0;
  } else {
    state.length -= n;
    state.awaitDrain = 0;
  }

  if (state.length === 0) {
    // If we have nothing in the buffer, then we want to know
    // as soon as we *do* get something into the buffer.
    if (!state.ended) state.needReadable = true; // If we tried to read() past the EOF, then emit end on the next tick.

    if (nOrig !== n && state.ended) endReadable(this);
  }

  if (ret !== null) this.emit('data', ret);
  return ret;
};

function onEofChunk(stream, state) {
  debug('onEofChunk');
  if (state.ended) return;

  if (state.decoder) {
    var chunk = state.decoder.end();

    if (chunk && chunk.length) {
      state.buffer.push(chunk);
      state.length += state.objectMode ? 1 : chunk.length;
    }
  }

  state.ended = true;

  if (state.sync) {
    // if we are sync, wait until next tick to emit the data.
    // Otherwise we risk emitting data in the flow()
    // the readable code triggers during a read() call
    emitReadable(stream);
  } else {
    // emit 'readable' now to make sure it gets picked up.
    state.needReadable = false;

    if (!state.emittedReadable) {
      state.emittedReadable = true;
      emitReadable_(stream);
    }
  }
} // Don't emit readable right away in sync mode, because this can trigger
// another read() call => stack overflow.  This way, it might trigger
// a nextTick recursion warning, but that's not so bad.


function emitReadable(stream) {
  var state = stream._readableState;
  debug('emitReadable', state.needReadable, state.emittedReadable);
  state.needReadable = false;

  if (!state.emittedReadable) {
    debug('emitReadable', state.flowing);
    state.emittedReadable = true;
    process.nextTick(emitReadable_, stream);
  }
}

function emitReadable_(stream) {
  var state = stream._readableState;
  debug('emitReadable_', state.destroyed, state.length, state.ended);

  if (!state.destroyed && (state.length || state.ended)) {
    stream.emit('readable');
    state.emittedReadable = false;
  } // The stream needs another readable event if
  // 1. It is not flowing, as the flow mechanism will take
  //    care of it.
  // 2. It is not ended.
  // 3. It is below the highWaterMark, so we can schedule
  //    another readable later.


  state.needReadable = !state.flowing && !state.ended && state.length <= state.highWaterMark;
  flow(stream);
} // at this point, the user has presumably seen the 'readable' event,
// and called read() to consume some data.  that may have triggered
// in turn another _read(n) call, in which case reading = true if
// it's in progress.
// However, if we're not ended, or reading, and the length < hwm,
// then go ahead and try to read some more preemptively.


function maybeReadMore(stream, state) {
  if (!state.readingMore) {
    state.readingMore = true;
    process.nextTick(maybeReadMore_, stream, state);
  }
}

function maybeReadMore_(stream, state) {
  // Attempt to read more data if we should.
  //
  // The conditions for reading more data are (one of):
  // - Not enough data buffered (state.length < state.highWaterMark). The loop
  //   is responsible for filling the buffer with enough data if such data
  //   is available. If highWaterMark is 0 and we are not in the flowing mode
  //   we should _not_ attempt to buffer any extra data. We'll get more data
  //   when the stream consumer calls read() instead.
  // - No data in the buffer, and the stream is in flowing mode. In this mode
  //   the loop below is responsible for ensuring read() is called. Failing to
  //   call read here would abort the flow and there's no other mechanism for
  //   continuing the flow if the stream consumer has just subscribed to the
  //   'data' event.
  //
  // In addition to the above conditions to keep reading data, the following
  // conditions prevent the data from being read:
  // - The stream has ended (state.ended).
  // - There is already a pending 'read' operation (state.reading). This is a
  //   case where the the stream has called the implementation defined _read()
  //   method, but they are processing the call asynchronously and have _not_
  //   called push() with new data. In this case we skip performing more
  //   read()s. The execution ends in this method again after the _read() ends
  //   up calling push() with more data.
  while (!state.reading && !state.ended && (state.length < state.highWaterMark || state.flowing && state.length === 0)) {
    var len = state.length;
    debug('maybeReadMore read 0');
    stream.read(0);
    if (len === state.length) // didn't get any data, stop spinning.
      break;
  }

  state.readingMore = false;
} // abstract method.  to be overridden in specific implementation classes.
// call cb(er, data) where data is <= n in length.
// for virtual (non-string, non-buffer) streams, "length" is somewhat
// arbitrary, and perhaps not very meaningful.


Readable.prototype._read = function (n) {
  errorOrDestroy(this, new ERR_METHOD_NOT_IMPLEMENTED('_read()'));
};

Readable.prototype.pipe = function (dest, pipeOpts) {
  var src = this;
  var state = this._readableState;

  switch (state.pipesCount) {
    case 0:
      state.pipes = dest;
      break;

    case 1:
      state.pipes = [state.pipes, dest];
      break;

    default:
      state.pipes.push(dest);
      break;
  }

  state.pipesCount += 1;
  debug('pipe count=%d opts=%j', state.pipesCount, pipeOpts);
  var doEnd = (!pipeOpts || pipeOpts.end !== false) && dest !== process.stdout && dest !== process.stderr;
  var endFn = doEnd ? onend : unpipe;
  if (state.endEmitted) process.nextTick(endFn);else src.once('end', endFn);
  dest.on('unpipe', onunpipe);

  function onunpipe(readable, unpipeInfo) {
    debug('onunpipe');

    if (readable === src) {
      if (unpipeInfo && unpipeInfo.hasUnpiped === false) {
        unpipeInfo.hasUnpiped = true;
        cleanup();
      }
    }
  }

  function onend() {
    debug('onend');
    dest.end();
  } // when the dest drains, it reduces the awaitDrain counter
  // on the source.  This would be more elegant with a .once()
  // handler in flow(), but adding and removing repeatedly is
  // too slow.


  var ondrain = pipeOnDrain(src);
  dest.on('drain', ondrain);
  var cleanedUp = false;

  function cleanup() {
    debug('cleanup'); // cleanup event handlers once the pipe is broken

    dest.removeListener('close', onclose);
    dest.removeListener('finish', onfinish);
    dest.removeListener('drain', ondrain);
    dest.removeListener('error', onerror);
    dest.removeListener('unpipe', onunpipe);
    src.removeListener('end', onend);
    src.removeListener('end', unpipe);
    src.removeListener('data', ondata);
    cleanedUp = true; // if the reader is waiting for a drain event from this
    // specific writer, then it would cause it to never start
    // flowing again.
    // So, if this is awaiting a drain, then we just call it now.
    // If we don't know, then assume that we are waiting for one.

    if (state.awaitDrain && (!dest._writableState || dest._writableState.needDrain)) ondrain();
  }

  src.on('data', ondata);

  function ondata(chunk) {
    debug('ondata');
    var ret = dest.write(chunk);
    debug('dest.write', ret);

    if (ret === false) {
      // If the user unpiped during `dest.write()`, it is possible
      // to get stuck in a permanently paused state if that write
      // also returned false.
      // => Check whether `dest` is still a piping destination.
      if ((state.pipesCount === 1 && state.pipes === dest || state.pipesCount > 1 && indexOf(state.pipes, dest) !== -1) && !cleanedUp) {
        debug('false write response, pause', state.awaitDrain);
        state.awaitDrain++;
      }

      src.pause();
    }
  } // if the dest has an error, then stop piping into it.
  // however, don't suppress the throwing behavior for this.


  function onerror(er) {
    debug('onerror', er);
    unpipe();
    dest.removeListener('error', onerror);
    if (EElistenerCount(dest, 'error') === 0) errorOrDestroy(dest, er);
  } // Make sure our error handler is attached before userland ones.


  prependListener(dest, 'error', onerror); // Both close and finish should trigger unpipe, but only once.

  function onclose() {
    dest.removeListener('finish', onfinish);
    unpipe();
  }

  dest.once('close', onclose);

  function onfinish() {
    debug('onfinish');
    dest.removeListener('close', onclose);
    unpipe();
  }

  dest.once('finish', onfinish);

  function unpipe() {
    debug('unpipe');
    src.unpipe(dest);
  } // tell the dest that it's being piped to


  dest.emit('pipe', src); // start the flow if it hasn't been started already.

  if (!state.flowing) {
    debug('pipe resume');
    src.resume();
  }

  return dest;
};

function pipeOnDrain(src) {
  return function pipeOnDrainFunctionResult() {
    var state = src._readableState;
    debug('pipeOnDrain', state.awaitDrain);
    if (state.awaitDrain) state.awaitDrain--;

    if (state.awaitDrain === 0 && EElistenerCount(src, 'data')) {
      state.flowing = true;
      flow(src);
    }
  };
}

Readable.prototype.unpipe = function (dest) {
  var state = this._readableState;
  var unpipeInfo = {
    hasUnpiped: false
  }; // if we're not piping anywhere, then do nothing.

  if (state.pipesCount === 0) return this; // just one destination.  most common case.

  if (state.pipesCount === 1) {
    // passed in one, but it's not the right one.
    if (dest && dest !== state.pipes) return this;
    if (!dest) dest = state.pipes; // got a match.

    state.pipes = null;
    state.pipesCount = 0;
    state.flowing = false;
    if (dest) dest.emit('unpipe', this, unpipeInfo);
    return this;
  } // slow case. multiple pipe destinations.


  if (!dest) {
    // remove all.
    var dests = state.pipes;
    var len = state.pipesCount;
    state.pipes = null;
    state.pipesCount = 0;
    state.flowing = false;

    for (var i = 0; i < len; i++) {
      dests[i].emit('unpipe', this, {
        hasUnpiped: false
      });
    }

    return this;
  } // try to find the right one.


  var index = indexOf(state.pipes, dest);
  if (index === -1) return this;
  state.pipes.splice(index, 1);
  state.pipesCount -= 1;
  if (state.pipesCount === 1) state.pipes = state.pipes[0];
  dest.emit('unpipe', this, unpipeInfo);
  return this;
}; // set up data events if they are asked for
// Ensure readable listeners eventually get something


Readable.prototype.on = function (ev, fn) {
  var res = Stream.prototype.on.call(this, ev, fn);
  var state = this._readableState;

  if (ev === 'data') {
    // update readableListening so that resume() may be a no-op
    // a few lines down. This is needed to support once('readable').
    state.readableListening = this.listenerCount('readable') > 0; // Try start flowing on next tick if stream isn't explicitly paused

    if (state.flowing !== false) this.resume();
  } else if (ev === 'readable') {
    if (!state.endEmitted && !state.readableListening) {
      state.readableListening = state.needReadable = true;
      state.flowing = false;
      state.emittedReadable = false;
      debug('on readable', state.length, state.reading);

      if (state.length) {
        emitReadable(this);
      } else if (!state.reading) {
        process.nextTick(nReadingNextTick, this);
      }
    }
  }

  return res;
};

Readable.prototype.addListener = Readable.prototype.on;

Readable.prototype.removeListener = function (ev, fn) {
  var res = Stream.prototype.removeListener.call(this, ev, fn);

  if (ev === 'readable') {
    // We need to check if there is someone still listening to
    // readable and reset the state. However this needs to happen
    // after readable has been emitted but before I/O (nextTick) to
    // support once('readable', fn) cycles. This means that calling
    // resume within the same tick will have no
    // effect.
    process.nextTick(updateReadableListening, this);
  }

  return res;
};

Readable.prototype.removeAllListeners = function (ev) {
  var res = Stream.prototype.removeAllListeners.apply(this, arguments);

  if (ev === 'readable' || ev === undefined) {
    // We need to check if there is someone still listening to
    // readable and reset the state. However this needs to happen
    // after readable has been emitted but before I/O (nextTick) to
    // support once('readable', fn) cycles. This means that calling
    // resume within the same tick will have no
    // effect.
    process.nextTick(updateReadableListening, this);
  }

  return res;
};

function updateReadableListening(self) {
  var state = self._readableState;
  state.readableListening = self.listenerCount('readable') > 0;

  if (state.resumeScheduled && !state.paused) {
    // flowing needs to be set to true now, otherwise
    // the upcoming resume will not flow.
    state.flowing = true; // crude way to check if we should resume
  } else if (self.listenerCount('data') > 0) {
    self.resume();
  }
}

function nReadingNextTick(self) {
  debug('readable nexttick read 0');
  self.read(0);
} // pause() and resume() are remnants of the legacy readable stream API
// If the user uses them, then switch into old mode.


Readable.prototype.resume = function () {
  var state = this._readableState;

  if (!state.flowing) {
    debug('resume'); // we flow only if there is no one listening
    // for readable, but we still have to call
    // resume()

    state.flowing = !state.readableListening;
    resume(this, state);
  }

  state.paused = false;
  return this;
};

function resume(stream, state) {
  if (!state.resumeScheduled) {
    state.resumeScheduled = true;
    process.nextTick(resume_, stream, state);
  }
}

function resume_(stream, state) {
  debug('resume', state.reading);

  if (!state.reading) {
    stream.read(0);
  }

  state.resumeScheduled = false;
  stream.emit('resume');
  flow(stream);
  if (state.flowing && !state.reading) stream.read(0);
}

Readable.prototype.pause = function () {
  debug('call pause flowing=%j', this._readableState.flowing);

  if (this._readableState.flowing !== false) {
    debug('pause');
    this._readableState.flowing = false;
    this.emit('pause');
  }

  this._readableState.paused = true;
  return this;
};

function flow(stream) {
  var state = stream._readableState;
  debug('flow', state.flowing);

  while (state.flowing && stream.read() !== null) {
    ;
  }
} // wrap an old-style stream as the async data source.
// This is *not* part of the readable stream interface.
// It is an ugly unfortunate mess of history.


Readable.prototype.wrap = function (stream) {
  var _this = this;

  var state = this._readableState;
  var paused = false;
  stream.on('end', function () {
    debug('wrapped end');

    if (state.decoder && !state.ended) {
      var chunk = state.decoder.end();
      if (chunk && chunk.length) _this.push(chunk);
    }

    _this.push(null);
  });
  stream.on('data', function (chunk) {
    debug('wrapped data');
    if (state.decoder) chunk = state.decoder.write(chunk); // don't skip over falsy values in objectMode

    if (state.objectMode && (chunk === null || chunk === undefined)) return;else if (!state.objectMode && (!chunk || !chunk.length)) return;

    var ret = _this.push(chunk);

    if (!ret) {
      paused = true;
      stream.pause();
    }
  }); // proxy all the other methods.
  // important when wrapping filters and duplexes.

  for (var i in stream) {
    if (this[i] === undefined && typeof stream[i] === 'function') {
      this[i] = function methodWrap(method) {
        return function methodWrapReturnFunction() {
          return stream[method].apply(stream, arguments);
        };
      }(i);
    }
  } // proxy certain important events.


  for (var n = 0; n < kProxyEvents.length; n++) {
    stream.on(kProxyEvents[n], this.emit.bind(this, kProxyEvents[n]));
  } // when we try to consume some more bytes, simply unpause the
  // underlying stream.


  this._read = function (n) {
    debug('wrapped _read', n);

    if (paused) {
      paused = false;
      stream.resume();
    }
  };

  return this;
};

if (typeof Symbol === 'function') {
  Readable.prototype[Symbol.asyncIterator] = function () {
    if (createReadableStreamAsyncIterator === undefined) {
      createReadableStreamAsyncIterator = require('./internal/streams/async_iterator');
    }

    return createReadableStreamAsyncIterator(this);
  };
}

Object.defineProperty(Readable.prototype, 'readableHighWaterMark', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function get() {
    return this._readableState.highWaterMark;
  }
});
Object.defineProperty(Readable.prototype, 'readableBuffer', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function get() {
    return this._readableState && this._readableState.buffer;
  }
});
Object.defineProperty(Readable.prototype, 'readableFlowing', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function get() {
    return this._readableState.flowing;
  },
  set: function set(state) {
    if (this._readableState) {
      this._readableState.flowing = state;
    }
  }
}); // exposed for testing purposes only.

Readable._fromList = fromList;
Object.defineProperty(Readable.prototype, 'readableLength', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function get() {
    return this._readableState.length;
  }
}); // Pluck off n bytes from an array of buffers.
// Length is the combined lengths of all the buffers in the list.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.

function fromList(n, state) {
  // nothing buffered
  if (state.length === 0) return null;
  var ret;
  if (state.objectMode) ret = state.buffer.shift();else if (!n || n >= state.length) {
    // read it all, truncate the list
    if (state.decoder) ret = state.buffer.join('');else if (state.buffer.length === 1) ret = state.buffer.first();else ret = state.buffer.concat(state.length);
    state.buffer.clear();
  } else {
    // read part of list
    ret = state.buffer.consume(n, state.decoder);
  }
  return ret;
}

function endReadable(stream) {
  var state = stream._readableState;
  debug('endReadable', state.endEmitted);

  if (!state.endEmitted) {
    state.ended = true;
    process.nextTick(endReadableNT, state, stream);
  }
}

function endReadableNT(state, stream) {
  debug('endReadableNT', state.endEmitted, state.length); // Check that we didn't get one last unshift.

  if (!state.endEmitted && state.length === 0) {
    state.endEmitted = true;
    stream.readable = false;
    stream.emit('end');

    if (state.autoDestroy) {
      // In case of duplex streams we need a way to detect
      // if the writable side is ready for autoDestroy as well
      var wState = stream._writableState;

      if (!wState || wState.autoDestroy && wState.finished) {
        stream.destroy();
      }
    }
  }
}

if (typeof Symbol === 'function') {
  Readable.from = function (iterable, opts) {
    if (from === undefined) {
      from = require('./internal/streams/from');
    }

    return from(Readable, iterable, opts);
  };
}

function indexOf(xs, x) {
  for (var i = 0, l = xs.length; i < l; i++) {
    if (xs[i] === x) return i;
  }

  return -1;
}
}).call(this)}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../errors":90,"./_stream_duplex":91,"./internal/streams/async_iterator":96,"./internal/streams/buffer_list":97,"./internal/streams/destroy":98,"./internal/streams/from":100,"./internal/streams/state":102,"./internal/streams/stream":103,"_process":183,"buffer":104,"events":87,"inherits":175,"string_decoder/":191,"util":85}],94:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
// a transform stream is a readable/writable stream where you do
// something with the data.  Sometimes it's called a "filter",
// but that's not a great name for it, since that implies a thing where
// some bits pass through, and others are simply ignored.  (That would
// be a valid example of a transform, of course.)
//
// While the output is causally related to the input, it's not a
// necessarily symmetric or synchronous transformation.  For example,
// a zlib stream might take multiple plain-text writes(), and then
// emit a single compressed chunk some time in the future.
//
// Here's how this works:
//
// The Transform stream has all the aspects of the readable and writable
// stream classes.  When you write(chunk), that calls _write(chunk,cb)
// internally, and returns false if there's a lot of pending writes
// buffered up.  When you call read(), that calls _read(n) until
// there's enough pending readable data buffered up.
//
// In a transform stream, the written data is placed in a buffer.  When
// _read(n) is called, it transforms the queued up data, calling the
// buffered _write cb's as it consumes chunks.  If consuming a single
// written chunk would result in multiple output chunks, then the first
// outputted bit calls the readcb, and subsequent chunks just go into
// the read buffer, and will cause it to emit 'readable' if necessary.
//
// This way, back-pressure is actually determined by the reading side,
// since _read has to be called to start processing a new chunk.  However,
// a pathological inflate type of transform can cause excessive buffering
// here.  For example, imagine a stream where every byte of input is
// interpreted as an integer from 0-255, and then results in that many
// bytes of output.  Writing the 4 bytes {ff,ff,ff,ff} would result in
// 1kb of data being output.  In this case, you could write a very small
// amount of input, and end up with a very large amount of output.  In
// such a pathological inflating mechanism, there'd be no way to tell
// the system to stop doing the transform.  A single 4MB write could
// cause the system to run out of memory.
//
// However, even in such a pathological case, only a single written chunk
// would be consumed, and then the rest would wait (un-transformed) until
// the results of the previous transformed chunk were consumed.
'use strict';

module.exports = Transform;

var _require$codes = require('../errors').codes,
    ERR_METHOD_NOT_IMPLEMENTED = _require$codes.ERR_METHOD_NOT_IMPLEMENTED,
    ERR_MULTIPLE_CALLBACK = _require$codes.ERR_MULTIPLE_CALLBACK,
    ERR_TRANSFORM_ALREADY_TRANSFORMING = _require$codes.ERR_TRANSFORM_ALREADY_TRANSFORMING,
    ERR_TRANSFORM_WITH_LENGTH_0 = _require$codes.ERR_TRANSFORM_WITH_LENGTH_0;

var Duplex = require('./_stream_duplex');

require('inherits')(Transform, Duplex);

function afterTransform(er, data) {
  var ts = this._transformState;
  ts.transforming = false;
  var cb = ts.writecb;

  if (cb === null) {
    return this.emit('error', new ERR_MULTIPLE_CALLBACK());
  }

  ts.writechunk = null;
  ts.writecb = null;
  if (data != null) // single equals check for both `null` and `undefined`
    this.push(data);
  cb(er);
  var rs = this._readableState;
  rs.reading = false;

  if (rs.needReadable || rs.length < rs.highWaterMark) {
    this._read(rs.highWaterMark);
  }
}

function Transform(options) {
  if (!(this instanceof Transform)) return new Transform(options);
  Duplex.call(this, options);
  this._transformState = {
    afterTransform: afterTransform.bind(this),
    needTransform: false,
    transforming: false,
    writecb: null,
    writechunk: null,
    writeencoding: null
  }; // start out asking for a readable event once data is transformed.

  this._readableState.needReadable = true; // we have implemented the _read method, and done the other things
  // that Readable wants before the first _read call, so unset the
  // sync guard flag.

  this._readableState.sync = false;

  if (options) {
    if (typeof options.transform === 'function') this._transform = options.transform;
    if (typeof options.flush === 'function') this._flush = options.flush;
  } // When the writable side finishes, then flush out anything remaining.


  this.on('prefinish', prefinish);
}

function prefinish() {
  var _this = this;

  if (typeof this._flush === 'function' && !this._readableState.destroyed) {
    this._flush(function (er, data) {
      done(_this, er, data);
    });
  } else {
    done(this, null, null);
  }
}

Transform.prototype.push = function (chunk, encoding) {
  this._transformState.needTransform = false;
  return Duplex.prototype.push.call(this, chunk, encoding);
}; // This is the part where you do stuff!
// override this function in implementation classes.
// 'chunk' is an input chunk.
//
// Call `push(newChunk)` to pass along transformed output
// to the readable side.  You may call 'push' zero or more times.
//
// Call `cb(err)` when you are done with this chunk.  If you pass
// an error, then that'll put the hurt on the whole operation.  If you
// never call cb(), then you'll never get another chunk.


Transform.prototype._transform = function (chunk, encoding, cb) {
  cb(new ERR_METHOD_NOT_IMPLEMENTED('_transform()'));
};

Transform.prototype._write = function (chunk, encoding, cb) {
  var ts = this._transformState;
  ts.writecb = cb;
  ts.writechunk = chunk;
  ts.writeencoding = encoding;

  if (!ts.transforming) {
    var rs = this._readableState;
    if (ts.needTransform || rs.needReadable || rs.length < rs.highWaterMark) this._read(rs.highWaterMark);
  }
}; // Doesn't matter what the args are here.
// _transform does all the work.
// That we got here means that the readable side wants more data.


Transform.prototype._read = function (n) {
  var ts = this._transformState;

  if (ts.writechunk !== null && !ts.transforming) {
    ts.transforming = true;

    this._transform(ts.writechunk, ts.writeencoding, ts.afterTransform);
  } else {
    // mark that we need a transform, so that any data that comes in
    // will get processed, now that we've asked for it.
    ts.needTransform = true;
  }
};

Transform.prototype._destroy = function (err, cb) {
  Duplex.prototype._destroy.call(this, err, function (err2) {
    cb(err2);
  });
};

function done(stream, er, data) {
  if (er) return stream.emit('error', er);
  if (data != null) // single equals check for both `null` and `undefined`
    stream.push(data); // TODO(BridgeAR): Write a test for these two error cases
  // if there's nothing in the write buffer, then that means
  // that nothing more will ever be provided

  if (stream._writableState.length) throw new ERR_TRANSFORM_WITH_LENGTH_0();
  if (stream._transformState.transforming) throw new ERR_TRANSFORM_ALREADY_TRANSFORMING();
  return stream.push(null);
}
},{"../errors":90,"./_stream_duplex":91,"inherits":175}],95:[function(require,module,exports){
(function (process,global){(function (){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
// A bit simpler than readable streams.
// Implement an async ._write(chunk, encoding, cb), and it'll handle all
// the drain event emission and buffering.
'use strict';

module.exports = Writable;
/* <replacement> */

function WriteReq(chunk, encoding, cb) {
  this.chunk = chunk;
  this.encoding = encoding;
  this.callback = cb;
  this.next = null;
} // It seems a linked list but it is not
// there will be only 2 of these for each stream


function CorkedRequest(state) {
  var _this = this;

  this.next = null;
  this.entry = null;

  this.finish = function () {
    onCorkedFinish(_this, state);
  };
}
/* </replacement> */

/*<replacement>*/


var Duplex;
/*</replacement>*/

Writable.WritableState = WritableState;
/*<replacement>*/

var internalUtil = {
  deprecate: require('util-deprecate')
};
/*</replacement>*/

/*<replacement>*/

var Stream = require('./internal/streams/stream');
/*</replacement>*/


var Buffer = require('buffer').Buffer;

var OurUint8Array = global.Uint8Array || function () {};

function _uint8ArrayToBuffer(chunk) {
  return Buffer.from(chunk);
}

function _isUint8Array(obj) {
  return Buffer.isBuffer(obj) || obj instanceof OurUint8Array;
}

var destroyImpl = require('./internal/streams/destroy');

var _require = require('./internal/streams/state'),
    getHighWaterMark = _require.getHighWaterMark;

var _require$codes = require('../errors').codes,
    ERR_INVALID_ARG_TYPE = _require$codes.ERR_INVALID_ARG_TYPE,
    ERR_METHOD_NOT_IMPLEMENTED = _require$codes.ERR_METHOD_NOT_IMPLEMENTED,
    ERR_MULTIPLE_CALLBACK = _require$codes.ERR_MULTIPLE_CALLBACK,
    ERR_STREAM_CANNOT_PIPE = _require$codes.ERR_STREAM_CANNOT_PIPE,
    ERR_STREAM_DESTROYED = _require$codes.ERR_STREAM_DESTROYED,
    ERR_STREAM_NULL_VALUES = _require$codes.ERR_STREAM_NULL_VALUES,
    ERR_STREAM_WRITE_AFTER_END = _require$codes.ERR_STREAM_WRITE_AFTER_END,
    ERR_UNKNOWN_ENCODING = _require$codes.ERR_UNKNOWN_ENCODING;

var errorOrDestroy = destroyImpl.errorOrDestroy;

require('inherits')(Writable, Stream);

function nop() {}

function WritableState(options, stream, isDuplex) {
  Duplex = Duplex || require('./_stream_duplex');
  options = options || {}; // Duplex streams are both readable and writable, but share
  // the same options object.
  // However, some cases require setting options to different
  // values for the readable and the writable sides of the duplex stream,
  // e.g. options.readableObjectMode vs. options.writableObjectMode, etc.

  if (typeof isDuplex !== 'boolean') isDuplex = stream instanceof Duplex; // object stream flag to indicate whether or not this stream
  // contains buffers or objects.

  this.objectMode = !!options.objectMode;
  if (isDuplex) this.objectMode = this.objectMode || !!options.writableObjectMode; // the point at which write() starts returning false
  // Note: 0 is a valid value, means that we always return false if
  // the entire buffer is not flushed immediately on write()

  this.highWaterMark = getHighWaterMark(this, options, 'writableHighWaterMark', isDuplex); // if _final has been called

  this.finalCalled = false; // drain event flag.

  this.needDrain = false; // at the start of calling end()

  this.ending = false; // when end() has been called, and returned

  this.ended = false; // when 'finish' is emitted

  this.finished = false; // has it been destroyed

  this.destroyed = false; // should we decode strings into buffers before passing to _write?
  // this is here so that some node-core streams can optimize string
  // handling at a lower level.

  var noDecode = options.decodeStrings === false;
  this.decodeStrings = !noDecode; // Crypto is kind of old and crusty.  Historically, its default string
  // encoding is 'binary' so we have to make this configurable.
  // Everything else in the universe uses 'utf8', though.

  this.defaultEncoding = options.defaultEncoding || 'utf8'; // not an actual buffer we keep track of, but a measurement
  // of how much we're waiting to get pushed to some underlying
  // socket or file.

  this.length = 0; // a flag to see when we're in the middle of a write.

  this.writing = false; // when true all writes will be buffered until .uncork() call

  this.corked = 0; // a flag to be able to tell if the onwrite cb is called immediately,
  // or on a later tick.  We set this to true at first, because any
  // actions that shouldn't happen until "later" should generally also
  // not happen before the first write call.

  this.sync = true; // a flag to know if we're processing previously buffered items, which
  // may call the _write() callback in the same tick, so that we don't
  // end up in an overlapped onwrite situation.

  this.bufferProcessing = false; // the callback that's passed to _write(chunk,cb)

  this.onwrite = function (er) {
    onwrite(stream, er);
  }; // the callback that the user supplies to write(chunk,encoding,cb)


  this.writecb = null; // the amount that is being written when _write is called.

  this.writelen = 0;
  this.bufferedRequest = null;
  this.lastBufferedRequest = null; // number of pending user-supplied write callbacks
  // this must be 0 before 'finish' can be emitted

  this.pendingcb = 0; // emit prefinish if the only thing we're waiting for is _write cbs
  // This is relevant for synchronous Transform streams

  this.prefinished = false; // True if the error was already emitted and should not be thrown again

  this.errorEmitted = false; // Should close be emitted on destroy. Defaults to true.

  this.emitClose = options.emitClose !== false; // Should .destroy() be called after 'finish' (and potentially 'end')

  this.autoDestroy = !!options.autoDestroy; // count buffered requests

  this.bufferedRequestCount = 0; // allocate the first CorkedRequest, there is always
  // one allocated and free to use, and we maintain at most two

  this.corkedRequestsFree = new CorkedRequest(this);
}

WritableState.prototype.getBuffer = function getBuffer() {
  var current = this.bufferedRequest;
  var out = [];

  while (current) {
    out.push(current);
    current = current.next;
  }

  return out;
};

(function () {
  try {
    Object.defineProperty(WritableState.prototype, 'buffer', {
      get: internalUtil.deprecate(function writableStateBufferGetter() {
        return this.getBuffer();
      }, '_writableState.buffer is deprecated. Use _writableState.getBuffer ' + 'instead.', 'DEP0003')
    });
  } catch (_) {}
})(); // Test _writableState for inheritance to account for Duplex streams,
// whose prototype chain only points to Readable.


var realHasInstance;

if (typeof Symbol === 'function' && Symbol.hasInstance && typeof Function.prototype[Symbol.hasInstance] === 'function') {
  realHasInstance = Function.prototype[Symbol.hasInstance];
  Object.defineProperty(Writable, Symbol.hasInstance, {
    value: function value(object) {
      if (realHasInstance.call(this, object)) return true;
      if (this !== Writable) return false;
      return object && object._writableState instanceof WritableState;
    }
  });
} else {
  realHasInstance = function realHasInstance(object) {
    return object instanceof this;
  };
}

function Writable(options) {
  Duplex = Duplex || require('./_stream_duplex'); // Writable ctor is applied to Duplexes, too.
  // `realHasInstance` is necessary because using plain `instanceof`
  // would return false, as no `_writableState` property is attached.
  // Trying to use the custom `instanceof` for Writable here will also break the
  // Node.js LazyTransform implementation, which has a non-trivial getter for
  // `_writableState` that would lead to infinite recursion.
  // Checking for a Stream.Duplex instance is faster here instead of inside
  // the WritableState constructor, at least with V8 6.5

  var isDuplex = this instanceof Duplex;
  if (!isDuplex && !realHasInstance.call(Writable, this)) return new Writable(options);
  this._writableState = new WritableState(options, this, isDuplex); // legacy.

  this.writable = true;

  if (options) {
    if (typeof options.write === 'function') this._write = options.write;
    if (typeof options.writev === 'function') this._writev = options.writev;
    if (typeof options.destroy === 'function') this._destroy = options.destroy;
    if (typeof options.final === 'function') this._final = options.final;
  }

  Stream.call(this);
} // Otherwise people can pipe Writable streams, which is just wrong.


Writable.prototype.pipe = function () {
  errorOrDestroy(this, new ERR_STREAM_CANNOT_PIPE());
};

function writeAfterEnd(stream, cb) {
  var er = new ERR_STREAM_WRITE_AFTER_END(); // TODO: defer error events consistently everywhere, not just the cb

  errorOrDestroy(stream, er);
  process.nextTick(cb, er);
} // Checks that a user-supplied chunk is valid, especially for the particular
// mode the stream is in. Currently this means that `null` is never accepted
// and undefined/non-string values are only allowed in object mode.


function validChunk(stream, state, chunk, cb) {
  var er;

  if (chunk === null) {
    er = new ERR_STREAM_NULL_VALUES();
  } else if (typeof chunk !== 'string' && !state.objectMode) {
    er = new ERR_INVALID_ARG_TYPE('chunk', ['string', 'Buffer'], chunk);
  }

  if (er) {
    errorOrDestroy(stream, er);
    process.nextTick(cb, er);
    return false;
  }

  return true;
}

Writable.prototype.write = function (chunk, encoding, cb) {
  var state = this._writableState;
  var ret = false;

  var isBuf = !state.objectMode && _isUint8Array(chunk);

  if (isBuf && !Buffer.isBuffer(chunk)) {
    chunk = _uint8ArrayToBuffer(chunk);
  }

  if (typeof encoding === 'function') {
    cb = encoding;
    encoding = null;
  }

  if (isBuf) encoding = 'buffer';else if (!encoding) encoding = state.defaultEncoding;
  if (typeof cb !== 'function') cb = nop;
  if (state.ending) writeAfterEnd(this, cb);else if (isBuf || validChunk(this, state, chunk, cb)) {
    state.pendingcb++;
    ret = writeOrBuffer(this, state, isBuf, chunk, encoding, cb);
  }
  return ret;
};

Writable.prototype.cork = function () {
  this._writableState.corked++;
};

Writable.prototype.uncork = function () {
  var state = this._writableState;

  if (state.corked) {
    state.corked--;
    if (!state.writing && !state.corked && !state.bufferProcessing && state.bufferedRequest) clearBuffer(this, state);
  }
};

Writable.prototype.setDefaultEncoding = function setDefaultEncoding(encoding) {
  // node::ParseEncoding() requires lower case.
  if (typeof encoding === 'string') encoding = encoding.toLowerCase();
  if (!(['hex', 'utf8', 'utf-8', 'ascii', 'binary', 'base64', 'ucs2', 'ucs-2', 'utf16le', 'utf-16le', 'raw'].indexOf((encoding + '').toLowerCase()) > -1)) throw new ERR_UNKNOWN_ENCODING(encoding);
  this._writableState.defaultEncoding = encoding;
  return this;
};

Object.defineProperty(Writable.prototype, 'writableBuffer', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function get() {
    return this._writableState && this._writableState.getBuffer();
  }
});

function decodeChunk(state, chunk, encoding) {
  if (!state.objectMode && state.decodeStrings !== false && typeof chunk === 'string') {
    chunk = Buffer.from(chunk, encoding);
  }

  return chunk;
}

Object.defineProperty(Writable.prototype, 'writableHighWaterMark', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function get() {
    return this._writableState.highWaterMark;
  }
}); // if we're already writing something, then just put this
// in the queue, and wait our turn.  Otherwise, call _write
// If we return false, then we need a drain event, so set that flag.

function writeOrBuffer(stream, state, isBuf, chunk, encoding, cb) {
  if (!isBuf) {
    var newChunk = decodeChunk(state, chunk, encoding);

    if (chunk !== newChunk) {
      isBuf = true;
      encoding = 'buffer';
      chunk = newChunk;
    }
  }

  var len = state.objectMode ? 1 : chunk.length;
  state.length += len;
  var ret = state.length < state.highWaterMark; // we must ensure that previous needDrain will not be reset to false.

  if (!ret) state.needDrain = true;

  if (state.writing || state.corked) {
    var last = state.lastBufferedRequest;
    state.lastBufferedRequest = {
      chunk: chunk,
      encoding: encoding,
      isBuf: isBuf,
      callback: cb,
      next: null
    };

    if (last) {
      last.next = state.lastBufferedRequest;
    } else {
      state.bufferedRequest = state.lastBufferedRequest;
    }

    state.bufferedRequestCount += 1;
  } else {
    doWrite(stream, state, false, len, chunk, encoding, cb);
  }

  return ret;
}

function doWrite(stream, state, writev, len, chunk, encoding, cb) {
  state.writelen = len;
  state.writecb = cb;
  state.writing = true;
  state.sync = true;
  if (state.destroyed) state.onwrite(new ERR_STREAM_DESTROYED('write'));else if (writev) stream._writev(chunk, state.onwrite);else stream._write(chunk, encoding, state.onwrite);
  state.sync = false;
}

function onwriteError(stream, state, sync, er, cb) {
  --state.pendingcb;

  if (sync) {
    // defer the callback if we are being called synchronously
    // to avoid piling up things on the stack
    process.nextTick(cb, er); // this can emit finish, and it will always happen
    // after error

    process.nextTick(finishMaybe, stream, state);
    stream._writableState.errorEmitted = true;
    errorOrDestroy(stream, er);
  } else {
    // the caller expect this to happen before if
    // it is async
    cb(er);
    stream._writableState.errorEmitted = true;
    errorOrDestroy(stream, er); // this can emit finish, but finish must
    // always follow error

    finishMaybe(stream, state);
  }
}

function onwriteStateUpdate(state) {
  state.writing = false;
  state.writecb = null;
  state.length -= state.writelen;
  state.writelen = 0;
}

function onwrite(stream, er) {
  var state = stream._writableState;
  var sync = state.sync;
  var cb = state.writecb;
  if (typeof cb !== 'function') throw new ERR_MULTIPLE_CALLBACK();
  onwriteStateUpdate(state);
  if (er) onwriteError(stream, state, sync, er, cb);else {
    // Check if we're actually ready to finish, but don't emit yet
    var finished = needFinish(state) || stream.destroyed;

    if (!finished && !state.corked && !state.bufferProcessing && state.bufferedRequest) {
      clearBuffer(stream, state);
    }

    if (sync) {
      process.nextTick(afterWrite, stream, state, finished, cb);
    } else {
      afterWrite(stream, state, finished, cb);
    }
  }
}

function afterWrite(stream, state, finished, cb) {
  if (!finished) onwriteDrain(stream, state);
  state.pendingcb--;
  cb();
  finishMaybe(stream, state);
} // Must force callback to be called on nextTick, so that we don't
// emit 'drain' before the write() consumer gets the 'false' return
// value, and has a chance to attach a 'drain' listener.


function onwriteDrain(stream, state) {
  if (state.length === 0 && state.needDrain) {
    state.needDrain = false;
    stream.emit('drain');
  }
} // if there's something in the buffer waiting, then process it


function clearBuffer(stream, state) {
  state.bufferProcessing = true;
  var entry = state.bufferedRequest;

  if (stream._writev && entry && entry.next) {
    // Fast case, write everything using _writev()
    var l = state.bufferedRequestCount;
    var buffer = new Array(l);
    var holder = state.corkedRequestsFree;
    holder.entry = entry;
    var count = 0;
    var allBuffers = true;

    while (entry) {
      buffer[count] = entry;
      if (!entry.isBuf) allBuffers = false;
      entry = entry.next;
      count += 1;
    }

    buffer.allBuffers = allBuffers;
    doWrite(stream, state, true, state.length, buffer, '', holder.finish); // doWrite is almost always async, defer these to save a bit of time
    // as the hot path ends with doWrite

    state.pendingcb++;
    state.lastBufferedRequest = null;

    if (holder.next) {
      state.corkedRequestsFree = holder.next;
      holder.next = null;
    } else {
      state.corkedRequestsFree = new CorkedRequest(state);
    }

    state.bufferedRequestCount = 0;
  } else {
    // Slow case, write chunks one-by-one
    while (entry) {
      var chunk = entry.chunk;
      var encoding = entry.encoding;
      var cb = entry.callback;
      var len = state.objectMode ? 1 : chunk.length;
      doWrite(stream, state, false, len, chunk, encoding, cb);
      entry = entry.next;
      state.bufferedRequestCount--; // if we didn't call the onwrite immediately, then
      // it means that we need to wait until it does.
      // also, that means that the chunk and cb are currently
      // being processed, so move the buffer counter past them.

      if (state.writing) {
        break;
      }
    }

    if (entry === null) state.lastBufferedRequest = null;
  }

  state.bufferedRequest = entry;
  state.bufferProcessing = false;
}

Writable.prototype._write = function (chunk, encoding, cb) {
  cb(new ERR_METHOD_NOT_IMPLEMENTED('_write()'));
};

Writable.prototype._writev = null;

Writable.prototype.end = function (chunk, encoding, cb) {
  var state = this._writableState;

  if (typeof chunk === 'function') {
    cb = chunk;
    chunk = null;
    encoding = null;
  } else if (typeof encoding === 'function') {
    cb = encoding;
    encoding = null;
  }

  if (chunk !== null && chunk !== undefined) this.write(chunk, encoding); // .end() fully uncorks

  if (state.corked) {
    state.corked = 1;
    this.uncork();
  } // ignore unnecessary end() calls.


  if (!state.ending) endWritable(this, state, cb);
  return this;
};

Object.defineProperty(Writable.prototype, 'writableLength', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function get() {
    return this._writableState.length;
  }
});

function needFinish(state) {
  return state.ending && state.length === 0 && state.bufferedRequest === null && !state.finished && !state.writing;
}

function callFinal(stream, state) {
  stream._final(function (err) {
    state.pendingcb--;

    if (err) {
      errorOrDestroy(stream, err);
    }

    state.prefinished = true;
    stream.emit('prefinish');
    finishMaybe(stream, state);
  });
}

function prefinish(stream, state) {
  if (!state.prefinished && !state.finalCalled) {
    if (typeof stream._final === 'function' && !state.destroyed) {
      state.pendingcb++;
      state.finalCalled = true;
      process.nextTick(callFinal, stream, state);
    } else {
      state.prefinished = true;
      stream.emit('prefinish');
    }
  }
}

function finishMaybe(stream, state) {
  var need = needFinish(state);

  if (need) {
    prefinish(stream, state);

    if (state.pendingcb === 0) {
      state.finished = true;
      stream.emit('finish');

      if (state.autoDestroy) {
        // In case of duplex streams we need a way to detect
        // if the readable side is ready for autoDestroy as well
        var rState = stream._readableState;

        if (!rState || rState.autoDestroy && rState.endEmitted) {
          stream.destroy();
        }
      }
    }
  }

  return need;
}

function endWritable(stream, state, cb) {
  state.ending = true;
  finishMaybe(stream, state);

  if (cb) {
    if (state.finished) process.nextTick(cb);else stream.once('finish', cb);
  }

  state.ended = true;
  stream.writable = false;
}

function onCorkedFinish(corkReq, state, err) {
  var entry = corkReq.entry;
  corkReq.entry = null;

  while (entry) {
    var cb = entry.callback;
    state.pendingcb--;
    cb(err);
    entry = entry.next;
  } // reuse the free corkReq.


  state.corkedRequestsFree.next = corkReq;
}

Object.defineProperty(Writable.prototype, 'destroyed', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function get() {
    if (this._writableState === undefined) {
      return false;
    }

    return this._writableState.destroyed;
  },
  set: function set(value) {
    // we ignore the value if the stream
    // has not been initialized yet
    if (!this._writableState) {
      return;
    } // backward compatibility, the user is explicitly
    // managing destroyed


    this._writableState.destroyed = value;
  }
});
Writable.prototype.destroy = destroyImpl.destroy;
Writable.prototype._undestroy = destroyImpl.undestroy;

Writable.prototype._destroy = function (err, cb) {
  cb(err);
};
}).call(this)}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../errors":90,"./_stream_duplex":91,"./internal/streams/destroy":98,"./internal/streams/state":102,"./internal/streams/stream":103,"_process":183,"buffer":104,"inherits":175,"util-deprecate":200}],96:[function(require,module,exports){
(function (process){(function (){
'use strict';

var _Object$setPrototypeO;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var finished = require('./end-of-stream');

var kLastResolve = Symbol('lastResolve');
var kLastReject = Symbol('lastReject');
var kError = Symbol('error');
var kEnded = Symbol('ended');
var kLastPromise = Symbol('lastPromise');
var kHandlePromise = Symbol('handlePromise');
var kStream = Symbol('stream');

function createIterResult(value, done) {
  return {
    value: value,
    done: done
  };
}

function readAndResolve(iter) {
  var resolve = iter[kLastResolve];

  if (resolve !== null) {
    var data = iter[kStream].read(); // we defer if data is null
    // we can be expecting either 'end' or
    // 'error'

    if (data !== null) {
      iter[kLastPromise] = null;
      iter[kLastResolve] = null;
      iter[kLastReject] = null;
      resolve(createIterResult(data, false));
    }
  }
}

function onReadable(iter) {
  // we wait for the next tick, because it might
  // emit an error with process.nextTick
  process.nextTick(readAndResolve, iter);
}

function wrapForNext(lastPromise, iter) {
  return function (resolve, reject) {
    lastPromise.then(function () {
      if (iter[kEnded]) {
        resolve(createIterResult(undefined, true));
        return;
      }

      iter[kHandlePromise](resolve, reject);
    }, reject);
  };
}

var AsyncIteratorPrototype = Object.getPrototypeOf(function () {});
var ReadableStreamAsyncIteratorPrototype = Object.setPrototypeOf((_Object$setPrototypeO = {
  get stream() {
    return this[kStream];
  },

  next: function next() {
    var _this = this;

    // if we have detected an error in the meanwhile
    // reject straight away
    var error = this[kError];

    if (error !== null) {
      return Promise.reject(error);
    }

    if (this[kEnded]) {
      return Promise.resolve(createIterResult(undefined, true));
    }

    if (this[kStream].destroyed) {
      // We need to defer via nextTick because if .destroy(err) is
      // called, the error will be emitted via nextTick, and
      // we cannot guarantee that there is no error lingering around
      // waiting to be emitted.
      return new Promise(function (resolve, reject) {
        process.nextTick(function () {
          if (_this[kError]) {
            reject(_this[kError]);
          } else {
            resolve(createIterResult(undefined, true));
          }
        });
      });
    } // if we have multiple next() calls
    // we will wait for the previous Promise to finish
    // this logic is optimized to support for await loops,
    // where next() is only called once at a time


    var lastPromise = this[kLastPromise];
    var promise;

    if (lastPromise) {
      promise = new Promise(wrapForNext(lastPromise, this));
    } else {
      // fast path needed to support multiple this.push()
      // without triggering the next() queue
      var data = this[kStream].read();

      if (data !== null) {
        return Promise.resolve(createIterResult(data, false));
      }

      promise = new Promise(this[kHandlePromise]);
    }

    this[kLastPromise] = promise;
    return promise;
  }
}, _defineProperty(_Object$setPrototypeO, Symbol.asyncIterator, function () {
  return this;
}), _defineProperty(_Object$setPrototypeO, "return", function _return() {
  var _this2 = this;

  // destroy(err, cb) is a private API
  // we can guarantee we have that here, because we control the
  // Readable class this is attached to
  return new Promise(function (resolve, reject) {
    _this2[kStream].destroy(null, function (err) {
      if (err) {
        reject(err);
        return;
      }

      resolve(createIterResult(undefined, true));
    });
  });
}), _Object$setPrototypeO), AsyncIteratorPrototype);

var createReadableStreamAsyncIterator = function createReadableStreamAsyncIterator(stream) {
  var _Object$create;

  var iterator = Object.create(ReadableStreamAsyncIteratorPrototype, (_Object$create = {}, _defineProperty(_Object$create, kStream, {
    value: stream,
    writable: true
  }), _defineProperty(_Object$create, kLastResolve, {
    value: null,
    writable: true
  }), _defineProperty(_Object$create, kLastReject, {
    value: null,
    writable: true
  }), _defineProperty(_Object$create, kError, {
    value: null,
    writable: true
  }), _defineProperty(_Object$create, kEnded, {
    value: stream._readableState.endEmitted,
    writable: true
  }), _defineProperty(_Object$create, kHandlePromise, {
    value: function value(resolve, reject) {
      var data = iterator[kStream].read();

      if (data) {
        iterator[kLastPromise] = null;
        iterator[kLastResolve] = null;
        iterator[kLastReject] = null;
        resolve(createIterResult(data, false));
      } else {
        iterator[kLastResolve] = resolve;
        iterator[kLastReject] = reject;
      }
    },
    writable: true
  }), _Object$create));
  iterator[kLastPromise] = null;
  finished(stream, function (err) {
    if (err && err.code !== 'ERR_STREAM_PREMATURE_CLOSE') {
      var reject = iterator[kLastReject]; // reject if we are waiting for data in the Promise
      // returned by next() and store the error

      if (reject !== null) {
        iterator[kLastPromise] = null;
        iterator[kLastResolve] = null;
        iterator[kLastReject] = null;
        reject(err);
      }

      iterator[kError] = err;
      return;
    }

    var resolve = iterator[kLastResolve];

    if (resolve !== null) {
      iterator[kLastPromise] = null;
      iterator[kLastResolve] = null;
      iterator[kLastReject] = null;
      resolve(createIterResult(undefined, true));
    }

    iterator[kEnded] = true;
  });
  stream.on('readable', onReadable.bind(null, iterator));
  return iterator;
};

module.exports = createReadableStreamAsyncIterator;
}).call(this)}).call(this,require('_process'))
},{"./end-of-stream":99,"_process":183}],97:[function(require,module,exports){
'use strict';

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var _require = require('buffer'),
    Buffer = _require.Buffer;

var _require2 = require('util'),
    inspect = _require2.inspect;

var custom = inspect && inspect.custom || 'inspect';

function copyBuffer(src, target, offset) {
  Buffer.prototype.copy.call(src, target, offset);
}

module.exports =
/*#__PURE__*/
function () {
  function BufferList() {
    _classCallCheck(this, BufferList);

    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  _createClass(BufferList, [{
    key: "push",
    value: function push(v) {
      var entry = {
        data: v,
        next: null
      };
      if (this.length > 0) this.tail.next = entry;else this.head = entry;
      this.tail = entry;
      ++this.length;
    }
  }, {
    key: "unshift",
    value: function unshift(v) {
      var entry = {
        data: v,
        next: this.head
      };
      if (this.length === 0) this.tail = entry;
      this.head = entry;
      ++this.length;
    }
  }, {
    key: "shift",
    value: function shift() {
      if (this.length === 0) return;
      var ret = this.head.data;
      if (this.length === 1) this.head = this.tail = null;else this.head = this.head.next;
      --this.length;
      return ret;
    }
  }, {
    key: "clear",
    value: function clear() {
      this.head = this.tail = null;
      this.length = 0;
    }
  }, {
    key: "join",
    value: function join(s) {
      if (this.length === 0) return '';
      var p = this.head;
      var ret = '' + p.data;

      while (p = p.next) {
        ret += s + p.data;
      }

      return ret;
    }
  }, {
    key: "concat",
    value: function concat(n) {
      if (this.length === 0) return Buffer.alloc(0);
      var ret = Buffer.allocUnsafe(n >>> 0);
      var p = this.head;
      var i = 0;

      while (p) {
        copyBuffer(p.data, ret, i);
        i += p.data.length;
        p = p.next;
      }

      return ret;
    } // Consumes a specified amount of bytes or characters from the buffered data.

  }, {
    key: "consume",
    value: function consume(n, hasStrings) {
      var ret;

      if (n < this.head.data.length) {
        // `slice` is the same for buffers and strings.
        ret = this.head.data.slice(0, n);
        this.head.data = this.head.data.slice(n);
      } else if (n === this.head.data.length) {
        // First chunk is a perfect match.
        ret = this.shift();
      } else {
        // Result spans more than one buffer.
        ret = hasStrings ? this._getString(n) : this._getBuffer(n);
      }

      return ret;
    }
  }, {
    key: "first",
    value: function first() {
      return this.head.data;
    } // Consumes a specified amount of characters from the buffered data.

  }, {
    key: "_getString",
    value: function _getString(n) {
      var p = this.head;
      var c = 1;
      var ret = p.data;
      n -= ret.length;

      while (p = p.next) {
        var str = p.data;
        var nb = n > str.length ? str.length : n;
        if (nb === str.length) ret += str;else ret += str.slice(0, n);
        n -= nb;

        if (n === 0) {
          if (nb === str.length) {
            ++c;
            if (p.next) this.head = p.next;else this.head = this.tail = null;
          } else {
            this.head = p;
            p.data = str.slice(nb);
          }

          break;
        }

        ++c;
      }

      this.length -= c;
      return ret;
    } // Consumes a specified amount of bytes from the buffered data.

  }, {
    key: "_getBuffer",
    value: function _getBuffer(n) {
      var ret = Buffer.allocUnsafe(n);
      var p = this.head;
      var c = 1;
      p.data.copy(ret);
      n -= p.data.length;

      while (p = p.next) {
        var buf = p.data;
        var nb = n > buf.length ? buf.length : n;
        buf.copy(ret, ret.length - n, 0, nb);
        n -= nb;

        if (n === 0) {
          if (nb === buf.length) {
            ++c;
            if (p.next) this.head = p.next;else this.head = this.tail = null;
          } else {
            this.head = p;
            p.data = buf.slice(nb);
          }

          break;
        }

        ++c;
      }

      this.length -= c;
      return ret;
    } // Make sure the linked list only shows the minimal necessary information.

  }, {
    key: custom,
    value: function value(_, options) {
      return inspect(this, _objectSpread({}, options, {
        // Only inspect one level.
        depth: 0,
        // It should not recurse.
        customInspect: false
      }));
    }
  }]);

  return BufferList;
}();
},{"buffer":104,"util":85}],98:[function(require,module,exports){
(function (process){(function (){
'use strict'; // undocumented cb() API, needed for core, not for public API

function destroy(err, cb) {
  var _this = this;

  var readableDestroyed = this._readableState && this._readableState.destroyed;
  var writableDestroyed = this._writableState && this._writableState.destroyed;

  if (readableDestroyed || writableDestroyed) {
    if (cb) {
      cb(err);
    } else if (err) {
      if (!this._writableState) {
        process.nextTick(emitErrorNT, this, err);
      } else if (!this._writableState.errorEmitted) {
        this._writableState.errorEmitted = true;
        process.nextTick(emitErrorNT, this, err);
      }
    }

    return this;
  } // we set destroyed to true before firing error callbacks in order
  // to make it re-entrance safe in case destroy() is called within callbacks


  if (this._readableState) {
    this._readableState.destroyed = true;
  } // if this is a duplex stream mark the writable part as destroyed as well


  if (this._writableState) {
    this._writableState.destroyed = true;
  }

  this._destroy(err || null, function (err) {
    if (!cb && err) {
      if (!_this._writableState) {
        process.nextTick(emitErrorAndCloseNT, _this, err);
      } else if (!_this._writableState.errorEmitted) {
        _this._writableState.errorEmitted = true;
        process.nextTick(emitErrorAndCloseNT, _this, err);
      } else {
        process.nextTick(emitCloseNT, _this);
      }
    } else if (cb) {
      process.nextTick(emitCloseNT, _this);
      cb(err);
    } else {
      process.nextTick(emitCloseNT, _this);
    }
  });

  return this;
}

function emitErrorAndCloseNT(self, err) {
  emitErrorNT(self, err);
  emitCloseNT(self);
}

function emitCloseNT(self) {
  if (self._writableState && !self._writableState.emitClose) return;
  if (self._readableState && !self._readableState.emitClose) return;
  self.emit('close');
}

function undestroy() {
  if (this._readableState) {
    this._readableState.destroyed = false;
    this._readableState.reading = false;
    this._readableState.ended = false;
    this._readableState.endEmitted = false;
  }

  if (this._writableState) {
    this._writableState.destroyed = false;
    this._writableState.ended = false;
    this._writableState.ending = false;
    this._writableState.finalCalled = false;
    this._writableState.prefinished = false;
    this._writableState.finished = false;
    this._writableState.errorEmitted = false;
  }
}

function emitErrorNT(self, err) {
  self.emit('error', err);
}

function errorOrDestroy(stream, err) {
  // We have tests that rely on errors being emitted
  // in the same tick, so changing this is semver major.
  // For now when you opt-in to autoDestroy we allow
  // the error to be emitted nextTick. In a future
  // semver major update we should change the default to this.
  var rState = stream._readableState;
  var wState = stream._writableState;
  if (rState && rState.autoDestroy || wState && wState.autoDestroy) stream.destroy(err);else stream.emit('error', err);
}

module.exports = {
  destroy: destroy,
  undestroy: undestroy,
  errorOrDestroy: errorOrDestroy
};
}).call(this)}).call(this,require('_process'))
},{"_process":183}],99:[function(require,module,exports){
// Ported from https://github.com/mafintosh/end-of-stream with
// permission from the author, Mathias Buus (@mafintosh).
'use strict';

var ERR_STREAM_PREMATURE_CLOSE = require('../../../errors').codes.ERR_STREAM_PREMATURE_CLOSE;

function once(callback) {
  var called = false;
  return function () {
    if (called) return;
    called = true;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    callback.apply(this, args);
  };
}

function noop() {}

function isRequest(stream) {
  return stream.setHeader && typeof stream.abort === 'function';
}

function eos(stream, opts, callback) {
  if (typeof opts === 'function') return eos(stream, null, opts);
  if (!opts) opts = {};
  callback = once(callback || noop);
  var readable = opts.readable || opts.readable !== false && stream.readable;
  var writable = opts.writable || opts.writable !== false && stream.writable;

  var onlegacyfinish = function onlegacyfinish() {
    if (!stream.writable) onfinish();
  };

  var writableEnded = stream._writableState && stream._writableState.finished;

  var onfinish = function onfinish() {
    writable = false;
    writableEnded = true;
    if (!readable) callback.call(stream);
  };

  var readableEnded = stream._readableState && stream._readableState.endEmitted;

  var onend = function onend() {
    readable = false;
    readableEnded = true;
    if (!writable) callback.call(stream);
  };

  var onerror = function onerror(err) {
    callback.call(stream, err);
  };

  var onclose = function onclose() {
    var err;

    if (readable && !readableEnded) {
      if (!stream._readableState || !stream._readableState.ended) err = new ERR_STREAM_PREMATURE_CLOSE();
      return callback.call(stream, err);
    }

    if (writable && !writableEnded) {
      if (!stream._writableState || !stream._writableState.ended) err = new ERR_STREAM_PREMATURE_CLOSE();
      return callback.call(stream, err);
    }
  };

  var onrequest = function onrequest() {
    stream.req.on('finish', onfinish);
  };

  if (isRequest(stream)) {
    stream.on('complete', onfinish);
    stream.on('abort', onclose);
    if (stream.req) onrequest();else stream.on('request', onrequest);
  } else if (writable && !stream._writableState) {
    // legacy streams
    stream.on('end', onlegacyfinish);
    stream.on('close', onlegacyfinish);
  }

  stream.on('end', onend);
  stream.on('finish', onfinish);
  if (opts.error !== false) stream.on('error', onerror);
  stream.on('close', onclose);
  return function () {
    stream.removeListener('complete', onfinish);
    stream.removeListener('abort', onclose);
    stream.removeListener('request', onrequest);
    if (stream.req) stream.req.removeListener('finish', onfinish);
    stream.removeListener('end', onlegacyfinish);
    stream.removeListener('close', onlegacyfinish);
    stream.removeListener('finish', onfinish);
    stream.removeListener('end', onend);
    stream.removeListener('error', onerror);
    stream.removeListener('close', onclose);
  };
}

module.exports = eos;
},{"../../../errors":90}],100:[function(require,module,exports){
module.exports = function () {
  throw new Error('Readable.from is not available in the browser')
};

},{}],101:[function(require,module,exports){
// Ported from https://github.com/mafintosh/pump with
// permission from the author, Mathias Buus (@mafintosh).
'use strict';

var eos;

function once(callback) {
  var called = false;
  return function () {
    if (called) return;
    called = true;
    callback.apply(void 0, arguments);
  };
}

var _require$codes = require('../../../errors').codes,
    ERR_MISSING_ARGS = _require$codes.ERR_MISSING_ARGS,
    ERR_STREAM_DESTROYED = _require$codes.ERR_STREAM_DESTROYED;

function noop(err) {
  // Rethrow the error if it exists to avoid swallowing it
  if (err) throw err;
}

function isRequest(stream) {
  return stream.setHeader && typeof stream.abort === 'function';
}

function destroyer(stream, reading, writing, callback) {
  callback = once(callback);
  var closed = false;
  stream.on('close', function () {
    closed = true;
  });
  if (eos === undefined) eos = require('./end-of-stream');
  eos(stream, {
    readable: reading,
    writable: writing
  }, function (err) {
    if (err) return callback(err);
    closed = true;
    callback();
  });
  var destroyed = false;
  return function (err) {
    if (closed) return;
    if (destroyed) return;
    destroyed = true; // request.destroy just do .end - .abort is what we want

    if (isRequest(stream)) return stream.abort();
    if (typeof stream.destroy === 'function') return stream.destroy();
    callback(err || new ERR_STREAM_DESTROYED('pipe'));
  };
}

function call(fn) {
  fn();
}

function pipe(from, to) {
  return from.pipe(to);
}

function popCallback(streams) {
  if (!streams.length) return noop;
  if (typeof streams[streams.length - 1] !== 'function') return noop;
  return streams.pop();
}

function pipeline() {
  for (var _len = arguments.length, streams = new Array(_len), _key = 0; _key < _len; _key++) {
    streams[_key] = arguments[_key];
  }

  var callback = popCallback(streams);
  if (Array.isArray(streams[0])) streams = streams[0];

  if (streams.length < 2) {
    throw new ERR_MISSING_ARGS('streams');
  }

  var error;
  var destroys = streams.map(function (stream, i) {
    var reading = i < streams.length - 1;
    var writing = i > 0;
    return destroyer(stream, reading, writing, function (err) {
      if (!error) error = err;
      if (err) destroys.forEach(call);
      if (reading) return;
      destroys.forEach(call);
      callback(error);
    });
  });
  return streams.reduce(pipe);
}

module.exports = pipeline;
},{"../../../errors":90,"./end-of-stream":99}],102:[function(require,module,exports){
'use strict';

var ERR_INVALID_OPT_VALUE = require('../../../errors').codes.ERR_INVALID_OPT_VALUE;

function highWaterMarkFrom(options, isDuplex, duplexKey) {
  return options.highWaterMark != null ? options.highWaterMark : isDuplex ? options[duplexKey] : null;
}

function getHighWaterMark(state, options, duplexKey, isDuplex) {
  var hwm = highWaterMarkFrom(options, isDuplex, duplexKey);

  if (hwm != null) {
    if (!(isFinite(hwm) && Math.floor(hwm) === hwm) || hwm < 0) {
      var name = isDuplex ? duplexKey : 'highWaterMark';
      throw new ERR_INVALID_OPT_VALUE(name, hwm);
    }

    return Math.floor(hwm);
  } // Default value


  return state.objectMode ? 16 : 16 * 1024;
}

module.exports = {
  getHighWaterMark: getHighWaterMark
};
},{"../../../errors":90}],103:[function(require,module,exports){
module.exports = require('events').EventEmitter;

},{"events":87}],104:[function(require,module,exports){
(function (Buffer){(function (){
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */

'use strict'

var base64 = require('base64-js')
var ieee754 = require('ieee754')

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

var K_MAX_LENGTH = 0x7fffffff
exports.kMaxLength = K_MAX_LENGTH

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Print warning and recommend using `buffer` v4.x which has an Object
 *               implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * We report that the browser does not support typed arrays if the are not subclassable
 * using __proto__. Firefox 4-29 lacks support for adding new properties to `Uint8Array`
 * (See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438). IE 10 lacks support
 * for __proto__ and has a buggy typed array implementation.
 */
Buffer.TYPED_ARRAY_SUPPORT = typedArraySupport()

if (!Buffer.TYPED_ARRAY_SUPPORT && typeof console !== 'undefined' &&
    typeof console.error === 'function') {
  console.error(
    'This browser lacks typed array (Uint8Array) support which is required by ' +
    '`buffer` v5.x. Use `buffer` v4.x if you require old browser support.'
  )
}

function typedArraySupport () {
  // Can typed array instances can be augmented?
  try {
    var arr = new Uint8Array(1)
    arr.__proto__ = { __proto__: Uint8Array.prototype, foo: function () { return 42 } }
    return arr.foo() === 42
  } catch (e) {
    return false
  }
}

Object.defineProperty(Buffer.prototype, 'parent', {
  enumerable: true,
  get: function () {
    if (!Buffer.isBuffer(this)) return undefined
    return this.buffer
  }
})

Object.defineProperty(Buffer.prototype, 'offset', {
  enumerable: true,
  get: function () {
    if (!Buffer.isBuffer(this)) return undefined
    return this.byteOffset
  }
})

function createBuffer (length) {
  if (length > K_MAX_LENGTH) {
    throw new RangeError('The value "' + length + '" is invalid for option "size"')
  }
  // Return an augmented `Uint8Array` instance
  var buf = new Uint8Array(length)
  buf.__proto__ = Buffer.prototype
  return buf
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new TypeError(
        'The "string" argument must be of type string. Received type number'
      )
    }
    return allocUnsafe(arg)
  }
  return from(arg, encodingOrOffset, length)
}

// Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
if (typeof Symbol !== 'undefined' && Symbol.species != null &&
    Buffer[Symbol.species] === Buffer) {
  Object.defineProperty(Buffer, Symbol.species, {
    value: null,
    configurable: true,
    enumerable: false,
    writable: false
  })
}

Buffer.poolSize = 8192 // not used by this implementation

function from (value, encodingOrOffset, length) {
  if (typeof value === 'string') {
    return fromString(value, encodingOrOffset)
  }

  if (ArrayBuffer.isView(value)) {
    return fromArrayLike(value)
  }

  if (value == null) {
    throw TypeError(
      'The first argument must be one of type string, Buffer, ArrayBuffer, Array, ' +
      'or Array-like Object. Received type ' + (typeof value)
    )
  }

  if (isInstance(value, ArrayBuffer) ||
      (value && isInstance(value.buffer, ArrayBuffer))) {
    return fromArrayBuffer(value, encodingOrOffset, length)
  }

  if (typeof value === 'number') {
    throw new TypeError(
      'The "value" argument must not be of type number. Received type number'
    )
  }

  var valueOf = value.valueOf && value.valueOf()
  if (valueOf != null && valueOf !== value) {
    return Buffer.from(valueOf, encodingOrOffset, length)
  }

  var b = fromObject(value)
  if (b) return b

  if (typeof Symbol !== 'undefined' && Symbol.toPrimitive != null &&
      typeof value[Symbol.toPrimitive] === 'function') {
    return Buffer.from(
      value[Symbol.toPrimitive]('string'), encodingOrOffset, length
    )
  }

  throw new TypeError(
    'The first argument must be one of type string, Buffer, ArrayBuffer, Array, ' +
    'or Array-like Object. Received type ' + (typeof value)
  )
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(value, encodingOrOffset, length)
}

// Note: Change prototype *after* Buffer.from is defined to workaround Chrome bug:
// https://github.com/feross/buffer/pull/148
Buffer.prototype.__proto__ = Uint8Array.prototype
Buffer.__proto__ = Uint8Array

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be of type number')
  } else if (size < 0) {
    throw new RangeError('The value "' + size + '" is invalid for option "size"')
  }
}

function alloc (size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(size).fill(fill, encoding)
      : createBuffer(size).fill(fill)
  }
  return createBuffer(size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(size, fill, encoding)
}

function allocUnsafe (size) {
  assertSize(size)
  return createBuffer(size < 0 ? 0 : checked(size) | 0)
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(size)
}

function fromString (string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('Unknown encoding: ' + encoding)
  }

  var length = byteLength(string, encoding) | 0
  var buf = createBuffer(length)

  var actual = buf.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    buf = buf.slice(0, actual)
  }

  return buf
}

function fromArrayLike (array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0
  var buf = createBuffer(length)
  for (var i = 0; i < length; i += 1) {
    buf[i] = array[i] & 255
  }
  return buf
}

function fromArrayBuffer (array, byteOffset, length) {
  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('"offset" is outside of buffer bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('"length" is outside of buffer bounds')
  }

  var buf
  if (byteOffset === undefined && length === undefined) {
    buf = new Uint8Array(array)
  } else if (length === undefined) {
    buf = new Uint8Array(array, byteOffset)
  } else {
    buf = new Uint8Array(array, byteOffset, length)
  }

  // Return an augmented `Uint8Array` instance
  buf.__proto__ = Buffer.prototype
  return buf
}

function fromObject (obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0
    var buf = createBuffer(len)

    if (buf.length === 0) {
      return buf
    }

    obj.copy(buf, 0, 0, len)
    return buf
  }

  if (obj.length !== undefined) {
    if (typeof obj.length !== 'number' || numberIsNaN(obj.length)) {
      return createBuffer(0)
    }
    return fromArrayLike(obj)
  }

  if (obj.type === 'Buffer' && Array.isArray(obj.data)) {
    return fromArrayLike(obj.data)
  }
}

function checked (length) {
  // Note: cannot use `length < K_MAX_LENGTH` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= K_MAX_LENGTH) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + K_MAX_LENGTH.toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return b != null && b._isBuffer === true &&
    b !== Buffer.prototype // so Buffer.isBuffer(Buffer.prototype) will be false
}

Buffer.compare = function compare (a, b) {
  if (isInstance(a, Uint8Array)) a = Buffer.from(a, a.offset, a.byteLength)
  if (isInstance(b, Uint8Array)) b = Buffer.from(b, b.offset, b.byteLength)
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError(
      'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
    )
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!Array.isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  var buffer = Buffer.allocUnsafe(length)
  var pos = 0
  for (i = 0; i < list.length; ++i) {
    var buf = list[i]
    if (isInstance(buf, Uint8Array)) {
      buf = Buffer.from(buf)
    }
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos)
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (ArrayBuffer.isView(string) || isInstance(string, ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    throw new TypeError(
      'The "string" argument must be one of type string, Buffer, or ArrayBuffer. ' +
      'Received type ' + typeof string
    )
  }

  var len = string.length
  var mustMatch = (arguments.length > 2 && arguments[2] === true)
  if (!mustMatch && len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) {
          return mustMatch ? -1 : utf8ToBytes(string).length // assume utf8
        }
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// This property is used by `Buffer.isBuffer` (and the `is-buffer` npm package)
// to detect a Buffer instance. It's not possible to use `instanceof Buffer`
// reliably in a browserify context because there could be multiple different
// copies of the 'buffer' package in use. This method works even for Buffer
// instances that were created from another copy of the `buffer` package.
// See: https://github.com/feross/buffer/issues/154
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  var i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  var length = this.length
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.toLocaleString = Buffer.prototype.toString

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  str = this.toString('hex', 0, max).replace(/(.{2})/g, '$1 ').trim()
  if (this.length > max) str += ' ... '
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (isInstance(target, Uint8Array)) {
    target = Buffer.from(target, target.offset, target.byteLength)
  }
  if (!Buffer.isBuffer(target)) {
    throw new TypeError(
      'The "target" argument must be one of type Buffer or Uint8Array. ' +
      'Received type ' + (typeof target)
    )
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  var x = thisEnd - thisStart
  var y = end - start
  var len = Math.min(x, y)

  var thisCopy = this.slice(thisStart, thisEnd)
  var targetCopy = target.slice(start, end)

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset // Coerce to Number.
  if (numberIsNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1
  var arrLength = arr.length
  var valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i
  if (dir) {
    var foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      var found = true
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  var strLen = string.length

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (numberIsNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset >>> 0
    if (isFinite(length)) {
      length = length >>> 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
        : (firstByte > 0xBF) ? 2
          : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + (bytes[i + 1] * 256))
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf = this.subarray(start, end)
  // Return an augmented `Uint8Array` instance
  newBuf.__proto__ = Buffer.prototype
  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  this[offset] = (value >>> 8)
  this[offset + 1] = (value & 0xff)
  return offset + 2
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  this[offset + 3] = (value >>> 24)
  this[offset + 2] = (value >>> 16)
  this[offset + 1] = (value >>> 8)
  this[offset] = (value & 0xff)
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  this[offset] = (value >>> 24)
  this[offset + 1] = (value >>> 16)
  this[offset + 2] = (value >>> 8)
  this[offset + 3] = (value & 0xff)
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    var limit = Math.pow(2, (8 * byteLength) - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    var limit = Math.pow(2, (8 * byteLength) - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  this[offset] = (value >>> 8)
  this[offset + 1] = (value & 0xff)
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  this[offset + 2] = (value >>> 16)
  this[offset + 3] = (value >>> 24)
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  this[offset] = (value >>> 24)
  this[offset + 1] = (value >>> 16)
  this[offset + 2] = (value >>> 8)
  this[offset + 3] = (value & 0xff)
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!Buffer.isBuffer(target)) throw new TypeError('argument should be a Buffer')
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('Index out of range')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start

  if (this === target && typeof Uint8Array.prototype.copyWithin === 'function') {
    // Use built-in when available, missing from IE11
    this.copyWithin(targetStart, start, end)
  } else if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (var i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, end),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0)
      if ((encoding === 'utf8' && code < 128) ||
          encoding === 'latin1') {
        // Fast path: If `val` fits into a single byte, use that numeric value.
        val = code
      }
    }
  } else if (typeof val === 'number') {
    val = val & 255
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  var i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    var bytes = Buffer.isBuffer(val)
      ? val
      : Buffer.from(val, encoding)
    var len = bytes.length
    if (len === 0) {
      throw new TypeError('The value "' + val +
        '" is invalid for argument "value"')
    }
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node takes equal signs as end of the Base64 encoding
  str = str.split('=')[0]
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = str.trim().replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

// ArrayBuffer or Uint8Array objects from other contexts (i.e. iframes) do not pass
// the `instanceof` check but they should be treated as of that type.
// See: https://github.com/feross/buffer/issues/166
function isInstance (obj, type) {
  return obj instanceof type ||
    (obj != null && obj.constructor != null && obj.constructor.name != null &&
      obj.constructor.name === type.name)
}
function numberIsNaN (obj) {
  // For IE11 support
  return obj !== obj // eslint-disable-line no-self-compare
}

}).call(this)}).call(this,require("buffer").Buffer)
},{"base64-js":84,"buffer":104,"ieee754":174}],105:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var callBind = require('./');

var $indexOf = callBind(GetIntrinsic('String.prototype.indexOf'));

module.exports = function callBoundIntrinsic(name, allowMissing) {
	var intrinsic = GetIntrinsic(name, !!allowMissing);
	if (typeof intrinsic === 'function' && $indexOf(name, '.prototype.') > -1) {
		return callBind(intrinsic);
	}
	return intrinsic;
};

},{"./":106,"get-intrinsic":170}],106:[function(require,module,exports){
'use strict';

var bind = require('function-bind');
var GetIntrinsic = require('get-intrinsic');

var $apply = GetIntrinsic('%Function.prototype.apply%');
var $call = GetIntrinsic('%Function.prototype.call%');
var $reflectApply = GetIntrinsic('%Reflect.apply%', true) || bind.call($call, $apply);

var $gOPD = GetIntrinsic('%Object.getOwnPropertyDescriptor%', true);
var $defineProperty = GetIntrinsic('%Object.defineProperty%', true);
var $max = GetIntrinsic('%Math.max%');

if ($defineProperty) {
	try {
		$defineProperty({}, 'a', { value: 1 });
	} catch (e) {
		// IE 8 has a broken defineProperty
		$defineProperty = null;
	}
}

module.exports = function callBind(originalFunction) {
	var func = $reflectApply(bind, $call, arguments);
	if ($gOPD && $defineProperty) {
		var desc = $gOPD(func, 'length');
		if (desc.configurable) {
			// original length, plus the receiver, minus any additional arguments (after the receiver)
			$defineProperty(
				func,
				'length',
				{ value: 1 + $max(0, originalFunction.length - (arguments.length - 1)) }
			);
		}
	}
	return func;
};

var applyBind = function applyBind() {
	return $reflectApply(bind, $apply, arguments);
};

if ($defineProperty) {
	$defineProperty(module.exports, 'apply', { value: applyBind });
} else {
	module.exports.apply = applyBind;
}

},{"function-bind":169,"get-intrinsic":170}],107:[function(require,module,exports){
var pSlice = Array.prototype.slice;
var objectKeys = require('./lib/keys.js');
var isArguments = require('./lib/is_arguments.js');

var deepEqual = module.exports = function (actual, expected, opts) {
  if (!opts) opts = {};
  // 7.1. All identical values are equivalent, as determined by ===.
  if (actual === expected) {
    return true;

  } else if (actual instanceof Date && expected instanceof Date) {
    return actual.getTime() === expected.getTime();

  // 7.3. Other pairs that do not both pass typeof value == 'object',
  // equivalence is determined by ==.
  } else if (!actual || !expected || typeof actual != 'object' && typeof expected != 'object') {
    return opts.strict ? actual === expected : actual == expected;

  // 7.4. For all other Object pairs, including Array objects, equivalence is
  // determined by having the same number of owned properties (as verified
  // with Object.prototype.hasOwnProperty.call), the same set of keys
  // (although not necessarily the same order), equivalent values for every
  // corresponding key, and an identical 'prototype' property. Note: this
  // accounts for both named and indexed properties on Arrays.
  } else {
    return objEquiv(actual, expected, opts);
  }
}

function isUndefinedOrNull(value) {
  return value === null || value === undefined;
}

function isBuffer (x) {
  if (!x || typeof x !== 'object' || typeof x.length !== 'number') return false;
  if (typeof x.copy !== 'function' || typeof x.slice !== 'function') {
    return false;
  }
  if (x.length > 0 && typeof x[0] !== 'number') return false;
  return true;
}

function objEquiv(a, b, opts) {
  var i, key;
  if (isUndefinedOrNull(a) || isUndefinedOrNull(b))
    return false;
  // an identical 'prototype' property.
  if (a.prototype !== b.prototype) return false;
  //~~~I've managed to break Object.keys through screwy arguments passing.
  //   Converting to array solves the problem.
  if (isArguments(a)) {
    if (!isArguments(b)) {
      return false;
    }
    a = pSlice.call(a);
    b = pSlice.call(b);
    return deepEqual(a, b, opts);
  }
  if (isBuffer(a)) {
    if (!isBuffer(b)) {
      return false;
    }
    if (a.length !== b.length) return false;
    for (i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  }
  try {
    var ka = objectKeys(a),
        kb = objectKeys(b);
  } catch (e) {//happens when one is a string literal and the other isn't
    return false;
  }
  // having the same number of owned properties (keys incorporates
  // hasOwnProperty)
  if (ka.length != kb.length)
    return false;
  //the same set of keys (although not necessarily the same order),
  ka.sort();
  kb.sort();
  //~~~cheap key test
  for (i = ka.length - 1; i >= 0; i--) {
    if (ka[i] != kb[i])
      return false;
  }
  //equivalent values for every corresponding key, and
  //~~~possibly expensive deep test
  for (i = ka.length - 1; i >= 0; i--) {
    key = ka[i];
    if (!deepEqual(a[key], b[key], opts)) return false;
  }
  return typeof a === typeof b;
}

},{"./lib/is_arguments.js":108,"./lib/keys.js":109}],108:[function(require,module,exports){
var supportsArgumentsClass = (function(){
  return Object.prototype.toString.call(arguments)
})() == '[object Arguments]';

exports = module.exports = supportsArgumentsClass ? supported : unsupported;

exports.supported = supported;
function supported(object) {
  return Object.prototype.toString.call(object) == '[object Arguments]';
};

exports.unsupported = unsupported;
function unsupported(object){
  return object &&
    typeof object == 'object' &&
    typeof object.length == 'number' &&
    Object.prototype.hasOwnProperty.call(object, 'callee') &&
    !Object.prototype.propertyIsEnumerable.call(object, 'callee') ||
    false;
};

},{}],109:[function(require,module,exports){
exports = module.exports = typeof Object.keys === 'function'
  ? Object.keys : shim;

exports.shim = shim;
function shim (obj) {
  var keys = [];
  for (var key in obj) keys.push(key);
  return keys;
}

},{}],110:[function(require,module,exports){
'use strict';

var keys = require('object-keys');
var hasSymbols = typeof Symbol === 'function' && typeof Symbol('foo') === 'symbol';

var toStr = Object.prototype.toString;
var concat = Array.prototype.concat;
var origDefineProperty = Object.defineProperty;

var isFunction = function (fn) {
	return typeof fn === 'function' && toStr.call(fn) === '[object Function]';
};

var arePropertyDescriptorsSupported = function () {
	var obj = {};
	try {
		origDefineProperty(obj, 'x', { enumerable: false, value: obj });
		// eslint-disable-next-line no-unused-vars, no-restricted-syntax
		for (var _ in obj) { // jscs:ignore disallowUnusedVariables
			return false;
		}
		return obj.x === obj;
	} catch (e) { /* this is IE 8. */
		return false;
	}
};
var supportsDescriptors = origDefineProperty && arePropertyDescriptorsSupported();

var defineProperty = function (object, name, value, predicate) {
	if (name in object && (!isFunction(predicate) || !predicate())) {
		return;
	}
	if (supportsDescriptors) {
		origDefineProperty(object, name, {
			configurable: true,
			enumerable: false,
			value: value,
			writable: true
		});
	} else {
		object[name] = value;
	}
};

var defineProperties = function (object, map) {
	var predicates = arguments.length > 2 ? arguments[2] : {};
	var props = keys(map);
	if (hasSymbols) {
		props = concat.call(props, Object.getOwnPropertySymbols(map));
	}
	for (var i = 0; i < props.length; i += 1) {
		defineProperty(object, props[i], map[props[i]], predicates[props[i]]);
	}
};

defineProperties.supportsDescriptors = !!supportsDescriptors;

module.exports = defineProperties;

},{"object-keys":181}],111:[function(require,module,exports){
module.exports = function () {
    for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] !== undefined) return arguments[i];
    }
};

},{}],112:[function(require,module,exports){
'use strict';

var ToNumber = require('./ToNumber');
var ToPrimitive = require('./ToPrimitive');
var Type = require('./Type');

// https://262.ecma-international.org/5.1/#sec-11.9.3

module.exports = function AbstractEqualityComparison(x, y) {
	var xType = Type(x);
	var yType = Type(y);
	if (xType === yType) {
		return x === y; // ES6+ specified this shortcut anyways.
	}
	if (x == null && y == null) {
		return true;
	}
	if (xType === 'Number' && yType === 'String') {
		return AbstractEqualityComparison(x, ToNumber(y));
	}
	if (xType === 'String' && yType === 'Number') {
		return AbstractEqualityComparison(ToNumber(x), y);
	}
	if (xType === 'Boolean') {
		return AbstractEqualityComparison(ToNumber(x), y);
	}
	if (yType === 'Boolean') {
		return AbstractEqualityComparison(x, ToNumber(y));
	}
	if ((xType === 'String' || xType === 'Number') && yType === 'Object') {
		return AbstractEqualityComparison(x, ToPrimitive(y));
	}
	if (xType === 'Object' && (yType === 'String' || yType === 'Number')) {
		return AbstractEqualityComparison(ToPrimitive(x), y);
	}
	return false;
};

},{"./ToNumber":142,"./ToPrimitive":144,"./Type":149}],113:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $Number = GetIntrinsic('%Number%');
var $TypeError = GetIntrinsic('%TypeError%');

var $isNaN = require('../helpers/isNaN');
var $isFinite = require('../helpers/isFinite');
var isPrefixOf = require('../helpers/isPrefixOf');

var ToNumber = require('./ToNumber');
var ToPrimitive = require('./ToPrimitive');
var Type = require('./Type');

// https://262.ecma-international.org/5.1/#sec-11.8.5

// eslint-disable-next-line max-statements
module.exports = function AbstractRelationalComparison(x, y, LeftFirst) {
	if (Type(LeftFirst) !== 'Boolean') {
		throw new $TypeError('Assertion failed: LeftFirst argument must be a Boolean');
	}
	var px;
	var py;
	if (LeftFirst) {
		px = ToPrimitive(x, $Number);
		py = ToPrimitive(y, $Number);
	} else {
		py = ToPrimitive(y, $Number);
		px = ToPrimitive(x, $Number);
	}
	var bothStrings = Type(px) === 'String' && Type(py) === 'String';
	if (!bothStrings) {
		var nx = ToNumber(px);
		var ny = ToNumber(py);
		if ($isNaN(nx) || $isNaN(ny)) {
			return undefined;
		}
		if ($isFinite(nx) && $isFinite(ny) && nx === ny) {
			return false;
		}
		if (nx === Infinity) {
			return false;
		}
		if (ny === Infinity) {
			return true;
		}
		if (ny === -Infinity) {
			return false;
		}
		if (nx === -Infinity) {
			return true;
		}
		return nx < ny; // by now, these are both nonzero, finite, and not equal
	}
	if (isPrefixOf(py, px)) {
		return false;
	}
	if (isPrefixOf(px, py)) {
		return true;
	}
	return px < py; // both strings, neither a prefix of the other. shortcut for steps c-f
};

},{"../helpers/isFinite":158,"../helpers/isNaN":159,"../helpers/isPrefixOf":160,"./ToNumber":142,"./ToPrimitive":144,"./Type":149,"get-intrinsic":170}],114:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

// http://262.ecma-international.org/5.1/#sec-9.10

module.exports = function CheckObjectCoercible(value, optMessage) {
	if (value == null) {
		throw new $TypeError(optMessage || ('Cannot call method on ' + value));
	}
	return value;
};

},{"get-intrinsic":170}],115:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $EvalError = GetIntrinsic('%EvalError%');

var DayWithinYear = require('./DayWithinYear');
var InLeapYear = require('./InLeapYear');
var MonthFromTime = require('./MonthFromTime');

// https://262.ecma-international.org/5.1/#sec-15.9.1.5

module.exports = function DateFromTime(t) {
	var m = MonthFromTime(t);
	var d = DayWithinYear(t);
	if (m === 0) {
		return d + 1;
	}
	if (m === 1) {
		return d - 30;
	}
	var leap = InLeapYear(t);
	if (m === 2) {
		return d - 58 - leap;
	}
	if (m === 3) {
		return d - 89 - leap;
	}
	if (m === 4) {
		return d - 119 - leap;
	}
	if (m === 5) {
		return d - 150 - leap;
	}
	if (m === 6) {
		return d - 180 - leap;
	}
	if (m === 7) {
		return d - 211 - leap;
	}
	if (m === 8) {
		return d - 242 - leap;
	}
	if (m === 9) {
		return d - 272 - leap;
	}
	if (m === 10) {
		return d - 303 - leap;
	}
	if (m === 11) {
		return d - 333 - leap;
	}
	throw new $EvalError('Assertion failed: MonthFromTime returned an impossible value: ' + m);
};

},{"./DayWithinYear":118,"./InLeapYear":122,"./MonthFromTime":132,"get-intrinsic":170}],116:[function(require,module,exports){
'use strict';

var floor = require('./floor');

var msPerDay = require('../helpers/timeConstants').msPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.2

module.exports = function Day(t) {
	return floor(t / msPerDay);
};

},{"../helpers/timeConstants":164,"./floor":153}],117:[function(require,module,exports){
'use strict';

var floor = require('./floor');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

module.exports = function DayFromYear(y) {
	return (365 * (y - 1970)) + floor((y - 1969) / 4) - floor((y - 1901) / 100) + floor((y - 1601) / 400);
};


},{"./floor":153}],118:[function(require,module,exports){
'use strict';

var Day = require('./Day');
var DayFromYear = require('./DayFromYear');
var YearFromTime = require('./YearFromTime');

// https://262.ecma-international.org/5.1/#sec-15.9.1.4

module.exports = function DayWithinYear(t) {
	return Day(t) - DayFromYear(YearFromTime(t));
};

},{"./Day":116,"./DayFromYear":117,"./YearFromTime":151}],119:[function(require,module,exports){
'use strict';

var modulo = require('./modulo');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

module.exports = function DaysInYear(y) {
	if (modulo(y, 4) !== 0) {
		return 365;
	}
	if (modulo(y, 100) !== 0) {
		return 366;
	}
	if (modulo(y, 400) !== 0) {
		return 365;
	}
	return 366;
};

},{"./modulo":154}],120:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var Type = require('./Type');
var IsDataDescriptor = require('./IsDataDescriptor');
var IsAccessorDescriptor = require('./IsAccessorDescriptor');

var assertRecord = require('../helpers/assertRecord');

// https://262.ecma-international.org/5.1/#sec-8.10.4

module.exports = function FromPropertyDescriptor(Desc) {
	if (typeof Desc === 'undefined') {
		return Desc;
	}

	assertRecord(Type, 'Property Descriptor', 'Desc', Desc);

	if (IsDataDescriptor(Desc)) {
		return {
			value: Desc['[[Value]]'],
			writable: !!Desc['[[Writable]]'],
			enumerable: !!Desc['[[Enumerable]]'],
			configurable: !!Desc['[[Configurable]]']
		};
	} else if (IsAccessorDescriptor(Desc)) {
		return {
			get: Desc['[[Get]]'],
			set: Desc['[[Set]]'],
			enumerable: !!Desc['[[Enumerable]]'],
			configurable: !!Desc['[[Configurable]]']
		};
	} else {
		throw new $TypeError('FromPropertyDescriptor must be called with a fully populated Property Descriptor');
	}
};

},{"../helpers/assertRecord":157,"./IsAccessorDescriptor":123,"./IsDataDescriptor":125,"./Type":149,"get-intrinsic":170}],121:[function(require,module,exports){
'use strict';

var floor = require('./floor');
var modulo = require('./modulo');

var timeConstants = require('../helpers/timeConstants');
var msPerHour = timeConstants.msPerHour;
var HoursPerDay = timeConstants.HoursPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.10

module.exports = function HourFromTime(t) {
	return modulo(floor(t / msPerHour), HoursPerDay);
};

},{"../helpers/timeConstants":164,"./floor":153,"./modulo":154}],122:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $EvalError = GetIntrinsic('%EvalError%');

var DaysInYear = require('./DaysInYear');
var YearFromTime = require('./YearFromTime');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

module.exports = function InLeapYear(t) {
	var days = DaysInYear(YearFromTime(t));
	if (days === 365) {
		return 0;
	}
	if (days === 366) {
		return 1;
	}
	throw new $EvalError('Assertion failed: there are not 365 or 366 days in a year, got: ' + days);
};

},{"./DaysInYear":119,"./YearFromTime":151,"get-intrinsic":170}],123:[function(require,module,exports){
'use strict';

var has = require('has');

var Type = require('./Type');

var assertRecord = require('../helpers/assertRecord');

// https://262.ecma-international.org/5.1/#sec-8.10.1

module.exports = function IsAccessorDescriptor(Desc) {
	if (typeof Desc === 'undefined') {
		return false;
	}

	assertRecord(Type, 'Property Descriptor', 'Desc', Desc);

	if (!has(Desc, '[[Get]]') && !has(Desc, '[[Set]]')) {
		return false;
	}

	return true;
};

},{"../helpers/assertRecord":157,"./Type":149,"has":173}],124:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.11

module.exports = require('is-callable');

},{"is-callable":176}],125:[function(require,module,exports){
'use strict';

var has = require('has');

var Type = require('./Type');

var assertRecord = require('../helpers/assertRecord');

// https://262.ecma-international.org/5.1/#sec-8.10.2

module.exports = function IsDataDescriptor(Desc) {
	if (typeof Desc === 'undefined') {
		return false;
	}

	assertRecord(Type, 'Property Descriptor', 'Desc', Desc);

	if (!has(Desc, '[[Value]]') && !has(Desc, '[[Writable]]')) {
		return false;
	}

	return true;
};

},{"../helpers/assertRecord":157,"./Type":149,"has":173}],126:[function(require,module,exports){
'use strict';

var IsAccessorDescriptor = require('./IsAccessorDescriptor');
var IsDataDescriptor = require('./IsDataDescriptor');
var Type = require('./Type');

var assertRecord = require('../helpers/assertRecord');

// https://262.ecma-international.org/5.1/#sec-8.10.3

module.exports = function IsGenericDescriptor(Desc) {
	if (typeof Desc === 'undefined') {
		return false;
	}

	assertRecord(Type, 'Property Descriptor', 'Desc', Desc);

	if (!IsAccessorDescriptor(Desc) && !IsDataDescriptor(Desc)) {
		return true;
	}

	return false;
};

},{"../helpers/assertRecord":157,"./IsAccessorDescriptor":123,"./IsDataDescriptor":125,"./Type":149}],127:[function(require,module,exports){
'use strict';

// TODO, semver-major: delete this

var isPropertyDescriptor = require('../helpers/isPropertyDescriptor');

var Type = require('./Type');
var IsDataDescriptor = require('./IsDataDescriptor');
var IsAccessorDescriptor = require('./IsAccessorDescriptor');

// https://262.ecma-international.org/6.0/#sec-property-descriptor-specification-type

module.exports = function IsPropertyDescriptor(Desc) {
	return isPropertyDescriptor({
		IsDataDescriptor: IsDataDescriptor,
		IsAccessorDescriptor: IsAccessorDescriptor,
		Type: Type
	}, Desc);
};

},{"../helpers/isPropertyDescriptor":161,"./IsAccessorDescriptor":123,"./IsDataDescriptor":125,"./Type":149}],128:[function(require,module,exports){
'use strict';

var $isFinite = require('../helpers/isFinite');
var msPerDay = require('../helpers/timeConstants').msPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.13

module.exports = function MakeDate(day, time) {
	if (!$isFinite(day) || !$isFinite(time)) {
		return NaN;
	}
	return (day * msPerDay) + time;
};

},{"../helpers/isFinite":158,"../helpers/timeConstants":164}],129:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $DateUTC = GetIntrinsic('%Date.UTC%');

var $isFinite = require('../helpers/isFinite');

var DateFromTime = require('./DateFromTime');
var Day = require('./Day');
var floor = require('./floor');
var modulo = require('./modulo');
var MonthFromTime = require('./MonthFromTime');
var ToInteger = require('./ToInteger');
var YearFromTime = require('./YearFromTime');

// https://262.ecma-international.org/5.1/#sec-15.9.1.12

module.exports = function MakeDay(year, month, date) {
	if (!$isFinite(year) || !$isFinite(month) || !$isFinite(date)) {
		return NaN;
	}
	var y = ToInteger(year);
	var m = ToInteger(month);
	var dt = ToInteger(date);
	var ym = y + floor(m / 12);
	var mn = modulo(m, 12);
	var t = $DateUTC(ym, mn, 1);
	if (YearFromTime(t) !== ym || MonthFromTime(t) !== mn || DateFromTime(t) !== 1) {
		return NaN;
	}
	return Day(t) + dt - 1;
};

},{"../helpers/isFinite":158,"./DateFromTime":115,"./Day":116,"./MonthFromTime":132,"./ToInteger":141,"./YearFromTime":151,"./floor":153,"./modulo":154,"get-intrinsic":170}],130:[function(require,module,exports){
'use strict';

var $isFinite = require('../helpers/isFinite');
var timeConstants = require('../helpers/timeConstants');
var msPerSecond = timeConstants.msPerSecond;
var msPerMinute = timeConstants.msPerMinute;
var msPerHour = timeConstants.msPerHour;

var ToInteger = require('./ToInteger');

// https://262.ecma-international.org/5.1/#sec-15.9.1.11

module.exports = function MakeTime(hour, min, sec, ms) {
	if (!$isFinite(hour) || !$isFinite(min) || !$isFinite(sec) || !$isFinite(ms)) {
		return NaN;
	}
	var h = ToInteger(hour);
	var m = ToInteger(min);
	var s = ToInteger(sec);
	var milli = ToInteger(ms);
	var t = (h * msPerHour) + (m * msPerMinute) + (s * msPerSecond) + milli;
	return t;
};

},{"../helpers/isFinite":158,"../helpers/timeConstants":164,"./ToInteger":141}],131:[function(require,module,exports){
'use strict';

var floor = require('./floor');
var modulo = require('./modulo');

var timeConstants = require('../helpers/timeConstants');
var msPerMinute = timeConstants.msPerMinute;
var MinutesPerHour = timeConstants.MinutesPerHour;

// https://262.ecma-international.org/5.1/#sec-15.9.1.10

module.exports = function MinFromTime(t) {
	return modulo(floor(t / msPerMinute), MinutesPerHour);
};

},{"../helpers/timeConstants":164,"./floor":153,"./modulo":154}],132:[function(require,module,exports){
'use strict';

var DayWithinYear = require('./DayWithinYear');
var InLeapYear = require('./InLeapYear');

// https://262.ecma-international.org/5.1/#sec-15.9.1.4

module.exports = function MonthFromTime(t) {
	var day = DayWithinYear(t);
	if (0 <= day && day < 31) {
		return 0;
	}
	var leap = InLeapYear(t);
	if (31 <= day && day < (59 + leap)) {
		return 1;
	}
	if ((59 + leap) <= day && day < (90 + leap)) {
		return 2;
	}
	if ((90 + leap) <= day && day < (120 + leap)) {
		return 3;
	}
	if ((120 + leap) <= day && day < (151 + leap)) {
		return 4;
	}
	if ((151 + leap) <= day && day < (181 + leap)) {
		return 5;
	}
	if ((181 + leap) <= day && day < (212 + leap)) {
		return 6;
	}
	if ((212 + leap) <= day && day < (243 + leap)) {
		return 7;
	}
	if ((243 + leap) <= day && day < (273 + leap)) {
		return 8;
	}
	if ((273 + leap) <= day && day < (304 + leap)) {
		return 9;
	}
	if ((304 + leap) <= day && day < (334 + leap)) {
		return 10;
	}
	if ((334 + leap) <= day && day < (365 + leap)) {
		return 11;
	}
};

},{"./DayWithinYear":118,"./InLeapYear":122}],133:[function(require,module,exports){
'use strict';

var $isNaN = require('../helpers/isNaN');

// http://262.ecma-international.org/5.1/#sec-9.12

module.exports = function SameValue(x, y) {
	if (x === y) { // 0 === -0, but they are not identical.
		if (x === 0) { return 1 / x === 1 / y; }
		return true;
	}
	return $isNaN(x) && $isNaN(y);
};

},{"../helpers/isNaN":159}],134:[function(require,module,exports){
'use strict';

var floor = require('./floor');
var modulo = require('./modulo');

var timeConstants = require('../helpers/timeConstants');
var msPerSecond = timeConstants.msPerSecond;
var SecondsPerMinute = timeConstants.SecondsPerMinute;

// https://262.ecma-international.org/5.1/#sec-15.9.1.10

module.exports = function SecFromTime(t) {
	return modulo(floor(t / msPerSecond), SecondsPerMinute);
};

},{"../helpers/timeConstants":164,"./floor":153,"./modulo":154}],135:[function(require,module,exports){
'use strict';

var Type = require('./Type');

// https://262.ecma-international.org/5.1/#sec-11.9.6

module.exports = function StrictEqualityComparison(x, y) {
	var xType = Type(x);
	var yType = Type(y);
	if (xType !== yType) {
		return false;
	}
	if (xType === 'Undefined' || xType === 'Null') {
		return true;
	}
	return x === y; // shortcut for steps 4-7
};

},{"./Type":149}],136:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $Date = GetIntrinsic('%Date%');
var $Number = GetIntrinsic('%Number%');

var $isFinite = require('../helpers/isFinite');

var abs = require('./abs');
var ToNumber = require('./ToNumber');

// https://262.ecma-international.org/5.1/#sec-15.9.1.14

module.exports = function TimeClip(time) {
	if (!$isFinite(time) || abs(time) > 8.64e15) {
		return NaN;
	}
	return $Number(new $Date(ToNumber(time)));
};


},{"../helpers/isFinite":158,"./ToNumber":142,"./abs":152,"get-intrinsic":170}],137:[function(require,module,exports){
'use strict';

var msPerDay = require('../helpers/timeConstants').msPerDay;

var DayFromYear = require('./DayFromYear');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

module.exports = function TimeFromYear(y) {
	return msPerDay * DayFromYear(y);
};

},{"../helpers/timeConstants":164,"./DayFromYear":117}],138:[function(require,module,exports){
'use strict';

var modulo = require('./modulo');

var msPerDay = require('../helpers/timeConstants').msPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.2

module.exports = function TimeWithinDay(t) {
	return modulo(t, msPerDay);
};


},{"../helpers/timeConstants":164,"./modulo":154}],139:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.2

module.exports = function ToBoolean(value) { return !!value; };

},{}],140:[function(require,module,exports){
'use strict';

var ToNumber = require('./ToNumber');

// http://262.ecma-international.org/5.1/#sec-9.5

module.exports = function ToInt32(x) {
	return ToNumber(x) >> 0;
};

},{"./ToNumber":142}],141:[function(require,module,exports){
'use strict';

var abs = require('./abs');
var floor = require('./floor');
var ToNumber = require('./ToNumber');

var $isNaN = require('../helpers/isNaN');
var $isFinite = require('../helpers/isFinite');
var $sign = require('../helpers/sign');

// http://262.ecma-international.org/5.1/#sec-9.4

module.exports = function ToInteger(value) {
	var number = ToNumber(value);
	if ($isNaN(number)) { return 0; }
	if (number === 0 || !$isFinite(number)) { return number; }
	return $sign(number) * floor(abs(number));
};

},{"../helpers/isFinite":158,"../helpers/isNaN":159,"../helpers/sign":163,"./ToNumber":142,"./abs":152,"./floor":153}],142:[function(require,module,exports){
'use strict';

var ToPrimitive = require('./ToPrimitive');

// http://262.ecma-international.org/5.1/#sec-9.3

module.exports = function ToNumber(value) {
	var prim = ToPrimitive(value, Number);
	if (typeof prim !== 'string') {
		return +prim; // eslint-disable-line no-implicit-coercion
	}

	// eslint-disable-next-line no-control-regex
	var trimmed = prim.replace(/^[ \t\x0b\f\xa0\ufeff\n\r\u2028\u2029\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u0085]+|[ \t\x0b\f\xa0\ufeff\n\r\u2028\u2029\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u0085]+$/g, '');
	if ((/^0[ob]|^[+-]0x/).test(trimmed)) {
		return NaN;
	}

	return +trimmed; // eslint-disable-line no-implicit-coercion
};

},{"./ToPrimitive":144}],143:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $Object = GetIntrinsic('%Object%');

var CheckObjectCoercible = require('./CheckObjectCoercible');

// http://262.ecma-international.org/5.1/#sec-9.9

module.exports = function ToObject(value) {
	CheckObjectCoercible(value);
	return $Object(value);
};

},{"./CheckObjectCoercible":114,"get-intrinsic":170}],144:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.1

module.exports = require('es-to-primitive/es5');

},{"es-to-primitive/es5":165}],145:[function(require,module,exports){
'use strict';

var has = require('has');

var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var Type = require('./Type');
var ToBoolean = require('./ToBoolean');
var IsCallable = require('./IsCallable');

// https://262.ecma-international.org/5.1/#sec-8.10.5

module.exports = function ToPropertyDescriptor(Obj) {
	if (Type(Obj) !== 'Object') {
		throw new $TypeError('ToPropertyDescriptor requires an object');
	}

	var desc = {};
	if (has(Obj, 'enumerable')) {
		desc['[[Enumerable]]'] = ToBoolean(Obj.enumerable);
	}
	if (has(Obj, 'configurable')) {
		desc['[[Configurable]]'] = ToBoolean(Obj.configurable);
	}
	if (has(Obj, 'value')) {
		desc['[[Value]]'] = Obj.value;
	}
	if (has(Obj, 'writable')) {
		desc['[[Writable]]'] = ToBoolean(Obj.writable);
	}
	if (has(Obj, 'get')) {
		var getter = Obj.get;
		if (typeof getter !== 'undefined' && !IsCallable(getter)) {
			throw new $TypeError('getter must be a function');
		}
		desc['[[Get]]'] = getter;
	}
	if (has(Obj, 'set')) {
		var setter = Obj.set;
		if (typeof setter !== 'undefined' && !IsCallable(setter)) {
			throw new $TypeError('setter must be a function');
		}
		desc['[[Set]]'] = setter;
	}

	if ((has(desc, '[[Get]]') || has(desc, '[[Set]]')) && (has(desc, '[[Value]]') || has(desc, '[[Writable]]'))) {
		throw new $TypeError('Invalid property descriptor. Cannot both specify accessors and a value or writable attribute');
	}
	return desc;
};

},{"./IsCallable":124,"./ToBoolean":139,"./Type":149,"get-intrinsic":170,"has":173}],146:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $String = GetIntrinsic('%String%');

// http://262.ecma-international.org/5.1/#sec-9.8

module.exports = function ToString(value) {
	return $String(value);
};


},{"get-intrinsic":170}],147:[function(require,module,exports){
'use strict';

var abs = require('./abs');
var floor = require('./floor');
var modulo = require('./modulo');
var ToNumber = require('./ToNumber');

var $isNaN = require('../helpers/isNaN');
var $isFinite = require('../helpers/isFinite');
var $sign = require('../helpers/sign');

// http://262.ecma-international.org/5.1/#sec-9.7

module.exports = function ToUint16(value) {
	var number = ToNumber(value);
	if ($isNaN(number) || number === 0 || !$isFinite(number)) { return 0; }
	var posInt = $sign(number) * floor(abs(number));
	return modulo(posInt, 0x10000);
};

},{"../helpers/isFinite":158,"../helpers/isNaN":159,"../helpers/sign":163,"./ToNumber":142,"./abs":152,"./floor":153,"./modulo":154}],148:[function(require,module,exports){
'use strict';

var ToNumber = require('./ToNumber');

// http://262.ecma-international.org/5.1/#sec-9.6

module.exports = function ToUint32(x) {
	return ToNumber(x) >>> 0;
};

},{"./ToNumber":142}],149:[function(require,module,exports){
'use strict';

// https://262.ecma-international.org/5.1/#sec-8

module.exports = function Type(x) {
	if (x === null) {
		return 'Null';
	}
	if (typeof x === 'undefined') {
		return 'Undefined';
	}
	if (typeof x === 'function' || typeof x === 'object') {
		return 'Object';
	}
	if (typeof x === 'number') {
		return 'Number';
	}
	if (typeof x === 'boolean') {
		return 'Boolean';
	}
	if (typeof x === 'string') {
		return 'String';
	}
};

},{}],150:[function(require,module,exports){
'use strict';

var Day = require('./Day');
var modulo = require('./modulo');

// https://262.ecma-international.org/5.1/#sec-15.9.1.6

module.exports = function WeekDay(t) {
	return modulo(Day(t) + 4, 7);
};

},{"./Day":116,"./modulo":154}],151:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $Date = GetIntrinsic('%Date%');

var callBound = require('call-bind/callBound');

var $getUTCFullYear = callBound('Date.prototype.getUTCFullYear');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

module.exports = function YearFromTime(t) {
	// largest y such that this.TimeFromYear(y) <= t
	return $getUTCFullYear(new $Date(t));
};

},{"call-bind/callBound":105,"get-intrinsic":170}],152:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $abs = GetIntrinsic('%Math.abs%');

// http://262.ecma-international.org/5.1/#sec-5.2

module.exports = function abs(x) {
	return $abs(x);
};

},{"get-intrinsic":170}],153:[function(require,module,exports){
'use strict';

// var modulo = require('./modulo');
var $floor = Math.floor;

// http://262.ecma-international.org/5.1/#sec-5.2

module.exports = function floor(x) {
	// return x - modulo(x, 1);
	return $floor(x);
};

},{}],154:[function(require,module,exports){
'use strict';

var mod = require('../helpers/mod');

// https://262.ecma-international.org/5.1/#sec-5.2

module.exports = function modulo(x, y) {
	return mod(x, y);
};

},{"../helpers/mod":162}],155:[function(require,module,exports){
'use strict';

var modulo = require('./modulo');

var msPerSecond = require('../helpers/timeConstants').msPerSecond;

// https://262.ecma-international.org/5.1/#sec-15.9.1.10

module.exports = function msFromTime(t) {
	return modulo(t, msPerSecond);
};

},{"../helpers/timeConstants":164,"./modulo":154}],156:[function(require,module,exports){
'use strict';

/* eslint global-require: 0 */

// https://es5.github.io/#x9
module.exports = {
	'Abstract Equality Comparison': require('./5/AbstractEqualityComparison'),
	'Abstract Relational Comparison': require('./5/AbstractRelationalComparison'),
	'Strict Equality Comparison': require('./5/StrictEqualityComparison'),
	abs: require('./5/abs'),
	CheckObjectCoercible: require('./5/CheckObjectCoercible'),
	DateFromTime: require('./5/DateFromTime'),
	Day: require('./5/Day'),
	DayFromYear: require('./5/DayFromYear'),
	DaysInYear: require('./5/DaysInYear'),
	DayWithinYear: require('./5/DayWithinYear'),
	floor: require('./5/floor'),
	FromPropertyDescriptor: require('./5/FromPropertyDescriptor'),
	HourFromTime: require('./5/HourFromTime'),
	InLeapYear: require('./5/InLeapYear'),
	IsAccessorDescriptor: require('./5/IsAccessorDescriptor'),
	IsCallable: require('./5/IsCallable'),
	IsDataDescriptor: require('./5/IsDataDescriptor'),
	IsGenericDescriptor: require('./5/IsGenericDescriptor'),
	IsPropertyDescriptor: require('./5/IsPropertyDescriptor'),
	MakeDate: require('./5/MakeDate'),
	MakeDay: require('./5/MakeDay'),
	MakeTime: require('./5/MakeTime'),
	MinFromTime: require('./5/MinFromTime'),
	modulo: require('./5/modulo'),
	MonthFromTime: require('./5/MonthFromTime'),
	msFromTime: require('./5/msFromTime'),
	SameValue: require('./5/SameValue'),
	SecFromTime: require('./5/SecFromTime'),
	TimeClip: require('./5/TimeClip'),
	TimeFromYear: require('./5/TimeFromYear'),
	TimeWithinDay: require('./5/TimeWithinDay'),
	ToBoolean: require('./5/ToBoolean'),
	ToInt32: require('./5/ToInt32'),
	ToInteger: require('./5/ToInteger'),
	ToNumber: require('./5/ToNumber'),
	ToObject: require('./5/ToObject'),
	ToPrimitive: require('./5/ToPrimitive'),
	ToPropertyDescriptor: require('./5/ToPropertyDescriptor'),
	ToString: require('./5/ToString'),
	ToUint16: require('./5/ToUint16'),
	ToUint32: require('./5/ToUint32'),
	Type: require('./5/Type'),
	WeekDay: require('./5/WeekDay'),
	YearFromTime: require('./5/YearFromTime')
};

},{"./5/AbstractEqualityComparison":112,"./5/AbstractRelationalComparison":113,"./5/CheckObjectCoercible":114,"./5/DateFromTime":115,"./5/Day":116,"./5/DayFromYear":117,"./5/DayWithinYear":118,"./5/DaysInYear":119,"./5/FromPropertyDescriptor":120,"./5/HourFromTime":121,"./5/InLeapYear":122,"./5/IsAccessorDescriptor":123,"./5/IsCallable":124,"./5/IsDataDescriptor":125,"./5/IsGenericDescriptor":126,"./5/IsPropertyDescriptor":127,"./5/MakeDate":128,"./5/MakeDay":129,"./5/MakeTime":130,"./5/MinFromTime":131,"./5/MonthFromTime":132,"./5/SameValue":133,"./5/SecFromTime":134,"./5/StrictEqualityComparison":135,"./5/TimeClip":136,"./5/TimeFromYear":137,"./5/TimeWithinDay":138,"./5/ToBoolean":139,"./5/ToInt32":140,"./5/ToInteger":141,"./5/ToNumber":142,"./5/ToObject":143,"./5/ToPrimitive":144,"./5/ToPropertyDescriptor":145,"./5/ToString":146,"./5/ToUint16":147,"./5/ToUint32":148,"./5/Type":149,"./5/WeekDay":150,"./5/YearFromTime":151,"./5/abs":152,"./5/floor":153,"./5/modulo":154,"./5/msFromTime":155}],157:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');
var $SyntaxError = GetIntrinsic('%SyntaxError%');

var has = require('has');

var predicates = {
	// https://262.ecma-international.org/6.0/#sec-property-descriptor-specification-type
	'Property Descriptor': function isPropertyDescriptor(Type, Desc) {
		if (Type(Desc) !== 'Object') {
			return false;
		}
		var allowed = {
			'[[Configurable]]': true,
			'[[Enumerable]]': true,
			'[[Get]]': true,
			'[[Set]]': true,
			'[[Value]]': true,
			'[[Writable]]': true
		};

		for (var key in Desc) { // eslint-disable-line
			if (has(Desc, key) && !allowed[key]) {
				return false;
			}
		}

		var isData = has(Desc, '[[Value]]');
		var IsAccessor = has(Desc, '[[Get]]') || has(Desc, '[[Set]]');
		if (isData && IsAccessor) {
			throw new $TypeError('Property Descriptors may not be both accessor and data descriptors');
		}
		return true;
	}
};

module.exports = function assertRecord(Type, recordType, argumentName, value) {
	var predicate = predicates[recordType];
	if (typeof predicate !== 'function') {
		throw new $SyntaxError('unknown record type: ' + recordType);
	}
	if (!predicate(Type, value)) {
		throw new $TypeError(argumentName + ' must be a ' + recordType);
	}
};

},{"get-intrinsic":170,"has":173}],158:[function(require,module,exports){
'use strict';

var $isNaN = Number.isNaN || function (a) { return a !== a; };

module.exports = Number.isFinite || function (x) { return typeof x === 'number' && !$isNaN(x) && x !== Infinity && x !== -Infinity; };

},{}],159:[function(require,module,exports){
'use strict';

module.exports = Number.isNaN || function isNaN(a) {
	return a !== a;
};

},{}],160:[function(require,module,exports){
'use strict';

var $strSlice = require('call-bind/callBound')('String.prototype.slice');

module.exports = function isPrefixOf(prefix, string) {
	if (prefix === string) {
		return true;
	}
	if (prefix.length > string.length) {
		return false;
	}
	return $strSlice(string, 0, prefix.length) === prefix;
};

},{"call-bind/callBound":105}],161:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var has = require('has');
var $TypeError = GetIntrinsic('%TypeError%');

module.exports = function IsPropertyDescriptor(ES, Desc) {
	if (ES.Type(Desc) !== 'Object') {
		return false;
	}
	var allowed = {
		'[[Configurable]]': true,
		'[[Enumerable]]': true,
		'[[Get]]': true,
		'[[Set]]': true,
		'[[Value]]': true,
		'[[Writable]]': true
	};

	for (var key in Desc) { // eslint-disable-line no-restricted-syntax
		if (has(Desc, key) && !allowed[key]) {
			return false;
		}
	}

	if (ES.IsDataDescriptor(Desc) && ES.IsAccessorDescriptor(Desc)) {
		throw new $TypeError('Property Descriptors may not be both accessor and data descriptors');
	}
	return true;
};

},{"get-intrinsic":170,"has":173}],162:[function(require,module,exports){
'use strict';

var $floor = Math.floor;

module.exports = function mod(number, modulo) {
	var remain = number % modulo;
	return $floor(remain >= 0 ? remain : remain + modulo);
};

},{}],163:[function(require,module,exports){
'use strict';

module.exports = function sign(number) {
	return number >= 0 ? 1 : -1;
};

},{}],164:[function(require,module,exports){
'use strict';

var HoursPerDay = 24;
var MinutesPerHour = 60;
var SecondsPerMinute = 60;
var msPerSecond = 1e3;
var msPerMinute = msPerSecond * SecondsPerMinute;
var msPerHour = msPerMinute * MinutesPerHour;
var msPerDay = 86400000;

module.exports = {
	HoursPerDay: HoursPerDay,
	MinutesPerHour: MinutesPerHour,
	SecondsPerMinute: SecondsPerMinute,
	msPerSecond: msPerSecond,
	msPerMinute: msPerMinute,
	msPerHour: msPerHour,
	msPerDay: msPerDay
};

},{}],165:[function(require,module,exports){
'use strict';

var toStr = Object.prototype.toString;

var isPrimitive = require('./helpers/isPrimitive');

var isCallable = require('is-callable');

// http://ecma-international.org/ecma-262/5.1/#sec-8.12.8
var ES5internalSlots = {
	'[[DefaultValue]]': function (O) {
		var actualHint;
		if (arguments.length > 1) {
			actualHint = arguments[1];
		} else {
			actualHint = toStr.call(O) === '[object Date]' ? String : Number;
		}

		if (actualHint === String || actualHint === Number) {
			var methods = actualHint === String ? ['toString', 'valueOf'] : ['valueOf', 'toString'];
			var value, i;
			for (i = 0; i < methods.length; ++i) {
				if (isCallable(O[methods[i]])) {
					value = O[methods[i]]();
					if (isPrimitive(value)) {
						return value;
					}
				}
			}
			throw new TypeError('No default value');
		}
		throw new TypeError('invalid [[DefaultValue]] hint supplied');
	}
};

// http://ecma-international.org/ecma-262/5.1/#sec-9.1
module.exports = function ToPrimitive(input) {
	if (isPrimitive(input)) {
		return input;
	}
	if (arguments.length > 1) {
		return ES5internalSlots['[[DefaultValue]]'](input, arguments[1]);
	}
	return ES5internalSlots['[[DefaultValue]]'](input);
};

},{"./helpers/isPrimitive":166,"is-callable":176}],166:[function(require,module,exports){
'use strict';

module.exports = function isPrimitive(value) {
	return value === null || (typeof value !== 'function' && typeof value !== 'object');
};

},{}],167:[function(require,module,exports){
'use strict'

var mergeDescriptors = require('merge-descriptors')
var isObject = require('is-object')
var hasOwnProperty = Object.prototype.hasOwnProperty

function fill (destination, source, merge) {
  if (destination && (isObject(source) || isFunction(source))) {
    merge(destination, source, false)
    if (isFunction(destination) && isFunction(source) && source.prototype) {
      merge(destination.prototype, source.prototype, false)
    }
  }
  return destination
}

exports = module.exports = function fillKeys (destination, source) {
  return fill(destination, source, mergeDescriptors)
}

exports.es3 = function fillKeysEs3 (destination, source) {
  return fill(destination, source, es3Merge)
}

function es3Merge (destination, source) {
  for (var key in source) {
    if (!hasOwnProperty.call(destination, key)) {
      destination[key] = source[key]
    }
  }
  return destination
}

function isFunction (value) {
  return typeof value === 'function'
}

},{"is-object":177,"merge-descriptors":178}],168:[function(require,module,exports){
'use strict';

/* eslint no-invalid-this: 1 */

var ERROR_MESSAGE = 'Function.prototype.bind called on incompatible ';
var slice = Array.prototype.slice;
var toStr = Object.prototype.toString;
var funcType = '[object Function]';

module.exports = function bind(that) {
    var target = this;
    if (typeof target !== 'function' || toStr.call(target) !== funcType) {
        throw new TypeError(ERROR_MESSAGE + target);
    }
    var args = slice.call(arguments, 1);

    var bound;
    var binder = function () {
        if (this instanceof bound) {
            var result = target.apply(
                this,
                args.concat(slice.call(arguments))
            );
            if (Object(result) === result) {
                return result;
            }
            return this;
        } else {
            return target.apply(
                that,
                args.concat(slice.call(arguments))
            );
        }
    };

    var boundLength = Math.max(0, target.length - args.length);
    var boundArgs = [];
    for (var i = 0; i < boundLength; i++) {
        boundArgs.push('$' + i);
    }

    bound = Function('binder', 'return function (' + boundArgs.join(',') + '){ return binder.apply(this,arguments); }')(binder);

    if (target.prototype) {
        var Empty = function Empty() {};
        Empty.prototype = target.prototype;
        bound.prototype = new Empty();
        Empty.prototype = null;
    }

    return bound;
};

},{}],169:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

module.exports = Function.prototype.bind || implementation;

},{"./implementation":168}],170:[function(require,module,exports){
'use strict';

var undefined;

var $SyntaxError = SyntaxError;
var $Function = Function;
var $TypeError = TypeError;

// eslint-disable-next-line consistent-return
var getEvalledConstructor = function (expressionSyntax) {
	try {
		return $Function('"use strict"; return (' + expressionSyntax + ').constructor;')();
	} catch (e) {}
};

var $gOPD = Object.getOwnPropertyDescriptor;
if ($gOPD) {
	try {
		$gOPD({}, '');
	} catch (e) {
		$gOPD = null; // this is IE 8, which has a broken gOPD
	}
}

var throwTypeError = function () {
	throw new $TypeError();
};
var ThrowTypeError = $gOPD
	? (function () {
		try {
			// eslint-disable-next-line no-unused-expressions, no-caller, no-restricted-properties
			arguments.callee; // IE 8 does not throw here
			return throwTypeError;
		} catch (calleeThrows) {
			try {
				// IE 8 throws on Object.getOwnPropertyDescriptor(arguments, '')
				return $gOPD(arguments, 'callee').get;
			} catch (gOPDthrows) {
				return throwTypeError;
			}
		}
	}())
	: throwTypeError;

var hasSymbols = require('has-symbols')();

var getProto = Object.getPrototypeOf || function (x) { return x.__proto__; }; // eslint-disable-line no-proto

var needsEval = {};

var TypedArray = typeof Uint8Array === 'undefined' ? undefined : getProto(Uint8Array);

var INTRINSICS = {
	'%AggregateError%': typeof AggregateError === 'undefined' ? undefined : AggregateError,
	'%Array%': Array,
	'%ArrayBuffer%': typeof ArrayBuffer === 'undefined' ? undefined : ArrayBuffer,
	'%ArrayIteratorPrototype%': hasSymbols ? getProto([][Symbol.iterator]()) : undefined,
	'%AsyncFromSyncIteratorPrototype%': undefined,
	'%AsyncFunction%': needsEval,
	'%AsyncGenerator%': needsEval,
	'%AsyncGeneratorFunction%': needsEval,
	'%AsyncIteratorPrototype%': needsEval,
	'%Atomics%': typeof Atomics === 'undefined' ? undefined : Atomics,
	'%BigInt%': typeof BigInt === 'undefined' ? undefined : BigInt,
	'%Boolean%': Boolean,
	'%DataView%': typeof DataView === 'undefined' ? undefined : DataView,
	'%Date%': Date,
	'%decodeURI%': decodeURI,
	'%decodeURIComponent%': decodeURIComponent,
	'%encodeURI%': encodeURI,
	'%encodeURIComponent%': encodeURIComponent,
	'%Error%': Error,
	'%eval%': eval, // eslint-disable-line no-eval
	'%EvalError%': EvalError,
	'%Float32Array%': typeof Float32Array === 'undefined' ? undefined : Float32Array,
	'%Float64Array%': typeof Float64Array === 'undefined' ? undefined : Float64Array,
	'%FinalizationRegistry%': typeof FinalizationRegistry === 'undefined' ? undefined : FinalizationRegistry,
	'%Function%': $Function,
	'%GeneratorFunction%': needsEval,
	'%Int8Array%': typeof Int8Array === 'undefined' ? undefined : Int8Array,
	'%Int16Array%': typeof Int16Array === 'undefined' ? undefined : Int16Array,
	'%Int32Array%': typeof Int32Array === 'undefined' ? undefined : Int32Array,
	'%isFinite%': isFinite,
	'%isNaN%': isNaN,
	'%IteratorPrototype%': hasSymbols ? getProto(getProto([][Symbol.iterator]())) : undefined,
	'%JSON%': typeof JSON === 'object' ? JSON : undefined,
	'%Map%': typeof Map === 'undefined' ? undefined : Map,
	'%MapIteratorPrototype%': typeof Map === 'undefined' || !hasSymbols ? undefined : getProto(new Map()[Symbol.iterator]()),
	'%Math%': Math,
	'%Number%': Number,
	'%Object%': Object,
	'%parseFloat%': parseFloat,
	'%parseInt%': parseInt,
	'%Promise%': typeof Promise === 'undefined' ? undefined : Promise,
	'%Proxy%': typeof Proxy === 'undefined' ? undefined : Proxy,
	'%RangeError%': RangeError,
	'%ReferenceError%': ReferenceError,
	'%Reflect%': typeof Reflect === 'undefined' ? undefined : Reflect,
	'%RegExp%': RegExp,
	'%Set%': typeof Set === 'undefined' ? undefined : Set,
	'%SetIteratorPrototype%': typeof Set === 'undefined' || !hasSymbols ? undefined : getProto(new Set()[Symbol.iterator]()),
	'%SharedArrayBuffer%': typeof SharedArrayBuffer === 'undefined' ? undefined : SharedArrayBuffer,
	'%String%': String,
	'%StringIteratorPrototype%': hasSymbols ? getProto(''[Symbol.iterator]()) : undefined,
	'%Symbol%': hasSymbols ? Symbol : undefined,
	'%SyntaxError%': $SyntaxError,
	'%ThrowTypeError%': ThrowTypeError,
	'%TypedArray%': TypedArray,
	'%TypeError%': $TypeError,
	'%Uint8Array%': typeof Uint8Array === 'undefined' ? undefined : Uint8Array,
	'%Uint8ClampedArray%': typeof Uint8ClampedArray === 'undefined' ? undefined : Uint8ClampedArray,
	'%Uint16Array%': typeof Uint16Array === 'undefined' ? undefined : Uint16Array,
	'%Uint32Array%': typeof Uint32Array === 'undefined' ? undefined : Uint32Array,
	'%URIError%': URIError,
	'%WeakMap%': typeof WeakMap === 'undefined' ? undefined : WeakMap,
	'%WeakRef%': typeof WeakRef === 'undefined' ? undefined : WeakRef,
	'%WeakSet%': typeof WeakSet === 'undefined' ? undefined : WeakSet
};

var doEval = function doEval(name) {
	var value;
	if (name === '%AsyncFunction%') {
		value = getEvalledConstructor('async function () {}');
	} else if (name === '%GeneratorFunction%') {
		value = getEvalledConstructor('function* () {}');
	} else if (name === '%AsyncGeneratorFunction%') {
		value = getEvalledConstructor('async function* () {}');
	} else if (name === '%AsyncGenerator%') {
		var fn = doEval('%AsyncGeneratorFunction%');
		if (fn) {
			value = fn.prototype;
		}
	} else if (name === '%AsyncIteratorPrototype%') {
		var gen = doEval('%AsyncGenerator%');
		if (gen) {
			value = getProto(gen.prototype);
		}
	}

	INTRINSICS[name] = value;

	return value;
};

var LEGACY_ALIASES = {
	'%ArrayBufferPrototype%': ['ArrayBuffer', 'prototype'],
	'%ArrayPrototype%': ['Array', 'prototype'],
	'%ArrayProto_entries%': ['Array', 'prototype', 'entries'],
	'%ArrayProto_forEach%': ['Array', 'prototype', 'forEach'],
	'%ArrayProto_keys%': ['Array', 'prototype', 'keys'],
	'%ArrayProto_values%': ['Array', 'prototype', 'values'],
	'%AsyncFunctionPrototype%': ['AsyncFunction', 'prototype'],
	'%AsyncGenerator%': ['AsyncGeneratorFunction', 'prototype'],
	'%AsyncGeneratorPrototype%': ['AsyncGeneratorFunction', 'prototype', 'prototype'],
	'%BooleanPrototype%': ['Boolean', 'prototype'],
	'%DataViewPrototype%': ['DataView', 'prototype'],
	'%DatePrototype%': ['Date', 'prototype'],
	'%ErrorPrototype%': ['Error', 'prototype'],
	'%EvalErrorPrototype%': ['EvalError', 'prototype'],
	'%Float32ArrayPrototype%': ['Float32Array', 'prototype'],
	'%Float64ArrayPrototype%': ['Float64Array', 'prototype'],
	'%FunctionPrototype%': ['Function', 'prototype'],
	'%Generator%': ['GeneratorFunction', 'prototype'],
	'%GeneratorPrototype%': ['GeneratorFunction', 'prototype', 'prototype'],
	'%Int8ArrayPrototype%': ['Int8Array', 'prototype'],
	'%Int16ArrayPrototype%': ['Int16Array', 'prototype'],
	'%Int32ArrayPrototype%': ['Int32Array', 'prototype'],
	'%JSONParse%': ['JSON', 'parse'],
	'%JSONStringify%': ['JSON', 'stringify'],
	'%MapPrototype%': ['Map', 'prototype'],
	'%NumberPrototype%': ['Number', 'prototype'],
	'%ObjectPrototype%': ['Object', 'prototype'],
	'%ObjProto_toString%': ['Object', 'prototype', 'toString'],
	'%ObjProto_valueOf%': ['Object', 'prototype', 'valueOf'],
	'%PromisePrototype%': ['Promise', 'prototype'],
	'%PromiseProto_then%': ['Promise', 'prototype', 'then'],
	'%Promise_all%': ['Promise', 'all'],
	'%Promise_reject%': ['Promise', 'reject'],
	'%Promise_resolve%': ['Promise', 'resolve'],
	'%RangeErrorPrototype%': ['RangeError', 'prototype'],
	'%ReferenceErrorPrototype%': ['ReferenceError', 'prototype'],
	'%RegExpPrototype%': ['RegExp', 'prototype'],
	'%SetPrototype%': ['Set', 'prototype'],
	'%SharedArrayBufferPrototype%': ['SharedArrayBuffer', 'prototype'],
	'%StringPrototype%': ['String', 'prototype'],
	'%SymbolPrototype%': ['Symbol', 'prototype'],
	'%SyntaxErrorPrototype%': ['SyntaxError', 'prototype'],
	'%TypedArrayPrototype%': ['TypedArray', 'prototype'],
	'%TypeErrorPrototype%': ['TypeError', 'prototype'],
	'%Uint8ArrayPrototype%': ['Uint8Array', 'prototype'],
	'%Uint8ClampedArrayPrototype%': ['Uint8ClampedArray', 'prototype'],
	'%Uint16ArrayPrototype%': ['Uint16Array', 'prototype'],
	'%Uint32ArrayPrototype%': ['Uint32Array', 'prototype'],
	'%URIErrorPrototype%': ['URIError', 'prototype'],
	'%WeakMapPrototype%': ['WeakMap', 'prototype'],
	'%WeakSetPrototype%': ['WeakSet', 'prototype']
};

var bind = require('function-bind');
var hasOwn = require('has');
var $concat = bind.call(Function.call, Array.prototype.concat);
var $spliceApply = bind.call(Function.apply, Array.prototype.splice);
var $replace = bind.call(Function.call, String.prototype.replace);
var $strSlice = bind.call(Function.call, String.prototype.slice);

/* adapted from https://github.com/lodash/lodash/blob/4.17.15/dist/lodash.js#L6735-L6744 */
var rePropName = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g;
var reEscapeChar = /\\(\\)?/g; /** Used to match backslashes in property paths. */
var stringToPath = function stringToPath(string) {
	var first = $strSlice(string, 0, 1);
	var last = $strSlice(string, -1);
	if (first === '%' && last !== '%') {
		throw new $SyntaxError('invalid intrinsic syntax, expected closing `%`');
	} else if (last === '%' && first !== '%') {
		throw new $SyntaxError('invalid intrinsic syntax, expected opening `%`');
	}
	var result = [];
	$replace(string, rePropName, function (match, number, quote, subString) {
		result[result.length] = quote ? $replace(subString, reEscapeChar, '$1') : number || match;
	});
	return result;
};
/* end adaptation */

var getBaseIntrinsic = function getBaseIntrinsic(name, allowMissing) {
	var intrinsicName = name;
	var alias;
	if (hasOwn(LEGACY_ALIASES, intrinsicName)) {
		alias = LEGACY_ALIASES[intrinsicName];
		intrinsicName = '%' + alias[0] + '%';
	}

	if (hasOwn(INTRINSICS, intrinsicName)) {
		var value = INTRINSICS[intrinsicName];
		if (value === needsEval) {
			value = doEval(intrinsicName);
		}
		if (typeof value === 'undefined' && !allowMissing) {
			throw new $TypeError('intrinsic ' + name + ' exists, but is not available. Please file an issue!');
		}

		return {
			alias: alias,
			name: intrinsicName,
			value: value
		};
	}

	throw new $SyntaxError('intrinsic ' + name + ' does not exist!');
};

module.exports = function GetIntrinsic(name, allowMissing) {
	if (typeof name !== 'string' || name.length === 0) {
		throw new $TypeError('intrinsic name must be a non-empty string');
	}
	if (arguments.length > 1 && typeof allowMissing !== 'boolean') {
		throw new $TypeError('"allowMissing" argument must be a boolean');
	}

	var parts = stringToPath(name);
	var intrinsicBaseName = parts.length > 0 ? parts[0] : '';

	var intrinsic = getBaseIntrinsic('%' + intrinsicBaseName + '%', allowMissing);
	var intrinsicRealName = intrinsic.name;
	var value = intrinsic.value;
	var skipFurtherCaching = false;

	var alias = intrinsic.alias;
	if (alias) {
		intrinsicBaseName = alias[0];
		$spliceApply(parts, $concat([0, 1], alias));
	}

	for (var i = 1, isOwn = true; i < parts.length; i += 1) {
		var part = parts[i];
		var first = $strSlice(part, 0, 1);
		var last = $strSlice(part, -1);
		if (
			(
				(first === '"' || first === "'" || first === '`')
				|| (last === '"' || last === "'" || last === '`')
			)
			&& first !== last
		) {
			throw new $SyntaxError('property names with quotes must have matching quotes');
		}
		if (part === 'constructor' || !isOwn) {
			skipFurtherCaching = true;
		}

		intrinsicBaseName += '.' + part;
		intrinsicRealName = '%' + intrinsicBaseName + '%';

		if (hasOwn(INTRINSICS, intrinsicRealName)) {
			value = INTRINSICS[intrinsicRealName];
		} else if (value != null) {
			if (!(part in value)) {
				if (!allowMissing) {
					throw new $TypeError('base intrinsic for ' + name + ' exists, but the property is not available.');
				}
				return void undefined;
			}
			if ($gOPD && (i + 1) >= parts.length) {
				var desc = $gOPD(value, part);
				isOwn = !!desc;

				// By convention, when a data property is converted to an accessor
				// property to emulate a data property that does not suffer from
				// the override mistake, that accessor's getter is marked with
				// an `originalValue` property. Here, when we detect this, we
				// uphold the illusion by pretending to see that original data
				// property, i.e., returning the value rather than the getter
				// itself.
				if (isOwn && 'get' in desc && !('originalValue' in desc.get)) {
					value = desc.get;
				} else {
					value = value[part];
				}
			} else {
				isOwn = hasOwn(value, part);
				value = value[part];
			}

			if (isOwn && !skipFurtherCaching) {
				INTRINSICS[intrinsicRealName] = value;
			}
		}
	}
	return value;
};

},{"function-bind":169,"has":173,"has-symbols":171}],171:[function(require,module,exports){
'use strict';

var origSymbol = typeof Symbol !== 'undefined' && Symbol;
var hasSymbolSham = require('./shams');

module.exports = function hasNativeSymbols() {
	if (typeof origSymbol !== 'function') { return false; }
	if (typeof Symbol !== 'function') { return false; }
	if (typeof origSymbol('foo') !== 'symbol') { return false; }
	if (typeof Symbol('bar') !== 'symbol') { return false; }

	return hasSymbolSham();
};

},{"./shams":172}],172:[function(require,module,exports){
'use strict';

/* eslint complexity: [2, 18], max-statements: [2, 33] */
module.exports = function hasSymbols() {
	if (typeof Symbol !== 'function' || typeof Object.getOwnPropertySymbols !== 'function') { return false; }
	if (typeof Symbol.iterator === 'symbol') { return true; }

	var obj = {};
	var sym = Symbol('test');
	var symObj = Object(sym);
	if (typeof sym === 'string') { return false; }

	if (Object.prototype.toString.call(sym) !== '[object Symbol]') { return false; }
	if (Object.prototype.toString.call(symObj) !== '[object Symbol]') { return false; }

	// temp disabled per https://github.com/ljharb/object.assign/issues/17
	// if (sym instanceof Symbol) { return false; }
	// temp disabled per https://github.com/WebReflection/get-own-property-symbols/issues/4
	// if (!(symObj instanceof Symbol)) { return false; }

	// if (typeof Symbol.prototype.toString !== 'function') { return false; }
	// if (String(sym) !== Symbol.prototype.toString.call(sym)) { return false; }

	var symVal = 42;
	obj[sym] = symVal;
	for (sym in obj) { return false; } // eslint-disable-line no-restricted-syntax, no-unreachable-loop
	if (typeof Object.keys === 'function' && Object.keys(obj).length !== 0) { return false; }

	if (typeof Object.getOwnPropertyNames === 'function' && Object.getOwnPropertyNames(obj).length !== 0) { return false; }

	var syms = Object.getOwnPropertySymbols(obj);
	if (syms.length !== 1 || syms[0] !== sym) { return false; }

	if (!Object.prototype.propertyIsEnumerable.call(obj, sym)) { return false; }

	if (typeof Object.getOwnPropertyDescriptor === 'function') {
		var descriptor = Object.getOwnPropertyDescriptor(obj, sym);
		if (descriptor.value !== symVal || descriptor.enumerable !== true) { return false; }
	}

	return true;
};

},{}],173:[function(require,module,exports){
'use strict';

var bind = require('function-bind');

module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);

},{"function-bind":169}],174:[function(require,module,exports){
/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = (e * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = (m * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = ((value * c) - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}

},{}],175:[function(require,module,exports){
if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    if (superCtor) {
      ctor.super_ = superCtor
      ctor.prototype = Object.create(superCtor.prototype, {
        constructor: {
          value: ctor,
          enumerable: false,
          writable: true,
          configurable: true
        }
      })
    }
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    if (superCtor) {
      ctor.super_ = superCtor
      var TempCtor = function () {}
      TempCtor.prototype = superCtor.prototype
      ctor.prototype = new TempCtor()
      ctor.prototype.constructor = ctor
    }
  }
}

},{}],176:[function(require,module,exports){
'use strict';

var fnToStr = Function.prototype.toString;
var reflectApply = typeof Reflect === 'object' && Reflect !== null && Reflect.apply;
var badArrayLike;
var isCallableMarker;
if (typeof reflectApply === 'function' && typeof Object.defineProperty === 'function') {
	try {
		badArrayLike = Object.defineProperty({}, 'length', {
			get: function () {
				throw isCallableMarker;
			}
		});
		isCallableMarker = {};
		// eslint-disable-next-line no-throw-literal
		reflectApply(function () { throw 42; }, null, badArrayLike);
	} catch (_) {
		if (_ !== isCallableMarker) {
			reflectApply = null;
		}
	}
} else {
	reflectApply = null;
}

var constructorRegex = /^\s*class\b/;
var isES6ClassFn = function isES6ClassFunction(value) {
	try {
		var fnStr = fnToStr.call(value);
		return constructorRegex.test(fnStr);
	} catch (e) {
		return false; // not a function
	}
};

var tryFunctionObject = function tryFunctionToStr(value) {
	try {
		if (isES6ClassFn(value)) { return false; }
		fnToStr.call(value);
		return true;
	} catch (e) {
		return false;
	}
};
var toStr = Object.prototype.toString;
var fnClass = '[object Function]';
var genClass = '[object GeneratorFunction]';
var hasToStringTag = typeof Symbol === 'function' && !!Symbol.toStringTag; // better: use `has-tostringtag`
/* globals document: false */
var documentDotAll = typeof document === 'object' && typeof document.all === 'undefined' && document.all !== undefined ? document.all : {};

module.exports = reflectApply
	? function isCallable(value) {
		if (value === documentDotAll) { return true; }
		if (!value) { return false; }
		if (typeof value !== 'function' && typeof value !== 'object') { return false; }
		if (typeof value === 'function' && !value.prototype) { return true; }
		try {
			reflectApply(value, null, badArrayLike);
		} catch (e) {
			if (e !== isCallableMarker) { return false; }
		}
		return !isES6ClassFn(value);
	}
	: function isCallable(value) {
		if (value === documentDotAll) { return true; }
		if (!value) { return false; }
		if (typeof value !== 'function' && typeof value !== 'object') { return false; }
		if (typeof value === 'function' && !value.prototype) { return true; }
		if (hasToStringTag) { return tryFunctionObject(value); }
		if (isES6ClassFn(value)) { return false; }
		var strClass = toStr.call(value);
		return strClass === fnClass || strClass === genClass;
	};

},{}],177:[function(require,module,exports){
'use strict';

module.exports = function isObject(x) {
	return typeof x === 'object' && x !== null;
};

},{}],178:[function(require,module,exports){
/*!
 * merge-descriptors
 * Copyright(c) 2014 Jonathan Ong
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */

'use strict'

/**
 * Module exports.
 * @public
 */

module.exports = merge

/**
 * Module variables.
 * @private
 */

var hasOwnProperty = Object.prototype.hasOwnProperty

/**
 * Merge the property descriptors of `src` into `dest`
 *
 * @param {object} dest Object to add descriptors to
 * @param {object} src Object to clone descriptors from
 * @param {boolean} [redefine=true] Redefine `dest` properties with `src` properties
 * @returns {object} Reference to dest
 * @public
 */

function merge(dest, src, redefine) {
  if (!dest) {
    throw new TypeError('argument dest is required')
  }

  if (!src) {
    throw new TypeError('argument src is required')
  }

  if (redefine === undefined) {
    // Default to true
    redefine = true
  }

  Object.getOwnPropertyNames(src).forEach(function forEachOwnPropertyName(name) {
    if (!redefine && hasOwnProperty.call(dest, name)) {
      // Skip desriptor
      return
    }

    // Copy descriptor
    var descriptor = Object.getOwnPropertyDescriptor(src, name)
    Object.defineProperty(dest, name, descriptor)
  })

  return dest
}

},{}],179:[function(require,module,exports){
'use strict'

module.exports = function createNotFoundError (path) {
  var err = new Error('Cannot find module \'' + path + '\'')
  err.code = 'MODULE_NOT_FOUND'
  return err
}

},{}],180:[function(require,module,exports){
'use strict';

var keysShim;
if (!Object.keys) {
	// modified from https://github.com/es-shims/es5-shim
	var has = Object.prototype.hasOwnProperty;
	var toStr = Object.prototype.toString;
	var isArgs = require('./isArguments'); // eslint-disable-line global-require
	var isEnumerable = Object.prototype.propertyIsEnumerable;
	var hasDontEnumBug = !isEnumerable.call({ toString: null }, 'toString');
	var hasProtoEnumBug = isEnumerable.call(function () {}, 'prototype');
	var dontEnums = [
		'toString',
		'toLocaleString',
		'valueOf',
		'hasOwnProperty',
		'isPrototypeOf',
		'propertyIsEnumerable',
		'constructor'
	];
	var equalsConstructorPrototype = function (o) {
		var ctor = o.constructor;
		return ctor && ctor.prototype === o;
	};
	var excludedKeys = {
		$applicationCache: true,
		$console: true,
		$external: true,
		$frame: true,
		$frameElement: true,
		$frames: true,
		$innerHeight: true,
		$innerWidth: true,
		$onmozfullscreenchange: true,
		$onmozfullscreenerror: true,
		$outerHeight: true,
		$outerWidth: true,
		$pageXOffset: true,
		$pageYOffset: true,
		$parent: true,
		$scrollLeft: true,
		$scrollTop: true,
		$scrollX: true,
		$scrollY: true,
		$self: true,
		$webkitIndexedDB: true,
		$webkitStorageInfo: true,
		$window: true
	};
	var hasAutomationEqualityBug = (function () {
		/* global window */
		if (typeof window === 'undefined') { return false; }
		for (var k in window) {
			try {
				if (!excludedKeys['$' + k] && has.call(window, k) && window[k] !== null && typeof window[k] === 'object') {
					try {
						equalsConstructorPrototype(window[k]);
					} catch (e) {
						return true;
					}
				}
			} catch (e) {
				return true;
			}
		}
		return false;
	}());
	var equalsConstructorPrototypeIfNotBuggy = function (o) {
		/* global window */
		if (typeof window === 'undefined' || !hasAutomationEqualityBug) {
			return equalsConstructorPrototype(o);
		}
		try {
			return equalsConstructorPrototype(o);
		} catch (e) {
			return false;
		}
	};

	keysShim = function keys(object) {
		var isObject = object !== null && typeof object === 'object';
		var isFunction = toStr.call(object) === '[object Function]';
		var isArguments = isArgs(object);
		var isString = isObject && toStr.call(object) === '[object String]';
		var theKeys = [];

		if (!isObject && !isFunction && !isArguments) {
			throw new TypeError('Object.keys called on a non-object');
		}

		var skipProto = hasProtoEnumBug && isFunction;
		if (isString && object.length > 0 && !has.call(object, 0)) {
			for (var i = 0; i < object.length; ++i) {
				theKeys.push(String(i));
			}
		}

		if (isArguments && object.length > 0) {
			for (var j = 0; j < object.length; ++j) {
				theKeys.push(String(j));
			}
		} else {
			for (var name in object) {
				if (!(skipProto && name === 'prototype') && has.call(object, name)) {
					theKeys.push(String(name));
				}
			}
		}

		if (hasDontEnumBug) {
			var skipConstructor = equalsConstructorPrototypeIfNotBuggy(object);

			for (var k = 0; k < dontEnums.length; ++k) {
				if (!(skipConstructor && dontEnums[k] === 'constructor') && has.call(object, dontEnums[k])) {
					theKeys.push(dontEnums[k]);
				}
			}
		}
		return theKeys;
	};
}
module.exports = keysShim;

},{"./isArguments":182}],181:[function(require,module,exports){
'use strict';

var slice = Array.prototype.slice;
var isArgs = require('./isArguments');

var origKeys = Object.keys;
var keysShim = origKeys ? function keys(o) { return origKeys(o); } : require('./implementation');

var originalKeys = Object.keys;

keysShim.shim = function shimObjectKeys() {
	if (Object.keys) {
		var keysWorksWithArguments = (function () {
			// Safari 5.0 bug
			var args = Object.keys(arguments);
			return args && args.length === arguments.length;
		}(1, 2));
		if (!keysWorksWithArguments) {
			Object.keys = function keys(object) { // eslint-disable-line func-name-matching
				if (isArgs(object)) {
					return originalKeys(slice.call(object));
				}
				return originalKeys(object);
			};
		}
	} else {
		Object.keys = keysShim;
	}
	return Object.keys || keysShim;
};

module.exports = keysShim;

},{"./implementation":180,"./isArguments":182}],182:[function(require,module,exports){
'use strict';

var toStr = Object.prototype.toString;

module.exports = function isArguments(value) {
	var str = toStr.call(value);
	var isArgs = str === '[object Arguments]';
	if (!isArgs) {
		isArgs = str !== '[object Array]' &&
			value !== null &&
			typeof value === 'object' &&
			typeof value.length === 'number' &&
			value.length >= 0 &&
			toStr.call(value.callee) === '[object Function]';
	}
	return isArgs;
};

},{}],183:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],184:[function(require,module,exports){
'use strict';

var fillMissingKeys = require('fill-keys');
var moduleNotFoundError = require('module-not-found-error');

function ProxyquireifyError(msg) {
  this.name = 'ProxyquireifyError';
  Error.captureStackTrace(this, ProxyquireifyError);
  this.message = msg || 'An error occurred inside proxyquireify.';
}

function validateArguments(request, stubs) {
  var msg = (function getMessage() {
    if (!request)
      return 'Missing argument: "request". Need it to resolve desired module.';

    if (!stubs)
      return 'Missing argument: "stubs". If no stubbing is needed, use regular require instead.';

    if (typeof request != 'string')
      return 'Invalid argument: "request". Needs to be a requirable string that is the module to load.';

    if (typeof stubs != 'object')
      return 'Invalid argument: "stubs". Needs to be an object containing overrides e.g., {"path": { extname: function () { ... } } }.';
  })();

  if (msg) throw new ProxyquireifyError(msg);
}

var stubs;

function stub(stubs_) {
  stubs = stubs_;
  // This cache is used by the prelude as an alternative to the regular cache.
  // It is not read or written here, except to set it to an empty object when
  // adding stubs and to reset it to null when clearing stubs.
  module.exports._cache = {};
}

function reset() {
  stubs = undefined;
  module.exports._cache = null;
}

var proxyquire = module.exports = function (require_) {
  if (typeof require_ != 'function')
    throw new ProxyquireifyError(
        'It seems like you didn\'t initialize proxyquireify with the require in your test.\n'
      + 'Make sure to correct this, i.e.: "var proxyquire = require(\'proxyquireify\')(require);"'
    );

  reset();

  return function(request, stubs) {

    validateArguments(request, stubs);

    // set the stubs and require dependency
    // when stub require is invoked by the module under test it will find the stubs here
    stub(stubs);
    var dep = require_(request);
    reset();

    return dep;
  };
};

// Start with the default cache
proxyquire._cache = null;

proxyquire._proxy = function (require_, request) {
  function original() {
    return require_(request);
  }

  if (!stubs || !stubs.hasOwnProperty(request)) return original();

  var stub = stubs[request];

  if (stub === null) throw moduleNotFoundError(request)

  var stubWideNoCallThru = Boolean(stubs['@noCallThru']) && (stub == null || stub['@noCallThru'] !== false);
  var noCallThru = stubWideNoCallThru || (stub != null && Boolean(stub['@noCallThru']));
  return noCallThru ? stub : fillMissingKeys(stub, original());
};

if (require.cache) {
  // only used during build, so prevent browserify from including it
  var replacePreludePath = './lib/replace-prelude';
  var replacePrelude = require(replacePreludePath);
  proxyquire.browserify = replacePrelude.browserify;
  proxyquire.plugin = replacePrelude.plugin;
}

},{"fill-keys":167,"module-not-found-error":179}],185:[function(require,module,exports){
(function (process,setImmediate){(function (){
var through = require('through');
var nextTick = typeof setImmediate !== 'undefined'
    ? setImmediate
    : process.nextTick
;

module.exports = function (write, end) {
    var tr = through(write, end);
    tr.pause();
    var resume = tr.resume;
    var pause = tr.pause;
    var paused = false;
    
    tr.pause = function () {
        paused = true;
        return pause.apply(this, arguments);
    };
    
    tr.resume = function () {
        paused = false;
        return resume.apply(this, arguments);
    };
    
    nextTick(function () {
        if (!paused) tr.resume();
    });
    
    return tr;
};

}).call(this)}).call(this,require('_process'),require("timers").setImmediate)
},{"_process":183,"through":198,"timers":199}],186:[function(require,module,exports){
/* eslint-disable node/no-deprecated-api */
var buffer = require('buffer')
var Buffer = buffer.Buffer

// alternative to using Object.keys for old browsers
function copyProps (src, dst) {
  for (var key in src) {
    dst[key] = src[key]
  }
}
if (Buffer.from && Buffer.alloc && Buffer.allocUnsafe && Buffer.allocUnsafeSlow) {
  module.exports = buffer
} else {
  // Copy properties from require('buffer')
  copyProps(buffer, exports)
  exports.Buffer = SafeBuffer
}

function SafeBuffer (arg, encodingOrOffset, length) {
  return Buffer(arg, encodingOrOffset, length)
}

// Copy static methods from Buffer
copyProps(Buffer, SafeBuffer)

SafeBuffer.from = function (arg, encodingOrOffset, length) {
  if (typeof arg === 'number') {
    throw new TypeError('Argument must not be a number')
  }
  return Buffer(arg, encodingOrOffset, length)
}

SafeBuffer.alloc = function (size, fill, encoding) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number')
  }
  var buf = Buffer(size)
  if (fill !== undefined) {
    if (typeof encoding === 'string') {
      buf.fill(fill, encoding)
    } else {
      buf.fill(fill)
    }
  } else {
    buf.fill(0)
  }
  return buf
}

SafeBuffer.allocUnsafe = function (size) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number')
  }
  return Buffer(size)
}

SafeBuffer.allocUnsafeSlow = function (size) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number')
  }
  return buffer.SlowBuffer(size)
}

},{"buffer":104}],187:[function(require,module,exports){
'use strict';

var bind = require('function-bind');
var ES = require('es-abstract/es5');
var replace = bind.call(Function.call, String.prototype.replace);

var leftWhitespace = /^[\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF]+/;
var rightWhitespace = /[\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF]+$/;

module.exports = function trim() {
	var S = ES.ToString(ES.CheckObjectCoercible(this));
	return replace(replace(S, leftWhitespace, ''), rightWhitespace, '');
};

},{"es-abstract/es5":156,"function-bind":169}],188:[function(require,module,exports){
'use strict';

var bind = require('function-bind');
var define = require('define-properties');

var implementation = require('./implementation');
var getPolyfill = require('./polyfill');
var shim = require('./shim');

var boundTrim = bind.call(Function.call, getPolyfill());

define(boundTrim, {
	getPolyfill: getPolyfill,
	implementation: implementation,
	shim: shim
});

module.exports = boundTrim;

},{"./implementation":187,"./polyfill":189,"./shim":190,"define-properties":110,"function-bind":169}],189:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

var zeroWidthSpace = '\u200b';

module.exports = function getPolyfill() {
	if (String.prototype.trim && zeroWidthSpace.trim() === zeroWidthSpace) {
		return String.prototype.trim;
	}
	return implementation;
};

},{"./implementation":187}],190:[function(require,module,exports){
'use strict';

var define = require('define-properties');
var getPolyfill = require('./polyfill');

module.exports = function shimStringTrim() {
	var polyfill = getPolyfill();
	define(String.prototype, { trim: polyfill }, { trim: function () { return String.prototype.trim !== polyfill; } });
	return polyfill;
};

},{"./polyfill":189,"define-properties":110}],191:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

'use strict';

/*<replacement>*/

var Buffer = require('safe-buffer').Buffer;
/*</replacement>*/

var isEncoding = Buffer.isEncoding || function (encoding) {
  encoding = '' + encoding;
  switch (encoding && encoding.toLowerCase()) {
    case 'hex':case 'utf8':case 'utf-8':case 'ascii':case 'binary':case 'base64':case 'ucs2':case 'ucs-2':case 'utf16le':case 'utf-16le':case 'raw':
      return true;
    default:
      return false;
  }
};

function _normalizeEncoding(enc) {
  if (!enc) return 'utf8';
  var retried;
  while (true) {
    switch (enc) {
      case 'utf8':
      case 'utf-8':
        return 'utf8';
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return 'utf16le';
      case 'latin1':
      case 'binary':
        return 'latin1';
      case 'base64':
      case 'ascii':
      case 'hex':
        return enc;
      default:
        if (retried) return; // undefined
        enc = ('' + enc).toLowerCase();
        retried = true;
    }
  }
};

// Do not cache `Buffer.isEncoding` when checking encoding names as some
// modules monkey-patch it to support additional encodings
function normalizeEncoding(enc) {
  var nenc = _normalizeEncoding(enc);
  if (typeof nenc !== 'string' && (Buffer.isEncoding === isEncoding || !isEncoding(enc))) throw new Error('Unknown encoding: ' + enc);
  return nenc || enc;
}

// StringDecoder provides an interface for efficiently splitting a series of
// buffers into a series of JS strings without breaking apart multi-byte
// characters.
exports.StringDecoder = StringDecoder;
function StringDecoder(encoding) {
  this.encoding = normalizeEncoding(encoding);
  var nb;
  switch (this.encoding) {
    case 'utf16le':
      this.text = utf16Text;
      this.end = utf16End;
      nb = 4;
      break;
    case 'utf8':
      this.fillLast = utf8FillLast;
      nb = 4;
      break;
    case 'base64':
      this.text = base64Text;
      this.end = base64End;
      nb = 3;
      break;
    default:
      this.write = simpleWrite;
      this.end = simpleEnd;
      return;
  }
  this.lastNeed = 0;
  this.lastTotal = 0;
  this.lastChar = Buffer.allocUnsafe(nb);
}

StringDecoder.prototype.write = function (buf) {
  if (buf.length === 0) return '';
  var r;
  var i;
  if (this.lastNeed) {
    r = this.fillLast(buf);
    if (r === undefined) return '';
    i = this.lastNeed;
    this.lastNeed = 0;
  } else {
    i = 0;
  }
  if (i < buf.length) return r ? r + this.text(buf, i) : this.text(buf, i);
  return r || '';
};

StringDecoder.prototype.end = utf8End;

// Returns only complete characters in a Buffer
StringDecoder.prototype.text = utf8Text;

// Attempts to complete a partial non-UTF-8 character using bytes from a Buffer
StringDecoder.prototype.fillLast = function (buf) {
  if (this.lastNeed <= buf.length) {
    buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, this.lastNeed);
    return this.lastChar.toString(this.encoding, 0, this.lastTotal);
  }
  buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, buf.length);
  this.lastNeed -= buf.length;
};

// Checks the type of a UTF-8 byte, whether it's ASCII, a leading byte, or a
// continuation byte. If an invalid byte is detected, -2 is returned.
function utf8CheckByte(byte) {
  if (byte <= 0x7F) return 0;else if (byte >> 5 === 0x06) return 2;else if (byte >> 4 === 0x0E) return 3;else if (byte >> 3 === 0x1E) return 4;
  return byte >> 6 === 0x02 ? -1 : -2;
}

// Checks at most 3 bytes at the end of a Buffer in order to detect an
// incomplete multi-byte UTF-8 character. The total number of bytes (2, 3, or 4)
// needed to complete the UTF-8 character (if applicable) are returned.
function utf8CheckIncomplete(self, buf, i) {
  var j = buf.length - 1;
  if (j < i) return 0;
  var nb = utf8CheckByte(buf[j]);
  if (nb >= 0) {
    if (nb > 0) self.lastNeed = nb - 1;
    return nb;
  }
  if (--j < i || nb === -2) return 0;
  nb = utf8CheckByte(buf[j]);
  if (nb >= 0) {
    if (nb > 0) self.lastNeed = nb - 2;
    return nb;
  }
  if (--j < i || nb === -2) return 0;
  nb = utf8CheckByte(buf[j]);
  if (nb >= 0) {
    if (nb > 0) {
      if (nb === 2) nb = 0;else self.lastNeed = nb - 3;
    }
    return nb;
  }
  return 0;
}

// Validates as many continuation bytes for a multi-byte UTF-8 character as
// needed or are available. If we see a non-continuation byte where we expect
// one, we "replace" the validated continuation bytes we've seen so far with
// a single UTF-8 replacement character ('\ufffd'), to match v8's UTF-8 decoding
// behavior. The continuation byte check is included three times in the case
// where all of the continuation bytes for a character exist in the same buffer.
// It is also done this way as a slight performance increase instead of using a
// loop.
function utf8CheckExtraBytes(self, buf, p) {
  if ((buf[0] & 0xC0) !== 0x80) {
    self.lastNeed = 0;
    return '\ufffd';
  }
  if (self.lastNeed > 1 && buf.length > 1) {
    if ((buf[1] & 0xC0) !== 0x80) {
      self.lastNeed = 1;
      return '\ufffd';
    }
    if (self.lastNeed > 2 && buf.length > 2) {
      if ((buf[2] & 0xC0) !== 0x80) {
        self.lastNeed = 2;
        return '\ufffd';
      }
    }
  }
}

// Attempts to complete a multi-byte UTF-8 character using bytes from a Buffer.
function utf8FillLast(buf) {
  var p = this.lastTotal - this.lastNeed;
  var r = utf8CheckExtraBytes(this, buf, p);
  if (r !== undefined) return r;
  if (this.lastNeed <= buf.length) {
    buf.copy(this.lastChar, p, 0, this.lastNeed);
    return this.lastChar.toString(this.encoding, 0, this.lastTotal);
  }
  buf.copy(this.lastChar, p, 0, buf.length);
  this.lastNeed -= buf.length;
}

// Returns all complete UTF-8 characters in a Buffer. If the Buffer ended on a
// partial character, the character's bytes are buffered until the required
// number of bytes are available.
function utf8Text(buf, i) {
  var total = utf8CheckIncomplete(this, buf, i);
  if (!this.lastNeed) return buf.toString('utf8', i);
  this.lastTotal = total;
  var end = buf.length - (total - this.lastNeed);
  buf.copy(this.lastChar, 0, end);
  return buf.toString('utf8', i, end);
}

// For UTF-8, a replacement character is added when ending on a partial
// character.
function utf8End(buf) {
  var r = buf && buf.length ? this.write(buf) : '';
  if (this.lastNeed) return r + '\ufffd';
  return r;
}

// UTF-16LE typically needs two bytes per character, but even if we have an even
// number of bytes available, we need to check if we end on a leading/high
// surrogate. In that case, we need to wait for the next two bytes in order to
// decode the last character properly.
function utf16Text(buf, i) {
  if ((buf.length - i) % 2 === 0) {
    var r = buf.toString('utf16le', i);
    if (r) {
      var c = r.charCodeAt(r.length - 1);
      if (c >= 0xD800 && c <= 0xDBFF) {
        this.lastNeed = 2;
        this.lastTotal = 4;
        this.lastChar[0] = buf[buf.length - 2];
        this.lastChar[1] = buf[buf.length - 1];
        return r.slice(0, -1);
      }
    }
    return r;
  }
  this.lastNeed = 1;
  this.lastTotal = 2;
  this.lastChar[0] = buf[buf.length - 1];
  return buf.toString('utf16le', i, buf.length - 1);
}

// For UTF-16LE we do not explicitly append special replacement characters if we
// end on a partial character, we simply let v8 handle that.
function utf16End(buf) {
  var r = buf && buf.length ? this.write(buf) : '';
  if (this.lastNeed) {
    var end = this.lastTotal - this.lastNeed;
    return r + this.lastChar.toString('utf16le', 0, end);
  }
  return r;
}

function base64Text(buf, i) {
  var n = (buf.length - i) % 3;
  if (n === 0) return buf.toString('base64', i);
  this.lastNeed = 3 - n;
  this.lastTotal = 3;
  if (n === 1) {
    this.lastChar[0] = buf[buf.length - 1];
  } else {
    this.lastChar[0] = buf[buf.length - 2];
    this.lastChar[1] = buf[buf.length - 1];
  }
  return buf.toString('base64', i, buf.length - n);
}

function base64End(buf) {
  var r = buf && buf.length ? this.write(buf) : '';
  if (this.lastNeed) return r + this.lastChar.toString('base64', 0, 3 - this.lastNeed);
  return r;
}

// Pass bytes on through for single-byte encodings (e.g. ascii, latin1, hex)
function simpleWrite(buf) {
  return buf.toString(this.encoding);
}

function simpleEnd(buf) {
  return buf && buf.length ? this.write(buf) : '';
}
},{"safe-buffer":186}],192:[function(require,module,exports){
(function (process,setImmediate){(function (){
var defined = require('defined');
var createDefaultStream = require('./lib/default_stream');
var Test = require('./lib/test');
var createResult = require('./lib/results');
var through = require('through');

var canEmitExit = typeof process !== 'undefined' && process
    && typeof process.on === 'function' && process.browser !== true
;
var canExit = typeof process !== 'undefined' && process
    && typeof process.exit === 'function'
;

var nextTick = typeof setImmediate !== 'undefined'
    ? setImmediate
    : process.nextTick
;

exports = module.exports = (function () {
    var harness;
    var lazyLoad = function () {
        return getHarness().apply(this, arguments);
    };
    
    lazyLoad.only = function () {
        return getHarness().only.apply(this, arguments);
    };
    
    lazyLoad.createStream = function (opts) {
        if (!opts) opts = {};
        if (!harness) {
            var output = through();
            getHarness({ stream: output, objectMode: opts.objectMode });
            return output;
        }
        return harness.createStream(opts);
    };
    
    lazyLoad.onFinish = function () {
        return getHarness().onFinish.apply(this, arguments);
    };

    lazyLoad.getHarness = getHarness

    return lazyLoad

    function getHarness (opts) {
        if (!opts) opts = {};
        opts.autoclose = !canEmitExit;
        if (!harness) harness = createExitHarness(opts);
        return harness;
    }
})();

function createExitHarness (conf) {
    if (!conf) conf = {};
    var harness = createHarness({
        autoclose: defined(conf.autoclose, false)
    });
    
    var stream = harness.createStream({ objectMode: conf.objectMode });
    var es = stream.pipe(conf.stream || createDefaultStream());
    if (canEmitExit) {
        es.on('error', function (err) { harness._exitCode = 1 });
    }
    
    var ended = false;
    stream.on('end', function () { ended = true });
    
    if (conf.exit === false) return harness;
    if (!canEmitExit || !canExit) return harness;

    var inErrorState = false;

    process.on('exit', function (code) {
        // let the process exit cleanly.
        if (code !== 0) {
            return
        }

        if (!ended) {
            var only = harness._results._only;
            for (var i = 0; i < harness._tests.length; i++) {
                var t = harness._tests[i];
                if (only && t.name !== only) continue;
                t._exit();
            }
        }
        harness.close();
        process.exit(code || harness._exitCode);
    });
    
    return harness;
}

exports.createHarness = createHarness;
exports.Test = Test;
exports.test = exports; // tap compat
exports.test.skip = Test.skip;

var exitInterval;

function createHarness (conf_) {
    if (!conf_) conf_ = {};
    var results = createResult();
    if (conf_.autoclose !== false) {
        results.once('done', function () { results.close() });
    }
    
    var test = function (name, conf, cb) {
        var t = new Test(name, conf, cb);
        test._tests.push(t);
        
        (function inspectCode (st) {
            st.on('test', function sub (st_) {
                inspectCode(st_);
            });
            st.on('result', function (r) {
                if (!r.ok && typeof r !== 'string') test._exitCode = 1
            });
        })(t);
        
        results.push(t);
        return t;
    };
    test._results = results;
    
    test._tests = [];
    
    test.createStream = function (opts) {
        return results.createStream(opts);
    };

    test.onFinish = function (cb) {
        results.on('done', cb);
    };
    
    var only = false;
    test.only = function (name) {
        if (only) throw new Error('there can only be one only test');
        results.only(name);
        only = true;
        return test.apply(null, arguments);
    };
    test._exitCode = 0;
    
    test.close = function () { results.close() };
    
    return test;
}

}).call(this)}).call(this,require('_process'),require("timers").setImmediate)
},{"./lib/default_stream":193,"./lib/results":195,"./lib/test":196,"_process":183,"defined":111,"through":198,"timers":199}],193:[function(require,module,exports){
(function (process){(function (){
var through = require('through');
var fs = require('fs');

module.exports = function () {
    var line = '';
    var stream = through(write, flush);
    return stream;
    
    function write (buf) {
        for (var i = 0; i < buf.length; i++) {
            var c = typeof buf === 'string'
                ? buf.charAt(i)
                : String.fromCharCode(buf[i])
            ;
            if (c === '\n') flush();
            else line += c;
        }
    }
    
    function flush () {
        if (fs.writeSync && /^win/.test(process.platform)) {
            try { fs.writeSync(1, line + '\n'); }
            catch (e) { stream.emit('error', e) }
        }
        else {
            try { console.log(line) }
            catch (e) { stream.emit('error', e) }
        }
        line = '';
    }
};

}).call(this)}).call(this,require('_process'))
},{"_process":183,"fs":86,"through":198}],194:[function(require,module,exports){
(function (process,setImmediate){(function (){
module.exports = typeof setImmediate !== 'undefined'
    ? setImmediate
    : process.nextTick
;

}).call(this)}).call(this,require('_process'),require("timers").setImmediate)
},{"_process":183,"timers":199}],195:[function(require,module,exports){
(function (process,setImmediate){(function (){
var EventEmitter = require('events').EventEmitter;
var inherits = require('inherits');
var through = require('through');
var resumer = require('resumer');
var inspect = require('object-inspect');
var bind = require('function-bind');
var has = require('has');
var regexpTest = bind.call(Function.call, RegExp.prototype.test);
var yamlIndicators = /\:|\-|\?/;
var nextTick = typeof setImmediate !== 'undefined'
    ? setImmediate
    : process.nextTick
;

module.exports = Results;
inherits(Results, EventEmitter);

function Results () {
    if (!(this instanceof Results)) return new Results;
    this.count = 0;
    this.fail = 0;
    this.pass = 0;
    this._stream = through();
    this.tests = [];
}

Results.prototype.createStream = function (opts) {
    if (!opts) opts = {};
    var self = this;
    var output, testId = 0;
    if (opts.objectMode) {
        output = through();
        self.on('_push', function ontest (t, extra) {
            if (!extra) extra = {};
            var id = testId++;
            t.once('prerun', function () {
                var row = {
                    type: 'test',
                    name: t.name,
                    id: id
                };
                if (has(extra, 'parent')) {
                    row.parent = extra.parent;
                }
                output.queue(row);
            });
            t.on('test', function (st) {
                ontest(st, { parent: id });
            });
            t.on('result', function (res) {
                res.test = id;
                res.type = 'assert';
                output.queue(res);
            });
            t.on('end', function () {
                output.queue({ type: 'end', test: id });
            });
        });
        self.on('done', function () { output.queue(null) });
    }
    else {
        output = resumer();
        output.queue('TAP version 13\n');
        self._stream.pipe(output);
    }
    
    nextTick(function next() {
        var t;
        while (t = getNextTest(self)) {
            t.run();
            if (!t.ended) return t.once('end', function(){ nextTick(next); });
        }
        self.emit('done');
    });
    
    return output;
};

Results.prototype.push = function (t) {
    var self = this;
    self.tests.push(t);
    self._watch(t);
    self.emit('_push', t);
};

Results.prototype.only = function (name) {
    this._only = name;
};

Results.prototype._watch = function (t) {
    var self = this;
    var write = function (s) { self._stream.queue(s) };
    t.once('prerun', function () {
        write('# ' + t.name + '\n');
    });
    
    t.on('result', function (res) {
        if (typeof res === 'string') {
            write('# ' + res + '\n');
            return;
        }
        write(encodeResult(res, self.count + 1));
        self.count ++;

        if (res.ok) self.pass ++
        else self.fail ++
    });
    
    t.on('test', function (st) { self._watch(st) });
};

Results.prototype.close = function () {
    var self = this;
    if (self.closed) self._stream.emit('error', new Error('ALREADY CLOSED'));
    self.closed = true;
    var write = function (s) { self._stream.queue(s) };
    
    write('\n1..' + self.count + '\n');
    write('# tests ' + self.count + '\n');
    write('# pass  ' + self.pass + '\n');
    if (self.fail) write('# fail  ' + self.fail + '\n')
    else write('\n# ok\n')

    self._stream.queue(null);
};

function encodeResult (res, count) {
    var output = '';
    output += (res.ok ? 'ok ' : 'not ok ') + count;
    output += res.name ? ' ' + res.name.toString().replace(/\s+/g, ' ') : '';
    
    if (res.skip) output += ' # SKIP';
    else if (res.todo) output += ' # TODO';
    
    output += '\n';
    if (res.ok) return output;
    
    var outer = '  ';
    var inner = outer + '  ';
    output += outer + '---\n';
    output += inner + 'operator: ' + res.operator + '\n';
    
    if (has(res, 'expected') || has(res, 'actual')) {
        var ex = inspect(res.expected);
        var ac = inspect(res.actual);
        
        if (Math.max(ex.length, ac.length) > 65 || invalidYaml(ex) || invalidYaml(ac)) {
            output += inner + 'expected: |-\n' + inner + '  ' + ex + '\n';
            output += inner + 'actual: |-\n' + inner + '  ' + ac + '\n';
        }
        else {
            output += inner + 'expected: ' + ex + '\n';
            output += inner + 'actual:   ' + ac + '\n';
        }
    }
    if (res.at) {
        output += inner + 'at: ' + res.at + '\n';
    }
    if (res.operator === 'error' && res.actual && res.actual.stack) {
        var lines = String(res.actual.stack).split('\n');
        output += inner + 'stack: |-\n';
        for (var i = 0; i < lines.length; i++) {
            output += inner + '  ' + lines[i] + '\n';
        }
    }
    
    output += outer + '...\n';
    return output;
}

function getNextTest (results) {
    if (!results._only) {
        return results.tests.shift();
    }
    
    do {
        var t = results.tests.shift();
        if (!t) continue;
        if (results._only === t.name) {
            return t;
        }
    } while (results.tests.length !== 0)
}

function invalidYaml (str) {
    return regexpTest(yamlIndicators, str);
}

}).call(this)}).call(this,require('_process'),require("timers").setImmediate)
},{"_process":183,"events":87,"function-bind":169,"has":173,"inherits":175,"object-inspect":197,"resumer":185,"through":198,"timers":199}],196:[function(require,module,exports){
(function (__dirname){(function (){
var deepEqual = require('deep-equal');
var defined = require('defined');
var path = require('path');
var inherits = require('inherits');
var EventEmitter = require('events').EventEmitter;
var has = require('has');
var trim = require('string.prototype.trim');

var nextTick = require('./next_tick');

module.exports = Test;

inherits(Test, EventEmitter);

var getTestArgs = function (name_, opts_, cb_) {
    var name = '(anonymous)';
    var opts = {};
    var cb;

    for (var i = 0; i < arguments.length; i++) {
        var arg = arguments[i];
        var t = typeof arg;
        if (t === 'string') {
            name = arg;
        }
        else if (t === 'object') {
            opts = arg || opts;
        }
        else if (t === 'function') {
            cb = arg;
        }
    }
    return { name: name, opts: opts, cb: cb };
};

function Test (name_, opts_, cb_) {
    if (! (this instanceof Test)) {
        return new Test(name_, opts_, cb_);
    }

    var args = getTestArgs(name_, opts_, cb_);

    this.readable = true;
    this.name = args.name || '(anonymous)';
    this.assertCount = 0;
    this.pendingCount = 0;
    this._skip = args.opts.skip || false;
    this._timeout = args.opts.timeout;
    this._plan = undefined;
    this._cb = args.cb;
    this._progeny = [];
    this._ok = true;

    for (var prop in this) {
        this[prop] = (function bind(self, val) {
            if (typeof val === 'function') {
                return function bound() {
                    return val.apply(self, arguments);
                };
            }
            else return val;
        })(this, this[prop]);
    }
}

Test.prototype.run = function () {
    if (this._skip) {
        this.comment('SKIP ' + this.name);
    }
    if (!this._cb || this._skip) {
        return this._end();
    }
    if (this._timeout != null) {
        this.timeoutAfter(this._timeout);
    }
    this.emit('prerun');
    this._cb(this);
    this.emit('run');
};

Test.prototype.test = function (name, opts, cb) {
    var self = this;
    var t = new Test(name, opts, cb);
    this._progeny.push(t);
    this.pendingCount++;
    this.emit('test', t);
    t.on('prerun', function () {
        self.assertCount++;
    })
    
    if (!self._pendingAsserts()) {
        nextTick(function () {
            self._end();
        });
    }
    
    nextTick(function() {
        if (!self._plan && self.pendingCount == self._progeny.length) {
            self._end();
        }
    });
};

Test.prototype.comment = function (msg) {
    var that = this;
    trim(msg).split('\n').forEach(function (aMsg) {
        that.emit('result', trim(aMsg).replace(/^#\s*/, ''));
    });
};

Test.prototype.plan = function (n) {
    this._plan = n;
    this.emit('plan', n);
};

Test.prototype.timeoutAfter = function(ms) {
    if (!ms) throw new Error('timeoutAfter requires a timespan');
    var self = this;
    var timeout = setTimeout(function() {
        self.fail('test timed out after ' + ms + 'ms');
        self.end();
    }, ms);
    this.once('end', function() {
        clearTimeout(timeout);
    });
}

Test.prototype.end = function (err) { 
    var self = this;
    if (arguments.length >= 1 && !!err) {
        this.ifError(err);
    }
    
    if (this.calledEnd) {
        this.fail('.end() called twice');
    }
    this.calledEnd = true;
    this._end();
};

Test.prototype._end = function (err) {
    var self = this;
    if (this._progeny.length) {
        var t = this._progeny.shift();
        t.on('end', function () { self._end() });
        t.run();
        return;
    }
    
    if (!this.ended) this.emit('end');
    var pendingAsserts = this._pendingAsserts();
    if (!this._planError && this._plan !== undefined && pendingAsserts) {
        this._planError = true;
        this.fail('plan != count', {
            expected : this._plan,
            actual : this.assertCount
        });
    }
    this.ended = true;
};

Test.prototype._exit = function () {
    if (this._plan !== undefined &&
        !this._planError && this.assertCount !== this._plan) {
        this._planError = true;
        this.fail('plan != count', {
            expected : this._plan,
            actual : this.assertCount,
            exiting : true
        });
    }
    else if (!this.ended) {
        this.fail('test exited without ending', {
            exiting: true
        });
    }
};

Test.prototype._pendingAsserts = function () {
    if (this._plan === undefined) {
        return 1;
    }
    else {
        return this._plan - (this._progeny.length + this.assertCount);
    }
};

Test.prototype._assert = function assert (ok, opts) {
    var self = this;
    var extra = opts.extra || {};
    
    var res = {
        id : self.assertCount ++,
        ok : Boolean(ok),
        skip : defined(extra.skip, opts.skip),
        name : defined(extra.message, opts.message, '(unnamed assert)'),
        operator : defined(extra.operator, opts.operator)
    };
    if (has(opts, 'actual') || has(extra, 'actual')) {
        res.actual = defined(extra.actual, opts.actual);
    }
    if (has(opts, 'expected') || has(extra, 'expected')) {
        res.expected = defined(extra.expected, opts.expected);
    }
    this._ok = Boolean(this._ok && ok);
    
    if (!ok) {
        res.error = defined(extra.error, opts.error, new Error(res.name));
    }
    
    if (!ok) {
        var e = new Error('exception');
        var err = (e.stack || '').split('\n');
        var dir = path.dirname(__dirname) + '/';
        
        for (var i = 0; i < err.length; i++) {
            var m = /^[^\s]*\s*\bat\s+(.+)/.exec(err[i]);
            if (!m) {
                continue;
            }
            
            var s = m[1].split(/\s+/);
            var filem = /(\/[^:\s]+:(\d+)(?::(\d+))?)/.exec(s[1]);
            if (!filem) {
                filem = /(\/[^:\s]+:(\d+)(?::(\d+))?)/.exec(s[2]);
                
                if (!filem) {
                    filem = /(\/[^:\s]+:(\d+)(?::(\d+))?)/.exec(s[3]);

                    if (!filem) {
                        continue;
                    }
                }
            }
            
            if (filem[1].slice(0, dir.length) === dir) {
                continue;
            }
            
            res.functionName = s[0];
            res.file = filem[1];
            res.line = Number(filem[2]);
            if (filem[3]) res.column = filem[3];
            
            res.at = m[1];
            break;
        }
    }

    self.emit('result', res);
    
    var pendingAsserts = self._pendingAsserts();
    if (!pendingAsserts) {
        if (extra.exiting) {
            self._end();
        } else {
            nextTick(function () {
                self._end();
            });
        }
    }
    
    if (!self._planError && pendingAsserts < 0) {
        self._planError = true;
        self.fail('plan != count', {
            expected : self._plan,
            actual : self._plan - pendingAsserts
        });
    }
};

Test.prototype.fail = function (msg, extra) {
    this._assert(false, {
        message : msg,
        operator : 'fail',
        extra : extra
    });
};

Test.prototype.pass = function (msg, extra) {
    this._assert(true, {
        message : msg,
        operator : 'pass',
        extra : extra
    });
};

Test.prototype.skip = function (msg, extra) {
    this._assert(true, {
        message : msg,
        operator : 'skip',
        skip : true,
        extra : extra
    });
};

Test.prototype.ok
= Test.prototype['true']
= Test.prototype.assert
= function (value, msg, extra) {
    this._assert(value, {
        message : msg,
        operator : 'ok',
        expected : true,
        actual : value,
        extra : extra
    });
};

Test.prototype.notOk
= Test.prototype['false']
= Test.prototype.notok
= function (value, msg, extra) {
    this._assert(!value, {
        message : msg,
        operator : 'notOk',
        expected : false,
        actual : value,
        extra : extra
    });
};

Test.prototype.error
= Test.prototype.ifError
= Test.prototype.ifErr
= Test.prototype.iferror
= function (err, msg, extra) {
    this._assert(!err, {
        message : defined(msg, String(err)),
        operator : 'error',
        actual : err,
        extra : extra
    });
};

Test.prototype.equal
= Test.prototype.equals
= Test.prototype.isEqual
= Test.prototype.is
= Test.prototype.strictEqual
= Test.prototype.strictEquals
= function (a, b, msg, extra) {
    this._assert(a === b, {
        message : defined(msg, 'should be equal'),
        operator : 'equal',
        actual : a,
        expected : b,
        extra : extra
    });
};

Test.prototype.notEqual
= Test.prototype.notEquals
= Test.prototype.notStrictEqual
= Test.prototype.notStrictEquals
= Test.prototype.isNotEqual
= Test.prototype.isNot
= Test.prototype.not
= Test.prototype.doesNotEqual
= Test.prototype.isInequal
= function (a, b, msg, extra) {
    this._assert(a !== b, {
        message : defined(msg, 'should not be equal'),
        operator : 'notEqual',
        actual : a,
        notExpected : b,
        extra : extra
    });
};

Test.prototype.deepEqual
= Test.prototype.deepEquals
= Test.prototype.isEquivalent
= Test.prototype.same
= function (a, b, msg, extra) {
    this._assert(deepEqual(a, b, { strict: true }), {
        message : defined(msg, 'should be equivalent'),
        operator : 'deepEqual',
        actual : a,
        expected : b,
        extra : extra
    });
};

Test.prototype.deepLooseEqual
= Test.prototype.looseEqual
= Test.prototype.looseEquals
= function (a, b, msg, extra) {
    this._assert(deepEqual(a, b), {
        message : defined(msg, 'should be equivalent'),
        operator : 'deepLooseEqual',
        actual : a,
        expected : b,
        extra : extra
    });
};

Test.prototype.notDeepEqual
= Test.prototype.notEquivalent
= Test.prototype.notDeeply
= Test.prototype.notSame
= Test.prototype.isNotDeepEqual
= Test.prototype.isNotDeeply
= Test.prototype.isNotEquivalent
= Test.prototype.isInequivalent
= function (a, b, msg, extra) {
    this._assert(!deepEqual(a, b, { strict: true }), {
        message : defined(msg, 'should not be equivalent'),
        operator : 'notDeepEqual',
        actual : a,
        notExpected : b,
        extra : extra
    });
};

Test.prototype.notDeepLooseEqual
= Test.prototype.notLooseEqual
= Test.prototype.notLooseEquals
= function (a, b, msg, extra) {
    this._assert(!deepEqual(a, b), {
        message : defined(msg, 'should be equivalent'),
        operator : 'notDeepLooseEqual',
        actual : a,
        expected : b,
        extra : extra
    });
};

Test.prototype['throws'] = function (fn, expected, msg, extra) {
    if (typeof expected === 'string') {
        msg = expected;
        expected = undefined;
    }

    var caught = undefined;

    try {
        fn();
    } catch (err) {
        caught = { error : err };
        var message = err.message;
        delete err.message;
        err.message = message;
    }

    var passed = caught;

    if (expected instanceof RegExp) {
        passed = expected.test(caught && caught.error);
        expected = String(expected);
    }

    if (typeof expected === 'function' && caught) {
        passed = caught.error instanceof expected;
        caught.error = caught.error.constructor;
    }

    this._assert(typeof fn === 'function' && passed, {
        message : defined(msg, 'should throw'),
        operator : 'throws',
        actual : caught && caught.error,
        expected : expected,
        error: !passed && caught && caught.error,
        extra : extra
    });
};

Test.prototype.doesNotThrow = function (fn, expected, msg, extra) {
    if (typeof expected === 'string') {
        msg = expected;
        expected = undefined;
    }
    var caught = undefined;
    try {
        fn();
    }
    catch (err) {
        caught = { error : err };
    }
    this._assert(!caught, {
        message : defined(msg, 'should not throw'),
        operator : 'throws',
        actual : caught && caught.error,
        expected : expected,
        error : caught && caught.error,
        extra : extra
    });
};

Test.skip = function (name_, _opts, _cb) {
    var args = getTestArgs.apply(null, arguments);
    args.opts.skip = true;
    return Test(args.name, args.opts, args.cb);
};

// vim: set softtabstop=4 shiftwidth=4:


}).call(this)}).call(this,"/node_modules/tape/lib")
},{"./next_tick":194,"deep-equal":107,"defined":111,"events":87,"has":173,"inherits":175,"path":88,"string.prototype.trim":188}],197:[function(require,module,exports){
var hasMap = typeof Map === 'function' && Map.prototype;
var mapSizeDescriptor = Object.getOwnPropertyDescriptor && hasMap ? Object.getOwnPropertyDescriptor(Map.prototype, 'size') : null;
var mapSize = hasMap && mapSizeDescriptor && typeof mapSizeDescriptor.get === 'function' ? mapSizeDescriptor.get : null;
var mapForEach = hasMap && Map.prototype.forEach;
var hasSet = typeof Set === 'function' && Set.prototype;
var setSizeDescriptor = Object.getOwnPropertyDescriptor && hasSet ? Object.getOwnPropertyDescriptor(Set.prototype, 'size') : null;
var setSize = hasSet && setSizeDescriptor && typeof setSizeDescriptor.get === 'function' ? setSizeDescriptor.get : null;
var setForEach = hasSet && Set.prototype.forEach;

module.exports = function inspect_ (obj, opts, depth, seen) {
    if (!opts) opts = {};
    
    var maxDepth = opts.depth === undefined ? 5 : opts.depth;
    if (depth === undefined) depth = 0;
    if (depth >= maxDepth && maxDepth > 0
    && obj && typeof obj === 'object') {
        return '[Object]';
    }
    
    if (seen === undefined) seen = [];
    else if (indexOf(seen, obj) >= 0) {
        return '[Circular]';
    }
    
    function inspect (value, from) {
        if (from) {
            seen = seen.slice();
            seen.push(from);
        }
        return inspect_(value, opts, depth + 1, seen);
    }
    
    if (typeof obj === 'string') {
        return inspectString(obj);
    }
    else if (typeof obj === 'function') {
        var name = nameOf(obj);
        return '[Function' + (name ? ': ' + name : '') + ']';
    }
    else if (obj === null) {
        return 'null';
    }
    else if (isSymbol(obj)) {
        var symString = Symbol.prototype.toString.call(obj);
        return typeof obj === 'object' ? 'Object(' + symString + ')' : symString;
    }
    else if (isElement(obj)) {
        var s = '<' + String(obj.nodeName).toLowerCase();
        var attrs = obj.attributes || [];
        for (var i = 0; i < attrs.length; i++) {
            s += ' ' + attrs[i].name + '="' + quote(attrs[i].value) + '"';
        }
        s += '>';
        if (obj.childNodes && obj.childNodes.length) s += '...';
        s += '</' + String(obj.nodeName).toLowerCase() + '>';
        return s;
    }
    else if (isArray(obj)) {
        if (obj.length === 0) return '[]';
        var xs = Array(obj.length);
        for (var i = 0; i < obj.length; i++) {
            xs[i] = has(obj, i) ? inspect(obj[i], obj) : '';
        }
        return '[ ' + xs.join(', ') + ' ]';
    }
    else if (isError(obj)) {
        var parts = [];
        for (var key in obj) {
            if (!has(obj, key)) continue;
            
            if (/[^\w$]/.test(key)) {
                parts.push(inspect(key) + ': ' + inspect(obj[key]));
            }
            else {
                parts.push(key + ': ' + inspect(obj[key]));
            }
        }
        if (parts.length === 0) return '[' + obj + ']';
        return '{ [' + obj + '] ' + parts.join(', ') + ' }';
    }
    else if (typeof obj === 'object' && typeof obj.inspect === 'function') {
        return obj.inspect();
    }
    else if (isMap(obj)) {
        var parts = [];
        mapForEach.call(obj, function (value, key) {
            parts.push(inspect(key, obj) + ' => ' + inspect(value, obj));
        });
        return 'Map (' + mapSize.call(obj) + ') {' + parts.join(', ') + '}';
    }
    else if (isSet(obj)) {
        var parts = [];
        setForEach.call(obj, function (value ) {
            parts.push(inspect(value, obj));
        });
        return 'Set (' + setSize.call(obj) + ') {' + parts.join(', ') + '}';
    }
    else if (typeof obj === 'object' && !isDate(obj) && !isRegExp(obj)) {
        var xs = [], keys = [];
        for (var key in obj) {
            if (has(obj, key)) keys.push(key);
        }
        keys.sort();
        for (var i = 0; i < keys.length; i++) {
            var key = keys[i];
            if (/[^\w$]/.test(key)) {
                xs.push(inspect(key) + ': ' + inspect(obj[key], obj));
            }
            else xs.push(key + ': ' + inspect(obj[key], obj));
        }
        if (xs.length === 0) return '{}';
        return '{ ' + xs.join(', ') + ' }';
    }
    else return String(obj);
};

function quote (s) {
    return String(s).replace(/"/g, '&quot;');
}

function isArray (obj) { return toStr(obj) === '[object Array]' }
function isDate (obj) { return toStr(obj) === '[object Date]' }
function isRegExp (obj) { return toStr(obj) === '[object RegExp]' }
function isError (obj) { return toStr(obj) === '[object Error]' }
function isSymbol (obj) { return toStr(obj) === '[object Symbol]' }

var hasOwn = Object.prototype.hasOwnProperty || function (key) { return key in this; };
function has (obj, key) {
    return hasOwn.call(obj, key);
}

function toStr (obj) {
    return Object.prototype.toString.call(obj);
}

function nameOf (f) {
    if (f.name) return f.name;
    var m = f.toString().match(/^function\s*([\w$]+)/);
    if (m) return m[1];
}

function indexOf (xs, x) {
    if (xs.indexOf) return xs.indexOf(x);
    for (var i = 0, l = xs.length; i < l; i++) {
        if (xs[i] === x) return i;
    }
    return -1;
}

function isMap (x) {
    if (!mapSize) {
        return false;
    }
    try {
        mapSize.call(x);
        return true;
    } catch (e) {}
    return false;
}

function isSet (x) {
    if (!setSize) {
        return false;
    }
    try {
        setSize.call(x);
        return true;
    } catch (e) {}
    return false;
}

function isElement (x) {
    if (!x || typeof x !== 'object') return false;
    if (typeof HTMLElement !== 'undefined' && x instanceof HTMLElement) {
        return true;
    }
    return typeof x.nodeName === 'string'
        && typeof x.getAttribute === 'function'
    ;
}

function inspectString (str) {
    var s = str.replace(/(['\\])/g, '\\$1').replace(/[\x00-\x1f]/g, lowbyte);
    return "'" + s + "'";
    
    function lowbyte (c) {
        var n = c.charCodeAt(0);
        var x = { 8: 'b', 9: 't', 10: 'n', 12: 'f', 13: 'r' }[n];
        if (x) return '\\' + x;
        return '\\x' + (n < 0x10 ? '0' : '') + n.toString(16);
    }
}

},{}],198:[function(require,module,exports){
(function (process){(function (){
var Stream = require('stream')

// through
//
// a stream that does nothing but re-emit the input.
// useful for aggregating a series of changing but not ending streams into one stream)

exports = module.exports = through
through.through = through

//create a readable writable stream.

function through (write, end, opts) {
  write = write || function (data) { this.queue(data) }
  end = end || function () { this.queue(null) }

  var ended = false, destroyed = false, buffer = [], _ended = false
  var stream = new Stream()
  stream.readable = stream.writable = true
  stream.paused = false

//  stream.autoPause   = !(opts && opts.autoPause   === false)
  stream.autoDestroy = !(opts && opts.autoDestroy === false)

  stream.write = function (data) {
    write.call(this, data)
    return !stream.paused
  }

  function drain() {
    while(buffer.length && !stream.paused) {
      var data = buffer.shift()
      if(null === data)
        return stream.emit('end')
      else
        stream.emit('data', data)
    }
  }

  stream.queue = stream.push = function (data) {
//    console.error(ended)
    if(_ended) return stream
    if(data === null) _ended = true
    buffer.push(data)
    drain()
    return stream
  }

  //this will be registered as the first 'end' listener
  //must call destroy next tick, to make sure we're after any
  //stream piped from here.
  //this is only a problem if end is not emitted synchronously.
  //a nicer way to do this is to make sure this is the last listener for 'end'

  stream.on('end', function () {
    stream.readable = false
    if(!stream.writable && stream.autoDestroy)
      process.nextTick(function () {
        stream.destroy()
      })
  })

  function _end () {
    stream.writable = false
    end.call(stream)
    if(!stream.readable && stream.autoDestroy)
      stream.destroy()
  }

  stream.end = function (data) {
    if(ended) return
    ended = true
    if(arguments.length) stream.write(data)
    _end() // will emit or queue
    return stream
  }

  stream.destroy = function () {
    if(destroyed) return
    destroyed = true
    ended = true
    buffer.length = 0
    stream.writable = stream.readable = false
    stream.emit('close')
    return stream
  }

  stream.pause = function () {
    if(stream.paused) return
    stream.paused = true
    return stream
  }

  stream.resume = function () {
    if(stream.paused) {
      stream.paused = false
      stream.emit('resume')
    }
    drain()
    //may have become paused again,
    //as drain emits 'data'.
    if(!stream.paused)
      stream.emit('drain')
    return stream
  }
  return stream
}


}).call(this)}).call(this,require('_process'))
},{"_process":183,"stream":89}],199:[function(require,module,exports){
(function (setImmediate,clearImmediate){(function (){
var nextTick = require('process/browser.js').nextTick;
var apply = Function.prototype.apply;
var slice = Array.prototype.slice;
var immediateIds = {};
var nextImmediateId = 0;

// DOM APIs, for completeness

exports.setTimeout = function() {
  return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
};
exports.setInterval = function() {
  return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
};
exports.clearTimeout =
exports.clearInterval = function(timeout) { timeout.close(); };

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}
Timeout.prototype.unref = Timeout.prototype.ref = function() {};
Timeout.prototype.close = function() {
  this._clearFn.call(window, this._id);
};

// Does not start the time, just sets up the members needed.
exports.enroll = function(item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function(item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function(item) {
  clearTimeout(item._idleTimeoutId);

  var msecs = item._idleTimeout;
  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout)
        item._onTimeout();
    }, msecs);
  }
};

// That's not how node.js implements it but the exposed api is the same.
exports.setImmediate = typeof setImmediate === "function" ? setImmediate : function(fn) {
  var id = nextImmediateId++;
  var args = arguments.length < 2 ? false : slice.call(arguments, 1);

  immediateIds[id] = true;

  nextTick(function onNextTick() {
    if (immediateIds[id]) {
      // fn.call() is faster so we optimize for the common use-case
      // @see http://jsperf.com/call-apply-segu
      if (args) {
        fn.apply(null, args);
      } else {
        fn.call(null);
      }
      // Prevent ids from leaking
      exports.clearImmediate(id);
    }
  });

  return id;
};

exports.clearImmediate = typeof clearImmediate === "function" ? clearImmediate : function(id) {
  delete immediateIds[id];
};
}).call(this)}).call(this,require("timers").setImmediate,require("timers").clearImmediate)
},{"process/browser.js":183,"timers":199}],200:[function(require,module,exports){
(function (global){(function (){

/**
 * Module exports.
 */

module.exports = deprecate;

/**
 * Mark that a method should not be used.
 * Returns a modified function which warns once by default.
 *
 * If `localStorage.noDeprecation = true` is set, then it is a no-op.
 *
 * If `localStorage.throwDeprecation = true` is set, then deprecated functions
 * will throw an Error when invoked.
 *
 * If `localStorage.traceDeprecation = true` is set, then deprecated functions
 * will invoke `console.trace()` instead of `console.error()`.
 *
 * @param {Function} fn - the function to deprecate
 * @param {String} msg - the string to print to the console when `fn` is invoked
 * @returns {Function} a new "deprecated" version of `fn`
 * @api public
 */

function deprecate (fn, msg) {
  if (config('noDeprecation')) {
    return fn;
  }

  var warned = false;
  function deprecated() {
    if (!warned) {
      if (config('throwDeprecation')) {
        throw new Error(msg);
      } else if (config('traceDeprecation')) {
        console.trace(msg);
      } else {
        console.warn(msg);
      }
      warned = true;
    }
    return fn.apply(this, arguments);
  }

  return deprecated;
}

/**
 * Checks `localStorage` for boolean values for the given `name`.
 *
 * @param {String} name
 * @returns {Boolean}
 * @api private
 */

function config (name) {
  // accessing global.localStorage can trigger a DOMException in sandboxed iframes
  try {
    if (!global.localStorage) return false;
  } catch (_) {
    return false;
  }
  var val = global.localStorage[name];
  if (null == val) return false;
  return String(val).toLowerCase() === 'true';
}

}).call(this)}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}]},{},[45,46,47,48]);
