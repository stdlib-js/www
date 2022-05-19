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

},{"@stdlib/utils/native-class":82}],9:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":10,"./object.js":11,"./primitive.js":12,"@stdlib/utils/define-nonenumerable-read-only-property":67}],10:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./try2serialize.js":14,"@stdlib/assert/has-tostringtag-support":5,"@stdlib/utils/native-class":82}],12:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/type-of":91}],20:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":21,"@stdlib/assert/tools/array-function":34,"@stdlib/utils/define-nonenumerable-read-only-property":67}],21:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

var isRegExp = require( './main.js' );


// EXPORTS //

module.exports = isRegExp;

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

},{"./try2exec.js":25,"@stdlib/assert/has-tostringtag-support":5,"@stdlib/utils/native-class":82}],25:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
var isString = require( './main.js' );
var isPrimitive = require( './primitive.js' );
var isObject = require( './object.js' );


// MAIN //

setReadOnly( isString, 'isPrimitive', isPrimitive );
setReadOnly( isString, 'isObject', isObject );


// EXPORTS //

module.exports = isString;

},{"./main.js":27,"./object.js":28,"./primitive.js":29,"@stdlib/utils/define-nonenumerable-read-only-property":67}],27:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./try2valueof.js":30,"@stdlib/assert/has-tostringtag-support":5,"@stdlib/utils/native-class":82}],29:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/os/platform":45}],33:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/assert/is-array":7,"@stdlib/string/format":60}],34:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./arrayfcn.js":33}],35:[function(require,module,exports){
module.exports={"@stdlib/array/base/arraylike2object":"000","@stdlib/array/base/copy":"001","@stdlib/array/base/filled-by":"002","@stdlib/array/base/filled":"003","@stdlib/array/base/incrspace":"004","@stdlib/array/base/linspace":"005","@stdlib/array/base/logspace":"006","@stdlib/array/base/ones":"007","@stdlib/array/base":"008","@stdlib/array/base/unitspace":"009","@stdlib/array/base/zeros":"00A","@stdlib/array/buffer":"00B","@stdlib/array/complex128":"00C","@stdlib/array/complex64":"00D","@stdlib/array/convert-same":"00E","@stdlib/array/convert":"00F","@stdlib/array/ctors":"00G","@stdlib/array/dataview":"00H","@stdlib/array/datespace":"00I","@stdlib/array/dtype":"00J","@stdlib/array/dtypes":"00K","@stdlib/array/filled-by":"00L","@stdlib/array/filled":"00M","@stdlib/array/float32":"00N","@stdlib/array/float64":"00O","@stdlib/array/from-iterator":"00P","@stdlib/array/full-like":"00Q","@stdlib/array/full":"00R","@stdlib/array/incrspace":"00S","@stdlib/array/int16":"00T","@stdlib/array/int32":"00U","@stdlib/array/int8":"00V","@stdlib/array/linspace":"00W","@stdlib/array/logspace":"00X","@stdlib/array/min-dtype":"00Y","@stdlib/array/next-dtype":"00Z","@stdlib/array/ones-like":"00a","@stdlib/array/ones":"00b","@stdlib/array":"00c","@stdlib/array/pool":"00d","@stdlib/array/promotion-rules":"00e","@stdlib/array/reviver":"00f","@stdlib/array/safe-casts":"00g","@stdlib/array/same-kind-casts":"00h","@stdlib/array/shape":"00i","@stdlib/array/shared-buffer":"00j","@stdlib/array/to-circular-iterator":"00k","@stdlib/array/to-iterator-right":"00l","@stdlib/array/to-iterator":"00m","@stdlib/array/to-json":"00n","@stdlib/array/to-sparse-iterator-right":"00o","@stdlib/array/to-sparse-iterator":"00p","@stdlib/array/to-strided-iterator":"00q","@stdlib/array/to-view-iterator-right":"00r","@stdlib/array/to-view-iterator":"00s","@stdlib/array/typed-complex-ctors":"00t","@stdlib/array/typed-complex-dtypes":"00u","@stdlib/array/typed-complex":"00v","@stdlib/array/typed-ctors":"00w","@stdlib/array/typed-dtypes":"00x","@stdlib/array/typed-float-ctors":"00y","@stdlib/array/typed-float-dtypes":"00z","@stdlib/array/typed-integer-ctors":"010","@stdlib/array/typed-integer-dtypes":"011","@stdlib/array/typed-real-ctors":"012","@stdlib/array/typed-real-dtypes":"013","@stdlib/array/typed-real-float-ctors":"014","@stdlib/array/typed-real-float-dtypes":"015","@stdlib/array/typed-real":"016","@stdlib/array/typed-signed-integer-ctors":"017","@stdlib/array/typed-signed-integer-dtypes":"018","@stdlib/array/typed-unsigned-integer-ctors":"019","@stdlib/array/typed-unsigned-integer-dtypes":"01A","@stdlib/array/typed":"01B","@stdlib/array/uint16":"01C","@stdlib/array/uint32":"01D","@stdlib/array/uint8":"01E","@stdlib/array/uint8c":"01F","@stdlib/array/zeros-like":"01G","@stdlib/array/zeros":"01H","@stdlib/assert/contains":"01I","@stdlib/assert/deep-equal":"01J","@stdlib/assert/deep-has-own-property":"01K","@stdlib/assert/deep-has-property":"01L","@stdlib/assert/has-arraybuffer-support":"01M","@stdlib/assert/has-arrow-function-support":"01N","@stdlib/assert/has-async-await-support":"01O","@stdlib/assert/has-async-iterator-symbol-support":"01P","@stdlib/assert/has-bigint-support":"01Q","@stdlib/assert/has-bigint64array-support":"01R","@stdlib/assert/has-biguint64array-support":"01S","@stdlib/assert/has-class-support":"01T","@stdlib/assert/has-dataview-support":"01U","@stdlib/assert/has-define-properties-support":"01V","@stdlib/assert/has-define-property-support":"01W","@stdlib/assert/has-float32array-support":"01X","@stdlib/assert/has-float64array-support":"01Y","@stdlib/assert/has-function-name-support":"01Z","@stdlib/assert/has-generator-support":"01a","@stdlib/assert/has-globalthis-support":"01b","@stdlib/assert/has-int16array-support":"01c","@stdlib/assert/has-int32array-support":"01d","@stdlib/assert/has-int8array-support":"01e","@stdlib/assert/has-iterator-symbol-support":"01f","@stdlib/assert/has-map-support":"01g","@stdlib/assert/has-node-buffer-support":"01h","@stdlib/assert/has-own-property":"01i","@stdlib/assert/has-property":"01j","@stdlib/assert/has-proxy-support":"01k","@stdlib/assert/has-set-support":"01l","@stdlib/assert/has-sharedarraybuffer-support":"01m","@stdlib/assert/has-symbol-support":"01n","@stdlib/assert/has-tostringtag-support":"01o","@stdlib/assert/has-uint16array-support":"01p","@stdlib/assert/has-uint32array-support":"01q","@stdlib/assert/has-uint8array-support":"01r","@stdlib/assert/has-uint8clampedarray-support":"01s","@stdlib/assert/has-utf16-surrogate-pair-at":"01t","@stdlib/assert/has-wasm-support":"01u","@stdlib/assert/has-weakmap-support":"01v","@stdlib/assert/has-weakset-support":"01w","@stdlib/assert/instance-of":"01x","@stdlib/assert/is-absolute-http-uri":"01y","@stdlib/assert/is-absolute-path":"01z","@stdlib/assert/is-absolute-uri":"020","@stdlib/assert/is-accessor-property-in":"021","@stdlib/assert/is-accessor-property":"022","@stdlib/assert/is-alphagram":"023","@stdlib/assert/is-alphanumeric":"024","@stdlib/assert/is-anagram":"025","@stdlib/assert/is-arguments":"026","@stdlib/assert/is-array-array":"027","@stdlib/assert/is-array-length":"028","@stdlib/assert/is-array-like-object":"029","@stdlib/assert/is-array-like":"02A","@stdlib/assert/is-array":"02B","@stdlib/assert/is-arraybuffer-view":"02C","@stdlib/assert/is-arraybuffer":"02D","@stdlib/assert/is-arrow-function":"02E","@stdlib/assert/is-ascii":"02F","@stdlib/assert/is-between-array":"02G","@stdlib/assert/is-between":"02H","@stdlib/assert/is-big-endian":"02I","@stdlib/assert/is-bigint":"02J","@stdlib/assert/is-bigint64array":"02K","@stdlib/assert/is-biguint64array":"02L","@stdlib/assert/is-binary-string":"02M","@stdlib/assert/is-boolean-array":"02N","@stdlib/assert/is-boolean":"02O","@stdlib/assert/is-boxed-primitive":"02P","@stdlib/assert/is-browser":"02Q","@stdlib/assert/is-buffer":"02R","@stdlib/assert/is-capitalized":"02S","@stdlib/assert/is-centrosymmetric-matrix":"02T","@stdlib/assert/is-circular-array":"02U","@stdlib/assert/is-circular-plain-object":"02V","@stdlib/assert/is-circular":"02W","@stdlib/assert/is-class":"02X","@stdlib/assert/is-collection":"02Y","@stdlib/assert/is-complex-like":"02Z","@stdlib/assert/is-complex-typed-array-like":"02a","@stdlib/assert/is-complex-typed-array":"02b","@stdlib/assert/is-complex":"02c","@stdlib/assert/is-complex128":"02d","@stdlib/assert/is-complex128array":"02e","@stdlib/assert/is-complex64":"02f","@stdlib/assert/is-complex64array":"02g","@stdlib/assert/is-composite":"02h","@stdlib/assert/is-configurable-property-in":"02i","@stdlib/assert/is-configurable-property":"02j","@stdlib/assert/is-cube-number":"02k","@stdlib/assert/is-darwin":"02l","@stdlib/assert/is-data-property-in":"02m","@stdlib/assert/is-data-property":"02n","@stdlib/assert/is-dataview":"02o","@stdlib/assert/is-date-object-array":"02p","@stdlib/assert/is-date-object":"02q","@stdlib/assert/is-digit-string":"02r","@stdlib/assert/is-docker":"02s","@stdlib/assert/is-electron-main":"02t","@stdlib/assert/is-electron-renderer":"02u","@stdlib/assert/is-electron":"02v","@stdlib/assert/is-email-address":"02w","@stdlib/assert/is-empty-array-like-object":"02x","@stdlib/assert/is-empty-array":"02y","@stdlib/assert/is-empty-collection":"02z","@stdlib/assert/is-empty-object":"030","@stdlib/assert/is-empty-string":"031","@stdlib/assert/is-enumerable-property-in":"032","@stdlib/assert/is-enumerable-property":"033","@stdlib/assert/is-error":"034","@stdlib/assert/is-eval-error":"035","@stdlib/assert/is-even":"036","@stdlib/assert/is-falsy-array":"037","@stdlib/assert/is-falsy":"038","@stdlib/assert/is-finite-array":"039","@stdlib/assert/is-finite":"03A","@stdlib/assert/is-float32array":"03B","@stdlib/assert/is-float32matrix-like":"03C","@stdlib/assert/is-float32ndarray-like":"03D","@stdlib/assert/is-float32vector-like":"03E","@stdlib/assert/is-float64array":"03F","@stdlib/assert/is-float64matrix-like":"03G","@stdlib/assert/is-float64ndarray-like":"03H","@stdlib/assert/is-float64vector-like":"03I","@stdlib/assert/is-function-array":"03J","@stdlib/assert/is-function":"03K","@stdlib/assert/is-generator-object-like":"03L","@stdlib/assert/is-generator-object":"03M","@stdlib/assert/is-gzip-buffer":"03N","@stdlib/assert/is-hex-string":"03O","@stdlib/assert/is-infinite":"03P","@stdlib/assert/is-inherited-property":"03Q","@stdlib/assert/is-int16array":"03R","@stdlib/assert/is-int32array":"03S","@stdlib/assert/is-int8array":"03T","@stdlib/assert/is-integer-array":"03U","@stdlib/assert/is-integer":"03V","@stdlib/assert/is-iterable-like":"03W","@stdlib/assert/is-iterator-like":"03X","@stdlib/assert/is-json":"03Y","@stdlib/assert/is-leap-year":"03Z","@stdlib/assert/is-little-endian":"03a","@stdlib/assert/is-localhost":"03b","@stdlib/assert/is-lowercase":"03c","@stdlib/assert/is-matrix-like":"03d","@stdlib/assert/is-method-in":"03e","@stdlib/assert/is-method":"03f","@stdlib/assert/is-mobile":"03g","@stdlib/assert/is-named-typed-tuple-like":"03h","@stdlib/assert/is-nan-array":"03i","@stdlib/assert/is-nan":"03j","@stdlib/assert/is-native-function":"03k","@stdlib/assert/is-ndarray-like":"03l","@stdlib/assert/is-negative-integer-array":"03m","@stdlib/assert/is-negative-integer":"03n","@stdlib/assert/is-negative-number-array":"03o","@stdlib/assert/is-negative-number":"03p","@stdlib/assert/is-negative-zero":"03q","@stdlib/assert/is-node-builtin":"03r","@stdlib/assert/is-node-duplex-stream-like":"03s","@stdlib/assert/is-node-readable-stream-like":"03t","@stdlib/assert/is-node-repl":"03u","@stdlib/assert/is-node-stream-like":"03v","@stdlib/assert/is-node-transform-stream-like":"03w","@stdlib/assert/is-node-writable-stream-like":"03x","@stdlib/assert/is-node":"03y","@stdlib/assert/is-nonconfigurable-property-in":"03z","@stdlib/assert/is-nonconfigurable-property":"040","@stdlib/assert/is-nonenumerable-property-in":"041","@stdlib/assert/is-nonenumerable-property":"042","@stdlib/assert/is-nonnegative-integer-array":"043","@stdlib/assert/is-nonnegative-integer":"044","@stdlib/assert/is-nonnegative-number-array":"045","@stdlib/assert/is-nonnegative-number":"046","@stdlib/assert/is-nonpositive-integer-array":"047","@stdlib/assert/is-nonpositive-integer":"048","@stdlib/assert/is-nonpositive-number-array":"049","@stdlib/assert/is-nonpositive-number":"04A","@stdlib/assert/is-nonsymmetric-matrix":"04B","@stdlib/assert/is-null-array":"04C","@stdlib/assert/is-null":"04D","@stdlib/assert/is-number-array":"04E","@stdlib/assert/is-number":"04F","@stdlib/assert/is-numeric-array":"04G","@stdlib/assert/is-object-array":"04H","@stdlib/assert/is-object-like":"04I","@stdlib/assert/is-object":"04J","@stdlib/assert/is-odd":"04K","@stdlib/assert/is-persymmetric-matrix":"04L","@stdlib/assert/is-plain-object-array":"04M","@stdlib/assert/is-plain-object":"04N","@stdlib/assert/is-positive-integer-array":"04O","@stdlib/assert/is-positive-integer":"04P","@stdlib/assert/is-positive-number-array":"04Q","@stdlib/assert/is-positive-number":"04R","@stdlib/assert/is-positive-zero":"04S","@stdlib/assert/is-prime":"04T","@stdlib/assert/is-primitive-array":"04U","@stdlib/assert/is-primitive":"04V","@stdlib/assert/is-prng-like":"04W","@stdlib/assert/is-probability-array":"04X","@stdlib/assert/is-probability":"04Y","@stdlib/assert/is-property-key":"04Z","@stdlib/assert/is-prototype-of":"04a","@stdlib/assert/is-range-error":"04b","@stdlib/assert/is-read-only-property-in":"04c","@stdlib/assert/is-read-only-property":"04d","@stdlib/assert/is-read-write-property-in":"04e","@stdlib/assert/is-read-write-property":"04f","@stdlib/assert/is-readable-property-in":"04g","@stdlib/assert/is-readable-property":"04h","@stdlib/assert/is-reference-error":"04i","@stdlib/assert/is-regexp-string":"04j","@stdlib/assert/is-regexp":"04k","@stdlib/assert/is-relative-path":"04l","@stdlib/assert/is-relative-uri":"04m","@stdlib/assert/is-safe-integer-array":"04n","@stdlib/assert/is-safe-integer":"04o","@stdlib/assert/is-same-native-class":"04p","@stdlib/assert/is-same-type":"04q","@stdlib/assert/is-same-value-zero":"04r","@stdlib/assert/is-same-value":"04s","@stdlib/assert/is-sharedarraybuffer":"04t","@stdlib/assert/is-skew-centrosymmetric-matrix":"04u","@stdlib/assert/is-skew-persymmetric-matrix":"04v","@stdlib/assert/is-skew-symmetric-matrix":"04w","@stdlib/assert/is-square-matrix":"04x","@stdlib/assert/is-square-number":"04y","@stdlib/assert/is-square-triangular-number":"04z","@stdlib/assert/is-strict-equal":"050","@stdlib/assert/is-string-array":"051","@stdlib/assert/is-string":"052","@stdlib/assert/is-symbol-array":"053","@stdlib/assert/is-symbol":"054","@stdlib/assert/is-symmetric-matrix":"055","@stdlib/assert/is-syntax-error":"056","@stdlib/assert/is-touch-device":"057","@stdlib/assert/is-triangular-number":"058","@stdlib/assert/is-truthy-array":"059","@stdlib/assert/is-truthy":"05A","@stdlib/assert/is-type-error":"05B","@stdlib/assert/is-typed-array-length":"05C","@stdlib/assert/is-typed-array-like":"05D","@stdlib/assert/is-typed-array":"05E","@stdlib/assert/is-uint16array":"05F","@stdlib/assert/is-uint32array":"05G","@stdlib/assert/is-uint8array":"05H","@stdlib/assert/is-uint8clampedarray":"05I","@stdlib/assert/is-unc-path":"05J","@stdlib/assert/is-undefined-or-null":"05K","@stdlib/assert/is-undefined":"05L","@stdlib/assert/is-unity-probability-array":"05M","@stdlib/assert/is-uppercase":"05N","@stdlib/assert/is-uri-error":"05O","@stdlib/assert/is-uri":"05P","@stdlib/assert/is-vector-like":"05Q","@stdlib/assert/is-web-worker":"05R","@stdlib/assert/is-whitespace":"05S","@stdlib/assert/is-windows":"05T","@stdlib/assert/is-writable-property-in":"05U","@stdlib/assert/is-writable-property":"05V","@stdlib/assert/is-write-only-property-in":"05W","@stdlib/assert/is-write-only-property":"05X","@stdlib/assert":"05Y","@stdlib/assert/tools/array-function":"05Z","@stdlib/assert/tools/array-like-function":"05a","@stdlib/assert/tools":"05b","@stdlib/assert/tools/typed-array-function":"05c","@stdlib/bench/harness":"05d","@stdlib/bench":"05e","@stdlib/bigint/ctor":"05f","@stdlib/bigint":"05g","@stdlib/blas/base/ccopy":"05h","@stdlib/blas/base/cswap":"05i","@stdlib/blas/base/dasum":"05j","@stdlib/blas/base/daxpy":"05k","@stdlib/blas/base/dcopy":"05l","@stdlib/blas/base/ddot":"05m","@stdlib/blas/base/dnrm2":"05n","@stdlib/blas/base/dscal":"05o","@stdlib/blas/base/dsdot":"05p","@stdlib/blas/base/dswap":"05q","@stdlib/blas/base/gasum":"05r","@stdlib/blas/base/gaxpy":"05s","@stdlib/blas/base/gcopy":"05t","@stdlib/blas/base/gdot":"05u","@stdlib/blas/base/gnrm2":"05v","@stdlib/blas/base/gscal":"05w","@stdlib/blas/base/gswap":"05x","@stdlib/blas/base":"05y","@stdlib/blas/base/sasum":"05z","@stdlib/blas/base/saxpy":"060","@stdlib/blas/base/scopy":"061","@stdlib/blas/base/sdot":"062","@stdlib/blas/base/sdsdot":"063","@stdlib/blas/base/snrm2":"064","@stdlib/blas/base/sscal":"065","@stdlib/blas/base/sswap":"066","@stdlib/blas/ddot":"067","@stdlib/blas/dswap":"068","@stdlib/blas/ext/base/dapx":"069","@stdlib/blas/ext/base/dapxsum":"06A","@stdlib/blas/ext/base/dapxsumkbn":"06B","@stdlib/blas/ext/base/dapxsumkbn2":"06C","@stdlib/blas/ext/base/dapxsumors":"06D","@stdlib/blas/ext/base/dapxsumpw":"06E","@stdlib/blas/ext/base/dasumpw":"06F","@stdlib/blas/ext/base/dcusum":"06G","@stdlib/blas/ext/base/dcusumkbn":"06H","@stdlib/blas/ext/base/dcusumkbn2":"06I","@stdlib/blas/ext/base/dcusumors":"06J","@stdlib/blas/ext/base/dcusumpw":"06K","@stdlib/blas/ext/base/dfill":"06L","@stdlib/blas/ext/base/dnanasum":"06M","@stdlib/blas/ext/base/dnanasumors":"06N","@stdlib/blas/ext/base/dnannsum":"06O","@stdlib/blas/ext/base/dnannsumkbn":"06P","@stdlib/blas/ext/base/dnannsumkbn2":"06Q","@stdlib/blas/ext/base/dnannsumors":"06R","@stdlib/blas/ext/base/dnannsumpw":"06S","@stdlib/blas/ext/base/dnansum":"06T","@stdlib/blas/ext/base/dnansumkbn":"06U","@stdlib/blas/ext/base/dnansumkbn2":"06V","@stdlib/blas/ext/base/dnansumors":"06W","@stdlib/blas/ext/base/dnansumpw":"06X","@stdlib/blas/ext/base/drev":"06Y","@stdlib/blas/ext/base/dsapxsum":"06Z","@stdlib/blas/ext/base/dsapxsumpw":"06a","@stdlib/blas/ext/base/dsnannsumors":"06b","@stdlib/blas/ext/base/dsnansum":"06c","@stdlib/blas/ext/base/dsnansumors":"06d","@stdlib/blas/ext/base/dsnansumpw":"06e","@stdlib/blas/ext/base/dsort2hp":"06f","@stdlib/blas/ext/base/dsort2ins":"06g","@stdlib/blas/ext/base/dsort2sh":"06h","@stdlib/blas/ext/base/dsorthp":"06i","@stdlib/blas/ext/base/dsortins":"06j","@stdlib/blas/ext/base/dsortsh":"06k","@stdlib/blas/ext/base/dssum":"06l","@stdlib/blas/ext/base/dssumors":"06m","@stdlib/blas/ext/base/dssumpw":"06n","@stdlib/blas/ext/base/dsum":"06o","@stdlib/blas/ext/base/dsumkbn":"06p","@stdlib/blas/ext/base/dsumkbn2":"06q","@stdlib/blas/ext/base/dsumors":"06r","@stdlib/blas/ext/base/dsumpw":"06s","@stdlib/blas/ext/base/gapx":"06t","@stdlib/blas/ext/base/gapxsum":"06u","@stdlib/blas/ext/base/gapxsumkbn":"06v","@stdlib/blas/ext/base/gapxsumkbn2":"06w","@stdlib/blas/ext/base/gapxsumors":"06x","@stdlib/blas/ext/base/gapxsumpw":"06y","@stdlib/blas/ext/base/gasumpw":"06z","@stdlib/blas/ext/base/gcusum":"070","@stdlib/blas/ext/base/gcusumkbn":"071","@stdlib/blas/ext/base/gcusumkbn2":"072","@stdlib/blas/ext/base/gcusumors":"073","@stdlib/blas/ext/base/gcusumpw":"074","@stdlib/blas/ext/base/gfill-by":"075","@stdlib/blas/ext/base/gfill":"076","@stdlib/blas/ext/base/gnannsumkbn":"077","@stdlib/blas/ext/base/gnansum":"078","@stdlib/blas/ext/base/gnansumkbn":"079","@stdlib/blas/ext/base/gnansumkbn2":"07A","@stdlib/blas/ext/base/gnansumors":"07B","@stdlib/blas/ext/base/gnansumpw":"07C","@stdlib/blas/ext/base/grev":"07D","@stdlib/blas/ext/base/gsort2hp":"07E","@stdlib/blas/ext/base/gsort2ins":"07F","@stdlib/blas/ext/base/gsort2sh":"07G","@stdlib/blas/ext/base/gsorthp":"07H","@stdlib/blas/ext/base/gsortins":"07I","@stdlib/blas/ext/base/gsortsh":"07J","@stdlib/blas/ext/base/gsum":"07K","@stdlib/blas/ext/base/gsumkbn":"07L","@stdlib/blas/ext/base/gsumkbn2":"07M","@stdlib/blas/ext/base/gsumors":"07N","@stdlib/blas/ext/base/gsumpw":"07O","@stdlib/blas/ext/base":"07P","@stdlib/blas/ext/base/sapx":"07Q","@stdlib/blas/ext/base/sapxsum":"07R","@stdlib/blas/ext/base/sapxsumkbn":"07S","@stdlib/blas/ext/base/sapxsumkbn2":"07T","@stdlib/blas/ext/base/sapxsumors":"07U","@stdlib/blas/ext/base/sapxsumpw":"07V","@stdlib/blas/ext/base/sasumpw":"07W","@stdlib/blas/ext/base/scusum":"07X","@stdlib/blas/ext/base/scusumkbn":"07Y","@stdlib/blas/ext/base/scusumkbn2":"07Z","@stdlib/blas/ext/base/scusumors":"07a","@stdlib/blas/ext/base/scusumpw":"07b","@stdlib/blas/ext/base/sdsapxsum":"07c","@stdlib/blas/ext/base/sdsapxsumpw":"07d","@stdlib/blas/ext/base/sdsnansum":"07e","@stdlib/blas/ext/base/sdsnansumpw":"07f","@stdlib/blas/ext/base/sdssum":"07g","@stdlib/blas/ext/base/sdssumpw":"07h","@stdlib/blas/ext/base/sfill":"07i","@stdlib/blas/ext/base/snansum":"07j","@stdlib/blas/ext/base/snansumkbn":"07k","@stdlib/blas/ext/base/snansumkbn2":"07l","@stdlib/blas/ext/base/snansumors":"07m","@stdlib/blas/ext/base/snansumpw":"07n","@stdlib/blas/ext/base/srev":"07o","@stdlib/blas/ext/base/ssort2hp":"07p","@stdlib/blas/ext/base/ssort2ins":"07q","@stdlib/blas/ext/base/ssort2sh":"07r","@stdlib/blas/ext/base/ssorthp":"07s","@stdlib/blas/ext/base/ssortins":"07t","@stdlib/blas/ext/base/ssortsh":"07u","@stdlib/blas/ext/base/ssum":"07v","@stdlib/blas/ext/base/ssumkbn":"07w","@stdlib/blas/ext/base/ssumkbn2":"07x","@stdlib/blas/ext/base/ssumors":"07y","@stdlib/blas/ext/base/ssumpw":"07z","@stdlib/blas/ext":"080","@stdlib/blas/gdot":"081","@stdlib/blas/gswap":"082","@stdlib/blas":"083","@stdlib/blas/sdot":"084","@stdlib/blas/sswap":"085","@stdlib/buffer/alloc-unsafe":"086","@stdlib/buffer/ctor":"087","@stdlib/buffer/from-array":"088","@stdlib/buffer/from-arraybuffer":"089","@stdlib/buffer/from-buffer":"08A","@stdlib/buffer/from-string":"08B","@stdlib/buffer":"08C","@stdlib/buffer/reviver":"08D","@stdlib/buffer/to-json":"08E","@stdlib/cli/ctor":"08F","@stdlib/cli":"08G","@stdlib/complex/base/wrap-function":"08H","@stdlib/complex/cmplx":"08I","@stdlib/complex/conj":"08J","@stdlib/complex/conjf":"08K","@stdlib/complex/ctors":"08L","@stdlib/complex/dtype":"08M","@stdlib/complex/dtypes":"08N","@stdlib/complex/float32":"08O","@stdlib/complex/float64":"08P","@stdlib/complex/imag":"08Q","@stdlib/complex/imagf":"08R","@stdlib/complex":"08S","@stdlib/complex/promotion-rules":"08T","@stdlib/complex/real":"08U","@stdlib/complex/realf":"08V","@stdlib/complex/reim":"08W","@stdlib/complex/reimf":"08X","@stdlib/complex/reviver-float32":"08Y","@stdlib/complex/reviver-float64":"08Z","@stdlib/complex/reviver":"08a","@stdlib/constants/array/max-array-length":"08b","@stdlib/constants/array/max-typed-array-length":"08c","@stdlib/constants/array":"08d","@stdlib/constants/complex128/num-bytes":"08e","@stdlib/constants/complex128":"08f","@stdlib/constants/complex64/num-bytes":"08g","@stdlib/constants/complex64":"08h","@stdlib/constants/float16/cbrt-eps":"08i","@stdlib/constants/float16/eps":"08j","@stdlib/constants/float16/exponent-bias":"08k","@stdlib/constants/float16/max-safe-integer":"08l","@stdlib/constants/float16/max":"08m","@stdlib/constants/float16/min-safe-integer":"08n","@stdlib/constants/float16/ninf":"08o","@stdlib/constants/float16/num-bytes":"08p","@stdlib/constants/float16":"08q","@stdlib/constants/float16/pinf":"08r","@stdlib/constants/float16/precision":"08s","@stdlib/constants/float16/smallest-normal":"08t","@stdlib/constants/float16/smallest-subnormal":"08u","@stdlib/constants/float16/sqrt-eps":"08v","@stdlib/constants/float32/cbrt-eps":"08w","@stdlib/constants/float32/eps":"08x","@stdlib/constants/float32/exponent-bias":"08y","@stdlib/constants/float32/max-safe-integer":"08z","@stdlib/constants/float32/max":"090","@stdlib/constants/float32/min-safe-integer":"091","@stdlib/constants/float32/ninf":"092","@stdlib/constants/float32/num-bytes":"093","@stdlib/constants/float32":"094","@stdlib/constants/float32/pinf":"095","@stdlib/constants/float32/precision":"096","@stdlib/constants/float32/smallest-normal":"097","@stdlib/constants/float32/smallest-subnormal":"098","@stdlib/constants/float32/sqrt-eps":"099","@stdlib/constants/float64/apery":"09A","@stdlib/constants/float64/catalan":"09B","@stdlib/constants/float64/cbrt-eps":"09C","@stdlib/constants/float64/e":"09D","@stdlib/constants/float64/eps":"09E","@stdlib/constants/float64/eulergamma":"09F","@stdlib/constants/float64/exponent-bias":"09G","@stdlib/constants/float64/fourth-pi":"09H","@stdlib/constants/float64/fourth-root-eps":"09I","@stdlib/constants/float64/gamma-lanczos-g":"09J","@stdlib/constants/float64/glaisher-kinkelin":"09K","@stdlib/constants/float64/half-ln-two":"09L","@stdlib/constants/float64/half-pi":"09M","@stdlib/constants/float64/high-word-exponent-mask":"09N","@stdlib/constants/float64/high-word-significand-mask":"09O","@stdlib/constants/float64/ln-half":"09P","@stdlib/constants/float64/ln-pi":"09Q","@stdlib/constants/float64/ln-sqrt-two-pi":"09R","@stdlib/constants/float64/ln-ten":"09S","@stdlib/constants/float64/ln-two-pi":"09T","@stdlib/constants/float64/ln-two":"09U","@stdlib/constants/float64/log10-e":"09V","@stdlib/constants/float64/log2-e":"09W","@stdlib/constants/float64/max-base10-exponent-subnormal":"09X","@stdlib/constants/float64/max-base10-exponent":"09Y","@stdlib/constants/float64/max-base2-exponent-subnormal":"09Z","@stdlib/constants/float64/max-base2-exponent":"09a","@stdlib/constants/float64/max-ln":"09b","@stdlib/constants/float64/max-safe-fibonacci":"09c","@stdlib/constants/float64/max-safe-integer":"09d","@stdlib/constants/float64/max-safe-lucas":"09e","@stdlib/constants/float64/max-safe-nth-fibonacci":"09f","@stdlib/constants/float64/max-safe-nth-lucas":"09g","@stdlib/constants/float64/max":"09h","@stdlib/constants/float64/min-base10-exponent-subnormal":"09i","@stdlib/constants/float64/min-base10-exponent":"09j","@stdlib/constants/float64/min-base2-exponent-subnormal":"09k","@stdlib/constants/float64/min-base2-exponent":"09l","@stdlib/constants/float64/min-ln":"09m","@stdlib/constants/float64/min-safe-integer":"09n","@stdlib/constants/float64/ninf":"09o","@stdlib/constants/float64/num-bytes":"09p","@stdlib/constants/float64":"09q","@stdlib/constants/float64/phi":"09r","@stdlib/constants/float64/pi-squared":"09s","@stdlib/constants/float64/pi":"09t","@stdlib/constants/float64/pinf":"09u","@stdlib/constants/float64/precision":"09v","@stdlib/constants/float64/smallest-normal":"09w","@stdlib/constants/float64/smallest-subnormal":"09x","@stdlib/constants/float64/sqrt-eps":"09y","@stdlib/constants/float64/sqrt-half-pi":"09z","@stdlib/constants/float64/sqrt-half":"0A0","@stdlib/constants/float64/sqrt-phi":"0A1","@stdlib/constants/float64/sqrt-pi":"0A2","@stdlib/constants/float64/sqrt-three":"0A3","@stdlib/constants/float64/sqrt-two-pi":"0A4","@stdlib/constants/float64/sqrt-two":"0A5","@stdlib/constants/float64/two-pi":"0A6","@stdlib/constants/int16/max":"0A7","@stdlib/constants/int16/min":"0A8","@stdlib/constants/int16/num-bytes":"0A9","@stdlib/constants/int16":"0AA","@stdlib/constants/int32/max":"0AB","@stdlib/constants/int32/min":"0AC","@stdlib/constants/int32/num-bytes":"0AD","@stdlib/constants/int32":"0AE","@stdlib/constants/int8/max":"0AF","@stdlib/constants/int8/min":"0AG","@stdlib/constants/int8/num-bytes":"0AH","@stdlib/constants/int8":"0AI","@stdlib/constants":"0AJ","@stdlib/constants/path/delimiter-posix":"0AK","@stdlib/constants/path/delimiter-win32":"0AL","@stdlib/constants/path/delimiter":"0AM","@stdlib/constants/path":"0AN","@stdlib/constants/path/sep-posix":"0AO","@stdlib/constants/path/sep-win32":"0AP","@stdlib/constants/path/sep":"0AQ","@stdlib/constants/time/hours-in-day":"0AR","@stdlib/constants/time/hours-in-week":"0AS","@stdlib/constants/time/milliseconds-in-day":"0AT","@stdlib/constants/time/milliseconds-in-hour":"0AU","@stdlib/constants/time/milliseconds-in-minute":"0AV","@stdlib/constants/time/milliseconds-in-second":"0AW","@stdlib/constants/time/milliseconds-in-week":"0AX","@stdlib/constants/time/minutes-in-day":"0AY","@stdlib/constants/time/minutes-in-hour":"0AZ","@stdlib/constants/time/minutes-in-week":"0Aa","@stdlib/constants/time/months-in-year":"0Ab","@stdlib/constants/time":"0Ac","@stdlib/constants/time/seconds-in-day":"0Ad","@stdlib/constants/time/seconds-in-hour":"0Ae","@stdlib/constants/time/seconds-in-minute":"0Af","@stdlib/constants/time/seconds-in-week":"0Ag","@stdlib/constants/uint16/max":"0Ah","@stdlib/constants/uint16/num-bytes":"0Ai","@stdlib/constants/uint16":"0Aj","@stdlib/constants/uint32/max":"0Ak","@stdlib/constants/uint32/num-bytes":"0Al","@stdlib/constants/uint32":"0Am","@stdlib/constants/uint8/max":"0An","@stdlib/constants/uint8/num-bytes":"0Ao","@stdlib/constants/uint8":"0Ap","@stdlib/constants/unicode/max-bmp":"0Aq","@stdlib/constants/unicode/max":"0Ar","@stdlib/constants/unicode":"0As","@stdlib/datasets/afinn-111":"0At","@stdlib/datasets/afinn-96":"0Au","@stdlib/datasets/anscombes-quartet":"0Av","@stdlib/datasets/berndt-cps-wages-1985":"0Aw","@stdlib/datasets/cdc-nchs-us-births-1969-1988":"0Ax","@stdlib/datasets/cdc-nchs-us-births-1994-2003":"0Ay","@stdlib/datasets/cdc-nchs-us-infant-mortality-bw-1915-2013":"0Az","@stdlib/datasets/cmudict":"0B0","@stdlib/datasets/dale-chall-new":"0B1","@stdlib/datasets/emoji-code-picto":"0B2","@stdlib/datasets/emoji-picto-code":"0B3","@stdlib/datasets/emoji":"0B4","@stdlib/datasets/female-first-names-en":"0B5","@stdlib/datasets/fivethirtyeight-ffq":"0B6","@stdlib/datasets/frb-sf-wage-rigidity":"0B7","@stdlib/datasets/harrison-boston-house-prices-corrected":"0B8","@stdlib/datasets/harrison-boston-house-prices":"0B9","@stdlib/datasets/herndon-venus-semidiameters":"0BA","@stdlib/datasets/img-acanthus-mollis":"0BB","@stdlib/datasets/img-airplane-from-above":"0BC","@stdlib/datasets/img-allium-oreophilum":"0BD","@stdlib/datasets/img-black-canyon":"0BE","@stdlib/datasets/img-dust-bowl-home":"0BF","@stdlib/datasets/img-french-alpine-landscape":"0BG","@stdlib/datasets/img-locomotion-house-cat":"0BH","@stdlib/datasets/img-locomotion-nude-male":"0BI","@stdlib/datasets/img-march-pastoral":"0BJ","@stdlib/datasets/img-nagasaki-boats":"0BK","@stdlib/datasets/liu-negative-opinion-words-en":"0BL","@stdlib/datasets/liu-positive-opinion-words-en":"0BM","@stdlib/datasets/male-first-names-en":"0BN","@stdlib/datasets/minard-napoleons-march":"0BO","@stdlib/datasets/moby-dick":"0BP","@stdlib/datasets/month-names-en":"0BQ","@stdlib/datasets/nightingales-rose":"0BR","@stdlib/datasets/pace-boston-house-prices":"0BS","@stdlib/datasets":"0BT","@stdlib/datasets/primes-100k":"0BU","@stdlib/datasets/savoy-stopwords-fin":"0BV","@stdlib/datasets/savoy-stopwords-fr":"0BW","@stdlib/datasets/savoy-stopwords-ger":"0BX","@stdlib/datasets/savoy-stopwords-it":"0BY","@stdlib/datasets/savoy-stopwords-por":"0BZ","@stdlib/datasets/savoy-stopwords-sp":"0Ba","@stdlib/datasets/savoy-stopwords-swe":"0Bb","@stdlib/datasets/sotu":"0Bc","@stdlib/datasets/spache-revised":"0Bd","@stdlib/datasets/spam-assassin":"0Be","@stdlib/datasets/ssa-us-births-2000-2014":"0Bf","@stdlib/datasets/standard-card-deck":"0Bg","@stdlib/datasets/stopwords-en":"0Bh","@stdlib/datasets/suthaharan-multi-hop-sensor-network":"0Bi","@stdlib/datasets/suthaharan-single-hop-sensor-network":"0Bj","@stdlib/datasets/us-states-abbr":"0Bk","@stdlib/datasets/us-states-capitals-names":"0Bl","@stdlib/datasets/us-states-capitals":"0Bm","@stdlib/datasets/us-states-names-capitals":"0Bn","@stdlib/datasets/us-states-names":"0Bo","@stdlib/error":"0Bp","@stdlib/error/reviver":"0Bq","@stdlib/error/to-json":"0Br","@stdlib/error/tools/fmtprodmsg":"0Bs","@stdlib/error/tools/id2pkg":"0Bt","@stdlib/error/tools":"0Bu","@stdlib/error/tools/pkg2id":"0Bv","@stdlib/fs/close":"0Bw","@stdlib/fs/exists":"0Bx","@stdlib/fs/open":"0By","@stdlib/fs":"0Bz","@stdlib/fs/read-dir":"0C0","@stdlib/fs/read-file-list":"0C1","@stdlib/fs/read-file":"0C2","@stdlib/fs/read-json":"0C3","@stdlib/fs/read-wasm":"0C4","@stdlib/fs/rename":"0C5","@stdlib/fs/resolve-parent-path-by":"0C6","@stdlib/fs/resolve-parent-path":"0C7","@stdlib/fs/unlink":"0C8","@stdlib/fs/write-file":"0C9","@stdlib/iter/advance":"0CA","@stdlib/iter/any-by":"0CB","@stdlib/iter/any":"0CC","@stdlib/iter/concat":"0CD","@stdlib/iter/constant":"0CE","@stdlib/iter/counter":"0CF","@stdlib/iter/datespace":"0CG","@stdlib/iter/dedupe-by":"0CH","@stdlib/iter/dedupe":"0CI","@stdlib/iter/empty":"0CJ","@stdlib/iter/every-by":"0CK","@stdlib/iter/every":"0CL","@stdlib/iter/fill":"0CM","@stdlib/iter/filter-map":"0CN","@stdlib/iter/filter":"0CO","@stdlib/iter/first":"0CP","@stdlib/iter/flow":"0CQ","@stdlib/iter/for-each":"0CR","@stdlib/iter/head":"0CS","@stdlib/iter/incrspace":"0CT","@stdlib/iter/intersection-by-hash":"0CU","@stdlib/iter/intersection":"0CV","@stdlib/iter/last":"0CW","@stdlib/iter/length":"0CX","@stdlib/iter/linspace":"0CY","@stdlib/iter/logspace":"0CZ","@stdlib/iter/map":"0Ca","@stdlib/iter/mapn":"0Cb","@stdlib/iter/none-by":"0Cc","@stdlib/iter/none":"0Cd","@stdlib/iter/nth":"0Ce","@stdlib/iter":"0Cf","@stdlib/iter/pipeline-thunk":"0Cg","@stdlib/iter/pipeline":"0Ch","@stdlib/iter/pop":"0Ci","@stdlib/iter/push":"0Cj","@stdlib/iter/reject":"0Ck","@stdlib/iter/replicate-by":"0Cl","@stdlib/iter/replicate":"0Cm","@stdlib/iter/shift":"0Cn","@stdlib/iter/slice":"0Co","@stdlib/iter/some-by":"0Cp","@stdlib/iter/some":"0Cq","@stdlib/iter/step":"0Cr","@stdlib/iter/strided-by":"0Cs","@stdlib/iter/strided":"0Ct","@stdlib/iter/to-array-view-right":"0Cu","@stdlib/iter/to-array-view":"0Cv","@stdlib/iter/union":"0Cw","@stdlib/iter/unique-by-hash":"0Cx","@stdlib/iter/unique-by":"0Cy","@stdlib/iter/unique":"0Cz","@stdlib/iter/unitspace":"0D0","@stdlib/iter/unshift":"0D1","@stdlib/math/base/assert/int32-is-even":"0D2","@stdlib/math/base/assert/int32-is-odd":"0D3","@stdlib/math/base/assert/is-composite":"0D4","@stdlib/math/base/assert/is-coprime":"0D5","@stdlib/math/base/assert/is-even":"0D6","@stdlib/math/base/assert/is-finite":"0D7","@stdlib/math/base/assert/is-finitef":"0D8","@stdlib/math/base/assert/is-infinite":"0D9","@stdlib/math/base/assert/is-infinitef":"0DA","@stdlib/math/base/assert/is-integer":"0DB","@stdlib/math/base/assert/is-nan":"0DC","@stdlib/math/base/assert/is-nanf":"0DD","@stdlib/math/base/assert/is-negative-integer":"0DE","@stdlib/math/base/assert/is-negative-zero":"0DF","@stdlib/math/base/assert/is-negative-zerof":"0DG","@stdlib/math/base/assert/is-nonnegative-integer":"0DH","@stdlib/math/base/assert/is-nonpositive-integer":"0DI","@stdlib/math/base/assert/is-odd":"0DJ","@stdlib/math/base/assert/is-positive-integer":"0DK","@stdlib/math/base/assert/is-positive-zero":"0DL","@stdlib/math/base/assert/is-positive-zerof":"0DM","@stdlib/math/base/assert/is-prime":"0DN","@stdlib/math/base/assert/is-probability":"0DO","@stdlib/math/base/assert/is-safe-integer":"0DP","@stdlib/math/base/assert":"0DQ","@stdlib/math/base/assert/uint32-is-pow2":"0DR","@stdlib/math/base/napi/binary":"0DS","@stdlib/math/base/napi":"0DT","@stdlib/math/base/napi/ternary":"0DU","@stdlib/math/base/napi/unary":"0DV","@stdlib/math/base/ops/add":"0DW","@stdlib/math/base/ops/addf":"0DX","@stdlib/math/base/ops/cadd":"0DY","@stdlib/math/base/ops/caddf":"0DZ","@stdlib/math/base/ops/cdiv":"0Da","@stdlib/math/base/ops/cmul":"0Db","@stdlib/math/base/ops/cmulf":"0Dc","@stdlib/math/base/ops/cneg":"0Dd","@stdlib/math/base/ops/csub":"0De","@stdlib/math/base/ops/csubf":"0Df","@stdlib/math/base/ops/imul":"0Dg","@stdlib/math/base/ops/imuldw":"0Dh","@stdlib/math/base/ops/mul":"0Di","@stdlib/math/base/ops/mulf":"0Dj","@stdlib/math/base/ops":"0Dk","@stdlib/math/base/ops/sub":"0Dl","@stdlib/math/base/ops/subf":"0Dm","@stdlib/math/base/ops/umul":"0Dn","@stdlib/math/base/ops/umuldw":"0Do","@stdlib/math/base":"0Dp","@stdlib/math/base/special/abs":"0Dq","@stdlib/math/base/special/abs2":"0Dr","@stdlib/math/base/special/abs2f":"0Ds","@stdlib/math/base/special/absf":"0Dt","@stdlib/math/base/special/acos":"0Du","@stdlib/math/base/special/acosh":"0Dv","@stdlib/math/base/special/acot":"0Dw","@stdlib/math/base/special/acoth":"0Dx","@stdlib/math/base/special/acovercos":"0Dy","@stdlib/math/base/special/acoversin":"0Dz","@stdlib/math/base/special/acsc":"0E0","@stdlib/math/base/special/acsch":"0E1","@stdlib/math/base/special/ahavercos":"0E2","@stdlib/math/base/special/ahaversin":"0E3","@stdlib/math/base/special/asech":"0E4","@stdlib/math/base/special/asin":"0E5","@stdlib/math/base/special/asinh":"0E6","@stdlib/math/base/special/atan":"0E7","@stdlib/math/base/special/atan2":"0E8","@stdlib/math/base/special/atanh":"0E9","@stdlib/math/base/special/avercos":"0EA","@stdlib/math/base/special/aversin":"0EB","@stdlib/math/base/special/bernoulli":"0EC","@stdlib/math/base/special/besselj0":"0ED","@stdlib/math/base/special/besselj1":"0EE","@stdlib/math/base/special/bessely0":"0EF","@stdlib/math/base/special/bessely1":"0EG","@stdlib/math/base/special/beta":"0EH","@stdlib/math/base/special/betainc":"0EI","@stdlib/math/base/special/betaincinv":"0EJ","@stdlib/math/base/special/betaln":"0EK","@stdlib/math/base/special/binet":"0EL","@stdlib/math/base/special/binomcoef":"0EM","@stdlib/math/base/special/binomcoefln":"0EN","@stdlib/math/base/special/boxcox":"0EO","@stdlib/math/base/special/boxcox1p":"0EP","@stdlib/math/base/special/boxcox1pinv":"0EQ","@stdlib/math/base/special/boxcoxinv":"0ER","@stdlib/math/base/special/cabs":"0ES","@stdlib/math/base/special/cabs2":"0ET","@stdlib/math/base/special/cabs2f":"0EU","@stdlib/math/base/special/cabsf":"0EV","@stdlib/math/base/special/cbrt":"0EW","@stdlib/math/base/special/cbrtf":"0EX","@stdlib/math/base/special/cceil":"0EY","@stdlib/math/base/special/cceilf":"0EZ","@stdlib/math/base/special/cceiln":"0Ea","@stdlib/math/base/special/ccis":"0Eb","@stdlib/math/base/special/ceil":"0Ec","@stdlib/math/base/special/ceil10":"0Ed","@stdlib/math/base/special/ceil2":"0Ee","@stdlib/math/base/special/ceilb":"0Ef","@stdlib/math/base/special/ceilf":"0Eg","@stdlib/math/base/special/ceiln":"0Eh","@stdlib/math/base/special/ceilsd":"0Ei","@stdlib/math/base/special/cexp":"0Ej","@stdlib/math/base/special/cflipsign":"0Ek","@stdlib/math/base/special/cflipsignf":"0El","@stdlib/math/base/special/cfloor":"0Em","@stdlib/math/base/special/cfloorn":"0En","@stdlib/math/base/special/cidentity":"0Eo","@stdlib/math/base/special/cidentityf":"0Ep","@stdlib/math/base/special/cinv":"0Eq","@stdlib/math/base/special/clamp":"0Er","@stdlib/math/base/special/clampf":"0Es","@stdlib/math/base/special/copysign":"0Et","@stdlib/math/base/special/copysignf":"0Eu","@stdlib/math/base/special/cos":"0Ev","@stdlib/math/base/special/cosh":"0Ew","@stdlib/math/base/special/cosm1":"0Ex","@stdlib/math/base/special/cospi":"0Ey","@stdlib/math/base/special/cot":"0Ez","@stdlib/math/base/special/coth":"0F0","@stdlib/math/base/special/covercos":"0F1","@stdlib/math/base/special/coversin":"0F2","@stdlib/math/base/special/cphase":"0F3","@stdlib/math/base/special/cpolar":"0F4","@stdlib/math/base/special/cround":"0F5","@stdlib/math/base/special/croundn":"0F6","@stdlib/math/base/special/csch":"0F7","@stdlib/math/base/special/csignum":"0F8","@stdlib/math/base/special/deg2rad":"0F9","@stdlib/math/base/special/deg2radf":"0FA","@stdlib/math/base/special/digamma":"0FB","@stdlib/math/base/special/dirac-delta":"0FC","@stdlib/math/base/special/dirichlet-eta":"0FD","@stdlib/math/base/special/ellipe":"0FE","@stdlib/math/base/special/ellipk":"0FF","@stdlib/math/base/special/erf":"0FG","@stdlib/math/base/special/erfc":"0FH","@stdlib/math/base/special/erfcinv":"0FI","@stdlib/math/base/special/erfinv":"0FJ","@stdlib/math/base/special/exp":"0FK","@stdlib/math/base/special/exp10":"0FL","@stdlib/math/base/special/exp2":"0FM","@stdlib/math/base/special/expit":"0FN","@stdlib/math/base/special/expm1":"0FO","@stdlib/math/base/special/expm1rel":"0FP","@stdlib/math/base/special/factorial":"0FQ","@stdlib/math/base/special/factorialln":"0FR","@stdlib/math/base/special/falling-factorial":"0FS","@stdlib/math/base/special/fast/abs":"0FT","@stdlib/math/base/special/fast/acosh":"0FU","@stdlib/math/base/special/fast/alpha-max-plus-beta-min":"0FV","@stdlib/math/base/special/fast/asinh":"0FW","@stdlib/math/base/special/fast/atanh":"0FX","@stdlib/math/base/special/fast/hypot":"0FY","@stdlib/math/base/special/fast/max":"0FZ","@stdlib/math/base/special/fast/min":"0Fa","@stdlib/math/base/special/fast":"0Fb","@stdlib/math/base/special/fast/pow-int":"0Fc","@stdlib/math/base/special/fast/uint32-log2":"0Fd","@stdlib/math/base/special/fast/uint32-sqrt":"0Fe","@stdlib/math/base/special/fibonacci-index":"0Ff","@stdlib/math/base/special/fibonacci":"0Fg","@stdlib/math/base/special/flipsign":"0Fh","@stdlib/math/base/special/flipsignf":"0Fi","@stdlib/math/base/special/floor":"0Fj","@stdlib/math/base/special/floor10":"0Fk","@stdlib/math/base/special/floor2":"0Fl","@stdlib/math/base/special/floorb":"0Fm","@stdlib/math/base/special/floorf":"0Fn","@stdlib/math/base/special/floorn":"0Fo","@stdlib/math/base/special/floorsd":"0Fp","@stdlib/math/base/special/fresnel":"0Fq","@stdlib/math/base/special/fresnelc":"0Fr","@stdlib/math/base/special/fresnels":"0Fs","@stdlib/math/base/special/frexp":"0Ft","@stdlib/math/base/special/gamma-delta-ratio":"0Fu","@stdlib/math/base/special/gamma-lanczos-sum-expg-scaled":"0Fv","@stdlib/math/base/special/gamma-lanczos-sum":"0Fw","@stdlib/math/base/special/gamma":"0Fx","@stdlib/math/base/special/gamma1pm1":"0Fy","@stdlib/math/base/special/gammainc":"0Fz","@stdlib/math/base/special/gammaincinv":"0G0","@stdlib/math/base/special/gammaln":"0G1","@stdlib/math/base/special/gcd":"0G2","@stdlib/math/base/special/hacovercos":"0G3","@stdlib/math/base/special/hacoversin":"0G4","@stdlib/math/base/special/havercos":"0G5","@stdlib/math/base/special/haversin":"0G6","@stdlib/math/base/special/heaviside":"0G7","@stdlib/math/base/special/hypot":"0G8","@stdlib/math/base/special/hypotf":"0G9","@stdlib/math/base/special/identity":"0GA","@stdlib/math/base/special/identityf":"0GB","@stdlib/math/base/special/inv":"0GC","@stdlib/math/base/special/invf":"0GD","@stdlib/math/base/special/kernel-betainc":"0GE","@stdlib/math/base/special/kernel-betaincinv":"0GF","@stdlib/math/base/special/kernel-cos":"0GG","@stdlib/math/base/special/kernel-sin":"0GH","@stdlib/math/base/special/kernel-tan":"0GI","@stdlib/math/base/special/kronecker-delta":"0GJ","@stdlib/math/base/special/kronecker-deltaf":"0GK","@stdlib/math/base/special/labs":"0GL","@stdlib/math/base/special/lcm":"0GM","@stdlib/math/base/special/ldexp":"0GN","@stdlib/math/base/special/ln":"0GO","@stdlib/math/base/special/log":"0GP","@stdlib/math/base/special/log10":"0GQ","@stdlib/math/base/special/log1mexp":"0GR","@stdlib/math/base/special/log1p":"0GS","@stdlib/math/base/special/log1pexp":"0GT","@stdlib/math/base/special/log2":"0GU","@stdlib/math/base/special/logaddexp":"0GV","@stdlib/math/base/special/logit":"0GW","@stdlib/math/base/special/lucas":"0GX","@stdlib/math/base/special/max":"0GY","@stdlib/math/base/special/maxabs":"0GZ","@stdlib/math/base/special/min":"0Ga","@stdlib/math/base/special/minabs":"0Gb","@stdlib/math/base/special/minmax":"0Gc","@stdlib/math/base/special/minmaxabs":"0Gd","@stdlib/math/base/special/modf":"0Ge","@stdlib/math/base/special/negafibonacci":"0Gf","@stdlib/math/base/special/negalucas":"0Gg","@stdlib/math/base/special/nonfibonacci":"0Gh","@stdlib/math/base/special":"0Gi","@stdlib/math/base/special/pdiff":"0Gj","@stdlib/math/base/special/pdifff":"0Gk","@stdlib/math/base/special/polygamma":"0Gl","@stdlib/math/base/special/pow":"0Gm","@stdlib/math/base/special/powm1":"0Gn","@stdlib/math/base/special/rad2deg":"0Go","@stdlib/math/base/special/ramp":"0Gp","@stdlib/math/base/special/rampf":"0Gq","@stdlib/math/base/special/rempio2":"0Gr","@stdlib/math/base/special/riemann-zeta":"0Gs","@stdlib/math/base/special/rising-factorial":"0Gt","@stdlib/math/base/special/round":"0Gu","@stdlib/math/base/special/round10":"0Gv","@stdlib/math/base/special/round2":"0Gw","@stdlib/math/base/special/roundb":"0Gx","@stdlib/math/base/special/roundn":"0Gy","@stdlib/math/base/special/roundsd":"0Gz","@stdlib/math/base/special/rsqrt":"0H0","@stdlib/math/base/special/rsqrtf":"0H1","@stdlib/math/base/special/sici":"0H2","@stdlib/math/base/special/signum":"0H3","@stdlib/math/base/special/signumf":"0H4","@stdlib/math/base/special/sin":"0H5","@stdlib/math/base/special/sinc":"0H6","@stdlib/math/base/special/sincos":"0H7","@stdlib/math/base/special/sincospi":"0H8","@stdlib/math/base/special/sinh":"0H9","@stdlib/math/base/special/sinpi":"0HA","@stdlib/math/base/special/spence":"0HB","@stdlib/math/base/special/sqrt":"0HC","@stdlib/math/base/special/sqrt1pm1":"0HD","@stdlib/math/base/special/sqrtf":"0HE","@stdlib/math/base/special/tan":"0HF","@stdlib/math/base/special/tanh":"0HG","@stdlib/math/base/special/tribonacci":"0HH","@stdlib/math/base/special/trigamma":"0HI","@stdlib/math/base/special/trunc":"0HJ","@stdlib/math/base/special/trunc10":"0HK","@stdlib/math/base/special/trunc2":"0HL","@stdlib/math/base/special/truncb":"0HM","@stdlib/math/base/special/truncf":"0HN","@stdlib/math/base/special/truncn":"0HO","@stdlib/math/base/special/truncsd":"0HP","@stdlib/math/base/special/vercos":"0HQ","@stdlib/math/base/special/versin":"0HR","@stdlib/math/base/special/wrap":"0HS","@stdlib/math/base/special/xlog1py":"0HT","@stdlib/math/base/special/xlogy":"0HU","@stdlib/math/base/tools/continued-fraction":"0HV","@stdlib/math/base/tools/evalpoly-compile":"0HW","@stdlib/math/base/tools/evalpoly":"0HX","@stdlib/math/base/tools/evalrational-compile":"0HY","@stdlib/math/base/tools/evalrational":"0HZ","@stdlib/math/base/tools/fibpoly":"0Ha","@stdlib/math/base/tools/hermitepoly":"0Hb","@stdlib/math/base/tools/lucaspoly":"0Hc","@stdlib/math/base/tools/normhermitepoly":"0Hd","@stdlib/math/base/tools":"0He","@stdlib/math/base/tools/sum-series":"0Hf","@stdlib/math/base/utils/absolute-difference":"0Hg","@stdlib/math/base/utils/float64-epsilon-difference":"0Hh","@stdlib/math/base/utils":"0Hi","@stdlib/math/base/utils/relative-difference":"0Hj","@stdlib/math/iter/ops/add":"0Hk","@stdlib/math/iter/ops/divide":"0Hl","@stdlib/math/iter/ops/mod":"0Hm","@stdlib/math/iter/ops/multiply":"0Hn","@stdlib/math/iter/ops":"0Ho","@stdlib/math/iter/ops/subtract":"0Hp","@stdlib/math/iter":"0Hq","@stdlib/math/iter/sequences/composites":"0Hr","@stdlib/math/iter/sequences/continued-fraction":"0Hs","@stdlib/math/iter/sequences/cubes":"0Ht","@stdlib/math/iter/sequences/even-integers":"0Hu","@stdlib/math/iter/sequences/factorials":"0Hv","@stdlib/math/iter/sequences/fibonacci":"0Hw","@stdlib/math/iter/sequences/fifth-powers":"0Hx","@stdlib/math/iter/sequences/fourth-powers":"0Hy","@stdlib/math/iter/sequences/integers":"0Hz","@stdlib/math/iter/sequences/lucas":"0I0","@stdlib/math/iter/sequences/negafibonacci":"0I1","@stdlib/math/iter/sequences/negalucas":"0I2","@stdlib/math/iter/sequences/negative-even-integers":"0I3","@stdlib/math/iter/sequences/negative-integers":"0I4","@stdlib/math/iter/sequences/negative-odd-integers":"0I5","@stdlib/math/iter/sequences/nonfibonacci":"0I6","@stdlib/math/iter/sequences/nonnegative-even-integers":"0I7","@stdlib/math/iter/sequences/nonnegative-integers":"0I8","@stdlib/math/iter/sequences/nonpositive-even-integers":"0I9","@stdlib/math/iter/sequences/nonpositive-integers":"0IA","@stdlib/math/iter/sequences/nonsquares":"0IB","@stdlib/math/iter/sequences/odd-integers":"0IC","@stdlib/math/iter/sequences":"0ID","@stdlib/math/iter/sequences/positive-even-integers":"0IE","@stdlib/math/iter/sequences/positive-integers":"0IF","@stdlib/math/iter/sequences/positive-odd-integers":"0IG","@stdlib/math/iter/sequences/primes":"0IH","@stdlib/math/iter/sequences/squared-triangular":"0II","@stdlib/math/iter/sequences/squares":"0IJ","@stdlib/math/iter/sequences/triangular":"0IK","@stdlib/math/iter/special/abs":"0IL","@stdlib/math/iter/special/abs2":"0IM","@stdlib/math/iter/special/acos":"0IN","@stdlib/math/iter/special/acosh":"0IO","@stdlib/math/iter/special/acot":"0IP","@stdlib/math/iter/special/acoth":"0IQ","@stdlib/math/iter/special/acovercos":"0IR","@stdlib/math/iter/special/acoversin":"0IS","@stdlib/math/iter/special/ahavercos":"0IT","@stdlib/math/iter/special/ahaversin":"0IU","@stdlib/math/iter/special/asin":"0IV","@stdlib/math/iter/special/asinh":"0IW","@stdlib/math/iter/special/atan":"0IX","@stdlib/math/iter/special/atan2":"0IY","@stdlib/math/iter/special/atanh":"0IZ","@stdlib/math/iter/special/avercos":"0Ia","@stdlib/math/iter/special/aversin":"0Ib","@stdlib/math/iter/special/besselj0":"0Ic","@stdlib/math/iter/special/besselj1":"0Id","@stdlib/math/iter/special/bessely0":"0Ie","@stdlib/math/iter/special/bessely1":"0If","@stdlib/math/iter/special/beta":"0Ig","@stdlib/math/iter/special/betaln":"0Ih","@stdlib/math/iter/special/binet":"0Ii","@stdlib/math/iter/special/cbrt":"0Ij","@stdlib/math/iter/special/ceil":"0Ik","@stdlib/math/iter/special/ceil10":"0Il","@stdlib/math/iter/special/ceil2":"0Im","@stdlib/math/iter/special/cos":"0In","@stdlib/math/iter/special/cosh":"0Io","@stdlib/math/iter/special/cosm1":"0Ip","@stdlib/math/iter/special/cospi":"0Iq","@stdlib/math/iter/special/covercos":"0Ir","@stdlib/math/iter/special/coversin":"0Is","@stdlib/math/iter/special/deg2rad":"0It","@stdlib/math/iter/special/digamma":"0Iu","@stdlib/math/iter/special/dirac-delta":"0Iv","@stdlib/math/iter/special/dirichlet-eta":"0Iw","@stdlib/math/iter/special/ellipe":"0Ix","@stdlib/math/iter/special/ellipk":"0Iy","@stdlib/math/iter/special/erf":"0Iz","@stdlib/math/iter/special/erfc":"0J0","@stdlib/math/iter/special/erfcinv":"0J1","@stdlib/math/iter/special/erfinv":"0J2","@stdlib/math/iter/special/exp":"0J3","@stdlib/math/iter/special/exp10":"0J4","@stdlib/math/iter/special/exp2":"0J5","@stdlib/math/iter/special/expit":"0J6","@stdlib/math/iter/special/expm1":"0J7","@stdlib/math/iter/special/expm1rel":"0J8","@stdlib/math/iter/special/factorial":"0J9","@stdlib/math/iter/special/factorialln":"0JA","@stdlib/math/iter/special/floor":"0JB","@stdlib/math/iter/special/floor10":"0JC","@stdlib/math/iter/special/floor2":"0JD","@stdlib/math/iter/special/fresnelc":"0JE","@stdlib/math/iter/special/fresnels":"0JF","@stdlib/math/iter/special/gamma":"0JG","@stdlib/math/iter/special/gamma1pm1":"0JH","@stdlib/math/iter/special/gammaln":"0JI","@stdlib/math/iter/special/hacovercos":"0JJ","@stdlib/math/iter/special/hacoversin":"0JK","@stdlib/math/iter/special/havercos":"0JL","@stdlib/math/iter/special/haversin":"0JM","@stdlib/math/iter/special/inv":"0JN","@stdlib/math/iter/special/ln":"0JO","@stdlib/math/iter/special/log":"0JP","@stdlib/math/iter/special/log10":"0JQ","@stdlib/math/iter/special/log1mexp":"0JR","@stdlib/math/iter/special/log1p":"0JS","@stdlib/math/iter/special/log1pexp":"0JT","@stdlib/math/iter/special/log2":"0JU","@stdlib/math/iter/special/logit":"0JV","@stdlib/math/iter/special":"0JW","@stdlib/math/iter/special/pow":"0JX","@stdlib/math/iter/special/rad2deg":"0JY","@stdlib/math/iter/special/ramp":"0JZ","@stdlib/math/iter/special/riemann-zeta":"0Ja","@stdlib/math/iter/special/round":"0Jb","@stdlib/math/iter/special/round10":"0Jc","@stdlib/math/iter/special/round2":"0Jd","@stdlib/math/iter/special/rsqrt":"0Je","@stdlib/math/iter/special/signum":"0Jf","@stdlib/math/iter/special/sin":"0Jg","@stdlib/math/iter/special/sinc":"0Jh","@stdlib/math/iter/special/sinh":"0Ji","@stdlib/math/iter/special/sinpi":"0Jj","@stdlib/math/iter/special/spence":"0Jk","@stdlib/math/iter/special/sqrt":"0Jl","@stdlib/math/iter/special/sqrt1pm1":"0Jm","@stdlib/math/iter/special/tan":"0Jn","@stdlib/math/iter/special/tanh":"0Jo","@stdlib/math/iter/special/trigamma":"0Jp","@stdlib/math/iter/special/trunc":"0Jq","@stdlib/math/iter/special/trunc10":"0Jr","@stdlib/math/iter/special/trunc2":"0Js","@stdlib/math/iter/special/vercos":"0Jt","@stdlib/math/iter/special/versin":"0Ju","@stdlib/math/iter/tools/map":"0Jv","@stdlib/math/iter/tools/map2":"0Jw","@stdlib/math/iter/tools/map3":"0Jx","@stdlib/math/iter/tools":"0Jy","@stdlib/math/iter/utils/continued-fraction":"0Jz","@stdlib/math/iter/utils":"0K0","@stdlib/math":"0K1","@stdlib/math/special/abs":"0K2","@stdlib/math/special":"0K3","@stdlib/math/strided/ops/add":"0K4","@stdlib/math/strided/ops/mul":"0K5","@stdlib/math/strided/ops":"0K6","@stdlib/math/strided/ops/sub":"0K7","@stdlib/math/strided":"0K8","@stdlib/math/strided/special/abs-by":"0K9","@stdlib/math/strided/special/abs":"0KA","@stdlib/math/strided/special/abs2-by":"0KB","@stdlib/math/strided/special/abs2":"0KC","@stdlib/math/strided/special/acos-by":"0KD","@stdlib/math/strided/special/acosh-by":"0KE","@stdlib/math/strided/special/acot-by":"0KF","@stdlib/math/strided/special/acoth-by":"0KG","@stdlib/math/strided/special/acovercos-by":"0KH","@stdlib/math/strided/special/acoversin-by":"0KI","@stdlib/math/strided/special/ahavercos-by":"0KJ","@stdlib/math/strided/special/ahaversin-by":"0KK","@stdlib/math/strided/special/asin-by":"0KL","@stdlib/math/strided/special/asinh-by":"0KM","@stdlib/math/strided/special/atan-by":"0KN","@stdlib/math/strided/special/atanh-by":"0KO","@stdlib/math/strided/special/avercos-by":"0KP","@stdlib/math/strided/special/aversin-by":"0KQ","@stdlib/math/strided/special/besselj0-by":"0KR","@stdlib/math/strided/special/besselj1-by":"0KS","@stdlib/math/strided/special/bessely0-by":"0KT","@stdlib/math/strided/special/bessely1-by":"0KU","@stdlib/math/strided/special/binet-by":"0KV","@stdlib/math/strided/special/cbrt":"0KW","@stdlib/math/strided/special/ceil":"0KX","@stdlib/math/strided/special/dabs":"0KY","@stdlib/math/strided/special/dabs2":"0KZ","@stdlib/math/strided/special/dcbrt":"0Ka","@stdlib/math/strided/special/dceil":"0Kb","@stdlib/math/strided/special/ddeg2rad":"0Kc","@stdlib/math/strided/special/deg2rad":"0Kd","@stdlib/math/strided/special/dfloor":"0Ke","@stdlib/math/strided/special/dinv":"0Kf","@stdlib/math/strided/special/dmskabs":"0Kg","@stdlib/math/strided/special/dmskabs2":"0Kh","@stdlib/math/strided/special/dmskcbrt":"0Ki","@stdlib/math/strided/special/dmskceil":"0Kj","@stdlib/math/strided/special/dmskdeg2rad":"0Kk","@stdlib/math/strided/special/dmskfloor":"0Kl","@stdlib/math/strided/special/dmskinv":"0Km","@stdlib/math/strided/special/dmskramp":"0Kn","@stdlib/math/strided/special/dmskrsqrt":"0Ko","@stdlib/math/strided/special/dmsksqrt":"0Kp","@stdlib/math/strided/special/dmsktrunc":"0Kq","@stdlib/math/strided/special/dramp":"0Kr","@stdlib/math/strided/special/drsqrt":"0Ks","@stdlib/math/strided/special/dsqrt":"0Kt","@stdlib/math/strided/special/dtrunc":"0Ku","@stdlib/math/strided/special/floor":"0Kv","@stdlib/math/strided/special/inv":"0Kw","@stdlib/math/strided/special":"0Kx","@stdlib/math/strided/special/ramp":"0Ky","@stdlib/math/strided/special/rsqrt":"0Kz","@stdlib/math/strided/special/sabs":"0L0","@stdlib/math/strided/special/sabs2":"0L1","@stdlib/math/strided/special/scbrt":"0L2","@stdlib/math/strided/special/sceil":"0L3","@stdlib/math/strided/special/sdeg2rad":"0L4","@stdlib/math/strided/special/sfloor":"0L5","@stdlib/math/strided/special/sinv":"0L6","@stdlib/math/strided/special/smskabs":"0L7","@stdlib/math/strided/special/smskabs2":"0L8","@stdlib/math/strided/special/smskcbrt":"0L9","@stdlib/math/strided/special/smskceil":"0LA","@stdlib/math/strided/special/smskdeg2rad":"0LB","@stdlib/math/strided/special/smskfloor":"0LC","@stdlib/math/strided/special/smskinv":"0LD","@stdlib/math/strided/special/smskramp":"0LE","@stdlib/math/strided/special/smskrsqrt":"0LF","@stdlib/math/strided/special/smsksqrt":"0LG","@stdlib/math/strided/special/smsktrunc":"0LH","@stdlib/math/strided/special/sqrt":"0LI","@stdlib/math/strided/special/sramp":"0LJ","@stdlib/math/strided/special/srsqrt":"0LK","@stdlib/math/strided/special/ssqrt":"0LL","@stdlib/math/strided/special/strunc":"0LM","@stdlib/math/strided/special/trunc":"0LN","@stdlib/math/tools":"0LO","@stdlib/math/tools/unary":"0LP","@stdlib/ml/incr/binary-classification":"0LQ","@stdlib/ml/incr/kmeans":"0LR","@stdlib/ml/incr":"0LS","@stdlib/ml/incr/sgd-regression":"0LT","@stdlib/ml":"0LU","@stdlib/namespace/alias2pkg":"0LV","@stdlib/namespace/alias2related":"0LW","@stdlib/namespace/alias2standalone":"0LX","@stdlib/namespace/aliases":"0LY","@stdlib/namespace":"0LZ","@stdlib/namespace/pkg2alias":"0La","@stdlib/namespace/pkg2related":"0Lb","@stdlib/namespace/pkg2standalone":"0Lc","@stdlib/namespace/standalone2pkg":"0Ld","@stdlib/ndarray/array":"0Le","@stdlib/ndarray/base/assert/is-allowed-data-type-cast":"0Lf","@stdlib/ndarray/base/assert/is-buffer-length-compatible-shape":"0Lg","@stdlib/ndarray/base/assert/is-buffer-length-compatible":"0Lh","@stdlib/ndarray/base/assert/is-casting-mode":"0Li","@stdlib/ndarray/base/assert/is-column-major-contiguous":"0Lj","@stdlib/ndarray/base/assert/is-column-major":"0Lk","@stdlib/ndarray/base/assert/is-contiguous":"0Ll","@stdlib/ndarray/base/assert/is-data-type":"0Lm","@stdlib/ndarray/base/assert/is-index-mode":"0Ln","@stdlib/ndarray/base/assert/is-order":"0Lo","@stdlib/ndarray/base/assert/is-read-only":"0Lp","@stdlib/ndarray/base/assert/is-row-major-contiguous":"0Lq","@stdlib/ndarray/base/assert/is-row-major":"0Lr","@stdlib/ndarray/base/assert/is-safe-data-type-cast":"0Ls","@stdlib/ndarray/base/assert/is-same-kind-data-type-cast":"0Lt","@stdlib/ndarray/base/assert/is-single-segment-compatible":"0Lu","@stdlib/ndarray/base/assert":"0Lv","@stdlib/ndarray/base/bind2vind":"0Lw","@stdlib/ndarray/base/broadcast-array":"0Lx","@stdlib/ndarray/base/broadcast-shapes":"0Ly","@stdlib/ndarray/base/buffer-ctors":"0Lz","@stdlib/ndarray/base/buffer-dtype-enum":"0M0","@stdlib/ndarray/base/buffer-dtype":"0M1","@stdlib/ndarray/base/buffer":"0M2","@stdlib/ndarray/base/bytes-per-element":"0M3","@stdlib/ndarray/base/char2dtype":"0M4","@stdlib/ndarray/base/clamp-index":"0M5","@stdlib/ndarray/base/ctor":"0M6","@stdlib/ndarray/base/dtype-char":"0M7","@stdlib/ndarray/base/dtype-desc":"0M8","@stdlib/ndarray/base/dtype-enum2str":"0M9","@stdlib/ndarray/base/dtype-resolve-enum":"0MA","@stdlib/ndarray/base/dtype-resolve-str":"0MB","@stdlib/ndarray/base/dtype-str2enum":"0MC","@stdlib/ndarray/base/dtype2c":"0MD","@stdlib/ndarray/base/dtypes2signatures":"0ME","@stdlib/ndarray/base/expand-dimensions":"0MF","@stdlib/ndarray/base/from-scalar":"0MG","@stdlib/ndarray/base/function-object":"0MH","@stdlib/ndarray/base/ind":"0MI","@stdlib/ndarray/base/ind2sub":"0MJ","@stdlib/ndarray/base/iteration-order":"0MK","@stdlib/ndarray/base/max-view-buffer-index":"0ML","@stdlib/ndarray/base/maybe-broadcast-array":"0MM","@stdlib/ndarray/base/meta-data-props":"0MN","@stdlib/ndarray/base/min-view-buffer-index":"0MO","@stdlib/ndarray/base/minmax-view-buffer-index":"0MP","@stdlib/ndarray/base/napi/addon-arguments":"0MQ","@stdlib/ndarray/base/napi/dtype-string-to-dtype":"0MR","@stdlib/ndarray/base/napi":"0MS","@stdlib/ndarray/base/napi/typedarray-type-to-dtype":"0MT","@stdlib/ndarray/base/napi/unary":"0MU","@stdlib/ndarray/base/ndarraylike2object":"0MV","@stdlib/ndarray/base/nonsingleton-dimensions":"0MW","@stdlib/ndarray/base/numel":"0MX","@stdlib/ndarray/base":"0MY","@stdlib/ndarray/base/prepend-singleton-dimensions":"0MZ","@stdlib/ndarray/base/remove-singleton-dimensions":"0Ma","@stdlib/ndarray/base/serialize-meta-data":"0Mb","@stdlib/ndarray/base/shape2strides":"0Mc","@stdlib/ndarray/base/singleton-dimensions":"0Md","@stdlib/ndarray/base/strides2offset":"0Me","@stdlib/ndarray/base/strides2order":"0Mf","@stdlib/ndarray/base/sub2ind":"0Mg","@stdlib/ndarray/base/to-array":"0Mh","@stdlib/ndarray/base/transpose":"0Mi","@stdlib/ndarray/base/unary":"0Mj","@stdlib/ndarray/base/vind2bind":"0Mk","@stdlib/ndarray/base/wrap-index":"0Ml","@stdlib/ndarray/base/zeros-like":"0Mm","@stdlib/ndarray/base/zeros":"0Mn","@stdlib/ndarray/casting-modes":"0Mo","@stdlib/ndarray/ctor":"0Mp","@stdlib/ndarray/dispatch":"0Mq","@stdlib/ndarray/dtypes":"0Mr","@stdlib/ndarray/from-scalar":"0Ms","@stdlib/ndarray/ind2sub":"0Mt","@stdlib/ndarray/index-modes":"0Mu","@stdlib/ndarray/min-dtype":"0Mv","@stdlib/ndarray/next-dtype":"0Mw","@stdlib/ndarray/orders":"0Mx","@stdlib/ndarray":"0My","@stdlib/ndarray/promotion-rules":"0Mz","@stdlib/ndarray/safe-casts":"0N0","@stdlib/ndarray/same-kind-casts":"0N1","@stdlib/ndarray/sub2ind":"0N2","@stdlib/ndarray/zeros-like":"0N3","@stdlib/ndarray/zeros":"0N4","@stdlib/net/disposable-http-server":"0N5","@stdlib/net/http-server":"0N6","@stdlib/net":"0N7","@stdlib/net/simple-http-server":"0N8","@stdlib/nlp/expand-contractions":"0N9","@stdlib/nlp/lda":"0NA","@stdlib/nlp":"0NB","@stdlib/nlp/porter-stemmer":"0NC","@stdlib/nlp/tokenize":"0ND","@stdlib/number/ctor":"0NE","@stdlib/number/float32/base/exponent":"0NF","@stdlib/number/float32/base/from-binary-string":"0NG","@stdlib/number/float32/base/from-word":"0NH","@stdlib/number/float32/base/normalize":"0NI","@stdlib/number/float32/base":"0NJ","@stdlib/number/float32/base/signbit":"0NK","@stdlib/number/float32/base/significand":"0NL","@stdlib/number/float32/base/to-binary-string":"0NM","@stdlib/number/float32/base/to-int32":"0NN","@stdlib/number/float32/base/to-uint32":"0NO","@stdlib/number/float32/base/to-word":"0NP","@stdlib/number/float32":"0NQ","@stdlib/number/float64/base/exponent":"0NR","@stdlib/number/float64/base/from-binary-string":"0NS","@stdlib/number/float64/base/from-int64-bytes":"0NT","@stdlib/number/float64/base/from-words":"0NU","@stdlib/number/float64/base/get-high-word":"0NV","@stdlib/number/float64/base/get-low-word":"0NW","@stdlib/number/float64/base/normalize":"0NX","@stdlib/number/float64/base":"0NY","@stdlib/number/float64/base/set-high-word":"0NZ","@stdlib/number/float64/base/set-low-word":"0Na","@stdlib/number/float64/base/signbit":"0Nb","@stdlib/number/float64/base/to-binary-string":"0Nc","@stdlib/number/float64/base/to-float32":"0Nd","@stdlib/number/float64/base/to-int32":"0Ne","@stdlib/number/float64/base/to-int64-bytes":"0Nf","@stdlib/number/float64/base/to-uint32":"0Ng","@stdlib/number/float64/base/to-words":"0Nh","@stdlib/number/float64":"0Ni","@stdlib/number/int32/base":"0Nj","@stdlib/number/int32/base/to-uint32":"0Nk","@stdlib/number/int32":"0Nl","@stdlib/number":"0Nm","@stdlib/number/uint16/base/from-binary-string":"0Nn","@stdlib/number/uint16/base":"0No","@stdlib/number/uint16/base/to-binary-string":"0Np","@stdlib/number/uint16":"0Nq","@stdlib/number/uint32/base/from-binary-string":"0Nr","@stdlib/number/uint32/base":"0Ns","@stdlib/number/uint32/base/rotl":"0Nt","@stdlib/number/uint32/base/rotr":"0Nu","@stdlib/number/uint32/base/to-binary-string":"0Nv","@stdlib/number/uint32/base/to-int32":"0Nw","@stdlib/number/uint32":"0Nx","@stdlib/number/uint8/base/from-binary-string":"0Ny","@stdlib/number/uint8/base":"0Nz","@stdlib/number/uint8/base/to-binary-string":"0O0","@stdlib/number/uint8":"0O1","@stdlib/os/arch":"0O2","@stdlib/os/byte-order":"0O3","@stdlib/os/configdir":"0O4","@stdlib/os/float-word-order":"0O5","@stdlib/os/homedir":"0O6","@stdlib/os/num-cpus":"0O7","@stdlib/os":"0O8","@stdlib/os/platform":"0O9","@stdlib/os/tmpdir":"0OA","@stdlib/plot/base/ctor":"0OB","@stdlib/plot/components/svg/annotations":"0OC","@stdlib/plot/components/svg/axis":"0OD","@stdlib/plot/components/svg/background":"0OE","@stdlib/plot/components/svg/canvas":"0OF","@stdlib/plot/components/svg/clip-path":"0OG","@stdlib/plot/components/svg/defs":"0OH","@stdlib/plot/components/svg/graph":"0OI","@stdlib/plot/components/svg/marks":"0OJ","@stdlib/plot/components/svg/path":"0OK","@stdlib/plot/components/svg/rug":"0OL","@stdlib/plot/components/svg/symbols":"0OM","@stdlib/plot/components/svg/title":"0ON","@stdlib/plot/ctor":"0OO","@stdlib/plot":"0OP","@stdlib/plot/sparklines/base/ctor":"0OQ","@stdlib/plot/sparklines/base":"0OR","@stdlib/plot/sparklines":"0OS","@stdlib/plot/sparklines/unicode/column":"0OT","@stdlib/plot/sparklines/unicode/line":"0OU","@stdlib/plot/sparklines/unicode":"0OV","@stdlib/plot/sparklines/unicode/tristate":"0OW","@stdlib/plot/sparklines/unicode/up-down":"0OX","@stdlib/plot/sparklines/unicode/win-loss":"0OY","@stdlib/plot/unicode/stemleaf":"0OZ","@stdlib/process/argv":"0Oa","@stdlib/process/chdir":"0Ob","@stdlib/process/cwd":"0Oc","@stdlib/process/env":"0Od","@stdlib/process/exec-path":"0Oe","@stdlib/process/getegid":"0Of","@stdlib/process/geteuid":"0Og","@stdlib/process/getgid":"0Oh","@stdlib/process/getuid":"0Oi","@stdlib/process/node-version":"0Oj","@stdlib/process":"0Ok","@stdlib/process/read-stdin":"0Ol","@stdlib/process/umask":"0Om","@stdlib/proxy/ctor":"0On","@stdlib/proxy":"0Oo","@stdlib/random/base/arcsine":"0Op","@stdlib/random/base/bernoulli":"0Oq","@stdlib/random/base/beta":"0Or","@stdlib/random/base/betaprime":"0Os","@stdlib/random/base/binomial":"0Ot","@stdlib/random/base/box-muller":"0Ou","@stdlib/random/base/cauchy":"0Ov","@stdlib/random/base/chi":"0Ow","@stdlib/random/base/chisquare":"0Ox","@stdlib/random/base/cosine":"0Oy","@stdlib/random/base/discrete-uniform":"0Oz","@stdlib/random/base/erlang":"0P0","@stdlib/random/base/exponential":"0P1","@stdlib/random/base/f":"0P2","@stdlib/random/base/frechet":"0P3","@stdlib/random/base/gamma":"0P4","@stdlib/random/base/geometric":"0P5","@stdlib/random/base/gumbel":"0P6","@stdlib/random/base/hypergeometric":"0P7","@stdlib/random/base/improved-ziggurat":"0P8","@stdlib/random/base/invgamma":"0P9","@stdlib/random/base/kumaraswamy":"0PA","@stdlib/random/base/laplace":"0PB","@stdlib/random/base/levy":"0PC","@stdlib/random/base/logistic":"0PD","@stdlib/random/base/lognormal":"0PE","@stdlib/random/base/minstd-shuffle":"0PF","@stdlib/random/base/minstd":"0PG","@stdlib/random/base/mt19937":"0PH","@stdlib/random/base/negative-binomial":"0PI","@stdlib/random/base/normal":"0PJ","@stdlib/random/base":"0PK","@stdlib/random/base/pareto-type1":"0PL","@stdlib/random/base/poisson":"0PM","@stdlib/random/base/randi":"0PN","@stdlib/random/base/randn":"0PO","@stdlib/random/base/randu":"0PP","@stdlib/random/base/rayleigh":"0PQ","@stdlib/random/base/reviver":"0PR","@stdlib/random/base/t":"0PS","@stdlib/random/base/triangular":"0PT","@stdlib/random/base/uniform":"0PU","@stdlib/random/base/weibull":"0PV","@stdlib/random/iter/arcsine":"0PW","@stdlib/random/iter/bernoulli":"0PX","@stdlib/random/iter/beta":"0PY","@stdlib/random/iter/betaprime":"0PZ","@stdlib/random/iter/binomial":"0Pa","@stdlib/random/iter/box-muller":"0Pb","@stdlib/random/iter/cauchy":"0Pc","@stdlib/random/iter/chi":"0Pd","@stdlib/random/iter/chisquare":"0Pe","@stdlib/random/iter/cosine":"0Pf","@stdlib/random/iter/discrete-uniform":"0Pg","@stdlib/random/iter/erlang":"0Ph","@stdlib/random/iter/exponential":"0Pi","@stdlib/random/iter/f":"0Pj","@stdlib/random/iter/frechet":"0Pk","@stdlib/random/iter/gamma":"0Pl","@stdlib/random/iter/geometric":"0Pm","@stdlib/random/iter/gumbel":"0Pn","@stdlib/random/iter/hypergeometric":"0Po","@stdlib/random/iter/improved-ziggurat":"0Pp","@stdlib/random/iter/invgamma":"0Pq","@stdlib/random/iter/kumaraswamy":"0Pr","@stdlib/random/iter/laplace":"0Ps","@stdlib/random/iter/levy":"0Pt","@stdlib/random/iter/logistic":"0Pu","@stdlib/random/iter/lognormal":"0Pv","@stdlib/random/iter/minstd-shuffle":"0Pw","@stdlib/random/iter/minstd":"0Px","@stdlib/random/iter/mt19937":"0Py","@stdlib/random/iter/negative-binomial":"0Pz","@stdlib/random/iter/normal":"0Q0","@stdlib/random/iter":"0Q1","@stdlib/random/iter/pareto-type1":"0Q2","@stdlib/random/iter/poisson":"0Q3","@stdlib/random/iter/randi":"0Q4","@stdlib/random/iter/randn":"0Q5","@stdlib/random/iter/randu":"0Q6","@stdlib/random/iter/rayleigh":"0Q7","@stdlib/random/iter/t":"0Q8","@stdlib/random/iter/triangular":"0Q9","@stdlib/random/iter/uniform":"0QA","@stdlib/random/iter/weibull":"0QB","@stdlib/random":"0QC","@stdlib/random/sample":"0QD","@stdlib/random/shuffle":"0QE","@stdlib/random/streams/arcsine":"0QF","@stdlib/random/streams/bernoulli":"0QG","@stdlib/random/streams/beta":"0QH","@stdlib/random/streams/betaprime":"0QI","@stdlib/random/streams/binomial":"0QJ","@stdlib/random/streams/box-muller":"0QK","@stdlib/random/streams/cauchy":"0QL","@stdlib/random/streams/chi":"0QM","@stdlib/random/streams/chisquare":"0QN","@stdlib/random/streams/cosine":"0QO","@stdlib/random/streams/discrete-uniform":"0QP","@stdlib/random/streams/erlang":"0QQ","@stdlib/random/streams/exponential":"0QR","@stdlib/random/streams/f":"0QS","@stdlib/random/streams/frechet":"0QT","@stdlib/random/streams/gamma":"0QU","@stdlib/random/streams/geometric":"0QV","@stdlib/random/streams/gumbel":"0QW","@stdlib/random/streams/hypergeometric":"0QX","@stdlib/random/streams/improved-ziggurat":"0QY","@stdlib/random/streams/invgamma":"0QZ","@stdlib/random/streams/kumaraswamy":"0Qa","@stdlib/random/streams/laplace":"0Qb","@stdlib/random/streams/levy":"0Qc","@stdlib/random/streams/logistic":"0Qd","@stdlib/random/streams/lognormal":"0Qe","@stdlib/random/streams/minstd-shuffle":"0Qf","@stdlib/random/streams/minstd":"0Qg","@stdlib/random/streams/mt19937":"0Qh","@stdlib/random/streams/negative-binomial":"0Qi","@stdlib/random/streams/normal":"0Qj","@stdlib/random/streams":"0Qk","@stdlib/random/streams/pareto-type1":"0Ql","@stdlib/random/streams/poisson":"0Qm","@stdlib/random/streams/randi":"0Qn","@stdlib/random/streams/randn":"0Qo","@stdlib/random/streams/randu":"0Qp","@stdlib/random/streams/rayleigh":"0Qq","@stdlib/random/streams/t":"0Qr","@stdlib/random/streams/triangular":"0Qs","@stdlib/random/streams/uniform":"0Qt","@stdlib/random/streams/weibull":"0Qu","@stdlib/regexp/basename-posix":"0Qv","@stdlib/regexp/basename-windows":"0Qw","@stdlib/regexp/basename":"0Qx","@stdlib/regexp/color-hexadecimal":"0Qy","@stdlib/regexp/decimal-number":"0Qz","@stdlib/regexp/dirname-posix":"0R0","@stdlib/regexp/dirname-windows":"0R1","@stdlib/regexp/dirname":"0R2","@stdlib/regexp/eol":"0R3","@stdlib/regexp/extended-length-path":"0R4","@stdlib/regexp/extname-posix":"0R5","@stdlib/regexp/extname-windows":"0R6","@stdlib/regexp/extname":"0R7","@stdlib/regexp/filename-posix":"0R8","@stdlib/regexp/filename-windows":"0R9","@stdlib/regexp/filename":"0RA","@stdlib/regexp/function-name":"0RB","@stdlib/regexp/native-function":"0RC","@stdlib/regexp":"0RD","@stdlib/regexp/regexp":"0RE","@stdlib/regexp/unc-path":"0RF","@stdlib/regexp/utf16-surrogate-pair":"0RG","@stdlib/regexp/utf16-unpaired-surrogate":"0RH","@stdlib/regexp/whitespace":"0RI","@stdlib/repl/code-blocks":"0RJ","@stdlib/repl/help":"0RK","@stdlib/repl/info":"0RL","@stdlib/repl":"0RM","@stdlib/repl/presentation":"0RN","@stdlib/repl/server":"0RO","@stdlib/repl/signature":"0RP","@stdlib/repl/typed-signature":"0RQ","@stdlib/simulate/iter/awgn":"0RR","@stdlib/simulate/iter/awln":"0RS","@stdlib/simulate/iter/awun":"0RT","@stdlib/simulate/iter/bartlett-hann-pulse":"0RU","@stdlib/simulate/iter/bartlett-pulse":"0RV","@stdlib/simulate/iter/cosine-wave":"0RW","@stdlib/simulate/iter/dirac-comb":"0RX","@stdlib/simulate/iter/flat-top-pulse":"0RY","@stdlib/simulate/iter/hann-pulse":"0RZ","@stdlib/simulate/iter/lanczos-pulse":"0Ra","@stdlib/simulate/iter":"0Rb","@stdlib/simulate/iter/periodic-sinc":"0Rc","@stdlib/simulate/iter/pulse":"0Rd","@stdlib/simulate/iter/sawtooth-wave":"0Re","@stdlib/simulate/iter/sine-wave":"0Rf","@stdlib/simulate/iter/square-wave":"0Rg","@stdlib/simulate/iter/triangle-wave":"0Rh","@stdlib/simulate":"0Ri","@stdlib/stats/anova1":"0Rj","@stdlib/stats/bartlett-test":"0Rk","@stdlib/stats/base/cumax":"0Rl","@stdlib/stats/base/cumaxabs":"0Rm","@stdlib/stats/base/cumin":"0Rn","@stdlib/stats/base/cuminabs":"0Ro","@stdlib/stats/base/dcumax":"0Rp","@stdlib/stats/base/dcumaxabs":"0Rq","@stdlib/stats/base/dcumin":"0Rr","@stdlib/stats/base/dcuminabs":"0Rs","@stdlib/stats/base/dists/arcsine/cdf":"0Rt","@stdlib/stats/base/dists/arcsine/ctor":"0Ru","@stdlib/stats/base/dists/arcsine/entropy":"0Rv","@stdlib/stats/base/dists/arcsine/kurtosis":"0Rw","@stdlib/stats/base/dists/arcsine/logcdf":"0Rx","@stdlib/stats/base/dists/arcsine/logpdf":"0Ry","@stdlib/stats/base/dists/arcsine/mean":"0Rz","@stdlib/stats/base/dists/arcsine/median":"0S0","@stdlib/stats/base/dists/arcsine/mode":"0S1","@stdlib/stats/base/dists/arcsine":"0S2","@stdlib/stats/base/dists/arcsine/pdf":"0S3","@stdlib/stats/base/dists/arcsine/quantile":"0S4","@stdlib/stats/base/dists/arcsine/skewness":"0S5","@stdlib/stats/base/dists/arcsine/stdev":"0S6","@stdlib/stats/base/dists/arcsine/variance":"0S7","@stdlib/stats/base/dists/bernoulli/cdf":"0S8","@stdlib/stats/base/dists/bernoulli/ctor":"0S9","@stdlib/stats/base/dists/bernoulli/entropy":"0SA","@stdlib/stats/base/dists/bernoulli/kurtosis":"0SB","@stdlib/stats/base/dists/bernoulli/mean":"0SC","@stdlib/stats/base/dists/bernoulli/median":"0SD","@stdlib/stats/base/dists/bernoulli/mgf":"0SE","@stdlib/stats/base/dists/bernoulli/mode":"0SF","@stdlib/stats/base/dists/bernoulli":"0SG","@stdlib/stats/base/dists/bernoulli/pmf":"0SH","@stdlib/stats/base/dists/bernoulli/quantile":"0SI","@stdlib/stats/base/dists/bernoulli/skewness":"0SJ","@stdlib/stats/base/dists/bernoulli/stdev":"0SK","@stdlib/stats/base/dists/bernoulli/variance":"0SL","@stdlib/stats/base/dists/beta/cdf":"0SM","@stdlib/stats/base/dists/beta/ctor":"0SN","@stdlib/stats/base/dists/beta/entropy":"0SO","@stdlib/stats/base/dists/beta/kurtosis":"0SP","@stdlib/stats/base/dists/beta/logcdf":"0SQ","@stdlib/stats/base/dists/beta/logpdf":"0SR","@stdlib/stats/base/dists/beta/mean":"0SS","@stdlib/stats/base/dists/beta/median":"0ST","@stdlib/stats/base/dists/beta/mgf":"0SU","@stdlib/stats/base/dists/beta/mode":"0SV","@stdlib/stats/base/dists/beta":"0SW","@stdlib/stats/base/dists/beta/pdf":"0SX","@stdlib/stats/base/dists/beta/quantile":"0SY","@stdlib/stats/base/dists/beta/skewness":"0SZ","@stdlib/stats/base/dists/beta/stdev":"0Sa","@stdlib/stats/base/dists/beta/variance":"0Sb","@stdlib/stats/base/dists/betaprime/cdf":"0Sc","@stdlib/stats/base/dists/betaprime/ctor":"0Sd","@stdlib/stats/base/dists/betaprime/kurtosis":"0Se","@stdlib/stats/base/dists/betaprime/logcdf":"0Sf","@stdlib/stats/base/dists/betaprime/logpdf":"0Sg","@stdlib/stats/base/dists/betaprime/mean":"0Sh","@stdlib/stats/base/dists/betaprime/mode":"0Si","@stdlib/stats/base/dists/betaprime":"0Sj","@stdlib/stats/base/dists/betaprime/pdf":"0Sk","@stdlib/stats/base/dists/betaprime/quantile":"0Sl","@stdlib/stats/base/dists/betaprime/skewness":"0Sm","@stdlib/stats/base/dists/betaprime/stdev":"0Sn","@stdlib/stats/base/dists/betaprime/variance":"0So","@stdlib/stats/base/dists/binomial/cdf":"0Sp","@stdlib/stats/base/dists/binomial/ctor":"0Sq","@stdlib/stats/base/dists/binomial/entropy":"0Sr","@stdlib/stats/base/dists/binomial/kurtosis":"0Ss","@stdlib/stats/base/dists/binomial/logpmf":"0St","@stdlib/stats/base/dists/binomial/mean":"0Su","@stdlib/stats/base/dists/binomial/median":"0Sv","@stdlib/stats/base/dists/binomial/mgf":"0Sw","@stdlib/stats/base/dists/binomial/mode":"0Sx","@stdlib/stats/base/dists/binomial":"0Sy","@stdlib/stats/base/dists/binomial/pmf":"0Sz","@stdlib/stats/base/dists/binomial/quantile":"0T0","@stdlib/stats/base/dists/binomial/skewness":"0T1","@stdlib/stats/base/dists/binomial/stdev":"0T2","@stdlib/stats/base/dists/binomial/variance":"0T3","@stdlib/stats/base/dists/cauchy/cdf":"0T4","@stdlib/stats/base/dists/cauchy/ctor":"0T5","@stdlib/stats/base/dists/cauchy/entropy":"0T6","@stdlib/stats/base/dists/cauchy/logcdf":"0T7","@stdlib/stats/base/dists/cauchy/logpdf":"0T8","@stdlib/stats/base/dists/cauchy/median":"0T9","@stdlib/stats/base/dists/cauchy/mode":"0TA","@stdlib/stats/base/dists/cauchy":"0TB","@stdlib/stats/base/dists/cauchy/pdf":"0TC","@stdlib/stats/base/dists/cauchy/quantile":"0TD","@stdlib/stats/base/dists/chi/cdf":"0TE","@stdlib/stats/base/dists/chi/ctor":"0TF","@stdlib/stats/base/dists/chi/entropy":"0TG","@stdlib/stats/base/dists/chi/kurtosis":"0TH","@stdlib/stats/base/dists/chi/logpdf":"0TI","@stdlib/stats/base/dists/chi/mean":"0TJ","@stdlib/stats/base/dists/chi/mode":"0TK","@stdlib/stats/base/dists/chi":"0TL","@stdlib/stats/base/dists/chi/pdf":"0TM","@stdlib/stats/base/dists/chi/quantile":"0TN","@stdlib/stats/base/dists/chi/skewness":"0TO","@stdlib/stats/base/dists/chi/stdev":"0TP","@stdlib/stats/base/dists/chi/variance":"0TQ","@stdlib/stats/base/dists/chisquare/cdf":"0TR","@stdlib/stats/base/dists/chisquare/ctor":"0TS","@stdlib/stats/base/dists/chisquare/entropy":"0TT","@stdlib/stats/base/dists/chisquare/kurtosis":"0TU","@stdlib/stats/base/dists/chisquare/logpdf":"0TV","@stdlib/stats/base/dists/chisquare/mean":"0TW","@stdlib/stats/base/dists/chisquare/median":"0TX","@stdlib/stats/base/dists/chisquare/mgf":"0TY","@stdlib/stats/base/dists/chisquare/mode":"0TZ","@stdlib/stats/base/dists/chisquare":"0Ta","@stdlib/stats/base/dists/chisquare/pdf":"0Tb","@stdlib/stats/base/dists/chisquare/quantile":"0Tc","@stdlib/stats/base/dists/chisquare/skewness":"0Td","@stdlib/stats/base/dists/chisquare/stdev":"0Te","@stdlib/stats/base/dists/chisquare/variance":"0Tf","@stdlib/stats/base/dists/cosine/cdf":"0Tg","@stdlib/stats/base/dists/cosine/ctor":"0Th","@stdlib/stats/base/dists/cosine/kurtosis":"0Ti","@stdlib/stats/base/dists/cosine/logcdf":"0Tj","@stdlib/stats/base/dists/cosine/logpdf":"0Tk","@stdlib/stats/base/dists/cosine/mean":"0Tl","@stdlib/stats/base/dists/cosine/median":"0Tm","@stdlib/stats/base/dists/cosine/mgf":"0Tn","@stdlib/stats/base/dists/cosine/mode":"0To","@stdlib/stats/base/dists/cosine":"0Tp","@stdlib/stats/base/dists/cosine/pdf":"0Tq","@stdlib/stats/base/dists/cosine/quantile":"0Tr","@stdlib/stats/base/dists/cosine/skewness":"0Ts","@stdlib/stats/base/dists/cosine/stdev":"0Tt","@stdlib/stats/base/dists/cosine/variance":"0Tu","@stdlib/stats/base/dists/degenerate/cdf":"0Tv","@stdlib/stats/base/dists/degenerate/ctor":"0Tw","@stdlib/stats/base/dists/degenerate/entropy":"0Tx","@stdlib/stats/base/dists/degenerate/logcdf":"0Ty","@stdlib/stats/base/dists/degenerate/logpdf":"0Tz","@stdlib/stats/base/dists/degenerate/logpmf":"0U0","@stdlib/stats/base/dists/degenerate/mean":"0U1","@stdlib/stats/base/dists/degenerate/median":"0U2","@stdlib/stats/base/dists/degenerate/mgf":"0U3","@stdlib/stats/base/dists/degenerate/mode":"0U4","@stdlib/stats/base/dists/degenerate":"0U5","@stdlib/stats/base/dists/degenerate/pdf":"0U6","@stdlib/stats/base/dists/degenerate/pmf":"0U7","@stdlib/stats/base/dists/degenerate/quantile":"0U8","@stdlib/stats/base/dists/degenerate/stdev":"0U9","@stdlib/stats/base/dists/degenerate/variance":"0UA","@stdlib/stats/base/dists/discrete-uniform/cdf":"0UB","@stdlib/stats/base/dists/discrete-uniform/ctor":"0UC","@stdlib/stats/base/dists/discrete-uniform/entropy":"0UD","@stdlib/stats/base/dists/discrete-uniform/kurtosis":"0UE","@stdlib/stats/base/dists/discrete-uniform/logcdf":"0UF","@stdlib/stats/base/dists/discrete-uniform/logpmf":"0UG","@stdlib/stats/base/dists/discrete-uniform/mean":"0UH","@stdlib/stats/base/dists/discrete-uniform/median":"0UI","@stdlib/stats/base/dists/discrete-uniform/mgf":"0UJ","@stdlib/stats/base/dists/discrete-uniform":"0UK","@stdlib/stats/base/dists/discrete-uniform/pmf":"0UL","@stdlib/stats/base/dists/discrete-uniform/quantile":"0UM","@stdlib/stats/base/dists/discrete-uniform/skewness":"0UN","@stdlib/stats/base/dists/discrete-uniform/stdev":"0UO","@stdlib/stats/base/dists/discrete-uniform/variance":"0UP","@stdlib/stats/base/dists/erlang/cdf":"0UQ","@stdlib/stats/base/dists/erlang/ctor":"0UR","@stdlib/stats/base/dists/erlang/entropy":"0US","@stdlib/stats/base/dists/erlang/kurtosis":"0UT","@stdlib/stats/base/dists/erlang/logpdf":"0UU","@stdlib/stats/base/dists/erlang/mean":"0UV","@stdlib/stats/base/dists/erlang/mgf":"0UW","@stdlib/stats/base/dists/erlang/mode":"0UX","@stdlib/stats/base/dists/erlang":"0UY","@stdlib/stats/base/dists/erlang/pdf":"0UZ","@stdlib/stats/base/dists/erlang/quantile":"0Ua","@stdlib/stats/base/dists/erlang/skewness":"0Ub","@stdlib/stats/base/dists/erlang/stdev":"0Uc","@stdlib/stats/base/dists/erlang/variance":"0Ud","@stdlib/stats/base/dists/exponential/cdf":"0Ue","@stdlib/stats/base/dists/exponential/ctor":"0Uf","@stdlib/stats/base/dists/exponential/entropy":"0Ug","@stdlib/stats/base/dists/exponential/kurtosis":"0Uh","@stdlib/stats/base/dists/exponential/logcdf":"0Ui","@stdlib/stats/base/dists/exponential/logpdf":"0Uj","@stdlib/stats/base/dists/exponential/mean":"0Uk","@stdlib/stats/base/dists/exponential/median":"0Ul","@stdlib/stats/base/dists/exponential/mgf":"0Um","@stdlib/stats/base/dists/exponential/mode":"0Un","@stdlib/stats/base/dists/exponential":"0Uo","@stdlib/stats/base/dists/exponential/pdf":"0Up","@stdlib/stats/base/dists/exponential/quantile":"0Uq","@stdlib/stats/base/dists/exponential/skewness":"0Ur","@stdlib/stats/base/dists/exponential/stdev":"0Us","@stdlib/stats/base/dists/exponential/variance":"0Ut","@stdlib/stats/base/dists/f/cdf":"0Uu","@stdlib/stats/base/dists/f/ctor":"0Uv","@stdlib/stats/base/dists/f/entropy":"0Uw","@stdlib/stats/base/dists/f/kurtosis":"0Ux","@stdlib/stats/base/dists/f/mean":"0Uy","@stdlib/stats/base/dists/f/mode":"0Uz","@stdlib/stats/base/dists/f":"0V0","@stdlib/stats/base/dists/f/pdf":"0V1","@stdlib/stats/base/dists/f/quantile":"0V2","@stdlib/stats/base/dists/f/skewness":"0V3","@stdlib/stats/base/dists/f/stdev":"0V4","@stdlib/stats/base/dists/f/variance":"0V5","@stdlib/stats/base/dists/frechet/cdf":"0V6","@stdlib/stats/base/dists/frechet/ctor":"0V7","@stdlib/stats/base/dists/frechet/entropy":"0V8","@stdlib/stats/base/dists/frechet/kurtosis":"0V9","@stdlib/stats/base/dists/frechet/logcdf":"0VA","@stdlib/stats/base/dists/frechet/logpdf":"0VB","@stdlib/stats/base/dists/frechet/mean":"0VC","@stdlib/stats/base/dists/frechet/median":"0VD","@stdlib/stats/base/dists/frechet/mode":"0VE","@stdlib/stats/base/dists/frechet":"0VF","@stdlib/stats/base/dists/frechet/pdf":"0VG","@stdlib/stats/base/dists/frechet/quantile":"0VH","@stdlib/stats/base/dists/frechet/skewness":"0VI","@stdlib/stats/base/dists/frechet/stdev":"0VJ","@stdlib/stats/base/dists/frechet/variance":"0VK","@stdlib/stats/base/dists/gamma/cdf":"0VL","@stdlib/stats/base/dists/gamma/ctor":"0VM","@stdlib/stats/base/dists/gamma/entropy":"0VN","@stdlib/stats/base/dists/gamma/kurtosis":"0VO","@stdlib/stats/base/dists/gamma/logcdf":"0VP","@stdlib/stats/base/dists/gamma/logpdf":"0VQ","@stdlib/stats/base/dists/gamma/mean":"0VR","@stdlib/stats/base/dists/gamma/mgf":"0VS","@stdlib/stats/base/dists/gamma/mode":"0VT","@stdlib/stats/base/dists/gamma":"0VU","@stdlib/stats/base/dists/gamma/pdf":"0VV","@stdlib/stats/base/dists/gamma/quantile":"0VW","@stdlib/stats/base/dists/gamma/skewness":"0VX","@stdlib/stats/base/dists/gamma/stdev":"0VY","@stdlib/stats/base/dists/gamma/variance":"0VZ","@stdlib/stats/base/dists/geometric/cdf":"0Va","@stdlib/stats/base/dists/geometric/ctor":"0Vb","@stdlib/stats/base/dists/geometric/entropy":"0Vc","@stdlib/stats/base/dists/geometric/kurtosis":"0Vd","@stdlib/stats/base/dists/geometric/logcdf":"0Ve","@stdlib/stats/base/dists/geometric/logpmf":"0Vf","@stdlib/stats/base/dists/geometric/mean":"0Vg","@stdlib/stats/base/dists/geometric/median":"0Vh","@stdlib/stats/base/dists/geometric/mgf":"0Vi","@stdlib/stats/base/dists/geometric/mode":"0Vj","@stdlib/stats/base/dists/geometric":"0Vk","@stdlib/stats/base/dists/geometric/pmf":"0Vl","@stdlib/stats/base/dists/geometric/quantile":"0Vm","@stdlib/stats/base/dists/geometric/skewness":"0Vn","@stdlib/stats/base/dists/geometric/stdev":"0Vo","@stdlib/stats/base/dists/geometric/variance":"0Vp","@stdlib/stats/base/dists/gumbel/cdf":"0Vq","@stdlib/stats/base/dists/gumbel/ctor":"0Vr","@stdlib/stats/base/dists/gumbel/entropy":"0Vs","@stdlib/stats/base/dists/gumbel/kurtosis":"0Vt","@stdlib/stats/base/dists/gumbel/logcdf":"0Vu","@stdlib/stats/base/dists/gumbel/logpdf":"0Vv","@stdlib/stats/base/dists/gumbel/mean":"0Vw","@stdlib/stats/base/dists/gumbel/median":"0Vx","@stdlib/stats/base/dists/gumbel/mgf":"0Vy","@stdlib/stats/base/dists/gumbel/mode":"0Vz","@stdlib/stats/base/dists/gumbel":"0W0","@stdlib/stats/base/dists/gumbel/pdf":"0W1","@stdlib/stats/base/dists/gumbel/quantile":"0W2","@stdlib/stats/base/dists/gumbel/skewness":"0W3","@stdlib/stats/base/dists/gumbel/stdev":"0W4","@stdlib/stats/base/dists/gumbel/variance":"0W5","@stdlib/stats/base/dists/hypergeometric/cdf":"0W6","@stdlib/stats/base/dists/hypergeometric/ctor":"0W7","@stdlib/stats/base/dists/hypergeometric/kurtosis":"0W8","@stdlib/stats/base/dists/hypergeometric/logpmf":"0W9","@stdlib/stats/base/dists/hypergeometric/mean":"0WA","@stdlib/stats/base/dists/hypergeometric/mode":"0WB","@stdlib/stats/base/dists/hypergeometric":"0WC","@stdlib/stats/base/dists/hypergeometric/pmf":"0WD","@stdlib/stats/base/dists/hypergeometric/quantile":"0WE","@stdlib/stats/base/dists/hypergeometric/skewness":"0WF","@stdlib/stats/base/dists/hypergeometric/stdev":"0WG","@stdlib/stats/base/dists/hypergeometric/variance":"0WH","@stdlib/stats/base/dists/invgamma/cdf":"0WI","@stdlib/stats/base/dists/invgamma/ctor":"0WJ","@stdlib/stats/base/dists/invgamma/entropy":"0WK","@stdlib/stats/base/dists/invgamma/kurtosis":"0WL","@stdlib/stats/base/dists/invgamma/logpdf":"0WM","@stdlib/stats/base/dists/invgamma/mean":"0WN","@stdlib/stats/base/dists/invgamma/mode":"0WO","@stdlib/stats/base/dists/invgamma":"0WP","@stdlib/stats/base/dists/invgamma/pdf":"0WQ","@stdlib/stats/base/dists/invgamma/quantile":"0WR","@stdlib/stats/base/dists/invgamma/skewness":"0WS","@stdlib/stats/base/dists/invgamma/stdev":"0WT","@stdlib/stats/base/dists/invgamma/variance":"0WU","@stdlib/stats/base/dists/kumaraswamy/cdf":"0WV","@stdlib/stats/base/dists/kumaraswamy/ctor":"0WW","@stdlib/stats/base/dists/kumaraswamy/kurtosis":"0WX","@stdlib/stats/base/dists/kumaraswamy/logcdf":"0WY","@stdlib/stats/base/dists/kumaraswamy/logpdf":"0WZ","@stdlib/stats/base/dists/kumaraswamy/mean":"0Wa","@stdlib/stats/base/dists/kumaraswamy/median":"0Wb","@stdlib/stats/base/dists/kumaraswamy/mode":"0Wc","@stdlib/stats/base/dists/kumaraswamy":"0Wd","@stdlib/stats/base/dists/kumaraswamy/pdf":"0We","@stdlib/stats/base/dists/kumaraswamy/quantile":"0Wf","@stdlib/stats/base/dists/kumaraswamy/skewness":"0Wg","@stdlib/stats/base/dists/kumaraswamy/stdev":"0Wh","@stdlib/stats/base/dists/kumaraswamy/variance":"0Wi","@stdlib/stats/base/dists/laplace/cdf":"0Wj","@stdlib/stats/base/dists/laplace/ctor":"0Wk","@stdlib/stats/base/dists/laplace/entropy":"0Wl","@stdlib/stats/base/dists/laplace/kurtosis":"0Wm","@stdlib/stats/base/dists/laplace/logcdf":"0Wn","@stdlib/stats/base/dists/laplace/logpdf":"0Wo","@stdlib/stats/base/dists/laplace/mean":"0Wp","@stdlib/stats/base/dists/laplace/median":"0Wq","@stdlib/stats/base/dists/laplace/mgf":"0Wr","@stdlib/stats/base/dists/laplace/mode":"0Ws","@stdlib/stats/base/dists/laplace":"0Wt","@stdlib/stats/base/dists/laplace/pdf":"0Wu","@stdlib/stats/base/dists/laplace/quantile":"0Wv","@stdlib/stats/base/dists/laplace/skewness":"0Ww","@stdlib/stats/base/dists/laplace/stdev":"0Wx","@stdlib/stats/base/dists/laplace/variance":"0Wy","@stdlib/stats/base/dists/levy/cdf":"0Wz","@stdlib/stats/base/dists/levy/ctor":"0X0","@stdlib/stats/base/dists/levy/entropy":"0X1","@stdlib/stats/base/dists/levy/logcdf":"0X2","@stdlib/stats/base/dists/levy/logpdf":"0X3","@stdlib/stats/base/dists/levy/mean":"0X4","@stdlib/stats/base/dists/levy/median":"0X5","@stdlib/stats/base/dists/levy/mode":"0X6","@stdlib/stats/base/dists/levy":"0X7","@stdlib/stats/base/dists/levy/pdf":"0X8","@stdlib/stats/base/dists/levy/quantile":"0X9","@stdlib/stats/base/dists/levy/stdev":"0XA","@stdlib/stats/base/dists/levy/variance":"0XB","@stdlib/stats/base/dists/logistic/cdf":"0XC","@stdlib/stats/base/dists/logistic/ctor":"0XD","@stdlib/stats/base/dists/logistic/entropy":"0XE","@stdlib/stats/base/dists/logistic/kurtosis":"0XF","@stdlib/stats/base/dists/logistic/logcdf":"0XG","@stdlib/stats/base/dists/logistic/logpdf":"0XH","@stdlib/stats/base/dists/logistic/mean":"0XI","@stdlib/stats/base/dists/logistic/median":"0XJ","@stdlib/stats/base/dists/logistic/mgf":"0XK","@stdlib/stats/base/dists/logistic/mode":"0XL","@stdlib/stats/base/dists/logistic":"0XM","@stdlib/stats/base/dists/logistic/pdf":"0XN","@stdlib/stats/base/dists/logistic/quantile":"0XO","@stdlib/stats/base/dists/logistic/skewness":"0XP","@stdlib/stats/base/dists/logistic/stdev":"0XQ","@stdlib/stats/base/dists/logistic/variance":"0XR","@stdlib/stats/base/dists/lognormal/cdf":"0XS","@stdlib/stats/base/dists/lognormal/ctor":"0XT","@stdlib/stats/base/dists/lognormal/entropy":"0XU","@stdlib/stats/base/dists/lognormal/kurtosis":"0XV","@stdlib/stats/base/dists/lognormal/logpdf":"0XW","@stdlib/stats/base/dists/lognormal/mean":"0XX","@stdlib/stats/base/dists/lognormal/median":"0XY","@stdlib/stats/base/dists/lognormal/mode":"0XZ","@stdlib/stats/base/dists/lognormal":"0Xa","@stdlib/stats/base/dists/lognormal/pdf":"0Xb","@stdlib/stats/base/dists/lognormal/quantile":"0Xc","@stdlib/stats/base/dists/lognormal/skewness":"0Xd","@stdlib/stats/base/dists/lognormal/stdev":"0Xe","@stdlib/stats/base/dists/lognormal/variance":"0Xf","@stdlib/stats/base/dists/negative-binomial/cdf":"0Xg","@stdlib/stats/base/dists/negative-binomial/ctor":"0Xh","@stdlib/stats/base/dists/negative-binomial/kurtosis":"0Xi","@stdlib/stats/base/dists/negative-binomial/logpmf":"0Xj","@stdlib/stats/base/dists/negative-binomial/mean":"0Xk","@stdlib/stats/base/dists/negative-binomial/mgf":"0Xl","@stdlib/stats/base/dists/negative-binomial/mode":"0Xm","@stdlib/stats/base/dists/negative-binomial":"0Xn","@stdlib/stats/base/dists/negative-binomial/pmf":"0Xo","@stdlib/stats/base/dists/negative-binomial/quantile":"0Xp","@stdlib/stats/base/dists/negative-binomial/skewness":"0Xq","@stdlib/stats/base/dists/negative-binomial/stdev":"0Xr","@stdlib/stats/base/dists/negative-binomial/variance":"0Xs","@stdlib/stats/base/dists/normal/cdf":"0Xt","@stdlib/stats/base/dists/normal/ctor":"0Xu","@stdlib/stats/base/dists/normal/entropy":"0Xv","@stdlib/stats/base/dists/normal/kurtosis":"0Xw","@stdlib/stats/base/dists/normal/logpdf":"0Xx","@stdlib/stats/base/dists/normal/mean":"0Xy","@stdlib/stats/base/dists/normal/median":"0Xz","@stdlib/stats/base/dists/normal/mgf":"0Y0","@stdlib/stats/base/dists/normal/mode":"0Y1","@stdlib/stats/base/dists/normal":"0Y2","@stdlib/stats/base/dists/normal/pdf":"0Y3","@stdlib/stats/base/dists/normal/quantile":"0Y4","@stdlib/stats/base/dists/normal/skewness":"0Y5","@stdlib/stats/base/dists/normal/stdev":"0Y6","@stdlib/stats/base/dists/normal/variance":"0Y7","@stdlib/stats/base/dists":"0Y8","@stdlib/stats/base/dists/pareto-type1/cdf":"0Y9","@stdlib/stats/base/dists/pareto-type1/ctor":"0YA","@stdlib/stats/base/dists/pareto-type1/entropy":"0YB","@stdlib/stats/base/dists/pareto-type1/kurtosis":"0YC","@stdlib/stats/base/dists/pareto-type1/logcdf":"0YD","@stdlib/stats/base/dists/pareto-type1/logpdf":"0YE","@stdlib/stats/base/dists/pareto-type1/mean":"0YF","@stdlib/stats/base/dists/pareto-type1/median":"0YG","@stdlib/stats/base/dists/pareto-type1/mode":"0YH","@stdlib/stats/base/dists/pareto-type1":"0YI","@stdlib/stats/base/dists/pareto-type1/pdf":"0YJ","@stdlib/stats/base/dists/pareto-type1/quantile":"0YK","@stdlib/stats/base/dists/pareto-type1/skewness":"0YL","@stdlib/stats/base/dists/pareto-type1/stdev":"0YM","@stdlib/stats/base/dists/pareto-type1/variance":"0YN","@stdlib/stats/base/dists/poisson/cdf":"0YO","@stdlib/stats/base/dists/poisson/ctor":"0YP","@stdlib/stats/base/dists/poisson/entropy":"0YQ","@stdlib/stats/base/dists/poisson/kurtosis":"0YR","@stdlib/stats/base/dists/poisson/logpmf":"0YS","@stdlib/stats/base/dists/poisson/mean":"0YT","@stdlib/stats/base/dists/poisson/median":"0YU","@stdlib/stats/base/dists/poisson/mgf":"0YV","@stdlib/stats/base/dists/poisson/mode":"0YW","@stdlib/stats/base/dists/poisson":"0YX","@stdlib/stats/base/dists/poisson/pmf":"0YY","@stdlib/stats/base/dists/poisson/quantile":"0YZ","@stdlib/stats/base/dists/poisson/skewness":"0Ya","@stdlib/stats/base/dists/poisson/stdev":"0Yb","@stdlib/stats/base/dists/poisson/variance":"0Yc","@stdlib/stats/base/dists/rayleigh/cdf":"0Yd","@stdlib/stats/base/dists/rayleigh/ctor":"0Ye","@stdlib/stats/base/dists/rayleigh/entropy":"0Yf","@stdlib/stats/base/dists/rayleigh/kurtosis":"0Yg","@stdlib/stats/base/dists/rayleigh/logcdf":"0Yh","@stdlib/stats/base/dists/rayleigh/logpdf":"0Yi","@stdlib/stats/base/dists/rayleigh/mean":"0Yj","@stdlib/stats/base/dists/rayleigh/median":"0Yk","@stdlib/stats/base/dists/rayleigh/mgf":"0Yl","@stdlib/stats/base/dists/rayleigh/mode":"0Ym","@stdlib/stats/base/dists/rayleigh":"0Yn","@stdlib/stats/base/dists/rayleigh/pdf":"0Yo","@stdlib/stats/base/dists/rayleigh/quantile":"0Yp","@stdlib/stats/base/dists/rayleigh/skewness":"0Yq","@stdlib/stats/base/dists/rayleigh/stdev":"0Yr","@stdlib/stats/base/dists/rayleigh/variance":"0Ys","@stdlib/stats/base/dists/signrank/cdf":"0Yt","@stdlib/stats/base/dists/signrank":"0Yu","@stdlib/stats/base/dists/signrank/pdf":"0Yv","@stdlib/stats/base/dists/signrank/quantile":"0Yw","@stdlib/stats/base/dists/t/cdf":"0Yx","@stdlib/stats/base/dists/t/ctor":"0Yy","@stdlib/stats/base/dists/t/entropy":"0Yz","@stdlib/stats/base/dists/t/kurtosis":"0Z0","@stdlib/stats/base/dists/t/logcdf":"0Z1","@stdlib/stats/base/dists/t/logpdf":"0Z2","@stdlib/stats/base/dists/t/mean":"0Z3","@stdlib/stats/base/dists/t/median":"0Z4","@stdlib/stats/base/dists/t/mode":"0Z5","@stdlib/stats/base/dists/t":"0Z6","@stdlib/stats/base/dists/t/pdf":"0Z7","@stdlib/stats/base/dists/t/quantile":"0Z8","@stdlib/stats/base/dists/t/skewness":"0Z9","@stdlib/stats/base/dists/t/stdev":"0ZA","@stdlib/stats/base/dists/t/variance":"0ZB","@stdlib/stats/base/dists/triangular/cdf":"0ZC","@stdlib/stats/base/dists/triangular/ctor":"0ZD","@stdlib/stats/base/dists/triangular/entropy":"0ZE","@stdlib/stats/base/dists/triangular/kurtosis":"0ZF","@stdlib/stats/base/dists/triangular/logcdf":"0ZG","@stdlib/stats/base/dists/triangular/logpdf":"0ZH","@stdlib/stats/base/dists/triangular/mean":"0ZI","@stdlib/stats/base/dists/triangular/median":"0ZJ","@stdlib/stats/base/dists/triangular/mgf":"0ZK","@stdlib/stats/base/dists/triangular/mode":"0ZL","@stdlib/stats/base/dists/triangular":"0ZM","@stdlib/stats/base/dists/triangular/pdf":"0ZN","@stdlib/stats/base/dists/triangular/quantile":"0ZO","@stdlib/stats/base/dists/triangular/skewness":"0ZP","@stdlib/stats/base/dists/triangular/stdev":"0ZQ","@stdlib/stats/base/dists/triangular/variance":"0ZR","@stdlib/stats/base/dists/truncated-normal":"0ZS","@stdlib/stats/base/dists/truncated-normal/pdf":"0ZT","@stdlib/stats/base/dists/uniform/cdf":"0ZU","@stdlib/stats/base/dists/uniform/ctor":"0ZV","@stdlib/stats/base/dists/uniform/entropy":"0ZW","@stdlib/stats/base/dists/uniform/kurtosis":"0ZX","@stdlib/stats/base/dists/uniform/logcdf":"0ZY","@stdlib/stats/base/dists/uniform/logpdf":"0ZZ","@stdlib/stats/base/dists/uniform/mean":"0Za","@stdlib/stats/base/dists/uniform/median":"0Zb","@stdlib/stats/base/dists/uniform/mgf":"0Zc","@stdlib/stats/base/dists/uniform":"0Zd","@stdlib/stats/base/dists/uniform/pdf":"0Ze","@stdlib/stats/base/dists/uniform/quantile":"0Zf","@stdlib/stats/base/dists/uniform/skewness":"0Zg","@stdlib/stats/base/dists/uniform/stdev":"0Zh","@stdlib/stats/base/dists/uniform/variance":"0Zi","@stdlib/stats/base/dists/weibull/cdf":"0Zj","@stdlib/stats/base/dists/weibull/ctor":"0Zk","@stdlib/stats/base/dists/weibull/entropy":"0Zl","@stdlib/stats/base/dists/weibull/kurtosis":"0Zm","@stdlib/stats/base/dists/weibull/logcdf":"0Zn","@stdlib/stats/base/dists/weibull/logpdf":"0Zo","@stdlib/stats/base/dists/weibull/mean":"0Zp","@stdlib/stats/base/dists/weibull/median":"0Zq","@stdlib/stats/base/dists/weibull/mgf":"0Zr","@stdlib/stats/base/dists/weibull/mode":"0Zs","@stdlib/stats/base/dists/weibull":"0Zt","@stdlib/stats/base/dists/weibull/pdf":"0Zu","@stdlib/stats/base/dists/weibull/quantile":"0Zv","@stdlib/stats/base/dists/weibull/skewness":"0Zw","@stdlib/stats/base/dists/weibull/stdev":"0Zx","@stdlib/stats/base/dists/weibull/variance":"0Zy","@stdlib/stats/base/dmax":"0Zz","@stdlib/stats/base/dmaxabs":"0a0","@stdlib/stats/base/dmaxabssorted":"0a1","@stdlib/stats/base/dmaxsorted":"0a2","@stdlib/stats/base/dmean":"0a3","@stdlib/stats/base/dmeankbn":"0a4","@stdlib/stats/base/dmeankbn2":"0a5","@stdlib/stats/base/dmeanli":"0a6","@stdlib/stats/base/dmeanlipw":"0a7","@stdlib/stats/base/dmeanors":"0a8","@stdlib/stats/base/dmeanpn":"0a9","@stdlib/stats/base/dmeanpw":"0aA","@stdlib/stats/base/dmeanstdev":"0aB","@stdlib/stats/base/dmeanstdevpn":"0aC","@stdlib/stats/base/dmeanvar":"0aD","@stdlib/stats/base/dmeanvarpn":"0aE","@stdlib/stats/base/dmeanwd":"0aF","@stdlib/stats/base/dmediansorted":"0aG","@stdlib/stats/base/dmidrange":"0aH","@stdlib/stats/base/dmin":"0aI","@stdlib/stats/base/dminabs":"0aJ","@stdlib/stats/base/dminsorted":"0aK","@stdlib/stats/base/dmskmax":"0aL","@stdlib/stats/base/dmskmin":"0aM","@stdlib/stats/base/dmskrange":"0aN","@stdlib/stats/base/dnanmax":"0aO","@stdlib/stats/base/dnanmaxabs":"0aP","@stdlib/stats/base/dnanmean":"0aQ","@stdlib/stats/base/dnanmeanors":"0aR","@stdlib/stats/base/dnanmeanpn":"0aS","@stdlib/stats/base/dnanmeanpw":"0aT","@stdlib/stats/base/dnanmeanwd":"0aU","@stdlib/stats/base/dnanmin":"0aV","@stdlib/stats/base/dnanminabs":"0aW","@stdlib/stats/base/dnanmskmax":"0aX","@stdlib/stats/base/dnanmskmin":"0aY","@stdlib/stats/base/dnanmskrange":"0aZ","@stdlib/stats/base/dnanrange":"0aa","@stdlib/stats/base/dnanstdev":"0ab","@stdlib/stats/base/dnanstdevch":"0ac","@stdlib/stats/base/dnanstdevpn":"0ad","@stdlib/stats/base/dnanstdevtk":"0ae","@stdlib/stats/base/dnanstdevwd":"0af","@stdlib/stats/base/dnanstdevyc":"0ag","@stdlib/stats/base/dnanvariance":"0ah","@stdlib/stats/base/dnanvariancech":"0ai","@stdlib/stats/base/dnanvariancepn":"0aj","@stdlib/stats/base/dnanvariancetk":"0ak","@stdlib/stats/base/dnanvariancewd":"0al","@stdlib/stats/base/dnanvarianceyc":"0am","@stdlib/stats/base/drange":"0an","@stdlib/stats/base/dsem":"0ao","@stdlib/stats/base/dsemch":"0ap","@stdlib/stats/base/dsempn":"0aq","@stdlib/stats/base/dsemtk":"0ar","@stdlib/stats/base/dsemwd":"0as","@stdlib/stats/base/dsemyc":"0at","@stdlib/stats/base/dsmean":"0au","@stdlib/stats/base/dsmeanors":"0av","@stdlib/stats/base/dsmeanpn":"0aw","@stdlib/stats/base/dsmeanpw":"0ax","@stdlib/stats/base/dsmeanwd":"0ay","@stdlib/stats/base/dsnanmean":"0az","@stdlib/stats/base/dsnanmeanors":"0b0","@stdlib/stats/base/dsnanmeanpn":"0b1","@stdlib/stats/base/dsnanmeanwd":"0b2","@stdlib/stats/base/dstdev":"0b3","@stdlib/stats/base/dstdevch":"0b4","@stdlib/stats/base/dstdevpn":"0b5","@stdlib/stats/base/dstdevtk":"0b6","@stdlib/stats/base/dstdevwd":"0b7","@stdlib/stats/base/dstdevyc":"0b8","@stdlib/stats/base/dsvariance":"0b9","@stdlib/stats/base/dsvariancepn":"0bA","@stdlib/stats/base/dvariance":"0bB","@stdlib/stats/base/dvariancech":"0bC","@stdlib/stats/base/dvariancepn":"0bD","@stdlib/stats/base/dvariancetk":"0bE","@stdlib/stats/base/dvariancewd":"0bF","@stdlib/stats/base/dvarianceyc":"0bG","@stdlib/stats/base/dvarm":"0bH","@stdlib/stats/base/dvarmpn":"0bI","@stdlib/stats/base/dvarmtk":"0bJ","@stdlib/stats/base/max-by":"0bK","@stdlib/stats/base/max":"0bL","@stdlib/stats/base/maxabs":"0bM","@stdlib/stats/base/maxsorted":"0bN","@stdlib/stats/base/mean":"0bO","@stdlib/stats/base/meankbn":"0bP","@stdlib/stats/base/meankbn2":"0bQ","@stdlib/stats/base/meanors":"0bR","@stdlib/stats/base/meanpn":"0bS","@stdlib/stats/base/meanpw":"0bT","@stdlib/stats/base/meanwd":"0bU","@stdlib/stats/base/mediansorted":"0bV","@stdlib/stats/base/min-by":"0bW","@stdlib/stats/base/min":"0bX","@stdlib/stats/base/minabs":"0bY","@stdlib/stats/base/minsorted":"0bZ","@stdlib/stats/base/mskmax":"0ba","@stdlib/stats/base/mskmin":"0bb","@stdlib/stats/base/mskrange":"0bc","@stdlib/stats/base/nanmax-by":"0bd","@stdlib/stats/base/nanmax":"0be","@stdlib/stats/base/nanmaxabs":"0bf","@stdlib/stats/base/nanmean":"0bg","@stdlib/stats/base/nanmeanors":"0bh","@stdlib/stats/base/nanmeanpn":"0bi","@stdlib/stats/base/nanmeanwd":"0bj","@stdlib/stats/base/nanmin-by":"0bk","@stdlib/stats/base/nanmin":"0bl","@stdlib/stats/base/nanminabs":"0bm","@stdlib/stats/base/nanmskmax":"0bn","@stdlib/stats/base/nanmskmin":"0bo","@stdlib/stats/base/nanmskrange":"0bp","@stdlib/stats/base/nanrange-by":"0bq","@stdlib/stats/base/nanrange":"0br","@stdlib/stats/base/nanstdev":"0bs","@stdlib/stats/base/nanstdevch":"0bt","@stdlib/stats/base/nanstdevpn":"0bu","@stdlib/stats/base/nanstdevtk":"0bv","@stdlib/stats/base/nanstdevwd":"0bw","@stdlib/stats/base/nanstdevyc":"0bx","@stdlib/stats/base/nanvariance":"0by","@stdlib/stats/base/nanvariancech":"0bz","@stdlib/stats/base/nanvariancepn":"0c0","@stdlib/stats/base/nanvariancetk":"0c1","@stdlib/stats/base/nanvariancewd":"0c2","@stdlib/stats/base/nanvarianceyc":"0c3","@stdlib/stats/base":"0c4","@stdlib/stats/base/range-by":"0c5","@stdlib/stats/base/range":"0c6","@stdlib/stats/base/scumax":"0c7","@stdlib/stats/base/scumaxabs":"0c8","@stdlib/stats/base/scumin":"0c9","@stdlib/stats/base/scuminabs":"0cA","@stdlib/stats/base/sdsmean":"0cB","@stdlib/stats/base/sdsmeanors":"0cC","@stdlib/stats/base/sdsnanmean":"0cD","@stdlib/stats/base/sdsnanmeanors":"0cE","@stdlib/stats/base/smax":"0cF","@stdlib/stats/base/smaxabs":"0cG","@stdlib/stats/base/smaxabssorted":"0cH","@stdlib/stats/base/smaxsorted":"0cI","@stdlib/stats/base/smean":"0cJ","@stdlib/stats/base/smeankbn":"0cK","@stdlib/stats/base/smeankbn2":"0cL","@stdlib/stats/base/smeanli":"0cM","@stdlib/stats/base/smeanlipw":"0cN","@stdlib/stats/base/smeanors":"0cO","@stdlib/stats/base/smeanpn":"0cP","@stdlib/stats/base/smeanpw":"0cQ","@stdlib/stats/base/smeanwd":"0cR","@stdlib/stats/base/smediansorted":"0cS","@stdlib/stats/base/smidrange":"0cT","@stdlib/stats/base/smin":"0cU","@stdlib/stats/base/sminabs":"0cV","@stdlib/stats/base/sminsorted":"0cW","@stdlib/stats/base/smskmax":"0cX","@stdlib/stats/base/smskmin":"0cY","@stdlib/stats/base/smskrange":"0cZ","@stdlib/stats/base/snanmax":"0ca","@stdlib/stats/base/snanmaxabs":"0cb","@stdlib/stats/base/snanmean":"0cc","@stdlib/stats/base/snanmeanors":"0cd","@stdlib/stats/base/snanmeanpn":"0ce","@stdlib/stats/base/snanmeanwd":"0cf","@stdlib/stats/base/snanmin":"0cg","@stdlib/stats/base/snanminabs":"0ch","@stdlib/stats/base/snanmskmax":"0ci","@stdlib/stats/base/snanmskmin":"0cj","@stdlib/stats/base/snanmskrange":"0ck","@stdlib/stats/base/snanrange":"0cl","@stdlib/stats/base/snanstdev":"0cm","@stdlib/stats/base/snanstdevch":"0cn","@stdlib/stats/base/snanstdevpn":"0co","@stdlib/stats/base/snanstdevtk":"0cp","@stdlib/stats/base/snanstdevwd":"0cq","@stdlib/stats/base/snanstdevyc":"0cr","@stdlib/stats/base/snanvariance":"0cs","@stdlib/stats/base/snanvariancech":"0ct","@stdlib/stats/base/snanvariancepn":"0cu","@stdlib/stats/base/snanvariancetk":"0cv","@stdlib/stats/base/snanvariancewd":"0cw","@stdlib/stats/base/snanvarianceyc":"0cx","@stdlib/stats/base/srange":"0cy","@stdlib/stats/base/sstdev":"0cz","@stdlib/stats/base/sstdevch":"0d0","@stdlib/stats/base/sstdevpn":"0d1","@stdlib/stats/base/sstdevtk":"0d2","@stdlib/stats/base/sstdevwd":"0d3","@stdlib/stats/base/sstdevyc":"0d4","@stdlib/stats/base/stdev":"0d5","@stdlib/stats/base/stdevch":"0d6","@stdlib/stats/base/stdevpn":"0d7","@stdlib/stats/base/stdevtk":"0d8","@stdlib/stats/base/stdevwd":"0d9","@stdlib/stats/base/stdevyc":"0dA","@stdlib/stats/base/svariance":"0dB","@stdlib/stats/base/svariancech":"0dC","@stdlib/stats/base/svariancepn":"0dD","@stdlib/stats/base/svariancetk":"0dE","@stdlib/stats/base/svariancewd":"0dF","@stdlib/stats/base/svarianceyc":"0dG","@stdlib/stats/base/variance":"0dH","@stdlib/stats/base/variancech":"0dI","@stdlib/stats/base/variancepn":"0dJ","@stdlib/stats/base/variancetk":"0dK","@stdlib/stats/base/variancewd":"0dL","@stdlib/stats/base/varianceyc":"0dM","@stdlib/stats/binomial-test":"0dN","@stdlib/stats/chi2gof":"0dO","@stdlib/stats/chi2test":"0dP","@stdlib/stats/fligner-test":"0dQ","@stdlib/stats/incr/apcorr":"0dR","@stdlib/stats/incr/count":"0dS","@stdlib/stats/incr/covariance":"0dT","@stdlib/stats/incr/covmat":"0dU","@stdlib/stats/incr/cv":"0dV","@stdlib/stats/incr/ewmean":"0dW","@stdlib/stats/incr/ewstdev":"0dX","@stdlib/stats/incr/ewvariance":"0dY","@stdlib/stats/incr/gmean":"0dZ","@stdlib/stats/incr/grubbs":"0da","@stdlib/stats/incr/hmean":"0db","@stdlib/stats/incr/kurtosis":"0dc","@stdlib/stats/incr/maape":"0dd","@stdlib/stats/incr/mae":"0de","@stdlib/stats/incr/mapcorr":"0df","@stdlib/stats/incr/mape":"0dg","@stdlib/stats/incr/max":"0dh","@stdlib/stats/incr/maxabs":"0di","@stdlib/stats/incr/mcovariance":"0dj","@stdlib/stats/incr/mcv":"0dk","@stdlib/stats/incr/mda":"0dl","@stdlib/stats/incr/me":"0dm","@stdlib/stats/incr/mean":"0dn","@stdlib/stats/incr/meanabs":"0do","@stdlib/stats/incr/meanabs2":"0dp","@stdlib/stats/incr/meanstdev":"0dq","@stdlib/stats/incr/meanvar":"0dr","@stdlib/stats/incr/mgmean":"0ds","@stdlib/stats/incr/mgrubbs":"0dt","@stdlib/stats/incr/mhmean":"0du","@stdlib/stats/incr/midrange":"0dv","@stdlib/stats/incr/min":"0dw","@stdlib/stats/incr/minabs":"0dx","@stdlib/stats/incr/minmax":"0dy","@stdlib/stats/incr/minmaxabs":"0dz","@stdlib/stats/incr/mmaape":"0e0","@stdlib/stats/incr/mmae":"0e1","@stdlib/stats/incr/mmape":"0e2","@stdlib/stats/incr/mmax":"0e3","@stdlib/stats/incr/mmaxabs":"0e4","@stdlib/stats/incr/mmda":"0e5","@stdlib/stats/incr/mme":"0e6","@stdlib/stats/incr/mmean":"0e7","@stdlib/stats/incr/mmeanabs":"0e8","@stdlib/stats/incr/mmeanabs2":"0e9","@stdlib/stats/incr/mmeanstdev":"0eA","@stdlib/stats/incr/mmeanvar":"0eB","@stdlib/stats/incr/mmidrange":"0eC","@stdlib/stats/incr/mmin":"0eD","@stdlib/stats/incr/mminabs":"0eE","@stdlib/stats/incr/mminmax":"0eF","@stdlib/stats/incr/mminmaxabs":"0eG","@stdlib/stats/incr/mmpe":"0eH","@stdlib/stats/incr/mmse":"0eI","@stdlib/stats/incr/mpcorr":"0eJ","@stdlib/stats/incr/mpcorr2":"0eK","@stdlib/stats/incr/mpcorrdist":"0eL","@stdlib/stats/incr/mpe":"0eM","@stdlib/stats/incr/mprod":"0eN","@stdlib/stats/incr/mrange":"0eO","@stdlib/stats/incr/mrmse":"0eP","@stdlib/stats/incr/mrss":"0eQ","@stdlib/stats/incr/mse":"0eR","@stdlib/stats/incr/mstdev":"0eS","@stdlib/stats/incr/msum":"0eT","@stdlib/stats/incr/msumabs":"0eU","@stdlib/stats/incr/msumabs2":"0eV","@stdlib/stats/incr/msummary":"0eW","@stdlib/stats/incr/msumprod":"0eX","@stdlib/stats/incr/mvariance":"0eY","@stdlib/stats/incr/mvmr":"0eZ","@stdlib/stats/incr/nancount":"0ea","@stdlib/stats/incr/nansum":"0eb","@stdlib/stats/incr/nansumabs":"0ec","@stdlib/stats/incr/nansumabs2":"0ed","@stdlib/stats/incr":"0ee","@stdlib/stats/incr/pcorr":"0ef","@stdlib/stats/incr/pcorr2":"0eg","@stdlib/stats/incr/pcorrdist":"0eh","@stdlib/stats/incr/pcorrdistmat":"0ei","@stdlib/stats/incr/pcorrmat":"0ej","@stdlib/stats/incr/prod":"0ek","@stdlib/stats/incr/range":"0el","@stdlib/stats/incr/rmse":"0em","@stdlib/stats/incr/rss":"0en","@stdlib/stats/incr/skewness":"0eo","@stdlib/stats/incr/stdev":"0ep","@stdlib/stats/incr/sum":"0eq","@stdlib/stats/incr/sumabs":"0er","@stdlib/stats/incr/sumabs2":"0es","@stdlib/stats/incr/summary":"0et","@stdlib/stats/incr/sumprod":"0eu","@stdlib/stats/incr/variance":"0ev","@stdlib/stats/incr/vmr":"0ew","@stdlib/stats/incr/wmean":"0ex","@stdlib/stats/iter/cugmean":"0ey","@stdlib/stats/iter/cuhmean":"0ez","@stdlib/stats/iter/cumax":"0f0","@stdlib/stats/iter/cumaxabs":"0f1","@stdlib/stats/iter/cumean":"0f2","@stdlib/stats/iter/cumeanabs":"0f3","@stdlib/stats/iter/cumeanabs2":"0f4","@stdlib/stats/iter/cumidrange":"0f5","@stdlib/stats/iter/cumin":"0f6","@stdlib/stats/iter/cuminabs":"0f7","@stdlib/stats/iter/cuprod":"0f8","@stdlib/stats/iter/curange":"0f9","@stdlib/stats/iter/cusum":"0fA","@stdlib/stats/iter/cusumabs":"0fB","@stdlib/stats/iter/cusumabs2":"0fC","@stdlib/stats/iter/max":"0fD","@stdlib/stats/iter/maxabs":"0fE","@stdlib/stats/iter/mean":"0fF","@stdlib/stats/iter/meanabs":"0fG","@stdlib/stats/iter/meanabs2":"0fH","@stdlib/stats/iter/midrange":"0fI","@stdlib/stats/iter/min":"0fJ","@stdlib/stats/iter/minabs":"0fK","@stdlib/stats/iter/mmax":"0fL","@stdlib/stats/iter/mmaxabs":"0fM","@stdlib/stats/iter/mmean":"0fN","@stdlib/stats/iter/mmeanabs":"0fO","@stdlib/stats/iter/mmeanabs2":"0fP","@stdlib/stats/iter/mmidrange":"0fQ","@stdlib/stats/iter/mmin":"0fR","@stdlib/stats/iter/mminabs":"0fS","@stdlib/stats/iter/mprod":"0fT","@stdlib/stats/iter/mrange":"0fU","@stdlib/stats/iter/msum":"0fV","@stdlib/stats/iter/msumabs":"0fW","@stdlib/stats/iter/msumabs2":"0fX","@stdlib/stats/iter":"0fY","@stdlib/stats/iter/prod":"0fZ","@stdlib/stats/iter/range":"0fa","@stdlib/stats/iter/stdev":"0fb","@stdlib/stats/iter/sum":"0fc","@stdlib/stats/iter/sumabs":"0fd","@stdlib/stats/iter/sumabs2":"0fe","@stdlib/stats/iter/variance":"0ff","@stdlib/stats/kde2d":"0fg","@stdlib/stats/kruskal-test":"0fh","@stdlib/stats/kstest":"0fi","@stdlib/stats/levene-test":"0fj","@stdlib/stats/lowess":"0fk","@stdlib/stats":"0fl","@stdlib/stats/padjust":"0fm","@stdlib/stats/pcorrtest":"0fn","@stdlib/stats/ranks":"0fo","@stdlib/stats/ttest":"0fp","@stdlib/stats/ttest2":"0fq","@stdlib/stats/vartest":"0fr","@stdlib/stats/wilcoxon":"0fs","@stdlib/stats/ztest":"0ft","@stdlib/stats/ztest2":"0fu","@stdlib/streams/node/debug-sink":"0fv","@stdlib/streams/node/debug":"0fw","@stdlib/streams/node/empty":"0fx","@stdlib/streams/node/from-array":"0fy","@stdlib/streams/node/from-circular-array":"0fz","@stdlib/streams/node/from-constant":"0g0","@stdlib/streams/node/from-iterator":"0g1","@stdlib/streams/node/from-strided-array":"0g2","@stdlib/streams/node/inspect-sink":"0g3","@stdlib/streams/node/inspect":"0g4","@stdlib/streams/node/join":"0g5","@stdlib/streams/node":"0g6","@stdlib/streams/node/split":"0g7","@stdlib/streams/node/stderr":"0g8","@stdlib/streams/node/stdin":"0g9","@stdlib/streams/node/stdout":"0gA","@stdlib/streams/node/transform":"0gB","@stdlib/streams":"0gC","@stdlib/strided/base/binary-addon-dispatch":"0gD","@stdlib/strided/base/binary-dtype-signatures":"0gE","@stdlib/strided/base/binary-signature-callbacks":"0gF","@stdlib/strided/base/binary":"0gG","@stdlib/strided/base/cmap":"0gH","@stdlib/strided/base/dmap":"0gI","@stdlib/strided/base/dmap2":"0gJ","@stdlib/strided/base/dmskmap":"0gK","@stdlib/strided/base/dmskmap2":"0gL","@stdlib/strided/base/dtype-enum2str":"0gM","@stdlib/strided/base/dtype-resolve-enum":"0gN","@stdlib/strided/base/dtype-resolve-str":"0gO","@stdlib/strided/base/dtype-str2enum":"0gP","@stdlib/strided/base/function-object":"0gQ","@stdlib/strided/base/map-by":"0gR","@stdlib/strided/base/map-by2":"0gS","@stdlib/strided/base/max-view-buffer-index":"0gT","@stdlib/strided/base/meta-data-props":"0gU","@stdlib/strided/base/min-view-buffer-index":"0gV","@stdlib/strided/base/mskunary":"0gW","@stdlib/strided/base/nullary":"0gX","@stdlib/strided/base/offset-view":"0gY","@stdlib/strided/base":"0gZ","@stdlib/strided/base/quaternary":"0ga","@stdlib/strided/base/quinary":"0gb","@stdlib/strided/base/reinterpret-complex128":"0gc","@stdlib/strided/base/reinterpret-complex64":"0gd","@stdlib/strided/base/smap":"0ge","@stdlib/strided/base/smap2":"0gf","@stdlib/strided/base/smskmap":"0gg","@stdlib/strided/base/smskmap2":"0gh","@stdlib/strided/base/ternary":"0gi","@stdlib/strided/base/unary-addon-dispatch":"0gj","@stdlib/strided/base/unary":"0gk","@stdlib/strided/base/zmap":"0gl","@stdlib/strided/common":"0gm","@stdlib/strided/dispatch":"0gn","@stdlib/strided/dtypes":"0go","@stdlib/strided/napi/addon-arguments":"0gp","@stdlib/strided/napi/binary":"0gq","@stdlib/strided/napi/cmap":"0gr","@stdlib/strided/napi/dmap":"0gs","@stdlib/strided/napi/dmap2":"0gt","@stdlib/strided/napi/dmskmap":"0gu","@stdlib/strided/napi/dmskmap2":"0gv","@stdlib/strided/napi/mskunary":"0gw","@stdlib/strided/napi":"0gx","@stdlib/strided/napi/smap":"0gy","@stdlib/strided/napi/smap2":"0gz","@stdlib/strided/napi/smskmap":"0h0","@stdlib/strided/napi/smskmap2":"0h1","@stdlib/strided/napi/unary":"0h2","@stdlib/strided/napi/zmap":"0h3","@stdlib/strided":"0h4","@stdlib/string/acronym":"0h5","@stdlib/string/camelcase":"0h6","@stdlib/string/capitalize":"0h7","@stdlib/string/code-point-at":"0h8","@stdlib/string/constantcase":"0h9","@stdlib/string/ends-with":"0hA","@stdlib/string/format":"0hB","@stdlib/string/from-code-point":"0hC","@stdlib/string/kebabcase":"0hD","@stdlib/string/left-pad":"0hE","@stdlib/string/left-trim-n":"0hF","@stdlib/string/left-trim":"0hG","@stdlib/string/lowercase":"0hH","@stdlib/string/next-grapheme-cluster-break":"0hI","@stdlib/string/num-grapheme-clusters":"0hJ","@stdlib/string":"0hK","@stdlib/string/pad":"0hL","@stdlib/string/pascalcase":"0hM","@stdlib/string/percent-encode":"0hN","@stdlib/string/prev-grapheme-cluster-break":"0hO","@stdlib/string/remove-first":"0hP","@stdlib/string/remove-last":"0hQ","@stdlib/string/remove-punctuation":"0hR","@stdlib/string/remove-utf8-bom":"0hS","@stdlib/string/remove-words":"0hT","@stdlib/string/repeat":"0hU","@stdlib/string/replace":"0hV","@stdlib/string/reverse":"0hW","@stdlib/string/right-pad":"0hX","@stdlib/string/right-trim-n":"0hY","@stdlib/string/right-trim":"0hZ","@stdlib/string/snakecase":"0ha","@stdlib/string/split-grapheme-clusters":"0hb","@stdlib/string/startcase":"0hc","@stdlib/string/starts-with":"0hd","@stdlib/string/substring-after-last":"0he","@stdlib/string/substring-after":"0hf","@stdlib/string/substring-before-last":"0hg","@stdlib/string/substring-before":"0hh","@stdlib/string/tools/grapheme-cluster-break":"0hi","@stdlib/string/tools":"0hj","@stdlib/string/trim":"0hk","@stdlib/string/truncate-middle":"0hl","@stdlib/string/truncate":"0hm","@stdlib/string/uncapitalize":"0hn","@stdlib/string/uppercase":"0ho","@stdlib/string/utf16-to-utf8-array":"0hp","@stdlib/symbol/async-iterator":"0hq","@stdlib/symbol/ctor":"0hr","@stdlib/symbol/iterator":"0hs","@stdlib/symbol":"0ht","@stdlib/time/day-of-quarter":"0hu","@stdlib/time/day-of-year":"0hv","@stdlib/time/days-in-month":"0hw","@stdlib/time/days-in-year":"0hx","@stdlib/time/hours-in-month":"0hy","@stdlib/time/hours-in-year":"0hz","@stdlib/time/iso-weeks-in-year":"0i0","@stdlib/time/minutes-in-month":"0i1","@stdlib/time/minutes-in-year":"0i2","@stdlib/time/now":"0i3","@stdlib/time":"0i4","@stdlib/time/quarter-of-year":"0i5","@stdlib/time/seconds-in-month":"0i6","@stdlib/time/seconds-in-year":"0i7","@stdlib/time/tic":"0i8","@stdlib/time/toc":"0i9","@stdlib/types":"0iA","@stdlib/utils/any-by-right":"0iB","@stdlib/utils/any-by":"0iC","@stdlib/utils/any":"0iD","@stdlib/utils/append":"0iE","@stdlib/utils/argument-function":"0iF","@stdlib/utils/async/any-by-right":"0iG","@stdlib/utils/async/any-by":"0iH","@stdlib/utils/async/bifurcate-by":"0iI","@stdlib/utils/async/compose":"0iJ","@stdlib/utils/async/count-by":"0iK","@stdlib/utils/async/do-until":"0iL","@stdlib/utils/async/do-while":"0iM","@stdlib/utils/async/every-by-right":"0iN","@stdlib/utils/async/every-by":"0iO","@stdlib/utils/async/for-each-right":"0iP","@stdlib/utils/async/for-each":"0iQ","@stdlib/utils/async/function-sequence":"0iR","@stdlib/utils/async/group-by":"0iS","@stdlib/utils/async/if-else":"0iT","@stdlib/utils/async/if-then":"0iU","@stdlib/utils/async/inmap-right":"0iV","@stdlib/utils/async/inmap":"0iW","@stdlib/utils/async/map-function":"0iX","@stdlib/utils/async/map-keys":"0iY","@stdlib/utils/async/map-values":"0iZ","@stdlib/utils/async/none-by-right":"0ia","@stdlib/utils/async/none-by":"0ib","@stdlib/utils/async":"0ic","@stdlib/utils/async/reduce-right":"0id","@stdlib/utils/async/reduce":"0ie","@stdlib/utils/async/series-waterfall":"0if","@stdlib/utils/async/some-by-right":"0ig","@stdlib/utils/async/some-by":"0ih","@stdlib/utils/async/tabulate-by":"0ii","@stdlib/utils/async/try-catch":"0ij","@stdlib/utils/async/try-then":"0ik","@stdlib/utils/async/until":"0il","@stdlib/utils/async/while":"0im","@stdlib/utils/bifurcate-by":"0in","@stdlib/utils/bifurcate-in":"0io","@stdlib/utils/bifurcate-own":"0ip","@stdlib/utils/bifurcate":"0iq","@stdlib/utils/capitalize-keys":"0ir","@stdlib/utils/circular-buffer":"0is","@stdlib/utils/common-keys-in":"0it","@stdlib/utils/common-keys":"0iu","@stdlib/utils/compact-adjacency-matrix":"0iv","@stdlib/utils/compose":"0iw","@stdlib/utils/constant-function":"0ix","@stdlib/utils/constructor-name":"0iy","@stdlib/utils/convert-path":"0iz","@stdlib/utils/copy":"0j0","@stdlib/utils/count-by":"0j1","@stdlib/utils/curry-right":"0j2","@stdlib/utils/curry":"0j3","@stdlib/utils/deep-get":"0j4","@stdlib/utils/deep-pluck":"0j5","@stdlib/utils/deep-set":"0j6","@stdlib/utils/define-configurable-read-only-accessor":"0j7","@stdlib/utils/define-configurable-read-only-property":"0j8","@stdlib/utils/define-configurable-read-write-accessor":"0j9","@stdlib/utils/define-configurable-write-only-accessor":"0jA","@stdlib/utils/define-memoized-configurable-read-only-property":"0jB","@stdlib/utils/define-memoized-property":"0jC","@stdlib/utils/define-memoized-read-only-property":"0jD","@stdlib/utils/define-nonenumerable-property":"0jE","@stdlib/utils/define-nonenumerable-read-only-accessor":"0jF","@stdlib/utils/define-nonenumerable-read-only-property":"0jG","@stdlib/utils/define-nonenumerable-read-write-accessor":"0jH","@stdlib/utils/define-nonenumerable-write-only-accessor":"0jI","@stdlib/utils/define-properties":"0jJ","@stdlib/utils/define-property":"0jK","@stdlib/utils/define-read-only-accessor":"0jL","@stdlib/utils/define-read-only-property":"0jM","@stdlib/utils/define-read-write-accessor":"0jN","@stdlib/utils/define-write-only-accessor":"0jO","@stdlib/utils/dirname":"0jP","@stdlib/utils/do-until-each-right":"0jQ","@stdlib/utils/do-until-each":"0jR","@stdlib/utils/do-until":"0jS","@stdlib/utils/do-while-each-right":"0jT","@stdlib/utils/do-while-each":"0jU","@stdlib/utils/do-while":"0jV","@stdlib/utils/doubly-linked-list":"0jW","@stdlib/utils/entries-in":"0jX","@stdlib/utils/entries":"0jY","@stdlib/utils/enumerable-properties-in":"0jZ","@stdlib/utils/enumerable-properties":"0ja","@stdlib/utils/enumerable-property-symbols-in":"0jb","@stdlib/utils/enumerable-property-symbols":"0jc","@stdlib/utils/escape-regexp-string":"0jd","@stdlib/utils/eval":"0je","@stdlib/utils/every-by-right":"0jf","@stdlib/utils/every-by":"0jg","@stdlib/utils/every":"0jh","@stdlib/utils/extname":"0ji","@stdlib/utils/fifo":"0jj","@stdlib/utils/filter-arguments":"0jk","@stdlib/utils/find":"0jl","@stdlib/utils/flatten-array":"0jm","@stdlib/utils/flatten-object":"0jn","@stdlib/utils/for-each-right":"0jo","@stdlib/utils/for-each":"0jp","@stdlib/utils/for-in":"0jq","@stdlib/utils/for-own":"0jr","@stdlib/utils/from-entries":"0js","@stdlib/utils/function-name":"0jt","@stdlib/utils/function-sequence":"0ju","@stdlib/utils/get-prototype-of":"0jv","@stdlib/utils/global":"0jw","@stdlib/utils/group-by":"0jx","@stdlib/utils/group-in":"0jy","@stdlib/utils/group-own":"0jz","@stdlib/utils/group":"0k0","@stdlib/utils/identity-function":"0k1","@stdlib/utils/if-else":"0k2","@stdlib/utils/if-then":"0k3","@stdlib/utils/index-of":"0k4","@stdlib/utils/inherit":"0k5","@stdlib/utils/inherited-enumerable-properties":"0k6","@stdlib/utils/inherited-enumerable-property-symbols":"0k7","@stdlib/utils/inherited-keys":"0k8","@stdlib/utils/inherited-nonenumerable-properties":"0k9","@stdlib/utils/inherited-nonenumerable-property-names":"0kA","@stdlib/utils/inherited-nonenumerable-property-symbols":"0kB","@stdlib/utils/inherited-properties":"0kC","@stdlib/utils/inherited-property-descriptor":"0kD","@stdlib/utils/inherited-property-descriptors":"0kE","@stdlib/utils/inherited-property-names":"0kF","@stdlib/utils/inherited-property-symbols":"0kG","@stdlib/utils/inherited-writable-properties":"0kH","@stdlib/utils/inherited-writable-property-names":"0kI","@stdlib/utils/inherited-writable-property-symbols":"0kJ","@stdlib/utils/inmap-right":"0kK","@stdlib/utils/inmap":"0kL","@stdlib/utils/key-by-right":"0kM","@stdlib/utils/key-by":"0kN","@stdlib/utils/keys-in":"0kO","@stdlib/utils/keys":"0kP","@stdlib/utils/library-manifest":"0kQ","@stdlib/utils/linked-list":"0kR","@stdlib/utils/lowercase-keys":"0kS","@stdlib/utils/map-arguments":"0kT","@stdlib/utils/map-function":"0kU","@stdlib/utils/map-keys":"0kV","@stdlib/utils/map-reduce-right":"0kW","@stdlib/utils/map-reduce":"0kX","@stdlib/utils/map-right":"0kY","@stdlib/utils/map-values":"0kZ","@stdlib/utils/map":"0ka","@stdlib/utils/map2-right":"0kb","@stdlib/utils/map2":"0kc","@stdlib/utils/map2d":"0kd","@stdlib/utils/map3d":"0ke","@stdlib/utils/map4d":"0kf","@stdlib/utils/map5d":"0kg","@stdlib/utils/mask-arguments":"0kh","@stdlib/utils/memoize":"0ki","@stdlib/utils/merge":"0kj","@stdlib/utils/move-property":"0kk","@stdlib/utils/named-typed-tuple":"0kl","@stdlib/utils/nary-function":"0km","@stdlib/utils/native-class":"0kn","@stdlib/utils/next-tick":"0ko","@stdlib/utils/none-by-right":"0kp","@stdlib/utils/none-by":"0kq","@stdlib/utils/none":"0kr","@stdlib/utils/nonenumerable-properties-in":"0ks","@stdlib/utils/nonenumerable-properties":"0kt","@stdlib/utils/nonenumerable-property-names-in":"0ku","@stdlib/utils/nonenumerable-property-names":"0kv","@stdlib/utils/nonenumerable-property-symbols-in":"0kw","@stdlib/utils/nonenumerable-property-symbols":"0kx","@stdlib/utils/nonindex-keys":"0ky","@stdlib/utils/noop":"0kz","@stdlib/utils/object-inverse-by":"0l0","@stdlib/utils/object-inverse":"0l1","@stdlib/utils/omit-by":"0l2","@stdlib/utils/omit":"0l3","@stdlib/utils/open-url":"0l4","@stdlib/utils":"0l5","@stdlib/utils/papply-right":"0l6","@stdlib/utils/papply":"0l7","@stdlib/utils/parallel":"0l8","@stdlib/utils/parse-json":"0l9","@stdlib/utils/pick-arguments":"0lA","@stdlib/utils/pick-by":"0lB","@stdlib/utils/pick":"0lC","@stdlib/utils/pluck":"0lD","@stdlib/utils/pop":"0lE","@stdlib/utils/prepend":"0lF","@stdlib/utils/properties-in":"0lG","@stdlib/utils/properties":"0lH","@stdlib/utils/property-descriptor-in":"0lI","@stdlib/utils/property-descriptor":"0lJ","@stdlib/utils/property-descriptors-in":"0lK","@stdlib/utils/property-descriptors":"0lL","@stdlib/utils/property-names-in":"0lM","@stdlib/utils/property-names":"0lN","@stdlib/utils/property-symbols-in":"0lO","@stdlib/utils/property-symbols":"0lP","@stdlib/utils/push":"0lQ","@stdlib/utils/real-max":"0lR","@stdlib/utils/real-min":"0lS","@stdlib/utils/reduce-right":"0lT","@stdlib/utils/reduce":"0lU","@stdlib/utils/reduce2d":"0lV","@stdlib/utils/regexp-from-string":"0lW","@stdlib/utils/reject-arguments":"0lX","@stdlib/utils/reorder-arguments":"0lY","@stdlib/utils/reverse-arguments":"0lZ","@stdlib/utils/safe-int-max":"0la","@stdlib/utils/safe-int-min":"0lb","@stdlib/utils/shift":"0lc","@stdlib/utils/size-of":"0ld","@stdlib/utils/some-by-right":"0le","@stdlib/utils/some-by":"0lf","@stdlib/utils/some":"0lg","@stdlib/utils/stack":"0lh","@stdlib/utils/tabulate-by":"0li","@stdlib/utils/tabulate":"0lj","@stdlib/utils/timeit":"0lk","@stdlib/utils/try-catch":"0ll","@stdlib/utils/try-function":"0lm","@stdlib/utils/try-require":"0ln","@stdlib/utils/try-then":"0lo","@stdlib/utils/type-max":"0lp","@stdlib/utils/type-min":"0lq","@stdlib/utils/type-of":"0lr","@stdlib/utils/uncapitalize-keys":"0ls","@stdlib/utils/uncurry-right":"0lt","@stdlib/utils/uncurry":"0lu","@stdlib/utils/unshift":"0lv","@stdlib/utils/until-each-right":"0lw","@stdlib/utils/until-each":"0lx","@stdlib/utils/until":"0ly","@stdlib/utils/unzip":"0lz","@stdlib/utils/uppercase-keys":"0m0","@stdlib/utils/values-in":"0m1","@stdlib/utils/values":"0m2","@stdlib/utils/while-each-right":"0m3","@stdlib/utils/while-each":"0m4","@stdlib/utils/while":"0m5","@stdlib/utils/writable-properties-in":"0m6","@stdlib/utils/writable-properties":"0m7","@stdlib/utils/writable-property-names-in":"0m8","@stdlib/utils/writable-property-names":"0m9","@stdlib/utils/writable-property-symbols-in":"0mA","@stdlib/utils/writable-property-symbols":"0mB","@stdlib/utils/zip":"0mC"}
},{}],36:[function(require,module,exports){
module.exports={"@stdlib/array-base-arraylike2object":"000","@stdlib/array-base-copy":"001","@stdlib/array-base-filled-by":"002","@stdlib/array-base-filled":"003","@stdlib/array-base-incrspace":"004","@stdlib/array-base-linspace":"005","@stdlib/array-base-logspace":"006","@stdlib/array-base-ones":"007","@stdlib/array-base":"008","@stdlib/array-base-unitspace":"009","@stdlib/array-base-zeros":"00A","@stdlib/array-buffer":"00B","@stdlib/array-complex128":"00C","@stdlib/array-complex64":"00D","@stdlib/array-convert-same":"00E","@stdlib/array-convert":"00F","@stdlib/array-ctors":"00G","@stdlib/array-dataview":"00H","@stdlib/array-datespace":"00I","@stdlib/array-dtype":"00J","@stdlib/array-dtypes":"00K","@stdlib/array-filled-by":"00L","@stdlib/array-filled":"00M","@stdlib/array-float32":"00N","@stdlib/array-float64":"00O","@stdlib/array-from-iterator":"00P","@stdlib/array-full-like":"00Q","@stdlib/array-full":"00R","@stdlib/array-incrspace":"00S","@stdlib/array-int16":"00T","@stdlib/array-int32":"00U","@stdlib/array-int8":"00V","@stdlib/array-linspace":"00W","@stdlib/array-logspace":"00X","@stdlib/array-min-dtype":"00Y","@stdlib/array-next-dtype":"00Z","@stdlib/array-ones-like":"00a","@stdlib/array-ones":"00b","@stdlib/array":"00c","@stdlib/array-pool":"00d","@stdlib/array-promotion-rules":"00e","@stdlib/array-reviver":"00f","@stdlib/array-safe-casts":"00g","@stdlib/array-same-kind-casts":"00h","@stdlib/array-shape":"00i","@stdlib/array-shared-buffer":"00j","@stdlib/array-to-circular-iterator":"00k","@stdlib/array-to-iterator-right":"00l","@stdlib/array-to-iterator":"00m","@stdlib/array-to-json":"00n","@stdlib/array-to-sparse-iterator-right":"00o","@stdlib/array-to-sparse-iterator":"00p","@stdlib/array-to-strided-iterator":"00q","@stdlib/array-to-view-iterator-right":"00r","@stdlib/array-to-view-iterator":"00s","@stdlib/array-typed-complex-ctors":"00t","@stdlib/array-typed-complex-dtypes":"00u","@stdlib/array-typed-complex":"00v","@stdlib/array-typed-ctors":"00w","@stdlib/array-typed-dtypes":"00x","@stdlib/array-typed-float-ctors":"00y","@stdlib/array-typed-float-dtypes":"00z","@stdlib/array-typed-integer-ctors":"010","@stdlib/array-typed-integer-dtypes":"011","@stdlib/array-typed-real-ctors":"012","@stdlib/array-typed-real-dtypes":"013","@stdlib/array-typed-real-float-ctors":"014","@stdlib/array-typed-real-float-dtypes":"015","@stdlib/array-typed-real":"016","@stdlib/array-typed-signed-integer-ctors":"017","@stdlib/array-typed-signed-integer-dtypes":"018","@stdlib/array-typed-unsigned-integer-ctors":"019","@stdlib/array-typed-unsigned-integer-dtypes":"01A","@stdlib/array-typed":"01B","@stdlib/array-uint16":"01C","@stdlib/array-uint32":"01D","@stdlib/array-uint8":"01E","@stdlib/array-uint8c":"01F","@stdlib/array-zeros-like":"01G","@stdlib/array-zeros":"01H","@stdlib/assert-contains":"01I","@stdlib/assert-deep-equal":"01J","@stdlib/assert-deep-has-own-property":"01K","@stdlib/assert-deep-has-property":"01L","@stdlib/assert-has-arraybuffer-support":"01M","@stdlib/assert-has-arrow-function-support":"01N","@stdlib/assert-has-async-await-support":"01O","@stdlib/assert-has-async-iterator-symbol-support":"01P","@stdlib/assert-has-bigint-support":"01Q","@stdlib/assert-has-bigint64array-support":"01R","@stdlib/assert-has-biguint64array-support":"01S","@stdlib/assert-has-class-support":"01T","@stdlib/assert-has-dataview-support":"01U","@stdlib/assert-has-define-properties-support":"01V","@stdlib/assert-has-define-property-support":"01W","@stdlib/assert-has-float32array-support":"01X","@stdlib/assert-has-float64array-support":"01Y","@stdlib/assert-has-function-name-support":"01Z","@stdlib/assert-has-generator-support":"01a","@stdlib/assert-has-globalthis-support":"01b","@stdlib/assert-has-int16array-support":"01c","@stdlib/assert-has-int32array-support":"01d","@stdlib/assert-has-int8array-support":"01e","@stdlib/assert-has-iterator-symbol-support":"01f","@stdlib/assert-has-map-support":"01g","@stdlib/assert-has-node-buffer-support":"01h","@stdlib/assert-has-own-property":"01i","@stdlib/assert-has-property":"01j","@stdlib/assert-has-proxy-support":"01k","@stdlib/assert-has-set-support":"01l","@stdlib/assert-has-sharedarraybuffer-support":"01m","@stdlib/assert-has-symbol-support":"01n","@stdlib/assert-has-tostringtag-support":"01o","@stdlib/assert-has-uint16array-support":"01p","@stdlib/assert-has-uint32array-support":"01q","@stdlib/assert-has-uint8array-support":"01r","@stdlib/assert-has-uint8clampedarray-support":"01s","@stdlib/assert-has-utf16-surrogate-pair-at":"01t","@stdlib/assert-has-wasm-support":"01u","@stdlib/assert-has-weakmap-support":"01v","@stdlib/assert-has-weakset-support":"01w","@stdlib/assert-instance-of":"01x","@stdlib/assert-is-absolute-http-uri":"01y","@stdlib/assert-is-absolute-path":"01z","@stdlib/assert-is-absolute-uri":"020","@stdlib/assert-is-accessor-property-in":"021","@stdlib/assert-is-accessor-property":"022","@stdlib/assert-is-alphagram":"023","@stdlib/assert-is-alphanumeric":"024","@stdlib/assert-is-anagram":"025","@stdlib/assert-is-arguments":"026","@stdlib/assert-is-array-array":"027","@stdlib/assert-is-array-length":"028","@stdlib/assert-is-array-like-object":"029","@stdlib/assert-is-array-like":"02A","@stdlib/assert-is-array":"02B","@stdlib/assert-is-arraybuffer-view":"02C","@stdlib/assert-is-arraybuffer":"02D","@stdlib/assert-is-arrow-function":"02E","@stdlib/assert-is-ascii":"02F","@stdlib/assert-is-between-array":"02G","@stdlib/assert-is-between":"02H","@stdlib/assert-is-big-endian":"02I","@stdlib/assert-is-bigint":"02J","@stdlib/assert-is-bigint64array":"02K","@stdlib/assert-is-biguint64array":"02L","@stdlib/assert-is-binary-string":"02M","@stdlib/assert-is-boolean-array":"02N","@stdlib/assert-is-boolean":"02O","@stdlib/assert-is-boxed-primitive":"02P","@stdlib/assert-is-browser":"02Q","@stdlib/assert-is-buffer":"02R","@stdlib/assert-is-capitalized":"02S","@stdlib/assert-is-centrosymmetric-matrix":"02T","@stdlib/assert-is-circular-array":"02U","@stdlib/assert-is-circular-plain-object":"02V","@stdlib/assert-is-circular":"02W","@stdlib/assert-is-class":"02X","@stdlib/assert-is-collection":"02Y","@stdlib/assert-is-complex-like":"02Z","@stdlib/assert-is-complex-typed-array-like":"02a","@stdlib/assert-is-complex-typed-array":"02b","@stdlib/assert-is-complex":"02c","@stdlib/assert-is-complex128":"02d","@stdlib/assert-is-complex128array":"02e","@stdlib/assert-is-complex64":"02f","@stdlib/assert-is-complex64array":"02g","@stdlib/assert-is-composite":"02h","@stdlib/assert-is-configurable-property-in":"02i","@stdlib/assert-is-configurable-property":"02j","@stdlib/assert-is-cube-number":"02k","@stdlib/assert-is-darwin":"02l","@stdlib/assert-is-data-property-in":"02m","@stdlib/assert-is-data-property":"02n","@stdlib/assert-is-dataview":"02o","@stdlib/assert-is-date-object-array":"02p","@stdlib/assert-is-date-object":"02q","@stdlib/assert-is-digit-string":"02r","@stdlib/assert-is-docker":"02s","@stdlib/assert-is-electron-main":"02t","@stdlib/assert-is-electron-renderer":"02u","@stdlib/assert-is-electron":"02v","@stdlib/assert-is-email-address":"02w","@stdlib/assert-is-empty-array-like-object":"02x","@stdlib/assert-is-empty-array":"02y","@stdlib/assert-is-empty-collection":"02z","@stdlib/assert-is-empty-object":"030","@stdlib/assert-is-empty-string":"031","@stdlib/assert-is-enumerable-property-in":"032","@stdlib/assert-is-enumerable-property":"033","@stdlib/assert-is-error":"034","@stdlib/assert-is-eval-error":"035","@stdlib/assert-is-even":"036","@stdlib/assert-is-falsy-array":"037","@stdlib/assert-is-falsy":"038","@stdlib/assert-is-finite-array":"039","@stdlib/assert-is-finite":"03A","@stdlib/assert-is-float32array":"03B","@stdlib/assert-is-float32matrix-like":"03C","@stdlib/assert-is-float32ndarray-like":"03D","@stdlib/assert-is-float32vector-like":"03E","@stdlib/assert-is-float64array":"03F","@stdlib/assert-is-float64matrix-like":"03G","@stdlib/assert-is-float64ndarray-like":"03H","@stdlib/assert-is-float64vector-like":"03I","@stdlib/assert-is-function-array":"03J","@stdlib/assert-is-function":"03K","@stdlib/assert-is-generator-object-like":"03L","@stdlib/assert-is-generator-object":"03M","@stdlib/assert-is-gzip-buffer":"03N","@stdlib/assert-is-hex-string":"03O","@stdlib/assert-is-infinite":"03P","@stdlib/assert-is-inherited-property":"03Q","@stdlib/assert-is-int16array":"03R","@stdlib/assert-is-int32array":"03S","@stdlib/assert-is-int8array":"03T","@stdlib/assert-is-integer-array":"03U","@stdlib/assert-is-integer":"03V","@stdlib/assert-is-iterable-like":"03W","@stdlib/assert-is-iterator-like":"03X","@stdlib/assert-is-json":"03Y","@stdlib/assert-is-leap-year":"03Z","@stdlib/assert-is-little-endian":"03a","@stdlib/assert-is-localhost":"03b","@stdlib/assert-is-lowercase":"03c","@stdlib/assert-is-matrix-like":"03d","@stdlib/assert-is-method-in":"03e","@stdlib/assert-is-method":"03f","@stdlib/assert-is-mobile":"03g","@stdlib/assert-is-named-typed-tuple-like":"03h","@stdlib/assert-is-nan-array":"03i","@stdlib/assert-is-nan":"03j","@stdlib/assert-is-native-function":"03k","@stdlib/assert-is-ndarray-like":"03l","@stdlib/assert-is-negative-integer-array":"03m","@stdlib/assert-is-negative-integer":"03n","@stdlib/assert-is-negative-number-array":"03o","@stdlib/assert-is-negative-number":"03p","@stdlib/assert-is-negative-zero":"03q","@stdlib/assert-is-node-builtin":"03r","@stdlib/assert-is-node-duplex-stream-like":"03s","@stdlib/assert-is-node-readable-stream-like":"03t","@stdlib/assert-is-node-repl":"03u","@stdlib/assert-is-node-stream-like":"03v","@stdlib/assert-is-node-transform-stream-like":"03w","@stdlib/assert-is-node-writable-stream-like":"03x","@stdlib/assert-is-node":"03y","@stdlib/assert-is-nonconfigurable-property-in":"03z","@stdlib/assert-is-nonconfigurable-property":"040","@stdlib/assert-is-nonenumerable-property-in":"041","@stdlib/assert-is-nonenumerable-property":"042","@stdlib/assert-is-nonnegative-integer-array":"043","@stdlib/assert-is-nonnegative-integer":"044","@stdlib/assert-is-nonnegative-number-array":"045","@stdlib/assert-is-nonnegative-number":"046","@stdlib/assert-is-nonpositive-integer-array":"047","@stdlib/assert-is-nonpositive-integer":"048","@stdlib/assert-is-nonpositive-number-array":"049","@stdlib/assert-is-nonpositive-number":"04A","@stdlib/assert-is-nonsymmetric-matrix":"04B","@stdlib/assert-is-null-array":"04C","@stdlib/assert-is-null":"04D","@stdlib/assert-is-number-array":"04E","@stdlib/assert-is-number":"04F","@stdlib/assert-is-numeric-array":"04G","@stdlib/assert-is-object-array":"04H","@stdlib/assert-is-object-like":"04I","@stdlib/assert-is-object":"04J","@stdlib/assert-is-odd":"04K","@stdlib/assert-is-persymmetric-matrix":"04L","@stdlib/assert-is-plain-object-array":"04M","@stdlib/assert-is-plain-object":"04N","@stdlib/assert-is-positive-integer-array":"04O","@stdlib/assert-is-positive-integer":"04P","@stdlib/assert-is-positive-number-array":"04Q","@stdlib/assert-is-positive-number":"04R","@stdlib/assert-is-positive-zero":"04S","@stdlib/assert-is-prime":"04T","@stdlib/assert-is-primitive-array":"04U","@stdlib/assert-is-primitive":"04V","@stdlib/assert-is-prng-like":"04W","@stdlib/assert-is-probability-array":"04X","@stdlib/assert-is-probability":"04Y","@stdlib/assert-is-property-key":"04Z","@stdlib/assert-is-prototype-of":"04a","@stdlib/assert-is-range-error":"04b","@stdlib/assert-is-read-only-property-in":"04c","@stdlib/assert-is-read-only-property":"04d","@stdlib/assert-is-read-write-property-in":"04e","@stdlib/assert-is-read-write-property":"04f","@stdlib/assert-is-readable-property-in":"04g","@stdlib/assert-is-readable-property":"04h","@stdlib/assert-is-reference-error":"04i","@stdlib/assert-is-regexp-string":"04j","@stdlib/assert-is-regexp":"04k","@stdlib/assert-is-relative-path":"04l","@stdlib/assert-is-relative-uri":"04m","@stdlib/assert-is-safe-integer-array":"04n","@stdlib/assert-is-safe-integer":"04o","@stdlib/assert-is-same-native-class":"04p","@stdlib/assert-is-same-type":"04q","@stdlib/assert-is-same-value-zero":"04r","@stdlib/assert-is-same-value":"04s","@stdlib/assert-is-sharedarraybuffer":"04t","@stdlib/assert-is-skew-centrosymmetric-matrix":"04u","@stdlib/assert-is-skew-persymmetric-matrix":"04v","@stdlib/assert-is-skew-symmetric-matrix":"04w","@stdlib/assert-is-square-matrix":"04x","@stdlib/assert-is-square-number":"04y","@stdlib/assert-is-square-triangular-number":"04z","@stdlib/assert-is-strict-equal":"050","@stdlib/assert-is-string-array":"051","@stdlib/assert-is-string":"052","@stdlib/assert-is-symbol-array":"053","@stdlib/assert-is-symbol":"054","@stdlib/assert-is-symmetric-matrix":"055","@stdlib/assert-is-syntax-error":"056","@stdlib/assert-is-touch-device":"057","@stdlib/assert-is-triangular-number":"058","@stdlib/assert-is-truthy-array":"059","@stdlib/assert-is-truthy":"05A","@stdlib/assert-is-type-error":"05B","@stdlib/assert-is-typed-array-length":"05C","@stdlib/assert-is-typed-array-like":"05D","@stdlib/assert-is-typed-array":"05E","@stdlib/assert-is-uint16array":"05F","@stdlib/assert-is-uint32array":"05G","@stdlib/assert-is-uint8array":"05H","@stdlib/assert-is-uint8clampedarray":"05I","@stdlib/assert-is-unc-path":"05J","@stdlib/assert-is-undefined-or-null":"05K","@stdlib/assert-is-undefined":"05L","@stdlib/assert-is-unity-probability-array":"05M","@stdlib/assert-is-uppercase":"05N","@stdlib/assert-is-uri-error":"05O","@stdlib/assert-is-uri":"05P","@stdlib/assert-is-vector-like":"05Q","@stdlib/assert-is-web-worker":"05R","@stdlib/assert-is-whitespace":"05S","@stdlib/assert-is-windows":"05T","@stdlib/assert-is-writable-property-in":"05U","@stdlib/assert-is-writable-property":"05V","@stdlib/assert-is-write-only-property-in":"05W","@stdlib/assert-is-write-only-property":"05X","@stdlib/assert":"05Y","@stdlib/assert-tools-array-function":"05Z","@stdlib/assert-tools-array-like-function":"05a","@stdlib/assert-tools":"05b","@stdlib/assert-tools-typed-array-function":"05c","@stdlib/bench-harness":"05d","@stdlib/bench":"05e","@stdlib/bigint-ctor":"05f","@stdlib/bigint":"05g","@stdlib/blas-base-ccopy":"05h","@stdlib/blas-base-cswap":"05i","@stdlib/blas-base-dasum":"05j","@stdlib/blas-base-daxpy":"05k","@stdlib/blas-base-dcopy":"05l","@stdlib/blas-base-ddot":"05m","@stdlib/blas-base-dnrm2":"05n","@stdlib/blas-base-dscal":"05o","@stdlib/blas-base-dsdot":"05p","@stdlib/blas-base-dswap":"05q","@stdlib/blas-base-gasum":"05r","@stdlib/blas-base-gaxpy":"05s","@stdlib/blas-base-gcopy":"05t","@stdlib/blas-base-gdot":"05u","@stdlib/blas-base-gnrm2":"05v","@stdlib/blas-base-gscal":"05w","@stdlib/blas-base-gswap":"05x","@stdlib/blas-base":"05y","@stdlib/blas-base-sasum":"05z","@stdlib/blas-base-saxpy":"060","@stdlib/blas-base-scopy":"061","@stdlib/blas-base-sdot":"062","@stdlib/blas-base-sdsdot":"063","@stdlib/blas-base-snrm2":"064","@stdlib/blas-base-sscal":"065","@stdlib/blas-base-sswap":"066","@stdlib/blas-ddot":"067","@stdlib/blas-dswap":"068","@stdlib/blas-ext-base-dapx":"069","@stdlib/blas-ext-base-dapxsum":"06A","@stdlib/blas-ext-base-dapxsumkbn":"06B","@stdlib/blas-ext-base-dapxsumkbn2":"06C","@stdlib/blas-ext-base-dapxsumors":"06D","@stdlib/blas-ext-base-dapxsumpw":"06E","@stdlib/blas-ext-base-dasumpw":"06F","@stdlib/blas-ext-base-dcusum":"06G","@stdlib/blas-ext-base-dcusumkbn":"06H","@stdlib/blas-ext-base-dcusumkbn2":"06I","@stdlib/blas-ext-base-dcusumors":"06J","@stdlib/blas-ext-base-dcusumpw":"06K","@stdlib/blas-ext-base-dfill":"06L","@stdlib/blas-ext-base-dnanasum":"06M","@stdlib/blas-ext-base-dnanasumors":"06N","@stdlib/blas-ext-base-dnannsum":"06O","@stdlib/blas-ext-base-dnannsumkbn":"06P","@stdlib/blas-ext-base-dnannsumkbn2":"06Q","@stdlib/blas-ext-base-dnannsumors":"06R","@stdlib/blas-ext-base-dnannsumpw":"06S","@stdlib/blas-ext-base-dnansum":"06T","@stdlib/blas-ext-base-dnansumkbn":"06U","@stdlib/blas-ext-base-dnansumkbn2":"06V","@stdlib/blas-ext-base-dnansumors":"06W","@stdlib/blas-ext-base-dnansumpw":"06X","@stdlib/blas-ext-base-drev":"06Y","@stdlib/blas-ext-base-dsapxsum":"06Z","@stdlib/blas-ext-base-dsapxsumpw":"06a","@stdlib/blas-ext-base-dsnannsumors":"06b","@stdlib/blas-ext-base-dsnansum":"06c","@stdlib/blas-ext-base-dsnansumors":"06d","@stdlib/blas-ext-base-dsnansumpw":"06e","@stdlib/blas-ext-base-dsort2hp":"06f","@stdlib/blas-ext-base-dsort2ins":"06g","@stdlib/blas-ext-base-dsort2sh":"06h","@stdlib/blas-ext-base-dsorthp":"06i","@stdlib/blas-ext-base-dsortins":"06j","@stdlib/blas-ext-base-dsortsh":"06k","@stdlib/blas-ext-base-dssum":"06l","@stdlib/blas-ext-base-dssumors":"06m","@stdlib/blas-ext-base-dssumpw":"06n","@stdlib/blas-ext-base-dsum":"06o","@stdlib/blas-ext-base-dsumkbn":"06p","@stdlib/blas-ext-base-dsumkbn2":"06q","@stdlib/blas-ext-base-dsumors":"06r","@stdlib/blas-ext-base-dsumpw":"06s","@stdlib/blas-ext-base-gapx":"06t","@stdlib/blas-ext-base-gapxsum":"06u","@stdlib/blas-ext-base-gapxsumkbn":"06v","@stdlib/blas-ext-base-gapxsumkbn2":"06w","@stdlib/blas-ext-base-gapxsumors":"06x","@stdlib/blas-ext-base-gapxsumpw":"06y","@stdlib/blas-ext-base-gasumpw":"06z","@stdlib/blas-ext-base-gcusum":"070","@stdlib/blas-ext-base-gcusumkbn":"071","@stdlib/blas-ext-base-gcusumkbn2":"072","@stdlib/blas-ext-base-gcusumors":"073","@stdlib/blas-ext-base-gcusumpw":"074","@stdlib/blas-ext-base-gfill-by":"075","@stdlib/blas-ext-base-gfill":"076","@stdlib/blas-ext-base-gnannsumkbn":"077","@stdlib/blas-ext-base-gnansum":"078","@stdlib/blas-ext-base-gnansumkbn":"079","@stdlib/blas-ext-base-gnansumkbn2":"07A","@stdlib/blas-ext-base-gnansumors":"07B","@stdlib/blas-ext-base-gnansumpw":"07C","@stdlib/blas-ext-base-grev":"07D","@stdlib/blas-ext-base-gsort2hp":"07E","@stdlib/blas-ext-base-gsort2ins":"07F","@stdlib/blas-ext-base-gsort2sh":"07G","@stdlib/blas-ext-base-gsorthp":"07H","@stdlib/blas-ext-base-gsortins":"07I","@stdlib/blas-ext-base-gsortsh":"07J","@stdlib/blas-ext-base-gsum":"07K","@stdlib/blas-ext-base-gsumkbn":"07L","@stdlib/blas-ext-base-gsumkbn2":"07M","@stdlib/blas-ext-base-gsumors":"07N","@stdlib/blas-ext-base-gsumpw":"07O","@stdlib/blas-ext-base":"07P","@stdlib/blas-ext-base-sapx":"07Q","@stdlib/blas-ext-base-sapxsum":"07R","@stdlib/blas-ext-base-sapxsumkbn":"07S","@stdlib/blas-ext-base-sapxsumkbn2":"07T","@stdlib/blas-ext-base-sapxsumors":"07U","@stdlib/blas-ext-base-sapxsumpw":"07V","@stdlib/blas-ext-base-sasumpw":"07W","@stdlib/blas-ext-base-scusum":"07X","@stdlib/blas-ext-base-scusumkbn":"07Y","@stdlib/blas-ext-base-scusumkbn2":"07Z","@stdlib/blas-ext-base-scusumors":"07a","@stdlib/blas-ext-base-scusumpw":"07b","@stdlib/blas-ext-base-sdsapxsum":"07c","@stdlib/blas-ext-base-sdsapxsumpw":"07d","@stdlib/blas-ext-base-sdsnansum":"07e","@stdlib/blas-ext-base-sdsnansumpw":"07f","@stdlib/blas-ext-base-sdssum":"07g","@stdlib/blas-ext-base-sdssumpw":"07h","@stdlib/blas-ext-base-sfill":"07i","@stdlib/blas-ext-base-snansum":"07j","@stdlib/blas-ext-base-snansumkbn":"07k","@stdlib/blas-ext-base-snansumkbn2":"07l","@stdlib/blas-ext-base-snansumors":"07m","@stdlib/blas-ext-base-snansumpw":"07n","@stdlib/blas-ext-base-srev":"07o","@stdlib/blas-ext-base-ssort2hp":"07p","@stdlib/blas-ext-base-ssort2ins":"07q","@stdlib/blas-ext-base-ssort2sh":"07r","@stdlib/blas-ext-base-ssorthp":"07s","@stdlib/blas-ext-base-ssortins":"07t","@stdlib/blas-ext-base-ssortsh":"07u","@stdlib/blas-ext-base-ssum":"07v","@stdlib/blas-ext-base-ssumkbn":"07w","@stdlib/blas-ext-base-ssumkbn2":"07x","@stdlib/blas-ext-base-ssumors":"07y","@stdlib/blas-ext-base-ssumpw":"07z","@stdlib/blas-ext":"080","@stdlib/blas-gdot":"081","@stdlib/blas-gswap":"082","@stdlib/blas":"083","@stdlib/blas-sdot":"084","@stdlib/blas-sswap":"085","@stdlib/buffer-alloc-unsafe":"086","@stdlib/buffer-ctor":"087","@stdlib/buffer-from-array":"088","@stdlib/buffer-from-arraybuffer":"089","@stdlib/buffer-from-buffer":"08A","@stdlib/buffer-from-string":"08B","@stdlib/buffer":"08C","@stdlib/buffer-reviver":"08D","@stdlib/buffer-to-json":"08E","@stdlib/cli-ctor":"08F","@stdlib/cli":"08G","@stdlib/complex-base-wrap-function":"08H","@stdlib/complex-cmplx":"08I","@stdlib/complex-conj":"08J","@stdlib/complex-conjf":"08K","@stdlib/complex-ctors":"08L","@stdlib/complex-dtype":"08M","@stdlib/complex-dtypes":"08N","@stdlib/complex-float32":"08O","@stdlib/complex-float64":"08P","@stdlib/complex-imag":"08Q","@stdlib/complex-imagf":"08R","@stdlib/complex":"08S","@stdlib/complex-promotion-rules":"08T","@stdlib/complex-real":"08U","@stdlib/complex-realf":"08V","@stdlib/complex-reim":"08W","@stdlib/complex-reimf":"08X","@stdlib/complex-reviver-float32":"08Y","@stdlib/complex-reviver-float64":"08Z","@stdlib/complex-reviver":"08a","@stdlib/constants-array-max-array-length":"08b","@stdlib/constants-array-max-typed-array-length":"08c","@stdlib/constants-array":"08d","@stdlib/constants-complex128-num-bytes":"08e","@stdlib/constants-complex128":"08f","@stdlib/constants-complex64-num-bytes":"08g","@stdlib/constants-complex64":"08h","@stdlib/constants-float16-cbrt-eps":"08i","@stdlib/constants-float16-eps":"08j","@stdlib/constants-float16-exponent-bias":"08k","@stdlib/constants-float16-max-safe-integer":"08l","@stdlib/constants-float16-max":"08m","@stdlib/constants-float16-min-safe-integer":"08n","@stdlib/constants-float16-ninf":"08o","@stdlib/constants-float16-num-bytes":"08p","@stdlib/constants-float16":"08q","@stdlib/constants-float16-pinf":"08r","@stdlib/constants-float16-precision":"08s","@stdlib/constants-float16-smallest-normal":"08t","@stdlib/constants-float16-smallest-subnormal":"08u","@stdlib/constants-float16-sqrt-eps":"08v","@stdlib/constants-float32-cbrt-eps":"08w","@stdlib/constants-float32-eps":"08x","@stdlib/constants-float32-exponent-bias":"08y","@stdlib/constants-float32-max-safe-integer":"08z","@stdlib/constants-float32-max":"090","@stdlib/constants-float32-min-safe-integer":"091","@stdlib/constants-float32-ninf":"092","@stdlib/constants-float32-num-bytes":"093","@stdlib/constants-float32":"094","@stdlib/constants-float32-pinf":"095","@stdlib/constants-float32-precision":"096","@stdlib/constants-float32-smallest-normal":"097","@stdlib/constants-float32-smallest-subnormal":"098","@stdlib/constants-float32-sqrt-eps":"099","@stdlib/constants-float64-apery":"09A","@stdlib/constants-float64-catalan":"09B","@stdlib/constants-float64-cbrt-eps":"09C","@stdlib/constants-float64-e":"09D","@stdlib/constants-float64-eps":"09E","@stdlib/constants-float64-eulergamma":"09F","@stdlib/constants-float64-exponent-bias":"09G","@stdlib/constants-float64-fourth-pi":"09H","@stdlib/constants-float64-fourth-root-eps":"09I","@stdlib/constants-float64-gamma-lanczos-g":"09J","@stdlib/constants-float64-glaisher-kinkelin":"09K","@stdlib/constants-float64-half-ln-two":"09L","@stdlib/constants-float64-half-pi":"09M","@stdlib/constants-float64-high-word-exponent-mask":"09N","@stdlib/constants-float64-high-word-significand-mask":"09O","@stdlib/constants-float64-ln-half":"09P","@stdlib/constants-float64-ln-pi":"09Q","@stdlib/constants-float64-ln-sqrt-two-pi":"09R","@stdlib/constants-float64-ln-ten":"09S","@stdlib/constants-float64-ln-two-pi":"09T","@stdlib/constants-float64-ln-two":"09U","@stdlib/constants-float64-log10-e":"09V","@stdlib/constants-float64-log2-e":"09W","@stdlib/constants-float64-max-base10-exponent-subnormal":"09X","@stdlib/constants-float64-max-base10-exponent":"09Y","@stdlib/constants-float64-max-base2-exponent-subnormal":"09Z","@stdlib/constants-float64-max-base2-exponent":"09a","@stdlib/constants-float64-max-ln":"09b","@stdlib/constants-float64-max-safe-fibonacci":"09c","@stdlib/constants-float64-max-safe-integer":"09d","@stdlib/constants-float64-max-safe-lucas":"09e","@stdlib/constants-float64-max-safe-nth-fibonacci":"09f","@stdlib/constants-float64-max-safe-nth-lucas":"09g","@stdlib/constants-float64-max":"09h","@stdlib/constants-float64-min-base10-exponent-subnormal":"09i","@stdlib/constants-float64-min-base10-exponent":"09j","@stdlib/constants-float64-min-base2-exponent-subnormal":"09k","@stdlib/constants-float64-min-base2-exponent":"09l","@stdlib/constants-float64-min-ln":"09m","@stdlib/constants-float64-min-safe-integer":"09n","@stdlib/constants-float64-ninf":"09o","@stdlib/constants-float64-num-bytes":"09p","@stdlib/constants-float64":"09q","@stdlib/constants-float64-phi":"09r","@stdlib/constants-float64-pi-squared":"09s","@stdlib/constants-float64-pi":"09t","@stdlib/constants-float64-pinf":"09u","@stdlib/constants-float64-precision":"09v","@stdlib/constants-float64-smallest-normal":"09w","@stdlib/constants-float64-smallest-subnormal":"09x","@stdlib/constants-float64-sqrt-eps":"09y","@stdlib/constants-float64-sqrt-half-pi":"09z","@stdlib/constants-float64-sqrt-half":"0A0","@stdlib/constants-float64-sqrt-phi":"0A1","@stdlib/constants-float64-sqrt-pi":"0A2","@stdlib/constants-float64-sqrt-three":"0A3","@stdlib/constants-float64-sqrt-two-pi":"0A4","@stdlib/constants-float64-sqrt-two":"0A5","@stdlib/constants-float64-two-pi":"0A6","@stdlib/constants-int16-max":"0A7","@stdlib/constants-int16-min":"0A8","@stdlib/constants-int16-num-bytes":"0A9","@stdlib/constants-int16":"0AA","@stdlib/constants-int32-max":"0AB","@stdlib/constants-int32-min":"0AC","@stdlib/constants-int32-num-bytes":"0AD","@stdlib/constants-int32":"0AE","@stdlib/constants-int8-max":"0AF","@stdlib/constants-int8-min":"0AG","@stdlib/constants-int8-num-bytes":"0AH","@stdlib/constants-int8":"0AI","@stdlib/constants":"0AJ","@stdlib/constants-path-delimiter-posix":"0AK","@stdlib/constants-path-delimiter-win32":"0AL","@stdlib/constants-path-delimiter":"0AM","@stdlib/constants-path":"0AN","@stdlib/constants-path-sep-posix":"0AO","@stdlib/constants-path-sep-win32":"0AP","@stdlib/constants-path-sep":"0AQ","@stdlib/constants-time-hours-in-day":"0AR","@stdlib/constants-time-hours-in-week":"0AS","@stdlib/constants-time-milliseconds-in-day":"0AT","@stdlib/constants-time-milliseconds-in-hour":"0AU","@stdlib/constants-time-milliseconds-in-minute":"0AV","@stdlib/constants-time-milliseconds-in-second":"0AW","@stdlib/constants-time-milliseconds-in-week":"0AX","@stdlib/constants-time-minutes-in-day":"0AY","@stdlib/constants-time-minutes-in-hour":"0AZ","@stdlib/constants-time-minutes-in-week":"0Aa","@stdlib/constants-time-months-in-year":"0Ab","@stdlib/constants-time":"0Ac","@stdlib/constants-time-seconds-in-day":"0Ad","@stdlib/constants-time-seconds-in-hour":"0Ae","@stdlib/constants-time-seconds-in-minute":"0Af","@stdlib/constants-time-seconds-in-week":"0Ag","@stdlib/constants-uint16-max":"0Ah","@stdlib/constants-uint16-num-bytes":"0Ai","@stdlib/constants-uint16":"0Aj","@stdlib/constants-uint32-max":"0Ak","@stdlib/constants-uint32-num-bytes":"0Al","@stdlib/constants-uint32":"0Am","@stdlib/constants-uint8-max":"0An","@stdlib/constants-uint8-num-bytes":"0Ao","@stdlib/constants-uint8":"0Ap","@stdlib/constants-unicode-max-bmp":"0Aq","@stdlib/constants-unicode-max":"0Ar","@stdlib/constants-unicode":"0As","@stdlib/datasets-afinn-111":"0At","@stdlib/datasets-afinn-96":"0Au","@stdlib/datasets-anscombes-quartet":"0Av","@stdlib/datasets-berndt-cps-wages-1985":"0Aw","@stdlib/datasets-cdc-nchs-us-births-1969-1988":"0Ax","@stdlib/datasets-cdc-nchs-us-births-1994-2003":"0Ay","@stdlib/datasets-cdc-nchs-us-infant-mortality-bw-1915-2013":"0Az","@stdlib/datasets-cmudict":"0B0","@stdlib/datasets-dale-chall-new":"0B1","@stdlib/datasets-emoji-code-picto":"0B2","@stdlib/datasets-emoji-picto-code":"0B3","@stdlib/datasets-emoji":"0B4","@stdlib/datasets-female-first-names-en":"0B5","@stdlib/datasets-fivethirtyeight-ffq":"0B6","@stdlib/datasets-frb-sf-wage-rigidity":"0B7","@stdlib/datasets-harrison-boston-house-prices-corrected":"0B8","@stdlib/datasets-harrison-boston-house-prices":"0B9","@stdlib/datasets-herndon-venus-semidiameters":"0BA","@stdlib/datasets-img-acanthus-mollis":"0BB","@stdlib/datasets-img-airplane-from-above":"0BC","@stdlib/datasets-img-allium-oreophilum":"0BD","@stdlib/datasets-img-black-canyon":"0BE","@stdlib/datasets-img-dust-bowl-home":"0BF","@stdlib/datasets-img-french-alpine-landscape":"0BG","@stdlib/datasets-img-locomotion-house-cat":"0BH","@stdlib/datasets-img-locomotion-nude-male":"0BI","@stdlib/datasets-img-march-pastoral":"0BJ","@stdlib/datasets-img-nagasaki-boats":"0BK","@stdlib/datasets-liu-negative-opinion-words-en":"0BL","@stdlib/datasets-liu-positive-opinion-words-en":"0BM","@stdlib/datasets-male-first-names-en":"0BN","@stdlib/datasets-minard-napoleons-march":"0BO","@stdlib/datasets-moby-dick":"0BP","@stdlib/datasets-month-names-en":"0BQ","@stdlib/datasets-nightingales-rose":"0BR","@stdlib/datasets-pace-boston-house-prices":"0BS","@stdlib/datasets":"0BT","@stdlib/datasets-primes-100k":"0BU","@stdlib/datasets-savoy-stopwords-fin":"0BV","@stdlib/datasets-savoy-stopwords-fr":"0BW","@stdlib/datasets-savoy-stopwords-ger":"0BX","@stdlib/datasets-savoy-stopwords-it":"0BY","@stdlib/datasets-savoy-stopwords-por":"0BZ","@stdlib/datasets-savoy-stopwords-sp":"0Ba","@stdlib/datasets-savoy-stopwords-swe":"0Bb","@stdlib/datasets-sotu":"0Bc","@stdlib/datasets-spache-revised":"0Bd","@stdlib/datasets-spam-assassin":"0Be","@stdlib/datasets-ssa-us-births-2000-2014":"0Bf","@stdlib/datasets-standard-card-deck":"0Bg","@stdlib/datasets-stopwords-en":"0Bh","@stdlib/datasets-suthaharan-multi-hop-sensor-network":"0Bi","@stdlib/datasets-suthaharan-single-hop-sensor-network":"0Bj","@stdlib/datasets-us-states-abbr":"0Bk","@stdlib/datasets-us-states-capitals-names":"0Bl","@stdlib/datasets-us-states-capitals":"0Bm","@stdlib/datasets-us-states-names-capitals":"0Bn","@stdlib/datasets-us-states-names":"0Bo","@stdlib/error":"0Bp","@stdlib/error-reviver":"0Bq","@stdlib/error-to-json":"0Br","@stdlib/error-tools-fmtprodmsg":"0Bs","@stdlib/error-tools-id2pkg":"0Bt","@stdlib/error-tools":"0Bu","@stdlib/error-tools-pkg2id":"0Bv","@stdlib/fs-close":"0Bw","@stdlib/fs-exists":"0Bx","@stdlib/fs-open":"0By","@stdlib/fs":"0Bz","@stdlib/fs-read-dir":"0C0","@stdlib/fs-read-file-list":"0C1","@stdlib/fs-read-file":"0C2","@stdlib/fs-read-json":"0C3","@stdlib/fs-read-wasm":"0C4","@stdlib/fs-rename":"0C5","@stdlib/fs-resolve-parent-path-by":"0C6","@stdlib/fs-resolve-parent-path":"0C7","@stdlib/fs-unlink":"0C8","@stdlib/fs-write-file":"0C9","@stdlib/iter-advance":"0CA","@stdlib/iter-any-by":"0CB","@stdlib/iter-any":"0CC","@stdlib/iter-concat":"0CD","@stdlib/iter-constant":"0CE","@stdlib/iter-counter":"0CF","@stdlib/iter-datespace":"0CG","@stdlib/iter-dedupe-by":"0CH","@stdlib/iter-dedupe":"0CI","@stdlib/iter-empty":"0CJ","@stdlib/iter-every-by":"0CK","@stdlib/iter-every":"0CL","@stdlib/iter-fill":"0CM","@stdlib/iter-filter-map":"0CN","@stdlib/iter-filter":"0CO","@stdlib/iter-first":"0CP","@stdlib/iter-flow":"0CQ","@stdlib/iter-for-each":"0CR","@stdlib/iter-head":"0CS","@stdlib/iter-incrspace":"0CT","@stdlib/iter-intersection-by-hash":"0CU","@stdlib/iter-intersection":"0CV","@stdlib/iter-last":"0CW","@stdlib/iter-length":"0CX","@stdlib/iter-linspace":"0CY","@stdlib/iter-logspace":"0CZ","@stdlib/iter-map":"0Ca","@stdlib/iter-mapn":"0Cb","@stdlib/iter-none-by":"0Cc","@stdlib/iter-none":"0Cd","@stdlib/iter-nth":"0Ce","@stdlib/iter":"0Cf","@stdlib/iter-pipeline-thunk":"0Cg","@stdlib/iter-pipeline":"0Ch","@stdlib/iter-pop":"0Ci","@stdlib/iter-push":"0Cj","@stdlib/iter-reject":"0Ck","@stdlib/iter-replicate-by":"0Cl","@stdlib/iter-replicate":"0Cm","@stdlib/iter-shift":"0Cn","@stdlib/iter-slice":"0Co","@stdlib/iter-some-by":"0Cp","@stdlib/iter-some":"0Cq","@stdlib/iter-step":"0Cr","@stdlib/iter-strided-by":"0Cs","@stdlib/iter-strided":"0Ct","@stdlib/iter-to-array-view-right":"0Cu","@stdlib/iter-to-array-view":"0Cv","@stdlib/iter-union":"0Cw","@stdlib/iter-unique-by-hash":"0Cx","@stdlib/iter-unique-by":"0Cy","@stdlib/iter-unique":"0Cz","@stdlib/iter-unitspace":"0D0","@stdlib/iter-unshift":"0D1","@stdlib/math-base-assert-int32-is-even":"0D2","@stdlib/math-base-assert-int32-is-odd":"0D3","@stdlib/math-base-assert-is-composite":"0D4","@stdlib/math-base-assert-is-coprime":"0D5","@stdlib/math-base-assert-is-even":"0D6","@stdlib/math-base-assert-is-finite":"0D7","@stdlib/math-base-assert-is-finitef":"0D8","@stdlib/math-base-assert-is-infinite":"0D9","@stdlib/math-base-assert-is-infinitef":"0DA","@stdlib/math-base-assert-is-integer":"0DB","@stdlib/math-base-assert-is-nan":"0DC","@stdlib/math-base-assert-is-nanf":"0DD","@stdlib/math-base-assert-is-negative-integer":"0DE","@stdlib/math-base-assert-is-negative-zero":"0DF","@stdlib/math-base-assert-is-negative-zerof":"0DG","@stdlib/math-base-assert-is-nonnegative-integer":"0DH","@stdlib/math-base-assert-is-nonpositive-integer":"0DI","@stdlib/math-base-assert-is-odd":"0DJ","@stdlib/math-base-assert-is-positive-integer":"0DK","@stdlib/math-base-assert-is-positive-zero":"0DL","@stdlib/math-base-assert-is-positive-zerof":"0DM","@stdlib/math-base-assert-is-prime":"0DN","@stdlib/math-base-assert-is-probability":"0DO","@stdlib/math-base-assert-is-safe-integer":"0DP","@stdlib/math-base-assert":"0DQ","@stdlib/math-base-assert-uint32-is-pow2":"0DR","@stdlib/math-base-napi-binary":"0DS","@stdlib/math-base-napi":"0DT","@stdlib/math-base-napi-ternary":"0DU","@stdlib/math-base-napi-unary":"0DV","@stdlib/math-base-ops-add":"0DW","@stdlib/math-base-ops-addf":"0DX","@stdlib/math-base-ops-cadd":"0DY","@stdlib/math-base-ops-caddf":"0DZ","@stdlib/math-base-ops-cdiv":"0Da","@stdlib/math-base-ops-cmul":"0Db","@stdlib/math-base-ops-cmulf":"0Dc","@stdlib/math-base-ops-cneg":"0Dd","@stdlib/math-base-ops-csub":"0De","@stdlib/math-base-ops-csubf":"0Df","@stdlib/math-base-ops-imul":"0Dg","@stdlib/math-base-ops-imuldw":"0Dh","@stdlib/math-base-ops-mul":"0Di","@stdlib/math-base-ops-mulf":"0Dj","@stdlib/math-base-ops":"0Dk","@stdlib/math-base-ops-sub":"0Dl","@stdlib/math-base-ops-subf":"0Dm","@stdlib/math-base-ops-umul":"0Dn","@stdlib/math-base-ops-umuldw":"0Do","@stdlib/math-base":"0Dp","@stdlib/math-base-special-abs":"0Dq","@stdlib/math-base-special-abs2":"0Dr","@stdlib/math-base-special-abs2f":"0Ds","@stdlib/math-base-special-absf":"0Dt","@stdlib/math-base-special-acos":"0Du","@stdlib/math-base-special-acosh":"0Dv","@stdlib/math-base-special-acot":"0Dw","@stdlib/math-base-special-acoth":"0Dx","@stdlib/math-base-special-acovercos":"0Dy","@stdlib/math-base-special-acoversin":"0Dz","@stdlib/math-base-special-acsc":"0E0","@stdlib/math-base-special-acsch":"0E1","@stdlib/math-base-special-ahavercos":"0E2","@stdlib/math-base-special-ahaversin":"0E3","@stdlib/math-base-special-asech":"0E4","@stdlib/math-base-special-asin":"0E5","@stdlib/math-base-special-asinh":"0E6","@stdlib/math-base-special-atan":"0E7","@stdlib/math-base-special-atan2":"0E8","@stdlib/math-base-special-atanh":"0E9","@stdlib/math-base-special-avercos":"0EA","@stdlib/math-base-special-aversin":"0EB","@stdlib/math-base-special-bernoulli":"0EC","@stdlib/math-base-special-besselj0":"0ED","@stdlib/math-base-special-besselj1":"0EE","@stdlib/math-base-special-bessely0":"0EF","@stdlib/math-base-special-bessely1":"0EG","@stdlib/math-base-special-beta":"0EH","@stdlib/math-base-special-betainc":"0EI","@stdlib/math-base-special-betaincinv":"0EJ","@stdlib/math-base-special-betaln":"0EK","@stdlib/math-base-special-binet":"0EL","@stdlib/math-base-special-binomcoef":"0EM","@stdlib/math-base-special-binomcoefln":"0EN","@stdlib/math-base-special-boxcox":"0EO","@stdlib/math-base-special-boxcox1p":"0EP","@stdlib/math-base-special-boxcox1pinv":"0EQ","@stdlib/math-base-special-boxcoxinv":"0ER","@stdlib/math-base-special-cabs":"0ES","@stdlib/math-base-special-cabs2":"0ET","@stdlib/math-base-special-cabs2f":"0EU","@stdlib/math-base-special-cabsf":"0EV","@stdlib/math-base-special-cbrt":"0EW","@stdlib/math-base-special-cbrtf":"0EX","@stdlib/math-base-special-cceil":"0EY","@stdlib/math-base-special-cceilf":"0EZ","@stdlib/math-base-special-cceiln":"0Ea","@stdlib/math-base-special-ccis":"0Eb","@stdlib/math-base-special-ceil":"0Ec","@stdlib/math-base-special-ceil10":"0Ed","@stdlib/math-base-special-ceil2":"0Ee","@stdlib/math-base-special-ceilb":"0Ef","@stdlib/math-base-special-ceilf":"0Eg","@stdlib/math-base-special-ceiln":"0Eh","@stdlib/math-base-special-ceilsd":"0Ei","@stdlib/math-base-special-cexp":"0Ej","@stdlib/math-base-special-cflipsign":"0Ek","@stdlib/math-base-special-cflipsignf":"0El","@stdlib/math-base-special-cfloor":"0Em","@stdlib/math-base-special-cfloorn":"0En","@stdlib/math-base-special-cidentity":"0Eo","@stdlib/math-base-special-cidentityf":"0Ep","@stdlib/math-base-special-cinv":"0Eq","@stdlib/math-base-special-clamp":"0Er","@stdlib/math-base-special-clampf":"0Es","@stdlib/math-base-special-copysign":"0Et","@stdlib/math-base-special-copysignf":"0Eu","@stdlib/math-base-special-cos":"0Ev","@stdlib/math-base-special-cosh":"0Ew","@stdlib/math-base-special-cosm1":"0Ex","@stdlib/math-base-special-cospi":"0Ey","@stdlib/math-base-special-cot":"0Ez","@stdlib/math-base-special-coth":"0F0","@stdlib/math-base-special-covercos":"0F1","@stdlib/math-base-special-coversin":"0F2","@stdlib/math-base-special-cphase":"0F3","@stdlib/math-base-special-cpolar":"0F4","@stdlib/math-base-special-cround":"0F5","@stdlib/math-base-special-croundn":"0F6","@stdlib/math-base-special-csch":"0F7","@stdlib/math-base-special-csignum":"0F8","@stdlib/math-base-special-deg2rad":"0F9","@stdlib/math-base-special-deg2radf":"0FA","@stdlib/math-base-special-digamma":"0FB","@stdlib/math-base-special-dirac-delta":"0FC","@stdlib/math-base-special-dirichlet-eta":"0FD","@stdlib/math-base-special-ellipe":"0FE","@stdlib/math-base-special-ellipk":"0FF","@stdlib/math-base-special-erf":"0FG","@stdlib/math-base-special-erfc":"0FH","@stdlib/math-base-special-erfcinv":"0FI","@stdlib/math-base-special-erfinv":"0FJ","@stdlib/math-base-special-exp":"0FK","@stdlib/math-base-special-exp10":"0FL","@stdlib/math-base-special-exp2":"0FM","@stdlib/math-base-special-expit":"0FN","@stdlib/math-base-special-expm1":"0FO","@stdlib/math-base-special-expm1rel":"0FP","@stdlib/math-base-special-factorial":"0FQ","@stdlib/math-base-special-factorialln":"0FR","@stdlib/math-base-special-falling-factorial":"0FS","@stdlib/math-base-special-fast-abs":"0FT","@stdlib/math-base-special-fast-acosh":"0FU","@stdlib/math-base-special-fast-alpha-max-plus-beta-min":"0FV","@stdlib/math-base-special-fast-asinh":"0FW","@stdlib/math-base-special-fast-atanh":"0FX","@stdlib/math-base-special-fast-hypot":"0FY","@stdlib/math-base-special-fast-max":"0FZ","@stdlib/math-base-special-fast-min":"0Fa","@stdlib/math-base-special-fast":"0Fb","@stdlib/math-base-special-fast-pow-int":"0Fc","@stdlib/math-base-special-fast-uint32-log2":"0Fd","@stdlib/math-base-special-fast-uint32-sqrt":"0Fe","@stdlib/math-base-special-fibonacci-index":"0Ff","@stdlib/math-base-special-fibonacci":"0Fg","@stdlib/math-base-special-flipsign":"0Fh","@stdlib/math-base-special-flipsignf":"0Fi","@stdlib/math-base-special-floor":"0Fj","@stdlib/math-base-special-floor10":"0Fk","@stdlib/math-base-special-floor2":"0Fl","@stdlib/math-base-special-floorb":"0Fm","@stdlib/math-base-special-floorf":"0Fn","@stdlib/math-base-special-floorn":"0Fo","@stdlib/math-base-special-floorsd":"0Fp","@stdlib/math-base-special-fresnel":"0Fq","@stdlib/math-base-special-fresnelc":"0Fr","@stdlib/math-base-special-fresnels":"0Fs","@stdlib/math-base-special-frexp":"0Ft","@stdlib/math-base-special-gamma-delta-ratio":"0Fu","@stdlib/math-base-special-gamma-lanczos-sum-expg-scaled":"0Fv","@stdlib/math-base-special-gamma-lanczos-sum":"0Fw","@stdlib/math-base-special-gamma":"0Fx","@stdlib/math-base-special-gamma1pm1":"0Fy","@stdlib/math-base-special-gammainc":"0Fz","@stdlib/math-base-special-gammaincinv":"0G0","@stdlib/math-base-special-gammaln":"0G1","@stdlib/math-base-special-gcd":"0G2","@stdlib/math-base-special-hacovercos":"0G3","@stdlib/math-base-special-hacoversin":"0G4","@stdlib/math-base-special-havercos":"0G5","@stdlib/math-base-special-haversin":"0G6","@stdlib/math-base-special-heaviside":"0G7","@stdlib/math-base-special-hypot":"0G8","@stdlib/math-base-special-hypotf":"0G9","@stdlib/math-base-special-identity":"0GA","@stdlib/math-base-special-identityf":"0GB","@stdlib/math-base-special-inv":"0GC","@stdlib/math-base-special-invf":"0GD","@stdlib/math-base-special-kernel-betainc":"0GE","@stdlib/math-base-special-kernel-betaincinv":"0GF","@stdlib/math-base-special-kernel-cos":"0GG","@stdlib/math-base-special-kernel-sin":"0GH","@stdlib/math-base-special-kernel-tan":"0GI","@stdlib/math-base-special-kronecker-delta":"0GJ","@stdlib/math-base-special-kronecker-deltaf":"0GK","@stdlib/math-base-special-labs":"0GL","@stdlib/math-base-special-lcm":"0GM","@stdlib/math-base-special-ldexp":"0GN","@stdlib/math-base-special-ln":"0GO","@stdlib/math-base-special-log":"0GP","@stdlib/math-base-special-log10":"0GQ","@stdlib/math-base-special-log1mexp":"0GR","@stdlib/math-base-special-log1p":"0GS","@stdlib/math-base-special-log1pexp":"0GT","@stdlib/math-base-special-log2":"0GU","@stdlib/math-base-special-logaddexp":"0GV","@stdlib/math-base-special-logit":"0GW","@stdlib/math-base-special-lucas":"0GX","@stdlib/math-base-special-max":"0GY","@stdlib/math-base-special-maxabs":"0GZ","@stdlib/math-base-special-min":"0Ga","@stdlib/math-base-special-minabs":"0Gb","@stdlib/math-base-special-minmax":"0Gc","@stdlib/math-base-special-minmaxabs":"0Gd","@stdlib/math-base-special-modf":"0Ge","@stdlib/math-base-special-negafibonacci":"0Gf","@stdlib/math-base-special-negalucas":"0Gg","@stdlib/math-base-special-nonfibonacci":"0Gh","@stdlib/math-base-special":"0Gi","@stdlib/math-base-special-pdiff":"0Gj","@stdlib/math-base-special-pdifff":"0Gk","@stdlib/math-base-special-polygamma":"0Gl","@stdlib/math-base-special-pow":"0Gm","@stdlib/math-base-special-powm1":"0Gn","@stdlib/math-base-special-rad2deg":"0Go","@stdlib/math-base-special-ramp":"0Gp","@stdlib/math-base-special-rampf":"0Gq","@stdlib/math-base-special-rempio2":"0Gr","@stdlib/math-base-special-riemann-zeta":"0Gs","@stdlib/math-base-special-rising-factorial":"0Gt","@stdlib/math-base-special-round":"0Gu","@stdlib/math-base-special-round10":"0Gv","@stdlib/math-base-special-round2":"0Gw","@stdlib/math-base-special-roundb":"0Gx","@stdlib/math-base-special-roundn":"0Gy","@stdlib/math-base-special-roundsd":"0Gz","@stdlib/math-base-special-rsqrt":"0H0","@stdlib/math-base-special-rsqrtf":"0H1","@stdlib/math-base-special-sici":"0H2","@stdlib/math-base-special-signum":"0H3","@stdlib/math-base-special-signumf":"0H4","@stdlib/math-base-special-sin":"0H5","@stdlib/math-base-special-sinc":"0H6","@stdlib/math-base-special-sincos":"0H7","@stdlib/math-base-special-sincospi":"0H8","@stdlib/math-base-special-sinh":"0H9","@stdlib/math-base-special-sinpi":"0HA","@stdlib/math-base-special-spence":"0HB","@stdlib/math-base-special-sqrt":"0HC","@stdlib/math-base-special-sqrt1pm1":"0HD","@stdlib/math-base-special-sqrtf":"0HE","@stdlib/math-base-special-tan":"0HF","@stdlib/math-base-special-tanh":"0HG","@stdlib/math-base-special-tribonacci":"0HH","@stdlib/math-base-special-trigamma":"0HI","@stdlib/math-base-special-trunc":"0HJ","@stdlib/math-base-special-trunc10":"0HK","@stdlib/math-base-special-trunc2":"0HL","@stdlib/math-base-special-truncb":"0HM","@stdlib/math-base-special-truncf":"0HN","@stdlib/math-base-special-truncn":"0HO","@stdlib/math-base-special-truncsd":"0HP","@stdlib/math-base-special-vercos":"0HQ","@stdlib/math-base-special-versin":"0HR","@stdlib/math-base-special-wrap":"0HS","@stdlib/math-base-special-xlog1py":"0HT","@stdlib/math-base-special-xlogy":"0HU","@stdlib/math-base-tools-continued-fraction":"0HV","@stdlib/math-base-tools-evalpoly-compile":"0HW","@stdlib/math-base-tools-evalpoly":"0HX","@stdlib/math-base-tools-evalrational-compile":"0HY","@stdlib/math-base-tools-evalrational":"0HZ","@stdlib/math-base-tools-fibpoly":"0Ha","@stdlib/math-base-tools-hermitepoly":"0Hb","@stdlib/math-base-tools-lucaspoly":"0Hc","@stdlib/math-base-tools-normhermitepoly":"0Hd","@stdlib/math-base-tools":"0He","@stdlib/math-base-tools-sum-series":"0Hf","@stdlib/math-base-utils-absolute-difference":"0Hg","@stdlib/math-base-utils-float64-epsilon-difference":"0Hh","@stdlib/math-base-utils":"0Hi","@stdlib/math-base-utils-relative-difference":"0Hj","@stdlib/math-iter-ops-add":"0Hk","@stdlib/math-iter-ops-divide":"0Hl","@stdlib/math-iter-ops-mod":"0Hm","@stdlib/math-iter-ops-multiply":"0Hn","@stdlib/math-iter-ops":"0Ho","@stdlib/math-iter-ops-subtract":"0Hp","@stdlib/math-iter":"0Hq","@stdlib/math-iter-sequences-composites":"0Hr","@stdlib/math-iter-sequences-continued-fraction":"0Hs","@stdlib/math-iter-sequences-cubes":"0Ht","@stdlib/math-iter-sequences-even-integers":"0Hu","@stdlib/math-iter-sequences-factorials":"0Hv","@stdlib/math-iter-sequences-fibonacci":"0Hw","@stdlib/math-iter-sequences-fifth-powers":"0Hx","@stdlib/math-iter-sequences-fourth-powers":"0Hy","@stdlib/math-iter-sequences-integers":"0Hz","@stdlib/math-iter-sequences-lucas":"0I0","@stdlib/math-iter-sequences-negafibonacci":"0I1","@stdlib/math-iter-sequences-negalucas":"0I2","@stdlib/math-iter-sequences-negative-even-integers":"0I3","@stdlib/math-iter-sequences-negative-integers":"0I4","@stdlib/math-iter-sequences-negative-odd-integers":"0I5","@stdlib/math-iter-sequences-nonfibonacci":"0I6","@stdlib/math-iter-sequences-nonnegative-even-integers":"0I7","@stdlib/math-iter-sequences-nonnegative-integers":"0I8","@stdlib/math-iter-sequences-nonpositive-even-integers":"0I9","@stdlib/math-iter-sequences-nonpositive-integers":"0IA","@stdlib/math-iter-sequences-nonsquares":"0IB","@stdlib/math-iter-sequences-odd-integers":"0IC","@stdlib/math-iter-sequences":"0ID","@stdlib/math-iter-sequences-positive-even-integers":"0IE","@stdlib/math-iter-sequences-positive-integers":"0IF","@stdlib/math-iter-sequences-positive-odd-integers":"0IG","@stdlib/math-iter-sequences-primes":"0IH","@stdlib/math-iter-sequences-squared-triangular":"0II","@stdlib/math-iter-sequences-squares":"0IJ","@stdlib/math-iter-sequences-triangular":"0IK","@stdlib/math-iter-special-abs":"0IL","@stdlib/math-iter-special-abs2":"0IM","@stdlib/math-iter-special-acos":"0IN","@stdlib/math-iter-special-acosh":"0IO","@stdlib/math-iter-special-acot":"0IP","@stdlib/math-iter-special-acoth":"0IQ","@stdlib/math-iter-special-acovercos":"0IR","@stdlib/math-iter-special-acoversin":"0IS","@stdlib/math-iter-special-ahavercos":"0IT","@stdlib/math-iter-special-ahaversin":"0IU","@stdlib/math-iter-special-asin":"0IV","@stdlib/math-iter-special-asinh":"0IW","@stdlib/math-iter-special-atan":"0IX","@stdlib/math-iter-special-atan2":"0IY","@stdlib/math-iter-special-atanh":"0IZ","@stdlib/math-iter-special-avercos":"0Ia","@stdlib/math-iter-special-aversin":"0Ib","@stdlib/math-iter-special-besselj0":"0Ic","@stdlib/math-iter-special-besselj1":"0Id","@stdlib/math-iter-special-bessely0":"0Ie","@stdlib/math-iter-special-bessely1":"0If","@stdlib/math-iter-special-beta":"0Ig","@stdlib/math-iter-special-betaln":"0Ih","@stdlib/math-iter-special-binet":"0Ii","@stdlib/math-iter-special-cbrt":"0Ij","@stdlib/math-iter-special-ceil":"0Ik","@stdlib/math-iter-special-ceil10":"0Il","@stdlib/math-iter-special-ceil2":"0Im","@stdlib/math-iter-special-cos":"0In","@stdlib/math-iter-special-cosh":"0Io","@stdlib/math-iter-special-cosm1":"0Ip","@stdlib/math-iter-special-cospi":"0Iq","@stdlib/math-iter-special-covercos":"0Ir","@stdlib/math-iter-special-coversin":"0Is","@stdlib/math-iter-special-deg2rad":"0It","@stdlib/math-iter-special-digamma":"0Iu","@stdlib/math-iter-special-dirac-delta":"0Iv","@stdlib/math-iter-special-dirichlet-eta":"0Iw","@stdlib/math-iter-special-ellipe":"0Ix","@stdlib/math-iter-special-ellipk":"0Iy","@stdlib/math-iter-special-erf":"0Iz","@stdlib/math-iter-special-erfc":"0J0","@stdlib/math-iter-special-erfcinv":"0J1","@stdlib/math-iter-special-erfinv":"0J2","@stdlib/math-iter-special-exp":"0J3","@stdlib/math-iter-special-exp10":"0J4","@stdlib/math-iter-special-exp2":"0J5","@stdlib/math-iter-special-expit":"0J6","@stdlib/math-iter-special-expm1":"0J7","@stdlib/math-iter-special-expm1rel":"0J8","@stdlib/math-iter-special-factorial":"0J9","@stdlib/math-iter-special-factorialln":"0JA","@stdlib/math-iter-special-floor":"0JB","@stdlib/math-iter-special-floor10":"0JC","@stdlib/math-iter-special-floor2":"0JD","@stdlib/math-iter-special-fresnelc":"0JE","@stdlib/math-iter-special-fresnels":"0JF","@stdlib/math-iter-special-gamma":"0JG","@stdlib/math-iter-special-gamma1pm1":"0JH","@stdlib/math-iter-special-gammaln":"0JI","@stdlib/math-iter-special-hacovercos":"0JJ","@stdlib/math-iter-special-hacoversin":"0JK","@stdlib/math-iter-special-havercos":"0JL","@stdlib/math-iter-special-haversin":"0JM","@stdlib/math-iter-special-inv":"0JN","@stdlib/math-iter-special-ln":"0JO","@stdlib/math-iter-special-log":"0JP","@stdlib/math-iter-special-log10":"0JQ","@stdlib/math-iter-special-log1mexp":"0JR","@stdlib/math-iter-special-log1p":"0JS","@stdlib/math-iter-special-log1pexp":"0JT","@stdlib/math-iter-special-log2":"0JU","@stdlib/math-iter-special-logit":"0JV","@stdlib/math-iter-special":"0JW","@stdlib/math-iter-special-pow":"0JX","@stdlib/math-iter-special-rad2deg":"0JY","@stdlib/math-iter-special-ramp":"0JZ","@stdlib/math-iter-special-riemann-zeta":"0Ja","@stdlib/math-iter-special-round":"0Jb","@stdlib/math-iter-special-round10":"0Jc","@stdlib/math-iter-special-round2":"0Jd","@stdlib/math-iter-special-rsqrt":"0Je","@stdlib/math-iter-special-signum":"0Jf","@stdlib/math-iter-special-sin":"0Jg","@stdlib/math-iter-special-sinc":"0Jh","@stdlib/math-iter-special-sinh":"0Ji","@stdlib/math-iter-special-sinpi":"0Jj","@stdlib/math-iter-special-spence":"0Jk","@stdlib/math-iter-special-sqrt":"0Jl","@stdlib/math-iter-special-sqrt1pm1":"0Jm","@stdlib/math-iter-special-tan":"0Jn","@stdlib/math-iter-special-tanh":"0Jo","@stdlib/math-iter-special-trigamma":"0Jp","@stdlib/math-iter-special-trunc":"0Jq","@stdlib/math-iter-special-trunc10":"0Jr","@stdlib/math-iter-special-trunc2":"0Js","@stdlib/math-iter-special-vercos":"0Jt","@stdlib/math-iter-special-versin":"0Ju","@stdlib/math-iter-tools-map":"0Jv","@stdlib/math-iter-tools-map2":"0Jw","@stdlib/math-iter-tools-map3":"0Jx","@stdlib/math-iter-tools":"0Jy","@stdlib/math-iter-utils-continued-fraction":"0Jz","@stdlib/math-iter-utils":"0K0","@stdlib/math":"0K1","@stdlib/math-special-abs":"0K2","@stdlib/math-special":"0K3","@stdlib/math-strided-ops-add":"0K4","@stdlib/math-strided-ops-mul":"0K5","@stdlib/math-strided-ops":"0K6","@stdlib/math-strided-ops-sub":"0K7","@stdlib/math-strided":"0K8","@stdlib/math-strided-special-abs-by":"0K9","@stdlib/math-strided-special-abs":"0KA","@stdlib/math-strided-special-abs2-by":"0KB","@stdlib/math-strided-special-abs2":"0KC","@stdlib/math-strided-special-acos-by":"0KD","@stdlib/math-strided-special-acosh-by":"0KE","@stdlib/math-strided-special-acot-by":"0KF","@stdlib/math-strided-special-acoth-by":"0KG","@stdlib/math-strided-special-acovercos-by":"0KH","@stdlib/math-strided-special-acoversin-by":"0KI","@stdlib/math-strided-special-ahavercos-by":"0KJ","@stdlib/math-strided-special-ahaversin-by":"0KK","@stdlib/math-strided-special-asin-by":"0KL","@stdlib/math-strided-special-asinh-by":"0KM","@stdlib/math-strided-special-atan-by":"0KN","@stdlib/math-strided-special-atanh-by":"0KO","@stdlib/math-strided-special-avercos-by":"0KP","@stdlib/math-strided-special-aversin-by":"0KQ","@stdlib/math-strided-special-besselj0-by":"0KR","@stdlib/math-strided-special-besselj1-by":"0KS","@stdlib/math-strided-special-bessely0-by":"0KT","@stdlib/math-strided-special-bessely1-by":"0KU","@stdlib/math-strided-special-binet-by":"0KV","@stdlib/math-strided-special-cbrt":"0KW","@stdlib/math-strided-special-ceil":"0KX","@stdlib/math-strided-special-dabs":"0KY","@stdlib/math-strided-special-dabs2":"0KZ","@stdlib/math-strided-special-dcbrt":"0Ka","@stdlib/math-strided-special-dceil":"0Kb","@stdlib/math-strided-special-ddeg2rad":"0Kc","@stdlib/math-strided-special-deg2rad":"0Kd","@stdlib/math-strided-special-dfloor":"0Ke","@stdlib/math-strided-special-dinv":"0Kf","@stdlib/math-strided-special-dmskabs":"0Kg","@stdlib/math-strided-special-dmskabs2":"0Kh","@stdlib/math-strided-special-dmskcbrt":"0Ki","@stdlib/math-strided-special-dmskceil":"0Kj","@stdlib/math-strided-special-dmskdeg2rad":"0Kk","@stdlib/math-strided-special-dmskfloor":"0Kl","@stdlib/math-strided-special-dmskinv":"0Km","@stdlib/math-strided-special-dmskramp":"0Kn","@stdlib/math-strided-special-dmskrsqrt":"0Ko","@stdlib/math-strided-special-dmsksqrt":"0Kp","@stdlib/math-strided-special-dmsktrunc":"0Kq","@stdlib/math-strided-special-dramp":"0Kr","@stdlib/math-strided-special-drsqrt":"0Ks","@stdlib/math-strided-special-dsqrt":"0Kt","@stdlib/math-strided-special-dtrunc":"0Ku","@stdlib/math-strided-special-floor":"0Kv","@stdlib/math-strided-special-inv":"0Kw","@stdlib/math-strided-special":"0Kx","@stdlib/math-strided-special-ramp":"0Ky","@stdlib/math-strided-special-rsqrt":"0Kz","@stdlib/math-strided-special-sabs":"0L0","@stdlib/math-strided-special-sabs2":"0L1","@stdlib/math-strided-special-scbrt":"0L2","@stdlib/math-strided-special-sceil":"0L3","@stdlib/math-strided-special-sdeg2rad":"0L4","@stdlib/math-strided-special-sfloor":"0L5","@stdlib/math-strided-special-sinv":"0L6","@stdlib/math-strided-special-smskabs":"0L7","@stdlib/math-strided-special-smskabs2":"0L8","@stdlib/math-strided-special-smskcbrt":"0L9","@stdlib/math-strided-special-smskceil":"0LA","@stdlib/math-strided-special-smskdeg2rad":"0LB","@stdlib/math-strided-special-smskfloor":"0LC","@stdlib/math-strided-special-smskinv":"0LD","@stdlib/math-strided-special-smskramp":"0LE","@stdlib/math-strided-special-smskrsqrt":"0LF","@stdlib/math-strided-special-smsksqrt":"0LG","@stdlib/math-strided-special-smsktrunc":"0LH","@stdlib/math-strided-special-sqrt":"0LI","@stdlib/math-strided-special-sramp":"0LJ","@stdlib/math-strided-special-srsqrt":"0LK","@stdlib/math-strided-special-ssqrt":"0LL","@stdlib/math-strided-special-strunc":"0LM","@stdlib/math-strided-special-trunc":"0LN","@stdlib/math-tools":"0LO","@stdlib/math-tools-unary":"0LP","@stdlib/ml-incr-binary-classification":"0LQ","@stdlib/ml-incr-kmeans":"0LR","@stdlib/ml-incr":"0LS","@stdlib/ml-incr-sgd-regression":"0LT","@stdlib/ml":"0LU","@stdlib/namespace-alias2pkg":"0LV","@stdlib/namespace-alias2related":"0LW","@stdlib/namespace-alias2standalone":"0LX","@stdlib/namespace-aliases":"0LY","@stdlib/namespace":"0LZ","@stdlib/namespace-pkg2alias":"0La","@stdlib/namespace-pkg2related":"0Lb","@stdlib/namespace-pkg2standalone":"0Lc","@stdlib/namespace-standalone2pkg":"0Ld","@stdlib/ndarray-array":"0Le","@stdlib/ndarray-base-assert-is-allowed-data-type-cast":"0Lf","@stdlib/ndarray-base-assert-is-buffer-length-compatible-shape":"0Lg","@stdlib/ndarray-base-assert-is-buffer-length-compatible":"0Lh","@stdlib/ndarray-base-assert-is-casting-mode":"0Li","@stdlib/ndarray-base-assert-is-column-major-contiguous":"0Lj","@stdlib/ndarray-base-assert-is-column-major":"0Lk","@stdlib/ndarray-base-assert-is-contiguous":"0Ll","@stdlib/ndarray-base-assert-is-data-type":"0Lm","@stdlib/ndarray-base-assert-is-index-mode":"0Ln","@stdlib/ndarray-base-assert-is-order":"0Lo","@stdlib/ndarray-base-assert-is-read-only":"0Lp","@stdlib/ndarray-base-assert-is-row-major-contiguous":"0Lq","@stdlib/ndarray-base-assert-is-row-major":"0Lr","@stdlib/ndarray-base-assert-is-safe-data-type-cast":"0Ls","@stdlib/ndarray-base-assert-is-same-kind-data-type-cast":"0Lt","@stdlib/ndarray-base-assert-is-single-segment-compatible":"0Lu","@stdlib/ndarray-base-assert":"0Lv","@stdlib/ndarray-base-bind2vind":"0Lw","@stdlib/ndarray-base-broadcast-array":"0Lx","@stdlib/ndarray-base-broadcast-shapes":"0Ly","@stdlib/ndarray-base-buffer-ctors":"0Lz","@stdlib/ndarray-base-buffer-dtype-enum":"0M0","@stdlib/ndarray-base-buffer-dtype":"0M1","@stdlib/ndarray-base-buffer":"0M2","@stdlib/ndarray-base-bytes-per-element":"0M3","@stdlib/ndarray-base-char2dtype":"0M4","@stdlib/ndarray-base-clamp-index":"0M5","@stdlib/ndarray-base-ctor":"0M6","@stdlib/ndarray-base-dtype-char":"0M7","@stdlib/ndarray-base-dtype-desc":"0M8","@stdlib/ndarray-base-dtype-enum2str":"0M9","@stdlib/ndarray-base-dtype-resolve-enum":"0MA","@stdlib/ndarray-base-dtype-resolve-str":"0MB","@stdlib/ndarray-base-dtype-str2enum":"0MC","@stdlib/ndarray-base-dtype2c":"0MD","@stdlib/ndarray-base-dtypes2signatures":"0ME","@stdlib/ndarray-base-expand-dimensions":"0MF","@stdlib/ndarray-base-from-scalar":"0MG","@stdlib/ndarray-base-function-object":"0MH","@stdlib/ndarray-base-ind":"0MI","@stdlib/ndarray-base-ind2sub":"0MJ","@stdlib/ndarray-base-iteration-order":"0MK","@stdlib/ndarray-base-max-view-buffer-index":"0ML","@stdlib/ndarray-base-maybe-broadcast-array":"0MM","@stdlib/ndarray-base-meta-data-props":"0MN","@stdlib/ndarray-base-min-view-buffer-index":"0MO","@stdlib/ndarray-base-minmax-view-buffer-index":"0MP","@stdlib/ndarray-base-napi-addon-arguments":"0MQ","@stdlib/ndarray-base-napi-dtype-string-to-dtype":"0MR","@stdlib/ndarray-base-napi":"0MS","@stdlib/ndarray-base-napi-typedarray-type-to-dtype":"0MT","@stdlib/ndarray-base-napi-unary":"0MU","@stdlib/ndarray-base-ndarraylike2object":"0MV","@stdlib/ndarray-base-nonsingleton-dimensions":"0MW","@stdlib/ndarray-base-numel":"0MX","@stdlib/ndarray-base":"0MY","@stdlib/ndarray-base-prepend-singleton-dimensions":"0MZ","@stdlib/ndarray-base-remove-singleton-dimensions":"0Ma","@stdlib/ndarray-base-serialize-meta-data":"0Mb","@stdlib/ndarray-base-shape2strides":"0Mc","@stdlib/ndarray-base-singleton-dimensions":"0Md","@stdlib/ndarray-base-strides2offset":"0Me","@stdlib/ndarray-base-strides2order":"0Mf","@stdlib/ndarray-base-sub2ind":"0Mg","@stdlib/ndarray-base-to-array":"0Mh","@stdlib/ndarray-base-transpose":"0Mi","@stdlib/ndarray-base-unary":"0Mj","@stdlib/ndarray-base-vind2bind":"0Mk","@stdlib/ndarray-base-wrap-index":"0Ml","@stdlib/ndarray-base-zeros-like":"0Mm","@stdlib/ndarray-base-zeros":"0Mn","@stdlib/ndarray-casting-modes":"0Mo","@stdlib/ndarray-ctor":"0Mp","@stdlib/ndarray-dispatch":"0Mq","@stdlib/ndarray-dtypes":"0Mr","@stdlib/ndarray-from-scalar":"0Ms","@stdlib/ndarray-ind2sub":"0Mt","@stdlib/ndarray-index-modes":"0Mu","@stdlib/ndarray-min-dtype":"0Mv","@stdlib/ndarray-next-dtype":"0Mw","@stdlib/ndarray-orders":"0Mx","@stdlib/ndarray":"0My","@stdlib/ndarray-promotion-rules":"0Mz","@stdlib/ndarray-safe-casts":"0N0","@stdlib/ndarray-same-kind-casts":"0N1","@stdlib/ndarray-sub2ind":"0N2","@stdlib/ndarray-zeros-like":"0N3","@stdlib/ndarray-zeros":"0N4","@stdlib/net-disposable-http-server":"0N5","@stdlib/net-http-server":"0N6","@stdlib/net":"0N7","@stdlib/net-simple-http-server":"0N8","@stdlib/nlp-expand-contractions":"0N9","@stdlib/nlp-lda":"0NA","@stdlib/nlp":"0NB","@stdlib/nlp-porter-stemmer":"0NC","@stdlib/nlp-tokenize":"0ND","@stdlib/number-ctor":"0NE","@stdlib/number-float32-base-exponent":"0NF","@stdlib/number-float32-base-from-binary-string":"0NG","@stdlib/number-float32-base-from-word":"0NH","@stdlib/number-float32-base-normalize":"0NI","@stdlib/number-float32-base":"0NJ","@stdlib/number-float32-base-signbit":"0NK","@stdlib/number-float32-base-significand":"0NL","@stdlib/number-float32-base-to-binary-string":"0NM","@stdlib/number-float32-base-to-int32":"0NN","@stdlib/number-float32-base-to-uint32":"0NO","@stdlib/number-float32-base-to-word":"0NP","@stdlib/number-float32":"0NQ","@stdlib/number-float64-base-exponent":"0NR","@stdlib/number-float64-base-from-binary-string":"0NS","@stdlib/number-float64-base-from-int64-bytes":"0NT","@stdlib/number-float64-base-from-words":"0NU","@stdlib/number-float64-base-get-high-word":"0NV","@stdlib/number-float64-base-get-low-word":"0NW","@stdlib/number-float64-base-normalize":"0NX","@stdlib/number-float64-base":"0NY","@stdlib/number-float64-base-set-high-word":"0NZ","@stdlib/number-float64-base-set-low-word":"0Na","@stdlib/number-float64-base-signbit":"0Nb","@stdlib/number-float64-base-to-binary-string":"0Nc","@stdlib/number-float64-base-to-float32":"0Nd","@stdlib/number-float64-base-to-int32":"0Ne","@stdlib/number-float64-base-to-int64-bytes":"0Nf","@stdlib/number-float64-base-to-uint32":"0Ng","@stdlib/number-float64-base-to-words":"0Nh","@stdlib/number-float64":"0Ni","@stdlib/number-int32-base":"0Nj","@stdlib/number-int32-base-to-uint32":"0Nk","@stdlib/number-int32":"0Nl","@stdlib/number":"0Nm","@stdlib/number-uint16-base-from-binary-string":"0Nn","@stdlib/number-uint16-base":"0No","@stdlib/number-uint16-base-to-binary-string":"0Np","@stdlib/number-uint16":"0Nq","@stdlib/number-uint32-base-from-binary-string":"0Nr","@stdlib/number-uint32-base":"0Ns","@stdlib/number-uint32-base-rotl":"0Nt","@stdlib/number-uint32-base-rotr":"0Nu","@stdlib/number-uint32-base-to-binary-string":"0Nv","@stdlib/number-uint32-base-to-int32":"0Nw","@stdlib/number-uint32":"0Nx","@stdlib/number-uint8-base-from-binary-string":"0Ny","@stdlib/number-uint8-base":"0Nz","@stdlib/number-uint8-base-to-binary-string":"0O0","@stdlib/number-uint8":"0O1","@stdlib/os-arch":"0O2","@stdlib/os-byte-order":"0O3","@stdlib/os-configdir":"0O4","@stdlib/os-float-word-order":"0O5","@stdlib/os-homedir":"0O6","@stdlib/os-num-cpus":"0O7","@stdlib/os":"0O8","@stdlib/os-platform":"0O9","@stdlib/os-tmpdir":"0OA","@stdlib/plot-base-ctor":"0OB","@stdlib/plot-components-svg-annotations":"0OC","@stdlib/plot-components-svg-axis":"0OD","@stdlib/plot-components-svg-background":"0OE","@stdlib/plot-components-svg-canvas":"0OF","@stdlib/plot-components-svg-clip-path":"0OG","@stdlib/plot-components-svg-defs":"0OH","@stdlib/plot-components-svg-graph":"0OI","@stdlib/plot-components-svg-marks":"0OJ","@stdlib/plot-components-svg-path":"0OK","@stdlib/plot-components-svg-rug":"0OL","@stdlib/plot-components-svg-symbols":"0OM","@stdlib/plot-components-svg-title":"0ON","@stdlib/plot-ctor":"0OO","@stdlib/plot":"0OP","@stdlib/plot-sparklines-base-ctor":"0OQ","@stdlib/plot-sparklines-base":"0OR","@stdlib/plot-sparklines":"0OS","@stdlib/plot-sparklines-unicode-column":"0OT","@stdlib/plot-sparklines-unicode-line":"0OU","@stdlib/plot-sparklines-unicode":"0OV","@stdlib/plot-sparklines-unicode-tristate":"0OW","@stdlib/plot-sparklines-unicode-up-down":"0OX","@stdlib/plot-sparklines-unicode-win-loss":"0OY","@stdlib/plot-unicode-stemleaf":"0OZ","@stdlib/process-argv":"0Oa","@stdlib/process-chdir":"0Ob","@stdlib/process-cwd":"0Oc","@stdlib/process-env":"0Od","@stdlib/process-exec-path":"0Oe","@stdlib/process-getegid":"0Of","@stdlib/process-geteuid":"0Og","@stdlib/process-getgid":"0Oh","@stdlib/process-getuid":"0Oi","@stdlib/process-node-version":"0Oj","@stdlib/process":"0Ok","@stdlib/process-read-stdin":"0Ol","@stdlib/process-umask":"0Om","@stdlib/proxy-ctor":"0On","@stdlib/proxy":"0Oo","@stdlib/random-base-arcsine":"0Op","@stdlib/random-base-bernoulli":"0Oq","@stdlib/random-base-beta":"0Or","@stdlib/random-base-betaprime":"0Os","@stdlib/random-base-binomial":"0Ot","@stdlib/random-base-box-muller":"0Ou","@stdlib/random-base-cauchy":"0Ov","@stdlib/random-base-chi":"0Ow","@stdlib/random-base-chisquare":"0Ox","@stdlib/random-base-cosine":"0Oy","@stdlib/random-base-discrete-uniform":"0Oz","@stdlib/random-base-erlang":"0P0","@stdlib/random-base-exponential":"0P1","@stdlib/random-base-f":"0P2","@stdlib/random-base-frechet":"0P3","@stdlib/random-base-gamma":"0P4","@stdlib/random-base-geometric":"0P5","@stdlib/random-base-gumbel":"0P6","@stdlib/random-base-hypergeometric":"0P7","@stdlib/random-base-improved-ziggurat":"0P8","@stdlib/random-base-invgamma":"0P9","@stdlib/random-base-kumaraswamy":"0PA","@stdlib/random-base-laplace":"0PB","@stdlib/random-base-levy":"0PC","@stdlib/random-base-logistic":"0PD","@stdlib/random-base-lognormal":"0PE","@stdlib/random-base-minstd-shuffle":"0PF","@stdlib/random-base-minstd":"0PG","@stdlib/random-base-mt19937":"0PH","@stdlib/random-base-negative-binomial":"0PI","@stdlib/random-base-normal":"0PJ","@stdlib/random-base":"0PK","@stdlib/random-base-pareto-type1":"0PL","@stdlib/random-base-poisson":"0PM","@stdlib/random-base-randi":"0PN","@stdlib/random-base-randn":"0PO","@stdlib/random-base-randu":"0PP","@stdlib/random-base-rayleigh":"0PQ","@stdlib/random-base-reviver":"0PR","@stdlib/random-base-t":"0PS","@stdlib/random-base-triangular":"0PT","@stdlib/random-base-uniform":"0PU","@stdlib/random-base-weibull":"0PV","@stdlib/random-iter-arcsine":"0PW","@stdlib/random-iter-bernoulli":"0PX","@stdlib/random-iter-beta":"0PY","@stdlib/random-iter-betaprime":"0PZ","@stdlib/random-iter-binomial":"0Pa","@stdlib/random-iter-box-muller":"0Pb","@stdlib/random-iter-cauchy":"0Pc","@stdlib/random-iter-chi":"0Pd","@stdlib/random-iter-chisquare":"0Pe","@stdlib/random-iter-cosine":"0Pf","@stdlib/random-iter-discrete-uniform":"0Pg","@stdlib/random-iter-erlang":"0Ph","@stdlib/random-iter-exponential":"0Pi","@stdlib/random-iter-f":"0Pj","@stdlib/random-iter-frechet":"0Pk","@stdlib/random-iter-gamma":"0Pl","@stdlib/random-iter-geometric":"0Pm","@stdlib/random-iter-gumbel":"0Pn","@stdlib/random-iter-hypergeometric":"0Po","@stdlib/random-iter-improved-ziggurat":"0Pp","@stdlib/random-iter-invgamma":"0Pq","@stdlib/random-iter-kumaraswamy":"0Pr","@stdlib/random-iter-laplace":"0Ps","@stdlib/random-iter-levy":"0Pt","@stdlib/random-iter-logistic":"0Pu","@stdlib/random-iter-lognormal":"0Pv","@stdlib/random-iter-minstd-shuffle":"0Pw","@stdlib/random-iter-minstd":"0Px","@stdlib/random-iter-mt19937":"0Py","@stdlib/random-iter-negative-binomial":"0Pz","@stdlib/random-iter-normal":"0Q0","@stdlib/random-iter":"0Q1","@stdlib/random-iter-pareto-type1":"0Q2","@stdlib/random-iter-poisson":"0Q3","@stdlib/random-iter-randi":"0Q4","@stdlib/random-iter-randn":"0Q5","@stdlib/random-iter-randu":"0Q6","@stdlib/random-iter-rayleigh":"0Q7","@stdlib/random-iter-t":"0Q8","@stdlib/random-iter-triangular":"0Q9","@stdlib/random-iter-uniform":"0QA","@stdlib/random-iter-weibull":"0QB","@stdlib/random":"0QC","@stdlib/random-sample":"0QD","@stdlib/random-shuffle":"0QE","@stdlib/random-streams-arcsine":"0QF","@stdlib/random-streams-bernoulli":"0QG","@stdlib/random-streams-beta":"0QH","@stdlib/random-streams-betaprime":"0QI","@stdlib/random-streams-binomial":"0QJ","@stdlib/random-streams-box-muller":"0QK","@stdlib/random-streams-cauchy":"0QL","@stdlib/random-streams-chi":"0QM","@stdlib/random-streams-chisquare":"0QN","@stdlib/random-streams-cosine":"0QO","@stdlib/random-streams-discrete-uniform":"0QP","@stdlib/random-streams-erlang":"0QQ","@stdlib/random-streams-exponential":"0QR","@stdlib/random-streams-f":"0QS","@stdlib/random-streams-frechet":"0QT","@stdlib/random-streams-gamma":"0QU","@stdlib/random-streams-geometric":"0QV","@stdlib/random-streams-gumbel":"0QW","@stdlib/random-streams-hypergeometric":"0QX","@stdlib/random-streams-improved-ziggurat":"0QY","@stdlib/random-streams-invgamma":"0QZ","@stdlib/random-streams-kumaraswamy":"0Qa","@stdlib/random-streams-laplace":"0Qb","@stdlib/random-streams-levy":"0Qc","@stdlib/random-streams-logistic":"0Qd","@stdlib/random-streams-lognormal":"0Qe","@stdlib/random-streams-minstd-shuffle":"0Qf","@stdlib/random-streams-minstd":"0Qg","@stdlib/random-streams-mt19937":"0Qh","@stdlib/random-streams-negative-binomial":"0Qi","@stdlib/random-streams-normal":"0Qj","@stdlib/random-streams":"0Qk","@stdlib/random-streams-pareto-type1":"0Ql","@stdlib/random-streams-poisson":"0Qm","@stdlib/random-streams-randi":"0Qn","@stdlib/random-streams-randn":"0Qo","@stdlib/random-streams-randu":"0Qp","@stdlib/random-streams-rayleigh":"0Qq","@stdlib/random-streams-t":"0Qr","@stdlib/random-streams-triangular":"0Qs","@stdlib/random-streams-uniform":"0Qt","@stdlib/random-streams-weibull":"0Qu","@stdlib/regexp-basename-posix":"0Qv","@stdlib/regexp-basename-windows":"0Qw","@stdlib/regexp-basename":"0Qx","@stdlib/regexp-color-hexadecimal":"0Qy","@stdlib/regexp-decimal-number":"0Qz","@stdlib/regexp-dirname-posix":"0R0","@stdlib/regexp-dirname-windows":"0R1","@stdlib/regexp-dirname":"0R2","@stdlib/regexp-eol":"0R3","@stdlib/regexp-extended-length-path":"0R4","@stdlib/regexp-extname-posix":"0R5","@stdlib/regexp-extname-windows":"0R6","@stdlib/regexp-extname":"0R7","@stdlib/regexp-filename-posix":"0R8","@stdlib/regexp-filename-windows":"0R9","@stdlib/regexp-filename":"0RA","@stdlib/regexp-function-name":"0RB","@stdlib/regexp-native-function":"0RC","@stdlib/regexp":"0RD","@stdlib/regexp-regexp":"0RE","@stdlib/regexp-unc-path":"0RF","@stdlib/regexp-utf16-surrogate-pair":"0RG","@stdlib/regexp-utf16-unpaired-surrogate":"0RH","@stdlib/regexp-whitespace":"0RI","@stdlib/repl-code-blocks":"0RJ","@stdlib/repl-help":"0RK","@stdlib/repl-info":"0RL","@stdlib/repl":"0RM","@stdlib/repl-presentation":"0RN","@stdlib/repl-server":"0RO","@stdlib/repl-signature":"0RP","@stdlib/repl-typed-signature":"0RQ","@stdlib/simulate-iter-awgn":"0RR","@stdlib/simulate-iter-awln":"0RS","@stdlib/simulate-iter-awun":"0RT","@stdlib/simulate-iter-bartlett-hann-pulse":"0RU","@stdlib/simulate-iter-bartlett-pulse":"0RV","@stdlib/simulate-iter-cosine-wave":"0RW","@stdlib/simulate-iter-dirac-comb":"0RX","@stdlib/simulate-iter-flat-top-pulse":"0RY","@stdlib/simulate-iter-hann-pulse":"0RZ","@stdlib/simulate-iter-lanczos-pulse":"0Ra","@stdlib/simulate-iter":"0Rb","@stdlib/simulate-iter-periodic-sinc":"0Rc","@stdlib/simulate-iter-pulse":"0Rd","@stdlib/simulate-iter-sawtooth-wave":"0Re","@stdlib/simulate-iter-sine-wave":"0Rf","@stdlib/simulate-iter-square-wave":"0Rg","@stdlib/simulate-iter-triangle-wave":"0Rh","@stdlib/simulate":"0Ri","@stdlib/stats-anova1":"0Rj","@stdlib/stats-bartlett-test":"0Rk","@stdlib/stats-base-cumax":"0Rl","@stdlib/stats-base-cumaxabs":"0Rm","@stdlib/stats-base-cumin":"0Rn","@stdlib/stats-base-cuminabs":"0Ro","@stdlib/stats-base-dcumax":"0Rp","@stdlib/stats-base-dcumaxabs":"0Rq","@stdlib/stats-base-dcumin":"0Rr","@stdlib/stats-base-dcuminabs":"0Rs","@stdlib/stats-base-dists-arcsine-cdf":"0Rt","@stdlib/stats-base-dists-arcsine-ctor":"0Ru","@stdlib/stats-base-dists-arcsine-entropy":"0Rv","@stdlib/stats-base-dists-arcsine-kurtosis":"0Rw","@stdlib/stats-base-dists-arcsine-logcdf":"0Rx","@stdlib/stats-base-dists-arcsine-logpdf":"0Ry","@stdlib/stats-base-dists-arcsine-mean":"0Rz","@stdlib/stats-base-dists-arcsine-median":"0S0","@stdlib/stats-base-dists-arcsine-mode":"0S1","@stdlib/stats-base-dists-arcsine":"0S2","@stdlib/stats-base-dists-arcsine-pdf":"0S3","@stdlib/stats-base-dists-arcsine-quantile":"0S4","@stdlib/stats-base-dists-arcsine-skewness":"0S5","@stdlib/stats-base-dists-arcsine-stdev":"0S6","@stdlib/stats-base-dists-arcsine-variance":"0S7","@stdlib/stats-base-dists-bernoulli-cdf":"0S8","@stdlib/stats-base-dists-bernoulli-ctor":"0S9","@stdlib/stats-base-dists-bernoulli-entropy":"0SA","@stdlib/stats-base-dists-bernoulli-kurtosis":"0SB","@stdlib/stats-base-dists-bernoulli-mean":"0SC","@stdlib/stats-base-dists-bernoulli-median":"0SD","@stdlib/stats-base-dists-bernoulli-mgf":"0SE","@stdlib/stats-base-dists-bernoulli-mode":"0SF","@stdlib/stats-base-dists-bernoulli":"0SG","@stdlib/stats-base-dists-bernoulli-pmf":"0SH","@stdlib/stats-base-dists-bernoulli-quantile":"0SI","@stdlib/stats-base-dists-bernoulli-skewness":"0SJ","@stdlib/stats-base-dists-bernoulli-stdev":"0SK","@stdlib/stats-base-dists-bernoulli-variance":"0SL","@stdlib/stats-base-dists-beta-cdf":"0SM","@stdlib/stats-base-dists-beta-ctor":"0SN","@stdlib/stats-base-dists-beta-entropy":"0SO","@stdlib/stats-base-dists-beta-kurtosis":"0SP","@stdlib/stats-base-dists-beta-logcdf":"0SQ","@stdlib/stats-base-dists-beta-logpdf":"0SR","@stdlib/stats-base-dists-beta-mean":"0SS","@stdlib/stats-base-dists-beta-median":"0ST","@stdlib/stats-base-dists-beta-mgf":"0SU","@stdlib/stats-base-dists-beta-mode":"0SV","@stdlib/stats-base-dists-beta":"0SW","@stdlib/stats-base-dists-beta-pdf":"0SX","@stdlib/stats-base-dists-beta-quantile":"0SY","@stdlib/stats-base-dists-beta-skewness":"0SZ","@stdlib/stats-base-dists-beta-stdev":"0Sa","@stdlib/stats-base-dists-beta-variance":"0Sb","@stdlib/stats-base-dists-betaprime-cdf":"0Sc","@stdlib/stats-base-dists-betaprime-ctor":"0Sd","@stdlib/stats-base-dists-betaprime-kurtosis":"0Se","@stdlib/stats-base-dists-betaprime-logcdf":"0Sf","@stdlib/stats-base-dists-betaprime-logpdf":"0Sg","@stdlib/stats-base-dists-betaprime-mean":"0Sh","@stdlib/stats-base-dists-betaprime-mode":"0Si","@stdlib/stats-base-dists-betaprime":"0Sj","@stdlib/stats-base-dists-betaprime-pdf":"0Sk","@stdlib/stats-base-dists-betaprime-quantile":"0Sl","@stdlib/stats-base-dists-betaprime-skewness":"0Sm","@stdlib/stats-base-dists-betaprime-stdev":"0Sn","@stdlib/stats-base-dists-betaprime-variance":"0So","@stdlib/stats-base-dists-binomial-cdf":"0Sp","@stdlib/stats-base-dists-binomial-ctor":"0Sq","@stdlib/stats-base-dists-binomial-entropy":"0Sr","@stdlib/stats-base-dists-binomial-kurtosis":"0Ss","@stdlib/stats-base-dists-binomial-logpmf":"0St","@stdlib/stats-base-dists-binomial-mean":"0Su","@stdlib/stats-base-dists-binomial-median":"0Sv","@stdlib/stats-base-dists-binomial-mgf":"0Sw","@stdlib/stats-base-dists-binomial-mode":"0Sx","@stdlib/stats-base-dists-binomial":"0Sy","@stdlib/stats-base-dists-binomial-pmf":"0Sz","@stdlib/stats-base-dists-binomial-quantile":"0T0","@stdlib/stats-base-dists-binomial-skewness":"0T1","@stdlib/stats-base-dists-binomial-stdev":"0T2","@stdlib/stats-base-dists-binomial-variance":"0T3","@stdlib/stats-base-dists-cauchy-cdf":"0T4","@stdlib/stats-base-dists-cauchy-ctor":"0T5","@stdlib/stats-base-dists-cauchy-entropy":"0T6","@stdlib/stats-base-dists-cauchy-logcdf":"0T7","@stdlib/stats-base-dists-cauchy-logpdf":"0T8","@stdlib/stats-base-dists-cauchy-median":"0T9","@stdlib/stats-base-dists-cauchy-mode":"0TA","@stdlib/stats-base-dists-cauchy":"0TB","@stdlib/stats-base-dists-cauchy-pdf":"0TC","@stdlib/stats-base-dists-cauchy-quantile":"0TD","@stdlib/stats-base-dists-chi-cdf":"0TE","@stdlib/stats-base-dists-chi-ctor":"0TF","@stdlib/stats-base-dists-chi-entropy":"0TG","@stdlib/stats-base-dists-chi-kurtosis":"0TH","@stdlib/stats-base-dists-chi-logpdf":"0TI","@stdlib/stats-base-dists-chi-mean":"0TJ","@stdlib/stats-base-dists-chi-mode":"0TK","@stdlib/stats-base-dists-chi":"0TL","@stdlib/stats-base-dists-chi-pdf":"0TM","@stdlib/stats-base-dists-chi-quantile":"0TN","@stdlib/stats-base-dists-chi-skewness":"0TO","@stdlib/stats-base-dists-chi-stdev":"0TP","@stdlib/stats-base-dists-chi-variance":"0TQ","@stdlib/stats-base-dists-chisquare-cdf":"0TR","@stdlib/stats-base-dists-chisquare-ctor":"0TS","@stdlib/stats-base-dists-chisquare-entropy":"0TT","@stdlib/stats-base-dists-chisquare-kurtosis":"0TU","@stdlib/stats-base-dists-chisquare-logpdf":"0TV","@stdlib/stats-base-dists-chisquare-mean":"0TW","@stdlib/stats-base-dists-chisquare-median":"0TX","@stdlib/stats-base-dists-chisquare-mgf":"0TY","@stdlib/stats-base-dists-chisquare-mode":"0TZ","@stdlib/stats-base-dists-chisquare":"0Ta","@stdlib/stats-base-dists-chisquare-pdf":"0Tb","@stdlib/stats-base-dists-chisquare-quantile":"0Tc","@stdlib/stats-base-dists-chisquare-skewness":"0Td","@stdlib/stats-base-dists-chisquare-stdev":"0Te","@stdlib/stats-base-dists-chisquare-variance":"0Tf","@stdlib/stats-base-dists-cosine-cdf":"0Tg","@stdlib/stats-base-dists-cosine-ctor":"0Th","@stdlib/stats-base-dists-cosine-kurtosis":"0Ti","@stdlib/stats-base-dists-cosine-logcdf":"0Tj","@stdlib/stats-base-dists-cosine-logpdf":"0Tk","@stdlib/stats-base-dists-cosine-mean":"0Tl","@stdlib/stats-base-dists-cosine-median":"0Tm","@stdlib/stats-base-dists-cosine-mgf":"0Tn","@stdlib/stats-base-dists-cosine-mode":"0To","@stdlib/stats-base-dists-cosine":"0Tp","@stdlib/stats-base-dists-cosine-pdf":"0Tq","@stdlib/stats-base-dists-cosine-quantile":"0Tr","@stdlib/stats-base-dists-cosine-skewness":"0Ts","@stdlib/stats-base-dists-cosine-stdev":"0Tt","@stdlib/stats-base-dists-cosine-variance":"0Tu","@stdlib/stats-base-dists-degenerate-cdf":"0Tv","@stdlib/stats-base-dists-degenerate-ctor":"0Tw","@stdlib/stats-base-dists-degenerate-entropy":"0Tx","@stdlib/stats-base-dists-degenerate-logcdf":"0Ty","@stdlib/stats-base-dists-degenerate-logpdf":"0Tz","@stdlib/stats-base-dists-degenerate-logpmf":"0U0","@stdlib/stats-base-dists-degenerate-mean":"0U1","@stdlib/stats-base-dists-degenerate-median":"0U2","@stdlib/stats-base-dists-degenerate-mgf":"0U3","@stdlib/stats-base-dists-degenerate-mode":"0U4","@stdlib/stats-base-dists-degenerate":"0U5","@stdlib/stats-base-dists-degenerate-pdf":"0U6","@stdlib/stats-base-dists-degenerate-pmf":"0U7","@stdlib/stats-base-dists-degenerate-quantile":"0U8","@stdlib/stats-base-dists-degenerate-stdev":"0U9","@stdlib/stats-base-dists-degenerate-variance":"0UA","@stdlib/stats-base-dists-discrete-uniform-cdf":"0UB","@stdlib/stats-base-dists-discrete-uniform-ctor":"0UC","@stdlib/stats-base-dists-discrete-uniform-entropy":"0UD","@stdlib/stats-base-dists-discrete-uniform-kurtosis":"0UE","@stdlib/stats-base-dists-discrete-uniform-logcdf":"0UF","@stdlib/stats-base-dists-discrete-uniform-logpmf":"0UG","@stdlib/stats-base-dists-discrete-uniform-mean":"0UH","@stdlib/stats-base-dists-discrete-uniform-median":"0UI","@stdlib/stats-base-dists-discrete-uniform-mgf":"0UJ","@stdlib/stats-base-dists-discrete-uniform":"0UK","@stdlib/stats-base-dists-discrete-uniform-pmf":"0UL","@stdlib/stats-base-dists-discrete-uniform-quantile":"0UM","@stdlib/stats-base-dists-discrete-uniform-skewness":"0UN","@stdlib/stats-base-dists-discrete-uniform-stdev":"0UO","@stdlib/stats-base-dists-discrete-uniform-variance":"0UP","@stdlib/stats-base-dists-erlang-cdf":"0UQ","@stdlib/stats-base-dists-erlang-ctor":"0UR","@stdlib/stats-base-dists-erlang-entropy":"0US","@stdlib/stats-base-dists-erlang-kurtosis":"0UT","@stdlib/stats-base-dists-erlang-logpdf":"0UU","@stdlib/stats-base-dists-erlang-mean":"0UV","@stdlib/stats-base-dists-erlang-mgf":"0UW","@stdlib/stats-base-dists-erlang-mode":"0UX","@stdlib/stats-base-dists-erlang":"0UY","@stdlib/stats-base-dists-erlang-pdf":"0UZ","@stdlib/stats-base-dists-erlang-quantile":"0Ua","@stdlib/stats-base-dists-erlang-skewness":"0Ub","@stdlib/stats-base-dists-erlang-stdev":"0Uc","@stdlib/stats-base-dists-erlang-variance":"0Ud","@stdlib/stats-base-dists-exponential-cdf":"0Ue","@stdlib/stats-base-dists-exponential-ctor":"0Uf","@stdlib/stats-base-dists-exponential-entropy":"0Ug","@stdlib/stats-base-dists-exponential-kurtosis":"0Uh","@stdlib/stats-base-dists-exponential-logcdf":"0Ui","@stdlib/stats-base-dists-exponential-logpdf":"0Uj","@stdlib/stats-base-dists-exponential-mean":"0Uk","@stdlib/stats-base-dists-exponential-median":"0Ul","@stdlib/stats-base-dists-exponential-mgf":"0Um","@stdlib/stats-base-dists-exponential-mode":"0Un","@stdlib/stats-base-dists-exponential":"0Uo","@stdlib/stats-base-dists-exponential-pdf":"0Up","@stdlib/stats-base-dists-exponential-quantile":"0Uq","@stdlib/stats-base-dists-exponential-skewness":"0Ur","@stdlib/stats-base-dists-exponential-stdev":"0Us","@stdlib/stats-base-dists-exponential-variance":"0Ut","@stdlib/stats-base-dists-f-cdf":"0Uu","@stdlib/stats-base-dists-f-ctor":"0Uv","@stdlib/stats-base-dists-f-entropy":"0Uw","@stdlib/stats-base-dists-f-kurtosis":"0Ux","@stdlib/stats-base-dists-f-mean":"0Uy","@stdlib/stats-base-dists-f-mode":"0Uz","@stdlib/stats-base-dists-f":"0V0","@stdlib/stats-base-dists-f-pdf":"0V1","@stdlib/stats-base-dists-f-quantile":"0V2","@stdlib/stats-base-dists-f-skewness":"0V3","@stdlib/stats-base-dists-f-stdev":"0V4","@stdlib/stats-base-dists-f-variance":"0V5","@stdlib/stats-base-dists-frechet-cdf":"0V6","@stdlib/stats-base-dists-frechet-ctor":"0V7","@stdlib/stats-base-dists-frechet-entropy":"0V8","@stdlib/stats-base-dists-frechet-kurtosis":"0V9","@stdlib/stats-base-dists-frechet-logcdf":"0VA","@stdlib/stats-base-dists-frechet-logpdf":"0VB","@stdlib/stats-base-dists-frechet-mean":"0VC","@stdlib/stats-base-dists-frechet-median":"0VD","@stdlib/stats-base-dists-frechet-mode":"0VE","@stdlib/stats-base-dists-frechet":"0VF","@stdlib/stats-base-dists-frechet-pdf":"0VG","@stdlib/stats-base-dists-frechet-quantile":"0VH","@stdlib/stats-base-dists-frechet-skewness":"0VI","@stdlib/stats-base-dists-frechet-stdev":"0VJ","@stdlib/stats-base-dists-frechet-variance":"0VK","@stdlib/stats-base-dists-gamma-cdf":"0VL","@stdlib/stats-base-dists-gamma-ctor":"0VM","@stdlib/stats-base-dists-gamma-entropy":"0VN","@stdlib/stats-base-dists-gamma-kurtosis":"0VO","@stdlib/stats-base-dists-gamma-logcdf":"0VP","@stdlib/stats-base-dists-gamma-logpdf":"0VQ","@stdlib/stats-base-dists-gamma-mean":"0VR","@stdlib/stats-base-dists-gamma-mgf":"0VS","@stdlib/stats-base-dists-gamma-mode":"0VT","@stdlib/stats-base-dists-gamma":"0VU","@stdlib/stats-base-dists-gamma-pdf":"0VV","@stdlib/stats-base-dists-gamma-quantile":"0VW","@stdlib/stats-base-dists-gamma-skewness":"0VX","@stdlib/stats-base-dists-gamma-stdev":"0VY","@stdlib/stats-base-dists-gamma-variance":"0VZ","@stdlib/stats-base-dists-geometric-cdf":"0Va","@stdlib/stats-base-dists-geometric-ctor":"0Vb","@stdlib/stats-base-dists-geometric-entropy":"0Vc","@stdlib/stats-base-dists-geometric-kurtosis":"0Vd","@stdlib/stats-base-dists-geometric-logcdf":"0Ve","@stdlib/stats-base-dists-geometric-logpmf":"0Vf","@stdlib/stats-base-dists-geometric-mean":"0Vg","@stdlib/stats-base-dists-geometric-median":"0Vh","@stdlib/stats-base-dists-geometric-mgf":"0Vi","@stdlib/stats-base-dists-geometric-mode":"0Vj","@stdlib/stats-base-dists-geometric":"0Vk","@stdlib/stats-base-dists-geometric-pmf":"0Vl","@stdlib/stats-base-dists-geometric-quantile":"0Vm","@stdlib/stats-base-dists-geometric-skewness":"0Vn","@stdlib/stats-base-dists-geometric-stdev":"0Vo","@stdlib/stats-base-dists-geometric-variance":"0Vp","@stdlib/stats-base-dists-gumbel-cdf":"0Vq","@stdlib/stats-base-dists-gumbel-ctor":"0Vr","@stdlib/stats-base-dists-gumbel-entropy":"0Vs","@stdlib/stats-base-dists-gumbel-kurtosis":"0Vt","@stdlib/stats-base-dists-gumbel-logcdf":"0Vu","@stdlib/stats-base-dists-gumbel-logpdf":"0Vv","@stdlib/stats-base-dists-gumbel-mean":"0Vw","@stdlib/stats-base-dists-gumbel-median":"0Vx","@stdlib/stats-base-dists-gumbel-mgf":"0Vy","@stdlib/stats-base-dists-gumbel-mode":"0Vz","@stdlib/stats-base-dists-gumbel":"0W0","@stdlib/stats-base-dists-gumbel-pdf":"0W1","@stdlib/stats-base-dists-gumbel-quantile":"0W2","@stdlib/stats-base-dists-gumbel-skewness":"0W3","@stdlib/stats-base-dists-gumbel-stdev":"0W4","@stdlib/stats-base-dists-gumbel-variance":"0W5","@stdlib/stats-base-dists-hypergeometric-cdf":"0W6","@stdlib/stats-base-dists-hypergeometric-ctor":"0W7","@stdlib/stats-base-dists-hypergeometric-kurtosis":"0W8","@stdlib/stats-base-dists-hypergeometric-logpmf":"0W9","@stdlib/stats-base-dists-hypergeometric-mean":"0WA","@stdlib/stats-base-dists-hypergeometric-mode":"0WB","@stdlib/stats-base-dists-hypergeometric":"0WC","@stdlib/stats-base-dists-hypergeometric-pmf":"0WD","@stdlib/stats-base-dists-hypergeometric-quantile":"0WE","@stdlib/stats-base-dists-hypergeometric-skewness":"0WF","@stdlib/stats-base-dists-hypergeometric-stdev":"0WG","@stdlib/stats-base-dists-hypergeometric-variance":"0WH","@stdlib/stats-base-dists-invgamma-cdf":"0WI","@stdlib/stats-base-dists-invgamma-ctor":"0WJ","@stdlib/stats-base-dists-invgamma-entropy":"0WK","@stdlib/stats-base-dists-invgamma-kurtosis":"0WL","@stdlib/stats-base-dists-invgamma-logpdf":"0WM","@stdlib/stats-base-dists-invgamma-mean":"0WN","@stdlib/stats-base-dists-invgamma-mode":"0WO","@stdlib/stats-base-dists-invgamma":"0WP","@stdlib/stats-base-dists-invgamma-pdf":"0WQ","@stdlib/stats-base-dists-invgamma-quantile":"0WR","@stdlib/stats-base-dists-invgamma-skewness":"0WS","@stdlib/stats-base-dists-invgamma-stdev":"0WT","@stdlib/stats-base-dists-invgamma-variance":"0WU","@stdlib/stats-base-dists-kumaraswamy-cdf":"0WV","@stdlib/stats-base-dists-kumaraswamy-ctor":"0WW","@stdlib/stats-base-dists-kumaraswamy-kurtosis":"0WX","@stdlib/stats-base-dists-kumaraswamy-logcdf":"0WY","@stdlib/stats-base-dists-kumaraswamy-logpdf":"0WZ","@stdlib/stats-base-dists-kumaraswamy-mean":"0Wa","@stdlib/stats-base-dists-kumaraswamy-median":"0Wb","@stdlib/stats-base-dists-kumaraswamy-mode":"0Wc","@stdlib/stats-base-dists-kumaraswamy":"0Wd","@stdlib/stats-base-dists-kumaraswamy-pdf":"0We","@stdlib/stats-base-dists-kumaraswamy-quantile":"0Wf","@stdlib/stats-base-dists-kumaraswamy-skewness":"0Wg","@stdlib/stats-base-dists-kumaraswamy-stdev":"0Wh","@stdlib/stats-base-dists-kumaraswamy-variance":"0Wi","@stdlib/stats-base-dists-laplace-cdf":"0Wj","@stdlib/stats-base-dists-laplace-ctor":"0Wk","@stdlib/stats-base-dists-laplace-entropy":"0Wl","@stdlib/stats-base-dists-laplace-kurtosis":"0Wm","@stdlib/stats-base-dists-laplace-logcdf":"0Wn","@stdlib/stats-base-dists-laplace-logpdf":"0Wo","@stdlib/stats-base-dists-laplace-mean":"0Wp","@stdlib/stats-base-dists-laplace-median":"0Wq","@stdlib/stats-base-dists-laplace-mgf":"0Wr","@stdlib/stats-base-dists-laplace-mode":"0Ws","@stdlib/stats-base-dists-laplace":"0Wt","@stdlib/stats-base-dists-laplace-pdf":"0Wu","@stdlib/stats-base-dists-laplace-quantile":"0Wv","@stdlib/stats-base-dists-laplace-skewness":"0Ww","@stdlib/stats-base-dists-laplace-stdev":"0Wx","@stdlib/stats-base-dists-laplace-variance":"0Wy","@stdlib/stats-base-dists-levy-cdf":"0Wz","@stdlib/stats-base-dists-levy-ctor":"0X0","@stdlib/stats-base-dists-levy-entropy":"0X1","@stdlib/stats-base-dists-levy-logcdf":"0X2","@stdlib/stats-base-dists-levy-logpdf":"0X3","@stdlib/stats-base-dists-levy-mean":"0X4","@stdlib/stats-base-dists-levy-median":"0X5","@stdlib/stats-base-dists-levy-mode":"0X6","@stdlib/stats-base-dists-levy":"0X7","@stdlib/stats-base-dists-levy-pdf":"0X8","@stdlib/stats-base-dists-levy-quantile":"0X9","@stdlib/stats-base-dists-levy-stdev":"0XA","@stdlib/stats-base-dists-levy-variance":"0XB","@stdlib/stats-base-dists-logistic-cdf":"0XC","@stdlib/stats-base-dists-logistic-ctor":"0XD","@stdlib/stats-base-dists-logistic-entropy":"0XE","@stdlib/stats-base-dists-logistic-kurtosis":"0XF","@stdlib/stats-base-dists-logistic-logcdf":"0XG","@stdlib/stats-base-dists-logistic-logpdf":"0XH","@stdlib/stats-base-dists-logistic-mean":"0XI","@stdlib/stats-base-dists-logistic-median":"0XJ","@stdlib/stats-base-dists-logistic-mgf":"0XK","@stdlib/stats-base-dists-logistic-mode":"0XL","@stdlib/stats-base-dists-logistic":"0XM","@stdlib/stats-base-dists-logistic-pdf":"0XN","@stdlib/stats-base-dists-logistic-quantile":"0XO","@stdlib/stats-base-dists-logistic-skewness":"0XP","@stdlib/stats-base-dists-logistic-stdev":"0XQ","@stdlib/stats-base-dists-logistic-variance":"0XR","@stdlib/stats-base-dists-lognormal-cdf":"0XS","@stdlib/stats-base-dists-lognormal-ctor":"0XT","@stdlib/stats-base-dists-lognormal-entropy":"0XU","@stdlib/stats-base-dists-lognormal-kurtosis":"0XV","@stdlib/stats-base-dists-lognormal-logpdf":"0XW","@stdlib/stats-base-dists-lognormal-mean":"0XX","@stdlib/stats-base-dists-lognormal-median":"0XY","@stdlib/stats-base-dists-lognormal-mode":"0XZ","@stdlib/stats-base-dists-lognormal":"0Xa","@stdlib/stats-base-dists-lognormal-pdf":"0Xb","@stdlib/stats-base-dists-lognormal-quantile":"0Xc","@stdlib/stats-base-dists-lognormal-skewness":"0Xd","@stdlib/stats-base-dists-lognormal-stdev":"0Xe","@stdlib/stats-base-dists-lognormal-variance":"0Xf","@stdlib/stats-base-dists-negative-binomial-cdf":"0Xg","@stdlib/stats-base-dists-negative-binomial-ctor":"0Xh","@stdlib/stats-base-dists-negative-binomial-kurtosis":"0Xi","@stdlib/stats-base-dists-negative-binomial-logpmf":"0Xj","@stdlib/stats-base-dists-negative-binomial-mean":"0Xk","@stdlib/stats-base-dists-negative-binomial-mgf":"0Xl","@stdlib/stats-base-dists-negative-binomial-mode":"0Xm","@stdlib/stats-base-dists-negative-binomial":"0Xn","@stdlib/stats-base-dists-negative-binomial-pmf":"0Xo","@stdlib/stats-base-dists-negative-binomial-quantile":"0Xp","@stdlib/stats-base-dists-negative-binomial-skewness":"0Xq","@stdlib/stats-base-dists-negative-binomial-stdev":"0Xr","@stdlib/stats-base-dists-negative-binomial-variance":"0Xs","@stdlib/stats-base-dists-normal-cdf":"0Xt","@stdlib/stats-base-dists-normal-ctor":"0Xu","@stdlib/stats-base-dists-normal-entropy":"0Xv","@stdlib/stats-base-dists-normal-kurtosis":"0Xw","@stdlib/stats-base-dists-normal-logpdf":"0Xx","@stdlib/stats-base-dists-normal-mean":"0Xy","@stdlib/stats-base-dists-normal-median":"0Xz","@stdlib/stats-base-dists-normal-mgf":"0Y0","@stdlib/stats-base-dists-normal-mode":"0Y1","@stdlib/stats-base-dists-normal":"0Y2","@stdlib/stats-base-dists-normal-pdf":"0Y3","@stdlib/stats-base-dists-normal-quantile":"0Y4","@stdlib/stats-base-dists-normal-skewness":"0Y5","@stdlib/stats-base-dists-normal-stdev":"0Y6","@stdlib/stats-base-dists-normal-variance":"0Y7","@stdlib/stats-base-dists":"0Y8","@stdlib/stats-base-dists-pareto-type1-cdf":"0Y9","@stdlib/stats-base-dists-pareto-type1-ctor":"0YA","@stdlib/stats-base-dists-pareto-type1-entropy":"0YB","@stdlib/stats-base-dists-pareto-type1-kurtosis":"0YC","@stdlib/stats-base-dists-pareto-type1-logcdf":"0YD","@stdlib/stats-base-dists-pareto-type1-logpdf":"0YE","@stdlib/stats-base-dists-pareto-type1-mean":"0YF","@stdlib/stats-base-dists-pareto-type1-median":"0YG","@stdlib/stats-base-dists-pareto-type1-mode":"0YH","@stdlib/stats-base-dists-pareto-type1":"0YI","@stdlib/stats-base-dists-pareto-type1-pdf":"0YJ","@stdlib/stats-base-dists-pareto-type1-quantile":"0YK","@stdlib/stats-base-dists-pareto-type1-skewness":"0YL","@stdlib/stats-base-dists-pareto-type1-stdev":"0YM","@stdlib/stats-base-dists-pareto-type1-variance":"0YN","@stdlib/stats-base-dists-poisson-cdf":"0YO","@stdlib/stats-base-dists-poisson-ctor":"0YP","@stdlib/stats-base-dists-poisson-entropy":"0YQ","@stdlib/stats-base-dists-poisson-kurtosis":"0YR","@stdlib/stats-base-dists-poisson-logpmf":"0YS","@stdlib/stats-base-dists-poisson-mean":"0YT","@stdlib/stats-base-dists-poisson-median":"0YU","@stdlib/stats-base-dists-poisson-mgf":"0YV","@stdlib/stats-base-dists-poisson-mode":"0YW","@stdlib/stats-base-dists-poisson":"0YX","@stdlib/stats-base-dists-poisson-pmf":"0YY","@stdlib/stats-base-dists-poisson-quantile":"0YZ","@stdlib/stats-base-dists-poisson-skewness":"0Ya","@stdlib/stats-base-dists-poisson-stdev":"0Yb","@stdlib/stats-base-dists-poisson-variance":"0Yc","@stdlib/stats-base-dists-rayleigh-cdf":"0Yd","@stdlib/stats-base-dists-rayleigh-ctor":"0Ye","@stdlib/stats-base-dists-rayleigh-entropy":"0Yf","@stdlib/stats-base-dists-rayleigh-kurtosis":"0Yg","@stdlib/stats-base-dists-rayleigh-logcdf":"0Yh","@stdlib/stats-base-dists-rayleigh-logpdf":"0Yi","@stdlib/stats-base-dists-rayleigh-mean":"0Yj","@stdlib/stats-base-dists-rayleigh-median":"0Yk","@stdlib/stats-base-dists-rayleigh-mgf":"0Yl","@stdlib/stats-base-dists-rayleigh-mode":"0Ym","@stdlib/stats-base-dists-rayleigh":"0Yn","@stdlib/stats-base-dists-rayleigh-pdf":"0Yo","@stdlib/stats-base-dists-rayleigh-quantile":"0Yp","@stdlib/stats-base-dists-rayleigh-skewness":"0Yq","@stdlib/stats-base-dists-rayleigh-stdev":"0Yr","@stdlib/stats-base-dists-rayleigh-variance":"0Ys","@stdlib/stats-base-dists-signrank-cdf":"0Yt","@stdlib/stats-base-dists-signrank":"0Yu","@stdlib/stats-base-dists-signrank-pdf":"0Yv","@stdlib/stats-base-dists-signrank-quantile":"0Yw","@stdlib/stats-base-dists-t-cdf":"0Yx","@stdlib/stats-base-dists-t-ctor":"0Yy","@stdlib/stats-base-dists-t-entropy":"0Yz","@stdlib/stats-base-dists-t-kurtosis":"0Z0","@stdlib/stats-base-dists-t-logcdf":"0Z1","@stdlib/stats-base-dists-t-logpdf":"0Z2","@stdlib/stats-base-dists-t-mean":"0Z3","@stdlib/stats-base-dists-t-median":"0Z4","@stdlib/stats-base-dists-t-mode":"0Z5","@stdlib/stats-base-dists-t":"0Z6","@stdlib/stats-base-dists-t-pdf":"0Z7","@stdlib/stats-base-dists-t-quantile":"0Z8","@stdlib/stats-base-dists-t-skewness":"0Z9","@stdlib/stats-base-dists-t-stdev":"0ZA","@stdlib/stats-base-dists-t-variance":"0ZB","@stdlib/stats-base-dists-triangular-cdf":"0ZC","@stdlib/stats-base-dists-triangular-ctor":"0ZD","@stdlib/stats-base-dists-triangular-entropy":"0ZE","@stdlib/stats-base-dists-triangular-kurtosis":"0ZF","@stdlib/stats-base-dists-triangular-logcdf":"0ZG","@stdlib/stats-base-dists-triangular-logpdf":"0ZH","@stdlib/stats-base-dists-triangular-mean":"0ZI","@stdlib/stats-base-dists-triangular-median":"0ZJ","@stdlib/stats-base-dists-triangular-mgf":"0ZK","@stdlib/stats-base-dists-triangular-mode":"0ZL","@stdlib/stats-base-dists-triangular":"0ZM","@stdlib/stats-base-dists-triangular-pdf":"0ZN","@stdlib/stats-base-dists-triangular-quantile":"0ZO","@stdlib/stats-base-dists-triangular-skewness":"0ZP","@stdlib/stats-base-dists-triangular-stdev":"0ZQ","@stdlib/stats-base-dists-triangular-variance":"0ZR","@stdlib/stats-base-dists-truncated-normal":"0ZS","@stdlib/stats-base-dists-truncated-normal-pdf":"0ZT","@stdlib/stats-base-dists-uniform-cdf":"0ZU","@stdlib/stats-base-dists-uniform-ctor":"0ZV","@stdlib/stats-base-dists-uniform-entropy":"0ZW","@stdlib/stats-base-dists-uniform-kurtosis":"0ZX","@stdlib/stats-base-dists-uniform-logcdf":"0ZY","@stdlib/stats-base-dists-uniform-logpdf":"0ZZ","@stdlib/stats-base-dists-uniform-mean":"0Za","@stdlib/stats-base-dists-uniform-median":"0Zb","@stdlib/stats-base-dists-uniform-mgf":"0Zc","@stdlib/stats-base-dists-uniform":"0Zd","@stdlib/stats-base-dists-uniform-pdf":"0Ze","@stdlib/stats-base-dists-uniform-quantile":"0Zf","@stdlib/stats-base-dists-uniform-skewness":"0Zg","@stdlib/stats-base-dists-uniform-stdev":"0Zh","@stdlib/stats-base-dists-uniform-variance":"0Zi","@stdlib/stats-base-dists-weibull-cdf":"0Zj","@stdlib/stats-base-dists-weibull-ctor":"0Zk","@stdlib/stats-base-dists-weibull-entropy":"0Zl","@stdlib/stats-base-dists-weibull-kurtosis":"0Zm","@stdlib/stats-base-dists-weibull-logcdf":"0Zn","@stdlib/stats-base-dists-weibull-logpdf":"0Zo","@stdlib/stats-base-dists-weibull-mean":"0Zp","@stdlib/stats-base-dists-weibull-median":"0Zq","@stdlib/stats-base-dists-weibull-mgf":"0Zr","@stdlib/stats-base-dists-weibull-mode":"0Zs","@stdlib/stats-base-dists-weibull":"0Zt","@stdlib/stats-base-dists-weibull-pdf":"0Zu","@stdlib/stats-base-dists-weibull-quantile":"0Zv","@stdlib/stats-base-dists-weibull-skewness":"0Zw","@stdlib/stats-base-dists-weibull-stdev":"0Zx","@stdlib/stats-base-dists-weibull-variance":"0Zy","@stdlib/stats-base-dmax":"0Zz","@stdlib/stats-base-dmaxabs":"0a0","@stdlib/stats-base-dmaxabssorted":"0a1","@stdlib/stats-base-dmaxsorted":"0a2","@stdlib/stats-base-dmean":"0a3","@stdlib/stats-base-dmeankbn":"0a4","@stdlib/stats-base-dmeankbn2":"0a5","@stdlib/stats-base-dmeanli":"0a6","@stdlib/stats-base-dmeanlipw":"0a7","@stdlib/stats-base-dmeanors":"0a8","@stdlib/stats-base-dmeanpn":"0a9","@stdlib/stats-base-dmeanpw":"0aA","@stdlib/stats-base-dmeanstdev":"0aB","@stdlib/stats-base-dmeanstdevpn":"0aC","@stdlib/stats-base-dmeanvar":"0aD","@stdlib/stats-base-dmeanvarpn":"0aE","@stdlib/stats-base-dmeanwd":"0aF","@stdlib/stats-base-dmediansorted":"0aG","@stdlib/stats-base-dmidrange":"0aH","@stdlib/stats-base-dmin":"0aI","@stdlib/stats-base-dminabs":"0aJ","@stdlib/stats-base-dminsorted":"0aK","@stdlib/stats-base-dmskmax":"0aL","@stdlib/stats-base-dmskmin":"0aM","@stdlib/stats-base-dmskrange":"0aN","@stdlib/stats-base-dnanmax":"0aO","@stdlib/stats-base-dnanmaxabs":"0aP","@stdlib/stats-base-dnanmean":"0aQ","@stdlib/stats-base-dnanmeanors":"0aR","@stdlib/stats-base-dnanmeanpn":"0aS","@stdlib/stats-base-dnanmeanpw":"0aT","@stdlib/stats-base-dnanmeanwd":"0aU","@stdlib/stats-base-dnanmin":"0aV","@stdlib/stats-base-dnanminabs":"0aW","@stdlib/stats-base-dnanmskmax":"0aX","@stdlib/stats-base-dnanmskmin":"0aY","@stdlib/stats-base-dnanmskrange":"0aZ","@stdlib/stats-base-dnanrange":"0aa","@stdlib/stats-base-dnanstdev":"0ab","@stdlib/stats-base-dnanstdevch":"0ac","@stdlib/stats-base-dnanstdevpn":"0ad","@stdlib/stats-base-dnanstdevtk":"0ae","@stdlib/stats-base-dnanstdevwd":"0af","@stdlib/stats-base-dnanstdevyc":"0ag","@stdlib/stats-base-dnanvariance":"0ah","@stdlib/stats-base-dnanvariancech":"0ai","@stdlib/stats-base-dnanvariancepn":"0aj","@stdlib/stats-base-dnanvariancetk":"0ak","@stdlib/stats-base-dnanvariancewd":"0al","@stdlib/stats-base-dnanvarianceyc":"0am","@stdlib/stats-base-drange":"0an","@stdlib/stats-base-dsem":"0ao","@stdlib/stats-base-dsemch":"0ap","@stdlib/stats-base-dsempn":"0aq","@stdlib/stats-base-dsemtk":"0ar","@stdlib/stats-base-dsemwd":"0as","@stdlib/stats-base-dsemyc":"0at","@stdlib/stats-base-dsmean":"0au","@stdlib/stats-base-dsmeanors":"0av","@stdlib/stats-base-dsmeanpn":"0aw","@stdlib/stats-base-dsmeanpw":"0ax","@stdlib/stats-base-dsmeanwd":"0ay","@stdlib/stats-base-dsnanmean":"0az","@stdlib/stats-base-dsnanmeanors":"0b0","@stdlib/stats-base-dsnanmeanpn":"0b1","@stdlib/stats-base-dsnanmeanwd":"0b2","@stdlib/stats-base-dstdev":"0b3","@stdlib/stats-base-dstdevch":"0b4","@stdlib/stats-base-dstdevpn":"0b5","@stdlib/stats-base-dstdevtk":"0b6","@stdlib/stats-base-dstdevwd":"0b7","@stdlib/stats-base-dstdevyc":"0b8","@stdlib/stats-base-dsvariance":"0b9","@stdlib/stats-base-dsvariancepn":"0bA","@stdlib/stats-base-dvariance":"0bB","@stdlib/stats-base-dvariancech":"0bC","@stdlib/stats-base-dvariancepn":"0bD","@stdlib/stats-base-dvariancetk":"0bE","@stdlib/stats-base-dvariancewd":"0bF","@stdlib/stats-base-dvarianceyc":"0bG","@stdlib/stats-base-dvarm":"0bH","@stdlib/stats-base-dvarmpn":"0bI","@stdlib/stats-base-dvarmtk":"0bJ","@stdlib/stats-base-max-by":"0bK","@stdlib/stats-base-max":"0bL","@stdlib/stats-base-maxabs":"0bM","@stdlib/stats-base-maxsorted":"0bN","@stdlib/stats-base-mean":"0bO","@stdlib/stats-base-meankbn":"0bP","@stdlib/stats-base-meankbn2":"0bQ","@stdlib/stats-base-meanors":"0bR","@stdlib/stats-base-meanpn":"0bS","@stdlib/stats-base-meanpw":"0bT","@stdlib/stats-base-meanwd":"0bU","@stdlib/stats-base-mediansorted":"0bV","@stdlib/stats-base-min-by":"0bW","@stdlib/stats-base-min":"0bX","@stdlib/stats-base-minabs":"0bY","@stdlib/stats-base-minsorted":"0bZ","@stdlib/stats-base-mskmax":"0ba","@stdlib/stats-base-mskmin":"0bb","@stdlib/stats-base-mskrange":"0bc","@stdlib/stats-base-nanmax-by":"0bd","@stdlib/stats-base-nanmax":"0be","@stdlib/stats-base-nanmaxabs":"0bf","@stdlib/stats-base-nanmean":"0bg","@stdlib/stats-base-nanmeanors":"0bh","@stdlib/stats-base-nanmeanpn":"0bi","@stdlib/stats-base-nanmeanwd":"0bj","@stdlib/stats-base-nanmin-by":"0bk","@stdlib/stats-base-nanmin":"0bl","@stdlib/stats-base-nanminabs":"0bm","@stdlib/stats-base-nanmskmax":"0bn","@stdlib/stats-base-nanmskmin":"0bo","@stdlib/stats-base-nanmskrange":"0bp","@stdlib/stats-base-nanrange-by":"0bq","@stdlib/stats-base-nanrange":"0br","@stdlib/stats-base-nanstdev":"0bs","@stdlib/stats-base-nanstdevch":"0bt","@stdlib/stats-base-nanstdevpn":"0bu","@stdlib/stats-base-nanstdevtk":"0bv","@stdlib/stats-base-nanstdevwd":"0bw","@stdlib/stats-base-nanstdevyc":"0bx","@stdlib/stats-base-nanvariance":"0by","@stdlib/stats-base-nanvariancech":"0bz","@stdlib/stats-base-nanvariancepn":"0c0","@stdlib/stats-base-nanvariancetk":"0c1","@stdlib/stats-base-nanvariancewd":"0c2","@stdlib/stats-base-nanvarianceyc":"0c3","@stdlib/stats-base":"0c4","@stdlib/stats-base-range-by":"0c5","@stdlib/stats-base-range":"0c6","@stdlib/stats-base-scumax":"0c7","@stdlib/stats-base-scumaxabs":"0c8","@stdlib/stats-base-scumin":"0c9","@stdlib/stats-base-scuminabs":"0cA","@stdlib/stats-base-sdsmean":"0cB","@stdlib/stats-base-sdsmeanors":"0cC","@stdlib/stats-base-sdsnanmean":"0cD","@stdlib/stats-base-sdsnanmeanors":"0cE","@stdlib/stats-base-smax":"0cF","@stdlib/stats-base-smaxabs":"0cG","@stdlib/stats-base-smaxabssorted":"0cH","@stdlib/stats-base-smaxsorted":"0cI","@stdlib/stats-base-smean":"0cJ","@stdlib/stats-base-smeankbn":"0cK","@stdlib/stats-base-smeankbn2":"0cL","@stdlib/stats-base-smeanli":"0cM","@stdlib/stats-base-smeanlipw":"0cN","@stdlib/stats-base-smeanors":"0cO","@stdlib/stats-base-smeanpn":"0cP","@stdlib/stats-base-smeanpw":"0cQ","@stdlib/stats-base-smeanwd":"0cR","@stdlib/stats-base-smediansorted":"0cS","@stdlib/stats-base-smidrange":"0cT","@stdlib/stats-base-smin":"0cU","@stdlib/stats-base-sminabs":"0cV","@stdlib/stats-base-sminsorted":"0cW","@stdlib/stats-base-smskmax":"0cX","@stdlib/stats-base-smskmin":"0cY","@stdlib/stats-base-smskrange":"0cZ","@stdlib/stats-base-snanmax":"0ca","@stdlib/stats-base-snanmaxabs":"0cb","@stdlib/stats-base-snanmean":"0cc","@stdlib/stats-base-snanmeanors":"0cd","@stdlib/stats-base-snanmeanpn":"0ce","@stdlib/stats-base-snanmeanwd":"0cf","@stdlib/stats-base-snanmin":"0cg","@stdlib/stats-base-snanminabs":"0ch","@stdlib/stats-base-snanmskmax":"0ci","@stdlib/stats-base-snanmskmin":"0cj","@stdlib/stats-base-snanmskrange":"0ck","@stdlib/stats-base-snanrange":"0cl","@stdlib/stats-base-snanstdev":"0cm","@stdlib/stats-base-snanstdevch":"0cn","@stdlib/stats-base-snanstdevpn":"0co","@stdlib/stats-base-snanstdevtk":"0cp","@stdlib/stats-base-snanstdevwd":"0cq","@stdlib/stats-base-snanstdevyc":"0cr","@stdlib/stats-base-snanvariance":"0cs","@stdlib/stats-base-snanvariancech":"0ct","@stdlib/stats-base-snanvariancepn":"0cu","@stdlib/stats-base-snanvariancetk":"0cv","@stdlib/stats-base-snanvariancewd":"0cw","@stdlib/stats-base-snanvarianceyc":"0cx","@stdlib/stats-base-srange":"0cy","@stdlib/stats-base-sstdev":"0cz","@stdlib/stats-base-sstdevch":"0d0","@stdlib/stats-base-sstdevpn":"0d1","@stdlib/stats-base-sstdevtk":"0d2","@stdlib/stats-base-sstdevwd":"0d3","@stdlib/stats-base-sstdevyc":"0d4","@stdlib/stats-base-stdev":"0d5","@stdlib/stats-base-stdevch":"0d6","@stdlib/stats-base-stdevpn":"0d7","@stdlib/stats-base-stdevtk":"0d8","@stdlib/stats-base-stdevwd":"0d9","@stdlib/stats-base-stdevyc":"0dA","@stdlib/stats-base-svariance":"0dB","@stdlib/stats-base-svariancech":"0dC","@stdlib/stats-base-svariancepn":"0dD","@stdlib/stats-base-svariancetk":"0dE","@stdlib/stats-base-svariancewd":"0dF","@stdlib/stats-base-svarianceyc":"0dG","@stdlib/stats-base-variance":"0dH","@stdlib/stats-base-variancech":"0dI","@stdlib/stats-base-variancepn":"0dJ","@stdlib/stats-base-variancetk":"0dK","@stdlib/stats-base-variancewd":"0dL","@stdlib/stats-base-varianceyc":"0dM","@stdlib/stats-binomial-test":"0dN","@stdlib/stats-chi2gof":"0dO","@stdlib/stats-chi2test":"0dP","@stdlib/stats-fligner-test":"0dQ","@stdlib/stats-incr-apcorr":"0dR","@stdlib/stats-incr-count":"0dS","@stdlib/stats-incr-covariance":"0dT","@stdlib/stats-incr-covmat":"0dU","@stdlib/stats-incr-cv":"0dV","@stdlib/stats-incr-ewmean":"0dW","@stdlib/stats-incr-ewstdev":"0dX","@stdlib/stats-incr-ewvariance":"0dY","@stdlib/stats-incr-gmean":"0dZ","@stdlib/stats-incr-grubbs":"0da","@stdlib/stats-incr-hmean":"0db","@stdlib/stats-incr-kurtosis":"0dc","@stdlib/stats-incr-maape":"0dd","@stdlib/stats-incr-mae":"0de","@stdlib/stats-incr-mapcorr":"0df","@stdlib/stats-incr-mape":"0dg","@stdlib/stats-incr-max":"0dh","@stdlib/stats-incr-maxabs":"0di","@stdlib/stats-incr-mcovariance":"0dj","@stdlib/stats-incr-mcv":"0dk","@stdlib/stats-incr-mda":"0dl","@stdlib/stats-incr-me":"0dm","@stdlib/stats-incr-mean":"0dn","@stdlib/stats-incr-meanabs":"0do","@stdlib/stats-incr-meanabs2":"0dp","@stdlib/stats-incr-meanstdev":"0dq","@stdlib/stats-incr-meanvar":"0dr","@stdlib/stats-incr-mgmean":"0ds","@stdlib/stats-incr-mgrubbs":"0dt","@stdlib/stats-incr-mhmean":"0du","@stdlib/stats-incr-midrange":"0dv","@stdlib/stats-incr-min":"0dw","@stdlib/stats-incr-minabs":"0dx","@stdlib/stats-incr-minmax":"0dy","@stdlib/stats-incr-minmaxabs":"0dz","@stdlib/stats-incr-mmaape":"0e0","@stdlib/stats-incr-mmae":"0e1","@stdlib/stats-incr-mmape":"0e2","@stdlib/stats-incr-mmax":"0e3","@stdlib/stats-incr-mmaxabs":"0e4","@stdlib/stats-incr-mmda":"0e5","@stdlib/stats-incr-mme":"0e6","@stdlib/stats-incr-mmean":"0e7","@stdlib/stats-incr-mmeanabs":"0e8","@stdlib/stats-incr-mmeanabs2":"0e9","@stdlib/stats-incr-mmeanstdev":"0eA","@stdlib/stats-incr-mmeanvar":"0eB","@stdlib/stats-incr-mmidrange":"0eC","@stdlib/stats-incr-mmin":"0eD","@stdlib/stats-incr-mminabs":"0eE","@stdlib/stats-incr-mminmax":"0eF","@stdlib/stats-incr-mminmaxabs":"0eG","@stdlib/stats-incr-mmpe":"0eH","@stdlib/stats-incr-mmse":"0eI","@stdlib/stats-incr-mpcorr":"0eJ","@stdlib/stats-incr-mpcorr2":"0eK","@stdlib/stats-incr-mpcorrdist":"0eL","@stdlib/stats-incr-mpe":"0eM","@stdlib/stats-incr-mprod":"0eN","@stdlib/stats-incr-mrange":"0eO","@stdlib/stats-incr-mrmse":"0eP","@stdlib/stats-incr-mrss":"0eQ","@stdlib/stats-incr-mse":"0eR","@stdlib/stats-incr-mstdev":"0eS","@stdlib/stats-incr-msum":"0eT","@stdlib/stats-incr-msumabs":"0eU","@stdlib/stats-incr-msumabs2":"0eV","@stdlib/stats-incr-msummary":"0eW","@stdlib/stats-incr-msumprod":"0eX","@stdlib/stats-incr-mvariance":"0eY","@stdlib/stats-incr-mvmr":"0eZ","@stdlib/stats-incr-nancount":"0ea","@stdlib/stats-incr-nansum":"0eb","@stdlib/stats-incr-nansumabs":"0ec","@stdlib/stats-incr-nansumabs2":"0ed","@stdlib/stats-incr":"0ee","@stdlib/stats-incr-pcorr":"0ef","@stdlib/stats-incr-pcorr2":"0eg","@stdlib/stats-incr-pcorrdist":"0eh","@stdlib/stats-incr-pcorrdistmat":"0ei","@stdlib/stats-incr-pcorrmat":"0ej","@stdlib/stats-incr-prod":"0ek","@stdlib/stats-incr-range":"0el","@stdlib/stats-incr-rmse":"0em","@stdlib/stats-incr-rss":"0en","@stdlib/stats-incr-skewness":"0eo","@stdlib/stats-incr-stdev":"0ep","@stdlib/stats-incr-sum":"0eq","@stdlib/stats-incr-sumabs":"0er","@stdlib/stats-incr-sumabs2":"0es","@stdlib/stats-incr-summary":"0et","@stdlib/stats-incr-sumprod":"0eu","@stdlib/stats-incr-variance":"0ev","@stdlib/stats-incr-vmr":"0ew","@stdlib/stats-incr-wmean":"0ex","@stdlib/stats-iter-cugmean":"0ey","@stdlib/stats-iter-cuhmean":"0ez","@stdlib/stats-iter-cumax":"0f0","@stdlib/stats-iter-cumaxabs":"0f1","@stdlib/stats-iter-cumean":"0f2","@stdlib/stats-iter-cumeanabs":"0f3","@stdlib/stats-iter-cumeanabs2":"0f4","@stdlib/stats-iter-cumidrange":"0f5","@stdlib/stats-iter-cumin":"0f6","@stdlib/stats-iter-cuminabs":"0f7","@stdlib/stats-iter-cuprod":"0f8","@stdlib/stats-iter-curange":"0f9","@stdlib/stats-iter-cusum":"0fA","@stdlib/stats-iter-cusumabs":"0fB","@stdlib/stats-iter-cusumabs2":"0fC","@stdlib/stats-iter-max":"0fD","@stdlib/stats-iter-maxabs":"0fE","@stdlib/stats-iter-mean":"0fF","@stdlib/stats-iter-meanabs":"0fG","@stdlib/stats-iter-meanabs2":"0fH","@stdlib/stats-iter-midrange":"0fI","@stdlib/stats-iter-min":"0fJ","@stdlib/stats-iter-minabs":"0fK","@stdlib/stats-iter-mmax":"0fL","@stdlib/stats-iter-mmaxabs":"0fM","@stdlib/stats-iter-mmean":"0fN","@stdlib/stats-iter-mmeanabs":"0fO","@stdlib/stats-iter-mmeanabs2":"0fP","@stdlib/stats-iter-mmidrange":"0fQ","@stdlib/stats-iter-mmin":"0fR","@stdlib/stats-iter-mminabs":"0fS","@stdlib/stats-iter-mprod":"0fT","@stdlib/stats-iter-mrange":"0fU","@stdlib/stats-iter-msum":"0fV","@stdlib/stats-iter-msumabs":"0fW","@stdlib/stats-iter-msumabs2":"0fX","@stdlib/stats-iter":"0fY","@stdlib/stats-iter-prod":"0fZ","@stdlib/stats-iter-range":"0fa","@stdlib/stats-iter-stdev":"0fb","@stdlib/stats-iter-sum":"0fc","@stdlib/stats-iter-sumabs":"0fd","@stdlib/stats-iter-sumabs2":"0fe","@stdlib/stats-iter-variance":"0ff","@stdlib/stats-kde2d":"0fg","@stdlib/stats-kruskal-test":"0fh","@stdlib/stats-kstest":"0fi","@stdlib/stats-levene-test":"0fj","@stdlib/stats-lowess":"0fk","@stdlib/stats":"0fl","@stdlib/stats-padjust":"0fm","@stdlib/stats-pcorrtest":"0fn","@stdlib/stats-ranks":"0fo","@stdlib/stats-ttest":"0fp","@stdlib/stats-ttest2":"0fq","@stdlib/stats-vartest":"0fr","@stdlib/stats-wilcoxon":"0fs","@stdlib/stats-ztest":"0ft","@stdlib/stats-ztest2":"0fu","@stdlib/streams-node-debug-sink":"0fv","@stdlib/streams-node-debug":"0fw","@stdlib/streams-node-empty":"0fx","@stdlib/streams-node-from-array":"0fy","@stdlib/streams-node-from-circular-array":"0fz","@stdlib/streams-node-from-constant":"0g0","@stdlib/streams-node-from-iterator":"0g1","@stdlib/streams-node-from-strided-array":"0g2","@stdlib/streams-node-inspect-sink":"0g3","@stdlib/streams-node-inspect":"0g4","@stdlib/streams-node-join":"0g5","@stdlib/streams-node":"0g6","@stdlib/streams-node-split":"0g7","@stdlib/streams-node-stderr":"0g8","@stdlib/streams-node-stdin":"0g9","@stdlib/streams-node-stdout":"0gA","@stdlib/streams-node-transform":"0gB","@stdlib/streams":"0gC","@stdlib/strided-base-binary-addon-dispatch":"0gD","@stdlib/strided-base-binary-dtype-signatures":"0gE","@stdlib/strided-base-binary-signature-callbacks":"0gF","@stdlib/strided-base-binary":"0gG","@stdlib/strided-base-cmap":"0gH","@stdlib/strided-base-dmap":"0gI","@stdlib/strided-base-dmap2":"0gJ","@stdlib/strided-base-dmskmap":"0gK","@stdlib/strided-base-dmskmap2":"0gL","@stdlib/strided-base-dtype-enum2str":"0gM","@stdlib/strided-base-dtype-resolve-enum":"0gN","@stdlib/strided-base-dtype-resolve-str":"0gO","@stdlib/strided-base-dtype-str2enum":"0gP","@stdlib/strided-base-function-object":"0gQ","@stdlib/strided-base-map-by":"0gR","@stdlib/strided-base-map-by2":"0gS","@stdlib/strided-base-max-view-buffer-index":"0gT","@stdlib/strided-base-meta-data-props":"0gU","@stdlib/strided-base-min-view-buffer-index":"0gV","@stdlib/strided-base-mskunary":"0gW","@stdlib/strided-base-nullary":"0gX","@stdlib/strided-base-offset-view":"0gY","@stdlib/strided-base":"0gZ","@stdlib/strided-base-quaternary":"0ga","@stdlib/strided-base-quinary":"0gb","@stdlib/strided-base-reinterpret-complex128":"0gc","@stdlib/strided-base-reinterpret-complex64":"0gd","@stdlib/strided-base-smap":"0ge","@stdlib/strided-base-smap2":"0gf","@stdlib/strided-base-smskmap":"0gg","@stdlib/strided-base-smskmap2":"0gh","@stdlib/strided-base-ternary":"0gi","@stdlib/strided-base-unary-addon-dispatch":"0gj","@stdlib/strided-base-unary":"0gk","@stdlib/strided-base-zmap":"0gl","@stdlib/strided-common":"0gm","@stdlib/strided-dispatch":"0gn","@stdlib/strided-dtypes":"0go","@stdlib/strided-napi-addon-arguments":"0gp","@stdlib/strided-napi-binary":"0gq","@stdlib/strided-napi-cmap":"0gr","@stdlib/strided-napi-dmap":"0gs","@stdlib/strided-napi-dmap2":"0gt","@stdlib/strided-napi-dmskmap":"0gu","@stdlib/strided-napi-dmskmap2":"0gv","@stdlib/strided-napi-mskunary":"0gw","@stdlib/strided-napi":"0gx","@stdlib/strided-napi-smap":"0gy","@stdlib/strided-napi-smap2":"0gz","@stdlib/strided-napi-smskmap":"0h0","@stdlib/strided-napi-smskmap2":"0h1","@stdlib/strided-napi-unary":"0h2","@stdlib/strided-napi-zmap":"0h3","@stdlib/strided":"0h4","@stdlib/string-acronym":"0h5","@stdlib/string-camelcase":"0h6","@stdlib/string-capitalize":"0h7","@stdlib/string-code-point-at":"0h8","@stdlib/string-constantcase":"0h9","@stdlib/string-ends-with":"0hA","@stdlib/string-format":"0hB","@stdlib/string-from-code-point":"0hC","@stdlib/string-kebabcase":"0hD","@stdlib/string-left-pad":"0hE","@stdlib/string-left-trim-n":"0hF","@stdlib/string-left-trim":"0hG","@stdlib/string-lowercase":"0hH","@stdlib/string-next-grapheme-cluster-break":"0hI","@stdlib/string-num-grapheme-clusters":"0hJ","@stdlib/string":"0hK","@stdlib/string-pad":"0hL","@stdlib/string-pascalcase":"0hM","@stdlib/string-percent-encode":"0hN","@stdlib/string-prev-grapheme-cluster-break":"0hO","@stdlib/string-remove-first":"0hP","@stdlib/string-remove-last":"0hQ","@stdlib/string-remove-punctuation":"0hR","@stdlib/string-remove-utf8-bom":"0hS","@stdlib/string-remove-words":"0hT","@stdlib/string-repeat":"0hU","@stdlib/string-replace":"0hV","@stdlib/string-reverse":"0hW","@stdlib/string-right-pad":"0hX","@stdlib/string-right-trim-n":"0hY","@stdlib/string-right-trim":"0hZ","@stdlib/string-snakecase":"0ha","@stdlib/string-split-grapheme-clusters":"0hb","@stdlib/string-startcase":"0hc","@stdlib/string-starts-with":"0hd","@stdlib/string-substring-after-last":"0he","@stdlib/string-substring-after":"0hf","@stdlib/string-substring-before-last":"0hg","@stdlib/string-substring-before":"0hh","@stdlib/string-tools-grapheme-cluster-break":"0hi","@stdlib/string-tools":"0hj","@stdlib/string-trim":"0hk","@stdlib/string-truncate-middle":"0hl","@stdlib/string-truncate":"0hm","@stdlib/string-uncapitalize":"0hn","@stdlib/string-uppercase":"0ho","@stdlib/string-utf16-to-utf8-array":"0hp","@stdlib/symbol-async-iterator":"0hq","@stdlib/symbol-ctor":"0hr","@stdlib/symbol-iterator":"0hs","@stdlib/symbol":"0ht","@stdlib/time-day-of-quarter":"0hu","@stdlib/time-day-of-year":"0hv","@stdlib/time-days-in-month":"0hw","@stdlib/time-days-in-year":"0hx","@stdlib/time-hours-in-month":"0hy","@stdlib/time-hours-in-year":"0hz","@stdlib/time-iso-weeks-in-year":"0i0","@stdlib/time-minutes-in-month":"0i1","@stdlib/time-minutes-in-year":"0i2","@stdlib/time-now":"0i3","@stdlib/time":"0i4","@stdlib/time-quarter-of-year":"0i5","@stdlib/time-seconds-in-month":"0i6","@stdlib/time-seconds-in-year":"0i7","@stdlib/time-tic":"0i8","@stdlib/time-toc":"0i9","@stdlib/types":"0iA","@stdlib/utils-any-by-right":"0iB","@stdlib/utils-any-by":"0iC","@stdlib/utils-any":"0iD","@stdlib/utils-append":"0iE","@stdlib/utils-argument-function":"0iF","@stdlib/utils-async-any-by-right":"0iG","@stdlib/utils-async-any-by":"0iH","@stdlib/utils-async-bifurcate-by":"0iI","@stdlib/utils-async-compose":"0iJ","@stdlib/utils-async-count-by":"0iK","@stdlib/utils-async-do-until":"0iL","@stdlib/utils-async-do-while":"0iM","@stdlib/utils-async-every-by-right":"0iN","@stdlib/utils-async-every-by":"0iO","@stdlib/utils-async-for-each-right":"0iP","@stdlib/utils-async-for-each":"0iQ","@stdlib/utils-async-function-sequence":"0iR","@stdlib/utils-async-group-by":"0iS","@stdlib/utils-async-if-else":"0iT","@stdlib/utils-async-if-then":"0iU","@stdlib/utils-async-inmap-right":"0iV","@stdlib/utils-async-inmap":"0iW","@stdlib/utils-async-map-function":"0iX","@stdlib/utils-async-map-keys":"0iY","@stdlib/utils-async-map-values":"0iZ","@stdlib/utils-async-none-by-right":"0ia","@stdlib/utils-async-none-by":"0ib","@stdlib/utils-async":"0ic","@stdlib/utils-async-reduce-right":"0id","@stdlib/utils-async-reduce":"0ie","@stdlib/utils-async-series-waterfall":"0if","@stdlib/utils-async-some-by-right":"0ig","@stdlib/utils-async-some-by":"0ih","@stdlib/utils-async-tabulate-by":"0ii","@stdlib/utils-async-try-catch":"0ij","@stdlib/utils-async-try-then":"0ik","@stdlib/utils-async-until":"0il","@stdlib/utils-async-while":"0im","@stdlib/utils-bifurcate-by":"0in","@stdlib/utils-bifurcate-in":"0io","@stdlib/utils-bifurcate-own":"0ip","@stdlib/utils-bifurcate":"0iq","@stdlib/utils-capitalize-keys":"0ir","@stdlib/utils-circular-buffer":"0is","@stdlib/utils-common-keys-in":"0it","@stdlib/utils-common-keys":"0iu","@stdlib/utils-compact-adjacency-matrix":"0iv","@stdlib/utils-compose":"0iw","@stdlib/utils-constant-function":"0ix","@stdlib/utils-constructor-name":"0iy","@stdlib/utils-convert-path":"0iz","@stdlib/utils-copy":"0j0","@stdlib/utils-count-by":"0j1","@stdlib/utils-curry-right":"0j2","@stdlib/utils-curry":"0j3","@stdlib/utils-deep-get":"0j4","@stdlib/utils-deep-pluck":"0j5","@stdlib/utils-deep-set":"0j6","@stdlib/utils-define-configurable-read-only-accessor":"0j7","@stdlib/utils-define-configurable-read-only-property":"0j8","@stdlib/utils-define-configurable-read-write-accessor":"0j9","@stdlib/utils-define-configurable-write-only-accessor":"0jA","@stdlib/utils-define-memoized-configurable-read-only-property":"0jB","@stdlib/utils-define-memoized-property":"0jC","@stdlib/utils-define-memoized-read-only-property":"0jD","@stdlib/utils-define-nonenumerable-property":"0jE","@stdlib/utils-define-nonenumerable-read-only-accessor":"0jF","@stdlib/utils-define-nonenumerable-read-only-property":"0jG","@stdlib/utils-define-nonenumerable-read-write-accessor":"0jH","@stdlib/utils-define-nonenumerable-write-only-accessor":"0jI","@stdlib/utils-define-properties":"0jJ","@stdlib/utils-define-property":"0jK","@stdlib/utils-define-read-only-accessor":"0jL","@stdlib/utils-define-read-only-property":"0jM","@stdlib/utils-define-read-write-accessor":"0jN","@stdlib/utils-define-write-only-accessor":"0jO","@stdlib/utils-dirname":"0jP","@stdlib/utils-do-until-each-right":"0jQ","@stdlib/utils-do-until-each":"0jR","@stdlib/utils-do-until":"0jS","@stdlib/utils-do-while-each-right":"0jT","@stdlib/utils-do-while-each":"0jU","@stdlib/utils-do-while":"0jV","@stdlib/utils-doubly-linked-list":"0jW","@stdlib/utils-entries-in":"0jX","@stdlib/utils-entries":"0jY","@stdlib/utils-enumerable-properties-in":"0jZ","@stdlib/utils-enumerable-properties":"0ja","@stdlib/utils-enumerable-property-symbols-in":"0jb","@stdlib/utils-enumerable-property-symbols":"0jc","@stdlib/utils-escape-regexp-string":"0jd","@stdlib/utils-eval":"0je","@stdlib/utils-every-by-right":"0jf","@stdlib/utils-every-by":"0jg","@stdlib/utils-every":"0jh","@stdlib/utils-extname":"0ji","@stdlib/utils-fifo":"0jj","@stdlib/utils-filter-arguments":"0jk","@stdlib/utils-find":"0jl","@stdlib/utils-flatten-array":"0jm","@stdlib/utils-flatten-object":"0jn","@stdlib/utils-for-each-right":"0jo","@stdlib/utils-for-each":"0jp","@stdlib/utils-for-in":"0jq","@stdlib/utils-for-own":"0jr","@stdlib/utils-from-entries":"0js","@stdlib/utils-function-name":"0jt","@stdlib/utils-function-sequence":"0ju","@stdlib/utils-get-prototype-of":"0jv","@stdlib/utils-global":"0jw","@stdlib/utils-group-by":"0jx","@stdlib/utils-group-in":"0jy","@stdlib/utils-group-own":"0jz","@stdlib/utils-group":"0k0","@stdlib/utils-identity-function":"0k1","@stdlib/utils-if-else":"0k2","@stdlib/utils-if-then":"0k3","@stdlib/utils-index-of":"0k4","@stdlib/utils-inherit":"0k5","@stdlib/utils-inherited-enumerable-properties":"0k6","@stdlib/utils-inherited-enumerable-property-symbols":"0k7","@stdlib/utils-inherited-keys":"0k8","@stdlib/utils-inherited-nonenumerable-properties":"0k9","@stdlib/utils-inherited-nonenumerable-property-names":"0kA","@stdlib/utils-inherited-nonenumerable-property-symbols":"0kB","@stdlib/utils-inherited-properties":"0kC","@stdlib/utils-inherited-property-descriptor":"0kD","@stdlib/utils-inherited-property-descriptors":"0kE","@stdlib/utils-inherited-property-names":"0kF","@stdlib/utils-inherited-property-symbols":"0kG","@stdlib/utils-inherited-writable-properties":"0kH","@stdlib/utils-inherited-writable-property-names":"0kI","@stdlib/utils-inherited-writable-property-symbols":"0kJ","@stdlib/utils-inmap-right":"0kK","@stdlib/utils-inmap":"0kL","@stdlib/utils-key-by-right":"0kM","@stdlib/utils-key-by":"0kN","@stdlib/utils-keys-in":"0kO","@stdlib/utils-keys":"0kP","@stdlib/utils-library-manifest":"0kQ","@stdlib/utils-linked-list":"0kR","@stdlib/utils-lowercase-keys":"0kS","@stdlib/utils-map-arguments":"0kT","@stdlib/utils-map-function":"0kU","@stdlib/utils-map-keys":"0kV","@stdlib/utils-map-reduce-right":"0kW","@stdlib/utils-map-reduce":"0kX","@stdlib/utils-map-right":"0kY","@stdlib/utils-map-values":"0kZ","@stdlib/utils-map":"0ka","@stdlib/utils-map2-right":"0kb","@stdlib/utils-map2":"0kc","@stdlib/utils-map2d":"0kd","@stdlib/utils-map3d":"0ke","@stdlib/utils-map4d":"0kf","@stdlib/utils-map5d":"0kg","@stdlib/utils-mask-arguments":"0kh","@stdlib/utils-memoize":"0ki","@stdlib/utils-merge":"0kj","@stdlib/utils-move-property":"0kk","@stdlib/utils-named-typed-tuple":"0kl","@stdlib/utils-nary-function":"0km","@stdlib/utils-native-class":"0kn","@stdlib/utils-next-tick":"0ko","@stdlib/utils-none-by-right":"0kp","@stdlib/utils-none-by":"0kq","@stdlib/utils-none":"0kr","@stdlib/utils-nonenumerable-properties-in":"0ks","@stdlib/utils-nonenumerable-properties":"0kt","@stdlib/utils-nonenumerable-property-names-in":"0ku","@stdlib/utils-nonenumerable-property-names":"0kv","@stdlib/utils-nonenumerable-property-symbols-in":"0kw","@stdlib/utils-nonenumerable-property-symbols":"0kx","@stdlib/utils-nonindex-keys":"0ky","@stdlib/utils-noop":"0kz","@stdlib/utils-object-inverse-by":"0l0","@stdlib/utils-object-inverse":"0l1","@stdlib/utils-omit-by":"0l2","@stdlib/utils-omit":"0l3","@stdlib/utils-open-url":"0l4","@stdlib/utils":"0l5","@stdlib/utils-papply-right":"0l6","@stdlib/utils-papply":"0l7","@stdlib/utils-parallel":"0l8","@stdlib/utils-parse-json":"0l9","@stdlib/utils-pick-arguments":"0lA","@stdlib/utils-pick-by":"0lB","@stdlib/utils-pick":"0lC","@stdlib/utils-pluck":"0lD","@stdlib/utils-pop":"0lE","@stdlib/utils-prepend":"0lF","@stdlib/utils-properties-in":"0lG","@stdlib/utils-properties":"0lH","@stdlib/utils-property-descriptor-in":"0lI","@stdlib/utils-property-descriptor":"0lJ","@stdlib/utils-property-descriptors-in":"0lK","@stdlib/utils-property-descriptors":"0lL","@stdlib/utils-property-names-in":"0lM","@stdlib/utils-property-names":"0lN","@stdlib/utils-property-symbols-in":"0lO","@stdlib/utils-property-symbols":"0lP","@stdlib/utils-push":"0lQ","@stdlib/utils-real-max":"0lR","@stdlib/utils-real-min":"0lS","@stdlib/utils-reduce-right":"0lT","@stdlib/utils-reduce":"0lU","@stdlib/utils-reduce2d":"0lV","@stdlib/utils-regexp-from-string":"0lW","@stdlib/utils-reject-arguments":"0lX","@stdlib/utils-reorder-arguments":"0lY","@stdlib/utils-reverse-arguments":"0lZ","@stdlib/utils-safe-int-max":"0la","@stdlib/utils-safe-int-min":"0lb","@stdlib/utils-shift":"0lc","@stdlib/utils-size-of":"0ld","@stdlib/utils-some-by-right":"0le","@stdlib/utils-some-by":"0lf","@stdlib/utils-some":"0lg","@stdlib/utils-stack":"0lh","@stdlib/utils-tabulate-by":"0li","@stdlib/utils-tabulate":"0lj","@stdlib/utils-timeit":"0lk","@stdlib/utils-try-catch":"0ll","@stdlib/utils-try-function":"0lm","@stdlib/utils-try-require":"0ln","@stdlib/utils-try-then":"0lo","@stdlib/utils-type-max":"0lp","@stdlib/utils-type-min":"0lq","@stdlib/utils-type-of":"0lr","@stdlib/utils-uncapitalize-keys":"0ls","@stdlib/utils-uncurry-right":"0lt","@stdlib/utils-uncurry":"0lu","@stdlib/utils-unshift":"0lv","@stdlib/utils-until-each-right":"0lw","@stdlib/utils-until-each":"0lx","@stdlib/utils-until":"0ly","@stdlib/utils-unzip":"0lz","@stdlib/utils-uppercase-keys":"0m0","@stdlib/utils-values-in":"0m1","@stdlib/utils-values":"0m2","@stdlib/utils-while-each-right":"0m3","@stdlib/utils-while-each":"0m4","@stdlib/utils-while":"0m5","@stdlib/utils-writable-properties-in":"0m6","@stdlib/utils-writable-properties":"0m7","@stdlib/utils-writable-property-names-in":"0m8","@stdlib/utils-writable-property-names":"0m9","@stdlib/utils-writable-property-symbols-in":"0mA","@stdlib/utils-writable-property-symbols":"0mB","@stdlib/utils-zip":"0mC"}
},{}],37:[function(require,module,exports){
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

},{"./main.js":38}],38:[function(require,module,exports){
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
var INTERNAL_TO_ID = require( './../data/internal.json' );
var STANDALONE_TO_ID = require( './../data/standalone.json' );


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
* // returns '0H5'
*/
function pkg2id( pkg ) {
	if ( !isString( pkg ) ) {
		throw new TypeError( format( 'invalid argument. Must provide a string. Value: `%s`.', pkg ) );
	}
	if ( hasOwnProp( INTERNAL_TO_ID, pkg ) ) {
		return INTERNAL_TO_ID[ pkg ];
	}
	if ( hasOwnProp( STANDALONE_TO_ID, pkg ) ) {
		return STANDALONE_TO_ID[ pkg ];
	}
	return null;
}


// EXPORTS //

module.exports = pkg2id;

},{"./../data/internal.json":35,"./../data/standalone.json":36,"@stdlib/assert/has-own-property":1,"@stdlib/assert/is-string":26,"@stdlib/string/format":60}],39:[function(require,module,exports){
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

},{}],40:[function(require,module,exports){
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
			t.strictEqual( stdout.toString(), '0H5\n', 'prints expected value' );
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
},{"./../package.json":39,"@stdlib/assert/is-browser":15,"@stdlib/assert/is-windows":32,"@stdlib/fs/read-file":42,"@stdlib/process/exec-path":46,"child_process":96,"path":99,"tape":199}],41:[function(require,module,exports){
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
},{"./../lib":37,"@stdlib/string/replace":63,"tape":199}],42:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":43,"./sync.js":44,"@stdlib/utils/define-nonenumerable-read-only-property":67}],43:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"fs":96}],44:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"fs":96}],45:[function(require,module,exports){
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

},{}],46:[function(require,module,exports){
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

},{}],47:[function(require,module,exports){
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

},{"./main.js":48,"./regexp.js":49,"@stdlib/utils/define-nonenumerable-read-only-property":67}],48:[function(require,module,exports){
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

},{"./main.js":48}],50:[function(require,module,exports){
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

},{"./is_number.js":53}],51:[function(require,module,exports){
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

},{"./is_number.js":53,"./zero_pad.js":57}],52:[function(require,module,exports){
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

},{"./main.js":55}],53:[function(require,module,exports){
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

},{}],54:[function(require,module,exports){
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

},{"./format_double.js":50,"./format_integer.js":51,"./is_string.js":54,"./space_pad.js":56,"./zero_pad.js":57}],56:[function(require,module,exports){
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

},{}],57:[function(require,module,exports){
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

},{"./main.js":59}],59:[function(require,module,exports){
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

},{}],60:[function(require,module,exports){
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

},{"./main.js":62}],61:[function(require,module,exports){
arguments[4][54][0].apply(exports,arguments)
},{"dup":54}],62:[function(require,module,exports){
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

},{"./is_string.js":61,"@stdlib/string/base/format-interpolate":52,"@stdlib/string/base/format-tokenize":58}],63:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./replace.js":64}],64:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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


// MAIN //

/**
* Replace search occurrences with a replacement string.
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
* var out = replace( str, /([^\s]*)/gi, replacer);
* // returns 'Oranges And Lemons Say The Bells Of St. Clement\'s'
*/
function replace( str, search, newval ) {
	if ( !isString( str ) ) {
		throw new TypeError( format( 'invalid argument. First argument must be a string. Value: `%s`.', str ) );
	}
	if ( isString( search ) ) {
		search = rescape( search );
		search = new RegExp( search, 'g' );
	}
	else if ( !isRegExp( search ) ) {
		throw new TypeError( format( 'invalid argument. Second argument must be a string or regular expression. Value: `%s`.', search ) );
	}
	if ( !isString( newval ) && !isFunction( newval ) ) {
		throw new TypeError( format( 'invalid argument. Third argument must be a string or replacement function. Value: `%s`.', newval ) );
	}
	return str.replace( search, newval );
}


// EXPORTS //

module.exports = replace;

},{"@stdlib/assert/is-function":18,"@stdlib/assert/is-regexp":23,"@stdlib/assert/is-string":26,"@stdlib/string/format":60,"@stdlib/utils/escape-regexp-string":74}],65:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":66}],66:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/assert/is-buffer":16,"@stdlib/regexp/function-name":47,"@stdlib/utils/native-class":82}],67:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/define-property":72}],69:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],70:[function(require,module,exports){
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

},{}],71:[function(require,module,exports){
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

},{"./define_property.js":70}],72:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./builtin.js":69,"./has_define_property_support.js":71,"./polyfill.js":73}],73:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
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

},{"@stdlib/string/format":60}],74:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/assert/is-string":26,"@stdlib/string/format":60}],76:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],77:[function(require,module,exports){
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
},{}],78:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./codegen.js":76,"./global.js":77,"./self.js":80,"./window.js":81,"@stdlib/assert/is-boolean":9,"@stdlib/string/format":60}],80:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

// MAIN //

var obj = ( typeof window === 'object' ) ? window : null;


// EXPORTS //

module.exports = obj;

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

},{"./native_class.js":83,"./polyfill.js":84,"@stdlib/assert/has-tostringtag-support":5}],83:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./tostring.js":85}],84:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./tostring.js":85,"./tostringtag.js":86,"@stdlib/assert/has-own-property":1}],85:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

var toStrTag = ( typeof Symbol === 'function' ) ? Symbol.toStringTag : '';


// EXPORTS //

module.exports = toStrTag;

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

},{"./fixtures/nodelist.js":88,"./fixtures/re.js":89,"./fixtures/typedarray.js":90}],88:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/global":78}],89:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

var typedarray = Int8Array; // eslint-disable-line stdlib/require-globals


// EXPORTS //

module.exports = typedarray;

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

},{"./check.js":87,"./polyfill.js":92,"./typeof.js":93}],92:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/constructor-name":65}],93:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/utils/constructor-name":65}],94:[function(require,module,exports){
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

},{}],95:[function(require,module,exports){

},{}],96:[function(require,module,exports){
arguments[4][95][0].apply(exports,arguments)
},{"dup":95}],97:[function(require,module,exports){
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
},{"base64-js":94,"buffer":97,"ieee754":185}],98:[function(require,module,exports){
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

},{}],99:[function(require,module,exports){
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
},{"_process":191}],100:[function(require,module,exports){
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

},{"events":98,"inherits":186,"readable-stream/lib/_stream_duplex.js":102,"readable-stream/lib/_stream_passthrough.js":103,"readable-stream/lib/_stream_readable.js":104,"readable-stream/lib/_stream_transform.js":105,"readable-stream/lib/_stream_writable.js":106,"readable-stream/lib/internal/streams/end-of-stream.js":110,"readable-stream/lib/internal/streams/pipeline.js":112}],101:[function(require,module,exports){
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

},{}],102:[function(require,module,exports){
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
},{"./_stream_readable":104,"./_stream_writable":106,"_process":191,"inherits":186}],103:[function(require,module,exports){
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
},{"./_stream_transform":105,"inherits":186}],104:[function(require,module,exports){
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
},{"../errors":101,"./_stream_duplex":102,"./internal/streams/async_iterator":107,"./internal/streams/buffer_list":108,"./internal/streams/destroy":109,"./internal/streams/from":111,"./internal/streams/state":113,"./internal/streams/stream":114,"_process":191,"buffer":97,"events":98,"inherits":186,"string_decoder/":198,"util":95}],105:[function(require,module,exports){
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
},{"../errors":101,"./_stream_duplex":102,"inherits":186}],106:[function(require,module,exports){
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
},{"../errors":101,"./_stream_duplex":102,"./internal/streams/destroy":109,"./internal/streams/state":113,"./internal/streams/stream":114,"_process":191,"buffer":97,"inherits":186,"util-deprecate":207}],107:[function(require,module,exports){
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
},{"./end-of-stream":110,"_process":191}],108:[function(require,module,exports){
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
},{"buffer":97,"util":95}],109:[function(require,module,exports){
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
},{"_process":191}],110:[function(require,module,exports){
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
},{"../../../errors":101}],111:[function(require,module,exports){
module.exports = function () {
  throw new Error('Readable.from is not available in the browser')
};

},{}],112:[function(require,module,exports){
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
},{"../../../errors":101,"./end-of-stream":110}],113:[function(require,module,exports){
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
},{"../../../errors":101}],114:[function(require,module,exports){
module.exports = require('events').EventEmitter;

},{"events":98}],115:[function(require,module,exports){
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

},{"./":116,"get-intrinsic":180}],116:[function(require,module,exports){
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

},{"function-bind":179,"get-intrinsic":180}],117:[function(require,module,exports){
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

},{"./lib/is_arguments.js":118,"./lib/keys.js":119}],118:[function(require,module,exports){
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

},{}],119:[function(require,module,exports){
exports = module.exports = typeof Object.keys === 'function'
  ? Object.keys : shim;

exports.shim = shim;
function shim (obj) {
  var keys = [];
  for (var key in obj) keys.push(key);
  return keys;
}

},{}],120:[function(require,module,exports){
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

},{"has-property-descriptors":181,"object-keys":189}],121:[function(require,module,exports){
module.exports = function () {
    for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] !== undefined) return arguments[i];
    }
};

},{}],122:[function(require,module,exports){
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

},{"./ToNumber":152,"./ToPrimitive":154,"./Type":159}],123:[function(require,module,exports){
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

},{"../helpers/isFinite":168,"../helpers/isNaN":170,"../helpers/isPrefixOf":171,"./ToNumber":152,"./ToPrimitive":154,"./Type":159,"get-intrinsic":180}],124:[function(require,module,exports){
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

},{"get-intrinsic":180}],125:[function(require,module,exports){
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

},{"./DayWithinYear":128,"./InLeapYear":132,"./MonthFromTime":142,"get-intrinsic":180}],126:[function(require,module,exports){
'use strict';

var floor = require('./floor');

var msPerDay = require('../helpers/timeConstants').msPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.2

module.exports = function Day(t) {
	return floor(t / msPerDay);
};

},{"../helpers/timeConstants":175,"./floor":163}],127:[function(require,module,exports){
'use strict';

var floor = require('./floor');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

module.exports = function DayFromYear(y) {
	return (365 * (y - 1970)) + floor((y - 1969) / 4) - floor((y - 1901) / 100) + floor((y - 1601) / 400);
};


},{"./floor":163}],128:[function(require,module,exports){
'use strict';

var Day = require('./Day');
var DayFromYear = require('./DayFromYear');
var YearFromTime = require('./YearFromTime');

// https://262.ecma-international.org/5.1/#sec-15.9.1.4

module.exports = function DayWithinYear(t) {
	return Day(t) - DayFromYear(YearFromTime(t));
};

},{"./Day":126,"./DayFromYear":127,"./YearFromTime":161}],129:[function(require,module,exports){
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

},{"./modulo":164}],130:[function(require,module,exports){
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

},{"../helpers/assertRecord":167,"./IsAccessorDescriptor":133,"./IsDataDescriptor":135,"./Type":159,"get-intrinsic":180}],131:[function(require,module,exports){
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

},{"../helpers/timeConstants":175,"./floor":163,"./modulo":164}],132:[function(require,module,exports){
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

},{"./DaysInYear":129,"./YearFromTime":161,"get-intrinsic":180}],133:[function(require,module,exports){
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

},{"../helpers/assertRecord":167,"./Type":159,"has":184}],134:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.11

module.exports = require('is-callable');

},{"is-callable":187}],135:[function(require,module,exports){
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

},{"../helpers/assertRecord":167,"./Type":159,"has":184}],136:[function(require,module,exports){
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

},{"../helpers/assertRecord":167,"./IsAccessorDescriptor":133,"./IsDataDescriptor":135,"./Type":159}],137:[function(require,module,exports){
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

},{"../helpers/isPropertyDescriptor":172,"./IsAccessorDescriptor":133,"./IsDataDescriptor":135,"./Type":159}],138:[function(require,module,exports){
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

},{"../helpers/isFinite":168,"../helpers/timeConstants":175}],139:[function(require,module,exports){
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

},{"../helpers/isFinite":168,"./DateFromTime":125,"./Day":126,"./MonthFromTime":142,"./ToInteger":151,"./YearFromTime":161,"./floor":163,"./modulo":164,"get-intrinsic":180}],140:[function(require,module,exports){
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

},{"../helpers/isFinite":168,"../helpers/timeConstants":175,"./ToInteger":151}],141:[function(require,module,exports){
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

},{"../helpers/timeConstants":175,"./floor":163,"./modulo":164}],142:[function(require,module,exports){
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

},{"./DayWithinYear":128,"./InLeapYear":132}],143:[function(require,module,exports){
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

},{"../helpers/isNaN":170}],144:[function(require,module,exports){
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

},{"../helpers/timeConstants":175,"./floor":163,"./modulo":164}],145:[function(require,module,exports){
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

},{"./Type":159}],146:[function(require,module,exports){
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


},{"../helpers/isFinite":168,"./ToNumber":152,"./abs":162,"get-intrinsic":180}],147:[function(require,module,exports){
'use strict';

var msPerDay = require('../helpers/timeConstants').msPerDay;

var DayFromYear = require('./DayFromYear');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

module.exports = function TimeFromYear(y) {
	return msPerDay * DayFromYear(y);
};

},{"../helpers/timeConstants":175,"./DayFromYear":127}],148:[function(require,module,exports){
'use strict';

var modulo = require('./modulo');

var msPerDay = require('../helpers/timeConstants').msPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.2

module.exports = function TimeWithinDay(t) {
	return modulo(t, msPerDay);
};


},{"../helpers/timeConstants":175,"./modulo":164}],149:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.2

module.exports = function ToBoolean(value) { return !!value; };

},{}],150:[function(require,module,exports){
'use strict';

var ToNumber = require('./ToNumber');

// http://262.ecma-international.org/5.1/#sec-9.5

module.exports = function ToInt32(x) {
	return ToNumber(x) >> 0;
};

},{"./ToNumber":152}],151:[function(require,module,exports){
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

},{"../helpers/isFinite":168,"../helpers/isNaN":170,"../helpers/sign":174,"./ToNumber":152,"./abs":162,"./floor":163}],152:[function(require,module,exports){
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

},{"./ToPrimitive":154}],153:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $Object = GetIntrinsic('%Object%');

var CheckObjectCoercible = require('./CheckObjectCoercible');

// http://262.ecma-international.org/5.1/#sec-9.9

module.exports = function ToObject(value) {
	CheckObjectCoercible(value);
	return $Object(value);
};

},{"./CheckObjectCoercible":124,"get-intrinsic":180}],154:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.1

module.exports = require('es-to-primitive/es5');

},{"es-to-primitive/es5":176}],155:[function(require,module,exports){
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

},{"./IsCallable":134,"./ToBoolean":149,"./Type":159,"get-intrinsic":180,"has":184}],156:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $String = GetIntrinsic('%String%');

// http://262.ecma-international.org/5.1/#sec-9.8

module.exports = function ToString(value) {
	return $String(value);
};


},{"get-intrinsic":180}],157:[function(require,module,exports){
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

},{"../helpers/isFinite":168,"../helpers/isNaN":170,"../helpers/sign":174,"./ToNumber":152,"./abs":162,"./floor":163,"./modulo":164}],158:[function(require,module,exports){
'use strict';

var ToNumber = require('./ToNumber');

// http://262.ecma-international.org/5.1/#sec-9.6

module.exports = function ToUint32(x) {
	return ToNumber(x) >>> 0;
};

},{"./ToNumber":152}],159:[function(require,module,exports){
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

},{}],160:[function(require,module,exports){
'use strict';

var Day = require('./Day');
var modulo = require('./modulo');

// https://262.ecma-international.org/5.1/#sec-15.9.1.6

module.exports = function WeekDay(t) {
	return modulo(Day(t) + 4, 7);
};

},{"./Day":126,"./modulo":164}],161:[function(require,module,exports){
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

},{"call-bind/callBound":115,"get-intrinsic":180}],162:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $abs = GetIntrinsic('%Math.abs%');

// http://262.ecma-international.org/5.1/#sec-5.2

module.exports = function abs(x) {
	return $abs(x);
};

},{"get-intrinsic":180}],163:[function(require,module,exports){
'use strict';

// var modulo = require('./modulo');
var $floor = Math.floor;

// http://262.ecma-international.org/5.1/#sec-5.2

module.exports = function floor(x) {
	// return x - modulo(x, 1);
	return $floor(x);
};

},{}],164:[function(require,module,exports){
'use strict';

var mod = require('../helpers/mod');

// https://262.ecma-international.org/5.1/#sec-5.2

module.exports = function modulo(x, y) {
	return mod(x, y);
};

},{"../helpers/mod":173}],165:[function(require,module,exports){
'use strict';

var modulo = require('./modulo');

var msPerSecond = require('../helpers/timeConstants').msPerSecond;

// https://262.ecma-international.org/5.1/#sec-15.9.1.10

module.exports = function msFromTime(t) {
	return modulo(t, msPerSecond);
};

},{"../helpers/timeConstants":175,"./modulo":164}],166:[function(require,module,exports){
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

},{"./5/AbstractEqualityComparison":122,"./5/AbstractRelationalComparison":123,"./5/CheckObjectCoercible":124,"./5/DateFromTime":125,"./5/Day":126,"./5/DayFromYear":127,"./5/DayWithinYear":128,"./5/DaysInYear":129,"./5/FromPropertyDescriptor":130,"./5/HourFromTime":131,"./5/InLeapYear":132,"./5/IsAccessorDescriptor":133,"./5/IsCallable":134,"./5/IsDataDescriptor":135,"./5/IsGenericDescriptor":136,"./5/IsPropertyDescriptor":137,"./5/MakeDate":138,"./5/MakeDay":139,"./5/MakeTime":140,"./5/MinFromTime":141,"./5/MonthFromTime":142,"./5/SameValue":143,"./5/SecFromTime":144,"./5/StrictEqualityComparison":145,"./5/TimeClip":146,"./5/TimeFromYear":147,"./5/TimeWithinDay":148,"./5/ToBoolean":149,"./5/ToInt32":150,"./5/ToInteger":151,"./5/ToNumber":152,"./5/ToObject":153,"./5/ToPrimitive":154,"./5/ToPropertyDescriptor":155,"./5/ToString":156,"./5/ToUint16":157,"./5/ToUint32":158,"./5/Type":159,"./5/WeekDay":160,"./5/YearFromTime":161,"./5/abs":162,"./5/floor":163,"./5/modulo":164,"./5/msFromTime":165}],167:[function(require,module,exports){
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

},{"./isMatchRecord":169,"get-intrinsic":180,"has":184}],168:[function(require,module,exports){
'use strict';

var $isNaN = Number.isNaN || function (a) { return a !== a; };

module.exports = Number.isFinite || function (x) { return typeof x === 'number' && !$isNaN(x) && x !== Infinity && x !== -Infinity; };

},{}],169:[function(require,module,exports){
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

},{"has":184}],170:[function(require,module,exports){
'use strict';

module.exports = Number.isNaN || function isNaN(a) {
	return a !== a;
};

},{}],171:[function(require,module,exports){
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

},{"call-bind/callBound":115}],172:[function(require,module,exports){
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

},{"get-intrinsic":180,"has":184}],173:[function(require,module,exports){
'use strict';

var $floor = Math.floor;

module.exports = function mod(number, modulo) {
	var remain = number % modulo;
	return $floor(remain >= 0 ? remain : remain + modulo);
};

},{}],174:[function(require,module,exports){
'use strict';

module.exports = function sign(number) {
	return number >= 0 ? 1 : -1;
};

},{}],175:[function(require,module,exports){
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

},{}],176:[function(require,module,exports){
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

},{"./helpers/isPrimitive":177,"is-callable":187}],177:[function(require,module,exports){
'use strict';

module.exports = function isPrimitive(value) {
	return value === null || (typeof value !== 'function' && typeof value !== 'object');
};

},{}],178:[function(require,module,exports){
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

},{}],179:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

module.exports = Function.prototype.bind || implementation;

},{"./implementation":178}],180:[function(require,module,exports){
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

},{"function-bind":179,"has":184,"has-symbols":182}],181:[function(require,module,exports){
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

},{"get-intrinsic":180}],182:[function(require,module,exports){
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

},{"./shams":183}],183:[function(require,module,exports){
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

},{}],184:[function(require,module,exports){
'use strict';

var bind = require('function-bind');

module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);

},{"function-bind":179}],185:[function(require,module,exports){
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

},{}],186:[function(require,module,exports){
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

},{}],187:[function(require,module,exports){
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

},{}],188:[function(require,module,exports){
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

},{"./isArguments":190}],189:[function(require,module,exports){
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

},{"./implementation":188,"./isArguments":190}],190:[function(require,module,exports){
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

},{}],191:[function(require,module,exports){
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

},{}],192:[function(require,module,exports){
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
},{"_process":191,"through":205,"timers":206}],193:[function(require,module,exports){
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

},{"buffer":97}],194:[function(require,module,exports){
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

},{"es-abstract/es5":166,"function-bind":179}],195:[function(require,module,exports){
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

},{"./implementation":194,"./polyfill":196,"./shim":197,"define-properties":120,"function-bind":179}],196:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

var zeroWidthSpace = '\u200b';

module.exports = function getPolyfill() {
	if (String.prototype.trim && zeroWidthSpace.trim() === zeroWidthSpace) {
		return String.prototype.trim;
	}
	return implementation;
};

},{"./implementation":194}],197:[function(require,module,exports){
'use strict';

var define = require('define-properties');
var getPolyfill = require('./polyfill');

module.exports = function shimStringTrim() {
	var polyfill = getPolyfill();
	define(String.prototype, { trim: polyfill }, { trim: function () { return String.prototype.trim !== polyfill; } });
	return polyfill;
};

},{"./polyfill":196,"define-properties":120}],198:[function(require,module,exports){
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
},{"safe-buffer":193}],199:[function(require,module,exports){
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
},{"./lib/default_stream":200,"./lib/results":202,"./lib/test":203,"_process":191,"defined":121,"through":205,"timers":206}],200:[function(require,module,exports){
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
},{"_process":191,"fs":96,"through":205}],201:[function(require,module,exports){
(function (process,setImmediate){(function (){
module.exports = typeof setImmediate !== 'undefined'
    ? setImmediate
    : process.nextTick
;

}).call(this)}).call(this,require('_process'),require("timers").setImmediate)
},{"_process":191,"timers":206}],202:[function(require,module,exports){
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
},{"_process":191,"events":98,"function-bind":179,"has":184,"inherits":186,"object-inspect":204,"resumer":192,"through":205,"timers":206}],203:[function(require,module,exports){
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
},{"./next_tick":201,"deep-equal":117,"defined":121,"events":98,"has":184,"inherits":186,"path":99,"string.prototype.trim":195}],204:[function(require,module,exports){
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

},{}],205:[function(require,module,exports){
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
},{"_process":191,"stream":100}],206:[function(require,module,exports){
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
},{"process/browser.js":191,"timers":206}],207:[function(require,module,exports){
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
},{}]},{},[40,41]);
