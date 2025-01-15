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

var main = require( './main.js' );


// EXPORTS //

module.exports = main;

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

var main = require( './main.js' );


// EXPORTS //

module.exports = main;

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

var main = require( './main.js' );


// EXPORTS //

module.exports = main;

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

var main = require( './main.js' );


// EXPORTS //

module.exports = main;

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

},{"@stdlib/utils/native-class":91}],9:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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
* var Boolean = require( '@stdlib/boolean/ctor' );
* var isBoolean = require( '@stdlib/assert/is-boolean' );
*
* var bool = isBoolean( false );
* // returns true
*
* bool = isBoolean( new Boolean( false ) );
* // returns true
*
* @example
* var Boolean = require( '@stdlib/boolean/ctor' );
* var isBoolean = require( '@stdlib/assert/is-boolean' ).isPrimitive;
*
* var bool = isBoolean( false );
* // returns true
*
* bool = isBoolean( new Boolean( true ) );
* // returns false
*
* @example
* var Boolean = require( '@stdlib/boolean/ctor' );
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
var main = require( './main.js' );
var isPrimitive = require( './primitive.js' );
var isObject = require( './object.js' );


// MAIN //

setReadOnly( main, 'isPrimitive', isPrimitive );
setReadOnly( main, 'isObject', isObject );


// EXPORTS //

module.exports = main;

},{"./main.js":10,"./object.js":11,"./primitive.js":12,"@stdlib/utils/define-nonenumerable-read-only-property":73}],10:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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
* var Boolean = require( '@stdlib/boolean/ctor' );
*
* var bool = isBoolean( new Boolean( false ) );
* // returns true
*
* @example
* var Boolean = require( '@stdlib/boolean/ctor' );
*
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
var Boolean = require( '@stdlib/boolean/ctor' );
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
* var Boolean = require( '@stdlib/boolean/ctor' );
*
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

},{"./try2serialize.js":14,"@stdlib/assert/has-tostringtag-support":5,"@stdlib/boolean/ctor":25,"@stdlib/utils/native-class":91}],12:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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
* var Boolean = require( '@stdlib/boolean/ctor' );
*
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

var main = require( './main.js' );


// EXPORTS //

module.exports = main;

},{"./main.js":16}],16:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"@stdlib/assert/is-object-like":21}],17:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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
* Test if a value is an `Error` object.
*
* @module @stdlib/assert/is-error
*
* @example
* var isError = require( '@stdlib/assert/is-error' );
*
* var bool = isError( new Error( 'beep' ) );
* // returns true
*
* bool = isError( {} );
* // returns false
*/

// MODULES //

var main = require( './main.js' );


// EXPORTS //

module.exports = main;

},{"./main.js":18}],18:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

var getPrototypeOf = require( '@stdlib/utils/get-prototype-of' );
var nativeClass = require( '@stdlib/utils/native-class' );


// MAIN //

/**
* Tests if a value is an `Error` object.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating whether a value is an `Error` object
*
* @example
* var bool = isError( new Error( 'beep' ) );
* // returns true
*
* @example
* var bool = isError( {} );
* // returns false
*/
function isError( value ) {
	if ( typeof value !== 'object' || value === null ) {
		return false;
	}
	// Check for `Error` objects from the same realm (same Node.js `vm` or same `Window` object)...
	if ( value instanceof Error ) {
		return true;
	}
	// Walk the prototype tree until we find an object having the desired native class...
	while ( value ) {
		if ( nativeClass( value ) === '[object Error]' ) {
			return true;
		}
		value = getPrototypeOf( value );
	}
	return false;
}


// EXPORTS //

module.exports = isError;

},{"@stdlib/utils/get-prototype-of":81,"@stdlib/utils/native-class":91}],19:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

var main = require( './main.js' );


// EXPORTS //

module.exports = main;

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

},{"@stdlib/utils/type-of":102}],21:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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
var main = require( './main.js' );


// VARIABLES //

var isObjectLikeArray = arrayfun( main );


// MAIN //

setReadOnly( main, 'isObjectLikeArray', isObjectLikeArray );


// EXPORTS //

module.exports = main;

},{"./main.js":22,"@stdlib/assert/tools/array-function":23,"@stdlib/utils/define-nonenumerable-read-only-property":73}],22:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],23:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

var main = require( './main.js' );


// EXPORTS //

module.exports = main;

},{"./main.js":24}],24:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"@stdlib/assert/is-array":7,"@stdlib/string/format":64}],25:[function(require,module,exports){
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
* Boolean constructor.
*
* @module @stdlib/boolean/ctor
*
* @example
* var Boolean = require( '@stdlib/boolean/ctor' );
*
* var b = Boolean( null );
* // returns false
*
* b = Boolean( [] );
* // returns true
*
* b = Boolean( {} );
* // returns true
*
* @example
* var Boolean = require( '@stdlib/boolean/ctor' );
*
* var b = new Boolean( false );
* // returns <Boolean>
*/

// MODULES //

var main = require( './main.js' );


// EXPORTS //

module.exports = main;

},{"./main.js":26}],26:[function(require,module,exports){
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

// MAIN //

/**
* Returns a boolean.
*
* @name Boolean
* @constructor
* @type {Function}
* @param {*} value - input value
* @returns {(boolean|Boolean)} boolean
*
* @example
* var b = Boolean( null );
* // returns false
*
* b = Boolean( [] );
* // returns true
*
* b = Boolean( {} );
* // returns true
*
* @example
* var b = new Boolean( false );
* // returns <Boolean>
*/
var Bool = Boolean; // eslint-disable-line stdlib/require-globals


// EXPORTS //

module.exports = Bool;

},{}],27:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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
* Difference between one and the smallest value greater than one that can be represented as a double-precision floating-point number.
*
* @module @stdlib/constants/float64/eps
* @type {number}
*
* @example
* var FLOAT64_EPSILON = require( '@stdlib/constants/float64/eps' );
* // returns 2.220446049250313e-16
*/


// MAIN //

/**
* Difference between one and the smallest value greater than one that can be represented as a double-precision floating-point number.
*
* ## Notes
*
* The difference is
*
* ```tex
* \frac{1}{2^{52}}
* ```
*
* @constant
* @type {number}
* @default 2.220446049250313e-16
* @see [IEEE 754]{@link https://en.wikipedia.org/wiki/IEEE_754-1985}
* @see [Machine Epsilon]{@link https://en.wikipedia.org/wiki/Machine_epsilon}
*/
var FLOAT64_EPSILON = 2.2204460492503130808472633361816E-16;


// EXPORTS //

module.exports = FLOAT64_EPSILON;

},{}],28:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"@stdlib/number/ctor":37}],29:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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
* The mathematical constant `π`.
*
* @module @stdlib/constants/float64/pi
* @type {number}
*
* @example
* var PI = require( '@stdlib/constants/float64/pi' );
* // returns 3.141592653589793
*/


// MAIN //

/**
* The mathematical constant `π`.
*
* @constant
* @type {number}
* @default 3.141592653589793
* @see [Wikipedia]{@link https://en.wikipedia.org/wiki/Pi}
*/
var PI = 3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679; // eslint-disable-line max-len


// EXPORTS //

module.exports = PI;

},{}],30:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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
* Test if a double-precision floating-point numeric value is `NaN`.
*
* @module @stdlib/math/base/assert/is-nan
*
* @example
* var isnan = require( '@stdlib/math/base/assert/is-nan' );
*
* var bool = isnan( NaN );
* // returns true
*
* bool = isnan( 7.0 );
* // returns false
*/

// MODULES //

var main = require( './main.js' );


// EXPORTS //

module.exports = main;

},{"./main.js":32}],32:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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
* Tests if a double-precision floating-point numeric value is `NaN`.
*
* @param {number} x - value to test
* @returns {boolean} boolean indicating whether the value is `NaN`
*
* @example
* var bool = isnan( NaN );
* // returns true
*
* @example
* var bool = isnan( 7.0 );
* // returns false
*/
function isnan( x ) {
	return ( x !== x );
}


// EXPORTS //

module.exports = isnan;

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

/**
* Compute an absolute value of a double-precision floating-point number.
*
* @module @stdlib/math/base/special/abs
*
* @example
* var abs = require( '@stdlib/math/base/special/abs' );
*
* var v = abs( -1.0 );
* // returns 1.0
*
* v = abs( 2.0 );
* // returns 2.0
*
* v = abs( 0.0 );
* // returns 0.0
*
* v = abs( -0.0 );
* // returns 0.0
*
* v = abs( NaN );
* // returns NaN
*/

// MODULES //

var main = require( './main.js' );


// EXPORTS //

module.exports = main;

},{"./main.js":34}],34:[function(require,module,exports){
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
* Computes the absolute value of a double-precision floating-point number `x`.
*
* @param {number} x - input value
* @returns {number} absolute value
*
* @example
* var v = abs( -1.0 );
* // returns 1.0
*
* @example
* var v = abs( 2.0 );
* // returns 2.0
*
* @example
* var v = abs( 0.0 );
* // returns 0.0
*
* @example
* var v = abs( -0.0 );
* // returns 0.0
*
* @example
* var v = abs( NaN );
* // returns NaN
*/
function abs( x ) {
	return Math.abs( x ); // eslint-disable-line stdlib/no-builtin-math
}


// EXPORTS //

module.exports = abs;

},{}],35:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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
* Compute the principal square root of a double-precision floating-point number.
*
* @module @stdlib/math/base/special/sqrt
*
* @example
* var sqrt = require( '@stdlib/math/base/special/sqrt' );
*
* var v = sqrt( 4.0 );
* // returns 2.0
*
* v = sqrt( 9.0 );
* // returns 3.0
*
* v = sqrt( 0.0 );
* // returns 0.0
*
* v = sqrt( -4.0 );
* // returns NaN
*
* v = sqrt( NaN );
* // returns NaN
*/

// MODULES //

var main = require( './main.js' );


// EXPORTS //

module.exports = main;

},{"./main.js":36}],36:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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
* Compute the principal square root of a double-precision floating-point number.
*
* @type {Function}
* @param {number} x - input value
* @returns {number} principal square root
*
* @example
* var v = sqrt( 4.0 );
* // returns 2.0
*
* v = sqrt( 9.0 );
* // returns 3.0
*
* v = sqrt( 0.0 );
* // returns 0.0
*
* v = sqrt( -4.0 );
* // returns NaN
*
* v = sqrt( NaN );
* // returns NaN
*/
var sqrt = Math.sqrt; // eslint-disable-line stdlib/no-builtin-math


// EXPORTS //

module.exports = sqrt;

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

var main = require( './main.js' );


// EXPORTS //

module.exports = main;

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

// EXPORTS //

module.exports = Number; // eslint-disable-line stdlib/require-globals

},{}],39:[function(require,module,exports){
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
* Object constructor.
*
* @module @stdlib/object/ctor
*
* @example
* var Object = require( '@stdlib/object/ctor' );
*
* var o = new Object( null );
* // returns {}
*
* o = new Object( 5.0 );
* // returns <Number>
*
* o = new Object( 'beep' );
* // returns <String>
*
* var o1 = {};
*
* var o2 = new Object( o1 );
* // returns {}
*
* var bool = ( o1 === o2 );
* // returns true
*/

// MODULES //

var main = require( './main.js' );


// EXPORTS //

module.exports = main;

},{"./main.js":40}],40:[function(require,module,exports){
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

// MAIN //

/**
* Returns an object.
*
* @name Object
* @constructor
* @type {Function}
* @param {*} value - input value
* @returns {Object} object
*
* @example
* var o = new Object( null );
* // returns {}
*
* @example
* var o = new Object( 5.0 );
* // returns <Number>
*
* @example
* var o = new Object( 'beep' );
* // returns <String>
*
* @example
* var o1 = {};
*
* var o2 = new Object( o1 );
* // returns {}
*
* var bool = ( o1 === o2 );
* // returns true
*/
var Obj = Object; // eslint-disable-line stdlib/require-globals


// EXPORTS //

module.exports = Obj;

},{}],41:[function(require,module,exports){
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
var main = require( './main.js' );
var REGEXP = require( './regexp.js' );


// MAIN //

setReadOnly( main, 'REGEXP', REGEXP );


// EXPORTS //

module.exports = main;

},{"./main.js":42,"./regexp.js":43,"@stdlib/utils/define-nonenumerable-read-only-property":73}],42:[function(require,module,exports){
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

},{}],43:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./main.js":42}],44:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

var constantFunction = require( '@stdlib/utils/constant-function' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var sqrt = require( '@stdlib/math/base/special/sqrt' );
var PI = require( '@stdlib/constants/float64/pi' );


// MAIN //

/**
* Returns a function for evaluating the probability density function (PDF) for an arcsine distribution with minimum support `a` and maximum support `b`.
*
* @param {number} a - minimum support
* @param {number} b - maximum support
* @returns {Function} PDF
*
* @example
* var pdf = factory( 0.0, 10.0 );
* var y = pdf( 2.0 );
* // returns ~0.08
*
* y = pdf( 12.0 );
* // returns 0.0
*/
function factory( a, b ) {
	if (
		isnan( a ) ||
		isnan( b ) ||
		a >= b
	) {
		return constantFunction( NaN );
	}
	return pdf;

	/**
	* Evaluates the probability density function (PDF) for an arcsine distribution.
	*
	* @private
	* @param {number} x - input value
	* @returns {number} evaluated PDF
	*
	* @example
	* var y = pdf( 2.0 );
	* // returns <number>
	*/
	function pdf( x ) {
		if ( isnan( x ) ) {
			return NaN;
		}
		if ( x < a || x > b ) {
			return 0.0;
		}
		return 1.0 / ( PI * sqrt( ( x-a ) * ( b-x ) ) );
	}
}


// EXPORTS //

module.exports = factory;

},{"@stdlib/constants/float64/pi":29,"@stdlib/math/base/assert/is-nan":31,"@stdlib/math/base/special/sqrt":35,"@stdlib/utils/constant-function":69}],45:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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
* Arcsine distribution probability density function (PDF).
*
* @module @stdlib/stats/base/dists/arcsine/pdf
*
* @example
* var pdf = require( '@stdlib/stats/base/dists/arcsine/pdf' );
*
* var y = pdf( 3.0, 2.0, 6.0 );
* // returns ~0.184
*
* var myPDF = pdf.factory( 6.0, 7.0 );
* y = myPDF( 7.0 );
* // returns Infinity
*
* y = myPDF( 5.0 );
* // returns 0.0
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-nonenumerable-read-only-property' );
var main = require( './main.js' );
var factory = require( './factory.js' );


// MAIN //

setReadOnly( main, 'factory', factory );


// EXPORTS //

module.exports = main;

},{"./factory.js":44,"./main.js":46,"@stdlib/utils/define-nonenumerable-read-only-property":73}],46:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

var isnan = require( '@stdlib/math/base/assert/is-nan' );
var sqrt = require( '@stdlib/math/base/special/sqrt' );
var PI = require( '@stdlib/constants/float64/pi' );


// MAIN //

/**
* Evaluates the probability density function (PDF) for an arcsine distribution with minimum support `a` and maximum support `b` at a value `x`.
*
* @param {number} x - input value
* @param {number} a - minimum support
* @param {number} b - maximum support
* @returns {number} evaluated PDF
*
* @example
* var y = pdf( 2.0, 0.0, 4.0 );
* // returns ~0.159
*
* @example
* var y = pdf( 5.0, 0.0, 4.0 );
* // returns 0.0
*
* @example
* var y = pdf( 0.25, 0.0, 1.0 );
* // returns ~0.735
*
* @example
* var y = pdf( NaN, 0.0, 1.0 );
* // returns NaN
*
* @example
* var y = pdf( 0.0, NaN, 1.0 );
* // returns NaN
*
* @example
* var y = pdf( 0.0, 0.0, NaN );
* // returns NaN
*
* @example
* var y = pdf( 2.0, 3.0, 1.0 );
* // returns NaN
*/
function pdf( x, a, b ) {
	if (
		isnan( x ) ||
		isnan( a ) ||
		isnan( b ) ||
		a >= b
	) {
		return NaN;
	}
	if ( x < a || x > b ) {
		return 0.0;
	}
	return 1.0 / ( PI * sqrt( ( x-a ) * ( b-x ) ) );
}


// EXPORTS //

module.exports = pdf;

},{"@stdlib/constants/float64/pi":29,"@stdlib/math/base/assert/is-nan":31,"@stdlib/math/base/special/sqrt":35}],47:[function(require,module,exports){
module.exports={"expected":[0.009271885430973698,0.0,0.0,0.0,0.0,0.0,0.012349488959301443,0.014241853794818753,0.0,0.0,0.0,0.03278797059429836,0.05150826939846876,0.0,0.0,0.008372287249810548,0.01728200465307382,0.0,0.01014943418237686,0.0,0.010916882089962124,0.03197053122735218,0.05431105579861526,0.0,0.04295090427018153,0.02088526470095928,0.016797988445511978,0.0,0.0,0.016334173562186062,0.016086719386561494,0.017659047532659605,0.029515633463730057,0.0,0.0,0.0,0.014160488678046913,0.0,0.0,0.0,0.015015723871645292,0.0,0.0,0.0,0.0,0.03334734165023078,0.0,0.0,0.0,0.0,0.015285900326188016,0.0,0.015352195676031782,0.0,0.0,0.0,0.0,0.026575277809495878,0.0,0.00826169704715604,0.021212200162188187,0.0,0.0,0.0,0.016972208656028578,0.012130022684915856,0.01072937270054918,0.011877546383601046,0.021386592882222187,0.0,0.0,0.013623169738316102,0.0,0.03639680097936549,0.02165603553655552,0.01957599342399088,0.0,0.0,0.0,0.0,0.10225300136565747,0.0,0.0,0.0,0.010315434586316844,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.010197077048659667,0.0,0.0,0.0,0.03680694890980557,0.010157003659391756,0.0,0.0,0.0,0.0,0.017918064899941404,0.0,0.0,0.0,0.0,0.0,0.010087941291653708,0.0,0.01517121425044096,0.03216730498964078,0.0,0.0,0.0,0.0,0.0,0.0103518039732216,0.0,0.0,0.10804166346801981,0.03655604135328235,0.0,0.016457533222825678,0.00912534926258394,0.0,0.0,0.00813107629918474,0.0,0.0,0.0,0.0,0.017320843128782647,0.0,0.0,0.019498366919857336,0.0,0.0,0.0,0.013105115204823407,0.0,0.0,0.0,0.016819954957095564,0.017233801162383558,0.0,0.0,0.0,0.0,0.0,0.0,0.0374176959981529,0.0,0.0,0.011675173414587244,0.0,0.010059861821110877,0.0,0.0,0.0,0.0,0.019357951350132536,0.0,0.0,0.0,0.014800522361175574,0.0,0.03740027231993322,0.01189481190003259,0.026009604453335,0.0,0.06679183117447082,0.0,0.02653356575061165,0.0176704966203617,0.013044492587511896,0.00882084056289193,0.0,0.0,0.015328632813444184,0.0,0.0,0.01752800652581923,0.0,0.0,0.019275781526531865,0.03175254422526631,0.0,0.0,0.0,0.015798059103705537,0.01756626917119731,0.010618948652382084,0.0,0.0,0.011821600226843258,0.013890930597736663,0.0,0.0,0.0,0.02751649679808355,0.027915481306281603,0.01577069104075744,0.0,0.018214899153347706,0.0,0.0,0.0,0.010520536343328817,0.0,0.0,0.0,0.029335400734610464,0.0,0.0,0.0,0.0,0.013774033837822155,0.0,0.0,0.0,0.0,0.0,0.01719960470756031,0.0,0.0,0.009163066327666742,0.016752995533128357,0.0,0.0,0.054387065173751234,0.009910686775934366,0.0,0.01271542899916956,0.0,0.030480483330304536,0.0,0.0,0.0,0.0,0.0,0.0175367950117354,0.010474149646888505,0.0,0.0493861263680458,0.0,0.024638122249481045,0.010405298924418513,0.0,0.0,0.0,0.0,0.0,0.0,0.008156531350603501,0.0,0.026134296266565635,0.0,0.02762539858862617,0.0,0.0,0.0,0.010268197306393258,0.0,0.014125078203514758,0.06317930067360339,0.0,0.0,0.10257424192808247,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.014299084759036396,0.017313593132764774,0.010297637919786516,0.0,0.023115903215391108,0.015544904635175874,0.010051967718371677,0.0,0.0,0.00999064177217715,0.013004940734101396,0.017581417557804815,0.0,0.0,0.0,0.0,0.0,0.026763022480251867,0.0,0.013776302342668302,0.0,0.03489873904081379,0.0,0.00933461875036334,0.0,0.0,0.010295090044410104,0.0,0.0,0.02030429494941907,0.012948548072253385,0.0,0.0,0.010274445392543663,0.0,0.28005901034215785,0.010036285520076507,0.020941440179995427,0.03617345308871119,0.03340056173477995,0.0,0.00981452844409032,0.011293750367408296,0.0,0.08304532222264757,0.0,0.0,0.0,0.014348669405482331,0.015627422817635444,0.0,0.0,0.0,0.008482373456214066,0.02592037436542212,0.0,0.01667669034875408,0.0,0.010028047509835587,0.0,0.0,0.0,0.0,0.0,0.0,0.026488706698670064,0.0,0.046726816763994615,0.01381289178547982,0.0,0.0,0.0,0.0,0.01112895585363137,0.0,0.0,0.008260557165260623,0.012746288956408672,0.0,0.0,0.0,0.0,0.0,0.02307159635198028,0.02726264604507927,0.0,0.01454515079506285,0.0,0.0,0.0,0.05226080114365903,0.027982938059724276,0.0350987152378155,0.0,0.0,0.0,0.0,0.01486709041720586,0.0,0.009718673403713575,0.0,0.0,0.0,0.019524238917529253,0.0,0.0,0.03619238604590983,0.03344629697400004,0.0,0.0,0.0,0.0,0.0,0.014899526202136287,0.01462972800938986,0.013382472503676832,0.0,0.0,0.0,0.0,0.009437084592694002,0.0,0.0,0.0,0.0,0.0,0.011344278167688591,0.014016270376100329,0.022464338411036656,0.0,0.023821544686387003,0.0,0.0,0.04049978620151321,0.009003443817766311,0.011626681373378123,0.0,0.0,0.017553734257994686,0.1937664684466699,0.0,0.013427203242638519,0.0,0.023408753708867025,0.009543343115468311,0.02473261978220743,0.009945513864369083,0.0,0.011618395738029088,0.0,0.0,0.0,0.0,0.016147649364455233,0.0317215357280864,0.0,0.01650698549076749,0.021176675252412794,0.0,0.0,0.0323618533883275,0.0,0.0,0.019270424438163302,0.014071467385706313,0.0,0.017076164411820333,0.0,0.0,0.0,0.0,0.016635449332195764,0.0,0.012894640345327703,0.010907500298171573,0.0,0.0,0.0,0.017431568665156244,0.0,0.011915292471283707,0.013538092217542657,0.0,0.01201560288218703,0.01320141755726418,0.026940624741841213,0.011726119716860876,0.0,0.011238479576425073,0.0,0.0,0.021994137887270237,0.009272892027655648,0.0,0.0757814727201911,0.0,0.0,0.0,0.0,0.0,0.027005469917215343,0.024183231960192918,0.0,0.0,0.03531877920448827,0.0,0.02112971894006756,0.0,0.0,0.010306294279691021,0.010336604550304277,0.0,0.009587559343336662,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.01908719326224983,0.044515427746581335,0.0,0.0,0.0,0.01580019005292813,0.013386176242867207,0.0,0.0,0.02548795234990003,0.0,0.05220386058506186,0.0,0.0,0.01313601140875346,0.011414881665259825,0.024141518592063208,0.0,0.0,0.013907435973410194,0.0,0.03329179355048417,0.012385466579209437,0.0,0.0,0.0,0.0,0.009507936430868153,0.009354501373980076,0.010255057026934961,0.024031136927494774,0.0,0.01962061746893253,0.015645799011510628,0.0,0.0,0.008870085684601193,0.0,0.03574249006504825,0.017174839612274288,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.04054181649726698,0.0,0.0,0.01302437816642124,0.013367083858974728,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.04266193510140758,0.00965883373470414,0.0,0.013366425807671093,0.03368681541857157,0.0167640809819572,0.015219547135927351,0.0,0.02940145132708349,0.0,0.0,0.018285755717359204,0.0,0.0,0.0,0.0,0.0,0.0,0.016908162067264216,0.02812010914412695,0.0,0.017883204290015272,0.0246412009257744,0.0,0.0,0.035277955914586295,0.0,0.0,0.009538149779149081,0.0,0.020038408763748135,0.0,0.0,0.011719795584927114,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.02945925227972355,0.0,0.01650354845764376,0.0,0.024854248529786117,0.01016871092738752,0.0,0.0,0.0,0.0,0.0,0.030875874975662493,0.0,0.010120557089020652,0.011713665223426517,0.010989562942887337,0.01725022588307457,0.0,0.0,0.014664669541783418,0.0,0.0,0.0,0.01390355633773529,0.09433616869715257,0.0,0.0,0.0,0.034463645928233734,0.0,0.010393749513630203,0.0,0.1942496575832598,0.010013931173460968,0.0,0.0,0.050976106623565,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.021095817682243462,0.0,0.02753270578241303,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.01399779397189654,0.0,0.0,0.0,0.0,0.016306833644781617,0.02309786687099866,0.0,0.0,0.0,0.0,0.0,0.014320775731862403,0.16616593332083132,0.0,0.012819005623302604,0.0,0.016770242426336186,0.012165458145718289,0.0,0.0,0.0,0.010422891786218604,0.025322445548786186,0.013091891715803636,0.017782812565848616,0.0,0.0,0.0,0.04538339587316545,0.0,0.0,0.0,0.0,0.011631100105097963,0.01494263303044634,0.0,0.010045836886404667,0.025962175766004496,0.02294243103195562,0.0,0.0,0.0,0.017502807085139464,0.0,0.06784039470587712,0.026778919317893737,0.0,0.01176884065260234,0.0,0.0,0.0,0.015857205974665677,0.023300581510886265,0.0,0.040379262823794775,0.0,0.047229786291514704,0.0,0.0,0.0,0.0,0.0,0.06275865922475796,0.0,0.0,0.022475369332327532,0.0,0.0,0.0,0.0,0.0,0.0,0.013653392645713804,0.0,0.0,0.0,0.0,0.03970986283771649,0.0,0.0,0.01093817160074631,0.0,0.0,0.0,0.02798025135803117,0.019825299538598837,0.0,0.036574251148247354,0.015243739256864336,0.015443413421891268,0.0,0.0,0.012540457528578568,0.0,0.0,0.0,0.0,0.009765934847511879,0.0,0.0,0.016668830622694975,0.0,0.0,0.0,0.11981635934860799,0.0,0.0,0.013197555924723712,0.017178147139466318,0.013908961780706327,0.0,0.010989805875661037,0.012045558574389839,0.0,0.0,0.01789226389305886,0.0,0.01570659842841267,0.0,0.0158647480971158,0.035749991067298384,0.0,0.0,0.03071472357441696,0.021728198145269547,0.0,0.01754548640189582,0.0,0.02270723437156464,0.0,0.0,0.0,0.0,0.02121328808063513,0.0,0.0,0.019314176590758982,0.0,0.0,0.07888207955301452,0.0,0.0,0.02751120222362556,0.0,0.0,0.0,0.0,0.06440744428030948,0.012746968509868182,0.0,0.02187805054151106,0.0,0.0,0.0081468579962966,0.0,0.01035724074172801,0.0,0.014956483174332708,0.008361509700742798,0.0,0.0,0.011965217819352586,0.009851598949722751,0.0,0.0,0.0,0.009369776815263142,0.0,0.02285179692882751,0.0,0.0,0.0,0.0,0.027234594763836533,0.0,0.014808749039292274,0.0,0.016285104153791786,0.0,0.012540357832703597,0.020271607755228436,0.0,0.0,0.028293562357274663,0.0,0.0,0.012368690883924272,0.02765164551331984,0.026567887753579433,0.0,0.011933423466001111,0.015077188363201894,0.0,0.012606622534241295,0.0,0.0,0.0121303151753404,0.0,0.0,0.0,0.0,0.011806229368887826,0.0,0.0,0.1142877678365588,0.01266642847611129,0.02064109583975114,0.02069435778161987,0.0,0.0,0.009977692489279794,0.0,0.0,0.010049443172985976,0.0,0.09151273201347764,0.04341612203797969,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.03295207118941873,0.01829337018734688,0.0,0.009317766101075096,0.0,0.0,0.012954094727493983,0.0,0.0,0.0,0.0,0.0,0.0,0.018307852458642023,0.0,0.0,0.04388667820909565,0.0,0.0,0.0,0.009462183170497011,0.0,0.01979983286143797,0.0,0.0,0.0,0.0,0.025414487965857883,0.0,0.0,0.013840681889473185,0.03801268515387682,0.0,0.008206646879831548,0.008807176708003264,0.0,0.0,0.022143095943965765,0.013315053086567816,0.0,0.012959829888501364,0.0,0.0,0.0,0.0129194293909443,0.0,0.030819434872275977,0.0,0.0,0.0,0.01489669305555403,0.015210283454296727,0.0,0.014778700994534216,0.0,0.023998857233566744,0.0,0.0,0.01736010040596679,0.0,0.011972241822465106,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.017063255643364476,0.0,0.0,0.009725570515789525,0.0,0.0,0.0,0.0,0.016901222064945428,0.0,0.0,0.0,0.0608687932624315,0.0,0.027168103063909457,0.011945312207358135,0.020418914750452575,0.012641934718119481,0.01836487370995984,0.014838520723795486,0.010714915854857414,0.016239139016702812,0.0,0.0,0.0,0.0,0.029302943909800965,0.014208624614274289,0.0,0.0,0.0,0.0,0.016549830641174875,0.0,0.0,0.0,0.012405667669956245,0.0,0.011173242167496676,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0],"x":[42.004488318761666,62.79855219458419,58.50880685837409,4.632775255572907,92.47600865244819,77.84040558758181,46.81992510403396,21.902322368759307,3.7935907263980218,69.61425724051871,33.33057769927819,35.80711711469604,39.53972373693115,50.755178755901696,64.2995917505024,48.062211678923525,57.64301304237775,0.3499736046039814,49.44333399270611,83.44665775809143,34.56469610774722,10.262048018364545,12.183835657595576,36.98607501307498,20.635741227079542,23.446371992240046,30.911636548592213,88.75230256805575,88.19586295146075,22.5022018242073,21.631652843477077,45.66367590986593,36.982713689957606,21.205037115380065,77.96989439367228,10.81202340445515,23.14408267134036,82.05847988733271,34.66276812412292,70.47093102355753,30.43988321861777,93.14922725157382,49.76256377708519,54.70656978395245,2.6727374350564714,20.011882506265067,85.76270231480059,93.27476387305771,69.8370366680301,99.90375011329175,66.98504816098345,98.49031883295676,38.46968066932162,72.54453951521084,81.79059475799575,56.111167775041146,28.36787083640018,42.3475927236898,71.58822628501954,50.77957895918681,30.88013662605855,49.39478368540846,56.61459271201197,86.41360865637353,53.33025217526597,30.910168437656104,58.98056141835082,15.200522084066526,7.451699501802778,7.348794693272698,85.09808268638548,58.47302615796466,76.97757041846907,76.10181284116591,53.16903625695544,15.211925020713712,63.646520601930746,65.92432489941578,85.44563239435467,95.1686394173944,13.349670822898974,8.094645099022335,96.60546693031964,48.96946516926197,61.69924354310184,48.26111896099947,98.81127466752653,70.24257591994537,7.731840116968458,79.94285942399218,5.892216329380728,7.0787897394131605,62.15560263209916,65.99529347187303,84.22456059783107,42.23719864329218,52.51610898677595,12.500403450148866,43.14692140572396,59.884648422278296,52.092619422494856,30.51282383409786,86.61507591923882,28.776635598214682,89.63157229572487,8.67411710791648,71.31083504971483,87.05036360005114,52.88450156203828,31.54456519980384,45.204503295803036,22.555807902083824,68.70446648802016,75.24798042012127,75.95366133255648,42.004711870424714,86.57266442661593,80.12089540867564,21.784736007404582,92.11361187714526,98.50789420296468,9.48250331696119,4.74339547615541,90.24479412521218,25.430035036457,41.511740543836105,59.01514429759547,47.55800026931405,62.810968914574936,11.539952017165046,75.10256584195811,88.92542596196206,33.72503290779203,69.94527901631041,83.15394627533095,77.94198774909145,27.662199250401898,16.05484778695727,89.70118002541368,78.76569133473632,31.37411949313622,88.23713816726242,98.1023836696055,92.1385349099697,22.580521283602884,52.75932128202017,75.21459540036808,74.45001078644285,0.34295668193253803,88.15216700872446,1.0724542354678457,80.31670801180377,75.31113762657762,76.96752210758203,94.24424172281812,28.218405139754466,48.201485879652736,35.61806676406955,93.70219459089748,4.965348583479834,85.50320029725611,85.1364346334979,6.1756004602130155,93.36693485838468,0.9562999681284046,53.33814087647018,28.077629437746722,72.42199427550888,26.62895496628863,45.22414604200873,6.596068985937009,94.19137180365895,14.86800985282397,95.91690600699543,4.275944703170187,17.578805833049316,68.78506065492633,66.45186551603553,76.42813123979772,90.77042148870088,43.89403568060495,80.24883112275549,96.57146560820924,26.490419158738465,83.60343312465024,92.89454971611013,58.85209943793554,19.73635881234552,73.57460264043534,74.97838458846945,88.72223131741414,31.107881642018587,47.608712098413264,51.796685294039804,76.16838579349432,64.07624097374804,73.44541907975812,60.633473114453594,43.18603423230607,95.41499188983997,87.68462600905052,34.679725557219875,4.544516673281174,7.477016575437911,55.4160577774844,22.16688561286555,87.09025993924942,96.78457176831327,89.56541467661569,42.04087758448847,89.43505011143512,0.2882635724877902,50.608711074992144,4.590534969671856,98.98703663616011,55.14206591297754,39.8856360833324,87.07671327939512,33.218178451760984,73.40841075636455,64.63608965026863,51.70255617119126,48.80327112876277,63.11714290464043,8.31685392805288,12.211033487000368,84.58175664702583,35.772295862651205,66.58364577808504,88.6215830933448,84.63825373363034,9.579568667646733,47.52329747780646,96.62251679192424,28.476381869750945,94.74917271315013,12.244827986509744,0.10113082362601666,3.172182403424295,95.0159474871539,85.24126951022208,7.040182422336438,24.672281483007662,70.39731875994923,84.22591445829855,28.06524523829992,60.4260266846254,13.993023738107269,21.46323521598581,96.12379810551654,91.20131907138098,79.89247272794574,51.0152240162741,97.78676111531436,72.00673672621751,40.41150081936733,92.13682855082617,19.886357794956645,31.80817233274389,10.82369478138947,66.83022476246003,77.80538218995747,65.09395126550702,42.33233941568268,10.583574603919521,26.309890444490613,20.110546262096985,99.30784747349621,93.4375469985441,18.75696713849051,90.98637745458898,55.24275295498251,89.30321289504558,97.42362816761955,7.224132562673846,75.46547390431154,50.15303038031029,38.17473590687976,6.516308311198538,46.79651025414384,75.52598303287854,18.390595100976427,64.77389872405152,63.921788778079325,48.32153459951935,73.20551644510438,30.088252478733104,19.511047905988654,27.67092359543828,94.87755731719936,52.1977873894649,85.23497298002245,85.7104822208927,79.72591309863051,11.959915263545383,40.746619468432385,18.949989758866835,60.489481580254576,35.84707734692214,11.59627790790083,24.34150270841373,68.86656500062,83.69263166523521,68.9063686323377,0.32107086788137895,92.82842221250644,10.627272892121798,18.186940581488354,50.36262754050238,7.826618574476685,33.39724682012457,53.963109352148095,8.168196555946206,30.05999998026052,45.710857839092256,5.5974213302816045,18.403072515765608,91.28141776270348,56.10631377453201,54.1334078465261,33.60605678677891,92.23294196965854,17.60928411567788,96.98105247781272,72.06438564563649,18.953935205859885,31.550109897106093,7.994880440216301,94.26589527060692,24.015249248944404,43.76356195145297,41.99219432461876,57.569760068739974,59.6486057482402,91.98213078457955,43.18962960126844,2.728724860018006,84.60213388551847,89.39507614373147,88.49860735655326,62.21466334116117,88.140615609697,36.1484984853095,84.60948399665283,12.686197501255347,29.81323769889499,0.8057377927157328,91.96489915013744,65.04472392824808,73.20051002807281,48.7882525175702,80.98495815063174,23.50956241669584,60.245772874534495,65.5350571609872,91.79227307812847,11.973245342979478,85.12517498708634,81.97252690004684,64.71135183849066,72.66665250448361,13.077840947941667,96.27057523776617,76.20237464383925,44.80718703540907,57.514456753005305,62.570204439993994,25.17940117190949,34.48452722586042,32.631436348337694,0.5994331764406446,68.5036624223938,5.335698059683547,96.41262949939345,60.45389491984745,67.10034607371398,57.284345934163184,31.048708836065053,96.98393269162673,8.180486275394427,39.92740903566179,70.26533979483563,86.48617188954384,8.150168589964313,35.27162388620382,86.2489053610926,92.63211527152902,21.985986656960186,31.914347514684604,90.51226782070027,54.69572365765569,33.96815672199829,35.18192258467621,99.73830453847444,55.69555321587827,97.09306247978273,5.356908650283243,76.49886265466534,84.1329345384437,88.21203799864597,86.0873207917385,0.6971823744952976,77.63483731577068,77.98970747789227,69.58669078217153,25.1233789965146,98.0353837798663,4.5900379115472845,98.50948052141118,3.9565831957775854,36.408022128589515,30.73997067301557,58.214214466924474,92.48488322101826,65.16386163326015,40.868644534829876,27.189966926488097,23.196409588312594,11.635671975176454,5.095698441912377,19.647556764480022,32.11489983757983,74.13660787570416,74.01281479536391,83.29095970607574,62.90870237466248,54.289828556915424,2.6393611104108095,4.56856219922146,82.06876509552437,49.509703526233736,6.558403073214536,90.23189253662885,16.69855055816456,36.51503965088197,52.99449363488169,71.04703239926049,19.36891172906079,65.4034740056876,72.56386863838796,18.89040582943682,69.99073038151016,90.84169797291514,19.757335042185396,14.075802604973454,84.22845106394558,3.674053660640886,52.5775443341383,19.315951305972924,72.89096161503912,19.189315497112027,27.558798717104583,41.85479417843791,89.37442371766974,67.7022386732266,20.343323047718087,90.748772708895,18.62126676062401,30.122067007168376,65.43773397795427,67.21716037930952,63.57016729345035,20.473867715169636,61.05170546914924,15.997062248348382,38.50746621720595,16.02957072351432,39.39519972092478,20.099060127667357,63.16642260647409,60.034171947680214,48.2168431498142,88.03924690265524,84.59206642616756,95.183113484907,85.64772756187608,79.97467818311732,23.83641403295995,19.14824489715572,50.924234728068285,91.92087545298348,58.488463426645396,82.26192454388557,49.86428294294753,63.99729417199524,88.38900270604945,49.519994770973284,67.16070480164997,97.59777389512669,41.035858197395655,0.3321704336819886,0.3945069935643142,42.34005330256565,19.54487708389674,76.31895094934768,81.01641604497829,41.32179706228902,88.84125881149261,41.42826093559109,14.978957336316645,52.76935447789235,18.20112962917937,9.664650606329106,39.69823508014267,33.17651042242073,4.7018347949774775,21.93281108870313,19.74226202757976,69.3942853553543,17.46338224494288,38.695195241475,73.33065878916072,50.90522082237232,35.211836149559495,16.680710120901576,90.00159062585497,93.60916677679153,53.31669457460117,44.98223083445432,32.21916454521219,49.5450448218256,69.30378390275564,10.87265368657524,91.88267154882999,94.3114946857233,57.964763260659716,46.04917566902629,76.71877061655712,24.356119855541493,42.09309337736096,61.49419249284054,22.482170065585947,95.90103345312768,91.35024059422673,76.57720360506919,77.6421994050244,14.885584027673016,44.20892612067418,5.554593740717051,6.097190016985299,22.27469694774573,4.834297838939938,46.945504657684836,60.569032966577765,26.09570720245531,0.9495502479736073,16.415052794687778,45.11834109075799,47.11283103404722,13.223908925847905,32.39541840787192,35.895715246140966,63.79754511984621,2.2896205269975933,5.081778130815029,60.60639018994189,9.20721816891621,44.52175808731587,88.56637381086625,36.293242827005436,7.290846418676056,74.25294262737863,65.3313098457433,16.296960830744943,51.524865604233995,20.961353104325386,76.13837660990283,89.04941010573737,44.16877260785124,31.461544010061605,96.85216184507419,22.897711046498472,76.720217268426,76.99473776341922,4.612665753181644,48.2009957146214,92.27466147031413,47.28815530656058,32.425523649537034,20.16846354302013,96.69170546460684,20.97910535221208,12.010036503667676,19.316070554582154,92.56417560416594,19.685498165381144,96.1225955742528,31.7880707486472,32.3386965210414,75.74322127836277,17.257993515276592,1.5109075619705425,77.05210118263825,42.36398472393432,0.33948242042833865,7.504605890279614,65.19259384409483,84.07916906527421,78.38628005639366,84.91026569956304,87.17945982885213,52.36462771977448,42.902054455629,25.327530749442428,31.31524344184118,16.737609666245024,33.6415130602864,98.15196102486523,98.07729497998893,25.02527275969073,67.2715063474671,7.738705734084417,23.06837660466976,0.19667600417547781,53.17811365822227,39.022765397445895,24.2840357869516,27.487361275687448,92.4231218022107,1.4405430094406535,22.022325517335272,62.28132232649444,73.56913890864855,13.50945392289069,19.53387496849932,15.416931341622298,56.845043880043214,96.27291370013018,54.2980572956294,40.99299012708097,81.84162089250111,39.0228352300614,93.73061960854321,11.74043482465632,73.6521215759586,13.05654156868259,74.40392957683216,15.626074468015027,56.64569646519848,73.74103445828707,89.70421946676947,53.317338578275006,47.251341925791365,96.71897854777865,46.24993707402363,22.469082817972218,17.493153319815402,33.68839105845283,30.597068206069757,5.7138755424762655,57.16150812853322,7.1621297777872295,67.1514034624366,82.98610652109078,58.168342753751915,85.50770770113165,69.92781308997765,86.77774313439713,73.89592682400598,30.707263747217418,28.957093203326465,42.05750518560865,10.85715081867118,97.46708820060333,93.5881113843704,31.20352379269653,86.33170993837875,70.39774278165005,25.21085255683275,26.765734263173634,1.9817538201202023,31.05124336602223,50.42376654364913,30.703151643846958,56.16528244974239,70.6001871939065,95.48301965867772,95.67871763674178,47.47233757416374,27.482453558624155,25.031269901611886,19.12076619669847,9.471359257833821,87.0436790819908,91.55013991625162,17.946519836267182,4.767862766806719,74.38617896923385,87.71959421583784,87.74608085378435,47.23919372980478,36.24468624558459,59.083794709614025,42.82229324142071,63.9846502759782,18.882431068130966,55.725650655040894,69.3596795896666,77.76859813304459,16.103344056808467,93.35308180481599,31.677719680923566,28.512633008887846,69.19481115251362,41.35319251579703,7.624439677218198,65.902394015387,56.367239638203806,26.78347473146163,16.560021395827818,80.30883340747621,10.920380792489492,92.14408443186596,16.343814947505344,62.01240394641141,54.45987214571366,23.962592361065592,88.59840627515648,78.44765585871886,19.065071128786947,88.64525154707812,1.0043269966280688,9.285678587593571,13.985067110535843,82.16701951670848,81.3779468196984,50.04350417809118,95.34396674478201,68.18982169642041,28.30975685378194,83.85647231210072,77.1264422271772,89.62729220787331,12.101540779476316,21.525361762749196,77.7620273407742,47.58472148614632,50.403864446152745,1.4106539414274533,75.17923539358291,98.0258419880958,28.592271759230737,19.21559265205275,21.854657111095243,42.14995612555234,30.034851498154502,24.567633994548153,44.62190534005697,44.989848025846804,30.078476210755944,31.216310114932178,85.22123892899134,89.34155013237795,61.718110498483036,34.503312281275186,55.27958656419223,90.0137971706427,6.95345018902791,0.7059423163527034,81.25142753499514,55.631062272269375,10.152241205387845,79.72944439377665,85.00929320910092,28.55846468762151,61.9166794179999,43.51755058865008,54.12765380322946,69.41948111389335,23.687072132003586,92.99834000055785,69.04453971026348,31.280689014539753,40.98461826209261,53.794516844317975,13.260903429469263,35.30548932289093,19.877977083783893,94.67121678262247,75.55454372114303,71.04416451096192,10.35252071215349,4.3983779501295395,14.251154059439841,46.641897635244135,17.18842771527751,80.90275731428713,61.856176529994244,64.24346389086418,10.782251036729784,5.535076803114558,0.8153495117455778,96.11164563224774,68.79348782376408,85.77673584227409,77.79408626794849,16.045226491980902,54.27819540449197,57.6378720902468,78.23479813168817,44.20280686023619,41.56047315254347,8.131602397288917,70.29897572200888,8.970358806253609,29.574449779482403,52.19788341909555,23.879514838749927,61.045685145960185,1.380147329816639,41.742146343562744,52.35332523029401,35.051173021963145,67.97112896221145,88.83848826074396,39.728068356880875,1.5683833623050925,87.90733704502432,61.62284331235692,21.094995953507812,30.928264556957053,98.73600647743832,13.222941003566003,63.4579024301557,93.39243737561225,23.99059981208986,85.95098598800013,88.10253277946214,58.931301482893026,28.963045965861234,19.258154332966406,38.56698693623078,31.91197166539126,50.64671276072548,25.041701992826937,2.875023117632347,63.39559389655367,28.684665320415558,93.88323829667593,82.33369586280372,27.774852943613524,0.8232420829605402,16.69810358157886,59.06191649549739,57.30187384343415,50.92395782847001,90.5521999326565,24.127403223857158,29.494963097591476,12.826962025946909,29.486416988482667,30.382655629025777,0.6824150880665014,86.08705640206892,99.3170574924847,45.62755572912529,48.97300324721465,8.688138350779173,26.72780999273776,77.13051456489406,84.92338027593162,21.754049759415615,29.668712570640366,59.32574874481708,8.108363911920735,90.6533400374238,0.9762610729543431,34.636751010193876,96.15174774314738,15.696798303596626,38.05493878247867,60.194697798260634,23.47626715932465,40.14577975211176,91.73453192105777,13.604878005306208,17.762511473091646,1.0139064489476324,55.07219948112729,97.74394756702729,67.6332852606337,85.9453512866046,62.98446868171246,59.07485100860279,38.99534776371756,29.91425903731486,99.62621783903631,41.37584599414128,63.54574011635749,73.33264281721151,73.7560085345672,69.47968908398443,76.67204185836223,90.27613762695633,60.04767610504478,15.89414769694788,65.49062826493628,82.03937943075317,40.68910742403629,84.8757684443567,29.668941663810045,0.6026766191942423,41.37957628412905,1.6086882035548866,38.75643372696913,78.82299286766532,25.803975169517802,65.06628839436087,71.03197962719254,9.412075010631526,92.77264044973754,85.45089097548848,2.605524153567762,63.49313049922989,12.708216234149706,13.007072051206237,29.281358294833005,40.398494419745454,36.77103360253635,88.00934606240209,47.82848382843572,18.379897455561235,15.895915517403036,54.17492377077673,70.80277066375153,83.55745973698694,21.990276322872916,99.12773305077651,45.50098743536852,77.14939276288726,22.165314658824787,10.537515202648539,41.44033273228425,81.4062225283846,9.836634760307739,30.970618243369998,67.73351117470303,36.106689305394404,4.740272357114761,15.707342543515445,79.7263939538301,97.32307011051687,55.4511741262741,99.94095213699694,65.80896264706925,94.70403201661807,14.304789426224884,65.01612282526526,74.92130378690003,55.47965460035942,96.26700593764146,98.3709784124084,22.01158462763142,63.687591369563926,86.33556026855335,75.17961005548808,53.40419927429401,74.8317636022877,84.66118452762332,31.000357225852483,27.900033248315026,85.99806611369138,66.93673250164774,50.11004837835029,2.682797880195742,82.50695371469503,81.68082096376538,24.54062003645938,53.50766922021326,33.414500106492916,44.806043307550006,8.63287055223141,58.69365867766623,34.047071103839045,50.80777376973342,65.29700852133946,2.3129495905666486,82.27078626047467,47.8610407212221,47.341173073990504,40.3112662510152,10.007731967106647,83.07064334621965,12.926441777181562,28.72064016297653,37.45346437964776,73.12358617927208,94.41391204431781,35.17600140435611,88.45540547199884,36.497461984018265,91.53934100745134,3.4524114002443262,46.42679010486142,75.54812012375736,82.26971229433337,72.74195633374272,80.53165163656229,93.3872568790501,74.1455883656223],"b":[89.82874724852729,61.63567690152146,56.88632309619072,75.9998071881151,35.78032635325875,71.40171653614647,69.56494385701863,54.55875624261456,60.29799292750921,57.85662999852854,31.967068331053422,39.00730974019754,40.81798146336226,38.668317558750275,50.15626060099467,97.03001206776358,66.3919904302153,52.83527332637223,70.91760767383381,59.11954846413903,66.00974708806015,28.314778122995612,43.47627070563426,12.10009578583203,32.93327910004126,51.06993397227957,47.8180307028068,58.2374548659046,56.45994953165197,69.90286069767802,56.46116374754403,54.24013099767207,41.18969289458227,17.734704928153747,21.529049998002886,5.1876864461417815,78.5669732237181,73.68953910768307,20.64967983408975,66.7347619697615,67.12947270236981,65.80415119789697,41.16748590760207,45.26031204073949,20.982640232885355,94.73383043492919,27.429222266517527,12.904356848819258,56.36961260453997,40.69502351173255,73.49451177531289,79.11389212716018,57.205219607944485,48.75446438947198,26.59228998913261,9.068280726583042,12.995259056866114,47.888849483410425,34.94541117488687,90.11333687278105,42.83588327179393,20.842262342379602,30.593743196320023,67.66598126950254,60.775798229387384,90.82021562943373,77.02693918334585,74.11264194528991,37.19794440561347,63.388754843936816,78.68276579425364,67.8668828832097,18.775680028706,77.41102290444724,58.23579249471098,62.510302935536146,28.034903677614015,55.20303497502794,69.09397242294676,71.19956416437626,15.354718848048243,35.71281953289221,35.87229913344487,35.56705715458614,84.29303135871763,41.66581773235329,30.559121448421852,29.78488466324318,70.42626564421441,66.69347649467517,52.55214688992949,40.624759041190956,32.10354888694461,82.70972768619636,53.598160228579054,30.420167439337927,22.371344966124873,38.4865915791987,67.1522408781998,51.427605574974585,50.83779476877793,20.389460136715428,61.75644465854323,41.46301777925045,60.37377553929668,5.832330146453288,13.97349185994361,29.776636348575245,15.805093881247206,69.15979652778313,13.2814642218028,59.756775795918365,70.52651340977543,53.540972305286886,72.17448000359713,27.07878802470251,14.42065293548242,24.72328600765987,77.37273035481758,34.578895654469626,38.917044624172405,12.682223285069586,50.62064943006746,21.817684705969857,49.41956849550249,71.20047966968843,19.127858399156832,23.840650926649346,95.69565176303065,44.79536162554543,25.703254062776907,43.32598263640587,29.003674137796132,75.06544987108599,36.91834589715676,51.552030598291275,51.08533424640129,59.667818756514535,71.75975961881086,65.7713998878077,55.87731626589654,55.71423015557022,64.99750558309175,64.9770029657831,40.36035307395273,59.3010952933861,15.183917596006452,8.101362325787536,48.45607513598081,64.26377603786472,70.43380803490875,33.435275357452085,76.41832737746243,27.34323691532895,88.44230970414554,89.98412406943385,12.40181059290379,83.87547207196596,50.46212872396639,68.2541196692232,41.51185729163805,54.446957668793814,58.334829895072666,56.17241690413576,53.1738352346552,27.702593828558456,48.74828002661807,70.91009277844779,34.64743906745778,72.95318373766663,78.64355842443018,73.37366601662862,85.36791867926009,23.506165664508828,65.88365422845024,73.12146375772106,79.00725454160565,90.06675203393922,22.445210759097005,83.09964175718625,55.21566533986001,57.937119126974764,35.760523122338846,39.30893159760046,67.20816346799322,76.9684026776585,64.05848471814417,43.73332491369564,38.497794313901196,56.21740068368727,21.706767711846915,56.521738788154096,57.06030223800141,76.38575556627306,48.66281234464637,61.91620333473713,85.55820724228721,71.98504752391892,36.72227036450764,76.1060040930916,63.86023332175503,43.10648981598597,39.72055044052709,62.225423505943816,7.745968521228415,62.42742087748544,59.21717228792511,29.874900417365133,79.97957584255705,66.81899558169319,20.48529874380425,4.682819530655382,20.92711115740822,31.964994113757413,66.30986916765306,40.24912660557402,21.091919283155626,74.0667698216839,65.98921092772595,72.31029145504218,37.27145718643556,35.334022967949394,38.45002489557703,33.87235304906491,68.2893045523737,69.99178284475465,45.11990760822974,87.56455015636307,72.22574107331926,75.82969638514297,81.47107272962762,22.077284918051827,71.27262756727303,25.23923158307577,52.27505315427276,33.16827441407987,31.058722136845294,29.56119455798255,47.268697299778125,61.717362841741654,23.185496158996628,18.331314865059657,72.17225354598759,88.56857723735465,83.47802240741198,32.617967828420205,48.90367579287562,36.17225727864828,65.583842454168,48.584019248104255,38.98715690282422,68.60086706728515,43.895758355205494,32.73169874404634,53.398589396917465,78.45633123377652,76.93632897879468,41.001828131792124,2.471556999526303,30.078095813565376,18.677319117943302,41.65884087350702,26.632679229919574,66.91617683647388,86.74916971452971,90.19233616854629,35.48548964186111,59.141144689083255,69.67331237534565,23.304176371545868,74.99468872312485,47.68874258953619,18.17548788724357,37.750259861503125,86.04733381179385,37.300328685774076,48.44582019048005,61.3475111095739,61.20170327215996,69.73887645304761,32.09948145793094,64.1513654138745,73.74560363422441,81.91137697104585,10.853611284730324,50.085136080908796,90.01028413836208,67.76591393680577,60.3242868695878,63.27835212968307,33.830180847876264,64.83307064398676,39.59136035346769,41.1809109324518,27.50951258375171,8.340158019782775,54.70360847074838,51.995921592816885,39.36713536786698,42.76103088765974,82.73571847280826,17.992795487245367,69.0280920440781,86.26949646522138,61.93420409643158,75.97971818204003,70.056433696023,74.91542650108185,31.721590772728582,16.482912638015865,80.51066934239242,30.656772513550674,19.18528707716934,72.60353773160575,52.26129326054616,34.11314042233529,23.46619320138172,48.11317425127439,77.61028731906333,70.65494219184676,18.574341210113122,92.43193805331177,7.896618135132316,92.39265482355626,47.817607999652466,45.250765862910924,53.13703528168158,42.0508192464036,62.091760959990744,18.29308401392698,91.39601208929051,46.83836638565943,11.996695718212225,68.66139274916199,51.975088936122866,67.70103802548107,32.92749929905354,23.82077059605279,81.32744115248792,21.230886721929192,45.781227620256686,72.24532533568818,41.86984919759382,43.823707812274634,17.733458465860185,50.152709118013476,13.977077166485689,30.266988375605727,34.43964586654883,48.25179490080812,72.06244223311406,37.51886524954594,13.659537693575325,90.80454977602632,75.15196296047917,91.1656086649178,34.975120213056805,37.96322882168826,5.579032893701608,16.731373653601867,75.72094790048173,28.366374515360604,46.931350295197944,83.08144607831593,38.70658168797506,23.190417678423188,24.019298376030207,28.64217129684235,40.1716074868398,36.06056187600983,93.39513798759012,19.62574879192486,16.436939960151456,67.86791355665814,71.78269822080402,25.693580478126904,83.07053480681569,24.524533578955044,84.4963669213828,85.52097888246654,47.40615259001914,25.70176316483696,78.79226885966304,80.92977620775798,38.8652894188471,39.475484112246185,77.04759146996862,19.735419576700444,25.071379932592382,20.97313244473295,66.44481012156243,57.43657598102672,65.08483485410352,73.62139658567592,52.59598506545204,73.12973812955597,56.73655907286326,95.71532456317118,43.594295946401346,63.2410179867848,33.15211826877616,64.63217310363191,64.6045918239037,90.27573083854466,79.8051765121875,59.83433223041335,21.693114308656494,81.96722352710863,19.309362535610965,45.8847972270575,39.080547456978564,79.01205029627391,71.83253033843224,68.48429397689318,1.3606850938393444,49.2383556609518,27.515447829972306,8.5687276585675,67.10201693872054,82.5676469741596,52.686382569946154,82.724602155441,77.08687188197771,91.23752856610716,69.18854837919164,77.73510219740484,41.94945785049118,40.6378351260979,23.507219397892275,34.465898131921826,62.3611509227876,40.10453697814327,10.893105424198431,41.563256563760355,44.51182899379109,22.998164040901152,55.94408810118669,29.316830442700912,52.73756141750853,28.034237204875364,73.31406129323369,80.13229995898605,79.94936589212408,49.45831635465629,50.88752299657533,36.82129685790166,53.57374818792968,29.397914646638522,44.49460399344585,54.97997987273599,75.28477059277529,59.71337282493132,21.523174815695757,62.47865519729483,49.368545333854414,45.99022985975115,27.710704538211107,80.03315183716681,57.265998033828325,64.00341901398414,81.09933876349604,76.86090794610519,30.114461645918503,78.81200517402229,53.1457479809558,62.38408042652117,73.38251114954411,27.14774156657329,32.501843381677105,85.35379716216949,53.465738879676884,48.78196244989822,24.21396209482351,28.011410291972307,80.55059167625987,44.6565647146574,53.42989801304499,32.38103288934962,57.23577585480024,28.976465051297737,74.44835866571408,60.38057574008836,55.45515971371244,55.48382274337095,58.81104461548186,45.65705527413775,76.69239811320716,82.65597738640749,12.205378625958714,79.0337434658302,72.32516576586174,31.0358871082206,40.036944265840134,51.98116393691291,71.51834188190749,68.98598911015283,16.078306080332858,53.03361843493157,52.5097056200899,63.790020318765855,13.859423582875072,13.238271099213645,86.77427470623762,50.21300823125966,55.14088924022091,27.163429485853502,20.212571132426405,38.73409125162611,34.64120701980177,22.269336760830505,36.99770770970716,48.39455336412127,67.82093688117357,62.68043767919104,91.00708670988432,18.411530979955568,39.47028898713866,65.10249773604696,44.44686397154854,38.0010261932581,63.48356878452919,41.23288223917353,37.59332162571578,67.28089216393272,70.10871457943493,77.77897937248383,82.6165618772255,93.05476242537443,47.06670095459199,41.926272721966455,66.05289452596612,87.87056948525533,33.78456125220248,27.103773843632112,99.02817689928332,66.06635812451337,28.43403868947949,55.787204334855886,85.81594670497515,46.874041436322386,18.424008885014295,52.95523584747639,18.125053532497493,27.842857146446214,24.834672168625076,16.8387320788503,88.46882038557874,47.156779205338374,25.30377659573423,85.62069649202645,50.83515946069699,54.819890479740835,41.88326122263936,74.80317092501853,87.10586102451893,25.148846995331148,81.11418487153253,16.75350668091906,50.05278257816949,24.829404243863156,23.32588194620662,93.27941006595357,53.88116995941638,83.90680837095252,53.740518442581276,56.164653615135705,83.45711538959284,82.8481650894318,48.94452787915006,26.820253078519126,51.17067368343884,39.05363146504198,53.300207245592695,69.8778148785952,52.74282045249976,40.0286799021511,36.2069190728855,39.753167269809936,50.661218475597195,31.066462779068786,87.95199695804308,38.591533374988366,32.896419970298545,97.06525261652527,39.251176095352825,63.161823024074906,28.018835802468345,11.634687814931603,88.77170281588202,21.734999234856396,47.02505957482146,46.535028729759155,49.97464779993521,66.96467568563932,24.676795311644174,90.98174308951867,16.53795237958908,48.45071534424849,14.904926982656788,52.34038148781333,25.580586763125734,55.605364814708395,5.835778885702081,68.66738452944352,19.83391963112899,39.622562797799716,63.147158938193634,22.914822765993783,64.54744214358125,16.1245954863477,46.08467844133995,18.072519021405583,43.269896062051046,12.969249007109651,72.90964375102261,69.1389888091069,90.91046426311249,66.79799393021642,75.3380415157217,56.61640279583798,85.53442592082553,25.37235841411061,28.23738095048807,71.33891906402442,46.655639613744285,31.058661745065127,41.19397514965736,41.781410948978234,44.24154172617212,44.22480491785714,25.913123720505983,73.83413185445319,68.57690739302204,32.633485752412675,91.32802734797977,80.06484681949505,16.236514760337965,32.242205422172084,30.427232781243376,64.63034349516681,74.27655927145864,44.82511175831262,25.26649656472454,33.59025341901628,33.50182829864257,63.7885600495188,17.2555243155169,42.73793423415743,6.656222812328179,43.970230340715,45.396986916470155,68.34908148552968,30.722677544023647,16.281289830977492,51.698733166786454,41.7613412942795,77.80265073606832,77.85993474014904,71.7963369390383,13.787741244683707,23.222037880979315,56.12530229039662,54.26030882957351,66.36166392516752,80.1761148845098,18.923669320236343,45.52323782667744,67.405970426905,65.84164564282689,27.18181035984518,12.26842670239877,58.50646989784407,46.95641079108799,44.86012431290628,69.15219654264737,55.94053196448385,71.26104878157304,43.58960761339264,73.01292644900971,44.11662693899449,69.91623244129963,54.73850258451823,89.82666623828928,46.41603339822844,3.4496433869996768,21.55421977559195,66.58061544945085,44.172871386370375,26.630926106211152,77.3723565754612,70.45184966127354,55.458939627173336,47.7274053273796,82.83330113787451,67.23146786495943,47.042144269981506,54.32236197672834,39.19767065670383,27.108340731302828,75.16997322819239,28.13090443512294,32.85977323580705,35.98731539941525,58.96540340832371,67.01412212903763,30.98410771626012,62.91827418019963,17.45302851620384,60.74898565472567,52.09575553860391,75.50051831881974,19.01088036046868,38.66120628146846,29.361764922113423,33.24960382312245,33.47418949335493,20.94211623106554,62.1519157844801,60.938930710107705,61.11150610135049,34.14180017065423,48.68579921093899,80.22592701208384,13.577516769634897,13.99332693136869,41.137857671654984,20.566609308227775,41.954260638985645,47.77307020714507,81.39326836482579,47.668385824181456,27.082570134577857,36.9976666308163,44.161487895304234,62.77194441199629,56.352719950366776,24.675506377517657,70.17955993866151,77.16029582434712,69.15806793865104,39.2686716358474,33.53316995448949,45.35668680869506,12.924256283088935,44.1213800267052,63.531811272810955,53.46190000076251,26.19269972521923,13.521792694913204,62.184609386370056,19.541676998058485,16.31573227954966,54.42703092122596,27.626264742689962,86.59499727756099,27.667762967364048,30.408722564090827,71.10883411125666,62.900626747635044,65.00849860797473,40.051852670175336,11.660334257471735,40.383952338966566,30.243342962180563,72.49279869726031,68.16243466963513,65.27576557940692,25.79158678998224,81.85149022949781,92.00172255887863,47.50906854400202,19.00905791293718,44.48474671556895,33.90211601083041,63.48490059807852,53.643601938767134,48.623058375363286,59.68930869701264,23.38658592818807,24.720953385948356,72.76322029084834,41.39401598169239,82.50851308938947,46.549734864375374,13.672270682212154,68.29422986300833,23.977093107269674,25.56936111791032,31.837352535771593,49.75378624905789,68.67849371540628,79.28345093829236,19.406083284448,72.75471585762469,30.53667962900446,17.97364048622733,20.793514756606008,31.329135541249876,37.04362366555387,79.98170625837216,32.78177544843055,32.32647743269116,36.152254139032095,47.667750138465735,29.7607543092456,86.46888973588511,21.80314391466236,35.80737327174509,19.13886356522804,35.75271573590326,81.71251588500073,17.472271863603844,63.47074337727961,52.6535923278488,95.09990135217056,82.17683490261444,47.65296474693127,64.08523983302513,77.850946890355,76.27423190786472,18.008859777491303,74.6294429816896,12.37740032522149,87.26098004781534,10.250201311819191,34.23422928229683,23.772782102815263,12.314345598241548,28.069222203588513,9.10502628588385,29.627695910343345,3.481282163937358,67.06916571388061,39.64564293621703,51.997775926607986,50.743747762805285,73.7751081838695,51.289014913530934,46.387190634419724,48.3768238622026,40.77048124503622,54.05442626663218,9.104885709151587,72.14594914569197,59.642571831587745,54.568736545415874,18.02144224840265,57.71091396352333,55.17381362366832,31.259421438984244,81.74548147006185,3.8838169505985265,34.430374007816255,96.28356124747502,44.772406782847625,6.605434030696893,48.31103307384753,3.8920044557178013,86.64046580929788,25.85143324400173,20.385304363521545,24.78729415661781,94.21391519836831,64.94772153900968,37.503856161814745,86.8864375510268,75.34603832446305,71.25854730716792,22.669810477327154,78.63418164914981,67.88962682045899,25.169516143205378,24.36549087424698,41.612373586440505,63.32362407430627,55.20785994866686,15.48938121189348,32.14436566411629,24.59007773912915,28.62154246420117,63.48548048473569,63.11987923972216,62.92479060708831,46.7371373747908,43.23673627422191,44.82095128207986,25.127436828495732,81.18299193616014,30.21717299093201,65.52714434434266,82.9796828206547,16.028006173558747,58.16702730041456,80.18523394706023,58.21247190218499,15.888350935578002,19.68615307399855,86.13890545024947,13.517780524196986,30.568355994034405,31.776691379089854,16.54456686329715,22.61097621217672,17.390758915588304,73.46356432964339,57.390753228655335,41.45623186339737,59.77194589252323,67.25915018941917,36.92376096460484,71.73260482374413,87.53897244077835,77.52017399061091,15.863557314733278,74.27197457510027,24.053259230203558,28.60199065505894,79.01885164119037,93.05589616788193,20.54341146313199,22.67150194419354,30.31949472858492,78.70157909052723,12.403555832089754,82.36596646659935,46.05254077104786,11.964691541483115,47.693433487254005,60.04174126880623,57.70055876511945,28.12152212704255,67.10137489231714,10.608256616008841,75.59559882102035,63.43448596141269,63.85464861907779,17.669190740132663,50.073606483127044,52.54935648318265,62.531608429404294,40.384140378640616,85.23034845514559,62.466347339247044,58.922651079349386,80.96604360354365,76.57133585639855,36.34857056026506,26.872264975005518,20.696182030671622,54.26567896614034,2.7907114398385025,73.13116201567163,45.0980170070112,54.38497309188565,13.831960684974707,93.59911121175709,40.45760545810514,64.93313429073744,31.611229425039618,17.37361096341126,66.24562694922768,55.90030989496192,42.34824635388935,33.661450772440624,38.512540102215624,76.81993879885198,83.61408292083074,88.53873962389952,59.89672854636999,67.7544163330625,52.93329579485516,66.23555962305063,74.53804413323883,47.80114903225466,21.714341707728885,32.5448939056709,38.49654571306162,40.53111481805543,50.52578191019366,63.89454353797127,24.052930217310934,94.11448141298312,42.90192230595153,22.862535556224692,68.14756895636411,28.952793405426167,59.52441701272352,56.63205594420654,59.61854865391527,79.7093147209194,70.20892990385505,32.05335340721497,46.41904368730406,10.797714925614962,60.17519229857615,73.54300507554694,46.137556856966434,22.166499122799273,33.39847661123147,20.523132726163666],"a":[17.360222055008983,14.213729341228714,6.755961729893785,8.928118444420154,10.9780200556001,8.622108517706844,17.61097256906622,6.605597652753978,16.695586113656415,16.652947122538578,14.567001873746669,6.3564551651815915,9.66334810286352,10.975870608175558,6.836806077422484,18.543226859842015,18.867752461932913,10.245548719275197,3.639892784083427,5.087941752840743,7.528181000000869,4.770969422041462,11.086133787320737,0.8928798415234684,16.169548474924152,15.037444496114345,9.67260508131674,5.644830176836555,18.985294305161,14.490559646807819,10.39031742556233,7.779496397680337,9.337135816921895,2.1798161024971296,9.394562384374229,0.11599995799506768,14.027027142090983,10.26907678197043,12.177176196772237,15.910565258710786,18.191892306177277,16.024586200998897,17.222666377202522,19.727833583435668,5.854427666540487,18.792528999405263,2.7662601822327826,3.053044154217801,4.839611940096158,5.310476079458115,0.36989909441,19.59313022767134,15.524416088884836,18.879851615560213,7.547328075434914,4.786589155066077,1.3103656346158354,16.457336162720097,11.103772982478493,13.040066707406073,12.045722376504905,11.590040943166361,4.998484431913446,7.517055659305432,6.088393546357098,19.41600503588967,10.20957409463473,3.0094434082210952,0.004638678138864094,15.340983655984095,5.1408167615273825,0.35645449644361893,12.043494521100229,17.681417458777492,10.529513722453734,9.621994798529032,1.162043746890009,15.424004269320823,11.64940878390584,15.863410006973266,8.516597917341553,15.180527740825713,12.201665366907175,15.83044385165994,19.55520504977315,18.13370685776334,4.419851161386528,15.2522502276164,19.25857132447225,13.058130580395261,9.495254236736898,18.403341215074327,18.8047925413899,7.696821386629171,4.139236473417323,15.838696829279112,7.93348940018447,9.622355404716405,2.2339006074270484,5.777286591747752,18.97396015567103,18.33547259637807,2.506616728407809,3.9006524736445947,1.4919764687972803,2.7935996500527027,11.018005472336402,17.153381104341427,2.650338598651465,5.075937498752494,3.750585191385496,10.722522697278528,14.96277342281235,14.956814801113962,19.33731643272207,7.139595887223624,0.4026274902711524,7.642817091139267,4.775407412627999,8.188391295931963,0.8555222130361928,6.769778386543046,3.0907316547804697,16.43690536794733,9.836342330340532,0.5281966295617124,14.670326647660339,8.925578730566382,16.20832844431634,18.548041802156888,3.9184781035938654,6.407848643498748,5.572029931737648,3.9857198172540054,7.354234012915226,7.054984081525384,16.284387188129642,17.261919248096376,14.265520729736267,3.161836010055863,7.297482729053231,0.5749068347452857,6.986068940812684,10.056571825556846,2.437577077007367,0.6107323319054236,0.1961202881795865,4.736396602784856,13.04314807906675,2.6615488571912316,11.400138853973134,0.36947188062502967,9.949321144626522,18.209184336428436,18.738007871400733,16.18395993485813,0.2364404742240156,14.871212485097196,8.656833177922692,18.788560066610348,18.462897305530554,18.034595440071158,0.9917758439130386,0.693426383300948,15.651276014632064,16.54256251843346,5.701136433209757,3.3250688488389413,17.595404952300807,19.39855323917401,4.517263245810139,3.718120036163657,14.545854761984987,9.382788132455705,1.939938683799718,11.736610338453492,10.534278668253737,11.30835033616104,18.89119332589047,16.253286257825295,5.80636023576766,2.217871293129128,6.449508355844125,0.7629199824101285,10.069306064044078,4.558627702636762,6.47517893026103,15.548549894160558,14.977046120012254,14.69462675829285,5.899287677387388,15.13356820232168,12.868192670118592,15.25445040061227,11.2269394846318,17.161163746235516,13.589983541599926,14.376046196828813,13.670152704199182,2.1740305616899125,19.021123702405962,18.799629454343023,0.8482512919647567,0.03608483299153864,6.387465528536032,14.581683316865828,3.0474207135649323,12.612758168028106,8.610247263804386,5.095834627252569,10.780154124886101,3.6045487544081345,17.27774998373433,0.28952294412345037,11.400802269153552,11.377818325890958,17.10767565538172,16.694498609765173,16.92192242564738,19.451088916787718,7.270685514628625,14.665475271163274,7.062601550550633,11.361794532999614,2.605862247871449,13.72971518132108,13.27170387244589,12.472410744810034,2.5991293461146903,4.082249224617889,7.7768977280753715,6.838762353021561,4.088141079454677,2.3323318051226716,2.144281015680227,3.4999401185592394,6.448167561848344,16.080147364218394,3.2589447946729155,0.9981072606378616,16.515636859380294,11.23937881764714,17.736323567338765,19.572282215355983,6.056279712767729,18.94053379054874,1.5574579811195655,6.467469170848945,0.25279651738590925,2.2191693092642195,16.18698437005363,13.327225071944518,8.121255850350906,0.03786324429875698,5.65753581189167,0.38076413648858054,2.3133117642052436,12.86084749440854,0.3260376134141474,3.9283952643148856,14.362538162780258,9.52135640600854,4.909165667577162,3.2426545619540192,12.49614319910187,18.360441983145982,18.459584173209794,8.798634706705224,4.102169776517219,16.639197661973164,1.000016339142764,2.5224717912108163,18.156242402945267,11.834377237039178,16.90780474337018,13.855539921292896,13.004729592844395,16.789909703764177,0.3353688973118407,5.1492139820067395,5.477139241499374,14.246924794679177,18.03815590594791,8.180518394880103,1.486980295324316,16.241218706878456,13.147724144201671,7.096171921655223,17.632522194894015,0.3535899640574325,5.374907814741663,17.572512275201074,1.1479634683307616,19.904981399264976,2.8626514304050454,7.653358130846284,4.018095036843494,9.944296983156322,12.213418512791744,14.201043770188818,4.428476998013684,7.895369438478785,5.204754077099367,13.849438410623574,4.326475246200885,3.7284985633552115,6.491803318863338,7.534308805479539,13.899043795433714,16.21762077839079,13.025004951777085,1.7538597787376453,8.050940782095065,6.416017035268959,10.439921095695146,2.8820077197600424,0.4650554281879904,9.781329057862212,7.191245785040259,6.052405924288942,16.46319705986286,18.404215636950113,6.599196375191214,14.055471570607647,4.093399036823908,0.23963526058375706,12.330934999499338,13.646942087795368,9.410428666141378,8.235016087185478,14.199605466777845,10.87367776644983,8.514685084478506,19.22626885436641,2.919804679123308,2.0841970708661206,19.911596472099514,9.932571377142798,19.903564064420408,6.128425108146338,5.3533075608853675,12.776848876048756,10.909031728284425,7.435889928154595,3.4920365432159217,3.7041694525629465,1.3672514517494294,11.612552357905459,4.752430186114482,19.160552803100526,13.638939181276708,4.350455362533796,8.941703315926981,11.65591767988293,0.6869396618748702,17.304995259081135,19.267152113860313,12.667689870917078,2.973043059282481,10.52080995084038,10.34572226668005,4.161258835977124,6.4871846490858465,6.582381034343787,11.66264774294335,7.616536761726875,15.516853225659961,14.46607156826511,11.732281218711659,8.64672855443111,15.80699773392693,8.533589298178068,5.82526839640912,11.655791348073317,19.990319695280657,7.169600377090899,15.683791431615418,9.352739670248331,8.072687721682312,11.55600105300859,4.386921084520745,19.581667829479237,0.7586997441405874,7.087357411834674,10.067795308032913,8.297427969535377,6.502174794542603,14.538766395793834,16.76535012459222,1.1212865651884885,15.849282474232357,13.796391141930574,16.262231178677848,5.892191337251678,1.7222296387461,18.830545683704724,13.455072305526938,17.29485185217504,9.752083247941602,2.0223021755205917,0.4521485710756368,19.740546266004667,14.54024433254762,13.907836434744354,19.114892486242596,19.33913707876957,15.837955585565133,2.2825072193440166,9.838614244624644,14.165199613134325,13.294136307333178,4.846699019190273,3.1758766424525975,10.03604978153831,0.13928727268105678,1.5814744611516574,18.89876496914928,1.912248532828209,1.5035693305553366,6.949546496651142,14.05102380430732,10.132991384388244,17.993153323300323,14.543383345136437,14.100124014467358,12.282865317316256,19.762927448421248,10.132773976590862,9.94069352532788,11.53512725914509,19.273337722845408,3.5568268997290353,10.071117941009607,1.7437237819804396,8.261748458598852,12.110324146381144,5.588818488145351,9.64365097133447,10.405933797554937,17.34842439491041,13.877033201886913,19.534325467768653,15.34039808935184,8.058333428481163,16.161808021352687,0.02963349487904665,16.22051559646849,3.3455370678649077,4.774803276663948,2.9073353767716226,8.3262071267277,1.0733688609824465,17.50341039704916,12.000396820383203,14.155782430723836,7.3418572200775545,12.199555800137837,7.000402933227958,9.75574643532461,0.8453350631566314,16.663628673756385,19.827029241956033,5.993448370578007,19.56190780709385,17.717263489259956,4.9095462708731,18.662798648438415,15.619623433688226,3.211488132353759,10.0579350299294,9.965098480275095,16.9967616155369,10.897676034843773,9.245124733811139,17.470558839400177,1.6676113505434165,13.62299713929653,7.577030261741289,14.599529642107356,7.962413675727591,8.130077715426932,15.560332973777218,4.872127426655415,9.480029141291709,7.393777905633625,0.7362092320546054,14.415144559445316,5.961577283044375,5.802835625186473,12.02739661136803,2.463261916987256,15.568801516909465,11.044644408437954,19.76333484744994,14.62056933763748,3.0137333127444865,8.601333957110278,15.054357550262981,16.331381174646495,13.931440800583177,5.159328516330364,7.546286891247704,15.456518730705104,1.0992642406721487,7.43297128909973,5.520787157340679,10.7394738292885,11.529985492310995,11.714433743003738,9.72740192973073,10.298232022627566,11.128630152670219,16.192965298671716,6.903074099552855,14.34172142773306,1.2686848938923134,17.896309976343886,8.86923612382455,2.658504769465555,16.40820696140644,2.1580982853312403,9.453589678849816,15.130848941672514,9.521502249542092,7.126079472655369,1.3993687674694177,14.385228680373242,17.74232593727575,16.630677223902968,7.189925960740826,3.759918816431247,16.152165052732187,18.80793015220639,4.897355810773125,19.2171628666674,2.955730915380772,9.031743568372374,14.542113166381338,16.887767685708788,11.526900358183777,7.751709591447797,19.457317006760352,1.4668559942540327,4.852250055788225,18.278392630003975,13.082892910282983,16.644872201580895,14.87732938405069,14.938717572934817,14.216150687751977,0.0038899581774609615,5.931014245461217,5.916138921479086,16.052533038380815,16.618547527781395,5.511236236827881,12.799675103827148,0.24572522419826548,18.677087029472247,19.759662144567578,3.8190901632059138,17.17179292832878,18.014756469814476,7.908935877222465,11.227317050246679,10.719999262061176,16.371501707101892,6.136207233448268,19.62616785360318,1.6056310552753184,19.115861314082764,4.141603164418277,11.040125785798471,18.70103598359066,15.98018250517313,0.45850908388217704,9.444643159586308,16.919922066321433,12.990497244212879,8.410841984449258,10.926815118608655,2.9907959960098296,4.020653020899503,19.892383740167965,9.957003080344432,17.812917206126304,12.336280826296884,3.6053015621068285,12.603621024739656,8.602875954131726,8.781079845063067,4.691939314327009,19.01515757264368,12.378375591912395,2.5118326184597484,16.941455598848265,3.2255024371048036,18.521039429317725,11.172608164322773,16.21886767895337,12.245221884671341,16.33887902899258,4.281209058374285,16.744154552018454,3.160184386357816,9.570419069508397,0.43193744695830816,2.798924595893517,0.25061966732815577,14.786390588325977,8.860374447604107,8.594743520890034,17.807263104748856,5.610740923485791,3.044310399339154,14.503123173075823,11.692089003424195,18.825710918410884,19.329049005512573,19.157897342840393,14.604113914589313,2.6518246621693864,17.557438946512608,19.538758548787357,0.20838517594647943,14.689052676238706,16.20170347713827,5.385987943569122,2.7561627814843304,14.597401530364849,9.377033066900427,12.08047973039199,4.604626151296909,11.61191270844843,16.48986399217806,15.0608959889488,2.5655523500784527,13.279485506932232,10.583111295427878,18.749343691778705,19.837819528282473,15.088173255067714,7.38094811860643,11.79875841369737,4.692795529443834,16.959068727850152,6.392338534652451,18.91855038569597,4.824544072242394,6.0542963294947105,4.970192199165924,9.017951852854909,3.665015629235455,5.693968776783347,19.84900343678305,7.3272220138729605,4.2619810059294005,18.774547141773652,6.617878481507313,6.313154782914081,4.260901880504515,14.972128669582858,6.481575368865942,0.5005143815715574,13.064703729615976,4.0501577640332975,0.5638059489321323,6.960306986083693,13.051460327208147,17.946243584178614,11.990402701807131,8.593477637733113,9.74469555498982,5.2552967580945475,3.4499015304213643,12.511963581248349,17.68838764459638,0.3362696787978692,10.955522627445028,17.983238088657632,11.86100293356163,10.12510609537352,19.581433785899733,5.316158037809893,2.8492555830815736,4.310869163591153,16.912229096794796,7.994743201273664,1.447947387418651,3.453388669572668,14.974032968428705,12.627808620844107,17.692387554402565,17.72952829223245,17.68686749249497,12.046571100745869,13.640412694288448,14.52483732130499,15.093658674354277,10.503929069698428,0.15392828558483895,13.053144772462527,9.610038529165408,14.198069082907354,12.845602527648389,10.925042089069127,8.9015394090293,11.55672968021975,14.920085818582539,11.30830285120092,19.699404322903863,3.2395509608520667,10.16114137689292,12.854616300516293,14.938777659670635,8.348557235511823,11.098169838349495,14.158635051605039,10.402294923150501,18.453250998295083,1.2855579002538553,5.304760624410698,6.458235477681931,6.941587423414339,11.541842096566812,17.64770436290388,1.8531774046634686,8.508438034057235,8.21447995946964,18.070711874944973,18.14660828198205,10.250503311586918,0.3223479830883935,17.18421406570572,19.96754810046571,9.066634286473803,1.897044636154761,7.5806736726256485,6.75411016726124,17.14067403965377,17.57676709307466,2.398916951135819,9.354228922842807,6.586482432046639,3.7288953255407353,17.017823477553552,9.864768219001942,19.9247398711984,1.77032227240562,10.011335846190864,11.014812739589118,4.578635582858133,15.008360023435587,3.236092959683776,14.109228282618766,2.235954035132086,2.2951464746285843,1.2694134132997004,16.682248144484273,10.905917287206881,6.0018902121339845,5.47230560494667,14.407713097400702,10.340208973954915,15.317818361244534,6.942006255429298,19.44691470138556,13.59584283664535,1.938887782811558,13.465151216152407,18.537465336947903,2.0453352048141005,7.311008184791032,5.755228975214086,11.411194419363632,17.99155129665229,5.07752256760944,17.886654242909685,6.607463508829072,18.091971391574035,8.567611058645905,3.438826049115935,5.177852629325259,4.0608770488672485,5.918439961154278,13.343381534306694,11.941223892196495,17.85721118298982,6.621270259299368,15.49292057118857,1.9692832487278533,6.542538074809103,8.32166179864782,0.2260352263852239,5.832427938920364,14.011602122936203,12.615918628952736,8.224595214521454,14.875911286636745,1.6026409607880243,15.263709899755327,1.135788133667952,8.81702130260571,13.19085231299239,7.795554930779183,18.61429715340936,1.807482716228619,6.132695181288792,17.14302643507418,8.444199516912644,3.5493199921977814,12.163390489681136,1.8162555598971242,0.3513276028395218,16.500084013807648,5.587890173292833,1.5932568480634268,13.467926063256623,18.012323277174577,2.1754319313184745,11.297215262852603,6.845086224542576,1.278712631022625,14.972762951081897,0.32462024778941334,5.0494786762459,9.687993090145376,6.176760998645103,9.077823023558036,5.290342592690438,6.084724511966955,0.45829961354618476,18.77033965527229,13.751978821072308,10.868677594701035,19.376487850517275,1.3225038431680103,17.7769988268906,11.093065041612999,17.75362753294871,18.035553694351847,7.452735795253842,2.3507843079697555,8.443195936643008,0.6892985436994037,11.540392213352373,13.11624486680631,2.9416428378149195,12.137591785957849,17.208042314091298,17.28694245365089,1.5457283714240377,3.76996538798521,18.555811688897634,7.22914962929357,6.019665930342546,6.053124086330031,3.3908806632899857,14.595059949458463,17.10871027200053,13.770483519960187,19.196681036207927,19.88445367402342,17.025198736374136,0.05985163405396232,9.759272124267447,8.463842120127993,6.845993668483894,7.183582438184666,18.13360772415212,4.427425250950505,10.45967218304877,9.870401571545973,3.494567716198538,3.2323483742511705,19.001355357558694,10.380987862098934,16.692123746600338,19.92388181802137,0.09661047257166988,17.28683951705303,12.805465171754818,4.71557674913424,19.080489267507836,16.99514088965312,9.603248876291106,11.004790266659462,12.059110761257465,11.22495280799685,11.669410693307519,8.295080322283344,10.687289060373445,9.313149644082838,15.931600377349682,2.8003851006414315,5.306783135039046,1.9546119473036727,8.301303753617102,9.738309124949826,10.524768893160918,4.710596025866991,13.379176508853469,12.02038770606746,4.017040871812676,6.150334737867804,3.14804749531421,9.291953703293352,7.5884075355035785,14.362480773601431,17.37460309057831,13.929347980719218,10.32492180648136,12.871117512857086,8.276403489194792,4.116891084959016,6.659162070689968,6.269213448236237,1.4444572257672617,13.563166742437826,8.300829594615777,4.246570327110901,1.0724152860265068,6.796455071490568,2.7790365669317296,18.632417953806883,2.0731819522475403,10.633042586595147,0.3329781006677779,3.7538533269927266,19.948658709389445,4.255912200958885,13.570276064020451,1.9168305532084284,16.020691132436177,1.317938423282401,17.652569535724663,10.588648547972905,2.892231163875989,13.767572808501281,11.950282350641208,10.575597761132585,9.933510676626561,7.526696201793328,14.760121521917915,19.171627859652418,11.540339913222141,14.801494982465893,2.763811803565801,19.00120346651957,8.94270838499953,2.6575329043318296,2.799668970791913,6.937892718297469,10.055023594395927,0.14432098910651447,17.023919614476295,17.501237871753027,19.22663801001928,9.824321380472458,8.8912578692159,18.64988757070566,14.103365691059047,15.872800987194125,4.324088758967295,1.919547222379423,4.964226420110913,10.675496304954217,13.445346060056842,15.47139043444882,14.952704581904781,7.841902988925082,0.644167444121182,2.9946679551779543,6.112450671721059,8.966395662206917,19.984955968153017,14.618443791384706,8.088026194330812,3.5795011262544163,17.02253149730989,4.025504930312134,15.105474146372,15.305221822237009,19.978628603850304,19.338105051122913,14.232350265522076,3.502457210511065,10.398953736252952,8.24121688460222,6.956159906798778,12.422579965794625,11.813814729216855,15.153490350637743,4.247090800708899,9.7037201230745,8.590086892521631,4.2724849223227945,10.081272417825966,5.189622591071745,6.894445192226577]}

},{}],48:[function(require,module,exports){
module.exports={"expected":[0.0,0.0,0.03694246782306887,0.0,0.0,0.02326364302888327,0.0,0.0,0.0,0.0,0.023722091593445127,0.042136211801441226,0.0,0.0,0.0,0.0,0.0,0.0,0.029349540390640437,0.0,0.0,0.0,0.0,0.0,0.05709492221659056,0.029243050016557744,0.0,0.017261280768104643,0.0,0.0,0.0,0.02073796018255746,0.0,0.0,0.0,0.017901372791320713,0.0,0.0,0.0,0.0,0.0,0.03497190368094197,0.03646748995646108,0.0,0.027296853415037858,0.0,0.0,0.0,0.022264470570351528,0.020105199337255825,0.0,0.18946414548002266,0.0,0.0,0.10447078838630686,0.0,0.0,0.016182626442615707,0.0,0.0,0.0,0.01674143971396373,0.0,0.0,0.0,0.04883989151788531,0.01965807241447259,0.0,0.0,0.01689964060100535,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.030396605753957674,0.0,0.0,0.0,0.0,0.0,0.0,0.047169499537997504,0.04970044870290374,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.035525097586739024,0.025186365431554975,0.019199010233813686,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.016139934636770055,0.0,0.0,0.026970005834062193,0.0,0.06388978458449364,0.0,0.0,0.0,0.0,0.0,0.0,0.05076100431204856,0.0,0.0,0.0,0.0,0.05395142219293649,0.0,0.0,0.0,0.0,0.020876867585293564,0.0,0.0,0.07305667811092165,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.04955324574280884,0.0,0.01966447556806935,0.0,0.02534158016826208,0.03983151464810646,0.0,0.02136911309986583,0.0,0.0,0.039882286179104144,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.04639167569750224,0.0,0.0,0.05038727291595679,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.028283214318621137,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.11764062161672975,0.0,0.0,0.0,0.0,0.0,0.0,0.02982567567839676,0.017957514452632366,0.0,0.0,0.0,0.0,0.0,0.044727909847728536,0.0,0.021837563313361882,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.040435455495731874,0.02434461239507679,0.0,0.0,0.0,0.0,0.14902163622448802,0.12530091489023001,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.019755614481388756,0.0314898991337796,0.0,0.0,0.0,0.031623883998663,0.0,0.0,0.02047347050801155,0.0,0.0,0.032875555680778414,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.07172846050743813,0.0,0.0,0.0,0.0,0.0,0.023247377969030283,0.0,0.0,0.01785134343882675,0.0,0.0,0.02579498387711317,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.07591739276622453,0.0,0.0,0.0,0.03779637703117208,0.01708623586861545,0.0,0.0,0.019002010819918463,0.021329782473094104,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.024269520667934197,0.027591618923492878,0.0,0.0,0.0,0.0233031035442759,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.09334594170616758,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.029062728531946996,0.0,0.0,0.0,0.0,0.0,0.01774195624280898,0.0,0.0,0.022702745217294987,0.0,0.0,0.02701365604684298,0.0,0.0,0.0,0.02882913516149569,0.019486372522261864,0.0,0.0,0.0,0.0,0.019096752765899894,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.046137221647206204,0.0,0.06462928800411154,0.0,0.0,0.0,0.040068951688971795,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.02525941443285588,0.03734240633855704,0.017708246371472443,0.03525666005428758,0.01731472598182427,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.027754555929644997,0.0,0.0,0.02019227683275768,0.0,0.0,0.0,0.0,0.016798710985136772,0.0,0.03648120490104191,0.0,0.15512859571937884,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.03534363703223825,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.05299080542917803,0.0,0.0,0.0,0.0,0.0,0.0,0.06374385013297462,0.0,0.018378174756578564,0.034648226861878635,0.03276063492760015,0.05193138967645883,0.0,0.0,0.0,0.0,0.0,0.025790269420672737,0.04887099545517349,0.0,0.019203422787533876,0.10499621409936376,0.0,0.0,0.0,0.0,0.025208628987537,0.1175897446320561,0.0,0.0,0.0,0.0,0.0,0.0,0.025657344554098033,0.0,0.0,0.0,0.024800109424948827,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.037613651325569555,0.0,0.0,0.0,0.0,0.0,0.0,0.04008390857031986,0.0,0.0,0.0,0.04828289514085235,0.0,0.0,0.026945664014537886,0.0,0.035430097833855256,0.0,0.06512596437195038,0.03994245126586664,0.0,0.0,0.0,0.0,0.06149852656468638,0.0,0.0,0.0,0.0,0.0,0.020001091930422453,0.0,0.0,0.0,0.04335273485748284,0.0,0.019185345087132603,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.02651461217403974,0.054732942360439386,0.0,0.0,0.0,0.0,0.0,0.02940717393850871,0.0,0.0,0.0,0.0,0.0,0.0,0.03306746748797354,0.0,0.0,0.0,0.0,0.0,0.0,0.023743675516205404,0.0,0.0,0.0,0.3335397846348723,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.027085001656466705,0.0,0.0,0.0,0.026566597780953227,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.02628816497699665,0.0,0.03268632921384759,0.0,0.0,0.0,0.0,0.0,0.016981250912645584,0.0,0.020512279221438647,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.02059293188407553,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.017978138080921434,0.0,0.0,0.0,0.0,0.1790474489746405,0.03144913853484129,0.029951094246396578,0.05383037158449575,0.060992113780023276,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0373262106568926,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0430999951955527,0.07620644506264795,0.0,0.0,0.0,0.0226904931340246,0.0,0.0,0.02619621997229586,0.0,0.019025275064738015,0.0,0.0,0.0,0.0,0.01676658946360177,0.0,0.0,0.0,0.0,0.022724062498113182,0.0,0.0,0.019143259667584366,0.02640540112418124,0.019382256054110973,0.0,0.030237130837866746,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.047587874344952076,0.0,0.0,0.0,0.03014028061281991,0.023744267979214764,0.0,0.0,0.0,0.024914593531841427,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.01839472393480402,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.03408873112559055,0.028112977123073223,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.017258495545097112,0.0,0.05156834529216526,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.19071424479618732,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.031458555990415214,0.0,0.04810907963475988,0.0,0.11150856118701216,0.0,0.02119863915973,0.0,0.0,0.0,0.02325213755750039,0.0,0.020430426050173037,0.01920368926700514,0.025565692993976125,0.0,0.10593648680449173,0.05853240196386764,0.0,0.0,0.021440534349249914,0.0,0.0,0.027873566346458795,0.0,0.0,0.0,0.0,0.04727439876256211,0.0,0.0,0.0,0.0,0.0,0.018796167411826124,0.0,0.0,0.0,0.0,0.0,0.0573265112046782,0.0,0.016828981753444907,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0261858483202442,0.0,0.0,0.0,0.0454949953969598,0.0,0.03060032380949686,0.0,0.0,0.0,0.07003923233456791,0.03637688926689651,0.0,0.0,0.0,0.0,0.0,0.0,0.06523264694733363,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.04037412884027446,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.04048047315547264,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.041941142659815155,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.020788624416784703,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.017722810449583314,0.0,0.042313773574217665,0.07693030725782653,0.0,0.0,0.0,0.05159673825445113,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.07275543164335936,0.0,0.0,0.0,0.0,0.0,0.0,0.08165969014513,0.0,0.17368013441437813,0.0,0.0,0.0,0.03996047950111378,0.0,0.0,0.03380399038407695,0.022652207442392183,0.0,0.0,0.0,0.038560059185655825,0.05345433515510734,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.02344632361714719,0.0,0.04544179185091646,0.0,0.0,0.03178744026764108,0.0,0.020540574370568325,0.0,0.028522485806069448,0.036590195711154086,0.01986653586810281,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.03047634955991657,0.0,0.021991319573621906,0.0,0.0,0.0,0.0,0.0,0.0],"x":[46.32417280498275,14.398905703105669,17.964668474836177,41.32616940230178,45.45743485423495,22.38981508097082,74.68141644247632,43.38418234743904,4.12920772433869,40.156065130363714,23.748829527435444,11.81881616440814,80.87903795447396,52.754246663779526,40.44169096457002,80.11885876665306,90.78595582238913,28.84986474096316,22.869307902780612,83.8813142075551,41.31912706839529,18.517719836492553,30.31944896226635,94.5772527283765,5.149106733944309,16.023510012133446,72.981980934337,28.15706544527885,4.558721997304449,61.835625509617344,27.518747181499293,34.61946070892632,48.66182685235649,37.7346821773431,74.44558188284401,28.81291680426099,53.79228331034342,42.423872947701156,75.9389190763533,13.653433194132635,57.64777901997871,34.76855953201032,16.199519955433583,46.38717072620837,20.542585760371,83.62646961792768,76.53976807301497,81.49081210218063,11.930504333137248,34.01532469058017,31.48524882525685,5.9581412435048,49.27791523231282,90.76923982550254,10.117432168002871,79.96930689281405,71.00025189989326,30.273048016937864,90.7304226303718,46.09098275113786,88.069804906772,34.635767529796894,69.65739042079993,96.26478857732575,93.27711397227603,14.452716303920488,28.15881210365061,67.26162402482994,26.917732498609382,18.80349979238989,0.5579047293565509,5.3220386431935385,65.5519289564904,95.51052303512064,57.50910686648767,77.49801420888163,79.95309678746266,48.46933699480471,53.04340039950173,19.170596161548215,75.20956250513342,54.82432865749303,67.23573798132536,66.80053489696061,34.56758264951492,5.7540985962830415,15.74445958110411,6.271948061482147,97.07414328890336,53.626065174497725,89.03277423286917,40.30841336781958,86.22691242072982,3.279320141885411,46.93676881859486,40.813153750700295,93.37010705428143,75.03012335009551,55.76685645008277,49.078881790900965,37.68763423839761,16.34748018141885,66.66410761286829,65.55647863401535,61.050806338118925,5.80219507139621,88.72934561289676,81.02596756074718,51.09836781596424,50.95277484893421,93.77306457477519,78.7261438799989,25.38605713950084,70.45175284518028,91.49297500295856,94.47257207361528,26.702261881660384,35.360672923322326,86.64448874961525,17.255898323398977,52.32135009857568,15.708160698897423,33.479505514674976,79.3105276693581,14.216754799401855,59.69552526971786,59.16760746773924,34.8431546911808,24.504309946923186,3.584314254309895,69.04200449184188,4.490501997192209,72.96185341552726,45.952378156259435,14.967186769945684,68.31758515586361,7.728330431629948,39.042566943554434,17.160586575078064,40.51924389086068,38.800492153490836,4.194524361666341,66.14252791318683,76.76898147359428,5.607590092194914,86.40048885939602,53.518647338363024,85.97476134709177,40.97105866026129,33.74725831777432,86.04151373938808,94.13141605265905,8.766391373032722,85.08904494813724,20.0244084262315,2.1829812905841184,24.18569965566877,6.872890467217285,17.355037894534874,36.68303839411684,3.4126840806188996,56.01045902438129,22.009141097000118,85.04301573574573,91.05706765748118,37.61127982720498,30.915766720919848,35.88550676078188,64.91266270940635,9.708051933651362,61.41898602606315,91.2664676467092,79.34412433671214,52.23158721599928,59.01315099595978,47.6040574447238,33.10002935763734,84.30890017833251,52.84028727862942,59.67734996168525,67.53687141912803,16.7477029453301,83.48945802745895,39.798689958512476,60.050296773133674,0.6100617445002898,95.11422952086501,29.12911032563703,92.28505659049802,89.19345806005845,42.18446038068788,80.49178803576527,35.15012913343867,55.17889928762229,88.61950347495227,63.74689185937208,67.52769860669375,65.06951300828723,62.71092591179641,64.82314840891492,3.846918312704606,18.44127445580661,93.54330935385843,23.429303025993352,17.139783099061702,65.44640298032593,70.36492485668893,28.455678823112972,90.13285946264342,68.83783499561802,92.87903009721359,28.373977766216107,15.68232640253151,98.16671770886782,93.4360931080944,10.645798951247464,76.24163654833308,9.199922947907258,79.38749228998168,64.67819263424121,38.33076335204639,35.58352788633214,29.304188334862324,30.505839458106898,75.57960815991696,1.2366740569875079,82.68929947922801,89.81097724577911,79.25207963723852,18.203969222621687,22.55304973108354,8.629064277209775,23.902744929853338,42.394243438479904,1.0661404797640328,99.77675158240177,12.673006407123832,87.45908915500213,9.92934949513593,72.78527803662766,95.32941044685033,98.91207230873052,14.976649082505912,34.1723517936036,84.72052281380338,44.742127455775375,75.63635806759497,88.39186523075703,19.068499527485084,20.31049122577644,41.469634852416974,28.75789657256671,21.308810659770817,77.38492802086645,75.02281423440277,74.74732483357313,99.36126898192128,46.22729436492175,93.69886500260772,25.240778604448,7.537155469077517,34.61769642270029,8.86316646385814,71.50702950561625,78.81664905913684,29.52323752961985,21.614549908508906,52.914879429960116,56.00191608941325,20.923896339631852,53.21841354405081,20.729863895740742,39.41431029149531,89.00257320899712,71.02435076066114,87.06769708358652,40.75509148915499,63.18456413342548,31.35789533932336,16.647042461775108,97.36616540277589,18.795663228344893,62.30834596835988,36.462160681075616,93.8852161755844,28.88905639499477,73.03326297369806,29.28587436276633,3.6206458193996705,5.889553099437794,41.47093276986848,2.2512696440326385,99.68653526107558,41.36887728672831,63.970158117215625,1.6911700343723357,3.2606280403752796,55.26956181278309,61.9073172259927,4.653361354135255,66.43783685753934,21.755897275764013,71.67326578142767,13.160978688983182,83.23756194806342,80.2005718167655,24.579685925731432,18.96537763080801,43.21052667104463,36.1039865434275,0.400171452429543,35.63428699718949,22.873940002138205,92.33715493555891,53.33624573708444,46.564192477591604,81.88688277221483,11.333167123059141,76.21221468055579,39.803740650907706,82.36501033936601,63.06330243272198,10.298848195136024,35.20068284197393,22.957632967212938,50.919237840752544,64.0993674201676,44.258458712623636,35.06676183495194,95.85461912722153,50.86752698772694,40.02568347944759,46.528735574520795,85.50087470378982,42.162979047564896,49.72076384806199,69.97399836752862,61.67959902962199,67.62652953177329,46.38491597435126,53.279755829161026,50.82553600232673,62.32370583422806,1.1082223770146227,64.62831053171641,9.353897275623236,47.8534379678593,54.30666870576586,0.5598928662390756,67.2472155130442,26.043357672543266,32.16011603294619,99.92422646865276,15.63194124083649,95.21870582878653,6.388987654400902,85.41703371438021,17.47638491618073,4.5790969765511,72.9267846060728,26.91074348074427,33.11929210215916,73.21913698403483,17.589428849302415,62.83286066243821,48.59704672307244,78.14541480818693,13.289979092013017,30.348635371276767,40.953587295919355,20.832641227132175,71.16176202944833,76.83820878094745,18.306592189827775,2.9042173418388106,73.26625364686001,45.97198814079522,86.93885519333766,58.90744287390122,46.83965127299783,70.6156676594807,98.07148280316511,23.958638316171378,44.45190679890396,92.75890753169793,41.891130143482805,62.21827596521652,25.017479448605307,44.65379195835673,41.547193935118585,14.169674212476036,42.14559197574974,23.11768583687579,91.1450576329489,40.62651158814747,84.58950325419501,17.864974572776717,50.922128407355686,21.524140443590944,1.8169432099724103,34.471464031567756,97.64992072396235,92.82819738553869,59.26099022970379,74.74387477606163,13.793888674176502,72.11052005597018,65.42816800179988,52.32238946608248,10.59999796536204,61.07502122351774,89.40538397610366,98.91452495223373,64.16851457741055,75.7723673530933,97.65896043104851,62.62552243576221,75.54248183665445,64.12427274971047,82.25997230649722,83.93950457685872,36.767590411978965,37.516881107720266,10.11240622222871,26.778226961499495,12.245763264295896,36.6414992725663,0.9401540607233638,6.029589645955236,69.20521849535403,50.28931314514074,71.73374261328401,47.968778592402785,64.09834055900177,40.81158208600917,27.740187787947402,70.96380559415849,16.129887943164654,2.226407731495139,71.21455705215578,9.510963444028242,49.03254073142052,32.73395860573227,6.87189633637415,8.911595116120786,40.6583708170533,14.538867287213652,67.2724334386446,91.27664017387727,81.82189759004686,57.2271818137237,82.00501016475283,20.379422753671193,5.54887028982729,38.02990582279442,26.651615677103923,44.182466675091206,1.2755220097938835,64.85305669265131,60.102428563160196,91.11562836555167,2.8197487031837998,26.16401550568501,53.15221506086012,10.858599833183513,49.043625957675644,67.5606382968529,13.779679538811585,0.6374129989111799,60.22236674255803,6.985921017358199,41.24028989929225,33.35201861980388,28.99355682958673,48.06501129298868,13.981021159085882,12.302182788481586,87.83158268805555,3.42595370407921,52.32390836244778,9.159453670790763,90.87210513029346,8.663457868829937,29.441446962698393,43.72980216494151,17.024257054225412,21.285236281330388,68.2446652010604,67.14806584511932,66.64414613210054,79.4267486065495,22.389117444997275,16.82737863625472,5.315260120448673,76.87319286361954,97.27591149909362,2.314934671158708,83.47595775914738,1.1289489699008781,22.27182890819739,89.74284181797896,62.71026033738642,79.19265680000187,11.202433939426726,94.71185177965327,13.98147374691674,36.51666248855514,89.65953819534937,1.8388763707728906,52.75292954464004,94.40787771005094,50.60893657235819,13.005497691574952,95.46069746264561,42.90091930231385,56.37787771680789,68.83554726888867,10.343738167940941,73.37975328428283,70.10346228078113,36.98342517823063,75.71281798203893,39.50248747340939,84.47524015279531,14.62657583725182,32.71922684513848,64.81893671056538,27.192107115264584,7.685020719364433,59.13610144136226,0.6401418253186852,11.965555507550896,83.64705501316499,17.391157117540267,60.96087809539688,12.481166507014517,24.829292640831248,55.9095620722144,99.7671361580815,91.85586573671975,36.44962135859136,10.854705760047722,58.60438330130011,86.33796516204137,47.98146964713632,6.45723095072166,45.798306191037305,31.686724404062172,25.672906762647685,53.04653034613382,66.36135029680948,37.725818541345,94.14666622811325,24.328499553857654,53.9508220677678,65.94590138607981,39.212264864421996,85.57655190295725,58.337317475272684,98.26929346829836,94.4027168615507,25.829213811718212,22.291841595161976,70.7972269327058,23.232399982886488,66.51080993928029,71.48399907924285,89.1918250364241,8.116298620206152,81.67172402822082,41.879139867442426,81.69315649628118,64.01002877536925,68.36761352766192,83.34779115136153,11.971929439085738,78.59026319910556,82.58244834976833,41.59681863038982,87.30164947473091,35.53337722000796,52.51012411690501,26.13821095347417,51.43718347243169,53.831660777827416,55.96505652678949,1.6945227632739535,36.33294843667845,46.663251653344,90.34040153552012,34.430525724283086,69.32161504097584,22.813885254469014,49.488891507418685,35.10407069477219,72.60233891828267,20.913547260173825,16.7959377685126,20.550074018276554,80.28082648386467,73.09221119974379,56.81250181415918,52.68618991354612,55.44251798630269,92.22186479951525,2.5644417409995457,39.29682800603056,22.8365037732736,51.293398294485826,83.5006330876555,12.40451006161869,75.04306199200921,41.95636305908101,78.22484403710443,85.35909047440602,7.869036603835489,69.10537622656898,97.62269371072712,23.29204181801925,63.67337285941819,19.24912590113994,63.74397362312594,86.15598470066665,90.29089333577367,83.78867418184566,89.89077350635239,75.46610420777657,91.6360848840419,3.348457166332297,43.79029931676828,55.49069793893082,10.270336780522737,66.89697926459914,90.02381579039658,75.2049150555703,49.13738517635275,27.764002272255482,35.15357979596288,12.97722777698782,23.612640977498888,98.36726527003012,23.143701509206082,17.60004414736105,47.17207149100015,10.007441913248606,35.851503881211414,70.53013156826273,9.997678301134005,87.86401238451327,70.92264802354774,47.76055144481353,77.09637814429145,80.49027380428946,29.846316225000646,8.537447204576875,41.419319520581396,73.76529001899308,78.02846847392343,3.788457515864563,66.22743316336728,5.122140907769479,38.931555348035275,5.2410735685709975,65.30620276737895,96.94089569785388,72.3687231265019,17.99352334344768,30.25364949913847,49.387472260327094,87.9997638082564,78.2887719584964,32.681018542373465,31.025284459173697,48.73622706925331,12.395932670999098,14.03824281810846,21.019344555318863,64.53209121489556,63.03174697595133,58.50382696960366,90.74990680347359,63.84487464954907,27.015738620916107,70.27204466734321,5.25233391099702,61.947959329585835,16.491875729705985,75.02852997217337,59.62438348927135,86.95884809577778,92.3192952413607,87.5760725793159,66.63581241574003,82.22319078202906,51.611793306461394,50.068525332625335,12.778246335352407,18.100837762742096,59.33695107594463,89.66643897791278,87.62383369860542,29.173604709286117,41.08911097813825,6.3641309426900605,20.964972587259687,57.38139475407975,22.96817276031058,98.14149887715173,74.52277532007558,3.195573265558349,84.97413059999373,24.895594888713624,78.49077091601745,83.30352163582944,62.05883103590342,94.61273133950922,21.757402923596935,64.29609758346528,90.70275913876216,15.475358515295268,25.850619170317056,21.74635582841189,66.92102156025439,37.70893204831467,68.1930661870498,66.63383317444209,51.0422308881354,69.38570443464931,3.3596888113067713,41.15667673489516,68.66806881983078,11.410437873102964,28.473514731086546,55.41526696151698,17.84280691338338,26.9395171378503,46.3372804494979,33.34336099166486,11.828284839584114,27.51425104940395,58.63610557486858,45.79308663656805,40.838043043857944,25.59600525807635,50.59356797736232,42.52331763237098,42.88616742624609,62.7110415143862,53.112626855554645,67.73505303359417,25.743971794490882,14.303969909337155,94.44849939196156,70.45344537022002,27.244687637884834,91.49029112975373,38.97537644925171,70.12008125170988,57.79549914338167,37.71545748577516,61.30100804735443,92.5758118068936,79.22889273580492,76.61871890452514,70.95468102146623,49.002147039405884,3.1690499269019012,65.339498130853,77.83558662610686,8.05213507765381,12.095908967955094,52.239105989671806,35.150391275038004,32.27019888635447,90.61328880132142,75.91558531969531,11.998300907540305,86.54628016119992,45.85089270921658,15.834373777092692,46.83153798541464,7.737796543902231,92.66839193822796,95.8001713042734,12.523265875675005,54.57851576456656,41.97810296932503,84.43896190331172,49.67882625820099,44.68473532603456,86.7367438465305,98.38530276136323,12.637346170280605,61.19072325928037,34.76576505836944,97.30247684114248,96.05805380245585,50.93103823290566,47.193520967373594,39.68399623509973,31.08867004674616,20.24615088092796,91.3121100099838,16.694019538011972,76.9268145642406,2.6223958349447685,42.770336814856734,34.83132172277117,60.64418444211945,56.56452066709645,41.64207831071658,16.115507785603178,14.790486496724364,21.46053550957825,25.354076960215632,21.371552722043408,53.18355243174682,6.470292878474759,32.146412781293044,66.0662693485083,60.847299985732704,24.159297078849583,97.10041920691485,4.260351863939782,21.871432225391185,51.68010294137137,38.26771617499236,80.88664470811138,69.3438755375749,5.792632240122653,49.07878262414948,66.4665656047266,46.008251535902644,29.22760395168913,51.20445636944997,35.923212674015815,4.380417099498501,79.2011871674863,61.49421099758163,2.514391821670592,9.579586458871848,30.201178157653107,49.79786018921004,36.721544866848774,71.80553928702682,85.27918425900198,49.43385163961944,91.9814582412185,21.66050691552379,44.24552272725919,48.99235099550623,99.56810285504103,58.530989777684205,94.90548657973667,53.02914689606093,81.399020669754,34.7942048013816,93.60281551164209,10.102848742587312,23.380761573951325,16.705322228044484,43.649771061412764,6.116554875012459,71.60306071532987,87.64210945710174,65.38113901933393,30.50997926178949,26.605351592532458,91.76291047777853,69.65133595321211,87.82828104193862,19.84888221709651,57.5764321311546,88.48108107546804,14.114847417648635,85.432226960273,51.62893194816225,52.71048279976955,72.77640871296222,82.42634942244776,78.82034794013286,93.69253535327302,66.17476349047979,33.38327600201485,57.09003254919687,68.19098886397536,4.791151122105908,65.79522191546252,9.23117522523016,79.36686859437265,42.08965206040973,70.64692627399307,89.05506179519843,75.92950456616887,65.02030445718243,34.178275962223246,45.59990898616728,88.54736791269455,24.100729666226606,52.955662846391085,48.265543447901706,94.78558603972684,82.67460097746324,89.51970594230019,63.672913652944764,70.41085073233397,42.77815927423718,79.77418873469423,20.32362527873792,71.89267709277456,68.7449330817619,90.06706991782303,7.428699293874597,90.19167420544274,60.6646451633015,44.56188874948974,18.598239897207126,56.7322902399586,71.77273270039959,0.35230250400271057,59.14585287776539,43.88749645717924,59.687370461682065,77.63905493003887,21.987512820319722,87.00876169071594,20.49966480794465,24.418071013189845,49.71377607939091,45.913984338610206,33.818054875302295,5.257251261678131,94.96923627115214,2.816993922549238,45.19087098829853,90.83614210400495,34.84323528656819,51.03342254468301,69.17414019025246,84.36928702447433,9.513382364121137,3.97769909292387,23.00115318130722,34.97841291510153,7.489368400935792,63.08163975280125,10.303446392872129,67.38412990815765,45.2371748292375,45.093139501680504,2.193527121979444,61.33003853230281,27.186571052213694,95.76961469456016,18.245697620335967,77.11599830247997,92.17231909764745,21.66088179085275,12.218423138794886,47.81871344783117,58.8968693738068,63.70187320178338,43.62267756086376,36.34177291088356,96.3033898582389,63.654929176945664,80.15252927181655,78.052361922484,8.788828220501799,99.25412271985195,39.86237107508377,83.93703096181741,25.993538749198898,55.56377588902621,10.615327873096202,42.22206947081049,95.98135482618319,11.001446649242897,64.43957420526476,23.296469052124436,43.20121496345828,28.86663436086514,28.740629940751194,15.76261056813857,99.04097338175355,58.312910380126645,26.95899302965823,31.81612929119977,70.1767527709805,42.88278846160958,56.54491061375859,28.185452345651797,51.61465801803451,28.071261845622498,69.70932207024,95.76128883617368,59.342309111546584,96.30731970337061,10.652554490040611,84.92566154464765],"b":[46.099928125081846,19.42174410402918,46.12365972197019,34.18823936366101,24.827676984062194,42.18417699368028,20.85346672704763,29.475444320621285,17.590295387702458,4.999020757624959,39.967100297897034,33.67211557386667,52.93644641469276,18.769614989397866,9.667958207475632,17.254969135611162,36.78933804933213,27.89801228646136,43.53658003832602,42.93595399678762,34.96335825172582,11.36097796415784,22.27523853924497,36.19438256250106,15.579982543424716,35.1715992322312,36.396037378769456,42.0615187660705,35.92838112157352,20.704290969242606,20.879099049341153,43.47291365664231,27.91264400006028,30.76445424405373,49.927087349903196,40.018789246136386,34.485392808917915,35.216740911231206,42.11663473775986,49.53449939210553,26.94574034785142,37.8337901342623,40.324434289157,32.295987418436795,27.740970481260568,20.736916515833215,43.35832847631994,25.40591517583039,30.241623827364194,44.031278795587234,11.758951154721391,26.87452700696929,28.21222699650734,24.36260776304508,15.2040058421378,52.76574214897138,32.83805055320351,49.19507560691486,13.05168391163762,4.807365221639488,56.46759521724309,51.87599451499146,26.200574965914704,44.67009452189251,50.02844738324673,28.039306275106437,53.431522670233754,24.68359859651808,22.562554739739483,42.6578587566807,35.99920229258313,22.586757383636787,37.673852514374026,38.99055786154423,34.29081387774512,39.5972243227871,43.08875301480338,26.822702302881893,50.330446232650075,52.140454060506585,19.798446184038898,37.233083467685844,29.319490252681753,18.736011325732626,17.18363418690389,44.02018234092054,28.761271201760607,25.770560468950016,25.792819326224723,19.07629878062813,23.62108575219034,18.457570001586415,24.102959613983025,16.126556237950133,31.965598210281563,15.21752294498269,17.050749267518277,41.541124342795946,34.55937408361778,51.78545405663665,43.02665357819793,46.07521570354993,19.181473570898277,15.43986771594112,43.10880290162971,40.27266427613406,35.4201766224508,42.000473074478236,35.674562704754905,40.92278640826093,24.80219653470239,24.963241907939214,21.85221799712086,38.059164294811126,31.74814539735489,33.90008935064904,45.47244849155535,31.713122815371484,30.19654376903123,38.15254754726277,50.81431150048915,26.17104771865135,8.111070915656725,39.29653133554166,22.226976853150518,26.705225306881125,52.25148058911567,23.5050100500722,26.728825231288017,30.55759153682437,45.74152234252461,38.4568472503654,42.80481313810307,47.19028532880836,30.018016843919032,30.789927696032734,52.917251399560236,26.536113738720204,33.91374156623446,5.671261926439808,21.595729065679254,31.379334632266882,39.58807795603747,35.96343057243548,20.08785776246206,41.6184761788376,3.965959418264986,48.60023476968737,23.67148398748649,9.011914974203101,32.23068272459678,23.673862605292342,13.520161682478697,36.33952282099591,35.644557818261376,17.621831042939572,36.23350877837042,19.010330859666634,19.558406274732583,49.81452804028817,19.240115659294705,53.24162462295253,43.831454128983374,47.60293333272263,46.147413634859745,16.00251787920568,12.297905931816228,33.930309367227494,34.02252027045179,47.36015978237465,18.054025235106796,37.384595146714986,41.06076992204763,29.500993740635302,54.13166963123934,26.51994134906643,13.857532631797355,18.4760860491216,44.72516093952204,25.298777722073634,44.667731393695306,25.191411207952505,12.55126134774175,34.30566069595614,37.906145991961885,10.678701088884551,30.71200088788966,31.681742198853307,26.81305797005805,2.0554039887040165,43.48687901604727,45.63496396194159,10.348235559018981,18.12176804175359,26.258457984686828,34.84657676147329,30.758121963407866,36.87886549868468,37.26389187156015,26.788920447375276,41.106770950298,10.195008401852803,37.245806738360514,11.47725978540243,33.0365847981074,27.91824979483548,9.652039188546947,28.194483907346466,23.899944312181006,43.538085406423065,28.405182237536557,19.812534153725547,13.893000419413575,22.104555896759393,18.850722557799845,11.917281990761857,7.358682372119896,6.463910522441889,19.54906553745341,56.93209656218757,20.366843779189917,13.624542009642656,37.93708953279429,42.214172722483774,29.86111451611924,41.760843514100685,22.7057735271566,20.59153792342606,31.353647395320582,24.86858322101154,18.438412723262203,33.80302872735877,3.2448876836336282,7.275614388219842,39.049303235413255,10.627738399602983,33.434308860370805,35.28423347921595,16.119655676480292,9.029198009576458,22.14078282623952,40.75518858794133,34.646879945417524,41.12209912000276,40.56485492714545,34.90397148953174,49.84520488532435,24.54230560046581,19.710610848936646,21.867260726832946,36.70303188022735,25.67057891802721,20.788144604046245,36.1047537989864,44.228643219296785,30.090953485067097,42.40175942755128,38.17247642333505,29.273186279272576,19.565134684811795,31.51531235490976,51.34622568394598,21.316559737887122,31.902644006713338,39.13545317859311,22.353668877194842,38.90998635324652,13.565519414285928,45.78062608566923,50.7368533754129,9.472131073034342,8.697104013309707,44.18317153822865,22.631530141056096,48.55733385833878,49.27566157080025,21.596957164904765,21.607008147089218,18.81233459690832,3.5479458064728098,32.808310091517626,21.40309827451345,30.91006077001414,11.059216873630437,19.68051580970654,25.755427824070757,15.459582531717935,42.243029762905294,52.17227190169709,19.31415185231082,56.00887424748561,23.737582291568934,31.699738925397593,47.49435917894169,41.33422553727358,27.065354897768046,17.013772985142957,41.699516265044295,27.203446365741925,41.02115697607648,44.925650893100226,4.744679182995926,38.2286021594716,16.4116687520656,23.22062023200322,8.415284252183564,20.2483020761243,23.971544655533545,57.87656532351345,15.696177361522338,57.186082825067736,47.091193655220174,39.77856361486064,4.736497827468655,51.08224975371688,33.02655576917803,20.49598291042615,28.28116842746973,24.260258614494774,37.56678403344828,39.97337641905742,32.97121738967673,42.18614229169653,40.67166308388824,34.50830556083744,37.00596486950059,28.103154090288765,32.42010769268146,43.2129636014765,23.83670180754997,19.882798481527768,10.552827251472925,39.39998053060807,27.043794858524336,23.28343144298229,29.128421709567146,5.061551773154571,19.031923342646515,17.121208668284027,38.42510762686448,53.62005478171016,37.481503204154116,10.291676957679584,25.253729744150778,30.79274514022935,22.843962192302314,22.105601930352023,9.34470646841779,16.659491181571507,54.500436976078845,22.416020686576505,38.08713396996659,9.762601476858453,50.84291401286927,55.6923209083908,48.92038642668507,25.9206765913709,36.13617405822281,51.86809779594739,31.685879780674544,39.94772920626153,24.0345477751023,31.359010996931524,38.048984575613865,32.95397866418213,17.005553507319824,40.0290254844627,30.208505710186635,39.823845053486856,34.907438830244644,14.493035897084674,40.11968053450871,36.46239774413711,43.760827677925505,24.702542516786565,31.92779823888873,14.509126397018782,34.54843756111936,29.507953051273233,26.345716490374326,25.72545460286821,44.63743878339469,20.94755299789241,27.174372539245987,45.896849315200896,12.650106270572806,33.234595059978076,16.942542930716918,17.07610687016857,36.4090885711454,21.07329057919084,29.60133275233219,30.632814317654827,35.42573991613209,35.767310961635445,55.83095738766801,38.051036596277285,27.292244486096884,17.280441777174595,19.032341732524184,27.31809997122503,18.719099329767104,47.11252829109431,30.92133915482424,40.80466326100143,21.657953602507384,40.509595783663485,10.988638188232493,43.92549946409484,17.174770136909014,49.72370497020182,15.4320172404455,30.781768100694066,41.63869276870466,15.306371417403547,31.040960867297752,31.9631348162435,36.80711089438259,35.59340306839397,37.901176043693646,26.38780914473042,32.25279639377974,43.22980497838319,34.85526897898713,47.066400409230575,23.918139878043963,53.282066405270434,16.36304733445895,16.75441680812235,1.7351674956117291,32.61415937325373,17.44972681155407,25.310308128861244,33.10880981030228,44.81976739081191,19.24136558314128,21.076326198290467,34.73096526735592,43.12138838051527,34.73350910009623,41.33146466428559,41.313960565146104,51.86625175909931,25.302062475377443,18.112373464092922,14.676330134320565,15.802550446834562,37.899395247853874,32.994055747373494,22.285741335390302,17.157332648584113,49.232006225224865,13.094507151503652,24.86755182694848,18.632169211842616,34.43656491319851,34.87199600000325,37.48350628225391,22.979276117613715,26.582631695669114,12.918397302017679,37.088881097356015,13.653060285907529,25.67321320913249,23.584981105962655,35.66022243187355,15.375958001094876,52.520032959847214,33.603457981399856,34.008938147434264,12.965320523389368,42.38332570426052,25.64721156449844,47.83497765342106,50.669552278084495,26.54140689372413,24.198252139377313,40.69405953579548,29.199994974766412,34.13882909214875,44.24807575561023,37.59245274250375,36.8839404157183,31.48957695051554,15.997592303999703,34.631425768735525,24.079285361134012,42.04826843290682,13.747135568502472,34.34934935295841,38.337104415723815,33.33496787079426,34.35244527516616,22.262071040797462,13.530830944041966,35.956346470702975,37.157242135666245,34.753474296947886,29.25707926296856,30.0247895199145,45.46529018118576,29.790179824004856,11.365164352294133,43.49737647593092,37.159796028589454,38.32846362237331,17.114534982316467,42.11362140626689,37.78024961941597,33.2569453230688,37.1160202740924,29.27353443414279,50.24356568371741,19.0526077684083,14.709910161712264,43.37130285991151,31.70937334199259,39.94370103581243,21.44680742026991,28.940865450686523,22.169806493393935,22.231825906187282,38.539710820135056,47.7293455670375,20.14166405393749,19.69045731460602,50.69939684532312,20.155071850637555,15.657337424976209,31.262341965662657,15.876527019688362,26.38100852667462,16.70115924700061,27.215344440802888,45.07941371445687,23.385366655619517,28.659823700973497,37.136276493099,42.310011342312286,33.67945446866199,23.83551071800317,34.67193486858775,56.06607746005491,8.808637344093228,47.369512168348066,25.56527699396665,38.67765656663248,49.54418330929003,25.008115527029783,38.75994717833704,21.84655866322343,40.61283730639184,13.498987696290312,49.71029451752659,7.951164115142406,31.34230473818623,4.61527394072911,31.792352599357322,38.701952350943415,12.679393458935278,12.685149889103698,32.31507507144777,27.39223513893557,52.355741210030665,19.01937052553469,21.491149728209983,21.904715373171946,38.844870893901565,22.972989536687727,18.10401985082865,40.67430862376701,29.36900404031206,50.385910834233165,24.645210853272907,6.654252713231235,20.058893712484092,13.610714066393012,26.538084849258755,38.11173528900102,16.94288926732944,28.242455972986047,13.639432319210293,49.51446956863646,40.716788455288494,22.406684546611906,19.913805928219254,2.654348102094213,31.847110438385617,4.362290586705773,30.765052235701663,22.29639909960483,30.150417363769286,19.61674271622019,16.950216032344024,14.796631684515903,3.792125143775289,11.074237921201115,3.8313470927626936,19.298303498928853,39.1045337021806,22.242441722462715,26.563805982505865,17.90104947937671,29.5855937365686,47.687821519843084,13.926153747628085,45.233649010094126,11.804620442524483,44.090817268835124,10.096389846354779,26.408755236080005,33.68676459208668,31.60768380622566,16.70018091037187,24.443433464530674,35.72894751743255,26.97076393274471,26.708115330515277,19.268588324038127,31.239614623207363,15.717563634680927,32.02777492581046,18.66741292073069,26.414671945411044,32.886124582348145,41.198123274031474,25.073704044151736,45.45554312943126,36.31295780231633,48.84232082848477,16.831027342522443,23.19900554555883,18.988481094706913,48.59355816658127,13.521824927252414,29.024137910144344,5.0643514115201915,48.311512708378736,1.641034397903085,53.284827997557116,22.659490684850287,19.901611332804208,15.922550882650697,21.384474592307203,46.938879564312685,24.76396173152335,29.231886467051254,54.462701781918256,40.92933629108164,52.74342257297661,32.16357110728276,33.36494379971887,14.97912977181418,46.2127671174792,42.15754511647066,35.519869926076126,28.30973407366951,24.59026369225576,49.04207098357541,15.83479118795809,25.036713828406548,17.39523679541555,30.695610764212212,32.263887905720125,46.63836497302086,28.560199529482432,38.71329517905241,27.966000409870272,33.31672782871348,42.7278131184023,10.894782357325461,32.80617953795777,37.39158566705093,51.85163823783023,33.920493668361274,27.942130206913195,16.559069354670676,34.595633721922766,42.54119990654344,30.545570994183436,42.77267910316968,31.54106124890177,21.79834986859215,27.517705741270994,48.894015601166174,11.506578742293202,41.43176338338449,16.63009484238283,28.303809579615226,39.21645192199875,44.97316853238355,8.68069099957076,20.06800101829672,40.637712953778454,30.48593357306195,38.23697228265554,24.03747808093389,41.11759130344433,29.7816409706963,54.513145698490575,23.789226968799152,40.19469099749266,18.63565596535156,15.348193117916585,37.81094278470598,27.846892386141246,37.54097768554065,21.791132803444285,55.87742903271035,35.374181497808245,39.825264212126164,45.08310896510734,17.591438407948147,47.86878983571145,45.997188546960786,44.11134405237198,44.34297578296148,15.180913209535492,45.15363174850968,35.667350926329966,49.61764229126281,49.00149288043198,35.897532431054486,40.91441731178261,13.94284181350037,43.33882395811452,32.2800235441066,52.24266744923629,51.7712369829794,15.46023370639341,29.781758765476923,19.596132379604285,14.269878532283702,29.581561663898682,22.804462623364547,18.44521400778527,44.55331813381605,19.942839202323043,25.902201289596235,40.714461326251964,44.88809363546566,35.84835828245704,23.23154660597174,33.3947701273614,33.28804581771774,27.52337095075611,21.5474853195961,18.662503258141257,24.54045834966109,27.713247960590948,12.844982719877187,46.551222792540806,14.05016010856218,52.41576668822159,21.041012568688195,35.12343300619267,15.984535983493636,34.65430681005357,33.23717721776661,53.35504834622531,36.6919331022312,54.13087613134762,11.323691815956867,36.109611957035156,17.622928105151363,5.758465369953796,36.27642258004564,42.93423257236146,13.513864459443194,30.180612470654705,22.829320807451822,14.393681856218574,10.852066254564768,17.2904133970614,58.3547667477186,18.186664040649006,29.553064772602312,20.173891652650507,18.789334301027345,41.6602499580245,46.294608709477124,14.90845155350451,47.831256407259914,47.113557313742405,29.567922599296693,18.712232876770145,11.568193255908868,40.91528656029271,36.384305251496926,21.48593182460345,50.65189270670578,7.567738593040856,12.998129098220264,2.7177053833978304,12.504540313731782,51.60076712839772,7.942480495457205,41.11480031669376,16.945520660937433,36.10010633719246,19.918844626080567,30.674494768860235,41.06247686141575,26.480902229600755,19.99692102731916,9.476777798362757,35.535023966980575,43.72965972598881,10.628148469087018,49.9893974068411,37.03478540056543,38.385700721827114,54.8144882292527,33.96242766640211,36.24339506076352,38.313057905279955,33.886372782690586,10.642723655418429,33.10467790965704,9.462442007636387,12.433409864089944,48.208512630565586,43.51771963228603,27.620528440769302,50.81597420319113,12.615959625741354,28.414939182805558,30.59933558569807,43.94375901742764,35.820614107396736,38.63379583850586,39.310622283736066,21.34021284416424,8.4385576583602,8.717079793657039,49.30095658429519,37.71845161553743,17.597825066727314,18.329304813287717,41.671981547343194,19.56177869666936,31.267846105424926,36.35953031529698,55.48029286641269,58.156740793666074,17.219368182272547,20.823969017306922,17.819177389308102,19.90458192445352,33.01797182479051,33.955812440154325,28.17292913692326,46.7983722731779,16.250788534250795,7.214521762461286,33.8062930877392,43.63351783199484,8.678393322230473,8.42201180818801,17.51408708466926,26.421140643748547,19.57154761038526,43.146163630931404,41.81723728108064,55.075238978677305,30.50633475513669,31.191417172174983,33.74149063729599,37.56031357460796,15.385703387518292,54.43798225104436,9.872432009970295,37.91780987189969,47.47650870223963,39.05519543822538,28.704455447163244,31.34481189303358,22.841550831225902,6.922749067646357,48.10437188558292,13.442566969426952,15.658110899139919,6.596299837687556,36.1935016558661,11.088786885006611,43.10992909521562,39.37769981292988,27.383674818067526,19.392725267709785,32.219376050588245,39.86673451751635,31.126391037048954,43.026925476033576,46.15568471534054,19.560283341533538,17.84903836398055,42.02950809912278,34.432143546711906,38.07897017365201,31.42566953612897,26.53869862860364,35.51019379329153,52.34635236448733,45.50166934994941,32.3098742788914,52.96964933938452,35.232292616933755,27.241048582992015,26.732026403634165,23.288653878979716,43.58556062597076,54.46741829754687,15.953562565742994,42.07301042659052,22.148424408095025,38.23776031709505,34.68838526037736,15.60861261383633,19.394012562885635,41.22492343175896,24.303722092308796,37.98386142254033,20.15721888184162,29.72550941468845,40.63244865557102,20.91823115690429,27.346790004591377,25.66575226678247,23.246944766245335,25.24737430430291,21.685677578436675,20.511222348640597,21.574703645587867,37.095296226727086,25.723211960910504,16.52055815057739,18.764609748070328,9.466076272570142,13.492610777536562,42.59557197984779,20.36545830076911,20.423438561331764,21.2217979376747,32.019243832911236,20.130187897109657,25.61019458506342,30.73953678430271,37.88748340228087,45.62586232893451,40.24361052640201,7.47434065793557,42.34917014647281,25.758291352994878,17.643957969113977,35.70803799374535,11.52507188529897,49.29324405471573,52.624486998168905,34.28866214701907,23.489436738066527,23.65977108673612,18.62917976624015,46.229863069683674,38.38889591580049,48.35552768328443,25.851248154722377,33.32551314763788,24.219572217970466,49.5932641636393,57.687843467829794,37.236980231720324,36.398112302276424,35.405026934191845,40.80040181930163,16.295016318441643,32.70553796325564,34.43960763511658,20.71989751476049,47.411107558112576,40.32385775300288,15.074115058351012,37.589488486989566,32.277152579964735,32.10271366899525,47.62656596353834,24.840096305996916,23.43540633788702,13.746648288110581,8.13490519359934,16.96490809670997,27.10154744999045,37.227790422464935,23.62084025760705,53.421159012787406,30.840386890056163,21.10532068726994,42.684557632222855,4.479388253384529,39.04734431408854,51.79548958266132],"a":[12.117775334890585,17.33876594278906,15.328146749383142,13.680910885012167,9.063298904653468,12.931728227540296,4.891331950671476,14.672812097641717,17.22718100368599,1.0779346851451654,12.647122788402644,9.207423006674262,18.80291898676972,16.011672227015644,8.287441980357425,6.696262364631638,6.7000071851595955,16.429399373780484,17.17796847732584,4.441306636146396,8.4042606851934,2.7908985992475666,6.49447152581728,4.883957998594792,2.1693246223014606,9.835806755578481,6.420712205281389,3.700227679938708,8.118270228529108,13.692465281953012,6.457823209421796,8.008809752658394,0.9502069473863406,4.762216043213199,12.020236568324316,0.5977964820070492,6.095448834755319,4.334375175089624,6.634312390589976,14.518057303779667,4.895471977354289,7.741515158589052,13.041442839252163,19.932571403955176,1.6522348532852593,13.73768424577829,10.962184434446822,13.566892025479657,0.7680264097830625,8.989340721656482,10.936880344041366,5.823195391163867,7.372921949923077,13.846335992406992,8.292338446140004,15.751351780858776,7.310303084879508,9.825814111348281,7.08962465187855,2.9985877097249958,19.013001470155515,13.667059693990087,12.74490271906731,19.902708727459046,15.909871592480265,11.32634609054385,17.784326560320437,19.962597122328614,5.647828971308484,3.9312193271317986,19.29857689758208,11.3833137210549,8.867696064409962,0.6492905920224246,3.092300631206868,17.609296781104348,14.458476775282287,4.46044716974674,17.402240951213777,15.844513809652238,18.902773416455023,19.228135540232124,19.34364499802257,4.732061064730644,7.836608477988429,15.015444994064136,12.246030311311515,4.168286222080111,14.32922434292253,16.49321665002652,5.87574580997368,0.7738750156016527,15.366593619852381,7.499218489888708,19.824988157411045,11.884746445091729,12.778654216498335,1.8001778318391404,12.249877345394275,19.41622354509477,7.771342481838537,7.100908391714702,1.4698167495576486,1.2991314527703013,18.369054421746796,10.137415016098581,8.924077492099173,11.902034196186158,8.62126481946936,9.592494233277495,9.873082452193689,14.031140960434874,9.747353708564376,16.125538971525142,9.305856239513446,3.6762809783743133,5.980431183241257,18.08516004262367,15.064333114295172,10.589956467044988,16.332499531816012,13.335771865464366,4.4532193311428125,11.110224476408685,18.63732965086414,18.68309064534474,19.02027024358965,14.817594846625507,6.827477378320768,8.92835520449938,10.514051492129646,16.344420616921006,3.376423112442919,17.83295673857502,16.167444726130157,0.41441825225063234,14.451435079818005,13.494652377607753,3.2843091196698104,3.135578577513476,11.866032543861467,3.4962049631344527,4.525062556866941,5.759704803986931,12.195478941851455,19.281578134804672,0.17124011160389419,16.815721529570652,12.164237835642083,6.168007228956309,14.954739324181645,6.570708766375999,0.08642887932536425,14.07606300281218,3.2498794546408893,4.799816151704994,11.090117998995112,1.6112701989899447,18.980966635256777,19.785896008220195,16.14866388646206,16.023405743129132,19.09010555895255,17.628234716276033,7.438446962664584,2.743700976323886,2.5927225754536076,18.52764773022241,11.95817482086969,17.231671711368865,6.798765138446723,11.54276548597014,14.347303626512806,11.352776766903316,14.995473996161444,11.677019988058742,4.089752109958886,0.09412518572006423,10.90904104704248,0.9495639774573261,17.781097999467534,19.30408387959707,3.12098602109693,14.894885418133192,19.530502085169914,0.9231836847650898,8.976725413306683,10.686094144216668,0.49775555130401994,2.0540458594870348,11.543106878004213,13.233582482978825,4.630965560034905,15.980127853379953,2.173505657021493,9.280872563998365,4.017240905816264,8.297969218905541,14.33954396725326,1.8877036105437472,10.725555525544749,9.4308350383191,8.916058383243897,3.7235749917007244,9.17208318520267,6.305612248850356,5.529870711950706,16.41532041720606,14.8258131052823,7.9064360990823745,13.698053818231006,8.881735779116253,12.817745578415307,1.629014445872019,11.215495790053286,4.887753855677848,6.1172979047370735,6.363314122245276,5.324337840918862,19.836603045088367,5.423934351350375,2.4573134589216794,16.110600825801992,3.6701517230196545,5.891295882470313,15.786659615764297,10.324066891475724,17.25276226511535,1.9777986823734794,10.604766227569314,13.500423221230427,0.1891062707300284,0.35298877725724154,1.667899926312466,19.45134301014238,10.425644937310437,13.163080427112487,3.5059931021575563,15.175924494296225,1.603384822562015,7.618732883464019,18.040942929663064,11.826246040844062,9.5728953496618,17.267330217044634,11.37962428411516,16.637025584017934,8.065187639507037,11.963054689312912,16.16508155823055,5.8504310817204175,18.794025488068446,6.872735697488772,16.28246788162237,11.52368007971047,18.603825741216774,8.17511096948708,13.520437300754429,12.98024200457036,2.179523242638348,12.49584197988765,19.098779468765265,0.6583284302720216,14.991907226159608,16.197660890770695,18.147629410463836,15.756699023255551,13.372747229273493,13.686516867804484,12.815923859491116,4.525827524082713,4.1479023779277835,19.75630880381673,11.936622430696616,12.562582503686638,18.73584707562779,5.980012492283788,6.473992500153578,7.706516445227649,2.963918465222899,0.271084409198199,11.242937105950359,11.447777911004868,4.148460674918728,4.491227653837817,19.887340671202644,15.144077945861616,14.816737194379414,12.59153025595575,8.81207085730825,19.600593129335454,17.483979642606325,4.965806863293243,16.509544240436533,7.80577557896962,5.83082857645155,5.4135464321576965,18.33116259475417,11.635340721632197,11.472058847212608,10.707976781724383,3.802876512850899,17.870495529364135,7.752910964667659,7.845638363726128,7.7569368635108615,8.655897040090288,4.797833495407726,19.546173689838632,2.1210942361227003,17.876807065962645,11.141750848214853,9.699811469958043,2.9916810103369595,13.313213594760892,9.653564308245617,2.6122732127792014,18.32517786579175,18.600449388085842,4.844024614753608,12.463104905657696,9.504329181587249,13.312144204293016,3.7584984429225043,11.435347936639836,1.6950671607760714,2.071378208946011,4.31879848976648,12.162433418741792,4.319096823927797,13.251376467701776,6.5039119793358235,2.8833450671024874,3.954769151020683,1.3862894067166343,9.87981223099149,1.9876588444862264,7.680722759283416,11.55654163058447,3.7992141776176913,19.10945836203637,5.929207961330856,2.601967091304025,10.29179220034003,4.941873324863231,15.224268017868656,7.3954157743811955,2.0443108004021093,12.625761408493702,15.664060477509597,15.160494438159802,11.921013876465185,1.228447439062772,18.532947397401003,18.914959691051692,10.096352761089701,7.210141759616064,0.22632868366520675,13.437707405525888,11.583163928239397,11.831959690842542,2.2214113262110002,8.326078315599844,10.803062133692919,15.66325125205896,3.4558978872353663,12.921001831816717,6.0843071291177875,2.187547763188782,18.29864035068457,9.193381795212963,13.73717292574912,8.803252445409285,7.39165738999795,11.6903813312098,4.01837021565322,9.343221100470526,19.830860728609643,6.631727585241203,3.9613754743804597,4.090068226798769,14.161473024766543,6.860963529118944,7.526848624789646,12.027230842581034,1.7859673878013949,19.024379985942033,8.644783732712952,1.9443970087477114,6.654323607559429,7.274889201090611,19.42050574433816,19.889897100051872,10.780903258711717,4.104857612639052,18.889326164437875,14.738659886816308,1.4534540343680025,15.649706599993237,5.12198136431675,4.951319756422472,6.269905981810089,10.293520756484504,15.751822124263235,10.379968794998105,18.15338511217092,17.823078999037847,7.557601802976719,18.423489265673638,11.848853860263437,10.683284192187298,1.6167029766220997,13.286809331428277,14.327835254415682,5.534374296309328,5.138213600739481,5.351340008102365,16.392208824369114,18.95644343507226,4.989335430409456,18.677476459349897,4.617487252292767,9.720051755014856,7.175800047423757,10.85224592328585,5.262496599177791,16.33192194227651,5.818957479722329,8.245861261542743,0.4964445211469437,0.45264231939674104,9.654956793606665,8.53529612270377,3.466859439974743,7.9957140137710025,5.550417790457951,7.013513263626905,2.7703458374711154,11.82496519867344,17.33834080158963,15.444487792520212,5.607389464579455,13.967543811672588,18.901512277412614,0.6371793602027642,13.24320138930248,11.20707180906014,16.9833269667029,9.6307810940319,3.386062662808631,6.907126785744997,12.295216061215646,12.100678056467583,7.224472899576901,10.567897226797825,16.23271272757345,16.20851185448446,17.869580346835225,17.639435371347535,7.782555137071707,0.07079427338262612,16.93388410501634,2.2034382635029592,18.01558067042684,8.023330743439114,17.229669520567658,12.606472525197727,15.532387072186582,5.942140765407071,6.747836652317201,7.772070428522673,19.424856907151018,18.818319536882896,13.072134916175472,15.66038404473089,6.4649192953525825,9.144002791921228,4.2402613882296825,5.854278913503661,17.13198258858847,12.189551316693855,10.363230266275941,3.2655674858334693,8.728572753199728,2.4654556063849986,1.4196282702164575,17.995819191224637,7.491200840213752,2.556504637386099,2.2205679690800917,5.005369195525962,7.822715410756023,16.409257923418185,19.6494134174913,7.489175814430058,1.0703758474036196,6.507718660893231,0.964809662658479,13.571939130043358,2.419600456712052,17.29679533909251,19.435476115564686,1.5296094272601524,6.10139610895533,6.456240999578875,13.98631205962387,7.3343084828673,15.875514056671264,17.611383533816152,8.784082558805402,19.375351349628012,10.596206301724083,14.059842884322041,0.010963633960372476,8.489703815137656,8.619771415253856,5.0862887144059865,7.924280100405858,3.1740273896303783,18.254376680300236,14.566140034638364,13.774353575469473,3.420714103144875,14.570834863819133,3.192326315027776,1.2287363953204578,17.076226802821353,2.995011424629541,2.2333564241599513,12.880538146611498,15.839182925618287,2.285135980512085,16.184172151186683,9.175185757717358,10.187775419352798,10.290389846284578,8.249777012584843,7.773980334530051,16.85313024696346,2.7918191102495626,4.575736734349065,9.729894646031996,17.805169859589434,3.9143824692552487,8.124889493617996,10.14211918176958,17.088571026547985,17.503558490353207,8.34756544346057,7.527656583139426,10.894623237451873,19.05266584431322,9.935754205263114,13.483271406314845,7.700814426193672,17.149266469839528,0.22834423604620735,3.0015291838696267,10.370237191888027,10.1367109819804,9.118461797301084,3.6082934960754898,15.660537016429128,18.611446746122418,10.172942450181782,18.145954281086137,12.090248427891632,13.620024108045051,0.23002963926476383,0.837406097449751,11.162876416987949,18.156024166939556,13.284903971068353,14.841318104300703,3.049496870387638,0.513822804420565,12.838273027035466,14.784590337654752,17.907151383640777,13.594155357662574,12.859811934411685,6.215271669785474,18.449928072567545,10.871025849468818,9.447640086586606,5.268497729303334,0.7456395671254601,13.567762157209135,0.5990899579555142,9.038937236905365,3.543286202476277,8.441931598895977,15.068074508831955,7.43557556037671,9.446111715554565,2.5629208233805745,6.287925666882712,3.433204895375339,5.569489883528869,12.177961233746935,18.599080351936447,10.356544831133245,8.456025843897947,0.9585835515873065,16.126983525210406,5.672345572734461,16.03260423395078,3.3245033258238266,8.445076124686125,9.29725524009493,2.1534525975110075,8.89842629301814,6.3067736088340265,11.718846790237144,11.994646601633331,15.845823886535646,4.265269846824671,18.410183153113813,10.1956106742389,10.3346873880067,0.548786834482895,1.3947242460631104,4.708791695280237,13.532379896875813,12.54776242119997,13.640176917043885,10.009187606108746,10.060898560448361,16.469135179284503,14.769155841984718,7.129346443618831,2.9350998782548343,16.08974758779299,17.015741465183886,7.896193997825125,0.9523593066949543,4.620168698185583,8.449769835981504,0.13607124549516403,15.496999414751077,0.044963632257792874,9.939889622975908,3.486611005899185,5.4883466473980125,15.088914492098763,8.398812944686952,1.070567957497679,19.104275379216592,13.855818959274767,16.660395083940706,14.640546329892633,10.84416102953719,10.86704741424942,15.247777812240809,11.872500509768443,3.6315529387557532,10.838292629607054,2.5457389891420235,17.202796466269554,8.303505090298128,9.186863317091634,11.848841568681635,5.312921356839917,17.944001036615,11.35676095928198,12.746387822013844,2.863978513769716,6.164504366917325,8.093479688651515,4.800359345858856,10.786644878519924,7.429065664790153,14.93382020184753,12.481929530387328,10.77146453672395,12.0793230748038,7.747145664632922,2.6447405608261,10.300859057912657,4.421157267078639,3.8427045518942604,4.649262548369704,1.339614312284918,15.862219065695005,11.421088773030812,9.862731757421596,13.575939940358559,11.193577426424861,0.4864657461046473,2.9439614204242215,15.279446431313684,1.17147955362086,5.203860520101138,19.93230989619532,3.5303189110432243,16.80187857708934,7.933879158107078,17.342831521308554,12.722761797879913,18.091906261151077,3.892247089480656,11.317448240737079,2.014293860408274,9.415825725354484,12.200476138393462,10.140816294125145,3.759594811644309,0.25210482200718864,16.840330617562994,7.54591630924089,19.96920184261102,7.041906482891123,11.786040566167951,12.88894617063912,8.961467450801454,16.112950560011285,13.069855385579604,4.797657129103774,16.424571628621067,1.7826520048235484,19.736415133240076,11.850730782073548,10.398423367992828,3.1368677794045707,5.462751774193073,5.547341578581824,16.68064796789672,19.933270798706655,13.470826730530266,8.114535827181616,4.266631630714883,15.246918457919726,11.2427246306238,12.886143594156728,8.825413511565191,11.161424202737384,18.85390534723165,0.4763760363011027,3.903441178336471,13.899746702703354,6.24582100673202,12.104309932090075,7.364526229942383,4.666121546277284,4.270352358808407,17.79936355947605,8.612693909992114,10.629537985586657,3.9543337471765794,1.7714264226181076,5.833201497552798,15.371126172978308,7.029565309571488,14.390535946049994,13.38692367978692,2.9498656215104058,6.437122502486239,12.139848171513234,6.189224195189547,18.569005000355226,18.229681318374165,16.53801279652319,10.238297384605755,3.621714623182637,13.65191294769831,5.309783794650094,18.495937480804123,18.66693902887132,3.0267704094592673,4.111855383637479,0.1519367996713461,1.7933273322477472,7.685573614273218,13.317106799135875,19.521885996941126,2.398896572213123,16.92823710862751,3.4382781531386497,18.296217340356883,2.6627499050713377,6.589414493888706,2.4243656828526916,8.869651061679944,18.617480906361617,16.452163791289006,7.000480320830205,8.386924545109032,15.231042568469979,18.99966109180947,2.8657837420106747,14.862463415175963,2.9465054425928283,4.916089121264862,0.598236653117481,1.3192752080380643,12.780238943936135,4.5405324601500885,11.73816521570152,8.077807631291464,1.7724948545985786,17.822355546693444,10.428505458409877,14.25924705713463,12.220989911433534,1.4653557997515865,1.433577407158464,10.01013733067246,9.493143217970808,4.602678168017675,17.87806129175913,10.420430393885688,7.7005777782633,16.67966014118043,2.0440930735158336,0.12332292868687311,12.221299288194878,9.73728244191884,4.306478601671548,1.2845683650014328,3.720529160960808,0.09235561740399412,14.994388650030594,19.490039701495302,13.940780977484163,17.36587515762068,10.954611991683457,3.1615471342855317,5.382801894933484,5.850012348323688,4.282822991798629,3.9592249054561046,0.027220486199013294,13.34402918768195,4.379807270523415,5.2413351749357595,14.485484117598872,16.845022615855633,6.444188534399156,3.4805773147969354,15.775327972564494,15.152563242314443,1.297042616404429,16.37252788131981,17.650226053127888,18.907852731472545,14.908880800540384,1.2727359371258817,15.285665357243513,2.7418698644452233,0.1680611996235637,5.407732527719404,1.2003447057504824,10.064848114062762,14.803451826966052,3.781970777383701,15.698581704583932,18.07758578408507,8.23278394815766,3.201223858115556,11.245245616804368,11.666910962799776,18.196619034042577,3.194427876753818,14.878660657319038,17.13345000949305,2.146768227944542,0.1996112799932126,15.87569468889335,4.12279538863098,7.470982090869862,17.43112275547157,9.295071677880141,18.519262318041037,17.55481830704156,13.16014561474839,10.031881507508817,3.11530450406468,2.5025355042407904,3.515480056055469,19.30327520345091,12.775852664876535,2.6081121510810146,0.7408867084201676,11.26492572903754,10.471858237219593,8.754201729455996,14.099804085195968,18.459419417602255,14.32611816163905,15.52066451045675,15.122273013546184,13.84900225138177,15.732094782099871,15.978223238714818,14.780093617345447,6.7333761951112026,17.922551190260148,7.937523908683168,19.677325875381918,17.375761372176196,11.577450474004332,4.684764360755689,17.763075409220246,19.924273147334695,3.7575829657726434,19.950966794412214,14.735504063635045,1.2265586399910378,11.335480694838589,13.143207940823189,7.025582321562376,17.66328508625003,11.750800192690196,15.111234812998187,7.398987473275991,11.418870937858173,4.027259265456999,2.685609989801412,15.6048308812357,1.2774588765293737,0.16368448544658687,8.123127333457486,1.8167909394765047,12.295369240414882,4.6863944978542005,0.6188895606137157,12.234938612899438,10.696568460484182,10.501039838561432,18.660629051591155,16.939896358481157,2.762238107932471,16.387224201324955,11.936816277060283,9.370462378420621,5.555583611969213,12.084055415944942,4.35493998198591,10.702775282637615,7.339545773442535,18.32500842023681,2.8137981892047526,11.837541870378953,2.5444502056288387,9.560763603878666,3.748548535859353,18.518727923980634,13.254947397175222,6.145504693177748,5.3920147578805055,1.5574655934447756,14.787808106747766,11.77239809495906,4.945317596081944,14.612103419589255,11.377669450791622,15.610338175049714,18.79727888694156,3.2715318985236053,2.8600325237628788,15.110481910430815,17.120461834653426,17.485846101308006,19.020075362340663,17.54933953025507,11.37037333465397,13.771012944277427,6.771457321829724,17.79394395421116,19.556123554168103,6.896541927862043,3.8003213103215217,6.4099426629393985,18.55721788430595,1.976300600739891,15.554054735876349,0.4350187551453244,0.6835280539754862,12.305534779278627,9.192964682721794,10.93699605937875,14.588650079804463,7.341587149434012,0.05170671847735786,14.205334220283326,16.116245719356005,7.578824173566674,5.047351308495882,0.00839455362168895,15.942341579465857,4.926074149458808,16.12138864613954,18.254928728640323,19.806668802863463,8.746789553699724,2.0822418027241385,16.008452311787345,2.1588202731609174,14.463946303621285,14.887239038891021]}

},{}],49:[function(require,module,exports){
module.exports={"expected":[0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.033843363039568614,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.14001902106020941,0.049108156801793784,0.0,0.0,0.0,0.0,0.0,0.03801547666260943,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.04840999805285145,0.0,0.0,0.0,0.0,0.0,0.0,0.09244140449548341,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.05569707963434423,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.1898549164778948,0.04736635992047338,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.05583769721359204,0.0,0.0,0.0,0.0,0.0,0.13263972547476258,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0771988875160075,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.05168467553985748,0.0,0.0,0.04511462395007038,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.3716883365698536,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.11504063035012221,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.06582067328606309,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.03505425291739232,0.039475412396984905,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.04528471945083848,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.03521936999219339,0.04476023808726144,0.0,0.0,0.0,0.05007099341467622,0.0,0.0,0.04087730295857746,0.0,0.10534238350427758,0.048037742725724,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.07135874455045446,0.0,0.0,0.0,0.07018240874011009,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.07517420557526105,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.08774371554015678,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.08053873191530087,0.0,0.0,0.0,0.03552071129998069,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.06592389576059979,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.05176765894633511,0.0,0.0,0.0,0.035137655695592664,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.04777938330034022,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.05475552238234515,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0414022547748354,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.07632756542377073,0.0,0.1191855749707517,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.03474311459164093,0.0,0.0,0.0,0.0,0.0,0.0,0.22447628543719308,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.046194904224079465,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.04599183801180964,0.0,0.0,0.285745888895137,0.0,0.0,0.0,0.0,0.0,0.0,0.09953731605510914,0.0,0.0,0.0,0.11317325107361026,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.08641683441503009,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.08488784291633379,0.07273155994044099,0.0,0.036943462189070055,0.0,0.0,0.0,0.053879973914524724,0.0815289378554607,0.0,0.0,0.04464607172267555,0.0,0.0,0.0,0.0,0.0,0.06532644465247966,0.0,0.0,0.0,0.0,0.0,0.04117113545513661,0.04588420802698758,0.0,0.0,0.08320145076617635,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.08026302625590989,0.21349637137680832,0.09327624305686462,0.0,0.08038635687524777,0.0,0.0,0.0,0.0,0.14589375975291002,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.045290255234763245,0.0,0.0,0.0,0.0,0.03536153088538893,0.0,0.0,0.0,0.08070780530595191,0.0,0.0,0.0,0.0,0.07728560011285536,0.0,0.0,0.0,0.0,0.0,0.0,0.27951380693279654,0.33101628316419224,0.0,0.0,0.0,0.0,0.1451557664429635,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.1495349415441195,0.0,0.0,0.0,0.0,0.039558717933298494,0.31734798508241285,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.044192582939744054,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.06033339323157574,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.07580875095226812,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.11242312894258999,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.1679700895369308,0.0,0.05571035073644539,0.0,0.0,0.06642535347518977,0.0,0.0,0.0,0.0,0.0,0.0,0.056289955507344544,0.0,0.0,0.09100451376052818,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.3943898956190607,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.07012284317959931,0.0,0.0,0.0,0.0,0.05052153261604093,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.04192539967450032,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.2293125567326684,0.0,0.0,0.0,0.0,0.0,0.0,0.214325720850863,0.0,0.0,0.0,0.0,0.04658618825162893,0.03420217478102843,0.0,0.0,0.0,0.048255243176356016,0.0,0.0,0.1503302222489477,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.043023108307298705,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.04795451658960722,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.051063445393061346,0.08314259943537325,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.04696187840224258,0.0,0.03948469519089279,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.06545710794862049,0.0,0.06156702656014932,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0900179669999763,0.0,0.0,0.0,0.05894388029161416,0.0,0.0,0.11273127634954531,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.06844925385021836,0.0,0.0,0.0,0.0,0.0,0.05138888318608015,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.15253594556204428,0.0,0.0,0.0,0.0],"x":[22.699149429146104,62.83488211210344,2.7134003579590615,89.10135398181973,2.823266773009081,22.12789527250507,38.75034263990826,97.11405714352692,91.4117407668362,68.36277230738766,56.41956926404057,49.05773970942828,99.75166915122165,17.597644330500593,53.59448825707749,16.456318113561498,79.29665331457558,95.87247494702508,71.09174857131599,43.17942565053525,36.92028627049433,36.28090294820056,65.23818893383336,93.02178224020439,21.015241318043977,13.755185834937155,71.2976770403746,13.364429545261668,61.59849587349133,68.11027931505566,44.46033966145637,14.172875135716323,78.35218968328323,4.851506889790058,46.63234562860674,30.284189681823648,8.008418669189975,88.94777591767726,62.793906660455036,18.594907862403854,88.61997846319356,57.68052048021324,95.59331370401294,24.217153527435986,58.370026761277735,68.95674873468509,99.97974935546743,13.922346201228098,75.49477811851848,39.47338572618635,22.86656184162532,30.388497550778816,64.7816697888486,45.997222153816296,60.3537402728356,49.506956543022376,2.0386798029944364,79.9779475020137,11.90536362100798,83.43033187475943,54.340875488687026,21.925171891594353,76.10625522625926,95.49286877299024,99.72680595058527,37.07519874443022,5.358835595598199,32.06672094331411,32.25848029353271,44.90824558880573,65.42925801115783,28.84823325498993,84.54642456263105,78.00311827907245,36.17555194551125,57.08068756935356,74.33867698011944,44.99508060961197,60.23609099410159,53.28777529710547,78.8047662543879,70.64139062375223,15.63747426092743,21.763614840900146,16.997532403170457,78.48094716493135,20.91973261409681,98.18186703594272,31.055037161121568,70.19527329695954,68.4159402026302,42.20890216814712,4.6805102734906345,28.61925075344496,63.08685359582502,82.32660027084873,69.21965048483183,8.613132319481487,93.58543378686635,77.08716214928342,91.62371711862379,60.79358238112695,91.12752381667713,8.097690419021042,48.837183833651835,43.82331914892224,98.74381443920679,81.8745590955997,47.01646451994759,16.661998193833206,89.42949578774177,67.14465008120514,81.8621992104934,58.83495130021294,9.51248487051448,55.739752763031824,37.94946998998174,94.75831566654298,52.654204389244995,45.562632131982596,80.12633837263661,70.57198990851829,97.48967666166382,1.0616731274455837,34.91306214146124,8.006001094414405,41.070570147053886,9.351167498797164,39.27632839931765,60.258886694796445,96.35584860752682,16.493693660697083,38.4912269567419,86.78978808240552,71.5506815911602,56.899773229111176,44.55638832243021,55.06524522663376,31.41326659413688,4.358943439459351,75.17460926649608,33.62501880411415,43.06729202667823,54.57909632025382,63.869835880897696,31.935494214012383,90.05082638272945,66.44479725473597,30.98703528732869,94.26964584686448,64.53902174583872,93.5360393603331,18.602269311087973,35.83948095659344,15.201424944715747,19.914590122156085,74.92279008365847,6.2321861558986225,27.664828754245676,74.78810976439487,59.47670160744085,79.46528708718023,54.99004982093108,7.880059363561287,48.17655058181969,26.29675994093312,38.40031384395306,10.254498400530787,82.990360909112,68.77287633207025,55.39354688217042,20.80461191392411,52.58345581010839,43.2519709586572,83.99816945891578,42.829477969663145,81.88827047979228,49.909966097100764,21.972964470181378,93.3354335428386,6.830489050895894,7.527742622613376,64.30594144096358,12.092074402566677,49.02435142056098,12.042738845344104,15.504249970844253,60.78751598144847,50.11456869287052,5.04559795740418,99.9654510057064,30.264893361528355,93.56375608132616,94.21234403364511,76.86738625793785,26.29715994829096,94.3813186287515,75.91906643060548,64.40378254090129,66.0315725179061,55.081370799013804,59.549177772542805,87.50149734522643,91.097098777146,46.74436514303495,23.270273894438876,71.5137814530648,25.958046397290445,50.36412245608653,97.93727604138473,36.250958436477006,11.345830127110101,14.724837220029197,94.72652788916851,74.7105726359251,69.8829495958865,41.25264916365845,32.83564116871833,6.375015781155002,91.66956263515267,94.16809528290386,52.093318762277384,58.14397830924882,38.55991806646082,21.207340940925047,67.41181707847888,98.01282832314084,32.12226565850851,45.4796490698812,51.53444590508114,65.93328011191215,48.37937317999723,19.21655031249767,22.58807019066382,49.295210551336474,12.102146712082051,95.88359784213374,21.387171927383374,44.361727821115494,48.427175611994365,54.09434725968079,44.344553034012456,33.36303746120544,36.90646575804344,60.18629328064156,19.459675381766072,32.21331134173311,91.19156537003144,75.21073175842001,87.1917904376341,95.86233698402214,89.9536722758846,46.75652671842174,0.06665347977179437,83.29587485620912,42.1644301004835,6.070997646848064,73.5323447985626,83.39440536281835,24.588472402782145,7.399658980680579,34.773017760437575,59.68944554363931,83.09068123808474,19.987379564275344,9.716578402609333,60.48482634546981,25.923437724595356,10.909609207552817,5.072366276773965,19.409285854838586,79.4884259548036,84.86542973551568,58.514439212020044,43.19255262309125,45.55424080933932,81.20505360643281,65.46087581404161,97.48252358447995,56.94498585965921,63.91622794630194,40.881808679912666,77.99292250522942,67.38508370587002,25.158591611620796,38.926745791813985,87.57569097154546,31.48777006269561,24.366172703137835,12.553566962422757,64.06955985140863,57.113762208504525,65.70666085711045,20.20477970573531,24.79111874898745,8.610819624174493,59.09905288847024,71.00957413856915,99.79885321690551,16.525103162402498,33.77700334799236,69.7095877247081,33.285416469492986,39.95576469500186,85.18813874835391,65.1032729423469,24.813423159732295,71.91559612556438,48.847101741425305,97.79164339450918,20.009151104728183,1.2823566764030625,61.51715036822074,66.96094458179564,69.62612189424814,22.653306756224257,65.52874554269196,87.45503293173967,94.46746956761287,27.888475122147383,30.265982499241307,51.64933586329781,44.2002237003539,25.286270637363195,11.186862538402377,53.60524989268247,63.152077510344014,23.715897856498835,16.94291010623068,78.11960884473224,80.39309569335187,2.1473827218059682,5.109745604480365,29.54597174462039,3.881401609671631,2.6888357032424093,95.34709828058638,74.2368219036794,19.737859332808206,44.205950041043465,42.564583407737985,44.673460422574095,23.509079784764243,16.464278799282294,49.50761749731474,67.57898189191724,85.70787201357233,8.31009583019311,42.81239386434326,7.71639637593049,89.7281033279565,90.83849666573198,29.973354657196282,46.59465154371824,5.8717393775487015,42.32351306821522,26.278923216306428,83.84430855542398,5.138380188839031,22.709416783711944,54.34684546194859,92.43197534019313,88.61123432063624,32.46219579601901,32.17196009483905,84.12503519508252,45.84008380582865,49.84384843026761,90.62915349797096,84.85239390729254,20.42767152157612,43.10829070716509,78.15270769203444,92.17542141651627,26.90578077864356,45.39983236326493,85.31898641748793,97.27981975919064,33.586432502192906,64.15773016627395,85.97105983735536,71.61102495676406,14.713318256496578,37.39080370395176,84.06686601500259,38.85364466633363,17.97523432260335,18.131219400612974,3.9892257681378496,73.66979424110521,89.56152144051259,88.28962888882852,24.6923536893193,40.27264527941006,35.52595550228532,83.20373815856601,99.51893164780597,44.82355327030032,62.048615267463234,97.61290490464265,18.86604191514789,42.671006229361886,50.569431209619495,9.008129448533332,88.58306301971415,65.47809122747216,33.65162977027665,22.18070848118534,2.9371175935446914,73.08107598337928,68.35773683608241,78.70854094576232,50.208743200863616,45.559070778519015,50.19627263286917,53.82188627680169,13.97649067480593,11.799516677115008,65.81555194105118,78.65115423411903,79.5309050676245,86.7743749650644,38.73894348947435,17.51527620834834,77.73867721749158,98.72515861634787,77.98120370918251,74.18573218725246,97.26675678248505,81.32327096169732,61.9326712956135,53.628442683825426,36.67906421928573,2.184757869009335,94.15274180468498,44.99501442296769,11.81350960010683,75.30790636243627,16.51098197877974,50.937149329907385,63.60149705007512,84.24062284147674,99.3773115105205,90.0453473755471,54.081226956412195,49.98226437789744,18.6956379302504,80.71931365569012,45.96296333537533,13.287065689365708,60.76753315206149,10.873781791062221,74.40370798279727,32.75613778210018,59.48377866596326,13.305485901073745,53.12111908568753,68.93810501750362,38.53394021554022,86.08002923252502,66.89874591302247,80.41345398585375,76.69314852289466,49.748963089029054,5.372382599843717,5.110491225455593,77.3126413695694,20.363606217228213,59.35216524981273,98.10134654982218,49.85219996423682,67.56214075385336,70.45653212807028,93.79010135419644,19.344233055078995,59.45940451288614,78.64258623720504,87.02867549138757,73.93859385248571,17.8106128580257,8.524368071194566,4.670873840357603,1.6307566094607262,16.02167794203979,24.158651867812097,38.39145103353581,49.82699705569704,20.938083186978538,36.874069072994196,75.97501052425955,79.5046244868746,15.984856286683735,91.71232361545263,77.30754702426744,4.057714574888505,76.98366799377237,65.48775621518546,23.290812413456543,89.8658455153019,49.908192523805695,99.48345404741825,19.050596244463414,88.92334166819657,95.02257967054418,93.01505433041379,21.64438210481363,85.4211559811191,93.36276604617302,21.78033967565174,45.03536994135462,5.886106654251888,83.4976372119709,68.10699777454816,70.94969712132131,40.411050325720055,20.806715891885098,57.70750609265918,90.53497096498415,49.36792560260539,73.59484187182817,86.09061119523689,76.44597550605772,92.37605199819627,96.20840260395036,75.76008067065519,47.92159364155395,95.20653142924273,21.77456423013244,82.25463822872095,66.49189118192692,37.2348149217858,98.44484749919489,79.40622216551805,22.805748480396247,18.05255094848284,34.0646182827101,7.261897891797964,43.49386170395964,82.63851600238708,81.95208132670729,28.413977839717177,13.85474602183534,0.14632314384408485,65.63958492688833,7.756019150635773,56.25132775635424,93.09792306372626,80.23496709728546,68.8411901471992,44.46869241111129,24.833319572247746,72.20165952822217,55.05088092529127,85.2039560971673,59.7172971778819,59.43831751497828,22.664670461746383,8.4202024779106,40.403133047148444,96.11954247548478,9.844766388579075,8.390655474521713,67.72267609216844,24.85817183899477,9.416335874473326,78.13707557343848,12.973992577762129,17.283710257455386,7.499255446069042,71.76807578207827,34.793012631406995,48.01058729452667,17.32040988228045,16.81738796130947,15.64081877207537,88.67744367858799,11.085189603906898,32.59590714923208,53.65645331370457,91.28210415197258,89.96686416537389,17.597853909781303,25.840369380334938,48.27555054968231,95.57815584168242,65.79283921141882,96.57389074703676,96.19559764143308,81.11518872312395,92.66621667344013,92.07166221175677,15.879299103862854,66.08421227223549,51.18102029440168,48.921412144998854,31.814439344967703,53.64843349401502,57.91849580766768,16.290662153715175,9.426808164290247,55.563232878280175,78.68554520462447,73.87773949471548,38.85429056249259,29.380861517129464,29.339212947160686,80.96268277398167,62.38818509648676,16.960989596381925,29.006029348663166,30.615863956797227,73.72279540446695,14.334986548210992,17.294857424737465,80.2974850079105,54.716387416368974,41.34478596180664,44.97230139902497,25.714306254645702,62.65480006053079,18.129154354304422,11.54338234619916,89.10291772124856,42.051697513879674,73.8787154956208,53.17476987219807,13.760075277227447,63.09985529657847,90.32406232148504,6.3697857580381045,63.02126940065473,48.81326951476473,72.72148706580033,51.54800941537157,90.89530935218471,41.4639711145423,91.45044992245708,41.10407041833775,60.63653287959865,24.051016998559227,59.29792609909761,21.38524583547148,67.91353614144133,79.94315531778433,62.865004462499165,10.220955211086258,33.47651712127018,89.76624086738163,29.35645268199918,70.60409784506774,8.216418474452492,6.817293374313671,97.18724240174825,80.7516795377435,37.41892828122679,36.530774101915206,43.0150910818248,92.63427881803914,73.04297544115852,20.64412059713312,69.4696328641657,38.69731417763742,91.29182405365827,19.791888903679823,79.35370037334215,98.3239604392945,29.302914704418125,54.05412012515125,55.47118961184054,96.29561427120375,33.73533371028545,87.06565406278706,39.12173507560341,72.30288724905837,16.442470806809627,54.523136942661644,13.304264528741005,17.924205623455826,38.496177158140064,81.36816219874451,50.694934639927936,76.5235503525065,78.72040702322091,7.012095521685335,29.434135458544276,89.19728383252922,49.64276352636938,77.26520976229068,19.024069724456936,40.31418032051308,50.395220045152975,16.59106509723065,81.14609944566445,29.873592801198434,58.52126985207047,82.10119359579129,83.59181847766493,99.98954197436535,63.621669577372366,98.56384114560026,12.414140697719066,94.1164881939861,96.72506379588543,22.09401380133953,8.350726179340274,87.7770606289982,0.7857844872467323,90.77208253888169,32.925051975237075,6.860166999139183,6.539693612519537,82.25686707950916,82.94285392227762,82.20943424199838,58.3119434496632,38.97857801333542,44.58942247644537,55.29949302930552,0.842206069096596,33.02845140986284,62.11248373965967,37.78130468975469,60.56801236535798,4.641875579486654,91.8162063086592,55.70303699676551,41.31860327793695,74.73499721803934,1.836428211744856,4.324565750323872,20.795126218093827,60.92255233958639,6.368739566246795,30.443684645422863,70.76333637092809,97.02405573445381,22.134767443903904,19.27667097126178,98.76530764819617,6.093873221410084,16.07737313975972,50.76512573790768,10.405954741870627,85.99205289512395,37.562600510229395,6.374765776079094,64.2225809834982,99.3705602509257,65.26399355930543,47.04019076028221,72.5468995538219,46.24052643432246,10.597153918044455,84.05353152392149,79.74910194659573,13.413171113142308,65.50464938724134,97.07967873756876,48.53163213343399,19.887605565633205,75.93399870271395,37.17971234027084,16.50237929402014,62.705313106905834,98.93418434262624,1.923405714836779,31.140241798421407,91.02259986314472,36.248433915434774,78.5537610779516,80.84711455001599,20.105769693638354,9.18861535968356,5.695462192069156,92.60488462098164,86.05153150394764,90.77650722050821,14.811000589157942,95.65943083261364,8.140591257693664,38.95269418050103,36.631214602485194,23.549696520142337,98.80576596018997,29.011832192101174,85.22333645903686,53.26272097820222,4.2798639030170005,97.31833767835332,10.804163547923995,84.36975692960398,94.92381719583256,96.6867712239482,99.10897114946955,46.142834072576264,52.70496098493336,48.45970323226552,74.48396452455906,87.2302351967112,67.89927967726383,37.02049912642451,45.608939452032885,33.80280478662303,79.52992312016079,32.4641566997733,50.61824952709413,44.39106724645179,11.081005902097774,25.723076423558023,69.17143814405757,84.38908246038164,37.25851792699197,23.33461453810106,20.924871403112455,45.68692093477178,71.61956814662211,63.43371778158584,35.559706805562705,30.77324221680604,51.00992340374566,30.10680936657062,62.3878989777044,63.03980591696929,87.20388927972226,91.51221910813156,79.72172390863336,29.54077435373319,89.46989327849752,51.7962674858883,73.24758439362023,54.039967589357765,51.33672623534999,76.76287108568903,97.01089906732214,9.640956757544505,83.5420112062336,94.65437962472902,43.995767676909445,80.6551597840826,57.76360392115629,62.22046141328767,49.470873396622906,60.21838935272352,85.77827899017745,9.404342612613515,26.386556620556757,0.17383948229279245,23.632715963257155,17.94834002799426,37.0409116554943,93.05049140292016,89.06620852696005,27.15425767101969,29.802092660003353,17.27500286574093,65.80247471193714,80.0054220680725,58.18633265805888,71.0637376346088,3.778031423188599,24.81808412946387,80.8146265057708,5.278479435297401,70.8276767446759,13.180015952261348,2.904312370767581,10.835100992388957,14.186265775823138,62.03141016643168,50.62598024215177,49.18216346439339,93.08659221687104,70.85941544684123,38.90605997741004,68.67757696535229,56.53870465123034,93.29213318524847,68.12896618042572,27.464559743538075,28.06342326811164,84.09314284164724,92.23809030882559,59.78436006665868,45.92478713708441,81.74518293402804,11.758166777429802,87.40161102569711,42.3442556442309,62.99228532020293,45.8907819560741,81.95323453477685,99.90114590768098,57.7280046010235,26.402603576454432,75.34229957866205,91.60080329689275,55.71803026953144,56.014050796429025,42.62840914142343,78.90092674056763,10.344464435162081,88.43750883949578,93.05170565189866,13.695365549975257,68.77535912242378,83.2800874465858,83.87694655464367,62.5533999959988,95.82280205672322,72.09383200592818,5.203461728328085,81.39253809865072,21.730584339430248,37.88601199439412,27.585921602068098,8.998382620933398,96.27965738794782,41.859418932979686,38.46545475854184,0.38668157238670453,93.32178257227386,30.291951007732475,32.18353788761754,3.275244759133744,43.573336324155854,54.72843115891515,81.99908720883144,52.979395654750185,48.26862939838694,6.051464665139017,32.868256267990525,41.0591813006874,1.9053817822702213,7.298805592587754,55.68788690646333,70.6084148272193,9.936161826103106,80.66088624768524,10.40759340553221,19.812034828239767,35.156828425994476,1.3207017139545085,15.229903141266533,96.99761312816581,88.07757549681125,90.08377453909793,71.79665427134378,52.62312935059141,36.83835950237666,79.04945826178702,45.553770312260646,77.52891986327822,95.65916833762593,82.98298141287876,72.78454639619838,46.768216933365366,13.99842922207204,40.00218684497876,17.162588306858552,98.3464254895193,56.2589396775202,90.70552787282386,86.24421450901716,44.51869120521306,86.7526669798756,78.04544410889223,14.060516488846474,91.76960496443303,13.707760897293419,82.79717528468554,22.26421323982457,78.81716584450811,74.38625074168681,16.363883364286536,44.33030967716418,85.20531467647324,46.30815406721296,8.043889333078113,56.51673237031278,48.51245379528481,92.41611924532924,12.683156621669056,30.314733168943665,34.36234444294419,62.001897509680234,20.68288750978935,85.9913491889428,19.21080581752197,11.623212195022825,73.86243648208146,73.8057441984028,19.21358746502404,82.23694792456457,51.130440681738534,47.837859542970904,7.7249895778605415,3.6885135210434017,79.6065118237706,92.66120222822252,80.94575504716363],"b":[15.022710787943385,32.555718173146836,7.366966163124022,25.135512806349276,21.076694744064053,11.867899447989787,27.64787718754418,11.359491564667836,19.485825458775068,22.221779960473427,11.529632326909667,19.658271964887756,30.956677414594033,17.424326114949537,23.81587456447128,28.273332992251923,18.256003970322585,26.670506672509948,35.258925468070515,28.41875513456887,13.12271805237545,21.490998732055495,11.29551225140312,19.992099374692053,22.34319032272187,22.431413362357624,12.478910082876155,12.599837685145424,9.229317112118212,24.417404973585484,27.833344280494096,24.677437873034943,20.65849465013806,27.287984824396485,27.385082145927534,24.78454012112457,30.77941814207079,13.441002649556495,20.380245164955898,9.853400053032164,19.541437205329853,21.999473879545274,19.940254276932382,26.695790078928276,14.380464929335702,25.57888704874393,28.257974511385925,4.341251406463993,12.913785662500468,15.209928929960833,23.981366604798325,11.02331536606879,11.05307036352654,24.09170620600039,21.844918481371266,11.86499952705821,18.0674866275734,30.31065146233121,26.88314200754587,24.325411421824118,18.927178572593714,6.365326479337696,16.536084957138193,19.56592682168653,6.367002362219827,30.680567944484437,25.863351177756225,16.71001196994502,34.553899970236415,18.767217298928223,18.530595071450556,10.065738796293875,6.920263260280466,28.36647241671678,26.144914172479854,23.167371239839824,13.759234562982936,32.9642742767594,13.834240535220014,2.033032361991274,16.866905994085254,31.2952578489455,15.925657495475484,27.248951442269806,27.036705037960495,12.099499691645235,19.3107750185062,7.829587359562353,16.54503708569974,23.97234984362569,14.21917922885398,28.235434543367774,37.44137864839132,21.303327336933048,11.504526169505041,8.5220395765697,21.105263826158346,25.02253073220227,21.840046305526233,6.246806728272825,32.4281647668957,17.94019049892396,32.22593108486074,12.92072886694435,18.825346383457905,20.160572998836802,28.08647011705495,27.511904598271933,29.971652056388187,17.393334668526833,13.237030521691562,16.31962465809165,17.68224228079553,13.194943197148712,25.214287185536868,9.333544053607167,33.75532877613069,16.193998109677757,22.951152530561078,18.794778770729287,26.368212387813948,14.993830328244705,25.26662911158954,20.191754398046243,19.304669392061243,34.33422888377032,15.793355500866543,23.00279026760783,14.20310838484068,11.612258319380055,10.64203613917432,22.88982415800014,19.716152974529006,7.886816776014713,25.585456582605193,5.948937583308638,19.64631620790137,27.15260159658071,29.291159026579283,31.129303399237674,25.347857740885047,19.048433715852457,5.9872945603530425,22.66815936629512,19.325057649895996,21.537684277969547,8.156588759023142,2.531177282267496,24.76332313680839,9.683444310757539,29.5725152569788,9.107177512953136,30.28319067604638,17.034012946454943,7.111716031505857,24.02671054334377,10.052898861793786,25.83290822673929,15.554245151720938,29.662079739041793,20.831648134745755,21.262818242981847,19.803091012295532,8.14508434649396,23.00557738976763,18.859395258855734,25.226212455436865,8.69510056720567,19.51932238727416,10.87852134661647,8.380713157582163,17.062877826519074,12.192470377579742,24.016083829881865,5.823604549283936,13.609184569546414,24.151657880357163,30.577349476235675,15.525770087425252,15.755453973033116,21.436772699874325,30.314520470126467,16.801193354270943,7.779218727404209,34.39206023251665,32.988247641111386,5.6295284606083,18.648607751814282,3.505689815303503,31.25023428380199,13.959264244149981,21.311253656141336,21.227922199696344,26.21613883166813,18.3405311582916,16.959063535099922,28.825925239818666,15.492902373872214,7.737494481608778,6.313334240096342,30.40088727882634,31.255892211773,30.831672524162027,19.14434282590995,23.318851892535864,18.889685244100825,12.030762061606373,22.337599978531046,14.20322741191451,17.283854320892008,30.340423468574933,30.986412009035387,15.501213614380127,24.58844313491401,18.50664785777628,26.229350956381282,8.416931824440287,8.222275862053117,20.401422843891474,32.354437540750155,29.667080916555953,17.442510003287858,25.948271286915116,30.604672233661496,37.1274313672714,5.143640665300255,21.63010801962347,24.488528293144107,17.535321675055485,13.564907611364951,30.314223761423197,22.270594116816966,30.389003980826764,36.65950553617026,25.955711085567494,27.138137349504433,7.4430330354817675,13.228200822242535,14.895686398863738,11.410931267616009,25.644656157969127,25.905506473080013,12.868251768415098,13.054059733864847,31.405486641402927,27.494256767827373,18.259439319141336,23.59693213047737,12.136672786817392,9.344964767968374,24.12206479160831,6.262399820999054,27.30986381512976,3.879363198357564,28.201849920905623,25.429452554267684,28.302544675065807,28.702804899515446,27.293886183731242,38.86248505561759,17.300581256615462,31.62184975512115,21.382779833308966,20.931468329705545,28.234732386421523,31.647212927679746,20.311002940375353,34.4646619370926,17.78891399440782,9.14252870348706,36.45903000462358,14.496538284375925,13.768956493000076,11.89796169465058,13.909662113649773,23.773847800214792,30.859184770860534,25.070282259172878,13.147699365420923,32.819608920860766,13.269047018750614,11.16729986152615,28.800871269693374,23.659928028630343,2.124357144300024,30.94522162253626,30.45811297316251,21.079722871777676,23.889658572297485,26.011983700030157,17.917263859839036,18.381373551725613,20.27549653790677,12.300951063971088,17.757284693508286,17.823411860353904,21.126545699466895,17.75417293937182,21.468541163205312,34.69911018729053,6.5753749197250455,18.563754673125004,26.89561586317813,25.052240249512,17.423852851772153,20.97064388328146,10.84546107972482,9.865092794970236,10.280226458804522,21.18614618649491,21.840084232292728,4.697173924871549,17.906839940485845,12.324111651373343,6.009195004857935,2.459822812090451,8.986835326686101,16.635894259743427,30.965982141657857,25.489935858592187,15.278690716451088,7.83526149979727,11.339744310816725,22.669230775480635,28.68506096423105,13.402595075808524,23.614203943135273,8.674625612619433,18.646493405408776,11.774441708407458,25.92346849551057,29.71068455519987,16.158857439036716,19.52484809819326,25.26722880834969,9.034094505143283,20.442162236111262,2.9812604102397477,25.226410180746655,15.58316259562639,6.559330457491472,19.943655271855217,31.553696555681622,10.40025764956598,37.60927276142283,19.111455747020024,21.99054758508845,5.492540956932053,26.750752653697845,22.815779559057678,23.016140743814155,27.74523502760426,19.7163844336225,22.53467094765594,8.482842850633316,27.16838418811011,14.336520836975977,19.208978030989826,12.3007725842041,18.116816710291303,10.127430612473564,20.00243920244192,13.73086252508973,32.3062499421008,26.089739280917975,28.995754916066915,13.647059822488524,6.226884482802011,11.149615844805535,22.20735744653055,26.733194563155422,11.019069243775261,20.985941983373493,12.076918198720875,22.458738996984245,15.57529447450878,21.85683721960332,7.27175962582209,33.414328859590036,8.775377878741391,15.701069227958325,25.122948264191386,26.558543465092963,25.11699819359482,10.835031338319322,18.69237178722775,13.056004748460674,10.555307255725292,20.32656174679601,24.50346943459696,22.029750853380627,27.51601843869457,38.00829331580891,24.307410173822536,28.322562576017894,21.5301704190414,25.436048769954102,33.87468216020244,5.2409390632158726,27.658625714684604,25.822638755201638,11.38718788047617,14.268823466286708,18.695227989870705,19.815181264136157,7.764985690884596,16.453662168275173,9.512674759486913,18.42084408332073,29.4190996184293,32.15095682493951,10.781374646102911,14.893881037685976,11.41762815999698,17.906101987068066,27.827273942865855,12.40389405560375,6.087041788395391,25.323500060751744,19.937708546504485,29.53989407023971,15.7287464651275,19.777569924275156,22.930692450662693,22.703636331051598,4.118921545132865,4.378790257313909,10.300152145912445,12.251121086414194,21.797636461522856,15.87290873032417,1.3501983776847215,15.290883052787368,36.88516867060551,14.142557700034981,18.308183258004306,26.501444480498364,24.384328440612684,5.733535486290919,8.023303118713283,35.64443298881844,21.30499674167179,26.32776509974343,26.868550953980446,18.269482464663614,26.325432148182603,14.13548945645378,19.677825882665047,27.320507996019437,15.359551572315993,20.127431075075854,11.589033537703694,27.13337968242731,12.66250468856109,9.909317019271327,5.566808417097571,21.792859492205316,33.00670132861937,9.137857529203437,9.851016540244789,25.305457495855954,22.72536414026748,36.33174557605458,22.698543496956205,32.76166224580605,35.425127849480624,10.74398634575589,27.036380143152634,15.152798447383189,25.34033526910698,22.702383612546875,25.69530151133894,31.328616889542545,11.747926923986576,38.45797663344922,20.568773326617773,29.967423311054535,21.697228050390095,13.438666117593604,15.680828032097999,24.783002523386028,20.871541971066545,38.86567217276794,21.281868649927706,11.248440132982044,33.13762703619037,19.98045385102321,18.803392967545328,23.048554913247393,20.69424132057034,18.093094618093083,32.887106679972625,23.420350031264707,22.10122552098581,6.801462433955439,19.974334842545026,20.832926134025005,10.75710103404543,16.767716655708412,10.857040354522155,31.16448711463079,22.06452549882289,30.510234813570225,30.003148159879906,21.107934495564802,24.33801066804127,17.889810162921467,26.869035470581196,14.362837992015574,21.87944234040896,31.832488177102515,18.197268216399955,14.173190189485716,3.6301973114583097,33.241611403176506,21.58956506500403,3.850177283823202,26.15667070630432,19.989866182151303,31.293830491540362,29.26695637986662,19.126212307840333,23.853077222415827,17.529310323560196,9.485424444987341,24.819473788883233,22.807293759070195,19.023844543405403,15.628672080687686,16.42074451761353,24.213015290927224,18.693022159208223,8.142240100593776,24.99479379366535,20.23379483088401,31.867378312710848,19.65994763767051,17.275675238253108,26.939526533001114,13.708178887048534,31.041565645679228,24.881495418072966,23.09272548056141,16.55520203002435,18.331541567322194,12.672283771791513,17.531777518369303,9.913752425385645,12.026521596323887,19.608173518830476,26.20903890430031,19.66535008552887,17.885940655970458,13.060998722322509,21.8632841761797,5.2558723306164135,32.804268449802834,15.355892801009707,15.968122155116667,25.32586982216216,18.26519794901506,13.725308553369683,27.547544596218742,12.554212197969576,4.145237792144658,19.865464884056664,33.318014353726554,14.455546860358576,5.105602929549664,22.78047312198366,21.196955092275743,19.964302470519222,25.834209763539526,16.995263133021343,31.98467753685316,24.23533930811095,12.924425823306489,9.554595197107245,11.895013546717301,29.343152390093604,20.18046942567461,18.326225314482926,19.073590549160304,14.65482512859257,31.65922390158567,12.154223878692033,16.000382645078112,19.60311934960808,7.758563544383632,27.65501954798216,12.900007841547065,7.467324964403037,19.90186766675626,29.030927386332255,19.0814076724645,25.934999348900682,11.517263145768956,11.000749593796378,4.797047121705984,20.409931880208475,19.061181895259086,14.680175077775594,9.591605150445787,18.428009156369978,36.93879059137025,10.526887393046035,30.070230323556906,16.83562092900716,20.512637446842305,20.00367098683288,13.65335582482043,4.840870696295174,19.648430268653552,20.160900416001812,5.348642072779608,23.738490556827095,12.649067835382564,8.442453812847447,7.336393631240443,10.79471640592467,19.187738587864924,11.81626504908808,26.2686192392854,23.111179626363313,23.38630508147185,23.508127771167995,14.199224154847924,28.17293972429075,26.79156943766288,34.58479582107969,16.904318325990616,13.450203545131112,20.424868732241066,30.655598110761098,13.116963663981487,7.743974168581849,16.183952556999426,21.567635657607962,11.70557513131926,10.263476119819792,13.25537363249374,9.90908129132356,11.051460596927942,22.354107898001907,13.826070763772428,11.107771997537949,21.78563148809505,22.05913072989283,12.32538661957926,31.30983752410667,19.692549300324103,8.935114273903855,13.64211597698825,19.995401435882506,22.6964929870823,32.81087357747541,28.252449007417155,19.701751542075655,18.852892154594038,6.56363291324646,31.52324555102578,34.56353972721264,10.161192007785697,17.435490644174884,17.990738133416126,11.989379114745141,27.216055428158896,8.583547787587955,31.900588622707737,25.023172017064198,31.592148278503213,13.962388814410396,25.26926913894387,13.807902995170718,10.130496778185332,11.70052287721095,30.20977669612504,26.423227471218414,10.893336516360087,17.989938267718284,33.41012299526624,22.705319684981564,18.161507841485378,14.463944931940453,17.153005467171834,31.47732579044196,8.33021951930158,27.006329463626557,14.15498087422829,16.753198269495503,24.54565346013239,18.439521337180693,24.308301213199663,27.16004464381689,31.359014701771653,7.840105290868191,22.336700269944693,17.133062862664325,26.875897251163632,13.732243543772498,16.81696301393442,35.3482048960642,8.054619207067134,19.604803900122036,17.65243766919964,3.8037623837996914,34.059630068489795,25.644924813240852,22.28009168037054,8.902886282004427,21.046712223174136,20.70732549373377,25.4981916798811,24.696722528790318,9.075703180650567,24.04917145148118,26.31814963650516,28.49294198443888,24.600664751702396,6.879259954873547,19.72781937665974,16.13708115535157,27.820643378901103,22.36243627752413,12.679114877502084,15.369067366094548,15.619912708983588,18.708303102711092,17.388827792830583,21.85508189695684,8.051456630547552,9.082373217692243,34.25942849287827,13.295622243543788,33.83760503657611,5.128413606120512,10.543793754696328,16.579098309811062,8.65521037769749,15.472391346094453,16.43238954562915,20.93959390550372,19.421822680727168,21.468219805227257,16.48129850269601,17.468137830427047,24.023823330890064,26.93420178340738,19.928493974967758,33.61592324717552,12.6386278463718,16.260237823170222,18.112354586721295,37.468643324233035,12.160384539836343,21.99881329264042,17.184886347440475,21.044610039580512,18.582832658176216,13.717254063958357,17.660181198445493,15.87589424187827,10.779383982030057,24.249236753967516,23.257505502234082,17.867533494951807,18.39938977292526,30.84586304902088,22.37993745105298,11.151283427679633,27.974025759614,21.23972492368018,24.54738308072227,25.532741821557853,12.32546926554937,23.412309642901445,32.760435620712094,9.812399786783375,32.54913571956383,26.14518363309717,14.36688873743245,14.977398055914403,25.457669073109585,19.909534596943665,26.99730605503595,30.697338483249396,18.0171920579432,16.051724355059246,21.125566451711048,32.440276689668835,27.01582714288361,28.954750595937377,10.357651331438365,29.144316561358764,13.764381582609495,24.650412763796403,3.6227576351979662,34.04188946619736,17.3382642828447,9.21971267093686,10.505840092529395,26.604973679079592,24.29566790796731,27.628891691087457,8.249305502780091,26.951340586097693,19.671470267733653,31.144033732588742,32.587374632387665,19.914861452633545,21.883438686915888,5.08774033701703,15.644211458090194,14.419715271530222,3.5075219474737773,17.691479158009642,18.04409959083495,17.621850474870186,8.496379908306203,23.479319958126965,28.556774777203657,25.91385696254585,33.104712350665295,26.66368087972358,28.433264541916813,25.17707799145269,11.366275179316009,29.396777065684063,24.36417763804244,22.876614364638975,25.580166387733236,22.269361834654422,17.54540596051121,32.101847545648376,15.812197756719314,15.257140717922631,26.21701302402233,14.890332545186768,16.037404688401516,12.055415108535081,13.65591356239532,6.671839718611565,19.45696392815941,20.233929280006087,19.168288265549343,21.298689987621458,25.565610868135643,23.782326481579034,12.257412878709317,15.054903391205183,12.741042373710027,19.07997362815187,18.91993152243422,17.34227958889106,21.804897308261925,13.51557875074322,30.415809826131582,21.018783817029767,22.801391439278785,16.299178362514773,38.2605330120468,30.50475386418049,19.3635843730582,26.544376483479624,19.87096857818178,23.955020542809116,33.208882849252326,15.784062346030435,17.8100110901388,16.378711856003697,24.65756010436817,17.783421244533557,21.45804632651339,18.547020038747917,17.4804990289511,24.939818018442594,33.815466383908735,14.463691426724449,12.489956086664854,23.61074823769485,15.873940917166426,22.41821329293255,24.817165094443038,14.61024521199306,6.189312642815579,29.74336584931465,36.58839775506932,9.22603335951412,4.754185851712087,33.66011318922162,18.683832362281958,24.084075367039787,21.743057629130753,7.561676958704564,24.100403063213232,26.37609200801591,4.286188722048978,19.145765924689353,28.60778520024236,8.364694522539931,17.84036285569577,28.24911061097539,37.86361841728886,11.999497352932789,5.355066247341851,23.076066428594856,14.708205967959259,15.466718371330138,22.740147270594374,26.4496309021979,23.832727535668845,27.17729197499563,9.47525982750598,1.5208903201674229,31.676956464921275,36.36339625856791,36.930981862789004,29.357138593479583,26.132655029550342,18.62388685845023,21.99309056461854,27.058783236453205,8.83644484793711,22.852311490244546,26.087787699731546,29.404966278615348,21.666946039905756,22.377718011696214,25.709182329494276,13.43417467201299,33.989821721696515,23.89649550200484,24.21653059998158,17.51012960155904,16.13035662231452,19.281879889881154,16.206044439301095,15.959577031039984,32.59367784973689,13.03282569818342,38.09314266902261,22.685547836837678,21.37719691292402,29.13991129165616,33.596627759767145,22.70947893821345,9.224821110293217,20.085408224000222,20.153739386919916,11.286611254602832,22.130500724158995,22.294839146375296,28.08984653415571,32.48332846693319,25.820744541187906,9.636309528026601,17.0755574914677,14.223573769058428,19.105635221115232,26.162644105517604,16.989555554261166,19.883213268336565,14.800051977104236,7.62837145390995,16.142205236599175,8.079723512395422,17.812138573956567,9.940286854000199,25.546794839673,5.066795255845489,24.427538094941525,32.38182211939651,21.067325049350547,19.490941302023824,29.609035966879308,22.64035425590512,34.19103533851367,19.884990248467638,26.57797586629679,27.40175230976039,17.15304270301456,14.70255606203593,17.772571334751515,13.373185804895058,15.750134925090652,16.49184422597342,23.710625453059215,24.38454576865766,28.879181806408795,11.890981415779894,20.287289115785015,11.458011438338659,17.6156880650969,14.980518069990207,33.373665262860904,11.918160017378622,21.580273671362068,24.566384433508098,21.585736595705995,18.12282539618464],"a":[11.823336725956395,13.705213650355033,3.2031955490825093,13.785447028317517,9.178625437859441,11.756329880036489,14.622425802418908,9.41558798665139,18.369117009740336,16.531469484996776,9.748984294048784,19.437880483946365,19.17113744393495,3.446391241697091,10.755592497594604,8.970393540387382,3.8802391220468335,9.705647045326895,17.207990913739767,10.240092783110114,6.792525328646901,18.69495134810493,5.312492425588848,4.238898821395485,17.123492672707286,8.912770298058517,7.645729400513104,6.990827794333461,4.241641188951912,18.203609452697815,18.99932873024078,7.498641662170571,6.545337358573473,7.352826386279294,10.456898277274584,18.53393301939319,12.382534335275546,1.3895349480076913,2.50873073795697,4.7533351418323555,6.526727134336903,6.6421638295698715,2.0877240235052064,6.774310419526812,12.148660424255628,8.410021580031568,16.602362133639716,2.239466061110056,6.006214083219987,8.460552858416438,12.230805766599682,1.6888858579796073,7.8693784736019845,4.183825886639516,6.58290845556035,4.256168292547793,6.973911895962908,11.132677792113842,14.323872368142121,8.773212267567025,18.669078280054883,2.6422983027334324,8.87758774449383,13.091129845851315,0.23456631484660928,10.933973737197235,15.175995080262155,2.5108581348619063,18.029515472557534,1.1525783963379244,1.5779145252092786,9.451729780655143,0.8198632618628832,19.892352137453003,16.74876774773017,10.239094429504906,12.511448299025663,19.045712800060628,10.6113763226587,1.6832150809639357,15.004892030526227,14.26573755165446,5.88335981569593,13.530636924679946,18.84428158196332,0.0674886528123908,17.34702085839593,5.688234311528091,11.330719957120472,5.269580076025195,6.650364156744031,8.409518308992503,19.756650716239555,7.120634872820717,6.422926285487196,2.1733616005089385,3.415279077169089,10.244177391373924,9.807489948178505,1.2149027390164502,12.625897461755793,17.267043777255985,12.63607406528938,1.3597908733903186,13.558160264809903,11.61316569803084,12.76416982431475,12.729799955429485,15.380146804668318,8.787266020989538,11.078426522709277,11.54745384318466,2.6159992732131165,7.277672775663131,14.328374474606612,2.447658008478877,17.9582237182577,8.270382298446055,11.209241422457637,17.769752100505922,6.804287488419538,10.129856456849193,7.259499195060588,12.6245052534099,1.2707664033251564,15.60625017883262,10.710634388463326,12.94472739586376,2.893074462118568,5.121972727429291,3.208349183730528,13.835657683811142,6.51651053036026,4.970501290101383,18.479594046758223,4.806702121098829,14.991763797195418,9.345404894834646,18.13742606679547,16.440753022744943,5.425203689379989,7.342924479807378,3.563767360883565,2.941187356470847,4.80382769194561,4.887609057001501,5.814548038555807,0.8344639031782419,9.061834873991717,2.8527542032263087,16.43514081558328,3.0730762897300146,15.355140135843222,6.996232463162189,2.7726334199375247,7.808615839299011,7.126079810394583,10.546261967430528,10.7555354897546,19.07698835815639,13.957832584961555,11.106509720911525,8.206758131547677,5.112763634913033,13.788920544531909,3.8554796116851264,10.958131249830405,5.302055734747122,14.934243207731836,6.577869323994765,7.4349884181208825,6.607622603219614,7.678359907554522,11.014148350025238,1.0488160698117355,1.09542032033755,17.26838646774872,13.032478289966134,8.082538571695368,6.81356198912114,12.764816828980914,12.187668064749166,14.703206341261033,4.904215207282663,19.599857436386984,19.988029735372894,2.1653395104184803,7.360187386885464,2.565392986555497,18.095394373328197,5.419890185876386,19.651321878904128,14.90742330437056,13.055644262580355,7.161887028492697,3.1699269950668096,19.53417599176603,8.206669289706156,1.515265935234802,0.10891068729740994,15.679003090426953,19.17294708745485,18.403089313023298,3.731726057265914,3.3914909575238594,13.581847228499448,5.294082493994403,19.838442028673096,3.582196628630987,12.26253663356494,14.01288784921205,19.385533069222593,4.863735766295334,5.142612623484588,1.0186080537327857,16.386424174821986,0.8353956120143202,4.334178640573816,14.55944638097824,19.781845686868653,12.741775850574983,1.3766787468951325,13.793669279881717,19.257070071002556,19.738312907293714,0.8774199765831314,10.3809651566851,17.27774976165829,0.5225893815231419,1.3381882746065399,10.593717582717229,6.74951044065645,11.83631412387637,17.967362415359002,12.791062648607285,17.49186065773552,3.9842553414389137,11.006329836096619,14.622224326845217,5.699712333003424,12.96766327527271,17.918089397519008,8.345195140905233,5.477379327947904,13.523952740092557,13.31026272675782,1.1514786570867752,7.882428160420107,11.658486087405496,8.328086590728066,15.304080336542846,6.257067056720267,17.50728168161084,0.07865440641760646,9.73151588789178,7.327389907708244,11.728280012678646,12.232296262842194,18.625701887595202,18.865903754104515,2.291789075416424,15.29235002751534,17.167629025047624,15.009871980265,15.087185672283795,18.85708138246875,8.074027140914897,18.824135506471453,16.777091777200862,2.829092742752386,16.834048848715327,5.809020231771607,13.356253898039249,8.619498248335855,4.254575612551275,19.245086085343203,17.346126993913984,12.982463423919262,2.4131548778502188,18.676745588182804,2.583310687270801,4.80569780703906,19.676398352791857,19.01070047697132,0.05835423685362606,12.625317835456906,17.236461799519155,19.953611475250177,17.255490617039516,16.53933590680346,3.7280083019847376,10.328096674280252,7.656548659510318,1.9621449292072901,0.9161989700364304,6.4509675679449785,8.998895588541714,1.051940524116164,11.879787385994804,15.393242350323213,3.5982353240596554,4.650170474056923,14.849191967834381,19.050807595116375,3.182865101548611,13.774975086370937,8.09142676726248,3.7116212154553585,7.553793896972669,9.64799011672814,10.216730083414518,4.617716582693752,2.357221470258657,0.18569392894657977,0.3521479600725552,1.3981458537836167,0.0770545997436356,0.2827701701642438,15.798837190128609,18.68787851290792,7.373631178294997,4.844809189843509,10.02145699692402,10.44478023604723,13.260141775895576,9.746754915463342,4.96858534973009,4.2710867587564705,9.217797137281746,9.415076882606854,18.229523616153386,17.82114835511345,7.98098888889494,15.271179815455174,15.139617183622601,3.426464579956847,18.042525580411617,0.9145424389109325,16.891871835233516,14.050312624975767,4.838722286346715,2.678788324341941,13.526757509979138,4.005064403588148,18.785511537238566,3.3752782902602263,12.242274712821235,3.075857686075869,12.394544184964694,16.669928662901388,19.932694339826845,11.521265290633513,12.032842260553691,6.05759348753554,7.2742404244283465,16.010285486470742,0.15578100709382703,10.823928978730217,11.510392233677198,13.257226511251176,4.1226027865285975,14.91336651989684,0.5007755192604213,15.216715673925151,9.411321791632767,13.002323794276474,3.472565879950915,5.526754906332525,1.518687234251792,12.393256982874817,16.730297294624556,7.424778085812571,2.6699448821074245,5.634942621452268,8.302926327692632,15.006006871468212,2.0625004460431295,1.6088476751811376,13.78363275694169,1.3540291480080135,6.768905697176728,7.788442663756925,18.56210075112758,11.3920631820192,1.3860465150917234,18.622221725524817,6.7714857558562525,1.651216731531333,1.6750200468829446,13.69885179356411,3.5904744020607193,10.242486828157272,18.529485613277302,6.129190848696093,13.693650656524907,19.952527527952817,18.543097244683597,17.781933083615105,2.6931196171701144,9.318353931208655,12.486017515366385,6.74825898932867,13.979952861048424,14.069562023387782,10.351079688964532,6.295565396000358,0.08323840596220045,3.4587740600120087,0.7545439308592661,18.95936312291141,16.794741364541366,0.1291900393434986,13.409017105668255,3.4161539759474158,9.920345788125626,8.165058605204099,7.052148464348651,1.6637510390684795,17.915383698001158,14.116338204178604,18.794314762048646,13.683530366296285,1.8065102371319197,6.600359540113754,4.969066218104148,2.241812679991657,1.9119882433168023,2.0798774072834947,11.36692649143287,6.537039702018133,0.48533797083262886,0.5008910080502726,0.37347721106590015,19.650190783178072,10.440508105675349,10.163188380327055,19.934461705469523,8.713703824138141,0.6131368809779358,7.720754136418786,19.765205716314085,8.913215488022797,16.83024132104714,15.971163832177675,16.576454588981463,6.687877830816409,9.284137194699777,6.342926207575124,17.73064098898107,4.89544483994337,19.275510496118425,0.9015139222612145,11.542091400638093,10.18610631401101,9.206448024472538,1.213081752239149,7.490803682106124,18.81236686984596,2.9897694173321643,0.33440286546093656,15.880462221574865,8.317520399657985,16.61486222400353,17.215376100245855,19.99675387521872,19.66296312171229,7.779659788376074,7.784309943991876,15.048401241284148,5.571709381788743,10.175323146495687,14.357212244583035,12.265350828668282,5.72931068879535,19.239033581923447,3.770317608734186,12.318881925490516,17.10361056482402,9.350990324519636,12.343446624821777,16.212021606226624,12.251284321995444,19.007034638138492,6.995360087051634,4.268340252703715,14.619513943523499,3.4362252433009344,16.14254645077114,8.998440326186351,6.528064867436365,17.916692809572798,13.150893184763689,8.65920954989052,3.101198400663936,3.6054463522743996,0.5235060468887909,16.196435688611963,0.5164691277529698,13.286842334604444,3.20759603531354,14.30582211118356,15.657506485854448,19.639311903749462,17.315186188770788,6.838786500250711,18.707578109800895,14.437569343062563,11.116243998476097,10.570674451337485,11.015528456864484,13.853126942302719,13.511514401265416,12.840848429934146,1.8535020828942184,13.628723471411481,3.475642926945519,1.648992330932466,15.389440792597263,16.291685064387202,17.593025849760675,17.325390473161974,8.062859430300172,16.130081606230995,2.8757737902966163,8.753909282340926,13.536303585811167,17.175729045931874,6.256771907859706,13.791549278236683,10.39983302465811,17.772560641508313,3.570768294651625,1.5001135003373278,16.382503187480985,9.271424651097742,18.570758484514563,1.2740371235151704,7.95769135772586,14.599762724083213,6.06309499165675,15.131219747015074,12.472360485558367,18.987383077658823,15.588943339630257,2.9494862515156806,2.952230135291125,2.5618795263535477,5.976640652462408,6.585909193045496,12.780285225649045,7.575243891413792,17.853211156439997,15.575814235504994,8.134183199236444,7.899449311154125,3.842579167316962,16.769534457231757,1.4814070970041548,7.777085484318822,14.667926529499606,8.106548935994047,13.443580272757432,15.111858206646014,4.1880613637451125,1.387236564152441,8.895847613621747,16.09356445982529,0.6327355038863391,1.0556797900984227,9.608937776925508,17.850988560115294,2.4297772546294993,15.473074467991555,4.320441014449687,14.928288101560835,6.543947221599722,2.560117708480485,7.085168862639293,1.8827865694753276,18.375192712638217,15.381693725565526,11.062427415404837,18.646631013841453,1.146727890754069,11.908466317400862,9.170749294868067,10.988139609304266,3.148926222537214,7.622381946997572,10.934693124112108,1.452854230645757,6.5411733407406425,7.799489491040865,13.441928745537325,7.892183860360027,10.017767087656013,1.407294206082872,7.452629891640372,1.9059696765044487,4.929373709772902,16.857640644275975,3.307771219717597,3.5305451931064757,3.3684261741693566,18.659860782738413,1.4921418648096152,12.78493401775252,13.417528236210693,12.581340851222102,8.677235590103077,0.07562087050125843,1.6281963106127417,14.61400361764625,11.376238384131078,3.8797670680091167,19.739910167933754,8.98444261818019,0.014790029981806008,1.5364786429733757,1.4316738432386966,16.90406348596429,8.154741583246716,18.187253455961653,5.934929341893809,9.806973135125912,17.6397348446543,2.8099297495281217,14.944708889322653,15.618952761543742,16.439476403065974,5.312469631678116,6.488623896101999,5.699825085594101,14.903656303406843,2.5183001320112597,7.28790377401384,3.908710403315254,12.610424763793153,10.819172001261755,8.240074935617866,12.76618378151747,8.531317122260731,4.21023676187116,13.723601723283672,4.544855721592875,5.111424912056686,15.633765916629025,14.038934333750985,11.971397877948217,16.965659427833714,2.574583898099907,6.342243142479722,10.30198693271494,2.9331206588187175,7.128658050197383,15.642663662892513,18.986221025018825,0.5223770185286769,0.49619405366254643,3.9219054475704285,17.851411221352436,15.50828707058268,0.04093680026426849,14.749188831594196,13.137796338786242,11.10228617222118,16.23125788918589,3.5728663623892,15.766957740251337,6.2384414970562085,12.015539814822503,2.6851999791783987,17.98639886677777,8.473808133706498,8.256138422728515,0.2824661213838464,10.235432270450723,18.45988614692336,7.839643848534297,17.91877407078912,17.111295776451207,10.072859650591631,1.5786570062724259,10.97713933494913,7.951375902885531,11.57574005707341,7.9481064764971965,17.64178345324098,10.991651710375532,6.919768492876108,17.315980889675394,1.5327778145439508,11.554386895109655,11.999255292850858,16.99251744710848,7.662789051651164,19.47675595826762,7.271515304307488,9.74546325906401,10.306860844510496,8.40980560411725,19.28124339708644,7.106480267130353,7.680515377916737,13.981653298407611,2.6136491428150244,14.34548029815478,15.381020657979874,5.217714254592538,2.9357040852690686,16.712745841126804,14.352287423227157,7.238801300996278,18.387337164011612,6.6392627446074926,14.92032242651593,15.143011149285242,14.12975139873097,13.835372388602218,5.924672948772796,1.2556294169306614,5.972499049439985,11.124135155950142,13.554479408938725,5.13534552468248,11.314645522989991,3.1496875396551305,15.875968104217787,11.861697483538226,13.881260351665464,4.218032033215495,3.5091725797172835,16.022456078887434,10.952537244223466,17.050591153709547,4.948441274563757,0.2467861002340177,8.818916354382914,4.772969275573984,7.126823104845004,5.961859867969932,9.856448840422765,6.785018084415251,4.081041258909526,1.2153710870564005,4.304772534340886,8.515350685720797,19.573088546414713,2.505718235747998,14.159463915004604,4.379931591443054,14.304498393285797,6.342170593958234,18.524056913070993,2.3282360521830014,11.988214625726057,10.133064590916963,9.10553591880419,15.284991588360718,3.6949018180176196,8.367867852841147,12.524092069597085,10.495600187089668,18.588658952870727,7.2880583754864015,8.658269747934678,15.572263830263822,11.163862003058686,17.900587045393408,2.163228367034775,8.431847659968517,19.531318962043287,15.527185914816748,7.376268848144405,1.0236675719107646,8.650663608723317,19.124232911679453,0.8568707332847314,16.80228330524958,10.153618287155787,3.9806123119838377,8.851989032223448,12.7500609999027,11.466465779662919,15.583820146768105,12.451226190377698,2.7951005708873033,0.9077509311276044,4.725495770014572,17.626850549896893,18.66214324980289,10.853716204386634,8.808910832813188,16.52550535024352,0.9466730255742206,6.692057680551251,0.803874114085823,18.23064893787447,10.013834690390526,2.737523353839717,4.75839288629845,10.70219941972313,4.553766643174164,15.307731561598686,0.9541534959687414,15.540037973275865,8.244143574759232,17.791920986966264,17.325582673953875,2.62348456627298,2.821211078571557,2.575865496410006,7.896949625953988,4.643892280525845,3.368835279521787,6.678690730620214,10.011730588569382,15.683516938575037,5.410583482068252,17.171713600803674,13.965661833002688,14.900182435061984,17.569776224747674,14.352031436132208,18.671244285060485,19.655422257007565,5.801147877704729,18.42270757571782,7.176589931845263,18.623778693624622,15.649619549832181,8.702274255328328,11.766472638089894,18.467764045251,14.678922051864642,0.20198412254584408,10.894321210651473,12.210505256744181,4.7188188562441,2.0752488832845906,4.29129704864589,5.429025372860048,14.612876080047212,6.506961456404161,14.008434392261812,4.758346525981607,7.116842404800994,10.753706747137443,2.4085931874221833,10.19462255087685,8.275046784775384,10.023075055517001,4.692833792768072,4.431534612702834,16.78807616882701,3.2952477543086944,16.406845640368566,16.648564003572403,11.278839496142407,0.04946582816942602,18.374694156274813,13.756734219260828,7.532110162392454,16.64959965023324,6.676873272440913,18.21894316983776,18.20856992361653,11.380275439664693,7.6811492263511205,0.4205766088499985,10.602177815856585,9.576704017522907,8.998701803772406,7.638268516238638,14.695315299345438,16.282795184109414,16.755422870669577,4.487438839780187,9.454634273377124,3.9110783891074963,0.43268124215483983,7.78719971845554,9.541706999662622,6.541621979014898,3.5174899163970874,12.450637405965107,16.730178356321318,5.151850497053823,3.05744204293128,13.893928640472426,13.136681517992002,13.415667266323407,3.8149064291481416,5.162553806919914,11.618512037527967,15.035764211645093,2.0359209509121357,18.952678271364213,13.482946451255886,1.950860463667854,3.041940412688664,10.257094883065516,18.36007348864072,5.503751114538202,3.3497331741094794,6.102434225487405,14.522526189804754,12.570492731380716,10.910234840623385,14.535410999702666,19.939650673003374,19.804077701679,1.172361342196413,1.282949307010992,16.816111657641475,18.09504233583783,19.059524109942124,13.322181969168273,7.0326652736707596,2.352109797621633,12.498006283184537,15.687543800326713,5.120240913012588,10.92477728871961,17.548785246927746,11.870461498295333,6.658556925966361,6.033236504484627,11.393568525122468,0.7880908455730129,19.79967527252991,7.45640783660229,15.76941209744156,10.321750123167291,12.40031883708042,10.347721368751799,15.580221418761283,6.459846336106421,13.601755429489746,8.49451596729994,19.51070314111228,13.515692701477494,4.657865345509888,13.088776716722403,19.99524992379163,18.715289720576504,5.5801666695977525,17.256395672776268,18.188692699763074,7.379604098836858,9.783480806427551,17.73402619655819,15.340057289187028,17.11915019749245,15.440692135470385,2.102906837749754,6.313479543506064,2.229667549775014,3.4056873954957823,6.786193241030651,16.229944834333594,9.081367730308564,0.7708040121626025,4.221722549466134,1.85260002454676,4.8340187616314845,10.72761275457831,4.272837397000111,13.783633478289513,0.6848030428110885,8.783866283096845,13.603055679029277,3.190124226111135,13.814263239514641,10.42050949512781,2.941262280389183,17.114244870479006,10.288599088877145,7.96018521488878,10.882627330859385,6.064384960987783,1.974362078872538,1.2837654873681004,10.01142983054001,10.34735617993495,16.203883543518124,14.343751064729462,11.795017920125336,15.147652762455603,4.948553726658882,1.4900730744505575,2.932620641617163,4.108293590672152,13.550603625475217,15.542512136792737,6.686473219039373,12.517541103450185,12.73271528081196,10.604698165132614,1.7765875400726872]}

},{}],50:[function(require,module,exports){
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
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var abs = require( '@stdlib/math/base/special/abs' );
var PINF = require( '@stdlib/constants/float64/pinf' );
var NINF = require( '@stdlib/constants/float64/ninf' );
var EPS = require( '@stdlib/constants/float64/eps' );
var factory = require( './../lib/factory.js' );


// FIXTURES //

var smallRange = require( './fixtures/julia/small_range.json' );
var mediumRange = require( './fixtures/julia/medium_range.json' );
var largeRange = require( './fixtures/julia/large_range.json' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.strictEqual( typeof factory, 'function', 'main export is a function' );
	t.end();
});

tape( 'the function returns a function', function test( t ) {
	var pdf = factory( 0.0, 1.0 );
	t.equal( typeof pdf, 'function', 'returns a function' );
	t.end();
});

tape( 'if provided `NaN` for any parameter, the created function returns `NaN`', function test( t ) {
	var pdf;
	var y;

	pdf = factory( 0.0, 1.0 );
	y = pdf( NaN );
	t.equal( isnan( y ), true, 'returns NaN' );

	pdf = factory( NaN, 1.0 );
	y = pdf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	pdf = factory( 1.0, NaN );
	y = pdf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	pdf = factory( NaN, NaN );
	y = pdf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	pdf = factory( NaN, NaN );
	y = pdf( NaN );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'if provided a finite `a` and `b`, the function returns a function which returns `0` when provided `+infinity` for `x`', function test( t ) {
	var pdf;
	var y;

	pdf = factory( 0.5, 1.0 );
	y = pdf( PINF );
	t.equal( y, 0.0, 'returns 0' );

	t.end();
});

tape( 'if provided a finite `a` and `b`, the function returns a function which returns `0` when provided `-infinity` for `x`', function test( t ) {
	var pdf;
	var y;

	pdf = factory( 0.5, 1.0 );
	y = pdf( NINF );
	t.equal( y, 0.0, 'returns 0' );

	t.end();
});

tape( 'if provided `a >= b`, the created function always returns `NaN`', function test( t ) {
	var pdf;
	var y;

	pdf = factory( 0.0, -1.0 );

	y = pdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = pdf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	pdf = factory( 0.0, NINF );
	y = pdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	pdf = factory( PINF, NINF );
	y = pdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	pdf = factory( NINF, NINF );
	y = pdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	pdf = factory( NaN, NINF );
	y = pdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'the created function evaluates the pdf for `x` given small range `b - a`', function test( t ) {
	var expected;
	var delta;
	var pdf;
	var tol;
	var a;
	var b;
	var i;
	var x;
	var y;

	expected = smallRange.expected;
	x = smallRange.x;
	a = smallRange.a;
	b = smallRange.b;
	for ( i = 0; i < x.length; i++ ) {
		pdf = factory( a[i], b[i] );
		y = pdf( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', a: '+a[i]+', b: '+b[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 1.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. a: '+a[i]+'. b: '+b[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the created function evaluates the pdf for `x` given a medium range `b - a`', function test( t ) {
	var expected;
	var delta;
	var pdf;
	var tol;
	var a;
	var b;
	var i;
	var x;
	var y;

	expected = mediumRange.expected;
	x = mediumRange.x;
	a = mediumRange.a;
	b = mediumRange.b;
	for ( i = 0; i < x.length; i++ ) {
		pdf = factory( a[i], b[i] );
		y = pdf( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', a: '+a[i]+', b: '+b[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 1.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. a: '+a[i]+'. b: '+b[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the created function evaluates the pdf for `x` given a large range `b - a`', function test( t ) {
	var expected;
	var delta;
	var pdf;
	var tol;
	var a;
	var b;
	var i;
	var x;
	var y;

	expected = largeRange.expected;
	x = largeRange.x;
	a = largeRange.a;
	b = largeRange.b;
	for ( i = 0; i < x.length; i++ ) {
		pdf = factory( a[i], b[i] );
		y = pdf( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', a: '+a[i]+', b: '+b[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 1.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. a: '+a[i]+'. b: '+b[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

}).call(this)}).call(this,"/lib/node_modules/@stdlib/stats/base/dists/arcsine/pdf/test/test.factory.js")
},{"./../lib/factory.js":44,"./fixtures/julia/large_range.json":47,"./fixtures/julia/medium_range.json":48,"./fixtures/julia/small_range.json":49,"@stdlib/constants/float64/eps":27,"@stdlib/constants/float64/ninf":28,"@stdlib/constants/float64/pinf":30,"@stdlib/math/base/assert/is-nan":31,"@stdlib/math/base/special/abs":33,"tape":228}],51:[function(require,module,exports){
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
var pdf = require( './../lib' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.strictEqual( typeof pdf, 'function', 'main export is a function' );
	t.end();
});

tape( 'attached to the main export is a factory method for generating `pdf` functions', function test( t ) {
	t.equal( typeof pdf.factory, 'function', 'exports a factory method' );
	t.end();
});

}).call(this)}).call(this,"/lib/node_modules/@stdlib/stats/base/dists/arcsine/pdf/test/test.js")
},{"./../lib":45,"tape":228}],52:[function(require,module,exports){
(function (__filename,__dirname){(function (){
/**
* @license Apache-2.0
*
* Copyright (c) 2024 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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
var tape = require( 'tape' );
var tryRequire = require( '@stdlib/utils/try-require' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var abs = require( '@stdlib/math/base/special/abs' );
var PINF = require( '@stdlib/constants/float64/pinf' );
var NINF = require( '@stdlib/constants/float64/ninf' );
var EPS = require( '@stdlib/constants/float64/eps' );


// FIXTURES //

var smallRange = require( './fixtures/julia/small_range.json' );
var mediumRange = require( './fixtures/julia/medium_range.json' );
var largeRange = require( './fixtures/julia/large_range.json' );


// VARIABLES //

var pdf = tryRequire( resolve( __dirname, './../lib/native.js' ) );
var opts = {
	'skip': ( pdf instanceof Error )
};


// TESTS //

tape( 'main export is a function', opts, function test( t ) {
	t.ok( true, __filename );
	t.strictEqual( typeof pdf, 'function', 'main export is a function' );
	t.end();
});

tape( 'if provided `NaN` for any parameter, the function returns `NaN`', opts, function test( t ) {
	var y = pdf( NaN, 0.0, 1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );
	y = pdf( 0.0, NaN, 1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );
	y = pdf( 0.0, 1.0, NaN );
	t.equal( isnan( y ), true, 'returns NaN' );
	t.end();
});

tape( 'if provided `+infinity` for `x` and a finite `a` and `b`, the function returns `0`', opts, function test( t ) {
	var y = pdf( PINF, 0.0, 1.0 );
	t.equal( y, 0.0, 'returns 0' );
	t.end();
});

tape( 'if provided `-infinity` for `x` and a finite `a` and `b`, the function returns `0`', opts, function test( t ) {
	var y = pdf( NINF, 0.0, 1.0 );
	t.equal( y, 0.0, 'returns 0' );
	t.end();
});

tape( 'if provided `a >= b`, the function returns `NaN`', opts, function test( t ) {
	var y;

	y = pdf( 2.0, 3.0, 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = pdf( 0.0, 2.0, 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = pdf( 2.0, NINF, NINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = pdf( 2.0, PINF, NINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'the function evaluates the pdf for `x` given a small range `b - a`', opts, function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var a;
	var b;
	var y;
	var i;

	expected = smallRange.expected;
	x = smallRange.x;
	a = smallRange.a;
	b = smallRange.b;
	for ( i = 0; i < x.length; i++ ) {
		y = pdf( x[i], a[i], b[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', a: '+a[i]+', b: '+b[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 1.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. a: '+a[i]+'. b: '+b[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the function evaluates the pdf for `x` given a medium range `b - a`', opts, function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var a;
	var b;
	var y;
	var i;

	expected = mediumRange.expected;
	x = mediumRange.x;
	a = mediumRange.a;
	b = mediumRange.b;
	for ( i = 0; i < x.length; i++ ) {
		y = pdf( x[i], a[i], b[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', a: '+a[i]+', b: '+b[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 1.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. a: '+a[i]+'. b: '+b[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the function evaluates the pdf for `x` given a large range `b - a`', opts, function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var a;
	var b;
	var y;
	var i;

	expected = largeRange.expected;
	x = largeRange.x;
	a = largeRange.a;
	b = largeRange.b;
	for ( i = 0; i < x.length; i++ ) {
		y = pdf( x[i], a[i], b[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', a: '+a[i]+', b: '+b[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 1.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. a: '+a[i]+'. b: '+b[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

}).call(this)}).call(this,"/lib/node_modules/@stdlib/stats/base/dists/arcsine/pdf/test/test.native.js","/lib/node_modules/@stdlib/stats/base/dists/arcsine/pdf/test")
},{"./fixtures/julia/large_range.json":47,"./fixtures/julia/medium_range.json":48,"./fixtures/julia/small_range.json":49,"@stdlib/constants/float64/eps":27,"@stdlib/constants/float64/ninf":28,"@stdlib/constants/float64/pinf":30,"@stdlib/math/base/assert/is-nan":31,"@stdlib/math/base/special/abs":33,"@stdlib/utils/try-require":96,"path":110,"tape":228}],53:[function(require,module,exports){
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
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var abs = require( '@stdlib/math/base/special/abs' );
var PINF = require( '@stdlib/constants/float64/pinf' );
var NINF = require( '@stdlib/constants/float64/ninf' );
var EPS = require( '@stdlib/constants/float64/eps' );
var pdf = require( './../lib' );


// FIXTURES //

var smallRange = require( './fixtures/julia/small_range.json' );
var mediumRange = require( './fixtures/julia/medium_range.json' );
var largeRange = require( './fixtures/julia/large_range.json' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.strictEqual( typeof pdf, 'function', 'main export is a function' );
	t.end();
});

tape( 'if provided `NaN` for any parameter, the function returns `NaN`', function test( t ) {
	var y = pdf( NaN, 0.0, 1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );
	y = pdf( 0.0, NaN, 1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );
	y = pdf( 0.0, 1.0, NaN );
	t.equal( isnan( y ), true, 'returns NaN' );
	t.end();
});

tape( 'if provided `+infinity` for `x` and a finite `a` and `b`, the function returns `0`', function test( t ) {
	var y = pdf( PINF, 0.0, 1.0 );
	t.equal( y, 0.0, 'returns 0' );
	t.end();
});

tape( 'if provided `-infinity` for `x` and a finite `a` and `b`, the function returns `0`', function test( t ) {
	var y = pdf( NINF, 0.0, 1.0 );
	t.equal( y, 0.0, 'returns 0' );
	t.end();
});

tape( 'if provided `a >= b`, the function returns `NaN`', function test( t ) {
	var y;

	y = pdf( 2.0, 3.0, 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = pdf( 0.0, 2.0, 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = pdf( 2.0, NINF, NINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = pdf( 2.0, PINF, NINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'the function evaluates the pdf for `x` given a small range `b - a`', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var a;
	var b;
	var y;
	var i;

	expected = smallRange.expected;
	x = smallRange.x;
	a = smallRange.a;
	b = smallRange.b;
	for ( i = 0; i < x.length; i++ ) {
		y = pdf( x[i], a[i], b[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', a: '+a[i]+', b: '+b[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 1.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. a: '+a[i]+'. b: '+b[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the function evaluates the pdf for `x` given a medium range `b - a`', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var a;
	var b;
	var y;
	var i;

	expected = mediumRange.expected;
	x = mediumRange.x;
	a = mediumRange.a;
	b = mediumRange.b;
	for ( i = 0; i < x.length; i++ ) {
		y = pdf( x[i], a[i], b[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', a: '+a[i]+', b: '+b[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 1.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. a: '+a[i]+'. b: '+b[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the function evaluates the pdf for `x` given a large range `b - a`', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var a;
	var b;
	var y;
	var i;

	expected = largeRange.expected;
	x = largeRange.x;
	a = largeRange.a;
	b = largeRange.b;
	for ( i = 0; i < x.length; i++ ) {
		y = pdf( x[i], a[i], b[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', a: '+a[i]+', b: '+b[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 1.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. a: '+a[i]+'. b: '+b[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

}).call(this)}).call(this,"/lib/node_modules/@stdlib/stats/base/dists/arcsine/pdf/test/test.pdf.js")
},{"./../lib":45,"./fixtures/julia/large_range.json":47,"./fixtures/julia/medium_range.json":48,"./fixtures/julia/small_range.json":49,"@stdlib/constants/float64/eps":27,"@stdlib/constants/float64/ninf":28,"@stdlib/constants/float64/pinf":30,"@stdlib/math/base/assert/is-nan":31,"@stdlib/math/base/special/abs":33,"tape":228}],54:[function(require,module,exports){
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
			out = replace.call( out, RE_PERIOD_ZERO_EXP, 'e' );
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

},{"./is_number.js":57}],55:[function(require,module,exports){
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

},{"./is_number.js":57,"./zero_pad.js":61}],56:[function(require,module,exports){
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

var main = require( './main.js' );


// EXPORTS //

module.exports = main;

},{"./main.js":59}],57:[function(require,module,exports){
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

},{}],58:[function(require,module,exports){
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

},{}],59:[function(require,module,exports){
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
var isArray = Array.isArray; // NOTE: We use the global `Array.isArray` function here instead of `@stdlib/assert/is-array` to avoid circular dependencies.


// FUNCTIONS //

/**
* Returns a boolean indicating whether a value is `NaN`.
*
* @private
* @param {*} value - input value
* @returns {boolean} boolean indicating whether a value is `NaN`
*
* @example
* var bool = isnan( NaN );
* // returns true
*
* @example
* var bool = isnan( 4 );
* // returns false
*/
function isnan( value ) { // explicitly define a function here instead of `@stdlib/math/base/assert/is-nan` in order to avoid circular dependencies
	return ( value !== value );
}

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
				token.arg = String( token.arg );
				break;
			case 'c':
				// Case: %c (character)
				if ( !isnan( token.arg ) ) {
					num = parseInt( token.arg, 10 );
					if ( num < 0 || num > 127 ) {
						throw new Error( 'invalid character code. Value: ' + token.arg );
					}
					token.arg = ( isnan( num ) ) ? String( token.arg ) : fromCharCode( num ); // eslint-disable-line max-len
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

},{"./format_double.js":54,"./format_integer.js":55,"./is_string.js":58,"./space_pad.js":60,"./zero_pad.js":61}],60:[function(require,module,exports){
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

var main = require( './main.js' );


// EXPORTS //

module.exports = main;

},{"./main.js":63}],63:[function(require,module,exports){
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

var main = require( './main.js' );


// EXPORTS //

module.exports = main;

},{"./main.js":66}],65:[function(require,module,exports){
arguments[4][58][0].apply(exports,arguments)
},{"dup":58}],66:[function(require,module,exports){
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
	var args;
	var i;

	if ( !isString( str ) ) {
		throw new TypeError( format( 'invalid argument. First argument must be a string. Value: `%s`.', str ) );
	}
	args = [ tokenize( str ) ];
	for ( i = 1; i < arguments.length; i++ ) {
		args.push( arguments[ i ] );
	}
	return interpolate.apply( null, args );
}


// EXPORTS //

module.exports = format;

},{"./is_string.js":65,"@stdlib/string/base/format-interpolate":56,"@stdlib/string/base/format-tokenize":62}],67:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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
* Symbol factory.
*
* @module @stdlib/symbol/ctor
*
* @example
* var Symbol = require( '@stdlib/symbol/ctor' );
*
* var s = Symbol( 'beep' );
* // returns <symbol>
*/

// MODULES //

var main = require( './main.js' );


// EXPORTS //

module.exports = main;

},{"./main.js":68}],68:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

var Sym = ( typeof Symbol === 'function' ) ? Symbol : void 0; // eslint-disable-line stdlib/require-globals


// EXPORTS //

module.exports = Sym;

},{}],69:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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
* Create a constant function.
*
* @module @stdlib/utils/constant-function
*
* @example
* var constantFunction = require( '@stdlib/utils/constant-function' );
*
* var fcn = constantFunction( 3.14 );
*
* var v = fcn();
* // returns 3.14
*
* v = fcn();
* // returns 3.14
*
* v = fcn();
* // returns 3.14
*/

// MODULES //

var main = require( './main.js' );


// EXPORTS //

module.exports = main;

},{"./main.js":70}],70:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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
* Creates a function which always returns the same value.
*
* @param {*} [value] - value to always return
* @returns {Function} constant function
*
* @example
* var fcn = wrap( 3.14 );
*
* var v = fcn();
* // returns 3.14
*
* v = fcn();
* // returns 3.14
*
* v = fcn();
* // returns 3.14
*/
function wrap( value ) {
	return constantFunction;

	/**
	* Constant function.
	*
	* @private
	* @returns {*} constant value
	*/
	function constantFunction() {
		return value;
	}
}


// EXPORTS //

module.exports = wrap;

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

var main = require( './main.js' );


// EXPORTS //

module.exports = main;

},{"./main.js":72}],72:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"@stdlib/assert/is-buffer":15,"@stdlib/regexp/function-name":41,"@stdlib/utils/native-class":91}],73:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

var main = require( './main.js' );


// EXPORTS //

module.exports = main;

},{"./main.js":74}],74:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"@stdlib/utils/define-property":78}],75:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

// MAIN //

var main = ( typeof Object.defineProperty === 'function' ) ? Object.defineProperty : null;


// EXPORTS //

module.exports = main;

},{}],77:[function(require,module,exports){
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

},{"./define_property.js":76}],78:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./builtin.js":75,"./has_define_property_support.js":77,"./polyfill.js":79}],79:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
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

},{"@stdlib/string/format":64}],80:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./native.js":83,"./polyfill.js":84,"@stdlib/assert/is-function":19}],81:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

var main = require( './main.js' );


// EXPORTS //

module.exports = main;

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

var Object = require( '@stdlib/object/ctor' );
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

},{"./detect.js":80,"@stdlib/object/ctor":39}],83:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./proto.js":85,"@stdlib/utils/native-class":91}],85:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],86:[function(require,module,exports){
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

var isBoolean = require( '@stdlib/assert/is-boolean' ).isPrimitive;
var format = require( '@stdlib/string/format' );
var getThis = require( './codegen.js' );
var Self = require( './self.js' );
var Win = require( './window.js' );
var GlobalThis = require( './global_this.js' );


// MAIN //

/**
* Returns the global object.
*
* ## Notes
*
* -   Using code generation is the **most** reliable way to resolve the global object; however, doing so is likely to violate content security policies (CSPs) in, e.g., Chrome Apps and elsewhere.
*
* @private
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
	// Case: 2020 revision of ECMAScript standard
	if ( GlobalThis ) {
		return GlobalThis;
	}
	// Case: browsers and web workers
	if ( Self ) {
		return Self;
	}
	// Case: browsers
	if ( Win ) {
		return Win;
	}
	// Case: unknown
	throw new Error( 'unexpected error. Unable to resolve global object.' );
}


// EXPORTS //

module.exports = getGlobal;

},{"./codegen.js":87,"./global_this.js":88,"./self.js":89,"./window.js":90,"@stdlib/assert/is-boolean":9,"@stdlib/string/format":64}],87:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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
	return new Function( 'return this;' )(); // eslint-disable-line no-new-func, stdlib/require-globals
}


// EXPORTS //

module.exports = getGlobal;

},{}],88:[function(require,module,exports){
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

// MAIN //

var obj = ( typeof globalThis === 'object' ) ? globalThis : null; // eslint-disable-line no-undef


// EXPORTS //

module.exports = obj;

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

var obj = ( typeof self === 'object' ) ? self : null;


// EXPORTS //

module.exports = obj;

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

// MAIN //

var obj = ( typeof window === 'object' ) ? window : null;


// EXPORTS //

module.exports = obj;

},{}],91:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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
var builtin = require( './main.js' );
var polyfill = require( './polyfill.js' );


// MAIN //

var main;
if ( hasToStringTag() ) {
	main = polyfill;
} else {
	main = builtin;
}


// EXPORTS //

module.exports = main;

},{"./main.js":92,"./polyfill.js":93,"@stdlib/assert/has-tostringtag-support":5}],92:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./tostring.js":94}],93:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./tostring.js":94,"./tostringtag.js":95,"@stdlib/assert/has-own-property":1}],94:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],95:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

var Symbol = require( '@stdlib/symbol/ctor' );


// MAIN //

var toStrTag = ( typeof Symbol === 'function' ) ? Symbol.toStringTag : '';


// EXPORTS //

module.exports = toStrTag;

},{"@stdlib/symbol/ctor":67}],96:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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
* Wrap `require` in a try/catch block.
*
* @module @stdlib/utils/try-require
*
* @example
* var tryRequire = require( '@stdlib/utils/try-require' );
*
* var out = tryRequire( 'beepboop' );
*
* if ( out instanceof Error ) {
*     console.log( out.message );
* }
*/

// MODULES //

var main = require( './main.js' );


// EXPORTS //

module.exports = main;

},{"./main.js":97}],97:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

var isError = require( '@stdlib/assert/is-error' );


// MAIN //

/**
* Wraps `require` in a try/catch block.
*
* @param {string} id - module id
* @returns {*|Error} `module.exports` of the resolved module or an error
*
* @example
* var out = tryRequire( 'beepboop' );
*
* if ( out instanceof Error ) {
*     console.error( out.message );
* }
*/
function tryRequire( id ) {
	try {
		return require( id ); // eslint-disable-line stdlib/no-dynamic-require
	} catch ( error ) {
		if ( isError( error ) ) {
			return error;
		}
		// Handle case where a literal is thrown...
		if ( typeof error === 'object' ) {
			return new Error( JSON.stringify( error ) );
		}
		return new Error( error.toString() );
	}
}


// EXPORTS //

module.exports = tryRequire;

},{"@stdlib/assert/is-error":17}],98:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./fixtures/nodelist.js":99,"./fixtures/re.js":100,"./fixtures/typedarray.js":101}],99:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"@stdlib/utils/global":86}],100:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],101:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],102:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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
var builtin = require( './main.js' );
var polyfill = require( './polyfill.js' );


// MAIN //

var main = ( usePolyfill() ) ? polyfill : builtin;


// EXPORTS //

module.exports = main;

},{"./check.js":98,"./main.js":103,"./polyfill.js":104}],103:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"@stdlib/utils/constructor-name":71}],104:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"@stdlib/utils/constructor-name":71}],105:[function(require,module,exports){
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

},{}],106:[function(require,module,exports){

},{}],107:[function(require,module,exports){
arguments[4][106][0].apply(exports,arguments)
},{"dup":106}],108:[function(require,module,exports){
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
},{"base64-js":105,"buffer":108,"ieee754":211}],109:[function(require,module,exports){
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

},{}],110:[function(require,module,exports){
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
},{"_process":218}],111:[function(require,module,exports){
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

},{"events":109,"inherits":212,"readable-stream/lib/_stream_duplex.js":113,"readable-stream/lib/_stream_passthrough.js":114,"readable-stream/lib/_stream_readable.js":115,"readable-stream/lib/_stream_transform.js":116,"readable-stream/lib/_stream_writable.js":117,"readable-stream/lib/internal/streams/end-of-stream.js":121,"readable-stream/lib/internal/streams/pipeline.js":123}],112:[function(require,module,exports){
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

},{}],113:[function(require,module,exports){
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
},{"./_stream_readable":115,"./_stream_writable":117,"_process":218,"inherits":212}],114:[function(require,module,exports){
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
},{"./_stream_transform":116,"inherits":212}],115:[function(require,module,exports){
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
},{"../errors":112,"./_stream_duplex":113,"./internal/streams/async_iterator":118,"./internal/streams/buffer_list":119,"./internal/streams/destroy":120,"./internal/streams/from":122,"./internal/streams/state":124,"./internal/streams/stream":125,"_process":218,"buffer":108,"events":109,"inherits":212,"string_decoder/":227,"util":106}],116:[function(require,module,exports){
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
},{"../errors":112,"./_stream_duplex":113,"inherits":212}],117:[function(require,module,exports){
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
},{"../errors":112,"./_stream_duplex":113,"./internal/streams/destroy":120,"./internal/streams/state":124,"./internal/streams/stream":125,"_process":218,"buffer":108,"inherits":212,"util-deprecate":236}],118:[function(require,module,exports){
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
},{"./end-of-stream":121,"_process":218}],119:[function(require,module,exports){
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
},{"buffer":108,"util":106}],120:[function(require,module,exports){
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
},{"_process":218}],121:[function(require,module,exports){
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
},{"../../../errors":112}],122:[function(require,module,exports){
module.exports = function () {
  throw new Error('Readable.from is not available in the browser')
};

},{}],123:[function(require,module,exports){
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
},{"../../../errors":112,"./end-of-stream":121}],124:[function(require,module,exports){
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
},{"../../../errors":112}],125:[function(require,module,exports){
module.exports = require('events').EventEmitter;

},{"events":109}],126:[function(require,module,exports){
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

},{"./":127,"get-intrinsic":202}],127:[function(require,module,exports){
'use strict';

var bind = require('function-bind');
var GetIntrinsic = require('get-intrinsic');
var setFunctionLength = require('set-function-length');

var $TypeError = require('es-errors/type');
var $apply = GetIntrinsic('%Function.prototype.apply%');
var $call = GetIntrinsic('%Function.prototype.call%');
var $reflectApply = GetIntrinsic('%Reflect.apply%', true) || bind.call($call, $apply);

var $defineProperty = require('es-define-property');
var $max = GetIntrinsic('%Math.max%');

module.exports = function callBind(originalFunction) {
	if (typeof originalFunction !== 'function') {
		throw new $TypeError('a function is required');
	}
	var func = $reflectApply(bind, $call, arguments);
	return setFunctionLength(
		func,
		1 + $max(0, originalFunction.length - (arguments.length - 1)),
		true
	);
};

var applyBind = function applyBind() {
	return $reflectApply(bind, $apply, arguments);
};

if ($defineProperty) {
	$defineProperty(module.exports, 'apply', { value: applyBind });
} else {
	module.exports.apply = applyBind;
}

},{"es-define-property":187,"es-errors/type":193,"function-bind":201,"get-intrinsic":202,"set-function-length":222}],128:[function(require,module,exports){
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

},{"./lib/is_arguments.js":129,"./lib/keys.js":130}],129:[function(require,module,exports){
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

},{}],130:[function(require,module,exports){
exports = module.exports = typeof Object.keys === 'function'
  ? Object.keys : shim;

exports.shim = shim;
function shim (obj) {
  var keys = [];
  for (var key in obj) keys.push(key);
  return keys;
}

},{}],131:[function(require,module,exports){
'use strict';

var $defineProperty = require('es-define-property');

var $SyntaxError = require('es-errors/syntax');
var $TypeError = require('es-errors/type');

var gopd = require('gopd');

/** @type {import('.')} */
module.exports = function defineDataProperty(
	obj,
	property,
	value
) {
	if (!obj || (typeof obj !== 'object' && typeof obj !== 'function')) {
		throw new $TypeError('`obj` must be an object or a function`');
	}
	if (typeof property !== 'string' && typeof property !== 'symbol') {
		throw new $TypeError('`property` must be a string or a symbol`');
	}
	if (arguments.length > 3 && typeof arguments[3] !== 'boolean' && arguments[3] !== null) {
		throw new $TypeError('`nonEnumerable`, if provided, must be a boolean or null');
	}
	if (arguments.length > 4 && typeof arguments[4] !== 'boolean' && arguments[4] !== null) {
		throw new $TypeError('`nonWritable`, if provided, must be a boolean or null');
	}
	if (arguments.length > 5 && typeof arguments[5] !== 'boolean' && arguments[5] !== null) {
		throw new $TypeError('`nonConfigurable`, if provided, must be a boolean or null');
	}
	if (arguments.length > 6 && typeof arguments[6] !== 'boolean') {
		throw new $TypeError('`loose`, if provided, must be a boolean');
	}

	var nonEnumerable = arguments.length > 3 ? arguments[3] : null;
	var nonWritable = arguments.length > 4 ? arguments[4] : null;
	var nonConfigurable = arguments.length > 5 ? arguments[5] : null;
	var loose = arguments.length > 6 ? arguments[6] : false;

	/* @type {false | TypedPropertyDescriptor<unknown>} */
	var desc = !!gopd && gopd(obj, property);

	if ($defineProperty) {
		$defineProperty(obj, property, {
			configurable: nonConfigurable === null && desc ? desc.configurable : !nonConfigurable,
			enumerable: nonEnumerable === null && desc ? desc.enumerable : !nonEnumerable,
			value: value,
			writable: nonWritable === null && desc ? desc.writable : !nonWritable
		});
	} else if (loose || (!nonEnumerable && !nonWritable && !nonConfigurable)) {
		// must fall back to [[Set]], and was not explicitly asked to make non-enumerable, non-writable, or non-configurable
		obj[property] = value; // eslint-disable-line no-param-reassign
	} else {
		throw new $SyntaxError('This environment does not support defining a property as non-configurable, non-writable, or non-enumerable.');
	}
};

},{"es-define-property":187,"es-errors/syntax":192,"es-errors/type":193,"gopd":203}],132:[function(require,module,exports){
'use strict';

var keys = require('object-keys');
var hasSymbols = typeof Symbol === 'function' && typeof Symbol('foo') === 'symbol';

var toStr = Object.prototype.toString;
var concat = Array.prototype.concat;
var defineDataProperty = require('define-data-property');

var isFunction = function (fn) {
	return typeof fn === 'function' && toStr.call(fn) === '[object Function]';
};

var supportsDescriptors = require('has-property-descriptors')();

var defineProperty = function (object, name, value, predicate) {
	if (name in object) {
		if (predicate === true) {
			if (object[name] === value) {
				return;
			}
		} else if (!isFunction(predicate) || !predicate()) {
			return;
		}
	}

	if (supportsDescriptors) {
		defineDataProperty(object, name, value, true);
	} else {
		defineDataProperty(object, name, value);
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

},{"define-data-property":131,"has-property-descriptors":204,"object-keys":216}],133:[function(require,module,exports){
module.exports = function () {
    for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] !== undefined) return arguments[i];
    }
};

},{}],134:[function(require,module,exports){
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

},{"./ToNumber":165,"./ToPrimitive":167,"./Type":172}],135:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $Number = GetIntrinsic('%Number%');
var $TypeError = require('es-errors/type');

var $isNaN = require('../helpers/isNaN');
var $isFinite = require('../helpers/isFinite');
var isPrefixOf = require('../helpers/isPrefixOf');

var ToNumber = require('./ToNumber');
var ToPrimitive = require('./ToPrimitive');

// https://262.ecma-international.org/5.1/#sec-11.8.5

// eslint-disable-next-line max-statements
module.exports = function AbstractRelationalComparison(x, y, LeftFirst) {
	if (typeof LeftFirst !== 'boolean') {
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
	var bothStrings = typeof px === 'string' && typeof py === 'string';
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

},{"../helpers/isFinite":180,"../helpers/isNaN":181,"../helpers/isPrefixOf":182,"./ToNumber":165,"./ToPrimitive":167,"es-errors/type":193,"get-intrinsic":202}],136:[function(require,module,exports){
'use strict';

var $TypeError = require('es-errors/type');

var callBound = require('call-bind/callBound');

var $charCodeAt = callBound('String.prototype.charCodeAt');
var $toUpperCase = callBound('String.prototype.toUpperCase');

// https://262.ecma-international.org/5.1/#sec-15.10.2.8

module.exports = function Canonicalize(ch, IgnoreCase) {
	if (typeof ch !== 'string' || ch.length !== 1) {
		throw new $TypeError('Assertion failed: `ch` must be a character');
	}

	if (typeof IgnoreCase !== 'boolean') {
		throw new $TypeError('Assertion failed: `IgnoreCase` must be a Boolean');
	}

	if (!IgnoreCase) {
		return ch; // step 1
	}

	var u = $toUpperCase(ch); // step 2

	if (u.length !== 1) {
		return ch; // step 3
	}

	var cu = u; // step 4

	if ($charCodeAt(ch, 0) >= 128 && $charCodeAt(cu, 0) < 128) {
		return ch; // step 5
	}

	return cu;
};

},{"call-bind/callBound":126,"es-errors/type":193}],137:[function(require,module,exports){
'use strict';

var RequireObjectCoercible = require('es-object-atoms/RequireObjectCoercible');

// http://262.ecma-international.org/5.1/#sec-9.10

module.exports = function CheckObjectCoercible(value) {
	return RequireObjectCoercible(value, arguments.length > 1 ? arguments[1] : void undefined);
};

},{"es-object-atoms/RequireObjectCoercible":195}],138:[function(require,module,exports){
'use strict';

var $EvalError = require('es-errors/eval');

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

},{"./DayWithinYear":141,"./InLeapYear":145,"./MonthFromTime":155,"es-errors/eval":188}],139:[function(require,module,exports){
'use strict';

var floor = require('./floor');

var msPerDay = require('../helpers/timeConstants').msPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.2

module.exports = function Day(t) {
	return floor(t / msPerDay);
};

},{"../helpers/timeConstants":186,"./floor":176}],140:[function(require,module,exports){
'use strict';

var floor = require('./floor');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

module.exports = function DayFromYear(y) {
	return (365 * (y - 1970)) + floor((y - 1969) / 4) - floor((y - 1901) / 100) + floor((y - 1601) / 400);
};


},{"./floor":176}],141:[function(require,module,exports){
'use strict';

var Day = require('./Day');
var DayFromYear = require('./DayFromYear');
var YearFromTime = require('./YearFromTime');

// https://262.ecma-international.org/5.1/#sec-15.9.1.4

module.exports = function DayWithinYear(t) {
	return Day(t) - DayFromYear(YearFromTime(t));
};

},{"./Day":139,"./DayFromYear":140,"./YearFromTime":174}],142:[function(require,module,exports){
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

},{"./modulo":177}],143:[function(require,module,exports){
'use strict';

var $TypeError = require('es-errors/type');

var IsDataDescriptor = require('./IsDataDescriptor');
var IsAccessorDescriptor = require('./IsAccessorDescriptor');

var isPropertyDescriptor = require('../helpers/records/property-descriptor');

// https://262.ecma-international.org/5.1/#sec-8.10.4

module.exports = function FromPropertyDescriptor(Desc) {
	if (typeof Desc === 'undefined') {
		return Desc;
	}

	if (!isPropertyDescriptor(Desc)) {
		throw new $TypeError('Assertion failed: `Desc` must be a Property Descriptor');
	}

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

},{"../helpers/records/property-descriptor":184,"./IsAccessorDescriptor":146,"./IsDataDescriptor":148,"es-errors/type":193}],144:[function(require,module,exports){
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

},{"../helpers/timeConstants":186,"./floor":176,"./modulo":177}],145:[function(require,module,exports){
'use strict';

var $EvalError = require('es-errors/eval');

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

},{"./DaysInYear":142,"./YearFromTime":174,"es-errors/eval":188}],146:[function(require,module,exports){
'use strict';

var $TypeError = require('es-errors/type');

var hasOwn = require('hasown');

var isPropertyDescriptor = require('../helpers/records/property-descriptor');

// https://262.ecma-international.org/5.1/#sec-8.10.1

module.exports = function IsAccessorDescriptor(Desc) {
	if (typeof Desc === 'undefined') {
		return false;
	}

	if (!isPropertyDescriptor(Desc)) {
		throw new $TypeError('Assertion failed: `Desc` must be a Property Descriptor');
	}

	if (!hasOwn(Desc, '[[Get]]') && !hasOwn(Desc, '[[Set]]')) {
		return false;
	}

	return true;
};

},{"../helpers/records/property-descriptor":184,"es-errors/type":193,"hasown":210}],147:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.11

module.exports = require('is-callable');

},{"is-callable":213}],148:[function(require,module,exports){
'use strict';

var $TypeError = require('es-errors/type');

var hasOwn = require('hasown');

var isPropertyDescriptor = require('../helpers/records/property-descriptor');

// https://262.ecma-international.org/5.1/#sec-8.10.2

module.exports = function IsDataDescriptor(Desc) {
	if (typeof Desc === 'undefined') {
		return false;
	}

	if (!isPropertyDescriptor(Desc)) {
		throw new $TypeError('Assertion failed: `Desc` must be a Property Descriptor');
	}

	if (!hasOwn(Desc, '[[Value]]') && !hasOwn(Desc, '[[Writable]]')) {
		return false;
	}

	return true;
};

},{"../helpers/records/property-descriptor":184,"es-errors/type":193,"hasown":210}],149:[function(require,module,exports){
'use strict';

var $TypeError = require('es-errors/type');

var IsAccessorDescriptor = require('./IsAccessorDescriptor');
var IsDataDescriptor = require('./IsDataDescriptor');

var isPropertyDescriptor = require('./IsPropertyDescriptor');

// https://262.ecma-international.org/5.1/#sec-8.10.3

module.exports = function IsGenericDescriptor(Desc) {
	if (typeof Desc === 'undefined') {
		return false;
	}

	if (!isPropertyDescriptor(Desc)) {
		throw new $TypeError('Assertion failed: `Desc` must be a Property Descriptor');
	}

	if (!IsAccessorDescriptor(Desc) && !IsDataDescriptor(Desc)) {
		return true;
	}

	return false;
};

},{"./IsAccessorDescriptor":146,"./IsDataDescriptor":148,"./IsPropertyDescriptor":150,"es-errors/type":193}],150:[function(require,module,exports){
'use strict';

// TODO, semver-major: delete this

var isPropertyDescriptor = require('../helpers/records/property-descriptor');

// https://262.ecma-international.org/6.0/#sec-property-descriptor-specification-type

module.exports = function IsPropertyDescriptor(Desc) {
	return isPropertyDescriptor(Desc);
};

},{"../helpers/records/property-descriptor":184}],151:[function(require,module,exports){
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

},{"../helpers/isFinite":180,"../helpers/timeConstants":186}],152:[function(require,module,exports){
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

},{"../helpers/isFinite":180,"./DateFromTime":138,"./Day":139,"./MonthFromTime":155,"./ToInteger":164,"./YearFromTime":174,"./floor":176,"./modulo":177,"get-intrinsic":202}],153:[function(require,module,exports){
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

},{"../helpers/isFinite":180,"../helpers/timeConstants":186,"./ToInteger":164}],154:[function(require,module,exports){
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

},{"../helpers/timeConstants":186,"./floor":176,"./modulo":177}],155:[function(require,module,exports){
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

},{"./DayWithinYear":141,"./InLeapYear":145}],156:[function(require,module,exports){
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

},{"../helpers/isNaN":181}],157:[function(require,module,exports){
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

},{"../helpers/timeConstants":186,"./floor":176,"./modulo":177}],158:[function(require,module,exports){
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

},{"./Type":172}],159:[function(require,module,exports){
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


},{"../helpers/isFinite":180,"./ToNumber":165,"./abs":175,"get-intrinsic":202}],160:[function(require,module,exports){
'use strict';

var msPerDay = require('../helpers/timeConstants').msPerDay;

var DayFromYear = require('./DayFromYear');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

module.exports = function TimeFromYear(y) {
	return msPerDay * DayFromYear(y);
};

},{"../helpers/timeConstants":186,"./DayFromYear":140}],161:[function(require,module,exports){
'use strict';

var modulo = require('./modulo');

var msPerDay = require('../helpers/timeConstants').msPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.2

module.exports = function TimeWithinDay(t) {
	return modulo(t, msPerDay);
};


},{"../helpers/timeConstants":186,"./modulo":177}],162:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.2

module.exports = function ToBoolean(value) { return !!value; };

},{}],163:[function(require,module,exports){
'use strict';

var ToNumber = require('./ToNumber');

// http://262.ecma-international.org/5.1/#sec-9.5

module.exports = function ToInt32(x) {
	return ToNumber(x) >> 0;
};

},{"./ToNumber":165}],164:[function(require,module,exports){
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

},{"../helpers/isFinite":180,"../helpers/isNaN":181,"../helpers/sign":185,"./ToNumber":165,"./abs":175,"./floor":176}],165:[function(require,module,exports){
'use strict';

var ToPrimitive = require('./ToPrimitive');

var callBound = require('call-bind/callBound');

var $replace = callBound('String.prototype.replace');

var safeRegexTester = require('safe-regex-test');

var isNonDecimal = safeRegexTester(/^0[ob]|^[+-]0x/);

// http://262.ecma-international.org/5.1/#sec-9.3

module.exports = function ToNumber(value) {
	var prim = ToPrimitive(value, Number);
	if (typeof prim !== 'string') {
		return +prim; // eslint-disable-line no-implicit-coercion
	}

	var trimmed = $replace(
		prim,
		// eslint-disable-next-line no-control-regex
		/^[ \t\x0b\f\xa0\ufeff\n\r\u2028\u2029\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u0085]+|[ \t\x0b\f\xa0\ufeff\n\r\u2028\u2029\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u0085]+$/g,
		''
	);
	if (isNonDecimal(trimmed)) {
		return NaN;
	}

	return +trimmed; // eslint-disable-line no-implicit-coercion
};

},{"./ToPrimitive":167,"call-bind/callBound":126,"safe-regex-test":221}],166:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.9

module.exports = require('es-object-atoms/ToObject');

},{"es-object-atoms/ToObject":196}],167:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.1

module.exports = require('es-to-primitive/es5');

},{"es-to-primitive/es5":198}],168:[function(require,module,exports){
'use strict';

var hasOwn = require('hasown');

var $TypeError = require('es-errors/type');

var Type = require('./Type');
var ToBoolean = require('./ToBoolean');
var IsCallable = require('./IsCallable');

// https://262.ecma-international.org/5.1/#sec-8.10.5

module.exports = function ToPropertyDescriptor(Obj) {
	if (Type(Obj) !== 'Object') {
		throw new $TypeError('ToPropertyDescriptor requires an object');
	}

	var desc = {};
	if (hasOwn(Obj, 'enumerable')) {
		desc['[[Enumerable]]'] = ToBoolean(Obj.enumerable);
	}
	if (hasOwn(Obj, 'configurable')) {
		desc['[[Configurable]]'] = ToBoolean(Obj.configurable);
	}
	if (hasOwn(Obj, 'value')) {
		desc['[[Value]]'] = Obj.value;
	}
	if (hasOwn(Obj, 'writable')) {
		desc['[[Writable]]'] = ToBoolean(Obj.writable);
	}
	if (hasOwn(Obj, 'get')) {
		var getter = Obj.get;
		if (typeof getter !== 'undefined' && !IsCallable(getter)) {
			throw new $TypeError('getter must be a function');
		}
		desc['[[Get]]'] = getter;
	}
	if (hasOwn(Obj, 'set')) {
		var setter = Obj.set;
		if (typeof setter !== 'undefined' && !IsCallable(setter)) {
			throw new $TypeError('setter must be a function');
		}
		desc['[[Set]]'] = setter;
	}

	if ((hasOwn(desc, '[[Get]]') || hasOwn(desc, '[[Set]]')) && (hasOwn(desc, '[[Value]]') || hasOwn(desc, '[[Writable]]'))) {
		throw new $TypeError('Invalid property descriptor. Cannot both specify accessors and a value or writable attribute');
	}
	return desc;
};

},{"./IsCallable":147,"./ToBoolean":162,"./Type":172,"es-errors/type":193,"hasown":210}],169:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $String = GetIntrinsic('%String%');

// http://262.ecma-international.org/5.1/#sec-9.8

module.exports = function ToString(value) {
	return $String(value);
};


},{"get-intrinsic":202}],170:[function(require,module,exports){
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

},{"../helpers/isFinite":180,"../helpers/isNaN":181,"../helpers/sign":185,"./ToNumber":165,"./abs":175,"./floor":176,"./modulo":177}],171:[function(require,module,exports){
'use strict';

var ToNumber = require('./ToNumber');

// http://262.ecma-international.org/5.1/#sec-9.6

module.exports = function ToUint32(x) {
	return ToNumber(x) >>> 0;
};

},{"./ToNumber":165}],172:[function(require,module,exports){
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

},{}],173:[function(require,module,exports){
'use strict';

var Day = require('./Day');
var modulo = require('./modulo');

// https://262.ecma-international.org/5.1/#sec-15.9.1.6

module.exports = function WeekDay(t) {
	return modulo(Day(t) + 4, 7);
};

},{"./Day":139,"./modulo":177}],174:[function(require,module,exports){
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

},{"call-bind/callBound":126,"get-intrinsic":202}],175:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $abs = GetIntrinsic('%Math.abs%');

// http://262.ecma-international.org/5.1/#sec-5.2

module.exports = function abs(x) {
	return $abs(x);
};

},{"get-intrinsic":202}],176:[function(require,module,exports){
'use strict';

// var modulo = require('./modulo');
var $floor = Math.floor;

// http://262.ecma-international.org/5.1/#sec-5.2

module.exports = function floor(x) {
	// return x - modulo(x, 1);
	return $floor(x);
};

},{}],177:[function(require,module,exports){
'use strict';

var mod = require('../helpers/mod');

// https://262.ecma-international.org/5.1/#sec-5.2

module.exports = function modulo(x, y) {
	return mod(x, y);
};

},{"../helpers/mod":183}],178:[function(require,module,exports){
'use strict';

var modulo = require('./modulo');

var msPerSecond = require('../helpers/timeConstants').msPerSecond;

// https://262.ecma-international.org/5.1/#sec-15.9.1.10

module.exports = function msFromTime(t) {
	return modulo(t, msPerSecond);
};

},{"../helpers/timeConstants":186,"./modulo":177}],179:[function(require,module,exports){
'use strict';

/* eslint global-require: 0 */

// https://es5.github.io/#x9
module.exports = {
	'Abstract Equality Comparison': require('./5/AbstractEqualityComparison'),
	'Abstract Relational Comparison': require('./5/AbstractRelationalComparison'),
	'Strict Equality Comparison': require('./5/StrictEqualityComparison'),
	abs: require('./5/abs'),
	Canonicalize: require('./5/Canonicalize'),
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

},{"./5/AbstractEqualityComparison":134,"./5/AbstractRelationalComparison":135,"./5/Canonicalize":136,"./5/CheckObjectCoercible":137,"./5/DateFromTime":138,"./5/Day":139,"./5/DayFromYear":140,"./5/DayWithinYear":141,"./5/DaysInYear":142,"./5/FromPropertyDescriptor":143,"./5/HourFromTime":144,"./5/InLeapYear":145,"./5/IsAccessorDescriptor":146,"./5/IsCallable":147,"./5/IsDataDescriptor":148,"./5/IsGenericDescriptor":149,"./5/IsPropertyDescriptor":150,"./5/MakeDate":151,"./5/MakeDay":152,"./5/MakeTime":153,"./5/MinFromTime":154,"./5/MonthFromTime":155,"./5/SameValue":156,"./5/SecFromTime":157,"./5/StrictEqualityComparison":158,"./5/TimeClip":159,"./5/TimeFromYear":160,"./5/TimeWithinDay":161,"./5/ToBoolean":162,"./5/ToInt32":163,"./5/ToInteger":164,"./5/ToNumber":165,"./5/ToObject":166,"./5/ToPrimitive":167,"./5/ToPropertyDescriptor":168,"./5/ToString":169,"./5/ToUint16":170,"./5/ToUint32":171,"./5/Type":172,"./5/WeekDay":173,"./5/YearFromTime":174,"./5/abs":175,"./5/floor":176,"./5/modulo":177,"./5/msFromTime":178}],180:[function(require,module,exports){
'use strict';

var $isNaN = require('./isNaN');

module.exports = function (x) { return (typeof x === 'number' || typeof x === 'bigint') && !$isNaN(x) && x !== Infinity && x !== -Infinity; };

},{"./isNaN":181}],181:[function(require,module,exports){
'use strict';

module.exports = Number.isNaN || function isNaN(a) {
	return a !== a;
};

},{}],182:[function(require,module,exports){
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

},{"call-bind/callBound":126}],183:[function(require,module,exports){
'use strict';

var $floor = Math.floor;

module.exports = function mod(number, modulo) {
	var remain = number % modulo;
	return $floor(remain >= 0 ? remain : remain + modulo);
};

},{}],184:[function(require,module,exports){
'use strict';

var $TypeError = require('es-errors/type');

var hasOwn = require('hasown');

var allowed = {
	__proto__: null,
	'[[Configurable]]': true,
	'[[Enumerable]]': true,
	'[[Get]]': true,
	'[[Set]]': true,
	'[[Value]]': true,
	'[[Writable]]': true
};

// https://262.ecma-international.org/6.0/#sec-property-descriptor-specification-type

module.exports = function isPropertyDescriptor(Desc) {
	if (!Desc || typeof Desc !== 'object') {
		return false;
	}

	for (var key in Desc) { // eslint-disable-line
		if (hasOwn(Desc, key) && !allowed[key]) {
			return false;
		}
	}

	var isData = hasOwn(Desc, '[[Value]]') || hasOwn(Desc, '[[Writable]]');
	var IsAccessor = hasOwn(Desc, '[[Get]]') || hasOwn(Desc, '[[Set]]');
	if (isData && IsAccessor) {
		throw new $TypeError('Property Descriptors may not be both accessor and data descriptors');
	}
	return true;
};

},{"es-errors/type":193,"hasown":210}],185:[function(require,module,exports){
'use strict';

module.exports = function sign(number) {
	return number >= 0 ? 1 : -1;
};

},{}],186:[function(require,module,exports){
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

},{}],187:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

/** @type {import('.')} */
var $defineProperty = GetIntrinsic('%Object.defineProperty%', true) || false;
if ($defineProperty) {
	try {
		$defineProperty({}, 'a', { value: 1 });
	} catch (e) {
		// IE 8 has a broken defineProperty
		$defineProperty = false;
	}
}

module.exports = $defineProperty;

},{"get-intrinsic":202}],188:[function(require,module,exports){
'use strict';

/** @type {import('./eval')} */
module.exports = EvalError;

},{}],189:[function(require,module,exports){
'use strict';

/** @type {import('.')} */
module.exports = Error;

},{}],190:[function(require,module,exports){
'use strict';

/** @type {import('./range')} */
module.exports = RangeError;

},{}],191:[function(require,module,exports){
'use strict';

/** @type {import('./ref')} */
module.exports = ReferenceError;

},{}],192:[function(require,module,exports){
'use strict';

/** @type {import('./syntax')} */
module.exports = SyntaxError;

},{}],193:[function(require,module,exports){
'use strict';

/** @type {import('./type')} */
module.exports = TypeError;

},{}],194:[function(require,module,exports){
'use strict';

/** @type {import('./uri')} */
module.exports = URIError;

},{}],195:[function(require,module,exports){
'use strict';

var $TypeError = require('es-errors/type');

/** @type {import('./RequireObjectCoercible')} */
module.exports = function RequireObjectCoercible(value) {
	if (value == null) {
		throw new $TypeError((arguments.length > 0 && arguments[1]) || ('Cannot call method on ' + value));
	}
	return value;
};

},{"es-errors/type":193}],196:[function(require,module,exports){
'use strict';

var $Object = require('./');
var RequireObjectCoercible = require('./RequireObjectCoercible');

/** @type {import('./ToObject')} */
module.exports = function ToObject(value) {
	RequireObjectCoercible(value);
	return $Object(value);
};

},{"./":197,"./RequireObjectCoercible":195}],197:[function(require,module,exports){
'use strict';

/** @type {import('.')} */
module.exports = Object;

},{}],198:[function(require,module,exports){
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

},{"./helpers/isPrimitive":199,"is-callable":213}],199:[function(require,module,exports){
'use strict';

module.exports = function isPrimitive(value) {
	return value === null || (typeof value !== 'function' && typeof value !== 'object');
};

},{}],200:[function(require,module,exports){
'use strict';

/* eslint no-invalid-this: 1 */

var ERROR_MESSAGE = 'Function.prototype.bind called on incompatible ';
var toStr = Object.prototype.toString;
var max = Math.max;
var funcType = '[object Function]';

var concatty = function concatty(a, b) {
    var arr = [];

    for (var i = 0; i < a.length; i += 1) {
        arr[i] = a[i];
    }
    for (var j = 0; j < b.length; j += 1) {
        arr[j + a.length] = b[j];
    }

    return arr;
};

var slicy = function slicy(arrLike, offset) {
    var arr = [];
    for (var i = offset || 0, j = 0; i < arrLike.length; i += 1, j += 1) {
        arr[j] = arrLike[i];
    }
    return arr;
};

var joiny = function (arr, joiner) {
    var str = '';
    for (var i = 0; i < arr.length; i += 1) {
        str += arr[i];
        if (i + 1 < arr.length) {
            str += joiner;
        }
    }
    return str;
};

module.exports = function bind(that) {
    var target = this;
    if (typeof target !== 'function' || toStr.apply(target) !== funcType) {
        throw new TypeError(ERROR_MESSAGE + target);
    }
    var args = slicy(arguments, 1);

    var bound;
    var binder = function () {
        if (this instanceof bound) {
            var result = target.apply(
                this,
                concatty(args, arguments)
            );
            if (Object(result) === result) {
                return result;
            }
            return this;
        }
        return target.apply(
            that,
            concatty(args, arguments)
        );

    };

    var boundLength = max(0, target.length - args.length);
    var boundArgs = [];
    for (var i = 0; i < boundLength; i++) {
        boundArgs[i] = '$' + i;
    }

    bound = Function('binder', 'return function (' + joiny(boundArgs, ',') + '){ return binder.apply(this,arguments); }')(binder);

    if (target.prototype) {
        var Empty = function Empty() {};
        Empty.prototype = target.prototype;
        bound.prototype = new Empty();
        Empty.prototype = null;
    }

    return bound;
};

},{}],201:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

module.exports = Function.prototype.bind || implementation;

},{"./implementation":200}],202:[function(require,module,exports){
'use strict';

var undefined;

var $Error = require('es-errors');
var $EvalError = require('es-errors/eval');
var $RangeError = require('es-errors/range');
var $ReferenceError = require('es-errors/ref');
var $SyntaxError = require('es-errors/syntax');
var $TypeError = require('es-errors/type');
var $URIError = require('es-errors/uri');

var $Function = Function;

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
var hasProto = require('has-proto')();

var getProto = Object.getPrototypeOf || (
	hasProto
		? function (x) { return x.__proto__; } // eslint-disable-line no-proto
		: null
);

var needsEval = {};

var TypedArray = typeof Uint8Array === 'undefined' || !getProto ? undefined : getProto(Uint8Array);

var INTRINSICS = {
	__proto__: null,
	'%AggregateError%': typeof AggregateError === 'undefined' ? undefined : AggregateError,
	'%Array%': Array,
	'%ArrayBuffer%': typeof ArrayBuffer === 'undefined' ? undefined : ArrayBuffer,
	'%ArrayIteratorPrototype%': hasSymbols && getProto ? getProto([][Symbol.iterator]()) : undefined,
	'%AsyncFromSyncIteratorPrototype%': undefined,
	'%AsyncFunction%': needsEval,
	'%AsyncGenerator%': needsEval,
	'%AsyncGeneratorFunction%': needsEval,
	'%AsyncIteratorPrototype%': needsEval,
	'%Atomics%': typeof Atomics === 'undefined' ? undefined : Atomics,
	'%BigInt%': typeof BigInt === 'undefined' ? undefined : BigInt,
	'%BigInt64Array%': typeof BigInt64Array === 'undefined' ? undefined : BigInt64Array,
	'%BigUint64Array%': typeof BigUint64Array === 'undefined' ? undefined : BigUint64Array,
	'%Boolean%': Boolean,
	'%DataView%': typeof DataView === 'undefined' ? undefined : DataView,
	'%Date%': Date,
	'%decodeURI%': decodeURI,
	'%decodeURIComponent%': decodeURIComponent,
	'%encodeURI%': encodeURI,
	'%encodeURIComponent%': encodeURIComponent,
	'%Error%': $Error,
	'%eval%': eval, // eslint-disable-line no-eval
	'%EvalError%': $EvalError,
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
	'%IteratorPrototype%': hasSymbols && getProto ? getProto(getProto([][Symbol.iterator]())) : undefined,
	'%JSON%': typeof JSON === 'object' ? JSON : undefined,
	'%Map%': typeof Map === 'undefined' ? undefined : Map,
	'%MapIteratorPrototype%': typeof Map === 'undefined' || !hasSymbols || !getProto ? undefined : getProto(new Map()[Symbol.iterator]()),
	'%Math%': Math,
	'%Number%': Number,
	'%Object%': Object,
	'%parseFloat%': parseFloat,
	'%parseInt%': parseInt,
	'%Promise%': typeof Promise === 'undefined' ? undefined : Promise,
	'%Proxy%': typeof Proxy === 'undefined' ? undefined : Proxy,
	'%RangeError%': $RangeError,
	'%ReferenceError%': $ReferenceError,
	'%Reflect%': typeof Reflect === 'undefined' ? undefined : Reflect,
	'%RegExp%': RegExp,
	'%Set%': typeof Set === 'undefined' ? undefined : Set,
	'%SetIteratorPrototype%': typeof Set === 'undefined' || !hasSymbols || !getProto ? undefined : getProto(new Set()[Symbol.iterator]()),
	'%SharedArrayBuffer%': typeof SharedArrayBuffer === 'undefined' ? undefined : SharedArrayBuffer,
	'%String%': String,
	'%StringIteratorPrototype%': hasSymbols && getProto ? getProto(''[Symbol.iterator]()) : undefined,
	'%Symbol%': hasSymbols ? Symbol : undefined,
	'%SyntaxError%': $SyntaxError,
	'%ThrowTypeError%': ThrowTypeError,
	'%TypedArray%': TypedArray,
	'%TypeError%': $TypeError,
	'%Uint8Array%': typeof Uint8Array === 'undefined' ? undefined : Uint8Array,
	'%Uint8ClampedArray%': typeof Uint8ClampedArray === 'undefined' ? undefined : Uint8ClampedArray,
	'%Uint16Array%': typeof Uint16Array === 'undefined' ? undefined : Uint16Array,
	'%Uint32Array%': typeof Uint32Array === 'undefined' ? undefined : Uint32Array,
	'%URIError%': $URIError,
	'%WeakMap%': typeof WeakMap === 'undefined' ? undefined : WeakMap,
	'%WeakRef%': typeof WeakRef === 'undefined' ? undefined : WeakRef,
	'%WeakSet%': typeof WeakSet === 'undefined' ? undefined : WeakSet
};

if (getProto) {
	try {
		null.error; // eslint-disable-line no-unused-expressions
	} catch (e) {
		// https://github.com/tc39/proposal-shadowrealm/pull/384#issuecomment-1364264229
		var errorProto = getProto(getProto(e));
		INTRINSICS['%Error.prototype%'] = errorProto;
	}
}

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
		if (gen && getProto) {
			value = getProto(gen.prototype);
		}
	}

	INTRINSICS[name] = value;

	return value;
};

var LEGACY_ALIASES = {
	__proto__: null,
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
var hasOwn = require('hasown');
var $concat = bind.call(Function.call, Array.prototype.concat);
var $spliceApply = bind.call(Function.apply, Array.prototype.splice);
var $replace = bind.call(Function.call, String.prototype.replace);
var $strSlice = bind.call(Function.call, String.prototype.slice);
var $exec = bind.call(Function.call, RegExp.prototype.exec);

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

	if ($exec(/^%?[^%]*%?$/, name) === null) {
		throw new $SyntaxError('`%` may not be present anywhere but at the beginning and end of the intrinsic name');
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

},{"es-errors":189,"es-errors/eval":188,"es-errors/range":190,"es-errors/ref":191,"es-errors/syntax":192,"es-errors/type":193,"es-errors/uri":194,"function-bind":201,"has-proto":205,"has-symbols":206,"hasown":210}],203:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $gOPD = GetIntrinsic('%Object.getOwnPropertyDescriptor%', true);

if ($gOPD) {
	try {
		$gOPD([], 'length');
	} catch (e) {
		// IE 8 has a broken gOPD
		$gOPD = null;
	}
}

module.exports = $gOPD;

},{"get-intrinsic":202}],204:[function(require,module,exports){
'use strict';

var $defineProperty = require('es-define-property');

var hasPropertyDescriptors = function hasPropertyDescriptors() {
	return !!$defineProperty;
};

hasPropertyDescriptors.hasArrayLengthDefineBug = function hasArrayLengthDefineBug() {
	// node v0.6 has a bug where array lengths can be Set but not Defined
	if (!$defineProperty) {
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

},{"es-define-property":187}],205:[function(require,module,exports){
'use strict';

var test = {
	__proto__: null,
	foo: {}
};

var $Object = Object;

/** @type {import('.')} */
module.exports = function hasProto() {
	// @ts-expect-error: TS errors on an inherited property for some reason
	return { __proto__: test }.foo === test.foo
		&& !(test instanceof $Object);
};

},{}],206:[function(require,module,exports){
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

},{"./shams":207}],207:[function(require,module,exports){
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

},{}],208:[function(require,module,exports){
'use strict';

var hasSymbols = require('has-symbols/shams');

/** @type {import('.')} */
module.exports = function hasToStringTagShams() {
	return hasSymbols() && !!Symbol.toStringTag;
};

},{"has-symbols/shams":207}],209:[function(require,module,exports){
'use strict';

var bind = require('function-bind');

module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);

},{"function-bind":201}],210:[function(require,module,exports){
'use strict';

var call = Function.prototype.call;
var $hasOwn = Object.prototype.hasOwnProperty;
var bind = require('function-bind');

/** @type {import('.')} */
module.exports = bind.call(call, $hasOwn);

},{"function-bind":201}],211:[function(require,module,exports){
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

},{}],212:[function(require,module,exports){
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

},{}],213:[function(require,module,exports){
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
var objectClass = '[object Object]';
var fnClass = '[object Function]';
var genClass = '[object GeneratorFunction]';
var ddaClass = '[object HTMLAllCollection]'; // IE 11
var ddaClass2 = '[object HTML document.all class]';
var ddaClass3 = '[object HTMLCollection]'; // IE 9-10
var hasToStringTag = typeof Symbol === 'function' && !!Symbol.toStringTag; // better: use `has-tostringtag`

var isIE68 = !(0 in [,]); // eslint-disable-line no-sparse-arrays, comma-spacing

var isDDA = function isDocumentDotAll() { return false; };
if (typeof document === 'object') {
	// Firefox 3 canonicalizes DDA to undefined when it's not accessed directly
	var all = document.all;
	if (toStr.call(all) === toStr.call(document.all)) {
		isDDA = function isDocumentDotAll(value) {
			/* globals document: false */
			// in IE 6-8, typeof document.all is "object" and it's truthy
			if ((isIE68 || !value) && (typeof value === 'undefined' || typeof value === 'object')) {
				try {
					var str = toStr.call(value);
					return (
						str === ddaClass
						|| str === ddaClass2
						|| str === ddaClass3 // opera 12.16
						|| str === objectClass // IE 6-8
					) && value('') == null; // eslint-disable-line eqeqeq
				} catch (e) { /**/ }
			}
			return false;
		};
	}
}

module.exports = reflectApply
	? function isCallable(value) {
		if (isDDA(value)) { return true; }
		if (!value) { return false; }
		if (typeof value !== 'function' && typeof value !== 'object') { return false; }
		try {
			reflectApply(value, null, badArrayLike);
		} catch (e) {
			if (e !== isCallableMarker) { return false; }
		}
		return !isES6ClassFn(value) && tryFunctionObject(value);
	}
	: function isCallable(value) {
		if (isDDA(value)) { return true; }
		if (!value) { return false; }
		if (typeof value !== 'function' && typeof value !== 'object') { return false; }
		if (hasToStringTag) { return tryFunctionObject(value); }
		if (isES6ClassFn(value)) { return false; }
		var strClass = toStr.call(value);
		if (strClass !== fnClass && strClass !== genClass && !(/^\[object HTML/).test(strClass)) { return false; }
		return tryFunctionObject(value);
	};

},{}],214:[function(require,module,exports){
'use strict';

var callBound = require('call-bind/callBound');
var hasToStringTag = require('has-tostringtag/shams')();
var has;
var $exec;
var isRegexMarker;
var badStringifier;

if (hasToStringTag) {
	has = callBound('Object.prototype.hasOwnProperty');
	$exec = callBound('RegExp.prototype.exec');
	isRegexMarker = {};

	var throwRegexMarker = function () {
		throw isRegexMarker;
	};
	badStringifier = {
		toString: throwRegexMarker,
		valueOf: throwRegexMarker
	};

	if (typeof Symbol.toPrimitive === 'symbol') {
		badStringifier[Symbol.toPrimitive] = throwRegexMarker;
	}
}

var $toString = callBound('Object.prototype.toString');
var gOPD = Object.getOwnPropertyDescriptor;
var regexClass = '[object RegExp]';

module.exports = hasToStringTag
	// eslint-disable-next-line consistent-return
	? function isRegex(value) {
		if (!value || typeof value !== 'object') {
			return false;
		}

		var descriptor = gOPD(value, 'lastIndex');
		var hasLastIndexDataProperty = descriptor && has(descriptor, 'value');
		if (!hasLastIndexDataProperty) {
			return false;
		}

		try {
			$exec(value, badStringifier);
		} catch (e) {
			return e === isRegexMarker;
		}
	}
	: function isRegex(value) {
		// In older browsers, typeof regex incorrectly returns 'function'
		if (!value || (typeof value !== 'object' && typeof value !== 'function')) {
			return false;
		}

		return $toString(value) === regexClass;
	};

},{"call-bind/callBound":126,"has-tostringtag/shams":208}],215:[function(require,module,exports){
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

},{"./isArguments":217}],216:[function(require,module,exports){
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

},{"./implementation":215,"./isArguments":217}],217:[function(require,module,exports){
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

},{}],218:[function(require,module,exports){
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

},{}],219:[function(require,module,exports){
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
},{"_process":218,"through":234,"timers":235}],220:[function(require,module,exports){
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

},{"buffer":108}],221:[function(require,module,exports){
'use strict';

var callBound = require('call-bind/callBound');
var isRegex = require('is-regex');

var $exec = callBound('RegExp.prototype.exec');
var $TypeError = require('es-errors/type');

module.exports = function regexTester(regex) {
	if (!isRegex(regex)) {
		throw new $TypeError('`regex` must be a RegExp');
	}
	return function test(s) {
		return $exec(regex, s) !== null;
	};
};

},{"call-bind/callBound":126,"es-errors/type":193,"is-regex":214}],222:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');
var define = require('define-data-property');
var hasDescriptors = require('has-property-descriptors')();
var gOPD = require('gopd');

var $TypeError = require('es-errors/type');
var $floor = GetIntrinsic('%Math.floor%');

/** @type {import('.')} */
module.exports = function setFunctionLength(fn, length) {
	if (typeof fn !== 'function') {
		throw new $TypeError('`fn` is not a function');
	}
	if (typeof length !== 'number' || length < 0 || length > 0xFFFFFFFF || $floor(length) !== length) {
		throw new $TypeError('`length` must be a positive 32-bit integer');
	}

	var loose = arguments.length > 2 && !!arguments[2];

	var functionLengthIsConfigurable = true;
	var functionLengthIsWritable = true;
	if ('length' in fn && gOPD) {
		var desc = gOPD(fn, 'length');
		if (desc && !desc.configurable) {
			functionLengthIsConfigurable = false;
		}
		if (desc && !desc.writable) {
			functionLengthIsWritable = false;
		}
	}

	if (functionLengthIsConfigurable || functionLengthIsWritable || !loose) {
		if (hasDescriptors) {
			define(/** @type {Parameters<define>[0]} */ (fn), 'length', length, true, true);
		} else {
			define(/** @type {Parameters<define>[0]} */ (fn), 'length', length);
		}
	}
	return fn;
};

},{"define-data-property":131,"es-errors/type":193,"get-intrinsic":202,"gopd":203,"has-property-descriptors":204}],223:[function(require,module,exports){
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

},{"es-abstract/es5":179,"function-bind":201}],224:[function(require,module,exports){
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

},{"./implementation":223,"./polyfill":225,"./shim":226,"define-properties":132,"function-bind":201}],225:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

var zeroWidthSpace = '\u200b';

module.exports = function getPolyfill() {
	if (String.prototype.trim && zeroWidthSpace.trim() === zeroWidthSpace) {
		return String.prototype.trim;
	}
	return implementation;
};

},{"./implementation":223}],226:[function(require,module,exports){
'use strict';

var define = require('define-properties');
var getPolyfill = require('./polyfill');

module.exports = function shimStringTrim() {
	var polyfill = getPolyfill();
	define(String.prototype, { trim: polyfill }, { trim: function () { return String.prototype.trim !== polyfill; } });
	return polyfill;
};

},{"./polyfill":225,"define-properties":132}],227:[function(require,module,exports){
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
},{"safe-buffer":220}],228:[function(require,module,exports){
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
},{"./lib/default_stream":229,"./lib/results":231,"./lib/test":232,"_process":218,"defined":133,"through":234,"timers":235}],229:[function(require,module,exports){
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
},{"_process":218,"fs":107,"through":234}],230:[function(require,module,exports){
(function (process,setImmediate){(function (){
module.exports = typeof setImmediate !== 'undefined'
    ? setImmediate
    : process.nextTick
;

}).call(this)}).call(this,require('_process'),require("timers").setImmediate)
},{"_process":218,"timers":235}],231:[function(require,module,exports){
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
},{"_process":218,"events":109,"function-bind":201,"has":209,"inherits":212,"object-inspect":233,"resumer":219,"through":234,"timers":235}],232:[function(require,module,exports){
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
},{"./next_tick":230,"deep-equal":128,"defined":133,"events":109,"has":209,"inherits":212,"path":110,"string.prototype.trim":224}],233:[function(require,module,exports){
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

},{}],234:[function(require,module,exports){
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
},{"_process":218,"stream":111}],235:[function(require,module,exports){
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
},{"process/browser.js":218,"timers":235}],236:[function(require,module,exports){
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
},{}]},{},[50,51,52,53]);
