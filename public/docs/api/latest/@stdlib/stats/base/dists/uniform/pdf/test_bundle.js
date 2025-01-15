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
* Returns a function for evaluating the probability density function (PDF) for a uniform distribution with minimum support `a` and maximum support `b`.
*
* @param {number} a - minimum support
* @param {number} b - maximum support
* @returns {Function} PDF
*
* @example
* var pdf = factory( 0.0, 10.0 );
* var y = pdf( 2.0 );
* // returns 0.1
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
	* Evaluates the probability density function (PDF) for a uniform distribution.
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
		return 1.0 / ( b - a );
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
* Uniform distribution probability density function (PDF).
*
* @module @stdlib/stats/base/dists/uniform/pdf
*
* @example
* var pdf = require( '@stdlib/stats/base/dists/uniform/pdf' );
*
* var y = pdf( 3.0, 2.0, 6.0 );
* // returns 0.25
*
* var myPDF = pdf.factory( 6.0, 7.0 );
* y = myPDF( 7.0 );
* // returns 1.0
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
* Evaluates the probability density function (PDF) for a uniform distribution with minimum support `a` and maximum support `b` at a value `x`.
*
* @param {number} x - input value
* @param {number} a - minimum support
* @param {number} b - maximum support
* @returns {number} evaluated PDF
*
* @example
* var y = pdf( 2.0, 0.0, 4.0 );
* // returns 0.25
*
* @example
* var y = pdf( 5.0, 0.0, 4.0 );
* // returns 0.0
*
* @example
* var y = pdf( 0.25, 0.0, 1.0 );
* // returns 1.0
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
	return 1.0 / ( b - a );
}


// EXPORTS //

module.exports = pdf;

},{"@stdlib/math/base/assert/is-nan":30}],44:[function(require,module,exports){
module.exports={"expected":[0.0,0.019243661310942822,0.0,0.013585569580991035,0.022990842071037507,0.02200457831852108,0.0,0.019646742144125325,0.018443873530176114,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.012768805962994092,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.01882386157272506,0.01976649479104993,0.0,0.0,0.0,0.0,0.0,0.015093237796129085,0.0,0.0,0.0,0.012969110592268776,0.04521106527675124,0.0,0.0,0.0,0.0,0.0,0.0,0.030723339586258634,0.017908175494752224,0.0,0.0,0.022155465077804352,0.0,0.0,0.014764985634476068,0.016124213807791703,0.0,0.0,0.0,0.034655311913088516,0.013414429529319618,0.0,0.0,0.0,0.040496909883012855,0.0,0.0,0.0,0.0,0.0,0.016705295891356598,0.01551325443922304,0.0,0.0,0.0,0.0,0.0,0.05014586117799403,0.013838187421231657,0.0,0.0,0.0,0.0,0.016063867106562605,0.0,0.0,0.02296981168867847,0.0,0.0,0.014688580544142713,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.07083931965569538,0.017717241660606002,0.0,0.021550900628558963,0.0,0.020442709372882773,0.0630350699662667,0.13039407187917976,0.11826866296467427,0.014779257691115755,0.02876601968130833,0.025938868338283256,0.049131709532094434,0.0,0.08590545248639864,0.013153763228963744,0.022015086577070363,0.0,0.021248976876476894,0.015351728220960386,0.012587450549337064,0.0,0.04575893231583837,0.036194484401875414,0.11079067710352437,0.01921685983011464,0.0,0.01277994635551881,0.0,0.0,0.015571774294794017,0.0,0.0,0.0,0.0,0.04589115934841013,0.0,0.0,0.0,0.015551609923101329,0.01393408004399876,0.015927169178871728,0.0,0.0,0.0,0.0,0.0,0.015496489870880556,0.01439466076696503,0.0,0.0,0.0,0.0,0.017148315604570717,0.0,0.0,0.08066813321195429,0.0,0.0,0.0,0.0,0.0,0.013865998969513722,0.0,0.013055496691135022,0.0,0.0,0.04575835482119627,0.016177432717271744,0.02187059018766902,0.03735174556708544,0.0246105573623732,0.0,0.0,0.016209366498220606,0.0,0.0,0.012575276610757316,0.01379628056076405,0.0,0.014482677155113621,0.04167995753894269,0.0,0.013691083493073242,0.014280109659066526,0.021132262230910876,0.013499593900645484,0.0,0.0,0.0,0.0,0.045992088157189644,0.0128211742507302,0.016888016568664375,0.020504342810094882,0.0,0.0,0.017761807570811947,0.0148992610501276,0.0,0.0,0.015147208400203567,0.0450506270876412,0.0,0.12463578482827008,0.018507798717098185,0.0,0.0,0.0,0.0,0.0,0.014686796404834748,0.0,0.023834683517537335,0.0,0.08067866858899835,0.0,0.0,0.014042731180860355,0.014794697112858012,0.0,0.0,0.0,0.0,0.025580253349206414,0.0,0.0,0.017580499279508187,0.0,0.019365209482669603,0.0,0.0,0.0,0.0,0.0,0.01802891263030956,0.0,0.0,0.0,0.0,0.0,0.013440550383399958,0.0,0.013994935177440432,0.0,0.19512428981756028,0.0,0.01733590668584661,0.016779871106691567,0.0,0.023182738071824256,0.0162734569639874,0.014340138707564952,0.0,0.0,0.0,0.0,0.0,0.0,0.013514667215006462,0.0,0.07065683567705498,0.0,0.0,0.0,0.0,0.017134447112556933,0.0,0.0,0.03247288406541819,0.013714019180440016,0.13132864729933696,0.023253849184811413,0.0,0.01916775053424152,0.0,0.017133043272072424,0.03394644556591584,0.0,0.0,0.013274421607584243,0.013231796760546225,0.04452460156278018,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.01534244773889146,0.0,0.05316522531808957,0.0,0.014054224643316897,0.0,0.0,0.0,0.021038769810245845,0.0,0.0,0.01523375475828269,0.0,0.0,0.0,0.013889489360377361,0.01313461178699884,0.037745267482654575,0.0,0.018605587813614374,0.0,0.019225043866110784,0.0,0.015314841281039432,0.0,0.0,0.016609115247441585,0.013041403112407368,0.0347691925332905,0.041600992725518246,0.0,0.014353853265322979,0.0,0.028939125958454198,0.015871840103483296,0.013108362652355689,0.0,0.0,0.0,0.041554126638679814,0.017977514986068227,0.0,0.03721680138324936,0.0,0.0,0.013650361642358812,0.0,0.0,0.0,0.0,0.013670769201835048,0.030468049998906,0.0,0.0,0.0,0.0,0.0,0.03562181453578371,0.0,0.0,0.0,0.021517208209083042,0.014659417690619196,0.02801780590582473,0.0,0.012509370930106218,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.017338092278185918,0.0,0.013906568090007348,0.0,0.04622874138148826,0.0,0.0,0.0,0.012799246669977463,0.0,0.0,0.02059646825982627,0.0,0.04650786645890687,0.0277901080320935,0.014391113820865161,0.01798570088272771,0.0,0.0,0.018127705647981232,0.015084660833157964,0.0,0.014643885702726072,0.0160997804988728,0.0,0.0,0.0,0.013265030432898478,0.016131902908986008,0.0,0.0,0.08230667471203233,0.01613313508596809,0.042205113480400167,0.0,0.0,0.0,0.0,0.10131265173904953,0.0,0.0,0.045273631146057314,0.0,0.014658557809345362,0.0,0.015552163085449468,0.0,0.0,0.0,0.0,0.0,0.01934490606317722,0.022325708444231204,0.01759142159475018,0.0,0.025452495925190395,0.0,0.017885150540201476,0.0,0.035089360920440085,0.0,0.0,0.0,0.0,0.0,0.05550961767903687,0.0,0.0,0.0,0.0,0.02746670182689705,0.015309927570796723,0.0,0.0,0.023178199422869934,0.0,0.0,0.0,0.0,0.0,0.0,0.031753025888536755,0.0380904092104048,0.0,0.0,0.0,0.0,0.0,0.0,0.053958044440337374,0.0,0.0,0.0,0.012808531692093856,0.0,0.0,0.1097411636392088,0.01428774142855074,0.019811212154223285,0.0,0.0,0.023584009974676138,0.0,0.01490969149138793,0.0,0.0,0.0,0.030787391935786994,0.021278313320731275,0.0,0.0,0.015704017681487006,0.0,0.0,0.017705714796529794,0.012551853606344435,0.015291040599017367,0.0,0.0,0.0,0.017907902781167835,0.0,0.016429324955962117,0.02319848529766239,0.026612813050151955,0.014360388985785606,0.0,0.0,0.012966526057189426,0.0,0.0,0.0,0.0,0.0,0.0,0.01663748338645661,0.015640740491208407,0.0,0.035334296207378914,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.02622491954334257,0.020167447646656716,0.0,0.018986219673364394,0.0,0.02520307986575554,0.0,0.0,0.016605008615780105,0.01743684461990876,0.0,0.0,0.04932644809531106,0.013378230302212872,0.012871399752348708,0.0,0.026976279415796195,0.0,0.0,0.0,0.0,0.0,0.019029789195797717,0.0,0.018896778927519262,0.020684483152775445,0.0,0.01496956412239535,0.0,0.0,0.02365217482266395,0.017430224989560757,0.0,0.0,0.04461402500659533,0.029650050625245755,0.0194766296380267,0.0,0.0,0.014678929628504967,0.0,0.02047429248720138,0.016821939764173614,0.0,0.030953017334626135,0.08614141449289085,0.0,0.033002892315635454,0.0,0.0,0.0,0.014695082811148697,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.03059827244457325,0.01952510432784918,0.0,0.0,0.015276942349552756,0.041430550787715424,0.017172298774074245,0.0,0.02053070777291205,0.0,0.056070669626616464,0.06956095620465666,0.0,0.0,0.0,0.0,0.014751199106092421,0.0,0.0,0.021586133931321097,0.0,0.0,0.0,0.0,0.0,0.029512128676305194,0.0,0.0,0.019540582473652635,0.0,0.05158772554669036,0.013413938570750988,0.0,0.0,0.0,0.0,0.02300988089681791,0.0,0.0,0.0,0.0,0.016713850632404704,0.0,0.015967441040466344,0.014513885183033006,0.02546799257436774,0.0,0.017053032312112224,0.013481360559688203,0.0,0.0,0.0,0.0,0.02023454710368975,0.01518832509771068,0.0,0.013612237998709633,0.027391799929502893,0.02539314458304531,0.0,0.0,0.0,0.02147961583860542,0.012923841179943881,0.0,0.0,0.0,0.022157815431944956,0.0,0.01748468023912156,0.0,0.0,0.01468256936487728,0.01926224323415065,0.0,0.018753726608974824,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.022717201330614795,0.0,0.0,0.019161662019614643,0.0,0.03408464978722004,0.038697942224509355,0.0,0.0,0.02607421174542007,0.016196073045523875,0.044149438852102,0.0,0.01621657204832033,0.0,0.0,0.014978236604261765,0.0,0.0,0.0,0.0,0.016798445055808964,0.013608012845779999,0.014748893787377017,0.0,0.02595073543175214,0.0,0.0,0.0,0.043170841087312825,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.026667014265458824,0.022583989618160504,0.0,0.0,0.026163393950620308,0.0,0.017460146499166905,0.0,0.0,0.0,0.0,0.018701759048717938,0.01459928437650726,0.012762312180927216,0.0,0.0,0.0,0.014174029188062097,0.04534316024994708,0.0,0.0,0.0,0.0,0.0,0.02350040153020136,0.01918137561681954,0.018286501785871663,0.013522063105123171,0.013281200338045938,0.0,0.0,0.018552914922247064,0.013033506434164455,0.013204858421393044,0.0,0.02327027202461142,0.014108353865421325,0.023173150621173543,0.0,0.01796743237215333,0.01717458769280798,0.03168787515868316,0.0,0.0,0.026539048695883683,0.0,0.0,0.027390455675393936,0.0,0.019662193980512534,0.01944449631239942,0.0,0.03084579697588894,0.01398166605909081,0.022361918036258192,0.017795937757493052,0.016488207021012852,0.0,0.0,0.0,0.04512131537217641,0.0,0.0,0.0,0.0,0.02101824425310533,0.024807961559292144,0.028540860281072652,0.0,0.0,0.0,0.024929296111068363,0.02427574714060484,0.0,0.0,0.0,0.012805798608608135,0.0,0.014856382790538076,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.015561905889745258,0.0,0.0,0.01985355335873516,0.020803580987299407,0.01673427576781808,0.013242408448922716,0.0,0.01739898496249988,0.0,0.01449649408008351,0.0,0.0126600733274697,0.06677308212461437,0.0,0.013715956405309846,0.014692179829963228,0.0,0.0,0.0,0.046340195216239936,0.0,0.0,0.0,0.0,0.13218743937947522,0.0,0.013992561110944334,0.0,0.0,0.0,0.01792981119168364,0.0,0.0,0.0,0.026352250067378312,0.0862207306610893,0.020043068097781683,0.019778835113683207,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.019148522014619664,0.0,0.024886234095565347,0.0,0.0,0.0,0.019191711095290345,0.0,0.015131685322734427,0.20162929386785325,0.0,0.0,0.0163771389536225,0.0,0.0,0.0,0.0,0.01525536176683631,0.0,0.01381370631176149,0.026631276604795213,0.0,0.0,0.0,0.02049004417665326,0.015163694462358303,0.0,0.013022864449571455,0.0,0.0,0.030632592452622183,0.0,0.0,0.0,0.01568571009812198,0.012656017791753793,0.022413186150518644,0.018696033623933593,0.0,0.012793732644122539,0.016195937024114156,0.0,0.056766661913239286,0.0,0.0,0.035921372563701745,0.02066764915081081,0.0,0.0,0.014981598504326184,0.019430238087025264,0.013254086255167885,0.0,0.01857483950594971,0.014680901970670818,0.0,0.014062011918777463,0.015487700427177375,0.0,0.0,0.0,0.015617120296830697,0.015459521856137314,0.029243443226514374,0.025567708930779823,0.0,0.014171506369870064,0.0353840113406284,0.03027001588167568,0.0,0.014902111435531091,0.02023306694772364,0.013880505983499145,0.06808719547658135,0.02218289701406821,0.0,0.026229722660590905,0.0,0.019152843722302276,0.0,0.023376639622622278,0.01519697050488648,0.013165097503907533,0.0,0.0,0.0,0.0,0.014150629251250829,0.016680190885933612,0.0,0.0,0.018042054003680877,0.021276601712196055,0.012721880756209994,0.0,0.01710577165157865,0.0,0.06816732910601597,0.0,0.0,0.0,0.11191043748996618,0.018732162271132655,0.0,0.01289205577304092,0.0,0.02537515073941645,0.0,0.0,0.049048118334418224,0.0,0.0,0.012990804817347535,0.016123066226504664,0.0,0.0,0.0,0.0,0.0177539686913835,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.06786342193427504,0.013737352826188045,0.0,0.012840554733823258,0.0,0.0,0.0,0.0,0.013010339503677274,0.0,0.01539488492727206,0.0,0.013296941112398536,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.01718360687703437,0.0,0.026507599118261505,0.0,0.0,0.043062701288327815,0.0,0.0],"x":[92.2471903302796,23.10067130954745,94.8977386632923,41.4112043927922,30.359423305878575,52.490594812821186,1.5831821153549752,60.75809753505366,22.90261306091075,74.944466739821,3.4151577379105458,47.297203998728854,96.92945798556498,77.5992369794842,99.8248020977314,48.81950224273215,70.13875945651178,84.94545492315243,73.77736474380715,58.45809698628206,35.7298764135126,7.348001987877062,83.8838804612805,74.62269551934084,81.50443370947431,81.28244080967812,45.64580406431522,23.869073349058457,17.80028429223217,87.05750928301698,75.65379141847515,91.02170566668926,79.135540880776,83.18948283574932,33.49412488551371,1.8453730864423035,91.12182282176902,91.94899070629099,58.28051656902742,15.39664419937612,80.96164172177367,84.20619214443721,89.5555382661978,64.42056751195335,77.8858058694479,8.458977808448243,36.46846191261919,43.8797438922077,87.09938947117399,81.43915050935962,44.081030204795454,65.89809080121825,51.55694583199666,40.531720542817595,39.68327880618605,98.60505998494875,58.73634886700019,81.59081580803173,38.1889037968834,55.06619348329798,76.61550129914562,51.5063129997122,74.70392930366863,25.81627314936219,60.12326177456582,64.35572833653833,86.34313316766733,94.8480445914939,41.55984709020921,25.90339891384621,42.18119718930573,5.672044958533307,41.1960224566696,4.969872375443507,96.77073079898932,0.8183120533699739,22.602672142612313,27.82742429785907,99.63965538608859,30.8276669192195,59.36682020309028,55.479267944311594,47.84259394120773,0.3297474216582108,1.0708468209697175,2.9639172065447417,99.89475557111227,52.63896748998582,24.829153905203505,57.09002124260208,8.097154303302577,4.384955977388061,54.18875155375176,88.74406046092443,20.665834126806025,0.10727579094307327,78.79755602273173,12.010809037379943,35.556314370302225,43.50993623615849,13.301624147621215,70.5995419688368,48.68523437799108,21.860332518348557,19.52440607078252,5.620762014440284,6.075585486650659,29.619271977856897,9.429126332603177,25.2585946859774,45.25891203607792,13.160396677978392,62.93392096292314,15.48174078961626,4.376636157936664,41.927695412997366,59.7567574520792,33.67604197351737,9.170315910012249,20.749338385642034,29.1688073656617,19.108937173448304,23.871501853286258,86.21869876501651,23.801206130948405,95.7946451425184,45.39937927679871,61.0420001407971,91.37270674764288,76.818028377039,52.865543803800904,86.59746223591213,14.625046409828668,7.088281831339738,50.69671369233222,56.49475349587782,23.546122312012898,63.91091691066728,63.27508176232861,98.90808572110839,59.512895952497736,79.87936979292358,70.08959864879938,3.7944615938391824,47.79896329861442,57.911768499403316,19.552231357774595,88.39146147455521,68.79566313701413,38.743918594097714,20.226109990601127,78.2031637953756,85.68010642460982,22.52032921149749,12.146340293163572,75.74961043675322,77.59327497205099,2.0771599603179647,39.45205334802739,48.82751768999953,63.126369956799856,79.43716583296401,53.3296629196526,49.20071141562716,14.112114660047448,61.592993171574385,31.832025702360255,16.74604319162252,18.484500949656677,43.518779965363976,73.2910988945086,28.02973618862936,94.48431061231987,95.07615310566906,73.18492252782431,19.94882176721775,9.469279531228004,76.47651985626564,38.115616489131334,4.310646844422772,72.79493415153794,60.99033647297427,35.06109260224994,62.98357392004432,6.072221101768216,75.83596878731056,89.79057442876501,14.63203012493528,8.863771789957875,72.05628396673495,42.54899930526717,41.767679856178084,75.12551175309656,72.68889510257873,51.119441343442105,22.248216658245035,5.6735687796661605,48.06192584639788,26.231271737029594,31.606734335357167,92.50625181417813,19.775172775973783,36.57329602140431,12.801926375545602,4.6876924247899465,94.55413215841514,82.66232784429792,98.70440834723443,22.760302448901058,71.97344841226021,48.115884874091776,8.653878345818967,14.388603863814776,81.27276575683257,7.124336073262838,16.28888451343333,19.435376144641946,76.4208685938652,73.62928145996807,96.7518517625702,69.57388630306151,5.391782955351987,94.59401600273895,67.21577575179016,42.45698727070077,64.97139075562205,37.37716239962068,85.67978138773722,55.84053112047942,53.43908306596514,22.24255273953515,70.73915674371638,27.14179045194949,92.88344589895196,37.14184371032252,89.14910854312352,24.59738019542872,77.48226481323562,44.104468113685314,88.15996511569995,28.546107817827604,4.352023194140964,14.37247747155006,99.48790261656623,49.714177077096686,19.37083084913067,70.40848391931715,52.57477960642556,20.283931846330216,66.90662013862121,19.06538422009305,75.5443404797123,18.643950988589175,27.150851414696398,55.798054127385655,98.0599115780858,73.13677608536098,0.04569954758861794,23.314002234033616,75.47198548264238,0.9840395025153548,92.78402118555043,97.06542780597009,48.98533931468785,60.651136070371315,70.96666636447797,13.270937081299362,48.335804305934445,13.407701234486469,55.23430700996488,21.749448273640915,55.8711361828957,10.916638278967339,4.056186187988575,12.323893259346864,59.84354997766466,75.46094651644495,56.58866823144591,63.17148900457907,15.899556055578422,7.90943771885495,86.29113726390341,4.3838280409686625,81.24060162409617,6.490339511539611,53.23206322995786,82.79445353531693,58.85482416870622,3.287282513396539,72.49925783955189,86.06327542193884,38.886585529856774,27.602794043984513,22.818107282797918,51.20117081857431,34.96441893603392,98.44068368654351,48.06963627976843,44.57808300321662,7.9602674401313855,56.44916746626494,58.210029697907714,55.63324921567112,2.67031699042104,69.97211443543709,10.687873090998078,40.424269056756046,62.76439232756283,35.28977292894324,71.42860281704593,20.208874140826573,75.00143337090563,62.45085426814063,96.96883387588299,30.477153822143688,81.03214234356413,46.23326662407037,29.04281019177708,54.69046756174123,16.723450471279257,6.7126349948936515,55.09643395503565,70.44074839583152,96.91407553150513,23.55897201812658,8.818296058036701,43.84111283201057,55.01426549419484,41.706360927222974,70.74683111203201,37.72175034341026,50.635947506217185,55.63751593552606,6.060277657301039,87.96514083619927,75.64561811981125,70.93682868444964,61.66679719934165,92.55245207522562,55.80537082413439,61.330653083899556,14.344880801118244,15.783600913266959,75.98760092705253,79.39330480516979,8.594841538985332,81.96479973136366,80.43486235091078,43.19433123795342,10.586890455780829,56.63200741204675,72.6287959679802,29.583592915132574,15.079570921082786,9.8308102822118,60.37982277411593,39.507412406074494,65.47286433420251,4.630016078314458,28.96963096387861,56.15326050672999,76.85690381493214,40.26397296380433,64.47204779942687,87.5882444828233,53.38845629412252,48.39437471600492,30.836886709902743,14.96901852227468,16.413884092666198,95.30939320894281,82.58514185964741,65.55105571312305,53.410576155568904,60.5882460703574,4.13008510007391,52.37986549599953,21.980296472496107,20.362503205062342,36.93720405199616,60.283769660175565,46.76781528997507,63.470903551153434,84.64655685305944,55.78280782218459,74.43160639913499,65.93280387662826,43.915967034729576,35.10372658097638,92.10951823996712,63.287959664957704,3.2311963650538678,6.739090566139483,38.51017154427625,3.643453376062822,49.60153210272682,14.905123703563316,2.4213766632580347,10.60110578549811,33.392271561847295,65.28891694335466,6.171234631265898,26.97273396450317,22.375651560185016,54.94102958766594,57.324136386822545,26.75889857901663,73.45357713425318,49.960148722609055,92.25508774360482,48.065497230914865,77.32956561497343,60.61117817538442,29.624345079551162,80.30068790367848,32.45055123781828,57.34245704189345,25.657589652290813,27.806276781608254,16.467885295829433,13.738083353577114,82.14600235383651,47.0128045153557,97.77021903604341,8.880744013658814,67.28282912339623,82.31850412273624,98.2649256802616,73.20522521443915,45.24282970597873,27.43441713076491,75.03565953240239,29.54120225625727,86.80159581133636,10.067482286608676,8.080580905262424,33.91456058931932,76.08003943544423,73.72009365849893,40.72967384260633,74.2619585645016,0.6886198033213331,94.7119041205218,7.422620560731619,80.83271085934783,50.57867761973871,38.056205951975386,22.397212236112995,94.06828254724664,90.8261108242673,91.90738962119455,55.80604717967459,2.471761993373245,67.78758571816053,23.295686016940987,66.10751778447957,48.49231561254739,76.12214261186314,38.02451283222097,70.87328261489603,59.2757852029582,16.348441392673863,7.1510539063663225,12.037045653548994,72.48002950326288,21.468918165604766,44.656869366762365,69.24468307056813,13.235689310989551,90.10466195328506,87.1168231610579,10.843060474268151,8.459168116246008,48.56843356927203,68.84438791397014,57.26486042058041,15.179806472644074,59.21243476462259,21.35699486126974,42.92387448141825,43.75689130299363,23.314803861572297,10.356090466304813,7.090767174652757,94.03222145020327,12.943059800860812,40.93425783469626,4.987622614553877,19.348981307943557,33.79015192909858,39.65914958020791,83.9618384259889,65.2393137016946,68.25397123454555,90.09720940692605,4.146609268996504,88.03072926702478,83.30242736391232,56.73011271292789,43.73378344096239,48.60231273529876,37.216158395616425,32.55465808565796,43.558530872049836,2.438006126313219,71.06053215103944,68.49400969683283,67.20547352225599,94.06128418395437,96.36361023121924,89.3491890008703,84.93325056723084,26.164758045519456,23.133756183440646,30.072899850294576,41.979627888975244,1.589361988215554,21.551608202489913,28.294000544917218,39.74903021184317,17.662548403908197,5.3108471969158355,51.92250536569085,59.22504794528152,9.30647345993596,54.1201078227556,53.948078276762736,97.1224565053648,36.8658197980924,7.495778990952551,62.16177285857765,41.41070621497551,96.73631867664267,70.23822407205024,43.32996757090197,10.196583016138415,52.77285919863222,41.60883843621206,68.55534491116511,15.870875215099112,48.728101748645656,90.35541568403727,12.977949895754426,33.543435312208715,74.83254255965186,68.03328429638104,6.4719591464300175,28.642859026230227,26.0507983506725,84.67221931155657,84.01893152673594,43.84586988350494,38.54186708623075,59.896073327050004,21.00094132178587,89.24113535643099,6.182691887607694,8.663867722799878,92.3429918803548,33.09316134913986,67.46666934720231,68.46395114277884,97.10071807548462,16.93251197420218,99.78092021196103,38.053003116955566,67.44562053030994,2.850530145408414,51.65345413440603,63.33414181584614,88.47308543575718,98.8923618467753,2.3272561530527147,78.8383591505632,72.54626508632947,8.718991877062221,45.22852285507335,90.08190243533738,37.29074695818111,40.37960417556852,4.2270344640662705,27.65304724104336,18.66946209683502,19.18060148455918,15.165237885017046,0.1959715545863716,46.379903711189655,87.80833850493981,17.266976929292287,6.535199218030119,87.83167726865062,54.36891601135518,99.67168222154024,8.133199181599382,28.01305660803226,77.39885571827048,52.30057750313295,17.232609657376983,78.73586425343785,83.28527863479547,95.40800291045466,27.838490188164645,75.34429425536725,23.505691103966765,13.19178325659287,53.70446289145052,17.69601990645868,85.46317092336663,21.716805786502857,12.876755654180272,37.34941933228533,1.918156977674501,60.11725077857915,77.98467497626591,28.076926512053113,50.409940577347314,91.33767658320848,16.717046601241048,33.45159132329616,66.30789985167989,84.14708713332296,15.108202900123512,80.68228080560027,44.365384711186294,89.36403010131878,39.85127140173961,28.031020727640232,38.95499461173859,79.3317599341661,59.72832542986155,79.37321886817887,21.467909326202527,37.21852768782736,54.66475136785225,43.65889213054957,20.099627797255025,25.58798957105499,15.15739095823414,42.952321537802774,17.10048282865124,36.542583215608346,52.445437681806894,3.3750567944654364,3.4377586480387023,59.438225240513766,24.270103118131892,69.10945963406687,11.976139081463844,27.315464017689095,44.36932706020475,50.80800206018212,45.76782899649372,85.43081859561372,22.518196702953254,88.29271805903653,73.0947137816449,79.9137032899261,75.52131190652665,91.28561312343928,77.49104449808786,57.981846616055876,73.43417851135958,43.300162341844484,4.039265549962523,1.856475028914173,38.59601784230395,73.92826995927481,33.29113930039887,20.920057629694465,38.58254542947386,52.632880538351024,45.47908413554595,15.956959059630616,32.491804789603826,60.356624210054875,37.62655099338983,84.69463702701428,77.7017631927809,48.84077328090455,91.10345169413641,94.06782726075782,86.94504418039435,8.939481847413088,77.18284119010501,41.20587087449905,32.48693070908617,59.694996646919265,4.26571296649052,94.64488035770373,1.844023139356188,94.00127532756504,21.594788146417976,7.1683307552556474,84.0868820503828,62.1412585592465,76.37386272947253,98.02539216849469,80.61027036904818,86.41933768738647,87.03180534133227,79.62910088728053,59.11318808125381,0.6136224793470202,83.46537922922717,79.3232195677378,46.51440127365576,22.77036125331222,28.890749743539956,1.194268785199637,21.58310882453791,3.324025060803071,61.249500546552646,1.3298135292055813,33.45955380389884,0.3919836549570066,18.510520327359824,20.068234549074383,12.321899470888242,92.23004304140659,12.635908204119751,93.61214829042493,67.19301378725571,78.18092166282999,25.893985914306228,78.86731562503822,77.67852258929963,3.4216511698882623,97.18244455957164,19.650712899355447,21.287595434288843,34.782957499944686,59.21526017284875,50.95718633074069,18.413243781607424,77.03249297581137,38.295572298912276,56.316053004942155,88.94273500950149,87.63951216545733,98.29825984936282,44.50628079688539,55.7920901640635,24.774471951488874,38.93960573610238,64.94810267115216,44.23396016487968,40.664750376898475,70.9452780089945,33.93291593085921,29.499653672814887,94.33984919999519,77.2496330177743,34.95859957328273,0.6708575594984278,44.16861849863678,58.28529102763991,2.6255299235950824,27.334736654367653,48.50548774913912,30.821423553735272,36.995364013918206,62.34198654149883,18.52493777073958,23.49653450385818,80.70471424968053,25.34084603899509,51.386342564245524,20.19322479884491,2.844086632212095,1.6407248112590755,58.122340896760626,3.920899695779423,35.524829343346575,80.70829864578761,87.32305045547868,91.92086147026812,47.253293020857456,46.25535355359298,77.69874017282714,62.423335231506094,75.62046020999951,35.983820976366275,69.54496600284467,45.73856594125891,97.59600706783954,15.697979249413718,3.0455007501872133,9.029523234011737,19.8970296720288,57.239775124637845,54.00142572233029,38.73603951886941,85.45196683897342,7.676917758977275,65.90289068845523,36.13925473663535,15.393589782310269,65.08486001941576,84.30760884440494,29.792864569830122,86.11604538300924,34.81753439861157,91.37535663052094,12.216462696066689,18.64684887385899,40.30754023652592,41.49739513218389,52.41295984921115,69.20923131022099,9.241431717510128,91.91768117021273,14.03182881925975,82.30144890731015,6.031581603904956,32.78310125529493,84.71120240513625,6.7104699838106185,86.53988039743541,60.223993767100616,90.42670377278318,62.737835328006675,67.3830832624632,35.50655357194395,37.008411437259525,98.76452107632063,93.07050932442276,35.17682452674005,15.599205924438241,50.40494174381058,27.54992439143482,59.758510213404236,99.83356803927906,83.52472701222031,54.0624958874661,82.86423727282357,59.69466905912666,90.35076816679673,46.30129371361955,7.538929719879195,35.7058884135059,34.58023023029786,72.55612027759074,43.01422557946077,4.958099970814112,53.51840104942105,90.60175256730187,13.635748500288503,65.69851978598693,44.931809559310466,77.5811089191755,8.405619578417323,11.458004673314282,98.28532921832269,79.179731455268,27.171442014224347,98.95420435816706,46.37090422185006,35.84430492785007,0.08014480619560338,46.81628092934342,95.81523463007915,87.54436749135921,26.817254898387198,2.0607242948235127,1.7733440360268249,54.90215736494959,47.23402017882981,56.18899026113866,42.19193010304056,77.18390348428179,65.92298438238522,48.12070672019417,4.232648519592885,4.950001171153762,7.29964790674158,66.17052833258185,32.92517879931811,68.49468295986374,53.81118005941035,29.19902590323684,91.97702018073682,16.17910256396753,46.9679698732248,88.41961909870602,6.232454954828914,89.97020164997205,85.60644691115276,27.178786447323255,24.37793432786657,95.93440570615562,90.27015381790791,79.0202237899153,56.154661213219995,59.162783799639975,76.91084623725082,19.267521091439544,17.174716669075263,33.01413527672536,27.477273890415987,73.69812371011632,2.8667789466572557,16.080906546092557,66.49502448368823,36.854514070837375,63.13805788299922,43.28342805720877,10.922514297618457,34.954618651229616,27.058455922288193,7.7878729856704965,29.910095873829867,57.9906980494199,32.99278912887493,3.209024228590285,41.778956308809214,19.075482449539738,18.263208936957387,79.84429795656868,41.66576853654151,73.4244036367781,34.20252627154001,41.423675783433154,45.49532323734429,32.39435017820851,70.11284889495255,59.03861120996079,88.33164581012348,62.748508090602726,8.785385199039952,69.6971876779668,44.53858103244293,14.840485260170144,0.7389638858976699,16.794680314463363,31.267266093752077,28.40589386050936,48.90282762398704,40.86764500691598,73.90923453840949,10.029087970407357,17.094693761984313,91.23535400781341,3.47813781331594,17.451430818075764,64.0624292390601,50.00827784354309,35.10316778946934,63.07408140686606,47.50983321099751,56.95890850124536,28.264284482260326,29.09782178979443,6.561799900556564,36.07850376501338,39.26669591654899,43.66563232774623,53.7016356608484,78.50384909020103,60.775187451118896,81.15708268548343,30.040936258050422,61.76833254143874,44.60986905829532,64.44637151014685,57.480126506457864,79.93284537645195,88.2648790451336,68.69964471881202,97.14399379218477,81.4269339308681,2.5739846573963554,28.047547521089,83.76521926757164,36.47889487976113,44.57196437147688,77.41861636116698,52.938651961757245,49.081999804089826,78.49432959856311,23.617714630761633,96.86611740098657,35.55054156806494,98.50792392541983,19.42904822419238,62.66254637347717,69.59384854917494,79.62259285186765,38.57436920436874,99.39030540309517,53.273086135441176,87.19845551798251,96.9410388642213,23.90479584261307,35.7763190810388,19.216831534285372,76.60609882094404,91.06900520292429,19.862832529296746,51.372092685150726,48.48750757750755],"b":[74.86117354287214,56.80255074121024,35.76909359704908,86.11371778922562,61.257762583798495,53.743951718377005,60.16308757849599,61.718089489040416,65.42459640353184,65.16971606604702,29.618319058573803,16.606127776504827,37.6938650331837,26.420011100336428,11.738446065835827,20.77690057671076,22.35249189427173,62.61257843013359,47.8322794124976,97.07500116287952,22.575858497620178,45.34090968302073,81.66586628417382,58.17753084772998,58.166292273784876,23.62104493696087,22.900085485606905,62.43943510732553,54.959789548007976,43.61093273759904,58.46480110867729,63.23098765831446,63.328866847823754,11.091799930319816,76.00806950665152,73.59611233737797,24.567383992626542,50.534696527354,84.74182597886282,35.947090380734664,69.44748067378572,49.44854039602657,16.947970829091833,38.11697162780255,47.657007446559,91.2391864087719,49.556372017940184,56.014537386098084,42.04562537574971,41.194022406568315,55.56698477022972,28.54048629446683,43.08605472909973,81.58373336565987,71.67249325552648,71.87399938809864,35.29939446359498,81.02139357881121,40.668548216943364,90.16674373315287,64.27301985516121,29.01664303946926,38.960020810542105,37.76206700897857,46.87185476758448,33.95367197075802,70.50618492117815,16.61156861157567,32.06312991764135,77.99069132599362,70.71929859501957,38.06708056958784,20.16609318235581,30.130165960833985,64.8131514277197,57.486023718403935,25.58712800118962,83.77967125044589,62.62770850245256,21.77770461676314,33.45433282445394,20.842067105940924,78.4527103194904,70.2255409392475,76.22281758426556,46.12342830561289,42.80147928161093,8.397197515380178,83.34116235793448,30.82537203738776,75.04968416996104,59.572521354584794,43.64646707639398,18.496202169198135,8.003701754923567,17.32387711636537,15.45266207429814,15.833377212762215,75.0241215936785,14.033237817426286,57.59615698281556,25.433649932145453,68.00349567516035,22.031219630332583,21.87579313810945,8.909505963950943,67.88844722646198,46.20456259666977,41.48782359741758,30.796260668675007,32.75844472985645,14.089494735223909,91.32957511932057,51.37889322028106,74.89295848852383,64.21955184201747,81.87803388897751,88.46810470369411,18.64994049972294,25.588698573673042,36.059705807793804,20.835950681447493,65.24215545672689,54.83676173184297,84.91150949726232,59.90507910656712,34.168810913800755,65.43610402537692,63.187843331813085,30.349145145011832,43.99272584900612,52.291214250655635,28.49141353089189,30.69057335028762,16.77986384351753,40.393509377239155,67.31122083447173,75.80052291637008,78.80010385353486,64.73743277929277,24.93443395887389,47.65873855700596,22.861778717007173,20.289117758106695,75.8985372054978,73.22717049579033,16.81599451799956,32.35189797069031,33.1164029748589,26.476194818788507,63.252040767306646,50.44415461438285,72.81492126786165,25.23458993274318,6.703552761672058,35.21060638900424,47.47454273415792,48.94453091017351,23.40289778166468,82.75399401208666,18.896130009072337,83.129384712612,13.281472373210082,21.80454779846118,27.612171916195194,73.03595591925456,53.14486133887547,39.774331192589145,48.55350560445754,23.122976565518275,69.81460006611871,62.45106333206373,72.91546154153897,23.394666692062266,87.29315375479331,79.72922352730855,17.981382963248546,77.21895790704497,42.818862653839496,87.27292940567507,84.77805741863247,84.71291947198097,57.04889532505087,88.87392273596197,88.28549654260061,21.16426228662664,77.14156478823159,12.41635426268183,26.627911780182707,88.46470955986722,66.03899349414566,59.60097823367526,59.53333439917342,46.26144382480146,73.38993917257089,69.71591078040619,37.407579422027005,24.956322456815375,71.95080271070354,31.8191003601407,86.67290585298291,25.873766981784232,54.63488016407687,77.11759625454016,58.32765667693711,19.939926218190266,36.612628374569255,61.40105073895679,76.96437390103456,30.23057424884422,49.64410959390149,63.75437992839542,14.968161157170648,79.8742815618924,58.27936024486306,82.9166280349306,78.60662864276807,34.80728078892413,44.657981239488244,77.96024842836192,53.11545383020771,39.683407513336,18.420196447502985,51.24336957663516,71.66091919692744,39.52005941163662,67.70770593426532,48.764282185011396,31.02837764329815,26.3180556733839,20.444310831597377,11.319816322911445,74.16085880485628,81.26510870504947,15.949409441263782,37.566951395623605,20.037484415379822,68.91355162218358,80.0380347481482,23.23551791610503,73.59006835423482,31.528639800975977,17.681354893889676,17.06656667347136,63.57672889957929,68.1248847708653,16.92685737307382,53.18636539306053,77.15022991578941,77.25094657320918,67.57300497269577,59.72509354509945,10.90847606576856,14.957887355033336,51.358122019629654,19.43890685516478,90.35382754677465,57.376077502772446,28.82884218909918,60.373979430386555,30.640043878489735,11.631515671850178,29.567331753972148,65.6913523739199,53.28055415572073,59.09483180540161,39.1839944194065,78.93664854740791,17.82105691553182,59.23844263678596,19.950131135989157,69.24088248730293,30.995965692522564,58.67844349053905,37.676172007666466,30.153013274362518,26.24029596240417,90.73838186867226,84.53890858647621,35.97007070379629,57.5052984915508,29.290226743407555,40.380701786322355,46.49528141262999,88.23907470474091,19.767512593300772,16.225332722600623,43.72740846094574,56.690132403422865,24.484306613409984,59.80219330030665,69.47212870491255,13.187597154708154,24.577156214523313,24.203526554151313,76.04053240842492,23.762519908489303,17.57690093920334,13.129961893188327,47.687301711394866,32.85190000046019,40.22335230541352,72.99944521900076,95.61350061261697,20.308781738649945,25.868321045483246,77.36807850300585,88.42315826835558,35.467274334282784,35.701836676117146,57.914818055652205,57.42942350637901,68.41376152166045,64.30038562561867,77.54792646308388,26.497055384510432,22.2458594041092,60.74744156980282,86.49552336761435,33.66512923519101,28.560870302207064,24.124372831297613,84.95305660420958,13.201733921309247,42.471662710121755,63.35164755736274,93.18046107953474,41.46265464953999,9.58154085988518,67.93970495432104,38.61368972483834,58.13687672531024,51.379976570984,32.29562864564866,72.55701200728953,34.491266224153236,77.74396777522354,43.32124299500707,23.20238791126327,31.231627233241106,57.561415303024425,77.13415176847622,42.867503638247314,37.59871221798624,30.553437619356394,60.35358020637491,37.50527170322387,14.300355703816114,44.03205121564234,56.703374452316545,53.51092898849662,48.885605916585455,55.969659348840324,75.69400116606536,42.98840603101793,27.74659113911738,99.9123718532363,38.53137649431011,76.70248952026917,12.199604347806359,46.66699706073233,37.881740944226934,39.23052151853525,58.18666938092141,68.59730401464097,66.43807952644225,12.823437403226322,80.33527194952433,63.623015339593564,29.520482496864627,51.72201166106361,74.74712984107691,47.88546957336548,97.04847230443809,42.74680187293815,63.472625451502665,53.23602074218122,19.979199003713862,33.17278950984486,42.39367280176007,89.23414611378386,63.83695969384857,45.770530731352245,79.19784314915249,65.73024959768532,76.83809976182306,50.56898920198981,68.66434565757632,75.47402159697647,36.557162526932146,45.208066397107885,49.429571824158955,81.89563398399406,62.00127605793097,51.734330063077394,37.757368515029015,26.10299225418671,64.30164740631282,30.199566838035373,22.507709383932283,17.60172410178109,76.37357859368166,18.063171475084367,23.70989511208247,51.15795931690959,25.189835292627286,40.10266216698183,60.18257980330126,71.96526596129537,36.344004282257025,71.62258582229958,75.08467561812755,55.68276843933542,22.16243443520883,59.26384601579528,8.528298960050913,67.57806623779838,48.779886890507875,65.02812593105926,88.43225274203098,48.213323592559895,17.203148158451587,67.44124855935004,51.30647964627363,34.63010475832335,59.08800531518875,38.13314183838224,64.73282090801641,23.939852466492358,32.65939052216744,36.352374111791846,72.85036180487775,16.74065262333949,8.160230780964476,77.00688529807071,42.70994016113191,84.17932873943607,54.04124010481579,40.21966466541451,60.4228392430966,28.506401765250757,19.2146078783764,16.37332051693482,33.15170213973952,75.65136698752849,19.161008524588002,40.009437518054796,35.478943218586764,25.46205432185893,34.94024138734752,43.985824731742866,30.69888475703678,49.480221407746825,21.05929720697187,26.56935519556295,36.127128631933786,31.406990291875644,56.107150295351424,87.32678749461815,33.28470686486265,20.72919490970346,17.387448444754668,71.53491069814412,59.431583780257505,7.819785629369838,14.194598545206967,47.51262318321233,13.25354522915433,78.22570277794354,60.638255737045704,28.906912361787928,84.47617613304891,33.65686878796893,53.80167672648349,46.23653284592882,51.13064818738378,69.52040842991258,39.73948867044818,2.0997708391101666,66.51075851482854,90.17085043624047,84.33345485387916,72.99729412955261,57.91960894504787,57.57218735747167,65.46944628938269,23.234135274100872,61.74953869166445,60.71080309412958,41.68401187934497,79.43218014965413,44.06663746707229,41.446395083968994,78.68151814771457,88.69356105304979,91.83033498738115,69.98484722472395,33.10705943784815,40.23274792297802,14.746933056690676,65.70464440110837,76.62200529308915,19.48113871605262,45.2617470685001,76.4469761598341,27.87810228087116,28.91057707954072,49.122062908639506,86.71734407914907,52.04034767624999,18.109123885300995,30.794658625727838,57.40614590579629,66.7903163993526,7.82401813964269,52.87306869384073,85.62375194806329,40.881850833685576,28.175648896899823,6.95998553272366,69.22489425311991,58.73147066390778,32.24933057502193,33.58835679512146,29.463792604969044,76.74381026996763,90.89043360381451,63.100824304397946,37.38517641511319,69.00535196170306,44.82187556431196,28.343690101682874,35.27585497107766,14.14297550056446,65.7200870586695,20.745966082685285,71.8956555423313,66.27993581451369,28.528262112192962,71.94002386393248,4.921373504036306,82.59998296445129,47.74131993203663,73.42569006433173,36.97018677589241,10.57767085379195,27.95421868677055,50.05658043814526,53.94835877772854,63.56283287263481,72.50954076044788,69.02318081357136,34.077448891343096,64.35569365244855,68.23079506786502,78.12498778534528,37.96979652044928,16.149796809444013,67.31477360453918,38.40205312424978,26.062936750484567,37.49147232475309,64.03523498561124,79.85487770761411,42.45249217505811,32.57653439883237,43.23630579370544,17.783833418989676,42.173766440496024,43.465611332225244,39.52636638839672,65.69457464025635,62.643494111813226,49.11362442610076,20.139074397151564,88.31501246352471,37.762129216161455,75.30895814106827,46.098818349161554,56.00798603210495,33.36854374969731,4.433259391237985,75.3395909314465,43.201460489085996,72.97620975466853,49.03392483780358,51.71445711524359,28.174175618003893,34.34553340728743,17.979791710976652,58.85147324732147,36.579483362338706,32.616674711627525,50.60385927305319,70.49122592192627,61.655762845572745,33.349438213799075,56.35212434395331,18.80158684064868,79.8904455193978,78.7306371626361,17.291509532103447,51.59853769656562,49.22345571727955,23.30537439403002,48.1047590650595,66.36940637083006,76.08941310419863,36.17802332661133,75.49537030792183,19.576966788286164,52.48731418030106,15.550462826135352,60.08942468920038,50.085798057081526,26.10000266670358,34.60063195406714,64.8440585734786,26.526694895458768,73.9002395493188,51.21976292080048,63.17401343000686,82.38714418512019,53.96579223040323,37.120814080908076,67.3021492517635,87.10061991528123,8.88200962820311,64.06654675081316,53.11143411055069,72.97317001475707,53.296176687354254,66.13579247683359,25.134176700869762,89.88811966433653,48.62076587643268,50.46196119023687,84.6995128438035,20.58775435461998,59.814186703036555,66.53236334091596,96.82952802397219,61.23677288555404,88.1030356663523,21.091540020264784,55.1552874998536,22.742708810295177,65.215765196507,17.315521206972857,28.433922912065068,74.06614618126864,66.62855410228991,63.432770776457716,60.13592492748206,64.51585921620281,18.2867101784511,77.11413312094629,37.65735104269301,49.33489618878795,48.7100193456548,17.280448055473116,22.546981680260924,52.0282199192116,68.44452915409137,91.13400602223723,67.57238541418876,67.56465794656152,45.205829998382285,28.464117529811922,35.44102303942823,35.516579945521805,55.327838501263145,76.68606374247611,35.6888426858797,39.66588662240639,80.47253541343713,25.20876330299545,30.63037546614071,78.49535838172656,70.93323358918585,22.048319778067437,16.89200575920757,58.14899932834359,77.62057682345517,84.76174913634479,74.44285628680149,26.68368016438981,40.163863312188276,17.45110591030512,41.18239196365373,26.123214136905084,24.563283833898375,64.9642910367164,36.9805903807393,45.27880658177737,52.21355770464959,31.148854750046645,59.363078378513045,24.98992470198022,59.753872077034345,70.3342211147379,30.112234183230907,39.15599737975654,63.410833912025,12.819518289387544,53.19913301166369,50.5490531712429,24.42598502881569,37.75517094194822,39.987517680503224,38.11786479851797,76.11646573246392,54.72396715189699,24.704277995906185,23.610856357190915,16.954653739084236,65.30034888117193,73.61204790373877,92.25275874451769,8.794990372193507,6.425612547480819,36.021115745667096,85.38710590846023,35.672213775333205,27.626902730691057,32.06628386435446,48.72011786456313,22.123927571031224,12.21640434462068,45.4257784373225,70.0529914153401,68.07914365515911,79.13488756227312,83.18986766655715,16.317393900032275,36.977026670020706,56.89663051029351,90.25688919703956,88.97923130771284,58.988049839032676,46.36075511138169,75.74282826239087,54.97975381787706,14.911967392849714,66.34252685005745,71.27326758403372,43.20906194654385,65.84021394417535,5.253832929366702,38.02573807810582,72.03984193251158,40.894479565123156,54.73471433932367,69.0749019836231,52.53368636885911,60.99896710370281,25.830558884797775,47.086630543059144,89.09868428566088,53.54435017137422,72.70726262385215,79.92299391435843,86.27541948936977,18.644949154231185,27.49542789050802,25.82635658682005,36.88824661345457,16.294603892079515,62.402298642427574,72.0006663643353,67.13766033724659,41.2331341965311,48.735653436868944,35.21054752293145,39.51553465711066,78.89661286931599,52.60129142083764,59.24108269275838,26.598501430100345,53.56199354675787,39.84701106067963,95.16737960070597,28.12930276867988,73.15463985342265,88.0709777219355,85.57259002322624,65.15907920854498,26.167747168999668,17.166154938232705,13.264851601155012,21.01032210900087,71.30261216827469,22.9336026596793,40.45203319581338,68.34564575630907,49.524163016611894,70.20769243616712,78.78887239931497,44.978846401977705,66.98045044601166,44.90217091344576,77.03255724317056,78.1388238056991,80.83900231781544,27.88527385082992,19.228186775265506,78.13870356916318,69.17501307111237,13.290474678216642,67.70554874468388,33.206500252982295,31.708435282775373,28.37989568429905,51.289474806008094,32.379392589265954,42.74168840374658,8.864850216057839,69.43868728931137,73.57981102079688,83.40194290829876,54.64473198395133,46.9689610382944,75.61510192819031,17.702814123409624,11.122471282919374,49.54405102855111,55.58132177007494,26.292899142643424,53.038977058265196,54.143336084635514,16.923250773366018,53.37021838636663,51.32033942873542,11.843090624185187,48.54842541025343,55.02959499448241,84.00788010532649,9.82570206130684,45.674292107936594,22.25839812180311,12.58532637373631,68.9494511017679,56.91726400757209,74.83067381799604,57.489562807758595,56.573471117859896,90.11784222891936,7.422750195763963,59.77622028854195,22.62616567587898,69.7010988791974,14.70063435297616,51.711276446665124,73.16264372687344,74.5611954209713,76.63150489334392,9.443832505596843,25.725256758611913,16.081820825251892,78.90581623538768,9.751755104117095,87.82621025309781,41.61346321873619,19.167068616218707,5.357636840811346,29.233524770006127,62.23381760933984,67.50913112027803,37.90319428785215,93.63394359512078,42.28194405192567,32.144620986898545,34.12739606756907,69.296462574658,56.1347442753173,24.465803037706504,70.93882254395284,80.35852507263053,56.56531570392634,53.63247482149509,89.89375461810675,88.58215582099449,74.89361135261407,18.927640219283525,19.498702643882815,29.587469730971275,74.42165502619058,30.155636909240158,49.9380708782052,70.04322831297371,29.804038116002097,80.01108604511695,68.27675514807046,84.48841936927431,22.440936063975165,68.92027778929604,69.9971828843683,9.850913813062911,79.5622834716006,77.35745563807149,59.78985202089222,47.87460974337138,44.2560698184366,81.18158769882649,82.18792766104539,45.536456251941885,47.51485653555818,22.171346248720248,79.20231826301699,30.220976558090292,33.43255449325211,41.72763693914115,82.85793722048936,49.439320927218326,79.57719096147852,22.310383109153214,60.04597996466414,53.113091683628106,57.377260250736036,31.754553336394995,65.93736762090268,35.97689050700909,53.35003347999014,74.93329980392951,94.42919200071043,35.95599304233642,75.54439003418511,29.604505950445382,62.64511239249206,74.55685975270532,71.20537891764405,39.031209108992684,55.279683664805056,71.2617274314913,62.09425056633691,89.71829265415099,26.29014699034459,64.24774634098974,52.99029979648088,18.154404584127406,28.864331713281867,28.237788535256133,65.98158024475715,18.985116891606573,68.00537907074435,32.85846878290772,85.69861113061854,20.90901338010147,49.637258377026754,33.24053318250873,15.96863942996221,38.28362817768992,27.607116226965132,31.376279429583246,95.25940340904289,63.429325506773296,43.12925081546005,40.692616189653634,30.043530090998644,14.409174479199773,68.1264211606074,30.043422413602073,39.334414631643114,31.80255404838872,32.53459008850259,38.41330220139844,52.937456850125585,42.10122180087076,15.328662885831719,22.297337241089043,17.499842111446707,34.363115743153784,89.74344827796264,18.49799882120646,84.54657393106937,73.69971636586882,22.165171204538513,44.38372777604144,50.51953379509839,81.951916901769,58.78174333147008,74.1843027836777,39.552182946153295,94.25716357246046,28.27304671809484,38.74033329186103,14.087810473660362,32.741765320395835,18.35682267694098,37.353588960886825,28.395829935507948,24.293749595429293,68.43375012419504,15.649942019017784,47.80243858731385,51.370569160397444,48.147173854922,27.45442394210084,32.878280735136556,12.846356186831919],"a":[12.17694038211446,4.837387571800553,8.64297156669247,12.50620401967395,17.762183043467505,8.29886363148975,13.368612423918446,10.819065484746893,11.206050697072993,13.22875887514428,5.066893445738216,1.1464649697540663,9.645343148432568,5.8351186142485245,8.867589727111888,17.471541533702467,10.801922303260563,16.14769005256315,18.646973896684717,18.759142742119614,16.029373294303877,7.576639598237085,6.183624737878146,5.296696454866701,5.226022822057432,0.6197921532449335,1.8565745535879685,9.315372537243967,4.369130426554135,8.690054237189546,3.716379561681862,19.824487419075023,10.49948584952569,0.7165404348902848,9.753233168190949,3.0919303845383705,17.0943650742471,19.443716291492045,7.63553616156988,13.828611334096781,7.477128866122578,15.154628150100539,0.46710214092009483,6.6314289324850595,10.725664645076414,13.873554895537028,17.00782705288497,0.17411967894315428,18.75821712167746,1.75684419864937,10.431394229103429,10.44600465698772,4.9750380918877335,13.855932962995618,9.653965597652704,0.11742049809527533,3.314055427095308,19.966278691006313,11.812942977899965,15.620152108490597,13.46880192558045,3.529664655831537,9.437711116152032,13.068824910043318,8.238115483189187,16.855908002611738,5.799233110036077,5.54449235697501,13.663769885089305,18.12943496133355,6.25829178837277,8.860324521528637,12.389444628857138,7.810207373228608,10.32263421075748,14.518471327004798,5.6453027635997355,11.515871840870048,11.019051418484093,12.550083013492426,13.575656704639814,14.227627404460414,16.201199312438554,17.759945738300516,7.591951524374103,2.5880256844025773,1.4964302624404224,1.7132618606730743,15.261064557145648,12.373310181643248,14.313736757017788,11.128977523847258,2.731620110244748,12.46271575477806,6.564111184050541,12.766800034592173,1.4932607775302609,1.7169231748019387,18.581927083035026,5.290752208620906,11.194383932328119,13.834807422605252,19.086300710460673,6.167034811704615,14.20673283813985,0.45418081751980033,0.2260503118233359,11.441324196684143,2.9356405584953738,10.442806463163038,18.63276449575367,2.4487900877706004,15.305704034423432,5.955497018807927,15.224610744121403,17.158462462837853,16.738787961300368,9.023899852167098,10.584806778215867,3.7350418253517192,8.431186807584341,11.809920458113936,13.204517214036207,0.40971892989759784,6.66391970451123,9.062572311874767,5.1827897060143435,1.2173463508374338,7.100396613326612,17.395195519420664,13.778174014443824,14.344638116335853,6.70072412145895,12.137357342155068,12.157080856583526,18.057473980263254,3.0091964817043815,4.0340340744541825,16.014307534716615,8.788367214081973,13.999487732916558,2.6481493496986497,1.5234652604502763,7.6288717310205945,11.367794544922809,3.756967884628697,4.9954889728399365,3.146014051753183,14.068517410530967,14.845987580215677,4.937275453944929,12.174649005088632,9.456166246165573,12.838121089556797,1.9713491449031162,8.152966546564127,6.91213847459915,10.387398093240536,16.46081580223999,10.635136784516149,7.562132087146778,6.533294678057997,12.42273528661071,1.093724487819725,5.758239363166036,11.22145064658817,7.42135815861765,13.001820702980185,7.920537188679662,0.08350158848478006,12.787931227361007,0.758337702732339,4.335549342279963,16.499312220412556,7.772040148070225,7.245919379091155,10.179552748675786,8.170950464103761,18.8265157550771,14.058126075949712,11.737819185775876,14.685446022917219,9.727884963118768,14.797620340511028,17.07406883962623,0.8158141314448342,3.8363066452741146,5.448010876889784,4.885041646036026,10.468733493708736,6.825408764752705,10.830822113008418,4.260713073545825,4.269127437080922,17.089363005801456,2.5984882024968092,7.053590395646432,4.832337735723882,5.932037167967579,9.62185107314173,12.555309268261299,17.85038909414262,0.6036031178140222,17.642945704298597,7.27259709316272,8.312932301628294,18.01132156539456,5.465805307365366,8.876005788924704,10.825392927855933,7.688444469830955,18.467006149875115,2.573311099662834,18.595781345471636,8.995145488033899,11.705409425052373,11.014842723007408,15.985479284821054,19.577913697501227,4.255420249746433,0.9582634449118466,0.5907532558275097,0.40750331031896625,9.706557401027794,14.779713259528435,13.064675821964261,16.068708644051426,10.441290600262736,1.8272032495264812,0.743253833745503,15.163249773447212,10.940238665634867,18.694396655672854,12.840082745172058,1.4895028146264444,15.360089836875126,3.6613765839874812,15.245531478697565,5.636319678870123,0.3288263286079163,2.1356466423014187,12.704956763788307,12.556416317892847,3.3329595214786556,5.892985088451113,8.529671336763606,0.3380517654666937,10.050822175437926,15.700471440195344,7.516614124077203,19.94639902836849,0.8498687478157851,5.509550816670656,9.70740618135856,9.336812980485867,10.816025756704475,16.36014467683193,8.005896148123878,14.675929871165604,11.142037618304347,17.947232941027472,10.480002377511909,7.570598953216781,7.329387530178155,14.940948828460998,2.610278387206977,8.389070322567687,6.0185647353131655,10.206572029224393,16.234809472554193,7.083094529801195,17.069919691559786,11.097243074629407,0.3116966073369376,8.218006849896407,11.316209291114689,19.727794214717328,15.405532757667878,8.963382594288984,13.510577190081428,18.957454997149416,6.25074161593087,9.581704684783734,3.4562860541219464,17.71002368282739,11.427864532180308,10.344413388300175,14.30745992601311,13.931398732623137,4.959901725835363,6.746634187795584,4.293480746079541,9.01704821459909,5.767868865189949,3.1687001479120447,4.887549915326481,19.934294519907482,12.56913141975935,13.054991252674917,0.1560054892649143,1.516838015569002,11.96734721678653,7.355747006234559,15.765870622522243,6.609831435973201,14.181992885136637,5.371191212627369,12.28843756120536,8.973886773589538,10.009294374720445,4.167523962193669,19.06971505783181,16.398275525149202,9.737528197624377,12.251787792809075,1.2682112945219304,7.526501196403768,0.5395385537745057,9.816657498602371,4.904035659534087,4.522982394147714,6.8143422940738585,15.285352642384327,11.229159966568849,7.916368903542126,0.3469805823888583,16.893282694193744,8.353774923144615,5.1412256143505175,6.97163110657633,14.54869111001556,2.511836180220688,13.92832434044465,5.426043865853942,17.82672293816468,2.950738059230562,4.485835412131229,15.989352481318448,8.191476003733484,16.49737389471449,12.872271899701131,3.985378262317658,10.046236768988974,7.240564681398669,5.718007467457662,18.435953547661853,5.987856212170288,4.115421321861943,15.959365614647613,19.438870543649166,18.178511339078263,14.67307636227864,9.495228731123348,7.478467568171054,7.296817497595116,4.388100587779724,19.972300878659407,15.760922779880726,16.851102251213618,10.466978610449802,3.926967781074442,0.14572120151759904,7.833503354804359,6.4080602270916875,14.912521908423354,8.761607169782852,3.286130215720706,8.426804416218513,19.44940887841551,7.888918017360154,15.858036752339357,18.3837130456452,6.4941688411913345,18.918874072250823,13.800140373003549,9.422509724975129,4.68400748510668,6.702123859827087,11.671050639850176,6.40964572114755,19.746821334923755,8.237235973304852,4.56129021537564,18.369239757787646,10.56607055490812,10.545591692839809,5.61356431549112,0.37645948445203636,13.361373535096774,15.84116127805646,12.434333580928477,7.928847633261582,6.509451867147242,0.012308876448208217,3.800234220569565,13.739591400615092,13.953309333588644,2.3174146659722794,6.5057554124507755,16.293239635604692,2.8806161688119047,16.909059981953952,2.5885169967067956,13.839459556060358,8.035794572529241,13.821629281321894,18.01474974012349,11.703687994806709,3.7457307923946637,4.916441188015468,7.322848576385836,4.415482231076937,15.47283641772243,16.236846672110875,18.643632891360934,2.306330248871129,15.88487130916096,3.98847511972519,8.182236892823113,17.837336774830067,8.9244458754517,8.49730005112896,11.528943110634767,10.498239800110358,6.131438103568607,14.319251739833646,10.959344256983004,8.308352109413075,19.725163928365575,12.05886486684198,18.337477922412244,15.774908827587462,13.617924924256286,6.953512527606587,12.746063349622489,6.302219776562854,18.862233320417026,2.6322105127167017,18.79753002906358,17.27884942077676,10.307236853146708,9.21399659588333,7.751357027518573,12.097931950110418,12.454244351703316,0.8062967203838722,8.51637592731636,9.225615393302089,4.596812017580625,9.057390471787956,18.705759684755826,4.012200910768069,4.69392095047469,3.743781132410291,8.036437437475508,14.434129327398452,10.666062498179517,14.90295384753984,9.253826124872994,2.9750880708378213,9.950102752020964,8.27509746506526,1.5448422887500435,8.955116605237956,3.647836728669729,3.4109425433463247,5.111012894132028,11.679525551816926,11.155233843182844,6.834241906765208,8.743951280733796,16.62564023237611,1.1760402044470908,6.805470545718748,0.11032081249915393,18.97532413539389,5.842436315880257,10.66168420154575,1.6319409653798855,10.031818720994652,10.501342540247958,18.935681986526887,10.739613598157355,7.351517750729792,14.384137307041813,9.628178206801179,5.578993106135175,0.8827652435499456,17.604540458061457,4.108126980762625,9.796183451386868,8.377911752834528,7.964383472547674,1.559859224618556,17.904865273787742,18.2546755643609,1.482399171802773,0.23811875804718774,1.4597243374695212,1.0599639149620588,5.59940031028459,12.686413460842099,5.971222637276732,16.96063151405562,8.110677375259211,11.53475650882259,8.182951017933192,7.090042455627503,17.675967048764434,2.46082695045593,5.411235563700627,19.48446643194492,19.27447505939864,17.205459776914502,4.732455932347848,0.20328939054468975,18.59193248846763,1.2041604352695856,19.24999690895045,1.3892488755158894,9.002101050249905,1.3816449472620063,18.429452791543135,0.2486743748973863,9.190692906654068,1.9955081844076572,13.198805712487069,8.280782949220535,0.31557224225452263,9.09774703865487,7.211581867400874,10.807397545504136,2.0916335691330223,7.602188230360785,13.170897484839298,17.86798182367331,18.976583787530473,17.934517047508148,1.1431991940665176,5.137811600187199,0.7382359982605058,4.69391773412847,5.461909793321542,16.05408409832062,10.725106158581292,6.568550043130581,5.539742524797511,16.329825207968938,2.604773230074393,7.094168095091922,11.358867475629438,0.8983225774433512,18.19198119508745,15.513957088164002,8.784618585308488,3.6555326279018185,5.662768446603548,4.540978845553614,19.166054262962746,8.101678525680436,11.707874092340639,7.808076824206367,5.480327640586151,11.80490392717842,7.250821082859429,13.443428227635067,4.798876039147317,3.7740277331036687,9.537017401817472,2.2591508296991325,11.638058455480964,14.922373065277576,9.968678668268067,7.991597333436551,12.761760846325707,15.387238340996475,9.662291436514941,3.7537795748312597,13.417234713633306,4.791870450398523,17.540339272180447,0.6969588424648299,9.881466058096047,19.064682652752957,14.742887987070192,1.1578433980144487,3.006930270046997,2.33606746054682,16.510897105292827,3.6039111227644893,19.070727988401103,19.521384095692056,11.137766664750831,14.64996713288858,2.7001268520894284,17.810165404664986,9.228062581888018,10.026089159439895,8.806079114753068,4.631989505213401,1.370463809098319,3.215111988316841,6.474536915096798,15.339081907169279,15.385206379406707,19.6218811439055,15.193859206443285,2.254081086648121,16.793567249071476,0.946050231229818,16.39108514273836,6.64536056278513,7.9736374804503285,2.176593121878687,6.626207610514183,14.595679570908935,1.6657490083503435,19.730798043957364,8.72927270292585,14.069622296989962,9.387763337197605,0.5465706565720652,13.487605061783455,14.700820832286446,17.615158168002793,8.661551984511977,12.924130415387015,4.134859761275154,0.4751898742375671,19.41254832289975,7.983340076697476,3.8757476124850188,0.29574799749010783,13.814522196699986,16.424814064273214,12.11348988238857,11.081253663856394,15.180273530550172,19.039710485331657,18.907779919108904,19.976595886141702,19.453151598682332,18.012508417949014,13.284217893057605,6.1098697776161215,10.024484642894219,11.119065125254227,8.022840514789124,10.880695801728386,19.709067421492563,5.9581757607687225,14.713520746929309,4.691182128337745,6.8131896199598785,2.497819602963851,12.300194538362984,3.287338214857778,2.729813930639371,3.591741214604376,11.765935072247329,12.125752371492261,13.908404001720566,8.008713050979912,11.30397106709471,15.054013914294075,15.384845576759204,3.6001910448203533,15.867109892918636,2.6229502088619805,16.328545468692877,6.736799883596616,16.975768273266713,14.942701805962052,13.038498174142173,11.138192186280872,18.807221867497105,12.65275144010008,14.881245146948903,11.73182496848954,18.473245111842658,15.373027972465794,14.594357082721396,19.123394964049695,18.091257491949754,11.275633909013013,6.64116116198747,4.282180709769037,1.629309922366211,5.668094331514286,9.268507648251916,10.541894468143314,1.399500715160782,16.8689467069475,17.32197563427398,3.8997662268017264,12.834572381674633,11.443386526054397,16.517918974242733,11.66467588461666,14.023195376124505,7.5205787365174315,5.957821407272017,19.076619837549952,12.17431540172582,4.689737206478926,15.699621816093616,6.269897144892798,14.853314698975995,2.7050271912675594,1.766176753276505,8.417708940489522,18.843177673413898,2.571551200230111,1.0341447724922403,18.45365751515694,8.711658544185257,11.829442888050758,5.1155398413867115,13.897051265863357,6.40886212871266,5.697797493534411,14.613255286609625,14.835536786376174,13.61817090563342,16.476978706800477,9.977980140253973,16.918668792087537,15.63778416320632,6.921049764417999,2.873314016029198,17.91908715442089,13.39399874829617,5.18167552459782,7.895468474689373,5.922011670560963,8.702689837900728,2.99674447131395,13.531565505272226,13.249528793075417,16.98134747352676,3.3874714754032897,4.862836908407604,11.826364089063496,8.590537307284656,10.686271727603707,13.047706779522553,11.651250165466491,9.315174139501758,3.694187273967522,0.3454123264482556,3.7499475863645104,12.773400174241276,18.225646660747433,4.924211946343888,1.6746621424114672,9.5705328602137,15.949064458551812,14.66730285372551,17.576449684026628,8.825467006764892,16.514663299944875,19.273585599337704,19.867374746312088,18.459780623768644,0.430093342438842,3.663882116569135,12.18259169842877,0.8180209754065482,5.043105542912292,14.500429818034878,19.55994699650189,0.9234941799600049,13.698167175000142,5.571106427921393,14.417142129717014,15.264121790210826,12.487844352590498,18.047705854220236,3.6814186893027845,5.34593658189821,11.927625864077687,17.077755473102243,9.916702824855331,5.843504020486727,17.32658916348855,19.44570142026211,18.54140613535161,11.944189273977525,16.048237443631088,7.96049479839489,4.813953052447748,7.04313090133267,10.429893923780341,8.437295527058822,17.97682855109979,1.45551557507285,10.450101855335777,3.2739081949484206,19.016252399388055,9.505833268325429,10.47470771250758,8.050360963458814,13.285078806584686,1.8505182756093053,12.909179170435156,3.620872793575556,5.23091861784394,1.1115935123209475,3.0804449181250337,14.117072198629623,11.913569702641365,10.128897360381174,11.5170478968255,11.84019167133898,0.18309664587055074,5.930136328438902,1.299834926448784,4.540791042192476,2.1132658993432907,16.193070592104736,11.372773861954645,4.2944613058938685,19.84206621079087,4.649414071053859,6.1642205085561885,12.823142183592084,17.633898022836412,14.694760361719226,3.146415943299097,3.584241261695742,2.7032440707695082,19.282946551446475,9.536743765022706,6.1816012977282275,11.548784652256142,12.688831645614789,10.707258929653749,9.520626198179523,9.981373517137907,3.711225507975371,9.372302652637599,19.840888839156804,4.693912292149243,16.70867099956868,17.30670524241097,2.035554936991364,15.759931836348805,4.761960069444675,7.670392150820535,2.9251643801510774,3.6146069470950692,9.741037556216089,18.961833944571005,18.28478910896967,13.500469073601113,6.43093204477402,6.632388776087241,6.937213991640756,10.33387348085078,13.355092805550441,2.8975521957139527,15.434342536280656,4.063629808949876,3.197659975097147,3.807715232112252,13.332106774905732,13.429628053740021,1.5621415866682176,10.874373292336138,16.845921737693928,1.656828547485385,19.854101905675428,1.482428079742144,7.846044317989178,13.841560721428854,12.538352228519845,7.186528657064795,1.344729702370846,11.948722896265217,0.14519403698380895,15.827185614981488,10.418884177249321,13.149730865112893,15.622305538458491,1.8827293543423007,13.260324409209542,0.40037097214358663,2.3170570157064763,1.5532742957274603,7.12565227614689,1.164277893304262,13.262534499617091,16.810581881374368,9.039989296617193,13.368861094316795,15.084011818885376,1.8814770511859757,4.091953250848119,8.448704150517292,12.790091057256866,6.533652442680542,19.379748938631547,11.751303682508794,17.14929614998457,17.502874054228474,11.340756646591634,8.403022045134026,15.764034081301608,8.638189517600573,1.9596245487496633,0.3965625760703917,15.747201604392131,15.753352455695513,0.015276486318236415,7.533707734802264,7.623333760146749,14.966205246068629,0.10808964363437035,19.2525719747727,10.56094501941148,13.725799746229153,8.063849904633958,10.572285431366852,9.130711078863762,18.470772421729727,8.085776354766011,19.855743920385812,7.0724529078755305,14.581284794521565,3.888624281013766,11.25402663166399,15.587919040958358,17.784625710505672,15.835665642961922,15.0942637485743,11.113562806179008,7.752821640525984,5.787945732829951,17.00731565770914,3.484620493793331,18.37145598884912,5.736188842221863,8.470081392318832,10.04939988049526,14.62125899288992,6.347626203077268,8.131462988804046,18.465008822520716,10.228625487739066,16.87130433554842,14.378499072933412,17.895486206945318,7.514161920696192,0.9815331126134685,18.281878608991263,1.4063835953828496,9.788301629161493,19.34887453049676,6.853088266382117,2.7968142370191273,11.800986696744232,0.2645097949829589,13.394018703615775,11.743824239966166,6.2771499980580225,15.833307216592551,19.624938614198552,17.388182219183488,14.451057226699664,8.18408291587231,8.583886734683222,19.627637167250423,16.949219822705853,10.814846813404344,6.6683186119355575,7.668748055073915,3.4910324540202575,18.03635258213376,4.653051187931356,5.089971852805628,13.322815857218725,9.22766265780715,6.960805290780274,19.051897071914343,0.7767984796077476,12.061788196894888,2.994869093583099,14.131669113607073,14.85619935547637,7.845529359639567,8.078357943506083,17.923824005654275,10.23875025274867,11.438737206821754,10.07740752966955,1.2081926449728675,16.47337173798672,4.232471531255424,10.336314330214943,10.960313248715238]}

},{}],45:[function(require,module,exports){
module.exports={"expected":[0.0,0.0,0.02567859678217618,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.027609107340450648,0.12599270113242753,0.06500103221903127,0.0,0.0,0.0,0.09411268325645301,0.0,0.0,0.0,0.0792584844661596,0.0,0.06225172597637821,0.0,0.0,0.0,0.0,0.0,0.0,0.028698813339608407,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.028240143715938238,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.03410456825754196,0.02589000175588571,0.0,0.0,0.0,0.02837757042082586,0.04781622399231585,0.0,0.027491701987051212,0.0,0.0,0.027946580281397904,0.026466231725791864,0.0,0.0,0.0,0.028146101842816695,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.06640778005082448,0.0,0.0,0.0,0.0,0.05188653307685243,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.027795830194904426,0.0,0.0,0.0,0.0,0.0,0.0,0.027899705882609278,0.0,0.0,0.0,0.0,0.0,0.035853334762134544,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.18583817669858538,0.0,0.0,0.05801902146528695,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.10667282060285617,0.0,0.0,0.0,0.0,0.034209285390829375,0.0,0.0,0.0,0.0,0.0,0.029886018520352914,0.027211477050901597,0.0,0.0,0.07492037040163077,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.03910008111390205,0.0,0.0,0.0,0.0,0.0,0.0,0.03423009327194686,0.04639258538848014,0.031090537637431217,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.04909261357923359,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.16334228652123606,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.05807835152311762,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.039703906435457015,0.027607741623203855,0.0,0.0,0.0,0.0,0.0,0.025974583449864464,0.0,0.03832489729821461,0.0,0.0,0.0,0.0,0.0,0.0,0.0287183992088884,0.0,0.0,0.0,0.0,0.0,0.2948523982301112,0.0,0.06906224724539867,0.0,0.0,0.039567743851948035,0.02720586490401938,0.0,0.03073025375138948,0.0,0.0,0.028378682426814062,0.0,0.0,0.03577349103851378,0.0,0.08440159466466456,0.03582255072483534,0.029470983767821448,0.027943237474257945,0.030797236891712265,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.03005149180389329,0.0,0.0,0.04941381657088043,0.0,0.0,0.0,0.0,0.0,0.04565428928919489,0.0434122714055222,0.0,0.0,0.0,0.0,0.028684793370957525,0.0,0.0,0.0724603707303276,0.0,0.0,0.0,0.0,0.0,0.03883394679330703,0.0,0.0,0.0,0.027388038271142376,0.0,0.0,0.0,0.03241263443574608,0.0,0.0,0.025734473932564457,0.0,0.0,0.0,0.0,0.032324499856669825,0.0,0.07441364481834484,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.03883386118027218,0.0,0.0,0.057791293478595275,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.028018206596286746,0.07536293089143282,0.0,0.0,0.0,0.04608303171801205,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.028667560578239278,0.0,0.0,0.0,0.03702167280099773,0.0,0.0,0.03912786693473057,0.0,0.0,0.0,0.0,0.0,0.04823936111883255,0.0,0.0,0.025008373909064734,0.0,0.0,0.22287552438169256,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.04499010872529409,0.0,0.035339920311133394,0.0,0.0,0.0,0.0,0.04282964480841618,0.0,0.0,0.0,0.0,0.02702329273665303,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.034660155752672034,0.07850712136580053,0.0,0.0,0.0,0.0,0.02870724500787582,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.025544161989890735,0.0,0.0370516774996762,0.0,0.0,0.0,0.0,0.03197035580602239,0.04964466342306553,0.0,0.0,0.04870824471797632,0.0,0.0,0.0,0.027446591678158317,0.0,0.0,0.03403570368052504,0.0,0.0,0.0,0.0332714407119446,0.0,0.0356775828005813,0.0,0.0,0.04439025223579337,0.0,0.0,0.0,0.0,0.027412111857300563,0.026216208440408995,0.03810719510315725,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0746437059791625,0.0,0.0,0.0,0.0,0.0,0.03288082274260137,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.03055037602932158,0.0,0.0,0.0,0.02761328446420046,0.0,0.033758909582515956,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.032214549351215566,0.0,0.10066608819669373,0.0,0.0,0.03354753874801953,0.0,0.027077592384691956,0.0,0.0,0.0,0.0,0.0,0.0,0.02865371448742783,0.0,0.0,0.0,0.04452977984856858,0.0,0.0,0.0,0.0,0.0,0.025461117689274008,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.03853618778313528,0.025778382484154292,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.04204679947998131,0.0802017676852939,0.0,0.0,0.0,0.05874939420648235,0.0,0.041469583952161757,0.0,0.0,0.0,0.0,0.04905449706137393,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.11269380669115216,0.0,0.0,0.051523639211205965,0.0,0.0,0.0,0.0,0.02663410526613673,0.0,0.0,0.0865262460862432,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.025045108824210037,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.030526571843294936,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.13012912422868186,0.0,0.0,0.0,0.0,0.0,0.03655412657097606,0.07763314309571658,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.06694219975080869,0.0,0.0,0.0,0.0,0.0,0.0,0.10308424431598927,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.02701813560194389,0.0,0.0,0.031762702461660734,0.025451457236867318,0.0,0.07168176338863431,0.025824279447131848,0.0,0.03245169676282159,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.02682095276807062,0.0,0.0,0.0,0.0680093433526671,0.0,0.0576518892185315,0.0,0.033140998189300816,0.0,0.0,0.0,0.03901898122297916,0.0,0.0,0.0,0.02694889282382969,0.0,0.0,0.0,0.028606434576809104,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.030426503797919634,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.12764772279720799,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.025495372105825007,0.0,0.030304480865086122,0.0,0.0,0.0,0.0,0.0,0.0,0.045317467489983485,0.0,0.0,0.0,0.0,0.0,0.04551643165191631,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.06375152483289923,0.0,0.0,0.03582647943827586,0.0,0.05635525352438829,0.0,0.0,0.0,0.0,0.0,0.0,0.030749610026373272,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.03611708433269525,0.0,0.03172419312472569,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.030089214837352912,0.0,0.0,0.02598946744685409,0.0,0.0,0.029320450817522204,0.05365083270012356,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.02642273651322226,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.038793554201531515,0.0,0.0,0.0,0.0,0.0,0.0,0.03802128879064502,0.0,0.0,0.06730620101218592,0.0,0.031168583587498126,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.028706010042800833,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.07047117415255967,0.0,0.0,0.0,0.0,0.07585459567927197,0.0,0.0,0.0,0.026196231991993876,0.0,0.025535816886486755,0.0,0.029449317777997048,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.026030253077060354,0.0,0.03093457067604844,0.0,0.0,0.0,0.04016344511489615,0.03370149440943795,0.0,0.0,0.0,0.03302685949168521,0.028901802106531538,0.06930507080745615,0.0,0.0,0.0,0.02620264869830882,0.0,0.0,0.0,0.0,0.03685433706053536,0.0,0.0,0.0,0.0,0.02917304482118686,0.0,0.0,0.03187691701046238,0.025942136947521077,0.0,0.0,0.0,0.0,0.04234595977492325,0.02784440137361263,0.0,0.04345258171914171,0.02652272892966043,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.10437674275874374,0.0,0.0,0.0],"x":[81.8293684776909,61.931101962139756,45.37244750200411,73.06051900906239,76.15144474406665,1.771468146387023,19.132353635560385,36.78000703945643,91.01429525972517,83.72065738466684,50.62478929121854,80.24030360951862,17.298692089538868,17.40368148865987,20.512602982751325,46.719836429720196,33.95082458133159,75.48325941023668,11.344238033532639,51.53767882018778,82.4611273998423,2.774530703735212,19.942774675533094,50.538294739813594,21.925315744643136,29.239747002263307,30.943982618682607,51.75441553678435,35.19655314637551,11.368523885062821,55.66225484354108,32.08945517968252,84.3451572777794,69.81265301995747,67.80278084351184,28.76003914777041,65.69618616817753,79.3873231655827,36.85010652911973,37.98832139398451,78.23442496922937,40.49991947041431,76.7864810823786,93.19610298174013,1.9061485910525144,73.69239487816506,43.79160978863015,75.96760702939727,43.87780134156885,43.124177296515164,72.86549705597108,31.561981194917756,56.39629017387067,25.142695609354647,24.572478399792352,40.17459386646465,42.26251186755763,47.51707025499834,93.07796930117208,26.149642432055575,47.004832114721594,50.364201931263985,61.31681014283774,26.152507951655203,26.892449461035774,84.49340872834237,73.16423930464182,51.96239144709875,64.43744211328213,43.387080326181795,57.94857253757433,88.8007268694146,32.98203134121884,60.4617098350301,97.82990482843195,20.843235821069484,5.213907348816749,88.84613352655808,80.30468866463494,96.86230868327199,8.244946590662305,0.5994161410344256,56.102991595110566,52.36459440807673,78.06199751942657,72.14139386024169,91.51654114203886,33.673628510453455,73.57886628388346,52.36346030519536,54.002347925460015,33.07454961984375,3.7711797231260835,1.4167438316603276,1.7776130294790748,22.255874994024015,77.92322608163408,37.53443000919903,25.025806755040094,38.826045849405254,87.06459034936755,28.620474164953148,4.394661461902527,67.8425646988568,17.88489927178649,26.848796736640335,57.335791412020654,44.02855536793056,32.16766163273594,26.766038854665176,74.7397992104752,38.84449083585386,21.245955768255655,62.009045579823166,85.43235529005217,19.662795709300674,79.51693069578054,70.14091618362353,69.5498312871671,46.98596069857697,68.36430940956197,69.50884883854545,67.40955348672712,79.17057629109705,66.07285126798811,4.396800964632064,8.27421421324015,75.37979730433453,65.76472166928407,62.686884742567806,21.782928495960352,25.183916546078656,5.028850292622256,94.57187990763781,47.88560263317028,16.332704997683024,50.940563152734455,15.50399847194781,34.467152698408256,53.590958554571785,97.3794616581877,3.7967437215452815,3.396310216043319,0.7186904895016832,35.673300318911075,80.6919723539073,60.94660522446193,23.99087767230681,10.592400753202135,83.72650869886861,67.46676141448245,85.9279087435301,82.37937818809378,27.438382807179895,40.25801127855424,82.617808904288,57.777882869185305,32.95398595527299,81.03511452111134,4.4585065755702535,35.865501273639254,8.62314376065456,29.934421967730263,53.756178105277705,60.3804520243598,11.395114164704466,7.411949825879716,83.42432867021449,43.19766340281761,43.062875355435295,17.036731081450583,88.87375825589005,18.505277049010772,82.41243102071516,72.56521303146172,0.0182654141232641,96.570362735132,44.81784899275054,94.46202825487697,22.668048010449215,33.850649499779585,63.72224911272024,34.24013429334853,39.91265448012915,4.527902059798827,56.460612497019945,60.951195807608414,47.65120558014615,97.03865702267775,7.587153716346795,82.01144572287076,1.1530493176217238,7.591803035713829,47.05745751219386,9.955602009448361,56.09093215956995,70.18869020823945,95.31596205178623,57.246877533750464,80.8321598409312,7.38408537155868,74.45357818176865,94.62368264803965,19.475193635640544,43.09666185187437,85.14254327560155,67.20116350764813,74.61667341731338,47.23796305470924,80.15784928706992,46.384754282874276,36.709182815326315,21.147101231205045,98.2687745689079,56.66667388201174,86.4710221617989,17.97899220956831,74.56925974256816,68.53953046512655,13.510265042371628,76.5987938839288,58.60137425868439,89.17006036233037,71.11229280424777,76.47301203030648,11.353707348728248,69.217489904039,20.40158070752063,96.6297366863615,3.9383086607436724,21.704672788826862,34.556719591352426,10.454252168640465,37.42568028330009,50.78535610187931,47.462314584699804,22.920487780591348,63.39712529776151,32.69199580387183,45.31417378506348,41.81649469320119,12.278550447745307,44.911657734778565,20.14915238872137,13.118413458907119,30.82471074451294,52.30718607652742,5.832474485740957,97.01906437179215,65.85369988952947,28.861321207234614,40.55099339018617,79.22170329743194,85.4251663198766,51.62027262283881,68.96823515811738,99.22380047534662,36.47730713055126,83.88919470329203,82.14420413136936,20.204294786890674,78.38720365166394,4.825381547838026,61.85053753462899,57.8419493481823,52.33570262323835,24.409815170895243,6.6862104877379425,30.494496010735084,23.35231787518881,80.04453063604684,83.73357665333931,30.993728694860234,67.8658050345263,98.58254102016237,17.427803339400192,69.75407899662447,45.36686069029416,41.803218664954535,15.613948533668488,62.513330772194074,13.787842326402956,68.52200032691651,41.03949315369873,3.8053689619243602,21.212092856066445,68.43936842345404,87.33670994539555,56.92369740735759,26.772237787637977,43.4658861743032,96.26339476178116,9.775059538999464,11.107565395349894,77.63751596385326,68.08675225968533,98.71702150100374,18.596079714848933,22.75218391662237,9.146862723635252,60.62733407910095,45.39010729792836,93.193056303562,56.098606910423655,66.39644945496308,47.757744236297306,47.254656005306806,85.82133656588317,51.5486636169284,30.694013808326503,99.29258369134703,97.5089250446012,5.3084630177864245,65.13566209854898,68.84570451417105,86.8380855259111,43.598547580186334,13.65987200564951,15.49634861043665,15.418867309302776,87.65999862596516,48.63608430123274,11.87426633900175,70.68231614027272,52.42756585767279,10.2856981078417,68.98277052274612,56.01937902484004,7.879888909124211,27.50219209974185,48.14727023346539,87.16543538144583,4.700251621008955,82.34324027903077,67.09178440597385,52.861559218724196,38.16095932104781,62.51372175475303,65.38067213046364,14.034186183131814,8.754794638875962,71.46341459709038,16.13447910692509,37.84976410899088,71.27968939368598,51.80995040266572,19.76309026269112,64.35738918036486,70.31221096518681,86.82420711001393,77.49874617870877,83.03759087084433,28.01315704241547,91.99977142343883,55.669988051958306,25.04663419034503,4.767106911465713,47.97968049106491,18.762919546571123,93.90307312259334,65.33467767796417,90.46342031514226,53.63844307708992,17.77862250339364,89.93765099826302,35.21516415241494,17.483952804281945,87.31532002204791,81.57281285784137,94.33082974890674,44.64550190274685,53.41172634855938,46.78300468886276,9.850736945270743,24.48909927779017,57.231130855532044,57.6828279421032,7.923398387777292,37.374833573579316,14.538217569688738,92.79898351809149,34.970296980325166,54.22755049035381,36.91577869589726,87.51575629414492,44.585760771429506,31.78987410032508,65.0042474641251,28.343011984568413,49.66846117224995,33.0534648296126,27.172740378439308,77.36936740033673,96.23006689977383,85.87620032200671,49.91423635136225,77.0125781347129,32.136433089293924,51.29458097445918,71.4930590142419,72.8333375505637,28.151197201140853,15.074418293551407,41.39047987582738,82.66700102696414,11.007233366305957,98.67354953221343,24.111025684750565,82.49649863789537,55.539997893222704,64.65943551649573,64.55517124969774,51.859024971918075,6.3004108780504,30.68126907828159,69.88671308191445,31.743634450791024,80.17864816926267,42.2143069604733,69.84263429308271,71.187941549761,92.82795532791903,81.78729400347511,13.105802723598803,23.650363962920306,5.031164777082253,48.19215427977297,24.348411947418057,0.49336046071304374,98.06300421374627,71.38773857596668,28.334206542920516,88.34047175270257,45.0390505834618,26.532241263460165,85.3420621708062,92.13761826649849,92.00721257276379,34.743864296026494,89.24376088607775,42.05568808807312,72.62334274342919,34.215269029702156,15.802806296444416,75.11018807171325,57.49655289932492,80.8254425624082,16.65409915255256,35.09068859993856,30.548743395279242,23.5660884399282,85.0147421464443,51.04187771949744,83.87354475639034,49.647795515454575,79.1011655360855,74.42319875313217,27.99173669547148,45.84119168646612,1.1582159649017765,67.34971374064129,61.5168920569821,0.24673740731753213,86.87434321013244,58.139489010450404,51.019998734439234,22.57950542643026,27.176888998758187,89.02608008542418,49.14705775875843,12.727391296984415,69.85428663808,76.65108640221582,74.3439887681012,48.43735849089023,79.20149211938296,32.3937084979937,18.242162674990304,64.88763278336249,71.91879497904002,44.76630150124619,43.89355701897388,1.1780223181530491,30.667221347540806,79.49725651533738,13.806341426490976,87.11621479333131,1.3721007209397618,85.49767410613183,54.62931195695935,53.282250008727125,77.41380575881765,0.08543964816827287,6.596181477508911,53.57219609343342,48.21813171383198,82.92747858173306,35.715904592925796,11.915587970449405,39.81698812685393,59.3813698546517,8.904616156485478,59.08595898620934,63.70209370023605,56.01229255307692,71.57554686004808,75.0150750830073,76.93466048211542,19.642776458137835,76.4513367756012,8.868642321270803,80.43886806264612,54.31844238779746,8.317242080904341,45.58942253100731,34.477780712550675,85.33503005303874,13.94701288461464,1.4385455966270833,54.594034804840504,77.12891851369608,90.18890515368103,34.80515049691248,5.534602047038928,4.2969270866251685,83.07827153848515,14.226331675305936,84.66134156212813,73.36971617537533,38.642278480451765,53.85327804960702,10.179795264962355,14.939126783538438,90.58875030167827,35.92994486192593,13.915554994044466,78.32030177726317,53.33296188768142,88.19124076943284,82.07918123876993,78.38022410885247,41.71424387405911,77.61306547172873,69.10792400057319,5.992904814875422,29.254889573684473,38.25790357754437,8.202831979295834,88.0829904975815,50.54504148608334,92.98767944865507,42.1388226649845,85.42718177464705,10.108417360594046,77.84548600118684,54.733924944887534,17.804709685153107,8.175299132826819,97.31997642558792,96.18327210078934,58.67719145669368,13.721989009511116,89.95072899868195,30.31302510209024,41.509933822914235,74.32871535207231,65.37755593162258,15.521260309102658,32.20049987409623,37.05653387789523,86.2930234151323,97.97104444480208,89.21834141142246,96.26670956751802,92.47595696733204,72.39801028340975,14.67850496718539,37.965347876185795,57.36478069188087,16.369139120933717,40.26180016556453,41.18085913394414,94.03754799732079,81.63418035142725,17.604411737537795,69.78336501653386,97.3491719298506,11.06682432463888,84.04188976567737,61.003100923171246,93.67802897054473,95.14217520455624,52.52270461002326,46.60062457796943,65.47806133229895,48.77695140331581,39.802098378404295,60.7179115689114,20.077173247561262,4.603672852569529,56.02526672552794,30.737785720776813,82.48676393826901,54.770557929542704,72.21278516738911,13.78175668743622,25.969317456473707,57.315397743378725,25.734112395221164,78.87161084255372,37.3506636627311,76.11548473898225,93.65900176266555,63.103181316247344,24.532422915612926,9.134887718211981,34.16049612471623,28.491452737847524,33.77110822345808,50.45015505468757,38.74702507519379,75.35702243947038,69.91044637763713,63.66634771687241,20.916577295583338,49.379703248471785,25.24125938631321,48.008367911712725,8.920256595953147,67.67963219974793,91.37542043097466,41.639546260694175,75.84764447045235,82.04867911957272,17.508861495451722,60.22205834392007,13.193779293263086,72.5914191718157,15.757633943780336,69.48955359028596,32.66473120811113,17.92762413345812,76.45410205635486,74.46715011800882,5.145468988614477,60.35883556784416,41.984458689113225,77.40152215299574,82.53102260504595,55.913171640559,13.079844279544272,30.907803422425516,35.127334015627845,97.71582991794887,62.22148119049844,18.274403085102463,55.303068672248614,3.5334843841112074,58.14079085565964,87.32132113888605,3.4696041255856347,60.41990870010583,15.98685584662487,78.6962635851074,89.87731296882066,85.51938908967381,97.74079674661836,75.85436190934239,95.70850419123337,35.44981296551737,76.91185458069153,44.338302369331785,35.25534675156672,91.65318213018845,0.9947659172683254,39.542994703549894,56.33823593829561,94.76004656139251,32.83149016840945,40.02487562803796,24.47128347690084,8.396511702347054,22.989785101318084,95.76842785303626,17.404004868393397,7.243818333530783,74.56736832098878,50.816728694394,11.640219738257196,73.08240612869956,6.91255166996263,23.657520544912746,15.782024410694472,50.22096971682988,62.64776011034363,32.959187456926145,88.48322174789118,4.728264289503503,67.22134095284176,4.085963922424596,47.171681817410516,22.888965309215404,57.50497624790807,29.13976006575931,73.23158638723865,76.2235087720601,73.52403252742444,11.354594065576752,52.538341521023746,67.05207168207818,52.928221485869756,33.37625343360517,58.49463432754687,57.03000470529966,91.05106390947475,18.482357022658235,36.75371205823639,88.23311646645577,36.99916139376123,92.87271487398054,3.310329708062043,58.00813862432268,47.66645303042765,88.78743189943596,45.21404203656707,79.0140944468104,61.21491120190776,21.68303491162449,87.9646236222812,75.32262703135302,84.427523903914,13.918067745851603,49.82824891250752,49.038292543373394,29.698448551908353,6.737013058390429,41.8110907409758,64.89224654201713,93.39841295104144,51.530786481278824,93.21539157123935,91.83023122663568,98.2597911324645,16.70518264191516,51.98223101946369,6.777603755887784,23.56237124650611,65.1154405741309,76.27684163488664,78.96422340114604,85.72822933908857,60.52861103810423,87.42428979485464,66.55873240395182,31.98292297087868,73.45181733515645,4.29672330378903,28.206361686961777,29.57811960601786,0.9131410413178553,96.3684871659114,36.491138826645184,54.48242658663245,15.036579013430828,68.44434298617162,49.970049883037504,49.65045122949392,85.21242423559505,57.02769548408077,14.106470751858335,6.935832243536599,0.5105294671607252,34.82924273943049,28.84533623540961,85.72262208260885,58.08725547252547,77.34494862350947,9.731982054266531,66.31496757948281,80.90684266596382,31.372237835535866,4.073568247190429,11.266122377167909,78.98307524223087,94.18828190122083,51.99276363782499,4.065467651318233,53.566382841680294,98.47635613711878,47.2909637933574,60.00824342103677,77.73471970221925,26.423601830214483,64.294465479105,93.03828520386641,54.417498154962,2.553017437905858,0.999223794447035,12.316730797281528,96.29132643871878,23.027435947088826,3.6280117771619436,57.41436408809592,86.7917471822379,93.3852476840934,49.781677214441864,68.24854468224673,74.56637943669723,4.616161104396799,94.75154331034223,3.125234335069682,33.84387914234068,93.38804304002673,86.05575258593683,59.059571613817894,74.23569725720624,30.831636259530338,63.4836420764348,99.66113698667642,64.61823205801318,24.85610643387275,89.15935946557407,52.674998785804576,92.13307332441339,67.78686287570513,56.87153108988885,62.4117964017147,73.00984684064116,63.96750562079872,78.37309847241718,16.267442005655287,39.86675993363982,42.19899096895736,45.79429084909168,21.37810554550359,96.0396673147227,54.88011053840849,39.16099446718388,51.826608127069875,94.23684220534247,8.429057529597062,12.491246599953998,23.92318904330788,63.95305403771769,41.47250350449059,56.60853362762441,50.56036302067177,90.6422452503734,64.94841735979962,83.75104658817666,94.29422127376952,71.45015594077455,2.478977189975251,68.04694365917459,60.72102823471619,41.46113286390434,0.006920794788145557,67.3372097788473,17.915528669239357,50.15743707341742,72.53614028904596,28.20820891517515,21.462803481747716,91.05721147775476,87.51624045618482,11.600939091001528,4.873664086671159,64.5081688071879,28.26031311567987,52.231745443203145,97.85920796859087,64.40760145166004,30.715150099508314,73.6398234645486,59.34639111152607,34.14538947330821,4.435035525091213,71.09692664166131,14.874588902364327,42.15410254221656,25.543415435954753,87.00227347461372,51.123258254297156,73.83595023064768,73.79797496838738,35.413750501795384,73.42233236548854,41.69457742509517,75.79516184226844,69.73716976968109,96.73092235793597,82.63645438908765,1.6087012238988896,76.33028298100932,33.70734959478834,36.21369799165306,35.05229321928158,37.87511354374848,74.15560281352963,74.74419798147105,32.90222189349199,21.48454973608782,98.5922228787238,61.50869297932342,73.0112599024508,79.97888940963189,82.00780343775185,78.84739827835514,36.81817175822641,42.96208512392128,60.481036064746505,2.5779917289017407,74.17409198444398,53.778440062845846,89.3707692863299,87.43046296054717,63.13856020104278,76.34753792497118,59.573266454308694,14.493557904431121,84.3554067122859,80.66774235701108,51.45883699139835,17.004351129297902,8.708221448277476,75.25696052012465,37.18326692884322,1.3198947161031649,37.86375074364299,89.28768972598068,5.917438058630542,87.51452180730843,32.875452171625106,74.96211126491087,72.1630377238516,90.93204237112586,94.27783987943452,70.59054475225427,10.550447920586436,61.704810936720754,87.89744926333918,81.20564395887773,48.606399953133675,68.22070253914485,52.09754844474202,71.66681921319842,23.315057423150964,38.282485853072636,83.74896091778619,76.10453831717487,11.913945851425112,13.686176119638427,6.440115693871418,96.14881664987824,90.0991060614354,3.6317323535560497,24.708929700871373,24.80097059083819,93.54480602773441,88.97205881351422,37.577603873463296,28.763846657900483,40.67916507286924,79.74784144903033,28.246837089095635,78.19833887839376,18.8362048618278,89.8345767810026,65.96351105008252,74.05569741360718,90.73088290242165,10.124519105411945,16.230080152932324,95.29380703883932,13.691382237609485,32.70284014265636,73.8239379722859,84.04369122822051,78.85838768194175,0.8881565379840417,32.37688910695626,29.04520254586074,65.77737320362044,20.161641885612713,48.26049654335955,63.369379103567745,37.021719665324724,56.52626498477116,51.177693161301896,36.56769095133774,66.79481564695557,35.46354239489546,31.278651121066225,39.843055802793174,83.13993135897273,73.13458401268316,6.512431690615461,93.16578996999839,50.487712414543616,65.56662720525756],"b":[18.972114936829897,42.51078730718106,46.8646444853032,22.866639411713848,30.00870065325048,29.38216509492355,34.710013357019065,25.56382384949726,36.01249879433177,25.23607546167317,12.28945594533895,4.604445113723155,42.7740916472255,18.969340107754164,20.518750666869103,12.078196878909804,31.47579552651907,23.08215986238926,16.103909750048352,33.39276654766775,33.49857739363301,10.745570502109082,32.44211899733663,12.157073906747048,30.184167327223456,11.338504995917535,27.918253193396268,48.39867413942484,28.2588944332729,16.417100432866167,44.55675528469724,48.04490164801719,39.12625952461397,53.26816007422256,10.341517572688176,18.05463181658495,38.3827314360211,45.60809354655994,8.050949091711693,54.38542895359027,38.799523121057106,21.998332577303895,31.82627571140041,14.292039965059345,31.160853513988926,34.996659134342806,19.272378618735683,39.205873750989355,45.21322369206071,45.86284839129294,20.111631206181485,22.757432033161304,21.977352668805857,50.984124408393726,36.20480951032869,31.456503864981826,46.9400417080821,19.608952349827913,22.204907726031546,37.238499962143294,48.233659154022796,9.031292850748036,5.74755404291269,15.59260002991925,37.52050799442179,30.043753700971177,17.864917587857057,22.77665103186296,50.168664968072726,35.020459451531906,13.211477601455051,36.1607294576646,15.428804003087123,47.571030322353394,26.93520914443402,30.46473532294558,12.453815906330163,47.05300367981624,36.836793735728705,34.12118303727909,24.705712698376573,44.00248454964162,4.697943550219406,33.75279370495528,43.66374359144467,21.177425233185954,51.46242558071077,26.614464398446245,28.851061103516482,28.511161706379156,16.004586153694973,42.34051376882462,20.24300393980473,6.17419568775829,47.899084800811565,18.475658875459207,32.98532231784529,21.90417946864642,40.50770845427886,26.396203368475472,2.4254584852488303,24.59820583624954,50.23039902041847,12.58475586931949,30.715093009026933,22.27155370746722,29.00778205507956,38.735508299733965,7.971197448790841,20.921409388427946,27.826719244146968,33.460102973581115,24.68034076263723,34.83288799618569,13.159052701960533,26.334212915208422,14.193489502599395,44.347276622627255,38.07153043109157,20.853884483733545,33.994404103622635,18.253344063377632,16.577057250171737,40.3767673115384,23.665217239037347,17.67756787378599,13.048492120712755,46.73810164733503,22.251389487081468,24.094570955422153,20.22905682598362,31.845546750316437,19.32089120123831,10.643832068652209,15.452990952783567,24.263226072404773,42.61842031906788,34.05893191018239,45.81248375987214,19.428091291221687,44.44435475298207,14.619236957488706,17.472454998946393,9.889682751507669,25.533440284048716,11.074779589648802,42.465636108934135,22.30334541845614,46.234262188857535,33.20316128997267,57.49269174747576,26.66378542601655,26.821439024060343,37.053455643875104,19.22107891012351,34.05800168045108,16.42932238000554,10.718418060421996,45.846360324565964,13.252767695253048,41.21282932697808,26.955193070668148,37.30380013665901,50.275107291574734,16.823817280472127,45.6453849272942,34.53283850972137,22.676668354352262,37.726823702941175,22.26837047356645,35.998825803791824,35.13645728485467,11.554895449255724,45.73475585587217,24.146814736965496,52.019047361385084,9.569296773063124,44.01576458215807,42.506661412834916,25.703051430133954,10.094627038970817,29.13183947612992,25.23647972877437,21.04774830478209,10.640410866666588,25.42450409035427,43.44266493133878,4.14742476473835,23.92793457508603,30.601709232033617,44.55073564296255,19.828753506311955,11.76647620932259,39.597892905524915,17.22189199421616,27.662095495688007,27.99482578061643,32.20205530857564,14.205068693619305,38.10710516365529,10.341373228777186,25.445647583689,43.62214645940074,41.294595554207504,43.53604638289877,45.30072292850026,24.25859663538738,42.259898423529414,11.107751790814744,51.24079010954262,54.280643383070945,29.249951728344726,31.664336903744445,40.63152208884764,6.2002653521874995,18.14722885717019,8.364881569900344,58.289650304744136,23.28292993571852,45.66946260085169,42.672110139629496,16.933963508275856,28.90462963066982,26.22949419611577,19.725293347096077,14.444721010551014,36.59248918833136,22.164049774882347,47.321920394384215,10.533250689834857,41.72595200147305,46.11052309048498,41.01986173305684,45.03843627057964,10.623211428710508,29.44009892055506,45.87215376417662,34.49840681412379,23.691070732079368,47.68120167728125,19.249872134147758,16.915238287419044,45.363767238747805,36.065838927127714,42.50352936891312,39.0004094439177,38.94621113605522,33.531895548878076,37.328010757069286,32.10763646507221,22.382483272533197,27.926281613796412,48.89688024198425,6.770840246366578,26.403074331447336,22.781288679774036,17.18934515680145,38.73151022963252,11.954208825507084,23.33817805343989,22.119087109539933,39.98708727540766,33.57312739843666,31.62009086876344,33.10731737273282,11.151157915091874,29.488185091803352,28.795489400336486,10.325644472220041,22.179988102061536,34.10799937680805,34.9099026734937,48.552547703606244,28.63083636153383,20.347563000378198,20.48115460819845,50.86293366491228,37.96726479312066,10.372142037192807,51.98879181376437,44.25516332730946,32.59860879895099,32.3370438521794,30.92068911379177,11.975019424210323,51.7066133701267,13.728610201906246,28.783255274582785,53.022155098527406,42.056660370165325,20.51388499175222,30.54954428255506,44.29904223630621,8.362035287589995,50.03050698901056,29.327920629061083,53.31006275780177,40.75529824258536,21.18791322248796,17.807418676107936,33.54019679490528,18.499985912508635,44.52015171138734,31.519755760195185,33.842417447481985,27.769890943060243,22.746468036673235,26.31145425522976,35.64103614694026,35.775607844082494,38.899448285647956,5.856419442268153,21.59980036007891,32.847493591737546,33.969190297899104,7.449958624181465,26.684406639876826,37.39788937422831,19.648306770037728,13.548266691967005,41.424435448104724,28.009287322618544,5.514265624708523,43.07266262419111,55.33101134351725,19.0190304456419,44.43432625124906,46.0120311117563,24.709807106618985,41.432834734019906,47.45402170173973,38.69823501463552,16.311190931973584,41.70521249849276,45.18800423938765,36.46780065775629,17.337036209359905,55.179629575091155,41.25455073126392,44.31617175323183,25.223052126090685,16.45157355580561,13.346936676718922,39.66852490058875,51.44269399976244,39.96077236276359,36.84366721159937,36.67259859101368,29.518177774209548,28.137606850771526,15.141760617548167,10.348422871598828,34.49741559913864,11.30046565430671,24.261444857111538,42.49673686864844,42.56545594164541,20.70465314398163,21.74100439813911,53.379855960869705,53.57874833986165,22.34766363874604,39.51706584707665,12.713624506432764,40.38772967700628,30.587160093454393,53.61778403662895,16.770497627490762,35.03974347428536,16.641963477881717,37.28472787901019,19.55035506822312,21.311401162576395,42.16359910356476,14.101784166360272,38.065574803308905,12.020223645410718,19.906677698527588,23.736385611825995,23.22308092854289,9.685695647816015,47.70979101229155,37.92715323243146,36.73241554007184,51.938341347173434,34.79961025726921,38.00588765648549,52.77460888967818,28.053009912705615,48.43117687232885,26.18854765619342,47.71792104006542,9.986996330887736,55.441965649645354,34.69997272566133,16.54480903870676,46.08224718531919,28.75096754778807,19.71358111639179,50.074945269714895,40.98593745156418,33.02410660017349,23.88767656965448,6.2859960511856405,53.49063571788247,18.903470387928337,24.998012669976497,43.97722589476429,23.419963959162384,26.177341964417348,26.428120123817262,43.52458602245042,30.42875007985176,54.32968664805972,15.178965066530692,37.39767311629928,41.21574338829315,29.829640187458985,44.87185472289016,15.886904808904735,20.743080919520956,19.563472511226692,7.389755867456795,36.75854391898644,24.350911438512014,48.77419410048472,33.92581911030661,29.265700128636812,26.388021546974386,27.061041701090517,49.37756457462562,38.31754477016034,23.415475316222917,33.84243355252634,38.118137952777545,21.437083620230275,30.277344391360415,20.570894159333186,42.136441099038024,40.43602814850683,43.18721365397958,32.8912175101352,26.302111513061313,31.69192462104817,49.538782443098484,37.86006207376704,42.45330156286481,2.547172167885998,52.3575510572913,56.23521254896768,31.722743548167507,20.80133762665094,34.0718086609952,39.00379160555543,33.85065933848659,41.85940749599631,28.050109330493846,26.824647609527005,16.017687070031702,42.672213500907574,20.309922061124198,12.641765929924134,16.056809912963836,49.029934490250575,31.332712962320475,31.103630251366255,17.27497249854845,22.923265848287258,50.18008706798027,19.65058068320333,53.73020197222185,23.471507441416406,32.340624772178685,20.285927888884075,46.120706621988006,15.428337987359185,22.336696313142845,21.144551063785983,7.3033398076190625,26.209031840829287,41.95201497563407,16.195460610750978,34.59786000662527,37.9170943173056,19.99107603309138,52.95725097690239,43.0326454454726,21.69373659394249,29.616129019782704,20.678109285983837,44.56519129000889,18.90611906485075,24.010630468713735,34.99409862403504,28.902154374048497,27.271544629131743,34.36664629263419,39.838505093876634,44.36787646184139,45.92587960566526,26.423401945103958,47.78957486960995,22.533611861864685,39.566432531356455,37.69981143468714,17.835727242048407,16.30538089145599,39.93213976099715,43.871343126127925,26.558127454384625,9.965369052968068,32.84262779857387,26.05935028841797,34.46596567806342,41.292961768463655,56.61909022254738,13.864331543328792,46.97556348171429,59.23020670389258,24.863894177453965,52.387934687238015,52.02784480943213,53.53154399340004,25.82031545847623,35.7101011373882,18.787937324525135,32.426648480016524,35.319613502898505,42.741950718784,29.038740099641732,17.670431206825103,38.22901971031336,44.80163772654223,42.59124205120518,31.714863053848152,37.09275085161192,33.529720082119205,44.98329972052199,46.73790742631783,19.321597575811147,16.03653425445135,13.3730657853326,42.937805928175905,3.10901295342771,18.030048699482776,32.435418667566964,50.63880474378645,44.1706933292553,35.87586328207807,36.228942029508886,15.84474413403821,17.142453423201122,19.652444420764294,14.622565122533167,14.278022262056451,24.86327541590162,37.614602631321475,16.569406529439014,50.46294981388958,38.755831546892125,53.5763154411,21.286293149173492,23.41558187760842,31.785740756561694,24.959328523714973,48.730681600172986,16.304897062549827,3.639269113783392,39.16130178469673,23.928371627090762,47.811701201600386,23.029740665140668,11.802483801927934,48.1589229587591,14.447549991753581,12.892249277299781,16.41373178643488,24.86723541176022,42.7034341735682,32.12378852160951,39.16209577658375,33.549158788513516,7.471885980252737,24.418054624758476,40.62773948364348,50.53824152751063,15.639091566453054,14.765649713168605,47.9004010569061,17.422819514780223,26.785482593350803,18.547182888036467,23.88011444581356,15.251777790925715,17.10435453912585,14.57321836048241,41.860011851778154,42.21027932934162,19.229170047226155,21.854189439079267,36.12170744554657,18.476367818427043,13.9044705454533,26.32312133798068,8.074918602350234,32.21992276222218,9.631559005780597,42.73947637179243,17.113721120343012,55.34132717638323,13.038629443983364,22.549883900046655,21.738625515574988,31.198072411314143,20.11684954809784,1.661243380228572,19.1171440767407,19.187023451826406,24.626058216763383,15.357767977509432,4.094464184202433,46.506732663150544,27.178911010490907,15.874939194241335,46.98941940701742,12.250323955903646,11.551553232318565,38.876044135461925,37.85167448515881,22.260963893252956,44.49501994028999,11.128078384020457,41.442536775153584,9.730986024427665,21.982594861610465,27.749672302497853,20.761804971895028,31.693769350747516,28.696947055149664,43.115388674056256,39.813356458406986,30.711596977012178,38.40182961580551,46.64455759206289,17.110036517034448,38.13257916257699,15.92597092435867,41.388708341374524,17.599492044463926,24.87574721626946,45.381513323267065,2.7305842691318505,28.1468706552618,29.829424709851196,36.18768732000582,28.200683921450988,44.05855824062701,16.864557024034266,44.83764189158051,36.438062181416335,32.22512720177242,6.2300515692292535,17.207351633413523,28.623683551870595,42.24982994135418,38.843382471455094,28.943134564958765,16.73564384737865,16.36150832621995,31.962260973951842,43.510118427086766,19.09699198362574,9.443573126610962,8.365179096936712,27.492858629867786,54.719849262216066,38.70722964157121,12.197433560688328,43.10584004718651,48.71357869056724,18.72394343795573,21.29149380085397,41.805701173696846,50.57527006817752,42.05897856694939,50.01914847270312,32.65748422436541,39.410941857714306,27.201539456957562,33.97261199827322,15.088874293264176,14.757053271547655,56.53763251766005,19.622825306591665,27.10053308205886,43.59934051558154,26.510249317214214,48.710166007015026,14.10769522171556,15.684342845231235,44.23161634607658,36.396051956672096,42.29702344972096,33.7925640059513,28.307339670794633,41.841990666936724,34.03216371098666,32.88999853598872,19.669664687359106,21.094625966516617,15.471105335196839,46.53827434005021,49.98892964104758,21.177512840689047,43.47977423800407,37.69411104927887,17.799942281237087,20.210767106281068,16.94229073971912,36.49137086534057,5.167495309595753,47.119071054435906,10.371645820631269,37.66305907122534,34.64474120170259,29.4341836810863,41.28026973107826,18.376116573528996,27.54100232072014,37.70382343702727,33.716911719773876,21.1280551133707,26.44312758425308,45.65088194010187,43.75652732194626,45.80914868227984,13.719956462324738,29.399152851549662,28.666800196909797,26.280387186949152,8.330378782008673,34.02107939333216,18.558973990250166,40.32357014029037,16.95233869276501,17.942952559974906,27.215333167951847,21.168136724515342,6.1583963856846236,22.612114942441956,4.627142632001902,20.277573778775285,34.96847953335535,3.8212379535682706,41.118785940146324,28.843176288963665,34.2451293438276,23.250275986777865,11.021751473277192,28.58391897813687,23.29544629439259,24.545191059514185,37.662641485245736,31.648978201227628,35.35067411102886,20.045580861010322,20.10765334639854,7.4457719799365885,37.01069063803918,27.963343921448974,20.0104346158927,27.103817287955472,24.186477326815602,26.42961252191714,57.305131329446624,45.7450331911853,40.5071756613865,20.129430899109522,39.57630792844061,18.04418348836223,33.78461908708678,41.509773923020084,28.122079671341268,38.77163547811588,46.02097157622045,19.91808057893381,10.26080324338746,12.781905920151363,40.96250391596805,52.13210540194897,36.84027544215197,43.35066820018841,4.772521934204597,47.17947112956041,20.032460063084216,2.995036292148252,30.238710580678045,40.38771267244648,39.5575885166011,1.540276194378869,42.26560190455022,14.757655316388671,43.33382580080324,25.829853723057635,33.33626171054011,36.47190324757539,7.2723635520482866,15.925890972827013,52.51571660735118,32.70645544992539,38.09165652091026,16.13967276287108,41.16826734685912,11.34540682741069,35.81514459107421,7.696578871438677,21.067511327340927,31.217548752466286,23.12467991866948,31.584417849252397,11.37587839618282,33.35738379651132,51.60127114390916,39.66899647822542,12.35989773857563,32.60979001493831,16.386601521348485,9.531973672987615,31.22465950740328,46.8092978099248,31.44528848046783,9.104937596265028,23.914721445215037,7.547345132435037,45.00249401202377,42.68427961713812,14.83100623048157,48.01993827007423,20.898134056625732,10.183056911853052,36.76435483745679,28.866724488472425,14.284176349064444,44.545686109501844,9.615162948537343,14.097719605060544,12.894340610280729,35.551100188204835,38.678769544848976,25.681229412165052,38.29147114890739,16.579719574474492,16.382268395468035,36.19720058442582,38.80606768488052,9.714068738191802,19.03707838529686,32.056276293634596,38.26546076333787,30.589246781857852,50.71245870366522,20.24396331164482,14.657692207537393,36.4323421026528,13.812688347500309,10.931751523163621,28.878879264401164,46.90190365736978,42.16809510639569,28.672760787983602,30.635745924462363,27.742204632517396,16.80714885287051,17.979536661337917,31.916601958875066,36.0935372672541,27.37295308690254,37.97688025329722,17.431550057242728,20.46742739994822,33.650738300079404,25.394619984349795,50.401567619109485,1.8829201694673214,34.410265190328275,27.73483202316391,30.39380092480979,35.753194968736565,11.415389958030087,31.285685083164168,38.313790133214205,44.1601187508441,29.880040825693797,32.11924798248711,9.189638431164578,34.24519468961787,45.93196948626335,22.752967870110314,18.328164929612313,28.54931715145003,22.701714489741775,19.378994091033096,20.324532526583955,13.673524700354115,30.157754842100744,29.941864738186684,14.611483201205958,47.830677056401115,15.25391919465386,19.441606705108413,41.09569508176215,49.438971770442826,39.3361736398635,29.95389892301513,29.960349148513167,24.093264870447264,10.130259600329957,18.5866941012376,20.68342644899843,22.104165272433814,46.329469419819986,29.444173806838204,44.51179844782596,38.83271739235026,14.756188272279127,23.206919338085342,18.55807627922829,42.06304603604305,55.68642857747693,28.856007369080302,42.700674393562366,37.835118281462236,49.39424802541865,51.981945752164734,19.256140887998107,23.618275345833943,33.525883877297986,43.14428343384223,35.64676343010739,49.8287811282902,15.963449390768275,45.27251081517866,29.62134993527389,29.399515917401782,55.00969343924061,19.89630250293647,45.86989556363857,20.69542702417975,33.4052739064887,6.315228641751118,28.33239226057173,35.59776579427229,12.36216888930134,30.124592127979025,25.74867715932829,30.35366622235559,53.485669016266236,27.8726694475281,37.557506026088745,48.41827170956871,22.209652823550094,55.14536285017452,8.477679075762548,34.746034088912445,27.778610480144938,22.27631245491252,39.83776624821709,24.87769949444757,24.564897041577797,21.58507014743483,30.385987314017164,40.44777231226622,36.71649395492419,39.8806176072733,34.22930145782472,48.17126922115524,33.50811900807847,22.689605221639393,17.411371403436036,26.247386260020427,41.836212192080765,41.071855208595096,28.38987448346564,26.939453937129887,49.41568549214545,54.89679418060895,24.649125071236906,39.141968099907004,32.36026134240976,31.614627940612877,41.86287473294355,32.523988008008644,27.15397173058043,19.007746216064678,8.417135608224875,13.851279048107857,12.72877323915365,34.05385384439585,31.401513312637537,20.536913875901455],"a":[2.710275009649812,11.282671708913096,7.921706579361554,6.7728592824694855,18.82508709642297,16.607256022042435,19.55563166263241,5.124679830101977,1.6089377092907053,8.176419057114597,3.767894291572955,0.7444131811986532,6.5541593013911825,11.03237240238743,5.134379590570779,4.934754777177979,6.483740586696691,8.455764313478586,5.478349353740843,4.898346470560231,13.654044454099786,9.12923639895386,19.825173231398313,0.6748432104759461,14.120355692836707,0.4596072863539469,17.44914630271063,18.291316904098657,9.079696136470904,15.139262540563925,6.062001564173669,13.20025534970286,2.179449880336919,17.143182314677503,10.327744863026918,5.466633392006388,12.340268941340451,13.029461607296454,4.814748595928884,18.97484428876728,15.43098795002551,1.5125379469372424,4.81497590917193,9.925924028107286,15.437954681917564,1.43280556577837,6.272936881579603,11.145266045442362,15.891638605615356,7.237899292065295,0.27753080389687934,10.686355622494919,8.007028755548102,15.745025881970358,15.291405721675243,10.95354100317146,10.565429453409498,3.388181702229609,18.15742175475478,1.455946607462164,10.449662914562673,0.9685382760719907,0.3452600513043569,7.02535362571715,1.991609336108473,7.040040276238204,9.5775503133634,19.826430388239494,12.094961920299859,2.9448499307866616,5.676087356355057,10.251787599315865,11.983923987512025,11.187883918261727,1.5523731989955136,15.406258752359111,9.583479434190778,18.822377126353345,4.198838325307204,3.7285798229497447,5.432889083068981,8.052416656604091,3.020847529370543,14.456111669398695,12.982242843196484,7.33004298353479,14.602334411947368,15.794207340859234,4.98573420275223,1.7023199749753903,3.971293371063087,6.363894506582852,5.903706469658352,6.0371818868689076,11.244318469090476,9.536569151126306,4.728080823978917,17.536604368401754,4.665036699687719,7.69580521455536,2.1667003807851692,15.46993074673126,12.876551320942525,10.314255327653408,2.8236846746445776,11.275274178702244,14.153974676104287,6.3523603090145375,1.692267639134819,11.53694111398195,15.91870880047868,18.225024109169844,19.299315088768722,17.55496729214554,4.520991006867017,9.09848617000117,5.219576776913204,19.984053407545662,4.3430468321299065,8.204614059169568,1.2581669763600178,0.5637243934366953,6.290281743090076,14.712415851771418,17.251908053928272,12.739220985951004,3.674032962807776,9.306217972142093,14.676751191143943,1.5472246333994066,17.661208875540307,2.613717187806075,18.344854401477466,9.760032217855944,11.66303266212676,16.736781771825484,8.31259750024238,0.5984694762525544,9.063284216995173,16.511470215177113,16.22048071842518,1.27173220491966,7.547435306470214,3.9037908042191383,10.261248845086065,7.811374138521643,16.836966306717663,1.7456922167817002,15.992863012498972,12.998238923359672,19.07394365532483,8.955600199783529,0.46220497747567535,11.478061130321278,16.169419328680085,16.605403555194194,6.8815980988397785,6.996195659329421,16.608669845120257,11.21602166202463,11.998769287604883,5.40002446718884,5.139673171030159,15.2030171936511,12.77773484750378,12.816271509214667,18.987519247260902,6.033619717599397,16.986751662297333,15.432324341120363,15.629162689685291,17.441252622325962,0.7919064945761889,16.42580307668915,6.2469409740782655,19.156799979269294,8.573206090961175,15.395646647476614,6.930054246694142,19.580938036857862,8.169923019690653,7.357867961435813,14.7727084072773,1.5227622354384707,5.259363640789405,10.225495667256098,5.059459498077614,0.360537801040417,12.073281638471979,10.476750572476451,6.321167448094456,18.163477151244713,8.94221574509254,8.463270131889669,0.0037724406341688166,17.73408857180535,18.760854986122105,10.813472377183633,1.8075838087664575,12.670014129377861,8.859597090179774,17.1834344143573,16.054799773416267,16.108156994928507,7.3143222865128354,16.52815308728887,0.7286798969217623,6.230401850329885,5.156738473872169,12.672323287292002,15.781469683897802,19.62066345783454,5.571638149230478,13.97265910718923,4.757218681859361,14.343694838350128,2.6946531656179484,18.70738642170319,13.928244772799442,10.848580255484123,4.852206593624828,5.042465661837028,4.223436727562877,17.937239391903567,12.192552892887317,11.053193568337125,0.7927333465588182,7.684358773129927,8.139856961481788,9.198029150626716,16.452840556409768,9.353742759187353,11.96601195536758,12.497214577778468,3.428667873996254,18.18948382133508,10.634436066080335,14.048181228620003,18.39982868753474,19.727541831128722,15.21475602578581,5.067120915074437,17.448390478412527,2.1341586046040995,6.716695401616857,6.529964010252627,7.138307801130894,7.111092544470137,5.581448800530944,10.786198465688281,12.950435567785835,9.011674787796608,14.723525053426592,4.188015474194335,13.298722713783553,13.15441178542239,1.498453018795316,5.4552919797802435,0.9969013364597235,3.4597555228747146,1.8818322404371868,10.651949835573733,17.806075881067148,2.176841864233059,3.1586476341010528,0.8742120839257161,7.584438136822884,5.760527910788711,2.090716717520751,7.00052305169427,0.9263640893531022,5.437125045682718,13.690870749277217,12.088324439702314,5.2555042536175955,6.680507579746808,11.907024693904035,1.4793832235817117,8.725197333038462,16.915458245174882,17.61389878498484,6.847942627354229,3.7686500016122304,14.28799333500287,4.616150159100978,15.194323219953446,11.677742043998656,16.711671390965705,19.452889993552777,11.204493694779135,1.2989897954404572,16.510063581429826,5.440660960650989,7.9280234325246735,12.75104949747272,15.099960836212162,14.53596712539047,9.819011387905366,0.9994490853071403,4.369023037228077,11.200801381110255,17.513183509826895,6.665858946080556,9.416006979254927,5.6206715539107766,6.679079677773401,3.3879780953818184,8.205873771469054,8.04663220915816,10.024884902630419,15.704147360849191,1.7520059677378574,4.296155817663889,18.575191734038373,2.8836741266181942,0.8057139755861575,6.7157031782405685,15.266881338411533,19.38567733896486,10.726247969851329,1.6568484395237038,17.21681604594523,3.900791053798711,8.634819160060392,19.63993323816378,5.74990744085071,16.20434763305703,10.032868616150484,15.540617687064277,19.732873539645205,8.208845404193985,15.878137824239115,11.84931991593019,15.972945152635347,10.224476897861084,14.89429948840498,0.8631143223628301,16.554782056198004,2.2823950138776627,9.433538566818633,14.671191398325032,0.9376731509639136,6.890762493879792,12.657319724223782,13.871731055245228,9.866305633283803,11.28643451940825,18.55519184462242,18.235180648810555,18.184428181151297,8.006039238924675,0.37676976032902765,13.767456146802486,3.994124156095311,0.37079424806725214,2.510130636824144,9.68710578078598,2.3207306539566375,17.254194988383475,17.902003875138423,13.702632766351694,19.881765399472965,19.945997680879795,6.7781002026274795,19.65638147529463,7.836684348702887,19.63383020393321,9.275783185656316,15.864269591525183,10.026080561322562,10.304529685321903,11.76922453647013,1.6251759962366075,17.206291332546716,3.7081736161661016,18.6790191608699,11.888297945220753,11.159776753124188,17.255183501117287,0.9959730523224097,0.00603435284892484,19.413179384535198,4.144536685100002,3.409503371019924,19.6972414287924,8.963196365055452,14.657573551309993,13.637531366113983,13.9102230841746,12.68793247378818,17.265769005810814,10.712808090093544,9.802133039452494,17.478972040521793,8.470681600696386,8.436020595465127,16.87362305378055,7.194657831278168,1.1093201193162683,13.74486323336614,18.26041966781598,4.172534000909924,11.149978605408112,5.559719820210929,18.359451753057655,15.257376920640663,10.457242114953917,9.1428138943912,14.910455456776894,5.566177215686312,8.586448704801395,15.271720283976737,3.556081548101089,17.1073500658939,9.057984233764902,19.508550140791613,2.067855099933702,4.849355815327483,17.88252340290501,0.7800051219336135,19.93221872109896,1.4171121826778599,2.742701757694137,5.479567667754792,4.207759465093912,18.516015876530922,15.199745546621251,8.735294941792976,16.692798255835804,10.911693562124146,13.298181205450831,1.88314840772279,15.709540327977521,6.598416422559477,8.737226384547148,18.712240861544885,4.891809397414835,9.2581591300228,12.08063411857879,9.142279240134386,15.158408967589597,18.504708183242883,2.3922897514903596,9.164456322644,14.163673507448724,7.2178141771514115,9.362265979356504,0.723068705486245,15.87732635932905,18.09087133833611,5.480980088721807,6.970768682813069,5.454030167473172,4.885992055001025,19.482452832366338,17.207413777456363,9.714622851911878,0.6761057370542645,0.61929790564482,18.634499249293604,18.385987590622825,5.234426824888692,13.16858447040524,12.850707151068335,19.677913045549698,18.823505807337575,2.5244775774509876,12.825782561445624,13.908039144977016,3.717067200463169,15.837460851189027,2.9227131253014704,5.002759285140916,1.1401243821375928,14.643393858507348,2.737281042532893,8.35289394149385,7.7475742271969805,6.4014173469422975,8.702044388096617,15.884126807362108,0.37599876699381696,11.169719431137125,7.5042300216573565,17.19726445556371,14.768811407912903,19.570254751139018,15.02455079339969,11.278899404464457,10.368685238344959,16.668885426098093,17.658801783162833,4.184984018800981,2.2612772983589835,17.522167842800584,18.043330108966906,14.377349754972638,3.624051818806775,12.3106534343749,16.30406976741417,0.4329641187209132,10.281185957513475,6.321077504221706,15.081152217708418,2.4022915012587864,11.113755705900314,10.100103777798859,3.1335608490723033,12.829468565114812,0.578126608191325,0.03153713485402054,8.427649502979083,12.452357288966427,4.657519594696584,5.1630566409710354,19.688184926648916,3.511638786460587,19.3741376260093,19.930159665727857,2.1191612321928854,12.884337996948588,16.717547669878122,18.632054768756504,7.526504326709622,7.198122462806249,0.8467144394413095,9.969766739287568,3.272639360443952,5.881250266882705,5.085758713691688,5.404095780526941,16.20469959447243,5.526064195013034,13.781928161240753,11.845936179012195,17.976458918678286,5.728029922068485,6.703490188438717,11.160360963601335,18.175938039034143,6.483761269288837,11.068412467918215,16.915043119365517,1.5329296453003494,12.82233564369836,6.4857838560604275,11.846611299737365,12.428427303158841,12.567121980442625,3.8624754455699373,12.997054389348119,1.981926650609771,5.8988659167425395,13.500749511913877,0.9898410129174717,3.4572809781212266,13.831579610125653,4.10085341819177,10.918924663318368,17.297827284222794,15.221733183253754,4.264841038784564,7.8069113637221355,7.671681614961088,6.957697131637093,12.05663318796146,8.641016232084532,1.7173352738748449,18.77581095500048,12.25780214947346,17.170729718401073,16.457956075875593,9.335509440455949,8.826455330529669,13.600194511375046,8.240263725303159,7.540129683875749,17.64039389422351,16.22912680039573,12.715221593702983,1.855708922341277,1.2423330928361809,5.694686693213522,3.367114847265782,3.0818940344469903,14.24118547885354,13.211916672345465,3.2084627874435334,17.31653391425545,11.930600074607952,6.297789453782268,18.462893239135898,8.732940166422383,2.1659604970339474,10.683080157815095,6.85441928765901,1.9320559774821433,17.441420449251712,8.715631125221165,18.399623210754154,6.588058837940207,13.925138046687358,4.826574779715962,0.7581015346507902,2.964795767538897,15.704583361195716,4.3844519940282645,3.178802204609199,4.011199118015649,16.62631385094883,4.082824149475495,9.900963548455316,6.102496929247403,6.721140119577784,8.719288711658892,0.7096330975362752,9.003516811816873,8.52536504986075,3.2791461764177665,6.145632527543943,2.4259207017503126,13.882971053323537,9.727001227866339,6.510221623186556,14.231073493385239,0.7393002719042485,3.1336893557122147,9.007808157926371,13.377323419388766,6.374179242371882,5.78223050008396,8.187184271492,6.783360156445695,1.5296921430184396,14.297920074722219,10.363089972455558,19.620375301102975,8.01544015930868,19.61590597466217,7.460299016839733,12.456663964104603,17.83050057766808,1.0522420467142979,19.747501485792696,13.926522295713877,18.681565500491104,5.6117747233001,2.623906387150501,9.539736854790487,18.821118329309748,13.877878160337893,1.8271112201145145,4.385575429487671,5.923366302966864,11.458972652416715,13.262423695129106,13.047227220857959,13.742883415285139,9.439517136742936,7.985934293324868,17.597859489350107,4.048956936197046,7.506548114549378,8.775441354519668,12.832710864363701,1.5437352005011773,3.8539221000210278,10.199804965279991,15.80765568829042,18.032896343858525,12.146005587617633,11.336617799094345,6.6906298148812215,6.283500907132504,17.5068050341024,17.7076728954629,3.572545700297809,4.751035535976045,11.62237288292198,9.423097572202614,6.235031856399078,7.340944139033603,3.0824523005878524,16.494484825930414,11.243948853444433,10.3105378426072,9.015448897652174,13.240027419564967,13.837012567613787,12.803126903750691,6.965703288966818,14.496535456507388,19.289153479906638,8.205542491893736,13.342029025475979,6.31505726705861,15.410814369988604,19.007144164575536,10.843469907590038,0.9804808359418393,14.049593467573427,19.05056660389441,8.8592819490274,3.6184577739055124,13.377230169099024,9.735822386475164,3.7630414185980365,7.26144626074178,3.1453069263616085,17.635491433529346,3.869223876710266,9.430998485075378,17.054951147316892,19.814250168963117,19.560088411776594,2.7369409302634695,17.639446369446155,7.910571109517277,10.14710366623559,8.814070999562734,5.032373842032105,9.904426772129447,4.83654616152553,9.874127420180855,13.099289092366853,9.21762965840978,11.502019408772362,17.987307220244958,6.772238006477926,15.331202718785239,0.26800141867513894,16.942674938103956,11.437539008649832,8.269052135958251,10.890444296384395,7.464340200154753,2.5032173402783187,7.902466339381196,19.07880433405737,9.422758576614001,6.286492936414141,2.1601144806373984,10.827500660446653,19.754995637139785,11.891129126229604,14.36066593085374,19.3812725354039,6.263007040559927,3.2919201371825935,14.810597905746082,2.3412058487209952,14.856362268738517,5.636373007188373,3.799023454288313,1.8959812739015502,0.7166283389096328,1.2467089302938739,4.940341748439443,4.0937016114002,3.057763420032873,8.289011290235342,1.8730038051127273,16.291050634779456,9.58243178132828,5.749790246746658,8.088394512473949,19.21584231544439,2.035767406217288,19.168425382150716,5.993256115633501,11.377278275659922,19.67442170218579,19.733498663887183,2.550168097819081,17.737328122330016,6.593778108003758,6.342176769901733,4.443531579506956,15.156107873072425,5.442760992967832,5.872303512712147,6.8105893950541985,10.377505076051051,2.2335975399883212,18.152006654148764,15.28756020818237,10.252720830622707,4.756464569402241,1.3894988092224736,19.61136776845307,18.476400898851345,5.647520663764238,2.1385733855313527,19.673562483618934,0.28479147336107236,1.6460514760498635,9.718547358515943,14.498827717143312,11.869860714754621,0.077227672370217,10.743917615577576,7.701423775009655,19.79852409568009,1.5131117837428532,16.8666322045786,7.709207758827601,0.4964028755636729,1.2395820382416023,15.719217838462555,6.779049734298717,5.207019344383026,6.556074701879626,19.631399525797136,8.981683461830073,7.3714796872096855,2.273024709264777,6.398038066664191,1.5199631479446563,13.508004209776598,15.645758026898577,9.768038648702287,0.4402038525397467,18.21891038793682,3.063675740680556,0.5382295458744046,11.649375709949098,11.158959556430936,2.4749558012394868,11.108464470122357,16.39444851538924,17.924676830216466,1.5143040675994968,2.206338830839769,3.236625175356007,11.767994361385007,3.0485179092994663,8.85740153207706,9.542812794344421,14.695827031235318,0.11219220369548921,2.6584672362201234,10.227684800320539,8.721682248183464,12.68689796729051,8.474887111625623,11.10709931624795,1.4984985151301489,10.384886551206245,6.471219213960699,14.909009131624531,19.76316678846488,11.64509397175781,5.9889829838415,2.1653051521631017,5.478108219145259,9.000105870367797,18.141176403123808,18.546486037652134,0.41926722090944946,11.334566579128271,14.698093003331891,11.330218934521001,13.5556489530186,8.239669127883307,1.7868965649873791,10.139805932294252,13.04716650534495,10.748728292894825,16.390616847893625,13.349466349473449,2.9445313782354754,17.89244423329852,5.697351314827004,0.5118118428729224,19.732349894127424,9.792482468552857,4.559064028755531,16.9731925110179,2.574078012149168,8.697034932324215,1.567150119283629,5.4599432351662,15.400615774389248,1.7084745551579639,0.8614101064172086,13.900636361999812,14.778960468549966,11.405573910583033,1.5872988034772373,16.490695332627553,5.523309923211843,12.788109394978925,18.3633653594417,2.314279919492477,6.532055117881899,10.608263693866542,11.096058870019782,8.097281988769502,9.875468486327454,18.08023185912846,19.03929355343497,4.201542639967237,4.40875916536402,10.115105402510945,0.6913553495549429,8.695001627759936,10.947501950850182,15.09291218429205,0.5509150771582361,12.909359665379977,14.42872081067673,16.376870203575194,18.740172111106844,13.564844393327755,1.5032598978526135,12.70751292438053,0.2913699537119685,15.799942636531735,6.165870730411611,7.913966059417326,8.000454914921168,6.053645641433243,19.73210962138085,17.08077685787389,1.5730714018366942,7.847920053838293,16.683187334415983,7.506115412206911,17.51299965435466,8.73835805118533,3.539992577693458,7.339404632323103,15.437604019656778,13.954975288896595,11.166803942294017,4.287776102063194,14.40831689320925,3.6291546894809423,15.068579172348464,13.582275809690824,6.437358419175827,9.628256727479991,0.5744824749156852,12.217292344001738,16.592856037023086,17.8302602595876,13.543602418272078,15.313013786889563,16.606287650823333,5.424948278775692,3.434129745010983,5.925491091820083,8.228760428995127,10.882195751013466,4.918996544594898,0.07528022408171964,18.885750425929984,13.44371081074657,0.15305728331278523,10.49440573036395,9.22468374065966,16.98128213017684,6.647713718705561,5.37181681328553,14.84506130374989,3.767486134675835,12.703917703948267,9.452769287111881,4.589552168372517,8.667949655500236,0.9385620778640913,6.1695539730631666,17.04248767250435,13.681403129955685,2.8586391170535475,9.623943608661477,12.022752389836402,5.689153471827093,0.7066676053735144,19.629658838324815,18.221208415683012,5.1579927921571445,18.792500793793696,3.9258616386662837,11.712174565647322,17.831491790399884,13.59272581471215,18.87140251862704,6.943330787494761,5.012018325454561,8.610766228800578,6.714080089996868,3.5761149329744146,9.323523280048613,2.381553632062241,12.935531975789957,3.148094885246797,8.935686463964153,6.510316102008709,15.06446838376804]}

},{}],46:[function(require,module,exports){
module.exports={"expected":[0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.08384734502858282,0.0,0.05313716834916597,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.06942671127105252,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.12245438154393908,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.05785043119856498,0.0,0.07919642926479667,0.0,0.0,0.06054697216072684,0.0,0.0,0.0,0.0,0.1636554597631955,0.0,0.0,0.0,0.0,0.0,0.11248933520174233,0.0,0.050210380505164146,0.0,0.0,0.0,0.0,0.0,0.0,0.11967531768791927,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.06795476187884242,0.0,0.06893558914237433,0.0,0.0607475156009752,0.0,0.0,0.0,0.0,0.0,0.0,0.0716212839928018,0.0,0.0,0.0,0.0,0.11720075241122542,0.0,0.0,0.0,0.06691798920243226,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.20169066970176916,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.07698985887448198,0.13697942014908332,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.05537053869787235,0.0,0.0,0.0,0.07519323208034223,0.0,0.0,0.0,0.09463002514534177,0.05709853126266082,0.0,0.0,0.0,0.0,0.08371115242720652,0.0958960339980286,0.0,0.068393093935287,0.09621234385816935,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.14097523947794355,0.0,0.0,0.0,0.0,0.0,0.05525797082197206,0.0,0.0,0.0,0.0,0.08441712246400473,0.0,0.0,0.0,0.0,0.0,0.0,0.1288150972144144,0.0,0.0,0.07299527236998532,0.09718558369847125,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.05731044704309701,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.1401809571552334,0.0,0.0,0.0,0.0,0.0,0.0,0.09617027826017183,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.051984473396186656,0.0,0.05319092965087773,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.06266134361576052,0.0,0.055840188592022,0.0,0.0,0.0,0.06304140203791826,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0515425727632681,0.0,0.0,0.060475316873152635,0.0,0.0,0.0,0.0,0.0,0.0,0.057889042438970584,0.0,0.0,0.0,0.0,0.13909279215966938,0.0,0.06321769596710679,0.05279813545356016,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.05659163988682264,0.0,0.0,0.0,0.07079431799640125,0.0,0.05938291132132727,0.08451377842137163,0.0,0.05792659629154182,0.0,0.0,0.060477113972207105,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.06585321649292492,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.11406854604466705,0.0,0.0,0.06574233048768867,0.0,0.0,0.061853868400724356,0.0,0.0,0.0,0.07385679995138966,0.0,0.0,0.0,0.12019688276224232,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0597938481564901,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.6508529646704047,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.22627100966906957,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.05242266318989758,0.0,0.05015063549828636,0.0,0.0,0.0,0.056287448765537686,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.05566498662660026,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.05534882324798877,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.05205555482797587,0.0,0.0,0.0,0.0,0.0,0.0,0.051034865074618074,0.0,0.06002831067812078,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.05417606634065804,0.0,0.0,0.0,0.0,0.05798044202927311,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.08164430710344506,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.10666953935932702,0.0,0.0,0.0,0.15170937290858744,0.0,0.0,0.11105837884876904,0.0,0.050243537317339146,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.08121781719473983,0.0,0.0,0.058048974514548005,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.06302371110596992,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.23783812869661827,0.08055474329271788,0.0,0.0,0.0,0.0,0.0,0.07552320309649731,0.0,0.05956730081126689,0.0,0.0,0.0,0.0,0.0,0.05478285694697648,0.07355474299032955,0.0,0.0,0.05028607540413842,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.09353727630861519,0.0,0.0,0.0,0.0,0.0,0.07520740407688176,0.0,0.0,0.0,0.0,0.0,0.0,0.08044846215626418,0.0,0.0,0.24941193489831048,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.3250417237459308,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.09739728836164348,0.0,0.28635203035610385,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.07726048568730404,0.0,0.0,0.13034246251947826,0.0,0.0,0.13207870149890386,0.15549119422975413,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.330390027206393,0.0,0.0,0.062059180865365556,0.0,0.0,0.0,0.0,0.05993532278869997,0.0,0.05156351203909026,0.0,0.0,0.0,0.0,0.0,0.06546534979174769,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0533025088710256,0.0,0.0,0.0,0.06022040534938903,0.0,0.0,0.0,0.0,0.0,0.05448312069246041,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.051777183251725485,0.0,0.0650920344723051,0.0,0.0,0.0,0.05608090620459583,0.0,0.0,0.0,0.0,0.06879531097520672,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.08316734642367257,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.11647929942982178,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.06015218511374964,0.0,0.0,0.07360134233035724,0.0,0.0,0.0,0.10071902442979931,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.05649167015335363,0.053772258551253886,0.0,0.0,0.0,0.0,0.0,0.09005935547617297,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.10350729149629266,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0687211579285723,0.0,0.0,0.0,0.0,0.06148992884771193,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.09912165224666,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0],"x":[74.14546501489205,65.19696377995601,78.33147193872132,59.576502739262025,15.921658238114622,64.55694485596007,36.74004753918909,78.68367630919923,0.8276198343027286,89.61819727030532,17.805187521653544,5.83049367606383,11.733319355016626,91.01963745552271,10.179469093087201,16.525356042710037,54.29115984886439,96.53087078079614,0.07758211517054914,4.55786745975546,85.8005921053637,35.4599125035957,46.764196189731734,45.094009342955374,18.784492940902254,1.6808382758033202,39.36215201972912,12.620411061081116,23.79860377637666,62.03946952403818,61.77200356672545,79.27553128075382,23.379037170090843,84.86660241408089,67.36431641742158,75.4891350734149,56.66687469630192,96.26294275371072,75.07997792281955,37.7117060081533,63.926736327487866,20.482707965793324,75.56293201037465,40.585037155104374,9.079364204727348,35.05166976725418,0.4536287081329471,88.10473827325038,40.7864640515079,80.5654685352201,56.40085214308452,82.52978564053721,64.76736941892491,30.640735857585177,86.9357226654019,60.75749568146065,54.23987038433968,78.17767156369678,15.513398561019788,4.46074347190677,33.29872183018734,93.6472405723188,37.298183412560036,94.13759947818133,87.69567864478533,79.47845002088539,60.865120081347925,41.10761922089166,39.41153599767517,5.364171402681883,62.12040169478947,45.16550100290564,86.6543747138073,52.9035542756114,39.127061360612544,52.743591538047326,91.67490710737324,81.84007277416676,76.58970484664928,75.30699324895849,15.920526627759802,68.31348851616849,26.898013132837217,38.989371978646844,17.84722340793603,85.56413479881031,84.08327913037343,14.15387302283808,98.04171534693398,94.52216447858291,39.76451443607794,3.677593705883697,12.888633554419226,61.893634853703205,3.2842421846205783,65.62424331583823,90.45873754023543,32.28675169500646,9.26178961527475,18.218432381481065,22.92902808299173,22.55720790795388,13.401285261920947,81.26870903809677,45.04016047252561,67.94453990789758,84.65283902393719,6.4569276104354145,37.2401895281026,57.32653993562702,25.166157465268423,1.6810476746117686,76.07660872678741,78.96831774712084,73.1539762271347,41.756608322768706,65.24337509210973,89.75529543147486,54.77040190061806,11.890255840321796,69.20494129821174,4.079751096062578,6.684172207916483,18.55127651406645,53.15865606935617,6.693367764999336,18.859435301930215,77.38154758070065,3.3812703271656197,52.69532219508055,3.777317603528707,24.98634137776403,62.46175837276453,54.172260469284296,72.32362319046383,20.209155264451862,68.394438997278,87.49532768623381,98.4596796420619,11.496346850964901,81.1436669990269,81.3063945149265,27.097599568261455,8.747825313030667,91.77663794304377,95.7942402361853,80.19517193938302,35.49531049162238,64.44244785627208,54.480518706557326,86.14702048281202,23.231023193263244,21.35486592128222,84.26102113958662,27.242971075502332,15.035283897725726,5.052267006369271,2.8167822146048183,22.193530116078563,47.47162397857032,51.396705985334876,90.50039251104494,22.232525077017804,29.172380221140326,71.77589394331345,75.95896947949576,0.3439728129903452,76.43064086790955,22.280133483022514,79.29424086800216,58.383137981342934,8.460548965963088,5.430340654543531,7.981624039141222,54.74034925980802,66.94962934903126,10.291040325013334,75.59330170650469,95.51278989447192,98.78046527306348,95.56887519627399,34.70021729725712,33.543959480212024,78.19286947750066,29.50763526770881,69.22774081470342,74.50774837848257,1.638144084548121,16.507900053366996,87.57302194346146,47.75643161584724,29.449373387858557,65.6565729952858,41.76454535918106,47.05984773619725,17.78929662336701,61.16322587109402,56.92527093709809,34.93472874303687,17.37321428282266,18.335170367132502,83.796606779441,31.261522516250963,99.68184688919422,67.78456769754145,8.004358690568946,8.185408091917301,75.5506612147625,3.061738110539136,18.495257727436897,73.0820244426136,52.43040782847987,95.78798853172152,34.8302385170389,39.883300565024314,21.545749329705366,48.25282181214754,43.63355850287958,38.60526541122897,12.867609143110936,34.90988974630631,79.9401822419727,61.604101479851956,57.293286689411715,39.97552647058802,17.216330318907612,87.79503136653177,31.767848573147383,39.363600828758074,95.46979804142721,11.639549477273349,92.07656966380166,95.16953025937728,63.573726893005244,42.20583403703311,77.62020934634542,27.96003680754191,61.635202103112306,0.7536334987562121,55.626055058046006,86.39420244809502,77.26604435878048,83.13307946224361,27.374468863187616,2.4090730602258636,39.84057661516975,4.439187023414148,45.04372822851135,10.586393356913915,91.26124347329187,68.8245414475372,94.3197627038472,25.531485081517168,46.682834792097495,13.061435798305432,34.08115998132186,86.76428733253192,22.53917941594059,90.69042057603515,73.57693751803399,74.52284411282182,59.303895923073746,56.94525997971,74.30600651533614,16.739402077022646,75.27415671445674,32.896970821497405,25.934760604485696,5.6924363116382715,91.65554421616476,60.090956385594495,84.99471796181528,71.03161435385236,68.72763211342728,25.232946005636236,1.304421034433223,75.57291988248629,12.810813520295582,0.022482096427789422,28.153858976955192,97.2682099764429,75.03520891365403,78.976190780552,96.22539961807597,86.10247608074295,38.28266177972812,86.0654761558543,94.27609522198217,6.904554354552217,48.94274506123624,30.1392349433534,75.04099081582774,83.72526713441883,92.9602231473706,94.84512200380541,3.450823097747757,69.26592384544466,14.910908406532531,78.12742915177517,1.9578724137729875,34.9780715761032,51.36224122577189,27.32236886757842,40.7842306636691,75.91791846419613,41.4135306778334,39.32078054953101,49.14892836898552,9.039167536113668,82.50883386895008,10.034335854675437,68.80083750565538,55.1369434902731,90.89347947294655,52.19554967252347,0.4513553223018274,57.06128260342334,23.430207343011066,31.618694742462772,70.85418719919257,79.47135019728091,74.05147232584397,11.5919995565672,15.980005102915795,82.84304856445081,17.64310722086404,79.74547504723503,82.5782490086018,49.66673043549732,93.47468004802685,62.697120334433265,81.46972351882653,83.20585436633854,91.56824594193719,47.64677671458924,4.795772368732032,35.42428119530045,68.98945373682221,85.68833248405758,25.51981791710616,18.16813430836386,11.72566188776103,0.4580951685366763,12.468026378749265,5.887254163977462,19.9509296985922,80.8551664902909,82.77556810101059,97.84871396152039,15.17581175188445,57.99360443449994,18.471664546534704,88.72329773205472,89.76644967196412,49.41684908068762,85.24793616739434,61.055368377475986,97.19289352267917,73.51868678895342,72.77982787141492,52.83608244716807,17.722030596058968,59.87425146255365,12.86954912408902,70.54227635544628,30.087588729106507,13.217480562439011,90.30302471807742,96.44135604777075,34.00128326420386,46.88807820177408,62.84317660040346,19.429545100369584,14.452042052974456,35.585741713291654,43.72745744374171,50.12723219571959,81.9484649751352,23.564115324441516,59.22462985906345,17.290793030306915,14.759741494579393,51.178137727723794,91.87148788355573,96.08845798505865,79.79840043947407,91.85210350749486,40.74351904924502,53.34454006268074,55.35251252224338,71.8573089922117,92.82586650247377,36.19752536948824,50.718914089684276,37.510294882858865,69.77196908366284,9.840632110900739,48.57943184194469,59.03284593933922,89.55748231765675,16.040066331138547,7.38072640933829,26.92604042267568,8.465856800693805,99.32822343321189,27.415655892913616,88.57276347508211,49.492380403558364,10.732380189443758,6.047182718397237,59.98107817562725,6.2319337571653755,27.29311277809876,14.055630422752841,41.49967732262567,79.33924416025758,53.50804402506162,67.65662158645289,65.82663812392325,99.97248752117125,91.00238024362459,88.63530435840023,30.08893809171318,95.59054843462242,90.44494121761666,60.16128463416388,52.49604607769464,81.77560859583,43.1403539655747,70.37296128433348,67.28955417994283,58.94977053773083,28.79387397032591,48.79476936072826,94.04765267598141,46.915989954552614,97.95238344545535,30.1938970870949,18.96608738075376,65.43303669975771,56.958877840530555,48.295309389003435,50.135372869619644,88.66894762562534,25.022387365066635,34.60581752406444,13.905095481127127,13.846454057033487,45.62405428186482,70.05080852795209,6.633711733433656,60.52177868673638,62.98453237564621,12.967429432627986,58.53055236548348,45.117059501856495,12.354568015473522,48.57785948385198,73.3150634652199,68.88339977569416,18.233299000982896,80.23242136045319,59.35597548627975,85.34299675833155,5.5228614151310085,30.478115640028115,71.91961440429458,40.86667460480062,13.655606760736339,22.97118381329948,31.124830415491523,22.78523853616945,16.214884982782095,31.700119949609306,6.701027260349779,76.94064232876062,68.87441073483427,76.24546614081586,3.4397548514024656,88.02399922180216,73.65576933999556,93.96535375281773,0.34850224037290545,66.88426232356622,35.362947909756805,1.8726485991141129,49.5263918505404,64.37343216150427,99.88421188932264,8.45096930393141,86.73881214969956,29.73317240311144,98.85321321745269,36.907005157989346,35.14167250912601,17.57203551212183,52.09735447333384,82.65372364914518,15.735631474481227,18.873950517958704,5.759838470408307,46.05858979322146,28.212360563556892,42.939211796857535,67.56752285405906,6.261244099716423,2.510151391355042,59.96896323105923,30.2455591567901,53.619261020644736,24.528424025904183,50.78095434405954,32.381784645349555,29.59589630687729,25.25736462086785,44.4160872731582,95.21834815010976,47.637520285530414,19.396657595328982,72.17908632515434,17.60392090919587,30.081900233800507,38.06303656168206,73.18639206410838,98.47431326263924,32.98755712097208,81.36996843348649,58.622287603354614,44.79536696735242,46.40341993612074,12.669050860724674,66.99058006945077,12.002329206617457,2.590463214496852,58.433275219155846,18.415225169928327,67.21710685739961,32.03605688384648,11.193900287929882,69.5917501618158,26.180833397828216,12.89821732156069,68.308098450475,12.077926762157777,48.720115556677435,66.65145386964831,75.84399739089314,46.98251853983311,32.934656415276194,23.3000591812649,41.00007756355411,41.48835688771906,85.51939094729563,20.893663539744757,74.13065054246341,56.92807790704404,36.822519209517665,77.36457490345107,6.1130682474839215,37.31234841838435,14.645244447765982,82.38741516664518,10.980862059124053,81.2961977318855,55.5666051299474,6.242227506453224,78.5950826222181,93.83816645172527,42.491540272335925,15.287357645297073,25.537720025131485,43.791249800022115,63.785175036044464,42.779860542366755,50.01518523908348,32.54481703114913,24.710005083382903,60.07007866035825,74.70989283324985,25.974644988545425,46.001506681105006,72.61807368945286,14.434548243837542,71.00381100659592,43.67585937415504,40.081636219043745,26.640196548374885,27.54446314653556,68.43103953790876,19.725733264966404,83.47545543896867,83.03046495705762,42.47457761156925,40.67085296914183,92.38646117971732,52.0961959408335,65.84848069592104,61.73327040422247,66.24510733342248,53.75397809706879,2.6694818205103887,1.5114594833466999,41.17605631889762,75.50596098648674,18.447038651392678,33.96386593174934,74.42083694111665,15.627514314510748,34.996048001673664,35.074818740129984,52.258058196161514,71.5610242865826,80.29312242119666,20.864271944101297,82.26111422212794,37.43195301333613,69.79465605704137,65.54850562199974,78.20343247987154,43.38823480446654,54.49989722280435,87.96138573080646,35.417381597891136,11.896013478521162,56.72243479220567,80.21537115603404,29.585601502963677,77.9183042914054,65.72559580872736,20.778338491787096,59.22262596659466,85.10445933717841,88.68931896713501,85.83331823090268,12.594872418240378,78.2033411548211,73.73981257857372,70.87860382399501,24.862193709510994,15.675128758408352,70.98533269882334,57.741947040594276,14.294890555885642,36.93474255242655,78.74315662629976,84.7980970338427,35.47428224780804,96.93353254994402,9.950627013674417,14.83881686923989,33.35175724308379,24.921106075547716,61.492755052111825,94.98889184283034,81.23272451881095,20.24616396051244,54.10206952371299,9.691983957888306,61.003992529389194,21.551452038698148,59.62220150795405,53.68975147721462,83.08048512631025,27.675996866243736,4.956316926541526,80.70809037124809,8.78393397215751,19.43741595704822,81.64800951006042,68.93159635140287,60.64270004715468,92.47316507908154,76.30627253995247,34.187979673850165,68.78610437938153,52.30658539969,66.87959160748866,79.30862744439315,70.14554397204876,41.32862278302581,64.86514872382985,0.804502711648869,75.35387044926374,28.954598414595246,32.77183704420836,2.297980570250502,18.40917859517368,79.70494548889955,12.233474003201472,67.19763666542116,73.45791228953553,23.584134286987247,32.81166692764024,7.9822544702975895,95.8350208060162,90.28641883752519,1.423534969872109,62.554311878417,47.23246557324534,31.981751084048792,95.2480417186712,3.050841774290114,47.19770134932206,34.66402447009733,44.61750585047874,34.99608320026606,1.2962868120400373,6.268514024170568,78.99601468493267,17.706285973510205,35.296130997746445,68.38079511699637,51.819301781092776,45.96781620703136,98.95148952917346,14.553013156852934,7.067141072819405,83.45927106003741,69.9426147529538,46.8394880930719,2.0362779108966,35.88664371091521,26.81678544746564,71.05487339839686,2.5307315439100364,3.6816530101406952,79.6987333489953,8.972103982127955,76.44238432779045,66.86357280599418,43.309506692906275,99.45006868010393,56.51690220594383,85.22031269195757,83.5392060384113,55.39359280104663,87.65210622279282,29.97190179661029,71.98811496790825,91.53999514146174,19.868799526642288,50.71187298739053,43.20552141881468,54.741901794130634,82.71577107852406,93.34878492764167,21.716637350432144,59.55557083102134,16.95051097652629,5.7106648520068415,19.88549045956649,97.14313595555679,5.730488555141244,45.040403907624516,73.10425815615882,23.297291448765844,89.08722712124275,14.904813470412792,94.74080066655313,6.578332601514125,22.59689056958878,34.98236281803704,45.93501836096194,4.294500559806691,25.977691680959648,10.04515364079257,23.32130756135422,12.814813984391282,57.92392776606441,51.47532405882394,43.06558555640891,65.90315393211324,43.01028710366717,69.30219990048958,70.83435713908126,71.97885191385707,96.95760237917752,9.941542732663544,90.43883043183152,39.300589345626726,19.733982130286808,55.342629328520964,40.76259672156959,60.66947422263846,39.94925934082072,17.703288808977625,29.04059830416856,32.825491026007136,49.03902127482773,54.20614592966113,47.50328542131439,9.194101922789933,35.33289665127162,19.623506950508297,75.43634043542522,41.65029124776562,33.80840365487268,62.233195659864,45.34219326372699,5.326497245010575,40.31504395414189,41.00421745525982,79.37714072680275,56.658732806620435,1.152651645691316,94.6693596814447,60.47528162846567,5.7975442315509,60.763102855615195,30.453454057110996,70.72482645118438,21.60963183662419,53.20917201483706,53.80534624681494,49.007662792783876,23.61771370354817,7.789955697522899,12.588897249313536,58.18808103437767,26.220529068011867,47.307250468261095,73.25032288512642,62.67745110715741,97.03664376379766,68.00405541919403,62.626482589500895,57.91462693910585,17.223367309661832,55.14146911276705,29.373910573680973,59.813018075771396,11.855537728356413,97.44503571445247,13.313893690466582,74.53413723924132,7.120906416049544,29.336288924403764,86.7764346291588,15.89035693466081,86.16906319613429,63.655081771649044,53.95817576712236,59.15303567675787,84.69199508415866,28.978149015516365,58.39801321248841,58.07070345123844,31.682130801282995,3.3338747805456093,31.6954246521139,70.93884633384953,51.14233959259118,45.61819330364845,43.84098140175845,95.62380555765114,17.36660615306804,47.67900289269231,87.47076693382243,98.56852660376474,0.2258645471866938,73.9950780168981,85.55766888372357,2.35816491296732,16.397642319720628,54.53851380322179,99.02999232196727,58.81654869368491,58.59856172253652,51.187745324540934,17.405978706267323,36.25422108233127,77.03580613054832,52.82216963286086,39.08735401687762,55.16731474710477,70.79061636875596,96.68117139540857,6.574464259273638,90.99987746202389,5.695909707995628,21.64882153327823,96.74744409122384,20.84207525154591,92.22444637920775,9.169583394941272,55.209347632843084,88.3397986092485,41.57625084619894,59.831313468898564,14.449361424564566,81.4658291903059,83.53208120368566,30.813885600946666,72.44345947923878,57.13454461276455,64.6198171041752,22.56005845713467,10.381823282313363,68.69141731842248,46.538132216656166,21.193632347569146,95.58274889730068,53.65982119431807,8.780982307283258,99.73946729005432,78.79588839190825,4.746903422821602,93.9259605997918,70.52155688305312,39.802822539373864,99.15571765219748,57.4258103730001,48.02596837228832,72.21215263136347,19.078047527573936,21.254449993067936,89.9670885195257,97.39276087165423,93.00685050572908,25.168405633445534,53.47676689580003,54.57575116997126,61.94926546824227,28.207431498397064,75.09979394384865,92.18496226468406,69.15872087043984,52.00796946324293,50.69581411733086,31.947198955504664,77.93018642734934,4.103754670163862,63.42239696077314,78.8946354170172,13.31095218401006,39.480551292033894,32.87763443335694,7.971826115798786,37.02783581266915,27.39828112516527,16.809978088142465,70.37306748094925,15.914387883750102,98.75565427121565,59.2786510571714,80.52510979566966,4.695003141091636,84.01564983077765,17.382967735603682,14.251656359698895,48.9389859314334,38.282239968599455,27.214959396254667,3.2230974470911056,41.14595690310976,73.15191763887536,94.13931993946724,97.08435961119054,38.043240233634194,35.38275918659941,94.06565080893125,30.20318940919282,10.968204880058785,50.83830965858629,8.276115140196062,17.60028636602604,62.81270049327075,63.20619401201619,69.78288210731458,39.719152101476965,42.37794296962007,55.36670318910786,18.28046101756091,98.38142518086401,93.7763439392747,10.696670674800334,34.07783408925722,32.010464504244055,71.41619161254502,32.73847088990236,20.235199759485777,94.36866891989897,11.723394062321901,49.64655212480367,80.00952601141324,90.90616130282207,74.85021349900292,78.092763423053,23.714019283929243,37.28264218544939,75.39124354318648,51.29172503250254,99.81757232023165,94.5582282489867,21.132768857285566,92.57028772851292,76.83991243755503,13.109926387028947,3.2896381175146816,32.54686271950704],"b":[18.68476852958288,8.086258872130308,23.004450112155634,10.45462257444326,10.204250163614063,21.893712414755676,13.609809724963021,11.065414818297983,19.649256663246327,22.487246538574254,19.700831369835058,4.018439911773708,24.898899783478136,13.65034067735313,17.0994358967218,4.604732048999396,19.982940736608978,23.502667399217437,23.5821610552537,28.927032511656197,23.473656772114797,27.761994347919988,21.304920542133548,36.45646798790132,16.998825830548352,15.852059795651947,12.355827044544032,26.009096159986584,19.286142209615157,23.778283996977372,21.9223748112326,14.635736307238574,28.5132912218574,8.879983789430339,2.2821184833891683,28.926390698422097,18.301939595649838,12.337514715832405,27.831340831251563,19.472344810985874,19.970726092593956,12.337012952645892,21.198916950036608,11.998832167457136,37.15291150861988,24.715047528707892,26.359225000831866,30.443819471181072,28.66422894028507,13.384390984089535,15.653534421171603,21.04159699125837,14.394015498196433,17.756867021222433,16.910267611610532,23.00939600993853,25.10352533784374,15.04779932333416,18.072559163806552,17.711742469166985,26.89169484536988,12.051705462225183,16.648605677576597,15.65694516899622,22.93266860447329,23.92970831627347,8.87000429110794,18.683693953560823,31.46867927185878,27.441239415709873,29.351173289383127,6.429681405022549,19.704355302271974,17.962439229606737,24.358646253531305,31.391966297097078,26.266920986149323,20.745722376202718,19.77034895673977,12.511683421700827,33.35088326212634,16.50148704833306,33.52716563294699,12.064338089529887,24.637389849384324,16.426510032255013,19.322336272680573,19.723136727287972,37.53158579140739,29.401779988978003,29.137290467481648,17.41119661786908,15.801511203656204,20.44047682075896,20.06014412338475,10.143826396336685,3.505259085360275,30.683766248288254,14.729142582622515,16.615053863336023,29.61823490818359,16.357039649479056,29.03446770035898,19.764170561681034,16.072137029540613,22.23999195292757,11.17415649214243,13.203606657218959,16.439206899055087,29.361869629802076,18.430626386276344,16.156249998757946,16.73457864843642,28.681159486440876,15.022539724033429,21.701854559594835,17.03164971504161,23.632747669334627,28.34107369016462,26.310882155356285,25.362114037266117,16.03818053865103,28.45704817003362,21.566458359264587,27.973032191376948,14.4210608098861,14.63815784114777,8.6029211349517,20.72770236348745,23.46575344993882,14.604673509618072,15.868157184037921,13.732468131628405,23.555939975893825,31.636845824193937,25.44656159577583,22.61782568107037,10.074169741881551,26.760690067011534,22.66717346276907,12.259856734346993,12.006410113485101,22.538612967245715,8.28310953383404,12.701588246222624,21.09967745334112,31.460683277026646,21.35468172225397,19.229652340384913,20.048966675245158,32.21430572965728,18.671069859840607,23.76473855197053,36.64351422714405,10.998103764432937,32.183833986752305,31.684529129276235,22.748861838225576,9.606875663327529,19.709219610918247,13.946796199161234,11.075974383674145,21.944120591193297,21.892067394534994,20.75031284965378,33.34085553973588,13.916819139915262,7.719005129730907,20.81887231446011,24.841210815161343,25.37959733354556,13.982556391824295,9.960378389503717,20.95655834223215,4.429507102250967,10.792341575946418,28.146418127856858,11.185609066650892,21.680268881497256,27.5164907161189,9.416130113737818,11.272333279761453,19.292566698531328,12.891986928241318,21.295928807416086,18.48998260903426,32.52975413015538,19.817195539065903,23.699453605041864,26.957461130449296,31.354091562137636,31.256960549658686,25.94739798266056,15.584637010722844,20.651860164970103,19.745165455894778,21.367333823660474,24.51096997253622,7.273174532934066,18.21234395114537,22.199101235969355,26.554187191887024,22.892842201192742,13.019578289374842,21.618036808783565,17.74009929101871,14.789505268459804,8.553496011724953,17.51560527344409,24.960079259000576,17.59688070920548,5.235626925861991,18.22327986339586,18.47288474910181,29.047068039308748,13.391160838972958,18.847038819499993,19.62080064844846,20.03013332192821,8.832392486043595,34.19984916146988,28.41524594430234,21.432134802740634,14.68906885656696,33.78834474340453,3.8699580505368836,13.610233649497202,26.722270166288197,23.997619199581656,22.921736180868265,7.3908270890537375,19.023410192438615,8.15188477303122,29.766716784662286,11.032088503616034,30.30839070087275,17.095777704493408,25.762353291740908,21.12195643929546,14.391751485874424,26.720703092858958,25.575647971169538,2.2504969848970324,22.135648745177825,25.27583156682134,10.016664522736045,10.699555707858543,19.51843736580714,14.905740663616527,24.577639268698338,31.481636019882778,16.85627422059092,28.864955050321875,23.83973565447773,26.16474236422594,23.661912979971945,15.000306041761844,24.38067988208464,23.247864378806568,23.184832636722433,25.31007179735532,19.06739429685831,18.90535867330044,21.087485384046786,23.909528066387214,17.14664152460724,22.270233479506665,28.30780553388935,11.869423990104085,23.541200541886496,17.04161755660142,19.349164472808276,23.849521085982055,27.860248704048402,11.355398788567769,31.6265999987005,24.90601385266079,24.041446092639774,7.629640186667888,0.415718714468456,20.269432012495436,17.452508829355715,12.696018355891706,31.422288678601127,19.871134265224995,26.241445128007854,25.100647170231817,2.563007164709634,10.357375570431794,18.48871527218617,28.987795195815437,21.255408840996317,18.246476672479638,24.29493686924547,14.401939886340674,8.601022416423731,23.196283099468513,38.74415501747388,15.767653430546325,22.040404555734813,14.516303244013375,12.144105768552803,28.746438528424793,28.252452183011734,22.614658914298822,14.243312137082459,10.168437179315557,24.84567764133983,15.239632019305747,17.783695928445926,31.599937857571486,16.01197866594578,20.437844523582328,32.2781879268639,16.513832214553684,27.919928702093536,31.154490177217436,22.05798257360935,10.797659801982178,35.55850795830881,15.209791963803326,33.60160145474241,9.92737053926267,32.15874441769198,16.88245023691783,22.350896090136885,21.84641147242587,33.863808455604826,22.758966160759186,20.02071853961699,20.67203553679044,22.361346984497924,26.813462033059142,19.452954404415223,12.085986219288657,25.76053726844816,22.540648780638463,20.671085956885186,20.105193119346048,6.280738728753907,11.703461453983884,27.638528405485047,23.42720770943623,23.739750035296687,31.700574148722175,23.865872255421227,17.754440801676363,16.764109869748175,18.095465581995693,27.627742043841494,29.2268631318871,11.723195224671542,27.97320007285892,4.4180355393182325,11.367141339946102,36.44044723315784,24.99370111831938,26.098198534162243,21.30881898205767,26.75665455714044,22.294896059827472,13.004028533809308,17.094558614476064,21.91306996214437,12.77619126187358,17.31437209025955,29.356458498034247,12.231476110341832,19.352998337266165,19.552980879492246,29.456270846185827,20.956544794572714,16.439401851912653,17.998056646561455,24.21415904637228,12.827841389481147,33.24306715723991,19.8515738653197,26.78772603349587,28.467889224104027,32.426354250366515,20.109064868122765,17.89564618851601,6.692609717334053,20.140241650205283,17.16394852112513,34.133233936717694,21.330133274551834,7.358548808364245,12.140023806625427,16.978177362955805,32.13084275901609,16.570924221250785,9.017457680592681,17.23877379027183,18.12502116040257,23.78796472162175,25.833385884004116,15.616519904886413,21.4256774048822,17.23497500341613,6.414032219183858,27.16532937490601,14.509799741455636,36.05263777178843,31.484444490007153,19.16293704901114,21.844251178003073,20.039505330335167,1.4926937367230453,28.98655266049242,18.287194240584682,24.939294364475796,26.78983854904721,28.996437285493656,17.125690281055906,10.905023384239513,7.532545181576458,33.42953775926965,22.67978090806855,13.096646058296866,17.57437189334685,19.46673959831029,22.860390359318732,13.412280187179396,14.58208229484597,12.711867400302932,4.189562312067285,34.24206480275957,13.132791572153863,25.99187562636797,32.717263859942975,19.45752874288027,19.768880562191566,14.835817697384549,22.600146475766813,23.524776028314065,32.063838613938856,6.068418849067716,29.813952731318835,34.82876065973845,17.04047478554382,14.619482734828576,1.6984533652826306,19.47511697727675,23.41959486846273,27.0679530065509,20.44416080227506,12.450198597388011,11.266000740062148,9.160021856455682,29.74412736044915,22.54616105356696,24.3499350790077,26.310929878172935,16.090858865589002,27.96119538476342,11.891735730909874,23.021952061580965,24.6904540524169,31.205217776991372,29.05824994670367,12.872967724889834,24.181415271833743,10.835576022660533,14.57312232133404,22.436597599519672,21.347527589302487,12.897519796429545,15.288319922214125,21.187597350667904,14.873166405132427,29.194587661661128,7.518601649805237,16.01255666242666,32.18670899510624,22.329177826432172,21.00497786576436,20.7383465135051,22.497863161383176,15.898869016546975,25.75681118873119,13.797720247697935,14.791741244986078,16.221423978816127,3.014796220265641,34.44071921410669,12.236551700423593,37.08881361292151,24.80183093088709,17.919428856723023,26.819516489574646,22.502015812395282,14.654531332028462,17.549953895963117,5.2218857974457356,18.983471654165044,19.15528178086469,12.26892732883595,10.307630317858077,7.143794950317464,25.28127400806156,22.70644307842492,7.276057201476291,5.858883547809937,17.759974445932343,33.23881413017789,9.59099798881327,35.919691059602386,28.71878088686922,28.234047688926637,36.09141431220141,27.625407940502566,17.038472901513842,30.397291968653995,24.050920864508605,26.0269954155348,9.750590422837204,9.927552093107584,35.31040843851166,15.250039454826325,25.86141929651431,8.773614575990312,14.190507664739762,15.596697510068488,17.49352421251666,17.934715591567247,17.949247313609927,21.57245004043221,26.223655939443958,9.854564591671,5.164079574527327,25.299451576500267,13.393174567586858,22.1324962449899,13.253700029566469,20.203479815473266,16.651179606558127,10.351461077509994,17.47824298068407,10.19662446112048,26.010892793565908,17.87314489218157,28.63323737500891,19.249698574708006,26.026732410931924,17.43961931182646,14.193858292973378,2.8808252987990013,20.591578164808194,13.184243024763074,15.424991411037299,17.51422470615647,33.823197195262274,10.876745949987441,11.178113842473412,14.732495265778919,24.000043194149665,2.372273957477433,19.604432504950356,29.103146181612743,20.558645900152648,24.872309015591085,7.356994041733493,11.487990102839811,21.599038738037404,13.005870502009941,12.994972809067239,36.72649324438689,31.348483661665412,33.120157135634386,18.29683926780081,24.01915308800559,31.144671644508463,15.386303471746459,35.81525754469111,21.85400170364742,20.050673969406876,30.028592158200887,9.337135673276293,23.12689540458117,20.630129215906557,12.292564969999825,30.736066963387362,22.049326341936577,17.48486214921975,20.9857833769248,25.825355122303367,26.311126211905073,31.416442329633583,19.120895567872527,7.320116276223776,8.630730328988312,20.585694017336433,25.184292085877704,25.422157322986017,18.661760079195826,19.943536471025116,20.85923416445443,34.378197523575324,10.611834959257243,7.029265157833877,18.92527591860949,22.587339789623286,19.030714499291555,15.93854988985587,23.143469563494868,22.795849715629046,19.528100652778264,36.23189161670018,23.906253525674586,18.12464459727818,7.775592290570819,13.452237728692742,11.728899185866576,16.825793980175693,18.96614902732398,21.795899490299945,18.51669387941426,29.58767526780147,23.88155449174472,27.513443729499034,31.406566640972137,13.657334761513704,10.980864137736098,21.56522570961478,33.00047838218455,23.63026473475321,11.074736342890338,9.484469078933904,5.882014766350139,27.149319579712756,25.953902925757948,15.775713925514134,20.673653787858463,24.639032797536036,16.518059301971192,10.846114335886327,5.5238542122821865,26.77620466516256,26.90411881813713,26.44512134590912,30.767704809501137,29.39628654705005,4.429571027507806,7.224589968502362,22.843134710638594,21.97481412362241,11.439841907162824,25.835351401921777,28.542516636828587,13.901001576646738,22.717600137827418,29.387292824699557,8.911269912768605,22.32001581025402,16.31068483327545,25.88021047638297,22.8752263663115,16.921734184782043,30.319894713932374,32.029938468417335,12.923974265544734,33.461629915445286,14.367225774858294,23.7850447743047,27.01083034521543,22.602737323396877,33.24903113266158,27.82856897183938,23.175713861867735,20.19664308203053,26.457573858451195,24.282560149735932,19.337040372621775,8.450625182487581,24.672617103312668,27.52467479506737,33.76843146964332,24.86110912670358,21.781409068365967,18.48822299502762,21.719921353884857,24.200138163984775,21.234424208896176,14.584694194394157,12.060658188630597,26.79805954218509,8.506692182447747,19.838541570644225,8.659356763531147,9.532102958636175,10.770895332685377,6.825817338685707,25.99044181537051,35.09650709020383,14.24256412857062,31.461035383929683,16.019750619006047,7.686037389141043,22.87778463198007,16.11437655815789,18.85404677104046,23.993780649252756,26.415106885783352,11.25716322623699,11.827949290582172,2.3544868121492746,28.609842783059158,24.162195952486446,15.405286775220581,32.67708391474625,19.432492805151345,25.17608481592298,33.01653042357938,17.204397705772145,22.06544479911345,16.08011637810319,25.73915896398733,13.494965246074852,11.105822179695961,19.89802553956703,31.896572725526045,16.776194388241763,27.322622463412927,5.983660848820902,19.837877633146643,26.993330278726347,22.153521874186445,23.19393838794904,28.352723090796946,19.191898515127896,19.70151659755225,35.62876724031641,21.198533988578006,10.806335797778729,32.75086805273207,14.920417475778072,26.627875970389212,16.41805499531923,20.64676852403448,16.39530097070746,21.314643237476904,11.494045011791156,33.68844433351995,13.901282817039526,7.307811632647656,12.077718028570331,8.889756719847938,4.541826325850606,22.719740932048484,27.772504327120675,7.616463855630453,21.019284433855695,16.987200207464127,10.986483048663228,34.028946281445755,34.84152197978962,22.09808789487038,23.616734403799956,31.503621142075623,5.532635600170139,19.28930733916051,8.291605697692415,9.412904581682632,26.971933146965185,26.97445792287467,19.08538620493925,23.60346133597347,32.12772324995698,24.363123847736425,20.468690287023172,36.84788818681069,19.4697884124698,16.921518628841937,32.0138962240518,22.65003992700383,11.236895388453485,11.504718566646401,16.59451377606683,32.448979347663666,14.910098208308646,26.11174891578987,22.34298086432553,19.55797256390662,18.509782816819367,14.643754870676307,34.156913159925836,31.413931554094155,23.495401436315426,22.20996934914501,28.06956765753885,21.20473285805857,22.214578274378756,35.926162216181424,18.476801687242716,12.908222176803193,18.626884693370855,15.992647058344195,15.541397292809508,21.83733309772653,13.493975008735454,32.46810061109316,16.9682861063818,18.776355563226865,13.121615759603014,24.42081647198333,23.262966457189478,24.656527741573,17.36245249282386,31.937474604539915,33.35443168383059,16.125057097586332,10.686248523436284,18.680573840510377,8.5207541214486,30.92535153280554,22.086899292865233,12.962660242714952,12.059466133439267,14.676555478805057,11.2691274589734,17.504276175558637,18.362752025433938,22.49039115111768,16.451760870555844,37.945997024348074,30.79773386765836,15.514665985854144,29.69556378503156,25.202152514678872,32.90240553883358,18.617508228744825,29.1014520609712,32.23324824714403,31.9449251373988,3.9322330387575066,23.639741431029677,23.27412756631568,18.898968218816016,20.766230490960258,20.5067310435488,15.210771711157657,9.190277211450727,14.751395391104323,17.535958817387368,27.39021539622764,29.75686546174866,8.390545868071943,8.025662043835053,33.619280347303,25.077481253344054,19.799062629814923,23.254673097557923,8.58918026714993,29.138579966817638,16.804062081399607,32.7790446110945,17.9561442363738,27.21462616956319,20.87041154826848,29.53613052849514,10.635502026725483,28.486094402682667,20.210230817965417,2.677189636650139,15.949303689356306,34.109961736617194,2.5803711919103156,24.037337114183607,14.806413264621618,29.939404064456184,23.215061375228547,25.51538834294197,7.455132889922678,29.451003036866506,15.766591669612154,23.03563335349668,7.996891174326759,21.80145046582301,29.14849574025623,24.2096826388659,7.26673295240595,5.740975809606108,10.436920191213654,8.383200809998135,24.57669359671753,21.67322127668698,26.911955465407495,20.34836732616645,16.9491425192645,21.176983441729405,13.02367017462236,27.79864437075528,29.462756006571144,12.102798859239101,36.77610877290283,23.593742182956397,15.078219368085252,20.671508119230346,20.851842371101476,6.682342649158479,26.384963276481074,13.521528360414857,10.643165986097753,11.419835944883369,35.51975306484775,14.393859794069538,33.80119458660309,30.669967477044043,20.33405861916595,23.937462561863427,11.741147577487094,24.839366050444433,3.2586669795329737,22.368493044238782,37.3572088386055,2.5912317926075623,23.2780396775291,22.89177691647698,13.061599236908808,20.915489794050796,24.482341867026975,20.080736899751926,26.500903586523027,27.94300792502213,25.87358573282171,17.050609251770712,7.686955030281442,32.218485284935575,24.449614482576415,20.532093538345055,33.51484904473186,16.025254818380436,27.117242190780818,27.882642734041653,14.514278038794206,3.7589822385774863,23.600813338947454,10.763773692589474,13.851870362338094,14.94282673171476,11.460395212939343,20.069845306897477,2.76077600377143,28.616068522570007,26.25089544678832,10.16105869716522,29.342042275240214,34.277867372583,9.78197529431477,23.792090555826174,26.156264054092276,21.573719854772897,13.885519201856198,16.36480298356213,3.966400361239404,21.866032326481054,22.368310932839975,25.010575829540432,21.87827518268654,3.2297451863613214,15.853105047934097,38.36456977772822,16.866565067153644,31.966974704577712,25.378735881916104,18.02891770393865,17.090401555671512,11.866174863109734,11.114337453969657,28.867999897316885,6.2192022769704325,7.237413512606223,5.865138928117233,33.91903454704871,23.445097053397607,27.76997028306636,7.424677026591335,24.818564902923395,15.427168795845159,7.639698266670734,6.697757584642052,27.819808768865194,19.91587598536459,26.228989097419166,9.348512906890662,10.824565945948972,17.20328460919027,28.52083380323855,20.879736060145934,25.106000178035718,13.920008910350843,13.853224555946566,13.895808345022061,7.706392892638654,19.83331934691208,22.442003344309896,10.558284083008846,22.909827440388057],"a":[3.3720902295769895,2.9121567963822637,9.263031621170486,1.632506224649406,1.089282897737327,14.084745706706933,8.37840459705831,6.278941020001367,3.1014583958002007,9.921963626527152,7.774395301297541,0.9873362564081756,6.079680937848857,8.359218135515363,11.990221268175754,3.0835362723977955,3.03091990382653,8.558250833906772,5.594109072655997,9.456583024559414,13.199613189154578,8.684215139250488,16.631978456413805,19.24698766594435,12.362460246483153,12.467418675239387,6.7442237847673425,16.464779128624482,5.323556645891521,11.268710312285055,10.836984190659011,0.8490061430284435,14.109613131794244,3.1295711177639784,0.5720736040517327,13.466290641904095,6.1090252140377155,0.2717937060090003,19.790218976193966,11.212172430954418,17.907218045454197,0.1367312199070092,10.940370386819684,5.255649073314794,19.826620815818302,14.328915795489765,15.435678714894614,19.857699880374074,13.887379194512919,0.6167036552320271,10.903952372109238,6.599543175280398,6.48833627592889,17.48057745644357,8.546765899945177,14.5112391267836,18.40310066733348,10.821140405420909,9.906252761440868,8.888214764980834,8.727567602029058,1.6278257097430249,14.485930297281943,6.898427064271178,8.756364291263843,15.64985310946935,2.9463581689652107,18.0664748240846,17.180925087009623,19.65336750296233,19.865872922426902,0.29681135611405285,14.390252943502993,1.3994338490437697,12.10916473748374,14.037862709836336,8.179757042906859,3.2011097608790706,7.911742954888155,2.193189785003331,16.34051781842188,16.280036479412587,16.241209776064704,4.559369354100844,12.010557941894442,14.657481655347752,16.132987187476026,3.2070341987351147,18.06875739252353,10.274885678299817,16.235026261071898,9.232560836659003,9.691113167153361,8.963732091310641,17.15896629240916,4.882219695544707,3.133866537053085,11.763927403367997,5.839410963117744,1.9671398690450648,9.702034514180408,9.319407031817505,18.390547541910127,9.549903523439426,12.454271959283624,17.189048228183385,1.5594857888140545,4.847664769454529,4.048059927840955,9.715641418759727,4.2223175409104785,12.851127849925819,9.39582375126362,16.94447627888861,6.980189962286123,2.7077613953173696,15.996566303987345,12.558540865124584,15.069505037108426,11.595209958860103,11.9774864407061,1.5318854240234314,18.007102786493494,5.104879805689193,15.490179390910782,10.087720960258268,10.288966010870606,6.470615745400794,13.94923195060709,17.66283895829503,0.6423435393748189,7.371351467037552,3.0323990685527136,16.955403526128144,13.950743810408689,16.91419316446002,14.31435196486676,0.7256727771974969,14.58840505979937,7.723508658751723,1.9495635923856502,2.372951218895585,4.643718562657875,0.5369615252119297,11.868098590176634,18.403368629026385,18.43007390920707,9.670092106238881,14.399737483782973,2.873899861195457,17.170146753123838,9.64165899369496,18.80665099403513,17.166149588495916,6.979988266795378,16.456010626632064,16.84446269194247,3.691981759809475,6.895842781632622,8.108842583676603,5.9248209376589145,5.831750291321929,7.849034341438608,14.461464037591526,19.773244117070284,19.50151368097499,9.45921957509869,7.3706235028619815,2.980175076334741,5.914222111943488,18.650537323555568,0.9938327518664813,2.6600116708270205,18.5317203024996,3.0180861417914118,7.218805229597365,11.228780824818418,6.497347062406655,4.990369593243957,8.173479813198107,0.015888548675389025,6.838043363417259,7.8090774075638825,2.913072594076409,10.219764062591072,1.055921048204671,17.27233532643381,15.916689531053873,17.789149860642993,17.652532618700974,12.869256325892646,13.196814784119555,9.704384820302456,4.615518461659649,18.097258607536197,6.4460962134458955,13.575179357033665,18.829850324707564,4.317360115160058,7.6448734420325914,4.685515896972325,11.02791493556352,7.37593637618406,2.133360764545107,16.092763586142247,5.79425968655765,4.3615453382237135,5.100196590693606,2.894245974416152,14.566402523776851,9.203100244602403,2.782945331890261,6.381694709926764,17.932271208949103,11.704147569317191,10.237876321108303,10.55055490887118,1.5189767208084204,3.9907405284636033,4.380976133202519,18.11019236883893,18.204077871418484,4.783238554242151,8.085336210350071,19.623652950039002,1.9759847773555972,1.6577783318069006,11.310609730373006,16.085604276134614,17.291190338926825,2.4651390601022705,13.433167705145696,5.635377299019724,17.715642654950003,10.538826429232753,16.844781273480933,1.7164342225858276,11.8456241757871,12.110213923486777,6.249956707996622,12.563456221198521,5.784234017721492,1.083714899447492,6.23324892649971,10.13405815308683,5.429965919555388,3.6061114711033637,5.731223426162155,12.57625333931971,12.962403388636737,17.262868854451003,8.383493421701154,10.768018352777183,5.06291189397551,15.686770219562813,17.764360597912493,11.888030639836149,12.534741868426359,12.528934430540515,3.54420372081087,13.50055045054997,5.163231481812485,15.488101788216984,6.601411094531864,16.14646285412031,10.072600896280814,9.387527188312902,14.608288188007283,1.5798320368097807,4.538345768109009,13.360805146701441,11.929175616926377,10.867177685084952,14.394820862631956,9.17221115430956,13.460363678177991,6.970378439172729,6.592620414347512,3.1249699240445805,0.07856125308134398,2.7315768301189447,4.013586384636585,3.105001148370996,19.315599848370802,18.96761473383029,16.291464683074107,19.97519654271022,1.104390439799099,9.594340257570227,8.239211294702397,19.329386202787425,19.863094195306424,6.955527782771771,12.686758733578758,12.44981477854707,1.4673858634030434,13.349098832371876,18.902078728254047,11.633872111721256,15.871713641391057,12.15061665806691,1.1877153024295506,18.348215521367713,13.434244082535027,16.02156055818389,6.389458979920923,7.142667189252392,11.850381385516275,13.801938298413114,12.103670841454681,18.672253603306146,8.030058244273924,4.041620578953462,14.327413740982493,14.62145908004073,9.44379373011384,14.09948470266675,16.4358866706539,7.050138518534679,15.737329959091117,6.813930747136756,13.79342976970067,7.1564937002744555,12.922231384680174,5.80838378063635,3.5506982638614693,10.18438181280031,14.090003653254541,14.981144506449503,18.625251652980754,13.574214197334523,14.088404942626962,17.46363441623818,13.086537851398043,9.590186034013275,17.16263238231706,14.981177525956731,3.7384318634504954,12.855067720738425,2.0257711475297002,7.917356750667559,16.980371717546237,7.967020629912591,7.780947649379111,17.796348029656443,5.957623282514426,8.279962749065003,14.512552900303643,13.607520659052357,11.765150672562692,14.354050572331886,5.0378565100983375,9.011915803095683,1.9780690059066552,8.968549522249148,16.53217799143746,19.159619670137342,16.729210626746976,16.999074213526775,18.96318165327029,15.923335676119805,12.758482593253504,15.538362209129065,2.5116325408317186,7.141388067048431,15.757833834235342,12.820786562697283,5.32474696938499,18.99793099421343,6.152851237267893,17.80143481501856,12.149795728565064,2.7653407108993022,0.7236302980128828,17.34243339366207,5.558674734030755,15.422692512280873,6.266784750651571,19.59828088344046,19.01721135751675,16.607998571597133,1.1690020911034216,5.54410644607958,3.7478754773449863,1.1721174040881044,14.154641026319904,14.644015607225498,11.667269514936693,2.7078613632173454,9.306118985226451,9.761991736951616,17.438891177507596,4.53927386259704,0.6129711716253938,5.004341633127729,12.237391432497983,6.117510180988268,9.475435152503984,10.58105875304844,9.377161405796187,3.109547591984132,2.1592949188147825,10.325467910571708,2.677409583555388,18.331005143422527,14.221217164047118,18.98371651491107,19.229316632252225,3.5043247583991377,1.2170779159910117,9.45916378648783,11.903443365407327,7.13332923856314,16.491656194402808,19.38393866673964,14.929913943186248,8.97817112158766,3.7166114284460106,17.777343798253725,14.00261450104081,1.1349765916537535,10.009087950089391,10.173431557948174,3.656849102440649,2.893855297467409,4.698542168081703,9.936584953276654,3.3220275188509074,16.329700317521972,10.713785517492745,7.851536985043497,19.961088414826733,17.40194094589242,5.157544398495371,5.531915919892847,8.2550858305447,14.950108710940867,16.87855149728849,1.8694947609672674,13.683960083381459,15.486398115326224,7.318368580289074,2.2997478433323337,1.5069392955892402,6.0425658424017525,8.209750284471085,15.644680128975557,14.90344666902522,8.17640180556757,2.1587764740677873,0.3933632579633395,15.963981298930072,7.452791094514644,9.139035304359972,11.89935805938048,15.679263465468981,11.794057809447448,2.807125874289307,3.5938994732423524,14.861420200618976,17.665503076947907,19.11823741758071,3.8402251786100194,12.970190992391961,2.515892707927083,4.092747324846697,8.789082349440559,6.824959093393961,8.920958356662396,12.754733354149593,10.695287772264015,9.883137502507022,12.470459162976123,6.507945437812648,13.692906751744708,19.826616982582692,3.806713887080564,6.41672601835471,16.511055815979244,8.458924003832795,8.10196343460027,14.731876595905074,4.968536592725363,1.8989995708528618,3.0127217302406795,1.478350887322577,17.046655126303484,2.579182279622736,17.5593763082744,18.14486883683561,17.012231712659577,14.078480811083214,7.484415633969328,10.803385193374254,13.92961474323557,2.1293555628637195,18.921813104081075,8.122073922315845,7.886183412631449,7.374936652930999,2.724315842222529,13.576416317429555,14.0515959186923,0.6021329631384376,3.757699607256879,11.248550330501699,14.698234012156849,8.806742280381211,16.843971911615434,16.170517802449297,8.29412090506425,17.348658077775507,9.881546022904182,5.005872843771471,12.631341975691166,4.892976377591012,6.503015840335933,7.799861077755255,1.7077717785285262,17.9980077125181,0.0907610989012353,7.247892676660945,0.026089711266803484,0.3974164996113272,14.997451887115707,5.441178790050358,1.5321308154658109,13.419911931388384,14.116644495088622,15.099833728703903,3.2601011604130425,3.9837929712571407,7.334837541685486,8.924519348950382,3.7776240036587927,7.418588278696778,19.963062576167584,8.911358562110824,7.335062877568119,5.540175203564277,9.989321198645547,7.94366134549104,11.620055204509834,19.363633570718996,17.00007573241824,19.827169846343523,13.751654886883383,2.31122554168937,0.23201713452035033,10.113416924466542,9.167161489260476,8.788348221607185,7.126715237741528,14.61295146251337,10.447239386179369,4.997925657175779,5.450675160339968,10.714695206808248,0.5489819822372111,1.6369609393851237,9.508698375433573,4.632277232502533,8.213502717307538,5.440777405605823,1.4333315044305195,18.13743854741412,11.6838480630238,0.09461557745629179,17.519679085751932,16.328003341570707,14.66182179411993,6.9814741466514585,15.420171792660682,16.086527575070953,2.2226923371458707,18.568062369891976,16.66467143533927,9.510084445287394,13.362028689157954,9.221962946263996,8.34963040065369,11.730066852708338,3.1387008196832067,12.603252041395994,4.428228101645191,2.4607937337076224,16.668070111653623,13.177160648524406,8.493526475920032,19.168190914712774,17.543397063679983,7.1200787450949665,2.4366283668969935,12.858415065921204,6.837365628888699,18.63524479202248,18.097058112992638,2.6506213370116827,15.373826277856612,17.449850712692154,1.2370874352110395,6.993594203486069,15.371623907838462,7.701037617979596,12.439163952163854,1.5972748563054662,11.63358129263858,13.791576374292731,15.375878299567969,16.328834360122467,6.799600499188729,0.43030794373029035,1.1685230043394679,6.741399595353625,11.064510458501214,7.0787339980148145,8.63542451923844,18.195540544907164,13.3247522416025,14.839555385511364,18.361745969574383,13.15898417561459,16.90578768572709,1.3447654935875253,5.468958363970371,13.817378071643706,15.773645206184451,16.9165450270512,2.9145058102460286,3.618766845589647,3.736116749478584,11.309653131668554,8.451523050818004,11.626581339352775,4.806609742823245,8.760823665032422,3.771614916371764,8.571484249305312,0.013671044590326531,19.465938817075752,12.218076174576641,19.59253402747472,18.590470506113398,14.266675918783683,1.4503066140906284,2.4596168997084433,9.175602166330101,11.423625637465138,7.235301594471495,13.421433125672987,14.471443152047163,0.0659657655219048,15.417380852716317,19.75417856041906,5.784937495102893,9.079051987224922,3.4039948847978296,9.092476495143815,10.741078316404732,12.753223696427053,14.510491623686924,18.31792257897268,3.64230171835513,15.207744380269833,0.7719094248103753,7.619016644139669,11.923897458142525,2.716516496593151,18.11397681713555,10.036399644770766,6.276083841631541,10.773553564036389,16.383728628143537,8.761352076829013,7.091445630937834,6.976819140905053,17.741620573039057,16.23505752360881,14.77831942004855,11.69142407424566,18.626277490262645,7.266477479178364,17.934277673277876,16.965526967809595,12.877947472502033,3.466254889785847,9.834112389004943,12.232456020015494,6.062143916860632,2.4265707595642017,6.053993433668756,4.700894305268437,6.715475852410235,3.4437375978078544,7.527725101734064,18.831164061903763,6.288072192409455,18.613267518127916,3.48256184418831,4.427550697506741,6.465061227853024,8.53097755313257,14.648458121343184,18.810989007863856,17.471756958927287,10.166205513549924,3.2350161102964003,2.095512213880264,9.508673461484225,13.471271013635135,7.9452710602121845,17.727912715405605,12.09333327376067,17.01494574310697,13.503030315579139,3.9078345246026824,10.513743397743829,14.394334223277433,14.95375890870966,7.709511519253529,7.953047212987601,5.386591916641659,19.466254317977292,13.076199432617637,16.719024516496503,1.974229622493593,15.052251282921407,16.06856558269434,7.753512800835454,9.68133090281814,15.959677562605936,10.131789039657084,12.727099351164881,18.901252238662533,4.636198975497319,3.092521620505515,15.351808917385759,9.469027174062097,10.341522096649287,13.06864947968406,17.570240414118196,16.199802070555936,17.99025817212631,5.517640331048543,15.333155679383239,11.029762408076419,2.1451425960476067,11.545422441826801,0.9645805332869362,4.128027663892646,12.45251463836642,15.849058144577498,4.124258828285572,5.245614504689744,6.876080315852526,6.543666552450467,14.985246403640256,14.968702837235766,16.86209196737799,16.152270401775265,18.56039419878025,3.6991563700690033,18.917402779741007,0.6195088179011421,8.499275101222018,12.901904794620105,19.40321450019233,12.654153845102861,15.023323175198954,19.33205313028275,13.989692140168914,19.379389699353666,18.350238030753854,3.233506371864645,10.045612748746695,17.43831452244066,9.108928360870037,8.21016964719706,7.486517681153475,12.855562862572615,16.33532805456245,8.219300690952869,19.8144005858792,4.603963193081406,5.2722870276858425,1.8251308708297298,3.7900792243190606,14.763354411602005,13.126844922979197,11.206058118712946,10.09751376678726,18.5251040831294,15.081554317769479,6.939321926079884,17.77310430350518,16.103086474776177,0.033995723093576125,1.0181634554964614,8.932785790284846,10.43605473263819,11.148900306183545,2.2996968106401594,15.728048012698729,15.205834310883981,1.8757732283297646,0.40776725254186186,8.357057570879295,4.502123465358294,18.111651335768567,14.01879461906788,12.373453094816927,16.748764647912083,11.658570134691484,5.252196203549424,7.659121832292977,6.48904717334474,11.478235628667587,3.7325908888977644,7.565412225742216,9.671405602354737,7.641130392254789,9.642237217231443,10.218868927099617,6.8425621709312034,4.189684794846378,2.3931296494017396,19.79017179563392,11.48420738364139,6.748141657325353,14.33270090777009,5.297871035976356,19.32965563328604,1.3566321652994384,11.270071156536922,12.714797090799014,13.817589354865948,2.458185623014155,9.238889903293108,8.738253161148851,5.674712547208571,9.74209427844469,19.388835187553873,11.694305843344988,7.028440926564952,2.9453650991464375,15.264759388149901,17.372307114663453,14.905932211181572,6.235495971228091,4.508181607933248,15.65870411671658,5.689311854985801,14.367127729382938,9.962571204476017,3.8198331613440617,17.114630147548638,7.7592990673496764,18.37140459208177,0.1690336039071738,19.96833615980053,7.643877928798273,14.77131478969143,7.56061348437453,17.285708844440762,14.486586458313901,0.16353538395891487,9.804116988154066,17.917074687172757,0.7428791966292891,15.452120643144518,12.18079657175442,12.455678240402568,4.0571435225259656,15.554194137792251,3.950832367594592,15.17762807666422,12.778596131523084,6.41113337716217,0.29572348851100827,12.626685037346759,15.561787015413518,11.96107023930114,7.047300517401358,5.040280101615431,0.5083093288537288,2.1320982543824796,10.082672943295602,7.820953215281241,11.26582946196265,17.00916012681438,7.096500372574539,4.590953650682281,7.7444058655986625,17.232224516548822,16.05357107341504,4.58959526420089,19.074383947182927,4.996792251109401,10.743624291594095,8.400072361430851,2.055797998456206,1.4345066846564025,9.185461586422804,2.4177402563064465,4.168524084109588,0.8712718170819134,17.795495067719287,4.916956109187378,17.417287266639025,17.309297387165845,12.624235383457773,15.849401584403227,3.579750237710293,16.49406419745215,1.1582415412594038,12.707337916478366,17.604679693635884,2.03510181909222,15.459971690712383,15.253712023690355,10.576355622575209,14.217571524326654,5.976750948228102,16.83341687645262,9.429294424824093,8.190551672550082,16.630854145706945,2.603448811363074,2.8154567340288272,17.666926054234246,14.934577150374206,11.991128356131075,19.243513305671378,2.117162105579893,10.854416411999477,14.343077924183905,10.103047980444138,0.7877785086119093,11.024106847742674,1.8526552056489365,13.510219095943977,13.363572987940287,9.882130600634177,4.825027634932382,2.6372765971535417,13.424026072294467,14.509256318905873,5.472119135593041,19.450826478423867,15.831129906480825,4.3528437711454115,15.52560391466367,9.691230489449714,10.260507371812304,9.005376354159754,6.278595989737483,3.8668345464948217,4.357315836179305,7.796753620397734,8.891942632593182,14.365765851823479,3.092920824762442,12.21566425847477,18.53153062402444,6.777951960588968,17.89821846315048,12.589627338512162,9.604963381160916,16.219076946097402,5.967770058978505,4.39037943329871,15.936511309129319,1.747877488272711,6.081615680758028,2.231721496170458,18.440925453483757,13.070022392864015,8.753778712582761,2.029997617345982,19.90780317084549,9.956615929480037,3.3936257370697875,5.008158965101646,17.140463042001226,18.40823668705444,15.990910476439124,4.392429517126719,2.8122309101084975,4.725559360385985,13.50039614474229,2.291321535613613,12.043130893371657,13.29066760480531,5.684879963044729,3.0914570129468144,0.7612916262827873,4.747777477699846,17.05173583025021,4.602868476596318,13.412818607686612]}

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

}).call(this)}).call(this,"/lib/node_modules/@stdlib/stats/base/dists/uniform/pdf/test/test.factory.js")
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

}).call(this)}).call(this,"/lib/node_modules/@stdlib/stats/base/dists/uniform/pdf/test/test.js")
},{"./../lib":42,"tape":225}],49:[function(require,module,exports){
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

tape( 'if provided `+infinity` for `x` and a valid `a` and `b`, the function returns `0`', opts, function test( t ) {
	var y = pdf( PINF, 0.5, 1.0 );
	t.equal( y, 0.0, 'returns 0' );
	t.end();
});

tape( 'if provided `-infinity` for `x` and a valid `a` and `b`, the function returns `0`', opts, function test( t ) {
	var y = pdf( NINF, 0.5, 1.0 );
	t.equal( y, 0.0, 'returns 0' );
	t.end();
});

tape( 'if provided `a >= b`, the function returns `NaN`', opts, function test( t ) {
	var y;

	y = pdf( 2.0, -1.0, -1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = pdf( 0.0, 3.0, 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = pdf( 0.0, 0.0, 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = pdf( 0.0, -0.5, -1.0 );
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
			tol = 2.0 * EPS * abs( expected[ i ] );
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
			tol = 2.0 * EPS * abs( expected[ i ] );
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
			tol = 2.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. a: '+a[i]+'. b: '+b[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

}).call(this)}).call(this,"/lib/node_modules/@stdlib/stats/base/dists/uniform/pdf/test/test.native.js","/lib/node_modules/@stdlib/stats/base/dists/uniform/pdf/test")
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

}).call(this)}).call(this,"/lib/node_modules/@stdlib/stats/base/dists/uniform/pdf/test/test.pdf.js")
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
