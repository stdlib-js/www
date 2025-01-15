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

},{"@stdlib/utils/native-class":86}],9:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./main.js":10,"./object.js":11,"./primitive.js":12,"@stdlib/utils/define-nonenumerable-read-only-property":72}],10:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./try2serialize.js":14,"@stdlib/assert/has-tostringtag-support":5,"@stdlib/boolean/ctor":35,"@stdlib/utils/native-class":86}],12:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

var main = require( './main.js' );


// EXPORTS //

module.exports = main;

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

},{"@stdlib/assert/is-object-like":20}],18:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"@stdlib/utils/type-of":95}],20:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./main.js":21,"@stdlib/assert/tools/array-function":33,"@stdlib/utils/define-nonenumerable-read-only-property":72}],21:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],22:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./try2exec.js":25,"@stdlib/assert/has-tostringtag-support":5,"@stdlib/utils/native-class":86}],25:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./exec.js":22}],26:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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
var main = require( './main.js' );
var isPrimitive = require( './primitive.js' );
var isObject = require( './object.js' );


// MAIN //

setReadOnly( main, 'isPrimitive', isPrimitive );
setReadOnly( main, 'isObject', isObject );


// EXPORTS //

module.exports = main;

},{"./main.js":27,"./object.js":28,"./primitive.js":29,"@stdlib/utils/define-nonenumerable-read-only-property":72}],27:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./object.js":28,"./primitive.js":29}],28:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./try2valueof.js":30,"@stdlib/assert/has-tostringtag-support":5,"@stdlib/utils/native-class":86}],29:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./valueof.js":31}],31:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"@stdlib/os/platform":46}],33:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./main.js":34}],34:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/assert/is-array":7,"@stdlib/string/format":63}],35:[function(require,module,exports){
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

},{"./main.js":36}],36:[function(require,module,exports){
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

},{}],37:[function(require,module,exports){
module.exports={"@stdlib/array/base/arraylike2object":"000","@stdlib/array-base-arraylike2object":"001","@stdlib/array/base/copy":"002","@stdlib/array-base-copy":"003","@stdlib/array/base/filled-by":"004","@stdlib/array-base-filled-by":"005","@stdlib/array/base/filled":"006","@stdlib/array-base-filled":"007","@stdlib/array/base/incrspace":"008","@stdlib/array-base-incrspace":"009","@stdlib/array/base/linspace":"00A","@stdlib/array-base-linspace":"00B","@stdlib/array/base/logspace":"00C","@stdlib/array-base-logspace":"00D","@stdlib/array/base/ones":"00E","@stdlib/array-base-ones":"00F","@stdlib/array/base":"00G","@stdlib/array-base":"00H","@stdlib/array/base/unitspace":"00I","@stdlib/array-base-unitspace":"00J","@stdlib/array/base/zeros":"00K","@stdlib/array-base-zeros":"00L","@stdlib/array/buffer":"00M","@stdlib/array-buffer":"00N","@stdlib/array/complex128":"00O","@stdlib/array-complex128":"00P","@stdlib/array/complex64":"00Q","@stdlib/array-complex64":"00R","@stdlib/array/convert-same":"00S","@stdlib/array-convert-same":"00T","@stdlib/array/convert":"00U","@stdlib/array-convert":"00V","@stdlib/array/ctors":"00W","@stdlib/array-ctors":"00X","@stdlib/array/dataview":"00Y","@stdlib/array-dataview":"00Z","@stdlib/array/datespace":"00a","@stdlib/array-datespace":"00b","@stdlib/array/dtype":"00c","@stdlib/array-dtype":"00d","@stdlib/array/dtypes":"00e","@stdlib/array-dtypes":"00f","@stdlib/array/filled-by":"00g","@stdlib/array-filled-by":"00h","@stdlib/array/filled":"00i","@stdlib/array-filled":"00j","@stdlib/array/float32":"00k","@stdlib/array-float32":"00l","@stdlib/array/float64":"00m","@stdlib/array-float64":"00n","@stdlib/array/from-iterator":"00o","@stdlib/array-from-iterator":"00p","@stdlib/array/full-like":"00q","@stdlib/array-full-like":"00r","@stdlib/array/full":"00s","@stdlib/array-full":"00t","@stdlib/array/incrspace":"00u","@stdlib/array-incrspace":"00v","@stdlib/array/int16":"00w","@stdlib/array-int16":"00x","@stdlib/array/int32":"00y","@stdlib/array-int32":"00z","@stdlib/array/int8":"010","@stdlib/array-int8":"011","@stdlib/array/linspace":"012","@stdlib/array-linspace":"013","@stdlib/array/logspace":"014","@stdlib/array-logspace":"015","@stdlib/array/min-dtype":"016","@stdlib/array-min-dtype":"017","@stdlib/array/next-dtype":"018","@stdlib/array-next-dtype":"019","@stdlib/array/ones-like":"01A","@stdlib/array-ones-like":"01B","@stdlib/array/ones":"01C","@stdlib/array-ones":"01D","@stdlib/array":"01F","@stdlib/array/pool":"01G","@stdlib/array-pool":"01H","@stdlib/array/promotion-rules":"01I","@stdlib/array-promotion-rules":"01J","@stdlib/array/reviver":"01K","@stdlib/array-reviver":"01L","@stdlib/array/safe-casts":"01M","@stdlib/array-safe-casts":"01N","@stdlib/array/same-kind-casts":"01O","@stdlib/array-same-kind-casts":"01P","@stdlib/array/shape":"01Q","@stdlib/array-shape":"01R","@stdlib/array/shared-buffer":"01S","@stdlib/array-shared-buffer":"01T","@stdlib/array/to-circular-iterator":"01U","@stdlib/array-to-circular-iterator":"01V","@stdlib/array/to-iterator-right":"01W","@stdlib/array-to-iterator-right":"01X","@stdlib/array/to-iterator":"01Y","@stdlib/array-to-iterator":"01Z","@stdlib/array/to-json":"01a","@stdlib/array-to-json":"01b","@stdlib/array/to-sparse-iterator-right":"01c","@stdlib/array-to-sparse-iterator-right":"01d","@stdlib/array/to-sparse-iterator":"01e","@stdlib/array-to-sparse-iterator":"01f","@stdlib/array/to-strided-iterator":"01g","@stdlib/array-to-strided-iterator":"01h","@stdlib/array/to-view-iterator-right":"01i","@stdlib/array-to-view-iterator-right":"01j","@stdlib/array/to-view-iterator":"01k","@stdlib/array-to-view-iterator":"01l","@stdlib/array/typed-complex-ctors":"01m","@stdlib/array-typed-complex-ctors":"01n","@stdlib/array/typed-complex-dtypes":"01o","@stdlib/array-typed-complex-dtypes":"01p","@stdlib/array/typed-complex":"01q","@stdlib/array-typed-complex":"01r","@stdlib/array/typed-ctors":"01s","@stdlib/array-typed-ctors":"01t","@stdlib/array/typed-dtypes":"01u","@stdlib/array-typed-dtypes":"01v","@stdlib/array/typed-float-ctors":"01w","@stdlib/array-typed-float-ctors":"01x","@stdlib/array/typed-float-dtypes":"01y","@stdlib/array-typed-float-dtypes":"01z","@stdlib/array/typed-integer-ctors":"020","@stdlib/array-typed-integer-ctors":"021","@stdlib/array/typed-integer-dtypes":"022","@stdlib/array-typed-integer-dtypes":"023","@stdlib/array/typed-real-ctors":"024","@stdlib/array-typed-real-ctors":"025","@stdlib/array/typed-real-dtypes":"026","@stdlib/array-typed-real-dtypes":"027","@stdlib/array/typed-real-float-ctors":"028","@stdlib/array-typed-real-float-ctors":"029","@stdlib/array/typed-real-float-dtypes":"02A","@stdlib/array-typed-real-float-dtypes":"02B","@stdlib/array/typed-real":"02C","@stdlib/array-typed-real":"02D","@stdlib/array/typed-signed-integer-ctors":"02E","@stdlib/array-typed-signed-integer-ctors":"02F","@stdlib/array/typed-signed-integer-dtypes":"02G","@stdlib/array-typed-signed-integer-dtypes":"02H","@stdlib/array/typed-unsigned-integer-ctors":"02I","@stdlib/array-typed-unsigned-integer-ctors":"02J","@stdlib/array/typed-unsigned-integer-dtypes":"02K","@stdlib/array-typed-unsigned-integer-dtypes":"02L","@stdlib/array/typed":"02M","@stdlib/array-typed":"02N","@stdlib/array/uint16":"02O","@stdlib/array-uint16":"02P","@stdlib/array/uint32":"02Q","@stdlib/array-uint32":"02R","@stdlib/array/uint8":"02S","@stdlib/array-uint8":"02T","@stdlib/array/uint8c":"02U","@stdlib/array-uint8c":"02V","@stdlib/array/zeros-like":"02W","@stdlib/array-zeros-like":"02X","@stdlib/array/zeros":"02Y","@stdlib/array-zeros":"02Z","@stdlib/assert/contains":"02a","@stdlib/assert-contains":"02b","@stdlib/assert/deep-equal":"02c","@stdlib/assert-deep-equal":"02d","@stdlib/assert/deep-has-own-property":"02e","@stdlib/assert-deep-has-own-property":"02f","@stdlib/assert/deep-has-property":"02g","@stdlib/assert-deep-has-property":"02h","@stdlib/assert/has-arraybuffer-support":"02i","@stdlib/assert-has-arraybuffer-support":"02j","@stdlib/assert/has-arrow-function-support":"02k","@stdlib/assert-has-arrow-function-support":"02l","@stdlib/assert/has-async-await-support":"02m","@stdlib/assert-has-async-await-support":"02n","@stdlib/assert/has-async-iterator-symbol-support":"02o","@stdlib/assert-has-async-iterator-symbol-support":"02p","@stdlib/assert/has-bigint-support":"02q","@stdlib/assert-has-bigint-support":"02r","@stdlib/assert/has-bigint64array-support":"02s","@stdlib/assert-has-bigint64array-support":"02t","@stdlib/assert/has-biguint64array-support":"02u","@stdlib/assert-has-biguint64array-support":"02v","@stdlib/assert/has-class-support":"02w","@stdlib/assert-has-class-support":"02x","@stdlib/assert/has-dataview-support":"02y","@stdlib/assert-has-dataview-support":"02z","@stdlib/assert/has-define-properties-support":"030","@stdlib/assert-has-define-properties-support":"031","@stdlib/assert/has-define-property-support":"032","@stdlib/assert-has-define-property-support":"033","@stdlib/assert/has-float32array-support":"034","@stdlib/assert-has-float32array-support":"035","@stdlib/assert/has-float64array-support":"036","@stdlib/assert-has-float64array-support":"037","@stdlib/assert/has-function-name-support":"038","@stdlib/assert-has-function-name-support":"039","@stdlib/assert/has-generator-support":"03A","@stdlib/assert-has-generator-support":"03B","@stdlib/assert/has-globalthis-support":"03C","@stdlib/assert-has-globalthis-support":"03D","@stdlib/assert/has-int16array-support":"03E","@stdlib/assert-has-int16array-support":"03F","@stdlib/assert/has-int32array-support":"03G","@stdlib/assert-has-int32array-support":"03H","@stdlib/assert/has-int8array-support":"03I","@stdlib/assert-has-int8array-support":"03J","@stdlib/assert/has-iterator-symbol-support":"03K","@stdlib/assert-has-iterator-symbol-support":"03L","@stdlib/assert/has-map-support":"03M","@stdlib/assert-has-map-support":"03N","@stdlib/assert/has-node-buffer-support":"03O","@stdlib/assert-has-node-buffer-support":"03P","@stdlib/assert/has-own-property":"03Q","@stdlib/assert-has-own-property":"03R","@stdlib/assert/has-property":"03S","@stdlib/assert-has-property":"03T","@stdlib/assert/has-proxy-support":"03U","@stdlib/assert-has-proxy-support":"03V","@stdlib/assert/has-set-support":"03W","@stdlib/assert-has-set-support":"03X","@stdlib/assert/has-sharedarraybuffer-support":"03Y","@stdlib/assert-has-sharedarraybuffer-support":"03Z","@stdlib/assert/has-symbol-support":"03a","@stdlib/assert-has-symbol-support":"03b","@stdlib/assert/has-tostringtag-support":"03c","@stdlib/assert-has-tostringtag-support":"03d","@stdlib/assert/has-uint16array-support":"03e","@stdlib/assert-has-uint16array-support":"03f","@stdlib/assert/has-uint32array-support":"03g","@stdlib/assert-has-uint32array-support":"03h","@stdlib/assert/has-uint8array-support":"03i","@stdlib/assert-has-uint8array-support":"03j","@stdlib/assert/has-uint8clampedarray-support":"03k","@stdlib/assert-has-uint8clampedarray-support":"03l","@stdlib/assert/has-utf16-surrogate-pair-at":"03m","@stdlib/assert-has-utf16-surrogate-pair-at":"03n","@stdlib/assert/has-wasm-support":"03o","@stdlib/assert-has-wasm-support":"03p","@stdlib/assert/has-weakmap-support":"03q","@stdlib/assert-has-weakmap-support":"03r","@stdlib/assert/has-weakset-support":"03s","@stdlib/assert-has-weakset-support":"03t","@stdlib/assert/instance-of":"03u","@stdlib/assert-instance-of":"03v","@stdlib/assert/is-absolute-http-uri":"03w","@stdlib/assert-is-absolute-http-uri":"03x","@stdlib/assert/is-absolute-path":"03y","@stdlib/assert-is-absolute-path":"03z","@stdlib/assert/is-absolute-uri":"040","@stdlib/assert-is-absolute-uri":"041","@stdlib/assert/is-accessor-property-in":"042","@stdlib/assert-is-accessor-property-in":"043","@stdlib/assert/is-accessor-property":"044","@stdlib/assert-is-accessor-property":"045","@stdlib/assert/is-alphagram":"046","@stdlib/assert-is-alphagram":"047","@stdlib/assert/is-alphanumeric":"048","@stdlib/assert-is-alphanumeric":"049","@stdlib/assert/is-anagram":"04A","@stdlib/assert-is-anagram":"04B","@stdlib/assert/is-arguments":"04C","@stdlib/assert-is-arguments":"04D","@stdlib/assert/is-array-array":"04E","@stdlib/assert-is-array-array":"04F","@stdlib/assert/is-array-length":"04G","@stdlib/assert-is-array-length":"04H","@stdlib/assert/is-array-like-object":"04I","@stdlib/assert-is-array-like-object":"04J","@stdlib/assert/is-array-like":"04K","@stdlib/assert-is-array-like":"04L","@stdlib/assert/is-array":"04M","@stdlib/assert-is-array":"04N","@stdlib/assert/is-arraybuffer-view":"04O","@stdlib/assert-is-arraybuffer-view":"04P","@stdlib/assert/is-arraybuffer":"04Q","@stdlib/assert-is-arraybuffer":"04R","@stdlib/assert/is-arrow-function":"04S","@stdlib/assert-is-arrow-function":"04T","@stdlib/assert/is-ascii":"04U","@stdlib/assert-is-ascii":"04V","@stdlib/assert/is-between-array":"04W","@stdlib/assert-is-between-array":"04X","@stdlib/assert/is-between":"04Y","@stdlib/assert-is-between":"04Z","@stdlib/assert/is-big-endian":"04a","@stdlib/assert-is-big-endian":"04b","@stdlib/assert/is-bigint":"04c","@stdlib/assert-is-bigint":"04d","@stdlib/assert/is-bigint64array":"04e","@stdlib/assert-is-bigint64array":"04f","@stdlib/assert/is-biguint64array":"04g","@stdlib/assert-is-biguint64array":"04h","@stdlib/assert/is-binary-string":"04i","@stdlib/assert-is-binary-string":"04j","@stdlib/assert/is-blank-string":"04k","@stdlib/assert-is-blank-string":"04l","@stdlib/assert/is-boolean-array":"04m","@stdlib/assert-is-boolean-array":"04n","@stdlib/assert/is-boolean":"04o","@stdlib/assert-is-boolean":"04p","@stdlib/assert/is-boxed-primitive":"04q","@stdlib/assert-is-boxed-primitive":"04r","@stdlib/assert/is-browser":"04s","@stdlib/assert-is-browser":"04t","@stdlib/assert/is-buffer":"04u","@stdlib/assert-is-buffer":"04v","@stdlib/assert/is-capitalized":"04w","@stdlib/assert-is-capitalized":"04x","@stdlib/assert/is-centrosymmetric-matrix":"04y","@stdlib/assert-is-centrosymmetric-matrix":"04z","@stdlib/assert/is-circular-array":"050","@stdlib/assert-is-circular-array":"051","@stdlib/assert/is-circular-plain-object":"052","@stdlib/assert-is-circular-plain-object":"053","@stdlib/assert/is-circular":"054","@stdlib/assert-is-circular":"055","@stdlib/assert/is-class":"056","@stdlib/assert-is-class":"057","@stdlib/assert/is-collection":"058","@stdlib/assert-is-collection":"059","@stdlib/assert/is-complex-like":"05A","@stdlib/assert-is-complex-like":"05B","@stdlib/assert/is-complex-typed-array-like":"05C","@stdlib/assert-is-complex-typed-array-like":"05D","@stdlib/assert/is-complex-typed-array":"05E","@stdlib/assert-is-complex-typed-array":"05F","@stdlib/assert/is-complex":"05G","@stdlib/assert-is-complex":"05H","@stdlib/assert/is-complex128":"05I","@stdlib/assert-is-complex128":"05J","@stdlib/assert/is-complex128array":"05K","@stdlib/assert-is-complex128array":"05L","@stdlib/assert/is-complex64":"05M","@stdlib/assert-is-complex64":"05N","@stdlib/assert/is-complex64array":"05O","@stdlib/assert-is-complex64array":"05P","@stdlib/assert/is-composite":"05Q","@stdlib/assert-is-composite":"05R","@stdlib/assert/is-configurable-property-in":"05S","@stdlib/assert-is-configurable-property-in":"05T","@stdlib/assert/is-configurable-property":"05U","@stdlib/assert-is-configurable-property":"05V","@stdlib/assert/is-cube-number":"05W","@stdlib/assert-is-cube-number":"05X","@stdlib/assert/is-darwin":"05Y","@stdlib/assert-is-darwin":"05Z","@stdlib/assert/is-data-property-in":"05a","@stdlib/assert-is-data-property-in":"05b","@stdlib/assert/is-data-property":"05c","@stdlib/assert-is-data-property":"05d","@stdlib/assert/is-dataview":"05e","@stdlib/assert-is-dataview":"05f","@stdlib/assert/is-date-object-array":"05g","@stdlib/assert-is-date-object-array":"05h","@stdlib/assert/is-date-object":"05i","@stdlib/assert-is-date-object":"05j","@stdlib/assert/is-digit-string":"05k","@stdlib/assert-is-digit-string":"05l","@stdlib/assert/is-docker":"05m","@stdlib/assert-is-docker":"05n","@stdlib/assert/is-electron-main":"05o","@stdlib/assert-is-electron-main":"05p","@stdlib/assert/is-electron-renderer":"05q","@stdlib/assert-is-electron-renderer":"05r","@stdlib/assert/is-electron":"05s","@stdlib/assert-is-electron":"05t","@stdlib/assert/is-email-address":"05u","@stdlib/assert-is-email-address":"05v","@stdlib/assert/is-empty-array-like-object":"05w","@stdlib/assert-is-empty-array-like-object":"05x","@stdlib/assert/is-empty-array":"05y","@stdlib/assert-is-empty-array":"05z","@stdlib/assert/is-empty-collection":"060","@stdlib/assert-is-empty-collection":"061","@stdlib/assert/is-empty-object":"062","@stdlib/assert-is-empty-object":"063","@stdlib/assert/is-empty-string":"064","@stdlib/assert-is-empty-string":"065","@stdlib/assert/is-enumerable-property-in":"066","@stdlib/assert-is-enumerable-property-in":"067","@stdlib/assert/is-enumerable-property":"068","@stdlib/assert-is-enumerable-property":"069","@stdlib/assert/is-error":"06A","@stdlib/assert-is-error":"06B","@stdlib/assert/is-eval-error":"06C","@stdlib/assert-is-eval-error":"06D","@stdlib/assert/is-even":"06E","@stdlib/assert-is-even":"06F","@stdlib/assert/is-falsy-array":"06G","@stdlib/assert-is-falsy-array":"06H","@stdlib/assert/is-falsy":"06I","@stdlib/assert-is-falsy":"06J","@stdlib/assert/is-finite-array":"06K","@stdlib/assert-is-finite-array":"06L","@stdlib/assert/is-finite":"06M","@stdlib/assert-is-finite":"06N","@stdlib/assert/is-float32array":"06O","@stdlib/assert-is-float32array":"06P","@stdlib/assert/is-float32matrix-like":"06Q","@stdlib/assert-is-float32matrix-like":"06R","@stdlib/assert/is-float32ndarray-like":"06S","@stdlib/assert-is-float32ndarray-like":"06T","@stdlib/assert/is-float32vector-like":"06U","@stdlib/assert-is-float32vector-like":"06V","@stdlib/assert/is-float64array":"06W","@stdlib/assert-is-float64array":"06X","@stdlib/assert/is-float64matrix-like":"06Y","@stdlib/assert-is-float64matrix-like":"06Z","@stdlib/assert/is-float64ndarray-like":"06a","@stdlib/assert-is-float64ndarray-like":"06b","@stdlib/assert/is-float64vector-like":"06c","@stdlib/assert-is-float64vector-like":"06d","@stdlib/assert/is-function-array":"06e","@stdlib/assert-is-function-array":"06f","@stdlib/assert/is-function":"06g","@stdlib/assert-is-function":"06h","@stdlib/assert/is-generator-object-like":"06i","@stdlib/assert-is-generator-object-like":"06j","@stdlib/assert/is-generator-object":"06k","@stdlib/assert-is-generator-object":"06l","@stdlib/assert/is-gzip-buffer":"06m","@stdlib/assert-is-gzip-buffer":"06n","@stdlib/assert/is-hex-string":"06o","@stdlib/assert-is-hex-string":"06p","@stdlib/assert/is-infinite":"06q","@stdlib/assert-is-infinite":"06r","@stdlib/assert/is-inherited-property":"06s","@stdlib/assert-is-inherited-property":"06t","@stdlib/assert/is-int16array":"06u","@stdlib/assert-is-int16array":"06v","@stdlib/assert/is-int32array":"06w","@stdlib/assert-is-int32array":"06x","@stdlib/assert/is-int8array":"06y","@stdlib/assert-is-int8array":"06z","@stdlib/assert/is-integer-array":"070","@stdlib/assert-is-integer-array":"071","@stdlib/assert/is-integer":"072","@stdlib/assert-is-integer":"073","@stdlib/assert/is-iterable-like":"074","@stdlib/assert-is-iterable-like":"075","@stdlib/assert/is-iterator-like":"076","@stdlib/assert-is-iterator-like":"077","@stdlib/assert/is-json":"078","@stdlib/assert-is-json":"079","@stdlib/assert/is-leap-year":"07A","@stdlib/assert-is-leap-year":"07B","@stdlib/assert/is-little-endian":"07C","@stdlib/assert-is-little-endian":"07D","@stdlib/assert/is-localhost":"07E","@stdlib/assert-is-localhost":"07F","@stdlib/assert/is-lowercase":"07G","@stdlib/assert-is-lowercase":"07H","@stdlib/assert/is-matrix-like":"07I","@stdlib/assert-is-matrix-like":"07J","@stdlib/assert/is-method-in":"07K","@stdlib/assert-is-method-in":"07L","@stdlib/assert/is-method":"07M","@stdlib/assert-is-method":"07N","@stdlib/assert/is-mobile":"07O","@stdlib/assert-is-mobile":"07P","@stdlib/assert/is-named-typed-tuple-like":"07Q","@stdlib/assert-is-named-typed-tuple-like":"07R","@stdlib/assert/is-nan-array":"07S","@stdlib/assert-is-nan-array":"07T","@stdlib/assert/is-nan":"07U","@stdlib/assert-is-nan":"07V","@stdlib/assert/is-native-function":"07W","@stdlib/assert-is-native-function":"07X","@stdlib/assert/is-ndarray-like":"07Y","@stdlib/assert-is-ndarray-like":"07Z","@stdlib/assert/is-negative-integer-array":"07a","@stdlib/assert-is-negative-integer-array":"07b","@stdlib/assert/is-negative-integer":"07c","@stdlib/assert-is-negative-integer":"07d","@stdlib/assert/is-negative-number-array":"07e","@stdlib/assert-is-negative-number-array":"07f","@stdlib/assert/is-negative-number":"07g","@stdlib/assert-is-negative-number":"07h","@stdlib/assert/is-negative-zero":"07i","@stdlib/assert-is-negative-zero":"07j","@stdlib/assert/is-node-builtin":"07k","@stdlib/assert-is-node-builtin":"07l","@stdlib/assert/is-node-duplex-stream-like":"07m","@stdlib/assert-is-node-duplex-stream-like":"07n","@stdlib/assert/is-node-readable-stream-like":"07o","@stdlib/assert-is-node-readable-stream-like":"07p","@stdlib/assert/is-node-repl":"07q","@stdlib/assert-is-node-repl":"07r","@stdlib/assert/is-node-stream-like":"07s","@stdlib/assert-is-node-stream-like":"07t","@stdlib/assert/is-node-transform-stream-like":"07u","@stdlib/assert-is-node-transform-stream-like":"07v","@stdlib/assert/is-node-writable-stream-like":"07w","@stdlib/assert-is-node-writable-stream-like":"07x","@stdlib/assert/is-node":"07y","@stdlib/assert-is-node":"07z","@stdlib/assert/is-nonconfigurable-property-in":"080","@stdlib/assert-is-nonconfigurable-property-in":"081","@stdlib/assert/is-nonconfigurable-property":"082","@stdlib/assert-is-nonconfigurable-property":"083","@stdlib/assert/is-nonenumerable-property-in":"084","@stdlib/assert-is-nonenumerable-property-in":"085","@stdlib/assert/is-nonenumerable-property":"086","@stdlib/assert-is-nonenumerable-property":"087","@stdlib/assert/is-nonnegative-integer-array":"088","@stdlib/assert-is-nonnegative-integer-array":"089","@stdlib/assert/is-nonnegative-integer":"08A","@stdlib/assert-is-nonnegative-integer":"08B","@stdlib/assert/is-nonnegative-number-array":"08C","@stdlib/assert-is-nonnegative-number-array":"08D","@stdlib/assert/is-nonnegative-number":"08E","@stdlib/assert-is-nonnegative-number":"08F","@stdlib/assert/is-nonpositive-integer-array":"08G","@stdlib/assert-is-nonpositive-integer-array":"08H","@stdlib/assert/is-nonpositive-integer":"08I","@stdlib/assert-is-nonpositive-integer":"08J","@stdlib/assert/is-nonpositive-number-array":"08K","@stdlib/assert-is-nonpositive-number-array":"08L","@stdlib/assert/is-nonpositive-number":"08M","@stdlib/assert-is-nonpositive-number":"08N","@stdlib/assert/is-nonsymmetric-matrix":"08O","@stdlib/assert-is-nonsymmetric-matrix":"08P","@stdlib/assert/is-null-array":"08Q","@stdlib/assert-is-null-array":"08R","@stdlib/assert/is-null":"08S","@stdlib/assert-is-null":"08T","@stdlib/assert/is-number-array":"08U","@stdlib/assert-is-number-array":"08V","@stdlib/assert/is-number":"08W","@stdlib/assert-is-number":"08X","@stdlib/assert/is-numeric-array":"08Y","@stdlib/assert-is-numeric-array":"08Z","@stdlib/assert/is-object-array":"08a","@stdlib/assert-is-object-array":"08b","@stdlib/assert/is-object-like":"08c","@stdlib/assert-is-object-like":"08d","@stdlib/assert/is-object":"08e","@stdlib/assert-is-object":"08f","@stdlib/assert/is-odd":"08g","@stdlib/assert-is-odd":"08h","@stdlib/assert/is-persymmetric-matrix":"08i","@stdlib/assert-is-persymmetric-matrix":"08j","@stdlib/assert/is-plain-object-array":"08k","@stdlib/assert-is-plain-object-array":"08l","@stdlib/assert/is-plain-object":"08m","@stdlib/assert-is-plain-object":"08n","@stdlib/assert/is-positive-integer-array":"08o","@stdlib/assert-is-positive-integer-array":"08p","@stdlib/assert/is-positive-integer":"08q","@stdlib/assert-is-positive-integer":"08r","@stdlib/assert/is-positive-number-array":"08s","@stdlib/assert-is-positive-number-array":"08t","@stdlib/assert/is-positive-number":"08u","@stdlib/assert-is-positive-number":"08v","@stdlib/assert/is-positive-zero":"08w","@stdlib/assert-is-positive-zero":"08x","@stdlib/assert/is-prime":"08y","@stdlib/assert-is-prime":"08z","@stdlib/assert/is-primitive-array":"090","@stdlib/assert-is-primitive-array":"091","@stdlib/assert/is-primitive":"092","@stdlib/assert-is-primitive":"093","@stdlib/assert/is-prng-like":"094","@stdlib/assert-is-prng-like":"095","@stdlib/assert/is-probability-array":"096","@stdlib/assert-is-probability-array":"097","@stdlib/assert/is-probability":"098","@stdlib/assert-is-probability":"099","@stdlib/assert/is-property-key":"09A","@stdlib/assert-is-property-key":"09B","@stdlib/assert/is-prototype-of":"09C","@stdlib/assert-is-prototype-of":"09D","@stdlib/assert/is-range-error":"09E","@stdlib/assert-is-range-error":"09F","@stdlib/assert/is-read-only-property-in":"09G","@stdlib/assert-is-read-only-property-in":"09H","@stdlib/assert/is-read-only-property":"09I","@stdlib/assert-is-read-only-property":"09J","@stdlib/assert/is-read-write-property-in":"09K","@stdlib/assert-is-read-write-property-in":"09L","@stdlib/assert/is-read-write-property":"09M","@stdlib/assert-is-read-write-property":"09N","@stdlib/assert/is-readable-property-in":"09O","@stdlib/assert-is-readable-property-in":"09P","@stdlib/assert/is-readable-property":"09Q","@stdlib/assert-is-readable-property":"09R","@stdlib/assert/is-reference-error":"09S","@stdlib/assert-is-reference-error":"09T","@stdlib/assert/is-regexp-string":"09U","@stdlib/assert-is-regexp-string":"09V","@stdlib/assert/is-regexp":"09W","@stdlib/assert-is-regexp":"09X","@stdlib/assert/is-relative-path":"09Y","@stdlib/assert-is-relative-path":"09Z","@stdlib/assert/is-relative-uri":"09a","@stdlib/assert-is-relative-uri":"09b","@stdlib/assert/is-safe-integer-array":"09c","@stdlib/assert-is-safe-integer-array":"09d","@stdlib/assert/is-safe-integer":"09e","@stdlib/assert-is-safe-integer":"09f","@stdlib/assert/is-same-native-class":"09g","@stdlib/assert-is-same-native-class":"09h","@stdlib/assert/is-same-type":"09i","@stdlib/assert-is-same-type":"09j","@stdlib/assert/is-same-value-zero":"09k","@stdlib/assert-is-same-value-zero":"09l","@stdlib/assert/is-same-value":"09m","@stdlib/assert-is-same-value":"09n","@stdlib/assert/is-sharedarraybuffer":"09o","@stdlib/assert-is-sharedarraybuffer":"09p","@stdlib/assert/is-skew-centrosymmetric-matrix":"09q","@stdlib/assert-is-skew-centrosymmetric-matrix":"09r","@stdlib/assert/is-skew-persymmetric-matrix":"09s","@stdlib/assert-is-skew-persymmetric-matrix":"09t","@stdlib/assert/is-skew-symmetric-matrix":"09u","@stdlib/assert-is-skew-symmetric-matrix":"09v","@stdlib/assert/is-square-matrix":"09w","@stdlib/assert-is-square-matrix":"09x","@stdlib/assert/is-square-number":"09y","@stdlib/assert-is-square-number":"09z","@stdlib/assert/is-square-triangular-number":"0A0","@stdlib/assert-is-square-triangular-number":"0A1","@stdlib/assert/is-strict-equal":"0A2","@stdlib/assert-is-strict-equal":"0A3","@stdlib/assert/is-string-array":"0A4","@stdlib/assert-is-string-array":"0A5","@stdlib/assert/is-string":"0A6","@stdlib/assert-is-string":"0A7","@stdlib/assert/is-symbol-array":"0A8","@stdlib/assert-is-symbol-array":"0A9","@stdlib/assert/is-symbol":"0AA","@stdlib/assert-is-symbol":"0AB","@stdlib/assert/is-symmetric-matrix":"0AC","@stdlib/assert-is-symmetric-matrix":"0AD","@stdlib/assert/is-syntax-error":"0AE","@stdlib/assert-is-syntax-error":"0AF","@stdlib/assert/is-touch-device":"0AG","@stdlib/assert-is-touch-device":"0AH","@stdlib/assert/is-triangular-number":"0AI","@stdlib/assert-is-triangular-number":"0AJ","@stdlib/assert/is-truthy-array":"0AK","@stdlib/assert-is-truthy-array":"0AL","@stdlib/assert/is-truthy":"0AM","@stdlib/assert-is-truthy":"0AN","@stdlib/assert/is-type-error":"0AO","@stdlib/assert-is-type-error":"0AP","@stdlib/assert/is-typed-array-length":"0AQ","@stdlib/assert-is-typed-array-length":"0AR","@stdlib/assert/is-typed-array-like":"0AS","@stdlib/assert-is-typed-array-like":"0AT","@stdlib/assert/is-typed-array":"0AU","@stdlib/assert-is-typed-array":"0AV","@stdlib/assert/is-uint16array":"0AW","@stdlib/assert-is-uint16array":"0AX","@stdlib/assert/is-uint32array":"0AY","@stdlib/assert-is-uint32array":"0AZ","@stdlib/assert/is-uint8array":"0Aa","@stdlib/assert-is-uint8array":"0Ab","@stdlib/assert/is-uint8clampedarray":"0Ac","@stdlib/assert-is-uint8clampedarray":"0Ad","@stdlib/assert/is-unc-path":"0Ae","@stdlib/assert-is-unc-path":"0Af","@stdlib/assert/is-undefined-or-null":"0Ag","@stdlib/assert-is-undefined-or-null":"0Ah","@stdlib/assert/is-undefined":"0Ai","@stdlib/assert-is-undefined":"0Aj","@stdlib/assert/is-unity-probability-array":"0Ak","@stdlib/assert-is-unity-probability-array":"0Al","@stdlib/assert/is-uppercase":"0Am","@stdlib/assert-is-uppercase":"0An","@stdlib/assert/is-uri-error":"0Ao","@stdlib/assert-is-uri-error":"0Ap","@stdlib/assert/is-uri":"0Aq","@stdlib/assert-is-uri":"0Ar","@stdlib/assert/is-vector-like":"0As","@stdlib/assert-is-vector-like":"0At","@stdlib/assert/is-web-worker":"0Au","@stdlib/assert-is-web-worker":"0Av","@stdlib/assert/is-whitespace":"0Aw","@stdlib/assert-is-whitespace":"0Ax","@stdlib/assert/is-windows":"0Ay","@stdlib/assert-is-windows":"0Az","@stdlib/assert/is-writable-property-in":"0B0","@stdlib/assert-is-writable-property-in":"0B1","@stdlib/assert/is-writable-property":"0B2","@stdlib/assert-is-writable-property":"0B3","@stdlib/assert/is-write-only-property-in":"0B4","@stdlib/assert-is-write-only-property-in":"0B5","@stdlib/assert/is-write-only-property":"0B6","@stdlib/assert-is-write-only-property":"0B7","@stdlib/assert":"0B9","@stdlib/assert/tools/array-function":"0BA","@stdlib/assert-tools-array-function":"0BB","@stdlib/assert/tools/array-like-function":"0BC","@stdlib/assert-tools-array-like-function":"0BD","@stdlib/assert/tools":"0BE","@stdlib/assert-tools":"0BF","@stdlib/assert/tools/typed-array-function":"0BG","@stdlib/assert-tools-typed-array-function":"0BH","@stdlib/bench/harness":"0BI","@stdlib/bench-harness":"0BJ","@stdlib/bench":"0BL","@stdlib/bigint/ctor":"0BM","@stdlib/bigint-ctor":"0BN","@stdlib/bigint":"0BP","@stdlib/blas/base/ccopy":"0BQ","@stdlib/blas-base-ccopy":"0BR","@stdlib/blas/base/cswap":"0BS","@stdlib/blas-base-cswap":"0BT","@stdlib/blas/base/dasum":"0BU","@stdlib/blas-base-dasum":"0BV","@stdlib/blas/base/daxpy":"0BW","@stdlib/blas-base-daxpy":"0BX","@stdlib/blas/base/dcopy":"0BY","@stdlib/blas-base-dcopy":"0BZ","@stdlib/blas/base/ddot":"0Ba","@stdlib/blas-base-ddot":"0Bb","@stdlib/blas/base/dnrm2":"0Bc","@stdlib/blas-base-dnrm2":"0Bd","@stdlib/blas/base/dscal":"0Be","@stdlib/blas-base-dscal":"0Bf","@stdlib/blas/base/dsdot":"0Bg","@stdlib/blas-base-dsdot":"0Bh","@stdlib/blas/base/dswap":"0Bi","@stdlib/blas-base-dswap":"0Bj","@stdlib/blas/base/gasum":"0Bk","@stdlib/blas-base-gasum":"0Bl","@stdlib/blas/base/gaxpy":"0Bm","@stdlib/blas-base-gaxpy":"0Bn","@stdlib/blas/base/gcopy":"0Bo","@stdlib/blas-base-gcopy":"0Bp","@stdlib/blas/base/gdot":"0Bq","@stdlib/blas-base-gdot":"0Br","@stdlib/blas/base/gnrm2":"0Bs","@stdlib/blas-base-gnrm2":"0Bt","@stdlib/blas/base/gscal":"0Bu","@stdlib/blas-base-gscal":"0Bv","@stdlib/blas/base/gswap":"0Bw","@stdlib/blas-base-gswap":"0Bx","@stdlib/blas/base":"0By","@stdlib/blas-base":"0Bz","@stdlib/blas/base/sasum":"0C0","@stdlib/blas-base-sasum":"0C1","@stdlib/blas/base/saxpy":"0C2","@stdlib/blas-base-saxpy":"0C3","@stdlib/blas/base/scopy":"0C4","@stdlib/blas-base-scopy":"0C5","@stdlib/blas/base/sdot":"0C6","@stdlib/blas-base-sdot":"0C7","@stdlib/blas/base/sdsdot":"0C8","@stdlib/blas-base-sdsdot":"0C9","@stdlib/blas/base/snrm2":"0CA","@stdlib/blas-base-snrm2":"0CB","@stdlib/blas/base/sscal":"0CC","@stdlib/blas-base-sscal":"0CD","@stdlib/blas/base/sswap":"0CE","@stdlib/blas-base-sswap":"0CF","@stdlib/blas/ddot":"0CG","@stdlib/blas-ddot":"0CH","@stdlib/blas/dswap":"0CI","@stdlib/blas-dswap":"0CJ","@stdlib/blas/ext/base/dapx":"0CK","@stdlib/blas-ext-base-dapx":"0CL","@stdlib/blas/ext/base/dapxsum":"0CM","@stdlib/blas-ext-base-dapxsum":"0CN","@stdlib/blas/ext/base/dapxsumkbn":"0CO","@stdlib/blas-ext-base-dapxsumkbn":"0CP","@stdlib/blas/ext/base/dapxsumkbn2":"0CQ","@stdlib/blas-ext-base-dapxsumkbn2":"0CR","@stdlib/blas/ext/base/dapxsumors":"0CS","@stdlib/blas-ext-base-dapxsumors":"0CT","@stdlib/blas/ext/base/dapxsumpw":"0CU","@stdlib/blas-ext-base-dapxsumpw":"0CV","@stdlib/blas/ext/base/dasumpw":"0CW","@stdlib/blas-ext-base-dasumpw":"0CX","@stdlib/blas/ext/base/dcusum":"0CY","@stdlib/blas-ext-base-dcusum":"0CZ","@stdlib/blas/ext/base/dcusumkbn":"0Ca","@stdlib/blas-ext-base-dcusumkbn":"0Cb","@stdlib/blas/ext/base/dcusumkbn2":"0Cc","@stdlib/blas-ext-base-dcusumkbn2":"0Cd","@stdlib/blas/ext/base/dcusumors":"0Ce","@stdlib/blas-ext-base-dcusumors":"0Cf","@stdlib/blas/ext/base/dcusumpw":"0Cg","@stdlib/blas-ext-base-dcusumpw":"0Ch","@stdlib/blas/ext/base/dfill":"0Ci","@stdlib/blas-ext-base-dfill":"0Cj","@stdlib/blas/ext/base/dnanasum":"0Ck","@stdlib/blas-ext-base-dnanasum":"0Cl","@stdlib/blas/ext/base/dnanasumors":"0Cm","@stdlib/blas-ext-base-dnanasumors":"0Cn","@stdlib/blas/ext/base/dnannsum":"0Co","@stdlib/blas-ext-base-dnannsum":"0Cp","@stdlib/blas/ext/base/dnannsumkbn":"0Cq","@stdlib/blas-ext-base-dnannsumkbn":"0Cr","@stdlib/blas/ext/base/dnannsumkbn2":"0Cs","@stdlib/blas-ext-base-dnannsumkbn2":"0Ct","@stdlib/blas/ext/base/dnannsumors":"0Cu","@stdlib/blas-ext-base-dnannsumors":"0Cv","@stdlib/blas/ext/base/dnannsumpw":"0Cw","@stdlib/blas-ext-base-dnannsumpw":"0Cx","@stdlib/blas/ext/base/dnansum":"0Cy","@stdlib/blas-ext-base-dnansum":"0Cz","@stdlib/blas/ext/base/dnansumkbn":"0D0","@stdlib/blas-ext-base-dnansumkbn":"0D1","@stdlib/blas/ext/base/dnansumkbn2":"0D2","@stdlib/blas-ext-base-dnansumkbn2":"0D3","@stdlib/blas/ext/base/dnansumors":"0D4","@stdlib/blas-ext-base-dnansumors":"0D5","@stdlib/blas/ext/base/dnansumpw":"0D6","@stdlib/blas-ext-base-dnansumpw":"0D7","@stdlib/blas/ext/base/drev":"0D8","@stdlib/blas-ext-base-drev":"0D9","@stdlib/blas/ext/base/dsapxsum":"0DA","@stdlib/blas-ext-base-dsapxsum":"0DB","@stdlib/blas/ext/base/dsapxsumpw":"0DC","@stdlib/blas-ext-base-dsapxsumpw":"0DD","@stdlib/blas/ext/base/dsnannsumors":"0DE","@stdlib/blas-ext-base-dsnannsumors":"0DF","@stdlib/blas/ext/base/dsnansum":"0DG","@stdlib/blas-ext-base-dsnansum":"0DH","@stdlib/blas/ext/base/dsnansumors":"0DI","@stdlib/blas-ext-base-dsnansumors":"0DJ","@stdlib/blas/ext/base/dsnansumpw":"0DK","@stdlib/blas-ext-base-dsnansumpw":"0DL","@stdlib/blas/ext/base/dsort2hp":"0DM","@stdlib/blas-ext-base-dsort2hp":"0DN","@stdlib/blas/ext/base/dsort2ins":"0DO","@stdlib/blas-ext-base-dsort2ins":"0DP","@stdlib/blas/ext/base/dsort2sh":"0DQ","@stdlib/blas-ext-base-dsort2sh":"0DR","@stdlib/blas/ext/base/dsorthp":"0DS","@stdlib/blas-ext-base-dsorthp":"0DT","@stdlib/blas/ext/base/dsortins":"0DU","@stdlib/blas-ext-base-dsortins":"0DV","@stdlib/blas/ext/base/dsortsh":"0DW","@stdlib/blas-ext-base-dsortsh":"0DX","@stdlib/blas/ext/base/dssum":"0DY","@stdlib/blas-ext-base-dssum":"0DZ","@stdlib/blas/ext/base/dssumors":"0Da","@stdlib/blas-ext-base-dssumors":"0Db","@stdlib/blas/ext/base/dssumpw":"0Dc","@stdlib/blas-ext-base-dssumpw":"0Dd","@stdlib/blas/ext/base/dsum":"0De","@stdlib/blas-ext-base-dsum":"0Df","@stdlib/blas/ext/base/dsumkbn":"0Dg","@stdlib/blas-ext-base-dsumkbn":"0Dh","@stdlib/blas/ext/base/dsumkbn2":"0Di","@stdlib/blas-ext-base-dsumkbn2":"0Dj","@stdlib/blas/ext/base/dsumors":"0Dk","@stdlib/blas-ext-base-dsumors":"0Dl","@stdlib/blas/ext/base/dsumpw":"0Dm","@stdlib/blas-ext-base-dsumpw":"0Dn","@stdlib/blas/ext/base/gapx":"0Do","@stdlib/blas-ext-base-gapx":"0Dp","@stdlib/blas/ext/base/gapxsum":"0Dq","@stdlib/blas-ext-base-gapxsum":"0Dr","@stdlib/blas/ext/base/gapxsumkbn":"0Ds","@stdlib/blas-ext-base-gapxsumkbn":"0Dt","@stdlib/blas/ext/base/gapxsumkbn2":"0Du","@stdlib/blas-ext-base-gapxsumkbn2":"0Dv","@stdlib/blas/ext/base/gapxsumors":"0Dw","@stdlib/blas-ext-base-gapxsumors":"0Dx","@stdlib/blas/ext/base/gapxsumpw":"0Dy","@stdlib/blas-ext-base-gapxsumpw":"0Dz","@stdlib/blas/ext/base/gasumpw":"0E0","@stdlib/blas-ext-base-gasumpw":"0E1","@stdlib/blas/ext/base/gcusum":"0E2","@stdlib/blas-ext-base-gcusum":"0E3","@stdlib/blas/ext/base/gcusumkbn":"0E4","@stdlib/blas-ext-base-gcusumkbn":"0E5","@stdlib/blas/ext/base/gcusumkbn2":"0E6","@stdlib/blas-ext-base-gcusumkbn2":"0E7","@stdlib/blas/ext/base/gcusumors":"0E8","@stdlib/blas-ext-base-gcusumors":"0E9","@stdlib/blas/ext/base/gcusumpw":"0EA","@stdlib/blas-ext-base-gcusumpw":"0EB","@stdlib/blas/ext/base/gfill-by":"0EC","@stdlib/blas-ext-base-gfill-by":"0ED","@stdlib/blas/ext/base/gfill":"0EE","@stdlib/blas-ext-base-gfill":"0EF","@stdlib/blas/ext/base/gnannsumkbn":"0EG","@stdlib/blas-ext-base-gnannsumkbn":"0EH","@stdlib/blas/ext/base/gnansum":"0EI","@stdlib/blas-ext-base-gnansum":"0EJ","@stdlib/blas/ext/base/gnansumkbn":"0EK","@stdlib/blas-ext-base-gnansumkbn":"0EL","@stdlib/blas/ext/base/gnansumkbn2":"0EM","@stdlib/blas-ext-base-gnansumkbn2":"0EN","@stdlib/blas/ext/base/gnansumors":"0EO","@stdlib/blas-ext-base-gnansumors":"0EP","@stdlib/blas/ext/base/gnansumpw":"0EQ","@stdlib/blas-ext-base-gnansumpw":"0ER","@stdlib/blas/ext/base/grev":"0ES","@stdlib/blas-ext-base-grev":"0ET","@stdlib/blas/ext/base/gsort2hp":"0EU","@stdlib/blas-ext-base-gsort2hp":"0EV","@stdlib/blas/ext/base/gsort2ins":"0EW","@stdlib/blas-ext-base-gsort2ins":"0EX","@stdlib/blas/ext/base/gsort2sh":"0EY","@stdlib/blas-ext-base-gsort2sh":"0EZ","@stdlib/blas/ext/base/gsorthp":"0Ea","@stdlib/blas-ext-base-gsorthp":"0Eb","@stdlib/blas/ext/base/gsortins":"0Ec","@stdlib/blas-ext-base-gsortins":"0Ed","@stdlib/blas/ext/base/gsortsh":"0Ee","@stdlib/blas-ext-base-gsortsh":"0Ef","@stdlib/blas/ext/base/gsum":"0Eg","@stdlib/blas-ext-base-gsum":"0Eh","@stdlib/blas/ext/base/gsumkbn":"0Ei","@stdlib/blas-ext-base-gsumkbn":"0Ej","@stdlib/blas/ext/base/gsumkbn2":"0Ek","@stdlib/blas-ext-base-gsumkbn2":"0El","@stdlib/blas/ext/base/gsumors":"0Em","@stdlib/blas-ext-base-gsumors":"0En","@stdlib/blas/ext/base/gsumpw":"0Eo","@stdlib/blas-ext-base-gsumpw":"0Ep","@stdlib/blas/ext/base":"0Eq","@stdlib/blas-ext-base":"0Er","@stdlib/blas/ext/base/sapx":"0Es","@stdlib/blas-ext-base-sapx":"0Et","@stdlib/blas/ext/base/sapxsum":"0Eu","@stdlib/blas-ext-base-sapxsum":"0Ev","@stdlib/blas/ext/base/sapxsumkbn":"0Ew","@stdlib/blas-ext-base-sapxsumkbn":"0Ex","@stdlib/blas/ext/base/sapxsumkbn2":"0Ey","@stdlib/blas-ext-base-sapxsumkbn2":"0Ez","@stdlib/blas/ext/base/sapxsumors":"0F0","@stdlib/blas-ext-base-sapxsumors":"0F1","@stdlib/blas/ext/base/sapxsumpw":"0F2","@stdlib/blas-ext-base-sapxsumpw":"0F3","@stdlib/blas/ext/base/sasumpw":"0F4","@stdlib/blas-ext-base-sasumpw":"0F5","@stdlib/blas/ext/base/scusum":"0F6","@stdlib/blas-ext-base-scusum":"0F7","@stdlib/blas/ext/base/scusumkbn":"0F8","@stdlib/blas-ext-base-scusumkbn":"0F9","@stdlib/blas/ext/base/scusumkbn2":"0FA","@stdlib/blas-ext-base-scusumkbn2":"0FB","@stdlib/blas/ext/base/scusumors":"0FC","@stdlib/blas-ext-base-scusumors":"0FD","@stdlib/blas/ext/base/scusumpw":"0FE","@stdlib/blas-ext-base-scusumpw":"0FF","@stdlib/blas/ext/base/sdsapxsum":"0FG","@stdlib/blas-ext-base-sdsapxsum":"0FH","@stdlib/blas/ext/base/sdsapxsumpw":"0FI","@stdlib/blas-ext-base-sdsapxsumpw":"0FJ","@stdlib/blas/ext/base/sdsnansum":"0FK","@stdlib/blas-ext-base-sdsnansum":"0FL","@stdlib/blas/ext/base/sdsnansumpw":"0FM","@stdlib/blas-ext-base-sdsnansumpw":"0FN","@stdlib/blas/ext/base/sdssum":"0FO","@stdlib/blas-ext-base-sdssum":"0FP","@stdlib/blas/ext/base/sdssumpw":"0FQ","@stdlib/blas-ext-base-sdssumpw":"0FR","@stdlib/blas/ext/base/sfill":"0FS","@stdlib/blas-ext-base-sfill":"0FT","@stdlib/blas/ext/base/snansum":"0FU","@stdlib/blas-ext-base-snansum":"0FV","@stdlib/blas/ext/base/snansumkbn":"0FW","@stdlib/blas-ext-base-snansumkbn":"0FX","@stdlib/blas/ext/base/snansumkbn2":"0FY","@stdlib/blas-ext-base-snansumkbn2":"0FZ","@stdlib/blas/ext/base/snansumors":"0Fa","@stdlib/blas-ext-base-snansumors":"0Fb","@stdlib/blas/ext/base/snansumpw":"0Fc","@stdlib/blas-ext-base-snansumpw":"0Fd","@stdlib/blas/ext/base/srev":"0Fe","@stdlib/blas-ext-base-srev":"0Ff","@stdlib/blas/ext/base/ssort2hp":"0Fg","@stdlib/blas-ext-base-ssort2hp":"0Fh","@stdlib/blas/ext/base/ssort2ins":"0Fi","@stdlib/blas-ext-base-ssort2ins":"0Fj","@stdlib/blas/ext/base/ssort2sh":"0Fk","@stdlib/blas-ext-base-ssort2sh":"0Fl","@stdlib/blas/ext/base/ssorthp":"0Fm","@stdlib/blas-ext-base-ssorthp":"0Fn","@stdlib/blas/ext/base/ssortins":"0Fo","@stdlib/blas-ext-base-ssortins":"0Fp","@stdlib/blas/ext/base/ssortsh":"0Fq","@stdlib/blas-ext-base-ssortsh":"0Fr","@stdlib/blas/ext/base/ssum":"0Fs","@stdlib/blas-ext-base-ssum":"0Ft","@stdlib/blas/ext/base/ssumkbn":"0Fu","@stdlib/blas-ext-base-ssumkbn":"0Fv","@stdlib/blas/ext/base/ssumkbn2":"0Fw","@stdlib/blas-ext-base-ssumkbn2":"0Fx","@stdlib/blas/ext/base/ssumors":"0Fy","@stdlib/blas-ext-base-ssumors":"0Fz","@stdlib/blas/ext/base/ssumpw":"0G0","@stdlib/blas-ext-base-ssumpw":"0G1","@stdlib/blas/ext":"0G2","@stdlib/blas-ext":"0G3","@stdlib/blas/gdot":"0G4","@stdlib/blas-gdot":"0G5","@stdlib/blas/gswap":"0G6","@stdlib/blas-gswap":"0G7","@stdlib/blas":"0G9","@stdlib/blas/sdot":"0GA","@stdlib/blas-sdot":"0GB","@stdlib/blas/sswap":"0GC","@stdlib/blas-sswap":"0GD","@stdlib/buffer/alloc-unsafe":"0GE","@stdlib/buffer-alloc-unsafe":"0GF","@stdlib/buffer/ctor":"0GG","@stdlib/buffer-ctor":"0GH","@stdlib/buffer/from-array":"0GI","@stdlib/buffer-from-array":"0GJ","@stdlib/buffer/from-arraybuffer":"0GK","@stdlib/buffer-from-arraybuffer":"0GL","@stdlib/buffer/from-buffer":"0GM","@stdlib/buffer-from-buffer":"0GN","@stdlib/buffer/from-string":"0GO","@stdlib/buffer-from-string":"0GP","@stdlib/buffer":"0GR","@stdlib/buffer/reviver":"0GS","@stdlib/buffer-reviver":"0GT","@stdlib/buffer/to-json":"0GU","@stdlib/buffer-to-json":"0GV","@stdlib/cli/ctor":"0GW","@stdlib/cli-ctor":"0GX","@stdlib/cli":"0GZ","@stdlib/complex/base/wrap-function":"0Ga","@stdlib/complex-base-wrap-function":"0Gb","@stdlib/complex/cmplx":"0Gc","@stdlib/complex-cmplx":"0Gd","@stdlib/complex/conj":"0Ge","@stdlib/complex-conj":"0Gf","@stdlib/complex/conjf":"0Gg","@stdlib/complex-conjf":"0Gh","@stdlib/complex/ctors":"0Gi","@stdlib/complex-ctors":"0Gj","@stdlib/complex/dtype":"0Gk","@stdlib/complex-dtype":"0Gl","@stdlib/complex/dtypes":"0Gm","@stdlib/complex-dtypes":"0Gn","@stdlib/complex/float32/ctor":"0Go","@stdlib/complex-float32":"1ur","@stdlib/complex/float64/ctor":"0Gq","@stdlib/complex-float64":"1uz","@stdlib/complex/imag":"0Gs","@stdlib/complex-imag":"0Gt","@stdlib/complex/imagf":"0Gu","@stdlib/complex-imagf":"0Gv","@stdlib/complex":"0Gx","@stdlib/complex/promotion-rules":"0Gy","@stdlib/complex-promotion-rules":"0Gz","@stdlib/complex/real":"0H0","@stdlib/complex-real":"0H1","@stdlib/complex/realf":"0H2","@stdlib/complex-realf":"0H3","@stdlib/complex/reim":"0H4","@stdlib/complex-reim":"0H5","@stdlib/complex/reimf":"0H6","@stdlib/complex-reimf":"0H7","@stdlib/complex/float32/reviver":"0H8","@stdlib/complex-reviver-float32":"0H9","@stdlib/complex/float64/reviver":"0HA","@stdlib/complex-reviver-float64":"0HB","@stdlib/complex/reviver":"0HC","@stdlib/complex-reviver":"0HD","@stdlib/constants/array/max-array-length":"0HE","@stdlib/constants-array-max-array-length":"0HF","@stdlib/constants/array/max-typed-array-length":"0HG","@stdlib/constants-array-max-typed-array-length":"0HH","@stdlib/constants/array":"0HI","@stdlib/constants-array":"0HJ","@stdlib/constants/complex128/num-bytes":"0HK","@stdlib/constants-complex128-num-bytes":"0HL","@stdlib/constants/complex128":"0HM","@stdlib/constants-complex128":"0HN","@stdlib/constants/complex64/num-bytes":"0HO","@stdlib/constants-complex64-num-bytes":"0HP","@stdlib/constants/complex64":"0HQ","@stdlib/constants-complex64":"0HR","@stdlib/constants/float16/cbrt-eps":"0HS","@stdlib/constants-float16-cbrt-eps":"0HT","@stdlib/constants/float16/eps":"0HU","@stdlib/constants-float16-eps":"0HV","@stdlib/constants/float16/exponent-bias":"0HW","@stdlib/constants-float16-exponent-bias":"0HX","@stdlib/constants/float16/max-safe-integer":"0HY","@stdlib/constants-float16-max-safe-integer":"0HZ","@stdlib/constants/float16/max":"0Ha","@stdlib/constants-float16-max":"0Hb","@stdlib/constants/float16/min-safe-integer":"0Hc","@stdlib/constants-float16-min-safe-integer":"0Hd","@stdlib/constants/float16/ninf":"0He","@stdlib/constants-float16-ninf":"0Hf","@stdlib/constants/float16/num-bytes":"0Hg","@stdlib/constants-float16-num-bytes":"0Hh","@stdlib/constants/float16":"0Hi","@stdlib/constants-float16":"0Hj","@stdlib/constants/float16/pinf":"0Hk","@stdlib/constants-float16-pinf":"0Hl","@stdlib/constants/float16/precision":"0Hm","@stdlib/constants-float16-precision":"0Hn","@stdlib/constants/float16/smallest-normal":"0Ho","@stdlib/constants-float16-smallest-normal":"0Hp","@stdlib/constants/float16/smallest-subnormal":"0Hq","@stdlib/constants-float16-smallest-subnormal":"0Hr","@stdlib/constants/float16/sqrt-eps":"0Hs","@stdlib/constants-float16-sqrt-eps":"0Ht","@stdlib/constants/float32/cbrt-eps":"0Hu","@stdlib/constants-float32-cbrt-eps":"0Hv","@stdlib/constants/float32/eps":"0Hw","@stdlib/constants-float32-eps":"0Hx","@stdlib/constants/float32/exponent-bias":"0Hy","@stdlib/constants-float32-exponent-bias":"0Hz","@stdlib/constants/float32/max-safe-integer":"0I0","@stdlib/constants-float32-max-safe-integer":"0I1","@stdlib/constants/float32/max":"0I2","@stdlib/constants-float32-max":"0I3","@stdlib/constants/float32/min-safe-integer":"0I4","@stdlib/constants-float32-min-safe-integer":"0I5","@stdlib/constants/float32/ninf":"0I6","@stdlib/constants-float32-ninf":"0I7","@stdlib/constants/float32/num-bytes":"0I8","@stdlib/constants-float32-num-bytes":"0I9","@stdlib/constants/float32":"0IA","@stdlib/constants-float32":"0IB","@stdlib/constants/float32/pinf":"0IC","@stdlib/constants-float32-pinf":"0ID","@stdlib/constants/float32/precision":"0IE","@stdlib/constants-float32-precision":"0IF","@stdlib/constants/float32/smallest-normal":"0IG","@stdlib/constants-float32-smallest-normal":"0IH","@stdlib/constants/float32/smallest-subnormal":"0II","@stdlib/constants-float32-smallest-subnormal":"0IJ","@stdlib/constants/float32/sqrt-eps":"0IK","@stdlib/constants-float32-sqrt-eps":"0IL","@stdlib/constants/float64/apery":"0IM","@stdlib/constants-float64-apery":"0IN","@stdlib/constants/float64/catalan":"0IO","@stdlib/constants-float64-catalan":"0IP","@stdlib/constants/float64/cbrt-eps":"0IQ","@stdlib/constants-float64-cbrt-eps":"0IR","@stdlib/constants/float64/e":"0IS","@stdlib/constants-float64-e":"0IT","@stdlib/constants/float64/eps":"0IU","@stdlib/constants-float64-eps":"0IV","@stdlib/constants/float64/eulergamma":"0IW","@stdlib/constants-float64-eulergamma":"0IX","@stdlib/constants/float64/exponent-bias":"0IY","@stdlib/constants-float64-exponent-bias":"0IZ","@stdlib/constants/float64/fourth-pi":"0Ia","@stdlib/constants-float64-fourth-pi":"0Ib","@stdlib/constants/float64/fourth-root-eps":"0Ic","@stdlib/constants-float64-fourth-root-eps":"0Id","@stdlib/constants/float64/gamma-lanczos-g":"0Ie","@stdlib/constants-float64-gamma-lanczos-g":"0If","@stdlib/constants/float64/glaisher-kinkelin":"0Ig","@stdlib/constants-float64-glaisher-kinkelin":"0Ih","@stdlib/constants/float64/half-ln-two":"0Ii","@stdlib/constants-float64-half-ln-two":"0Ij","@stdlib/constants/float64/half-pi":"0Ik","@stdlib/constants-float64-half-pi":"0Il","@stdlib/constants/float64/high-word-exponent-mask":"0Im","@stdlib/constants-float64-high-word-exponent-mask":"0In","@stdlib/constants/float64/high-word-significand-mask":"0Io","@stdlib/constants-float64-high-word-significand-mask":"0Ip","@stdlib/constants/float64/ln-half":"0Iq","@stdlib/constants-float64-ln-half":"0Ir","@stdlib/constants/float64/ln-pi":"0Is","@stdlib/constants-float64-ln-pi":"0It","@stdlib/constants/float64/ln-sqrt-two-pi":"0Iu","@stdlib/constants-float64-ln-sqrt-two-pi":"0Iv","@stdlib/constants/float64/ln-ten":"0Iw","@stdlib/constants-float64-ln-ten":"0Ix","@stdlib/constants/float64/ln-two-pi":"0Iy","@stdlib/constants-float64-ln-two-pi":"0Iz","@stdlib/constants/float64/ln-two":"0J0","@stdlib/constants-float64-ln-two":"0J1","@stdlib/constants/float64/log10-e":"0J2","@stdlib/constants-float64-log10-e":"0J3","@stdlib/constants/float64/log2-e":"0J4","@stdlib/constants-float64-log2-e":"0J5","@stdlib/constants/float64/max-base10-exponent-subnormal":"0J6","@stdlib/constants-float64-max-base10-exponent-subnormal":"0J7","@stdlib/constants/float64/max-base10-exponent":"0J8","@stdlib/constants-float64-max-base10-exponent":"0J9","@stdlib/constants/float64/max-base2-exponent-subnormal":"0JA","@stdlib/constants-float64-max-base2-exponent-subnormal":"0JB","@stdlib/constants/float64/max-base2-exponent":"0JC","@stdlib/constants-float64-max-base2-exponent":"0JD","@stdlib/constants/float64/max-ln":"0JE","@stdlib/constants-float64-max-ln":"0JF","@stdlib/constants/float64/max-safe-fibonacci":"0JG","@stdlib/constants-float64-max-safe-fibonacci":"0JH","@stdlib/constants/float64/max-safe-integer":"0JI","@stdlib/constants-float64-max-safe-integer":"0JJ","@stdlib/constants/float64/max-safe-lucas":"0JK","@stdlib/constants-float64-max-safe-lucas":"0JL","@stdlib/constants/float64/max-safe-nth-fibonacci":"0JM","@stdlib/constants-float64-max-safe-nth-fibonacci":"0JN","@stdlib/constants/float64/max-safe-nth-lucas":"0JO","@stdlib/constants-float64-max-safe-nth-lucas":"0JP","@stdlib/constants/float64/max":"0JQ","@stdlib/constants-float64-max":"0JR","@stdlib/constants/float64/min-base10-exponent-subnormal":"0JS","@stdlib/constants-float64-min-base10-exponent-subnormal":"0JT","@stdlib/constants/float64/min-base10-exponent":"0JU","@stdlib/constants-float64-min-base10-exponent":"0JV","@stdlib/constants/float64/min-base2-exponent-subnormal":"0JW","@stdlib/constants-float64-min-base2-exponent-subnormal":"0JX","@stdlib/constants/float64/min-base2-exponent":"0JY","@stdlib/constants-float64-min-base2-exponent":"0JZ","@stdlib/constants/float64/min-ln":"0Ja","@stdlib/constants-float64-min-ln":"0Jb","@stdlib/constants/float64/min-safe-integer":"0Jc","@stdlib/constants-float64-min-safe-integer":"0Jd","@stdlib/constants/float64/ninf":"0Je","@stdlib/constants-float64-ninf":"0Jf","@stdlib/constants/float64/num-bytes":"0Jg","@stdlib/constants-float64-num-bytes":"0Jh","@stdlib/constants/float64":"0Ji","@stdlib/constants-float64":"0Jj","@stdlib/constants/float64/phi":"0Jk","@stdlib/constants-float64-phi":"0Jl","@stdlib/constants/float64/pi-squared":"0Jm","@stdlib/constants-float64-pi-squared":"0Jn","@stdlib/constants/float64/pi":"0Jo","@stdlib/constants-float64-pi":"0Jp","@stdlib/constants/float64/pinf":"0Jq","@stdlib/constants-float64-pinf":"0Jr","@stdlib/constants/float64/precision":"0Js","@stdlib/constants-float64-precision":"0Jt","@stdlib/constants/float64/smallest-normal":"0Ju","@stdlib/constants-float64-smallest-normal":"0Jv","@stdlib/constants/float64/smallest-subnormal":"0Jw","@stdlib/constants-float64-smallest-subnormal":"0Jx","@stdlib/constants/float64/sqrt-eps":"0Jy","@stdlib/constants-float64-sqrt-eps":"0Jz","@stdlib/constants/float64/sqrt-half-pi":"0K0","@stdlib/constants-float64-sqrt-half-pi":"0K1","@stdlib/constants/float64/sqrt-half":"0K2","@stdlib/constants-float64-sqrt-half":"0K3","@stdlib/constants/float64/sqrt-phi":"0K4","@stdlib/constants-float64-sqrt-phi":"0K5","@stdlib/constants/float64/sqrt-pi":"0K6","@stdlib/constants-float64-sqrt-pi":"0K7","@stdlib/constants/float64/sqrt-three":"0K8","@stdlib/constants-float64-sqrt-three":"0K9","@stdlib/constants/float64/sqrt-two-pi":"0KA","@stdlib/constants-float64-sqrt-two-pi":"0KB","@stdlib/constants/float64/sqrt-two":"0KC","@stdlib/constants-float64-sqrt-two":"0KD","@stdlib/constants/float64/two-pi":"0KE","@stdlib/constants-float64-two-pi":"0KF","@stdlib/constants/int16/max":"0KG","@stdlib/constants-int16-max":"0KH","@stdlib/constants/int16/min":"0KI","@stdlib/constants-int16-min":"0KJ","@stdlib/constants/int16/num-bytes":"0KK","@stdlib/constants-int16-num-bytes":"0KL","@stdlib/constants/int16":"0KM","@stdlib/constants-int16":"0KN","@stdlib/constants/int32/max":"0KO","@stdlib/constants-int32-max":"0KP","@stdlib/constants/int32/min":"0KQ","@stdlib/constants-int32-min":"0KR","@stdlib/constants/int32/num-bytes":"0KS","@stdlib/constants-int32-num-bytes":"0KT","@stdlib/constants/int32":"0KU","@stdlib/constants-int32":"0KV","@stdlib/constants/int8/max":"0KW","@stdlib/constants-int8-max":"0KX","@stdlib/constants/int8/min":"0KY","@stdlib/constants-int8-min":"0KZ","@stdlib/constants/int8/num-bytes":"0Ka","@stdlib/constants-int8-num-bytes":"0Kb","@stdlib/constants/int8":"0Kc","@stdlib/constants-int8":"0Kd","@stdlib/constants":"0Kf","@stdlib/constants/path/delimiter-posix":"0Kg","@stdlib/constants-path-delimiter-posix":"0Kh","@stdlib/constants/path/delimiter-win32":"0Ki","@stdlib/constants-path-delimiter-win32":"0Kj","@stdlib/constants/path/delimiter":"0Kk","@stdlib/constants-path-delimiter":"0Kl","@stdlib/constants/path":"0Km","@stdlib/constants-path":"0Kn","@stdlib/constants/path/sep-posix":"0Ko","@stdlib/constants-path-sep-posix":"0Kp","@stdlib/constants/path/sep-win32":"0Kq","@stdlib/constants-path-sep-win32":"0Kr","@stdlib/constants/path/sep":"0Ks","@stdlib/constants-path-sep":"0Kt","@stdlib/constants/time/hours-in-day":"0Ku","@stdlib/constants-time-hours-in-day":"0Kv","@stdlib/constants/time/hours-in-week":"0Kw","@stdlib/constants-time-hours-in-week":"0Kx","@stdlib/constants/time/milliseconds-in-day":"0Ky","@stdlib/constants-time-milliseconds-in-day":"0Kz","@stdlib/constants/time/milliseconds-in-hour":"0L0","@stdlib/constants-time-milliseconds-in-hour":"0L1","@stdlib/constants/time/milliseconds-in-minute":"0L2","@stdlib/constants-time-milliseconds-in-minute":"0L3","@stdlib/constants/time/milliseconds-in-second":"0L4","@stdlib/constants-time-milliseconds-in-second":"0L5","@stdlib/constants/time/milliseconds-in-week":"0L6","@stdlib/constants-time-milliseconds-in-week":"0L7","@stdlib/constants/time/minutes-in-day":"0L8","@stdlib/constants-time-minutes-in-day":"0L9","@stdlib/constants/time/minutes-in-hour":"0LA","@stdlib/constants-time-minutes-in-hour":"0LB","@stdlib/constants/time/minutes-in-week":"0LC","@stdlib/constants-time-minutes-in-week":"0LD","@stdlib/constants/time/months-in-year":"0LE","@stdlib/constants-time-months-in-year":"0LF","@stdlib/constants/time":"0LG","@stdlib/constants-time":"0LH","@stdlib/constants/time/seconds-in-day":"0LI","@stdlib/constants-time-seconds-in-day":"0LJ","@stdlib/constants/time/seconds-in-hour":"0LK","@stdlib/constants-time-seconds-in-hour":"0LL","@stdlib/constants/time/seconds-in-minute":"0LM","@stdlib/constants-time-seconds-in-minute":"0LN","@stdlib/constants/time/seconds-in-week":"0LO","@stdlib/constants-time-seconds-in-week":"0LP","@stdlib/constants/uint16/max":"0LQ","@stdlib/constants-uint16-max":"0LR","@stdlib/constants/uint16/num-bytes":"0LS","@stdlib/constants-uint16-num-bytes":"0LT","@stdlib/constants/uint16":"0LU","@stdlib/constants-uint16":"0LV","@stdlib/constants/uint32/max":"0LW","@stdlib/constants-uint32-max":"0LX","@stdlib/constants/uint32/num-bytes":"0LY","@stdlib/constants-uint32-num-bytes":"0LZ","@stdlib/constants/uint32":"0La","@stdlib/constants-uint32":"0Lb","@stdlib/constants/uint8/max":"0Lc","@stdlib/constants-uint8-max":"0Ld","@stdlib/constants/uint8/num-bytes":"0Le","@stdlib/constants-uint8-num-bytes":"0Lf","@stdlib/constants/uint8":"0Lg","@stdlib/constants-uint8":"0Lh","@stdlib/constants/unicode/max-bmp":"0Li","@stdlib/constants-unicode-max-bmp":"0Lj","@stdlib/constants/unicode/max":"0Lk","@stdlib/constants-unicode-max":"0Ll","@stdlib/constants/unicode":"0Lm","@stdlib/constants-unicode":"0Ln","@stdlib/datasets/afinn-111":"0Lo","@stdlib/datasets-afinn-111":"0Lp","@stdlib/datasets/afinn-96":"0Lq","@stdlib/datasets-afinn-96":"0Lr","@stdlib/datasets/anscombes-quartet":"0Ls","@stdlib/datasets-anscombes-quartet":"0Lt","@stdlib/datasets/berndt-cps-wages-1985":"0Lu","@stdlib/datasets-berndt-cps-wages-1985":"0Lv","@stdlib/datasets/cdc-nchs-us-births-1969-1988":"0Lw","@stdlib/datasets-cdc-nchs-us-births-1969-1988":"0Lx","@stdlib/datasets/cdc-nchs-us-births-1994-2003":"0Ly","@stdlib/datasets-cdc-nchs-us-births-1994-2003":"0Lz","@stdlib/datasets/cdc-nchs-us-infant-mortality-bw-1915-2013":"0M0","@stdlib/datasets-cdc-nchs-us-infant-mortality-bw-1915-2013":"0M1","@stdlib/datasets/cmudict":"0M2","@stdlib/datasets-cmudict":"0M3","@stdlib/datasets/dale-chall-new":"0M4","@stdlib/datasets-dale-chall-new":"0M5","@stdlib/datasets/emoji-code-picto":"0M6","@stdlib/datasets-emoji-code-picto":"0M7","@stdlib/datasets/emoji-picto-code":"0M8","@stdlib/datasets-emoji-picto-code":"0M9","@stdlib/datasets/emoji":"0MA","@stdlib/datasets-emoji":"0MB","@stdlib/datasets/female-first-names-en":"0MC","@stdlib/datasets-female-first-names-en":"0MD","@stdlib/datasets/fivethirtyeight-ffq":"0ME","@stdlib/datasets-fivethirtyeight-ffq":"0MF","@stdlib/datasets/frb-sf-wage-rigidity":"0MG","@stdlib/datasets-frb-sf-wage-rigidity":"0MH","@stdlib/datasets/harrison-boston-house-prices-corrected":"0MI","@stdlib/datasets-harrison-boston-house-prices-corrected":"0MJ","@stdlib/datasets/harrison-boston-house-prices":"0MK","@stdlib/datasets-harrison-boston-house-prices":"0ML","@stdlib/datasets/herndon-venus-semidiameters":"0MM","@stdlib/datasets-herndon-venus-semidiameters":"0MN","@stdlib/datasets/img-acanthus-mollis":"0MO","@stdlib/datasets-img-acanthus-mollis":"0MP","@stdlib/datasets/img-airplane-from-above":"0MQ","@stdlib/datasets-img-airplane-from-above":"0MR","@stdlib/datasets/img-allium-oreophilum":"0MS","@stdlib/datasets-img-allium-oreophilum":"0MT","@stdlib/datasets/img-black-canyon":"0MU","@stdlib/datasets-img-black-canyon":"0MV","@stdlib/datasets/img-dust-bowl-home":"0MW","@stdlib/datasets-img-dust-bowl-home":"0MX","@stdlib/datasets/img-french-alpine-landscape":"0MY","@stdlib/datasets-img-french-alpine-landscape":"0MZ","@stdlib/datasets/img-locomotion-house-cat":"0Ma","@stdlib/datasets-img-locomotion-house-cat":"0Mb","@stdlib/datasets/img-locomotion-nude-male":"0Mc","@stdlib/datasets-img-locomotion-nude-male":"0Md","@stdlib/datasets/img-march-pastoral":"0Me","@stdlib/datasets-img-march-pastoral":"0Mf","@stdlib/datasets/img-nagasaki-boats":"0Mg","@stdlib/datasets-img-nagasaki-boats":"0Mh","@stdlib/datasets/liu-negative-opinion-words-en":"0Mi","@stdlib/datasets-liu-negative-opinion-words-en":"0Mj","@stdlib/datasets/liu-positive-opinion-words-en":"0Mk","@stdlib/datasets-liu-positive-opinion-words-en":"0Ml","@stdlib/datasets/male-first-names-en":"0Mm","@stdlib/datasets-male-first-names-en":"0Mn","@stdlib/datasets/minard-napoleons-march":"0Mo","@stdlib/datasets-minard-napoleons-march":"0Mp","@stdlib/datasets/moby-dick":"0Mq","@stdlib/datasets-moby-dick":"0Mr","@stdlib/datasets/month-names-en":"0Ms","@stdlib/datasets-month-names-en":"0Mt","@stdlib/datasets/nightingales-rose":"0Mu","@stdlib/datasets-nightingales-rose":"0Mv","@stdlib/datasets/pace-boston-house-prices":"0Mw","@stdlib/datasets-pace-boston-house-prices":"0Mx","@stdlib/datasets":"0Mz","@stdlib/datasets/primes-100k":"0N0","@stdlib/datasets-primes-100k":"0N1","@stdlib/datasets/savoy-stopwords-fin":"0N2","@stdlib/datasets-savoy-stopwords-fin":"0N3","@stdlib/datasets/savoy-stopwords-fr":"0N4","@stdlib/datasets-savoy-stopwords-fr":"0N5","@stdlib/datasets/savoy-stopwords-ger":"0N6","@stdlib/datasets-savoy-stopwords-ger":"0N7","@stdlib/datasets/savoy-stopwords-it":"0N8","@stdlib/datasets-savoy-stopwords-it":"0N9","@stdlib/datasets/savoy-stopwords-por":"0NA","@stdlib/datasets-savoy-stopwords-por":"0NB","@stdlib/datasets/savoy-stopwords-sp":"0NC","@stdlib/datasets-savoy-stopwords-sp":"0ND","@stdlib/datasets/savoy-stopwords-swe":"0NE","@stdlib/datasets-savoy-stopwords-swe":"0NF","@stdlib/datasets/sotu":"0NG","@stdlib/datasets-sotu":"0NH","@stdlib/datasets/spache-revised":"0NI","@stdlib/datasets-spache-revised":"0NJ","@stdlib/datasets/spam-assassin":"0NK","@stdlib/datasets-spam-assassin":"0NL","@stdlib/datasets/ssa-us-births-2000-2014":"0NM","@stdlib/datasets-ssa-us-births-2000-2014":"0NN","@stdlib/datasets/standard-card-deck":"0NO","@stdlib/datasets-standard-card-deck":"0NP","@stdlib/datasets/stopwords-en":"0NQ","@stdlib/datasets-stopwords-en":"0NR","@stdlib/datasets/suthaharan-multi-hop-sensor-network":"0NS","@stdlib/datasets-suthaharan-multi-hop-sensor-network":"0NT","@stdlib/datasets/suthaharan-single-hop-sensor-network":"0NU","@stdlib/datasets-suthaharan-single-hop-sensor-network":"0NV","@stdlib/datasets/us-states-abbr":"0NW","@stdlib/datasets-us-states-abbr":"0NX","@stdlib/datasets/us-states-capitals-names":"0NY","@stdlib/datasets-us-states-capitals-names":"0NZ","@stdlib/datasets/us-states-capitals":"0Na","@stdlib/datasets-us-states-capitals":"0Nb","@stdlib/datasets/us-states-names-capitals":"0Nc","@stdlib/datasets-us-states-names-capitals":"0Nd","@stdlib/datasets/us-states-names":"0Ne","@stdlib/datasets-us-states-names":"0Nf","@stdlib/error":"0Nh","@stdlib/error/reviver":"0Ni","@stdlib/error-reviver":"0Nj","@stdlib/error/to-json":"0Nk","@stdlib/error-to-json":"0Nl","@stdlib/error/tools/database":"0Nm","@stdlib/error-tools-database":"0Nn","@stdlib/error/tools/fmtprodmsg-factory":"0No","@stdlib/error-tools-fmtprodmsg-factory":"0Np","@stdlib/error/tools/fmtprodmsg":"0Nq","@stdlib/error-tools-fmtprodmsg":"0Nr","@stdlib/error/tools/id2msg":"0Ns","@stdlib/error-tools-id2msg":"0Nt","@stdlib/error/tools/id2pkg":"0Nu","@stdlib/error-tools-id2pkg":"0Nv","@stdlib/error/tools/msg2id":"0Nw","@stdlib/error-tools-msg2id":"0Nx","@stdlib/error/tools":"0Ny","@stdlib/error-tools":"0Nz","@stdlib/error/tools/pkg2id":"0O0","@stdlib/error-tools-pkg2id":"0O1","@stdlib/fs/close":"0O2","@stdlib/fs-close":"0O3","@stdlib/fs/exists":"0O4","@stdlib/fs-exists":"0O5","@stdlib/fs/open":"0O6","@stdlib/fs-open":"0O7","@stdlib/fs":"0O9","@stdlib/fs/read-dir":"0OA","@stdlib/fs-read-dir":"0OB","@stdlib/fs/read-file-list":"0OC","@stdlib/fs-read-file-list":"0OD","@stdlib/fs/read-file":"0OE","@stdlib/fs-read-file":"0OF","@stdlib/fs/read-json":"0OG","@stdlib/fs-read-json":"0OH","@stdlib/fs/read-wasm":"0OI","@stdlib/fs-read-wasm":"0OJ","@stdlib/fs/rename":"0OK","@stdlib/fs-rename":"0OL","@stdlib/fs/resolve-parent-path-by":"0OM","@stdlib/fs-resolve-parent-path-by":"0ON","@stdlib/fs/resolve-parent-path":"0OO","@stdlib/fs-resolve-parent-path":"0OP","@stdlib/fs/unlink":"0OQ","@stdlib/fs-unlink":"0OR","@stdlib/fs/write-file":"0OS","@stdlib/fs-write-file":"0OT","@stdlib/iter/advance":"0OU","@stdlib/iter-advance":"0OV","@stdlib/iter/any-by":"0OW","@stdlib/iter-any-by":"0OX","@stdlib/iter/any":"0OY","@stdlib/iter-any":"0OZ","@stdlib/iter/concat":"0Oa","@stdlib/iter-concat":"0Ob","@stdlib/iter/constant":"0Oc","@stdlib/iter-constant":"0Od","@stdlib/iter/counter":"0Oe","@stdlib/iter-counter":"0Of","@stdlib/iter/datespace":"0Og","@stdlib/iter-datespace":"0Oh","@stdlib/iter/dedupe-by":"0Oi","@stdlib/iter-dedupe-by":"0Oj","@stdlib/iter/dedupe":"0Ok","@stdlib/iter-dedupe":"0Ol","@stdlib/iter/empty":"0Om","@stdlib/iter-empty":"0On","@stdlib/iter/every-by":"0Oo","@stdlib/iter-every-by":"0Op","@stdlib/iter/every":"0Oq","@stdlib/iter-every":"0Or","@stdlib/iter/fill":"0Os","@stdlib/iter-fill":"0Ot","@stdlib/iter/filter-map":"0Ou","@stdlib/iter-filter-map":"0Ov","@stdlib/iter/filter":"0Ow","@stdlib/iter-filter":"0Ox","@stdlib/iter/first":"0Oy","@stdlib/iter-first":"0Oz","@stdlib/iter/flow":"0P0","@stdlib/iter-flow":"0P1","@stdlib/iter/for-each":"0P2","@stdlib/iter-for-each":"0P3","@stdlib/iter/head":"0P4","@stdlib/iter-head":"0P5","@stdlib/iter/incrspace":"0P6","@stdlib/iter-incrspace":"0P7","@stdlib/iter/intersection-by-hash":"0P8","@stdlib/iter-intersection-by-hash":"0P9","@stdlib/iter/intersection":"0PA","@stdlib/iter-intersection":"0PB","@stdlib/iter/last":"0PC","@stdlib/iter-last":"0PD","@stdlib/iter/length":"0PE","@stdlib/iter-length":"0PF","@stdlib/iter/linspace":"0PG","@stdlib/iter-linspace":"0PH","@stdlib/iter/logspace":"0PI","@stdlib/iter-logspace":"0PJ","@stdlib/iter/map":"0PK","@stdlib/iter-map":"0PL","@stdlib/iter/mapn":"0PM","@stdlib/iter-mapn":"0PN","@stdlib/iter/none-by":"0PO","@stdlib/iter-none-by":"0PP","@stdlib/iter/none":"0PQ","@stdlib/iter-none":"0PR","@stdlib/iter/nth":"0PS","@stdlib/iter-nth":"0PT","@stdlib/iter":"0PV","@stdlib/iter/pipeline-thunk":"0PW","@stdlib/iter-pipeline-thunk":"0PX","@stdlib/iter/pipeline":"0PY","@stdlib/iter-pipeline":"0PZ","@stdlib/iter/pop":"0Pa","@stdlib/iter-pop":"0Pb","@stdlib/iter/push":"0Pc","@stdlib/iter-push":"0Pd","@stdlib/iter/reject":"0Pe","@stdlib/iter-reject":"0Pf","@stdlib/iter/replicate-by":"0Pg","@stdlib/iter-replicate-by":"0Ph","@stdlib/iter/replicate":"0Pi","@stdlib/iter-replicate":"0Pj","@stdlib/iter/shift":"0Pk","@stdlib/iter-shift":"0Pl","@stdlib/iter/slice":"0Pm","@stdlib/iter-slice":"0Pn","@stdlib/iter/some-by":"0Po","@stdlib/iter-some-by":"0Pp","@stdlib/iter/some":"0Pq","@stdlib/iter-some":"0Pr","@stdlib/iter/step":"0Ps","@stdlib/iter-step":"0Pt","@stdlib/iter/strided-by":"0Pu","@stdlib/iter-strided-by":"0Pv","@stdlib/iter/strided":"0Pw","@stdlib/iter-strided":"0Px","@stdlib/iter/to-array-view-right":"0Py","@stdlib/iter-to-array-view-right":"0Pz","@stdlib/iter/to-array-view":"0Q0","@stdlib/iter-to-array-view":"0Q1","@stdlib/iter/union":"0Q2","@stdlib/iter-union":"0Q3","@stdlib/iter/unique-by-hash":"0Q4","@stdlib/iter-unique-by-hash":"0Q5","@stdlib/iter/unique-by":"0Q6","@stdlib/iter-unique-by":"0Q7","@stdlib/iter/unique":"0Q8","@stdlib/iter-unique":"0Q9","@stdlib/iter/unitspace":"0QA","@stdlib/iter-unitspace":"0QB","@stdlib/iter/unshift":"0QC","@stdlib/iter-unshift":"0QD","@stdlib/math/base/assert/int32-is-even":"0QE","@stdlib/math-base-assert-int32-is-even":"0QF","@stdlib/math/base/assert/int32-is-odd":"0QG","@stdlib/math-base-assert-int32-is-odd":"0QH","@stdlib/math/base/assert/is-composite":"0QI","@stdlib/math-base-assert-is-composite":"0QJ","@stdlib/math/base/assert/is-coprime":"0QK","@stdlib/math-base-assert-is-coprime":"0QL","@stdlib/math/base/assert/is-even":"0QM","@stdlib/math-base-assert-is-even":"0QN","@stdlib/math/base/assert/is-finite":"0QO","@stdlib/math-base-assert-is-finite":"0QP","@stdlib/math/base/assert/is-finitef":"0QQ","@stdlib/math-base-assert-is-finitef":"0QR","@stdlib/math/base/assert/is-infinite":"0QS","@stdlib/math-base-assert-is-infinite":"0QT","@stdlib/math/base/assert/is-infinitef":"0QU","@stdlib/math-base-assert-is-infinitef":"0QV","@stdlib/math/base/assert/is-integer":"0QW","@stdlib/math-base-assert-is-integer":"0QX","@stdlib/math/base/assert/is-nan":"0QY","@stdlib/math-base-assert-is-nan":"0QZ","@stdlib/math/base/assert/is-nanf":"0Qa","@stdlib/math-base-assert-is-nanf":"0Qb","@stdlib/math/base/assert/is-negative-integer":"0Qc","@stdlib/math-base-assert-is-negative-integer":"0Qd","@stdlib/math/base/assert/is-negative-zero":"0Qe","@stdlib/math-base-assert-is-negative-zero":"0Qf","@stdlib/math/base/assert/is-negative-zerof":"0Qg","@stdlib/math-base-assert-is-negative-zerof":"0Qh","@stdlib/math/base/assert/is-nonnegative-integer":"0Qi","@stdlib/math-base-assert-is-nonnegative-integer":"0Qj","@stdlib/math/base/assert/is-nonpositive-integer":"0Qk","@stdlib/math-base-assert-is-nonpositive-integer":"0Ql","@stdlib/math/base/assert/is-odd":"0Qm","@stdlib/math-base-assert-is-odd":"0Qn","@stdlib/math/base/assert/is-positive-integer":"0Qo","@stdlib/math-base-assert-is-positive-integer":"0Qp","@stdlib/math/base/assert/is-positive-zero":"0Qq","@stdlib/math-base-assert-is-positive-zero":"0Qr","@stdlib/math/base/assert/is-positive-zerof":"0Qs","@stdlib/math-base-assert-is-positive-zerof":"0Qt","@stdlib/math/base/assert/is-prime":"0Qu","@stdlib/math-base-assert-is-prime":"0Qv","@stdlib/math/base/assert/is-probability":"0Qw","@stdlib/math-base-assert-is-probability":"0Qx","@stdlib/math/base/assert/is-safe-integer":"0Qy","@stdlib/math-base-assert-is-safe-integer":"0Qz","@stdlib/math/base/assert":"0R0","@stdlib/math-base-assert":"0R1","@stdlib/math/base/assert/uint32-is-pow2":"0R2","@stdlib/math-base-assert-uint32-is-pow2":"0R3","@stdlib/math/base/napi/binary":"0R4","@stdlib/math-base-napi-binary":"0R5","@stdlib/math/base/napi":"0R6","@stdlib/math-base-napi":"0R7","@stdlib/math/base/napi/ternary":"0R8","@stdlib/math-base-napi-ternary":"0R9","@stdlib/math/base/napi/unary":"0RA","@stdlib/math-base-napi-unary":"0RB","@stdlib/math/base/ops/add":"0RC","@stdlib/math-base-ops-add":"0RD","@stdlib/math/base/ops/addf":"0RE","@stdlib/math-base-ops-addf":"0RF","@stdlib/math/base/ops/cadd":"0RG","@stdlib/math-base-ops-cadd":"0RH","@stdlib/math/base/ops/caddf":"0RI","@stdlib/math-base-ops-caddf":"0RJ","@stdlib/math/base/ops/cdiv":"0RK","@stdlib/math-base-ops-cdiv":"0RL","@stdlib/math/base/ops/cmul":"0RM","@stdlib/math-base-ops-cmul":"0RN","@stdlib/math/base/ops/cmulf":"0RO","@stdlib/math-base-ops-cmulf":"0RP","@stdlib/math/base/ops/cneg":"0RQ","@stdlib/math-base-ops-cneg":"0RR","@stdlib/math/base/ops/csub":"0RS","@stdlib/math-base-ops-csub":"0RT","@stdlib/math/base/ops/csubf":"0RU","@stdlib/math-base-ops-csubf":"0RV","@stdlib/math/base/ops/imul":"0RW","@stdlib/math-base-ops-imul":"0RX","@stdlib/math/base/ops/imuldw":"0RY","@stdlib/math-base-ops-imuldw":"0RZ","@stdlib/math/base/ops/mul":"0Ra","@stdlib/math-base-ops-mul":"0Rb","@stdlib/math/base/ops/mulf":"0Rc","@stdlib/math-base-ops-mulf":"0Rd","@stdlib/math/base/ops":"0Re","@stdlib/math-base-ops":"0Rf","@stdlib/math/base/ops/sub":"0Rg","@stdlib/math-base-ops-sub":"0Rh","@stdlib/math/base/ops/subf":"0Ri","@stdlib/math-base-ops-subf":"0Rj","@stdlib/math/base/ops/umul":"0Rk","@stdlib/math-base-ops-umul":"0Rl","@stdlib/math/base/ops/umuldw":"0Rm","@stdlib/math-base-ops-umuldw":"0Rn","@stdlib/math/base":"0Ro","@stdlib/math-base":"0Rp","@stdlib/math/base/special/abs":"0Rq","@stdlib/math-base-special-abs":"0Rr","@stdlib/math/base/special/abs2":"0Rs","@stdlib/math-base-special-abs2":"0Rt","@stdlib/math/base/special/abs2f":"0Ru","@stdlib/math-base-special-abs2f":"0Rv","@stdlib/math/base/special/absf":"0Rw","@stdlib/math-base-special-absf":"0Rx","@stdlib/math/base/special/acos":"0Ry","@stdlib/math-base-special-acos":"0Rz","@stdlib/math/base/special/acosh":"0S0","@stdlib/math-base-special-acosh":"0S1","@stdlib/math/base/special/acot":"0S2","@stdlib/math-base-special-acot":"0S3","@stdlib/math/base/special/acoth":"0S4","@stdlib/math-base-special-acoth":"0S5","@stdlib/math/base/special/acovercos":"0S6","@stdlib/math-base-special-acovercos":"0S7","@stdlib/math/base/special/acoversin":"0S8","@stdlib/math-base-special-acoversin":"0S9","@stdlib/math/base/special/acsc":"0SA","@stdlib/math-base-special-acsc":"0SB","@stdlib/math/base/special/acsch":"0SC","@stdlib/math-base-special-acsch":"0SD","@stdlib/math/base/special/ahavercos":"0SE","@stdlib/math-base-special-ahavercos":"0SF","@stdlib/math/base/special/ahaversin":"0SG","@stdlib/math-base-special-ahaversin":"0SH","@stdlib/math/base/special/asech":"0SI","@stdlib/math-base-special-asech":"0SJ","@stdlib/math/base/special/asin":"0SK","@stdlib/math-base-special-asin":"0SL","@stdlib/math/base/special/asinh":"0SM","@stdlib/math-base-special-asinh":"0SN","@stdlib/math/base/special/atan":"0SO","@stdlib/math-base-special-atan":"0SP","@stdlib/math/base/special/atan2":"0SQ","@stdlib/math-base-special-atan2":"0SR","@stdlib/math/base/special/atanh":"0SS","@stdlib/math-base-special-atanh":"0ST","@stdlib/math/base/special/avercos":"0SU","@stdlib/math-base-special-avercos":"0SV","@stdlib/math/base/special/aversin":"0SW","@stdlib/math-base-special-aversin":"0SX","@stdlib/math/base/special/bernoulli":"0SY","@stdlib/math-base-special-bernoulli":"0SZ","@stdlib/math/base/special/besselj0":"0Sa","@stdlib/math-base-special-besselj0":"0Sb","@stdlib/math/base/special/besselj1":"0Sc","@stdlib/math-base-special-besselj1":"0Sd","@stdlib/math/base/special/bessely0":"0Se","@stdlib/math-base-special-bessely0":"0Sf","@stdlib/math/base/special/bessely1":"0Sg","@stdlib/math-base-special-bessely1":"0Sh","@stdlib/math/base/special/beta":"0Si","@stdlib/math-base-special-beta":"0Sj","@stdlib/math/base/special/betainc":"0Sk","@stdlib/math-base-special-betainc":"0Sl","@stdlib/math/base/special/betaincinv":"0Sm","@stdlib/math-base-special-betaincinv":"0Sn","@stdlib/math/base/special/betaln":"0So","@stdlib/math-base-special-betaln":"0Sp","@stdlib/math/base/special/binet":"0Sq","@stdlib/math-base-special-binet":"0Sr","@stdlib/math/base/special/binomcoef":"0Ss","@stdlib/math-base-special-binomcoef":"0St","@stdlib/math/base/special/binomcoefln":"0Su","@stdlib/math-base-special-binomcoefln":"0Sv","@stdlib/math/base/special/boxcox":"0Sw","@stdlib/math-base-special-boxcox":"0Sx","@stdlib/math/base/special/boxcox1p":"0Sy","@stdlib/math-base-special-boxcox1p":"0Sz","@stdlib/math/base/special/boxcox1pinv":"0T0","@stdlib/math-base-special-boxcox1pinv":"0T1","@stdlib/math/base/special/boxcoxinv":"0T2","@stdlib/math-base-special-boxcoxinv":"0T3","@stdlib/math/base/special/cabs":"0T4","@stdlib/math-base-special-cabs":"0T5","@stdlib/math/base/special/cabs2":"0T6","@stdlib/math-base-special-cabs2":"0T7","@stdlib/math/base/special/cabs2f":"0T8","@stdlib/math-base-special-cabs2f":"0T9","@stdlib/math/base/special/cabsf":"0TA","@stdlib/math-base-special-cabsf":"0TB","@stdlib/math/base/special/cbrt":"0TC","@stdlib/math-base-special-cbrt":"0TD","@stdlib/math/base/special/cbrtf":"0TE","@stdlib/math-base-special-cbrtf":"0TF","@stdlib/math/base/special/cceil":"0TG","@stdlib/math-base-special-cceil":"0TH","@stdlib/math/base/special/cceilf":"0TI","@stdlib/math-base-special-cceilf":"0TJ","@stdlib/math/base/special/cceiln":"0TK","@stdlib/math-base-special-cceiln":"0TL","@stdlib/math/base/special/ccis":"0TM","@stdlib/math-base-special-ccis":"0TN","@stdlib/math/base/special/ceil":"0TO","@stdlib/math-base-special-ceil":"0TP","@stdlib/math/base/special/ceil10":"0TQ","@stdlib/math-base-special-ceil10":"0TR","@stdlib/math/base/special/ceil2":"0TS","@stdlib/math-base-special-ceil2":"0TT","@stdlib/math/base/special/ceilb":"0TU","@stdlib/math-base-special-ceilb":"0TV","@stdlib/math/base/special/ceilf":"0TW","@stdlib/math-base-special-ceilf":"0TX","@stdlib/math/base/special/ceiln":"0TY","@stdlib/math-base-special-ceiln":"0TZ","@stdlib/math/base/special/ceilsd":"0Ta","@stdlib/math-base-special-ceilsd":"0Tb","@stdlib/math/base/special/cexp":"0Tc","@stdlib/math-base-special-cexp":"0Td","@stdlib/math/base/special/cflipsign":"0Te","@stdlib/math-base-special-cflipsign":"0Tf","@stdlib/math/base/special/cflipsignf":"0Tg","@stdlib/math-base-special-cflipsignf":"0Th","@stdlib/math/base/special/cfloor":"0Ti","@stdlib/math-base-special-cfloor":"0Tj","@stdlib/math/base/special/cfloorn":"0Tk","@stdlib/math-base-special-cfloorn":"0Tl","@stdlib/math/base/special/cidentity":"0Tm","@stdlib/math-base-special-cidentity":"0Tn","@stdlib/math/base/special/cidentityf":"0To","@stdlib/math-base-special-cidentityf":"0Tp","@stdlib/math/base/special/cinv":"0Tq","@stdlib/math-base-special-cinv":"0Tr","@stdlib/math/base/special/clamp":"0Ts","@stdlib/math-base-special-clamp":"0Tt","@stdlib/math/base/special/clampf":"0Tu","@stdlib/math-base-special-clampf":"0Tv","@stdlib/math/base/special/copysign":"0Tw","@stdlib/math-base-special-copysign":"0Tx","@stdlib/math/base/special/copysignf":"0Ty","@stdlib/math-base-special-copysignf":"0Tz","@stdlib/math/base/special/cos":"0U0","@stdlib/math-base-special-cos":"0U1","@stdlib/math/base/special/cosh":"0U2","@stdlib/math-base-special-cosh":"0U3","@stdlib/math/base/special/cosm1":"0U4","@stdlib/math-base-special-cosm1":"0U5","@stdlib/math/base/special/cospi":"0U6","@stdlib/math-base-special-cospi":"0U7","@stdlib/math/base/special/cot":"0U8","@stdlib/math-base-special-cot":"0U9","@stdlib/math/base/special/coth":"0UA","@stdlib/math-base-special-coth":"0UB","@stdlib/math/base/special/covercos":"0UC","@stdlib/math-base-special-covercos":"0UD","@stdlib/math/base/special/coversin":"0UE","@stdlib/math-base-special-coversin":"0UF","@stdlib/math/base/special/cphase":"0UG","@stdlib/math-base-special-cphase":"0UH","@stdlib/math/base/special/cpolar":"0UI","@stdlib/math-base-special-cpolar":"0UJ","@stdlib/math/base/special/cround":"0UK","@stdlib/math-base-special-cround":"0UL","@stdlib/math/base/special/croundn":"0UM","@stdlib/math-base-special-croundn":"0UN","@stdlib/math/base/special/csch":"0UO","@stdlib/math-base-special-csch":"0UP","@stdlib/math/base/special/csignum":"0UQ","@stdlib/math-base-special-csignum":"0UR","@stdlib/math/base/special/deg2rad":"0US","@stdlib/math-base-special-deg2rad":"0UT","@stdlib/math/base/special/deg2radf":"0UU","@stdlib/math-base-special-deg2radf":"0UV","@stdlib/math/base/special/digamma":"0UW","@stdlib/math-base-special-digamma":"0UX","@stdlib/math/base/special/dirac-delta":"0UY","@stdlib/math-base-special-dirac-delta":"0UZ","@stdlib/math/base/special/dirichlet-eta":"0Ua","@stdlib/math-base-special-dirichlet-eta":"0Ub","@stdlib/math/base/special/ellipe":"0Uc","@stdlib/math-base-special-ellipe":"0Ud","@stdlib/math/base/special/ellipk":"0Ue","@stdlib/math-base-special-ellipk":"0Uf","@stdlib/math/base/special/erf":"0Ug","@stdlib/math-base-special-erf":"0Uh","@stdlib/math/base/special/erfc":"0Ui","@stdlib/math-base-special-erfc":"0Uj","@stdlib/math/base/special/erfcinv":"0Uk","@stdlib/math-base-special-erfcinv":"0Ul","@stdlib/math/base/special/erfinv":"0Um","@stdlib/math-base-special-erfinv":"0Un","@stdlib/math/base/special/exp":"0Uo","@stdlib/math-base-special-exp":"0Up","@stdlib/math/base/special/exp10":"0Uq","@stdlib/math-base-special-exp10":"0Ur","@stdlib/math/base/special/exp2":"0Us","@stdlib/math-base-special-exp2":"0Ut","@stdlib/math/base/special/expit":"0Uu","@stdlib/math-base-special-expit":"0Uv","@stdlib/math/base/special/expm1":"0Uw","@stdlib/math-base-special-expm1":"0Ux","@stdlib/math/base/special/expm1rel":"0Uy","@stdlib/math-base-special-expm1rel":"0Uz","@stdlib/math/base/special/factorial":"0V0","@stdlib/math-base-special-factorial":"0V1","@stdlib/math/base/special/factorialln":"0V2","@stdlib/math-base-special-factorialln":"0V3","@stdlib/math/base/special/falling-factorial":"0V4","@stdlib/math-base-special-falling-factorial":"0V5","@stdlib/math/base/special/fast/abs":"0V6","@stdlib/math-base-special-fast-abs":"0V7","@stdlib/math/base/special/fast/acosh":"0V8","@stdlib/math-base-special-fast-acosh":"0V9","@stdlib/math/base/special/fast/alpha-max-plus-beta-min":"0VA","@stdlib/math-base-special-fast-alpha-max-plus-beta-min":"0VB","@stdlib/math/base/special/fast/asinh":"0VC","@stdlib/math-base-special-fast-asinh":"0VD","@stdlib/math/base/special/fast/atanh":"0VE","@stdlib/math-base-special-fast-atanh":"0VF","@stdlib/math/base/special/fast/hypot":"0VG","@stdlib/math-base-special-fast-hypot":"0VH","@stdlib/math/base/special/fast/max":"0VI","@stdlib/math-base-special-fast-max":"0VJ","@stdlib/math/base/special/fast/min":"0VK","@stdlib/math-base-special-fast-min":"0VL","@stdlib/math/base/special/fast":"0VM","@stdlib/math-base-special-fast":"0VN","@stdlib/math/base/special/fast/pow-int":"0VO","@stdlib/math-base-special-fast-pow-int":"0VP","@stdlib/math/base/special/fast/uint32-log2":"0VQ","@stdlib/math-base-special-fast-uint32-log2":"0VR","@stdlib/math/base/special/fast/uint32-sqrt":"0VS","@stdlib/math-base-special-fast-uint32-sqrt":"0VT","@stdlib/math/base/special/fibonacci-index":"0VU","@stdlib/math-base-special-fibonacci-index":"0VV","@stdlib/math/base/special/fibonacci":"0VW","@stdlib/math-base-special-fibonacci":"0VX","@stdlib/math/base/special/flipsign":"0VY","@stdlib/math-base-special-flipsign":"0VZ","@stdlib/math/base/special/flipsignf":"0Va","@stdlib/math-base-special-flipsignf":"0Vb","@stdlib/math/base/special/floor":"0Vc","@stdlib/math-base-special-floor":"0Vd","@stdlib/math/base/special/floor10":"0Ve","@stdlib/math-base-special-floor10":"0Vf","@stdlib/math/base/special/floor2":"0Vg","@stdlib/math-base-special-floor2":"0Vh","@stdlib/math/base/special/floorb":"0Vi","@stdlib/math-base-special-floorb":"0Vj","@stdlib/math/base/special/floorf":"0Vk","@stdlib/math-base-special-floorf":"0Vl","@stdlib/math/base/special/floorn":"0Vm","@stdlib/math-base-special-floorn":"0Vn","@stdlib/math/base/special/floorsd":"0Vo","@stdlib/math-base-special-floorsd":"0Vp","@stdlib/math/base/special/fresnel":"0Vq","@stdlib/math-base-special-fresnel":"0Vr","@stdlib/math/base/special/fresnelc":"0Vs","@stdlib/math-base-special-fresnelc":"0Vt","@stdlib/math/base/special/fresnels":"0Vu","@stdlib/math-base-special-fresnels":"0Vv","@stdlib/math/base/special/frexp":"0Vw","@stdlib/math-base-special-frexp":"0Vx","@stdlib/math/base/special/gamma-delta-ratio":"0Vy","@stdlib/math-base-special-gamma-delta-ratio":"0Vz","@stdlib/math/base/special/gamma-lanczos-sum-expg-scaled":"0W0","@stdlib/math-base-special-gamma-lanczos-sum-expg-scaled":"0W1","@stdlib/math/base/special/gamma-lanczos-sum":"0W2","@stdlib/math-base-special-gamma-lanczos-sum":"0W3","@stdlib/math/base/special/gamma":"0W4","@stdlib/math-base-special-gamma":"0W5","@stdlib/math/base/special/gamma1pm1":"0W6","@stdlib/math-base-special-gamma1pm1":"0W7","@stdlib/math/base/special/gammainc":"0W8","@stdlib/math-base-special-gammainc":"0W9","@stdlib/math/base/special/gammaincinv":"0WA","@stdlib/math-base-special-gammaincinv":"0WB","@stdlib/math/base/special/gammaln":"0WC","@stdlib/math-base-special-gammaln":"0WD","@stdlib/math/base/special/gcd":"0WE","@stdlib/math-base-special-gcd":"0WF","@stdlib/math/base/special/hacovercos":"0WG","@stdlib/math-base-special-hacovercos":"0WH","@stdlib/math/base/special/hacoversin":"0WI","@stdlib/math-base-special-hacoversin":"0WJ","@stdlib/math/base/special/havercos":"0WK","@stdlib/math-base-special-havercos":"0WL","@stdlib/math/base/special/haversin":"0WM","@stdlib/math-base-special-haversin":"0WN","@stdlib/math/base/special/heaviside":"0WO","@stdlib/math-base-special-heaviside":"0WP","@stdlib/math/base/special/hypot":"0WQ","@stdlib/math-base-special-hypot":"0WR","@stdlib/math/base/special/hypotf":"0WS","@stdlib/math-base-special-hypotf":"0WT","@stdlib/math/base/special/identity":"0WU","@stdlib/math-base-special-identity":"0WV","@stdlib/math/base/special/identityf":"0WW","@stdlib/math-base-special-identityf":"0WX","@stdlib/math/base/special/inv":"0WY","@stdlib/math-base-special-inv":"0WZ","@stdlib/math/base/special/invf":"0Wa","@stdlib/math-base-special-invf":"0Wb","@stdlib/math/base/special/kernel-betainc":"0Wc","@stdlib/math-base-special-kernel-betainc":"0Wd","@stdlib/math/base/special/kernel-betaincinv":"0We","@stdlib/math-base-special-kernel-betaincinv":"0Wf","@stdlib/math/base/special/kernel-cos":"0Wg","@stdlib/math-base-special-kernel-cos":"0Wh","@stdlib/math/base/special/kernel-sin":"0Wi","@stdlib/math-base-special-kernel-sin":"0Wj","@stdlib/math/base/special/kernel-tan":"0Wk","@stdlib/math-base-special-kernel-tan":"0Wl","@stdlib/math/base/special/kronecker-delta":"0Wm","@stdlib/math-base-special-kronecker-delta":"0Wn","@stdlib/math/base/special/kronecker-deltaf":"0Wo","@stdlib/math-base-special-kronecker-deltaf":"0Wp","@stdlib/math/base/special/labs":"0Wq","@stdlib/math-base-special-labs":"0Wr","@stdlib/math/base/special/lcm":"0Ws","@stdlib/math-base-special-lcm":"0Wt","@stdlib/math/base/special/ldexp":"0Wu","@stdlib/math-base-special-ldexp":"0Wv","@stdlib/math/base/special/ln":"0Ww","@stdlib/math-base-special-ln":"0Wx","@stdlib/math/base/special/log":"0Wy","@stdlib/math-base-special-log":"0Wz","@stdlib/math/base/special/log10":"0X0","@stdlib/math-base-special-log10":"0X1","@stdlib/math/base/special/log1mexp":"0X2","@stdlib/math-base-special-log1mexp":"0X3","@stdlib/math/base/special/log1p":"0X4","@stdlib/math-base-special-log1p":"0X5","@stdlib/math/base/special/log1pexp":"0X6","@stdlib/math-base-special-log1pexp":"0X7","@stdlib/math/base/special/log2":"0X8","@stdlib/math-base-special-log2":"0X9","@stdlib/math/base/special/logaddexp":"0XA","@stdlib/math-base-special-logaddexp":"0XB","@stdlib/math/base/special/logit":"0XC","@stdlib/math-base-special-logit":"0XD","@stdlib/math/base/special/lucas":"0XE","@stdlib/math-base-special-lucas":"0XF","@stdlib/math/base/special/max":"0XG","@stdlib/math-base-special-max":"0XH","@stdlib/math/base/special/maxabs":"0XI","@stdlib/math-base-special-maxabs":"0XJ","@stdlib/math/base/special/min":"0XK","@stdlib/math-base-special-min":"0XL","@stdlib/math/base/special/minabs":"0XM","@stdlib/math-base-special-minabs":"0XN","@stdlib/math/base/special/minmax":"0XO","@stdlib/math-base-special-minmax":"0XP","@stdlib/math/base/special/minmaxabs":"0XQ","@stdlib/math-base-special-minmaxabs":"0XR","@stdlib/math/base/special/modf":"0XS","@stdlib/math-base-special-modf":"0XT","@stdlib/math/base/special/negafibonacci":"0XU","@stdlib/math-base-special-negafibonacci":"0XV","@stdlib/math/base/special/negalucas":"0XW","@stdlib/math-base-special-negalucas":"0XX","@stdlib/math/base/special/nonfibonacci":"0XY","@stdlib/math-base-special-nonfibonacci":"0XZ","@stdlib/math/base/special":"0Xa","@stdlib/math-base-special":"0Xb","@stdlib/math/base/special/pdiff":"0Xc","@stdlib/math-base-special-pdiff":"0Xd","@stdlib/math/base/special/pdifff":"0Xe","@stdlib/math-base-special-pdifff":"0Xf","@stdlib/math/base/special/polygamma":"0Xg","@stdlib/math-base-special-polygamma":"0Xh","@stdlib/math/base/special/pow":"0Xi","@stdlib/math-base-special-pow":"0Xj","@stdlib/math/base/special/powm1":"0Xk","@stdlib/math-base-special-powm1":"0Xl","@stdlib/math/base/special/rad2deg":"0Xm","@stdlib/math-base-special-rad2deg":"0Xn","@stdlib/math/base/special/ramp":"0Xo","@stdlib/math-base-special-ramp":"0Xp","@stdlib/math/base/special/rampf":"0Xq","@stdlib/math-base-special-rampf":"0Xr","@stdlib/math/base/special/rempio2":"0Xs","@stdlib/math-base-special-rempio2":"0Xt","@stdlib/math/base/special/riemann-zeta":"0Xu","@stdlib/math-base-special-riemann-zeta":"0Xv","@stdlib/math/base/special/rising-factorial":"0Xw","@stdlib/math-base-special-rising-factorial":"0Xx","@stdlib/math/base/special/round":"0Xy","@stdlib/math-base-special-round":"0Xz","@stdlib/math/base/special/round10":"0Y0","@stdlib/math-base-special-round10":"0Y1","@stdlib/math/base/special/round2":"0Y2","@stdlib/math-base-special-round2":"0Y3","@stdlib/math/base/special/roundb":"0Y4","@stdlib/math-base-special-roundb":"0Y5","@stdlib/math/base/special/roundn":"0Y6","@stdlib/math-base-special-roundn":"0Y7","@stdlib/math/base/special/roundsd":"0Y8","@stdlib/math-base-special-roundsd":"0Y9","@stdlib/math/base/special/rsqrt":"0YA","@stdlib/math-base-special-rsqrt":"0YB","@stdlib/math/base/special/rsqrtf":"0YC","@stdlib/math-base-special-rsqrtf":"0YD","@stdlib/math/base/special/sici":"0YE","@stdlib/math-base-special-sici":"0YF","@stdlib/math/base/special/signum":"0YG","@stdlib/math-base-special-signum":"0YH","@stdlib/math/base/special/signumf":"0YI","@stdlib/math-base-special-signumf":"0YJ","@stdlib/math/base/special/sin":"0YK","@stdlib/math-base-special-sin":"0YL","@stdlib/math/base/special/sinc":"0YM","@stdlib/math-base-special-sinc":"0YN","@stdlib/math/base/special/sincos":"0YO","@stdlib/math-base-special-sincos":"0YP","@stdlib/math/base/special/sincospi":"0YQ","@stdlib/math-base-special-sincospi":"0YR","@stdlib/math/base/special/sinh":"0YS","@stdlib/math-base-special-sinh":"0YT","@stdlib/math/base/special/sinpi":"0YU","@stdlib/math-base-special-sinpi":"0YV","@stdlib/math/base/special/spence":"0YW","@stdlib/math-base-special-spence":"0YX","@stdlib/math/base/special/sqrt":"0YY","@stdlib/math-base-special-sqrt":"0YZ","@stdlib/math/base/special/sqrt1pm1":"0Ya","@stdlib/math-base-special-sqrt1pm1":"0Yb","@stdlib/math/base/special/sqrtf":"0Yc","@stdlib/math-base-special-sqrtf":"0Yd","@stdlib/math/base/special/tan":"0Ye","@stdlib/math-base-special-tan":"0Yf","@stdlib/math/base/special/tanh":"0Yg","@stdlib/math-base-special-tanh":"0Yh","@stdlib/math/base/special/tribonacci":"0Yi","@stdlib/math-base-special-tribonacci":"0Yj","@stdlib/math/base/special/trigamma":"0Yk","@stdlib/math-base-special-trigamma":"0Yl","@stdlib/math/base/special/trunc":"0Ym","@stdlib/math-base-special-trunc":"0Yn","@stdlib/math/base/special/trunc10":"0Yo","@stdlib/math-base-special-trunc10":"0Yp","@stdlib/math/base/special/trunc2":"0Yq","@stdlib/math-base-special-trunc2":"0Yr","@stdlib/math/base/special/truncb":"0Ys","@stdlib/math-base-special-truncb":"0Yt","@stdlib/math/base/special/truncf":"0Yu","@stdlib/math-base-special-truncf":"0Yv","@stdlib/math/base/special/truncn":"0Yw","@stdlib/math-base-special-truncn":"0Yx","@stdlib/math/base/special/truncsd":"0Yy","@stdlib/math-base-special-truncsd":"0Yz","@stdlib/math/base/special/vercos":"0Z0","@stdlib/math-base-special-vercos":"0Z1","@stdlib/math/base/special/versin":"0Z2","@stdlib/math-base-special-versin":"0Z3","@stdlib/math/base/special/wrap":"0Z4","@stdlib/math-base-special-wrap":"0Z5","@stdlib/math/base/special/xlog1py":"0Z6","@stdlib/math-base-special-xlog1py":"0Z7","@stdlib/math/base/special/xlogy":"0Z8","@stdlib/math-base-special-xlogy":"0Z9","@stdlib/math/base/tools/continued-fraction":"0ZA","@stdlib/math-base-tools-continued-fraction":"0ZB","@stdlib/math/base/tools/evalpoly-compile":"0ZC","@stdlib/math-base-tools-evalpoly-compile":"0ZD","@stdlib/math/base/tools/evalpoly":"0ZE","@stdlib/math-base-tools-evalpoly":"0ZF","@stdlib/math/base/tools/evalrational-compile":"0ZG","@stdlib/math-base-tools-evalrational-compile":"0ZH","@stdlib/math/base/tools/evalrational":"0ZI","@stdlib/math-base-tools-evalrational":"0ZJ","@stdlib/math/base/tools/fibpoly":"0ZK","@stdlib/math-base-tools-fibpoly":"0ZL","@stdlib/math/base/tools/hermitepoly":"0ZM","@stdlib/math-base-tools-hermitepoly":"0ZN","@stdlib/math/base/tools/lucaspoly":"0ZO","@stdlib/math-base-tools-lucaspoly":"0ZP","@stdlib/math/base/tools/normhermitepoly":"0ZQ","@stdlib/math-base-tools-normhermitepoly":"0ZR","@stdlib/math/base/tools":"0ZS","@stdlib/math-base-tools":"0ZT","@stdlib/math/base/tools/sum-series":"0ZU","@stdlib/math-base-tools-sum-series":"0ZV","@stdlib/math/base/utils/absolute-difference":"0ZW","@stdlib/math-base-utils-absolute-difference":"0ZX","@stdlib/math/base/utils/float64-epsilon-difference":"0ZY","@stdlib/math-base-utils-float64-epsilon-difference":"0ZZ","@stdlib/math/base/utils":"0Za","@stdlib/math-base-utils":"0Zb","@stdlib/math/base/utils/relative-difference":"0Zc","@stdlib/math-base-utils-relative-difference":"0Zd","@stdlib/math/iter/ops/add":"0Ze","@stdlib/math-iter-ops-add":"0Zf","@stdlib/math/iter/ops/divide":"0Zg","@stdlib/math-iter-ops-divide":"0Zh","@stdlib/math/iter/ops/mod":"0Zi","@stdlib/math-iter-ops-mod":"0Zj","@stdlib/math/iter/ops/multiply":"0Zk","@stdlib/math-iter-ops-multiply":"0Zl","@stdlib/math/iter/ops":"0Zm","@stdlib/math-iter-ops":"0Zn","@stdlib/math/iter/ops/subtract":"0Zo","@stdlib/math-iter-ops-subtract":"0Zp","@stdlib/math/iter":"0Zq","@stdlib/math-iter":"0Zr","@stdlib/math/iter/sequences/composites":"0Zs","@stdlib/math-iter-sequences-composites":"0Zt","@stdlib/math/iter/sequences/continued-fraction":"0Zu","@stdlib/math-iter-sequences-continued-fraction":"0Zv","@stdlib/math/iter/sequences/cubes":"0Zw","@stdlib/math-iter-sequences-cubes":"0Zx","@stdlib/math/iter/sequences/even-integers":"0Zy","@stdlib/math-iter-sequences-even-integers":"0Zz","@stdlib/math/iter/sequences/factorials":"0a0","@stdlib/math-iter-sequences-factorials":"0a1","@stdlib/math/iter/sequences/fibonacci":"0a2","@stdlib/math-iter-sequences-fibonacci":"0a3","@stdlib/math/iter/sequences/fifth-powers":"0a4","@stdlib/math-iter-sequences-fifth-powers":"0a5","@stdlib/math/iter/sequences/fourth-powers":"0a6","@stdlib/math-iter-sequences-fourth-powers":"0a7","@stdlib/math/iter/sequences/integers":"0a8","@stdlib/math-iter-sequences-integers":"0a9","@stdlib/math/iter/sequences/lucas":"0aA","@stdlib/math-iter-sequences-lucas":"0aB","@stdlib/math/iter/sequences/negafibonacci":"0aC","@stdlib/math-iter-sequences-negafibonacci":"0aD","@stdlib/math/iter/sequences/negalucas":"0aE","@stdlib/math-iter-sequences-negalucas":"0aF","@stdlib/math/iter/sequences/negative-even-integers":"0aG","@stdlib/math-iter-sequences-negative-even-integers":"0aH","@stdlib/math/iter/sequences/negative-integers":"0aI","@stdlib/math-iter-sequences-negative-integers":"0aJ","@stdlib/math/iter/sequences/negative-odd-integers":"0aK","@stdlib/math-iter-sequences-negative-odd-integers":"0aL","@stdlib/math/iter/sequences/nonfibonacci":"0aM","@stdlib/math-iter-sequences-nonfibonacci":"0aN","@stdlib/math/iter/sequences/nonnegative-even-integers":"0aO","@stdlib/math-iter-sequences-nonnegative-even-integers":"0aP","@stdlib/math/iter/sequences/nonnegative-integers":"0aQ","@stdlib/math-iter-sequences-nonnegative-integers":"0aR","@stdlib/math/iter/sequences/nonpositive-even-integers":"0aS","@stdlib/math-iter-sequences-nonpositive-even-integers":"0aT","@stdlib/math/iter/sequences/nonpositive-integers":"0aU","@stdlib/math-iter-sequences-nonpositive-integers":"0aV","@stdlib/math/iter/sequences/nonsquares":"0aW","@stdlib/math-iter-sequences-nonsquares":"0aX","@stdlib/math/iter/sequences/odd-integers":"0aY","@stdlib/math-iter-sequences-odd-integers":"0aZ","@stdlib/math/iter/sequences":"0aa","@stdlib/math-iter-sequences":"0ab","@stdlib/math/iter/sequences/positive-even-integers":"0ac","@stdlib/math-iter-sequences-positive-even-integers":"0ad","@stdlib/math/iter/sequences/positive-integers":"0ae","@stdlib/math-iter-sequences-positive-integers":"0af","@stdlib/math/iter/sequences/positive-odd-integers":"0ag","@stdlib/math-iter-sequences-positive-odd-integers":"0ah","@stdlib/math/iter/sequences/primes":"0ai","@stdlib/math-iter-sequences-primes":"0aj","@stdlib/math/iter/sequences/squared-triangular":"0ak","@stdlib/math-iter-sequences-squared-triangular":"0al","@stdlib/math/iter/sequences/squares":"0am","@stdlib/math-iter-sequences-squares":"0an","@stdlib/math/iter/sequences/triangular":"0ao","@stdlib/math-iter-sequences-triangular":"0ap","@stdlib/math/iter/special/abs":"0aq","@stdlib/math-iter-special-abs":"0ar","@stdlib/math/iter/special/abs2":"0as","@stdlib/math-iter-special-abs2":"0at","@stdlib/math/iter/special/acos":"0au","@stdlib/math-iter-special-acos":"0av","@stdlib/math/iter/special/acosh":"0aw","@stdlib/math-iter-special-acosh":"0ax","@stdlib/math/iter/special/acot":"0ay","@stdlib/math-iter-special-acot":"0az","@stdlib/math/iter/special/acoth":"0b0","@stdlib/math-iter-special-acoth":"0b1","@stdlib/math/iter/special/acovercos":"0b2","@stdlib/math-iter-special-acovercos":"0b3","@stdlib/math/iter/special/acoversin":"0b4","@stdlib/math-iter-special-acoversin":"0b5","@stdlib/math/iter/special/ahavercos":"0b6","@stdlib/math-iter-special-ahavercos":"0b7","@stdlib/math/iter/special/ahaversin":"0b8","@stdlib/math-iter-special-ahaversin":"0b9","@stdlib/math/iter/special/asin":"0bA","@stdlib/math-iter-special-asin":"0bB","@stdlib/math/iter/special/asinh":"0bC","@stdlib/math-iter-special-asinh":"0bD","@stdlib/math/iter/special/atan":"0bE","@stdlib/math-iter-special-atan":"0bF","@stdlib/math/iter/special/atan2":"0bG","@stdlib/math-iter-special-atan2":"0bH","@stdlib/math/iter/special/atanh":"0bI","@stdlib/math-iter-special-atanh":"0bJ","@stdlib/math/iter/special/avercos":"0bK","@stdlib/math-iter-special-avercos":"0bL","@stdlib/math/iter/special/aversin":"0bM","@stdlib/math-iter-special-aversin":"0bN","@stdlib/math/iter/special/besselj0":"0bO","@stdlib/math-iter-special-besselj0":"0bP","@stdlib/math/iter/special/besselj1":"0bQ","@stdlib/math-iter-special-besselj1":"0bR","@stdlib/math/iter/special/bessely0":"0bS","@stdlib/math-iter-special-bessely0":"0bT","@stdlib/math/iter/special/bessely1":"0bU","@stdlib/math-iter-special-bessely1":"0bV","@stdlib/math/iter/special/beta":"0bW","@stdlib/math-iter-special-beta":"0bX","@stdlib/math/iter/special/betaln":"0bY","@stdlib/math-iter-special-betaln":"0bZ","@stdlib/math/iter/special/binet":"0ba","@stdlib/math-iter-special-binet":"0bb","@stdlib/math/iter/special/cbrt":"0bc","@stdlib/math-iter-special-cbrt":"0bd","@stdlib/math/iter/special/ceil":"0be","@stdlib/math-iter-special-ceil":"0bf","@stdlib/math/iter/special/ceil10":"0bg","@stdlib/math-iter-special-ceil10":"0bh","@stdlib/math/iter/special/ceil2":"0bi","@stdlib/math-iter-special-ceil2":"0bj","@stdlib/math/iter/special/cos":"0bk","@stdlib/math-iter-special-cos":"0bl","@stdlib/math/iter/special/cosh":"0bm","@stdlib/math-iter-special-cosh":"0bn","@stdlib/math/iter/special/cosm1":"0bo","@stdlib/math-iter-special-cosm1":"0bp","@stdlib/math/iter/special/cospi":"0bq","@stdlib/math-iter-special-cospi":"0br","@stdlib/math/iter/special/covercos":"0bs","@stdlib/math-iter-special-covercos":"0bt","@stdlib/math/iter/special/coversin":"0bu","@stdlib/math-iter-special-coversin":"0bv","@stdlib/math/iter/special/deg2rad":"0bw","@stdlib/math-iter-special-deg2rad":"0bx","@stdlib/math/iter/special/digamma":"0by","@stdlib/math-iter-special-digamma":"0bz","@stdlib/math/iter/special/dirac-delta":"0c0","@stdlib/math-iter-special-dirac-delta":"0c1","@stdlib/math/iter/special/dirichlet-eta":"0c2","@stdlib/math-iter-special-dirichlet-eta":"0c3","@stdlib/math/iter/special/ellipe":"0c4","@stdlib/math-iter-special-ellipe":"0c5","@stdlib/math/iter/special/ellipk":"0c6","@stdlib/math-iter-special-ellipk":"0c7","@stdlib/math/iter/special/erf":"0c8","@stdlib/math-iter-special-erf":"0c9","@stdlib/math/iter/special/erfc":"0cA","@stdlib/math-iter-special-erfc":"0cB","@stdlib/math/iter/special/erfcinv":"0cC","@stdlib/math-iter-special-erfcinv":"0cD","@stdlib/math/iter/special/erfinv":"0cE","@stdlib/math-iter-special-erfinv":"0cF","@stdlib/math/iter/special/exp":"0cG","@stdlib/math-iter-special-exp":"0cH","@stdlib/math/iter/special/exp10":"0cI","@stdlib/math-iter-special-exp10":"0cJ","@stdlib/math/iter/special/exp2":"0cK","@stdlib/math-iter-special-exp2":"0cL","@stdlib/math/iter/special/expit":"0cM","@stdlib/math-iter-special-expit":"0cN","@stdlib/math/iter/special/expm1":"0cO","@stdlib/math-iter-special-expm1":"0cP","@stdlib/math/iter/special/expm1rel":"0cQ","@stdlib/math-iter-special-expm1rel":"0cR","@stdlib/math/iter/special/factorial":"0cS","@stdlib/math-iter-special-factorial":"0cT","@stdlib/math/iter/special/factorialln":"0cU","@stdlib/math-iter-special-factorialln":"0cV","@stdlib/math/iter/special/floor":"0cW","@stdlib/math-iter-special-floor":"0cX","@stdlib/math/iter/special/floor10":"0cY","@stdlib/math-iter-special-floor10":"0cZ","@stdlib/math/iter/special/floor2":"0ca","@stdlib/math-iter-special-floor2":"0cb","@stdlib/math/iter/special/fresnelc":"0cc","@stdlib/math-iter-special-fresnelc":"0cd","@stdlib/math/iter/special/fresnels":"0ce","@stdlib/math-iter-special-fresnels":"0cf","@stdlib/math/iter/special/gamma":"0cg","@stdlib/math-iter-special-gamma":"0ch","@stdlib/math/iter/special/gamma1pm1":"0ci","@stdlib/math-iter-special-gamma1pm1":"0cj","@stdlib/math/iter/special/gammaln":"0ck","@stdlib/math-iter-special-gammaln":"0cl","@stdlib/math/iter/special/hacovercos":"0cm","@stdlib/math-iter-special-hacovercos":"0cn","@stdlib/math/iter/special/hacoversin":"0co","@stdlib/math-iter-special-hacoversin":"0cp","@stdlib/math/iter/special/havercos":"0cq","@stdlib/math-iter-special-havercos":"0cr","@stdlib/math/iter/special/haversin":"0cs","@stdlib/math-iter-special-haversin":"0ct","@stdlib/math/iter/special/inv":"0cu","@stdlib/math-iter-special-inv":"0cv","@stdlib/math/iter/special/ln":"0cw","@stdlib/math-iter-special-ln":"0cx","@stdlib/math/iter/special/log":"0cy","@stdlib/math-iter-special-log":"0cz","@stdlib/math/iter/special/log10":"0d0","@stdlib/math-iter-special-log10":"0d1","@stdlib/math/iter/special/log1mexp":"0d2","@stdlib/math-iter-special-log1mexp":"0d3","@stdlib/math/iter/special/log1p":"0d4","@stdlib/math-iter-special-log1p":"0d5","@stdlib/math/iter/special/log1pexp":"0d6","@stdlib/math-iter-special-log1pexp":"0d7","@stdlib/math/iter/special/log2":"0d8","@stdlib/math-iter-special-log2":"0d9","@stdlib/math/iter/special/logit":"0dA","@stdlib/math-iter-special-logit":"0dB","@stdlib/math/iter/special":"0dC","@stdlib/math-iter-special":"0dD","@stdlib/math/iter/special/pow":"0dE","@stdlib/math-iter-special-pow":"0dF","@stdlib/math/iter/special/rad2deg":"0dG","@stdlib/math-iter-special-rad2deg":"0dH","@stdlib/math/iter/special/ramp":"0dI","@stdlib/math-iter-special-ramp":"0dJ","@stdlib/math/iter/special/riemann-zeta":"0dK","@stdlib/math-iter-special-riemann-zeta":"0dL","@stdlib/math/iter/special/round":"0dM","@stdlib/math-iter-special-round":"0dN","@stdlib/math/iter/special/round10":"0dO","@stdlib/math-iter-special-round10":"0dP","@stdlib/math/iter/special/round2":"0dQ","@stdlib/math-iter-special-round2":"0dR","@stdlib/math/iter/special/rsqrt":"0dS","@stdlib/math-iter-special-rsqrt":"0dT","@stdlib/math/iter/special/signum":"0dU","@stdlib/math-iter-special-signum":"0dV","@stdlib/math/iter/special/sin":"0dW","@stdlib/math-iter-special-sin":"0dX","@stdlib/math/iter/special/sinc":"0dY","@stdlib/math-iter-special-sinc":"0dZ","@stdlib/math/iter/special/sinh":"0da","@stdlib/math-iter-special-sinh":"0db","@stdlib/math/iter/special/sinpi":"0dc","@stdlib/math-iter-special-sinpi":"0dd","@stdlib/math/iter/special/spence":"0de","@stdlib/math-iter-special-spence":"0df","@stdlib/math/iter/special/sqrt":"0dg","@stdlib/math-iter-special-sqrt":"0dh","@stdlib/math/iter/special/sqrt1pm1":"0di","@stdlib/math-iter-special-sqrt1pm1":"0dj","@stdlib/math/iter/special/tan":"0dk","@stdlib/math-iter-special-tan":"0dl","@stdlib/math/iter/special/tanh":"0dm","@stdlib/math-iter-special-tanh":"0dn","@stdlib/math/iter/special/trigamma":"0do","@stdlib/math-iter-special-trigamma":"0dp","@stdlib/math/iter/special/trunc":"0dq","@stdlib/math-iter-special-trunc":"0dr","@stdlib/math/iter/special/trunc10":"0ds","@stdlib/math-iter-special-trunc10":"0dt","@stdlib/math/iter/special/trunc2":"0du","@stdlib/math-iter-special-trunc2":"0dv","@stdlib/math/iter/special/vercos":"0dw","@stdlib/math-iter-special-vercos":"0dx","@stdlib/math/iter/special/versin":"0dy","@stdlib/math-iter-special-versin":"0dz","@stdlib/math/iter/tools/map":"0e0","@stdlib/math-iter-tools-map":"0e1","@stdlib/math/iter/tools/map2":"0e2","@stdlib/math-iter-tools-map2":"0e3","@stdlib/math/iter/tools/map3":"0e4","@stdlib/math-iter-tools-map3":"0e5","@stdlib/math/iter/tools":"0e6","@stdlib/math-iter-tools":"0e7","@stdlib/math/iter/utils/continued-fraction":"0e8","@stdlib/math-iter-utils-continued-fraction":"0e9","@stdlib/math/iter/utils":"0eA","@stdlib/math-iter-utils":"0eB","@stdlib/math":"0eD","@stdlib/math/special/abs":"0eE","@stdlib/math-special-abs":"0eF","@stdlib/math/special":"0eG","@stdlib/math-special":"0eH","@stdlib/math/strided/ops/add":"0eI","@stdlib/math-strided-ops-add":"0eJ","@stdlib/math/strided/ops/mul":"0eK","@stdlib/math-strided-ops-mul":"0eL","@stdlib/math/strided/ops":"0eM","@stdlib/math-strided-ops":"0eN","@stdlib/math/strided/ops/sub":"0eO","@stdlib/math-strided-ops-sub":"0eP","@stdlib/math/strided":"0eQ","@stdlib/math-strided":"0eR","@stdlib/math/strided/special/abs-by":"0eS","@stdlib/math-strided-special-abs-by":"0eT","@stdlib/math/strided/special/abs":"0eU","@stdlib/math-strided-special-abs":"0eV","@stdlib/math/strided/special/abs2-by":"0eW","@stdlib/math-strided-special-abs2-by":"0eX","@stdlib/math/strided/special/abs2":"0eY","@stdlib/math-strided-special-abs2":"0eZ","@stdlib/math/strided/special/acos-by":"0ea","@stdlib/math-strided-special-acos-by":"0eb","@stdlib/math/strided/special/acosh-by":"0ec","@stdlib/math-strided-special-acosh-by":"0ed","@stdlib/math/strided/special/acot-by":"0ee","@stdlib/math-strided-special-acot-by":"0ef","@stdlib/math/strided/special/acoth-by":"0eg","@stdlib/math-strided-special-acoth-by":"0eh","@stdlib/math/strided/special/acovercos-by":"0ei","@stdlib/math-strided-special-acovercos-by":"0ej","@stdlib/math/strided/special/acoversin-by":"0ek","@stdlib/math-strided-special-acoversin-by":"0el","@stdlib/math/strided/special/ahavercos-by":"0em","@stdlib/math-strided-special-ahavercos-by":"0en","@stdlib/math/strided/special/ahaversin-by":"0eo","@stdlib/math-strided-special-ahaversin-by":"0ep","@stdlib/math/strided/special/asin-by":"0eq","@stdlib/math-strided-special-asin-by":"0er","@stdlib/math/strided/special/asinh-by":"0es","@stdlib/math-strided-special-asinh-by":"0et","@stdlib/math/strided/special/atan-by":"0eu","@stdlib/math-strided-special-atan-by":"0ev","@stdlib/math/strided/special/atanh-by":"0ew","@stdlib/math-strided-special-atanh-by":"0ex","@stdlib/math/strided/special/avercos-by":"0ey","@stdlib/math-strided-special-avercos-by":"0ez","@stdlib/math/strided/special/aversin-by":"0f0","@stdlib/math-strided-special-aversin-by":"0f1","@stdlib/math/strided/special/besselj0-by":"0f2","@stdlib/math-strided-special-besselj0-by":"0f3","@stdlib/math/strided/special/besselj1-by":"0f4","@stdlib/math-strided-special-besselj1-by":"0f5","@stdlib/math/strided/special/bessely0-by":"0f6","@stdlib/math-strided-special-bessely0-by":"0f7","@stdlib/math/strided/special/bessely1-by":"0f8","@stdlib/math-strided-special-bessely1-by":"0f9","@stdlib/math/strided/special/binet-by":"0fA","@stdlib/math-strided-special-binet-by":"0fB","@stdlib/math/strided/special/cbrt":"0fC","@stdlib/math-strided-special-cbrt":"0fD","@stdlib/math/strided/special/ceil":"0fE","@stdlib/math-strided-special-ceil":"0fF","@stdlib/math/strided/special/dabs":"0fG","@stdlib/math-strided-special-dabs":"0fH","@stdlib/math/strided/special/dabs2":"0fI","@stdlib/math-strided-special-dabs2":"0fJ","@stdlib/math/strided/special/dcbrt":"0fK","@stdlib/math-strided-special-dcbrt":"0fL","@stdlib/math/strided/special/dceil":"0fM","@stdlib/math-strided-special-dceil":"0fN","@stdlib/math/strided/special/ddeg2rad":"0fO","@stdlib/math-strided-special-ddeg2rad":"0fP","@stdlib/math/strided/special/deg2rad":"0fQ","@stdlib/math-strided-special-deg2rad":"0fR","@stdlib/math/strided/special/dfloor":"0fS","@stdlib/math-strided-special-dfloor":"0fT","@stdlib/math/strided/special/dinv":"0fU","@stdlib/math-strided-special-dinv":"0fV","@stdlib/math/strided/special/dmskabs":"0fW","@stdlib/math-strided-special-dmskabs":"0fX","@stdlib/math/strided/special/dmskabs2":"0fY","@stdlib/math-strided-special-dmskabs2":"0fZ","@stdlib/math/strided/special/dmskcbrt":"0fa","@stdlib/math-strided-special-dmskcbrt":"0fb","@stdlib/math/strided/special/dmskceil":"0fc","@stdlib/math-strided-special-dmskceil":"0fd","@stdlib/math/strided/special/dmskdeg2rad":"0fe","@stdlib/math-strided-special-dmskdeg2rad":"0ff","@stdlib/math/strided/special/dmskfloor":"0fg","@stdlib/math-strided-special-dmskfloor":"0fh","@stdlib/math/strided/special/dmskinv":"0fi","@stdlib/math-strided-special-dmskinv":"0fj","@stdlib/math/strided/special/dmskramp":"0fk","@stdlib/math-strided-special-dmskramp":"0fl","@stdlib/math/strided/special/dmskrsqrt":"0fm","@stdlib/math-strided-special-dmskrsqrt":"0fn","@stdlib/math/strided/special/dmsksqrt":"0fo","@stdlib/math-strided-special-dmsksqrt":"0fp","@stdlib/math/strided/special/dmsktrunc":"0fq","@stdlib/math-strided-special-dmsktrunc":"0fr","@stdlib/math/strided/special/dramp":"0fs","@stdlib/math-strided-special-dramp":"0ft","@stdlib/math/strided/special/drsqrt":"0fu","@stdlib/math-strided-special-drsqrt":"0fv","@stdlib/math/strided/special/dsqrt":"0fw","@stdlib/math-strided-special-dsqrt":"0fx","@stdlib/math/strided/special/dtrunc":"0fy","@stdlib/math-strided-special-dtrunc":"0fz","@stdlib/math/strided/special/floor":"0g0","@stdlib/math-strided-special-floor":"0g1","@stdlib/math/strided/special/inv":"0g2","@stdlib/math-strided-special-inv":"0g3","@stdlib/math/strided/special":"0g4","@stdlib/math-strided-special":"0g5","@stdlib/math/strided/special/ramp":"0g6","@stdlib/math-strided-special-ramp":"0g7","@stdlib/math/strided/special/rsqrt":"0g8","@stdlib/math-strided-special-rsqrt":"0g9","@stdlib/math/strided/special/sabs":"0gA","@stdlib/math-strided-special-sabs":"0gB","@stdlib/math/strided/special/sabs2":"0gC","@stdlib/math-strided-special-sabs2":"0gD","@stdlib/math/strided/special/scbrt":"0gE","@stdlib/math-strided-special-scbrt":"0gF","@stdlib/math/strided/special/sceil":"0gG","@stdlib/math-strided-special-sceil":"0gH","@stdlib/math/strided/special/sdeg2rad":"0gI","@stdlib/math-strided-special-sdeg2rad":"0gJ","@stdlib/math/strided/special/sfloor":"0gK","@stdlib/math-strided-special-sfloor":"0gL","@stdlib/math/strided/special/sinv":"0gM","@stdlib/math-strided-special-sinv":"0gN","@stdlib/math/strided/special/smskabs":"0gO","@stdlib/math-strided-special-smskabs":"0gP","@stdlib/math/strided/special/smskabs2":"0gQ","@stdlib/math-strided-special-smskabs2":"0gR","@stdlib/math/strided/special/smskcbrt":"0gS","@stdlib/math-strided-special-smskcbrt":"0gT","@stdlib/math/strided/special/smskceil":"0gU","@stdlib/math-strided-special-smskceil":"0gV","@stdlib/math/strided/special/smskdeg2rad":"0gW","@stdlib/math-strided-special-smskdeg2rad":"0gX","@stdlib/math/strided/special/smskfloor":"0gY","@stdlib/math-strided-special-smskfloor":"0gZ","@stdlib/math/strided/special/smskinv":"0ga","@stdlib/math-strided-special-smskinv":"0gb","@stdlib/math/strided/special/smskramp":"0gc","@stdlib/math-strided-special-smskramp":"0gd","@stdlib/math/strided/special/smskrsqrt":"0ge","@stdlib/math-strided-special-smskrsqrt":"0gf","@stdlib/math/strided/special/smsksqrt":"0gg","@stdlib/math-strided-special-smsksqrt":"0gh","@stdlib/math/strided/special/smsktrunc":"0gi","@stdlib/math-strided-special-smsktrunc":"0gj","@stdlib/math/strided/special/sqrt":"0gk","@stdlib/math-strided-special-sqrt":"0gl","@stdlib/math/strided/special/sramp":"0gm","@stdlib/math-strided-special-sramp":"0gn","@stdlib/math/strided/special/srsqrt":"0go","@stdlib/math-strided-special-srsqrt":"0gp","@stdlib/math/strided/special/ssqrt":"0gq","@stdlib/math-strided-special-ssqrt":"0gr","@stdlib/math/strided/special/strunc":"0gs","@stdlib/math-strided-special-strunc":"0gt","@stdlib/math/strided/special/trunc":"0gu","@stdlib/math-strided-special-trunc":"0gv","@stdlib/math/tools":"0gw","@stdlib/math-tools":"0gx","@stdlib/math/tools/unary":"0gy","@stdlib/math-tools-unary":"0gz","@stdlib/ml/incr/binary-classification":"0h0","@stdlib/ml-incr-binary-classification":"0h1","@stdlib/ml/incr/kmeans":"0h2","@stdlib/ml-incr-kmeans":"0h3","@stdlib/ml/incr":"0h4","@stdlib/ml-incr":"0h5","@stdlib/ml/incr/sgd-regression":"0h6","@stdlib/ml-incr-sgd-regression":"0h7","@stdlib/ml":"0h9","@stdlib/namespace/alias2pkg":"0hA","@stdlib/namespace-alias2pkg":"0hB","@stdlib/namespace/alias2related":"0hC","@stdlib/namespace-alias2related":"0hD","@stdlib/namespace/alias2standalone":"0hE","@stdlib/namespace-alias2standalone":"0hF","@stdlib/namespace/aliases":"0hG","@stdlib/namespace-aliases":"0hH","@stdlib/namespace":"0hJ","@stdlib/namespace/pkg2alias":"0hK","@stdlib/namespace-pkg2alias":"0hL","@stdlib/namespace/pkg2related":"0hM","@stdlib/namespace-pkg2related":"0hN","@stdlib/namespace/pkg2standalone":"0hO","@stdlib/namespace-pkg2standalone":"0hP","@stdlib/namespace/standalone2pkg":"0hQ","@stdlib/namespace-standalone2pkg":"0hR","@stdlib/ndarray/array":"0hS","@stdlib/ndarray-array":"0hT","@stdlib/ndarray/base/assert/is-allowed-data-type-cast":"0hU","@stdlib/ndarray-base-assert-is-allowed-data-type-cast":"0hV","@stdlib/ndarray/base/assert/is-buffer-length-compatible-shape":"0hW","@stdlib/ndarray-base-assert-is-buffer-length-compatible-shape":"0hX","@stdlib/ndarray/base/assert/is-buffer-length-compatible":"0hY","@stdlib/ndarray-base-assert-is-buffer-length-compatible":"0hZ","@stdlib/ndarray/base/assert/is-casting-mode":"0ha","@stdlib/ndarray-base-assert-is-casting-mode":"0hb","@stdlib/ndarray/base/assert/is-column-major-contiguous":"0hc","@stdlib/ndarray-base-assert-is-column-major-contiguous":"0hd","@stdlib/ndarray/base/assert/is-column-major":"0he","@stdlib/ndarray-base-assert-is-column-major":"0hf","@stdlib/ndarray/base/assert/is-contiguous":"0hg","@stdlib/ndarray-base-assert-is-contiguous":"0hh","@stdlib/ndarray/base/assert/is-data-type":"0hi","@stdlib/ndarray-base-assert-is-data-type":"0hj","@stdlib/ndarray/base/assert/is-index-mode":"0hk","@stdlib/ndarray-base-assert-is-index-mode":"0hl","@stdlib/ndarray/base/assert/is-order":"0hm","@stdlib/ndarray-base-assert-is-order":"0hn","@stdlib/ndarray/base/assert/is-read-only":"0ho","@stdlib/ndarray-base-assert-is-read-only":"0hp","@stdlib/ndarray/base/assert/is-row-major-contiguous":"0hq","@stdlib/ndarray-base-assert-is-row-major-contiguous":"0hr","@stdlib/ndarray/base/assert/is-row-major":"0hs","@stdlib/ndarray-base-assert-is-row-major":"0ht","@stdlib/ndarray/base/assert/is-safe-data-type-cast":"0hu","@stdlib/ndarray-base-assert-is-safe-data-type-cast":"0hv","@stdlib/ndarray/base/assert/is-same-kind-data-type-cast":"0hw","@stdlib/ndarray-base-assert-is-same-kind-data-type-cast":"0hx","@stdlib/ndarray/base/assert/is-single-segment-compatible":"0hy","@stdlib/ndarray-base-assert-is-single-segment-compatible":"0hz","@stdlib/ndarray/base/assert":"0i0","@stdlib/ndarray-base-assert":"0i1","@stdlib/ndarray/base/bind2vind":"0i2","@stdlib/ndarray-base-bind2vind":"0i3","@stdlib/ndarray/base/broadcast-array":"0i4","@stdlib/ndarray-base-broadcast-array":"0i5","@stdlib/ndarray/base/broadcast-shapes":"0i6","@stdlib/ndarray-base-broadcast-shapes":"0i7","@stdlib/ndarray/base/buffer-ctors":"0i8","@stdlib/ndarray-base-buffer-ctors":"0i9","@stdlib/ndarray/base/buffer-dtype-enum":"0iA","@stdlib/ndarray-base-buffer-dtype-enum":"0iB","@stdlib/ndarray/base/buffer-dtype":"0iC","@stdlib/ndarray-base-buffer-dtype":"0iD","@stdlib/ndarray/base/buffer":"0iE","@stdlib/ndarray-base-buffer":"0iF","@stdlib/ndarray/base/bytes-per-element":"0iG","@stdlib/ndarray-base-bytes-per-element":"0iH","@stdlib/ndarray/base/char2dtype":"0iI","@stdlib/ndarray-base-char2dtype":"0iJ","@stdlib/ndarray/base/clamp-index":"0iK","@stdlib/ndarray-base-clamp-index":"0iL","@stdlib/ndarray/base/ctor":"0iM","@stdlib/ndarray-base-ctor":"0iN","@stdlib/ndarray/base/dtype-char":"0iO","@stdlib/ndarray-base-dtype-char":"0iP","@stdlib/ndarray/base/dtype-desc":"0iQ","@stdlib/ndarray-base-dtype-desc":"0iR","@stdlib/ndarray/base/dtype-enum2str":"0iS","@stdlib/ndarray-base-dtype-enum2str":"0iT","@stdlib/ndarray/base/dtype-resolve-enum":"0iU","@stdlib/ndarray-base-dtype-resolve-enum":"0iV","@stdlib/ndarray/base/dtype-resolve-str":"0iW","@stdlib/ndarray-base-dtype-resolve-str":"0iX","@stdlib/ndarray/base/dtype-str2enum":"0iY","@stdlib/ndarray-base-dtype-str2enum":"0iZ","@stdlib/ndarray/base/dtype2c":"0ia","@stdlib/ndarray-base-dtype2c":"0ib","@stdlib/ndarray/base/dtypes2signatures":"0ic","@stdlib/ndarray-base-dtypes2signatures":"0id","@stdlib/ndarray/base/expand-dimensions":"0ie","@stdlib/ndarray-base-expand-dimensions":"0if","@stdlib/ndarray/base/from-scalar":"0ig","@stdlib/ndarray-base-from-scalar":"0ih","@stdlib/ndarray/base/function-object":"0ii","@stdlib/ndarray-base-function-object":"0ij","@stdlib/ndarray/base/ind":"0ik","@stdlib/ndarray-base-ind":"0il","@stdlib/ndarray/base/ind2sub":"0im","@stdlib/ndarray-base-ind2sub":"0in","@stdlib/ndarray/base/iteration-order":"0io","@stdlib/ndarray-base-iteration-order":"0ip","@stdlib/ndarray/base/max-view-buffer-index":"0iq","@stdlib/ndarray-base-max-view-buffer-index":"0ir","@stdlib/ndarray/base/maybe-broadcast-array":"0is","@stdlib/ndarray-base-maybe-broadcast-array":"0it","@stdlib/ndarray/base/meta-data-props":"0iu","@stdlib/ndarray-base-meta-data-props":"0iv","@stdlib/ndarray/base/min-view-buffer-index":"0iw","@stdlib/ndarray-base-min-view-buffer-index":"0ix","@stdlib/ndarray/base/minmax-view-buffer-index":"0iy","@stdlib/ndarray-base-minmax-view-buffer-index":"0iz","@stdlib/ndarray/base/napi/addon-arguments":"0j0","@stdlib/ndarray-base-napi-addon-arguments":"0j1","@stdlib/ndarray/base/napi/dtype-string-to-dtype":"0j2","@stdlib/ndarray-base-napi-dtype-string-to-dtype":"0j3","@stdlib/ndarray/base/napi":"0j4","@stdlib/ndarray-base-napi":"0j5","@stdlib/ndarray/base/napi/typedarray-type-to-dtype":"0j6","@stdlib/ndarray-base-napi-typedarray-type-to-dtype":"0j7","@stdlib/ndarray/base/napi/unary":"0j8","@stdlib/ndarray-base-napi-unary":"0j9","@stdlib/ndarray/base/ndarraylike2object":"0jA","@stdlib/ndarray-base-ndarraylike2object":"0jB","@stdlib/ndarray/base/nonsingleton-dimensions":"0jC","@stdlib/ndarray-base-nonsingleton-dimensions":"0jD","@stdlib/ndarray/base/numel":"0jE","@stdlib/ndarray-base-numel":"0jF","@stdlib/ndarray/base":"0jG","@stdlib/ndarray-base":"0jH","@stdlib/ndarray/base/prepend-singleton-dimensions":"0jI","@stdlib/ndarray-base-prepend-singleton-dimensions":"0jJ","@stdlib/ndarray/base/remove-singleton-dimensions":"0jK","@stdlib/ndarray-base-remove-singleton-dimensions":"0jL","@stdlib/ndarray/base/serialize-meta-data":"0jM","@stdlib/ndarray-base-serialize-meta-data":"0jN","@stdlib/ndarray/base/shape2strides":"0jO","@stdlib/ndarray-base-shape2strides":"0jP","@stdlib/ndarray/base/singleton-dimensions":"0jQ","@stdlib/ndarray-base-singleton-dimensions":"0jR","@stdlib/ndarray/base/strides2offset":"0jS","@stdlib/ndarray-base-strides2offset":"0jT","@stdlib/ndarray/base/strides2order":"0jU","@stdlib/ndarray-base-strides2order":"0jV","@stdlib/ndarray/base/sub2ind":"0jW","@stdlib/ndarray-base-sub2ind":"0jX","@stdlib/ndarray/base/to-array":"0jY","@stdlib/ndarray-base-to-array":"0jZ","@stdlib/ndarray/base/transpose":"0ja","@stdlib/ndarray-base-transpose":"0jb","@stdlib/ndarray/base/unary":"0jc","@stdlib/ndarray-base-unary":"0jd","@stdlib/ndarray/base/vind2bind":"0je","@stdlib/ndarray-base-vind2bind":"0jf","@stdlib/ndarray/base/wrap-index":"0jg","@stdlib/ndarray-base-wrap-index":"0jh","@stdlib/ndarray/base/zeros-like":"0ji","@stdlib/ndarray-base-zeros-like":"0jj","@stdlib/ndarray/base/zeros":"0jk","@stdlib/ndarray-base-zeros":"0jl","@stdlib/ndarray/casting-modes":"0jm","@stdlib/ndarray-casting-modes":"0jn","@stdlib/ndarray/ctor":"0jo","@stdlib/ndarray-ctor":"0jp","@stdlib/ndarray/dispatch":"0jq","@stdlib/ndarray-dispatch":"0jr","@stdlib/ndarray/dtypes":"0js","@stdlib/ndarray-dtypes":"0jt","@stdlib/ndarray/from-scalar":"0ju","@stdlib/ndarray-from-scalar":"0jv","@stdlib/ndarray/ind2sub":"0jw","@stdlib/ndarray-ind2sub":"0jx","@stdlib/ndarray/index-modes":"0jy","@stdlib/ndarray-index-modes":"0jz","@stdlib/ndarray/min-dtype":"0k0","@stdlib/ndarray-min-dtype":"0k1","@stdlib/ndarray/next-dtype":"0k2","@stdlib/ndarray-next-dtype":"0k3","@stdlib/ndarray/orders":"0k4","@stdlib/ndarray-orders":"0k5","@stdlib/ndarray":"0k7","@stdlib/ndarray/promotion-rules":"0k8","@stdlib/ndarray-promotion-rules":"0k9","@stdlib/ndarray/safe-casts":"0kA","@stdlib/ndarray-safe-casts":"0kB","@stdlib/ndarray/same-kind-casts":"0kC","@stdlib/ndarray-same-kind-casts":"0kD","@stdlib/ndarray/sub2ind":"0kE","@stdlib/ndarray-sub2ind":"0kF","@stdlib/ndarray/zeros-like":"0kG","@stdlib/ndarray-zeros-like":"0kH","@stdlib/ndarray/zeros":"0kI","@stdlib/ndarray-zeros":"0kJ","@stdlib/net/disposable-http-server":"0kK","@stdlib/net-disposable-http-server":"0kL","@stdlib/net/http-server":"0kM","@stdlib/net-http-server":"0kN","@stdlib/net":"0kP","@stdlib/net/simple-http-server":"0kQ","@stdlib/net-simple-http-server":"0kR","@stdlib/nlp/expand-contractions":"0kS","@stdlib/nlp-expand-contractions":"0kT","@stdlib/nlp/lda":"0kU","@stdlib/nlp-lda":"0kV","@stdlib/nlp/ordinalize":"0kW","@stdlib/nlp-ordinalize":"0kX","@stdlib/nlp":"0kZ","@stdlib/nlp/porter-stemmer":"0ka","@stdlib/nlp-porter-stemmer":"0kb","@stdlib/nlp/tokenize":"0kc","@stdlib/nlp-tokenize":"0kd","@stdlib/number/ctor":"0ke","@stdlib/number-ctor":"0kf","@stdlib/number/float32/base/exponent":"0kg","@stdlib/number-float32-base-exponent":"0kh","@stdlib/number/float32/base/from-binary-string":"0ki","@stdlib/number-float32-base-from-binary-string":"0kj","@stdlib/number/float32/base/from-word":"0kk","@stdlib/number-float32-base-from-word":"0kl","@stdlib/number/float32/base/normalize":"0km","@stdlib/number-float32-base-normalize":"0kn","@stdlib/number/float32/base":"0ko","@stdlib/number-float32-base":"0kp","@stdlib/number/float32/base/signbit":"0kq","@stdlib/number-float32-base-signbit":"0kr","@stdlib/number/float32/base/significand":"0ks","@stdlib/number-float32-base-significand":"0kt","@stdlib/number/float32/base/to-binary-string":"0ku","@stdlib/number-float32-base-to-binary-string":"0kv","@stdlib/number/float32/base/to-int32":"0kw","@stdlib/number-float32-base-to-int32":"0kx","@stdlib/number/float32/base/to-uint32":"0ky","@stdlib/number-float32-base-to-uint32":"0kz","@stdlib/number/float32/base/to-word":"0l0","@stdlib/number-float32-base-to-word":"0l1","@stdlib/number/float32":"0l2","@stdlib/number-float32":"0l3","@stdlib/number/float64/base/exponent":"0l4","@stdlib/number-float64-base-exponent":"0l5","@stdlib/number/float64/base/from-binary-string":"0l6","@stdlib/number-float64-base-from-binary-string":"0l7","@stdlib/number/float64/base/from-int64-bytes":"0l8","@stdlib/number-float64-base-from-int64-bytes":"0l9","@stdlib/number/float64/base/from-words":"0lA","@stdlib/number-float64-base-from-words":"0lB","@stdlib/number/float64/base/get-high-word":"0lC","@stdlib/number-float64-base-get-high-word":"0lD","@stdlib/number/float64/base/get-low-word":"0lE","@stdlib/number-float64-base-get-low-word":"0lF","@stdlib/number/float64/base/normalize":"0lG","@stdlib/number-float64-base-normalize":"0lH","@stdlib/number/float64/base":"0lI","@stdlib/number-float64-base":"0lJ","@stdlib/number/float64/base/set-high-word":"0lK","@stdlib/number-float64-base-set-high-word":"0lL","@stdlib/number/float64/base/set-low-word":"0lM","@stdlib/number-float64-base-set-low-word":"0lN","@stdlib/number/float64/base/signbit":"0lO","@stdlib/number-float64-base-signbit":"0lP","@stdlib/number/float64/base/to-binary-string":"0lQ","@stdlib/number-float64-base-to-binary-string":"0lR","@stdlib/number/float64/base/to-float32":"0lS","@stdlib/number-float64-base-to-float32":"0lT","@stdlib/number/float64/base/to-int32":"0lU","@stdlib/number-float64-base-to-int32":"0lV","@stdlib/number/float64/base/to-int64-bytes":"0lW","@stdlib/number-float64-base-to-int64-bytes":"0lX","@stdlib/number/float64/base/to-uint32":"0lY","@stdlib/number-float64-base-to-uint32":"0lZ","@stdlib/number/float64/base/to-words":"0la","@stdlib/number-float64-base-to-words":"0lb","@stdlib/number/float64":"0lc","@stdlib/number-float64":"0ld","@stdlib/number/int32/base":"0le","@stdlib/number-int32-base":"0lf","@stdlib/number/int32/base/to-uint32":"0lg","@stdlib/number-int32-base-to-uint32":"0lh","@stdlib/number/int32":"0li","@stdlib/number-int32":"0lj","@stdlib/number":"0ll","@stdlib/number/uint16/base/from-binary-string":"0lm","@stdlib/number-uint16-base-from-binary-string":"0ln","@stdlib/number/uint16/base":"0lo","@stdlib/number-uint16-base":"0lp","@stdlib/number/uint16/base/to-binary-string":"0lq","@stdlib/number-uint16-base-to-binary-string":"0lr","@stdlib/number/uint16":"0ls","@stdlib/number-uint16":"0lt","@stdlib/number/uint32/base/from-binary-string":"0lu","@stdlib/number-uint32-base-from-binary-string":"0lv","@stdlib/number/uint32/base":"0lw","@stdlib/number-uint32-base":"0lx","@stdlib/number/uint32/base/rotl":"0ly","@stdlib/number-uint32-base-rotl":"0lz","@stdlib/number/uint32/base/rotr":"0m0","@stdlib/number-uint32-base-rotr":"0m1","@stdlib/number/uint32/base/to-binary-string":"0m2","@stdlib/number-uint32-base-to-binary-string":"0m3","@stdlib/number/uint32/base/to-int32":"0m4","@stdlib/number-uint32-base-to-int32":"0m5","@stdlib/number/uint32":"0m6","@stdlib/number-uint32":"0m7","@stdlib/number/uint8/base/from-binary-string":"0m8","@stdlib/number-uint8-base-from-binary-string":"0m9","@stdlib/number/uint8/base":"0mA","@stdlib/number-uint8-base":"0mB","@stdlib/number/uint8/base/to-binary-string":"0mC","@stdlib/number-uint8-base-to-binary-string":"0mD","@stdlib/number/uint8":"0mE","@stdlib/number-uint8":"0mF","@stdlib/os/arch":"0mG","@stdlib/os-arch":"0mH","@stdlib/os/byte-order":"0mI","@stdlib/os-byte-order":"0mJ","@stdlib/os/configdir":"0mK","@stdlib/os-configdir":"0mL","@stdlib/os/float-word-order":"0mM","@stdlib/os-float-word-order":"0mN","@stdlib/os/homedir":"0mO","@stdlib/os-homedir":"0mP","@stdlib/os/num-cpus":"0mQ","@stdlib/os-num-cpus":"0mR","@stdlib/os":"0mT","@stdlib/os/platform":"0mU","@stdlib/os-platform":"0mV","@stdlib/os/tmpdir":"0mW","@stdlib/os-tmpdir":"0mX","@stdlib/plot/base/ctor":"0mY","@stdlib/plot-base-ctor":"0mZ","@stdlib/plot/components/svg/annotations":"0ma","@stdlib/plot-components-svg-annotations":"0mb","@stdlib/plot/components/svg/axis":"0mc","@stdlib/plot-components-svg-axis":"0md","@stdlib/plot/components/svg/background":"0me","@stdlib/plot-components-svg-background":"0mf","@stdlib/plot/components/svg/canvas":"0mg","@stdlib/plot-components-svg-canvas":"0mh","@stdlib/plot/components/svg/clip-path":"0mi","@stdlib/plot-components-svg-clip-path":"0mj","@stdlib/plot/components/svg/defs":"0mk","@stdlib/plot-components-svg-defs":"0ml","@stdlib/plot/components/svg/graph":"0mm","@stdlib/plot-components-svg-graph":"0mn","@stdlib/plot/components/svg/marks":"0mo","@stdlib/plot-components-svg-marks":"0mp","@stdlib/plot/components/svg/path":"0mq","@stdlib/plot-components-svg-path":"0mr","@stdlib/plot/components/svg/rug":"0ms","@stdlib/plot-components-svg-rug":"0mt","@stdlib/plot/components/svg/symbols":"0mu","@stdlib/plot-components-svg-symbols":"0mv","@stdlib/plot/components/svg/title":"0mw","@stdlib/plot-components-svg-title":"0mx","@stdlib/plot/ctor":"0my","@stdlib/plot-ctor":"0mz","@stdlib/plot":"0n1","@stdlib/plot/sparklines/base/ctor":"0n2","@stdlib/plot-sparklines-base-ctor":"0n3","@stdlib/plot/sparklines/base":"0n4","@stdlib/plot-sparklines-base":"0n5","@stdlib/plot/sparklines":"0n6","@stdlib/plot-sparklines":"0n7","@stdlib/plot/sparklines/unicode/column":"0n8","@stdlib/plot-sparklines-unicode-column":"0n9","@stdlib/plot/sparklines/unicode/line":"0nA","@stdlib/plot-sparklines-unicode-line":"0nB","@stdlib/plot/sparklines/unicode":"0nC","@stdlib/plot-sparklines-unicode":"0nD","@stdlib/plot/sparklines/unicode/tristate":"0nE","@stdlib/plot-sparklines-unicode-tristate":"0nF","@stdlib/plot/sparklines/unicode/up-down":"0nG","@stdlib/plot-sparklines-unicode-up-down":"0nH","@stdlib/plot/sparklines/unicode/win-loss":"0nI","@stdlib/plot-sparklines-unicode-win-loss":"0nJ","@stdlib/plot/unicode/stemleaf":"0nK","@stdlib/plot-unicode-stemleaf":"0nL","@stdlib/process/argv":"0nM","@stdlib/process-argv":"0nN","@stdlib/process/chdir":"0nO","@stdlib/process-chdir":"0nP","@stdlib/process/cwd":"0nQ","@stdlib/process-cwd":"0nR","@stdlib/process/env":"0nS","@stdlib/process-env":"0nT","@stdlib/process/exec-path":"0nU","@stdlib/process-exec-path":"0nV","@stdlib/process/getegid":"0nW","@stdlib/process-getegid":"0nX","@stdlib/process/geteuid":"0nY","@stdlib/process-geteuid":"0nZ","@stdlib/process/getgid":"0na","@stdlib/process-getgid":"0nb","@stdlib/process/getuid":"0nc","@stdlib/process-getuid":"0nd","@stdlib/process/node-version":"0ne","@stdlib/process-node-version":"0nf","@stdlib/process":"0nh","@stdlib/process/read-stdin":"0ni","@stdlib/process-read-stdin":"0nj","@stdlib/process/umask":"0nk","@stdlib/process-umask":"0nl","@stdlib/proxy/ctor":"0nm","@stdlib/proxy-ctor":"0nn","@stdlib/proxy":"0np","@stdlib/random/base/arcsine":"0nq","@stdlib/random-base-arcsine":"0nr","@stdlib/random/base/bernoulli":"0ns","@stdlib/random-base-bernoulli":"0nt","@stdlib/random/base/beta":"0nu","@stdlib/random-base-beta":"0nv","@stdlib/random/base/betaprime":"0nw","@stdlib/random-base-betaprime":"0nx","@stdlib/random/base/binomial":"0ny","@stdlib/random-base-binomial":"0nz","@stdlib/random/base/box-muller":"0o0","@stdlib/random-base-box-muller":"0o1","@stdlib/random/base/cauchy":"0o2","@stdlib/random-base-cauchy":"0o3","@stdlib/random/base/chi":"0o4","@stdlib/random-base-chi":"0o5","@stdlib/random/base/chisquare":"0o6","@stdlib/random-base-chisquare":"0o7","@stdlib/random/base/cosine":"0o8","@stdlib/random-base-cosine":"0o9","@stdlib/random/base/discrete-uniform":"0oA","@stdlib/random-base-discrete-uniform":"0oB","@stdlib/random/base/erlang":"0oC","@stdlib/random-base-erlang":"0oD","@stdlib/random/base/exponential":"0oE","@stdlib/random-base-exponential":"0oF","@stdlib/random/base/f":"0oG","@stdlib/random-base-f":"0oH","@stdlib/random/base/frechet":"0oI","@stdlib/random-base-frechet":"0oJ","@stdlib/random/base/gamma":"0oK","@stdlib/random-base-gamma":"0oL","@stdlib/random/base/geometric":"0oM","@stdlib/random-base-geometric":"0oN","@stdlib/random/base/gumbel":"0oO","@stdlib/random-base-gumbel":"0oP","@stdlib/random/base/hypergeometric":"0oQ","@stdlib/random-base-hypergeometric":"0oR","@stdlib/random/base/improved-ziggurat":"0oS","@stdlib/random-base-improved-ziggurat":"0oT","@stdlib/random/base/invgamma":"0oU","@stdlib/random-base-invgamma":"0oV","@stdlib/random/base/kumaraswamy":"0oW","@stdlib/random-base-kumaraswamy":"0oX","@stdlib/random/base/laplace":"0oY","@stdlib/random-base-laplace":"0oZ","@stdlib/random/base/levy":"0oa","@stdlib/random-base-levy":"0ob","@stdlib/random/base/logistic":"0oc","@stdlib/random-base-logistic":"0od","@stdlib/random/base/lognormal":"0oe","@stdlib/random-base-lognormal":"0of","@stdlib/random/base/minstd-shuffle":"0og","@stdlib/random-base-minstd-shuffle":"0oh","@stdlib/random/base/minstd":"0oi","@stdlib/random-base-minstd":"0oj","@stdlib/random/base/mt19937":"0ok","@stdlib/random-base-mt19937":"0ol","@stdlib/random/base/negative-binomial":"0om","@stdlib/random-base-negative-binomial":"0on","@stdlib/random/base/normal":"0oo","@stdlib/random-base-normal":"0op","@stdlib/random/base":"0oq","@stdlib/random-base":"0or","@stdlib/random/base/pareto-type1":"0os","@stdlib/random-base-pareto-type1":"0ot","@stdlib/random/base/poisson":"0ou","@stdlib/random-base-poisson":"0ov","@stdlib/random/base/randi":"0ow","@stdlib/random-base-randi":"0ox","@stdlib/random/base/randn":"0oy","@stdlib/random-base-randn":"0oz","@stdlib/random/base/randu":"0p0","@stdlib/random-base-randu":"0p1","@stdlib/random/base/rayleigh":"0p2","@stdlib/random-base-rayleigh":"0p3","@stdlib/random/base/reviver":"0p4","@stdlib/random-base-reviver":"0p5","@stdlib/random/base/t":"0p6","@stdlib/random-base-t":"0p7","@stdlib/random/base/triangular":"0p8","@stdlib/random-base-triangular":"0p9","@stdlib/random/base/uniform":"0pA","@stdlib/random-base-uniform":"0pB","@stdlib/random/base/weibull":"0pC","@stdlib/random-base-weibull":"0pD","@stdlib/random/iter/arcsine":"0pE","@stdlib/random-iter-arcsine":"0pF","@stdlib/random/iter/bernoulli":"0pG","@stdlib/random-iter-bernoulli":"0pH","@stdlib/random/iter/beta":"0pI","@stdlib/random-iter-beta":"0pJ","@stdlib/random/iter/betaprime":"0pK","@stdlib/random-iter-betaprime":"0pL","@stdlib/random/iter/binomial":"0pM","@stdlib/random-iter-binomial":"0pN","@stdlib/random/iter/box-muller":"0pO","@stdlib/random-iter-box-muller":"0pP","@stdlib/random/iter/cauchy":"0pQ","@stdlib/random-iter-cauchy":"0pR","@stdlib/random/iter/chi":"0pS","@stdlib/random-iter-chi":"0pT","@stdlib/random/iter/chisquare":"0pU","@stdlib/random-iter-chisquare":"0pV","@stdlib/random/iter/cosine":"0pW","@stdlib/random-iter-cosine":"0pX","@stdlib/random/iter/discrete-uniform":"0pY","@stdlib/random-iter-discrete-uniform":"0pZ","@stdlib/random/iter/erlang":"0pa","@stdlib/random-iter-erlang":"0pb","@stdlib/random/iter/exponential":"0pc","@stdlib/random-iter-exponential":"0pd","@stdlib/random/iter/f":"0pe","@stdlib/random-iter-f":"0pf","@stdlib/random/iter/frechet":"0pg","@stdlib/random-iter-frechet":"0ph","@stdlib/random/iter/gamma":"0pi","@stdlib/random-iter-gamma":"0pj","@stdlib/random/iter/geometric":"0pk","@stdlib/random-iter-geometric":"0pl","@stdlib/random/iter/gumbel":"0pm","@stdlib/random-iter-gumbel":"0pn","@stdlib/random/iter/hypergeometric":"0po","@stdlib/random-iter-hypergeometric":"0pp","@stdlib/random/iter/improved-ziggurat":"0pq","@stdlib/random-iter-improved-ziggurat":"0pr","@stdlib/random/iter/invgamma":"0ps","@stdlib/random-iter-invgamma":"0pt","@stdlib/random/iter/kumaraswamy":"0pu","@stdlib/random-iter-kumaraswamy":"0pv","@stdlib/random/iter/laplace":"0pw","@stdlib/random-iter-laplace":"0px","@stdlib/random/iter/levy":"0py","@stdlib/random-iter-levy":"0pz","@stdlib/random/iter/logistic":"0q0","@stdlib/random-iter-logistic":"0q1","@stdlib/random/iter/lognormal":"0q2","@stdlib/random-iter-lognormal":"0q3","@stdlib/random/iter/minstd-shuffle":"0q4","@stdlib/random-iter-minstd-shuffle":"0q5","@stdlib/random/iter/minstd":"0q6","@stdlib/random-iter-minstd":"0q7","@stdlib/random/iter/mt19937":"0q8","@stdlib/random-iter-mt19937":"0q9","@stdlib/random/iter/negative-binomial":"0qA","@stdlib/random-iter-negative-binomial":"0qB","@stdlib/random/iter/normal":"0qC","@stdlib/random-iter-normal":"0qD","@stdlib/random/iter":"0qE","@stdlib/random-iter":"0qF","@stdlib/random/iter/pareto-type1":"0qG","@stdlib/random-iter-pareto-type1":"0qH","@stdlib/random/iter/poisson":"0qI","@stdlib/random-iter-poisson":"0qJ","@stdlib/random/iter/randi":"0qK","@stdlib/random-iter-randi":"0qL","@stdlib/random/iter/randn":"0qM","@stdlib/random-iter-randn":"0qN","@stdlib/random/iter/randu":"0qO","@stdlib/random-iter-randu":"0qP","@stdlib/random/iter/rayleigh":"0qQ","@stdlib/random-iter-rayleigh":"0qR","@stdlib/random/iter/t":"0qS","@stdlib/random-iter-t":"0qT","@stdlib/random/iter/triangular":"0qU","@stdlib/random-iter-triangular":"0qV","@stdlib/random/iter/uniform":"0qW","@stdlib/random-iter-uniform":"0qX","@stdlib/random/iter/weibull":"0qY","@stdlib/random-iter-weibull":"0qZ","@stdlib/random":"0qb","@stdlib/random/sample":"0qc","@stdlib/random-sample":"0qd","@stdlib/random/shuffle":"0qe","@stdlib/random-shuffle":"0qf","@stdlib/random/streams/arcsine":"0qg","@stdlib/random-streams-arcsine":"0qh","@stdlib/random/streams/bernoulli":"0qi","@stdlib/random-streams-bernoulli":"0qj","@stdlib/random/streams/beta":"0qk","@stdlib/random-streams-beta":"0ql","@stdlib/random/streams/betaprime":"0qm","@stdlib/random-streams-betaprime":"0qn","@stdlib/random/streams/binomial":"0qo","@stdlib/random-streams-binomial":"0qp","@stdlib/random/streams/box-muller":"0qq","@stdlib/random-streams-box-muller":"0qr","@stdlib/random/streams/cauchy":"0qs","@stdlib/random-streams-cauchy":"0qt","@stdlib/random/streams/chi":"0qu","@stdlib/random-streams-chi":"0qv","@stdlib/random/streams/chisquare":"0qw","@stdlib/random-streams-chisquare":"0qx","@stdlib/random/streams/cosine":"0qy","@stdlib/random-streams-cosine":"0qz","@stdlib/random/streams/discrete-uniform":"0r0","@stdlib/random-streams-discrete-uniform":"0r1","@stdlib/random/streams/erlang":"0r2","@stdlib/random-streams-erlang":"0r3","@stdlib/random/streams/exponential":"0r4","@stdlib/random-streams-exponential":"0r5","@stdlib/random/streams/f":"0r6","@stdlib/random-streams-f":"0r7","@stdlib/random/streams/frechet":"0r8","@stdlib/random-streams-frechet":"0r9","@stdlib/random/streams/gamma":"0rA","@stdlib/random-streams-gamma":"0rB","@stdlib/random/streams/geometric":"0rC","@stdlib/random-streams-geometric":"0rD","@stdlib/random/streams/gumbel":"0rE","@stdlib/random-streams-gumbel":"0rF","@stdlib/random/streams/hypergeometric":"0rG","@stdlib/random-streams-hypergeometric":"0rH","@stdlib/random/streams/improved-ziggurat":"0rI","@stdlib/random-streams-improved-ziggurat":"0rJ","@stdlib/random/streams/invgamma":"0rK","@stdlib/random-streams-invgamma":"0rL","@stdlib/random/streams/kumaraswamy":"0rM","@stdlib/random-streams-kumaraswamy":"0rN","@stdlib/random/streams/laplace":"0rO","@stdlib/random-streams-laplace":"0rP","@stdlib/random/streams/levy":"0rQ","@stdlib/random-streams-levy":"0rR","@stdlib/random/streams/logistic":"0rS","@stdlib/random-streams-logistic":"0rT","@stdlib/random/streams/lognormal":"0rU","@stdlib/random-streams-lognormal":"0rV","@stdlib/random/streams/minstd-shuffle":"0rW","@stdlib/random-streams-minstd-shuffle":"0rX","@stdlib/random/streams/minstd":"0rY","@stdlib/random-streams-minstd":"0rZ","@stdlib/random/streams/mt19937":"0ra","@stdlib/random-streams-mt19937":"0rb","@stdlib/random/streams/negative-binomial":"0rc","@stdlib/random-streams-negative-binomial":"0rd","@stdlib/random/streams/normal":"0re","@stdlib/random-streams-normal":"0rf","@stdlib/random/streams":"0rg","@stdlib/random-streams":"0rh","@stdlib/random/streams/pareto-type1":"0ri","@stdlib/random-streams-pareto-type1":"0rj","@stdlib/random/streams/poisson":"0rk","@stdlib/random-streams-poisson":"0rl","@stdlib/random/streams/randi":"0rm","@stdlib/random-streams-randi":"0rn","@stdlib/random/streams/randn":"0ro","@stdlib/random-streams-randn":"0rp","@stdlib/random/streams/randu":"0rq","@stdlib/random-streams-randu":"0rr","@stdlib/random/streams/rayleigh":"0rs","@stdlib/random-streams-rayleigh":"0rt","@stdlib/random/streams/t":"0ru","@stdlib/random-streams-t":"0rv","@stdlib/random/streams/triangular":"0rw","@stdlib/random-streams-triangular":"0rx","@stdlib/random/streams/uniform":"0ry","@stdlib/random-streams-uniform":"0rz","@stdlib/random/streams/weibull":"0s0","@stdlib/random-streams-weibull":"0s1","@stdlib/regexp/basename-posix":"0s2","@stdlib/regexp-basename-posix":"0s3","@stdlib/regexp/basename-windows":"0s4","@stdlib/regexp-basename-windows":"0s5","@stdlib/regexp/basename":"0s6","@stdlib/regexp-basename":"0s7","@stdlib/regexp/color-hexadecimal":"0s8","@stdlib/regexp-color-hexadecimal":"0s9","@stdlib/regexp/decimal-number":"0sA","@stdlib/regexp-decimal-number":"0sB","@stdlib/regexp/dirname-posix":"0sC","@stdlib/regexp-dirname-posix":"0sD","@stdlib/regexp/dirname-windows":"0sE","@stdlib/regexp-dirname-windows":"0sF","@stdlib/regexp/dirname":"0sG","@stdlib/regexp-dirname":"0sH","@stdlib/regexp/eol":"0sI","@stdlib/regexp-eol":"0sJ","@stdlib/regexp/extended-length-path":"0sK","@stdlib/regexp-extended-length-path":"0sL","@stdlib/regexp/extname-posix":"0sM","@stdlib/regexp-extname-posix":"0sN","@stdlib/regexp/extname-windows":"0sO","@stdlib/regexp-extname-windows":"0sP","@stdlib/regexp/extname":"0sQ","@stdlib/regexp-extname":"0sR","@stdlib/regexp/filename-posix":"0sS","@stdlib/regexp-filename-posix":"0sT","@stdlib/regexp/filename-windows":"0sU","@stdlib/regexp-filename-windows":"0sV","@stdlib/regexp/filename":"0sW","@stdlib/regexp-filename":"0sX","@stdlib/regexp/function-name":"0sY","@stdlib/regexp-function-name":"0sZ","@stdlib/regexp/native-function":"0sa","@stdlib/regexp-native-function":"0sb","@stdlib/regexp":"0sd","@stdlib/regexp/regexp":"0se","@stdlib/regexp-regexp":"0sf","@stdlib/regexp/unc-path":"0sg","@stdlib/regexp-unc-path":"0sh","@stdlib/regexp/utf16-surrogate-pair":"0si","@stdlib/regexp-utf16-surrogate-pair":"0sj","@stdlib/regexp/utf16-unpaired-surrogate":"0sk","@stdlib/regexp-utf16-unpaired-surrogate":"0sl","@stdlib/regexp/whitespace":"0sm","@stdlib/regexp-whitespace":"0sn","@stdlib/repl/code-blocks":"0so","@stdlib/repl-code-blocks":"0sp","@stdlib/repl/help":"0sq","@stdlib/repl-help":"0sr","@stdlib/repl/info":"0ss","@stdlib/repl-info":"0st","@stdlib/repl":"0sv","@stdlib/repl/presentation":"0sw","@stdlib/repl-presentation":"0sx","@stdlib/repl/server":"0sy","@stdlib/repl-server":"0sz","@stdlib/repl/signature":"0t0","@stdlib/repl-signature":"0t1","@stdlib/repl/typed-signature":"0t2","@stdlib/repl-typed-signature":"0t3","@stdlib/simulate/iter/awgn":"0t4","@stdlib/simulate-iter-awgn":"0t5","@stdlib/simulate/iter/awln":"0t6","@stdlib/simulate-iter-awln":"0t7","@stdlib/simulate/iter/awun":"0t8","@stdlib/simulate-iter-awun":"0t9","@stdlib/simulate/iter/bartlett-hann-pulse":"0tA","@stdlib/simulate-iter-bartlett-hann-pulse":"0tB","@stdlib/simulate/iter/bartlett-pulse":"0tC","@stdlib/simulate-iter-bartlett-pulse":"0tD","@stdlib/simulate/iter/cosine-wave":"0tE","@stdlib/simulate-iter-cosine-wave":"0tF","@stdlib/simulate/iter/dirac-comb":"0tG","@stdlib/simulate-iter-dirac-comb":"0tH","@stdlib/simulate/iter/flat-top-pulse":"0tI","@stdlib/simulate-iter-flat-top-pulse":"0tJ","@stdlib/simulate/iter/hann-pulse":"0tK","@stdlib/simulate-iter-hann-pulse":"0tL","@stdlib/simulate/iter/lanczos-pulse":"0tM","@stdlib/simulate-iter-lanczos-pulse":"0tN","@stdlib/simulate/iter":"0tO","@stdlib/simulate-iter":"0tP","@stdlib/simulate/iter/periodic-sinc":"0tQ","@stdlib/simulate-iter-periodic-sinc":"0tR","@stdlib/simulate/iter/pulse":"0tS","@stdlib/simulate-iter-pulse":"0tT","@stdlib/simulate/iter/sawtooth-wave":"0tU","@stdlib/simulate-iter-sawtooth-wave":"0tV","@stdlib/simulate/iter/sine-wave":"0tW","@stdlib/simulate-iter-sine-wave":"0tX","@stdlib/simulate/iter/square-wave":"0tY","@stdlib/simulate-iter-square-wave":"0tZ","@stdlib/simulate/iter/triangle-wave":"0ta","@stdlib/simulate-iter-triangle-wave":"0tb","@stdlib/simulate":"0td","@stdlib/stats/anova1":"0te","@stdlib/stats-anova1":"0tf","@stdlib/stats/bartlett-test":"0tg","@stdlib/stats-bartlett-test":"0th","@stdlib/stats/base/cumax":"0ti","@stdlib/stats-base-cumax":"0tj","@stdlib/stats/base/cumaxabs":"0tk","@stdlib/stats-base-cumaxabs":"0tl","@stdlib/stats/base/cumin":"0tm","@stdlib/stats-base-cumin":"0tn","@stdlib/stats/base/cuminabs":"0to","@stdlib/stats-base-cuminabs":"0tp","@stdlib/stats/base/dcumax":"0tq","@stdlib/stats-base-dcumax":"0tr","@stdlib/stats/base/dcumaxabs":"0ts","@stdlib/stats-base-dcumaxabs":"0tt","@stdlib/stats/base/dcumin":"0tu","@stdlib/stats-base-dcumin":"0tv","@stdlib/stats/base/dcuminabs":"0tw","@stdlib/stats-base-dcuminabs":"0tx","@stdlib/stats/base/dists/arcsine/cdf":"0ty","@stdlib/stats-base-dists-arcsine-cdf":"0tz","@stdlib/stats/base/dists/arcsine/ctor":"0u0","@stdlib/stats-base-dists-arcsine-ctor":"0u1","@stdlib/stats/base/dists/arcsine/entropy":"0u2","@stdlib/stats-base-dists-arcsine-entropy":"0u3","@stdlib/stats/base/dists/arcsine/kurtosis":"0u4","@stdlib/stats-base-dists-arcsine-kurtosis":"0u5","@stdlib/stats/base/dists/arcsine/logcdf":"0u6","@stdlib/stats-base-dists-arcsine-logcdf":"0u7","@stdlib/stats/base/dists/arcsine/logpdf":"0u8","@stdlib/stats-base-dists-arcsine-logpdf":"0u9","@stdlib/stats/base/dists/arcsine/mean":"0uA","@stdlib/stats-base-dists-arcsine-mean":"0uB","@stdlib/stats/base/dists/arcsine/median":"0uC","@stdlib/stats-base-dists-arcsine-median":"0uD","@stdlib/stats/base/dists/arcsine/mode":"0uE","@stdlib/stats-base-dists-arcsine-mode":"0uF","@stdlib/stats/base/dists/arcsine":"0uG","@stdlib/stats-base-dists-arcsine":"0uH","@stdlib/stats/base/dists/arcsine/pdf":"0uI","@stdlib/stats-base-dists-arcsine-pdf":"0uJ","@stdlib/stats/base/dists/arcsine/quantile":"0uK","@stdlib/stats-base-dists-arcsine-quantile":"0uL","@stdlib/stats/base/dists/arcsine/skewness":"0uM","@stdlib/stats-base-dists-arcsine-skewness":"0uN","@stdlib/stats/base/dists/arcsine/stdev":"0uO","@stdlib/stats-base-dists-arcsine-stdev":"0uP","@stdlib/stats/base/dists/arcsine/variance":"0uQ","@stdlib/stats-base-dists-arcsine-variance":"0uR","@stdlib/stats/base/dists/bernoulli/cdf":"0uS","@stdlib/stats-base-dists-bernoulli-cdf":"0uT","@stdlib/stats/base/dists/bernoulli/ctor":"0uU","@stdlib/stats-base-dists-bernoulli-ctor":"0uV","@stdlib/stats/base/dists/bernoulli/entropy":"0uW","@stdlib/stats-base-dists-bernoulli-entropy":"0uX","@stdlib/stats/base/dists/bernoulli/kurtosis":"0uY","@stdlib/stats-base-dists-bernoulli-kurtosis":"0uZ","@stdlib/stats/base/dists/bernoulli/mean":"0ua","@stdlib/stats-base-dists-bernoulli-mean":"0ub","@stdlib/stats/base/dists/bernoulli/median":"0uc","@stdlib/stats-base-dists-bernoulli-median":"0ud","@stdlib/stats/base/dists/bernoulli/mgf":"0ue","@stdlib/stats-base-dists-bernoulli-mgf":"0uf","@stdlib/stats/base/dists/bernoulli/mode":"0ug","@stdlib/stats-base-dists-bernoulli-mode":"0uh","@stdlib/stats/base/dists/bernoulli":"0ui","@stdlib/stats-base-dists-bernoulli":"0uj","@stdlib/stats/base/dists/bernoulli/pmf":"0uk","@stdlib/stats-base-dists-bernoulli-pmf":"0ul","@stdlib/stats/base/dists/bernoulli/quantile":"0um","@stdlib/stats-base-dists-bernoulli-quantile":"0un","@stdlib/stats/base/dists/bernoulli/skewness":"0uo","@stdlib/stats-base-dists-bernoulli-skewness":"0up","@stdlib/stats/base/dists/bernoulli/stdev":"0uq","@stdlib/stats-base-dists-bernoulli-stdev":"0ur","@stdlib/stats/base/dists/bernoulli/variance":"0us","@stdlib/stats-base-dists-bernoulli-variance":"0ut","@stdlib/stats/base/dists/beta/cdf":"0uu","@stdlib/stats-base-dists-beta-cdf":"0uv","@stdlib/stats/base/dists/beta/ctor":"0uw","@stdlib/stats-base-dists-beta-ctor":"0ux","@stdlib/stats/base/dists/beta/entropy":"0uy","@stdlib/stats-base-dists-beta-entropy":"0uz","@stdlib/stats/base/dists/beta/kurtosis":"0v0","@stdlib/stats-base-dists-beta-kurtosis":"0v1","@stdlib/stats/base/dists/beta/logcdf":"0v2","@stdlib/stats-base-dists-beta-logcdf":"0v3","@stdlib/stats/base/dists/beta/logpdf":"0v4","@stdlib/stats-base-dists-beta-logpdf":"0v5","@stdlib/stats/base/dists/beta/mean":"0v6","@stdlib/stats-base-dists-beta-mean":"0v7","@stdlib/stats/base/dists/beta/median":"0v8","@stdlib/stats-base-dists-beta-median":"0v9","@stdlib/stats/base/dists/beta/mgf":"0vA","@stdlib/stats-base-dists-beta-mgf":"0vB","@stdlib/stats/base/dists/beta/mode":"0vC","@stdlib/stats-base-dists-beta-mode":"0vD","@stdlib/stats/base/dists/beta":"0vE","@stdlib/stats-base-dists-beta":"0vF","@stdlib/stats/base/dists/beta/pdf":"0vG","@stdlib/stats-base-dists-beta-pdf":"0vH","@stdlib/stats/base/dists/beta/quantile":"0vI","@stdlib/stats-base-dists-beta-quantile":"0vJ","@stdlib/stats/base/dists/beta/skewness":"0vK","@stdlib/stats-base-dists-beta-skewness":"0vL","@stdlib/stats/base/dists/beta/stdev":"0vM","@stdlib/stats-base-dists-beta-stdev":"0vN","@stdlib/stats/base/dists/beta/variance":"0vO","@stdlib/stats-base-dists-beta-variance":"0vP","@stdlib/stats/base/dists/betaprime/cdf":"0vQ","@stdlib/stats-base-dists-betaprime-cdf":"0vR","@stdlib/stats/base/dists/betaprime/ctor":"0vS","@stdlib/stats-base-dists-betaprime-ctor":"0vT","@stdlib/stats/base/dists/betaprime/kurtosis":"0vU","@stdlib/stats-base-dists-betaprime-kurtosis":"0vV","@stdlib/stats/base/dists/betaprime/logcdf":"0vW","@stdlib/stats-base-dists-betaprime-logcdf":"0vX","@stdlib/stats/base/dists/betaprime/logpdf":"0vY","@stdlib/stats-base-dists-betaprime-logpdf":"0vZ","@stdlib/stats/base/dists/betaprime/mean":"0va","@stdlib/stats-base-dists-betaprime-mean":"0vb","@stdlib/stats/base/dists/betaprime/mode":"0vc","@stdlib/stats-base-dists-betaprime-mode":"0vd","@stdlib/stats/base/dists/betaprime":"0ve","@stdlib/stats-base-dists-betaprime":"0vf","@stdlib/stats/base/dists/betaprime/pdf":"0vg","@stdlib/stats-base-dists-betaprime-pdf":"0vh","@stdlib/stats/base/dists/betaprime/quantile":"0vi","@stdlib/stats-base-dists-betaprime-quantile":"0vj","@stdlib/stats/base/dists/betaprime/skewness":"0vk","@stdlib/stats-base-dists-betaprime-skewness":"0vl","@stdlib/stats/base/dists/betaprime/stdev":"0vm","@stdlib/stats-base-dists-betaprime-stdev":"0vn","@stdlib/stats/base/dists/betaprime/variance":"0vo","@stdlib/stats-base-dists-betaprime-variance":"0vp","@stdlib/stats/base/dists/binomial/cdf":"0vq","@stdlib/stats-base-dists-binomial-cdf":"0vr","@stdlib/stats/base/dists/binomial/ctor":"0vs","@stdlib/stats-base-dists-binomial-ctor":"0vt","@stdlib/stats/base/dists/binomial/entropy":"0vu","@stdlib/stats-base-dists-binomial-entropy":"0vv","@stdlib/stats/base/dists/binomial/kurtosis":"0vw","@stdlib/stats-base-dists-binomial-kurtosis":"0vx","@stdlib/stats/base/dists/binomial/logpmf":"0vy","@stdlib/stats-base-dists-binomial-logpmf":"0vz","@stdlib/stats/base/dists/binomial/mean":"0w0","@stdlib/stats-base-dists-binomial-mean":"0w1","@stdlib/stats/base/dists/binomial/median":"0w2","@stdlib/stats-base-dists-binomial-median":"0w3","@stdlib/stats/base/dists/binomial/mgf":"0w4","@stdlib/stats-base-dists-binomial-mgf":"0w5","@stdlib/stats/base/dists/binomial/mode":"0w6","@stdlib/stats-base-dists-binomial-mode":"0w7","@stdlib/stats/base/dists/binomial":"0w8","@stdlib/stats-base-dists-binomial":"0w9","@stdlib/stats/base/dists/binomial/pmf":"0wA","@stdlib/stats-base-dists-binomial-pmf":"0wB","@stdlib/stats/base/dists/binomial/quantile":"0wC","@stdlib/stats-base-dists-binomial-quantile":"0wD","@stdlib/stats/base/dists/binomial/skewness":"0wE","@stdlib/stats-base-dists-binomial-skewness":"0wF","@stdlib/stats/base/dists/binomial/stdev":"0wG","@stdlib/stats-base-dists-binomial-stdev":"0wH","@stdlib/stats/base/dists/binomial/variance":"0wI","@stdlib/stats-base-dists-binomial-variance":"0wJ","@stdlib/stats/base/dists/cauchy/cdf":"0wK","@stdlib/stats-base-dists-cauchy-cdf":"0wL","@stdlib/stats/base/dists/cauchy/ctor":"0wM","@stdlib/stats-base-dists-cauchy-ctor":"0wN","@stdlib/stats/base/dists/cauchy/entropy":"0wO","@stdlib/stats-base-dists-cauchy-entropy":"0wP","@stdlib/stats/base/dists/cauchy/logcdf":"0wQ","@stdlib/stats-base-dists-cauchy-logcdf":"0wR","@stdlib/stats/base/dists/cauchy/logpdf":"0wS","@stdlib/stats-base-dists-cauchy-logpdf":"0wT","@stdlib/stats/base/dists/cauchy/median":"0wU","@stdlib/stats-base-dists-cauchy-median":"0wV","@stdlib/stats/base/dists/cauchy/mode":"0wW","@stdlib/stats-base-dists-cauchy-mode":"0wX","@stdlib/stats/base/dists/cauchy":"0wY","@stdlib/stats-base-dists-cauchy":"0wZ","@stdlib/stats/base/dists/cauchy/pdf":"0wa","@stdlib/stats-base-dists-cauchy-pdf":"0wb","@stdlib/stats/base/dists/cauchy/quantile":"0wc","@stdlib/stats-base-dists-cauchy-quantile":"0wd","@stdlib/stats/base/dists/chi/cdf":"0we","@stdlib/stats-base-dists-chi-cdf":"0wf","@stdlib/stats/base/dists/chi/ctor":"0wg","@stdlib/stats-base-dists-chi-ctor":"0wh","@stdlib/stats/base/dists/chi/entropy":"0wi","@stdlib/stats-base-dists-chi-entropy":"0wj","@stdlib/stats/base/dists/chi/kurtosis":"0wk","@stdlib/stats-base-dists-chi-kurtosis":"0wl","@stdlib/stats/base/dists/chi/logpdf":"0wm","@stdlib/stats-base-dists-chi-logpdf":"0wn","@stdlib/stats/base/dists/chi/mean":"0wo","@stdlib/stats-base-dists-chi-mean":"0wp","@stdlib/stats/base/dists/chi/mode":"0wq","@stdlib/stats-base-dists-chi-mode":"0wr","@stdlib/stats/base/dists/chi":"0ws","@stdlib/stats-base-dists-chi":"0wt","@stdlib/stats/base/dists/chi/pdf":"0wu","@stdlib/stats-base-dists-chi-pdf":"0wv","@stdlib/stats/base/dists/chi/quantile":"0ww","@stdlib/stats-base-dists-chi-quantile":"0wx","@stdlib/stats/base/dists/chi/skewness":"0wy","@stdlib/stats-base-dists-chi-skewness":"0wz","@stdlib/stats/base/dists/chi/stdev":"0x0","@stdlib/stats-base-dists-chi-stdev":"0x1","@stdlib/stats/base/dists/chi/variance":"0x2","@stdlib/stats-base-dists-chi-variance":"0x3","@stdlib/stats/base/dists/chisquare/cdf":"0x4","@stdlib/stats-base-dists-chisquare-cdf":"0x5","@stdlib/stats/base/dists/chisquare/ctor":"0x6","@stdlib/stats-base-dists-chisquare-ctor":"0x7","@stdlib/stats/base/dists/chisquare/entropy":"0x8","@stdlib/stats-base-dists-chisquare-entropy":"0x9","@stdlib/stats/base/dists/chisquare/kurtosis":"0xA","@stdlib/stats-base-dists-chisquare-kurtosis":"0xB","@stdlib/stats/base/dists/chisquare/logpdf":"0xC","@stdlib/stats-base-dists-chisquare-logpdf":"0xD","@stdlib/stats/base/dists/chisquare/mean":"0xE","@stdlib/stats-base-dists-chisquare-mean":"0xF","@stdlib/stats/base/dists/chisquare/median":"0xG","@stdlib/stats-base-dists-chisquare-median":"0xH","@stdlib/stats/base/dists/chisquare/mgf":"0xI","@stdlib/stats-base-dists-chisquare-mgf":"0xJ","@stdlib/stats/base/dists/chisquare/mode":"0xK","@stdlib/stats-base-dists-chisquare-mode":"0xL","@stdlib/stats/base/dists/chisquare":"0xM","@stdlib/stats-base-dists-chisquare":"0xN","@stdlib/stats/base/dists/chisquare/pdf":"0xO","@stdlib/stats-base-dists-chisquare-pdf":"0xP","@stdlib/stats/base/dists/chisquare/quantile":"0xQ","@stdlib/stats-base-dists-chisquare-quantile":"0xR","@stdlib/stats/base/dists/chisquare/skewness":"0xS","@stdlib/stats-base-dists-chisquare-skewness":"0xT","@stdlib/stats/base/dists/chisquare/stdev":"0xU","@stdlib/stats-base-dists-chisquare-stdev":"0xV","@stdlib/stats/base/dists/chisquare/variance":"0xW","@stdlib/stats-base-dists-chisquare-variance":"0xX","@stdlib/stats/base/dists/cosine/cdf":"0xY","@stdlib/stats-base-dists-cosine-cdf":"0xZ","@stdlib/stats/base/dists/cosine/ctor":"0xa","@stdlib/stats-base-dists-cosine-ctor":"0xb","@stdlib/stats/base/dists/cosine/kurtosis":"0xc","@stdlib/stats-base-dists-cosine-kurtosis":"0xd","@stdlib/stats/base/dists/cosine/logcdf":"0xe","@stdlib/stats-base-dists-cosine-logcdf":"0xf","@stdlib/stats/base/dists/cosine/logpdf":"0xg","@stdlib/stats-base-dists-cosine-logpdf":"0xh","@stdlib/stats/base/dists/cosine/mean":"0xi","@stdlib/stats-base-dists-cosine-mean":"0xj","@stdlib/stats/base/dists/cosine/median":"0xk","@stdlib/stats-base-dists-cosine-median":"0xl","@stdlib/stats/base/dists/cosine/mgf":"0xm","@stdlib/stats-base-dists-cosine-mgf":"0xn","@stdlib/stats/base/dists/cosine/mode":"0xo","@stdlib/stats-base-dists-cosine-mode":"0xp","@stdlib/stats/base/dists/cosine":"0xq","@stdlib/stats-base-dists-cosine":"0xr","@stdlib/stats/base/dists/cosine/pdf":"0xs","@stdlib/stats-base-dists-cosine-pdf":"0xt","@stdlib/stats/base/dists/cosine/quantile":"0xu","@stdlib/stats-base-dists-cosine-quantile":"0xv","@stdlib/stats/base/dists/cosine/skewness":"0xw","@stdlib/stats-base-dists-cosine-skewness":"0xx","@stdlib/stats/base/dists/cosine/stdev":"0xy","@stdlib/stats-base-dists-cosine-stdev":"0xz","@stdlib/stats/base/dists/cosine/variance":"0y0","@stdlib/stats-base-dists-cosine-variance":"0y1","@stdlib/stats/base/dists/degenerate/cdf":"0y2","@stdlib/stats-base-dists-degenerate-cdf":"0y3","@stdlib/stats/base/dists/degenerate/ctor":"0y4","@stdlib/stats-base-dists-degenerate-ctor":"0y5","@stdlib/stats/base/dists/degenerate/entropy":"0y6","@stdlib/stats-base-dists-degenerate-entropy":"0y7","@stdlib/stats/base/dists/degenerate/logcdf":"0y8","@stdlib/stats-base-dists-degenerate-logcdf":"0y9","@stdlib/stats/base/dists/degenerate/logpdf":"0yA","@stdlib/stats-base-dists-degenerate-logpdf":"0yB","@stdlib/stats/base/dists/degenerate/logpmf":"0yC","@stdlib/stats-base-dists-degenerate-logpmf":"0yD","@stdlib/stats/base/dists/degenerate/mean":"0yE","@stdlib/stats-base-dists-degenerate-mean":"0yF","@stdlib/stats/base/dists/degenerate/median":"0yG","@stdlib/stats-base-dists-degenerate-median":"0yH","@stdlib/stats/base/dists/degenerate/mgf":"0yI","@stdlib/stats-base-dists-degenerate-mgf":"0yJ","@stdlib/stats/base/dists/degenerate/mode":"0yK","@stdlib/stats-base-dists-degenerate-mode":"0yL","@stdlib/stats/base/dists/degenerate":"0yM","@stdlib/stats-base-dists-degenerate":"0yN","@stdlib/stats/base/dists/degenerate/pdf":"0yO","@stdlib/stats-base-dists-degenerate-pdf":"0yP","@stdlib/stats/base/dists/degenerate/pmf":"0yQ","@stdlib/stats-base-dists-degenerate-pmf":"0yR","@stdlib/stats/base/dists/degenerate/quantile":"0yS","@stdlib/stats-base-dists-degenerate-quantile":"0yT","@stdlib/stats/base/dists/degenerate/stdev":"0yU","@stdlib/stats-base-dists-degenerate-stdev":"0yV","@stdlib/stats/base/dists/degenerate/variance":"0yW","@stdlib/stats-base-dists-degenerate-variance":"0yX","@stdlib/stats/base/dists/discrete-uniform/cdf":"0yY","@stdlib/stats-base-dists-discrete-uniform-cdf":"0yZ","@stdlib/stats/base/dists/discrete-uniform/ctor":"0ya","@stdlib/stats-base-dists-discrete-uniform-ctor":"0yb","@stdlib/stats/base/dists/discrete-uniform/entropy":"0yc","@stdlib/stats-base-dists-discrete-uniform-entropy":"0yd","@stdlib/stats/base/dists/discrete-uniform/kurtosis":"0ye","@stdlib/stats-base-dists-discrete-uniform-kurtosis":"0yf","@stdlib/stats/base/dists/discrete-uniform/logcdf":"0yg","@stdlib/stats-base-dists-discrete-uniform-logcdf":"0yh","@stdlib/stats/base/dists/discrete-uniform/logpmf":"0yi","@stdlib/stats-base-dists-discrete-uniform-logpmf":"0yj","@stdlib/stats/base/dists/discrete-uniform/mean":"0yk","@stdlib/stats-base-dists-discrete-uniform-mean":"0yl","@stdlib/stats/base/dists/discrete-uniform/median":"0ym","@stdlib/stats-base-dists-discrete-uniform-median":"0yn","@stdlib/stats/base/dists/discrete-uniform/mgf":"0yo","@stdlib/stats-base-dists-discrete-uniform-mgf":"0yp","@stdlib/stats/base/dists/discrete-uniform":"0yq","@stdlib/stats-base-dists-discrete-uniform":"0yr","@stdlib/stats/base/dists/discrete-uniform/pmf":"0ys","@stdlib/stats-base-dists-discrete-uniform-pmf":"0yt","@stdlib/stats/base/dists/discrete-uniform/quantile":"0yu","@stdlib/stats-base-dists-discrete-uniform-quantile":"0yv","@stdlib/stats/base/dists/discrete-uniform/skewness":"0yw","@stdlib/stats-base-dists-discrete-uniform-skewness":"0yx","@stdlib/stats/base/dists/discrete-uniform/stdev":"0yy","@stdlib/stats-base-dists-discrete-uniform-stdev":"0yz","@stdlib/stats/base/dists/discrete-uniform/variance":"0z0","@stdlib/stats-base-dists-discrete-uniform-variance":"0z1","@stdlib/stats/base/dists/erlang/cdf":"0z2","@stdlib/stats-base-dists-erlang-cdf":"0z3","@stdlib/stats/base/dists/erlang/ctor":"0z4","@stdlib/stats-base-dists-erlang-ctor":"0z5","@stdlib/stats/base/dists/erlang/entropy":"0z6","@stdlib/stats-base-dists-erlang-entropy":"0z7","@stdlib/stats/base/dists/erlang/kurtosis":"0z8","@stdlib/stats-base-dists-erlang-kurtosis":"0z9","@stdlib/stats/base/dists/erlang/logpdf":"0zA","@stdlib/stats-base-dists-erlang-logpdf":"0zB","@stdlib/stats/base/dists/erlang/mean":"0zC","@stdlib/stats-base-dists-erlang-mean":"0zD","@stdlib/stats/base/dists/erlang/mgf":"0zE","@stdlib/stats-base-dists-erlang-mgf":"0zF","@stdlib/stats/base/dists/erlang/mode":"0zG","@stdlib/stats-base-dists-erlang-mode":"0zH","@stdlib/stats/base/dists/erlang":"0zI","@stdlib/stats-base-dists-erlang":"0zJ","@stdlib/stats/base/dists/erlang/pdf":"0zK","@stdlib/stats-base-dists-erlang-pdf":"0zL","@stdlib/stats/base/dists/erlang/quantile":"0zM","@stdlib/stats-base-dists-erlang-quantile":"0zN","@stdlib/stats/base/dists/erlang/skewness":"0zO","@stdlib/stats-base-dists-erlang-skewness":"0zP","@stdlib/stats/base/dists/erlang/stdev":"0zQ","@stdlib/stats-base-dists-erlang-stdev":"0zR","@stdlib/stats/base/dists/erlang/variance":"0zS","@stdlib/stats-base-dists-erlang-variance":"0zT","@stdlib/stats/base/dists/exponential/cdf":"0zU","@stdlib/stats-base-dists-exponential-cdf":"0zV","@stdlib/stats/base/dists/exponential/ctor":"0zW","@stdlib/stats-base-dists-exponential-ctor":"0zX","@stdlib/stats/base/dists/exponential/entropy":"0zY","@stdlib/stats-base-dists-exponential-entropy":"0zZ","@stdlib/stats/base/dists/exponential/kurtosis":"0za","@stdlib/stats-base-dists-exponential-kurtosis":"0zb","@stdlib/stats/base/dists/exponential/logcdf":"0zc","@stdlib/stats-base-dists-exponential-logcdf":"0zd","@stdlib/stats/base/dists/exponential/logpdf":"0ze","@stdlib/stats-base-dists-exponential-logpdf":"0zf","@stdlib/stats/base/dists/exponential/mean":"0zg","@stdlib/stats-base-dists-exponential-mean":"0zh","@stdlib/stats/base/dists/exponential/median":"0zi","@stdlib/stats-base-dists-exponential-median":"0zj","@stdlib/stats/base/dists/exponential/mgf":"0zk","@stdlib/stats-base-dists-exponential-mgf":"0zl","@stdlib/stats/base/dists/exponential/mode":"0zm","@stdlib/stats-base-dists-exponential-mode":"0zn","@stdlib/stats/base/dists/exponential":"0zo","@stdlib/stats-base-dists-exponential":"0zp","@stdlib/stats/base/dists/exponential/pdf":"0zq","@stdlib/stats-base-dists-exponential-pdf":"0zr","@stdlib/stats/base/dists/exponential/quantile":"0zs","@stdlib/stats-base-dists-exponential-quantile":"0zt","@stdlib/stats/base/dists/exponential/skewness":"0zu","@stdlib/stats-base-dists-exponential-skewness":"0zv","@stdlib/stats/base/dists/exponential/stdev":"0zw","@stdlib/stats-base-dists-exponential-stdev":"0zx","@stdlib/stats/base/dists/exponential/variance":"0zy","@stdlib/stats-base-dists-exponential-variance":"0zz","@stdlib/stats/base/dists/f/cdf":"100","@stdlib/stats-base-dists-f-cdf":"101","@stdlib/stats/base/dists/f/ctor":"102","@stdlib/stats-base-dists-f-ctor":"103","@stdlib/stats/base/dists/f/entropy":"104","@stdlib/stats-base-dists-f-entropy":"105","@stdlib/stats/base/dists/f/kurtosis":"106","@stdlib/stats-base-dists-f-kurtosis":"107","@stdlib/stats/base/dists/f/mean":"108","@stdlib/stats-base-dists-f-mean":"109","@stdlib/stats/base/dists/f/mode":"10A","@stdlib/stats-base-dists-f-mode":"10B","@stdlib/stats/base/dists/f":"10C","@stdlib/stats-base-dists-f":"10D","@stdlib/stats/base/dists/f/pdf":"10E","@stdlib/stats-base-dists-f-pdf":"10F","@stdlib/stats/base/dists/f/quantile":"10G","@stdlib/stats-base-dists-f-quantile":"10H","@stdlib/stats/base/dists/f/skewness":"10I","@stdlib/stats-base-dists-f-skewness":"10J","@stdlib/stats/base/dists/f/stdev":"10K","@stdlib/stats-base-dists-f-stdev":"10L","@stdlib/stats/base/dists/f/variance":"10M","@stdlib/stats-base-dists-f-variance":"10N","@stdlib/stats/base/dists/frechet/cdf":"10O","@stdlib/stats-base-dists-frechet-cdf":"10P","@stdlib/stats/base/dists/frechet/ctor":"10Q","@stdlib/stats-base-dists-frechet-ctor":"10R","@stdlib/stats/base/dists/frechet/entropy":"10S","@stdlib/stats-base-dists-frechet-entropy":"10T","@stdlib/stats/base/dists/frechet/kurtosis":"10U","@stdlib/stats-base-dists-frechet-kurtosis":"10V","@stdlib/stats/base/dists/frechet/logcdf":"10W","@stdlib/stats-base-dists-frechet-logcdf":"10X","@stdlib/stats/base/dists/frechet/logpdf":"10Y","@stdlib/stats-base-dists-frechet-logpdf":"10Z","@stdlib/stats/base/dists/frechet/mean":"10a","@stdlib/stats-base-dists-frechet-mean":"10b","@stdlib/stats/base/dists/frechet/median":"10c","@stdlib/stats-base-dists-frechet-median":"10d","@stdlib/stats/base/dists/frechet/mode":"10e","@stdlib/stats-base-dists-frechet-mode":"10f","@stdlib/stats/base/dists/frechet":"10g","@stdlib/stats-base-dists-frechet":"10h","@stdlib/stats/base/dists/frechet/pdf":"10i","@stdlib/stats-base-dists-frechet-pdf":"10j","@stdlib/stats/base/dists/frechet/quantile":"10k","@stdlib/stats-base-dists-frechet-quantile":"10l","@stdlib/stats/base/dists/frechet/skewness":"10m","@stdlib/stats-base-dists-frechet-skewness":"10n","@stdlib/stats/base/dists/frechet/stdev":"10o","@stdlib/stats-base-dists-frechet-stdev":"10p","@stdlib/stats/base/dists/frechet/variance":"10q","@stdlib/stats-base-dists-frechet-variance":"10r","@stdlib/stats/base/dists/gamma/cdf":"10s","@stdlib/stats-base-dists-gamma-cdf":"10t","@stdlib/stats/base/dists/gamma/ctor":"10u","@stdlib/stats-base-dists-gamma-ctor":"10v","@stdlib/stats/base/dists/gamma/entropy":"10w","@stdlib/stats-base-dists-gamma-entropy":"10x","@stdlib/stats/base/dists/gamma/kurtosis":"10y","@stdlib/stats-base-dists-gamma-kurtosis":"10z","@stdlib/stats/base/dists/gamma/logcdf":"110","@stdlib/stats-base-dists-gamma-logcdf":"111","@stdlib/stats/base/dists/gamma/logpdf":"112","@stdlib/stats-base-dists-gamma-logpdf":"113","@stdlib/stats/base/dists/gamma/mean":"114","@stdlib/stats-base-dists-gamma-mean":"115","@stdlib/stats/base/dists/gamma/mgf":"116","@stdlib/stats-base-dists-gamma-mgf":"117","@stdlib/stats/base/dists/gamma/mode":"118","@stdlib/stats-base-dists-gamma-mode":"119","@stdlib/stats/base/dists/gamma":"11A","@stdlib/stats-base-dists-gamma":"11B","@stdlib/stats/base/dists/gamma/pdf":"11C","@stdlib/stats-base-dists-gamma-pdf":"11D","@stdlib/stats/base/dists/gamma/quantile":"11E","@stdlib/stats-base-dists-gamma-quantile":"11F","@stdlib/stats/base/dists/gamma/skewness":"11G","@stdlib/stats-base-dists-gamma-skewness":"11H","@stdlib/stats/base/dists/gamma/stdev":"11I","@stdlib/stats-base-dists-gamma-stdev":"11J","@stdlib/stats/base/dists/gamma/variance":"11K","@stdlib/stats-base-dists-gamma-variance":"11L","@stdlib/stats/base/dists/geometric/cdf":"11M","@stdlib/stats-base-dists-geometric-cdf":"11N","@stdlib/stats/base/dists/geometric/ctor":"11O","@stdlib/stats-base-dists-geometric-ctor":"11P","@stdlib/stats/base/dists/geometric/entropy":"11Q","@stdlib/stats-base-dists-geometric-entropy":"11R","@stdlib/stats/base/dists/geometric/kurtosis":"11S","@stdlib/stats-base-dists-geometric-kurtosis":"11T","@stdlib/stats/base/dists/geometric/logcdf":"11U","@stdlib/stats-base-dists-geometric-logcdf":"11V","@stdlib/stats/base/dists/geometric/logpmf":"11W","@stdlib/stats-base-dists-geometric-logpmf":"11X","@stdlib/stats/base/dists/geometric/mean":"11Y","@stdlib/stats-base-dists-geometric-mean":"11Z","@stdlib/stats/base/dists/geometric/median":"11a","@stdlib/stats-base-dists-geometric-median":"11b","@stdlib/stats/base/dists/geometric/mgf":"11c","@stdlib/stats-base-dists-geometric-mgf":"11d","@stdlib/stats/base/dists/geometric/mode":"11e","@stdlib/stats-base-dists-geometric-mode":"11f","@stdlib/stats/base/dists/geometric":"11g","@stdlib/stats-base-dists-geometric":"11h","@stdlib/stats/base/dists/geometric/pmf":"11i","@stdlib/stats-base-dists-geometric-pmf":"11j","@stdlib/stats/base/dists/geometric/quantile":"11k","@stdlib/stats-base-dists-geometric-quantile":"11l","@stdlib/stats/base/dists/geometric/skewness":"11m","@stdlib/stats-base-dists-geometric-skewness":"11n","@stdlib/stats/base/dists/geometric/stdev":"11o","@stdlib/stats-base-dists-geometric-stdev":"11p","@stdlib/stats/base/dists/geometric/variance":"11q","@stdlib/stats-base-dists-geometric-variance":"11r","@stdlib/stats/base/dists/gumbel/cdf":"11s","@stdlib/stats-base-dists-gumbel-cdf":"11t","@stdlib/stats/base/dists/gumbel/ctor":"11u","@stdlib/stats-base-dists-gumbel-ctor":"11v","@stdlib/stats/base/dists/gumbel/entropy":"11w","@stdlib/stats-base-dists-gumbel-entropy":"11x","@stdlib/stats/base/dists/gumbel/kurtosis":"11y","@stdlib/stats-base-dists-gumbel-kurtosis":"11z","@stdlib/stats/base/dists/gumbel/logcdf":"120","@stdlib/stats-base-dists-gumbel-logcdf":"121","@stdlib/stats/base/dists/gumbel/logpdf":"122","@stdlib/stats-base-dists-gumbel-logpdf":"123","@stdlib/stats/base/dists/gumbel/mean":"124","@stdlib/stats-base-dists-gumbel-mean":"125","@stdlib/stats/base/dists/gumbel/median":"126","@stdlib/stats-base-dists-gumbel-median":"127","@stdlib/stats/base/dists/gumbel/mgf":"128","@stdlib/stats-base-dists-gumbel-mgf":"129","@stdlib/stats/base/dists/gumbel/mode":"12A","@stdlib/stats-base-dists-gumbel-mode":"12B","@stdlib/stats/base/dists/gumbel":"12C","@stdlib/stats-base-dists-gumbel":"12D","@stdlib/stats/base/dists/gumbel/pdf":"12E","@stdlib/stats-base-dists-gumbel-pdf":"12F","@stdlib/stats/base/dists/gumbel/quantile":"12G","@stdlib/stats-base-dists-gumbel-quantile":"12H","@stdlib/stats/base/dists/gumbel/skewness":"12I","@stdlib/stats-base-dists-gumbel-skewness":"12J","@stdlib/stats/base/dists/gumbel/stdev":"12K","@stdlib/stats-base-dists-gumbel-stdev":"12L","@stdlib/stats/base/dists/gumbel/variance":"12M","@stdlib/stats-base-dists-gumbel-variance":"12N","@stdlib/stats/base/dists/hypergeometric/cdf":"12O","@stdlib/stats-base-dists-hypergeometric-cdf":"12P","@stdlib/stats/base/dists/hypergeometric/ctor":"12Q","@stdlib/stats-base-dists-hypergeometric-ctor":"12R","@stdlib/stats/base/dists/hypergeometric/kurtosis":"12S","@stdlib/stats-base-dists-hypergeometric-kurtosis":"12T","@stdlib/stats/base/dists/hypergeometric/logpmf":"12U","@stdlib/stats-base-dists-hypergeometric-logpmf":"12V","@stdlib/stats/base/dists/hypergeometric/mean":"12W","@stdlib/stats-base-dists-hypergeometric-mean":"12X","@stdlib/stats/base/dists/hypergeometric/mode":"12Y","@stdlib/stats-base-dists-hypergeometric-mode":"12Z","@stdlib/stats/base/dists/hypergeometric":"12a","@stdlib/stats-base-dists-hypergeometric":"12b","@stdlib/stats/base/dists/hypergeometric/pmf":"12c","@stdlib/stats-base-dists-hypergeometric-pmf":"12d","@stdlib/stats/base/dists/hypergeometric/quantile":"12e","@stdlib/stats-base-dists-hypergeometric-quantile":"12f","@stdlib/stats/base/dists/hypergeometric/skewness":"12g","@stdlib/stats-base-dists-hypergeometric-skewness":"12h","@stdlib/stats/base/dists/hypergeometric/stdev":"12i","@stdlib/stats-base-dists-hypergeometric-stdev":"12j","@stdlib/stats/base/dists/hypergeometric/variance":"12k","@stdlib/stats-base-dists-hypergeometric-variance":"12l","@stdlib/stats/base/dists/invgamma/cdf":"12m","@stdlib/stats-base-dists-invgamma-cdf":"12n","@stdlib/stats/base/dists/invgamma/ctor":"12o","@stdlib/stats-base-dists-invgamma-ctor":"12p","@stdlib/stats/base/dists/invgamma/entropy":"12q","@stdlib/stats-base-dists-invgamma-entropy":"12r","@stdlib/stats/base/dists/invgamma/kurtosis":"12s","@stdlib/stats-base-dists-invgamma-kurtosis":"12t","@stdlib/stats/base/dists/invgamma/logpdf":"12u","@stdlib/stats-base-dists-invgamma-logpdf":"12v","@stdlib/stats/base/dists/invgamma/mean":"12w","@stdlib/stats-base-dists-invgamma-mean":"12x","@stdlib/stats/base/dists/invgamma/mode":"12y","@stdlib/stats-base-dists-invgamma-mode":"12z","@stdlib/stats/base/dists/invgamma":"130","@stdlib/stats-base-dists-invgamma":"131","@stdlib/stats/base/dists/invgamma/pdf":"132","@stdlib/stats-base-dists-invgamma-pdf":"133","@stdlib/stats/base/dists/invgamma/quantile":"134","@stdlib/stats-base-dists-invgamma-quantile":"135","@stdlib/stats/base/dists/invgamma/skewness":"136","@stdlib/stats-base-dists-invgamma-skewness":"137","@stdlib/stats/base/dists/invgamma/stdev":"138","@stdlib/stats-base-dists-invgamma-stdev":"139","@stdlib/stats/base/dists/invgamma/variance":"13A","@stdlib/stats-base-dists-invgamma-variance":"13B","@stdlib/stats/base/dists/kumaraswamy/cdf":"13C","@stdlib/stats-base-dists-kumaraswamy-cdf":"13D","@stdlib/stats/base/dists/kumaraswamy/ctor":"13E","@stdlib/stats-base-dists-kumaraswamy-ctor":"13F","@stdlib/stats/base/dists/kumaraswamy/kurtosis":"13G","@stdlib/stats-base-dists-kumaraswamy-kurtosis":"13H","@stdlib/stats/base/dists/kumaraswamy/logcdf":"13I","@stdlib/stats-base-dists-kumaraswamy-logcdf":"13J","@stdlib/stats/base/dists/kumaraswamy/logpdf":"13K","@stdlib/stats-base-dists-kumaraswamy-logpdf":"13L","@stdlib/stats/base/dists/kumaraswamy/mean":"13M","@stdlib/stats-base-dists-kumaraswamy-mean":"13N","@stdlib/stats/base/dists/kumaraswamy/median":"13O","@stdlib/stats-base-dists-kumaraswamy-median":"13P","@stdlib/stats/base/dists/kumaraswamy/mode":"13Q","@stdlib/stats-base-dists-kumaraswamy-mode":"13R","@stdlib/stats/base/dists/kumaraswamy":"13S","@stdlib/stats-base-dists-kumaraswamy":"13T","@stdlib/stats/base/dists/kumaraswamy/pdf":"13U","@stdlib/stats-base-dists-kumaraswamy-pdf":"13V","@stdlib/stats/base/dists/kumaraswamy/quantile":"13W","@stdlib/stats-base-dists-kumaraswamy-quantile":"13X","@stdlib/stats/base/dists/kumaraswamy/skewness":"13Y","@stdlib/stats-base-dists-kumaraswamy-skewness":"13Z","@stdlib/stats/base/dists/kumaraswamy/stdev":"13a","@stdlib/stats-base-dists-kumaraswamy-stdev":"13b","@stdlib/stats/base/dists/kumaraswamy/variance":"13c","@stdlib/stats-base-dists-kumaraswamy-variance":"13d","@stdlib/stats/base/dists/laplace/cdf":"13e","@stdlib/stats-base-dists-laplace-cdf":"13f","@stdlib/stats/base/dists/laplace/ctor":"13g","@stdlib/stats-base-dists-laplace-ctor":"13h","@stdlib/stats/base/dists/laplace/entropy":"13i","@stdlib/stats-base-dists-laplace-entropy":"13j","@stdlib/stats/base/dists/laplace/kurtosis":"13k","@stdlib/stats-base-dists-laplace-kurtosis":"13l","@stdlib/stats/base/dists/laplace/logcdf":"13m","@stdlib/stats-base-dists-laplace-logcdf":"13n","@stdlib/stats/base/dists/laplace/logpdf":"13o","@stdlib/stats-base-dists-laplace-logpdf":"13p","@stdlib/stats/base/dists/laplace/mean":"13q","@stdlib/stats-base-dists-laplace-mean":"13r","@stdlib/stats/base/dists/laplace/median":"13s","@stdlib/stats-base-dists-laplace-median":"13t","@stdlib/stats/base/dists/laplace/mgf":"13u","@stdlib/stats-base-dists-laplace-mgf":"13v","@stdlib/stats/base/dists/laplace/mode":"13w","@stdlib/stats-base-dists-laplace-mode":"13x","@stdlib/stats/base/dists/laplace":"13y","@stdlib/stats-base-dists-laplace":"13z","@stdlib/stats/base/dists/laplace/pdf":"140","@stdlib/stats-base-dists-laplace-pdf":"141","@stdlib/stats/base/dists/laplace/quantile":"142","@stdlib/stats-base-dists-laplace-quantile":"143","@stdlib/stats/base/dists/laplace/skewness":"144","@stdlib/stats-base-dists-laplace-skewness":"145","@stdlib/stats/base/dists/laplace/stdev":"146","@stdlib/stats-base-dists-laplace-stdev":"147","@stdlib/stats/base/dists/laplace/variance":"148","@stdlib/stats-base-dists-laplace-variance":"149","@stdlib/stats/base/dists/levy/cdf":"14A","@stdlib/stats-base-dists-levy-cdf":"14B","@stdlib/stats/base/dists/levy/ctor":"14C","@stdlib/stats-base-dists-levy-ctor":"14D","@stdlib/stats/base/dists/levy/entropy":"14E","@stdlib/stats-base-dists-levy-entropy":"14F","@stdlib/stats/base/dists/levy/logcdf":"14G","@stdlib/stats-base-dists-levy-logcdf":"14H","@stdlib/stats/base/dists/levy/logpdf":"14I","@stdlib/stats-base-dists-levy-logpdf":"14J","@stdlib/stats/base/dists/levy/mean":"14K","@stdlib/stats-base-dists-levy-mean":"14L","@stdlib/stats/base/dists/levy/median":"14M","@stdlib/stats-base-dists-levy-median":"14N","@stdlib/stats/base/dists/levy/mode":"14O","@stdlib/stats-base-dists-levy-mode":"14P","@stdlib/stats/base/dists/levy":"14Q","@stdlib/stats-base-dists-levy":"14R","@stdlib/stats/base/dists/levy/pdf":"14S","@stdlib/stats-base-dists-levy-pdf":"14T","@stdlib/stats/base/dists/levy/quantile":"14U","@stdlib/stats-base-dists-levy-quantile":"14V","@stdlib/stats/base/dists/levy/stdev":"14W","@stdlib/stats-base-dists-levy-stdev":"14X","@stdlib/stats/base/dists/levy/variance":"14Y","@stdlib/stats-base-dists-levy-variance":"14Z","@stdlib/stats/base/dists/logistic/cdf":"14a","@stdlib/stats-base-dists-logistic-cdf":"14b","@stdlib/stats/base/dists/logistic/ctor":"14c","@stdlib/stats-base-dists-logistic-ctor":"14d","@stdlib/stats/base/dists/logistic/entropy":"14e","@stdlib/stats-base-dists-logistic-entropy":"14f","@stdlib/stats/base/dists/logistic/kurtosis":"14g","@stdlib/stats-base-dists-logistic-kurtosis":"14h","@stdlib/stats/base/dists/logistic/logcdf":"14i","@stdlib/stats-base-dists-logistic-logcdf":"14j","@stdlib/stats/base/dists/logistic/logpdf":"14k","@stdlib/stats-base-dists-logistic-logpdf":"14l","@stdlib/stats/base/dists/logistic/mean":"14m","@stdlib/stats-base-dists-logistic-mean":"14n","@stdlib/stats/base/dists/logistic/median":"14o","@stdlib/stats-base-dists-logistic-median":"14p","@stdlib/stats/base/dists/logistic/mgf":"14q","@stdlib/stats-base-dists-logistic-mgf":"14r","@stdlib/stats/base/dists/logistic/mode":"14s","@stdlib/stats-base-dists-logistic-mode":"14t","@stdlib/stats/base/dists/logistic":"14u","@stdlib/stats-base-dists-logistic":"14v","@stdlib/stats/base/dists/logistic/pdf":"14w","@stdlib/stats-base-dists-logistic-pdf":"14x","@stdlib/stats/base/dists/logistic/quantile":"14y","@stdlib/stats-base-dists-logistic-quantile":"14z","@stdlib/stats/base/dists/logistic/skewness":"150","@stdlib/stats-base-dists-logistic-skewness":"151","@stdlib/stats/base/dists/logistic/stdev":"152","@stdlib/stats-base-dists-logistic-stdev":"153","@stdlib/stats/base/dists/logistic/variance":"154","@stdlib/stats-base-dists-logistic-variance":"155","@stdlib/stats/base/dists/lognormal/cdf":"156","@stdlib/stats-base-dists-lognormal-cdf":"157","@stdlib/stats/base/dists/lognormal/ctor":"158","@stdlib/stats-base-dists-lognormal-ctor":"159","@stdlib/stats/base/dists/lognormal/entropy":"15A","@stdlib/stats-base-dists-lognormal-entropy":"15B","@stdlib/stats/base/dists/lognormal/kurtosis":"15C","@stdlib/stats-base-dists-lognormal-kurtosis":"15D","@stdlib/stats/base/dists/lognormal/logpdf":"15E","@stdlib/stats-base-dists-lognormal-logpdf":"15F","@stdlib/stats/base/dists/lognormal/mean":"15G","@stdlib/stats-base-dists-lognormal-mean":"15H","@stdlib/stats/base/dists/lognormal/median":"15I","@stdlib/stats-base-dists-lognormal-median":"15J","@stdlib/stats/base/dists/lognormal/mode":"15K","@stdlib/stats-base-dists-lognormal-mode":"15L","@stdlib/stats/base/dists/lognormal":"15M","@stdlib/stats-base-dists-lognormal":"15N","@stdlib/stats/base/dists/lognormal/pdf":"15O","@stdlib/stats-base-dists-lognormal-pdf":"15P","@stdlib/stats/base/dists/lognormal/quantile":"15Q","@stdlib/stats-base-dists-lognormal-quantile":"15R","@stdlib/stats/base/dists/lognormal/skewness":"15S","@stdlib/stats-base-dists-lognormal-skewness":"15T","@stdlib/stats/base/dists/lognormal/stdev":"15U","@stdlib/stats-base-dists-lognormal-stdev":"15V","@stdlib/stats/base/dists/lognormal/variance":"15W","@stdlib/stats-base-dists-lognormal-variance":"15X","@stdlib/stats/base/dists/negative-binomial/cdf":"15Y","@stdlib/stats-base-dists-negative-binomial-cdf":"15Z","@stdlib/stats/base/dists/negative-binomial/ctor":"15a","@stdlib/stats-base-dists-negative-binomial-ctor":"15b","@stdlib/stats/base/dists/negative-binomial/kurtosis":"15c","@stdlib/stats-base-dists-negative-binomial-kurtosis":"15d","@stdlib/stats/base/dists/negative-binomial/logpmf":"15e","@stdlib/stats-base-dists-negative-binomial-logpmf":"15f","@stdlib/stats/base/dists/negative-binomial/mean":"15g","@stdlib/stats-base-dists-negative-binomial-mean":"15h","@stdlib/stats/base/dists/negative-binomial/mgf":"15i","@stdlib/stats-base-dists-negative-binomial-mgf":"15j","@stdlib/stats/base/dists/negative-binomial/mode":"15k","@stdlib/stats-base-dists-negative-binomial-mode":"15l","@stdlib/stats/base/dists/negative-binomial":"15m","@stdlib/stats-base-dists-negative-binomial":"15n","@stdlib/stats/base/dists/negative-binomial/pmf":"15o","@stdlib/stats-base-dists-negative-binomial-pmf":"15p","@stdlib/stats/base/dists/negative-binomial/quantile":"15q","@stdlib/stats-base-dists-negative-binomial-quantile":"15r","@stdlib/stats/base/dists/negative-binomial/skewness":"15s","@stdlib/stats-base-dists-negative-binomial-skewness":"15t","@stdlib/stats/base/dists/negative-binomial/stdev":"15u","@stdlib/stats-base-dists-negative-binomial-stdev":"15v","@stdlib/stats/base/dists/negative-binomial/variance":"15w","@stdlib/stats-base-dists-negative-binomial-variance":"15x","@stdlib/stats/base/dists/normal/cdf":"15y","@stdlib/stats-base-dists-normal-cdf":"15z","@stdlib/stats/base/dists/normal/ctor":"160","@stdlib/stats-base-dists-normal-ctor":"161","@stdlib/stats/base/dists/normal/entropy":"162","@stdlib/stats-base-dists-normal-entropy":"163","@stdlib/stats/base/dists/normal/kurtosis":"164","@stdlib/stats-base-dists-normal-kurtosis":"165","@stdlib/stats/base/dists/normal/logpdf":"166","@stdlib/stats-base-dists-normal-logpdf":"167","@stdlib/stats/base/dists/normal/mean":"168","@stdlib/stats-base-dists-normal-mean":"169","@stdlib/stats/base/dists/normal/median":"16A","@stdlib/stats-base-dists-normal-median":"16B","@stdlib/stats/base/dists/normal/mgf":"16C","@stdlib/stats-base-dists-normal-mgf":"16D","@stdlib/stats/base/dists/normal/mode":"16E","@stdlib/stats-base-dists-normal-mode":"16F","@stdlib/stats/base/dists/normal":"16G","@stdlib/stats-base-dists-normal":"16H","@stdlib/stats/base/dists/normal/pdf":"16I","@stdlib/stats-base-dists-normal-pdf":"16J","@stdlib/stats/base/dists/normal/quantile":"16K","@stdlib/stats-base-dists-normal-quantile":"16L","@stdlib/stats/base/dists/normal/skewness":"16M","@stdlib/stats-base-dists-normal-skewness":"16N","@stdlib/stats/base/dists/normal/stdev":"16O","@stdlib/stats-base-dists-normal-stdev":"16P","@stdlib/stats/base/dists/normal/variance":"16Q","@stdlib/stats-base-dists-normal-variance":"16R","@stdlib/stats/base/dists":"16S","@stdlib/stats-base-dists":"16T","@stdlib/stats/base/dists/pareto-type1/cdf":"16U","@stdlib/stats-base-dists-pareto-type1-cdf":"16V","@stdlib/stats/base/dists/pareto-type1/ctor":"16W","@stdlib/stats-base-dists-pareto-type1-ctor":"16X","@stdlib/stats/base/dists/pareto-type1/entropy":"16Y","@stdlib/stats-base-dists-pareto-type1-entropy":"16Z","@stdlib/stats/base/dists/pareto-type1/kurtosis":"16a","@stdlib/stats-base-dists-pareto-type1-kurtosis":"16b","@stdlib/stats/base/dists/pareto-type1/logcdf":"16c","@stdlib/stats-base-dists-pareto-type1-logcdf":"16d","@stdlib/stats/base/dists/pareto-type1/logpdf":"16e","@stdlib/stats-base-dists-pareto-type1-logpdf":"16f","@stdlib/stats/base/dists/pareto-type1/mean":"16g","@stdlib/stats-base-dists-pareto-type1-mean":"16h","@stdlib/stats/base/dists/pareto-type1/median":"16i","@stdlib/stats-base-dists-pareto-type1-median":"16j","@stdlib/stats/base/dists/pareto-type1/mode":"16k","@stdlib/stats-base-dists-pareto-type1-mode":"16l","@stdlib/stats/base/dists/pareto-type1":"16m","@stdlib/stats-base-dists-pareto-type1":"16n","@stdlib/stats/base/dists/pareto-type1/pdf":"16o","@stdlib/stats-base-dists-pareto-type1-pdf":"16p","@stdlib/stats/base/dists/pareto-type1/quantile":"16q","@stdlib/stats-base-dists-pareto-type1-quantile":"16r","@stdlib/stats/base/dists/pareto-type1/skewness":"16s","@stdlib/stats-base-dists-pareto-type1-skewness":"16t","@stdlib/stats/base/dists/pareto-type1/stdev":"16u","@stdlib/stats-base-dists-pareto-type1-stdev":"16v","@stdlib/stats/base/dists/pareto-type1/variance":"16w","@stdlib/stats-base-dists-pareto-type1-variance":"16x","@stdlib/stats/base/dists/poisson/cdf":"16y","@stdlib/stats-base-dists-poisson-cdf":"16z","@stdlib/stats/base/dists/poisson/ctor":"170","@stdlib/stats-base-dists-poisson-ctor":"171","@stdlib/stats/base/dists/poisson/entropy":"172","@stdlib/stats-base-dists-poisson-entropy":"173","@stdlib/stats/base/dists/poisson/kurtosis":"174","@stdlib/stats-base-dists-poisson-kurtosis":"175","@stdlib/stats/base/dists/poisson/logpmf":"176","@stdlib/stats-base-dists-poisson-logpmf":"177","@stdlib/stats/base/dists/poisson/mean":"178","@stdlib/stats-base-dists-poisson-mean":"179","@stdlib/stats/base/dists/poisson/median":"17A","@stdlib/stats-base-dists-poisson-median":"17B","@stdlib/stats/base/dists/poisson/mgf":"17C","@stdlib/stats-base-dists-poisson-mgf":"17D","@stdlib/stats/base/dists/poisson/mode":"17E","@stdlib/stats-base-dists-poisson-mode":"17F","@stdlib/stats/base/dists/poisson":"17G","@stdlib/stats-base-dists-poisson":"17H","@stdlib/stats/base/dists/poisson/pmf":"17I","@stdlib/stats-base-dists-poisson-pmf":"17J","@stdlib/stats/base/dists/poisson/quantile":"17K","@stdlib/stats-base-dists-poisson-quantile":"17L","@stdlib/stats/base/dists/poisson/skewness":"17M","@stdlib/stats-base-dists-poisson-skewness":"17N","@stdlib/stats/base/dists/poisson/stdev":"17O","@stdlib/stats-base-dists-poisson-stdev":"17P","@stdlib/stats/base/dists/poisson/variance":"17Q","@stdlib/stats-base-dists-poisson-variance":"17R","@stdlib/stats/base/dists/rayleigh/cdf":"17S","@stdlib/stats-base-dists-rayleigh-cdf":"17T","@stdlib/stats/base/dists/rayleigh/ctor":"17U","@stdlib/stats-base-dists-rayleigh-ctor":"17V","@stdlib/stats/base/dists/rayleigh/entropy":"17W","@stdlib/stats-base-dists-rayleigh-entropy":"17X","@stdlib/stats/base/dists/rayleigh/kurtosis":"17Y","@stdlib/stats-base-dists-rayleigh-kurtosis":"17Z","@stdlib/stats/base/dists/rayleigh/logcdf":"17a","@stdlib/stats-base-dists-rayleigh-logcdf":"17b","@stdlib/stats/base/dists/rayleigh/logpdf":"17c","@stdlib/stats-base-dists-rayleigh-logpdf":"17d","@stdlib/stats/base/dists/rayleigh/mean":"17e","@stdlib/stats-base-dists-rayleigh-mean":"17f","@stdlib/stats/base/dists/rayleigh/median":"17g","@stdlib/stats-base-dists-rayleigh-median":"17h","@stdlib/stats/base/dists/rayleigh/mgf":"17i","@stdlib/stats-base-dists-rayleigh-mgf":"17j","@stdlib/stats/base/dists/rayleigh/mode":"17k","@stdlib/stats-base-dists-rayleigh-mode":"17l","@stdlib/stats/base/dists/rayleigh":"17m","@stdlib/stats-base-dists-rayleigh":"17n","@stdlib/stats/base/dists/rayleigh/pdf":"17o","@stdlib/stats-base-dists-rayleigh-pdf":"17p","@stdlib/stats/base/dists/rayleigh/quantile":"17q","@stdlib/stats-base-dists-rayleigh-quantile":"17r","@stdlib/stats/base/dists/rayleigh/skewness":"17s","@stdlib/stats-base-dists-rayleigh-skewness":"17t","@stdlib/stats/base/dists/rayleigh/stdev":"17u","@stdlib/stats-base-dists-rayleigh-stdev":"17v","@stdlib/stats/base/dists/rayleigh/variance":"17w","@stdlib/stats-base-dists-rayleigh-variance":"17x","@stdlib/stats/base/dists/signrank/cdf":"17y","@stdlib/stats-base-dists-signrank-cdf":"17z","@stdlib/stats/base/dists/signrank":"180","@stdlib/stats-base-dists-signrank":"181","@stdlib/stats/base/dists/signrank/pdf":"182","@stdlib/stats-base-dists-signrank-pdf":"183","@stdlib/stats/base/dists/signrank/quantile":"184","@stdlib/stats-base-dists-signrank-quantile":"185","@stdlib/stats/base/dists/t/cdf":"186","@stdlib/stats-base-dists-t-cdf":"187","@stdlib/stats/base/dists/t/ctor":"188","@stdlib/stats-base-dists-t-ctor":"189","@stdlib/stats/base/dists/t/entropy":"18A","@stdlib/stats-base-dists-t-entropy":"18B","@stdlib/stats/base/dists/t/kurtosis":"18C","@stdlib/stats-base-dists-t-kurtosis":"18D","@stdlib/stats/base/dists/t/logcdf":"18E","@stdlib/stats-base-dists-t-logcdf":"18F","@stdlib/stats/base/dists/t/logpdf":"18G","@stdlib/stats-base-dists-t-logpdf":"18H","@stdlib/stats/base/dists/t/mean":"18I","@stdlib/stats-base-dists-t-mean":"18J","@stdlib/stats/base/dists/t/median":"18K","@stdlib/stats-base-dists-t-median":"18L","@stdlib/stats/base/dists/t/mode":"18M","@stdlib/stats-base-dists-t-mode":"18N","@stdlib/stats/base/dists/t":"18O","@stdlib/stats-base-dists-t":"18P","@stdlib/stats/base/dists/t/pdf":"18Q","@stdlib/stats-base-dists-t-pdf":"18R","@stdlib/stats/base/dists/t/quantile":"18S","@stdlib/stats-base-dists-t-quantile":"18T","@stdlib/stats/base/dists/t/skewness":"18U","@stdlib/stats-base-dists-t-skewness":"18V","@stdlib/stats/base/dists/t/stdev":"18W","@stdlib/stats-base-dists-t-stdev":"18X","@stdlib/stats/base/dists/t/variance":"18Y","@stdlib/stats-base-dists-t-variance":"18Z","@stdlib/stats/base/dists/triangular/cdf":"18a","@stdlib/stats-base-dists-triangular-cdf":"18b","@stdlib/stats/base/dists/triangular/ctor":"18c","@stdlib/stats-base-dists-triangular-ctor":"18d","@stdlib/stats/base/dists/triangular/entropy":"18e","@stdlib/stats-base-dists-triangular-entropy":"18f","@stdlib/stats/base/dists/triangular/kurtosis":"18g","@stdlib/stats-base-dists-triangular-kurtosis":"18h","@stdlib/stats/base/dists/triangular/logcdf":"18i","@stdlib/stats-base-dists-triangular-logcdf":"18j","@stdlib/stats/base/dists/triangular/logpdf":"18k","@stdlib/stats-base-dists-triangular-logpdf":"18l","@stdlib/stats/base/dists/triangular/mean":"18m","@stdlib/stats-base-dists-triangular-mean":"18n","@stdlib/stats/base/dists/triangular/median":"18o","@stdlib/stats-base-dists-triangular-median":"18p","@stdlib/stats/base/dists/triangular/mgf":"18q","@stdlib/stats-base-dists-triangular-mgf":"18r","@stdlib/stats/base/dists/triangular/mode":"18s","@stdlib/stats-base-dists-triangular-mode":"18t","@stdlib/stats/base/dists/triangular":"18u","@stdlib/stats-base-dists-triangular":"18v","@stdlib/stats/base/dists/triangular/pdf":"18w","@stdlib/stats-base-dists-triangular-pdf":"18x","@stdlib/stats/base/dists/triangular/quantile":"18y","@stdlib/stats-base-dists-triangular-quantile":"18z","@stdlib/stats/base/dists/triangular/skewness":"190","@stdlib/stats-base-dists-triangular-skewness":"191","@stdlib/stats/base/dists/triangular/stdev":"192","@stdlib/stats-base-dists-triangular-stdev":"193","@stdlib/stats/base/dists/triangular/variance":"194","@stdlib/stats-base-dists-triangular-variance":"195","@stdlib/stats/base/dists/truncated-normal":"196","@stdlib/stats-base-dists-truncated-normal":"197","@stdlib/stats/base/dists/truncated-normal/pdf":"198","@stdlib/stats-base-dists-truncated-normal-pdf":"199","@stdlib/stats/base/dists/uniform/cdf":"19A","@stdlib/stats-base-dists-uniform-cdf":"19B","@stdlib/stats/base/dists/uniform/ctor":"19C","@stdlib/stats-base-dists-uniform-ctor":"19D","@stdlib/stats/base/dists/uniform/entropy":"19E","@stdlib/stats-base-dists-uniform-entropy":"19F","@stdlib/stats/base/dists/uniform/kurtosis":"19G","@stdlib/stats-base-dists-uniform-kurtosis":"19H","@stdlib/stats/base/dists/uniform/logcdf":"19I","@stdlib/stats-base-dists-uniform-logcdf":"19J","@stdlib/stats/base/dists/uniform/logpdf":"19K","@stdlib/stats-base-dists-uniform-logpdf":"19L","@stdlib/stats/base/dists/uniform/mean":"19M","@stdlib/stats-base-dists-uniform-mean":"19N","@stdlib/stats/base/dists/uniform/median":"19O","@stdlib/stats-base-dists-uniform-median":"19P","@stdlib/stats/base/dists/uniform/mgf":"19Q","@stdlib/stats-base-dists-uniform-mgf":"19R","@stdlib/stats/base/dists/uniform":"19S","@stdlib/stats-base-dists-uniform":"19T","@stdlib/stats/base/dists/uniform/pdf":"19U","@stdlib/stats-base-dists-uniform-pdf":"19V","@stdlib/stats/base/dists/uniform/quantile":"19W","@stdlib/stats-base-dists-uniform-quantile":"19X","@stdlib/stats/base/dists/uniform/skewness":"19Y","@stdlib/stats-base-dists-uniform-skewness":"19Z","@stdlib/stats/base/dists/uniform/stdev":"19a","@stdlib/stats-base-dists-uniform-stdev":"19b","@stdlib/stats/base/dists/uniform/variance":"19c","@stdlib/stats-base-dists-uniform-variance":"19d","@stdlib/stats/base/dists/weibull/cdf":"19e","@stdlib/stats-base-dists-weibull-cdf":"19f","@stdlib/stats/base/dists/weibull/ctor":"19g","@stdlib/stats-base-dists-weibull-ctor":"19h","@stdlib/stats/base/dists/weibull/entropy":"19i","@stdlib/stats-base-dists-weibull-entropy":"19j","@stdlib/stats/base/dists/weibull/kurtosis":"19k","@stdlib/stats-base-dists-weibull-kurtosis":"19l","@stdlib/stats/base/dists/weibull/logcdf":"19m","@stdlib/stats-base-dists-weibull-logcdf":"19n","@stdlib/stats/base/dists/weibull/logpdf":"19o","@stdlib/stats-base-dists-weibull-logpdf":"19p","@stdlib/stats/base/dists/weibull/mean":"19q","@stdlib/stats-base-dists-weibull-mean":"19r","@stdlib/stats/base/dists/weibull/median":"19s","@stdlib/stats-base-dists-weibull-median":"19t","@stdlib/stats/base/dists/weibull/mgf":"19u","@stdlib/stats-base-dists-weibull-mgf":"19v","@stdlib/stats/base/dists/weibull/mode":"19w","@stdlib/stats-base-dists-weibull-mode":"19x","@stdlib/stats/base/dists/weibull":"19y","@stdlib/stats-base-dists-weibull":"19z","@stdlib/stats/base/dists/weibull/pdf":"1A0","@stdlib/stats-base-dists-weibull-pdf":"1A1","@stdlib/stats/base/dists/weibull/quantile":"1A2","@stdlib/stats-base-dists-weibull-quantile":"1A3","@stdlib/stats/base/dists/weibull/skewness":"1A4","@stdlib/stats-base-dists-weibull-skewness":"1A5","@stdlib/stats/base/dists/weibull/stdev":"1A6","@stdlib/stats-base-dists-weibull-stdev":"1A7","@stdlib/stats/base/dists/weibull/variance":"1A8","@stdlib/stats-base-dists-weibull-variance":"1A9","@stdlib/stats/base/dmax":"1AA","@stdlib/stats-base-dmax":"1AB","@stdlib/stats/base/dmaxabs":"1AC","@stdlib/stats-base-dmaxabs":"1AD","@stdlib/stats/base/dmaxabssorted":"1AE","@stdlib/stats-base-dmaxabssorted":"1AF","@stdlib/stats/base/dmaxsorted":"1AG","@stdlib/stats-base-dmaxsorted":"1AH","@stdlib/stats/base/dmean":"1AI","@stdlib/stats-base-dmean":"1AJ","@stdlib/stats/base/dmeankbn":"1AK","@stdlib/stats-base-dmeankbn":"1AL","@stdlib/stats/base/dmeankbn2":"1AM","@stdlib/stats-base-dmeankbn2":"1AN","@stdlib/stats/base/dmeanli":"1AO","@stdlib/stats-base-dmeanli":"1AP","@stdlib/stats/base/dmeanlipw":"1AQ","@stdlib/stats-base-dmeanlipw":"1AR","@stdlib/stats/base/dmeanors":"1AS","@stdlib/stats-base-dmeanors":"1AT","@stdlib/stats/base/dmeanpn":"1AU","@stdlib/stats-base-dmeanpn":"1AV","@stdlib/stats/base/dmeanpw":"1AW","@stdlib/stats-base-dmeanpw":"1AX","@stdlib/stats/base/dmeanstdev":"1AY","@stdlib/stats-base-dmeanstdev":"1AZ","@stdlib/stats/base/dmeanstdevpn":"1Aa","@stdlib/stats-base-dmeanstdevpn":"1Ab","@stdlib/stats/base/dmeanvar":"1Ac","@stdlib/stats-base-dmeanvar":"1Ad","@stdlib/stats/base/dmeanvarpn":"1Ae","@stdlib/stats-base-dmeanvarpn":"1Af","@stdlib/stats/base/dmeanwd":"1Ag","@stdlib/stats-base-dmeanwd":"1Ah","@stdlib/stats/base/dmediansorted":"1Ai","@stdlib/stats-base-dmediansorted":"1Aj","@stdlib/stats/base/dmidrange":"1Ak","@stdlib/stats-base-dmidrange":"1Al","@stdlib/stats/base/dmin":"1Am","@stdlib/stats-base-dmin":"1An","@stdlib/stats/base/dminabs":"1Ao","@stdlib/stats-base-dminabs":"1Ap","@stdlib/stats/base/dminsorted":"1Aq","@stdlib/stats-base-dminsorted":"1Ar","@stdlib/stats/base/dmskmax":"1As","@stdlib/stats-base-dmskmax":"1At","@stdlib/stats/base/dmskmin":"1Au","@stdlib/stats-base-dmskmin":"1Av","@stdlib/stats/base/dmskrange":"1Aw","@stdlib/stats-base-dmskrange":"1Ax","@stdlib/stats/base/dnanmax":"1Ay","@stdlib/stats-base-dnanmax":"1Az","@stdlib/stats/base/dnanmaxabs":"1B0","@stdlib/stats-base-dnanmaxabs":"1B1","@stdlib/stats/base/dnanmean":"1B2","@stdlib/stats-base-dnanmean":"1B3","@stdlib/stats/base/dnanmeanors":"1B4","@stdlib/stats-base-dnanmeanors":"1B5","@stdlib/stats/base/dnanmeanpn":"1B6","@stdlib/stats-base-dnanmeanpn":"1B7","@stdlib/stats/base/dnanmeanpw":"1B8","@stdlib/stats-base-dnanmeanpw":"1B9","@stdlib/stats/base/dnanmeanwd":"1BA","@stdlib/stats-base-dnanmeanwd":"1BB","@stdlib/stats/base/dnanmin":"1BC","@stdlib/stats-base-dnanmin":"1BD","@stdlib/stats/base/dnanminabs":"1BE","@stdlib/stats-base-dnanminabs":"1BF","@stdlib/stats/base/dnanmskmax":"1BG","@stdlib/stats-base-dnanmskmax":"1BH","@stdlib/stats/base/dnanmskmin":"1BI","@stdlib/stats-base-dnanmskmin":"1BJ","@stdlib/stats/base/dnanmskrange":"1BK","@stdlib/stats-base-dnanmskrange":"1BL","@stdlib/stats/base/dnanrange":"1BM","@stdlib/stats-base-dnanrange":"1BN","@stdlib/stats/base/dnanstdev":"1BO","@stdlib/stats-base-dnanstdev":"1BP","@stdlib/stats/base/dnanstdevch":"1BQ","@stdlib/stats-base-dnanstdevch":"1BR","@stdlib/stats/base/dnanstdevpn":"1BS","@stdlib/stats-base-dnanstdevpn":"1BT","@stdlib/stats/base/dnanstdevtk":"1BU","@stdlib/stats-base-dnanstdevtk":"1BV","@stdlib/stats/base/dnanstdevwd":"1BW","@stdlib/stats-base-dnanstdevwd":"1BX","@stdlib/stats/base/dnanstdevyc":"1BY","@stdlib/stats-base-dnanstdevyc":"1BZ","@stdlib/stats/base/dnanvariance":"1Ba","@stdlib/stats-base-dnanvariance":"1Bb","@stdlib/stats/base/dnanvariancech":"1Bc","@stdlib/stats-base-dnanvariancech":"1Bd","@stdlib/stats/base/dnanvariancepn":"1Be","@stdlib/stats-base-dnanvariancepn":"1Bf","@stdlib/stats/base/dnanvariancetk":"1Bg","@stdlib/stats-base-dnanvariancetk":"1Bh","@stdlib/stats/base/dnanvariancewd":"1Bi","@stdlib/stats-base-dnanvariancewd":"1Bj","@stdlib/stats/base/dnanvarianceyc":"1Bk","@stdlib/stats-base-dnanvarianceyc":"1Bl","@stdlib/stats/base/drange":"1Bm","@stdlib/stats-base-drange":"1Bn","@stdlib/stats/base/dsem":"1Bo","@stdlib/stats-base-dsem":"1Bp","@stdlib/stats/base/dsemch":"1Bq","@stdlib/stats-base-dsemch":"1Br","@stdlib/stats/base/dsempn":"1Bs","@stdlib/stats-base-dsempn":"1Bt","@stdlib/stats/base/dsemtk":"1Bu","@stdlib/stats-base-dsemtk":"1Bv","@stdlib/stats/base/dsemwd":"1Bw","@stdlib/stats-base-dsemwd":"1Bx","@stdlib/stats/base/dsemyc":"1By","@stdlib/stats-base-dsemyc":"1Bz","@stdlib/stats/base/dsmean":"1C0","@stdlib/stats-base-dsmean":"1C1","@stdlib/stats/base/dsmeanors":"1C2","@stdlib/stats-base-dsmeanors":"1C3","@stdlib/stats/base/dsmeanpn":"1C4","@stdlib/stats-base-dsmeanpn":"1C5","@stdlib/stats/base/dsmeanpw":"1C6","@stdlib/stats-base-dsmeanpw":"1C7","@stdlib/stats/base/dsmeanwd":"1C8","@stdlib/stats-base-dsmeanwd":"1C9","@stdlib/stats/base/dsnanmean":"1CA","@stdlib/stats-base-dsnanmean":"1CB","@stdlib/stats/base/dsnanmeanors":"1CC","@stdlib/stats-base-dsnanmeanors":"1CD","@stdlib/stats/base/dsnanmeanpn":"1CE","@stdlib/stats-base-dsnanmeanpn":"1CF","@stdlib/stats/base/dsnanmeanwd":"1CG","@stdlib/stats-base-dsnanmeanwd":"1CH","@stdlib/stats/base/dstdev":"1CI","@stdlib/stats-base-dstdev":"1CJ","@stdlib/stats/base/dstdevch":"1CK","@stdlib/stats-base-dstdevch":"1CL","@stdlib/stats/base/dstdevpn":"1CM","@stdlib/stats-base-dstdevpn":"1CN","@stdlib/stats/base/dstdevtk":"1CO","@stdlib/stats-base-dstdevtk":"1CP","@stdlib/stats/base/dstdevwd":"1CQ","@stdlib/stats-base-dstdevwd":"1CR","@stdlib/stats/base/dstdevyc":"1CS","@stdlib/stats-base-dstdevyc":"1CT","@stdlib/stats/base/dsvariance":"1CU","@stdlib/stats-base-dsvariance":"1CV","@stdlib/stats/base/dsvariancepn":"1CW","@stdlib/stats-base-dsvariancepn":"1CX","@stdlib/stats/base/dvariance":"1CY","@stdlib/stats-base-dvariance":"1CZ","@stdlib/stats/base/dvariancech":"1Ca","@stdlib/stats-base-dvariancech":"1Cb","@stdlib/stats/base/dvariancepn":"1Cc","@stdlib/stats-base-dvariancepn":"1Cd","@stdlib/stats/base/dvariancetk":"1Ce","@stdlib/stats-base-dvariancetk":"1Cf","@stdlib/stats/base/dvariancewd":"1Cg","@stdlib/stats-base-dvariancewd":"1Ch","@stdlib/stats/base/dvarianceyc":"1Ci","@stdlib/stats-base-dvarianceyc":"1Cj","@stdlib/stats/base/dvarm":"1Ck","@stdlib/stats-base-dvarm":"1Cl","@stdlib/stats/base/dvarmpn":"1Cm","@stdlib/stats-base-dvarmpn":"1Cn","@stdlib/stats/base/dvarmtk":"1Co","@stdlib/stats-base-dvarmtk":"1Cp","@stdlib/stats/base/max-by":"1Cq","@stdlib/stats-base-max-by":"1Cr","@stdlib/stats/base/max":"1Cs","@stdlib/stats-base-max":"1Ct","@stdlib/stats/base/maxabs":"1Cu","@stdlib/stats-base-maxabs":"1Cv","@stdlib/stats/base/maxsorted":"1Cw","@stdlib/stats-base-maxsorted":"1Cx","@stdlib/stats/base/mean":"1Cy","@stdlib/stats-base-mean":"1Cz","@stdlib/stats/base/meankbn":"1D0","@stdlib/stats-base-meankbn":"1D1","@stdlib/stats/base/meankbn2":"1D2","@stdlib/stats-base-meankbn2":"1D3","@stdlib/stats/base/meanors":"1D4","@stdlib/stats-base-meanors":"1D5","@stdlib/stats/base/meanpn":"1D6","@stdlib/stats-base-meanpn":"1D7","@stdlib/stats/base/meanpw":"1D8","@stdlib/stats-base-meanpw":"1D9","@stdlib/stats/base/meanwd":"1DA","@stdlib/stats-base-meanwd":"1DB","@stdlib/stats/base/mediansorted":"1DC","@stdlib/stats-base-mediansorted":"1DD","@stdlib/stats/base/min-by":"1DE","@stdlib/stats-base-min-by":"1DF","@stdlib/stats/base/min":"1DG","@stdlib/stats-base-min":"1DH","@stdlib/stats/base/minabs":"1DI","@stdlib/stats-base-minabs":"1DJ","@stdlib/stats/base/minsorted":"1DK","@stdlib/stats-base-minsorted":"1DL","@stdlib/stats/base/mskmax":"1DM","@stdlib/stats-base-mskmax":"1DN","@stdlib/stats/base/mskmin":"1DO","@stdlib/stats-base-mskmin":"1DP","@stdlib/stats/base/mskrange":"1DQ","@stdlib/stats-base-mskrange":"1DR","@stdlib/stats/base/nanmax-by":"1DS","@stdlib/stats-base-nanmax-by":"1DT","@stdlib/stats/base/nanmax":"1DU","@stdlib/stats-base-nanmax":"1DV","@stdlib/stats/base/nanmaxabs":"1DW","@stdlib/stats-base-nanmaxabs":"1DX","@stdlib/stats/base/nanmean":"1DY","@stdlib/stats-base-nanmean":"1DZ","@stdlib/stats/base/nanmeanors":"1Da","@stdlib/stats-base-nanmeanors":"1Db","@stdlib/stats/base/nanmeanpn":"1Dc","@stdlib/stats-base-nanmeanpn":"1Dd","@stdlib/stats/base/nanmeanwd":"1De","@stdlib/stats-base-nanmeanwd":"1Df","@stdlib/stats/base/nanmin-by":"1Dg","@stdlib/stats-base-nanmin-by":"1Dh","@stdlib/stats/base/nanmin":"1Di","@stdlib/stats-base-nanmin":"1Dj","@stdlib/stats/base/nanminabs":"1Dk","@stdlib/stats-base-nanminabs":"1Dl","@stdlib/stats/base/nanmskmax":"1Dm","@stdlib/stats-base-nanmskmax":"1Dn","@stdlib/stats/base/nanmskmin":"1Do","@stdlib/stats-base-nanmskmin":"1Dp","@stdlib/stats/base/nanmskrange":"1Dq","@stdlib/stats-base-nanmskrange":"1Dr","@stdlib/stats/base/nanrange-by":"1Ds","@stdlib/stats-base-nanrange-by":"1Dt","@stdlib/stats/base/nanrange":"1Du","@stdlib/stats-base-nanrange":"1Dv","@stdlib/stats/base/nanstdev":"1Dw","@stdlib/stats-base-nanstdev":"1Dx","@stdlib/stats/base/nanstdevch":"1Dy","@stdlib/stats-base-nanstdevch":"1Dz","@stdlib/stats/base/nanstdevpn":"1E0","@stdlib/stats-base-nanstdevpn":"1E1","@stdlib/stats/base/nanstdevtk":"1E2","@stdlib/stats-base-nanstdevtk":"1E3","@stdlib/stats/base/nanstdevwd":"1E4","@stdlib/stats-base-nanstdevwd":"1E5","@stdlib/stats/base/nanstdevyc":"1E6","@stdlib/stats-base-nanstdevyc":"1E7","@stdlib/stats/base/nanvariance":"1E8","@stdlib/stats-base-nanvariance":"1E9","@stdlib/stats/base/nanvariancech":"1EA","@stdlib/stats-base-nanvariancech":"1EB","@stdlib/stats/base/nanvariancepn":"1EC","@stdlib/stats-base-nanvariancepn":"1ED","@stdlib/stats/base/nanvariancetk":"1EE","@stdlib/stats-base-nanvariancetk":"1EF","@stdlib/stats/base/nanvariancewd":"1EG","@stdlib/stats-base-nanvariancewd":"1EH","@stdlib/stats/base/nanvarianceyc":"1EI","@stdlib/stats-base-nanvarianceyc":"1EJ","@stdlib/stats/base":"1EK","@stdlib/stats-base":"1EL","@stdlib/stats/base/range-by":"1EM","@stdlib/stats-base-range-by":"1EN","@stdlib/stats/base/range":"1EO","@stdlib/stats-base-range":"1EP","@stdlib/stats/base/scumax":"1EQ","@stdlib/stats-base-scumax":"1ER","@stdlib/stats/base/scumaxabs":"1ES","@stdlib/stats-base-scumaxabs":"1ET","@stdlib/stats/base/scumin":"1EU","@stdlib/stats-base-scumin":"1EV","@stdlib/stats/base/scuminabs":"1EW","@stdlib/stats-base-scuminabs":"1EX","@stdlib/stats/base/sdsmean":"1EY","@stdlib/stats-base-sdsmean":"1EZ","@stdlib/stats/base/sdsmeanors":"1Ea","@stdlib/stats-base-sdsmeanors":"1Eb","@stdlib/stats/base/sdsnanmean":"1Ec","@stdlib/stats-base-sdsnanmean":"1Ed","@stdlib/stats/base/sdsnanmeanors":"1Ee","@stdlib/stats-base-sdsnanmeanors":"1Ef","@stdlib/stats/base/smax":"1Eg","@stdlib/stats-base-smax":"1Eh","@stdlib/stats/base/smaxabs":"1Ei","@stdlib/stats-base-smaxabs":"1Ej","@stdlib/stats/base/smaxabssorted":"1Ek","@stdlib/stats-base-smaxabssorted":"1El","@stdlib/stats/base/smaxsorted":"1Em","@stdlib/stats-base-smaxsorted":"1En","@stdlib/stats/base/smean":"1Eo","@stdlib/stats-base-smean":"1Ep","@stdlib/stats/base/smeankbn":"1Eq","@stdlib/stats-base-smeankbn":"1Er","@stdlib/stats/base/smeankbn2":"1Es","@stdlib/stats-base-smeankbn2":"1Et","@stdlib/stats/base/smeanli":"1Eu","@stdlib/stats-base-smeanli":"1Ev","@stdlib/stats/base/smeanlipw":"1Ew","@stdlib/stats-base-smeanlipw":"1Ex","@stdlib/stats/base/smeanors":"1Ey","@stdlib/stats-base-smeanors":"1Ez","@stdlib/stats/base/smeanpn":"1F0","@stdlib/stats-base-smeanpn":"1F1","@stdlib/stats/base/smeanpw":"1F2","@stdlib/stats-base-smeanpw":"1F3","@stdlib/stats/base/smeanwd":"1F4","@stdlib/stats-base-smeanwd":"1F5","@stdlib/stats/base/smediansorted":"1F6","@stdlib/stats-base-smediansorted":"1F7","@stdlib/stats/base/smidrange":"1F8","@stdlib/stats-base-smidrange":"1F9","@stdlib/stats/base/smin":"1FA","@stdlib/stats-base-smin":"1FB","@stdlib/stats/base/sminabs":"1FC","@stdlib/stats-base-sminabs":"1FD","@stdlib/stats/base/sminsorted":"1FE","@stdlib/stats-base-sminsorted":"1FF","@stdlib/stats/base/smskmax":"1FG","@stdlib/stats-base-smskmax":"1FH","@stdlib/stats/base/smskmin":"1FI","@stdlib/stats-base-smskmin":"1FJ","@stdlib/stats/base/smskrange":"1FK","@stdlib/stats-base-smskrange":"1FL","@stdlib/stats/base/snanmax":"1FM","@stdlib/stats-base-snanmax":"1FN","@stdlib/stats/base/snanmaxabs":"1FO","@stdlib/stats-base-snanmaxabs":"1FP","@stdlib/stats/base/snanmean":"1FQ","@stdlib/stats-base-snanmean":"1FR","@stdlib/stats/base/snanmeanors":"1FS","@stdlib/stats-base-snanmeanors":"1FT","@stdlib/stats/base/snanmeanpn":"1FU","@stdlib/stats-base-snanmeanpn":"1FV","@stdlib/stats/base/snanmeanwd":"1FW","@stdlib/stats-base-snanmeanwd":"1FX","@stdlib/stats/base/snanmin":"1FY","@stdlib/stats-base-snanmin":"1FZ","@stdlib/stats/base/snanminabs":"1Fa","@stdlib/stats-base-snanminabs":"1Fb","@stdlib/stats/base/snanmskmax":"1Fc","@stdlib/stats-base-snanmskmax":"1Fd","@stdlib/stats/base/snanmskmin":"1Fe","@stdlib/stats-base-snanmskmin":"1Ff","@stdlib/stats/base/snanmskrange":"1Fg","@stdlib/stats-base-snanmskrange":"1Fh","@stdlib/stats/base/snanrange":"1Fi","@stdlib/stats-base-snanrange":"1Fj","@stdlib/stats/base/snanstdev":"1Fk","@stdlib/stats-base-snanstdev":"1Fl","@stdlib/stats/base/snanstdevch":"1Fm","@stdlib/stats-base-snanstdevch":"1Fn","@stdlib/stats/base/snanstdevpn":"1Fo","@stdlib/stats-base-snanstdevpn":"1Fp","@stdlib/stats/base/snanstdevtk":"1Fq","@stdlib/stats-base-snanstdevtk":"1Fr","@stdlib/stats/base/snanstdevwd":"1Fs","@stdlib/stats-base-snanstdevwd":"1Ft","@stdlib/stats/base/snanstdevyc":"1Fu","@stdlib/stats-base-snanstdevyc":"1Fv","@stdlib/stats/base/snanvariance":"1Fw","@stdlib/stats-base-snanvariance":"1Fx","@stdlib/stats/base/snanvariancech":"1Fy","@stdlib/stats-base-snanvariancech":"1Fz","@stdlib/stats/base/snanvariancepn":"1G0","@stdlib/stats-base-snanvariancepn":"1G1","@stdlib/stats/base/snanvariancetk":"1G2","@stdlib/stats-base-snanvariancetk":"1G3","@stdlib/stats/base/snanvariancewd":"1G4","@stdlib/stats-base-snanvariancewd":"1G5","@stdlib/stats/base/snanvarianceyc":"1G6","@stdlib/stats-base-snanvarianceyc":"1G7","@stdlib/stats/base/srange":"1G8","@stdlib/stats-base-srange":"1G9","@stdlib/stats/base/sstdev":"1GA","@stdlib/stats-base-sstdev":"1GB","@stdlib/stats/base/sstdevch":"1GC","@stdlib/stats-base-sstdevch":"1GD","@stdlib/stats/base/sstdevpn":"1GE","@stdlib/stats-base-sstdevpn":"1GF","@stdlib/stats/base/sstdevtk":"1GG","@stdlib/stats-base-sstdevtk":"1GH","@stdlib/stats/base/sstdevwd":"1GI","@stdlib/stats-base-sstdevwd":"1GJ","@stdlib/stats/base/sstdevyc":"1GK","@stdlib/stats-base-sstdevyc":"1GL","@stdlib/stats/base/stdev":"1GM","@stdlib/stats-base-stdev":"1GN","@stdlib/stats/base/stdevch":"1GO","@stdlib/stats-base-stdevch":"1GP","@stdlib/stats/base/stdevpn":"1GQ","@stdlib/stats-base-stdevpn":"1GR","@stdlib/stats/base/stdevtk":"1GS","@stdlib/stats-base-stdevtk":"1GT","@stdlib/stats/base/stdevwd":"1GU","@stdlib/stats-base-stdevwd":"1GV","@stdlib/stats/base/stdevyc":"1GW","@stdlib/stats-base-stdevyc":"1GX","@stdlib/stats/base/svariance":"1GY","@stdlib/stats-base-svariance":"1GZ","@stdlib/stats/base/svariancech":"1Ga","@stdlib/stats-base-svariancech":"1Gb","@stdlib/stats/base/svariancepn":"1Gc","@stdlib/stats-base-svariancepn":"1Gd","@stdlib/stats/base/svariancetk":"1Ge","@stdlib/stats-base-svariancetk":"1Gf","@stdlib/stats/base/svariancewd":"1Gg","@stdlib/stats-base-svariancewd":"1Gh","@stdlib/stats/base/svarianceyc":"1Gi","@stdlib/stats-base-svarianceyc":"1Gj","@stdlib/stats/base/variance":"1Gk","@stdlib/stats-base-variance":"1Gl","@stdlib/stats/base/variancech":"1Gm","@stdlib/stats-base-variancech":"1Gn","@stdlib/stats/base/variancepn":"1Go","@stdlib/stats-base-variancepn":"1Gp","@stdlib/stats/base/variancetk":"1Gq","@stdlib/stats-base-variancetk":"1Gr","@stdlib/stats/base/variancewd":"1Gs","@stdlib/stats-base-variancewd":"1Gt","@stdlib/stats/base/varianceyc":"1Gu","@stdlib/stats-base-varianceyc":"1Gv","@stdlib/stats/binomial-test":"1Gw","@stdlib/stats-binomial-test":"1Gx","@stdlib/stats/chi2gof":"1Gy","@stdlib/stats-chi2gof":"1Gz","@stdlib/stats/chi2test":"1H0","@stdlib/stats-chi2test":"1H1","@stdlib/stats/fligner-test":"1H2","@stdlib/stats-fligner-test":"1H3","@stdlib/stats/incr/apcorr":"1H4","@stdlib/stats-incr-apcorr":"1H5","@stdlib/stats/incr/count":"1H6","@stdlib/stats-incr-count":"1H7","@stdlib/stats/incr/covariance":"1H8","@stdlib/stats-incr-covariance":"1H9","@stdlib/stats/incr/covmat":"1HA","@stdlib/stats-incr-covmat":"1HB","@stdlib/stats/incr/cv":"1HC","@stdlib/stats-incr-cv":"1HD","@stdlib/stats/incr/ewmean":"1HE","@stdlib/stats-incr-ewmean":"1HF","@stdlib/stats/incr/ewstdev":"1HG","@stdlib/stats-incr-ewstdev":"1HH","@stdlib/stats/incr/ewvariance":"1HI","@stdlib/stats-incr-ewvariance":"1HJ","@stdlib/stats/incr/gmean":"1HK","@stdlib/stats-incr-gmean":"1HL","@stdlib/stats/incr/grubbs":"1HM","@stdlib/stats-incr-grubbs":"1HN","@stdlib/stats/incr/hmean":"1HO","@stdlib/stats-incr-hmean":"1HP","@stdlib/stats/incr/kurtosis":"1HQ","@stdlib/stats-incr-kurtosis":"1HR","@stdlib/stats/incr/maape":"1HS","@stdlib/stats-incr-maape":"1HT","@stdlib/stats/incr/mae":"1HU","@stdlib/stats-incr-mae":"1HV","@stdlib/stats/incr/mapcorr":"1HW","@stdlib/stats-incr-mapcorr":"1HX","@stdlib/stats/incr/mape":"1HY","@stdlib/stats-incr-mape":"1HZ","@stdlib/stats/incr/max":"1Ha","@stdlib/stats-incr-max":"1Hb","@stdlib/stats/incr/maxabs":"1Hc","@stdlib/stats-incr-maxabs":"1Hd","@stdlib/stats/incr/mcovariance":"1He","@stdlib/stats-incr-mcovariance":"1Hf","@stdlib/stats/incr/mcv":"1Hg","@stdlib/stats-incr-mcv":"1Hh","@stdlib/stats/incr/mda":"1Hi","@stdlib/stats-incr-mda":"1Hj","@stdlib/stats/incr/me":"1Hk","@stdlib/stats-incr-me":"1Hl","@stdlib/stats/incr/mean":"1Hm","@stdlib/stats-incr-mean":"1Hn","@stdlib/stats/incr/meanabs":"1Ho","@stdlib/stats-incr-meanabs":"1Hp","@stdlib/stats/incr/meanabs2":"1Hq","@stdlib/stats-incr-meanabs2":"1Hr","@stdlib/stats/incr/meanstdev":"1Hs","@stdlib/stats-incr-meanstdev":"1Ht","@stdlib/stats/incr/meanvar":"1Hu","@stdlib/stats-incr-meanvar":"1Hv","@stdlib/stats/incr/mgmean":"1Hw","@stdlib/stats-incr-mgmean":"1Hx","@stdlib/stats/incr/mgrubbs":"1Hy","@stdlib/stats-incr-mgrubbs":"1Hz","@stdlib/stats/incr/mhmean":"1I0","@stdlib/stats-incr-mhmean":"1I1","@stdlib/stats/incr/midrange":"1I2","@stdlib/stats-incr-midrange":"1I3","@stdlib/stats/incr/min":"1I4","@stdlib/stats-incr-min":"1I5","@stdlib/stats/incr/minabs":"1I6","@stdlib/stats-incr-minabs":"1I7","@stdlib/stats/incr/minmax":"1I8","@stdlib/stats-incr-minmax":"1I9","@stdlib/stats/incr/minmaxabs":"1IA","@stdlib/stats-incr-minmaxabs":"1IB","@stdlib/stats/incr/mmaape":"1IC","@stdlib/stats-incr-mmaape":"1ID","@stdlib/stats/incr/mmae":"1IE","@stdlib/stats-incr-mmae":"1IF","@stdlib/stats/incr/mmape":"1IG","@stdlib/stats-incr-mmape":"1IH","@stdlib/stats/incr/mmax":"1II","@stdlib/stats-incr-mmax":"1IJ","@stdlib/stats/incr/mmaxabs":"1IK","@stdlib/stats-incr-mmaxabs":"1IL","@stdlib/stats/incr/mmda":"1IM","@stdlib/stats-incr-mmda":"1IN","@stdlib/stats/incr/mme":"1IO","@stdlib/stats-incr-mme":"1IP","@stdlib/stats/incr/mmean":"1IQ","@stdlib/stats-incr-mmean":"1IR","@stdlib/stats/incr/mmeanabs":"1IS","@stdlib/stats-incr-mmeanabs":"1IT","@stdlib/stats/incr/mmeanabs2":"1IU","@stdlib/stats-incr-mmeanabs2":"1IV","@stdlib/stats/incr/mmeanstdev":"1IW","@stdlib/stats-incr-mmeanstdev":"1IX","@stdlib/stats/incr/mmeanvar":"1IY","@stdlib/stats-incr-mmeanvar":"1IZ","@stdlib/stats/incr/mmidrange":"1Ia","@stdlib/stats-incr-mmidrange":"1Ib","@stdlib/stats/incr/mmin":"1Ic","@stdlib/stats-incr-mmin":"1Id","@stdlib/stats/incr/mminabs":"1Ie","@stdlib/stats-incr-mminabs":"1If","@stdlib/stats/incr/mminmax":"1Ig","@stdlib/stats-incr-mminmax":"1Ih","@stdlib/stats/incr/mminmaxabs":"1Ii","@stdlib/stats-incr-mminmaxabs":"1Ij","@stdlib/stats/incr/mmpe":"1Ik","@stdlib/stats-incr-mmpe":"1Il","@stdlib/stats/incr/mmse":"1Im","@stdlib/stats-incr-mmse":"1In","@stdlib/stats/incr/mpcorr":"1Io","@stdlib/stats-incr-mpcorr":"1Ip","@stdlib/stats/incr/mpcorr2":"1Iq","@stdlib/stats-incr-mpcorr2":"1Ir","@stdlib/stats/incr/mpcorrdist":"1Is","@stdlib/stats-incr-mpcorrdist":"1It","@stdlib/stats/incr/mpe":"1Iu","@stdlib/stats-incr-mpe":"1Iv","@stdlib/stats/incr/mprod":"1Iw","@stdlib/stats-incr-mprod":"1Ix","@stdlib/stats/incr/mrange":"1Iy","@stdlib/stats-incr-mrange":"1Iz","@stdlib/stats/incr/mrmse":"1J0","@stdlib/stats-incr-mrmse":"1J1","@stdlib/stats/incr/mrss":"1J2","@stdlib/stats-incr-mrss":"1J3","@stdlib/stats/incr/mse":"1J4","@stdlib/stats-incr-mse":"1J5","@stdlib/stats/incr/mstdev":"1J6","@stdlib/stats-incr-mstdev":"1J7","@stdlib/stats/incr/msum":"1J8","@stdlib/stats-incr-msum":"1J9","@stdlib/stats/incr/msumabs":"1JA","@stdlib/stats-incr-msumabs":"1JB","@stdlib/stats/incr/msumabs2":"1JC","@stdlib/stats-incr-msumabs2":"1JD","@stdlib/stats/incr/msummary":"1JE","@stdlib/stats-incr-msummary":"1JF","@stdlib/stats/incr/msumprod":"1JG","@stdlib/stats-incr-msumprod":"1JH","@stdlib/stats/incr/mvariance":"1JI","@stdlib/stats-incr-mvariance":"1JJ","@stdlib/stats/incr/mvmr":"1JK","@stdlib/stats-incr-mvmr":"1JL","@stdlib/stats/incr/nancount":"1JM","@stdlib/stats-incr-nancount":"1JN","@stdlib/stats/incr/nansum":"1JO","@stdlib/stats-incr-nansum":"1JP","@stdlib/stats/incr/nansumabs":"1JQ","@stdlib/stats-incr-nansumabs":"1JR","@stdlib/stats/incr/nansumabs2":"1JS","@stdlib/stats-incr-nansumabs2":"1JT","@stdlib/stats/incr":"1JU","@stdlib/stats-incr":"1JV","@stdlib/stats/incr/pcorr":"1JW","@stdlib/stats-incr-pcorr":"1JX","@stdlib/stats/incr/pcorr2":"1JY","@stdlib/stats-incr-pcorr2":"1JZ","@stdlib/stats/incr/pcorrdist":"1Ja","@stdlib/stats-incr-pcorrdist":"1Jb","@stdlib/stats/incr/pcorrdistmat":"1Jc","@stdlib/stats-incr-pcorrdistmat":"1Jd","@stdlib/stats/incr/pcorrmat":"1Je","@stdlib/stats-incr-pcorrmat":"1Jf","@stdlib/stats/incr/prod":"1Jg","@stdlib/stats-incr-prod":"1Jh","@stdlib/stats/incr/range":"1Ji","@stdlib/stats-incr-range":"1Jj","@stdlib/stats/incr/rmse":"1Jk","@stdlib/stats-incr-rmse":"1Jl","@stdlib/stats/incr/rss":"1Jm","@stdlib/stats-incr-rss":"1Jn","@stdlib/stats/incr/skewness":"1Jo","@stdlib/stats-incr-skewness":"1Jp","@stdlib/stats/incr/stdev":"1Jq","@stdlib/stats-incr-stdev":"1Jr","@stdlib/stats/incr/sum":"1Js","@stdlib/stats-incr-sum":"1Jt","@stdlib/stats/incr/sumabs":"1Ju","@stdlib/stats-incr-sumabs":"1Jv","@stdlib/stats/incr/sumabs2":"1Jw","@stdlib/stats-incr-sumabs2":"1Jx","@stdlib/stats/incr/summary":"1Jy","@stdlib/stats-incr-summary":"1Jz","@stdlib/stats/incr/sumprod":"1K0","@stdlib/stats-incr-sumprod":"1K1","@stdlib/stats/incr/variance":"1K2","@stdlib/stats-incr-variance":"1K3","@stdlib/stats/incr/vmr":"1K4","@stdlib/stats-incr-vmr":"1K5","@stdlib/stats/incr/wmean":"1K6","@stdlib/stats-incr-wmean":"1K7","@stdlib/stats/iter/cugmean":"1K8","@stdlib/stats-iter-cugmean":"1K9","@stdlib/stats/iter/cuhmean":"1KA","@stdlib/stats-iter-cuhmean":"1KB","@stdlib/stats/iter/cumax":"1KC","@stdlib/stats-iter-cumax":"1KD","@stdlib/stats/iter/cumaxabs":"1KE","@stdlib/stats-iter-cumaxabs":"1KF","@stdlib/stats/iter/cumean":"1KG","@stdlib/stats-iter-cumean":"1KH","@stdlib/stats/iter/cumeanabs":"1KI","@stdlib/stats-iter-cumeanabs":"1KJ","@stdlib/stats/iter/cumeanabs2":"1KK","@stdlib/stats-iter-cumeanabs2":"1KL","@stdlib/stats/iter/cumidrange":"1KM","@stdlib/stats-iter-cumidrange":"1KN","@stdlib/stats/iter/cumin":"1KO","@stdlib/stats-iter-cumin":"1KP","@stdlib/stats/iter/cuminabs":"1KQ","@stdlib/stats-iter-cuminabs":"1KR","@stdlib/stats/iter/cuprod":"1KS","@stdlib/stats-iter-cuprod":"1KT","@stdlib/stats/iter/curange":"1KU","@stdlib/stats-iter-curange":"1KV","@stdlib/stats/iter/cusum":"1KW","@stdlib/stats-iter-cusum":"1KX","@stdlib/stats/iter/cusumabs":"1KY","@stdlib/stats-iter-cusumabs":"1KZ","@stdlib/stats/iter/cusumabs2":"1Ka","@stdlib/stats-iter-cusumabs2":"1Kb","@stdlib/stats/iter/max":"1Kc","@stdlib/stats-iter-max":"1Kd","@stdlib/stats/iter/maxabs":"1Ke","@stdlib/stats-iter-maxabs":"1Kf","@stdlib/stats/iter/mean":"1Kg","@stdlib/stats-iter-mean":"1Kh","@stdlib/stats/iter/meanabs":"1Ki","@stdlib/stats-iter-meanabs":"1Kj","@stdlib/stats/iter/meanabs2":"1Kk","@stdlib/stats-iter-meanabs2":"1Kl","@stdlib/stats/iter/midrange":"1Km","@stdlib/stats-iter-midrange":"1Kn","@stdlib/stats/iter/min":"1Ko","@stdlib/stats-iter-min":"1Kp","@stdlib/stats/iter/minabs":"1Kq","@stdlib/stats-iter-minabs":"1Kr","@stdlib/stats/iter/mmax":"1Ks","@stdlib/stats-iter-mmax":"1Kt","@stdlib/stats/iter/mmaxabs":"1Ku","@stdlib/stats-iter-mmaxabs":"1Kv","@stdlib/stats/iter/mmean":"1Kw","@stdlib/stats-iter-mmean":"1Kx","@stdlib/stats/iter/mmeanabs":"1Ky","@stdlib/stats-iter-mmeanabs":"1Kz","@stdlib/stats/iter/mmeanabs2":"1L0","@stdlib/stats-iter-mmeanabs2":"1L1","@stdlib/stats/iter/mmidrange":"1L2","@stdlib/stats-iter-mmidrange":"1L3","@stdlib/stats/iter/mmin":"1L4","@stdlib/stats-iter-mmin":"1L5","@stdlib/stats/iter/mminabs":"1L6","@stdlib/stats-iter-mminabs":"1L7","@stdlib/stats/iter/mprod":"1L8","@stdlib/stats-iter-mprod":"1L9","@stdlib/stats/iter/mrange":"1LA","@stdlib/stats-iter-mrange":"1LB","@stdlib/stats/iter/msum":"1LC","@stdlib/stats-iter-msum":"1LD","@stdlib/stats/iter/msumabs":"1LE","@stdlib/stats-iter-msumabs":"1LF","@stdlib/stats/iter/msumabs2":"1LG","@stdlib/stats-iter-msumabs2":"1LH","@stdlib/stats/iter":"1LI","@stdlib/stats-iter":"1LJ","@stdlib/stats/iter/prod":"1LK","@stdlib/stats-iter-prod":"1LL","@stdlib/stats/iter/range":"1LM","@stdlib/stats-iter-range":"1LN","@stdlib/stats/iter/stdev":"1LO","@stdlib/stats-iter-stdev":"1LP","@stdlib/stats/iter/sum":"1LQ","@stdlib/stats-iter-sum":"1LR","@stdlib/stats/iter/sumabs":"1LS","@stdlib/stats-iter-sumabs":"1LT","@stdlib/stats/iter/sumabs2":"1LU","@stdlib/stats-iter-sumabs2":"1LV","@stdlib/stats/iter/variance":"1LW","@stdlib/stats-iter-variance":"1LX","@stdlib/stats/kde2d":"1LY","@stdlib/stats-kde2d":"1LZ","@stdlib/stats/kruskal-test":"1La","@stdlib/stats-kruskal-test":"1Lb","@stdlib/stats/kstest":"1Lc","@stdlib/stats-kstest":"1Ld","@stdlib/stats/levene-test":"1Le","@stdlib/stats-levene-test":"1Lf","@stdlib/stats/lowess":"1Lg","@stdlib/stats-lowess":"1Lh","@stdlib/stats":"1Lj","@stdlib/stats/padjust":"1Lk","@stdlib/stats-padjust":"1Ll","@stdlib/stats/pcorrtest":"1Lm","@stdlib/stats-pcorrtest":"1Ln","@stdlib/stats/ranks":"1Lo","@stdlib/stats-ranks":"1Lp","@stdlib/stats/ttest":"1Lq","@stdlib/stats-ttest":"1Lr","@stdlib/stats/ttest2":"1Ls","@stdlib/stats-ttest2":"1Lt","@stdlib/stats/vartest":"1Lu","@stdlib/stats-vartest":"1Lv","@stdlib/stats/wilcoxon":"1Lw","@stdlib/stats-wilcoxon":"1Lx","@stdlib/stats/ztest":"1Ly","@stdlib/stats-ztest":"1Lz","@stdlib/stats/ztest2":"1M0","@stdlib/stats-ztest2":"1M1","@stdlib/streams/node/debug-sink":"1M2","@stdlib/streams-node-debug-sink":"1M3","@stdlib/streams/node/debug":"1M4","@stdlib/streams-node-debug":"1M5","@stdlib/streams/node/empty":"1M6","@stdlib/streams-node-empty":"1M7","@stdlib/streams/node/from-array":"1M8","@stdlib/streams-node-from-array":"1M9","@stdlib/streams/node/from-circular-array":"1MA","@stdlib/streams-node-from-circular-array":"1MB","@stdlib/streams/node/from-constant":"1MC","@stdlib/streams-node-from-constant":"1MD","@stdlib/streams/node/from-iterator":"1ME","@stdlib/streams-node-from-iterator":"1MF","@stdlib/streams/node/from-strided-array":"1MG","@stdlib/streams-node-from-strided-array":"1MH","@stdlib/streams/node/inspect-sink":"1MI","@stdlib/streams-node-inspect-sink":"1MJ","@stdlib/streams/node/inspect":"1MK","@stdlib/streams-node-inspect":"1ML","@stdlib/streams/node/join":"1MM","@stdlib/streams-node-join":"1MN","@stdlib/streams/node":"1MO","@stdlib/streams-node":"1MP","@stdlib/streams/node/split":"1MQ","@stdlib/streams-node-split":"1MR","@stdlib/streams/node/stderr":"1MS","@stdlib/streams-node-stderr":"1MT","@stdlib/streams/node/stdin":"1MU","@stdlib/streams-node-stdin":"1MV","@stdlib/streams/node/stdout":"1MW","@stdlib/streams-node-stdout":"1MX","@stdlib/streams/node/transform":"1MY","@stdlib/streams-node-transform":"1MZ","@stdlib/streams":"1Mb","@stdlib/strided/base/binary-addon-dispatch":"1Mc","@stdlib/strided-base-binary-addon-dispatch":"1Md","@stdlib/strided/base/binary-dtype-signatures":"1Me","@stdlib/strided-base-binary-dtype-signatures":"1Mf","@stdlib/strided/base/binary-signature-callbacks":"1Mg","@stdlib/strided-base-binary-signature-callbacks":"1Mh","@stdlib/strided/base/binary":"1Mi","@stdlib/strided-base-binary":"1Mj","@stdlib/strided/base/cmap":"1Mk","@stdlib/strided-base-cmap":"1Ml","@stdlib/strided/base/dmap":"1Mm","@stdlib/strided-base-dmap":"1Mn","@stdlib/strided/base/dmap2":"1Mo","@stdlib/strided-base-dmap2":"1Mp","@stdlib/strided/base/dmskmap":"1Mq","@stdlib/strided-base-dmskmap":"1Mr","@stdlib/strided/base/dmskmap2":"1Ms","@stdlib/strided-base-dmskmap2":"1Mt","@stdlib/strided/base/dtype-enum2str":"1Mu","@stdlib/strided-base-dtype-enum2str":"1Mv","@stdlib/strided/base/dtype-resolve-enum":"1Mw","@stdlib/strided-base-dtype-resolve-enum":"1Mx","@stdlib/strided/base/dtype-resolve-str":"1My","@stdlib/strided-base-dtype-resolve-str":"1Mz","@stdlib/strided/base/dtype-str2enum":"1N0","@stdlib/strided-base-dtype-str2enum":"1N1","@stdlib/strided/base/function-object":"1N2","@stdlib/strided-base-function-object":"1N3","@stdlib/strided/base/map-by":"1N4","@stdlib/strided-base-map-by":"1N5","@stdlib/strided/base/map-by2":"1N6","@stdlib/strided-base-map-by2":"1N7","@stdlib/strided/base/max-view-buffer-index":"1N8","@stdlib/strided-base-max-view-buffer-index":"1N9","@stdlib/strided/base/meta-data-props":"1NA","@stdlib/strided-base-meta-data-props":"1NB","@stdlib/strided/base/min-view-buffer-index":"1NC","@stdlib/strided-base-min-view-buffer-index":"1ND","@stdlib/strided/base/mskunary":"1NE","@stdlib/strided-base-mskunary":"1NF","@stdlib/strided/base/nullary":"1NG","@stdlib/strided-base-nullary":"1NH","@stdlib/strided/base/offset-view":"1NI","@stdlib/strided-base-offset-view":"1NJ","@stdlib/strided/base":"1NK","@stdlib/strided-base":"1NL","@stdlib/strided/base/quaternary":"1NM","@stdlib/strided-base-quaternary":"1NN","@stdlib/strided/base/quinary":"1NO","@stdlib/strided-base-quinary":"1NP","@stdlib/strided/base/reinterpret-complex128":"1NQ","@stdlib/strided-base-reinterpret-complex128":"1NR","@stdlib/strided/base/reinterpret-complex64":"1NS","@stdlib/strided-base-reinterpret-complex64":"1NT","@stdlib/strided/base/smap":"1NU","@stdlib/strided-base-smap":"1NV","@stdlib/strided/base/smap2":"1NW","@stdlib/strided-base-smap2":"1NX","@stdlib/strided/base/smskmap":"1NY","@stdlib/strided-base-smskmap":"1NZ","@stdlib/strided/base/smskmap2":"1Na","@stdlib/strided-base-smskmap2":"1Nb","@stdlib/strided/base/ternary":"1Nc","@stdlib/strided-base-ternary":"1Nd","@stdlib/strided/base/unary-addon-dispatch":"1Ne","@stdlib/strided-base-unary-addon-dispatch":"1Nf","@stdlib/strided/base/unary":"1Ng","@stdlib/strided-base-unary":"1Nh","@stdlib/strided/base/zmap":"1Ni","@stdlib/strided-base-zmap":"1Nj","@stdlib/strided/common":"1Nk","@stdlib/strided-common":"1Nl","@stdlib/strided/dispatch":"1Nm","@stdlib/strided-dispatch":"1Nn","@stdlib/strided/dtypes":"1No","@stdlib/strided-dtypes":"1Np","@stdlib/strided/napi/addon-arguments":"1Nq","@stdlib/strided-napi-addon-arguments":"1Nr","@stdlib/strided/napi/binary":"1Ns","@stdlib/strided-napi-binary":"1Nt","@stdlib/strided/napi/cmap":"1Nu","@stdlib/strided-napi-cmap":"1Nv","@stdlib/strided/napi/dmap":"1Nw","@stdlib/strided-napi-dmap":"1Nx","@stdlib/strided/napi/dmap2":"1Ny","@stdlib/strided-napi-dmap2":"1Nz","@stdlib/strided/napi/dmskmap":"1O0","@stdlib/strided-napi-dmskmap":"1O1","@stdlib/strided/napi/dmskmap2":"1O2","@stdlib/strided-napi-dmskmap2":"1O3","@stdlib/strided/napi/mskunary":"1O4","@stdlib/strided-napi-mskunary":"1O5","@stdlib/strided/napi":"1O6","@stdlib/strided-napi":"1O7","@stdlib/strided/napi/smap":"1O8","@stdlib/strided-napi-smap":"1O9","@stdlib/strided/napi/smap2":"1OA","@stdlib/strided-napi-smap2":"1OB","@stdlib/strided/napi/smskmap":"1OC","@stdlib/strided-napi-smskmap":"1OD","@stdlib/strided/napi/smskmap2":"1OE","@stdlib/strided-napi-smskmap2":"1OF","@stdlib/strided/napi/unary":"1OG","@stdlib/strided-napi-unary":"1OH","@stdlib/strided/napi/zmap":"1OI","@stdlib/strided-napi-zmap":"1OJ","@stdlib/strided":"1OL","@stdlib/string/acronym":"1OM","@stdlib/string-acronym":"1ON","@stdlib/string/base/format-interpolate":"1OO","@stdlib/string-base-format-interpolate":"1OP","@stdlib/string/base/format-tokenize":"1OQ","@stdlib/string-base-format-tokenize":"1OR","@stdlib/string/base":"1OS","@stdlib/string-base":"1OT","@stdlib/string/camelcase":"1OU","@stdlib/string-camelcase":"1OV","@stdlib/string/capitalize":"1OW","@stdlib/string-capitalize":"1OX","@stdlib/string/code-point-at":"1OY","@stdlib/string-code-point-at":"1OZ","@stdlib/string/constantcase":"1Oa","@stdlib/string-constantcase":"1Ob","@stdlib/string/ends-with":"1Oc","@stdlib/string-ends-with":"1Od","@stdlib/string/format":"1Oe","@stdlib/string-format":"1Of","@stdlib/string/from-code-point":"1Og","@stdlib/string-from-code-point":"1Oh","@stdlib/string/kebabcase":"1Oi","@stdlib/string-kebabcase":"1Oj","@stdlib/string/left-pad":"1Ok","@stdlib/string-left-pad":"1Ol","@stdlib/string/left-trim-n":"1Om","@stdlib/string-left-trim-n":"1On","@stdlib/string/left-trim":"1Oo","@stdlib/string-left-trim":"1Op","@stdlib/string/lowercase":"1Oq","@stdlib/string-lowercase":"1Or","@stdlib/string/next-grapheme-cluster-break":"1Os","@stdlib/string-next-grapheme-cluster-break":"1Ot","@stdlib/string/num-grapheme-clusters":"1Ou","@stdlib/string-num-grapheme-clusters":"1Ov","@stdlib/string":"1Ox","@stdlib/string/pad":"1Oy","@stdlib/string-pad":"1Oz","@stdlib/string/pascalcase":"1P0","@stdlib/string-pascalcase":"1P1","@stdlib/string/percent-encode":"1P2","@stdlib/string-percent-encode":"1P3","@stdlib/string/prev-grapheme-cluster-break":"1P4","@stdlib/string-prev-grapheme-cluster-break":"1P5","@stdlib/string/remove-first":"1P6","@stdlib/string-remove-first":"1P7","@stdlib/string/remove-last":"1P8","@stdlib/string-remove-last":"1P9","@stdlib/string/remove-punctuation":"1PA","@stdlib/string-remove-punctuation":"1PB","@stdlib/string/remove-utf8-bom":"1PC","@stdlib/string-remove-utf8-bom":"1PD","@stdlib/string/remove-words":"1PE","@stdlib/string-remove-words":"1PF","@stdlib/string/repeat":"1PG","@stdlib/string-repeat":"1PH","@stdlib/string/replace":"1PI","@stdlib/string-replace":"1PJ","@stdlib/string/reverse":"1PK","@stdlib/string-reverse":"1PL","@stdlib/string/right-pad":"1PM","@stdlib/string-right-pad":"1PN","@stdlib/string/right-trim-n":"1PO","@stdlib/string-right-trim-n":"1PP","@stdlib/string/right-trim":"1PQ","@stdlib/string-right-trim":"1PR","@stdlib/string/snakecase":"1PS","@stdlib/string-snakecase":"1PT","@stdlib/string/split-grapheme-clusters":"1PU","@stdlib/string-split-grapheme-clusters":"1PV","@stdlib/string/startcase":"1PW","@stdlib/string-startcase":"1PX","@stdlib/string/starts-with":"1PY","@stdlib/string-starts-with":"1PZ","@stdlib/string/substring-after-last":"1Pa","@stdlib/string-substring-after-last":"1Pb","@stdlib/string/substring-after":"1Pc","@stdlib/string-substring-after":"1Pd","@stdlib/string/substring-before-last":"1Pe","@stdlib/string-substring-before-last":"1Pf","@stdlib/string/substring-before":"1Pg","@stdlib/string-substring-before":"1Ph","@stdlib/string/tools/grapheme-cluster-break":"1Pi","@stdlib/string-tools-grapheme-cluster-break":"1Pj","@stdlib/string/tools":"1Pk","@stdlib/string-tools":"1Pl","@stdlib/string/trim":"1Pm","@stdlib/string-trim":"1Pn","@stdlib/string/truncate-middle":"1Po","@stdlib/string-truncate-middle":"1Pp","@stdlib/string/truncate":"1Pq","@stdlib/string-truncate":"1Pr","@stdlib/string/uncapitalize":"1Ps","@stdlib/string-uncapitalize":"1Pt","@stdlib/string/uppercase":"1Pu","@stdlib/string-uppercase":"1Pv","@stdlib/string/utf16-to-utf8-array":"1Pw","@stdlib/string-utf16-to-utf8-array":"1Px","@stdlib/symbol/async-iterator":"1Py","@stdlib/symbol-async-iterator":"1Pz","@stdlib/symbol/ctor":"1Q0","@stdlib/symbol-ctor":"1Q1","@stdlib/symbol/iterator":"1Q2","@stdlib/symbol-iterator":"1Q3","@stdlib/symbol":"1Q5","@stdlib/time/day-of-quarter":"1Q6","@stdlib/time-day-of-quarter":"1Q7","@stdlib/time/day-of-year":"1Q8","@stdlib/time-day-of-year":"1Q9","@stdlib/time/days-in-month":"1QA","@stdlib/time-days-in-month":"1QB","@stdlib/time/days-in-year":"1QC","@stdlib/time-days-in-year":"1QD","@stdlib/time/hours-in-month":"1QE","@stdlib/time-hours-in-month":"1QF","@stdlib/time/hours-in-year":"1QG","@stdlib/time-hours-in-year":"1QH","@stdlib/time/iso-weeks-in-year":"1QI","@stdlib/time-iso-weeks-in-year":"1QJ","@stdlib/time/minutes-in-month":"1QK","@stdlib/time-minutes-in-month":"1QL","@stdlib/time/minutes-in-year":"1QM","@stdlib/time-minutes-in-year":"1QN","@stdlib/time/now":"1QO","@stdlib/time-now":"1QP","@stdlib/time":"1QR","@stdlib/time/quarter-of-year":"1QS","@stdlib/time-quarter-of-year":"1QT","@stdlib/time/seconds-in-month":"1QU","@stdlib/time-seconds-in-month":"1QV","@stdlib/time/seconds-in-year":"1QW","@stdlib/time-seconds-in-year":"1QX","@stdlib/time/tic":"1QY","@stdlib/time-tic":"1QZ","@stdlib/time/toc":"1Qa","@stdlib/time-toc":"1Qb","@stdlib/types":"1Qd","@stdlib/utils/any-by-right":"1Qe","@stdlib/utils-any-by-right":"1Qf","@stdlib/utils/any-by":"1Qg","@stdlib/utils-any-by":"1Qh","@stdlib/utils/any":"1Qi","@stdlib/utils-any":"1Qj","@stdlib/utils/append":"1Qk","@stdlib/utils-append":"1Ql","@stdlib/utils/argument-function":"1Qm","@stdlib/utils-argument-function":"1Qn","@stdlib/utils/async/any-by-right":"1Qo","@stdlib/utils-async-any-by-right":"1Qp","@stdlib/utils/async/any-by":"1Qq","@stdlib/utils-async-any-by":"1Qr","@stdlib/utils/async/bifurcate-by":"1Qs","@stdlib/utils-async-bifurcate-by":"1Qt","@stdlib/utils/async/compose":"1Qu","@stdlib/utils-async-compose":"1Qv","@stdlib/utils/async/count-by":"1Qw","@stdlib/utils-async-count-by":"1Qx","@stdlib/utils/async/do-until":"1Qy","@stdlib/utils-async-do-until":"1Qz","@stdlib/utils/async/do-while":"1R0","@stdlib/utils-async-do-while":"1R1","@stdlib/utils/async/every-by-right":"1R2","@stdlib/utils-async-every-by-right":"1R3","@stdlib/utils/async/every-by":"1R4","@stdlib/utils-async-every-by":"1R5","@stdlib/utils/async/for-each-right":"1R6","@stdlib/utils-async-for-each-right":"1R7","@stdlib/utils/async/for-each":"1R8","@stdlib/utils-async-for-each":"1R9","@stdlib/utils/async/function-sequence":"1RA","@stdlib/utils-async-function-sequence":"1RB","@stdlib/utils/async/group-by":"1RC","@stdlib/utils-async-group-by":"1RD","@stdlib/utils/async/if-else":"1RE","@stdlib/utils-async-if-else":"1RF","@stdlib/utils/async/if-then":"1RG","@stdlib/utils-async-if-then":"1RH","@stdlib/utils/async/inmap-right":"1RI","@stdlib/utils-async-inmap-right":"1RJ","@stdlib/utils/async/inmap":"1RK","@stdlib/utils-async-inmap":"1RL","@stdlib/utils/async/map-function":"1RM","@stdlib/utils-async-map-function":"1RN","@stdlib/utils/async/map-keys":"1RO","@stdlib/utils-async-map-keys":"1RP","@stdlib/utils/async/map-values":"1RQ","@stdlib/utils-async-map-values":"1RR","@stdlib/utils/async/none-by-right":"1RS","@stdlib/utils-async-none-by-right":"1RT","@stdlib/utils/async/none-by":"1RU","@stdlib/utils-async-none-by":"1RV","@stdlib/utils/async":"1RW","@stdlib/utils-async":"1RX","@stdlib/utils/async/reduce-right":"1RY","@stdlib/utils-async-reduce-right":"1RZ","@stdlib/utils/async/reduce":"1Ra","@stdlib/utils-async-reduce":"1Rb","@stdlib/utils/async/series-waterfall":"1Rc","@stdlib/utils-async-series-waterfall":"1Rd","@stdlib/utils/async/some-by-right":"1Re","@stdlib/utils-async-some-by-right":"1Rf","@stdlib/utils/async/some-by":"1Rg","@stdlib/utils-async-some-by":"1Rh","@stdlib/utils/async/tabulate-by":"1Ri","@stdlib/utils-async-tabulate-by":"1Rj","@stdlib/utils/async/try-catch":"1Rk","@stdlib/utils-async-try-catch":"1Rl","@stdlib/utils/async/try-then":"1Rm","@stdlib/utils-async-try-then":"1Rn","@stdlib/utils/async/until":"1Ro","@stdlib/utils-async-until":"1Rp","@stdlib/utils/async/while":"1Rq","@stdlib/utils-async-while":"1Rr","@stdlib/utils/bifurcate-by":"1Rs","@stdlib/utils-bifurcate-by":"1Rt","@stdlib/utils/bifurcate-in":"1Ru","@stdlib/utils-bifurcate-in":"1Rv","@stdlib/utils/bifurcate-own":"1Rw","@stdlib/utils-bifurcate-own":"1Rx","@stdlib/utils/bifurcate":"1Ry","@stdlib/utils-bifurcate":"1Rz","@stdlib/utils/capitalize-keys":"1S0","@stdlib/utils-capitalize-keys":"1S1","@stdlib/utils/circular-buffer":"1S2","@stdlib/utils-circular-buffer":"1S3","@stdlib/utils/common-keys-in":"1S4","@stdlib/utils-common-keys-in":"1S5","@stdlib/utils/common-keys":"1S6","@stdlib/utils-common-keys":"1S7","@stdlib/utils/compact-adjacency-matrix":"1S8","@stdlib/utils-compact-adjacency-matrix":"1S9","@stdlib/utils/compose":"1SA","@stdlib/utils-compose":"1SB","@stdlib/utils/constant-function":"1SC","@stdlib/utils-constant-function":"1SD","@stdlib/utils/constructor-name":"1SE","@stdlib/utils-constructor-name":"1SF","@stdlib/utils/convert-path":"1SG","@stdlib/utils-convert-path":"1SH","@stdlib/utils/copy":"1SI","@stdlib/utils-copy":"1SJ","@stdlib/utils/count-by":"1SK","@stdlib/utils-count-by":"1SL","@stdlib/utils/curry-right":"1SM","@stdlib/utils-curry-right":"1SN","@stdlib/utils/curry":"1SO","@stdlib/utils-curry":"1SP","@stdlib/utils/deep-get":"1SQ","@stdlib/utils-deep-get":"1SR","@stdlib/utils/deep-pluck":"1SS","@stdlib/utils-deep-pluck":"1ST","@stdlib/utils/deep-set":"1SU","@stdlib/utils-deep-set":"1SV","@stdlib/utils/define-configurable-read-only-accessor":"1SW","@stdlib/utils-define-configurable-read-only-accessor":"1SX","@stdlib/utils/define-configurable-read-only-property":"1SY","@stdlib/utils-define-configurable-read-only-property":"1SZ","@stdlib/utils/define-configurable-read-write-accessor":"1Sa","@stdlib/utils-define-configurable-read-write-accessor":"1Sb","@stdlib/utils/define-configurable-write-only-accessor":"1Sc","@stdlib/utils-define-configurable-write-only-accessor":"1Sd","@stdlib/utils/define-memoized-configurable-read-only-property":"1Se","@stdlib/utils-define-memoized-configurable-read-only-property":"1Sf","@stdlib/utils/define-memoized-property":"1Sg","@stdlib/utils-define-memoized-property":"1Sh","@stdlib/utils/define-memoized-read-only-property":"1Si","@stdlib/utils-define-memoized-read-only-property":"1Sj","@stdlib/utils/define-nonenumerable-property":"1Sk","@stdlib/utils-define-nonenumerable-property":"1Sl","@stdlib/utils/define-nonenumerable-read-only-accessor":"1Sm","@stdlib/utils-define-nonenumerable-read-only-accessor":"1Sn","@stdlib/utils/define-nonenumerable-read-only-property":"1So","@stdlib/utils-define-nonenumerable-read-only-property":"1Sp","@stdlib/utils/define-nonenumerable-read-write-accessor":"1Sq","@stdlib/utils-define-nonenumerable-read-write-accessor":"1Sr","@stdlib/utils/define-nonenumerable-write-only-accessor":"1Ss","@stdlib/utils-define-nonenumerable-write-only-accessor":"1St","@stdlib/utils/define-properties":"1Su","@stdlib/utils-define-properties":"1Sv","@stdlib/utils/define-property":"1Sw","@stdlib/utils-define-property":"1Sx","@stdlib/utils/define-read-only-accessor":"1Sy","@stdlib/utils-define-read-only-accessor":"1Sz","@stdlib/utils/define-read-only-property":"1T0","@stdlib/utils-define-read-only-property":"1T1","@stdlib/utils/define-read-write-accessor":"1T2","@stdlib/utils-define-read-write-accessor":"1T3","@stdlib/utils/define-write-only-accessor":"1T4","@stdlib/utils-define-write-only-accessor":"1T5","@stdlib/utils/dirname":"1T6","@stdlib/utils-dirname":"1T7","@stdlib/utils/do-until-each-right":"1T8","@stdlib/utils-do-until-each-right":"1T9","@stdlib/utils/do-until-each":"1TA","@stdlib/utils-do-until-each":"1TB","@stdlib/utils/do-until":"1TC","@stdlib/utils-do-until":"1TD","@stdlib/utils/do-while-each-right":"1TE","@stdlib/utils-do-while-each-right":"1TF","@stdlib/utils/do-while-each":"1TG","@stdlib/utils-do-while-each":"1TH","@stdlib/utils/do-while":"1TI","@stdlib/utils-do-while":"1TJ","@stdlib/utils/doubly-linked-list":"1TK","@stdlib/utils-doubly-linked-list":"1TL","@stdlib/utils/entries-in":"1TM","@stdlib/utils-entries-in":"1TN","@stdlib/utils/entries":"1TO","@stdlib/utils-entries":"1TP","@stdlib/utils/enumerable-properties-in":"1TQ","@stdlib/utils-enumerable-properties-in":"1TR","@stdlib/utils/enumerable-properties":"1TS","@stdlib/utils-enumerable-properties":"1TT","@stdlib/utils/enumerable-property-symbols-in":"1TU","@stdlib/utils-enumerable-property-symbols-in":"1TV","@stdlib/utils/enumerable-property-symbols":"1TW","@stdlib/utils-enumerable-property-symbols":"1TX","@stdlib/utils/escape-regexp-string":"1TY","@stdlib/utils-escape-regexp-string":"1TZ","@stdlib/utils/eval":"1Ta","@stdlib/utils-eval":"1Tb","@stdlib/utils/every-by-right":"1Tc","@stdlib/utils-every-by-right":"1Td","@stdlib/utils/every-by":"1Te","@stdlib/utils-every-by":"1Tf","@stdlib/utils/every":"1Tg","@stdlib/utils-every":"1Th","@stdlib/utils/extname":"1Ti","@stdlib/utils-extname":"1Tj","@stdlib/utils/fifo":"1Tk","@stdlib/utils-fifo":"1Tl","@stdlib/utils/filter-arguments":"1Tm","@stdlib/utils-filter-arguments":"1Tn","@stdlib/utils/find":"1To","@stdlib/utils-find":"1Tp","@stdlib/utils/flatten-array":"1Tq","@stdlib/utils-flatten-array":"1Tr","@stdlib/utils/flatten-object":"1Ts","@stdlib/utils-flatten-object":"1Tt","@stdlib/utils/for-each-right":"1Tu","@stdlib/utils-for-each-right":"1Tv","@stdlib/utils/for-each":"1Tw","@stdlib/utils-for-each":"1Tx","@stdlib/utils/for-in":"1Ty","@stdlib/utils-for-in":"1Tz","@stdlib/utils/for-own":"1U0","@stdlib/utils-for-own":"1U1","@stdlib/utils/from-entries":"1U2","@stdlib/utils-from-entries":"1U3","@stdlib/utils/function-name":"1U4","@stdlib/utils-function-name":"1U5","@stdlib/utils/function-sequence":"1U6","@stdlib/utils-function-sequence":"1U7","@stdlib/utils/get-prototype-of":"1U8","@stdlib/utils-get-prototype-of":"1U9","@stdlib/utils/global":"1UA","@stdlib/utils-global":"1UB","@stdlib/utils/group-by":"1UC","@stdlib/utils-group-by":"1UD","@stdlib/utils/group-in":"1UE","@stdlib/utils-group-in":"1UF","@stdlib/utils/group-own":"1UG","@stdlib/utils-group-own":"1UH","@stdlib/utils/group":"1UI","@stdlib/utils-group":"1UJ","@stdlib/utils/identity-function":"1UK","@stdlib/utils-identity-function":"1UL","@stdlib/utils/if-else":"1UM","@stdlib/utils-if-else":"1UN","@stdlib/utils/if-then":"1UO","@stdlib/utils-if-then":"1UP","@stdlib/utils/index-of":"1UQ","@stdlib/utils-index-of":"1UR","@stdlib/utils/inherit":"1US","@stdlib/utils-inherit":"1UT","@stdlib/utils/inherited-enumerable-properties":"1UU","@stdlib/utils-inherited-enumerable-properties":"1UV","@stdlib/utils/inherited-enumerable-property-symbols":"1UW","@stdlib/utils-inherited-enumerable-property-symbols":"1UX","@stdlib/utils/inherited-keys":"1UY","@stdlib/utils-inherited-keys":"1UZ","@stdlib/utils/inherited-nonenumerable-properties":"1Ua","@stdlib/utils-inherited-nonenumerable-properties":"1Ub","@stdlib/utils/inherited-nonenumerable-property-names":"1Uc","@stdlib/utils-inherited-nonenumerable-property-names":"1Ud","@stdlib/utils/inherited-nonenumerable-property-symbols":"1Ue","@stdlib/utils-inherited-nonenumerable-property-symbols":"1Uf","@stdlib/utils/inherited-properties":"1Ug","@stdlib/utils-inherited-properties":"1Uh","@stdlib/utils/inherited-property-descriptor":"1Ui","@stdlib/utils-inherited-property-descriptor":"1Uj","@stdlib/utils/inherited-property-descriptors":"1Uk","@stdlib/utils-inherited-property-descriptors":"1Ul","@stdlib/utils/inherited-property-names":"1Um","@stdlib/utils-inherited-property-names":"1Un","@stdlib/utils/inherited-property-symbols":"1Uo","@stdlib/utils-inherited-property-symbols":"1Up","@stdlib/utils/inherited-writable-properties":"1Uq","@stdlib/utils-inherited-writable-properties":"1Ur","@stdlib/utils/inherited-writable-property-names":"1Us","@stdlib/utils-inherited-writable-property-names":"1Ut","@stdlib/utils/inherited-writable-property-symbols":"1Uu","@stdlib/utils-inherited-writable-property-symbols":"1Uv","@stdlib/utils/inmap-right":"1Uw","@stdlib/utils-inmap-right":"1Ux","@stdlib/utils/inmap":"1Uy","@stdlib/utils-inmap":"1Uz","@stdlib/utils/key-by-right":"1V0","@stdlib/utils-key-by-right":"1V1","@stdlib/utils/key-by":"1V2","@stdlib/utils-key-by":"1V3","@stdlib/utils/keys-in":"1V4","@stdlib/utils-keys-in":"1V5","@stdlib/utils/keys":"1V6","@stdlib/utils-keys":"1V7","@stdlib/utils/library-manifest":"1V8","@stdlib/utils-library-manifest":"1V9","@stdlib/utils/linked-list":"1VA","@stdlib/utils-linked-list":"1VB","@stdlib/utils/lowercase-keys":"1VC","@stdlib/utils-lowercase-keys":"1VD","@stdlib/utils/map-arguments":"1VE","@stdlib/utils-map-arguments":"1VF","@stdlib/utils/map-function":"1VG","@stdlib/utils-map-function":"1VH","@stdlib/utils/map-keys":"1VI","@stdlib/utils-map-keys":"1VJ","@stdlib/utils/map-reduce-right":"1VK","@stdlib/utils-map-reduce-right":"1VL","@stdlib/utils/map-reduce":"1VM","@stdlib/utils-map-reduce":"1VN","@stdlib/utils/map-right":"1VO","@stdlib/utils-map-right":"1VP","@stdlib/utils/map-values":"1VQ","@stdlib/utils-map-values":"1VR","@stdlib/utils/map":"1VS","@stdlib/utils-map":"1VT","@stdlib/utils/map2-right":"1VU","@stdlib/utils-map2-right":"1VV","@stdlib/utils/map2":"1VW","@stdlib/utils-map2":"1VX","@stdlib/utils/map2d":"1VY","@stdlib/utils-map2d":"1VZ","@stdlib/utils/map3d":"1Va","@stdlib/utils-map3d":"1Vb","@stdlib/utils/map4d":"1Vc","@stdlib/utils-map4d":"1Vd","@stdlib/utils/map5d":"1Ve","@stdlib/utils-map5d":"1Vf","@stdlib/utils/mask-arguments":"1Vg","@stdlib/utils-mask-arguments":"1Vh","@stdlib/utils/memoize":"1Vi","@stdlib/utils-memoize":"1Vj","@stdlib/utils/merge":"1Vk","@stdlib/utils-merge":"1Vl","@stdlib/utils/move-property":"1Vm","@stdlib/utils-move-property":"1Vn","@stdlib/utils/named-typed-tuple":"1Vo","@stdlib/utils-named-typed-tuple":"1Vp","@stdlib/utils/nary-function":"1Vq","@stdlib/utils-nary-function":"1Vr","@stdlib/utils/native-class":"1Vs","@stdlib/utils-native-class":"1Vt","@stdlib/utils/next-tick":"1Vu","@stdlib/utils-next-tick":"1Vv","@stdlib/utils/none-by-right":"1Vw","@stdlib/utils-none-by-right":"1Vx","@stdlib/utils/none-by":"1Vy","@stdlib/utils-none-by":"1Vz","@stdlib/utils/none":"1W0","@stdlib/utils-none":"1W1","@stdlib/utils/nonenumerable-properties-in":"1W2","@stdlib/utils-nonenumerable-properties-in":"1W3","@stdlib/utils/nonenumerable-properties":"1W4","@stdlib/utils-nonenumerable-properties":"1W5","@stdlib/utils/nonenumerable-property-names-in":"1W6","@stdlib/utils-nonenumerable-property-names-in":"1W7","@stdlib/utils/nonenumerable-property-names":"1W8","@stdlib/utils-nonenumerable-property-names":"1W9","@stdlib/utils/nonenumerable-property-symbols-in":"1WA","@stdlib/utils-nonenumerable-property-symbols-in":"1WB","@stdlib/utils/nonenumerable-property-symbols":"1WC","@stdlib/utils-nonenumerable-property-symbols":"1WD","@stdlib/utils/nonindex-keys":"1WE","@stdlib/utils-nonindex-keys":"1WF","@stdlib/utils/noop":"1WG","@stdlib/utils-noop":"1WH","@stdlib/utils/object-inverse-by":"1WI","@stdlib/utils-object-inverse-by":"1WJ","@stdlib/utils/object-inverse":"1WK","@stdlib/utils-object-inverse":"1WL","@stdlib/utils/omit-by":"1WM","@stdlib/utils-omit-by":"1WN","@stdlib/utils/omit":"1WO","@stdlib/utils-omit":"1WP","@stdlib/utils/open-url":"1WQ","@stdlib/utils-open-url":"1WR","@stdlib/utils":"1WT","@stdlib/utils/papply-right":"1WU","@stdlib/utils-papply-right":"1WV","@stdlib/utils/papply":"1WW","@stdlib/utils-papply":"1WX","@stdlib/utils/parallel":"1WY","@stdlib/utils-parallel":"1WZ","@stdlib/utils/parse-json":"1Wa","@stdlib/utils-parse-json":"1Wb","@stdlib/utils/pick-arguments":"1Wc","@stdlib/utils-pick-arguments":"1Wd","@stdlib/utils/pick-by":"1We","@stdlib/utils-pick-by":"1Wf","@stdlib/utils/pick":"1Wg","@stdlib/utils-pick":"1Wh","@stdlib/utils/pluck":"1Wi","@stdlib/utils-pluck":"1Wj","@stdlib/utils/pop":"1Wk","@stdlib/utils-pop":"1Wl","@stdlib/utils/prepend":"1Wm","@stdlib/utils-prepend":"1Wn","@stdlib/utils/properties-in":"1Wo","@stdlib/utils-properties-in":"1Wp","@stdlib/utils/properties":"1Wq","@stdlib/utils-properties":"1Wr","@stdlib/utils/property-descriptor-in":"1Ws","@stdlib/utils-property-descriptor-in":"1Wt","@stdlib/utils/property-descriptor":"1Wu","@stdlib/utils-property-descriptor":"1Wv","@stdlib/utils/property-descriptors-in":"1Ww","@stdlib/utils-property-descriptors-in":"1Wx","@stdlib/utils/property-descriptors":"1Wy","@stdlib/utils-property-descriptors":"1Wz","@stdlib/utils/property-names-in":"1X0","@stdlib/utils-property-names-in":"1X1","@stdlib/utils/property-names":"1X2","@stdlib/utils-property-names":"1X3","@stdlib/utils/property-symbols-in":"1X4","@stdlib/utils-property-symbols-in":"1X5","@stdlib/utils/property-symbols":"1X6","@stdlib/utils-property-symbols":"1X7","@stdlib/utils/push":"1X8","@stdlib/utils-push":"1X9","@stdlib/utils/real-max":"1XA","@stdlib/utils-real-max":"1XB","@stdlib/utils/real-min":"1XC","@stdlib/utils-real-min":"1XD","@stdlib/utils/reduce-right":"1XE","@stdlib/utils-reduce-right":"1XF","@stdlib/utils/reduce":"1XG","@stdlib/utils-reduce":"1XH","@stdlib/utils/reduce2d":"1XI","@stdlib/utils-reduce2d":"1XJ","@stdlib/utils/regexp-from-string":"1XK","@stdlib/utils-regexp-from-string":"1XL","@stdlib/utils/reject-arguments":"1XM","@stdlib/utils-reject-arguments":"1XN","@stdlib/utils/reorder-arguments":"1XO","@stdlib/utils-reorder-arguments":"1XP","@stdlib/utils/reverse-arguments":"1XQ","@stdlib/utils-reverse-arguments":"1XR","@stdlib/utils/safe-int-max":"1XS","@stdlib/utils-safe-int-max":"1XT","@stdlib/utils/safe-int-min":"1XU","@stdlib/utils-safe-int-min":"1XV","@stdlib/utils/shift":"1XW","@stdlib/utils-shift":"1XX","@stdlib/utils/size-of":"1XY","@stdlib/utils-size-of":"1XZ","@stdlib/utils/some-by-right":"1Xa","@stdlib/utils-some-by-right":"1Xb","@stdlib/utils/some-by":"1Xc","@stdlib/utils-some-by":"1Xd","@stdlib/utils/some":"1Xe","@stdlib/utils-some":"1Xf","@stdlib/utils/stack":"1Xg","@stdlib/utils-stack":"1Xh","@stdlib/utils/tabulate-by":"1Xi","@stdlib/utils-tabulate-by":"1Xj","@stdlib/utils/tabulate":"1Xk","@stdlib/utils-tabulate":"1Xl","@stdlib/utils/timeit":"1Xm","@stdlib/utils-timeit":"1Xn","@stdlib/utils/try-catch":"1Xo","@stdlib/utils-try-catch":"1Xp","@stdlib/utils/try-function":"1Xq","@stdlib/utils-try-function":"1Xr","@stdlib/utils/try-require":"1Xs","@stdlib/utils-try-require":"1Xt","@stdlib/utils/try-then":"1Xu","@stdlib/utils-try-then":"1Xv","@stdlib/utils/type-max":"1Xw","@stdlib/utils-type-max":"1Xx","@stdlib/utils/type-min":"1Xy","@stdlib/utils-type-min":"1Xz","@stdlib/utils/type-of":"1Y0","@stdlib/utils-type-of":"1Y1","@stdlib/utils/uncapitalize-keys":"1Y2","@stdlib/utils-uncapitalize-keys":"1Y3","@stdlib/utils/uncurry-right":"1Y4","@stdlib/utils-uncurry-right":"1Y5","@stdlib/utils/uncurry":"1Y6","@stdlib/utils-uncurry":"1Y7","@stdlib/utils/unshift":"1Y8","@stdlib/utils-unshift":"1Y9","@stdlib/utils/until-each-right":"1YA","@stdlib/utils-until-each-right":"1YB","@stdlib/utils/until-each":"1YC","@stdlib/utils-until-each":"1YD","@stdlib/utils/until":"1YE","@stdlib/utils-until":"1YF","@stdlib/utils/unzip":"1YG","@stdlib/utils-unzip":"1YH","@stdlib/utils/uppercase-keys":"1YI","@stdlib/utils-uppercase-keys":"1YJ","@stdlib/utils/values-in":"1YK","@stdlib/utils-values-in":"1YL","@stdlib/utils/values":"1YM","@stdlib/utils-values":"1YN","@stdlib/utils/while-each-right":"1YO","@stdlib/utils-while-each-right":"1YP","@stdlib/utils/while-each":"1YQ","@stdlib/utils-while-each":"1YR","@stdlib/utils/while":"1YS","@stdlib/utils-while":"1YT","@stdlib/utils/writable-properties-in":"1YU","@stdlib/utils-writable-properties-in":"1YV","@stdlib/utils/writable-properties":"1YW","@stdlib/utils-writable-properties":"1YX","@stdlib/utils/writable-property-names-in":"1YY","@stdlib/utils-writable-property-names-in":"1YZ","@stdlib/utils/writable-property-names":"1Ya","@stdlib/utils-writable-property-names":"1Yb","@stdlib/utils/writable-property-symbols-in":"1Yc","@stdlib/utils-writable-property-symbols-in":"1Yd","@stdlib/utils/writable-property-symbols":"1Ye","@stdlib/utils-writable-property-symbols":"1Yf","@stdlib/utils/zip":"1Yg","@stdlib/utils-zip":"1Yh","@stdlib/array/base/accessor-getter":"1Yi","@stdlib/array-base-accessor-getter":"1Yj","@stdlib/array/base/accessor-setter":"1Yk","@stdlib/array-base-accessor-setter":"1Yl","@stdlib/array/base/accessor":"1Ym","@stdlib/array-base-accessor":"1Yn","@stdlib/array/base/accessors":"1Yo","@stdlib/array-base-accessors":"1Yp","@stdlib/array/base/assert/contains":"1Yq","@stdlib/array-base-assert-contains":"1Yr","@stdlib/array/base/assert/is-accessor-array":"1Ys","@stdlib/array-base-assert-is-accessor-array":"1Yt","@stdlib/array/base/assert":"1Yu","@stdlib/array-base-assert":"1Yv","@stdlib/array/base/cartesian-power":"1Yw","@stdlib/array-base-cartesian-power":"1Yx","@stdlib/array/base/cartesian-product":"1Yy","@stdlib/array-base-cartesian-product":"1Yz","@stdlib/array/base/cartesian-square":"1Z0","@stdlib/array-base-cartesian-square":"1Z1","@stdlib/array/base/copy-indexed":"1Z2","@stdlib/array-base-copy-indexed":"1Z3","@stdlib/array/base/filled2d":"1Z4","@stdlib/array-base-filled2d":"1Z5","@stdlib/array/base/flatten":"1Z6","@stdlib/array-base-flatten":"1Z7","@stdlib/array/base/flatten2d-by":"1Z8","@stdlib/array-base-flatten2d-by":"1Z9","@stdlib/array/base/flatten2d":"1ZA","@stdlib/array-base-flatten2d":"1ZB","@stdlib/array/base/flatten3d-by":"1ZC","@stdlib/array-base-flatten3d-by":"1ZD","@stdlib/array/base/flatten3d":"1ZE","@stdlib/array-base-flatten3d":"1ZF","@stdlib/array/base/flatten4d-by":"1ZG","@stdlib/array-base-flatten4d-by":"1ZH","@stdlib/array/base/flatten4d":"1ZI","@stdlib/array-base-flatten4d":"1ZJ","@stdlib/array/base/flatten5d-by":"1ZK","@stdlib/array-base-flatten5d-by":"1ZL","@stdlib/array/base/flatten5d":"1ZM","@stdlib/array-base-flatten5d":"1ZN","@stdlib/array/base/getter":"1ZO","@stdlib/array-base-getter":"1ZP","@stdlib/array/base/last":"1ZQ","@stdlib/array-base-last":"1ZR","@stdlib/array/base/n-cartesian-product":"1ZS","@stdlib/array-base-n-cartesian-product":"1ZT","@stdlib/array/base/ones2d":"1ZU","@stdlib/array-base-ones2d":"1ZV","@stdlib/array/base/setter":"1ZW","@stdlib/array-base-setter":"1ZX","@stdlib/array/base/take":"1ZY","@stdlib/array-base-take":"1ZZ","@stdlib/array/base/to-accessor-array":"1Za","@stdlib/array-base-to-accessor-array":"1Zb","@stdlib/array/base/zero-to":"1Zc","@stdlib/array-base-zero-to":"1Zd","@stdlib/array/base/zeros2d":"1Ze","@stdlib/array-base-zeros2d":"1Zf","@stdlib/array/empty-like":"1Zg","@stdlib/array-empty-like":"1Zh","@stdlib/array/empty":"1Zi","@stdlib/array-empty":"1Zj","@stdlib/array/nans-like":"1Zk","@stdlib/array-nans-like":"1Zl","@stdlib/array/nans":"1Zm","@stdlib/array-nans":"1Zn","@stdlib/assert/is-accessor-array":"1Zo","@stdlib/assert-is-accessor-array":"1Zp","@stdlib/assert/is-camelcase":"1Zq","@stdlib/assert-is-camelcase":"1Zr","@stdlib/assert/is-constantcase":"1Zs","@stdlib/assert-is-constantcase":"1Zt","@stdlib/assert/is-current-year":"1Zu","@stdlib/assert-is-current-year":"1Zv","@stdlib/assert/is-domain-name":"1Zw","@stdlib/assert-is-domain-name":"1Zx","@stdlib/assert/is-duration-string":"1Zy","@stdlib/assert-is-duration-string":"1Zz","@stdlib/assert/is-kebabcase":"1a0","@stdlib/assert-is-kebabcase":"1a1","@stdlib/assert/is-pascalcase":"1a2","@stdlib/assert-is-pascalcase":"1a3","@stdlib/assert/is-semver":"1a4","@stdlib/assert-is-semver":"1a5","@stdlib/assert/is-snakecase":"1a6","@stdlib/assert-is-snakecase":"1a7","@stdlib/assert/is-startcase":"1a8","@stdlib/assert-is-startcase":"1a9","@stdlib/assert/napi/equal-typedarray-types":"1aA","@stdlib/assert-napi-equal-typedarray-types":"1aB","@stdlib/assert/napi/equal-types":"1aC","@stdlib/assert-napi-equal-types":"1aD","@stdlib/assert/napi/is-type":"1aE","@stdlib/assert-napi-is-type":"1aF","@stdlib/assert/napi/is-typedarray":"1aG","@stdlib/assert-napi-is-typedarray":"1aH","@stdlib/assert/napi":"1aI","@stdlib/assert-napi":"1aJ","@stdlib/assert/napi/status-ok":"1aK","@stdlib/assert-napi-status-ok":"1aL","@stdlib/blas/base/drotg":"1aM","@stdlib/blas-base-drotg":"1aN","@stdlib/blas/base/srotg":"1aO","@stdlib/blas-base-srotg":"1aP","@stdlib/boolean/ctor":"1aQ","@stdlib/boolean-ctor":"1aR","@stdlib/boolean":"1aT","@stdlib/complex/base/cast-return":"1aU","@stdlib/complex-base-cast-return":"1aV","@stdlib/complex/base":"1aW","@stdlib/complex-base":"1aX","@stdlib/console/log-each":"1aY","@stdlib/console-log-each":"1aZ","@stdlib/console/log":"1aa","@stdlib/console-log":"1ab","@stdlib/console":"1ad","@stdlib/constants/float32/abs-mask":"1ae","@stdlib/constants-float32-abs-mask":"1af","@stdlib/constants/float32/exponent-mask":"1ag","@stdlib/constants-float32-exponent-mask":"1ah","@stdlib/constants/float32/sign-mask":"1ai","@stdlib/constants-float32-sign-mask":"1aj","@stdlib/constants/float32/significand-mask":"1ak","@stdlib/constants-float32-significand-mask":"1al","@stdlib/constants/float64/high-word-abs-mask":"1am","@stdlib/constants-float64-high-word-abs-mask":"1an","@stdlib/constants/float64/high-word-sign-mask":"1ao","@stdlib/constants-float64-high-word-sign-mask":"1ap","@stdlib/function/ctor":"1aq","@stdlib/function-ctor":"1ar","@stdlib/function":"1at","@stdlib/function/to-string":"1au","@stdlib/function-to-string":"1av","@stdlib/math/base/assert/is-negative-finite":"1aw","@stdlib/math-base-assert-is-negative-finite":"1ax","@stdlib/math/base/assert/is-nonnegative-finite":"1ay","@stdlib/math-base-assert-is-nonnegative-finite":"1az","@stdlib/math/base/assert/is-nonpositive-finite":"1b0","@stdlib/math-base-assert-is-nonpositive-finite":"1b1","@stdlib/math/base/assert/is-positive-finite":"1b2","@stdlib/math-base-assert-is-positive-finite":"1b3","@stdlib/math/base/ops/cnegf":"1b4","@stdlib/math-base-ops-cnegf":"1b5","@stdlib/math/base/special/asec":"1b6","@stdlib/math-base-special-asec":"1b7","@stdlib/math/base/special/ellipj":"1b8","@stdlib/math-base-special-ellipj":"1b9","@stdlib/math/base/special/erfcx":"1bA","@stdlib/math-base-special-erfcx":"1bB","@stdlib/math/base/special/gammasgn":"1bC","@stdlib/math-base-special-gammasgn":"1bD","@stdlib/math/base/special/maxabsn":"1bE","@stdlib/math-base-special-maxabsn":"1bF","@stdlib/math/base/special/maxn":"1bG","@stdlib/math-base-special-maxn":"1bH","@stdlib/math/base/special/minabsn":"1bI","@stdlib/math-base-special-minabsn":"1bJ","@stdlib/math/base/special/minmaxabsn":"1bK","@stdlib/math-base-special-minmaxabsn":"1bL","@stdlib/math/base/special/minmaxn":"1bM","@stdlib/math-base-special-minmaxn":"1bN","@stdlib/math/base/special/minn":"1bO","@stdlib/math-base-special-minn":"1bP","@stdlib/math/base/special/rcbrt":"1bQ","@stdlib/math-base-special-rcbrt":"1bR","@stdlib/math/base/special/sqrtpi":"1bS","@stdlib/math-base-special-sqrtpi":"1bT","@stdlib/math/base/tools/evalpoly-compile-c":"1bU","@stdlib/math-base-tools-evalpoly-compile-c":"1bV","@stdlib/math/base/tools/evalrational-compile-c":"1bW","@stdlib/math-base-tools-evalrational-compile-c":"1bX","@stdlib/math/strided/ops/add-by":"1bY","@stdlib/math-strided-ops-add-by":"1bZ","@stdlib/math/strided/ops/mul-by":"1ba","@stdlib/math-strided-ops-mul-by":"1bb","@stdlib/math/strided/ops/sub-by":"1bc","@stdlib/math-strided-ops-sub-by":"1bd","@stdlib/math/strided/special/cbrt-by":"1be","@stdlib/math-strided-special-cbrt-by":"1bf","@stdlib/math/strided/special/cos-by":"1bg","@stdlib/math-strided-special-cos-by":"1bh","@stdlib/math/strided/special/dcbrt-by":"1bi","@stdlib/math-strided-special-dcbrt-by":"1bj","@stdlib/math/strided/special/sin-by":"1bk","@stdlib/math-strided-special-sin-by":"1bl","@stdlib/math/strided/special/sqrt-by":"1bm","@stdlib/math-strided-special-sqrt-by":"1bn","@stdlib/napi/argv-complex128array":"1bo","@stdlib/napi-argv-complex128array":"1bp","@stdlib/napi/argv-complex64array":"1bq","@stdlib/napi-argv-complex64array":"1br","@stdlib/napi/argv-double":"1bs","@stdlib/napi-argv-double":"1bt","@stdlib/napi/argv-float":"1bu","@stdlib/napi-argv-float":"1bv","@stdlib/napi/argv-float32array":"1bw","@stdlib/napi-argv-float32array":"1bx","@stdlib/napi/argv-float64array":"1by","@stdlib/napi-argv-float64array":"1bz","@stdlib/napi/argv-int16array":"1c0","@stdlib/napi-argv-int16array":"1c1","@stdlib/napi/argv-int32":"1c2","@stdlib/napi-argv-int32":"1c3","@stdlib/napi/argv-int32array":"1c4","@stdlib/napi-argv-int32array":"1c5","@stdlib/napi/argv-int64":"1c6","@stdlib/napi-argv-int64":"1c7","@stdlib/napi/argv-int8array":"1c8","@stdlib/napi-argv-int8array":"1c9","@stdlib/napi/argv-strided-complex128array":"1cA","@stdlib/napi-argv-strided-complex128array":"1cB","@stdlib/napi/argv-strided-complex64array":"1cC","@stdlib/napi-argv-strided-complex64array":"1cD","@stdlib/napi/argv-strided-float32array":"1cE","@stdlib/napi-argv-strided-float32array":"1cF","@stdlib/napi/argv-strided-float64array":"1cG","@stdlib/napi-argv-strided-float64array":"1cH","@stdlib/napi/argv-strided-int16array":"1cI","@stdlib/napi-argv-strided-int16array":"1cJ","@stdlib/napi/argv-strided-int32array":"1cK","@stdlib/napi-argv-strided-int32array":"1cL","@stdlib/napi/argv-strided-int8array":"1cM","@stdlib/napi-argv-strided-int8array":"1cN","@stdlib/napi/argv-strided-uint16array":"1cO","@stdlib/napi-argv-strided-uint16array":"1cP","@stdlib/napi/argv-strided-uint32array":"1cQ","@stdlib/napi-argv-strided-uint32array":"1cR","@stdlib/napi/argv-strided-uint8array":"1cS","@stdlib/napi-argv-strided-uint8array":"1cT","@stdlib/napi/argv-uint16array":"1cU","@stdlib/napi-argv-uint16array":"1cV","@stdlib/napi/argv-uint32":"1cW","@stdlib/napi-argv-uint32":"1cX","@stdlib/napi/argv-uint32array":"1cY","@stdlib/napi-argv-uint32array":"1cZ","@stdlib/napi/argv-uint8array":"1ca","@stdlib/napi-argv-uint8array":"1cb","@stdlib/napi/argv":"1cc","@stdlib/napi-argv":"1cd","@stdlib/napi/export":"1ce","@stdlib/napi-export":"1cf","@stdlib/napi":"1ch","@stdlib/ndarray/base/assert/is-complex-floating-point-data-type":"1ci","@stdlib/ndarray-base-assert-is-complex-floating-point-data-type":"1cj","@stdlib/ndarray/base/assert/is-floating-point-data-type":"1ck","@stdlib/ndarray-base-assert-is-floating-point-data-type":"1cl","@stdlib/ndarray/base/assert/is-integer-data-type":"1cm","@stdlib/ndarray-base-assert-is-integer-data-type":"1cn","@stdlib/ndarray/base/assert/is-numeric-data-type":"1co","@stdlib/ndarray-base-assert-is-numeric-data-type":"1cp","@stdlib/ndarray/base/assert/is-real-data-type":"1cq","@stdlib/ndarray-base-assert-is-real-data-type":"1cr","@stdlib/ndarray/base/assert/is-real-floating-point-data-type":"1cs","@stdlib/ndarray-base-assert-is-real-floating-point-data-type":"1ct","@stdlib/ndarray/base/assert/is-signed-integer-data-type":"1cu","@stdlib/ndarray-base-assert-is-signed-integer-data-type":"1cv","@stdlib/ndarray/base/assert/is-unsigned-integer-data-type":"1cw","@stdlib/ndarray-base-assert-is-unsigned-integer-data-type":"1cx","@stdlib/ndarray/base/binary-loop-interchange-order":"1cy","@stdlib/ndarray-base-binary-loop-interchange-order":"1cz","@stdlib/ndarray/base/binary-tiling-block-size":"1d0","@stdlib/ndarray-base-binary-tiling-block-size":"1d1","@stdlib/ndarray/base/broadcast-scalar":"1d2","@stdlib/ndarray-base-broadcast-scalar":"1d3","@stdlib/ndarray/base/empty-like":"1d4","@stdlib/ndarray-base-empty-like":"1d5","@stdlib/ndarray/base/empty":"1d6","@stdlib/ndarray-base-empty":"1d7","@stdlib/ndarray/base/nullary-loop-interchange-order":"1d8","@stdlib/ndarray-base-nullary-loop-interchange-order":"1d9","@stdlib/ndarray/base/nullary-tiling-block-size":"1dA","@stdlib/ndarray-base-nullary-tiling-block-size":"1dB","@stdlib/ndarray/base/nullary":"1dC","@stdlib/ndarray-base-nullary":"1dD","@stdlib/ndarray/base/output-policy-enum2str":"1dE","@stdlib/ndarray-base-output-policy-enum2str":"1dF","@stdlib/ndarray/base/output-policy-resolve-enum":"1dG","@stdlib/ndarray-base-output-policy-resolve-enum":"1dH","@stdlib/ndarray/base/output-policy-resolve-str":"1dI","@stdlib/ndarray-base-output-policy-resolve-str":"1dJ","@stdlib/ndarray/base/output-policy-str2enum":"1dK","@stdlib/ndarray-base-output-policy-str2enum":"1dL","@stdlib/ndarray/base/unary-by":"1dM","@stdlib/ndarray-base-unary-by":"1dN","@stdlib/ndarray/base/unary-loop-interchange-order":"1dO","@stdlib/ndarray-base-unary-loop-interchange-order":"1dP","@stdlib/ndarray/base/unary-output-dtype":"1dQ","@stdlib/ndarray-base-unary-output-dtype":"1dR","@stdlib/ndarray/base/unary-tiling-block-size":"1dS","@stdlib/ndarray-base-unary-tiling-block-size":"1dT","@stdlib/ndarray/defaults":"1dU","@stdlib/ndarray-defaults":"1dV","@stdlib/ndarray/dispatch-by":"1dW","@stdlib/ndarray-dispatch-by":"1dX","@stdlib/ndarray/empty-like":"1dY","@stdlib/ndarray-empty-like":"1dZ","@stdlib/ndarray/empty":"1da","@stdlib/ndarray-empty":"1db","@stdlib/ndarray/output-dtype-policies":"1dc","@stdlib/ndarray-output-dtype-policies":"1dd","@stdlib/ndarray/to-array":"1de","@stdlib/ndarray-to-array":"1df","@stdlib/nlp/expand-acronyms":"1dg","@stdlib/nlp-expand-acronyms":"1dh","@stdlib/nlp/sentencize":"1di","@stdlib/nlp-sentencize":"1dj","@stdlib/number/float64/reviver":"1dk","@stdlib/number-float64-reviver":"1dl","@stdlib/number/float64/to-json":"1dm","@stdlib/number-float64-to-json":"1dn","@stdlib/object/assign":"1do","@stdlib/object-assign":"1dp","@stdlib/object/ctor":"1dq","@stdlib/object-ctor":"1dr","@stdlib/object":"1dt","@stdlib/random/array/arcsine":"1du","@stdlib/random-array-arcsine":"1dv","@stdlib/random/array/beta":"1dw","@stdlib/random-array-beta":"1dx","@stdlib/random/array/betaprime":"1dy","@stdlib/random-array-betaprime":"1dz","@stdlib/random/array/cosine":"1e0","@stdlib/random-array-cosine":"1e1","@stdlib/random/array/discrete-uniform":"1e2","@stdlib/random-array-discrete-uniform":"1e3","@stdlib/random/array/exponential":"1e4","@stdlib/random-array-exponential":"1e5","@stdlib/random/array/gamma":"1e6","@stdlib/random-array-gamma":"1e7","@stdlib/random/array/geometric":"1e8","@stdlib/random-array-geometric":"1e9","@stdlib/random/array/invgamma":"1eA","@stdlib/random-array-invgamma":"1eB","@stdlib/random/array/lognormal":"1eC","@stdlib/random-array-lognormal":"1eD","@stdlib/random/array/minstd-shuffle":"1eE","@stdlib/random-array-minstd-shuffle":"1eF","@stdlib/random/array/minstd":"1eG","@stdlib/random-array-minstd":"1eH","@stdlib/random/array/mt19937":"1eI","@stdlib/random-array-mt19937":"1eJ","@stdlib/random/array/normal":"1eK","@stdlib/random-array-normal":"1eL","@stdlib/random/array":"1eM","@stdlib/random-array":"1eN","@stdlib/random/array/randu":"1eO","@stdlib/random-array-randu":"1eP","@stdlib/random/array/uniform":"1eQ","@stdlib/random-array-uniform":"1eR","@stdlib/random/exponential":"1eS","@stdlib/random-exponential":"1eT","@stdlib/random/strided/arcsine":"1eU","@stdlib/random-strided-arcsine":"1eV","@stdlib/random/strided/beta":"1eW","@stdlib/random-strided-beta":"1eX","@stdlib/random/strided/betaprime":"1eY","@stdlib/random-strided-betaprime":"1eZ","@stdlib/random/strided/cosine":"1ea","@stdlib/random-strided-cosine":"1eb","@stdlib/random/strided/discrete-uniform":"1ec","@stdlib/random-strided-discrete-uniform":"1ed","@stdlib/random/strided/exponential":"1ee","@stdlib/random-strided-exponential":"1ef","@stdlib/random/strided/gamma":"1eg","@stdlib/random-strided-gamma":"1eh","@stdlib/random/strided/invgamma":"1ei","@stdlib/random-strided-invgamma":"1ej","@stdlib/random/strided/lognormal":"1ek","@stdlib/random-strided-lognormal":"1el","@stdlib/random/strided/minstd-shuffle":"1em","@stdlib/random-strided-minstd-shuffle":"1en","@stdlib/random/strided/minstd":"1eo","@stdlib/random-strided-minstd":"1ep","@stdlib/random/strided/mt19937":"1eq","@stdlib/random-strided-mt19937":"1er","@stdlib/random/strided/normal":"1es","@stdlib/random-strided-normal":"1et","@stdlib/random/strided":"1eu","@stdlib/random-strided":"1ev","@stdlib/random/strided/randu":"1ew","@stdlib/random-strided-randu":"1ex","@stdlib/random/strided/uniform":"1ey","@stdlib/random-strided-uniform":"1ez","@stdlib/random/strided/weibull":"1f0","@stdlib/random-strided-weibull":"1f1","@stdlib/regexp/duration-string":"1f2","@stdlib/regexp-duration-string":"1f3","@stdlib/regexp/reviver":"1f4","@stdlib/regexp-reviver":"1f5","@stdlib/regexp/semver":"1f6","@stdlib/regexp-semver":"1f7","@stdlib/regexp/to-json":"1f8","@stdlib/regexp-to-json":"1f9","@stdlib/stats/base/dists/lognormal/logcdf":"1fA","@stdlib/stats-base-dists-lognormal-logcdf":"1fB","@stdlib/stats/base/dists/normal/logcdf":"1fC","@stdlib/stats-base-dists-normal-logcdf":"1fD","@stdlib/stats/base/dists/studentized-range/cdf":"1fE","@stdlib/stats-base-dists-studentized-range-cdf":"1fF","@stdlib/stats/base/dists/studentized-range":"1fG","@stdlib/stats-base-dists-studentized-range":"1fH","@stdlib/stats/base/dists/studentized-range/quantile":"1fI","@stdlib/stats-base-dists-studentized-range-quantile":"1fJ","@stdlib/strided/base/mskunary-addon-dispatch":"1fK","@stdlib/strided-base-mskunary-addon-dispatch":"1fL","@stdlib/strided/base/mskunary-dtype-signatures":"1fM","@stdlib/strided-base-mskunary-dtype-signatures":"1fN","@stdlib/strided/base/mskunary-signature-callbacks":"1fO","@stdlib/strided-base-mskunary-signature-callbacks":"1fP","@stdlib/strided/base/nullary-addon-dispatch":"1fQ","@stdlib/strided-base-nullary-addon-dispatch":"1fR","@stdlib/strided/base/unary-by":"1fS","@stdlib/strided-base-unary-by":"1fT","@stdlib/strided/base/unary-dtype-signatures":"1fU","@stdlib/strided-base-unary-dtype-signatures":"1fV","@stdlib/strided/base/unary-signature-callbacks":"1fW","@stdlib/strided-base-unary-signature-callbacks":"1fX","@stdlib/strided/dispatch-by":"1fY","@stdlib/strided-dispatch-by":"1fZ","@stdlib/strided/napi/nullary":"1fa","@stdlib/strided-napi-nullary":"1fb","@stdlib/string/base/camelcase":"1fc","@stdlib/string-base-camelcase":"1fd","@stdlib/string/base/capitalize":"1fe","@stdlib/string-base-capitalize":"1ff","@stdlib/string/base/code-point-at":"1fg","@stdlib/string-base-code-point-at":"1fh","@stdlib/string/base/constantcase":"1fi","@stdlib/string-base-constantcase":"1fj","@stdlib/string/base/distances/levenshtein":"1fk","@stdlib/string-base-distances-levenshtein":"1fl","@stdlib/string/base/distances":"1fm","@stdlib/string-base-distances":"1fn","@stdlib/string/base/dotcase":"1fo","@stdlib/string-base-dotcase":"1fp","@stdlib/string/base/ends-with":"1fq","@stdlib/string-base-ends-with":"1fr","@stdlib/string/base/first-code-point":"1fs","@stdlib/string-base-first-code-point":"1ft","@stdlib/string/base/first-grapheme-cluster":"1fu","@stdlib/string-base-first-grapheme-cluster":"1fv","@stdlib/string/base/first":"1fw","@stdlib/string-base-first":"1fx","@stdlib/string/base/for-each-code-point":"1fy","@stdlib/string-base-for-each-code-point":"1fz","@stdlib/string/base/for-each-grapheme-cluster":"1g0","@stdlib/string-base-for-each-grapheme-cluster":"1g1","@stdlib/string/base/for-each":"1g2","@stdlib/string-base-for-each":"1g3","@stdlib/string/base/headercase":"1g4","@stdlib/string-base-headercase":"1g5","@stdlib/string/base/invcase":"1g6","@stdlib/string-base-invcase":"1g7","@stdlib/string/base/kebabcase":"1g8","@stdlib/string-base-kebabcase":"1g9","@stdlib/string/base/left-pad":"1gA","@stdlib/string-base-left-pad":"1gB","@stdlib/string/base/left-trim":"1gC","@stdlib/string-base-left-trim":"1gD","@stdlib/string/base/lowercase":"1gE","@stdlib/string-base-lowercase":"1gF","@stdlib/string/base/pascalcase":"1gG","@stdlib/string-base-pascalcase":"1gH","@stdlib/string/base/percent-encode":"1gI","@stdlib/string-base-percent-encode":"1gJ","@stdlib/string/base/remove-first-code-point":"1gK","@stdlib/string-base-remove-first-code-point":"1gL","@stdlib/string/base/remove-first-grapheme-cluster":"1gM","@stdlib/string-base-remove-first-grapheme-cluster":"1gN","@stdlib/string/base/remove-first":"1gO","@stdlib/string-base-remove-first":"1gP","@stdlib/string/base/repeat":"1gQ","@stdlib/string-base-repeat":"1gR","@stdlib/string/base/replace-before":"1gS","@stdlib/string-base-replace-before":"1gT","@stdlib/string/base/replace":"1gU","@stdlib/string-base-replace":"1gV","@stdlib/string/base/right-pad":"1gW","@stdlib/string-base-right-pad":"1gX","@stdlib/string/base/right-trim":"1gY","@stdlib/string-base-right-trim":"1gZ","@stdlib/string/base/snakecase":"1ga","@stdlib/string-base-snakecase":"1gb","@stdlib/string/base/startcase":"1gc","@stdlib/string-base-startcase":"1gd","@stdlib/string/base/starts-with":"1ge","@stdlib/string-base-starts-with":"1gf","@stdlib/string/base/trim":"1gg","@stdlib/string-base-trim":"1gh","@stdlib/string/base/uncapitalize":"1gi","@stdlib/string-base-uncapitalize":"1gj","@stdlib/string/base/uppercase":"1gk","@stdlib/string-base-uppercase":"1gl","@stdlib/string/dotcase":"1gm","@stdlib/string-dotcase":"1gn","@stdlib/string/first":"1go","@stdlib/string-first":"1gp","@stdlib/string/for-each":"1gq","@stdlib/string-for-each":"1gr","@stdlib/string/headercase":"1gs","@stdlib/string-headercase":"1gt","@stdlib/string/num2words":"1gu","@stdlib/string-num2words":"1gv","@stdlib/string/replace-before":"1gw","@stdlib/string-replace-before":"1gx","@stdlib/string/to-grapheme-cluster-iterator-right":"1gy","@stdlib/string-to-grapheme-cluster-iterator-right":"1gz","@stdlib/string/to-grapheme-cluster-iterator":"1h0","@stdlib/string-to-grapheme-cluster-iterator":"1h1","@stdlib/time/base":"1h2","@stdlib/time-base":"1h3","@stdlib/time/base/parse-duration":"1h4","@stdlib/time-base-parse-duration":"1h5","@stdlib/time/current-year":"1h6","@stdlib/time-current-year":"1h7","@stdlib/time/duration2ms":"1h8","@stdlib/time-duration2ms":"1h9","@stdlib/time/ms2duration":"1hA","@stdlib/time-ms2duration":"1hB","@stdlib/utils/decorate-after":"1hC","@stdlib/utils-decorate-after":"1hD","@stdlib/utils/dsv/base":"1hE","@stdlib/utils-dsv-base":"1hF","@stdlib/utils/dsv/base/parse":"1hG","@stdlib/utils-dsv-base-parse":"1hH","@stdlib/utils/dsv":"1hI","@stdlib/utils-dsv":"1hJ","@stdlib/utils/thunk":"1hK","@stdlib/utils-thunk":"1hL","@stdlib/array/base/broadcast-array":"1hM","@stdlib/array-base-broadcast-array":"1hN","@stdlib/array/base/filled2d-by":"1hO","@stdlib/array-base-filled2d-by":"1hP","@stdlib/array/base/filled3d-by":"1hQ","@stdlib/array-base-filled3d-by":"1hR","@stdlib/array/base/filled3d":"1hS","@stdlib/array-base-filled3d":"1hT","@stdlib/array/base/filled4d-by":"1hU","@stdlib/array-base-filled4d-by":"1hV","@stdlib/array/base/filled4d":"1hW","@stdlib/array-base-filled4d":"1hX","@stdlib/array/base/filled5d-by":"1hY","@stdlib/array-base-filled5d-by":"1hZ","@stdlib/array/base/filled5d":"1ha","@stdlib/array-base-filled5d":"1hb","@stdlib/array/base/fillednd":"1hc","@stdlib/array-base-fillednd":"1hd","@stdlib/array/base/flatten-by":"1he","@stdlib/array-base-flatten-by":"1hf","@stdlib/array/base/one-to":"1hg","@stdlib/array-base-one-to":"1hh","@stdlib/array/base/ones3d":"1hi","@stdlib/array-base-ones3d":"1hj","@stdlib/array/base/ones4d":"1hk","@stdlib/array-base-ones4d":"1hl","@stdlib/array/base/ones5d":"1hm","@stdlib/array-base-ones5d":"1hn","@stdlib/array/base/onesnd":"1ho","@stdlib/array-base-onesnd":"1hp","@stdlib/array/base/unary2d":"1hq","@stdlib/array-base-unary2d":"1hr","@stdlib/array/base/zeros3d":"1hs","@stdlib/array-base-zeros3d":"1ht","@stdlib/array/base/zeros4d":"1hu","@stdlib/array-base-zeros4d":"1hv","@stdlib/array/base/zeros5d":"1hw","@stdlib/array-base-zeros5d":"1hx","@stdlib/array/base/zerosnd":"1hy","@stdlib/array-base-zerosnd":"1hz","@stdlib/array/base/binary2d":"1i0","@stdlib/array-base-binary2d":"1i1","@stdlib/array/base/binary3d":"1i2","@stdlib/array-base-binary3d":"1i3","@stdlib/array/base/binary4d":"1i4","@stdlib/array-base-binary4d":"1i5","@stdlib/array/base/binary5d":"1i6","@stdlib/array-base-binary5d":"1i7","@stdlib/array/base/binarynd":"1i8","@stdlib/array-base-binarynd":"1i9","@stdlib/array/base/broadcasted-binary2d":"1iA","@stdlib/array-base-broadcasted-binary2d":"1iB","@stdlib/array/base/broadcasted-binary3d":"1iC","@stdlib/array-base-broadcasted-binary3d":"1iD","@stdlib/array/base/broadcasted-binary4d":"1iE","@stdlib/array-base-broadcasted-binary4d":"1iF","@stdlib/array/base/broadcasted-binary5d":"1iG","@stdlib/array-base-broadcasted-binary5d":"1iH","@stdlib/array/base/broadcasted-unary2d":"1iI","@stdlib/array-base-broadcasted-unary2d":"1iJ","@stdlib/array/base/broadcasted-unary3d":"1iK","@stdlib/array-base-broadcasted-unary3d":"1iL","@stdlib/array/base/broadcasted-unary4d":"1iM","@stdlib/array-base-broadcasted-unary4d":"1iN","@stdlib/array/base/broadcasted-unary5d":"1iO","@stdlib/array-base-broadcasted-unary5d":"1iP","@stdlib/array/base/fillednd-by":"1iQ","@stdlib/array-base-fillednd-by":"1iR","@stdlib/array/base/unary3d":"1iS","@stdlib/array-base-unary3d":"1iT","@stdlib/array/base/unary4d":"1iU","@stdlib/array-base-unary4d":"1iV","@stdlib/array/base/unary5d":"1iW","@stdlib/array-base-unary5d":"1iX","@stdlib/array/base/unarynd":"1iY","@stdlib/array-base-unarynd":"1iZ","@stdlib/array/base/mskbinary2d":"1ia","@stdlib/array-base-mskbinary2d":"1ib","@stdlib/array/base/mskunary2d":"1ic","@stdlib/array-base-mskunary2d":"1id","@stdlib/array/base/mskunary3d":"1ie","@stdlib/array-base-mskunary3d":"1if","@stdlib/array/base/unary2d-by":"1ig","@stdlib/array-base-unary2d-by":"1ih","@stdlib/assert/is-multi-slice":"1ii","@stdlib/assert-is-multi-slice":"1ij","@stdlib/assert/is-slice":"1ik","@stdlib/assert-is-slice":"1il","@stdlib/math/base/special/log1pmx":"1im","@stdlib/math-base-special-log1pmx":"1in","@stdlib/slice/base":"1io","@stdlib/slice-base":"1ip","@stdlib/slice/base/seq2slice":"1iq","@stdlib/slice-base-seq2slice":"1ir","@stdlib/slice/base/slice2seq":"1is","@stdlib/slice-base-slice2seq":"1it","@stdlib/slice/base/str2multislice":"1iu","@stdlib/slice-base-str2multislice":"1iv","@stdlib/slice/base/str2slice":"1iw","@stdlib/slice-base-str2slice":"1ix","@stdlib/slice/ctor":"1iy","@stdlib/slice-ctor":"1iz","@stdlib/slice/multi":"1j0","@stdlib/slice-multi":"1j1","@stdlib/slice":"1j3","@stdlib/slice/seq2slice":"1j4","@stdlib/slice-seq2slice":"1j5","@stdlib/ndarray/fancy":"1j6","@stdlib/ndarray-fancy":"1j7","@stdlib/slice/base/length":"1j8","@stdlib/slice-base-length":"1j9","@stdlib/slice/base/normalize-multi-slice":"1jA","@stdlib/slice-base-normalize-multi-slice":"1jB","@stdlib/slice/base/normalize-slice":"1jC","@stdlib/slice-base-normalize-slice":"1jD","@stdlib/slice/base/seq2multislice":"1jE","@stdlib/slice-base-seq2multislice":"1jF","@stdlib/slice/base/shape":"1jG","@stdlib/slice-base-shape":"1jH","@stdlib/string/base/remove-last-code-point":"1jI","@stdlib/string-base-remove-last-code-point":"1jJ","@stdlib/string/base/remove-last-grapheme-cluster":"1jK","@stdlib/string-base-remove-last-grapheme-cluster":"1jL","@stdlib/string/base/remove-last":"1jM","@stdlib/string-base-remove-last":"1jN","@stdlib/ndarray/base/slice-assign":"1jO","@stdlib/ndarray-base-slice-assign":"1jP","@stdlib/ndarray/base/slice":"1jQ","@stdlib/ndarray-base-slice":"1jR","@stdlib/ndarray/slice-assign":"1jS","@stdlib/ndarray-slice-assign":"1jT","@stdlib/ndarray/slice":"1jU","@stdlib/ndarray-slice":"1jV","@stdlib/slice/base/nonreduced-dimensions":"1jW","@stdlib/slice-base-nonreduced-dimensions":"1jX","@stdlib/slice/base/reduced-dimensions":"1jY","@stdlib/slice-base-reduced-dimensions":"1jZ","@stdlib/slice/base/sargs2multislice":"1ja","@stdlib/slice-base-sargs2multislice":"1jb","@stdlib/ndarray/base/ndims":"1jc","@stdlib/ndarray-base-ndims":"1jd","@stdlib/ndarray/base/next-cartesian-index":"1je","@stdlib/ndarray-base-next-cartesian-index":"1jf","@stdlib/ndarray/base/offset":"1jg","@stdlib/ndarray-base-offset":"1jh","@stdlib/ndarray/base/shape":"1ji","@stdlib/ndarray-base-shape":"1jj","@stdlib/ndarray/base/strides":"1jk","@stdlib/ndarray-base-strides":"1jl","@stdlib/ndarray/broadcast-array":"1jm","@stdlib/ndarray-broadcast-array":"1jn","@stdlib/ndarray/iter/columns":"1jo","@stdlib/ndarray-iter-columns":"1jp","@stdlib/ndarray/iter/entries":"1jq","@stdlib/ndarray-iter-entries":"1jr","@stdlib/ndarray/iter/indices":"1js","@stdlib/ndarray-iter-indices":"1jt","@stdlib/ndarray/iter":"1ju","@stdlib/ndarray-iter":"1jv","@stdlib/ndarray/iter/rows":"1jw","@stdlib/ndarray-iter-rows":"1jx","@stdlib/ndarray/iter/to-array-each":"1jy","@stdlib/ndarray-iter-to-array-each":"1jz","@stdlib/ndarray/iter/values":"1k0","@stdlib/ndarray-iter-values":"1k1","@stdlib/ndarray/maybe-broadcast-array":"1k2","@stdlib/ndarray-maybe-broadcast-array":"1k3","@stdlib/ndarray/ndims":"1k4","@stdlib/ndarray-ndims":"1k5","@stdlib/ndarray/numel":"1k6","@stdlib/ndarray-numel":"1k7","@stdlib/ndarray/offset":"1k8","@stdlib/ndarray-offset":"1k9","@stdlib/ndarray/shape":"1kA","@stdlib/ndarray-shape":"1kB","@stdlib/ndarray/strides":"1kC","@stdlib/ndarray-strides":"1kD","@stdlib/ndarray/base/assert/is-mostly-safe-data-type-cast":"1kE","@stdlib/ndarray-base-assert-is-mostly-safe-data-type-cast":"1kF","@stdlib/ndarray/base/assign":"1kG","@stdlib/ndarray-base-assign":"1kH","@stdlib/ndarray/base/data-buffer":"1kI","@stdlib/ndarray-base-data-buffer":"1kJ","@stdlib/ndarray/base/dtype":"1kK","@stdlib/ndarray-base-dtype":"1kL","@stdlib/ndarray/base/order":"1kM","@stdlib/ndarray-base-order":"1kN","@stdlib/ndarray/base/reverse":"1kO","@stdlib/ndarray-base-reverse":"1kP","@stdlib/ndarray/base/slice-dimension":"1kQ","@stdlib/ndarray-base-slice-dimension":"1kR","@stdlib/ndarray/data-buffer":"1kS","@stdlib/ndarray-data-buffer":"1kT","@stdlib/ndarray/dtype":"1kU","@stdlib/ndarray-dtype":"1kV","@stdlib/ndarray/mostly-safe-casts":"1kW","@stdlib/ndarray-mostly-safe-casts":"1kX","@stdlib/ndarray/order":"1kY","@stdlib/ndarray-order":"1kZ","@stdlib/ndarray/slice-dimension":"1ka","@stdlib/ndarray-slice-dimension":"1kb","@stdlib/slice/base/args2multislice":"1kc","@stdlib/slice-base-args2multislice":"1kd","@stdlib/array/base/broadcasted-quaternary2d":"1ke","@stdlib/array-base-broadcasted-quaternary2d":"1kf","@stdlib/array/base/broadcasted-quinary2d":"1kg","@stdlib/array-base-broadcasted-quinary2d":"1kh","@stdlib/array/base/broadcasted-ternary2d":"1ki","@stdlib/array-base-broadcasted-ternary2d":"1kj","@stdlib/array/base/quaternary2d":"1kk","@stdlib/array-base-quaternary2d":"1kl","@stdlib/array/base/quinary2d":"1km","@stdlib/array-base-quinary2d":"1kn","@stdlib/array/base/strided2array2d":"1ko","@stdlib/array-base-strided2array2d":"1kp","@stdlib/array/base/strided2array3d":"1kq","@stdlib/array-base-strided2array3d":"1kr","@stdlib/array/base/strided2array4d":"1ks","@stdlib/array-base-strided2array4d":"1kt","@stdlib/array/base/strided2array5d":"1ku","@stdlib/array-base-strided2array5d":"1kv","@stdlib/array/base/ternary2d":"1kw","@stdlib/array-base-ternary2d":"1kx","@stdlib/array/base/ternary3d":"1ky","@stdlib/array-base-ternary3d":"1kz","@stdlib/array/base/ternary4d":"1l0","@stdlib/array-base-ternary4d":"1l1","@stdlib/array/base/ternary5d":"1l2","@stdlib/array-base-ternary5d":"1l3","@stdlib/ndarray/base/fliplr":"1l4","@stdlib/ndarray-base-fliplr":"1l5","@stdlib/ndarray/base/flipud":"1l6","@stdlib/ndarray-base-flipud":"1l7","@stdlib/ndarray/base/normalize-index":"1l8","@stdlib/ndarray-base-normalize-index":"1l9","@stdlib/ndarray/base/reverse-dimension":"1lA","@stdlib/ndarray-base-reverse-dimension":"1lB","@stdlib/ndarray/base/slice-dimension-from":"1lC","@stdlib/ndarray-base-slice-dimension-from":"1lD","@stdlib/ndarray/base/slice-dimension-to":"1lE","@stdlib/ndarray-base-slice-dimension-to":"1lF","@stdlib/ndarray/base/slice-from":"1lG","@stdlib/ndarray-base-slice-from":"1lH","@stdlib/ndarray/base/slice-to":"1lI","@stdlib/ndarray-base-slice-to":"1lJ","@stdlib/ndarray/iter/column-entries":"1lK","@stdlib/ndarray-iter-column-entries":"1lL","@stdlib/ndarray/iter/matrices":"1lM","@stdlib/ndarray-iter-matrices":"1lN","@stdlib/ndarray/iter/matrix-entries":"1lO","@stdlib/ndarray-iter-matrix-entries":"1lP","@stdlib/ndarray/iter/row-entries":"1lQ","@stdlib/ndarray-iter-row-entries":"1lR","@stdlib/ndarray/slice-dimension-from":"1lS","@stdlib/ndarray-slice-dimension-from":"1lT","@stdlib/ndarray/slice-dimension-to":"1lU","@stdlib/ndarray-slice-dimension-to":"1lV","@stdlib/string/base/reverse-code-points":"1lW","@stdlib/string-base-reverse-code-points":"1lX","@stdlib/string/base/reverse-grapheme-clusters":"1lY","@stdlib/string-base-reverse-grapheme-clusters":"1lZ","@stdlib/string/base/reverse":"1la","@stdlib/string-base-reverse":"1lb","@stdlib/string/base/truncate-middle":"1lc","@stdlib/string-base-truncate-middle":"1ld","@stdlib/string/next-code-point-index":"1le","@stdlib/string-next-code-point-index":"1lf","@stdlib/array/base/fliplr2d":"1lg","@stdlib/array-base-fliplr2d":"1lh","@stdlib/array/base/flipud2d":"1li","@stdlib/array-base-flipud2d":"1lj","@stdlib/array/base/from-strided":"1lk","@stdlib/array-base-from-strided":"1ll","@stdlib/array/base/map2d":"1lm","@stdlib/array-base-map2d":"1ln","@stdlib/array/base/map3d":"1lo","@stdlib/array-base-map3d":"1lp","@stdlib/array/base/quaternary3d":"1lq","@stdlib/array-base-quaternary3d":"1lr","@stdlib/array/base/quaternary4d":"1ls","@stdlib/array-base-quaternary4d":"1lt","@stdlib/array/base/quaternary5d":"1lu","@stdlib/array-base-quaternary5d":"1lv","@stdlib/array/base/resolve-getter":"1lw","@stdlib/array-base-resolve-getter":"1lx","@stdlib/array/base/take-indexed":"1ly","@stdlib/array-base-take-indexed":"1lz","@stdlib/array/base/take2d":"1m0","@stdlib/array-base-take2d":"1m1","@stdlib/math/base/napi/quaternary":"1m2","@stdlib/math-base-napi-quaternary":"1m3","@stdlib/math/base/napi/quinary":"1m4","@stdlib/math-base-napi-quinary":"1m5","@stdlib/math/base/ops/add3":"1m6","@stdlib/math-base-ops-add3":"1m7","@stdlib/math/base/ops/add4":"1m8","@stdlib/math-base-ops-add4":"1m9","@stdlib/math/base/ops/add5":"1mA","@stdlib/math-base-ops-add5":"1mB","@stdlib/math/base/ops/div":"1mC","@stdlib/math-base-ops-div":"1mD","@stdlib/math/base/ops/divf":"1mE","@stdlib/math-base-ops-divf":"1mF","@stdlib/math/base/special/factorial2":"1mG","@stdlib/math-base-special-factorial2":"1mH","@stdlib/array/base/fliplr3d":"1mI","@stdlib/array-base-fliplr3d":"1mJ","@stdlib/array/base/fliplr4d":"1mK","@stdlib/array-base-fliplr4d":"1mL","@stdlib/array/base/fliplr5d":"1mM","@stdlib/array-base-fliplr5d":"1mN","@stdlib/array/base/map4d":"1mO","@stdlib/array-base-map4d":"1mP","@stdlib/array/base/map5d":"1mQ","@stdlib/array-base-map5d":"1mR","@stdlib/array/base/take3d":"1mS","@stdlib/array-base-take3d":"1mT","@stdlib/assert/is-complex128matrix-like":"1mU","@stdlib/assert-is-complex128matrix-like":"1mV","@stdlib/assert/is-complex128ndarray-like":"1mW","@stdlib/assert-is-complex128ndarray-like":"1mX","@stdlib/assert/is-complex128vector-like":"1mY","@stdlib/assert-is-complex128vector-like":"1mZ","@stdlib/assert/is-complex64matrix-like":"1ma","@stdlib/assert-is-complex64matrix-like":"1mb","@stdlib/assert/is-complex64ndarray-like":"1mc","@stdlib/assert-is-complex64ndarray-like":"1md","@stdlib/assert/is-complex64vector-like":"1me","@stdlib/assert-is-complex64vector-like":"1mf","@stdlib/ndarray/base/stride":"1mg","@stdlib/ndarray-base-stride":"1mh","@stdlib/ndarray/slice-to":"1mi","@stdlib/ndarray-slice-to":"1mj","@stdlib/ndarray/stride":"1mk","@stdlib/ndarray-stride":"1ml","@stdlib/array/base/first":"1mm","@stdlib/array-base-first":"1mn","@stdlib/array/base/index-of":"1mo","@stdlib/array-base-index-of":"1mp","@stdlib/array/base/last-index-of":"1mq","@stdlib/array-base-last-index-of":"1mr","@stdlib/array/base/slice":"1ms","@stdlib/array-base-slice":"1mt","@stdlib/iter/while-each":"1mu","@stdlib/iter-while-each":"1mv","@stdlib/ndarray/slice-from":"1mw","@stdlib/ndarray-slice-from":"1mx","@stdlib/string/base/altcase":"1my","@stdlib/string-base-altcase":"1mz","@stdlib/string/base/distances/hamming":"1n0","@stdlib/string-base-distances-hamming":"1n1","@stdlib/array/base/bifurcate-entries":"1n2","@stdlib/array-base-bifurcate-entries":"1n3","@stdlib/array/base/bifurcate-indices":"1n4","@stdlib/array-base-bifurcate-indices":"1n5","@stdlib/array/base/bifurcate-values":"1n6","@stdlib/array-base-bifurcate-values":"1n7","@stdlib/array/base/dedupe":"1n8","@stdlib/array-base-dedupe":"1n9","@stdlib/array/base/flipud3d":"1nA","@stdlib/array-base-flipud3d":"1nB","@stdlib/array/base/flipud4d":"1nC","@stdlib/array-base-flipud4d":"1nD","@stdlib/array/base/flipud5d":"1nE","@stdlib/array-base-flipud5d":"1nF","@stdlib/array/base/group-entries":"1nG","@stdlib/array-base-group-entries":"1nH","@stdlib/array/base/group-indices":"1nI","@stdlib/array-base-group-indices":"1nJ","@stdlib/array/base/group-values":"1nK","@stdlib/array-base-group-values":"1nL","@stdlib/array/base/quinary3d":"1nM","@stdlib/array-base-quinary3d":"1nN","@stdlib/array/base/quinary4d":"1nO","@stdlib/array-base-quinary4d":"1nP","@stdlib/array/base/quinary5d":"1nQ","@stdlib/array-base-quinary5d":"1nR","@stdlib/array/base/to-deduped":"1nS","@stdlib/array-base-to-deduped":"1nT","@stdlib/ndarray/base/broadcast-arrays":"1nU","@stdlib/ndarray-base-broadcast-arrays":"1nV","@stdlib/ndarray/base/flags":"1nW","@stdlib/ndarray-base-flags":"1nX","@stdlib/ndarray/base/maybe-broadcast-arrays":"1nY","@stdlib/ndarray-base-maybe-broadcast-arrays":"1nZ","@stdlib/ndarray/broadcast-arrays":"1na","@stdlib/ndarray-broadcast-arrays":"1nb","@stdlib/ndarray/maybe-broadcast-arrays":"1nc","@stdlib/ndarray-maybe-broadcast-arrays":"1nd","@stdlib/array/base/bifurcate-entries-by":"1ne","@stdlib/array-base-bifurcate-entries-by":"1nf","@stdlib/array/base/bifurcate-indices-by":"1ng","@stdlib/array-base-bifurcate-indices-by":"1nh","@stdlib/array/base/bifurcate-values-by":"1ni","@stdlib/array-base-bifurcate-values-by":"1nj","@stdlib/array/base/group-entries-by":"1nk","@stdlib/array-base-group-entries-by":"1nl","@stdlib/array/base/group-indices-by":"1nm","@stdlib/array-base-group-indices-by":"1nn","@stdlib/array/base/group-values-by":"1no","@stdlib/array-base-group-values-by":"1np","@stdlib/array/defaults":"1nq","@stdlib/array-defaults":"1nr","@stdlib/ndarray/base/flag":"1ns","@stdlib/ndarray-base-flag":"1nt","@stdlib/ndarray/base/numel-dimension":"1nu","@stdlib/ndarray-base-numel-dimension":"1nv","@stdlib/ndarray/flag":"1nw","@stdlib/ndarray-flag":"1nx","@stdlib/ndarray/flags":"1ny","@stdlib/ndarray-flags":"1nz","@stdlib/ndarray/numel-dimension":"1o0","@stdlib/ndarray-numel-dimension":"1o1","@stdlib/random/array/bernoulli":"1o2","@stdlib/random-array-bernoulli":"1o3","@stdlib/random/array/chi":"1o4","@stdlib/random-array-chi":"1o5","@stdlib/random/array/chisquare":"1o6","@stdlib/random-array-chisquare":"1o7","@stdlib/random/array/poisson":"1o8","@stdlib/random-array-poisson":"1o9","@stdlib/random/array/rayleigh":"1oA","@stdlib/random-array-rayleigh":"1oB","@stdlib/random/array/t":"1oC","@stdlib/random-array-t":"1oD","@stdlib/random/array/tools/nullary":"1oE","@stdlib/random-array-tools-nullary":"1oF","@stdlib/random/array/tools/unary-factory":"1oG","@stdlib/random-array-tools-unary-factory":"1oH","@stdlib/random/array/tools/unary":"1oI","@stdlib/random-array-tools-unary":"1oJ","@stdlib/array/base/any-by-right":"1oK","@stdlib/array-base-any-by-right":"1oL","@stdlib/array/base/any-by":"1oM","@stdlib/array-base-any-by":"1oN","@stdlib/array/base/any":"1oO","@stdlib/array-base-any":"1oP","@stdlib/array/base/assert/has-same-values":"1oQ","@stdlib/array-base-assert-has-same-values":"1oR","@stdlib/array/base/assert/is-complex128array":"1oS","@stdlib/array-base-assert-is-complex128array":"1oT","@stdlib/array/base/assert/is-complex64array":"1oU","@stdlib/array-base-assert-is-complex64array":"1oV","@stdlib/array/base/at":"1oW","@stdlib/array-base-at":"1oX","@stdlib/array/base/at2d":"1oY","@stdlib/array-base-at2d":"1oZ","@stdlib/array/base/at3d":"1oa","@stdlib/array-base-at3d":"1ob","@stdlib/array/base/at4d":"1oc","@stdlib/array-base-at4d":"1od","@stdlib/array/base/at5d":"1oe","@stdlib/array-base-at5d":"1of","@stdlib/array/base/atnd":"1og","@stdlib/array-base-atnd":"1oh","@stdlib/array/base/every-by-right":"1oi","@stdlib/array-base-every-by-right":"1oj","@stdlib/array/base/every-by":"1ok","@stdlib/array-base-every-by":"1ol","@stdlib/array/base/every":"1om","@stdlib/array-base-every":"1on","@stdlib/array/base/filter":"1oo","@stdlib/array-base-filter":"1op","@stdlib/array/base/mskfilter":"1oq","@stdlib/array-base-mskfilter":"1or","@stdlib/array/base/none-by-right":"1os","@stdlib/array-base-none-by-right":"1ot","@stdlib/array/base/none-by":"1ou","@stdlib/array-base-none-by":"1ov","@stdlib/array/base/none":"1ow","@stdlib/array-base-none":"1ox","@stdlib/array/base/resolve-setter":"1oy","@stdlib/array-base-resolve-setter":"1oz","@stdlib/array/base/reverse":"1p0","@stdlib/array-base-reverse":"1p1","@stdlib/array/base/to-reversed":"1p2","@stdlib/array-base-to-reversed":"1p3","@stdlib/array/cartesian-power":"1p4","@stdlib/array-cartesian-power":"1p5","@stdlib/array/cartesian-product":"1p6","@stdlib/array-cartesian-product":"1p7","@stdlib/array/cartesian-square":"1p8","@stdlib/array-cartesian-square":"1p9","@stdlib/array/one-to-like":"1pA","@stdlib/array-one-to-like":"1pB","@stdlib/array/one-to":"1pC","@stdlib/array-one-to":"1pD","@stdlib/array/slice":"1pE","@stdlib/array-slice":"1pF","@stdlib/array/zero-to-like":"1pG","@stdlib/array-zero-to-like":"1pH","@stdlib/array/zero-to":"1pI","@stdlib/array-zero-to":"1pJ","@stdlib/assert/is-same-array":"1pK","@stdlib/assert-is-same-array":"1pL","@stdlib/assert/is-same-complex128":"1pM","@stdlib/assert-is-same-complex128":"1pN","@stdlib/assert/is-same-complex128array":"1pO","@stdlib/assert-is-same-complex128array":"1pP","@stdlib/assert/is-same-complex64":"1pQ","@stdlib/assert-is-same-complex64":"1pR","@stdlib/assert/is-same-complex64array":"1pS","@stdlib/assert-is-same-complex64array":"1pT","@stdlib/assert/is-same-float32array":"1pU","@stdlib/assert-is-same-float32array":"1pV","@stdlib/assert/is-same-float64array":"1pW","@stdlib/assert-is-same-float64array":"1pX","@stdlib/complex/float64/base/assert/is-equal":"1pY","@stdlib/complex-base-assert-is-equal":"1pZ","@stdlib/complex/base/assert/is-equalf":"1pa","@stdlib/complex-base-assert-is-equalf":"1pb","@stdlib/complex/base/assert/is-not-equal":"1pc","@stdlib/complex-base-assert-is-not-equal":"1pd","@stdlib/complex/base/assert/is-not-equalf":"1pe","@stdlib/complex-base-assert-is-not-equalf":"1pf","@stdlib/complex/base/assert/is-same-value-zero":"1pg","@stdlib/complex-base-assert-is-same-value-zero":"1ph","@stdlib/complex/base/assert/is-same-value-zerof":"1pi","@stdlib/complex-base-assert-is-same-value-zerof":"1pj","@stdlib/complex/base/assert/is-same-value":"1pk","@stdlib/complex-base-assert-is-same-value":"1pl","@stdlib/complex/base/assert/is-same-valuef":"1pm","@stdlib/complex-base-assert-is-same-valuef":"1pn","@stdlib/complex/base/assert":"1po","@stdlib/complex-base-assert":"1pp","@stdlib/constants/complex128/nan":"1pq","@stdlib/constants-complex128-nan":"1pr","@stdlib/constants/complex128/zero":"1ps","@stdlib/constants-complex128-zero":"1pt","@stdlib/constants/complex64/nan":"1pu","@stdlib/constants-complex64-nan":"1pv","@stdlib/constants/complex64/zero":"1pw","@stdlib/constants-complex64-zero":"1px","@stdlib/constants/float32/nan":"1py","@stdlib/constants-float32-nan":"1pz","@stdlib/constants/float64/nan":"1q0","@stdlib/constants-float64-nan":"1q1","@stdlib/ndarray/at":"1q2","@stdlib/ndarray-at":"1q3","@stdlib/number/float32/base/assert/is-same-value-zero":"1q4","@stdlib/number-float32-base-assert-is-same-value-zero":"1q5","@stdlib/number/float32/base/assert/is-same-value":"1q6","@stdlib/number-float32-base-assert-is-same-value":"1q7","@stdlib/number/float32/base/assert":"1q8","@stdlib/number-float32-base-assert":"1q9","@stdlib/number/float64/base/assert/is-same-value-zero":"1qA","@stdlib/number-float64-base-assert-is-same-value-zero":"1qB","@stdlib/number/float64/base/assert/is-same-value":"1qC","@stdlib/number-float64-base-assert-is-same-value":"1qD","@stdlib/number/float64/base/assert":"1qE","@stdlib/number-float64-base-assert":"1qF","@stdlib/random/array/binomial":"1qG","@stdlib/random-array-binomial":"1qH","@stdlib/random/array/cauchy":"1qI","@stdlib/random-array-cauchy":"1qJ","@stdlib/random/array/erlang":"1qK","@stdlib/random-array-erlang":"1qL","@stdlib/random/array/f":"1qM","@stdlib/random-array-f":"1qN","@stdlib/random/array/frechet":"1qO","@stdlib/random-array-frechet":"1qP","@stdlib/random/array/gumbel":"1qQ","@stdlib/random-array-gumbel":"1qR","@stdlib/random/array/hypergeometric":"1qS","@stdlib/random-array-hypergeometric":"1qT","@stdlib/random/array/kumaraswamy":"1qU","@stdlib/random-array-kumaraswamy":"1qV","@stdlib/random/array/laplace":"1qW","@stdlib/random-array-laplace":"1qX","@stdlib/random/array/levy":"1qY","@stdlib/random-array-levy":"1qZ","@stdlib/random/array/logistic":"1qa","@stdlib/random-array-logistic":"1qb","@stdlib/random/array/negative-binomial":"1qc","@stdlib/random-array-negative-binomial":"1qd","@stdlib/random/array/pareto-type1":"1qe","@stdlib/random-array-pareto-type1":"1qf","@stdlib/random/array/tools/binary-factory":"1qg","@stdlib/random-array-tools-binary-factory":"1qh","@stdlib/random/array/tools/binary":"1qi","@stdlib/random-array-tools-binary":"1qj","@stdlib/random/array/tools/ternary-factory":"1qk","@stdlib/random-array-tools-ternary-factory":"1ql","@stdlib/random/array/tools/ternary":"1qm","@stdlib/random-array-tools-ternary":"1qn","@stdlib/random/array/triangular":"1qo","@stdlib/random-array-triangular":"1qp","@stdlib/random/array/weibull":"1qq","@stdlib/random-array-weibull":"1qr","@stdlib/array/base/assert/is-complex-floating-point-data-type":"1qs","@stdlib/array-base-assert-is-complex-floating-point-data-type":"1qt","@stdlib/array/base/assert/is-data-type":"1qu","@stdlib/array-base-assert-is-data-type":"1qv","@stdlib/array/base/assert/is-floating-point-data-type":"1qw","@stdlib/array-base-assert-is-floating-point-data-type":"1qx","@stdlib/array/base/assert/is-integer-data-type":"1qy","@stdlib/array-base-assert-is-integer-data-type":"1qz","@stdlib/array/base/assert/is-mostly-safe-data-type-cast":"1r0","@stdlib/array-base-assert-is-mostly-safe-data-type-cast":"1r1","@stdlib/array/base/assert/is-numeric-data-type":"1r2","@stdlib/array-base-assert-is-numeric-data-type":"1r3","@stdlib/array/base/assert/is-real-data-type":"1r4","@stdlib/array-base-assert-is-real-data-type":"1r5","@stdlib/array/base/assert/is-real-floating-point-data-type":"1r6","@stdlib/array-base-assert-is-real-floating-point-data-type":"1r7","@stdlib/array/base/assert/is-safe-data-type-cast":"1r8","@stdlib/array-base-assert-is-safe-data-type-cast":"1r9","@stdlib/array/base/assert/is-same-kind-data-type-cast":"1rA","@stdlib/array-base-assert-is-same-kind-data-type-cast":"1rB","@stdlib/array/base/assert/is-signed-integer-data-type":"1rC","@stdlib/array-base-assert-is-signed-integer-data-type":"1rD","@stdlib/array/base/assert/is-unsigned-integer-data-type":"1rE","@stdlib/array-base-assert-is-unsigned-integer-data-type":"1rF","@stdlib/array/base/fancy-slice-assign":"1rG","@stdlib/array-base-fancy-slice-assign":"1rH","@stdlib/array/base/fancy-slice":"1rI","@stdlib/array-base-fancy-slice":"1rJ","@stdlib/array/base/min-signed-integer-dtype":"1rK","@stdlib/array-base-min-signed-integer-dtype":"1rL","@stdlib/array/base/min-unsigned-integer-dtype":"1rM","@stdlib/array-base-min-unsigned-integer-dtype":"1rN","@stdlib/array/base/mskreject":"1rO","@stdlib/array-base-mskreject":"1rP","@stdlib/array/base/reject":"1rQ","@stdlib/array-base-reject":"1rR","@stdlib/array/from-scalar":"1rS","@stdlib/array-from-scalar":"1rT","@stdlib/array/mostly-safe-casts":"1rU","@stdlib/array-mostly-safe-casts":"1rV","@stdlib/array/to-fancy":"1rW","@stdlib/array-to-fancy":"1rX","@stdlib/random/array/tools":"1rY","@stdlib/random-array-tools":"1rZ","@stdlib/random/strided/bernoulli":"1ra","@stdlib/random-strided-bernoulli":"1rb","@stdlib/random/strided/chi":"1rc","@stdlib/random-strided-chi":"1rd","@stdlib/random/strided/chisquare":"1re","@stdlib/random-strided-chisquare":"1rf","@stdlib/random/strided/geometric":"1rg","@stdlib/random-strided-geometric":"1rh","@stdlib/random/strided/poisson":"1ri","@stdlib/random-strided-poisson":"1rj","@stdlib/random/strided/rayleigh":"1rk","@stdlib/random-strided-rayleigh":"1rl","@stdlib/random/strided/t":"1rm","@stdlib/random-strided-t":"1rn","@stdlib/random/strided/tools/binary-factory":"1ro","@stdlib/random-strided-tools-binary-factory":"1rp","@stdlib/random/strided/tools":"1rq","@stdlib/random-strided-tools":"1rr","@stdlib/random/strided/tools/ternary-factory":"1rs","@stdlib/random-strided-tools-ternary-factory":"1rt","@stdlib/random/strided/tools/unary-factory":"1ru","@stdlib/random-strided-tools-unary-factory":"1rv","@stdlib/slice/base/int2slice":"1rw","@stdlib/slice-base-int2slice":"1rx","@stdlib/array/index":"1ry","@stdlib/array-index":"1rz","@stdlib/array/take":"1s0","@stdlib/array-take":"1s1","@stdlib/strided/base/reinterpret-complex":"1s2","@stdlib/strided-base-reinterpret-complex":"1s3","@stdlib/array/base/assert/is-complex-typed-array":"1s4","@stdlib/array-base-assert-is-complex-typed-array":"1s5","@stdlib/array/base/count-falsy":"1s6","@stdlib/array-base-count-falsy":"1s7","@stdlib/array/base/count-same-value":"1s8","@stdlib/array-base-count-same-value":"1s9","@stdlib/array/base/count-truthy":"1sA","@stdlib/array-base-count-truthy":"1sB","@stdlib/array/mskfilter":"1sC","@stdlib/array-mskfilter":"1sD","@stdlib/array/mskreject":"1sE","@stdlib/array-mskreject":"1sF","@stdlib/assert/is-negative-finite":"1sG","@stdlib/assert-is-negative-finite":"1sH","@stdlib/assert/is-nonnegative-finite":"1sI","@stdlib/assert-is-nonnegative-finite":"1sJ","@stdlib/assert/is-positive-finite":"1sK","@stdlib/assert-is-positive-finite":"1sL","@stdlib/random/base/shared":"1sM","@stdlib/random-base-shared":"1sN","@stdlib/array/base/count-if":"1sO","@stdlib/array-base-count-if":"1sP","@stdlib/array/base/count-same-value-zero":"1sQ","@stdlib/array-base-count-same-value-zero":"1sR","@stdlib/array/base/with":"1sS","@stdlib/array-base-with":"1sT","@stdlib/assert/is-nonpositive-finite":"1sU","@stdlib/assert-is-nonpositive-finite":"1sV","@stdlib/assert/is-ragged-nested-array":"1sW","@stdlib/assert-is-ragged-nested-array":"1sX","@stdlib/assert/is-well-formed-string":"1sY","@stdlib/assert-is-well-formed-string":"1sZ","@stdlib/complex/base/parse":"1sa","@stdlib/complex-base-parse":"1sb","@stdlib/complex/float32/parse":"1sc","@stdlib/complex-parse-float32":"1sd","@stdlib/complex/float64/parse":"1se","@stdlib/complex-parse-float64":"1sf","@stdlib/iter/until-each":"1sg","@stdlib/iter-until-each":"1sh","@stdlib/math/base/special/csc":"1si","@stdlib/math-base-special-csc":"1sj","@stdlib/math/iter/sequences/tribonacci":"1sk","@stdlib/math-iter-sequences-tribonacci":"1sl","@stdlib/string/base/for-each-right":"1sm","@stdlib/string-base-for-each-right":"1sn","@stdlib/string/base/replace-after-last":"1so","@stdlib/string-base-replace-after-last":"1sp","@stdlib/string/base/replace-after":"1sq","@stdlib/string-base-replace-after":"1sr","@stdlib/string/base/replace-before-last":"1ss","@stdlib/string-base-replace-before-last":"1st","@stdlib/utils/every-in-by":"1su","@stdlib/utils-every-in-by":"1sv","@stdlib/utils/none-own-by":"1sw","@stdlib/utils-none-own-by":"1sx","@stdlib/utils/some-in-by":"1sy","@stdlib/utils-some-in-by":"1sz","@stdlib/array/base/join":"1t0","@stdlib/array-base-join":"1t1","@stdlib/array/base/take-map":"1t2","@stdlib/array-base-take-map":"1t3","@stdlib/assert/is-same-date-object":"1t4","@stdlib/assert-is-same-date-object":"1t5","@stdlib/blas/base/zcopy":"1t6","@stdlib/blas-base-zcopy":"1t7","@stdlib/blas/base/zswap":"1t8","@stdlib/blas-base-zswap":"1t9","@stdlib/constants/float32/fourth-pi":"1tA","@stdlib/constants-float32-fourth-pi":"1tB","@stdlib/constants/float32/half-pi":"1tC","@stdlib/constants-float32-half-pi":"1tD","@stdlib/constants/float32/pi":"1tE","@stdlib/constants-float32-pi":"1tF","@stdlib/constants/float32/two-pi":"1tG","@stdlib/constants-float32-two-pi":"1tH","@stdlib/iter/do-until-each":"1tI","@stdlib/iter-do-until-each":"1tJ","@stdlib/iter/do-while-each":"1tK","@stdlib/iter-do-while-each":"1tL","@stdlib/math/base/special/acosd":"1tM","@stdlib/math-base-special-acosd":"1tN","@stdlib/math/base/special/acosf":"1tO","@stdlib/math-base-special-acosf":"1tP","@stdlib/math/base/special/acotd":"1tQ","@stdlib/math-base-special-acotd":"1tR","@stdlib/math/base/special/acotf":"1tS","@stdlib/math-base-special-acotf":"1tT","@stdlib/math/base/special/acscd":"1tU","@stdlib/math-base-special-acscd":"1tV","@stdlib/math/base/special/acscf":"1tW","@stdlib/math-base-special-acscf":"1tX","@stdlib/math/base/special/asecd":"1tY","@stdlib/math-base-special-asecd":"1tZ","@stdlib/math/base/special/asecf":"1ta","@stdlib/math-base-special-asecf":"1tb","@stdlib/math/base/special/asind":"1tc","@stdlib/math-base-special-asind":"1td","@stdlib/math/base/special/asinf":"1te","@stdlib/math-base-special-asinf":"1tf","@stdlib/math/base/special/atand":"1tg","@stdlib/math-base-special-atand":"1th","@stdlib/math/base/special/atanf":"1ti","@stdlib/math-base-special-atanf":"1tj","@stdlib/math/base/special/cosd":"1tk","@stdlib/math-base-special-cosd":"1tl","@stdlib/math/base/special/cotd":"1tm","@stdlib/math-base-special-cotd":"1tn","@stdlib/math/base/special/cscd":"1to","@stdlib/math-base-special-cscd":"1tp","@stdlib/math/base/special/rad2degf":"1tq","@stdlib/math-base-special-rad2degf":"1tr","@stdlib/math/base/special/secd":"1ts","@stdlib/math-base-special-secd":"1tt","@stdlib/math/base/special/tand":"1tu","@stdlib/math-base-special-tand":"1tv","@stdlib/math/base/tools/evalpolyf":"1tw","@stdlib/math-base-tools-evalpolyf":"1tx","@stdlib/math/base/tools/evalrationalf":"1ty","@stdlib/math-base-tools-evalrationalf":"1tz","@stdlib/string/base/last-code-point":"1u0","@stdlib/string-base-last-code-point":"1u1","@stdlib/string/base/last-grapheme-cluster":"1u2","@stdlib/string-base-last-grapheme-cluster":"1u3","@stdlib/string/base/last":"1u4","@stdlib/string-base-last":"1u5","@stdlib/string/base/stickycase":"1u6","@stdlib/string-base-stickycase":"1u7","@stdlib/string/to-well-formed":"1u8","@stdlib/string-to-well-formed":"1u9","@stdlib/utils/any-in-by":"1uA","@stdlib/utils-any-in-by":"1uB","@stdlib/utils/any-own-by":"1uC","@stdlib/utils-any-own-by":"1uD","@stdlib/utils/every-own-by":"1uE","@stdlib/utils-every-own-by":"1uF","@stdlib/utils/none-in-by":"1uG","@stdlib/utils-none-in-by":"1uH","@stdlib/utils/parse-ndjson":"1uI","@stdlib/utils-parse-ndjson":"1uJ","@stdlib/utils/some-own-by":"1uK","@stdlib/utils-some-own-by":"1uL","@stdlib/array/base/mskfilter-map":"1uM","@stdlib/array-base-mskfilter-map":"1uN","@stdlib/array/base/mskreject-map":"1uO","@stdlib/array-base-mskreject-map":"1uP","@stdlib/array/bool":"1uQ","@stdlib/array-bool":"1uR","@stdlib/assert/napi/has-property":"1uS","@stdlib/assert-napi-has-property":"1uT","@stdlib/blas/base/dger":"1uU","@stdlib/blas-base-dger":"1uV","@stdlib/blas/base/drot":"1uW","@stdlib/blas-base-drot":"1uX","@stdlib/blas/base/idamax":"1uY","@stdlib/blas-base-idamax":"1uZ","@stdlib/blas/base/isamax":"1ua","@stdlib/blas-base-isamax":"1ub","@stdlib/blas/base/shared":"1uc","@stdlib/blas-base-shared":"1ud","@stdlib/blas/base/srot":"1ue","@stdlib/blas-base-srot":"1uf","@stdlib/blas/base/xerbla":"1ug","@stdlib/blas-base-xerbla":"1uh","@stdlib/complex/float32/base/assert/is-equal":"1ui","@stdlib/complex-float32-base-assert-is-equal":"1uj","@stdlib/complex/float32/base/assert/is-not-equal":"1uk","@stdlib/complex-float32-base-assert-is-not-equal":"1ul","@stdlib/complex/float32/base/assert/is-same-value-zero":"1um","@stdlib/complex-float32-base-assert-is-same-value-zero":"1un","@stdlib/complex/float32/base/assert/is-same-value":"1uo","@stdlib/complex-float32-base-assert-is-same-value":"1up","@stdlib/complex/float32":"1uq","@stdlib/complex/float64/base/assert/is-not-equal":"1us","@stdlib/complex-float64-base-assert-is-not-equal":"1ut","@stdlib/complex/float64/base/assert/is-same-value-zero":"1uu","@stdlib/complex-float64-base-assert-is-same-value-zero":"1uv","@stdlib/complex/float64/base/assert/is-same-value":"1uw","@stdlib/complex-float64-base-assert-is-same-value":"1ux","@stdlib/complex/float64":"1uy","@stdlib/constants/float32/phi":"1v0","@stdlib/constants-float32-phi":"1v1","@stdlib/fs/append-file":"1v2","@stdlib/fs-append-file":"1v3","@stdlib/math/base/special/acscdf":"1v4","@stdlib/math-base-special-acscdf":"1v5","@stdlib/math/base/special/asecdf":"1v6","@stdlib/math-base-special-asecdf":"1v7","@stdlib/math/base/special/asindf":"1v8","@stdlib/math-base-special-asindf":"1v9","@stdlib/math/base/special/kernel-log1p":"1vA","@stdlib/math-base-special-kernel-log1p":"1vB","@stdlib/math/base/special/rcbrtf":"1vC","@stdlib/math-base-special-rcbrtf":"1vD","@stdlib/math/base/tools/normhermitepolyf":"1vE","@stdlib/math-base-tools-normhermitepolyf":"1vF","@stdlib/napi/argv-complex128":"1vG","@stdlib/napi-argv-complex128":"1vH","@stdlib/napi/argv-complex64":"1vI","@stdlib/napi-argv-complex64":"1vJ","@stdlib/napi/create-complex-like":"1vK","@stdlib/napi-create-complex-like":"1vL","@stdlib/napi/create-double":"1vM","@stdlib/napi-create-double":"1vN","@stdlib/napi/create-int32":"1vO","@stdlib/napi-create-int32":"1vP","@stdlib/napi/create-uint32":"1vQ","@stdlib/napi-create-uint32":"1vR","@stdlib/string/base/for-each-code-point-right":"1vS","@stdlib/string-base-for-each-code-point-right":"1vT","@stdlib/string/last":"1vU","@stdlib/string-last":"1vV","@stdlib/assert/is-booleanarray":"1vW","@stdlib/assert-is-booleanarray":"1vX","@stdlib/blas/base/assert/is-layout":"1vY","@stdlib/blas-base-assert-is-layout":"1vZ","@stdlib/blas/base/assert/is-matrix-triangle":"1va","@stdlib/blas-base-assert-is-matrix-triangle":"1vb","@stdlib/blas/base/assert/is-transpose-operation":"1vc","@stdlib/blas-base-assert-is-transpose-operation":"1vd","@stdlib/blas/base/assert":"1ve","@stdlib/blas-base-assert":"1vf","@stdlib/blas/base/cscal":"1vg","@stdlib/blas-base-cscal":"1vh","@stdlib/blas/base/dcabs1":"1vi","@stdlib/blas-base-dcabs1":"1vj","@stdlib/blas/base/diagonal-types":"1vk","@stdlib/blas-base-diagonal-types":"1vl","@stdlib/blas/base/layout-enum2str":"1vm","@stdlib/blas-base-layout-enum2str":"1vn","@stdlib/blas/base/layout-resolve-enum":"1vo","@stdlib/blas-base-layout-resolve-enum":"1vp","@stdlib/blas/base/layout-resolve-str":"1vq","@stdlib/blas-base-layout-resolve-str":"1vr","@stdlib/blas/base/layout-str2enum":"1vs","@stdlib/blas-base-layout-str2enum":"1vt","@stdlib/blas/base/layouts":"1vu","@stdlib/blas-base-layouts":"1vv","@stdlib/blas/base/matrix-triangles":"1vw","@stdlib/blas-base-matrix-triangles":"1vx","@stdlib/blas/base/operation-sides":"1vy","@stdlib/blas-base-operation-sides":"1vz","@stdlib/blas/base/scabs1":"1w0","@stdlib/blas-base-scabs1":"1w1","@stdlib/blas/base/transpose-operations":"1w2","@stdlib/blas-base-transpose-operations":"1w3","@stdlib/strided/base/reinterpret-boolean":"1w4","@stdlib/strided-base-reinterpret-boolean":"1w5","@stdlib/array/base/assert/is-boolean-data-type":"1w6","@stdlib/array-base-assert-is-boolean-data-type":"1w7","@stdlib/array/base/assert/is-booleanarray":"1w8","@stdlib/array-base-assert-is-booleanarray":"1w9","@stdlib/array/base/cuany":"1wA","@stdlib/array-base-cuany":"1wB","@stdlib/array/base/cuevery":"1wC","@stdlib/array-base-cuevery":"1wD","@stdlib/array/base/mskput":"1wE","@stdlib/array-base-mskput":"1wF","@stdlib/array/base/place":"1wG","@stdlib/array-base-place":"1wH","@stdlib/array/base/put":"1wI","@stdlib/array-base-put":"1wJ","@stdlib/array/base/where":"1wK","@stdlib/array-base-where":"1wL","@stdlib/array/mskput":"1wM","@stdlib/array-mskput":"1wN","@stdlib/array/place":"1wO","@stdlib/array-place":"1wP","@stdlib/array/put":"1wQ","@stdlib/array-put":"1wR","@stdlib/assert/is-same-booleanarray":"1wS","@stdlib/assert-is-same-booleanarray":"1wT","@stdlib/blas/base/assert/is-diagonal-type":"1wU","@stdlib/blas-base-assert-is-diagonal-type":"1wV","@stdlib/blas/base/assert/is-operation-side":"1wW","@stdlib/blas-base-assert-is-operation-side":"1wX","@stdlib/blas/base/scnrm2":"1wY","@stdlib/blas-base-scnrm2":"1wZ","@stdlib/blas/base/srotm":"1wa","@stdlib/blas-base-srotm":"1wb","@stdlib/blas/base/sspmv":"1wc","@stdlib/blas-base-sspmv":"1wd","@stdlib/blas/base/ssymv":"1we","@stdlib/blas-base-ssymv":"1wf","@stdlib/blas/base/transpose-operation-enum2str":"1wg","@stdlib/blas-base-transpose-operation-enum2str":"1wh","@stdlib/blas/base/transpose-operation-resolve-enum":"1wi","@stdlib/blas-base-transpose-operation-resolve-enum":"1wj","@stdlib/blas/base/transpose-operation-resolve-str":"1wk","@stdlib/blas-base-transpose-operation-resolve-str":"1wl","@stdlib/blas/base/transpose-operation-str2enum":"1wm","@stdlib/blas-base-transpose-operation-str2enum":"1wn","@stdlib/blas/base/zscal":"1wo","@stdlib/blas-base-zscal":"1wp","@stdlib/math/base/special/lnf":"1wq","@stdlib/math-base-special-lnf":"1wr","@stdlib/math/base/special/nanmax":"1ws","@stdlib/math-base-special-nanmax":"1wt","@stdlib/math/base/special/nanmin":"1wu","@stdlib/math-base-special-nanmin":"1wv","@stdlib/array/base/cunone":"1ww","@stdlib/array-base-cunone":"1wx","@stdlib/blas/base/diagonal-type-enum2str":"1wy","@stdlib/blas-base-diagonal-type-enum2str":"1wz","@stdlib/blas/base/diagonal-type-resolve-enum":"1x0","@stdlib/blas-base-diagonal-type-resolve-enum":"1x1","@stdlib/blas/base/diagonal-type-resolve-str":"1x2","@stdlib/blas-base-diagonal-type-resolve-str":"1x3","@stdlib/blas/base/diagonal-type-str2enum":"1x4","@stdlib/blas-base-diagonal-type-str2enum":"1x5","@stdlib/blas/base/drotm":"1x6","@stdlib/blas-base-drotm":"1x7","@stdlib/blas/base/dspmv":"1x8","@stdlib/blas-base-dspmv":"1x9","@stdlib/blas/base/dsymv":"1xA","@stdlib/blas-base-dsymv":"1xB","@stdlib/blas/base/matrix-triangle-enum2str":"1xC","@stdlib/blas-base-matrix-triangle-enum2str":"1xD","@stdlib/blas/base/matrix-triangle-resolve-enum":"1xE","@stdlib/blas-base-matrix-triangle-resolve-enum":"1xF","@stdlib/blas/base/matrix-triangle-resolve-str":"1xG","@stdlib/blas-base-matrix-triangle-resolve-str":"1xH","@stdlib/blas/base/matrix-triangle-str2enum":"1xI","@stdlib/blas-base-matrix-triangle-str2enum":"1xJ","@stdlib/blas/base/operation-side-enum2str":"1xK","@stdlib/blas-base-operation-side-enum2str":"1xL","@stdlib/blas/base/operation-side-resolve-enum":"1xM","@stdlib/blas-base-operation-side-resolve-enum":"1xN","@stdlib/blas/base/operation-side-resolve-str":"1xO","@stdlib/blas-base-operation-side-resolve-str":"1xP","@stdlib/blas/base/operation-side-str2enum":"1xQ","@stdlib/blas-base-operation-side-str2enum":"1xR","@stdlib/iter/cuany":"1xS","@stdlib/iter-cuany":"1xT","@stdlib/strided/base/stride2offset":"1xU","@stdlib/strided-base-stride2offset":"1xV","@stdlib/utils/async/parallel":"1xW","@stdlib/utils-async-parallel":"1xX","@stdlib/blas/base/csrot":"1xY","@stdlib/blas-base-csrot":"1xZ","@stdlib/blas/base/dznrm2":"1xa","@stdlib/blas-base-dznrm2":"1xb","@stdlib/blas/base/zaxpy":"1xc","@stdlib/blas-base-zaxpy":"1xd","@stdlib/blas/base/zdrot":"1xe","@stdlib/blas-base-zdrot":"1xf","@stdlib/lapack/base/dlaswp":"1xg","@stdlib/lapack-base-dlaswp":"1xh","@stdlib/lapack/base":"1xi","@stdlib/lapack-base":"1xj","@stdlib/lapack":"1xl","@stdlib/ndarray/base/assert/is-boolean-data-type":"1xm","@stdlib/ndarray-base-assert-is-boolean-data-type":"1xn","@stdlib/blas/base/caxpy":"1xo","@stdlib/blas-base-caxpy":"1xp","@stdlib/blas/base/scasum":"1xq","@stdlib/blas-base-scasum":"1xr","@stdlib/complex/float32/base/add":"1xs","@stdlib/complex-float32-base-add":"1xt","@stdlib/complex/float32/base/assert":"1xu","@stdlib/complex-float32-base-assert":"1xv","@stdlib/complex/float32/base/mul":"1xw","@stdlib/complex-float32-base-mul":"1xx","@stdlib/complex/float32/base":"1xy","@stdlib/complex-float32-base":"1xz","@stdlib/complex/float32/conj":"1y0","@stdlib/complex-float32-conj":"1y1","@stdlib/complex/float32/imag":"1y2","@stdlib/complex-float32-imag":"1y3","@stdlib/complex/float32/real":"1y4","@stdlib/complex-float32-real":"1y5","@stdlib/complex/float32/reim":"1y6","@stdlib/complex-float32-reim":"1y7","@stdlib/complex/float64/base/add":"1y8","@stdlib/complex-float64-base-add":"1y9","@stdlib/complex/float64/base/assert":"1yA","@stdlib/complex-float64-base-assert":"1yB","@stdlib/complex/float64/base/mul":"1yC","@stdlib/complex-float64-base-mul":"1yD","@stdlib/complex/float64/base":"1yE","@stdlib/complex-float64-base":"1yF","@stdlib/complex/float64/conj":"1yG","@stdlib/complex-float64-conj":"1yH","@stdlib/complex/float64/imag":"1yI","@stdlib/complex-float64-imag":"1yJ","@stdlib/complex/float64/real":"1yK","@stdlib/complex-float64-real":"1yL","@stdlib/complex/float64/reim":"1yM","@stdlib/complex-float64-reim":"1yN","@stdlib/constants/float64/max-safe-nth-factorial":"1yO","@stdlib/constants-float64-max-safe-nth-factorial":"1yP","@stdlib/math/base/special/fmod":"1yQ","@stdlib/math-base-special-fmod":"1yR","@stdlib/fs/resolve-parent-paths":"1yS","@stdlib/fs-resolve-parent-paths":"1yT","@stdlib/iter/cusome":"1yU","@stdlib/iter-cusome":"1yV","@stdlib/ndarray/base/for-each":"1yW","@stdlib/ndarray-base-for-each":"1yX","@stdlib/blas/base/dgemv":"1yY","@stdlib/blas-base-dgemv":"1yZ","@stdlib/blas/base/dsyr":"1ya","@stdlib/blas-base-dsyr":"1yb","@stdlib/blas/base/dsyr2":"1yc","@stdlib/blas-base-dsyr2":"1yd","@stdlib/blas/base/dtrmv":"1ye","@stdlib/blas-base-dtrmv":"1yf","@stdlib/blas/base/sgemv":"1yg","@stdlib/blas-base-sgemv":"1yh","@stdlib/blas/base/ssyr":"1yi","@stdlib/blas-base-ssyr":"1yj","@stdlib/blas/base/ssyr2":"1yk","@stdlib/blas-base-ssyr2":"1yl","@stdlib/blas/base/strmv":"1ym","@stdlib/blas-base-strmv":"1yn","@stdlib/lapack/base/dlacpy":"1yo","@stdlib/lapack-base-dlacpy":"1yp","@stdlib/lapack/base/dlassq":"1yq","@stdlib/lapack-base-dlassq":"1yr","@stdlib/lapack/base/dpttrf":"1ys","@stdlib/lapack-base-dpttrf":"1yt","@stdlib/lapack/base/slacpy":"1yu","@stdlib/lapack-base-slacpy":"1yv","@stdlib/lapack/base/spttrf":"1yw","@stdlib/lapack-base-spttrf":"1yx","@stdlib/array/base/remove-at":"1yy","@stdlib/array-base-remove-at":"1yz","@stdlib/array/base/without":"1z0","@stdlib/array-base-without":"1z1","@stdlib/blas/base/dgemm":"1z2","@stdlib/blas-base-dgemm":"1z3","@stdlib/blas/base/dtrsv":"1z4","@stdlib/blas-base-dtrsv":"1z5","@stdlib/blas/base/sgemm":"1z6","@stdlib/blas-base-sgemm":"1z7","@stdlib/blas/base/sspr":"1z8","@stdlib/blas-base-sspr":"1z9","@stdlib/blas/base/strsv":"1zA","@stdlib/blas-base-strsv":"1zB","@stdlib/constants/float32/max-base2-exponent-subnormal":"1zC","@stdlib/constants-float32-max-base2-exponent-subnormal":"1zD","@stdlib/constants/float32/max-base2-exponent":"1zE","@stdlib/constants-float32-max-base2-exponent":"1zF","@stdlib/constants/float32/min-base2-exponent-subnormal":"1zG","@stdlib/constants-float32-min-base2-exponent-subnormal":"1zH","@stdlib/iter/cunone-by":"1zI","@stdlib/iter-cunone-by":"1zJ","@stdlib/lapack/base/dge-trans":"1zK","@stdlib/lapack-base-dge-trans":"1zL","@stdlib/lapack/base/sge-trans":"1zM","@stdlib/lapack-base-sge-trans":"1zN","@stdlib/lapack/base/slaswp":"1zO","@stdlib/lapack-base-slaswp":"1zP","@stdlib/math/base/assert/is-integerf":"1zQ","@stdlib/math-base-assert-is-integerf":"1zR","@stdlib/math/base/special/roundf":"1zS","@stdlib/math-base-special-roundf":"1zT","@stdlib/ndarray/base/map":"1zU","@stdlib/ndarray-base-map":"1zV","@stdlib/ndarray/base/ndarraylike2ndarray":"1zW","@stdlib/ndarray-base-ndarraylike2ndarray":"1zX","@stdlib/ndarray/iter/interleave-subarrays":"1zY","@stdlib/ndarray-iter-interleave-subarrays":"1zZ","@stdlib/ndarray/iter/select-dimension":"1za","@stdlib/ndarray-iter-select-dimension":"1zb","@stdlib/ndarray/iter/stacks":"1zc","@stdlib/ndarray-iter-stacks":"1zd","@stdlib/ndarray/iter/subarrays":"1ze","@stdlib/ndarray-iter-subarrays":"1zf","@stdlib/ndarray/ndarraylike2ndarray":"1zg","@stdlib/ndarray-ndarraylike2ndarray":"1zh","@stdlib/array/base/assert/has-equal-values-indexed":"1zi","@stdlib/array-base-assert-has-equal-values-indexed":"1zj","@stdlib/array/base/assert/has-equal-values":"1zk","@stdlib/array-base-assert-has-equal-values":"1zl","@stdlib/assert/has-atob-support":"1zm","@stdlib/assert-has-atob-support":"1zn","@stdlib/assert/has-btoa-support":"1zo","@stdlib/assert-has-btoa-support":"1zp","@stdlib/assert/is-equal-array":"1zq","@stdlib/assert-is-equal-array":"1zr","@stdlib/assert/is-same-accessor-array":"1zs","@stdlib/assert-is-same-accessor-array":"1zt","@stdlib/assert/is-same-array-like-object":"1zu","@stdlib/assert-is-same-array-like-object":"1zv","@stdlib/assert/is-same-array-like":"1zw","@stdlib/assert-is-same-array-like":"1zx","@stdlib/assert/is-wasm-memory":"1zy","@stdlib/assert-is-wasm-memory":"1zz","@stdlib/blas/base/daxpy-wasm":"200","@stdlib/blas-base-daxpy-wasm":"201","@stdlib/blas/base/dspr":"202","@stdlib/blas-base-dspr":"203","@stdlib/blas/ext/base/cfill":"204","@stdlib/blas-ext-base-cfill":"205","@stdlib/constants/float32/max-safe-nth-factorial":"206","@stdlib/constants-float32-max-safe-nth-factorial":"207","@stdlib/constants/float32/max-safe-nth-fibonacci":"208","@stdlib/constants-float32-max-safe-nth-fibonacci":"209","@stdlib/constants/float64/num-high-word-significand-bits":"20A","@stdlib/constants-float64-num-high-word-significand-bits":"20B","@stdlib/lapack/base/dlamch":"20C","@stdlib/lapack-base-dlamch":"20D","@stdlib/math/base/assert/is-nonnegative-integerf":"20E","@stdlib/math-base-assert-is-nonnegative-integerf":"20F","@stdlib/math/base/special/acotdf":"20G","@stdlib/math-base-special-acotdf":"20H","@stdlib/math/base/special/acovercosf":"20I","@stdlib/math-base-special-acovercosf":"20J","@stdlib/math/base/special/acoversinf":"20K","@stdlib/math-base-special-acoversinf":"20L","@stdlib/math/base/special/atandf":"20M","@stdlib/math-base-special-atandf":"20N","@stdlib/math/base/special/avercosf":"20O","@stdlib/math-base-special-avercosf":"20P","@stdlib/math/base/special/aversinf":"20Q","@stdlib/math-base-special-aversinf":"20R","@stdlib/math/base/special/ldexpf":"20S","@stdlib/math-base-special-ldexpf":"20T","@stdlib/math/base/special/logf":"20U","@stdlib/math-base-special-logf":"20V","@stdlib/math/base/special/maxabsf":"20W","@stdlib/math-base-special-maxabsf":"20X","@stdlib/math/base/special/maxf":"20Y","@stdlib/math-base-special-maxf":"20Z","@stdlib/math/base/special/minabsf":"20a","@stdlib/math-base-special-minabsf":"20b","@stdlib/math/base/special/minf":"20c","@stdlib/math-base-special-minf":"20d","@stdlib/math/base/special/xlogyf":"20e","@stdlib/math-base-special-xlogyf":"20f","@stdlib/napi/argv-strided-complex128array2d":"20g","@stdlib/napi-argv-strided-complex128array2d":"20h","@stdlib/napi/argv-strided-complex64array2d":"20i","@stdlib/napi-argv-strided-complex64array2d":"20j","@stdlib/napi/argv-strided-float32array2d":"20k","@stdlib/napi-argv-strided-float32array2d":"20l","@stdlib/napi/argv-strided-float64array2d":"20m","@stdlib/napi-argv-strided-float64array2d":"20n","@stdlib/napi/argv-strided-int16array2d":"20o","@stdlib/napi-argv-strided-int16array2d":"20p","@stdlib/napi/argv-strided-int32array2d":"20q","@stdlib/napi-argv-strided-int32array2d":"20r","@stdlib/napi/argv-strided-int8array2d":"20s","@stdlib/napi-argv-strided-int8array2d":"20t","@stdlib/napi/argv-strided-uint16array2d":"20u","@stdlib/napi-argv-strided-uint16array2d":"20v","@stdlib/napi/argv-strided-uint32array2d":"20w","@stdlib/napi-argv-strided-uint32array2d":"20x","@stdlib/napi/argv-strided-uint8array2d":"20y","@stdlib/napi-argv-strided-uint8array2d":"20z","@stdlib/ndarray/base/assert/has-equal-shape":"210","@stdlib/ndarray-base-assert-has-equal-shape":"211","@stdlib/ndarray/base/fill":"212","@stdlib/ndarray-base-fill":"213","@stdlib/ndarray/base/to-reversed":"214","@stdlib/ndarray-base-to-reversed":"215","@stdlib/strided/base/read-dataview":"216","@stdlib/strided-base-read-dataview":"217","@stdlib/strided/base/strided2object":"218","@stdlib/strided-base-strided2object":"219","@stdlib/strided/base/write-dataview":"21A","@stdlib/strided-base-write-dataview":"21B","@stdlib/string/base/atob":"21C","@stdlib/string-base-atob":"21D","@stdlib/wasm/base/array2dtype":"21E","@stdlib/wasm-base-array2dtype":"21F","@stdlib/wasm/base/arrays2ptrs":"21G","@stdlib/wasm-base-arrays2ptrs":"21H","@stdlib/wasm/base/dtype2wasm":"21I","@stdlib/wasm-base-dtype2wasm":"21J","@stdlib/wasm/base":"21K","@stdlib/wasm-base":"21L","@stdlib/wasm/base/strided2object":"21M","@stdlib/wasm-base-strided2object":"21N","@stdlib/wasm/memory":"21O","@stdlib/wasm-memory":"21P","@stdlib/wasm/module-wrapper":"21Q","@stdlib/wasm-module-wrapper":"21R","@stdlib/wasm":"21T","@stdlib/array/base/cunone-by-right":"21U","@stdlib/array-base-cunone-by-right":"21V","@stdlib/array/base/cunone-by":"21W","@stdlib/array-base-cunone-by":"21X","@stdlib/array/base/cusome-by-right":"21Y","@stdlib/array-base-cusome-by-right":"21Z","@stdlib/array/fixed-endian-float64":"21a","@stdlib/array-fixed-endian-float64":"21b","@stdlib/assert/is-ndarray-like-with-data-type":"21c","@stdlib/assert-is-ndarray-like-with-data-type":"21d","@stdlib/blas/ext/base/zfill":"21e","@stdlib/blas-ext-base-zfill":"21f","@stdlib/blas/tools":"21g","@stdlib/blas-tools":"21h","@stdlib/blas/tools/swap-factory":"21i","@stdlib/blas-tools-swap-factory":"21j","@stdlib/constants/float32/max-safe-fibonacci":"21k","@stdlib/constants-float32-max-safe-fibonacci":"21l","@stdlib/string/base/base64-to-uint8array":"21m","@stdlib/string-base-base64-to-uint8array":"21n","@stdlib/array/base/assert/is-byte-order":"21o","@stdlib/array-base-assert-is-byte-order":"21p","@stdlib/array/base/cuany-by-right":"21q","@stdlib/array-base-cuany-by-right":"21r","@stdlib/array/base/cuany-by":"21s","@stdlib/array-base-cuany-by":"21t","@stdlib/array/base/cuevery-by":"21u","@stdlib/array-base-cuevery-by":"21v","@stdlib/array/base/cusome-by":"21w","@stdlib/array-base-cusome-by":"21x","@stdlib/array/base/cusome":"21y","@stdlib/array-base-cusome":"21z","@stdlib/array/base/nulls":"220","@stdlib/array-base-nulls":"221","@stdlib/array/byte-orders":"222","@stdlib/array-byte-orders":"223","@stdlib/array/fixed-endian-factory":"224","@stdlib/array-fixed-endian-factory":"225","@stdlib/array/fixed-endian-float32":"226","@stdlib/array-fixed-endian-float32":"227","@stdlib/array/little-endian-factory":"228","@stdlib/array-little-endian-factory":"229","@stdlib/array/little-endian-float32":"22A","@stdlib/array-little-endian-float32":"22B","@stdlib/array/little-endian-float64":"22C","@stdlib/array-little-endian-float64":"22D","@stdlib/array/base/cuevery-by-right":"22E","@stdlib/array-base-cuevery-by-right":"22F","@stdlib/array/base/mskbinary3d":"22G","@stdlib/array-base-mskbinary3d":"22H","@stdlib/assert/is-same-typed-array-like":"22I","@stdlib/assert-is-same-typed-array-like":"22J","@stdlib/blas/base/ccopy-wasm":"22K","@stdlib/blas-base-ccopy-wasm":"22L","@stdlib/blas/base/cscal-wasm":"22M","@stdlib/blas-base-cscal-wasm":"22N","@stdlib/blas/base/csrot-wasm":"22O","@stdlib/blas-base-csrot-wasm":"22P","@stdlib/blas/base/cswap-wasm":"22Q","@stdlib/blas-base-cswap-wasm":"22R","@stdlib/blas/base/dasum-wasm":"22S","@stdlib/blas-base-dasum-wasm":"22T","@stdlib/blas/base/dcopy-wasm":"22U","@stdlib/blas-base-dcopy-wasm":"22V","@stdlib/blas/base/ddot-wasm":"22W","@stdlib/blas-base-ddot-wasm":"22X","@stdlib/blas/base/dnrm2-wasm":"22Y","@stdlib/blas-base-dnrm2-wasm":"22Z","@stdlib/blas/base/drot-wasm":"22a","@stdlib/blas-base-drot-wasm":"22b","@stdlib/blas/base/drotm-wasm":"22c","@stdlib/blas-base-drotm-wasm":"22d","@stdlib/blas/base/dscal-wasm":"22e","@stdlib/blas-base-dscal-wasm":"22f","@stdlib/blas/base/dswap-wasm":"22g","@stdlib/blas-base-dswap-wasm":"22h","@stdlib/blas/base/idamax-wasm":"22i","@stdlib/blas-base-idamax-wasm":"22j","@stdlib/blas/base/sasum-wasm":"22k","@stdlib/blas-base-sasum-wasm":"22l","@stdlib/blas/base/saxpy-wasm":"22m","@stdlib/blas-base-saxpy-wasm":"22n","@stdlib/blas/base/scopy-wasm":"22o","@stdlib/blas-base-scopy-wasm":"22p","@stdlib/blas/base/sdot-wasm":"22q","@stdlib/blas-base-sdot-wasm":"22r","@stdlib/blas/base/snrm2-wasm":"22s","@stdlib/blas-base-snrm2-wasm":"22t","@stdlib/blas/base/srot-wasm":"22u","@stdlib/blas-base-srot-wasm":"22v","@stdlib/blas/ext/base/dapxsumkbn-wasm":"22w","@stdlib/blas-ext-base-dapxsumkbn-wasm":"22x","@stdlib/constants/float32/e":"22y","@stdlib/constants-float32-e":"22z","@stdlib/constants/float32/half-ln-two":"230","@stdlib/constants-float32-half-ln-two":"231","@stdlib/constants/float32/ln-two":"232","@stdlib/constants-float32-ln-two":"233","@stdlib/constants/float32/max-base10-exponent-subnormal":"234","@stdlib/constants-float32-max-base10-exponent-subnormal":"235","@stdlib/constants/float32/max-base10-exponent":"236","@stdlib/constants-float32-max-base10-exponent":"237","@stdlib/constants/float32/min-base10-exponent-subnormal":"238","@stdlib/constants-float32-min-base10-exponent-subnormal":"239","@stdlib/constants/float32/min-base10-exponent":"23A","@stdlib/constants-float32-min-base10-exponent":"23B","@stdlib/constants/float32/min-base2-exponent":"23C","@stdlib/constants-float32-min-base2-exponent":"23D","@stdlib/constants/float64/max-safe-nth-double-factorial":"23E","@stdlib/constants-float64-max-safe-nth-double-factorial":"23F","@stdlib/fs/read-ndjson":"23G","@stdlib/fs-read-ndjson":"23H","@stdlib/iter/cuany-by":"23I","@stdlib/iter-cuany-by":"23J","@stdlib/iter/cuevery-by":"23K","@stdlib/iter-cuevery-by":"23L","@stdlib/iter/cuevery":"23M","@stdlib/iter-cuevery":"23N","@stdlib/iter/cunone":"23O","@stdlib/iter-cunone":"23P","@stdlib/iter/cusome-by":"23Q","@stdlib/iter-cusome-by":"23R","@stdlib/math/base/assert/is-evenf":"23S","@stdlib/math-base-assert-is-evenf":"23T","@stdlib/math/base/special/acosdf":"23U","@stdlib/math-base-special-acosdf":"23V","@stdlib/math/base/special/ahavercosf":"23W","@stdlib/math-base-special-ahavercosf":"23X","@stdlib/math/base/special/ahaversinf":"23Y","@stdlib/math-base-special-ahaversinf":"23Z","@stdlib/math/base/special/cfloorf":"23a","@stdlib/math-base-special-cfloorf":"23b","@stdlib/math/base/special/croundf":"23c","@stdlib/math-base-special-croundf":"23d","@stdlib/math/base/special/fmodf":"23e","@stdlib/math-base-special-fmodf":"23f","@stdlib/math/base/special/gcdf":"23g","@stdlib/math-base-special-gcdf":"23h","@stdlib/math/base/special/nanmaxf":"23i","@stdlib/math-base-special-nanmaxf":"23j","@stdlib/math/base/special/nanminf":"23k","@stdlib/math-base-special-nanminf":"23l","@stdlib/math/base/special/sec":"23m","@stdlib/math-base-special-sec":"23n","@stdlib/array/base/broadcasted-quaternary3d":"23o","@stdlib/array-base-broadcasted-quaternary3d":"23p","@stdlib/array/base/broadcasted-quaternary4d":"23q","@stdlib/array-base-broadcasted-quaternary4d":"23r","@stdlib/array/base/broadcasted-quaternary5d":"23s","@stdlib/array-base-broadcasted-quaternary5d":"23t","@stdlib/array/base/broadcasted-quinary4d":"23u","@stdlib/array-base-broadcasted-quinary4d":"23v","@stdlib/array/base/broadcasted-ternary3d":"23w","@stdlib/array-base-broadcasted-ternary3d":"23x","@stdlib/array/base/broadcasted-ternary4d":"23y","@stdlib/array-base-broadcasted-ternary4d":"23z","@stdlib/array/base/broadcasted-ternary5d":"240","@stdlib/array-base-broadcasted-ternary5d":"241","@stdlib/array/base/mskbinary4d":"242","@stdlib/array-base-mskbinary4d":"243","@stdlib/array/base/mskbinary5d":"244","@stdlib/array-base-mskbinary5d":"245","@stdlib/array/base/mskunary4d":"246","@stdlib/array-base-mskunary4d":"247","@stdlib/array/base/mskunary5d":"248","@stdlib/array-base-mskunary5d":"249","@stdlib/array/base/unary3d-by":"24A","@stdlib/array-base-unary3d-by":"24B","@stdlib/array/base/unary4d-by":"24C","@stdlib/array-base-unary4d-by":"24D","@stdlib/array/base/unary5d-by":"24E","@stdlib/array-base-unary5d-by":"24F","@stdlib/constants/float32/ln-half":"24G","@stdlib/constants-float32-ln-half":"24H","@stdlib/constants/float32/ln-pi":"24I","@stdlib/constants-float32-ln-pi":"24J","@stdlib/constants/float32/ln-ten":"24K","@stdlib/constants-float32-ln-ten":"24L","@stdlib/constants/float32/max-safe-nth-lucas":"24M","@stdlib/constants-float32-max-safe-nth-lucas":"24N","@stdlib/constants/float32/sqrt-half-pi":"24O","@stdlib/constants-float32-sqrt-half-pi":"24P","@stdlib/constants/float32/sqrt-half":"24Q","@stdlib/constants-float32-sqrt-half":"24R","@stdlib/constants/float32/sqrt-phi":"24S","@stdlib/constants-float32-sqrt-phi":"24T","@stdlib/constants/float32/sqrt-pi":"24U","@stdlib/constants-float32-sqrt-pi":"24V","@stdlib/constants/float32/sqrt-three":"24W","@stdlib/constants-float32-sqrt-three":"24X","@stdlib/constants/float32/sqrt-two-pi":"24Y","@stdlib/constants-float32-sqrt-two-pi":"24Z","@stdlib/constants/float32/sqrt-two":"24a","@stdlib/constants-float32-sqrt-two":"24b","@stdlib/constants/float64/max-safe-nth-tribonacci":"24c","@stdlib/constants-float64-max-safe-nth-tribonacci":"24d","@stdlib/math/base/assert/is-oddf":"24e","@stdlib/math-base-assert-is-oddf":"24f","@stdlib/math/base/special/lcmf":"24g","@stdlib/math-base-special-lcmf":"24h","@stdlib/math/base/special/negalucasf":"24i","@stdlib/math-base-special-negalucasf":"24j","@stdlib/math/base/special/nonfibonaccif":"24k","@stdlib/math-base-special-nonfibonaccif":"24l","@stdlib/math/base/special/sqrtpif":"24m","@stdlib/math-base-special-sqrtpif":"24n","@stdlib/ndarray/base/from-scalar-like":"24o","@stdlib/ndarray-base-from-scalar-like":"24p","@stdlib/ndarray/base/min-signed-integer-dtype":"24q","@stdlib/ndarray-base-min-signed-integer-dtype":"24r","@stdlib/ndarray/base/min-unsigned-integer-dtype":"24s","@stdlib/ndarray-base-min-unsigned-integer-dtype":"24t","@stdlib/ndarray/filter-map":"24u","@stdlib/ndarray-filter-map":"24v","@stdlib/ndarray/filter":"24w","@stdlib/ndarray-filter":"24x","@stdlib/ndarray/for-each":"24y","@stdlib/ndarray-for-each":"24z","@stdlib/ndarray/index":"250","@stdlib/ndarray-index":"251","@stdlib/ndarray/map":"252","@stdlib/ndarray-map":"253","@stdlib/ndarray/reject":"254","@stdlib/ndarray-reject":"255","@stdlib/ndarray/to-fancy":"256","@stdlib/ndarray-to-fancy":"257","@stdlib/ndarray/to-json":"258","@stdlib/ndarray-to-json":"259","@stdlib/stats/base/dists/planck/cdf":"25A","@stdlib/stats-base-dists-planck-cdf":"25B","@stdlib/stats/base/dists/planck/entropy":"25C","@stdlib/stats-base-dists-planck-entropy":"25D","@stdlib/stats/base/dists/planck/kurtosis":"25E","@stdlib/stats-base-dists-planck-kurtosis":"25F","@stdlib/stats/base/dists/planck/logcdf":"25G","@stdlib/stats-base-dists-planck-logcdf":"25H","@stdlib/stats/base/dists/planck/logpmf":"25I","@stdlib/stats-base-dists-planck-logpmf":"25J","@stdlib/stats/base/dists/planck/mean":"25K","@stdlib/stats-base-dists-planck-mean":"25L","@stdlib/stats/base/dists/planck/median":"25M","@stdlib/stats-base-dists-planck-median":"25N","@stdlib/stats/base/dists/planck/mode":"25O","@stdlib/stats-base-dists-planck-mode":"25P","@stdlib/stats/base/dists/planck/pmf":"25Q","@stdlib/stats-base-dists-planck-pmf":"25R","@stdlib/stats/base/dists/planck/quantile":"25S","@stdlib/stats-base-dists-planck-quantile":"25T","@stdlib/stats/base/dists/planck/skewness":"25U","@stdlib/stats-base-dists-planck-skewness":"25V","@stdlib/stats/base/dists/planck/stdev":"25W","@stdlib/stats-base-dists-planck-stdev":"25X","@stdlib/stats/base/dists/planck/variance":"25Y","@stdlib/stats-base-dists-planck-variance":"25Z","@stdlib/array/base/assert/is-sorted-ascending":"25a","@stdlib/array-base-assert-is-sorted-ascending":"25b","@stdlib/array/base/fill":"25c","@stdlib/array-base-fill":"25d","@stdlib/array/base/indices-complement":"25e","@stdlib/array-base-indices-complement":"25f","@stdlib/array/base/mskfilter2":"25g","@stdlib/array-base-mskfilter2":"25h","@stdlib/array/base/mskfiltern":"25i","@stdlib/array-base-mskfiltern":"25j","@stdlib/array/base/scatter-filled":"25k","@stdlib/array-base-scatter-filled":"25l","@stdlib/array/base/scattered":"25m","@stdlib/array-base-scattered":"25n","@stdlib/array/base/take-indexed2":"25o","@stdlib/array-base-take-indexed2":"25p","@stdlib/math/base/assert/is-probabilityf":"25q","@stdlib/math-base-assert-is-probabilityf":"25r","@stdlib/math/base/special/dirac-deltaf":"25s","@stdlib/math-base-special-dirac-deltaf":"25t","@stdlib/ndarray/base/assert/is-column-major-string":"25u","@stdlib/ndarray-base-assert-is-column-major-string":"25v","@stdlib/ndarray/base/assert/is-row-major-string":"25w","@stdlib/ndarray-base-assert-is-row-major-string":"25x","@stdlib/ndarray/base/normalize-indices":"25y","@stdlib/ndarray-base-normalize-indices":"25z","@stdlib/ndarray/base/spread-dimensions":"260","@stdlib/ndarray-base-spread-dimensions":"261","@stdlib/ndarray/base/to-normalized-indices":"262","@stdlib/ndarray-base-to-normalized-indices":"263","@stdlib/ndarray/base/to-unique-normalized-indices":"264","@stdlib/ndarray-base-to-unique-normalized-indices":"265"}

},{}],38:[function(require,module,exports){
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
* Return the error code identifier prefix associated with a specified package name.
*
* @module @stdlib/error/tools/pkg2id
*
* @example
* var pkg2id = require( '@stdlib/error/tools/pkg2id' );
*
* var v = pkg2id( '@stdlib/math/base/special/sin' );
* // returns '0H5'
*/

// MODULES //

var pkg2id = require( './main.js' );


// EXPORTS //

module.exports = pkg2id;

},{"./main.js":39}],39:[function(require,module,exports){
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

var isString = require( '@stdlib/assert/is-string' ).isPrimitive;
var hasOwnProp = require( '@stdlib/assert/has-own-property' );
var format = require( '@stdlib/string/format' );
var PKG_TO_ID = require( './../data/data.json' );


// MAIN //

/**
* Returns the error code identifier prefix associated with a specified package name.
*
* @param {string} pkg - package name
* @throws {TypeError} must provide a string
* @returns {(string|null)} identifier prefix
*
* @example
* var v = pkg2id( '@stdlib/math/base/special/sin' );
* // returns '0YK'
*/
function pkg2id( pkg ) {
	if ( !isString( pkg ) ) {
		throw new TypeError( format( 'invalid argument. Must provide a string. Value: `%s`.', pkg ) );
	}
	if ( hasOwnProp( PKG_TO_ID, pkg ) ) {
		return PKG_TO_ID[ pkg ];
	}
	return null;
}


// EXPORTS //

module.exports = pkg2id;

},{"./../data/data.json":37,"@stdlib/assert/has-own-property":1,"@stdlib/assert/is-string":26,"@stdlib/string/format":63}],40:[function(require,module,exports){
module.exports={
  "name": "@stdlib/error/tools/pkg2id",
  "version": "0.0.0",
  "description": "Return the error identifier prefix associated with a specified package name.",
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
    "stdlib-pkg2id": "./bin/cli"
  },
  "main": "./lib",
  "directories": {
    "benchmark": "./benchmark",
    "data": "./data",
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
    "standard",
    "library",
    "lib",
    "error",
    "identifier",
    "id",
    "package",
    "name",
    "pkg"
  ]
}

},{}],41:[function(require,module,exports){
(function (__filename,__dirname){(function (){
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

var resolve = require( 'path' ).resolve;
var exec = require( 'child_process' ).exec;
var tape = require( 'tape' );
var IS_BROWSER = require( '@stdlib/assert/is-browser' );
var IS_WINDOWS = require( '@stdlib/assert/is-windows' );
var EXEC_PATH = require( '@stdlib/process/exec-path' );
var readFileSync = require( '@stdlib/fs/read-file' ).sync;


// VARIABLES //

var RE_ID_FORMAT = /^[a-zA-Z0-9]{3}\r?\n$/;
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

tape( 'the command-line interface prints an error identifier prefix', opts, function test( t ) {
	var cmd = [
		EXEC_PATH,
		fpath,
		'@stdlib/math/base/special/sin'
	];

	exec( cmd.join( ' ' ), done );

	function done( error, stdout, stderr ) {
		if ( error ) {
			t.fail( error.message );
		} else {
			t.strictEqual( RE_ID_FORMAT.test( stdout.toString() ), true, 'prints expected value' );
			t.strictEqual( stderr.toString(), '', 'does not print to `stderr`' );
		}
		t.end();
	}
});

tape( 'if unable to resolve an alias, the command-line interface sets a non-zero exit code', opts, function test( t ) {
	var cmd = [
		EXEC_PATH,
		fpath,
		'fjaldfjadljfeoejreandfljasdfjadsfjs'
	];

	exec( cmd.join( ' ' ), done );

	function done( error, stdout, stderr ) {
		if ( error ) {
			t.pass( error.message );
			t.strictEqual( error.code, 1, 'expected exit code' );
		}
		t.strictEqual( stdout.toString(), '', 'does not print to` stdout`' );
		t.strictEqual( stderr.toString(), '', 'does not print to `stderr`' );
		t.end();
	}
});

}).call(this)}).call(this,"/lib/node_modules/@stdlib/error/tools/pkg2id/test/test.cli.js","/lib/node_modules/@stdlib/error/tools/pkg2id/test")
},{"./../package.json":40,"@stdlib/assert/is-browser":15,"@stdlib/assert/is-windows":32,"@stdlib/fs/read-file":43,"@stdlib/process/exec-path":47,"child_process":100,"path":103,"tape":221}],42:[function(require,module,exports){
(function (__filename){(function (){
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

var tape = require( 'tape' );
var replace = require( '@stdlib/string/replace' );
var pkg2id = require( './../lib' );


// VARIABLES //

var RE_ID_FORMAT = /^[a-zA-Z0-9]+$/;
var PKG_LIST = [
	'@stdlib/math-base-special-sin',
	'@stdlib/math-base-special-cos',
	'@stdlib/math-base-special-tan',
	'@stdlib/math-base-special-asin'
];


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.strictEqual( typeof pkg2id, 'function', 'main export is a function' );
	t.end();
});

tape( 'the function throws an error if not provided a string', function test( t ) {
	var values;
	var i;

	values = [
		5,
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
		t.throws( badValue( values[i] ), TypeError, 'throws an error when provided '+values[i] );
	}
	t.end();

	function badValue( value ) {
		return function badValue() {
			pkg2id( value );
		};
	}
});

tape( 'the function returns a three-character identifier containing letters and digits (internal package name)', function test( t ) {
	var actual;
	var pkg;
	var i;

	for ( i = 0; i < PKG_LIST.length; i++ ) {
		pkg = replace( PKG_LIST[ i ], '-', '/' );
		actual = pkg2id( pkg );
		t.strictEqual( typeof actual, 'string', 'returns a string' );
		t.strictEqual( actual.length, 3, 'returns a three-character string' );
		t.ok( actual.match( RE_ID_FORMAT ), 'returns a string containing only letters and digits' );
	}
	t.end();
});

tape( 'the function returns a three-character identifier containing letters and digits (standalone package name)', function test( t ) {
	var actual;
	var pkg;
	var i;

	for ( i = 0; i < PKG_LIST.length; i++ ) {
		pkg = PKG_LIST[ i ];
		actual = pkg2id( pkg );
		t.strictEqual( typeof actual, 'string', 'returns a string' );
		t.strictEqual( actual.length, 3, 'returns a three-character string' );
		t.ok( actual.match( RE_ID_FORMAT ), 'returns a string containing only letters and digits' );
	}
	t.end();
});

tape( 'the function returns `null` if provided an unrecognized package name', function test( t ) {
	var values;
	var i;

	values = [
		'adfkaljdfdsafs',
		'adklfadjflajdslfjalsdf',
		'adflkajdlkfjasdlkfjsadlkfjlasdjflsdjfla'
	];
	for ( i = 0; i < values.length; i++ ) {
		t.strictEqual( pkg2id( values[ i ] ), null, 'returns expected value' );
	}
	t.end();
});

}).call(this)}).call(this,"/lib/node_modules/@stdlib/error/tools/pkg2id/test/test.js")
},{"./../lib":38,"@stdlib/string/replace":66,"tape":221}],43:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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
var main = require( './main.js' );
var sync = require( './sync.js' );


// MAIN //

setReadOnly( main, 'sync', sync );


// EXPORTS //

module.exports = main;

},{"./main.js":44,"./sync.js":45,"@stdlib/utils/define-nonenumerable-read-only-property":72}],44:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"fs":100}],45:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"fs":100}],46:[function(require,module,exports){
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

},{}],47:[function(require,module,exports){
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

},{}],48:[function(require,module,exports){
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

},{"./main.js":49,"./regexp.js":50,"@stdlib/utils/define-nonenumerable-read-only-property":72}],49:[function(require,module,exports){
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

},{}],50:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":49}],51:[function(require,module,exports){
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
* Replace search occurrences with a replacement string.
*
* @module @stdlib/string/base/replace
*
* @example
* var replace = require( '@stdlib/string/base/replace' );
*
* var str = 'Hello World';
* var out = replace( str, /world/i, 'Mr. President' );
* // returns 'Hello Mr. President'
*/

// MODULES //

var main = require( './main.js' );


// EXPORTS //

module.exports = main;

},{"./main.js":62}],62:[function(require,module,exports){
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
* Replaces search occurrences with a replacement string.
*
* @param {string} str - input string
* @param {RegExp} search - search expression
* @param {(string|Function)} newval - replacement value or function
* @returns {string} new string containing replacement(s)
*
* @example
* var str = 'Hello World';
* var out = replace( str, /world/i, 'Mr. President' );
* // returns 'Hello Mr. President'
*
* @example
* var capitalize = require( '@stdlib/string/base/capitalize' );
*
* var str = 'Oranges and lemons say the bells of St. Clement\'s';
*
* function replacer( match, p1 ) {
*     return capitalize( p1 );
* }
*
* var out = replace( str, /([^\s]*)/gi, replacer );
* // returns 'Oranges And Lemons Say The Bells Of St. Clement\'s'
*/
function replace( str, search, newval ) {
	return str.replace( search, newval );
}


// EXPORTS //

module.exports = replace;

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

},{"./main.js":65}],64:[function(require,module,exports){
arguments[4][55][0].apply(exports,arguments)
},{"dup":55}],65:[function(require,module,exports){
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

},{"./is_string.js":64,"@stdlib/string/base/format-interpolate":53,"@stdlib/string/base/format-tokenize":59}],66:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

// MODULES //

var rescape = require( '@stdlib/utils/escape-regexp-string' );
var isFunction = require( '@stdlib/assert/is-function' );
var isString = require( '@stdlib/assert/is-string' ).isPrimitive;
var isRegExp = require( '@stdlib/assert/is-regexp' );
var format = require( '@stdlib/string/format' );
var base = require( '@stdlib/string/base/replace' );


// MAIN //

/**
* Replaces search occurrences with a replacement string.
*
* @param {string} str - input string
* @param {(string|RegExp)} search - search expression
* @param {(string|Function)} newval - replacement value or function
* @throws {TypeError} first argument must be a string
* @throws {TypeError} second argument argument must be a string or regular expression
* @throws {TypeError} third argument must be a string or function
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
* var out = replace( str, /([^\s]*)/gi, replacer );
* // returns 'Oranges And Lemons Say The Bells Of St. Clement\'s'
*/
function replace( str, search, newval ) {
	if ( !isString( str ) ) {
		throw new TypeError( format( 'invalid argument. First argument must be a string. Value: `%s`.', str ) );
	}
	if ( isString( search ) ) {
		search = new RegExp( rescape( search ), 'g' );
	} else if ( !isRegExp( search ) ) {
		throw new TypeError( format( 'invalid argument. Second argument must be a string or regular expression. Value: `%s`.', search ) );
	}
	if ( !isString( newval ) && !isFunction( newval ) ) {
		throw new TypeError( format( 'invalid argument. Third argument must be a string or replacement function. Value: `%s`.', newval ) );
	}
	return base( str, search, newval );
}


// EXPORTS //

module.exports = replace;

},{"@stdlib/assert/is-function":18,"@stdlib/assert/is-regexp":23,"@stdlib/assert/is-string":26,"@stdlib/string/base/replace":61,"@stdlib/string/format":63,"@stdlib/utils/escape-regexp-string":79}],68:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

// MAIN //

var Sym = ( typeof Symbol === 'function' ) ? Symbol : void 0; // eslint-disable-line stdlib/require-globals


// EXPORTS //

module.exports = Sym;

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

},{"@stdlib/assert/is-buffer":16,"@stdlib/regexp/function-name":48,"@stdlib/utils/native-class":86}],72:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"@stdlib/string/format":63}],79:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

var main = require( './main.js' );


// EXPORTS //

module.exports = main;

},{"./main.js":80}],80:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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


// VARIABLES //

var RE_CHARS = /[-\/\\^$*+?.()|[\]{}]/g; // eslint-disable-line no-useless-escape


// MAIN //

/**
* Escapes a regular expression string.
*
* @param {string} str - regular expression string
* @throws {TypeError} first argument must be a string
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
		throw new TypeError( format( 'invalid argument. Must provide a regular expression string. Value: `%s`.', str ) );
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

},{"@stdlib/assert/is-string":26,"@stdlib/string/format":63}],81:[function(require,module,exports){
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

},{"./codegen.js":82,"./global_this.js":83,"./self.js":84,"./window.js":85,"@stdlib/assert/is-boolean":9,"@stdlib/string/format":63}],82:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

// MAIN //

var obj = ( typeof globalThis === 'object' ) ? globalThis : null; // eslint-disable-line no-undef


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

var obj = ( typeof self === 'object' ) ? self : null;


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

// MAIN //

var obj = ( typeof window === 'object' ) ? window : null;


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

},{"./main.js":87,"./polyfill.js":88,"@stdlib/assert/has-tostringtag-support":5}],87:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./tostring.js":89}],88:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./tostring.js":89,"./tostringtag.js":90,"@stdlib/assert/has-own-property":1}],89:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

var Symbol = require( '@stdlib/symbol/ctor' );


// MAIN //

var toStrTag = ( typeof Symbol === 'function' ) ? Symbol.toStringTag : '';


// EXPORTS //

module.exports = toStrTag;

},{"@stdlib/symbol/ctor":68}],91:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./fixtures/nodelist.js":92,"./fixtures/re.js":93,"./fixtures/typedarray.js":94}],92:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/global":81}],93:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

var typedarray = Int8Array; // eslint-disable-line stdlib/require-globals


// EXPORTS //

module.exports = typedarray;

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

},{"./check.js":91,"./main.js":96,"./polyfill.js":97}],96:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/constructor-name":70}],98:[function(require,module,exports){
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

},{}],99:[function(require,module,exports){

},{}],100:[function(require,module,exports){
arguments[4][99][0].apply(exports,arguments)
},{"dup":99}],101:[function(require,module,exports){
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
},{"base64-js":98,"buffer":101,"ieee754":204}],102:[function(require,module,exports){
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

},{}],103:[function(require,module,exports){
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
},{"_process":211}],104:[function(require,module,exports){
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

},{"events":102,"inherits":205,"readable-stream/lib/_stream_duplex.js":106,"readable-stream/lib/_stream_passthrough.js":107,"readable-stream/lib/_stream_readable.js":108,"readable-stream/lib/_stream_transform.js":109,"readable-stream/lib/_stream_writable.js":110,"readable-stream/lib/internal/streams/end-of-stream.js":114,"readable-stream/lib/internal/streams/pipeline.js":116}],105:[function(require,module,exports){
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

},{}],106:[function(require,module,exports){
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
},{"./_stream_readable":108,"./_stream_writable":110,"_process":211,"inherits":205}],107:[function(require,module,exports){
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
},{"./_stream_transform":109,"inherits":205}],108:[function(require,module,exports){
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
},{"../errors":105,"./_stream_duplex":106,"./internal/streams/async_iterator":111,"./internal/streams/buffer_list":112,"./internal/streams/destroy":113,"./internal/streams/from":115,"./internal/streams/state":117,"./internal/streams/stream":118,"_process":211,"buffer":101,"events":102,"inherits":205,"string_decoder/":220,"util":99}],109:[function(require,module,exports){
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
},{"../errors":105,"./_stream_duplex":106,"inherits":205}],110:[function(require,module,exports){
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
},{"../errors":105,"./_stream_duplex":106,"./internal/streams/destroy":113,"./internal/streams/state":117,"./internal/streams/stream":118,"_process":211,"buffer":101,"inherits":205,"util-deprecate":229}],111:[function(require,module,exports){
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
},{"./end-of-stream":114,"_process":211}],112:[function(require,module,exports){
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
},{"buffer":101,"util":99}],113:[function(require,module,exports){
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
},{"_process":211}],114:[function(require,module,exports){
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
},{"../../../errors":105}],115:[function(require,module,exports){
module.exports = function () {
  throw new Error('Readable.from is not available in the browser')
};

},{}],116:[function(require,module,exports){
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
},{"../../../errors":105,"./end-of-stream":114}],117:[function(require,module,exports){
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
},{"../../../errors":105}],118:[function(require,module,exports){
module.exports = require('events').EventEmitter;

},{"events":102}],119:[function(require,module,exports){
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

},{"./":120,"get-intrinsic":195}],120:[function(require,module,exports){
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

},{"es-define-property":180,"es-errors/type":186,"function-bind":194,"get-intrinsic":195,"set-function-length":215}],121:[function(require,module,exports){
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

},{"./lib/is_arguments.js":122,"./lib/keys.js":123}],122:[function(require,module,exports){
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

},{}],123:[function(require,module,exports){
exports = module.exports = typeof Object.keys === 'function'
  ? Object.keys : shim;

exports.shim = shim;
function shim (obj) {
  var keys = [];
  for (var key in obj) keys.push(key);
  return keys;
}

},{}],124:[function(require,module,exports){
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

},{"es-define-property":180,"es-errors/syntax":185,"es-errors/type":186,"gopd":196}],125:[function(require,module,exports){
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

},{"define-data-property":124,"has-property-descriptors":197,"object-keys":209}],126:[function(require,module,exports){
module.exports = function () {
    for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] !== undefined) return arguments[i];
    }
};

},{}],127:[function(require,module,exports){
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

},{"./ToNumber":158,"./ToPrimitive":160,"./Type":165}],128:[function(require,module,exports){
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

},{"../helpers/isFinite":173,"../helpers/isNaN":174,"../helpers/isPrefixOf":175,"./ToNumber":158,"./ToPrimitive":160,"es-errors/type":186,"get-intrinsic":195}],129:[function(require,module,exports){
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

},{"call-bind/callBound":119,"es-errors/type":186}],130:[function(require,module,exports){
'use strict';

var RequireObjectCoercible = require('es-object-atoms/RequireObjectCoercible');

// http://262.ecma-international.org/5.1/#sec-9.10

module.exports = function CheckObjectCoercible(value) {
	return RequireObjectCoercible(value, arguments.length > 1 ? arguments[1] : void undefined);
};

},{"es-object-atoms/RequireObjectCoercible":188}],131:[function(require,module,exports){
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

},{"./DayWithinYear":134,"./InLeapYear":138,"./MonthFromTime":148,"es-errors/eval":181}],132:[function(require,module,exports){
'use strict';

var floor = require('./floor');

var msPerDay = require('../helpers/timeConstants').msPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.2

module.exports = function Day(t) {
	return floor(t / msPerDay);
};

},{"../helpers/timeConstants":179,"./floor":169}],133:[function(require,module,exports){
'use strict';

var floor = require('./floor');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

module.exports = function DayFromYear(y) {
	return (365 * (y - 1970)) + floor((y - 1969) / 4) - floor((y - 1901) / 100) + floor((y - 1601) / 400);
};


},{"./floor":169}],134:[function(require,module,exports){
'use strict';

var Day = require('./Day');
var DayFromYear = require('./DayFromYear');
var YearFromTime = require('./YearFromTime');

// https://262.ecma-international.org/5.1/#sec-15.9.1.4

module.exports = function DayWithinYear(t) {
	return Day(t) - DayFromYear(YearFromTime(t));
};

},{"./Day":132,"./DayFromYear":133,"./YearFromTime":167}],135:[function(require,module,exports){
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

},{"./modulo":170}],136:[function(require,module,exports){
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

},{"../helpers/records/property-descriptor":177,"./IsAccessorDescriptor":139,"./IsDataDescriptor":141,"es-errors/type":186}],137:[function(require,module,exports){
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

},{"../helpers/timeConstants":179,"./floor":169,"./modulo":170}],138:[function(require,module,exports){
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

},{"./DaysInYear":135,"./YearFromTime":167,"es-errors/eval":181}],139:[function(require,module,exports){
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

},{"../helpers/records/property-descriptor":177,"es-errors/type":186,"hasown":203}],140:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.11

module.exports = require('is-callable');

},{"is-callable":206}],141:[function(require,module,exports){
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

},{"../helpers/records/property-descriptor":177,"es-errors/type":186,"hasown":203}],142:[function(require,module,exports){
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

},{"./IsAccessorDescriptor":139,"./IsDataDescriptor":141,"./IsPropertyDescriptor":143,"es-errors/type":186}],143:[function(require,module,exports){
'use strict';

// TODO, semver-major: delete this

var isPropertyDescriptor = require('../helpers/records/property-descriptor');

// https://262.ecma-international.org/6.0/#sec-property-descriptor-specification-type

module.exports = function IsPropertyDescriptor(Desc) {
	return isPropertyDescriptor(Desc);
};

},{"../helpers/records/property-descriptor":177}],144:[function(require,module,exports){
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

},{"../helpers/isFinite":173,"../helpers/timeConstants":179}],145:[function(require,module,exports){
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

},{"../helpers/isFinite":173,"./DateFromTime":131,"./Day":132,"./MonthFromTime":148,"./ToInteger":157,"./YearFromTime":167,"./floor":169,"./modulo":170,"get-intrinsic":195}],146:[function(require,module,exports){
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

},{"../helpers/isFinite":173,"../helpers/timeConstants":179,"./ToInteger":157}],147:[function(require,module,exports){
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

},{"../helpers/timeConstants":179,"./floor":169,"./modulo":170}],148:[function(require,module,exports){
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

},{"./DayWithinYear":134,"./InLeapYear":138}],149:[function(require,module,exports){
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

},{"../helpers/isNaN":174}],150:[function(require,module,exports){
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

},{"../helpers/timeConstants":179,"./floor":169,"./modulo":170}],151:[function(require,module,exports){
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

},{"./Type":165}],152:[function(require,module,exports){
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


},{"../helpers/isFinite":173,"./ToNumber":158,"./abs":168,"get-intrinsic":195}],153:[function(require,module,exports){
'use strict';

var msPerDay = require('../helpers/timeConstants').msPerDay;

var DayFromYear = require('./DayFromYear');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

module.exports = function TimeFromYear(y) {
	return msPerDay * DayFromYear(y);
};

},{"../helpers/timeConstants":179,"./DayFromYear":133}],154:[function(require,module,exports){
'use strict';

var modulo = require('./modulo');

var msPerDay = require('../helpers/timeConstants').msPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.2

module.exports = function TimeWithinDay(t) {
	return modulo(t, msPerDay);
};


},{"../helpers/timeConstants":179,"./modulo":170}],155:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.2

module.exports = function ToBoolean(value) { return !!value; };

},{}],156:[function(require,module,exports){
'use strict';

var ToNumber = require('./ToNumber');

// http://262.ecma-international.org/5.1/#sec-9.5

module.exports = function ToInt32(x) {
	return ToNumber(x) >> 0;
};

},{"./ToNumber":158}],157:[function(require,module,exports){
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

},{"../helpers/isFinite":173,"../helpers/isNaN":174,"../helpers/sign":178,"./ToNumber":158,"./abs":168,"./floor":169}],158:[function(require,module,exports){
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

},{"./ToPrimitive":160,"call-bind/callBound":119,"safe-regex-test":214}],159:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.9

module.exports = require('es-object-atoms/ToObject');

},{"es-object-atoms/ToObject":189}],160:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.1

module.exports = require('es-to-primitive/es5');

},{"es-to-primitive/es5":191}],161:[function(require,module,exports){
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

},{"./IsCallable":140,"./ToBoolean":155,"./Type":165,"es-errors/type":186,"hasown":203}],162:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $String = GetIntrinsic('%String%');

// http://262.ecma-international.org/5.1/#sec-9.8

module.exports = function ToString(value) {
	return $String(value);
};


},{"get-intrinsic":195}],163:[function(require,module,exports){
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

},{"../helpers/isFinite":173,"../helpers/isNaN":174,"../helpers/sign":178,"./ToNumber":158,"./abs":168,"./floor":169,"./modulo":170}],164:[function(require,module,exports){
'use strict';

var ToNumber = require('./ToNumber');

// http://262.ecma-international.org/5.1/#sec-9.6

module.exports = function ToUint32(x) {
	return ToNumber(x) >>> 0;
};

},{"./ToNumber":158}],165:[function(require,module,exports){
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

},{}],166:[function(require,module,exports){
'use strict';

var Day = require('./Day');
var modulo = require('./modulo');

// https://262.ecma-international.org/5.1/#sec-15.9.1.6

module.exports = function WeekDay(t) {
	return modulo(Day(t) + 4, 7);
};

},{"./Day":132,"./modulo":170}],167:[function(require,module,exports){
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

},{"call-bind/callBound":119,"get-intrinsic":195}],168:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $abs = GetIntrinsic('%Math.abs%');

// http://262.ecma-international.org/5.1/#sec-5.2

module.exports = function abs(x) {
	return $abs(x);
};

},{"get-intrinsic":195}],169:[function(require,module,exports){
'use strict';

// var modulo = require('./modulo');
var $floor = Math.floor;

// http://262.ecma-international.org/5.1/#sec-5.2

module.exports = function floor(x) {
	// return x - modulo(x, 1);
	return $floor(x);
};

},{}],170:[function(require,module,exports){
'use strict';

var mod = require('../helpers/mod');

// https://262.ecma-international.org/5.1/#sec-5.2

module.exports = function modulo(x, y) {
	return mod(x, y);
};

},{"../helpers/mod":176}],171:[function(require,module,exports){
'use strict';

var modulo = require('./modulo');

var msPerSecond = require('../helpers/timeConstants').msPerSecond;

// https://262.ecma-international.org/5.1/#sec-15.9.1.10

module.exports = function msFromTime(t) {
	return modulo(t, msPerSecond);
};

},{"../helpers/timeConstants":179,"./modulo":170}],172:[function(require,module,exports){
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

},{"./5/AbstractEqualityComparison":127,"./5/AbstractRelationalComparison":128,"./5/Canonicalize":129,"./5/CheckObjectCoercible":130,"./5/DateFromTime":131,"./5/Day":132,"./5/DayFromYear":133,"./5/DayWithinYear":134,"./5/DaysInYear":135,"./5/FromPropertyDescriptor":136,"./5/HourFromTime":137,"./5/InLeapYear":138,"./5/IsAccessorDescriptor":139,"./5/IsCallable":140,"./5/IsDataDescriptor":141,"./5/IsGenericDescriptor":142,"./5/IsPropertyDescriptor":143,"./5/MakeDate":144,"./5/MakeDay":145,"./5/MakeTime":146,"./5/MinFromTime":147,"./5/MonthFromTime":148,"./5/SameValue":149,"./5/SecFromTime":150,"./5/StrictEqualityComparison":151,"./5/TimeClip":152,"./5/TimeFromYear":153,"./5/TimeWithinDay":154,"./5/ToBoolean":155,"./5/ToInt32":156,"./5/ToInteger":157,"./5/ToNumber":158,"./5/ToObject":159,"./5/ToPrimitive":160,"./5/ToPropertyDescriptor":161,"./5/ToString":162,"./5/ToUint16":163,"./5/ToUint32":164,"./5/Type":165,"./5/WeekDay":166,"./5/YearFromTime":167,"./5/abs":168,"./5/floor":169,"./5/modulo":170,"./5/msFromTime":171}],173:[function(require,module,exports){
'use strict';

var $isNaN = require('./isNaN');

module.exports = function (x) { return (typeof x === 'number' || typeof x === 'bigint') && !$isNaN(x) && x !== Infinity && x !== -Infinity; };

},{"./isNaN":174}],174:[function(require,module,exports){
'use strict';

module.exports = Number.isNaN || function isNaN(a) {
	return a !== a;
};

},{}],175:[function(require,module,exports){
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

},{"call-bind/callBound":119}],176:[function(require,module,exports){
'use strict';

var $floor = Math.floor;

module.exports = function mod(number, modulo) {
	var remain = number % modulo;
	return $floor(remain >= 0 ? remain : remain + modulo);
};

},{}],177:[function(require,module,exports){
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

},{"es-errors/type":186,"hasown":203}],178:[function(require,module,exports){
'use strict';

module.exports = function sign(number) {
	return number >= 0 ? 1 : -1;
};

},{}],179:[function(require,module,exports){
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

},{}],180:[function(require,module,exports){
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

},{"get-intrinsic":195}],181:[function(require,module,exports){
'use strict';

/** @type {import('./eval')} */
module.exports = EvalError;

},{}],182:[function(require,module,exports){
'use strict';

/** @type {import('.')} */
module.exports = Error;

},{}],183:[function(require,module,exports){
'use strict';

/** @type {import('./range')} */
module.exports = RangeError;

},{}],184:[function(require,module,exports){
'use strict';

/** @type {import('./ref')} */
module.exports = ReferenceError;

},{}],185:[function(require,module,exports){
'use strict';

/** @type {import('./syntax')} */
module.exports = SyntaxError;

},{}],186:[function(require,module,exports){
'use strict';

/** @type {import('./type')} */
module.exports = TypeError;

},{}],187:[function(require,module,exports){
'use strict';

/** @type {import('./uri')} */
module.exports = URIError;

},{}],188:[function(require,module,exports){
'use strict';

var $TypeError = require('es-errors/type');

/** @type {import('./RequireObjectCoercible')} */
module.exports = function RequireObjectCoercible(value) {
	if (value == null) {
		throw new $TypeError((arguments.length > 0 && arguments[1]) || ('Cannot call method on ' + value));
	}
	return value;
};

},{"es-errors/type":186}],189:[function(require,module,exports){
'use strict';

var $Object = require('./');
var RequireObjectCoercible = require('./RequireObjectCoercible');

/** @type {import('./ToObject')} */
module.exports = function ToObject(value) {
	RequireObjectCoercible(value);
	return $Object(value);
};

},{"./":190,"./RequireObjectCoercible":188}],190:[function(require,module,exports){
'use strict';

/** @type {import('.')} */
module.exports = Object;

},{}],191:[function(require,module,exports){
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

},{"./helpers/isPrimitive":192,"is-callable":206}],192:[function(require,module,exports){
'use strict';

module.exports = function isPrimitive(value) {
	return value === null || (typeof value !== 'function' && typeof value !== 'object');
};

},{}],193:[function(require,module,exports){
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

},{}],194:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

module.exports = Function.prototype.bind || implementation;

},{"./implementation":193}],195:[function(require,module,exports){
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

},{"es-errors":182,"es-errors/eval":181,"es-errors/range":183,"es-errors/ref":184,"es-errors/syntax":185,"es-errors/type":186,"es-errors/uri":187,"function-bind":194,"has-proto":198,"has-symbols":199,"hasown":203}],196:[function(require,module,exports){
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

},{"get-intrinsic":195}],197:[function(require,module,exports){
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

},{"es-define-property":180}],198:[function(require,module,exports){
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

},{}],199:[function(require,module,exports){
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

},{"./shams":200}],200:[function(require,module,exports){
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

},{}],201:[function(require,module,exports){
'use strict';

var hasSymbols = require('has-symbols/shams');

/** @type {import('.')} */
module.exports = function hasToStringTagShams() {
	return hasSymbols() && !!Symbol.toStringTag;
};

},{"has-symbols/shams":200}],202:[function(require,module,exports){
'use strict';

var bind = require('function-bind');

module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);

},{"function-bind":194}],203:[function(require,module,exports){
'use strict';

var call = Function.prototype.call;
var $hasOwn = Object.prototype.hasOwnProperty;
var bind = require('function-bind');

/** @type {import('.')} */
module.exports = bind.call(call, $hasOwn);

},{"function-bind":194}],204:[function(require,module,exports){
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

},{}],205:[function(require,module,exports){
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

},{}],206:[function(require,module,exports){
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

},{}],207:[function(require,module,exports){
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

},{"call-bind/callBound":119,"has-tostringtag/shams":201}],208:[function(require,module,exports){
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

},{"./isArguments":210}],209:[function(require,module,exports){
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

},{"./implementation":208,"./isArguments":210}],210:[function(require,module,exports){
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

},{}],211:[function(require,module,exports){
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

},{}],212:[function(require,module,exports){
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
},{"_process":211,"through":227,"timers":228}],213:[function(require,module,exports){
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

},{"buffer":101}],214:[function(require,module,exports){
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

},{"call-bind/callBound":119,"es-errors/type":186,"is-regex":207}],215:[function(require,module,exports){
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

},{"define-data-property":124,"es-errors/type":186,"get-intrinsic":195,"gopd":196,"has-property-descriptors":197}],216:[function(require,module,exports){
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

},{"es-abstract/es5":172,"function-bind":194}],217:[function(require,module,exports){
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

},{"./implementation":216,"./polyfill":218,"./shim":219,"define-properties":125,"function-bind":194}],218:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

var zeroWidthSpace = '\u200b';

module.exports = function getPolyfill() {
	if (String.prototype.trim && zeroWidthSpace.trim() === zeroWidthSpace) {
		return String.prototype.trim;
	}
	return implementation;
};

},{"./implementation":216}],219:[function(require,module,exports){
'use strict';

var define = require('define-properties');
var getPolyfill = require('./polyfill');

module.exports = function shimStringTrim() {
	var polyfill = getPolyfill();
	define(String.prototype, { trim: polyfill }, { trim: function () { return String.prototype.trim !== polyfill; } });
	return polyfill;
};

},{"./polyfill":218,"define-properties":125}],220:[function(require,module,exports){
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
},{"safe-buffer":213}],221:[function(require,module,exports){
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
},{"./lib/default_stream":222,"./lib/results":224,"./lib/test":225,"_process":211,"defined":126,"through":227,"timers":228}],222:[function(require,module,exports){
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
},{"_process":211,"fs":100,"through":227}],223:[function(require,module,exports){
(function (process,setImmediate){(function (){
module.exports = typeof setImmediate !== 'undefined'
    ? setImmediate
    : process.nextTick
;

}).call(this)}).call(this,require('_process'),require("timers").setImmediate)
},{"_process":211,"timers":228}],224:[function(require,module,exports){
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
},{"_process":211,"events":102,"function-bind":194,"has":202,"inherits":205,"object-inspect":226,"resumer":212,"through":227,"timers":228}],225:[function(require,module,exports){
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
},{"./next_tick":223,"deep-equal":121,"defined":126,"events":102,"has":202,"inherits":205,"path":103,"string.prototype.trim":217}],226:[function(require,module,exports){
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

},{}],227:[function(require,module,exports){
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
},{"_process":211,"stream":104}],228:[function(require,module,exports){
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
},{"process/browser.js":211,"timers":228}],229:[function(require,module,exports){
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
},{}]},{},[41,42]);
