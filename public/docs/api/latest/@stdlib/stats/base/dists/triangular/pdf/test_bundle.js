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

},{"@stdlib/utils/native-class":88}],9:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./main.js":10,"./object.js":11,"./primitive.js":12,"@stdlib/utils/define-nonenumerable-read-only-property":70}],10:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./try2serialize.js":14,"@stdlib/assert/has-tostringtag-support":5,"@stdlib/boolean/ctor":25,"@stdlib/utils/native-class":88}],12:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"@stdlib/utils/get-prototype-of":78,"@stdlib/utils/native-class":88}],19:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"@stdlib/utils/type-of":99}],21:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./main.js":22,"@stdlib/assert/tools/array-function":23,"@stdlib/utils/define-nonenumerable-read-only-property":70}],22:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"@stdlib/assert/is-array":7,"@stdlib/string/format":61}],25:[function(require,module,exports){
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

},{"@stdlib/number/ctor":34}],29:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./main.js":31}],31:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./main.js":33}],33:[function(require,module,exports){
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

},{"./main.js":35}],35:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],36:[function(require,module,exports){
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

},{"./main.js":37}],37:[function(require,module,exports){
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

},{}],38:[function(require,module,exports){
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

},{"./main.js":39,"./regexp.js":40,"@stdlib/utils/define-nonenumerable-read-only-property":70}],39:[function(require,module,exports){
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

},{"./main.js":39}],41:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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


// MAIN //

/**
* Returns a function for evaluating the probability density function (PDF) for a triangular distribution with lower limit `a` and upper limit `b` and mode `c`.
*
* @param {number} a - lower limit
* @param {number} b - upper limit
* @param {number} c - mode
* @returns {Function} PDF
*
* @example
* var pdf = factory( 0.0, 10.0, 5.0 );
* var y = pdf( 2.0 );
* // returns 0.08
*
* y = pdf( 12.0 );
* // returns 0.0
*/
function factory( a, b, c ) {
	var denom1;
	var denom2;
	var denom3;

	if (
		isnan( a ) ||
		isnan( b ) ||
		isnan( c ) ||
		a > c ||
		c > b
	) {
		return constantFunction( NaN );
	}

	denom1 = ( b - a ) * ( c - a );
	denom2 = b - a;
	denom3 = ( b - a ) * ( b - c );
	return pdf;

	/**
	* Evaluates the probability density function (PDF) for a triangular distribution.
	*
	* @private
	* @param {number} x - input value
	* @returns {number} evaluated PDF
	*
	* @example
	* var y = pdf( 12.0 );
	* // returns <number>
	*/
	function pdf( x ) {
		if ( isnan( x ) ) {
			return NaN;
		}
		if ( x < a ) {
			return 0.0;
		}
		// Case: x >= a
		if ( x < c ) {
			return 2.0 * ( x - a ) / denom1;
		}
		if ( x === c ) {
			return 2.0 / denom2;
		}
		// Case: x > c
		if ( x <= b ) {
			return 2.0 * ( b - x ) / denom3;
		}
		// Case: x > b
		return 0.0;
	}
}


// EXPORTS //

module.exports = factory;

},{"@stdlib/math/base/assert/is-nan":30,"@stdlib/utils/constant-function":66}],42:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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
* Triangular distribution probability density function (PDF).
*
* @module @stdlib/stats/base/dists/triangular/pdf
*
* @example
* var pdf = require( '@stdlib/stats/base/dists/triangular/pdf' );
*
* var y = pdf( 0.5, -1.0, 1.0, 0.0 );
* // returns 0.5
*
* y = pdf( 0.5, -1.0, 1.0, 0.5 );
* // returns 1.0
*
* y = pdf( -10.0, -20.0, 0.0, -2.0 );
* // returns ~0.056
*
* var mypdf = pdf.factory( 0.0, 10.0, 5.0 );
* y = mypdf( 2.0 );
* // returns 0.08
*
* y = mypdf( 12.0 );
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

},{"./factory.js":41,"./main.js":43,"@stdlib/utils/define-nonenumerable-read-only-property":70}],43:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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


// MAIN //

/**
* Evaluates the probability density function (PDF) for a triangular distribution with lower limit `a` and upper limit `b` and mode `c` at a value `x`.
*
* @param {number} x - input value
* @param {number} a - lower limit
* @param {number} b - upper limit
* @param {number} c - mode
* @returns {number} evaluated PDF
*
* @example
* var y = pdf( 0.5, -1.0, 1.0, 0.0 );
* // returns 0.5
*
* @example
* var y = pdf( 0.5, -1.0, 1.0, 0.5 );
* // returns 1.0
*
* @example
* var y = pdf( -10.0, -20.0, 0.0, -2.0 );
* // returns ~0.056
*
* @example
* var y = pdf( -2.0, -1.0, 1.0, 0.0 );
* // returns 0.0
*
* @example
* var y = pdf( NaN, 0.0, 1.0, 0.5 );
* // returns NaN
*
* @example
* var y = pdf( 0.0, NaN, 1.0, 0.5 );
* // returns NaN
*
* @example
* var y = pdf( 0.0, 0.0, NaN, 0.5 );
* // returns NaN
*
* @example
* var y = pdf( 2.0, 1.0, 0.0, NaN );
* // returns NaN
*
* @example
* var y = pdf( 2.0, 1.0, 0.0, 1.5 );
* // returns NaN
*/
function pdf( x, a, b, c ) {
	if (
		isnan( x ) ||
		isnan( a ) ||
		isnan( b ) ||
		isnan( c ) ||
		a > c ||
		c > b
	) {
		return NaN;
	}
	if ( x < a ) {
		return 0.0;
	}
	// Case: x >= a
	if ( x < c ) {
		return ( 2.0 * ( x - a ) ) / ( ( b - a ) * ( c - a ) );
	}
	if ( x === c ) {
		return 2.0 / ( b - a );
	}
	// Case: x > c
	if ( x <= b ) {
		return ( 2.0 * ( b - x ) ) / ( ( b - a ) * ( b - c ) );
	}
	// Case: x > b
	return 0.0;
}


// EXPORTS //

module.exports = pdf;

},{"@stdlib/math/base/assert/is-nan":30}],44:[function(require,module,exports){
module.exports={"expected":[0.006752779480488924,0.005238202816454144,0.7750397253525426,0.013746939966280073,0.0007812675989798441,0.04433490373044406,0.26624698565614147,0.011007505965124708,0.06288397511977083,0.02576338933670641,0.04341815751596535,0.057169654967929494,0.0028385533938300447,0.018567036365430525,0.006499211218497692,0.013911665418229042,0.04078264342553892,0.021141375234943364,0.08746057067546972,0.05549284794578408,0.0031825062220048983,0.09485686806735028,0.033693131874758295,0.02146462141938148,0.01620438663090585,0.1002921032521543,0.019474818728581495,0.029587095364779947,0.0151250918538077,0.021814842269540523,0.02089703598723882,0.07319957304193823,0.0005913325079041708,0.01044802353282666,0.023956480337792883,0.01660152298189441,0.07115136005479135,0.01771778731132349,0.011173795259289902,0.08056850477156267,0.0033720104896141434,0.0039960881907340805,0.07234938128109596,0.009302116250971671,0.014882154244445864,0.00535625206571332,0.3743022088786126,0.053598957527778754,0.03744285710143791,0.021638980606302163,0.016181148763693382,0.011774016135198531,0.0062166883189216805,0.023346507849362885,0.02395456139489608,0.014808161943233662,0.02694554616892985,0.008140202378450166,0.14415244304914926,0.00029309936880722717,0.028598127723432825,0.01581527261342657,0.01682434470991065,0.020818065197356243,0.01066682806766735,0.0027891924920309505,0.014359776444879752,0.18928015570032777,0.0072214289930262535,0.002246845526300826,0.03791914088858853,0.09791514459043668,0.005520499197030381,0.0959018909375974,0.030046898004209822,0.03745127876925922,0.03474432320333225,0.0705688144597941,0.025327132546218337,0.03693202469127343,0.501210502994236,0.048270080612543495,0.00703365694380519,0.0640210844250854,0.0045187735421079395,0.1597765160317654,0.061010322400738524,0.05597229695752718,0.09431662566710573,0.149236617368419,0.18275166374695007,0.0016058119279032056,0.01583095344382626,0.9734413198018971,0.2646753151302934,0.014762011405673526,0.02825063499634036,0.008981320187077542,0.14774201115625352,0.031385665184256485,0.026930207315296613,0.05950715531052746,0.018057560583242167,0.009068553983859055,0.027251839728924913,0.008575359055909542,0.04248170860688908,0.00463166194562087,0.010087176538224704,0.014584338276213415,0.00981922753635811,0.03645236756062722,0.0422673031513555,0.16131103339186678,0.005336892819731435,0.0515819988788913,0.02115780006763613,0.10251746062152678,0.024988405046473174,0.026696654405927844,0.043765647619167146,0.027427939897289883,0.029583686075180096,0.037284556881752993,0.046631342003039505,0.22913901283959048,0.017269924668752594,0.02694851806868587,0.018113297544900247,0.005201713989291402,0.0038517548348219197,0.013452281704590945,0.03266541836118436,0.04838415608814003,0.0005036158010287204,0.011488093412565173,0.01759433265744534,0.011804066601046197,0.006564615133706585,0.02136459740271641,0.03140489593064854,0.03904310447051884,0.04486186335613256,0.0016690145321730143,0.008256659380958998,0.001779223547258518,0.023266935496162464,0.011684443989425466,0.03171650132998954,0.01106554029431899,0.005802249351996793,0.7541733775024536,0.028751069804379012,0.023553282710601198,0.007084868253475194,0.2724518394771655,0.0017823838366359602,0.13127615528414174,0.021746788260983908,0.009849298134572495,4.657200781106361e-5,0.0449219513576663,0.021721478960158223,0.005352213833267047,0.010652274749236171,0.024395997204840505,0.01186141137434648,0.06594171823616468,0.0012695258418625366,0.11439513148051013,0.01697758865824232,0.0004381475897356326,0.48035158691159047,0.03299774967842681,0.03957983396839892,0.033689840690806154,0.03361784819298766,0.02054259675442631,0.03856354755987834,0.048728379872007205,0.04073145806782844,0.003985167483268105,0.017443843291625,0.03109169914340002,0.015503990639811767,0.0067958712078292,0.007542950740460989,0.013880359574115892,0.016867489728454046,0.018060692783771915,0.04511651448762211,0.043098107768890635,0.06765490450246696,0.0859503480051113,0.03874032797423404,0.06881899472594472,0.013712596887365577,0.024021419858713207,0.031287800312641396,0.004168573298484249,0.02556902099689833,0.025485159974192113,0.04336175701677107,0.0641340127092849,0.023758651678244817,0.04958287935790653,0.017581267794490943,0.022761291748248026,0.030493330242630214,0.002377864294353165,0.04234699177717896,0.04400169418744269,0.024850768412687057,0.011391260762987394,0.01050733297739353,0.013662932642831324,0.10994596309837923,0.052880414590223135,0.030530388139216526,0.039051518287877986,0.025132122474791012,0.0037767314063302786,0.011559156746194958,0.0116373216641823,0.22255349153314982,0.007515034613006418,0.027606538342741533,0.005722540792300175,0.011600186247272886,0.03726401560889862,0.19288165459325732,0.011290534617424906,0.28697129599555204,0.0008260107930139714,0.07481384814457119,0.018008816970714117,0.007429823316006111,0.08695309663959264,0.06384946744130623,0.02252542916204319,0.0219379717973767,0.056707554781445645,0.024939165027397202,0.027187812688367678,0.2036669218190225,0.03715771880879717,0.11724538363515749,0.11366286329851696,0.03046850610923491,0.04676653421999319,0.005369768058373835,0.021685507426110074,0.003963111768009126,0.014407794730730809,0.0679488516213263,0.04422221444716788,0.034936408887327124,0.015068084499422723,0.014255793360225068,0.005122188897862296,0.01726672583281476,0.2673380891381446,0.011222726784623238,0.0023436960448696377,0.06070188601721499,0.007480141508696352,0.9322101511340432,0.03642977818611025,0.04211342410499383,0.004927519072311372,0.035544104388633195,0.005656573907520355,0.008187558681162084,0.015536936809876145,0.012940030382920872,0.01897446633377675,0.13458093255743298,0.032956312554170336,0.047045812584371745,0.04157362228328346,0.005236870552576696,0.011042021712405379,0.0018753529879299766,0.025754250246109424,0.008936841526664135,0.031852089809432674,0.03334311350308662,0.008569023765157025,0.005855783127839287,0.007550918120711755,0.029803177598330784,0.003164230302440553,0.019622978993471967,0.025074322470923168,0.05194139926619278,0.052940011816497906,0.012810558790645687,0.025663953300079766,0.048338965651392604,0.04087846820568049,0.013434645881946976,0.01942886074252316,0.03000196364097472,0.014085748564809725,0.01471511170418534,0.011495739138663318,0.14817389233687062,0.02373767103794776,0.0009020312460868133,0.1244287342816083,0.05702304551918263,0.05528993683200563,0.023066549936425696,0.021158201873087628,0.010747385183506628,0.052159497005553196,0.02900376880270209,0.036842697943379535,0.08449951855787946,0.029376020206425636,0.015102322904740053,1.0068878118258064,0.005772822316564281,0.025841397975050095,0.011638737131597932,0.0299449252076403,0.008233438717965159,0.0006417195091746845,0.005866299482314317,0.003932018907513347,0.017094732858869012,0.15516382539053997,0.0949580357064449,0.039888791683321344,0.010516253510098057,0.038206348548160574,0.09840442775697202,0.030127980149047648,0.14362731075122384,0.015160973090723125,0.0062025117169743505,0.019842274407441775,0.0035290164365581944,0.15789165643999656,0.0403951442426216,0.14451457643141458,0.021845984314074383,0.07973377972701827,0.21658947152123992,0.05666509314092043,0.20554549463514002,0.024515357944912903,0.013188148395436482,0.11101922142853181,0.00027593982539077136,0.11247959039880977,0.32867452163395083,0.024149026142081212,0.024031831053617718,0.06858470612151783,0.029631505885438905,0.04534072769701985,0.017701304077753936,0.009251925686509876,0.05770718689382858,0.17213464347875385,0.003723540888258733,0.03356493078901478,0.0192371444786673,0.02213006182132378,0.048622297117703835,0.009757783341089538,0.00244967512629882,0.008757693354514866,0.015749191185291674,0.005673230770143666,0.017689715161160822,0.3174636649266446,0.028762079912895016,0.024336698813603664,0.030458638600897456,0.018825722953719225,0.017296986379452362,0.026457139754513782,0.01894024709097213,0.0013695900727286356,0.02134277132183501,0.010769387310781703,0.13883961753137591,0.010855846172003117,0.03250363357489081,0.025182410404091846,0.20414565627556308,0.1039155284148063,0.0041976735561093876,0.02100124518641669,0.10620251132099864,0.028556672995301777,0.029970053607298867,0.03212321981482243,0.012928749647617931,0.005540895466473468,0.013827520983993532,4.303702906925386,0.031707442844211516,0.04678178678301734,0.05847823990677726,0.08584843174994808,0.01621911861000459,0.024877305905217136,0.14856441220257371,0.0006334752373236158,0.014169860465773586,0.04694774625842816,0.021339232529012382,0.027068042316746116,0.009663877905141179,0.03194259117649801,0.06859853807183018,0.009903103912228753,0.028517360859130755,0.0042647367345117196,0.11433933761828768,0.05153862392394261,0.06265334290718122,0.02960974272845796,0.06431827035843733,0.010121161957101681,0.02448438504800301,0.016825614577631768,0.06410511724043502,0.147477324757071,0.1190732206507058,0.003160228295851841,0.025122373813575415,0.012474406183139712,0.015438185010819151,0.0032545669733729968,0.06519807160741672,216.19387107533703,0.3038802330554656,0.009387893595826619,0.021517268766574255,0.0008590477390802309,0.06856919705566585,0.10928908086382354,0.02885118023811336,0.3892341026557635,0.05643358044841261,0.01303014845743581,0.010356381553811658,0.23955043969959464,0.05040413323041523,0.000680350557827067,0.015416713025465906,0.7788950934851274,0.022705772462482125,0.0062031140883952035,0.05316867933703512,0.004101126980681524,0.08401768489454399,0.023680814880449423,0.013117027205336407,0.1335533851401799,0.006278942143374029,0.02523064150800363,0.03312682412544666,0.09337360981723097,0.04416078361228443,0.01652704712170843,0.00991055345630673,0.00847244788471841,0.014386686818628534,0.060623563301981445,0.011348671221226857,0.03131888873190031,0.06026277248899267,0.038362914621949566,0.046232396130412017,0.008393818049162845,0.026308992209607165,0.14516195353059613,0.06078977568012471,0.03439776389966502,0.035399419030703254,0.007288369078977316,0.08527929377264934,0.04691180180949089,0.046978711910223354,0.012959894268485738,0.03888815163281674,1.402506533894465,0.010565818367782547,0.19730305812188068,0.13986456327093819,0.13725794688341975,0.03394754012174532,0.02091745130782562,0.14118903461977936,0.13789138434624482,0.002674325399780628,0.13818529969164434,0.590000213590745,0.01717314594847269,3.448393584692586,0.05839910541167227,0.055475347036064875,0.023088028242402192,0.03424763375358941,0.01703093254715404,0.02061795161351138,0.5141561976736689,0.09092812496294565,0.030827396950863395,0.02295710709061734,0.01846442371792697,0.17194309901295143,0.0021670929971943443,0.014915645590925454,0.02055336818233818,0.02552796409775146,0.02241477897287105,0.22438716078802043,0.05737406317636352,0.04126036056168779,0.14148256151320263,0.004059755009609639,0.024298135053983923,0.004387660953117252,0.03757316535258473,0.791671700988008,0.07150443393268772,0.005674240952323404,0.01680251985313755,0.006945971303257004,0.03665293420483064,0.1486549929812563,0.006876331438452058,0.04279057921675435,0.026773623572821526,0.026028800832763623,0.0002713758584779841,0.15463568211113382,0.023735606266974896,0.07076371289101967,0.17985087999831192,0.04034842029556041,0.014397545361419822,0.0008539558263078302,0.026577109820152146,0.017652003556921776,0.06854718509718656,0.09588654649267077,0.012941979302610637,0.02229677030766098,0.05800509596893348,0.002497304800792716,0.04469411243398295,0.05992162939555228,0.4796112009395173,0.010858957529302818,0.024195811948554483,0.00790360508572363,0.023984258725078058,0.007825690819441422,0.061026307541505474,0.02095781083426006,0.032533800588898994,0.0049230171032721695,0.022308873678910487,0.01765424359650762,1.022242491891019,0.0011139174139904865,0.014973836942652008,0.04117118601039839,0.34480363995192215,0.019696526758266733,0.02750102984336512,0.0372680422121917,0.005003911243497523,0.014435360793593874,0.03358419236030806,0.26825028189057804,0.020630662487168567,0.012174545363561157,0.09041420015509434,0.0844179422995176,0.14502151372138278,0.1918100297453872,0.02017276434630351,0.011028146706008463,0.10007791700409142,0.0042933709662560755,0.01313241845385683,0.083136269371163,0.017096093668798,0.0036879704117794214,0.010715572141797674,0.03432735224371468,0.02339617011940515,0.0325421266571447,0.01106463678445377,0.13848830121945158,0.046027262588307145,0.00023487451567480146,0.03723844101760433,0.009671148631339612,0.055581498454131816,0.1246655716526657,0.013688300164730693,0.03820669703010777,0.06797656672829647,0.022463033111130834,0.6811802692818685,0.024145143245896374,0.006812260145699716,0.02271578899310539,0.017238391081999378,0.06425674451352799,0.045063369665712304,0.008043949826410478,0.03453199645343675,0.03535741458523728,0.36537348394966296,0.002063181020306301,0.024672832209581767,0.031496411857050856,0.1000838595846377,0.6853746130351458,0.00519499011623484,1.2156976981423275,0.06586191558907205,0.0022142924169523052,0.012537154325937442,0.03130395047450016,0.03541880022712516,0.10819733632024586,0.017258137948548823,0.025561288493525753,0.004861022300280218,0.08968180790720245,0.010105931454835593,0.04519320661799019,0.034134089787045165,0.0028283940609862253,0.015712600358387348,0.0056542801845368106,0.05023744214976643,0.016501072043651567,0.051079850129708414,0.004298427431062598,0.01108589120216663,0.22984856362724257,0.1479130252439219,0.05728162769357777,0.035088056382189814,0.007507144950716323,0.06610204163411872,0.02600244899977882,0.028008668965974474,0.01992240385027406,0.03652089398390932,0.03228500038395906,0.03791045195762934,0.022099612306961215,0.027892513930067597,0.051895821144234876,0.008922713333849301,0.01188539905386177,0.01501660181005693,0.0033032840179078693,0.030647685019458974,0.02234612262225057,0.01572532248343378,0.021605106841843944,0.015799655776648654,0.02688907287699998,0.00815580946663493,0.021007974809377904,0.0035041611214296905,0.23090241633463773,0.008740812351329038,0.05270313045152932,0.00741196283080134,0.027190996410668928,0.0005857044069588817,0.003227893497383304,0.008618854313966319,3.406308184094171,0.017127697775304842,0.012664130163243692,0.011128525816796457,0.1244046930926513,0.009534072587599089,0.021074369762058398,0.023657735586399782,0.003548742462948623,0.013357241607623695,0.014315965699398468,0.09056626320674266,0.01512429862290024,0.032054897265099906,0.0015471008038450312,0.35799632575374685,0.022287464133574894,0.027745187252011475,0.0013719235514141662,0.05721353872342575,0.011593520791890683,0.01491721719679622,0.009389365421155177,0.03973524900577791,0.014754815181433551,0.6601370842999013,0.020191060164884735,0.8210517683195193,0.01973752754146912,0.006309941602092804,0.05816480053082175,0.061466708478081875,0.02139223018719445,0.003311707505728029,0.008095427597432437,0.08797566764869513,0.008542014853213186,0.029299811809808417,0.017137814230452797,0.00643215161910132,0.014177771538348212,1.4665734548358134,0.062276537252275735,0.03496255373070862,0.04974247914532165,0.055233458370162115,0.021399260901629025,5.243233947994959,0.0002716855408587936,0.029859745809586166,0.03310638766741811,0.059282452833664775,0.017740122847103294,0.32313338566811295,0.0958260495008813,1.0506880267371723,0.04988760556232003,0.0044512596939915074,0.026344753170387706,0.013216147552986189,0.014620429315185774,0.005888369026244992,0.03160031033264597,1.3601433866176615,0.02809447117087234,0.011284751871613853,0.04650106348738357,0.05273298981733899,0.0260559102854814,0.021800467576726885,0.0074596614758275686,0.12778860253980823,0.026457472596134044,0.005942108879559167,0.016849387387297403,0.043506355981813405,0.03581331494601573,0.01842523336005828,0.04840180971540835,0.07579872552346022,0.13176377698492073,0.013269469420384284,0.21810049821634805,0.02565672091508854,0.0907835543127635,0.016333424060465566,0.024090313778839342,0.05092952886084906,0.01602325053374023,0.011997847969504292,0.014252751540737504,0.0028370796296439157,0.008216643253733114,0.009080666420325342,0.13168145308786414,0.08401799440659312,0.06244482098820813,0.004666356776308292,0.004258895222614849,0.0028463889874252176,0.026954629184387482,0.019751392968485132,0.01713399633312318,0.007912475369164397,0.31175687004027847,0.01669834037788437,0.03336907972157786,0.0022867370353796363,0.0626777281627515,0.0217181016236605,0.05042307905047374,0.029727175435401116,0.009618809218986049,0.009062587351276592,0.013254175603280158,0.902004498943056,0.03733768734117807,0.0077868172384744595,0.42065141443194826,0.036045891469760005,0.022254281541177697,0.019227340389915214,0.013357508672776805,0.02088451203883603,0.023024358868645723,0.020447166008610344,0.03677609566828924,0.014268799606149109,0.005153516992556118,0.026772846735051713,0.015022300207084654,0.027846467322846742,0.0058355241829860325,0.0005942889972965474,0.005649311168421328,0.011704668025688635,0.00679008273901058,0.011469995137395434,0.02677563401529041,0.08384940140934057,0.027659554005344988,0.004382855383312061,0.05465535163182992,0.02136811348437851,0.039340133097400885,0.01958766746614184,0.006418231396801263,0.012505336064630822,0.047270007210492716,0.040359822161329655,0.05290799488092109,0.05838730786625837,0.009445419496114287,0.02429322142619239,0.028505907358767422,0.06469311757449872,0.021463312800526855,0.04160315114319372,0.026568606907234366,0.0416863539203361,0.1938797215011078,0.03932048524383975,0.053584134252141126,0.005363868380405661,0.010441151394211102,0.07447333679652854,0.009787496418550527,0.016504248678053397,0.05096102888694854,0.004211284130592044,0.0055324698848608946,0.02537905637755219,0.014138183922615954,0.012997414924965152,0.022088699268981767,0.028918608774212904,0.030301790472317246,0.041268044592603845,0.18562180147684018,0.008276230532356836,0.067005849365315,0.01801260180643215,0.012000527049419282,0.005025538243616818,0.031025844601721638,0.04593989225918854,0.0192709061054969,0.04210762900822954,0.00026309153932756266,0.03934505947798004,0.029262588877071262,0.14045237975278027,0.044880074635160645,0.024743494544562483,0.026414400402747493,0.04945243197211893,0.024256951386722483,0.009672386890546138,0.04612767471288456,0.021049403301470777,0.02321601548793962,0.024768626165215468,0.002123674781137269,0.8734964334708686,0.00041085407287616435,0.0036304203655065067,0.03723074619529083,0.007290118460026451,0.015805302082704926,0.016215973757151798,0.11446388831225521,0.0266512633056619,0.008319732714119885,0.024473019707669318,0.048544596640163654,0.02276969033836382,0.4069619561104575,0.009178942565102226,0.010688928948158523,0.41673200858098325,0.008734552600907008,0.05222446895905787,0.011789238151723303,0.0014686680663415315,0.013153821249581778,0.024622489470218407,0.014123611859353687,0.016251521326766934,0.11976388299190986,0.4908889334735021,0.007573293488818944,0.04730567380471645,4.564641758225934e-5,0.014670937215282674,2.7130088173992863e-5,0.020499198786703456,0.005763210498436497,3.8253808729589536,0.1213211506577659,0.025991230501053585,0.08385740006219873,0.030828495559551077,0.013977673866012202,0.13646051225032327,0.022830976255053582,0.11212881265614297,0.05138730588725481,0.022858314754498676,0.05476790462546365,0.023399787866956453,0.03701223149130771,0.031361120459631735,0.004566061052340335,0.00237120209803672,0.005591150642430942,0.10531742427937726,0.04341587844428813,0.01987783266858953,10.467616297225925,0.01282398288399641,0.14805231804271624,0.016845760036600824,0.06709770144297364,0.00520693428419611,0.2708955516337171,0.12803777021722856,0.014302607664000492,0.03192701076116347,0.030352537130397712,0.02238195079710564,0.013153393039606331,0.013266953641609422,0.0033757145492673436,0.013373372521052697,0.7716472885818941,0.02634420801888816,0.02949450754200415,0.010960273796952667,0.05959299083622165,0.03645896508158319,0.058969566739175173,0.6132417091143348,0.0730676953577328,0.0575654960779188,0.02741209475266658,0.009522711886831984,0.003126792656175939,0.015823355392952636,0.018320592826193176,0.05538756353923218,0.014782135269463106,0.017766049344753464,0.008286736922715095,0.0824828332407445,0.047654702493291845,0.00706423841504084,0.031104054837233105,0.13647449361892525,0.005999774200659614,0.027525964700386155,0.06460644457308846,0.03092412749374318,0.07763946025240272,0.01199040422949649,0.026660361204266066,0.00780300885091757,0.050453834294777,0.009332904356577996,0.010546531105675125,0.01429008026362594,0.0598314118991743,0.018166137572191484],"c":[24.3877855383744,49.06110452221406,7.135134998670637,9.774275844608773,9.18796013771804,34.277330133308205,8.209814873532313,55.423479251227576,20.752294556997022,32.73717187143406,11.399805565464156,13.78290431086247,34.75315557271058,74.11968663034088,52.65638892657377,14.886148555584612,51.55196591792487,73.03116317753833,27.28039843839369,13.831438716395647,35.09173901711575,6.390853489446417,31.718226412919748,48.35797044582529,17.336234492005964,8.162430179837573,33.93355656197757,22.094227567369586,24.506146506487628,39.443782039174664,38.01544551092279,6.624484858051435,34.38585367455504,36.67034112476129,2.6562203839340683,9.440687474134746,24.250422233671912,37.97969028514161,46.97626973642698,19.431690570513947,71.83974972735349,87.51953119500494,20.159611405258524,42.28958210943061,12.356881818576184,9.162888969894283,5.529233105358113,34.82422780481751,53.86641402628608,34.523527793424726,41.788212257034026,14.013797547116017,31.8990073691811,68.07985101898385,40.55621495787243,25.247772705604895,15.699445242505416,15.66584970404929,13.269236243831633,13.127078992306142,59.36103352371461,24.25366155983569,22.15923620119911,49.38795842514118,30.649007326281414,58.37163129767889,45.747484088531465,22.51866887656371,39.8395776529832,26.637259059438996,9.403609716428148,25.258234430130805,66.23763136062118,17.385546168559596,48.722448084389896,32.13990965145003,30.17926107530493,21.74178805882547,45.3813818971251,22.072944877389755,16.572299970852363,40.75108361424812,45.981833202510444,14.199086224297492,75.38050656069314,9.600776146807146,27.32424736455455,37.052124976049505,25.57897002243142,15.423076650342082,7.897925141985139,37.087255981553774,52.0235316314225,1.9247486673299992,9.91774870281379,29.893981259949882,21.82034357850966,28.23654709757525,14.248618250356488,19.139912381335762,58.67011215085618,26.105619706604408,23.32976529531991,59.631029765461236,38.374762636115584,32.97220504912663,23.958607077004373,20.93503681159042,64.27227359234108,35.514390252097584,42.90168250799563,31.73744343734043,17.64261496804853,4.081509001065007,45.24143719630575,16.092519512557384,33.68932617906468,34.71793155487093,48.01657840482823,22.725294315925936,20.590629860419124,47.18618380461202,46.66927443419694,7.826103679881441,37.57884219162648,16.801568504626125,52.08867849393364,25.742550466552487,30.80687426162637,45.87035510276634,80.24044243636611,62.622282014557776,44.91464396033494,19.729117625226475,19.265941671025658,85.59314146923687,18.113096665894844,74.61052162756624,24.734278243685594,35.581502052044,23.61889412281264,19.134417047772455,30.194918311323672,19.80199342295817,23.178522047251292,19.588329742844504,51.352648782415145,10.128971519299524,32.09380456695781,43.16095431107989,48.766684916248806,6.887926330392226,19.79759247218165,38.31955498694427,21.922593759725586,12.653517213770696,66.74277910984316,2.756939419897587,37.6469833360605,24.164554759300774,24.60205460977611,49.490936915266715,25.74991882102187,55.88317990033826,37.57892546935312,25.40063251703431,51.12374288130908,10.60164074080844,32.539098236225925,4.726457349085053,46.09890066237857,54.41658312534309,3.2933592028122654,16.471775697865784,12.784220499655973,10.546589533636304,50.49131438240434,60.20249580008219,50.76787546619037,30.20346949968561,25.251750570182825,40.317283347938776,37.9786324840172,17.574043204647058,36.92103900037823,67.61645358027769,61.008611412350525,19.869661819906504,44.43938478203525,30.837321366726393,45.493758288820885,20.563001551411155,14.786437500283833,15.597781720962583,37.03558116018078,23.613519055267666,45.4953693648073,25.31372932401517,32.122793484345785,62.22229342944557,23.269146067133722,50.448544420323856,13.023274638590422,16.55581631163839,27.53496656358409,18.680038057581207,25.746085429500475,23.67177230814585,3.915926152613506,47.789168298025686,41.15870630457947,25.3629345608867,2.053583584210325,53.80442738595454,73.35958234735841,55.380353240819446,21.07124289862706,18.805405493197394,8.999005659987253,20.35875236194392,6.0199466289356955,22.965029951214397,40.08922155076175,11.619424983304102,7.34211949628868,46.98300226318365,23.2425933981575,17.51384957572388,31.8146141448336,38.6730879118741,17.927704746409876,50.24080287288359,20.295213703098273,27.2922362309777,5.435301864494767,42.362516742344134,17.053757610677984,8.541126105693106,12.519358847449503,75.82316224970785,26.801133321281718,22.717249230478917,9.066102365591526,57.128208322404106,8.846853644689899,34.42436904843933,24.933516784980476,13.509877761087633,29.85993096522198,32.73058868112089,13.723959152104221,34.183533965197825,78.0113420332557,19.29187673276773,6.887685987885608,6.877152304221115,15.722682859981663,61.66918060103785,55.577774759278626,69.25975383032839,72.1720583773673,11.734271491165766,40.93540464153415,33.10672775650545,3.138314041433619,8.362909310783882,8.679402386474386,34.195934627724455,55.070916711530955,41.15812389122443,13.770079037404296,76.08356467252328,72.35366994758569,3.345289876649083,30.105883527218346,62.258203457493074,10.011326942489141,20.412134072443276,17.77557666948704,28.077003174353518,13.277790360692407,3.981289800384407,50.51707301315696,10.669219156802566,41.13236114511979,25.280867433448226,29.202043887150563,23.218066074510148,69.88410629506778,37.33258020432936,8.472581234425007,76.0983144341829,40.935214918686846,70.34468647521575,36.27179875378819,16.660857683036582,72.47559543179824,51.84120829849046,15.880499526869656,14.457914957868839,7.825225866694127,66.2692503201018,45.91179005876835,5.748532119961676,14.68031270640275,69.04455476312746,12.04742239400011,26.083657739326846,72.00681315407274,18.759102731774586,30.988374095033546,15.412254775222596,82.6515615081457,24.353803406823967,62.33704361269912,49.61858914825462,23.728013263063485,28.806603576820386,13.06937578129932,39.23228211354969,21.75871638435852,8.158469917939197,28.838585514579954,23.60087110894338,12.403297066487896,56.59880300090187,14.307570299474543,52.35324973692858,33.8301500280974,25.581289723519873,15.279328192462874,14.405458812861415,39.099877328484055,29.780040821696772,10.145185531099887,24.422410313120842,18.642955522301992,30.748343152263416,24.719718276878538,26.998047248105447,61.74044103704235,65.16189745850153,63.08269137009673,27.343669360045638,36.9300376098133,12.781615837283303,24.632522897157358,11.014224809891251,18.780038852348433,20.119495964140093,19.410535537400587,66.169842888047,15.625392830617791,8.755118736724592,18.831119494315725,15.530786080280063,7.909237127831607,17.765015653497787,26.010654778507238,33.94380747781665,51.3889302817977,5.4480508977111235,20.285835221685723,35.41425645115642,17.306782569518692,12.07724277313503,48.405980477439435,55.96717644490733,10.999585695142375,28.018312808779136,44.55076636613415,67.55752345098514,61.062361081756805,36.493634062504576,22.585603576226084,37.69347964393724,52.93893516414221,7.55287966169245,30.369693535697802,11.134890611300797,21.86792315077534,14.995477576217255,27.018758068749477,56.14756261521947,51.712587064461445,37.18057454554434,51.493116066060935,13.959916346028983,5.16112817853401,22.580752891095116,13.340665063027302,36.567857361240364,4.701825375077605,10.412735182691286,43.78436777403476,18.267237796545047,10.885170907626058,45.77978230037047,14.41327131647829,11.553621530970947,70.98215948570072,75.37742546357838,56.98995517506472,1.9274798772243438,24.72764763981992,15.428949936706271,1.9152098179971808,23.25118426297817,14.078956544238,53.438042258406895,3.187658631866469,39.376040548085754,7.964849630449528,22.788158449228796,20.458736487402195,64.99025875330065,68.68836848306758,13.320050944942047,23.305600789892804,49.93089223470677,16.05761427472357,18.31481477656077,6.110902104595491,19.515579905260346,1.21213646053736,63.008393186762355,27.18759574986659,53.208462413505885,62.943973040754535,73.90757553624158,36.01515374763308,17.128716788391166,3.885206848180686,75.2660235765522,47.61900208817829,35.57578049184654,54.42072436464788,30.922573722687858,19.5064705509392,3.005166484738442,13.83733782623222,23.007642313866178,33.59631249319223,16.592026543451446,24.93006588095354,20.054397773524585,19.5773118395975,16.959467698546995,11.687845417499553,47.29288773744377,48.93520678710313,16.686409141793348,26.790310190872077,15.522891304654982,15.279387844556137,4.381726428870724,11.814169828070188,28.752413644205674,40.507373707470194,31.450463563341728,33.698157741538814,24.38664410555245,38.234734252295894,4.741095033181867,28.608068228057007,24.848919136989572,21.3869846418274,4.677893392334549,11.017147879173796,17.668878818368757,33.165839760739814,9.2692620636364,36.218339082077,17.223585366639394,39.04604283976843,24.39663845983548,0.9736649329382514,21.880384560656875,49.882775452846474,28.626312840237983,46.30310933738352,16.81407532120511,15.960957734968531,20.88802201665773,52.40416767516671,59.21841442558606,13.127102301781555,16.154651277008877,23.354449602040773,45.937360336666465,20.675872568045857,6.939791386576039,28.49168762250077,17.51393406208119,13.427075121136202,4.581716369204194,10.535039810851025,13.633934977640177,22.794621728670062,6.732673660514518,87.21724564728389,16.127409112944,10.447869542909894,39.892012256983996,11.321691787193881,16.52553843456964,8.56966952357363,27.268220924656653,30.41885636741357,15.892335808841285,16.20474676966826,3.1258280436822097,10.790613126321876,5.514515731059241,19.546866623028638,27.56329537818001,16.696702554574333,74.23758721398532,76.33911712851022,68.75484896719168,31.35144994454106,43.30158766158927,17.615320303278818,8.227495547884729,47.237202490348864,25.128493755838605,10.248190067757596,40.03187656816398,12.609151664335869,24.918458998951092,18.51282368971747,38.75648154228111,35.81551718481104,32.28222773529931,37.536074640864996,23.967589030605012,26.457090574805203,67.90794262507401,54.818718413731176,45.25252927232225,52.026812807761814,17.996847586642538,12.558827444840533,40.45359665251501,10.814161497845678,9.898048998722853,26.577411415870948,31.244322669059446,17.51416985156027,39.03258997722667,57.82850386107677,7.932501511196466,7.101204092246958,76.9381577613572,10.632672546652257,24.66560476742641,46.22334361650525,29.43110750646867,6.4123554932626226,19.27636769788623,16.359516814492338,24.728817730883605,11.172688529889173,33.917142392494185,65.55417400870955,10.31183552090848,19.75850543656216,49.665714120267324,5.571398706169122,6.056020950656862,37.20754893459756,17.477772826620775,60.086944364355645,27.58568858988066,19.814661660338075,3.5361349296900952,46.60375208420729,43.175082346708564,14.508319195877958,24.717437058522776,48.52008007921458,14.576788548674996,20.060749787246106,31.907250295097924,16.517001033977333,18.310361082456552,8.927314078242457,6.757087211683896,25.731373933065612,22.213252276872677,42.754761438323484,10.36972196326741,25.829423419487227,3.295085778895605,25.430558357872442,37.40024393751743,70.62105049458462,41.0438270270065,37.496412180877314,71.1809127276521,37.18487246257733,29.27049325916081,20.446124863779342,43.62875270992749,33.915483404345764,6.748578347781193,26.369441647325043,15.893677321373797,23.778764657320174,59.441071316229056,22.76916705449377,28.414408585662656,50.93857436402648,3.8505363462502786,72.75862399982161,12.975759699146987,19.178889621267135,16.974661025340545,29.424408133745132,34.77328145628207,71.28920382387884,41.33848609212539,5.237803029543731,11.192615013140356,17.933354831342626,35.71168060458517,36.01009802727976,21.627744636455233,7.678896809955542,24.922126179561232,3.3891965826033426,30.76518110562815,46.23828348688541,19.36196418639335,50.410222803740695,39.45412326655126,28.955007907249286,25.220712650145288,21.9750063211824,92.66541667826039,23.338833409294686,14.272333592844753,39.98079111379123,21.783875434188538,12.78548379391492,79.708838775224,40.23844118942098,6.180868186389876,55.41046020862636,14.69763704462818,19.479922648474364,60.327947115061214,3.8442067525270636,17.177912010417614,38.02414155464092,13.873560993862046,13.419891933403921,28.43697511620843,46.88975340403127,35.6060801656446,27.16361575470691,35.67491491411752,28.672567161794525,44.56264545138465,28.649087847045845,25.401093506895656,27.71151300091585,29.622979574831128,26.525309145161966,31.724271257751422,68.93504726376472,3.4897738229141106,72.37034912520417,28.13343029141839,18.06550384851032,20.712784217552187,26.208919151382638,52.660753297647815,15.297796943503231,15.69285293076222,3.999916336753666,46.6725708216833,17.95029156029004,26.548611316321768,19.793533700253704,20.94575778578922,53.40348346889196,40.52022511575042,19.1135940871643,11.71330312117562,21.26710365343459,43.79853412911343,20.727413848896223,51.78343058377349,40.4072301814183,13.160060498600718,27.84971210819525,53.60369342225465,44.484977147064754,14.164936149094824,38.18125759812355,60.41962737513878,47.800413104758206,13.64513254802006,35.597398158134716,15.850476233321077,53.010274847677664,31.043718121898905,23.222493295774235,82.81561516080245,6.030232378392217,19.71440666920038,20.65771710318379,13.29664466050625,28.15192986606625,19.56903157676395,17.98370918977841,43.83480899276235,11.884690868432429,48.87337209006017,27.665734589226034,17.76966076299222,45.97248683758002,31.69715611832393,46.59442531170527,19.56239887474296,38.6775434652119,24.85890083340996,23.77556222062301,3.1012630428516164,23.959510678246456,35.72301421472679,41.28940715951077,42.11638568452899,64.28251994555872,13.134592255922426,41.92615391617615,49.766886178878366,63.524372184661814,28.882069069566118,12.581183989814784,8.571623533729682,5.439922375815688,8.120381668832756,38.511965940947974,28.177435653306272,60.270099994538775,16.251795304578483,46.69221503090916,40.858295198151424,23.65985196370682,12.953312062287747,49.98082075146741,16.697618531559925,29.321752958089263,24.1097780141254,18.773355761637674,48.99539293084605,63.71272118606869,6.930300121729987,74.91810937142321,27.36904011957361,29.10989442700697,15.866684015612773,47.55909228298493,26.110125810833825,35.62400873634945,7.376391741646736,15.519694524134987,75.3246437554365,20.63620245615726,49.43617055742283,17.74210532271422,41.81289285059226,36.10906956063154,5.155890338231168,34.804697798276194,29.544065278667436,76.35094186084498,65.40763623620147,49.87689824647857,56.929829747052636,21.54710161642479,32.37409674975768,43.61699577661193,58.658259889389555,19.85960421756108,17.22959364507737,72.50680673208196,77.63248260989077,58.38045668186243,40.00668950518117,4.891450035068393,27.725732261718605,29.9630364407804,48.96734643568867,17.260681493034166,12.211365509252479,26.141831892160006,9.598681471427273,21.361632163984286,43.558833685755175,76.8881015932948,0.45530431095251345,9.713226904586687,10.729750787410692,11.347652454133428,18.62545765575112,77.6489294733115,7.294173551829114,60.60956376228006,18.025095163807826,51.37433023070002,25.075295993565376,61.053326695536185,44.33658315142465,45.653922264207765,15.882831446208886,24.763775872352895,6.689675606413623,3.5036123019898966,42.81933007439252,31.281111422115604,28.37927137843473,47.82631698564755,7.1693844843832135,40.77526040666693,19.115830726554663,68.9814354444268,64.77075239084687,18.180825014093752,21.97959815288666,26.219812762088747,45.57341702627006,64.04992035432184,69.72623337389848,42.637581467536506,20.736256255658418,27.89205888209579,21.451397014570034,10.446534003247082,43.284161573151984,68.05801699564783,34.19355825278603,69.7551745574194,43.64003018449936,32.737431832956716,45.5117373998833,8.130059682023578,46.62380776375577,38.89896030936201,4.392498313581034,25.93442367319198,19.79908940376976,20.423164446085167,19.44352219278968,24.497699085946394,31.994142931272044,23.13960412213605,55.91563258866819,23.88758319487783,18.07385996210514,38.38299668027294,32.37305634031816,17.260434757037316,13.19522841160223,3.603227300422383,13.91701107062423,22.653412552694697,27.61809877724732,12.677389564127662,71.34041801422059,56.34423010756011,41.20637826696651,14.531140248427453,56.66907822318148,1.0416095320231287,16.820854019254643,35.7307633079986,23.605078496211817,24.65663949326661,24.171723374202898,29.729236980139046,10.97935983530329,17.873980485365408,57.63384276126597,14.697010734577177,43.77202814996913,59.46528856920524,15.159144766101825,15.903720279982194,6.116485136040455,26.756074650650813,27.27376518349032,33.03746460877138,63.104823383782744,12.09546367113671,42.44472601826632,11.733820486693276,28.05267662974293,33.33029497822136,33.20328410986713,54.671622149764744,36.893627071852265,18.27221330423933,24.327004242300966,86.32499877617317,7.326667748200222,17.441307639272974,21.01974280608764,25.14059746811254,13.513931525791616,9.02778040781001,20.330262873594897,55.00294435348694,70.84279892831046,17.199412060415163,17.67131229757303,73.09811344178246,23.712249950911158,18.031541365731115,7.579724641931066,22.90383534001434,44.41612297054286,64.20544277666762,12.06295299289304,16.155508318942722,65.66905361467126,34.079762403540386,13.549166770501312,26.192587249631707,20.32329173059613,50.35309871610991,11.869018559604301,33.68827191343917,46.49265086817364,34.161763459495106,68.60122256898288,4.99343028219665,12.026312370145023,15.447199183557055,71.20599725970996,27.942636610955468,4.615906108922278,38.05448018320551,22.30342315587742,1.0210530239261217,34.59525932474138,7.121430631089967,57.68584958902128,21.254352547374218,43.74205704265735,10.5915221752639,17.95629578737871,30.555247679294904,21.096828497668575,56.34425817420162,54.82000536050397,20.68385134253073,28.436257779607743,72.80260246854957,43.61922195291518,17.43503012155862,26.436733258918892,74.78498544017964,10.448346789824683,27.765762173393504,10.468265969868064,6.42157468054941,0.7789272158547493,22.39139416877918,41.02093030226517,10.639429185232427,24.92757452643091,33.39538009292274,12.454536007703402,51.58483740865203,23.64932421051294,54.87656355096966,3.675456906887911,3.5554105805464684,23.349896038865968,15.111190867200296,50.38307641140928,13.175437316422013,14.977094798332752,37.36987946901762,20.227811434842895,25.586888223365808,18.55335499749015,9.874026609594331,24.652532826368294,29.96712015578556,37.000781487502195,48.26693574622937,73.69611169245618,50.16190265435605,55.78404911824384,24.435437319842094,11.976856661307293],"x":[8.946065392724483,84.61916210244215,7.390492533328066,38.82440298955323,1.2927576741926443,28.289669422490242,9.841329169374074,72.47412488239014,21.922508517342674,35.13118885623744,17.1025937612045,13.521535262155814,74.17841946302624,50.65331049435842,25.78558218718732,14.27894319136138,45.659330411710116,57.514285438671486,28.41951113836133,19.402291129274694,75.82219107991683,7.829322864037937,33.56207426011569,30.117578034951567,43.42338737536862,10.314112031677649,22.98451652421169,30.66392559558298,53.84073271635448,24.50195113009042,21.727363350608638,6.686299105503907,16.89383985961029,15.191768737707857,16.29822447855863,31.606589149314594,27.111390594380893,16.107192460723482,60.39653492708497,14.954764849687074,23.282512316911134,27.795681937620145,14.431627179133676,18.648147404143838,34.2545672732964,59.93148014166959,4.257669737458757,26.112816363422795,48.717452371766676,42.98272271526941,56.268252273453946,3.40705702088621,42.57998397009684,53.295193859582284,36.056141539414355,11.382277918106059,25.270141625859484,36.38294799254534,11.114505493811446,7.264608405519616,43.928471400270666,6.727147530589525,42.12412574440225,35.39980109925183,47.1019301488747,74.63207818279758,26.83525740133028,22.886308579990356,19.39360615119123,56.06430199006586,7.568493585835686,25.85892480437945,15.38715152324243,17.605026682795682,40.12724356090294,21.228008622191687,32.699900068989734,15.257632344179555,25.958586936098676,27.721207966905528,16.998773363899453,37.21121606225069,21.469493632948495,18.957964984251817,16.154879710951363,8.127956149841381,31.46836638479442,29.535277373077474,21.819741047254137,14.727500043300399,6.792710680377476,14.692254479930826,68.2955672664607,1.7988304902882113,11.493053570314048,40.030448164593494,18.795409533344298,10.469606380398655,12.87102028809328,30.533181304527638,62.318853432767256,27.931597542478457,28.91125581243533,22.38287746908541,46.17966542396114,43.8569740188658,19.106193071570413,13.525853375243164,32.57698811869108,23.54199692031918,63.9299400711059,25.265972913866364,17.367160663904414,6.791648171747032,73.15175644328585,15.230948807933384,44.4759988963912,32.04765200109075,54.44014780514418,34.702941397313644,24.808073936859635,43.70453138569017,30.36888111301922,14.400753581531353,30.397511081775676,17.509802018439245,30.21250548385009,35.840889167660166,51.126043572079546,11.96119700449967,22.18007158399096,33.3335208845511,43.425578106099174,28.22048701998611,34.75461113546515,44.41088394932132,11.570595326801438,87.21567748586602,53.85638587968653,27.590094576859,32.01332137065857,25.09332244014234,28.968774291129264,66.38714182517135,59.31070434768645,83.76332438223696,55.93036369185289,50.237707016590385,21.698530510253153,69.63175503048852,65.3847634221997,6.544761899104877,24.25691153692224,22.07979755966321,50.70451579152507,13.921158834645677,14.51402351818832,5.461723559537152,46.65288272622183,36.779765305122005,39.14743269027142,49.11985468523799,15.703388151239952,67.26888358677883,63.2428142660971,10.265647215941001,23.23078234480469,13.918277076991924,53.977576817679235,8.379510442529142,22.515335592640035,68.76269278292443,3.5846288063649716,8.757101251721759,17.813312049491785,22.054802162991194,47.301661056826006,44.09969230906219,49.334387144050254,21.603952878096965,23.42699334228132,66.8538428289618,20.960447751236323,19.393408537263674,53.43490510301928,20.74665651332868,30.838169398640858,55.172690716284094,22.565936408823827,40.411252816358214,45.79527475500048,15.867341388503942,19.78679608476744,14.354235235195386,26.861038103248074,18.93079359592442,25.54601802510774,35.38917919664843,28.96536159085479,18.053221249568487,26.421851029436727,52.499580508348814,14.03801412882489,20.60722667616629,22.98871223727174,17.527915392047444,11.55359121221732,41.07296928342487,18.897131895996008,58.12296438601174,36.222118356513334,24.702385484265797,12.968373522782091,29.571894704427596,40.12752548363086,30.665202292295604,23.833107613769734,26.401085364485077,24.962721172159032,31.654857241332493,21.69296202571453,8.36087729911544,21.320516210205874,43.34688507367598,5.2183294762340156,21.991982880566013,24.56525164060978,72.7051933578467,55.455456256108675,28.684601514407724,19.55133815306588,15.559183380207722,20.79173496568164,13.164106049092895,10.200058081523437,25.807613830328684,36.0374241514541,9.865521338520194,16.357776184258963,76.24358559074044,38.74503401873807,20.606679119897603,26.07924852901205,44.985479222881,9.956240821969853,39.077308514598826,21.795028755497803,14.948788469888674,27.52440106489621,33.324933759007074,59.31883906126552,45.88272675610434,22.90095774982936,49.0205081456028,4.114586757541431,5.10733473812094,26.62940994606902,73.6280221525156,69.3778144533045,16.608529809266106,47.722564505257765,12.016652349652997,62.3550571854758,50.55785243793795,10.12309844950678,18.489586283362506,8.284621464837318,24.402704737289202,52.83902908852609,70.55867252957384,19.81686699762937,17.327546301336206,24.80190766556086,25.81763567319115,59.95652142330334,40.4714247576956,10.770331259393569,18.320293380011435,20.532163016149063,23.41284539881848,42.798059077984846,42.87402469935992,15.280238833709182,27.550997019782447,18.35841021535596,14.241948235180573,18.533238208544596,44.34371535684889,20.74305471854663,20.11753659796628,23.184144544170028,18.728619717979548,23.69587041659973,62.31538457790583,32.59960973220546,10.025856828687877,40.5265142591449,35.26737374598732,12.348862553310909,21.629967335024453,17.223119026640266,49.3926809062201,47.42531054973465,2.975997962766533,24.358120609839816,33.511362725456145,14.303719923833688,34.052993359023986,19.09457627816986,15.997785282614675,31.145686673099217,16.303235534094267,68.9142375457935,11.194625363565196,72.79915991820677,48.28065373600046,34.853077717867066,35.08170478710838,14.799377244888923,41.27618862266406,48.48512516178489,7.943028463247367,66.2939125741839,14.657886761485964,53.285900408693095,53.694608446718775,36.38542994031461,83.46779780934432,7.709249257279819,81.58531469572645,41.530240517188204,17.010931471626016,38.74099356709358,18.575454036814047,52.77624285627936,34.259198760597855,21.525761000547966,37.1984714410795,21.697208076594297,48.038642447862486,14.649975668175347,49.7903517286607,8.681402755526921,24.697200676549272,26.581985955020528,10.421575327721932,20.239681476302813,17.10629979179057,18.573198098963633,27.182162181817475,20.935514582241016,67.86340440570063,44.25275922011444,5.959029847830481,40.85298616289829,13.635187298595035,6.618480927244198,37.0048501793767,19.6035541961538,34.74936931541343,40.477569628603874,13.838724540671066,34.0811242962785,14.570037105904142,25.851332387124522,10.924991690795302,12.47292827609143,50.76675187244336,34.11455816014942,20.061728141580364,44.48083111854639,31.76807804783656,77.09487112322253,19.817170707798105,48.93766581819565,9.01370723513509,27.490602480162735,7.045440030459126,37.03677666977839,29.26749052719983,16.534138414081504,21.259498827710413,44.46025341149627,37.696233146908156,60.904978247921804,86.01704638372507,57.52852042707825,10.083182919302768,7.612783534882431,20.118612901443356,23.605729905504855,40.98320642403474,3.580623075241432,13.759265800137548,57.17933270473065,37.404059424625075,11.950648507851506,38.64028270894045,7.996685878003057,24.59115587264843,35.514310469361604,92.33284024135145,33.481716299567076,1.891249579081902,18.051114936100536,10.316927471813047,3.061550810999961,22.135207579145693,8.040706552478563,59.05190956917024,1.5150908121059026,76.59373620694639,41.20060575718806,29.827128696961132,11.303660208324583,53.007622695136085,28.522944505418742,21.328807012522567,19.840562429478034,21.19276932860821,20.119945281366604,74.70143243115302,8.82192412825212,19.44163467530931,0.2536802305084662,63.68586025661656,20.803955999456164,24.717078557483404,65.28030229787001,51.32598555120876,36.14165999848058,17.5289975802706,2.5091524285893483,88.02157326182801,34.333764467714516,22.517969357525953,68.60853368254678,3.7502440921157874,18.67914073876775,3.005575780498901,15.282963170520649,15.999799225116414,42.34105183086742,58.250738692977926,21.6332351603865,17.060824236359757,26.703133158705846,17.289565500437938,11.862620435500196,27.370969371466792,24.22174554182724,16.460730121790476,20.95343155994541,3.154811972758475,23.069377810265475,3.8452699810914686,19.406545441540693,43.90245256719236,39.432115410016124,14.148493483352906,32.1369586507784,37.89423376180943,59.114158401102074,4.4967224500167084,18.618623601571016,27.951870664710952,32.893555502377104,9.570956956937941,14.865669221264831,3.501700682865054,68.75026844966747,47.62381549006558,54.484697975752844,17.12510491895149,59.50177061077028,31.359958048148513,8.103143460110143,26.822236639830372,49.11114771075589,14.01238757690426,50.234582443370975,17.034008427780705,19.522727586040737,12.113997322018292,47.72100261293144,72.55620202404423,8.556509665644644,24.051323886655922,30.915906471371017,56.06905836026496,26.708933184840554,6.848274307255622,17.402137740608893,17.309144205424676,16.431213024571363,3.845110856309723,18.449656552625655,32.549804163471606,21.566490285032575,7.659822881594599,21.1003936362058,14.96430372830406,11.108515686984498,23.667584617811602,11.452877279337052,19.327033527294297,6.9999363906698395,18.865550354352415,30.870038725965777,37.56359266526642,33.42063511685941,2.793387977241715,14.827311781003097,19.62032863563817,29.66756381875168,48.47873188911532,16.644217019403214,14.375898937818109,80.23777164460512,46.75819287174692,27.694928829436687,50.63968384207593,18.45803465240542,15.598464161107223,38.67663944718128,24.269728989066024,62.31080442817528,28.666485842870937,60.403065036017814,20.369884987181084,18.027906868216636,38.01012909779806,62.77413390546202,18.364515438408993,47.17868337142588,27.097971768131764,26.07197355955836,29.38518377010728,52.50679826230677,38.83549657602549,42.88727684531626,32.10193393028782,11.068421322363378,47.71101147374702,14.827262481544235,9.566850431132654,30.32374129061524,10.812765806742489,88.66424298107312,24.707488428846084,62.38659913427172,12.042650737775638,9.273840935312316,46.26602301845618,22.220026536483395,16.703423642125067,76.77725339095193,27.260792945902256,11.555708612515332,18.95626816173461,54.50115243511574,39.89295651971436,32.54006115714242,37.895139857357286,26.795815282829096,15.455981826003338,12.34631184265692,36.86404225868738,62.59298561099328,19.576642055381434,14.03479108589034,17.26880375550197,14.36611946129872,15.828760092867714,17.81077971016701,4.139298174810829,55.11815951730886,49.17859479451691,12.950125739335325,4.961675435651239,66.20346742409902,10.765351057088946,19.459182397110055,17.98713945076037,47.60892355038595,15.605632757118435,6.667803995326268,6.262445899467121,23.88052514035931,9.383601588946707,56.26209708390134,7.982113364293182,18.256424100821405,2.437359746566926,22.56818715748656,55.38024494916709,25.333998747721147,11.84306506870379,41.03818149122845,61.470186375844214,30.00401613048252,8.803720631624165,19.397968978746583,37.54133107114829,5.579761966190299,10.19944523065514,11.301831724657234,16.703834724160462,24.236812161857625,76.30408878332469,29.65124982717667,25.711141743720397,55.9928026949271,4.351562200856599,64.12794227528742,3.1030214743260083,30.033395552851637,25.170015096744745,31.524584383128666,38.80676244540112,29.889054757123795,30.75282044715838,11.663774764364174,12.084571690508117,69.55689283950176,43.71825840570953,21.19764143922932,20.246606763917498,7.313724581512398,7.623822075985133,3.1117799480516632,31.641307377268646,6.50794194453055,9.932509601591704,51.911476987322516,38.828962604241,28.62088350076538,44.78640854507721,16.72615969238013,33.888804612936035,19.300895733331892,30.40924544765825,35.97781355649437,32.174779814168325,8.786559081872824,50.52181817615465,62.48451031822633,8.658194159309264,69.34409351303924,8.726311300662754,50.94702690827873,28.6514804933635,2.789434977099704,18.18165372706444,32.58139094985981,20.36827094271828,44.28357543425632,32.034591244000154,35.114868414939586,40.48885542520571,42.948678350764965,25.588900240926918,38.47794496516715,32.5705104358185,42.03835190259193,25.71774426036598,24.554046215692075,36.03750416019287,58.8891970739342,16.387360285449187,11.746759320414517,12.236853449378138,73.33849858629338,13.128963594812891,29.442508897210054,15.392571437095405,15.192274604585187,22.963868187213865,35.67106537033161,23.52509908961544,2.6913689726754257,13.219713201781012,24.893627804960452,48.832038384338425,9.395720505288226,51.743414272955995,19.2158248844782,22.802342040846337,19.047020111513586,26.68888650079177,17.32890407688613,20.824971109732825,19.384023154472185,15.790125110066437,20.577980212563357,11.082244967937033,5.4689089256128645,26.908075513054577,20.10660698517428,18.190320311583964,21.06757123476314,49.36030776129658,7.916815635956357,12.928253939918358,31.20306419869356,24.413317698559347,18.363838975008335,26.071133716746054,14.127430839418343,50.28719281867377,42.34745150529656,23.602714837429197,52.31436383104379,12.969990375473774,40.697724119170275,19.567421200716204,37.40063398128327,18.859082493379965,7.920356022052647,46.593149651407884,13.163666196238928,41.89650110615298,16.293306234254963,32.55943253156177,16.680307507570134,19.089391065213793,55.396335330588485,37.928626632564644,54.7048420054806,3.100260567840138,22.249466628180418,36.2302052059102,41.08570182126863,42.7528375402376,66.74122613601563,13.21492683521675,13.331821967423593,38.31991218455402,63.716287695378924,25.835859392741803,34.44706901898056,7.671673611971331,2.4569286514827375,8.200727425294707,38.46596306341594,54.56602601907322,43.04280883049297,50.85862408481588,19.998920981138145,20.625310013589925,14.732270933758736,13.203641699213776,50.89053983760579,38.45264340875933,20.249248188944478,15.730572310199353,36.131505674238824,28.914971070747296,22.0605649465449,8.752126701861682,63.54207749741866,60.4584422273288,8.265887633141396,18.5085391601402,50.10523318165862,40.80080050959897,34.13080807490584,6.920104105269518,14.584534240758595,40.0971431859925,21.277220151536675,33.443566283357086,17.58704236985528,60.9598589112007,16.83610335911872,12.346856574310046,18.73800661086742,61.97336338658046,45.70543772014493,10.926026028625703,15.819532690975468,20.67956296005255,20.551802136960976,27.983343531422015,40.13036593175978,11.884173182818714,67.45361647156618,40.614631807739336,71.2218578341911,62.7428359283974,35.62509488262161,51.42861418948726,5.908778810242177,37.646286788298795,21.13546783242863,10.38252771943433,19.462764355434917,32.77780309287144,20.644532758841834,23.06395053121334,5.948804427924459,19.078506626349203,40.77561899994769,0.8274771691787932,18.20190431213565,5.913259477149565,11.03575851515707,12.673637686433338,59.49315505161234,26.494831080102077,35.60890923586081,25.6790002405938,30.76981902680668,14.09595346750082,53.26139637816438,20.361966894424377,13.461144697765898,31.00202171501423,48.38107712535975,12.994725308057248,58.33820109720889,6.150023594354195,77.4331949239019,11.570102257381237,16.32965650178365,34.554151033109484,28.875883490808896,22.726597554104586,67.19427645350477,19.853167069062565,25.21263039786718,38.973712101178165,30.38354440372629,24.340940230059218,16.879455165708457,78.34027743308161,40.07049430648666,28.44538086367406,30.988754763881236,13.736145705867667,30.956483462369427,23.610570112210333,62.72959247996614,29.72613748885962,53.09412851054185,38.89802823738717,24.88955225375066,42.46681237403658,9.753115712903924,44.14066050895251,39.43921402998039,20.87940106531734,65.86130791824007,17.530978653071255,44.24830123537072,44.10127127085574,22.078523561310526,5.192061869075653,61.87512078143398,40.434690913543285,32.112029078952624,41.73868749703001,32.45460304466656,36.193213627677125,26.34334878842575,18.44266259051854,2.9398626557543617,50.58336325516425,20.2089205398802,18.377554751932937,24.897324532018196,25.393608742679838,48.96946203159582,37.82261021418212,8.606367935382762,52.88768413835743,53.69387436730621,22.19858568570975,43.31621665239146,23.469209544179684,30.36511447105647,34.69616699040783,38.5697814592587,17.092618270320195,9.480202038509507,79.75102206357624,10.751256173760805,29.660265511308765,43.15387324299981,29.60399063970308,42.38051391309831,6.480568478748617,87.44852592954325,49.3467516846502,35.065493588155306,28.3304553507427,32.11878821516489,24.315106668720194,9.013561361395269,12.602119044170156,41.695299915861334,32.57844124728847,54.64100591121681,23.643885908959426,18.51585694256176,9.876372378572107,45.22103484603459,7.351735272824198,63.85086895627449,24.397620168444995,11.88185129224317,54.5624981671352,17.823011439523363,28.192688182680605,33.68960521566286,43.60326001413302,18.27714163427045,17.46117482625343,33.428681874271085,18.4609247613122,60.344820480407684,18.61093457220978,64.9881754335523,30.337627683471013,68.71195130178633,11.976968306404546,16.443468012608133,54.58899756981154,34.568162786189,25.046443311778596,13.550751091008973,20.005402428283265,46.27472879259856,14.91010544145108,24.43696011567499,33.87653000154141,31.389343140873645,49.11885854551164,16.28494485535036,19.31980890680734,53.51879116253003,21.212652422760826,35.675954874737826,1.441686111057149,39.32127092780688,44.58188484664722,1.0216462597077216,62.48484026799234,7.8381179165425525,39.602491643545065,19.365769760752453,60.56503192487568,10.276476211592605,16.11557861948281,14.143057502188508,16.808601903699206,46.52048616365134,33.55988413249006,48.64090765182615,44.42808293682019,22.24004795568695,25.8531746368939,17.280436484828332,39.577379692042264,71.02389062985371,32.39018395125032,30.0434877654599,23.392688472336072,11.371282447282857,1.2917868849765428,20.78911907376225,40.011560248265624,23.15318716652527,44.25203359256485,61.76510649264765,40.839766418595445,61.638230306299455,16.052794550863112,30.345527962005292,31.42451602556437,10.196904999250231,26.122645378079785,17.41897900556659,23.30100100165639,22.34714784692556,17.638673347645696,12.067891784375629,25.883478605425935,21.18366166777786,27.01859800804155,12.836719394455326,46.54992844313522,33.81179209982317,13.800140227762121,48.032723819550974,32.39981862806576,28.341512301277845,23.413207191408958,25.270604456433485,32.696920486324075],"b":[49.14757747818905,93.71891604986881,7.525070286858715,50.928726316519345,13.899167870458843,46.349474720905164,12.771523113274394,81.52133944336259,40.534142745495195,91.47179618479079,19.76378000253037,42.01678201153348,77.95073473271349,79.59211068006881,75.1040321067039,17.94168738021972,57.997676174130895,80.70531536394903,35.58933167789508,21.119998839162157,80.65384075102816,19.606765346857713,62.01573445351982,58.503110348444,75.16132258709027,21.439581603710426,47.39286971937513,57.32820817929192,84.00654190802435,57.07680272917207,44.161158491909326,33.57048122864012,60.40517122188609,64.87153671376699,20.680325702349172,43.006526583825774,40.78082655680318,45.459056336795605,65.4338052374929,21.340933808072663,81.64063216049463,94.89980324232654,21.40170938578208,44.30347458464574,42.700178990953056,71.78661107762436,5.568396417786903,35.16351412840199,62.073349284415926,81.65616672254701,66.47853604919163,30.17862275255929,43.871100787878184,73.36826417816253,84.96734004425042,60.83401459224174,61.880497516362865,38.99090356183544,16.048194586166744,42.853673015716645,61.12712590381304,35.042583090367664,72.34144074972372,71.10709617294941,51.41814903590919,76.2134638770601,57.221978297933255,27.526018298768907,81.07267588040928,57.76590397933723,38.346730472933146,27.26660461559259,78.45377202136139,28.603267947061774,64.03028823841605,36.09709910011261,68.38712038344886,22.96699201322824,45.96223243348217,45.168576599514004,17.19465301480646,53.58213589304796,63.04621334962021,23.66115693955779,77.47073229565451,10.955255768502221,43.452526166049125,39.06016123255266,28.671941749505578,18.035031902033033,11.521889799514513,55.02097372382891,92.71282974691141,2.0477091521932422,14.544759364512903,42.38813375598004,54.332932001161545,45.79964735507429,14.61434372669494,34.074329536074465,71.00625860245859,46.466240729747,29.655320477369663,78.11398090624138,53.73963975947354,46.11421625999076,40.041425131125386,36.68153193646483,78.81577863365114,81.96633178175273,75.73503208047465,46.96477984844666,54.208249918399915,8.785658020955385,79.08209479548056,40.27760786656604,55.40974496477922,35.83534116166611,78.74039770617861,41.650535327171774,36.528179008292526,68.31514409339704,46.99215736530378,51.23591979653747,44.762549308283596,18.625641742964014,67.21968811537917,40.284251778303755,72.43511531465944,76.5274064887828,90.19969958110917,74.8382212913095,66.03839884797783,45.22751963187687,34.822252183432994,89.25516594912285,26.920438699337296,98.18841049787481,58.75934915330642,74.35109776723041,45.14778047125744,43.391126801078876,57.138147760726675,68.66623127316743,74.1877293188222,88.4858921620401,64.3468462548824,82.10077093755733,43.868734348929635,88.41886266467333,68.98333158418896,7.1696185560684444,26.019085500244575,39.13591211953075,55.330394498959095,15.278578888886116,82.24168883705099,9.898151030184161,79.1720829976243,38.5015278042065,39.15852565214633,60.15716223759357,53.37180290348971,69.71473451944046,78.22714462603989,26.846672176885512,57.8753201855236,31.515324170465625,54.59186896667377,13.1482291870071,50.39168922576479,68.96085999443602,5.421307094537737,28.534202293051138,48.4873406443906,44.89140965383994,66.34594697357585,78.34793848045125,50.977441956652555,32.182876513381856,51.24414452420936,69.91105976618961,50.98103081279047,77.75366531356603,68.09075891949837,71.15970128781956,92.12676044071576,88.78428283553758,58.454335131787914,43.72418341267232,47.00083794512471,34.971134832138404,33.341791944663626,25.86585464081844,39.307958058309104,28.302925259918418,67.65133928739245,41.15381917621547,67.62014631891215,80.54021634594667,79.79096629991218,58.18571753334592,49.83993599471248,32.32514369788797,72.18151602880204,22.806924349407222,28.402674112172676,57.67494783091733,45.226672170500805,58.87407813670421,52.426747368080896,53.93100440921056,68.69377766502036,83.80726732087695,95.323064188803,69.71717916604504,30.974081651747657,31.616163532746015,46.366122152632755,43.40994520523984,58.839000417577985,60.16612808132458,41.023775377929546,57.43090849385897,7.543254351689024,89.25182162938903,75.24196127185813,86.84432232126215,65.08400334349811,45.526843575517944,24.73191204803289,53.99117007623066,25.694543400703036,52.539493658631386,18.05521372442749,67.58635487166205,39.18783344013378,24.089611660625565,30.347110294296566,77.59158941418627,92.31876312644172,35.663685706540264,36.41598993816414,59.849709575434794,10.888046788136378,57.799668235796446,27.35583615336295,16.846805715999107,70.35442526765482,35.2515814111935,67.90791098359375,86.43097629162594,85.11474168261434,64.18667285328345,15.434210386448175,30.95476360460427,32.231891945496415,90.11836891520515,84.55166310806646,73.91296008746855,79.5657971989317,12.070141366214614,73.02963037335314,51.472851766617595,20.670243061956057,18.94816016293726,8.977153406530856,42.34309249625212,59.411463730336465,77.46919437905939,61.975106833583006,76.65681374879588,75.34620148088521,33.57651995816708,80.96077466408667,71.79972292728043,14.168874059579322,54.49431443925969,22.699096866250738,44.50465755861562,46.219316042831665,60.65762195360213,91.67295089870287,38.15602917899195,74.32562054296302,29.657803714472948,32.52395976500131,49.40744604531078,81.89594659394376,81.811399018699,42.30780636343318,83.7918861149523,56.19632231597885,77.68757196898987,39.92971515935059,22.767387048557765,85.90301925161822,55.030548365496884,33.06759682279834,42.369935267500054,18.56090409278398,78.13336601625375,80.86438485710215,6.852027624322008,25.283813111860375,82.73162535294335,17.506347347202407,80.93398870135519,91.68422558273973,19.686815438483993,49.381776756461946,40.81975894319355,83.68752909243419,34.22995357386176,77.72343598677688,56.37332024585836,41.47916718065515,59.7482873734193,27.587110510135137,77.72580916704614,76.21850827912367,8.767172639903,75.66220106169393,47.87169274562167,87.23494772752264,74.00427765304636,39.03469412191221,84.16631675069273,36.74986616248367,90.73440848909323,67.28848780111932,20.892249348547125,40.14092348144388,31.17545172963669,80.6000632285311,45.991379004718084,22.185439284760825,51.09724628651876,25.48838365062421,69.3285645935723,68.97298003811629,84.04251772028275,73.40020445978992,27.669908185021068,40.59434171502337,14.290263341840742,75.89334466780772,22.433345777047563,22.64233617144676,31.47829633334065,22.44273719552699,90.85928260838209,55.86183984410876,10.790757700941516,40.95077207556926,21.188398772856694,8.2147252599561,52.03188861254341,49.08877805816335,37.11682909538993,61.28974572837946,19.265873015664138,40.83839022166048,46.30766299906507,35.85303014819894,14.115728639027703,58.608882865113564,67.95255124883182,51.82203664828477,55.47628520252444,56.15259249189166,88.76038420368482,78.6757390928673,65.23416878227636,64.91631634160832,37.86682679422267,54.80557113541106,10.097992905993749,59.84782479688654,50.353269569134746,49.93139381758145,22.73764204554684,51.47814868777993,57.02821100133719,70.4869612168608,88.45630792934926,67.59392167338149,44.272677820609246,13.609424847323982,92.96423913582206,37.016977724869925,43.93365004844516,6.884167040965226,24.154253904130695,58.71481947965932,51.450622610876174,20.2274895010651,66.37415257875612,19.280701346275578,50.627397429110346,71.48524610158137,97.07480347480322,75.14066615217529,1.9985831010587152,46.424767153599866,23.998496331089104,34.416500638699546,35.1693623424805,32.24101175141108,71.96581791337806,5.827794575680874,77.51333263166778,79.77002758650934,44.30853485003956,37.73446172453611,68.0580008811952,80.51625095178036,22.852875508181715,26.326608004651785,72.06627026699724,20.513292621510622,85.75232007911538,14.178675416617686,49.23412837717457,6.318375428097469,84.24412719670721,30.000012697884348,68.85853313126114,85.85315159548037,87.51168273680716,40.697827554394195,17.603094457076814,6.290958158463353,89.656081372338,61.82999886681427,52.81718560262653,87.97474961170659,56.5059739738141,31.496406415969275,3.0056265306229246,17.392848615307365,62.89807934749931,71.59764150443729,59.26584941765199,30.55464699492636,20.947424501264486,57.753611456423045,17.79559281693189,45.74915009775443,70.36170479161353,72.10952954730445,21.156288252590876,34.60416168026285,20.209948186697233,24.648379590643316,4.601251526574117,20.789572495144828,45.29960721472668,40.845288702625204,55.79673385692823,40.194655249821345,71.98671868366016,71.81515385857203,15.437299427818921,36.98915359648096,93.62525415299068,43.507118893708665,18.383052904346037,16.10568151403764,18.88304724844676,91.83729445885733,57.744431142016865,72.57032400183265,43.75813317804406,68.05413851721184,43.372013432188815,23.58220937460327,58.787152885178315,61.74997184146355,55.03433490209558,70.38121237661416,21.832289789722243,42.43870259872992,25.068132685196048,66.1610551061813,77.7678431210381,15.768976120972017,29.986472222816232,44.01233040626125,60.940883700588195,27.851254345952263,7.560109435223139,80.71967922867921,21.080971512128812,17.759580422598233,5.38482955396407,20.760512059528956,59.73706235178882,26.358863563005798,18.314583872785477,92.98535346749814,16.913550713225032,11.57133552558677,45.09612067024474,11.598585122438854,44.120610752701786,13.874259735508678,58.088485941729715,63.09086116710952,59.20572833968815,85.62023258146775,4.453511151587826,21.155842145922087,46.480569010960345,80.86101399439269,84.88646577354837,23.14772506965188,77.45734608343379,83.94405497912416,69.49832484838535,74.19218277883365,57.20496321427201,25.429975545431592,31.76681602292171,52.16974074718473,27.454001361021344,69.47401972220806,60.99406937822495,67.78695436844637,25.274427289504274,18.703164069286736,40.56944007265588,68.4933304350585,64.71600715553527,49.005829285361585,49.278310828388285,28.675153906320038,77.24990140411975,56.10088740640698,70.60487847644731,73.00060047014824,32.144668506164024,15.029429555585434,91.33147410678708,30.27578304375268,12.872901641920302,60.44307019056106,42.173340848062466,90.99946112434252,41.34000807575101,66.9628062200861,18.965240839685777,9.967838531977481,91.81907414912317,77.35755026850106,25.880810475688666,79.78172569601503,47.87982926352712,13.70588744853347,21.123220983702808,80.34392413489421,67.61398180124196,35.28095179310795,90.77445702008345,87.67233591071378,36.30903767914997,40.854926310278415,54.809637760497104,74.5676305524046,23.23767631068963,40.14611683734218,18.09741388502307,87.18484896188629,69.50198875187097,47.9865101128248,7.89841331372398,83.24572546325453,57.98392340082627,49.85172596182978,48.46680925510374,90.10758789130054,43.37223436260646,22.79605755970437,40.80582438882247,61.87490396204537,24.48709171624188,14.059873592203868,14.652141231652198,26.279238599279395,39.2465511572574,62.12873220244717,11.085281209744311,64.57513190115841,65.62865157002693,32.87863339276892,79.98239733717006,90.28632591682418,53.185134493174544,58.61793284114839,83.08831100817264,56.439257598429506,53.90988441599147,25.866094507003545,45.206340808807575,81.3426837520495,10.485219258063797,48.162863805864376,16.850305148621807,28.316733945820104,94.72767664491145,56.20745559168106,39.99922234068387,71.71172771880462,6.127239667159596,73.02401987409984,13.291538114815475,72.60337599614189,27.306988571031514,44.19022412292366,55.153528863612046,89.88992780417942,48.876326442559375,13.244917521470718,14.85756029270191,73.74315656252385,52.4927705030293,37.73341333583356,22.669034582697485,8.248407622612532,27.000020392453173,3.6160534629253505,42.0988468457091,54.14932937546741,73.27306166476684,68.34004959634008,70.86215776070685,34.41641037677886,57.7775079911453,52.60707900209346,98.86649478675511,25.58850770181271,32.74726564673693,49.56675020922889,49.291585463724644,15.604664971944228,84.24053423861838,67.51749984068269,8.845217842542002,90.6049889537245,18.16704052099977,55.08873753254368,68.5167504449011,5.941623862670786,22.69613899748361,40.766941475815436,57.1337842859147,51.443218032537956,37.33704676366264,63.610147797449,71.82753364799905,55.13444354400977,43.43384852317115,45.65561522634789,46.973312477241336,61.9816770152339,72.23688223086617,44.112577886774474,36.64412682138614,83.61536900751632,47.3480292446825,73.90086361508305,14.453973854729911,79.42397658526902,56.78353692273177,88.91588550596552,27.293189716314675,31.763650430024043,61.988157938761525,68.07536973307319,23.78273432299169,5.872462632492104,61.984335799528615,32.594388845607014,53.9868396726685,21.57441696639339,52.05218157739269,53.56167004154388,53.90770575563028,19.303321571046187,32.08643974568896,67.69071298135658,80.32425486721426,21.798893032156833,58.89503201523555,41.7122949165079,69.11024154188638,51.39689780953474,54.196199694319745,48.656502687089194,28.63946924167866,68.51883338452144,64.16393683196748,53.34405367351905,14.571192764870773,81.09859080442688,26.480770334396443,75.38632236248235,39.1830506282242,23.640106779065782,84.80551031815513,53.02521617745469,24.40036718825461,74.928513898572,13.391858161195476,71.90073689383796,20.916187104225347,49.386246144787705,46.60094234951423,22.159077121239573,49.229918293944635,30.44313497443151,43.02803637104482,59.41107795174402,39.339252717500486,68.22955657327982,71.9379977912717,89.28169297937607,38.845626205796016,93.26138055420698,4.003441453227272,40.639609735974965,76.01984073126803,55.01090523331639,48.451986033732844,70.66838500622157,13.380662137105329,69.47285538191875,60.49584354477096,64.97991656998846,42.29331130359924,43.33155461864942,9.608661376825992,7.7045346899048495,8.207609608172026,52.39262460417538,57.46101670464256,61.01847602722983,71.56285680408824,50.63834585340044,64.27991917203236,25.54606718922839,13.6053230288681,86.58154940648726,44.33501865953705,32.44833412951303,25.844064628042172,47.924655361207954,54.817941055264306,69.03124199598321,12.297568226094103,79.09825673939095,66.77422391511794,29.879540088767158,20.266858154964726,60.40450041218173,56.642757397128285,39.79941749998826,26.21799099347931,23.161547187723773,80.28992335803412,24.027817298102082,56.324832687926126,27.40152205437884,94.63495547345019,36.70369792429922,31.296537057390502,52.21284734292794,84.2630828750402,85.50062751232781,80.72613212904385,72.04848170325191,57.05384512421392,28.907634037936628,34.70268101191744,46.176280171584395,66.51044673157382,74.27638836235143,42.00484715021847,78.79913982666774,93.38738258258931,70.63759793524667,53.92139731463942,7.977780205079519,40.371836129357135,43.24738838085521,56.53916553081811,39.913894901356485,46.732940635378654,30.177398270355596,43.049057921459706,26.19573387677807,51.085535700541655,79.93923942020592,2.1614103645307825,22.784356632450006,18.60140311492259,12.36530619947322,37.756885672270016,78.33255014115812,74.20640190860433,83.77681111925752,27.230648489098886,53.49667036771311,31.72769712692706,62.48864141991163,48.89417450588171,62.76736856804993,37.85707345378593,66.52168207256392,14.10317876980594,72.9777168193797,53.5509077721238,90.42294828237365,31.478440326078776,58.08776191585979,41.46976766685357,55.20173222504987,26.566218372965587,81.85842961438436,75.73324324477329,30.307052530180783,57.252523719198834,54.71271831026396,54.29832591506789,74.80694861849528,84.22027184707642,55.5479341771464,57.60675427600934,50.48374975641849,23.11502909075029,33.68694631648934,44.42621847221126,80.37323328939001,38.859489774345704,76.61552769015856,44.442848857462515,56.09094235311622,58.871546204873276,12.722610879233534,54.18123881555994,40.92967887129051,21.721581142016902,88.88868287707723,24.66749439886497,50.31345945915568,66.13724546441732,40.99619969051515,76.97598819043513,70.62284943027673,57.3476712109392,33.29618552626778,53.24082256885242,77.17357177800841,83.72720242693944,61.59745054236065,22.84231719828275,3.614987945620518,61.83846637515965,32.59886324562114,32.03581290644594,26.71573769504971,78.85735812908338,61.1823726299816,49.3718980582463,23.73509010230014,57.0128790633762,54.06501774080882,53.6644330288651,58.26763557658908,27.826810824260278,39.780144432332904,76.40612225088488,59.79496033607957,23.376839599122476,19.698814448323848,92.29433330770368,31.8925237374224,65.43621698575878,65.55754525297114,45.79034495300251,43.267776081272544,6.793512580546399,88.39926614881966,50.711519228675236,37.42356745476616,81.85666849380593,41.647035280438104,53.97842797350526,14.49013500131703,32.40508117089502,42.63213055076398,91.40747912144761,54.70636124045441,53.44583492941521,20.226168155696342,62.916778796679225,93.58243205472762,11.141121542508632,86.79635061356461,50.664660309993224,30.516594647801263,56.316867629403205,18.72194790385464,32.70562495530771,82.01389885454698,77.85215071395007,22.446270782945696,18.54404048888107,88.43519957636083,34.09032587634678,60.39824552279252,20.15577199720266,65.02086958678917,62.10370008005597,69.6384233164155,12.159865117380058,16.4814651993171,76.56491951962174,37.48665719858617,32.190894896881275,66.27626369552446,26.436741170128222,93.0092462483698,24.2149192309645,34.63371931981062,67.05764638410582,41.30308215198694,70.98437640202972,41.27322019949473,20.75444837149911,57.57540062460021,73.00495206954753,36.53031762419664,4.956024501049661,59.675367843867924,76.01936030753015,1.1173559092945196,85.27035092784224,8.268001761363228,82.86828283986276,36.055464518382585,62.746133520608346,11.957090137021723,18.63037946432184,56.53417316353353,35.83399134530413,64.88822321834591,56.916063315750904,64.40660968129293,48.24916033234629,82.54301211744985,76.36804074365628,17.526497829645468,51.14623796785517,77.11727538744033,36.3351625479486,45.26117423986244,40.39655993541931,33.467148356099294,1.7119247961465112,36.15269025610165,44.5789438292048,30.206473499333818,47.80545474999369,63.924805412441515,58.84773113705512,79.40064200355543,24.79098158498552,60.81390208416273,64.51584582580725,10.429122754737573,35.56982841696495,40.954382055532506,86.85728711246026,29.07085164203002,24.10642135668624,71.25230573373307,85.63312887606727,27.51026056490629,65.74763155841346,23.995049369585043,53.37869840370992,71.98910910170642,76.23916023042665,58.254813461094855,87.46430638723086,74.54678667534841,58.26774567679041,41.706216264621744,87.43917944089303],"a":[6.336888087859052,15.918861980566689,6.634461927096305,8.138196037306686,1.253563336542567,16.08925796416436,7.946336019248523,18.534320288101927,10.610969112077079,17.00643025306169,5.107586900123113,8.909367087551082,16.42150189066111,13.735130676413018,19.91311937178765,14.262997791913484,17.424902743084154,9.045361660987638,15.856895591257114,12.626228652252731,14.011165588112199,0.8172718594438511,6.268947002365293,11.738944765865668,7.419049527814137,4.729572038747727,18.74949590497216,6.1722932635166305,16.967607459760657,3.3618428091226216,14.363577480972353,6.310595585921317,16.66465885172338,5.545614994560739,0.38314714684733797,2.0911056042027543,17.53666377683024,2.8397822436076625,16.58535043233748,3.4874780409477735,17.38267316420519,16.743237044482893,10.948578397714247,14.903292637949335,5.2949313018084965,1.1001129138516008,3.3661438381062103,12.247010951652989,15.903294996403217,5.8186173122111695,15.365500700886287,1.2279217084172833,9.176144648370474,9.220411888037589,18.546332765443502,0.028047029974951343,3.039079393411348,11.520039084640405,8.660196504770745,7.233845286457075,16.195610518346765,0.011974440321758095,0.7604057899292016,18.391307960287143,12.452706594534027,12.65844470479951,19.91640835902161,17.735451772299392,12.690145435567404,9.107870866313084,4.198576061231081,12.949993030231255,1.7233365299054837,8.156653715006946,13.894864687201927,12.754736787673755,14.621315036870133,8.407580842534234,7.715306949213714,4.258813017399405,15.938731975595012,18.843512653270427,16.695638184861657,8.133229808044224,4.453879036885113,0.4531602806891488,19.094267157172162,16.223541143401164,15.007009340834658,5.580593125904554,3.0979203290986046,13.928150532009917,16.900525409021263,0.13792902871596624,9.560981017462193,16.822088925649684,15.017494970226641,6.6837142069248,2.6907376076711564,18.964676674107068,18.70635850326365,15.870990084889476,16.62716457164651,3.2354505781495746,17.629813467144395,6.055777605130537,11.88756198189244,13.097816548440635,18.8272674094772,10.519835546614665,2.502026660507388,18.06165141397006,8.282906587998799,3.5301808928389633,13.409799810756384,4.349017146506058,7.8258185098969335,19.82418946053709,15.437003546928025,14.14841585783778,2.9229697176876757,0.8792699919595615,18.48080066172267,5.71870313954717,16.451236115177345,13.286265747399808,2.482018235625727,17.606936177645952,15.914231377334517,4.089723833519465,11.86464490258813,11.734417651744087,7.230938138512415,17.657161613886995,17.554557060897416,9.976958240642215,10.463029591647812,19.33722264527871,14.857751302447767,10.121126869905716,6.294896201369395,4.7497367419395475,16.568364280789012,12.775457964307929,3.5408236154329,11.435683202301426,8.670339966495963,6.32207654388437,5.040147978683152,13.390958232582104,7.62772990362532,6.405983072292232,6.316185736628124,15.996851551196398,16.242293529592327,11.482676808052759,10.971711447114023,0.43347767620843136,7.150271110448929,14.115532390808646,6.432259830761842,16.130735548170023,4.177654850267429,3.6369416900363483,9.01481744050086,4.644349876809266,13.165980400220283,5.995422139407638,10.708470582244534,3.248559792309167,10.389448669384965,6.766753395864087,1.8275984107873233,3.226650473453163,5.074253069116037,5.418296492525219,11.752125985376889,19.628186153186657,0.5968079172894081,5.327999816699038,7.070045698485088,18.06577238084909,12.293553477080522,15.37252967199267,7.436022081537521,7.91796992122749,19.444749476196137,18.508289752897053,3.969857219394317,15.255934869218413,11.540062632406155,10.7331668166762,11.746412219652749,5.447365338287589,3.211689211624029,14.950777959106155,13.904848502923596,10.85359301079845,17.499910159293954,10.503483917910557,5.93428998099057,0.5120408071255556,4.987600525439491,9.15232675786148,4.936769494829725,17.34757260250133,8.553813776369722,14.7733506063174,3.423871734310726,1.8817395761276856,13.683791802965363,10.497979925915658,1.3950045165746605,13.316290200774347,16.78199767651725,16.581306359930096,17.856660742345817,16.219694315664736,8.843699423413355,17.292869287684802,2.873200622147256,6.721536252969211,18.51352278297704,4.594980480054738,3.408140133754314,11.718112557029986,4.638110599873406,15.568933907412138,15.186253138781268,11.818757623670809,16.837143378950472,0.5930117959786063,19.366104175353705,12.929135903849765,1.4154760725535231,1.259219250344148,0.8738686962383557,3.0478862195303424,5.767602123902336,9.911508658232147,17.772269392551635,4.475629918187107,6.1066699324437,2.698320006565047,6.405231111095144,14.68903929463024,17.491197836038694,6.8384040279334,19.474052197802727,2.5683105156564245,8.867410360040942,14.854966769263548,13.836891356557164,17.293216117125976,1.6830343623272093,1.9396463403336694,12.804883191656984,13.181969650691325,11.078697469379385,5.404805183803831,7.580426619236742,10.87872731822031,13.756860624732639,8.958851436731091,0.8489032165228316,7.364965876065934,7.6748780232597325,7.851164989897801,14.535521997587967,0.22364368978430083,12.765198898049427,1.4543485022979086,5.920959093299327,0.5389532879534187,17.124252801123,13.32091332083833,2.0209511779032585,14.181081377826303,3.988874389842665,17.38700702753934,6.554984308987413,3.8247927345024557,12.452704791964862,8.19417172970267,8.962608624063751,8.71905894942513,13.625705138941733,4.279659594501073,6.92181728276001,14.219194798812968,4.378979564398828,11.295998772479138,8.579689478943827,8.236363381105765,6.113252222280581,0.479777486794708,11.2504651109629,4.22624775625545,3.415584381431125,6.015936329699834,0.010190108156002964,2.3897333400852228,17.088698771431254,2.896547520990622,13.418371102137518,4.432518538271397,9.587579691993353,8.92122808197664,17.25672734175831,7.585608229355945,14.60821011255307,5.915310393492015,14.445091802472888,5.427911667253,18.16644181963526,19.74678776542825,15.739302072493725,16.472636229080845,6.738818879799564,13.258084444407388,8.779198363978011,7.685349278199007,6.345622827426469,0.7000673304189142,9.275922066958223,11.517662909343684,13.009114982932154,15.73460558968816,5.029645856929634,19.30825403963709,9.345064581576704,13.179861605734278,19.463934683112,11.082801262301851,5.494061252343356,17.5176853106686,18.400667694375205,5.75578691932066,19.22950944436595,2.9812398752409175,2.3976332310547965,12.886022178881746,0.67235327339072,19.040147877950737,17.63113614120664,8.92932648319993,2.5800688775213665,10.731849040890612,18.397194312570274,18.12895751332824,17.60612402440006,14.873818196664654,12.107173807767255,4.434675012208569,8.909215747658624,11.212220849274104,5.724094671762683,15.713272087253976,15.203034615599869,15.35916376376889,12.956994249726268,1.940858181171623,3.6908617279859834,10.420857128003949,17.1626658940764,10.37866074367547,8.800190195449611,16.14867367874443,6.725100640316546,13.008518381294532,15.11693422694754,8.941116375861412,5.3975973452850035,15.130032045518437,16.980927174642275,6.181426070421114,11.964266120767721,6.248036483744563,6.038815081289286,6.168932756150487,1.2804094381625664,2.4546297179707777,18.302394643883694,19.633934485542845,16.593722761975936,18.98813370104471,9.012127286968493,9.179941498757934,3.3846088015185183,18.446333406174958,2.162931449627017,12.120950220869462,2.7683363271959127,9.595010453839517,9.715001425331034,11.138622726424403,3.5432987053108445,10.518499222459372,6.472650619824654,9.141180212699055,15.265337220889243,18.188616282403338,18.232847381757836,1.5827005732772204,1.404737880813407,6.914421914717077,1.4220270756326858,15.037969437021776,6.443252745817087,15.930599966006858,0.37716419634968634,1.3847447804595836,3.9556126560576343,15.641939366995881,6.791363627091238,10.383810119617216,5.855792626784853,12.842675896655567,1.88841161344389,7.770340686021084,14.32197548422964,8.90416670846296,2.5646674523528423,10.75586031342775,0.017991854363583748,18.853638104550406,11.829706256583709,13.678715537153723,12.498827024900315,12.011186560858027,10.341930036461129,15.484828868453896,2.0433791483806862,17.77144502880665,11.509699332279801,19.03167956363665,13.203627663380217,1.055185652381403,2.2952082526481465,3.004606008142874,13.487278668977186,13.907002317238026,0.03806421465114784,3.884368799603224,19.670685581370037,6.771696310941455,1.371559725055147,14.685869120685812,10.491106843058603,16.64539883088528,13.43654578763537,16.117137383392873,15.574403369466786,3.082328365805358,2.7844625557577496,3.2399850053508317,7.216741290479796,18.076332907391457,4.34772674343634,12.461044691070718,18.90181700045881,11.496608332057905,14.145649552487694,1.643387982562916,17.984801080898322,17.93289084886287,14.538775943765723,4.610927476819979,5.069303546391071,1.0537457148127016,12.427655178143379,8.460120182700166,3.407196614373089,11.317783484615699,16.09617301827744,2.946959220269414,0.8598704187941797,13.634221283960205,19.59227135784762,10.668708668138617,6.774064296783853,8.658410375709117,13.964157027478773,8.666364688738009,17.17307953903054,0.6697564272128176,1.683666747120589,11.692833368161049,17.022767674436217,10.830585364537848,19.663667815721908,6.358662827689545,10.924938887638799,17.18108888563675,13.375268873925208,3.7521604368319705,7.446433911110124,3.3530140966664135,14.223078014568799,4.971494891390771,13.204771045077148,3.8065293670043943,10.174871133207146,18.976826696747633,11.293385779631473,13.35033019111037,6.603380607109957,6.483474806925056,5.499112851020005,0.52851494779806,12.675276677573724,1.2547774160589498,7.726469468203088,3.9423884477680504,8.12214534980268,16.091337621285152,11.636620066144573,9.627225371703947,18.59626755388576,6.662725651714831,18.953948933563275,15.07137054584386,17.477984803458565,7.823394097170242,17.78713005306896,14.455375071291247,9.890381176895566,11.685499636384296,6.788657165747702,19.85420486951918,17.717847077145706,13.423188604315266,6.8048239492113005,3.752246480631003,3.137162812317862,1.4610274842470439,15.702985009946847,19.929867348464484,11.878064250283877,9.200798127613599,15.266466084325012,9.883465531787952,4.482608397606693,19.089276472324816,7.840721965640518,2.2330802834715424,16.35823491547786,2.7031785674448905,16.573984255740996,18.442365096073953,10.199684029903207,0.6578846859655174,4.918226978356288,18.76964419761011,3.2354858104861295,9.481887666490248,8.080656098060071,7.574686949692944,3.8661598834389865,18.235084052470356,5.9552530076972765,14.183141030159444,6.511568957189011,13.220637867530908,9.815473526145624,10.02113141817861,8.553686295349156,18.98893981909861,4.060031971152975,4.1351353174238215,2.5034163896281125,17.004139289216326,12.378384707171112,4.773754110073729,12.210872479647765,2.900020255627469,5.299759772743848,14.741947085076337,4.7979383319586955,2.3872502710035137,10.471076639848791,2.2825364143226334,16.658686963540394,12.144023416594436,10.206398498100576,12.267396412203041,5.355520803759366,2.441940061543768,18.533390954428537,1.4939676713600791,7.212858385523244,7.451486958924827,17.403151057449257,1.8188218551699276,17.447754908610445,12.392997345836182,18.415192602890947,0.29681794530985517,10.12513578135664,11.517490491576417,14.0885940555421,0.13669535784684328,18.21795467830702,9.505562053073525,5.324520008954701,6.377697281822985,7.628468199885088,11.340875080073136,13.893131359090226,18.441683352768887,14.634348389961138,19.4238378215666,4.339328469938222,3.8372918905277764,0.01996293487499301,2.7347794487828647,2.447304029260824,3.3112438761954266,17.492087217908864,19.555271601543126,10.451378599129955,11.519575260624006,2.0751395796284733,10.715908727497832,1.0307085570974062,10.107612790846607,8.794625934555649,4.2764274536537705,5.944802811078489,6.658863315073691,2.464424958699496,14.0797101478993,4.181265605394651,2.3927953213177044,9.799797917982108,15.893263912327589,16.424562773880513,11.535113173752759,10.660199831189043,19.93645618322365,16.547989218266267,7.7023798042649805,11.541311604127337,12.83214905091025,8.747399663143586,11.115687563623883,2.257162067443015,6.0506937165226615,17.385914876425694,6.050301707195902,0.9706265804820813,15.451765191164334,1.855660754124786,11.634174621989914,13.647508759484616,8.691729003973538,1.2787243357913392,19.31107636492742,16.347509744636763,10.046904503573163,11.39877774946559,12.259113510157324,19.47396213070144,18.387661523360176,7.8347442653156385,1.0178353641468307,15.72919391455553,17.27796287237007,10.734655752320341,10.527161766287549,4.321316990358932,1.2579026925576553,2.2074972484629063,1.645795894700246,11.20998823591568,14.810547610748031,10.89628232754832,16.133655476557877,9.623407233577886,5.606285836673486,0.1707984949757435,1.0875455280831359,12.638796418131303,3.293299043112947,6.777123756355725,18.157408882553035,17.076733484712246,19.74339926134801,18.89496710622653,1.150020673590606,15.378242603967704,3.781658589152994,7.334961839711647,2.5823716573610023,11.166130348084153,4.220398035080906,3.384698580140575,18.574493228524233,11.164473140542386,12.697575784804247,5.474872893616243,18.061022619962607,6.41440199924229,12.508707080915507,3.7401522951725896,12.461267126549519,16.91616590119592,15.192019364755014,13.563198351303258,17.332792452841133,4.627753331113658,15.832571904798897,18.44648434504039,12.907889536215915,1.2525229732458776,18.483902081298275,10.711031584095597,16.210423223552738,2.832226273874574,19.191621021388553,8.79346414674345,15.973462390679991,8.610815392626975,19.170776984059174,5.8053657200507525,6.071437536659112,11.136816615422287,18.45987082941769,14.986235147991568,2.642699683817953,18.396195039800965,19.535773115620835,15.116759274146826,15.879571173460407,13.191932488734409,13.123748401549392,13.111205423866261,16.70958504353592,12.533926630354388,18.003277379570758,10.75873862677335,4.962706281926104,1.0653758651479306,8.057424521913807,12.37306264429304,13.041886618541874,12.452545100275763,14.91646339384002,7.848480175683892,17.384262943467697,12.389398165652686,12.699440159637536,17.16256827202458,6.613122004169156,12.111611710768528,2.9023134378382798,16.87222221110602,4.219341702509318,10.403250549974214,1.959130595859091,18.840110562784076,12.827740152187772,1.8101554297741362,1.8970301494981534,15.628644840644196,0.3228945833271668,0.22146681634853227,2.124901784231872,11.831521564182609,1.145054490757036,16.590885494693634,17.885510322189234,5.653693325401332,16.57177311575275,4.818826370326943,2.8292617916099827,10.744530611265324,16.35945895814647,9.594344357639603,4.301407142589331,2.080328621379315,11.129761200204445,17.18473821611434,18.352341299817873,18.614363001884904,3.8793600573065623,15.397307918217077,2.577304035468697,6.034692013146552,16.991540718502222,14.64980518296565,8.639144044059144,3.6771474110345004,14.55791432033029,10.510453591321816,8.121313940036035,11.106482245647552,9.5064880695049,18.2926707069375,2.853151531969007,4.117830487481466,14.159257501200205,6.876082216661077,0.4278085683230426,4.005575038295306,5.657649285035458,8.062120972185554,0.05292387745730931,14.163708741421658,0.03627830565057888,13.488380543953337,11.088957073364544,6.656239958700381,11.175297362690188,17.9325273724212,11.703158153857643,8.193267035323114,14.552976543547809,8.684568585078512,3.364425228762453,0.7583169399730982,5.6202212454928135,12.665751576026235,9.027453985348446,10.217379424154789,6.313828819793872,6.254100040286854,14.273738749682323,11.811039653296437,12.647151875500992,14.933773173443715,8.749335210893182,11.303217158389636,2.3503114657417967,2.6704558373755516,19.338585065152408,17.570780881258855,18.413644670629793,17.863815313774776,6.276458455166867,8.80976401147068,7.991564706759071,17.6250952185786,15.225580134764725,8.977354508257477,1.8207240657440638,15.89959302862097,15.813229139696801,6.052604877972696,6.462021281664674,13.535027701268167,3.60061834295613,18.823716562952747,1.0632745171053948,8.849543750447001,8.948840105379944,7.257569813056786,0.008210967048816187,4.024134957494634,0.595643125173515,15.492072622016444,2.9120178932898844,0.9813142551417098,19.712261799475815,9.116112389593965,0.7399691888390292,2.892159737552129,5.081797755291397,17.80752787504653,16.921487499468864,5.128044667258402,16.925548228709047,6.200667283702717,10.659223713042469,7.5083379989820065,13.694949095417703,0.8545367141409921,10.251671800436831,12.925077617625353,13.784109305272194,12.037639041656938,11.862686014546542,6.342347277854956,2.876530666103889,8.107070310398608,17.464663347382917,1.8111750219806089,9.157551478872588,5.401282451386402,3.1212819109449796,12.731682168226106,5.73516247787929,13.32015028147531,18.63289204410659,8.542925036643872,17.720503655872175,0.8470860963057047,16.357955814652673,6.947174343998919,2.1856431460927217,18.42111273322554,12.105127522414385,13.537796205781625,11.573614308556305,15.924501015048325,4.594662165382091,16.292404742792517,6.373413476259415,11.041845656644483,16.732082413945935,10.06426925309352,0.5014932682828421,4.6226808012775855,3.0846485802669843,13.981966175704233,8.940902372340842,9.176906848017667,14.76431267007483,19.383847408117788,13.453236668351455,5.146819443641624,3.409784788004022,7.795171093487823,19.36129411411878,10.460507004500744,11.830113946396903,14.559768849567254,17.21018100842974,17.05569850377772,7.327502059341464,3.734380973388851,12.365995382004753,15.726711008103283,10.771873374954573,14.02510153322047,9.01870135042483,8.77304039061599,19.265236896793976,4.0549448057268656,10.272073336610244,15.398121237005654,17.704919742611015,0.9430042695353302,0.455874812708994,16.30833380557376,17.13425288689651,0.9274674250664416,15.145606767611168,3.2031713726023003,17.28553468685348,13.698771124004336,18.662536359861697,4.989360353133221,5.277827445153487,4.381060628523676,14.611441880737669,14.445169075180315,9.216015610378886,9.579170756512369,19.175714044652224,15.823448810457887,12.672748911787659,15.10673359314563,15.60182801524344,13.467313573638918,8.526851607585261,16.069482126266387,9.229810367416338,5.758401404189568,0.24330403002630785,17.152852852180047,11.004211120717247,3.906575905880092,15.184230722210108,18.676169199720547,9.786125116772645,9.68972780956558,0.5639923893320509,19.59946348905512,3.2862531956370056,2.2755016836239905,16.824202220045184,2.7335856089222332,13.899245442499758,1.8720539319188,13.724138591356763,5.8975144686502645,19.257330657592252,2.443319301977618,12.673870237070574,3.6396074512628696,13.727073004645845,3.8348868013715043,4.842180991876179,18.931095103758967,8.119514541661438,19.392391700125383,0.9831946969171979,9.89540874380931,7.573545608234413]}

},{}],45:[function(require,module,exports){
module.exports={"expected":[0.1696650483830763,3.5481740740334367,0.036253618600961046,0.02781082314671226,0.009866094725041715,0.013216636373128587,0.058483146132629484,0.001372809197334153,0.04061614842123714,1.0131195936660815,0.0002786949346256441,0.04609328803820993,0.3060003732462515,0.08739666560328573,0.005862906401630526,0.1452783215027095,0.04053193155502723,0.04301042818117757,0.055233026039948646,0.015798000644958093,3.359946859007288,0.03413922563189861,0.018764085625563587,0.007545832407325849,0.061647816666646864,0.04521141644124587,0.0518856766970435,0.05970448452604448,0.04962431183912724,0.03446902639808979,0.00012067547893068158,0.03346386992281923,0.006599414551877697,0.05123284155387439,1.3773085665516065,0.07113373452499355,0.054848924813178816,0.05016314852827823,0.052032773016259026,0.08207624166575449,0.06646360422973852,0.054112621533979624,0.11148704475605752,0.05927683040085844,0.05536222258781647,0.05133246753911922,0.013071578177743461,0.05342873788094834,0.07356701311173457,0.019826585158675525,0.01198829326173135,0.9202343190959977,0.014205141277455603,0.06126145778042978,0.00912626681547658,0.055544614994037816,0.0029440793402175534,0.18512408701907218,0.03348437849517057,0.10079208303130921,0.08979525544107973,0.02362231249090836,0.04700175143967219,0.07422557147495898,0.020220917067180426,0.02254874183757576,0.06901039494757401,0.17390122731360402,0.13418238956553374,0.06378599658980234,0.00960667463866622,0.0663228152145445,0.0076054807884598065,0.16180346363546275,0.0047615481248920125,0.40390452843456465,0.17610189367619175,0.0021644623326709557,0.015176308113736511,0.04487823316518481,0.2720559481393359,0.014924528776999414,0.05943370545453966,0.06393219274805576,0.08240864363888335,0.04129380495609329,0.04235431890144295,0.021973419050791174,0.08488844740168479,0.06441763545954898,1.1383355393286108,0.1441279808724656,0.19713813653042234,0.07076218506555526,0.007086203248508464,0.05745136503424167,0.0023117823680256703,0.06416386153779365,0.022224376370635974,0.008864091412283344,0.13045875542243632,0.031191889357144443,0.05097661549787293,0.12967372633427995,0.04746425720279883,0.01144617257897294,0.014821124380122126,0.23880700222628812,0.004036926574890404,0.05767809080930721,0.028970617850435847,0.0061299364367112886,0.0751724186262438,0.022083938541313314,0.028194552315765835,0.01352824137934817,0.1617858313027727,0.021071531915490133,0.12256331488927923,0.06035483675783626,0.0016449199664988357,0.6444620955456823,0.010434556575720446,0.38834451906562295,0.007623977503908154,0.041724185702424955,0.08479695719093923,0.054245687955629014,0.06483184974805019,0.5028565820036407,0.0488679401575713,0.08720978350377645,0.3960584778329142,0.012126354338260762,0.013516077974442152,0.0010256851009630226,0.028083791049978137,0.00017848308967779178,0.06393976678455804,0.03802404705291772,0.1682722693865587,0.0404406009697339,114.36686936093376,0.006117664841529995,0.037893360217365356,0.014576784783032091,0.08378949503676325,0.06885496534641478,0.04475314491805171,0.34762301283543223,0.05804767886112266,0.11704551928841235,0.11775450829285249,0.06284697944749189,0.0059937343260120495,0.6001625961775663,0.16961767477632464,0.17852643772904433,0.04031307416630971,0.07194292222315905,0.06020160743134319,0.09639279769445899,0.18250728864730023,0.06512303324875905,0.023525877091539728,0.0901852442699031,0.03418705562091218,0.08408713517132861,0.04266277708532456,0.052771013971475655,0.05200221031247318,0.034709488469282214,0.014846981210183803,0.07010633222339406,0.022832366826954678,0.03691689706836548,0.04894501782105675,0.04518842354644256,0.19480212651840487,0.04310405094343228,0.014880324886873013,0.010082066283136402,0.058540046409576815,0.05968505862402589,0.014433911215709465,0.40314242816526236,0.18423344848048218,0.04763832949491323,0.28649699141802093,0.03689472798746031,0.030247424888048786,0.022648075000776972,0.018546492214478953,0.03185629755543653,0.007795372100069596,0.04559598140750537,0.008030720796289578,0.15142853835056486,0.03504303435511989,0.01805515281475895,0.029790025243522363,1.1304162756932814,0.20234858758351573,0.01671272940832064,0.00601734705026868,0.011091753410696594,0.009815814798761152,0.03353160439197914,0.1933135890556349,0.12335798672808412,0.0061263768530515714,5.534560475112262,0.0424195159427267,0.06607669824927406,0.2484951296435107,0.03744722121929291,0.0552262304049092,0.2766511450337697,0.03440233298715091,0.12020057644725768,0.020495750187431223,0.42960202737932196,0.03189307354175087,0.12950341995856213,0.12011702599816655,0.16289330885199255,0.04870802811156976,0.03527123751359731,0.054014768207326376,0.06892308975057726,0.06869907906420858,0.002087913516730579,0.06480606693696724,0.03436976046209615,0.04600511844233777,0.01066812109006422,0.014307532075757,0.03238443160427903,0.12293731980385568,0.04763655921126999,0.12215587461521607,0.07212926684684713,0.028332252417904324,0.000653854483705669,0.19394424296020576,0.016486022111313153,0.03303234627320476,0.07777522328976666,0.036480840078740744,0.06580959503143716,0.02766928090220008,0.07003787554520859,0.04912501067456892,0.0320644415313075,0.0067960105712899874,0.036286603821298856,0.10389184174625658,0.014356653434346108,0.0603242038923485,0.020555517216917164,0.05667250504686555,0.015988386307026984,0.038095126949824566,0.09143093047097701,0.08542204960826226,0.01582152192252131,0.006436905384904209,0.2026001559329891,0.042924493982284685,0.057953743488710276,0.018569630263766745,0.146351395125238,0.05071535631267111,0.056636236977096424,0.04855133160897128,0.0560616121701533,0.40018586305437964,0.08184914379862754,0.005197365525768612,0.027266940359353304,0.03554740951883467,0.1939365504697083,0.05147531106091749,0.061468231495202995,0.053232517281413726,0.258859216689359,0.26720687205967414,0.03837130844430057,0.9109282612965427,0.04378750863847734,0.4161361531521415,0.09409444278070671,0.03995290448469937,0.26505448109790014,0.0994549139830879,0.05744962455075876,0.09561694747857306,0.03067190965336168,0.05563062673199756,0.008810346953327254,0.0304914651949795,0.08915561782800341,0.007524958112810591,0.006306279667242407,0.23118578149749403,0.0644900866919552,0.1132467735110859,0.04172898983017881,0.026804715908996062,0.2347634344209652,0.09031824086978481,0.037973908953194184,0.05885396584543317,0.001244078449613044,0.049519236782253416,0.13470519491687213,0.03445744823048493,0.23430946359386684,0.022063272285508747,0.019462382698863658,0.04931375107252238,0.04129110443604575,0.11028813428295334,0.03926244665537973,0.042234524035563666,0.015030832855602718,0.024918981641397595,0.05855253362610808,0.0187117900668303,0.015129478270826453,0.13755212759389876,0.09876183765349761,0.038043604953817006,0.1984766315727582,0.02080530077219534,0.0061478088144375975,0.006244356792156086,0.16716260700078994,0.14103509091402605,0.05460252444842238,1.4102098674662777,0.016649492673937723,0.030302536457010257,0.04833699303698088,0.034750409721989485,0.03206888561963359,0.11492891033505007,0.03405637463507487,0.11751518741851184,0.5063953231539479,0.14459263201774625,0.12648881019265656,0.049893665705438864,0.08325774505230525,0.11839238293350973,0.04271880028099988,0.04753419160689344,0.05122914122263854,0.19872275481158158,0.01395688732141562,0.0032716320368424245,0.10016979823600612,0.09230557287312972,0.09644441640009355,0.47277957486068495,0.026145080280572688,0.02871332021636564,0.7044354989302771,0.05530344769228997,0.0598545281922125,0.04748818779474572,0.05170288083400789,0.03531847892832089,0.04197105466557663,0.01186991284441718,0.05715660037859949,0.0056390600112085605,0.08119851410940197,0.06805988875811424,0.03355391588920322,0.06428372645796296,0.021898423913435515,0.028281382050171108,0.22184833698544287,0.0350723411057754,0.09255876381961657,0.05199561628930234,0.08989418794208937,0.12403974262440902,0.02562963231610856,0.012076196139404189,0.009740763060565113,0.024443540528233623,1.679634789503737,0.054091552735491016,0.029449738259732072,0.027602583381206212,0.020101048344530803,0.11128066347064422,0.0681829001277174,0.0659606169666217,0.03508927737525461,0.011482687277081474,0.06791130505933242,0.04732127347239408,0.06740989758634333,0.0023463561536657958,0.03826448079058482,0.6199159327381996,0.06724777673917748,0.09455780636861079,0.10783477157497763,0.061871608334851905,0.01497392191027266,0.0256268954138897,0.06931673870165916,0.8142853080725507,0.048602368596397785,0.010131378630897615,0.02036447862124823,1.2027935575555462,0.03186186543792892,0.17978308977927554,0.019307451277426394,0.044228837146972476,0.05300375762483895,0.01832415422171876,0.03307288538471322,0.27794278394477123,0.013189351215706727,2.354184841766694,0.47531436694535006,0.011979444066121472,0.538005738095796,0.32992646314860036,0.00017264999944956833,0.055711593817270234,0.09751116100966285,0.08489182086208802,4.987721337690973,0.1107232979927674,0.02466714884099115,0.037701262719036795,0.15711546135709464,0.04103188256418017,0.02050776777275946,0.020260831205700307,0.03258882518204338,0.020910426501867346,0.08776906223485735,0.01639954884238829,0.04080347731739765,0.058737363529328845,0.046575414190957,0.08819854322202005,0.03363123180161055,0.0623882753255472,0.24030406457934006,0.012515160033944997,0.06330367058076741,0.1682866908578429,0.02727476112111269,0.013130268796294725,0.04998568572530535,0.010728250485700032,0.16534941302147513,0.03728350543529272,3.8109362713240102,5.483563655701514,0.03999730276943573,0.192940770216795,0.09741577389118809,0.032826026920836304,0.2804622804470178,0.03574076276667403,0.055874887269720716,0.7441907538534828,0.09250122892388989,0.04466743167834863,0.03990189372534661,0.04855983737617703,0.005604451082526609,0.5615588467476986,0.1954946909183239,0.23004196570589697,0.06294696949947697,0.0913073512871665,0.04083094311330937,0.11586306143256996,0.08551439346826518,0.003914334766715334,0.006321759826560104,0.07836772702918625,0.03534845311461683,0.07014407125440092,0.09310446258669604,0.04861043186319002,0.019306705181513527,0.04938568364711594,0.22586270057232577,0.411128359888084,0.042949803350364885,0.0864305134450197,0.052835419351504244,0.030866725750581792,0.020262478308025706,0.11470486579661088,0.3586166459772125,0.03890825357838829,0.07357439370225011,0.21699268270662822,0.1351968753807385,0.03754026580473052,0.01894158008248791,0.03851470545133707,0.07124188531096376,0.0228142605328387,0.10450296885531775,0.05056916703927382,0.07046324616702866,0.06429191259281673,0.13846106415104661,0.03124233126277994,0.11189873633606476,0.2975827951664067,0.2909370360108995,0.022911456104418852,1.1228458937314427,0.0329830759243594,0.03562416480775329,0.06600342600199129,0.04664722158180942,0.08758996822505755,0.028352224762669517,0.11038141186631811,0.05776614822930107,0.02996682006538863,0.008932060508194301,0.2509881944344427,0.0542664718977691,0.15480855642325214,0.5902279466435696,0.05837764749719949,0.050556829506316785,0.0460147032677767,0.14229664619420615,0.0795101075756705,0.04615164058400492,0.05367119291904542,0.026373100113844066,0.08577819943450261,0.04471352398843992,0.07369319365376026,0.000992483783200678,0.03656296384981736,0.012505428177151164,0.08125988416332593,0.23873385064450683,0.06113425917407917,0.023309342633044777,0.019850053180841407,0.08484285627324024,0.03442253676710694,0.06671957678723468,0.03941474737041362,2.3783201862032746,0.05997559156152637,0.051082090504385815,3.5898269732106547,0.19498949029899626,0.06393852278758323,0.04859655778649304,0.2307589243404532,0.06301478325492144,0.06753691408425432,0.03249376584862802,0.0987267860592421,0.039143479011345884,0.05686943542602173,0.03994163432400674,0.03225324658338767,0.049062120531584846,0.04250032648220621,0.016070063772390255,1.239131909794993,0.1944091496914059,0.2496565026071877,0.038172770563924506,0.062228430278032154,0.01734659746762738,0.04366098142688438,0.05083163208143711,0.05798667917042931,0.05405859436088063,0.029076570724779947,0.06655101560881907,0.021763273235111458,0.16073696187473901,0.027111692810778704,0.18424253587413858,0.005986456344104001,0.05962634012530349,0.12636551276995375,0.19594852091875475,0.010523503447334302,0.003338222523448054,0.07269684612476118,0.01064261247282389,6.723878122649232,0.017751640781336408,0.12592947108857042,0.04458410710190623,0.02191066455479338,0.23344081811636289,2.164481081377691,0.11537972784785842,0.05041672252625707,0.047016436422054574,0.09141020317661529,0.008814559942567187,0.05416587422044185,0.09834868939333129,8.202358719924682,0.01740514174532825,0.05842218571473243,0.021357165292896243,0.02057865623057849,0.07272364447409559,0.007027916951182127,0.053243573952273617,0.03543164619163262,0.009308235502208818,0.12205648661617062,0.4504657033169411,0.04122981620056096,0.004252413613580969,0.6367312945072445,0.07350913071137026,0.08998955719782854,0.7822892750640664,0.03831097788725002,0.28087135382104395,0.0502452909030313,0.09427134811885762,0.07365760813700921,0.0028329445090084222,0.019723798107790617,0.01059440577077854,0.034312806335103654,0.0939264083994167,0.07026435956499566,0.04614463100695845,0.022157724893319096,0.0493598157104033,0.2279067041312646,0.04677410094444945,0.08965926213719842,0.040299777020305065,0.006362615634162463,0.03253737469923454,0.1920801623520775,0.003886740346607069,0.0436533621479249,0.2626734011269549,0.2004603041490707,0.06286236129323511,0.10141272578016482,0.011457470825813217,0.0834311922320781,0.05471797720870297,0.1474713040029897,0.1340069178824256,0.22358762485901984,0.08344986494195897,0.19123078909754304,0.142235736941952,0.3084914307082951,0.07414233462628012,4.302461540204677,1.461825459580963,0.01107900590982095,0.00017899501810244504,0.1323872041141681,0.056132463251075605,0.051615215580705975,0.1328171375030071,0.015047080189817772,0.4494429677261335,0.0599016471557866,0.04484439751970102,0.080083509104715,0.026749081129451287,0.1567585371172173,0.042232190350048444,0.030462623915619717,0.06412635681914307,0.5095527394157913,0.07694952789711529,0.409462750573865,0.011571058274853857,0.045000957145649854,0.2794770499770773,0.04977650019267901,0.023198893025383097,0.2128973154260695,0.027335677805675546,0.0011957764131457571,0.931420208811612,0.12088110065282544,0.023135991299892116,0.010828402146433469,0.015827624207776635,1.6088373069262725,0.020415415852161587,0.07431321443124922,0.08573052718591728,0.053170474767469736,0.030742662358757993,0.04017305381656486,0.011216765062228776,0.045538738705103755,0.03253034782470515,0.09860885606438567,0.005325041998198706,8.431481271376326e-5,0.010586985249073994,0.006656666387049843,0.09220193616626743,0.3993854431190308,0.00871828645824264,0.029878480911443125,0.09896718437967861,0.010561050831233825,0.01567214886985565,0.08476142076202633,0.011147125154463254,0.029171265329798673,0.07058076523894964,0.005572625161221008,0.03301268692376105,0.047139244294439414,0.0050214556687401355,0.026921392069136903,0.04318728422466755,0.08772858401113151,0.06016874017092458,0.027386445246624362,0.07687580135625527,0.038396367950194854,1.1518865692088462,0.4788440836039869,0.0031724076239367923,0.03148259908541217,0.19124732059578312,0.0793627053649153,0.06689274274730628,0.033757136640480426,0.5111840289661099,0.2732088128069802,0.5322664241671775,0.022967395988492255,0.2033950111840176,0.02487653743402177,0.0420660948830865,0.08294245362430677,0.055905158254855425,0.040828161877581905,0.07648247488200335,0.03565358284753693,0.055968494966720225,0.012547716558991416,0.03216583266473171,0.026325178913239773,11.52326597256574,0.03234383059876374,0.03972406573013468,0.04151425757940428,0.006674369489284396,0.02468802340734766,0.012612010396466372,0.02349358932408347,0.012675975145125109,0.0707165279886953,0.15918528086464984,0.0015888548403212104,0.32682454091018437,1.1908598169805433,0.017092816358489357,1.4289150124925938,0.10896600247574303,0.2757250295670373,0.07150760733628454,0.955031959719261,0.04559021769080386,0.11229878866862225,0.06489206531391074,0.4710282050562313,0.08085815101555732,0.028594052284085916,0.2409479270599267,0.4557316448616036,0.1467928058932312,0.20852140610244632,0.4687464202185737,0.051322212446074565,0.059903402548410166,0.04927040676822725,0.028462780136005613,0.14532433394713823,0.11670607748306755,0.03541982958888419,0.07768821976862046,0.05343969521108727,0.0554267099234172,0.01976504034554698,0.10726749448086506,0.0049091908773722815,0.07353102604811876,0.05488361486787963,1.2543979641124396,0.061232356213858,0.023727568994172544,0.0071256083476700155,0.023795954696707096,0.0881413160676592,0.02356393032965539,0.056988984653771425,0.017905207840503295,0.12160028815640277,0.03591420307267905,0.011757039554819194,0.36814294150442306,0.017625746168330767,0.026033764467791626,2.633014517757908e-5,0.022514843847111755,0.034337474338189754,0.0017654269179986277,0.053271081373944436,0.008516392788219324,0.0016877476705151138,0.14169277722931603,0.004802899231256605,0.07007074521469722,0.13303010065520096,0.06414868281712152,0.09197270885116787,0.05109963624840904,0.11165193779727789,0.3276154352811993,0.004540340763849003,0.0021763460638991637,0.07586672615420338,0.027926792450388243,0.02248851412791448,0.03823136100124148,0.04083915838887488,0.20173368395863106,0.041426915119133045,0.03751291866772957,0.03497844194455788,0.04837220245099274,0.04620195347957597,0.0054917090076248365,0.12681429898959273,0.02504427489668844,0.07957687121636906,0.015400365768525805,0.01722878725051047,0.03184697018570094,0.030252352463255798,0.035267828001695166,0.05312307646040505,0.046633033985292,17.840363730069043,0.12839186815616718,0.035431510678337844,0.06506213681879461,0.06508542438885831,0.8371252946408143,0.05766952201761698,0.06643605426603899,0.042640161829638305,0.026116726472958464,0.07065264086475637,0.10836178866269412,0.057438192248197274,0.051183559775828835,0.024046565341665327,0.026813120058738718,0.004157193910671,0.13160390665136246,0.02634607521968037,0.04526233017052444,0.02514246185977793,0.010367681689117732,0.4305316627443217,0.06963341929810299,0.007926308968170422,0.1173042683260743,0.04787814101294978,0.005529870371611337,0.01040588303340758,0.035593640933456204,0.005406660135560225,0.012063438580169141,0.10230615261078764,0.03715881893110519,19.968461065105174,0.06361350982720644,0.0005319469377226578,0.11431465700161998,0.6624101694705566,0.0031818875810386824,0.13387707697281606,0.0038762116582938006,0.0031438630085111113,0.013787270171744125,0.03431092969413812,0.04656405516128099,0.13720922432653307,0.005745325215906589,0.1084381574031765,0.04041518352856723,0.03961147511910566,0.14009062076169831,0.13438245765023096,21.125730291358945,0.035564618100588655,0.013543329613893155,0.07681598067187742,0.07319860009242792,0.027596508949941652,0.013881834849702308,1.9891317722225816,0.1636381014769373,0.07627135213845422,0.08082838509431181,0.18756105373101425,0.04640225929962748,0.08765195795728845,0.019462887171293755,0.11046673361004726,0.013722721626815051,0.040398573071320186,0.001707040467900229,0.0871554172485795,0.013676635120922466,0.03255331418539591,0.06670580319865439,0.028103834733047835,0.15699335096163802,0.022114460569570657,0.06781530929014726,0.06766102859160149,0.00978126270753985,0.046352603384071094,0.0014779023278370012,0.02776388582705416,0.01011496933934863,0.25833970310219684,0.06021964422274991,0.002259457800602999,0.01214775083796541,0.11793124252079461,0.04079371051431332,0.2276252313801235,0.053015657604931175,0.003406323569596042,0.05416725300116977,0.05447245298035664,0.09306641409729005,0.39214434557852523,0.11263589600110308,0.8595613211923558,0.14739684286284183,1.2764073153563613,0.11805612136719948,0.01706151193544477,0.08436153498252492,0.00857221712918337,0.008068756104814926,1.1189214812352182,0.05214965536144291,0.05260978970148108,0.03774452618085733,0.13822349265864783,0.028894050080519703,428.1003530787873,0.04380768221306459,0.10437027843282314,0.05617044851796839,0.09934529267246021,0.1181653955988643,0.6908846261898219,0.01191805376713464,0.09491521362490406,0.23093725583684982,0.004677018465056091,0.08979414283069777],"c":[12.470576099805898,17.325963606666814,26.30757754156656,8.629597872641229,25.963163578621373,25.026822531013785,26.89332338551212,34.95704280373147,25.509393650549853,14.881123739053955,15.170873676707371,16.32628351335994,4.386662501457703,22.22608080870924,37.56194922715649,18.059394227053748,20.479180198721053,31.893594738650894,6.610862587710505,13.658524534226716,7.622506937206575,13.98584594985817,27.868873813216666,11.222587238970245,13.076567664656146,13.376655083076065,20.761375735875102,13.195059931155836,11.6282056100875,30.07478835118023,42.2016358204521,11.452186502160252,19.325190534006847,9.722826270386735,16.92160711627179,27.122932510959725,35.69862999874871,16.325790129072274,29.480828710602523,27.688266866827526,16.322396915514503,18.09476792526686,7.7368382438672665,12.676567818197697,25.594885951194023,15.226823585897723,11.69105782582946,18.079388410636998,17.685601216261997,14.74807818140495,20.734984918621354,11.544559845022745,18.378359148280264,12.219292890990069,22.026832613340485,30.10698280224805,12.125468832600026,7.175039583288205,52.6396777053743,9.889647073762319,24.494430618911338,14.747158042344717,9.859092667564653,28.043819888490233,7.662708170835948,36.2035712569965,4.098279700183302,22.37058977718071,18.968582980700397,26.475384214384167,19.237918539963466,19.397381035600805,16.8828424164034,20.380981910352375,43.058247732904405,2.482766415629214,20.679314229331883,32.57693787449561,39.38869331443028,18.00263897818803,18.465530241631626,14.460051239932653,24.308699355638943,4.207402281942116,22.813271636474738,28.13154551190253,14.802884574829402,10.693677912990779,12.04622250845357,13.57783664289147,10.7535334780175,19.69864407898759,8.092763700896487,16.689235803301653,10.929927711287043,30.684774094472456,29.998428158371365,31.096042198923087,18.747370433734993,14.407848915425333,23.36156360898667,37.641447750393645,15.952070105547044,14.359686236368216,19.224090817253863,27.48252675590436,22.721957642072084,6.994097820361205,27.299075571246707,28.848894142433323,6.597950691027083,25.551058191503728,9.348894236016253,24.952764016525567,9.649013546531858,42.02190863934128,14.400923163746654,20.02680202815391,14.511959356751795,46.58577602257509,13.501182731216598,2.2807667190337537,32.703329475970236,14.638121345668257,18.607514865297347,17.7151227676801,23.23949387726022,2.594922546900701,10.34808870034968,8.694821229364575,17.066193112706557,34.363983397387265,16.5977370725587,31.266826249778315,26.102277331658186,25.57306740975281,33.23688028035701,24.20858323663704,2.7426998591981366,12.10116716331741,4.963830309051729,10.09689799513432,14.057242519382568,52.30066794780999,30.724617803168215,19.975177812759156,21.385703218557325,10.232641486577247,23.085360027217458,14.2449464677216,42.06614461824604,9.306204657178991,24.782942220585852,27.14223804734326,34.59135975557244,19.16281090131626,18.990346888429904,9.437558388374349,27.835141981336673,43.790052938538366,4.324051614664818,26.076026500104923,16.467163519836838,28.56626553655837,32.544896003774674,6.425111036202707,22.31339350184871,19.64566818929357,33.64245363948203,27.051339270822695,28.432864642765068,17.342127480468054,2.178160595572975,3.057236030392205,26.10295002131668,5.286687673785873,24.74134397981847,12.856535868288564,17.79631623724419,42.496240775458986,19.64013973922092,12.140532351576322,14.216582891423407,2.85461195322422,3.552423249914652,9.123788493187728,18.528514987680666,35.01558671750327,5.3012592808478365,15.905886954874287,12.200361472210512,6.427181523658408,36.51954076183753,11.92932203340739,23.48048267883754,6.021146325156398,11.30942190675974,1.3741484495696001,14.465949687767408,27.126980603328775,21.77781808327553,12.822177726927215,23.646381857116804,30.81185995006476,31.03107043154224,12.884072352792003,25.348281449477945,26.487902508542625,14.432539341308843,7.67369276913683,25.312539308495634,12.450355790055447,34.52503303159326,36.028197416950825,11.738031940097075,35.51957716827516,33.40526061638935,21.75597461162488,11.552775966007673,8.734558636798235,16.051770604126748,19.656953824745575,29.46493170595756,21.07273965691037,25.94391159334414,7.179521748529195,22.117144556629704,25.25383606159462,29.42059923036462,27.913670084448643,21.416216923342148,9.256696884316113,11.201448941438471,4.612964166453073,20.469854916008124,24.68012648703521,6.233840770352318,7.573663125440476,23.695748681564723,23.978140780181217,4.142916029719232,16.147992911315935,35.26781307122502,51.766358236457016,3.0581940142732655,26.996372730160658,47.68094248780602,24.643571375110596,25.641626505637646,6.406026913908402,23.150428236419415,9.504974419275129,33.18186723032285,43.01070887748369,6.717214766289144,10.633108496215165,10.944814496352816,13.876586636029188,28.281639111485276,21.334557189148224,8.219702912498663,34.42907940914934,4.337651360111579,26.357168849160043,24.751813538378215,5.040450917989608,1.220305614466068,12.790100366590526,29.219184450958693,33.825096281038704,46.57400999967628,12.794895061546608,9.24154704523022,9.131109072447387,21.198214448682926,31.089155267019837,6.0553567248027225,17.905478819915107,29.037063168947338,42.044898360627755,37.39841881975572,8.583041688224565,21.15218638854615,28.211675415625045,12.598609734904072,10.741748174105513,8.191583862401036,49.26004656207687,15.747110955950404,20.4491550933531,9.188417185618594,23.15239249193798,31.373597443173956,7.58067825980112,17.17514989096776,16.260707106921604,7.448443315446893,27.671151104494683,8.910635722890763,6.705759008647272,34.75960340250184,15.536430179623565,29.19318793426779,5.0172511870787275,2.4031589584813897,27.632177319248004,8.39847323825353,12.251980698457906,20.430167698193223,12.505534237499495,27.785386998100087,7.076013909019026,37.801822636990245,22.17643545123027,23.28828755386197,13.10951970591783,18.040019130866405,9.988593640300904,41.78262875822199,13.166101864406977,32.23611499108629,44.15564899633523,6.84847726104545,32.796570185377576,31.118670952368596,20.749999806941254,18.451702917870637,16.816050738589208,18.002277904895898,36.490479832150804,13.802327554108283,4.678023942639772,14.51454076639416,27.541870969805085,6.295689045097462,27.68022053554435,13.966555929783691,18.20741695786102,15.474534157792544,25.039471387195057,4.867928020345219,32.727648816576014,29.217190659201556,9.425776768787024,14.649224383988019,42.93135510480053,12.303591156730471,5.351098133403001,13.000086892621475,17.3835493848581,13.197432159094994,26.884056690688737,34.76550951446933,17.35858292959592,9.603377316803126,16.158856041954316,30.6585353024935,26.392836573493987,21.494827455513892,27.129896071632515,19.823162977746485,8.952319354367061,13.07866634663708,9.986047221069311,0.8666611114872493,38.23270860009883,10.438262254001328,13.964883235532762,20.694649454811433,8.67679548762708,16.14930374475596,10.10501040978208,36.86823753329337,19.570659775179788,18.22297166339696,34.570042025898886,31.614323405482395,0.5163517285044084,30.676842824754857,21.22094646207783,30.707477876396844,23.36641688540282,19.104187690135014,10.133762700123043,6.891963724382256,8.66699085334342,22.841825011562143,19.079979223528316,4.007976393378655,18.162824629588187,31.49787838476206,29.893419852578926,17.29515213271915,16.88891053587794,15.032904378612876,32.29028260176113,47.45859115327653,37.225553193881076,18.010116820673993,13.093612113854915,7.682221538011973,36.0695317709443,10.892551204531806,21.17525345279894,9.269781017176967,18.435016729391283,37.9309703845516,18.057050973159228,0.9311963901321035,7.788460183651818,16.307650197066828,16.637081377898674,7.057217755707873,23.847134962835558,20.95950681141685,25.723402883644873,10.412970769682506,20.899708867183055,17.77257780161502,35.31495020719345,12.595173086586305,28.02220330733673,16.76631808666212,35.722170887092474,40.65272914813083,24.03981910533019,48.827209523031584,22.758192270427788,23.4915301636602,24.627998895037948,7.760534811601485,6.84746688553686,11.60846332040704,12.916962755787395,13.052554747505788,12.826150690027651,31.46836656175487,10.965767819409525,36.5475777764837,17.856001821318394,17.11572024838768,13.8556849551394,13.25812604287604,22.113336360800957,8.579317809991455,20.415464694720555,16.241523078675684,41.343513835723144,10.683998336473987,24.616957831753474,20.019668893915934,15.458487869100086,23.845303083843937,33.60680112457602,23.515420535168932,28.39501418576753,15.886828489941276,20.738034366209853,27.503900745734896,15.191884247462768,18.090694381349337,14.304478318330197,15.777033173345558,7.289489104033731,11.683918901186257,18.062433252740092,21.02836750474808,13.777407210746421,2.211662622909556,36.377898760386586,14.936500418963366,27.326518332633018,31.657514997848388,18.305056109088895,20.72323655567744,39.605466384879,6.790977543696727,12.930198483704151,38.74804259370307,20.66640460629243,38.13167062810901,17.748930490233022,7.00917141136404,4.953031889100545,23.473653881583587,18.23465317857463,1.9426152360834759,31.757888566893218,7.340327131080628,26.76314940028057,31.3191045860166,29.722751604726813,18.49569319715203,27.447742973953822,28.655073759108667,18.791312928854754,31.912974910585703,24.888386475984497,25.981887310741424,5.403282279468201,4.522872332871277,17.6554607568701,16.235285412598344,19.789954414737494,8.875570354862766,32.83390402917739,9.817887458570837,12.577420831037836,17.32717582862305,21.817287586258033,3.7160038302594747,9.226292439662199,29.771496646283744,13.310456298725319,26.12289958839937,12.260005638253482,16.272088098810578,11.04484583924356,28.009548043132646,27.390815275087245,10.378783317984219,15.216754250378779,9.479429246809367,6.019704424511338,2.0706710422575,17.846025460835886,19.980182188236064,17.103419003683562,30.771570103652255,17.886748607553884,10.80106169043464,27.15991654204239,7.439734618383969,10.076599894954025,9.96350904440104,17.240428765193183,29.958057810864343,28.3365999010107,18.177759644419922,21.970261978959755,14.987016023830265,12.379698849865758,6.904337470695626,20.068676386018073,15.996381023497596,10.110158226478257,23.743917034330487,17.89899560050713,8.90846056494479,18.328006159585904,16.681087257766936,35.90472383529477,1.9385637815122767,29.83752693828815,34.91250803958907,19.263893302688835,15.193373938503612,7.609265262914745,6.7583990764301385,13.613899666473813,27.64486892638764,24.503664989571092,23.05448776030418,18.344090297304927,18.186189326491583,5.8704314349666875,30.475167159734923,10.021666738607129,2.2310240949628497,6.111396370712757,20.17049174803169,31.145938179037525,21.142912798826824,18.32748092213928,30.77805327261095,39.922644232323584,7.364526458550377,19.67000447933812,30.92624866848847,35.31876122127532,17.90298338569916,34.86340262551904,16.691058870996955,40.143822635624545,16.977135093423236,12.178200268807757,10.39568984949272,19.186064359857706,5.883343067836309,15.996957447936193,25.406307063130804,49.03843369811703,15.841850513332691,2.4372139830034394,21.253814124172052,19.968179214758216,36.278165916816874,13.90765317333577,3.933324605067322,16.819785047366203,28.68332059512421,33.23456599689531,14.464057266663294,2.200950916224966,21.843086453036143,10.74196638726933,12.97644825603216,29.427260008606773,7.192398231826953,17.074223042663768,14.148109206508359,25.01264320419184,28.299525268839893,18.360279071991783,10.615263805169525,21.267924243967055,36.674686103344776,20.9825850634494,15.792275531329016,25.553079353244122,7.991958327546666,16.57204718367014,8.882744512229607,24.19828938888324,3.757380008677921,22.042224848300535,12.083610274166649,12.013722122398399,39.08178136312605,24.157639759860597,13.027393207198838,16.6178444703222,23.800000755519353,12.99403313201348,18.15775404179977,21.7853438537456,10.801957347245915,36.847110385791765,30.87544412612912,3.6416697283685364,30.84302776029169,20.04054126665638,10.61111496989875,28.585380985760036,15.842718007020697,29.77607997132286,24.512180583914393,14.647924491675141,7.728989780632519,17.969457990751533,27.23219348020719,28.32753362137375,35.92096481932784,17.265365733606597,20.36077487344627,14.04539015843454,16.068690557520714,24.34199775296837,22.236112342902572,13.426244333736193,8.643129250082962,2.936386259461643,23.0467219994067,10.089547151776793,12.363517637504064,38.308135927117576,9.083838618067034,36.043552778964624,16.21286668992855,7.407271753114079,12.530237801551788,17.921332954877023,23.73756377232567,22.297613905523548,10.850749176968755,17.45772077224836,5.174564180269338,6.057996957038438,6.034830759399566,1.421219520697324,48.488960576960835,34.71251447407093,18.095509918657857,24.549978021612944,13.728916357348176,26.423587080494343,30.921692467750667,8.148653247843749,24.689517126156105,25.969232121956136,8.361617467148902,43.87858714442342,22.196218492113367,12.451438521897732,32.04912180395827,14.706637526119332,5.983036609359917,14.64947218514293,7.354684081448122,42.79290737648441,31.47370484961163,8.532743344256973,33.247993646652446,12.184126568025214,10.573029082246974,3.0520157365668346,10.476415021592741,2.4085763485802856,11.307087432546234,25.948398152806142,4.793314691680396,21.95103306797258,16.670801713492637,3.523769452696044,12.390056729499877,15.4343165460635,12.340039488914265,19.438281739292925,8.207482042359096,26.987222650276788,5.133385635709836,26.55200715886602,14.095755279396645,33.455823527236,23.82626788778421,23.043047769937687,11.356260061564706,22.994624543328467,7.195090885143163,21.766043484579207,27.816442562794762,10.431475984926347,24.98511528431282,25.988431796225097,26.27626402532354,29.551488061276594,32.85022747730503,9.945600347126522,10.207088155368364,32.077058714763794,40.27786579008789,48.14232328593363,34.32260060053816,34.1743003636473,15.433431516482525,21.95909825245173,30.243195761734995,13.012999943092382,31.748598487650796,15.136221862407906,17.366855502716223,44.37842536236454,41.97697001597216,18.30100176482818,14.73822026862748,17.104573521214633,38.036394834966444,10.250397773946942,4.438288677037351,1.4563456779718926,14.57499545399956,13.338559029956512,37.062184661006214,29.907518620663716,15.544335398526224,11.46846968317715,7.610123545035216,8.752324022556207,34.51435255380689,16.00647801142974,15.344962525109963,12.951853319127306,13.487712272259326,10.296955459323904,34.94711203965666,11.188495445540067,27.422789143801253,43.356999995344424,21.97531951696239,14.513784463751698,56.53849177928569,11.164393761554175,12.519424134567105,26.148927080503213,13.946285416458888,8.909519706180747,18.316232863517754,41.51385167568081,6.831293997883435,24.94418868477222,10.441353028255849,2.8007661071127687,5.279912966722029,20.843698214864204,14.578089207823316,22.621171706633938,14.313843934460403,20.457358393808,15.580526466167502,8.786831341607632,18.734445607804524,9.77577889044518,16.95212496084297,5.220050971724601,16.9424797372752,28.1590544075023,22.750204687234383,11.453754163513624,14.359956790343706,15.348215394301537,16.250574270649413,7.6716496053987795,11.545997661767856,31.640642555242785,35.83309732029705,12.839703820777142,36.354456336846766,6.680980143727449,18.70180316928058,2.2074109159211175,43.33600785500336,39.46108574141357,33.479788950251454,1.7413493711265355,18.21626501342049,53.292502309833786,9.853929576120004,16.835477438449445,12.970581810865475,10.93702777977153,6.694111102217338,17.171762217516715,41.413929852136974,15.480881313155194,8.31634760214724,25.32005109520749,34.566705667331064,18.332718717654476,24.018514249292842,24.218381310226537,22.792550775531897,16.00059786360022,21.7452438100465,19.502785465297443,12.57233165895994,37.82413723424004,15.020462351739189,19.343521072881327,12.3899950595254,18.090092074105627,14.608393113399465,22.260433782909992,28.44854991258636,24.29613549710907,37.790766458814545,18.61381482345655,35.033286661662615,18.69668085881372,15.45865452529732,17.183963883285518,15.622099955005401,6.098823237765576,8.01541212654989,16.500664959661567,15.445072591013211,23.386992851051406,27.39890385076452,11.889799694519585,27.416313089666183,26.628646744189123,32.385298951320124,10.106812151371123,27.36835003757715,18.331536703069634,18.960854758705004,29.240075653878883,7.682465827883259,31.66532577073426,30.21030925620689,1.3382518643271428,18.617936330372444,32.91520584400298,16.50384545563095,26.8672495904627,18.582492174853627,1.810980110209428,17.39404652777519,5.189863807471287,6.931641068652041,18.13939575506867,22.24472779263854,13.832195186604011,11.639552032928755,26.056308900015708,30.25568961455094,13.793194093231353,7.069181805472476,17.824323829394924,41.58016803680026,13.626045610546747,26.891688232523684,18.142790518433564,37.33151292524454,25.632254890408163,17.06051431503045,52.114892585064396,20.417537120300352,44.453908181551014,3.332809775737258,23.96528456067749,36.09163430890822,13.151781994990781,19.640707092801986,10.985079580582063,17.18719422210832,28.66052459119698,35.416890377569686,19.07871757002007,7.608377511964115,16.220008360620977,17.493599683386556,38.12138899222106,16.901762893283745,37.547535398620894,29.786459817238644,15.28514371374788,19.247026546289888,17.57145041581878,13.349346405464765,18.5924587954206,16.392264273561487,21.760530558005627,21.869712833331757,17.179325135878102,15.344445026359368,1.3973137686683772,6.042078027358491,20.919827024825263,23.032141705127295,36.32736450397752,8.680699366809035,16.684926998026683,19.580090367773398,19.542521189492852,27.456841763399918,17.56369214732215,8.757591003170948,31.131456575904135,13.71754686646275,40.165181139327615,38.17120263026633,18.287466682877646,46.09080339059684,29.500230572975834,23.201329284432774,17.2627908380373,8.438953017715539,19.713244021637447,13.559702644498966,16.915726855760397,11.129784260459664,27.426322506501823,33.090499797583945,46.92629734264641,27.91217030564561,19.63263531326912,12.78405498503638,30.280803293965405,28.368751432860595,25.346968985734705,10.874257067178135,25.940016141174603,16.634520131746424,12.70216838554476,5.190165171226581,10.941866943940337,20.037671346069644,5.123399243476309,26.146622548255635,12.001044176606552,26.334052522618155,29.52989774592718,9.72499815830638,45.71005523554976,29.840607359691763,24.089121428993185,17.57022318292986,22.504469252857668,6.440182219709572,15.002284941177717,29.556968017444483,11.523874460780217,14.59634395644489,12.976528345676634,1.9247447952931984,11.377796005473828,7.942132102308252,19.572679645222777,19.008810893272855,27.80295120532608],"x":[11.214331423626003,17.27892471225774,21.78338273730767,24.4211962192226,7.249087565781574,40.630504545761326,24.028956605355887,17.987816192586855,33.47675014331238,14.430944630078402,20.82350825628751,8.311003963165728,5.891784973130103,18.759697733562568,9.13317962644363,17.11779397658119,18.934701965546292,33.93884596636621,14.737018852708312,39.28221624969923,7.513593833576769,25.915147167635933,15.231195801803965,3.7283664069439673,7.4584222493008445,20.151735858335655,24.364989782888244,16.81649794114534,19.740112024941958,15.740470321973362,9.23012157860946,5.260421467240803,46.942376876697324,13.91921388668684,17.163100863715567,25.70590098597412,32.9047344210695,24.826201851349836,24.664458996690463,29.384931245311627,13.213267236544892,24.388977205457596,5.619165593093836,18.83201604910481,22.584220363992767,9.940186844141497,27.85446517690287,26.254622063827142,21.33462502125188,11.593251114453743,8.261048297098542,11.035703438487797,15.255394250472328,12.200417294011217,48.22862802787754,24.448884479334662,0.7603367950659217,9.706243021206358,54.149062092772624,12.003084659734043,27.613907727713382,11.399140626940133,17.665142940467298,22.68131964195355,15.13399402871488,23.55175298593535,10.28728302037052,20.847303106025556,18.954950034467984,19.19242291884784,8.443462074211936,17.8869958291574,29.611389064958026,22.374741859799435,11.606965768308928,2.4162776740048653,20.004071169773628,3.9322244062465344,23.159197077040535,24.231363530777514,18.752513688367344,4.785966737004323,26.61337277952323,10.710072796535972,20.13574251083109,21.31747190374594,23.47766316665742,30.372642681872474,7.457661767231478,7.200398427202162,10.851579082977679,18.98682473058348,6.067869948517972,17.536180476528592,21.33887684053331,32.0784781870469,38.43734425696087,29.828083260963624,31.414773354562,27.148446685980844,22.165328143130324,23.706205674912155,8.260697956718749,14.158733455306916,18.606941008021963,18.864042681533807,14.288995655153778,7.3875796755994525,49.22110180765995,33.47272500418248,18.643724644865273,35.947092933193474,5.7649590513892175,21.491014977364895,26.752925897889348,22.967605712574425,15.271995938963647,24.64026115916907,17.442547130955152,44.30081717369439,1.819611819570237,2.017580995646095,13.482090820250043,14.736003079837475,33.33650808095112,25.692369962832476,25.426453705058464,3.5651915445990867,8.441840454189478,8.55648825725262,21.83601093438609,29.72257782061481,17.298030133895065,40.08098659120692,13.703248909714144,18.856046963828,35.050935167460146,45.14132994759896,7.402010248895566,21.433982686356135,4.436500264676514,19.22500778089387,14.053282684920681,20.279642418051505,20.512970427690234,37.92779353106842,16.51627917373564,12.370477038234043,19.234726651433586,15.118400349048876,42.29394147584654,11.499554847257272,25.834534061978378,22.230161320804207,15.323822062954443,19.62732442690677,19.230737826146274,9.415086979218035,23.94528470699365,42.21676113189022,8.165495812396424,27.043416411463333,17.37538850428154,28.087823644102215,14.709198583070494,6.023208681042191,29.68945389787444,18.622172245895033,31.058799655524595,18.895447916731186,25.310246931120666,28.418519359652123,9.561073837136433,4.950162496508849,19.849198787782992,18.399038744589493,20.533321369918532,18.532681153870396,16.405020625207754,36.392004690021054,13.125882622375842,9.727739794027201,6.565907637395493,3.662144434694323,13.566896119310709,9.262098921316515,19.056944840445347,30.176256980650425,6.098726697592694,10.132447894934097,26.5403746826193,23.15490094808083,22.25879154117439,26.13199348481991,33.65153380610999,15.355826876464223,29.695970699244363,2.426658660248454,11.765377078160771,22.079703328299416,27.43211857503467,13.254463732377602,23.051551964159874,17.39425868253998,7.459379611402952,40.99434815864223,20.13580770956208,27.641509017128023,14.09155853617064,9.267616260657846,46.23957368338061,12.448956530006853,38.38914356656775,37.28857685407823,13.20337986672618,26.283015948929066,25.59286192253751,22.548773306409444,3.353727241536886,11.588722511159418,31.90619713769912,20.216571535636827,20.6371817429617,20.828739273191804,26.070153794904137,7.247746421073237,15.052653548820205,17.618862640416644,23.720016111807723,26.604578316963874,22.038090267217854,12.928994521203691,15.594260334440127,8.487137459484952,13.672042318836393,8.546634432208123,31.54211870002846,1.28880286670068,21.896122230053898,18.19923930217378,6.622883080673771,20.922369381889514,19.4045694464439,17.481356117847582,4.651068231916948,40.52420850802334,33.427433076513644,24.300404632200593,31.08602477275801,11.024499545614686,36.878508604419594,13.927060108431721,27.874075281267892,31.38898363142639,34.08397313656394,7.213365624418589,9.776005799891674,31.704826549300527,28.241681306745104,28.48621628000927,15.402434042011098,21.17037028148707,12.946833876430215,26.325242741786717,21.910702239239967,3.1685738787589868,28.4350781776144,14.388154587292572,30.594160155986813,32.73341656187958,28.089891311454394,12.393060521592172,6.800248624218032,15.29548774708947,24.276488634790287,28.93200453979082,6.787222218745491,18.926660978410588,32.1881558636124,27.368321144499724,28.649270092372117,7.884491519734976,27.147115320949545,31.573790463610166,20.787012472870018,9.340128732209324,7.194680148407609,38.67131750499222,15.57260892104955,25.42302104663132,9.671717821148471,20.01153539742122,38.133942740833014,6.79680223020265,15.796333700779623,24.543139161373816,7.414575457184026,16.333808379373743,13.722868469158957,15.425066438233625,22.26749623471874,13.64341955702616,19.04139042945412,28.277983802415193,4.068756884694643,28.4658490051305,6.185568860609724,19.66013186432785,38.742562212609926,11.764734108408495,22.909804806484527,14.05725074147703,30.374225464501215,12.762913868519037,15.750525109575177,15.593902037479737,26.45450177377044,10.015409039785343,24.603495269975035,35.57118425436694,29.250111355629215,46.87062128767623,6.454737639414193,24.716830883725553,23.87747202280022,4.286870728930312,33.106022023326624,21.3370462444683,6.568491751700319,16.991245608126256,12.161114759925749,3.730303746685485,23.177612663822003,26.241897793431,22.10609335928338,54.2649367649995,3.812957813943883,19.240128843938553,15.147840965281485,21.716814491743765,4.7546317950102095,47.38079670672688,36.75594811937898,17.663368699939678,19.83608601049462,31.5318488252734,15.008344638888053,10.650204510913053,12.038635780825013,17.627229673353096,13.537981954997825,27.952210802319005,32.32758831600612,17.134549024047217,5.726066170147578,22.331395104237675,36.22428889007102,29.720305629922027,21.215422424124416,37.8663701668261,44.03807701083085,8.8850656097851,13.577273935138857,14.754903979630253,1.2952079347409147,27.445253540017507,3.108836665118912,14.152240454652803,22.40398951183924,13.43467242867482,21.67564122128161,8.70460937854821,22.894569910231127,14.951294731195073,44.08506566945314,29.143055372204053,15.36010486805768,3.5873962859257933,30.94610821626828,28.612866264863232,26.427374673461593,36.889728501432685,8.33929798782185,10.299568833406175,19.680934375180726,13.716024864622867,30.98260437918799,20.42363669446547,2.2385941598526835,11.648345521597431,20.199932526106636,44.451088619952415,23.893788557407973,16.688435987252863,21.193318938331295,19.844396508748993,33.84865978376956,17.388157430753886,19.36214951473004,18.59791235117525,14.048671730098542,28.64083484740028,27.431533808578383,21.15382025806888,6.100556610213326,24.807780298384984,47.88311567662536,19.93253804260364,1.4420509289678818,3.98295333133507,16.70473281240218,16.055188030510067,10.802218686980005,38.117875631644125,30.34800970034701,19.824002618569075,9.972767173371212,18.35713273073866,40.19557093872403,19.67795027323005,12.749762106718546,35.01036476655034,18.13262835130144,18.750171934914015,42.14979379906918,27.3631235955068,27.151620402564575,12.956004731058936,22.571766743063044,11.220325505946143,7.797300577590425,7.4524893350932455,23.375887531332648,12.204794274320586,12.37247176260926,32.68823985154203,28.80243920392139,10.221479318001101,36.154619140260984,17.83301423516067,14.03053865978358,23.777798227219733,8.596891634652392,20.549778764703444,5.41343929566192,30.468834781514552,30.040579297624483,29.985305565649547,3.697888284277247,26.19579939239481,7.257571495816866,10.102550797740964,21.04141250516094,24.349339849700797,19.51208450037203,17.080603470011084,22.465332985267743,20.137626592221658,37.209072801840094,11.02614777355403,19.149700152475965,28.338266195773627,14.640344456523529,16.93058563796608,34.44980805467822,18.82660262487466,27.401902509399484,13.853442904244067,2.1608029205636483,41.54266283143379,15.37669094481002,24.497294965282023,36.89116063717246,18.804102772743427,31.652173604432768,31.680309468416716,6.895858025322576,8.21528698112163,31.64239314963537,24.696642039945377,38.79530627953537,43.38074125155829,7.822200974088695,6.199687520529928,21.763305905234333,15.236448693036406,6.204455775255353,19.901034082348602,8.558432874281586,25.14318201194365,18.64024977714052,4.525596608968206,22.35873275462724,36.464912405973976,24.248856520873673,23.714948208051467,25.94036861436823,34.68970197978905,17.16125634719294,5.817997100391753,3.867706432056699,14.771870258699398,17.820686221003086,27.090720926692406,22.526154757630817,22.76560918908423,12.438955121165499,13.802125955000479,26.432950399616562,24.250360338527855,3.1521620978980542,7.879573697771926,37.23390915651477,11.78837748092432,16.986452700203426,15.299377189706155,22.597524269242047,9.290503438459181,31.746636070086844,22.2461797067046,14.414390712606494,18.598511254245143,23.101608218372988,9.118280202082254,2.80766570650825,17.93820472480353,15.994771318590294,17.197573709494396,35.154960447503186,14.702020219615793,10.15051362461461,28.847636389401483,9.357716489086364,6.021301197462874,13.979091745861545,19.55547178937603,20.40865606122179,40.907562190006274,17.633539937566262,15.829506691931858,12.269222848506555,12.904755879320605,6.261367057702323,27.652262334720152,24.499288714175094,11.109392745203358,21.587023628107616,14.594174346881633,12.577255014539142,10.424988626352572,16.39450203161498,40.03646565100052,8.086480861238568,59.167067850458764,39.77412099326762,4.403355313207087,9.799285163941306,6.199376422630331,7.368871852819264,5.7913840206208,15.689794719335744,19.342560412002655,18.29034303391794,19.069403934954455,29.55868565044515,5.946811010430904,26.212530634722526,16.569710953270192,2.3107440155545276,8.508286018462297,26.78052728589024,20.94441012632969,19.428067780437154,23.291063517193635,25.834081387314047,25.882918468159698,9.060901651126908,23.839262875668158,25.67306448360061,22.879063941123498,23.82901426025343,26.183744534653755,25.70343962659885,21.842215498063602,16.814953732852562,12.160367074884856,10.945470950571213,28.18070146019746,13.417994392334112,25.031637935856665,31.730013011377693,49.135033234901044,21.998642621785883,5.052719677466516,32.28796334930358,26.793889002276252,23.551082426128705,13.321921161327431,16.10139930910246,15.377817135331561,12.918243415081788,28.64449317207592,17.74759185051528,3.597396356448357,38.37681023729175,38.51941816929815,16.560901203347512,35.58396587468995,7.2217161185174055,5.81430832665107,15.632610304296445,29.376196511964892,12.26175864733624,17.168782330685964,10.823999501102726,20.42959784657512,38.42934111251731,15.701556280782151,11.970126560135931,14.342509952096377,15.12182427353913,13.639228431120255,8.845635738729483,6.137697621777837,5.2037546465848,18.48241399798891,24.933383822476955,17.188469185973346,10.748467986807718,15.847395766263034,7.268572158919061,36.41315764141579,24.305571871114573,13.862955368577087,23.723060025343727,2.85511672386403,10.918315374798338,36.27914888082445,31.22709130286278,3.561514063088882,21.272462474532922,21.166485731932408,15.23901267471927,29.321893904063945,12.328042050175963,3.823297078812794,35.007427951001205,37.357705299087435,21.960835343740392,14.46757830121171,27.306532206317964,25.18424723212652,17.397678232548376,20.989259398371498,21.839193526745433,20.508372366532992,17.07646852208396,22.038577758125463,27.76813163994256,25.27757138930349,9.262866477476475,19.845334805928438,20.643028278057606,9.192746485822113,13.505010716345708,38.567712026446614,5.418138460735353,18.854139862887152,14.581538332243165,12.340850841578714,13.05073434984737,18.95862068935175,22.73617923552496,19.8043476092959,11.697086437351182,16.91979592123779,4.333316041809206,4.316399832066663,6.064100331318807,1.6471500585082848,23.391374194965138,3.65463778335717,18.5499912233959,18.16605382359041,13.560441706433467,26.07009340254671,18.810892722975385,9.02001712051389,25.939544020896616,33.02695562410964,11.744056657735854,25.728141101642922,23.457087808695523,23.31248762321163,25.310151954118613,16.391425322819412,6.569974531750287,15.019171438997336,8.464826435662035,24.805063442564073,35.18165241672013,7.7638240343912965,31.601497139210466,28.18779875509952,9.075653615872989,16.860355968731387,24.093303295040077,2.666283702893959,7.662679868225761,16.141342152298336,33.63721941217871,33.40538712075195,16.936386798497043,8.784951767418569,6.213433244670128,19.310907944617664,13.583656138685523,9.05192205971018,17.34231417460808,34.1138424128832,14.93368503675895,37.93613990774486,11.856618406009975,18.85387338221994,30.055560211515562,34.66945121009025,33.90984146575323,18.366387206569527,6.214414963739552,7.569305139400594,12.016616471805381,11.084799119054237,8.047712211000125,32.27791058158499,28.49539509702976,7.81405197670822,20.175468648023806,9.608135606894368,31.71230190030152,23.268261321758917,36.693404749625365,17.752369906883313,17.87928058215536,29.140508794125807,11.47416818312689,14.786192203060203,15.007600202355183,14.833876416935023,20.783094601003953,15.423990818374158,17.021824846081632,10.233583626161684,27.01483056407499,16.04812794172006,18.045815031470436,12.374339395310662,27.546406534012682,9.999166029828716,5.279060807540299,1.7240728478093788,29.101975825291824,15.2509140381569,43.80358500804233,21.36774869321571,10.88387840184079,17.303170433184807,5.628813324805664,13.239781104225937,24.734523640329563,14.239440983754296,23.034920012533224,7.358934115125062,9.631292977368968,10.329870870345745,21.211491617736232,20.964024001303752,16.887405607245544,15.796277980859394,35.1870714995378,3.9252137470259165,35.90462537264763,23.735238519034162,17.176699650700918,25.616277302480768,11.430521965890607,7.793679292088318,18.516932901338624,18.08005367114127,6.867425093834768,25.49857834692464,12.071938319354253,1.9852412502576684,5.123516724361933,17.711430051351627,18.541644094971662,26.363525933046663,14.26983708118772,20.370406186742144,9.662192287722043,9.796194951087484,19.609654741282686,11.47983541368338,18.451177383456592,5.856791415451751,23.06688709666932,30.331342294288575,25.641945195810166,13.383346360829115,14.12254514166748,15.565674943977081,11.611596737505106,13.050520095613685,11.838145101190651,33.20157833538677,19.04442354632382,11.498738842711047,20.68971193576202,12.903248299917838,13.518729083308312,2.100878195586443,43.41274978634296,23.805550754128888,20.0147079544112,20.70470888808702,20.062338342362374,34.842393896815885,11.318012553047717,31.753796459424173,15.024524995342926,22.247688774698336,2.772093553939079,17.16764692935599,20.086041668582688,11.612963440259492,18.646057196082943,18.221173430971685,20.459967878588998,39.36249445872809,19.89939541664051,38.61874750799102,7.443520152732064,15.659353603048977,6.435502222067242,13.91865255752924,12.666789549118743,36.34993768172146,19.40784553664153,15.424342761830442,9.529925299526347,17.78536938793261,3.2356415336386837,37.10355618436518,25.359908509683535,17.15115545956287,19.601987278533304,15.480701648371134,29.72162614836518,17.77285350588312,12.971027257684408,29.67960308043034,27.86873377464355,3.056490097984995,5.038080992597708,33.733680757943326,13.812443527404842,16.901736603595694,22.840267779458074,4.3285442952229,18.088424398192377,13.848345877693026,21.569506211026304,19.766327871118882,31.32190363310231,26.56430661376688,18.947478730544898,27.81863153468076,19.328590076223207,25.27495776230098,31.148343756749263,1.5575525158259935,19.694397715918655,32.81901163304635,26.37820384557679,32.15998226912479,18.950413976559602,4.074988491713703,13.652506864944225,12.795464192262404,25.865889300392496,28.628338841234665,47.88348319057478,12.208982133202369,24.77131088449021,23.30304655542097,21.303078215279843,31.421077137231578,7.472058161854708,20.19166604813192,20.387844069114458,9.823033118746109,33.29420239219555,4.138660421146443,20.765134800172042,20.6777758525984,47.18768258989522,26.439547378872373,17.439521991873267,46.9402928135346,3.324237494520872,21.866997775376458,11.118562773876235,12.916837134204064,19.338788018055205,39.23675364287408,18.134048093940223,13.478093915598507,8.844021386570002,42.223680847708934,15.28408310871857,14.15983337244234,15.422643434665732,20.142876294961766,16.801715939466554,28.936932289903627,22.800675801538077,12.94600891489789,19.075918731314623,17.586909886730997,22.654833582145088,17.144744051484544,18.19615578460601,24.763778831658996,13.446231539534267,7.6570757213669065,15.204133998728336,0.5177517729575407,10.670203243680447,25.27121998693663,22.79242727193693,38.42718437044667,6.017015840212798,5.438323978801176,22.51548544543754,27.99991915449541,31.714244390730972,27.239029019016883,11.442406757668792,33.573256177744206,5.820710051567893,35.8282980514105,23.932411904050824,17.886416733634086,26.64539859927679,28.15197503259825,22.39474420559668,31.96840520560854,10.130765228715324,3.3627725811672153,23.60313445639564,33.9915984909813,10.840735628229156,26.476233256196217,45.20046786803755,23.928637443285314,25.55810611099248,30.050850707934146,13.267079472108032,31.97004479268805,30.83093977155379,30.039247626023272,18.835739429167326,27.515246919525595,16.84674845826202,14.741338549809232,5.345673848021563,8.162551413789387,19.770713524816827,8.574386866915528,45.85727275062375,16.025717586249506,20.366213559430193,14.208547650336431,9.925830049693559,43.18193514571196,28.525333406393795,33.8227077546008,19.203752185629146,35.4797557477952,6.440127099305817,8.253196409629469,25.977428713232577,11.025966039985118,12.342622089180015,14.421024936936718,2.352427803321935,9.761243343650106,6.3058192864333495,18.98486309680526,12.414980166574946,26.645018116955384],"b":[13.120657860333877,17.388431538170494,49.74175768059246,34.16566409872756,40.76498548497393,44.68690410908634,41.294344989723996,37.26144995905126,44.660714035175474,14.94360625835169,20.832709095864764,20.098452680247657,7.607499075125008,26.23671572881802,42.411839220456486,24.50667231878768,21.01566428542391,41.02818733319691,26.108476297834873,49.88381894919501,7.633605584171446,46.06296824304452,31.059061058140326,15.676977039959755,18.257830546458646,28.19308511285258,24.925463725658872,34.69243060919085,30.830926282341665,30.404154780671895,47.37871788402373,24.198166974617088,50.94228127577637,14.855096548218697,17.23082265303072,29.484252164715738,37.093633754950176,43.550540910603246,39.98155251042526,33.76734380053834,22.68339980925387,36.00054571862127,8.30102383725042,21.954813123447906,39.063040807337146,23.32157789466457,30.750162161468786,34.315072250918284,28.753950710407125,42.77137913964404,23.61297463688699,11.548559103235778,51.79613218164836,36.04014739270121,53.23940751506275,34.076433708307064,31.22285813485786,12.629293064072339,56.856483304907556,12.86599509438485,33.13509811906414,15.894762991261441,27.285620838016484,30.76562891204275,16.45773406877371,49.899068309598,24.002313203726658,23.846596517548548,24.58045355975269,27.524401975482803,30.92914246413414,30.439335274628117,31.075647666338483,25.21647959666272,45.06416660790089,5.238522778570216,23.98765087595845,32.87639722637479,50.10278069864274,37.246184886665105,22.517251877321996,20.94199583888553,46.430104496885335,16.386052565728924,28.273979768441436,37.451253207873194,28.377928501645926,43.371062810041025,14.56971941282041,16.383582574939698,10.868865755645896,26.764298480488343,8.611219476799196,17.62695768735088,22.000198207194735,46.105594263793506,38.67564584323978,41.73849437856229,39.717141248618624,28.48464987754623,29.08220200580011,40.19903174483454,16.091042320130512,21.61937420133104,49.01650449858133,51.59175807367413,26.34773984489499,11.795180046385752,50.698775388807064,42.09240075474915,25.788991251817254,36.78126217435243,13.36227642347013,48.29584904917086,44.36952203759968,54.54764286088346,25.67708823012208,25.57012214021503,21.206976854962647,46.70653551395914,15.306083117898087,3.5482718279459524,34.24398583852352,16.152119276136347,34.334413069399815,28.429113269249562,32.00123362126394,3.6647383490711327,19.047751392096085,10.899048782619412,48.97857961724642,34.93437110667597,17.8274742240107,42.651447282293375,48.07382600413771,33.67399995295946,36.545106687897906,45.21251452461947,25.504700100319138,24.793814265223595,7.468634532250098,26.98024301662035,14.058031780113257,55.494533154227476,36.88891417993104,44.13159351556256,22.323314779990064,12.60374099679431,41.42841571336584,17.471317075247875,44.207236400392276,15.285827061325076,32.613805224967294,33.26650998496793,49.14269549756399,21.60591818446153,27.73070902875316,19.636855956347652,48.96589486655272,45.51081204765451,29.86450240487506,27.80391314909577,24.92869357249246,46.59068332869357,36.04583122099404,22.04401559157136,38.893026112504415,27.669987090382968,57.53786560453298,29.353448253645738,44.885103557716505,33.110309724290495,10.045141853076585,5.2666443128911,29.912192667832684,30.24549722327292,38.440461052635484,27.662632448702468,18.227215895127365,51.59124937468736,33.3080949648368,32.42927113766733,14.526815348010068,33.5443130800271,14.625308154591217,11.376897110261726,27.012863772765133,38.51036850361809,9.780949709143707,31.50370867763784,33.758660111761195,32.06349458421026,44.198216492130584,38.539214925484714,34.5355154009276,24.748875546238963,32.00140719866273,12.449171735847319,37.82597471257698,53.87358216283191,29.813421888661914,13.701032702409584,27.8076017525048,35.72136149582594,31.690169374417124,48.45932956332952,29.253643044023974,28.708235525010767,20.75269504283264,16.15218632517407,48.46536041292005,12.730212569885166,52.813676613476474,40.498860747020295,14.138466067801545,41.64050014721604,35.75895464453666,25.614323751350252,11.897438343561412,15.149381360688462,39.66617121018425,20.661612789283943,38.462770879714796,26.976993881663788,33.64567847161353,19.219427136020762,28.966212841515485,37.774327418075345,32.81426337436759,36.85855971327196,22.13623420944647,12.943806589153226,16.982870964121926,8.941425173748726,21.23869731787657,30.144207692958467,41.27653456919825,10.458602158016074,26.198930914242826,34.63792843625076,8.61132422384673,32.79658124707177,35.3859907369115,56.56948373997707,7.154527480312911,46.06477143428914,49.431726515158445,38.21719428255799,38.390912131793044,24.82920701327334,53.64544672366931,24.390959639789674,44.046203296143084,50.999800620686464,37.70333484022092,30.70033368146875,19.61665857905253,36.11868563286076,49.031350256556195,29.42903801337836,32.61195952158352,36.23690135749739,40.31401481375332,26.751909520327487,28.68115437127628,18.73283256048679,31.457450039787346,16.5365526886371,31.20793370186342,35.366447259974635,53.79525792089687,18.179058251723088,21.481767569143,35.479848614704295,39.563358518182426,47.68984653657089,8.41634322786974,25.71889134724159,32.380710081880075,48.445271694204656,49.26020331042996,13.527100493854402,33.79747569689733,35.344624790660255,27.94782544000685,11.766363936708789,8.714170927984348,52.97327074417465,16.681634672423176,36.19954686441317,11.98142384632194,23.679216810893216,47.19876051760083,9.800450091578647,26.65562160508611,34.78086081443347,23.787508331788757,38.48258526910212,30.173068805621938,15.842594916901668,39.516297086115564,24.930734397957533,43.23416287307415,30.43484900238362,5.540192510061148,38.7769143103387,13.554702263962719,38.87230404261545,56.046639027547585,15.273922713407764,29.070167534609578,17.36888598649466,38.5506592111185,30.53625051564548,28.34986321049825,17.122933090885443,32.94808585252456,10.817691882508997,50.035843339718355,46.422164644041196,49.952549937921965,55.44824090143452,15.979993279534131,42.8129881744012,40.42522783892055,20.99734782509274,41.338346844485606,36.72782643883257,32.37572265138931,44.91406064138945,17.54107143345241,8.838547128854826,30.244350987632878,28.19803496548136,26.360723585254657,57.98325546260093,20.548329225617643,27.15199044263513,16.49533273091748,37.17462717397269,5.191022139133907,53.067658722057786,41.7912632275615,24.218425548539063,21.86738817630784,51.83805325690098,15.921748660304228,11.577661753413654,19.533661760629077,18.511074203295035,16.05275983592396,31.427490988367456,41.28221312487155,32.8897582087949,9.845698426510335,29.702874878991167,48.891558723578996,32.0934941493145,27.32484835124336,40.564664191586516,45.46500564523873,26.425152734848687,13.625924701092908,17.531991174526063,3.742284452729865,52.01904859673183,16.567379701943253,15.351258753661364,24.399598011381755,14.429574525704831,36.879538582965004,29.95466085442095,37.14700729760604,37.264720182063705,51.70239272507213,40.4416050721271,35.45361886922794,4.121907737160346,41.98857727749042,37.522611750068755,34.884994354670354,45.227226789860474,27.977615961435987,10.563339476600362,39.23372879118984,18.418018832950853,41.69928583970038,33.3980089958167,6.615429868071332,41.62741069050071,39.293503370146475,47.57374543528075,25.01258500299006,17.01192428880023,39.05064529714947,38.360915024338624,56.62129167549065,44.03612066559497,25.133624500473175,34.332314107241125,18.687207638738855,51.29546889817209,29.82521466057,48.824981519231066,27.314548257297638,29.178631463125406,48.36260300441148,20.297200301695018,2.0167613070630175,9.205573017434464,16.82608974589911,19.796214654693557,11.873557630757903,41.92567429941775,35.27407624358508,26.717036277250735,10.65270014490077,37.32267064837941,44.200317612627344,36.60398066554777,12.99835353911683,39.21534285209557,22.781893075300303,44.47603494250626,45.32334185870172,36.82241817023086,50.15536521240556,26.370310202734437,24.974629037721982,40.392137605548676,8.299932447614008,7.711453410183178,25.28808465397733,13.174561606171569,15.038228660260563,32.733084132900004,34.15150491406564,22.588478193744546,37.21199958107513,18.06481036912624,18.424558153714443,28.63717212049003,16.453458114927955,25.890327779493695,27.42236328751647,33.2568620716136,37.56286045799516,49.56476620551502,21.73095796188712,27.292675165988776,31.52799757772224,21.30238484423569,32.61511166399072,36.63753493008255,25.550687938898044,30.69684179119449,29.392114508125154,24.276633315482947,39.373246421779214,22.96234417424886,26.969815600891387,36.04990413794311,21.627180573567266,26.35946787405836,40.48763288862643,23.137911481854225,40.33210387610039,13.893319874259532,2.234272854969568,54.30552749237272,15.611923947107092,28.012033264756994,46.38842797071676,20.602953396464663,40.84670505969702,40.09265322837452,8.2587187399062,14.332381346964063,42.048544932952964,39.70144817065817,58.36409031816225,46.19601490751314,8.357092668492463,9.446492217025725,24.42939748366303,22.240608791602448,7.985160932570974,32.42394446486465,8.700290742055014,37.73378533448715,33.788321574777854,34.840125834470236,38.290762538368575,55.28967760581786,30.617665711632895,28.166924675885994,37.469515214823446,40.42210563388482,28.638035825774757,13.729934014327858,4.680899510583396,37.363313990748026,21.028285837758588,33.6124431929843,43.5039962357807,44.56649561208821,18.17522983743939,14.883722661480524,43.15662231929541,40.11360148178457,4.1814737899304655,13.513405534947145,47.66661497047393,35.10806072317501,34.17010994731781,20.42478782129221,24.070407581423538,18.517126178069155,49.57700991499519,28.248718865799823,32.04008725604827,20.81187702477012,44.53361823783646,17.656449608472222,7.724362585730624,17.95188610413992,48.80733245002849,17.7271280766889,37.8023233913931,46.26412757106712,30.545839017399484,31.82269747294428,19.60729889827135,26.478303725788322,18.095647494427464,27.032114328802756,36.686149228556175,42.344001383297424,20.112767536091432,28.73610086558515,15.148473497609167,15.00639688860947,31.760984561184635,30.518516063285656,33.07093684517727,15.871952238974512,34.0765442765529,37.27705004564709,36.07718178521626,37.23194474987537,17.42884835792927,51.160810541483215,14.731807353378317,59.76067300700879,43.79697294532497,29.00763689228387,16.704534408592238,9.102493673009127,35.44495977935555,25.431491680656293,45.244230544278025,24.914422333230156,39.43811095740504,41.52942363356748,36.174974589802474,6.1045516178735415,39.269426260079285,19.59895917196393,2.378456077760882,10.358072201105134,34.40306202117132,31.29551992460911,22.08274547615236,29.150969968824565,33.35218781434078,42.16622143389741,18.048616724013122,26.714918789776167,33.52803495695119,35.38743378205349,26.827994264633027,37.73340743868346,30.766096425671936,43.320108478787205,17.17614281052618,16.871151698143283,15.859789269553074,34.884593678709834,22.004121997684297,27.24597129880175,37.498946661808844,50.542068747891406,25.210905551638838,5.342624640402733,43.245187578428016,32.24680881248398,41.53549400533278,20.11864671265119,20.536165181420177,19.682566837534115,45.22438245648103,37.92881620873306,25.46468641968518,4.437164764841728,41.644477221756446,40.35029027565392,24.08499671203351,36.67544154885295,7.2309139816201595,22.123541327070264,25.319440941855312,44.5154888241012,35.907243485791064,19.7884946474029,10.991844779434299,26.558006720605256,42.996155914469284,22.040297863490164,18.466759198523413,41.831666627523234,33.84140038558544,21.295426568505928,8.920490841050487,27.95063355491611,34.327165353741336,53.32718286468733,27.908350745649283,20.106890239757117,41.01522265000402,26.124999245467393,30.392296436665305,40.51942096032185,30.304165153512706,15.425268552122162,46.81894251967266,34.668147305346544,12.960443523017021,38.81022636529615,39.037640104526204,5.045535784835411,31.650344371287513,21.459197947393818,17.289452648858198,32.802630843218644,22.396756979031046,31.692287005619846,37.40665525647484,41.15883089541397,35.93728920732524,20.483273300396178,40.865805930255505,39.008614241282636,40.005197753538866,29.719158938673438,23.658456471690712,48.1001605978237,33.56959918399804,51.54007442510351,27.987049387621635,35.44800072360519,14.9683395664078,20.496828137226867,33.79962891365379,10.454147659947983,14.34827605039275,49.89580399823325,9.93531265432948,49.20925182883018,24.983185593059886,14.44575338507072,17.577495682972582,19.121360958707264,23.853256912647772,25.818117227643093,11.892234334612967,18.652165190620323,5.834811484204305,12.589760667986965,6.066550651265734,2.328376882187664,55.206648694802205,39.246837890887264,19.138932981821597,28.766131733228384,43.96756682968433,31.563375517293032,34.330353207450614,9.720110013895278,49.56829956989829,45.91490781225111,26.74441718110011,44.89970168460681,27.089966614749976,35.425152056755074,52.640825998452975,31.010813782159595,7.506908694090884,31.036547009465195,9.334799730061349,58.640706947519476,47.43912686834405,9.332092425549007,39.34637820858171,41.76807868363618,11.508510904445247,23.128512026059404,24.268719689490666,3.3992901135573117,11.484150980095276,26.84855635537239,41.313845569749766,37.66504270395162,17.29460654639379,9.235808074374434,12.801710935356736,25.94855097411793,14.21293088563305,20.49789206780929,29.42649637411848,35.26611512137907,32.028208438766896,52.224429986110124,19.092303146498327,41.71505956033678,30.05889881947312,35.828254620348474,36.12276416384759,23.693543676542497,7.598888239258033,22.887426468169924,28.004278592616764,23.350523343966945,33.84791842881297,34.51583244489703,34.61741529618857,34.2553443369091,41.76434201742032,29.698961230300405,33.28370203422275,46.21461637693717,41.99583520074439,51.74328310663307,37.13223387302339,45.450099373957755,18.4254554918584,23.697900782380792,33.44859637462292,15.780117491056448,33.54372884287848,16.153872060333022,19.142275065439986,46.60010664917819,43.84334324624999,18.529359159532028,28.025450223979554,22.851921505801425,45.53282018540372,11.76476910077497,6.386905449590423,4.397955013726955,37.68567074924295,20.428393716131605,49.30333740932461,36.971458676576106,18.2578759414786,18.995060447610214,33.355426597416,24.4651194535048,41.54623810166961,30.97478949723388,24.00652134084775,35.18396365923743,15.038469828958277,10.390124642840831,38.19747246722865,27.981371747979832,27.647987938975188,44.4165197872217,40.95071919226261,35.29862325596523,57.61173455879644,24.938606563951346,21.260436338852085,27.158861358457575,30.56278001162495,9.397928517775224,19.049249411049388,44.97605080765406,6.868634418722115,28.214614650805526,13.387779085836021,3.111837578466776,6.218968452395317,32.539830513365615,22.440043256753718,30.93790102988416,15.255639508335221,36.61743255612854,20.136788577991194,11.791139867058353,21.807232852283043,11.892255182481245,21.960269085001972,6.525071649489749,30.77010298148126,39.29588698553048,29.574831001241012,13.522904648848408,24.23130348409098,23.17637358144536,38.99871038687278,17.488351742745888,39.160764904518025,51.554312526901484,39.73162920530692,21.47540560564726,57.65784622042312,16.78719801384382,26.76902798777503,2.972314421874822,44.294980289472925,48.38170166213551,44.15583657426663,32.200246623004396,30.917503674291144,58.306426755605074,43.198706523208784,39.80953907795823,26.93028205118229,39.77756116200321,8.799116600238367,21.75093386973511,43.81653512897945,18.316982169258374,18.64834279127848,37.11628439168308,35.42280586730877,39.941062406755684,36.688843177611034,40.55167521704088,37.3965432720363,23.914734760167896,22.65524087453802,22.69815367420831,17.206069900610544,45.0615235094197,27.37528012515026,33.48472675996517,14.875359045303934,19.304319003233612,32.26661219592283,37.463286973683864,36.25080543770561,31.47431379452084,42.82609913044728,44.95506091251423,46.792488475609765,21.650741981086703,41.815893167959686,45.82176407532876,48.414001825542215,15.02097087229072,25.40882591694549,34.885171797621375,17.515769064182244,38.624606784876335,31.030977727967514,40.1068927502042,34.80841246196394,29.843878795235014,44.994304002877755,26.63174006667545,47.20622507084259,40.39634091340989,18.994662005057798,32.042402389444376,37.451800837733096,32.60708750725474,36.20988607139067,1.8021591507649637,42.79128039570002,37.52727750623499,32.026519144796644,34.35261853566418,28.997153459230837,4.721549011258128,25.332431633177144,18.07475716826795,38.002487174500835,35.58381071410554,50.13786849628967,16.154400881253558,36.051968119474836,47.19227791887211,46.32351862131762,34.96075718002603,11.051562825270116,28.75478330265245,55.33762341204256,14.2177545304716,42.939967207841455,19.997819041488086,49.58790210078684,47.422079904628724,50.248734314503864,54.48247380037709,20.452025795985758,51.69495382404081,3.364631599787078,39.130868139957315,36.8338418885935,22.193467158655512,20.64364030316993,41.07789758489031,27.8486725441959,45.12373211946202,43.4086534445466,50.652007251877805,17.442235305761255,37.01380930100797,18.671753832358124,56.56148113980244,22.807324470449505,38.26956187026332,42.680690474626175,16.006904576304038,23.788486507377012,17.598141757495927,26.45213219949283,25.325043469973288,40.0971067164546,29.051520172745956,38.83789667168229,18.381528838625798,15.59405334513876,3.7467934011092563,20.410410869100517,29.556532629106833,28.37973769299272,55.07243119009003,15.22741335623246,21.775194806286542,27.26930569217319,28.645267606301488,43.517105701342345,27.32130046576004,17.45094413432396,34.11762664388394,22.121074001240235,40.18032669826011,44.50598209624172,25.99564693011412,47.21360480195889,33.99578042633691,29.94527333593532,33.7258147989013,10.24436241599943,24.823057718974354,27.055451236276504,37.48518639757033,13.352364001704395,48.79343571731996,45.637494645962484,49.03128106547075,28.570059243436813,44.80305734822518,20.313320009526347,39.62382777980078,30.922018011193277,34.70132264418577,26.212263121184776,36.79931009007524,18.561791057940653,15.702695584561157,7.312126116161695,11.479933177287842,20.23531717290712,15.997156024171018,55.80116894015806,23.36573406139567,54.89700390540002,45.049596640342855,10.685984333908864,49.830173529020485,48.19966020827947,51.90522742562871,19.817474165607926,50.425672973624145,6.443593776900984,20.163106522047297,31.97580189317864,13.706083782317583,20.072657157065322,22.195918882220372,3.5347085238652554,12.87148912859597,17.205561961089003,20.816932872114464,23.42568948026102,31.88658610318145],"a":[10.927119906932926,16.884872297911457,11.909428305135297,6.723378190302456,2.95877225360464,13.464634767635438,17.148759828291965,17.757557013473782,15.904726094826046,13.767605872163342,9.17076009294101,3.1965527436442764,4.12585580466533,9.670456730872857,5.705290752512204,13.743417454380067,18.864293543952108,4.939346223254262,4.9898421432236795,12.833882326285568,7.473531142250427,9.266256108934225,12.580795133352986,3.36323065585042,1.3237550019098387,4.18446317778411,19.737247840927985,6.837222485748917,7.553435366778798,1.876187844179369,9.153900311710817,1.4574770504835755,12.60226513291229,7.736515504257491,16.91279428250972,3.021249074113066,3.8262072968313543,16.129256578512564,12.352637290238842,16.200725950423074,11.329269127180739,12.032693415047731,5.171705969863911,10.598877141527186,9.84130760903434,5.469239381748299,7.503928579181682,15.730875562220113,10.530591160743219,10.080673456389366,6.869461818442955,10.194167361379174,14.114115577717957,3.463573665682813,18.05805533776152,6.816922669426848,0.2167995459456762,6.839433910049766,18.50695729355829,7.113111528668963,18.903225909740456,11.202712638122229,3.794608786171052,14.449899754867248,1.5711611008899329,15.558857158682144,4.032630868386358,14.600478800815555,9.697285107159663,12.442588785427834,7.044572584243993,3.0740720604470573,3.945455973960681,17.95232637195362,8.618700687070145,0.44871695443376325,13.73489791987251,2.974250820914821,17.91388131522087,7.105899785552756,15.686524554171232,3.3213370445798462,16.285019814824278,1.8062355058888846,18.25242718182892,15.81635402259019,11.332393128841751,7.165472410532652,3.1181172108713717,0.6380562510327126,10.605523688385086,14.981898439210767,1.6590617543400432,14.89086034742595,5.139687988406023,14.439787153140951,14.916572992083474,12.718940316953491,4.087725375445439,7.067370380250377,16.377512997224027,14.205152980890192,5.367874031282489,6.595221810362943,16.529196081506065,16.71475000731542,13.393476658448193,4.106602381193221,19.412967948207537,19.523674147721483,0.08549785406399835,12.546400150638753,3.731617338983053,19.910686085615378,8.377958471581044,16.32299327256531,14.270020429877794,9.648696571940913,12.03174653947178,16.04870193923887,1.687285345093481,1.523563780275441,10.803944556412093,11.33501082560446,17.689002666886743,16.185067804847627,14.30256499120377,0.2340356109773989,7.263568659121522,8.293824651120358,14.169092496271546,18.87193521294328,15.653379346019856,5.412951516304059,9.300742612370643,18.80443105108857,4.380407596752156,7.23572564324706,0.6280650467522442,10.870681664880856,4.239813471414493,4.263353031966988,14.04957199948415,15.862272426289096,5.347808693218523,8.895030013463936,6.016492870705141,9.746199194803204,11.116997694743542,13.275526714899009,13.418506612569082,4.466175451385337,17.910132366737265,11.327624060852223,12.98205037958818,18.907090438661957,16.263785467425123,8.94052684677117,10.462798752593848,19.512549620204442,1.6395510768260735,18.671879213405887,15.146462737016906,17.168767545793663,3.8215498202490394,1.79056547974501,6.417976841595947,5.620900742269042,18.84225257159575,12.025729156243967,16.434672806359107,15.965259935172384,1.7563714585326817,1.1802004819516076,18.955083916442355,4.531506998835817,7.623008065468988,0.37092622673746245,9.731578902653592,15.802247461258894,11.891106058368553,9.411018546544941,2.3041263741280504,0.9168111319662886,1.3806745093380712,6.720411237908084,16.833201968154313,2.8422022120444224,4.042798150187439,4.3287695546213945,11.619499235371102,1.376646464564244,17.586591075184113,9.266291046491189,14.02028798275932,2.748764193151123,4.253740310458989,0.49679568210879044,9.011677671185305,19.841349061537954,9.917900496522641,12.80202601817583,19.265780521132847,14.502360952853799,5.437918531402164,10.622871786352333,19.88457254889887,0.05256122454909917,13.14346686380794,2.987186656004468,17.081532036093282,12.375611961257595,15.62724086430431,18.764186489330257,11.003203120206395,3.7691304894953603,18.40298959461798,19.87045554400627,1.5858962976578672,5.9136955179156425,7.599821818512389,18.59934394862276,15.557153219511935,11.946278664759213,17.268172253051503,7.011025680650262,3.4177795382470233,10.58556055846891,4.134983284613067,9.956082970126761,18.167978442761928,9.095699709537683,9.570448840682415,2.8341010008319634,11.782323578857392,6.182362454449413,2.4456146158588377,0.008781342747625764,12.55946418406606,6.676941016899907,1.3255528471392042,13.020244134376352,11.0677891647723,17.03239350865462,0.8522383149371038,10.815204537977646,17.170693178086868,13.27853087233667,6.979111117491668,2.0570909967183315,13.90278192238199,4.317926150924669,15.682082021184232,12.004641989177633,3.3284907340987813,4.000187697307029,7.995861337203469,8.473502368099478,15.984895487416594,18.096108875923747,7.713384000152801,19.05994317746672,0.37720483109888736,4.9100361136194115,9.682109622662969,2.9005629703600633,0.4004149176317551,10.875661981301036,16.828130299691885,2.0414996866671764,19.42746897600369,5.240200290600834,5.057858815536194,8.42838527665965,5.274495915870752,17.810162429444844,4.967860199553034,4.477277589933002,10.220219960786743,15.20505095329244,15.980268253321771,5.859479199287736,13.3637562646524,18.143866712660852,10.419955859133513,6.759580706478849,2.5525498905903365,19.228819018338932,14.996489011251866,4.948312733101963,8.006953295558535,6.411889644176272,18.524480443713554,6.002342969353598,12.579750018440908,15.536586816827436,3.031083121537148,1.1319907600470946,2.358375574538547,5.469048321095733,14.630404249429043,8.831395090268042,17.975285947626066,3.5228927086787776,1.4823893285733725,10.084258509423623,2.054709306366984,4.28192923068726,19.795944522036812,11.029036740207507,18.256610204917575,0.4235333262253915,16.315739837170593,12.65704329951085,2.875829781213488,11.466429567788467,7.666167544666376,2.558041282999275,12.416371470646537,12.892274164985773,17.763725493554347,18.656812824992997,5.969563114635537,9.671727167482643,16.454637301350093,1.4522259316836772,12.4687917787326,10.325940661037741,2.0366700721879916,9.990086899172503,6.098831783111631,3.380636110043449,6.626310680791203,19.817050645776742,5.977263533971442,18.065131135489402,3.23265496068756,16.568963415057393,2.6764560932079062,7.475393408244981,4.6933888449264005,19.482258986445164,15.360986848169777,5.883426913421634,5.6710116294850454,14.323334592823343,11.528597391651981,2.830300791921867,4.422155663044003,15.415151721466884,3.8705097932787558,19.33311515015451,4.417051471613962,9.55786659021789,3.2304226833944982,4.2217804422708705,19.660252996650406,15.840993056711007,18.085334068115184,11.784019369327039,11.446238906532567,7.246016373324267,11.699733673249998,9.900158378793451,0.14241427250685224,19.444899702860752,0.9991057210427634,12.895794066298848,4.920405404706187,8.650801500631102,5.991160387243446,6.562100759711802,7.1120212536974,6.652423919432926,13.366363374452458,15.30949437027056,14.330755211219843,0.47044661235307483,13.302197050350548,4.944934938785148,10.297238943084146,10.394566280939358,2.1431225801593623,5.027805997476786,4.758246113388767,7.998585145181751,19.83977832084086,13.237500731416606,1.3903097769050587,6.243924301671759,18.585384627781423,11.310137126748018,13.150962415529207,16.570212893725866,11.560006766987346,11.898900739400734,19.736628417062537,4.070828043150234,10.572221879788781,12.601460321241312,5.907035275882011,18.761236491366805,7.804014264297461,19.851716349319744,0.7239077393127991,17.108224290817073,9.18292058570981,11.788797937650957,0.3087511955404487,2.974287717159263,11.875019626076897,1.9859407351446778,4.683235359477642,13.793385264091613,8.417169947275852,6.912997106051835,8.921465300273436,1.5911253292612182,14.286180738460526,15.362530713965219,11.973113422803285,15.63388691942337,14.184074319806221,10.447239076600177,14.598072619950862,8.899363972336761,18.164019168153814,9.008361208818823,19.3941846616979,7.5075207306836145,7.508287544426859,6.450260253140123,1.9507144184097358,11.77456099418312,10.837249470334577,6.637554321850221,1.4394110811557281,4.404725715055218,14.064372022385614,17.7638187166324,12.53968117433426,1.982507230213244,7.6722557823286675,17.27167865669375,1.9471505480568307,12.08318233756781,2.7365187458581586,17.794533327613962,1.866653167678769,17.951408937489166,3.4384551721147982,8.135321329625125,3.1866446499440615,12.824646877343898,17.161233092830052,11.818186445364368,12.950111656868955,17.494440007421304,10.235302104397448,6.48586336179088,16.502787153653394,10.04544921264575,14.585246686575374,6.576368007933864,1.4095625561738112,12.863439665382174,4.400453292126016,13.712773165612656,2.144098454876131,18.70760899599651,12.001750611247775,11.050189113592083,7.1075963766058425,15.020565334958667,15.27892961189715,16.663058342749263,5.763275393525089,2.309894056667119,7.4331489557436825,0.19090488149446028,18.528726567483865,10.879343251573204,6.943787151567369,2.0543505430375086,19.287428267799935,14.224834008294351,1.5301597802102673,9.285158554262619,6.899716073786588,19.74251682151181,18.242377062245225,1.5637609447595446,17.750460419476607,17.03454243947611,8.267029899345184,17.96662940446869,5.7009071431812375,2.19396756047872,6.17849034430094,5.316023392796705,0.6362779826776421,11.013337299092338,5.5424165881163345,15.752466372107294,4.2514818364166596,19.301957618135475,6.2075516604686065,12.268258558779873,9.87497627509979,16.545118612819337,3.0752599110923873,6.743128542573338,16.607073561033452,11.346377408910655,6.817978555425417,2.8018360013993515,7.513054234434371,4.542167503340173,16.880183202901776,7.040662278337453,6.727569649285292,15.09780251458793,5.394634699100473,4.5423627277740675,1.879645406949182,17.063449708940503,13.256461248515627,16.21482675114246,14.969981015867994,7.735283124694501,2.6681956169156917,4.466540333364133,0.37292078479272295,4.142263509809072,8.923663498877218,0.5955055599300296,16.170372874313536,19.382091459521757,12.978319694515768,7.078482283662253,10.96997928556167,12.295215271968662,2.4790950082908214,19.66788068096378,11.251261222371749,4.254309492791064,15.518377251670369,6.442706716082007,3.8452705091083317,4.386943675524,16.3810166933883,18.545434268905776,0.6344317095620067,19.78488910834645,19.0289479965225,1.2876082793543642,2.833260420939494,3.9747188383891707,3.4262776309780607,3.0269426198653093,8.962119546694499,9.392731106324948,14.776934509526294,12.49096892535405,17.51187069045594,5.537967589550972,15.272702496657091,7.215172950906936,2.1225793350587985,5.89029803827414,17.650413662334415,9.922701737897448,17.533924383820718,11.967496771948088,11.227404043761648,6.374172115239083,1.0071589068594644,5.858882318510266,5.676475422144112,8.827932366446426,5.991657178055205,18.191553892834303,13.839616349039172,16.913089910090797,15.780942350106786,6.616556784235366,8.654825445823725,12.51055582207865,4.8861439183443744,4.550236556041627,15.645953169628672,13.72420722101106,13.3854725080651,1.6510353985342308,8.973538177312381,18.900704319711284,19.548387544214748,9.236033891928201,0.8318357565558943,13.386558889226423,11.126318021096878,11.45597981493161,14.361753146758026,0.6042054799122409,10.281899992861367,3.302791028506249,5.450768423511652,8.376724564378533,7.159881212154144,3.5985885235194814,11.54800029890206,9.693183923858815,3.3847653837863234,13.198743142079685,10.580006268140192,19.907775519203543,14.337836579488453,14.578044293849235,3.2605105213523533,12.690532761076167,7.102159390711482,7.627527636151661,8.74008411395192,0.45741691253574857,1.7133175397801015,16.13741163984195,9.637510151356231,10.189811798560061,6.887656851433874,8.50605214880388,1.021768754996808,3.6061201561266687,15.191987931805123,12.572218781458613,7.7295462264280435,1.4148543024840476,9.988726032868737,12.230460271711472,17.770337382590704,2.7085506256436487,17.82475741819267,19.98998046552051,5.068267713915282,15.292388857574611,2.281046823228272,2.71235058496778,18.53946672373517,14.091773967555849,7.0575114457116195,4.8918489049798675,12.557075885823728,0.5757221472631935,6.422618829104949,1.3161688540333216,18.817182637848198,13.45628757606281,12.547439171967536,16.51253504714977,16.021389197864245,7.059999220236888,5.576207900435661,1.4062534725112696,19.558926214825235,8.97686091296336,10.109326904535765,18.792965497271222,3.738591027384417,14.603808599530176,12.93248049137742,3.514927595191142,5.414107197166245,17.097379980420225,16.077600005187055,18.76451941826208,9.932564220461785,5.208497615727965,4.001679813338974,3.4193876061635864,6.03064158634834,1.3009673629092866,16.553299533758654,3.5551110463019064,10.611940067366481,13.230337052366599,6.071863220221783,17.074435670832372,16.99438359739942,7.737630820144865,17.857809200137464,17.09736381063596,6.3656952900000885,5.39362108106177,17.61869937384759,10.456512869737878,17.59349521550513,3.045237518086914,5.0936636894493414,5.631853596668015,7.1887935837394545,19.547556364022984,13.31757000907935,7.499044915833113,1.2331807260189187,2.1935943494934174,8.298365325257567,0.2855705908667616,2.996473470364962,1.8105827263951735,5.707876760174129,14.508223985614062,2.489966201111158,3.4117965450469034,16.58073732773609,1.503328543389344,2.1970498726640653,11.220993106459836,1.5746743538135766,6.099936095867271,1.0742673929504454,10.44933653393716,4.113229290220204,18.006424599858736,2.847689474700057,17.863699489274975,17.3525688442149,18.70604957910536,9.27706378595985,15.62543392573712,4.2702134093434285,6.4753723877707925,1.9437200980291092,4.163770257169617,5.004495397873119,1.024710371980735,17.299303904327754,3.2777426635257267,7.5477118119024444,2.6784912050052156,8.844621274753663,6.482094818523034,3.72938108018686,14.629570042300951,6.0517385457167805,8.070442977192132,2.737188217205153,9.315451737215419,5.636338477974014,6.883712868260097,14.423523639066925,14.908572134818709,16.187851929388447,8.007057961634612,11.042298627705215,11.573935428803557,9.097928799588582,7.124995174626827,19.09132283090493,9.725727287744785,2.225043055692786,0.9824243100456442,5.342702424375765,13.247607565719663,13.18224420984468,7.757752301695793,3.39291877686021,10.95328506633198,2.1521874417518783,5.783520409118261,2.688593237502137,12.306515365864804,6.126940347352647,0.1315576381979744,9.31722914776898,10.277879808506189,8.605284856176137,6.942414382910855,11.649116921426078,12.512216863471647,16.344200785181783,1.0033697716571188,17.643220943849887,11.15444663899535,8.0473257115524,15.206466466635792,11.391614066002154,7.14226130629124,17.829626675396796,6.677744170758646,6.823304245475992,12.97162252245284,10.148401340003904,1.9498926017038798,4.780152403772191,15.773797322696002,13.60902611409831,13.986031327357376,11.0671616967843,12.14138555109737,8.478410679689938,6.2793433035586865,18.66865692791153,9.237336093394536,15.239836173953535,4.340163147632272,9.060636188610133,12.421098791285035,6.182348780561351,8.783582463044102,11.695037413219897,6.51535857853335,4.111353350865508,5.850306659218547,2.131339329027715,18.299051202371068,13.024431617933288,8.04515537856576,19.04979912754299,6.334117118042792,0.9952244448988523,1.839114915398774,14.246329946071619,11.802988016719059,18.669957548036113,0.4796039492025983,11.52468973824464,18.700757830035812,9.645114007535721,0.642708521212727,12.902910028373489,5.929076706941214,2.624368494926741,16.345313363963726,11.646862500019108,11.219226363162136,1.8451480324217329,16.00860612787024,4.556616253321586,9.608217589175943,11.423020594159023,12.759909053641586,7.039985017933685,10.71013472717446,5.789238449954746,5.717989402010399,2.4783476541183447,15.988898443445073,13.351884698305266,8.527252927066474,7.551969768776705,17.67437350667212,2.408716860183029,15.718530395819155,17.002248709061163,15.01982544980391,7.7640634065107195,7.803027629909973,7.148465255610605,13.498682719703092,4.673062739021163,15.769917704056923,12.58994698047912,1.59323434771534,1.2931078596326584,12.074868648660724,3.9930417069268342,14.012593450454954,15.64856169234281,1.0800744223200676,16.321548483383896,6.05503504279985,6.386850732568861,3.071575208721864,17.06087757200361,13.510581825577116,18.927461025572946,18.533118939578486,3.0875932620719526,11.712323392565764,10.285498330227965,0.5424317671407541,9.655265357113416,7.537250325073104,14.959268943093203,11.920792041862413,1.6896758013540936,0.6215370094620809,11.050773228163111,2.064642455724597,5.514648116196885,5.842997961392888,11.254808037927685,3.299293425962886,0.9737351539212602,17.87419205382083,15.698835450300646,2.7024565350971397,6.876096145347859,6.253579837757641,16.53684521591717,3.7011695677268364,17.832614733664677,3.467962331469585,17.43726786928547,12.609405418883547,16.13041471819896,19.597256824835657,16.741970070362562,16.353340759646432,3.2810668971469337,15.335001748662535,10.945415094842911,12.6338216125713,18.95631501968544,2.621371634128149,14.236345894669192,12.451723264504754,7.242263168087781,11.928630495084743,4.649728557919688,10.993813940497152,6.961704715053454,17.896462252595153,4.512571366060851,0.1891433693185185,11.796566828902645,12.04868593616581,9.158002458336828,17.558303534544986,10.154558407617573,17.05890241005338,16.042164643512052,12.983242826607619,6.75537263211353,6.826798667954055,15.008370828536242,0.15113377018727725,2.634560547052076,17.279299868233558,18.25119023046962,16.799289021194497,2.8704025984699877,2.909188152243516,16.075978049180843,18.31262113716715,7.134098214251341,17.44277935632343,1.5904375342939714,7.459430905965392,1.9650224913763203,15.461528268167072,11.874245595543641,14.667712399298413,16.785832254129474,6.211271840869426,1.4839898572725208,11.89859334467207,7.529500509779488,3.0959782128308655,8.628079129940417,3.9025938927875536,6.051246361520541,19.62790316146061,14.806034726380126,18.744293077359593,14.61289091125401,16.068581755537465,12.090619438380056,8.719841658747187,9.977876498908369,16.29959255261589,8.554491327762568,18.426587709685712,14.023250921789039,10.013638150242192,5.155875910906813,2.249782807886076,19.128507585154516,4.432630346322437,16.493455810184777,8.053979190890024,19.29144649144012,11.83805441351273,9.272096389400222,14.595075877974836,13.186196137625412,17.459240582801463,15.86591734172563,13.373813367123315,6.439178543504642,4.84538372945837,19.962462259492444,10.984762275299321,4.383400311809269,7.9223707506129015,1.4088763153107564,9.730407882693228,1.4234752814217577,12.92201467117768,12.237831654128426,11.163389397723362]}

},{}],46:[function(require,module,exports){
module.exports={"expected":[0.01828643679588942,0.0229703535578734,0.10115903671859923,0.1326468846692939,0.4183216394636797,1.6966427129797343,0.005477709022049262,0.12144880063821567,0.10134002537727174,0.10405827716136891,0.03762109659430905,0.09585984637732665,0.03866638939686771,0.13749422093722874,0.4664838943057171,0.08507532875950324,0.0669512920564511,0.12236026150117935,0.09696586663293436,2.470069360859526,0.03345296710473235,0.011459148314364015,0.057194937647689716,2.6337434189798343,0.026743703283459208,0.18532282639065875,0.1007599770853486,0.010602776442375686,0.03236405618491457,0.1955512730063851,0.025151199762408104,0.17850853875802433,0.052302966596914614,0.08158353072188752,0.37880237668573885,0.13310693062865633,0.3894838384546243,0.05749956709663725,0.050549130755146915,0.34083537122973057,0.12385512194881014,0.046264596710532666,0.1171218275525375,0.05282771190521749,0.20551550855995346,0.023005313356380126,0.015188483104326689,0.011614480779446525,0.08845318207170487,0.08904984523892874,1.7546152873890244,0.00880738106881642,0.5699661247515235,0.20970172650050337,0.09718274993868634,0.0014069061950638588,0.058758696618426746,0.04900194130106055,0.12327873703144977,0.08506874887538518,0.361062390215053,0.1168737754861017,0.10251103270944688,0.9447471729597307,0.005752052386710404,0.07460221352944851,0.0183247697026277,0.03806477852759692,0.2658222554109188,0.1278152248570077,0.0844679613028324,0.0906180657840128,0.3013946509610488,0.9005351663776024,0.015117657093569353,0.042879560229811785,0.07104693545158676,0.06953365291374546,0.12547513220964424,0.013233210983745677,0.19095476396825484,0.05750068179831772,0.764975101498386,0.30341047853518593,0.03214430216525937,0.01672832504986119,0.21243173315396308,0.20675854832873872,2.08092851837025,0.159827119656211,0.06249146028586139,0.041075351972692714,0.07724788760059603,0.006312664475278108,0.011397110697266143,0.09142165206211322,0.34029509398142566,0.04937501593367635,0.016462335377819902,0.005057134011210153,0.01761303233843465,0.2225846858005027,0.12009347553116996,0.1494807342533622,0.12098035885286972,0.09580034755666257,0.04475352634074443,0.13661299604116342,0.4931186660266603,0.04621675616050412,0.10258281634686861,32.75571139380245,0.1586116418930872,0.05182404933591237,0.1398941912051217,0.21443329205107448,18.14069851474833,0.0534003964949825,0.3174886547206882,0.019715975930338758,0.08349222190209128,0.06912795009746131,0.15537146863729015,0.28751883945361634,0.016895583640322096,0.008542353271162425,0.1668397404797543,0.040737314830203424,0.4791653626440325,0.14527909886960164,2.925898061238485,0.024209752350463003,0.11119128452548098,0.03695028857782882,0.016990654829391817,0.3502061654663243,0.07178451639408699,0.014672862538846334,0.07936203625730007,0.0038071009146471487,0.006870922315168813,0.17075494006145403,0.520622576144702,0.10506567731984899,0.056928285280512976,0.3268064486914869,0.01648983621250612,0.0002116106092152849,0.038849679719553554,0.5409542281068074,0.3473762884071387,0.020141369728716628,0.7081523138448191,0.053222698197625214,0.19337526262905616,0.059413120469958725,0.009775557407421963,0.10759320091479037,0.08554485896610237,0.023548839113459515,0.15061901341106423,0.041088760329170144,0.13095027947476814,0.017967348043467352,0.06949089739009578,0.07654840276765615,0.029855922508209856,0.08808728586101959,0.0375572090976682,0.031001170672867822,0.7658696607624785,0.32473543887088296,0.06492817539976961,0.25085777375533236,0.021456013940197135,0.11143243876778915,0.11851562124374032,0.00353768563467581,0.1609810280700825,0.1062877240956863,0.0641271532231789,0.004153092692086474,0.004974424907098033,4.547334670947744,0.21171888839062197,0.14348142045098913,0.10150639129440152,0.10223730428230376,0.021177808353033088,0.10526547053135844,0.18098658043043564,0.09609550683251944,0.12243286224630043,0.0544923096355571,0.07842728422698816,0.08714768065865594,0.0055503641237569295,0.0724126653678562,0.1328826775159637,0.03589783827946917,0.10357007874822177,0.0918862046616064,0.05304282478999471,0.05592809488393221,0.17915513821891227,6.629687082793915,0.13046393755057134,0.29174367606275164,0.28005841102777984,0.06718753727173123,0.6847553436355274,0.048670107159650366,0.09336837010147463,0.046334539972504245,0.12253138479302933,0.04139163433007099,0.1662464123661023,0.08881896020150044,0.028841618190999077,0.025095303990384663,0.20495624412299326,0.31253153850584564,0.11726583500227948,0.0824788768553361,0.0647804973773394,0.09167851854892348,0.2653683611411416,0.10008077784157306,0.11982361263911649,0.06287675153072489,0.20000902077356722,0.45463658570805543,0.06014868321289889,0.33880882440657395,1.2421202061331613,0.06640147610323797,0.06729613631116899,0.32057463242336864,0.012401798676853659,0.07708841256314841,0.09353398280127385,0.0030190699035936817,0.24927800221741053,0.05966059387339647,0.06568910188644268,0.09829774635403475,0.13296231695560606,0.0908991500095701,0.06357954015970504,0.08713123763591316,0.308209779424579,0.27342053579996844,0.08132773080341879,0.13841022041216833,0.1424600034111368,0.24678797241565906,0.02736385939281709,0.10267219474689729,0.0449861946178262,0.049710342021006604,0.23181390026412932,0.09281857206605647,0.03802109036348334,0.31752751705173876,0.023590473095895008,0.42737617639299563,0.06947455524755787,0.22612737073775016,0.10102834047628317,0.017432079341283296,0.012920221659934393,0.08952270101855271,0.06208516084856816,0.0273332029168922,0.06546994174509534,0.1534339223065157,0.28431356611299946,0.05785301459620171,0.17465832274315823,0.07652629866523017,0.23604184975778272,0.045185154054162964,0.09274504260554742,0.48672603298120215,0.20219272924306667,0.08225239339700861,0.06304525079753877,0.07735470743344132,0.4472496064829349,0.17999065161453534,0.4362809870104446,0.05612710370540114,0.006566404393403094,0.02088335481160903,1.0111677644636992,0.07788567381950473,0.11992074929370347,0.11528619035569525,0.05480754446853315,4.334164794842489,0.24237515765291476,0.18710605415038067,0.28518220952761836,0.30816772498788725,0.07325781827665351,0.40458805876818965,0.012760072752634851,0.18349699827220953,0.3145815064339402,0.023207410176702647,0.17115126408818448,0.30753117845188216,0.04751674785724322,0.10125429311385434,0.03489235950163167,0.11141217504376875,0.06279622934163304,0.33705400694281307,0.09346818409968582,0.02770855694732541,0.07304335374914854,0.1063467525558248,0.39844603702473974,0.08475609758292735,0.1660006683498765,0.09328939266089406,0.07474039870234747,0.05745985816444361,0.04713720404025083,0.35008020402101736,0.22391877902341026,0.13286008178162134,0.051660733727934,0.07745245554607454,0.014825093373294948,0.2292870523047919,0.03825811729739677,0.32188573848510604,0.2876407800125301,0.3018627977694026,0.08135967663050958,0.12575516183488378,0.10805499906727475,0.01743290168203564,0.3479435889823373,0.017238679740540986,0.9398738100138689,0.030982263944643536,0.11905972714921066,0.21398096590127894,0.41920452556728066,0.13466099910012633,0.055324610576501634,0.33403632329979654,0.006252470886386794,0.01910915712218616,0.20775346623783808,0.049116924467133775,0.16947672814549944,0.04049612534562624,0.31580922710974635,0.0642479389963373,3.0442847971368177,0.04828563635444058,0.529373961219062,0.0776167239575601,0.08730877431950144,0.5897258245627789,0.10121355674513048,0.08880379363775358,0.04622529984697188,0.3117000175457599,0.26419624440743283,0.031599737986899905,0.1143947377097675,0.059695663908630396,0.13465814253882166,0.08137100833131732,0.08721024264962243,0.15282644505325851,0.02754269629932473,0.11840310678984929,0.04769725505848421,0.11370160581890992,0.02888206010464524,1.2208265143984733,0.10195665875699844,0.04127956067803403,0.09686837200886532,0.25874847501093357,0.23246380935675318,0.012136948648624099,0.13461602305289108,0.11113575866942721,0.12270246244672617,0.0036040253367032077,0.166921191080876,0.13859447597727065,0.5140162815127168,0.49128861474104424,0.0394367707916293,0.08366594498780124,6.727114114335103,0.17505530125836588,1.7486736366749747,0.02928969031155246,0.04351189833137075,0.005175668304759741,0.4049903627496374,0.1195482981656217,0.07532242441602392,0.035599772213225286,0.10138172244560767,0.12240945406204413,0.01509647954852669,0.8308765250278579,0.09592781400025722,0.12694425825368597,0.10632486316526386,0.1462096004619607,0.07505982497862826,0.2525137251946438,0.2828154627898065,0.23497416577279326,0.15168048905826564,3.1648718502254423,0.07120266377119923,0.08456919308615098,0.040312075726657154,0.07627683576315611,0.03998051409043729,0.05024444871207126,0.095624723933769,0.1689509035596066,0.08934937547785488,0.4654381366086885,0.03258688408098098,0.09045835765910859,0.02566887334188958,0.4748036288181142,0.056749421788165576,16.398768079517154,0.061799094304560036,0.005759854792286778,0.09121852632074101,0.04207109934853673,0.05559044844517886,0.0355966138031566,0.040563386872965644,0.126469581183808,0.09388112130400367,0.9829292363249971,0.15541568586915822,0.0858654346535457,0.26634735217461036,0.0019051585519403798,0.032677041119462236,0.06591243605848204,1.7401922516276291,0.17150155634602826,0.12253817484977916,0.0541783916110879,0.013349262161395665,0.4818443328994137,0.03903942258147576,4.146454461287592,0.03765263648002948,0.055557737782338044,0.058983243257821956,0.19273212883380847,0.0022090749410426805,0.07220556491360658,0.029389439780524378,0.2703582642677966,0.09007404661906489,3.2810600063697026,0.10065892930739843,0.9175891032944805,0.11099005732759497,0.06748112187476688,0.062421709856264634,0.1166416098047497,0.10494969777813068,0.02497420357641716,1.6472481650763506,0.04099058004038017,0.3350011653107805,0.1488734699578699,0.12074250664970618,0.5082930562624438,0.10616115112301423,0.31650615012318395,0.02461800267732939,0.7343417470304189,0.8404987368256068,0.13204610805512432,0.21378573330382503,0.07795689982035295,0.08242061273149823,0.37926410054545867,0.08659047954037731,0.3051203089801859,0.11094509720714905,0.06493029660679092,0.073002530775817,0.1118513916279408,0.0013139938177543667,0.10957994021600503,0.15386356423605455,0.8988475672663782,0.1299730854881273,0.02156059810715409,1.6094478491277375,0.6015094674764875,8.443762301384734,0.043977561305323466,0.024861915246304458,0.04280402483209199,0.15159812935493633,0.053486755834209455,2.3803850254627545,0.06731664717397542,0.06635354832832357,0.029701390636871137,0.15407630297975847,0.04348592873866299,0.09732235232970801,0.2620904311543286,0.09966344032218957,0.02636997438329942,0.1812896212966714,0.35921527694177946,0.23724631237111213,0.04680392310216728,0.2693126918854792,0.12879515747456102,0.013276408040995068,0.06019387475218178,0.056988111764517534,0.06563916629193389,0.11365264015080113,0.08527489197641236,0.030288062896441214,0.07084159304654981,0.024715139072018517,0.1603642565057733,0.07556317030814626,0.02544117783561799,0.08154785459143517,0.08697087401570626,0.09797663796217294,0.016771122075519666,0.07922138781432903,0.07281346775996579,12.42809949991433,0.08284128206746151,0.01057182343766403,0.05900711100784069,1.7258698039935116,1.538996022015001,0.05147616934801158,0.0722709614771088,0.08037312795771165,0.258071599132631,0.12358690975120319,0.11864760452128126,0.45582488306459307,0.009305009917242554,0.05856699981915276,0.06637959843678211,0.10597306364113662,0.39253135145278467,0.9911740632097019,0.0922329212317648,0.05580828751854109,0.11999030014953735,0.2869130434833767,0.1050920058559417,0.087783542382327,0.12223456116389697,0.08845419531571079,0.17047922806015486,0.03274033977100796,0.002231758635193947,4.109057623460615,0.16245010667406384,0.05456751586268594,0.13020395477684915,0.07038948632407244,0.11082883237340822,0.33595044922068074,0.4400111217660032,0.17215787771027163,0.04814808008327862,0.06227056014198883,1.086459661179994,0.11354018492377492,0.46414431765220715,0.13143953308534712,0.4389784093134807,0.14521060044521303,0.02867252304092155,0.2018234412363955,0.12673028349608007,2.619679926824539,0.9481419412986681,0.11052913745342927,0.008509223425613404,0.17119751841200084,0.07427029674669168,0.6678838375277276,0.1616220156635051,0.059282340075925054,1.1263125875808204,1.7323627796153762,0.018783348958489307,0.13153688329955102,1.4224273442848447,0.04398542486218073,0.1673489572853741,0.02577077378299675,0.2795784898966714,0.013302272961851316,0.12126335866682525,0.04106949573582778,0.026813625454202492,0.8425317610130049,0.027417369625019578,0.020270727418245427,0.2183666729054997,0.10356695300233118,0.09269798778167598,0.13377784236497628,0.10429445568868233,0.2176817525396262,0.38605210336999884,0.06463219289132893,0.06949898559224114,0.27454083597484774,0.028851175326342335,0.12586169434861075,0.49204035750331343,0.9962281657937504,0.10172311500776096,0.06176797905357381,0.010723977667713517,0.3693572567743976,0.02566157359899712,0.03132295357685557,0.04946984871237905,0.05088259617325047,0.049466347253856194,0.043886628779605495,0.0607654753406507,0.6904632145736916,0.10049337758066954,0.06233000123709975,0.11012606157911657,0.24139738913105482,0.06428353481510976,0.4455447917436356,0.15861708778444344,0.07865806514705163,0.1187497810872309,0.055074251756636064,0.08535182360701002,0.17164319519333496,0.12917649153215877,0.1352894256640252,0.06509868532274693,0.05352148371008546,0.06507328039933587,0.06524851795039571,0.004371633653111192,0.40856693399885685,0.14596942022459578,0.10662774575715252,0.08083820500672144,0.03838598151181235,0.06605223874858761,2.368878416078993,0.12233581841514687,1.0527051059777037,0.6978546923435671,0.10223931674829814,0.14813241025421306,0.1978040671431887,6.733166811067099e-6,0.0962147864744269,0.17669140447927217,0.14848590438946682,0.19259946543907303,0.2514080337194937,0.1997238854873391,0.7156258312318824,0.034689870160984446,0.0019286331056662623,7.634789454072701,0.00032997769044340716,1.1692239519370196,0.0006529138218000666,0.006814086058982304,0.3236591949957319,0.037894088192766164,0.09521079363418451,4.265444561278832,0.02903251821583386,0.16851343905791014,0.06548030393432676,0.09036193723195848,0.649383358457062,0.06503685205020714,0.1432817136932937,0.16675823956074007,0.04793164135937854,0.03677386018328171,0.04734003354626847,0.47605667787307776,0.08680640548680321,0.23278797255209155,0.6463360730193086,0.005856705396231618,0.014951853125664591,0.06072327602471179,0.12251250167231263,0.3534352632197278,3.392551727422197,0.06383832312882869,0.34771054950750246,0.10527356486877523,0.03612216918211761,0.013522535437607163,0.006376681847040202,0.07698232551861092,0.10218200645686941,0.13686901657889258,0.1128926486418676,0.1234795124007313,5.319234298558441,0.09568505400474944,0.6370059879883057,17.671519176999187,0.025726061463950428,0.0041827933090951355,0.1801330189212772,0.08469479605233551,0.04153480150042169,0.010463142777579293,0.04285576877623116,4.802438176990989,0.03642890837565215,0.2445256937092308,0.02695142167241038,0.4037780103477259,0.1515031399220827,0.4535482405729769,0.16185202075106483,0.07733978069298078,0.522214249349571,0.11556121867401878,0.03000680243125087,0.0629651071845861,0.19095207832954536,0.21155826413288448,0.681839735300649,0.5137460923707173,0.06039051225773503,0.3558218967094347,0.14606640833319684,0.43742417010752416,0.24896936420739765,0.24223542394462283,0.009519695133148473,0.20653997163662255,0.028284638848519113,0.6123429891433132,0.12510676697230066,0.028029902001127968,0.050930516209835644,0.12882969681747444,0.08359981890598635,0.030230228427238603,0.00943701417479575,0.24816987124532155,0.025978750445389467,0.13323716502508082,0.0135836668931566,0.3249064099459253,0.07713723117864377,0.12173219512615478,0.11609434985397235,0.019115816703392467,0.05493737802692119,0.2603965616000006,0.06329143590628362,4.339553546423871,0.013841536846330408,0.004257336507806656,0.1668992449153911,0.07245387112669771,0.16113753419446808,0.2297372641746079,0.08190051559296115,0.3133888320449759,0.0882327555862968,0.00015368359162808395,0.12743171261817407,0.04095270878058941,0.030288284922983043,0.07362377910560508,0.11191582063405568,0.20050356543984652,0.2801519883048181,0.009968317486721556,0.1891310645046518,0.07760120613789258,0.17893980477997623,0.05605231137135718,0.14778152614096646,0.23828115599696215,0.36513866175634824,0.2994330588717643,0.7051256979644305,0.03057316662371392,0.09659252663987619,0.07108040680849914,0.1333387139920263,0.05928687736809298,0.6498603503558582,0.08714309142472365,0.1687378838291307,0.04904844798308009,0.05516811726137091,0.0014505828579202777,0.1676730780468184,0.3162093211505804,0.11515776316973084,0.11668335584189228,0.01883962771241801,0.4289552268259831,0.025314397391826546,0.037771029672020444,0.06351584121782378,0.1272293481099648,0.12022227492186865,11.035374275431113,0.09575685730334622,0.028667302345724534,0.024618377867816336,0.11640851483809257,0.04072921112713327,2.6132242182533716,0.08251057414215777,0.011454219009717822,0.00016633185467238468,0.16792464869422208,0.7104456120877581,0.06261116150842135,1.7297612892434355,0.040466115077977156,0.04189396713508499,0.2383607169902667,0.06195251694222884,0.017650038063714558,0.27126484467023715,0.11208721269153138,0.0015736080174923795,0.03356162755331704,0.11118537651881766,0.08573983269718291,0.4048306226604985,0.1219735491615103,0.04058187682336245,0.44822820358047977,3.4678930728464503,0.09741143340883285,0.1702091749793697,0.1266116335404082,0.19146507192688184,0.04812257492138581,0.017347682055350224,0.13604838825759644,0.008628646056880723,0.2755114540355246,0.23963092059390137,0.03981676800739484,0.22057383594944852,0.0796890924559452,0.26630394794298895,0.03479828795194371,0.03481213593498012,0.07660867480028578,0.3279606029426985,0.648721074525278,0.33168880653908656,0.26941353267020735,1.3904530171693572,0.11348150573103004,0.9201966273012974,0.0325640013709676,1.5929819102026341,0.03969511056719703,0.1460451181415647,0.08486126562737151,0.005348764321820811,0.008565433020289236,0.08115498429446333,0.141455654944243,0.10376738571400507,0.10239988822339331,0.33474577292807256,0.14546471444397122,0.007399698800122392,0.3091801446212112,0.1628345628223317,0.014244047492494364,0.0018118831231857184,0.05356603952842621,0.04763113417740846,0.1007850850112106,0.07086526098974096,0.08054235154652159,0.40939080981387194,0.06800360502962474,0.12256575240138554,0.06649275564221604,0.9808482009327875,0.12441215958458195,0.20218668231840167,0.06837514797889675,0.05733643989299809,0.057176651056622736,0.04932249693524145,0.06352867372368232,0.07637400392800477,0.5574712705768895,0.00811871709587543,0.12769931472048227,0.7145272942793324,0.08843726842425535,0.21063808906447837,0.1014789570053476,0.2023908336170097,0.08861988982790038,0.08591640763530213,0.7700056120097769,0.03983954639123032,0.2539564936239672,0.03156494207713811,0.07530441408446989,0.7401187705514007,0.33563784018153187,0.0937479450959659,0.20573613760915344,0.02062708900340103,0.07037564011478162,0.013457729330633748,0.26411935338593223,0.061686868243270174,0.33636802181445635,0.14350585406851835,0.0567173783158284,0.2614504185023576,7.878146817472489,0.03484731683067273,0.08359078357295638,0.06049332739983379,0.10672944083594245,0.8753436012716713,0.566539853042225,0.025088483915455023,0.019027528078760677,0.12545183887048666,0.07764967377949429,0.14897016285420336,0.11143155384795775,0.1295560903683007,0.14036908114470442,0.1609544961987968,0.04615941755688941,0.1216507787758058,0.18683582437572255,0.10213269581358157,0.33253301478160063,0.3281006457710867,0.023472517013913737,0.23125214761633445,0.4950467538552535,0.5422214772197378,0.653970868588558,0.09189106868038849,0.01943324462730254,0.04624514737789105,0.2440216897260251,1.0364773049857154,0.07943044555355622,0.8463356671897044,0.14971883436713748,0.013864008626322618,0.3718075361305755],"c":[11.388533432906918,13.76172457834315,19.220742326198213,9.623290146539485,11.61368812020064,5.5316908797151,10.816608723222291,18.600696898212554,13.065697808143518,5.7327252476794115,15.013687626539847,19.28118908010801,14.079784819558594,25.815281635702604,4.932835930824567,24.43617744826509,21.72788066742571,7.078701143945519,13.902208056773123,16.7689870849839,12.900866173534048,8.560777131605454,16.53238624699205,6.937185391485256,23.49608007013897,17.016369581188055,15.574130920822174,4.511419811480735,11.537258347885128,2.339239504087144,15.026454322275537,21.986037463313213,18.044353467984966,14.297835816200536,19.392987119778205,15.967413535348632,7.185734045112037,28.1005195533329,4.744257744265144,13.897826154581262,22.0518585936378,6.511258331987979,2.4630381936538006,7.469553295069392,18.09584633800201,30.38422242638988,25.116726397571398,7.2533959503131165,20.950738306753664,6.800774153785074,9.253365638055339,6.165017147116853,7.1473069503761675,15.834990455397493,12.101341837776395,10.30214838354336,7.343360646358672,26.711982322800985,19.37869929710427,17.0177830062816,4.768005285525124,13.645405700791356,14.899233994085783,11.88961078862536,16.250184502560092,27.448267750008146,14.41479409249516,28.620704423070734,15.295620801146706,15.973492085086342,9.289092420369911,23.17481093313588,15.940103233381944,19.907963903946357,13.894570264679832,10.071509260657336,24.669635021948856,9.638057618456275,12.884855893043849,4.070943278004575,2.634498677482274,6.7854117240739065,3.8127746711390404,14.641642149638457,24.69584628023103,20.904345779590468,19.074823113336343,9.454049188057162,12.42314288981013,21.24556826235459,10.271555860373631,23.78736731285771,12.412834456070053,21.917746707368416,20.953694871688803,24.931721626752704,16.35839285368817,31.479900132345218,23.33027356673688,17.49345216978708,12.922284446235235,11.8701519152911,20.002164238689833,8.08043220398173,27.7890889716042,12.973839443459147,28.63904657369877,10.249128818707408,3.2195716845452567,8.929354673369442,7.179081922976589,14.440216950154753,14.977007418222133,17.300592994620235,22.42574096670289,6.0992864122498,6.715431655563616,26.66042552095746,7.929417125895867,27.369171499371284,10.934249872350152,21.016498516026928,23.656058570288895,10.306951160545252,3.5899165736718626,16.55955824973148,11.13646593536688,28.95196380781001,11.994627643331777,12.83960692788696,16.302309095485032,19.402685631769327,6.3894357872051115,7.968292466202229,25.46163627681769,12.8412784664887,25.111381382920797,26.151548712058418,16.726369101320923,28.74108378523811,25.45830598172423,12.57099870698828,2.9496189111391375,27.735508055550092,10.642826694270745,14.3689757281261,19.104541455237463,15.548174374896993,19.84997059064701,21.404711900360144,15.96207723729668,23.29636498533441,9.199584128540039,21.416666506566436,21.775072011137418,17.324797373126408,22.882980944228713,17.11185455941454,29.871929106532292,8.846547830733266,15.079369730287716,9.889015715247206,18.924595796260295,6.46293633621803,4.631963198181716,23.2772945576235,12.087774419714918,9.088950783308185,11.728804940912788,22.894361992235208,12.752993924569662,17.078603116893145,10.8612149962571,1.8058707464744181,31.621151614458817,29.06462771924653,17.979081872501858,19.984478556253418,15.653281193455959,17.381721029186533,13.96602727164395,7.562954810807712,20.289318621574168,7.899180149476771,6.221113131188944,11.32789101883894,10.3736219731017,19.36517866665446,20.84101793808852,24.062680834394726,2.434540132272189,14.351562489985852,9.53266468704547,20.2970038759182,12.446090586821922,12.344327302666564,14.203457311318862,16.952530559015408,26.589643164613204,31.927148311307118,3.7698464956150204,8.365718426682964,19.023766319717932,17.445863691714187,15.962567357117393,8.354679765558927,6.9737081118069115,4.219932505049492,19.1741125164015,25.517302557233698,1.99576184492514,2.8724909360243505,10.16609879304962,8.406293682118225,22.812886783361716,22.606926149510038,18.058740204891613,26.249752509269662,17.937503399026937,37.46810911123096,21.057247027963125,11.77171934918092,19.75104288103118,18.398619977091965,31.914260191165525,21.626963525447053,22.425352172578684,21.25618231774785,23.07929876267665,12.087568336810817,11.746946897809707,2.705570125856491,6.51882840556891,11.983598256010584,10.563702715184073,14.907920151812593,10.016106646278468,4.462670615614104,21.84310962090732,35.86100069649332,22.013239875381707,19.062226953342222,10.562119205357343,19.440841020953258,17.85433813993003,14.855307776359346,16.69384328512893,5.501559794484361,10.662239154590507,21.75933180393826,1.7248683884869656,14.439894791200507,11.863158799141093,12.601855430941834,12.63901816383444,13.362263711337569,26.884951574571694,16.559746984657362,21.171853602613787,12.17951573153535,23.791422178166265,7.354518262206504,16.83225053345324,2.3087534042110764,16.711907032794123,11.518261364709218,6.665504632142335,12.114046885411277,16.06605593852612,11.243995977872759,32.67025972579033,13.436353471111786,23.26258821434891,14.685957809181774,25.30398646127091,14.353167638804335,2.1792836919426106,29.468975102783308,10.139073445293056,8.13235658270153,6.318139774416936,21.186906113456896,19.94067823791,21.640179446654322,7.726174028551183,10.003943842656593,13.829354994036207,1.9904824218004806,11.406857148917641,13.11020174258204,15.150496438681875,21.262498049172653,24.89749455344095,11.254839222519516,3.342595568129888,16.383490113162175,13.113939185546247,15.417087495197222,9.308446783051592,10.229240509325013,10.075425089923714,10.679889342158045,8.523094167211198,3.721962195450895,12.817449818548226,10.865978228955885,17.67296618450637,8.221565745747254,18.123260055776164,6.24658737110703,20.76452333006586,6.7373112553331005,14.808283547137128,15.144985284855098,15.42112995532895,22.78639203663282,7.1142715411339355,2.763319036498001,24.783862889679618,10.715276178129582,13.649180526725305,26.243536167695133,11.323100640167608,11.139526481627765,2.4023515969093325,18.89180461831154,11.48846354072161,21.42535751596497,28.211781598303325,15.37248662775132,13.386414458722516,19.427870462864448,5.732738875316837,21.892185765227488,27.85235114714601,18.753970094168416,21.80543060218607,16.268322080919173,6.9110428259140395,13.975905077621887,23.806683687157214,18.04388389208205,26.68343015956821,28.43568595962288,3.30022432184262,19.05564409788184,10.039928310793686,18.741193432077118,9.03635752091958,16.29349592745566,8.658782930809418,4.258827682323972,3.044283168454342,9.058866205625865,4.174266871353896,23.284745581519495,12.946387757518753,29.254000354364123,1.851523951641354,13.654404552329458,8.459340419084343,20.683329996698852,4.0419943683624915,20.068796453324516,10.956883838940731,4.758605018135038,20.86905139142114,17.252189173620703,18.310960506886232,2.6760096603725616,25.04721253990065,11.962544082020385,5.059525836581345,27.85727265209497,11.478031400798784,21.988712237196093,5.322829062212676,9.89125670695305,8.994992319735083,16.22185372214439,18.300554808600637,19.152361285044257,9.667364664984131,13.911207137706413,12.58108186918566,1.5017023321978717,17.886788208390207,6.830146939762381,27.675900452908436,15.376247502905494,11.706717080223205,11.99874999990033,16.0063709595807,14.682401955369308,29.917911809213734,12.866438742234344,14.582165072380972,6.521843552072864,15.559014117613042,16.69159189602021,11.618982535394643,21.204343162126285,8.776140918998895,9.023661198426314,11.35017202859778,15.211467083905392,36.61175651550368,28.045409677357682,20.627691693181315,7.434159905033066,5.8592789399058125,10.040793050548128,6.8836509198178195,15.241442414205274,26.701438708355816,10.066315060553636,11.76119416625437,15.210125383669238,14.704035012887303,3.5885430673568006,16.50616963685029,9.072286777026775,18.023841957972913,7.033102923991264,16.428714851194258,15.047949307206201,14.546064854867534,13.956928418326484,26.128122633217323,18.98188969839793,1.9053224551036292,18.054298771837104,18.245684199941394,5.532686482088208,6.3370094884578805,11.63063508236353,29.05006269671599,19.839210332844758,17.843593689113796,5.072224612646242,27.599449567012012,9.119507333979847,8.932025154715138,4.5070631144757165,14.431973573988897,29.63192943241161,3.432987041359485,19.30036182117342,35.26276283580371,23.99474162824617,16.72639418723771,4.548191327487285,16.825161482727534,3.1102154687296166,1.609415813511701,13.477323100765608,25.495714329430506,10.653960654551662,17.56216620924554,7.360547541022774,24.63025958550682,19.69783281938525,16.403352497547058,8.700883858589751,14.582324608735762,11.029242352540393,14.475485385748616,21.005655541358557,23.72665527629842,15.72244258855893,4.9917859316700595,22.70658815673722,20.647923620789275,9.948858403097132,25.032284557525127,11.319795271488134,20.557858755989333,12.758968941731347,14.205044120572875,12.029871526428803,11.675278810179043,0.48893525219170086,15.969631271111126,4.784919817152472,4.041891513443098,26.209454449055727,16.522254892827394,22.48487883387438,13.256132393842195,9.736019487753326,12.983387430179645,2.1714321588073457,15.646844343708095,18.89631677059928,1.6081664978530061,10.04682001740802,14.278056142890733,26.24606770283048,20.887458700210065,7.758547846268927,28.119133692194925,2.783386670867715,21.58194602246592,26.1260231576235,12.749690624597944,8.564104371707362,29.302616066579162,31.40769533404627,13.3265081631749,17.60188238334146,17.32972431674806,24.741433056445597,10.65989403126848,2.4037268968770924,18.81860462529359,21.537207659525894,10.126164560080895,12.716930258046652,23.22077309539522,17.015618926878485,16.822026914252042,27.002680023693486,22.091501125833517,2.542622135513703,10.387440221397657,16.23199216151307,31.419973996837776,9.697134439613361,1.8107706675567514,21.115996647422303,13.534903334762632,2.668658592349398,17.184492916959538,15.113975346164533,5.41477522713446,22.127258977969895,20.686869115751524,14.390203042505888,9.557643407693895,23.609118049886714,12.435170361501093,9.387913654442517,15.731679328091682,12.3113657626623,19.825158690686546,18.599591825322733,36.4850277992459,15.36252703502766,21.129416799180756,17.59625376956003,8.05341251242388,16.278930615998096,15.631657710549312,13.50336740913167,11.202574590150045,25.61020866218535,12.042236311487816,22.734105214027743,16.448723282181444,4.540400085253986,32.255015893814004,32.44678939227346,8.270875865742624,4.058278884095129,15.478277666214423,8.756806917047864,15.242821323238967,13.842520327092856,19.143308031724924,20.508390491248527,13.077823580322912,2.9797418456952354,12.645556218148082,21.121160971514186,15.985516489722166,9.999681598184292,4.701468417654393,17.76947152307551,22.524749970910282,18.13992938372269,29.28151509183651,4.488331894315606,21.042781961163847,26.73597445751092,17.28496373132842,18.195770514560394,19.913294747909617,18.100908646586397,30.098155310887876,19.10554108267521,2.535207860791337,20.15287042524978,10.589209715405872,4.856487630962182,11.575393263503983,11.033977871522236,7.569977849944721,4.524562329965901,21.344460479577567,16.985179708388696,15.40291803732809,18.48209395649543,1.0933171562081374,7.105879571476191,4.572725910680122,2.79132643516046,9.474063297026337,16.930160679364576,20.326970264460336,14.013262000295345,18.007975795759357,16.643951601390473,13.290047340312496,20.038991925722858,11.218986893524963,15.648553147208256,21.780895695921892,4.948122861347314,14.568865635930225,2.3620123663598753,6.419516935510766,9.180260903391304,8.179581110608591,25.962018443073113,20.787678573829822,27.89217509902862,17.431457229502467,10.446483568811342,20.550251282194527,0.9811955877261562,19.072066578822692,17.50206068612194,8.782618572028628,25.841821961801678,14.935585767328064,6.104803497711986,5.880123897255189,20.34305254338593,6.553487750289872,0.9176475513543976,18.532194147292177,16.05340951521327,18.09918215364143,14.139248134615933,20.66310765903265,9.666185721652926,3.807300757848407,9.091754693330344,23.461861716029258,25.189388375612463,11.166590551211899,23.560042287519742,17.958702429171296,27.223239785030575,18.981645509817238,17.243698234924164,22.654029015960262,17.157161814660924,24.090436056378604,11.920553809301385,10.250762071536009,20.7940106702802,12.120515019806712,23.26980894754447,10.534339896133613,14.50661700327932,13.380204191466392,18.07093946303649,24.634422638216048,7.372715629661001,1.762885976482513,23.774918656132396,11.336803372118194,1.7016500178845824,19.035449509478482,24.043681334976256,26.878262653197627,21.389447757561747,13.918436266050845,29.942582042176998,11.516586764933452,18.791348018597535,16.180359548320045,4.320392717329977,17.684179706585414,23.336256998597,18.55151405636943,19.151144417320456,24.906668182641276,12.015540752353465,5.910607795410642,18.95366447328112,20.912087042179557,21.794036308038546,4.6790662355676735,16.00119516200207,8.572285486417172,19.366235207997455,25.559964311367207,17.476076328986693,5.376383323787432,22.436463245192513,8.112060741031717,20.097187155348777,17.587916411648195,15.178347471220434,20.474094579272666,18.833966125730626,26.29159319399094,10.755751619972886,19.579543119122338,27.756815624170592,11.909638171523458,21.170463932116412,19.722097897673702,7.9659392813243475,19.635673782862025,15.15406821146832,27.10395639896527,6.555132275764626,10.929970843499865,26.798306398686726,16.378577748008368,10.23220157588012,17.218581990449444,7.370333441212696,6.653469775896725,10.14664196884328,5.924565540724621,28.736910438348662,20.2699387877088,8.49935184880236,21.758047167229034,8.556471425843844,11.350256684143963,9.364637877015836,4.804047088567041,31.170961356427423,12.89221226268778,15.766370054451645,11.90983611308426,14.365000757717175,14.93892018785411,8.431452153987168,2.5755512027769565,29.9005142135926,26.115170576664852,10.985521282579668,5.503072729821405,15.494424219102545,22.460856110277103,10.718739992168935,14.595932192087055,1.714318959504052,3.062945659224822,18.89029873237541,7.474082464735747,8.340146063581814,15.75639692640318,6.1133403673378,16.444920890063692,21.360023710797826,13.389236129875329,3.363215568081009,9.168630227645854,5.899019551312248,12.204369158273536,12.15127032165584,14.087376040501292,11.29154378165319,4.767498602453025,1.1049329524905205,18.652367952123576,18.612281929466583,13.598145644388442,21.477883063720963,16.520819696312383,24.104647372628826,16.702075156745707,10.186304566213469,19.27337895741785,26.741866162949833,11.457662468705557,5.887448735193502,8.560108777767242,5.333767848845027,25.01084752582348,23.50261142110843,8.54165752161868,8.18842187816331,24.171231549233745,29.431993406134108,18.11002973846233,7.001898815305732,26.594511783178675,16.169800615572623,15.082179541462112,36.40671390794097,17.253894775957807,18.273205015064324,0.6148350342642344,22.95003540963316,17.73717392278492,11.258929819132131,22.247080175392554,14.587374772137736,18.655649001708003,34.10509560439576,5.143936887712952,9.52728321290152,21.825662393991124,21.57277876012652,4.382181200987804,4.942090720857899,11.566553803683888,6.2158084720801785,3.730439768417364,21.08878827739814,17.453567780312714,6.314402473158937,19.917361256505593,6.985198622540301,15.25757645551851,23.408265122620037,10.86151352410339,13.788515080268475,5.985273479463363,20.107904712215216,19.44747470022129,10.419323421344252,22.676023346527824,29.611597344390532,5.23804840197127,9.469960394864177,7.8979640870079955,10.886541073962187,21.857754596261863,16.808897935373707,31.461400862954378,18.874637488554736,18.24522118877526,19.354959108712514,18.85900970404539,10.581221606947526,3.334524836957058,12.035783305490018,18.764363265839773,5.82906105542333,20.004110504648878,12.649123455952795,8.961299633107338,7.407094951030881,12.064373725924332,22.727680708100642,9.59595224597924,11.28864503899961,6.651800576310137,15.240463718382355,0.5615425757994197,13.132096636281249,23.239118179122187,14.864779111511565,22.716382711827695,11.286514797184376,20.8443331675968,22.261965485469048,8.886099622482048,24.179280148760842,23.689100867082978,19.32810085195223,2.906437209727539,15.876969309528,8.717619843666695,13.790784094765478,3.254498399008807,9.977214619300051,10.457615179500118,8.967158932007381,14.52867669806995,27.54430113562138,26.043565024005062,20.850819184661553,20.694778816215067,10.44448731436647,4.946512904636513,10.308052340676973,5.929041729509155,20.61450040556259,23.17124461628091,6.677284991976574,7.551942007277136,27.63623844459672,8.094737141615802,4.353121328296388,9.823923915707997,19.94427395448963,18.019865051056602,27.347471932567142,8.99584336983101,27.50235094116306,4.378818629748909,10.42655108124842,10.212819503735922,16.988182666002526,25.079703398322103,21.12774589837509,18.844757155483634,12.612857135407452,28.663810112683656,2.231978374086001,7.686528213051485,24.3009341737234,19.45752396393396,13.391969056120026,11.976614916439397,12.846150197897776,19.805983512615292,18.465724031189062,15.701130965218399,8.804196700811435,31.994772886030916,3.629308267715012,18.073481030593808,11.840390376307196,14.88863126118056,9.895502947178203,5.305717356081695,11.56729786632683,22.659321884659498,20.488046972364046,5.461337956495774,24.1482211061762,18.23816900203353,24.840573854357242,15.391396413560138,9.812237644217866,11.436845610339104,13.637889708351697,2.270233106687156,16.59810862415022,21.4420643012532,7.597766227358417,16.17337659375989,18.551076434639292,11.66663674027761,9.355394043246168,17.514536623293473,20.152231435503584,20.29351119654271,31.68983643200962,8.46077300900237,15.307762920885814,18.513175537219198,1.8484108403567312,18.74914739376346,14.663268447490506,25.927441019741707,20.286062856506867,9.687350261390424,4.559002517293216,18.827041992126837,30.84382346702857,11.73258709200311,6.972163560012199,2.2662942630016536,14.54134272167553,20.540554008115194,28.31016673647074,17.03513876193699,6.239796547290789,23.06812415172076,24.019316953373405,19.0761573900981,8.563289298792402,12.854015105919732,11.262286739226347,10.704272023677728,8.154125514118837,21.44109211682627,18.506321215500506,23.189768595387616,18.432677198039112,29.54425666993579,13.817496691545758,13.493070056819178,23.63633468432562,4.758482837424973,4.177930478205246,10.19382777147899,9.208186864918401,17.66159211078901,18.16489866348308,9.186052336236376,20.128766818872347,2.4539444917564173,26.98613386026161,18.711713115705372,11.66564215629494,14.961351117836749,6.599999409100152],"x":[4.711598871478638,4.798182841126754,21.33700955794565,6.615749073196674,11.519274401435176,5.465596493656675,8.111076006575585,15.725394596603987,10.691176284772743,8.210720702136879,17.86662204998524,23.937901901807145,18.84861588608615,25.76867571822801,4.56306193571104,20.32402773575798,23.778461243981923,9.892037134708861,14.740116942377405,16.605581430513514,15.673613781450324,1.3188675358214508,24.134825888320282,7.049186239875308,18.051198790486247,17.415065606402372,17.597664732921597,15.932205357248783,16.877394626825517,1.7547769331094394,27.821994943686676,21.53260561048522,12.140173898398388,12.532326138570898,19.752598532956693,17.47950015530261,6.291824373095107,21.01215885074835,3.6341074914074976,12.742268438020828,19.941256312759336,14.938687151429239,5.066514034934472,16.783447478122326,17.30974890951295,20.38321169068073,17.187582530007237,16.002584646922962,17.814218317753866,9.372928503657079,9.502957964832973,0.5707537081970805,6.980622786573412,15.541033257662807,10.137090825945473,0.5208921290578318,4.980088793364188,19.805853442137565,18.707758769671194,20.437767717855884,4.300852587970066,13.617788961482546,15.339743299462093,11.495475681035181,12.249804587988312,20.93909914223049,28.027374880109434,17.9882867618092,14.984826797947239,16.665790908125036,8.021580372255517,26.016325459707602,15.391379574085757,19.97382483222321,8.476419407978522,4.774420355434411,18.938442927089646,16.61391197831608,16.83103317318686,1.791765879169708,4.9968870922461415,3.8664900024453885,4.128542592994025,14.968106019097938,29.943778321748567,27.413553389658887,17.894648041493312,9.605277088914512,12.414463849236633,20.792505772249527,5.939186464865687,14.72873242553114,15.528127500290006,32.55935047325433,34.14785753590574,21.290266866709484,17.024307171570257,23.31475707185708,8.96826405485531,21.525999070890826,3.365878066477398,10.756360803639447,21.606903061267563,8.628218903109117,26.659263021408147,8.495646269732529,19.146033557953537,11.24229175508491,2.3814128662594642,16.462468996023027,6.584414406777584,14.443836796424183,12.518489151824859,20.63616654757009,21.34191829677214,6.740542535417413,6.728238063955918,27.075553954164278,8.5435062428282,18.973308599465092,15.00087619635623,17.762406028340564,24.335138113338996,9.010092052039951,9.779300013404875,25.204408086960576,11.609608783193638,33.03173105108381,11.66911313933587,15.119704696557502,16.189417486308212,12.382662801931746,3.846000765868176,9.759408385074932,18.93513464815722,12.57744899141967,27.880079638289594,16.643158193368077,17.872589445436546,12.893623382875747,18.855801186675563,11.472871019684582,2.2018687561429253,24.7501692706051,11.650897403173452,15.109714512995666,31.83786165756807,14.403978978727451,13.182660598733568,21.36401992207254,17.13898722084243,16.87022941112389,8.55856422917652,17.187835231628323,21.328788283858984,13.382054492951536,11.145224224431763,15.586558332831597,25.326728686383802,20.167947972390788,15.808530725147062,15.678570703527281,20.825694231030315,14.761125048075408,9.734078604313734,24.288424153739,17.08047341906806,11.34415754655787,12.862981105702683,27.866876086451384,13.035238819557343,17.57622994471433,7.4856860399129745,3.565692875783689,20.439911065078842,27.800195785595413,16.664607903732403,27.622724643135186,17.32612511161919,20.178980933789816,15.298676772422553,4.648360460887886,15.575237942008206,7.951041748758595,6.595189402141766,13.521404646754362,15.258873106057292,19.145750689460925,29.72590022138689,21.30075809249611,4.663894996033132,10.68255425034094,7.967817070413916,18.594330060672636,16.805816313818344,13.103711351225552,9.542353295457188,22.52325740945847,27.182784296095164,33.39657992115311,1.8549074734584292,10.196508623836007,15.40572815575087,21.86100536975969,14.711687105509961,8.36799927919339,6.894511618945736,2.8744157447228753,18.274427818279875,19.84023782228366,1.364139550977046,11.618299877664683,7.736944139357146,4.376889533004375,25.15464670902823,13.16973835019886,16.674657910002622,28.41191391793435,9.685023338300024,23.72308162406647,19.90306461365898,11.890139493777362,16.72082824659084,17.14923479957899,33.46924879473376,23.179601897480474,22.127229549036173,17.924686792308275,25.068748309225743,14.939713117297583,10.84751873791539,2.2708285220483337,2.8077587673694,11.405557139257027,10.460453380934116,14.498872382819716,6.897305668216034,4.4361091385740465,22.588020481223598,30.752722496891046,17.642910183194697,23.399923785733204,10.40781105734234,23.30928421889613,20.766212524089244,12.152371929294375,17.748947572121484,2.6354584676594577,18.03803021252594,24.901208998594157,2.538699185098922,15.850588409108052,11.59227054865902,12.349979924801609,13.660272591322045,13.122401627592897,15.39711179133759,19.263508810016436,25.12240603836686,21.726673955009968,23.03488578381302,8.6644615811927,25.126017167494076,3.8519155061050414,24.167665592557874,12.048814568936175,2.981215592670327,11.856084416764622,12.294193985943672,23.76113878665636,20.735460514591466,10.333647175499653,18.61330763192025,22.862163159180703,18.907960714553983,16.508795587062078,1.5536090213740532,22.75680263148751,8.689606886855472,9.848900594065485,5.272251116073931,28.24412242356717,16.792000011376178,21.519581485086764,7.534096947956004,13.154774072987134,15.601962854482242,8.33608662827515,11.47413660465902,11.911181930474918,15.668058699380675,29.144611609748267,14.317177327844636,21.443360950738132,2.9376092415779325,10.963157073132734,16.127076306986172,18.672261422305723,5.711037612490231,10.240742057295721,9.60696418130116,10.669202580263555,9.446881612961535,3.002363106580531,16.258330991792445,11.433634571027552,3.3730853389770847,6.445553764795458,19.036215785545004,12.636379294821161,23.24891504738422,6.103941191819673,11.716817513946154,17.714933494161755,12.003987312169786,21.818384772008365,6.4610727865399,3.664991869828666,19.629285350497202,16.589706861723982,8.30104234601264,24.559141336669743,12.022279248035304,13.035584069516748,3.1677606514906578,15.64453590506699,15.85503200857924,28.98164918102717,18.34058470101541,14.738595268300312,14.404909680960586,20.84840722076925,14.102146186545362,25.3173429897022,20.21143590600619,19.53716623758043,18.311233098447232,16.549214907297532,8.208011839288687,14.972227890046105,21.307319140866742,19.14100391786006,27.55083591272546,18.703108342022972,4.408257550215444,27.695398507688232,10.41004145407038,26.141198751285593,11.587234419489409,17.98651718694452,8.696518993455447,6.186747204580214,11.206600070704145,9.520311498591102,7.054335305041011,26.686728497713972,12.473857705032271,21.565611221374596,4.145623797846072,18.96701911402426,7.418617263237544,27.518190959594307,4.044905520467902,15.579008439202504,10.664699647298631,3.232912266325749,18.65075268472899,17.937300883365065,13.92881793275139,4.356585536138006,18.905173499726057,11.91223521200481,5.726346595827249,17.366531259602805,14.729579878645824,18.789938857196695,6.879801049791423,6.471704217568851,13.821251941614458,17.60083568700728,27.455224791582694,16.171492089632366,17.32840452106901,14.772275288492413,16.55609736658689,1.7890704422860564,13.947407061107318,4.699393762078568,26.211583227416064,15.668045966937616,12.134832603620097,4.262307241257998,17.071133167300097,11.71159452584611,29.22096422007811,16.253083946479457,13.236342060313458,7.679900441089261,16.089646347374682,16.231875500794537,5.53694635065001,22.798230283415705,8.762693167516566,6.764696403801029,11.624516438991407,25.443484347879373,25.65950773930674,19.484278429929173,20.161544289565462,8.61111993700252,8.646441895458484,14.011058806460493,4.813076686059719,15.778123760844544,18.780191231305192,10.215300774614903,14.289762418651062,13.035948661332704,17.371291246387948,4.439166346886472,11.948763158922159,8.509518743045083,17.74552017682844,6.974699183913314,18.95389732590832,15.059641486779443,16.779718039912837,13.452250496759472,30.555873156067328,15.740036325059044,1.4920968869759732,14.24298030624178,15.692101514460669,4.99499149060151,8.381969848039684,12.23406299481345,16.996570279614257,23.8421559947216,14.49379260679172,4.732518068947739,32.76813599813934,9.128321204423676,4.163626227154211,9.520600923047507,14.725586912868067,22.275105213515562,11.360482405325508,26.048230927241505,24.629672752148455,24.229505891533677,19.80339707923647,4.572915832645075,15.966264426494924,6.969499808996918,3.197763116064718,11.307672397666032,28.791336364684142,17.332150145924132,17.507025202853505,6.132332010538917,23.626745754182508,28.05385440776086,30.69790735573241,8.567629629758862,9.974111441503325,11.072958371349715,20.663210602471665,19.44282734870907,19.716755189777146,16.0659466406715,22.471633953938657,20.710430079190882,28.888408537161617,10.339071951619783,21.028276832319992,11.35243327556669,20.727504534441398,12.916728922543228,16.975100626358746,16.00677448661755,15.254897321665824,3.641336614609975,17.274753090940433,16.581197795697133,4.034932681206946,18.442726919314293,16.327404418674327,20.123910586196658,13.492213969350642,9.052256038834763,14.551379789042574,1.4824197289023577,27.357861559330743,18.99636651843072,1.8414274223910472,6.752575549623915,15.001632841947194,28.06419658977896,25.20055599827467,7.25071100514565,23.230897903983603,3.262634170102726,22.24190843902864,20.63492276571572,17.004971466964484,10.73061246151693,11.898541424555287,30.203242855502573,14.721789738031259,17.391219676329325,15.058517753503548,17.683324110008364,10.64924529519313,2.6815337752563897,18.82914380409027,24.685442685591145,7.185716755160606,20.894645105547568,21.353504237519854,9.816613771183636,16.883294884589272,22.576568635101456,15.482509688114348,7.332517757880337,7.902262085170674,7.415385134948135,28.635108903904168,10.7775333210375,1.2364406157332735,30.24622040834095,13.438707207630618,2.0321300377076077,18.71141632540699,19.918609643889067,6.701503415147474,21.086212844120908,31.335573508897077,17.17640368300121,6.88887023462884,19.77105266947614,15.04891556098461,11.454447890308877,22.007292467087254,18.89496603296239,27.883074720044096,21.679919372026628,31.723357784662216,22.757877910472317,25.149873423598027,18.834648795473147,8.302864146311945,8.427355749192854,11.6397683705524,8.053199311878213,11.207241839492747,28.245626499496826,2.2420977358379734,15.851349466874431,16.534867481575766,4.38861428528235,23.24811164317424,27.14006901542706,5.941595275412254,5.0501741440023515,15.462577892591366,11.37341735958232,14.971535902097296,1.930441007107833,24.28578650753679,22.07530059385474,16.8171756453811,2.48484345157791,12.481515892579505,17.36333865987434,21.74293944715454,10.75532955541632,4.473966488158262,18.17911042297437,17.777570560545065,20.481518960929556,24.91983259288127,5.876531062254642,30.374388900233452,16.02436461520176,17.372726054428334,19.8322555015445,13.13127723516076,18.555871156212888,24.189891761389763,19.219864266216486,3.626176686088831,19.177425484339693,11.819563510429067,11.764636224983922,14.01936041913317,11.435226920321096,8.956881655233996,5.265052990240371,21.70573248721652,16.315658748461324,18.39021594317309,31.490738377096065,1.3177904139183598,6.755376316809162,4.586753138773663,2.8932830760509836,11.642925390861462,23.9776814959741,18.060101204894668,16.882612475394545,18.59168873819978,16.68112013315352,14.084794089984271,19.69881034980332,11.096888003576854,20.49551270058805,19.457252922847008,5.163117461938158,8.3517619909434,4.062008685972144,1.9658149300252994,10.573387427961379,20.66192819675925,23.666081549263062,13.865886649119329,16.883429974246347,17.080794902971878,5.8606647827516305,21.524657417802487,1.6541010276487476,16.12692982869074,21.086730219509196,6.978307264782983,24.686892766292424,15.588408430107751,7.164608961407798,12.536628135552537,17.372217943801733,7.07367612234756,4.900254931426289,15.545240284887743,15.75896481416881,18.38820210614905,15.198752893955978,25.42186026892504,19.240163650679595,2.5515237621008726,7.571216429395759,28.56875461599278,19.727491111770746,18.098179881068365,16.001798761069736,19.889965717443438,31.563501016875144,19.11339516234987,14.259748286877393,18.423597464212857,21.144957559404066,23.612760127975925,7.8550326390992975,10.68950715383508,21.73869602288894,10.935939300206819,23.65320167748839,12.112550007745593,15.641340980287232,10.610682010511319,19.915363886489565,25.306040483203873,12.471241026097832,1.2067137629970537,16.308089078226967,4.759982724380429,19.186586594395468,18.872911696088703,22.69458478192704,24.179243309837766,19.02704590141388,20.727110417823482,31.65395795498003,11.588396489675741,16.99502866484479,16.001457257540476,4.6172428407089345,20.63619332686824,21.29844250161635,19.926591058118877,12.404444071620356,21.2923035120049,13.07537685372781,6.479233375586875,20.264355348781624,19.98871872718152,21.844609031231133,5.000533771875572,23.26838695616244,14.833470405407489,19.38572039606365,30.05351424495379,17.493903309177767,0.5171840179268847,35.5335935858288,7.9029991565232445,30.71598211298427,12.859546933770737,15.241379659643382,12.393209232993136,18.807617810393356,23.203469422585833,15.138655517639446,19.521564295117535,29.230538138362817,12.784399445844961,20.946209139226937,27.87843767272345,16.867065236172195,22.85896154899579,15.348141274138847,23.11044738428618,8.529539654285136,11.391273636834919,19.82632585954245,13.60926074061026,5.758529531562844,19.042975467049505,7.20759324656451,6.525489285207745,6.806633861396646,6.105360806384109,29.670528260588938,22.957502231873512,4.091190856221212,30.29855540878607,13.875207217668066,14.200794837039028,8.906290078439804,7.074650408025553,29.438941606371245,12.842346008241437,13.570609061042806,11.470199337565234,14.354491373312948,14.96770669237757,16.153826144789747,4.166448277777714,31.30143338319224,19.892251013754404,19.4830962044418,16.03999439895223,15.491615463366932,28.078366456074107,11.933789330820817,18.672744760265974,1.0189621977747452,5.1987014844242045,19.829150794675016,8.386426903546633,13.292403967831051,15.378822575649501,8.405541120016505,24.273153829788555,14.489144535331686,12.469385978469928,5.211136259179968,9.887257028953815,5.797200413514861,17.956412749898792,12.508765558393803,16.437034760920042,11.019161635448537,4.1423030819319315,2.2385328455629603,19.630373979354104,17.617252090833247,4.870181897325542,20.957318645956736,17.46555475530974,27.935402008057928,12.140246111021881,12.741411081378992,24.22812099210375,28.254011390779446,3.620648720014761,6.286900090011742,6.246444583109322,2.951356586013654,14.995848332635244,22.202503012990007,13.42241634118945,12.048192045227067,22.816713124572274,33.450131795175814,20.002964402779316,7.375678336208391,21.370550341536052,16.21370227980684,9.767346736033712,20.209509890997936,15.210354860954087,23.217818759486313,3.6280981615670274,22.81765071561809,13.680912613689024,10.89265224562198,24.67039475862388,23.068662102165934,15.410180908251135,24.99337488922842,15.625035058860863,14.44977330299594,19.96771786064775,21.608981319476108,2.693436313783089,3.2671381783341786,9.662965997759347,10.967236297525044,4.509908722946816,27.298008001173866,19.6192569879919,6.581994316015377,20.584230746016352,8.33741998796048,15.759632010072295,15.016615041952601,9.039967552843414,9.323022702661866,7.7271131700339275,14.030866140474831,19.138641007625655,15.466058034231214,21.062531038142858,22.3804538061516,11.363532853626506,12.269186835854807,7.856040838268752,11.25954451913315,18.713880130361144,15.027927347051389,20.96012765491287,17.921050217065257,12.044365271960746,10.734745013784112,17.63341328141235,9.511993990914569,5.868742088608767,12.073038515620423,14.905556304108858,13.639450063698751,26.467674269467942,15.467475722467896,5.042694818504634,7.511500436155116,9.203392785882782,17.928239796676092,26.223521719116373,13.041779105380929,7.018508343456691,20.09838650040553,0.3549194268523274,22.48684671680163,14.33546318303204,16.81849837512105,25.32672217788688,16.5499382151647,20.790201239158016,24.531682906406864,16.3908743957853,17.580005043558494,22.983991895240052,16.82957885869022,3.5084126097341235,16.785501422522827,13.057361728520311,12.892538092067408,3.273523700843647,8.780345061821116,10.862668764571254,7.287746451054264,13.480231361177381,20.34335998160303,18.267075413855615,23.02555616631677,17.2621526199092,10.84401282749255,3.8920531843167314,21.847785948966894,6.205035589103742,18.275130261148373,22.41538120076806,11.891081469034503,19.060488270174588,23.59252465503321,8.363036119415165,4.124271217909833,11.094604626735038,18.552202636776617,17.72440670957264,25.276795041858342,9.530952135522798,16.42945938144806,4.555214431457423,20.676450573814314,7.344783053239682,11.379423908610109,35.64301815385794,27.682532903052817,21.650905257798925,13.166378852932425,24.37852832831816,3.9237796295746055,7.017025829212703,24.597710060369266,6.861509623924393,14.3530493602979,13.965174765447173,21.990401201647924,38.947056722241484,21.797136685479757,18.194609526024166,11.29311766201063,26.058110569486935,1.951709129527711,16.985757133606022,6.970343614580757,13.913205804309847,12.543667348628706,4.889299534493794,11.473343694452037,21.19023929488234,16.075656563388087,13.060144571944342,19.845965463841992,10.208241038870458,19.907144673483224,20.12789412923241,9.40301012133881,18.223574388841637,9.85924832557517,2.5901540845134874,20.013871055429217,21.95156518004216,9.859159245673236,17.238812477535696,15.932848614498141,9.249865943526078,8.733225350833578,10.66337274078849,19.917404999253947,12.915537531558428,32.88542562320612,8.671185668772953,14.812498048393241,22.26287980420944,3.615972769613609,18.102542898390166,9.93377755458264,9.204586784887969,21.822864471124323,17.22912274957846,5.520321485148248,19.693443095722024,23.1575971228084,11.567656584987459,6.993124990594693,1.2225066037122325,9.365504245557588,14.199194931795134,29.683635845639863,17.45553399453154,6.081805921476548,16.343890502536134,33.208393939310966,21.019049417688848,11.644462576874336,13.3825005430757,10.166732384622545,9.203163315904764,8.14039420002997,22.54005171274613,23.07072713691874,19.781143855137955,16.570202207904934,29.907699369965123,12.85171976547927,12.310277662678883,14.076178743769008,6.122642320808938,5.097200827708155,10.8841188728563,9.471072713703409,15.443565728962321,21.25446265514748,14.38217077044234,19.225330683955068,2.910670063698002,22.412612061296862,18.434529584131987,12.187450904474511,22.965977149723415,5.8957273439090665],"b":[18.85029848237484,18.287210949603843,35.335513829742276,11.049043460780911,14.99669555936514,6.041123141505054,14.46571584273468,21.297374678860557,19.099491513533643,9.214141531242003,18.19316720691574,29.45605586816977,21.30869361737087,29.381710624060787,6.255028507230795,25.82150312255012,26.963670052857267,18.273303168076993,19.660008314270822,16.780594290576847,16.63910528205821,10.442779662150912,34.223713600456094,7.086191312244048,28.95805532389237,18.680001768387427,31.344187480542193,16.941142057203713,17.792349858779353,7.074151754497011,31.57684999534002,26.08520580645787,25.300635901057646,25.654300448313258,22.426363855742366,17.852814377645053,7.856072987700968,29.455674478273885,12.289969008160234,14.049187385664572,26.28379490307248,21.031189811200566,13.914548193650166,26.736220619100795,21.700283935090113,30.468631528064535,27.49487265082216,16.880260075468463,26.48290172258558,23.218245299071498,9.755627944194497,8.63518020627354,8.355953170518834,20.882775932610073,18.16377007269518,12.518428705719403,16.80993235240313,30.645060365019603,23.15037941188169,24.678607010719595,6.173612939168307,23.88191916319007,30.259210561925524,12.177700163238786,20.597389757008393,27.591913200412666,30.534237005882787,29.83687086769816,19.60695937021281,23.2072530646293,20.776177735809533,35.695565538895,17.680498260706013,21.249784822383404,24.442710150655287,15.464912800012769,27.404376502623563,21.807474171666158,20.63318483164443,5.509823240059566,6.895634681962259,11.020719946889255,4.542291259346571,18.237387772141844,31.58938413671371,28.343343120476987,21.546328742627132,14.134393061159859,12.4494353397567,25.966315779283487,17.311835029610123,28.291987697480444,25.476947461727477,33.19060466685262,35.49773462805322,28.473994400868737,17.132853445592914,32.031051393730735,24.936203820416317,21.666306931015576,20.50503474391054,12.710950008100896,27.16742117702054,14.900808575625604,29.75524974613098,13.292278431319184,30.823577727869825,14.371755734920498,3.4974439037668414,21.484061863893643,18.069496958737012,14.45240958954443,15.656818081227456,24.094434200601622,26.53202774927901,7.028248646113386,6.734309062592216,27.379440463895932,11.141972340696483,28.52138032356439,16.36617161876318,25.24793546789024,29.84147142852379,11.245262324565171,10.18406452916592,25.877824741553653,11.754147692427711,34.89317294826087,13.21153857249306,16.80612297694625,16.30377935933422,22.14706093740383,9.423637054764399,9.876087340332136,27.876560474903222,13.012385848579854,34.28874446544767,27.91616556576033,17.976767618126203,29.784783931474035,37.51108185743604,15.263360534422436,3.391786471662672,29.070377561881973,11.692939250372635,15.271441971609194,33.831057511512014,20.837942002902015,22.723220340811103,23.321185486416965,18.048717121295333,26.577454036262193,9.245031302721078,30.24898821314885,26.089192892827953,26.279678711048597,24.102408338526846,24.516308213760407,32.02396049087556,22.810184982269856,20.879832570641305,19.07562885956141,24.7378983350698,15.694662610954015,17.2395738869205,25.547021428990764,18.111561935407707,17.071816348494714,12.895815097005254,29.415274029734498,14.117346019201076,18.601697992697623,16.700993718347192,5.943268093850702,36.980886790259824,29.72390142951989,25.399815594347942,27.764749716884552,22.917923083188192,24.53913772218759,16.069092195382044,9.05139178722941,24.060765198527182,8.153766211786394,14.700997339363976,16.23092783791121,20.092507170392594,23.45119054923823,31.24649196480842,28.304587006524706,8.877380268667006,15.841979703382187,14.047044116872712,22.48765215481108,31.967963993049104,13.457854741303219,14.40237075874757,32.86019146747732,33.51308375066786,34.14065593099268,6.183375944154812,17.642643343444224,20.475671293860252,25.086711288176403,17.510094663089024,8.48299066524353,17.17713316980849,4.724703547178057,21.134098902344608,28.163554195304616,2.013314245392608,16.964861387759417,15.096036231690679,19.059713338805118,30.051229677339133,25.281992411729618,20.494201594866418,32.31992260746086,18.175832859622982,37.99906824904191,22.86182705630442,15.163045117877065,21.710223875148085,31.63052619918337,36.10368303193172,30.57249740987666,25.497459722295133,21.374916398077275,28.608885741624164,18.878510623267886,13.087304691888312,3.8196852601584297,10.940166454357211,12.836073076129582,10.954797030193081,22.012809672740545,20.003823060558304,6.571979266476986,22.665533532376358,35.95837073248232,22.273117178293866,23.429761224448903,11.76741182599593,25.912053459403722,23.407026139767584,20.068799770976547,28.225090634111712,6.791812628394371,25.840114963580135,30.76856840196378,3.4066912980711006,16.986539527401213,14.431562862340886,16.116733090737757,15.186281168465369,17.851502394932048,30.473965037725254,20.885891138410987,26.91951140260397,30.46002908173981,26.00535769406723,9.666205832276265,29.239641674024877,5.848246599669769,24.974164976250638,15.465248282991366,7.613107628064419,17.579783434425863,17.02675821879191,25.658866121654214,36.27406938942181,18.45013463650394,30.25205830651099,25.237328415925415,27.554347629593885,19.037443133912944,4.995112852218173,32.74201184900518,11.429455458459863,10.300360947572686,8.774762418364425,33.09159024570661,24.292183744176846,23.243356524026282,13.887906376672507,13.824007432248859,17.350671099527535,14.119067424786362,14.315169018987577,14.107384993678313,16.57540609777314,34.670775472385294,27.066133614158872,22.995961488434403,3.3434592701605848,18.46290849218087,18.856937457452666,25.170205007993797,10.649742476597485,10.41979752420907,13.656475025587117,15.812326095731478,9.871541249514086,5.8864453546523965,23.74788786550565,11.659196537383966,18.96831470314871,10.194791851490855,21.01007553440503,13.265016775080255,25.69303887228708,8.854976044287834,16.35286219146936,26.589091294670453,26.129551270306408,30.766196626770302,22.428476008081777,4.803618625980985,25.16612250171513,17.803364953634684,14.42999192788112,29.19334741344204,14.841431924429248,17.713501597923027,13.227389232292719,22.875808595981066,21.9754518432319,39.11367053847237,29.22814624492954,16.63658983289547,17.62174818811813,29.65645890428074,19.822780289831016,32.79415706928516,38.33344663132449,22.858071847876563,27.709486808920776,18.37367342782401,10.71535025659498,18.873869230870515,31.947636013497902,31.989884784180425,30.75255077911744,32.037674153278616,4.85671295707141,28.7971531138735,11.548465000297888,27.564558886522804,19.055754365224423,21.228414933901043,10.41765733048007,11.818012896637281,16.51719934049701,13.232949208700155,7.088271115405602,27.081720476818436,17.50453797821625,33.92199132968832,6.0641269375059625,19.904402467084587,9.655568546080318,33.395944551184385,4.366632743015324,20.151098231242273,12.063548598917192,8.435127951752719,28.94520085280567,18.403335326176784,19.307355354410227,4.558577434742319,28.858861438267567,17.055964685644703,7.956773226099401,32.416935963259064,21.533670752168526,30.886362277816705,10.170861527121104,10.10456506866018,18.28929877869246,21.056235091698355,29.660128961631155,21.265546099775186,22.637349587004152,16.34934260887419,17.134547277063696,2.3629275505820457,18.165973443748243,18.489931250903055,31.198519217147684,16.348299967096764,15.055605033460001,12.200751265059857,17.287737166279577,18.035171072300116,34.52665754389663,16.328257877325058,18.310856843068542,15.245914025925341,17.46774301468092,17.683935556399067,15.382173822457927,30.243011059015714,8.887099153989086,9.772026316265855,11.958365721186054,29.414013049030665,37.22150988337364,32.06670013221951,22.182174891245815,15.287183080024274,9.33491682371313,15.077375881137588,13.652690782920146,17.18854711595783,29.99695382733621,11.787826281460774,18.320462698478202,17.49233404554476,19.383550995835087,4.82157866272745,21.07427832647167,12.752762228456177,20.493283645253534,10.01068107636052,20.390839574603827,15.54470757655567,22.093022780975282,30.54304168097444,32.39340787593862,26.471001022894143,15.815702246933524,22.702685800779268,20.757089144995163,11.8389950782711,22.462513083166158,12.710581855603053,29.09373118068642,31.99890563639206,31.862436734009126,5.868339840215846,38.643370865011995,9.129291438010902,12.842926592872974,9.626213749884233,14.76061487306974,32.91614618874012,17.90172587824663,29.671823439638665,36.05538559139521,26.887135277589337,22.60043999762354,5.448826110015945,22.931875956299994,16.987571842752146,6.123922062719678,19.26009440399971,29.52184034626099,22.32684643654513,17.939717179182153,10.760624029082265,32.77368253019022,37.201030872488516,32.61533058102697,11.364106821764736,24.25209686675205,11.102523651067315,21.81375797792314,33.86173848173625,31.073824984094447,19.48403068073706,22.841337907524395,29.352375940782654,31.36465432857871,14.493884853403092,27.712393401968427,11.512010138864447,28.549770628427265,13.625831524579311,19.693134534897027,18.45963436030591,19.13074074731307,13.242498052269687,20.20788436658099,19.30747661390456,4.561853490582921,27.61092123333949,17.96508015656908,23.496050910889757,23.452045539784265,9.92541562300186,15.656184633249012,4.090859332599925,30.299604332394825,20.4676637175561,1.9941358306201895,10.195461591280557,19.943805427713464,31.931965043910154,31.631372306310787,9.350008343816278,29.263686502054085,6.095203303904815,34.14615199022292,30.586709571962583,19.03600238303907,16.79655596687569,31.167041556654393,31.714497627929493,17.744443198895304,18.414139841271698,20.893464768643458,26.115638757427305,11.554837667013729,2.9378414187663626,18.873598429961838,26.08267093979788,22.464169595807963,26.382065177367558,26.45561252040479,20.454335114661497,16.89717642492547,33.32891878775622,23.21480755804834,7.851258992240768,11.228260394671619,17.44261645335051,33.11470246038354,13.931666754202617,9.861462670800334,32.293007529186355,13.535345810366426,3.535445516040121,19.778154820502113,21.979133914667585,10.061206326058723,25.392297507383482,32.70253961545548,17.707612010257986,20.260212166726063,30.356198001250178,22.735904532076795,14.934590402863837,23.98695181297521,23.533276945497704,29.07068348514231,24.269183987840705,38.66933220426289,23.917532211043397,31.498883487006157,23.165197869802714,8.364790217384988,22.67002136126903,19.884898500461393,13.728795646506624,11.283229983845683,31.077587227135005,12.856049480082007,25.93713939483089,16.58075716617094,4.671851998167944,32.64798799794922,34.42742190816614,8.287343920296202,10.044735564721726,22.4702857600515,16.837261075729568,17.438410078081386,15.352313675875582,27.188641506249084,22.20737741177145,23.436025941264397,4.722423186341276,12.800720013580346,23.70925556579889,23.32093600319918,18.91193815119406,8.185704200350514,32.67648154430297,24.226500253513137,28.207811440262887,32.01547217892869,12.723620176279583,33.655074904665966,27.339595718772078,17.406976564116583,26.344164580174535,20.14821006825664,18.679464395414247,32.06189214907822,27.88928110467831,5.864175496764523,20.165928424671243,13.86618994162745,15.661467721743167,14.244709510147931,12.156580751481485,21.43211757373026,7.618794953544619,33.09975681392069,17.980048476262112,23.407637937868078,36.4466785355618,1.3440946718833935,17.166128269667478,4.8726497528433255,3.7239278659439767,21.92231163931709,24.30867348654366,21.058889166849447,17.380519709883416,18.996939302333885,18.183600208893637,14.381033748701748,20.12980061736689,11.38124911814898,20.741633819354483,23.04029610733734,5.5471220183585235,20.622480309629452,11.126934022998078,6.803055432149381,12.47639407130826,22.530911367474232,26.539344325246912,22.80351130308981,30.791823499425412,17.82656762278264,19.357749168842282,21.70833820605525,1.7265678572163434,23.260704630620644,24.439887842741314,13.09063846889735,30.555436878101425,18.996679353895406,9.678451284128776,20.57551436774344,30.598342373533704,11.454673821113467,5.176195662460525,20.138969647597605,16.619070918984036,19.090217282492123,28.127960813383712,27.017473006874088,20.25467356182998,3.9992467593346914,9.924121755323835,30.476850227861153,26.18151823349194,24.03999495063233,24.49908061917439,20.083400635186663,35.57308727453185,19.390092018861694,20.669995476210982,24.21696603315023,27.586202085473914,26.664797528640438,17.726157771202885,13.288075214532853,24.790461249943657,26.549885971283686,32.31419843671581,12.641219364579856,16.2127892894028,13.4329194977003,20.62838946454344,27.357360139279834,21.559165732177508,7.514870005504473,24.12573210795495,11.513518529195487,19.923557492164292,19.108115894058777,25.747131497151745,31.380033838130178,30.727387684752586,22.78248307083837,33.91719100561603,11.974446548880152,21.572675747090326,16.334019883320142,6.322286542494124,24.643890219502754,26.3410721667342,22.92581275438323,25.464585322264394,28.21854112124213,13.827926888751207,12.909960361168924,21.15591824106099,22.953604049831064,27.308177431601813,6.942003177420726,25.06888509021566,14.900603162441698,19.412298969424985,30.06411986410461,18.61671550416045,12.025847114974887,36.44921733866252,9.596009499774425,35.52512563113369,18.584285533108286,15.372556010750582,21.260312961100098,27.473701376205828,36.892556209281466,22.843737902373434,21.758553579611004,31.66674788636805,15.114337588748398,27.883663481886135,32.193607716988794,19.741254128768325,25.669876364169113,16.075847380370366,27.37894408015349,10.11065971244629,12.860471303112591,35.99444476052928,21.815253619282,12.841473831619815,29.271498251143207,10.76879956383133,6.690672561642912,17.976017770830413,6.51162420543097,31.758555558184757,23.56730688855383,15.697613721347405,30.604385898719215,18.660423941964098,15.868727262669573,15.518474094614403,7.91767781425829,31.728562002663462,12.95742836894657,17.60822959325347,12.275259321074508,14.403865440749502,14.9682439598699,16.348125878769697,7.583344746242613,37.362654876885045,32.737661635282734,20.465277247231285,22.271512119868962,15.826876498831504,30.606241870380803,17.230207536017517,19.002068650036172,2.2134351698950683,6.670946531542374,21.622311337670176,12.100040105393926,25.369745287683187,17.180522139515872,13.291969139621408,26.329617125878684,21.788491549414392,15.227696961894441,9.429573009198467,10.831467707826075,7.781447465400548,20.411047873912466,12.9935968512105,18.145541810032157,12.206474823257865,7.461907977140174,2.7071824321002147,19.662392693484616,21.6595045337399,20.87374058769522,21.965357663049996,21.00380810666448,28.78781056234187,24.389410066392596,17.98169690345589,29.303603139750486,28.539888505445884,22.268846499601093,13.169642491562094,21.027962583491195,7.210015165503818,29.45457883156276,23.594654041919988,16.032442489500024,16.48934648938375,29.584748248657306,34.21697167321136,20.457632364716236,12.337846106402237,32.49548873232311,16.520343737763675,15.911868762245827,39.33456337244942,18.136759912079953,25.286384593152878,6.800400795927963,23.542386171680253,18.99283461624059,14.329944129881858,35.51618679468189,23.081000261306347,18.956998814687125,37.63889400546567,19.06780361246216,16.125194882377038,22.91086187234784,24.208447286535968,4.466688821263136,7.302387062071318,12.981829188454004,20.810332590395348,13.004414265893107,32.16524192016861,24.270339719856928,8.969746101269237,22.19577251233048,9.138946664515824,17.049138353742784,30.314021304721003,18.427311869609333,17.68596641413798,8.640130379447868,22.72436914248779,20.485812674405956,18.04180032592572,25.57544538599025,33.44632200366607,14.992138466718973,12.285934726255014,15.944721361058743,13.654849221107638,22.88514580611321,22.870649408273962,35.66135505296762,19.276272526420755,23.445852112375274,22.825919730614352,31.518468079937783,15.65308609206819,8.210377151941186,12.120168114379613,21.68486698657508,14.94251036734986,27.501857568791067,16.85192452471072,14.294356310716868,8.015523886487141,16.583129609109225,31.50563884780029,26.24895088414289,20.875712346324267,7.840243564925107,22.35969904391363,0.6447540025511778,28.508103912381678,27.39970180041321,19.640497748738397,28.26872830179504,16.976122528624558,22.097563115225853,31.323013664110746,16.45325594868943,28.674357043919613,34.15081426460239,24.367925372169942,4.1308270773793065,18.099317963515205,14.54998406785708,14.024403692473925,3.525625877542913,12.580681505313214,10.907107661193374,9.9357067784742,18.341494266058387,29.365858361607373,35.11777658101928,30.211540354541544,23.50014734783168,11.61935339781364,7.343527056019816,29.04521640552751,11.139419298653912,23.68067314012441,25.471241635392904,12.59972086943077,24.522495463112012,31.198120164413453,9.559236837728303,4.548713711746943,13.709519265929279,20.784455361106772,18.14384522753079,27.570247263985713,9.987612777699287,28.117321907089533,4.608698144899277,25.102620549231624,11.338296824721148,17.054846477921444,36.1315412961985,28.137226930263427,31.142438965984717,15.395474741743701,28.898705396584326,4.252545387621156,9.556263023999986,32.077329511032545,24.823660898944663,17.78040904526156,20.444008354479678,22.95798129192875,39.294886674435055,25.23675538244484,19.636230535805034,14.726530248086243,33.96035237070133,3.7586991708010986,18.171409945180685,17.306209613787644,20.938192258427883,13.006438830224432,5.35781995906369,25.181071124499557,24.580116926618707,24.096491487724453,21.933278056827028,28.02321131475623,21.820226397165257,31.214951656589246,26.346127522807446,9.827361994891731,18.77436053741137,13.880497093528176,3.4886757159869974,33.70347165292635,25.772192762471164,10.577022385442532,17.811971905343242,25.743843572051304,19.766585713934024,9.404390915626886,18.26284558850378,25.12066151357736,23.64677034281934,34.69769843069555,10.697257366057599,17.35949989979749,26.06949090475766,6.038337651626278,18.895627851338272,19.378961410192677,26.214776773529483,22.952766908691423,27.699168754007324,7.7884364753850255,23.036425567425482,32.84876421675207,16.429947161041255,7.14558337192472,10.62957495291096,16.210445061589013,21.013957841635722,33.94967254577236,17.809601362762237,7.637777949839211,34.03225451938843,34.85828301940262,23.688352698834546,16.146017037987512,14.57794612403594,16.184259376311005,13.60234552781067,21.019038703642714,23.02916833713055,24.667887638287223,24.33692932368818,18.99581262035115,36.17385929360171,14.850491016560774,13.93294996020673,26.74348260234032,11.699214733774607,6.658080737528516,12.013528960442352,9.504947043998726,19.418815028412283,21.378600654910848,15.957043531667768,20.561261014594475,3.272951261373067,30.239769127785088,19.35907800158475,22.482055281520374,23.66456178596284,8.084692766212257],"a":[3.6324076580420694,2.8694150143952157,18.16106561652954,1.680741464209503,11.107585554270187,5.012343584967076,8.062782986546711,11.467670039916227,5.946510387639168,3.6745145733492324,12.733253835095226,18.140957109156922,3.706270359981043,14.897740449315906,2.6674599967747348,18.44296139687586,8.790663933757399,6.0358634214547235,2.035783197952603,16.534038309819547,1.1980587941700227,0.9000070965791052,14.282330606530792,6.897603221120896,17.01654626557388,10.474363373103461,14.041979037624586,1.6298131113263192,8.753082615260666,0.8437598036270488,13.536037834284116,15.687881082427086,6.322717873138046,7.654673835831707,17.772493988938727,14.877723983550428,4.3264458672514206,17.11374741462725,3.3080745478700058,12.21812598548814,14.904024629098952,2.8922301303915843,0.72055702175291,7.179064552469074,13.71482961728599,18.83871113028636,16.462511502224405,1.1809960312430068,13.825936384929719,4.277657082181769,9.182210177078062,0.359158997410427,5.138074671453201,12.095050985704239,8.344740912623209,0.4370518103885157,3.4538947156718525,15.899537375519849,7.873031364206238,11.66384353075621,1.4035111726473648,6.838872355710635,11.3086461330826,11.017927552545675,12.150198106244567,15.91982420352393,13.560718010132335,12.954630274400433,13.197791686093971,9.057199431025209,5.8660166795781965,18.63372158033205,11.959401004679515,19.137892276758937,7.690882440471745,2.7999406651717207,12.35373282575769,9.532218968239295,12.811618728618232,1.733355651005959,2.2285966760360676,2.9902769890418,3.05948595457612,12.244132027273968,16.7365393666287,13.399996209994832,16.57333453545124,4.773825114309109,11.49733590606508,14.264960077314903,1.9303698233731303,8.552387924656566,5.760211217452165,15.44921926247261,19.210610605677253,13.67298843300182,16.30911392179896,19.77056621593374,6.3790001884726655,8.368676300071872,1.4373217093358237,10.362174338114185,14.24350675115981,2.5957606162398816,14.644604822446045,6.183368625166206,12.623759480061212,3.258689506033967,1.7414509905033526,4.17532219203872,0.2450935892756112,14.409478928690573,11.151921974293542,4.449894267234167,14.095610374619302,4.139639312306671,6.698852732232274,11.550238549445847,6.046690175100906,18.001917434692338,10.345331340588615,16.307018157145823,18.382318140660992,7.4778114399900675,2.917978388891811,8.957792192397992,8.949033870242404,19.511193014483304,9.606555494557254,10.953063414138619,16.159110468861112,11.324336559340233,2.098600566438802,6.565744188191869,18.361156979386436,7.588293310417864,14.832954850776892,15.707746175810673,15.877124518537084,12.349611208674368,18.39163295929176,10.79571161551474,1.3781241854210435,14.248071663374343,10.286413035348382,14.174731036126538,17.415198496940295,14.40319944556499,11.276243628254523,19.712942735913828,15.538595353405196,16.113262810745987,8.15664527514258,13.947980319145472,16.646634349791768,9.431303120872915,10.29579467141656,9.811628412190622,16.7308955221486,6.739525113067875,9.270506513461125,1.0763746500386873,14.459578089379095,4.4383824575391095,0.10597315792976847,11.059067700322469,6.645195760723999,0.7812909866013173,11.39756012763501,14.09642467104812,12.046160721654289,14.455066085114353,5.577847015459354,1.361749372345682,17.48235053539601,13.20691746099913,13.6584946842392,17.44471762927729,13.354958207092826,13.076285526748741,4.643983956501545,4.621299311984455,15.472341360048091,7.803543253363081,5.671225483763904,8.527889734059833,10.293232659876551,4.171377448668232,17.445835657945,18.088076948506338,1.6505518134263708,8.810560626339496,0.5607268754696904,18.37974079511939,12.16172344482449,6.1590393429277634,9.477768886458588,14.912818697257464,19.751642814628447,15.412372207690549,1.1863879016528234,0.17209525180472252,14.759175490529412,9.989970320772631,8.12925617743186,8.212632977257549,2.0961360668294438,1.9711738901731346,17.118864165437113,15.816497451865978,1.056343319624613,1.3744272230209864,5.914689234949448,1.6541710438719903,19.00951249896194,7.837684782144647,10.738522189879438,17.82289484075809,8.31735293533464,19.59625376113273,19.21403993605031,8.98714706555523,14.503397916490632,12.675352517400782,16.689510573128523,12.543535886883399,18.53889081007074,16.987510636019614,17.922889556918484,0.4294815970406418,4.2946085888001395,1.9492579227926887,1.2904264425182044,11.180189925817077,9.501099392044816,14.359529234485695,2.3056966790233835,0.3737090254318298,7.46620429878047,17.06519592053841,15.705506064651185,18.904099954702783,3.9309409269608286,12.428870366662519,8.926939832910218,8.790863147581135,14.559558308826883,1.792828330424916,9.67003074870834,15.81961417945875,0.05766085087891781,13.723741845158624,11.556406629105167,2.010569445290642,6.77581183229818,10.404615307566774,11.316400896621719,13.580737227589657,13.018916890026784,11.239029137783557,18.64636266470688,0.32887312786498146,11.79951635109505,2.295697265771639,16.698581273699613,11.414577025423123,2.1105714063996928,11.181309532321126,2.902966470522519,10.55445212825715,19.261868985386428,2.3772906389336823,13.699323512249597,8.76615936448513,8.962685472240285,12.000978988674603,0.2889702484093215,17.40338958574413,2.023764845495508,4.858107635433364,3.7429606789762726,15.068415788926618,8.849813287293905,19.350715760845205,7.117428381319759,9.5642149728188,1.596702931704943,1.791287816523357,9.946841007518659,4.552568102217656,13.656299351864085,19.984619545247376,13.836757333985567,10.331700557572274,2.773776719823,4.794066568286133,10.92941402097055,13.61213855427819,5.060356525116978,9.986199574419864,9.000308923063072,5.143835317295391,7.6629535861964415,1.644575270592017,5.0413003065753115,10.2535048478337,1.589870369368005,3.0091153397636994,16.663031158996745,5.5459703611128575,19.897991925797932,3.7140082578283184,11.294545730459369,11.27251055672486,10.751008607341532,15.06548569867903,5.742246991196214,1.492170593408515,14.616519846853034,5.444366019856117,5.867703313911523,12.731291852690978,10.819429291712668,0.9222314674649601,2.031136576736512,7.605335867881129,6.35818554534783,19.17596730164474,10.656514013205932,11.996220077395767,10.837822214206781,16.693634744132744,4.104633989344406,15.084654960066306,18.927650014212727,15.799954466938345,17.458966124112955,12.989269008911762,6.132698166965351,13.59607875957253,18.06371668317205,17.337112885266958,16.189001804624972,17.26462751371272,3.2005827929035613,15.675618443429178,9.942602191068604,17.151043172103112,6.534204723983872,15.08833343883165,5.7490754121313925,0.7538338449597282,2.267898561752566,7.9074810601033985,3.363098841889962,16.19394853785458,9.043182782514808,14.671809944417959,0.6897031637549667,12.497205593346266,5.965889989683726,19.003078246522765,3.7155552670141345,14.931670489217463,8.796458703169993,2.806498130201991,15.496812435301393,17.03034525076213,10.124079936921596,2.142105209016756,16.429531147974895,11.639837182999546,2.128958756545307,12.576210966824956,9.703681086549185,16.33344070488761,0.08837338878882495,5.731651366869794,7.264688918081643,11.702418906261238,15.56557910329699,13.824314417188589,5.473868746919299,4.971608063749127,8.337730533554462,1.2713286992745632,4.192844806338547,3.769481380885926,12.550819511858503,10.93909304005865,7.551969199728901,3.8492872090285246,14.776276135840046,6.9820518851764435,19.296611357882103,4.27775845696301,9.50550477120732,2.73088023768413,14.658504887500285,14.446646880289595,3.7208177512061447,10.553779841095148,8.61453441014611,5.325131629193551,11.33055349647227,10.324390029439092,17.22802980710894,19.189143530885033,18.186948006847544,1.0648726375219164,4.075236943084342,3.183232777305185,1.4688021326033018,5.353357509386254,17.990784285107072,9.589048460894647,5.50865113936974,5.138396147991564,11.294859559342942,0.5791908952398162,4.821096452886207,6.76042646657399,17.5467185635531,1.5904425114834853,15.608818928152154,14.927644336024208,2.3175647722066772,11.158009587616625,17.84251846178353,11.263080188832868,1.323559061942552,13.017435917535813,14.635397578084604,1.6337664193255819,2.9171114784699803,10.814549369545542,12.547631997989782,17.16772456686133,13.457814823870017,2.1448905758103454,19.894700036862346,9.117197325212278,1.6385523484776288,2.4625165798883364,12.423717432647177,19.331800161765994,1.636524113103901,10.041805435935958,19.012900170614763,12.356622749535969,12.456339836550878,3.4699497999878215,14.059189094986873,0.17287538035184458,1.2568333034137913,11.291076332900097,18.41673981759302,9.343295619024762,16.883845930756124,4.885189467764159,19.95711420036095,17.9091959033371,14.895698135049704,7.94940882135013,7.792741535111669,10.907924056333078,13.485670658982528,18.245434418770895,16.802461173666018,10.05455864898023,4.089392862387142,19.630990405467962,15.640397790842666,7.731414056436541,12.742451736534797,11.00595391515608,9.1024583351753,11.842875754897477,10.768724152695706,7.15320467463441,2.4741543442478164,0.3342073339641516,7.019444719821624,4.273788582929132,3.360099755913466,16.023842143021092,12.26841830236831,18.893521235381982,7.271406306210215,6.959763262986982,7.868937844710215,0.6681977112957682,13.989285888039703,17.917546758608538,1.0526732099064295,5.065270532878827,11.783398223686694,14.480299207717522,17.10698725514176,5.0743237220119175,14.390472438142531,0.48894484624684154,17.066121682544328,10.874048931927373,10.184587477395004,3.621338897573785,11.672743417129766,14.785495391460387,8.851137091939997,17.069461730675034,11.474509795761652,16.905266729012727,10.355672686889763,1.3422756880116715,18.682129994126843,12.103286176142278,6.455159968774051,7.61917779533138,18.63634570543915,4.4005732266879205,16.74197550596883,17.591580573632868,4.219408382099732,1.271333663717531,6.458679324128331,3.6315592349729497,16.366098514816713,8.247674978571137,0.759741882031193,18.404125484063492,2.6003285092542017,1.7255553969076587,16.310984873735855,9.153616340508478,4.691450362686411,11.365996001118068,15.564579011799768,12.387220944557447,4.783500468110233,16.620764105565648,9.603672572151138,0.21915929407411827,8.151970727009692,11.864248288064662,18.676059980998083,18.573484889857866,19.718070917349518,13.261364469841524,16.482441227717537,5.282778851322174,4.3050945653205375,7.262407575108432,2.0706493449558883,5.868148803925539,11.131616545222913,18.572369290951354,1.6234920116067242,8.87228587296958,16.177992244542168,4.335639810876852,17.480086831582675,15.336918910990708,5.667506695273987,3.5790095594562477,6.315069110093372,5.43913335368043,14.251564607053457,1.083413268518174,14.867291027424127,19.865134483463617,11.376432331394138,0.7667084773640731,12.446599471264461,8.461803283723217,15.611681305471281,3.6571634181172685,1.7527674786754854,14.168501287765793,13.701990987997842,15.65129981375347,18.956138960576972,2.969553969039156,17.765311525776468,15.885685092359342,17.27034554981454,16.505270184653288,10.813876592115985,15.398093502540778,14.223482386659615,10.078307925979892,1.8619178052209717,17.049074729253274,6.610681475849578,0.6805410826944236,11.533250745529028,10.973706494882233,5.579576259084722,4.340991962689689,18.351267128536115,14.858024816584239,14.774550015594908,17.203670545969292,0.30466323412157603,2.6167856360312003,4.1449038244710845,1.8451479649706748,6.980193842072691,13.7650784267875,16.72143677074263,13.398651176609917,17.769860584850758,6.1077814863392454,5.220336807199422,18.871493652181627,11.04716788877225,15.59616093362079,11.16285325042378,4.645737552002829,5.142691035554909,1.493823947864552,1.6489946881010864,8.346282386153852,2.9507001433587154,12.958332997174713,11.859389587358397,13.581409934573806,16.82473539135725,4.7082943042157765,6.059458991382245,0.8361175902996676,10.964215990958284,14.012148140796953,2.3043801678392706,13.119844848044714,11.285885683299313,6.03418284826728,3.647896101280712,11.605673618266641,4.9429664085948355,0.6843922767178956,13.27232848709456,12.93860314200951,17.66812221062162,9.955886075803747,18.88688571339032,2.3858299981722597,1.0552067007280863,7.522879663769255,13.109224261310484,18.432326874947833,5.897941078992193,12.996544865447387,15.934477428229412,19.76810133521648,17.427823273648624,6.094822385813843,17.250398649254734,16.369496267832048,19.1867716143144,5.065406175458214,9.447616054367716,15.162004208522362,6.960525453024937,16.18600225667668,3.5289649364148,8.364567641911073,8.749118732953175,16.31176300703084,16.22052448381179,1.8780931491324582,1.0912610805649248,7.441346165276941,1.630269024189026,1.4205324585574663,14.384011430287394,13.86091970375864,19.330380231279065,12.758411169942011,10.701121581128783,16.67560064115563,11.26258038758639,16.088186011920588,15.957193815682045,3.8813332602278594,13.379290878060104,17.91093148790481,15.993232397735305,12.404147412547847,17.270248220614455,9.127912130368102,0.5349101619533281,16.95194889148098,19.137331830776752,17.386194010694553,4.544263190110005,13.621050754030044,3.8997443864342207,19.2611499972123,15.792671057258536,16.932913082425188,0.49882941877047227,17.270660181404615,3.7101476550435653,19.073138025898455,6.704274211875489,15.05585247080996,10.974935284621331,15.705158703073923,18.57958386037606,8.735661892717381,19.28504215073554,12.505846901945654,4.965966993341353,16.461403029998674,17.75628794315064,6.466283961746275,5.989688830644639,12.759191116598743,9.593812065639359,6.290071145848826,10.505520054816891,19.471842155593233,13.42390493639856,4.156368785505005,15.41765194851398,5.643277122483155,6.405900062687717,4.177776866397309,2.5311178315718497,18.630410062748958,13.327789742398824,3.7021116442511737,19.761310887591232,6.356340018782394,8.643648890917373,8.480398763591639,3.12101795965003,17.598488148296504,12.810282905015065,12.939014416978164,9.785266379830935,14.31401934343219,13.543858858095401,4.612856838629447,0.0076568876918781115,18.18171021513014,16.81907805498707,0.6608524142165306,4.928605151949337,15.428042499144002,13.567879628913424,10.577339860073028,13.455637707853363,0.7183252041347732,1.2842584284340308,18.728015071695623,2.180149451171083,7.029971599072216,14.524878945328421,1.5113560434466722,12.463083416196078,10.910585223799405,12.07289239164917,2.8556661530397243,9.165882742874153,5.677452188279264,10.505447683263075,9.75834950905583,12.38097553055539,10.91153647172671,0.6479101320692937,0.2922196558864476,13.002322143494283,14.12189394116571,1.5996102079131669,19.608952988867287,8.386389695202269,15.800568828852457,9.290530321491568,7.545770480023046,17.197863656197544,18.02092682671807,2.8291924205110464,5.552707904603538,5.669863433559916,1.4807610024121542,13.8047385938521,19.38051731250461,6.998371940297812,7.699243796159312,14.864750447182615,17.449720968172983,13.406938901950557,5.195273512595859,13.922937764430866,16.11718658930656,9.521411329829448,19.495322149554205,14.216950016640295,17.144540365088744,0.4349602591084123,14.98141765294763,0.23123743626364046,10.238239180923614,16.98856222749948,4.176737114855111,13.840315368379521,19.706067362408074,2.740920507491036,9.227094699624313,7.33095339160907,14.370573620822329,0.23407137874188244,3.2324579831613987,6.068248151341096,3.4281895542046392,2.766882950081442,16.48625656382015,15.036440111934933,1.422148381086883,18.321576192255126,6.65322021000982,15.007611398738444,11.672184029220123,6.6255448193944355,6.277843121954634,3.481771187934428,10.637928176503273,18.726464436287763,10.286415997654315,17.24227034923143,17.945913082238512,1.5057756392544652,4.085839927571495,4.1501759194724785,8.182148941927135,10.20224932520859,10.872601808922546,19.005993834277692,17.048563818195063,10.870553865171146,7.0896452943084665,16.518432859032544,1.860874703610027,0.22098527402002688,12.018946700430767,9.471798840201,4.967234819435777,16.29620128449034,11.192356124280348,4.003779298159866,7.381516665343573,7.483952023176368,17.51002125340396,7.8880401476142525,11.143543453272432,5.893751180866049,12.213450931234835,0.24625311661159,9.153598138053223,8.501245779538964,14.682418167461723,11.163135745605132,8.488237566382413,14.7906224798579,17.949350861670375,5.975774228184445,15.752886642299933,18.710371617555047,5.153117093538699,1.619423021870392,8.405678440437807,1.937426334751482,10.996997776134965,2.9893758126436154,8.481802804515217,9.745424045217677,6.88592477797715,10.994958014588715,17.4483287198873,16.797906649087654,18.926229069884716,17.16570725577986,6.828702992386009,2.189675418435053,9.750535141136591,2.5524537117133628,17.51290853045148,19.512619070197257,5.722752191182372,6.031700341721908,11.727102767148265,4.578161705742936,1.7352328033269027,9.65163995984462,17.360440709053616,17.27941602316534,12.385289013010938,8.986847488772835,12.726950161952125,4.316592175335567,9.907249522390313,3.46101579549122,2.810596076098806,19.603280040111358,12.99066528000024,12.12167571005756,4.069257064817049,16.311171627126786,1.0746190045680004,5.172983554523953,18.853004688859805,5.913960729295469,12.728355792111557,11.046115517985609,9.522485433816197,19.594289300461796,6.269873721507837,4.2534639632853555,3.222053763859174,16.673209481095537,1.8087460068874783,16.324681440429547,0.1912025833507247,6.523075786711723,8.532076074756931,3.9409019583525495,10.267269015493273,19.836757190028834,13.609566213443575,3.1430724240581176,18.15533678248141,3.759201208040208,13.797730065838817,11.48164710630768,6.713529464765382,0.28267073711889523,5.420838542251198,1.4245571909098276,15.604530936721467,17.394450111060344,5.828179413680337,14.355421542837465,10.976390812492687,2.920672643378981,8.168137484267666,9.14231763903814,19.21181712654176,11.092458914339494,18.695662947725907,8.249222934356645,14.284340537526695,15.322257688952078,0.41812771857130837,18.097173969186567,5.272089939966249,6.672653385264771,19.744312333442746,8.852773223236895,3.6124993052362697,11.968251635947013,16.556230842668707,9.298680721088925,6.922401703840038,1.012395178880059,3.336996008364781,11.719199812671812,19.774469107381055,16.765032954848408,4.412863019705595,14.102424120835435,18.858484429070618,14.461720797513543,0.8553156827749264,5.268140143398639,9.519649497695145,0.417789321505313,6.9308186868172905,19.20208460622797,13.43666330012832,17.10260838827714,10.958781763790256,17.66502031252784,11.955338282543435,9.777971376537366,12.090684532712594,4.750470958896975,4.115496934110099,9.724217600138516,9.15585762445113,14.855090831953133,17.4031733213539,5.897991598744952,13.478729001401808,2.419402174851979,18.26505493347821,17.569330065371922,9.768121264326064,12.085304343384106,4.595470974857512]}

},{}],47:[function(require,module,exports){
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

	pdf = factory( 0.0, 1.0, 0.5 );
	y = pdf( NaN );
	t.equal( isnan( y ), true, 'returns NaN' );

	pdf = factory( NaN, 1.0, 0.5 );
	y = pdf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	pdf = factory( 0.0, NaN, 0.5 );
	y = pdf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	pdf = factory( NaN, NaN, 0.5 );
	y = pdf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	pdf = factory( 0.0, NaN, NaN );
	y = pdf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = pdf( NaN );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = pdf( NaN );
	t.equal( isnan( y ), true, 'returns NaN' );

	pdf = factory( NaN, 1.0, NaN );
	y = pdf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = pdf( NaN );
	t.equal( isnan( y ), true, 'returns NaN' );

	pdf = factory( NaN, NaN, 0.5 );
	y = pdf( NaN );
	t.equal( isnan( y ), true, 'returns NaN' );

	pdf = factory( NaN, NaN, NaN );

	y = pdf( NaN );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'if provided valid parameters, the function returns a function which returns `0` when provided a number larger than `b` for `x`', function test( t ) {
	var pdf;
	var y;

	pdf = factory( -10.0, 10.0, 0.0 );
	y = pdf( PINF );
	t.equal( y, 0.0, 'returns 0' );

	y = pdf( 20.0 );
	t.equal( y, 0.0, 'returns 0' );

	y = pdf( 11.0 );
	t.equal( y, 0.0, 'returns 0' );

	t.end();
});

tape( 'if provided valid parameters, the function returns a function which returns `0` when provided a number smaller than `a` for `x`', function test( t ) {
	var pdf;
	var y;

	pdf = factory( -10.0, 10.0, 0.0 );
	y = pdf( NINF );
	t.equal( y, 0.0, 'returns 0' );

	y = pdf( -100.0 );
	t.equal( y, 0.0, 'returns 0' );

	y = pdf( -11.0 );
	t.equal( y, 0.0, 'returns 0' );

	t.end();
});

tape( 'if provided parameters not satisfying `a <= c <= b`, the created function always returns `NaN`', function test( t ) {
	var pdf;
	var y;

	pdf = factory( 0.0, -1.0, 0.5 );

	y = pdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = pdf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	pdf = factory( 0.0, NINF, 0.5 );
	y = pdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	pdf = factory( PINF, NINF, 0.0 );
	y = pdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	pdf = factory( 0.0, 10.0, 20.0 );
	y = pdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	pdf = factory( 0.0, 10.0, -10.0 );
	y = pdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'if provided valid parameters, the created function returns `2/(b-a)` in case `x = c`', function test( t ) {
	var pdf;
	var a;
	var b;
	var c;

	a = 0.0;
	b = 2.0;
	c = 1.5;
	pdf = factory( a, b, c );
	t.equal( pdf( c ), 2/(b-a), 'returns 2/(b-a)' );
	t.end();
});

tape( 'the created function evaluates the pdf for `x` given small range `b - a`', function test( t ) {
	var expected;
	var delta;
	var pdf;
	var tol;
	var a;
	var b;
	var c;
	var i;
	var x;
	var y;

	expected = smallRange.expected;
	x = smallRange.x;
	a = smallRange.a;
	b = smallRange.b;
	c = smallRange.c;
	for ( i = 0; i < x.length; i++ ) {
		pdf = factory( a[i], b[i], c[i] );
		y = pdf( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', a: '+a[i]+', b: '+b[i]+', c: '+c[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 1.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. a: '+a[i]+'. b: '+b[i]+'. c: '+c[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
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
	var c;
	var i;
	var x;
	var y;

	expected = mediumRange.expected;
	x = mediumRange.x;
	a = mediumRange.a;
	b = mediumRange.b;
	c = mediumRange.c;
	for ( i = 0; i < x.length; i++ ) {
		pdf = factory( a[i], b[i], c[i] );
		y = pdf( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', a: '+a[i]+', b: '+b[i]+', c: '+c[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 1.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. a: '+a[i]+'. b: '+b[i]+'. c: '+c[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
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
	var c;
	var i;
	var x;
	var y;

	expected = largeRange.expected;
	x = largeRange.x;
	a = largeRange.a;
	b = largeRange.b;
	c = largeRange.c;
	for ( i = 0; i < x.length; i++ ) {
		pdf = factory( a[i], b[i], c[i] );
		y = pdf( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', a: '+a[i]+', b: '+b[i]+', c: '+c[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 1.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. a: '+a[i]+'. b: '+b[i]+'. c: '+c[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

}).call(this)}).call(this,"/lib/node_modules/@stdlib/stats/base/dists/triangular/pdf/test/test.factory.js")
},{"./../lib/factory.js":41,"./fixtures/julia/large_range.json":44,"./fixtures/julia/medium_range.json":45,"./fixtures/julia/small_range.json":46,"@stdlib/constants/float64/eps":27,"@stdlib/constants/float64/ninf":28,"@stdlib/constants/float64/pinf":29,"@stdlib/math/base/assert/is-nan":30,"@stdlib/math/base/special/abs":32,"tape":225}],48:[function(require,module,exports){
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

}).call(this)}).call(this,"/lib/node_modules/@stdlib/stats/base/dists/triangular/pdf/test/test.js")
},{"./../lib":42,"tape":225}],49:[function(require,module,exports){
(function (__filename,__dirname){(function (){
/**
* @license Apache-2.0
*
* Copyright (c) 2025 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var abs = require( '@stdlib/math/base/special/abs' );
var PINF = require( '@stdlib/constants/float64/pinf' );
var NINF = require( '@stdlib/constants/float64/ninf' );
var EPS = require( '@stdlib/constants/float64/eps' );
var tryRequire = require( '@stdlib/utils/try-require' );


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
	var y = pdf( NaN, 0.0, 1.0, 0.5 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = pdf( 0.0, NaN, 1.0, 0.5 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = pdf( 0.0, 1.0, NaN, 0.5 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = pdf( 0.0, 0.0, 1.0, NaN );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'if provided a number greater than `b` for `x` and valid parameters, the function returns `0`', opts, function test( t ) {
	var y = pdf( PINF, 0.0, 1.0, 0.5 );
	t.equal( y, 0.0, 'returns 0' );

	y = pdf( 20.0, 0.0, 1.0, 0.5 );
	t.equal( y, 0.0, 'returns 0' );

	y = pdf( 2.0, 0.0, 1.0, 0.5 );
	t.equal( y, 0.0, 'returns 0' );

	y = pdf( 1.1, 0.0, 1.0, 0.5 );
	t.equal( y, 0.0, 'returns 0' );

	t.end();
});

tape( 'if provided a number smaller than `a` for `x` and valid parameters, the function returns `0`', opts, function test( t ) {
	var y = pdf( NINF, 0.0, 1.0, 0.5 );
	t.equal( y, 0.0, 'returns 0' );

	y = pdf( -20.0, 0.0, 1.0, 0.5 );
	t.equal( y, 0.0, 'returns 0' );

	y = pdf( -2.0, 0.0, 1.0, 0.5 );
	t.equal( y, 0.0, 'returns 0' );

	y = pdf( -0.5, 0.0, 1.0, 0.5 );
	t.equal( y, 0.0, 'returns 0' );

	t.end();
});

tape( 'if provided parameters not satisfying `a <= c <= b`, the function returns `NaN`', opts, function test( t ) {
	var y;

	y = pdf( 2.0, 3.0, 2.0, 2.5 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = pdf( 0.0, 2.0, 3.0, 4.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = pdf( 2.0, 2.0, 3.0, 1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = pdf( 2.0, PINF, NINF, 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'the function returns `2/(b-a)` if provided `x = c`', opts, function test( t ) {
	var a = 0.0;
	var b = 2.0;
	var c = 1.5;
	t.equal( pdf( c, a, b, c ), 2/(b-a), 'returns 2/(b-a)' );
	t.end();
});

tape( 'the function evaluates the pdf for `x` given a small range `b - a`', opts, function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var a;
	var b;
	var c;
	var y;
	var i;

	expected = smallRange.expected;
	x = smallRange.x;
	a = smallRange.a;
	b = smallRange.b;
	c = smallRange.c;
	for ( i = 0; i < x.length; i++ ) {
		y = pdf( x[i], a[i], b[i], c[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', a: '+a[i]+', b: '+b[i]+', c: '+c[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 1.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. a: '+a[i]+'. b: '+b[i]+'. c: '+c[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
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
	var c;
	var y;
	var i;

	expected = mediumRange.expected;
	x = mediumRange.x;
	a = mediumRange.a;
	b = mediumRange.b;
	c = mediumRange.c;
	for ( i = 0; i < x.length; i++ ) {
		y = pdf( x[i], a[i], b[i], c[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', a: '+a[i]+', b: '+b[i]+', c: '+c[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 1.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. a: '+a[i]+'. b: '+b[i]+'. c: '+c[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
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
	var c;
	var y;
	var i;

	expected = largeRange.expected;
	x = largeRange.x;
	a = largeRange.a;
	b = largeRange.b;
	c = largeRange.c;
	for ( i = 0; i < x.length; i++ ) {
		y = pdf( x[i], a[i], b[i], c[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', a: '+a[i]+', b: '+b[i]+', c: '+c[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 1.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. a: '+a[i]+'. b: '+b[i]+'. c: '+c[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

}).call(this)}).call(this,"/lib/node_modules/@stdlib/stats/base/dists/triangular/pdf/test/test.native.js","/lib/node_modules/@stdlib/stats/base/dists/triangular/pdf/test")
},{"./fixtures/julia/large_range.json":44,"./fixtures/julia/medium_range.json":45,"./fixtures/julia/small_range.json":46,"@stdlib/constants/float64/eps":27,"@stdlib/constants/float64/ninf":28,"@stdlib/constants/float64/pinf":29,"@stdlib/math/base/assert/is-nan":30,"@stdlib/math/base/special/abs":32,"@stdlib/utils/try-require":93,"path":107,"tape":225}],50:[function(require,module,exports){
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
	var y = pdf( NaN, 0.0, 1.0, 0.5 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = pdf( 0.0, NaN, 1.0, 0.5 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = pdf( 0.0, 1.0, NaN, 0.5 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = pdf( 0.0, 0.0, 1.0, NaN );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'if provided a number greater than `b` for `x` and valid parameters, the function returns `0`', function test( t ) {
	var y = pdf( PINF, 0.0, 1.0, 0.5 );
	t.equal( y, 0.0, 'returns 0' );

	y = pdf( 20.0, 0.0, 1.0, 0.5 );
	t.equal( y, 0.0, 'returns 0' );

	y = pdf( 2.0, 0.0, 1.0, 0.5 );
	t.equal( y, 0.0, 'returns 0' );

	y = pdf( 1.1, 0.0, 1.0, 0.5 );
	t.equal( y, 0.0, 'returns 0' );

	t.end();
});

tape( 'if provided a number smaller than `a` for `x` and valid parameters, the function returns `0`', function test( t ) {
	var y = pdf( NINF, 0.0, 1.0, 0.5 );
	t.equal( y, 0.0, 'returns 0' );

	y = pdf( -20.0, 0.0, 1.0, 0.5 );
	t.equal( y, 0.0, 'returns 0' );

	y = pdf( -2.0, 0.0, 1.0, 0.5 );
	t.equal( y, 0.0, 'returns 0' );

	y = pdf( -0.5, 0.0, 1.0, 0.5 );
	t.equal( y, 0.0, 'returns 0' );

	t.end();
});

tape( 'if provided parameters not satisfying `a <= c <= b`, the function returns `NaN`', function test( t ) {
	var y;

	y = pdf( 2.0, 3.0, 2.0, 2.5 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = pdf( 0.0, 2.0, 3.0, 4.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = pdf( 2.0, 2.0, 3.0, 1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = pdf( 2.0, PINF, NINF, 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'the function returns `2/(b-a)` if provided `x = c`', function test( t ) {
	var a = 0.0;
	var b = 2.0;
	var c = 1.5;
	t.equal( pdf( c, a, b, c ), 2/(b-a), 'returns 2/(b-a)' );
	t.end();
});

tape( 'the function evaluates the pdf for `x` given a small range `b - a`', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var a;
	var b;
	var c;
	var y;
	var i;

	expected = smallRange.expected;
	x = smallRange.x;
	a = smallRange.a;
	b = smallRange.b;
	c = smallRange.c;
	for ( i = 0; i < x.length; i++ ) {
		y = pdf( x[i], a[i], b[i], c[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', a: '+a[i]+', b: '+b[i]+', c: '+c[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 1.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. a: '+a[i]+'. b: '+b[i]+'. c: '+c[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
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
	var c;
	var y;
	var i;

	expected = mediumRange.expected;
	x = mediumRange.x;
	a = mediumRange.a;
	b = mediumRange.b;
	c = mediumRange.c;
	for ( i = 0; i < x.length; i++ ) {
		y = pdf( x[i], a[i], b[i], c[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', a: '+a[i]+', b: '+b[i]+', c: '+c[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 1.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. a: '+a[i]+'. b: '+b[i]+'. c: '+c[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
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
	var c;
	var y;
	var i;

	expected = largeRange.expected;
	x = largeRange.x;
	a = largeRange.a;
	b = largeRange.b;
	c = largeRange.c;
	for ( i = 0; i < x.length; i++ ) {
		y = pdf( x[i], a[i], b[i], c[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', a: '+a[i]+', b: '+b[i]+', c: '+c[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 1.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. a: '+a[i]+'. b: '+b[i]+'. c: '+c[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

}).call(this)}).call(this,"/lib/node_modules/@stdlib/stats/base/dists/triangular/pdf/test/test.pdf.js")
},{"./../lib":42,"./fixtures/julia/large_range.json":44,"./fixtures/julia/medium_range.json":45,"./fixtures/julia/small_range.json":46,"@stdlib/constants/float64/eps":27,"@stdlib/constants/float64/ninf":28,"@stdlib/constants/float64/pinf":29,"@stdlib/math/base/assert/is-nan":30,"@stdlib/math/base/special/abs":32,"tape":225}],51:[function(require,module,exports){
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

},{"./is_number.js":54}],52:[function(require,module,exports){
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

},{"./is_number.js":54,"./zero_pad.js":58}],53:[function(require,module,exports){
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

},{"./main.js":56}],54:[function(require,module,exports){
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

},{}],55:[function(require,module,exports){
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

},{}],56:[function(require,module,exports){
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

},{"./format_double.js":51,"./format_integer.js":52,"./is_string.js":55,"./space_pad.js":57,"./zero_pad.js":58}],57:[function(require,module,exports){
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

},{"./main.js":60}],60:[function(require,module,exports){
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

},{"./main.js":63}],62:[function(require,module,exports){
arguments[4][55][0].apply(exports,arguments)
},{"dup":55}],63:[function(require,module,exports){
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

},{"./is_string.js":62,"@stdlib/string/base/format-interpolate":53,"@stdlib/string/base/format-tokenize":59}],64:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

// MAIN //

var Sym = ( typeof Symbol === 'function' ) ? Symbol : void 0; // eslint-disable-line stdlib/require-globals


// EXPORTS //

module.exports = Sym;

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

},{"./main.js":67}],67:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"@stdlib/assert/is-buffer":15,"@stdlib/regexp/function-name":38,"@stdlib/utils/native-class":88}],70:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"@stdlib/utils/define-property":75}],72:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],73:[function(require,module,exports){
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

},{}],74:[function(require,module,exports){
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

},{"./define_property.js":73}],75:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./builtin.js":72,"./has_define_property_support.js":74,"./polyfill.js":76}],76:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
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

},{"@stdlib/string/format":61}],77:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./native.js":80,"./polyfill.js":81,"@stdlib/assert/is-function":19}],78:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./detect.js":77,"@stdlib/object/ctor":36}],80:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./proto.js":82,"@stdlib/utils/native-class":88}],82:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],83:[function(require,module,exports){
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

},{"./codegen.js":84,"./global_this.js":85,"./self.js":86,"./window.js":87,"@stdlib/assert/is-boolean":9,"@stdlib/string/format":61}],84:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],85:[function(require,module,exports){
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

},{}],86:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],87:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],88:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./main.js":89,"./polyfill.js":90,"@stdlib/assert/has-tostringtag-support":5}],89:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./tostring.js":91}],90:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./tostring.js":91,"./tostringtag.js":92,"@stdlib/assert/has-own-property":1}],91:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],92:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"@stdlib/symbol/ctor":64}],93:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"@stdlib/assert/is-error":17}],95:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./fixtures/nodelist.js":96,"./fixtures/re.js":97,"./fixtures/typedarray.js":98}],96:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"@stdlib/utils/global":83}],97:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],98:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],99:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./check.js":95,"./main.js":100,"./polyfill.js":101}],100:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"@stdlib/utils/constructor-name":68}],101:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"@stdlib/utils/constructor-name":68}],102:[function(require,module,exports){
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

},{}],103:[function(require,module,exports){

},{}],104:[function(require,module,exports){
arguments[4][103][0].apply(exports,arguments)
},{"dup":103}],105:[function(require,module,exports){
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
},{"base64-js":102,"buffer":105,"ieee754":208}],106:[function(require,module,exports){
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

},{}],107:[function(require,module,exports){
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
},{"_process":215}],108:[function(require,module,exports){
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

},{"events":106,"inherits":209,"readable-stream/lib/_stream_duplex.js":110,"readable-stream/lib/_stream_passthrough.js":111,"readable-stream/lib/_stream_readable.js":112,"readable-stream/lib/_stream_transform.js":113,"readable-stream/lib/_stream_writable.js":114,"readable-stream/lib/internal/streams/end-of-stream.js":118,"readable-stream/lib/internal/streams/pipeline.js":120}],109:[function(require,module,exports){
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

},{}],110:[function(require,module,exports){
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
},{"./_stream_readable":112,"./_stream_writable":114,"_process":215,"inherits":209}],111:[function(require,module,exports){
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
},{"./_stream_transform":113,"inherits":209}],112:[function(require,module,exports){
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
},{"../errors":109,"./_stream_duplex":110,"./internal/streams/async_iterator":115,"./internal/streams/buffer_list":116,"./internal/streams/destroy":117,"./internal/streams/from":119,"./internal/streams/state":121,"./internal/streams/stream":122,"_process":215,"buffer":105,"events":106,"inherits":209,"string_decoder/":224,"util":103}],113:[function(require,module,exports){
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
},{"../errors":109,"./_stream_duplex":110,"inherits":209}],114:[function(require,module,exports){
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
},{"../errors":109,"./_stream_duplex":110,"./internal/streams/destroy":117,"./internal/streams/state":121,"./internal/streams/stream":122,"_process":215,"buffer":105,"inherits":209,"util-deprecate":233}],115:[function(require,module,exports){
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
},{"./end-of-stream":118,"_process":215}],116:[function(require,module,exports){
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
},{"buffer":105,"util":103}],117:[function(require,module,exports){
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
},{"_process":215}],118:[function(require,module,exports){
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
},{"../../../errors":109}],119:[function(require,module,exports){
module.exports = function () {
  throw new Error('Readable.from is not available in the browser')
};

},{}],120:[function(require,module,exports){
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
},{"../../../errors":109,"./end-of-stream":118}],121:[function(require,module,exports){
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
},{"../../../errors":109}],122:[function(require,module,exports){
module.exports = require('events').EventEmitter;

},{"events":106}],123:[function(require,module,exports){
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

},{"./":124,"get-intrinsic":199}],124:[function(require,module,exports){
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

},{"es-define-property":184,"es-errors/type":190,"function-bind":198,"get-intrinsic":199,"set-function-length":219}],125:[function(require,module,exports){
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

},{"./lib/is_arguments.js":126,"./lib/keys.js":127}],126:[function(require,module,exports){
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

},{}],127:[function(require,module,exports){
exports = module.exports = typeof Object.keys === 'function'
  ? Object.keys : shim;

exports.shim = shim;
function shim (obj) {
  var keys = [];
  for (var key in obj) keys.push(key);
  return keys;
}

},{}],128:[function(require,module,exports){
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

},{"es-define-property":184,"es-errors/syntax":189,"es-errors/type":190,"gopd":200}],129:[function(require,module,exports){
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

},{"define-data-property":128,"has-property-descriptors":201,"object-keys":213}],130:[function(require,module,exports){
module.exports = function () {
    for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] !== undefined) return arguments[i];
    }
};

},{}],131:[function(require,module,exports){
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

},{"./ToNumber":162,"./ToPrimitive":164,"./Type":169}],132:[function(require,module,exports){
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

},{"../helpers/isFinite":177,"../helpers/isNaN":178,"../helpers/isPrefixOf":179,"./ToNumber":162,"./ToPrimitive":164,"es-errors/type":190,"get-intrinsic":199}],133:[function(require,module,exports){
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

},{"call-bind/callBound":123,"es-errors/type":190}],134:[function(require,module,exports){
'use strict';

var RequireObjectCoercible = require('es-object-atoms/RequireObjectCoercible');

// http://262.ecma-international.org/5.1/#sec-9.10

module.exports = function CheckObjectCoercible(value) {
	return RequireObjectCoercible(value, arguments.length > 1 ? arguments[1] : void undefined);
};

},{"es-object-atoms/RequireObjectCoercible":192}],135:[function(require,module,exports){
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

},{"./DayWithinYear":138,"./InLeapYear":142,"./MonthFromTime":152,"es-errors/eval":185}],136:[function(require,module,exports){
'use strict';

var floor = require('./floor');

var msPerDay = require('../helpers/timeConstants').msPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.2

module.exports = function Day(t) {
	return floor(t / msPerDay);
};

},{"../helpers/timeConstants":183,"./floor":173}],137:[function(require,module,exports){
'use strict';

var floor = require('./floor');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

module.exports = function DayFromYear(y) {
	return (365 * (y - 1970)) + floor((y - 1969) / 4) - floor((y - 1901) / 100) + floor((y - 1601) / 400);
};


},{"./floor":173}],138:[function(require,module,exports){
'use strict';

var Day = require('./Day');
var DayFromYear = require('./DayFromYear');
var YearFromTime = require('./YearFromTime');

// https://262.ecma-international.org/5.1/#sec-15.9.1.4

module.exports = function DayWithinYear(t) {
	return Day(t) - DayFromYear(YearFromTime(t));
};

},{"./Day":136,"./DayFromYear":137,"./YearFromTime":171}],139:[function(require,module,exports){
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

},{"./modulo":174}],140:[function(require,module,exports){
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

},{"../helpers/records/property-descriptor":181,"./IsAccessorDescriptor":143,"./IsDataDescriptor":145,"es-errors/type":190}],141:[function(require,module,exports){
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

},{"../helpers/timeConstants":183,"./floor":173,"./modulo":174}],142:[function(require,module,exports){
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

},{"./DaysInYear":139,"./YearFromTime":171,"es-errors/eval":185}],143:[function(require,module,exports){
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

},{"../helpers/records/property-descriptor":181,"es-errors/type":190,"hasown":207}],144:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.11

module.exports = require('is-callable');

},{"is-callable":210}],145:[function(require,module,exports){
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

},{"../helpers/records/property-descriptor":181,"es-errors/type":190,"hasown":207}],146:[function(require,module,exports){
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

},{"./IsAccessorDescriptor":143,"./IsDataDescriptor":145,"./IsPropertyDescriptor":147,"es-errors/type":190}],147:[function(require,module,exports){
'use strict';

// TODO, semver-major: delete this

var isPropertyDescriptor = require('../helpers/records/property-descriptor');

// https://262.ecma-international.org/6.0/#sec-property-descriptor-specification-type

module.exports = function IsPropertyDescriptor(Desc) {
	return isPropertyDescriptor(Desc);
};

},{"../helpers/records/property-descriptor":181}],148:[function(require,module,exports){
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

},{"../helpers/isFinite":177,"../helpers/timeConstants":183}],149:[function(require,module,exports){
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

},{"../helpers/isFinite":177,"./DateFromTime":135,"./Day":136,"./MonthFromTime":152,"./ToInteger":161,"./YearFromTime":171,"./floor":173,"./modulo":174,"get-intrinsic":199}],150:[function(require,module,exports){
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

},{"../helpers/isFinite":177,"../helpers/timeConstants":183,"./ToInteger":161}],151:[function(require,module,exports){
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

},{"../helpers/timeConstants":183,"./floor":173,"./modulo":174}],152:[function(require,module,exports){
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

},{"./DayWithinYear":138,"./InLeapYear":142}],153:[function(require,module,exports){
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

},{"../helpers/isNaN":178}],154:[function(require,module,exports){
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

},{"../helpers/timeConstants":183,"./floor":173,"./modulo":174}],155:[function(require,module,exports){
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

},{"./Type":169}],156:[function(require,module,exports){
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


},{"../helpers/isFinite":177,"./ToNumber":162,"./abs":172,"get-intrinsic":199}],157:[function(require,module,exports){
'use strict';

var msPerDay = require('../helpers/timeConstants').msPerDay;

var DayFromYear = require('./DayFromYear');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

module.exports = function TimeFromYear(y) {
	return msPerDay * DayFromYear(y);
};

},{"../helpers/timeConstants":183,"./DayFromYear":137}],158:[function(require,module,exports){
'use strict';

var modulo = require('./modulo');

var msPerDay = require('../helpers/timeConstants').msPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.2

module.exports = function TimeWithinDay(t) {
	return modulo(t, msPerDay);
};


},{"../helpers/timeConstants":183,"./modulo":174}],159:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.2

module.exports = function ToBoolean(value) { return !!value; };

},{}],160:[function(require,module,exports){
'use strict';

var ToNumber = require('./ToNumber');

// http://262.ecma-international.org/5.1/#sec-9.5

module.exports = function ToInt32(x) {
	return ToNumber(x) >> 0;
};

},{"./ToNumber":162}],161:[function(require,module,exports){
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

},{"../helpers/isFinite":177,"../helpers/isNaN":178,"../helpers/sign":182,"./ToNumber":162,"./abs":172,"./floor":173}],162:[function(require,module,exports){
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

},{"./ToPrimitive":164,"call-bind/callBound":123,"safe-regex-test":218}],163:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.9

module.exports = require('es-object-atoms/ToObject');

},{"es-object-atoms/ToObject":193}],164:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.1

module.exports = require('es-to-primitive/es5');

},{"es-to-primitive/es5":195}],165:[function(require,module,exports){
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

},{"./IsCallable":144,"./ToBoolean":159,"./Type":169,"es-errors/type":190,"hasown":207}],166:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $String = GetIntrinsic('%String%');

// http://262.ecma-international.org/5.1/#sec-9.8

module.exports = function ToString(value) {
	return $String(value);
};


},{"get-intrinsic":199}],167:[function(require,module,exports){
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

},{"../helpers/isFinite":177,"../helpers/isNaN":178,"../helpers/sign":182,"./ToNumber":162,"./abs":172,"./floor":173,"./modulo":174}],168:[function(require,module,exports){
'use strict';

var ToNumber = require('./ToNumber');

// http://262.ecma-international.org/5.1/#sec-9.6

module.exports = function ToUint32(x) {
	return ToNumber(x) >>> 0;
};

},{"./ToNumber":162}],169:[function(require,module,exports){
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

},{}],170:[function(require,module,exports){
'use strict';

var Day = require('./Day');
var modulo = require('./modulo');

// https://262.ecma-international.org/5.1/#sec-15.9.1.6

module.exports = function WeekDay(t) {
	return modulo(Day(t) + 4, 7);
};

},{"./Day":136,"./modulo":174}],171:[function(require,module,exports){
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

},{"call-bind/callBound":123,"get-intrinsic":199}],172:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $abs = GetIntrinsic('%Math.abs%');

// http://262.ecma-international.org/5.1/#sec-5.2

module.exports = function abs(x) {
	return $abs(x);
};

},{"get-intrinsic":199}],173:[function(require,module,exports){
'use strict';

// var modulo = require('./modulo');
var $floor = Math.floor;

// http://262.ecma-international.org/5.1/#sec-5.2

module.exports = function floor(x) {
	// return x - modulo(x, 1);
	return $floor(x);
};

},{}],174:[function(require,module,exports){
'use strict';

var mod = require('../helpers/mod');

// https://262.ecma-international.org/5.1/#sec-5.2

module.exports = function modulo(x, y) {
	return mod(x, y);
};

},{"../helpers/mod":180}],175:[function(require,module,exports){
'use strict';

var modulo = require('./modulo');

var msPerSecond = require('../helpers/timeConstants').msPerSecond;

// https://262.ecma-international.org/5.1/#sec-15.9.1.10

module.exports = function msFromTime(t) {
	return modulo(t, msPerSecond);
};

},{"../helpers/timeConstants":183,"./modulo":174}],176:[function(require,module,exports){
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

},{"./5/AbstractEqualityComparison":131,"./5/AbstractRelationalComparison":132,"./5/Canonicalize":133,"./5/CheckObjectCoercible":134,"./5/DateFromTime":135,"./5/Day":136,"./5/DayFromYear":137,"./5/DayWithinYear":138,"./5/DaysInYear":139,"./5/FromPropertyDescriptor":140,"./5/HourFromTime":141,"./5/InLeapYear":142,"./5/IsAccessorDescriptor":143,"./5/IsCallable":144,"./5/IsDataDescriptor":145,"./5/IsGenericDescriptor":146,"./5/IsPropertyDescriptor":147,"./5/MakeDate":148,"./5/MakeDay":149,"./5/MakeTime":150,"./5/MinFromTime":151,"./5/MonthFromTime":152,"./5/SameValue":153,"./5/SecFromTime":154,"./5/StrictEqualityComparison":155,"./5/TimeClip":156,"./5/TimeFromYear":157,"./5/TimeWithinDay":158,"./5/ToBoolean":159,"./5/ToInt32":160,"./5/ToInteger":161,"./5/ToNumber":162,"./5/ToObject":163,"./5/ToPrimitive":164,"./5/ToPropertyDescriptor":165,"./5/ToString":166,"./5/ToUint16":167,"./5/ToUint32":168,"./5/Type":169,"./5/WeekDay":170,"./5/YearFromTime":171,"./5/abs":172,"./5/floor":173,"./5/modulo":174,"./5/msFromTime":175}],177:[function(require,module,exports){
'use strict';

var $isNaN = require('./isNaN');

module.exports = function (x) { return (typeof x === 'number' || typeof x === 'bigint') && !$isNaN(x) && x !== Infinity && x !== -Infinity; };

},{"./isNaN":178}],178:[function(require,module,exports){
'use strict';

module.exports = Number.isNaN || function isNaN(a) {
	return a !== a;
};

},{}],179:[function(require,module,exports){
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

},{"call-bind/callBound":123}],180:[function(require,module,exports){
'use strict';

var $floor = Math.floor;

module.exports = function mod(number, modulo) {
	var remain = number % modulo;
	return $floor(remain >= 0 ? remain : remain + modulo);
};

},{}],181:[function(require,module,exports){
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

},{"es-errors/type":190,"hasown":207}],182:[function(require,module,exports){
'use strict';

module.exports = function sign(number) {
	return number >= 0 ? 1 : -1;
};

},{}],183:[function(require,module,exports){
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

},{}],184:[function(require,module,exports){
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

},{"get-intrinsic":199}],185:[function(require,module,exports){
'use strict';

/** @type {import('./eval')} */
module.exports = EvalError;

},{}],186:[function(require,module,exports){
'use strict';

/** @type {import('.')} */
module.exports = Error;

},{}],187:[function(require,module,exports){
'use strict';

/** @type {import('./range')} */
module.exports = RangeError;

},{}],188:[function(require,module,exports){
'use strict';

/** @type {import('./ref')} */
module.exports = ReferenceError;

},{}],189:[function(require,module,exports){
'use strict';

/** @type {import('./syntax')} */
module.exports = SyntaxError;

},{}],190:[function(require,module,exports){
'use strict';

/** @type {import('./type')} */
module.exports = TypeError;

},{}],191:[function(require,module,exports){
'use strict';

/** @type {import('./uri')} */
module.exports = URIError;

},{}],192:[function(require,module,exports){
'use strict';

var $TypeError = require('es-errors/type');

/** @type {import('./RequireObjectCoercible')} */
module.exports = function RequireObjectCoercible(value) {
	if (value == null) {
		throw new $TypeError((arguments.length > 0 && arguments[1]) || ('Cannot call method on ' + value));
	}
	return value;
};

},{"es-errors/type":190}],193:[function(require,module,exports){
'use strict';

var $Object = require('./');
var RequireObjectCoercible = require('./RequireObjectCoercible');

/** @type {import('./ToObject')} */
module.exports = function ToObject(value) {
	RequireObjectCoercible(value);
	return $Object(value);
};

},{"./":194,"./RequireObjectCoercible":192}],194:[function(require,module,exports){
'use strict';

/** @type {import('.')} */
module.exports = Object;

},{}],195:[function(require,module,exports){
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

},{"./helpers/isPrimitive":196,"is-callable":210}],196:[function(require,module,exports){
'use strict';

module.exports = function isPrimitive(value) {
	return value === null || (typeof value !== 'function' && typeof value !== 'object');
};

},{}],197:[function(require,module,exports){
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

},{}],198:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

module.exports = Function.prototype.bind || implementation;

},{"./implementation":197}],199:[function(require,module,exports){
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

},{"es-errors":186,"es-errors/eval":185,"es-errors/range":187,"es-errors/ref":188,"es-errors/syntax":189,"es-errors/type":190,"es-errors/uri":191,"function-bind":198,"has-proto":202,"has-symbols":203,"hasown":207}],200:[function(require,module,exports){
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

},{"get-intrinsic":199}],201:[function(require,module,exports){
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

},{"es-define-property":184}],202:[function(require,module,exports){
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

},{}],203:[function(require,module,exports){
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

},{"./shams":204}],204:[function(require,module,exports){
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

},{}],205:[function(require,module,exports){
'use strict';

var hasSymbols = require('has-symbols/shams');

/** @type {import('.')} */
module.exports = function hasToStringTagShams() {
	return hasSymbols() && !!Symbol.toStringTag;
};

},{"has-symbols/shams":204}],206:[function(require,module,exports){
'use strict';

var bind = require('function-bind');

module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);

},{"function-bind":198}],207:[function(require,module,exports){
'use strict';

var call = Function.prototype.call;
var $hasOwn = Object.prototype.hasOwnProperty;
var bind = require('function-bind');

/** @type {import('.')} */
module.exports = bind.call(call, $hasOwn);

},{"function-bind":198}],208:[function(require,module,exports){
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

},{}],209:[function(require,module,exports){
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

},{}],210:[function(require,module,exports){
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

},{}],211:[function(require,module,exports){
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

},{"call-bind/callBound":123,"has-tostringtag/shams":205}],212:[function(require,module,exports){
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

},{"./isArguments":214}],213:[function(require,module,exports){
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

},{"./implementation":212,"./isArguments":214}],214:[function(require,module,exports){
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

},{}],215:[function(require,module,exports){
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

},{}],216:[function(require,module,exports){
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
},{"_process":215,"through":231,"timers":232}],217:[function(require,module,exports){
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

},{"buffer":105}],218:[function(require,module,exports){
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

},{"call-bind/callBound":123,"es-errors/type":190,"is-regex":211}],219:[function(require,module,exports){
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

},{"define-data-property":128,"es-errors/type":190,"get-intrinsic":199,"gopd":200,"has-property-descriptors":201}],220:[function(require,module,exports){
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

},{"es-abstract/es5":176,"function-bind":198}],221:[function(require,module,exports){
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

},{"./implementation":220,"./polyfill":222,"./shim":223,"define-properties":129,"function-bind":198}],222:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

var zeroWidthSpace = '\u200b';

module.exports = function getPolyfill() {
	if (String.prototype.trim && zeroWidthSpace.trim() === zeroWidthSpace) {
		return String.prototype.trim;
	}
	return implementation;
};

},{"./implementation":220}],223:[function(require,module,exports){
'use strict';

var define = require('define-properties');
var getPolyfill = require('./polyfill');

module.exports = function shimStringTrim() {
	var polyfill = getPolyfill();
	define(String.prototype, { trim: polyfill }, { trim: function () { return String.prototype.trim !== polyfill; } });
	return polyfill;
};

},{"./polyfill":222,"define-properties":129}],224:[function(require,module,exports){
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
},{"safe-buffer":217}],225:[function(require,module,exports){
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
},{"./lib/default_stream":226,"./lib/results":228,"./lib/test":229,"_process":215,"defined":130,"through":231,"timers":232}],226:[function(require,module,exports){
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
},{"_process":215,"fs":104,"through":231}],227:[function(require,module,exports){
(function (process,setImmediate){(function (){
module.exports = typeof setImmediate !== 'undefined'
    ? setImmediate
    : process.nextTick
;

}).call(this)}).call(this,require('_process'),require("timers").setImmediate)
},{"_process":215,"timers":232}],228:[function(require,module,exports){
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
},{"_process":215,"events":106,"function-bind":198,"has":206,"inherits":209,"object-inspect":230,"resumer":216,"through":231,"timers":232}],229:[function(require,module,exports){
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
},{"./next_tick":227,"deep-equal":125,"defined":130,"events":106,"has":206,"inherits":209,"path":107,"string.prototype.trim":221}],230:[function(require,module,exports){
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

},{}],231:[function(require,module,exports){
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
},{"_process":215,"stream":108}],232:[function(require,module,exports){
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
},{"process/browser.js":215,"timers":232}],233:[function(require,module,exports){
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
},{}]},{},[47,48,49,50]);
