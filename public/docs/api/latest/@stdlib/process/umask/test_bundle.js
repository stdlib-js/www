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

},{"./main.js":2}],2:[function(require,module,exports){
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

},{}],3:[function(require,module,exports){
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

},{"./main.js":4}],4:[function(require,module,exports){
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

},{}],5:[function(require,module,exports){
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

},{"./main.js":6}],6:[function(require,module,exports){
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

},{"@stdlib/assert/has-symbol-support":3}],7:[function(require,module,exports){
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

},{"./main.js":8}],8:[function(require,module,exports){
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

},{"@stdlib/utils/native-class":114}],9:[function(require,module,exports){
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

},{"./main.js":10,"./object.js":11,"./primitive.js":12,"@stdlib/utils/define-nonenumerable-read-only-property":93}],10:[function(require,module,exports){
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

},{"./object.js":11,"./primitive.js":12}],11:[function(require,module,exports){
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

},{"./try2serialize.js":14,"@stdlib/assert/has-tostringtag-support":5,"@stdlib/utils/native-class":114}],12:[function(require,module,exports){
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

},{}],13:[function(require,module,exports){
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

},{}],14:[function(require,module,exports){
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

},{"./tostring.js":13}],15:[function(require,module,exports){
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

},{"./main.js":17}],17:[function(require,module,exports){
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

},{"@stdlib/assert/is-object-like":35}],18:[function(require,module,exports){
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

},{"./main.js":19}],19:[function(require,module,exports){
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

},{"@stdlib/utils/type-of":123}],20:[function(require,module,exports){
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
* Test if a value is an integer.
*
* @module @stdlib/assert/is-integer
*
* @example
* var isInteger = require( '@stdlib/assert/is-integer' );
*
* var bool = isInteger( 5.0 );
* // returns true
*
* bool = isInteger( new Number( 5.0 ) );
* // returns true
*
* bool = isInteger( -3.14 );
* // returns false
*
* bool = isInteger( null );
* // returns false
*
* @example
* // Use interface to check for integer primitives...
* var isInteger = require( '@stdlib/assert/is-integer' ).isPrimitive;
*
* var bool = isInteger( -3.0 );
* // returns true
*
* bool = isInteger( new Number( -3.0 ) );
* // returns false
*
* @example
* // Use interface to check for integer objects...
* var isInteger = require( '@stdlib/assert/is-integer' ).isObject;
*
* var bool = isInteger( 3.0 );
* // returns false
*
* bool = isInteger( new Number( 3.0 ) );
* // returns true
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-nonenumerable-read-only-property' );
var isInteger = require( './main.js' );
var isPrimitive = require( './primitive.js' );
var isObject = require( './object.js' );


// MAIN //

setReadOnly( isInteger, 'isPrimitive', isPrimitive );
setReadOnly( isInteger, 'isObject', isObject );


// EXPORTS //

module.exports = isInteger;

},{"./main.js":22,"./object.js":23,"./primitive.js":24,"@stdlib/utils/define-nonenumerable-read-only-property":93}],21:[function(require,module,exports){
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

var PINF = require( '@stdlib/constants/float64/pinf' );
var NINF = require( '@stdlib/constants/float64/ninf' );
var isInt = require( '@stdlib/math/base/assert/is-integer' );


// MAIN //

/**
* Tests if a number primitive is an integer value.
*
* @private
* @param {*} value - value to test
* @returns {boolean} boolean indicating if a number primitive is an integer value
*/
function isInteger( value ) {
	return (
		value < PINF &&
		value > NINF &&
		isInt( value )
	);
}


// EXPORTS //

module.exports = isInteger;

},{"@stdlib/constants/float64/ninf":55,"@stdlib/constants/float64/pinf":56,"@stdlib/math/base/assert/is-integer":60}],22:[function(require,module,exports){
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
* Tests if a value is an integer.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating whether value is an integer
*
* @example
* var bool = isInteger( 5.0 );
* // returns true
*
* @example
* var bool = isInteger( new Number( 5.0 ) );
* // returns true
*
* @example
* var bool = isInteger( -3.14 );
* // returns false
*
* @example
* var bool = isInteger( null );
* // returns false
*/
function isInteger( value ) {
	return ( isPrimitive( value ) || isObject( value ) );
}


// EXPORTS //

module.exports = isInteger;

},{"./object.js":23,"./primitive.js":24}],23:[function(require,module,exports){
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

var isNumber = require( '@stdlib/assert/is-number' ).isObject;
var isInt = require( './integer.js' );


// MAIN //

/**
* Tests if a value is a number object having an integer value.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating if a value is a number object having an integer value
*
* @example
* var bool = isInteger( 3.0 );
* // returns false
*
* @example
* var bool = isInteger( new Number( 3.0 ) );
* // returns true
*/
function isInteger( value ) {
	return (
		isNumber( value ) &&
		isInt( value.valueOf() )
	);
}


// EXPORTS //

module.exports = isInteger;

},{"./integer.js":21,"@stdlib/assert/is-number":29}],24:[function(require,module,exports){
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

var isNumber = require( '@stdlib/assert/is-number' ).isPrimitive;
var isInt = require( './integer.js' );


// MAIN //

/**
* Tests if a value is a number primitive having an integer value.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating if a value is a number primitive having an integer value
*
* @example
* var bool = isInteger( -3.0 );
* // returns true
*
* @example
* var bool = isInteger( new Number( -3.0 ) );
* // returns false
*/
function isInteger( value ) {
	return (
		isNumber( value ) &&
		isInt( value )
	);
}


// EXPORTS //

module.exports = isInteger;

},{"./integer.js":21,"@stdlib/assert/is-number":29}],25:[function(require,module,exports){
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
* Test if a value is a nonnegative integer.
*
* @module @stdlib/assert/is-nonnegative-integer
*
* @example
* var isNonNegativeInteger = require( '@stdlib/assert/is-nonnegative-integer' );
*
* var bool = isNonNegativeInteger( 5.0 );
* // returns true
*
* bool = isNonNegativeInteger( new Number( 5.0 ) );
* // returns true
*
* bool = isNonNegativeInteger( -5.0 );
* // returns false
*
* bool = isNonNegativeInteger( 3.14 );
* // returns false
*
* bool = isNonNegativeInteger( null );
* // returns false
*
* @example
* var isNonNegativeInteger = require( '@stdlib/assert/is-nonnegative-integer' ).isPrimitive;
*
* var bool = isNonNegativeInteger( 3.0 );
* // returns true
*
* bool = isNonNegativeInteger( new Number( 3.0 ) );
* // returns false
*
* @example
* var isNonNegativeInteger = require( '@stdlib/assert/is-nonnegative-integer' ).isObject;
*
* var bool = isNonNegativeInteger( 3.0 );
* // returns false
*
* bool = isNonNegativeInteger( new Number( 3.0 ) );
* // returns true
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-nonenumerable-read-only-property' );
var isNonNegativeInteger = require( './main.js' );
var isPrimitive = require( './primitive.js' );
var isObject = require( './object.js' );


// MAIN //

setReadOnly( isNonNegativeInteger, 'isPrimitive', isPrimitive );
setReadOnly( isNonNegativeInteger, 'isObject', isObject );


// EXPORTS //

module.exports = isNonNegativeInteger;

},{"./main.js":26,"./object.js":27,"./primitive.js":28,"@stdlib/utils/define-nonenumerable-read-only-property":93}],26:[function(require,module,exports){
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
* Tests if a value is a nonnegative integer.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating whether value is a nonnegative integer
*
* @example
* var bool = isNonNegativeInteger( 5.0 );
* // returns true
*
* @example
* var bool = isNonNegativeInteger( new Number( 5.0 ) );
* // returns true
*
* @example
* var bool = isNonNegativeInteger( -5.0 );
* // returns false
*
* @example
* var bool = isNonNegativeInteger( 3.14 );
* // returns false
*
* @example
* var bool = isNonNegativeInteger( null );
* // returns false
*/
function isNonNegativeInteger( value ) {
	return ( isPrimitive( value ) || isObject( value ) );
}


// EXPORTS //

module.exports = isNonNegativeInteger;

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

var isInteger = require( '@stdlib/assert/is-integer' ).isObject;


// MAIN //

/**
* Tests if a value is a number object having a nonnegative integer value.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating if a value is a number object having a nonnegative integer value
*
* @example
* var bool = isNonNegativeInteger( 3.0 );
* // returns false
*
* @example
* var bool = isNonNegativeInteger( new Number( 3.0 ) );
* // returns true
*/
function isNonNegativeInteger( value ) {
	return (
		isInteger( value ) &&
		value.valueOf() >= 0
	);
}


// EXPORTS //

module.exports = isNonNegativeInteger;

},{"@stdlib/assert/is-integer":20}],28:[function(require,module,exports){
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

var isInteger = require( '@stdlib/assert/is-integer' ).isPrimitive;


// MAIN //

/**
* Tests if a value is a number primitive having a nonnegative integer value.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating if a value is a number primitive having a nonnegative integer value
*
* @example
* var bool = isNonNegativeInteger( 3.0 );
* // returns true
*
* @example
* var bool = isNonNegativeInteger( new Number( 3.0 ) );
* // returns false
*/
function isNonNegativeInteger( value ) {
	return (
		isInteger( value ) &&
		value >= 0
	);
}


// EXPORTS //

module.exports = isNonNegativeInteger;

},{"@stdlib/assert/is-integer":20}],29:[function(require,module,exports){
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
* Test if a value is a number.
*
* @module @stdlib/assert/is-number
*
* @example
* var isNumber = require( '@stdlib/assert/is-number' );
*
* var bool = isNumber( 3.14 );
* // returns true
*
* bool = isNumber( new Number( 3.14 ) );
* // returns true
*
* bool = isNumber( NaN );
* // returns true
*
* bool = isNumber( null );
* // returns false
*
* @example
* var isNumber = require( '@stdlib/assert/is-number' ).isPrimitive;
*
* var bool = isNumber( 3.14 );
* // returns true
*
* bool = isNumber( NaN );
* // returns true
*
* bool = isNumber( new Number( 3.14 ) );
* // returns false
*
* @example
* var isNumber = require( '@stdlib/assert/is-number' ).isObject;
*
* var bool = isNumber( 3.14 );
* // returns false
*
* bool = isNumber( new Number( 3.14 ) );
* // returns true
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-nonenumerable-read-only-property' );
var isNumber = require( './main.js' );
var isPrimitive = require( './primitive.js' );
var isObject = require( './object.js' );


// MAIN //

setReadOnly( isNumber, 'isPrimitive', isPrimitive );
setReadOnly( isNumber, 'isObject', isObject );


// EXPORTS //

module.exports = isNumber;

},{"./main.js":30,"./object.js":31,"./primitive.js":32,"@stdlib/utils/define-nonenumerable-read-only-property":93}],30:[function(require,module,exports){
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
* Tests if a value is a number.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating whether value is a number
*
* @example
* var bool = isNumber( 3.14 );
* // returns true
*
* @example
* var bool = isNumber( new Number( 3.14 ) );
* // returns true
*
* @example
* var bool = isNumber( NaN );
* // returns true
*
* @example
* var bool = isNumber( null );
* // returns false
*/
function isNumber( value ) {
	return ( isPrimitive( value ) || isObject( value ) );
}


// EXPORTS //

module.exports = isNumber;

},{"./object.js":31,"./primitive.js":32}],31:[function(require,module,exports){
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
var Number = require( '@stdlib/number/ctor' );
var test = require( './try2serialize.js' );


// VARIABLES //

var FLG = hasToStringTag();


// MAIN //

/**
* Tests if a value is a number object.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating if a value is a number object
*
* @example
* var bool = isNumber( 3.14 );
* // returns false
*
* @example
* var bool = isNumber( new Number( 3.14 ) );
* // returns true
*/
function isNumber( value ) {
	if ( typeof value === 'object' ) {
		if ( value instanceof Number ) {
			return true;
		}
		if ( FLG ) {
			return test( value );
		}
		return ( nativeClass( value ) === '[object Number]' );
	}
	return false;
}


// EXPORTS //

module.exports = isNumber;

},{"./try2serialize.js":34,"@stdlib/assert/has-tostringtag-support":5,"@stdlib/number/ctor":66,"@stdlib/utils/native-class":114}],32:[function(require,module,exports){
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
	return ( typeof value === 'number' );
}


// EXPORTS //

module.exports = isNumber;

},{}],33:[function(require,module,exports){
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

var Number = require( '@stdlib/number/ctor' );


// MAIN //

// eslint-disable-next-line stdlib/no-redeclare
var toString = Number.prototype.toString; // non-generic


// EXPORTS //

module.exports = toString;

},{"@stdlib/number/ctor":66}],34:[function(require,module,exports){
arguments[4][14][0].apply(exports,arguments)
},{"./tostring.js":33,"dup":14}],35:[function(require,module,exports){
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

},{"./main.js":36,"@stdlib/assert/tools/array-function":53,"@stdlib/utils/define-nonenumerable-read-only-property":93}],36:[function(require,module,exports){
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

/**
* Test if a value is an object.
*
* @module @stdlib/assert/is-object
*
* @example
* var isObject = require( '@stdlib/assert/is-object' );
*
* var bool = isObject( {} );
* // returns true
*
* bool = isObject( true );
* // returns false
*/

// MODULES //

var isObject = require( './main.js' );


// EXPORTS //

module.exports = isObject;

},{"./main.js":38}],38:[function(require,module,exports){
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
* Tests if a value is an object; e.g., `{}`.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating whether value is an object
*
* @example
* var bool = isObject( {} );
* // returns true
*
* @example
* var bool = isObject( null );
* // returns false
*/
function isObject( value ) {
	return (
		typeof value === 'object' &&
		value !== null &&
		!isArray( value )
	);
}


// EXPORTS //

module.exports = isObject;

},{"@stdlib/assert/is-array":7}],39:[function(require,module,exports){
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
* Test if a value is a plain object.
*
* @module @stdlib/assert/is-plain-object
*
* @example
* var isPlainObject = require( '@stdlib/assert/is-plain-object' );
*
* var bool = isPlainObject( {} );
* // returns true
*
* bool = isPlainObject( null );
* // returns false
*/

// MODULES //

var isPlainObject = require( './main.js' );


// EXPORTS //

module.exports = isPlainObject;

},{"./main.js":40}],40:[function(require,module,exports){
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

var isObject = require( '@stdlib/assert/is-object' );
var isFunction = require( '@stdlib/assert/is-function' );
var getPrototypeOf = require( '@stdlib/utils/get-prototype-of' );
var hasOwnProp = require( '@stdlib/assert/has-own-property' );
var nativeClass = require( '@stdlib/utils/native-class' );


// VARIABLES //

var objectPrototype = Object.prototype;


// FUNCTIONS //

/**
* Tests that an object only has own properties.
*
* @private
* @param {Object} obj - value to test
* @returns {boolean} boolean indicating if an object only has own properties
*/
function ownProps( obj ) {
	var key;

	// NOTE: possibility of perf boost if key enumeration order is known (see http://stackoverflow.com/questions/18531624/isplainobject-thing).
	for ( key in obj ) {
		if ( !hasOwnProp( obj, key ) ) {
			return false;
		}
	}
	return true;
}


// MAIN //

/**
* Tests if a value is a plain object.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating whether value is a plain object
*
* @example
* var bool = isPlainObject( {} );
* // returns true
*
* @example
* var bool = isPlainObject( null );
* // returns false
*/
function isPlainObject( value ) {
	var proto;

	// Screen for obvious non-objects...
	if ( !isObject( value ) ) {
		return false;
	}
	// Objects with no prototype (e.g., `Object.create( null )`) are plain...
	proto = getPrototypeOf( value );
	if ( !proto ) {
		return true;
	}
	// Objects having a prototype are plain if and only if they are constructed with a global `Object` function and the prototype points to the prototype of a plain object...
	return (
		// Cannot have own `constructor` property:
		!hasOwnProp( value, 'constructor' ) &&

		// Prototype `constructor` property must be a function (see also https://bugs.jquery.com/ticket/9897 and http://stackoverflow.com/questions/18531624/isplainobject-thing):
		hasOwnProp( proto, 'constructor' ) &&
		isFunction( proto.constructor ) &&
		nativeClass( proto.constructor ) === '[object Function]' &&

		// Test for object-specific method:
		hasOwnProp( proto, 'isPrototypeOf' ) &&
		isFunction( proto.isPrototypeOf ) &&

		(
			// Test if the prototype matches the global `Object` prototype (same realm):
			proto === objectPrototype ||

			// Test that all properties are own properties (cross-realm; *most* likely a plain object):
			ownProps( value )
		)
	);
}


// EXPORTS //

module.exports = isPlainObject;

},{"@stdlib/assert/has-own-property":1,"@stdlib/assert/is-function":18,"@stdlib/assert/is-object":37,"@stdlib/utils/get-prototype-of":104,"@stdlib/utils/native-class":114}],41:[function(require,module,exports){
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

var exec = RegExp.prototype.exec; // non-generic


// EXPORTS //

module.exports = exec;

},{}],42:[function(require,module,exports){
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
* Test if a value is a regular expression.
*
* @module @stdlib/assert/is-regexp
*
* @example
* var isRegExp = require( '@stdlib/assert/is-regexp' );
*
* var bool = isRegExp( /\.+/ );
* // returns true
*
* bool = isRegExp( {} );
* // returns false
*/

// MODULES //

var isRegExp = require( './main.js' );


// EXPORTS //

module.exports = isRegExp;

},{"./main.js":43}],43:[function(require,module,exports){
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
var test = require( './try2exec.js' );


// VARIABLES //

var FLG = hasToStringTag();


// MAIN //

/**
* Tests if a value is a regular expression.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating whether value is a regular expression
*
* @example
* var bool = isRegExp( /\.+/ );
* // returns true
*
* @example
* var bool = isRegExp( {} );
* // returns false
*/
function isRegExp( value ) {
	if ( typeof value === 'object' ) {
		if ( value instanceof RegExp ) {
			return true;
		}
		if ( FLG ) {
			return test( value );
		}
		return ( nativeClass( value ) === '[object RegExp]' );
	}
	return false;
}


// EXPORTS //

module.exports = isRegExp;

},{"./try2exec.js":44,"@stdlib/assert/has-tostringtag-support":5,"@stdlib/utils/native-class":114}],44:[function(require,module,exports){
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

var exec = require( './exec.js' );


// MAIN //

/**
* Attempts to call a `RegExp` method.
*
* @private
* @param {*} value - value to test
* @returns {boolean} boolean indicating if able to call a `RegExp` method
*/
function test( value ) {
	try {
		exec.call( value );
		return true;
	} catch ( err ) { // eslint-disable-line no-unused-vars
		return false;
	}
}


// EXPORTS //

module.exports = test;

},{"./exec.js":41}],45:[function(require,module,exports){
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

},{"./main.js":46,"./object.js":47,"./primitive.js":48,"@stdlib/utils/define-nonenumerable-read-only-property":93}],46:[function(require,module,exports){
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

},{"./object.js":47,"./primitive.js":48}],47:[function(require,module,exports){
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

},{"./try2valueof.js":49,"@stdlib/assert/has-tostringtag-support":5,"@stdlib/utils/native-class":114}],48:[function(require,module,exports){
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

},{}],49:[function(require,module,exports){
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

},{"./valueof.js":50}],50:[function(require,module,exports){
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

},{}],51:[function(require,module,exports){
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

},{"@stdlib/os/platform":68}],52:[function(require,module,exports){
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

},{"@stdlib/assert/is-array":7}],53:[function(require,module,exports){
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

},{"./arrayfcn.js":52}],54:[function(require,module,exports){
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
* Maximum safe double-precision floating-point integer.
*
* @module @stdlib/constants/float64/max-safe-integer
* @type {number}
*
* @example
* var FLOAT64_MAX_SAFE_INTEGER = require( '@stdlib/constants/float64/max-safe-integer' );
* // returns 9007199254740991
*/


// MAIN //

/**
* Maximum safe double-precision floating-point integer.
*
* ## Notes
*
* The integer has the value
*
* ```tex
* 2^{53} - 1
* ```
*
* @constant
* @type {number}
* @default 9007199254740991
* @see [Safe Integers]{@link http://www.2ality.com/2013/10/safe-integers.html}
* @see [IEEE 754]{@link https://en.wikipedia.org/wiki/IEEE_754-1985}
*/
var FLOAT64_MAX_SAFE_INTEGER = 9007199254740991;


// EXPORTS //

module.exports = FLOAT64_MAX_SAFE_INTEGER;

},{}],55:[function(require,module,exports){
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
* Double-precision floating-point negative infinity.
*
* @module @stdlib/constants/float64/ninf
* @type {number}
*
* @example
* var FLOAT64_NINF = require( '@stdlib/constants/float64/ninf' );
* // returns -Infinity
*/

// MODULES //

var Number = require( '@stdlib/number/ctor' );


// MAIN //

/**
* Double-precision floating-point negative infinity.
*
* ## Notes
*
* Double-precision floating-point negative infinity has the bit sequence
*
* ```binarystring
* 1 11111111111 00000000000000000000 00000000000000000000000000000000
* ```
*
* @constant
* @type {number}
* @default Number.NEGATIVE_INFINITY
* @see [IEEE 754]{@link https://en.wikipedia.org/wiki/IEEE_754-1985}
*/
var FLOAT64_NINF = Number.NEGATIVE_INFINITY;


// EXPORTS //

module.exports = FLOAT64_NINF;

},{"@stdlib/number/ctor":66}],56:[function(require,module,exports){
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
* Double-precision floating-point positive infinity.
*
* @module @stdlib/constants/float64/pinf
* @type {number}
*
* @example
* var FLOAT64_PINF = require( '@stdlib/constants/float64/pinf' );
* // returns Infinity
*/


// MAIN //

/**
* Double-precision floating-point positive infinity.
*
* ## Notes
*
* Double-precision floating-point positive infinity has the bit sequence
*
* ```binarystring
* 0 11111111111 00000000000000000000 00000000000000000000000000000000
* ```
*
* @constant
* @type {number}
* @default Number.POSITIVE_INFINITY
* @see [IEEE 754]{@link https://en.wikipedia.org/wiki/IEEE_754-1985}
*/
var FLOAT64_PINF = Number.POSITIVE_INFINITY; // eslint-disable-line stdlib/require-globals


// EXPORTS //

module.exports = FLOAT64_PINF;

},{}],57:[function(require,module,exports){
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

},{"./main.js":58,"./sync.js":59,"@stdlib/utils/define-nonenumerable-read-only-property":93}],58:[function(require,module,exports){
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

},{"fs":128}],59:[function(require,module,exports){
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

},{"fs":128}],60:[function(require,module,exports){
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
* Test if a finite double-precision floating-point number is an integer.
*
* @module @stdlib/math/base/assert/is-integer
*
* @example
* var isInteger = require( '@stdlib/math/base/assert/is-integer' );
*
* var bool = isInteger( 1.0 );
* // returns true
*
* bool = isInteger( 3.14 );
* // returns false
*/

// MODULES //

var isInteger = require( './is_integer.js' );


// EXPORTS //

module.exports = isInteger;

},{"./is_integer.js":61}],61:[function(require,module,exports){
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

var floor = require( '@stdlib/math/base/special/floor' );


// MAIN //

/**
* Tests if a finite double-precision floating-point number is an integer.
*
* @param {number} x - value to test
* @returns {boolean} boolean indicating whether the value is an integer
*
* @example
* var bool = isInteger( 1.0 );
* // returns true
*
* @example
* var bool = isInteger( 3.14 );
* // returns false
*/
function isInteger( x ) {
	return (floor(x) === x);
}


// EXPORTS //

module.exports = isInteger;

},{"@stdlib/math/base/special/floor":64}],62:[function(require,module,exports){
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
* Round a double-precision floating-point number toward positive infinity.
*
* @module @stdlib/math/base/special/ceil
*
* @example
* var ceil = require( '@stdlib/math/base/special/ceil' );
*
* var v = ceil( -4.2 );
* // returns -4.0
*
* v = ceil( 9.99999 );
* // returns 10.0
*
* v = ceil( 0.0 );
* // returns 0.0
*
* v = ceil( NaN );
* // returns NaN
*/

// MODULES //

var ceil = require( './main.js' );


// EXPORTS //

module.exports = ceil;

},{"./main.js":63}],63:[function(require,module,exports){
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

// TODO: implementation (?)

/**
* Rounds a double-precision floating-point number toward positive infinity.
*
* @param {number} x - input value
* @returns {number} rounded value
*
* @example
* var v = ceil( -4.2 );
* // returns -4.0
*
* @example
* var v = ceil( 9.99999 );
* // returns 10.0
*
* @example
* var v = ceil( 0.0 );
* // returns 0.0
*
* @example
* var v = ceil( NaN );
* // returns NaN
*/
var ceil = Math.ceil; // eslint-disable-line stdlib/no-builtin-math


// EXPORTS //

module.exports = ceil;

},{}],64:[function(require,module,exports){
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
* Round a double-precision floating-point number toward negative infinity.
*
* @module @stdlib/math/base/special/floor
*
* @example
* var floor = require( '@stdlib/math/base/special/floor' );
*
* var v = floor( -4.2 );
* // returns -5.0
*
* v = floor( 9.99999 );
* // returns 9.0
*
* v = floor( 0.0 );
* // returns 0.0
*
* v = floor( NaN );
* // returns NaN
*/

// MODULES //

var floor = require( './main.js' );


// EXPORTS //

module.exports = floor;

},{"./main.js":65}],65:[function(require,module,exports){
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

// TODO: implementation (?)

/**
* Rounds a double-precision floating-point number toward negative infinity.
*
* @param {number} x - input value
* @returns {number} rounded value
*
* @example
* var v = floor( -4.2 );
* // returns -5.0
*
* @example
* var v = floor( 9.99999 );
* // returns 9.0
*
* @example
* var v = floor( 0.0 );
* // returns 0.0
*
* @example
* var v = floor( NaN );
* // returns NaN
*/
var floor = Math.floor; // eslint-disable-line stdlib/no-builtin-math


// EXPORTS //

module.exports = floor;

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

/**
* Constructor which returns a `Number` object.
*
* @module @stdlib/number/ctor
*
* @example
* var Number = require( '@stdlib/number/ctor' );
*
* var v = new Number( 10.0 );
* // returns <Number>
*/

// MODULES //

var Number = require( './number.js' );


// EXPORTS //

module.exports = Number;

},{"./number.js":67}],67:[function(require,module,exports){
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

module.exports = Number; // eslint-disable-line stdlib/require-globals

},{}],68:[function(require,module,exports){
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

},{}],69:[function(require,module,exports){
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

},{}],70:[function(require,module,exports){
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
var isNonNegativeInteger = require( '@stdlib/assert/is-nonnegative-integer' ).isPrimitive;
var isBoolean = require( '@stdlib/assert/is-boolean' ).isPrimitive;
var isObject = require( '@stdlib/assert/is-plain-object' );
var hasOwnProp = require( '@stdlib/assert/has-own-property' );
var toSymbolic = require( './to_symbolic.js' );
var fromSymbolic = require( './from_symbolic.js' );


// VARIABLES //

var MASK = 0|0; // asm type annotation


// MAIN //

/**
* Get/set the process mask.
*
* ## Notes
*
* -   If provided a mask, the function sets the current mask and returns the previous process mask. Otherwise, the function returns the current process mask.
* -   Browser environments do not support process masks. Hence, this function always returns either `0` or `u=rwx,g=rwx,o=rwx`.
*
*
* @param {(NonNegativeInteger|string)} [mask] - mask
* @param {Object} [options] - options
* @param {boolean} [options.symbolic] - boolean indicating whether to return a mask using symbolic notation
* @throws {TypeError} must provide either a string, nonnegative integer, or an options object
* @throws {TypeError} must provide valid options
* @throws {Error} must provide a parseable expression mask
* @returns {(NonNegativeInteger|string)} process mask
*
* @example
* var mask = umask();
* // returns 0
*/
function umask() {
	var options;
	var nargs;
	var mask;
	var opts;
	var arg;

	nargs = arguments.length;
	if ( nargs === 0 ) {
		return MASK;
	}
	opts = {};
	arg = arguments[ 0 ];
	if ( nargs === 1 ) {
		if ( isString( arg ) ) {
			mask = fromSymbolic( MASK, arg );
			if ( mask instanceof Error ) {
				throw mask;
			}
			return MASK;
		}
		if ( isNonNegativeInteger( arg ) ) {
			// Easy case where we use the built-in function to set the mask and return its return value:
			return MASK;
		}
		if ( isObject( arg ) ) {
			if ( hasOwnProp( arg, 'symbolic' ) ) {
				opts.symbolic = arg.symbolic;
				if ( !isBoolean( opts.symbolic ) ) {
					throw new TypeError( 'invalid option. `symbolic` option must be a boolean. Option: `' + opts.symbolic + '`.' );
				}
			}
			mask = MASK;
			if ( opts.symbolic ) {
				mask = toSymbolic( mask );
			}
			return mask;
		}
		throw new TypeError( 'invalid argument. Must provide either a string, nonnegative integer, or an options object. Value: `' + arg + '`.' );
	}
	options = arguments[ 1 ];
	if ( !isObject( options ) ) {
		throw new TypeError( 'invalid argument. Options argument must be an object. Value: `' + options + '`.' );
	}
	if ( hasOwnProp( options, 'symbolic' ) ) {
		opts.symbolic = options.symbolic;
		if ( !isBoolean( opts.symbolic ) ) {
			throw new TypeError( 'invalid option. `symbolic` option must be a boolean. Option: `' + opts.symbolic + '`.' );
		}
	}
	if ( isString( arg ) ) {
		mask = fromSymbolic( MASK, arg );
		if ( mask instanceof Error ) {
			throw mask;
		}
	} else if ( isNonNegativeInteger( arg ) ) {
		mask = arg;
	} else {
		throw new TypeError( 'invalid argument. First argument must be either a string or nonnegative integer. Value: `' + arg + '`.' );
	}
	// Set the mask:
	mask = MASK;

	// Determine how to format the output value:
	if ( opts.symbolic ) {
		mask = toSymbolic( mask );
	}
	return mask;
}


// EXPORTS //

module.exports = umask;

},{"./from_symbolic.js":71,"./to_symbolic.js":73,"@stdlib/assert/has-own-property":1,"@stdlib/assert/is-boolean":9,"@stdlib/assert/is-nonnegative-integer":25,"@stdlib/assert/is-plain-object":39,"@stdlib/assert/is-string":45}],71:[function(require,module,exports){
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

var lpad = require( '@stdlib/string/left-pad' );


// VARIABLES //

// Regular expression to parse a mask expression:
var RE_MASK_EXPRESSION = /^(u{0,1}g{0,1}o{0,1}a{0,1}|)([+\-=])(r{0,1}w{0,1}x{0,1})$/;

// Table of permission bit mask offsets:
var PERMS = {
	'r': 2, // read
	'w': 1, // write
	'x': 0  // execute
};

// Table of class indices in the octal format (e.g., `0o0077`):
var WHO = {
	's': 0, // special mode (ignored; see http://man7.org/linux/man-pages/man2/umask.2.html)
	'u': 1, // user
	'g': 2, // group
	'o': 3  // other/non-group
};


// FUNCTIONS //

/**
* Returns a bit mask.
*
* @private
* @param {NonNegativeInteger} offset - bit offset (right-to-left)
* @returns {NonNegativeInteger} bit mask
*
* @example
* var y = bitMask( 3 );
* // returns 8
*/
function bitMask( offset ) {
	return ( 1 << offset )>>>0; // asm type annotation
}

/**
* Sets a bit.
*
* @private
* @param {NonNegativeInteger} value - value
* @param {NonNegativeInteger} offset - bit offset (right-to-left)
* @returns {NonNegativeInteger} updated value
*
* @example
* var y = setBit( 8, 2 );
*/
function setBit( value, offset ) {
	return ( value | bitMask( offset ) )>>>0; // asm type annotation
}

/**
* Clears a bit.
*
* @private
* @param {NonNegativeInteger} value - value
* @param {NonNegativeInteger} offset - bit offset (right-to-left)
* @returns {NonNegativeInteger} updated value
*/
function clearBit( value, offset ) {
	return ( value & ~bitMask( offset ) )>>>0; // asm type annotation
}


// MAIN //

/**
* Converts a mask expression in symbolic notation to an integer.
*
* @private
* @param {NonNegativeInteger} mask - current mask
* @param {string} expr - mask expression
* @returns {(NonNegativeInteger|Error)} integer mask or parse error
*/
function fromSymbolic( mask, expr ) {
	var digits;
	var parts;
	var perm;
	var who;
	var tmp;
	var idx;
	var op;
	var w;
	var o;
	var i;
	var j;
	var k;

	// Split the mask into octal digits (e.g., [ '0', '0', '7', '7' ]):
	digits = lpad( mask.toString( 8 ), 4, '0' ).split( '' );

	// Convert each octal digit to an integer value:
	for ( i = 0; i < digits.length; i++ ) {
		digits[ i ] = parseInt( digits[ i ], 10 );
	}

	// See if we can easily split the mask into separate mask expressions (e.g., `u+x,g=rw,o=` => [ 'u+x', 'g=rw', 'o=' ] ):
	parts = expr.split( ',' );

	// For each expression, split into "class", "operator", and "symbols" and update the mask octal digits:
	for ( i = 0; i < parts.length; i++ ) {
		tmp = parts[ i ].match( RE_MASK_EXPRESSION );
		if ( tmp === null ) {
			return new Error( 'invalid argument. Unable to parse mask expression. Ensure the expression is properly formatted, only uses the class letters "u", "g", "o", and "a", only uses the operators "+", "-", and "=", and only uses the permission symbols "r", "w", and "x". Value: `' + expr + '`.' );
		}
		// Extract the expression parts:
		who = tmp[ 1 ];
		if ( who === '' ) {
			// If a user class is not specified (e.g., `+x`), "ugo" (user, group, other) is implied...
			who = 'ugo';
		} else {
			// Replace `a` (all) user class letter with "ugo" (user, group, other) equivalent...
			w = '';
			for ( k = 0; k < who.length; k++ ) {
				if ( who[ k ] === 'a' ) {
					w += 'ugo';
				} else {
					w += who[ k ];
				}
			}
			who = w;
		}
		op = tmp[ 2 ];
		perm = tmp[ 3 ];

		// NOTE: the algorithm below is from the perspective of the mask. If implemented for, say, `chmod`, the "disabling"/"enabling" logic would be reversed. Recall that a "1" in the mask, serves to **disable** a permission setting, not enable.

		// Disable permissions...
		if ( op === '-' ) {
			if ( perm === '' ) {
				// The `-` operation by itself does not change any bits...
				continue;
			}
			for ( j = 0; j < perm.length; j++ ) {
				o = PERMS[ perm[j] ];
				for ( k = 0; k < who.length; k++ ) {
					idx = WHO[ who[k] ];
					digits[ idx ] = setBit( digits[ idx ], o ); // to disable, we flip on mask bits
				}
			}
		}
		// Enable permissions...
		else if ( op === '+' ) {
			if ( perm === '' ) {
				// The `+` operation by itself does not change any bits...
				continue;
			}
			for ( j = 0; j < perm.length; j++ ) {
				o = PERMS[ perm[j] ];
				for ( k = 0; k < who.length; k++ ) {
					idx = WHO[ who[k] ];
					digits[ idx ] = clearBit( digits[ idx ], o ); // to enable, we clear mask bits
				}
			}
		}
		// Disable all permissions by flipping on all permission mask bits...
		else if ( perm === '' ) { // op === '='
			for ( k = 0; k < who.length; k++ ) {
				idx = WHO[ who[k] ];
				digits[ idx ] = 7;
			}
		}
		// Explicitly set permissions...
		else { // op === '='
			// First, disable all permissions by flipping on all permission mask bits...
			for ( k = 0; k < who.length; k++ ) {
				idx = WHO[ who[k] ];
				digits[ idx ] = 7;
			}
			// Then, explicitly enable permissions by clearing mask bits...
			for ( j = 0; j < perm.length; j++ ) {
				o = PERMS[ perm[j] ];
				for ( k = 0; k < who.length; k++ ) {
					idx = WHO[ who[k] ];
					digits[ idx ] = clearBit( digits[ idx ], o );
				}
			}
		}
	}
	// Convert the digits to an integer value...
	for ( i = 0; i < digits.length; i++ ) {
		digits[ i ] = digits[ i ].toString();
	}
	return parseInt( digits.join( '' ), 8 );
}


// EXPORTS //

module.exports = fromSymbolic;

},{"@stdlib/string/left-pad":83}],72:[function(require,module,exports){
module.exports={
	"0": "rwx",
	"1": "rw",
	"2": "rx",
	"3": "r",
	"4": "wx",
	"5": "w",
	"6": "x",
	"7": ""
}

},{}],73:[function(require,module,exports){
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

var lpad = require( '@stdlib/string/left-pad' );
var OCTAL_CODES = require( './octal_codes.json' );


// MAIN //

/**
* Converts an integer mask to symbolic notation.
*
* @private
* @param {NonNegativeInteger} mask - integer mask
* @returns {string} mask in symbolic notation
*/
function toSymbolic( mask ) {
	var out;

	// Convert the mask to a four-digit octal string representation (e.g., 0077):
	mask = mask.toString( 8 );
	mask = lpad( mask, 4, '0' );

	// For each digit, get the permissions: (NOTE: we skip the special modes digit, as only the file permission bits of the mask are used; see http://man7.org/linux/man-pages/man2/umask.2.html)
	out = '';
	out += 'u='+OCTAL_CODES[ mask[1] ];
	out += ',';
	out += 'g='+OCTAL_CODES[ mask[2] ];
	out += ',';
	out += 'o='+OCTAL_CODES[ mask[3] ];

	return out;
}


// EXPORTS //

module.exports = toSymbolic;

},{"./octal_codes.json":72,"@stdlib/string/left-pad":83}],74:[function(require,module,exports){
module.exports={
  "name": "@stdlib/process/umask",
  "version": "0.0.0",
  "description": "Get/set the process mask.",
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
    "umask": "./bin/cli"
  },
  "main": "./lib",
  "browser": "./lib/browser.js",
  "directories": {
    "benchmark": "./benchmark",
    "doc": "./docs",
    "example": "./examples",
    "lib": "./lib",
    "scripts": "./scripts",
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
    "stdutils",
    "stdutil",
    "utilities",
    "utility",
    "utils",
    "util",
    "process",
    "umask",
    "permissions",
    "mask",
    "security",
    "chmod",
    "restrictions",
    "filesystem",
    "fs"
  ]
}

},{}],75:[function(require,module,exports){
module.exports=[[0,"0000","000000000000","u=rwx,g=rwx,o=rwx"],[1,"0001","000000000001","u=rwx,g=rwx,o=rw"],[2,"0002","000000000010","u=rwx,g=rwx,o=rx"],[3,"0003","000000000011","u=rwx,g=rwx,o=r"],[4,"0004","000000000100","u=rwx,g=rwx,o=wx"],[5,"0005","000000000101","u=rwx,g=rwx,o=w"],[6,"0006","000000000110","u=rwx,g=rwx,o=x"],[7,"0007","000000000111","u=rwx,g=rwx,o="],[8,"0010","000000001000","u=rwx,g=rw,o=rwx"],[9,"0011","000000001001","u=rwx,g=rw,o=rw"],[10,"0012","000000001010","u=rwx,g=rw,o=rx"],[11,"0013","000000001011","u=rwx,g=rw,o=r"],[12,"0014","000000001100","u=rwx,g=rw,o=wx"],[13,"0015","000000001101","u=rwx,g=rw,o=w"],[14,"0016","000000001110","u=rwx,g=rw,o=x"],[15,"0017","000000001111","u=rwx,g=rw,o="],[16,"0020","000000010000","u=rwx,g=rx,o=rwx"],[17,"0021","000000010001","u=rwx,g=rx,o=rw"],[18,"0022","000000010010","u=rwx,g=rx,o=rx"],[19,"0023","000000010011","u=rwx,g=rx,o=r"],[20,"0024","000000010100","u=rwx,g=rx,o=wx"],[21,"0025","000000010101","u=rwx,g=rx,o=w"],[22,"0026","000000010110","u=rwx,g=rx,o=x"],[23,"0027","000000010111","u=rwx,g=rx,o="],[24,"0030","000000011000","u=rwx,g=r,o=rwx"],[25,"0031","000000011001","u=rwx,g=r,o=rw"],[26,"0032","000000011010","u=rwx,g=r,o=rx"],[27,"0033","000000011011","u=rwx,g=r,o=r"],[28,"0034","000000011100","u=rwx,g=r,o=wx"],[29,"0035","000000011101","u=rwx,g=r,o=w"],[30,"0036","000000011110","u=rwx,g=r,o=x"],[31,"0037","000000011111","u=rwx,g=r,o="],[32,"0040","000000100000","u=rwx,g=wx,o=rwx"],[33,"0041","000000100001","u=rwx,g=wx,o=rw"],[34,"0042","000000100010","u=rwx,g=wx,o=rx"],[35,"0043","000000100011","u=rwx,g=wx,o=r"],[36,"0044","000000100100","u=rwx,g=wx,o=wx"],[37,"0045","000000100101","u=rwx,g=wx,o=w"],[38,"0046","000000100110","u=rwx,g=wx,o=x"],[39,"0047","000000100111","u=rwx,g=wx,o="],[40,"0050","000000101000","u=rwx,g=w,o=rwx"],[41,"0051","000000101001","u=rwx,g=w,o=rw"],[42,"0052","000000101010","u=rwx,g=w,o=rx"],[43,"0053","000000101011","u=rwx,g=w,o=r"],[44,"0054","000000101100","u=rwx,g=w,o=wx"],[45,"0055","000000101101","u=rwx,g=w,o=w"],[46,"0056","000000101110","u=rwx,g=w,o=x"],[47,"0057","000000101111","u=rwx,g=w,o="],[48,"0060","000000110000","u=rwx,g=x,o=rwx"],[49,"0061","000000110001","u=rwx,g=x,o=rw"],[50,"0062","000000110010","u=rwx,g=x,o=rx"],[51,"0063","000000110011","u=rwx,g=x,o=r"],[52,"0064","000000110100","u=rwx,g=x,o=wx"],[53,"0065","000000110101","u=rwx,g=x,o=w"],[54,"0066","000000110110","u=rwx,g=x,o=x"],[55,"0067","000000110111","u=rwx,g=x,o="],[56,"0070","000000111000","u=rwx,g=,o=rwx"],[57,"0071","000000111001","u=rwx,g=,o=rw"],[58,"0072","000000111010","u=rwx,g=,o=rx"],[59,"0073","000000111011","u=rwx,g=,o=r"],[60,"0074","000000111100","u=rwx,g=,o=wx"],[61,"0075","000000111101","u=rwx,g=,o=w"],[62,"0076","000000111110","u=rwx,g=,o=x"],[63,"0077","000000111111","u=rwx,g=,o="],[64,"0100","000001000000","u=rw,g=rwx,o=rwx"],[65,"0101","000001000001","u=rw,g=rwx,o=rw"],[66,"0102","000001000010","u=rw,g=rwx,o=rx"],[67,"0103","000001000011","u=rw,g=rwx,o=r"],[68,"0104","000001000100","u=rw,g=rwx,o=wx"],[69,"0105","000001000101","u=rw,g=rwx,o=w"],[70,"0106","000001000110","u=rw,g=rwx,o=x"],[71,"0107","000001000111","u=rw,g=rwx,o="],[72,"0110","000001001000","u=rw,g=rw,o=rwx"],[73,"0111","000001001001","u=rw,g=rw,o=rw"],[74,"0112","000001001010","u=rw,g=rw,o=rx"],[75,"0113","000001001011","u=rw,g=rw,o=r"],[76,"0114","000001001100","u=rw,g=rw,o=wx"],[77,"0115","000001001101","u=rw,g=rw,o=w"],[78,"0116","000001001110","u=rw,g=rw,o=x"],[79,"0117","000001001111","u=rw,g=rw,o="],[80,"0120","000001010000","u=rw,g=rx,o=rwx"],[81,"0121","000001010001","u=rw,g=rx,o=rw"],[82,"0122","000001010010","u=rw,g=rx,o=rx"],[83,"0123","000001010011","u=rw,g=rx,o=r"],[84,"0124","000001010100","u=rw,g=rx,o=wx"],[85,"0125","000001010101","u=rw,g=rx,o=w"],[86,"0126","000001010110","u=rw,g=rx,o=x"],[87,"0127","000001010111","u=rw,g=rx,o="],[88,"0130","000001011000","u=rw,g=r,o=rwx"],[89,"0131","000001011001","u=rw,g=r,o=rw"],[90,"0132","000001011010","u=rw,g=r,o=rx"],[91,"0133","000001011011","u=rw,g=r,o=r"],[92,"0134","000001011100","u=rw,g=r,o=wx"],[93,"0135","000001011101","u=rw,g=r,o=w"],[94,"0136","000001011110","u=rw,g=r,o=x"],[95,"0137","000001011111","u=rw,g=r,o="],[96,"0140","000001100000","u=rw,g=wx,o=rwx"],[97,"0141","000001100001","u=rw,g=wx,o=rw"],[98,"0142","000001100010","u=rw,g=wx,o=rx"],[99,"0143","000001100011","u=rw,g=wx,o=r"],[100,"0144","000001100100","u=rw,g=wx,o=wx"],[101,"0145","000001100101","u=rw,g=wx,o=w"],[102,"0146","000001100110","u=rw,g=wx,o=x"],[103,"0147","000001100111","u=rw,g=wx,o="],[104,"0150","000001101000","u=rw,g=w,o=rwx"],[105,"0151","000001101001","u=rw,g=w,o=rw"],[106,"0152","000001101010","u=rw,g=w,o=rx"],[107,"0153","000001101011","u=rw,g=w,o=r"],[108,"0154","000001101100","u=rw,g=w,o=wx"],[109,"0155","000001101101","u=rw,g=w,o=w"],[110,"0156","000001101110","u=rw,g=w,o=x"],[111,"0157","000001101111","u=rw,g=w,o="],[112,"0160","000001110000","u=rw,g=x,o=rwx"],[113,"0161","000001110001","u=rw,g=x,o=rw"],[114,"0162","000001110010","u=rw,g=x,o=rx"],[115,"0163","000001110011","u=rw,g=x,o=r"],[116,"0164","000001110100","u=rw,g=x,o=wx"],[117,"0165","000001110101","u=rw,g=x,o=w"],[118,"0166","000001110110","u=rw,g=x,o=x"],[119,"0167","000001110111","u=rw,g=x,o="],[120,"0170","000001111000","u=rw,g=,o=rwx"],[121,"0171","000001111001","u=rw,g=,o=rw"],[122,"0172","000001111010","u=rw,g=,o=rx"],[123,"0173","000001111011","u=rw,g=,o=r"],[124,"0174","000001111100","u=rw,g=,o=wx"],[125,"0175","000001111101","u=rw,g=,o=w"],[126,"0176","000001111110","u=rw,g=,o=x"],[127,"0177","000001111111","u=rw,g=,o="],[128,"0200","000010000000","u=rx,g=rwx,o=rwx"],[129,"0201","000010000001","u=rx,g=rwx,o=rw"],[130,"0202","000010000010","u=rx,g=rwx,o=rx"],[131,"0203","000010000011","u=rx,g=rwx,o=r"],[132,"0204","000010000100","u=rx,g=rwx,o=wx"],[133,"0205","000010000101","u=rx,g=rwx,o=w"],[134,"0206","000010000110","u=rx,g=rwx,o=x"],[135,"0207","000010000111","u=rx,g=rwx,o="],[136,"0210","000010001000","u=rx,g=rw,o=rwx"],[137,"0211","000010001001","u=rx,g=rw,o=rw"],[138,"0212","000010001010","u=rx,g=rw,o=rx"],[139,"0213","000010001011","u=rx,g=rw,o=r"],[140,"0214","000010001100","u=rx,g=rw,o=wx"],[141,"0215","000010001101","u=rx,g=rw,o=w"],[142,"0216","000010001110","u=rx,g=rw,o=x"],[143,"0217","000010001111","u=rx,g=rw,o="],[144,"0220","000010010000","u=rx,g=rx,o=rwx"],[145,"0221","000010010001","u=rx,g=rx,o=rw"],[146,"0222","000010010010","u=rx,g=rx,o=rx"],[147,"0223","000010010011","u=rx,g=rx,o=r"],[148,"0224","000010010100","u=rx,g=rx,o=wx"],[149,"0225","000010010101","u=rx,g=rx,o=w"],[150,"0226","000010010110","u=rx,g=rx,o=x"],[151,"0227","000010010111","u=rx,g=rx,o="],[152,"0230","000010011000","u=rx,g=r,o=rwx"],[153,"0231","000010011001","u=rx,g=r,o=rw"],[154,"0232","000010011010","u=rx,g=r,o=rx"],[155,"0233","000010011011","u=rx,g=r,o=r"],[156,"0234","000010011100","u=rx,g=r,o=wx"],[157,"0235","000010011101","u=rx,g=r,o=w"],[158,"0236","000010011110","u=rx,g=r,o=x"],[159,"0237","000010011111","u=rx,g=r,o="],[160,"0240","000010100000","u=rx,g=wx,o=rwx"],[161,"0241","000010100001","u=rx,g=wx,o=rw"],[162,"0242","000010100010","u=rx,g=wx,o=rx"],[163,"0243","000010100011","u=rx,g=wx,o=r"],[164,"0244","000010100100","u=rx,g=wx,o=wx"],[165,"0245","000010100101","u=rx,g=wx,o=w"],[166,"0246","000010100110","u=rx,g=wx,o=x"],[167,"0247","000010100111","u=rx,g=wx,o="],[168,"0250","000010101000","u=rx,g=w,o=rwx"],[169,"0251","000010101001","u=rx,g=w,o=rw"],[170,"0252","000010101010","u=rx,g=w,o=rx"],[171,"0253","000010101011","u=rx,g=w,o=r"],[172,"0254","000010101100","u=rx,g=w,o=wx"],[173,"0255","000010101101","u=rx,g=w,o=w"],[174,"0256","000010101110","u=rx,g=w,o=x"],[175,"0257","000010101111","u=rx,g=w,o="],[176,"0260","000010110000","u=rx,g=x,o=rwx"],[177,"0261","000010110001","u=rx,g=x,o=rw"],[178,"0262","000010110010","u=rx,g=x,o=rx"],[179,"0263","000010110011","u=rx,g=x,o=r"],[180,"0264","000010110100","u=rx,g=x,o=wx"],[181,"0265","000010110101","u=rx,g=x,o=w"],[182,"0266","000010110110","u=rx,g=x,o=x"],[183,"0267","000010110111","u=rx,g=x,o="],[184,"0270","000010111000","u=rx,g=,o=rwx"],[185,"0271","000010111001","u=rx,g=,o=rw"],[186,"0272","000010111010","u=rx,g=,o=rx"],[187,"0273","000010111011","u=rx,g=,o=r"],[188,"0274","000010111100","u=rx,g=,o=wx"],[189,"0275","000010111101","u=rx,g=,o=w"],[190,"0276","000010111110","u=rx,g=,o=x"],[191,"0277","000010111111","u=rx,g=,o="],[192,"0300","000011000000","u=r,g=rwx,o=rwx"],[193,"0301","000011000001","u=r,g=rwx,o=rw"],[194,"0302","000011000010","u=r,g=rwx,o=rx"],[195,"0303","000011000011","u=r,g=rwx,o=r"],[196,"0304","000011000100","u=r,g=rwx,o=wx"],[197,"0305","000011000101","u=r,g=rwx,o=w"],[198,"0306","000011000110","u=r,g=rwx,o=x"],[199,"0307","000011000111","u=r,g=rwx,o="],[200,"0310","000011001000","u=r,g=rw,o=rwx"],[201,"0311","000011001001","u=r,g=rw,o=rw"],[202,"0312","000011001010","u=r,g=rw,o=rx"],[203,"0313","000011001011","u=r,g=rw,o=r"],[204,"0314","000011001100","u=r,g=rw,o=wx"],[205,"0315","000011001101","u=r,g=rw,o=w"],[206,"0316","000011001110","u=r,g=rw,o=x"],[207,"0317","000011001111","u=r,g=rw,o="],[208,"0320","000011010000","u=r,g=rx,o=rwx"],[209,"0321","000011010001","u=r,g=rx,o=rw"],[210,"0322","000011010010","u=r,g=rx,o=rx"],[211,"0323","000011010011","u=r,g=rx,o=r"],[212,"0324","000011010100","u=r,g=rx,o=wx"],[213,"0325","000011010101","u=r,g=rx,o=w"],[214,"0326","000011010110","u=r,g=rx,o=x"],[215,"0327","000011010111","u=r,g=rx,o="],[216,"0330","000011011000","u=r,g=r,o=rwx"],[217,"0331","000011011001","u=r,g=r,o=rw"],[218,"0332","000011011010","u=r,g=r,o=rx"],[219,"0333","000011011011","u=r,g=r,o=r"],[220,"0334","000011011100","u=r,g=r,o=wx"],[221,"0335","000011011101","u=r,g=r,o=w"],[222,"0336","000011011110","u=r,g=r,o=x"],[223,"0337","000011011111","u=r,g=r,o="],[224,"0340","000011100000","u=r,g=wx,o=rwx"],[225,"0341","000011100001","u=r,g=wx,o=rw"],[226,"0342","000011100010","u=r,g=wx,o=rx"],[227,"0343","000011100011","u=r,g=wx,o=r"],[228,"0344","000011100100","u=r,g=wx,o=wx"],[229,"0345","000011100101","u=r,g=wx,o=w"],[230,"0346","000011100110","u=r,g=wx,o=x"],[231,"0347","000011100111","u=r,g=wx,o="],[232,"0350","000011101000","u=r,g=w,o=rwx"],[233,"0351","000011101001","u=r,g=w,o=rw"],[234,"0352","000011101010","u=r,g=w,o=rx"],[235,"0353","000011101011","u=r,g=w,o=r"],[236,"0354","000011101100","u=r,g=w,o=wx"],[237,"0355","000011101101","u=r,g=w,o=w"],[238,"0356","000011101110","u=r,g=w,o=x"],[239,"0357","000011101111","u=r,g=w,o="],[240,"0360","000011110000","u=r,g=x,o=rwx"],[241,"0361","000011110001","u=r,g=x,o=rw"],[242,"0362","000011110010","u=r,g=x,o=rx"],[243,"0363","000011110011","u=r,g=x,o=r"],[244,"0364","000011110100","u=r,g=x,o=wx"],[245,"0365","000011110101","u=r,g=x,o=w"],[246,"0366","000011110110","u=r,g=x,o=x"],[247,"0367","000011110111","u=r,g=x,o="],[248,"0370","000011111000","u=r,g=,o=rwx"],[249,"0371","000011111001","u=r,g=,o=rw"],[250,"0372","000011111010","u=r,g=,o=rx"],[251,"0373","000011111011","u=r,g=,o=r"],[252,"0374","000011111100","u=r,g=,o=wx"],[253,"0375","000011111101","u=r,g=,o=w"],[254,"0376","000011111110","u=r,g=,o=x"],[255,"0377","000011111111","u=r,g=,o="],[256,"0400","000100000000","u=wx,g=rwx,o=rwx"],[257,"0401","000100000001","u=wx,g=rwx,o=rw"],[258,"0402","000100000010","u=wx,g=rwx,o=rx"],[259,"0403","000100000011","u=wx,g=rwx,o=r"],[260,"0404","000100000100","u=wx,g=rwx,o=wx"],[261,"0405","000100000101","u=wx,g=rwx,o=w"],[262,"0406","000100000110","u=wx,g=rwx,o=x"],[263,"0407","000100000111","u=wx,g=rwx,o="],[264,"0410","000100001000","u=wx,g=rw,o=rwx"],[265,"0411","000100001001","u=wx,g=rw,o=rw"],[266,"0412","000100001010","u=wx,g=rw,o=rx"],[267,"0413","000100001011","u=wx,g=rw,o=r"],[268,"0414","000100001100","u=wx,g=rw,o=wx"],[269,"0415","000100001101","u=wx,g=rw,o=w"],[270,"0416","000100001110","u=wx,g=rw,o=x"],[271,"0417","000100001111","u=wx,g=rw,o="],[272,"0420","000100010000","u=wx,g=rx,o=rwx"],[273,"0421","000100010001","u=wx,g=rx,o=rw"],[274,"0422","000100010010","u=wx,g=rx,o=rx"],[275,"0423","000100010011","u=wx,g=rx,o=r"],[276,"0424","000100010100","u=wx,g=rx,o=wx"],[277,"0425","000100010101","u=wx,g=rx,o=w"],[278,"0426","000100010110","u=wx,g=rx,o=x"],[279,"0427","000100010111","u=wx,g=rx,o="],[280,"0430","000100011000","u=wx,g=r,o=rwx"],[281,"0431","000100011001","u=wx,g=r,o=rw"],[282,"0432","000100011010","u=wx,g=r,o=rx"],[283,"0433","000100011011","u=wx,g=r,o=r"],[284,"0434","000100011100","u=wx,g=r,o=wx"],[285,"0435","000100011101","u=wx,g=r,o=w"],[286,"0436","000100011110","u=wx,g=r,o=x"],[287,"0437","000100011111","u=wx,g=r,o="],[288,"0440","000100100000","u=wx,g=wx,o=rwx"],[289,"0441","000100100001","u=wx,g=wx,o=rw"],[290,"0442","000100100010","u=wx,g=wx,o=rx"],[291,"0443","000100100011","u=wx,g=wx,o=r"],[292,"0444","000100100100","u=wx,g=wx,o=wx"],[293,"0445","000100100101","u=wx,g=wx,o=w"],[294,"0446","000100100110","u=wx,g=wx,o=x"],[295,"0447","000100100111","u=wx,g=wx,o="],[296,"0450","000100101000","u=wx,g=w,o=rwx"],[297,"0451","000100101001","u=wx,g=w,o=rw"],[298,"0452","000100101010","u=wx,g=w,o=rx"],[299,"0453","000100101011","u=wx,g=w,o=r"],[300,"0454","000100101100","u=wx,g=w,o=wx"],[301,"0455","000100101101","u=wx,g=w,o=w"],[302,"0456","000100101110","u=wx,g=w,o=x"],[303,"0457","000100101111","u=wx,g=w,o="],[304,"0460","000100110000","u=wx,g=x,o=rwx"],[305,"0461","000100110001","u=wx,g=x,o=rw"],[306,"0462","000100110010","u=wx,g=x,o=rx"],[307,"0463","000100110011","u=wx,g=x,o=r"],[308,"0464","000100110100","u=wx,g=x,o=wx"],[309,"0465","000100110101","u=wx,g=x,o=w"],[310,"0466","000100110110","u=wx,g=x,o=x"],[311,"0467","000100110111","u=wx,g=x,o="],[312,"0470","000100111000","u=wx,g=,o=rwx"],[313,"0471","000100111001","u=wx,g=,o=rw"],[314,"0472","000100111010","u=wx,g=,o=rx"],[315,"0473","000100111011","u=wx,g=,o=r"],[316,"0474","000100111100","u=wx,g=,o=wx"],[317,"0475","000100111101","u=wx,g=,o=w"],[318,"0476","000100111110","u=wx,g=,o=x"],[319,"0477","000100111111","u=wx,g=,o="],[320,"0500","000101000000","u=w,g=rwx,o=rwx"],[321,"0501","000101000001","u=w,g=rwx,o=rw"],[322,"0502","000101000010","u=w,g=rwx,o=rx"],[323,"0503","000101000011","u=w,g=rwx,o=r"],[324,"0504","000101000100","u=w,g=rwx,o=wx"],[325,"0505","000101000101","u=w,g=rwx,o=w"],[326,"0506","000101000110","u=w,g=rwx,o=x"],[327,"0507","000101000111","u=w,g=rwx,o="],[328,"0510","000101001000","u=w,g=rw,o=rwx"],[329,"0511","000101001001","u=w,g=rw,o=rw"],[330,"0512","000101001010","u=w,g=rw,o=rx"],[331,"0513","000101001011","u=w,g=rw,o=r"],[332,"0514","000101001100","u=w,g=rw,o=wx"],[333,"0515","000101001101","u=w,g=rw,o=w"],[334,"0516","000101001110","u=w,g=rw,o=x"],[335,"0517","000101001111","u=w,g=rw,o="],[336,"0520","000101010000","u=w,g=rx,o=rwx"],[337,"0521","000101010001","u=w,g=rx,o=rw"],[338,"0522","000101010010","u=w,g=rx,o=rx"],[339,"0523","000101010011","u=w,g=rx,o=r"],[340,"0524","000101010100","u=w,g=rx,o=wx"],[341,"0525","000101010101","u=w,g=rx,o=w"],[342,"0526","000101010110","u=w,g=rx,o=x"],[343,"0527","000101010111","u=w,g=rx,o="],[344,"0530","000101011000","u=w,g=r,o=rwx"],[345,"0531","000101011001","u=w,g=r,o=rw"],[346,"0532","000101011010","u=w,g=r,o=rx"],[347,"0533","000101011011","u=w,g=r,o=r"],[348,"0534","000101011100","u=w,g=r,o=wx"],[349,"0535","000101011101","u=w,g=r,o=w"],[350,"0536","000101011110","u=w,g=r,o=x"],[351,"0537","000101011111","u=w,g=r,o="],[352,"0540","000101100000","u=w,g=wx,o=rwx"],[353,"0541","000101100001","u=w,g=wx,o=rw"],[354,"0542","000101100010","u=w,g=wx,o=rx"],[355,"0543","000101100011","u=w,g=wx,o=r"],[356,"0544","000101100100","u=w,g=wx,o=wx"],[357,"0545","000101100101","u=w,g=wx,o=w"],[358,"0546","000101100110","u=w,g=wx,o=x"],[359,"0547","000101100111","u=w,g=wx,o="],[360,"0550","000101101000","u=w,g=w,o=rwx"],[361,"0551","000101101001","u=w,g=w,o=rw"],[362,"0552","000101101010","u=w,g=w,o=rx"],[363,"0553","000101101011","u=w,g=w,o=r"],[364,"0554","000101101100","u=w,g=w,o=wx"],[365,"0555","000101101101","u=w,g=w,o=w"],[366,"0556","000101101110","u=w,g=w,o=x"],[367,"0557","000101101111","u=w,g=w,o="],[368,"0560","000101110000","u=w,g=x,o=rwx"],[369,"0561","000101110001","u=w,g=x,o=rw"],[370,"0562","000101110010","u=w,g=x,o=rx"],[371,"0563","000101110011","u=w,g=x,o=r"],[372,"0564","000101110100","u=w,g=x,o=wx"],[373,"0565","000101110101","u=w,g=x,o=w"],[374,"0566","000101110110","u=w,g=x,o=x"],[375,"0567","000101110111","u=w,g=x,o="],[376,"0570","000101111000","u=w,g=,o=rwx"],[377,"0571","000101111001","u=w,g=,o=rw"],[378,"0572","000101111010","u=w,g=,o=rx"],[379,"0573","000101111011","u=w,g=,o=r"],[380,"0574","000101111100","u=w,g=,o=wx"],[381,"0575","000101111101","u=w,g=,o=w"],[382,"0576","000101111110","u=w,g=,o=x"],[383,"0577","000101111111","u=w,g=,o="],[384,"0600","000110000000","u=x,g=rwx,o=rwx"],[385,"0601","000110000001","u=x,g=rwx,o=rw"],[386,"0602","000110000010","u=x,g=rwx,o=rx"],[387,"0603","000110000011","u=x,g=rwx,o=r"],[388,"0604","000110000100","u=x,g=rwx,o=wx"],[389,"0605","000110000101","u=x,g=rwx,o=w"],[390,"0606","000110000110","u=x,g=rwx,o=x"],[391,"0607","000110000111","u=x,g=rwx,o="],[392,"0610","000110001000","u=x,g=rw,o=rwx"],[393,"0611","000110001001","u=x,g=rw,o=rw"],[394,"0612","000110001010","u=x,g=rw,o=rx"],[395,"0613","000110001011","u=x,g=rw,o=r"],[396,"0614","000110001100","u=x,g=rw,o=wx"],[397,"0615","000110001101","u=x,g=rw,o=w"],[398,"0616","000110001110","u=x,g=rw,o=x"],[399,"0617","000110001111","u=x,g=rw,o="],[400,"0620","000110010000","u=x,g=rx,o=rwx"],[401,"0621","000110010001","u=x,g=rx,o=rw"],[402,"0622","000110010010","u=x,g=rx,o=rx"],[403,"0623","000110010011","u=x,g=rx,o=r"],[404,"0624","000110010100","u=x,g=rx,o=wx"],[405,"0625","000110010101","u=x,g=rx,o=w"],[406,"0626","000110010110","u=x,g=rx,o=x"],[407,"0627","000110010111","u=x,g=rx,o="],[408,"0630","000110011000","u=x,g=r,o=rwx"],[409,"0631","000110011001","u=x,g=r,o=rw"],[410,"0632","000110011010","u=x,g=r,o=rx"],[411,"0633","000110011011","u=x,g=r,o=r"],[412,"0634","000110011100","u=x,g=r,o=wx"],[413,"0635","000110011101","u=x,g=r,o=w"],[414,"0636","000110011110","u=x,g=r,o=x"],[415,"0637","000110011111","u=x,g=r,o="],[416,"0640","000110100000","u=x,g=wx,o=rwx"],[417,"0641","000110100001","u=x,g=wx,o=rw"],[418,"0642","000110100010","u=x,g=wx,o=rx"],[419,"0643","000110100011","u=x,g=wx,o=r"],[420,"0644","000110100100","u=x,g=wx,o=wx"],[421,"0645","000110100101","u=x,g=wx,o=w"],[422,"0646","000110100110","u=x,g=wx,o=x"],[423,"0647","000110100111","u=x,g=wx,o="],[424,"0650","000110101000","u=x,g=w,o=rwx"],[425,"0651","000110101001","u=x,g=w,o=rw"],[426,"0652","000110101010","u=x,g=w,o=rx"],[427,"0653","000110101011","u=x,g=w,o=r"],[428,"0654","000110101100","u=x,g=w,o=wx"],[429,"0655","000110101101","u=x,g=w,o=w"],[430,"0656","000110101110","u=x,g=w,o=x"],[431,"0657","000110101111","u=x,g=w,o="],[432,"0660","000110110000","u=x,g=x,o=rwx"],[433,"0661","000110110001","u=x,g=x,o=rw"],[434,"0662","000110110010","u=x,g=x,o=rx"],[435,"0663","000110110011","u=x,g=x,o=r"],[436,"0664","000110110100","u=x,g=x,o=wx"],[437,"0665","000110110101","u=x,g=x,o=w"],[438,"0666","000110110110","u=x,g=x,o=x"],[439,"0667","000110110111","u=x,g=x,o="],[440,"0670","000110111000","u=x,g=,o=rwx"],[441,"0671","000110111001","u=x,g=,o=rw"],[442,"0672","000110111010","u=x,g=,o=rx"],[443,"0673","000110111011","u=x,g=,o=r"],[444,"0674","000110111100","u=x,g=,o=wx"],[445,"0675","000110111101","u=x,g=,o=w"],[446,"0676","000110111110","u=x,g=,o=x"],[447,"0677","000110111111","u=x,g=,o="],[448,"0700","000111000000","u=,g=rwx,o=rwx"],[449,"0701","000111000001","u=,g=rwx,o=rw"],[450,"0702","000111000010","u=,g=rwx,o=rx"],[451,"0703","000111000011","u=,g=rwx,o=r"],[452,"0704","000111000100","u=,g=rwx,o=wx"],[453,"0705","000111000101","u=,g=rwx,o=w"],[454,"0706","000111000110","u=,g=rwx,o=x"],[455,"0707","000111000111","u=,g=rwx,o="],[456,"0710","000111001000","u=,g=rw,o=rwx"],[457,"0711","000111001001","u=,g=rw,o=rw"],[458,"0712","000111001010","u=,g=rw,o=rx"],[459,"0713","000111001011","u=,g=rw,o=r"],[460,"0714","000111001100","u=,g=rw,o=wx"],[461,"0715","000111001101","u=,g=rw,o=w"],[462,"0716","000111001110","u=,g=rw,o=x"],[463,"0717","000111001111","u=,g=rw,o="],[464,"0720","000111010000","u=,g=rx,o=rwx"],[465,"0721","000111010001","u=,g=rx,o=rw"],[466,"0722","000111010010","u=,g=rx,o=rx"],[467,"0723","000111010011","u=,g=rx,o=r"],[468,"0724","000111010100","u=,g=rx,o=wx"],[469,"0725","000111010101","u=,g=rx,o=w"],[470,"0726","000111010110","u=,g=rx,o=x"],[471,"0727","000111010111","u=,g=rx,o="],[472,"0730","000111011000","u=,g=r,o=rwx"],[473,"0731","000111011001","u=,g=r,o=rw"],[474,"0732","000111011010","u=,g=r,o=rx"],[475,"0733","000111011011","u=,g=r,o=r"],[476,"0734","000111011100","u=,g=r,o=wx"],[477,"0735","000111011101","u=,g=r,o=w"],[478,"0736","000111011110","u=,g=r,o=x"],[479,"0737","000111011111","u=,g=r,o="],[480,"0740","000111100000","u=,g=wx,o=rwx"],[481,"0741","000111100001","u=,g=wx,o=rw"],[482,"0742","000111100010","u=,g=wx,o=rx"],[483,"0743","000111100011","u=,g=wx,o=r"],[484,"0744","000111100100","u=,g=wx,o=wx"],[485,"0745","000111100101","u=,g=wx,o=w"],[486,"0746","000111100110","u=,g=wx,o=x"],[487,"0747","000111100111","u=,g=wx,o="],[488,"0750","000111101000","u=,g=w,o=rwx"],[489,"0751","000111101001","u=,g=w,o=rw"],[490,"0752","000111101010","u=,g=w,o=rx"],[491,"0753","000111101011","u=,g=w,o=r"],[492,"0754","000111101100","u=,g=w,o=wx"],[493,"0755","000111101101","u=,g=w,o=w"],[494,"0756","000111101110","u=,g=w,o=x"],[495,"0757","000111101111","u=,g=w,o="],[496,"0760","000111110000","u=,g=x,o=rwx"],[497,"0761","000111110001","u=,g=x,o=rw"],[498,"0762","000111110010","u=,g=x,o=rx"],[499,"0763","000111110011","u=,g=x,o=r"],[500,"0764","000111110100","u=,g=x,o=wx"],[501,"0765","000111110101","u=,g=x,o=w"],[502,"0766","000111110110","u=,g=x,o=x"],[503,"0767","000111110111","u=,g=x,o="],[504,"0770","000111111000","u=,g=,o=rwx"],[505,"0771","000111111001","u=,g=,o=rw"],[506,"0772","000111111010","u=,g=,o=rx"],[507,"0773","000111111011","u=,g=,o=r"],[508,"0774","000111111100","u=,g=,o=wx"],[509,"0775","000111111101","u=,g=,o=w"],[510,"0776","000111111110","u=,g=,o=x"],[511,"0777","000111111111","u=,g=,o="],[512,"1000","001000000000","u=rwx,g=rwx,o=rwx"],[513,"1001","001000000001","u=rwx,g=rwx,o=rw"],[514,"1002","001000000010","u=rwx,g=rwx,o=rx"],[515,"1003","001000000011","u=rwx,g=rwx,o=r"],[516,"1004","001000000100","u=rwx,g=rwx,o=wx"],[517,"1005","001000000101","u=rwx,g=rwx,o=w"],[518,"1006","001000000110","u=rwx,g=rwx,o=x"],[519,"1007","001000000111","u=rwx,g=rwx,o="],[520,"1010","001000001000","u=rwx,g=rw,o=rwx"],[521,"1011","001000001001","u=rwx,g=rw,o=rw"],[522,"1012","001000001010","u=rwx,g=rw,o=rx"],[523,"1013","001000001011","u=rwx,g=rw,o=r"],[524,"1014","001000001100","u=rwx,g=rw,o=wx"],[525,"1015","001000001101","u=rwx,g=rw,o=w"],[526,"1016","001000001110","u=rwx,g=rw,o=x"],[527,"1017","001000001111","u=rwx,g=rw,o="],[528,"1020","001000010000","u=rwx,g=rx,o=rwx"],[529,"1021","001000010001","u=rwx,g=rx,o=rw"],[530,"1022","001000010010","u=rwx,g=rx,o=rx"],[531,"1023","001000010011","u=rwx,g=rx,o=r"],[532,"1024","001000010100","u=rwx,g=rx,o=wx"],[533,"1025","001000010101","u=rwx,g=rx,o=w"],[534,"1026","001000010110","u=rwx,g=rx,o=x"],[535,"1027","001000010111","u=rwx,g=rx,o="],[536,"1030","001000011000","u=rwx,g=r,o=rwx"],[537,"1031","001000011001","u=rwx,g=r,o=rw"],[538,"1032","001000011010","u=rwx,g=r,o=rx"],[539,"1033","001000011011","u=rwx,g=r,o=r"],[540,"1034","001000011100","u=rwx,g=r,o=wx"],[541,"1035","001000011101","u=rwx,g=r,o=w"],[542,"1036","001000011110","u=rwx,g=r,o=x"],[543,"1037","001000011111","u=rwx,g=r,o="],[544,"1040","001000100000","u=rwx,g=wx,o=rwx"],[545,"1041","001000100001","u=rwx,g=wx,o=rw"],[546,"1042","001000100010","u=rwx,g=wx,o=rx"],[547,"1043","001000100011","u=rwx,g=wx,o=r"],[548,"1044","001000100100","u=rwx,g=wx,o=wx"],[549,"1045","001000100101","u=rwx,g=wx,o=w"],[550,"1046","001000100110","u=rwx,g=wx,o=x"],[551,"1047","001000100111","u=rwx,g=wx,o="],[552,"1050","001000101000","u=rwx,g=w,o=rwx"],[553,"1051","001000101001","u=rwx,g=w,o=rw"],[554,"1052","001000101010","u=rwx,g=w,o=rx"],[555,"1053","001000101011","u=rwx,g=w,o=r"],[556,"1054","001000101100","u=rwx,g=w,o=wx"],[557,"1055","001000101101","u=rwx,g=w,o=w"],[558,"1056","001000101110","u=rwx,g=w,o=x"],[559,"1057","001000101111","u=rwx,g=w,o="],[560,"1060","001000110000","u=rwx,g=x,o=rwx"],[561,"1061","001000110001","u=rwx,g=x,o=rw"],[562,"1062","001000110010","u=rwx,g=x,o=rx"],[563,"1063","001000110011","u=rwx,g=x,o=r"],[564,"1064","001000110100","u=rwx,g=x,o=wx"],[565,"1065","001000110101","u=rwx,g=x,o=w"],[566,"1066","001000110110","u=rwx,g=x,o=x"],[567,"1067","001000110111","u=rwx,g=x,o="],[568,"1070","001000111000","u=rwx,g=,o=rwx"],[569,"1071","001000111001","u=rwx,g=,o=rw"],[570,"1072","001000111010","u=rwx,g=,o=rx"],[571,"1073","001000111011","u=rwx,g=,o=r"],[572,"1074","001000111100","u=rwx,g=,o=wx"],[573,"1075","001000111101","u=rwx,g=,o=w"],[574,"1076","001000111110","u=rwx,g=,o=x"],[575,"1077","001000111111","u=rwx,g=,o="],[576,"1100","001001000000","u=rw,g=rwx,o=rwx"],[577,"1101","001001000001","u=rw,g=rwx,o=rw"],[578,"1102","001001000010","u=rw,g=rwx,o=rx"],[579,"1103","001001000011","u=rw,g=rwx,o=r"],[580,"1104","001001000100","u=rw,g=rwx,o=wx"],[581,"1105","001001000101","u=rw,g=rwx,o=w"],[582,"1106","001001000110","u=rw,g=rwx,o=x"],[583,"1107","001001000111","u=rw,g=rwx,o="],[584,"1110","001001001000","u=rw,g=rw,o=rwx"],[585,"1111","001001001001","u=rw,g=rw,o=rw"],[586,"1112","001001001010","u=rw,g=rw,o=rx"],[587,"1113","001001001011","u=rw,g=rw,o=r"],[588,"1114","001001001100","u=rw,g=rw,o=wx"],[589,"1115","001001001101","u=rw,g=rw,o=w"],[590,"1116","001001001110","u=rw,g=rw,o=x"],[591,"1117","001001001111","u=rw,g=rw,o="],[592,"1120","001001010000","u=rw,g=rx,o=rwx"],[593,"1121","001001010001","u=rw,g=rx,o=rw"],[594,"1122","001001010010","u=rw,g=rx,o=rx"],[595,"1123","001001010011","u=rw,g=rx,o=r"],[596,"1124","001001010100","u=rw,g=rx,o=wx"],[597,"1125","001001010101","u=rw,g=rx,o=w"],[598,"1126","001001010110","u=rw,g=rx,o=x"],[599,"1127","001001010111","u=rw,g=rx,o="],[600,"1130","001001011000","u=rw,g=r,o=rwx"],[601,"1131","001001011001","u=rw,g=r,o=rw"],[602,"1132","001001011010","u=rw,g=r,o=rx"],[603,"1133","001001011011","u=rw,g=r,o=r"],[604,"1134","001001011100","u=rw,g=r,o=wx"],[605,"1135","001001011101","u=rw,g=r,o=w"],[606,"1136","001001011110","u=rw,g=r,o=x"],[607,"1137","001001011111","u=rw,g=r,o="],[608,"1140","001001100000","u=rw,g=wx,o=rwx"],[609,"1141","001001100001","u=rw,g=wx,o=rw"],[610,"1142","001001100010","u=rw,g=wx,o=rx"],[611,"1143","001001100011","u=rw,g=wx,o=r"],[612,"1144","001001100100","u=rw,g=wx,o=wx"],[613,"1145","001001100101","u=rw,g=wx,o=w"],[614,"1146","001001100110","u=rw,g=wx,o=x"],[615,"1147","001001100111","u=rw,g=wx,o="],[616,"1150","001001101000","u=rw,g=w,o=rwx"],[617,"1151","001001101001","u=rw,g=w,o=rw"],[618,"1152","001001101010","u=rw,g=w,o=rx"],[619,"1153","001001101011","u=rw,g=w,o=r"],[620,"1154","001001101100","u=rw,g=w,o=wx"],[621,"1155","001001101101","u=rw,g=w,o=w"],[622,"1156","001001101110","u=rw,g=w,o=x"],[623,"1157","001001101111","u=rw,g=w,o="],[624,"1160","001001110000","u=rw,g=x,o=rwx"],[625,"1161","001001110001","u=rw,g=x,o=rw"],[626,"1162","001001110010","u=rw,g=x,o=rx"],[627,"1163","001001110011","u=rw,g=x,o=r"],[628,"1164","001001110100","u=rw,g=x,o=wx"],[629,"1165","001001110101","u=rw,g=x,o=w"],[630,"1166","001001110110","u=rw,g=x,o=x"],[631,"1167","001001110111","u=rw,g=x,o="],[632,"1170","001001111000","u=rw,g=,o=rwx"],[633,"1171","001001111001","u=rw,g=,o=rw"],[634,"1172","001001111010","u=rw,g=,o=rx"],[635,"1173","001001111011","u=rw,g=,o=r"],[636,"1174","001001111100","u=rw,g=,o=wx"],[637,"1175","001001111101","u=rw,g=,o=w"],[638,"1176","001001111110","u=rw,g=,o=x"],[639,"1177","001001111111","u=rw,g=,o="],[640,"1200","001010000000","u=rx,g=rwx,o=rwx"],[641,"1201","001010000001","u=rx,g=rwx,o=rw"],[642,"1202","001010000010","u=rx,g=rwx,o=rx"],[643,"1203","001010000011","u=rx,g=rwx,o=r"],[644,"1204","001010000100","u=rx,g=rwx,o=wx"],[645,"1205","001010000101","u=rx,g=rwx,o=w"],[646,"1206","001010000110","u=rx,g=rwx,o=x"],[647,"1207","001010000111","u=rx,g=rwx,o="],[648,"1210","001010001000","u=rx,g=rw,o=rwx"],[649,"1211","001010001001","u=rx,g=rw,o=rw"],[650,"1212","001010001010","u=rx,g=rw,o=rx"],[651,"1213","001010001011","u=rx,g=rw,o=r"],[652,"1214","001010001100","u=rx,g=rw,o=wx"],[653,"1215","001010001101","u=rx,g=rw,o=w"],[654,"1216","001010001110","u=rx,g=rw,o=x"],[655,"1217","001010001111","u=rx,g=rw,o="],[656,"1220","001010010000","u=rx,g=rx,o=rwx"],[657,"1221","001010010001","u=rx,g=rx,o=rw"],[658,"1222","001010010010","u=rx,g=rx,o=rx"],[659,"1223","001010010011","u=rx,g=rx,o=r"],[660,"1224","001010010100","u=rx,g=rx,o=wx"],[661,"1225","001010010101","u=rx,g=rx,o=w"],[662,"1226","001010010110","u=rx,g=rx,o=x"],[663,"1227","001010010111","u=rx,g=rx,o="],[664,"1230","001010011000","u=rx,g=r,o=rwx"],[665,"1231","001010011001","u=rx,g=r,o=rw"],[666,"1232","001010011010","u=rx,g=r,o=rx"],[667,"1233","001010011011","u=rx,g=r,o=r"],[668,"1234","001010011100","u=rx,g=r,o=wx"],[669,"1235","001010011101","u=rx,g=r,o=w"],[670,"1236","001010011110","u=rx,g=r,o=x"],[671,"1237","001010011111","u=rx,g=r,o="],[672,"1240","001010100000","u=rx,g=wx,o=rwx"],[673,"1241","001010100001","u=rx,g=wx,o=rw"],[674,"1242","001010100010","u=rx,g=wx,o=rx"],[675,"1243","001010100011","u=rx,g=wx,o=r"],[676,"1244","001010100100","u=rx,g=wx,o=wx"],[677,"1245","001010100101","u=rx,g=wx,o=w"],[678,"1246","001010100110","u=rx,g=wx,o=x"],[679,"1247","001010100111","u=rx,g=wx,o="],[680,"1250","001010101000","u=rx,g=w,o=rwx"],[681,"1251","001010101001","u=rx,g=w,o=rw"],[682,"1252","001010101010","u=rx,g=w,o=rx"],[683,"1253","001010101011","u=rx,g=w,o=r"],[684,"1254","001010101100","u=rx,g=w,o=wx"],[685,"1255","001010101101","u=rx,g=w,o=w"],[686,"1256","001010101110","u=rx,g=w,o=x"],[687,"1257","001010101111","u=rx,g=w,o="],[688,"1260","001010110000","u=rx,g=x,o=rwx"],[689,"1261","001010110001","u=rx,g=x,o=rw"],[690,"1262","001010110010","u=rx,g=x,o=rx"],[691,"1263","001010110011","u=rx,g=x,o=r"],[692,"1264","001010110100","u=rx,g=x,o=wx"],[693,"1265","001010110101","u=rx,g=x,o=w"],[694,"1266","001010110110","u=rx,g=x,o=x"],[695,"1267","001010110111","u=rx,g=x,o="],[696,"1270","001010111000","u=rx,g=,o=rwx"],[697,"1271","001010111001","u=rx,g=,o=rw"],[698,"1272","001010111010","u=rx,g=,o=rx"],[699,"1273","001010111011","u=rx,g=,o=r"],[700,"1274","001010111100","u=rx,g=,o=wx"],[701,"1275","001010111101","u=rx,g=,o=w"],[702,"1276","001010111110","u=rx,g=,o=x"],[703,"1277","001010111111","u=rx,g=,o="],[704,"1300","001011000000","u=r,g=rwx,o=rwx"],[705,"1301","001011000001","u=r,g=rwx,o=rw"],[706,"1302","001011000010","u=r,g=rwx,o=rx"],[707,"1303","001011000011","u=r,g=rwx,o=r"],[708,"1304","001011000100","u=r,g=rwx,o=wx"],[709,"1305","001011000101","u=r,g=rwx,o=w"],[710,"1306","001011000110","u=r,g=rwx,o=x"],[711,"1307","001011000111","u=r,g=rwx,o="],[712,"1310","001011001000","u=r,g=rw,o=rwx"],[713,"1311","001011001001","u=r,g=rw,o=rw"],[714,"1312","001011001010","u=r,g=rw,o=rx"],[715,"1313","001011001011","u=r,g=rw,o=r"],[716,"1314","001011001100","u=r,g=rw,o=wx"],[717,"1315","001011001101","u=r,g=rw,o=w"],[718,"1316","001011001110","u=r,g=rw,o=x"],[719,"1317","001011001111","u=r,g=rw,o="],[720,"1320","001011010000","u=r,g=rx,o=rwx"],[721,"1321","001011010001","u=r,g=rx,o=rw"],[722,"1322","001011010010","u=r,g=rx,o=rx"],[723,"1323","001011010011","u=r,g=rx,o=r"],[724,"1324","001011010100","u=r,g=rx,o=wx"],[725,"1325","001011010101","u=r,g=rx,o=w"],[726,"1326","001011010110","u=r,g=rx,o=x"],[727,"1327","001011010111","u=r,g=rx,o="],[728,"1330","001011011000","u=r,g=r,o=rwx"],[729,"1331","001011011001","u=r,g=r,o=rw"],[730,"1332","001011011010","u=r,g=r,o=rx"],[731,"1333","001011011011","u=r,g=r,o=r"],[732,"1334","001011011100","u=r,g=r,o=wx"],[733,"1335","001011011101","u=r,g=r,o=w"],[734,"1336","001011011110","u=r,g=r,o=x"],[735,"1337","001011011111","u=r,g=r,o="],[736,"1340","001011100000","u=r,g=wx,o=rwx"],[737,"1341","001011100001","u=r,g=wx,o=rw"],[738,"1342","001011100010","u=r,g=wx,o=rx"],[739,"1343","001011100011","u=r,g=wx,o=r"],[740,"1344","001011100100","u=r,g=wx,o=wx"],[741,"1345","001011100101","u=r,g=wx,o=w"],[742,"1346","001011100110","u=r,g=wx,o=x"],[743,"1347","001011100111","u=r,g=wx,o="],[744,"1350","001011101000","u=r,g=w,o=rwx"],[745,"1351","001011101001","u=r,g=w,o=rw"],[746,"1352","001011101010","u=r,g=w,o=rx"],[747,"1353","001011101011","u=r,g=w,o=r"],[748,"1354","001011101100","u=r,g=w,o=wx"],[749,"1355","001011101101","u=r,g=w,o=w"],[750,"1356","001011101110","u=r,g=w,o=x"],[751,"1357","001011101111","u=r,g=w,o="],[752,"1360","001011110000","u=r,g=x,o=rwx"],[753,"1361","001011110001","u=r,g=x,o=rw"],[754,"1362","001011110010","u=r,g=x,o=rx"],[755,"1363","001011110011","u=r,g=x,o=r"],[756,"1364","001011110100","u=r,g=x,o=wx"],[757,"1365","001011110101","u=r,g=x,o=w"],[758,"1366","001011110110","u=r,g=x,o=x"],[759,"1367","001011110111","u=r,g=x,o="],[760,"1370","001011111000","u=r,g=,o=rwx"],[761,"1371","001011111001","u=r,g=,o=rw"],[762,"1372","001011111010","u=r,g=,o=rx"],[763,"1373","001011111011","u=r,g=,o=r"],[764,"1374","001011111100","u=r,g=,o=wx"],[765,"1375","001011111101","u=r,g=,o=w"],[766,"1376","001011111110","u=r,g=,o=x"],[767,"1377","001011111111","u=r,g=,o="],[768,"1400","001100000000","u=wx,g=rwx,o=rwx"],[769,"1401","001100000001","u=wx,g=rwx,o=rw"],[770,"1402","001100000010","u=wx,g=rwx,o=rx"],[771,"1403","001100000011","u=wx,g=rwx,o=r"],[772,"1404","001100000100","u=wx,g=rwx,o=wx"],[773,"1405","001100000101","u=wx,g=rwx,o=w"],[774,"1406","001100000110","u=wx,g=rwx,o=x"],[775,"1407","001100000111","u=wx,g=rwx,o="],[776,"1410","001100001000","u=wx,g=rw,o=rwx"],[777,"1411","001100001001","u=wx,g=rw,o=rw"],[778,"1412","001100001010","u=wx,g=rw,o=rx"],[779,"1413","001100001011","u=wx,g=rw,o=r"],[780,"1414","001100001100","u=wx,g=rw,o=wx"],[781,"1415","001100001101","u=wx,g=rw,o=w"],[782,"1416","001100001110","u=wx,g=rw,o=x"],[783,"1417","001100001111","u=wx,g=rw,o="],[784,"1420","001100010000","u=wx,g=rx,o=rwx"],[785,"1421","001100010001","u=wx,g=rx,o=rw"],[786,"1422","001100010010","u=wx,g=rx,o=rx"],[787,"1423","001100010011","u=wx,g=rx,o=r"],[788,"1424","001100010100","u=wx,g=rx,o=wx"],[789,"1425","001100010101","u=wx,g=rx,o=w"],[790,"1426","001100010110","u=wx,g=rx,o=x"],[791,"1427","001100010111","u=wx,g=rx,o="],[792,"1430","001100011000","u=wx,g=r,o=rwx"],[793,"1431","001100011001","u=wx,g=r,o=rw"],[794,"1432","001100011010","u=wx,g=r,o=rx"],[795,"1433","001100011011","u=wx,g=r,o=r"],[796,"1434","001100011100","u=wx,g=r,o=wx"],[797,"1435","001100011101","u=wx,g=r,o=w"],[798,"1436","001100011110","u=wx,g=r,o=x"],[799,"1437","001100011111","u=wx,g=r,o="],[800,"1440","001100100000","u=wx,g=wx,o=rwx"],[801,"1441","001100100001","u=wx,g=wx,o=rw"],[802,"1442","001100100010","u=wx,g=wx,o=rx"],[803,"1443","001100100011","u=wx,g=wx,o=r"],[804,"1444","001100100100","u=wx,g=wx,o=wx"],[805,"1445","001100100101","u=wx,g=wx,o=w"],[806,"1446","001100100110","u=wx,g=wx,o=x"],[807,"1447","001100100111","u=wx,g=wx,o="],[808,"1450","001100101000","u=wx,g=w,o=rwx"],[809,"1451","001100101001","u=wx,g=w,o=rw"],[810,"1452","001100101010","u=wx,g=w,o=rx"],[811,"1453","001100101011","u=wx,g=w,o=r"],[812,"1454","001100101100","u=wx,g=w,o=wx"],[813,"1455","001100101101","u=wx,g=w,o=w"],[814,"1456","001100101110","u=wx,g=w,o=x"],[815,"1457","001100101111","u=wx,g=w,o="],[816,"1460","001100110000","u=wx,g=x,o=rwx"],[817,"1461","001100110001","u=wx,g=x,o=rw"],[818,"1462","001100110010","u=wx,g=x,o=rx"],[819,"1463","001100110011","u=wx,g=x,o=r"],[820,"1464","001100110100","u=wx,g=x,o=wx"],[821,"1465","001100110101","u=wx,g=x,o=w"],[822,"1466","001100110110","u=wx,g=x,o=x"],[823,"1467","001100110111","u=wx,g=x,o="],[824,"1470","001100111000","u=wx,g=,o=rwx"],[825,"1471","001100111001","u=wx,g=,o=rw"],[826,"1472","001100111010","u=wx,g=,o=rx"],[827,"1473","001100111011","u=wx,g=,o=r"],[828,"1474","001100111100","u=wx,g=,o=wx"],[829,"1475","001100111101","u=wx,g=,o=w"],[830,"1476","001100111110","u=wx,g=,o=x"],[831,"1477","001100111111","u=wx,g=,o="],[832,"1500","001101000000","u=w,g=rwx,o=rwx"],[833,"1501","001101000001","u=w,g=rwx,o=rw"],[834,"1502","001101000010","u=w,g=rwx,o=rx"],[835,"1503","001101000011","u=w,g=rwx,o=r"],[836,"1504","001101000100","u=w,g=rwx,o=wx"],[837,"1505","001101000101","u=w,g=rwx,o=w"],[838,"1506","001101000110","u=w,g=rwx,o=x"],[839,"1507","001101000111","u=w,g=rwx,o="],[840,"1510","001101001000","u=w,g=rw,o=rwx"],[841,"1511","001101001001","u=w,g=rw,o=rw"],[842,"1512","001101001010","u=w,g=rw,o=rx"],[843,"1513","001101001011","u=w,g=rw,o=r"],[844,"1514","001101001100","u=w,g=rw,o=wx"],[845,"1515","001101001101","u=w,g=rw,o=w"],[846,"1516","001101001110","u=w,g=rw,o=x"],[847,"1517","001101001111","u=w,g=rw,o="],[848,"1520","001101010000","u=w,g=rx,o=rwx"],[849,"1521","001101010001","u=w,g=rx,o=rw"],[850,"1522","001101010010","u=w,g=rx,o=rx"],[851,"1523","001101010011","u=w,g=rx,o=r"],[852,"1524","001101010100","u=w,g=rx,o=wx"],[853,"1525","001101010101","u=w,g=rx,o=w"],[854,"1526","001101010110","u=w,g=rx,o=x"],[855,"1527","001101010111","u=w,g=rx,o="],[856,"1530","001101011000","u=w,g=r,o=rwx"],[857,"1531","001101011001","u=w,g=r,o=rw"],[858,"1532","001101011010","u=w,g=r,o=rx"],[859,"1533","001101011011","u=w,g=r,o=r"],[860,"1534","001101011100","u=w,g=r,o=wx"],[861,"1535","001101011101","u=w,g=r,o=w"],[862,"1536","001101011110","u=w,g=r,o=x"],[863,"1537","001101011111","u=w,g=r,o="],[864,"1540","001101100000","u=w,g=wx,o=rwx"],[865,"1541","001101100001","u=w,g=wx,o=rw"],[866,"1542","001101100010","u=w,g=wx,o=rx"],[867,"1543","001101100011","u=w,g=wx,o=r"],[868,"1544","001101100100","u=w,g=wx,o=wx"],[869,"1545","001101100101","u=w,g=wx,o=w"],[870,"1546","001101100110","u=w,g=wx,o=x"],[871,"1547","001101100111","u=w,g=wx,o="],[872,"1550","001101101000","u=w,g=w,o=rwx"],[873,"1551","001101101001","u=w,g=w,o=rw"],[874,"1552","001101101010","u=w,g=w,o=rx"],[875,"1553","001101101011","u=w,g=w,o=r"],[876,"1554","001101101100","u=w,g=w,o=wx"],[877,"1555","001101101101","u=w,g=w,o=w"],[878,"1556","001101101110","u=w,g=w,o=x"],[879,"1557","001101101111","u=w,g=w,o="],[880,"1560","001101110000","u=w,g=x,o=rwx"],[881,"1561","001101110001","u=w,g=x,o=rw"],[882,"1562","001101110010","u=w,g=x,o=rx"],[883,"1563","001101110011","u=w,g=x,o=r"],[884,"1564","001101110100","u=w,g=x,o=wx"],[885,"1565","001101110101","u=w,g=x,o=w"],[886,"1566","001101110110","u=w,g=x,o=x"],[887,"1567","001101110111","u=w,g=x,o="],[888,"1570","001101111000","u=w,g=,o=rwx"],[889,"1571","001101111001","u=w,g=,o=rw"],[890,"1572","001101111010","u=w,g=,o=rx"],[891,"1573","001101111011","u=w,g=,o=r"],[892,"1574","001101111100","u=w,g=,o=wx"],[893,"1575","001101111101","u=w,g=,o=w"],[894,"1576","001101111110","u=w,g=,o=x"],[895,"1577","001101111111","u=w,g=,o="],[896,"1600","001110000000","u=x,g=rwx,o=rwx"],[897,"1601","001110000001","u=x,g=rwx,o=rw"],[898,"1602","001110000010","u=x,g=rwx,o=rx"],[899,"1603","001110000011","u=x,g=rwx,o=r"],[900,"1604","001110000100","u=x,g=rwx,o=wx"],[901,"1605","001110000101","u=x,g=rwx,o=w"],[902,"1606","001110000110","u=x,g=rwx,o=x"],[903,"1607","001110000111","u=x,g=rwx,o="],[904,"1610","001110001000","u=x,g=rw,o=rwx"],[905,"1611","001110001001","u=x,g=rw,o=rw"],[906,"1612","001110001010","u=x,g=rw,o=rx"],[907,"1613","001110001011","u=x,g=rw,o=r"],[908,"1614","001110001100","u=x,g=rw,o=wx"],[909,"1615","001110001101","u=x,g=rw,o=w"],[910,"1616","001110001110","u=x,g=rw,o=x"],[911,"1617","001110001111","u=x,g=rw,o="],[912,"1620","001110010000","u=x,g=rx,o=rwx"],[913,"1621","001110010001","u=x,g=rx,o=rw"],[914,"1622","001110010010","u=x,g=rx,o=rx"],[915,"1623","001110010011","u=x,g=rx,o=r"],[916,"1624","001110010100","u=x,g=rx,o=wx"],[917,"1625","001110010101","u=x,g=rx,o=w"],[918,"1626","001110010110","u=x,g=rx,o=x"],[919,"1627","001110010111","u=x,g=rx,o="],[920,"1630","001110011000","u=x,g=r,o=rwx"],[921,"1631","001110011001","u=x,g=r,o=rw"],[922,"1632","001110011010","u=x,g=r,o=rx"],[923,"1633","001110011011","u=x,g=r,o=r"],[924,"1634","001110011100","u=x,g=r,o=wx"],[925,"1635","001110011101","u=x,g=r,o=w"],[926,"1636","001110011110","u=x,g=r,o=x"],[927,"1637","001110011111","u=x,g=r,o="],[928,"1640","001110100000","u=x,g=wx,o=rwx"],[929,"1641","001110100001","u=x,g=wx,o=rw"],[930,"1642","001110100010","u=x,g=wx,o=rx"],[931,"1643","001110100011","u=x,g=wx,o=r"],[932,"1644","001110100100","u=x,g=wx,o=wx"],[933,"1645","001110100101","u=x,g=wx,o=w"],[934,"1646","001110100110","u=x,g=wx,o=x"],[935,"1647","001110100111","u=x,g=wx,o="],[936,"1650","001110101000","u=x,g=w,o=rwx"],[937,"1651","001110101001","u=x,g=w,o=rw"],[938,"1652","001110101010","u=x,g=w,o=rx"],[939,"1653","001110101011","u=x,g=w,o=r"],[940,"1654","001110101100","u=x,g=w,o=wx"],[941,"1655","001110101101","u=x,g=w,o=w"],[942,"1656","001110101110","u=x,g=w,o=x"],[943,"1657","001110101111","u=x,g=w,o="],[944,"1660","001110110000","u=x,g=x,o=rwx"],[945,"1661","001110110001","u=x,g=x,o=rw"],[946,"1662","001110110010","u=x,g=x,o=rx"],[947,"1663","001110110011","u=x,g=x,o=r"],[948,"1664","001110110100","u=x,g=x,o=wx"],[949,"1665","001110110101","u=x,g=x,o=w"],[950,"1666","001110110110","u=x,g=x,o=x"],[951,"1667","001110110111","u=x,g=x,o="],[952,"1670","001110111000","u=x,g=,o=rwx"],[953,"1671","001110111001","u=x,g=,o=rw"],[954,"1672","001110111010","u=x,g=,o=rx"],[955,"1673","001110111011","u=x,g=,o=r"],[956,"1674","001110111100","u=x,g=,o=wx"],[957,"1675","001110111101","u=x,g=,o=w"],[958,"1676","001110111110","u=x,g=,o=x"],[959,"1677","001110111111","u=x,g=,o="],[960,"1700","001111000000","u=,g=rwx,o=rwx"],[961,"1701","001111000001","u=,g=rwx,o=rw"],[962,"1702","001111000010","u=,g=rwx,o=rx"],[963,"1703","001111000011","u=,g=rwx,o=r"],[964,"1704","001111000100","u=,g=rwx,o=wx"],[965,"1705","001111000101","u=,g=rwx,o=w"],[966,"1706","001111000110","u=,g=rwx,o=x"],[967,"1707","001111000111","u=,g=rwx,o="],[968,"1710","001111001000","u=,g=rw,o=rwx"],[969,"1711","001111001001","u=,g=rw,o=rw"],[970,"1712","001111001010","u=,g=rw,o=rx"],[971,"1713","001111001011","u=,g=rw,o=r"],[972,"1714","001111001100","u=,g=rw,o=wx"],[973,"1715","001111001101","u=,g=rw,o=w"],[974,"1716","001111001110","u=,g=rw,o=x"],[975,"1717","001111001111","u=,g=rw,o="],[976,"1720","001111010000","u=,g=rx,o=rwx"],[977,"1721","001111010001","u=,g=rx,o=rw"],[978,"1722","001111010010","u=,g=rx,o=rx"],[979,"1723","001111010011","u=,g=rx,o=r"],[980,"1724","001111010100","u=,g=rx,o=wx"],[981,"1725","001111010101","u=,g=rx,o=w"],[982,"1726","001111010110","u=,g=rx,o=x"],[983,"1727","001111010111","u=,g=rx,o="],[984,"1730","001111011000","u=,g=r,o=rwx"],[985,"1731","001111011001","u=,g=r,o=rw"],[986,"1732","001111011010","u=,g=r,o=rx"],[987,"1733","001111011011","u=,g=r,o=r"],[988,"1734","001111011100","u=,g=r,o=wx"],[989,"1735","001111011101","u=,g=r,o=w"],[990,"1736","001111011110","u=,g=r,o=x"],[991,"1737","001111011111","u=,g=r,o="],[992,"1740","001111100000","u=,g=wx,o=rwx"],[993,"1741","001111100001","u=,g=wx,o=rw"],[994,"1742","001111100010","u=,g=wx,o=rx"],[995,"1743","001111100011","u=,g=wx,o=r"],[996,"1744","001111100100","u=,g=wx,o=wx"],[997,"1745","001111100101","u=,g=wx,o=w"],[998,"1746","001111100110","u=,g=wx,o=x"],[999,"1747","001111100111","u=,g=wx,o="],[1000,"1750","001111101000","u=,g=w,o=rwx"],[1001,"1751","001111101001","u=,g=w,o=rw"],[1002,"1752","001111101010","u=,g=w,o=rx"],[1003,"1753","001111101011","u=,g=w,o=r"],[1004,"1754","001111101100","u=,g=w,o=wx"],[1005,"1755","001111101101","u=,g=w,o=w"],[1006,"1756","001111101110","u=,g=w,o=x"],[1007,"1757","001111101111","u=,g=w,o="],[1008,"1760","001111110000","u=,g=x,o=rwx"],[1009,"1761","001111110001","u=,g=x,o=rw"],[1010,"1762","001111110010","u=,g=x,o=rx"],[1011,"1763","001111110011","u=,g=x,o=r"],[1012,"1764","001111110100","u=,g=x,o=wx"],[1013,"1765","001111110101","u=,g=x,o=w"],[1014,"1766","001111110110","u=,g=x,o=x"],[1015,"1767","001111110111","u=,g=x,o="],[1016,"1770","001111111000","u=,g=,o=rwx"],[1017,"1771","001111111001","u=,g=,o=rw"],[1018,"1772","001111111010","u=,g=,o=rx"],[1019,"1773","001111111011","u=,g=,o=r"],[1020,"1774","001111111100","u=,g=,o=wx"],[1021,"1775","001111111101","u=,g=,o=w"],[1022,"1776","001111111110","u=,g=,o=x"],[1023,"1777","001111111111","u=,g=,o="],[1024,"2000","010000000000","u=rwx,g=rwx,o=rwx"],[1025,"2001","010000000001","u=rwx,g=rwx,o=rw"],[1026,"2002","010000000010","u=rwx,g=rwx,o=rx"],[1027,"2003","010000000011","u=rwx,g=rwx,o=r"],[1028,"2004","010000000100","u=rwx,g=rwx,o=wx"],[1029,"2005","010000000101","u=rwx,g=rwx,o=w"],[1030,"2006","010000000110","u=rwx,g=rwx,o=x"],[1031,"2007","010000000111","u=rwx,g=rwx,o="],[1032,"2010","010000001000","u=rwx,g=rw,o=rwx"],[1033,"2011","010000001001","u=rwx,g=rw,o=rw"],[1034,"2012","010000001010","u=rwx,g=rw,o=rx"],[1035,"2013","010000001011","u=rwx,g=rw,o=r"],[1036,"2014","010000001100","u=rwx,g=rw,o=wx"],[1037,"2015","010000001101","u=rwx,g=rw,o=w"],[1038,"2016","010000001110","u=rwx,g=rw,o=x"],[1039,"2017","010000001111","u=rwx,g=rw,o="],[1040,"2020","010000010000","u=rwx,g=rx,o=rwx"],[1041,"2021","010000010001","u=rwx,g=rx,o=rw"],[1042,"2022","010000010010","u=rwx,g=rx,o=rx"],[1043,"2023","010000010011","u=rwx,g=rx,o=r"],[1044,"2024","010000010100","u=rwx,g=rx,o=wx"],[1045,"2025","010000010101","u=rwx,g=rx,o=w"],[1046,"2026","010000010110","u=rwx,g=rx,o=x"],[1047,"2027","010000010111","u=rwx,g=rx,o="],[1048,"2030","010000011000","u=rwx,g=r,o=rwx"],[1049,"2031","010000011001","u=rwx,g=r,o=rw"],[1050,"2032","010000011010","u=rwx,g=r,o=rx"],[1051,"2033","010000011011","u=rwx,g=r,o=r"],[1052,"2034","010000011100","u=rwx,g=r,o=wx"],[1053,"2035","010000011101","u=rwx,g=r,o=w"],[1054,"2036","010000011110","u=rwx,g=r,o=x"],[1055,"2037","010000011111","u=rwx,g=r,o="],[1056,"2040","010000100000","u=rwx,g=wx,o=rwx"],[1057,"2041","010000100001","u=rwx,g=wx,o=rw"],[1058,"2042","010000100010","u=rwx,g=wx,o=rx"],[1059,"2043","010000100011","u=rwx,g=wx,o=r"],[1060,"2044","010000100100","u=rwx,g=wx,o=wx"],[1061,"2045","010000100101","u=rwx,g=wx,o=w"],[1062,"2046","010000100110","u=rwx,g=wx,o=x"],[1063,"2047","010000100111","u=rwx,g=wx,o="],[1064,"2050","010000101000","u=rwx,g=w,o=rwx"],[1065,"2051","010000101001","u=rwx,g=w,o=rw"],[1066,"2052","010000101010","u=rwx,g=w,o=rx"],[1067,"2053","010000101011","u=rwx,g=w,o=r"],[1068,"2054","010000101100","u=rwx,g=w,o=wx"],[1069,"2055","010000101101","u=rwx,g=w,o=w"],[1070,"2056","010000101110","u=rwx,g=w,o=x"],[1071,"2057","010000101111","u=rwx,g=w,o="],[1072,"2060","010000110000","u=rwx,g=x,o=rwx"],[1073,"2061","010000110001","u=rwx,g=x,o=rw"],[1074,"2062","010000110010","u=rwx,g=x,o=rx"],[1075,"2063","010000110011","u=rwx,g=x,o=r"],[1076,"2064","010000110100","u=rwx,g=x,o=wx"],[1077,"2065","010000110101","u=rwx,g=x,o=w"],[1078,"2066","010000110110","u=rwx,g=x,o=x"],[1079,"2067","010000110111","u=rwx,g=x,o="],[1080,"2070","010000111000","u=rwx,g=,o=rwx"],[1081,"2071","010000111001","u=rwx,g=,o=rw"],[1082,"2072","010000111010","u=rwx,g=,o=rx"],[1083,"2073","010000111011","u=rwx,g=,o=r"],[1084,"2074","010000111100","u=rwx,g=,o=wx"],[1085,"2075","010000111101","u=rwx,g=,o=w"],[1086,"2076","010000111110","u=rwx,g=,o=x"],[1087,"2077","010000111111","u=rwx,g=,o="],[1088,"2100","010001000000","u=rw,g=rwx,o=rwx"],[1089,"2101","010001000001","u=rw,g=rwx,o=rw"],[1090,"2102","010001000010","u=rw,g=rwx,o=rx"],[1091,"2103","010001000011","u=rw,g=rwx,o=r"],[1092,"2104","010001000100","u=rw,g=rwx,o=wx"],[1093,"2105","010001000101","u=rw,g=rwx,o=w"],[1094,"2106","010001000110","u=rw,g=rwx,o=x"],[1095,"2107","010001000111","u=rw,g=rwx,o="],[1096,"2110","010001001000","u=rw,g=rw,o=rwx"],[1097,"2111","010001001001","u=rw,g=rw,o=rw"],[1098,"2112","010001001010","u=rw,g=rw,o=rx"],[1099,"2113","010001001011","u=rw,g=rw,o=r"],[1100,"2114","010001001100","u=rw,g=rw,o=wx"],[1101,"2115","010001001101","u=rw,g=rw,o=w"],[1102,"2116","010001001110","u=rw,g=rw,o=x"],[1103,"2117","010001001111","u=rw,g=rw,o="],[1104,"2120","010001010000","u=rw,g=rx,o=rwx"],[1105,"2121","010001010001","u=rw,g=rx,o=rw"],[1106,"2122","010001010010","u=rw,g=rx,o=rx"],[1107,"2123","010001010011","u=rw,g=rx,o=r"],[1108,"2124","010001010100","u=rw,g=rx,o=wx"],[1109,"2125","010001010101","u=rw,g=rx,o=w"],[1110,"2126","010001010110","u=rw,g=rx,o=x"],[1111,"2127","010001010111","u=rw,g=rx,o="],[1112,"2130","010001011000","u=rw,g=r,o=rwx"],[1113,"2131","010001011001","u=rw,g=r,o=rw"],[1114,"2132","010001011010","u=rw,g=r,o=rx"],[1115,"2133","010001011011","u=rw,g=r,o=r"],[1116,"2134","010001011100","u=rw,g=r,o=wx"],[1117,"2135","010001011101","u=rw,g=r,o=w"],[1118,"2136","010001011110","u=rw,g=r,o=x"],[1119,"2137","010001011111","u=rw,g=r,o="],[1120,"2140","010001100000","u=rw,g=wx,o=rwx"],[1121,"2141","010001100001","u=rw,g=wx,o=rw"],[1122,"2142","010001100010","u=rw,g=wx,o=rx"],[1123,"2143","010001100011","u=rw,g=wx,o=r"],[1124,"2144","010001100100","u=rw,g=wx,o=wx"],[1125,"2145","010001100101","u=rw,g=wx,o=w"],[1126,"2146","010001100110","u=rw,g=wx,o=x"],[1127,"2147","010001100111","u=rw,g=wx,o="],[1128,"2150","010001101000","u=rw,g=w,o=rwx"],[1129,"2151","010001101001","u=rw,g=w,o=rw"],[1130,"2152","010001101010","u=rw,g=w,o=rx"],[1131,"2153","010001101011","u=rw,g=w,o=r"],[1132,"2154","010001101100","u=rw,g=w,o=wx"],[1133,"2155","010001101101","u=rw,g=w,o=w"],[1134,"2156","010001101110","u=rw,g=w,o=x"],[1135,"2157","010001101111","u=rw,g=w,o="],[1136,"2160","010001110000","u=rw,g=x,o=rwx"],[1137,"2161","010001110001","u=rw,g=x,o=rw"],[1138,"2162","010001110010","u=rw,g=x,o=rx"],[1139,"2163","010001110011","u=rw,g=x,o=r"],[1140,"2164","010001110100","u=rw,g=x,o=wx"],[1141,"2165","010001110101","u=rw,g=x,o=w"],[1142,"2166","010001110110","u=rw,g=x,o=x"],[1143,"2167","010001110111","u=rw,g=x,o="],[1144,"2170","010001111000","u=rw,g=,o=rwx"],[1145,"2171","010001111001","u=rw,g=,o=rw"],[1146,"2172","010001111010","u=rw,g=,o=rx"],[1147,"2173","010001111011","u=rw,g=,o=r"],[1148,"2174","010001111100","u=rw,g=,o=wx"],[1149,"2175","010001111101","u=rw,g=,o=w"],[1150,"2176","010001111110","u=rw,g=,o=x"],[1151,"2177","010001111111","u=rw,g=,o="],[1152,"2200","010010000000","u=rx,g=rwx,o=rwx"],[1153,"2201","010010000001","u=rx,g=rwx,o=rw"],[1154,"2202","010010000010","u=rx,g=rwx,o=rx"],[1155,"2203","010010000011","u=rx,g=rwx,o=r"],[1156,"2204","010010000100","u=rx,g=rwx,o=wx"],[1157,"2205","010010000101","u=rx,g=rwx,o=w"],[1158,"2206","010010000110","u=rx,g=rwx,o=x"],[1159,"2207","010010000111","u=rx,g=rwx,o="],[1160,"2210","010010001000","u=rx,g=rw,o=rwx"],[1161,"2211","010010001001","u=rx,g=rw,o=rw"],[1162,"2212","010010001010","u=rx,g=rw,o=rx"],[1163,"2213","010010001011","u=rx,g=rw,o=r"],[1164,"2214","010010001100","u=rx,g=rw,o=wx"],[1165,"2215","010010001101","u=rx,g=rw,o=w"],[1166,"2216","010010001110","u=rx,g=rw,o=x"],[1167,"2217","010010001111","u=rx,g=rw,o="],[1168,"2220","010010010000","u=rx,g=rx,o=rwx"],[1169,"2221","010010010001","u=rx,g=rx,o=rw"],[1170,"2222","010010010010","u=rx,g=rx,o=rx"],[1171,"2223","010010010011","u=rx,g=rx,o=r"],[1172,"2224","010010010100","u=rx,g=rx,o=wx"],[1173,"2225","010010010101","u=rx,g=rx,o=w"],[1174,"2226","010010010110","u=rx,g=rx,o=x"],[1175,"2227","010010010111","u=rx,g=rx,o="],[1176,"2230","010010011000","u=rx,g=r,o=rwx"],[1177,"2231","010010011001","u=rx,g=r,o=rw"],[1178,"2232","010010011010","u=rx,g=r,o=rx"],[1179,"2233","010010011011","u=rx,g=r,o=r"],[1180,"2234","010010011100","u=rx,g=r,o=wx"],[1181,"2235","010010011101","u=rx,g=r,o=w"],[1182,"2236","010010011110","u=rx,g=r,o=x"],[1183,"2237","010010011111","u=rx,g=r,o="],[1184,"2240","010010100000","u=rx,g=wx,o=rwx"],[1185,"2241","010010100001","u=rx,g=wx,o=rw"],[1186,"2242","010010100010","u=rx,g=wx,o=rx"],[1187,"2243","010010100011","u=rx,g=wx,o=r"],[1188,"2244","010010100100","u=rx,g=wx,o=wx"],[1189,"2245","010010100101","u=rx,g=wx,o=w"],[1190,"2246","010010100110","u=rx,g=wx,o=x"],[1191,"2247","010010100111","u=rx,g=wx,o="],[1192,"2250","010010101000","u=rx,g=w,o=rwx"],[1193,"2251","010010101001","u=rx,g=w,o=rw"],[1194,"2252","010010101010","u=rx,g=w,o=rx"],[1195,"2253","010010101011","u=rx,g=w,o=r"],[1196,"2254","010010101100","u=rx,g=w,o=wx"],[1197,"2255","010010101101","u=rx,g=w,o=w"],[1198,"2256","010010101110","u=rx,g=w,o=x"],[1199,"2257","010010101111","u=rx,g=w,o="],[1200,"2260","010010110000","u=rx,g=x,o=rwx"],[1201,"2261","010010110001","u=rx,g=x,o=rw"],[1202,"2262","010010110010","u=rx,g=x,o=rx"],[1203,"2263","010010110011","u=rx,g=x,o=r"],[1204,"2264","010010110100","u=rx,g=x,o=wx"],[1205,"2265","010010110101","u=rx,g=x,o=w"],[1206,"2266","010010110110","u=rx,g=x,o=x"],[1207,"2267","010010110111","u=rx,g=x,o="],[1208,"2270","010010111000","u=rx,g=,o=rwx"],[1209,"2271","010010111001","u=rx,g=,o=rw"],[1210,"2272","010010111010","u=rx,g=,o=rx"],[1211,"2273","010010111011","u=rx,g=,o=r"],[1212,"2274","010010111100","u=rx,g=,o=wx"],[1213,"2275","010010111101","u=rx,g=,o=w"],[1214,"2276","010010111110","u=rx,g=,o=x"],[1215,"2277","010010111111","u=rx,g=,o="],[1216,"2300","010011000000","u=r,g=rwx,o=rwx"],[1217,"2301","010011000001","u=r,g=rwx,o=rw"],[1218,"2302","010011000010","u=r,g=rwx,o=rx"],[1219,"2303","010011000011","u=r,g=rwx,o=r"],[1220,"2304","010011000100","u=r,g=rwx,o=wx"],[1221,"2305","010011000101","u=r,g=rwx,o=w"],[1222,"2306","010011000110","u=r,g=rwx,o=x"],[1223,"2307","010011000111","u=r,g=rwx,o="],[1224,"2310","010011001000","u=r,g=rw,o=rwx"],[1225,"2311","010011001001","u=r,g=rw,o=rw"],[1226,"2312","010011001010","u=r,g=rw,o=rx"],[1227,"2313","010011001011","u=r,g=rw,o=r"],[1228,"2314","010011001100","u=r,g=rw,o=wx"],[1229,"2315","010011001101","u=r,g=rw,o=w"],[1230,"2316","010011001110","u=r,g=rw,o=x"],[1231,"2317","010011001111","u=r,g=rw,o="],[1232,"2320","010011010000","u=r,g=rx,o=rwx"],[1233,"2321","010011010001","u=r,g=rx,o=rw"],[1234,"2322","010011010010","u=r,g=rx,o=rx"],[1235,"2323","010011010011","u=r,g=rx,o=r"],[1236,"2324","010011010100","u=r,g=rx,o=wx"],[1237,"2325","010011010101","u=r,g=rx,o=w"],[1238,"2326","010011010110","u=r,g=rx,o=x"],[1239,"2327","010011010111","u=r,g=rx,o="],[1240,"2330","010011011000","u=r,g=r,o=rwx"],[1241,"2331","010011011001","u=r,g=r,o=rw"],[1242,"2332","010011011010","u=r,g=r,o=rx"],[1243,"2333","010011011011","u=r,g=r,o=r"],[1244,"2334","010011011100","u=r,g=r,o=wx"],[1245,"2335","010011011101","u=r,g=r,o=w"],[1246,"2336","010011011110","u=r,g=r,o=x"],[1247,"2337","010011011111","u=r,g=r,o="],[1248,"2340","010011100000","u=r,g=wx,o=rwx"],[1249,"2341","010011100001","u=r,g=wx,o=rw"],[1250,"2342","010011100010","u=r,g=wx,o=rx"],[1251,"2343","010011100011","u=r,g=wx,o=r"],[1252,"2344","010011100100","u=r,g=wx,o=wx"],[1253,"2345","010011100101","u=r,g=wx,o=w"],[1254,"2346","010011100110","u=r,g=wx,o=x"],[1255,"2347","010011100111","u=r,g=wx,o="],[1256,"2350","010011101000","u=r,g=w,o=rwx"],[1257,"2351","010011101001","u=r,g=w,o=rw"],[1258,"2352","010011101010","u=r,g=w,o=rx"],[1259,"2353","010011101011","u=r,g=w,o=r"],[1260,"2354","010011101100","u=r,g=w,o=wx"],[1261,"2355","010011101101","u=r,g=w,o=w"],[1262,"2356","010011101110","u=r,g=w,o=x"],[1263,"2357","010011101111","u=r,g=w,o="],[1264,"2360","010011110000","u=r,g=x,o=rwx"],[1265,"2361","010011110001","u=r,g=x,o=rw"],[1266,"2362","010011110010","u=r,g=x,o=rx"],[1267,"2363","010011110011","u=r,g=x,o=r"],[1268,"2364","010011110100","u=r,g=x,o=wx"],[1269,"2365","010011110101","u=r,g=x,o=w"],[1270,"2366","010011110110","u=r,g=x,o=x"],[1271,"2367","010011110111","u=r,g=x,o="],[1272,"2370","010011111000","u=r,g=,o=rwx"],[1273,"2371","010011111001","u=r,g=,o=rw"],[1274,"2372","010011111010","u=r,g=,o=rx"],[1275,"2373","010011111011","u=r,g=,o=r"],[1276,"2374","010011111100","u=r,g=,o=wx"],[1277,"2375","010011111101","u=r,g=,o=w"],[1278,"2376","010011111110","u=r,g=,o=x"],[1279,"2377","010011111111","u=r,g=,o="],[1280,"2400","010100000000","u=wx,g=rwx,o=rwx"],[1281,"2401","010100000001","u=wx,g=rwx,o=rw"],[1282,"2402","010100000010","u=wx,g=rwx,o=rx"],[1283,"2403","010100000011","u=wx,g=rwx,o=r"],[1284,"2404","010100000100","u=wx,g=rwx,o=wx"],[1285,"2405","010100000101","u=wx,g=rwx,o=w"],[1286,"2406","010100000110","u=wx,g=rwx,o=x"],[1287,"2407","010100000111","u=wx,g=rwx,o="],[1288,"2410","010100001000","u=wx,g=rw,o=rwx"],[1289,"2411","010100001001","u=wx,g=rw,o=rw"],[1290,"2412","010100001010","u=wx,g=rw,o=rx"],[1291,"2413","010100001011","u=wx,g=rw,o=r"],[1292,"2414","010100001100","u=wx,g=rw,o=wx"],[1293,"2415","010100001101","u=wx,g=rw,o=w"],[1294,"2416","010100001110","u=wx,g=rw,o=x"],[1295,"2417","010100001111","u=wx,g=rw,o="],[1296,"2420","010100010000","u=wx,g=rx,o=rwx"],[1297,"2421","010100010001","u=wx,g=rx,o=rw"],[1298,"2422","010100010010","u=wx,g=rx,o=rx"],[1299,"2423","010100010011","u=wx,g=rx,o=r"],[1300,"2424","010100010100","u=wx,g=rx,o=wx"],[1301,"2425","010100010101","u=wx,g=rx,o=w"],[1302,"2426","010100010110","u=wx,g=rx,o=x"],[1303,"2427","010100010111","u=wx,g=rx,o="],[1304,"2430","010100011000","u=wx,g=r,o=rwx"],[1305,"2431","010100011001","u=wx,g=r,o=rw"],[1306,"2432","010100011010","u=wx,g=r,o=rx"],[1307,"2433","010100011011","u=wx,g=r,o=r"],[1308,"2434","010100011100","u=wx,g=r,o=wx"],[1309,"2435","010100011101","u=wx,g=r,o=w"],[1310,"2436","010100011110","u=wx,g=r,o=x"],[1311,"2437","010100011111","u=wx,g=r,o="],[1312,"2440","010100100000","u=wx,g=wx,o=rwx"],[1313,"2441","010100100001","u=wx,g=wx,o=rw"],[1314,"2442","010100100010","u=wx,g=wx,o=rx"],[1315,"2443","010100100011","u=wx,g=wx,o=r"],[1316,"2444","010100100100","u=wx,g=wx,o=wx"],[1317,"2445","010100100101","u=wx,g=wx,o=w"],[1318,"2446","010100100110","u=wx,g=wx,o=x"],[1319,"2447","010100100111","u=wx,g=wx,o="],[1320,"2450","010100101000","u=wx,g=w,o=rwx"],[1321,"2451","010100101001","u=wx,g=w,o=rw"],[1322,"2452","010100101010","u=wx,g=w,o=rx"],[1323,"2453","010100101011","u=wx,g=w,o=r"],[1324,"2454","010100101100","u=wx,g=w,o=wx"],[1325,"2455","010100101101","u=wx,g=w,o=w"],[1326,"2456","010100101110","u=wx,g=w,o=x"],[1327,"2457","010100101111","u=wx,g=w,o="],[1328,"2460","010100110000","u=wx,g=x,o=rwx"],[1329,"2461","010100110001","u=wx,g=x,o=rw"],[1330,"2462","010100110010","u=wx,g=x,o=rx"],[1331,"2463","010100110011","u=wx,g=x,o=r"],[1332,"2464","010100110100","u=wx,g=x,o=wx"],[1333,"2465","010100110101","u=wx,g=x,o=w"],[1334,"2466","010100110110","u=wx,g=x,o=x"],[1335,"2467","010100110111","u=wx,g=x,o="],[1336,"2470","010100111000","u=wx,g=,o=rwx"],[1337,"2471","010100111001","u=wx,g=,o=rw"],[1338,"2472","010100111010","u=wx,g=,o=rx"],[1339,"2473","010100111011","u=wx,g=,o=r"],[1340,"2474","010100111100","u=wx,g=,o=wx"],[1341,"2475","010100111101","u=wx,g=,o=w"],[1342,"2476","010100111110","u=wx,g=,o=x"],[1343,"2477","010100111111","u=wx,g=,o="],[1344,"2500","010101000000","u=w,g=rwx,o=rwx"],[1345,"2501","010101000001","u=w,g=rwx,o=rw"],[1346,"2502","010101000010","u=w,g=rwx,o=rx"],[1347,"2503","010101000011","u=w,g=rwx,o=r"],[1348,"2504","010101000100","u=w,g=rwx,o=wx"],[1349,"2505","010101000101","u=w,g=rwx,o=w"],[1350,"2506","010101000110","u=w,g=rwx,o=x"],[1351,"2507","010101000111","u=w,g=rwx,o="],[1352,"2510","010101001000","u=w,g=rw,o=rwx"],[1353,"2511","010101001001","u=w,g=rw,o=rw"],[1354,"2512","010101001010","u=w,g=rw,o=rx"],[1355,"2513","010101001011","u=w,g=rw,o=r"],[1356,"2514","010101001100","u=w,g=rw,o=wx"],[1357,"2515","010101001101","u=w,g=rw,o=w"],[1358,"2516","010101001110","u=w,g=rw,o=x"],[1359,"2517","010101001111","u=w,g=rw,o="],[1360,"2520","010101010000","u=w,g=rx,o=rwx"],[1361,"2521","010101010001","u=w,g=rx,o=rw"],[1362,"2522","010101010010","u=w,g=rx,o=rx"],[1363,"2523","010101010011","u=w,g=rx,o=r"],[1364,"2524","010101010100","u=w,g=rx,o=wx"],[1365,"2525","010101010101","u=w,g=rx,o=w"],[1366,"2526","010101010110","u=w,g=rx,o=x"],[1367,"2527","010101010111","u=w,g=rx,o="],[1368,"2530","010101011000","u=w,g=r,o=rwx"],[1369,"2531","010101011001","u=w,g=r,o=rw"],[1370,"2532","010101011010","u=w,g=r,o=rx"],[1371,"2533","010101011011","u=w,g=r,o=r"],[1372,"2534","010101011100","u=w,g=r,o=wx"],[1373,"2535","010101011101","u=w,g=r,o=w"],[1374,"2536","010101011110","u=w,g=r,o=x"],[1375,"2537","010101011111","u=w,g=r,o="],[1376,"2540","010101100000","u=w,g=wx,o=rwx"],[1377,"2541","010101100001","u=w,g=wx,o=rw"],[1378,"2542","010101100010","u=w,g=wx,o=rx"],[1379,"2543","010101100011","u=w,g=wx,o=r"],[1380,"2544","010101100100","u=w,g=wx,o=wx"],[1381,"2545","010101100101","u=w,g=wx,o=w"],[1382,"2546","010101100110","u=w,g=wx,o=x"],[1383,"2547","010101100111","u=w,g=wx,o="],[1384,"2550","010101101000","u=w,g=w,o=rwx"],[1385,"2551","010101101001","u=w,g=w,o=rw"],[1386,"2552","010101101010","u=w,g=w,o=rx"],[1387,"2553","010101101011","u=w,g=w,o=r"],[1388,"2554","010101101100","u=w,g=w,o=wx"],[1389,"2555","010101101101","u=w,g=w,o=w"],[1390,"2556","010101101110","u=w,g=w,o=x"],[1391,"2557","010101101111","u=w,g=w,o="],[1392,"2560","010101110000","u=w,g=x,o=rwx"],[1393,"2561","010101110001","u=w,g=x,o=rw"],[1394,"2562","010101110010","u=w,g=x,o=rx"],[1395,"2563","010101110011","u=w,g=x,o=r"],[1396,"2564","010101110100","u=w,g=x,o=wx"],[1397,"2565","010101110101","u=w,g=x,o=w"],[1398,"2566","010101110110","u=w,g=x,o=x"],[1399,"2567","010101110111","u=w,g=x,o="],[1400,"2570","010101111000","u=w,g=,o=rwx"],[1401,"2571","010101111001","u=w,g=,o=rw"],[1402,"2572","010101111010","u=w,g=,o=rx"],[1403,"2573","010101111011","u=w,g=,o=r"],[1404,"2574","010101111100","u=w,g=,o=wx"],[1405,"2575","010101111101","u=w,g=,o=w"],[1406,"2576","010101111110","u=w,g=,o=x"],[1407,"2577","010101111111","u=w,g=,o="],[1408,"2600","010110000000","u=x,g=rwx,o=rwx"],[1409,"2601","010110000001","u=x,g=rwx,o=rw"],[1410,"2602","010110000010","u=x,g=rwx,o=rx"],[1411,"2603","010110000011","u=x,g=rwx,o=r"],[1412,"2604","010110000100","u=x,g=rwx,o=wx"],[1413,"2605","010110000101","u=x,g=rwx,o=w"],[1414,"2606","010110000110","u=x,g=rwx,o=x"],[1415,"2607","010110000111","u=x,g=rwx,o="],[1416,"2610","010110001000","u=x,g=rw,o=rwx"],[1417,"2611","010110001001","u=x,g=rw,o=rw"],[1418,"2612","010110001010","u=x,g=rw,o=rx"],[1419,"2613","010110001011","u=x,g=rw,o=r"],[1420,"2614","010110001100","u=x,g=rw,o=wx"],[1421,"2615","010110001101","u=x,g=rw,o=w"],[1422,"2616","010110001110","u=x,g=rw,o=x"],[1423,"2617","010110001111","u=x,g=rw,o="],[1424,"2620","010110010000","u=x,g=rx,o=rwx"],[1425,"2621","010110010001","u=x,g=rx,o=rw"],[1426,"2622","010110010010","u=x,g=rx,o=rx"],[1427,"2623","010110010011","u=x,g=rx,o=r"],[1428,"2624","010110010100","u=x,g=rx,o=wx"],[1429,"2625","010110010101","u=x,g=rx,o=w"],[1430,"2626","010110010110","u=x,g=rx,o=x"],[1431,"2627","010110010111","u=x,g=rx,o="],[1432,"2630","010110011000","u=x,g=r,o=rwx"],[1433,"2631","010110011001","u=x,g=r,o=rw"],[1434,"2632","010110011010","u=x,g=r,o=rx"],[1435,"2633","010110011011","u=x,g=r,o=r"],[1436,"2634","010110011100","u=x,g=r,o=wx"],[1437,"2635","010110011101","u=x,g=r,o=w"],[1438,"2636","010110011110","u=x,g=r,o=x"],[1439,"2637","010110011111","u=x,g=r,o="],[1440,"2640","010110100000","u=x,g=wx,o=rwx"],[1441,"2641","010110100001","u=x,g=wx,o=rw"],[1442,"2642","010110100010","u=x,g=wx,o=rx"],[1443,"2643","010110100011","u=x,g=wx,o=r"],[1444,"2644","010110100100","u=x,g=wx,o=wx"],[1445,"2645","010110100101","u=x,g=wx,o=w"],[1446,"2646","010110100110","u=x,g=wx,o=x"],[1447,"2647","010110100111","u=x,g=wx,o="],[1448,"2650","010110101000","u=x,g=w,o=rwx"],[1449,"2651","010110101001","u=x,g=w,o=rw"],[1450,"2652","010110101010","u=x,g=w,o=rx"],[1451,"2653","010110101011","u=x,g=w,o=r"],[1452,"2654","010110101100","u=x,g=w,o=wx"],[1453,"2655","010110101101","u=x,g=w,o=w"],[1454,"2656","010110101110","u=x,g=w,o=x"],[1455,"2657","010110101111","u=x,g=w,o="],[1456,"2660","010110110000","u=x,g=x,o=rwx"],[1457,"2661","010110110001","u=x,g=x,o=rw"],[1458,"2662","010110110010","u=x,g=x,o=rx"],[1459,"2663","010110110011","u=x,g=x,o=r"],[1460,"2664","010110110100","u=x,g=x,o=wx"],[1461,"2665","010110110101","u=x,g=x,o=w"],[1462,"2666","010110110110","u=x,g=x,o=x"],[1463,"2667","010110110111","u=x,g=x,o="],[1464,"2670","010110111000","u=x,g=,o=rwx"],[1465,"2671","010110111001","u=x,g=,o=rw"],[1466,"2672","010110111010","u=x,g=,o=rx"],[1467,"2673","010110111011","u=x,g=,o=r"],[1468,"2674","010110111100","u=x,g=,o=wx"],[1469,"2675","010110111101","u=x,g=,o=w"],[1470,"2676","010110111110","u=x,g=,o=x"],[1471,"2677","010110111111","u=x,g=,o="],[1472,"2700","010111000000","u=,g=rwx,o=rwx"],[1473,"2701","010111000001","u=,g=rwx,o=rw"],[1474,"2702","010111000010","u=,g=rwx,o=rx"],[1475,"2703","010111000011","u=,g=rwx,o=r"],[1476,"2704","010111000100","u=,g=rwx,o=wx"],[1477,"2705","010111000101","u=,g=rwx,o=w"],[1478,"2706","010111000110","u=,g=rwx,o=x"],[1479,"2707","010111000111","u=,g=rwx,o="],[1480,"2710","010111001000","u=,g=rw,o=rwx"],[1481,"2711","010111001001","u=,g=rw,o=rw"],[1482,"2712","010111001010","u=,g=rw,o=rx"],[1483,"2713","010111001011","u=,g=rw,o=r"],[1484,"2714","010111001100","u=,g=rw,o=wx"],[1485,"2715","010111001101","u=,g=rw,o=w"],[1486,"2716","010111001110","u=,g=rw,o=x"],[1487,"2717","010111001111","u=,g=rw,o="],[1488,"2720","010111010000","u=,g=rx,o=rwx"],[1489,"2721","010111010001","u=,g=rx,o=rw"],[1490,"2722","010111010010","u=,g=rx,o=rx"],[1491,"2723","010111010011","u=,g=rx,o=r"],[1492,"2724","010111010100","u=,g=rx,o=wx"],[1493,"2725","010111010101","u=,g=rx,o=w"],[1494,"2726","010111010110","u=,g=rx,o=x"],[1495,"2727","010111010111","u=,g=rx,o="],[1496,"2730","010111011000","u=,g=r,o=rwx"],[1497,"2731","010111011001","u=,g=r,o=rw"],[1498,"2732","010111011010","u=,g=r,o=rx"],[1499,"2733","010111011011","u=,g=r,o=r"],[1500,"2734","010111011100","u=,g=r,o=wx"],[1501,"2735","010111011101","u=,g=r,o=w"],[1502,"2736","010111011110","u=,g=r,o=x"],[1503,"2737","010111011111","u=,g=r,o="],[1504,"2740","010111100000","u=,g=wx,o=rwx"],[1505,"2741","010111100001","u=,g=wx,o=rw"],[1506,"2742","010111100010","u=,g=wx,o=rx"],[1507,"2743","010111100011","u=,g=wx,o=r"],[1508,"2744","010111100100","u=,g=wx,o=wx"],[1509,"2745","010111100101","u=,g=wx,o=w"],[1510,"2746","010111100110","u=,g=wx,o=x"],[1511,"2747","010111100111","u=,g=wx,o="],[1512,"2750","010111101000","u=,g=w,o=rwx"],[1513,"2751","010111101001","u=,g=w,o=rw"],[1514,"2752","010111101010","u=,g=w,o=rx"],[1515,"2753","010111101011","u=,g=w,o=r"],[1516,"2754","010111101100","u=,g=w,o=wx"],[1517,"2755","010111101101","u=,g=w,o=w"],[1518,"2756","010111101110","u=,g=w,o=x"],[1519,"2757","010111101111","u=,g=w,o="],[1520,"2760","010111110000","u=,g=x,o=rwx"],[1521,"2761","010111110001","u=,g=x,o=rw"],[1522,"2762","010111110010","u=,g=x,o=rx"],[1523,"2763","010111110011","u=,g=x,o=r"],[1524,"2764","010111110100","u=,g=x,o=wx"],[1525,"2765","010111110101","u=,g=x,o=w"],[1526,"2766","010111110110","u=,g=x,o=x"],[1527,"2767","010111110111","u=,g=x,o="],[1528,"2770","010111111000","u=,g=,o=rwx"],[1529,"2771","010111111001","u=,g=,o=rw"],[1530,"2772","010111111010","u=,g=,o=rx"],[1531,"2773","010111111011","u=,g=,o=r"],[1532,"2774","010111111100","u=,g=,o=wx"],[1533,"2775","010111111101","u=,g=,o=w"],[1534,"2776","010111111110","u=,g=,o=x"],[1535,"2777","010111111111","u=,g=,o="],[1536,"3000","011000000000","u=rwx,g=rwx,o=rwx"],[1537,"3001","011000000001","u=rwx,g=rwx,o=rw"],[1538,"3002","011000000010","u=rwx,g=rwx,o=rx"],[1539,"3003","011000000011","u=rwx,g=rwx,o=r"],[1540,"3004","011000000100","u=rwx,g=rwx,o=wx"],[1541,"3005","011000000101","u=rwx,g=rwx,o=w"],[1542,"3006","011000000110","u=rwx,g=rwx,o=x"],[1543,"3007","011000000111","u=rwx,g=rwx,o="],[1544,"3010","011000001000","u=rwx,g=rw,o=rwx"],[1545,"3011","011000001001","u=rwx,g=rw,o=rw"],[1546,"3012","011000001010","u=rwx,g=rw,o=rx"],[1547,"3013","011000001011","u=rwx,g=rw,o=r"],[1548,"3014","011000001100","u=rwx,g=rw,o=wx"],[1549,"3015","011000001101","u=rwx,g=rw,o=w"],[1550,"3016","011000001110","u=rwx,g=rw,o=x"],[1551,"3017","011000001111","u=rwx,g=rw,o="],[1552,"3020","011000010000","u=rwx,g=rx,o=rwx"],[1553,"3021","011000010001","u=rwx,g=rx,o=rw"],[1554,"3022","011000010010","u=rwx,g=rx,o=rx"],[1555,"3023","011000010011","u=rwx,g=rx,o=r"],[1556,"3024","011000010100","u=rwx,g=rx,o=wx"],[1557,"3025","011000010101","u=rwx,g=rx,o=w"],[1558,"3026","011000010110","u=rwx,g=rx,o=x"],[1559,"3027","011000010111","u=rwx,g=rx,o="],[1560,"3030","011000011000","u=rwx,g=r,o=rwx"],[1561,"3031","011000011001","u=rwx,g=r,o=rw"],[1562,"3032","011000011010","u=rwx,g=r,o=rx"],[1563,"3033","011000011011","u=rwx,g=r,o=r"],[1564,"3034","011000011100","u=rwx,g=r,o=wx"],[1565,"3035","011000011101","u=rwx,g=r,o=w"],[1566,"3036","011000011110","u=rwx,g=r,o=x"],[1567,"3037","011000011111","u=rwx,g=r,o="],[1568,"3040","011000100000","u=rwx,g=wx,o=rwx"],[1569,"3041","011000100001","u=rwx,g=wx,o=rw"],[1570,"3042","011000100010","u=rwx,g=wx,o=rx"],[1571,"3043","011000100011","u=rwx,g=wx,o=r"],[1572,"3044","011000100100","u=rwx,g=wx,o=wx"],[1573,"3045","011000100101","u=rwx,g=wx,o=w"],[1574,"3046","011000100110","u=rwx,g=wx,o=x"],[1575,"3047","011000100111","u=rwx,g=wx,o="],[1576,"3050","011000101000","u=rwx,g=w,o=rwx"],[1577,"3051","011000101001","u=rwx,g=w,o=rw"],[1578,"3052","011000101010","u=rwx,g=w,o=rx"],[1579,"3053","011000101011","u=rwx,g=w,o=r"],[1580,"3054","011000101100","u=rwx,g=w,o=wx"],[1581,"3055","011000101101","u=rwx,g=w,o=w"],[1582,"3056","011000101110","u=rwx,g=w,o=x"],[1583,"3057","011000101111","u=rwx,g=w,o="],[1584,"3060","011000110000","u=rwx,g=x,o=rwx"],[1585,"3061","011000110001","u=rwx,g=x,o=rw"],[1586,"3062","011000110010","u=rwx,g=x,o=rx"],[1587,"3063","011000110011","u=rwx,g=x,o=r"],[1588,"3064","011000110100","u=rwx,g=x,o=wx"],[1589,"3065","011000110101","u=rwx,g=x,o=w"],[1590,"3066","011000110110","u=rwx,g=x,o=x"],[1591,"3067","011000110111","u=rwx,g=x,o="],[1592,"3070","011000111000","u=rwx,g=,o=rwx"],[1593,"3071","011000111001","u=rwx,g=,o=rw"],[1594,"3072","011000111010","u=rwx,g=,o=rx"],[1595,"3073","011000111011","u=rwx,g=,o=r"],[1596,"3074","011000111100","u=rwx,g=,o=wx"],[1597,"3075","011000111101","u=rwx,g=,o=w"],[1598,"3076","011000111110","u=rwx,g=,o=x"],[1599,"3077","011000111111","u=rwx,g=,o="],[1600,"3100","011001000000","u=rw,g=rwx,o=rwx"],[1601,"3101","011001000001","u=rw,g=rwx,o=rw"],[1602,"3102","011001000010","u=rw,g=rwx,o=rx"],[1603,"3103","011001000011","u=rw,g=rwx,o=r"],[1604,"3104","011001000100","u=rw,g=rwx,o=wx"],[1605,"3105","011001000101","u=rw,g=rwx,o=w"],[1606,"3106","011001000110","u=rw,g=rwx,o=x"],[1607,"3107","011001000111","u=rw,g=rwx,o="],[1608,"3110","011001001000","u=rw,g=rw,o=rwx"],[1609,"3111","011001001001","u=rw,g=rw,o=rw"],[1610,"3112","011001001010","u=rw,g=rw,o=rx"],[1611,"3113","011001001011","u=rw,g=rw,o=r"],[1612,"3114","011001001100","u=rw,g=rw,o=wx"],[1613,"3115","011001001101","u=rw,g=rw,o=w"],[1614,"3116","011001001110","u=rw,g=rw,o=x"],[1615,"3117","011001001111","u=rw,g=rw,o="],[1616,"3120","011001010000","u=rw,g=rx,o=rwx"],[1617,"3121","011001010001","u=rw,g=rx,o=rw"],[1618,"3122","011001010010","u=rw,g=rx,o=rx"],[1619,"3123","011001010011","u=rw,g=rx,o=r"],[1620,"3124","011001010100","u=rw,g=rx,o=wx"],[1621,"3125","011001010101","u=rw,g=rx,o=w"],[1622,"3126","011001010110","u=rw,g=rx,o=x"],[1623,"3127","011001010111","u=rw,g=rx,o="],[1624,"3130","011001011000","u=rw,g=r,o=rwx"],[1625,"3131","011001011001","u=rw,g=r,o=rw"],[1626,"3132","011001011010","u=rw,g=r,o=rx"],[1627,"3133","011001011011","u=rw,g=r,o=r"],[1628,"3134","011001011100","u=rw,g=r,o=wx"],[1629,"3135","011001011101","u=rw,g=r,o=w"],[1630,"3136","011001011110","u=rw,g=r,o=x"],[1631,"3137","011001011111","u=rw,g=r,o="],[1632,"3140","011001100000","u=rw,g=wx,o=rwx"],[1633,"3141","011001100001","u=rw,g=wx,o=rw"],[1634,"3142","011001100010","u=rw,g=wx,o=rx"],[1635,"3143","011001100011","u=rw,g=wx,o=r"],[1636,"3144","011001100100","u=rw,g=wx,o=wx"],[1637,"3145","011001100101","u=rw,g=wx,o=w"],[1638,"3146","011001100110","u=rw,g=wx,o=x"],[1639,"3147","011001100111","u=rw,g=wx,o="],[1640,"3150","011001101000","u=rw,g=w,o=rwx"],[1641,"3151","011001101001","u=rw,g=w,o=rw"],[1642,"3152","011001101010","u=rw,g=w,o=rx"],[1643,"3153","011001101011","u=rw,g=w,o=r"],[1644,"3154","011001101100","u=rw,g=w,o=wx"],[1645,"3155","011001101101","u=rw,g=w,o=w"],[1646,"3156","011001101110","u=rw,g=w,o=x"],[1647,"3157","011001101111","u=rw,g=w,o="],[1648,"3160","011001110000","u=rw,g=x,o=rwx"],[1649,"3161","011001110001","u=rw,g=x,o=rw"],[1650,"3162","011001110010","u=rw,g=x,o=rx"],[1651,"3163","011001110011","u=rw,g=x,o=r"],[1652,"3164","011001110100","u=rw,g=x,o=wx"],[1653,"3165","011001110101","u=rw,g=x,o=w"],[1654,"3166","011001110110","u=rw,g=x,o=x"],[1655,"3167","011001110111","u=rw,g=x,o="],[1656,"3170","011001111000","u=rw,g=,o=rwx"],[1657,"3171","011001111001","u=rw,g=,o=rw"],[1658,"3172","011001111010","u=rw,g=,o=rx"],[1659,"3173","011001111011","u=rw,g=,o=r"],[1660,"3174","011001111100","u=rw,g=,o=wx"],[1661,"3175","011001111101","u=rw,g=,o=w"],[1662,"3176","011001111110","u=rw,g=,o=x"],[1663,"3177","011001111111","u=rw,g=,o="],[1664,"3200","011010000000","u=rx,g=rwx,o=rwx"],[1665,"3201","011010000001","u=rx,g=rwx,o=rw"],[1666,"3202","011010000010","u=rx,g=rwx,o=rx"],[1667,"3203","011010000011","u=rx,g=rwx,o=r"],[1668,"3204","011010000100","u=rx,g=rwx,o=wx"],[1669,"3205","011010000101","u=rx,g=rwx,o=w"],[1670,"3206","011010000110","u=rx,g=rwx,o=x"],[1671,"3207","011010000111","u=rx,g=rwx,o="],[1672,"3210","011010001000","u=rx,g=rw,o=rwx"],[1673,"3211","011010001001","u=rx,g=rw,o=rw"],[1674,"3212","011010001010","u=rx,g=rw,o=rx"],[1675,"3213","011010001011","u=rx,g=rw,o=r"],[1676,"3214","011010001100","u=rx,g=rw,o=wx"],[1677,"3215","011010001101","u=rx,g=rw,o=w"],[1678,"3216","011010001110","u=rx,g=rw,o=x"],[1679,"3217","011010001111","u=rx,g=rw,o="],[1680,"3220","011010010000","u=rx,g=rx,o=rwx"],[1681,"3221","011010010001","u=rx,g=rx,o=rw"],[1682,"3222","011010010010","u=rx,g=rx,o=rx"],[1683,"3223","011010010011","u=rx,g=rx,o=r"],[1684,"3224","011010010100","u=rx,g=rx,o=wx"],[1685,"3225","011010010101","u=rx,g=rx,o=w"],[1686,"3226","011010010110","u=rx,g=rx,o=x"],[1687,"3227","011010010111","u=rx,g=rx,o="],[1688,"3230","011010011000","u=rx,g=r,o=rwx"],[1689,"3231","011010011001","u=rx,g=r,o=rw"],[1690,"3232","011010011010","u=rx,g=r,o=rx"],[1691,"3233","011010011011","u=rx,g=r,o=r"],[1692,"3234","011010011100","u=rx,g=r,o=wx"],[1693,"3235","011010011101","u=rx,g=r,o=w"],[1694,"3236","011010011110","u=rx,g=r,o=x"],[1695,"3237","011010011111","u=rx,g=r,o="],[1696,"3240","011010100000","u=rx,g=wx,o=rwx"],[1697,"3241","011010100001","u=rx,g=wx,o=rw"],[1698,"3242","011010100010","u=rx,g=wx,o=rx"],[1699,"3243","011010100011","u=rx,g=wx,o=r"],[1700,"3244","011010100100","u=rx,g=wx,o=wx"],[1701,"3245","011010100101","u=rx,g=wx,o=w"],[1702,"3246","011010100110","u=rx,g=wx,o=x"],[1703,"3247","011010100111","u=rx,g=wx,o="],[1704,"3250","011010101000","u=rx,g=w,o=rwx"],[1705,"3251","011010101001","u=rx,g=w,o=rw"],[1706,"3252","011010101010","u=rx,g=w,o=rx"],[1707,"3253","011010101011","u=rx,g=w,o=r"],[1708,"3254","011010101100","u=rx,g=w,o=wx"],[1709,"3255","011010101101","u=rx,g=w,o=w"],[1710,"3256","011010101110","u=rx,g=w,o=x"],[1711,"3257","011010101111","u=rx,g=w,o="],[1712,"3260","011010110000","u=rx,g=x,o=rwx"],[1713,"3261","011010110001","u=rx,g=x,o=rw"],[1714,"3262","011010110010","u=rx,g=x,o=rx"],[1715,"3263","011010110011","u=rx,g=x,o=r"],[1716,"3264","011010110100","u=rx,g=x,o=wx"],[1717,"3265","011010110101","u=rx,g=x,o=w"],[1718,"3266","011010110110","u=rx,g=x,o=x"],[1719,"3267","011010110111","u=rx,g=x,o="],[1720,"3270","011010111000","u=rx,g=,o=rwx"],[1721,"3271","011010111001","u=rx,g=,o=rw"],[1722,"3272","011010111010","u=rx,g=,o=rx"],[1723,"3273","011010111011","u=rx,g=,o=r"],[1724,"3274","011010111100","u=rx,g=,o=wx"],[1725,"3275","011010111101","u=rx,g=,o=w"],[1726,"3276","011010111110","u=rx,g=,o=x"],[1727,"3277","011010111111","u=rx,g=,o="],[1728,"3300","011011000000","u=r,g=rwx,o=rwx"],[1729,"3301","011011000001","u=r,g=rwx,o=rw"],[1730,"3302","011011000010","u=r,g=rwx,o=rx"],[1731,"3303","011011000011","u=r,g=rwx,o=r"],[1732,"3304","011011000100","u=r,g=rwx,o=wx"],[1733,"3305","011011000101","u=r,g=rwx,o=w"],[1734,"3306","011011000110","u=r,g=rwx,o=x"],[1735,"3307","011011000111","u=r,g=rwx,o="],[1736,"3310","011011001000","u=r,g=rw,o=rwx"],[1737,"3311","011011001001","u=r,g=rw,o=rw"],[1738,"3312","011011001010","u=r,g=rw,o=rx"],[1739,"3313","011011001011","u=r,g=rw,o=r"],[1740,"3314","011011001100","u=r,g=rw,o=wx"],[1741,"3315","011011001101","u=r,g=rw,o=w"],[1742,"3316","011011001110","u=r,g=rw,o=x"],[1743,"3317","011011001111","u=r,g=rw,o="],[1744,"3320","011011010000","u=r,g=rx,o=rwx"],[1745,"3321","011011010001","u=r,g=rx,o=rw"],[1746,"3322","011011010010","u=r,g=rx,o=rx"],[1747,"3323","011011010011","u=r,g=rx,o=r"],[1748,"3324","011011010100","u=r,g=rx,o=wx"],[1749,"3325","011011010101","u=r,g=rx,o=w"],[1750,"3326","011011010110","u=r,g=rx,o=x"],[1751,"3327","011011010111","u=r,g=rx,o="],[1752,"3330","011011011000","u=r,g=r,o=rwx"],[1753,"3331","011011011001","u=r,g=r,o=rw"],[1754,"3332","011011011010","u=r,g=r,o=rx"],[1755,"3333","011011011011","u=r,g=r,o=r"],[1756,"3334","011011011100","u=r,g=r,o=wx"],[1757,"3335","011011011101","u=r,g=r,o=w"],[1758,"3336","011011011110","u=r,g=r,o=x"],[1759,"3337","011011011111","u=r,g=r,o="],[1760,"3340","011011100000","u=r,g=wx,o=rwx"],[1761,"3341","011011100001","u=r,g=wx,o=rw"],[1762,"3342","011011100010","u=r,g=wx,o=rx"],[1763,"3343","011011100011","u=r,g=wx,o=r"],[1764,"3344","011011100100","u=r,g=wx,o=wx"],[1765,"3345","011011100101","u=r,g=wx,o=w"],[1766,"3346","011011100110","u=r,g=wx,o=x"],[1767,"3347","011011100111","u=r,g=wx,o="],[1768,"3350","011011101000","u=r,g=w,o=rwx"],[1769,"3351","011011101001","u=r,g=w,o=rw"],[1770,"3352","011011101010","u=r,g=w,o=rx"],[1771,"3353","011011101011","u=r,g=w,o=r"],[1772,"3354","011011101100","u=r,g=w,o=wx"],[1773,"3355","011011101101","u=r,g=w,o=w"],[1774,"3356","011011101110","u=r,g=w,o=x"],[1775,"3357","011011101111","u=r,g=w,o="],[1776,"3360","011011110000","u=r,g=x,o=rwx"],[1777,"3361","011011110001","u=r,g=x,o=rw"],[1778,"3362","011011110010","u=r,g=x,o=rx"],[1779,"3363","011011110011","u=r,g=x,o=r"],[1780,"3364","011011110100","u=r,g=x,o=wx"],[1781,"3365","011011110101","u=r,g=x,o=w"],[1782,"3366","011011110110","u=r,g=x,o=x"],[1783,"3367","011011110111","u=r,g=x,o="],[1784,"3370","011011111000","u=r,g=,o=rwx"],[1785,"3371","011011111001","u=r,g=,o=rw"],[1786,"3372","011011111010","u=r,g=,o=rx"],[1787,"3373","011011111011","u=r,g=,o=r"],[1788,"3374","011011111100","u=r,g=,o=wx"],[1789,"3375","011011111101","u=r,g=,o=w"],[1790,"3376","011011111110","u=r,g=,o=x"],[1791,"3377","011011111111","u=r,g=,o="],[1792,"3400","011100000000","u=wx,g=rwx,o=rwx"],[1793,"3401","011100000001","u=wx,g=rwx,o=rw"],[1794,"3402","011100000010","u=wx,g=rwx,o=rx"],[1795,"3403","011100000011","u=wx,g=rwx,o=r"],[1796,"3404","011100000100","u=wx,g=rwx,o=wx"],[1797,"3405","011100000101","u=wx,g=rwx,o=w"],[1798,"3406","011100000110","u=wx,g=rwx,o=x"],[1799,"3407","011100000111","u=wx,g=rwx,o="],[1800,"3410","011100001000","u=wx,g=rw,o=rwx"],[1801,"3411","011100001001","u=wx,g=rw,o=rw"],[1802,"3412","011100001010","u=wx,g=rw,o=rx"],[1803,"3413","011100001011","u=wx,g=rw,o=r"],[1804,"3414","011100001100","u=wx,g=rw,o=wx"],[1805,"3415","011100001101","u=wx,g=rw,o=w"],[1806,"3416","011100001110","u=wx,g=rw,o=x"],[1807,"3417","011100001111","u=wx,g=rw,o="],[1808,"3420","011100010000","u=wx,g=rx,o=rwx"],[1809,"3421","011100010001","u=wx,g=rx,o=rw"],[1810,"3422","011100010010","u=wx,g=rx,o=rx"],[1811,"3423","011100010011","u=wx,g=rx,o=r"],[1812,"3424","011100010100","u=wx,g=rx,o=wx"],[1813,"3425","011100010101","u=wx,g=rx,o=w"],[1814,"3426","011100010110","u=wx,g=rx,o=x"],[1815,"3427","011100010111","u=wx,g=rx,o="],[1816,"3430","011100011000","u=wx,g=r,o=rwx"],[1817,"3431","011100011001","u=wx,g=r,o=rw"],[1818,"3432","011100011010","u=wx,g=r,o=rx"],[1819,"3433","011100011011","u=wx,g=r,o=r"],[1820,"3434","011100011100","u=wx,g=r,o=wx"],[1821,"3435","011100011101","u=wx,g=r,o=w"],[1822,"3436","011100011110","u=wx,g=r,o=x"],[1823,"3437","011100011111","u=wx,g=r,o="],[1824,"3440","011100100000","u=wx,g=wx,o=rwx"],[1825,"3441","011100100001","u=wx,g=wx,o=rw"],[1826,"3442","011100100010","u=wx,g=wx,o=rx"],[1827,"3443","011100100011","u=wx,g=wx,o=r"],[1828,"3444","011100100100","u=wx,g=wx,o=wx"],[1829,"3445","011100100101","u=wx,g=wx,o=w"],[1830,"3446","011100100110","u=wx,g=wx,o=x"],[1831,"3447","011100100111","u=wx,g=wx,o="],[1832,"3450","011100101000","u=wx,g=w,o=rwx"],[1833,"3451","011100101001","u=wx,g=w,o=rw"],[1834,"3452","011100101010","u=wx,g=w,o=rx"],[1835,"3453","011100101011","u=wx,g=w,o=r"],[1836,"3454","011100101100","u=wx,g=w,o=wx"],[1837,"3455","011100101101","u=wx,g=w,o=w"],[1838,"3456","011100101110","u=wx,g=w,o=x"],[1839,"3457","011100101111","u=wx,g=w,o="],[1840,"3460","011100110000","u=wx,g=x,o=rwx"],[1841,"3461","011100110001","u=wx,g=x,o=rw"],[1842,"3462","011100110010","u=wx,g=x,o=rx"],[1843,"3463","011100110011","u=wx,g=x,o=r"],[1844,"3464","011100110100","u=wx,g=x,o=wx"],[1845,"3465","011100110101","u=wx,g=x,o=w"],[1846,"3466","011100110110","u=wx,g=x,o=x"],[1847,"3467","011100110111","u=wx,g=x,o="],[1848,"3470","011100111000","u=wx,g=,o=rwx"],[1849,"3471","011100111001","u=wx,g=,o=rw"],[1850,"3472","011100111010","u=wx,g=,o=rx"],[1851,"3473","011100111011","u=wx,g=,o=r"],[1852,"3474","011100111100","u=wx,g=,o=wx"],[1853,"3475","011100111101","u=wx,g=,o=w"],[1854,"3476","011100111110","u=wx,g=,o=x"],[1855,"3477","011100111111","u=wx,g=,o="],[1856,"3500","011101000000","u=w,g=rwx,o=rwx"],[1857,"3501","011101000001","u=w,g=rwx,o=rw"],[1858,"3502","011101000010","u=w,g=rwx,o=rx"],[1859,"3503","011101000011","u=w,g=rwx,o=r"],[1860,"3504","011101000100","u=w,g=rwx,o=wx"],[1861,"3505","011101000101","u=w,g=rwx,o=w"],[1862,"3506","011101000110","u=w,g=rwx,o=x"],[1863,"3507","011101000111","u=w,g=rwx,o="],[1864,"3510","011101001000","u=w,g=rw,o=rwx"],[1865,"3511","011101001001","u=w,g=rw,o=rw"],[1866,"3512","011101001010","u=w,g=rw,o=rx"],[1867,"3513","011101001011","u=w,g=rw,o=r"],[1868,"3514","011101001100","u=w,g=rw,o=wx"],[1869,"3515","011101001101","u=w,g=rw,o=w"],[1870,"3516","011101001110","u=w,g=rw,o=x"],[1871,"3517","011101001111","u=w,g=rw,o="],[1872,"3520","011101010000","u=w,g=rx,o=rwx"],[1873,"3521","011101010001","u=w,g=rx,o=rw"],[1874,"3522","011101010010","u=w,g=rx,o=rx"],[1875,"3523","011101010011","u=w,g=rx,o=r"],[1876,"3524","011101010100","u=w,g=rx,o=wx"],[1877,"3525","011101010101","u=w,g=rx,o=w"],[1878,"3526","011101010110","u=w,g=rx,o=x"],[1879,"3527","011101010111","u=w,g=rx,o="],[1880,"3530","011101011000","u=w,g=r,o=rwx"],[1881,"3531","011101011001","u=w,g=r,o=rw"],[1882,"3532","011101011010","u=w,g=r,o=rx"],[1883,"3533","011101011011","u=w,g=r,o=r"],[1884,"3534","011101011100","u=w,g=r,o=wx"],[1885,"3535","011101011101","u=w,g=r,o=w"],[1886,"3536","011101011110","u=w,g=r,o=x"],[1887,"3537","011101011111","u=w,g=r,o="],[1888,"3540","011101100000","u=w,g=wx,o=rwx"],[1889,"3541","011101100001","u=w,g=wx,o=rw"],[1890,"3542","011101100010","u=w,g=wx,o=rx"],[1891,"3543","011101100011","u=w,g=wx,o=r"],[1892,"3544","011101100100","u=w,g=wx,o=wx"],[1893,"3545","011101100101","u=w,g=wx,o=w"],[1894,"3546","011101100110","u=w,g=wx,o=x"],[1895,"3547","011101100111","u=w,g=wx,o="],[1896,"3550","011101101000","u=w,g=w,o=rwx"],[1897,"3551","011101101001","u=w,g=w,o=rw"],[1898,"3552","011101101010","u=w,g=w,o=rx"],[1899,"3553","011101101011","u=w,g=w,o=r"],[1900,"3554","011101101100","u=w,g=w,o=wx"],[1901,"3555","011101101101","u=w,g=w,o=w"],[1902,"3556","011101101110","u=w,g=w,o=x"],[1903,"3557","011101101111","u=w,g=w,o="],[1904,"3560","011101110000","u=w,g=x,o=rwx"],[1905,"3561","011101110001","u=w,g=x,o=rw"],[1906,"3562","011101110010","u=w,g=x,o=rx"],[1907,"3563","011101110011","u=w,g=x,o=r"],[1908,"3564","011101110100","u=w,g=x,o=wx"],[1909,"3565","011101110101","u=w,g=x,o=w"],[1910,"3566","011101110110","u=w,g=x,o=x"],[1911,"3567","011101110111","u=w,g=x,o="],[1912,"3570","011101111000","u=w,g=,o=rwx"],[1913,"3571","011101111001","u=w,g=,o=rw"],[1914,"3572","011101111010","u=w,g=,o=rx"],[1915,"3573","011101111011","u=w,g=,o=r"],[1916,"3574","011101111100","u=w,g=,o=wx"],[1917,"3575","011101111101","u=w,g=,o=w"],[1918,"3576","011101111110","u=w,g=,o=x"],[1919,"3577","011101111111","u=w,g=,o="],[1920,"3600","011110000000","u=x,g=rwx,o=rwx"],[1921,"3601","011110000001","u=x,g=rwx,o=rw"],[1922,"3602","011110000010","u=x,g=rwx,o=rx"],[1923,"3603","011110000011","u=x,g=rwx,o=r"],[1924,"3604","011110000100","u=x,g=rwx,o=wx"],[1925,"3605","011110000101","u=x,g=rwx,o=w"],[1926,"3606","011110000110","u=x,g=rwx,o=x"],[1927,"3607","011110000111","u=x,g=rwx,o="],[1928,"3610","011110001000","u=x,g=rw,o=rwx"],[1929,"3611","011110001001","u=x,g=rw,o=rw"],[1930,"3612","011110001010","u=x,g=rw,o=rx"],[1931,"3613","011110001011","u=x,g=rw,o=r"],[1932,"3614","011110001100","u=x,g=rw,o=wx"],[1933,"3615","011110001101","u=x,g=rw,o=w"],[1934,"3616","011110001110","u=x,g=rw,o=x"],[1935,"3617","011110001111","u=x,g=rw,o="],[1936,"3620","011110010000","u=x,g=rx,o=rwx"],[1937,"3621","011110010001","u=x,g=rx,o=rw"],[1938,"3622","011110010010","u=x,g=rx,o=rx"],[1939,"3623","011110010011","u=x,g=rx,o=r"],[1940,"3624","011110010100","u=x,g=rx,o=wx"],[1941,"3625","011110010101","u=x,g=rx,o=w"],[1942,"3626","011110010110","u=x,g=rx,o=x"],[1943,"3627","011110010111","u=x,g=rx,o="],[1944,"3630","011110011000","u=x,g=r,o=rwx"],[1945,"3631","011110011001","u=x,g=r,o=rw"],[1946,"3632","011110011010","u=x,g=r,o=rx"],[1947,"3633","011110011011","u=x,g=r,o=r"],[1948,"3634","011110011100","u=x,g=r,o=wx"],[1949,"3635","011110011101","u=x,g=r,o=w"],[1950,"3636","011110011110","u=x,g=r,o=x"],[1951,"3637","011110011111","u=x,g=r,o="],[1952,"3640","011110100000","u=x,g=wx,o=rwx"],[1953,"3641","011110100001","u=x,g=wx,o=rw"],[1954,"3642","011110100010","u=x,g=wx,o=rx"],[1955,"3643","011110100011","u=x,g=wx,o=r"],[1956,"3644","011110100100","u=x,g=wx,o=wx"],[1957,"3645","011110100101","u=x,g=wx,o=w"],[1958,"3646","011110100110","u=x,g=wx,o=x"],[1959,"3647","011110100111","u=x,g=wx,o="],[1960,"3650","011110101000","u=x,g=w,o=rwx"],[1961,"3651","011110101001","u=x,g=w,o=rw"],[1962,"3652","011110101010","u=x,g=w,o=rx"],[1963,"3653","011110101011","u=x,g=w,o=r"],[1964,"3654","011110101100","u=x,g=w,o=wx"],[1965,"3655","011110101101","u=x,g=w,o=w"],[1966,"3656","011110101110","u=x,g=w,o=x"],[1967,"3657","011110101111","u=x,g=w,o="],[1968,"3660","011110110000","u=x,g=x,o=rwx"],[1969,"3661","011110110001","u=x,g=x,o=rw"],[1970,"3662","011110110010","u=x,g=x,o=rx"],[1971,"3663","011110110011","u=x,g=x,o=r"],[1972,"3664","011110110100","u=x,g=x,o=wx"],[1973,"3665","011110110101","u=x,g=x,o=w"],[1974,"3666","011110110110","u=x,g=x,o=x"],[1975,"3667","011110110111","u=x,g=x,o="],[1976,"3670","011110111000","u=x,g=,o=rwx"],[1977,"3671","011110111001","u=x,g=,o=rw"],[1978,"3672","011110111010","u=x,g=,o=rx"],[1979,"3673","011110111011","u=x,g=,o=r"],[1980,"3674","011110111100","u=x,g=,o=wx"],[1981,"3675","011110111101","u=x,g=,o=w"],[1982,"3676","011110111110","u=x,g=,o=x"],[1983,"3677","011110111111","u=x,g=,o="],[1984,"3700","011111000000","u=,g=rwx,o=rwx"],[1985,"3701","011111000001","u=,g=rwx,o=rw"],[1986,"3702","011111000010","u=,g=rwx,o=rx"],[1987,"3703","011111000011","u=,g=rwx,o=r"],[1988,"3704","011111000100","u=,g=rwx,o=wx"],[1989,"3705","011111000101","u=,g=rwx,o=w"],[1990,"3706","011111000110","u=,g=rwx,o=x"],[1991,"3707","011111000111","u=,g=rwx,o="],[1992,"3710","011111001000","u=,g=rw,o=rwx"],[1993,"3711","011111001001","u=,g=rw,o=rw"],[1994,"3712","011111001010","u=,g=rw,o=rx"],[1995,"3713","011111001011","u=,g=rw,o=r"],[1996,"3714","011111001100","u=,g=rw,o=wx"],[1997,"3715","011111001101","u=,g=rw,o=w"],[1998,"3716","011111001110","u=,g=rw,o=x"],[1999,"3717","011111001111","u=,g=rw,o="],[2000,"3720","011111010000","u=,g=rx,o=rwx"],[2001,"3721","011111010001","u=,g=rx,o=rw"],[2002,"3722","011111010010","u=,g=rx,o=rx"],[2003,"3723","011111010011","u=,g=rx,o=r"],[2004,"3724","011111010100","u=,g=rx,o=wx"],[2005,"3725","011111010101","u=,g=rx,o=w"],[2006,"3726","011111010110","u=,g=rx,o=x"],[2007,"3727","011111010111","u=,g=rx,o="],[2008,"3730","011111011000","u=,g=r,o=rwx"],[2009,"3731","011111011001","u=,g=r,o=rw"],[2010,"3732","011111011010","u=,g=r,o=rx"],[2011,"3733","011111011011","u=,g=r,o=r"],[2012,"3734","011111011100","u=,g=r,o=wx"],[2013,"3735","011111011101","u=,g=r,o=w"],[2014,"3736","011111011110","u=,g=r,o=x"],[2015,"3737","011111011111","u=,g=r,o="],[2016,"3740","011111100000","u=,g=wx,o=rwx"],[2017,"3741","011111100001","u=,g=wx,o=rw"],[2018,"3742","011111100010","u=,g=wx,o=rx"],[2019,"3743","011111100011","u=,g=wx,o=r"],[2020,"3744","011111100100","u=,g=wx,o=wx"],[2021,"3745","011111100101","u=,g=wx,o=w"],[2022,"3746","011111100110","u=,g=wx,o=x"],[2023,"3747","011111100111","u=,g=wx,o="],[2024,"3750","011111101000","u=,g=w,o=rwx"],[2025,"3751","011111101001","u=,g=w,o=rw"],[2026,"3752","011111101010","u=,g=w,o=rx"],[2027,"3753","011111101011","u=,g=w,o=r"],[2028,"3754","011111101100","u=,g=w,o=wx"],[2029,"3755","011111101101","u=,g=w,o=w"],[2030,"3756","011111101110","u=,g=w,o=x"],[2031,"3757","011111101111","u=,g=w,o="],[2032,"3760","011111110000","u=,g=x,o=rwx"],[2033,"3761","011111110001","u=,g=x,o=rw"],[2034,"3762","011111110010","u=,g=x,o=rx"],[2035,"3763","011111110011","u=,g=x,o=r"],[2036,"3764","011111110100","u=,g=x,o=wx"],[2037,"3765","011111110101","u=,g=x,o=w"],[2038,"3766","011111110110","u=,g=x,o=x"],[2039,"3767","011111110111","u=,g=x,o="],[2040,"3770","011111111000","u=,g=,o=rwx"],[2041,"3771","011111111001","u=,g=,o=rw"],[2042,"3772","011111111010","u=,g=,o=rx"],[2043,"3773","011111111011","u=,g=,o=r"],[2044,"3774","011111111100","u=,g=,o=wx"],[2045,"3775","011111111101","u=,g=,o=w"],[2046,"3776","011111111110","u=,g=,o=x"],[2047,"3777","011111111111","u=,g=,o="],[2048,"4000","100000000000","u=rwx,g=rwx,o=rwx"],[2049,"4001","100000000001","u=rwx,g=rwx,o=rw"],[2050,"4002","100000000010","u=rwx,g=rwx,o=rx"],[2051,"4003","100000000011","u=rwx,g=rwx,o=r"],[2052,"4004","100000000100","u=rwx,g=rwx,o=wx"],[2053,"4005","100000000101","u=rwx,g=rwx,o=w"],[2054,"4006","100000000110","u=rwx,g=rwx,o=x"],[2055,"4007","100000000111","u=rwx,g=rwx,o="],[2056,"4010","100000001000","u=rwx,g=rw,o=rwx"],[2057,"4011","100000001001","u=rwx,g=rw,o=rw"],[2058,"4012","100000001010","u=rwx,g=rw,o=rx"],[2059,"4013","100000001011","u=rwx,g=rw,o=r"],[2060,"4014","100000001100","u=rwx,g=rw,o=wx"],[2061,"4015","100000001101","u=rwx,g=rw,o=w"],[2062,"4016","100000001110","u=rwx,g=rw,o=x"],[2063,"4017","100000001111","u=rwx,g=rw,o="],[2064,"4020","100000010000","u=rwx,g=rx,o=rwx"],[2065,"4021","100000010001","u=rwx,g=rx,o=rw"],[2066,"4022","100000010010","u=rwx,g=rx,o=rx"],[2067,"4023","100000010011","u=rwx,g=rx,o=r"],[2068,"4024","100000010100","u=rwx,g=rx,o=wx"],[2069,"4025","100000010101","u=rwx,g=rx,o=w"],[2070,"4026","100000010110","u=rwx,g=rx,o=x"],[2071,"4027","100000010111","u=rwx,g=rx,o="],[2072,"4030","100000011000","u=rwx,g=r,o=rwx"],[2073,"4031","100000011001","u=rwx,g=r,o=rw"],[2074,"4032","100000011010","u=rwx,g=r,o=rx"],[2075,"4033","100000011011","u=rwx,g=r,o=r"],[2076,"4034","100000011100","u=rwx,g=r,o=wx"],[2077,"4035","100000011101","u=rwx,g=r,o=w"],[2078,"4036","100000011110","u=rwx,g=r,o=x"],[2079,"4037","100000011111","u=rwx,g=r,o="],[2080,"4040","100000100000","u=rwx,g=wx,o=rwx"],[2081,"4041","100000100001","u=rwx,g=wx,o=rw"],[2082,"4042","100000100010","u=rwx,g=wx,o=rx"],[2083,"4043","100000100011","u=rwx,g=wx,o=r"],[2084,"4044","100000100100","u=rwx,g=wx,o=wx"],[2085,"4045","100000100101","u=rwx,g=wx,o=w"],[2086,"4046","100000100110","u=rwx,g=wx,o=x"],[2087,"4047","100000100111","u=rwx,g=wx,o="],[2088,"4050","100000101000","u=rwx,g=w,o=rwx"],[2089,"4051","100000101001","u=rwx,g=w,o=rw"],[2090,"4052","100000101010","u=rwx,g=w,o=rx"],[2091,"4053","100000101011","u=rwx,g=w,o=r"],[2092,"4054","100000101100","u=rwx,g=w,o=wx"],[2093,"4055","100000101101","u=rwx,g=w,o=w"],[2094,"4056","100000101110","u=rwx,g=w,o=x"],[2095,"4057","100000101111","u=rwx,g=w,o="],[2096,"4060","100000110000","u=rwx,g=x,o=rwx"],[2097,"4061","100000110001","u=rwx,g=x,o=rw"],[2098,"4062","100000110010","u=rwx,g=x,o=rx"],[2099,"4063","100000110011","u=rwx,g=x,o=r"],[2100,"4064","100000110100","u=rwx,g=x,o=wx"],[2101,"4065","100000110101","u=rwx,g=x,o=w"],[2102,"4066","100000110110","u=rwx,g=x,o=x"],[2103,"4067","100000110111","u=rwx,g=x,o="],[2104,"4070","100000111000","u=rwx,g=,o=rwx"],[2105,"4071","100000111001","u=rwx,g=,o=rw"],[2106,"4072","100000111010","u=rwx,g=,o=rx"],[2107,"4073","100000111011","u=rwx,g=,o=r"],[2108,"4074","100000111100","u=rwx,g=,o=wx"],[2109,"4075","100000111101","u=rwx,g=,o=w"],[2110,"4076","100000111110","u=rwx,g=,o=x"],[2111,"4077","100000111111","u=rwx,g=,o="],[2112,"4100","100001000000","u=rw,g=rwx,o=rwx"],[2113,"4101","100001000001","u=rw,g=rwx,o=rw"],[2114,"4102","100001000010","u=rw,g=rwx,o=rx"],[2115,"4103","100001000011","u=rw,g=rwx,o=r"],[2116,"4104","100001000100","u=rw,g=rwx,o=wx"],[2117,"4105","100001000101","u=rw,g=rwx,o=w"],[2118,"4106","100001000110","u=rw,g=rwx,o=x"],[2119,"4107","100001000111","u=rw,g=rwx,o="],[2120,"4110","100001001000","u=rw,g=rw,o=rwx"],[2121,"4111","100001001001","u=rw,g=rw,o=rw"],[2122,"4112","100001001010","u=rw,g=rw,o=rx"],[2123,"4113","100001001011","u=rw,g=rw,o=r"],[2124,"4114","100001001100","u=rw,g=rw,o=wx"],[2125,"4115","100001001101","u=rw,g=rw,o=w"],[2126,"4116","100001001110","u=rw,g=rw,o=x"],[2127,"4117","100001001111","u=rw,g=rw,o="],[2128,"4120","100001010000","u=rw,g=rx,o=rwx"],[2129,"4121","100001010001","u=rw,g=rx,o=rw"],[2130,"4122","100001010010","u=rw,g=rx,o=rx"],[2131,"4123","100001010011","u=rw,g=rx,o=r"],[2132,"4124","100001010100","u=rw,g=rx,o=wx"],[2133,"4125","100001010101","u=rw,g=rx,o=w"],[2134,"4126","100001010110","u=rw,g=rx,o=x"],[2135,"4127","100001010111","u=rw,g=rx,o="],[2136,"4130","100001011000","u=rw,g=r,o=rwx"],[2137,"4131","100001011001","u=rw,g=r,o=rw"],[2138,"4132","100001011010","u=rw,g=r,o=rx"],[2139,"4133","100001011011","u=rw,g=r,o=r"],[2140,"4134","100001011100","u=rw,g=r,o=wx"],[2141,"4135","100001011101","u=rw,g=r,o=w"],[2142,"4136","100001011110","u=rw,g=r,o=x"],[2143,"4137","100001011111","u=rw,g=r,o="],[2144,"4140","100001100000","u=rw,g=wx,o=rwx"],[2145,"4141","100001100001","u=rw,g=wx,o=rw"],[2146,"4142","100001100010","u=rw,g=wx,o=rx"],[2147,"4143","100001100011","u=rw,g=wx,o=r"],[2148,"4144","100001100100","u=rw,g=wx,o=wx"],[2149,"4145","100001100101","u=rw,g=wx,o=w"],[2150,"4146","100001100110","u=rw,g=wx,o=x"],[2151,"4147","100001100111","u=rw,g=wx,o="],[2152,"4150","100001101000","u=rw,g=w,o=rwx"],[2153,"4151","100001101001","u=rw,g=w,o=rw"],[2154,"4152","100001101010","u=rw,g=w,o=rx"],[2155,"4153","100001101011","u=rw,g=w,o=r"],[2156,"4154","100001101100","u=rw,g=w,o=wx"],[2157,"4155","100001101101","u=rw,g=w,o=w"],[2158,"4156","100001101110","u=rw,g=w,o=x"],[2159,"4157","100001101111","u=rw,g=w,o="],[2160,"4160","100001110000","u=rw,g=x,o=rwx"],[2161,"4161","100001110001","u=rw,g=x,o=rw"],[2162,"4162","100001110010","u=rw,g=x,o=rx"],[2163,"4163","100001110011","u=rw,g=x,o=r"],[2164,"4164","100001110100","u=rw,g=x,o=wx"],[2165,"4165","100001110101","u=rw,g=x,o=w"],[2166,"4166","100001110110","u=rw,g=x,o=x"],[2167,"4167","100001110111","u=rw,g=x,o="],[2168,"4170","100001111000","u=rw,g=,o=rwx"],[2169,"4171","100001111001","u=rw,g=,o=rw"],[2170,"4172","100001111010","u=rw,g=,o=rx"],[2171,"4173","100001111011","u=rw,g=,o=r"],[2172,"4174","100001111100","u=rw,g=,o=wx"],[2173,"4175","100001111101","u=rw,g=,o=w"],[2174,"4176","100001111110","u=rw,g=,o=x"],[2175,"4177","100001111111","u=rw,g=,o="],[2176,"4200","100010000000","u=rx,g=rwx,o=rwx"],[2177,"4201","100010000001","u=rx,g=rwx,o=rw"],[2178,"4202","100010000010","u=rx,g=rwx,o=rx"],[2179,"4203","100010000011","u=rx,g=rwx,o=r"],[2180,"4204","100010000100","u=rx,g=rwx,o=wx"],[2181,"4205","100010000101","u=rx,g=rwx,o=w"],[2182,"4206","100010000110","u=rx,g=rwx,o=x"],[2183,"4207","100010000111","u=rx,g=rwx,o="],[2184,"4210","100010001000","u=rx,g=rw,o=rwx"],[2185,"4211","100010001001","u=rx,g=rw,o=rw"],[2186,"4212","100010001010","u=rx,g=rw,o=rx"],[2187,"4213","100010001011","u=rx,g=rw,o=r"],[2188,"4214","100010001100","u=rx,g=rw,o=wx"],[2189,"4215","100010001101","u=rx,g=rw,o=w"],[2190,"4216","100010001110","u=rx,g=rw,o=x"],[2191,"4217","100010001111","u=rx,g=rw,o="],[2192,"4220","100010010000","u=rx,g=rx,o=rwx"],[2193,"4221","100010010001","u=rx,g=rx,o=rw"],[2194,"4222","100010010010","u=rx,g=rx,o=rx"],[2195,"4223","100010010011","u=rx,g=rx,o=r"],[2196,"4224","100010010100","u=rx,g=rx,o=wx"],[2197,"4225","100010010101","u=rx,g=rx,o=w"],[2198,"4226","100010010110","u=rx,g=rx,o=x"],[2199,"4227","100010010111","u=rx,g=rx,o="],[2200,"4230","100010011000","u=rx,g=r,o=rwx"],[2201,"4231","100010011001","u=rx,g=r,o=rw"],[2202,"4232","100010011010","u=rx,g=r,o=rx"],[2203,"4233","100010011011","u=rx,g=r,o=r"],[2204,"4234","100010011100","u=rx,g=r,o=wx"],[2205,"4235","100010011101","u=rx,g=r,o=w"],[2206,"4236","100010011110","u=rx,g=r,o=x"],[2207,"4237","100010011111","u=rx,g=r,o="],[2208,"4240","100010100000","u=rx,g=wx,o=rwx"],[2209,"4241","100010100001","u=rx,g=wx,o=rw"],[2210,"4242","100010100010","u=rx,g=wx,o=rx"],[2211,"4243","100010100011","u=rx,g=wx,o=r"],[2212,"4244","100010100100","u=rx,g=wx,o=wx"],[2213,"4245","100010100101","u=rx,g=wx,o=w"],[2214,"4246","100010100110","u=rx,g=wx,o=x"],[2215,"4247","100010100111","u=rx,g=wx,o="],[2216,"4250","100010101000","u=rx,g=w,o=rwx"],[2217,"4251","100010101001","u=rx,g=w,o=rw"],[2218,"4252","100010101010","u=rx,g=w,o=rx"],[2219,"4253","100010101011","u=rx,g=w,o=r"],[2220,"4254","100010101100","u=rx,g=w,o=wx"],[2221,"4255","100010101101","u=rx,g=w,o=w"],[2222,"4256","100010101110","u=rx,g=w,o=x"],[2223,"4257","100010101111","u=rx,g=w,o="],[2224,"4260","100010110000","u=rx,g=x,o=rwx"],[2225,"4261","100010110001","u=rx,g=x,o=rw"],[2226,"4262","100010110010","u=rx,g=x,o=rx"],[2227,"4263","100010110011","u=rx,g=x,o=r"],[2228,"4264","100010110100","u=rx,g=x,o=wx"],[2229,"4265","100010110101","u=rx,g=x,o=w"],[2230,"4266","100010110110","u=rx,g=x,o=x"],[2231,"4267","100010110111","u=rx,g=x,o="],[2232,"4270","100010111000","u=rx,g=,o=rwx"],[2233,"4271","100010111001","u=rx,g=,o=rw"],[2234,"4272","100010111010","u=rx,g=,o=rx"],[2235,"4273","100010111011","u=rx,g=,o=r"],[2236,"4274","100010111100","u=rx,g=,o=wx"],[2237,"4275","100010111101","u=rx,g=,o=w"],[2238,"4276","100010111110","u=rx,g=,o=x"],[2239,"4277","100010111111","u=rx,g=,o="],[2240,"4300","100011000000","u=r,g=rwx,o=rwx"],[2241,"4301","100011000001","u=r,g=rwx,o=rw"],[2242,"4302","100011000010","u=r,g=rwx,o=rx"],[2243,"4303","100011000011","u=r,g=rwx,o=r"],[2244,"4304","100011000100","u=r,g=rwx,o=wx"],[2245,"4305","100011000101","u=r,g=rwx,o=w"],[2246,"4306","100011000110","u=r,g=rwx,o=x"],[2247,"4307","100011000111","u=r,g=rwx,o="],[2248,"4310","100011001000","u=r,g=rw,o=rwx"],[2249,"4311","100011001001","u=r,g=rw,o=rw"],[2250,"4312","100011001010","u=r,g=rw,o=rx"],[2251,"4313","100011001011","u=r,g=rw,o=r"],[2252,"4314","100011001100","u=r,g=rw,o=wx"],[2253,"4315","100011001101","u=r,g=rw,o=w"],[2254,"4316","100011001110","u=r,g=rw,o=x"],[2255,"4317","100011001111","u=r,g=rw,o="],[2256,"4320","100011010000","u=r,g=rx,o=rwx"],[2257,"4321","100011010001","u=r,g=rx,o=rw"],[2258,"4322","100011010010","u=r,g=rx,o=rx"],[2259,"4323","100011010011","u=r,g=rx,o=r"],[2260,"4324","100011010100","u=r,g=rx,o=wx"],[2261,"4325","100011010101","u=r,g=rx,o=w"],[2262,"4326","100011010110","u=r,g=rx,o=x"],[2263,"4327","100011010111","u=r,g=rx,o="],[2264,"4330","100011011000","u=r,g=r,o=rwx"],[2265,"4331","100011011001","u=r,g=r,o=rw"],[2266,"4332","100011011010","u=r,g=r,o=rx"],[2267,"4333","100011011011","u=r,g=r,o=r"],[2268,"4334","100011011100","u=r,g=r,o=wx"],[2269,"4335","100011011101","u=r,g=r,o=w"],[2270,"4336","100011011110","u=r,g=r,o=x"],[2271,"4337","100011011111","u=r,g=r,o="],[2272,"4340","100011100000","u=r,g=wx,o=rwx"],[2273,"4341","100011100001","u=r,g=wx,o=rw"],[2274,"4342","100011100010","u=r,g=wx,o=rx"],[2275,"4343","100011100011","u=r,g=wx,o=r"],[2276,"4344","100011100100","u=r,g=wx,o=wx"],[2277,"4345","100011100101","u=r,g=wx,o=w"],[2278,"4346","100011100110","u=r,g=wx,o=x"],[2279,"4347","100011100111","u=r,g=wx,o="],[2280,"4350","100011101000","u=r,g=w,o=rwx"],[2281,"4351","100011101001","u=r,g=w,o=rw"],[2282,"4352","100011101010","u=r,g=w,o=rx"],[2283,"4353","100011101011","u=r,g=w,o=r"],[2284,"4354","100011101100","u=r,g=w,o=wx"],[2285,"4355","100011101101","u=r,g=w,o=w"],[2286,"4356","100011101110","u=r,g=w,o=x"],[2287,"4357","100011101111","u=r,g=w,o="],[2288,"4360","100011110000","u=r,g=x,o=rwx"],[2289,"4361","100011110001","u=r,g=x,o=rw"],[2290,"4362","100011110010","u=r,g=x,o=rx"],[2291,"4363","100011110011","u=r,g=x,o=r"],[2292,"4364","100011110100","u=r,g=x,o=wx"],[2293,"4365","100011110101","u=r,g=x,o=w"],[2294,"4366","100011110110","u=r,g=x,o=x"],[2295,"4367","100011110111","u=r,g=x,o="],[2296,"4370","100011111000","u=r,g=,o=rwx"],[2297,"4371","100011111001","u=r,g=,o=rw"],[2298,"4372","100011111010","u=r,g=,o=rx"],[2299,"4373","100011111011","u=r,g=,o=r"],[2300,"4374","100011111100","u=r,g=,o=wx"],[2301,"4375","100011111101","u=r,g=,o=w"],[2302,"4376","100011111110","u=r,g=,o=x"],[2303,"4377","100011111111","u=r,g=,o="],[2304,"4400","100100000000","u=wx,g=rwx,o=rwx"],[2305,"4401","100100000001","u=wx,g=rwx,o=rw"],[2306,"4402","100100000010","u=wx,g=rwx,o=rx"],[2307,"4403","100100000011","u=wx,g=rwx,o=r"],[2308,"4404","100100000100","u=wx,g=rwx,o=wx"],[2309,"4405","100100000101","u=wx,g=rwx,o=w"],[2310,"4406","100100000110","u=wx,g=rwx,o=x"],[2311,"4407","100100000111","u=wx,g=rwx,o="],[2312,"4410","100100001000","u=wx,g=rw,o=rwx"],[2313,"4411","100100001001","u=wx,g=rw,o=rw"],[2314,"4412","100100001010","u=wx,g=rw,o=rx"],[2315,"4413","100100001011","u=wx,g=rw,o=r"],[2316,"4414","100100001100","u=wx,g=rw,o=wx"],[2317,"4415","100100001101","u=wx,g=rw,o=w"],[2318,"4416","100100001110","u=wx,g=rw,o=x"],[2319,"4417","100100001111","u=wx,g=rw,o="],[2320,"4420","100100010000","u=wx,g=rx,o=rwx"],[2321,"4421","100100010001","u=wx,g=rx,o=rw"],[2322,"4422","100100010010","u=wx,g=rx,o=rx"],[2323,"4423","100100010011","u=wx,g=rx,o=r"],[2324,"4424","100100010100","u=wx,g=rx,o=wx"],[2325,"4425","100100010101","u=wx,g=rx,o=w"],[2326,"4426","100100010110","u=wx,g=rx,o=x"],[2327,"4427","100100010111","u=wx,g=rx,o="],[2328,"4430","100100011000","u=wx,g=r,o=rwx"],[2329,"4431","100100011001","u=wx,g=r,o=rw"],[2330,"4432","100100011010","u=wx,g=r,o=rx"],[2331,"4433","100100011011","u=wx,g=r,o=r"],[2332,"4434","100100011100","u=wx,g=r,o=wx"],[2333,"4435","100100011101","u=wx,g=r,o=w"],[2334,"4436","100100011110","u=wx,g=r,o=x"],[2335,"4437","100100011111","u=wx,g=r,o="],[2336,"4440","100100100000","u=wx,g=wx,o=rwx"],[2337,"4441","100100100001","u=wx,g=wx,o=rw"],[2338,"4442","100100100010","u=wx,g=wx,o=rx"],[2339,"4443","100100100011","u=wx,g=wx,o=r"],[2340,"4444","100100100100","u=wx,g=wx,o=wx"],[2341,"4445","100100100101","u=wx,g=wx,o=w"],[2342,"4446","100100100110","u=wx,g=wx,o=x"],[2343,"4447","100100100111","u=wx,g=wx,o="],[2344,"4450","100100101000","u=wx,g=w,o=rwx"],[2345,"4451","100100101001","u=wx,g=w,o=rw"],[2346,"4452","100100101010","u=wx,g=w,o=rx"],[2347,"4453","100100101011","u=wx,g=w,o=r"],[2348,"4454","100100101100","u=wx,g=w,o=wx"],[2349,"4455","100100101101","u=wx,g=w,o=w"],[2350,"4456","100100101110","u=wx,g=w,o=x"],[2351,"4457","100100101111","u=wx,g=w,o="],[2352,"4460","100100110000","u=wx,g=x,o=rwx"],[2353,"4461","100100110001","u=wx,g=x,o=rw"],[2354,"4462","100100110010","u=wx,g=x,o=rx"],[2355,"4463","100100110011","u=wx,g=x,o=r"],[2356,"4464","100100110100","u=wx,g=x,o=wx"],[2357,"4465","100100110101","u=wx,g=x,o=w"],[2358,"4466","100100110110","u=wx,g=x,o=x"],[2359,"4467","100100110111","u=wx,g=x,o="],[2360,"4470","100100111000","u=wx,g=,o=rwx"],[2361,"4471","100100111001","u=wx,g=,o=rw"],[2362,"4472","100100111010","u=wx,g=,o=rx"],[2363,"4473","100100111011","u=wx,g=,o=r"],[2364,"4474","100100111100","u=wx,g=,o=wx"],[2365,"4475","100100111101","u=wx,g=,o=w"],[2366,"4476","100100111110","u=wx,g=,o=x"],[2367,"4477","100100111111","u=wx,g=,o="],[2368,"4500","100101000000","u=w,g=rwx,o=rwx"],[2369,"4501","100101000001","u=w,g=rwx,o=rw"],[2370,"4502","100101000010","u=w,g=rwx,o=rx"],[2371,"4503","100101000011","u=w,g=rwx,o=r"],[2372,"4504","100101000100","u=w,g=rwx,o=wx"],[2373,"4505","100101000101","u=w,g=rwx,o=w"],[2374,"4506","100101000110","u=w,g=rwx,o=x"],[2375,"4507","100101000111","u=w,g=rwx,o="],[2376,"4510","100101001000","u=w,g=rw,o=rwx"],[2377,"4511","100101001001","u=w,g=rw,o=rw"],[2378,"4512","100101001010","u=w,g=rw,o=rx"],[2379,"4513","100101001011","u=w,g=rw,o=r"],[2380,"4514","100101001100","u=w,g=rw,o=wx"],[2381,"4515","100101001101","u=w,g=rw,o=w"],[2382,"4516","100101001110","u=w,g=rw,o=x"],[2383,"4517","100101001111","u=w,g=rw,o="],[2384,"4520","100101010000","u=w,g=rx,o=rwx"],[2385,"4521","100101010001","u=w,g=rx,o=rw"],[2386,"4522","100101010010","u=w,g=rx,o=rx"],[2387,"4523","100101010011","u=w,g=rx,o=r"],[2388,"4524","100101010100","u=w,g=rx,o=wx"],[2389,"4525","100101010101","u=w,g=rx,o=w"],[2390,"4526","100101010110","u=w,g=rx,o=x"],[2391,"4527","100101010111","u=w,g=rx,o="],[2392,"4530","100101011000","u=w,g=r,o=rwx"],[2393,"4531","100101011001","u=w,g=r,o=rw"],[2394,"4532","100101011010","u=w,g=r,o=rx"],[2395,"4533","100101011011","u=w,g=r,o=r"],[2396,"4534","100101011100","u=w,g=r,o=wx"],[2397,"4535","100101011101","u=w,g=r,o=w"],[2398,"4536","100101011110","u=w,g=r,o=x"],[2399,"4537","100101011111","u=w,g=r,o="],[2400,"4540","100101100000","u=w,g=wx,o=rwx"],[2401,"4541","100101100001","u=w,g=wx,o=rw"],[2402,"4542","100101100010","u=w,g=wx,o=rx"],[2403,"4543","100101100011","u=w,g=wx,o=r"],[2404,"4544","100101100100","u=w,g=wx,o=wx"],[2405,"4545","100101100101","u=w,g=wx,o=w"],[2406,"4546","100101100110","u=w,g=wx,o=x"],[2407,"4547","100101100111","u=w,g=wx,o="],[2408,"4550","100101101000","u=w,g=w,o=rwx"],[2409,"4551","100101101001","u=w,g=w,o=rw"],[2410,"4552","100101101010","u=w,g=w,o=rx"],[2411,"4553","100101101011","u=w,g=w,o=r"],[2412,"4554","100101101100","u=w,g=w,o=wx"],[2413,"4555","100101101101","u=w,g=w,o=w"],[2414,"4556","100101101110","u=w,g=w,o=x"],[2415,"4557","100101101111","u=w,g=w,o="],[2416,"4560","100101110000","u=w,g=x,o=rwx"],[2417,"4561","100101110001","u=w,g=x,o=rw"],[2418,"4562","100101110010","u=w,g=x,o=rx"],[2419,"4563","100101110011","u=w,g=x,o=r"],[2420,"4564","100101110100","u=w,g=x,o=wx"],[2421,"4565","100101110101","u=w,g=x,o=w"],[2422,"4566","100101110110","u=w,g=x,o=x"],[2423,"4567","100101110111","u=w,g=x,o="],[2424,"4570","100101111000","u=w,g=,o=rwx"],[2425,"4571","100101111001","u=w,g=,o=rw"],[2426,"4572","100101111010","u=w,g=,o=rx"],[2427,"4573","100101111011","u=w,g=,o=r"],[2428,"4574","100101111100","u=w,g=,o=wx"],[2429,"4575","100101111101","u=w,g=,o=w"],[2430,"4576","100101111110","u=w,g=,o=x"],[2431,"4577","100101111111","u=w,g=,o="],[2432,"4600","100110000000","u=x,g=rwx,o=rwx"],[2433,"4601","100110000001","u=x,g=rwx,o=rw"],[2434,"4602","100110000010","u=x,g=rwx,o=rx"],[2435,"4603","100110000011","u=x,g=rwx,o=r"],[2436,"4604","100110000100","u=x,g=rwx,o=wx"],[2437,"4605","100110000101","u=x,g=rwx,o=w"],[2438,"4606","100110000110","u=x,g=rwx,o=x"],[2439,"4607","100110000111","u=x,g=rwx,o="],[2440,"4610","100110001000","u=x,g=rw,o=rwx"],[2441,"4611","100110001001","u=x,g=rw,o=rw"],[2442,"4612","100110001010","u=x,g=rw,o=rx"],[2443,"4613","100110001011","u=x,g=rw,o=r"],[2444,"4614","100110001100","u=x,g=rw,o=wx"],[2445,"4615","100110001101","u=x,g=rw,o=w"],[2446,"4616","100110001110","u=x,g=rw,o=x"],[2447,"4617","100110001111","u=x,g=rw,o="],[2448,"4620","100110010000","u=x,g=rx,o=rwx"],[2449,"4621","100110010001","u=x,g=rx,o=rw"],[2450,"4622","100110010010","u=x,g=rx,o=rx"],[2451,"4623","100110010011","u=x,g=rx,o=r"],[2452,"4624","100110010100","u=x,g=rx,o=wx"],[2453,"4625","100110010101","u=x,g=rx,o=w"],[2454,"4626","100110010110","u=x,g=rx,o=x"],[2455,"4627","100110010111","u=x,g=rx,o="],[2456,"4630","100110011000","u=x,g=r,o=rwx"],[2457,"4631","100110011001","u=x,g=r,o=rw"],[2458,"4632","100110011010","u=x,g=r,o=rx"],[2459,"4633","100110011011","u=x,g=r,o=r"],[2460,"4634","100110011100","u=x,g=r,o=wx"],[2461,"4635","100110011101","u=x,g=r,o=w"],[2462,"4636","100110011110","u=x,g=r,o=x"],[2463,"4637","100110011111","u=x,g=r,o="],[2464,"4640","100110100000","u=x,g=wx,o=rwx"],[2465,"4641","100110100001","u=x,g=wx,o=rw"],[2466,"4642","100110100010","u=x,g=wx,o=rx"],[2467,"4643","100110100011","u=x,g=wx,o=r"],[2468,"4644","100110100100","u=x,g=wx,o=wx"],[2469,"4645","100110100101","u=x,g=wx,o=w"],[2470,"4646","100110100110","u=x,g=wx,o=x"],[2471,"4647","100110100111","u=x,g=wx,o="],[2472,"4650","100110101000","u=x,g=w,o=rwx"],[2473,"4651","100110101001","u=x,g=w,o=rw"],[2474,"4652","100110101010","u=x,g=w,o=rx"],[2475,"4653","100110101011","u=x,g=w,o=r"],[2476,"4654","100110101100","u=x,g=w,o=wx"],[2477,"4655","100110101101","u=x,g=w,o=w"],[2478,"4656","100110101110","u=x,g=w,o=x"],[2479,"4657","100110101111","u=x,g=w,o="],[2480,"4660","100110110000","u=x,g=x,o=rwx"],[2481,"4661","100110110001","u=x,g=x,o=rw"],[2482,"4662","100110110010","u=x,g=x,o=rx"],[2483,"4663","100110110011","u=x,g=x,o=r"],[2484,"4664","100110110100","u=x,g=x,o=wx"],[2485,"4665","100110110101","u=x,g=x,o=w"],[2486,"4666","100110110110","u=x,g=x,o=x"],[2487,"4667","100110110111","u=x,g=x,o="],[2488,"4670","100110111000","u=x,g=,o=rwx"],[2489,"4671","100110111001","u=x,g=,o=rw"],[2490,"4672","100110111010","u=x,g=,o=rx"],[2491,"4673","100110111011","u=x,g=,o=r"],[2492,"4674","100110111100","u=x,g=,o=wx"],[2493,"4675","100110111101","u=x,g=,o=w"],[2494,"4676","100110111110","u=x,g=,o=x"],[2495,"4677","100110111111","u=x,g=,o="],[2496,"4700","100111000000","u=,g=rwx,o=rwx"],[2497,"4701","100111000001","u=,g=rwx,o=rw"],[2498,"4702","100111000010","u=,g=rwx,o=rx"],[2499,"4703","100111000011","u=,g=rwx,o=r"],[2500,"4704","100111000100","u=,g=rwx,o=wx"],[2501,"4705","100111000101","u=,g=rwx,o=w"],[2502,"4706","100111000110","u=,g=rwx,o=x"],[2503,"4707","100111000111","u=,g=rwx,o="],[2504,"4710","100111001000","u=,g=rw,o=rwx"],[2505,"4711","100111001001","u=,g=rw,o=rw"],[2506,"4712","100111001010","u=,g=rw,o=rx"],[2507,"4713","100111001011","u=,g=rw,o=r"],[2508,"4714","100111001100","u=,g=rw,o=wx"],[2509,"4715","100111001101","u=,g=rw,o=w"],[2510,"4716","100111001110","u=,g=rw,o=x"],[2511,"4717","100111001111","u=,g=rw,o="],[2512,"4720","100111010000","u=,g=rx,o=rwx"],[2513,"4721","100111010001","u=,g=rx,o=rw"],[2514,"4722","100111010010","u=,g=rx,o=rx"],[2515,"4723","100111010011","u=,g=rx,o=r"],[2516,"4724","100111010100","u=,g=rx,o=wx"],[2517,"4725","100111010101","u=,g=rx,o=w"],[2518,"4726","100111010110","u=,g=rx,o=x"],[2519,"4727","100111010111","u=,g=rx,o="],[2520,"4730","100111011000","u=,g=r,o=rwx"],[2521,"4731","100111011001","u=,g=r,o=rw"],[2522,"4732","100111011010","u=,g=r,o=rx"],[2523,"4733","100111011011","u=,g=r,o=r"],[2524,"4734","100111011100","u=,g=r,o=wx"],[2525,"4735","100111011101","u=,g=r,o=w"],[2526,"4736","100111011110","u=,g=r,o=x"],[2527,"4737","100111011111","u=,g=r,o="],[2528,"4740","100111100000","u=,g=wx,o=rwx"],[2529,"4741","100111100001","u=,g=wx,o=rw"],[2530,"4742","100111100010","u=,g=wx,o=rx"],[2531,"4743","100111100011","u=,g=wx,o=r"],[2532,"4744","100111100100","u=,g=wx,o=wx"],[2533,"4745","100111100101","u=,g=wx,o=w"],[2534,"4746","100111100110","u=,g=wx,o=x"],[2535,"4747","100111100111","u=,g=wx,o="],[2536,"4750","100111101000","u=,g=w,o=rwx"],[2537,"4751","100111101001","u=,g=w,o=rw"],[2538,"4752","100111101010","u=,g=w,o=rx"],[2539,"4753","100111101011","u=,g=w,o=r"],[2540,"4754","100111101100","u=,g=w,o=wx"],[2541,"4755","100111101101","u=,g=w,o=w"],[2542,"4756","100111101110","u=,g=w,o=x"],[2543,"4757","100111101111","u=,g=w,o="],[2544,"4760","100111110000","u=,g=x,o=rwx"],[2545,"4761","100111110001","u=,g=x,o=rw"],[2546,"4762","100111110010","u=,g=x,o=rx"],[2547,"4763","100111110011","u=,g=x,o=r"],[2548,"4764","100111110100","u=,g=x,o=wx"],[2549,"4765","100111110101","u=,g=x,o=w"],[2550,"4766","100111110110","u=,g=x,o=x"],[2551,"4767","100111110111","u=,g=x,o="],[2552,"4770","100111111000","u=,g=,o=rwx"],[2553,"4771","100111111001","u=,g=,o=rw"],[2554,"4772","100111111010","u=,g=,o=rx"],[2555,"4773","100111111011","u=,g=,o=r"],[2556,"4774","100111111100","u=,g=,o=wx"],[2557,"4775","100111111101","u=,g=,o=w"],[2558,"4776","100111111110","u=,g=,o=x"],[2559,"4777","100111111111","u=,g=,o="],[2560,"5000","101000000000","u=rwx,g=rwx,o=rwx"],[2561,"5001","101000000001","u=rwx,g=rwx,o=rw"],[2562,"5002","101000000010","u=rwx,g=rwx,o=rx"],[2563,"5003","101000000011","u=rwx,g=rwx,o=r"],[2564,"5004","101000000100","u=rwx,g=rwx,o=wx"],[2565,"5005","101000000101","u=rwx,g=rwx,o=w"],[2566,"5006","101000000110","u=rwx,g=rwx,o=x"],[2567,"5007","101000000111","u=rwx,g=rwx,o="],[2568,"5010","101000001000","u=rwx,g=rw,o=rwx"],[2569,"5011","101000001001","u=rwx,g=rw,o=rw"],[2570,"5012","101000001010","u=rwx,g=rw,o=rx"],[2571,"5013","101000001011","u=rwx,g=rw,o=r"],[2572,"5014","101000001100","u=rwx,g=rw,o=wx"],[2573,"5015","101000001101","u=rwx,g=rw,o=w"],[2574,"5016","101000001110","u=rwx,g=rw,o=x"],[2575,"5017","101000001111","u=rwx,g=rw,o="],[2576,"5020","101000010000","u=rwx,g=rx,o=rwx"],[2577,"5021","101000010001","u=rwx,g=rx,o=rw"],[2578,"5022","101000010010","u=rwx,g=rx,o=rx"],[2579,"5023","101000010011","u=rwx,g=rx,o=r"],[2580,"5024","101000010100","u=rwx,g=rx,o=wx"],[2581,"5025","101000010101","u=rwx,g=rx,o=w"],[2582,"5026","101000010110","u=rwx,g=rx,o=x"],[2583,"5027","101000010111","u=rwx,g=rx,o="],[2584,"5030","101000011000","u=rwx,g=r,o=rwx"],[2585,"5031","101000011001","u=rwx,g=r,o=rw"],[2586,"5032","101000011010","u=rwx,g=r,o=rx"],[2587,"5033","101000011011","u=rwx,g=r,o=r"],[2588,"5034","101000011100","u=rwx,g=r,o=wx"],[2589,"5035","101000011101","u=rwx,g=r,o=w"],[2590,"5036","101000011110","u=rwx,g=r,o=x"],[2591,"5037","101000011111","u=rwx,g=r,o="],[2592,"5040","101000100000","u=rwx,g=wx,o=rwx"],[2593,"5041","101000100001","u=rwx,g=wx,o=rw"],[2594,"5042","101000100010","u=rwx,g=wx,o=rx"],[2595,"5043","101000100011","u=rwx,g=wx,o=r"],[2596,"5044","101000100100","u=rwx,g=wx,o=wx"],[2597,"5045","101000100101","u=rwx,g=wx,o=w"],[2598,"5046","101000100110","u=rwx,g=wx,o=x"],[2599,"5047","101000100111","u=rwx,g=wx,o="],[2600,"5050","101000101000","u=rwx,g=w,o=rwx"],[2601,"5051","101000101001","u=rwx,g=w,o=rw"],[2602,"5052","101000101010","u=rwx,g=w,o=rx"],[2603,"5053","101000101011","u=rwx,g=w,o=r"],[2604,"5054","101000101100","u=rwx,g=w,o=wx"],[2605,"5055","101000101101","u=rwx,g=w,o=w"],[2606,"5056","101000101110","u=rwx,g=w,o=x"],[2607,"5057","101000101111","u=rwx,g=w,o="],[2608,"5060","101000110000","u=rwx,g=x,o=rwx"],[2609,"5061","101000110001","u=rwx,g=x,o=rw"],[2610,"5062","101000110010","u=rwx,g=x,o=rx"],[2611,"5063","101000110011","u=rwx,g=x,o=r"],[2612,"5064","101000110100","u=rwx,g=x,o=wx"],[2613,"5065","101000110101","u=rwx,g=x,o=w"],[2614,"5066","101000110110","u=rwx,g=x,o=x"],[2615,"5067","101000110111","u=rwx,g=x,o="],[2616,"5070","101000111000","u=rwx,g=,o=rwx"],[2617,"5071","101000111001","u=rwx,g=,o=rw"],[2618,"5072","101000111010","u=rwx,g=,o=rx"],[2619,"5073","101000111011","u=rwx,g=,o=r"],[2620,"5074","101000111100","u=rwx,g=,o=wx"],[2621,"5075","101000111101","u=rwx,g=,o=w"],[2622,"5076","101000111110","u=rwx,g=,o=x"],[2623,"5077","101000111111","u=rwx,g=,o="],[2624,"5100","101001000000","u=rw,g=rwx,o=rwx"],[2625,"5101","101001000001","u=rw,g=rwx,o=rw"],[2626,"5102","101001000010","u=rw,g=rwx,o=rx"],[2627,"5103","101001000011","u=rw,g=rwx,o=r"],[2628,"5104","101001000100","u=rw,g=rwx,o=wx"],[2629,"5105","101001000101","u=rw,g=rwx,o=w"],[2630,"5106","101001000110","u=rw,g=rwx,o=x"],[2631,"5107","101001000111","u=rw,g=rwx,o="],[2632,"5110","101001001000","u=rw,g=rw,o=rwx"],[2633,"5111","101001001001","u=rw,g=rw,o=rw"],[2634,"5112","101001001010","u=rw,g=rw,o=rx"],[2635,"5113","101001001011","u=rw,g=rw,o=r"],[2636,"5114","101001001100","u=rw,g=rw,o=wx"],[2637,"5115","101001001101","u=rw,g=rw,o=w"],[2638,"5116","101001001110","u=rw,g=rw,o=x"],[2639,"5117","101001001111","u=rw,g=rw,o="],[2640,"5120","101001010000","u=rw,g=rx,o=rwx"],[2641,"5121","101001010001","u=rw,g=rx,o=rw"],[2642,"5122","101001010010","u=rw,g=rx,o=rx"],[2643,"5123","101001010011","u=rw,g=rx,o=r"],[2644,"5124","101001010100","u=rw,g=rx,o=wx"],[2645,"5125","101001010101","u=rw,g=rx,o=w"],[2646,"5126","101001010110","u=rw,g=rx,o=x"],[2647,"5127","101001010111","u=rw,g=rx,o="],[2648,"5130","101001011000","u=rw,g=r,o=rwx"],[2649,"5131","101001011001","u=rw,g=r,o=rw"],[2650,"5132","101001011010","u=rw,g=r,o=rx"],[2651,"5133","101001011011","u=rw,g=r,o=r"],[2652,"5134","101001011100","u=rw,g=r,o=wx"],[2653,"5135","101001011101","u=rw,g=r,o=w"],[2654,"5136","101001011110","u=rw,g=r,o=x"],[2655,"5137","101001011111","u=rw,g=r,o="],[2656,"5140","101001100000","u=rw,g=wx,o=rwx"],[2657,"5141","101001100001","u=rw,g=wx,o=rw"],[2658,"5142","101001100010","u=rw,g=wx,o=rx"],[2659,"5143","101001100011","u=rw,g=wx,o=r"],[2660,"5144","101001100100","u=rw,g=wx,o=wx"],[2661,"5145","101001100101","u=rw,g=wx,o=w"],[2662,"5146","101001100110","u=rw,g=wx,o=x"],[2663,"5147","101001100111","u=rw,g=wx,o="],[2664,"5150","101001101000","u=rw,g=w,o=rwx"],[2665,"5151","101001101001","u=rw,g=w,o=rw"],[2666,"5152","101001101010","u=rw,g=w,o=rx"],[2667,"5153","101001101011","u=rw,g=w,o=r"],[2668,"5154","101001101100","u=rw,g=w,o=wx"],[2669,"5155","101001101101","u=rw,g=w,o=w"],[2670,"5156","101001101110","u=rw,g=w,o=x"],[2671,"5157","101001101111","u=rw,g=w,o="],[2672,"5160","101001110000","u=rw,g=x,o=rwx"],[2673,"5161","101001110001","u=rw,g=x,o=rw"],[2674,"5162","101001110010","u=rw,g=x,o=rx"],[2675,"5163","101001110011","u=rw,g=x,o=r"],[2676,"5164","101001110100","u=rw,g=x,o=wx"],[2677,"5165","101001110101","u=rw,g=x,o=w"],[2678,"5166","101001110110","u=rw,g=x,o=x"],[2679,"5167","101001110111","u=rw,g=x,o="],[2680,"5170","101001111000","u=rw,g=,o=rwx"],[2681,"5171","101001111001","u=rw,g=,o=rw"],[2682,"5172","101001111010","u=rw,g=,o=rx"],[2683,"5173","101001111011","u=rw,g=,o=r"],[2684,"5174","101001111100","u=rw,g=,o=wx"],[2685,"5175","101001111101","u=rw,g=,o=w"],[2686,"5176","101001111110","u=rw,g=,o=x"],[2687,"5177","101001111111","u=rw,g=,o="],[2688,"5200","101010000000","u=rx,g=rwx,o=rwx"],[2689,"5201","101010000001","u=rx,g=rwx,o=rw"],[2690,"5202","101010000010","u=rx,g=rwx,o=rx"],[2691,"5203","101010000011","u=rx,g=rwx,o=r"],[2692,"5204","101010000100","u=rx,g=rwx,o=wx"],[2693,"5205","101010000101","u=rx,g=rwx,o=w"],[2694,"5206","101010000110","u=rx,g=rwx,o=x"],[2695,"5207","101010000111","u=rx,g=rwx,o="],[2696,"5210","101010001000","u=rx,g=rw,o=rwx"],[2697,"5211","101010001001","u=rx,g=rw,o=rw"],[2698,"5212","101010001010","u=rx,g=rw,o=rx"],[2699,"5213","101010001011","u=rx,g=rw,o=r"],[2700,"5214","101010001100","u=rx,g=rw,o=wx"],[2701,"5215","101010001101","u=rx,g=rw,o=w"],[2702,"5216","101010001110","u=rx,g=rw,o=x"],[2703,"5217","101010001111","u=rx,g=rw,o="],[2704,"5220","101010010000","u=rx,g=rx,o=rwx"],[2705,"5221","101010010001","u=rx,g=rx,o=rw"],[2706,"5222","101010010010","u=rx,g=rx,o=rx"],[2707,"5223","101010010011","u=rx,g=rx,o=r"],[2708,"5224","101010010100","u=rx,g=rx,o=wx"],[2709,"5225","101010010101","u=rx,g=rx,o=w"],[2710,"5226","101010010110","u=rx,g=rx,o=x"],[2711,"5227","101010010111","u=rx,g=rx,o="],[2712,"5230","101010011000","u=rx,g=r,o=rwx"],[2713,"5231","101010011001","u=rx,g=r,o=rw"],[2714,"5232","101010011010","u=rx,g=r,o=rx"],[2715,"5233","101010011011","u=rx,g=r,o=r"],[2716,"5234","101010011100","u=rx,g=r,o=wx"],[2717,"5235","101010011101","u=rx,g=r,o=w"],[2718,"5236","101010011110","u=rx,g=r,o=x"],[2719,"5237","101010011111","u=rx,g=r,o="],[2720,"5240","101010100000","u=rx,g=wx,o=rwx"],[2721,"5241","101010100001","u=rx,g=wx,o=rw"],[2722,"5242","101010100010","u=rx,g=wx,o=rx"],[2723,"5243","101010100011","u=rx,g=wx,o=r"],[2724,"5244","101010100100","u=rx,g=wx,o=wx"],[2725,"5245","101010100101","u=rx,g=wx,o=w"],[2726,"5246","101010100110","u=rx,g=wx,o=x"],[2727,"5247","101010100111","u=rx,g=wx,o="],[2728,"5250","101010101000","u=rx,g=w,o=rwx"],[2729,"5251","101010101001","u=rx,g=w,o=rw"],[2730,"5252","101010101010","u=rx,g=w,o=rx"],[2731,"5253","101010101011","u=rx,g=w,o=r"],[2732,"5254","101010101100","u=rx,g=w,o=wx"],[2733,"5255","101010101101","u=rx,g=w,o=w"],[2734,"5256","101010101110","u=rx,g=w,o=x"],[2735,"5257","101010101111","u=rx,g=w,o="],[2736,"5260","101010110000","u=rx,g=x,o=rwx"],[2737,"5261","101010110001","u=rx,g=x,o=rw"],[2738,"5262","101010110010","u=rx,g=x,o=rx"],[2739,"5263","101010110011","u=rx,g=x,o=r"],[2740,"5264","101010110100","u=rx,g=x,o=wx"],[2741,"5265","101010110101","u=rx,g=x,o=w"],[2742,"5266","101010110110","u=rx,g=x,o=x"],[2743,"5267","101010110111","u=rx,g=x,o="],[2744,"5270","101010111000","u=rx,g=,o=rwx"],[2745,"5271","101010111001","u=rx,g=,o=rw"],[2746,"5272","101010111010","u=rx,g=,o=rx"],[2747,"5273","101010111011","u=rx,g=,o=r"],[2748,"5274","101010111100","u=rx,g=,o=wx"],[2749,"5275","101010111101","u=rx,g=,o=w"],[2750,"5276","101010111110","u=rx,g=,o=x"],[2751,"5277","101010111111","u=rx,g=,o="],[2752,"5300","101011000000","u=r,g=rwx,o=rwx"],[2753,"5301","101011000001","u=r,g=rwx,o=rw"],[2754,"5302","101011000010","u=r,g=rwx,o=rx"],[2755,"5303","101011000011","u=r,g=rwx,o=r"],[2756,"5304","101011000100","u=r,g=rwx,o=wx"],[2757,"5305","101011000101","u=r,g=rwx,o=w"],[2758,"5306","101011000110","u=r,g=rwx,o=x"],[2759,"5307","101011000111","u=r,g=rwx,o="],[2760,"5310","101011001000","u=r,g=rw,o=rwx"],[2761,"5311","101011001001","u=r,g=rw,o=rw"],[2762,"5312","101011001010","u=r,g=rw,o=rx"],[2763,"5313","101011001011","u=r,g=rw,o=r"],[2764,"5314","101011001100","u=r,g=rw,o=wx"],[2765,"5315","101011001101","u=r,g=rw,o=w"],[2766,"5316","101011001110","u=r,g=rw,o=x"],[2767,"5317","101011001111","u=r,g=rw,o="],[2768,"5320","101011010000","u=r,g=rx,o=rwx"],[2769,"5321","101011010001","u=r,g=rx,o=rw"],[2770,"5322","101011010010","u=r,g=rx,o=rx"],[2771,"5323","101011010011","u=r,g=rx,o=r"],[2772,"5324","101011010100","u=r,g=rx,o=wx"],[2773,"5325","101011010101","u=r,g=rx,o=w"],[2774,"5326","101011010110","u=r,g=rx,o=x"],[2775,"5327","101011010111","u=r,g=rx,o="],[2776,"5330","101011011000","u=r,g=r,o=rwx"],[2777,"5331","101011011001","u=r,g=r,o=rw"],[2778,"5332","101011011010","u=r,g=r,o=rx"],[2779,"5333","101011011011","u=r,g=r,o=r"],[2780,"5334","101011011100","u=r,g=r,o=wx"],[2781,"5335","101011011101","u=r,g=r,o=w"],[2782,"5336","101011011110","u=r,g=r,o=x"],[2783,"5337","101011011111","u=r,g=r,o="],[2784,"5340","101011100000","u=r,g=wx,o=rwx"],[2785,"5341","101011100001","u=r,g=wx,o=rw"],[2786,"5342","101011100010","u=r,g=wx,o=rx"],[2787,"5343","101011100011","u=r,g=wx,o=r"],[2788,"5344","101011100100","u=r,g=wx,o=wx"],[2789,"5345","101011100101","u=r,g=wx,o=w"],[2790,"5346","101011100110","u=r,g=wx,o=x"],[2791,"5347","101011100111","u=r,g=wx,o="],[2792,"5350","101011101000","u=r,g=w,o=rwx"],[2793,"5351","101011101001","u=r,g=w,o=rw"],[2794,"5352","101011101010","u=r,g=w,o=rx"],[2795,"5353","101011101011","u=r,g=w,o=r"],[2796,"5354","101011101100","u=r,g=w,o=wx"],[2797,"5355","101011101101","u=r,g=w,o=w"],[2798,"5356","101011101110","u=r,g=w,o=x"],[2799,"5357","101011101111","u=r,g=w,o="],[2800,"5360","101011110000","u=r,g=x,o=rwx"],[2801,"5361","101011110001","u=r,g=x,o=rw"],[2802,"5362","101011110010","u=r,g=x,o=rx"],[2803,"5363","101011110011","u=r,g=x,o=r"],[2804,"5364","101011110100","u=r,g=x,o=wx"],[2805,"5365","101011110101","u=r,g=x,o=w"],[2806,"5366","101011110110","u=r,g=x,o=x"],[2807,"5367","101011110111","u=r,g=x,o="],[2808,"5370","101011111000","u=r,g=,o=rwx"],[2809,"5371","101011111001","u=r,g=,o=rw"],[2810,"5372","101011111010","u=r,g=,o=rx"],[2811,"5373","101011111011","u=r,g=,o=r"],[2812,"5374","101011111100","u=r,g=,o=wx"],[2813,"5375","101011111101","u=r,g=,o=w"],[2814,"5376","101011111110","u=r,g=,o=x"],[2815,"5377","101011111111","u=r,g=,o="],[2816,"5400","101100000000","u=wx,g=rwx,o=rwx"],[2817,"5401","101100000001","u=wx,g=rwx,o=rw"],[2818,"5402","101100000010","u=wx,g=rwx,o=rx"],[2819,"5403","101100000011","u=wx,g=rwx,o=r"],[2820,"5404","101100000100","u=wx,g=rwx,o=wx"],[2821,"5405","101100000101","u=wx,g=rwx,o=w"],[2822,"5406","101100000110","u=wx,g=rwx,o=x"],[2823,"5407","101100000111","u=wx,g=rwx,o="],[2824,"5410","101100001000","u=wx,g=rw,o=rwx"],[2825,"5411","101100001001","u=wx,g=rw,o=rw"],[2826,"5412","101100001010","u=wx,g=rw,o=rx"],[2827,"5413","101100001011","u=wx,g=rw,o=r"],[2828,"5414","101100001100","u=wx,g=rw,o=wx"],[2829,"5415","101100001101","u=wx,g=rw,o=w"],[2830,"5416","101100001110","u=wx,g=rw,o=x"],[2831,"5417","101100001111","u=wx,g=rw,o="],[2832,"5420","101100010000","u=wx,g=rx,o=rwx"],[2833,"5421","101100010001","u=wx,g=rx,o=rw"],[2834,"5422","101100010010","u=wx,g=rx,o=rx"],[2835,"5423","101100010011","u=wx,g=rx,o=r"],[2836,"5424","101100010100","u=wx,g=rx,o=wx"],[2837,"5425","101100010101","u=wx,g=rx,o=w"],[2838,"5426","101100010110","u=wx,g=rx,o=x"],[2839,"5427","101100010111","u=wx,g=rx,o="],[2840,"5430","101100011000","u=wx,g=r,o=rwx"],[2841,"5431","101100011001","u=wx,g=r,o=rw"],[2842,"5432","101100011010","u=wx,g=r,o=rx"],[2843,"5433","101100011011","u=wx,g=r,o=r"],[2844,"5434","101100011100","u=wx,g=r,o=wx"],[2845,"5435","101100011101","u=wx,g=r,o=w"],[2846,"5436","101100011110","u=wx,g=r,o=x"],[2847,"5437","101100011111","u=wx,g=r,o="],[2848,"5440","101100100000","u=wx,g=wx,o=rwx"],[2849,"5441","101100100001","u=wx,g=wx,o=rw"],[2850,"5442","101100100010","u=wx,g=wx,o=rx"],[2851,"5443","101100100011","u=wx,g=wx,o=r"],[2852,"5444","101100100100","u=wx,g=wx,o=wx"],[2853,"5445","101100100101","u=wx,g=wx,o=w"],[2854,"5446","101100100110","u=wx,g=wx,o=x"],[2855,"5447","101100100111","u=wx,g=wx,o="],[2856,"5450","101100101000","u=wx,g=w,o=rwx"],[2857,"5451","101100101001","u=wx,g=w,o=rw"],[2858,"5452","101100101010","u=wx,g=w,o=rx"],[2859,"5453","101100101011","u=wx,g=w,o=r"],[2860,"5454","101100101100","u=wx,g=w,o=wx"],[2861,"5455","101100101101","u=wx,g=w,o=w"],[2862,"5456","101100101110","u=wx,g=w,o=x"],[2863,"5457","101100101111","u=wx,g=w,o="],[2864,"5460","101100110000","u=wx,g=x,o=rwx"],[2865,"5461","101100110001","u=wx,g=x,o=rw"],[2866,"5462","101100110010","u=wx,g=x,o=rx"],[2867,"5463","101100110011","u=wx,g=x,o=r"],[2868,"5464","101100110100","u=wx,g=x,o=wx"],[2869,"5465","101100110101","u=wx,g=x,o=w"],[2870,"5466","101100110110","u=wx,g=x,o=x"],[2871,"5467","101100110111","u=wx,g=x,o="],[2872,"5470","101100111000","u=wx,g=,o=rwx"],[2873,"5471","101100111001","u=wx,g=,o=rw"],[2874,"5472","101100111010","u=wx,g=,o=rx"],[2875,"5473","101100111011","u=wx,g=,o=r"],[2876,"5474","101100111100","u=wx,g=,o=wx"],[2877,"5475","101100111101","u=wx,g=,o=w"],[2878,"5476","101100111110","u=wx,g=,o=x"],[2879,"5477","101100111111","u=wx,g=,o="],[2880,"5500","101101000000","u=w,g=rwx,o=rwx"],[2881,"5501","101101000001","u=w,g=rwx,o=rw"],[2882,"5502","101101000010","u=w,g=rwx,o=rx"],[2883,"5503","101101000011","u=w,g=rwx,o=r"],[2884,"5504","101101000100","u=w,g=rwx,o=wx"],[2885,"5505","101101000101","u=w,g=rwx,o=w"],[2886,"5506","101101000110","u=w,g=rwx,o=x"],[2887,"5507","101101000111","u=w,g=rwx,o="],[2888,"5510","101101001000","u=w,g=rw,o=rwx"],[2889,"5511","101101001001","u=w,g=rw,o=rw"],[2890,"5512","101101001010","u=w,g=rw,o=rx"],[2891,"5513","101101001011","u=w,g=rw,o=r"],[2892,"5514","101101001100","u=w,g=rw,o=wx"],[2893,"5515","101101001101","u=w,g=rw,o=w"],[2894,"5516","101101001110","u=w,g=rw,o=x"],[2895,"5517","101101001111","u=w,g=rw,o="],[2896,"5520","101101010000","u=w,g=rx,o=rwx"],[2897,"5521","101101010001","u=w,g=rx,o=rw"],[2898,"5522","101101010010","u=w,g=rx,o=rx"],[2899,"5523","101101010011","u=w,g=rx,o=r"],[2900,"5524","101101010100","u=w,g=rx,o=wx"],[2901,"5525","101101010101","u=w,g=rx,o=w"],[2902,"5526","101101010110","u=w,g=rx,o=x"],[2903,"5527","101101010111","u=w,g=rx,o="],[2904,"5530","101101011000","u=w,g=r,o=rwx"],[2905,"5531","101101011001","u=w,g=r,o=rw"],[2906,"5532","101101011010","u=w,g=r,o=rx"],[2907,"5533","101101011011","u=w,g=r,o=r"],[2908,"5534","101101011100","u=w,g=r,o=wx"],[2909,"5535","101101011101","u=w,g=r,o=w"],[2910,"5536","101101011110","u=w,g=r,o=x"],[2911,"5537","101101011111","u=w,g=r,o="],[2912,"5540","101101100000","u=w,g=wx,o=rwx"],[2913,"5541","101101100001","u=w,g=wx,o=rw"],[2914,"5542","101101100010","u=w,g=wx,o=rx"],[2915,"5543","101101100011","u=w,g=wx,o=r"],[2916,"5544","101101100100","u=w,g=wx,o=wx"],[2917,"5545","101101100101","u=w,g=wx,o=w"],[2918,"5546","101101100110","u=w,g=wx,o=x"],[2919,"5547","101101100111","u=w,g=wx,o="],[2920,"5550","101101101000","u=w,g=w,o=rwx"],[2921,"5551","101101101001","u=w,g=w,o=rw"],[2922,"5552","101101101010","u=w,g=w,o=rx"],[2923,"5553","101101101011","u=w,g=w,o=r"],[2924,"5554","101101101100","u=w,g=w,o=wx"],[2925,"5555","101101101101","u=w,g=w,o=w"],[2926,"5556","101101101110","u=w,g=w,o=x"],[2927,"5557","101101101111","u=w,g=w,o="],[2928,"5560","101101110000","u=w,g=x,o=rwx"],[2929,"5561","101101110001","u=w,g=x,o=rw"],[2930,"5562","101101110010","u=w,g=x,o=rx"],[2931,"5563","101101110011","u=w,g=x,o=r"],[2932,"5564","101101110100","u=w,g=x,o=wx"],[2933,"5565","101101110101","u=w,g=x,o=w"],[2934,"5566","101101110110","u=w,g=x,o=x"],[2935,"5567","101101110111","u=w,g=x,o="],[2936,"5570","101101111000","u=w,g=,o=rwx"],[2937,"5571","101101111001","u=w,g=,o=rw"],[2938,"5572","101101111010","u=w,g=,o=rx"],[2939,"5573","101101111011","u=w,g=,o=r"],[2940,"5574","101101111100","u=w,g=,o=wx"],[2941,"5575","101101111101","u=w,g=,o=w"],[2942,"5576","101101111110","u=w,g=,o=x"],[2943,"5577","101101111111","u=w,g=,o="],[2944,"5600","101110000000","u=x,g=rwx,o=rwx"],[2945,"5601","101110000001","u=x,g=rwx,o=rw"],[2946,"5602","101110000010","u=x,g=rwx,o=rx"],[2947,"5603","101110000011","u=x,g=rwx,o=r"],[2948,"5604","101110000100","u=x,g=rwx,o=wx"],[2949,"5605","101110000101","u=x,g=rwx,o=w"],[2950,"5606","101110000110","u=x,g=rwx,o=x"],[2951,"5607","101110000111","u=x,g=rwx,o="],[2952,"5610","101110001000","u=x,g=rw,o=rwx"],[2953,"5611","101110001001","u=x,g=rw,o=rw"],[2954,"5612","101110001010","u=x,g=rw,o=rx"],[2955,"5613","101110001011","u=x,g=rw,o=r"],[2956,"5614","101110001100","u=x,g=rw,o=wx"],[2957,"5615","101110001101","u=x,g=rw,o=w"],[2958,"5616","101110001110","u=x,g=rw,o=x"],[2959,"5617","101110001111","u=x,g=rw,o="],[2960,"5620","101110010000","u=x,g=rx,o=rwx"],[2961,"5621","101110010001","u=x,g=rx,o=rw"],[2962,"5622","101110010010","u=x,g=rx,o=rx"],[2963,"5623","101110010011","u=x,g=rx,o=r"],[2964,"5624","101110010100","u=x,g=rx,o=wx"],[2965,"5625","101110010101","u=x,g=rx,o=w"],[2966,"5626","101110010110","u=x,g=rx,o=x"],[2967,"5627","101110010111","u=x,g=rx,o="],[2968,"5630","101110011000","u=x,g=r,o=rwx"],[2969,"5631","101110011001","u=x,g=r,o=rw"],[2970,"5632","101110011010","u=x,g=r,o=rx"],[2971,"5633","101110011011","u=x,g=r,o=r"],[2972,"5634","101110011100","u=x,g=r,o=wx"],[2973,"5635","101110011101","u=x,g=r,o=w"],[2974,"5636","101110011110","u=x,g=r,o=x"],[2975,"5637","101110011111","u=x,g=r,o="],[2976,"5640","101110100000","u=x,g=wx,o=rwx"],[2977,"5641","101110100001","u=x,g=wx,o=rw"],[2978,"5642","101110100010","u=x,g=wx,o=rx"],[2979,"5643","101110100011","u=x,g=wx,o=r"],[2980,"5644","101110100100","u=x,g=wx,o=wx"],[2981,"5645","101110100101","u=x,g=wx,o=w"],[2982,"5646","101110100110","u=x,g=wx,o=x"],[2983,"5647","101110100111","u=x,g=wx,o="],[2984,"5650","101110101000","u=x,g=w,o=rwx"],[2985,"5651","101110101001","u=x,g=w,o=rw"],[2986,"5652","101110101010","u=x,g=w,o=rx"],[2987,"5653","101110101011","u=x,g=w,o=r"],[2988,"5654","101110101100","u=x,g=w,o=wx"],[2989,"5655","101110101101","u=x,g=w,o=w"],[2990,"5656","101110101110","u=x,g=w,o=x"],[2991,"5657","101110101111","u=x,g=w,o="],[2992,"5660","101110110000","u=x,g=x,o=rwx"],[2993,"5661","101110110001","u=x,g=x,o=rw"],[2994,"5662","101110110010","u=x,g=x,o=rx"],[2995,"5663","101110110011","u=x,g=x,o=r"],[2996,"5664","101110110100","u=x,g=x,o=wx"],[2997,"5665","101110110101","u=x,g=x,o=w"],[2998,"5666","101110110110","u=x,g=x,o=x"],[2999,"5667","101110110111","u=x,g=x,o="],[3000,"5670","101110111000","u=x,g=,o=rwx"],[3001,"5671","101110111001","u=x,g=,o=rw"],[3002,"5672","101110111010","u=x,g=,o=rx"],[3003,"5673","101110111011","u=x,g=,o=r"],[3004,"5674","101110111100","u=x,g=,o=wx"],[3005,"5675","101110111101","u=x,g=,o=w"],[3006,"5676","101110111110","u=x,g=,o=x"],[3007,"5677","101110111111","u=x,g=,o="],[3008,"5700","101111000000","u=,g=rwx,o=rwx"],[3009,"5701","101111000001","u=,g=rwx,o=rw"],[3010,"5702","101111000010","u=,g=rwx,o=rx"],[3011,"5703","101111000011","u=,g=rwx,o=r"],[3012,"5704","101111000100","u=,g=rwx,o=wx"],[3013,"5705","101111000101","u=,g=rwx,o=w"],[3014,"5706","101111000110","u=,g=rwx,o=x"],[3015,"5707","101111000111","u=,g=rwx,o="],[3016,"5710","101111001000","u=,g=rw,o=rwx"],[3017,"5711","101111001001","u=,g=rw,o=rw"],[3018,"5712","101111001010","u=,g=rw,o=rx"],[3019,"5713","101111001011","u=,g=rw,o=r"],[3020,"5714","101111001100","u=,g=rw,o=wx"],[3021,"5715","101111001101","u=,g=rw,o=w"],[3022,"5716","101111001110","u=,g=rw,o=x"],[3023,"5717","101111001111","u=,g=rw,o="],[3024,"5720","101111010000","u=,g=rx,o=rwx"],[3025,"5721","101111010001","u=,g=rx,o=rw"],[3026,"5722","101111010010","u=,g=rx,o=rx"],[3027,"5723","101111010011","u=,g=rx,o=r"],[3028,"5724","101111010100","u=,g=rx,o=wx"],[3029,"5725","101111010101","u=,g=rx,o=w"],[3030,"5726","101111010110","u=,g=rx,o=x"],[3031,"5727","101111010111","u=,g=rx,o="],[3032,"5730","101111011000","u=,g=r,o=rwx"],[3033,"5731","101111011001","u=,g=r,o=rw"],[3034,"5732","101111011010","u=,g=r,o=rx"],[3035,"5733","101111011011","u=,g=r,o=r"],[3036,"5734","101111011100","u=,g=r,o=wx"],[3037,"5735","101111011101","u=,g=r,o=w"],[3038,"5736","101111011110","u=,g=r,o=x"],[3039,"5737","101111011111","u=,g=r,o="],[3040,"5740","101111100000","u=,g=wx,o=rwx"],[3041,"5741","101111100001","u=,g=wx,o=rw"],[3042,"5742","101111100010","u=,g=wx,o=rx"],[3043,"5743","101111100011","u=,g=wx,o=r"],[3044,"5744","101111100100","u=,g=wx,o=wx"],[3045,"5745","101111100101","u=,g=wx,o=w"],[3046,"5746","101111100110","u=,g=wx,o=x"],[3047,"5747","101111100111","u=,g=wx,o="],[3048,"5750","101111101000","u=,g=w,o=rwx"],[3049,"5751","101111101001","u=,g=w,o=rw"],[3050,"5752","101111101010","u=,g=w,o=rx"],[3051,"5753","101111101011","u=,g=w,o=r"],[3052,"5754","101111101100","u=,g=w,o=wx"],[3053,"5755","101111101101","u=,g=w,o=w"],[3054,"5756","101111101110","u=,g=w,o=x"],[3055,"5757","101111101111","u=,g=w,o="],[3056,"5760","101111110000","u=,g=x,o=rwx"],[3057,"5761","101111110001","u=,g=x,o=rw"],[3058,"5762","101111110010","u=,g=x,o=rx"],[3059,"5763","101111110011","u=,g=x,o=r"],[3060,"5764","101111110100","u=,g=x,o=wx"],[3061,"5765","101111110101","u=,g=x,o=w"],[3062,"5766","101111110110","u=,g=x,o=x"],[3063,"5767","101111110111","u=,g=x,o="],[3064,"5770","101111111000","u=,g=,o=rwx"],[3065,"5771","101111111001","u=,g=,o=rw"],[3066,"5772","101111111010","u=,g=,o=rx"],[3067,"5773","101111111011","u=,g=,o=r"],[3068,"5774","101111111100","u=,g=,o=wx"],[3069,"5775","101111111101","u=,g=,o=w"],[3070,"5776","101111111110","u=,g=,o=x"],[3071,"5777","101111111111","u=,g=,o="],[3072,"6000","110000000000","u=rwx,g=rwx,o=rwx"],[3073,"6001","110000000001","u=rwx,g=rwx,o=rw"],[3074,"6002","110000000010","u=rwx,g=rwx,o=rx"],[3075,"6003","110000000011","u=rwx,g=rwx,o=r"],[3076,"6004","110000000100","u=rwx,g=rwx,o=wx"],[3077,"6005","110000000101","u=rwx,g=rwx,o=w"],[3078,"6006","110000000110","u=rwx,g=rwx,o=x"],[3079,"6007","110000000111","u=rwx,g=rwx,o="],[3080,"6010","110000001000","u=rwx,g=rw,o=rwx"],[3081,"6011","110000001001","u=rwx,g=rw,o=rw"],[3082,"6012","110000001010","u=rwx,g=rw,o=rx"],[3083,"6013","110000001011","u=rwx,g=rw,o=r"],[3084,"6014","110000001100","u=rwx,g=rw,o=wx"],[3085,"6015","110000001101","u=rwx,g=rw,o=w"],[3086,"6016","110000001110","u=rwx,g=rw,o=x"],[3087,"6017","110000001111","u=rwx,g=rw,o="],[3088,"6020","110000010000","u=rwx,g=rx,o=rwx"],[3089,"6021","110000010001","u=rwx,g=rx,o=rw"],[3090,"6022","110000010010","u=rwx,g=rx,o=rx"],[3091,"6023","110000010011","u=rwx,g=rx,o=r"],[3092,"6024","110000010100","u=rwx,g=rx,o=wx"],[3093,"6025","110000010101","u=rwx,g=rx,o=w"],[3094,"6026","110000010110","u=rwx,g=rx,o=x"],[3095,"6027","110000010111","u=rwx,g=rx,o="],[3096,"6030","110000011000","u=rwx,g=r,o=rwx"],[3097,"6031","110000011001","u=rwx,g=r,o=rw"],[3098,"6032","110000011010","u=rwx,g=r,o=rx"],[3099,"6033","110000011011","u=rwx,g=r,o=r"],[3100,"6034","110000011100","u=rwx,g=r,o=wx"],[3101,"6035","110000011101","u=rwx,g=r,o=w"],[3102,"6036","110000011110","u=rwx,g=r,o=x"],[3103,"6037","110000011111","u=rwx,g=r,o="],[3104,"6040","110000100000","u=rwx,g=wx,o=rwx"],[3105,"6041","110000100001","u=rwx,g=wx,o=rw"],[3106,"6042","110000100010","u=rwx,g=wx,o=rx"],[3107,"6043","110000100011","u=rwx,g=wx,o=r"],[3108,"6044","110000100100","u=rwx,g=wx,o=wx"],[3109,"6045","110000100101","u=rwx,g=wx,o=w"],[3110,"6046","110000100110","u=rwx,g=wx,o=x"],[3111,"6047","110000100111","u=rwx,g=wx,o="],[3112,"6050","110000101000","u=rwx,g=w,o=rwx"],[3113,"6051","110000101001","u=rwx,g=w,o=rw"],[3114,"6052","110000101010","u=rwx,g=w,o=rx"],[3115,"6053","110000101011","u=rwx,g=w,o=r"],[3116,"6054","110000101100","u=rwx,g=w,o=wx"],[3117,"6055","110000101101","u=rwx,g=w,o=w"],[3118,"6056","110000101110","u=rwx,g=w,o=x"],[3119,"6057","110000101111","u=rwx,g=w,o="],[3120,"6060","110000110000","u=rwx,g=x,o=rwx"],[3121,"6061","110000110001","u=rwx,g=x,o=rw"],[3122,"6062","110000110010","u=rwx,g=x,o=rx"],[3123,"6063","110000110011","u=rwx,g=x,o=r"],[3124,"6064","110000110100","u=rwx,g=x,o=wx"],[3125,"6065","110000110101","u=rwx,g=x,o=w"],[3126,"6066","110000110110","u=rwx,g=x,o=x"],[3127,"6067","110000110111","u=rwx,g=x,o="],[3128,"6070","110000111000","u=rwx,g=,o=rwx"],[3129,"6071","110000111001","u=rwx,g=,o=rw"],[3130,"6072","110000111010","u=rwx,g=,o=rx"],[3131,"6073","110000111011","u=rwx,g=,o=r"],[3132,"6074","110000111100","u=rwx,g=,o=wx"],[3133,"6075","110000111101","u=rwx,g=,o=w"],[3134,"6076","110000111110","u=rwx,g=,o=x"],[3135,"6077","110000111111","u=rwx,g=,o="],[3136,"6100","110001000000","u=rw,g=rwx,o=rwx"],[3137,"6101","110001000001","u=rw,g=rwx,o=rw"],[3138,"6102","110001000010","u=rw,g=rwx,o=rx"],[3139,"6103","110001000011","u=rw,g=rwx,o=r"],[3140,"6104","110001000100","u=rw,g=rwx,o=wx"],[3141,"6105","110001000101","u=rw,g=rwx,o=w"],[3142,"6106","110001000110","u=rw,g=rwx,o=x"],[3143,"6107","110001000111","u=rw,g=rwx,o="],[3144,"6110","110001001000","u=rw,g=rw,o=rwx"],[3145,"6111","110001001001","u=rw,g=rw,o=rw"],[3146,"6112","110001001010","u=rw,g=rw,o=rx"],[3147,"6113","110001001011","u=rw,g=rw,o=r"],[3148,"6114","110001001100","u=rw,g=rw,o=wx"],[3149,"6115","110001001101","u=rw,g=rw,o=w"],[3150,"6116","110001001110","u=rw,g=rw,o=x"],[3151,"6117","110001001111","u=rw,g=rw,o="],[3152,"6120","110001010000","u=rw,g=rx,o=rwx"],[3153,"6121","110001010001","u=rw,g=rx,o=rw"],[3154,"6122","110001010010","u=rw,g=rx,o=rx"],[3155,"6123","110001010011","u=rw,g=rx,o=r"],[3156,"6124","110001010100","u=rw,g=rx,o=wx"],[3157,"6125","110001010101","u=rw,g=rx,o=w"],[3158,"6126","110001010110","u=rw,g=rx,o=x"],[3159,"6127","110001010111","u=rw,g=rx,o="],[3160,"6130","110001011000","u=rw,g=r,o=rwx"],[3161,"6131","110001011001","u=rw,g=r,o=rw"],[3162,"6132","110001011010","u=rw,g=r,o=rx"],[3163,"6133","110001011011","u=rw,g=r,o=r"],[3164,"6134","110001011100","u=rw,g=r,o=wx"],[3165,"6135","110001011101","u=rw,g=r,o=w"],[3166,"6136","110001011110","u=rw,g=r,o=x"],[3167,"6137","110001011111","u=rw,g=r,o="],[3168,"6140","110001100000","u=rw,g=wx,o=rwx"],[3169,"6141","110001100001","u=rw,g=wx,o=rw"],[3170,"6142","110001100010","u=rw,g=wx,o=rx"],[3171,"6143","110001100011","u=rw,g=wx,o=r"],[3172,"6144","110001100100","u=rw,g=wx,o=wx"],[3173,"6145","110001100101","u=rw,g=wx,o=w"],[3174,"6146","110001100110","u=rw,g=wx,o=x"],[3175,"6147","110001100111","u=rw,g=wx,o="],[3176,"6150","110001101000","u=rw,g=w,o=rwx"],[3177,"6151","110001101001","u=rw,g=w,o=rw"],[3178,"6152","110001101010","u=rw,g=w,o=rx"],[3179,"6153","110001101011","u=rw,g=w,o=r"],[3180,"6154","110001101100","u=rw,g=w,o=wx"],[3181,"6155","110001101101","u=rw,g=w,o=w"],[3182,"6156","110001101110","u=rw,g=w,o=x"],[3183,"6157","110001101111","u=rw,g=w,o="],[3184,"6160","110001110000","u=rw,g=x,o=rwx"],[3185,"6161","110001110001","u=rw,g=x,o=rw"],[3186,"6162","110001110010","u=rw,g=x,o=rx"],[3187,"6163","110001110011","u=rw,g=x,o=r"],[3188,"6164","110001110100","u=rw,g=x,o=wx"],[3189,"6165","110001110101","u=rw,g=x,o=w"],[3190,"6166","110001110110","u=rw,g=x,o=x"],[3191,"6167","110001110111","u=rw,g=x,o="],[3192,"6170","110001111000","u=rw,g=,o=rwx"],[3193,"6171","110001111001","u=rw,g=,o=rw"],[3194,"6172","110001111010","u=rw,g=,o=rx"],[3195,"6173","110001111011","u=rw,g=,o=r"],[3196,"6174","110001111100","u=rw,g=,o=wx"],[3197,"6175","110001111101","u=rw,g=,o=w"],[3198,"6176","110001111110","u=rw,g=,o=x"],[3199,"6177","110001111111","u=rw,g=,o="],[3200,"6200","110010000000","u=rx,g=rwx,o=rwx"],[3201,"6201","110010000001","u=rx,g=rwx,o=rw"],[3202,"6202","110010000010","u=rx,g=rwx,o=rx"],[3203,"6203","110010000011","u=rx,g=rwx,o=r"],[3204,"6204","110010000100","u=rx,g=rwx,o=wx"],[3205,"6205","110010000101","u=rx,g=rwx,o=w"],[3206,"6206","110010000110","u=rx,g=rwx,o=x"],[3207,"6207","110010000111","u=rx,g=rwx,o="],[3208,"6210","110010001000","u=rx,g=rw,o=rwx"],[3209,"6211","110010001001","u=rx,g=rw,o=rw"],[3210,"6212","110010001010","u=rx,g=rw,o=rx"],[3211,"6213","110010001011","u=rx,g=rw,o=r"],[3212,"6214","110010001100","u=rx,g=rw,o=wx"],[3213,"6215","110010001101","u=rx,g=rw,o=w"],[3214,"6216","110010001110","u=rx,g=rw,o=x"],[3215,"6217","110010001111","u=rx,g=rw,o="],[3216,"6220","110010010000","u=rx,g=rx,o=rwx"],[3217,"6221","110010010001","u=rx,g=rx,o=rw"],[3218,"6222","110010010010","u=rx,g=rx,o=rx"],[3219,"6223","110010010011","u=rx,g=rx,o=r"],[3220,"6224","110010010100","u=rx,g=rx,o=wx"],[3221,"6225","110010010101","u=rx,g=rx,o=w"],[3222,"6226","110010010110","u=rx,g=rx,o=x"],[3223,"6227","110010010111","u=rx,g=rx,o="],[3224,"6230","110010011000","u=rx,g=r,o=rwx"],[3225,"6231","110010011001","u=rx,g=r,o=rw"],[3226,"6232","110010011010","u=rx,g=r,o=rx"],[3227,"6233","110010011011","u=rx,g=r,o=r"],[3228,"6234","110010011100","u=rx,g=r,o=wx"],[3229,"6235","110010011101","u=rx,g=r,o=w"],[3230,"6236","110010011110","u=rx,g=r,o=x"],[3231,"6237","110010011111","u=rx,g=r,o="],[3232,"6240","110010100000","u=rx,g=wx,o=rwx"],[3233,"6241","110010100001","u=rx,g=wx,o=rw"],[3234,"6242","110010100010","u=rx,g=wx,o=rx"],[3235,"6243","110010100011","u=rx,g=wx,o=r"],[3236,"6244","110010100100","u=rx,g=wx,o=wx"],[3237,"6245","110010100101","u=rx,g=wx,o=w"],[3238,"6246","110010100110","u=rx,g=wx,o=x"],[3239,"6247","110010100111","u=rx,g=wx,o="],[3240,"6250","110010101000","u=rx,g=w,o=rwx"],[3241,"6251","110010101001","u=rx,g=w,o=rw"],[3242,"6252","110010101010","u=rx,g=w,o=rx"],[3243,"6253","110010101011","u=rx,g=w,o=r"],[3244,"6254","110010101100","u=rx,g=w,o=wx"],[3245,"6255","110010101101","u=rx,g=w,o=w"],[3246,"6256","110010101110","u=rx,g=w,o=x"],[3247,"6257","110010101111","u=rx,g=w,o="],[3248,"6260","110010110000","u=rx,g=x,o=rwx"],[3249,"6261","110010110001","u=rx,g=x,o=rw"],[3250,"6262","110010110010","u=rx,g=x,o=rx"],[3251,"6263","110010110011","u=rx,g=x,o=r"],[3252,"6264","110010110100","u=rx,g=x,o=wx"],[3253,"6265","110010110101","u=rx,g=x,o=w"],[3254,"6266","110010110110","u=rx,g=x,o=x"],[3255,"6267","110010110111","u=rx,g=x,o="],[3256,"6270","110010111000","u=rx,g=,o=rwx"],[3257,"6271","110010111001","u=rx,g=,o=rw"],[3258,"6272","110010111010","u=rx,g=,o=rx"],[3259,"6273","110010111011","u=rx,g=,o=r"],[3260,"6274","110010111100","u=rx,g=,o=wx"],[3261,"6275","110010111101","u=rx,g=,o=w"],[3262,"6276","110010111110","u=rx,g=,o=x"],[3263,"6277","110010111111","u=rx,g=,o="],[3264,"6300","110011000000","u=r,g=rwx,o=rwx"],[3265,"6301","110011000001","u=r,g=rwx,o=rw"],[3266,"6302","110011000010","u=r,g=rwx,o=rx"],[3267,"6303","110011000011","u=r,g=rwx,o=r"],[3268,"6304","110011000100","u=r,g=rwx,o=wx"],[3269,"6305","110011000101","u=r,g=rwx,o=w"],[3270,"6306","110011000110","u=r,g=rwx,o=x"],[3271,"6307","110011000111","u=r,g=rwx,o="],[3272,"6310","110011001000","u=r,g=rw,o=rwx"],[3273,"6311","110011001001","u=r,g=rw,o=rw"],[3274,"6312","110011001010","u=r,g=rw,o=rx"],[3275,"6313","110011001011","u=r,g=rw,o=r"],[3276,"6314","110011001100","u=r,g=rw,o=wx"],[3277,"6315","110011001101","u=r,g=rw,o=w"],[3278,"6316","110011001110","u=r,g=rw,o=x"],[3279,"6317","110011001111","u=r,g=rw,o="],[3280,"6320","110011010000","u=r,g=rx,o=rwx"],[3281,"6321","110011010001","u=r,g=rx,o=rw"],[3282,"6322","110011010010","u=r,g=rx,o=rx"],[3283,"6323","110011010011","u=r,g=rx,o=r"],[3284,"6324","110011010100","u=r,g=rx,o=wx"],[3285,"6325","110011010101","u=r,g=rx,o=w"],[3286,"6326","110011010110","u=r,g=rx,o=x"],[3287,"6327","110011010111","u=r,g=rx,o="],[3288,"6330","110011011000","u=r,g=r,o=rwx"],[3289,"6331","110011011001","u=r,g=r,o=rw"],[3290,"6332","110011011010","u=r,g=r,o=rx"],[3291,"6333","110011011011","u=r,g=r,o=r"],[3292,"6334","110011011100","u=r,g=r,o=wx"],[3293,"6335","110011011101","u=r,g=r,o=w"],[3294,"6336","110011011110","u=r,g=r,o=x"],[3295,"6337","110011011111","u=r,g=r,o="],[3296,"6340","110011100000","u=r,g=wx,o=rwx"],[3297,"6341","110011100001","u=r,g=wx,o=rw"],[3298,"6342","110011100010","u=r,g=wx,o=rx"],[3299,"6343","110011100011","u=r,g=wx,o=r"],[3300,"6344","110011100100","u=r,g=wx,o=wx"],[3301,"6345","110011100101","u=r,g=wx,o=w"],[3302,"6346","110011100110","u=r,g=wx,o=x"],[3303,"6347","110011100111","u=r,g=wx,o="],[3304,"6350","110011101000","u=r,g=w,o=rwx"],[3305,"6351","110011101001","u=r,g=w,o=rw"],[3306,"6352","110011101010","u=r,g=w,o=rx"],[3307,"6353","110011101011","u=r,g=w,o=r"],[3308,"6354","110011101100","u=r,g=w,o=wx"],[3309,"6355","110011101101","u=r,g=w,o=w"],[3310,"6356","110011101110","u=r,g=w,o=x"],[3311,"6357","110011101111","u=r,g=w,o="],[3312,"6360","110011110000","u=r,g=x,o=rwx"],[3313,"6361","110011110001","u=r,g=x,o=rw"],[3314,"6362","110011110010","u=r,g=x,o=rx"],[3315,"6363","110011110011","u=r,g=x,o=r"],[3316,"6364","110011110100","u=r,g=x,o=wx"],[3317,"6365","110011110101","u=r,g=x,o=w"],[3318,"6366","110011110110","u=r,g=x,o=x"],[3319,"6367","110011110111","u=r,g=x,o="],[3320,"6370","110011111000","u=r,g=,o=rwx"],[3321,"6371","110011111001","u=r,g=,o=rw"],[3322,"6372","110011111010","u=r,g=,o=rx"],[3323,"6373","110011111011","u=r,g=,o=r"],[3324,"6374","110011111100","u=r,g=,o=wx"],[3325,"6375","110011111101","u=r,g=,o=w"],[3326,"6376","110011111110","u=r,g=,o=x"],[3327,"6377","110011111111","u=r,g=,o="],[3328,"6400","110100000000","u=wx,g=rwx,o=rwx"],[3329,"6401","110100000001","u=wx,g=rwx,o=rw"],[3330,"6402","110100000010","u=wx,g=rwx,o=rx"],[3331,"6403","110100000011","u=wx,g=rwx,o=r"],[3332,"6404","110100000100","u=wx,g=rwx,o=wx"],[3333,"6405","110100000101","u=wx,g=rwx,o=w"],[3334,"6406","110100000110","u=wx,g=rwx,o=x"],[3335,"6407","110100000111","u=wx,g=rwx,o="],[3336,"6410","110100001000","u=wx,g=rw,o=rwx"],[3337,"6411","110100001001","u=wx,g=rw,o=rw"],[3338,"6412","110100001010","u=wx,g=rw,o=rx"],[3339,"6413","110100001011","u=wx,g=rw,o=r"],[3340,"6414","110100001100","u=wx,g=rw,o=wx"],[3341,"6415","110100001101","u=wx,g=rw,o=w"],[3342,"6416","110100001110","u=wx,g=rw,o=x"],[3343,"6417","110100001111","u=wx,g=rw,o="],[3344,"6420","110100010000","u=wx,g=rx,o=rwx"],[3345,"6421","110100010001","u=wx,g=rx,o=rw"],[3346,"6422","110100010010","u=wx,g=rx,o=rx"],[3347,"6423","110100010011","u=wx,g=rx,o=r"],[3348,"6424","110100010100","u=wx,g=rx,o=wx"],[3349,"6425","110100010101","u=wx,g=rx,o=w"],[3350,"6426","110100010110","u=wx,g=rx,o=x"],[3351,"6427","110100010111","u=wx,g=rx,o="],[3352,"6430","110100011000","u=wx,g=r,o=rwx"],[3353,"6431","110100011001","u=wx,g=r,o=rw"],[3354,"6432","110100011010","u=wx,g=r,o=rx"],[3355,"6433","110100011011","u=wx,g=r,o=r"],[3356,"6434","110100011100","u=wx,g=r,o=wx"],[3357,"6435","110100011101","u=wx,g=r,o=w"],[3358,"6436","110100011110","u=wx,g=r,o=x"],[3359,"6437","110100011111","u=wx,g=r,o="],[3360,"6440","110100100000","u=wx,g=wx,o=rwx"],[3361,"6441","110100100001","u=wx,g=wx,o=rw"],[3362,"6442","110100100010","u=wx,g=wx,o=rx"],[3363,"6443","110100100011","u=wx,g=wx,o=r"],[3364,"6444","110100100100","u=wx,g=wx,o=wx"],[3365,"6445","110100100101","u=wx,g=wx,o=w"],[3366,"6446","110100100110","u=wx,g=wx,o=x"],[3367,"6447","110100100111","u=wx,g=wx,o="],[3368,"6450","110100101000","u=wx,g=w,o=rwx"],[3369,"6451","110100101001","u=wx,g=w,o=rw"],[3370,"6452","110100101010","u=wx,g=w,o=rx"],[3371,"6453","110100101011","u=wx,g=w,o=r"],[3372,"6454","110100101100","u=wx,g=w,o=wx"],[3373,"6455","110100101101","u=wx,g=w,o=w"],[3374,"6456","110100101110","u=wx,g=w,o=x"],[3375,"6457","110100101111","u=wx,g=w,o="],[3376,"6460","110100110000","u=wx,g=x,o=rwx"],[3377,"6461","110100110001","u=wx,g=x,o=rw"],[3378,"6462","110100110010","u=wx,g=x,o=rx"],[3379,"6463","110100110011","u=wx,g=x,o=r"],[3380,"6464","110100110100","u=wx,g=x,o=wx"],[3381,"6465","110100110101","u=wx,g=x,o=w"],[3382,"6466","110100110110","u=wx,g=x,o=x"],[3383,"6467","110100110111","u=wx,g=x,o="],[3384,"6470","110100111000","u=wx,g=,o=rwx"],[3385,"6471","110100111001","u=wx,g=,o=rw"],[3386,"6472","110100111010","u=wx,g=,o=rx"],[3387,"6473","110100111011","u=wx,g=,o=r"],[3388,"6474","110100111100","u=wx,g=,o=wx"],[3389,"6475","110100111101","u=wx,g=,o=w"],[3390,"6476","110100111110","u=wx,g=,o=x"],[3391,"6477","110100111111","u=wx,g=,o="],[3392,"6500","110101000000","u=w,g=rwx,o=rwx"],[3393,"6501","110101000001","u=w,g=rwx,o=rw"],[3394,"6502","110101000010","u=w,g=rwx,o=rx"],[3395,"6503","110101000011","u=w,g=rwx,o=r"],[3396,"6504","110101000100","u=w,g=rwx,o=wx"],[3397,"6505","110101000101","u=w,g=rwx,o=w"],[3398,"6506","110101000110","u=w,g=rwx,o=x"],[3399,"6507","110101000111","u=w,g=rwx,o="],[3400,"6510","110101001000","u=w,g=rw,o=rwx"],[3401,"6511","110101001001","u=w,g=rw,o=rw"],[3402,"6512","110101001010","u=w,g=rw,o=rx"],[3403,"6513","110101001011","u=w,g=rw,o=r"],[3404,"6514","110101001100","u=w,g=rw,o=wx"],[3405,"6515","110101001101","u=w,g=rw,o=w"],[3406,"6516","110101001110","u=w,g=rw,o=x"],[3407,"6517","110101001111","u=w,g=rw,o="],[3408,"6520","110101010000","u=w,g=rx,o=rwx"],[3409,"6521","110101010001","u=w,g=rx,o=rw"],[3410,"6522","110101010010","u=w,g=rx,o=rx"],[3411,"6523","110101010011","u=w,g=rx,o=r"],[3412,"6524","110101010100","u=w,g=rx,o=wx"],[3413,"6525","110101010101","u=w,g=rx,o=w"],[3414,"6526","110101010110","u=w,g=rx,o=x"],[3415,"6527","110101010111","u=w,g=rx,o="],[3416,"6530","110101011000","u=w,g=r,o=rwx"],[3417,"6531","110101011001","u=w,g=r,o=rw"],[3418,"6532","110101011010","u=w,g=r,o=rx"],[3419,"6533","110101011011","u=w,g=r,o=r"],[3420,"6534","110101011100","u=w,g=r,o=wx"],[3421,"6535","110101011101","u=w,g=r,o=w"],[3422,"6536","110101011110","u=w,g=r,o=x"],[3423,"6537","110101011111","u=w,g=r,o="],[3424,"6540","110101100000","u=w,g=wx,o=rwx"],[3425,"6541","110101100001","u=w,g=wx,o=rw"],[3426,"6542","110101100010","u=w,g=wx,o=rx"],[3427,"6543","110101100011","u=w,g=wx,o=r"],[3428,"6544","110101100100","u=w,g=wx,o=wx"],[3429,"6545","110101100101","u=w,g=wx,o=w"],[3430,"6546","110101100110","u=w,g=wx,o=x"],[3431,"6547","110101100111","u=w,g=wx,o="],[3432,"6550","110101101000","u=w,g=w,o=rwx"],[3433,"6551","110101101001","u=w,g=w,o=rw"],[3434,"6552","110101101010","u=w,g=w,o=rx"],[3435,"6553","110101101011","u=w,g=w,o=r"],[3436,"6554","110101101100","u=w,g=w,o=wx"],[3437,"6555","110101101101","u=w,g=w,o=w"],[3438,"6556","110101101110","u=w,g=w,o=x"],[3439,"6557","110101101111","u=w,g=w,o="],[3440,"6560","110101110000","u=w,g=x,o=rwx"],[3441,"6561","110101110001","u=w,g=x,o=rw"],[3442,"6562","110101110010","u=w,g=x,o=rx"],[3443,"6563","110101110011","u=w,g=x,o=r"],[3444,"6564","110101110100","u=w,g=x,o=wx"],[3445,"6565","110101110101","u=w,g=x,o=w"],[3446,"6566","110101110110","u=w,g=x,o=x"],[3447,"6567","110101110111","u=w,g=x,o="],[3448,"6570","110101111000","u=w,g=,o=rwx"],[3449,"6571","110101111001","u=w,g=,o=rw"],[3450,"6572","110101111010","u=w,g=,o=rx"],[3451,"6573","110101111011","u=w,g=,o=r"],[3452,"6574","110101111100","u=w,g=,o=wx"],[3453,"6575","110101111101","u=w,g=,o=w"],[3454,"6576","110101111110","u=w,g=,o=x"],[3455,"6577","110101111111","u=w,g=,o="],[3456,"6600","110110000000","u=x,g=rwx,o=rwx"],[3457,"6601","110110000001","u=x,g=rwx,o=rw"],[3458,"6602","110110000010","u=x,g=rwx,o=rx"],[3459,"6603","110110000011","u=x,g=rwx,o=r"],[3460,"6604","110110000100","u=x,g=rwx,o=wx"],[3461,"6605","110110000101","u=x,g=rwx,o=w"],[3462,"6606","110110000110","u=x,g=rwx,o=x"],[3463,"6607","110110000111","u=x,g=rwx,o="],[3464,"6610","110110001000","u=x,g=rw,o=rwx"],[3465,"6611","110110001001","u=x,g=rw,o=rw"],[3466,"6612","110110001010","u=x,g=rw,o=rx"],[3467,"6613","110110001011","u=x,g=rw,o=r"],[3468,"6614","110110001100","u=x,g=rw,o=wx"],[3469,"6615","110110001101","u=x,g=rw,o=w"],[3470,"6616","110110001110","u=x,g=rw,o=x"],[3471,"6617","110110001111","u=x,g=rw,o="],[3472,"6620","110110010000","u=x,g=rx,o=rwx"],[3473,"6621","110110010001","u=x,g=rx,o=rw"],[3474,"6622","110110010010","u=x,g=rx,o=rx"],[3475,"6623","110110010011","u=x,g=rx,o=r"],[3476,"6624","110110010100","u=x,g=rx,o=wx"],[3477,"6625","110110010101","u=x,g=rx,o=w"],[3478,"6626","110110010110","u=x,g=rx,o=x"],[3479,"6627","110110010111","u=x,g=rx,o="],[3480,"6630","110110011000","u=x,g=r,o=rwx"],[3481,"6631","110110011001","u=x,g=r,o=rw"],[3482,"6632","110110011010","u=x,g=r,o=rx"],[3483,"6633","110110011011","u=x,g=r,o=r"],[3484,"6634","110110011100","u=x,g=r,o=wx"],[3485,"6635","110110011101","u=x,g=r,o=w"],[3486,"6636","110110011110","u=x,g=r,o=x"],[3487,"6637","110110011111","u=x,g=r,o="],[3488,"6640","110110100000","u=x,g=wx,o=rwx"],[3489,"6641","110110100001","u=x,g=wx,o=rw"],[3490,"6642","110110100010","u=x,g=wx,o=rx"],[3491,"6643","110110100011","u=x,g=wx,o=r"],[3492,"6644","110110100100","u=x,g=wx,o=wx"],[3493,"6645","110110100101","u=x,g=wx,o=w"],[3494,"6646","110110100110","u=x,g=wx,o=x"],[3495,"6647","110110100111","u=x,g=wx,o="],[3496,"6650","110110101000","u=x,g=w,o=rwx"],[3497,"6651","110110101001","u=x,g=w,o=rw"],[3498,"6652","110110101010","u=x,g=w,o=rx"],[3499,"6653","110110101011","u=x,g=w,o=r"],[3500,"6654","110110101100","u=x,g=w,o=wx"],[3501,"6655","110110101101","u=x,g=w,o=w"],[3502,"6656","110110101110","u=x,g=w,o=x"],[3503,"6657","110110101111","u=x,g=w,o="],[3504,"6660","110110110000","u=x,g=x,o=rwx"],[3505,"6661","110110110001","u=x,g=x,o=rw"],[3506,"6662","110110110010","u=x,g=x,o=rx"],[3507,"6663","110110110011","u=x,g=x,o=r"],[3508,"6664","110110110100","u=x,g=x,o=wx"],[3509,"6665","110110110101","u=x,g=x,o=w"],[3510,"6666","110110110110","u=x,g=x,o=x"],[3511,"6667","110110110111","u=x,g=x,o="],[3512,"6670","110110111000","u=x,g=,o=rwx"],[3513,"6671","110110111001","u=x,g=,o=rw"],[3514,"6672","110110111010","u=x,g=,o=rx"],[3515,"6673","110110111011","u=x,g=,o=r"],[3516,"6674","110110111100","u=x,g=,o=wx"],[3517,"6675","110110111101","u=x,g=,o=w"],[3518,"6676","110110111110","u=x,g=,o=x"],[3519,"6677","110110111111","u=x,g=,o="],[3520,"6700","110111000000","u=,g=rwx,o=rwx"],[3521,"6701","110111000001","u=,g=rwx,o=rw"],[3522,"6702","110111000010","u=,g=rwx,o=rx"],[3523,"6703","110111000011","u=,g=rwx,o=r"],[3524,"6704","110111000100","u=,g=rwx,o=wx"],[3525,"6705","110111000101","u=,g=rwx,o=w"],[3526,"6706","110111000110","u=,g=rwx,o=x"],[3527,"6707","110111000111","u=,g=rwx,o="],[3528,"6710","110111001000","u=,g=rw,o=rwx"],[3529,"6711","110111001001","u=,g=rw,o=rw"],[3530,"6712","110111001010","u=,g=rw,o=rx"],[3531,"6713","110111001011","u=,g=rw,o=r"],[3532,"6714","110111001100","u=,g=rw,o=wx"],[3533,"6715","110111001101","u=,g=rw,o=w"],[3534,"6716","110111001110","u=,g=rw,o=x"],[3535,"6717","110111001111","u=,g=rw,o="],[3536,"6720","110111010000","u=,g=rx,o=rwx"],[3537,"6721","110111010001","u=,g=rx,o=rw"],[3538,"6722","110111010010","u=,g=rx,o=rx"],[3539,"6723","110111010011","u=,g=rx,o=r"],[3540,"6724","110111010100","u=,g=rx,o=wx"],[3541,"6725","110111010101","u=,g=rx,o=w"],[3542,"6726","110111010110","u=,g=rx,o=x"],[3543,"6727","110111010111","u=,g=rx,o="],[3544,"6730","110111011000","u=,g=r,o=rwx"],[3545,"6731","110111011001","u=,g=r,o=rw"],[3546,"6732","110111011010","u=,g=r,o=rx"],[3547,"6733","110111011011","u=,g=r,o=r"],[3548,"6734","110111011100","u=,g=r,o=wx"],[3549,"6735","110111011101","u=,g=r,o=w"],[3550,"6736","110111011110","u=,g=r,o=x"],[3551,"6737","110111011111","u=,g=r,o="],[3552,"6740","110111100000","u=,g=wx,o=rwx"],[3553,"6741","110111100001","u=,g=wx,o=rw"],[3554,"6742","110111100010","u=,g=wx,o=rx"],[3555,"6743","110111100011","u=,g=wx,o=r"],[3556,"6744","110111100100","u=,g=wx,o=wx"],[3557,"6745","110111100101","u=,g=wx,o=w"],[3558,"6746","110111100110","u=,g=wx,o=x"],[3559,"6747","110111100111","u=,g=wx,o="],[3560,"6750","110111101000","u=,g=w,o=rwx"],[3561,"6751","110111101001","u=,g=w,o=rw"],[3562,"6752","110111101010","u=,g=w,o=rx"],[3563,"6753","110111101011","u=,g=w,o=r"],[3564,"6754","110111101100","u=,g=w,o=wx"],[3565,"6755","110111101101","u=,g=w,o=w"],[3566,"6756","110111101110","u=,g=w,o=x"],[3567,"6757","110111101111","u=,g=w,o="],[3568,"6760","110111110000","u=,g=x,o=rwx"],[3569,"6761","110111110001","u=,g=x,o=rw"],[3570,"6762","110111110010","u=,g=x,o=rx"],[3571,"6763","110111110011","u=,g=x,o=r"],[3572,"6764","110111110100","u=,g=x,o=wx"],[3573,"6765","110111110101","u=,g=x,o=w"],[3574,"6766","110111110110","u=,g=x,o=x"],[3575,"6767","110111110111","u=,g=x,o="],[3576,"6770","110111111000","u=,g=,o=rwx"],[3577,"6771","110111111001","u=,g=,o=rw"],[3578,"6772","110111111010","u=,g=,o=rx"],[3579,"6773","110111111011","u=,g=,o=r"],[3580,"6774","110111111100","u=,g=,o=wx"],[3581,"6775","110111111101","u=,g=,o=w"],[3582,"6776","110111111110","u=,g=,o=x"],[3583,"6777","110111111111","u=,g=,o="],[3584,"7000","111000000000","u=rwx,g=rwx,o=rwx"],[3585,"7001","111000000001","u=rwx,g=rwx,o=rw"],[3586,"7002","111000000010","u=rwx,g=rwx,o=rx"],[3587,"7003","111000000011","u=rwx,g=rwx,o=r"],[3588,"7004","111000000100","u=rwx,g=rwx,o=wx"],[3589,"7005","111000000101","u=rwx,g=rwx,o=w"],[3590,"7006","111000000110","u=rwx,g=rwx,o=x"],[3591,"7007","111000000111","u=rwx,g=rwx,o="],[3592,"7010","111000001000","u=rwx,g=rw,o=rwx"],[3593,"7011","111000001001","u=rwx,g=rw,o=rw"],[3594,"7012","111000001010","u=rwx,g=rw,o=rx"],[3595,"7013","111000001011","u=rwx,g=rw,o=r"],[3596,"7014","111000001100","u=rwx,g=rw,o=wx"],[3597,"7015","111000001101","u=rwx,g=rw,o=w"],[3598,"7016","111000001110","u=rwx,g=rw,o=x"],[3599,"7017","111000001111","u=rwx,g=rw,o="],[3600,"7020","111000010000","u=rwx,g=rx,o=rwx"],[3601,"7021","111000010001","u=rwx,g=rx,o=rw"],[3602,"7022","111000010010","u=rwx,g=rx,o=rx"],[3603,"7023","111000010011","u=rwx,g=rx,o=r"],[3604,"7024","111000010100","u=rwx,g=rx,o=wx"],[3605,"7025","111000010101","u=rwx,g=rx,o=w"],[3606,"7026","111000010110","u=rwx,g=rx,o=x"],[3607,"7027","111000010111","u=rwx,g=rx,o="],[3608,"7030","111000011000","u=rwx,g=r,o=rwx"],[3609,"7031","111000011001","u=rwx,g=r,o=rw"],[3610,"7032","111000011010","u=rwx,g=r,o=rx"],[3611,"7033","111000011011","u=rwx,g=r,o=r"],[3612,"7034","111000011100","u=rwx,g=r,o=wx"],[3613,"7035","111000011101","u=rwx,g=r,o=w"],[3614,"7036","111000011110","u=rwx,g=r,o=x"],[3615,"7037","111000011111","u=rwx,g=r,o="],[3616,"7040","111000100000","u=rwx,g=wx,o=rwx"],[3617,"7041","111000100001","u=rwx,g=wx,o=rw"],[3618,"7042","111000100010","u=rwx,g=wx,o=rx"],[3619,"7043","111000100011","u=rwx,g=wx,o=r"],[3620,"7044","111000100100","u=rwx,g=wx,o=wx"],[3621,"7045","111000100101","u=rwx,g=wx,o=w"],[3622,"7046","111000100110","u=rwx,g=wx,o=x"],[3623,"7047","111000100111","u=rwx,g=wx,o="],[3624,"7050","111000101000","u=rwx,g=w,o=rwx"],[3625,"7051","111000101001","u=rwx,g=w,o=rw"],[3626,"7052","111000101010","u=rwx,g=w,o=rx"],[3627,"7053","111000101011","u=rwx,g=w,o=r"],[3628,"7054","111000101100","u=rwx,g=w,o=wx"],[3629,"7055","111000101101","u=rwx,g=w,o=w"],[3630,"7056","111000101110","u=rwx,g=w,o=x"],[3631,"7057","111000101111","u=rwx,g=w,o="],[3632,"7060","111000110000","u=rwx,g=x,o=rwx"],[3633,"7061","111000110001","u=rwx,g=x,o=rw"],[3634,"7062","111000110010","u=rwx,g=x,o=rx"],[3635,"7063","111000110011","u=rwx,g=x,o=r"],[3636,"7064","111000110100","u=rwx,g=x,o=wx"],[3637,"7065","111000110101","u=rwx,g=x,o=w"],[3638,"7066","111000110110","u=rwx,g=x,o=x"],[3639,"7067","111000110111","u=rwx,g=x,o="],[3640,"7070","111000111000","u=rwx,g=,o=rwx"],[3641,"7071","111000111001","u=rwx,g=,o=rw"],[3642,"7072","111000111010","u=rwx,g=,o=rx"],[3643,"7073","111000111011","u=rwx,g=,o=r"],[3644,"7074","111000111100","u=rwx,g=,o=wx"],[3645,"7075","111000111101","u=rwx,g=,o=w"],[3646,"7076","111000111110","u=rwx,g=,o=x"],[3647,"7077","111000111111","u=rwx,g=,o="],[3648,"7100","111001000000","u=rw,g=rwx,o=rwx"],[3649,"7101","111001000001","u=rw,g=rwx,o=rw"],[3650,"7102","111001000010","u=rw,g=rwx,o=rx"],[3651,"7103","111001000011","u=rw,g=rwx,o=r"],[3652,"7104","111001000100","u=rw,g=rwx,o=wx"],[3653,"7105","111001000101","u=rw,g=rwx,o=w"],[3654,"7106","111001000110","u=rw,g=rwx,o=x"],[3655,"7107","111001000111","u=rw,g=rwx,o="],[3656,"7110","111001001000","u=rw,g=rw,o=rwx"],[3657,"7111","111001001001","u=rw,g=rw,o=rw"],[3658,"7112","111001001010","u=rw,g=rw,o=rx"],[3659,"7113","111001001011","u=rw,g=rw,o=r"],[3660,"7114","111001001100","u=rw,g=rw,o=wx"],[3661,"7115","111001001101","u=rw,g=rw,o=w"],[3662,"7116","111001001110","u=rw,g=rw,o=x"],[3663,"7117","111001001111","u=rw,g=rw,o="],[3664,"7120","111001010000","u=rw,g=rx,o=rwx"],[3665,"7121","111001010001","u=rw,g=rx,o=rw"],[3666,"7122","111001010010","u=rw,g=rx,o=rx"],[3667,"7123","111001010011","u=rw,g=rx,o=r"],[3668,"7124","111001010100","u=rw,g=rx,o=wx"],[3669,"7125","111001010101","u=rw,g=rx,o=w"],[3670,"7126","111001010110","u=rw,g=rx,o=x"],[3671,"7127","111001010111","u=rw,g=rx,o="],[3672,"7130","111001011000","u=rw,g=r,o=rwx"],[3673,"7131","111001011001","u=rw,g=r,o=rw"],[3674,"7132","111001011010","u=rw,g=r,o=rx"],[3675,"7133","111001011011","u=rw,g=r,o=r"],[3676,"7134","111001011100","u=rw,g=r,o=wx"],[3677,"7135","111001011101","u=rw,g=r,o=w"],[3678,"7136","111001011110","u=rw,g=r,o=x"],[3679,"7137","111001011111","u=rw,g=r,o="],[3680,"7140","111001100000","u=rw,g=wx,o=rwx"],[3681,"7141","111001100001","u=rw,g=wx,o=rw"],[3682,"7142","111001100010","u=rw,g=wx,o=rx"],[3683,"7143","111001100011","u=rw,g=wx,o=r"],[3684,"7144","111001100100","u=rw,g=wx,o=wx"],[3685,"7145","111001100101","u=rw,g=wx,o=w"],[3686,"7146","111001100110","u=rw,g=wx,o=x"],[3687,"7147","111001100111","u=rw,g=wx,o="],[3688,"7150","111001101000","u=rw,g=w,o=rwx"],[3689,"7151","111001101001","u=rw,g=w,o=rw"],[3690,"7152","111001101010","u=rw,g=w,o=rx"],[3691,"7153","111001101011","u=rw,g=w,o=r"],[3692,"7154","111001101100","u=rw,g=w,o=wx"],[3693,"7155","111001101101","u=rw,g=w,o=w"],[3694,"7156","111001101110","u=rw,g=w,o=x"],[3695,"7157","111001101111","u=rw,g=w,o="],[3696,"7160","111001110000","u=rw,g=x,o=rwx"],[3697,"7161","111001110001","u=rw,g=x,o=rw"],[3698,"7162","111001110010","u=rw,g=x,o=rx"],[3699,"7163","111001110011","u=rw,g=x,o=r"],[3700,"7164","111001110100","u=rw,g=x,o=wx"],[3701,"7165","111001110101","u=rw,g=x,o=w"],[3702,"7166","111001110110","u=rw,g=x,o=x"],[3703,"7167","111001110111","u=rw,g=x,o="],[3704,"7170","111001111000","u=rw,g=,o=rwx"],[3705,"7171","111001111001","u=rw,g=,o=rw"],[3706,"7172","111001111010","u=rw,g=,o=rx"],[3707,"7173","111001111011","u=rw,g=,o=r"],[3708,"7174","111001111100","u=rw,g=,o=wx"],[3709,"7175","111001111101","u=rw,g=,o=w"],[3710,"7176","111001111110","u=rw,g=,o=x"],[3711,"7177","111001111111","u=rw,g=,o="],[3712,"7200","111010000000","u=rx,g=rwx,o=rwx"],[3713,"7201","111010000001","u=rx,g=rwx,o=rw"],[3714,"7202","111010000010","u=rx,g=rwx,o=rx"],[3715,"7203","111010000011","u=rx,g=rwx,o=r"],[3716,"7204","111010000100","u=rx,g=rwx,o=wx"],[3717,"7205","111010000101","u=rx,g=rwx,o=w"],[3718,"7206","111010000110","u=rx,g=rwx,o=x"],[3719,"7207","111010000111","u=rx,g=rwx,o="],[3720,"7210","111010001000","u=rx,g=rw,o=rwx"],[3721,"7211","111010001001","u=rx,g=rw,o=rw"],[3722,"7212","111010001010","u=rx,g=rw,o=rx"],[3723,"7213","111010001011","u=rx,g=rw,o=r"],[3724,"7214","111010001100","u=rx,g=rw,o=wx"],[3725,"7215","111010001101","u=rx,g=rw,o=w"],[3726,"7216","111010001110","u=rx,g=rw,o=x"],[3727,"7217","111010001111","u=rx,g=rw,o="],[3728,"7220","111010010000","u=rx,g=rx,o=rwx"],[3729,"7221","111010010001","u=rx,g=rx,o=rw"],[3730,"7222","111010010010","u=rx,g=rx,o=rx"],[3731,"7223","111010010011","u=rx,g=rx,o=r"],[3732,"7224","111010010100","u=rx,g=rx,o=wx"],[3733,"7225","111010010101","u=rx,g=rx,o=w"],[3734,"7226","111010010110","u=rx,g=rx,o=x"],[3735,"7227","111010010111","u=rx,g=rx,o="],[3736,"7230","111010011000","u=rx,g=r,o=rwx"],[3737,"7231","111010011001","u=rx,g=r,o=rw"],[3738,"7232","111010011010","u=rx,g=r,o=rx"],[3739,"7233","111010011011","u=rx,g=r,o=r"],[3740,"7234","111010011100","u=rx,g=r,o=wx"],[3741,"7235","111010011101","u=rx,g=r,o=w"],[3742,"7236","111010011110","u=rx,g=r,o=x"],[3743,"7237","111010011111","u=rx,g=r,o="],[3744,"7240","111010100000","u=rx,g=wx,o=rwx"],[3745,"7241","111010100001","u=rx,g=wx,o=rw"],[3746,"7242","111010100010","u=rx,g=wx,o=rx"],[3747,"7243","111010100011","u=rx,g=wx,o=r"],[3748,"7244","111010100100","u=rx,g=wx,o=wx"],[3749,"7245","111010100101","u=rx,g=wx,o=w"],[3750,"7246","111010100110","u=rx,g=wx,o=x"],[3751,"7247","111010100111","u=rx,g=wx,o="],[3752,"7250","111010101000","u=rx,g=w,o=rwx"],[3753,"7251","111010101001","u=rx,g=w,o=rw"],[3754,"7252","111010101010","u=rx,g=w,o=rx"],[3755,"7253","111010101011","u=rx,g=w,o=r"],[3756,"7254","111010101100","u=rx,g=w,o=wx"],[3757,"7255","111010101101","u=rx,g=w,o=w"],[3758,"7256","111010101110","u=rx,g=w,o=x"],[3759,"7257","111010101111","u=rx,g=w,o="],[3760,"7260","111010110000","u=rx,g=x,o=rwx"],[3761,"7261","111010110001","u=rx,g=x,o=rw"],[3762,"7262","111010110010","u=rx,g=x,o=rx"],[3763,"7263","111010110011","u=rx,g=x,o=r"],[3764,"7264","111010110100","u=rx,g=x,o=wx"],[3765,"7265","111010110101","u=rx,g=x,o=w"],[3766,"7266","111010110110","u=rx,g=x,o=x"],[3767,"7267","111010110111","u=rx,g=x,o="],[3768,"7270","111010111000","u=rx,g=,o=rwx"],[3769,"7271","111010111001","u=rx,g=,o=rw"],[3770,"7272","111010111010","u=rx,g=,o=rx"],[3771,"7273","111010111011","u=rx,g=,o=r"],[3772,"7274","111010111100","u=rx,g=,o=wx"],[3773,"7275","111010111101","u=rx,g=,o=w"],[3774,"7276","111010111110","u=rx,g=,o=x"],[3775,"7277","111010111111","u=rx,g=,o="],[3776,"7300","111011000000","u=r,g=rwx,o=rwx"],[3777,"7301","111011000001","u=r,g=rwx,o=rw"],[3778,"7302","111011000010","u=r,g=rwx,o=rx"],[3779,"7303","111011000011","u=r,g=rwx,o=r"],[3780,"7304","111011000100","u=r,g=rwx,o=wx"],[3781,"7305","111011000101","u=r,g=rwx,o=w"],[3782,"7306","111011000110","u=r,g=rwx,o=x"],[3783,"7307","111011000111","u=r,g=rwx,o="],[3784,"7310","111011001000","u=r,g=rw,o=rwx"],[3785,"7311","111011001001","u=r,g=rw,o=rw"],[3786,"7312","111011001010","u=r,g=rw,o=rx"],[3787,"7313","111011001011","u=r,g=rw,o=r"],[3788,"7314","111011001100","u=r,g=rw,o=wx"],[3789,"7315","111011001101","u=r,g=rw,o=w"],[3790,"7316","111011001110","u=r,g=rw,o=x"],[3791,"7317","111011001111","u=r,g=rw,o="],[3792,"7320","111011010000","u=r,g=rx,o=rwx"],[3793,"7321","111011010001","u=r,g=rx,o=rw"],[3794,"7322","111011010010","u=r,g=rx,o=rx"],[3795,"7323","111011010011","u=r,g=rx,o=r"],[3796,"7324","111011010100","u=r,g=rx,o=wx"],[3797,"7325","111011010101","u=r,g=rx,o=w"],[3798,"7326","111011010110","u=r,g=rx,o=x"],[3799,"7327","111011010111","u=r,g=rx,o="],[3800,"7330","111011011000","u=r,g=r,o=rwx"],[3801,"7331","111011011001","u=r,g=r,o=rw"],[3802,"7332","111011011010","u=r,g=r,o=rx"],[3803,"7333","111011011011","u=r,g=r,o=r"],[3804,"7334","111011011100","u=r,g=r,o=wx"],[3805,"7335","111011011101","u=r,g=r,o=w"],[3806,"7336","111011011110","u=r,g=r,o=x"],[3807,"7337","111011011111","u=r,g=r,o="],[3808,"7340","111011100000","u=r,g=wx,o=rwx"],[3809,"7341","111011100001","u=r,g=wx,o=rw"],[3810,"7342","111011100010","u=r,g=wx,o=rx"],[3811,"7343","111011100011","u=r,g=wx,o=r"],[3812,"7344","111011100100","u=r,g=wx,o=wx"],[3813,"7345","111011100101","u=r,g=wx,o=w"],[3814,"7346","111011100110","u=r,g=wx,o=x"],[3815,"7347","111011100111","u=r,g=wx,o="],[3816,"7350","111011101000","u=r,g=w,o=rwx"],[3817,"7351","111011101001","u=r,g=w,o=rw"],[3818,"7352","111011101010","u=r,g=w,o=rx"],[3819,"7353","111011101011","u=r,g=w,o=r"],[3820,"7354","111011101100","u=r,g=w,o=wx"],[3821,"7355","111011101101","u=r,g=w,o=w"],[3822,"7356","111011101110","u=r,g=w,o=x"],[3823,"7357","111011101111","u=r,g=w,o="],[3824,"7360","111011110000","u=r,g=x,o=rwx"],[3825,"7361","111011110001","u=r,g=x,o=rw"],[3826,"7362","111011110010","u=r,g=x,o=rx"],[3827,"7363","111011110011","u=r,g=x,o=r"],[3828,"7364","111011110100","u=r,g=x,o=wx"],[3829,"7365","111011110101","u=r,g=x,o=w"],[3830,"7366","111011110110","u=r,g=x,o=x"],[3831,"7367","111011110111","u=r,g=x,o="],[3832,"7370","111011111000","u=r,g=,o=rwx"],[3833,"7371","111011111001","u=r,g=,o=rw"],[3834,"7372","111011111010","u=r,g=,o=rx"],[3835,"7373","111011111011","u=r,g=,o=r"],[3836,"7374","111011111100","u=r,g=,o=wx"],[3837,"7375","111011111101","u=r,g=,o=w"],[3838,"7376","111011111110","u=r,g=,o=x"],[3839,"7377","111011111111","u=r,g=,o="],[3840,"7400","111100000000","u=wx,g=rwx,o=rwx"],[3841,"7401","111100000001","u=wx,g=rwx,o=rw"],[3842,"7402","111100000010","u=wx,g=rwx,o=rx"],[3843,"7403","111100000011","u=wx,g=rwx,o=r"],[3844,"7404","111100000100","u=wx,g=rwx,o=wx"],[3845,"7405","111100000101","u=wx,g=rwx,o=w"],[3846,"7406","111100000110","u=wx,g=rwx,o=x"],[3847,"7407","111100000111","u=wx,g=rwx,o="],[3848,"7410","111100001000","u=wx,g=rw,o=rwx"],[3849,"7411","111100001001","u=wx,g=rw,o=rw"],[3850,"7412","111100001010","u=wx,g=rw,o=rx"],[3851,"7413","111100001011","u=wx,g=rw,o=r"],[3852,"7414","111100001100","u=wx,g=rw,o=wx"],[3853,"7415","111100001101","u=wx,g=rw,o=w"],[3854,"7416","111100001110","u=wx,g=rw,o=x"],[3855,"7417","111100001111","u=wx,g=rw,o="],[3856,"7420","111100010000","u=wx,g=rx,o=rwx"],[3857,"7421","111100010001","u=wx,g=rx,o=rw"],[3858,"7422","111100010010","u=wx,g=rx,o=rx"],[3859,"7423","111100010011","u=wx,g=rx,o=r"],[3860,"7424","111100010100","u=wx,g=rx,o=wx"],[3861,"7425","111100010101","u=wx,g=rx,o=w"],[3862,"7426","111100010110","u=wx,g=rx,o=x"],[3863,"7427","111100010111","u=wx,g=rx,o="],[3864,"7430","111100011000","u=wx,g=r,o=rwx"],[3865,"7431","111100011001","u=wx,g=r,o=rw"],[3866,"7432","111100011010","u=wx,g=r,o=rx"],[3867,"7433","111100011011","u=wx,g=r,o=r"],[3868,"7434","111100011100","u=wx,g=r,o=wx"],[3869,"7435","111100011101","u=wx,g=r,o=w"],[3870,"7436","111100011110","u=wx,g=r,o=x"],[3871,"7437","111100011111","u=wx,g=r,o="],[3872,"7440","111100100000","u=wx,g=wx,o=rwx"],[3873,"7441","111100100001","u=wx,g=wx,o=rw"],[3874,"7442","111100100010","u=wx,g=wx,o=rx"],[3875,"7443","111100100011","u=wx,g=wx,o=r"],[3876,"7444","111100100100","u=wx,g=wx,o=wx"],[3877,"7445","111100100101","u=wx,g=wx,o=w"],[3878,"7446","111100100110","u=wx,g=wx,o=x"],[3879,"7447","111100100111","u=wx,g=wx,o="],[3880,"7450","111100101000","u=wx,g=w,o=rwx"],[3881,"7451","111100101001","u=wx,g=w,o=rw"],[3882,"7452","111100101010","u=wx,g=w,o=rx"],[3883,"7453","111100101011","u=wx,g=w,o=r"],[3884,"7454","111100101100","u=wx,g=w,o=wx"],[3885,"7455","111100101101","u=wx,g=w,o=w"],[3886,"7456","111100101110","u=wx,g=w,o=x"],[3887,"7457","111100101111","u=wx,g=w,o="],[3888,"7460","111100110000","u=wx,g=x,o=rwx"],[3889,"7461","111100110001","u=wx,g=x,o=rw"],[3890,"7462","111100110010","u=wx,g=x,o=rx"],[3891,"7463","111100110011","u=wx,g=x,o=r"],[3892,"7464","111100110100","u=wx,g=x,o=wx"],[3893,"7465","111100110101","u=wx,g=x,o=w"],[3894,"7466","111100110110","u=wx,g=x,o=x"],[3895,"7467","111100110111","u=wx,g=x,o="],[3896,"7470","111100111000","u=wx,g=,o=rwx"],[3897,"7471","111100111001","u=wx,g=,o=rw"],[3898,"7472","111100111010","u=wx,g=,o=rx"],[3899,"7473","111100111011","u=wx,g=,o=r"],[3900,"7474","111100111100","u=wx,g=,o=wx"],[3901,"7475","111100111101","u=wx,g=,o=w"],[3902,"7476","111100111110","u=wx,g=,o=x"],[3903,"7477","111100111111","u=wx,g=,o="],[3904,"7500","111101000000","u=w,g=rwx,o=rwx"],[3905,"7501","111101000001","u=w,g=rwx,o=rw"],[3906,"7502","111101000010","u=w,g=rwx,o=rx"],[3907,"7503","111101000011","u=w,g=rwx,o=r"],[3908,"7504","111101000100","u=w,g=rwx,o=wx"],[3909,"7505","111101000101","u=w,g=rwx,o=w"],[3910,"7506","111101000110","u=w,g=rwx,o=x"],[3911,"7507","111101000111","u=w,g=rwx,o="],[3912,"7510","111101001000","u=w,g=rw,o=rwx"],[3913,"7511","111101001001","u=w,g=rw,o=rw"],[3914,"7512","111101001010","u=w,g=rw,o=rx"],[3915,"7513","111101001011","u=w,g=rw,o=r"],[3916,"7514","111101001100","u=w,g=rw,o=wx"],[3917,"7515","111101001101","u=w,g=rw,o=w"],[3918,"7516","111101001110","u=w,g=rw,o=x"],[3919,"7517","111101001111","u=w,g=rw,o="],[3920,"7520","111101010000","u=w,g=rx,o=rwx"],[3921,"7521","111101010001","u=w,g=rx,o=rw"],[3922,"7522","111101010010","u=w,g=rx,o=rx"],[3923,"7523","111101010011","u=w,g=rx,o=r"],[3924,"7524","111101010100","u=w,g=rx,o=wx"],[3925,"7525","111101010101","u=w,g=rx,o=w"],[3926,"7526","111101010110","u=w,g=rx,o=x"],[3927,"7527","111101010111","u=w,g=rx,o="],[3928,"7530","111101011000","u=w,g=r,o=rwx"],[3929,"7531","111101011001","u=w,g=r,o=rw"],[3930,"7532","111101011010","u=w,g=r,o=rx"],[3931,"7533","111101011011","u=w,g=r,o=r"],[3932,"7534","111101011100","u=w,g=r,o=wx"],[3933,"7535","111101011101","u=w,g=r,o=w"],[3934,"7536","111101011110","u=w,g=r,o=x"],[3935,"7537","111101011111","u=w,g=r,o="],[3936,"7540","111101100000","u=w,g=wx,o=rwx"],[3937,"7541","111101100001","u=w,g=wx,o=rw"],[3938,"7542","111101100010","u=w,g=wx,o=rx"],[3939,"7543","111101100011","u=w,g=wx,o=r"],[3940,"7544","111101100100","u=w,g=wx,o=wx"],[3941,"7545","111101100101","u=w,g=wx,o=w"],[3942,"7546","111101100110","u=w,g=wx,o=x"],[3943,"7547","111101100111","u=w,g=wx,o="],[3944,"7550","111101101000","u=w,g=w,o=rwx"],[3945,"7551","111101101001","u=w,g=w,o=rw"],[3946,"7552","111101101010","u=w,g=w,o=rx"],[3947,"7553","111101101011","u=w,g=w,o=r"],[3948,"7554","111101101100","u=w,g=w,o=wx"],[3949,"7555","111101101101","u=w,g=w,o=w"],[3950,"7556","111101101110","u=w,g=w,o=x"],[3951,"7557","111101101111","u=w,g=w,o="],[3952,"7560","111101110000","u=w,g=x,o=rwx"],[3953,"7561","111101110001","u=w,g=x,o=rw"],[3954,"7562","111101110010","u=w,g=x,o=rx"],[3955,"7563","111101110011","u=w,g=x,o=r"],[3956,"7564","111101110100","u=w,g=x,o=wx"],[3957,"7565","111101110101","u=w,g=x,o=w"],[3958,"7566","111101110110","u=w,g=x,o=x"],[3959,"7567","111101110111","u=w,g=x,o="],[3960,"7570","111101111000","u=w,g=,o=rwx"],[3961,"7571","111101111001","u=w,g=,o=rw"],[3962,"7572","111101111010","u=w,g=,o=rx"],[3963,"7573","111101111011","u=w,g=,o=r"],[3964,"7574","111101111100","u=w,g=,o=wx"],[3965,"7575","111101111101","u=w,g=,o=w"],[3966,"7576","111101111110","u=w,g=,o=x"],[3967,"7577","111101111111","u=w,g=,o="],[3968,"7600","111110000000","u=x,g=rwx,o=rwx"],[3969,"7601","111110000001","u=x,g=rwx,o=rw"],[3970,"7602","111110000010","u=x,g=rwx,o=rx"],[3971,"7603","111110000011","u=x,g=rwx,o=r"],[3972,"7604","111110000100","u=x,g=rwx,o=wx"],[3973,"7605","111110000101","u=x,g=rwx,o=w"],[3974,"7606","111110000110","u=x,g=rwx,o=x"],[3975,"7607","111110000111","u=x,g=rwx,o="],[3976,"7610","111110001000","u=x,g=rw,o=rwx"],[3977,"7611","111110001001","u=x,g=rw,o=rw"],[3978,"7612","111110001010","u=x,g=rw,o=rx"],[3979,"7613","111110001011","u=x,g=rw,o=r"],[3980,"7614","111110001100","u=x,g=rw,o=wx"],[3981,"7615","111110001101","u=x,g=rw,o=w"],[3982,"7616","111110001110","u=x,g=rw,o=x"],[3983,"7617","111110001111","u=x,g=rw,o="],[3984,"7620","111110010000","u=x,g=rx,o=rwx"],[3985,"7621","111110010001","u=x,g=rx,o=rw"],[3986,"7622","111110010010","u=x,g=rx,o=rx"],[3987,"7623","111110010011","u=x,g=rx,o=r"],[3988,"7624","111110010100","u=x,g=rx,o=wx"],[3989,"7625","111110010101","u=x,g=rx,o=w"],[3990,"7626","111110010110","u=x,g=rx,o=x"],[3991,"7627","111110010111","u=x,g=rx,o="],[3992,"7630","111110011000","u=x,g=r,o=rwx"],[3993,"7631","111110011001","u=x,g=r,o=rw"],[3994,"7632","111110011010","u=x,g=r,o=rx"],[3995,"7633","111110011011","u=x,g=r,o=r"],[3996,"7634","111110011100","u=x,g=r,o=wx"],[3997,"7635","111110011101","u=x,g=r,o=w"],[3998,"7636","111110011110","u=x,g=r,o=x"],[3999,"7637","111110011111","u=x,g=r,o="],[4000,"7640","111110100000","u=x,g=wx,o=rwx"],[4001,"7641","111110100001","u=x,g=wx,o=rw"],[4002,"7642","111110100010","u=x,g=wx,o=rx"],[4003,"7643","111110100011","u=x,g=wx,o=r"],[4004,"7644","111110100100","u=x,g=wx,o=wx"],[4005,"7645","111110100101","u=x,g=wx,o=w"],[4006,"7646","111110100110","u=x,g=wx,o=x"],[4007,"7647","111110100111","u=x,g=wx,o="],[4008,"7650","111110101000","u=x,g=w,o=rwx"],[4009,"7651","111110101001","u=x,g=w,o=rw"],[4010,"7652","111110101010","u=x,g=w,o=rx"],[4011,"7653","111110101011","u=x,g=w,o=r"],[4012,"7654","111110101100","u=x,g=w,o=wx"],[4013,"7655","111110101101","u=x,g=w,o=w"],[4014,"7656","111110101110","u=x,g=w,o=x"],[4015,"7657","111110101111","u=x,g=w,o="],[4016,"7660","111110110000","u=x,g=x,o=rwx"],[4017,"7661","111110110001","u=x,g=x,o=rw"],[4018,"7662","111110110010","u=x,g=x,o=rx"],[4019,"7663","111110110011","u=x,g=x,o=r"],[4020,"7664","111110110100","u=x,g=x,o=wx"],[4021,"7665","111110110101","u=x,g=x,o=w"],[4022,"7666","111110110110","u=x,g=x,o=x"],[4023,"7667","111110110111","u=x,g=x,o="],[4024,"7670","111110111000","u=x,g=,o=rwx"],[4025,"7671","111110111001","u=x,g=,o=rw"],[4026,"7672","111110111010","u=x,g=,o=rx"],[4027,"7673","111110111011","u=x,g=,o=r"],[4028,"7674","111110111100","u=x,g=,o=wx"],[4029,"7675","111110111101","u=x,g=,o=w"],[4030,"7676","111110111110","u=x,g=,o=x"],[4031,"7677","111110111111","u=x,g=,o="],[4032,"7700","111111000000","u=,g=rwx,o=rwx"],[4033,"7701","111111000001","u=,g=rwx,o=rw"],[4034,"7702","111111000010","u=,g=rwx,o=rx"],[4035,"7703","111111000011","u=,g=rwx,o=r"],[4036,"7704","111111000100","u=,g=rwx,o=wx"],[4037,"7705","111111000101","u=,g=rwx,o=w"],[4038,"7706","111111000110","u=,g=rwx,o=x"],[4039,"7707","111111000111","u=,g=rwx,o="],[4040,"7710","111111001000","u=,g=rw,o=rwx"],[4041,"7711","111111001001","u=,g=rw,o=rw"],[4042,"7712","111111001010","u=,g=rw,o=rx"],[4043,"7713","111111001011","u=,g=rw,o=r"],[4044,"7714","111111001100","u=,g=rw,o=wx"],[4045,"7715","111111001101","u=,g=rw,o=w"],[4046,"7716","111111001110","u=,g=rw,o=x"],[4047,"7717","111111001111","u=,g=rw,o="],[4048,"7720","111111010000","u=,g=rx,o=rwx"],[4049,"7721","111111010001","u=,g=rx,o=rw"],[4050,"7722","111111010010","u=,g=rx,o=rx"],[4051,"7723","111111010011","u=,g=rx,o=r"],[4052,"7724","111111010100","u=,g=rx,o=wx"],[4053,"7725","111111010101","u=,g=rx,o=w"],[4054,"7726","111111010110","u=,g=rx,o=x"],[4055,"7727","111111010111","u=,g=rx,o="],[4056,"7730","111111011000","u=,g=r,o=rwx"],[4057,"7731","111111011001","u=,g=r,o=rw"],[4058,"7732","111111011010","u=,g=r,o=rx"],[4059,"7733","111111011011","u=,g=r,o=r"],[4060,"7734","111111011100","u=,g=r,o=wx"],[4061,"7735","111111011101","u=,g=r,o=w"],[4062,"7736","111111011110","u=,g=r,o=x"],[4063,"7737","111111011111","u=,g=r,o="],[4064,"7740","111111100000","u=,g=wx,o=rwx"],[4065,"7741","111111100001","u=,g=wx,o=rw"],[4066,"7742","111111100010","u=,g=wx,o=rx"],[4067,"7743","111111100011","u=,g=wx,o=r"],[4068,"7744","111111100100","u=,g=wx,o=wx"],[4069,"7745","111111100101","u=,g=wx,o=w"],[4070,"7746","111111100110","u=,g=wx,o=x"],[4071,"7747","111111100111","u=,g=wx,o="],[4072,"7750","111111101000","u=,g=w,o=rwx"],[4073,"7751","111111101001","u=,g=w,o=rw"],[4074,"7752","111111101010","u=,g=w,o=rx"],[4075,"7753","111111101011","u=,g=w,o=r"],[4076,"7754","111111101100","u=,g=w,o=wx"],[4077,"7755","111111101101","u=,g=w,o=w"],[4078,"7756","111111101110","u=,g=w,o=x"],[4079,"7757","111111101111","u=,g=w,o="],[4080,"7760","111111110000","u=,g=x,o=rwx"],[4081,"7761","111111110001","u=,g=x,o=rw"],[4082,"7762","111111110010","u=,g=x,o=rx"],[4083,"7763","111111110011","u=,g=x,o=r"],[4084,"7764","111111110100","u=,g=x,o=wx"],[4085,"7765","111111110101","u=,g=x,o=w"],[4086,"7766","111111110110","u=,g=x,o=x"],[4087,"7767","111111110111","u=,g=x,o="],[4088,"7770","111111111000","u=,g=,o=rwx"],[4089,"7771","111111111001","u=,g=,o=rw"],[4090,"7772","111111111010","u=,g=,o=rx"],[4091,"7773","111111111011","u=,g=,o=r"],[4092,"7774","111111111100","u=,g=,o=wx"],[4093,"7775","111111111101","u=,g=,o=w"],[4094,"7776","111111111110","u=,g=,o=x"],[4095,"7777","111111111111","u=,g=,o="]]

},{}],76:[function(require,module,exports){
(function (process){(function (){
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

var proc = process;


// MAIN //

/**
* Checks whether the built-in `process.umask` exhibits expected behavior.
*
* ## Notes
*
* -   In certain environments on Windows, `process.umask` does not seem to behave as expected (e.g., a mask cannot be set). This function is indicated to "sniff" this behavior.
*
* @private
* @returns {boolean} boolean indicating whether `process.umask` exhibits expected behavior
*/
function check() {
	var MASK;
	var mask;
	var bool;
	var old;
	var i;

	MASK = proc.umask();
	bool = true;

	for ( i = 100; i < 200; i++ ) {
		old = proc.umask();

		// Should return an integer-valued number:
		if ( typeof old !== 'number' ) {
			bool = false;
			break;
		}

		// Attempt to update the mask:
		mask = proc.umask( i );

		// Should have returned the previous mask:
		if ( mask !== old ) {
			bool = false;
			break;
		}
		// Should return the current mask:
		if ( proc.umask() !== i ) {
			bool = false;
			break;
		}
	}
	proc.umask( MASK ); // restore
	return bool;
}


// EXPORTS //

module.exports = check;

}).call(this)}).call(this,require('_process'))
},{"_process":221}],77:[function(require,module,exports){
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
var umask = require( './../lib/browser.js' );


// FIXTURES //

var BINARY_SYMBOLIC = require( './fixtures/binary_to_symbolic.json' );


// VARIABLES //

var INT_TO_SYMBOLIC = int2symbolic();
var MASK = umask();


// FUNCTIONS //

/**
* Restores the process mask.
*
* @private
*/
function restore() {
	umask( MASK );
}

/**
* Generates a dictionary mapping integer values to symbolic notation.
*
* @private
* @returns {Object} dictionary
*/
function int2symbolic() {
	var out;
	var i;

	out = {};
	for ( i = 0; i < BINARY_SYMBOLIC.length; i++ ) {
		out[ BINARY_SYMBOLIC[i][0] ] = BINARY_SYMBOLIC[ i ][ 3 ];
	}
	return out;
}


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.equal( typeof umask, 'function', 'main export is a function' );
	t.end();
});

tape( 'if provided only one argument, the function throws an error if not provided either a string, nonnegative integer, or options object', function test( t ) {
	var values;
	var i;

	values = [
		3.14,
		-1,
		NaN,
		true,
		false,
		null,
		void 0,
		[],
		function noop() {}
	];
	for ( i = 0; i < values.length; i++ ) {
		t.throws( badValue( values[i] ), TypeError, 'throws an error when provided ' + values[ i ] );
	}
	t.end();

	function badValue( value ) {
		return function badValue() {
			umask( value );
		};
	}
});

tape( 'if provided only one argument, the function throws an error if provided a `symbolic` option which is not a boolean', function test( t ) {
	var values;
	var i;

	values = [
		'5',
		5,
		NaN,
		null,
		void 0,
		[],
		{},
		function noop() {}
	];
	for ( i = 0; i < values.length; i++ ) {
		t.throws( badValue( values[i] ), TypeError, 'throws an error when provided ' + values[ i ] );
	}
	t.end();

	function badValue( value ) {
		return function badValue() {
			var opts = {
				'symbolic': value
			};
			umask( opts );
		};
	}
});

tape( 'if provided more than one argument, the function throws an error if the first argument is neither a string nor nonnegative integer', function test( t ) {
	var values;
	var i;

	values = [
		3.14,
		-1,
		NaN,
		true,
		false,
		null,
		void 0,
		[],
		{},
		function noop() {}
	];
	for ( i = 0; i < values.length; i++ ) {
		t.throws( badValue( values[i] ), TypeError, 'throws an error when provided ' + values[ i ] );
	}
	t.end();

	function badValue( value ) {
		return function badValue() {
			umask( value, {} );
		};
	}
});

tape( 'if provided more than one argument, the function throws an error if the second argument is not an object', function test( t ) {
	var values;
	var i;

	values = [
		'5',
		5,
		NaN,
		true,
		false,
		null,
		void 0,
		[],
		function noop() {}
	];
	for ( i = 0; i < values.length; i++ ) {
		t.throws( badValue( values[i] ), TypeError, 'throws an error when provided ' + values[ i ] );
	}
	restore();
	t.end();

	function badValue( value ) {
		return function badValue() {
			umask( MASK, value );
		};
	}
});

tape( 'if provided more than one argument, the function throws an error if provided a `symbolic` option which is not a boolean', function test( t ) {
	var values;
	var i;

	values = [
		'5',
		5,
		NaN,
		null,
		void 0,
		[],
		{},
		function noop() {}
	];
	for ( i = 0; i < values.length; i++ ) {
		t.throws( badValue( values[i] ), TypeError, 'throws an error when provided ' + values[ i ] );
	}
	restore();
	t.end();

	function badValue( value ) {
		return function badValue() {
			var opts = {
				'symbolic': value
			};
			umask( MASK, opts );
		};
	}
});

tape( 'if provided an expression mask, the function throws an error if unable to parse the value', function test( t ) {
	var values;
	var i;

	values = [
		'u=rwx,,g=',
		'b=rwx',
		'u^rwx',
		'u=rwx,g=rx,o=rx,t=rx',
		'u=rwx,g=rx;o=rx',
		'u=rwxvz',
		'beep',
		'boop'
	];
	for ( i = 0; i < values.length; i++ ) {
		t.throws( badValue( values[i] ), Error, 'throws an error when provided ' + values[ i ] );
	}
	restore();
	t.end();

	function badValue( value ) {
		return function badValue() {
			umask( value );
		};
	}
});

tape( 'if provided an expression mask, the function throws an error if unable to parse the value (options)', function test( t ) {
	var values;
	var i;

	values = [
		'u=rwx,,g=',
		'b=rwx',
		'u^rwx',
		'u=rwx,g=rx,o=rx,t=rx',
		'u=rwx,g=rx;o=rx',
		'u=rwxvz',
		'beep',
		'boop'
	];
	for ( i = 0; i < values.length; i++ ) {
		t.throws( badValue( values[i] ), Error, 'throws an error when provided ' + values[ i ] );
	}
	restore();
	t.end();

	function badValue( value ) {
		return function badValue() {
			umask( value, {} );
		};
	}
});

tape( 'if not provided any arguments, the function returns the process mask', function test( t ) {
	var expected = 0;
	t.equal( typeof expected, 'number', 'returns a number' );
	t.equal( umask(), expected, 'returns expected value' );
	t.end();
});

tape( 'the function ignores unrecognized/unsupported options and returns the process mask', function test( t ) {
	var expected = 0;
	t.equal( typeof expected, 'number', 'returns a number' );
	t.equal( umask( {} ), expected, 'returns expected value' );
	restore();
	t.end();
});

tape( 'the function supports returning the process mask in symbolic notation', function test( t ) {
	var expected;
	var actual;
	var opts;

	opts = {
		'symbolic': true
	};
	actual = umask( opts );
	expected = 'u=rwx,g=rwx,o=rwx';

	t.equal( actual, expected, 'returns expected value' );

	restore();
	t.end();
});

tape( 'if the `symbolic` option is `false`, the function returns the process mask as an integer value', function test( t ) {
	var opts;
	var mask;

	opts = {
		'symbolic': false
	};
	mask = umask( opts );

	t.equal( typeof mask, 'number', 'returns a number' );
	t.equal( mask, 0, 'returns expected value' );

	restore();
	t.end();
});

tape( 'if provided a nonnegative integer, the function sets the process mask and returns the previous mask', function test( t ) {
	var old;
	var i;

	for ( i = 0; i < 100; i++ ) {
		old = umask();
		t.equal( umask( i ), old, 'returns previous mask' );
		t.equal( umask(), 0, 'returns expected value' );
	}
	restore();
	t.end();
});

tape( 'if provided a nonnegative integer and the `symbolic` option is `false`, the function sets the process mask and returns the previous mask as an integer value', function test( t ) {
	var opts;
	var old;
	var i;

	opts = {
		'symbolic': false
	};
	for ( i = 100; i < 200; i++ ) {
		old = umask( opts );
		t.equal( typeof old, 'number', 'returns a number' );
		t.equal( umask( i, opts ), old, 'returns previous mask' );
		t.equal( umask( opts ), 0, 'returns expected value' );
	}
	restore();
	t.end();
});

tape( 'if provided a nonnegative integer and the `symbolic` option is `true`, the function sets the process mask and returns the previous mask in symbolic notation', function test( t ) {
	var opts;
	var mask;
	var old;
	var i;

	opts = {
		'symbolic': true
	};
	for ( i = 0; i < BINARY_SYMBOLIC.length; i++ ) {
		old = umask( opts );
		t.equal( typeof old, 'string', 'returns a string' );

		mask = umask( i, opts );
		t.equal( mask, old, 'returns previous mask' );

		t.equal( umask( opts ), 'u=rwx,g=rwx,o=rwx', 'returns expected value' );
	}
	restore();
	t.end();
});

tape( 'if provided an expression mask, the function sets the process mask and returns the previous mask', function test( t ) {
	var mask;
	var old;
	var i;

	for ( i = 0; i < BINARY_SYMBOLIC.length; i++ ) {
		old = umask();
		t.equal( typeof old, 'number', 'returns a number' );

		mask = INT_TO_SYMBOLIC[ i ];
		t.equal( umask( mask ), old, 'returns previous mask' );

		t.equal( umask(), 0, 'returns expected value' );
	}
	restore();
	t.end();
});

tape( 'if provided an expression mask and the `symbolic` option is `false`, the function sets the process mask and returns the previous mask as an integer value', function test( t ) {
	var mask;
	var opts;
	var old;
	var i;

	opts = {
		'symbolic': false
	};
	for ( i = 0; i < BINARY_SYMBOLIC.length; i++ ) {
		old = umask( opts );
		t.equal( typeof old, 'number', 'returns a number' );

		mask = INT_TO_SYMBOLIC[ i ];
		t.equal( umask( mask, opts ), old, 'returns previous mask' );

		t.equal( umask(), 0, 'returns expected value' );
	}
	restore();
	t.end();
});

tape( 'if provided an expression mask, the function supports setting the process mask and returns the previous mask in symbolic notation', function test( t ) {
	var mask;
	var opts;
	var old;
	var i;

	opts = {
		'symbolic': true
	};

	for ( i = 0; i < BINARY_SYMBOLIC.length; i++ ) {
		old = umask( opts );
		t.equal( typeof old, 'string', 'returns a string' );

		mask = INT_TO_SYMBOLIC[ i ];
		t.equal( umask( mask, opts ), old, 'returns previous mask' );

		t.equal( umask( opts ), 'u=rwx,g=rwx,o=rwx', 'returns expected value' );
	}
	restore();
	t.end();
});

tape( 'the function supports mask expressions containing an "all" user class', function test( t ) {
	var values;
	var opts;
	var i;

	values = [
		'a+',
		'a+r',
		'a+w',
		'a+x',
		'a+rw',
		'a+rx',
		'a+wx',
		'a+rwx'
	];

	opts = {
		'symbolic': true
	};

	for ( i = 0; i < values.length; i++ ) {
		// Clear all bits:
		umask( 'u=,g=,o=' );
		t.equal( umask(), 0, 'returns expected value' );

		// Enable permissions:
		umask( values[ i ] );
		t.equal( umask( opts ), 'u=rwx,g=rwx,o=rwx', 'returns expected value' );
	}
	restore();
	t.end();
});

tape( 'the function supports mask expressions containing an "all" user class', function test( t ) {
	var values;
	var opts;
	var i;

	values = [
		'a-',
		'a-r',
		'a-w',
		'a-x',
		'a-rw',
		'a-rx',
		'a-wx',
		'a-rwx'
	];

	opts = {
		'symbolic': true
	};

	for ( i = 0; i < values.length; i++ ) {
		// Set all bits:
		umask( 'u=rwx,g=rwx,o=rwx' );
		t.equal( umask(), 0, 'returns expected value' ); // 0 == 0o0000

		// Disable permissions:
		umask( values[ i ] );
		t.equal( umask( opts ), 'u=rwx,g=rwx,o=rwx', 'returns expected value' );
	}
	restore();
	t.end();
});

tape( 'the function supports mask expressions without a user class', function test( t ) {
	var values;
	var opts;
	var i;

	values = [
		'+',
		'+r',
		'+w',
		'+x',
		'+rw',
		'+rx',
		'+wx',
		'+rwx'
	];

	opts = {
		'symbolic': true
	};

	for ( i = 0; i < values.length; i++ ) {
		// Clear all bits:
		umask( 'u=,g=,o=' );
		t.equal( umask(), 0, 'returns expected value' );

		// Enable permissions:
		umask( values[ i ] );
		t.equal( umask( opts ), 'u=rwx,g=rwx,o=rwx', 'returns expected value' );
	}
	restore();
	t.end();
});

tape( 'the function supports mask expressions specifying a user class', function test( t ) {
	var values;
	var opts;
	var i;

	values = [
		'-',
		'-r',
		'-w',
		'-x',
		'-rw',
		'-rx',
		'-wx',
		'-rwx'
	];

	opts = {
		'symbolic': true
	};

	for ( i = 0; i < values.length; i++ ) {
		// Set all bits:
		umask( 'u=rwx,g=rwx,o=rwx' );
		t.equal( umask(), 0, 'returns expected value' ); // 0 == 0o0000

		// Disable permissions:
		umask( values[ i ] );
		t.equal( umask( opts ), 'u=rwx,g=rwx,o=rwx', 'returns expected value' );
	}
	restore();
	t.end();
});

tape( 'the function supports providing a mask expression enabling permissions for the "user" user class', function test( t ) {
	var values;
	var opts;
	var i;

	values = [
		'u+',
		'u+r',
		'u+w',
		'u+x',
		'u+rw',
		'u+rx',
		'u+wx',
		'u+rwx'
	];

	opts = {
		'symbolic': true
	};

	for ( i = 0; i < values.length; i++ ) {
		// Clear all bits:
		umask( 'u=,g=,o=' );
		t.equal( umask(), 0, 'returns expected value' );

		// Enable permissions:
		umask( values[ i ] );
		t.equal( umask( opts ), 'u=rwx,g=rwx,o=rwx', 'returns expected value' );
	}
	restore();
	t.end();
});

tape( 'the function supports providing a mask expression enabling permissions for the "group" user class', function test( t ) {
	var values;
	var opts;
	var i;

	values = [
		'g+',
		'g+r',
		'g+w',
		'g+x',
		'g+rw',
		'g+rx',
		'g+wx',
		'g+rwx'
	];

	opts = {
		'symbolic': true
	};

	for ( i = 0; i < values.length; i++ ) {
		// Clear all bits:
		umask( 'u=,g=,o=' );
		t.equal( umask(), 0, 'returns expected value' );

		// Enable permissions:
		umask( values[ i ] );
		t.equal( umask( opts ), 'u=rwx,g=rwx,o=rwx', 'returns expected value' );
	}
	restore();
	t.end();
});

tape( 'the function supports providing a mask expression enabling permissions for the "non-group" user class', function test( t ) {
	var values;
	var opts;
	var i;

	values = [
		'o+',
		'o+r',
		'o+w',
		'o+x',
		'o+rw',
		'o+rx',
		'o+wx',
		'o+rwx'
	];

	opts = {
		'symbolic': true
	};

	for ( i = 0; i < values.length; i++ ) {
		// Clear all bits:
		umask( 'u=,g=,o=' );
		t.equal( umask(), 0, 'returns expected value' );

		// Enable permissions:
		umask( values[ i ] );
		t.equal( umask( opts ), 'u=rwx,g=rwx,o=rwx', 'returns expected value' );
	}
	restore();
	t.end();
});

tape( 'the function supports providing a mask expression disabling permissions for the "user" user class', function test( t ) {
	var values;
	var opts;
	var i;

	values = [
		'u-',
		'u-r',
		'u-w',
		'u-x',
		'u-rw',
		'u-rx',
		'u-wx',
		'u-rwx'
	];

	opts = {
		'symbolic': true
	};

	for ( i = 0; i < values.length; i++ ) {
		// Set all bits:
		umask( 'u=rwx,g=rwx,o=rwx' );
		t.equal( umask(), 0, 'returns expected value' ); // 0 == 0o0000

		// Disable permissions:
		umask( values[ i ] );
		t.equal( umask( opts ), 'u=rwx,g=rwx,o=rwx', 'returns expected value' );
	}
	restore();
	t.end();
});

tape( 'the function supports providing a mask expression disabling permissions for the "group" user class', function test( t ) {
	var values;
	var opts;
	var i;

	values = [
		'g-',
		'g-r',
		'g-w',
		'g-x',
		'g-rw',
		'g-rx',
		'g-wx',
		'g-rwx'
	];

	opts = {
		'symbolic': true
	};

	for ( i = 0; i < values.length; i++ ) {
		// Set all bits:
		umask( 'u=rwx,g=rwx,o=rwx' );
		t.equal( umask(), 0, 'returns expected value' ); // 0 == 0o0000

		// Disable permissions:
		umask( values[ i ] );
		t.equal( umask( opts ), 'u=rwx,g=rwx,o=rwx', 'returns expected value' );
	}
	restore();
	t.end();
});

tape( 'the function supports providing a mask expression disabling permissions for the "non-group" user class', function test( t ) {
	var values;
	var opts;
	var i;

	values = [
		'o-',
		'o-r',
		'o-w',
		'o-x',
		'o-rw',
		'o-rx',
		'o-wx',
		'o-rwx'
	];

	opts = {
		'symbolic': true
	};

	for ( i = 0; i < values.length; i++ ) {
		// Set all bits:
		umask( 'u=rwx,g=rwx,o=rwx' );
		t.equal( umask(), 0, 'returns expected value' ); // 0 == 0o0000

		// Disable permissions:
		umask( values[ i ] );
		t.equal( umask( opts ), 'u=rwx,g=rwx,o=rwx', 'returns expected value' );
	}
	restore();
	t.end();
});

tape( 'while not encouraged, the function allows for providing mask expressions overriding permission settings in the same expression mask', function test( t ) {
	var opts = {
		'symbolic': true
	};

	umask( 'a-rwx,u+r,g+w,o+x' );
	t.equal( umask( opts ), 'u=rwx,g=rwx,o=rwx', 'returns expected value' );

	umask( 'a+rwx,u-r,g-w,o-x' );
	t.equal( umask( opts ), 'u=rwx,g=rwx,o=rwx', 'returns expected value' );

	umask( 'ugo=rwx,a=w' );
	t.equal( umask( opts ), 'u=rwx,g=rwx,o=rwx', 'returns expected value' );

	umask( 'a=rwx,u=r,g=rw,o=x' );
	t.equal( umask( opts ), 'u=rwx,g=rwx,o=rwx', 'returns expected value' );

	restore();
	t.end();
});

}).call(this)}).call(this,"/lib/node_modules/@stdlib/process/umask/test/test.browser.js")
},{"./../lib/browser.js":70,"./fixtures/binary_to_symbolic.json":75,"tape":229}],78:[function(require,module,exports){
(function (process,__filename,__dirname){(function (){
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

var proc = process;
var resolve = require( 'path' ).resolve;
var exec = require( 'child_process' ).exec;
var tape = require( 'tape' );
var IS_BROWSER = require( '@stdlib/assert/is-browser' );
var IS_WINDOWS = require( '@stdlib/assert/is-windows' );
var EXEC_PATH = require( '@stdlib/process/exec-path' );
var readFileSync = require( '@stdlib/fs/read-file' ).sync;
var lpad = require( '@stdlib/string/left-pad' );
var trimRight = require( '@stdlib/string/right-trim' );


// VARIABLES //

var fpath = resolve( __dirname, '..', 'bin', 'cli' );
var opts = {
	'skip': IS_BROWSER || IS_WINDOWS
};
var RE_MASK = /^u{0,1}=r{0,1}w{0,1}x{0,1},g{0,1}=r{0,1}w{0,1}x{0,1},o{0,1}=r{0,1}w{0,1}x{0,1}$/;
var RE_MASK_CMD_S = /^umask -S u{0,1}=r{0,1}w{0,1}x{0,1},g{0,1}=r{0,1}w{0,1}x{0,1},o{0,1}=r{0,1}w{0,1}x{0,1}$/;


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

tape( 'the command-line interface prints the process mask', opts, function test( t ) {
	var cmd = [
		EXEC_PATH,
		fpath
	];

	exec( cmd.join( ' ' ), done );

	function done( error, stdout, stderr ) {
		var mask;
		var str;
		if ( error ) {
			t.fail( error.message );
		} else {
			str = stdout.toString();
			mask = lpad( proc.umask().toString( 8 ), 4, '0' );
			t.strictEqual( str, mask+'\n', 'prints mask to `stdout`' );
			t.strictEqual( stderr.toString(), '', 'does not print to `stderr`' );
		}
		t.end();
	}
});

tape( 'the command-line interface prints the process mask command (-p)', opts, function test( t ) {
	var cmd = [
		EXEC_PATH,
		fpath,
		'-p'
	];

	exec( cmd.join( ' ' ), done );

	function done( error, stdout, stderr ) {
		var mask;
		var str;
		if ( error ) {
			t.fail( error.message );
		} else {
			str = stdout.toString();
			mask = lpad( proc.umask().toString( 8 ), 4, '0' );
			t.strictEqual( str, 'umask '+mask+'\n', 'prints mask cmd to `stdout`' );
			t.strictEqual( stderr.toString(), '', 'does not print to `stderr`' );
		}
		t.end();
	}
});

tape( 'the command-line interface prints the process mask command (--print)', opts, function test( t ) {
	var cmd = [
		EXEC_PATH,
		fpath,
		'--print'
	];

	exec( cmd.join( ' ' ), done );

	function done( error, stdout, stderr ) {
		var mask;
		var str;
		if ( error ) {
			t.fail( error.message );
		} else {
			str = stdout.toString();
			mask = lpad( proc.umask().toString( 8 ), 4, '0' );
			t.strictEqual( str, 'umask '+mask+'\n', 'prints mask cmd to `stdout`' );
			t.strictEqual( stderr.toString(), '', 'does not print to `stderr`' );
		}
		t.end();
	}
});

tape( 'the command-line interface prints the process mask in symbolic notation (-S)', opts, function test( t ) {
	var cmd = [
		EXEC_PATH,
		fpath,
		'-S'
	];

	exec( cmd.join( ' ' ), done );

	function done( error, stdout, stderr ) {
		var str;
		if ( error ) {
			t.fail( error.message );
		} else {
			str = trimRight( stdout.toString() );
			t.strictEqual( RE_MASK.test( str ), true, 'prints mask to `stdout`' );
			t.strictEqual( stderr.toString(), '', 'does not print to `stderr`' );
		}
		t.end();
	}
});

tape( 'the command-line interface prints the process mask in symbolic notation (--symbolic)', opts, function test( t ) {
	var cmd = [
		EXEC_PATH,
		fpath,
		'--symbolic'
	];

	exec( cmd.join( ' ' ), done );

	function done( error, stdout, stderr ) {
		var str;
		if ( error ) {
			t.fail( error.message );
		} else {
			str = trimRight( stdout.toString() );
			t.strictEqual( RE_MASK.test( str ), true, 'prints mask to `stdout`' );
			t.strictEqual( stderr.toString(), '', 'does not print to `stderr`' );
		}
		t.end();
	}
});

tape( 'the command-line interface prints the process mask command in symbolic notation (-Sp)', opts, function test( t ) {
	var cmd = [
		EXEC_PATH,
		fpath,
		'-Sp'
	];

	exec( cmd.join( ' ' ), done );

	function done( error, stdout, stderr ) {
		var str;
		if ( error ) {
			t.fail( error.message );
		} else {
			str = trimRight( stdout.toString() );
			t.strictEqual( RE_MASK_CMD_S.test( str ), true, 'prints mask cmd to `stdout`' );
			t.strictEqual( stderr.toString(), '', 'does not print to `stderr`' );
		}
		t.end();
	}
});

tape( 'the command-line interface prints the process mask command in symbolic notation (-S -p)', opts, function test( t ) {
	var cmd = [
		EXEC_PATH,
		fpath,
		'-S',
		'-p'
	];

	exec( cmd.join( ' ' ), done );

	function done( error, stdout, stderr ) {
		var str;
		if ( error ) {
			t.fail( error.message );
		} else {
			str = trimRight( stdout.toString() );
			t.strictEqual( RE_MASK_CMD_S.test( str ), true, 'prints mask cmd to `stdout`' );
			t.strictEqual( stderr.toString(), '', 'does not print to `stderr`' );
		}
		t.end();
	}
});

tape( 'the command-line interface prints the process mask command in symbolic notation (-S --print)', opts, function test( t ) {
	var cmd = [
		EXEC_PATH,
		fpath,
		'-S',
		'--print'
	];

	exec( cmd.join( ' ' ), done );

	function done( error, stdout, stderr ) {
		var str;
		if ( error ) {
			t.fail( error.message );
		} else {
			str = trimRight( stdout.toString() );
			t.strictEqual( RE_MASK_CMD_S.test( str ), true, 'prints mask cmd to `stdout`' );
			t.strictEqual( stderr.toString(), '', 'does not print to `stderr`' );
		}
		t.end();
	}
});

tape( 'the command-line interface prints the process mask command in symbolic notation (--symbolic -p)', opts, function test( t ) {
	var cmd = [
		EXEC_PATH,
		fpath,
		'--symbolic',
		'-p'
	];

	exec( cmd.join( ' ' ), done );

	function done( error, stdout, stderr ) {
		var str;
		if ( error ) {
			t.fail( error.message );
		} else {
			str = trimRight( stdout.toString() );
			t.strictEqual( RE_MASK_CMD_S.test( str ), true, 'prints mask cmd to `stdout`' );
			t.strictEqual( stderr.toString(), '', 'does not print to `stderr`' );
		}
		t.end();
	}
});

tape( 'the command-line interface prints the process mask command in symbolic notation (--symbolic --print)', opts, function test( t ) {
	var cmd = [
		EXEC_PATH,
		fpath,
		'--symbolic',
		'--print'
	];

	exec( cmd.join( ' ' ), done );

	function done( error, stdout, stderr ) {
		var str;
		if ( error ) {
			t.fail( error.message );
		} else {
			str = trimRight( stdout.toString() );
			t.strictEqual( RE_MASK_CMD_S.test( str ), true, 'prints mask cmd to `stdout`' );
			t.strictEqual( stderr.toString(), '', 'does not print to `stderr`' );
		}
		t.end();
	}
});

}).call(this)}).call(this,require('_process'),"/lib/node_modules/@stdlib/process/umask/test/test.cli.js","/lib/node_modules/@stdlib/process/umask/test")
},{"./../package.json":74,"@stdlib/assert/is-browser":15,"@stdlib/assert/is-windows":51,"@stdlib/fs/read-file":57,"@stdlib/process/exec-path":69,"@stdlib/string/left-pad":83,"@stdlib/string/right-trim":89,"_process":221,"child_process":128,"path":130,"tape":229}],79:[function(require,module,exports){
(function (process,__filename){(function (){
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

var proc = process;
var tape = require( 'tape' );
var IS_BROWSER = require( '@stdlib/assert/is-browser' );
var check = require( './fixtures/check_umask.js' );
var umask = require( './../lib' );


// FIXTURES //

var BINARY_SYMBOLIC = require( './fixtures/binary_to_symbolic.json' );


// VARIABLES //

var INT_TO_SYMBOLIC = int2symbolic();
var SYMBOLIC_TO_INT = symbolic2int();
var MASK = umask();
var opts = {
	'skip': IS_BROWSER || !check()
};


// FUNCTIONS //

/**
* Restores the process mask.
*
* @private
*/
function restore() {
	umask( MASK );
}

/**
* Generates a dictionary mapping integer values to symbolic notation.
*
* @private
* @returns {Object} dictionary
*/
function int2symbolic() {
	var out;
	var i;

	out = {};
	for ( i = 0; i < BINARY_SYMBOLIC.length; i++ ) {
		out[ BINARY_SYMBOLIC[i][0] ] = BINARY_SYMBOLIC[ i ][ 3 ];
	}
	return out;
}

/**
* Generates a dictionary mapping symbolic notation to integer values.
*
* @private
* @returns {Object} dictionary
*/
function symbolic2int() {
	var octal;
	var out;
	var i;

	out = {};
	for ( i = 0; i < BINARY_SYMBOLIC.length; i++ ) {
		octal = BINARY_SYMBOLIC[ i ][ 1 ];
		octal = parseInt( octal.toString().substring( 1 ), 8 );
		out[ BINARY_SYMBOLIC[i][3] ] = octal;
	}
	return out;
}


// TESTS //

tape( 'main export is a function', opts, function test( t ) {
	t.ok( true, __filename );
	t.equal( typeof umask, 'function', 'main export is a function' );
	t.end();
});

tape( 'if provided only one argument, the function throws an error if not provided either a string, nonnegative integer, or options object', opts, function test( t ) {
	var values;
	var i;

	values = [
		3.14,
		-1,
		NaN,
		true,
		false,
		null,
		void 0,
		[],
		function noop() {}
	];
	for ( i = 0; i < values.length; i++ ) {
		t.throws( badValue( values[i] ), TypeError, 'throws an error when provided ' + values[ i ] );
	}
	t.end();

	function badValue( value ) {
		return function badValue() {
			umask( value );
		};
	}
});

tape( 'if provided only one argument, the function throws an error if provided a `symbolic` option which is not a boolean', opts, function test( t ) {
	var values;
	var i;

	values = [
		'5',
		5,
		NaN,
		null,
		void 0,
		[],
		{},
		function noop() {}
	];
	for ( i = 0; i < values.length; i++ ) {
		t.throws( badValue( values[i] ), TypeError, 'throws an error when provided ' + values[ i ] );
	}
	t.end();

	function badValue( value ) {
		return function badValue() {
			var opts = {
				'symbolic': value
			};
			umask( opts );
		};
	}
});

tape( 'if provided more than one argument, the function throws an error if the first argument is neither a string nor nonnegative integer', opts, function test( t ) {
	var values;
	var i;

	values = [
		3.14,
		-1,
		NaN,
		true,
		false,
		null,
		void 0,
		[],
		{},
		function noop() {}
	];
	for ( i = 0; i < values.length; i++ ) {
		t.throws( badValue( values[i] ), TypeError, 'throws an error when provided ' + values[ i ] );
	}
	t.end();

	function badValue( value ) {
		return function badValue() {
			umask( value, {} );
		};
	}
});

tape( 'if provided more than one argument, the function throws an error if the second argument is not an object', opts, function test( t ) {
	var values;
	var i;

	values = [
		'5',
		5,
		NaN,
		true,
		false,
		null,
		void 0,
		[],
		function noop() {}
	];
	for ( i = 0; i < values.length; i++ ) {
		t.throws( badValue( values[i] ), TypeError, 'throws an error when provided ' + values[ i ] );
	}
	restore();
	t.end();

	function badValue( value ) {
		return function badValue() {
			umask( MASK, value );
		};
	}
});

tape( 'if provided more than one argument, the function throws an error if provided a `symbolic` option which is not a boolean', opts, function test( t ) {
	var values;
	var i;

	values = [
		'5',
		5,
		NaN,
		null,
		void 0,
		[],
		{},
		function noop() {}
	];
	for ( i = 0; i < values.length; i++ ) {
		t.throws( badValue( values[i] ), TypeError, 'throws an error when provided ' + values[ i ] );
	}
	restore();
	t.end();

	function badValue( value ) {
		return function badValue() {
			var opts = {
				'symbolic': value
			};
			umask( MASK, opts );
		};
	}
});

tape( 'if provided an expression mask, the function throws an error if unable to parse the value', opts, function test( t ) {
	var values;
	var i;

	values = [
		'u=rwx,,g=',
		'b=rwx',
		'u^rwx',
		'u=rwx,g=rx,o=rx,t=rx',
		'u=rwx,g=rx;o=rx',
		'u=rwxvz',
		'beep',
		'boop'
	];
	for ( i = 0; i < values.length; i++ ) {
		t.throws( badValue( values[i] ), Error, 'throws an error when provided ' + values[ i ] );
	}
	restore();
	t.end();

	function badValue( value ) {
		return function badValue() {
			umask( value );
		};
	}
});

tape( 'if provided an expression mask, the function throws an error if unable to parse the value (options)', opts, function test( t ) {
	var values;
	var i;

	values = [
		'u=rwx,,g=',
		'b=rwx',
		'u^rwx',
		'u=rwx,g=rx,o=rx,t=rx',
		'u=rwx,g=rx;o=rx',
		'u=rwxvz',
		'beep',
		'boop'
	];
	for ( i = 0; i < values.length; i++ ) {
		t.throws( badValue( values[i] ), Error, 'throws an error when provided ' + values[ i ] );
	}
	restore();
	t.end();

	function badValue( value ) {
		return function badValue() {
			umask( value, {} );
		};
	}
});

tape( 'if not provided any arguments, the function returns the process mask', opts, function test( t ) {
	var expected = proc.umask();
	t.equal( typeof expected, 'number', 'returns a number' );
	t.equal( umask(), expected, 'returns expected value' );
	t.end();
});

tape( 'the function ignores unrecognized/unsupported options and returns the process mask', opts, function test( t ) {
	var expected = proc.umask();
	t.equal( typeof expected, 'number', 'returns a number' );
	t.equal( umask( {} ), expected, 'returns expected value' );
	restore();
	t.end();
});

tape( 'the function supports returning the process mask in symbolic notation', opts, function test( t ) {
	var expected;
	var actual;
	var mask;
	var opts;

	opts = {
		'symbolic': true
	};
	mask = proc.umask();

	actual = umask( opts );
	expected = INT_TO_SYMBOLIC[ mask ];

	t.equal( actual, expected, 'returns expected value' );

	restore();
	t.end();
});

tape( 'if the `symbolic` option is `false`, the function returns the process mask as an integer value', opts, function test( t ) {
	var opts;
	var mask;

	opts = {
		'symbolic': false
	};
	mask = umask( opts );

	t.equal( typeof mask, 'number', 'returns a number' );
	t.equal( mask, proc.umask(), 'returns expected value' );

	restore();
	t.end();
});

tape( 'if provided a nonnegative integer, the function sets the process mask and returns the previous mask', opts, function test( t ) {
	var old;
	var i;

	for ( i = 0; i < 100; i++ ) {
		old = umask();
		t.equal( umask( i ), old, 'returns previous mask' );
		t.equal( umask(), i, 'returns expected value' );
	}
	restore();
	t.end();
});

tape( 'if provided a nonnegative integer and the `symbolic` option is `false`, the function sets the process mask and returns the previous mask as an integer value', opts, function test( t ) {
	var opts;
	var old;
	var i;

	opts = {
		'symbolic': false
	};
	for ( i = 100; i < 200; i++ ) {
		old = umask( opts );
		t.equal( typeof old, 'number', 'returns a number' );
		t.equal( umask( i, opts ), old, 'returns previous mask' );
		t.equal( umask( opts ), i, 'returns expected value' );
	}
	restore();
	t.end();
});

tape( 'if provided a nonnegative integer and the `symbolic` option is `true`, the function sets the process mask and returns the previous mask in symbolic notation', opts, function test( t ) {
	var opts;
	var mask;
	var old;
	var i;

	opts = {
		'symbolic': true
	};
	for ( i = 0; i < BINARY_SYMBOLIC.length; i++ ) {
		old = umask( opts );
		t.equal( typeof old, 'string', 'returns a string' );

		mask = umask( i, opts );
		t.equal( mask, old, 'returns previous mask' );

		t.equal( umask( opts ), INT_TO_SYMBOLIC[ i ], 'returns expected value' );
	}
	restore();
	t.end();
});

tape( 'if provided an expression mask, the function sets the process mask and returns the previous mask', opts, function test( t ) {
	var mask;
	var old;
	var i;

	for ( i = 0; i < BINARY_SYMBOLIC.length; i++ ) {
		old = umask();
		t.equal( typeof old, 'number', 'returns a number' );

		mask = INT_TO_SYMBOLIC[ i ];
		t.equal( umask( mask ), old, 'returns previous mask' );

		t.equal( umask(), SYMBOLIC_TO_INT[ mask ], 'returns expected value' );
	}
	restore();
	t.end();
});

tape( 'if provided an expression mask and the `symbolic` option is `false`, the function sets the process mask and returns the previous mask as an integer value', opts, function test( t ) {
	var mask;
	var opts;
	var old;
	var i;

	opts = {
		'symbolic': false
	};
	for ( i = 0; i < BINARY_SYMBOLIC.length; i++ ) {
		old = umask( opts );
		t.equal( typeof old, 'number', 'returns a number' );

		mask = INT_TO_SYMBOLIC[ i ];
		t.equal( umask( mask, opts ), old, 'returns previous mask' );

		t.equal( umask(), SYMBOLIC_TO_INT[ mask ], 'returns expected value' );
	}
	restore();
	t.end();
});

tape( 'if provided an expression mask, the function supports setting the process mask and returns the previous mask in symbolic notation', opts, function test( t ) {
	var mask;
	var opts;
	var old;
	var i;

	opts = {
		'symbolic': true
	};

	for ( i = 0; i < BINARY_SYMBOLIC.length; i++ ) {
		old = umask( opts );
		t.equal( typeof old, 'string', 'returns a string' );

		mask = INT_TO_SYMBOLIC[ i ];
		t.equal( umask( mask, opts ), old, 'returns previous mask' );

		t.equal( umask( opts ), mask, 'returns expected value' );
	}
	restore();
	t.end();
});

tape( 'the function supports enabling permissions using the "all" user class', opts, function test( t ) {
	var expected;
	var values;
	var opts;
	var i;

	values = [
		'a+', // no effect
		'a+r',
		'a+w',
		'a+x',
		'a+rw',
		'a+rx',
		'a+wx',
		'a+rwx'
	];
	expected = [
		'u=,g=,o=', // no effect
		'u=r,g=r,o=r',
		'u=w,g=w,o=w',
		'u=x,g=x,o=x',
		'u=rw,g=rw,o=rw',
		'u=rx,g=rx,o=rx',
		'u=wx,g=wx,o=wx',
		'u=rwx,g=rwx,o=rwx'
	];

	opts = {
		'symbolic': true
	};

	for ( i = 0; i < values.length; i++ ) {
		// Clear all bits:
		umask( 'u=,g=,o=' );
		t.equal( umask(), 511, 'returns expected value' ); // 511 == 0o0777

		// Enable permissions:
		umask( values[ i ] );
		t.equal( umask( opts ), expected[ i ], 'returns expected value' );
	}
	restore();
	t.end();
});

tape( 'the function supports disabling permissions using the "all" user class', opts, function test( t ) {
	var expected;
	var values;
	var opts;
	var i;

	values = [
		'a-', // no effect
		'a-r',
		'a-w',
		'a-x',
		'a-rw',
		'a-rx',
		'a-wx',
		'a-rwx'
	];
	expected = [
		'u=rwx,g=rwx,o=rwx', // no effect
		'u=wx,g=wx,o=wx',
		'u=rx,g=rx,o=rx',
		'u=rw,g=rw,o=rw',
		'u=x,g=x,o=x',
		'u=w,g=w,o=w',
		'u=r,g=r,o=r',
		'u=,g=,o='
	];

	opts = {
		'symbolic': true
	};

	for ( i = 0; i < values.length; i++ ) {
		// Set all bits:
		umask( 'u=rwx,g=rwx,o=rwx' );
		t.equal( umask(), 0, 'returns expected value' ); // 0 == 0o0000

		// Disable permissions:
		umask( values[ i ] );
		t.equal( umask( opts ), expected[ i ], 'returns expected value' );
	}
	restore();
	t.end();
});

tape( 'the function supports enabling permissions without specifying a user class', opts, function test( t ) {
	var expected;
	var values;
	var opts;
	var i;

	values = [
		'+', // no effect
		'+r',
		'+w',
		'+x',
		'+rw',
		'+rx',
		'+wx',
		'+rwx'
	];
	expected = [
		'u=,g=,o=', // no effect
		'u=r,g=r,o=r',
		'u=w,g=w,o=w',
		'u=x,g=x,o=x',
		'u=rw,g=rw,o=rw',
		'u=rx,g=rx,o=rx',
		'u=wx,g=wx,o=wx',
		'u=rwx,g=rwx,o=rwx'
	];

	opts = {
		'symbolic': true
	};

	for ( i = 0; i < values.length; i++ ) {
		// Clear all bits:
		umask( 'u=,g=,o=' );
		t.equal( umask(), 511, 'returns expected value' ); // 511 == 0o0777

		// Enable permissions:
		umask( values[ i ] );
		t.equal( umask( opts ), expected[ i ], 'returns expected value' );
	}
	restore();
	t.end();
});

tape( 'the function supports disabling permissions without specifying a user class', opts, function test( t ) {
	var expected;
	var values;
	var opts;
	var i;

	values = [
		'-', // no effect
		'-r',
		'-w',
		'-x',
		'-rw',
		'-rx',
		'-wx',
		'-rwx'
	];
	expected = [
		'u=rwx,g=rwx,o=rwx', // no effect
		'u=wx,g=wx,o=wx',
		'u=rx,g=rx,o=rx',
		'u=rw,g=rw,o=rw',
		'u=x,g=x,o=x',
		'u=w,g=w,o=w',
		'u=r,g=r,o=r',
		'u=,g=,o='
	];

	opts = {
		'symbolic': true
	};

	for ( i = 0; i < values.length; i++ ) {
		// Set all bits:
		umask( 'u=rwx,g=rwx,o=rwx' );
		t.equal( umask(), 0, 'returns expected value' ); // 0 == 0o0000

		// Disable permissions:
		umask( values[ i ] );
		t.equal( umask( opts ), expected[ i ], 'returns expected value' );
	}
	restore();
	t.end();
});

tape( 'the function supports enabling permissions for the "user" user class', opts, function test( t ) {
	var expected;
	var values;
	var opts;
	var i;

	values = [
		'u+', // no effect
		'u+r',
		'u+w',
		'u+x',
		'u+rw',
		'u+rx',
		'u+wx',
		'u+rwx'
	];
	expected = [
		'u=,g=,o=', // no effect
		'u=r,g=,o=',
		'u=w,g=,o=',
		'u=x,g=,o=',
		'u=rw,g=,o=',
		'u=rx,g=,o=',
		'u=wx,g=,o=',
		'u=rwx,g=,o='
	];

	opts = {
		'symbolic': true
	};

	for ( i = 0; i < values.length; i++ ) {
		// Clear all bits:
		umask( 'u=,g=,o=' );
		t.equal( umask(), 511, 'returns expected value' ); // 511 == 0o0777

		// Enable permissions:
		umask( values[ i ] );
		t.equal( umask( opts ), expected[ i ], 'returns expected value' );
	}
	restore();
	t.end();
});

tape( 'the function supports enabling permissions for the "group" user class', opts, function test( t ) {
	var expected;
	var values;
	var opts;
	var i;

	values = [
		'g+', // no effect
		'g+r',
		'g+w',
		'g+x',
		'g+rw',
		'g+rx',
		'g+wx',
		'g+rwx'
	];
	expected = [
		'u=,g=,o=', // no effect
		'u=,g=r,o=',
		'u=,g=w,o=',
		'u=,g=x,o=',
		'u=,g=rw,o=',
		'u=,g=rx,o=',
		'u=,g=wx,o=',
		'u=,g=rwx,o='
	];

	opts = {
		'symbolic': true
	};

	for ( i = 0; i < values.length; i++ ) {
		// Clear all bits:
		umask( 'u=,g=,o=' );
		t.equal( umask(), 511, 'returns expected value' ); // 511 == 0o0777

		// Enable permissions:
		umask( values[ i ] );
		t.equal( umask( opts ), expected[ i ], 'returns expected value' );
	}
	restore();
	t.end();
});

tape( 'the function supports enabling permissions for the "non-group" user class', opts, function test( t ) {
	var expected;
	var values;
	var opts;
	var i;

	values = [
		'o+', // no effect
		'o+r',
		'o+w',
		'o+x',
		'o+rw',
		'o+rx',
		'o+wx',
		'o+rwx'
	];
	expected = [
		'u=,g=,o=', // no effect
		'u=,g=,o=r',
		'u=,g=,o=w',
		'u=,g=,o=x',
		'u=,g=,o=rw',
		'u=,g=,o=rx',
		'u=,g=,o=wx',
		'u=,g=,o=rwx'
	];

	opts = {
		'symbolic': true
	};

	for ( i = 0; i < values.length; i++ ) {
		// Clear all bits:
		umask( 'u=,g=,o=' );
		t.equal( umask(), 511, 'returns expected value' ); // 511 == 0o0777

		// Enable permissions:
		umask( values[ i ] );
		t.equal( umask( opts ), expected[ i ], 'returns expected value' );
	}
	restore();
	t.end();
});

tape( 'the function supports disabling permissions for the "user" user class', opts, function test( t ) {
	var expected;
	var values;
	var opts;
	var i;

	values = [
		'u-', // no effect
		'u-r',
		'u-w',
		'u-x',
		'u-rw',
		'u-rx',
		'u-wx',
		'u-rwx'
	];
	expected = [
		'u=rwx,g=rwx,o=rwx', // no effect
		'u=wx,g=rwx,o=rwx',
		'u=rx,g=rwx,o=rwx',
		'u=rw,g=rwx,o=rwx',
		'u=x,g=rwx,o=rwx',
		'u=w,g=rwx,o=rwx',
		'u=r,g=rwx,o=rwx',
		'u=,g=rwx,o=rwx'
	];

	opts = {
		'symbolic': true
	};

	for ( i = 0; i < values.length; i++ ) {
		// Set all bits:
		umask( 'u=rwx,g=rwx,o=rwx' );
		t.equal( umask(), 0, 'returns expected value' ); // 0 == 0o0000

		// Disable permissions:
		umask( values[ i ] );
		t.equal( umask( opts ), expected[ i ], 'returns expected value' );
	}
	restore();
	t.end();
});

tape( 'the function supports disabling permissions for the "group" user class', opts, function test( t ) {
	var expected;
	var values;
	var opts;
	var i;

	values = [
		'g-', // no effect
		'g-r',
		'g-w',
		'g-x',
		'g-rw',
		'g-rx',
		'g-wx',
		'g-rwx'
	];
	expected = [
		'u=rwx,g=rwx,o=rwx', // no effect
		'u=rwx,g=wx,o=rwx',
		'u=rwx,g=rx,o=rwx',
		'u=rwx,g=rw,o=rwx',
		'u=rwx,g=x,o=rwx',
		'u=rwx,g=w,o=rwx',
		'u=rwx,g=r,o=rwx',
		'u=rwx,g=,o=rwx'
	];

	opts = {
		'symbolic': true
	};

	for ( i = 0; i < values.length; i++ ) {
		// Set all bits:
		umask( 'u=rwx,g=rwx,o=rwx' );
		t.equal( umask(), 0, 'returns expected value' ); // 0 == 0o0000

		// Disable permissions:
		umask( values[ i ] );
		t.equal( umask( opts ), expected[ i ], 'returns expected value' );
	}
	restore();
	t.end();
});

tape( 'the function supports disabling permissions for the "non-group" user class', opts, function test( t ) {
	var expected;
	var values;
	var opts;
	var i;

	values = [
		'o-', // no effect
		'o-r',
		'o-w',
		'o-x',
		'o-rw',
		'o-rx',
		'o-wx',
		'o-rwx'
	];
	expected = [
		'u=rwx,g=rwx,o=rwx', // no effect
		'u=rwx,g=rwx,o=wx',
		'u=rwx,g=rwx,o=rx',
		'u=rwx,g=rwx,o=rw',
		'u=rwx,g=rwx,o=x',
		'u=rwx,g=rwx,o=w',
		'u=rwx,g=rwx,o=r',
		'u=rwx,g=rwx,o='
	];

	opts = {
		'symbolic': true
	};

	for ( i = 0; i < values.length; i++ ) {
		// Set all bits:
		umask( 'u=rwx,g=rwx,o=rwx' );
		t.equal( umask(), 0, 'returns expected value' ); // 0 == 0o0000

		// Disable permissions:
		umask( values[ i ] );
		t.equal( umask( opts ), expected[ i ], 'returns expected value' );
	}
	restore();
	t.end();
});

tape( 'while not encouraged, the function allows for overriding permission settings in the same expression mask', opts, function test( t ) {
	var opts = {
		'symbolic': true
	};

	umask( 'a-rwx,u+r,g+w,o+x' );
	t.equal( umask( opts ), 'u=r,g=w,o=x', 'returns expected value' );

	umask( 'a+rwx,u-r,g-w,o-x' );
	t.equal( umask( opts ), 'u=wx,g=rx,o=rw', 'returns expected value' );

	umask( 'ugo=rwx,a=w' );
	t.equal( umask( opts ), 'u=w,g=w,o=w', 'returns expected value' );

	umask( 'a=rwx,u=r,g=rw,o=x' );
	t.equal( umask( opts ), 'u=r,g=rw,o=x', 'returns expected value' );

	restore();
	t.end();
});

}).call(this)}).call(this,require('_process'),"/lib/node_modules/@stdlib/process/umask/test/test.js")
},{"./../lib":70,"./fixtures/binary_to_symbolic.json":75,"./fixtures/check_umask.js":76,"@stdlib/assert/is-browser":15,"_process":221,"tape":229}],80:[function(require,module,exports){
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

},{"./main.js":81,"./regexp.js":82,"@stdlib/utils/define-nonenumerable-read-only-property":93}],81:[function(require,module,exports){
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

},{}],82:[function(require,module,exports){
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

},{"./main.js":81}],83:[function(require,module,exports){
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
* Left pad a string such that the padded string has a length of at least `len`.
*
* @module @stdlib/string/left-pad
*
* @example
* var lpad = require( '@stdlib/string/left-pad' );
*
* var str = lpad( 'a', 5 );
* // returns '    a'
*
* str = lpad( 'beep', 10, 'b' );
* // returns 'bbbbbbbeep'
*
* str = lpad( 'boop', 12, 'beep' );
* // returns 'beepbeepboop'
*/

// MODULES //

var lpad = require( './left_pad.js' );


// EXPORTS //

module.exports = lpad;

},{"./left_pad.js":84}],84:[function(require,module,exports){
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

var isNonNegativeInteger = require( '@stdlib/assert/is-nonnegative-integer' ).isPrimitive;
var isString = require( '@stdlib/assert/is-string' ).isPrimitive;
var repeat = require( '@stdlib/string/repeat' );
var ceil = require( '@stdlib/math/base/special/ceil' );
var FLOAT64_MAX_SAFE_INTEGER = require( '@stdlib/constants/float64/max-safe-integer' );


// MAIN //

/**
* Left pads a string such that the padded string has a length of at least `len`.
*
* @param {string} str - string to pad
* @param {NonNegativeInteger} len - minimum string length
* @param {string} [pad=' '] - string used to pad
* @throws {TypeError} first argument must be a string
* @throws {TypeError} second argument must be a nonnegative integer
* @throws {TypeError} third argument must be a string
* @throws {RangeError} padding must have a length greater than `0`
* @returns {string} padded string
*
* @example
* var str = lpad( 'a', 5 );
* // returns '    a'
*
* @example
* var str = lpad( 'beep', 10, 'b' );
* // returns 'bbbbbbbeep'
*
* @example
* var str = lpad( 'boop', 12, 'beep' );
* // returns 'beepbeepboop'
*/
function lpad( str, len, pad ) {
	var n;
	var p;
	if ( !isString( str ) ) {
		throw new TypeError( 'invalid argument. First argument must be a string. Value: `' + str + '`.' );
	}
	if ( !isNonNegativeInteger( len ) ) {
		throw new TypeError( 'invalid argument. Second argument must be a nonnegative integer. Value: `' + len + '`.' );
	}
	if ( arguments.length > 2 ) {
		p = pad;
		if ( !isString( p ) ) {
			throw new TypeError( 'invalid argument. Third argument must be a string. Value: `' + p + '`.' );
		}
		if ( p.length === 0 ) {
			throw new RangeError( 'invalid argument. Third argument must not be an empty string.' );
		}
	} else {
		p = ' ';
	}
	if ( len > FLOAT64_MAX_SAFE_INTEGER ) {
		throw new RangeError( 'invalid argument. Output string length exceeds maximum allowed string length.' );
	}
	n = ( len - str.length ) / p.length;
	if ( n <= 0 ) {
		return str;
	}
	n = ceil( n );
	return repeat( p, n ) + str;
}


// EXPORTS //

module.exports = lpad;

},{"@stdlib/assert/is-nonnegative-integer":25,"@stdlib/assert/is-string":45,"@stdlib/constants/float64/max-safe-integer":54,"@stdlib/math/base/special/ceil":62,"@stdlib/string/repeat":85}],85:[function(require,module,exports){
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
* Repeat a string a specified number of times and return the concatenated result.
*
* @module @stdlib/string/repeat
*
* @example
* var replace = require( '@stdlib/string/repeat' );
*
* var str = repeat( 'a', 5 );
* // returns 'aaaaa'
*
* str = repeat( '', 100 );
* // returns ''
*
* str = repeat( 'beep', 0 );
* // returns ''
*/

// MODULES //

var repeat = require( './repeat.js' );


// EXPORTS //

module.exports = repeat;

},{"./repeat.js":86}],86:[function(require,module,exports){
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

var isNonNegativeInteger = require( '@stdlib/assert/is-nonnegative-integer' ).isPrimitive;
var isString = require( '@stdlib/assert/is-string' ).isPrimitive;
var FLOAT64_MAX_SAFE_INTEGER = require( '@stdlib/constants/float64/max-safe-integer' );


// MAIN //

/**
* Repeats a string a specified number of times and returns the concatenated result.
*
* ## Method
*
* The algorithmic trick used in the implementation is to treat string concatenation the same as binary addition (i.e., any natural number (nonnegative integer) can be expressed as a sum of powers of two).
*
* For example,
*
* ```text
* n = 10 => 1010 => 2^3 + 2^0 + 2^1 + 2^0
* ```
*
* We can produce a 10-repeat string by "adding" the results of a 8-repeat string and a 2-repeat string.
*
* The implementation is then as follows:
*
* 1.  Let `s` be the string to be repeated and `o` be an output string.
*
* 2.  Initialize an output string `o`.
*
* 3.  Check the least significant bit to determine if the current `s` string should be "added" to the output "total".
*
*     -   if the bit is a one, add
*     -   otherwise, move on
*
* 4.  Double the string `s` by adding `s` to `s`.
*
* 5.  Right-shift the bits of `n`.
*
* 6.  Check if we have shifted off all bits.
*
*     -   if yes, done.
*     -   otherwise, move on
*
* 7.  Repeat 3-6.
*
* The result is that, as the string is repeated, we continually check to see if the doubled string is one which we want to add to our "total".
*
* The algorithm runs in `O(log_2(n))` compared to `O(n)`.
*
*
* @param {string} str - string to repeat
* @param {NonNegativeInteger} n - number of times to repeat the string
* @throws {TypeError} first argument must be a string primitive
* @throws {TypeError} second argument must be a nonnegative integer
* @throws {RangeError} output string length must not exceed maximum allowed string length
* @returns {string} repeated string
*
* @example
* var str = repeat( 'a', 5 );
* // returns 'aaaaa'
*
* @example
* var str = repeat( '', 100 );
* // returns ''
*
* @example
* var str = repeat( 'beep', 0 );
* // returns ''
*/
function repeat( str, n ) {
	var rpt;
	var cnt;
	if ( !isString( str ) ) {
		throw new TypeError( 'invalid argument. First argument must be a string. Value: `' + str + '`.' );
	}
	if ( !isNonNegativeInteger( n ) ) {
		throw new TypeError( 'invalid argument. Second argument must be a nonnegative integer. Value: `' + n + '`.' );
	}
	if ( str.length === 0 || n === 0 ) {
		return '';
	}
	// Check that output string will not exceed the maximum string length:
	if ( str.length * n > FLOAT64_MAX_SAFE_INTEGER ) {
		throw new RangeError( 'invalid argument. Output string length exceeds maximum allowed string length.' );
	}
	rpt = '';
	cnt = n;
	for ( ; ; ) {
		// If the count is odd, append the current concatenated string:
		if ( (cnt&1) === 1 ) {
			rpt += str;
		}
		// Right-shift the bits:
		cnt >>>= 1;
		if ( cnt === 0 ) {
			break;
		}
		// Double the string:
		str += str;
	}
	return rpt;
}


// EXPORTS //

module.exports = repeat;

},{"@stdlib/assert/is-nonnegative-integer":25,"@stdlib/assert/is-string":45,"@stdlib/constants/float64/max-safe-integer":54}],87:[function(require,module,exports){
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
* Replace search occurrences with a replacement string.
*
* @module @stdlib/string/replace
*
* @example
* var replace = require( '@stdlib/string/replace' );
*
* var str = 'beep';
* var out = replace( str, 'e', 'o' );
* // returns 'boop'
*
* str = 'Hello World';
* out = replace( str, /world/i, 'Mr. President' );
* // returns 'Hello Mr. President'
*/

// MODULES //

var replace = require( './replace.js' );


// EXPORTS //

module.exports = replace;

},{"./replace.js":88}],88:[function(require,module,exports){
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

var rescape = require( '@stdlib/utils/escape-regexp-string' );
var isFunction = require( '@stdlib/assert/is-function' );
var isString = require( '@stdlib/assert/is-string' ).isPrimitive;
var isRegExp = require( '@stdlib/assert/is-regexp' );


// MAIN //

/**
* Replace search occurrences with a replacement string.
*
* @param {string} str - input string
* @param {(string|RegExp)} search - search expression
* @param {(string|Function)} newval - replacement value or function
* @throws {TypeError} first argument must be a string primitive
* @throws {TypeError} second argument argument must be a string primitive or regular expression
* @throws {TypeError} third argument must be a string primitive or function
* @returns {string} new string containing replacement(s)
*
* @example
* var str = 'beep';
* var out = replace( str, 'e', 'o' );
* // returns 'boop'
*
* @example
* var str = 'Hello World';
* var out = replace( str, /world/i, 'Mr. President' );
* // returns 'Hello Mr. President'
*
* @example
* var capitalize = require( '@stdlib/string/capitalize' );
*
* var str = 'Oranges and lemons say the bells of St. Clement\'s';
*
* function replacer( match, p1 ) {
*     return capitalize( p1 );
* }
*
* var out = replace( str, /([^\s]*)/gi, replacer);
* // returns 'Oranges And Lemons Say The Bells Of St. Clement\'s'
*/
function replace( str, search, newval ) {
	if ( !isString( str ) ) {
		throw new TypeError( 'invalid argument. First argument must be a string primitive. Value: `' + str + '`.' );
	}
	if ( isString( search ) ) {
		search = rescape( search );
		search = new RegExp( search, 'g' );
	}
	else if ( !isRegExp( search ) ) {
		throw new TypeError( 'invalid argument. Second argument must be a string primitive or regular expression. Value: `' + search + '`.' );
	}
	if ( !isString( newval ) && !isFunction( newval ) ) {
		throw new TypeError( 'invalid argument. Third argument must be a string primitive or replacement function. Value: `' + newval + '`.' );
	}
	return str.replace( search, newval );
}


// EXPORTS //

module.exports = replace;

},{"@stdlib/assert/is-function":18,"@stdlib/assert/is-regexp":42,"@stdlib/assert/is-string":45,"@stdlib/utils/escape-regexp-string":100}],89:[function(require,module,exports){
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
* Trim whitespace characters from the end of a string.
*
* @module @stdlib/string/right-trim
*
* @example
* var rtrim = require( '@stdlib/string/right-trim' );
*
* var out = rtrim( '   Whitespace   ' );
* // returns '   Whitespace'
*
* out = rtrim( '\t\t\tTabs\t\t\t' );
* // returns '\t\t\tTabs'
*
* out = rtrim( '\n\n\nNew Lines\n\n\n' );
* // returns '\n\n\nNew Lines'
*/

// MODULES //

var rtrim = require( './right_trim.js' );


// EXPORTS //

module.exports = rtrim;

},{"./right_trim.js":90}],90:[function(require,module,exports){
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
var replace = require( '@stdlib/string/replace' );


// VARIABLES //

// The following regular expression should suffice to polyfill (most?) all environments.
var RE = /[\u0020\f\n\r\t\v\u00a0\u1680\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\ufeff]+$/;


// MAIN //

/**
* Trims whitespace from the end of a string.
*
* @param {string} str - input string
* @throws {TypeError} must provide a string primitive
* @returns {string} trimmed string
*
* @example
* var out = rtrim( '   Whitespace   ' );
* // returns '   Whitespace'
*
* @example
* var out = rtrim( '\t\t\tTabs\t\t\t' );
* // returns '\t\t\tTabs'
*
* @example
* var out = rtrim( '\n\n\nNew Lines\n\n\n' );
* // returns '\n\n\nNew Lines'
*/
function rtrim( str ) {
	if ( !isString( str ) ) {
		throw new TypeError( 'invalid argument. Must provide a string primitive. Value: `' + str + '`.' );
	}
	return replace( str, RE, '' );
}


// EXPORTS //

module.exports = rtrim;

},{"@stdlib/assert/is-string":45,"@stdlib/string/replace":87}],91:[function(require,module,exports){
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

},{"./main.js":92}],92:[function(require,module,exports){
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

},{"@stdlib/assert/is-buffer":16,"@stdlib/regexp/function-name":80,"@stdlib/utils/native-class":114}],93:[function(require,module,exports){
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

},{"./main.js":94}],94:[function(require,module,exports){
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

},{"@stdlib/utils/define-property":98}],95:[function(require,module,exports){
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

},{}],96:[function(require,module,exports){
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

},{}],97:[function(require,module,exports){
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

},{"./define_property.js":96}],98:[function(require,module,exports){
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

},{"./builtin.js":95,"./has_define_property_support.js":97,"./polyfill.js":99}],99:[function(require,module,exports){
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

},{}],100:[function(require,module,exports){
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
* Escape a regular expression string or pattern.
*
* @module @stdlib/utils/escape-regexp-string
*
* @example
* var rescape = require( '@stdlib/utils/escape-regexp-string' );
*
* var str = rescape( '[A-Z]*' );
* // returns '\\[A\\-Z\\]\\*'
*/

// MODULES //

var rescape = require( './main.js' );


// EXPORTS //

module.exports = rescape;

},{"./main.js":101}],101:[function(require,module,exports){
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


// VARIABLES //

var RE_CHARS = /[-\/\\^$*+?.()|[\]{}]/g; // eslint-disable-line no-useless-escape


// MAIN //

/**
* Escapes a regular expression string.
*
* @param {string} str - regular expression string
* @throws {TypeError} first argument must be a string primitive
* @returns {string} escaped string
*
* @example
* var str = rescape( '[A-Z]*' );
* // returns '\\[A\\-Z\\]\\*'
*/
function rescape( str ) {
	var len;
	var s;
	var i;

	if ( !isString( str ) ) {
		throw new TypeError( 'invalid argument. Must provide a regular expression string. Value: `' + str + '`.' );
	}
	// Check if the string starts with a forward slash...
	if ( str[ 0 ] === '/' ) {
		// Find the last forward slash...
		len = str.length;
		for ( i = len-1; i >= 0; i-- ) {
			if ( str[ i ] === '/' ) {
				break;
			}
		}
	}
	// If we searched the string to no avail or if the first letter is not `/`, assume that the string is not of the form `/[...]/[guimy]`:
	if ( i === void 0 || i <= 0 ) {
		return str.replace( RE_CHARS, '\\$&' );
	}
	// We need to de-construct the string...
	s = str.substring( 1, i );

	// Only escape the characters between the `/`:
	s = s.replace( RE_CHARS, '\\$&' );

	// Reassemble:
	str = str[ 0 ] + s + str.substring( i );

	return str;
}


// EXPORTS //

module.exports = rescape;

},{"@stdlib/assert/is-string":45}],102:[function(require,module,exports){
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
var builtin = require( './native.js' );
var polyfill = require( './polyfill.js' );


// MAIN //

var getProto;
if ( isFunction( Object.getPrototypeOf ) ) {
	getProto = builtin;
} else {
	getProto = polyfill;
}


// EXPORTS //

module.exports = getProto;

},{"./native.js":105,"./polyfill.js":106,"@stdlib/assert/is-function":18}],103:[function(require,module,exports){
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

var getProto = require( './detect.js' );


// MAIN //

/**
* Returns the prototype of a provided object.
*
* @param {*} value - input value
* @returns {(Object|null)} prototype
*
* @example
* var proto = getPrototypeOf( {} );
* // returns {}
*/
function getPrototypeOf( value ) {
	if (
		value === null ||
		value === void 0
	) {
		return null;
	}
	// In order to ensure consistent ES5/ES6 behavior, cast input value to an object (strings, numbers, booleans); ES5 `Object.getPrototypeOf` throws when provided primitives and ES6 `Object.getPrototypeOf` casts:
	value = Object( value );

	return getProto( value );
}


// EXPORTS //

module.exports = getPrototypeOf;

},{"./detect.js":102}],104:[function(require,module,exports){
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
* Return the prototype of a provided object.
*
* @module @stdlib/utils/get-prototype-of
*
* @example
* var getPrototype = require( '@stdlib/utils/get-prototype-of' );
*
* var proto = getPrototype( {} );
* // returns {}
*/

// MODULES //

var getPrototype = require( './get_prototype_of.js' );


// EXPORTS //

module.exports = getPrototype;

},{"./get_prototype_of.js":103}],105:[function(require,module,exports){
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

var getProto = Object.getPrototypeOf;


// EXPORTS //

module.exports = getProto;

},{}],106:[function(require,module,exports){
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
var getProto = require( './proto.js' );


// MAIN //

/**
* Returns the prototype of a provided object.
*
* @private
* @param {Object} obj - input object
* @returns {(Object|null)} prototype
*/
function getPrototypeOf( obj ) {
	var proto = getProto( obj );
	if ( proto || proto === null ) {
		return proto;
	}
	if ( nativeClass( obj.constructor ) === '[object Function]' ) {
		// May break if the constructor has been tampered with...
		return obj.constructor.prototype;
	}
	if ( obj instanceof Object ) {
		return Object.prototype;
	}
	// Return `null` for objects created via `Object.create( null )`. Also return `null` for cross-realm objects on browsers that lack `__proto__` support, such as IE < 11.
	return null;
}


// EXPORTS //

module.exports = getPrototypeOf;

},{"./proto.js":107,"@stdlib/utils/native-class":114}],107:[function(require,module,exports){
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
* Returns the value of the `__proto__` property.
*
* @private
* @param {Object} obj - input object
* @returns {*} value of `__proto__` property
*/
function getProto( obj ) {
	// eslint-disable-next-line no-proto
	return obj.__proto__;
}


// EXPORTS //

module.exports = getProto;

},{}],108:[function(require,module,exports){
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

},{}],109:[function(require,module,exports){
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
},{}],110:[function(require,module,exports){
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

},{"./main.js":111}],111:[function(require,module,exports){
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

},{"./codegen.js":108,"./global.js":109,"./self.js":112,"./window.js":113,"@stdlib/assert/is-boolean":9}],112:[function(require,module,exports){
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

},{}],113:[function(require,module,exports){
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

},{}],114:[function(require,module,exports){
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

},{"./native_class.js":115,"./polyfill.js":116,"@stdlib/assert/has-tostringtag-support":5}],115:[function(require,module,exports){
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

},{"./tostring.js":117}],116:[function(require,module,exports){
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

},{"./tostring.js":117,"./tostringtag.js":118,"@stdlib/assert/has-own-property":1}],117:[function(require,module,exports){
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

},{}],118:[function(require,module,exports){
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

},{}],119:[function(require,module,exports){
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

},{"./fixtures/nodelist.js":120,"./fixtures/re.js":121,"./fixtures/typedarray.js":122}],120:[function(require,module,exports){
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

},{"@stdlib/utils/global":110}],121:[function(require,module,exports){
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

},{}],122:[function(require,module,exports){
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

},{}],123:[function(require,module,exports){
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

},{"./check.js":119,"./polyfill.js":124,"./typeof.js":125}],124:[function(require,module,exports){
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

},{"@stdlib/utils/constructor-name":91}],125:[function(require,module,exports){
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

},{"@stdlib/utils/constructor-name":91}],126:[function(require,module,exports){
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

},{}],127:[function(require,module,exports){

},{}],128:[function(require,module,exports){
arguments[4][127][0].apply(exports,arguments)
},{"dup":127}],129:[function(require,module,exports){
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

},{}],130:[function(require,module,exports){
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
},{"_process":221}],131:[function(require,module,exports){
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

},{"events":129,"inherits":216,"readable-stream/lib/_stream_duplex.js":133,"readable-stream/lib/_stream_passthrough.js":134,"readable-stream/lib/_stream_readable.js":135,"readable-stream/lib/_stream_transform.js":136,"readable-stream/lib/_stream_writable.js":137,"readable-stream/lib/internal/streams/end-of-stream.js":141,"readable-stream/lib/internal/streams/pipeline.js":143}],132:[function(require,module,exports){
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

},{}],133:[function(require,module,exports){
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
},{"./_stream_readable":135,"./_stream_writable":137,"_process":221,"inherits":216}],134:[function(require,module,exports){
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
},{"./_stream_transform":136,"inherits":216}],135:[function(require,module,exports){
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
},{"../errors":132,"./_stream_duplex":133,"./internal/streams/async_iterator":138,"./internal/streams/buffer_list":139,"./internal/streams/destroy":140,"./internal/streams/from":142,"./internal/streams/state":144,"./internal/streams/stream":145,"_process":221,"buffer":146,"events":129,"inherits":216,"string_decoder/":228,"util":127}],136:[function(require,module,exports){
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
},{"../errors":132,"./_stream_duplex":133,"inherits":216}],137:[function(require,module,exports){
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
},{"../errors":132,"./_stream_duplex":133,"./internal/streams/destroy":140,"./internal/streams/state":144,"./internal/streams/stream":145,"_process":221,"buffer":146,"inherits":216,"util-deprecate":237}],138:[function(require,module,exports){
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
},{"./end-of-stream":141,"_process":221}],139:[function(require,module,exports){
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
},{"buffer":146,"util":127}],140:[function(require,module,exports){
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
},{"_process":221}],141:[function(require,module,exports){
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
},{"../../../errors":132}],142:[function(require,module,exports){
module.exports = function () {
  throw new Error('Readable.from is not available in the browser')
};

},{}],143:[function(require,module,exports){
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
},{"../../../errors":132,"./end-of-stream":141}],144:[function(require,module,exports){
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
},{"../../../errors":132}],145:[function(require,module,exports){
module.exports = require('events').EventEmitter;

},{"events":129}],146:[function(require,module,exports){
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
},{"base64-js":126,"buffer":146,"ieee754":215}],147:[function(require,module,exports){
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

},{"./":148,"get-intrinsic":211}],148:[function(require,module,exports){
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

},{"function-bind":210,"get-intrinsic":211}],149:[function(require,module,exports){
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

},{"./lib/is_arguments.js":150,"./lib/keys.js":151}],150:[function(require,module,exports){
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

},{}],151:[function(require,module,exports){
exports = module.exports = typeof Object.keys === 'function'
  ? Object.keys : shim;

exports.shim = shim;
function shim (obj) {
  var keys = [];
  for (var key in obj) keys.push(key);
  return keys;
}

},{}],152:[function(require,module,exports){
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

},{"object-keys":219}],153:[function(require,module,exports){
module.exports = function () {
    for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] !== undefined) return arguments[i];
    }
};

},{}],154:[function(require,module,exports){
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

},{"./ToNumber":184,"./ToPrimitive":186,"./Type":191}],155:[function(require,module,exports){
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

},{"../helpers/isFinite":200,"../helpers/isNaN":201,"../helpers/isPrefixOf":202,"./ToNumber":184,"./ToPrimitive":186,"./Type":191,"get-intrinsic":211}],156:[function(require,module,exports){
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

},{"get-intrinsic":211}],157:[function(require,module,exports){
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

},{"./DayWithinYear":160,"./InLeapYear":164,"./MonthFromTime":174,"get-intrinsic":211}],158:[function(require,module,exports){
'use strict';

var floor = require('./floor');

var msPerDay = require('../helpers/timeConstants').msPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.2

module.exports = function Day(t) {
	return floor(t / msPerDay);
};

},{"../helpers/timeConstants":206,"./floor":195}],159:[function(require,module,exports){
'use strict';

var floor = require('./floor');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

module.exports = function DayFromYear(y) {
	return (365 * (y - 1970)) + floor((y - 1969) / 4) - floor((y - 1901) / 100) + floor((y - 1601) / 400);
};


},{"./floor":195}],160:[function(require,module,exports){
'use strict';

var Day = require('./Day');
var DayFromYear = require('./DayFromYear');
var YearFromTime = require('./YearFromTime');

// https://262.ecma-international.org/5.1/#sec-15.9.1.4

module.exports = function DayWithinYear(t) {
	return Day(t) - DayFromYear(YearFromTime(t));
};

},{"./Day":158,"./DayFromYear":159,"./YearFromTime":193}],161:[function(require,module,exports){
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

},{"./modulo":196}],162:[function(require,module,exports){
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

},{"../helpers/assertRecord":199,"./IsAccessorDescriptor":165,"./IsDataDescriptor":167,"./Type":191,"get-intrinsic":211}],163:[function(require,module,exports){
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

},{"../helpers/timeConstants":206,"./floor":195,"./modulo":196}],164:[function(require,module,exports){
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

},{"./DaysInYear":161,"./YearFromTime":193,"get-intrinsic":211}],165:[function(require,module,exports){
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

},{"../helpers/assertRecord":199,"./Type":191,"has":214}],166:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.11

module.exports = require('is-callable');

},{"is-callable":217}],167:[function(require,module,exports){
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

},{"../helpers/assertRecord":199,"./Type":191,"has":214}],168:[function(require,module,exports){
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

},{"../helpers/assertRecord":199,"./IsAccessorDescriptor":165,"./IsDataDescriptor":167,"./Type":191}],169:[function(require,module,exports){
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

},{"../helpers/isPropertyDescriptor":203,"./IsAccessorDescriptor":165,"./IsDataDescriptor":167,"./Type":191}],170:[function(require,module,exports){
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

},{"../helpers/isFinite":200,"../helpers/timeConstants":206}],171:[function(require,module,exports){
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

},{"../helpers/isFinite":200,"./DateFromTime":157,"./Day":158,"./MonthFromTime":174,"./ToInteger":183,"./YearFromTime":193,"./floor":195,"./modulo":196,"get-intrinsic":211}],172:[function(require,module,exports){
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

},{"../helpers/isFinite":200,"../helpers/timeConstants":206,"./ToInteger":183}],173:[function(require,module,exports){
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

},{"../helpers/timeConstants":206,"./floor":195,"./modulo":196}],174:[function(require,module,exports){
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

},{"./DayWithinYear":160,"./InLeapYear":164}],175:[function(require,module,exports){
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

},{"../helpers/isNaN":201}],176:[function(require,module,exports){
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

},{"../helpers/timeConstants":206,"./floor":195,"./modulo":196}],177:[function(require,module,exports){
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

},{"./Type":191}],178:[function(require,module,exports){
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


},{"../helpers/isFinite":200,"./ToNumber":184,"./abs":194,"get-intrinsic":211}],179:[function(require,module,exports){
'use strict';

var msPerDay = require('../helpers/timeConstants').msPerDay;

var DayFromYear = require('./DayFromYear');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

module.exports = function TimeFromYear(y) {
	return msPerDay * DayFromYear(y);
};

},{"../helpers/timeConstants":206,"./DayFromYear":159}],180:[function(require,module,exports){
'use strict';

var modulo = require('./modulo');

var msPerDay = require('../helpers/timeConstants').msPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.2

module.exports = function TimeWithinDay(t) {
	return modulo(t, msPerDay);
};


},{"../helpers/timeConstants":206,"./modulo":196}],181:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.2

module.exports = function ToBoolean(value) { return !!value; };

},{}],182:[function(require,module,exports){
'use strict';

var ToNumber = require('./ToNumber');

// http://262.ecma-international.org/5.1/#sec-9.5

module.exports = function ToInt32(x) {
	return ToNumber(x) >> 0;
};

},{"./ToNumber":184}],183:[function(require,module,exports){
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

},{"../helpers/isFinite":200,"../helpers/isNaN":201,"../helpers/sign":205,"./ToNumber":184,"./abs":194,"./floor":195}],184:[function(require,module,exports){
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

},{"./ToPrimitive":186}],185:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $Object = GetIntrinsic('%Object%');

var CheckObjectCoercible = require('./CheckObjectCoercible');

// http://262.ecma-international.org/5.1/#sec-9.9

module.exports = function ToObject(value) {
	CheckObjectCoercible(value);
	return $Object(value);
};

},{"./CheckObjectCoercible":156,"get-intrinsic":211}],186:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.1

module.exports = require('es-to-primitive/es5');

},{"es-to-primitive/es5":207}],187:[function(require,module,exports){
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

},{"./IsCallable":166,"./ToBoolean":181,"./Type":191,"get-intrinsic":211,"has":214}],188:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $String = GetIntrinsic('%String%');

// http://262.ecma-international.org/5.1/#sec-9.8

module.exports = function ToString(value) {
	return $String(value);
};


},{"get-intrinsic":211}],189:[function(require,module,exports){
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

},{"../helpers/isFinite":200,"../helpers/isNaN":201,"../helpers/sign":205,"./ToNumber":184,"./abs":194,"./floor":195,"./modulo":196}],190:[function(require,module,exports){
'use strict';

var ToNumber = require('./ToNumber');

// http://262.ecma-international.org/5.1/#sec-9.6

module.exports = function ToUint32(x) {
	return ToNumber(x) >>> 0;
};

},{"./ToNumber":184}],191:[function(require,module,exports){
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

},{}],192:[function(require,module,exports){
'use strict';

var Day = require('./Day');
var modulo = require('./modulo');

// https://262.ecma-international.org/5.1/#sec-15.9.1.6

module.exports = function WeekDay(t) {
	return modulo(Day(t) + 4, 7);
};

},{"./Day":158,"./modulo":196}],193:[function(require,module,exports){
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

},{"call-bind/callBound":147,"get-intrinsic":211}],194:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $abs = GetIntrinsic('%Math.abs%');

// http://262.ecma-international.org/5.1/#sec-5.2

module.exports = function abs(x) {
	return $abs(x);
};

},{"get-intrinsic":211}],195:[function(require,module,exports){
'use strict';

// var modulo = require('./modulo');
var $floor = Math.floor;

// http://262.ecma-international.org/5.1/#sec-5.2

module.exports = function floor(x) {
	// return x - modulo(x, 1);
	return $floor(x);
};

},{}],196:[function(require,module,exports){
'use strict';

var mod = require('../helpers/mod');

// https://262.ecma-international.org/5.1/#sec-5.2

module.exports = function modulo(x, y) {
	return mod(x, y);
};

},{"../helpers/mod":204}],197:[function(require,module,exports){
'use strict';

var modulo = require('./modulo');

var msPerSecond = require('../helpers/timeConstants').msPerSecond;

// https://262.ecma-international.org/5.1/#sec-15.9.1.10

module.exports = function msFromTime(t) {
	return modulo(t, msPerSecond);
};

},{"../helpers/timeConstants":206,"./modulo":196}],198:[function(require,module,exports){
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

},{"./5/AbstractEqualityComparison":154,"./5/AbstractRelationalComparison":155,"./5/CheckObjectCoercible":156,"./5/DateFromTime":157,"./5/Day":158,"./5/DayFromYear":159,"./5/DayWithinYear":160,"./5/DaysInYear":161,"./5/FromPropertyDescriptor":162,"./5/HourFromTime":163,"./5/InLeapYear":164,"./5/IsAccessorDescriptor":165,"./5/IsCallable":166,"./5/IsDataDescriptor":167,"./5/IsGenericDescriptor":168,"./5/IsPropertyDescriptor":169,"./5/MakeDate":170,"./5/MakeDay":171,"./5/MakeTime":172,"./5/MinFromTime":173,"./5/MonthFromTime":174,"./5/SameValue":175,"./5/SecFromTime":176,"./5/StrictEqualityComparison":177,"./5/TimeClip":178,"./5/TimeFromYear":179,"./5/TimeWithinDay":180,"./5/ToBoolean":181,"./5/ToInt32":182,"./5/ToInteger":183,"./5/ToNumber":184,"./5/ToObject":185,"./5/ToPrimitive":186,"./5/ToPropertyDescriptor":187,"./5/ToString":188,"./5/ToUint16":189,"./5/ToUint32":190,"./5/Type":191,"./5/WeekDay":192,"./5/YearFromTime":193,"./5/abs":194,"./5/floor":195,"./5/modulo":196,"./5/msFromTime":197}],199:[function(require,module,exports){
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

},{"get-intrinsic":211,"has":214}],200:[function(require,module,exports){
'use strict';

var $isNaN = Number.isNaN || function (a) { return a !== a; };

module.exports = Number.isFinite || function (x) { return typeof x === 'number' && !$isNaN(x) && x !== Infinity && x !== -Infinity; };

},{}],201:[function(require,module,exports){
'use strict';

module.exports = Number.isNaN || function isNaN(a) {
	return a !== a;
};

},{}],202:[function(require,module,exports){
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

},{"call-bind/callBound":147}],203:[function(require,module,exports){
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

},{"get-intrinsic":211,"has":214}],204:[function(require,module,exports){
'use strict';

var $floor = Math.floor;

module.exports = function mod(number, modulo) {
	var remain = number % modulo;
	return $floor(remain >= 0 ? remain : remain + modulo);
};

},{}],205:[function(require,module,exports){
'use strict';

module.exports = function sign(number) {
	return number >= 0 ? 1 : -1;
};

},{}],206:[function(require,module,exports){
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

},{}],207:[function(require,module,exports){
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

},{"./helpers/isPrimitive":208,"is-callable":217}],208:[function(require,module,exports){
'use strict';

module.exports = function isPrimitive(value) {
	return value === null || (typeof value !== 'function' && typeof value !== 'object');
};

},{}],209:[function(require,module,exports){
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

},{}],210:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

module.exports = Function.prototype.bind || implementation;

},{"./implementation":209}],211:[function(require,module,exports){
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

},{"function-bind":210,"has":214,"has-symbols":212}],212:[function(require,module,exports){
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

},{"./shams":213}],213:[function(require,module,exports){
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

},{}],214:[function(require,module,exports){
'use strict';

var bind = require('function-bind');

module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);

},{"function-bind":210}],215:[function(require,module,exports){
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

},{}],216:[function(require,module,exports){
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

},{}],217:[function(require,module,exports){
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

},{}],218:[function(require,module,exports){
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

},{"./isArguments":220}],219:[function(require,module,exports){
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

},{"./implementation":218,"./isArguments":220}],220:[function(require,module,exports){
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

},{}],221:[function(require,module,exports){
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

},{}],222:[function(require,module,exports){
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
},{"_process":221,"through":235,"timers":236}],223:[function(require,module,exports){
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

},{"buffer":146}],224:[function(require,module,exports){
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

},{"es-abstract/es5":198,"function-bind":210}],225:[function(require,module,exports){
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

},{"./implementation":224,"./polyfill":226,"./shim":227,"define-properties":152,"function-bind":210}],226:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

var zeroWidthSpace = '\u200b';

module.exports = function getPolyfill() {
	if (String.prototype.trim && zeroWidthSpace.trim() === zeroWidthSpace) {
		return String.prototype.trim;
	}
	return implementation;
};

},{"./implementation":224}],227:[function(require,module,exports){
'use strict';

var define = require('define-properties');
var getPolyfill = require('./polyfill');

module.exports = function shimStringTrim() {
	var polyfill = getPolyfill();
	define(String.prototype, { trim: polyfill }, { trim: function () { return String.prototype.trim !== polyfill; } });
	return polyfill;
};

},{"./polyfill":226,"define-properties":152}],228:[function(require,module,exports){
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
},{"safe-buffer":223}],229:[function(require,module,exports){
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
},{"./lib/default_stream":230,"./lib/results":232,"./lib/test":233,"_process":221,"defined":153,"through":235,"timers":236}],230:[function(require,module,exports){
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
},{"_process":221,"fs":128,"through":235}],231:[function(require,module,exports){
(function (process,setImmediate){(function (){
module.exports = typeof setImmediate !== 'undefined'
    ? setImmediate
    : process.nextTick
;

}).call(this)}).call(this,require('_process'),require("timers").setImmediate)
},{"_process":221,"timers":236}],232:[function(require,module,exports){
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
},{"_process":221,"events":129,"function-bind":210,"has":214,"inherits":216,"object-inspect":234,"resumer":222,"through":235,"timers":236}],233:[function(require,module,exports){
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
},{"./next_tick":231,"deep-equal":149,"defined":153,"events":129,"has":214,"inherits":216,"path":130,"string.prototype.trim":225}],234:[function(require,module,exports){
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

},{}],235:[function(require,module,exports){
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
},{"_process":221,"stream":131}],236:[function(require,module,exports){
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
},{"process/browser.js":221,"timers":236}],237:[function(require,module,exports){
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
},{}]},{},[77,78,79]);
