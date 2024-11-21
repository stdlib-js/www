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
* Typed array constructor which returns a typed array representing an array of single-precision floating-point numbers in the platform byte order.
*
* @module @stdlib/array/float32
*
* @example
* var ctor = require( '@stdlib/array/float32' );
*
* var arr = new ctor( 10 );
* // returns <Float32Array>
*/

// MODULES //

var hasFloat32ArraySupport = require( '@stdlib/assert/has-float32array-support' );
var builtin = require( './main.js' );
var polyfill = require( './polyfill.js' );


// MAIN //

var ctor;
if ( hasFloat32ArraySupport() ) {
	ctor = builtin;
} else {
	ctor = polyfill;
}


// EXPORTS //

module.exports = ctor;

},{"./main.js":2,"./polyfill.js":3,"@stdlib/assert/has-float32array-support":5}],2:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

var ctor = ( typeof Float32Array === 'function' ) ? Float32Array : void 0; // eslint-disable-line stdlib/require-globals


// EXPORTS //

module.exports = ctor;

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

// TODO: write polyfill

// MAIN //

/**
* Typed array which represents an array of single-precision floating-point numbers in the platform byte order.
*
* @throws {Error} not implemented
*/
function polyfill() {
	throw new Error( 'not implemented' );
}


// EXPORTS //

module.exports = polyfill;

},{}],4:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

var main = ( typeof Float32Array === 'function' ) ? Float32Array : null; // eslint-disable-line stdlib/require-globals


// EXPORTS //

module.exports = main;

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
* Test for native `Float32Array` support.
*
* @module @stdlib/assert/has-float32array-support
*
* @example
* var hasFloat32ArraySupport = require( '@stdlib/assert/has-float32array-support' );
*
* var bool = hasFloat32ArraySupport();
* // returns <boolean>
*/

// MODULES //

var hasFloat32ArraySupport = require( './main.js' );


// EXPORTS //

module.exports = hasFloat32ArraySupport;

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

var isFloat32Array = require( '@stdlib/assert/is-float32array' );
var PINF = require( '@stdlib/constants/float64/pinf' );
var GlobalFloat32Array = require( './float32array.js' );


// MAIN //

/**
* Tests for native `Float32Array` support.
*
* @returns {boolean} boolean indicating if an environment has `Float32Array` support
*
* @example
* var bool = hasFloat32ArraySupport();
* // returns <boolean>
*/
function hasFloat32ArraySupport() {
	var bool;
	var arr;

	if ( typeof GlobalFloat32Array !== 'function' ) {
		return false;
	}
	// Test basic support...
	try {
		arr = new GlobalFloat32Array( [ 1.0, 3.14, -3.14, 5.0e40 ] );
		bool = (
			isFloat32Array( arr ) &&
			arr[ 0 ] === 1.0 &&
			arr[ 1 ] === 3.140000104904175 &&
			arr[ 2 ] === -3.140000104904175 &&
			arr[ 3 ] === PINF
		);
	} catch ( err ) { // eslint-disable-line no-unused-vars
		bool = false;
	}
	return bool;
}


// EXPORTS //

module.exports = hasFloat32ArraySupport;

},{"./float32array.js":4,"@stdlib/assert/is-float32array":13,"@stdlib/constants/float64/pinf":16}],7:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{}],9:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":10}],10:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],11:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":12}],12:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/assert/has-symbol-support":9}],13:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

/**
* Test if a value is a Float32Array.
*
* @module @stdlib/assert/is-float32array
*
* @example
* var isFloat32Array = require( '@stdlib/assert/is-float32array' );
*
* var bool = isFloat32Array( new Float32Array( 10 ) );
* // returns true
*
* bool = isFloat32Array( [] );
* // returns false
*/

// MODULES //

var isFloat32Array = require( './main.js' );


// EXPORTS //

module.exports = isFloat32Array;

},{"./main.js":14}],14:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

var hasFloat32Array = ( typeof Float32Array === 'function' ); // eslint-disable-line stdlib/require-globals


// MAIN //

/**
* Tests if a value is a Float32Array.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating whether value is a Float32Array
*
* @example
* var bool = isFloat32Array( new Float32Array( 10 ) );
* // returns true
*
* @example
* var bool = isFloat32Array( [] );
* // returns false
*/
function isFloat32Array( value ) {
	return (
		( hasFloat32Array && value instanceof Float32Array ) || // eslint-disable-line stdlib/require-globals
		nativeClass( value ) === '[object Float32Array]'
	);
}


// EXPORTS //

module.exports = isFloat32Array;

},{"@stdlib/utils/native-class":40}],15:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/number/ctor":21}],16:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
* Test if a double-precision floating-point numeric value is negative zero.
*
* @module @stdlib/math/base/assert/is-negative-zero
*
* @example
* var isNegativeZero = require( '@stdlib/math/base/assert/is-negative-zero' );
*
* var bool = isNegativeZero( -0.0 );
* // returns true
*
* bool = isNegativeZero( 0.0 );
* // returns false
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

var NINF = require( '@stdlib/constants/float64/ninf' );


// MAIN //

/**
* Tests if a double-precision floating-point numeric value is negative zero.
*
* @param {number} x - value to test
* @returns {boolean} boolean indicating whether the value is negative zero
*
* @example
* var bool = isNegativeZero( -0.0 );
* // returns true
*
* @example
* var bool = isNegativeZero( 0.0 );
* // returns false
*/
function isNegativeZero( x ) {
	return (x === 0.0 && 1.0/x === NINF);
}


// EXPORTS //

module.exports = isNegativeZero;

},{"@stdlib/constants/float64/ninf":15}],21:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

// EXPORTS //

module.exports = Number; // eslint-disable-line stdlib/require-globals

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
* Convert a double-precision floating-point number to the nearest single-precision floating-point number.
*
* @module @stdlib/number/float64/base/to-float32
*
* @example
* var float64ToFloat32 = require( '@stdlib/number/float64/base/to-float32' );
*
* var y = float64ToFloat32( 1.337 );
* // returns 1.3370000123977661
*/

// MODULES //

var builtin = require( './main.js' );
var polyfill = require( './polyfill.js' );


// MAIN //

var float64ToFloat32;
if ( typeof builtin === 'function' ) {
	float64ToFloat32 = builtin;
} else {
	float64ToFloat32 = polyfill;
}


// EXPORTS //

module.exports = float64ToFloat32;

},{"./main.js":24,"./polyfill.js":25}],24:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

var fround = ( typeof Math.fround === 'function' ) ? Math.fround : null; // eslint-disable-line stdlib/no-builtin-math


// EXPORTS //

module.exports = fround;

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

// MODULES //

var Float32Array = require( '@stdlib/array/float32' );


// VARIABLES //

var FLOAT32_VIEW = new Float32Array( 1 );


// MAIN //

/**
* Converts a double-precision floating-point number to the nearest single-precision floating-point number.
*
* @param {number} x - double-precision floating-point number
* @returns {number} nearest single-precision floating-point number
*
* @example
* var y = float64ToFloat32( 1.337 );
* // returns 1.3370000123977661
*/
function float64ToFloat32( x ) {
	FLOAT32_VIEW[ 0 ] = x;
	return FLOAT32_VIEW[ 0 ];
}


// EXPORTS //

module.exports = float64ToFloat32;

},{"@stdlib/array/float32":1}],26:[function(require,module,exports){
module.exports={"expected":[-9.999999616903162e35,-1.1983967880055359e36,-1.3967936143207555e36,-1.595190440635975e36,-1.7935871084948697e36,-1.9919839348100893e36,-2.190380761125309e36,-2.3887775874405285e36,-2.587174413755748e36,-2.785571240070968e36,-2.9839680663861873e36,-3.182364575788757e36,-3.3807614021039765e36,-3.579158228419196e36,-3.777555054734416e36,-3.9759518810496354e36,-4.174348707364855e36,-4.3727455336800746e36,-4.571142359995294e36,-4.769539186310514e36,-4.9679360126257334e36,-5.166332522028303e36,-5.364729665256173e36,-5.563126491571392e36,-5.761523317886612e36,-5.959920144201831e36,-6.158316336691751e36,-6.356713163006971e36,-6.55510998932219e36,-6.75350681563741e36,-6.95190364195263e36,-7.150300468267849e36,-7.348697294583069e36,-7.547094120898288e36,-7.745490947213508e36,-7.943887773528728e36,-8.142284599843947e36,-8.340681426159167e36,-8.539078252474386e36,-8.737475078789606e36,-8.935871905104826e36,-9.134268731420045e36,-9.332665557735265e36,-9.531062384050484e36,-9.729459210365704e36,-9.927855402855624e36,-1.0126252229170843e37,-1.0324649055486063e37,-1.0523045881801282e37,-1.0721442708116502e37,-1.0919840168257022e37,-1.1118236360746941e37,-1.131663382088746e37,-1.151503001337738e37,-1.17134274735179e37,-1.191182366600782e37,-1.211021985849774e37,-1.230861731863826e37,-1.2507013511128178e37,-1.2705410971268698e37,-1.2903807163758618e37,-1.3102204623899137e37,-1.3300600816389057e37,-1.3498998276529577e37,-1.3697394469019496e37,-1.3895791929160016e37,-1.4094188121649935e37,-1.4292585581790455e37,-1.4490981774280375e37,-1.4689379234420894e37,-1.4887775426910814e37,-1.5086172887051333e37,-1.5284569079541253e37,-1.5482966539681773e37,-1.5681362732171692e37,-1.5879758924661612e37,-1.6078156384802131e37,-1.627655257729205e37,-1.647495003743257e37,-1.667334622992249e37,-1.687174369006301e37,-1.707013988255293e37,-1.726853734269345e37,-1.7466933535183369e37,-1.7665330995323888e37,-1.7863727187813808e37,-1.8062124647954328e37,-1.8260520840444247e37,-1.8458918300584767e37,-1.8657314493074686e37,-1.8855711953215206e37,-1.9054108145705125e37,-1.9252505605845645e37,-1.9450901798335565e37,-1.9649297990825484e37,-1.9847695450966004e37,-2.0046091643455923e37,-2.0244489103596443e37,-2.0442885296086363e37,-2.0641282756226882e37,-2.0839678948716802e37,-2.1038076408857322e37,-2.123647260134724e37,-2.143486879383716e37,-2.163326625397768e37,-2.18316637141182e37,-2.203006117425872e37,-2.222845609909804e37,-2.242685355923856e37,-2.262525101937908e37,-2.28236484795196e37,-2.3022043404358918e37,-2.3220440864499437e37,-2.3418838324639957e37,-2.3617233249479276e37,-2.3815630709619796e37,-2.4014028169760316e37,-2.4212425629900835e37,-2.4410820554740155e37,-2.4609218014880674e37,-2.4807615475021194e37,-2.5006012935161714e37,-2.5204407860001033e37,-2.5402805320141553e37,-2.5601202780282073e37,-2.579960024042259e37,-2.599799516526191e37,-2.619639262540243e37,-2.639479008554295e37,-2.659318754568347e37,-2.679158247052279e37,-2.698997993066331e37,-2.718837739080383e37,-2.738677231564315e37,-2.758516977578367e37,-2.778356723592419e37,-2.798196469606471e37,-2.8180359620904027e37,-2.8378757081044547e37,-2.8577154541185067e37,-2.8775552001325586e37,-2.8973946926164906e37,-2.9172344386305425e37,-2.9370741846445945e37,-2.9569139306586465e37,-2.9767534231425784e37,-2.9965931691566304e37,-3.0164329151706824e37,-3.0362726611847343e37,-3.0561121536686663e37,-3.075951899682718e37,-3.09579164569677e37,-3.115631138180702e37,-3.135470884194754e37,-3.155310630208806e37,-3.175150376222858e37,-3.19498986870679e37,-3.214829614720842e37,-3.234669360734894e37,-3.254509106748946e37,-3.274348599232878e37,-3.29418834524693e37,-3.314028091260982e37,-3.3338678372750337e37,-3.3537073297589657e37,-3.3735470757730176e37,-3.3933868217870696e37,-3.4132265678011216e37,-3.4330660602850535e37,-3.4529058062991055e37,-3.4727455523131575e37,-3.4925850447970894e37,-3.5124247908111414e37,-3.5322645368251933e37,-3.5521042828392453e37,-3.571943775323177e37,-3.591783521337229e37,-3.611623267351281e37,-3.631463013365333e37,-3.651302505849265e37,-3.671142251863317e37,-3.690981997877369e37,-3.710821743891421e37,-3.730661236375353e37,-3.750500982389405e37,-3.770340728403457e37,-3.790180474417509e37,-3.810019966901441e37,-3.8298597129154927e37,-3.8496994589295447e37,-3.8695389514134766e37,-3.8893786974275286e37,-3.9092184434415806e37,-3.9290581894556326e37,-3.9488976819395645e37,-3.9687374279536165e37,-3.9885771739676684e37,-4.0084169199817204e37,-4.0282564124656523e37,-4.0480961584797043e37,-4.0679359044937563e37,-4.0877756505078082e37,-4.10761514299174e37,-4.127454889005792e37,-4.147294635019844e37,-4.167134381033896e37,-4.186973873517828e37,-4.20681361953188e37,-4.226653365545932e37,-4.246493111559984e37,-4.266332857574036e37,-4.286172096527848e37,-4.3060118425419e37,-4.325851588555952e37,-4.345691334570004e37,-4.365531080584056e37,-4.385370826598108e37,-4.40521057261216e37,-4.425050318626212e37,-4.4448895575800235e37,-4.464729303594075e37,-4.484569049608127e37,-4.504408795622179e37,-4.524248541636231e37,-4.544088287650283e37,-4.563928033664335e37,-4.583767779678387e37,-4.603607018632199e37,-4.623446764646251e37,-4.643286510660303e37,-4.663126256674355e37,-4.682966002688407e37,-4.702805748702459e37,-4.722645494716511e37,-4.742484733670323e37,-4.762324479684375e37,-4.782164225698427e37,-4.802003971712479e37,-4.821843717726531e37,-4.841683463740583e37,-4.861523209754635e37,-4.881362955768687e37,-4.901202194722499e37,-4.921041940736551e37,-4.9408816867506025e37,-4.9607214327646545e37,-4.980561178778706e37,-5.000400924792758e37,-5.02024067080681e37,-5.040079909760622e37,-5.059919655774674e37,-5.079759401788726e37,-5.099599147802778e37,-5.11943889381683e37,-5.139278639830882e37,-5.159118385844934e37,-5.178958131858986e37,-5.198797370812798e37,-5.21863711682685e37,-5.238476862840902e37,-5.258316608854954e37,-5.278156354869006e37,-5.297996100883058e37,-5.31783584689711e37,-5.337675592911162e37,-5.357514831864974e37,-5.377354577879026e37,-5.397194323893078e37,-5.41703406990713e37,-5.436873815921182e37,-5.456713561935234e37,-5.4765533079492855e37,-5.496392546903097e37,-5.516232292917149e37,-5.536072038931201e37,-5.555911784945253e37,-5.575751530959305e37,-5.595591276973357e37,-5.615431022987409e37,-5.635270769001461e37,-5.655110007955273e37,-5.674949753969325e37,-5.694789499983377e37,-5.714629245997429e37,-5.734468992011481e37,-5.754308738025533e37,-5.774148484039585e37,-5.793987722993397e37,-5.813827469007449e37,-5.833667215021501e37,-5.853506961035553e37,-5.873346707049605e37,-5.893186453063657e37,-5.913026199077709e37,-5.932865945091761e37,-5.9527051840455725e37,-5.972544930059624e37,-5.992384676073676e37,-6.012224422087728e37,-6.03206416810178e37,-6.051903914115832e37,-6.071743660129884e37,-6.091583406143936e37,-6.111422645097748e37,-6.1312623911118e37,-6.151102137125852e37,-6.170941883139904e37,-6.190781629153956e37,-6.210621375168008e37,-6.23046112118206e37,-6.250300360135872e37,-6.270140106149924e37,-6.289979852163976e37,-6.309819598178028e37,-6.32965934419208e37,-6.349499090206132e37,-6.369338836220184e37,-6.389178582234236e37,-6.409017821188048e37,-6.4288575672021e37,-6.448697313216152e37,-6.4685370592302035e37,-6.4883768052442555e37,-6.508216551258307e37,-6.528056297272359e37,-6.547896043286411e37,-6.567735282240223e37,-6.587575028254275e37,-6.607414774268327e37,-6.627254520282379e37,-6.647094266296431e37,-6.666934012310483e37,-6.686773758324535e37,-6.706612997278347e37,-6.726452743292399e37,-6.746292489306451e37,-6.766132235320503e37,-6.785971981334555e37,-6.805811727348607e37,-6.825651473362659e37,-6.845491219376711e37,-6.865330458330523e37,-6.885170204344575e37,-6.905009950358627e37,-6.924849696372679e37,-6.944689442386731e37,-6.964529188400783e37,-6.984368934414835e37,-7.004208173368646e37,-7.024047919382698e37,-7.04388766539675e37,-7.063727411410802e37,-7.083567157424854e37,-7.103406903438906e37,-7.123246649452958e37,-7.14308639546701e37,-7.162925634420822e37,-7.182765380434874e37,-7.202605126448926e37,-7.222444872462978e37,-7.24228461847703e37,-7.262124364491082e37,-7.281964110505134e37,-7.301803856519186e37,-7.321643095472998e37,-7.34148284148705e37,-7.361322587501102e37,-7.381162333515154e37,-7.401002079529206e37,-7.420841825543258e37,-7.44068157155731e37,-7.4605208105111215e37,-7.4803605565251735e37,-7.500200302539225e37,-7.520040048553277e37,-7.539879794567329e37,-7.559719540581381e37,-7.579559286595433e37,-7.599399032609485e37,-7.619238271563297e37,-7.639078017577349e37,-7.658917763591401e37,-7.678757509605453e37,-7.698597255619505e37,-7.718437001633557e37,-7.738276747647609e37,-7.758115986601421e37,-7.777955732615473e37,-7.797795478629525e37,-7.817635224643577e37,-7.837474970657629e37,-7.857314716671681e37,-7.877154462685733e37,-7.896994208699785e37,-7.916833447653597e37,-7.936673193667649e37,-7.956512939681701e37,-7.9763526856957525e37,-7.9961924317098045e37,-8.016032177723856e37,-8.035871923737908e37,-8.05571166975196e37,-8.075550908705772e37,-8.095390654719824e37,-8.115230400733876e37,-8.135070146747928e37,-8.15490989276198e37,-8.174749638776032e37,-8.194589384790084e37,-8.214428623743896e37,-8.234268369757948e37,-8.254108115772e37,-8.273947861786052e37,-8.293787607800104e37,-8.313627353814156e37,-8.333467099828208e37,-8.35330684584226e37,-8.373146084796072e37,-8.392985830810124e37,-8.412825576824176e37,-8.432665322838228e37,-8.45250506885228e37,-8.472344814866332e37,-8.492184560880384e37,-8.512024306894436e37,-8.531863545848247e37,-8.55170379892254e37,-8.571543037876351e37,-8.591382276830163e37,-8.611222529904455e37,-8.631061768858267e37,-8.65090202193256e37,-8.670741260886371e37,-8.690581513960663e37,-8.710420752914475e37,-8.730261005988767e37,-8.750100244942579e37,-8.76993948389639e37,-8.789779736970683e37,-8.809618975924495e37,-8.829459228998787e37,-8.849298467952599e37,-8.86913872102689e37,-8.888977959980703e37,-8.908817198934515e37,-8.928657452008807e37,-8.948496690962619e37,-8.96833694403691e37,-8.988176182990722e37,-9.008016436065015e37,-9.027855675018826e37,-9.047694913972638e37,-9.06753516704693e37,-9.087374406000742e37,-9.107214659075034e37,-9.127053898028846e37,-9.146894151103138e37,-9.16673339005695e37,-9.186573643131242e37,-9.206412882085054e37,-9.226252121038866e37,-9.246092374113158e37,-9.26593161306697e37,-9.285771866141262e37,-9.305611105095074e37,-9.325451358169366e37,-9.345290597123178e37,-9.36512983607699e37,-9.384970089151282e37,-9.404809328105094e37,-9.424649581179386e37,-9.444488820133198e37,-9.46432907320749e37,-9.484168312161302e37,-9.504007551115113e37,-9.523847804189405e37,-9.543687043143217e37,-9.56352729621751e37,-9.583366535171321e37,-9.603206788245613e37,-9.623046027199425e37,-9.642885266153237e37,-9.66272551922753e37,-9.682564758181341e37,-9.702405011255633e37,-9.722244250209445e37,-9.742084503283737e37,-9.761923742237549e37,-9.781763995311841e37,-9.801603234265653e37,-9.821442473219465e37,-9.841282726293757e37,-9.861121965247569e37,-9.88096221832186e37,-9.900801457275673e37,-9.920641710349965e37,-9.940480949303777e37,-9.960320188257589e37,-9.98016044133188e37,-9.999999680285692e37],"x":[-1.0e36,-1.1983967935871744e36,-1.3967935871743486e36,-1.5951903807615228e36,-1.7935871743486974e36,-1.991983967935872e36,-2.190380761523046e36,-2.3887775551102206e36,-2.5871743486973948e36,-2.785571142284569e36,-2.9839679358717435e36,-3.182364729458918e36,-3.3807615230460926e36,-3.5791583166332665e36,-3.777555110220441e36,-3.9759519038076155e36,-4.1743486973947894e36,-4.372745490981964e36,-4.571142284569138e36,-4.7695390781563124e36,-4.967935871743487e36,-5.166332665330661e36,-5.364729458917835e36,-5.563126252505009e36,-5.761523046092184e36,-5.95991983967936e36,-6.158316633266533e36,-6.356713426853708e36,-6.555110220440881e36,-6.753507014028055e36,-6.95190380761523e36,-7.150300601202404e36,-7.348697394789579e36,-7.547094188376754e36,-7.745490981963928e36,-7.943887775551103e36,-8.142284569138276e36,-8.340681362725451e36,-8.539078156312625e36,-8.7374749498998e36,-8.935871743486973e36,-9.134268537074148e36,-9.332665330661322e36,-9.531062124248497e36,-9.729458917835671e36,-9.927855711422845e36,-1.0126252505010019e37,-1.0324649298597194e37,-1.0523046092184369e37,-1.0721442885771542e37,-1.0919839679358717e37,-1.111823647294589e37,-1.1316633266533065e37,-1.151503006012024e37,-1.1713426853707415e37,-1.1911823647294588e37,-1.2110220440881763e37,-1.2308617234468938e37,-1.250701402805611e37,-1.2705410821643286e37,-1.290380761523046e37,-1.3102204408817636e37,-1.3300601202404809e37,-1.3498997995991984e37,-1.369739478957916e37,-1.3895791583166334e37,-1.4094188376753507e37,-1.429258517034068e37,-1.4490981963927855e37,-1.468937875751503e37,-1.4887775551102205e37,-1.5086172344689378e37,-1.5284569138276553e37,-1.5482965931863728e37,-1.5681362725450903e37,-1.5879759519038076e37,-1.607815631262525e37,-1.6276553106212426e37,-1.64749498997996e37,-1.6673346693386774e37,-1.6871743486973949e37,-1.7070140280561124e37,-1.72685370741483e37,-1.7466933867735472e37,-1.7665330661322642e37,-1.7863727454909817e37,-1.8062124248496992e37,-1.8260521042084167e37,-1.845891783567134e37,-1.8657314629258515e37,-1.885571142284569e37,-1.9054108216432865e37,-1.9252505010020038e37,-1.9450901803607213e37,-1.9649298597194388e37,-1.9847695390781563e37,-2.0046092184368739e37,-2.0244488977955911e37,-2.0442885771543086e37,-2.0641282565130262e37,-2.0839679358717434e37,-2.1038076152304607e37,-2.1236472945891782e37,-2.143486973947896e37,-2.1633266533066135e37,-2.1831663326653305e37,-2.203006012024048e37,-2.2228456913827655e37,-2.2426853707414826e37,-2.2625250501002e37,-2.2823647294589176e37,-2.3022044088176346e37,-2.3220440881763526e37,-2.3418837675350696e37,-2.3617234468937876e37,-2.3815631262525047e37,-2.401402805611222e37,-2.4212424849699397e37,-2.441082164328657e37,-2.4609218436873747e37,-2.480761523046092e37,-2.5006012024048093e37,-2.520440881763527e37,-2.5402805611222443e37,-2.560120240480962e37,-2.5799599198396793e37,-2.599799599198397e37,-2.6196392785571143e37,-2.639478957915832e37,-2.659318637274549e37,-2.679158316633267e37,-2.698997995991984e37,-2.718837675350702e37,-2.738677354709419e37,-2.7585170340681364e37,-2.778356713426854e37,-2.7981963927855714e37,-2.8180360721442885e37,-2.837875751503006e37,-2.8577154308617235e37,-2.877555110220441e37,-2.8973947895791585e37,-2.917234468937875e37,-2.937074148296593e37,-2.95691382765531e37,-2.976753507014028e37,-2.996593186372745e37,-3.0164328657314626e37,-3.03627254509018e37,-3.0561122244488976e37,-3.0759519038076147e37,-3.0957915831663327e37,-3.1156312625250497e37,-3.1354709418837677e37,-3.1553106212424847e37,-3.1751503006012022e37,-3.1949899799599197e37,-3.2148296593186373e37,-3.2346693386773543e37,-3.2545090180360723e37,-3.2743486973947893e37,-3.2941883767535073e37,-3.3140280561122243e37,-3.333867735470942e37,-3.3537074148296594e37,-3.373547094188377e37,-3.3933867735470944e37,-3.413226452905812e37,-3.433066132264529e37,-3.452905811623247e37,-3.472745490981964e37,-3.4925851703406815e37,-3.512424849699399e37,-3.5322645290581165e37,-3.552104208416834e37,-3.571943887775551e37,-3.591783567134268e37,-3.6116232464929856e37,-3.631462925851703e37,-3.6513026052104206e37,-3.671142284569138e37,-3.690981963927855e37,-3.710821643286573e37,-3.73066132264529e37,-3.7505010020040077e37,-3.770340681362725e37,-3.7901803607214427e37,-3.81002004008016e37,-3.8298597194388777e37,-3.8496993987975947e37,-3.8695390781563127e37,-3.88937875751503e37,-3.9092184368737478e37,-3.929058116232465e37,-3.9488977955911823e37,-3.9687374749499e37,-3.9885771543086173e37,-4.0084168336673344e37,-4.0282565130260523e37,-4.0480961923847694e37,-4.0679358717434874e37,-4.0877755511022044e37,-4.107615230460922e37,-4.1274549098196394e37,-4.147294589178357e37,-4.167134268537074e37,-4.186973947895792e37,-4.206813627254509e37,-4.226653306613227e37,-4.246492985971944e37,-4.266332665330661e37,-4.286172344689379e37,-4.306012024048096e37,-4.325851703406814e37,-4.345691382765531e37,-4.365531062124248e37,-4.385370741482966e37,-4.405210420841683e37,-4.425050100200401e37,-4.444889779559118e37,-4.464729458917836e37,-4.484569138276553e37,-4.50440881763527e37,-4.524248496993988e37,-4.544088176352706e37,-4.563927855711423e37,-4.58376753507014e37,-4.603607214428858e37,-4.623446893787576e37,-4.643286573146292e37,-4.66312625250501e37,-4.682965931863728e37,-4.702805611222445e37,-4.722645290581162e37,-4.74248496993988e37,-4.762324649298597e37,-4.782164328657315e37,-4.802004008016032e37,-4.82184368737475e37,-4.841683366733467e37,-4.861523046092185e37,-4.881362725450902e37,-4.901202404809619e37,-4.921042084168337e37,-4.940881763527055e37,-4.960721442885771e37,-4.980561122244489e37,-5.000400801603207e37,-5.020240480961923e37,-5.040080160320641e37,-5.059919839679359e37,-5.079759519038077e37,-5.099599198396793e37,-5.119438877755511e37,-5.139278557114229e37,-5.159118236472946e37,-5.178957915831663e37,-5.198797595190381e37,-5.218637274549098e37,-5.238476953907816e37,-5.258316633266533e37,-5.278156312625249e37,-5.297995991983967e37,-5.317835671342685e37,-5.337675350701402e37,-5.357515030060119e37,-5.377354709418837e37,-5.397194388777555e37,-5.417034068136271e37,-5.436873747494989e37,-5.456713426853707e37,-5.476553106212424e37,-5.4963927855711415e37,-5.516232464929859e37,-5.5360721442885765e37,-5.5559118236472945e37,-5.5757515030060115e37,-5.5955911823647295e37,-5.615430861723447e37,-5.635270541082165e37,-5.655110220440882e37,-5.674949899799599e37,-5.694789579158317e37,-5.714629258517034e37,-5.734468937875751e37,-5.754308617234469e37,-5.774148296593187e37,-5.793987975951903e37,-5.813827655310621e37,-5.833667334669339e37,-5.853507014028057e37,-5.873346693386773e37,-5.893186372745491e37,-5.913026052104209e37,-5.932865731462926e37,-5.952705410821643e37,-5.972545090180361e37,-5.992384769539078e37,-6.012224448897796e37,-6.032064128256513e37,-6.05190380761523e37,-6.071743486973948e37,-6.091583166332666e37,-6.111422845691382e37,-6.1312625250501e37,-6.151102204408818e37,-6.170941883767536e37,-6.190781563126252e37,-6.21062124248497e37,-6.230460921843688e37,-6.250300601202405e37,-6.270140280561122e37,-6.28997995991984e37,-6.309819639278557e37,-6.329659318637275e37,-6.349498997995992e37,-6.369338677354709e37,-6.389178356713427e37,-6.409018036072144e37,-6.428857715430862e37,-6.448697394789579e37,-6.468537074148297e37,-6.488376753507014e37,-6.508216432865731e37,-6.528056112224449e37,-6.547895791583167e37,-6.567735470941883e37,-6.587575150300601e37,-6.607414829659319e37,-6.627254509018035e37,-6.647094188376752e37,-6.66693386773547e37,-6.686773547094188e37,-6.706613226452905e37,-6.726452905811622e37,-6.74629258517034e37,-6.766132264529057e37,-6.785971943887775e37,-6.805811623246492e37,-6.8256513026052095e37,-6.845490981963927e37,-6.865330661322645e37,-6.885170340681362e37,-6.9050100200400795e37,-6.9248496993987975e37,-6.9446893787575155e37,-6.964529058116232e37,-6.98436873747495e37,-7.004208416833668e37,-7.024048096192385e37,-7.043887775551102e37,-7.06372745490982e37,-7.083567134268537e37,-7.103406813627255e37,-7.123246492985972e37,-7.143086172344689e37,-7.162925851703407e37,-7.182765531062124e37,-7.202605210420842e37,-7.222444889779559e37,-7.242284569138277e37,-7.262124248496994e37,-7.281963927855711e37,-7.301803607214429e37,-7.321643286573147e37,-7.341482965931863e37,-7.361322645290581e37,-7.381162324649299e37,-7.401002004008016e37,-7.420841683366733e37,-7.440681362725451e37,-7.460521042084169e37,-7.480360721442886e37,-7.500200400801603e37,-7.520040080160321e37,-7.539879759519038e37,-7.559719438877756e37,-7.579559118236473e37,-7.59939879759519e37,-7.619238476953908e37,-7.639078156312626e37,-7.658917835671342e37,-7.67875751503006e37,-7.698597194388778e37,-7.718436873747496e37,-7.738276553106212e37,-7.75811623246493e37,-7.777955911823648e37,-7.797795591182365e37,-7.817635270541082e37,-7.8374749498998e37,-7.857314629258517e37,-7.877154308617234e37,-7.896993987975952e37,-7.916833667334669e37,-7.936673346693387e37,-7.956513026052103e37,-7.97635270541082e37,-7.996192384769538e37,-8.016032064128256e37,-8.035871743486973e37,-8.05571142284569e37,-8.075551102204408e37,-8.095390781563126e37,-8.115230460921842e37,-8.13507014028056e37,-8.154909819639278e37,-8.174749498997995e37,-8.1945891783567125e37,-8.21442885771543e37,-8.2342685370741475e37,-8.2541082164328655e37,-8.2739478957915825e37,-8.2937875751503005e37,-8.313627254509018e37,-8.333466933867736e37,-8.353306613226453e37,-8.37314629258517e37,-8.392985971943888e37,-8.412825651302606e37,-8.432665330661322e37,-8.45250501002004e37,-8.472344689378758e37,-8.492184368737475e37,-8.512024048096193e37,-8.53186372745491e37,-8.551703406813629e37,-8.571543086172345e37,-8.591382765531063e37,-8.61122244488978e37,-8.631062124248497e37,-8.650901803607213e37,-8.67074148296593e37,-8.690581162324649e37,-8.710420841683367e37,-8.730260521042083e37,-8.7501002004008e37,-8.769939879759519e37,-8.789779559118235e37,-8.809619238476953e37,-8.82945891783567e37,-8.849298597194387e37,-8.869138276553105e37,-8.888977955911823e37,-8.90881763527054e37,-8.928657314629257e37,-8.948496993987975e37,-8.968336673346693e37,-8.988176352705411e37,-9.008016032064127e37,-9.027855711422845e37,-9.047695390781561e37,-9.06753507014028e37,-9.087374749498997e37,-9.107214428857715e37,-9.127054108216433e37,-9.146893787575151e37,-9.166733466933865e37,-9.186573146292583e37,-9.206412825651301e37,-9.22625250501002e37,-9.246092184368737e37,-9.265931863727455e37,-9.285771543086173e37,-9.305611222444887e37,-9.325450901803605e37,-9.345290581162323e37,-9.365130260521041e37,-9.38496993987976e37,-9.404809619238477e37,-9.424649298597193e37,-9.444488977955911e37,-9.464328657314627e37,-9.484168336673345e37,-9.504008016032063e37,-9.523847695390781e37,-9.5436873747495e37,-9.563527054108215e37,-9.583366733466933e37,-9.603206412825651e37,-9.623046092184368e37,-9.642885771543086e37,-9.662725450901804e37,-9.68256513026052e37,-9.702404809619238e37,-9.722244488977956e37,-9.742084168336674e37,-9.761923847695392e37,-9.781763527054108e37,-9.801603206412826e37,-9.821442885771542e37,-9.84128256513026e37,-9.861122244488978e37,-9.880961923847696e37,-9.900801603206414e37,-9.920641282565132e37,-9.940480961923846e37,-9.960320641282564e37,-9.980160320641282e37,-1.0e38]}

},{}],27:[function(require,module,exports){
module.exports={"expected":[-1001.0,-998.9939575195312,-996.9879760742188,-994.98193359375,-992.9759521484375,-990.9699096679688,-988.9639282226562,-986.9578857421875,-984.951904296875,-982.9458618164062,-980.9398803710938,-978.933837890625,-976.9278564453125,-974.9218139648438,-972.9158325195312,-970.9097900390625,-968.90380859375,-966.8977661132812,-964.8917846679688,-962.8857421875,-960.8797607421875,-958.8737182617188,-956.8677368164062,-954.8616943359375,-952.855712890625,-950.8496704101562,-948.8436889648438,-946.837646484375,-944.8316650390625,-942.8256225585938,-940.8196411132812,-938.8135986328125,-936.8076171875,-934.8015747070312,-932.7955932617188,-930.78955078125,-928.7835693359375,-926.7775268554688,-924.7715454101562,-922.7655029296875,-920.759521484375,-918.7534790039062,-916.7474975585938,-914.741455078125,-912.7354736328125,-910.7294311523438,-908.7234497070312,-906.7174072265625,-904.71142578125,-902.7053833007812,-900.6994018554688,-898.693359375,-896.6873779296875,-894.6813354492188,-892.6753540039062,-890.6693115234375,-888.663330078125,-886.6572875976562,-884.6513061523438,-882.645263671875,-880.6392822265625,-878.6332397460938,-876.6272583007812,-874.6212158203125,-872.615234375,-870.6091918945312,-868.6032104492188,-866.59716796875,-864.5911865234375,-862.5851440429688,-860.5791625976562,-858.5731201171875,-856.567138671875,-854.5610961914062,-852.5551147460938,-850.549072265625,-848.5430908203125,-846.5370483398438,-844.5310668945312,-842.5250244140625,-840.51904296875,-838.5130004882812,-836.5070190429688,-834.5009765625,-832.4949951171875,-830.4889526367188,-828.4829711914062,-826.4769287109375,-824.470947265625,-822.4649047851562,-820.4589233398438,-818.452880859375,-816.4468994140625,-814.4408569335938,-812.4348754882812,-810.4288330078125,-808.4228515625,-806.4168090820312,-804.4108276367188,-802.40478515625,-800.3988037109375,-798.3927612304688,-796.3867797851562,-794.3807373046875,-792.374755859375,-790.3687133789062,-788.3627319335938,-786.356689453125,-784.3507080078125,-782.3446655273438,-780.3386840820312,-778.3326416015625,-776.32666015625,-774.3206176757812,-772.3146362304688,-770.30859375,-768.3026123046875,-766.2965698242188,-764.2905883789062,-762.2845458984375,-760.278564453125,-758.2725219726562,-756.2665405273438,-754.260498046875,-752.2545166015625,-750.2484741210938,-748.2424926757812,-746.2364501953125,-744.23046875,-742.2244262695312,-740.2184448242188,-738.21240234375,-736.2064208984375,-734.2003784179688,-732.1943969726562,-730.1883544921875,-728.182373046875,-726.1763305664062,-724.1703491210938,-722.164306640625,-720.1583251953125,-718.1522827148438,-716.1463012695312,-714.1402587890625,-712.13427734375,-710.1282348632812,-708.1222534179688,-706.1162109375,-704.1102294921875,-702.1041870117188,-700.0982055664062,-698.0921630859375,-696.086181640625,-694.0801391601562,-692.0741577148438,-690.068115234375,-688.0621337890625,-686.0560913085938,-684.0501098632812,-682.0440673828125,-680.0380859375,-678.0320434570312,-676.0260620117188,-674.02001953125,-672.0140380859375,-670.0079956054688,-668.0020141601562,-665.9959716796875,-663.989990234375,-661.9839477539062,-659.9779663085938,-657.971923828125,-655.9659423828125,-653.9598999023438,-651.9539184570312,-649.9478759765625,-647.94189453125,-645.9358520507812,-643.9298706054688,-641.923828125,-639.9178466796875,-637.9118041992188,-635.9058227539062,-633.8997802734375,-631.893798828125,-629.8877563476562,-627.8817749023438,-625.875732421875,-623.8697509765625,-621.8637084960938,-619.8577270507812,-617.8516845703125,-615.845703125,-613.8396606445312,-611.8336791992188,-609.82763671875,-607.8216552734375,-605.8156127929688,-603.8096313476562,-601.8035888671875,-599.797607421875,-597.7915649414062,-595.7855834960938,-593.779541015625,-591.7735595703125,-589.7675170898438,-587.7615356445312,-585.7554931640625,-583.74951171875,-581.7434692382812,-579.7374877929688,-577.7314453125,-575.7254638671875,-573.7194213867188,-571.7134399414062,-569.7073974609375,-567.701416015625,-565.6953735351562,-563.6893920898438,-561.683349609375,-559.6773681640625,-557.6713256835938,-555.6653442382812,-553.6593017578125,-551.6533203125,-549.6472778320312,-547.6412963867188,-545.63525390625,-543.6292724609375,-541.6232299804688,-539.6172485351562,-537.6112060546875,-535.605224609375,-533.5991821289062,-531.5932006835938,-529.587158203125,-527.5811767578125,-525.5751342773438,-523.5691528320312,-521.5631103515625,-519.55712890625,-517.5510864257812,-515.5451049804688,-513.5390625,-511.5330810546875,-509.5270690917969,-507.52105712890625,-505.5150451660156,-503.509033203125,-501.5030212402344,-499.4969787597656,-497.490966796875,-495.4849548339844,-493.47894287109375,-491.4729309082031,-489.4669189453125,-487.4609069824219,-485.45489501953125,-483.4488830566406,-481.44287109375,-479.4368591308594,-477.43084716796875,-475.4248352050781,-473.4188232421875,-471.4128112792969,-469.40679931640625,-467.4007873535156,-465.394775390625,-463.3887634277344,-461.38275146484375,-459.3767395019531,-457.3707275390625,-455.3647155761719,-453.35870361328125,-451.3526916503906,-449.3466796875,-447.3406677246094,-445.33465576171875,-443.3286437988281,-441.3226318359375,-439.3166198730469,-437.31060791015625,-435.3045959472656,-433.298583984375,-431.2925720214844,-429.28656005859375,-427.2805480957031,-425.2745361328125,-423.2685241699219,-421.26251220703125,-419.2565002441406,-417.25048828125,-415.2444763183594,-413.23846435546875,-411.2324523925781,-409.2264404296875,-407.2204284667969,-405.21441650390625,-403.2084045410156,-401.202392578125,-399.1963806152344,-397.19036865234375,-395.1843566894531,-393.1783447265625,-391.1723327636719,-389.16632080078125,-387.1603088378906,-385.154296875,-383.1482849121094,-381.14227294921875,-379.1362609863281,-377.1302490234375,-375.1242370605469,-373.11822509765625,-371.1122131347656,-369.106201171875,-367.1001892089844,-365.09417724609375,-363.0881652832031,-361.0821533203125,-359.0761413574219,-357.07012939453125,-355.0641174316406,-353.05810546875,-351.0520935058594,-349.04608154296875,-347.0400695800781,-345.0340576171875,-343.0280456542969,-341.02203369140625,-339.0160217285156,-337.010009765625,-335.0039978027344,-332.99798583984375,-330.9919738769531,-328.9859619140625,-326.9799499511719,-324.97393798828125,-322.9679260253906,-320.9619140625,-318.9559020996094,-316.94989013671875,-314.9438781738281,-312.9378662109375,-310.9318542480469,-308.92584228515625,-306.9198303222656,-304.913818359375,-302.9078063964844,-300.90179443359375,-298.8957824707031,-296.8897705078125,-294.8837585449219,-292.87774658203125,-290.8717346191406,-288.86572265625,-286.8597106933594,-284.85369873046875,-282.8476867675781,-280.8416748046875,-278.8356628417969,-276.82965087890625,-274.8236389160156,-272.817626953125,-270.8116149902344,-268.80560302734375,-266.7995910644531,-264.7935791015625,-262.7875671386719,-260.78155517578125,-258.7755432128906,-256.76953125,-254.76353454589844,-252.7575225830078,-250.7515106201172,-248.7454833984375,-246.73947143554688,-244.73345947265625,-242.72744750976562,-240.721435546875,-238.71542358398438,-236.70941162109375,-234.70339965820312,-232.6973876953125,-230.69137573242188,-228.68536376953125,-226.67935180664062,-224.67333984375,-222.66732788085938,-220.66131591796875,-218.65530395507812,-216.6492919921875,-214.64328002929688,-212.63726806640625,-210.63125610351562,-208.625244140625,-206.61923217773438,-204.61322021484375,-202.60720825195312,-200.6011962890625,-198.59518432617188,-196.58917236328125,-194.58316040039062,-192.5771484375,-190.57113647460938,-188.56512451171875,-186.55911254882812,-184.5531005859375,-182.54708862304688,-180.54107666015625,-178.53506469726562,-176.529052734375,-174.52304077148438,-172.51702880859375,-170.51101684570312,-168.5050048828125,-166.49899291992188,-164.49298095703125,-162.48696899414062,-160.48095703125,-158.47494506835938,-156.46893310546875,-154.46292114257812,-152.4569091796875,-150.45089721679688,-148.44488525390625,-146.43887329101562,-144.432861328125,-142.42684936523438,-140.42083740234375,-138.41482543945312,-136.4088134765625,-134.40280151367188,-132.39678955078125,-130.39077758789062,-128.384765625,-126.3787612915039,-124.37274169921875,-122.36672973632812,-120.3607177734375,-118.35470581054688,-116.34869384765625,-114.34268188476562,-112.336669921875,-110.33065795898438,-108.32464599609375,-106.31863403320312,-104.3126220703125,-102.30661010742188,-100.30059814453125,-98.29458618164062,-96.28857421875,-94.28256225585938,-92.27655029296875,-90.27053833007812,-88.2645263671875,-86.25851440429688,-84.25250244140625,-82.24649047851562,-80.240478515625,-78.23446655273438,-76.22845458984375,-74.22244262695312,-72.2164306640625,-70.21041870117188,-68.20440673828125,-66.19839477539062,-64.1923828125,-62.186370849609375,-60.18035888671875,-58.174346923828125,-56.1683349609375,-54.162322998046875,-52.15631103515625,-50.150299072265625,-48.144287109375,-46.138275146484375,-44.13226318359375,-42.126251220703125,-40.1202392578125,-38.114227294921875,-36.10821533203125,-34.102203369140625,-32.09619140625,-30.090179443359375,-28.08416748046875,-26.078155517578125,-24.0721435546875,-22.066131591796875,-20.06011962890625,-18.054107666015625,-16.048095703125,-14.042083740234375,-12.03607177734375,-10.030059814453125,-8.0240478515625,-6.018035888671875,-4.01202392578125,-2.006011962890625,0.0],"x":[-1001.0,-998.9939879759519,-996.9879759519038,-994.9819639278558,-992.9759519038076,-990.9699398797595,-988.9639278557114,-986.9579158316633,-984.9519038076153,-982.9458917835672,-980.939879759519,-978.9338677354709,-976.9278557114228,-974.9218436873748,-972.9158316633267,-970.9098196392786,-968.9038076152304,-966.8977955911823,-964.8917835671342,-962.8857715430862,-960.8797595190381,-958.87374749499,-956.8677354709419,-954.8617234468937,-952.8557114228457,-950.8496993987976,-948.8436873747495,-946.8376753507014,-944.8316633266533,-942.8256513026053,-940.8196392785571,-938.813627254509,-936.8076152304609,-934.8016032064128,-932.7955911823648,-930.7895791583167,-928.7835671342685,-926.7775551102204,-924.7715430861723,-922.7655310621243,-920.7595190380762,-918.7535070140281,-916.7474949899799,-914.7414829659318,-912.7354709418838,-910.7294589178357,-908.7234468937876,-906.7174348697395,-904.7114228456913,-902.7054108216433,-900.6993987975952,-898.6933867735471,-896.687374749499,-894.6813627254509,-892.6753507014027,-890.6693386773547,-888.6633266533066,-886.6573146292585,-884.6513026052104,-882.6452905811623,-880.6392785571143,-878.6332665330661,-876.627254509018,-874.6212424849699,-872.6152304609218,-870.6092184368738,-868.6032064128257,-866.5971943887776,-864.5911823647294,-862.5851703406813,-860.5791583166333,-858.5731462925852,-856.5671342685371,-854.561122244489,-852.5551102204408,-850.5490981963928,-848.5430861723447,-846.5370741482966,-844.5310621242485,-842.5250501002004,-840.5190380761524,-838.5130260521042,-836.5070140280561,-834.501002004008,-832.4949899799599,-830.4889779559119,-828.4829659318638,-826.4769539078156,-824.4709418837675,-822.4649298597194,-820.4589178356713,-818.4529058116233,-816.4468937875752,-814.440881763527,-812.4348697394789,-810.4288577154308,-808.4228456913828,-806.4168336673347,-804.4108216432866,-802.4048096192384,-800.3987975951903,-798.3927855711423,-796.3867735470942,-794.3807615230461,-792.374749498998,-790.3687374749499,-788.3627254509018,-786.3567134268537,-784.3507014028056,-782.3446893787575,-780.3386773547094,-778.3326653306614,-776.3266533066133,-774.3206412825651,-772.314629258517,-770.3086172344689,-768.3026052104209,-766.2965931863728,-764.2905811623247,-762.2845691382765,-760.2785571142284,-758.2725450901804,-756.2665330661323,-754.2605210420842,-752.2545090180361,-750.2484969939879,-748.2424849699398,-746.2364729458918,-744.2304609218437,-742.2244488977956,-740.2184368737475,-738.2124248496993,-736.2064128256513,-734.2004008016032,-732.1943887775551,-730.188376753507,-728.1823647294589,-726.1763527054109,-724.1703406813627,-722.1643286573146,-720.1583166332665,-718.1523046092184,-716.1462925851704,-714.1402805611223,-712.1342685370741,-710.128256513026,-708.1222444889779,-706.1162324649299,-704.1102204408818,-702.1042084168337,-700.0981963927856,-698.0921843687374,-696.0861723446894,-694.0801603206413,-692.0741482965932,-690.0681362725451,-688.062124248497,-686.056112224449,-684.0501002004008,-682.0440881763527,-680.0380761523046,-678.0320641282565,-676.0260521042084,-674.0200400801604,-672.0140280561122,-670.0080160320641,-668.002004008016,-665.9959919839679,-663.9899799599199,-661.9839679358718,-659.9779559118236,-657.9719438877755,-655.9659318637274,-653.9599198396794,-651.9539078156313,-649.9478957915832,-647.941883767535,-645.9358717434869,-643.9298597194389,-641.9238476953908,-639.9178356713427,-637.9118236472946,-635.9058116232464,-633.8997995991984,-631.8937875751503,-629.8877755511022,-627.8817635270541,-625.875751503006,-623.869739478958,-621.8637274549098,-619.8577154308617,-617.8517034068136,-615.8456913827655,-613.8396793587175,-611.8336673346694,-609.8276553106213,-607.8216432865731,-605.815631262525,-603.8096192384769,-601.8036072144289,-599.7975951903808,-597.7915831663327,-595.7855711422845,-593.7795591182364,-591.7735470941884,-589.7675350701403,-587.7615230460922,-585.7555110220441,-583.7494989979959,-581.7434869739479,-579.7374749498998,-577.7314629258517,-575.7254509018036,-573.7194388777555,-571.7134268537075,-569.7074148296593,-567.7014028056112,-565.6953907815631,-563.689378757515,-561.683366733467,-559.6773547094189,-557.6713426853707,-555.6653306613226,-553.6593186372745,-551.6533066132265,-549.6472945891784,-547.6412825651303,-545.6352705410821,-543.629258517034,-541.623246492986,-539.6172344689379,-537.6112224448898,-535.6052104208417,-533.5991983967936,-531.5931863727454,-529.5871743486974,-527.5811623246493,-525.5751503006012,-523.5691382765531,-521.563126252505,-519.557114228457,-517.5511022044088,-515.5450901803607,-513.5390781563126,-511.53306613226454,-509.5270541082164,-507.52104208416836,-505.51503006012024,-503.5090180360721,-501.50300601202406,-499.49699398797594,-497.4909819639279,-495.48496993987976,-493.47895791583164,-491.4729458917836,-489.46693386773546,-487.4609218436874,-485.4549098196393,-483.44889779559117,-481.4428857715431,-479.436873747495,-477.43086172344687,-475.4248496993988,-473.4188376753507,-471.4128256513026,-469.4068136272545,-467.4008016032064,-465.3947895791583,-463.3887775551102,-461.38276553106215,-459.37675350701403,-457.3707414829659,-455.36472945891785,-453.35871743486973,-451.35270541082167,-449.34669338677355,-447.34068136272543,-445.3346693386774,-443.32865731462925,-441.32264529058114,-439.3166332665331,-437.31062124248496,-435.3046092184369,-433.2985971943888,-431.29258517034066,-429.2865731462926,-427.2805611222445,-425.2745490981964,-423.2685370741483,-421.2625250501002,-419.2565130260521,-417.250501002004,-415.24448897795594,-413.2384769539078,-411.2324649298597,-409.22645290581164,-407.2204408817635,-405.2144288577154,-403.20841683366734,-401.2024048096192,-399.19639278557116,-397.19038076152304,-395.1843687374749,-393.17835671342687,-391.17234468937875,-389.1663326653307,-387.16032064128257,-385.15430861723445,-383.1482965931864,-381.14228456913827,-379.1362725450902,-377.1302605210421,-375.12424849699397,-373.1182364729459,-371.1122244488978,-369.1062124248497,-367.1002004008016,-365.0941883767535,-363.08817635270543,-361.0821643286573,-359.0761523046092,-357.07014028056113,-355.064128256513,-353.05811623246495,-351.05210420841684,-349.0460921843687,-347.04008016032066,-345.03406813627254,-343.0280561122245,-341.02204408817636,-339.01603206412824,-337.0100200400802,-335.00400801603206,-332.99799599198394,-330.9919839679359,-328.98597194388776,-326.9799599198397,-324.9739478957916,-322.96793587174346,-320.9619238476954,-318.9559118236473,-316.9498997995992,-314.9438877755511,-312.937875751503,-310.9318637274549,-308.9258517034068,-306.91983967935874,-304.9138276553106,-302.9078156312625,-300.90180360721445,-298.89579158316633,-296.8897795591182,-294.88376753507015,-292.87775551102203,-290.87174348697397,-288.86573146292585,-286.85971943887773,-284.85370741482967,-282.84769539078155,-280.8416833667335,-278.8356713426854,-276.82965931863725,-274.8236472945892,-272.8176352705411,-270.811623246493,-268.8056112224449,-266.7995991983968,-264.7935871743487,-262.7875751503006,-260.7815631262525,-258.7755511022044,-256.7695390781563,-254.7635270541082,-252.75751503006012,-250.75150300601203,-248.74549098196394,-246.73947895791582,-244.73346693386773,-242.72745490981964,-240.72144288577155,-238.71543086172343,-236.70941883767534,-234.70340681362725,-232.69739478957916,-230.69138276553107,-228.68537074148296,-226.67935871743487,-224.67334669338678,-222.6673346693387,-220.66132264529057,-218.65531062124248,-216.6492985971944,-214.6432865731463,-212.6372745490982,-210.6312625250501,-208.625250501002,-206.6192384769539,-204.61322645290582,-202.6072144288577,-200.6012024048096,-198.59519038076152,-196.58917835671343,-194.58316633266534,-192.57715430861722,-190.57114228456913,-188.56513026052104,-186.55911823647295,-184.55310621242484,-182.54709418837675,-180.54108216432866,-178.53507014028057,-176.52905811623248,-174.52304609218436,-172.51703406813627,-170.51102204408818,-168.5050100200401,-166.49899799599197,-164.49298597194388,-162.4869739478958,-160.4809619238477,-158.4749498997996,-156.4689378757515,-154.4629258517034,-152.4569138276553,-150.45090180360722,-148.4448897795591,-146.43887775551102,-144.43286573146293,-142.42685370741484,-140.42084168336675,-138.41482965931863,-136.40881763527054,-134.40280561122245,-132.39679358717436,-130.39078156312624,-128.38476953907815,-126.37875751503006,-124.37274549098197,-122.36673346693387,-120.36072144288578,-118.35470941883767,-116.34869739478958,-114.34268537074148,-112.33667334669339,-110.33066132264528,-108.3246492985972,-106.3186372745491,-104.312625250501,-102.30661322645291,-100.3006012024048,-98.29458917835672,-96.28857715430861,-94.28256513026052,-92.27655310621242,-90.27054108216433,-88.26452905811624,-86.25851703406813,-84.25250501002004,-82.24649298597194,-80.24048096192385,-78.23446893787575,-76.22845691382766,-74.22244488977955,-72.21643286573146,-70.21042084168337,-68.20440881763527,-66.19839679358718,-64.19238476953907,-62.186372745490985,-60.18036072144289,-58.17434869739479,-56.168336673346694,-54.1623246492986,-52.1563126252505,-50.1503006012024,-48.144288577154306,-46.13827655310621,-44.13226452905812,-42.12625250501002,-40.120240480961925,-38.11422845691383,-36.10821643286573,-34.102204408817634,-32.09619238476954,-30.090180360721444,-28.084168336673347,-26.07815631262525,-24.072144288577153,-22.06613226452906,-20.060120240480963,-18.054108216432866,-16.04809619238477,-14.042084168336673,-12.036072144288577,-10.030060120240481,-8.024048096192384,-6.018036072144288,-4.012024048096192,-2.006012024048096,0.0]}

},{}],28:[function(require,module,exports){
module.exports={"expected":[-1.0,-0.9979959726333618,-0.9959920048713684,-0.9939879775047302,-0.991983950138092,-0.9899799823760986,-0.9879759550094604,-0.9859719276428223,-0.9839679598808289,-0.9819639325141907,-0.9799599051475525,-0.9779559373855591,-0.9759519100189209,-0.9739478826522827,-0.9719439148902893,-0.9699398875236511,-0.9679358601570129,-0.9659318923950195,-0.9639278650283813,-0.9619238376617432,-0.959919810295105,-0.9579158425331116,-0.9559118151664734,-0.9539077877998352,-0.9519038200378418,-0.9498997926712036,-0.9478957653045654,-0.945891797542572,-0.9438877701759338,-0.9418837428092957,-0.9398797750473022,-0.9378757476806641,-0.9358717203140259,-0.9338677525520325,-0.9318637251853943,-0.9298596978187561,-0.9278557300567627,-0.9258517026901245,-0.9238476753234863,-0.9218437075614929,-0.9198396801948547,-0.9178356528282166,-0.9158316850662231,-0.913827657699585,-0.9118236303329468,-0.9098196625709534,-0.9078156352043152,-0.905811607837677,-0.9038076400756836,-0.9018036127090454,-0.8997995853424072,-0.8977956175804138,-0.8957915902137756,-0.8937875628471375,-0.891783595085144,-0.8897795677185059,-0.8877755403518677,-0.8857715725898743,-0.8837675452232361,-0.8817635178565979,-0.8797594904899597,-0.8777555227279663,-0.8757514953613281,-0.8737474679946899,-0.8717435002326965,-0.8697394728660583,-0.8677354454994202,-0.8657314777374268,-0.8637274503707886,-0.8617234230041504,-0.859719455242157,-0.8577154278755188,-0.8557114005088806,-0.8537074327468872,-0.851703405380249,-0.8496993780136108,-0.8476954102516174,-0.8456913828849792,-0.8436873555183411,-0.8416833877563477,-0.8396793603897095,-0.8376753330230713,-0.8356713652610779,-0.8336673378944397,-0.8316633105278015,-0.8296593427658081,-0.8276553153991699,-0.8256512880325317,-0.8236473202705383,-0.8216432929039001,-0.819639265537262,-0.8176352977752686,-0.8156312704086304,-0.8136272430419922,-0.8116232752799988,-0.8096192479133606,-0.8076152205467224,-0.8056111931800842,-0.8036072254180908,-0.8016031980514526,-0.7995991706848145,-0.797595202922821,-0.7955911755561829,-0.7935871481895447,-0.7915831804275513,-0.7895791530609131,-0.7875751256942749,-0.7855711579322815,-0.7835671305656433,-0.7815631031990051,-0.7795591354370117,-0.7775551080703735,-0.7755510807037354,-0.7735471129417419,-0.7715430855751038,-0.7695390582084656,-0.7675350904464722,-0.765531063079834,-0.7635270357131958,-0.7615230679512024,-0.7595190405845642,-0.757515013217926,-0.7555110454559326,-0.7535070180892944,-0.7515029907226562,-0.7494990229606628,-0.7474949955940247,-0.7454909682273865,-0.7434870004653931,-0.7414829730987549,-0.7394789457321167,-0.7374749779701233,-0.7354709506034851,-0.7334669232368469,-0.7314629554748535,-0.7294589281082153,-0.7274549007415771,-0.725450873374939,-0.7234469056129456,-0.7214428782463074,-0.7194388508796692,-0.7174348831176758,-0.7154308557510376,-0.7134268283843994,-0.711422860622406,-0.7094188332557678,-0.7074148058891296,-0.7054108381271362,-0.703406810760498,-0.7014027833938599,-0.6993988156318665,-0.6973947882652283,-0.6953907608985901,-0.6933867931365967,-0.6913827657699585,-0.6893787384033203,-0.6873747706413269,-0.6853707432746887,-0.6833667159080505,-0.6813627481460571,-0.679358720779419,-0.6773546934127808,-0.6753507256507874,-0.6733466982841492,-0.671342670917511,-0.6693387031555176,-0.6673346757888794,-0.6653306484222412,-0.6633266806602478,-0.6613226532936096,-0.6593186259269714,-0.657314658164978,-0.6553106307983398,-0.6533066034317017,-0.6513025760650635,-0.6492986083030701,-0.6472945809364319,-0.6452905535697937,-0.6432865858078003,-0.6412825584411621,-0.6392785310745239,-0.6372745633125305,-0.6352705359458923,-0.6332665085792542,-0.6312625408172607,-0.6292585134506226,-0.6272544860839844,-0.625250518321991,-0.6232464909553528,-0.6212424635887146,-0.6192384958267212,-0.617234468460083,-0.6152304410934448,-0.6132264733314514,-0.6112224459648132,-0.609218418598175,-0.6072144508361816,-0.6052104234695435,-0.6032063961029053,-0.6012024283409119,-0.5991984009742737,-0.5971943736076355,-0.5951904058456421,-0.5931863784790039,-0.5911823511123657,-0.5891783833503723,-0.5871743559837341,-0.585170328617096,-0.5831663608551025,-0.5811623334884644,-0.5791583061218262,-0.5771543383598328,-0.5751503109931946,-0.5731462836265564,-0.5711422562599182,-0.5691382884979248,-0.5671342611312866,-0.5651302337646484,-0.563126266002655,-0.5611222386360168,-0.5591182112693787,-0.5571142435073853,-0.5551102161407471,-0.5531061887741089,-0.5511022210121155,-0.5490981936454773,-0.5470941662788391,-0.5450901985168457,-0.5430861711502075,-0.5410821437835693,-0.5390781760215759,-0.5370741486549377,-0.5350701212882996,-0.5330661535263062,-0.531062126159668,-0.5290580987930298,-0.5270541310310364,-0.5250501036643982,-0.52304607629776,-0.5210421085357666,-0.5190380811691284,-0.5170340538024902,-0.5150300860404968,-0.5130260586738586,-0.5110220313072205,-0.509018063545227,-0.5070140361785889,-0.5050100088119507,-0.5030060410499573,-0.5010020136833191,-0.4989979863166809,-0.4969939887523651,-0.4949899911880493,-0.49298596382141113,-0.49098196625709534,-0.48897796869277954,-0.48697394132614136,-0.48496994376182556,-0.48296594619750977,-0.4809619188308716,-0.4789579212665558,-0.4769538938999176,-0.4749498963356018,-0.472945898771286,-0.4709418714046478,-0.46893787384033203,-0.46693387627601624,-0.46492984890937805,-0.46292585134506226,-0.46092185378074646,-0.4589178264141083,-0.4569138288497925,-0.4549098312854767,-0.4529058039188385,-0.4509018063545227,-0.4488978087902069,-0.4468937814235687,-0.44488978385925293,-0.44288578629493713,-0.44088175892829895,-0.43887776136398315,-0.43687373399734497,-0.4348697364330292,-0.4328657388687134,-0.4308617115020752,-0.4288577139377594,-0.4268537163734436,-0.4248496890068054,-0.4228456914424896,-0.42084169387817383,-0.41883766651153564,-0.41683366894721985,-0.41482967138290405,-0.41282564401626587,-0.4108216464519501,-0.4088176488876343,-0.4068136215209961,-0.4048096239566803,-0.4028055965900421,-0.4008015990257263,-0.3987976014614105,-0.39679357409477234,-0.39478957653045654,-0.39278557896614075,-0.39078155159950256,-0.38877755403518677,-0.38677355647087097,-0.3847695291042328,-0.382765531539917,-0.3807615339756012,-0.378757506608963,-0.3767535090446472,-0.3747495114803314,-0.37274548411369324,-0.37074148654937744,-0.36873748898506165,-0.36673346161842346,-0.36472946405410767,-0.3627254366874695,-0.3607214391231537,-0.3587174415588379,-0.3567134141921997,-0.3547094166278839,-0.3527054190635681,-0.35070139169692993,-0.34869739413261414,-0.34669339656829834,-0.34468936920166016,-0.34268537163734436,-0.34068137407302856,-0.3386773467063904,-0.3366733491420746,-0.3346693515777588,-0.3326653242111206,-0.3306613266468048,-0.328657329082489,-0.32665330171585083,-0.32464930415153503,-0.32264527678489685,-0.32064127922058105,-0.31863728165626526,-0.3166332542896271,-0.3146292567253113,-0.3126252591609955,-0.3106212317943573,-0.3086172342300415,-0.3066132366657257,-0.3046092092990875,-0.30260521173477173,-0.30060121417045593,-0.29859718680381775,-0.29659318923950195,-0.29458919167518616,-0.292585164308548,-0.2905811667442322,-0.2885771691799164,-0.2865731418132782,-0.2845691442489624,-0.2825651168823242,-0.2805611193180084,-0.2785571217536926,-0.27655309438705444,-0.27454909682273865,-0.27254509925842285,-0.27054107189178467,-0.26853707432746887,-0.2665330767631531,-0.2645290493965149,-0.2625250518321991,-0.2605210542678833,-0.2585170269012451,-0.2565130293369293,-0.2545090317726135,-0.25250500440597534,-0.25050100684165955,-0.24849699437618256,-0.24649298191070557,-0.24448898434638977,-0.24248497188091278,-0.2404809594154358,-0.2384769469499588,-0.236472949385643,-0.23446893692016602,-0.23246492445468903,-0.23046092689037323,-0.22845691442489624,-0.22645290195941925,-0.22444890439510345,-0.22244489192962646,-0.22044087946414948,-0.21843686699867249,-0.2164328694343567,-0.2144288569688797,-0.2124248445034027,-0.21042084693908691,-0.20841683447360992,-0.20641282200813293,-0.20440882444381714,-0.20240481197834015,-0.20040079951286316,-0.19839678704738617,-0.19639278948307037,-0.19438877701759338,-0.1923847645521164,-0.1903807669878006,-0.1883767545223236,-0.18637274205684662,-0.18436874449253082,-0.18236473202705383,-0.18036071956157684,-0.17835670709609985,-0.17635270953178406,-0.17434869706630707,-0.17234468460083008,-0.17034068703651428,-0.1683366745710373,-0.1663326621055603,-0.1643286645412445,-0.16232465207576752,-0.16032063961029053,-0.15831662714481354,-0.15631262958049774,-0.15430861711502075,-0.15230460464954376,-0.15030060708522797,-0.14829659461975098,-0.146292582154274,-0.1442885845899582,-0.1422845721244812,-0.1402805596590042,-0.13827654719352722,-0.13627254962921143,-0.13426853716373444,-0.13226452469825745,-0.13026052713394165,-0.12825651466846466,-0.12625250220298767,-0.12424849718809128,-0.12224449217319489,-0.1202404797077179,-0.1182364746928215,-0.11623246222734451,-0.11422845721244812,-0.11222445219755173,-0.11022043973207474,-0.10821643471717834,-0.10621242225170135,-0.10420841723680496,-0.10220441222190857,-0.10020039975643158,-0.09819639474153519,-0.0961923822760582,-0.0941883772611618,-0.09218437224626541,-0.09018035978078842,-0.08817635476589203,-0.08617234230041504,-0.08416833728551865,-0.08216433227062225,-0.08016031980514526,-0.07815631479024887,-0.07615230232477188,-0.07414829730987549,-0.0721442922949791,-0.0701402798295021,-0.06813627481460571,-0.06613226234912872,-0.06412825733423233,-0.06212424859404564,-0.06012023985385895,-0.058116231113672256,-0.056112226098775864,-0.05410821735858917,-0.05210420861840248,-0.05010019987821579,-0.0480961911380291,-0.046092186123132706,-0.044088177382946014,-0.04208416864275932,-0.04008015990257263,-0.03807615116238594,-0.03607214614748955,-0.034068137407302856,-0.032064128667116165,-0.030060119926929474,-0.028056113049387932,-0.02605210430920124,-0.02404809556901455,-0.022044088691473007,-0.020040079951286316,-0.018036073073744774,-0.016032064333558083,-0.014028056524693966,-0.012024047784507275,-0.010020039975643158,-0.008016032166779041,-0.006012023892253637,-0.004008016083389521,-0.0020040080416947603,0.0],"x":[-1.0,-0.9979959919839679,-0.9959919839679359,-0.9939879759519038,-0.9919839679358717,-0.9899799599198397,-0.9879759519038076,-0.9859719438877755,-0.9839679358717435,-0.9819639278557114,-0.9799599198396793,-0.9779559118236473,-0.9759519038076152,-0.9739478957915831,-0.9719438877755511,-0.969939879759519,-0.9679358717434869,-0.9659318637274549,-0.9639278557114228,-0.9619238476953907,-0.9599198396793587,-0.9579158316633266,-0.9559118236472945,-0.9539078156312625,-0.9519038076152304,-0.9498997995991983,-0.9478957915831663,-0.9458917835671342,-0.9438877755511023,-0.9418837675350702,-0.9398797595190381,-0.9378757515030061,-0.935871743486974,-0.9338677354709419,-0.9318637274549099,-0.9298597194388778,-0.9278557114228457,-0.9258517034068137,-0.9238476953907816,-0.9218436873747495,-0.9198396793587175,-0.9178356713426854,-0.9158316633266533,-0.9138276553106213,-0.9118236472945892,-0.9098196392785571,-0.9078156312625251,-0.905811623246493,-0.9038076152304609,-0.9018036072144289,-0.8997995991983968,-0.8977955911823647,-0.8957915831663327,-0.8937875751503006,-0.8917835671342685,-0.8897795591182365,-0.8877755511022044,-0.8857715430861723,-0.8837675350701403,-0.8817635270541082,-0.8797595190380761,-0.8777555110220441,-0.875751503006012,-0.87374749498998,-0.8717434869739479,-0.8697394789579158,-0.8677354709418837,-0.8657314629258517,-0.8637274549098196,-0.8617234468937875,-0.8597194388777555,-0.8577154308617234,-0.8557114228456913,-0.8537074148296593,-0.8517034068136272,-0.8496993987975952,-0.8476953907815631,-0.845691382765531,-0.843687374749499,-0.8416833667334669,-0.8396793587174348,-0.8376753507014028,-0.8356713426853707,-0.8336673346693386,-0.8316633266533067,-0.8296593186372746,-0.8276553106212425,-0.8256513026052105,-0.8236472945891784,-0.8216432865731463,-0.8196392785571143,-0.8176352705410822,-0.8156312625250501,-0.8136272545090181,-0.811623246492986,-0.8096192384769539,-0.8076152304609219,-0.8056112224448898,-0.8036072144288577,-0.8016032064128257,-0.7995991983967936,-0.7975951903807615,-0.7955911823647295,-0.7935871743486974,-0.7915831663326653,-0.7895791583166333,-0.7875751503006012,-0.7855711422845691,-0.7835671342685371,-0.781563126252505,-0.779559118236473,-0.7775551102204409,-0.7755511022044088,-0.7735470941883767,-0.7715430861723447,-0.7695390781563126,-0.7675350701402806,-0.7655310621242485,-0.7635270541082164,-0.7615230460921844,-0.7595190380761523,-0.7575150300601202,-0.7555110220440882,-0.7535070140280561,-0.751503006012024,-0.749498997995992,-0.7474949899799599,-0.7454909819639278,-0.7434869739478958,-0.7414829659318637,-0.7394789579158316,-0.7374749498997996,-0.7354709418837675,-0.7334669338677354,-0.7314629258517034,-0.7294589178356713,-0.7274549098196392,-0.7254509018036072,-0.7234468937875751,-0.7214428857715431,-0.7194388777555111,-0.717434869739479,-0.7154308617234469,-0.7134268537074149,-0.7114228456913828,-0.7094188376753507,-0.7074148296593187,-0.7054108216432866,-0.7034068136272545,-0.7014028056112225,-0.6993987975951904,-0.6973947895791583,-0.6953907815631263,-0.6933867735470942,-0.6913827655310621,-0.6893787575150301,-0.687374749498998,-0.685370741482966,-0.6833667334669339,-0.6813627254509018,-0.6793587174348698,-0.6773547094188377,-0.6753507014028056,-0.6733466933867736,-0.6713426853707415,-0.6693386773547094,-0.6673346693386774,-0.6653306613226453,-0.6633266533066132,-0.6613226452905812,-0.6593186372745491,-0.657314629258517,-0.655310621242485,-0.6533066132264529,-0.6513026052104208,-0.6492985971943888,-0.6472945891783567,-0.6452905811623246,-0.6432865731462926,-0.6412825651302605,-0.6392785571142284,-0.6372745490981964,-0.6352705410821643,-0.6332665330661322,-0.6312625250501002,-0.6292585170340681,-0.627254509018036,-0.625250501002004,-0.6232464929859719,-0.6212424849699398,-0.6192384769539078,-0.6172344689378757,-0.6152304609218436,-0.6132264529058116,-0.6112224448897795,-0.6092184368737475,-0.6072144288577155,-0.6052104208416834,-0.6032064128256514,-0.6012024048096193,-0.5991983967935872,-0.5971943887775552,-0.5951903807615231,-0.593186372745491,-0.591182364729459,-0.5891783567134269,-0.5871743486973948,-0.5851703406813628,-0.5831663326653307,-0.5811623246492986,-0.5791583166332666,-0.5771543086172345,-0.5751503006012024,-0.5731462925851704,-0.5711422845691383,-0.5691382765531062,-0.5671342685370742,-0.5651302605210421,-0.56312625250501,-0.561122244488978,-0.5591182364729459,-0.5571142284569138,-0.5551102204408818,-0.5531062124248497,-0.5511022044088176,-0.5490981963927856,-0.5470941883767535,-0.5450901803607214,-0.5430861723446894,-0.5410821643286573,-0.5390781563126252,-0.5370741482965932,-0.5350701402805611,-0.533066132264529,-0.531062124248497,-0.5290581162324649,-0.5270541082164328,-0.5250501002004008,-0.5230460921843687,-0.5210420841683366,-0.5190380761523046,-0.5170340681362725,-0.5150300601202404,-0.5130260521042084,-0.5110220440881763,-0.5090180360721442,-0.5070140280561122,-0.5050100200400801,-0.503006012024048,-0.501002004008016,-0.49899799599198397,-0.4969939879759519,-0.49498997995991983,-0.49298597194388777,-0.4909819639278557,-0.48897795591182364,-0.48697394789579157,-0.4849699398797595,-0.48296593186372744,-0.48096192384769537,-0.4789579158316633,-0.47695390781563124,-0.4749498997995992,-0.4729458917835671,-0.4709418837675351,-0.46893787575150303,-0.46693386773547096,-0.4649298597194389,-0.46292585170340683,-0.46092184368737477,-0.4589178356713427,-0.45691382765531063,-0.45490981963927857,-0.4529058116232465,-0.45090180360721444,-0.44889779559118237,-0.4468937875751503,-0.44488977955911824,-0.44288577154308617,-0.4408817635270541,-0.43887775551102204,-0.43687374749499,-0.4348697394789579,-0.43286573146292584,-0.4308617234468938,-0.4288577154308617,-0.42685370741482964,-0.4248496993987976,-0.4228456913827655,-0.42084168336673344,-0.4188376753507014,-0.4168336673346693,-0.4148296593186373,-0.41282565130260523,-0.41082164328657317,-0.4088176352705411,-0.40681362725450904,-0.40480961923847697,-0.4028056112224449,-0.40080160320641284,-0.39879759519038077,-0.3967935871743487,-0.39478957915831664,-0.3927855711422846,-0.3907815631262525,-0.38877755511022044,-0.3867735470941884,-0.3847695390781563,-0.38276553106212424,-0.3807615230460922,-0.3787575150300601,-0.37675350701402804,-0.374749498997996,-0.3727454909819639,-0.37074148296593185,-0.3687374749498998,-0.3667334669338677,-0.36472945891783565,-0.3627254509018036,-0.36072144288577157,-0.3587174348697395,-0.35671342685370744,-0.35470941883767537,-0.3527054108216433,-0.35070140280561124,-0.3486973947895792,-0.3466933867735471,-0.34468937875751504,-0.342685370741483,-0.3406813627254509,-0.33867735470941884,-0.3366733466933868,-0.3346693386773547,-0.33266533066132264,-0.3306613226452906,-0.3286573146292585,-0.32665330661322645,-0.3246492985971944,-0.3226452905811623,-0.32064128256513025,-0.3186372745490982,-0.3166332665330661,-0.31462925851703405,-0.312625250501002,-0.3106212424849699,-0.30861723446893785,-0.3066132264529058,-0.3046092184368738,-0.3026052104208417,-0.30060120240480964,-0.2985971943887776,-0.2965931863727455,-0.29458917835671344,-0.2925851703406814,-0.2905811623246493,-0.28857715430861725,-0.2865731462925852,-0.2845691382765531,-0.28256513026052105,-0.280561122244489,-0.2785571142284569,-0.27655310621242485,-0.2745490981963928,-0.2725450901803607,-0.27054108216432865,-0.2685370741482966,-0.2665330661322645,-0.26452905811623245,-0.2625250501002004,-0.2605210420841683,-0.25851703406813625,-0.2565130260521042,-0.2545090180360721,-0.25250501002004005,-0.250501002004008,-0.24849699398797595,-0.24649298597194388,-0.24448897795591182,-0.24248496993987975,-0.24048096192384769,-0.23847695390781562,-0.23647294589178355,-0.23446893787575152,-0.23246492985971945,-0.23046092184368738,-0.22845691382765532,-0.22645290581162325,-0.22444889779559118,-0.22244488977955912,-0.22044088176352705,-0.218436873747495,-0.21643286573146292,-0.21442885771543085,-0.2124248496993988,-0.21042084168336672,-0.20841683366733466,-0.20641282565130262,-0.20440881763527055,-0.20240480961923848,-0.20040080160320642,-0.19839679358717435,-0.1963927855711423,-0.19438877755511022,-0.19238476953907815,-0.1903807615230461,-0.18837675350701402,-0.18637274549098196,-0.1843687374749499,-0.18236472945891782,-0.18036072144288579,-0.17835671342685372,-0.17635270541082165,-0.1743486973947896,-0.17234468937875752,-0.17034068136272545,-0.1683366733466934,-0.16633266533066132,-0.16432865731462926,-0.1623246492985972,-0.16032064128256512,-0.15831663326653306,-0.156312625250501,-0.15430861723446893,-0.1523046092184369,-0.15030060120240482,-0.14829659318637275,-0.1462925851703407,-0.14428857715430862,-0.14228456913827656,-0.1402805611222445,-0.13827655310621242,-0.13627254509018036,-0.1342685370741483,-0.13226452905811623,-0.13026052104208416,-0.1282565130260521,-0.12625250501002003,-0.12424849699398798,-0.12224448897795591,-0.12024048096192384,-0.11823647294589178,-0.11623246492985972,-0.11422845691382766,-0.11222444889779559,-0.11022044088176353,-0.10821643286573146,-0.1062124248496994,-0.10420841683366733,-0.10220440881763528,-0.10020040080160321,-0.09819639278557114,-0.09619238476953908,-0.09418837675350701,-0.09218436873747494,-0.09018036072144289,-0.08817635270541083,-0.08617234468937876,-0.0841683366733467,-0.08216432865731463,-0.08016032064128256,-0.0781563126252505,-0.07615230460921844,-0.07414829659318638,-0.07214428857715431,-0.07014028056112225,-0.06813627254509018,-0.06613226452905811,-0.06412825651302605,-0.06212424849699399,-0.06012024048096192,-0.05811623246492986,-0.056112224448897796,-0.05410821643286573,-0.052104208416833664,-0.050100200400801605,-0.04809619238476954,-0.04609218436873747,-0.04408817635270541,-0.04208416833667335,-0.04008016032064128,-0.03807615230460922,-0.036072144288577156,-0.03406813627254509,-0.03206412825651302,-0.03006012024048096,-0.028056112224448898,-0.026052104208416832,-0.02404809619238477,-0.022044088176352707,-0.02004008016032064,-0.018036072144288578,-0.01603206412825651,-0.014028056112224449,-0.012024048096192385,-0.01002004008016032,-0.008016032064128256,-0.006012024048096192,-0.004008016032064128,-0.002004008016032064,0.0]}

},{}],29:[function(require,module,exports){
module.exports={"expected":[-9.99994610111476e-41,-9.979907533074915e-41,-9.95986896503507e-41,-9.939830396995225e-41,-9.91979182895538e-41,-9.899753260915535e-41,-9.87971469287569e-41,-9.859676124835845e-41,-9.839637556796e-41,-9.819598988756156e-41,-9.79956042071631e-41,-9.779521852676466e-41,-9.75948328463662e-41,-9.739444716596776e-41,-9.719406148556931e-41,-9.699367580517086e-41,-9.679329012477241e-41,-9.659290444437397e-41,-9.639251876397552e-41,-9.619213308357707e-41,-9.599174740317862e-41,-9.579136172278017e-41,-9.559097604238172e-41,-9.539059036198327e-41,-9.519020468158482e-41,-9.498981900118637e-41,-9.478943332078793e-41,-9.458904764038948e-41,-9.438866195999103e-41,-9.418827627959258e-41,-9.398789059919413e-41,-9.378750491879568e-41,-9.358711923839723e-41,-9.338673355799878e-41,-9.318634787760034e-41,-9.298596219720189e-41,-9.278557651680344e-41,-9.258519083640499e-41,-9.238480515600654e-41,-9.21844194756081e-41,-9.198403379520964e-41,-9.178364811481119e-41,-9.158326243441274e-41,-9.13828767540143e-41,-9.118249107361585e-41,-9.09821053932174e-41,-9.078171971281895e-41,-9.05813340324205e-41,-9.038094835202205e-41,-9.01805626716236e-41,-8.998017699122515e-41,-8.97797913108267e-41,-8.957940563042826e-41,-8.937901995002981e-41,-8.917863426963136e-41,-8.897824858923291e-41,-8.877786290883446e-41,-8.857747722843601e-41,-8.837709154803756e-41,-8.817670586763911e-41,-8.797632018724067e-41,-8.777593450684222e-41,-8.757554882644377e-41,-8.737516314604532e-41,-8.717477746564687e-41,-8.697439178524842e-41,-8.677400610484997e-41,-8.657362042445152e-41,-8.637323474405307e-41,-8.617284906365463e-41,-8.597246338325618e-41,-8.577207770285773e-41,-8.557169202245928e-41,-8.537130634206083e-41,-8.517092066166238e-41,-8.497053498126393e-41,-8.477014930086548e-41,-8.456976362046704e-41,-8.436937794006859e-41,-8.416899225967014e-41,-8.396860657927169e-41,-8.376822089887324e-41,-8.356783521847479e-41,-8.336744953807634e-41,-8.316706385767789e-41,-8.296667817727944e-41,-8.2766292496881e-41,-8.256590681648255e-41,-8.23655211360841e-41,-8.216513545568565e-41,-8.19647497752872e-41,-8.176436409488875e-41,-8.15639784144903e-41,-8.136359273409185e-41,-8.11632070536934e-41,-8.096142007483063e-41,-8.076103439443218e-41,-8.056064871403373e-41,-8.036026303363528e-41,-8.015987735323684e-41,-7.995949167283839e-41,-7.975910599243994e-41,-7.955872031204149e-41,-7.935833463164304e-41,-7.915794895124459e-41,-7.895756327084614e-41,-7.875717759044769e-41,-7.855679191004924e-41,-7.83564062296508e-41,-7.815602054925235e-41,-7.79556348688539e-41,-7.775524918845545e-41,-7.7554863508057e-41,-7.735447782765855e-41,-7.71540921472601e-41,-7.695370646686165e-41,-7.675332078646321e-41,-7.655293510606476e-41,-7.635254942566631e-41,-7.615216374526786e-41,-7.595177806486941e-41,-7.575139238447096e-41,-7.555100670407251e-41,-7.535062102367406e-41,-7.515023534327561e-41,-7.494984966287717e-41,-7.474946398247872e-41,-7.454907830208027e-41,-7.434869262168182e-41,-7.414830694128337e-41,-7.394792126088492e-41,-7.374753558048647e-41,-7.354714990008802e-41,-7.334676421968958e-41,-7.314637853929113e-41,-7.294599285889268e-41,-7.274560717849423e-41,-7.254522149809578e-41,-7.234483581769733e-41,-7.214445013729888e-41,-7.194406445690043e-41,-7.174367877650198e-41,-7.154329309610354e-41,-7.134290741570509e-41,-7.114252173530664e-41,-7.094213605490819e-41,-7.074175037450974e-41,-7.054136469411129e-41,-7.034097901371284e-41,-7.014059333331439e-41,-6.994020765291594e-41,-6.97398219725175e-41,-6.953943629211905e-41,-6.93390506117206e-41,-6.913866493132215e-41,-6.89382792509237e-41,-6.873789357052525e-41,-6.85375078901268e-41,-6.833712220972835e-41,-6.813673652932991e-41,-6.793635084893146e-41,-6.773596516853301e-41,-6.753557948813456e-41,-6.733519380773611e-41,-6.713480812733766e-41,-6.693442244693921e-41,-6.673403676654076e-41,-6.653365108614231e-41,-6.633326540574387e-41,-6.613287972534542e-41,-6.593249404494697e-41,-6.573210836454852e-41,-6.553172268415007e-41,-6.533133700375162e-41,-6.513095132335317e-41,-6.493056564295472e-41,-6.473017996255627e-41,-6.452979428215783e-41,-6.432940860175938e-41,-6.412902292136093e-41,-6.392863724096248e-41,-6.372825156056403e-41,-6.352786588016558e-41,-6.332748019976713e-41,-6.312709451936868e-41,-6.292670883897024e-41,-6.272632315857179e-41,-6.252593747817334e-41,-6.232555179777489e-41,-6.212516611737644e-41,-6.192478043697799e-41,-6.172439475657954e-41,-6.152400907618109e-41,-6.132362339578264e-41,-6.11232377153842e-41,-6.092285203498575e-41,-6.07224663545873e-41,-6.052208067418885e-41,-6.03216949937904e-41,-6.012130931339195e-41,-5.99209236329935e-41,-5.972053795259505e-41,-5.951875097373228e-41,-5.931836529333383e-41,-5.911797961293538e-41,-5.891759393253693e-41,-5.871720825213848e-41,-5.851682257174004e-41,-5.831643689134159e-41,-5.811605121094314e-41,-5.791566553054469e-41,-5.771527985014624e-41,-5.751489416974779e-41,-5.731450848934934e-41,-5.711412280895089e-41,-5.691373712855245e-41,-5.6713351448154e-41,-5.651296576775555e-41,-5.63125800873571e-41,-5.611219440695865e-41,-5.59118087265602e-41,-5.571142304616175e-41,-5.55110373657633e-41,-5.531065168536485e-41,-5.511026600496641e-41,-5.490988032456796e-41,-5.470949464416951e-41,-5.450910896377106e-41,-5.430872328337261e-41,-5.410833760297416e-41,-5.390795192257571e-41,-5.370756624217726e-41,-5.350718056177882e-41,-5.330679488138037e-41,-5.310640920098192e-41,-5.290602352058347e-41,-5.270563784018502e-41,-5.250525215978657e-41,-5.230486647938812e-41,-5.210448079898967e-41,-5.190409511859122e-41,-5.170370943819278e-41,-5.150332375779433e-41,-5.130293807739588e-41,-5.110255239699743e-41,-5.090216671659898e-41,-5.070178103620053e-41,-5.050139535580208e-41,-5.030100967540363e-41,-5.010062399500518e-41,-4.990023831460674e-41,-4.969985263420829e-41,-4.949946695380984e-41,-4.929908127341139e-41,-4.909869559301294e-41,-4.889830991261449e-41,-4.869792423221604e-41,-4.849753855181759e-41,-4.829715287141915e-41,-4.80967671910207e-41,-4.789638151062225e-41,-4.76959958302238e-41,-4.749561014982535e-41,-4.72952244694269e-41,-4.709483878902845e-41,-4.689445310863e-41,-4.669406742823155e-41,-4.649368174783311e-41,-4.629329606743466e-41,-4.609291038703621e-41,-4.589252470663776e-41,-4.569213902623931e-41,-4.549175334584086e-41,-4.5291367665442413e-41,-4.5090981985043964e-41,-4.4890596304645515e-41,-4.4690210624247066e-41,-4.4489824943848617e-41,-4.428943926345017e-41,-4.408905358305172e-41,-4.388866790265327e-41,-4.368828222225482e-41,-4.3487896541856373e-41,-4.3287510861457924e-41,-4.3087125181059475e-41,-4.2886739500661026e-41,-4.268635382026258e-41,-4.248596813986413e-41,-4.228558245946568e-41,-4.208519677906723e-41,-4.188481109866878e-41,-4.1684425418270333e-41,-4.1484039737871885e-41,-4.1283654057473436e-41,-4.1083268377074987e-41,-4.088288269667654e-41,-4.068249701627809e-41,-4.048211133587964e-41,-4.028172565548119e-41,-4.0081339975082743e-41,-3.9880954294684294e-41,-3.9680568614285845e-41,-3.9480182933887396e-41,-3.9279797253488947e-41,-3.90794115730905e-41,-3.887902589269205e-41,-3.86786402122936e-41,-3.847825453189515e-41,-3.8277868851496703e-41,-3.807608187263393e-41,-3.787569619223548e-41,-3.767531051183703e-41,-3.7474924831438583e-41,-3.7274539151040134e-41,-3.7074153470641685e-41,-3.6873767790243236e-41,-3.667338210984479e-41,-3.647299642944634e-41,-3.627261074904789e-41,-3.607222506864944e-41,-3.587183938825099e-41,-3.5671453707852543e-41,-3.5471068027454095e-41,-3.5270682347055646e-41,-3.5070296666657197e-41,-3.486991098625875e-41,-3.46695253058603e-41,-3.446913962546185e-41,-3.42687539450634e-41,-3.4068368264664953e-41,-3.3867982584266504e-41,-3.3667596903868055e-41,-3.3467211223469606e-41,-3.3266825543071157e-41,-3.306643986267271e-41,-3.286605418227426e-41,-3.266566850187581e-41,-3.246528282147736e-41,-3.2264897141078913e-41,-3.2064511460680464e-41,-3.1864125780282015e-41,-3.1663740099883567e-41,-3.146335441948512e-41,-3.126296873908667e-41,-3.106258305868822e-41,-3.086219737828977e-41,-3.066181169789132e-41,-3.0461426017492873e-41,-3.0261040337094425e-41,-3.0060654656695976e-41,-2.9860268976297527e-41,-2.965988329589908e-41,-2.945949761550063e-41,-2.925911193510218e-41,-2.905872625470373e-41,-2.8858340574305283e-41,-2.8657954893906834e-41,-2.8457569213508385e-41,-2.8257183533109936e-41,-2.8056797852711487e-41,-2.785641217231304e-41,-2.765602649191459e-41,-2.745564081151614e-41,-2.725525513111769e-41,-2.7054869450719243e-41,-2.6854483770320794e-41,-2.6654098089922346e-41,-2.6453712409523897e-41,-2.625332672912545e-41,-2.6052941048727e-41,-2.585255536832855e-41,-2.56521696879301e-41,-2.545178400753165e-41,-2.5251398327133204e-41,-2.5051012646734755e-41,-2.4850626966336306e-41,-2.4650241285937857e-41,-2.444985560553941e-41,-2.424946992514096e-41,-2.404908424474251e-41,-2.384869856434406e-41,-2.3648312883945613e-41,-2.3447927203547164e-41,-2.3247541523148715e-41,-2.3047155842750266e-41,-2.2846770162351818e-41,-2.2646384481953369e-41,-2.244599880155492e-41,-2.224561312115647e-41,-2.2045227440758022e-41,-2.1844841760359573e-41,-2.1644456079961124e-41,-2.1444070399562676e-41,-2.1243684719164227e-41,-2.1043299038765778e-41,-2.084291335836733e-41,-2.064252767796888e-41,-2.0442141997570431e-41,-2.0241756317171983e-41,-2.0041370636773534e-41,-1.9840984956375085e-41,-1.9640599275976636e-41,-1.9440213595578187e-41,-1.9239827915179738e-41,-1.903944223478129e-41,-1.883905655438284e-41,-1.8638670873984392e-41,-1.8438285193585943e-41,-1.8237899513187494e-41,-1.8037513832789045e-41,-1.7837128152390596e-41,-1.7636742471992148e-41,-1.74363567915937e-41,-1.723597111119525e-41,-1.70355854307968e-41,-1.6833798451934027e-41,-1.6633412771535579e-41,-1.643302709113713e-41,-1.623264141073868e-41,-1.6032255730340232e-41,-1.5831870049941783e-41,-1.5631484369543334e-41,-1.5431098689144886e-41,-1.5230713008746437e-41,-1.5030327328347988e-41,-1.482994164794954e-41,-1.462955596755109e-41,-1.4429170287152641e-41,-1.4228784606754193e-41,-1.4028398926355744e-41,-1.3828013245957295e-41,-1.3627627565558846e-41,-1.3427241885160397e-41,-1.3226856204761948e-41,-1.30264705243635e-41,-1.282608484396505e-41,-1.2625699163566602e-41,-1.2425313483168153e-41,-1.2224927802769704e-41,-1.2024542122371255e-41,-1.1824156441972806e-41,-1.1623770761574358e-41,-1.1423385081175909e-41,-1.122299940077746e-41,-1.1022613720379011e-41,-1.0822228039980562e-41,-1.0621842359582113e-41,-1.0421456679183665e-41,-1.0221070998785216e-41,-1.0020685318386767e-41,-9.820299637988318e-42,-9.619913957589869e-42,-9.41952827719142e-42,-9.219142596792972e-42,-9.018756916394523e-42,-8.818371235996074e-42,-8.617985555597625e-42,-8.417599875199176e-42,-8.217214194800727e-42,-8.016828514402278e-42,-7.81644283400383e-42,-7.616057153605381e-42,-7.415671473206932e-42,-7.215285792808483e-42,-7.014900112410034e-42,-6.814514432011585e-42,-6.614128751613137e-42,-6.413743071214688e-42,-6.213357390816239e-42,-6.01297171041779e-42,-5.812586030019341e-42,-5.6122003496208924e-42,-5.4118146692224435e-42,-5.211428988823995e-42,-5.011043308425546e-42,-4.810657628027097e-42,-4.610271947628648e-42,-4.4098862672301993e-42,-4.2095005868317505e-42,-4.0091149064333016e-42,-3.808729226034853e-42,-3.608343545636404e-42,-3.407957865237955e-42,-3.207572184839506e-42,-3.0071865044410574e-42,-2.8068008240426086e-42,-2.6064151436441598e-42,-2.406029463245711e-42,-2.205643782847262e-42,-2.0052581024488132e-42,-1.8048724220503644e-42,-1.6044867416519155e-42,-1.4041010612534667e-42,-1.2037153808550179e-42,-1.003329700456569e-42,-8.029440200581202e-43,-6.0255833965967134e-43,-4.021726592612225e-43,-2.0178697886277366e-43,-1.401298464324817e-45],"x":[-1.0e-40,-9.97996012024048e-41,-9.959920240480963e-41,-9.939880360721443e-41,-9.919840480961923e-41,-9.899800601202407e-41,-9.879760721442887e-41,-9.859720841683367e-41,-9.839680961923847e-41,-9.819641082164329e-41,-9.799601202404809e-41,-9.77956132264529e-41,-9.759521442885772e-41,-9.739481563126252e-41,-9.719441683366732e-41,-9.699401803607214e-41,-9.679361923847696e-41,-9.659322044088176e-41,-9.639282164328656e-41,-9.619242284569138e-41,-9.599202404809618e-41,-9.5791625250501e-41,-9.559122645290582e-41,-9.539082765531062e-41,-9.519042885771542e-41,-9.499003006012023e-41,-9.478963126252505e-41,-9.458923246492985e-41,-9.438883366733467e-41,-9.418843486973947e-41,-9.39880360721443e-41,-9.37876372745491e-41,-9.35872384769539e-41,-9.33868396793587e-41,-9.318644088176353e-41,-9.298604208416833e-41,-9.278564328657315e-41,-9.258524448897797e-41,-9.238484569138277e-41,-9.218444689378756e-41,-9.198404809619238e-41,-9.178364929859718e-41,-9.1583250501002e-41,-9.138285170340681e-41,-9.118245290581162e-41,-9.098205410821643e-41,-9.078165531062124e-41,-9.058125651302605e-41,-9.038085771543086e-41,-9.018045891783567e-41,-8.998006012024048e-41,-8.977966132264529e-41,-8.957926252505009e-41,-8.93788637274549e-41,-8.917846492985971e-41,-8.897806613226452e-41,-8.877766733466933e-41,-8.857726853707414e-41,-8.837686973947895e-41,-8.817647094188376e-41,-8.797607214428857e-41,-8.777567334669338e-41,-8.757527454909819e-41,-8.7374875751503e-41,-8.717447695390781e-41,-8.697407815631262e-41,-8.677367935871742e-41,-8.657328056112223e-41,-8.637288176352705e-41,-8.617248296593186e-41,-8.597208416833667e-41,-8.577168537074148e-41,-8.557128657314629e-41,-8.53708877755511e-41,-8.517048897795591e-41,-8.497009018036072e-41,-8.476969138276553e-41,-8.456929258517034e-41,-8.436889378757515e-41,-8.416849498997995e-41,-8.396809619238476e-41,-8.376769739478957e-41,-8.356729859719438e-41,-8.336689979959919e-41,-8.3166501002004e-41,-8.296610220440881e-41,-8.276570340681362e-41,-8.256530460921843e-41,-8.236490581162324e-41,-8.216450701402805e-41,-8.196410821643286e-41,-8.176370941883767e-41,-8.156331062124248e-41,-8.136291182364728e-41,-8.116251302605209e-41,-8.096211422845691e-41,-8.076171543086172e-41,-8.056131663326653e-41,-8.036091783567134e-41,-8.016051903807615e-41,-7.996012024048096e-41,-7.975972144288577e-41,-7.955932264529058e-41,-7.935892384769539e-41,-7.91585250501002e-41,-7.895812625250501e-41,-7.87577274549098e-41,-7.855732865731462e-41,-7.835692985971943e-41,-7.815653106212424e-41,-7.795613226452905e-41,-7.775573346693386e-41,-7.755533466933867e-41,-7.735493587174348e-41,-7.715453707414829e-41,-7.69541382765531e-41,-7.675373947895791e-41,-7.655334068136272e-41,-7.635294188376753e-41,-7.615254308617234e-41,-7.595214428857714e-41,-7.575174549098196e-41,-7.555134669338677e-41,-7.535094789579158e-41,-7.515054909819639e-41,-7.49501503006012e-41,-7.474975150300601e-41,-7.454935270541082e-41,-7.434895390781563e-41,-7.414855511022043e-41,-7.394815631262525e-41,-7.374775751503006e-41,-7.354735871743487e-41,-7.334695991983968e-41,-7.314656112224448e-41,-7.294616232464929e-41,-7.27457635270541e-41,-7.254536472945891e-41,-7.234496593186372e-41,-7.214456713426853e-41,-7.194416833667334e-41,-7.174376953907815e-41,-7.154337074148296e-41,-7.134297194388777e-41,-7.114257314629258e-41,-7.094217434869739e-41,-7.07417755511022e-41,-7.054137675350699e-41,-7.034097795591182e-41,-7.014057915831663e-41,-6.994018036072144e-41,-6.973978156312625e-41,-6.953938276553105e-41,-6.933898396793587e-41,-6.913858517034068e-41,-6.893818637274549e-41,-6.87377875751503e-41,-6.85373887775551e-41,-6.833698997995992e-41,-6.813659118236473e-41,-6.793619238476954e-41,-6.773579358717434e-41,-6.753539478957915e-41,-6.733499599198396e-41,-6.713459719438877e-41,-6.693419839679358e-41,-6.673379959919839e-41,-6.65334008016032e-41,-6.633300200400801e-41,-6.613260320641282e-41,-6.593220440881762e-41,-6.573180561122244e-41,-6.553140681362725e-41,-6.533100801603207e-41,-6.513060921843688e-41,-6.493021042084167e-41,-6.472981162324649e-41,-6.45294128256513e-41,-6.432901402805611e-41,-6.412861523046092e-41,-6.392821643286572e-41,-6.372781763527054e-41,-6.352741883767535e-41,-6.332702004008016e-41,-6.312662124248497e-41,-6.292622244488978e-41,-6.272582364729459e-41,-6.25254248496994e-41,-6.23250260521042e-41,-6.212462725450901e-41,-6.192422845691382e-41,-6.172382965931863e-41,-6.152343086172344e-41,-6.132303206412824e-41,-6.112263326653306e-41,-6.092223446893787e-41,-6.072183567134268e-41,-6.052143687374749e-41,-6.032103807615229e-41,-6.012063927855711e-41,-5.992024048096193e-41,-5.971984168336674e-41,-5.951944288577154e-41,-5.931904408817634e-41,-5.911864529058116e-41,-5.891824649298597e-41,-5.871784769539078e-41,-5.851744889779559e-41,-5.83170501002004e-41,-5.811665130260521e-41,-5.791625250501002e-41,-5.771585370741483e-41,-5.751545490981964e-41,-5.731505611222445e-41,-5.711465731462926e-41,-5.691425851703406e-41,-5.671385971943886e-41,-5.651346092184368e-41,-5.631306212424849e-41,-5.61126633266533e-41,-5.591226452905811e-41,-5.571186573146291e-41,-5.551146693386773e-41,-5.531106813627254e-41,-5.511066933867735e-41,-5.491027054108216e-41,-5.470987174348696e-41,-5.450947294589179e-41,-5.43090741482966e-41,-5.41086753507014e-41,-5.390827655310621e-41,-5.370787775551102e-41,-5.350747895791583e-41,-5.330708016032064e-41,-5.310668136272544e-41,-5.290628256513026e-41,-5.270588376753507e-41,-5.250548496993988e-41,-5.230508617234469e-41,-5.210468737474949e-41,-5.190428857715431e-41,-5.170388977955912e-41,-5.150349098196392e-41,-5.130309218436873e-41,-5.110269338677353e-41,-5.090229458917835e-41,-5.070189579158316e-41,-5.050149699398797e-41,-5.030109819639278e-41,-5.010069939879758e-41,-4.99003006012024e-41,-4.969990180360721e-41,-4.949950300601203e-41,-4.929910420841684e-41,-4.909870541082164e-41,-4.889830661322646e-41,-4.869790781563126e-41,-4.849750901803606e-41,-4.829711022044088e-41,-4.809671142284569e-41,-4.78963126252505e-41,-4.769591382765531e-41,-4.749551503006011e-41,-4.729511623246493e-41,-4.709471743486973e-41,-4.689431863727454e-41,-4.669391983967936e-41,-4.649352104208417e-41,-4.629312224448898e-41,-4.609272344689379e-41,-4.589232464929859e-41,-4.5691925851703404e-41,-4.549152705410822e-41,-4.529112825651302e-41,-4.509072945891783e-41,-4.4890330661322646e-41,-4.4689931863727455e-41,-4.4489533066132264e-41,-4.428913426853707e-41,-4.408873547094188e-41,-4.388833667334669e-41,-4.36879378757515e-41,-4.3487539078156305e-41,-4.3287140280561115e-41,-4.3086741482965924e-41,-4.2886342685370743e-41,-4.2685943887775553e-41,-4.2485545090180357e-41,-4.2285146292585166e-41,-4.208474749498998e-41,-4.188434869739479e-41,-4.16839498997996e-41,-4.1483551102204403e-41,-4.128315230460921e-41,-4.1082753507014027e-41,-4.0882354709418836e-41,-4.068195591182364e-41,-4.048155711422845e-41,-4.028115831663327e-41,-4.008075951903808e-41,-3.9880360721442887e-41,-3.967996192384769e-41,-3.94795631262525e-41,-3.9279164328657315e-41,-3.9078765531062124e-41,-3.887836673346693e-41,-3.867796793587174e-41,-3.8477569138276547e-41,-3.827717034068136e-41,-3.807677154308617e-41,-3.7876372745490975e-41,-3.7675973947895784e-41,-3.7475575150300603e-41,-3.7275176352705413e-41,-3.7074777555110217e-41,-3.6874378757515026e-41,-3.6673979959919835e-41,-3.647358116232465e-41,-3.627318236472946e-41,-3.6072783567134263e-41,-3.587238476953907e-41,-3.567198597194388e-41,-3.5471587174348696e-41,-3.52711883767535e-41,-3.507078957915831e-41,-3.4870390781563124e-41,-3.466999198396794e-41,-3.4469593186372747e-41,-3.426919438877755e-41,-3.406879559118236e-41,-3.386839679358717e-41,-3.3667997995991984e-41,-3.3467599198396794e-41,-3.32672004008016e-41,-3.3066801603206407e-41,-3.286640280561122e-41,-3.266600400801603e-41,-3.2465605210420835e-41,-3.226520641282565e-41,-3.206480761523046e-41,-3.1864408817635273e-41,-3.166401002004008e-41,-3.1463611222444886e-41,-3.1263212424849696e-41,-3.1062813627254505e-41,-3.086241482965932e-41,-3.0662016032064123e-41,-3.0461617234468933e-41,-3.026121843687374e-41,-3.0060819639278556e-41,-2.9860420841683365e-41,-2.9660022044088175e-41,-2.9459623246492984e-41,-2.9259224448897793e-41,-2.905882565130261e-41,-2.8858426853707417e-41,-2.865802805611222e-41,-2.845762925851703e-41,-2.825723046092184e-41,-2.8056831663326654e-41,-2.785643286573146e-41,-2.7656034068136267e-41,-2.7455635270541077e-41,-2.725523647294589e-41,-2.7054837675350705e-41,-2.685443887775551e-41,-2.665404008016032e-41,-2.645364128256513e-41,-2.625324248496994e-41,-2.6052843687374746e-41,-2.5852444889779556e-41,-2.5652046092184365e-41,-2.545164729458918e-41,-2.525124849699399e-41,-2.5050849699398793e-41,-2.48504509018036e-41,-2.465005210420841e-41,-2.444965330661323e-41,-2.4249254509018035e-41,-2.4048855711422844e-41,-2.3848456913827653e-41,-2.3648058116232463e-41,-2.344765931863727e-41,-2.324726052104208e-41,-2.304686172344689e-41,-2.2846462925851702e-41,-2.264606412825651e-41,-2.2445665330661323e-41,-2.2245266533066133e-41,-2.204486773547094e-41,-2.184446893787575e-41,-2.1644070140280558e-41,-2.144367134268537e-41,-2.1243272545090176e-41,-2.104287374749499e-41,-2.08424749498998e-41,-2.0642076152304607e-41,-2.0441677354709418e-41,-2.0241278557114225e-41,-2.0040879759519037e-41,-1.9840480961923846e-41,-1.9640082164328658e-41,-1.9439683366733465e-41,-1.9239284569138274e-41,-1.9038885771543086e-41,-1.8838486973947892e-41,-1.8638088176352704e-41,-1.8437689378757514e-41,-1.8237290581162325e-41,-1.8036891783567132e-41,-1.7836492985971944e-41,-1.763609418837675e-41,-1.743569539078156e-41,-1.7235296593186374e-41,-1.703489779559118e-41,-1.6834498997995993e-41,-1.66341002004008e-41,-1.643370140280561e-41,-1.6233302605210418e-41,-1.6032903807615227e-41,-1.5832505010020041e-41,-1.5632106212424848e-41,-1.543170741482966e-41,-1.5231308617234467e-41,-1.5030909819639279e-41,-1.4830511022044085e-41,-1.4630112224448897e-41,-1.442971342685371e-41,-1.4229314629258516e-41,-1.4028915831663327e-41,-1.3828517034068134e-41,-1.3628118236472946e-41,-1.3427719438877753e-41,-1.3227320641282564e-41,-1.3026921843687374e-41,-1.2826523046092183e-41,-1.2626124248496995e-41,-1.2425725450901801e-41,-1.2225326653306613e-41,-1.202492785571142e-41,-1.1824529058116232e-41,-1.162413026052104e-41,-1.1423731462925852e-41,-1.1223332665330661e-41,-1.102293386773547e-41,-1.0822535070140279e-41,-1.0622136272545089e-41,-1.0421737474949899e-41,-1.022133867735471e-41,-1.0020939879759519e-41,-9.820541082164328e-42,-9.620142284569139e-42,-9.419743486973947e-42,-9.219344689378756e-42,-9.018945891783566e-42,-8.818547094188376e-42,-8.618148296593186e-42,-8.417749498997995e-42,-8.217350701402806e-42,-8.016951903807614e-42,-7.816553106212423e-42,-7.616154308617234e-42,-7.415755511022043e-42,-7.215356713426854e-42,-7.014957915831664e-42,-6.814559118236473e-42,-6.614160320641283e-42,-6.413761523046092e-42,-6.213362725450901e-42,-6.01296392785571e-42,-5.812565130260521e-42,-5.61216633266533e-42,-5.4117675350701394e-42,-5.21136873747495e-42,-5.010969939879759e-42,-4.810571142284569e-42,-4.610172344689378e-42,-4.4097735470941876e-42,-4.209374749498998e-42,-4.0089759519038074e-42,-3.8085771543086167e-42,-3.608178356713427e-42,-3.4077795591182365e-42,-3.207380761523046e-42,-3.006981963927855e-42,-2.8065831663326652e-42,-2.6061843687374748e-42,-2.4057855711422843e-42,-2.205386773547094e-42,-2.0049879759519038e-42,-1.8045891783567134e-42,-1.604190380761523e-42,-1.4037915831663325e-42,-1.2033927855711421e-42,-1.0029939879759519e-42,-8.025951903807614e-43,-6.021963927855712e-43,-4.0179759519038074e-43,-2.0139879759519036e-43,-1.0e-45]}

},{}],30:[function(require,module,exports){
module.exports={"expected":[-4.999999675228202e-39,-2.004013074995568e-33,-4.008021007203351e-33,-6.012029123082126e-33,-8.016036871618917e-33,-1.0020045354839677e-32,-1.2024053103376468e-32,-1.4028061586597228e-32,-1.6032069335134018e-32,-1.803607708367081e-32,-2.00400848322076e-32,-2.204409258074439e-32,-2.404810179864912e-32,-2.605210807781797e-32,-2.80561172957227e-32,-3.006012651362743e-32,-3.206413279279628e-32,-3.406814201070101e-32,-3.6072148289869864e-32,-3.8076157507774593e-32,-4.0080163786943446e-32,-4.2084173004848175e-32,-4.4088182222752904e-32,-4.6092188501921756e-32,-4.8096197719826485e-32,-5.010020399899534e-32,-5.210421027816419e-32,-5.41082224348048e-32,-5.611222871397365e-32,-5.81162349931425e-32,-6.012024714978311e-32,-6.212425342895196e-32,-6.412825970812081e-32,-6.613227186476142e-32,-6.813627814393027e-32,-7.014028442309912e-32,-7.214429070226797e-32,-7.414830285890858e-32,-7.615230913807743e-32,-7.815631541724628e-32,-8.016032757388689e-32,-8.216433385305574e-32,-8.41683401322246e-32,-8.617234641139345e-32,-8.817635856803405e-32,-9.018036484720291e-32,-9.218437112637176e-32,-9.418838328301236e-32,-9.619238956218122e-32,-9.819639584135007e-32,-1.0020040799799068e-31,-1.0220441427715953e-31,-1.0420842055632838e-31,-1.0621242683549723e-31,-1.0821643311466608e-31,-1.1022045114877844e-31,-1.122244574279473e-31,-1.1422846370711615e-31,-1.16232469986285e-31,-1.1823647626545385e-31,-1.202404825446227e-31,-1.2224448882379156e-31,-1.2424850685790392e-31,-1.2625251313707277e-31,-1.2825651941624162e-31,-1.3026052569541047e-31,-1.3226453197457933e-31,-1.3426853825374818e-31,-1.3627254453291703e-31,-1.382765625670294e-31,-1.4028056884619824e-31,-1.422845751253671e-31,-1.4428858140453595e-31,-1.462925876837048e-31,-1.4829659396287365e-31,-1.503006002420425e-31,-1.5230461827615487e-31,-1.5430862455532372e-31,-1.5631263083449257e-31,-1.5831663711366142e-31,-1.6032064339283027e-31,-1.6232464967199913e-31,-1.6432865595116798e-31,-1.6633267398528034e-31,-1.683366802644492e-31,-1.7034068654361804e-31,-1.723446928227869e-31,-1.7434869910195575e-31,-1.763527053811246e-31,-1.7835671166029345e-31,-1.8036072969440581e-31,-1.8236473597357466e-31,-1.8436874225274352e-31,-1.8637274853191237e-31,-1.8837675481108122e-31,-1.9038076109025007e-31,-1.9238477912436243e-31,-1.9438878540353129e-31,-1.9639279168270014e-31,-1.983967862069255e-31,-2.0040081599598135e-31,-2.024048222751502e-31,-2.0440882855431905e-31,-2.064128348334879e-31,-2.0841684111265676e-31,-2.104208473918256e-31,-2.1242485367099446e-31,-2.144288599501633e-31,-2.1643286622933217e-31,-2.18436872508501e-31,-2.2044087878766987e-31,-2.2244488506683872e-31,-2.2444889134600758e-31,-2.2645292113506345e-31,-2.284569274142323e-31,-2.3046093369340115e-31,-2.3246493997257e-31,-2.3446894625173885e-31,-2.364729525309077e-31,-2.3847695881007656e-31,-2.404809650892454e-31,-2.4248497136841426e-31,-2.444889776475831e-31,-2.4649298392675197e-31,-2.484969902059208e-31,-2.5050099648508967e-31,-2.5250500276425852e-31,-2.545090325533144e-31,-2.5651303883248324e-31,-2.585170451116521e-31,-2.6052105139082095e-31,-2.625250576699898e-31,-2.6452906394915865e-31,-2.665330702283275e-31,-2.6853707650749636e-31,-2.705410827866652e-31,-2.7254508906583406e-31,-2.745490953450029e-31,-2.7655310162417177e-31,-2.785571079033406e-31,-2.8056111418250947e-31,-2.8256514397156534e-31,-2.845691502507342e-31,-2.8657315652990304e-31,-2.885771628090719e-31,-2.9058116908824075e-31,-2.925851753674096e-31,-2.9458918164657845e-31,-2.965931879257473e-31,-2.9859719420491616e-31,-3.00601200484085e-31,-3.0260520676325386e-31,-3.046092130424227e-31,-3.0661321932159157e-31,-3.0861724911064743e-31,-3.106212553898163e-31,-3.1262526166898514e-31,-3.14629267948154e-31,-3.1663327422732284e-31,-3.186372805064917e-31,-3.2064128678566055e-31,-3.226452930648294e-31,-3.2464929934399825e-31,-3.266533056231671e-31,-3.2865731190233596e-31,-3.306613181815048e-31,-3.3266532446067366e-31,-3.346693307398425e-31,-3.366733605288984e-31,-3.3867736680806723e-31,-3.406813730872361e-31,-3.4268537936640494e-31,-3.446893856455738e-31,-3.4669339192474264e-31,-3.486973982039115e-31,-3.5070140448308035e-31,-3.527054107622492e-31,-3.5470941704141805e-31,-3.567134233205869e-31,-3.5871742959975576e-31,-3.607214358789246e-31,-3.6272546566798048e-31,-3.6472947194714933e-31,-3.667334782263182e-31,-3.6873748450548703e-31,-3.707414907846559e-31,-3.7274549706382474e-31,-3.747495033429936e-31,-3.7675350962216244e-31,-3.787575159013313e-31,-3.8076152218050015e-31,-3.82765528459669e-31,-3.8476953473883785e-31,-3.867735410180067e-31,-3.8877754729717555e-31,-3.9078157708623142e-31,-3.9278558336540028e-31,-3.947895896445691e-31,-3.96793572413851e-31,-3.987976022029068e-31,-4.008015849721887e-31,-4.028056147612445e-31,-4.048096445503004e-31,-4.068136273195822e-31,-4.088176571086381e-31,-4.1082163987791995e-31,-4.128256696669758e-31,-4.1482965243625765e-31,-4.168336822253135e-31,-4.1883766499459535e-31,-4.208416947836512e-31,-4.228456775529331e-31,-4.248497073419889e-31,-4.268536901112708e-31,-4.288577199003266e-31,-4.308617496893825e-31,-4.328657324586643e-31,-4.348697622477202e-31,-4.36873745017002e-31,-4.388777748060579e-31,-4.4088175757533974e-31,-4.428857873643956e-31,-4.4488977013367745e-31,-4.468937999227333e-31,-4.4889778269201515e-31,-4.50901812481071e-31,-4.529057952503529e-31,-4.549098250394087e-31,-4.569138078086906e-31,-4.589178375977464e-31,-4.609218673868023e-31,-4.629258501560841e-31,-4.6492987994514e-31,-4.669338627144218e-31,-4.689378925034777e-31,-4.7094187527275954e-31,-4.729459050618154e-31,-4.7494988783109725e-31,-4.769539176201531e-31,-4.7895790038943495e-31,-4.809619301784908e-31,-4.829659129477727e-31,-4.849699427368285e-31,-4.869739725258844e-31,-4.889779552951662e-31,-4.909819850842221e-31,-4.929859678535039e-31,-4.949899976425598e-31,-4.969939804118416e-31,-4.989980102008975e-31,-5.010019929701793e-31,-5.030060227592352e-31,-5.0501000552851705e-31,-5.070140353175729e-31,-5.0901801808685475e-31,-5.110220478759106e-31,-5.130260776649665e-31,-5.150300604342483e-31,-5.170340902233042e-31,-5.19038072992586e-31,-5.210421027816419e-31,-5.230460855509237e-31,-5.250501153399796e-31,-5.270540981092614e-31,-5.290581278983173e-31,-5.310621106675991e-31,-5.33066140456655e-31,-5.3507012322593685e-31,-5.370741530149927e-31,-5.3907813578427455e-31,-5.410821655733304e-31,-5.430861953623863e-31,-5.450901781316681e-31,-5.47094207920724e-31,-5.490981906900058e-31,-5.511022204790617e-31,-5.531062032483435e-31,-5.551102330373994e-31,-5.571142158066812e-31,-5.591182455957371e-31,-5.611222283650189e-31,-5.631262581540748e-31,-5.6513024092335665e-31,-5.671342707124125e-31,-5.691383005014684e-31,-5.711422832707502e-31,-5.731463130598061e-31,-5.751502958290879e-31,-5.771543256181438e-31,-5.791583083874256e-31,-5.811623381764815e-31,-5.831663209457633e-31,-5.851703507348192e-31,-5.87174333504101e-31,-5.891783632931569e-31,-5.911823460624387e-31,-5.931863758514946e-31,-5.951904056405505e-31,-5.971943884098323e-31,-5.991984181988882e-31,-6.0120240096817e-31,-6.032064307572259e-31,-6.052104135265077e-31,-6.072144433155636e-31,-6.092184260848454e-31,-6.112224558739013e-31,-6.132264386431831e-31,-6.15230468432239e-31,-6.172344512015208e-31,-6.192384809905767e-31,-6.212424637598585e-31,-6.232464935489144e-31,-6.252505233379703e-31,-6.272545061072521e-31,-6.29258535896308e-31,-6.312625186655898e-31,-6.332665484546457e-31,-6.352705312239275e-31,-6.372745610129834e-31,-6.392785437822652e-31,-6.412825735713211e-31,-6.432865563406029e-31,-6.452905861296588e-31,-6.472945688989406e-31,-6.492985986879965e-31,-6.513026284770524e-31,-6.533066112463342e-31,-6.553106410353901e-31,-6.573146238046719e-31,-6.593186535937278e-31,-6.613226363630096e-31,-6.633266661520655e-31,-6.653306489213473e-31,-6.673346787104032e-31,-6.69338661479685e-31,-6.713426912687409e-31,-6.733466740380227e-31,-6.753507038270786e-31,-6.773547336161345e-31,-6.793587163854163e-31,-6.813627461744722e-31,-6.83366728943754e-31,-6.853707587328099e-31,-6.873747415020917e-31,-6.893787712911476e-31,-6.913827540604294e-31,-6.933867838494853e-31,-6.953907666187671e-31,-6.97394796407823e-31,-6.993987791771048e-31,-7.014028089661607e-31,-7.034067917354425e-31,-7.054108215244984e-31,-7.074148513135543e-31,-7.094188340828361e-31,-7.11422863871892e-31,-7.134268466411738e-31,-7.154308764302297e-31,-7.174348591995115e-31,-7.194388889885674e-31,-7.214428717578492e-31,-7.234469015469051e-31,-7.254508843161869e-31,-7.274549141052428e-31,-7.294588968745246e-31,-7.314629266635805e-31,-7.334669564526364e-31,-7.354709392219182e-31,-7.374749690109741e-31,-7.394789517802559e-31,-7.414829815693118e-31,-7.434869643385936e-31,-7.454909941276495e-31,-7.474949768969313e-31,-7.494990066859872e-31,-7.51502989455269e-31,-7.535070192443249e-31,-7.555110020136067e-31,-7.575150318026626e-31,-7.595190615917185e-31,-7.615230443610003e-31,-7.635270741500562e-31,-7.65531056919338e-31,-7.675350867083939e-31,-7.695390694776757e-31,-7.715430992667316e-31,-7.735470820360134e-31,-7.755511118250693e-31,-7.775550945943511e-31,-7.79559124383407e-31,-7.815631071526888e-31,-7.835671369417447e-31,-7.8557116673080055e-31,-7.875751495000824e-31,-7.895791792891383e-31,-7.915831620584201e-31,-7.93587144827702e-31,-7.955912216365318e-31,-7.975952044058137e-31,-7.995991871750955e-31,-8.016031699443773e-31,-8.036072467532072e-31,-8.05611229522489e-31,-8.076152122917709e-31,-8.096191950610527e-31,-8.116232718698826e-31,-8.136272546391645e-31,-8.156312374084463e-31,-8.176353142172762e-31,-8.19639296986558e-31,-8.216432797558399e-31,-8.236472625251217e-31,-8.256513393339516e-31,-8.276553221032335e-31,-8.296593048725153e-31,-8.316632876417971e-31,-8.33667364450627e-31,-8.356713472199089e-31,-8.376753299891907e-31,-8.396793127584725e-31,-8.416833895673024e-31,-8.436873723365843e-31,-8.456913551058661e-31,-8.47695431914696e-31,-8.496994146839779e-31,-8.517033974532597e-31,-8.537073802225415e-31,-8.557114570313714e-31,-8.577154398006533e-31,-8.597194225699351e-31,-8.61723405339217e-31,-8.637274821480468e-31,-8.657314649173287e-31,-8.677354476866105e-31,-8.697395244954404e-31,-8.717435072647222e-31,-8.73747490034004e-31,-8.75751472803286e-31,-8.777555496121158e-31,-8.797595323813977e-31,-8.817635151506795e-31,-8.837674979199613e-31,-8.857715747287912e-31,-8.87775557498073e-31,-8.897795402673549e-31,-8.917835230366367e-31,-8.937875998454666e-31,-8.957915826147485e-31,-8.977955653840303e-31,-8.997996421928602e-31,-9.01803624962142e-31,-9.038076077314239e-31,-9.058115905007057e-31,-9.078156673095356e-31,-9.098196500788175e-31,-9.118236328480993e-31,-9.138276156173811e-31,-9.15831692426211e-31,-9.178356751954929e-31,-9.198396579647747e-31,-9.218437347736046e-31,-9.238477175428864e-31,-9.258517003121683e-31,-9.278556830814501e-31,-9.2985975989028e-31,-9.318637426595618e-31,-9.338677254288437e-31,-9.358717081981255e-31,-9.378757850069554e-31,-9.398797677762373e-31,-9.418837505455191e-31,-9.43887733314801e-31,-9.458918101236308e-31,-9.478957928929127e-31,-9.498997756621945e-31,-9.519038524710244e-31,-9.539078352403062e-31,-9.55911818009588e-31,-9.579158007788699e-31,-9.599198775876998e-31,-9.619238603569816e-31,-9.639278431262635e-31,-9.659318258955453e-31,-9.679359027043752e-31,-9.69939885473657e-31,-9.719438682429389e-31,-9.739478510122207e-31,-9.759519278210506e-31,-9.779559105903325e-31,-9.799598933596143e-31,-9.819639701684442e-31,-9.83967952937726e-31,-9.859719357070079e-31,-9.879759184762897e-31,-9.899799952851196e-31,-9.919839780544014e-31,-9.939879608236833e-31,-9.959919435929651e-31,-9.97996020401795e-31,-1.0000000031710769e-30],"x":[-5.0e-39,-2.0040130060120242e-33,-4.008021012024049e-33,-6.012029018036073e-33,-8.016037024048097e-33,-1.0020045030060122e-32,-1.2024053036072146e-32,-1.4028061042084168e-32,-1.6032069048096196e-32,-1.803607705410822e-32,-2.0040085060120242e-32,-2.2044093066132267e-32,-2.4048101072144292e-32,-2.605210907815631e-32,-2.805611708416834e-32,-3.006012509018036e-32,-3.206413309619239e-32,-3.4068141102204415e-32,-3.6072149108216437e-32,-3.8076157114228464e-32,-4.0080165120240486e-32,-4.208417312625251e-32,-4.4088181132264536e-32,-4.609218913827656e-32,-4.8096197144288585e-32,-5.01002051503006e-32,-5.210421315631263e-32,-5.410822116232465e-32,-5.611222916833668e-32,-5.81162371743487e-32,-6.012024518036073e-32,-6.212425318637274e-32,-6.412826119238477e-32,-6.613226919839681e-32,-6.813627720440883e-32,-7.014028521042085e-32,-7.214429321643287e-32,-7.41483012224449e-32,-7.615230922845691e-32,-7.815631723446895e-32,-8.016032524048097e-32,-8.2164333246493e-32,-8.416834125250501e-32,-8.617234925851704e-32,-8.817635726452907e-32,-9.01803652705411e-32,-9.218437327655311e-32,-9.418838128256514e-32,-9.619238928857716e-32,-9.819639729458919e-32,-1.0020040530060122e-31,-1.0220441330661325e-31,-1.0420842131262525e-31,-1.0621242931863726e-31,-1.082164373246493e-31,-1.1022044533066134e-31,-1.1222445333667334e-31,-1.1422846134268537e-31,-1.1623246934869742e-31,-1.1823647735470945e-31,-1.2024048536072145e-31,-1.2224449336673346e-31,-1.242485013727455e-31,-1.2625250937875753e-31,-1.2825651738476954e-31,-1.3026052539078157e-31,-1.322645333967936e-31,-1.3426854140280564e-31,-1.3627254940881765e-31,-1.3827655741482968e-31,-1.402805654208417e-31,-1.4228457342685373e-31,-1.4428858143286574e-31,-1.4629258943887776e-31,-1.482965974448898e-31,-1.5030060545090182e-31,-1.5230461345691382e-31,-1.5430862146292585e-31,-1.563126294689379e-31,-1.5831663747494993e-31,-1.6032064548096193e-31,-1.6232465348697396e-31,-1.6432866149298599e-31,-1.6633266949899802e-31,-1.6833667750501002e-31,-1.7034068551102205e-31,-1.7234469351703408e-31,-1.743487015230461e-31,-1.7635270952905813e-31,-1.7835671753507016e-31,-1.8036072554108219e-31,-1.8236473354709421e-31,-1.8436874155310622e-31,-1.8637274955911825e-31,-1.8837675756513027e-31,-1.903807655711423e-31,-1.9238477357715433e-31,-1.9438878158316633e-31,-1.9639278958917836e-31,-1.9839679759519043e-31,-2.004008056012024e-31,-2.0240481360721444e-31,-2.0440882161322647e-31,-2.064128296192385e-31,-2.0841683762525053e-31,-2.104208456312625e-31,-2.124248536372746e-31,-2.144288616432866e-31,-2.1643286964929864e-31,-2.184368776553106e-31,-2.204408856613227e-31,-2.2244489366733467e-31,-2.244489016733467e-31,-2.264529096793587e-31,-2.2845691768537076e-31,-2.3046092569138283e-31,-2.324649336973948e-31,-2.3446894170340684e-31,-2.3647294970941887e-31,-2.384769577154309e-31,-2.4048096572144288e-31,-2.424849737274549e-31,-2.4448898173346693e-31,-2.46492989739479e-31,-2.48496997745491e-31,-2.50501005751503e-31,-2.525050137575151e-31,-2.5450902176352707e-31,-2.565130297695391e-31,-2.5851703777555112e-31,-2.6052104578156315e-31,-2.625250537875752e-31,-2.645290617935872e-31,-2.665330697995992e-31,-2.6853707780561126e-31,-2.705410858116233e-31,-2.7254509381763527e-31,-2.7454910182364734e-31,-2.7655310982965933e-31,-2.785571178356714e-31,-2.805611258416834e-31,-2.825651338476954e-31,-2.8456914185370744e-31,-2.8657314985971946e-31,-2.8857715786573145e-31,-2.905811658717435e-31,-2.9258517387775555e-31,-2.9458918188376757e-31,-2.965931898897796e-31,-2.985971978957916e-31,-3.0060120590180366e-31,-3.0260521390781564e-31,-3.0460922191382767e-31,-3.066132299198397e-31,-3.086172379258517e-31,-3.1062124593186375e-31,-3.1262525393787578e-31,-3.146292619438878e-31,-3.1663326994989983e-31,-3.1863727795591186e-31,-3.206412859619239e-31,-3.226452939679359e-31,-3.246493019739479e-31,-3.2665330997995997e-31,-3.2865731798597195e-31,-3.30661325991984e-31,-3.3266533399799605e-31,-3.3466934200400803e-31,-3.366733500100201e-31,-3.386773580160321e-31,-3.406813660220441e-31,-3.4268537402805614e-31,-3.4468938203406817e-31,-3.4669339004008015e-31,-3.4869739804609223e-31,-3.507014060521042e-31,-3.527054140581163e-31,-3.547094220641283e-31,-3.567134300701403e-31,-3.5871743807615236e-31,-3.6072144608216435e-31,-3.6272545408817637e-31,-3.647294620941884e-31,-3.6673347010020043e-31,-3.6873747810621246e-31,-3.707414861122245e-31,-3.7274549411823647e-31,-3.7474950212424854e-31,-3.7675351013026057e-31,-3.7875751813627255e-31,-3.807615261422846e-31,-3.8276553414829665e-31,-3.8476954215430868e-31,-3.8677355016032066e-31,-3.887775581663327e-31,-3.907815661723447e-31,-3.9278557417835674e-31,-3.947895821843688e-31,-3.967935901903808e-31,-3.987975981963928e-31,-4.008016062024048e-31,-4.028056142084169e-31,-4.048096222144289e-31,-4.068136302204409e-31,-4.08817638226453e-31,-4.108216462324649e-31,-4.128256542384771e-31,-4.1482966224448896e-31,-4.16833670250501e-31,-4.188376782565131e-31,-4.208416862625251e-31,-4.2284569426853715e-31,-4.2484970227454905e-31,-4.268537102805612e-31,-4.288577182865732e-31,-4.308617262925852e-31,-4.328657342985972e-31,-4.348697423046093e-31,-4.368737503106212e-31,-4.388777583166333e-31,-4.408817663226454e-31,-4.428857743286573e-31,-4.448897823346694e-31,-4.468937903406813e-31,-4.488977983466935e-31,-4.5090180635270545e-31,-4.529058143587174e-31,-4.549098223647295e-31,-4.569138303707415e-31,-4.589178383767536e-31,-4.609218463827655e-31,-4.629258543887776e-31,-4.649298623947896e-31,-4.669338704008017e-31,-4.6893787840681365e-31,-4.709418864128257e-31,-4.729458944188378e-31,-4.749499024248497e-31,-4.769539104308618e-31,-4.7895791843687374e-31,-4.809619264428858e-31,-4.829659344488978e-31,-4.849699424549099e-31,-4.869739504609219e-31,-4.889779584669338e-31,-4.909819664729459e-31,-4.92985974478958e-31,-4.9498998248497e-31,-4.9699399049098195e-31,-4.98997998496994e-31,-5.010020065030061e-31,-5.030060145090181e-31,-5.0501002251503014e-31,-5.070140305210421e-31,-5.090180385270542e-31,-5.110220465330661e-31,-5.130260545390782e-31,-5.150300625450903e-31,-5.170340705511022e-31,-5.190380785571143e-31,-5.210420865631263e-31,-5.2304609456913835e-31,-5.250501025751503e-31,-5.270541105811623e-31,-5.290581185871744e-31,-5.310621265931865e-31,-5.330661345991984e-31,-5.350701426052104e-31,-5.370741506112226e-31,-5.390781586172345e-31,-5.4108216662324655e-31,-5.430861746292585e-31,-5.450901826352706e-31,-5.470941906412827e-31,-5.490981986472946e-31,-5.511022066533067e-31,-5.531062146593186e-31,-5.551102226653307e-31,-5.571142306713427e-31,-5.5911823867735475e-31,-5.611222466833667e-31,-5.631262546893788e-31,-5.651302626953909e-31,-5.671342707014029e-31,-5.691382787074149e-31,-5.711422867134268e-31,-5.73146294719439e-31,-5.751503027254509e-31,-5.77154310731463e-31,-5.79158318737475e-31,-5.81162326743487e-31,-5.831663347494991e-31,-5.85170342755511e-31,-5.871743507615231e-31,-5.891783587675351e-31,-5.911823667735471e-31,-5.931863747795592e-31,-5.9519038278557125e-31,-5.971943907915832e-31,-5.991983987975952e-31,-6.012024068036073e-31,-6.032064148096193e-31,-6.052104228156313e-31,-6.072144308216432e-31,-6.092184388276554e-31,-6.112224468336675e-31,-6.132264548396794e-31,-6.152304628456914e-31,-6.172344708517034e-31,-6.192384788577155e-31,-6.212424868637275e-31,-6.2324649486973946e-31,-6.252505028757516e-31,-6.272545108817636e-31,-6.292585188877756e-31,-6.3126252689378765e-31,-6.332665348997997e-31,-6.352705429058116e-31,-6.372745509118237e-31,-6.392785589178358e-31,-6.4128256692384775e-31,-6.432865749298598e-31,-6.452905829358718e-31,-6.472945909418839e-31,-6.492985989478958e-31,-6.513026069539078e-31,-6.533066149599199e-31,-6.553106229659319e-31,-6.57314630971944e-31,-6.5931863897795595e-31,-6.61322646983968e-31,-6.6332665498998e-31,-6.653306629959921e-31,-6.673346710020041e-31,-6.693386790080161e-31,-6.713426870140281e-31,-6.733466950200401e-31,-6.7535070302605226e-31,-6.7735471103206415e-31,-6.793587190380762e-31,-6.813627270440881e-31,-6.833667350501003e-31,-6.8537074305611235e-31,-6.8737475106212425e-31,-6.893787590681364e-31,-6.913827670741484e-31,-6.933867750801604e-31,-6.9539078308617235e-31,-6.973947910921845e-31,-6.993987990981964e-31,-7.014028071042085e-31,-7.034068151102205e-31,-7.054108231162325e-31,-7.074148311222446e-31,-7.094188391282565e-31,-7.114228471342687e-31,-7.134268551402806e-31,-7.154308631462926e-31,-7.174348711523047e-31,-7.194388791583167e-31,-7.2144288716432875e-31,-7.234468951703407e-31,-7.254509031763527e-31,-7.274549111823648e-31,-7.294589191883769e-31,-7.314629271943888e-31,-7.334669352004009e-31,-7.354709432064129e-31,-7.374749512124249e-31,-7.39478959218437e-31,-7.414829672244489e-31,-7.43486975230461e-31,-7.454909832364729e-31,-7.47494991242485e-31,-7.494989992484971e-31,-7.51503007254509e-31,-7.535070152605211e-31,-7.555110232665332e-31,-7.575150312725452e-31,-7.5951903927855714e-31,-7.615230472845692e-31,-7.635270552905813e-31,-7.655310632965933e-31,-7.6753507130260525e-31,-7.695390793086172e-31,-7.715430873146294e-31,-7.735470953206413e-31,-7.755511033266534e-31,-7.7755511133266535e-31,-7.795591193386774e-31,-7.815631273446895e-31,-7.835671353507014e-31,-7.8557114335671354e-31,-7.875751513627255e-31,-7.895791593687375e-31,-7.915831673747496e-31,-7.935871753807617e-31,-7.955911833867736e-31,-7.975951913927856e-31,-7.995991993987977e-31,-8.016032074048098e-31,-8.036072154108217e-31,-8.056112234168337e-31,-8.076152314228458e-31,-8.096192394288577e-31,-8.1162324743487e-31,-8.136272554408818e-31,-8.156312634468937e-31,-8.17635271452906e-31,-8.19639279458918e-31,-8.2164328746493e-31,-8.236472954709418e-31,-8.256513034769541e-31,-8.27655311482966e-31,-8.296593194889779e-31,-8.3166332749499e-31,-8.336673355010022e-31,-8.356713435070141e-31,-8.376753515130262e-31,-8.39679359519038e-31,-8.416833675250501e-31,-8.436873755310622e-31,-8.456913835370741e-31,-8.476953915430864e-31,-8.496993995490982e-31,-8.517034075551103e-31,-8.537074155611222e-31,-8.557114235671343e-31,-8.577154315731464e-31,-8.597194395791583e-31,-8.617234475851705e-31,-8.637274555911826e-31,-8.657314635971945e-31,-8.677354716032064e-31,-8.697394796092186e-31,-8.717434876152305e-31,-8.737474956212424e-31,-8.757515036272548e-31,-8.777555116332667e-31,-8.797595196392786e-31,-8.817635276452907e-31,-8.837675356513028e-31,-8.857715436573147e-31,-8.877755516633265e-31,-8.897795596693388e-31,-8.917835676753509e-31,-8.937875756813628e-31,-8.957915836873748e-31,-8.977955916933869e-31,-8.997995996993988e-31,-9.018036077054109e-31,-9.03807615711423e-31,-9.05811623717435e-31,-9.07815631723447e-31,-9.09819639729459e-31,-9.11823647735471e-31,-9.13827655741483e-31,-9.15831663747495e-31,-9.17835671753507e-31,-9.198396797595192e-31,-9.218436877655312e-31,-9.238476957715431e-31,-9.258517037775552e-31,-9.278557117835673e-31,-9.298597197895792e-31,-9.31863727795591e-31,-9.338677358016033e-31,-9.358717438076154e-31,-9.378757518136273e-31,-9.398797598196395e-31,-9.418837678256514e-31,-9.438877758316633e-31,-9.458917838376754e-31,-9.478957918436875e-31,-9.498997998496995e-31,-9.519038078557114e-31,-9.539078158617237e-31,-9.559118238677356e-31,-9.579158318737475e-31,-9.599198398797595e-31,-9.619238478857716e-31,-9.639278558917837e-31,-9.659318638977957e-31,-9.679358719038078e-31,-9.699398799098197e-31,-9.719438879158318e-31,-9.739478959218437e-31,-9.759519039278558e-31,-9.779559119338677e-31,-9.799599199398799e-31,-9.81963927945892e-31,-9.839679359519039e-31,-9.85971943957916e-31,-9.879759519639278e-31,-9.899799599699399e-31,-9.91983967975952e-31,-9.93987975981964e-31,-9.95991983987976e-31,-9.979959919939882e-31,-1.0e-30]}

},{}],31:[function(require,module,exports){
module.exports={"expected":[9.999999616903162e35,1.1983967880055359e36,1.3967936143207555e36,1.595190440635975e36,1.7935871084948697e36,1.9919839348100893e36,2.190380761125309e36,2.3887775874405285e36,2.587174413755748e36,2.785571240070968e36,2.9839680663861873e36,3.182364575788757e36,3.3807614021039765e36,3.579158228419196e36,3.777555054734416e36,3.9759518810496354e36,4.174348707364855e36,4.3727455336800746e36,4.571142359995294e36,4.769539186310514e36,4.9679360126257334e36,5.166332522028303e36,5.364729665256173e36,5.563126491571392e36,5.761523317886612e36,5.959920144201831e36,6.158316336691751e36,6.356713163006971e36,6.55510998932219e36,6.75350681563741e36,6.95190364195263e36,7.150300468267849e36,7.348697294583069e36,7.547094120898288e36,7.745490947213508e36,7.943887773528728e36,8.142284599843947e36,8.340681426159167e36,8.539078252474386e36,8.737475078789606e36,8.935871905104826e36,9.134268731420045e36,9.332665557735265e36,9.531062384050484e36,9.729459210365704e36,9.927855402855624e36,1.0126252229170843e37,1.0324649055486063e37,1.0523045881801282e37,1.0721442708116502e37,1.0919840168257022e37,1.1118236360746941e37,1.131663382088746e37,1.151503001337738e37,1.17134274735179e37,1.191182366600782e37,1.211021985849774e37,1.230861731863826e37,1.2507013511128178e37,1.2705410971268698e37,1.2903807163758618e37,1.3102204623899137e37,1.3300600816389057e37,1.3498998276529577e37,1.3697394469019496e37,1.3895791929160016e37,1.4094188121649935e37,1.4292585581790455e37,1.4490981774280375e37,1.4689379234420894e37,1.4887775426910814e37,1.5086172887051333e37,1.5284569079541253e37,1.5482966539681773e37,1.5681362732171692e37,1.5879758924661612e37,1.6078156384802131e37,1.627655257729205e37,1.647495003743257e37,1.667334622992249e37,1.687174369006301e37,1.707013988255293e37,1.726853734269345e37,1.7466933535183369e37,1.7665330995323888e37,1.7863727187813808e37,1.8062124647954328e37,1.8260520840444247e37,1.8458918300584767e37,1.8657314493074686e37,1.8855711953215206e37,1.9054108145705125e37,1.9252505605845645e37,1.9450901798335565e37,1.9649297990825484e37,1.9847695450966004e37,2.0046091643455923e37,2.0244489103596443e37,2.0442885296086363e37,2.0641282756226882e37,2.0839678948716802e37,2.1038076408857322e37,2.123647260134724e37,2.143486879383716e37,2.163326625397768e37,2.18316637141182e37,2.203006117425872e37,2.222845609909804e37,2.242685355923856e37,2.262525101937908e37,2.28236484795196e37,2.3022043404358918e37,2.3220440864499437e37,2.3418838324639957e37,2.3617233249479276e37,2.3815630709619796e37,2.4014028169760316e37,2.4212425629900835e37,2.4410820554740155e37,2.4609218014880674e37,2.4807615475021194e37,2.5006012935161714e37,2.5204407860001033e37,2.5402805320141553e37,2.5601202780282073e37,2.579960024042259e37,2.599799516526191e37,2.619639262540243e37,2.639479008554295e37,2.659318754568347e37,2.679158247052279e37,2.698997993066331e37,2.718837739080383e37,2.738677231564315e37,2.758516977578367e37,2.778356723592419e37,2.798196469606471e37,2.8180359620904027e37,2.8378757081044547e37,2.8577154541185067e37,2.8775552001325586e37,2.8973946926164906e37,2.9172344386305425e37,2.9370741846445945e37,2.9569139306586465e37,2.9767534231425784e37,2.9965931691566304e37,3.0164329151706824e37,3.0362726611847343e37,3.0561121536686663e37,3.075951899682718e37,3.09579164569677e37,3.115631138180702e37,3.135470884194754e37,3.155310630208806e37,3.175150376222858e37,3.19498986870679e37,3.214829614720842e37,3.234669360734894e37,3.254509106748946e37,3.274348599232878e37,3.29418834524693e37,3.314028091260982e37,3.3338678372750337e37,3.3537073297589657e37,3.3735470757730176e37,3.3933868217870696e37,3.4132265678011216e37,3.4330660602850535e37,3.4529058062991055e37,3.4727455523131575e37,3.4925850447970894e37,3.5124247908111414e37,3.5322645368251933e37,3.5521042828392453e37,3.571943775323177e37,3.591783521337229e37,3.611623267351281e37,3.631463013365333e37,3.651302505849265e37,3.671142251863317e37,3.690981997877369e37,3.710821743891421e37,3.730661236375353e37,3.750500982389405e37,3.770340728403457e37,3.790180474417509e37,3.810019966901441e37,3.8298597129154927e37,3.8496994589295447e37,3.8695389514134766e37,3.8893786974275286e37,3.9092184434415806e37,3.9290581894556326e37,3.9488976819395645e37,3.9687374279536165e37,3.9885771739676684e37,4.0084169199817204e37,4.0282564124656523e37,4.0480961584797043e37,4.0679359044937563e37,4.0877756505078082e37,4.10761514299174e37,4.127454889005792e37,4.147294635019844e37,4.167134381033896e37,4.186973873517828e37,4.20681361953188e37,4.226653365545932e37,4.246493111559984e37,4.266332857574036e37,4.286172096527848e37,4.3060118425419e37,4.325851588555952e37,4.345691334570004e37,4.365531080584056e37,4.385370826598108e37,4.40521057261216e37,4.425050318626212e37,4.4448895575800235e37,4.464729303594075e37,4.484569049608127e37,4.504408795622179e37,4.524248541636231e37,4.544088287650283e37,4.563928033664335e37,4.583767779678387e37,4.603607018632199e37,4.623446764646251e37,4.643286510660303e37,4.663126256674355e37,4.682966002688407e37,4.702805748702459e37,4.722645494716511e37,4.742484733670323e37,4.762324479684375e37,4.782164225698427e37,4.802003971712479e37,4.821843717726531e37,4.841683463740583e37,4.861523209754635e37,4.881362955768687e37,4.901202194722499e37,4.921041940736551e37,4.9408816867506025e37,4.9607214327646545e37,4.980561178778706e37,5.000400924792758e37,5.02024067080681e37,5.040079909760622e37,5.059919655774674e37,5.079759401788726e37,5.099599147802778e37,5.11943889381683e37,5.139278639830882e37,5.159118385844934e37,5.178958131858986e37,5.198797370812798e37,5.21863711682685e37,5.238476862840902e37,5.258316608854954e37,5.278156354869006e37,5.297996100883058e37,5.31783584689711e37,5.337675592911162e37,5.357514831864974e37,5.377354577879026e37,5.397194323893078e37,5.41703406990713e37,5.436873815921182e37,5.456713561935234e37,5.4765533079492855e37,5.496392546903097e37,5.516232292917149e37,5.536072038931201e37,5.555911784945253e37,5.575751530959305e37,5.595591276973357e37,5.615431022987409e37,5.635270769001461e37,5.655110007955273e37,5.674949753969325e37,5.694789499983377e37,5.714629245997429e37,5.734468992011481e37,5.754308738025533e37,5.774148484039585e37,5.793987722993397e37,5.813827469007449e37,5.833667215021501e37,5.853506961035553e37,5.873346707049605e37,5.893186453063657e37,5.913026199077709e37,5.932865945091761e37,5.9527051840455725e37,5.972544930059624e37,5.992384676073676e37,6.012224422087728e37,6.03206416810178e37,6.051903914115832e37,6.071743660129884e37,6.091583406143936e37,6.111422645097748e37,6.1312623911118e37,6.151102137125852e37,6.170941883139904e37,6.190781629153956e37,6.210621375168008e37,6.23046112118206e37,6.250300360135872e37,6.270140106149924e37,6.289979852163976e37,6.309819598178028e37,6.32965934419208e37,6.349499090206132e37,6.369338836220184e37,6.389178582234236e37,6.409017821188048e37,6.4288575672021e37,6.448697313216152e37,6.4685370592302035e37,6.4883768052442555e37,6.508216551258307e37,6.528056297272359e37,6.547896043286411e37,6.567735282240223e37,6.587575028254275e37,6.607414774268327e37,6.627254520282379e37,6.647094266296431e37,6.666934012310483e37,6.686773758324535e37,6.706612997278347e37,6.726452743292399e37,6.746292489306451e37,6.766132235320503e37,6.785971981334555e37,6.805811727348607e37,6.825651473362659e37,6.845491219376711e37,6.865330458330523e37,6.885170204344575e37,6.905009950358627e37,6.924849696372679e37,6.944689442386731e37,6.964529188400783e37,6.984368934414835e37,7.004208173368646e37,7.024047919382698e37,7.04388766539675e37,7.063727411410802e37,7.083567157424854e37,7.103406903438906e37,7.123246649452958e37,7.14308639546701e37,7.162925634420822e37,7.182765380434874e37,7.202605126448926e37,7.222444872462978e37,7.24228461847703e37,7.262124364491082e37,7.281964110505134e37,7.301803856519186e37,7.321643095472998e37,7.34148284148705e37,7.361322587501102e37,7.381162333515154e37,7.401002079529206e37,7.420841825543258e37,7.44068157155731e37,7.4605208105111215e37,7.4803605565251735e37,7.500200302539225e37,7.520040048553277e37,7.539879794567329e37,7.559719540581381e37,7.579559286595433e37,7.599399032609485e37,7.619238271563297e37,7.639078017577349e37,7.658917763591401e37,7.678757509605453e37,7.698597255619505e37,7.718437001633557e37,7.738276747647609e37,7.758115986601421e37,7.777955732615473e37,7.797795478629525e37,7.817635224643577e37,7.837474970657629e37,7.857314716671681e37,7.877154462685733e37,7.896994208699785e37,7.916833447653597e37,7.936673193667649e37,7.956512939681701e37,7.9763526856957525e37,7.9961924317098045e37,8.016032177723856e37,8.035871923737908e37,8.05571166975196e37,8.075550908705772e37,8.095390654719824e37,8.115230400733876e37,8.135070146747928e37,8.15490989276198e37,8.174749638776032e37,8.194589384790084e37,8.214428623743896e37,8.234268369757948e37,8.254108115772e37,8.273947861786052e37,8.293787607800104e37,8.313627353814156e37,8.333467099828208e37,8.35330684584226e37,8.373146084796072e37,8.392985830810124e37,8.412825576824176e37,8.432665322838228e37,8.45250506885228e37,8.472344814866332e37,8.492184560880384e37,8.512024306894436e37,8.531863545848247e37,8.55170379892254e37,8.571543037876351e37,8.591382276830163e37,8.611222529904455e37,8.631061768858267e37,8.65090202193256e37,8.670741260886371e37,8.690581513960663e37,8.710420752914475e37,8.730261005988767e37,8.750100244942579e37,8.76993948389639e37,8.789779736970683e37,8.809618975924495e37,8.829459228998787e37,8.849298467952599e37,8.86913872102689e37,8.888977959980703e37,8.908817198934515e37,8.928657452008807e37,8.948496690962619e37,8.96833694403691e37,8.988176182990722e37,9.008016436065015e37,9.027855675018826e37,9.047694913972638e37,9.06753516704693e37,9.087374406000742e37,9.107214659075034e37,9.127053898028846e37,9.146894151103138e37,9.16673339005695e37,9.186573643131242e37,9.206412882085054e37,9.226252121038866e37,9.246092374113158e37,9.26593161306697e37,9.285771866141262e37,9.305611105095074e37,9.325451358169366e37,9.345290597123178e37,9.36512983607699e37,9.384970089151282e37,9.404809328105094e37,9.424649581179386e37,9.444488820133198e37,9.46432907320749e37,9.484168312161302e37,9.504007551115113e37,9.523847804189405e37,9.543687043143217e37,9.56352729621751e37,9.583366535171321e37,9.603206788245613e37,9.623046027199425e37,9.642885266153237e37,9.66272551922753e37,9.682564758181341e37,9.702405011255633e37,9.722244250209445e37,9.742084503283737e37,9.761923742237549e37,9.781763995311841e37,9.801603234265653e37,9.821442473219465e37,9.841282726293757e37,9.861121965247569e37,9.88096221832186e37,9.900801457275673e37,9.920641710349965e37,9.940480949303777e37,9.960320188257589e37,9.98016044133188e37,9.999999680285692e37],"x":[1.0e36,1.1983967935871744e36,1.3967935871743486e36,1.5951903807615228e36,1.7935871743486974e36,1.991983967935872e36,2.190380761523046e36,2.3887775551102206e36,2.5871743486973948e36,2.785571142284569e36,2.9839679358717435e36,3.182364729458918e36,3.3807615230460926e36,3.5791583166332665e36,3.777555110220441e36,3.9759519038076155e36,4.1743486973947894e36,4.372745490981964e36,4.571142284569138e36,4.7695390781563124e36,4.967935871743487e36,5.166332665330661e36,5.364729458917835e36,5.563126252505009e36,5.761523046092184e36,5.95991983967936e36,6.158316633266533e36,6.356713426853708e36,6.555110220440881e36,6.753507014028055e36,6.95190380761523e36,7.150300601202404e36,7.348697394789579e36,7.547094188376754e36,7.745490981963928e36,7.943887775551103e36,8.142284569138276e36,8.340681362725451e36,8.539078156312625e36,8.7374749498998e36,8.935871743486973e36,9.134268537074148e36,9.332665330661322e36,9.531062124248497e36,9.729458917835671e36,9.927855711422845e36,1.0126252505010019e37,1.0324649298597194e37,1.0523046092184369e37,1.0721442885771542e37,1.0919839679358717e37,1.111823647294589e37,1.1316633266533065e37,1.151503006012024e37,1.1713426853707415e37,1.1911823647294588e37,1.2110220440881763e37,1.2308617234468938e37,1.250701402805611e37,1.2705410821643286e37,1.290380761523046e37,1.3102204408817636e37,1.3300601202404809e37,1.3498997995991984e37,1.369739478957916e37,1.3895791583166334e37,1.4094188376753507e37,1.429258517034068e37,1.4490981963927855e37,1.468937875751503e37,1.4887775551102205e37,1.5086172344689378e37,1.5284569138276553e37,1.5482965931863728e37,1.5681362725450903e37,1.5879759519038076e37,1.607815631262525e37,1.6276553106212426e37,1.64749498997996e37,1.6673346693386774e37,1.6871743486973949e37,1.7070140280561124e37,1.72685370741483e37,1.7466933867735472e37,1.7665330661322642e37,1.7863727454909817e37,1.8062124248496992e37,1.8260521042084167e37,1.845891783567134e37,1.8657314629258515e37,1.885571142284569e37,1.9054108216432865e37,1.9252505010020038e37,1.9450901803607213e37,1.9649298597194388e37,1.9847695390781563e37,2.0046092184368739e37,2.0244488977955911e37,2.0442885771543086e37,2.0641282565130262e37,2.0839679358717434e37,2.1038076152304607e37,2.1236472945891782e37,2.143486973947896e37,2.1633266533066135e37,2.1831663326653305e37,2.203006012024048e37,2.2228456913827655e37,2.2426853707414826e37,2.2625250501002e37,2.2823647294589176e37,2.3022044088176346e37,2.3220440881763526e37,2.3418837675350696e37,2.3617234468937876e37,2.3815631262525047e37,2.401402805611222e37,2.4212424849699397e37,2.441082164328657e37,2.4609218436873747e37,2.480761523046092e37,2.5006012024048093e37,2.520440881763527e37,2.5402805611222443e37,2.560120240480962e37,2.5799599198396793e37,2.599799599198397e37,2.6196392785571143e37,2.639478957915832e37,2.659318637274549e37,2.679158316633267e37,2.698997995991984e37,2.718837675350702e37,2.738677354709419e37,2.7585170340681364e37,2.778356713426854e37,2.7981963927855714e37,2.8180360721442885e37,2.837875751503006e37,2.8577154308617235e37,2.877555110220441e37,2.8973947895791585e37,2.917234468937875e37,2.937074148296593e37,2.95691382765531e37,2.976753507014028e37,2.996593186372745e37,3.0164328657314626e37,3.03627254509018e37,3.0561122244488976e37,3.0759519038076147e37,3.0957915831663327e37,3.1156312625250497e37,3.1354709418837677e37,3.1553106212424847e37,3.1751503006012022e37,3.1949899799599197e37,3.2148296593186373e37,3.2346693386773543e37,3.2545090180360723e37,3.2743486973947893e37,3.2941883767535073e37,3.3140280561122243e37,3.333867735470942e37,3.3537074148296594e37,3.373547094188377e37,3.3933867735470944e37,3.413226452905812e37,3.433066132264529e37,3.452905811623247e37,3.472745490981964e37,3.4925851703406815e37,3.512424849699399e37,3.5322645290581165e37,3.552104208416834e37,3.571943887775551e37,3.591783567134268e37,3.6116232464929856e37,3.631462925851703e37,3.6513026052104206e37,3.671142284569138e37,3.690981963927855e37,3.710821643286573e37,3.73066132264529e37,3.7505010020040077e37,3.770340681362725e37,3.7901803607214427e37,3.81002004008016e37,3.8298597194388777e37,3.8496993987975947e37,3.8695390781563127e37,3.88937875751503e37,3.9092184368737478e37,3.929058116232465e37,3.9488977955911823e37,3.9687374749499e37,3.9885771543086173e37,4.0084168336673344e37,4.0282565130260523e37,4.0480961923847694e37,4.0679358717434874e37,4.0877755511022044e37,4.107615230460922e37,4.1274549098196394e37,4.147294589178357e37,4.167134268537074e37,4.186973947895792e37,4.206813627254509e37,4.226653306613227e37,4.246492985971944e37,4.266332665330661e37,4.286172344689379e37,4.306012024048096e37,4.325851703406814e37,4.345691382765531e37,4.365531062124248e37,4.385370741482966e37,4.405210420841683e37,4.425050100200401e37,4.444889779559118e37,4.464729458917836e37,4.484569138276553e37,4.50440881763527e37,4.524248496993988e37,4.544088176352706e37,4.563927855711423e37,4.58376753507014e37,4.603607214428858e37,4.623446893787576e37,4.643286573146292e37,4.66312625250501e37,4.682965931863728e37,4.702805611222445e37,4.722645290581162e37,4.74248496993988e37,4.762324649298597e37,4.782164328657315e37,4.802004008016032e37,4.82184368737475e37,4.841683366733467e37,4.861523046092185e37,4.881362725450902e37,4.901202404809619e37,4.921042084168337e37,4.940881763527055e37,4.960721442885771e37,4.980561122244489e37,5.000400801603207e37,5.020240480961923e37,5.040080160320641e37,5.059919839679359e37,5.079759519038077e37,5.099599198396793e37,5.119438877755511e37,5.139278557114229e37,5.159118236472946e37,5.178957915831663e37,5.198797595190381e37,5.218637274549098e37,5.238476953907816e37,5.258316633266533e37,5.278156312625249e37,5.297995991983967e37,5.317835671342685e37,5.337675350701402e37,5.357515030060119e37,5.377354709418837e37,5.397194388777555e37,5.417034068136271e37,5.436873747494989e37,5.456713426853707e37,5.476553106212424e37,5.4963927855711415e37,5.516232464929859e37,5.5360721442885765e37,5.5559118236472945e37,5.5757515030060115e37,5.5955911823647295e37,5.615430861723447e37,5.635270541082165e37,5.655110220440882e37,5.674949899799599e37,5.694789579158317e37,5.714629258517034e37,5.734468937875751e37,5.754308617234469e37,5.774148296593187e37,5.793987975951903e37,5.813827655310621e37,5.833667334669339e37,5.853507014028057e37,5.873346693386773e37,5.893186372745491e37,5.913026052104209e37,5.932865731462926e37,5.952705410821643e37,5.972545090180361e37,5.992384769539078e37,6.012224448897796e37,6.032064128256513e37,6.05190380761523e37,6.071743486973948e37,6.091583166332666e37,6.111422845691382e37,6.1312625250501e37,6.151102204408818e37,6.170941883767536e37,6.190781563126252e37,6.21062124248497e37,6.230460921843688e37,6.250300601202405e37,6.270140280561122e37,6.28997995991984e37,6.309819639278557e37,6.329659318637275e37,6.349498997995992e37,6.369338677354709e37,6.389178356713427e37,6.409018036072144e37,6.428857715430862e37,6.448697394789579e37,6.468537074148297e37,6.488376753507014e37,6.508216432865731e37,6.528056112224449e37,6.547895791583167e37,6.567735470941883e37,6.587575150300601e37,6.607414829659319e37,6.627254509018035e37,6.647094188376752e37,6.66693386773547e37,6.686773547094188e37,6.706613226452905e37,6.726452905811622e37,6.74629258517034e37,6.766132264529057e37,6.785971943887775e37,6.805811623246492e37,6.8256513026052095e37,6.845490981963927e37,6.865330661322645e37,6.885170340681362e37,6.9050100200400795e37,6.9248496993987975e37,6.9446893787575155e37,6.964529058116232e37,6.98436873747495e37,7.004208416833668e37,7.024048096192385e37,7.043887775551102e37,7.06372745490982e37,7.083567134268537e37,7.103406813627255e37,7.123246492985972e37,7.143086172344689e37,7.162925851703407e37,7.182765531062124e37,7.202605210420842e37,7.222444889779559e37,7.242284569138277e37,7.262124248496994e37,7.281963927855711e37,7.301803607214429e37,7.321643286573147e37,7.341482965931863e37,7.361322645290581e37,7.381162324649299e37,7.401002004008016e37,7.420841683366733e37,7.440681362725451e37,7.460521042084169e37,7.480360721442886e37,7.500200400801603e37,7.520040080160321e37,7.539879759519038e37,7.559719438877756e37,7.579559118236473e37,7.59939879759519e37,7.619238476953908e37,7.639078156312626e37,7.658917835671342e37,7.67875751503006e37,7.698597194388778e37,7.718436873747496e37,7.738276553106212e37,7.75811623246493e37,7.777955911823648e37,7.797795591182365e37,7.817635270541082e37,7.8374749498998e37,7.857314629258517e37,7.877154308617234e37,7.896993987975952e37,7.916833667334669e37,7.936673346693387e37,7.956513026052103e37,7.97635270541082e37,7.996192384769538e37,8.016032064128256e37,8.035871743486973e37,8.05571142284569e37,8.075551102204408e37,8.095390781563126e37,8.115230460921842e37,8.13507014028056e37,8.154909819639278e37,8.174749498997995e37,8.1945891783567125e37,8.21442885771543e37,8.2342685370741475e37,8.2541082164328655e37,8.2739478957915825e37,8.2937875751503005e37,8.313627254509018e37,8.333466933867736e37,8.353306613226453e37,8.37314629258517e37,8.392985971943888e37,8.412825651302606e37,8.432665330661322e37,8.45250501002004e37,8.472344689378758e37,8.492184368737475e37,8.512024048096193e37,8.53186372745491e37,8.551703406813629e37,8.571543086172345e37,8.591382765531063e37,8.61122244488978e37,8.631062124248497e37,8.650901803607213e37,8.67074148296593e37,8.690581162324649e37,8.710420841683367e37,8.730260521042083e37,8.7501002004008e37,8.769939879759519e37,8.789779559118235e37,8.809619238476953e37,8.82945891783567e37,8.849298597194387e37,8.869138276553105e37,8.888977955911823e37,8.90881763527054e37,8.928657314629257e37,8.948496993987975e37,8.968336673346693e37,8.988176352705411e37,9.008016032064127e37,9.027855711422845e37,9.047695390781561e37,9.06753507014028e37,9.087374749498997e37,9.107214428857715e37,9.127054108216433e37,9.146893787575151e37,9.166733466933865e37,9.186573146292583e37,9.206412825651301e37,9.22625250501002e37,9.246092184368737e37,9.265931863727455e37,9.285771543086173e37,9.305611222444887e37,9.325450901803605e37,9.345290581162323e37,9.365130260521041e37,9.38496993987976e37,9.404809619238477e37,9.424649298597193e37,9.444488977955911e37,9.464328657314627e37,9.484168336673345e37,9.504008016032063e37,9.523847695390781e37,9.5436873747495e37,9.563527054108215e37,9.583366733466933e37,9.603206412825651e37,9.623046092184368e37,9.642885771543086e37,9.662725450901804e37,9.68256513026052e37,9.702404809619238e37,9.722244488977956e37,9.742084168336674e37,9.761923847695392e37,9.781763527054108e37,9.801603206412826e37,9.821442885771542e37,9.84128256513026e37,9.861122244488978e37,9.880961923847696e37,9.900801603206414e37,9.920641282565132e37,9.940480961923846e37,9.960320641282564e37,9.980160320641282e37,1.0e38]}

},{}],32:[function(require,module,exports){
module.exports={"expected":[0.0,2.006011962890625,4.01202392578125,6.018035888671875,8.0240478515625,10.030059814453125,12.03607177734375,14.042083740234375,16.048095703125,18.054107666015625,20.06011962890625,22.066131591796875,24.0721435546875,26.078155517578125,28.08416748046875,30.090179443359375,32.09619140625,34.102203369140625,36.10821533203125,38.114227294921875,40.1202392578125,42.126251220703125,44.13226318359375,46.138275146484375,48.144287109375,50.150299072265625,52.15631103515625,54.162322998046875,56.1683349609375,58.174346923828125,60.18035888671875,62.186370849609375,64.1923828125,66.19839477539062,68.20440673828125,70.21041870117188,72.2164306640625,74.22244262695312,76.22845458984375,78.23446655273438,80.240478515625,82.24649047851562,84.25250244140625,86.25851440429688,88.2645263671875,90.27053833007812,92.27655029296875,94.28256225585938,96.28857421875,98.29458618164062,100.30059814453125,102.30661010742188,104.3126220703125,106.31863403320312,108.32464599609375,110.33065795898438,112.336669921875,114.34268188476562,116.34869384765625,118.35470581054688,120.3607177734375,122.36672973632812,124.37274169921875,126.3787612915039,128.384765625,130.39077758789062,132.39678955078125,134.40280151367188,136.4088134765625,138.41482543945312,140.42083740234375,142.42684936523438,144.432861328125,146.43887329101562,148.44488525390625,150.45089721679688,152.4569091796875,154.46292114257812,156.46893310546875,158.47494506835938,160.48095703125,162.48696899414062,164.49298095703125,166.49899291992188,168.5050048828125,170.51101684570312,172.51702880859375,174.52304077148438,176.529052734375,178.53506469726562,180.54107666015625,182.54708862304688,184.5531005859375,186.55911254882812,188.56512451171875,190.57113647460938,192.5771484375,194.58316040039062,196.58917236328125,198.59518432617188,200.6011962890625,202.60720825195312,204.61322021484375,206.61923217773438,208.625244140625,210.63125610351562,212.63726806640625,214.64328002929688,216.6492919921875,218.65530395507812,220.66131591796875,222.66732788085938,224.67333984375,226.67935180664062,228.68536376953125,230.69137573242188,232.6973876953125,234.70339965820312,236.70941162109375,238.71542358398438,240.721435546875,242.72744750976562,244.73345947265625,246.73947143554688,248.7454833984375,250.7515106201172,252.7575225830078,254.76353454589844,256.76953125,258.7755432128906,260.78155517578125,262.7875671386719,264.7935791015625,266.7995910644531,268.80560302734375,270.8116149902344,272.817626953125,274.8236389160156,276.82965087890625,278.8356628417969,280.8416748046875,282.8476867675781,284.85369873046875,286.8597106933594,288.86572265625,290.8717346191406,292.87774658203125,294.8837585449219,296.8897705078125,298.8957824707031,300.90179443359375,302.9078063964844,304.913818359375,306.9198303222656,308.92584228515625,310.9318542480469,312.9378662109375,314.9438781738281,316.94989013671875,318.9559020996094,320.9619140625,322.9679260253906,324.97393798828125,326.9799499511719,328.9859619140625,330.9919738769531,332.99798583984375,335.0039978027344,337.010009765625,339.0160217285156,341.02203369140625,343.0280456542969,345.0340576171875,347.0400695800781,349.04608154296875,351.0520935058594,353.05810546875,355.0641174316406,357.07012939453125,359.0761413574219,361.0821533203125,363.0881652832031,365.09417724609375,367.1001892089844,369.106201171875,371.1122131347656,373.11822509765625,375.1242370605469,377.1302490234375,379.1362609863281,381.14227294921875,383.1482849121094,385.154296875,387.1603088378906,389.16632080078125,391.1723327636719,393.1783447265625,395.1843566894531,397.19036865234375,399.1963806152344,401.202392578125,403.2084045410156,405.21441650390625,407.2204284667969,409.2264404296875,411.2324523925781,413.23846435546875,415.2444763183594,417.25048828125,419.2565002441406,421.26251220703125,423.2685241699219,425.2745361328125,427.2805480957031,429.28656005859375,431.2925720214844,433.298583984375,435.3045959472656,437.31060791015625,439.3166198730469,441.3226318359375,443.3286437988281,445.33465576171875,447.3406677246094,449.3466796875,451.3526916503906,453.35870361328125,455.3647155761719,457.3707275390625,459.3767395019531,461.38275146484375,463.3887634277344,465.394775390625,467.4007873535156,469.40679931640625,471.4128112792969,473.4188232421875,475.4248352050781,477.43084716796875,479.4368591308594,481.44287109375,483.4488830566406,485.45489501953125,487.4609069824219,489.4669189453125,491.4729309082031,493.47894287109375,495.4849548339844,497.490966796875,499.4969787597656,501.5030212402344,503.509033203125,505.5150451660156,507.52105712890625,509.5270690917969,511.5330810546875,513.5390625,515.5451049804688,517.5510864257812,519.55712890625,521.5631103515625,523.5691528320312,525.5751342773438,527.5811767578125,529.587158203125,531.5932006835938,533.5991821289062,535.605224609375,537.6112060546875,539.6172485351562,541.6232299804688,543.6292724609375,545.63525390625,547.6412963867188,549.6472778320312,551.6533203125,553.6593017578125,555.6653442382812,557.6713256835938,559.6773681640625,561.683349609375,563.6893920898438,565.6953735351562,567.701416015625,569.7073974609375,571.7134399414062,573.7194213867188,575.7254638671875,577.7314453125,579.7374877929688,581.7434692382812,583.74951171875,585.7554931640625,587.7615356445312,589.7675170898438,591.7735595703125,593.779541015625,595.7855834960938,597.7915649414062,599.797607421875,601.8035888671875,603.8096313476562,605.8156127929688,607.8216552734375,609.82763671875,611.8336791992188,613.8396606445312,615.845703125,617.8516845703125,619.8577270507812,621.8637084960938,623.8697509765625,625.875732421875,627.8817749023438,629.8877563476562,631.893798828125,633.8997802734375,635.9058227539062,637.9118041992188,639.9178466796875,641.923828125,643.9298706054688,645.9358520507812,647.94189453125,649.9478759765625,651.9539184570312,653.9598999023438,655.9659423828125,657.971923828125,659.9779663085938,661.9839477539062,663.989990234375,665.9959716796875,668.0020141601562,670.0079956054688,672.0140380859375,674.02001953125,676.0260620117188,678.0320434570312,680.0380859375,682.0440673828125,684.0501098632812,686.0560913085938,688.0621337890625,690.068115234375,692.0741577148438,694.0801391601562,696.086181640625,698.0921630859375,700.0982055664062,702.1041870117188,704.1102294921875,706.1162109375,708.1222534179688,710.1282348632812,712.13427734375,714.1402587890625,716.1463012695312,718.1522827148438,720.1583251953125,722.164306640625,724.1703491210938,726.1763305664062,728.182373046875,730.1883544921875,732.1943969726562,734.2003784179688,736.2064208984375,738.21240234375,740.2184448242188,742.2244262695312,744.23046875,746.2364501953125,748.2424926757812,750.2484741210938,752.2545166015625,754.260498046875,756.2665405273438,758.2725219726562,760.278564453125,762.2845458984375,764.2905883789062,766.2965698242188,768.3026123046875,770.30859375,772.3146362304688,774.3206176757812,776.32666015625,778.3326416015625,780.3386840820312,782.3446655273438,784.3507080078125,786.356689453125,788.3627319335938,790.3687133789062,792.374755859375,794.3807373046875,796.3867797851562,798.3927612304688,800.3988037109375,802.40478515625,804.4108276367188,806.4168090820312,808.4228515625,810.4288330078125,812.4348754882812,814.4408569335938,816.4468994140625,818.452880859375,820.4589233398438,822.4649047851562,824.470947265625,826.4769287109375,828.4829711914062,830.4889526367188,832.4949951171875,834.5009765625,836.5070190429688,838.5130004882812,840.51904296875,842.5250244140625,844.5310668945312,846.5370483398438,848.5430908203125,850.549072265625,852.5551147460938,854.5610961914062,856.567138671875,858.5731201171875,860.5791625976562,862.5851440429688,864.5911865234375,866.59716796875,868.6032104492188,870.6091918945312,872.615234375,874.6212158203125,876.6272583007812,878.6332397460938,880.6392822265625,882.645263671875,884.6513061523438,886.6572875976562,888.663330078125,890.6693115234375,892.6753540039062,894.6813354492188,896.6873779296875,898.693359375,900.6994018554688,902.7053833007812,904.71142578125,906.7174072265625,908.7234497070312,910.7294311523438,912.7354736328125,914.741455078125,916.7474975585938,918.7534790039062,920.759521484375,922.7655029296875,924.7715454101562,926.7775268554688,928.7835693359375,930.78955078125,932.7955932617188,934.8015747070312,936.8076171875,938.8135986328125,940.8196411132812,942.8256225585938,944.8316650390625,946.837646484375,948.8436889648438,950.8496704101562,952.855712890625,954.8616943359375,956.8677368164062,958.8737182617188,960.8797607421875,962.8857421875,964.8917846679688,966.8977661132812,968.90380859375,970.9097900390625,972.9158325195312,974.9218139648438,976.9278564453125,978.933837890625,980.9398803710938,982.9458618164062,984.951904296875,986.9578857421875,988.9639282226562,990.9699096679688,992.9759521484375,994.98193359375,996.9879760742188,998.9939575195312,1001.0],"x":[0.0,2.006012024048096,4.012024048096192,6.018036072144288,8.024048096192384,10.030060120240481,12.036072144288577,14.042084168336673,16.04809619238477,18.054108216432866,20.060120240480963,22.06613226452906,24.072144288577153,26.07815631262525,28.084168336673347,30.090180360721444,32.09619238476954,34.102204408817634,36.10821643286573,38.11422845691383,40.120240480961925,42.12625250501002,44.13226452905812,46.13827655310621,48.144288577154306,50.1503006012024,52.1563126252505,54.1623246492986,56.168336673346694,58.17434869739479,60.18036072144289,62.186372745490985,64.19238476953907,66.19839679358718,68.20440881763527,70.21042084168337,72.21643286573146,74.22244488977955,76.22845691382766,78.23446893787575,80.24048096192385,82.24649298597194,84.25250501002004,86.25851703406813,88.26452905811624,90.27054108216433,92.27655310621242,94.28256513026052,96.28857715430861,98.29458917835672,100.3006012024048,102.30661322645291,104.312625250501,106.3186372745491,108.3246492985972,110.33066132264528,112.33667334669339,114.34268537074148,116.34869739478958,118.35470941883767,120.36072144288578,122.36673346693387,124.37274549098197,126.37875751503006,128.38476953907815,130.39078156312624,132.39679358717436,134.40280561122245,136.40881763527054,138.41482965931863,140.42084168336675,142.42685370741484,144.43286573146293,146.43887775551102,148.4448897795591,150.45090180360722,152.4569138276553,154.4629258517034,156.4689378757515,158.4749498997996,160.4809619238477,162.4869739478958,164.49298597194388,166.49899799599197,168.5050100200401,170.51102204408818,172.51703406813627,174.52304609218436,176.52905811623248,178.53507014028057,180.54108216432866,182.54709418837675,184.55310621242484,186.55911823647295,188.56513026052104,190.57114228456913,192.57715430861722,194.58316633266534,196.58917835671343,198.59519038076152,200.6012024048096,202.6072144288577,204.61322645290582,206.6192384769539,208.625250501002,210.6312625250501,212.6372745490982,214.6432865731463,216.6492985971944,218.65531062124248,220.66132264529057,222.6673346693387,224.67334669338678,226.67935871743487,228.68537074148296,230.69138276553107,232.69739478957916,234.70340681362725,236.70941883767534,238.71543086172343,240.72144288577155,242.72745490981964,244.73346693386773,246.73947895791582,248.74549098196394,250.75150300601203,252.75751503006012,254.7635270541082,256.7695390781563,258.7755511022044,260.7815631262525,262.7875751503006,264.7935871743487,266.7995991983968,268.8056112224449,270.811623246493,272.8176352705411,274.8236472945892,276.82965931863725,278.8356713426854,280.8416833667335,282.84769539078155,284.85370741482967,286.85971943887773,288.86573146292585,290.87174348697397,292.87775551102203,294.88376753507015,296.8897795591182,298.89579158316633,300.90180360721445,302.9078156312625,304.9138276553106,306.91983967935874,308.9258517034068,310.9318637274549,312.937875751503,314.9438877755511,316.9498997995992,318.9559118236473,320.9619238476954,322.96793587174346,324.9739478957916,326.9799599198397,328.98597194388776,330.9919839679359,332.99799599198394,335.00400801603206,337.0100200400802,339.01603206412824,341.02204408817636,343.0280561122245,345.03406813627254,347.04008016032066,349.0460921843687,351.05210420841684,353.05811623246495,355.064128256513,357.07014028056113,359.0761523046092,361.0821643286573,363.08817635270543,365.0941883767535,367.1002004008016,369.1062124248497,371.1122244488978,373.1182364729459,375.12424849699397,377.1302605210421,379.1362725450902,381.14228456913827,383.1482965931864,385.15430861723445,387.16032064128257,389.1663326653307,391.17234468937875,393.17835671342687,395.1843687374749,397.19038076152304,399.19639278557116,401.2024048096192,403.20841683366734,405.2144288577154,407.2204408817635,409.22645290581164,411.2324649298597,413.2384769539078,415.24448897795594,417.250501002004,419.2565130260521,421.2625250501002,423.2685370741483,425.2745490981964,427.2805611222445,429.2865731462926,431.29258517034066,433.2985971943888,435.3046092184369,437.31062124248496,439.3166332665331,441.32264529058114,443.32865731462925,445.3346693386774,447.34068136272543,449.34669338677355,451.35270541082167,453.35871743486973,455.36472945891785,457.3707414829659,459.37675350701403,461.38276553106215,463.3887775551102,465.3947895791583,467.4008016032064,469.4068136272545,471.4128256513026,473.4188376753507,475.4248496993988,477.43086172344687,479.436873747495,481.4428857715431,483.44889779559117,485.4549098196393,487.4609218436874,489.46693386773546,491.4729458917836,493.47895791583164,495.48496993987976,497.4909819639279,499.49699398797594,501.50300601202406,503.5090180360721,505.51503006012024,507.52104208416836,509.5270541082164,511.53306613226454,513.5390781563126,515.5450901803607,517.5511022044088,519.557114228457,521.563126252505,523.5691382765531,525.5751503006012,527.5811623246493,529.5871743486974,531.5931863727454,533.5991983967936,535.6052104208417,537.6112224448898,539.6172344689379,541.623246492986,543.629258517034,545.6352705410821,547.6412825651303,549.6472945891784,551.6533066132265,553.6593186372745,555.6653306613226,557.6713426853707,559.6773547094189,561.683366733467,563.689378757515,565.6953907815631,567.7014028056112,569.7074148296593,571.7134268537075,573.7194388777555,575.7254509018036,577.7314629258517,579.7374749498998,581.7434869739479,583.7494989979959,585.7555110220441,587.7615230460922,589.7675350701403,591.7735470941884,593.7795591182364,595.7855711422845,597.7915831663327,599.7975951903808,601.8036072144289,603.8096192384769,605.815631262525,607.8216432865731,609.8276553106213,611.8336673346694,613.8396793587175,615.8456913827655,617.8517034068136,619.8577154308617,621.8637274549098,623.869739478958,625.875751503006,627.8817635270541,629.8877755511022,631.8937875751503,633.8997995991984,635.9058116232464,637.9118236472946,639.9178356713427,641.9238476953908,643.9298597194389,645.9358717434869,647.941883767535,649.9478957915832,651.9539078156313,653.9599198396794,655.9659318637274,657.9719438877755,659.9779559118236,661.9839679358718,663.9899799599199,665.9959919839679,668.002004008016,670.0080160320641,672.0140280561122,674.0200400801604,676.0260521042084,678.0320641282565,680.0380761523046,682.0440881763527,684.0501002004008,686.056112224449,688.062124248497,690.0681362725451,692.0741482965932,694.0801603206413,696.0861723446894,698.0921843687374,700.0981963927856,702.1042084168337,704.1102204408818,706.1162324649299,708.1222444889779,710.128256513026,712.1342685370741,714.1402805611223,716.1462925851704,718.1523046092184,720.1583166332665,722.1643286573146,724.1703406813627,726.1763527054109,728.1823647294589,730.188376753507,732.1943887775551,734.2004008016032,736.2064128256513,738.2124248496993,740.2184368737475,742.2244488977956,744.2304609218437,746.2364729458918,748.2424849699398,750.2484969939879,752.2545090180361,754.2605210420842,756.2665330661323,758.2725450901804,760.2785571142284,762.2845691382765,764.2905811623247,766.2965931863728,768.3026052104209,770.3086172344689,772.314629258517,774.3206412825651,776.3266533066133,778.3326653306614,780.3386773547094,782.3446893787575,784.3507014028056,786.3567134268537,788.3627254509018,790.3687374749499,792.374749498998,794.3807615230461,796.3867735470942,798.3927855711423,800.3987975951903,802.4048096192384,804.4108216432866,806.4168336673347,808.4228456913828,810.4288577154308,812.4348697394789,814.440881763527,816.4468937875752,818.4529058116233,820.4589178356713,822.4649298597194,824.4709418837675,826.4769539078156,828.4829659318638,830.4889779559119,832.4949899799599,834.501002004008,836.5070140280561,838.5130260521042,840.5190380761524,842.5250501002004,844.5310621242485,846.5370741482966,848.5430861723447,850.5490981963928,852.5551102204408,854.561122244489,856.5671342685371,858.5731462925852,860.5791583166333,862.5851703406813,864.5911823647294,866.5971943887776,868.6032064128257,870.6092184368738,872.6152304609218,874.6212424849699,876.627254509018,878.6332665330661,880.6392785571143,882.6452905811623,884.6513026052104,886.6573146292585,888.6633266533066,890.6693386773547,892.6753507014027,894.6813627254509,896.687374749499,898.6933867735471,900.6993987975952,902.7054108216433,904.7114228456913,906.7174348697395,908.7234468937876,910.7294589178357,912.7354709418838,914.7414829659318,916.7474949899799,918.7535070140281,920.7595190380762,922.7655310621243,924.7715430861723,926.7775551102204,928.7835671342685,930.7895791583167,932.7955911823648,934.8016032064128,936.8076152304609,938.813627254509,940.8196392785571,942.8256513026053,944.8316633266533,946.8376753507014,948.8436873747495,950.8496993987976,952.8557114228457,954.8617234468937,956.8677354709419,958.87374749499,960.8797595190381,962.8857715430862,964.8917835671342,966.8977955911823,968.9038076152304,970.9098196392786,972.9158316633267,974.9218436873748,976.9278557114228,978.9338677354709,980.939879759519,982.9458917835672,984.9519038076153,986.9579158316633,988.9639278557114,990.9699398797595,992.9759519038076,994.9819639278558,996.9879759519038,998.9939879759519,1001.0]}

},{}],33:[function(require,module,exports){
module.exports={"expected":[0.0,0.0020040080416947603,0.004008016083389521,0.006012023892253637,0.008016032166779041,0.010020039975643158,0.012024047784507275,0.014028056524693966,0.016032064333558083,0.018036073073744774,0.020040079951286316,0.022044088691473007,0.02404809556901455,0.02605210430920124,0.028056113049387932,0.030060119926929474,0.032064128667116165,0.034068137407302856,0.03607214614748955,0.03807615116238594,0.04008015990257263,0.04208416864275932,0.044088177382946014,0.046092186123132706,0.0480961911380291,0.05010019987821579,0.05210420861840248,0.05410821735858917,0.056112226098775864,0.058116231113672256,0.06012023985385895,0.06212424859404564,0.06412825733423233,0.06613226234912872,0.06813627481460571,0.0701402798295021,0.0721442922949791,0.07414829730987549,0.07615230232477188,0.07815631479024887,0.08016031980514526,0.08216433227062225,0.08416833728551865,0.08617234230041504,0.08817635476589203,0.09018035978078842,0.09218437224626541,0.0941883772611618,0.0961923822760582,0.09819639474153519,0.10020039975643158,0.10220441222190857,0.10420841723680496,0.10621242225170135,0.10821643471717834,0.11022043973207474,0.11222445219755173,0.11422845721244812,0.11623246222734451,0.1182364746928215,0.1202404797077179,0.12224449217319489,0.12424849718809128,0.12625250220298767,0.12825651466846466,0.13026052713394165,0.13226452469825745,0.13426853716373444,0.13627254962921143,0.13827654719352722,0.1402805596590042,0.1422845721244812,0.1442885845899582,0.146292582154274,0.14829659461975098,0.15030060708522797,0.15230460464954376,0.15430861711502075,0.15631262958049774,0.15831662714481354,0.16032063961029053,0.16232465207576752,0.1643286645412445,0.1663326621055603,0.1683366745710373,0.17034068703651428,0.17234468460083008,0.17434869706630707,0.17635270953178406,0.17835670709609985,0.18036071956157684,0.18236473202705383,0.18436874449253082,0.18637274205684662,0.1883767545223236,0.1903807669878006,0.1923847645521164,0.19438877701759338,0.19639278948307037,0.19839678704738617,0.20040079951286316,0.20240481197834015,0.20440882444381714,0.20641282200813293,0.20841683447360992,0.21042084693908691,0.2124248445034027,0.2144288569688797,0.2164328694343567,0.21843686699867249,0.22044087946414948,0.22244489192962646,0.22444890439510345,0.22645290195941925,0.22845691442489624,0.23046092689037323,0.23246492445468903,0.23446893692016602,0.236472949385643,0.2384769469499588,0.2404809594154358,0.24248497188091278,0.24448898434638977,0.24649298191070557,0.24849699437618256,0.25050100684165955,0.25250500440597534,0.2545090317726135,0.2565130293369293,0.2585170269012451,0.2605210542678833,0.2625250518321991,0.2645290493965149,0.2665330767631531,0.26853707432746887,0.27054107189178467,0.27254509925842285,0.27454909682273865,0.27655309438705444,0.2785571217536926,0.2805611193180084,0.2825651168823242,0.2845691442489624,0.2865731418132782,0.2885771691799164,0.2905811667442322,0.292585164308548,0.29458919167518616,0.29659318923950195,0.29859718680381775,0.30060121417045593,0.30260521173477173,0.3046092092990875,0.3066132366657257,0.3086172342300415,0.3106212317943573,0.3126252591609955,0.3146292567253113,0.3166332542896271,0.31863728165626526,0.32064127922058105,0.32264527678489685,0.32464930415153503,0.32665330171585083,0.328657329082489,0.3306613266468048,0.3326653242111206,0.3346693515777588,0.3366733491420746,0.3386773467063904,0.34068137407302856,0.34268537163734436,0.34468936920166016,0.34669339656829834,0.34869739413261414,0.35070139169692993,0.3527054190635681,0.3547094166278839,0.3567134141921997,0.3587174415588379,0.3607214391231537,0.3627254366874695,0.36472946405410767,0.36673346161842346,0.36873748898506165,0.37074148654937744,0.37274548411369324,0.3747495114803314,0.3767535090446472,0.378757506608963,0.3807615339756012,0.382765531539917,0.3847695291042328,0.38677355647087097,0.38877755403518677,0.39078155159950256,0.39278557896614075,0.39478957653045654,0.39679357409477234,0.3987976014614105,0.4008015990257263,0.4028055965900421,0.4048096239566803,0.4068136215209961,0.4088176488876343,0.4108216464519501,0.41282564401626587,0.41482967138290405,0.41683366894721985,0.41883766651153564,0.42084169387817383,0.4228456914424896,0.4248496890068054,0.4268537163734436,0.4288577139377594,0.4308617115020752,0.4328657388687134,0.4348697364330292,0.43687373399734497,0.43887776136398315,0.44088175892829895,0.44288578629493713,0.44488978385925293,0.4468937814235687,0.4488978087902069,0.4509018063545227,0.4529058039188385,0.4549098312854767,0.4569138288497925,0.4589178264141083,0.46092185378074646,0.46292585134506226,0.46492984890937805,0.46693387627601624,0.46893787384033203,0.4709418714046478,0.472945898771286,0.4749498963356018,0.4769538938999176,0.4789579212665558,0.4809619188308716,0.48296594619750977,0.48496994376182556,0.48697394132614136,0.48897796869277954,0.49098196625709534,0.49298596382141113,0.4949899911880493,0.4969939887523651,0.4989979863166809,0.5010020136833191,0.5030060410499573,0.5050100088119507,0.5070140361785889,0.509018063545227,0.5110220313072205,0.5130260586738586,0.5150300860404968,0.5170340538024902,0.5190380811691284,0.5210421085357666,0.52304607629776,0.5250501036643982,0.5270541310310364,0.5290580987930298,0.531062126159668,0.5330661535263062,0.5350701212882996,0.5370741486549377,0.5390781760215759,0.5410821437835693,0.5430861711502075,0.5450901985168457,0.5470941662788391,0.5490981936454773,0.5511022210121155,0.5531061887741089,0.5551102161407471,0.5571142435073853,0.5591182112693787,0.5611222386360168,0.563126266002655,0.5651302337646484,0.5671342611312866,0.5691382884979248,0.5711422562599182,0.5731462836265564,0.5751503109931946,0.5771543383598328,0.5791583061218262,0.5811623334884644,0.5831663608551025,0.585170328617096,0.5871743559837341,0.5891783833503723,0.5911823511123657,0.5931863784790039,0.5951904058456421,0.5971943736076355,0.5991984009742737,0.6012024283409119,0.6032063961029053,0.6052104234695435,0.6072144508361816,0.609218418598175,0.6112224459648132,0.6132264733314514,0.6152304410934448,0.617234468460083,0.6192384958267212,0.6212424635887146,0.6232464909553528,0.625250518321991,0.6272544860839844,0.6292585134506226,0.6312625408172607,0.6332665085792542,0.6352705359458923,0.6372745633125305,0.6392785310745239,0.6412825584411621,0.6432865858078003,0.6452905535697937,0.6472945809364319,0.6492986083030701,0.6513025760650635,0.6533066034317017,0.6553106307983398,0.657314658164978,0.6593186259269714,0.6613226532936096,0.6633266806602478,0.6653306484222412,0.6673346757888794,0.6693387031555176,0.671342670917511,0.6733466982841492,0.6753507256507874,0.6773546934127808,0.679358720779419,0.6813627481460571,0.6833667159080505,0.6853707432746887,0.6873747706413269,0.6893787384033203,0.6913827657699585,0.6933867931365967,0.6953907608985901,0.6973947882652283,0.6993988156318665,0.7014027833938599,0.703406810760498,0.7054108381271362,0.7074148058891296,0.7094188332557678,0.711422860622406,0.7134268283843994,0.7154308557510376,0.7174348831176758,0.7194388508796692,0.7214428782463074,0.7234469056129456,0.725450873374939,0.7274549007415771,0.7294589281082153,0.7314629554748535,0.7334669232368469,0.7354709506034851,0.7374749779701233,0.7394789457321167,0.7414829730987549,0.7434870004653931,0.7454909682273865,0.7474949955940247,0.7494990229606628,0.7515029907226562,0.7535070180892944,0.7555110454559326,0.757515013217926,0.7595190405845642,0.7615230679512024,0.7635270357131958,0.765531063079834,0.7675350904464722,0.7695390582084656,0.7715430855751038,0.7735471129417419,0.7755510807037354,0.7775551080703735,0.7795591354370117,0.7815631031990051,0.7835671305656433,0.7855711579322815,0.7875751256942749,0.7895791530609131,0.7915831804275513,0.7935871481895447,0.7955911755561829,0.797595202922821,0.7995991706848145,0.8016031980514526,0.8036072254180908,0.8056111931800842,0.8076152205467224,0.8096192479133606,0.8116232752799988,0.8136272430419922,0.8156312704086304,0.8176352977752686,0.819639265537262,0.8216432929039001,0.8236473202705383,0.8256512880325317,0.8276553153991699,0.8296593427658081,0.8316633105278015,0.8336673378944397,0.8356713652610779,0.8376753330230713,0.8396793603897095,0.8416833877563477,0.8436873555183411,0.8456913828849792,0.8476954102516174,0.8496993780136108,0.851703405380249,0.8537074327468872,0.8557114005088806,0.8577154278755188,0.859719455242157,0.8617234230041504,0.8637274503707886,0.8657314777374268,0.8677354454994202,0.8697394728660583,0.8717435002326965,0.8737474679946899,0.8757514953613281,0.8777555227279663,0.8797594904899597,0.8817635178565979,0.8837675452232361,0.8857715725898743,0.8877755403518677,0.8897795677185059,0.891783595085144,0.8937875628471375,0.8957915902137756,0.8977956175804138,0.8997995853424072,0.9018036127090454,0.9038076400756836,0.905811607837677,0.9078156352043152,0.9098196625709534,0.9118236303329468,0.913827657699585,0.9158316850662231,0.9178356528282166,0.9198396801948547,0.9218437075614929,0.9238476753234863,0.9258517026901245,0.9278557300567627,0.9298596978187561,0.9318637251853943,0.9338677525520325,0.9358717203140259,0.9378757476806641,0.9398797750473022,0.9418837428092957,0.9438877701759338,0.945891797542572,0.9478957653045654,0.9498997926712036,0.9519038200378418,0.9539077877998352,0.9559118151664734,0.9579158425331116,0.959919810295105,0.9619238376617432,0.9639278650283813,0.9659318923950195,0.9679358601570129,0.9699398875236511,0.9719439148902893,0.9739478826522827,0.9759519100189209,0.9779559373855591,0.9799599051475525,0.9819639325141907,0.9839679598808289,0.9859719276428223,0.9879759550094604,0.9899799823760986,0.991983950138092,0.9939879775047302,0.9959920048713684,0.9979959726333618,1.0],"x":[0.0,0.002004008016032064,0.004008016032064128,0.006012024048096192,0.008016032064128256,0.01002004008016032,0.012024048096192385,0.014028056112224449,0.01603206412825651,0.018036072144288578,0.02004008016032064,0.022044088176352707,0.02404809619238477,0.026052104208416832,0.028056112224448898,0.03006012024048096,0.03206412825651302,0.03406813627254509,0.036072144288577156,0.03807615230460922,0.04008016032064128,0.04208416833667335,0.04408817635270541,0.04609218436873747,0.04809619238476954,0.050100200400801605,0.052104208416833664,0.05410821643286573,0.056112224448897796,0.05811623246492986,0.06012024048096192,0.06212424849699399,0.06412825651302605,0.06613226452905811,0.06813627254509018,0.07014028056112225,0.07214428857715431,0.07414829659318638,0.07615230460921844,0.0781563126252505,0.08016032064128256,0.08216432865731463,0.0841683366733467,0.08617234468937876,0.08817635270541083,0.09018036072144289,0.09218436873747494,0.09418837675350701,0.09619238476953908,0.09819639278557114,0.10020040080160321,0.10220440881763528,0.10420841683366733,0.1062124248496994,0.10821643286573146,0.11022044088176353,0.11222444889779559,0.11422845691382766,0.11623246492985972,0.11823647294589178,0.12024048096192384,0.12224448897795591,0.12424849699398798,0.12625250501002003,0.1282565130260521,0.13026052104208416,0.13226452905811623,0.1342685370741483,0.13627254509018036,0.13827655310621242,0.1402805611222445,0.14228456913827656,0.14428857715430862,0.1462925851703407,0.14829659318637275,0.15030060120240482,0.1523046092184369,0.15430861723446893,0.156312625250501,0.15831663326653306,0.16032064128256512,0.1623246492985972,0.16432865731462926,0.16633266533066132,0.1683366733466934,0.17034068136272545,0.17234468937875752,0.1743486973947896,0.17635270541082165,0.17835671342685372,0.18036072144288579,0.18236472945891782,0.1843687374749499,0.18637274549098196,0.18837675350701402,0.1903807615230461,0.19238476953907815,0.19438877755511022,0.1963927855711423,0.19839679358717435,0.20040080160320642,0.20240480961923848,0.20440881763527055,0.20641282565130262,0.20841683366733466,0.21042084168336672,0.2124248496993988,0.21442885771543085,0.21643286573146292,0.218436873747495,0.22044088176352705,0.22244488977955912,0.22444889779559118,0.22645290581162325,0.22845691382765532,0.23046092184368738,0.23246492985971945,0.23446893787575152,0.23647294589178355,0.23847695390781562,0.24048096192384769,0.24248496993987975,0.24448897795591182,0.24649298597194388,0.24849699398797595,0.250501002004008,0.25250501002004005,0.2545090180360721,0.2565130260521042,0.25851703406813625,0.2605210420841683,0.2625250501002004,0.26452905811623245,0.2665330661322645,0.2685370741482966,0.27054108216432865,0.2725450901803607,0.2745490981963928,0.27655310621242485,0.2785571142284569,0.280561122244489,0.28256513026052105,0.2845691382765531,0.2865731462925852,0.28857715430861725,0.2905811623246493,0.2925851703406814,0.29458917835671344,0.2965931863727455,0.2985971943887776,0.30060120240480964,0.3026052104208417,0.3046092184368738,0.3066132264529058,0.30861723446893785,0.3106212424849699,0.312625250501002,0.31462925851703405,0.3166332665330661,0.3186372745490982,0.32064128256513025,0.3226452905811623,0.3246492985971944,0.32665330661322645,0.3286573146292585,0.3306613226452906,0.33266533066132264,0.3346693386773547,0.3366733466933868,0.33867735470941884,0.3406813627254509,0.342685370741483,0.34468937875751504,0.3466933867735471,0.3486973947895792,0.35070140280561124,0.3527054108216433,0.35470941883767537,0.35671342685370744,0.3587174348697395,0.36072144288577157,0.3627254509018036,0.36472945891783565,0.3667334669338677,0.3687374749498998,0.37074148296593185,0.3727454909819639,0.374749498997996,0.37675350701402804,0.3787575150300601,0.3807615230460922,0.38276553106212424,0.3847695390781563,0.3867735470941884,0.38877755511022044,0.3907815631262525,0.3927855711422846,0.39478957915831664,0.3967935871743487,0.39879759519038077,0.40080160320641284,0.4028056112224449,0.40480961923847697,0.40681362725450904,0.4088176352705411,0.41082164328657317,0.41282565130260523,0.4148296593186373,0.4168336673346693,0.4188376753507014,0.42084168336673344,0.4228456913827655,0.4248496993987976,0.42685370741482964,0.4288577154308617,0.4308617234468938,0.43286573146292584,0.4348697394789579,0.43687374749499,0.43887775551102204,0.4408817635270541,0.44288577154308617,0.44488977955911824,0.4468937875751503,0.44889779559118237,0.45090180360721444,0.4529058116232465,0.45490981963927857,0.45691382765531063,0.4589178356713427,0.46092184368737477,0.46292585170340683,0.4649298597194389,0.46693386773547096,0.46893787575150303,0.4709418837675351,0.4729458917835671,0.4749498997995992,0.47695390781563124,0.4789579158316633,0.48096192384769537,0.48296593186372744,0.4849699398797595,0.48697394789579157,0.48897795591182364,0.4909819639278557,0.49298597194388777,0.49498997995991983,0.4969939879759519,0.49899799599198397,0.501002004008016,0.503006012024048,0.5050100200400801,0.5070140280561122,0.5090180360721442,0.5110220440881763,0.5130260521042084,0.5150300601202404,0.5170340681362725,0.5190380761523046,0.5210420841683366,0.5230460921843687,0.5250501002004008,0.5270541082164328,0.5290581162324649,0.531062124248497,0.533066132264529,0.5350701402805611,0.5370741482965932,0.5390781563126252,0.5410821643286573,0.5430861723446894,0.5450901803607214,0.5470941883767535,0.5490981963927856,0.5511022044088176,0.5531062124248497,0.5551102204408818,0.5571142284569138,0.5591182364729459,0.561122244488978,0.56312625250501,0.5651302605210421,0.5671342685370742,0.5691382765531062,0.5711422845691383,0.5731462925851704,0.5751503006012024,0.5771543086172345,0.5791583166332666,0.5811623246492986,0.5831663326653307,0.5851703406813628,0.5871743486973948,0.5891783567134269,0.591182364729459,0.593186372745491,0.5951903807615231,0.5971943887775552,0.5991983967935872,0.6012024048096193,0.6032064128256514,0.6052104208416834,0.6072144288577155,0.6092184368737475,0.6112224448897795,0.6132264529058116,0.6152304609218436,0.6172344689378757,0.6192384769539078,0.6212424849699398,0.6232464929859719,0.625250501002004,0.627254509018036,0.6292585170340681,0.6312625250501002,0.6332665330661322,0.6352705410821643,0.6372745490981964,0.6392785571142284,0.6412825651302605,0.6432865731462926,0.6452905811623246,0.6472945891783567,0.6492985971943888,0.6513026052104208,0.6533066132264529,0.655310621242485,0.657314629258517,0.6593186372745491,0.6613226452905812,0.6633266533066132,0.6653306613226453,0.6673346693386774,0.6693386773547094,0.6713426853707415,0.6733466933867736,0.6753507014028056,0.6773547094188377,0.6793587174348698,0.6813627254509018,0.6833667334669339,0.685370741482966,0.687374749498998,0.6893787575150301,0.6913827655310621,0.6933867735470942,0.6953907815631263,0.6973947895791583,0.6993987975951904,0.7014028056112225,0.7034068136272545,0.7054108216432866,0.7074148296593187,0.7094188376753507,0.7114228456913828,0.7134268537074149,0.7154308617234469,0.717434869739479,0.7194388777555111,0.7214428857715431,0.7234468937875751,0.7254509018036072,0.7274549098196392,0.7294589178356713,0.7314629258517034,0.7334669338677354,0.7354709418837675,0.7374749498997996,0.7394789579158316,0.7414829659318637,0.7434869739478958,0.7454909819639278,0.7474949899799599,0.749498997995992,0.751503006012024,0.7535070140280561,0.7555110220440882,0.7575150300601202,0.7595190380761523,0.7615230460921844,0.7635270541082164,0.7655310621242485,0.7675350701402806,0.7695390781563126,0.7715430861723447,0.7735470941883767,0.7755511022044088,0.7775551102204409,0.779559118236473,0.781563126252505,0.7835671342685371,0.7855711422845691,0.7875751503006012,0.7895791583166333,0.7915831663326653,0.7935871743486974,0.7955911823647295,0.7975951903807615,0.7995991983967936,0.8016032064128257,0.8036072144288577,0.8056112224448898,0.8076152304609219,0.8096192384769539,0.811623246492986,0.8136272545090181,0.8156312625250501,0.8176352705410822,0.8196392785571143,0.8216432865731463,0.8236472945891784,0.8256513026052105,0.8276553106212425,0.8296593186372746,0.8316633266533067,0.8336673346693386,0.8356713426853707,0.8376753507014028,0.8396793587174348,0.8416833667334669,0.843687374749499,0.845691382765531,0.8476953907815631,0.8496993987975952,0.8517034068136272,0.8537074148296593,0.8557114228456913,0.8577154308617234,0.8597194388777555,0.8617234468937875,0.8637274549098196,0.8657314629258517,0.8677354709418837,0.8697394789579158,0.8717434869739479,0.87374749498998,0.875751503006012,0.8777555110220441,0.8797595190380761,0.8817635270541082,0.8837675350701403,0.8857715430861723,0.8877755511022044,0.8897795591182365,0.8917835671342685,0.8937875751503006,0.8957915831663327,0.8977955911823647,0.8997995991983968,0.9018036072144289,0.9038076152304609,0.905811623246493,0.9078156312625251,0.9098196392785571,0.9118236472945892,0.9138276553106213,0.9158316633266533,0.9178356713426854,0.9198396793587175,0.9218436873747495,0.9238476953907816,0.9258517034068137,0.9278557114228457,0.9298597194388778,0.9318637274549099,0.9338677354709419,0.935871743486974,0.9378757515030061,0.9398797595190381,0.9418837675350702,0.9438877755511023,0.9458917835671342,0.9478957915831663,0.9498997995991983,0.9519038076152304,0.9539078156312625,0.9559118236472945,0.9579158316633266,0.9599198396793587,0.9619238476953907,0.9639278557114228,0.9659318637274549,0.9679358717434869,0.969939879759519,0.9719438877755511,0.9739478957915831,0.9759519038076152,0.9779559118236473,0.9799599198396793,0.9819639278557114,0.9839679358717435,0.9859719438877755,0.9879759519038076,0.9899799599198397,0.9919839679358717,0.9939879759519038,0.9959919839679359,0.9979959919839679,1.0]}

},{}],34:[function(require,module,exports){
module.exports={"expected":[9.99994610111476e-41,9.979907533074915e-41,9.95986896503507e-41,9.939830396995225e-41,9.91979182895538e-41,9.899753260915535e-41,9.87971469287569e-41,9.859676124835845e-41,9.839637556796e-41,9.819598988756156e-41,9.79956042071631e-41,9.779521852676466e-41,9.75948328463662e-41,9.739444716596776e-41,9.719406148556931e-41,9.699367580517086e-41,9.679329012477241e-41,9.659290444437397e-41,9.639251876397552e-41,9.619213308357707e-41,9.599174740317862e-41,9.579136172278017e-41,9.559097604238172e-41,9.539059036198327e-41,9.519020468158482e-41,9.498981900118637e-41,9.478943332078793e-41,9.458904764038948e-41,9.438866195999103e-41,9.418827627959258e-41,9.398789059919413e-41,9.378750491879568e-41,9.358711923839723e-41,9.338673355799878e-41,9.318634787760034e-41,9.298596219720189e-41,9.278557651680344e-41,9.258519083640499e-41,9.238480515600654e-41,9.21844194756081e-41,9.198403379520964e-41,9.178364811481119e-41,9.158326243441274e-41,9.13828767540143e-41,9.118249107361585e-41,9.09821053932174e-41,9.078171971281895e-41,9.05813340324205e-41,9.038094835202205e-41,9.01805626716236e-41,8.998017699122515e-41,8.97797913108267e-41,8.957940563042826e-41,8.937901995002981e-41,8.917863426963136e-41,8.897824858923291e-41,8.877786290883446e-41,8.857747722843601e-41,8.837709154803756e-41,8.817670586763911e-41,8.797632018724067e-41,8.777593450684222e-41,8.757554882644377e-41,8.737516314604532e-41,8.717477746564687e-41,8.697439178524842e-41,8.677400610484997e-41,8.657362042445152e-41,8.637323474405307e-41,8.617284906365463e-41,8.597246338325618e-41,8.577207770285773e-41,8.557169202245928e-41,8.537130634206083e-41,8.517092066166238e-41,8.497053498126393e-41,8.477014930086548e-41,8.456976362046704e-41,8.436937794006859e-41,8.416899225967014e-41,8.396860657927169e-41,8.376822089887324e-41,8.356783521847479e-41,8.336744953807634e-41,8.316706385767789e-41,8.296667817727944e-41,8.2766292496881e-41,8.256590681648255e-41,8.23655211360841e-41,8.216513545568565e-41,8.19647497752872e-41,8.176436409488875e-41,8.15639784144903e-41,8.136359273409185e-41,8.11632070536934e-41,8.096142007483063e-41,8.076103439443218e-41,8.056064871403373e-41,8.036026303363528e-41,8.015987735323684e-41,7.995949167283839e-41,7.975910599243994e-41,7.955872031204149e-41,7.935833463164304e-41,7.915794895124459e-41,7.895756327084614e-41,7.875717759044769e-41,7.855679191004924e-41,7.83564062296508e-41,7.815602054925235e-41,7.79556348688539e-41,7.775524918845545e-41,7.7554863508057e-41,7.735447782765855e-41,7.71540921472601e-41,7.695370646686165e-41,7.675332078646321e-41,7.655293510606476e-41,7.635254942566631e-41,7.615216374526786e-41,7.595177806486941e-41,7.575139238447096e-41,7.555100670407251e-41,7.535062102367406e-41,7.515023534327561e-41,7.494984966287717e-41,7.474946398247872e-41,7.454907830208027e-41,7.434869262168182e-41,7.414830694128337e-41,7.394792126088492e-41,7.374753558048647e-41,7.354714990008802e-41,7.334676421968958e-41,7.314637853929113e-41,7.294599285889268e-41,7.274560717849423e-41,7.254522149809578e-41,7.234483581769733e-41,7.214445013729888e-41,7.194406445690043e-41,7.174367877650198e-41,7.154329309610354e-41,7.134290741570509e-41,7.114252173530664e-41,7.094213605490819e-41,7.074175037450974e-41,7.054136469411129e-41,7.034097901371284e-41,7.014059333331439e-41,6.994020765291594e-41,6.97398219725175e-41,6.953943629211905e-41,6.93390506117206e-41,6.913866493132215e-41,6.89382792509237e-41,6.873789357052525e-41,6.85375078901268e-41,6.833712220972835e-41,6.813673652932991e-41,6.793635084893146e-41,6.773596516853301e-41,6.753557948813456e-41,6.733519380773611e-41,6.713480812733766e-41,6.693442244693921e-41,6.673403676654076e-41,6.653365108614231e-41,6.633326540574387e-41,6.613287972534542e-41,6.593249404494697e-41,6.573210836454852e-41,6.553172268415007e-41,6.533133700375162e-41,6.513095132335317e-41,6.493056564295472e-41,6.473017996255627e-41,6.452979428215783e-41,6.432940860175938e-41,6.412902292136093e-41,6.392863724096248e-41,6.372825156056403e-41,6.352786588016558e-41,6.332748019976713e-41,6.312709451936868e-41,6.292670883897024e-41,6.272632315857179e-41,6.252593747817334e-41,6.232555179777489e-41,6.212516611737644e-41,6.192478043697799e-41,6.172439475657954e-41,6.152400907618109e-41,6.132362339578264e-41,6.11232377153842e-41,6.092285203498575e-41,6.07224663545873e-41,6.052208067418885e-41,6.03216949937904e-41,6.012130931339195e-41,5.99209236329935e-41,5.972053795259505e-41,5.951875097373228e-41,5.931836529333383e-41,5.911797961293538e-41,5.891759393253693e-41,5.871720825213848e-41,5.851682257174004e-41,5.831643689134159e-41,5.811605121094314e-41,5.791566553054469e-41,5.771527985014624e-41,5.751489416974779e-41,5.731450848934934e-41,5.711412280895089e-41,5.691373712855245e-41,5.6713351448154e-41,5.651296576775555e-41,5.63125800873571e-41,5.611219440695865e-41,5.59118087265602e-41,5.571142304616175e-41,5.55110373657633e-41,5.531065168536485e-41,5.511026600496641e-41,5.490988032456796e-41,5.470949464416951e-41,5.450910896377106e-41,5.430872328337261e-41,5.410833760297416e-41,5.390795192257571e-41,5.370756624217726e-41,5.350718056177882e-41,5.330679488138037e-41,5.310640920098192e-41,5.290602352058347e-41,5.270563784018502e-41,5.250525215978657e-41,5.230486647938812e-41,5.210448079898967e-41,5.190409511859122e-41,5.170370943819278e-41,5.150332375779433e-41,5.130293807739588e-41,5.110255239699743e-41,5.090216671659898e-41,5.070178103620053e-41,5.050139535580208e-41,5.030100967540363e-41,5.010062399500518e-41,4.990023831460674e-41,4.969985263420829e-41,4.949946695380984e-41,4.929908127341139e-41,4.909869559301294e-41,4.889830991261449e-41,4.869792423221604e-41,4.849753855181759e-41,4.829715287141915e-41,4.80967671910207e-41,4.789638151062225e-41,4.76959958302238e-41,4.749561014982535e-41,4.72952244694269e-41,4.709483878902845e-41,4.689445310863e-41,4.669406742823155e-41,4.649368174783311e-41,4.629329606743466e-41,4.609291038703621e-41,4.589252470663776e-41,4.569213902623931e-41,4.549175334584086e-41,4.5291367665442413e-41,4.5090981985043964e-41,4.4890596304645515e-41,4.4690210624247066e-41,4.4489824943848617e-41,4.428943926345017e-41,4.408905358305172e-41,4.388866790265327e-41,4.368828222225482e-41,4.3487896541856373e-41,4.3287510861457924e-41,4.3087125181059475e-41,4.2886739500661026e-41,4.268635382026258e-41,4.248596813986413e-41,4.228558245946568e-41,4.208519677906723e-41,4.188481109866878e-41,4.1684425418270333e-41,4.1484039737871885e-41,4.1283654057473436e-41,4.1083268377074987e-41,4.088288269667654e-41,4.068249701627809e-41,4.048211133587964e-41,4.028172565548119e-41,4.0081339975082743e-41,3.9880954294684294e-41,3.9680568614285845e-41,3.9480182933887396e-41,3.9279797253488947e-41,3.90794115730905e-41,3.887902589269205e-41,3.86786402122936e-41,3.847825453189515e-41,3.8277868851496703e-41,3.807608187263393e-41,3.787569619223548e-41,3.767531051183703e-41,3.7474924831438583e-41,3.7274539151040134e-41,3.7074153470641685e-41,3.6873767790243236e-41,3.667338210984479e-41,3.647299642944634e-41,3.627261074904789e-41,3.607222506864944e-41,3.587183938825099e-41,3.5671453707852543e-41,3.5471068027454095e-41,3.5270682347055646e-41,3.5070296666657197e-41,3.486991098625875e-41,3.46695253058603e-41,3.446913962546185e-41,3.42687539450634e-41,3.4068368264664953e-41,3.3867982584266504e-41,3.3667596903868055e-41,3.3467211223469606e-41,3.3266825543071157e-41,3.306643986267271e-41,3.286605418227426e-41,3.266566850187581e-41,3.246528282147736e-41,3.2264897141078913e-41,3.2064511460680464e-41,3.1864125780282015e-41,3.1663740099883567e-41,3.146335441948512e-41,3.126296873908667e-41,3.106258305868822e-41,3.086219737828977e-41,3.066181169789132e-41,3.0461426017492873e-41,3.0261040337094425e-41,3.0060654656695976e-41,2.9860268976297527e-41,2.965988329589908e-41,2.945949761550063e-41,2.925911193510218e-41,2.905872625470373e-41,2.8858340574305283e-41,2.8657954893906834e-41,2.8457569213508385e-41,2.8257183533109936e-41,2.8056797852711487e-41,2.785641217231304e-41,2.765602649191459e-41,2.745564081151614e-41,2.725525513111769e-41,2.7054869450719243e-41,2.6854483770320794e-41,2.6654098089922346e-41,2.6453712409523897e-41,2.625332672912545e-41,2.6052941048727e-41,2.585255536832855e-41,2.56521696879301e-41,2.545178400753165e-41,2.5251398327133204e-41,2.5051012646734755e-41,2.4850626966336306e-41,2.4650241285937857e-41,2.444985560553941e-41,2.424946992514096e-41,2.404908424474251e-41,2.384869856434406e-41,2.3648312883945613e-41,2.3447927203547164e-41,2.3247541523148715e-41,2.3047155842750266e-41,2.2846770162351818e-41,2.2646384481953369e-41,2.244599880155492e-41,2.224561312115647e-41,2.2045227440758022e-41,2.1844841760359573e-41,2.1644456079961124e-41,2.1444070399562676e-41,2.1243684719164227e-41,2.1043299038765778e-41,2.084291335836733e-41,2.064252767796888e-41,2.0442141997570431e-41,2.0241756317171983e-41,2.0041370636773534e-41,1.9840984956375085e-41,1.9640599275976636e-41,1.9440213595578187e-41,1.9239827915179738e-41,1.903944223478129e-41,1.883905655438284e-41,1.8638670873984392e-41,1.8438285193585943e-41,1.8237899513187494e-41,1.8037513832789045e-41,1.7837128152390596e-41,1.7636742471992148e-41,1.74363567915937e-41,1.723597111119525e-41,1.70355854307968e-41,1.6833798451934027e-41,1.6633412771535579e-41,1.643302709113713e-41,1.623264141073868e-41,1.6032255730340232e-41,1.5831870049941783e-41,1.5631484369543334e-41,1.5431098689144886e-41,1.5230713008746437e-41,1.5030327328347988e-41,1.482994164794954e-41,1.462955596755109e-41,1.4429170287152641e-41,1.4228784606754193e-41,1.4028398926355744e-41,1.3828013245957295e-41,1.3627627565558846e-41,1.3427241885160397e-41,1.3226856204761948e-41,1.30264705243635e-41,1.282608484396505e-41,1.2625699163566602e-41,1.2425313483168153e-41,1.2224927802769704e-41,1.2024542122371255e-41,1.1824156441972806e-41,1.1623770761574358e-41,1.1423385081175909e-41,1.122299940077746e-41,1.1022613720379011e-41,1.0822228039980562e-41,1.0621842359582113e-41,1.0421456679183665e-41,1.0221070998785216e-41,1.0020685318386767e-41,9.820299637988318e-42,9.619913957589869e-42,9.41952827719142e-42,9.219142596792972e-42,9.018756916394523e-42,8.818371235996074e-42,8.617985555597625e-42,8.417599875199176e-42,8.217214194800727e-42,8.016828514402278e-42,7.81644283400383e-42,7.616057153605381e-42,7.415671473206932e-42,7.215285792808483e-42,7.014900112410034e-42,6.814514432011585e-42,6.614128751613137e-42,6.413743071214688e-42,6.213357390816239e-42,6.01297171041779e-42,5.812586030019341e-42,5.6122003496208924e-42,5.4118146692224435e-42,5.211428988823995e-42,5.011043308425546e-42,4.810657628027097e-42,4.610271947628648e-42,4.4098862672301993e-42,4.2095005868317505e-42,4.0091149064333016e-42,3.808729226034853e-42,3.608343545636404e-42,3.407957865237955e-42,3.207572184839506e-42,3.0071865044410574e-42,2.8068008240426086e-42,2.6064151436441598e-42,2.406029463245711e-42,2.205643782847262e-42,2.0052581024488132e-42,1.8048724220503644e-42,1.6044867416519155e-42,1.4041010612534667e-42,1.2037153808550179e-42,1.003329700456569e-42,8.029440200581202e-43,6.0255833965967134e-43,4.021726592612225e-43,2.0178697886277366e-43,1.401298464324817e-45],"x":[1.0e-40,9.97996012024048e-41,9.959920240480963e-41,9.939880360721443e-41,9.919840480961923e-41,9.899800601202407e-41,9.879760721442887e-41,9.859720841683367e-41,9.839680961923847e-41,9.819641082164329e-41,9.799601202404809e-41,9.77956132264529e-41,9.759521442885772e-41,9.739481563126252e-41,9.719441683366732e-41,9.699401803607214e-41,9.679361923847696e-41,9.659322044088176e-41,9.639282164328656e-41,9.619242284569138e-41,9.599202404809618e-41,9.5791625250501e-41,9.559122645290582e-41,9.539082765531062e-41,9.519042885771542e-41,9.499003006012023e-41,9.478963126252505e-41,9.458923246492985e-41,9.438883366733467e-41,9.418843486973947e-41,9.39880360721443e-41,9.37876372745491e-41,9.35872384769539e-41,9.33868396793587e-41,9.318644088176353e-41,9.298604208416833e-41,9.278564328657315e-41,9.258524448897797e-41,9.238484569138277e-41,9.218444689378756e-41,9.198404809619238e-41,9.178364929859718e-41,9.1583250501002e-41,9.138285170340681e-41,9.118245290581162e-41,9.098205410821643e-41,9.078165531062124e-41,9.058125651302605e-41,9.038085771543086e-41,9.018045891783567e-41,8.998006012024048e-41,8.977966132264529e-41,8.957926252505009e-41,8.93788637274549e-41,8.917846492985971e-41,8.897806613226452e-41,8.877766733466933e-41,8.857726853707414e-41,8.837686973947895e-41,8.817647094188376e-41,8.797607214428857e-41,8.777567334669338e-41,8.757527454909819e-41,8.7374875751503e-41,8.717447695390781e-41,8.697407815631262e-41,8.677367935871742e-41,8.657328056112223e-41,8.637288176352705e-41,8.617248296593186e-41,8.597208416833667e-41,8.577168537074148e-41,8.557128657314629e-41,8.53708877755511e-41,8.517048897795591e-41,8.497009018036072e-41,8.476969138276553e-41,8.456929258517034e-41,8.436889378757515e-41,8.416849498997995e-41,8.396809619238476e-41,8.376769739478957e-41,8.356729859719438e-41,8.336689979959919e-41,8.3166501002004e-41,8.296610220440881e-41,8.276570340681362e-41,8.256530460921843e-41,8.236490581162324e-41,8.216450701402805e-41,8.196410821643286e-41,8.176370941883767e-41,8.156331062124248e-41,8.136291182364728e-41,8.116251302605209e-41,8.096211422845691e-41,8.076171543086172e-41,8.056131663326653e-41,8.036091783567134e-41,8.016051903807615e-41,7.996012024048096e-41,7.975972144288577e-41,7.955932264529058e-41,7.935892384769539e-41,7.91585250501002e-41,7.895812625250501e-41,7.87577274549098e-41,7.855732865731462e-41,7.835692985971943e-41,7.815653106212424e-41,7.795613226452905e-41,7.775573346693386e-41,7.755533466933867e-41,7.735493587174348e-41,7.715453707414829e-41,7.69541382765531e-41,7.675373947895791e-41,7.655334068136272e-41,7.635294188376753e-41,7.615254308617234e-41,7.595214428857714e-41,7.575174549098196e-41,7.555134669338677e-41,7.535094789579158e-41,7.515054909819639e-41,7.49501503006012e-41,7.474975150300601e-41,7.454935270541082e-41,7.434895390781563e-41,7.414855511022043e-41,7.394815631262525e-41,7.374775751503006e-41,7.354735871743487e-41,7.334695991983968e-41,7.314656112224448e-41,7.294616232464929e-41,7.27457635270541e-41,7.254536472945891e-41,7.234496593186372e-41,7.214456713426853e-41,7.194416833667334e-41,7.174376953907815e-41,7.154337074148296e-41,7.134297194388777e-41,7.114257314629258e-41,7.094217434869739e-41,7.07417755511022e-41,7.054137675350699e-41,7.034097795591182e-41,7.014057915831663e-41,6.994018036072144e-41,6.973978156312625e-41,6.953938276553105e-41,6.933898396793587e-41,6.913858517034068e-41,6.893818637274549e-41,6.87377875751503e-41,6.85373887775551e-41,6.833698997995992e-41,6.813659118236473e-41,6.793619238476954e-41,6.773579358717434e-41,6.753539478957915e-41,6.733499599198396e-41,6.713459719438877e-41,6.693419839679358e-41,6.673379959919839e-41,6.65334008016032e-41,6.633300200400801e-41,6.613260320641282e-41,6.593220440881762e-41,6.573180561122244e-41,6.553140681362725e-41,6.533100801603207e-41,6.513060921843688e-41,6.493021042084167e-41,6.472981162324649e-41,6.45294128256513e-41,6.432901402805611e-41,6.412861523046092e-41,6.392821643286572e-41,6.372781763527054e-41,6.352741883767535e-41,6.332702004008016e-41,6.312662124248497e-41,6.292622244488978e-41,6.272582364729459e-41,6.25254248496994e-41,6.23250260521042e-41,6.212462725450901e-41,6.192422845691382e-41,6.172382965931863e-41,6.152343086172344e-41,6.132303206412824e-41,6.112263326653306e-41,6.092223446893787e-41,6.072183567134268e-41,6.052143687374749e-41,6.032103807615229e-41,6.012063927855711e-41,5.992024048096193e-41,5.971984168336674e-41,5.951944288577154e-41,5.931904408817634e-41,5.911864529058116e-41,5.891824649298597e-41,5.871784769539078e-41,5.851744889779559e-41,5.83170501002004e-41,5.811665130260521e-41,5.791625250501002e-41,5.771585370741483e-41,5.751545490981964e-41,5.731505611222445e-41,5.711465731462926e-41,5.691425851703406e-41,5.671385971943886e-41,5.651346092184368e-41,5.631306212424849e-41,5.61126633266533e-41,5.591226452905811e-41,5.571186573146291e-41,5.551146693386773e-41,5.531106813627254e-41,5.511066933867735e-41,5.491027054108216e-41,5.470987174348696e-41,5.450947294589179e-41,5.43090741482966e-41,5.41086753507014e-41,5.390827655310621e-41,5.370787775551102e-41,5.350747895791583e-41,5.330708016032064e-41,5.310668136272544e-41,5.290628256513026e-41,5.270588376753507e-41,5.250548496993988e-41,5.230508617234469e-41,5.210468737474949e-41,5.190428857715431e-41,5.170388977955912e-41,5.150349098196392e-41,5.130309218436873e-41,5.110269338677353e-41,5.090229458917835e-41,5.070189579158316e-41,5.050149699398797e-41,5.030109819639278e-41,5.010069939879758e-41,4.99003006012024e-41,4.969990180360721e-41,4.949950300601203e-41,4.929910420841684e-41,4.909870541082164e-41,4.889830661322646e-41,4.869790781563126e-41,4.849750901803606e-41,4.829711022044088e-41,4.809671142284569e-41,4.78963126252505e-41,4.769591382765531e-41,4.749551503006011e-41,4.729511623246493e-41,4.709471743486973e-41,4.689431863727454e-41,4.669391983967936e-41,4.649352104208417e-41,4.629312224448898e-41,4.609272344689379e-41,4.589232464929859e-41,4.5691925851703404e-41,4.549152705410822e-41,4.529112825651302e-41,4.509072945891783e-41,4.4890330661322646e-41,4.4689931863727455e-41,4.4489533066132264e-41,4.428913426853707e-41,4.408873547094188e-41,4.388833667334669e-41,4.36879378757515e-41,4.3487539078156305e-41,4.3287140280561115e-41,4.3086741482965924e-41,4.2886342685370743e-41,4.2685943887775553e-41,4.2485545090180357e-41,4.2285146292585166e-41,4.208474749498998e-41,4.188434869739479e-41,4.16839498997996e-41,4.1483551102204403e-41,4.128315230460921e-41,4.1082753507014027e-41,4.0882354709418836e-41,4.068195591182364e-41,4.048155711422845e-41,4.028115831663327e-41,4.008075951903808e-41,3.9880360721442887e-41,3.967996192384769e-41,3.94795631262525e-41,3.9279164328657315e-41,3.9078765531062124e-41,3.887836673346693e-41,3.867796793587174e-41,3.8477569138276547e-41,3.827717034068136e-41,3.807677154308617e-41,3.7876372745490975e-41,3.7675973947895784e-41,3.7475575150300603e-41,3.7275176352705413e-41,3.7074777555110217e-41,3.6874378757515026e-41,3.6673979959919835e-41,3.647358116232465e-41,3.627318236472946e-41,3.6072783567134263e-41,3.587238476953907e-41,3.567198597194388e-41,3.5471587174348696e-41,3.52711883767535e-41,3.507078957915831e-41,3.4870390781563124e-41,3.466999198396794e-41,3.4469593186372747e-41,3.426919438877755e-41,3.406879559118236e-41,3.386839679358717e-41,3.3667997995991984e-41,3.3467599198396794e-41,3.32672004008016e-41,3.3066801603206407e-41,3.286640280561122e-41,3.266600400801603e-41,3.2465605210420835e-41,3.226520641282565e-41,3.206480761523046e-41,3.1864408817635273e-41,3.166401002004008e-41,3.1463611222444886e-41,3.1263212424849696e-41,3.1062813627254505e-41,3.086241482965932e-41,3.0662016032064123e-41,3.0461617234468933e-41,3.026121843687374e-41,3.0060819639278556e-41,2.9860420841683365e-41,2.9660022044088175e-41,2.9459623246492984e-41,2.9259224448897793e-41,2.905882565130261e-41,2.8858426853707417e-41,2.865802805611222e-41,2.845762925851703e-41,2.825723046092184e-41,2.8056831663326654e-41,2.785643286573146e-41,2.7656034068136267e-41,2.7455635270541077e-41,2.725523647294589e-41,2.7054837675350705e-41,2.685443887775551e-41,2.665404008016032e-41,2.645364128256513e-41,2.625324248496994e-41,2.6052843687374746e-41,2.5852444889779556e-41,2.5652046092184365e-41,2.545164729458918e-41,2.525124849699399e-41,2.5050849699398793e-41,2.48504509018036e-41,2.465005210420841e-41,2.444965330661323e-41,2.4249254509018035e-41,2.4048855711422844e-41,2.3848456913827653e-41,2.3648058116232463e-41,2.344765931863727e-41,2.324726052104208e-41,2.304686172344689e-41,2.2846462925851702e-41,2.264606412825651e-41,2.2445665330661323e-41,2.2245266533066133e-41,2.204486773547094e-41,2.184446893787575e-41,2.1644070140280558e-41,2.144367134268537e-41,2.1243272545090176e-41,2.104287374749499e-41,2.08424749498998e-41,2.0642076152304607e-41,2.0441677354709418e-41,2.0241278557114225e-41,2.0040879759519037e-41,1.9840480961923846e-41,1.9640082164328658e-41,1.9439683366733465e-41,1.9239284569138274e-41,1.9038885771543086e-41,1.8838486973947892e-41,1.8638088176352704e-41,1.8437689378757514e-41,1.8237290581162325e-41,1.8036891783567132e-41,1.7836492985971944e-41,1.763609418837675e-41,1.743569539078156e-41,1.7235296593186374e-41,1.703489779559118e-41,1.6834498997995993e-41,1.66341002004008e-41,1.643370140280561e-41,1.6233302605210418e-41,1.6032903807615227e-41,1.5832505010020041e-41,1.5632106212424848e-41,1.543170741482966e-41,1.5231308617234467e-41,1.5030909819639279e-41,1.4830511022044085e-41,1.4630112224448897e-41,1.442971342685371e-41,1.4229314629258516e-41,1.4028915831663327e-41,1.3828517034068134e-41,1.3628118236472946e-41,1.3427719438877753e-41,1.3227320641282564e-41,1.3026921843687374e-41,1.2826523046092183e-41,1.2626124248496995e-41,1.2425725450901801e-41,1.2225326653306613e-41,1.202492785571142e-41,1.1824529058116232e-41,1.162413026052104e-41,1.1423731462925852e-41,1.1223332665330661e-41,1.102293386773547e-41,1.0822535070140279e-41,1.0622136272545089e-41,1.0421737474949899e-41,1.022133867735471e-41,1.0020939879759519e-41,9.820541082164328e-42,9.620142284569139e-42,9.419743486973947e-42,9.219344689378756e-42,9.018945891783566e-42,8.818547094188376e-42,8.618148296593186e-42,8.417749498997995e-42,8.217350701402806e-42,8.016951903807614e-42,7.816553106212423e-42,7.616154308617234e-42,7.415755511022043e-42,7.215356713426854e-42,7.014957915831664e-42,6.814559118236473e-42,6.614160320641283e-42,6.413761523046092e-42,6.213362725450901e-42,6.01296392785571e-42,5.812565130260521e-42,5.61216633266533e-42,5.4117675350701394e-42,5.21136873747495e-42,5.010969939879759e-42,4.810571142284569e-42,4.610172344689378e-42,4.4097735470941876e-42,4.209374749498998e-42,4.0089759519038074e-42,3.8085771543086167e-42,3.608178356713427e-42,3.4077795591182365e-42,3.207380761523046e-42,3.006981963927855e-42,2.8065831663326652e-42,2.6061843687374748e-42,2.4057855711422843e-42,2.205386773547094e-42,2.0049879759519038e-42,1.8045891783567134e-42,1.604190380761523e-42,1.4037915831663325e-42,1.2033927855711421e-42,1.0029939879759519e-42,8.025951903807614e-43,6.021963927855712e-43,4.0179759519038074e-43,2.0139879759519036e-43,1.0e-45]}

},{}],35:[function(require,module,exports){
module.exports={"expected":[4.999999675228202e-39,2.004013074995568e-33,4.008021007203351e-33,6.012029123082126e-33,8.016036871618917e-33,1.0020045354839677e-32,1.2024053103376468e-32,1.4028061586597228e-32,1.6032069335134018e-32,1.803607708367081e-32,2.00400848322076e-32,2.204409258074439e-32,2.404810179864912e-32,2.605210807781797e-32,2.80561172957227e-32,3.006012651362743e-32,3.206413279279628e-32,3.406814201070101e-32,3.6072148289869864e-32,3.8076157507774593e-32,4.0080163786943446e-32,4.2084173004848175e-32,4.4088182222752904e-32,4.6092188501921756e-32,4.8096197719826485e-32,5.010020399899534e-32,5.210421027816419e-32,5.41082224348048e-32,5.611222871397365e-32,5.81162349931425e-32,6.012024714978311e-32,6.212425342895196e-32,6.412825970812081e-32,6.613227186476142e-32,6.813627814393027e-32,7.014028442309912e-32,7.214429070226797e-32,7.414830285890858e-32,7.615230913807743e-32,7.815631541724628e-32,8.016032757388689e-32,8.216433385305574e-32,8.41683401322246e-32,8.617234641139345e-32,8.817635856803405e-32,9.018036484720291e-32,9.218437112637176e-32,9.418838328301236e-32,9.619238956218122e-32,9.819639584135007e-32,1.0020040799799068e-31,1.0220441427715953e-31,1.0420842055632838e-31,1.0621242683549723e-31,1.0821643311466608e-31,1.1022045114877844e-31,1.122244574279473e-31,1.1422846370711615e-31,1.16232469986285e-31,1.1823647626545385e-31,1.202404825446227e-31,1.2224448882379156e-31,1.2424850685790392e-31,1.2625251313707277e-31,1.2825651941624162e-31,1.3026052569541047e-31,1.3226453197457933e-31,1.3426853825374818e-31,1.3627254453291703e-31,1.382765625670294e-31,1.4028056884619824e-31,1.422845751253671e-31,1.4428858140453595e-31,1.462925876837048e-31,1.4829659396287365e-31,1.503006002420425e-31,1.5230461827615487e-31,1.5430862455532372e-31,1.5631263083449257e-31,1.5831663711366142e-31,1.6032064339283027e-31,1.6232464967199913e-31,1.6432865595116798e-31,1.6633267398528034e-31,1.683366802644492e-31,1.7034068654361804e-31,1.723446928227869e-31,1.7434869910195575e-31,1.763527053811246e-31,1.7835671166029345e-31,1.8036072969440581e-31,1.8236473597357466e-31,1.8436874225274352e-31,1.8637274853191237e-31,1.8837675481108122e-31,1.9038076109025007e-31,1.9238477912436243e-31,1.9438878540353129e-31,1.9639279168270014e-31,1.983967862069255e-31,2.0040081599598135e-31,2.024048222751502e-31,2.0440882855431905e-31,2.064128348334879e-31,2.0841684111265676e-31,2.104208473918256e-31,2.1242485367099446e-31,2.144288599501633e-31,2.1643286622933217e-31,2.18436872508501e-31,2.2044087878766987e-31,2.2244488506683872e-31,2.2444889134600758e-31,2.2645292113506345e-31,2.284569274142323e-31,2.3046093369340115e-31,2.3246493997257e-31,2.3446894625173885e-31,2.364729525309077e-31,2.3847695881007656e-31,2.404809650892454e-31,2.4248497136841426e-31,2.444889776475831e-31,2.4649298392675197e-31,2.484969902059208e-31,2.5050099648508967e-31,2.5250500276425852e-31,2.545090325533144e-31,2.5651303883248324e-31,2.585170451116521e-31,2.6052105139082095e-31,2.625250576699898e-31,2.6452906394915865e-31,2.665330702283275e-31,2.6853707650749636e-31,2.705410827866652e-31,2.7254508906583406e-31,2.745490953450029e-31,2.7655310162417177e-31,2.785571079033406e-31,2.8056111418250947e-31,2.8256514397156534e-31,2.845691502507342e-31,2.8657315652990304e-31,2.885771628090719e-31,2.9058116908824075e-31,2.925851753674096e-31,2.9458918164657845e-31,2.965931879257473e-31,2.9859719420491616e-31,3.00601200484085e-31,3.0260520676325386e-31,3.046092130424227e-31,3.0661321932159157e-31,3.0861724911064743e-31,3.106212553898163e-31,3.1262526166898514e-31,3.14629267948154e-31,3.1663327422732284e-31,3.186372805064917e-31,3.2064128678566055e-31,3.226452930648294e-31,3.2464929934399825e-31,3.266533056231671e-31,3.2865731190233596e-31,3.306613181815048e-31,3.3266532446067366e-31,3.346693307398425e-31,3.366733605288984e-31,3.3867736680806723e-31,3.406813730872361e-31,3.4268537936640494e-31,3.446893856455738e-31,3.4669339192474264e-31,3.486973982039115e-31,3.5070140448308035e-31,3.527054107622492e-31,3.5470941704141805e-31,3.567134233205869e-31,3.5871742959975576e-31,3.607214358789246e-31,3.6272546566798048e-31,3.6472947194714933e-31,3.667334782263182e-31,3.6873748450548703e-31,3.707414907846559e-31,3.7274549706382474e-31,3.747495033429936e-31,3.7675350962216244e-31,3.787575159013313e-31,3.8076152218050015e-31,3.82765528459669e-31,3.8476953473883785e-31,3.867735410180067e-31,3.8877754729717555e-31,3.9078157708623142e-31,3.9278558336540028e-31,3.947895896445691e-31,3.96793572413851e-31,3.987976022029068e-31,4.008015849721887e-31,4.028056147612445e-31,4.048096445503004e-31,4.068136273195822e-31,4.088176571086381e-31,4.1082163987791995e-31,4.128256696669758e-31,4.1482965243625765e-31,4.168336822253135e-31,4.1883766499459535e-31,4.208416947836512e-31,4.228456775529331e-31,4.248497073419889e-31,4.268536901112708e-31,4.288577199003266e-31,4.308617496893825e-31,4.328657324586643e-31,4.348697622477202e-31,4.36873745017002e-31,4.388777748060579e-31,4.4088175757533974e-31,4.428857873643956e-31,4.4488977013367745e-31,4.468937999227333e-31,4.4889778269201515e-31,4.50901812481071e-31,4.529057952503529e-31,4.549098250394087e-31,4.569138078086906e-31,4.589178375977464e-31,4.609218673868023e-31,4.629258501560841e-31,4.6492987994514e-31,4.669338627144218e-31,4.689378925034777e-31,4.7094187527275954e-31,4.729459050618154e-31,4.7494988783109725e-31,4.769539176201531e-31,4.7895790038943495e-31,4.809619301784908e-31,4.829659129477727e-31,4.849699427368285e-31,4.869739725258844e-31,4.889779552951662e-31,4.909819850842221e-31,4.929859678535039e-31,4.949899976425598e-31,4.969939804118416e-31,4.989980102008975e-31,5.010019929701793e-31,5.030060227592352e-31,5.0501000552851705e-31,5.070140353175729e-31,5.0901801808685475e-31,5.110220478759106e-31,5.130260776649665e-31,5.150300604342483e-31,5.170340902233042e-31,5.19038072992586e-31,5.210421027816419e-31,5.230460855509237e-31,5.250501153399796e-31,5.270540981092614e-31,5.290581278983173e-31,5.310621106675991e-31,5.33066140456655e-31,5.3507012322593685e-31,5.370741530149927e-31,5.3907813578427455e-31,5.410821655733304e-31,5.430861953623863e-31,5.450901781316681e-31,5.47094207920724e-31,5.490981906900058e-31,5.511022204790617e-31,5.531062032483435e-31,5.551102330373994e-31,5.571142158066812e-31,5.591182455957371e-31,5.611222283650189e-31,5.631262581540748e-31,5.6513024092335665e-31,5.671342707124125e-31,5.691383005014684e-31,5.711422832707502e-31,5.731463130598061e-31,5.751502958290879e-31,5.771543256181438e-31,5.791583083874256e-31,5.811623381764815e-31,5.831663209457633e-31,5.851703507348192e-31,5.87174333504101e-31,5.891783632931569e-31,5.911823460624387e-31,5.931863758514946e-31,5.951904056405505e-31,5.971943884098323e-31,5.991984181988882e-31,6.0120240096817e-31,6.032064307572259e-31,6.052104135265077e-31,6.072144433155636e-31,6.092184260848454e-31,6.112224558739013e-31,6.132264386431831e-31,6.15230468432239e-31,6.172344512015208e-31,6.192384809905767e-31,6.212424637598585e-31,6.232464935489144e-31,6.252505233379703e-31,6.272545061072521e-31,6.29258535896308e-31,6.312625186655898e-31,6.332665484546457e-31,6.352705312239275e-31,6.372745610129834e-31,6.392785437822652e-31,6.412825735713211e-31,6.432865563406029e-31,6.452905861296588e-31,6.472945688989406e-31,6.492985986879965e-31,6.513026284770524e-31,6.533066112463342e-31,6.553106410353901e-31,6.573146238046719e-31,6.593186535937278e-31,6.613226363630096e-31,6.633266661520655e-31,6.653306489213473e-31,6.673346787104032e-31,6.69338661479685e-31,6.713426912687409e-31,6.733466740380227e-31,6.753507038270786e-31,6.773547336161345e-31,6.793587163854163e-31,6.813627461744722e-31,6.83366728943754e-31,6.853707587328099e-31,6.873747415020917e-31,6.893787712911476e-31,6.913827540604294e-31,6.933867838494853e-31,6.953907666187671e-31,6.97394796407823e-31,6.993987791771048e-31,7.014028089661607e-31,7.034067917354425e-31,7.054108215244984e-31,7.074148513135543e-31,7.094188340828361e-31,7.11422863871892e-31,7.134268466411738e-31,7.154308764302297e-31,7.174348591995115e-31,7.194388889885674e-31,7.214428717578492e-31,7.234469015469051e-31,7.254508843161869e-31,7.274549141052428e-31,7.294588968745246e-31,7.314629266635805e-31,7.334669564526364e-31,7.354709392219182e-31,7.374749690109741e-31,7.394789517802559e-31,7.414829815693118e-31,7.434869643385936e-31,7.454909941276495e-31,7.474949768969313e-31,7.494990066859872e-31,7.51502989455269e-31,7.535070192443249e-31,7.555110020136067e-31,7.575150318026626e-31,7.595190615917185e-31,7.615230443610003e-31,7.635270741500562e-31,7.65531056919338e-31,7.675350867083939e-31,7.695390694776757e-31,7.715430992667316e-31,7.735470820360134e-31,7.755511118250693e-31,7.775550945943511e-31,7.79559124383407e-31,7.815631071526888e-31,7.835671369417447e-31,7.8557116673080055e-31,7.875751495000824e-31,7.895791792891383e-31,7.915831620584201e-31,7.93587144827702e-31,7.955912216365318e-31,7.975952044058137e-31,7.995991871750955e-31,8.016031699443773e-31,8.036072467532072e-31,8.05611229522489e-31,8.076152122917709e-31,8.096191950610527e-31,8.116232718698826e-31,8.136272546391645e-31,8.156312374084463e-31,8.176353142172762e-31,8.19639296986558e-31,8.216432797558399e-31,8.236472625251217e-31,8.256513393339516e-31,8.276553221032335e-31,8.296593048725153e-31,8.316632876417971e-31,8.33667364450627e-31,8.356713472199089e-31,8.376753299891907e-31,8.396793127584725e-31,8.416833895673024e-31,8.436873723365843e-31,8.456913551058661e-31,8.47695431914696e-31,8.496994146839779e-31,8.517033974532597e-31,8.537073802225415e-31,8.557114570313714e-31,8.577154398006533e-31,8.597194225699351e-31,8.61723405339217e-31,8.637274821480468e-31,8.657314649173287e-31,8.677354476866105e-31,8.697395244954404e-31,8.717435072647222e-31,8.73747490034004e-31,8.75751472803286e-31,8.777555496121158e-31,8.797595323813977e-31,8.817635151506795e-31,8.837674979199613e-31,8.857715747287912e-31,8.87775557498073e-31,8.897795402673549e-31,8.917835230366367e-31,8.937875998454666e-31,8.957915826147485e-31,8.977955653840303e-31,8.997996421928602e-31,9.01803624962142e-31,9.038076077314239e-31,9.058115905007057e-31,9.078156673095356e-31,9.098196500788175e-31,9.118236328480993e-31,9.138276156173811e-31,9.15831692426211e-31,9.178356751954929e-31,9.198396579647747e-31,9.218437347736046e-31,9.238477175428864e-31,9.258517003121683e-31,9.278556830814501e-31,9.2985975989028e-31,9.318637426595618e-31,9.338677254288437e-31,9.358717081981255e-31,9.378757850069554e-31,9.398797677762373e-31,9.418837505455191e-31,9.43887733314801e-31,9.458918101236308e-31,9.478957928929127e-31,9.498997756621945e-31,9.519038524710244e-31,9.539078352403062e-31,9.55911818009588e-31,9.579158007788699e-31,9.599198775876998e-31,9.619238603569816e-31,9.639278431262635e-31,9.659318258955453e-31,9.679359027043752e-31,9.69939885473657e-31,9.719438682429389e-31,9.739478510122207e-31,9.759519278210506e-31,9.779559105903325e-31,9.799598933596143e-31,9.819639701684442e-31,9.83967952937726e-31,9.859719357070079e-31,9.879759184762897e-31,9.899799952851196e-31,9.919839780544014e-31,9.939879608236833e-31,9.959919435929651e-31,9.97996020401795e-31,1.0000000031710769e-30],"x":[5.0e-39,2.0040130060120242e-33,4.008021012024049e-33,6.012029018036073e-33,8.016037024048097e-33,1.0020045030060122e-32,1.2024053036072146e-32,1.4028061042084168e-32,1.6032069048096196e-32,1.803607705410822e-32,2.0040085060120242e-32,2.2044093066132267e-32,2.4048101072144292e-32,2.605210907815631e-32,2.805611708416834e-32,3.006012509018036e-32,3.206413309619239e-32,3.4068141102204415e-32,3.6072149108216437e-32,3.8076157114228464e-32,4.0080165120240486e-32,4.208417312625251e-32,4.4088181132264536e-32,4.609218913827656e-32,4.8096197144288585e-32,5.01002051503006e-32,5.210421315631263e-32,5.410822116232465e-32,5.611222916833668e-32,5.81162371743487e-32,6.012024518036073e-32,6.212425318637274e-32,6.412826119238477e-32,6.613226919839681e-32,6.813627720440883e-32,7.014028521042085e-32,7.214429321643287e-32,7.41483012224449e-32,7.615230922845691e-32,7.815631723446895e-32,8.016032524048097e-32,8.2164333246493e-32,8.416834125250501e-32,8.617234925851704e-32,8.817635726452907e-32,9.01803652705411e-32,9.218437327655311e-32,9.418838128256514e-32,9.619238928857716e-32,9.819639729458919e-32,1.0020040530060122e-31,1.0220441330661325e-31,1.0420842131262525e-31,1.0621242931863726e-31,1.082164373246493e-31,1.1022044533066134e-31,1.1222445333667334e-31,1.1422846134268537e-31,1.1623246934869742e-31,1.1823647735470945e-31,1.2024048536072145e-31,1.2224449336673346e-31,1.242485013727455e-31,1.2625250937875753e-31,1.2825651738476954e-31,1.3026052539078157e-31,1.322645333967936e-31,1.3426854140280564e-31,1.3627254940881765e-31,1.3827655741482968e-31,1.402805654208417e-31,1.4228457342685373e-31,1.4428858143286574e-31,1.4629258943887776e-31,1.482965974448898e-31,1.5030060545090182e-31,1.5230461345691382e-31,1.5430862146292585e-31,1.563126294689379e-31,1.5831663747494993e-31,1.6032064548096193e-31,1.6232465348697396e-31,1.6432866149298599e-31,1.6633266949899802e-31,1.6833667750501002e-31,1.7034068551102205e-31,1.7234469351703408e-31,1.743487015230461e-31,1.7635270952905813e-31,1.7835671753507016e-31,1.8036072554108219e-31,1.8236473354709421e-31,1.8436874155310622e-31,1.8637274955911825e-31,1.8837675756513027e-31,1.903807655711423e-31,1.9238477357715433e-31,1.9438878158316633e-31,1.9639278958917836e-31,1.9839679759519043e-31,2.004008056012024e-31,2.0240481360721444e-31,2.0440882161322647e-31,2.064128296192385e-31,2.0841683762525053e-31,2.104208456312625e-31,2.124248536372746e-31,2.144288616432866e-31,2.1643286964929864e-31,2.184368776553106e-31,2.204408856613227e-31,2.2244489366733467e-31,2.244489016733467e-31,2.264529096793587e-31,2.2845691768537076e-31,2.3046092569138283e-31,2.324649336973948e-31,2.3446894170340684e-31,2.3647294970941887e-31,2.384769577154309e-31,2.4048096572144288e-31,2.424849737274549e-31,2.4448898173346693e-31,2.46492989739479e-31,2.48496997745491e-31,2.50501005751503e-31,2.525050137575151e-31,2.5450902176352707e-31,2.565130297695391e-31,2.5851703777555112e-31,2.6052104578156315e-31,2.625250537875752e-31,2.645290617935872e-31,2.665330697995992e-31,2.6853707780561126e-31,2.705410858116233e-31,2.7254509381763527e-31,2.7454910182364734e-31,2.7655310982965933e-31,2.785571178356714e-31,2.805611258416834e-31,2.825651338476954e-31,2.8456914185370744e-31,2.8657314985971946e-31,2.8857715786573145e-31,2.905811658717435e-31,2.9258517387775555e-31,2.9458918188376757e-31,2.965931898897796e-31,2.985971978957916e-31,3.0060120590180366e-31,3.0260521390781564e-31,3.0460922191382767e-31,3.066132299198397e-31,3.086172379258517e-31,3.1062124593186375e-31,3.1262525393787578e-31,3.146292619438878e-31,3.1663326994989983e-31,3.1863727795591186e-31,3.206412859619239e-31,3.226452939679359e-31,3.246493019739479e-31,3.2665330997995997e-31,3.2865731798597195e-31,3.30661325991984e-31,3.3266533399799605e-31,3.3466934200400803e-31,3.366733500100201e-31,3.386773580160321e-31,3.406813660220441e-31,3.4268537402805614e-31,3.4468938203406817e-31,3.4669339004008015e-31,3.4869739804609223e-31,3.507014060521042e-31,3.527054140581163e-31,3.547094220641283e-31,3.567134300701403e-31,3.5871743807615236e-31,3.6072144608216435e-31,3.6272545408817637e-31,3.647294620941884e-31,3.6673347010020043e-31,3.6873747810621246e-31,3.707414861122245e-31,3.7274549411823647e-31,3.7474950212424854e-31,3.7675351013026057e-31,3.7875751813627255e-31,3.807615261422846e-31,3.8276553414829665e-31,3.8476954215430868e-31,3.8677355016032066e-31,3.887775581663327e-31,3.907815661723447e-31,3.9278557417835674e-31,3.947895821843688e-31,3.967935901903808e-31,3.987975981963928e-31,4.008016062024048e-31,4.028056142084169e-31,4.048096222144289e-31,4.068136302204409e-31,4.08817638226453e-31,4.108216462324649e-31,4.128256542384771e-31,4.1482966224448896e-31,4.16833670250501e-31,4.188376782565131e-31,4.208416862625251e-31,4.2284569426853715e-31,4.2484970227454905e-31,4.268537102805612e-31,4.288577182865732e-31,4.308617262925852e-31,4.328657342985972e-31,4.348697423046093e-31,4.368737503106212e-31,4.388777583166333e-31,4.408817663226454e-31,4.428857743286573e-31,4.448897823346694e-31,4.468937903406813e-31,4.488977983466935e-31,4.5090180635270545e-31,4.529058143587174e-31,4.549098223647295e-31,4.569138303707415e-31,4.589178383767536e-31,4.609218463827655e-31,4.629258543887776e-31,4.649298623947896e-31,4.669338704008017e-31,4.6893787840681365e-31,4.709418864128257e-31,4.729458944188378e-31,4.749499024248497e-31,4.769539104308618e-31,4.7895791843687374e-31,4.809619264428858e-31,4.829659344488978e-31,4.849699424549099e-31,4.869739504609219e-31,4.889779584669338e-31,4.909819664729459e-31,4.92985974478958e-31,4.9498998248497e-31,4.9699399049098195e-31,4.98997998496994e-31,5.010020065030061e-31,5.030060145090181e-31,5.0501002251503014e-31,5.070140305210421e-31,5.090180385270542e-31,5.110220465330661e-31,5.130260545390782e-31,5.150300625450903e-31,5.170340705511022e-31,5.190380785571143e-31,5.210420865631263e-31,5.2304609456913835e-31,5.250501025751503e-31,5.270541105811623e-31,5.290581185871744e-31,5.310621265931865e-31,5.330661345991984e-31,5.350701426052104e-31,5.370741506112226e-31,5.390781586172345e-31,5.4108216662324655e-31,5.430861746292585e-31,5.450901826352706e-31,5.470941906412827e-31,5.490981986472946e-31,5.511022066533067e-31,5.531062146593186e-31,5.551102226653307e-31,5.571142306713427e-31,5.5911823867735475e-31,5.611222466833667e-31,5.631262546893788e-31,5.651302626953909e-31,5.671342707014029e-31,5.691382787074149e-31,5.711422867134268e-31,5.73146294719439e-31,5.751503027254509e-31,5.77154310731463e-31,5.79158318737475e-31,5.81162326743487e-31,5.831663347494991e-31,5.85170342755511e-31,5.871743507615231e-31,5.891783587675351e-31,5.911823667735471e-31,5.931863747795592e-31,5.9519038278557125e-31,5.971943907915832e-31,5.991983987975952e-31,6.012024068036073e-31,6.032064148096193e-31,6.052104228156313e-31,6.072144308216432e-31,6.092184388276554e-31,6.112224468336675e-31,6.132264548396794e-31,6.152304628456914e-31,6.172344708517034e-31,6.192384788577155e-31,6.212424868637275e-31,6.2324649486973946e-31,6.252505028757516e-31,6.272545108817636e-31,6.292585188877756e-31,6.3126252689378765e-31,6.332665348997997e-31,6.352705429058116e-31,6.372745509118237e-31,6.392785589178358e-31,6.4128256692384775e-31,6.432865749298598e-31,6.452905829358718e-31,6.472945909418839e-31,6.492985989478958e-31,6.513026069539078e-31,6.533066149599199e-31,6.553106229659319e-31,6.57314630971944e-31,6.5931863897795595e-31,6.61322646983968e-31,6.6332665498998e-31,6.653306629959921e-31,6.673346710020041e-31,6.693386790080161e-31,6.713426870140281e-31,6.733466950200401e-31,6.7535070302605226e-31,6.7735471103206415e-31,6.793587190380762e-31,6.813627270440881e-31,6.833667350501003e-31,6.8537074305611235e-31,6.8737475106212425e-31,6.893787590681364e-31,6.913827670741484e-31,6.933867750801604e-31,6.9539078308617235e-31,6.973947910921845e-31,6.993987990981964e-31,7.014028071042085e-31,7.034068151102205e-31,7.054108231162325e-31,7.074148311222446e-31,7.094188391282565e-31,7.114228471342687e-31,7.134268551402806e-31,7.154308631462926e-31,7.174348711523047e-31,7.194388791583167e-31,7.2144288716432875e-31,7.234468951703407e-31,7.254509031763527e-31,7.274549111823648e-31,7.294589191883769e-31,7.314629271943888e-31,7.334669352004009e-31,7.354709432064129e-31,7.374749512124249e-31,7.39478959218437e-31,7.414829672244489e-31,7.43486975230461e-31,7.454909832364729e-31,7.47494991242485e-31,7.494989992484971e-31,7.51503007254509e-31,7.535070152605211e-31,7.555110232665332e-31,7.575150312725452e-31,7.5951903927855714e-31,7.615230472845692e-31,7.635270552905813e-31,7.655310632965933e-31,7.6753507130260525e-31,7.695390793086172e-31,7.715430873146294e-31,7.735470953206413e-31,7.755511033266534e-31,7.7755511133266535e-31,7.795591193386774e-31,7.815631273446895e-31,7.835671353507014e-31,7.8557114335671354e-31,7.875751513627255e-31,7.895791593687375e-31,7.915831673747496e-31,7.935871753807617e-31,7.955911833867736e-31,7.975951913927856e-31,7.995991993987977e-31,8.016032074048098e-31,8.036072154108217e-31,8.056112234168337e-31,8.076152314228458e-31,8.096192394288577e-31,8.1162324743487e-31,8.136272554408818e-31,8.156312634468937e-31,8.17635271452906e-31,8.19639279458918e-31,8.2164328746493e-31,8.236472954709418e-31,8.256513034769541e-31,8.27655311482966e-31,8.296593194889779e-31,8.3166332749499e-31,8.336673355010022e-31,8.356713435070141e-31,8.376753515130262e-31,8.39679359519038e-31,8.416833675250501e-31,8.436873755310622e-31,8.456913835370741e-31,8.476953915430864e-31,8.496993995490982e-31,8.517034075551103e-31,8.537074155611222e-31,8.557114235671343e-31,8.577154315731464e-31,8.597194395791583e-31,8.617234475851705e-31,8.637274555911826e-31,8.657314635971945e-31,8.677354716032064e-31,8.697394796092186e-31,8.717434876152305e-31,8.737474956212424e-31,8.757515036272548e-31,8.777555116332667e-31,8.797595196392786e-31,8.817635276452907e-31,8.837675356513028e-31,8.857715436573147e-31,8.877755516633265e-31,8.897795596693388e-31,8.917835676753509e-31,8.937875756813628e-31,8.957915836873748e-31,8.977955916933869e-31,8.997995996993988e-31,9.018036077054109e-31,9.03807615711423e-31,9.05811623717435e-31,9.07815631723447e-31,9.09819639729459e-31,9.11823647735471e-31,9.13827655741483e-31,9.15831663747495e-31,9.17835671753507e-31,9.198396797595192e-31,9.218436877655312e-31,9.238476957715431e-31,9.258517037775552e-31,9.278557117835673e-31,9.298597197895792e-31,9.31863727795591e-31,9.338677358016033e-31,9.358717438076154e-31,9.378757518136273e-31,9.398797598196395e-31,9.418837678256514e-31,9.438877758316633e-31,9.458917838376754e-31,9.478957918436875e-31,9.498997998496995e-31,9.519038078557114e-31,9.539078158617237e-31,9.559118238677356e-31,9.579158318737475e-31,9.599198398797595e-31,9.619238478857716e-31,9.639278558917837e-31,9.659318638977957e-31,9.679358719038078e-31,9.699398799098197e-31,9.719438879158318e-31,9.739478959218437e-31,9.759519039278558e-31,9.779559119338677e-31,9.799599199398799e-31,9.81963927945892e-31,9.839679359519039e-31,9.85971943957916e-31,9.879759519639278e-31,9.899799599699399e-31,9.91983967975952e-31,9.93987975981964e-31,9.95991983987976e-31,9.979959919939882e-31,1.0e-30]}

},{}],36:[function(require,module,exports){
(function (__filename){(function (){
/* proxyquireify injected requires to make browserify include dependencies in the bundle */ /* istanbul ignore next */; (function __makeBrowserifyIncludeModule__() { require('./../lib');});/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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
var NINF = require( '@stdlib/constants/float64/ninf' );
var PINF = require( '@stdlib/constants/float64/pinf' );
var isNegativeZero = require( '@stdlib/math/base/assert/is-negative-zero' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var polyfill = require( './../lib/polyfill.js' );
var float64ToFloat32 = require( './../lib' );


// FIXTURES //

var negativeLarge = require( './fixtures/julia/negative_large.json' );
var negativeNormal = require( './fixtures/julia/negative_normal.json' );
var negativeSmall = require( './fixtures/julia/negative_small.json' );
var negativeSubnormal = require( './fixtures/julia/negative_subnormal.json' );
var negativeTiny = require( './fixtures/julia/negative_tiny.json' );
var positiveLarge = require( './fixtures/julia/positive_large.json' );
var positiveNormal = require( './fixtures/julia/positive_normal.json' );
var positiveSmall = require( './fixtures/julia/positive_small.json' );
var positiveSubnormal = require( './fixtures/julia/positive_subnormal.json' );
var positiveTiny = require( './fixtures/julia/positive_tiny.json' );


// NOTES //

/*
* => In many comparisons, we rely on implicit promotion of single-precision floating-point numbers to double-precision equivalents; e.g., +-infinity, NaN. This stems from comparison operators defaulting to float64 operands.
*/


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.equal( typeof float64ToFloat32, 'function', 'main export is a function' );
	t.end();
});

tape( 'if an environment supports `Math.fround` (ES2015+), the main export is the built-in method', function test( t ) {
	var float64ToFloat32 = proxyquire( './../lib', {
		'./main.js': foo
	});
	t.equal( float64ToFloat32, foo, 'returns expected value' );
	t.end();

	function foo() {
		// No-op...
	}
});

tape( 'if an environment does not support `Math.fround` (non-ES2015+), the main export is a polyfill', function test( t ) {
	var float64ToFloat32 = proxyquire( './../lib', {
		'./main.js': false
	});
	t.equal( float64ToFloat32, polyfill, 'returns expected value' );
	t.end();
});

tape( 'if provided `0`, the function returns `0`', function test( t ) {
	var v = float64ToFloat32( 0.0 );
	t.equal( v, 0.0, 'equals 0' );
	t.end();
});

tape( 'if provided `-0`, the function returns `-0`', function test( t ) {
	var v = float64ToFloat32( -0.0 );
	t.equal( isNegativeZero( v ), true, 'returns -0' );
	t.end();
});

tape( 'if provided `+infinity`, the function returns `+infinity`', function test( t ) {
	var v = float64ToFloat32( PINF );
	t.equal( v, PINF, 'returns +infinity' );
	t.end();
});

tape( 'if provided `-infinity`, the function returns `-infinity`', function test( t ) {
	var v = float64ToFloat32( NINF );
	t.equal( v, NINF, 'returns -infinity' );
	t.end();
});

tape( 'if provided `NaN`, the function returns `NaN`', function test( t ) {
	var v = float64ToFloat32( NaN );
	t.equal( isnan( v ), true, 'returns NaN' );
	t.end();
});

tape( 'the function returns the nearest single-precision floating-point number (+large values)', function test( t ) {
	var expected;
	var x;
	var y;
	var i;

	x = positiveLarge.x;
	expected = positiveLarge.expected;
	for ( i = 0; i < x.length; i++ ) {
		y = float64ToFloat32( x[ i ] );
		t.equal( y, expected[ i ], 'y: '+y+', expected: '+expected[ i ] );
	}
	t.end();
});

tape( 'the function returns the nearest single-precision floating-point number (+normal values)', function test( t ) {
	var expected;
	var x;
	var y;
	var i;

	x = positiveNormal.x;
	expected = positiveNormal.expected;
	for ( i = 0; i < x.length; i++ ) {
		y = float64ToFloat32( x[ i ] );
		t.equal( y, expected[ i ], 'y: '+y+', expected: '+expected[ i ] );
	}
	t.end();
});

tape( 'the function returns the nearest single-precision floating-point number (+small values)', function test( t ) {
	var expected;
	var x;
	var y;
	var i;

	x = positiveSmall.x;
	expected = positiveSmall.expected;
	for ( i = 0; i < x.length; i++ ) {
		y = float64ToFloat32( x[ i ] );
		t.equal( y, expected[ i ], 'y: '+y+', expected: '+expected[ i ] );
	}
	t.end();
});

tape( 'the function returns the nearest single-precision floating-point number (+tiny values)', function test( t ) {
	var expected;
	var x;
	var y;
	var i;

	x = positiveTiny.x;
	expected = positiveTiny.expected;
	for ( i = 0; i < x.length; i++ ) {
		y = float64ToFloat32( x[ i ] );
		t.equal( y, expected[ i ], 'y: '+y+', expected: '+expected[ i ] );
	}
	t.end();
});

tape( 'the function returns the nearest single-precision floating-point number (+subnormal values)', function test( t ) {
	var expected;
	var x;
	var y;
	var i;

	x = positiveSubnormal.x;
	expected = positiveSubnormal.expected;
	for ( i = 0; i < x.length; i++ ) {
		y = float64ToFloat32( x[ i ] );
		t.equal( y, expected[ i ], 'y: '+y+', expected: '+expected[ i ] );
	}
	t.end();
});

tape( 'the function returns the nearest single-precision floating-point number (-large values)', function test( t ) {
	var expected;
	var x;
	var y;
	var i;

	x = negativeLarge.x;
	expected = negativeLarge.expected;
	for ( i = 0; i < x.length; i++ ) {
		y = float64ToFloat32( x[ i ] );
		t.equal( y, expected[ i ], 'y: '+y+', expected: '+expected[ i ] );
	}
	t.end();
});

tape( 'the function returns the nearest single-precision floating-point number (-normal values)', function test( t ) {
	var expected;
	var x;
	var y;
	var i;

	x = negativeNormal.x;
	expected = negativeNormal.expected;
	for ( i = 0; i < x.length; i++ ) {
		y = float64ToFloat32( x[ i ] );
		t.equal( y, expected[ i ], 'y: '+y+', expected: '+expected[ i ] );
	}
	t.end();
});

tape( 'the function returns the nearest single-precision floating-point number (-small values)', function test( t ) {
	var expected;
	var x;
	var y;
	var i;

	x = negativeSmall.x;
	expected = negativeSmall.expected;
	for ( i = 0; i < x.length; i++ ) {
		y = float64ToFloat32( x[ i ] );
		t.equal( y, expected[ i ], 'y: '+y+', expected: '+expected[ i ] );
	}
	t.end();
});

tape( 'the function returns the nearest single-precision floating-point number (-tiny values)', function test( t ) {
	var expected;
	var x;
	var y;
	var i;

	x = negativeTiny.x;
	expected = negativeTiny.expected;
	for ( i = 0; i < x.length; i++ ) {
		y = float64ToFloat32( x[ i ] );
		t.equal( y, expected[ i ], 'y: '+y+', expected: '+expected[ i ] );
	}
	t.end();
});

tape( 'the function returns the nearest single-precision floating-point number (-subnormal values)', function test( t ) {
	var expected;
	var x;
	var y;
	var i;

	x = negativeSubnormal.x;
	expected = negativeSubnormal.expected;
	for ( i = 0; i < x.length; i++ ) {
		y = float64ToFloat32( x[ i ] );
		t.equal( y, expected[ i ], 'y: '+y+', expected: '+expected[ i ] );
	}
	t.end();
});

}).call(this)}).call(this,"/lib/node_modules/@stdlib/number/float64/base/to-float32/test/test.js")
},{"./../lib":23,"./../lib/polyfill.js":25,"./fixtures/julia/negative_large.json":26,"./fixtures/julia/negative_normal.json":27,"./fixtures/julia/negative_small.json":28,"./fixtures/julia/negative_subnormal.json":29,"./fixtures/julia/negative_tiny.json":30,"./fixtures/julia/positive_large.json":31,"./fixtures/julia/positive_normal.json":32,"./fixtures/julia/positive_small.json":33,"./fixtures/julia/positive_subnormal.json":34,"./fixtures/julia/positive_tiny.json":35,"@stdlib/constants/float64/ninf":15,"@stdlib/constants/float64/pinf":16,"@stdlib/math/base/assert/is-nan":17,"@stdlib/math/base/assert/is-negative-zero":19,"proxyquireify":163,"tape":173}],37:[function(require,module,exports){
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
var NINF = require( '@stdlib/constants/float64/ninf' );
var PINF = require( '@stdlib/constants/float64/pinf' );
var isNegativeZero = require( '@stdlib/math/base/assert/is-negative-zero' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var float64ToFloat32 = require( './../lib/polyfill.js' );


// FIXTURES //

var negativeLarge = require( './fixtures/julia/negative_large.json' );
var negativeNormal = require( './fixtures/julia/negative_normal.json' );
var negativeSmall = require( './fixtures/julia/negative_small.json' );
var negativeSubnormal = require( './fixtures/julia/negative_subnormal.json' );
var negativeTiny = require( './fixtures/julia/negative_tiny.json' );
var positiveLarge = require( './fixtures/julia/positive_large.json' );
var positiveNormal = require( './fixtures/julia/positive_normal.json' );
var positiveSmall = require( './fixtures/julia/positive_small.json' );
var positiveSubnormal = require( './fixtures/julia/positive_subnormal.json' );
var positiveTiny = require( './fixtures/julia/positive_tiny.json' );


// NOTES //

/*
* => In many comparisons, we rely on implicit promotion of single-precision floating-point numbers to double-precision equivalents; e.g., +-infinity, NaN. This stems from comparison operators defaulting to float64 operands.
*/


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.equal( typeof float64ToFloat32, 'function', 'main export is a function' );
	t.end();
});

tape( 'if provided `0`, the function returns `0`', function test( t ) {
	var v = float64ToFloat32( 0.0 );
	t.equal( v, 0.0, 'equals 0' );
	t.end();
});

tape( 'if provided `-0`, the function returns `-0`', function test( t ) {
	var v = float64ToFloat32( -0.0 );
	t.equal( isNegativeZero( v ), true, 'returns -0' );
	t.end();
});

tape( 'if provided `+infinity`, the function returns `+infinity`', function test( t ) {
	var v = float64ToFloat32( PINF );
	t.equal( v, PINF, 'returns +infinity' );
	t.end();
});

tape( 'if provided `-infinity`, the function returns `-infinity`', function test( t ) {
	var v = float64ToFloat32( NINF );
	t.equal( v, NINF, 'returns -infinity' );
	t.end();
});

tape( 'if provided `NaN`, the function returns `NaN`', function test( t ) {
	var v = float64ToFloat32( NaN );
	t.equal( isnan( v ), true, 'returns NaN' );
	t.end();
});

tape( 'the function returns the nearest single-precision floating-point number (+large values)', function test( t ) {
	var expected;
	var x;
	var y;
	var i;

	x = positiveLarge.x;
	expected = positiveLarge.expected;
	for ( i = 0; i < x.length; i++ ) {
		y = float64ToFloat32( x[ i ] );
		t.equal( y, expected[ i ], 'y: '+y+', expected: '+expected[ i ] );
	}
	t.end();
});

tape( 'the function returns the nearest single-precision floating-point number (+normal values)', function test( t ) {
	var expected;
	var x;
	var y;
	var i;

	x = positiveNormal.x;
	expected = positiveNormal.expected;
	for ( i = 0; i < x.length; i++ ) {
		y = float64ToFloat32( x[ i ] );
		t.equal( y, expected[ i ], 'y: '+y+', expected: '+expected[ i ] );
	}
	t.end();
});

tape( 'the function returns the nearest single-precision floating-point number (+small values)', function test( t ) {
	var expected;
	var x;
	var y;
	var i;

	x = positiveSmall.x;
	expected = positiveSmall.expected;
	for ( i = 0; i < x.length; i++ ) {
		y = float64ToFloat32( x[ i ] );
		t.equal( y, expected[ i ], 'y: '+y+', expected: '+expected[ i ] );
	}
	t.end();
});

tape( 'the function returns the nearest single-precision floating-point number (+tiny values)', function test( t ) {
	var expected;
	var x;
	var y;
	var i;

	x = positiveTiny.x;
	expected = positiveTiny.expected;
	for ( i = 0; i < x.length; i++ ) {
		y = float64ToFloat32( x[ i ] );
		t.equal( y, expected[ i ], 'y: '+y+', expected: '+expected[ i ] );
	}
	t.end();
});

tape( 'the function returns the nearest single-precision floating-point number (+subnormal values)', function test( t ) {
	var expected;
	var x;
	var y;
	var i;

	x = positiveSubnormal.x;
	expected = positiveSubnormal.expected;
	for ( i = 0; i < x.length; i++ ) {
		y = float64ToFloat32( x[ i ] );
		t.equal( y, expected[ i ], 'y: '+y+', expected: '+expected[ i ] );
	}
	t.end();
});

tape( 'the function returns the nearest single-precision floating-point number (-large values)', function test( t ) {
	var expected;
	var x;
	var y;
	var i;

	x = negativeLarge.x;
	expected = negativeLarge.expected;
	for ( i = 0; i < x.length; i++ ) {
		y = float64ToFloat32( x[ i ] );
		t.equal( y, expected[ i ], 'y: '+y+', expected: '+expected[ i ] );
	}
	t.end();
});

tape( 'the function returns the nearest single-precision floating-point number (-normal values)', function test( t ) {
	var expected;
	var x;
	var y;
	var i;

	x = negativeNormal.x;
	expected = negativeNormal.expected;
	for ( i = 0; i < x.length; i++ ) {
		y = float64ToFloat32( x[ i ] );
		t.equal( y, expected[ i ], 'y: '+y+', expected: '+expected[ i ] );
	}
	t.end();
});

tape( 'the function returns the nearest single-precision floating-point number (-small values)', function test( t ) {
	var expected;
	var x;
	var y;
	var i;

	x = negativeSmall.x;
	expected = negativeSmall.expected;
	for ( i = 0; i < x.length; i++ ) {
		y = float64ToFloat32( x[ i ] );
		t.equal( y, expected[ i ], 'y: '+y+', expected: '+expected[ i ] );
	}
	t.end();
});

tape( 'the function returns the nearest single-precision floating-point number (-tiny values)', function test( t ) {
	var expected;
	var x;
	var y;
	var i;

	x = negativeTiny.x;
	expected = negativeTiny.expected;
	for ( i = 0; i < x.length; i++ ) {
		y = float64ToFloat32( x[ i ] );
		t.equal( y, expected[ i ], 'y: '+y+', expected: '+expected[ i ] );
	}
	t.end();
});

tape( 'the function returns the nearest single-precision floating-point number (-subnormal values)', function test( t ) {
	var expected;
	var x;
	var y;
	var i;

	x = negativeSubnormal.x;
	expected = negativeSubnormal.expected;
	for ( i = 0; i < x.length; i++ ) {
		y = float64ToFloat32( x[ i ] );
		t.equal( y, expected[ i ], 'y: '+y+', expected: '+expected[ i ] );
	}
	t.end();
});

}).call(this)}).call(this,"/lib/node_modules/@stdlib/number/float64/base/to-float32/test/test.polyfill.js")
},{"./../lib/polyfill.js":25,"./fixtures/julia/negative_large.json":26,"./fixtures/julia/negative_normal.json":27,"./fixtures/julia/negative_small.json":28,"./fixtures/julia/negative_subnormal.json":29,"./fixtures/julia/negative_tiny.json":30,"./fixtures/julia/positive_large.json":31,"./fixtures/julia/positive_normal.json":32,"./fixtures/julia/positive_small.json":33,"./fixtures/julia/positive_subnormal.json":34,"./fixtures/julia/positive_tiny.json":35,"@stdlib/constants/float64/ninf":15,"@stdlib/constants/float64/pinf":16,"@stdlib/math/base/assert/is-nan":17,"@stdlib/math/base/assert/is-negative-zero":19,"tape":173}],38:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./main.js":39}],39:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{"./main.js":41,"./polyfill.js":42,"@stdlib/assert/has-tostringtag-support":11}],41:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./tostring.js":43}],42:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"./tostring.js":43,"./tostringtag.js":44,"@stdlib/assert/has-own-property":7}],43:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
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

},{}],44:[function(require,module,exports){
/**
* @license Apache-2.0
*
* Copyright (c) 2018 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
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

},{"@stdlib/symbol/ctor":38}],45:[function(require,module,exports){
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

},{}],46:[function(require,module,exports){

},{}],47:[function(require,module,exports){
arguments[4][46][0].apply(exports,arguments)
},{"dup":46}],48:[function(require,module,exports){
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
},{"base64-js":45,"buffer":48,"ieee754":152}],49:[function(require,module,exports){
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

},{}],50:[function(require,module,exports){
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
},{"_process":162}],51:[function(require,module,exports){
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

},{"events":49,"inherits":153,"readable-stream/lib/_stream_duplex.js":53,"readable-stream/lib/_stream_passthrough.js":54,"readable-stream/lib/_stream_readable.js":55,"readable-stream/lib/_stream_transform.js":56,"readable-stream/lib/_stream_writable.js":57,"readable-stream/lib/internal/streams/end-of-stream.js":61,"readable-stream/lib/internal/streams/pipeline.js":63}],52:[function(require,module,exports){
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

},{}],53:[function(require,module,exports){
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
},{"./_stream_readable":55,"./_stream_writable":57,"_process":162,"inherits":153}],54:[function(require,module,exports){
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
},{"./_stream_transform":56,"inherits":153}],55:[function(require,module,exports){
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
},{"../errors":52,"./_stream_duplex":53,"./internal/streams/async_iterator":58,"./internal/streams/buffer_list":59,"./internal/streams/destroy":60,"./internal/streams/from":62,"./internal/streams/state":64,"./internal/streams/stream":65,"_process":162,"buffer":48,"events":49,"inherits":153,"string_decoder/":172,"util":46}],56:[function(require,module,exports){
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
},{"../errors":52,"./_stream_duplex":53,"inherits":153}],57:[function(require,module,exports){
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
},{"../errors":52,"./_stream_duplex":53,"./internal/streams/destroy":60,"./internal/streams/state":64,"./internal/streams/stream":65,"_process":162,"buffer":48,"inherits":153,"util-deprecate":181}],58:[function(require,module,exports){
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
},{"./end-of-stream":61,"_process":162}],59:[function(require,module,exports){
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
},{"buffer":48,"util":46}],60:[function(require,module,exports){
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
},{"_process":162}],61:[function(require,module,exports){
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
},{"../../../errors":52}],62:[function(require,module,exports){
module.exports = function () {
  throw new Error('Readable.from is not available in the browser')
};

},{}],63:[function(require,module,exports){
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
},{"../../../errors":52,"./end-of-stream":61}],64:[function(require,module,exports){
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
},{"../../../errors":52}],65:[function(require,module,exports){
module.exports = require('events').EventEmitter;

},{"events":49}],66:[function(require,module,exports){
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

},{"./":67,"get-intrinsic":143}],67:[function(require,module,exports){
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

},{"es-define-property":127,"es-errors/type":133,"function-bind":142,"get-intrinsic":143,"set-function-length":167}],68:[function(require,module,exports){
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

},{"./lib/is_arguments.js":69,"./lib/keys.js":70}],69:[function(require,module,exports){
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

},{}],70:[function(require,module,exports){
exports = module.exports = typeof Object.keys === 'function'
  ? Object.keys : shim;

exports.shim = shim;
function shim (obj) {
  var keys = [];
  for (var key in obj) keys.push(key);
  return keys;
}

},{}],71:[function(require,module,exports){
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

},{"es-define-property":127,"es-errors/syntax":132,"es-errors/type":133,"gopd":144}],72:[function(require,module,exports){
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

},{"define-data-property":71,"has-property-descriptors":145,"object-keys":160}],73:[function(require,module,exports){
module.exports = function () {
    for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] !== undefined) return arguments[i];
    }
};

},{}],74:[function(require,module,exports){
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

},{"./ToNumber":105,"./ToPrimitive":107,"./Type":112}],75:[function(require,module,exports){
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

},{"../helpers/isFinite":120,"../helpers/isNaN":121,"../helpers/isPrefixOf":122,"./ToNumber":105,"./ToPrimitive":107,"es-errors/type":133,"get-intrinsic":143}],76:[function(require,module,exports){
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

},{"call-bind/callBound":66,"es-errors/type":133}],77:[function(require,module,exports){
'use strict';

var RequireObjectCoercible = require('es-object-atoms/RequireObjectCoercible');

// http://262.ecma-international.org/5.1/#sec-9.10

module.exports = function CheckObjectCoercible(value) {
	return RequireObjectCoercible(value, arguments.length > 1 ? arguments[1] : void undefined);
};

},{"es-object-atoms/RequireObjectCoercible":135}],78:[function(require,module,exports){
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

},{"./DayWithinYear":81,"./InLeapYear":85,"./MonthFromTime":95,"es-errors/eval":128}],79:[function(require,module,exports){
'use strict';

var floor = require('./floor');

var msPerDay = require('../helpers/timeConstants').msPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.2

module.exports = function Day(t) {
	return floor(t / msPerDay);
};

},{"../helpers/timeConstants":126,"./floor":116}],80:[function(require,module,exports){
'use strict';

var floor = require('./floor');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

module.exports = function DayFromYear(y) {
	return (365 * (y - 1970)) + floor((y - 1969) / 4) - floor((y - 1901) / 100) + floor((y - 1601) / 400);
};


},{"./floor":116}],81:[function(require,module,exports){
'use strict';

var Day = require('./Day');
var DayFromYear = require('./DayFromYear');
var YearFromTime = require('./YearFromTime');

// https://262.ecma-international.org/5.1/#sec-15.9.1.4

module.exports = function DayWithinYear(t) {
	return Day(t) - DayFromYear(YearFromTime(t));
};

},{"./Day":79,"./DayFromYear":80,"./YearFromTime":114}],82:[function(require,module,exports){
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

},{"./modulo":117}],83:[function(require,module,exports){
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

},{"../helpers/records/property-descriptor":124,"./IsAccessorDescriptor":86,"./IsDataDescriptor":88,"es-errors/type":133}],84:[function(require,module,exports){
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

},{"../helpers/timeConstants":126,"./floor":116,"./modulo":117}],85:[function(require,module,exports){
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

},{"./DaysInYear":82,"./YearFromTime":114,"es-errors/eval":128}],86:[function(require,module,exports){
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

},{"../helpers/records/property-descriptor":124,"es-errors/type":133,"hasown":151}],87:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.11

module.exports = require('is-callable');

},{"is-callable":154}],88:[function(require,module,exports){
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

},{"../helpers/records/property-descriptor":124,"es-errors/type":133,"hasown":151}],89:[function(require,module,exports){
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

},{"./IsAccessorDescriptor":86,"./IsDataDescriptor":88,"./IsPropertyDescriptor":90,"es-errors/type":133}],90:[function(require,module,exports){
'use strict';

// TODO, semver-major: delete this

var isPropertyDescriptor = require('../helpers/records/property-descriptor');

// https://262.ecma-international.org/6.0/#sec-property-descriptor-specification-type

module.exports = function IsPropertyDescriptor(Desc) {
	return isPropertyDescriptor(Desc);
};

},{"../helpers/records/property-descriptor":124}],91:[function(require,module,exports){
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

},{"../helpers/isFinite":120,"../helpers/timeConstants":126}],92:[function(require,module,exports){
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

},{"../helpers/isFinite":120,"./DateFromTime":78,"./Day":79,"./MonthFromTime":95,"./ToInteger":104,"./YearFromTime":114,"./floor":116,"./modulo":117,"get-intrinsic":143}],93:[function(require,module,exports){
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

},{"../helpers/isFinite":120,"../helpers/timeConstants":126,"./ToInteger":104}],94:[function(require,module,exports){
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

},{"../helpers/timeConstants":126,"./floor":116,"./modulo":117}],95:[function(require,module,exports){
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

},{"./DayWithinYear":81,"./InLeapYear":85}],96:[function(require,module,exports){
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

},{"../helpers/isNaN":121}],97:[function(require,module,exports){
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

},{"../helpers/timeConstants":126,"./floor":116,"./modulo":117}],98:[function(require,module,exports){
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

},{"./Type":112}],99:[function(require,module,exports){
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


},{"../helpers/isFinite":120,"./ToNumber":105,"./abs":115,"get-intrinsic":143}],100:[function(require,module,exports){
'use strict';

var msPerDay = require('../helpers/timeConstants').msPerDay;

var DayFromYear = require('./DayFromYear');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

module.exports = function TimeFromYear(y) {
	return msPerDay * DayFromYear(y);
};

},{"../helpers/timeConstants":126,"./DayFromYear":80}],101:[function(require,module,exports){
'use strict';

var modulo = require('./modulo');

var msPerDay = require('../helpers/timeConstants').msPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.2

module.exports = function TimeWithinDay(t) {
	return modulo(t, msPerDay);
};


},{"../helpers/timeConstants":126,"./modulo":117}],102:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.2

module.exports = function ToBoolean(value) { return !!value; };

},{}],103:[function(require,module,exports){
'use strict';

var ToNumber = require('./ToNumber');

// http://262.ecma-international.org/5.1/#sec-9.5

module.exports = function ToInt32(x) {
	return ToNumber(x) >> 0;
};

},{"./ToNumber":105}],104:[function(require,module,exports){
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

},{"../helpers/isFinite":120,"../helpers/isNaN":121,"../helpers/sign":125,"./ToNumber":105,"./abs":115,"./floor":116}],105:[function(require,module,exports){
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

},{"./ToPrimitive":107,"call-bind/callBound":66,"safe-regex-test":166}],106:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.9

module.exports = require('es-object-atoms/ToObject');

},{"es-object-atoms/ToObject":136}],107:[function(require,module,exports){
'use strict';

// http://262.ecma-international.org/5.1/#sec-9.1

module.exports = require('es-to-primitive/es5');

},{"es-to-primitive/es5":138}],108:[function(require,module,exports){
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

},{"./IsCallable":87,"./ToBoolean":102,"./Type":112,"es-errors/type":133,"hasown":151}],109:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $String = GetIntrinsic('%String%');

// http://262.ecma-international.org/5.1/#sec-9.8

module.exports = function ToString(value) {
	return $String(value);
};


},{"get-intrinsic":143}],110:[function(require,module,exports){
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

},{"../helpers/isFinite":120,"../helpers/isNaN":121,"../helpers/sign":125,"./ToNumber":105,"./abs":115,"./floor":116,"./modulo":117}],111:[function(require,module,exports){
'use strict';

var ToNumber = require('./ToNumber');

// http://262.ecma-international.org/5.1/#sec-9.6

module.exports = function ToUint32(x) {
	return ToNumber(x) >>> 0;
};

},{"./ToNumber":105}],112:[function(require,module,exports){
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

},{}],113:[function(require,module,exports){
'use strict';

var Day = require('./Day');
var modulo = require('./modulo');

// https://262.ecma-international.org/5.1/#sec-15.9.1.6

module.exports = function WeekDay(t) {
	return modulo(Day(t) + 4, 7);
};

},{"./Day":79,"./modulo":117}],114:[function(require,module,exports){
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

},{"call-bind/callBound":66,"get-intrinsic":143}],115:[function(require,module,exports){
'use strict';

var GetIntrinsic = require('get-intrinsic');

var $abs = GetIntrinsic('%Math.abs%');

// http://262.ecma-international.org/5.1/#sec-5.2

module.exports = function abs(x) {
	return $abs(x);
};

},{"get-intrinsic":143}],116:[function(require,module,exports){
'use strict';

// var modulo = require('./modulo');
var $floor = Math.floor;

// http://262.ecma-international.org/5.1/#sec-5.2

module.exports = function floor(x) {
	// return x - modulo(x, 1);
	return $floor(x);
};

},{}],117:[function(require,module,exports){
'use strict';

var mod = require('../helpers/mod');

// https://262.ecma-international.org/5.1/#sec-5.2

module.exports = function modulo(x, y) {
	return mod(x, y);
};

},{"../helpers/mod":123}],118:[function(require,module,exports){
'use strict';

var modulo = require('./modulo');

var msPerSecond = require('../helpers/timeConstants').msPerSecond;

// https://262.ecma-international.org/5.1/#sec-15.9.1.10

module.exports = function msFromTime(t) {
	return modulo(t, msPerSecond);
};

},{"../helpers/timeConstants":126,"./modulo":117}],119:[function(require,module,exports){
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

},{"./5/AbstractEqualityComparison":74,"./5/AbstractRelationalComparison":75,"./5/Canonicalize":76,"./5/CheckObjectCoercible":77,"./5/DateFromTime":78,"./5/Day":79,"./5/DayFromYear":80,"./5/DayWithinYear":81,"./5/DaysInYear":82,"./5/FromPropertyDescriptor":83,"./5/HourFromTime":84,"./5/InLeapYear":85,"./5/IsAccessorDescriptor":86,"./5/IsCallable":87,"./5/IsDataDescriptor":88,"./5/IsGenericDescriptor":89,"./5/IsPropertyDescriptor":90,"./5/MakeDate":91,"./5/MakeDay":92,"./5/MakeTime":93,"./5/MinFromTime":94,"./5/MonthFromTime":95,"./5/SameValue":96,"./5/SecFromTime":97,"./5/StrictEqualityComparison":98,"./5/TimeClip":99,"./5/TimeFromYear":100,"./5/TimeWithinDay":101,"./5/ToBoolean":102,"./5/ToInt32":103,"./5/ToInteger":104,"./5/ToNumber":105,"./5/ToObject":106,"./5/ToPrimitive":107,"./5/ToPropertyDescriptor":108,"./5/ToString":109,"./5/ToUint16":110,"./5/ToUint32":111,"./5/Type":112,"./5/WeekDay":113,"./5/YearFromTime":114,"./5/abs":115,"./5/floor":116,"./5/modulo":117,"./5/msFromTime":118}],120:[function(require,module,exports){
'use strict';

var $isNaN = require('./isNaN');

module.exports = function (x) { return (typeof x === 'number' || typeof x === 'bigint') && !$isNaN(x) && x !== Infinity && x !== -Infinity; };

},{"./isNaN":121}],121:[function(require,module,exports){
'use strict';

module.exports = Number.isNaN || function isNaN(a) {
	return a !== a;
};

},{}],122:[function(require,module,exports){
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

},{"call-bind/callBound":66}],123:[function(require,module,exports){
'use strict';

var $floor = Math.floor;

module.exports = function mod(number, modulo) {
	var remain = number % modulo;
	return $floor(remain >= 0 ? remain : remain + modulo);
};

},{}],124:[function(require,module,exports){
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

},{"es-errors/type":133,"hasown":151}],125:[function(require,module,exports){
'use strict';

module.exports = function sign(number) {
	return number >= 0 ? 1 : -1;
};

},{}],126:[function(require,module,exports){
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

},{}],127:[function(require,module,exports){
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

},{"get-intrinsic":143}],128:[function(require,module,exports){
'use strict';

/** @type {import('./eval')} */
module.exports = EvalError;

},{}],129:[function(require,module,exports){
'use strict';

/** @type {import('.')} */
module.exports = Error;

},{}],130:[function(require,module,exports){
'use strict';

/** @type {import('./range')} */
module.exports = RangeError;

},{}],131:[function(require,module,exports){
'use strict';

/** @type {import('./ref')} */
module.exports = ReferenceError;

},{}],132:[function(require,module,exports){
'use strict';

/** @type {import('./syntax')} */
module.exports = SyntaxError;

},{}],133:[function(require,module,exports){
'use strict';

/** @type {import('./type')} */
module.exports = TypeError;

},{}],134:[function(require,module,exports){
'use strict';

/** @type {import('./uri')} */
module.exports = URIError;

},{}],135:[function(require,module,exports){
'use strict';

var $TypeError = require('es-errors/type');

/** @type {import('./RequireObjectCoercible')} */
module.exports = function RequireObjectCoercible(value) {
	if (value == null) {
		throw new $TypeError((arguments.length > 0 && arguments[1]) || ('Cannot call method on ' + value));
	}
	return value;
};

},{"es-errors/type":133}],136:[function(require,module,exports){
'use strict';

var $Object = require('./');
var RequireObjectCoercible = require('./RequireObjectCoercible');

/** @type {import('./ToObject')} */
module.exports = function ToObject(value) {
	RequireObjectCoercible(value);
	return $Object(value);
};

},{"./":137,"./RequireObjectCoercible":135}],137:[function(require,module,exports){
'use strict';

/** @type {import('.')} */
module.exports = Object;

},{}],138:[function(require,module,exports){
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

},{"./helpers/isPrimitive":139,"is-callable":154}],139:[function(require,module,exports){
'use strict';

module.exports = function isPrimitive(value) {
	return value === null || (typeof value !== 'function' && typeof value !== 'object');
};

},{}],140:[function(require,module,exports){
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

},{"is-object":155,"merge-descriptors":157}],141:[function(require,module,exports){
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

},{}],142:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

module.exports = Function.prototype.bind || implementation;

},{"./implementation":141}],143:[function(require,module,exports){
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

},{"es-errors":129,"es-errors/eval":128,"es-errors/range":130,"es-errors/ref":131,"es-errors/syntax":132,"es-errors/type":133,"es-errors/uri":134,"function-bind":142,"has-proto":146,"has-symbols":147,"hasown":151}],144:[function(require,module,exports){
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

},{"get-intrinsic":143}],145:[function(require,module,exports){
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

},{"es-define-property":127}],146:[function(require,module,exports){
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

},{}],147:[function(require,module,exports){
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

},{"./shams":148}],148:[function(require,module,exports){
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

},{}],149:[function(require,module,exports){
'use strict';

var hasSymbols = require('has-symbols/shams');

/** @type {import('.')} */
module.exports = function hasToStringTagShams() {
	return hasSymbols() && !!Symbol.toStringTag;
};

},{"has-symbols/shams":148}],150:[function(require,module,exports){
'use strict';

var bind = require('function-bind');

module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);

},{"function-bind":142}],151:[function(require,module,exports){
'use strict';

var call = Function.prototype.call;
var $hasOwn = Object.prototype.hasOwnProperty;
var bind = require('function-bind');

/** @type {import('.')} */
module.exports = bind.call(call, $hasOwn);

},{"function-bind":142}],152:[function(require,module,exports){
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

},{}],153:[function(require,module,exports){
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

},{}],154:[function(require,module,exports){
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

},{}],155:[function(require,module,exports){
'use strict';

module.exports = function isObject(x) {
	return typeof x === 'object' && x !== null;
};

},{}],156:[function(require,module,exports){
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

},{"call-bind/callBound":66,"has-tostringtag/shams":149}],157:[function(require,module,exports){
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

},{}],158:[function(require,module,exports){
'use strict'

module.exports = function createNotFoundError (path) {
  var err = new Error('Cannot find module \'' + path + '\'')
  err.code = 'MODULE_NOT_FOUND'
  return err
}

},{}],159:[function(require,module,exports){
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

},{"./isArguments":161}],160:[function(require,module,exports){
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

},{"./implementation":159,"./isArguments":161}],161:[function(require,module,exports){
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

},{}],162:[function(require,module,exports){
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

},{}],163:[function(require,module,exports){
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

},{"fill-keys":140,"module-not-found-error":158}],164:[function(require,module,exports){
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
},{"_process":162,"through":179,"timers":180}],165:[function(require,module,exports){
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

},{"buffer":48}],166:[function(require,module,exports){
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

},{"call-bind/callBound":66,"es-errors/type":133,"is-regex":156}],167:[function(require,module,exports){
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

},{"define-data-property":71,"es-errors/type":133,"get-intrinsic":143,"gopd":144,"has-property-descriptors":145}],168:[function(require,module,exports){
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

},{"es-abstract/es5":119,"function-bind":142}],169:[function(require,module,exports){
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

},{"./implementation":168,"./polyfill":170,"./shim":171,"define-properties":72,"function-bind":142}],170:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

var zeroWidthSpace = '\u200b';

module.exports = function getPolyfill() {
	if (String.prototype.trim && zeroWidthSpace.trim() === zeroWidthSpace) {
		return String.prototype.trim;
	}
	return implementation;
};

},{"./implementation":168}],171:[function(require,module,exports){
'use strict';

var define = require('define-properties');
var getPolyfill = require('./polyfill');

module.exports = function shimStringTrim() {
	var polyfill = getPolyfill();
	define(String.prototype, { trim: polyfill }, { trim: function () { return String.prototype.trim !== polyfill; } });
	return polyfill;
};

},{"./polyfill":170,"define-properties":72}],172:[function(require,module,exports){
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
},{"safe-buffer":165}],173:[function(require,module,exports){
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
},{"./lib/default_stream":174,"./lib/results":176,"./lib/test":177,"_process":162,"defined":73,"through":179,"timers":180}],174:[function(require,module,exports){
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
},{"_process":162,"fs":47,"through":179}],175:[function(require,module,exports){
(function (process,setImmediate){(function (){
module.exports = typeof setImmediate !== 'undefined'
    ? setImmediate
    : process.nextTick
;

}).call(this)}).call(this,require('_process'),require("timers").setImmediate)
},{"_process":162,"timers":180}],176:[function(require,module,exports){
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
},{"_process":162,"events":49,"function-bind":142,"has":150,"inherits":153,"object-inspect":178,"resumer":164,"through":179,"timers":180}],177:[function(require,module,exports){
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
},{"./next_tick":175,"deep-equal":68,"defined":73,"events":49,"has":150,"inherits":153,"path":50,"string.prototype.trim":169}],178:[function(require,module,exports){
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

},{}],179:[function(require,module,exports){
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
},{"_process":162,"stream":51}],180:[function(require,module,exports){
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
},{"process/browser.js":162,"timers":180}],181:[function(require,module,exports){
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
},{}]},{},[36,37]);
