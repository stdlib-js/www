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

},{"@stdlib/utils/native-class":96}],9:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./main.js":10,"./object.js":11,"./primitive.js":12,"@stdlib/utils/define-nonenumerable-read-only-property":78}],10:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./try2serialize.js":14,"@stdlib/assert/has-tostringtag-support":5,"@stdlib/boolean/ctor":25,"@stdlib/utils/native-class":96}],12:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"@stdlib/utils/get-prototype-of":86,"@stdlib/utils/native-class":96}],19:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"@stdlib/utils/type-of":107}],21:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./main.js":22,"@stdlib/assert/tools/array-function":23,"@stdlib/utils/define-nonenumerable-read-only-property":78}],22:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"@stdlib/assert/is-array":7,"@stdlib/string/format":69}],25:[function(require,module,exports){
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
* One fourth times the mathematical constant `π`.
*
* @module @stdlib/constants/float64/fourth-pi
* @type {number}
*
* @example
* var FOURTH_PI = require( '@stdlib/constants/float64/fourth-pi' );
* // returns 7.85398163397448309616e-1
*/


// MAIN //

/**
* One fourth times the mathematical constant `π`.
*
* @constant
* @type {number}
* @default 7.85398163397448309616e-1
* @see [Wikipedia]{@link https://en.wikipedia.org/wiki/Pi}
*/
var FOURTH_PI = 7.85398163397448309616e-1;


// EXPORTS //

module.exports = FOURTH_PI;

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

},{"@stdlib/number/ctor":42}],30:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],32:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./main.js":33}],33:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],34:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./main.js":35}],35:[function(require,module,exports){
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

},{}],36:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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
* Compute the arcsine of a double-precision floating-point number.
*
* @module @stdlib/math/base/special/asin
*
* @example
* var asin = require( '@stdlib/math/base/special/asin' );
*
* var v = asin( 0.0 );
* // returns 0.0
*
* v = asin( 3.141592653589793/4.0 );
* // returns ~0.903
*
* v = asin( -3.141592653589793/6.0 );
* // returns ~-0.551
*
* v = asin( NaN );
* // returns NaN
*/

// MODULES //

var main = require( './main.js' );


// EXPORTS //

module.exports = main;

},{"./main.js":37}],37:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*
*
* ## Notice
*
* The original C code, long comment, copyright, license, and constants are from [Cephes]{@link http://www.netlib.org/cephes}. The implementation follows the original, but has been modified for JavaScript.
*
* ```text
* Copyright 1984, 1995, 2000 by Stephen L. Moshier
*
* Some software in this archive may be from the book _Methods and Programs for Mathematical Functions_ (Prentice-Hall or Simon & Schuster International, 1989) or from the Cephes Mathematical Library, a commercial product. In either event, it is copyrighted by the author. What you see here may be used freely but it comes with no support or guarantee.
*
* Stephen L. Moshier
* moshier@na-net.ornl.gov
* ```
*/

'use strict';

// MODULES //

var isnan = require( '@stdlib/math/base/assert/is-nan' );
var sqrt = require( '@stdlib/math/base/special/sqrt' );
var PIO4 = require( '@stdlib/constants/float64/fourth-pi' );
var ratevalPQ = require( './rational_pq.js' );
var ratevalRS = require( './rational_rs.js' );


// VARIABLES //

var MOREBITS = 6.123233995736765886130e-17; // pi/2 = PIO2 + MOREBITS


// MAIN //

/**
* Computes the arcsine of a double-precision floating-point number.
*
* ## Method
*
* -   A rational function of the form
*
*     ```tex
*     x + x^3 \frac{P(x^2)}{Q(x^2)}
*     ```
*
*     is used for \\(\|x\|\\) in the interval \\(\[0, 0.5\]\\). If \\(\|x\| > 0.5\\), it is transformed by the identity
*
*     ```tex
*     \operatorname{asin}(x) = \frac{\pi}{2} - 2 \operatorname{asin}( \sqrt{ (1-x)/2 } )
*     ```
*
* ## Notes
*
* -   Relative error:
*
*     | arithmetic | domain | # trials | peak    | rms     |
*     |:-----------|:-------|:---------|:--------|:--------|
*     | DEC        | -1, 1  | 40000    | 2.6e-17 | 7.1e-18 |
*     | IEEE       | -1, 1  | 10^6     | 1.9e-16 | 5.4e-17 |
*
* @param {number} x - input value
* @returns {number} arcsine (in radians)
*
* @example
* var v = asin( 0.0 );
* // returns ~0.0
*
* @example
* var v = asin( 3.141592653589793/4.0 );
* // returns ~0.903
*
* @example
* var v = asin( -3.141592653589793/6.0 );
* // returns ~-0.551
*
* @example
* var v = asin( NaN );
* // returns NaN
*/
function asin( x ) {
	var sgn;
	var zz;
	var a;
	var p;
	var z;

	if ( isnan( x ) ) {
		return NaN;
	}
	if ( x > 0.0 ) {
		a = x;
	} else {
		sgn = true;
		a = -x;
	}
	if ( a > 1.0 ) {
		return NaN;
	}
	if ( a > 0.625 ) {
		// arcsin(1-x) = pi/2 - sqrt(2x)(1+R(x))
		zz = 1.0 - a;
		p = zz * ratevalRS( zz );
		zz = sqrt( zz + zz );
		z = PIO4 - zz;
		zz = ( zz*p ) - MOREBITS;
		z -= zz;
		z += PIO4;
	} else {
		if ( a < 1.0e-8 ) {
			return x;
		}
		zz = a * a;
		z = zz * ratevalPQ( zz );
		z = ( a*z ) + a;
	}
	return ( sgn ) ? -z : z;
}


// EXPORTS //

module.exports = asin;

},{"./rational_pq.js":38,"./rational_rs.js":39,"@stdlib/constants/float64/fourth-pi":28,"@stdlib/math/base/assert/is-nan":32,"@stdlib/math/base/special/sqrt":40}],38:[function(require,module,exports){
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

/* This is a generated file. Do not edit directly. */
'use strict';

// MAIN //

/**
* Evaluates a rational function (i.e., the ratio of two polynomials described by the coefficients stored in \\(P\\) and \\(Q\\)).
*
* ## Notes
*
* -   Coefficients should be sorted in ascending degree.
* -   The implementation uses [Horner's rule][horners-method] for efficient computation.
*
* [horners-method]: https://en.wikipedia.org/wiki/Horner%27s_method
*
* @private
* @param {number} x - value at which to evaluate the rational function
* @returns {number} evaluated rational function
*/
function evalrational( x ) {
	var ax;
	var s1;
	var s2;
	if ( x === 0.0 ) {
		return 0.16666666666666713;
	}
	if ( x < 0.0 ) {
		ax = -x;
	} else {
		ax = x;
	}
	if ( ax <= 1.0 ) {
		s1 = -8.198089802484825 + (x * (19.562619833175948 + (x * (-16.262479672107002 + (x * (5.444622390564711 + (x * (-0.6019598008014124 + (x * 0.004253011369004428))))))))); // eslint-disable-line max-len
		s2 = -49.18853881490881 + (x * (139.51056146574857 + (x * (-147.1791292232726 + (x * (70.49610280856842 + (x * (-14.740913729888538 + (x * 1.0))))))))); // eslint-disable-line max-len
	} else {
		x = 1.0 / x;
		s1 = 0.004253011369004428 + (x * (-0.6019598008014124 + (x * (5.444622390564711 + (x * (-16.262479672107002 + (x * (19.562619833175948 + (x * -8.198089802484825))))))))); // eslint-disable-line max-len
		s2 = 1.0 + (x * (-14.740913729888538 + (x * (70.49610280856842 + (x * (-147.1791292232726 + (x * (139.51056146574857 + (x * -49.18853881490881))))))))); // eslint-disable-line max-len
	}
	return s1 / s2;
}


// EXPORTS //

module.exports = evalrational;

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

/* This is a generated file. Do not edit directly. */
'use strict';

// MAIN //

/**
* Evaluates a rational function (i.e., the ratio of two polynomials described by the coefficients stored in \\(P\\) and \\(Q\\)).
*
* ## Notes
*
* -   Coefficients should be sorted in ascending degree.
* -   The implementation uses [Horner's rule][horners-method] for efficient computation.
*
* [horners-method]: https://en.wikipedia.org/wiki/Horner%27s_method
*
* @private
* @param {number} x - value at which to evaluate the rational function
* @returns {number} evaluated rational function
*/
function evalrational( x ) {
	var ax;
	var s1;
	var s2;
	if ( x === 0.0 ) {
		return 0.08333333333333809;
	}
	if ( x < 0.0 ) {
		ax = -x;
	} else {
		ax = x;
	}
	if ( ax <= 1.0 ) {
		s1 = 28.536655482610616 + (x * (-25.56901049652825 + (x * (6.968710824104713 + (x * (-0.5634242780008963 + (x * 0.002967721961301243))))))); // eslint-disable-line max-len
		s2 = 342.43986579130785 + (x * (-383.8770957603691 + (x * (147.0656354026815 + (x * (-21.947795316429207 + (x * 1.0))))))); // eslint-disable-line max-len
	} else {
		x = 1.0 / x;
		s1 = 0.002967721961301243 + (x * (-0.5634242780008963 + (x * (6.968710824104713 + (x * (-25.56901049652825 + (x * 28.536655482610616))))))); // eslint-disable-line max-len
		s2 = 1.0 + (x * (-21.947795316429207 + (x * (147.0656354026815 + (x * (-383.8770957603691 + (x * 342.43986579130785))))))); // eslint-disable-line max-len
	}
	return s1 / s2;
}


// EXPORTS //

module.exports = evalrational;

},{}],40:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./main.js":41}],41:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

// EXPORTS //

module.exports = Number; // eslint-disable-line stdlib/require-globals

},{}],44:[function(require,module,exports){
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

},{"./main.js":45}],45:[function(require,module,exports){
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

},{}],46:[function(require,module,exports){
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

},{"./main.js":47,"./regexp.js":48,"@stdlib/utils/define-nonenumerable-read-only-property":78}],47:[function(require,module,exports){
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

},{}],48:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./main.js":47}],49:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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
var asin = require( '@stdlib/math/base/special/asin' );
var sqrt = require( '@stdlib/math/base/special/sqrt' );
var PI = require( '@stdlib/constants/float64/pi' );


// VARIABLES //

var TWO_OVER_PI = 2.0 / PI;


// MAIN //

/**
* Returns a function for evaluating the cumulative distribution function (CDF) for an arcsine distribution with minimum support `a` and maximum support `b`.
*
* @param {number} a - minimum support
* @param {number} b - maximum support
* @returns {Function} CDF
*
* @example
* var cdf = factory( 0.0, 10.0 );
* var y = cdf( 0.5 );
* // returns ~0.144
*
* y = cdf( 8.0 );
* // returns ~0.705
*/
function factory( a, b ) {
	if (
		isnan( a ) ||
		isnan( b ) ||
		a >= b
	) {
		return constantFunction( NaN );
	}
	return cdf;

	/**
	* Evaluates the cumulative distribution function (CDF) for an arcsine distribution.
	*
	* @private
	* @param {number} x - input value
	* @returns {Probability} evaluated CDF
	*
	* @example
	* var y = cdf( 2.0 );
	* // returns <number>
	*/
	function cdf( x ) {
		if ( isnan( x ) ) {
			return NaN;
		}
		if ( x < a ) {
			return 0.0;
		}
		if ( x >= b ) {
			return 1.0;
		}
		return TWO_OVER_PI * asin( sqrt( ( x-a ) / ( b-a ) ) );
	}
}


// EXPORTS //

module.exports = factory;

},{"@stdlib/constants/float64/pi":30,"@stdlib/math/base/assert/is-nan":32,"@stdlib/math/base/special/asin":36,"@stdlib/math/base/special/sqrt":40,"@stdlib/utils/constant-function":74}],50:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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
* Arcsine distribution cumulative distribution function (CDF).
*
* @module @stdlib/stats/base/dists/arcsine/cdf
*
* @example
* var cdf = require( '@stdlib/stats/base/dists/arcsine/cdf' );
*
* var y = cdf( 5.0, 0.0, 4.0 );
* // returns 1.0
*
* var mycdf = cdf.factory( 0.0, 10.0 );
* y = mycdf( 0.5 );
* // returns ~0.144
*
* y = mycdf( 8.0 );
* // returns ~0.705
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-nonenumerable-read-only-property' );
var main = require( './main.js' );
var factory = require( './factory.js' );


// MAIN //

setReadOnly( main, 'factory', factory );


// EXPORTS //

module.exports = main;

},{"./factory.js":49,"./main.js":51,"@stdlib/utils/define-nonenumerable-read-only-property":78}],51:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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
var asin = require( '@stdlib/math/base/special/asin' );
var sqrt = require( '@stdlib/math/base/special/sqrt' );
var PI = require( '@stdlib/constants/float64/pi' );


// VARIABLES //

var TWO_OVER_PI = 2.0 / PI; // TODO: consider moving to pkg


// MAIN //

/**
* Evaluates the cumulative distribution function (CDF) for an arcsine distribution with minimum support `a` and maximum support `b` at a value `x`.
*
* @param {number} x - input value
* @param {number} a - minimum support
* @param {number} b - maximum support
* @returns {Probability} evaluated CDF
*
* @example
* var y = cdf( 9.0, 0.0, 10.0 );
* // returns ~0.795
*
* @example
* var y = cdf( 0.5, 0.0, 2.0 );
* // returns ~0.333
*
* @example
* var y = cdf( +Infinity, 2.0, 4.0 );
* // returns 1.0
*
* @example
* var y = cdf( -Infinity, 2.0, 4.0 );
* // returns 0.0
*
* @example
* var y = cdf( NaN, 0.0, 1.0 );
* // returns NaN
*
* @example
* var y = cdf( 0.0, NaN, 1.0 );
* // returns NaN
*
* @example
* var y = cdf( 0.0, 0.0, NaN );
* // returns NaN
*
* @example
* var y = cdf( 2.0, 1.0, 0.0 );
* // returns NaN
*/
function cdf( x, a, b ) {
	if (
		isnan( x ) ||
		isnan( a ) ||
		isnan( b ) ||
		a >= b
	) {
		return NaN;
	}
	if ( x < a ) {
		return 0.0;
	}
	if ( x >= b ) {
		return 1.0;
	}
	return TWO_OVER_PI * asin( sqrt( ( x-a ) / ( b-a ) ) );
}


// EXPORTS //

module.exports = cdf;

},{"@stdlib/constants/float64/pi":30,"@stdlib/math/base/assert/is-nan":32,"@stdlib/math/base/special/asin":36,"@stdlib/math/base/special/sqrt":40}],52:[function(require,module,exports){
module.exports={"expected":[0.23709458825934995,1.0,1.0,0.7002259565958499,1.0,0.6506476518030077,1.0,0.5801392513178167,1.0,1.0,1.0,1.0,1.0,0.8295005607588931,1.0,0.37041184190327925,1.0,1.0,1.0,0.0,0.1497545460249167,0.09153825953628997,1.0,0.3305899847851219,1.0,1.0,0.706270529310804,1.0,1.0,0.0,0.588115593952569,0.4077769552383062,0.22505873015070035,0.0,0.41489713037807663,0.8123900259121819,0.0,0.4954598976919094,0.5750933876260869,0.0,1.0,1.0,1.0,0.8849373356434999,1.0,0.17938721669121857,0.0,0.7102633437925479,0.33934880310450755,0.0,0.0,0.42595250789956085,1.0,1.0,0.0,0.0,1.0,1.0,1.0,0.0,1.0,0.0,1.0,0.6870419541630923,1.0,0.5882452376838961,0.1332935524398605,1.0,1.0,1.0,0.6808557321655798,1.0,1.0,0.0,0.1902421886876515,1.0,1.0,1.0,1.0,1.0,0.0,1.0,0.7439831026796251,1.0,1.0,0.6827742828374375,0.0,1.0,0.7092293037038071,0.0,1.0,0.0,1.0,0.4982460970835454,1.0,1.0,1.0,0.8604441615972099,0.7399261527684353,1.0,1.0,1.0,0.8575051943149296,0.0,1.0,1.0,1.0,1.0,1.0,0.3651067828140606,0.0,0.3743425201621731,1.0,0.0,0.0,0.6583030478078284,0.969701265826435,0.6725889420259613,1.0,1.0,0.0,1.0,0.7373277102580988,1.0,1.0,1.0,0.0,1.0,1.0,0.24460395673294213,0.6208770205759483,1.0,1.0,0.4655598719517032,1.0,0.7047294350016081,1.0,1.0,0.7598655231565931,0.05393450550877405,0.7233478151669628,1.0,0.0,1.0,0.5338689624877604,1.0,0.0,0.6097398780534464,1.0,1.0,0.5832171165337147,1.0,0.18831481915287185,0.5783849378286413,1.0,0.6006125109460205,1.0,1.0,0.0,0.0,0.5788850222092458,1.0,0.2210803626099241,0.48998293134563525,1.0,1.0,0.33741422312416647,0.8453890738236799,1.0,1.0,0.6042718419893732,0.9287998769525007,1.0,0.38955248832942774,1.0,1.0,1.0,0.19966440566770263,0.5629237234271308,0.2755284449552751,1.0,1.0,0.6700279500655322,0.4964748517582942,0.0,1.0,1.0,1.0,1.0,0.0,0.4385463802021399,1.0,1.0,0.9418985082154322,1.0,0.6907391595644254,1.0,1.0,0.4027376751233532,1.0,0.5076247728973101,1.0,1.0,1.0,0.12181917571458807,1.0,1.0,1.0,1.0,0.5819254497761812,1.0,1.0,0.0,0.21867500292530495,0.7944540892784631,1.0,0.25408688203543284,0.5217381315475941,1.0,0.6320483659103976,1.0,0.6439315704710553,0.4844861566645963,0.0,0.08486492960916063,1.0,0.4211292446265184,1.0,0.5103442678092602,1.0,0.9514656451880777,0.42196776403340697,0.4110338578476766,0.2158499560441168,1.0,0.249162928597574,1.0,0.7642271437426631,0.37150089665177416,0.13850536839027647,1.0,0.0,1.0,1.0,1.0,1.0,1.0,0.40333574982347437,1.0,0.3856562576423251,1.0,0.0,1.0,1.0,0.0,0.0,1.0,1.0,1.0,0.2692774173468789,0.4614981243548327,0.0,0.5381064871561072,0.2359522360466477,0.6113948501899773,1.0,1.0,0.2794522143931412,1.0,1.0,1.0,1.0,0.623289806576585,0.34392318459501436,1.0,1.0,1.0,1.0,0.43328994351188077,1.0,1.0,1.0,0.5402839004336101,0.569254598495384,1.0,0.2752530694186495,1.0,0.6059281495410928,1.0,0.0,0.376535777545493,1.0,1.0,1.0,1.0,0.0,1.0,1.0,1.0,1.0,1.0,0.41702614889116274,1.0,0.0,0.45772315561985144,1.0,0.8938026518379721,0.6149716022254611,1.0,0.2826919699788487,0.9590979603959191,1.0,0.6215301041643976,0.0,0.17814144280624827,1.0,0.499420129797954,1.0,1.0,0.20953827099732278,1.0,0.3861803751183816,1.0,1.0,0.5829280924073578,0.9447449238063587,0.16258646091014847,0.7206451335331622,1.0,0.27751413882679604,0.3397823738641323,1.0,0.27053570459171256,0.9091763625582664,1.0,1.0,1.0,1.0,0.4223941627346495,0.35737135068492515,1.0,1.0,1.0,0.5679545195708535,0.5879938152294194,0.0,0.0,0.5164411262694563,1.0,0.5380013338995143,0.42714930565787596,1.0,0.7097376640272955,1.0,0.7950066538798527,0.28631485769822196,1.0,0.32171262308380116,1.0,1.0,0.5548165963911573,0.03916225007198517,1.0,0.41729962466756265,0.0,1.0,0.08040591468733052,1.0,0.412689758397943,0.6649907113360529,1.0,1.0,1.0,1.0,1.0,0.6342971375080408,1.0,0.4724719842969041,1.0,0.8328827592540707,1.0,0.0,1.0,0.8457106620594897,0.4832272331704646,0.2785976746267226,1.0,0.0,1.0,0.0,1.0,1.0,0.0,0.15162183203746593,0.5169010883616585,1.0,0.0,0.5073095028467174,0.3915188533077092,1.0,0.5331938012229395,1.0,0.21132507171144196,0.7288792471169288,1.0,1.0,0.8039092928076961,1.0,1.0,0.4331853608033045,1.0,1.0,1.0,1.0,1.0,0.6393841232013263,0.32720808014841013,0.0,0.0,1.0,0.8038303189766416,0.0,1.0,1.0,0.0,0.37349169829543266,1.0,1.0,1.0,0.0,1.0,1.0,1.0,1.0,1.0,1.0,0.0,1.0,1.0,1.0,0.0,0.6671275126853022,0.46825517794327665,1.0,1.0,1.0,0.24058057709155786,0.23716384357016296,0.46872230817607136,1.0,0.4781944061524215,0.0,1.0,1.0,0.6821426160524832,1.0,1.0,1.0,0.8370619980484246,0.0,1.0,1.0,1.0,1.0,0.6617869023237503,0.0,1.0,1.0,1.0,0.6574987793993653,1.0,1.0,0.5222609925606504,1.0,0.27345002283857434,0.2918324313657985,1.0,1.0,1.0,0.0,0.12421786918771395,0.09413064722184139,0.42077998643225784,1.0,0.11201609396446907,1.0,0.28859643002577806,1.0,0.0,0.307700893583436,1.0,1.0,1.0,0.0,0.6184784912884281,1.0,1.0,0.40848630738075575,1.0,1.0,0.4652398138774214,1.0,0.0,0.6542657102243283,1.0,1.0,1.0,1.0,0.7264959381418487,0.5747025851955313,1.0,1.0,0.511576443859531,1.0,1.0,0.2329404457057288,0.45792318494153417,1.0,0.907135780112247,1.0,1.0,1.0,1.0,1.0,0.0,1.0,0.3746700218881119,1.0,0.0,1.0,1.0,1.0,1.0,1.0,0.6450244997247218,0.44064179291436834,1.0,0.6815992185534887,0.0,1.0,0.7350909403682112,1.0,0.08669717185812258,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,0.6403522699697297,0.6901653281904232,1.0,1.0,0.1969059497830278,1.0,0.0,1.0,0.6737215108270946,0.6518575429295563,1.0,0.5999954497070642,0.0,1.0,0.14558191630967995,1.0,0.0,1.0,1.0,0.49942731367336496,0.5904121410496435,0.0,0.8222330452530893,0.3142564275671242,1.0,1.0,1.0,0.0,0.1785622516550947,1.0,1.0,0.0,1.0,1.0,1.0,1.0,1.0,1.0,0.5205909355011704,0.44277037296734095,0.0,0.0,0.5624170071569807,1.0,0.4044107662727384,0.17842864056832444,0.2681192359111953,0.0,1.0,1.0,0.5378101256408119,0.0,0.0,1.0,1.0,0.25052938459696744,0.12407815459164555,0.5607287762466889,1.0,0.3161487365507916,1.0,1.0,0.6949215992476576,0.23113498446209874,1.0,0.4020159107404312,1.0,1.0,0.0,0.6431352049622175,0.8003497527190755,1.0,0.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,0.6787740626596837,1.0,0.7327816157983222,1.0,1.0,0.18802734043408587,1.0,0.7370821981930143,0.5525085067557096,0.5652351918294019,1.0,1.0,1.0,0.5451188919598442,0.37703557620297945,1.0,0.6247128740475121,0.47435110990375257,1.0,1.0,0.5903318158094467,1.0,0.5119739730075671,1.0,1.0,0.5359156305595901,1.0,0.0,1.0,1.0,0.38578109629259416,0.3245494161958993,0.0,1.0,1.0,0.7186041276291398,1.0,1.0,0.4506671855757894,1.0,1.0,0.3478058946684523,1.0,0.0,1.0,0.7344182173153636,1.0,0.0,1.0,1.0,0.39609088864864495,0.13461355947177062,1.0,0.0,1.0,1.0,0.5606963878039773,1.0,0.5796508768342707,1.0,0.3999788052681759,0.5202903289978329,1.0,0.5107606955538726,1.0,1.0,0.2286064634084087,0.0,0.0,1.0,1.0,0.0,0.9197687349575924,1.0,0.0,0.8795216041701076,1.0,0.0,1.0,0.2778935493458944,0.17028831288462964,1.0,1.0,0.4697304414567711,1.0,0.0,1.0,0.0,0.2510743809593957,0.0,0.4652838204095084,0.03346461955914715,0.8432566181126786,0.08672475618701024,1.0,1.0,1.0,1.0,1.0,0.0,0.834485035332565,0.14966604103493164,0.6618216333693543,1.0,0.5979123426040251,1.0,0.0,0.8723443311079204,0.3999779024653865,0.537472544068125,1.0,0.7925029219706987,0.1556562357549939,1.0,1.0,0.7646863995657418,1.0,1.0,0.27472822807813646,1.0,1.0,0.5011424578283713,1.0,0.3274818231803452,1.0,0.3261604241169808,1.0,0.0,1.0,1.0,1.0,1.0,0.21608398217062813,1.0,1.0,0.8857093287433847,1.0,0.7926424249653617,1.0,1.0,1.0,0.711152601065282,1.0,0.0,1.0,1.0,0.5109625982426833,1.0,1.0,0.7148359391905229,0.4544587110029121,1.0,1.0,1.0,1.0,0.5952035129504484,1.0,0.5628326685106207,0.574520208486485,0.40099238817648936,1.0,0.34807952974875006,0.8998306068817459,0.0,0.5051137726036096,1.0,1.0,0.3698223108706799,1.0,0.0835019717298282,0.0,0.4951490297096999,1.0,0.3919454378387214,1.0,1.0,0.27249248886807703,0.7951469949044857,0.38315282448696886,1.0,1.0,0.6964445001617966,0.7401573084219393,1.0,0.0,0.7698677599379169,0.4275255099530793,0.0,1.0,0.7094540994745228,0.5552400360169627,1.0,1.0,1.0,1.0,0.44547243758667954,0.5014675399400831,1.0,0.6369115905630244,1.0,0.6449659946806985,1.0,0.48777757196370103,1.0,1.0,1.0,0.0,0.43636046372616755,0.6844505760388989,0.44994367783754236,1.0,1.0,0.0,1.0,0.6823603020460464,1.0,0.0,0.30203303314410646,0.0,1.0,1.0,1.0,0.6448629197053914,1.0,0.5975158117045076,0.2705023161010491,1.0,1.0,1.0,0.0,1.0,1.0,1.0,0.5818629844384164,1.0,1.0,1.0,1.0,1.0,1.0,0.04827416517093973,0.7815421079202556,0.1598745244583041,1.0,0.5198613390059312,1.0,0.4150040767597507,0.6808161570464318,0.9078210706673897,1.0,0.08194128682290562,0.4583248703748996,1.0,1.0,1.0,1.0,1.0,1.0,0.9430395311825289,1.0,0.6973638648765453,1.0,1.0,0.662355615894413,1.0,1.0,0.3269540937083961,0.7295707043655667,1.0,0.46320312054158164,1.0,0.6238411558143805,0.11352473088011389,0.1853027597949158,0.3254733152625691,1.0,0.610398215462736,1.0,0.0,1.0,1.0,0.5750226769880009,0.0,1.0,0.6754736590583403,1.0,1.0,1.0,1.0,1.0,0.19146555146022362,0.0,0.0,1.0,1.0,0.0,0.825009656410773,0.8700890582102105,0.7705594237867675,1.0,1.0,1.0,1.0,1.0,0.7066392320732143,1.0,1.0,1.0,1.0,1.0,0.0,0.4426949398903654,1.0,1.0,0.5491898767639625,1.0,1.0,0.5958821021865613,1.0,0.13432170374531965,1.0,1.0,0.19008353422192897,0.1773617609339021,1.0,1.0,1.0,0.0,1.0,0.7145372393021291,1.0,1.0,0.6308004223401479,0.0,1.0,1.0,0.0,0.0,0.0,1.0,1.0,1.0,0.2927288877300567,0.3744811578065048,0.7036154438689811,0.3088222406354261,1.0,1.0,1.0,1.0,0.0,0.0,0.6884469424386268,0.6710087198180041,1.0,1.0,1.0,1.0,0.0,0.0,0.0,0.0,0.46051089161681114,1.0,0.2873839886062188,1.0,0.11701550965223405],"x":[7.4966245822507105,61.827713642643985,64.45271306433082,59.16186215467021,95.43041744210457,36.556739550844554,82.23876911525056,47.152749371590595,39.566610512926026,90.36368850733108,51.21147420418461,70.17359238946781,98.00182032246798,69.00105214941705,55.482119849382,31.02606772137484,78.11752525140956,95.96144394645563,21.92712177025724,12.435318925675865,20.282190713089765,15.221633606236562,83.17817055899306,28.99353492990151,38.27760590141223,56.68334449059207,51.86306780141399,32.74334933700727,94.48500664495323,9.093856325045003,48.58121530377466,30.750816008643266,7.110963960796846,12.957456500832265,26.659597853088822,59.59451775301152,0.320181767843164,35.707997861868,53.3263235143814,4.742014211889556,97.61995901183029,48.50736800788735,79.04519161360393,71.67368993632375,79.94817360843669,16.90400091164006,1.387098555938393,53.16820372929705,25.836487540745566,5.638518545866078,1.6201892060863088,45.68710266282152,78.73562097773024,33.12769438510876,3.514474411330082,0.5562311033282308,97.92851450193302,33.865190895585215,87.77903235719475,7.062847678732798,73.72767443552719,6.884155036935469,19.133125941936548,36.01164720791012,60.1027252134436,17.160718255222562,7.223698354948782,47.020992814092246,70.50109694430928,63.703282553436715,44.66121300263119,87.93476022832512,81.01593270418319,0.12478012102807856,7.87248743015696,52.15522611115555,18.989722781228412,98.60837941192075,73.60267180090072,95.51157294146111,12.948575957437637,97.56699046964945,79.30891445998975,83.0704211651047,62.29385579582338,75.77069559039667,9.093321966537227,53.98968973099605,15.809854738842066,9.936639253045843,35.8249720032267,13.89350087994381,95.65252151147823,32.3429409277862,49.76827613638517,87.07118133821434,71.89019703409289,64.83627858095417,36.77189609229039,95.38319303802602,63.04011641290481,51.46140676034179,36.36411195567635,11.317177385168641,53.293823768501184,39.401554982932694,70.92767069525753,67.15200707454281,97.02416948070125,24.29076724455379,8.192482458731764,32.24179832938472,36.101367450547215,4.089273403635807,3.8683797021664468,62.60009732093768,50.85285814629847,43.372645566598386,48.5985617730774,47.41871890069238,4.205710547913388,71.26977737929732,28.50230173482611,87.29256435603827,79.8395700401332,89.22408212913773,4.882808146439377,39.10310528911922,87.39521674814557,26.017137587540095,54.24041826439876,88.08509368866537,75.26919164834258,47.962033545925834,79.08287360820754,66.41415141936426,66.11938985164653,81.18468719443892,63.791709083284466,20.21929349718352,28.78124265978419,20.289934083895478,5.932866281525517,53.234342902935936,38.82886616865482,23.908324791162137,9.043049005157112,48.00167700440077,97.27733466945918,89.20936336196266,40.74186715206316,42.85045806078751,22.488600793414903,47.692038437922825,39.09361410377665,40.815420247621084,93.55333619923675,98.40877070612946,0.1356875324437512,4.140268929919699,30.781968433982243,68.3305622425785,23.48428477069342,39.43399394558562,30.658320411261244,93.51060526220797,31.612972527504457,55.794382708227054,70.13379635269736,83.20050293976449,49.98694204054714,50.59294352322195,61.32011844144847,21.000900920216246,53.985583476577226,75.9213704139373,90.27351921213476,12.918126217816317,42.33952650003854,19.207705416684107,16.359970484811235,56.78691787173755,46.752285642053714,46.403240258478995,13.126368816948242,94.22299067659058,42.67663229491121,71.37343295458373,78.28928299030997,2.2054619608728343,38.305508058570666,26.432665119686337,95.71636173890094,86.83156062090664,30.484420275916115,66.11963585080005,91.75298570213724,96.55716058717158,27.261843633671766,89.33690005336008,56.31188467478869,45.6063547036442,83.44520650703413,57.21700620889716,11.762450945505742,44.79477345308136,77.72343603679164,72.32562232059452,54.38808190677808,31.228106334758433,47.64281574686009,63.14326118960587,7.6250028810538995,23.8604592222202,46.919946501376316,71.44188627626895,15.546049943334861,14.462509023714043,51.309723795573106,57.151099552871855,76.96401949615586,50.42743905481974,34.14856883895423,9.393401408513014,13.95242589011405,61.16488222348513,33.639842914747774,76.83261188273211,44.40723689446953,92.72848875310756,79.18770629809042,32.989304028113864,19.898068592999294,21.318236444965954,59.50251302280034,27.170593965889456,78.59435188414257,50.02779372338322,25.133618015921954,10.454005190793758,78.5186386612725,2.7464718341981387,31.852748934935793,43.60017692914424,85.68710830122616,48.22932011162888,95.25564999875238,38.09986639759846,90.48808310350908,39.857510416975096,57.20714584412387,18.467765848875437,64.16990953443779,48.26497448155573,12.347733139434336,14.243025333448722,63.98746366415373,87.71020135425798,79.66964495613307,12.542154781983971,42.70217454523928,7.582989061023837,63.42675783223459,28.41305146921014,62.26417493486014,35.05210760678585,79.40657800591315,15.99271919326255,46.45028401938769,80.23389972600495,68.60402915864266,80.56221865331051,34.538577886157974,22.578197737963414,39.54185577510418,99.42949460293629,94.21693718880815,77.78905804318748,18.5465850105617,62.92510309035795,93.29991502962274,85.35988581111629,11.500818291309688,42.52337485050768,84.76407904758933,23.031826499821626,87.22956468655119,69.32370063030974,66.10111250186286,7.047409811827543,30.572261161855472,37.79828863784389,97.69261729126748,95.02400217023062,39.142950956801116,7.022503500879718,54.83015049103117,81.86000675790288,45.73238231447536,81.49721007986528,83.67773290282634,24.84211293431131,69.53477101744407,1.2992663382903613,31.429491333640303,62.35214058979033,82.21043681394451,58.431640647465244,88.623173974983,22.850019823602462,83.34392666167332,51.54912587956417,38.06918440356624,0.8806626609848989,8.631783813351523,80.93871771834895,28.58078540987743,75.0561032556019,80.81319643262145,13.30214610662388,91.44850912552474,37.54708044529475,99.46925224035068,64.06248739293798,45.373516958917584,67.8738024566627,14.434667084540287,37.59869415213042,69.61379396367968,16.058017075741084,19.60889816500049,93.01676786635973,17.92114355536811,66.6280382510703,49.93454316662227,80.28061073388908,50.0424825561852,88.34025084166758,23.49965115984427,21.95243414481891,44.69475921509343,81.01830419683115,94.2442894900751,54.83119589366778,29.885944538217757,0.7616906857014438,13.987350612339068,43.501391981147286,32.16621121644137,44.81649085159736,25.894878933888087,74.13507864732229,60.45445271563506,85.83397942566269,87.57813581909879,18.137590136198224,79.86944404414558,12.531244522271102,86.89031624997412,67.8430906121957,61.294263106613414,0.3488310033030739,95.728169691812,35.13509484477326,4.899666807529868,70.75249959921288,2.507242348414973,84.72349374972474,31.152256209772222,42.6750337016051,65.81910932276817,38.63122296469712,90.11839355804617,94.10153781036843,85.15948428666024,17.73000433398748,90.80070176228148,34.870781337952735,87.29015949305693,65.62931468726529,82.50787438609339,10.434650373808797,95.72679815437601,39.68610086876021,33.183641926599485,21.988222104244535,87.90309007026984,4.216027711820947,87.64103997200998,5.305660128247491,84.02629941720284,41.70032408410984,7.158105449200192,20.435295343228145,39.14470524609679,31.362905473961877,1.0745958950278522,41.25336312204651,44.36133141353835,55.35708870518028,45.60829293729771,89.80877807130238,22.372598145685927,38.73404884316651,62.848540892327854,51.17932886842438,71.88990958285746,28.084511220795406,72.59781661624302,47.21583188196317,80.87711995963802,74.35876216601332,68.06284856741895,57.3525950327868,56.77644992921422,22.512276660793006,25.1077496004767,4.662967159051923,2.6400094828662235,69.55253352957106,71.18592328494479,2.1607847689609994,90.24194832518653,55.96542515046503,11.019373164267643,27.25802186161641,94.12368545005411,80.916842293004,49.28993532959747,2.2218153678191577,31.0742561880309,55.828916938982864,43.5466040720083,48.06736368809097,69.02154641837215,85.33779868986322,5.895191131660393,30.18166278206682,73.28037413414752,76.24450869771712,6.996665585529049,37.03377946617656,17.968592017469565,95.9118147829548,30.00662187989618,73.46532287673062,23.829240383480332,17.627803518758412,49.67165524909336,54.938694353776896,46.935396807432575,1.3832472749706781,64.59322744095823,62.032904137670755,52.50161121350465,77.8868849741299,60.88518912649634,60.263552157768686,33.60818130151162,2.8130735521918915,26.075135494211743,62.17333637463733,53.989804093635115,90.49273680657845,58.03963950703845,7.947988309118736,58.74606484942346,87.19350532591439,96.76041616157411,59.83017937047374,37.42805536530178,68.64431190099522,27.85171303530374,43.595988636850905,13.942200650915426,15.737481629563966,44.67103617558914,50.506154771052515,28.875687845370802,4.799400101318296,19.37332814157624,1.7454553545375395,17.01352991562142,80.47574245788667,9.853361971079245,66.10788556619704,13.693794464180309,37.1535269005153,1.6859138793254846,19.242876148229414,50.12378729172722,89.66063919566419,59.29598371700682,7.103690871986301,28.080601599906018,84.9535178326122,39.85453534629193,33.29885537989501,77.62785818316806,95.8483039074191,39.94565025026069,45.254464869747515,4.3817892167057115,41.90341633283015,54.939998517094345,26.05999346824568,96.83145030604736,75.09856474530355,69.99421380481911,17.16725997738193,73.48719517276763,83.32872386417137,48.3115093151552,70.99910598913822,92.26507282363742,21.49117631099784,47.555323202864905,69.63148618330055,75.13713242584765,80.83351884292225,77.24724424567965,93.40093679272357,54.17703391923192,68.5351024342367,0.9905095934079622,81.32843736329872,40.39140753543402,82.41368742651183,5.470235899737719,45.73084644442882,50.94958492145811,81.19568215732538,91.9249467619419,83.76016909300247,42.569652270061354,34.95106827337489,8.110923692698059,37.14142244246725,13.46703711373296,67.96740962854403,59.31691591443664,46.698961295524754,5.475841028896822,89.89818362004152,96.61606482719253,91.97410527513516,78.27583085697192,58.612931982206604,72.43056915645273,68.23335204551888,84.11274117158953,49.20278550324528,85.14650297823158,59.526197362159785,39.74843888510215,91.85507183784189,74.22873784903463,18.069309913146014,45.61994091687494,0.032050973235864255,73.7413179314239,44.35704536533203,59.27659979438968,47.043253332935464,25.349164274589064,8.552494461315296,71.05991398840226,13.060105213935035,74.71640288942308,2.4679381600545947,96.63210483987284,37.399303273980756,52.21841608883424,36.5803063379005,5.8826025829141315,33.682764171131765,24.002409647241475,92.91686916598738,67.23459477981993,91.68079058713869,9.319837920462648,22.88740907297462,70.31833589655399,71.61705773231634,6.63624244357548,42.036889281491256,95.10413890423952,41.88539869196721,74.7772063394462,50.74590282866649,72.68349955882975,45.34790252762322,27.637440375167355,3.3827970085039905,2.5040168657064044,54.33632696852293,87.62268668659416,20.186369137805404,14.398003052612784,19.172808748151215,9.220888075324197,80.75309709416192,41.87895122222653,48.22127004949726,8.577756689481797,16.12538537951902,78.57140546898333,91.28821014982557,21.836087985510268,3.9953578276602952,29.599535823311783,98.30031170741576,31.234954672775082,49.146366440290535,42.12140259404522,50.78233638842185,19.91935581387758,56.5813600509101,21.47243949570563,77.45001681312583,94.77207119054545,12.63693783011468,67.49691706335864,54.28651982766226,76.8851721335724,3.3236111218767794,22.086506360995408,27.9287407111509,73.33826134032549,99.03207939578465,96.89832189702743,73.42688128999409,71.10514987958614,58.909137394044706,52.29525003549178,27.856248151275366,30.658869110979747,41.53674582441658,18.6777923662643,93.8228968555051,42.17875872056973,34.36594219875027,25.782407350447322,67.99830535368625,91.31942314887121,93.97951552512713,34.2973116312637,36.54499215739615,56.542109403241184,62.242283591187665,32.985463135325645,95.26421532007548,67.8988280868676,21.43126897591774,74.30461871184445,25.326308687846645,76.0380337115208,90.05989857631158,42.36451930528209,64.72353532697635,4.2824536045874995,66.43468736738973,46.16195258800866,25.406472260643053,17.969799320379522,7.408634660397162,93.7046534206201,24.72212536329621,67.8636736415824,91.43007536878775,36.64074515417512,25.33415089128066,42.65930393409778,32.96907324430174,12.547506240054362,90.97598918113275,0.6804061813630913,74.98917946128665,40.04594610230401,40.49773600843258,1.212363313645648,90.4634283918859,69.50708774041819,37.61556956475482,8.927040255612928,75.18523555522196,12.192982052857992,99.47641656585829,40.603442408103696,51.66772231519998,98.53723002531918,25.393153296543037,53.32707761374023,32.274821768690074,49.386739943025674,50.070664413597356,34.18953547931656,86.5672877967925,82.05192315915582,6.704234228972861,0.8859294628629444,16.64495778033497,53.87748653743041,49.19638491948108,8.752447507680806,54.848866556687746,29.13857437226335,0.27662167720525765,58.27952294121861,86.87534942005526,4.637197201034748,64.34068119306184,14.012058418942196,3.5875442330503216,94.36924549676226,93.02990479900252,43.97046196643324,97.41618529667926,7.054417233077803,96.36468405588926,9.951899469449721,28.830329533860844,10.005912010117823,35.87082461466002,7.986280679924418,75.00902077605858,2.974281478702623,94.71949438990363,87.39988396448194,61.80459761890378,80.09774952399063,72.08905964594248,2.3325326882408293,65.49554140633087,11.828549529140698,73.57983204048621,71.12986623074535,31.508394685706985,64.07349236267845,1.038564928139074,74.46847375466066,19.592577104438313,56.723002304342415,88.8639537476936,29.409988180276294,24.178708097538415,42.619471110856026,74.18659590198722,75.97140016670485,28.508011443365877,63.10400484305505,24.530638882396083,53.676953231993,56.119950318651554,19.739075558172825,39.24619982184008,31.113302315203683,87.47256330524368,23.79750477175573,76.59127056225392,5.820796018059138,46.94454484013526,94.81406576904907,93.53219357774427,71.33655030282762,21.942650277025354,96.39374246801655,86.1131342241968,58.762534254480414,41.77515392727085,21.873128288957933,70.59976978980428,38.35418111007765,77.13748016096748,34.407437588487944,97.0233122873188,5.408585640733232,60.48017830013048,35.93997005169918,32.73170202140187,97.87044948749661,77.3395665886041,61.74770850747851,41.838565361152625,41.46260664675145,86.59006989375418,84.16346517247644,78.87631775185436,43.21082284053786,39.69600995780163,25.579308523269507,58.676858482937334,25.233821611465768,58.16528323643879,17.417690150239284,83.99691791764397,10.370411088329945,47.814062027562954,50.14043929773031,68.18165576719812,33.953178461691415,84.9174023477777,9.52526946187142,2.29946865043118,44.40180188240921,72.31807071028085,21.88048114604195,80.43846029459442,93.32082466086604,29.756407939341756,88.58989832858325,25.53144565327383,92.69652634005159,99.80934108526473,33.75422308456757,51.31319082194625,94.03649535302266,4.327323910757341,53.263610893114176,18.26978100069141,2.9622234718220675,32.4255734439161,70.25433172828355,42.275436507264374,83.59923535471007,90.0846073411258,40.07469874818528,69.24967709650996,42.69608940312648,26.93307850146973,88.20005138547211,65.68748335440222,43.31738088374537,31.80971758295932,45.335136237173266,48.252294471309895,85.98878996117818,64.26972616422306,51.292032333455296,14.227615733174304,33.12535818039937,32.615663056279274,42.72251766075286,78.93411862385047,81.86629042215966,5.3383784765895115,89.03970252425462,64.23775352515155,74.04926204472237,6.282582037305717,28.4142982095698,2.087954144474269,32.553576817835705,76.21815296156448,88.41758591561677,38.559556837163434,59.706338136223856,59.30418510150195,29.229971204407114,81.71918534612523,78.96243518228074,91.14699320039286,8.114017070286472,59.75337353378352,98.43418609887478,99.8325236544987,53.93263197187332,54.20631199580521,79.00360727139501,97.71394060237242,68.8329640731808,77.32760637545726,59.47121888743416,18.435544082164657,49.31580697180138,3.629591819825473,55.74186478366268,57.171626914427875,35.318473103543255,20.989102254701784,59.41326043387707,76.50465516172598,70.2618066218493,20.361747487208206,25.962806068273725,63.827588290440374,39.39276853096592,34.40673625024251,77.88556405484081,94.22573325430336,47.663800896922815,47.86586828521104,48.882185241661745,55.64752557515269,44.54899210116605,77.26476820991905,38.00505367699672,31.89613919641201,85.182211013258,20.266059461215736,39.28469900124565,43.66875507888916,34.33762232011419,40.16520345683321,57.22529028942418,6.829046636116587,22.169664097342825,18.918909565819277,86.57599029785368,49.23279282922517,56.41076179951456,4.176798082108624,24.365125136885133,31.012619319178402,57.46634994153508,7.0076575579652856,96.44686718243831,54.1510074753275,93.93817780532908,86.75670599809713,76.83070387245658,38.799409049252475,73.08591025800395,15.408954651755714,9.16238985409441,14.430961210539417,69.12207152980648,57.65344684328733,6.750483454543965,48.662130030276884,23.56667360213345,62.89372034732557,86.22609151110339,30.178980256819486,96.21969664550132,97.5761918679424,90.31766765382714,60.18121305134483,92.78105987577305,41.670862424528046,65.22379622704135,97.62190412344802,66.31792518435186,3.533714161533452,31.11443265723124,92.94266833121756,85.00064008587339,41.478308115322605,52.30933848475692,57.46429488569129,54.94010726543954,98.67583473336545,9.70465504123068,62.575871971354566,62.85888396655248,18.66693153789063,23.15741694368494,96.57702480466024,24.611128167484964,75.7016711392114,3.5296224176939672,44.039079643591194,62.91921894619988,85.40687877042457,86.42192351478847,56.695191114876664,0.07564332783760452,71.94516369733573,66.10911888073466,9.098224654667476,6.000916397054401,2.455025134758415,49.45208989052301,65.64199160333719,75.99979910551741,7.841727931462694,24.609029034531595,62.67752179784094,19.161150646455095,33.59621421634087,83.78472203296312,70.58036247924322,90.35079278205875,14.363974987789874,6.543146826215862,60.489901025585354,67.22489162648874,32.56225450427783,59.40062576358367,84.22788232580385,51.20097559695107,0.041155749996790725,3.3113743583694344,5.099119154034737,3.804359843684524,32.147792925073524,72.95693143505717,10.129998819228735,90.3169499832592,22.03054875456054],"b":[18.77375905904662,20.551087837925476,32.90719140962301,71.64073768829651,58.89020568387644,48.39063686058569,28.428088843748498,65.7031342213185,23.317298906800907,51.83658507269436,40.828177828184636,48.08828984728465,22.476896416201125,73.68415678792562,31.444421025267847,72.90997405291915,59.08425751968396,37.59957904495682,8.845320184799608,88.97778734380225,40.155344458467226,47.13643344735342,36.28403414286667,64.11315380705963,23.31621550940806,33.80147763096623,63.296188937749186,26.733952108693607,58.31353553198105,37.46715348654112,74.4189943210394,52.48793448560376,59.16876563414944,70.76829502546202,69.26033476373333,64.59769290547014,23.497728120931036,60.88066381265222,81.31027639623836,44.48089834423555,22.52209708659978,33.148502195399516,70.8570050878813,73.99632172012949,43.46345836142209,20.743083813074133,55.189500700789424,62.36886159349461,76.53679495436145,17.44775085793257,69.34534002255505,90.55276873855192,43.95826431136039,32.41959794733155,16.704620809863467,68.52472588422988,47.5706571721945,3.5532849334414562,45.61620634320289,55.81371718594667,25.506032948884666,91.7156351639868,16.641787725785502,45.154133210530276,19.1664944907866,26.804285450896472,62.00692562252995,42.52533278700964,42.13931568283742,41.9149786776288,53.03512192413862,42.815097409238,8.592397457806582,61.99356288534216,18.12224473257393,40.27691290699657,5.949476579310673,44.25671399311316,48.106783840061524,20.062757136528646,49.04062432993636,29.681557498000515,90.09985413462921,76.3672333421293,61.07640598647133,92.63352312471658,53.85546513101731,27.004420275180195,18.363399897333636,57.129868727653985,13.704574410233587,27.290188372514272,34.83505362076101,51.40217624810387,16.960761773492507,80.35331163483814,19.44913701731002,68.03207712586065,42.93016508039645,85.56965083184384,9.625809878012724,20.744240999215396,37.578374831003984,23.571060966377367,39.2698158091919,27.58342941139713,16.71029613172913,27.66451343753831,22.563222384158813,67.29510289403493,31.89760668944767,63.55013137098259,22.344362158342513,19.291168426451122,83.12016875994277,78.21834895289442,50.95937301895836,53.60953968244391,31.96553953837619,25.637131009407344,31.27305054748817,69.75564067363831,33.17357583200415,76.84896279140727,47.301132967961635,85.6735309333038,46.25180871235491,6.050630509532424,77.12067123952848,79.90978824375759,76.70068505651007,30.36869249337775,31.26907898063308,88.37445903778153,62.55419154213782,80.33910711341045,39.54023458690068,30.55732942220184,72.08795939627475,86.79726028243203,34.82864251250916,18.438490147471768,59.50500678463804,27.9131045179402,66.93043936086201,13.202567051855944,12.47816033387052,65.8714413041259,43.81223498930803,49.535970908557246,53.98580866819885,29.336377506231493,95.09276581270983,65.66096096114293,31.774676623776045,60.00131632959418,87.99545735400453,57.67361461971359,73.9608644087352,27.223058117447803,42.8459078698603,38.11138666756085,88.00927650438334,63.62309039510882,20.297641544161213,86.83180858807464,77.9870206701783,58.947127028253156,43.67446429389358,78.3349526410878,70.15303799988064,51.02978438451146,52.38722299348114,59.325755600219985,21.891265574276375,55.18169120181154,7.25235237654021,75.16087415409089,58.97000175209111,42.21774810822405,12.33027290780258,49.99116135786265,58.562609169683796,75.86961815633582,24.12725434357467,86.48088141211794,19.20718106447376,24.263817507883406,65.64812727525725,75.81927574388554,79.94141353174331,14.35089924258541,17.711058108471256,87.40090362960012,27.971776544661772,80.59224313089776,64.51434389639145,7.647388460918738,64.63861818995954,17.16351904856459,90.99489980876074,20.19148999974324,32.18899021834823,14.528403148299684,87.25003782242703,34.98978306571976,30.88437057515692,25.51132371496667,30.782106310052054,49.418398575427204,38.083532354696914,26.271870030782104,70.85576362736927,83.81240631802139,51.94664237764658,54.61466734229944,79.61843573516208,27.073334899197377,44.80374051076696,76.43641347915745,32.578158371283536,65.38764615918788,57.45015728821401,33.04448284755594,43.40162224988114,33.45851826320742,81.46103309772761,75.59628699516949,79.99800036923547,39.70278108767394,79.64507616284503,81.75846596738853,52.66616040859068,75.5930254872627,45.984838129483656,85.18518083945719,71.03442104590242,54.81606557919836,74.06570207586695,70.91566069632258,42.67842892035945,74.8206719581697,26.07170097336349,23.654710558431926,33.4790886622892,28.12219104936556,8.563768404067158,85.1099332621751,28.199085424136197,86.20242844396684,32.04436744468621,28.474206808200186,55.7975328780253,16.105202364826017,33.35832473642613,57.2921036902938,42.98178069146697,50.356902209988604,75.52836035202004,64.13164940433752,75.26496177812047,42.43836474444483,98.07759999277283,92.53784437126353,87.80366256274033,29.611640652352694,77.6198328806235,35.50213141308536,17.22214412219619,76.0363082508071,37.96929609918351,22.972900349022083,49.23838673365026,64.41416253423884,39.23142963377847,67.34400394785919,74.98897104071322,29.261144925624,37.96702995389929,19.805545036391592,21.012718387479783,34.4206308647474,17.439220001652934,67.28445505676495,70.24251538939447,60.312357306000195,11.16670791749998,94.82131290017631,11.924301387944208,22.34694642058173,77.94607484106382,27.001766983755374,27.53573638634797,64.57617269207152,18.240999752322068,86.77773388520295,47.831028048351826,26.83195381429129,4.631135787844549,19.0743105289164,55.75675254491892,56.33802216973179,55.5925926679601,15.75559074225653,55.68685540186057,51.06243216999418,84.03782883071554,83.0056156753255,10.735381769449068,58.17777366730819,83.66598759257025,19.530379827680452,48.681066416962565,6.077596980473832,72.1233708606412,35.17974711684687,40.85832014869167,31.470690687538227,54.373726498233346,84.12697196191472,86.05808765150334,81.80739813773502,77.76504006901187,14.197565199482032,68.35286076428545,68.30953798644308,83.85248405714725,42.02952327449186,36.59497425316452,47.835090523876296,54.60526256684878,68.93789138163906,34.74538567035433,67.95413484033662,39.78178028683508,31.35517413295054,48.731615371490335,39.85737198803387,52.59763560880823,56.43126341954452,14.084400924627705,22.20610394398458,17.402748149962978,77.48414735314807,40.42702875887693,87.879091714809,46.15999887892403,69.78037692350689,31.11880260087958,74.9954739095327,52.70059041413464,60.608225608211406,73.47394629056375,10.263308565149067,95.39033991410221,65.34437863353406,16.33227563431624,43.064555241709726,37.469760588353076,22.649935831359386,92.91730193541838,47.29020602720919,83.72367656207912,78.17869397758706,53.32924954969876,1.3070080874395984,62.811157802088815,38.68004956682527,81.53155476470019,53.820032966616495,48.58085635713767,25.320140655757896,43.74456835418998,49.925479195364915,28.44173380935847,22.13583359835612,38.21044559900315,65.2216400078108,44.99995164599811,69.21559282821812,32.90748542260242,21.190998371821554,33.749607320884465,42.02623808933031,55.315540293178614,87.12559302879893,72.84520862815954,24.665162250946526,82.18598412614989,37.20443990811809,27.783395858517462,20.980041491986153,85.56684880441794,80.60996262182502,72.95316527322305,15.589315286784613,48.05401308190775,79.65798943957931,94.88760828970467,48.515656984882646,81.35179169486953,12.500940388945416,64.97001939078524,44.256821140924174,8.376745261407299,48.24224206589311,79.14141915682023,23.00842784317499,66.89376462473103,91.56928664965407,55.86487172844106,64.29775464752463,56.91958090308589,34.026537886708894,30.35925428639205,26.23240840544287,49.96819502994399,39.2866175220808,41.955150348846914,15.047290170731603,77.97938321258202,53.805559522254136,73.76205215478154,52.92284532219445,62.85992975583537,46.9308106422465,32.307480889166555,21.07375995298893,47.741568448612966,72.3013822558767,13.40629856487495,24.763132603459127,24.621506959832246,42.84416353960967,57.71451712714284,19.28498571196137,17.647040630233302,20.520956505796264,62.39231089296706,52.72339599114659,55.70028291799538,43.60486726748245,39.64390931070323,15.244289644403164,27.983483953791712,55.995581882594706,70.41482309138844,84.37905106760319,87.11231172558045,10.073638141338224,81.44485285045543,60.29386633617695,49.59035039464359,49.31839093386607,65.24975030442937,27.863143782775325,45.01261488743675,37.58907973512787,35.50810548589847,4.68093286395781,21.645017963879827,34.98755934456942,37.67751550985275,54.00606070791838,73.42412383353543,49.17220954748757,26.474805018752857,37.91038788863603,9.17056067467274,80.12119234231963,16.236564792759168,28.128663674113554,43.85774973285075,21.749759394401327,73.71663034631551,63.020410297319394,14.322555101940138,40.61658974852284,22.844173356805122,99.48655337761679,95.63800211396128,36.16347814354235,26.066656618818303,45.59870666436892,73.31414379047172,26.995717224721343,64.38393590557453,31.563550426131606,47.40194263782567,69.76298444197484,40.32054849287566,65.69223294610289,13.328901803239797,9.879141607851615,40.28625340473278,19.787017590948007,24.32266247036108,79.4804410285926,39.70035540501797,59.9700085268915,78.02569817968072,35.376739180633805,23.444197931195085,54.41832088454593,48.143665141276806,14.824693124686043,58.12446976533978,26.807621205452396,83.66996767745074,24.022768876669964,25.706612517565922,34.08342620995117,86.7480804914997,55.074607445649065,48.72999403475917,89.55158496327253,84.3366900012087,34.671923463223564,76.61442041587397,60.6569444608328,39.31215441383955,71.87073058836756,20.648371358060892,52.843903423729195,23.419400100708145,34.91469910641178,95.02773211063555,57.14581747694956,22.902470756401687,42.83975186727822,31.19740548483836,72.19242355220175,88.1597340672119,35.577326788977146,58.6533252844019,79.95335608589815,2.715389450811725,44.71254800793241,72.54317932071949,19.2898164510693,69.40131983984656,44.48164543996855,30.847192993491397,48.95408892273171,65.1803480978366,26.425249103724145,23.175099228752348,17.753829355999837,36.661848700013394,39.591771931243045,61.25072712468358,20.509696400075242,31.277549376596234,78.08346812673051,48.158600709450795,60.40273384732086,52.26585663443787,66.79617974828093,15.586864744398268,24.96213898568055,50.74409853840115,55.34857286682962,76.11348374506606,42.134720038322385,32.783211816081995,33.463462533069396,50.81471517946687,65.19262511215273,54.128788633489535,36.07212038483443,88.68039716369658,29.667221201050523,86.2692583306721,47.510642590946276,77.82863509988027,36.070743984223164,53.00111808000363,42.0985696952324,59.3483275722961,16.395882765120945,64.55778481805682,96.64958071605307,69.12892036261128,41.56901496813522,47.953452720874544,33.12175483617091,50.44527874300671,38.970020357063134,41.092223989359084,21.942082753575065,60.47393040121625,81.2998396520808,61.36824947080104,70.70198089326598,14.145811821444255,79.90043051073943,49.48962436818478,51.17244281804558,34.75295145412086,83.62147581700911,70.58302706253141,75.81749796163882,41.466686114260355,79.35805216349371,30.472009117008344,74.01247538356182,21.403710769328708,15.389025187437596,42.535612520720036,73.87545999158888,42.636009648994346,48.702271633080684,84.29130606523881,48.78456886665796,15.977033731724916,61.64097823196253,69.65581168918503,30.154387663735154,54.73807139276816,63.8065944979811,16.723122081306542,48.0128956537529,86.40261937156782,59.504951942562975,37.775934681008465,10.460730629378538,9.911242787593828,19.153007475035622,64.43504424266341,56.425252680806196,79.42896069034609,70.84950568053077,40.33775687691035,74.6822826560949,28.941277284538145,32.9194885882688,24.633069829233726,38.53753978355029,86.43879786015118,25.12090855571315,47.096099542740504,49.548725764007415,36.05262597260271,22.090366807524386,61.27955840386295,61.98153659368004,48.54357121012211,88.9686104096063,29.609204917689492,85.68488822629075,70.90779941476404,65.46823491302229,47.20098218046412,24.964718551076118,24.729367007201503,32.465919592002734,33.62845198132902,16.957647717735934,68.72497368803494,19.847426791424205,99.18377198243077,11.221175609261532,32.37463571820692,37.527633076625904,47.378770402202505,73.52049534700805,60.69641495688084,8.120413944514532,79.08306607482443,49.60995484573348,7.535378944841296,38.61409097560288,26.727880204797078,21.581979425401336,45.16127114646469,68.31187613703923,12.650874491092296,22.11812910047008,44.23959067203454,32.82529125951186,26.560383503827715,47.79275915681908,50.33669350296023,78.61137579603455,57.71297478014921,43.4797557806712,63.792516640833284,9.218284058251776,18.961061392626167,82.10340390115044,50.10862043117857,40.04592205806567,26.651912028013918,59.64898491358958,79.75876624882854,38.71532104297521,58.9988438138206,44.35061520430359,34.71450492200606,37.11063469921465,71.90813364877047,54.17080068361935,39.331110716959046,21.44290264599909,16.592909119939026,55.71637407431553,20.967140052767395,74.39797682603869,59.81250908856257,33.56963437943079,29.581966689630118,50.90736650907977,67.22586846800175,47.06648417078627,73.06345208609532,73.85886959522777,77.18590121055576,83.21849983528418,28.683915310359662,30.58521626592291,51.54600530913028,81.47084078994075,25.943605149511825,68.60614036441852,57.737011332172415,79.72019685600766,55.74770274395381,44.20454825234936,41.692732488112725,27.049104806176096,11.337630857874924,57.60678465150528,33.072024895628395,69.17543174342762,55.18517185408815,92.72254004186456,20.434294719084775,46.52483539939481,58.748432177927384,18.627631291090832,77.1535684495416,39.65220057370615,87.0693786512999,11.361340978351318,32.551999075036285,97.39766403402223,22.927642224449745,39.99334535509985,85.74581881310992,28.397772812416157,34.090441325067715,74.56884135609468,50.26995497959172,47.60082171950867,34.732252448466376,22.599745870885258,67.81776296253128,37.124964097297,55.38712316331273,50.88155685310553,50.03967986556455,20.659561041344183,66.69384192896607,68.41939666319341,60.658249563695904,57.49675286059146,17.790836686087175,37.78181534499038,60.323864494348705,15.621438697977643,24.2536671922427,59.010634615511414,25.053774779978962,34.38752530052323,38.84595478735975,23.684222364515467,17.195992399981883,4.414012371677289,22.65372139237894,56.21720259694917,28.451494110954492,63.622521697412665,75.68494217712517,83.48844490424094,35.0172764865066,61.33896852567325,5.358275211006114,51.3198480572284,63.48975730890317,20.463069784653133,37.563272081278434,86.38981248339257,42.27775490788191,25.771625839775286,52.65801309266632,85.83382326481778,48.65164837575531,82.53461415977597,49.389428746309235,34.681839796606475,79.89416453714114,71.34129212679258,68.9752180270704,46.57408031961339,77.58207124361618,45.70792997706408,63.798740145292115,39.61726962088569,43.60209004218734,76.74320257639647,96.53773394463005,47.00876779198371,22.742759582825247,69.97528002284513,39.43658039094232,59.823780036273796,11.749963365678706,71.43432994033547,59.577739385654084,41.751530904705845,60.680216229330654,20.947837886445434,83.42168659131218,66.7723702285568,61.16210995364486,36.81336814786384,31.263837022408612,42.87220280352024,85.62490654378911,46.73738876293496,50.12367951059022,88.18067585082619,41.102430198904784,43.4549616325797,38.34437454583018,85.10920032545359,56.557874149533134,63.40479939425344,17.106213780579445,92.56528777463146,72.95237233341389,38.87716307483049,77.8390645724907,37.45477338008497,53.79471776380527,64.91998608228282,4.6144565181247765,80.4197135595308,21.693209900127414,37.53971168794291,73.61949501831515,18.85843825299455,25.24024349508705,15.419520934176735,85.438015679829,52.83595112732908,57.698154145746294,86.0595688251647,93.02789421132644,60.06362517148378,14.956307410950762,84.4465400705158,89.38106706634967,17.089060765323193,71.08734556179576,42.21945204784298,83.5173946874111,53.1856676502109,24.54845180840408,94.92503995062916,48.02756345303554,75.39966883154267,54.87716882185764,60.414842408687065,55.14180402655203,33.55981864505481,50.66331603540977,92.27647119830394,19.894953462221615,50.75584765706803,74.71868925457495,77.8466770843284,61.44429012617498,98.63917293964855,35.269480415165575,31.200374357152896,25.61183582947997,28.58234609934019,23.646937973971994,53.905648200802204,15.482925270564522,48.13670841524999,22.60584298358603,66.46536695218163,26.862191294540622,28.932759410154777,49.66249274951258,27.42866927665998,52.62604850202149,45.721040841532115,45.19789027676291,36.06616416695725,74.80676482206134,17.43258357902889,79.61265048877009,71.55890328292297,72.04587710867273,71.87194921452542,19.25942009374477,71.2522202241891,42.29134987392182,23.170110721457387,17.704103640058143,25.725608101774313,84.30700254393416,57.068390959724496,15.589658023461261,67.8755898159069,29.41782463277316,72.56333286275652,24.112502633533424,8.566394994493841,70.73111240194869,46.01014273228797,89.74160470102301,77.94804787236879,51.37550978547799,24.378324280764776,37.1799277160996,52.49194912295292,24.236119431055325,70.7085693872526,33.328123341662575,11.740453723738074,67.63150967450547,81.19238310380896,29.52425572894912,74.57410532696308,78.6960977197935,15.630125322576802,14.947332841226558,54.74466980895953,58.85880038378464,41.388372836596986,59.71332816208873,48.00899967059234,69.02644000419704,59.67632650494504,42.31198613810357,12.9252990487229,76.26269963934809,46.48916117242746,56.800336104221124,36.958274263423476,39.18946649912685,52.49504018596781,83.98937615876231,50.02482141927891,16.787190606578495,65.78702136680164,51.55945786160891,28.269019604984145,73.09922032914508,67.49297106587665,3.023565202408678,74.03116061061479,34.30795668696624,29.354374065101936,42.239722042598,68.64180293223103,80.69683748765314,68.44484204077104,29.03814038121826,29.508145304454537,74.44108391046673,19.871022884020057,74.08520103765164,75.31954087498349,79.6807417127596,21.87598311679388,67.56175735145004,60.65062617607899,9.005962777318445,23.362475624319977,66.63948027862378,76.29793677514809,86.3203767682358,29.944601835613366,52.53774967164514,22.98619938133796,38.92076622951574,37.39803996494242,72.54749954665316,19.7018800238042,71.9369832709254,71.792136163857,58.931419375712416,17.37899153872021,53.92791399227477,93.91737337130763],"a":[5.775577325690615,15.916097286517804,4.7587467282505225,11.010783267613022,9.13383946454295,4.8994547962631385,16.117661816694834,16.293837127820055,17.147223986401876,15.703974185992063,18.27066988467815,5.869619938984703,17.942160109309718,6.810240662186127,13.564679703663668,12.902663828977982,12.673309484831567,8.861344520602987,2.2360586715279496,13.99172032081597,19.14063312353392,14.552593356014846,13.28661511324158,17.51826635441165,2.1711256209924734,18.424136939063608,5.610348744138909,19.131402752376022,10.663314716225214,18.987270989215492,3.3089780248018474,18.674022561205366,0.021788423545148206,18.27241487924072,1.863956675997942,5.291096445861263,2.5961524510935696,11.243293269990025,8.270809853608498,4.914419236698135,17.71164219366565,8.572942230322798,9.276667800117924,2.11667332524204,9.776941797675654,16.58228343417474,2.4723079775374224,14.751269963635858,8.186602084880604,7.239355385889548,3.189048802136414,17.632160627881014,10.035705013551194,17.9237038937001,4.468898190103174,8.273477672252492,2.5584533555222633,2.8509817610881916,0.9177312852387853,15.275980980690424,5.181122258235278,12.492123483864406,1.1481971413051362,4.122105648930958,9.859518515191574,0.2492125287266589,4.750096931295094,1.569483359892594,1.123435866501814,6.160202733201636,16.777000647215615,3.6880184755539736,5.363851447401382,14.607312237596117,6.899796726526866,14.809635154247648,5.698016954065164,4.1141884103966,10.46739075679287,14.42469515054218,16.54836004189614,15.700137083317172,19.65944709595638,18.29062605135919,11.093302612883505,18.8088990612258,15.832383579308956,9.205308153474432,5.234898799598886,16.282914503162647,8.664390806518693,15.14207582344401,12.76374235766327,13.49258821980888,1.2115699466557484,15.909265825666466,16.09804064805486,0.45312918162368376,3.9071035090185235,15.472666993831027,4.407832592922847,18.61641992467854,12.932753788105371,14.35174250228342,3.3852572996911867,0.4218295111776138,1.9578317536607681,1.7660850930691163,7.87956488212346,6.348286111534938,12.447468210429404,18.326184557622135,4.582093627857757,13.319234359150274,17.619290537075706,18.4841388463635,3.8996397452393516,11.306116348912045,19.271537022300407,4.470270691559093,17.023977768032207,17.505199010722663,4.123076202737144,10.965845681681108,13.7045634784901,11.276642076073987,14.99534697355045,1.5323997477909534,11.479220510406961,17.2071541821539,5.320649273024602,9.411556504233708,10.916369111491854,15.426912654081729,0.7394835779058218,10.759507975213754,1.9047030322799863,5.23463337318081,10.933376123997673,19.73913427884996,0.7114586811571755,13.649393911102571,6.0801011474706135,8.340242844589465,4.049189485070346,11.587090206083865,9.36942344428369,11.88677231742954,0.7761630573274747,9.569182542236515,18.26540206794406,9.53674607948325,15.74589078627385,18.138445705052497,4.800274202235455,4.321714873726994,14.460866300086668,1.9120907091379546,15.775261650883108,18.937079570247253,10.875935023255323,15.780973211810409,15.031459605907,16.720652468932524,9.79588767598392,7.619523454172703,15.692161345568634,4.431122850695455,3.790688867187444,12.06721847715238,10.687751594694518,15.95996395985701,9.008004528062038,2.1270568336250273,1.2904711509671518,3.3128511903866054,1.4096234193468726,6.370532406026843,17.58028787964384,14.296069349879751,5.0710630603013085,10.78847801991223,10.443919489059521,17.582356101911817,14.37814462362686,11.28931247704935,7.314222985108891,0.8203452206095063,12.407554707411329,8.034259170344967,10.074607047292137,1.611429843918013,2.039232184708455,18.857476946818426,19.024023012985797,14.203762357818324,3.0750449758512,0.7438238453753998,7.172399146115813,10.056394294450289,19.926668870179842,3.2713159972104666,3.5141717899759772,2.6128487094450215,8.92949676499299,13.369322931289535,8.929905123192153,2.145531133048717,12.581455695415414,0.6152549565595411,0.7145599281038217,18.967007306159736,11.84101724139036,16.1908150040653,2.0157820268807525,12.587126429997625,4.149038087100991,0.0045271253584378,2.5347596334736755,11.82407243492178,9.849891238556218,12.25036197935796,13.01195973774329,15.133892276870945,13.42284025082428,6.008002676518296,4.655399996600349,0.741398630250516,6.425989594441459,2.0146714792729803,0.8006799658000752,3.269271513663261,1.3003076664400615,14.56753898050958,10.247235799146628,17.290722754383015,19.06934137325561,18.265091549943016,3.802177091099801,7.499321485997061,14.67824117552643,6.790674073060949,4.622528198294487,7.49170529847218,13.651926281315774,15.640998237995003,6.780033681867561,12.732946637641644,3.6272989010414847,17.62180245770587,9.710674284277921,19.114438946141785,10.722482894906626,1.4075754816991548,12.805585549119801,19.68132169837237,10.399379750585375,14.122815966050318,12.929303907709002,2.0882427131198122,17.151501459002098,16.012344703151463,19.376724256829334,18.729994709174797,10.074728087541276,6.535105619203558,14.07932457992704,11.69200333611041,13.553200662271149,6.762714460750434,12.910068505297808,5.361604828878823,1.9938303065825247,7.529961075236038,0.3622994777193034,7.638779708093053,9.163527694361173,19.865535196717925,5.815173740928681,1.7683068545118008,11.649881836573837,5.99132743964399,3.846808961730166,4.129929668524275,3.463182975538457,15.092134073898604,9.675573226408769,19.084927650721998,10.703967718969679,17.675702285974104,9.199774478029305,14.79023194289066,16.621165300966247,9.717186310722145,6.647230067843144,11.128191079808758,7.3008791914509175,19.677399484375428,3.4079830643801223,6.846551383257178,14.73877387847474,6.254206182949997,4.131092330476078,3.3386671108783217,12.84546222474393,14.117735541624183,17.75565466975653,6.996807408014596,5.398247924609771,14.854358280502819,5.538111578186946,18.779189122583343,14.853500147459613,2.922952565456214,3.388782131976096,11.669516463723578,16.34790166706686,19.545260238981367,14.402734887071986,5.039182011787728,8.59821232118045,16.236729721129315,9.810139599742884,8.579494254450015,6.448208695035902,10.322665823655836,9.702538147508172,17.48306004225384,13.415220810460848,9.163250781943058,7.387937385876144,17.898886042069407,14.475806883859391,2.3568168024801484,14.938274742038304,17.19503509178751,0.9191472445044679,11.356502251254334,5.718245474034402,8.318031452608095,10.100740323594533,10.88515029689733,8.89059977110119,19.99901450268716,11.430835155898503,11.506911586698042,14.120444925247329,14.361206246069674,7.043012648797782,6.4768490738055595,9.003026637374933,9.751727385394595,6.318908993323333,6.342158722854467,17.38639328684102,7.136741709251333,6.994163927736379,3.1849968298167575,5.525626364593803,11.133788339104655,16.592009876581354,0.17074596149861065,17.705705232475356,9.686889297925205,12.443028065768775,0.08960352253160053,1.53494945639852,7.730982759735481,2.2481792106746923,9.643515895215312,0.4953445688982816,18.37829023973039,17.486763925040055,15.85814395315225,16.167196588731613,7.21344296727942,15.499846325656858,9.346117873905907,0.399874485223064,15.960583896094814,5.977550979470232,19.770319773580262,1.657093261101097,1.3959877763013884,13.266421053001164,7.729101077759037,16.374930051480643,15.300324693679173,12.562760310758069,15.751342360031444,3.5234465244241475,19.88185568034371,8.026600596059854,16.888623789014364,1.5465995065232185,7.647273408730859,2.6298342993822077,1.0436362979359437,19.14995343628074,15.089216342372778,1.5589585762597746,10.636238150182837,17.31114841412328,11.896827008615446,3.2805775728877418,12.157820064380939,0.2457851556301094,14.816800844500332,13.013955556717566,18.158679519584126,10.123871176524277,18.53892026492722,5.751864293134581,9.870614105473742,7.087094575005559,13.314660707570468,17.183130109635506,7.86013039726452,16.26973027588539,2.835454769792034,4.124884719595152,5.064178508620212,14.714440065102604,5.066832472052369,17.43120644254431,18.5645787246037,14.193916521532195,11.902034514819025,7.224732298828229,15.589060788032508,13.380567315696839,8.08066884858231,18.255997842065778,12.34845453055891,14.275815854411004,7.107088949137879,6.11869390820869,13.303453636624818,14.998521491476676,18.1865433680807,19.16139725106561,17.254466206977558,0.2186170869278703,9.944276230574438,13.829179144393988,3.7592013967558735,16.487550325003095,7.434095776184506,18.920836037853164,7.516041481542954,16.8476651643568,6.854270376322358,8.738469952557866,19.444956565140966,9.641973583198787,7.182021747585963,19.29743052468027,9.12680106961028,5.862824070436465,3.250197865944471,15.599680696948646,0.7307065393124335,18.579373109963697,1.9793080969400734,13.484722765141246,13.201180363593611,2.566895190105245,16.02243126895744,6.279290963135269,2.843730765952479,13.896812143182796,10.506737734206135,9.44068121043844,5.733158530410272,1.4005296900600017,4.2235293804193175,11.254923640002419,5.72917217722126,1.2390623376445475,19.535425099897786,16.394445899713666,0.9818831281967455,11.538834323909054,0.5341858172392877,7.847342351892048,19.12829604543507,1.663563894087532,12.616601247928667,7.3727176899393365,5.325819312447289,12.769544037346625,2.497355307973965,9.385328585564325,8.11730839592807,1.9232398074949986,8.290670857066868,6.548126485932704,7.521541084683507,15.568090797841716,1.8909778179116232,9.350228114597328,15.048943090113776,15.646128817482182,7.555684332585919,2.090230272692608,14.298756695633447,3.609641585847241,0.890846744324425,4.8438875026847805,6.157395775170595,13.952951684267138,16.822606860561173,6.974328267316103,13.620155452724955,1.3596802142299236,11.499322232706906,19.340665119395904,11.061432466588453,6.692858942140969,9.707711293783724,12.04175458520476,18.069624174812834,13.10489541505746,2.2034690095742127,16.555061658064982,1.2948164461250666,16.053018788274024,16.795566257510064,9.462108463695156,12.38559653078327,3.0356046447190854,18.60161958230104,16.483673396442047,19.772971273598653,1.2107857898293695,4.025782676875673,2.371908970933565,11.79017362893427,13.743784552559791,16.971479848779314,7.6807671887210915,6.346063450104347,4.999425188720137,3.1782817674015362,13.767583013993141,17.89094579360541,15.499194234915766,0.9955670351770607,12.379762500814575,8.29892156741112,5.961190451462284,8.275769337411095,8.303115485599184,13.33595941249377,9.711014533187466,12.446651525471385,9.50833659378867,13.093549124167293,5.546405503306646,18.67487356288493,6.722316645430215,9.639128719074975,13.848934797276309,19.217176406954426,11.266325831622117,15.496003897809194,6.8044807315626565,10.235930217765915,1.2405188024723124,5.993532043852241,15.485323078210062,14.569602410211878,18.28987868860259,17.13871643458333,18.99511999581221,4.6362842734945175,15.606922156153239,18.416005046933762,0.8785006065662948,2.0320383065147807,13.712831238250992,16.765904487781444,7.055942483996782,6.752091756584977,16.759298473026604,0.7044924261634611,19.44222374968655,18.300899298282317,16.415630132028568,2.038268215304049,16.816499082708628,4.426633391857222,4.140406243929342,17.579537993866396,3.7519178424076705,16.400177270104024,19.936669262195146,3.347384008340719,12.711415274722944,6.239698118066466,15.99915428263872,3.9717394547708906,11.418276492794902,8.712665051135723,15.0954084650782,18.69066935160502,8.64300839178803,7.292683152390009,18.26787952118391,1.272150417522404,10.46189071022705,19.362719050820274,15.654500573249654,13.986937163690808,9.316629743585917,10.56507565518347,12.740916043672069,9.429005598922515,3.6775225191392336,3.0775518269664603,5.020345349860809,16.990164277369765,19.518770624492383,4.671531501044859,14.91967821523076,5.468015525049488,2.667153617734428,14.274676058813158,12.809454527690276,4.868385264370292,19.651735597748043,6.270119267734646,10.934462363540987,7.193338419504647,5.226256776413054,2.4325921599729172,18.154086576279575,19.632571949280234,12.405226383962162,11.929274985096159,16.569127860600638,13.217011213306398,10.263906748784688,19.266023428241983,16.38126289722457,1.267073053304082,15.363697984788987,12.81396716622666,15.35338706043117,9.83727481715217,0.7131760106544771,11.894241461113552,18.59266032513762,15.149689989164399,11.932221805917953,17.62869230044013,17.26174346686348,14.042647076614067,9.314905991135252,6.549083358931105,19.578667835654414,4.469318257423045,9.441421415520583,19.586017614263852,8.776847912096986,11.449833680345836,1.595725187172552,3.39664397149281,17.76838238889493,9.432576630361114,6.1282486450414675,15.6058523294237,12.443857309215062,3.5191432622366126,0.48859422313876966,15.793829639912751,12.05129680708087,15.524186005826476,18.695101405928817,8.991854422583131,2.4698810354552503,4.87793067403572,11.005322393224827,16.528178743944707,6.679052078148331,9.963237814219639,12.22037843632101,0.30669720670843503,4.247927553515782,6.99716412635448,10.27749294571246,1.0950920382398843,13.527865796258904,17.827008481951545,14.882013291291184,6.564725015653319,7.64448667120142,4.146837093807325,1.8541023253035815,2.4199136153965606,14.475998741753022,17.008394861319204,11.373527564309263,12.7727856840787,14.389731523857169,0.8069735735703576,12.112828924145731,1.2598824313413548,16.4942496507148,4.4373625328204325,13.447035492317042,10.867978307980417,2.4301058577449197,0.3219878309387125,13.152026076079446,17.45253569405112,16.51573753513887,19.46517268668048,9.309676856470546,14.07056025352392,17.943181520715278,19.71215643608502,14.520940986549537,9.562311766692972,7.84855607200051,0.41445223723461044,1.9826790224148017,14.217470190241247,16.4054021317228,3.4253636074492277,0.6935913102883751,12.519721854387411,5.714535506998937,13.491728993067213,9.34110413877474,18.126894504289915,8.97105397358188,3.450092446215769,5.7692410583279985,16.232712490519546,9.472334595597411,9.005368855120253,18.299481962663258,11.220698197941022,1.9057205388779996,19.62095634081956,7.012618445297534,4.339153688897244,10.855332590199055,6.739118363480001,19.557809842939452,13.920041738972188,9.209958258573948,18.524867982281638,4.637886092369898,12.971745775445038,19.38971503383458,13.87525117157519,13.805058857585614,1.3110493856236172,11.222727839253537,18.774605395299968,4.6111127081419045,1.3273381624595881,18.12544131142266,17.510058550655696,9.511158660356012,9.878916546994517,11.35677914076954,6.766749599875093,1.0044314397448417,7.119059221689672,4.117898331267269,8.86824338849559,15.742865474027754,19.80307273524653,14.270734441924686,0.4862854284475926,4.357779814008458,7.571162108088436,6.265732598470146,14.66700263262437,1.3846653541732135,10.583767979525485,5.632853903299835,15.124389364681825,4.407029290208109,7.253445064149364,5.98930093461461,12.647023563441572,7.748143855331966,14.222593717228902,16.17779246952722,10.551721738556733,4.362359438390486,11.023084762956682,15.708223225164012,11.95974585208743,13.601362314701099,14.461158512526406,14.154311723603378,6.546460842354573,8.49063747043473,8.245945273392831,12.217633137270134,4.973360846850414,0.9047403791142772,0.20628622328167978,5.6909141688423714,19.975914997936464,17.07453692487683,15.398841191345731,19.551440187222262,10.063337128469861,12.46045595707403,5.804193948101988,2.3053149307157206,7.720027733594703,9.097772473829181,3.4365997393625936,6.818613251250327,12.51189287733736,15.627169423390903,7.552976505369764,3.4514055514587794,16.056500502297965,15.601098779709211,15.525290477641406,12.271579603068442,6.945310989418991,5.708699228768466,11.019674977963753,13.286058182754976,1.8764440487579082,2.8241214946752535,14.120533859154634,11.955640730797942,9.90942586262432,7.655368737339865,16.06639943625213,6.496496584839755,11.197171424325735,17.11579496803604,9.921549793357087,12.908950773189964,6.851453647433625,2.013848103740785,9.7449003954836,1.7890540436599922,8.744375586603761,16.491956171753216,17.80598065490187,11.776922774413162,1.0665035242982013,16.56807173301518,1.889550021156774,9.614377394842242,9.442096302914734,16.16882139213956,6.172600151391636,1.5415218992602586,12.718973205536113,14.380559146845746,1.357738757466156,8.896853382677584,10.395236675385924,4.1639724679702095,16.52327000595688,9.529703621283137,19.191913475951722,17.31289683183052,8.787026829050838,7.60957045520982,18.19323398505256,3.677149198591678,1.6597041800221968,6.755442822369595,17.39765753521636,8.10243875124312,3.6513756402191033,8.462867798874436,13.38617065746777,19.75836947109198,19.050462376757018,18.805541023097206,10.718740668636162,14.825265352282845,9.170678642258242,17.24906949965955,15.795160529702411,3.838461395162107,14.21440227101268,5.285943684872598,14.8208604362924,4.753464453981779,3.3428186922405656,4.105562931657598,18.387171550521547,5.545744967098218,12.167035657866595,10.383733705993698,12.227260345069638,2.2387311948948874,15.666041719665177,7.474779505252078,4.7262309901802135,17.693317205776253,2.253239765701629,14.617061973593849,4.535302726210952,11.196268642893381,18.650573137822924,5.140878313219468,14.46017966040066,14.271346580500936,7.751797699059799,3.1215790466274917,10.237521119739451,6.199435023158744,8.966861043086286,6.266476062531963,4.847250022040455,3.15756561424251,12.465107652746262,14.933964757914367,14.85928062244852,17.76945945516628,17.184383566597674,16.950235447138276,0.5072130507199857,7.934869530944848,7.8700157842868235,19.903668124918227,3.8445815967853525,17.106333866105704,6.498124844281348,11.156313729601703,1.7852259933042092,5.109870099939511,5.5580445144941315,10.52416801123234,9.900085748814075,7.269069359535196,11.285536338879002,11.201907615891088,15.32512617942833,7.991978377800781,16.65906317511461,1.962094188987824,3.3096709159254356,15.627905703781027,6.883783600665017,7.54423607509171,11.337946491507708,2.4121040903575697,15.462365265850444,18.180272903001736,17.132151088768705,16.557574532717485,10.469500703827507,17.28980705082912,7.72920353429253,18.934805099065123,13.58712990551384,0.026111721487298567,16.297093286837928,6.931671046500947,14.182602324676479,9.498563719106192,12.178201544049339,15.708223881900402,5.5027753832273385,5.00611746688477,11.92905804199517,1.8471976338143437,4.891612172828443,2.597596705925511,12.589929396967037,2.3463172493998874,16.96844134499449,12.371997237848236,9.334779287978758,8.057317901271187,14.978464245189361,16.18201044812288,4.761676377375643,8.09761441789329,8.536728228476523,6.044231755614127,15.846381998083325,14.384607316382798,4.2966202518512375,15.844594631003828,10.769647476558543,10.488388169949282,1.234323862717348,16.692600099677428,8.42619212295078,15.804313373708045,19.546068304034755]}

},{}],53:[function(require,module,exports){
module.exports={"expected":[0.0,1.0,0.0,0.0,1.0,1.0,1.0,0.6561888497822672,1.0,1.0,1.0,0.3162141935403693,0.2262415568821441,1.0,1.0,1.0,1.0,0.0,0.7601203559058469,1.0,1.0,1.0,1.0,0.0,1.0,1.0,1.0,1.0,0.0,1.0,0.0,0.42896636854805387,0.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,0.6312070884538484,0.0,1.0,1.0,1.0,1.0,0.40234922338997753,1.0,1.0,0.5280388946998151,0.0,1.0,1.0,1.0,0.0,1.0,1.0,0.6497465595778066,1.0,1.0,0.5890075710197412,1.0,1.0,1.0,0.7870437807461689,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,0.46675090904829686,1.0,1.0,0.7708130672848582,1.0,1.0,1.0,0.0,1.0,0.44943097286825767,1.0,0.1386956438089132,1.0,1.0,0.9278380636057331,0.5583704928673298,1.0,1.0,1.0,0.40285749400394905,0.0,1.0,1.0,0.8080131816294036,1.0,0.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,0.8169918638101041,1.0,1.0,1.0,1.0,0.5975595413850643,0.48500044315556085,0.0,1.0,1.0,0.0,1.0,0.43724696742334673,1.0,1.0,1.0,1.0,0.0,1.0,1.0,1.0,0.0,1.0,1.0,0.7073737071418844,1.0,1.0,1.0,1.0,0.8818038529797169,1.0,1.0,0.6267947199013388,1.0,0.0,1.0,0.0,1.0,1.0,1.0,1.0,1.0,0.8017544196157294,0.6707105756454178,0.4404617420276222,1.0,0.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,0.6210900053830215,1.0,1.0,1.0,1.0,0.0,0.5294511081654447,1.0,0.4250678893375653,1.0,1.0,1.0,0.7201880759166153,0.5602611325085343,1.0,0.2782824081202513,1.0,1.0,0.0,1.0,1.0,1.0,0.0,1.0,1.0,1.0,0.0,0.0,0.5796356187528827,1.0,1.0,1.0,1.0,0.7021697827212754,0.0,0.3819410623958672,1.0,1.0,0.5391117941563919,1.0,1.0,0.6570057535086267,1.0,1.0,1.0,1.0,1.0,0.4058388658623276,0.0,1.0,1.0,0.0,1.0,0.40815237298860507,1.0,1.0,1.0,1.0,1.0,0.48281905692201554,0.0,1.0,1.0,1.0,1.0,1.0,0.0,0.0,1.0,1.0,1.0,0.6102574837157284,1.0,1.0,1.0,1.0,0.434634784500286,1.0,0.0,0.40945302807261874,1.0,1.0,0.2664863591001537,1.0,0.0,0.7060339709745855,1.0,0.6907055359110148,0.21171696204746884,0.0,0.687829821448398,1.0,1.0,1.0,1.0,1.0,0.8958502954860106,0.4220033892858602,1.0,0.6174369197404004,0.13487044834553502,1.0,1.0,0.0,1.0,0.0,1.0,1.0,0.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,0.5199817007283146,1.0,1.0,1.0,0.0,1.0,0.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,0.7385006031054007,0.0,0.0,1.0,0.6969498752007119,1.0,0.7430456327528534,1.0,1.0,0.6470134852818306,1.0,0.3398986371382688,1.0,0.7069106836815353,0.78791098343341,1.0,0.47798301855127173,1.0,1.0,1.0,1.0,0.0,1.0,0.630914728029741,1.0,0.4895549290670358,0.1802481343956093,1.0,1.0,0.0,1.0,0.2257341285002788,1.0,0.4294751179542074,1.0,1.0,1.0,1.0,1.0,0.22309927863547516,1.0,1.0,0.7935258312870249,1.0,1.0,1.0,0.6358327937978115,1.0,1.0,0.8042926135385738,0.7475402886201803,1.0,1.0,0.16569569970174772,1.0,0.937966505756086,1.0,0.0,0.0,1.0,1.0,1.0,1.0,1.0,1.0,0.0,1.0,1.0,0.3050110996747502,0.5661167508567977,1.0,0.26123873235062617,0.2065419032529982,0.0,1.0,1.0,1.0,1.0,1.0,1.0,0.67311298916997,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,0.8129251267272692,0.0,1.0,1.0,0.0,1.0,1.0,1.0,1.0,0.7489553261476621,1.0,1.0,1.0,0.7030632557609714,1.0,0.6478184170733781,1.0,1.0,0.5382538461500591,1.0,0.05868878955500616,0.7628634972016866,1.0,1.0,0.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,0.5734264502829389,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,0.8239550559091747,1.0,1.0,1.0,1.0,0.9152219993548876,1.0,1.0,0.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,0.0,1.0,1.0,0.17743357113171626,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,0.6933509194558506,0.7138515482786997,1.0,1.0,1.0,1.0,1.0,0.2106252989423898,1.0,1.0,0.07378352306813482,0.49765132916440613,1.0,0.0,0.2674853371182699,1.0,1.0,0.15651582929013097,0.0,0.0,0.0,0.3294757497134203,1.0,1.0,1.0,0.0,1.0,1.0,0.0,0.7392381643049446,1.0,1.0,0.0,1.0,0.5136510861110956,0.40607182647040485,1.0,0.0,0.12462296333715386,1.0,1.0,1.0,1.0,1.0,1.0,0.3456527880768011,1.0,1.0,0.0,1.0,0.39405883885653525,1.0,1.0,1.0,1.0,1.0,0.0,0.5450766533478337,1.0,1.0,1.0,0.43171181368653083,1.0,0.0,1.0,1.0,0.0,1.0,1.0,1.0,1.0,0.0,1.0,1.0,1.0,0.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,0.0,0.862439440308716,0.6143834142484601,1.0,1.0,0.5169719207646619,1.0,1.0,1.0,1.0,0.5785249265784173,0.41208592934204014,1.0,1.0,0.5141217837372383,0.7661104333930023,1.0,1.0,0.6438840144026763,1.0,0.0,1.0,1.0,1.0,1.0,0.3078776985955556,1.0,1.0,1.0,1.0,0.45460484312556165,1.0,0.10922939682051898,1.0,0.7778290329847957,0.4008450320510648,0.0,1.0,0.3195692743209512,1.0,0.6528914095398828,0.0,0.7261393755364226,0.0,1.0,0.0,1.0,1.0,1.0,0.3436087136604225,0.0,1.0,1.0,1.0,1.0,0.5493778526935241,1.0,1.0,1.0,0.5797150596297582,1.0,0.6742131959239956,0.5930605089408737,1.0,1.0,1.0,1.0,1.0,1.0,1.0,0.0,0.5481903074495527,1.0,1.0,1.0,0.0,1.0,1.0,0.6082750278081654,0.21563280700844292,0.3854804237627996,1.0,1.0,1.0,1.0,1.0,1.0,0.4916706864761858,1.0,1.0,1.0,1.0,1.0,0.6532494426376912,0.7920045165373264,1.0,1.0,1.0,1.0,1.0,1.0,1.0,0.0,0.7969618664977247,0.0,0.1571258037374161,1.0,0.27236780211654815,1.0,1.0,1.0,0.13364715313934367,1.0,1.0,0.0,0.4185321486145599,0.332364444120964,0.0,0.17756361127983078,0.4356719436687839,1.0,0.7521084272124616,0.30702272977358275,1.0,1.0,1.0,1.0,1.0,1.0,1.0,0.5016442459663545,1.0,0.0,0.1552331056696604,1.0,1.0,1.0,1.0,1.0,1.0,0.09431957113785738,1.0,0.6796168438755144,1.0,0.515266742898737,1.0,1.0,1.0,0.5745161752266303,1.0,0.2495544574793162,0.2404767622437415,1.0,0.0,0.0,1.0,0.0,1.0,1.0,1.0,0.0,0.0,0.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,0.17826579782459095,1.0,0.3839948538106207,0.0,0.0,0.0,0.6382192829366361,1.0,1.0,1.0,1.0,1.0,0.0,1.0,0.4653490827164342,1.0,0.888856628914087,0.0,1.0,1.0,1.0,0.0,1.0,1.0,0.0,1.0,0.0,1.0,0.6685158740267303,0.7109292373032937,1.0,0.0,1.0,1.0,0.0,1.0,1.0,1.0,0.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,0.0,1.0,1.0,0.8116269425144028,1.0,0.3492722348661607,1.0,1.0,1.0,1.0,0.7274559419776466,1.0,1.0,1.0,1.0,0.22752070259227603,1.0,1.0,1.0,1.0,1.0,0.510991203049822,1.0,1.0,1.0,1.0,1.0,1.0,1.0,0.586598491862736,1.0,1.0,1.0,0.6734394309210475,0.4183887183297845,1.0,0.0,0.0,0.06928815642142555,1.0,0.4439343042345045,1.0,1.0,0.643833479372797,1.0,0.0,1.0,0.42572270092144304,0.0,0.30636886494491244,1.0,0.0,1.0,1.0,1.0,1.0,1.0,0.8308753397790676,0.36569772151172575,0.8685048866177019,1.0,1.0,1.0,0.7255181342571081,0.0,1.0,1.0,1.0,1.0,1.0,0.5519447980217425,1.0,1.0,0.0,1.0,1.0,1.0,0.7908074534777085,1.0,1.0,1.0,1.0,1.0,0.5558785400839521,1.0,0.0,1.0,1.0,1.0,1.0,0.4517879432509997,1.0,0.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,0.0,1.0,0.6228650502334604,1.0,0.4366489329950278,1.0,0.6929656039055668,1.0,1.0,1.0,0.6075963407189561,0.27547099771816264,1.0,1.0,1.0,1.0,0.5189114970334979,1.0,1.0,1.0,0.4695346485340496,1.0,1.0,1.0,1.0,1.0,1.0,0.0,1.0,1.0,1.0,1.0,1.0,1.0,0.5967366523340917,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,0.3127627541220889,1.0,0.839208600217546,0.3080356688120603,1.0,1.0,1.0,0.6944767706942312,1.0,1.0,0.0,1.0,0.0,1.0,1.0,1.0,0.0,1.0,1.0,1.0,0.0,1.0,1.0,1.0,0.47050994060550344,1.0,1.0,1.0,0.12016643400553603,1.0,0.284259127034436,0.0,1.0,1.0,1.0,0.2534156214877512,0.31858955372063913,0.20221332968658104,1.0,1.0,0.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,0.6185444268518402,1.0,0.5811235683921653,1.0,0.7641674496771674,0.7232716611966044,1.0,1.0,1.0,1.0,1.0,1.0,0.6158591148686,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0],"x":[6.099344160755149,83.19300622627989,13.454317065293587,5.084878339587773,70.85444772793277,35.96229984928063,76.24423372330216,41.691873949705396,70.26429993024925,90.46930539275068,75.40914193181469,18.462892056362822,16.751332746257376,91.640623518357,45.503684932084724,74.14039199221023,39.957692425269386,1.3461920009009587,24.780626333798118,63.4032130797153,38.204593096917904,66.42484380141931,79.74180478706376,12.71255325802565,54.79280508212088,35.53055433177781,63.110034389805094,48.7755670322267,1.1385352601151144,49.84617800492763,3.7141592949783364,15.054751452162973,8.357376542569451,73.82789104444237,93.79249483476148,71.88202334188394,46.75243176923794,51.89523768636057,59.588050364549574,32.67884683422477,18.97193051862942,27.029790224738015,10.644692712104554,97.54889218312739,41.753553233115646,81.56456452529856,84.46335502734456,29.993709720063233,42.3154366683288,49.98647793879387,28.575674620449163,2.0538300516427688,89.4426274982637,78.83288768386069,61.636634760136076,9.324444837112257,83.74745330034705,69.11123650113183,31.206187855721446,58.76121329133219,30.75311520832562,26.088397904787165,35.495926069216964,50.0977659391491,66.89984182901061,20.71560490587896,98.50889981264834,61.221423207211046,43.617799381934596,90.85973104132177,59.60496286360812,87.28522238620076,44.93054767042055,99.29454212542512,93.76519838675057,71.86653721678641,42.02117030375763,71.19100368852094,22.027448740806754,16.867405048268445,60.637699743537944,24.428581156009233,96.98139906853062,74.07892814185509,83.82290075168821,5.083026415629521,57.99630383672776,26.240977110018115,73.11586248370155,9.231128324362881,71.17275496625415,63.51059065466136,48.00401441106299,11.823007613352443,95.50175946945139,36.22339110571529,75.22682023333154,27.5271609461468,9.637999165331102,7.718175160241603,35.71100226398334,10.22325429206572,85.61774232568693,1.7502597393581398,52.67664318566598,65.85267708371441,87.10874806253375,90.26286935475704,81.80404295751704,21.22225865279659,20.148524891547282,84.80689531649857,35.96757781442228,55.1070707766163,84.42104900470129,61.234002179347335,59.73724807955485,23.830980860249728,12.89113623499012,2.8755905574028517,88.16941397761562,85.60760667476922,3.617569999628656,39.49934839278533,20.379509628598026,78.5285407696219,92.55276199094504,56.41343448004834,60.71769866458627,5.3211872823397455,65.14832202496916,7.1323544660412574,35.695437320771696,3.0620528972239214,63.02746038996041,51.56840527176243,38.13010904302292,98.90838023686241,9.829159928453945,98.70185820624383,55.99015198893691,38.49529658439419,44.58216341303911,89.47059741630419,32.77683276659271,71.4549557092029,13.66275985274159,99.56352531426727,2.4348147047031254,61.12477297853576,16.688814315496316,25.115208975649516,60.16101257905859,92.2273355121862,33.573529884041875,45.67140581611797,21.545404352103994,97.41025323274319,3.9787980248926935,55.66458872964486,37.42013363920604,73.36831865601442,32.18608075037332,96.29954618168885,67.59563641761927,63.31730880397155,27.29743530045534,93.32890350966758,50.68737606895623,77.07856717376853,91.96954698349487,1.895693382364172,17.674731586623228,94.9702674862455,16.65025319802176,76.36369414410125,88.84667810925136,10.096903448755846,22.169157331884936,33.50026338106096,42.018810300983134,5.721509376803513,83.78491214080783,72.84932302916344,8.359214535222792,82.1709231094429,98.30136391958393,91.22417303073252,17.450908032759017,72.4441212154895,81.509703772315,99.7716204200801,16.156997582280376,15.04223042397481,29.862379689190455,62.94877589993864,65.88183096303996,54.72703824844265,91.73324523440292,4.8782408486079065,14.02406360663775,16.644189459462332,53.38333344306179,38.54973287117866,24.073826549898534,54.12630645625751,18.434707212446288,16.510757386125196,70.70068096778618,65.46192860295874,40.20333508080021,61.90303574093663,56.187203177881194,24.050239305788935,8.361211099743816,84.10311569671795,42.44041930128808,2.1758821226849134,66.07782505638609,18.49839978907941,32.33305772887702,76.07310610084208,48.43833118548029,34.230737704622015,66.79278572111738,18.547389428922976,0.21913566298106257,58.68612578232675,86.97936859439714,79.935993223128,96.09703605658073,47.97904503316786,15.21202996504667,4.638928893941974,87.7274199550676,94.00514733588683,36.96488741003694,21.91018013803245,59.25826068422167,31.940641931752612,54.956165701140414,49.39899130575542,12.330770740325292,94.27388276804933,7.044943313292706,24.95507850570633,87.74167960223423,78.96300294105068,11.676797783526682,50.056876139263395,4.591663349124331,31.789185308022972,86.38465083501634,45.48856916746937,8.672472262501586,0.6306035755090811,25.56762817372189,86.74432308477272,52.85435246942824,82.83816253984948,60.87931876858048,64.43091928810003,38.16079551760567,11.071617223050989,51.523874764547514,20.061647014969463,18.104205966073582,99.20539949138481,68.56729545634195,8.023676082948539,56.5681961391695,9.737140415141532,92.28974015289964,31.374639463272548,0.5358334064159198,26.9808052924811,70.03638853705674,67.5046513819874,69.52315755235108,50.56903080188131,99.15701313139267,60.03171384238062,92.57722921818629,74.58526389066704,91.02109050530159,43.731859138002996,62.848396717721485,31.848252239271613,23.727061847784437,55.16940241139652,60.58006882325277,47.082681141223716,4.650174282704844,44.93274890596024,1.5015118005611283,40.82160744031707,82.10248545108647,96.81701733281022,76.75985064757857,52.65696107975295,65.49718797620221,39.198165132525766,90.57145617104578,63.093878597859245,96.53653575842075,43.54854755062458,62.07402848820822,59.89891869163684,11.457029183401147,15.024103209183547,2.217422076910691,46.1595817555857,24.2156518563041,84.01486779783274,35.32837190313074,59.0607056958343,54.01240726307146,29.380650354626336,52.53276140271392,17.96795155279327,76.53411514073956,30.35350764614155,46.43014804875396,58.40545219897171,25.96909497627049,63.13914518054664,84.58490287006998,96.45472362822125,58.09426487921263,0.29577959465851844,79.43736763879426,32.29121271440607,41.83684144062787,22.230434557704683,12.167674212040392,81.92301541446614,29.252654208615358,5.408382194543271,68.73154822318313,13.103905677145233,65.86236769641127,15.387013094614233,97.33321988211753,91.65016431299267,24.33651876252638,43.129039833556625,89.29349925072543,7.229536875560005,58.24645101871555,77.88864286376204,33.032715622533445,28.940137135254275,64.61811969361165,33.140859617263075,21.74316668987295,68.40372992894935,77.05403628037482,20.59331492713512,30.72257873059261,61.72133695173141,56.88410408157745,1.8957562802864425,58.13893658752094,25.451713433968102,70.42817536980512,1.5170882414297537,7.0759237457349355,70.39341060392515,82.227986028144,72.81519127941003,32.197489547203936,37.39664422055042,41.14651377487877,4.757642464149536,37.98130260767189,50.523635535432774,14.256369273129188,27.347829739867468,89.1851128323586,8.599385106779245,5.441038296763434,15.377318130409122,15.929830466489282,24.563878329991496,90.77830785855454,75.54071908098692,35.29122022709758,52.423384130800656,30.066561878747635,73.03338535388598,81.0628896244068,41.69861705557043,55.084378803895426,49.77713625625988,55.81488053721251,39.956427431367004,75.60806313332901,55.770357866026266,25.662412378829224,75.43639675200842,89.68845992279701,32.00579531966079,3.4136156771930715,81.8805085225382,57.0643792822457,2.9349057046771154,97.04300027040942,66.97717705817435,47.489984545633575,52.1610397849281,12.77189147378628,51.32326967936678,28.845917980148172,86.09855797414696,26.008395066971413,70.54989625471613,35.030053144446406,35.280525095862124,53.60048997800904,36.11511854123117,68.66639140179795,19.642377274479838,36.52245734508117,13.80403539266144,37.32373488927574,6.123493035010497,50.872028696016834,67.73750849337503,35.937950079264816,92.46712055391897,89.68909700405408,34.78921079479542,57.01505609175614,49.68352898924622,62.47073089542845,49.412777277614616,17.412518519957576,51.65396680279149,26.712470221379814,94.07551562679402,52.011647480152725,61.31601439860099,32.106280476753255,99.47804537943344,41.16423695590712,22.49200258382029,16.41312890846485,58.09646249690958,51.64200816539994,46.34491806549717,50.188915301351614,72.34805482997999,66.22440101521335,11.516632519490312,26.068482629430466,27.15208645913323,43.31326120125938,83.88252637877214,37.78260830737024,82.40014339925219,60.03297737600861,1.0481051419302778,68.18044749192048,36.95528874324203,8.002984323134687,96.19061982764296,36.557053260005624,49.96038085742121,65.36583086997807,86.50688347937789,53.67221934830504,92.64015537417191,47.42872648168104,75.5675500016078,61.511948327307394,32.460142913244574,42.42161964845516,65.78361463377007,52.03310042237837,53.84915813998141,60.26415708690247,41.20665460658639,4.6048781603529765,61.79689090516736,97.55983510631809,13.772133866380187,22.390512501034543,98.60816819511402,1.3748387726681077,20.880240455885012,54.078767558675665,61.48986008497464,16.095256348445176,3.2839748152714066,8.200419626481349,1.1812185212507265,11.397362993892024,86.8347218849969,40.10463155766348,69.4675021660861,15.518761047993346,73.0691036344981,74.24729863262536,6.968513688860711,41.94832428179536,68.79680064353563,67.9203592826259,12.769268026233792,67.93867521322554,37.91573781298106,25.455291772569154,32.960823236287126,12.461938558278064,15.583926481766852,31.95800400920803,77.03108379198402,44.88372723013625,26.82611925180116,93.36698239817925,24.468058814237615,14.268804639071941,46.115323401029286,60.38632149132175,1.2920301607056484,75.317750396054,16.660109668159695,64.63030519067621,80.0348229079533,94.725155180079,78.44284763101072,93.72666832706473,0.12054346742222943,36.293729509162475,57.70677357974285,77.41539257097887,59.6959938014926,19.246710659202005,99.85103108156513,10.99595476241828,71.95118625573961,79.50440219749683,9.135533077961199,97.59731397303932,94.93219253116942,61.28494679471097,95.67979714030885,1.787767575550503,47.504844286306366,47.049004685441176,81.66324624833838,12.547355449996989,71.74134618508236,84.6854736277488,99.59417842171203,22.8812171277186,62.9780278072015,24.024693979874613,66.59769467077139,32.6748973658987,48.37120395873819,22.031660283474565,3.517992195673725,34.171481136918814,23.468226337915567,92.15299753106983,34.92229325914842,18.94607391572074,52.3623695143979,91.8878167714282,71.70131285167547,82.51713526621415,26.29453480078794,23.99459053470889,26.32894074771157,61.6615675601448,24.52726341008924,20.426613062496358,77.26970196855434,97.03998630082373,43.2570511786615,79.42281823127266,5.42535319019104,42.28873012462844,63.657577132463004,44.66927195218753,84.25987513990583,19.536972153012556,90.18870928153626,93.68179509012246,93.44894475438275,56.06697888938097,16.890353544899583,41.41456601584168,18.189285437692337,45.193116058215146,42.42567570571008,24.681349746630787,4.304323682150835,64.84651643247352,20.646625033907284,74.38074854759967,35.905852754071546,6.391183829937175,47.800350820050454,17.02606297399305,85.20961839685037,13.774192912969152,38.21452539029793,35.13865638980735,79.96687499271738,24.658117495610576,6.365183745570269,62.465020070327235,88.11998479725895,40.211902330810425,59.74149772116482,27.153547753876772,80.48830215920742,33.392493034541545,60.42704493634776,32.49904644126431,85.28210678514883,34.4297649289528,40.87880590108692,45.628502456472944,36.195623927170395,41.38691581690561,55.94859516923856,52.86939546867207,47.4734026319386,38.13039748786995,10.397733410016464,12.466106984529768,91.76553895916126,36.32818251165138,67.30069869976877,1.497807802889306,82.78643053190684,89.81635012170939,25.170434294902332,10.650240796326127,23.64092805936,95.85407046400343,27.24904186951793,46.886119327843055,54.74990936932809,59.84763525662669,99.7405920273559,22.766962467321505,95.61721137101328,86.85080116029064,40.15717844512545,66.53013404807757,95.85899671522935,38.928117996738834,35.64174548302337,64.33114784362586,26.794052814120327,97.15620721557903,99.58585453422366,63.81536746959095,47.354512593963236,77.09396349966144,2.90570270476036,44.91038477727858,1.5688635229430314,9.428759866628301,69.06060417578229,5.5470045507946875,33.60149346056103,73.16873802111132,91.19438879589559,11.232146966733092,74.85285812789333,75.79318414445515,2.761047255812832,7.515835338647858,16.417003151322817,9.966320402797457,19.782825100156074,21.191969431261892,83.36740665903399,23.351806370721363,12.256058210585197,87.17367095094922,76.63947940512712,83.31036212683722,51.5823494536537,76.56991348405822,78.43821056369447,33.13924780041528,9.326579319610783,73.19424299056108,13.730660434229547,16.49491811775563,23.943113071590048,43.73524069528676,76.80397233473077,58.0397394348084,63.96215638641931,88.98596756858393,6.572416516221713,78.08743893703927,19.72255376100631,83.01110976135688,21.25742611825341,67.25217935668213,63.6847133898718,60.292030274711486,27.959038850106733,14.92080214077285,14.389797059895626,7.186164464472755,76.4393026233239,2.2212822366534324,1.353138274040555,60.509819718645595,11.139091279420189,46.63202557643211,24.00003735461671,63.13663460070398,17.207827374165152,5.26707491933085,4.067259428068293,72.43210889466182,36.097983406317134,83.4819044137115,66.4335922856889,83.59508274329286,53.136459625461605,31.631104085803518,50.248948834612776,36.340429743116445,55.996628812967984,82.70855970342555,17.213434897966252,30.167672651647813,11.513118787692566,4.586598444499623,6.455131152811289,8.677372523538128,32.1362823897281,28.510964909839885,99.15844790990351,54.261773934568815,92.89003677087561,62.11665320444406,2.1976499046133746,78.15819758045019,20.22469898554764,77.03079023820129,47.39579482724383,9.701206637152527,99.81510125388029,64.3854358738831,71.09825295410329,6.641284644753331,72.9469886272717,99.88257532542796,8.57926773710016,63.03567221413391,1.2678317228847824,64.25194359104674,14.12391387116616,48.7970849138627,90.00890330764351,5.031217279176703,57.21804008457507,87.95854992154297,13.650526755942739,30.839133220571124,90.11217739566584,38.15330376858972,2.64974316493527,59.22033921423599,31.2118937982953,44.4380212730576,76.58170892499518,75.10818279724816,46.63003519621858,95.7600410443076,8.85812692133856,46.69577304754875,79.21760438038234,26.95665042099349,64.35689240977224,17.287031400754515,74.06459592722572,90.57957532404855,58.12232465183656,83.82127540160592,51.771455727214466,37.910297306148436,70.99318499205202,34.226829796264454,73.78000678534804,19.661224603013473,87.07136956560551,46.46936549263512,26.091822557087884,56.435303140456305,33.31306485262937,21.738861290517164,59.68702336022291,54.05838295455461,91.45186128725109,90.66273482458067,66.61857979493162,66.90355082829504,51.29906927051913,38.50183928871873,20.976670981637824,98.95862804023461,26.44409668159744,29.021748285997152,17.482261563096557,47.61509370204629,9.622552776424588,9.753125913220417,19.65126143246312,50.905614000500044,13.064302536574179,79.52948755367568,53.604413713660115,44.52515748929724,69.84585387560813,8.961238876123968,97.00733293040827,26.854217675000115,2.9686880606459853,13.831135087074431,74.47958546557717,4.9015457161363685,90.17915866983208,94.15821137659775,62.91230483397814,67.74646488242774,87.05833308170234,41.740455804857966,24.750562521453666,31.00433914162444,80.94097358067049,84.97113258966702,34.41072242530099,20.793503008962034,8.524097358458693,21.691658440928798,45.13456234574809,49.625128519888385,45.84538157178988,52.25400492691239,24.72513053998766,81.21529807611535,68.21837059797681,1.5874918690960138,77.82265734340928,70.91566746360304,82.46348122437917,49.422001438471796,62.27851938919364,84.75306853208677,67.98050635775992,74.00807949445647,57.69985401438258,28.78805994388982,69.77590704993335,3.5586977305196443,60.78879646408948,61.14772167851803,48.31570970901182,69.41845265810677,15.034585386565169,37.592791137947046,10.023873659418147,69.37163344203385,41.81534955039026,64.15300590788932,61.657146215453416,69.68220014924513,45.080885108759716,96.65080892327387,59.29366456389813,72.59066347102174,63.48093380552029,91.40450716819835,3.9556755043540726,50.9231109534521,31.316802765459496,71.67370192258069,22.461169599735342,68.4723938948209,41.18301183124602,78.70598667374178,24.60212032221447,27.164234359766425,36.503955728433034,6.335827250031589,59.919590150167764,95.12349483895608,73.57149713849549,78.1700282148271,31.357324215621762,94.87344571738474,72.54434881131444,86.67684945532021,20.92173710548373,56.66416106424747,65.23469924456975,33.47090202085632,67.89633256840182,59.635580649135235,57.31308171401728,9.313548016174366,72.4403842497237,49.85720029035343,43.81976486915424,56.74204473956826,76.82519218286326,37.25120122891197,29.622456680128263,54.44161754393968,55.73501354337598,75.99505719861315,34.166697796932134,97.63289550632939,62.02897975854016,56.61808114788165,73.89272356161767,4.955267689041132,45.57755094061311,35.73247271889271,14.20908853068028,96.19316135556424,73.86120116824767,62.41236012089186,46.18085621330965,20.247087250134797,70.4202177188152,8.33785409432075,81.89393844930319,11.456779158806274,61.50120789602818,40.91813066096146,71.03572923711656,11.019732030907958,22.80270599744385,46.30711205929878,27.292124164302113,6.768958385443757,87.89443187283953,72.40242097959127,84.29710863128983,24.38830640005758,91.91363142880024,95.54079270915297,71.31718727552376,12.910929558105222,92.21708074972577,23.561256503496786,15.459907109039307,60.656378514938524,15.335981282676126,13.85581722180882,9.582102460023755,17.45730875124798,16.43606487496818,79.45352028082215,45.91738647151995,2.96626406025311,24.14244810946684,15.672669760948676,53.92688278617162,28.05618721295189,91.35188730782247,50.243635011872875,96.39725725070032,88.21182282513078,61.521177989981425,80.05820095628818,18.75649486802744,84.24284552081969,27.121784600384746,75.62050240687287,16.862459988920374,41.04902708693005,89.55166471476572,76.06402799077881,87.96004287045058,65.2805701270299,93.03400190473658,96.0735222798933,20.73808436955602,34.46692373699358,75.61737612287051,78.20893862984776,66.07973186851139,94.62538185356402,92.24730709955607,54.66518306445614,65.4139973290262],"b":[28.099277913368134,33.200831739589084,45.09016388002907,33.40367587514457,30.387289821035942,18.451120207338377,32.22627364098268,52.01483201309495,27.7576688614489,6.391936061189836,17.0028991802968,46.124620130898464,36.00470663800743,34.45436717464838,45.104958835213324,15.275213132389762,13.833289163205329,23.672030055520786,28.62588854529945,15.190314419379668,6.342710965504397,33.26807476720214,35.170317217429165,45.48803950685908,39.38051336276531,16.344656727525795,36.89578214393549,3.3654628070719905,43.06087430764852,41.923898509874036,30.651751405841328,29.306210946460514,34.01838785241705,44.45799761688241,30.542413663813907,33.661793636946726,22.997068308174498,7.923043592095076,25.888944556638307,24.967235506037415,12.838260898887794,36.987674062842466,49.435874766435965,45.44966648281529,17.574625386390487,25.899047911799684,25.9741383193416,51.68404705706682,26.62522856806747,44.06229885354897,46.20440593542391,43.84971591379622,50.81783941177416,43.22275882940734,21.946197892328314,35.51355672540763,20.607062584465993,42.99274731230223,40.179264494863574,33.23879607546114,27.053642543229586,34.20336072210484,22.078806675344357,23.819640363520097,48.99486741518906,23.104790865063258,32.98749383216405,38.236586912103405,20.714870522433166,21.03391542183231,15.949544973787582,24.68485358950293,23.08230301457432,33.954237294275025,20.390847392278765,33.93961805512178,20.249963847522142,7.369322337815607,37.81475103350597,7.25389542721858,28.1876519335015,26.550188702790503,11.815292119588943,25.527846654838804,36.060544080314756,28.08900112272678,26.86374264247373,42.58281917082625,18.33263536993838,33.473248009603,40.80615131272094,47.34916894381413,48.427887130511095,19.458574739414157,42.47436446454553,28.80641432106594,26.160645258821898,51.22258646643319,49.39047606075967,1.2983554848114265,21.036902382879724,10.750096715286507,20.734997349272582,43.31631972360157,37.00986553225471,33.42975187876648,33.76081780689364,26.209488293296126,34.160144920374215,7.745041298603819,12.223671428217923,35.57584527989283,38.32031951169649,16.664606255980505,41.8114131328777,31.23628543336958,41.372075268920184,31.635580302585023,24.02846703121585,27.015590780717368,30.153682004768314,20.094147317060568,43.318643222680166,9.529412903945813,30.4201721694014,43.38636708847805,25.739524782889482,27.66067113235672,40.10240340114454,22.423215827332974,38.79751809232707,2.335632164403223,4.855736147861074,51.99260495056413,46.48903236399662,26.195763144027037,43.14346081898917,27.28462280369075,4.014605274174503,22.493589617756548,47.227099535748046,39.420827041690536,24.736852202147517,45.562844921402515,38.87777398196572,32.39914127196041,53.70097976588261,51.14231069584395,21.168013414920765,25.64764931059756,16.293642325070014,18.596284174227428,49.18170225500866,42.85651090903589,35.51528186691911,54.26663668976105,32.77485917666061,33.30366359807258,25.18446286796438,46.28368466715522,22.394232158095555,20.439250666795353,14.896072560253529,9.036775841788408,23.154934295585647,10.363764501756446,36.083910477133536,22.78789253570355,46.07050826363228,25.362771509911155,26.605399626657103,35.78727003506378,28.8915057638969,40.37958905852689,33.63976691311179,30.345568451436236,27.158817064463374,7.400313888323198,26.799765564676115,49.608031841257954,26.87463765411144,21.214156947291016,36.45894505996871,37.2321175956728,25.719715650461712,38.502923958791904,18.586509630940824,16.59759223299462,20.136461423355,10.49448174885438,18.459881424934068,23.209086340527776,35.98620441624972,52.16340361420837,42.77768299209673,20.20842543157527,31.906740488391677,26.912211868534563,14.866463714536016,5.069325566652245,19.53647160039366,39.43755819923235,48.100691837289304,33.87529964143785,38.30773051077505,41.109990984705526,17.041727247410606,21.980488750546648,38.676977295059274,29.870660647367515,32.317000036689265,11.054170226210136,19.656875832344983,35.235745649235355,23.44509764436954,16.98692960787335,18.920442573196436,34.982391005536066,13.399501923210035,32.49136045494863,29.81408499122262,33.94638743766645,40.608782346053246,20.668508966314153,40.45367558765776,30.982802810755917,33.75712115330468,46.06507200336797,31.917571531242682,43.33799461639423,48.25611888471813,46.04375698326669,42.14307150103721,26.5586188219248,25.743651234810798,44.92794715626313,34.52831555161506,29.987148821907766,44.94201605143153,28.046007445481052,27.163828300512158,32.17464340317909,28.492078105260426,11.646145577974973,14.880935438897223,46.82608506017973,39.92079308586474,33.44840764235262,44.51694002427214,41.89706857541657,33.20332097348427,39.51523824331911,44.83103718591194,53.57288569741942,29.070794658944262,34.71108465353297,32.00182468930678,25.890879478745212,31.73954249703519,45.063340845096135,44.92659009746873,38.94265603691542,39.07330959334042,27.83609202683908,39.884510257848746,26.01469447594054,38.946784858573025,42.79958858049343,19.651311810730366,18.49727549702864,16.114248266922555,20.84851601483917,25.29809158837228,29.21713952649498,46.92080985756294,23.55508370891698,12.867057345968451,30.296248300945116,45.39831926890056,4.305598627823777,21.967609336479835,38.96824497574713,42.639226863009,35.301277234022805,6.0185311657381435,13.123462488356882,42.18845096506108,23.24014599357229,32.076587583723665,2.7078529497345682,16.800979477224274,44.50198657873881,26.591616480445424,42.70155724395363,35.20674704041997,37.03527548748403,57.14401652055135,3.709417981448553,36.12490892379179,44.45774991672415,12.646210843171373,31.899403827701306,48.761716191248915,29.038360267209523,56.70798598850895,42.011424179369016,35.709564313010404,39.30182903273941,13.25692913989422,37.36648521157421,21.783064196254838,6.595363545439064,26.79025079660579,25.617985026638955,38.90954546221863,13.590382077223312,35.311731579201364,38.01917746824473,9.384196881399923,36.09325334337329,42.68489147056485,34.84225444043491,50.42556129427334,53.737831796192665,45.94464991600396,15.298961253658558,48.20622819747987,39.160942701940535,36.8406865563737,9.946839542709029,20.101309545620303,41.24110720187771,12.84531688643237,41.622549506315735,46.75431328555724,20.672344252933218,17.52040617416369,39.3681111648758,26.91268858985434,39.665567231254215,9.40449065454426,37.98048627257522,35.26540798778751,8.697619864051793,23.699002197443022,11.891781489589421,21.7015578801022,24.01258604730695,45.448855119541264,24.91094916112167,35.611726041566605,12.745165888668154,35.15267188700031,23.050192022609846,30.63574117812305,35.220745855678565,24.488393178365467,22.08082471583645,34.64687043131974,14.816978872372829,51.158639376382965,26.14549436278409,15.773093998007376,25.541102732890092,45.77207300583652,26.776804315837403,52.69817983411899,38.72827191220192,34.913102647981376,5.821293106087362,30.16377502864204,36.65629586572759,34.30141199307313,21.512732065046208,25.58394102085703,14.126609274357355,39.29619920128604,40.55418081514212,11.798008096091417,39.71985137909051,31.279866213639718,45.64293800091214,12.5001790319955,5.256252505781802,38.7674957157126,30.17576332751351,11.018859864801168,13.555713521492713,39.61832524280471,35.42763376734598,37.777322857695346,34.93157417563354,22.517821953157075,40.97696265619204,26.67173446410276,26.406277872274472,26.4701608079293,51.956096072444446,21.483972010172337,41.45188452970993,47.787391246849,34.88534572062315,42.40192319236395,50.860649899032566,31.07634707624971,42.01963316087102,32.27296826136855,38.500039489369044,37.73581918788997,24.284797819601863,13.163308222135019,20.431710455132933,27.594493220421448,45.09888958841335,31.55153905389622,16.356654978607544,44.97618486433999,32.36863164820244,38.894232444264574,50.380982457587365,29.055149422204217,50.774947262689565,40.705577393330636,5.84310751873752,18.364313227445777,34.54209337311086,11.932485568767035,35.788342001590564,27.515276375685183,31.96144913689851,51.7787266740128,14.355645830342487,36.96060733407931,23.428260498598235,45.9083621932833,7.8761401291141375,24.916521455095456,12.5871658434209,16.38372731615416,19.018936584233742,40.39742928304545,34.21006442636386,29.59284879339449,34.716743451004476,17.541768571955565,24.14960219236985,12.522165044679605,27.084847480564942,45.267299354255535,31.786874895366804,50.75230332991549,34.074118073166154,13.456551064180529,20.237314881232138,13.754751739148908,26.044537132045487,24.918330262402634,42.83420594823918,24.95484018190808,50.7004243882478,38.705227840960546,22.21761005189053,24.515818028330482,25.059630599614742,24.07423970054419,52.6508420230326,34.737217739485104,16.081694580136407,55.944237179354886,11.36664921526883,27.13459827078023,55.34747398900974,20.236751518699347,49.40540705357192,28.828671823354384,40.998061027409186,48.887560553630024,44.81038572147889,8.209209660335155,18.242544549085213,51.7750552061559,11.644734724611801,26.357545751209802,26.588836109920784,20.594398202637215,47.11129717833681,39.07472350784428,22.721596911210153,31.618089082420987,26.67548966328578,17.439637335267054,25.99373311245389,24.808610047632797,11.103119017413189,17.922627006914198,24.176944696388702,35.864239245538485,52.48743225586524,36.415282967906634,21.292251509288967,37.42055761531016,20.691369784747657,45.44415450873152,22.349701023845903,47.5622097129174,22.533568410188852,29.315763033246228,30.841171099673062,38.55773996553994,54.868295372589365,41.15217381020867,19.727836828722943,49.085954913485324,47.27525627084495,12.426835223024598,19.15309578213563,15.021700110185972,4.402987224281372,18.490128701528313,12.65734110080436,19.26402744632595,29.561778546472844,22.075745112668397,11.474735081411218,23.081117629461062,30.861096289790723,13.802443234875286,55.529088800377345,25.48666541003317,37.3571326971308,7.390300957549125,28.788405835669536,49.5925764549183,47.10919759578971,33.952131819448,48.37041972421723,39.51113241632322,22.605079827321507,29.552346246604728,21.20919226615821,30.85845808542526,47.47774396423914,30.108080717601435,46.580226970794456,28.5235662161745,33.50969435563869,28.263366449355225,15.794775657330762,19.926851320334684,14.511869029394946,23.479669716635257,46.938004493967945,48.44008398033334,17.382784307027137,20.431037893980807,38.070206211773794,11.296725661703713,27.385450538229797,31.77017067022235,31.363742573670514,20.191128480851035,6.125679522793126,35.746506627676155,34.05917732286734,25.189489137008557,9.682355957815775,33.64397275364544,20.438678988584307,22.397705679109514,20.5101413670591,47.91408529127566,38.66569507779786,40.053926535257325,24.814226050731104,43.70866261142004,37.679251932325414,23.078100459207178,38.270028091923365,15.709409365418864,53.57131231663431,28.00758718543437,32.921397739326174,18.50155363209801,33.155698317844625,29.741432784691213,46.07844465785065,39.02729957198858,38.55349757172958,8.65926286092586,44.6782768683595,6.98484123854032,31.11525732658627,38.31009438518364,55.17831264605156,30.13671447496291,46.381749473125225,50.358548316205194,27.34974721979942,37.56601605155172,47.22882625448547,46.0253021944397,45.19801924129959,17.662053685343793,53.96010976514968,42.79010013879503,27.474853134353815,36.46512865804637,9.32074546013097,32.2546981318245,24.24034300267452,50.79692987517927,26.726550778458176,39.535102864617606,41.138834445767074,28.255789674223738,40.915063143313375,33.33789999919838,26.17833468927513,17.769681097776875,12.462826883795076,41.990408882927824,12.229940713305663,43.83218303651457,53.03774178603358,37.02282687357189,14.213370793668432,16.990141307943848,14.755203553268244,21.041330894916,34.07407202457621,29.16054561526189,13.464614092065016,20.573283221405912,34.3918641405212,26.846098893295476,22.80311758223689,17.08011242736667,24.02327067477717,32.899121379285276,35.51613778601178,40.803225473629915,42.2542101631702,43.85239031503876,21.223740326002556,12.820302488208815,5.765254311907739,31.210219622273424,41.436992028445346,31.607314434330547,37.93036812072757,4.740621745102822,38.76617453839397,27.651950920333142,44.147385540764205,48.391485707966034,39.40956553470581,22.695766200956662,18.604946083868676,36.57977622026681,29.04866520819053,22.877661073448714,26.036208399238223,30.0803812058065,35.173463685669994,47.63413047177015,51.22754848806608,22.37276142543925,32.92864660768379,21.252721420391964,24.43448425465884,36.56638180952332,37.069992617196924,25.63802647025517,26.752846465568815,49.653570198720246,9.102488559400044,19.820449831353923,42.08620561314787,27.377226861746593,48.98895737824542,40.21549261801438,50.93068386895494,26.07327659349772,36.05258177368219,14.020485665954197,48.95102192209703,23.76847560085414,42.0098863014789,34.64403587372544,47.140155513947036,28.563755051004627,16.87470906219547,29.649603720687146,23.113331500782625,46.79992779434995,15.562522824761981,32.76525332384303,47.38270760195236,34.53162104652803,27.805519556030553,43.21999762100683,36.87086573872751,36.06709146868129,24.240196486448845,12.114677504964376,35.619147982282335,48.34689776794259,40.548046349907445,33.412059495290244,39.19372120516298,5.073146432528133,36.77676158314506,29.908324886929563,34.576586914799,35.44397561614881,39.37056347066438,19.078293316812086,30.153125582585577,24.107221997424116,20.537552919308606,32.61754858614856,23.540642474195867,30.354558057732767,32.01646025039396,42.03859329322606,28.02630719977209,34.12937324741712,45.815133281218145,28.610273856170885,35.393130020959596,24.126451508895144,12.005687351716503,18.63545663324708,40.09792299345535,26.368911066134302,18.087931505111623,20.590259694317762,22.677511041467962,25.177143941869222,55.60821792151869,15.476263583957222,40.28668560240402,22.82911872033911,39.45006513678787,27.50392169398144,11.324937054753113,26.052233373333003,44.925060631268295,37.8599609190281,28.668794513601732,19.588316376291964,48.39238989482071,39.26668065406314,23.1928366258111,28.762078968359877,13.045068541898468,9.608294808684882,20.66134400749949,7.7163867628760485,21.639009891074544,25.441929423374557,46.50988063251851,47.234003912618086,15.834340663546964,56.150948427321126,23.81689637071515,37.80919576870927,7.9957768564887655,23.754929466675378,24.258002456347985,24.342012197850032,9.791050648831208,15.671210691854181,34.82960989281263,9.868815675564786,27.439040646642916,29.865965758213164,42.52633132021079,33.98620254751665,30.85181268909252,38.87144446128399,20.635518839726295,16.86843630425374,33.039903140075936,27.68345125574937,12.766769967554037,42.08801418342559,26.46267691915208,39.0493902193884,33.810389796390375,36.91613975013586,58.52169781979942,37.586635737762904,33.871910962963995,10.52120487741583,20.98402505671129,54.56966471268433,44.17287121832865,28.541004801003297,9.01021887979843,22.1266691299007,32.13587567473576,30.23538177969123,26.48708954992623,34.31177240186726,28.24179873389896,37.35524283368014,30.281011932057627,13.678136969483678,38.53083022650965,49.56305612651315,6.209800783493651,36.834218040078866,22.44436847451833,35.40242026456566,39.459681269731796,40.01246937036704,45.474505373483275,25.20051889309847,51.80319088180792,9.011810177606186,21.775007355850597,52.568208579147225,26.996520992816286,54.50271442612882,10.298065558808634,28.476128493085312,38.68347281633075,50.21693721188404,54.07932250391339,41.55414898042464,42.105587087413106,34.66507999173971,47.624651343465686,6.379064786606543,40.28039132039663,17.274523556061865,38.993054799011915,44.31617890314676,48.43966150087766,31.563916673358193,30.10056867560527,37.392878942391896,20.390351391984794,25.17540458193674,33.91840009723573,15.02288572024954,36.37859494754813,19.59543408627053,22.46916258956037,22.622569022392675,36.98329460710244,9.908412644891019,19.24392933711652,40.14606050054927,17.634233345586566,12.491911446719683,13.014408885624057,53.518255632464985,22.537003087517867,14.307529505178458,6.852144109561307,14.640681908133,38.85703864575848,38.307599255560476,46.781650705408616,45.790964703532524,56.15015690122556,42.867547923622524,20.4363784817426,37.21899002518937,19.987606018744014,28.247602301281738,19.72113587606809,10.873794977189121,18.568412414655576,32.69073644552567,27.187800931625144,47.56271151888235,43.9954518099635,44.218714510891715,11.44078481671951,32.49869322609891,18.58091752577428,47.07299340596829,43.014522584231926,50.84919837214963,41.16083949892568,23.47323151951324,45.001360956654096,33.58663132850448,47.53445239520844,26.375924316037054,15.137806771829926,16.95125718236957,48.18983226703509,32.22216806785585,22.82194437875595,24.0552475821301,52.91235356955521,50.00133578952757,42.66607625118367,30.054829476709354,25.247589868527754,25.9903668343393,32.9666242004852,44.307896558867675,20.78712705908506,14.814830895361606,20.821906050326596,33.0054828113864,24.242594516839663,26.635267782044046,56.05116776306213,17.726209797787405,22.267973662666186,28.76170739729394,4.488696358150159,19.759070180324272,41.19752268921215,17.373190369193217,27.827080083769673,35.31228677148689,19.591525197812473,19.379778457232725,22.140114891095433,39.395062817442586,33.9895682773028,17.21437712057179,23.72312416735476,37.39187454175053,38.604594110033084,22.474914659499998,51.353037321624264,53.44614136429125,53.484350707776514,17.311439287158684,38.87094541184695,41.39917938462463,47.970179311120056,56.24082746345999,37.89603815349396,5.351438625629039,19.32276046301206,35.140652011718615,16.17083008545318,28.703463793443483,26.984600036520753,21.15948091481688,53.55853153254547,28.20593782916519,37.57031157199354,38.89901507222508,21.398707537878053,17.65667263557588,48.47883036440807,44.79082263869026,41.25339450157971,47.01373094511984,24.495346469239458,25.31029579786224,7.818226669200414,3.1662393446075043,25.80422589273508,47.2515763811532,19.176939856222994,31.645989166554074,8.206576642465922,12.558478404247225,18.49738487955873,12.139342126954098,12.8917704897918,13.871657018489042,22.58330541903544,21.474193098751144,47.75247815037443,33.89745508683883,42.673023327420275,32.87227779337237,19.40655966726065,28.19222656143446,38.111277795389846,36.13685661359168,18.989023733021973,45.76453455230469,56.24279460283227,39.71468886687043,17.259080972037548,31.29990638154258,14.411252565999355,35.176013135832356,28.133345810714513,25.842784900812656,52.331266425119026,43.46571348673084,4.527965597637791,45.84334886893119,36.68148964903785,42.782728942333925,12.727282176414198],"a":[18.357085178284812,3.504229783538304,19.71128826910684,16.38904129694972,19.064292502437524,1.4486405221263343,4.967274628666103,12.969858159724987,9.856307040505055,4.1857008489036,14.713218144714379,10.335799150924325,14.099325311246433,18.03217535073997,11.003344265445136,8.631049460944622,2.7189729153260345,3.398680075383851,0.22373605514111272,2.517932199344197,0.799505134119638,10.722016981129912,4.1018629005858775,14.511727221806332,17.488378641542862,2.419034300172198,7.031107577390507,1.2743020817862227,12.319584923018434,5.828971328927355,13.26571392598197,5.968243839814615,10.091418379398437,13.362973011697058,0.9775995192607256,6.225673603577508,11.121281488785932,0.6400453272016415,2.5064084842152345,15.951257647484862,6.5923279553358505,3.760098288411897,11.907083771761627,11.005270907853042,14.835884548208181,19.103393653145446,11.328705350133617,18.36528928362028,1.1811030182498516,8.047070073942928,7.546055541573327,13.303651065587223,19.75276431503669,15.418014436937128,17.942566774245037,16.824796092977113,5.273476934044079,11.827428829617887,7.354081901342657,8.908173804104042,14.266965024157372,11.78646814313693,10.960027251974061,6.571060421713644,10.303791012296886,0.9386943262474734,14.829594696778274,0.9731849916011281,7.969788345255111,6.50267641687166,10.576243350190682,15.026821884636847,5.1607702684826995,6.124451475068535,18.026521583581264,11.312487671970048,4.489007577708484,4.276462237442953,9.221435735292975,1.348487976916064,5.083755351767509,9.454387157949157,6.377842113320709,8.963117623135961,0.1598855612040051,19.1989506246639,3.9441825311278134,14.363437227219006,1.0727237769806885,8.04308436018049,2.2336551866445475,9.678718433834597,15.296457292819792,0.7817080685221134,16.36129780663669,0.7577135684587022,19.21335160119061,14.781175003427144,17.4454834171991,0.8508101184467032,6.3482769595227095,4.778313182909666,9.225239620834,11.49873314320522,16.95279333385624,14.937453382789352,5.177996853541553,1.5504835386550875,3.9679030942807936,1.6363175262918217,5.077071859226598,2.071013419188059,9.052529972623212,12.532205104868188,5.925211032679005,19.896208888113694,8.161367094066936,9.281916672953155,2.7558531909370565,11.685562255611423,5.066265132038907,16.458393884384147,4.426701695582831,2.0330223504673572,13.62794009495012,13.79531963316965,12.311269508908662,11.791714005551054,0.6236863188533581,6.565144250949988,8.880554112803578,0.9178265323457824,1.4919237474796043,16.339466852832196,16.83757137793038,8.413880754305897,17.67125442575224,8.967883857071431,1.2421193536744468,9.557979655928834,18.657803373785008,12.260176333454616,19.647321151818048,15.281392706808234,18.94375735748568,13.818397469978256,14.163978293018271,15.5308762997874,5.788641514797033,1.9400926661798978,15.968888858586737,16.606485163037213,16.138460024444626,16.445665158752117,14.831460319616422,19.115077550768376,13.837473866267587,3.4119580827053264,15.210164493584042,14.637587480262809,6.573298675337851,3.4499092448064683,5.9389297414302655,6.323553005549338,3.517603188443985,3.4578333296909713,8.132382506307492,1.3359095566669632,9.177821775620036,3.5437006849049757,18.06686119367368,3.687258505793092,4.174299293122958,19.654012145410846,6.087073732290835,0.9794340996653395,1.7485219770871474,7.163111482879327,1.2248331386355016,9.924581852314729,15.608718501744331,2.3387811733937003,19.501705258668302,8.950171353487617,14.865822572277896,3.5292612025091064,8.83898854425098,7.651122792660154,17.6451120439534,8.04752897804271,14.760062022615328,18.12479292497727,18.168527968894317,16.835782742705753,8.447602378506481,15.56682152670485,0.9504608969793349,9.328701188922942,9.887487695087671,4.129673386417516,19.443799068904852,5.978123814815892,11.646065407254081,3.987865186312991,5.863404124729894,7.80895616144925,5.886397697773136,1.2032030270758076,14.435427644620606,2.6006576689243666,6.398809060622885,0.02583592299231441,5.466790972045161,17.91429095573612,14.295901883110457,1.3206586934857834,18.09857174978037,9.757918091974908,2.483919737150222,10.704980055463317,5.466499029673804,7.792041810554053,11.67483242593731,3.4639715507715207,7.767894467921259,7.385058317050599,15.033617717947143,12.607175416306479,4.760148659376839,7.0911824995040185,13.599217894253757,15.010590699597222,17.903164799908026,7.6965482145203445,8.792534415510351,19.25346962878365,6.46675494945129,5.530055146916242,16.98209890018147,10.488693472218253,6.480036806696345,9.731394722804012,1.6440608579796212,10.809173208903537,10.231505630724516,12.669737546274376,4.102862999940116,9.401891873172264,5.176862027084641,15.476065975824444,4.8139768383394355,0.5916177956899871,5.000379778775947,16.49607405853075,6.2390349535587974,4.537348484631143,2.9907648914962204,3.4137293260244395,1.8669851003719051,17.52449674211118,8.524137593377672,11.031153757011865,4.673049573304744,0.8529525688868445,18.855449509656875,7.393207134029591,17.140027687072337,19.13402915858373,3.0026009373965534,14.83493218532725,10.10585149622635,17.443042382376813,0.9154062564558618,9.290107073075532,19.553735589081608,4.6538676140068125,10.505630022438979,3.8038082771636628,7.6754559038868875,3.6041937574946026,5.925855490947414,9.754162335834273,9.811089299197903,13.547588032816794,4.229471525810209,5.285442910262836,7.083174606128568,5.99016006542755,14.259835220037477,2.297893792650476,5.981855639573093,19.16148552099846,12.882762686427803,15.795084848888482,10.316091876816964,16.82510301435886,18.09327517509805,2.3677595623240943,12.255835978576947,11.842721839107453,8.800016423960546,14.449927478596102,19.29163508242063,8.832216361558945,19.864812708482052,6.550617830140486,0.5149795907661892,6.677924508938351,1.9685487724593997,16.540918275101113,8.754017931498854,2.637233979619653,14.530075348633416,5.313415875689187,15.693573263938031,11.815795095115526,10.048069727868384,6.855049878035557,6.42656986985735,11.633196865059926,9.644959188862362,12.102358415319316,13.06506638749446,13.897248208706255,8.576195273758337,1.2118377857728513,11.529193245211298,17.579568029859537,11.848279502967056,4.137482361547096,8.943058336601961,11.41888139811536,5.481023895168491,4.07034253746426,9.239858027906514,19.20883672434155,14.819445934934263,17.022567154886538,1.1933737533884647,9.463089072121388,5.956971689565682,0.9344809789181729,9.857522129609851,4.499650235911572,7.5298077640819105,8.832668368630356,13.314771929736935,4.987102328090547,15.137445716461087,17.3386096515765,10.215841686998894,12.260460582466845,14.553364901375812,13.894754827426938,0.2909678921540726,4.198473265983589,6.018612126561518,5.835440670287495,8.342741498662821,3.504524444381878,11.172884131472474,0.17587351963017195,2.394452769558746,16.096835747594692,8.685587890525039,19.84841714033098,19.867291347594865,6.692196260734438,9.743745593123482,3.4407906446739567,16.495103794137727,0.3511553033525372,12.197655101301269,5.622395671756153,6.482412665769854,11.723994247261395,7.499119823535145,7.279529391526354,1.0055520127392992,2.7092403879669336,2.518395952010195,18.362176923857735,8.467789124064243,0.01037426444628231,5.729302550883073,19.042455171777306,3.7004437354551234,0.6989954544407295,0.0308752078729313,3.0201647351905514,11.168452555081654,10.691281358129583,4.598538909950407,12.234017058715008,9.830389691488968,10.838888445364612,19.062575220439847,12.897625095711929,11.025025757307475,13.346082446708092,18.195386763109727,0.5619004793353533,8.210407649075568,12.079654646664014,7.871469616425246,14.717247497921742,0.5066677009438969,0.7768868489823966,6.212616754928231,11.700993207973184,10.511592270077518,0.6287758461023563,14.240547887695293,14.621005743333706,4.141205125293879,10.87960324325827,8.94774904129163,16.376724330422974,17.332320217964682,17.962656271981533,1.7151991289521273,19.376286060515795,9.123276630778406,2.7181619635343335,4.522822726757827,16.217725647976792,6.649942818283128,19.57612674109887,15.234547799740552,0.013291017332135446,12.172192462491761,2.549810418484064,6.855103470504127,5.315135351069111,17.42254476560546,0.6675544880444839,5.460078859333302,5.773026921644462,5.77210477244106,13.858722092784216,3.407041561257862,17.01640738979364,17.326219759766555,17.41127751680285,16.834810457346236,1.911834888395334,3.7205879523224006,0.27622657163604014,6.1324448095635375,4.8550720352515775,18.794987475431356,11.362850160502509,1.1565317703634026,12.677125167641456,0.2670539148716733,8.491003410986814,5.643275870923987,15.197001821183576,12.003518529501434,18.438547347662006,17.46990458286089,18.409832788291723,3.7289452261501355,8.075151144231327,6.6869455226055186,18.485907734463247,12.681795324495475,15.962383844422735,18.434527916463317,8.071882675147597,12.197253198100109,16.56130697652721,4.9954177206776285,17.11296969426714,19.42771101249803,1.2166011864888882,14.63792185784683,14.569894460024697,3.5743472988132385,17.055482747627764,12.765361012024567,0.14013763792108502,2.038616768287844,8.40727145510475,0.026238642380804755,13.320262746768838,5.950707052646735,19.796351208100095,7.365986728276845,19.723486497851024,0.5006411456206417,5.821988669984877,15.546609130316682,4.664535241822221,14.512580337067842,19.8560815217869,3.4676144116796426,17.59254312534062,12.48862016016217,12.836461077003705,18.687701322317235,3.27358227893928,18.776838946016632,16.344828362464227,12.165656158340274,7.582089234218388,8.391313377849748,15.204919817392675,18.930757079868865,19.44445364405989,16.831387551365154,0.3969695683650887,17.406674042667625,14.337772540712193,9.97982829547546,0.22848715486978755,13.231298779604304,3.247345917162381,14.377838015609644,1.9148660927782624,12.449803455775221,5.710323248305005,12.44886763322297,5.932213164315252,11.51077543790398,9.453326749202876,4.9249694428808155,18.85994181863194,11.128644828440478,16.349944786285775,5.045163353787445,4.153446011767605,18.623987031710286,14.005740279925515,16.83937420745037,10.899143790328223,6.096079809061128,2.4924199581674555,18.134212770836157,13.881446518757157,10.729095806703338,17.685730990064656,4.627022984822027,16.527720380550694,6.30088108806214,13.136372880916177,5.718199271811053,5.734282407631968,19.865518735612405,4.308473439038725,19.50973893492423,11.357477501944748,16.78753517644466,4.964572363269966,4.729554587597278,8.063634977600525,8.773914788978052,3.566760193086176,1.8605079578298334,12.645646034863098,11.513272474349442,5.90944841623906,1.4831707543233952,1.3880898607776837,19.66501835639042,8.626204468031077,2.593376991331202,15.132514678137383,3.989401258462344,4.479202563070301,12.198476395325933,5.929151881388237,14.817132076302656,13.61729026424181,17.550615111912702,10.154544766928236,2.5259727940082133,2.0585023322664764,4.603507853952169,16.944744088522057,16.116699954204464,7.323702223528961,3.970168493381987,9.348134168234953,14.438038342806774,17.323567330269807,14.160611811338125,10.689448430438269,2.071209255034532,12.14700768097015,2.4604936702978675,6.205830576063245,8.376096733029952,17.078643287053175,1.168727050974585,12.54776304009444,11.051432212302409,16.220275923419997,6.67387674922185,12.638402693141511,14.963730943422679,10.650460469609829,8.687682160021142,18.54233009320457,17.297385860404695,2.1985775955233633,19.465675156840632,1.1916098638844375,5.470248593092153,1.6084053049931146,15.277126983118695,18.11503826258539,18.984639001247025,2.1780587885109615,7.186509224180768,4.386641538031064,18.708972048097575,14.088908382219616,0.953975647107228,12.057665493434936,16.753372344996585,4.889448170079378,4.623633031599801,18.873294799465434,11.67164450141735,4.008458148405234,1.4708833416094835,1.6880545711686867,11.742959370818973,6.390168044329787,10.774443758229815,13.02693824233167,1.4792296267686345,1.6799487445780104,9.486366332681868,11.979800759508429,16.6513175952404,3.0597445363000864,13.345913498957964,4.465014503855351,6.90796451428386,14.721043608376533,16.434784389922154,3.02534022475629,8.017406746153647,1.5213817483277037,9.770638529547181,4.558201942748821,14.377419065726507,1.1448614710440186,0.9399282610968163,9.850246945463876,2.539690374242638,13.329544641583354,13.142068405224245,2.828961547656088,0.26798323868932883,15.283973908222276,17.37823222959814,18.657074979299708,7.303575795472481,11.968854356245497,16.893418347319443,12.396596512454877,19.92984701367211,13.406805684659759,8.607093464751138,1.184907810949829,2.2811854624318784,0.08512863971802176,11.154140289616956,13.379198291708052,10.578125705628963,18.340744991046453,13.50071254208887,5.13114739106717,0.1826127951128642,7.920591128031211,19.711710723575763,17.387505290145924,8.528625679803161,19.850533241868526,7.1889323663922555,5.7345739056128275,9.702010652658007,10.163348616482306,6.416772729900422,2.462781601397195,12.187370787367042,15.254716565779503,10.616343583888721,1.7000645246143575,17.739276928940953,19.271194300830906,14.619143950665418,3.7555593493502792,1.474985721502513,7.487329220103485,2.9893889632943482,12.935699707455788,6.286351859022927,5.897497215958714,16.406633175498577,4.817408262751366,10.268111056410628,5.449253897316941,14.441033068624565,10.97576180345682,10.912819712648357,9.937988737312008,0.5828179828891544,10.563988193084356,3.608652974405686,18.836840461480314,8.971560073450519,3.311763342436591,17.6198411207752,13.518900502469787,4.673467839154224,19.745867489492692,4.148817834494607,18.190759632430836,7.938196095131267,9.392988311894861,15.642812290178053,18.418721578604575,12.688033915807285,8.359830044344982,10.037972451331783,4.397209794663142,16.97286773685231,1.3751163724641113,8.478438941805893,4.41179132118338,10.743554130264773,17.1411144802315,3.779194756009141,6.216039271885356,5.794850670301432,17.509228498884152,15.310040187197407,12.147362071879693,9.952488130593814,3.006144916496125,6.2802745733862775,4.2966239440693865,3.456170943758643,15.364227450923039,15.546357611213569,13.435601420268135,5.2717850595616245,15.360859901730635,13.615303920952005,9.00107109786029,5.523815130732874,11.14603241380916,7.662944985576039,7.661919439612475,1.6027446156697778,14.361170738425173,9.269517595466663,13.706104102436889,13.359603737033323,8.923208811245766,17.928099384344062,1.595321114372683,14.819205497361864,2.4653191079987558,13.451836011398974,15.091874247130175,10.693098588203949,5.830475057787572,14.050739383949558,9.955739403697525,3.626535782116971,19.04405865319403,2.2435658771699174,4.311197583233426,0.8539972146479835,17.39782204893306,14.779343201043273,9.17480421513905,4.819800513942991,12.85469504182091,19.13573560731077,8.393718833206814,8.021349159275886,5.831984224534161,8.263858842469386,3.7061746567556275,15.166611920315184,19.35629947632144,18.796789492474062,11.855119062106398,7.67428115798118,5.553699749991852,14.793387579595564,6.432052760271301,3.0487820891642903,4.403471019212577,10.241091252270586,15.225499638990186,12.634712519327342,11.953591031830712,9.107148215536117,5.50501761114957,11.362865310888036,8.992379534905535,9.994146566673678,6.430136734287832,19.311664251617827,2.564762149747728,13.306532679208797,15.856937536678416,8.90944918496842,4.396501065362677,15.589568138372695,11.821081984238795,19.169987096169496,19.267373928444695,2.669770512324887,6.951130244739652,16.199548484912544,1.8292741831341885,19.080785668651984,8.474087793998098,13.67589495916986,14.834555403943043,12.266943318884733,17.32422327994167,6.2715028865884825,12.386501087391203,19.460463839487417,9.316514328490232,1.10525518641162,11.563507423554249,0.6982040025305869,4.466126688187262,6.949325338571386,14.826555371419833,18.25979207878263,17.395767721407793,0.8338832925113238,0.1314659706080068,0.08686868896636835,9.172744224999715,5.35679946361332,11.684259895030715,0.7413798176462194,17.8082045456684,8.211277566370324,7.711253608980395,1.088569345430579,5.764460161245655,17.30540185481827,7.9937960087032955,7.325706060397321,9.63747076704552,14.186558538211527,19.001809930014176,11.062773862103583,4.902330889979467,5.215671493997962,15.168008120700694,15.239788398041894,8.011780935412292,10.01079322275697,19.204175531562512,18.369633288676606,12.162493780174914,17.56633532949934,11.380274944490175,3.1326091554681845,13.445115200115016,7.940033834025102,12.906133655445547,17.43921374913206,1.6619433874833112,12.197966165874066,15.116018326784197,13.677999956563166,1.1928780306269404,1.3306323280141896,13.161708824258023,9.87362736102828,12.960163509534759,13.918598127036045,9.585237847185564,14.68197510903407,7.36260933178178,6.303506412199411,18.009035297248523,3.869855835891247,0.22923511555331455,4.418390372238479,13.221889840094065,0.812846318570073,9.943403528040644,1.801418061115343,18.442344191560597,16.968261125427464,18.62083106870085,13.682498560245907,16.90165603300336,1.6065302918602908,10.978149339840218,13.548774213189079,16.077472514199165,9.397778248869919,6.864712863246001,18.671139767866567,19.99672603493295,15.91382423634203,16.337640832853168,11.000700882832835,0.3202640620586594,14.553776229518455,1.5799302658756709,13.818034479649693,8.16127363460006,15.374587834563055,0.19417963477629918,3.8055514466958096,5.551677020004369,2.2238046429612224,5.882152618036827,5.446732099927938,3.5896212443926157,1.4458543915621513,19.246392063604794,10.818866820740546,7.47153023259302,0.4932978039762226,17.406773195569265,18.461578618134045,19.223019196211872,6.857755230005247,5.141349893107319,16.558995140556227,8.812407112460434,19.566106917570572,2.1177083768105343,4.89896331941869,18.504753908566997,14.200465739310463,4.800193898252334,18.985712901380552,5.390721889923524,15.321976421005012,15.511365566537574,8.448376421403982,9.233910914935496,12.335111507796768,11.872982211898485,11.04000103698696,15.166340154482075,11.74753963972265,2.59345675401625,18.185646553176845,15.572679671140989,9.92228275338995,4.510577266357729,1.1739355062869272,6.7135197276813985,8.54673365386509,16.139808463016927,3.062268054113675,5.392256389240528,4.934865099292112,15.533892341486592,4.211912663079174,1.4892547333202044,5.443392296080565,4.203015424794572,10.163851139673907,14.341479666494221,16.906622139113804,12.136857889141282,17.54436697830533,17.362751647366572,5.215384855448866,8.723393231610572,0.5775120574387005,2.7638698759948843,19.175099504157707,17.068985718176386,14.1093639882336,5.7348028889170255,7.12642524817142,1.9618513715692654,2.5285769451180373,5.16675577106374,18.31587722347786,16.212865648007625,11.226127279028946,3.2466699822975853,18.684874054612727,4.4700419271348135,9.00429363057318,12.208004790880661]}

},{}],54:[function(require,module,exports){
module.exports={"expected":[1.0,1.0,0.0,1.0,1.0,1.0,0.234660155470431,1.0,1.0,1.0,1.0,1.0,0.01630033907602691,1.0,1.0,0.2947464620760466,1.0,1.0,1.0,1.0,1.0,0.24201194175650395,0.4474407657341301,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,0.46040988907338953,0.33074395040534865,1.0,1.0,0.0,0.7838797820910556,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,0.5939903064824661,0.20824671536398415,1.0,1.0,1.0,0.6176164115018484,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,0.0,1.0,1.0,1.0,1.0,1.0,1.0,0.6771700416297948,1.0,1.0,1.0,0.5608156818788547,0.0,1.0,0.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,0.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,0.3271600874202045,0.5841043751242527,1.0,1.0,0.6130156348970184,1.0,1.0,0.0,0.415771616693308,1.0,1.0,1.0,1.0,1.0,1.0,1.0,0.08040851685066228,0.33582963002252275,1.0,1.0,0.0,0.8935679559839528,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,0.08803996173611531,1.0,0.1312479732862429,1.0,1.0,1.0,1.0,1.0,1.0,0.3156164575541459,1.0,1.0,1.0,0.8340595468895982,1.0,1.0,1.0,0.0,1.0,1.0,1.0,0.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,0.32927203494473156,1.0,1.0,0.6102923487899174,0.0,1.0,0.4422851793158931,1.0,1.0,1.0,1.0,1.0,1.0,0.0,0.0,1.0,0.0,0.16457621090249935,1.0,1.0,0.3516724764366881,1.0,1.0,1.0,1.0,0.28546881102850774,1.0,1.0,1.0,1.0,1.0,1.0,0.28504743617807793,0.0,0.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,0.6735336584892168,0.0,0.4576123185004592,1.0,1.0,1.0,1.0,0.3079771840118671,0.0,1.0,0.6139210341752385,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,0.23198023353940056,1.0,1.0,1.0,1.0,1.0,1.0,1.0,0.4754282407385611,1.0,1.0,1.0,1.0,0.7516193415681977,1.0,1.0,0.35127149073164976,1.0,0.4398440779303721,1.0,1.0,1.0,0.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,0.5486797016318419,1.0,1.0,1.0,1.0,1.0,1.0,1.0,0.0,0.052844011357989995,1.0,0.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,0.44438997661354657,1.0,1.0,0.27980629187462747,1.0,0.04857187169592456,1.0,1.0,0.4879112507714757,1.0,1.0,1.0,0.08866512986155947,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,0.29720184450637294,1.0,1.0,1.0,0.39882744661348934,1.0,1.0,1.0,1.0,1.0,0.0,0.4932174795226857,1.0,1.0,0.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,0.0,1.0,1.0,0.0,1.0,0.7610002492972483,0.5931108934460494,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,0.743960270059665,0.0,0.0,1.0,1.0,1.0,1.0,1.0,0.4308851474069351,1.0,1.0,1.0,0.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,0.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,0.5915785688719675,1.0,1.0,1.0,0.2742482738687787,1.0,1.0,0.0,1.0,1.0,1.0,0.5525280320389766,1.0,1.0,1.0,1.0,0.0,1.0,1.0,1.0,1.0,1.0,0.0,1.0,1.0,1.0,1.0,1.0,1.0,0.0,1.0,1.0,1.0,1.0,0.51002877303744,0.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,0.6724911831844014,0.3965850357701523,1.0,0.0,0.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,0.3548595607945989,0.5024436848914774,1.0,1.0,1.0,1.0,1.0,0.40271966304038725,1.0,1.0,0.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,0.0,1.0,1.0,1.0,0.0,1.0,0.5239984921621965,1.0,1.0,0.5317301902324634,0.0,1.0,0.18652749347901917,1.0,1.0,0.0,1.0,1.0,1.0,0.0,1.0,1.0,1.0,1.0,1.0,0.0,1.0,1.0,1.0,0.8424469506091279,1.0,1.0,1.0,1.0,1.0,1.0,1.0,0.33120650891489284,1.0,0.0,1.0,1.0,0.07485265002856764,0.36578405797262814,1.0,1.0,1.0,0.6945377866315867,0.0,1.0,1.0,1.0,0.0,0.6480888110464206,1.0,1.0,1.0,1.0,1.0,0.5132751829140261,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,0.0,1.0,1.0,0.7171076145470088,0.0,1.0,1.0,1.0,1.0,1.0,1.0,0.8436420605642543,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,0.0,1.0,1.0,0.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,0.0,1.0,1.0,0.0,0.0,1.0,1.0,0.24612078285943653,1.0,1.0,1.0,1.0,0.0,1.0,0.8492456261989776,1.0,1.0,0.0,1.0,0.0,1.0,1.0,1.0,1.0,1.0,1.0,0.0,1.0,1.0,0.0,1.0,0.0,0.0,0.6306485410885394,1.0,0.0,1.0,1.0,0.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,0.0,0.0,1.0,1.0,0.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,0.5414853034677898,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,0.0,0.0,1.0,1.0,1.0,1.0,1.0,0.6169846420667506,0.0,1.0,1.0,1.0,1.0,1.0,1.0,0.0,1.0,1.0,1.0,1.0,0.0,1.0,1.0,1.0,0.0,1.0,1.0,0.5312055612580046,1.0,1.0,1.0,1.0,1.0,0.10578158264395776,0.7136351851770381,1.0,0.0,0.7675175028347407,1.0,1.0,1.0,1.0,1.0,1.0,1.0,0.3179659702143052,1.0,1.0,1.0,1.0,1.0,1.0,0.0,1.0,0.0,1.0,1.0,1.0,1.0,1.0,0.11677705398096906,1.0,1.0,0.2170266482558363,1.0,1.0,1.0,1.0,1.0,1.0,0.49947926075631194,1.0,1.0,1.0,1.0,0.338836885670569,1.0,1.0,1.0,0.8003325512756685,1.0,0.15232424257759763,0.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,0.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,0.0,1.0,1.0,0.0,1.0,0.3526679231581837,1.0,1.0,1.0,1.0,1.0,1.0,0.0,1.0,1.0,0.05410783090627245,0.4659642987839088,1.0,1.0,1.0,1.0,1.0,0.0,1.0,1.0,0.0,1.0,1.0,1.0,1.0,0.0,1.0,0.4193093039042894,0.4249155244261826,1.0,1.0,1.0,1.0,1.0,1.0,0.3861072601678199,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,0.7028225567602311,0.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,0.01483266886209203,0.1297775777762177,0.0,1.0,0.0,0.24632566910739323,1.0,1.0,1.0,0.0,1.0,0.17086513567101896,0.5149233483070633,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,0.6663236141514449,0.7732746323865035,1.0,1.0,1.0,1.0,1.0,0.0,1.0,1.0,1.0,1.0,1.0,0.0,1.0,1.0,1.0,1.0,1.0,0.0,1.0,1.0,0.13690717782159317,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,0.0,1.0,1.0,0.5164176797165049,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,0.5928482087746015,1.0,0.3935340879784513,1.0,1.0,1.0,1.0,1.0,0.0,1.0,1.0,0.35510594470838724,1.0,1.0,1.0,0.5153955264413578,0.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,0.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,0.0,0.4551125186375763,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,0.0,1.0,1.0,1.0,0.4422282543941197,1.0,1.0,1.0,0.593679026444551,1.0,1.0,1.0,1.0,0.7564626621223463,1.0,1.0],"x":[72.07075398012964,80.48388208171467,11.777410927387354,98.17196918191509,88.22368478722682,78.40464169143272,11.999704483835583,81.10043733383947,87.11531119800678,30.979317167218532,40.44673450973373,51.528597607365676,2.3248488473746054,32.21023310064277,60.31464288136863,7.350390551574049,45.858388686664384,41.06082928721917,71.37367075837658,75.55096933737879,61.207191050004205,3.42322191241089,10.874622320410388,67.05837917638071,58.84377569639319,59.44902945847061,76.89864702704105,67.04708253272109,75.44577323659864,54.27978827813964,62.09775513264641,41.03276475032178,40.49744860914648,95.68026399980722,63.19232503203827,26.844029499601408,23.639875616785222,60.72514529405606,87.26441974618282,6.438412675673244,25.05047396915159,45.50734256969242,90.76091928128689,8.509056450532992,33.9713035774877,39.94032173057989,85.67036470582804,86.6007884709508,91.23680850112092,10.415913999938464,2.83985869018879,29.90893603354654,81.25534341339808,45.03394857561833,17.73670153167739,50.40966019932278,74.32527525662663,42.186747665730984,66.26686245691215,70.30353238530785,99.57661038043864,98.83969293063399,61.275897220061594,16.45708727272279,61.162426895607446,61.21218679552835,12.801891631087736,76.30832889319403,59.67154702275075,23.560471960939623,89.30194224326011,38.801756525868726,8.6399459520913,19.107663974312384,73.21549785511704,49.734171239593806,62.03557388379897,19.451843244859667,1.1985779678619801,60.35389695788709,6.665811706915958,36.74595466588093,32.13673575756377,75.65200289171369,67.73744752136676,66.33933332295263,73.24422378000237,24.78700101007456,88.70853247853884,94.84861871945205,42.74130758609181,65.33009333446857,54.473245024908444,56.06769123098934,58.409215235169796,45.31412627520952,57.20091920652892,66.62087082096608,7.654833975509412,50.23478269846087,35.83111931731118,66.212537655438,66.24362664229011,74.24399524676788,18.186740741879447,53.300752252509184,63.321144963769235,62.41821997678099,12.306780682265561,17.958049530481233,70.62775387561058,97.08305640927549,19.760975730557885,84.08944405088099,67.90713897293861,14.846402605924759,15.730061073780167,67.56991751833993,51.59764444407051,35.2806782550597,63.39819351725544,18.448995806517644,77.7078171671323,86.72604714528744,14.35493684219149,16.74541585478164,73.88911185313738,86.23693670962223,8.350413642465782,29.81262115446299,30.051212599635257,77.62877028516964,45.80382417690383,86.61436061192673,50.629659565419004,7.860731631793483,44.10910655419307,55.13708347363764,64.06000511409451,36.729885641625756,66.89394702673437,48.5007435276617,2.839996471453543,41.25904136950833,10.52312747567501,83.16489054466341,49.28723274864741,35.418031388958916,75.1811862783299,29.72096116904559,33.750911544038665,21.108131984844537,57.317388702664786,18.09342244460288,43.726131068916544,26.163101146591995,74.65252250403435,56.9563823184567,35.608518331351036,2.623127622915833,33.583809063128236,48.46468928811562,19.274157399626635,14.361262092862681,67.08976156502978,57.69088094488259,81.52851046086924,45.417664611975496,28.55038453620797,95.25596409891637,45.98363485836785,35.19918034236225,84.51557616965006,75.1531531488306,38.974410914279375,48.20609808276841,86.11888417490275,81.29475821212735,87.57176847603027,42.88701635886032,22.96997530944722,85.71869202231896,42.206635625108845,8.052184859397116,5.8844799773783985,52.98391661453188,23.809620697652043,49.055564432367895,64.89910821716552,95.08579063829701,58.625283003684615,61.597129379347315,85.90845054983147,0.5370664748433729,14.437992502816343,41.675758475785486,4.687116991206919,11.073018289995918,99.86623535910324,32.41272177169352,9.84633730564246,92.00753643394923,90.02607544739749,75.89585207909425,43.35121194493708,13.070810755069374,28.07078203538098,36.82657275450172,82.69180127564432,78.85842479580694,81.78458628349865,99.63024469025932,6.821355811267171,4.714699441610937,3.208130078173288,46.34512573609817,34.66218267751766,28.929083182932104,88.01207219118933,88.23137637360337,89.08859440883046,53.79176474690968,57.30577033437414,22.242490060816532,14.441510745479302,8.191991624103911,20.83148065870828,17.025609821560938,49.22169246926123,70.58027789377037,22.29604265325613,22.812856723792496,4.63950018951218,29.066161314503304,8.11733127770835,76.80735735965729,27.287990353373903,66.89620690559268,53.331485287988215,67.42043780647565,48.13399121879336,23.104046649525102,37.945642876959404,68.5231486457508,47.911969170034865,41.261763415849686,14.482331712077912,33.73572731355132,91.38853136511997,64.37225442803106,54.60347184993341,31.786000832301454,48.65025219746677,33.92169423386851,12.32893694879742,48.32713300263114,50.62641597995261,93.45558955608115,98.67464698288204,78.52945709869962,96.56348662839495,29.476296213855214,13.863924795721871,70.47935589461656,19.134395744395015,95.64176898375594,56.49632674251173,22.254526038294607,58.79318674377991,22.089914868235283,19.99167139571152,81.0897383737424,7.7931628937671915,67.1068128374672,34.5305128779743,70.60298921700732,13.881432973984653,84.45168564341701,13.033301278417152,97.25795356780165,63.25270713730513,33.00811541343385,91.88831012183631,67.38179466652893,49.65184519346171,81.39344194425865,12.529858775922031,39.08961252588532,37.299443992570524,29.04127615948966,98.98546356675315,98.83135554579063,47.34817729399017,60.97143806719325,8.01352241396689,17.764966772174585,93.921258366217,4.0114414589151215,98.1650573584921,55.62438665498346,61.24982704753916,69.77185510238739,78.12398796631774,47.41550953208235,55.24422761908918,84.14053297434391,64.92481637662631,34.400003289001525,97.83641421307705,34.256186320960566,71.01685156174007,88.6292118535272,10.794043349621774,51.5294526957087,57.47856220795524,11.313664665513823,22.170372892534452,0.657856302917037,80.72435824403195,71.23551706705624,13.489602475102735,89.25173805045003,92.96539673762211,90.00603750827491,2.684748601591558,55.306368650741966,75.83815269546183,34.90756000831345,60.502260435097185,27.061596949628086,75.12750986710385,26.751452041346614,77.15533304762103,13.258345989099851,95.80451096683389,58.72115017328785,27.195769540502845,8.715071647500672,78.60692963090563,50.60552902332376,51.50751123723938,79.40311948949412,41.121327945834075,15.235941007567867,8.921647785718134,81.87163107318065,98.00597106531208,10.482008429057599,87.3396042342737,83.08944055517247,34.52755816189148,79.27678785322179,87.91129432539755,54.286705371651564,25.496097756383286,9.85484203354876,45.14209817985402,24.023914048742,12.188508304803204,26.17447168416307,33.101856014013805,15.673855591810426,60.20912087121959,42.611046101082614,38.41048931356792,77.95945777261373,47.99528298185689,19.741539901081605,64.17266318618063,45.220370491791726,20.823587877747983,6.4285389436821605,2.0303675405903387,52.15244001495807,31.582875345647675,40.37979862837962,92.3319768264661,84.68547503592913,25.84151793543232,78.79067879434814,28.99374729579769,37.9578977762292,2.975041445697779,39.710094389678915,75.21794260213551,32.19039749048089,57.18452485537932,97.431939372407,44.80210792107828,75.3521308826682,33.648186685191625,73.65915730460912,69.36711909431135,44.39797564972843,99.46020518344774,35.714730531459416,99.06131338206028,32.263274938413474,67.24009564081001,25.925815888764483,34.30739689598994,70.59414378568454,58.01658408858357,42.08960827598083,2.1713692462777656,12.487906747518718,71.21917397050015,43.480641297434005,39.64935993608365,65.52757952482344,55.10623788888509,63.60723792738121,45.8848112105547,12.82242833543421,47.31660476550594,51.284397701573404,70.25131584872027,13.362419802693793,94.06550857847972,45.457610959144446,15.864261511841526,65.46057707913675,41.06902174562115,75.85993951910368,23.016863447699688,33.36508403904514,41.11575908648184,89.19888861588063,31.322509224456006,4.973819737986074,66.42576304267519,74.88347024975748,41.74389107797227,84.80648080267234,46.90270897990991,2.3202980352203806,40.651457339779775,77.30282954631049,75.60225045526572,38.741570038198205,92.89827436492406,93.16189141357003,2.0271384547226434,82.69541732242895,81.04286176447475,39.64749573464985,51.143821755557425,22.355133838212392,2.292288410343768,26.48373129456325,85.08956802028462,71.17469710270734,32.10355870298747,71.33657495411929,31.724293295517004,23.979854094819043,13.200098574931252,6.36242302772807,47.48328858317379,3.594127104900857,13.032760826019029,86.23557323720547,27.04490941104836,33.60979895417173,55.79841349559877,78.8233965057966,58.54874853834306,48.221460838719985,79.98223182510922,85.65738843465249,27.915480174443452,31.799049661536415,91.16184766388173,91.27606503958248,12.222833624126327,13.791112875626265,68.6664799233397,65.62144884817226,41.24078699159164,60.376810038443,26.304544529193997,16.60075948474551,82.03544117928054,53.41249367182681,0.8158483890589485,48.31802898217259,58.51026449820165,98.05772477713283,79.76858337447008,62.789181661676395,58.18441700886823,87.87931516043339,12.489975286348542,10.1968142046595,99.5575013183091,52.18085409820063,3.2680331745517988,55.04893489853306,6.95095563541166,26.59356840092466,57.55078170905856,8.561581045695533,2.4402627514816144,83.55335517124436,4.354006419260736,32.37247598883675,86.43424386614855,4.587800395135222,82.64261792988033,38.71542597925066,65.33148154506443,3.3357240304393576,79.55480145270877,42.29570208707947,98.71842477518766,25.7395306782509,88.77043863962231,2.961176355877271,62.115880327531855,32.13758313666506,33.50013973377388,22.72470905664461,83.81727806413804,48.841074915201396,87.42356977159555,99.6773118655936,62.40248628248255,86.18515794471409,53.34966103178553,5.119261519473861,59.099196260578914,5.300098093038641,58.033357899830705,78.59999368903424,20.168711087890422,11.78825365706102,80.91710495418877,70.13408991541037,89.22781308021925,12.383333881918324,17.497394121795985,22.482558548422983,77.19527025087591,35.00683634752737,14.55884724940628,13.18662041657024,11.92816078852912,52.37090380212217,69.30108863466604,31.18384071662288,86.98694381208631,28.270892682809333,95.26446798211474,32.37704554200966,57.50564976385388,45.23367994787453,42.27377299743218,65.75978952381007,49.390596873826254,49.70444224345605,80.38216313461129,8.187974790378316,42.241586572046465,93.22539667596223,19.98265933177221,0.036267564099312644,31.338442109043285,68.77760192771656,65.04045885665634,40.06458748362076,69.51433743175488,57.587402577229916,23.315078676780864,62.3756893425718,29.750999212713623,70.85313184166048,50.356737241755,96.53678750798946,35.43037950971923,86.64819172014045,52.457799822930355,89.27064430236733,24.87163100030243,62.33516464197735,52.03330965256481,58.430813050714804,37.448725570987506,73.43061592545999,72.40452716198922,62.2406453457466,6.9668171963715775,87.25651745962703,75.57948851431209,13.589394587705694,69.0063923838226,74.8251290543988,19.837601289312623,50.80091007559191,36.02446033181159,46.48177330251675,85.9465371081302,84.42838942665551,91.22829374258485,40.236954435285675,27.759762346296245,47.55801217813922,83.35161180442827,32.280090192774445,52.70848023332459,9.98047198269516,47.68509266307548,79.16435698626043,9.622149578564843,4.33299096859161,30.31734733440883,56.09325963051861,9.74386766693236,37.86951525703357,99.02417506291444,66.74013055161892,86.60903574871372,4.145211645983959,47.67277745751135,33.47138571735253,88.53185570916486,85.04910401146344,9.556869002003566,96.7423710161373,7.406925184888857,63.78392673055045,45.902989297471834,59.6955894112442,30.674660551032208,81.86976257444769,41.77028012682846,10.193615097537823,90.92220292391701,79.99396057429551,6.4793031564479575,34.70303047970311,6.704449677572821,0.2889340639948612,22.462779552556555,72.00491558905262,1.569072164113039,87.8567467843111,34.98416777448623,7.098479838662697,33.08572065147648,57.37520639812806,90.51886570331101,97.31912587303438,56.22074038299898,92.44246872016979,95.14801714431356,84.29771120777274,1.8756709341613664,5.937272920344228,49.14637650048688,53.1638497170055,12.088693731566513,74.33660613751158,74.68050464016068,79.56939506817953,55.27753987460711,67.046706755128,59.270849645243096,68.65437519966046,22.449394257496746,95.58218513691456,97.72964556621105,88.49310136940565,60.42681722610712,81.88424690274101,57.58474850672597,72.43445237202036,70.65825708555064,91.41704126545235,95.11445042324634,83.10393441110816,11.10097647132553,6.652251138025056,45.8500683045626,95.44407636088401,40.50295338273262,76.70393640408541,39.481029419840375,23.25769224218044,4.7902592918331655,87.02385393522474,46.14481615502712,36.35920820543077,29.37553344081525,45.10881215621085,69.98164151589327,1.8924138736598817,77.76467409707976,74.9506732681037,81.28834829923012,91.93936637132636,0.8129982876675435,47.78177941759567,20.27948312205343,37.23015366643403,0.7960335347406478,84.00391249411585,70.35390092446615,13.14998196163122,55.663427196359216,72.23985220691208,90.68387152609121,25.200648367683055,27.76030594911245,17.567969170264263,19.39715987103923,38.848508596206614,9.60097290423898,26.789116046927997,80.79460667395344,77.30386626311815,30.34667592720708,42.25837745830172,29.990303235790037,57.594730173854835,53.449875685755146,21.5733985951575,34.161083973543896,35.92230862596975,70.71432526907,45.53617313788207,52.475101129165715,36.06124016790873,1.3170269893151287,92.83112702552631,8.621820542653369,55.35381739125509,30.2398428258837,50.73849734802005,51.12056357650887,74.15789210432084,12.067090909473865,91.56141282869999,22.525828799018765,19.02950901947078,61.36870362451825,97.83462055476045,58.55933142409593,33.42356440033281,23.306854091642528,23.453730762824954,22.68927383945265,45.678021260634935,50.813328003961324,66.049113723659,15.97417065909228,13.164572362086746,51.57502144373633,84.52489479563414,92.11908631035324,32.070277071213305,73.5367776705175,12.820885508436675,11.877952634864819,57.057747737442035,70.30367968673619,54.528972418093204,79.9732645058964,85.87017764058942,98.96528808349628,88.74544765593797,41.19439529191611,54.198926527974734,60.31251133328344,74.54743520814287,40.916409365604586,83.51651292109585,1.0676643247709672,80.88574401427464,29.650102441504256,49.48862471625206,65.79116098525174,85.52602111010783,87.86214189029397,22.357194199551245,29.74452593773784,55.8117212417653,54.552737948709876,62.56193544647146,92.88068520092871,78.0254368946567,66.75907829430882,81.9639961476073,50.37057943809471,51.24595049542242,26.948160663163122,87.05558448850736,1.9879143965386037,45.2681758752552,70.82409204129459,10.886581494596337,59.84486907976705,18.29020961826009,58.00110099761535,48.008201132711356,86.99878448415302,88.14714706419606,27.385172379374943,21.82189391861695,10.77550896045194,35.106918085432895,60.49942108474946,8.828109341623836,10.785978354786629,37.48509781268441,94.42782160027976,87.03785598414822,82.8916936958406,82.56072513323562,10.572435087761889,41.02511467719021,66.72989506073262,1.1257807204102743,64.08300350130331,36.48598872731101,45.518555672956175,81.64047495472528,1.1927691362810133,31.64207690839913,24.095247278458643,8.234568310545365,88.60620671799654,73.12824912106906,87.70967934988272,48.56515092858758,43.808438474300296,62.97832382814021,19.234274397448626,42.04958295463077,51.72294594791349,17.99037928540468,99.79627403034527,40.29540214666674,21.34936961856919,78.89663291369646,63.5399392685573,80.07382394067074,38.450668494552055,46.26652609623603,84.42093014149432,43.53102630962362,31.237451409863716,3.5474392848576564,38.97809905316399,76.5773534482373,14.4960517849416,72.81718310104286,60.16673617693857,92.75066803276096,40.17059311977616,33.55886802444743,78.82253482922683,50.11476438273847,64.20118015597684,68.30908247081283,80.27177970308865,35.49757264154021,18.943666020514605,7.987782385652831,0.010260089159652708,53.66294283930846,4.786411644759325,5.787678078100478,30.36554637893294,50.45451978957951,48.77929413057864,1.2624455079321972,95.13970609660811,1.399389488621705,13.677607865208618,40.187159497366956,89.14725514278902,75.5140002267932,60.894970491769016,88.96651872712246,73.68242747645041,84.01662574901631,88.7221879070858,62.9487268664566,53.66939265794368,41.40805461514636,79.34154281343591,69.21957498413829,10.685141186123449,10.29505951367129,32.934048422060535,30.01778165966156,91.68870619655442,77.35614481419705,96.23158286490725,92.70321003408213,10.280255683810324,95.89210301331586,47.74846855466939,99.37899991378427,31.8772217000435,58.73222208100562,5.001588044053262,53.35763139409026,31.30202553381427,53.228039976244304,92.58987757034186,56.938893791814074,5.585042701041543,42.50987399854651,62.2818362280654,5.616912248561312,70.66949611446587,45.43380206085137,31.27236833868363,24.960310683058793,90.28009375376837,38.22466714324959,55.52680003436825,44.21866714773501,13.909341603196035,6.7938400709827595,14.263454210838432,97.28513267669996,20.643998468128476,61.51498630013654,62.98227646474799,66.66774782405858,49.59484649833783,98.96668657316229,72.0544914140324,33.123055504132324,76.90487544357687,68.0301198941883,24.819105237770046,14.226970637809554,73.49141202200498,15.96016213211049,99.35463366508527,67.98622779608023,20.809926524352406,92.40462555491682,60.47085087657096,7.825215994718593,49.34603701046836,96.8675647358546,17.79598486862113,40.830339824228034,34.3450767366688,21.885690619344487,28.619597940334373,9.567425038094646,97.03597000230751,91.0322098304137,89.68493027868236,10.323359658272558,70.7709854161446,44.60133233913304,88.03482465533827,38.89920333125614,15.514418731041157,88.39275006312175,45.72415909135654,42.331883372777554,80.3154634585707,31.852068675911838,83.30424565217402,30.1605051785258,55.11436971424901,42.878510907789156,8.052393232936916,6.238652309894466,58.250230008098036,70.93155618974028,39.56277894103191,66.51104025728172,39.69790762442751,36.8042387071523,82.08294240154484,84.48073110227232,1.6372832671180282,36.95162922513027,77.56234678310199,40.64239443566544,14.698301917730339,59.75932769371817,26.383338102647325,60.958693633578534,11.288792992373065,45.015696137226044,10.982701289268238,26.553648375166826,76.20303938992834,17.245646903179,22.724050853982725,64.42169924145833],"b":[2.575564793475964,20.58195582870696,30.439422542884955,16.53568054763776,10.424084437561332,13.179029724133567,28.97726196654739,21.41232222972149,17.557279947835347,5.5523030564577525,25.529701280449373,17.452266838863572,14.865820168772593,22.003597480437065,35.78053129216349,15.475582177177518,29.926698439240248,8.455351528490684,14.614648029759852,13.852040111794958,26.806113507585167,13.266317014183748,22.28970261646856,11.629651879275444,17.949322467359565,2.8053278546246307,23.44917012176358,25.132760843541263,23.025131587899878,13.909355245134616,31.86609976352718,23.89590323871483,24.369370280474485,37.61339675828604,12.948151660332364,35.92735898590037,36.58548728610132,22.80228620500735,9.989244913383084,28.958581833375252,26.99081358047755,14.206648052506367,5.975053084350606,3.24663316325287,30.24501194359558,22.221053537599424,5.37145024891827,15.573300392653572,23.77960335573772,14.818405957081644,16.680279283077322,8.956914064220673,9.70605749689562,23.72820084887443,20.903713844023706,23.03326471781377,21.06952599782767,14.542264722782656,28.687090685694976,17.898420032926726,13.670367364706266,22.640793123872285,7.544148802320363,10.307728330420009,16.670822744723385,22.035792999834857,20.781421273964412,16.12547452316865,11.492889892911666,17.638054735119848,6.18755961623171,29.593999759747568,2.646592983600038,22.5163145643935,6.795827207734906,11.624873219767615,9.648556924484847,27.498425016433277,16.863407173767627,9.136554267556631,31.829078821560138,17.93628460938665,28.885370343545496,24.07769806958612,20.144381761020828,16.80526320493943,25.94060934298848,18.04570809640457,17.77543292628696,18.644135936242122,24.596371650154126,26.200658433587144,11.195642723150314,17.090699652169402,9.298103146699397,11.575392436794806,14.018214880317199,13.269772621995816,15.744447562615484,12.095432922539674,8.76942236944577,15.360203255712443,13.628540857921948,11.107845029109914,9.806179634999861,18.32580605886082,22.881904738747295,1.370917082911589,17.93184216819357,22.599445892607108,25.55605694475357,6.225702617526769,24.191300514744214,11.672680067459108,18.183096770932636,31.43073493566556,27.586499195839487,19.89454516728701,17.16843173279619,18.352755348281875,33.490511413350724,14.338343115051373,16.512699679555798,30.116713957581247,24.447476464184223,25.40525814508431,12.252514339353727,32.68653350888195,13.789850432289505,30.135908488123725,11.11985174407529,33.326577120820964,4.310253534590336,18.461153411623304,28.32624912879983,5.8649023477227225,22.43454256747225,26.322602913721497,27.71282700497983,24.106533678731193,22.609521751194613,17.23866324393037,9.117061821104464,11.376011230546723,20.087188515955027,19.807965717614575,14.68437843225,26.465116881226855,35.62411803662881,14.854505348524341,11.683277473436618,30.593340793528867,25.321774464262447,17.50173335965318,9.283504242321936,26.943367285411803,13.31310821113627,28.980417589267173,12.986063590119535,14.164523042698042,24.63211930535348,15.56459560104868,3.6655766348322283,27.96858474736644,36.094464544606566,32.2801086467656,21.357735484330945,5.745176115287243,24.69124426655953,29.74504814006029,25.594543144306222,23.786573800004316,11.031768627455246,33.5450022584439,13.915029812906319,35.90045894983542,27.069418910267185,29.417022041126117,5.051289813246718,15.656337638950237,33.155816959602454,10.888825966343834,12.505214484175315,9.779546622580831,9.42556353186116,19.197266882267307,30.858515871076342,25.9289400781105,27.715859810912136,18.836621170496798,32.05045201700787,15.419985744807617,29.102897007058836,21.600179505891724,21.446881959620406,23.706253075849055,36.62516297760185,29.03374411842767,19.63539589354378,25.46571412555442,22.735802973917906,19.115132374743716,27.87332389085764,17.406609557724597,29.129179728786134,28.50108584999539,9.852474003005604,11.881925134800317,25.916307090262308,14.393905515652477,32.207893792360494,11.498521748833053,20.193651048687773,8.740444102206656,11.571890005894435,23.745568139180353,23.692877611188997,19.524649625990612,13.542925585306529,26.19017155772218,11.290805933852312,21.209775341353634,26.49445988891637,5.1510359141251305,16.41128852443945,23.49753294183827,26.398369359630053,7.708822672924147,16.22686539127812,18.7657415288989,14.513979717017206,36.93019652818873,22.672603919940954,6.101341625726127,11.740622581610705,29.50090071972056,11.92522536322954,31.684702128312587,9.190542387434482,6.774297101190108,13.745261058063075,3.912198016542372,16.08897465374796,27.504446848522463,32.092280411173874,11.030687716864588,5.52504966779924,16.174254108814658,8.01949918053742,7.667715788002152,23.64736234045501,17.70911174912706,12.028825040203664,9.377909940249003,20.244276916585164,11.776654078662947,8.159733340241377,9.167893391035363,15.043970104682028,24.622105505033453,20.65993057693752,13.230050888678239,17.97181162135917,29.227538326956463,7.30635167482879,17.12935754531341,2.8242017068639713,24.442613094084987,7.932627650065163,5.512243360886644,27.257084726518162,22.094871910787603,10.594677828938885,27.668653181228493,3.5261794291521342,13.972065688652124,29.57080462781436,14.26950967229419,9.66646497667632,27.37388777389959,35.80478057706431,32.87469613890357,19.828234049170245,18.48166402014013,33.39562624155234,22.75112741000592,19.69320531036222,33.14758384661435,20.67597575585864,7.997215113444347,21.539009826682623,14.938879069603125,14.492834605736405,24.44429775933517,28.694000363374354,29.126020380212992,34.58047587830627,23.97717549214933,20.17703440465822,26.719040482329014,33.80052011958561,15.476052986136413,23.601805418568034,33.36247691723193,21.303748878123244,22.54034361924572,10.51093940663819,27.83958535410969,32.19140802692113,26.895756203653903,4.4905660446945594,17.2716766841399,16.631581749375606,19.366828222959267,6.90535069902718,13.368726214987003,19.39557579900383,6.993910236342318,27.469958219404262,15.442276922632065,21.309351136149782,4.179804767460187,13.636066925521462,25.653527963575193,13.924993604322328,27.066356380099258,23.823341295466385,10.561835975540475,21.428398280757786,25.19396523422932,18.97833194174028,22.37899988076509,9.544884023487281,24.258770308214302,36.151541611351234,24.415723755918904,11.383079545904131,18.874023243035985,29.843800579005503,29.368515699406544,10.664327922458337,15.146931103601343,15.803066394435493,34.24664112575048,11.581357461797257,12.112662270559271,27.78862118155694,32.884907553767604,16.24953205073834,34.390521565887425,18.83757096266445,26.682746856110477,19.95005403842555,20.323467201818495,14.551201911867082,36.34568404443171,23.430657090432046,10.540296576269554,21.928888383299373,22.105984562160447,35.32792391120316,22.41408485592162,28.56926575335814,20.31664135042294,14.805547825035603,23.601272378753897,17.34015535673136,17.96593229743222,16.959021413454998,18.492813907280325,22.945665549246478,29.284867816863507,10.59482734729321,7.101367256931104,21.973375846157655,10.802288737785304,36.87959021253137,18.576942553823383,37.43551022732835,19.22132854522788,26.8557589732484,23.332278734127776,23.604288396944746,11.992800560807169,7.090949222200678,12.359178813165805,26.102508618589013,9.368004173217681,18.49867088663456,19.229910985241673,19.858218831817098,12.766478791657683,18.331031774798845,6.5637208471194874,19.392681569249724,21.36834851602897,14.66545120574441,24.732287231682065,15.36720830480598,8.383628318585142,27.686258552167473,4.112587689894158,23.39934245999527,30.779029664271597,9.216591053552223,2.900432858650266,34.62127765775405,5.452038632707694,18.026491795492817,20.869203914684647,18.651608629588186,20.849697566590375,20.973088653072722,19.956504675829713,25.18751245536527,24.30965632564723,20.035810417889167,26.154600182285456,32.48301285788571,28.895160580202635,23.920024592826472,22.12050569233523,9.786544384263905,21.972849409957682,29.240707583628396,20.667897911007863,16.30403841178517,22.85030010598834,25.65211695598795,14.466942641857434,25.396116726187437,18.474362511251073,36.70619843840716,18.695938273226997,10.760896777655073,14.581336644719789,17.21178381787004,3.6792499556551217,20.24859811236364,29.522661545022153,8.785041764569787,33.822573028954736,20.668347292534023,21.326638061851554,25.51885744338527,15.662173383127996,25.55299517965044,29.158715775708046,33.484545301345385,18.019310291910443,15.016191538417507,23.107059271615242,19.81611155562136,8.797205004260174,23.117676157146697,11.685675812646897,16.406110507179715,11.226298118669998,33.59978557319329,23.237633543717024,19.534270697002242,33.279228187431485,10.044158964858054,23.979753537701647,34.15001212940404,11.40079277832771,15.211169163226373,22.702680103416064,10.7919666537763,13.033370904978531,19.282221905473513,12.56234029352397,33.83676586875149,5.386021792229276,22.161958061255504,20.417501832072922,27.05013359489046,17.51269793815589,7.929321069603055,16.512477470523894,12.17710499944738,19.879241224718754,9.808146528187462,31.147718195621575,26.589963516343055,19.53537455749571,22.304086470601728,14.812752069282595,20.496663866019336,10.396394667673995,16.274339267407257,21.16737153297205,17.12519852684531,6.609758353435042,30.223272928126512,17.612808055555202,17.49228634682332,16.358847284205126,11.014169655539177,21.406423096471283,21.770899313989837,14.01509627536151,33.17063483092366,13.752411817602122,10.463746151086685,13.502972763193766,34.01714648681227,27.01218870164964,20.84478790734666,23.539080562910648,28.553244333169875,28.06177458176975,29.192127768262566,16.557548822068693,33.48337543766092,21.771710428897244,28.12932642840964,18.135987899623316,10.096404210649816,30.69329180700474,18.71299563022173,23.68981483588552,22.53238390484956,25.655387188807804,27.286181562901582,14.629925221182575,21.827854458283568,11.764589876871831,27.862561508845573,12.68007561987226,15.673281864162266,19.837794998059906,23.75847117229004,18.538592998239636,34.53454194567238,25.64122947788833,18.473586349480833,12.668532381891957,7.414891117672675,15.55746490423148,27.960360557127096,10.516810204213076,8.895547298565777,23.763073019761897,22.116565140326138,17.993378604904926,9.29668400899686,24.966038381351844,7.830761129642538,13.507508601395887,25.32982485691901,36.576653380476515,14.03003284583602,12.09677436682362,21.629757908951916,19.966298279337636,13.540703198033018,31.064587419326955,15.275658992319778,8.063507844126065,20.435364855408938,25.205238327093802,17.75771352227835,24.64586617302388,22.146412457349875,18.972709902650937,22.47113983832749,19.77389478593353,28.733939007494527,9.093911692562719,21.32206991095725,17.052050006283764,23.753976202537963,24.80830884092935,12.124060195090562,19.078830561122835,8.47993301135801,20.126899998960035,17.472914893144996,20.577217556353297,13.053624313710834,7.067181909160238,16.46908688084644,8.499145616676088,24.331566262968764,28.052237456449763,19.4193615032219,25.992003064336814,29.048530569339164,21.22010699238306,16.948950384915378,6.263182962180469,23.019376737722112,31.551656510458898,22.225643157883418,34.73294005994073,17.608820045295204,18.040131625702596,34.264853383739016,18.582221279907568,25.9371058535377,33.064131641119886,9.851171133909995,11.987328533550286,22.20176420342576,11.187269950943586,19.259960005016083,24.601577257010216,25.266220155171492,32.915893650665765,35.33531868729649,22.895152498215054,33.42525771044103,20.87048297270409,17.85103200046119,15.971481502477978,24.5470921076222,37.70605882923712,22.130759177856724,13.856379816798277,29.53590750654499,23.67445599812779,17.732935776507,34.54922819234983,14.586799674562556,19.763367031167572,18.686947020987134,16.93623961071911,33.366222031932395,11.717743568275898,20.70443600563104,11.549750286996554,17.440367270449336,2.6150474633230836,9.706206405567876,36.53987224475951,38.37826186526162,28.93883315417873,28.902134065339155,23.74758632658236,20.96949622643633,23.74098883681252,28.351652329869225,11.01881796201076,30.332106369242325,32.05036248350361,5.8138351839547475,23.426086596905606,27.39458633919721,30.046032331130466,21.740679558104638,21.253278396294824,25.678200049523543,17.350612243216965,29.37918198308924,22.410256139294695,19.177304743531664,13.689049718083652,22.103283211756555,19.166347796054076,36.318603879969274,0.6188626172239253,29.626262106907024,16.88632017397303,7.28079191966545,15.322435083386399,18.83696478613334,25.34148623052682,27.613957584636832,15.276537848756302,21.69601329419553,17.690452797147998,20.815766544072666,33.923881886761784,19.456359410759877,23.367453367410736,15.407010447624568,25.715106580567095,29.41121844486276,20.41515200852212,21.420417811513673,34.87328332486429,7.9203272732829655,36.61273635511315,4.9190815852721,33.19448658239236,9.633523327802408,29.30278862418463,17.89670546204242,18.84531661101408,12.85081350973423,19.242674597312778,13.418884325235378,19.5790913610412,19.470323309427787,20.732862110263483,34.493295006433584,36.0137739752528,11.408945919586442,16.62365814509963,23.831453645527812,29.27781801879096,7.773672089428452,12.941844343677422,33.75765083692588,24.426891941605064,15.21932948222513,20.502443143525305,31.37114753249369,20.66511192858909,4.290281445146182,9.485452857135396,3.803031176803029,22.03656637782137,20.844088935632243,28.439807673060272,19.538033192913215,28.81277296479725,17.43681425207561,26.510801264600317,19.22913486561138,19.16072729537248,26.011706165418587,22.231687621286355,28.95600348300406,31.2531597188773,27.299959817227553,32.157087614621574,22.242774454576736,8.99166289774318,22.78168217602076,11.023599122398524,16.198168995220158,11.47457001035395,16.81783220541969,33.02905382770183,11.448377658108289,36.21253548775913,26.355531866210146,6.6559038279576965,19.46930888987996,29.313812741857554,14.53244188087786,35.91742034334361,29.61841027748896,23.236642171804302,26.52565343559626,9.392064464242527,20.22713437294346,16.876977239072126,29.850165136721387,24.868943958167584,21.899767682835915,14.976237316449238,12.704567919765463,25.781083484580613,30.773690741191594,23.19366518517088,24.454040205291356,33.757405146815124,11.083081513210743,20.936224170848682,16.237922865962766,20.257680112361335,19.021668161438157,25.594792009085456,13.234215044797438,24.947770401431615,20.442802996364613,18.193052195882593,14.761567037832867,28.62487986502797,25.54379616661133,23.057860395282184,7.845328102142779,6.52798327646916,29.45734285141444,31.06996998889119,25.63640068110366,5.955977613775301,17.24103971381109,28.091114141305926,22.399685468399746,15.148247549351478,17.0867175075469,27.8005378519297,26.405292728950673,8.314310676779852,13.235106623861354,19.411405014752077,17.867614548375045,19.973102125083038,12.56809283661874,29.794242965102686,20.382005981196045,22.83889186840636,27.673295964841213,17.4415917710039,16.946881951339876,21.798487721382852,15.526408012462191,30.344249674277144,16.332411385550092,22.736355314229137,15.122350382621903,36.92552487733663,16.738318460980672,17.019977404661137,27.641219048207557,15.72762580207128,20.78319611781397,17.582060449235804,20.07619164287006,11.992463996435463,14.234213363784274,35.90990604499876,29.799802545586118,10.425625981323865,29.473573473174113,12.29945256507975,13.481880177761845,23.465938794305973,23.475239327211575,31.30485317751254,33.61062372271726,18.54726706187741,9.647296054266103,20.407515939305192,31.97509638110661,12.161816613975507,17.728378909802757,28.09781259871429,10.011346129154358,23.479015622889854,11.193648283806056,22.06648628813197,22.903399833859833,15.507646823315921,20.7034032472904,5.350905930797651,19.911331892934037,21.13238920137786,14.519211233000258,32.69479599642388,4.123316006649591,15.342630520594533,12.99972703802796,26.997559898066495,33.13723412630602,25.095127787029362,34.75980822543453,18.535259322812365,9.450628839830681,16.54368701247234,8.059742449155113,20.023939031149656,22.948485031314544,35.96395746940216,21.99672055903312,26.749079070779345,16.939306373616585,30.266075030513363,22.419914217382907,12.370823145522,22.493809379588114,34.815707708074534,35.531141037809434,25.21869376579098,26.660965342602125,17.521137374344086,8.65225554980665,17.77712857562996,25.113847696487014,12.148607521355164,24.058466290538732,19.562566348931924,23.19681362811424,9.509904305004747,22.20612306408529,24.569398580246784,16.90472629055602,13.615045888558006,19.186280563551726,31.73385521222748,24.911295290072538,31.232920373128245,16.206435999104514,15.605943798325402,9.634690372720165,14.61258847574244,17.269841113721032,19.47069297514396,2.488581971718755,12.836657036236776,34.991997817272164,25.504893181349,30.796616669945138,13.844472320955092,16.60537525879746,13.124125663082369,16.831425385946027,14.741012153574715,35.49141834455945,27.137632633282387,29.37892867266175,10.170508063238092,21.34418792585845,20.352601457087857,29.76194235717182,27.411865031923984,25.25980612699179,17.68613028495046,26.23250908066896,13.939294172597322,16.14983834189596,23.25128579197892,34.80771905425423,22.264871882323032,13.628299960027968,13.12450580408076,19.272310556377388,18.280566544739187,5.361359069132825,19.01326609819373,7.6412095677205505,28.451207156355945,11.036148303400783,30.64107114980291,25.763729769609263,12.018281812775369,22.936317526168818,33.39199225279275,19.85229807096743,18.139875231245995,23.19253863489221,24.08042839091633,18.922258643024286,21.355917977389574,20.471212950780068,20.49608901904602,25.99807682918566,24.73706074248043,11.062256756495191,29.84921252145062,13.52795188760254,25.816495429105075,12.779047738544916,17.739137792433098,1.9871069072585978,21.40517645677125,22.545080227988283,24.333801259532073,29.075004974949643,15.623173842309587,37.990861281363735,31.395170357924417,22.761985098119073,19.614351397568626,6.309597488554859,9.279350602659049,24.966170751168583,22.065729339838366,17.057357126229117,6.830060484390494,30.79410555550325,11.048518975875604,16.78950397031599,31.87322360364,27.048844934417076,14.202658183639475,11.148447335704006,7.192754090057338,18.337873896429606,27.532021463573848,31.482535667059228,11.89517608644945,24.84263561895917,24.298028249697666,17.12781047404767,20.169467529996844,23.463366134452365,23.961306814980276,32.59577919047132,24.49390805349207,14.324853586243801,7.971512340900517,16.514844183906344,8.659115349557457,25.60686531402358,12.110558791750595,9.988679791115501,7.8457410991654,16.033330353533614,22.095709700291902,10.90316369630306,12.92347129153069,32.079142315389255,18.191316561230142,12.090675962590783,15.052695119843097],"a":[1.2664989465391363,2.52194221700754,14.217830911586255,2.637511251406015,3.529768410959311,5.915963028072655,9.466743830133119,10.947067727607811,1.4858931099354322,4.155062504741225,15.961968119041906,16.915031383212664,2.31662350379112,5.816233817554051,19.434087119663932,5.325797807936379,16.110562666881314,0.319621004166164,13.751658149251998,3.5505265402972785,12.84164097364696,1.8515664367846174,2.682402027453179,6.005994230737661,9.441887202808479,1.2266524820181601,4.036264602415343,17.954799109869906,14.382695636826227,8.029986000695061,18.58719552962375,12.54288910693301,7.361191183492464,18.214222564736428,7.181393755564431,19.76565016569401,19.405170791370917,13.787759660707719,4.7355018939384275,14.09429946920941,9.492527424577615,8.723278155796933,3.1498192000632885,0.21450462384765778,14.627340658809832,8.765522113266302,4.956002261764807,14.043946537188772,4.523880265291673,2.3994056143806697,1.2464635782104994,0.242920867706502,7.417468701825074,18.073156288373056,10.988955588037612,11.7522720826598,8.411767535780044,2.049088872028557,8.894284487464631,2.540902514249801,0.26003213907486167,13.97057499221322,1.0539830700156116,4.5562067087793245,1.0000623894226157,19.19468102400003,18.137174045945045,8.388807299562773,6.315431267130536,15.684199907892546,1.1051093821809888,15.513305286255008,2.182428659316562,8.063719746262198,0.831082979420037,1.6555111423563984,8.048273587825431,7.632827218831388,15.031017109086138,5.35561180341384,14.479419687578542,12.300561673183083,9.734502699909093,18.843678091823985,10.726379022697756,0.1256303576998663,11.619668838999285,11.932931779485592,15.600583328371528,9.2699776585052,7.125522320618645,8.741651607753127,6.1942407920684905,3.010727632894379,5.864037484032409,10.563024880565802,4.78971236527451,12.66007475319618,8.637018579273509,10.43916951561648,4.279869136374064,3.925916277706838,2.63430958136333,2.026698241040168,0.7766150905385194,13.369434881504908,19.587205654245622,0.4612769199855027,10.514343962817696,10.035469713476811,6.790503729993564,4.254078378784687,10.608921816631582,7.557976860782469,16.10767623870219,17.915906300679968,8.789641888220864,18.616622849966827,15.583727518534726,10.141851672253367,19.800585508187737,7.560251929007995,4.607321722362365,12.727499682911404,14.192202027612941,13.806165245105504,7.9397630995540736,19.639972921898003,12.297219276526668,18.460983237690098,8.576020945405407,17.397330574796538,1.0399318485511921,3.253763880349667,9.69675392912913,0.9905176015811046,17.15476368090707,17.10986526954652,16.871593348284613,17.199783990573486,2.9882750112229584,3.3741556180772347,2.718400785524566,7.268021635529838,10.104818812309837,10.000163457425186,10.87565635855492,11.708224699121462,18.75446679830305,14.524659132890712,3.951321351447228,18.33382197671416,16.632464752908366,12.73899737932207,9.08734719978527,15.195566257031903,5.574019929689928,10.846775004191663,6.6868993721255165,13.787836164771324,7.83392447884971,5.122177495953735,1.2708618537411676,18.60284079517641,17.27788266469973,17.49238364270827,6.67963134866119,3.241345980641026,7.870632470304502,13.273023723619515,17.698650194769492,18.73137640287013,7.750252782158391,13.601048551499733,6.486045915882683,18.14719076246693,15.446608066419273,13.917722229811629,3.312198478290358,10.597296923197689,19.67364111075455,10.706700963767165,6.904845644693602,4.54827228384699,8.118758066811708,3.718257476547562,18.91452158245928,19.71596747149568,10.354993070597512,8.437381165881611,17.705750188002767,11.905448234633745,12.798636999510782,8.243698959050075,16.647325847248165,17.93802797758188,19.621495230451274,9.81711948172483,7.630678796514627,16.086673638653387,4.948675781767742,10.998643820841778,8.21179490569576,17.047813583258883,16.417393621802674,9.499366900410703,3.1598565201937134,6.625081562995554,14.760059191089665,1.1440469093560468,16.231540207407086,3.1902157563008293,3.7367210711133714,8.047418105767239,4.8746341574409024,18.36987922665664,4.202190997127273,8.45069885092768,12.948711910283324,14.609580992389969,8.632454749846662,13.18817763459931,16.150228623497945,3.013337143276149,8.228340935883999,13.178219443320863,16.569576612866676,2.496091345118412,6.148228565318838,8.440740769387869,6.15418523520332,18.915664778608672,14.070882009328054,2.1582363240599767,0.5868522289661282,13.317638288332144,8.333682193975562,18.980880884364485,2.462981672151918,2.0979633910767426,5.75652384889306,3.496725039486006,0.5102420399081797,12.690463158115563,15.357353844389653,3.139929737592948,4.217693907583713,7.377023581412461,1.828237135148294,0.21681684140968827,15.934709077161862,17.527561086739503,1.5105033531594225,3.7159127411447113,11.177359054284919,2.7237522402000014,6.421414003821115,3.725760832711713,2.7652315106585235,8.952774016397488,3.798034494998226,6.809395163300729,10.344258218203723,12.951322388292873,1.613944227144164,13.576979638904367,1.2612363914483238,9.316111937549096,6.872692711605266,2.8006212147934084,17.23878040388595,12.827237179970563,5.877776619733854,11.67905585067755,2.0103532334549445,2.5908622516612922,17.962574479040008,6.4827213710078535,5.46645547842441,17.536342580641694,16.348852185986505,18.743132365387154,13.269119936120104,13.803108321277819,19.674482476773434,10.068262633213942,2.7918161709499634,14.876876011815646,4.536695018192449,2.1060515270907,12.025233816012344,3.578632815481484,11.205878035836632,14.496567205975577,19.86641191521416,17.686325949886466,19.710982528091783,11.971010046663743,1.4975747247950588,17.46950083497616,17.11877464900708,3.7916605110615142,11.069042502229816,15.460216908046135,19.219825488716996,19.669292847388718,6.176634052020469,14.531002130434892,17.937415333742766,15.835261822454413,0.267215266764782,13.964520437792238,6.685329590287088,5.347210363002661,0.7582415865934422,10.859329277329849,18.664565188443238,0.6208295192445901,11.395727090489176,12.864813050143749,6.241945095637607,0.08142365763577075,4.326505857786596,13.415408376124013,2.4638652686146223,12.543418868347489,18.769158921565197,10.200520855832217,1.623939848569247,13.40213100626877,6.028134722028815,4.374195831941585,7.495172488114115,10.464047196684806,18.311790140939493,14.209404940888199,4.581049501102656,3.393931680952087,16.949746084031425,11.393103474705137,5.517340292237671,6.5166273382289175,0.6731423015743632,18.51926767625917,6.372910857121075,3.346978894953443,8.151340554716136,14.56368065657902,1.5546444782880986,17.928157419355845,6.439786613358649,9.817806878175265,3.528035798107876,19.477943240616966,1.7266167271895316,17.503501265688826,6.127291486748061,7.64570593863966,18.888330461026523,11.636119627920408,18.77008509817751,3.471205915256479,9.684527129647513,9.30509101307642,10.783665274425998,3.822584303201859,6.519316763539962,14.533203265816134,13.241913646766864,6.907865907579569,9.095638263321435,18.449189017557597,10.570264661622835,1.058259408417559,4.794702036476157,7.347862895787545,17.735004133243724,5.753496848267434,18.357479148506982,11.543703785201146,16.762904994209322,13.338827220754998,17.00868672953427,3.962460701402306,4.685907297623131,11.403132393928491,9.42118583704264,6.958769781041387,9.544177511586188,15.32051841645545,13.293891200304643,4.844238942344954,11.006568642058362,6.292936154244142,8.66119868099557,9.678618286221422,6.121386681066805,5.997256314657742,10.281643172525738,4.474311961291919,17.756886654596276,1.3675873239978698,4.610004726646384,14.000141625189455,2.3625563194761057,1.3588203735603166,18.308689534582022,1.677697666540876,13.494602532951031,8.628347503301788,5.7326856597480935,0.947462457752084,14.41700726021744,0.035873667596213465,9.445718349363691,12.260169058671512,4.971999076992342,10.660589979392054,15.683594610617785,12.733538780929736,18.096873137752073,9.715634503306823,2.6319699115486106,6.083574135354737,14.346251693947938,13.02730850113237,1.4823847799229295,14.384743452573922,8.01044314987755,10.598964582283186,18.713968600936084,7.1035784210648245,18.92896021874116,5.744632306950872,8.87204766731568,7.315355126256624,2.896866367353792,1.3263009510847157,18.57507803642921,14.789328658654055,8.709882323703999,17.52316239269406,15.570680202257531,2.0003194314649075,16.286646373765798,8.02613784991669,17.88156986990029,15.108969327371366,15.232957962885019,1.6569583295501111,15.011121581731555,7.233643050080847,11.670374928345218,6.670297993718677,4.902539735552143,2.61253033287816,3.164634024323658,3.8523344920052827,15.675657130480122,19.318248540796702,16.638497118946624,15.21152265349361,1.6541333021780869,4.520043819443438,18.26650496252711,0.2765539418610796,5.350567168713902,12.994452440375417,1.6235665788726727,4.997959557479286,1.4524528269098136,1.4202960132803266,15.950009559105842,1.4565175121916019,8.360832495488268,7.062195404121168,17.953073830141317,6.780211718671052,6.491711030600751,1.6410646200458912,12.150030268638737,14.838834809978888,3.053637541888228,15.225278278859165,6.914086420108854,1.2146335393333452,18.340124553298157,1.8406785490890565,5.001416397950416,5.840156095011233,10.10587701530062,17.270000604746354,14.452229793781669,1.5745266282392345,10.947129580094007,13.515650798957225,8.900525260286965,16.31161233109248,2.22578195661296,8.514675045742909,18.12951992335853,1.9026560373959533,17.336455122300652,11.568600281036838,3.79795665101772,5.83278098079786,15.778403914743562,11.120493852583241,18.553417731966157,16.15945696181455,19.513556794597804,19.4363239762802,17.590717193999378,4.502020383709158,14.224349011610835,12.443395393125773,14.386074513955847,10.197062500283716,2.626911316147309,14.328328665065442,8.88201808557735,7.606843249374542,8.224845161815551,14.452821548534178,11.094588128771479,9.621227106027286,5.068696170656075,2.7553021734171024,19.173559235007897,2.637655112929922,10.77826092182239,5.445178191359852,16.946562021754552,16.154841590976076,19.968263667564607,5.981414136500645,9.075663624624827,1.9558209537791926,7.0595130416217655,0.6618533477608102,18.195347145133187,10.234761706853583,4.907425828705323,17.458485356340447,17.68255940701547,0.5576068100806131,7.056076271805489,12.893678163362017,3.606116338271592,9.714900862690602,6.568335300006702,19.242413288175012,8.861716476911363,4.527874047410156,13.648384879633198,2.364399871938554,5.896205385427522,17.885870938022382,0.45984210386344593,6.288575992813801,15.250758989240417,10.914994068414536,5.616573746567415,18.486482877061817,10.43790725803528,5.342361346226654,11.29271210559397,8.02015276836725,8.745785953235972,0.654466706254011,6.149089141429425,11.517010922357604,16.330048899325433,6.452749433970073,7.571051355418237,18.035329713212455,5.666006801082792,0.5600864309256082,13.590279899284937,13.621720561394849,8.578479055896207,1.3080805110260485,11.726111882967526,4.34201231823681,4.4057718427034676,10.114726360522965,15.31614883895028,18.882915461665263,15.977845352125982,17.016749339244406,7.130473469604772,3.2796039332948856,17.78415329484549,19.318928146495136,11.886929348765918,19.36776872063174,2.0645604559414776,11.539063143429974,15.910920639481327,7.173508613550328,15.209175984128397,15.690865261776285,7.116014269148967,10.918313767404815,3.443690602979257,4.866194252755522,2.0545949452633128,19.840554544463895,6.03835772911443,14.949925865540251,18.959942261378828,19.242920137452447,16.05981166996964,10.658744097908377,14.966703282538596,9.715761314072186,7.290613422642123,18.05304800008079,16.157893630970015,13.158670807251092,16.573548860535485,14.10419180091183,13.530464995620477,14.964894219802979,12.990961053427839,12.789475477917112,17.097376745019336,12.108600249859371,13.719236541410451,4.207216798351938,13.910911147173145,6.728133090635642,14.37855301694217,0.38095753351214956,0.23315901913317116,16.70149082761209,18.697953645525036,14.652684528338998,11.871847169934213,5.908750892893564,9.041802283148975,8.446719609172595,8.754185354531998,9.352085763818248,19.738925405993886,15.547785755726737,4.436672222234375,16.199386309251054,13.11861189910899,16.21011302881701,12.900367029346658,10.739427953802792,15.397576132567888,16.44997620262689,13.736008598776808,6.25927025930392,12.73731953593964,8.357289194959506,18.357050258509503,10.552090933195677,17.63695510758753,0.5670849804574551,17.72646785782648,2.0450248520922942,2.702084927606534,0.0585804488950048,7.926057400126791,6.076680726254535,15.74192663701016,8.034753735600324,3.4717092757339563,11.72322314517183,18.169480129776897,19.910570776711282,2.0027327188145305,17.244579476559203,4.004561741963308,10.477344855563743,19.66637025062557,5.729576670571839,17.730540240537,15.530893977688951,4.533429130729245,17.539611666470655,4.209845342544751,17.332450976882193,6.655872135361274,10.432490909598467,10.148865319198794,8.265558636697254,4.210390764857941,18.549420325480583,3.093570807834034,1.8493396733986556,9.310282548936165,19.462005926293426,17.450178264431297,18.114124189588562,1.2187745526413263,10.188345584914922,9.306360449072045,9.618399827818717,5.769390750348169,1.5418158516542046,17.509487587074474,14.445705543494242,2.6676908941787847,4.202069495549621,14.185428845069389,2.6674309039318578,2.507139307080135,0.6985344756842515,3.32754502691869,17.442286100599258,13.190593162544616,11.340473444402948,14.748699210507583,12.945263635595783,2.237092000431322,18.694352783423543,1.7373009231111602,17.16014527978888,7.946121134137245,8.93722457907623,17.909691000966923,18.691920322213797,13.558485345287664,16.756497469664176,6.706687309122472,0.290679872673425,16.651780074349478,7.936914225982785,6.10206491445723,10.91471798375251,12.875450326487638,13.639205448648317,2.7713365984498406,19.927259670397206,16.584839608055294,2.376010473977357,11.812328197146385,17.679771319752025,13.834107106632576,16.904145840264448,12.69576150644561,6.666567595620196,19.853574029669403,9.267167096989684,19.471216570414338,1.1874413019717611,15.551773993068952,18.292950238079165,14.168544588697856,2.6640895384517105,8.26530358931095,8.788605816297377,14.603934208307612,19.84639949354541,12.214445617455967,16.03261961200685,9.295194902106925,12.337954412337094,13.507015626672004,13.227006640267117,16.864314085817735,17.170926582069118,1.5682207555276273,6.068449585666751,12.996180616171443,10.275463662174458,13.971752905306051,9.313009962189378,5.931904959332983,5.553546933478719,5.24614749398383,0.7920634319443831,10.769614777269055,11.155438481849028,17.804648103658764,4.940721475157659,7.585254258103058,16.194610539287044,15.254867726045918,0.37214904260804094,4.424590099073633,11.648805170816892,11.502900665291342,1.6426157027457977,10.825503668971418,2.7254628440159845,2.6555160415734846,16.23968068891294,7.781810376097473,19.95259730931405,5.62937398682215,10.51751328318231,18.934898253764185,1.7998781553305498,13.19322269919413,14.526258639599302,12.739619464570847,13.677834627413038,12.672990953880188,7.087374462828566,4.701115364138295,17.720171124339238,0.809958530716246,15.681550583272333,11.852599955277686,13.311460978993551,2.3155008477009664,8.764567597959307,3.2874992013584547,7.988031579592283,1.1599522892130887,16.629566113211126,18.005377390743238,9.758805604896338,16.870049509220276,6.5668386935321355,7.520813051163726,18.11029083340732,5.693656009161856,19.515504090973728,18.34066457235298,8.680763335511838,2.0209495375374376,3.523725352666389,19.375311110954023,5.7952162315949085,9.431970760023694,9.087890967645244,2.1816066173034354,9.93972262107857,6.51995947735835,6.093031990991604,17.468538947120493,0.1120772268666137,10.284165949079247,2.6586139622614624,2.9603282826630872,4.614229263669638,6.889367080113109,14.402265891138892,3.951958420106183,15.247726450401595,11.361219141960506,9.773515794393344,13.823892743248386,10.011467405143488,17.368207667447052,12.345893313806435,4.355801542183397,6.603374232427348,2.0702685695049317,17.967105613508462,13.530954793928856,17.651131862706823,6.174625658025428,15.308452473341001,9.109430777845212,10.862101409879589,13.864194629758263,12.204068235601358,17.7837963468053,16.763071001834007,18.934658280790497,7.251410462263381,18.410191826622274,8.245342245998447,6.912369309785533,3.79707015293421,19.796744351909656,3.8862484244239592,8.814832984278436,12.739823619492011,16.98710605008477,0.7858968901523422,4.310393023687951,13.429829684774726,14.47261773706999,5.377028639267447,3.3754421278796976,12.862096086676953,7.2378377030832075,17.592963475707823,5.492135158052447,9.396989817160005,7.9446571001379285,9.563140896873929,8.785273652214642,15.921348577248772,2.3396181771051605,2.689214916516125,18.062882972883152,14.660472886397656,11.361959087530536,4.545574254028519,10.591128120839613,12.151116585971407,14.073561124018003,0.4339665965494177,19.274443313928668,10.039774211716178,14.113837060580714,1.688138926469196,6.006442367433076,5.259164514872685,11.773421977318407,16.81596814020361,7.2001257830474374,4.260724227108623,19.135084085974277,3.9174126653161068,2.4007060423004,4.775538860079327,15.738527801475799,6.0689697154436395,13.092939308164798,5.108369132360293,4.0746968559374075,7.194740171751577,1.0123834784266084,4.036658895302541,0.5029172127648751,10.787784933703222,6.338955401115971,15.06814543636735,14.967678961680178,1.6783140424311505,4.259953458325181,14.897309033591117,14.09894504127986,10.889546625117674,14.25808515236374,6.1235190303186116,4.742801911891807,8.324018166865343,5.673408419977393,2.8967742675016295,10.49821529039297,11.521536520520957,1.4377103491644538,17.19477077606001,2.4466344789103855,19.170468859244643,9.846629771094083,9.974733305134942,1.8961931580116165,8.010847043424283,15.947466194739587,19.760511937245745,16.324759977829345,2.806820021200731,18.29614183551096,15.153322677914627,9.662325641478965,3.595579358470844,1.9816467344564082,5.124536000660478,5.85169041035674,6.160094881249019,12.857919541119497,6.568851964682447,16.052209835624897,1.6116467550565527,15.680800127001886,17.407908704942663,7.782318215958126,7.250626518354806,4.031284986083841,2.518629343294645,2.120937139778545,19.193839131754356,19.258803013144366,1.9762465909395344,9.555083093803734,7.633001446267285,16.55248661692361,6.561853734825496,10.86171072894829,7.599097756576674,13.266901973533077,9.77060865015606,12.582794885998435,1.7026277218720054,13.48765319059587,0.8886632096314884,7.125613774411668,6.115461431140319,5.042736229125109,6.329892833766797,2.6670940872713533,10.272426604317957,0.6452860251259906,4.882162425627676,19.057853206300383,11.404624057196626,2.4882722227649223,3.9485926409987604]}

},{}],55:[function(require,module,exports){
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
	var cdf = factory( 0.0, 1.0 );
	t.equal( typeof cdf, 'function', 'returns a function' );
	t.end();
});

tape( 'if provided `NaN` for any parameter, the created function returns `NaN`', function test( t ) {
	var cdf;
	var y;

	cdf = factory( 0.0, 1.0 );
	y = cdf( NaN );
	t.equal( isnan( y ), true, 'returns NaN' );

	cdf = factory( NaN, 1.0 );
	y = cdf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	cdf = factory( 1.0, NaN );
	y = cdf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	cdf = factory( NaN, NaN );
	y = cdf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	cdf = factory( NaN, NaN );
	y = cdf( NaN );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'if provided a finite `a` and `b`, the function returns a function which returns `1` when provided `+infinity` for `x`', function test( t ) {
	var cdf;
	var y;

	cdf = factory( 0.0, 1.0 );
	y = cdf( PINF );
	t.equal( y, 1.0, 'returns 1' );

	t.end();
});

tape( 'if provided a finite `a` and `b`, the function returns a function which returns `0` when provided `-infinity` for `x`', function test( t ) {
	var cdf;
	var y;

	cdf = factory( 0, 1.0 );
	y = cdf( NINF );
	t.equal( y, 0.0, 'returns 0' );

	t.end();
});

tape( 'if provided a `a >= b`, the created function always returns `NaN`', function test( t ) {
	var cdf;
	var y;

	cdf = factory( 2.0, 1.0 );

	y = cdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = cdf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	cdf = factory( 0.0, NINF );
	y = cdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	cdf = factory( PINF, NINF );
	y = cdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	cdf = factory( NINF, NINF );
	y = cdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	cdf = factory( -1.0, -2.0 );
	y = cdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'the created function evaluates the cdf for `x` given a small range `b - a`', function test( t ) {
	var expected;
	var delta;
	var cdf;
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
		cdf = factory( a[i], b[i] );
		y = cdf( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', a: '+a[i]+', b: '+b[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 2.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. a: '+a[i]+'. b: '+b[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the created function evaluates the cdf for `x` given a medium range `b - a`', function test( t ) {
	var expected;
	var delta;
	var cdf;
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
		cdf = factory( a[i], b[i] );
		y = cdf( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', a: '+a[i]+', b: '+b[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 2.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. a: '+a[i]+'. b: '+b[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the created function evaluates the cdf for `x` given a large range `b - a`', function test( t ) {
	var expected;
	var delta;
	var cdf;
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
		cdf = factory( a[i], b[i] );
		y = cdf( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', a: '+a[i]+', b: '+b[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 2.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. a: '+a[i]+'. b: '+b[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

}).call(this)}).call(this,"/lib/node_modules/@stdlib/stats/base/dists/arcsine/cdf/test/test.factory.js")
},{"./../lib/factory.js":49,"./fixtures/julia/large_range.json":52,"./fixtures/julia/medium_range.json":53,"./fixtures/julia/small_range.json":54,"@stdlib/constants/float64/eps":27,"@stdlib/constants/float64/ninf":29,"@stdlib/constants/float64/pinf":31,"@stdlib/math/base/assert/is-nan":32,"@stdlib/math/base/special/abs":34,"tape":233}],56:[function(require,module,exports){
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
var cdf = require( './../lib' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.strictEqual( typeof cdf, 'function', 'main export is a function' );
	t.end();
});

tape( 'attached to the main export is a factory method for generating `cdf` functions', function test( t ) {
	t.equal( typeof cdf.factory, 'function', 'exports a factory method' );
	t.end();
});

}).call(this)}).call(this,"/lib/node_modules/@stdlib/stats/base/dists/arcsine/cdf/test/test.js")
},{"./../lib":50,"tape":233}],57:[function(require,module,exports){
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
var cdf = require( './../lib' );


// FIXTURES //

var smallRange = require( './fixtures/julia/small_range.json' );
var mediumRange = require( './fixtures/julia/medium_range.json' );
var largeRange = require( './fixtures/julia/large_range.json' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.strictEqual( typeof cdf, 'function', 'main export is a function' );
	t.end();
});

tape( 'if provided `NaN` for any parameter, the function returns `NaN`', function test( t ) {
	var y = cdf( NaN, 0.0, 1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );
	y = cdf( 0.0, NaN, 1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );
	y = cdf( 0.0, 1.0, NaN );
	t.equal( isnan( y ), true, 'returns NaN' );
	t.end();
});

tape( 'if provided `+infinity` for `x` and a valid `a` and `b`, the function returns `1`', function test( t ) {
	var y = cdf( PINF, 0.5, 1.0 );
	t.equal( y, 1.0, 'returns 1' );
	t.end();
});

tape( 'if provided `-infinity` for `x` and a valid `a` and `b`, the function returns `0`', function test( t ) {
	var y = cdf( NINF, 0.5, 1.0 );
	t.equal( y, 0.0, 'returns 0' );
	t.end();
});

tape( 'if provided `a >= b`, the function returns `NaN`', function test( t ) {
	var y;

	y = cdf( 2.0, -1.0, -1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = cdf( 0.0, 3.0, 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = cdf( 0.0, 0.0, 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = cdf( 0.0, -0.5, -1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'the function evaluates the cdf for `x` given a small range `b - a`', function test( t ) {
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
		y = cdf( x[i], a[i], b[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', a: '+a[i]+', b: '+b[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 2.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. a: '+a[i]+'. b: '+b[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the function evaluates the cdf for `x` given a medium range `b - a`', function test( t ) {
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
		y = cdf( x[i], a[i], b[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', a: '+a[i]+', b: '+b[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 2.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. a: '+a[i]+'. b: '+b[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the function evaluates the cdf for `x` given a large range `b - a`', function test( t ) {
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
		y = cdf( x[i], a[i], b[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', a: '+a[i]+', b: '+b[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 2.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. a: '+a[i]+'. b: '+b[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

}).call(this)}).call(this,"/lib/node_modules/@stdlib/stats/base/dists/arcsine/cdf/test/test.main.js")
},{"./../lib":50,"./fixtures/julia/large_range.json":52,"./fixtures/julia/medium_range.json":53,"./fixtures/julia/small_range.json":54,"@stdlib/constants/float64/eps":27,"@stdlib/constants/float64/ninf":29,"@stdlib/constants/float64/pinf":31,"@stdlib/math/base/assert/is-nan":32,"@stdlib/math/base/special/abs":34,"tape":233}],58:[function(require,module,exports){
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

var cdf = tryRequire( resolve( __dirname, './../lib/native.js' ) );
var opts = {
	'skip': ( cdf instanceof Error )
};


// TESTS //

tape( 'main export is a function', opts, function test( t ) {
	t.ok( true, __filename );
	t.strictEqual( typeof cdf, 'function', 'main export is a function' );
	t.end();
});

tape( 'if provided `NaN` for any parameter, the function returns `NaN`', opts, function test( t ) {
	var y = cdf( NaN, 0.0, 1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );
	y = cdf( 0.0, NaN, 1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );
	y = cdf( 0.0, 1.0, NaN );
	t.equal( isnan( y ), true, 'returns NaN' );
	t.end();
});

tape( 'if provided `+infinity` for `x` and a valid `a` and `b`, the function returns `1`', opts, function test( t ) {
	var y = cdf( PINF, 0.5, 1.0 );
	t.equal( y, 1.0, 'returns 1' );
	t.end();
});

tape( 'if provided `-infinity` for `x` and a valid `a` and `b`, the function returns `0`', opts, function test( t ) {
	var y = cdf( NINF, 0.5, 1.0 );
	t.equal( y, 0.0, 'returns 0' );
	t.end();
});

tape( 'if provided `a >= b`, the function returns `NaN`', opts, function test( t ) {
	var y;

	y = cdf( 2.0, -1.0, -1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = cdf( 0.0, 3.0, 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = cdf( 0.0, 0.0, 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = cdf( 0.0, -0.5, -1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'the function evaluates the cdf for `x` given a small range `b - a`', opts, function test( t ) {
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
		y = cdf( x[i], a[i], b[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', a: '+a[i]+', b: '+b[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 2.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. a: '+a[i]+'. b: '+b[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the function evaluates the cdf for `x` given a medium range `b - a`', opts, function test( t ) {
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
		y = cdf( x[i], a[i], b[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', a: '+a[i]+', b: '+b[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 2.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. a: '+a[i]+'. b: '+b[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the function evaluates the cdf for `x` given a large range `b - a`', opts, function test( t ) {
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
		y = cdf( x[i], a[i], b[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', a: '+a[i]+', b: '+b[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 2.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. a: '+a[i]+'. b: '+b[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

}).call(this)}).call(this,"/lib/node_modules/@stdlib/stats/base/dists/arcsine/cdf/test/test.native.js","/lib/node_modules/@stdlib/stats/base/dists/arcsine/cdf/test")
},{"./fixtures/julia/large_range.json":52,"./fixtures/julia/medium_range.json":53,"./fixtures/julia/small_range.json":54,"@stdlib/constants/float64/eps":27,"@stdlib/constants/float64/ninf":29,"@stdlib/constants/float64/pinf":31,"@stdlib/math/base/assert/is-nan":32,"@stdlib/math/base/special/abs":34,"@stdlib/utils/try-require":101,"path":115,"tape":233}],59:[function(require,module,exports){
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

},{"./is_number.js":62}],60:[function(require,module,exports){
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

},{"./is_number.js":62,"./zero_pad.js":66}],61:[function(require,module,exports){
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

},{"./main.js":64}],62:[function(require,module,exports){
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

},{}],63:[function(require,module,exports){
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

},{"./format_double.js":59,"./format_integer.js":60,"./is_string.js":63,"./space_pad.js":65,"./zero_pad.js":66}],65:[function(require,module,exports){
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

},{}],66:[function(require,module,exports){
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

},{"./main.js":68}],68:[function(require,module,exports){
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

},{}],69:[function(require,module,exports){
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

},{"./main.js":71}],70:[function(require,module,exports){
arguments[4][63][0].apply(exports,arguments)
},{"dup":63}],71:[function(require,module,exports){
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

},{"./is_string.js":70,"@stdlib/string/base/format-interpolate":61,"@stdlib/string/base/format-tokenize":67}],72:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

// MAIN //

var Sym = ( typeof Symbol === 'function' ) ? Symbol : void 0; // eslint-disable-line stdlib/require-globals


// EXPORTS //

module.exports = Sym;

},{}],74:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./main.js":75}],75:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./main.js":77}],77:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"@stdlib/assert/is-buffer":15,"@stdlib/regexp/function-name":46,"@stdlib/utils/native-class":96}],78:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./main.js":79}],79:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"@stdlib/utils/define-property":83}],80:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],81:[function(require,module,exports){
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

},{}],82:[function(require,module,exports){
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

},{"./define_property.js":81}],83:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./builtin.js":80,"./has_define_property_support.js":82,"./polyfill.js":84}],84:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
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

},{"@stdlib/string/format":69}],85:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./native.js":88,"./polyfill.js":89,"@stdlib/assert/is-function":19}],86:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./main.js":87}],87:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./detect.js":85,"@stdlib/object/ctor":44}],88:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./proto.js":90,"@stdlib/utils/native-class":96}],90:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],91:[function(require,module,exports){
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

},{"./codegen.js":92,"./global_this.js":93,"./self.js":94,"./window.js":95,"@stdlib/assert/is-boolean":9,"@stdlib/string/format":69}],92:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],93:[function(require,module,exports){
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

// MAIN //

var obj = ( typeof self === 'object' ) ? self : null;


// EXPORTS //

module.exports = obj;

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

// MAIN //

var obj = ( typeof window === 'object' ) ? window : null;


// EXPORTS //

module.exports = obj;

},{}],96:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./main.js":97,"./polyfill.js":98,"@stdlib/assert/has-tostringtag-support":5}],97:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./tostring.js":99}],98:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./tostring.js":99,"./tostringtag.js":100,"@stdlib/assert/has-own-property":1}],99:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

// MODULES //

var Symbol = require( '@stdlib/symbol/ctor' );


// MAIN //

var toStrTag = ( typeof Symbol === 'function' ) ? Symbol.toStringTag : '';


// EXPORTS //

module.exports = toStrTag;

},{"@stdlib/symbol/ctor":72}],101:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./main.js":102}],102:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"@stdlib/assert/is-error":17}],103:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./fixtures/nodelist.js":104,"./fixtures/re.js":105,"./fixtures/typedarray.js":106}],104:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"@stdlib/utils/global":91}],105:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

var typedarray = Int8Array; // eslint-disable-line stdlib/require-globals


// EXPORTS //

module.exports = typedarray;

},{}],107:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./check.js":103,"./main.js":108,"./polyfill.js":109}],108:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"@stdlib/utils/constructor-name":76}],109:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"@stdlib/utils/constructor-name":76}],110:[function(require,module,exports){
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

},{}],111:[function(require,module,exports){

},{}],112:[function(require,module,exports){
arguments[4][111][0].apply(exports,arguments)
},{"dup":111}],113:[function(require,module,exports){
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
},{"base64-js":110,"buffer":113,"ieee754":216}],114:[function(require,module,exports){
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

},{}],115:[function(require,module,exports){
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
},{"_process":223}],116:[function(require,module,exports){
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

},{"events":114,"inherits":217,"readable-stream/lib/_stream_duplex.js":118,"readable-stream/lib/_stream_passthrough.js":119,"readable-stream/lib/_stream_readable.js":120,"readable-stream/lib/_stream_transform.js":121,"readable-stream/lib/_stream_writable.js":122,"readable-stream/lib/internal/streams/end-of-stream.js":126,"readable-stream/lib/internal/streams/pipeline.js":128}],117:[function(require,module,exports){
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

},{}],118:[function(require,module,exports){
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
},{"./_stream_readable":120,"./_stream_writable":122,"_process":223,"inherits":217}],119:[function(require,module,exports){
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
},{"./_stream_transform":121,"inherits":217}],120:[function(require,module,exports){
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
},{"../errors":117,"./_stream_duplex":118,"./internal/streams/async_iterator":123,"./internal/streams/buffer_list":124,"./internal/streams/destroy":125,"./internal/streams/from":127,"./internal/streams/state":129,"./internal/streams/stream":130,"_process":223,"buffer":113,"events":114,"inherits":217,"string_decoder/":232,"util":111}],121:[function(require,module,exports){
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
},{"../errors":117,"./_stream_duplex":118,"inherits":217}],122:[function(require,module,exports){
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
},{"../errors":117,"./_stream_duplex":118,"./internal/streams/destroy":125,"./internal/streams/state":129,"./internal/streams/stream":130,"_process":223,"buffer":113,"inherits":217,"util-deprecate":241}],123:[function(require,module,exports){
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
},{"./end-of-stream":126,"_process":223}],124:[function(require,module,exports){
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
},{"buffer":113,"util":111}],125:[function(require,module,exports){
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
},{"_process":223}],126:[function(require,module,exports){
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
},{"../../../errors":117}],127:[function(require,module,exports){
module.exports = function () {
  throw new Error('Readable.from is not available in the browser')
};

},{}],128:[function(require,module,exports){
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
},{"../../../errors":117,"./end-of-stream":126}],129:[function(require,module,exports){
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
},{"../../../errors":117}],130:[function(require,module,exports){
module.exports = require('events').EventEmitter;

},{"events":114}],131:[function(require,module,exports){
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

},{"./":132,"get-intrinsic":207}],132:[function(require,module,exports){
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

},{"es-define-property":192,"es-errors/type":198,"function-bind":206,"get-intrinsic":207,"set-function-length":227}],133:[function(require,module,exports){
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

},{"./lib/is_arguments.js":134,"./lib/keys.js":135}],134:[function(require,module,exports){
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

},{}],135:[function(require,module,exports){
exports = module.exports = typeof Object.keys === 'function'
  ? Object.keys : shim;

exports.shim = shim;
function shim (obj) {
  var keys = [];
  for (var key in obj) keys.push(key);
  return keys;
}

},{}],136:[function(require,module,exports){
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

},{"es-define-property":192,"es-errors/syntax":197,"es-errors/type":198,"gopd":208}],137:[function(require,module,exports){
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

},{"define-data-property":136,"has-property-descriptors":209,"object-keys":221}],138:[function(require,module,exports){
module.exports = function () {
    for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] !== undefined) return arguments[i];
    }
};

},{}],139:[function(require,module,exports){
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

},{"./ToNumber":170,"./ToPrimitive":172,"./Type":177}],140:[function(require,module,exports){
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

},{"../helpers/isFinite":185,"../helpers/isNaN":186,"../helpers/isPrefixOf":187,"./ToNumber":170,"./ToPrimitive":172,"es-errors/type":198,"get-intrinsic":207}],141:[function(require,module,exports){
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

},{"call-bind/callBound":131,"es-errors/type":198}],142:[function(require,module,exports){
'use strict';

var RequireObjectCoercible = require('es-object-atoms/RequireObjectCoercible');

// http://262.ecma-international.org/5.1/#sec-9.10

module.exports = function CheckObjectCoercible(value) {
	return RequireObjectCoercible(value, arguments.length > 1 ? arguments[1] : void undefined);
};

},{"es-object-atoms/RequireObjectCoercible":200}],143:[function(require,module,exports){
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

},{"./DayWithinYear":146,"./InLeapYear":150,"./MonthFromTime":160,"es-errors/eval":193}],144:[function(require,module,exports){
'use strict';

var floor = require('./floor');

var msPerDay = require('../helpers/timeConstants').msPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.2

module.exports = function Day(t) {
	return floor(t / msPerDay);
};

},{"../helpers/timeConstants":191,"./floor":181}],145:[function(require,module,exports){
'use strict';

var floor = require('./floor');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

module.exports = function DayFromYear(y) {
	return (365 * (y - 1970)) + floor((y - 1969) / 4) - floor((y - 1901) / 100) + floor((y - 1601) / 400);
};


},{"./floor":181}],146:[function(require,module,exports){
'use strict';

var Day = require('./Day');
var DayFromYear = require('./DayFromYear');
var YearFromTime = require('./YearFromTime');

// https://262.ecma-international.org/5.1/#sec-15.9.1.4

module.exports = function DayWithinYear(t) {
	return Day(t) - DayFromYear(YearFromTime(t));
};

},{"./Day":144,"./DayFromYear":145,"./YearFromTime":179}],147:[function(require,module,exports){
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

},{"./modulo":182}],148:[function(require,module,exports){
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

},{"../helpers/records/property-descriptor":189,"./IsAccessorDescriptor":151,"./IsDataDescriptor":153,"es-errors/type":198}],149:[function(require,module,exports){
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

},{"../helpers/timeConstants":191,"./floor":181,"./modulo":182}],150:[function(require,module,exports){
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

},{"./DaysInYear":147,"./YearFromTime":179,"es-errors/eval":193}],151:[function(require,module,exports){
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

},{"../helpers/records/property-descriptor":189,"es-errors/type":198,"hasown":215}],152:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.11

module.exports = require('is-callable');

},{"is-callable":218}],153:[function(require,module,exports){
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

},{"../helpers/records/property-descriptor":189,"es-errors/type":198,"hasown":215}],154:[function(require,module,exports){
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

},{"./IsAccessorDescriptor":151,"./IsDataDescriptor":153,"./IsPropertyDescriptor":155,"es-errors/type":198}],155:[function(require,module,exports){
'use strict';

// TODO, semver-major: delete this

var isPropertyDescriptor = require('../helpers/records/property-descriptor');

// https://262.ecma-international.org/6.0/#sec-property-descriptor-specification-type

module.exports = function IsPropertyDescriptor(Desc) {
	return isPropertyDescriptor(Desc);
};

},{"../helpers/records/property-descriptor":189}],156:[function(require,module,exports){
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

},{"../helpers/isFinite":185,"../helpers/timeConstants":191}],157:[function(require,module,exports){
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

},{"../helpers/isFinite":185,"./DateFromTime":143,"./Day":144,"./MonthFromTime":160,"./ToInteger":169,"./YearFromTime":179,"./floor":181,"./modulo":182,"get-intrinsic":207}],158:[function(require,module,exports){
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

},{"../helpers/isFinite":185,"../helpers/timeConstants":191,"./ToInteger":169}],159:[function(require,module,exports){
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

},{"../helpers/timeConstants":191,"./floor":181,"./modulo":182}],160:[function(require,module,exports){
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

},{"./DayWithinYear":146,"./InLeapYear":150}],161:[function(require,module,exports){
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

},{"../helpers/isNaN":186}],162:[function(require,module,exports){
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

},{"../helpers/timeConstants":191,"./floor":181,"./modulo":182}],163:[function(require,module,exports){
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

},{"./Type":177}],164:[function(require,module,exports){
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


},{"../helpers/isFinite":185,"./ToNumber":170,"./abs":180,"get-intrinsic":207}],165:[function(require,module,exports){
'use strict';

var msPerDay = require('../helpers/timeConstants').msPerDay;

var DayFromYear = require('./DayFromYear');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

module.exports = function TimeFromYear(y) {
	return msPerDay * DayFromYear(y);
};

},{"../helpers/timeConstants":191,"./DayFromYear":145}],166:[function(require,module,exports){
'use strict';

var modulo = require('./modulo');

var msPerDay = require('../helpers/timeConstants').msPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.2

module.exports = function TimeWithinDay(t) {
	return modulo(t, msPerDay);
};


},{"../helpers/timeConstants":191,"./modulo":182}],167:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.2

module.exports = function ToBoolean(value) { return !!value; };

},{}],168:[function(require,module,exports){
'use strict';

var ToNumber = require('./ToNumber');

// http://262.ecma-international.org/5.1/#sec-9.5

module.exports = function ToInt32(x) {
	return ToNumber(x) >> 0;
};

},{"./ToNumber":170}],169:[function(require,module,exports){
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

},{"../helpers/isFinite":185,"../helpers/isNaN":186,"../helpers/sign":190,"./ToNumber":170,"./abs":180,"./floor":181}],170:[function(require,module,exports){
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

},{"./ToPrimitive":172,"call-bind/callBound":131,"safe-regex-test":226}],171:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.9

module.exports = require('es-object-atoms/ToObject');

},{"es-object-atoms/ToObject":201}],172:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.1

module.exports = require('es-to-primitive/es5');

},{"es-to-primitive/es5":203}],173:[function(require,module,exports){
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

},{"./IsCallable":152,"./ToBoolean":167,"./Type":177,"es-errors/type":198,"hasown":215}],174:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $String = GetIntrinsic('%String%');

// http://262.ecma-international.org/5.1/#sec-9.8

module.exports = function ToString(value) {
	return $String(value);
};


},{"get-intrinsic":207}],175:[function(require,module,exports){
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

},{"../helpers/isFinite":185,"../helpers/isNaN":186,"../helpers/sign":190,"./ToNumber":170,"./abs":180,"./floor":181,"./modulo":182}],176:[function(require,module,exports){
'use strict';

var ToNumber = require('./ToNumber');

// http://262.ecma-international.org/5.1/#sec-9.6

module.exports = function ToUint32(x) {
	return ToNumber(x) >>> 0;
};

},{"./ToNumber":170}],177:[function(require,module,exports){
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

},{}],178:[function(require,module,exports){
'use strict';

var Day = require('./Day');
var modulo = require('./modulo');

// https://262.ecma-international.org/5.1/#sec-15.9.1.6

module.exports = function WeekDay(t) {
	return modulo(Day(t) + 4, 7);
};

},{"./Day":144,"./modulo":182}],179:[function(require,module,exports){
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

},{"call-bind/callBound":131,"get-intrinsic":207}],180:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $abs = GetIntrinsic('%Math.abs%');

// http://262.ecma-international.org/5.1/#sec-5.2

module.exports = function abs(x) {
	return $abs(x);
};

},{"get-intrinsic":207}],181:[function(require,module,exports){
'use strict';

// var modulo = require('./modulo');
var $floor = Math.floor;

// http://262.ecma-international.org/5.1/#sec-5.2

module.exports = function floor(x) {
	// return x - modulo(x, 1);
	return $floor(x);
};

},{}],182:[function(require,module,exports){
'use strict';

var mod = require('../helpers/mod');

// https://262.ecma-international.org/5.1/#sec-5.2

module.exports = function modulo(x, y) {
	return mod(x, y);
};

},{"../helpers/mod":188}],183:[function(require,module,exports){
'use strict';

var modulo = require('./modulo');

var msPerSecond = require('../helpers/timeConstants').msPerSecond;

// https://262.ecma-international.org/5.1/#sec-15.9.1.10

module.exports = function msFromTime(t) {
	return modulo(t, msPerSecond);
};

},{"../helpers/timeConstants":191,"./modulo":182}],184:[function(require,module,exports){
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

},{"./5/AbstractEqualityComparison":139,"./5/AbstractRelationalComparison":140,"./5/Canonicalize":141,"./5/CheckObjectCoercible":142,"./5/DateFromTime":143,"./5/Day":144,"./5/DayFromYear":145,"./5/DayWithinYear":146,"./5/DaysInYear":147,"./5/FromPropertyDescriptor":148,"./5/HourFromTime":149,"./5/InLeapYear":150,"./5/IsAccessorDescriptor":151,"./5/IsCallable":152,"./5/IsDataDescriptor":153,"./5/IsGenericDescriptor":154,"./5/IsPropertyDescriptor":155,"./5/MakeDate":156,"./5/MakeDay":157,"./5/MakeTime":158,"./5/MinFromTime":159,"./5/MonthFromTime":160,"./5/SameValue":161,"./5/SecFromTime":162,"./5/StrictEqualityComparison":163,"./5/TimeClip":164,"./5/TimeFromYear":165,"./5/TimeWithinDay":166,"./5/ToBoolean":167,"./5/ToInt32":168,"./5/ToInteger":169,"./5/ToNumber":170,"./5/ToObject":171,"./5/ToPrimitive":172,"./5/ToPropertyDescriptor":173,"./5/ToString":174,"./5/ToUint16":175,"./5/ToUint32":176,"./5/Type":177,"./5/WeekDay":178,"./5/YearFromTime":179,"./5/abs":180,"./5/floor":181,"./5/modulo":182,"./5/msFromTime":183}],185:[function(require,module,exports){
'use strict';

var $isNaN = require('./isNaN');

module.exports = function (x) { return (typeof x === 'number' || typeof x === 'bigint') && !$isNaN(x) && x !== Infinity && x !== -Infinity; };

},{"./isNaN":186}],186:[function(require,module,exports){
'use strict';

module.exports = Number.isNaN || function isNaN(a) {
	return a !== a;
};

},{}],187:[function(require,module,exports){
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

},{"call-bind/callBound":131}],188:[function(require,module,exports){
'use strict';

var $floor = Math.floor;

module.exports = function mod(number, modulo) {
	var remain = number % modulo;
	return $floor(remain >= 0 ? remain : remain + modulo);
};

},{}],189:[function(require,module,exports){
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

},{"es-errors/type":198,"hasown":215}],190:[function(require,module,exports){
'use strict';

module.exports = function sign(number) {
	return number >= 0 ? 1 : -1;
};

},{}],191:[function(require,module,exports){
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

},{}],192:[function(require,module,exports){
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

},{"get-intrinsic":207}],193:[function(require,module,exports){
'use strict';

/** @type {import('./eval')} */
module.exports = EvalError;

},{}],194:[function(require,module,exports){
'use strict';

/** @type {import('.')} */
module.exports = Error;

},{}],195:[function(require,module,exports){
'use strict';

/** @type {import('./range')} */
module.exports = RangeError;

},{}],196:[function(require,module,exports){
'use strict';

/** @type {import('./ref')} */
module.exports = ReferenceError;

},{}],197:[function(require,module,exports){
'use strict';

/** @type {import('./syntax')} */
module.exports = SyntaxError;

},{}],198:[function(require,module,exports){
'use strict';

/** @type {import('./type')} */
module.exports = TypeError;

},{}],199:[function(require,module,exports){
'use strict';

/** @type {import('./uri')} */
module.exports = URIError;

},{}],200:[function(require,module,exports){
'use strict';

var $TypeError = require('es-errors/type');

/** @type {import('./RequireObjectCoercible')} */
module.exports = function RequireObjectCoercible(value) {
	if (value == null) {
		throw new $TypeError((arguments.length > 0 && arguments[1]) || ('Cannot call method on ' + value));
	}
	return value;
};

},{"es-errors/type":198}],201:[function(require,module,exports){
'use strict';

var $Object = require('./');
var RequireObjectCoercible = require('./RequireObjectCoercible');

/** @type {import('./ToObject')} */
module.exports = function ToObject(value) {
	RequireObjectCoercible(value);
	return $Object(value);
};

},{"./":202,"./RequireObjectCoercible":200}],202:[function(require,module,exports){
'use strict';

/** @type {import('.')} */
module.exports = Object;

},{}],203:[function(require,module,exports){
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

},{"./helpers/isPrimitive":204,"is-callable":218}],204:[function(require,module,exports){
'use strict';

module.exports = function isPrimitive(value) {
	return value === null || (typeof value !== 'function' && typeof value !== 'object');
};

},{}],205:[function(require,module,exports){
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

},{}],206:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

module.exports = Function.prototype.bind || implementation;

},{"./implementation":205}],207:[function(require,module,exports){
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

},{"es-errors":194,"es-errors/eval":193,"es-errors/range":195,"es-errors/ref":196,"es-errors/syntax":197,"es-errors/type":198,"es-errors/uri":199,"function-bind":206,"has-proto":210,"has-symbols":211,"hasown":215}],208:[function(require,module,exports){
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

},{"get-intrinsic":207}],209:[function(require,module,exports){
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

},{"es-define-property":192}],210:[function(require,module,exports){
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

},{}],211:[function(require,module,exports){
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

},{"./shams":212}],212:[function(require,module,exports){
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

},{}],213:[function(require,module,exports){
'use strict';

var hasSymbols = require('has-symbols/shams');

/** @type {import('.')} */
module.exports = function hasToStringTagShams() {
	return hasSymbols() && !!Symbol.toStringTag;
};

},{"has-symbols/shams":212}],214:[function(require,module,exports){
'use strict';

var bind = require('function-bind');

module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);

},{"function-bind":206}],215:[function(require,module,exports){
'use strict';

var call = Function.prototype.call;
var $hasOwn = Object.prototype.hasOwnProperty;
var bind = require('function-bind');

/** @type {import('.')} */
module.exports = bind.call(call, $hasOwn);

},{"function-bind":206}],216:[function(require,module,exports){
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

},{}],217:[function(require,module,exports){
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

},{}],218:[function(require,module,exports){
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

},{}],219:[function(require,module,exports){
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

},{"call-bind/callBound":131,"has-tostringtag/shams":213}],220:[function(require,module,exports){
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

},{"./isArguments":222}],221:[function(require,module,exports){
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

},{"./implementation":220,"./isArguments":222}],222:[function(require,module,exports){
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

},{}],223:[function(require,module,exports){
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

},{}],224:[function(require,module,exports){
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
},{"_process":223,"through":239,"timers":240}],225:[function(require,module,exports){
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

},{"buffer":113}],226:[function(require,module,exports){
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

},{"call-bind/callBound":131,"es-errors/type":198,"is-regex":219}],227:[function(require,module,exports){
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

},{"define-data-property":136,"es-errors/type":198,"get-intrinsic":207,"gopd":208,"has-property-descriptors":209}],228:[function(require,module,exports){
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

},{"es-abstract/es5":184,"function-bind":206}],229:[function(require,module,exports){
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

},{"./implementation":228,"./polyfill":230,"./shim":231,"define-properties":137,"function-bind":206}],230:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

var zeroWidthSpace = '\u200b';

module.exports = function getPolyfill() {
	if (String.prototype.trim && zeroWidthSpace.trim() === zeroWidthSpace) {
		return String.prototype.trim;
	}
	return implementation;
};

},{"./implementation":228}],231:[function(require,module,exports){
'use strict';

var define = require('define-properties');
var getPolyfill = require('./polyfill');

module.exports = function shimStringTrim() {
	var polyfill = getPolyfill();
	define(String.prototype, { trim: polyfill }, { trim: function () { return String.prototype.trim !== polyfill; } });
	return polyfill;
};

},{"./polyfill":230,"define-properties":137}],232:[function(require,module,exports){
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
},{"safe-buffer":225}],233:[function(require,module,exports){
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
},{"./lib/default_stream":234,"./lib/results":236,"./lib/test":237,"_process":223,"defined":138,"through":239,"timers":240}],234:[function(require,module,exports){
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
},{"_process":223,"fs":112,"through":239}],235:[function(require,module,exports){
(function (process,setImmediate){(function (){
module.exports = typeof setImmediate !== 'undefined'
    ? setImmediate
    : process.nextTick
;

}).call(this)}).call(this,require('_process'),require("timers").setImmediate)
},{"_process":223,"timers":240}],236:[function(require,module,exports){
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
},{"_process":223,"events":114,"function-bind":206,"has":214,"inherits":217,"object-inspect":238,"resumer":224,"through":239,"timers":240}],237:[function(require,module,exports){
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
},{"./next_tick":235,"deep-equal":133,"defined":138,"events":114,"has":214,"inherits":217,"path":115,"string.prototype.trim":229}],238:[function(require,module,exports){
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

},{}],239:[function(require,module,exports){
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
},{"_process":223,"stream":116}],240:[function(require,module,exports){
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
},{"process/browser.js":223,"timers":240}],241:[function(require,module,exports){
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
},{}]},{},[55,56,57,58]);
