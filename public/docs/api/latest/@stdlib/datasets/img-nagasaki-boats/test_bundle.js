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
},{"buffer":100}],2:[function(require,module,exports){
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

},{"@stdlib/utils/native-class":85}],12:[function(require,module,exports){
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

},{"./main.js":13,"./object.js":14,"./primitive.js":15,"@stdlib/utils/define-nonenumerable-read-only-property":72}],13:[function(require,module,exports){
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

},{"./try2serialize.js":17,"@stdlib/assert/has-tostringtag-support":8,"@stdlib/utils/native-class":85}],15:[function(require,module,exports){
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

},{"@stdlib/utils/type-of":94}],23:[function(require,module,exports){
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

},{"./main.js":24,"@stdlib/assert/tools/array-function":33,"@stdlib/utils/define-nonenumerable-read-only-property":72}],24:[function(require,module,exports){
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

},{"./main.js":26,"./object.js":27,"./primitive.js":28,"@stdlib/utils/define-nonenumerable-read-only-property":72}],26:[function(require,module,exports){
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

},{"./try2valueof.js":29,"@stdlib/assert/has-tostringtag-support":8,"@stdlib/utils/native-class":85}],28:[function(require,module,exports){
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
var format = require( '@stdlib/string/format' );


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
		throw new TypeError( format( 'invalid argument. Must provide a function. Value: `%s`.', predicate ) );
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

},{"@stdlib/assert/is-array":10,"@stdlib/string/format":67}],33:[function(require,module,exports){
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

},{"buffer":100}],35:[function(require,module,exports){
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
var format = require( '@stdlib/string/format' );
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
		throw new TypeError( format( 'invalid argument. First argument must be a string. Value: `%s`.', str ) );
	}
	if ( arguments.length > 1 ) {
		if ( !isString( encoding ) ) {
			throw new TypeError( format( 'invalid argument. Second argument must be a string. Value: `%s`.', encoding ) );
		}
		return Buffer.from( str, encoding );
	}
	return Buffer.from( str, 'utf8' );
}


// EXPORTS //

module.exports = fromString;

},{"@stdlib/assert/is-string":25,"@stdlib/buffer/ctor":35,"@stdlib/string/format":67}],40:[function(require,module,exports){
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
var format = require( '@stdlib/string/format' );
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
		throw new TypeError( format( 'invalid argument. First argument must be a string. Value: `%s`.', str ) );
	}
	if ( arguments.length > 1 ) {
		if ( !isString( encoding ) ) {
			throw new TypeError( format( 'invalid argument. Second argument must be a string. Value: `%s`.', encoding ) );
		}
		return new Buffer( str, encoding ); // eslint-disable-line no-buffer-constructor
	}
	return new Buffer( str, 'utf8' ); // eslint-disable-line no-buffer-constructor
}


// EXPORTS //

module.exports = fromString;

},{"@stdlib/assert/is-string":25,"@stdlib/buffer/ctor":35,"@stdlib/string/format":67}],41:[function(require,module,exports){
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
* Returns an image of boats in a river in Nagasaki.
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

// MAIN //

var data = '/9j/4QBWRXhpZgAATU0AKgAAAAgABAEaAAUAAAABAAAAPgEbAAUAAAABAAAARgEoAAMAAAABAAIAAAITAAMAAAABAAEAAAAAAAAAAABIAAAAAQAAAEgAAAAB/+IMWElDQ19QUk9GSUxFAAEBAAAMSExpbm8CEAAAbW50clJHQiBYWVogB84AAgAJAAYAMQAAYWNzcE1TRlQAAAAASUVDIHNSR0IAAAAAAAAAAAAAAAAAAPbWAAEAAAAA0y1IUCAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAARY3BydAAAAVAAAAAzZGVzYwAAAYQAAABsd3RwdAAAAfAAAAAUYmtwdAAAAgQAAAAUclhZWgAAAhgAAAAUZ1hZWgAAAiwAAAAUYlhZWgAAAkAAAAAUZG1uZAAAAlQAAABwZG1kZAAAAsQAAACIdnVlZAAAA0wAAACGdmlldwAAA9QAAAAkbHVtaQAAA/gAAAAUbWVhcwAABAwAAAAkdGVjaAAABDAAAAAMclRSQwAABDwAAAgMZ1RSQwAABDwAAAgMYlRSQwAABDwAAAgMdGV4dAAAAABDb3B5cmlnaHQgKGMpIDE5OTggSGV3bGV0dC1QYWNrYXJkIENvbXBhbnkAAGRlc2MAAAAAAAAAEnNSR0IgSUVDNjE5NjYtMi4xAAAAAAAAAAAAAAASc1JHQiBJRUM2MTk2Ni0yLjEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFhZWiAAAAAAAADzUQABAAAAARbMWFlaIAAAAAAAAAAAAAAAAAAAAABYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9kZXNjAAAAAAAAABZJRUMgaHR0cDovL3d3dy5pZWMuY2gAAAAAAAAAAAAAABZJRUMgaHR0cDovL3d3dy5pZWMuY2gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAZGVzYwAAAAAAAAAuSUVDIDYxOTY2LTIuMSBEZWZhdWx0IFJHQiBjb2xvdXIgc3BhY2UgLSBzUkdCAAAAAAAAAAAAAAAuSUVDIDYxOTY2LTIuMSBEZWZhdWx0IFJHQiBjb2xvdXIgc3BhY2UgLSBzUkdCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGRlc2MAAAAAAAAALFJlZmVyZW5jZSBWaWV3aW5nIENvbmRpdGlvbiBpbiBJRUM2MTk2Ni0yLjEAAAAAAAAAAAAAACxSZWZlcmVuY2UgVmlld2luZyBDb25kaXRpb24gaW4gSUVDNjE5NjYtMi4xAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB2aWV3AAAAAAATpP4AFF8uABDPFAAD7cwABBMLAANcngAAAAFYWVogAAAAAABMCVYAUAAAAFcf521lYXMAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAKPAAAAAnNpZyAAAAAAQ1JUIGN1cnYAAAAAAAAEAAAAAAUACgAPABQAGQAeACMAKAAtADIANwA7AEAARQBKAE8AVABZAF4AYwBoAG0AcgB3AHwAgQCGAIsAkACVAJoAnwCkAKkArgCyALcAvADBAMYAywDQANUA2wDgAOUA6wDwAPYA+wEBAQcBDQETARkBHwElASsBMgE4AT4BRQFMAVIBWQFgAWcBbgF1AXwBgwGLAZIBmgGhAakBsQG5AcEByQHRAdkB4QHpAfIB+gIDAgwCFAIdAiYCLwI4AkECSwJUAl0CZwJxAnoChAKOApgCogKsArYCwQLLAtUC4ALrAvUDAAMLAxYDIQMtAzgDQwNPA1oDZgNyA34DigOWA6IDrgO6A8cD0wPgA+wD+QQGBBMEIAQtBDsESARVBGMEcQR+BIwEmgSoBLYExATTBOEE8AT+BQ0FHAUrBToFSQVYBWcFdwWGBZYFpgW1BcUF1QXlBfYGBgYWBicGNwZIBlkGagZ7BowGnQavBsAG0QbjBvUHBwcZBysHPQdPB2EHdAeGB5kHrAe/B9IH5Qf4CAsIHwgyCEYIWghuCIIIlgiqCL4I0gjnCPsJEAklCToJTwlkCXkJjwmkCboJzwnlCfsKEQonCj0KVApqCoEKmAquCsUK3ArzCwsLIgs5C1ELaQuAC5gLsAvIC+EL+QwSDCoMQwxcDHUMjgynDMAM2QzzDQ0NJg1ADVoNdA2ODakNww3eDfgOEw4uDkkOZA5/DpsOtg7SDu4PCQ8lD0EPXg96D5YPsw/PD+wQCRAmEEMQYRB+EJsQuRDXEPURExExEU8RbRGMEaoRyRHoEgcSJhJFEmQShBKjEsMS4xMDEyMTQxNjE4MTpBPFE+UUBhQnFEkUahSLFK0UzhTwFRIVNBVWFXgVmxW9FeAWAxYmFkkWbBaPFrIW1hb6Fx0XQRdlF4kXrhfSF/cYGxhAGGUYihivGNUY+hkgGUUZaxmRGbcZ3RoEGioaURp3Gp4axRrsGxQbOxtjG4obshvaHAIcKhxSHHscoxzMHPUdHh1HHXAdmR3DHeweFh5AHmoelB6+HukfEx8+H2kflB+/H+ogFSBBIGwgmCDEIPAhHCFIIXUhoSHOIfsiJyJVIoIiryLdIwojOCNmI5QjwiPwJB8kTSR8JKsk2iUJJTglaCWXJccl9yYnJlcmhya3JugnGCdJJ3onqyfcKA0oPyhxKKIo1CkGKTgpaymdKdAqAio1KmgqmyrPKwIrNitpK50r0SwFLDksbiyiLNctDC1BLXYtqy3hLhYuTC6CLrcu7i8kL1ovkS/HL/4wNTBsMKQw2zESMUoxgjG6MfIyKjJjMpsy1DMNM0YzfzO4M/E0KzRlNJ402DUTNU01hzXCNf02NzZyNq426TckN2A3nDfXOBQ4UDiMOMg5BTlCOX85vDn5OjY6dDqyOu87LTtrO6o76DwnPGU8pDzjPSI9YT2hPeA+ID5gPqA+4D8hP2E/oj/iQCNAZECmQOdBKUFqQaxB7kIwQnJCtUL3QzpDfUPARANER0SKRM5FEkVVRZpF3kYiRmdGq0bwRzVHe0fASAVIS0iRSNdJHUljSalJ8Eo3Sn1KxEsMS1NLmkviTCpMcky6TQJNSk2TTdxOJU5uTrdPAE9JT5NP3VAnUHFQu1EGUVBRm1HmUjFSfFLHUxNTX1OqU/ZUQlSPVNtVKFV1VcJWD1ZcVqlW91dEV5JX4FgvWH1Yy1kaWWlZuFoHWlZaplr1W0VblVvlXDVchlzWXSddeF3JXhpebF69Xw9fYV+zYAVgV2CqYPxhT2GiYfViSWKcYvBjQ2OXY+tkQGSUZOllPWWSZedmPWaSZuhnPWeTZ+loP2iWaOxpQ2maafFqSGqfavdrT2una/9sV2yvbQhtYG25bhJua27Ebx5veG/RcCtwhnDgcTpxlXHwcktypnMBc11zuHQUdHB0zHUodYV14XY+dpt2+HdWd7N4EXhueMx5KnmJeed6RnqlewR7Y3vCfCF8gXzhfUF9oX4BfmJ+wn8jf4R/5YBHgKiBCoFrgc2CMIKSgvSDV4O6hB2EgITjhUeFq4YOhnKG14c7h5+IBIhpiM6JM4mZif6KZIrKizCLlov8jGOMyo0xjZiN/45mjs6PNo+ekAaQbpDWkT+RqJIRknqS45NNk7aUIJSKlPSVX5XJljSWn5cKl3WX4JhMmLiZJJmQmfyaaJrVm0Kbr5wcnImc951kndKeQJ6unx2fi5/6oGmg2KFHobaiJqKWowajdqPmpFakx6U4pammGqaLpv2nbqfgqFKoxKk3qamqHKqPqwKrdavprFys0K1ErbiuLa6hrxavi7AAsHWw6rFgsdayS7LCszizrrQltJy1E7WKtgG2ebbwt2i34LhZuNG5SrnCuju6tbsuu6e8IbybvRW9j74KvoS+/796v/XAcMDswWfB48JfwtvDWMPUxFHEzsVLxcjGRsbDx0HHv8g9yLzJOsm5yjjKt8s2y7bMNcy1zTXNtc42zrbPN8+40DnQutE80b7SP9LB00TTxtRJ1MvVTtXR1lXW2Ndc1+DYZNjo2WzZ8dp22vvbgNwF3IrdEN2W3hzeot8p36/gNuC94UThzOJT4tvjY+Pr5HPk/OWE5g3mlucf56noMui86Ubp0Opb6uXrcOv77IbtEe2c7ijutO9A78zwWPDl8XLx//KM8xnzp/Q09ML1UPXe9m32+/eK+Bn4qPk4+cf6V/rn+3f8B/yY/Sn9uv5L/tz/bf///+EVLmh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8APD94cGFja2V0IGJlZ2luPSfvu78nIGlkPSdXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQnPz4KPHg6eG1wbWV0YSB4bWxuczp4PSdhZG9iZTpuczptZXRhLycgeDp4bXB0az0nSW1hZ2U6OkV4aWZUb29sIDkuNTMnPgo8cmRmOlJERiB4bWxuczpyZGY9J2h0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMnPgoKIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PScnCiAgeG1sbnM6SXB0YzR4bXBDb3JlPSdodHRwOi8vaXB0Yy5vcmcvc3RkL0lwdGM0eG1wQ29yZS8xLjAveG1sbnMvJz4KICA8SXB0YzR4bXBDb3JlOkNyZWF0b3JDb250YWN0SW5mbyByZGY6cGFyc2VUeXBlPSdSZXNvdXJjZSc+CiAgIDxJcHRjNHhtcENvcmU6Q2lBZHJDaXR5PkxvcyBBbmdlbGVzPC9JcHRjNHhtcENvcmU6Q2lBZHJDaXR5PgogICA8SXB0YzR4bXBDb3JlOkNpQWRyQ3RyeT5Vbml0ZWQgU3RhdGVzPC9JcHRjNHhtcENvcmU6Q2lBZHJDdHJ5PgogICA8SXB0YzR4bXBDb3JlOkNpQWRyRXh0YWRyPjEyMDAgR2V0dHkgQ2VudGVyIERyaXZlPC9JcHRjNHhtcENvcmU6Q2lBZHJFeHRhZHI+CiAgIDxJcHRjNHhtcENvcmU6Q2lBZHJQY29kZT45MDA0OTwvSXB0YzR4bXBDb3JlOkNpQWRyUGNvZGU+CiAgIDxJcHRjNHhtcENvcmU6Q2lBZHJSZWdpb24+Q2FsaWZvcm5pYTwvSXB0YzR4bXBDb3JlOkNpQWRyUmVnaW9uPgogICA8SXB0YzR4bXBDb3JlOkNpRW1haWxXb3JrPnJpZ2h0c0BnZXR0eS5lZHU8L0lwdGM0eG1wQ29yZTpDaUVtYWlsV29yaz4KICAgPElwdGM0eG1wQ29yZTpDaVVybFdvcms+d3d3LmdldHR5LmVkdTwvSXB0YzR4bXBDb3JlOkNpVXJsV29yaz4KICA8L0lwdGM0eG1wQ29yZTpDcmVhdG9yQ29udGFjdEluZm8+CiA8L3JkZjpEZXNjcmlwdGlvbj4KCiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0nJwogIHhtbG5zOklwdGM0eG1wRXh0PSdodHRwOi8vaXB0Yy5vcmcvc3RkL0lwdGM0eG1wRXh0LzIwMDgtMDItMjkvJz4KICA8SXB0YzR4bXBFeHQ6QXJ0d29ya09yT2JqZWN0PgogICA8cmRmOkJhZz4KICAgIDxyZGY6bGkgcmRmOnBhcnNlVHlwZT0nUmVzb3VyY2UnPgogICAgIDxJcHRjNHhtcEV4dDpBT0NyZWF0b3I+CiAgICAgIDxyZGY6U2VxPgogICAgICAgPHJkZjpsaT5GZWxpY2UgQmVhdG88L3JkZjpsaT4KICAgICAgPC9yZGY6U2VxPgogICAgIDwvSXB0YzR4bXBFeHQ6QU9DcmVhdG9yPgogICAgIDxJcHRjNHhtcEV4dDpBT1NvdXJjZT5UaGUgSi4gUGF1bCBHZXR0eSBNdXNldW0sIExvcyBBbmdlbGVzLCBQYXJ0aWFsIGdpZnQgZnJvbSB0aGUgV2lsc29uIENlbnRyZSBmb3IgUGhvdG9ncmFwaHk8L0lwdGM0eG1wRXh0OkFPU291cmNlPgogICAgIDxJcHRjNHhtcEV4dDpBT1NvdXJjZUludk5vPjIwMDcuMjYuMjA3LjM8L0lwdGM0eG1wRXh0OkFPU291cmNlSW52Tm8+CiAgICAgPElwdGM0eG1wRXh0OkFPVGl0bGU+CiAgICAgIDxyZGY6QWx0PgogICAgICAgPHJkZjpsaSB4bWw6bGFuZz0neC1kZWZhdWx0Jz5bQm9hdHMgaW4gUml2ZXIsIE5hZ2FzYWtpXTwvcmRmOmxpPgogICAgICA8L3JkZjpBbHQ+CiAgICAgPC9JcHRjNHhtcEV4dDpBT1RpdGxlPgogICAgPC9yZGY6bGk+CiAgIDwvcmRmOkJhZz4KICA8L0lwdGM0eG1wRXh0OkFydHdvcmtPck9iamVjdD4KIDwvcmRmOkRlc2NyaXB0aW9uPgoKIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PScnCiAgeG1sbnM6ZGM9J2h0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvJz4KICA8ZGM6Y3JlYXRvcj4KICAgPHJkZjpTZXE+CiAgICA8cmRmOmxpPlRoZSBKLiBQYXVsIEdldHR5IE11c2V1bTwvcmRmOmxpPgogICA8L3JkZjpTZXE+CiAgPC9kYzpjcmVhdG9yPgogIDxkYzpkZXNjcmlwdGlvbj4KICAgPHJkZjpBbHQ+CiAgICA8cmRmOmxpIHhtbDpsYW5nPSd4LWRlZmF1bHQnPltCb2F0cyBpbiBSaXZlciwgTmFnYXNha2ldOyBGZWxpY2UgQmVhdG8gKEVuZ2xpc2gsIGJvcm4gSXRhbHksIDE4MzIgLSAxOTA5KTsgTmFnYXNha2ksIEphcGFuOyBhYm91dCAxODY1OyBBbGJ1bWVuIHNpbHZlciBwcmludDsgMjIuOCDDlyAyOC41IGNtICg5IMOXIDExIDEvNCBpbi4pOyAyMDA3LjI2LjIwNy4zPC9yZGY6bGk+CiAgIDwvcmRmOkFsdD4KICA8L2RjOmRlc2NyaXB0aW9uPgogIDxkYzp0aXRsZT4KICAgPHJkZjpBbHQ+CiAgICA8cmRmOmxpIHhtbDpsYW5nPSd4LWRlZmF1bHQnPltCb2F0cyBpbiBSaXZlciwgTmFnYXNha2ldPC9yZGY6bGk+CiAgIDwvcmRmOkFsdD4KICA8L2RjOnRpdGxlPgogPC9yZGY6RGVzY3JpcHRpb24+CgogPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9JycKICB4bWxuczpwaG90b3Nob3A9J2h0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8nPgogIDxwaG90b3Nob3A6U291cmNlPlRoZSBKLiBQYXVsIEdldHR5IE11c2V1bSwgTG9zIEFuZ2VsZXMsIFBhcnRpYWwgZ2lmdCBmcm9tIHRoZSBXaWxzb24gQ2VudHJlIGZvciBQaG90b2dyYXBoeTwvcGhvdG9zaG9wOlNvdXJjZT4KIDwvcmRmOkRlc2NyaXB0aW9uPgoKIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PScnCiAgeG1sbnM6eG1wPSdodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvJz4KICA8eG1wOk1ldGFkYXRhRGF0ZT4yMDE2LTA0LTE0VDEyOjI5OjExPC94bXA6TWV0YWRhdGFEYXRlPgogPC9yZGY6RGVzY3JpcHRpb24+CgogPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9JycKICB4bWxuczp4bXBSaWdodHM9J2h0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9yaWdodHMvJz4KICA8eG1wUmlnaHRzOlVzYWdlVGVybXM+CiAgIDxyZGY6QWx0PgogICAgPHJkZjpsaSB4bWw6bGFuZz0neC1kZWZhdWx0Jz5odHRwOi8vd3d3LmdldHR5LmVkdS9sZWdhbC9pbWFnZV9yZXF1ZXN0LzwvcmRmOmxpPgogICA8L3JkZjpBbHQ+CiAgPC94bXBSaWdodHM6VXNhZ2VUZXJtcz4KIDwvcmRmOkRlc2NyaXB0aW9uPgo8L3JkZjpSREY+CjwveDp4bXBtZXRhPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAo8P3hwYWNrZXQgZW5kPSd3Jz8+/9sAQwACAQEBAQECAQEBAgICAgIEAwICAgIFBAQDBAYFBgYGBQYGBgcJCAYHCQcGBggLCAkKCgoKCgYICwwLCgwJCgoK/9sAQwECAgICAgIFAwMFCgcGBwoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoK/8AAEQgDMwQAAwERAAIRAQMRAf/EAB4AAAAHAQEBAQAAAAAAAAAAAAABAgMEBQYHCAkK/8QAURAAAQMCBQIFAQUGBAUCAwERAQIDEQQFAAYSITEHQQgTIlFhcQkUMoGRFSNCobHwFlLB0SQzYuHxF3IYJUOCCjSSohkmU2M1VHOjstJEZJP/xAAbAQEBAQEBAQEBAAAAAAAAAAABAAIDBAUGB//EADARAAICAgMAAgICAgICAwACAwAB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aqC9IBBUpSHRBIO/A3wvji/RbdFt/wDG51VqkIpq/pZbnglaSXG6+tb3SYHCzJ/rgfFCtkpNllbfFX1BurSXHOjFTUNPgpJpczVyQrQJJIEzyBJ98ThBekrK65Zzz/1Iqrem69Ir7UooahJRRvX158uNgyEoDiYQEmNxO2LEVsysso+onVzrLYc5PNVNbmCwuoQUtUT9SVhuUwW9RSAYmQY24nClFx+xcskO6dTL7bs8LvdmzFeqYFlCqioF3/fOPoQBId0ggSAQPy32OFJaBZOdV18rrrmN6436vXVVCnCpS339SiTzqJO/vPvONpfQNtocpW8trpqitulc+3oWPSwylYBM7bnYkxBGw74begSK6pFvqCbzbqlbZSvSG0iACORvudhh0au8AttBdLpXqdaqH2z5cNqZcA31QZKtuPyjBgFokXRp4U4AUp1tLhAU9wpQ3UsBR25EmOdsVFsbobbcr6p9xdOzCWdbzilaWkpESZmYiP7OC8jirKi622jpkrqaesCQpOp5TO4iAdhzt/vjXuTL1grKR9puvZS95vluK1uK06ioTM/yGNeFSou8xrtd4pqF630yGdFO2iqUhEJ1RGo+xO84xbSFpJmpt+eay0XIXOmU5UVQcAbYdOqeRMHkxI/84x1tGspmhvmYk3miZdq68pceEpSQBpKlTpHOkSPpucZSob+isczHeslXWormzRVDlOSwoOesJQ4ggxOxG/Pv9Marsi7VgordmCpt16C7dWHy9RW0hA1AbQDB2mCcVKjcbJi7fXZneNdRUz1StxiXTpg653UmO23bGlhGZZeCdly6VdrKKND66ZaYSFye4mCR84y9j2fprMvZ1OXXbi44Wy4pRSjzDq1r9IkK9wd98FLYMmou7TqGrmy0zUVTySAlTf4V8j8++M+5NECuuqLwplh+sabWW9LgQfSFcqJJPPucLxoorA9likRQF5m55cqFtppgqnrEAlvUtUBUjsY2wIpWX7GZblXhOXqGsqBTraVC3d1ExB2P5jA6WSyQMxdSP8B3lu2ot4TTpI/foUQsHuox32+cXVNClZp7D4ueq+TGHavKWZqxVDVNpQ6qsd82VpOxTPx2xj44yeSb6m/y3nX/AOImrcqeq3VsWx6gptTJqWwUqHMobECQOTzjMl1/1RJirZdslUdd/hCiz4u5M/eA6597tnl69okLnge3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';


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
* Returns an image of boats in a river in Nagasaki.
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

}).call(this)}).call(this,"/lib/node_modules/@stdlib/datasets/img-nagasaki-boats/lib")
},{"@stdlib/fs/read-file":49,"path":102}],44:[function(require,module,exports){
module.exports={
  "name": "@stdlib/datasets/img-nagasaki-boats",
  "version": "0.0.0",
  "description": "Image of boats in a river in Nagasaki.",
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
    "img-nagasaki-boats": "./bin/cli"
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
    "boat",
    "village",
    "river",
    "nagasaki",
    "japan"
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

}).call(this)}).call(this,"/lib/node_modules/@stdlib/datasets/img-nagasaki-boats/test/test.browser.js")
},{"./../lib/browser.js":41,"@stdlib/assert/is-buffer":19,"tape":207}],46:[function(require,module,exports){
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

}).call(this)}).call(this,"/lib/node_modules/@stdlib/datasets/img-nagasaki-boats/test/test.cli.js","/lib/node_modules/@stdlib/datasets/img-nagasaki-boats/test")
},{"./../package.json":44,"@stdlib/assert/is-browser":18,"@stdlib/assert/is-windows":31,"@stdlib/buffer/from-string":38,"@stdlib/fs/read-file":49,"@stdlib/process/exec-path":53,"child_process":99,"path":102,"tape":207}],47:[function(require,module,exports){
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

}).call(this)}).call(this,"/lib/node_modules/@stdlib/datasets/img-nagasaki-boats/test/test.js")
},{"./../lib":41,"@stdlib/assert/is-browser":18,"@stdlib/assert/is-buffer":19,"tape":207}],48:[function(require,module,exports){
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

}).call(this)}).call(this,"/lib/node_modules/@stdlib/datasets/img-nagasaki-boats/test/test.main.js")
},{"./../lib/main.js":43,"proxyquireify":199,"tape":207}],49:[function(require,module,exports){
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

},{"./main.js":50,"./sync.js":51,"@stdlib/utils/define-nonenumerable-read-only-property":72}],50:[function(require,module,exports){
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

},{"fs":99}],51:[function(require,module,exports){
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

var readfileSync = require( 'fs' ).readFileSync; // eslint-disable-line node/no-sync


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

},{"fs":99}],52:[function(require,module,exports){
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

},{"./main.js":55,"./regexp.js":56,"@stdlib/utils/define-nonenumerable-read-only-property":72}],55:[function(require,module,exports){
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
* Copyright (c) 2022 The Stdlib Authors.
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

var isNumber = require( './is_number.js' );

// NOTE: for the following, we explicitly avoid using stdlib packages in this particular package in order to avoid circular dependencies.
var abs = Math.abs; // eslint-disable-line stdlib/no-builtin-math
var lowercase = String.prototype.toLowerCase;
var uppercase = String.prototype.toUpperCase;
var replace = String.prototype.replace;


// VARIABLES //

var RE_EXP_POS_DIGITS = /e\+(\d)$/;
var RE_EXP_NEG_DIGITS = /e-(\d)$/;
var RE_ONLY_DIGITS = /^(\d+)$/;
var RE_DIGITS_BEFORE_EXP = /^(\d+)e/;
var RE_TRAILING_PERIOD_ZERO = /\.0$/;
var RE_PERIOD_ZERO_EXP = /\.0*e/;
var RE_ZERO_BEFORE_EXP = /(\..*[^0])0*e/;


// MAIN //

/**
* Formats a token object argument as a floating-point number.
*
* @private
* @param {Object} token - token object
* @throws {Error} must provide a valid floating-point number
* @returns {string} formatted token argument
*/
function formatDouble( token ) {
	var digits;
	var out;
	var f = parseFloat( token.arg );
	if ( !isFinite( f ) ) { // NOTE: We use the global `isFinite` function here instead of `@stdlib/math/base/assert/is-finite` in order to avoid circular dependencies.
		if ( !isNumber( token.arg ) ) {
			throw new Error( 'invalid floating-point number. Value: ' + out );
		}
		// Case: NaN, Infinity, or -Infinity
		f = token.arg;
	}
	switch ( token.specifier ) {
	case 'e':
	case 'E':
		out = f.toExponential( token.precision );
		break;
	case 'f':
	case 'F':
		out = f.toFixed( token.precision );
		break;
	case 'g':
	case 'G':
		if ( abs( f ) < 0.0001 ) {
			digits = token.precision;
			if ( digits > 0 ) {
				digits -= 1;
			}
			out = f.toExponential( digits );
		} else {
			out = f.toPrecision( token.precision );
		}
		if ( !token.alternate ) {
			out = replace.call( out, RE_ZERO_BEFORE_EXP, '$1e' );
			out = replace.call( out, RE_PERIOD_ZERO_EXP, 'e');
			out = replace.call( out, RE_TRAILING_PERIOD_ZERO, '' );
		}
		break;
	default:
		throw new Error( 'invalid double notation. Value: ' + token.specifier );
	}
	out = replace.call( out, RE_EXP_POS_DIGITS, 'e+0$1' );
	out = replace.call( out, RE_EXP_NEG_DIGITS, 'e-0$1' );
	if ( token.alternate ) {
		out = replace.call( out, RE_ONLY_DIGITS, '$1.' );
		out = replace.call( out, RE_DIGITS_BEFORE_EXP, '$1.e' );
	}
	if ( f >= 0 && token.sign ) {
		out = token.sign + out;
	}
	out = ( token.specifier === uppercase.call( token.specifier ) ) ?
		uppercase.call( out ) :
		lowercase.call( out );
	return out;
}


// EXPORTS //

module.exports = formatDouble;

},{"./is_number.js":60}],58:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2022 The Stdlib Authors.
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

var isNumber = require( './is_number.js' );
var zeroPad = require( './zero_pad.js' );

// NOTE: for the following, we explicitly avoid using stdlib packages in this particular package in order to avoid circular dependencies.
var lowercase = String.prototype.toLowerCase;
var uppercase = String.prototype.toUpperCase;


// MAIN //

/**
* Formats a token object argument as an integer.
*
* @private
* @param {Object} token - token object
* @throws {Error} must provide a valid integer
* @returns {string} formatted token argument
*/
function formatInteger( token ) {
	var base;
	var out;
	var i;

	switch ( token.specifier ) {
	case 'b':
		// Case: %b (binary)
		base = 2;
		break;
	case 'o':
		// Case: %o (octal)
		base = 8;
		break;
	case 'x':
	case 'X':
		// Case: %x, %X (hexadecimal)
		base = 16;
		break;
	case 'd':
	case 'i':
	case 'u':
	default:
		// Case: %d, %i, %u (decimal)
		base = 10;
		break;
	}
	out = token.arg;
	i = parseInt( out, 10 );
	if ( !isFinite( i ) ) { // NOTE: We use the global `isFinite` function here instead of `@stdlib/math/base/assert/is-finite` in order to avoid circular dependencies.
		if ( !isNumber( out ) ) {
			throw new Error( 'invalid integer. Value: ' + out );
		}
		i = 0;
	}
	if ( i < 0 && ( token.specifier === 'u' || base !== 10 ) ) {
		i = 0xffffffff + i + 1;
	}
	if ( i < 0 ) {
		out = ( -i ).toString( base );
		if ( token.precision ) {
			out = zeroPad( out, token.precision, token.padRight );
		}
		out = '-' + out;
	} else {
		out = i.toString( base );
		if ( !i && !token.precision ) {
			out = '';
		} else if ( token.precision ) {
			out = zeroPad( out, token.precision, token.padRight );
		}
		if ( token.sign ) {
			out = token.sign + out;
		}
	}
	if ( base === 16 ) {
		if ( token.alternate ) {
			out = '0x' + out;
		}
		out = ( token.specifier === uppercase.call( token.specifier ) ) ?
			uppercase.call( out ) :
			lowercase.call( out );
	}
	if ( base === 8 ) {
		if ( token.alternate && out.charAt( 0 ) !== '0' ) {
			out = '0' + out;
		}
	}
	return out;
}


// EXPORTS //

module.exports = formatInteger;

},{"./is_number.js":60,"./zero_pad.js":64}],59:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2022 The Stdlib Authors.
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
* Generate string from a token array by interpolating values.
*
* @module @stdlib/string/base/format-interpolate
*
* @example
* var formatInterpolate = require( '@stdlib/string/base/format-interpolate' );
*
* var tokens = ['Hello ', { 'specifier': 's' }, '!' ];
* var out = formatInterpolate( tokens, 'World' );
* // returns 'Hello World!'
*/

// MODULES //

var formatInterpolate = require( './main.js' );


// EXPORTS //

module.exports = formatInterpolate;

},{"./main.js":62}],60:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2022 The Stdlib Authors.
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
* Tests if a value is a number primitive.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating if a value is a number primitive
*
* @example
* var bool = isNumber( 3.14 );
* // returns true
*
* @example
* var bool = isNumber( NaN );
* // returns true
*
* @example
* var bool = isNumber( new Number( 3.14 ) );
* // returns false
*/
function isNumber( value ) {
	return ( typeof value === 'number' );  // NOTE: we inline the `isNumber.isPrimitive` function from `@stdlib/assert/is-number` in order to avoid circular dependencies.
}


// EXPORTS //

module.exports = isNumber;

},{}],61:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2022 The Stdlib Authors.
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
	return ( typeof value === 'string' ); // NOTE: we inline the `isString.isPrimitive` function from `@stdlib/assert/is-string` in order to avoid circular dependencies.
}


// EXPORTS //

module.exports = isString;

},{}],62:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2022 The Stdlib Authors.
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

var formatInteger = require( './format_integer.js' );
var isString = require( './is_string.js' );
var formatDouble = require( './format_double.js' );
var spacePad = require( './space_pad.js' );
var zeroPad = require( './zero_pad.js' );


// VARIABLES //

var fromCharCode = String.fromCharCode;
var isnan = isNaN; // NOTE: We use the global `isNaN` function here instead of `@stdlib/math/base/assert/is-nan` to avoid circular dependencies.
var isArray = Array.isArray; // NOTE: We use the global `Array.isArray` function here instead of `@stdlib/assert/is-array` to avoid circular dependencies.


// FUNCTIONS //

/**
* Initializes token object with properties of supplied format identifier object or default values if not present.
*
* @private
* @param {Object} token - format identifier object
* @returns {Object} token object
*/
function initialize( token ) {
	var out = {};
	out.specifier = token.specifier;
	out.precision = ( token.precision === void 0 ) ? 1 : token.precision;
	out.width = token.width;
	out.flags = token.flags || '';
	out.mapping = token.mapping;
	return out;
}


// MAIN //

/**
* Generates string from a token array by interpolating values.
*
* @param {Array} tokens - string parts and format identifier objects
* @param {Array} ...args - variable values
* @throws {TypeError} first argument must be an array
* @throws {Error} invalid flags
* @returns {string} formatted string
*
* @example
* var tokens = [ 'beep ', { 'specifier': 's' } ];
* var out = formatInterpolate( tokens, 'boop' );
* // returns 'beep boop'
*/
function formatInterpolate( tokens ) {
	var hasPeriod;
	var flags;
	var token;
	var flag;
	var num;
	var out;
	var pos;
	var i;
	var j;

	if ( !isArray( tokens ) ) {
		throw new TypeError( 'invalid argument. First argument must be an array. Value: `' + tokens + '`.' );
	}
	out = '';
	pos = 1;
	for ( i = 0; i < tokens.length; i++ ) {
		token = tokens[ i ];
		if ( isString( token ) ) {
			out += token;
		} else {
			hasPeriod = token.precision !== void 0;
			token = initialize( token );
			if ( !token.specifier ) {
				throw new TypeError( 'invalid argument. Token is missing `specifier` property. Index: `'+ i +'`. Value: `' + token + '`.' );
			}
			if ( token.mapping ) {
				pos = token.mapping;
			}
			flags = token.flags;
			for ( j = 0; j < flags.length; j++ ) {
				flag = flags.charAt( j );
				switch ( flag ) {
				case ' ':
					token.sign = ' ';
					break;
				case '+':
					token.sign = '+';
					break;
				case '-':
					token.padRight = true;
					token.padZeros = false;
					break;
				case '0':
					token.padZeros = flags.indexOf( '-' ) < 0; // NOTE: We use built-in `Array.prototype.indexOf` here instead of `@stdlib/assert/contains` in order to avoid circular dependencies.
					break;
				case '#':
					token.alternate = true;
					break;
				default:
					throw new Error( 'invalid flag: ' + flag );
				}
			}
			if ( token.width === '*' ) {
				token.width = parseInt( arguments[ pos ], 10 );
				pos += 1;
				if ( isnan( token.width ) ) {
					throw new TypeError( 'the argument for * width at position ' + pos + ' is not a number. Value: `' + token.width + '`.' );
				}
				if ( token.width < 0 ) {
					token.padRight = true;
					token.width = -token.width;
				}
			}
			if ( hasPeriod ) {
				if ( token.precision === '*' ) {
					token.precision = parseInt( arguments[ pos ], 10 );
					pos += 1;
					if ( isnan( token.precision ) ) {
						throw new TypeError( 'the argument for * precision at position ' + pos + ' is not a number. Value: `' + token.precision + '`.' );
					}
					if ( token.precision < 0 ) {
						token.precision = 1;
						hasPeriod = false;
					}
				}
			}
			token.arg = arguments[ pos ];
			switch ( token.specifier ) {
			case 'b':
			case 'o':
			case 'x':
			case 'X':
			case 'd':
			case 'i':
			case 'u':
				// Case: %b (binary), %o (octal), %x, %X (hexadecimal), %d, %i (decimal), %u (unsigned decimal)
				if ( hasPeriod ) {
					token.padZeros = false;
				}
				token.arg = formatInteger( token );
				break;
			case 's':
				// Case: %s (string)
				token.maxWidth = ( hasPeriod ) ? token.precision : -1;
				break;
			case 'c':
				// Case: %c (character)
				if ( !isnan( token.arg ) ) {
					num = parseInt( token.arg, 10 );
					if ( num < 0 || num > 127 ) {
						throw new Error( 'invalid character code. Value: ' + token.arg );
					}
					token.arg = ( isnan( num ) ) ?
						String( token.arg ) :
						fromCharCode( num );
				}
				break;
			case 'e':
			case 'E':
			case 'f':
			case 'F':
			case 'g':
			case 'G':
				// Case: %e, %E (scientific notation), %f, %F (decimal floating point), %g, %G (uses the shorter of %e/E or %f/F)
				if ( !hasPeriod ) {
					token.precision = 6;
				}
				token.arg = formatDouble( token );
				break;
			default:
				throw new Error( 'invalid specifier: ' + token.specifier );
			}
			// Fit argument into field width...
			if ( token.maxWidth >= 0 && token.arg.length > token.maxWidth ) {
				token.arg = token.arg.substring( 0, token.maxWidth );
			}
			if ( token.padZeros ) {
				token.arg = zeroPad( token.arg, token.width || token.precision, token.padRight ); // eslint-disable-line max-len
			} else if ( token.width ) {
				token.arg = spacePad( token.arg, token.width, token.padRight );
			}
			out += token.arg || '';
			pos += 1;
		}
	}
	return out;
}


// EXPORTS //

module.exports = formatInterpolate;

},{"./format_double.js":57,"./format_integer.js":58,"./is_string.js":61,"./space_pad.js":63,"./zero_pad.js":64}],63:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2022 The Stdlib Authors.
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

/**
* Returns `n` spaces.
*
* @private
* @param {number} n - number of spaces
* @returns {string} string of spaces
*/
function spaces( n ) {
	var out = '';
	var i;
	for ( i = 0; i < n; i++ ) {
		out += ' ';
	}
	return out;
}


// MAIN //

/**
* Pads a token with spaces to the specified width.
*
* @private
* @param {string} str - token argument
* @param {number} width - token width
* @param {boolean} [right=false] - boolean indicating whether to pad to the right
* @returns {string} padded token argument
*/
function spacePad( str, width, right ) {
	var pad = width - str.length;
	if ( pad < 0 ) {
		return str;
	}
	str = ( right ) ?
		str + spaces( pad ) :
		spaces( pad ) + str;
	return str;
}


// EXPORTS //

module.exports = spacePad;

},{}],64:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2022 The Stdlib Authors.
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

/**
* Tests if a string starts with a minus sign (`-`).
*
* @private
* @param {string} str - input string
* @returns {boolean} boolean indicating if a string starts with a minus sign (`-`)
*/
function startsWithMinus( str ) {
	return str[ 0 ] === '-';
}

/**
* Returns a string of `n` zeros.
*
* @private
* @param {number} n - number of zeros
* @returns {string} string of zeros
*/
function zeros( n ) {
	var out = '';
	var i;
	for ( i = 0; i < n; i++ ) {
		out += '0';
	}
	return out;
}


// MAIN //

/**
* Pads a token with zeros to the specified width.
*
* @private
* @param {string} str - token argument
* @param {number} width - token width
* @param {boolean} [right=false] - boolean indicating whether to pad to the right
* @returns {string} padded token argument
*/
function zeroPad( str, width, right ) {
	var negative = false;
	var pad = width - str.length;
	if ( pad < 0 ) {
		return str;
	}
	if ( startsWithMinus( str ) ) {
		negative = true;
		str = str.substr( 1 );
	}
	str = ( right ) ?
		str + zeros( pad ) :
		zeros( pad ) + str;
	if ( negative ) {
		str = '-' + str;
	}
	return str;
}


// EXPORTS //

module.exports = zeroPad;

},{}],65:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2022 The Stdlib Authors.
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
* Tokenize a string into an array of string parts and format identifier objects.
*
* @module @stdlib/string/base/format-tokenize
*
* @example
* var formatTokenize = require( '@stdlib/string/base/format-tokenize' );
*
* var str = 'Hello %s!';
* var tokens = formatTokenize( str );
* // returns [ 'Hello ', {...}, '!' ]
*/

// MODULES //

var formatTokenize = require( './main.js' );


// EXPORTS //

module.exports = formatTokenize;

},{"./main.js":66}],66:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2022 The Stdlib Authors.
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

// VARIABLES //

var RE = /%(?:([1-9]\d*)\$)?([0 +\-#]*)(\*|\d+)?(?:(\.)(\*|\d+)?)?[hlL]?([%A-Za-z])/g;


// FUNCTIONS //

/**
* Parses a delimiter.
*
* @private
* @param {Array} match - regular expression match
* @returns {Object} delimiter token object
*/
function parse( match ) {
	var token = {
		'mapping': ( match[ 1 ] ) ? parseInt( match[ 1 ], 10 ) : void 0,
		'flags': match[ 2 ],
		'width': match[ 3 ],
		'precision': match[ 5 ],
		'specifier': match[ 6 ]
	};
	if ( match[ 4 ] === '.' && match[ 5 ] === void 0 ) {
		token.precision = '1';
	}
	return token;
}


// MAIN //

/**
* Tokenizes a string into an array of string parts and format identifier objects.
*
* @param {string} str - input string
* @returns {Array} tokens
*
* @example
* var tokens = formatTokenize( 'Hello %s!' );
* // returns [ 'Hello ', {...}, '!' ]
*/
function formatTokenize( str ) {
	var content;
	var tokens;
	var match;
	var prev;

	tokens = [];
	prev = 0;
	match = RE.exec( str );
	while ( match ) {
		content = str.slice( prev, RE.lastIndex - match[ 0 ].length );
		if ( content.length ) {
			tokens.push( content );
		}
		tokens.push( parse( match ) );
		prev = RE.lastIndex;
		match = RE.exec( str );
	}
	content = str.slice( prev );
	if ( content.length ) {
		tokens.push( content );
	}
	return tokens;
}


// EXPORTS //

module.exports = formatTokenize;

},{}],67:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2022 The Stdlib Authors.
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
* Insert supplied variable values into a format string.
*
* @module @stdlib/string/format
*
* @example
* var format = require( '@stdlib/string/format' );
*
* var out = format( '%s %s!', 'Hello', 'World' );
* // returns 'Hello World!'
*
* out = format( 'Pi: ~%.2f', 3.141592653589793 );
* // returns 'Pi: ~3.14'
*/

// MODULES //

var format = require( './main.js' );


// EXPORTS //

module.exports = format;

},{"./main.js":69}],68:[function(require,module,exports){
arguments[4][61][0].apply(exports,arguments)
},{"dup":61}],69:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2022 The Stdlib Authors.
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

var interpolate = require( '@stdlib/string/base/format-interpolate' );
var tokenize = require( '@stdlib/string/base/format-tokenize' );
var isString = require( './is_string.js' );


// MAIN //

/**
* Inserts supplied variable values into a format string.
*
* @param {string} str - input string
* @param {Array} ...args - variable values
* @throws {TypeError} first argument must be a string
* @throws {Error} invalid flags
* @returns {string} formatted string
*
* @example
* var str = format( 'Hello %s!', 'world' );
* // returns 'Hello world!'
*
* @example
* var str = format( 'Pi: ~%.2f', 3.141592653589793 );
* // returns 'Pi: ~3.14'
*/
function format( str ) {
	var tokens;
	var args;
	var i;

	if ( !isString( str ) ) {
		throw new TypeError( format( 'invalid argument. First argument must be a string. Value: `%s`.', str ) );
	}
	tokens = tokenize( str );
	args = new Array( arguments.length );
	args[ 0 ] = tokens;
	for ( i = 1; i < args.length; i++ ) {
		args[ i ] = arguments[ i ];
	}
	return interpolate.apply( null, args );
}


// EXPORTS //

module.exports = format;

},{"./is_string.js":68,"@stdlib/string/base/format-interpolate":59,"@stdlib/string/base/format-tokenize":65}],70:[function(require,module,exports){
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

},{"./main.js":71}],71:[function(require,module,exports){
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

},{"@stdlib/assert/is-buffer":19,"@stdlib/regexp/function-name":54,"@stdlib/utils/native-class":85}],72:[function(require,module,exports){
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

},{"./main.js":73}],73:[function(require,module,exports){
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

},{"@stdlib/utils/define-property":77}],74:[function(require,module,exports){
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

},{}],75:[function(require,module,exports){
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

},{}],76:[function(require,module,exports){
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

},{"./define_property.js":75}],77:[function(require,module,exports){
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

},{"./builtin.js":74,"./has_define_property_support.js":76,"./polyfill.js":78}],78:[function(require,module,exports){
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

// MODULES //

var format = require( '@stdlib/string/format' );


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
		throw new TypeError( format( 'invalid argument. First argument must be an object. Value: `%s`.', obj ) );
	}
	if ( typeof descriptor !== 'object' || descriptor === null || toStr.call( descriptor ) === '[object Array]' ) {
		throw new TypeError( format( 'invalid argument. Property descriptor must be an object. Value: `%s`.', descriptor ) );
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

},{"@stdlib/string/format":67}],79:[function(require,module,exports){
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

},{}],80:[function(require,module,exports){
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

},{"./main.js":82}],82:[function(require,module,exports){
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
var format = require( '@stdlib/string/format' );
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
			throw new TypeError( format( 'invalid argument. Must provide a boolean. Value: `%s`.', codegen ) );
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

},{"./codegen.js":79,"./global.js":80,"./self.js":83,"./window.js":84,"@stdlib/assert/is-boolean":12,"@stdlib/string/format":67}],83:[function(require,module,exports){
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

},{}],84:[function(require,module,exports){
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

},{}],85:[function(require,module,exports){
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

},{"./native_class.js":86,"./polyfill.js":87,"@stdlib/assert/has-tostringtag-support":8}],86:[function(require,module,exports){
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

},{"./tostring.js":88}],87:[function(require,module,exports){
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

},{"./tostring.js":88,"./tostringtag.js":89,"@stdlib/assert/has-own-property":4}],88:[function(require,module,exports){
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

},{}],89:[function(require,module,exports){
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

},{}],90:[function(require,module,exports){
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

},{"./fixtures/nodelist.js":91,"./fixtures/re.js":92,"./fixtures/typedarray.js":93}],91:[function(require,module,exports){
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

},{"@stdlib/utils/global":81}],92:[function(require,module,exports){
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

},{}],93:[function(require,module,exports){
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

},{}],94:[function(require,module,exports){
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

},{"./check.js":90,"./polyfill.js":95,"./typeof.js":96}],95:[function(require,module,exports){
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

},{"@stdlib/utils/constructor-name":70}],96:[function(require,module,exports){
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

},{"@stdlib/utils/constructor-name":70}],97:[function(require,module,exports){
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

},{}],98:[function(require,module,exports){

},{}],99:[function(require,module,exports){
arguments[4][98][0].apply(exports,arguments)
},{"dup":98}],100:[function(require,module,exports){
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
},{"base64-js":97,"buffer":100,"ieee754":189}],101:[function(require,module,exports){
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

},{}],102:[function(require,module,exports){
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
},{"_process":198}],103:[function(require,module,exports){
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

},{"events":101,"inherits":190,"readable-stream/lib/_stream_duplex.js":105,"readable-stream/lib/_stream_passthrough.js":106,"readable-stream/lib/_stream_readable.js":107,"readable-stream/lib/_stream_transform.js":108,"readable-stream/lib/_stream_writable.js":109,"readable-stream/lib/internal/streams/end-of-stream.js":113,"readable-stream/lib/internal/streams/pipeline.js":115}],104:[function(require,module,exports){
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

},{}],105:[function(require,module,exports){
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
},{"./_stream_readable":107,"./_stream_writable":109,"_process":198,"inherits":190}],106:[function(require,module,exports){
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
},{"./_stream_transform":108,"inherits":190}],107:[function(require,module,exports){
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
},{"../errors":104,"./_stream_duplex":105,"./internal/streams/async_iterator":110,"./internal/streams/buffer_list":111,"./internal/streams/destroy":112,"./internal/streams/from":114,"./internal/streams/state":116,"./internal/streams/stream":117,"_process":198,"buffer":100,"events":101,"inherits":190,"string_decoder/":206,"util":98}],108:[function(require,module,exports){
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
},{"../errors":104,"./_stream_duplex":105,"inherits":190}],109:[function(require,module,exports){
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
},{"../errors":104,"./_stream_duplex":105,"./internal/streams/destroy":112,"./internal/streams/state":116,"./internal/streams/stream":117,"_process":198,"buffer":100,"inherits":190,"util-deprecate":215}],110:[function(require,module,exports){
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
},{"./end-of-stream":113,"_process":198}],111:[function(require,module,exports){
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
},{"buffer":100,"util":98}],112:[function(require,module,exports){
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
},{"_process":198}],113:[function(require,module,exports){
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
},{"../../../errors":104}],114:[function(require,module,exports){
module.exports = function () {
  throw new Error('Readable.from is not available in the browser')
};

},{}],115:[function(require,module,exports){
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
},{"../../../errors":104,"./end-of-stream":113}],116:[function(require,module,exports){
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
},{"../../../errors":104}],117:[function(require,module,exports){
module.exports = require('events').EventEmitter;

},{"events":101}],118:[function(require,module,exports){
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

},{"./":119,"get-intrinsic":184}],119:[function(require,module,exports){
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

},{"function-bind":183,"get-intrinsic":184}],120:[function(require,module,exports){
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

},{"./lib/is_arguments.js":121,"./lib/keys.js":122}],121:[function(require,module,exports){
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

},{}],122:[function(require,module,exports){
exports = module.exports = typeof Object.keys === 'function'
  ? Object.keys : shim;

exports.shim = shim;
function shim (obj) {
  var keys = [];
  for (var key in obj) keys.push(key);
  return keys;
}

},{}],123:[function(require,module,exports){
'use strict';

var keys = require('object-keys');
var hasSymbols = typeof Symbol === 'function' && typeof Symbol('foo') === 'symbol';

var toStr = Object.prototype.toString;
var concat = Array.prototype.concat;
var origDefineProperty = Object.defineProperty;

var isFunction = function (fn) {
	return typeof fn === 'function' && toStr.call(fn) === '[object Function]';
};

var hasPropertyDescriptors = require('has-property-descriptors')();

var supportsDescriptors = origDefineProperty && hasPropertyDescriptors;

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
		object[name] = value; // eslint-disable-line no-param-reassign
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

},{"has-property-descriptors":185,"object-keys":196}],124:[function(require,module,exports){
module.exports = function () {
    for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] !== undefined) return arguments[i];
    }
};

},{}],125:[function(require,module,exports){
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

},{"./ToNumber":155,"./ToPrimitive":157,"./Type":162}],126:[function(require,module,exports){
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

},{"../helpers/isFinite":171,"../helpers/isNaN":173,"../helpers/isPrefixOf":174,"./ToNumber":155,"./ToPrimitive":157,"./Type":162,"get-intrinsic":184}],127:[function(require,module,exports){
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

},{"get-intrinsic":184}],128:[function(require,module,exports){
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

},{"./DayWithinYear":131,"./InLeapYear":135,"./MonthFromTime":145,"get-intrinsic":184}],129:[function(require,module,exports){
'use strict';

var floor = require('./floor');

var msPerDay = require('../helpers/timeConstants').msPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.2

module.exports = function Day(t) {
	return floor(t / msPerDay);
};

},{"../helpers/timeConstants":178,"./floor":166}],130:[function(require,module,exports){
'use strict';

var floor = require('./floor');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

module.exports = function DayFromYear(y) {
	return (365 * (y - 1970)) + floor((y - 1969) / 4) - floor((y - 1901) / 100) + floor((y - 1601) / 400);
};


},{"./floor":166}],131:[function(require,module,exports){
'use strict';

var Day = require('./Day');
var DayFromYear = require('./DayFromYear');
var YearFromTime = require('./YearFromTime');

// https://262.ecma-international.org/5.1/#sec-15.9.1.4

module.exports = function DayWithinYear(t) {
	return Day(t) - DayFromYear(YearFromTime(t));
};

},{"./Day":129,"./DayFromYear":130,"./YearFromTime":164}],132:[function(require,module,exports){
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

},{"./modulo":167}],133:[function(require,module,exports){
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
	}
	throw new $TypeError('FromPropertyDescriptor must be called with a fully populated Property Descriptor');

};

},{"../helpers/assertRecord":170,"./IsAccessorDescriptor":136,"./IsDataDescriptor":138,"./Type":162,"get-intrinsic":184}],134:[function(require,module,exports){
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

},{"../helpers/timeConstants":178,"./floor":166,"./modulo":167}],135:[function(require,module,exports){
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

},{"./DaysInYear":132,"./YearFromTime":164,"get-intrinsic":184}],136:[function(require,module,exports){
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

},{"../helpers/assertRecord":170,"./Type":162,"has":188}],137:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.11

module.exports = require('is-callable');

},{"is-callable":191}],138:[function(require,module,exports){
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

},{"../helpers/assertRecord":170,"./Type":162,"has":188}],139:[function(require,module,exports){
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

},{"../helpers/assertRecord":170,"./IsAccessorDescriptor":136,"./IsDataDescriptor":138,"./Type":162}],140:[function(require,module,exports){
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

},{"../helpers/isPropertyDescriptor":175,"./IsAccessorDescriptor":136,"./IsDataDescriptor":138,"./Type":162}],141:[function(require,module,exports){
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

},{"../helpers/isFinite":171,"../helpers/timeConstants":178}],142:[function(require,module,exports){
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

},{"../helpers/isFinite":171,"./DateFromTime":128,"./Day":129,"./MonthFromTime":145,"./ToInteger":154,"./YearFromTime":164,"./floor":166,"./modulo":167,"get-intrinsic":184}],143:[function(require,module,exports){
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

},{"../helpers/isFinite":171,"../helpers/timeConstants":178,"./ToInteger":154}],144:[function(require,module,exports){
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

},{"../helpers/timeConstants":178,"./floor":166,"./modulo":167}],145:[function(require,module,exports){
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

},{"./DayWithinYear":131,"./InLeapYear":135}],146:[function(require,module,exports){
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

},{"../helpers/isNaN":173}],147:[function(require,module,exports){
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

},{"../helpers/timeConstants":178,"./floor":166,"./modulo":167}],148:[function(require,module,exports){
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

},{"./Type":162}],149:[function(require,module,exports){
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


},{"../helpers/isFinite":171,"./ToNumber":155,"./abs":165,"get-intrinsic":184}],150:[function(require,module,exports){
'use strict';

var msPerDay = require('../helpers/timeConstants').msPerDay;

var DayFromYear = require('./DayFromYear');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

module.exports = function TimeFromYear(y) {
	return msPerDay * DayFromYear(y);
};

},{"../helpers/timeConstants":178,"./DayFromYear":130}],151:[function(require,module,exports){
'use strict';

var modulo = require('./modulo');

var msPerDay = require('../helpers/timeConstants').msPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.2

module.exports = function TimeWithinDay(t) {
	return modulo(t, msPerDay);
};


},{"../helpers/timeConstants":178,"./modulo":167}],152:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.2

module.exports = function ToBoolean(value) { return !!value; };

},{}],153:[function(require,module,exports){
'use strict';

var ToNumber = require('./ToNumber');

// http://262.ecma-international.org/5.1/#sec-9.5

module.exports = function ToInt32(x) {
	return ToNumber(x) >> 0;
};

},{"./ToNumber":155}],154:[function(require,module,exports){
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

},{"../helpers/isFinite":171,"../helpers/isNaN":173,"../helpers/sign":177,"./ToNumber":155,"./abs":165,"./floor":166}],155:[function(require,module,exports){
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

},{"./ToPrimitive":157}],156:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $Object = GetIntrinsic('%Object%');

var CheckObjectCoercible = require('./CheckObjectCoercible');

// http://262.ecma-international.org/5.1/#sec-9.9

module.exports = function ToObject(value) {
	CheckObjectCoercible(value);
	return $Object(value);
};

},{"./CheckObjectCoercible":127,"get-intrinsic":184}],157:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.1

module.exports = require('es-to-primitive/es5');

},{"es-to-primitive/es5":179}],158:[function(require,module,exports){
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

},{"./IsCallable":137,"./ToBoolean":152,"./Type":162,"get-intrinsic":184,"has":188}],159:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $String = GetIntrinsic('%String%');

// http://262.ecma-international.org/5.1/#sec-9.8

module.exports = function ToString(value) {
	return $String(value);
};


},{"get-intrinsic":184}],160:[function(require,module,exports){
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

},{"../helpers/isFinite":171,"../helpers/isNaN":173,"../helpers/sign":177,"./ToNumber":155,"./abs":165,"./floor":166,"./modulo":167}],161:[function(require,module,exports){
'use strict';

var ToNumber = require('./ToNumber');

// http://262.ecma-international.org/5.1/#sec-9.6

module.exports = function ToUint32(x) {
	return ToNumber(x) >>> 0;
};

},{"./ToNumber":155}],162:[function(require,module,exports){
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

},{}],163:[function(require,module,exports){
'use strict';

var Day = require('./Day');
var modulo = require('./modulo');

// https://262.ecma-international.org/5.1/#sec-15.9.1.6

module.exports = function WeekDay(t) {
	return modulo(Day(t) + 4, 7);
};

},{"./Day":129,"./modulo":167}],164:[function(require,module,exports){
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

},{"call-bind/callBound":118,"get-intrinsic":184}],165:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $abs = GetIntrinsic('%Math.abs%');

// http://262.ecma-international.org/5.1/#sec-5.2

module.exports = function abs(x) {
	return $abs(x);
};

},{"get-intrinsic":184}],166:[function(require,module,exports){
'use strict';

// var modulo = require('./modulo');
var $floor = Math.floor;

// http://262.ecma-international.org/5.1/#sec-5.2

module.exports = function floor(x) {
	// return x - modulo(x, 1);
	return $floor(x);
};

},{}],167:[function(require,module,exports){
'use strict';

var mod = require('../helpers/mod');

// https://262.ecma-international.org/5.1/#sec-5.2

module.exports = function modulo(x, y) {
	return mod(x, y);
};

},{"../helpers/mod":176}],168:[function(require,module,exports){
'use strict';

var modulo = require('./modulo');

var msPerSecond = require('../helpers/timeConstants').msPerSecond;

// https://262.ecma-international.org/5.1/#sec-15.9.1.10

module.exports = function msFromTime(t) {
	return modulo(t, msPerSecond);
};

},{"../helpers/timeConstants":178,"./modulo":167}],169:[function(require,module,exports){
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

},{"./5/AbstractEqualityComparison":125,"./5/AbstractRelationalComparison":126,"./5/CheckObjectCoercible":127,"./5/DateFromTime":128,"./5/Day":129,"./5/DayFromYear":130,"./5/DayWithinYear":131,"./5/DaysInYear":132,"./5/FromPropertyDescriptor":133,"./5/HourFromTime":134,"./5/InLeapYear":135,"./5/IsAccessorDescriptor":136,"./5/IsCallable":137,"./5/IsDataDescriptor":138,"./5/IsGenericDescriptor":139,"./5/IsPropertyDescriptor":140,"./5/MakeDate":141,"./5/MakeDay":142,"./5/MakeTime":143,"./5/MinFromTime":144,"./5/MonthFromTime":145,"./5/SameValue":146,"./5/SecFromTime":147,"./5/StrictEqualityComparison":148,"./5/TimeClip":149,"./5/TimeFromYear":150,"./5/TimeWithinDay":151,"./5/ToBoolean":152,"./5/ToInt32":153,"./5/ToInteger":154,"./5/ToNumber":155,"./5/ToObject":156,"./5/ToPrimitive":157,"./5/ToPropertyDescriptor":158,"./5/ToString":159,"./5/ToUint16":160,"./5/ToUint32":161,"./5/Type":162,"./5/WeekDay":163,"./5/YearFromTime":164,"./5/abs":165,"./5/floor":166,"./5/modulo":167,"./5/msFromTime":168}],170:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');
var $SyntaxError = GetIntrinsic('%SyntaxError%');

var has = require('has');

var isMatchRecord = require('./isMatchRecord');

var predicates = {
	// https://262.ecma-international.org/6.0/#sec-property-descriptor-specification-type
	'Property Descriptor': function isPropertyDescriptor(Desc) {
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
	},
	// https://262.ecma-international.org/13.0/#sec-match-records
	'Match Record': isMatchRecord
};

module.exports = function assertRecord(Type, recordType, argumentName, value) {
	var predicate = predicates[recordType];
	if (typeof predicate !== 'function') {
		throw new $SyntaxError('unknown record type: ' + recordType);
	}
	if (Type(value) !== 'Object' || !predicate(value)) {
		throw new $TypeError(argumentName + ' must be a ' + recordType);
	}
};

},{"./isMatchRecord":172,"get-intrinsic":184,"has":188}],171:[function(require,module,exports){
'use strict';

var $isNaN = Number.isNaN || function (a) { return a !== a; };

module.exports = Number.isFinite || function (x) { return typeof x === 'number' && !$isNaN(x) && x !== Infinity && x !== -Infinity; };

},{}],172:[function(require,module,exports){
'use strict';

var has = require('has');

// https://262.ecma-international.org/13.0/#sec-match-records

module.exports = function isMatchRecord(record) {
	return (
		has(record, '[[StartIndex]]')
        && has(record, '[[EndIndex]]')
        && record['[[StartIndex]]'] >= 0
        && record['[[EndIndex]]'] >= record['[[StartIndex]]']
        && String(parseInt(record['[[StartIndex]]'], 10)) === String(record['[[StartIndex]]'])
        && String(parseInt(record['[[EndIndex]]'], 10)) === String(record['[[EndIndex]]'])
	);
};

},{"has":188}],173:[function(require,module,exports){
'use strict';

module.exports = Number.isNaN || function isNaN(a) {
	return a !== a;
};

},{}],174:[function(require,module,exports){
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

},{"call-bind/callBound":118}],175:[function(require,module,exports){
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

},{"get-intrinsic":184,"has":188}],176:[function(require,module,exports){
'use strict';

var $floor = Math.floor;

module.exports = function mod(number, modulo) {
	var remain = number % modulo;
	return $floor(remain >= 0 ? remain : remain + modulo);
};

},{}],177:[function(require,module,exports){
'use strict';

module.exports = function sign(number) {
	return number >= 0 ? 1 : -1;
};

},{}],178:[function(require,module,exports){
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

},{}],179:[function(require,module,exports){
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

},{"./helpers/isPrimitive":180,"is-callable":191}],180:[function(require,module,exports){
'use strict';

module.exports = function isPrimitive(value) {
	return value === null || (typeof value !== 'function' && typeof value !== 'object');
};

},{}],181:[function(require,module,exports){
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

},{"is-object":192,"merge-descriptors":193}],182:[function(require,module,exports){
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

},{}],183:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

module.exports = Function.prototype.bind || implementation;

},{"./implementation":182}],184:[function(require,module,exports){
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

},{"function-bind":183,"has":188,"has-symbols":186}],185:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $defineProperty = GetIntrinsic('%Object.defineProperty%', true);

var hasPropertyDescriptors = function hasPropertyDescriptors() {
	if ($defineProperty) {
		try {
			$defineProperty({}, 'a', { value: 1 });
			return true;
		} catch (e) {
			// IE 8 has a broken defineProperty
			return false;
		}
	}
	return false;
};

hasPropertyDescriptors.hasArrayLengthDefineBug = function hasArrayLengthDefineBug() {
	// node v0.6 has a bug where array lengths can be Set but not Defined
	if (!hasPropertyDescriptors()) {
		return null;
	}
	try {
		return $defineProperty([], 'length', { value: 1 }).length !== 1;
	} catch (e) {
		// In Firefox 4-22, defining length on an array throws an exception.
		return true;
	}
};

module.exports = hasPropertyDescriptors;

},{"get-intrinsic":184}],186:[function(require,module,exports){
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

},{"./shams":187}],187:[function(require,module,exports){
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

},{}],188:[function(require,module,exports){
'use strict';

var bind = require('function-bind');

module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);

},{"function-bind":183}],189:[function(require,module,exports){
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

},{}],190:[function(require,module,exports){
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

},{}],191:[function(require,module,exports){
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

},{}],192:[function(require,module,exports){
'use strict';

module.exports = function isObject(x) {
	return typeof x === 'object' && x !== null;
};

},{}],193:[function(require,module,exports){
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

},{}],194:[function(require,module,exports){
'use strict'

module.exports = function createNotFoundError (path) {
  var err = new Error('Cannot find module \'' + path + '\'')
  err.code = 'MODULE_NOT_FOUND'
  return err
}

},{}],195:[function(require,module,exports){
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

},{"./isArguments":197}],196:[function(require,module,exports){
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

},{"./implementation":195,"./isArguments":197}],197:[function(require,module,exports){
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

},{}],198:[function(require,module,exports){
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

},{}],199:[function(require,module,exports){
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

},{"fill-keys":181,"module-not-found-error":194}],200:[function(require,module,exports){
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
},{"_process":198,"through":213,"timers":214}],201:[function(require,module,exports){
/*! safe-buffer. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> */
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

SafeBuffer.prototype = Object.create(Buffer.prototype)

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

},{"buffer":100}],202:[function(require,module,exports){
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

},{"es-abstract/es5":169,"function-bind":183}],203:[function(require,module,exports){
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

},{"./implementation":202,"./polyfill":204,"./shim":205,"define-properties":123,"function-bind":183}],204:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

var zeroWidthSpace = '\u200b';

module.exports = function getPolyfill() {
	if (String.prototype.trim && zeroWidthSpace.trim() === zeroWidthSpace) {
		return String.prototype.trim;
	}
	return implementation;
};

},{"./implementation":202}],205:[function(require,module,exports){
'use strict';

var define = require('define-properties');
var getPolyfill = require('./polyfill');

module.exports = function shimStringTrim() {
	var polyfill = getPolyfill();
	define(String.prototype, { trim: polyfill }, { trim: function () { return String.prototype.trim !== polyfill; } });
	return polyfill;
};

},{"./polyfill":204,"define-properties":123}],206:[function(require,module,exports){
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
},{"safe-buffer":201}],207:[function(require,module,exports){
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
},{"./lib/default_stream":208,"./lib/results":210,"./lib/test":211,"_process":198,"defined":124,"through":213,"timers":214}],208:[function(require,module,exports){
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
},{"_process":198,"fs":99,"through":213}],209:[function(require,module,exports){
(function (process,setImmediate){(function (){
module.exports = typeof setImmediate !== 'undefined'
    ? setImmediate
    : process.nextTick
;

}).call(this)}).call(this,require('_process'),require("timers").setImmediate)
},{"_process":198,"timers":214}],210:[function(require,module,exports){
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
},{"_process":198,"events":101,"function-bind":183,"has":188,"inherits":190,"object-inspect":212,"resumer":200,"through":213,"timers":214}],211:[function(require,module,exports){
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
},{"./next_tick":209,"deep-equal":120,"defined":124,"events":101,"has":188,"inherits":190,"path":102,"string.prototype.trim":203}],212:[function(require,module,exports){
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

},{}],213:[function(require,module,exports){
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
},{"_process":198,"stream":103}],214:[function(require,module,exports){
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
},{"process/browser.js":198,"timers":214}],215:[function(require,module,exports){
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
