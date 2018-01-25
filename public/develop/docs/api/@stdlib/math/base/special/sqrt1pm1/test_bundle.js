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
'use strict';

// MAIN //

var ctor = ( typeof Float64Array === 'function' ) ? Float64Array : null; // eslint-disable-line stdlib/require-globals


// EXPORTS //

module.exports = ctor;

},{}],2:[function(require,module,exports){
'use strict';

/**
* Typed array constructor which returns a typed array representing an array of double-precision floating-point numbers in the platform byte order.
*
* @module @stdlib/array/float64
*
* @example
* var ctor = require( '@stdlib/array/float64' );
*
* var arr = new ctor( 10 );
* // returns <Float64Array>
*/

// MODULES //

var hasFloat64ArraySupport = require( '@stdlib/utils/detect-float64array-support' );
var builtin = require( './float64array.js' );
var polyfill = require( './polyfill.js' );


// MAIN //

var ctor;
if ( hasFloat64ArraySupport() ) {
	ctor = builtin;
} else {
	ctor = polyfill;
}


// EXPORTS //

module.exports = ctor;

},{"./float64array.js":1,"./polyfill.js":3,"@stdlib/utils/detect-float64array-support":58}],3:[function(require,module,exports){
'use strict';

// TODO: write polyfill

// MAIN //

/**
* Typed array which represents an array of double-precision floating-point numbers in the platform byte order.
*
* @throws {Error} not implemented
*/
function polyfill() {
	throw new Error( 'not implemented' );
}


// EXPORTS //

module.exports = polyfill;

},{}],4:[function(require,module,exports){
'use strict';

/**
* Typed array constructor which returns a typed array representing an array of 16-bit unsigned integers in the platform byte order.
*
* @module @stdlib/array/uint16
*
* @example
* var ctor = require( '@stdlib/array/uint16' );
*
* var arr = new ctor( 10 );
* // returns <Uint16Array>
*/

// MODULES //

var hasUint16ArraySupport = require( '@stdlib/utils/detect-uint16array-support' );
var builtin = require( './uint16array.js' );
var polyfill = require( './polyfill.js' );


// MAIN //

var ctor;
if ( hasUint16ArraySupport() ) {
	ctor = builtin;
} else {
	ctor = polyfill;
}


// EXPORTS //

module.exports = ctor;

},{"./polyfill.js":5,"./uint16array.js":6,"@stdlib/utils/detect-uint16array-support":64}],5:[function(require,module,exports){
'use strict';

// TODO: write polyfill

// MAIN //

/**
* Typed array which represents an array of 16-bit unsigned integers in the platform byte order.
*
* @throws {Error} not implemented
*/
function polyfill() {
	throw new Error( 'not implemented' );
}


// EXPORTS //

module.exports = polyfill;

},{}],6:[function(require,module,exports){
'use strict';

// MAIN //

var ctor = ( typeof Uint16Array === 'function' ) ? Uint16Array : null; // eslint-disable-line stdlib/require-globals


// EXPORTS //

module.exports = ctor;

},{}],7:[function(require,module,exports){
'use strict';

/**
* Typed array constructor which returns a typed array representing an array of 32-bit unsigned integers in the platform byte order.
*
* @module @stdlib/array/uint32
*
* @example
* var ctor = require( '@stdlib/array/uint32' );
*
* var arr = new ctor( 10 );
* // returns <Uint32Array>
*/

// MODULES //

var hasUint32ArraySupport = require( '@stdlib/utils/detect-uint32array-support' );
var builtin = require( './uint32array.js' );
var polyfill = require( './polyfill.js' );


// MAIN //

var ctor;
if ( hasUint32ArraySupport() ) {
	ctor = builtin;
} else {
	ctor = polyfill;
}


// EXPORTS //

module.exports = ctor;

},{"./polyfill.js":8,"./uint32array.js":9,"@stdlib/utils/detect-uint32array-support":67}],8:[function(require,module,exports){
'use strict';

// TODO: write polyfill

// MAIN //

/**
* Typed array which represents an array of 32-bit unsigned integers in the platform byte order.
*
* @throws {Error} not implemented
*/
function polyfill() {
	throw new Error( 'not implemented' );
}


// EXPORTS //

module.exports = polyfill;

},{}],9:[function(require,module,exports){
'use strict';

// MAIN //

var ctor = ( typeof Uint32Array === 'function' ) ? Uint32Array : null; // eslint-disable-line stdlib/require-globals


// EXPORTS //

module.exports = ctor;

},{}],10:[function(require,module,exports){
'use strict';

/**
* Typed array constructor which returns a typed array representing an array of 8-bit unsigned integers in the platform byte order.
*
* @module @stdlib/array/uint8
*
* @example
* var ctor = require( '@stdlib/array/uint8' );
*
* var arr = new ctor( 10 );
* // returns <Uint8Array>
*/

// MODULES //

var hasUint8ArraySupport = require( '@stdlib/utils/detect-uint8array-support' );
var builtin = require( './uint8array.js' );
var polyfill = require( './polyfill.js' );


// MAIN //

var ctor;
if ( hasUint8ArraySupport() ) {
	ctor = builtin;
} else {
	ctor = polyfill;
}


// EXPORTS //

module.exports = ctor;

},{"./polyfill.js":11,"./uint8array.js":12,"@stdlib/utils/detect-uint8array-support":70}],11:[function(require,module,exports){
'use strict';

// TODO: write polyfill

// MAIN //

/**
* Typed array which represents an array of 8-bit unsigned integers in the platform byte order.
*
* @throws {Error} not implemented
*/
function polyfill() {
	throw new Error( 'not implemented' );
}


// EXPORTS //

module.exports = polyfill;

},{}],12:[function(require,module,exports){
'use strict';

// MAIN //

var ctor = ( typeof Uint8Array === 'function' ) ? Uint8Array : null; // eslint-disable-line stdlib/require-globals


// EXPORTS //

module.exports = ctor;

},{}],13:[function(require,module,exports){
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

},{}],14:[function(require,module,exports){
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

var hasOwnProp = require( './has_own_property.js' );


// EXPORTS //

module.exports = hasOwnProp;

},{"./has_own_property.js":13}],15:[function(require,module,exports){
'use strict';

/**
* Test if a value is a Float64Array.
*
* @module @stdlib/assert/is-float64array
*
* @example
* var isFloat64Array = require( '@stdlib/assert/is-float64array' );
*
* var bool = isFloat64Array( new Float64Array( 10 ) );
* // returns true
*
* bool = isFloat64Array( [] );
* // returns false
*/

// MODULES //

var isFloat64Array = require( './is_float64array.js' );


// EXPORTS //

module.exports = isFloat64Array;

},{"./is_float64array.js":16}],16:[function(require,module,exports){
'use strict';

// MODULES //

var nativeClass = require( '@stdlib/utils/native-class' );


// MAIN //

/**
* Tests if a value is a Float64Array.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating whether value is a Float64Array
*
* @example
* var bool = isFloat64Array( new Float64Array( 10 ) );
* // returns true
*
* @example
* var bool = isFloat64Array( [] );
* // returns false
*/
function isFloat64Array( value ) {
	return ( nativeClass( value ) === '[object Float64Array]' );
}


// EXPORTS //

module.exports = isFloat64Array;

},{"@stdlib/utils/native-class":72}],17:[function(require,module,exports){
'use strict';

// MODULES //

var Uint8Array = require( '@stdlib/array/uint8' );
var Uint16Array = require( '@stdlib/array/uint16' );


// MAIN //

var ctors = {
	'uint16': Uint16Array,
	'uint8': Uint8Array
};


// EXPORTS //

module.exports = ctors;

},{"@stdlib/array/uint16":4,"@stdlib/array/uint8":10}],18:[function(require,module,exports){
'use strict';

/**
* Returns a boolean indicating if an environment is little endian.
*
* @module @stdlib/assert/is-little-endian
*
* @example
* var IS_LITTLE_ENDIAN = require( '@stdlib/assert/is-little-endian' );
*
* var bool = IS_LITTLE_ENDIAN;
* // returns <boolean>
*/

// MODULES //

var IS_LITTLE_ENDIAN = require( './is_little_endian.js' );


// EXPORTS //

module.exports = IS_LITTLE_ENDIAN;

},{"./is_little_endian.js":19}],19:[function(require,module,exports){
'use strict';

// MODULES //

var ctors = require( './ctors.js' );


// MAIN //

/**
* Returns a boolean indicating if an environment is little endian.
*
* @returns {boolean} boolean indicating if an environment is little endian
*
* @example
* var bool = isLittleEndian();
* // returns <boolean>
*/
function isLittleEndian() {
	var uint16view;
	var uint8view;

	uint16view = new ctors[ 'uint16' ]( 1 );

	/*
	* Set the uint16 view to a value having distinguishable lower and higher order words.
	* 4660 => 0x1234 => 0x12 0x34 => '00010010 00110100' => (0x12,0x34) == (18,52)
	*/
	uint16view[ 0 ] = 0x1234;

	// Create a uint8 view on top of the uint16 buffer:
	uint8view = new ctors[ 'uint8' ]( uint16view.buffer );

	// If little endian, the least significant byte will be first...
	return ( uint8view[ 0 ] === 0x34 );
}


// EXPORTS //

module.exports = isLittleEndian();

},{"./ctors.js":17}],20:[function(require,module,exports){
'use strict';

/**
* Test if a value is a Uint16Array.
*
* @module @stdlib/assert/is-uint16array
*
* @example
* var isUint16Array = require( '@stdlib/assert/is-uint16array' );
*
* var bool = isUint16Array( new Uint16Array( 10 ) );
* // returns true
*
* bool = isUint16Array( [] );
* // returns false
*/

// MODULES //

var isUint16Array = require( './is_uint16array.js' );


// EXPORTS //

module.exports = isUint16Array;

},{"./is_uint16array.js":21}],21:[function(require,module,exports){
'use strict';

// MODULES //

var nativeClass = require( '@stdlib/utils/native-class' );


// MAIN //

/**
* Tests if a value is a Uint16Array.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating whether value is a Uint16Array
*
* @example
* var bool = isUint16Array( new Uint16Array( 10 ) );
* // returns true
*
* @example
* var bool = isUint16Array( [] );
* // returns false
*/
function isUint16Array( value ) {
	return ( nativeClass( value ) === '[object Uint16Array]' );
}


// EXPORTS //

module.exports = isUint16Array;

},{"@stdlib/utils/native-class":72}],22:[function(require,module,exports){
'use strict';

/**
* Test if a value is a Uint32Array.
*
* @module @stdlib/assert/is-uint32array
*
* @example
* var isUint32Array = require( '@stdlib/assert/is-uint32array' );
*
* var bool = isUint32Array( new Uint32Array( 10 ) );
* // returns true
*
* bool = isUint32Array( [] );
* // returns false
*/

// MODULES //

var isUint32Array = require( './is_uint32array.js' );


// EXPORTS //

module.exports = isUint32Array;

},{"./is_uint32array.js":23}],23:[function(require,module,exports){
'use strict';

// MODULES //

var nativeClass = require( '@stdlib/utils/native-class' );


// MAIN //

/**
* Tests if a value is a Uint32Array.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating whether value is a Uint32Array
*
* @example
* var bool = isUint32Array( new Uint32Array( 10 ) );
* // returns true
*
* @example
* var bool = isUint32Array( [] );
* // returns false
*/
function isUint32Array( value ) {
	return ( nativeClass( value ) === '[object Uint32Array]' );
}


// EXPORTS //

module.exports = isUint32Array;

},{"@stdlib/utils/native-class":72}],24:[function(require,module,exports){
'use strict';

/**
* Test if a value is a Uint8Array.
*
* @module @stdlib/assert/is-uint8array
*
* @example
* var isUint8Array = require( '@stdlib/assert/is-uint8array' );
*
* var bool = isUint8Array( new Uint8Array( 10 ) );
* // returns true
*
* bool = isUint8Array( [] );
* // returns false
*/

// MODULES //

var isUint8Array = require( './is_uint8array.js' );


// EXPORTS //

module.exports = isUint8Array;

},{"./is_uint8array.js":25}],25:[function(require,module,exports){
'use strict';

// MODULES //

var nativeClass = require( '@stdlib/utils/native-class' );


// MAIN //

/**
* Tests if a value is a Uint8Array.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating whether value is a Uint8Array
*
* @example
* var bool = isUint8Array( new Uint8Array( 10 ) );
* // returns true
*
* @example
* var bool = isUint8Array( [] );
* // returns false
*/
function isUint8Array( value ) {
	return ( nativeClass( value ) === '[object Uint8Array]' );
}


// EXPORTS //

module.exports = isUint8Array;

},{"@stdlib/utils/native-class":72}],26:[function(require,module,exports){
'use strict';

/**
* Difference between one and the smallest value greater than one that can be represented as a double-precision floating-point number.
*
* @module @stdlib/constants/math/float64-eps
* @type {number}
*
* @example
* var FLOAT64_EPSILON = require( '@stdlib/constants/math/float64-eps' );
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

},{}],27:[function(require,module,exports){
'use strict';

/**
* The bias of a double-precision floating-point number's exponent.
*
* @module @stdlib/constants/math/float64-exponent-bias
* @type {integer32}
*
* @example
* var FLOAT64_EXPONENT_BIAS = require( '@stdlib/constants/math/float64-exponent-bias' );
* // returns 1023
*/


// MAIN //

/**
* Bias of a double-precision floating-point number's exponent.
*
* ## Notes
*
* The bias can be computed via
*
* ```tex
* \mathrm{bias} = 2^{k-1} - 1
* ```
*
* where \\(k\\) is the number of bits in the exponent; here, \\(k = 11\\).
*
* @constant
* @type {integer32}
* @default 1023
* @see [IEEE 754]{@link https://en.wikipedia.org/wiki/IEEE_754-1985}
*/
var FLOAT64_EXPONENT_BIAS = 1023|0; // asm type annotation


// EXPORTS //

module.exports = FLOAT64_EXPONENT_BIAS;

},{}],28:[function(require,module,exports){
'use strict';

/**
* One half times the natural logarithm of 2.
*
* @module @stdlib/constants/math/float64-half-ln-two
* @type {number}
*
* @example
* var HALF_LN2 = require( '@stdlib/constants/math/float64-half_ln2' );
* // returns 3.46573590279972654709e-01
*/


// MAIN //

/**
* One half times the natural logarithm of 2.
*
* ```tex
* \frac{\ln 2}{2}
* ```
*
* @constant
* @type {number}
* @default 3.46573590279972654709e-01
*/
var HALF_LN2 = 3.46573590279972654709e-01; // 0x3FD62E42 0xFEFA39EF


// EXPORTS //

module.exports = HALF_LN2;

},{}],29:[function(require,module,exports){
'use strict';

/**
* Double-precision floating-point negative infinity.
*
* @module @stdlib/constants/math/float64-ninf
* @type {number}
*
* @example
* var FLOAT64_NINF = require( '@stdlib/constants/math/float64-ninf' );
* // returns -Infinity
*/


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

},{}],30:[function(require,module,exports){
'use strict';

/**
* Double-precision floating-point positive infinity.
*
* @module @stdlib/constants/math/float64-pinf
* @type {number}
*
* @example
* var FLOAT64_PINF = require( '@stdlib/constants/math/float64-pinf' );
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
var FLOAT64_PINF = Number.POSITIVE_INFINITY;


// EXPORTS //

module.exports = FLOAT64_PINF;

},{}],31:[function(require,module,exports){
'use strict';

/**
* Maximum unsigned 16-bit integer.
*
* @module @stdlib/constants/math/uint16-max
* @type {integer32}
*
* @example
* var UINT16_MAX = require( '@stdlib/constants/math/uint16-max' );
* // returns 65535
*/


// MAIN //

/**
* Maximum unsigned 16-bit integer.
*
* ## Notes
*
* The number has the value
*
* ```tex
* 2^{16} - 1
* ```
*
* which corresponds to the bit sequence
*
* ```binarystring
* 1111111111111111
* ```
*
* @constant
* @type {integer32}
* @default 65535
*/
var UINT16_MAX = 65535|0; // asm type annotation


// EXPORTS //

module.exports = UINT16_MAX;

},{}],32:[function(require,module,exports){
'use strict';

/**
* Maximum unsigned 32-bit integer.
*
* @module @stdlib/constants/math/uint32-max
* @type {uinteger32}
*
* @example
* var UINT32_MAX = require( '@stdlib/constants/math/uint32-max' );
* // returns 4294967295
*/


// MAIN //

/**
* Maximum unsigned 32-bit integer.
*
* ## Notes
*
* The number has the value
*
* ```tex
* 2^{32} - 1
* ```
*
* which corresponds to the bit sequence
*
* ```binarystring
* 11111111111111111111111111111111
* ```
*
* @constant
* @type {uinteger32}
* @default 4294967295
*/
var UINT32_MAX = 4294967295;


// EXPORTS //

module.exports = UINT32_MAX;

},{}],33:[function(require,module,exports){
'use strict';

/**
* Maximum unsigned 8-bit integer.
*
* @module @stdlib/constants/math/uint8-max
* @type {integer32}
*
* @example
* var UINT8_MAX = require( '@stdlib/constants/math/uint8-max' );
* // returns 255
*/


// MAIN //

/**
* Maximum unsigned 8-bit integer.
*
* ## Notes
*
* The number has the value
*
* ```tex
* 2^{8} - 1
* ```
*
* which corresponds to the bit sequence
*
* ```binarystring
* 11111111
* ```
*
* @constant
* @type {integer32}
* @default 255
*/
var UINT8_MAX = 255|0; // asm type annotation


// EXPORTS //

module.exports = UINT8_MAX;

},{}],34:[function(require,module,exports){
'use strict';

/**
* Test if a numeric value is `NaN`.
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

var isnan = require( './is_nan.js' );


// EXPORTS //

module.exports = isnan;

},{"./is_nan.js":35}],35:[function(require,module,exports){
'use strict';

// MAIN //

/**
* Tests if a numeric value is `NaN`.
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

},{}],36:[function(require,module,exports){
'use strict';

/**
* Computes the absolute value of `x`.
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
	if ( x < 0.0 ) {
		return -x;
	}
	if ( x === 0.0 ) {
		return 0.0; // handle negative zero
	}
	return x;
}


// EXPORTS //

module.exports = abs;

},{}],37:[function(require,module,exports){
'use strict';

/**
* Compute an absolute value.
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

var abs = require( './abs.js' );


// EXPORTS //

module.exports = abs;

},{"./abs.js":36}],38:[function(require,module,exports){
'use strict';

/*
* The original C code, long comment, copyright, license, and constants are from [netlib]{@link http://www.netlib.org/fdlibm/s_expm1.c}.
*
* The implementation follows the original, but has been modified for JavaScript.
*/

/*
* ====================================================
* Copyright (C) 2004 by Sun Microsystems, Inc. All rights reserved.
*
* Permission to use, copy, modify, and distribute this
* software is freely granted, provided that this notice
* is preserved.
* ====================================================
*/

// MODULES //

var isnan = require( '@stdlib/math/base/assert/is-nan' );
var highWord = require( '@stdlib/number/float64/base/get-high-word' );
var setHighWord = require( '@stdlib/number/float64/base/set-high-word' );
var PINF = require( '@stdlib/constants/math/float64-pinf' );
var NINF = require( '@stdlib/constants/math/float64-ninf' );
var BIAS = require( '@stdlib/constants/math/float64-exponent-bias' );
var LN2_HALF = require( '@stdlib/constants/math/float64-half-ln-two' );
var polyval = require( './polyval_q.js' );


// VARIABLES //

var OVERFLOW_THRESHOLD = 7.09782712893383973096e+02; // 0x40862E42 0xFEFA39EF

// High and low words of ln(2):
var LN2_HI = 6.93147180369123816490e-01; // 0x3FE62E42 0xFEE00000
var LN2_LO = 1.90821492927058770002e-10; // 0x3DEA39EF 0x35793C76

// 1 / ln(2):
var LN2_INV = 1.44269504088896338700e+00; // 0x3FF71547 0x652B82FE

// ln(2) * 56:
var LN2x56 = 3.88162421113569373274e+01; // 0x4043687A 0x9F1AF2B1

// ln(2) * 1.5:
var LN2_HALFX3 = 1.03972077083991796413e+00; // 0x3FF0A2B2 0x3F3BAB73


// MAIN //

/**
* Computes `exp(x) - 1`.
*
* ## Method
*
* 1.  Given \\(x\\), we use argument reduction to find \\(r\\) and an integer \\(k\\) such that
*
*     ```tex
*     x = k \cdot \ln(2) + r
*     ```
*
*     where
*
*     ```tex
*     |r| \leq \frac{\ln(2)}{2} \approx 0.34658
*     ```
*
*     <!-- <note> -->
*
*     A correction term \\(c\\) will need to be computed to compensate for the error in \\(r\\) when rounded to a floating-point number.
*
*     <!-- </note> -->
*
* 2.  To approximate \\(\operatorname{expm1}(r)\\), we use a special rational function on the interval \\([0,0.34658]\\). Since
*
*     ```tex
*     r \frac{e^r + 1}{e^r - 1} = 2 + \frac{r^2}{6} - \frac{r^4}{360} + \ldots
*     ```
*
*     we define \\(\operatorname{R1}(r^2)\\) by
*
*     ```tex
*     r \frac{e^r + 1}{e^r - 1} = 2 + \frac{r^2}{6} \operatorname{R1}(r^2)
*     ```
*
*     That is,
*
*     ```tex
*     \begin{align*}
*     \operatorname{R1}(r^2) &= \frac{6}{r} \biggl(\frac{e^r+1}{e^r-1} - \frac{2}{r}\biggr) \\
*     &= \frac{6}{r} \biggl( 1 + 2 \biggl(\frac{1}{e^r-1} - \frac{1}{r}\biggr)\biggr) \\
*     &= 1 - \frac{r^2}{60} + \frac{r^4}{2520} - \frac{r^6}{100800} + \ldots
*     \end{align*}
*     ```
*
*     We use a special Remes algorithm on \\([0,0.347]\\) to generate a polynomial of degree \\(5\\) in \\(r^2\\) to approximate \\(\mathrm{R1}\\). The maximum error of this polynomial approximation is bounded by \\(2^{-61}\\). In other words,
*
*     ```tex
*     \operatorname{R1}(z) \approx 1 + \mathrm{Q1} \cdot z + \mathrm{Q2} \cdot z^2 + \mathrm{Q3} \cdot z^3 + \mathrm{Q4} \cdot z^4 + \mathrm{Q5} \cdot z^5
*     ```
*
*     where
*
*     ```tex
*     \begin{align*}
*     \mathrm{Q1} &= -1.6666666666666567384\mbox{e-}2 \\
*     \mathrm{Q2} &= 3.9682539681370365873\mbox{e-}4 \\
*     \mathrm{Q3} &= -9.9206344733435987357\mbox{e-}6 \\
*     \mathrm{Q4} &= 2.5051361420808517002\mbox{e-}7 \\
*     \mathrm{Q5} &= -6.2843505682382617102\mbox{e-}9
*     \end{align*}
*     ```
*
*     where \\(z = r^2\\) and the values of \\(\mathrm{Q1}\\) to \\(\mathrm{Q5}\\) are listed in the source. The error is bounded by
*
*     ```tex
*     \biggl| 1 + \mathrm{Q1} \cdot z + \ldots + \mathrm{Q5} \cdot z - \operatorname{R1}(z) \biggr| \leq 2^{-61}
*     ```
*
*     \\(\operatorname{expm1}(r) = e^r - 1\\) is then computed by the following specific way which minimizes the accumulated rounding error
*
*     ```tex
*     \operatorname{expm1}(r) = r + \frac{r^2}{2} + \frac{r^3}{2} \biggl( \frac{3 - (\mathrm{R1} + \mathrm{R1} \cdot \frac{r}{2})}{6 - r ( 3 - \mathrm{R1} \cdot \frac{r}{2})} \biggr)
*     ```
*
*     To compensate for the error in the argument reduction, we use
*
*     ```tex
*     \begin{align*}
*     \operatorname{expm1}(r+c) &= \operatorname{expm1}(r) + c + \operatorname{expm1}(r) \cdot c \\
*     &\approx \operatorname{expm1}(r) + c + rc
*     \end{align*}
*     ```
*
*     Thus, \\(c + rc\\) will be added in as the correction terms for \\(\operatorname{expm1}(r+c)\\). Now, we can rearrange the term to avoid optimization screw up.
*
*     ```tex
*     \begin{align*}
*     \operatorname{expm1}(r+c) &\approx r - \biggl( \biggl( r + \biggl( \frac{r^2}{2} \biggl( \frac{\mathrm{R1} - (3 - \mathrm{R1} \cdot \frac{r}{2})}{6 - r (3 - \mathrm{R1} \cdot \frac{r}{2})} \biggr) - c \biggr) - c \biggr) - \frac{r^2}{2} \biggr) \\
*     &= r - \mathrm{E}
*     \end{align*}
*     ```
*
* 3.  To scale back to obtain \\(\operatorname{expm1}(x)\\), we have (from step 1)
*
*     ```tex
*     \operatorname{expm1}(x) = \begin{cases}
*     2^k  (\operatorname{expm1}(r) + 1) - 1 \\
*     2^k (\operatorname{expm1}(r) + (1-2^{-k}))
*     \end{cases}
*     ```
*
* ## Special Cases
*
* ```tex
* \begin{align*}
* \operatorname{expm1}(\infty) &= \infty \\
* \operatorname{expm1}(-\infty) &= -1 \\
* \operatorname{expm1}(\mathrm{NaN}) &= \mathrm{NaN}
* \end{align*}
* ```
*
*
* ## Notes
*
* -   For finite arguments, only \\(\operatorname{expm1}(0) = 0\\) is exact.
*
* -   To save one multiplication, we scale the coefficient \\(\mathrm{Qi}\\) to \\(\mathrm{Qi} \cdot {2^i}\\) and replace \\(z\\) by \\(\frac{x^2}{2}\\).
*
* -   To achieve maximum accuracy, we compute \\(\operatorname{expm1}(x)\\) by
*
*     -   if \\(x < -56 \cdot \ln(2)\\), return \\(-1.0\\) (raise inexact if \\(x\\) does not equal \\(\infty\\))
*
*     -   if \\(k = 0\\), return \\(r-\mathrm{E}\\)
*
*     -   if \\(k = -1\\), return \\(\frac{(r-\mathrm{E})-1}{2}\\)
*
*     -   if \\(k = 1\\),
*
*         -   if \\(r < -0.25\\), return \\(2((r+0.5)- \mathrm{E})\\)
*         -   else return \\(1+2(r-\mathrm{E})\\)
*
*     -   if \\(k < -2\\) or \\(k > 56\\), return \\(2^k(1-(\mathrm{E}-r)) - 1\\) (or \\(e^x-1\\))
*
*     -   if \\(k \leq 20\\), return \\(2^k((1-2^{-k})-(\mathrm{E}-r))\\)
*
*     -   else return \\(2^k(1-((\mathrm{E}+2^{-k})-r))\\)

* -   For IEEE 754 double, if \\(x > 7.09782712893383973096\mbox{e+}02\\), then \\(\operatorname{expm1}(x)\\) will overflow.
*
* -   The hexadecimal values listed in the source are the intended ones for the implementation constants. Decimal values may be used, provided that the compiler will convert from decimal to binary accurately enough to produce the intended hexadecimal values.
*
*
* ## Accuracy
*
* According to an error analysis, the error is always less than \\(1\\) ulp (unit in the last place).
*
*
* @param {number} x - input value
* @returns {number} function value
*
* @example
* var v = expm1( 0.2 );
* // returns ~0.221
*
* @example
* var v = expm1( -9.0 );
* // returns ~-0.999
*
* @example
* var v = expm1( 0.0 );
* // returns 0.0
*
* @example
* var v = expm1( NaN );
* // returns NaN
*/
function expm1( x ) {
	var halfX;
	var sign;
	var hi;
	var lo;
	var hx;
	var r1;
	var y;
	var z;
	var c;
	var t;
	var e;
	var k;

	if ( x === PINF || isnan( x ) ) {
		return x;
	}
	if ( x === NINF ) {
		return -1.0;
	}
	if ( x === 0.0 ) {
		return x; // handles +-0 (IEEE 754-2008)
	}
	// Set y = |x|:
	if ( x < 0.0 ) {
		sign = true;
		y = -x;
	} else {
		sign = false;
		y = x;
	}
	// Filter out huge and non-finite arguments...
	if ( y >= LN2x56 ) { // if |x| >= 56*ln(2)
		if ( sign ) { // if x <= -56*ln(2)
			return -1.0;
		}
		if ( y >= OVERFLOW_THRESHOLD ) { // if |x| >= 709.78...
			return PINF;
		}
	}
	// Extract the more significant bits from |x|:
	hx = highWord( y )|0; // asm type annotation

	// Argument reduction...
	if ( y > LN2_HALF ) { // if |x| > 0.5*ln(2)
		if ( y < LN2_HALFX3 ) { // if |x| < 1.5*ln(2)
			if ( sign ) {
				hi = x + LN2_HI;
				lo = -LN2_LO;
				k = -1;
			} else {
				hi = x - LN2_HI;
				lo = LN2_LO;
				k = 1;
			}
		} else {
			if ( sign ) {
				k = (LN2_INV*x) - 0.5;
			} else {
				k = (LN2_INV*x) + 0.5;
			}
			k |= 0; // use a bitwise OR to cast `k` to an integer (see also asm.js type annotations: http://asmjs.org/spec/latest/#annotations)
			t = k;
			hi = x - (t*LN2_HI); // t*ln2_hi is exact here
			lo = t * LN2_LO;
		}
		x = hi - lo;
		c = (hi-x) - lo;
	}
	// if |x| < 2**-54 => high word: 0 01111001001 00000000000000000000 => 0x3c900000 = 1016070144  => exponent = 01111001001 = 969 = 1023-54
	else if ( hx < 1016070144 ) {
		return x;
	}
	else {
		k = 0;
	}
	// x is now in primary range...
	halfX = 0.5 * x;
	z = x * halfX;

	r1 = 1.0 + ( z * polyval( z ) );

	t = 3.0 - (r1*halfX);
	e = z * ( (r1-t) / (6.0 - (x*t)) );
	if ( k === 0 ) {
		return x - ( (x*e) - z );	// c is 0
	}
	e = ( x * (e-c) ) - c;
	e -= z;
	if ( k === -1 ) {
		return ( 0.5*(x-e) )- 0.5;
	}
	if ( k === 1 ) {
		if ( x < -0.25 ) {
			return -2.0 * ( e - (x+0.5) );
		}
		return 1 + ( 2.0 * (x-e) );
	}
	if ( k <= -2 || k > 56 ) { // suffice to return exp(x)-1
		y = 1.0 - (e-x);

		// Add k to y's exponent:
		hi = (highWord( y ) + (k<<20))|0; // asm type annotation
		y = setHighWord( y, hi );

		return y - 1.0;
	}
	t = 1.0;
	if ( k < 20 ) {
		// 0x3ff00000 - (0x200000>>k) = 1072693248 - (0x200000>>k) => 0x200000 = 0 00000000010 00000000000000000000
		hi = (1072693248 - (0x200000>>k))|0; // asm type annotation
		t = setHighWord( t, hi ); // t=1-2^-k
		y = t - (e-x);
	} else {
		hi = ( (BIAS-k)<<20 )|0; // asm type annotation
		t = setHighWord( t, hi ); // t=2^-k
		y = x - (e+t);
		y += 1.0;
	}
	// Add k to y's exponent:
	hi = (highWord( y ) + (k<<20))|0; // asm type annotation
	return setHighWord( y, hi );
}


// EXPORTS //

module.exports = expm1;

},{"./polyval_q.js":40,"@stdlib/constants/math/float64-exponent-bias":27,"@stdlib/constants/math/float64-half-ln-two":28,"@stdlib/constants/math/float64-ninf":29,"@stdlib/constants/math/float64-pinf":30,"@stdlib/math/base/assert/is-nan":34,"@stdlib/number/float64/base/get-high-word":51,"@stdlib/number/float64/base/set-high-word":54}],39:[function(require,module,exports){
'use strict';

/**
* Compute `exp(x) - 1`.
*
* @module @stdlib/math/base/special/expm1
*
* @example
* var expm1 = require( '@stdlib/math/base/special/expm1' );
*
* var v = expm1( 0.2 );
* // returns ~0.221
*
* v = expm1( -9.0 );
* // returns ~-0.999
*
* v = expm1( 0.0 );
* // returns 0.0
*
* v = expm1( NaN );
* // returns NaN
*/

// MODULES //

var expm1 = require( './expm1.js' );


// EXPORTS //

module.exports = expm1;

},{"./expm1.js":38}],40:[function(require,module,exports){
/* This is a generated file. Do not edit directly. */
'use strict';

// MAIN //

/**
* Evaluates a polynomial.
*
* ## Notes
*
* -   The implementation uses [Horner's rule][horners-method] for efficient computation.
*
* [horners-method]: https://en.wikipedia.org/wiki/Horner%27s_method
*
*
* @private
* @param {number} x - value at which to evaluate the polynomial
* @returns {number} evaluated polynomial
*/
function evalpoly( x ) {
	if ( x === 0.0 ) {
		return -0.03333333333333313;
	}
	return -0.03333333333333313 + (x * (0.0015873015872548146 + (x * (-0.0000793650757867488 + (x * (0.000004008217827329362 + (x * -2.0109921818362437e-7))))))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

},{}],41:[function(require,module,exports){
'use strict';

/**
* Evaluate the natural logarithm of \\(1+x\\).
*
* @module @stdlib/math/base/special/log1p
*
* @example
* var log1p = require( '@stdlib/math/base/special/log1p' );
*
* var v = log1p( 4.0 );
* // returns ~1.609
*
* v = log1p( -1.0 );
* // returns -Infinity
*
* v = log1p( 0.0 );
* // returns 0.0
*
* v = log1p( -0.0 );
* // returns -0.0
*
* v = log1p( -2.0 );
* // returns NaN
*
* v = log1p( NaN );
* // returns NaN
*/

// MODULES //

var log1p = require( './log1p.js' );


// EXPORTS //

module.exports = log1p;

},{"./log1p.js":42}],42:[function(require,module,exports){
'use strict';

/*
* The original C code, long comment, copyright, license, and constants are from [netlib]{http://www.netlib.org/fdlibm/s_log1p.c}.
*
* The long comment and implementation follow the original, but have been reformatted and modified for JavaScript.
*/

/*
* ====================================================
* Copyright (C) 1993 by Sun Microsystems, Inc. All rights reserved.
*
* Developed at SunSoft, a Sun Microsystems, Inc. business.
* Permission to use, copy, modify, and distribute this
* software is freely granted, provided that this notice
* is preserved.
* ====================================================
*/

// MODULES //

var isnan = require( '@stdlib/math/base/assert/is-nan' );
var highWord = require( '@stdlib/number/float64/base/get-high-word' );
var setHighWord = require( '@stdlib/number/float64/base/set-high-word' );
var PINF = require( '@stdlib/constants/math/float64-pinf' );
var NINF = require( '@stdlib/constants/math/float64-ninf' );
var BIAS = require( '@stdlib/constants/math/float64-exponent-bias' );
var polyval = require( './polyval_lp.js' );


// VARIABLES //

// High and low words of ln(2):
var LN2_HI = 6.93147180369123816490e-01; // 0x3fe62e42 0xfee00000
var LN2_LO = 1.90821492927058770002e-10; // 0x3dea39ef 0x35793c76

// sqrt(2)-1:
var SQRT2M1 = 4.142135623730950488017e-01; // 0x3fda8279 0x99fcef34

// sqrt(2)/2-1:
var SQRT2HALFM1 = -2.928932188134524755992e-01; // 0xbfd2bec3 0x33018866

// 2**-29:
var SMALL = 1.862645149230957e-09; // 0x3e200000 0x00000000

// 2**-54:
var TINY = 5.551115123125783e-17;

// Max integer (unsafe) => 2**53:
var TWO53 = 9007199254740992;

// 2/3:
var TWO_THIRDS = 6.666666666666666666e-01;


// MAIN //

/**
* Evaluates the natural logarithm of \\(1+x\\).
*
* ## Method
*
* 1.  Argument Reduction: find \\(k\\) and \\(f\\) such that
*
*     ```tex
*     1+x = 2^k (1+f)
*     ```
*
*     where
*
*     ```tex
*     \frac{\sqrt{2}}{2} < 1+f < \sqrt{2}
*     ```
*
*     <!-- <note> -->
*
*     If \\(k=0\\), then \\(f=x\\) is exact. However, if \\(k \neq 0\\), then \\(f\\) may not be representable exactly. In that case, a correction term is needed. Let
*
*     ```tex
*     u = \operatorname{round}(1+x)
*     ```
*
*     and
*
*     ```tex
*     c = (1+x) - u
*     ```
*
*     then
*
*     ```tex
*     \ln (1+x) - \ln u \approx \frac{c}{u}
*     ```
*
*     We can thus proceed to compute \\(\ln(u)\\), and add back the correction term \\(c/u\\).
*
*     <!-- </note> -->
*
*     <!-- <note> -->
*
*     When \\(x > 2^{53}\\), one can simply return \\(\ln(x)\\).
*
*     <!-- </note> -->
*
* 2.  Approximation of \\(\operatorname{log1p}(f)\\). Let
*
*     ```tex
*     s = \frac{f}{2+f}
*     ```
*
*     based on
*
*     ```tex
*     \begin{align*}
*     \ln 1+f &= \ln (1+s) - \ln (1-s) \\
*             &= 2s + \frac{2}{3} s^3 + \frac{2}{5} s^5 + ... \\
*             &= 2s + sR \\
*     \end{align*}
*     ```
*
*     We use a special Reme algorithm on \\(\[0,0.1716\]\\) to generate a polynomial of degree \\(14\\) to approximate \\(R\\). The maximum error of this polynomial approximation is bounded by \\(2^{-58.45}\\). In other words,
*
*     ```tex
*     R(z) \approx \mathrm{Lp}_1 s^2 + \mathrm{Lp}_2 s^4 + \mathrm{Lp}_3 s^6 + \mathrm{Lp}_4 s^8 + \mathrm{Lp}_5 s^{10} + \mathrm{Lp}_6 s^{12} + \mathrm{Lp}_7 s^{14}
*     ```
*
*     and
*
*     ```tex
*     | \mathrm{Lp}_1 s^2 + \ldots + \mathrm{Lp}_7 s^14 - R(z) | \leq 2^{-58.45}
*     ```
*
*     <!-- <note> -->
*
*     The values of \\(Lp1\\) to \\(Lp7\\) may be found in the source.
*
*     <!-- </note> -->
*
*     Note that
*
*     ```tex
*     \begin{align*}
*     2s &= f - sf \\
*        &= f - \frac{f^2}{2} + s \frac{f^2}{2} \\
*     \end{align*}
*     ```
*
*     In order to guarantee error in \\(\ln\\) below \\(1\ \mathrm{ulp}\\), we compute the log by
*
*     ```tex
*     \operatorname{log1p}(f) = f - \biggl(\frac{f^2}{2} - s\biggl(\frac{f^2}{2}+R\biggr)\biggr)
*     ```
*
* 3.  Finally,
*
*     ```tex
*     \begin{align*}
*     \operatorname{log1p}(x) &= k \cdot \mathrm{ln2} + \operatorname{log1p}(f) \\
*     &= k \cdot \mathrm{ln2}_{hi}+\biggl(f-\biggl(\frac{f^2}{2}-\biggl(s\biggl(\frac{f^2}{2}+R\biggr)+k \cdot \mathrm{ln2}_{lo}\biggr)\biggr)\biggr) \\
*     \end{align*}
*     ```
*
*     Here \\(\mathrm{ln2}\\) is split into two floating point numbers:
*
*     ```tex
*     \mathrm{ln2}_{hi} + \mathrm{ln2}_{lo}
*     ```
*
*     where \\(n \cdot \mathrm{ln2}_{hi}\\) is always exact for \\(|n| < 2000\\).
*
*
* ## Special Cases
*
* -   \\(\operatorname{log1p}(x) = \mathrm{NaN}\\) with signal if \\(x < -1\\) (including \\(-\infty\\))
* -   \\(\operatorname{log1p}(+\infty) = +\infty\\)
* -   \\(\operatorname{log1p}(-1) = -\infty\\) with signal
* -   \\(\operatorname{log1p}(\mathrm{NaN})= \mathrm{NaN}\\) with no signal
*
*
* ## Notes
*
* -   According to an error analysis, the error is always less than \\(1\\) ulp (unit in the last place).
*
* -   The hexadecimal values are the intended ones for the used constants. The decimal values may be used, provided that the compiler will convert from decimal to binary accurately enough to produce the hexadecimal values shown.
*
* -   Assuming \\(\ln(x)\\) is accurate, the following algorithm can be used to evaluate \\(\operatorname{log1p}(x)\\) to within a few ULP:
*
*     ```javascript
*     var u = 1.0 + x;
*     if ( u === 1.0 ) {
*         return x;
*     } else {
*         return ln(u) * (x/(u-1.0));
*     }
*     ```
*
*     See HP-15C Advanced Functions Handbook, p.193.
*
*
* @param {number} x - input value
* @returns {number} the natural logarithm of `1+x`
*
* @example
* var v = log1p( 4.0 );
* // returns ~1.609
*
* @example
* var v = log1p( -1.0 );
* // returns -Infinity
*
* @example
* var v = log1p( 0.0 );
* // returns 0.0
*
* @example
* var v = log1p( -0.0 );
* // returns -0.0
*
* @example
* var v = log1p( -2.0 );
* // returns NaN
*
* @example
* var v = log1p( NaN );
* // returns NaN
*/
function log1p( x ) {
	var hfsq;
	var hu;
	var y;
	var f;
	var c;
	var s;
	var z;
	var R;
	var u;
	var k;

	if ( x < -1.0 || isnan( x ) ) {
		return NaN;
	}
	if ( x === -1.0 ) {
		return NINF;
	}
	if ( x === PINF ) {
		return x;
	}
	if ( x === 0.0 ) {
		return x; // handle +-0 (IEEE 754-2008 spec)
	}
	// Set y = |x|:
	if ( x < 0.0 ) {
		y = -x;
	} else {
		y = x;
	}
	// Argument reduction...
	k = 1;

	// Check if argument reduction is needed and if we can just return a small value approximation requiring less computation but with equivalent accuracy...
	if ( y < SQRT2M1 ) { // if |x| < sqrt(2)-1 => ~0.41422
		if ( y < SMALL ) { // if |x| < 2**-29
			if ( y < TINY ) { // if |x| < 2**-54
				return x;
			}
			// Use a simple two-term Taylor series...
			return x - ( x*x*0.5 );
		}
		// Check if `f=x` can be represented exactly (no need for correction terms), allowing us to bypass argument reduction...
		if ( x > SQRT2HALFM1 ) { // if x > sqrt(2)/2-1 => ~-0.2929
			// => -0.2929 < x < 0.41422
			k = 0;
			f = x; // exact
			hu = 1;
		}
	}
	// Address case where `f` cannot be represented exactly...
	if ( k !== 0 ) {
		if ( y < TWO53 ) {
			u = 1.0 + x;
			hu = highWord( u );

			// Bit shift to isolate the exponent and then subtract the bias:
			k = (hu>>20) - BIAS;

			// Correction term...
			if ( k > 0 ) { // positive unbiased exponent
				c = 1.0 - (u-x);
			} else { // nonpositive unbiased exponent
				c = x - (u-1.0);
			}
			c /= u;
		} else {
			u = x;
			hu = highWord( u );

			// Bit shift to isolate the exponent and then subtract the bias:
			k = (hu>>20) - BIAS;

			// Correction term is zero:
			c = 0;
		}
		// Apply a bit mask (0 00000000000 11111111111111111111) to remove the exponent:
		hu &= 0x000fffff; // max value => 1048575

		// Check if u significand is less than sqrt(2) significand => 0x6a09e => 01101010000010011110
		if ( hu < 434334 ) {
			// Normalize u by setting the exponent to 1023 (bias) => 0x3ff00000 => 0 01111111111 00000000000000000000
			u = setHighWord( u, hu|0x3ff00000 );
		} else {
			k += 1;

			// Normalize u/2 by setting the exponent to 1022 (bias-1 => 2**-1 = 1/2) => 0x3fe00000 => 0 01111111110 00000000000000000000
			u = setHighWord( u, hu|0x3fe00000 );

			// Subtract hu significand from next largest hu => 0 00000000001 00000000000000000000 => 0x00100000 => 1048576
			hu = (1048576-hu)>>2;
		}
		f = u - 1.0;
	}
	// Approximation of log1p(f)...
	hfsq = 0.5 * f * f;
	if ( hu === 0 ) { // if |f| < 2**-20
		if ( f === 0.0 ) {
			c += k * LN2_LO;
			return ( k * LN2_HI ) + c;
		}
		R = hfsq * (1.0 - ( TWO_THIRDS*f ) ); // avoid division
		return ( k*LN2_HI ) - ( (R - ( (k*LN2_LO) + c)) - f );
	}
	s = f / (2.0 + f);
	z = s * s;

	R = z * polyval( z );

	if ( k === 0 ) {
		return f - ( hfsq - ( s*(hfsq+R) ) );
	}
	return ( k*LN2_HI ) - ( (hfsq - ( (s*(hfsq+R)) + ((k*LN2_LO) + c))) - f );
}


// EXPORTS //

module.exports = log1p;

},{"./polyval_lp.js":43,"@stdlib/constants/math/float64-exponent-bias":27,"@stdlib/constants/math/float64-ninf":29,"@stdlib/constants/math/float64-pinf":30,"@stdlib/math/base/assert/is-nan":34,"@stdlib/number/float64/base/get-high-word":51,"@stdlib/number/float64/base/set-high-word":54}],43:[function(require,module,exports){
/* This is a generated file. Do not edit directly. */
'use strict';

// MAIN //

/**
* Evaluates a polynomial.
*
* ## Notes
*
* -   The implementation uses [Horner's rule][horners-method] for efficient computation.
*
* [horners-method]: https://en.wikipedia.org/wiki/Horner%27s_method
*
*
* @private
* @param {number} x - value at which to evaluate the polynomial
* @returns {number} evaluated polynomial
*/
function evalpoly( x ) {
	if ( x === 0.0 ) {
		return 0.6666666666666735;
	}
	return 0.6666666666666735 + (x * (0.3999999999940942 + (x * (0.2857142874366239 + (x * (0.22222198432149784 + (x * (0.1818357216161805 + (x * (0.15313837699209373 + (x * 0.14798198605116586))))))))))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

},{}],44:[function(require,module,exports){
'use strict';

/**
* Compute the principal square root.
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

var sqrt = Math.sqrt;


// EXPORTS //

module.exports = sqrt;

},{}],45:[function(require,module,exports){
'use strict';

/**
* Compute the value of `sqrt(1+x)-1`.
*
* @module @stdlib/math/base/special/sqrt1pm1
*
* @example
* var sqrt1pm1 = require( '@stdlib/math/base/special/sqrt1pm1' );
*
* var v = sqrt1pm1( 3.0 );
* // returns 1.0
*
* v = sqrt1pm1( 0.5 );
* // returns ~0.225
*
* v = sqrt1pm1( 0.02 );
* // returns ~0.01
*
* v = sqrt1pm1( -0.5 );
* // returns ~-0.292
*/

// MODULES //

var sqrt1pm1 = require( './sqrt1pm1.js' );


// EXPORTS //

module.exports = sqrt1pm1;

},{"./sqrt1pm1.js":46}],46:[function(require,module,exports){
'use strict';

/*
* The original C++ code and copyright notice is from the [Boost library]{@link https://github.com/boostorg/math/blob/fa1896fbc4c6fadc167307342ceb20bf2b6c0688/include/boost/math/special_functions/sqrt1pm1.hpp}.
*
* This implementation follows the original, but has been modified for JavaScript.
*/

/*
* (C) Copyright John Maddock 2006.
* Use, modification and distribution are subject to the
* Boost Software License, Version 1.0. (See accompanying file
* LICENSE or copy at http://www.boost.org/LICENSE_1_0.txt)
*/

// MODULES //

var isnan = require( '@stdlib/math/base/assert/is-nan' );
var expm1 = require( '@stdlib/math/base/special/expm1' );
var log1p = require( '@stdlib/math/base/special/log1p' );
var sqrt = require( '@stdlib/math/base/special/sqrt' );
var abs = require( '@stdlib/math/base/special/abs' );


// MAIN //

/**
* Computes the value of `sqrt(1+x)-1`.
*
* @param {number} x - input value
* @returns {number} square root of `1+x` minus one
*
* @example
* var v = sqrt1pm1( 3.0 );
* // returns 1.0
*
* @example
* var v = sqrt1pm1( 0.5 );
* // returns ~0.225
*
* @example
* var v = sqrt1pm1( 0.02 );
* // returns ~0.01
*
* @example
* var v = sqrt1pm1( -0.5 );
* // returns ~-0.292
*
* @example
* var v = sqrt1pm1( -1.1 );
* // returns NaN
*
* @example
* var v = sqrt1pm1( NaN );
* // returns NaN
*/
function sqrt1pm1( x ) {
	if ( isnan( x ) ) {
		return NaN;
	}
	if ( abs( x ) > 0.75 ) {
		return sqrt( 1.0+x ) - 1.0;
	}
	return expm1( log1p( x ) / 2.0 );
}


// EXPORTS //

module.exports = sqrt1pm1;

},{"@stdlib/math/base/assert/is-nan":34,"@stdlib/math/base/special/abs":37,"@stdlib/math/base/special/expm1":39,"@stdlib/math/base/special/log1p":41,"@stdlib/math/base/special/sqrt":44}],47:[function(require,module,exports){
module.exports={"x":[0.76000000000000001,0.80964482241120561,0.85928964482241121,0.90893446723361682,0.95857928964482242,1.008224112056028,1.0578689344672336,1.1075137568784392,1.1571585792896448,1.2068034017008504,1.256448224112056,1.3060930465232616,1.3557378689344672,1.4053826913456728,1.4550275137568784,1.504672336168084,1.5543171585792896,1.6039619809904953,1.6536068034017009,1.7032516258129065,1.7528964482241121,1.8025412706353177,1.8521860930465233,1.9018309154577289,1.9514757378689345,2.0011205602801398,2.0507653826913455,2.1004102051025511,2.1500550275137567,2.1996998499249623,2.2493446723361679,2.2989894947473735,2.3486343171585791,2.3982791395697847,2.4479239619809903,2.4975687843921959,2.5472136068034015,2.5968584292146071,2.6465032516258127,2.6961480740370183,2.7457928964482239,2.7954377188594295,2.8450825412706351,2.8947273636818407,2.9443721860930463,2.9940170085042519,3.0436618309154575,3.0933066533266631,3.1429514757378687,3.1925962981490743,3.2422411205602799,3.2918859429714855,3.3415307653826911,3.3911755877938967,3.4408204102051023,3.4904652326163079,3.5401100550275135,3.5897548774387191,3.6393996998499247,3.6890445222611303,3.7386893446723359,3.7883341670835415,3.8379789894947471,3.8876238119059527,3.9372686343171583,3.9869134567283639,4.0365582791395695,4.0862031015507752,4.1358479239619808,4.1854927463731864,4.235137568784392,4.2847823911955976,4.3344272136068032,4.3840720360180088,4.4337168584292144,4.48336168084042,4.5330065032516256,4.5826513256628312,4.6322961480740368,4.6819409704852424,4.731585792896448,4.7812306153076536,4.8308754377188592,4.8805202601300648,4.9301650825412704,4.979809904952476,5.0294547273636816,5.0790995497748872,5.1287443721860928,5.1783891945972984,5.228034017008504,5.2776788394197096,5.3273236618309152,5.3769684842421208,5.4266133066533264,5.476258129064532,5.5259029514757376,5.5755477738869432,5.6251925962981488,5.6748374187093544,5.72448224112056,5.7741270635317656,5.8237718859429712,5.8734167083541768,5.9230615307653824,5.972706353176588,6.0223511755877936,6.0719959979989993,6.1216408204102049,6.1712856428214105,6.2209304652326161,6.2705752876438217,6.3202201100550273,6.3698649324662329,6.4195097548774385,6.4691545772886441,6.5187993996998497,6.5684442221110553,6.6180890445222609,6.6677338669334665,6.7173786893446721,6.7670235117558777,6.8166683341670833,6.8663131565782889,6.9159579789894945,6.9656028014007001,7.0152476238119057,7.0648924462231113,7.1145372686343169,7.1641820910455225,7.2138269134567281,7.2634717358679337,7.3131165582791393,7.3627613806903449,7.4124062031015505,7.4620510255127561,7.5116958479239617,7.5613406703351673,7.6109854927463729,7.6606303151575785,7.7102751375687841,7.7599199599799897,7.8095647823911953,7.8592096048024009,7.9088544272136065,7.9584992496248121,8.0081440720360177,8.0577888944472242,8.107433716858429,8.1570785392696354,8.2067233616808402,8.2563681840920466,8.3060130065032514,8.3556578289144579,8.4053026513256626,8.4549474737368691,8.5045922961480738,8.5542371185592803,8.603881940970485,8.6535267633816915,8.7031715857928962,8.7528164082041027,8.8024612306153074,8.8521060530265121,8.9017508754377186,8.9513956978489251,9.0010405202601298,9.0506853426713345,9.100330165082541,9.1499749874937475,9.1996198099049522,9.2492646323161569,9.2989094547273634,9.3485542771385699,9.3981990995497746,9.4478439219609793,9.4974887443721858,9.5471335667833923,9.596778389194597,9.6464232116058017,9.6960680340170082,9.7457128564282147,9.7953576788394194,9.8450025012506241,9.8946473236618306,9.9442921460730371,9.9939369684842418,10.043581790895447,10.093226613306653,10.14287143571786,10.192516258129064,10.242161080540269,10.291805902951475,10.341450725362682,10.391095547773887,10.440740370185091,10.490385192596298,10.540030015007504,10.589674837418709,10.639319659829914,10.68896448224112,10.738609304652327,10.788254127063531,10.837898949474736,10.887543771885943,10.937188594297149,10.986833416708354,11.036478239119559,11.086123061530765,11.135767883941972,11.185412706353176,11.235057528764381,11.284702351175588,11.334347173586794,11.383991995997999,11.433636818409203,11.48328164082041,11.532926463231616,11.582571285642821,11.632216108054026,11.681860930465232,11.731505752876439,11.781150575287644,11.830795397698848,11.880440220110055,11.930085042521261,11.979729864932466,12.029374687343671,12.079019509754877,12.128664332166084,12.178309154577288,12.227953976988493,12.2775987993997,12.327243621810906,12.376888444222111,12.426533266633315,12.476178089044522,12.525822911455728,12.575467733866933,12.625112556278138,12.674757378689344,12.724402201100551,12.774047023511756,12.82369184592296,12.873336668334167,12.922981490745373,12.972626313156578,13.022271135567783,13.071915957978989,13.121560780390196,13.1712056028014,13.220850425212605,13.270495247623812,13.320140070035018,13.369784892446223,13.419429714857428,13.469074537268634,13.518719359679841,13.568364182091045,13.61800900450225,13.667653826913456,13.717298649324663,13.766943471735868,13.816588294147072,13.866233116558279,13.915877938969485,13.96552276138069,14.015167583791895,14.064812406203101,14.114457228614308,14.164102051025512,14.213746873436717,14.263391695847924,14.31303651825913,14.362681340670335,14.41232616308154,14.461970985492746,14.511615807903953,14.561260630315157,14.610905452726362,14.660550275137568,14.710195097548775,14.75983991995998,14.809484742371184,14.859129564782391,14.908774387193597,14.958419209604802,15.008064032016007,15.057708854427213,15.10735367683842,15.156998499249625,15.206643321660829,15.256288144072036,15.305932966483242,15.355577788894447,15.405222611305652,15.454867433716858,15.504512256128065,15.554157078539269,15.603801900950474,15.653446723361681,15.703091545772887,15.752736368184092,15.802381190595296,15.852026013006503,15.901670835417709,15.951315657828914,16.000960480240121,16.050605302651327,16.100250125062534,16.149894947473737,16.199539769884943,16.24918459229615,16.298829414707356,16.348474237118559,16.398119059529765,16.447763881940972,16.497408704352178,16.547053526763381,16.596698349174588,16.646343171585794,16.695987993997001,16.745632816408204,16.79527763881941,16.844922461230617,16.894567283641823,16.944212106053026,16.993856928464233,17.043501750875439,17.093146573286646,17.142791395697852,17.192436218109055,17.242081040520262,17.291725862931468,17.341370685342671,17.391015507753878,17.440660330165084,17.49030515257629,17.539949974987497,17.5895947973987,17.639239619809906,17.688884442221113,17.738529264632316,17.788174087043522,17.837818909454729,17.887463731865935,17.937108554277142,17.986753376688345,18.036398199099551,18.086043021510758,18.135687843921961,18.185332666333167,18.234977488744374,18.28462231115558,18.334267133566787,18.38391195597799,18.433556778389196,18.483201600800403,18.532846423211605,18.582491245622812,18.632136068034018,18.681780890445225,18.731425712856431,18.781070535267634,18.830715357678841,18.880360180090047,18.93000500250125,18.979649824912457,19.029294647323663,19.07893946973487,19.128584292146076,19.178229114557279,19.227873936968486,19.277518759379692,19.327163581790895,19.376808404202102,19.426453226613308,19.476098049024515,19.525742871435721,19.575387693846924,19.62503251625813,19.674677338669337,19.72432216108054,19.773966983491746,19.823611805902953,19.873256628314159,19.922901450725366,19.972546273136569,20.022191095547775,20.071835917958982,20.121480740370185,20.171125562781391,20.220770385192598,20.270415207603804,20.320060030015011,20.369704852426214,20.41934967483742,20.468994497248627,20.51863931965983,20.568284142071036,20.617928964482243,20.667573786893449,20.717218609304656,20.766863431715858,20.816508254127065,20.866153076538271,20.915797898949474,20.965442721360681,21.015087543771887,21.064732366183094,21.1143771885943,21.164022011005503,21.21366683341671,21.263311655827916,21.312956478239119,21.362601300650326,21.412246123061532,21.461890945472739,21.511535767883945,21.561180590295148,21.610825412706355,21.660470235117561,21.710115057528764,21.759759879939971,21.809404702351177,21.859049524762383,21.90869434717359,21.958339169584793,22.007983991995999,22.057628814407206,22.107273636818409,22.156918459229615,22.206563281640822,22.256208104052028,22.305852926463235,22.355497748874438,22.405142571285644,22.454787393696851,22.504432216108054,22.55407703851926,22.603721860930467,22.653366683341673,22.70301150575288,22.752656328164083,22.802301150575289,22.851945972986496,22.901590795397698,22.951235617808905,23.000880440220111,23.050525262631318,23.100170085042524,23.149814907453727,23.199459729864934,23.24910455227614,23.298749374687343,23.34839419709855,23.398039019509756,23.447683841920963,23.497328664332169,23.546973486743372,23.596618309154579,23.646263131565785,23.695907953976988,23.745552776388195,23.795197598799401,23.844842421210608,23.894487243621814,23.944132066033017,23.993776888444224,24.04342171085543,24.093066533266633,24.142711355677839,24.192356178089046,24.242001000500252,24.291645822911459,24.341290645322662,24.390935467733868,24.440580290145075,24.490225112556278,24.539869934967484,24.589514757378691,24.639159579789897,24.688804402201104,24.738449224612307,24.788094047023513,24.83773886943472,24.887383691845923,24.937028514257129,24.986673336668336,25.036318159079542,25.085962981490749,25.135607803901951,25.185252626313158,25.234897448724364,25.284542271135567,25.334187093546774,25.38383191595798,25.433476738369187,25.483121560780393,25.532766383191596,25.582411205602803,25.632056028014009,25.681700850425212,25.731345672836419,25.780990495247625,25.830635317658832,25.880280140070038,25.929924962481241,25.979569784892448,26.029214607303654,26.078859429714857,26.128504252126064,26.17814907453727,26.227793896948477,26.277438719359683,26.327083541770886,26.376728364182092,26.426373186593299,26.476018009004502,26.525662831415708,26.575307653826915,26.624952476238121,26.674597298649328,26.724242121060531,26.773886943471737,26.823531765882944,26.873176588294147,26.922821410705353,26.97246623311656,27.022111055527766,27.071755877938973,27.121400700350176,27.171045522761382,27.220690345172589,27.270335167583792,27.319979989994998,27.369624812406204,27.419269634817411,27.468914457228617,27.51855927963982,27.568204102051027,27.617848924462233,27.667493746873436,27.717138569284643,27.766783391695849,27.816428214107056,27.866073036518262,27.915717858929465,27.965362681340672,28.015007503751878,28.064652326163081,28.114297148574288,28.163941970985494,28.213586793396701,28.263231615807907,28.31287643821911,28.362521260630317,28.412166083041523,28.461810905452726,28.511455727863932,28.561100550275139,28.610745372686345,28.660390195097552,28.710035017508755,28.759679839919961,28.809324662331168,28.858969484742371,28.908614307153577,28.958259129564784,29.00790395197599,29.057548774387197,29.1071935967984,29.156838419209606,29.206483241620813,29.256128064032016,29.305772886443222,29.355417708854429,29.405062531265635,29.454707353676842,29.504352176088045,29.553996998499251,29.603641820910457,29.65328664332166,29.702931465732867,29.752576288144073,29.80222111055528,29.851865932966486,29.901510755377689,29.951155577788896,30.000800400200102,30.050445222611305,30.100090045022512,30.149734867433718,30.199379689844925,30.249024512256131,30.298669334667334,30.348314157078541,30.397958979489747,30.44760380190095,30.497248624312157,30.546893446723363,30.59653826913457,30.646183091545776,30.695827913956979,30.745472736368185,30.795117558779392,30.844762381190595,30.894407203601801,30.944052026013008,30.993696848424214,31.043341670835421,31.092986493246624,31.14263131565783,31.192276138069037,31.24192096048024,31.291565782891446,31.341210605302653,31.390855427713859,31.440500250125066,31.490145072536269,31.539789894947475,31.589434717358682,31.639079539769885,31.688724362181091,31.738369184592298,31.788014007003504,31.83765882941471,31.887303651825913,31.93694847423712,31.986593296648326,32.036238119059526,32.085882941470736,32.135527763881939,32.185172586293149,32.234817408704352,32.284462231115555,32.334107053526765,32.383751875937968,32.433396698349171,32.483041520760381,32.532686343171584,32.582331165582794,32.631975987993997,32.6816208104052,32.73126563281641,32.780910455227612,32.830555277638815,32.880200100050025,32.929844922461228,32.979489744872431,33.029134567283641,33.078779389694844,33.128424212106047,33.178069034517257,33.22771385692846,33.27735867933967,33.327003501750873,33.376648324162076,33.426293146573286,33.475937968984489,33.525582791395699,33.575227613806902,33.624872436218105,33.674517258629315,33.724162081040518,33.773806903451721,33.823451725862931,33.873096548274134,33.922741370685337,33.972386193096547,34.02203101550775,34.07167583791896,34.121320660330163,34.170965482741366,34.220610305152576,34.270255127563779,34.319899949974989,34.369544772386192,34.419189594797395,34.468834417208605,34.518479239619808,34.568124062031011,34.617768884442221,34.667413706853424,34.717058529264627,34.766703351675837,34.81634817408704,34.86599299649825,34.915637818909453,34.965282641320655,35.014927463731865,35.064572286143068,35.114217108554278,35.163861930965481,35.213506753376684,35.263151575787894,35.312796398199097,35.3624412206103,35.41208604302151,35.461730865432713,35.511375687843916,35.561020510255126,35.610665332666329,35.660310155077539,35.709954977488742,35.759599799899945,35.809244622311155,35.858889444722358,35.908534267133568,35.958179089544771,36.007823911955974,36.057468734367184,36.107113556778387,36.15675837918959,36.2064032016008,36.256048024012003,36.305692846423206,36.355337668834416,36.404982491245619,36.454627313656829,36.504272136068032,36.553916958479235,36.603561780890445,36.653206603301648,36.702851425712858,36.752496248124061,36.802141070535264,36.851785892946474,36.901430715357677,36.95107553776888,37.00072036018009,37.050365182591293,37.100010005002495,37.149654827413706,37.199299649824908,37.248944472236118,37.298589294647321,37.348234117058524,37.397878939469734,37.447523761880937,37.497168584292147,37.54681340670335,37.596458229114553,37.646103051525763,37.695747873936966,37.745392696348169,37.795037518759379,37.844682341170582,37.894327163581785,37.943971985992995,37.993616808404198,38.043261630815408,38.092906453226611,38.142551275637814,38.192196098049024,38.241840920460227,38.291485742871437,38.34113056528264,38.390775387693843,38.440420210105053,38.490065032516256,38.539709854927459,38.589354677338669,38.638999499749872,38.688644322161075,38.738289144572285,38.787933966983488,38.837578789394698,38.887223611805901,38.936868434217104,38.986513256628314,39.036158079039517,39.085802901450727,39.13544772386193,39.185092546273133,39.234737368684343,39.284382191095546,39.334027013506748,39.383671835917959,39.433316658329161,39.482961480740364,39.532606303151574,39.582251125562777,39.631895947973987,39.68154077038519,39.731185592796393,39.780830415207603,39.830475237618806,39.880120060030016,39.929764882441219,39.979409704852422,40.029054527263632,40.078699349674835,40.128344172086038,40.177988994497248,40.227633816908451,40.277278639319654,40.326923461730864,40.376568284142067,40.426213106553277,40.47585792896448,40.525502751375683,40.575147573786893,40.624792396198096,40.674437218609306,40.724082041020509,40.773726863431712,40.823371685842922,40.873016508254125,40.922661330665328,40.972306153076538,41.021950975487741,41.071595797898944,41.121240620310154,41.170885442721357,41.220530265132567,41.27017508754377,41.319819909954973,41.369464732366183,41.419109554777386,41.468754377188596,41.518399199599799,41.568044022011001,41.617688844422212,41.667333666833414,41.716978489244617,41.766623311655827,41.81626813406703,41.865912956478233,41.915557778889443,41.965202601300646,42.014847423711856,42.064492246123059,42.114137068534262,42.163781890945472,42.213426713356675,42.263071535767885,42.312716358179088,42.362361180590291,42.412006003001501,42.461650825412704,42.511295647823907,42.560940470235117,42.61058529264632,42.660230115057523,42.709874937468733,42.759519759879936,42.809164582291146,42.858809404702349,42.908454227113552,42.958099049524762,43.007743871935965,43.057388694347175,43.107033516758378,43.156678339169581,43.206323161580791,43.255967983991994,43.305612806403197,43.355257628814407,43.40490245122561,43.454547273636813,43.504192096048023,43.553836918459226,43.603481740870436,43.653126563281639,43.702771385692841,43.752416208104052,43.802061030515254,43.851705852926465,43.901350675337667,43.95099549774887,44.00064032016008,44.050285142571283,44.099929964982486,44.149574787393696,44.199219609804899,44.248864432216102,44.298509254627312,44.348154077038515,44.397798899449725,44.447443721860928,44.497088544272131,44.546733366683341,44.596378189094544,44.646023011505754,44.695667833916957,44.74531265632816,44.79495747873937,44.844602301150573,44.894247123561776,44.943891945972986,44.993536768384189,45.043181590795392,45.092826413206602,45.142471235617805,45.192116058029015,45.241760880440218,45.291405702851421,45.341050525262631,45.390695347673834,45.440340170085044,45.489984992496247,45.53962981490745,45.58927463731866,45.638919459729863,45.688564282141066,45.738209104552276,45.787853926963479,45.837498749374681,45.887143571785892,45.936788394197094,45.986433216608305,46.036078039019507,46.08572286143071,46.13536768384192,46.185012506253123,46.234657328664333,46.284302151075536,46.333946973486739,46.383591795897949,46.433236618309152,46.482881440720355,46.532526263131565,46.582171085542768,46.631815907953971,46.681460730365181,46.731105552776384,46.780750375187594,46.830395197598797,46.88004002001,46.92968484242121,46.979329664832413,47.028974487243623,47.078619309654826,47.128264132066029,47.177908954477239,47.227553776888442,47.277198599299645,47.326843421710855,47.376488244122058,47.426133066533261,47.475777888944471,47.525422711355674,47.575067533766884,47.624712356178087,47.67435717858929,47.7240020010005,47.773646823411703,47.823291645822913,47.872936468234116,47.922581290645319,47.972226113056529,48.021870935467732,48.071515757878934,48.121160580290145,48.170805402701347,48.22045022511255,48.27009504752376,48.319739869934963,48.369384692346173,48.419029514757376,48.468674337168579,48.518319159579789,48.567963981990992,48.617608804402202,48.667253626813405,48.716898449224608,48.766543271635818,48.816188094047021,48.865832916458224,48.915477738869434,48.965122561280637,49.01476738369184,49.06441220610305,49.114057028514253,49.163701850925463,49.213346673336666,49.262991495747869,49.312636318159079,49.362281140570282,49.411925962981492,49.461570785392695,49.511215607803898,49.560860430215108,49.610505252626311,49.660150075037514,49.709794897448724,49.759439719859927,49.80908454227113,49.85872936468234,49.908374187093543,49.958019009504753,50.007663831915956,50.057308654327159,50.106953476738369,50.156598299149572,50.206243121560782,50.255887943971985,50.305532766383187,50.355177588794398,50.4048224112056,50.454467233616803,50.504112056028013,50.553756878439216,50.603401700850419,50.653046523261629,50.702691345672832,50.752336168084042,50.801980990495245,50.851625812906448,50.901270635317658,50.950915457728861,51.000560280140071,51.050205102551274,51.099849924962477,51.149494747373687,51.19913956978489,51.248784392196093,51.298429214607303,51.348074037018506,51.397718859429709,51.447363681840919,51.497008504252122,51.546653326663332,51.596298149074535,51.645942971485738,51.695587793896948,51.745232616308151,51.794877438719361,51.844522261130564,51.894167083541767,51.943811905952977,51.99345672836418,52.043101550775383,52.092746373186593,52.142391195597796,52.192036018008999,52.241680840420209,52.291325662831412,52.340970485242622,52.390615307653825,52.440260130065028,52.489904952476238,52.53954977488744,52.589194597298651,52.638839419709853,52.688484242121056,52.738129064532266,52.787773886943469,52.837418709354672,52.887063531765882,52.936708354177085,52.986353176588288,53.035997998999498,53.085642821410701,53.135287643821911,53.184932466233114,53.234577288644317,53.284222111055527,53.33386693346673,53.38351175587794,53.433156578289143,53.482801400700346,53.532446223111556,53.582091045522759,53.631735867933962,53.681380690345172,53.731025512756375,53.780670335167578,53.830315157578788,53.879959979989991,53.929604802401201,53.979249624812404,54.028894447223607,54.078539269634817,54.12818409204602,54.17782891445723,54.227473736868433,54.277118559279636,54.326763381690846,54.376408204102049,54.426053026513252,54.475697848924462,54.525342671335665,54.574987493746868,54.624632316158078,54.674277138569281,54.723921960980491,54.773566783391693,54.823211605802896,54.872856428214106,54.922501250625309,54.972146073036519,55.021790895447722,55.071435717858925,55.121080540270135,55.170725362681338,55.220370185092541,55.270015007503751,55.319659829914954,55.369304652326157,55.418949474737367,55.46859429714857,55.51823911955978,55.567883941970983,55.617528764382186,55.667173586793396,55.716818409204599,55.766463231615809,55.816108054027012,55.865752876438215,55.915397698849425,55.965042521260628,56.014687343671831,56.064332166083041,56.113976988494244,56.163621810905447,56.213266633316657,56.26291145572786,56.31255627813907,56.362201100550273,56.411845922961476,56.461490745372686,56.511135567783889,56.560780390195099,56.610425212606302,56.660070035017505,56.709714857428715,56.759359679839918,56.809004502251121,56.858649324662331,56.908294147073534,56.957938969484736,57.007583791895946,57.057228614307149,57.106873436718359,57.156518259129562,57.206163081540765,57.255807903951975,57.305452726363178,57.355097548774388,57.404742371185591,57.454387193596794,57.504032016008004,57.553676838419207,57.60332166083041,57.65296648324162,57.702611305652823,57.752256128064026,57.801900950475236,57.851545772886439,57.901190595297649,57.950835417708852,58.000480240120055,58.050125062531265,58.099769884942468,58.149414707353678,58.199059529764881,58.248704352176084,58.298349174587294,58.347993996998497,58.3976388194097,58.44728364182091,58.496928464232113,58.546573286643316,58.596218109054526,58.645862931465729,58.695507753876939,58.745152576288142,58.794797398699345,58.844442221110555,58.894087043521758,58.943731865932968,58.993376688344171,59.043021510755374,59.092666333166584,59.142311155577787,59.191955977988989,59.241600800400199,59.291245622811402,59.340890445222605,59.390535267633815,59.440180090045018,59.489824912456228,59.539469734867431,59.589114557278634,59.638759379689844,59.688404202101047,59.738049024512257,59.78769384692346,59.837338669334663,59.886983491745873,59.936628314157076,59.986273136568279,60.035917958979489,60.085562781390692,60.135207603801895,60.184852426213105,60.234497248624308,60.284142071035518,60.333786893446721,60.383431715857924,60.433076538269134,60.482721360680337,60.532366183091547,60.58201100550275,60.631655827913953,60.681300650325163,60.730945472736366,60.780590295147569,60.830235117558779,60.879879939969982,60.929524762381185,60.979169584792395,61.028814407203598,61.078459229614808,61.128104052026011,61.177748874437214,61.227393696848424,61.277038519259627,61.326683341670837,61.37632816408204,61.425972986493242,61.475617808904452,61.525262631315655,61.574907453726858,61.624552276138068,61.674197098549271,61.723841920960474,61.773486743371684,61.823131565782887,61.872776388194097,61.9224212106053,61.972066033016503,62.021710855427713,62.071355677838916,62.121000500250126,62.170645322661329,62.220290145072532,62.269934967483742,62.319579789894945,62.369224612306148,62.418869434717358,62.468514257128561,62.518159079539764,62.567803901950974,62.617448724362177,62.667093546773387,62.71673836918459,62.766383191595793,62.816028014007003,62.865672836418206,62.915317658829416,62.964962481240619,63.014607303651822,63.064252126063032,63.113896948474235,63.163541770885438,63.213186593296648,63.262831415707851,63.312476238119054,63.362121060530264,63.411765882941467,63.461410705352677,63.51105552776388,63.560700350175082,63.610345172586293,63.659989994997495,63.709634817408705,63.759279639819908,63.808924462231111,63.858569284642321,63.908214107053524,63.957858929464727,64.007503751875944,64.05714857428714,64.10679339669835,64.15643821910956,64.206083041520756,64.255727863931966,64.305372686343176,64.355017508754372,64.404662331165582,64.454307153576792,64.503951975988002,64.553596798399198,64.603241620810408,64.652886443221618,64.702531265632814,64.752176088044024,64.801820910455234,64.851465732866444,64.90111055527764,64.95075537768885,65.00040020010006,65.050045022511256,65.099689844922466,65.149334667333676,65.198979489744872,65.248624312156082,65.298269134567292,65.347913956978488,65.397558779389698,65.447203601800908,65.496848424212104,65.546493246623314,65.596138069034524,65.645782891445734,65.69542771385693,65.74507253626814,65.79471735867935,65.844362181090546,65.894007003501756,65.943651825912966,65.993296648324161,66.042941470735371,66.092586293146582,66.142231115557777,66.191875937968987,66.241520760380197,66.291165582791407,66.340810405202603,66.390455227613813,66.440100050025023,66.489744872436219,66.539389694847429,66.589034517258639,66.638679339669835,66.688324162081045,66.737968984492255,66.787613806903451,66.837258629314661,66.886903451725871,66.936548274137067,66.986193096548277,67.035837918959487,67.085482741370683,67.135127563781893,67.184772386193103,67.234417208604313,67.284062031015509,67.333706853426719,67.383351675837929,67.432996498249125,67.482641320660335,67.532286143071545,67.581930965482741,67.631575787893951,67.681220610305161,67.730865432716357,67.780510255127567,67.830155077538777,67.879799899949987,67.929444722361183,67.979089544772393,68.028734367183603,68.078379189594799,68.128024012006009,68.177668834417219,68.227313656828414,68.276958479239624,68.326603301650835,68.37624812406203,68.42589294647324,68.47553776888445,68.525182591295646,68.574827413706856,68.624472236118066,68.674117058529262,68.723761880940472,68.773406703351682,68.823051525762892,68.872696348174088,68.922341170585298,68.971985992996508,69.021630815407704,69.071275637818914,69.120920460230124,69.17056528264132,69.22021010505253,69.26985492746374,69.319499749874936,69.369144572286146,69.418789394697356,69.468434217108566,69.518079039519762,69.567723861930972,69.617368684342182,69.667013506753378,69.716658329164588,69.766303151575798,69.815947973986994,69.865592796398204,69.915237618809414,69.96488244122061,70.01452726363182,70.06417208604303,70.113816908454226,70.163461730865436,70.213106553276646,70.262751375687841,70.312396198099052,70.362041020510262,70.411685842921472,70.461330665332667,70.510975487743877,70.560620310155088,70.610265132566283,70.659909954977493,70.709554777388703,70.759199599799899,70.808844422211109,70.858489244622319,70.908134067033515,70.957778889444725,71.007423711855935,71.057068534267145,71.106713356678341,71.156358179089551,71.206003001500761,71.255647823911957,71.305292646323167,71.354937468734377,71.404582291145573,71.454227113556783,71.503871935967993,71.553516758379189,71.603161580790399,71.652806403201609,71.702451225612805,71.752096048024015,71.801740870435225,71.851385692846421,71.901030515257631,71.950675337668841,72.000320160080051,72.049964982491247,72.099609804902457,72.149254627313667,72.198899449724863,72.248544272136073,72.298189094547283,72.347833916958479,72.397478739369689,72.447123561780899,72.496768384192094,72.546413206603305,72.596058029014515,72.645702851425725,72.69534767383692,72.74499249624813,72.794637318659341,72.844282141070536,72.893926963481746,72.943571785892956,72.993216608304152,73.042861430715362,73.092506253126572,73.142151075537768,73.191795897948978,73.241440720360188,73.291085542771384,73.340730365182594,73.390375187593804,73.440020010005,73.48966483241621,73.53930965482742,73.58895447723863,73.638599299649826,73.688244122061036,73.737888944472246,73.787533766883442,73.837178589294652,73.886823411705862,73.936468234117058,73.986113056528268,74.035757878939478,74.085402701350674,74.135047523761884,74.184692346173094,74.234337168584304,74.2839819909955,74.33362681340671,74.38327163581792,74.432916458229116,74.482561280640326,74.532206103051536,74.581850925462732,74.631495747873942,74.681140570285152,74.730785392696347,74.780430215107558,74.830075037518768,74.879719859929963,74.929364682341173,74.979009504752383,75.028654327163579,75.078299149574789,75.127943971985999,75.177588794397209,75.227233616808405,75.276878439219615,75.326523261630825,75.376168084042021,75.425812906453231,75.475457728864441,75.525102551275637,75.574747373686847,75.624392196098057,75.674037018509253,75.723681840920463,75.773326663331673,75.822971485742883,75.872616308154079,75.922261130565289,75.971905952976499,76.021550775387695,76.071195597798905,76.120840420210115,76.170485242621311,76.220130065032521,76.269774887443731,76.319419709854927,76.369064532266137,76.418709354677347,76.468354177088543,76.517998999499753,76.567643821910963,76.617288644322159,76.666933466733369,76.716578289144579,76.766223111555789,76.815867933966985,76.865512756378195,76.915157578789405,76.9648024012006,77.014447223611811,77.064092046023021,77.113736868434216,77.163381690845426,77.213026513256636,77.262671335667832,77.312316158079042,77.361960980490252,77.411605802901462,77.461250625312658,77.510895447723868,77.560540270135078,77.610185092546274,77.659829914957484,77.709474737368694,77.75911955977989,77.8087643821911,77.85840920460231,77.908054027013506,77.957698849424716,78.007343671835926,78.056988494247122,78.106633316658332,78.156278139069542,78.205922961480738,78.255567783891948,78.305212606303158,78.354857428714368,78.404502251125564,78.454147073536774,78.503791895947984,78.55343671835918,78.60308154077039,78.6527263631816,78.702371185592796,78.752016008004006,78.801660830415216,78.851305652826412,78.900950475237622,78.950595297648832,79.000240120060042,79.049884942471238,79.099529764882448,79.149174587293658,79.198819409704853,79.248464232116063,79.298109054527274,79.347753876938469,79.397398699349679,79.447043521760889,79.496688344172085,79.546333166583295,79.595977988994505,79.645622811405701,79.695267633816911,79.744912456228121,79.794557278639317,79.844202101050527,79.893846923461737,79.943491745872947,79.993136568284143,80.042781390695353,80.092426213106563,80.142071035517759,80.191715857928969,80.241360680340179,80.291005502751375,80.340650325162585,80.390295147573795,80.439939969984991,80.489584792396201,80.539229614807411,80.588874437218621,80.638519259629817,80.688164082041027,80.737808904452237,80.787453726863433,80.837098549274643,80.886743371685853,80.936388194097049,80.986033016508259,81.035677838919469,81.085322661330665,81.134967483741875,81.184612306153085,81.23425712856428,81.283901950975491,81.333546773386701,81.383191595797896,81.432836418209106,81.482481240620316,81.532126063031527,81.581770885442722,81.631415707853932,81.681060530265142,81.730705352676338,81.780350175087548,81.829994997498758,81.879639819909954,81.929284642321164,81.978929464732374,82.02857428714357,82.07821910955478,82.12786393196599,82.1775087543772,82.227153576788396,82.276798399199606,82.326443221610816,82.376088044022012,82.425732866433222,82.475377688844432,82.525022511255628,82.574667333666838,82.624312156078048,82.673956978489244,82.723601800900454,82.773246623311664,82.82289144572286,82.87253626813407,82.92218109054528,82.971825912956476,83.021470735367686,83.071115557778896,83.120760380190106,83.170405202601302,83.220050025012512,83.269694847423722,83.319339669834918,83.368984492246128,83.418629314657338,83.468274137068533,83.517918959479744,83.567563781890954,83.617208604302149,83.666853426713359,83.716498249124569,83.76614307153578,83.815787893946975,83.865432716358185,83.915077538769395,83.964722361180591,84.014367183591801,84.064012006003011,84.113656828414207,84.163301650825417,84.212946473236627,84.262591295647823,84.312236118059033,84.361880940470243,84.411525762881439,84.461170585292649,84.510815407703859,84.560460230115055,84.610105052526265,84.659749874937475,84.709394697348685,84.759039519759881,84.808684342171091,84.858329164582301,84.907973986993497,84.957618809404707,85.007263631815917,85.056908454227113,85.106553276638323,85.156198099049533,85.205842921460729,85.255487743871939,85.305132566283149,85.354777388694359,85.404422211105555,85.454067033516765,85.503711855927975,85.553356678339171,85.603001500750381,85.652646323161591,85.702291145572786,85.751935967983997,85.801580790395207,85.851225612806402,85.900870435217612,85.950515257628822,86.000160080040018,86.049804902451228,86.099449724862438,86.149094547273634,86.198739369684844,86.248384192096054,86.298029014507264,86.34767383691846,86.39731865932967,86.44696348174088,86.496608304152076,86.546253126563286,86.595897948974496,86.645542771385692,86.695187593796902,86.744832416208112,86.794477238619308,86.844122061030518,86.893766883441728,86.943411705852938,86.993056528264134,87.042701350675344,87.092346173086554,87.14199099549775,87.19163581790896,87.24128064032017,87.290925462731366,87.340570285142576,87.390215107553786,87.439859929964982,87.489504752376192,87.539149574787402,87.588794397198598,87.638439219609808,87.688084042021018,87.737728864432214,87.787373686843424,87.837018509254634,87.886663331665844,87.936308154077039,87.98595297648825,88.03559779889946,88.085242621310655,88.134887443721865,88.184532266133075,88.234177088544271,88.283821910955481,88.333466733366691,88.383111555777887,88.432756378189097,88.482401200600307,88.532046023011517,88.581690845422713,88.631335667833923,88.680980490245133,88.730625312656329,88.780270135067539,88.829914957478749,88.879559779889945,88.929204602301155,88.978849424712365,89.028494247123561,89.078139069534771,89.127783891945981,89.177428714357177,89.227073536768387,89.276718359179597,89.326363181590793,89.376008004002003,89.425652826413213,89.475297648824423,89.524942471235619,89.574587293646829,89.624232116058039,89.673876938469235,89.723521760880445,89.773166583291655,89.822811405702851,89.872456228114061,89.922101050525271,89.971745872936467,90.021390695347677,90.071035517758887,90.120680340170097,90.170325162581292,90.219969984992503,90.269614807403713,90.319259629814908,90.368904452226118,90.418549274637328,90.468194097048524,90.517838919459734,90.567483741870944,90.61712856428214,90.66677338669335,90.71641820910456,90.766063031515756,90.815707853926966,90.865352676338176,90.914997498749372,90.964642321160582,91.014287143571792,91.063931965983002,91.113576788394198,91.163221610805408,91.212866433216618,91.262511255627814,91.312156078039024,91.361800900450234,91.41144572286143,91.46109054527264,91.51073536768385,91.560380190095046,91.610025012506256,91.659669834917466,91.709314657328676,91.758959479739872,91.808604302151082,91.858249124562292,91.907893946973488,91.957538769384698,92.007183591795908,92.056828414207104,92.106473236618314,92.156118059029524,92.20576288144072,92.25540770385193,92.30505252626314,92.354697348674335,92.404342171085545,92.453986993496756,92.503631815907951,92.553276638319161,92.602921460730371,92.652566283141581,92.702211105552777,92.751855927963987,92.801500750375197,92.851145572786393,92.900790395197603,92.950435217608813,93.000080040020009,93.049724862431219,93.099369684842429,93.149014507253625,93.198659329664835,93.248304152076045,93.297948974487255,93.347593796898451,93.397238619309661,93.446883441720871,93.496528264132067,93.546173086543277,93.595817908954487,93.645462731365683,93.695107553776893,93.744752376188103,93.794397198599299,93.844042021010509,93.893686843421719,93.943331665832915,93.992976488244125,94.042621310655335,94.092266133066531,94.141910955477741,94.191555777888951,94.241200600300161,94.290845422711357,94.340490245122567,94.390135067533777,94.439779889944973,94.489424712356183,94.539069534767393,94.588714357178588,94.638359179589798,94.688004002001009,94.737648824412204,94.787293646823414,94.836938469234624,94.886583291645834,94.93622811405703,94.98587293646824,95.03551775887945,95.085162581290646,95.134807403701856,95.184452226113066,95.234097048524262,95.283741870935472,95.333386693346682,95.383031515757878,95.432676338169088,95.482321160580298,95.531965982991494,95.581610805402704,95.631255627813914,95.68090045022511,95.73054527263632,95.78019009504753,95.82983491745874,95.879479739869936,95.929124562281146,95.978769384692356,96.028414207103552,96.078059029514762,96.127703851925972,96.177348674337168,96.226993496748378,96.276638319159588,96.326283141570784,96.375927963981994,96.425572786393204,96.475217608804414,96.52486243121561,96.57450725362682,96.62415207603803,96.673796898449226,96.723441720860436,96.773086543271646,96.822731365682841,96.872376188094051,96.922021010505262,96.971665832916457,97.021310655327667,97.070955477738877,97.120600300150073,97.170245122561283,97.219889944972493,97.269534767383689,97.319179589794899,97.368824412206109,97.418469234617319,97.468114057028515,97.517758879439725,97.567403701850935,97.617048524262131,97.666693346673341,97.716338169084551,97.765982991495747,97.815627813906957,97.865272636318167,97.914917458729363,97.964562281140573,98.014207103551783,98.063851925962993,98.113496748374189,98.163141570785399,98.212786393196609,98.262431215607805,98.312076038019015,98.361720860430225,98.411365682841421,98.461010505252631,98.510655327663841,98.560300150075037,98.609944972486247,98.659589794897457,98.709234617308653,98.758879439719863,98.808524262131073,98.858169084542268,98.907813906953479,98.957458729364689,99.007103551775899,99.056748374187094,99.106393196598304,99.156038019009515,99.20568284142071,99.25532766383192,99.30497248624313,99.354617308654326,99.404262131065536,99.453906953476746,99.503551775887942,99.553196598299152,99.602841420710362,99.652486243121572,99.702131065532768,99.751775887943978,99.801420710355188,99.851065532766384,99.900710355177594,99.950355177588804,100],"expected":[0.32664991614215988,0.34523039751977258,0.36355771598506648,0.38164194610384383,0.39949251146436016,0.41711824208709825,0.43452742548451595,0.45172785220868406,0.46872685659711566,0.48553135332137987,0.50214787025514096,0.5185825781047475,0.53484131718378847,0.55092962166104509,0.56685274156727261,0.58261566280890942,0.59822312540498834,0.61367964013632359,0.62898950377272245,0.64415681302389949,0.65918547734245547,0.67407923069229825,0.68884164238288581,0.70347612705835383,0.71798595392073405,0.73237425525783539,0.74664403433880744,0.76079817273376094,0.77483943710797587,0.78877048553607398,0.80259387337696442,0.8163120587463415,0.82992740761992501,0.84344219859744585,0.8568586273545411,0.87017881080719017,0.88340479101105651,0.89653853881607359,0.90958195729479296,0.92253688496138309,0.93540509879668954,0.9481883170934553,0.96088820213459258,0.97350636271633051,0.98604435652707578,0.99850369239194858,1.0108858323921468,1.0231921938675681,1.0354241513104507,1.0475830381572013,1.0596701484850142,1.0716867386194,1.0836340286582695,1.0955132039178128,1.1073254163050144,1.119071785621315,1.1307534008015834,1.142371321092289,1.1539265771724727,1.1654201722208857,1.1768530829324098,1.1882262604866849,1.1995406314716597,1.2107970987645955,1.2219965423729082,1.2331398202370498,1.2442277689975163,1.2552612047279079,1.2662409236358743,1.2771677027336361,1.2880423004796899,1.2988654573931893,1.3096378966424158,1.3203603246086604,1.3310334314267598,1.3416578915034578,1.3522343640146968,1.3627634933828716,1.3732459097350271,1.3836822293429218,1.3940730550458245,1.4044189766568667,1.4147205713537248,1.4249784040543672,1.4351930277785518,1.4453649839957379,1.4554948029600228,1.4655830040326947,1.475630095992956,1.4856365773373423,1.4956029365683365,1.5055296524726485,1.5154171943896135,1.5252660224701318,1.5350765879265516,1.5448493332738842,1.5545846925627145,1.564283091604151,1.5739449481871497,1.5835706722885199,1.5931606662759172,1.6027153251041049,1.6122350365047495,1.6217201811700228,1.6311711329302363,1.6405882589257623,1.6499719197734519,1.6593224697277686,1.6686402568368419,1.6779256230936306,1.6871789045823906,1.6964004316206118,1.7055905288966082,1.7147495156029096,1.7238777055656223,1.7329754073698953,1.7420429244816447,1.751080555365665,1.7600885936002602,1.7690673279885174,1.7780170426663462,1.7869380172073934,1.795830526724945,1.804694841970921,1.8135312294320629,1.8223399514234107,1.8311212661791627,1.8398754279410059,1.8486026870440035,1.8573032900001221,1.8659774795794766,1.8746254948893664,1.8832475714511823,1.891843941275245,1.9004148329336532,1.9089604716311901,1.9174810792743733,1.925976874538684,1.9344480729340523,1.9428948868686389,1.9513175257109805,1.9597161958505396,1.968091100756713,1.9764424410363461,1.9847704144897991,1.9930752161656096,2.0013570384137935,2.0096160709378239,2.0178525008453327,2.0260665126975703,2.0342582885576568,2.0424280080376671,2.0505758483445797,2.0587019843251251,2.0668065885095626,2.0748898311544219,2.0829518802842308,2.0909929017322701,2.0990130591803715,2.1070125141977929,2.1149914262791953,2.1229499528817466,2.1308882494613739,2.138806469508197,2.1467047645811514,2.154583284341836,2.1624421765876018,2.1702815872839016,2.1781016605959196,2.185902538919505,2.1936843629114247,2.2014472715189544,2.2091914020088241,2.2169168899955389,2.224623869469085,2.2323124728220476,2.2399828308761429,2.2476350729081913,2.2552693266755361,2.2628857184409328,2.2704843729969126,2.2780654136896374,2.2856289624422628,2.293175139777814,2.3007040648415953,2.3082158554231369,2.3157106279776953,2.3231884976473194,2.3306495782814878,2.3380939824573335,2.3455218214994598,2.3529332054993684,2.3603282433344925,2.3677070426868609,2.3750697100613918,2.3824163508038292,2.3897470691183287,2.3970619680847012,2.4043611496753261,2.411644714771735,2.41891276318088,2.4261653936510896,2.4334027038877237,2.4406247905685294,2.4478317493587101,2.4550236749257088,2.4622006609537168,2.4693628001579135,2.4765101842984389,2.4836429041941099,2.4907610497358847,2.4978647099000812,2.5049539727613523,2.5120289255054256,2.5190896544416139,2.5261362450151021,2.5331687818190076,2.540187348606231,2.5471920283010929,2.5541829030107643,2.561160054036498,2.5681235618846552,2.5750735062775485,2.5820099661640876,2.5889330197302449,2.5958427444093353,2.6027392168921226,2.6096225131367503,2.6164927083785026,2.6233498771393968,2.6301940932376175,2.6370254297967857,2.6438439592550749,2.6506497533741724,2.6574428832480912,2.6642234193118348,2.6709914313499183,2.677746988504746,2.6844901592848545,2.6912210115730186,2.6979396126342228,2.7046460291235048,2.7113403270936707,2.7180225720028868,2.7246928287221439,2.7313511615426083,2.7379976341828494,2.744632309795954,2.7512552509765302,2.7578665197675925,2.7644661776673463,2.7710542856358624,2.7776309041016449,2.7841960929680982,2.7907499116198924,2.7972924189292332,2.8038236732620287,2.810343732483966,2.8168526539664911,2.8233504945927006,2.8298373107631423,2.8363131584015222,2.842778092960335,2.8492321694264002,2.855675442326322,2.8621079657318598,2.8685297932652256,2.8749409781042981,2.8813415729877603,2.8877316302201606,2.8941112016769002,2.9004803388091469,2.9068390926486751,2.9131875138126375,2.9195256525082645,2.9258535585374985,2.9321712813015592,2.9384788698054423,2.9447763726623539,2.9510638380980838,2.9573413139553137,2.9636088476978624,2.9698664864148743,2.9761142768249487,2.9823522652802064,2.988580497770303,2.9947990199263845,3.0010078770249891,3.0072071139918899,3.0133967754058935,3.0195769055025714,3.0257475481779563,3.0319087469921779,3.038060545173046,3.0442029856195951,3.0503361109055698,3.0564599632828688,3.0625745846849464,3.068680016730152,3.0747763007250439,3.0808634776676467,3.0869415882506672,3.0930106728646694,3.0990707716012054,3.1051219242559043,3.1111641703315271,3.1171975490409629,3.1232220993102127,3.1292378597813091,3.135244868815211,3.141243164494659,3.1472327846269907,3.1532137667469211,3.1591861481192876,3.1651499657417572,3.1711052563475022,3.1770520564078408,3.1829904021348385,3.188920329483885,3.1948418741562339,3.2007550716015087,3.206659957020177,3.2125565653660013,3.218444931348448,3.2243250894350703,3.2301970738538675,3.2360609185956033,3.2419166574161062,3.2477643238385339,3.253603951155613,3.2594355724318511,3.2652592205057189,3.2710749279918119,3.2768827272829766,3.2826826505524167,3.2884747297557766,3.2942589966331894,3.3000354827113103,3.3058042193053199,3.311565237520905,3.3173185682562165,3.3230642422037997,3.3288022898525078,3.3345327414893893,3.3402556272015511,3.3459709768780019,3.3516788202114762,3.3573791867002285,3.3630721056498194,3.3687576061748672,3.3744357172007868,3.3801064674655077,3.38576988552117,3.3914259997358007,3.3970748382949756,3.4027164292034513,3.4083508002867919,3.4139779791929641,3.4195979933939249,3.4252108701871835,3.43081663669735,3.4364153198776624,3.4420069465115013,3.4475915432138811,3.4531691364329333,3.4587397524513639,3.4643034173878968,3.469860157198708,3.4754099976788346,3.4809529644635715,3.4864890830298556,3.4920183786976295,3.4975408766311933,3.5030566018405427,3.5085655791826849,3.5140678333629527,3.5195633889362927,3.525052270308545,3.5305345017377059,3.5360101073351817,3.5414791110670247,3.5469415367551553,3.5523974080785763,3.5578467485745664,3.5632895816398671,3.5687259305318548,3.5741558183696984,3.5795792681355092,3.5849963026754752,3.5904069447009794,3.595811216789718,3.6012091413867928,3.6066007408058054,3.6119860372299266,3.6173650527129659,3.622737809180423,3.6281043284305312,3.6334646321352908,3.6388187418414866,3.6441666789717004,3.6495084648253133,3.6548441205794902,3.6601736672901639,3.665497125893002,3.6708145172043674,3.6761258619222676,3.6814311806272952,3.6867304937835588,3.6920238217396006,3.6973111847293119,3.7025926028728344,3.7078680961774513,3.7131376845384763,3.7184013877401227,3.723659225456375,3.728911217251845,3.7341573825826213,3.7393977407971084,3.7446323111368649,3.7498611127374186,3.7550841646290927,3.7603014857378056,3.7655130948858764,3.7707190107928144,3.775919252076104,3.7811138372519828,3.7863027847362094,3.7914861128448232,3.7966638397949044,3.8018359837053168,3.8070025625974457,3.812163594395936,3.8173190969294133,3.8224690879312053,3.8276135850400488,3.8327526058008017,3.8378861676651344,3.8430142879922267,3.8481369840494457,3.8532542730130324,3.8583661719687683,3.8634726979126421,3.8685738677515085,3.8736696983037415,3.8787602062998845,3.8838454083832854,3.8889253211107349,3.8939999609530958,3.8990693442959259,3.9041334874400917,3.9091924066023855,3.914246117916127,3.9192946374317668,3.9243379811174757,3.9293761648597423,3.9344092044639494,3.9394371156549566,3.9444599140776706,3.9494776152976154,3.9544902348014945,3.9594977879977504,3.9645002902171118,3.969497756713146,3.9744902026628006,3.9794776431669421,3.9844600932508838,3.989437567864921,3.9944100818848485,3.9993776501124838,4.0043402872761789,4.0092980080313279,4.0142508269608772,4.0191987585758193,4.0241418173156944,4.0290800175490808,4.0340133735740773,4.0389418996187949,4.043865609841828,4.0487845183327318,4.0536986391124952,4.0586079861340005,4.0635125732824937,4.0684124143760343,4.0733075231659583,4.0781979133373198,4.0830835985093454,4.0879645922358696,4.0928409080057788,4.0977125592434431,4.1025795593091479,4.1074419214995235,4.1122996590479666,4.11715278512506,4.122001312838993,4.1268452552359687,4.131684625300621,4.1365194359564121,4.1413497000660424,4.1461754304318461,4.1509966397961859,4.1558133408418501,4.1606255461924393,4.1654332684127491,4.1702365200091593,4.1750353134300084,4.1798296610659733,4.1846195752504389,4.1894050682598714,4.1941861523141863,4.1989628395771073,4.2037351421565319,4.2085030721048886,4.2132666414194917,4.218025862042893,4.2227807458632309,4.2275313047145771,4.2322775503772823,4.2370194945783144,4.2417571489915957,4.2464905252383431,4.2512196348873958,4.2559444894555458,4.2606651004078682,4.2653814791580418,4.2700936370686753,4.2748015854516215,4.2795053355682997,4.2842048986300059,4.2889002857982259,4.2935915081849458,4.2982785768529546,4.3029615028161556,4.3076402970398604,4.3123149704410961,4.3169855338888965,4.3216519982045991,4.3263143741621377,4.3309726724883344,4.3356269038631829,4.3402770789201401,4.3449232082464038,4.3495653023831977,4.3542033718260491,4.3588374270250672,4.3634674783852141,4.3680935362665823,4.3727156109846597,4.3773337128106027,4.3819478519715025,4.3865580386506444,4.3911642829877744,4.3957665950793583,4.4003649849788387,4.404959462696894,4.4095500382016901,4.4141367214191325,4.4187195222331184,4.4232984504857855,4.4278735159777556,4.4324447284683837,4.4370120976759964,4.441575633278136,4.4461353449117986,4.4506912421736704,4.455243334620369,4.4597916317686677,4.4643361430957347,4.4688768780393637,4.4734138459981976,4.4779470563319608,4.482476518361679,4.4870022413699084,4.4915242346009547,4.4960425072610937,4.5005570685187894,4.5050679275049115,4.5095750933129528,4.5140785749992389,4.5185783815831444,4.5230745220473034,4.5275670053378141,4.5320558403644533,4.5365410360008767,4.5410226010848271,4.5455005444183367,4.5499748747679281,4.5544456008648142,4.5589127314050986,4.5633762750499711,4.5678362404259074,4.5722926361248568,4.5767454707044424,4.5811947526881482,4.5856404905655115,4.5900826927923104,4.5945213677907546,4.598956523949667,4.6033881696246732,4.6078163131383816,4.6122409627805681,4.6166621268083556,4.6210798134463955,4.6254940308870456,4.6299047872905437,4.6343120907851905,4.6387159494675201,4.6431163714024715,4.6475133646235669,4.6519069371330781,4.656297096902196,4.6606838518712044,4.6650672099496422,4.6694471790164718,4.6738237669202443,4.6781969814792657,4.682566830481754,4.6869333216860074,4.6912964628205636,4.6956562615843547,4.7000127256468707,4.7043658626483165,4.7087156801997665,4.7130621858833184,4.7174053872522537,4.7217452918311826,4.7260819071162006,4.7304152405750415,4.7347452996472228,4.7390720917441973,4.7433956242495015,4.747715904518901,4.7520329398805377,4.7563467376350719,4.7606573050558341,4.7649646493889577,4.7692687778535294,4.773569697641725,4.777867415918954,4.7821619398239941,4.7864532764691345,4.7907414329403091,4.7950264162972367,4.7993082335735524,4.8035868917769466,4.8078623978892967,4.8121347588667982,4.816403981640101,4.820670073114437,4.8249330401697517,4.8291928896608347,4.833449628417446,4.8377032632444452,4.8419538009219183,4.8462012482053041,4.8504456118255179,4.8546868984890788,4.8589251148782298,4.8631602676510619,4.8673923634416409,4.8716214088601193,4.875847410492864,4.8800703749025747,4.8842903086283993,4.8885072181860583,4.8927211100679555,4.8969319907432984,4.9011398666582142,4.9053447442358635,4.9095466298765542,4.9137455299578576,4.9179414508347197,4.9221343988395736,4.9263243802824501,4.9305114014510893,4.9346954686110536,4.9388765880058312,4.9430547658569486,4.9472300083640777,4.951402321705145,4.955571712036436,4.9597381854926992,4.963901748187256,4.9680624062121046,4.9722201656380207,4.9763750325146621,4.9805270128706747,4.9846761127137897,4.9888223380309293,4.9929656947883032,4.9971061889315127,5.0012438263856493,5.005378613055389,5.0095105548250993,5.0136396575589295,5.0177659271009105,5.021889369275053,5.0260099898854378,5.0301277947163197,5.0342427895322137,5.0383549800779939,5.0424643720789879,5.0465709712410662,5.0506747832507353,5.0547758137752332,5.0588740684626163,5.0629695529418539,5.0670622728229153,5.0711522336968589,5.0752394411359267,5.0793239006936268,5.0834056179048241,5.0874845982858297,5.091560847334482,5.0956343705302398,5.0997051733342653,5.1037732611895077,5.1078386395207929,5.1119013137349016,5.1159612892206585,5.1200185713490143,5.124073165473126,5.128125076928443,5.132174311032788,5.1362208730864349,5.1402647683721963,5.1443060021554965,5.1483445796844585,5.1523805061899797,5.1564137868858095,5.160444426968632,5.1644724316181421,5.1684978059971209,5.1725205552515172,5.1765406845105222,5.1805581988866436,5.1845731034757865,5.1885854033573233,5.1925951035941731,5.1966022092328741,5.2006067253036568,5.204608656820521,5.2086080087813045,5.2126047861677591,5.2165989939456257,5.2205906370646966,5.2245797204588973,5.2285662490463549,5.2325502277294627,5.2365316613949604,5.2405105549139961,5.2444869131421994,5.248460740919751,5.2524320430714484,5.2564008244067786,5.2603670897199812,5.2643308437901188,5.2682920913811468,5.2722508372419741,5.276207086106532,5.280160842693844,5.2841121117080858,5.2880608978386539,5.292007205760231,5.2959510401328469,5.2998924056019456,5.3038313067984522,5.3077677483388284,5.3117017348251414,5.3156332708451259,5.3195623609722453,5.3234890097657566,5.327413221770767,5.3313350015182994,5.335254353525352,5.3391712822949602,5.3430857923162556,5.346997888064525,5.3509075740012744,5.3548148545742826,5.3587197342176642,5.3626222173519276,5.3665223083840345,5.3704200117074521,5.3743153317022205,5.3782082727349998,5.382098839159136,5.3859870353147139,5.3898728655286101,5.3937563341145571,5.3976374453731921,5.4015162035921165,5.4053926130459509,5.4092666779963867,5.4131384026922449,5.4170077913695298,5.4208748482514792,5.4247395775486229,5.4286019834588348,5.432462070167384,5.4363198418469914,5.4401753026578774,5.4440284567478194,5.4478793082522019,5.4517278612940654,5.4555741199841634,5.4594180884210077,5.4632597706909252,5.4670991708681047,5.4709362930146455,5.4747711411806153,5.4786037194040924,5.4824340317112163,5.4862620821162436,5.4900878746215875,5.493911413217873,5.4977327018839866,5.5015517445871156,5.5053685452828089,5.5091831079150158,5.5129954364161335,5.5168055347070624,5.5206134066972412,5.5244190562847049,5.5282224873561265,5.5320237037868605,5.5358227094409944,5.5396195081713913,5.5434141038197353,5.5472065002165794,5.550996701181389,5.5547847105225845,5.5585705320375913,5.5623541695128784,5.566135626724007,5.5699149074356722,5.5736920154017469,5.5774669543653266,5.5812397280587716,5.5850103402037492,5.5887787945112786,5.592545094681773,5.596309244405079,5.6000712473605248,5.6038311072169558,5.607588827632779,5.6113444122560079,5.6150978647242953,5.6188491886649858,5.6225983876951462,5.6263454654216112,5.6300904254410256,5.6338332713398795,5.6375740066945523,5.6413126350713512,5.6450491600265513,5.6487835851064361,5.6525159138473313,5.6562461497756527,5.6599742964079383,5.6637003572508879,5.6674243358014058,5.671146235546634,5.6748660599639917,5.6785838125212171,5.6822994966763973,5.6860131158780147,5.689724673564978,5.6934341731666605,5.6971416181029397,5.7008470117842318,5.7045503576115282,5.7082516589764341,5.7119509192612012,5.7156481418387672,5.7193433300727907,5.7230364873176836,5.7267276169186534,5.7304167222117322,5.7341038065238132,5.7377888731726916,5.7414719254670885,5.7451529667066952,5.7488320001822046,5.7525090291753438,5.7561840569589098,5.7598570867968029,5.7635281219440611,5.7671971656468948,5.770864221142717,5.7745292916601798,5.7781923804192061,5.7818534906310228,5.7855126254981935,5.7891697882146538,5.7928249819657358,5.7964782099282139,5.8001294752703219,5.803778781151796,5.807426130723905,5.8110715271294744,5.8147149735029302,5.8183564729703185,5.8219960286493464,5.8256336436494056,5.8292693210716084,5.832903064008816,5.8365348755456719,5.8401647587586281,5.8437927167159787,5.8474187524778918,5.8510428690964336,5.8546650696156046,5.8582853570713658,5.8619037344916691,5.8655202048964883,5.8691347712978468,5.8727474366998482,5.876358204098703,5.8799670764827603,5.8835740568325372,5.8871791481207421,5.8907823533123116,5.8943836753644314,5.8979831172265689,5.9015806818404997,5.9051763721403363,5.9087701910525565,5.9123621414960308,5.9159522263820472,5.9195404486143444,5.9231268110891344,5.9267113166951324,5.9302939683135829,5.9338747688182849,5.9374537210756246,5.941030827944596,5.9446060922768282,5.9481795169166176,5.9517511047009481,5.955320858459519,5.9588887810147719,5.9624548751819191,5.9660191437689631,5.9695815895767286,5.9731422153988865,5.9767010240219758,5.9802580182254363,5.9838132007816265,5.9873665744558524,5.9909181420063931,5.9944679061845241,5.9980158697345445,6.0015620353937971,6.0051064058926995,6.0086489839547639,6.0121897722966215,6.0157287736280507,6.0192659906519967,6.022801426064599,6.0263350825552129,6.0298669628064356,6.0333970694941277,6.0369254052874393,6.0404519728488308,6.0439767748340998,6.0474998138923999,6.051021092666268,6.0545406137916462,6.0580583798979033,6.0615743936078603,6.0650886575378111,6.0686011742975454,6.0721119464903719,6.0756209767131431,6.0791282675562712,6.0826338216037588,6.0861376414332131,6.0896397296158762,6.0931400887166385,6.0966387212940667,6.1001356299004241,6.1036308170816911,6.1071242853775889,6.1106160373215985,6.1141060754409837,6.1175944022568123,6.1210810202839792,6.1245659320312225,6.1280491400011501,6.1315306466902557,6.1350104545889446,6.138488566181552,6.1419649839463615,6.1454397103556309,6.1489127478756078,6.1523840989665519,6.1558537660827577,6.1593217516725689,6.1627880581784069,6.1662526880367814,6.1697156436783178,6.1731769275277744,6.1766365420040614,6.1800944895202612,6.183550772483648,6.1870053932957108,6.1904583543521641,6.193909658042978,6.1973593067523902,6.2008073028589266,6.2042536487354232,6.2076983467490408,6.2111413992612894,6.214582808628041,6.2180225771995534,6.2214607073204853,6.2248972013299184,6.2283320615613729,6.2317652903428291,6.2351968899967405,6.238626862840059,6.2420552111842476,6.2454819373353017,6.2489070435937677,6.2523305322547547,6.2557524056079625,6.2591726659376929,6.2625913155228661,6.2660083566370446,6.2694237915484443,6.2728376225199591,6.2762498518091707,6.2796604816683708,6.2830695143445787,6.2864769520795569,6.2898827971098275,6.2932870516666899,6.2966897179762418,6.3000907982593892,6.3034902947318701,6.3068882096042653,6.3102845450820197,6.3136793033654568,6.3170724866497965,6.3204640971251713,6.3238541369766406,6.3272426083842106,6.330629513522851,6.3340148545625041,6.3373986336681121,6.3407808529996235,6.3441615147120158,6.3475406209553062,6.3509181738745735,6.3542941756099678,6.3576686282967314,6.3610415340652109,6.3644128950408749,6.3677827133443294,6.3711509910913326,6.3745177303928111,6.3778829333548757,6.3812466020788348,6.3846087386612131,6.3879693451937634,6.3913284237634818,6.3946859764526289,6.398042005338735,6.4013965124946237,6.404749499988422,6.4081009698835771,6.4114509242388698,6.4147993651084319,6.4181462945417573,6.4214917145837207,6.4248356272745877,6.428178034650033,6.4315189387411529,6.4348583415744809,6.4381962451720005,6.4415326515511611,6.4448675627248901,6.4482009807016123,6.4515329074852552,6.4548633450752719,6.4581922954666489,6.4615197606499226,6.4648457426111952,6.4681702433321435,6.4714932647900376,6.4748148089577517,6.4781348778037771,6.4814534732922402,6.4847705973829095,6.4880862520312172,6.4914004391882658,6.494713160800841,6.4980244188114336,6.5013342151582441,6.5046425517751976,6.5079494305919612,6.5112548535339529,6.5145588225223552,6.5178613394741314,6.5211624063020324,6.5244620249146177,6.5277601972162609,6.5310569251071655,6.5343522104833811,6.5376460552368076,6.5409384612552177,6.5442294304222628,6.5475189646174874,6.5508070657163415,6.5540937355901958,6.5573789761063486,6.5606627891280436,6.563945176514479,6.5672261401208214,6.5705056817982159,6.573783803393801,6.57706050675072,6.580335793708131,6.5836096661012222,6.5868821257612211,6.5901531745154065,6.5934228141871243,6.5966910465957946,6.5999578735569262,6.6032232968821267,6.6064873183791173,6.6097499398517385,6.6130111630999684,6.6162709899199328,6.61952942210391,6.622786461440354,6.6260421097138957,6.6292963687053579,6.6325492401917705,6.6358007259463747,6.6390508277386395,6.6422995473342699,6.6455468864952225,6.6487928469797115,6.6520374305422214,6.6552806389335206,6.6585224739006685,6.6617629371870297,6.6650020305322837,6.6682397556724347,6.671476114339824,6.674711108263141,6.6779447391674323,6.6811770087741147,6.6844079188009839,6.6876374709622244,6.690865666968425,6.694092508526583,6.697317997340118,6.7005421351088845,6.7037649235291763,6.7069863642937442,6.7102064590917996,6.7134252096090306,6.7166426175276071,6.7198586845261961,6.7230734122799669,6.7262868024606064,6.7294988567363241,6.7327095767718665,6.7359189642285262,6.7391270207641476,6.7423337480331451,6.7455391476865039,6.7487432213717966,6.7519459707331926,6.7551473974114629,6.7583475030439946,6.7615462892648006,6.764743757704526,6.7679399099904609,6.7711347477465491,6.7743282725933964,6.7775204861482834,6.7807113900251714,6.7839009858347143,6.7870892751842673,6.7902762596778974,6.7934619409163899,6.7966463204972598,6.7998294000147634,6.8030111810599037,6.8061916652204406,6.8093708540809024,6.812548749222592,6.8157253522235983,6.8189006646588046,6.8220746880998977,6.8252474241153749,6.8284188742705583,6.8315890401275983,6.834757923245486,6.8379255251800606,6.8410918474840186,6.8442568917069222,6.8474206593952101,6.8505831520922031,6.8537443713381174,6.8569043186700682,6.8600629956220818,6.8632204037251032,6.8663765445070055,6.8695314194925983,6.872685030203634,6.8758373781588205,6.8789884648738262,6.8821382918612901,6.8852868606308304,6.8884341726890526,6.8915802295395583,6.8947250326829517,6.8978685836168507,6.9010108838358928,6.9041519348317468,6.9072917380931163,6.9104302951057512,6.9135676073524559,6.9167036763130945,6.9198385034646046,6.9229720902810001,6.9261044382333798,6.92923554878994,6.9323654234159751,6.9354940635738931,6.9386214707232208,6.941747646320608,6.9448725918198413,6.9479963086718488,6.9511187983247069,6.9542400622236533,6.9573601018110862,6.9604789185265821,6.9635965138068965,6.9667128890859722,6.9698280457949506,6.9729419853621772,6.9760547092132068,6.9791662187708177,6.9822765154550108,6.9853856006830251,6.9884934758693396,6.9916001424256837,6.9947056017610443,6.9978098552816705,7.000912904391086,7.0040147504900947,7.0071153949767844,7.0102148392465384,7.0133130846920402,7.0164101327032817,7.0195059846675747,7.0226006419695519,7.0256941059911746,7.028786378111743,7.0318774597079035,7.034967352153652,7.0380560568203485,7.0411435750767115,7.0442299082888411,7.0473150578202119,7.0503990250316857,7.0534818112815234,7.056563417925382,7.059643846316332,7.0627230978048559,7.0658011737388584,7.0688780754636724,7.0719538043220709,7.0750283616542653,7.0781017487979163,7.0811739670881462,7.0842450178575351,7.0873149024361339,7.0903836221514727,7.0934511783285625,7.096517572289903,7.0995828053554959,7.1026468788428403,7.1057097940669465,7.1087715523403432,7.1118321549730812,7.1148916032727421,7.1179498985444365,7.1210070420908291,7.1240630352121261,7.1271178792060876,7.1301715753680419,7.1332241249908801,7.1362755293650721,7.1393257897786651,7.1423749075172953,7.1454228838641942,7.1484697201001914,7.1515154175037239,7.1545599773508375,7.157603400915205,7.1606456894681152,7.1636868442784927,7.1667268666128976,7.1697657577355383,7.1728035189082675,7.1758401513905916,7.1788756564396898,7.1819100353103966,7.1849432892552265,7.1879754195243759,7.191006427365723,7.1940363140248387,7.1970650807449967,7.200092728767169,7.2031192593300393,7.2061446736700052,7.2091689730211925,7.212192158615446,7.2152142316823493,7.2182351934492264,7.2212550451411399,7.2242737879809074,7.2272914231891079,7.2303079519840718,7.2333233755819073,7.2363376951964913,7.2393509120394839,7.2423630273203248,7.2453740422462509,7.2483839580222913,7.2513927758512793,7.2544004969338562,7.2574071224684751,7.2604126536514091,7.2634170916767538,7.266420437736441,7.2694226930202284,7.2724238587157224,7.2754239360083748,7.2784229260814861,7.2814208301162147,7.2844176492915871,7.2874133847844931,7.2904080377696943,7.2934016094198384,7.2963941009054523,7.2993855133949523,7.3023758480546501,7.3053651060487645,7.3083532885394078,7.3113403966866137,7.3143264316483272,7.3173113945804165,7.3202952866366715,7.3232781089688235,7.3262598627265305,7.3292405490574009,7.3322201691069857,7.3351987240187899,7.3381762149342737,7.3411526429928653,7.3441280093319552,7.3471023150869108,7.3500755613910744,7.353047749375774,7.356018880170323,7.3589889549020278,7.3619579746961961,7.3649259406761338,7.3678928539631592,7.3708587156766008,7.3738235269338066,7.3767872888501422,7.3797500025390104,7.3827116691118366,7.3856722896780873,7.3886318653452747,7.3915903972189536,7.3945478864027319,7.3975043339982722,7.400459741105303,7.4034141088216145,7.4063674382430715,7.4093197304636114,7.4122709865752547,7.4152212076681021,7.4181703948303515,7.4211185491482912,7.4240656717063054,7.42701176358689,7.4299568258706419,7.4329008596362751,7.4358438659606207,7.4387858459186322,7.4417268005833872,7.4446667310261017,7.4476056383161175,7.4505435235209259,7.4534803877061595,7.4564162319355987,7.4593510572711832,7.4622848647730056,7.465217655499325,7.4681494305065677,7.4710801908493281,7.4740099375803837,7.4769386717506876,7.4798663944093793,7.4827931066037863,7.4857188093794349,7.488643503780045,7.4915671908475368,7.4944898716220472,7.4974115471419154,7.5003322184436971,7.5032518865621736,7.5061705525303442,7.5090882173794373,7.5120048821389176,7.5149205478364856,7.5178352154980779,7.5207488861478833,7.5236615608083373,7.5265732405001256,7.5294839262421984,7.5323936190517617,7.535302319944293,7.5382100299335359,7.5411167500315113,7.5440224812485166,7.5469272245931318,7.5498309810722262,7.5527337516909565,7.5556355374527762,7.5585363393594402,7.5614361584109986,7.564334995605817,7.5672328519405667,7.5701297284102349,7.5730256260081301,7.5759205457258822,7.5788144885534461,7.5817074554791084,7.5845994474894933,7.5874904655695623,7.5903805107026159,7.5932695838703061,7.5961576860526332,7.5990448182279504,7.6019309813729699,7.6048161764627693,7.6077004044707888,7.6105836663688358,7.613465963127096,7.6163472957141298,7.6192276650968775,7.6221070722406701,7.6249855181092219,7.627863003664638,7.6307395298674265,7.6336150976764898,7.636489708049135,7.6393633619410775,7.642236060306443,7.6451078040977745,7.6479785942660286,7.6508484317605898,7.6537173175292637,7.6565852525182851,7.6594522376723262,7.6623182739344937,7.6651833622463332,7.6680475035478359,7.6709106987774405,7.6737729488720365,7.6766342547669666,7.679494617396033,7.6823540376915016,7.6852125165840999,7.6880700550030276,7.6909266538759571,7.6937823141290309,7.6966370366868784,7.6994908224726082,7.7023436724078156,7.7051955874125859,7.7080465684054982,7.7108966163036268,7.7137457320225487,7.7165939164763433,7.7194411705775945,7.7222874952374045,7.7251328913653801,7.7279773598696515,7.7308209016568661,7.7336635176321984,7.7365052086993469,7.7393459757605445,7.7421858197165552,7.7450247414666844,7.7478627419087704,7.7506998219392056,7.753535982452922,7.7563712243434075,7.7592055485026989,7.762038955821394,7.7648714471886517,7.7677030234921887,7.7705336856182985,7.7733634344518343,7.7761922708762317,7.7790201957734961,7.7818472100242158,7.7846733145075646,7.7874985101012975,7.7903227976817622,7.793146178123898,7.7959686523012426,7.7987902210859268,7.8016108853486887,7.8044306459588721,7.8072495037844227,7.8100674596919042,7.8128845145464929,7.8157006692119815,7.8185159245507858,7.8213302814239416,7.824143740691115,7.8269563032106042,7.8297679698393328,7.8325787414328669,7.8353886188454105,7.8381976029298084,7.8410056945375519,7.8438128945187788,7.8466192037222804,7.8494246229954996,7.8522291531845383,7.855032795134159,7.857835549687783,7.8606374176875029,7.8634383999740791,7.8662384973869433,7.8690377107642,7.871836040942636,7.8746334887577127,7.8774300550435825,7.8802257406330778,7.8830205463577254,7.8858144730477413,7.8886075215320393,7.8913996926382257,7.8941909871926139,7.8969814060202204,7.8997709499447648,7.9025596197886792,7.9053474163731057,7.9081343405179041,7.9109203930416498,7.9137055747616412,7.9164898864938991,7.9192733290531674,7.922055903252927,7.9248376099053814,7.927618449821475,7.9303984238108889,7.9331775326820413,7.9359557772420963,7.938733158296964,7.9415096766513003,7.9442853331085121,7.9470601284707616,7.9498340635389688,7.9526071391128106,7.9553793559907255,7.9581507149699178,7.9609212168463621,7.9636908624147935,7.9664596524687319,7.9692275878004626,7.9719946692010524,7.9747608974603494,7.9775262733669852,7.9802907977083741,7.9830544712707212,7.9858172948390251,7.9885792691970696,7.9913403951274429,7.9941006734115305,7.9968601048295156,7.9996186901603856,8.0023764301819416,8.0051333256707853,8.0078893774023321,8.0106445861508142,8.013398952689279,8.0161524777895909,8.0189051622224401,8.0216570067573389,8.0244080121626258,8.0271581792054683,8.0299075086518688,8.0326560012666608,8.0354036578135126,8.0381504790549396,8.0408964657522901,8.0436416186657596,8.0463859385543923,8.0491294261760817,8.0518720822875665,8.0546139076444483,8.057354903001178,8.0600950691110675,8.0628344067262905,8.0655729165978851,8.0683105994757529,8.0710474561086656,8.0737834872442651,8.0765186936290672,8.0792530760084613,8.081986635126718,8.0847193717269832,8.0874512865512909,8.0901823803405577,8.0929126538345866,8.0956421077720702,8.0983707428905944,8.1010985599266405,8.103825559615581,8.1065517426916962,8.1092771098881595,8.1120016619370503,8.1147253995693571,8.1174483235149726,8.1201704345027022,8.1228917332602606,8.1256122205142827,8.128331896990316,8.13105076341283,8.1337688205052139,8.136486068989786,8.1392025095877827,8.1419181430193763,8.1446329700036646,8.1473469912586811,8.1500602075013937,8.1527726194477079,8.1554842278124671,8.1581950333094611,8.1609050366514158,8.163614238550009,8.1663226397158688,8.1690302408585662,8.1717370426866314,8.1744430459075446,8.1771482512277487,8.1798526593526386,8.1825562709865771,8.1852590868328878,8.187961107593857,8.1906623339707423,8.1933627666637712,8.1960624063721408,8.1987612537940215,8.2014593096265642,8.2041565745658946,8.206853049307119,8.2095487345443257,8.2122436309705886,8.2149377392779712,8.2176310601575171,8.2203235942992698,8.2230153423922605,8.225706305124513,8.2283964831830563,8.2310858772539124,8.2337744880221013,8.2364623161716537,8.2391493623856,8.2418356273459779,8.2445211117338388,8.2472058162292381,8.2498897415112502,8.2525728882579603,8.2552552571464748,8.2579368488529177,8.2606176640524289,8.2632977034191821,8.265976967626365,8.2686554573462008,8.2713331732499356,8.2740101160078492,8.2766862862892534,8.2793616847624989,8.2820363120949665,8.2847101689530795,8.2873832560023022,8.2900555739071411,8.2927271233311455,8.2953979049369124,8.2980679193860905,8.3007371673393706,8.3034056494565025,8.3060733663962907,8.3087403188165894,8.3114065073743184,8.3140719327254491,8.3167365955250236,8.3194004964271393,8.3220636360849642,8.3247260151507305,8.3273876342757411,8.3300484941103718,8.3327085953040676,8.3353679385053496,8.3380265243618172,8.340684353520146,8.3433414266260897,8.3459977443244906,8.3486533072592692,8.3513081160734348,8.3539621714090799,8.3566154739073948,8.3592680242086512,8.3619198229522187,8.3645708707765625,8.3672211683192419,8.3698707162169157,8.3725195151053438,8.3751675656193854,8.3778148683930063,8.3804614240592734,8.3831072332503656,8.3857522965975697,8.3883966147312794,8.3910401882810071,8.3936830178753734,8.3963251041421163,8.3989664477080979,8.4016070491992902,8.4042469092407917,8.4068860284568228,8.4095244074707303,8.4121620469049834,8.4147989473811826,8.4174351095200546,8.4200705339414643,8.4227052212644029,8.4253391721069981,8.427972387086518,8.4306048668193618,8.4332366119210782,8.435867623006347,8.4384979006890006,8.4411274455820084,8.4437562582974941,8.4463843394467215,8.4490116896401126,8.4516383094872332,8.4542641995968086,8.4568893605767173,8.4595137930339899,8.4621374975748225,8.4647604748045637,8.467382725327731,8.4700042497479977,8.4726250486682062,8.4752451226903638,8.4778644724156482,8.4804830984444006,8.4831010013761396,8.4857181818095544,8.4883346403425062,8.4909503775720356,8.4935653940943592,8.4961796905048708,8.498793267398149,8.50140612536795,8.5040182650072165,8.5066296869080791,8.5092403916618498,8.5118503798590321,8.5144596520893199,8.5170682089415983,8.5196760510039429,8.5222831788636295,8.524889593107126,8.5274952943201008,8.5301002830874157,8.5327045599931424,8.5353081256205492,8.5379109805521072,8.5405131253694986,8.5431145606536063,8.5457152869845281,8.5483153049415623,8.5509146151032311,8.5535132180472591,8.5561111143505926,8.5587083045893877,8.5613047893390224,8.563900569174093,8.5664956446684144,8.569090016395025,8.571683684926187,8.5742766508333847,8.5768689146873349,8.5794604770579728,8.5820513385144714,8.5846414996252296,8.5872309609578803,8.589819723079291,8.5924077865555635,8.5949951519520322,8.597581819833275,8.6001677907631073,8.6027530653045865,8.6053376440200076,8.6079215274709142,8.6105047162180952,8.6130872108215808,8.6156690118406551,8.6182501198338493,8.6208305353589427,8.6234102589729726,8.6259892912322247,8.628567632692242,8.6311452839078218,8.633722245433022,8.6362985178211602,8.6388741016248094,8.6414489973958108,8.6440232056852651,8.6465967270435389,8.6491695620202638,8.6517417111643393,8.654313175023935,8.6568839541464886,8.6594540490787129,8.6620234603665889,8.6645921885553729,8.6671602341896019,8.6697275978130826,8.6722942799689022,8.6748602811994324,8.6774256020463199,8.6799902430504954,8.682554204752174,8.685117487690853,8.6876800924053228,8.6902420194336525,8.6928032693132078,8.6953638425806385,8.6979237397718911,8.7004829614222015,8.7030415080660983,8.7055993802374125,8.7081565784692643,8.7107131032940757,8.7132689552435671,8.7158241348487611,8.7183786426399781,8.7209324791468479,8.7234856448982985,8.7260381404225686,8.7285899662471991,8.7311411228990448,8.7336916109042662,8.7362414307883363,8.7387905830760371,8.7413390682914702,8.7438868869580428,8.7464340395984888,8.7489805267348508,8.7515263488884916,8.7540715065800985,8.7566160003296716,8.7591598306565395,8.7617029980793486,8.7642455031160793,8.7667873462840262,8.7693285280998197,8.7718690490794131,8.7744089097380922,8.776948110590471,8.7794866521505011,8.7820245349314572,8.7845617594459586,8.787098326205955,8.7896342357227333,8.7921694885069179,8.7947040850684726,8.7972380259167036,8.7997713115602583,8.8023039425071214,8.8048359192646295,8.807367242339458,8.8098979122376324,8.8124279294645262,8.8149572945248558,8.8174860079226942,8.8200140701614629,8.8225414817439329,8.8250682431722325,8.8275943549478431,8.8301198175715996,8.8326446315436975,8.8351687973636892,8.8376923155304841,8.8402151865423519,8.8427374108969268,8.845258989091203,8.8477799216215409,8.8503002089836613,8.8528198516726544,8.8553388501829797,8.8578572050084574,8.8603749166422858,8.8628919855770292,8.8654084123046211,8.8679241973163734,8.8704393411029692,8.8729538441544644,8.8754677069602934,8.8779809300092705,8.8804935137895828,8.8830054587887997,8.8855167654938718,8.8880274343911303,8.8905374659662879,8.8930468607044446,8.8955556190900804,8.898063741607066,8.9005712287386558,8.9030780809674965,8.9055842987756186,8.9080898826444486,8.9105948330547999,8.9130991504868788,8.915602835420291,8.9181058883340274,8.9206083097064823,8.9231101000154442,8.9256112597380994,8.928111789351032,8.9306116893302256,8.9331109601510708,8.9356096022883538,8.938107616216266,8.9406050024084021,8.9431017613377648,8.9455978934767604,8.9480933992972034,8.9505882792703151,8.9530825338667306,8.9555761635564917,8.9580691688090521,8.9605615500932778,8.9630533078774501,8.9655444426292643,8.9680349548158294,8.9705248449036734,8.9730141133587402,8.9755027606463944,8.977990787231418,8.9804781935780138,8.9829649801498075,8.9854511474098473,8.9879366958206077,8.9904216258439806,8.9929059379412895,8.9953896325732838,8.9978727102001397,9.0003551712814627,9.0028370162762865,9.00531824564308,9.0077988598397365,9.0102788593235861,9.0127582445513941,9.0152370159793591,9.0177151740631114,9.0201927192577251,9.0226696520177079,9.0251459727970023,9.0276216820489967,9.0300967802265184,9.0325712677818331,9.0350451451666505,9.0375184128321262,9.039991071228858,9.042463120806886,9.0449345620157029,9.0474053953042421,9.0498756211208899]}
},{}],48:[function(require,module,exports){
module.exports={"x":[-0.75,-0.7492496248124062,-0.7484992496248124,-0.7477488744372186,-0.7469984992496248,-0.746248124062031,-0.7454977488744372,-0.74474737368684341,-0.74399699849924961,-0.74324662331165581,-0.74249624812406201,-0.74174587293646821,-0.74099549774887441,-0.74024512256128061,-0.73949474737368681,-0.73874437218609301,-0.73799399699849921,-0.73724362181090541,-0.73649324662331161,-0.73574287143571782,-0.73499249624812402,-0.73424212106053022,-0.73349174587293642,-0.73274137068534262,-0.73199099549774882,-0.73124062031015513,-0.73049024512256133,-0.72973986993496753,-0.72898949474737373,-0.72823911955977993,-0.72748874437218614,-0.72673836918459234,-0.72598799399699854,-0.72523761880940474,-0.72448724362181094,-0.72373686843421714,-0.72298649324662334,-0.72223611805902954,-0.72148574287143574,-0.72073536768384194,-0.71998499249624814,-0.71923461730865434,-0.71848424212106055,-0.71773386693346675,-0.71698349174587295,-0.71623311655827915,-0.71548274137068535,-0.71473236618309155,-0.71398199099549775,-0.71323161580790395,-0.71248124062031015,-0.71173086543271635,-0.71098049024512255,-0.71023011505752875,-0.70947973986993496,-0.70872936468234116,-0.70797898949474736,-0.70722861430715356,-0.70647823911955976,-0.70572786393196596,-0.70497748874437216,-0.70422711355677836,-0.70347673836918456,-0.70272636318159076,-0.70197598799399696,-0.70122561280640316,-0.70047523761880937,-0.69972486243121557,-0.69897448724362177,-0.69822411205602797,-0.69747373686843417,-0.69672336168084037,-0.69597298649324668,-0.69522261130565277,-0.69447223611805908,-0.69372186093046528,-0.69297148574287148,-0.69222111055527769,-0.69147073536768389,-0.69072036018009009,-0.68996998499249629,-0.68921960980490249,-0.68846923461730869,-0.68771885942971489,-0.68696848424212109,-0.68621810905452729,-0.68546773386693349,-0.68471735867933969,-0.68396698349174589,-0.6832166083041521,-0.6824662331165583,-0.6817158579289645,-0.6809654827413707,-0.6802151075537769,-0.6794647323661831,-0.6787143571785893,-0.6779639819909955,-0.6772136068034017,-0.6764632316158079,-0.6757128564282141,-0.6749624812406203,-0.67421210605302651,-0.67346173086543271,-0.67271135567783891,-0.67196098049024511,-0.67121060530265131,-0.67046023011505751,-0.66970985492746371,-0.66895947973986991,-0.66820910455227611,-0.66745872936468231,-0.66670835417708851,-0.66595797898949471,-0.66520760380190092,-0.66445722861430712,-0.66370685342671332,-0.66295647823911952,-0.66220610305152572,-0.66145572786393192,-0.66070535267633823,-0.65995497748874432,-0.65920460230115063,-0.65845422711355672,-0.65770385192596303,-0.65695347673836912,-0.65620310155077544,-0.65545272636318164,-0.65470235117558784,-0.65395197598799404,-0.65320160080040024,-0.65245122561280644,-0.65170085042521264,-0.65095047523761884,-0.65020010005002504,-0.64944972486243124,-0.64869934967483744,-0.64794897448724365,-0.64719859929964985,-0.64644822411205605,-0.64569784892446225,-0.64494747373686845,-0.64419709854927465,-0.64344672336168085,-0.64269634817408705,-0.64194597298649325,-0.64119559779889945,-0.64044522261130565,-0.63969484742371185,-0.63894447223611806,-0.63819409704852426,-0.63744372186093046,-0.63669334667333666,-0.63594297148574286,-0.63519259629814906,-0.63444222111055526,-0.63369184592296146,-0.63294147073536766,-0.63219109554777386,-0.63144072036018006,-0.63069034517258626,-0.62993996998499246,-0.62918959479739867,-0.62843921960980487,-0.62768884442221107,-0.62693846923461727,-0.62618809404702347,-0.62543771885942967,-0.62468734367183587,-0.62393696848424218,-0.62318659329664827,-0.62243621810905458,-0.62168584292146067,-0.62093546773386699,-0.62018509254627308,-0.61943471735867939,-0.61868434217108548,-0.61793396698349179,-0.61718359179589799,-0.61643321660830419,-0.61568284142071039,-0.61493246623311659,-0.61418209104552279,-0.61343171585792899,-0.61268134067033519,-0.6119309654827414,-0.6111805902951476,-0.6104302151075538,-0.60967983991996,-0.6089294647323662,-0.6081790895447724,-0.6074287143571786,-0.6066783391695848,-0.605927963981991,-0.6051775887943972,-0.6044272136068034,-0.6036768384192096,-0.60292646323161581,-0.60217608804402201,-0.60142571285642821,-0.60067533766883441,-0.59992496248124061,-0.59917458729364681,-0.59842421210605301,-0.59767383691845921,-0.59692346173086541,-0.59617308654327161,-0.59542271135567781,-0.59467233616808401,-0.59392196098049022,-0.59317158579289642,-0.59242121060530262,-0.59167083541770882,-0.59092046023011502,-0.59017008504252122,-0.58941970985492742,-0.58866933466733373,-0.58791895947973982,-0.58716858429214613,-0.58641820910455222,-0.58566783391695854,-0.58491745872936463,-0.58416708354177094,-0.58341670835417703,-0.58266633316658334,-0.58191595797898943,-0.58116558279139574,-0.58041520760380194,-0.57966483241620814,-0.57891445722861434,-0.57816408204102054,-0.57741370685342674,-0.57666333166583295,-0.57591295647823915,-0.57516258129064535,-0.57441220610305155,-0.57366183091545775,-0.57291145572786395,-0.57216108054027015,-0.57141070535267635,-0.57066033016508255,-0.56990995497748875,-0.56915957978989495,-0.56840920460230115,-0.56765882941470736,-0.56690845422711356,-0.56615807903951976,-0.56540770385192596,-0.56465732866433216,-0.56390695347673836,-0.56315657828914456,-0.56240620310155076,-0.56165582791395696,-0.56090545272636316,-0.56015507753876936,-0.55940470235117556,-0.55865432716358177,-0.55790395197598797,-0.55715357678839417,-0.55640320160080037,-0.55565282641320657,-0.55490245122561277,-0.55415207603801897,-0.55340170085042517,-0.55265132566283137,-0.55190095047523768,-0.55115057528764377,-0.55040020010005009,-0.54964982491245618,-0.54889944972486249,-0.54814907453726858,-0.54739869934967489,-0.54664832416208098,-0.54589794897448729,-0.54514757378689338,-0.54439719859929969,-0.54364682341170589,-0.54289644822411209,-0.54214607303651829,-0.5413956978489245,-0.5406453226613307,-0.5398949474737369,-0.5391445722861431,-0.5383941970985493,-0.5376438219109555,-0.5368934467233617,-0.5361430715357679,-0.5353926963481741,-0.5346423211605803,-0.5338919459729865,-0.5331415707853927,-0.53239119559779891,-0.53164082041020511,-0.53089044522261131,-0.53014007003501751,-0.52938969484742371,-0.52863931965982991,-0.52788894447223611,-0.52713856928464231,-0.52638819409704851,-0.52563781890945471,-0.52488744372186091,-0.52413706853426711,-0.52338669334667332,-0.52263631815907952,-0.52188594297148572,-0.52113556778389192,-0.52038519259629812,-0.51963481740870432,-0.51888444222111052,-0.51813406703351672,-0.51738369184592292,-0.51663331665832923,-0.51588294147073532,-0.51513256628314164,-0.51438219109554773,-0.51363181590795404,-0.51288144072036013,-0.51213106553276644,-0.51138069034517253,-0.51063031515757884,-0.50987993996998493,-0.50912956478239124,-0.50837918959479733,-0.50762881440720364,-0.50687843921960984,-0.50612806403201605,-0.50537768884442225,-0.50462731365682845,-0.50387693846923465,-0.50312656328164085,-0.50237618809404705,-0.50162581290645325,-0.50087543771885945,-0.50012506253126565,-0.49937468734367185,-0.49862431215607805,-0.49787393696848425,-0.49712356178089045,-0.49637318659329666,-0.49562281140570286,-0.49487243621810906,-0.49412206103051526,-0.49337168584292146,-0.49262131065532766,-0.49187093546773386,-0.49112056028014006,-0.49037018509254626,-0.48961980990495246,-0.48886943471735866,-0.48811905952976486,-0.48736868434217107,-0.48661830915457727,-0.48586793396698347,-0.48511755877938967,-0.48436718359179592,-0.48361680840420213,-0.48286643321660833,-0.48211605802901453,-0.48136568284142073,-0.48061530765382693,-0.47986493246623313,-0.47911455727863933,-0.47836418209104553,-0.47761380690345173,-0.47686343171585793,-0.47611305652826413,-0.47536268134067033,-0.47461230615307654,-0.47386193096548274,-0.47311155577788894,-0.47236118059029514,-0.47161080540270134,-0.47086043021510754,-0.47011005502751374,-0.46935967983991994,-0.46860930465232614,-0.46785892946473234,-0.46710855427713854,-0.4663581790895448,-0.465607803901951,-0.4648574287143572,-0.4641070535267634,-0.4633566783391696,-0.4626063031515758,-0.461855927963982,-0.46110555277638821,-0.46035517758879441,-0.45960480240120061,-0.45885442721360681,-0.45810405202601301,-0.45735367683841921,-0.45660330165082541,-0.45585292646323161,-0.45510255127563781,-0.45435217608804401,-0.45360180090045021,-0.45285142571285641,-0.45210105052526262,-0.45135067533766882,-0.45060030015007502,-0.44984992496248122,-0.44909954977488742,-0.44834917458729362,-0.44759879939969988,-0.44684842421210608,-0.44609804902451228,-0.44534767383691848,-0.44459729864932468,-0.44384692346173088,-0.44309654827413708,-0.44234617308654328,-0.44159579789894948,-0.44084542271135568,-0.44009504752376188,-0.43934467233616809,-0.43859429714857429,-0.43784392196098049,-0.43709354677338669,-0.43634317158579289,-0.43559279639819909,-0.43484242121060529,-0.43409204602301149,-0.43334167083541769,-0.43259129564782389,-0.43184092046023009,-0.43109054527263629,-0.43034017008504249,-0.42958979489744875,-0.42883941970985495,-0.42808904452226115,-0.42733866933466735,-0.42658829414707355,-0.42583791895947976,-0.42508754377188596,-0.42433716858429216,-0.42358679339669836,-0.42283641820910456,-0.42208604302151076,-0.42133566783391696,-0.42058529264632316,-0.41983491745872936,-0.41908454227113556,-0.41833416708354176,-0.41758379189594796,-0.41683341670835417,-0.41608304152076037,-0.41533266633316657,-0.41458229114557277,-0.41383191595797897,-0.41308154077038517,-0.41233116558279137,-0.41158079039519757,-0.41083041520760383,-0.41008004002001003,-0.40932966483241623,-0.40857928964482243,-0.40782891445722863,-0.40707853926963483,-0.40632816408204103,-0.40557778889444723,-0.40482741370685343,-0.40407703851925963,-0.40332666333166584,-0.40257628814407204,-0.40182591295647824,-0.40107553776888444,-0.40032516258129064,-0.39957478739369684,-0.39882441220610304,-0.39807403701850924,-0.39732366183091544,-0.39657328664332164,-0.39582291145572784,-0.39507253626813404,-0.39432216108054025,-0.39357178589294645,-0.3928214107053527,-0.3920710355177589,-0.3913206603301651,-0.39057028514257131,-0.38981990995497751,-0.38906953476738371,-0.38831915957978991,-0.38756878439219611,-0.38681840920460231,-0.38606803401700851,-0.38531765882941471,-0.38456728364182091,-0.38381690845422711,-0.38306653326663331,-0.38231615807903951,-0.38156578289144572,-0.38081540770385192,-0.38006503251625812,-0.37931465732866432,-0.37856428214107052,-0.37781390695347672,-0.37706353176588292,-0.37631315657828912,-0.37556278139069532,-0.37481240620310158,-0.37406203101550778,-0.37331165582791398,-0.37256128064032018,-0.37181090545272638,-0.37106053026513258,-0.37031015507753878,-0.36955977988994498,-0.36880940470235118,-0.36805902951475739,-0.36730865432716359,-0.36655827913956979,-0.36580790395197599,-0.36505752876438219,-0.36430715357678839,-0.36355677838919459,-0.36280640320160079,-0.36205602801400699,-0.36130565282641319,-0.36055527763881939,-0.35980490245122559,-0.3590545272636318,-0.358304152076038,-0.3575537768884442,-0.3568034017008504,-0.35605302651325665,-0.35530265132566285,-0.35455227613806906,-0.35380190095047526,-0.35305152576288146,-0.35230115057528766,-0.35155077538769386,-0.35080040020010006,-0.35005002501250626,-0.34929964982491246,-0.34854927463731866,-0.34779889944972486,-0.34704852426213106,-0.34629814907453726,-0.34554777388694347,-0.34479739869934967,-0.34404702351175587,-0.34329664832416207,-0.34254627313656827,-0.34179589794897447,-0.34104552276138067,-0.34029514757378687,-0.33954477238619307,-0.33879439719859927,-0.33804402201100553,-0.33729364682341173,-0.33654327163581793,-0.33579289644822413,-0.33504252126063033,-0.33429214607303653,-0.33354177088544273,-0.33279139569784894,-0.33204102051025514,-0.33129064532266134,-0.33054027013506754,-0.32978989494747374,-0.32903951975987994,-0.32828914457228614,-0.32753876938469234,-0.32678839419709854,-0.32603801900950474,-0.32528764382191094,-0.32453726863431714,-0.32378689344672335,-0.32303651825912955,-0.32228614307153575,-0.32153576788394195,-0.32078539269634815,-0.3200350175087544,-0.31928464232116061,-0.31853426713356681,-0.31778389194597301,-0.31703351675837921,-0.31628314157078541,-0.31553276638319161,-0.31478239119559781,-0.31403201600800401,-0.31328164082041021,-0.31253126563281641,-0.31178089044522261,-0.31103051525762881,-0.31028014007003502,-0.30952976488244122,-0.30877938969484742,-0.30802901450725362,-0.30727863931965982,-0.30652826413206602,-0.30577788894447222,-0.30502751375687842,-0.30427713856928462,-0.30352676338169082,-0.30277638819409702,-0.30202601300650322,-0.30127563781890948,-0.30052526263131568,-0.29977488744372188,-0.29902451225612808,-0.29827413706853428,-0.29752376188094048,-0.29677338669334669,-0.29602301150575289,-0.29527263631815909,-0.29452226113056529,-0.29377188594297149,-0.29302151075537769,-0.29227113556778389,-0.29152076038019009,-0.29077038519259629,-0.29002001000500249,-0.28926963481740869,-0.28851925962981489,-0.2877688844422211,-0.2870185092546273,-0.2862681340670335,-0.2855177588794397,-0.2847673836918459,-0.2840170085042521,-0.28326663331665836,-0.28251625812906456,-0.28176588294147076,-0.28101550775387696,-0.28026513256628316,-0.27951475737868936,-0.27876438219109556,-0.27801400700350176,-0.27726363181590796,-0.27651325662831416,-0.27576288144072036,-0.27501250625312657,-0.27426213106553277,-0.27351175587793897,-0.27276138069034517,-0.27201100550275137,-0.27126063031515757,-0.27051025512756377,-0.26975987993996997,-0.26900950475237617,-0.26825912956478237,-0.26750875437718857,-0.26675837918959477,-0.26600800400200098,-0.26525762881440718,-0.26450725362681343,-0.26375687843921963,-0.26300650325162583,-0.26225612806403203,-0.26150575287643824,-0.26075537768884444,-0.26000500250125064,-0.25925462731365684,-0.25850425212606304,-0.25775387693846924,-0.25700350175087544,-0.25625312656328164,-0.25550275137568784,-0.25475237618809404,-0.25400200100050024,-0.25325162581290644,-0.25250125062531265,-0.25175087543771885,-0.25100050025012505,-0.25025012506253125,-0.2494997498749375,-0.24874937468734371,-0.24799899949974991,-0.24724862431215611,-0.24649824912456231,-0.24574787393696851,-0.24499749874937471,-0.24424712356178091,-0.24349674837418711,-0.24274637318659331,-0.24199599799899951,-0.24124562281140571,-0.24049524762381191,-0.23974487243621811,-0.23899449724862432,-0.23824412206103052,-0.23749374687343672,-0.23674337168584292,-0.23599299649824912,-0.23524262131065532,-0.23449224612306152,-0.23374187093546772,-0.23299149574787392,-0.23224112056028012,-0.23149074537268632,-0.23074037018509252,-0.22998999499749873,-0.22923961980990493,-0.22848924462231113,-0.22773886943471733,-0.22698849424712353,-0.22623811905952973,-0.22548774387193593,-0.22473736868434213,-0.22398699349674833,-0.22323661830915453,-0.22248624312156073,-0.22173586793396693,-0.22098549274637314,-0.22023511755877934,-0.21948474237118554,-0.21873436718359185,-0.21798399199599805,-0.21723361680840425,-0.21648324162081045,-0.21573286643321665,-0.21498249124562285,-0.21423211605802905,-0.21348174087043525,-0.21273136568284146,-0.21198099049524766,-0.21123061530765386,-0.21048024012006006,-0.20972986493246626,-0.20897948974487246,-0.20822911455727866,-0.20747873936968486,-0.20672836418209106,-0.20597798899449726,-0.20522761380690346,-0.20447723861930966,-0.20372686343171587,-0.20297648824412207,-0.20222611305652827,-0.20147573786893447,-0.20072536268134067,-0.19997498749374687,-0.19922461230615307,-0.19847423711855927,-0.19772386193096547,-0.19697348674337167,-0.19622311155577787,-0.19547273636818407,-0.19472236118059028,-0.19397198599299648,-0.19322161080540268,-0.19247123561780888,-0.19172086043021508,-0.19097048524262128,-0.19022011005502748,-0.18946973486743368,-0.18871935967983988,-0.18796898449224608,-0.18721860930465228,-0.18646823411705848,-0.18571785892946469,-0.18496748374187089,-0.18421710855427709,-0.18346673336668329,-0.1827163581790896,-0.1819659829914958,-0.181215607803902,-0.1804652326163082,-0.1797148574287144,-0.1789644822411206,-0.1782141070535268,-0.17746373186593301,-0.17671335667833921,-0.17596298149074541,-0.17521260630315161,-0.17446223111555781,-0.17371185592796401,-0.17296148074037021,-0.17221110555277641,-0.17146073036518261,-0.17071035517758881,-0.16995997998999501,-0.16920960480240121,-0.16845922961480742,-0.16770885442721362,-0.16695847923961982,-0.16620810405202602,-0.16545772886443222,-0.16470735367683842,-0.16395697848924462,-0.16320660330165082,-0.16245622811405702,-0.16170585292646322,-0.16095547773886942,-0.16020510255127562,-0.15945472736368183,-0.15870435217608803,-0.15795397698849423,-0.15720360180090043,-0.15645322661330663,-0.15570285142571283,-0.15495247623811903,-0.15420210105052523,-0.15345172586293143,-0.15270135067533763,-0.15195097548774383,-0.15120060030015003,-0.15045022511255624,-0.14969984992496244,-0.14894947473736864,-0.14819909954977484,-0.14744872436218104,-0.14669834917458724,-0.14594797398699355,-0.14519759879939975,-0.14444722361180595,-0.14369684842421215,-0.14294647323661835,-0.14219609804902456,-0.14144572286143076,-0.14069534767383696,-0.13994497248624316,-0.13919459729864936,-0.13844422211105556,-0.13769384692346176,-0.13694347173586796,-0.13619309654827416,-0.13544272136068036,-0.13469234617308656,-0.13394197098549276,-0.13319159579789897,-0.13244122061030517,-0.13169084542271137,-0.13094047023511757,-0.13019009504752377,-0.12943971985992997,-0.12868934467233617,-0.12793896948474237,-0.12718859429714857,-0.12643821910955477,-0.12568784392196097,-0.12493746873436717,-0.12418709354677337,-0.12343671835917958,-0.12268634317158578,-0.12193596798399198,-0.12118559279639818,-0.12043521760880438,-0.11968484242121058,-0.11893446723361678,-0.11818409204602298,-0.11743371685842918,-0.11668334167083538,-0.11593296648324158,-0.11518259129564778,-0.11443221610805399,-0.11368184092046019,-0.11293146573286639,-0.11218109054527259,-0.11143071535767879,-0.11068034017008499,-0.10992996498249119,-0.1091795897948975,-0.1084292146073037,-0.1076788394197099,-0.1069284642321161,-0.10617808904452231,-0.10542771385692851,-0.10467733866933471,-0.10392696348174091,-0.10317658829414711,-0.10242621310655331,-0.10167583791895951,-0.10092546273136571,-0.10017508754377191,-0.099424712356178113,-0.098674337168584314,-0.097923961980990515,-0.097173586793396716,-0.096423211605802917,-0.095672836418209117,-0.094922461230615318,-0.094172086043021519,-0.09342171085542772,-0.092671335667833921,-0.091920960480240121,-0.091170585292646322,-0.090420210105052523,-0.089669834917458724,-0.088919459729864925,-0.088169084542271126,-0.087418709354677326,-0.086668334167083527,-0.085917958979489728,-0.085167583791895929,-0.08441720860430213,-0.083666833416708331,-0.082916458229114531,-0.082166083041520732,-0.081415707853926933,-0.080665332666333134,-0.079914957478739335,-0.079164582291145535,-0.078414207103551736,-0.077663831915957937,-0.076913456728364138,-0.076163081540770339,-0.07541270635317654,-0.07466233116558274,-0.073911955977988941,-0.073161580790395142,-0.072411205602801454,-0.071660830415207655,-0.070910455227613856,-0.070160080040020056,-0.069409704852426257,-0.068659329664832458,-0.067908954477238659,-0.06715857928964486,-0.066408204102051061,-0.065657828914457261,-0.064907453726863462,-0.064157078539269663,-0.063406703351675864,-0.062656328164082065,-0.061905952976488265,-0.061155577788894466,-0.060405202601300667,-0.059654827413706868,-0.058904452226113069,-0.05815407703851927,-0.05740370185092547,-0.056653326663331671,-0.055902951475737872,-0.055152576288144073,-0.054402201100550274,-0.053651825912956475,-0.052901450725362675,-0.052151075537768876,-0.051400700350175077,-0.050650325162581278,-0.049899949974987479,-0.049149574787393679,-0.04839919959979988,-0.047648824412206081,-0.046898449224612282,-0.046148074037018483,-0.045397698849424684,-0.044647323661830884,-0.043896948474237085,-0.043146573286643286,-0.042396198099049487,-0.041645822911455688,-0.040895447723861889,-0.040145072536268089,-0.03939469734867429,-0.038644322161080491,-0.037893946973486692,-0.037143571785892893,-0.036393196598299205,-0.035642821410705405,-0.034892446223111606,-0.034142071035517807,-0.033391695847924008,-0.032641320660330209,-0.031890945472736409,-0.03114057028514261,-0.030390195097548811,-0.029639819909955012,-0.028889444722361213,-0.028139069534767414,-0.027388694347173614,-0.026638319159579815,-0.025887943971986016,-0.025137568784392217,-0.024387193596798418,-0.023636818409204619,-0.022886443221610819,-0.02213606803401702,-0.021385692846423221,-0.020635317658829422,-0.019884942471235623,-0.019134567283641823,-0.018384192096048024,-0.017633816908454225,-0.016883441720860426,-0.016133066533266627,-0.015382691345672828,-0.014632316158079028,-0.013881940970485229,-0.01313156578289143,-0.012381190595297631,-0.011630815407703832,-0.010880440220110033,-0.010130065032516233,-0.0093796898449224342,-0.008629314657328635,-0.0078789394697348358,-0.0071285642821410367,-0.0063781890945472375,-0.0056278139069534383,-0.0048774387193596391,-0.00412706353176584,-0.0033766883441720408,-0.0026263131565782416,-0.0018759379689844424,-0.0011255627813906433,-0.00037518759379684408,0.00037518759379684408,0.0011255627813906433,0.0018759379689844424,0.0026263131565782416,0.0033766883441720408,0.00412706353176584,0.0048774387193596391,0.0056278139069534383,0.0063781890945472375,0.0071285642821410367,0.0078789394697348358,0.008629314657328635,0.0093796898449224342,0.010130065032516233,0.010880440220110033,0.011630815407703832,0.012381190595297631,0.01313156578289143,0.013881940970485229,0.014632316158079028,0.015382691345672828,0.016133066533266627,0.016883441720860426,0.017633816908454225,0.018384192096048024,0.019134567283641823,0.019884942471235623,0.020635317658829422,0.021385692846423221,0.02213606803401702,0.022886443221610819,0.023636818409204619,0.024387193596798418,0.025137568784392217,0.025887943971986016,0.026638319159579815,0.027388694347173614,0.028139069534767414,0.028889444722361213,0.029639819909955012,0.030390195097548811,0.03114057028514261,0.031890945472736409,0.032641320660330209,0.033391695847924008,0.034142071035517807,0.034892446223111606,0.035642821410705405,0.036393196598299205,0.037143571785892893,0.037893946973486692,0.038644322161080491,0.03939469734867429,0.040145072536268089,0.040895447723861889,0.041645822911455688,0.042396198099049487,0.043146573286643286,0.043896948474237085,0.044647323661830884,0.045397698849424684,0.046148074037018483,0.046898449224612282,0.047648824412206081,0.04839919959979988,0.049149574787393679,0.049899949974987479,0.050650325162581278,0.051400700350175077,0.052151075537768876,0.052901450725362675,0.053651825912956475,0.054402201100550274,0.055152576288144073,0.055902951475737872,0.056653326663331671,0.05740370185092547,0.05815407703851927,0.058904452226113069,0.059654827413706868,0.060405202601300667,0.061155577788894466,0.061905952976488265,0.062656328164082065,0.063406703351675864,0.064157078539269663,0.064907453726863462,0.065657828914457261,0.066408204102051061,0.06715857928964486,0.067908954477238659,0.068659329664832458,0.069409704852426257,0.070160080040020056,0.070910455227613856,0.071660830415207655,0.072411205602801454,0.073161580790395253,0.073911955977988941,0.07466233116558274,0.07541270635317654,0.076163081540770339,0.076913456728364138,0.077663831915957937,0.078414207103551736,0.079164582291145535,0.079914957478739335,0.080665332666333134,0.081415707853926933,0.082166083041520732,0.082916458229114531,0.083666833416708331,0.08441720860430213,0.085167583791895929,0.085917958979489728,0.086668334167083527,0.087418709354677326,0.088169084542271126,0.088919459729864925,0.089669834917458724,0.090420210105052523,0.091170585292646322,0.091920960480240121,0.092671335667833921,0.09342171085542772,0.094172086043021519,0.094922461230615318,0.095672836418209117,0.096423211605802917,0.097173586793396716,0.097923961980990515,0.098674337168584314,0.099424712356178113,0.10017508754377191,0.10092546273136571,0.10167583791895951,0.10242621310655331,0.10317658829414711,0.10392696348174091,0.10467733866933471,0.10542771385692851,0.10617808904452231,0.1069284642321161,0.1076788394197099,0.1084292146073037,0.1091795897948975,0.10992996498249119,0.11068034017008499,0.11143071535767879,0.11218109054527259,0.11293146573286639,0.11368184092046019,0.11443221610805399,0.11518259129564778,0.11593296648324158,0.11668334167083538,0.11743371685842918,0.11818409204602298,0.11893446723361678,0.11968484242121058,0.12043521760880438,0.12118559279639818,0.12193596798399198,0.12268634317158578,0.12343671835917958,0.12418709354677337,0.12493746873436717,0.12568784392196097,0.12643821910955477,0.12718859429714857,0.12793896948474237,0.12868934467233617,0.12943971985992997,0.13019009504752377,0.13094047023511757,0.13169084542271137,0.13244122061030517,0.13319159579789897,0.13394197098549276,0.13469234617308656,0.13544272136068036,0.13619309654827416,0.13694347173586796,0.13769384692346176,0.13844422211105556,0.13919459729864936,0.13994497248624316,0.14069534767383696,0.14144572286143076,0.14219609804902456,0.14294647323661835,0.14369684842421215,0.14444722361180595,0.14519759879939975,0.14594797398699355,0.14669834917458724,0.14744872436218104,0.14819909954977484,0.14894947473736864,0.14969984992496244,0.15045022511255624,0.15120060030015003,0.15195097548774383,0.15270135067533763,0.15345172586293143,0.15420210105052523,0.15495247623811903,0.15570285142571283,0.15645322661330663,0.15720360180090043,0.15795397698849423,0.15870435217608803,0.15945472736368183,0.16020510255127562,0.16095547773886942,0.16170585292646322,0.16245622811405702,0.16320660330165082,0.16395697848924462,0.16470735367683842,0.16545772886443222,0.16620810405202602,0.16695847923961982,0.16770885442721362,0.16845922961480742,0.16920960480240121,0.16995997998999501,0.17071035517758881,0.17146073036518261,0.17221110555277641,0.17296148074037021,0.17371185592796401,0.17446223111555781,0.17521260630315161,0.17596298149074541,0.17671335667833921,0.17746373186593301,0.1782141070535268,0.1789644822411206,0.1797148574287144,0.1804652326163082,0.181215607803902,0.1819659829914958,0.1827163581790896,0.18346673336668329,0.18421710855427709,0.18496748374187089,0.18571785892946469,0.18646823411705848,0.18721860930465228,0.18796898449224608,0.18871935967983988,0.18946973486743368,0.19022011005502748,0.19097048524262128,0.19172086043021508,0.19247123561780888,0.19322161080540268,0.19397198599299648,0.19472236118059028,0.19547273636818407,0.19622311155577787,0.19697348674337167,0.19772386193096547,0.19847423711855927,0.19922461230615307,0.19997498749374687,0.20072536268134067,0.20147573786893447,0.20222611305652827,0.20297648824412207,0.20372686343171587,0.20447723861930966,0.20522761380690346,0.20597798899449726,0.20672836418209106,0.20747873936968486,0.20822911455727866,0.20897948974487246,0.20972986493246626,0.21048024012006006,0.21123061530765386,0.21198099049524766,0.21273136568284146,0.21348174087043525,0.21423211605802905,0.21498249124562285,0.21573286643321665,0.21648324162081045,0.21723361680840425,0.21798399199599805,0.21873436718359185,0.21948474237118565,0.22023511755877934,0.22098549274637314,0.22173586793396693,0.22248624312156073,0.22323661830915453,0.22398699349674833,0.22473736868434213,0.22548774387193593,0.22623811905952973,0.22698849424712353,0.22773886943471733,0.22848924462231113,0.22923961980990493,0.22998999499749873,0.23074037018509252,0.23149074537268632,0.23224112056028012,0.23299149574787392,0.23374187093546772,0.23449224612306152,0.23524262131065532,0.23599299649824912,0.23674337168584292,0.23749374687343672,0.23824412206103052,0.23899449724862432,0.23974487243621811,0.24049524762381191,0.24124562281140571,0.24199599799899951,0.24274637318659331,0.24349674837418711,0.24424712356178091,0.24499749874937471,0.24574787393696851,0.24649824912456231,0.24724862431215611,0.24799899949974991,0.24874937468734371,0.2494997498749375,0.2502501250625313,0.25100050025012499,0.2517508754377189,0.25250125062531259,0.2532516258129065,0.25400200100050019,0.2547523761880941,0.25550275137568779,0.2562531265632817,0.25700350175087538,0.2577538769384693,0.25850425212606298,0.25925462731365689,0.26000500250125058,0.26075537768884449,0.26150575287643818,0.26225612806403209,0.26300650325162578,0.26375687843921969,0.26450725362681338,0.26525762881440729,0.26600800400200098,0.26675837918959489,0.26750875437718857,0.26825912956478248,0.26900950475237617,0.26975987993997008,0.27051025512756377,0.27126063031515768,0.27201100550275137,0.27276138069034528,0.27351175587793897,0.27426213106553288,0.27501250625312657,0.27576288144072025,0.27651325662831416,0.27726363181590785,0.27801400700350176,0.27876438219109545,0.27951475737868936,0.28026513256628305,0.28101550775387696,0.28176588294147065,0.28251625812906456,0.28326663331665825,0.28401700850425216,0.28476738369184584,0.28551775887943975,0.28626813406703344,0.28701850925462735,0.28776888444222104,0.28851925962981495,0.28926963481740864,0.29002001000500255,0.29077038519259624,0.29152076038019015,0.29227113556778384,0.29302151075537775,0.29377188594297143,0.29452226113056534,0.29527263631815903,0.29602301150575294,0.29677338669334663,0.29752376188094054,0.29827413706853423,0.29902451225612814,0.29977488744372183,0.30052526263131574,0.30127563781890943,0.30202601300650334,0.30277638819409702,0.30352676338169093,0.30427713856928462,0.30502751375687853,0.30577788894447222,0.30652826413206613,0.30727863931965982,0.30802901450725373,0.30877938969484742,0.30952976488244133,0.31028014007003502,0.31103051525762893,0.31178089044522261,0.3125312656328163,0.31328164082041021,0.3140320160080039,0.31478239119559781,0.3155327663831915,0.31628314157078541,0.3170335167583791,0.31778389194597301,0.3185342671335667,0.31928464232116061,0.32003501750875429,0.3207853926963482,0.32153576788394189,0.3222861430715358,0.32303651825912949,0.3237868934467234,0.32453726863431709,0.325287643821911,0.32603801900950469,0.3267883941970986,0.32753876938469229,0.3282891445722862,0.32903951975987988,0.32978989494747379,0.33054027013506748,0.33129064532266139,0.33204102051025508,0.33279139569784899,0.33354177088544268,0.33429214607303659,0.33504252126063028,0.33579289644822419,0.33654327163581788,0.33729364682341179,0.33804402201100547,0.33879439719859938,0.33954477238619307,0.34029514757378698,0.34104552276138067,0.34179589794897458,0.34254627313656827,0.34329664832416218,0.34404702351175587,0.34479739869934978,0.34554777388694347,0.34629814907453738,0.34704852426213106,0.34779889944972475,0.34854927463731866,0.34929964982491235,0.35005002501250626,0.35080040020009995,0.35155077538769386,0.35230115057528755,0.35305152576288146,0.35380190095047515,0.35455227613806906,0.35530265132566274,0.35605302651325665,0.35680340170085034,0.35755377688844425,0.35830415207603794,0.35905452726363185,0.35980490245122554,0.36055527763881945,0.36130565282641314,0.36205602801400705,0.36280640320160074,0.36355677838919465,0.36430715357678833,0.36505752876438224,0.36580790395197593,0.36655827913956984,0.36730865432716353,0.36805902951475744,0.36880940470235113,0.36955977988994504,0.37031015507753873,0.37106053026513264,0.37181090545272633,0.37256128064032024,0.37331165582791392,0.37406203101550783,0.37481240620310152,0.37556278139069543,0.37631315657828912,0.37706353176588303,0.37781390695347672,0.37856428214107063,0.37931465732866432,0.38006503251625823,0.38081540770385192,0.38156578289144583,0.38231615807903951,0.38306653326663342,0.38381690845422711,0.3845672836418208,0.38531765882941471,0.3860680340170084,0.38681840920460231,0.387568784392196,0.38831915957978991,0.3890695347673836,0.38981990995497751,0.39057028514257119,0.3913206603301651,0.39207103551775879,0.3928214107053527,0.39357178589294639,0.3943221610805403,0.39507253626813399,0.3958229114557279,0.39657328664332159,0.3973236618309155,0.39807403701850919,0.3988244122061031,0.39957478739369678,0.40032516258129069,0.40107553776888438,0.40182591295647829,0.40257628814407198,0.40332666333166589,0.40407703851925958,0.40482741370685349,0.40557778889444718,0.40632816408204109,0.40707853926963478,0.40782891445722869,0.40857928964482237,0.40932966483241628,0.41008004002000997,0.41083041520760388,0.41158079039519757,0.41233116558279148,0.41308154077038517,0.41383191595797908,0.41458229114557277,0.41533266633316668,0.41608304152076037,0.41683341670835428,0.41758379189594796,0.41833416708354187,0.41908454227113556,0.41983491745872947,0.42058529264632316,0.42133566783391685,0.42208604302151076,0.42283641820910445,0.42358679339669836,0.42433716858429205,0.42508754377188596,0.42583791895947964,0.42658829414707355,0.42733866933466724,0.42808904452226115,0.42883941970985484,0.42958979489744875,0.43034017008504244,0.43109054527263635,0.43184092046023004,0.43259129564782395,0.43334167083541764,0.43409204602301155,0.43484242121060523,0.43559279639819914,0.43634317158579283,0.43709354677338674,0.43784392196098043,0.43859429714857434,0.43934467233616803,0.44009504752376194,0.44084542271135563,0.44159579789894954,0.44234617308654323,0.44309654827413714,0.44384692346173082,0.44459729864932473,0.44534767383691842,0.44609804902451233,0.44684842421210602,0.44759879939969993,0.44834917458729362,0.44909954977488753,0.44984992496248122,0.45060030015007513,0.45135067533766882,0.45210105052526273,0.45285142571285641,0.45360180090045032,0.45435217608804401,0.45510255127563792,0.45585292646323161,0.45660330165082552,0.45735367683841921,0.4581040520260129,0.45885442721360681,0.4596048024012005,0.46035517758879441,0.46110555277638809,0.461855927963982,0.46260630315157569,0.4633566783391696,0.46410705352676329,0.4648574287143572,0.46560780390195089,0.4663581790895448,0.46710855427713849,0.4678589294647324,0.46860930465232609,0.46935967983992,0.47011005502751368,0.47086043021510759,0.47161080540270128,0.47236118059029519,0.47311155577788888,0.47386193096548279,0.47461230615307648,0.47536268134067039,0.47611305652826408,0.47686343171585799,0.47761380690345168,0.47836418209104559,0.47911455727863927,0.47986493246623318,0.48061530765382687,0.48136568284142078,0.48211605802901447,0.48286643321660838,0.48361680840420207,0.48436718359179598,0.48511755877938967,0.48586793396698358,0.48661830915457727,0.48736868434217118,0.48811905952976486,0.48886943471735878,0.48961980990495246,0.49037018509254637,0.49112056028014006,0.49187093546773397,0.49262131065532766,0.49337168584292157,0.49412206103051526,0.49487243621810895,0.49562281140570286,0.49637318659329654,0.49712356178089045,0.49787393696848414,0.49862431215607805,0.49937468734367174,0.50012506253126565,0.50087543771885934,0.50162581290645325,0.50237618809404694,0.50312656328164085,0.50387693846923454,0.50462731365682845,0.50537768884442213,0.50612806403201605,0.50687843921960973,0.50762881440720364,0.50837918959479733,0.50912956478239124,0.50987993996998493,0.51063031515757884,0.51138069034517253,0.51213106553276644,0.51288144072036013,0.51363181590795404,0.51438219109554773,0.51513256628314164,0.51588294147073532,0.51663331665832923,0.51738369184592292,0.51813406703351683,0.51888444222111052,0.51963481740870443,0.52038519259629812,0.52113556778389203,0.52188594297148572,0.52263631815907963,0.52338669334667332,0.52413706853426723,0.52488744372186091,0.52563781890945482,0.52638819409704851,0.52713856928464242,0.52788894447223611,0.52863931965983002,0.52938969484742371,0.53014007003501762,0.53089044522261131,0.531640820410205,0.53239119559779891,0.53314157078539259,0.5338919459729865,0.53464232116058019,0.5353926963481741,0.53614307153576779,0.5368934467233617,0.53764382191095539,0.5383941970985493,0.53914457228614299,0.5398949474737369,0.54064532266133059,0.5413956978489245,0.54214607303651818,0.54289644822411209,0.54364682341170578,0.54439719859929969,0.54514757378689338,0.54589794897448729,0.54664832416208098,0.54739869934967489,0.54814907453726858,0.54889944972486249,0.54964982491245618,0.55040020010005009,0.55115057528764377,0.55190095047523768,0.55265132566283137,0.55340170085042528,0.55415207603801897,0.55490245122561288,0.55565282641320657,0.55640320160080048,0.55715357678839417,0.55790395197598808,0.55865432716358177,0.55940470235117568,0.56015507753876936,0.56090545272636327,0.56165582791395696,0.56240620310155087,0.56315657828914456,0.56390695347673847,0.56465732866433216,0.56540770385192607,0.56615807903951976,0.56690845422711367,0.56765882941470736,0.56840920460230104,0.56915957978989495,0.56990995497748864,0.57066033016508255,0.57141070535267624,0.57216108054027015,0.57291145572786384,0.57366183091545775,0.57441220610305144,0.57516258129064535,0.57591295647823904,0.57666333166583295,0.57741370685342663,0.57816408204102054,0.57891445722861423,0.57966483241620814,0.58041520760380183,0.58116558279139574,0.58191595797898943,0.58266633316658334,0.58341670835417703,0.58416708354177094,0.58491745872936463,0.58566783391695854,0.58641820910455222,0.58716858429214613,0.58791895947973982,0.58866933466733373,0.58941970985492742,0.59017008504252133,0.59092046023011502,0.59167083541770893,0.59242121060530262,0.59317158579289653,0.59392196098049022,0.59467233616808413,0.59542271135567781,0.59617308654327172,0.59692346173086541,0.59767383691845932,0.59842421210605301,0.59917458729364692,0.59992496248124061,0.60067533766883452,0.60142571285642821,0.60217608804402212,0.60292646323161581,0.60367683841920972,0.6044272136068034,0.60517758879439709,0.605927963981991,0.60667833916958469,0.6074287143571786,0.60817908954477229,0.6089294647323662,0.60967983991995989,0.6104302151075538,0.61118059029514749,0.6119309654827414,0.61268134067033508,0.61343171585792899,0.61418209104552268,0.61493246623311659,0.61568284142071028,0.61643321660830419,0.61718359179589788,0.61793396698349179,0.61868434217108548,0.61943471735867939,0.62018509254627308,0.62093546773386699,0.62168584292146067,0.62243621810905458,0.62318659329664827,0.62393696848424218,0.62468734367183587,0.62543771885942978,0.62618809404702347,0.62693846923461738,0.62768884442221107,0.62843921960980498,0.62918959479739867,0.62993996998499258,0.63069034517258626,0.63144072036018017,0.63219109554777386,0.63294147073536777,0.63369184592296146,0.63444222111055537,0.63519259629814906,0.63594297148574297,0.63669334667333666,0.63744372186093057,0.63819409704852426,0.63894447223611817,0.63969484742371185,0.64044522261130554,0.64119559779889945,0.64194597298649314,0.64269634817408705,0.64344672336168074,0.64419709854927465,0.64494747373686834,0.64569784892446225,0.64644822411205594,0.64719859929964985,0.64794897448724353,0.64869934967483744,0.64944972486243113,0.65020010005002504,0.65095047523761873,0.65170085042521264,0.65245122561280633,0.65320160080040024,0.65395197598799393,0.65470235117558784,0.65545272636318153,0.65620310155077544,0.65695347673836912,0.65770385192596303,0.65845422711355672,0.65920460230115063,0.65995497748874432,0.66070535267633823,0.66145572786393192,0.66220610305152583,0.66295647823911952,0.66370685342671343,0.66445722861430712,0.66520760380190103,0.66595797898949471,0.66670835417708862,0.66745872936468231,0.66820910455227622,0.66895947973986991,0.66970985492746382,0.67046023011505751,0.67121060530265142,0.67196098049024511,0.67271135567783902,0.67346173086543271,0.67421210605302662,0.6749624812406203,0.67571285642821421,0.6764632316158079,0.67721360680340159,0.6779639819909955,0.67871435717858919,0.6794647323661831,0.68021510755377679,0.6809654827413707,0.68171585792896439,0.6824662331165583,0.68321660830415198,0.68396698349174589,0.68471735867933958,0.68546773386693349,0.68621810905452718,0.68696848424212109,0.68771885942971478,0.68846923461730869,0.68921960980490238,0.68996998499249629,0.69072036018008998,0.69147073536768389,0.69222111055527757,0.69297148574287148,0.69372186093046517,0.69447223611805908,0.69522261130565277,0.69597298649324668,0.69672336168084037,0.69747373686843428,0.69822411205602797,0.69897448724362188,0.69972486243121557,0.70047523761880948,0.70122561280640316,0.70197598799399707,0.70272636318159076,0.70347673836918467,0.70422711355677836,0.70497748874437227,0.70572786393196596,0.70647823911955987,0.70722861430715356,0.70797898949474747,0.70872936468234116,0.70947973986993507,0.71023011505752875,0.71098049024512266,0.71173086543271635,0.71248124062031026,0.71323161580790395,0.71398199099549764,0.71473236618309155,0.71548274137068524,0.71623311655827915,0.71698349174587284,0.71773386693346675,0.71848424212106043,0.71923461730865434,0.71998499249624803,0.72073536768384194,0.72148574287143563,0.72223611805902954,0.72298649324662323,0.72373686843421714,0.72448724362181083,0.72523761880940474,0.72598799399699843,0.72673836918459234,0.72748874437218602,0.72823911955977993,0.72898949474737362,0.72973986993496753,0.73049024512256122,0.73124062031015513,0.73199099549774882,0.73274137068534273,0.73349174587293642,0.73424212106053033,0.73499249624812402,0.73574287143571793,0.73649324662331161,0.73724362181090553,0.73799399699849921,0.73874437218609312,0.73949474737368681,0.74024512256128072,0.74099549774887441,0.74174587293646832,0.74249624812406201,0.74324662331165592,0.74399699849924961,0.74474737368684352,0.7454977488744372,0.74624812406203112,0.7469984992496248,0.74774887443721871,0.7484992496248124,0.74924962481240631,0.75],"expected":[-0.5,-0.49925018703189333,-0.49850149514162295,-0.49775391931565915,-0.49700745457772916,-0.49626209598843074,-0.49551783864485077,-0.49477467768018935,-0.4940326082633878,-0.49329162559876299,-0.49255172492564525,-0.49181290151802182,-0.49107515068418439,-0.49033846776638185,-0.48960284814047678,-0.48886828721560721,-0.48813478043385211,-0.48740232326990152,-0.48667091123073064,-0.48594053985527885,-0.48521120471413137,-0.48448290140920663,-0.48375562557344648,-0.48302937287051073,-0.48230413899447561,-0.48157991966953589,-0.48085671064971025,-0.48013450771855182,-0.47941330668886062,-0.47869310340240073,-0.47797389372962018,-0.47725567356937515,-0.47653843884865676,-0.47582218552232175,-0.47510690957282636,-0.47439260700996333,-0.4736792738706021,-0.47296690621843251,-0.47225550014371137,-0.47154505176301165,-0.4708355572189758,-0.47012701268007101,-0.4694194143403479,-0.46871275841920196,-0.46800704116113806,-0.46730225883553733,-0.4665984077364273,-0.4658954841822544,-0.46519348451565939,-0.46449240510325529,-0.46379224233540794,-0.46309299262601944,-0.46239465241231326,-0.46169721815462328,-0.46100068633618374,-0.46030505346292261,-0.45961031606325731,-0.45891647068789237,-0.45822351390961952,-0.45753144232312043,-0.45684025254477123,-0.45614994121244995,-0.45546050498534502,-0.45477194054376729,-0.45408424458896307,-0.45339741384293025,-0.45271144504823541,-0.45202633496783406,-0.45134208038489204,-0.45065867810260984,-0.44997612494404771,-0.44929441775195372,-0.4486135533885936,-0.44793352873558134,-0.44725434069371389,-0.44657598618280514,-0.44589846214152362,-0.44522176552723136,-0.44454589331582389,-0.44387084250157333,-0.44319661009697175,-0.44252319313257749,-0.44185058865686211,-0.44117879373605989,-0.44050780545401802,-0.43983762091204959,-0.43916823722878667,-0.43849965154003656,-0.43783186099863847,-0.43716486277432193,-0.43649865405356686,-0.43583323203946556,-0.43516859395158514,-0.43450473702583231,-0.43384165851431911,-0.43317935568523025,-0.43251782582269199,-0.43185706622664194,-0.43119707421270054,-0.4305378471120439,-0.42987938227127787,-0.42922167705231351,-0.42856472883224361,-0.42790853500322079,-0.4272530929723366,-0.4265984001615023,-0.42594445400733,-0.42529125196101608,-0.42463879148822514,-0.42398707006897501,-0.42333608519752364,-0.42268583438225643,-0.42203631514557488,-0.42138752502378668,-0.42073946156699671,-0.42009212233899884,-0.41944550491716931,-0.41879960689236084,-0.41815442586879797,-0.41750995946397351,-0.41686620530854523,-0.41622316104623563,-0.41558082433372945,-0.41493919284057579,-0.41429826424908822,-0.41365803625424818,-0.41301850656360695,-0.41237967289719107,-0.41174153298740701,-0.4111040845789472,-0.41046732542869729,-0.40983125330564363,-0.40919586599078273,-0.40856116127703035,-0.40792713696913219,-0.40729379088357565,-0.40666112084850159,-0.40602912470361802,-0.4053978003001133,-0.40476714550057158,-0.40413715817888801,-0.40350783622018521,-0.4028791775207306,-0.40225117998785398,-0.40162384153986658,-0.40099716010598035,-0.40037113362622845,-0.39974576005138607,-0.39912103734289217,-0.39849696347277203,-0.39787353642356033,-0.3972507541882252,-0.39662861477009281,-0.39600711618277246,-0.39538625645008302,-0.39476603360597934,-0.39414644569447943,-0.39352749076959292,-0.39290916689524957,-0.39229147214522841,-0.391674404603088,-0.39105796236209694,-0.39044214352516537,-0.38982694620477631,-0.38921236852291885,-0.38859840861102057,-0.38798506460988197,-0.38737233466961019,-0.3867602169495542,-0.3861487096182401,-0.38553781085330774,-0.38492751884144638,-0.38431783177833301,-0.38370874786856912,-0.38310026532561986,-0.38249238237175198,-0.38188509723797448,-0.38127840816397718,-0.38067231339807212,-0.38006681119713426,-0.37946189982654294,-0.37885757756012417,-0.37825384268009266,-0.37765069347699531,-0.37704812824965472,-0.37644614530511289,-0.37584474295857589,-0.375243919533359,-0.37464367336083204,-0.37404400278036509,-0.37344490613927539,-0.37284638179277385,-0.37224842810391223,-0.3716510434435315,-0.37105422619020911,-0.37045797473020881,-0.36986228745742872,-0.36926716277335142,-0.36867259908699368,-0.36807859481485705,-0.36748514838087842,-0.36689225821638133,-0.36629992276002765,-0.36570814045776945,-0.36511690976280164,-0.36452622913551469,-0.36393609704344787,-0.36334651196124279,-0.36275747237059752,-0.36216897676022097,-0.36158102362578742,-0.36099361146989212,-0.3604067388020063,-0.35982040413843336,-0.35923460600226498,-0.35864934292333783,-0.35806461343819018,-0.35748041609002001,-0.3568967494286413,-0.35631361201044381,-0.35573100239834965,-0.35514891916177338,-0.35456736087657997,-0.35398632612504505,-0.35340581349581363,-0.35282582158386122,-0.35224634899045298,-0.35166739432310529,-0.35108895619554625,-0.35051103322767718,-0.34993362404553391,-0.349356727281249,-0.34878034157301357,-0.34820446556504037,-0.34762909790752583,-0.34705423725661388,-0.34647988227435872,-0.34590603162868883,-0.3453326839933708,-0.34475983804797389,-0.34418749247783387,-0.3436156459740185,-0.34304429723329227,-0.34247344495808185,-0.34190308785644158,-0.34133322464201954,-0.34076385403402371,-0.34019497475718796,-0.33962658554173941,-0.33905868512336479,-0.33849127224317799,-0.33792434564768725,-0.33735790408876315,-0.33679194632360604,-0.33622647111471488,-0.33566147722985518,-0.33509696344202788,-0.33453292852943817,-0.33396937127546483,-0.3334062904686293,-0.33284368490256555,-0.33228155337598986,-0.33171989469267094,-0.33115870766139999,-0.33059799109596155,-0.33003774381510398,-0.32947796464251083,-0.32891865240677132,-0.32835980594135261,-0.32780142408457053,-0.32724350567956229,-0.32668604957425762,-0.32612905462135211,-0.32557251967827805,-0.32501644360717918,-0.32446082527488151,-0.32390566355286787,-0.32335095731725022,-0.32279670544874378,-0.32224290683264012,-0.32168956035878149,-0.32113666492153453,-0.3205842194197645,-0.32003222275680998,-0.31948067384045709,-0.31892957158291468,-0.31837891490078896,-0.31782870271505875,-0.31727893395105089,-0.31672960753841578,-0.3161807224111029,-0.3156322775073368,-0.31508427176959303,-0.31453670414457457,-0.31398957358318796,-0.31344287904051998,-0.31289661947581432,-0.31235079385244857,-0.31180540113791111,-0.31126044030377831,-0.31071591032569229,-0.31017181018333784,-0.30962813886042062,-0.30908489534464478,-0.30854207862769101,-0.3079996877051947,-0.30745772157672435,-0.30691617924575987,-0.30637505971967138,-0.30583436200969782,-0.30529408513092604,-0.30475422810226976,-0.30421478994644857,-0.30367576968996807,-0.30313716636309818,-0.30259897899985411,-0.30206120663797464,-0.30152384831890389,-0.30098690308776943,-0.30045036999336416,-0.29991424808812522,-0.29937853642811602,-0.29884323407300517,-0.29830834008604867,-0.29777385353406971,-0.29723977348744046,-0.29670609902006279,-0.29617282920934945,-0.29563996313620594,-0.29510749988501145,-0.29457543854360091,-0.29404377820324668,-0.29351251795864031,-0.29298165690787459,-0.29245119415242588,-0.29192112879713611,-0.29139145995019528,-0.29086218672312392,-0.29033330823075587,-0.28980482359122073,-0.28927673192592679,-0.28874903235954419,-0.28822172401998769,-0.2876948060384002,-0.28716827754913565,-0.28664213768974278,-0.28611638560094843,-0.28559102042664136,-0.28506604131385582,-0.28454144741275533,-0.28401723787661692,-0.28349341186181498,-0.28296996852780532,-0.28244690703710967,-0.28192422655530003,-0.28140192625098287,-0.280880005295784,-0.28035846286433308,-0.27983729813424851,-0.27931651028612214,-0.2787960985035044,-0.27827606197288934,-0.27775639988369955,-0.2772371114282719,-0.27671819580184237,-0.27619965220253184,-0.27568147983133162,-0.27516367789208884,-0.27464624559149264,-0.27412918213905924,-0.27361248674711869,-0.27309615863080028,-0.272580197008019,-0.2720646010994614,-0.27154937012857211,-0.27103450332154,-0.27051999990728487,-0.27000585911744368,-0.26949208018635745,-0.26897866235105766,-0.26846560485125326,-0.26795290692931745,-0.2674405678302747,-0.26692858680178766,-0.26641696309414437,-0.26590569596024533,-0.26539478465559097,-0.26488422843826875,-0.26437402656894093,-0.2638641783108317,-0.26335468292971498,-0.26284553969390201,-0.26233674787422923,-0.26182830674404606,-0.26132021557920243,-0.26081247365803734,-0.26030508026136639,-0.25979803467247037,-0.25929133617708289,-0.25878498406337924,-0.25827897762196417,-0.25777331614586063,-0.25726799893049823,-0.25676302527370176,-0.25625839447567955,-0.25575410583901254,-0.25525015866864292,-0.25474655227186283,-0.2542432859583032,-0.25374035903992309,-0.25323777083099824,-0.2527355206481105,-0.25223360781013682,-0.25173203163823848,-0.25123079145585059,-0.25072988658867107,-0.2502293163646504,-0.24972908011398087,-0.24922917716908638,-0.24872960686461168,-0.24823036853741243,-0.24773146152654471,-0.24723288517325473,-0.24673463882096894,-0.24623672181528378,-0.2457391335039556,-0.24524187323689089,-0.24474494036613614,-0.24424833424586812,-0.24375205423238414,-0.24325609968409218,-0.24276046996150125,-0.24226516442721188,-0.24177018244590642,-0.24127552338433955,-0.240781186611329,-0.24028717149774584,-0.23979347741650545,-0.23930010374255797,-0.23880704985287937,-0.23831431512646203,-0.23782189894430553,-0.23732980068940795,-0.2368380197467565,-0.23634655550331873,-0.23585540734803362,-0.23536457467180255,-0.23487405686748064,-0.23438385332986805,-0.23389396345570099,-0.23340438664364338,-0.23291512229427802,-0.23242616981009823,-0.23193752859549899,-0.23144919805676881,-0.23096117760208129,-0.23047346664148652,-0.22998606458690299,-0.22949897085210913,-0.22901218485273531,-0.22852570600625546,-0.22803953373197902,-0.2275536674510428,-0.22706810658640306,-0.2265828505628274,-0.22609789880688683,-0.22561325074694794,-0.22512890581316483,-0.22464486343747167,-0.2241611230535745,-0.2236776840969438,-0.2231945460048067,-0.22271170821613928,-0.22222917017165916,-0.22174693131381756,-0.22126499108679237,-0.22078334893648011,-0.22030200431048874,-0.21982095665813037,-0.21934020543041369,-0.21885975008003683,-0.21837959006138005,-0.21789972483049841,-0.21742015384511473,-0.21694087656461233,-0.216461892450028,-0.21598320096404486,-0.21550480157098534,-0.21502669373680425,-0.21454887692908181,-0.21407135061701657,-0.21359411427141881,-0.21311716736470349,-0.21264050937088344,-0.21216413976556278,-0.21168805802593002,-0.21121226363075138,-0.21073675606036416,-0.21026153479667023,-0.20978659932312926,-0.20931194912475221,-0.20883758368809494,-0.20836350250125152,-0.20788970505384805,-0.20741619083703608,-0.20694295934348617,-0.20647001006738175,-0.20599734250441265,-0.20552495615176883,-0.20505285050813435,-0.20458102507368081,-0.20410947935006149,-0.20363821284040506,-0.20316722504930948,-0.20269651548283596,-0.20222608364850297,-0.20175592905527995,-0.20128605121358184,-0.20081644963526257,-0.20034712383360953,-0.19987807332333757,-0.19940929762058301,-0.19894079624289818,-0.19847256870924512,-0.19800461453999027,-0.19753693325689853,-0.19706952438312747,-0.19660238744322189,-0.19613552196310804,-0.19566892747008802,-0.19520260349283416,-0.19473654956138353,-0.19427076520713241,-0.1938052499628308,-0.19334000336257684,-0.19287502494181155,-0.19241031423731325,-0.1919458707871923,-0.19148169413088564,-0.1910177838091516,-0.19055413936406451,-0.19009076033900926,-0.18962764627867645,-0.18916479672905684,-0.18870221123743625,-0.18823988935239042,-0.18777783062377992,-0.1873160346027449,-0.18685450084170008,-0.18639322889432977,-0.1859322183155826,-0.18547146866166681,-0.185010979490045,-0.18455075035942936,-0.1840907808297767,-0.18363107046228341,-0.18317161881938071,-0.18271242546472977,-0.18225348996321686,-0.18179481188094848,-0.18133639078524674,-0.18087822624464434,-0.18042031782888013,-0.17996266510889417,-0.17950526765682312,-0.1790481250459956,-0.17859123685092754,-0.1781346026473174,-0.17767822201204189,-0.17722209452315113,-0.17676621975986417,-0.17631059730256449,-0.17585522673279552,-0.17540010763325611,-0.17494523958779595,-0.17449062218141145,-0.17403625500024095,-0.17358213763156063,-0.17312826966377995,-0.17267465068643739,-0.17222128029019604,-0.17176815806683937,-0.17131528360926687,-0.17086265651148988,-0.17041027636862727,-0.16995814277690116,-0.16950625533363287,-0.16905461363723862,-0.16860321728722538,-0.16815206588418674,-0.16770115902979885,-0.16725049632681621,-0.16680007737906757,-0.16634990179145209,-0.16589996916993499,-0.16545027912154378,-0.16500083125436407,-0.16455162517753572,-0.1641026605012488,-0.16365393683673962,-0.16320545379628693,-0.16275721099320783,-0.16230920804185406,-0.16186144455760806,-0.161413920156879,-0.16096663445709911,-0.16051958707671987,-0.16007277763520802,-0.15962620575304201,-0.15917987105170806,-0.15873377315369652,-0.15828791168249823,-0.1578422862626005,-0.1573968965194838,-0.15695174207961779,-0.15650682257045784,-0.15606213762044133,-0.15561768685898406,-0.1551734699164766,-0.15472948642428069,-0.15428573601472578,-0.15384221832110537,-0.15339893297767357,-0.15295587961964141,-0.15251305788317349,-0.15207046740538455,-0.15162810782433578,-0.15118597877903159,-0.15074407990941596,-0.15030241085636931,-0.14986097126170472,-0.14941976076816488,-0.14897877901941856,-0.14853802566005719,-0.14809750033559166,-0.14765720269244897,-0.14721713237796877,-0.1467772890404003,-0.14633767232889885,-0.1458982818935228,-0.14545911738523004,-0.145020178455875,-0.14458146475820527,-0.14414297594585845,-0.14370471167335902,-0.14326667159611503,-0.14282885537041506,-0.14239126265342505,-0.14195389310318507,-0.14151674637860631,-0.14107982213946799,-0.14064312004641413,-0.14020663976095071,-0.13977038094544234,-0.13933434326310942,-0.13889852637802497,-0.13846292995511172,-0.138027553660139,-0.13759239715971988,-0.13715746012130803,-0.13672274221319489,-0.13628824310450668,-0.1358539624652014,-0.13541989996606599,-0.13498605527871335,-0.13455242807557954,-0.13411901802992071,-0.13368582481581057,-0.13325284810813698,-0.13282008758259967,-0.13238754291570715,-0.13195521378477384,-0.13152309986791733,-0.13109120084405562,-0.13065951639290427,-0.13022804619497363,-0.12979678993156624,-0.12936574728477371,-0.1289349179374745,-0.1285043015733307,-0.12807389787678575,-0.12764370653306129,-0.12721372722815497,-0.12678395964883737,-0.12635440348264956,-0.12592505841790039,-0.12549592414366376,-0.12506700034977622,-0.12463828672683414,-0.1242097829661911,-0.12378148875995557,-0.12335340380098796,-0.12292552778289831,-0.12249786040004365,-0.12207040134752545,-0.12164315032118703,-0.12121610701761115,-0.12078927113411744,-0.12036264236875985,-0.11993622042032426,-0.1195100049883259,-0.11908399577300693,-0.11865819247533396,-0.11823259479699565,-0.11780720244040017,-0.11738201510867294,-0.11695703250565398,-0.1165322543358957,-0.11610768030466055,-0.11568331011791826,-0.1152591434823439,-0.11483518010531532,-0.11441141969491084,-0.11398786195990682,-0.11356450660977538,-0.11314135335468214,-0.11271840190548381,-0.11229565197372592,-0.11187310327164049,-0.11145075551214387,-0.11102860840883426,-0.11060666167598965,-0.11018491502856542,-0.10976336818219216,-0.10934202085317345,-0.10892087275848351,-0.10849992361576517,-0.10807917314332752,-0.10765862106014375,-0.10723826708584897,-0.10681811094073804,-0.10639815234576337,-0.10597839102253276,-0.10555882669330727,-0.10513945908099907,-0.10472028790916929,-0.10430131290202591,-0.10388253378442158,-0.10346395028185167,-0.103045562120452,-0.10262736902699683,-0.10220937072889677,-0.10179156695419669,-0.10137395743157371,-0.10095654189033502,-0.10053932006041602,-0.10012229167237811,-0.099705456457406763,-0.099288814147309418,-0.098872364474513572,-0.098456107172064683,-0.098040041973624245,-0.097624168613467732,-0.097208486826482671,-0.096792996348166641,-0.096377696914625333,-0.095962588262570633,-0.095547670129318418,-0.095132942252787053,-0.094718404371495132,-0.09430405622455966,-0.093889897551694121,-0.093475928093206567,-0.093062147589997771,-0.092648555783559253,-0.092235152415971439,-0.091821937229901812,-0.091408909968602986,-0.09099607037591087,-0.090583418196242813,-0.09017095317459578,-0.089758675056544474,-0.089346583588239548,-0.088934678516405727,-0.088522959588340042,-0.088111426551910024,-0.087700079155551836,-0.087288917148268558,-0.086877940279628349,-0.086467148299762681,-0.086056540959364616,-0.085646118009686911,-0.085235879202540443,-0.084825824290292284,-0.084415953025864063,-0.084006265162730187,-0.083596760454916125,-0.083187438656996709,-0.082778299524094351,-0.082369342811877411,-0.081960568276558413,-0.081551975674892432,-0.081143564764175377,-0.080735335302242264,-0.08032728704746557,-0.079919419758753649,-0.079511733195548884,-0.079104227117826234,-0.078696901286091428,-0.078289755461379409,-0.077882789405252686,-0.07747600287979968,-0.077069395647633127,-0.07666296747188843,-0.076256718116222089,-0.075850647344810146,-0.075444754922346327,-0.075039040614040819,-0.074633504185618441,-0.074228145403317167,-0.073822964033886523,-0.073417959844586003,-0.073013132603183512,-0.072608482077953854,-0.072204008037677153,-0.071799710251637311,-0.071395588489620493,-0.070991642521913562,-0.070587872119302578,-0.070184277053071314,-0.069780857094999676,-0.0693776120173622,-0.068974541592926666,-0.068571645594952477,-0.068168923797189182,-0.067766375973875081,-0.067364001899735682,-0.066961801349982225,-0.066559774100310248,-0.066157919926898109,-0.065756238606405545,-0.065354729915972229,-0.064953393633216255,-0.064552229536232839,-0.064151237403592742,-0.063750417014340963,-0.06334976814799527,-0.062949290584544709,-0.062548984104448355,-0.062148848488633765,-0.061748883518495667,-0.0613490889758945,-0.060949464643155093,-0.060550010303065241,-0.060150725738874332,-0.059751610734291971,-0.059352665073486632,-0.058953888541084291,-0.058555280922167038,-0.058156842002271794,-0.057758571567388887,-0.057360469403960751,-0.056962535298880602,-0.056564769039491078,-0.05616717041358299,-0.055769739209393744,-0.055372475215606426,-0.054975378221348195,-0.054578448016189079,-0.054181684390140664,-0.05378508713365477,-0.053388656037622217,-0.052992390893371495,-0.05259629149266748,-0.052200357627710178,-0.051804589091133446,-0.051408985676003736,-0.051013547175818796,-0.050618273384506474,-0.050223164096423398,-0.049828219106353759,-0.049433438209508081,-0.049038821201521983,-0.048644367878454886,-0.048250078036788865,-0.047855951473427381,-0.047461987985694044,-0.047068187371331442,-0.046674549428499905,-0.046281073955776277,-0.04588776075215277,-0.045494609617035706,-0.045101620350244349,-0.044708792752009743,-0.044316126622973476,-0.043923621764186523,-0.043531277977108096,-0.043139095063604416,-0.042747072825947599,-0.042355211066814467,-0.041963509589285394,-0.041571968196843133,-0.041180586693371719,-0.040789364883155259,-0.040398302570876822,-0.040007399561617314,-0.039616655660854316,-0.039226070674460968,-0.038835644408704857,-0.038445376670246847,-0.038055267266140044,-0.037665316003828608,-0.037275522691146666,-0.036885887136317297,-0.036496409147951152,-0.036107088535045746,-0.035717925106984086,-0.035328918673533709,-0.03494006904484552,-0.034551376031452752,-0.034162839444269913,-0.033774459094591654,-0.033386234794091738,-0.032998166354821987,-0.032610253589211165,-0.032222496310063971,-0.031834894330559999,-0.031447447464252598,-0.031060155525067936,-0.030673018327303892,-0.030286035685629032,-0.02989920741508157,-0.029512533331068347,-0.029126013249363793,-0.028739646986108917,-0.028353434357810261,-0.027967375181338922,-0.027581469273929494,-0.027195716453179097,-0.026810116537046343,-0.026424669343850352,-0.026039374692269749,-0.025654232401341664,-0.025269242290460743,-0.024884404179378167,-0.024499717888200649,-0.024115183237389475,-0.023730800047759511,-0.023346568140478238,-0.022962487337064772,-0.022578557459388904,-0.02219477832967014,-0.021811149770476726,-0.021427671604724703,-0.021044343655676961,-0.020661165746942253,-0.020278137702474299,-0.019895259346570802,-0.019512530503872524,-0.01912995099936235,-0.018747520658364346,-0.018365239306542897,-0.017983106769901544,-0.017601122874782396,-0.017219287447865005,-0.01683760031616547,-0.016456061307035561,-0.016074670248161772,-0.015693426967564442,-0.015312331293596838,-0.014931383054944243,-0.014550582080623082,-0.01416992819998,-0.013789421242690995,-0.01340906103876051,-0.013028847418520553,-0.012648780212629817,-0.012268859252072795,-0.011889084368158909,-0.011509455392521632,-0.011129972157117616,-0.010750634494225829,-0.010371442236446687,-0.0099923952167011876,-0.0096134932682300639,-0.0092347362245929158,-0.0088561239196673636,-0.0084776561876481991,-0.0080993328630465256,-0.0077211537806889368,-0.007343118775716655,-0.0069652276835847019,-0.0065874803400610606,-0.006209876581225844,-0.0058324162434704651,-0.0054550991634968078,-0.0050779251783164064,-0.0047008941252496203,-0.0043240058419248169,-0.0039472601662775587,-0.0035706569365497836,-0.0031941959912890022,-0.0028178771693474843,-0.0024417003098814575,-0.0020656652523503038,-0.0016897718365157612,-0.0013140199024411264,-0.00093840929049046065,-0.0005629398413277987,-0.00018761139591636088,0.00018757620448217805,0.00056262311830869395,0.00093752950370706064,0.0013122955185251501,0.0016869213203155528,0.0020614070663363491,0.0024357529135518815,0.0028099590186335195,0.0031840255379604267,0.003557952627620323,0.0039317404434102438,0.0043053891408372973,0.0046788988751194204,0.0050522698011861277,0.0054255020736792671,0.0057985958469537616,0.0061715512750783541,0.0065443685118363572,0.0069170477107263822,0.0072895890249630828,0.0076619926074778903,0.0080342586109197443,0.008406387187655821,0.008778378489772266,0.0091502326690749095,0.0095219498770900048,0.0098935302650649329,0.010264973983968933,0.010636281184493801,0.011007452017054629,0.011378486631790492,0.011749385178565165,0.012120147806967834,0.012490774666313795,0.012861265905645153,0.013231621673731526,0.013601842119070744,0.013971927389889534,0.014341877634144223,0.014711692999521422,0.015081373633438715,0.015450919683045346,0.015820331295222898,0.016189608616585985,0.016558751793482918,0.016927760971996383,0.017296636297944125,0.017665377916879613,0.018033985974092715,0.018402460614610306,0.018770801983197149,0.01913901022435624,0.019507085482329687,0.019875027901099306,0.020242837624387288,0.020610514795656849,0.020978059558112876,0.021345472054702597,0.021712752428116211,0.022079900820787535,0.022446917374894668,0.022813802232360611,0.023180555534853917,0.023547177423789332,0.023913668040328427,0.024280027525380232,0.02464625601960186,0.02501235366339916,0.025378320596927323,0.025744156960091524,0.026109862892547523,0.026475438533702315,0.026840884022714725,0.02720619949849605,0.027571385099710664,0.027936440964776609,0.02830136723186626,0.028666164038906875,0.029030831523581255,0.029395369823328313,0.029759779075343704,0.0301240594165804,0.030488210983749323,0.030852233913319926,0.031216128341520783,0.031579894404340197,0.03194353223752678,0.032307041976590054,0.032670423756801056,0.033033677713192877,0.033396803980561315,0.033759802693465367,0.034122673986227932,0.034485417992936258,0.034848034847442644,0.035210524683364906,0.035572887634087037,0.035935123832759742,0.036297233412300942,0.036659216505396601,0.037021073244500921,0.037382803761837162,0.037744408189398115,0.038105886658946722,0.038467239302016565,0.038828466249912472,0.039189567633711064,0.039550543584261286,0.039911394232185017,0.04027211970787755,0.040632720141508198,0.040993195663020808,0.041353546402134324,0.041713772488343327,0.042073874050918586,0.042433851218907567,0.042793704121135041,0.043153432886203526,0.043513037642493917,0.043872518518165954,0.04423187564115879,0.044591109139191523,0.044950219139763672,0.045309205770155805,0.045668069157429964,0.046026809428430245,0.046385426709783323,0.046743921127898942,0.047102292808970464,0.047460541878975367,0.047818668463675787,0.048176672688618992,0.048534554679137941,0.048892314560351764,0.049249952457166284,0.04960746849427454,0.04996486279615725,0.050322135487083364,0.050679286691110562,0.051036316532085728,0.05139322513364547,0.051750012619216613,0.052106679112016711,0.052463224735054527,0.052819649611130552,0.053175953862837438,0.053532137612560537,0.053888200982478492,0.054244144094563511,0.054599967070581977,0.054955670032094943,0.055311253100458597,0.055666716396824738,0.056022060042141254,0.056377284157152624,0.056732388862400382,0.0570873742782236,0.057442240524759346,0.057796987721943166,0.058151615989509589,0.058506125446992574,0.058860516213725941,0.059214788408843907,0.059568942151281529,0.059922977559775131,0.060276894752862839,0.060630693848884983,0.060984374965984585,0.061337938222107827,0.061691383735004497,0.062044711622228438,0.062397922001138036,0.062751014988896625,0.063103990702472981,0.063456849258641798,0.063809590773984029,0.06416221536488749,0.064514723147547151,0.064867114237965734,0.06521938875195403,0.065571546805131414,0.065923588512926276,0.066275513990576435,0.066627323353129639,0.066979016715443929,0.06733059419218812,0.067682055897842264,0.068033401946697991,0.06838463245285907,0.068735747530241711,0.069086747292575107,0.069437631853401793,0.069788401326078109,0.070139055823774596,0.070489595459476459,0.070840020345983912,0.071190330595912843,0.071540526321694872,0.071890607635578016,0.072240574649627048,0.072590427475723959,0.072940166225568259,0.073289791010677521,0.073639301942387742,0.073988699131853741,0.07433798269004957,0.074687152727768963,0.075036209355625758,0.075385152684054241,0.075733982823309537,0.076082699883468177,0.07643130397442828,0.076779795205910162,0.077128173687456586,0.077476439528433236,0.077824592838029102,0.078172633725256929,0.078520562298953489,0.07886837866778014,0.079216082940223059,0.079563675224593788,0.079911155629029521,0.080258524261493547,0.080605781229775575,0.080952926641492298,0.081299960604087521,0.081646883224832767,0.081993694610827575,0.082340394868999897,0.082686984106106448,0.08303346242873319,0.083379829943295569,0.083726086756039014,0.084072232973039299,0.084418268700202873,0.08476419404326728,0.085110009107801476,0.085455713999206331,0.085801308822714847,0.086146793683392689,0.08649216868613839,0.086837433935683869,0.087182589536594732,0.087527635593270606,0.087872572209945599,0.088217399490688658,0.088562117539403851,0.088906726459830762,0.089251226355544888,0.089595617329958008,0.089939899486318503,0.090284072927711762,0.090628137757060481,0.090972094077125087,0.091315941990504093,0.091659681599634363,0.092003313006791598,0.092346836314090616,0.092690251623485695,0.093033559036770963,0.09337675865558076,0.093719850581389916,0.094062834915514204,0.094405711759110597,0.094748481213177693,0.095091143378555981,0.095433698355928284,0.095776146245819982,0.096118487148599496,0.0964607211644785,0.096802848393512372,0.09714486893560044,0.097486782890486415,0.097828590357758649,0.098170291436850535,0.09851188622704081,0.098853374827453891,0.099194757337060208,0.099536033854676575,0.099877204478966489,0.10021826930844048,0.10055922844145643,0.10090008197621989,0.10124083001078446,0.10158147264305206,0.10192200997077332,0.10226244209154785,0.10260276910282456,0.10294299110190208,0.10328310818592897,0.10362312045190411,0.103963027996677,0.10430283091694809,0.10464252930926905,0.10498212327004328,0.10532161289552597,0.1056609982818245,0.1060002795248989,0.10633945672056203,0.10667852996447985,0.1070174993521719,0.10735636497901149,0.10769512694022607,0.10803378533089744,0.10837234024596226,0.10871079178021215,0.10904914002829412,0.10938738508471084,0.10972552704382101,0.11006356599983955,0.11040150204683798,0.11073933527874474,0.11107706578934547,0.11141469367228329,0.11175221902105917,0.11208964192903215,0.11242696248941966,0.11276418079529793,0.11310129693960214,0.11343831101512675,0.11377522311452588,0.11411203333031356,0.11444874175486398,0.11478534848041187,0.11512185359905269,0.11545825720274307,0.11579455938330095,0.11613076023240598,0.11646685984159974,0.11680285830228609,0.11713875570573144,0.117474552143065,0.11781024770527913,0.1181458424832296,0.11848133656763581,0.1188167300490813,0.11915202301801367,0.11948721556474529,0.1198223077794531,0.12015729975217949,0.12049219157283188,0.12082698333118376,0.1211616751168742,0.1214962670194089,0.12183075912815966,0.12216515153236553,0.1224994443211322,0.12283363758343314,0.12316773140810905,0.1235017258838689,0.12383562109928949,0.12416941714281646,0.12450311410276378,0.12483671206731481,0.12517021112452181,0.12550361136230695,0.12583691286846185,0.12617011573064862,0.12650322003639927,0.12683622587311688,0.12716913332807503,0.12750194248841881,0.12783465344116438,0.12816726627319996,0.12849978107128535,0.12883219792205294,0.1291645169120072,0.12949673812752566,0.12982886165485885,0.13016088758013028,0.13049281598933735,0.13082464696835089,0.13115638060291618,0.13148801697865234,0.13181955618105351,0.13215099829548826,0.13248234340720055,0.13281359160130943,0.13314474296280973,0.13347579757657191,0.13380675552734284,0.13413761689974529,0.13446838177827916,0.13479905024732067,0.13512962239112367,0.1354600982938188,0.13579047803941485,0.13612076171179807,0.13645094939473307,0.13678104117186254,0.13711103712670811,0.13744093734266988,0.13777074190302738,0.13810045089093917,0.13843006438944369,0.13875958248145892,0.13908900524978315,0.13941833277709476,0.13974756514595291,0.14007670243879725,0.14040574473794884,0.14073469212560966,0.14106354468386351,0.14139230249467558,0.14172096563989353,0.14204953420124675,0.14237800826034749,0.14270638789869036,0.14303467319765331,0.14336286423849703,0.14369096110236604,0.14401896387028804,0.14434687262317508,0.14467468744182294,0.14500240840691203,0.14533003559900698,0.14565756909855762,0.14598500898589867,0.14631235534124987,0.14663960824471689,0.14696676777629067,0.14729383401584853,0.14762080704315356,0.14794768693785562,0.14827447377949088,0.14860116764748266,0.14892776862114107,0.14925427677966385,0.14958069220213588,0.14990701496753026,0.15023324515470751,0.15055938284241696,0.15088542810929581,0.15121138103387033,0.15153724169455532,0.15186301016965492,0.15218868653736237,0.15251427087576067,0.15283976326282217,0.15316516377640971,0.15349047249427572,0.1538156894940636,0.15414081485330683,0.15446584864943014,0.15479079095974899,0.15511564186147034,0.1554404014316923,0.15576506974740512,0.1560896468854904,0.15641413292272235,0.15673852793576712,0.15706283200118368,0.1573870451954234,0.15771116759483103,0.15803519927564408,0.1583591403139937,0.15868299078590442,0.15900675076729479,0.15933042033397704,0.15965399956165796,0.15997748852593835,0.16030088730231409,0.16062419596617539,0.16094741459280779,0.16127054325739215,0.16159358203500435,0.16191653100061634,0.16223939022909559,0.16256215979520591,0.16288483977360699,0.16320743023885531,0.16352993126540374,0.16385234292760223,0.16417466529969751,0.16449689845583387,0.16481904247005266,0.16514109741629329,0.16546306336839262,0.16578494040008593,0.1661067285850063,0.16642842799668572,0.16675003870855437,0.16707156079394167,0.16739299432607557,0.16771433937808378,0.16803559602299292,0.16835676433372962,0.16867784438311995,0.16899883624389028,0.1693197399886669,0.16964055568997669,0.16996128342024683,0.17028192325180563,0.17060247525688188,0.17092293950760595,0.17124331607600918,0.17156360503402471,0.17188380645348705,0.17220392040613303,0.17252394696360104,0.17284388619743227,0.17316373817906983,0.17348350297985995,0.1738031806710513,0.17412277132379586,0.17444227500914847,0.17476169179806772,0.17508102176141538,0.17540026496995731,0.17571942149436295,0.17603849140520628,0.17635747477296504,0.17667637166802189,0.17699518216066404,0.17731390632108326,0.17763254421937674,0.17795109592554648,0.17826956150950021,0.17858794104105086,0.17890623458991747,0.17922444222572456,0.1795425640180032,0.17986060003619023,0.1801785503496294,0.18049641502757066,0.18081419413917121,0.1811318877534947,0.1814494959395124,0.18176701876610249,0.182084456302051,0.18240180861605129,0.18271907577670493,0.18303625785252109,0.18335335491191757,0.18367036702322004,0.18398729425466315,0.18430413667438991,0.18462089435045245,0.18493756735081177,0.18525415574333823,0.18557065959581132,0.18588707897592049,0.18620341395126441,0.18651966458935212,0.18683583095760231,0.18715191312334425,0.18746791115381725,0.1877838251161715,0.18809965507746765,0.1884154011046775,0.18873106326468359,0.18904664162428006,0.18936213625017201,0.18967754720897656,0.18999287456722208,0.19030811839134923,0.19062327874771035,0.19093835570257031,0.19125334932210603,0.19156825967240729,0.19188308681947625,0.19219783082922814,0.19251249176749122,0.19282706970000663,0.19314156469242927,0.19345597681032711,0.1937703061191822,0.19408455268438995,0.19439871657126018,0.19471279784501649,0.19502679657079705,0.19534071281365417,0.19565454663855511,0.19596829811038152,0.19628196729393038,0.19659555425391334,0.19690905905495759,0.19722248176160545,0.19753582243831502,0.19784908114945984,0.1981622579593296,0.1984753529321297,0.19878836613198192,0.19910129762292411,0.1994141474689109,0.19972691573381315,0.20003960248141894,0.20035220777543272,0.2006647316794766,0.20097717425708939,0.20128953557172766,0.20160181568676519,0.20191401466549375,0.2022261325711226,0.20253816946677927,0.20285012541550912,0.20316200048027611,0.20347379472396224,0.20378550820936847,0.20409714099921406,0.20440869315613758,0.20472016474269608,0.20503155582136631,0.20534286645454389,0.20565409670454418,0.2059652466336018,0.20627631630387153,0.20658730577742762,0.20689821511626469,0.2072090443822972,0.2075197936373602,0.20783046294320912,0.20814105236151978,0.20845156195388917,0.20876199178183466,0.20907234190679508,0.20938261239013012,0.20969280329312101,0.21000291467697021,0.21031294660280206,0.21062289913166224,0.21093277232451876,0.2112425662422612,0.21155228094570164,0.2118619164955742,0.21217147295253572,0.21248095037716516,0.21279034882996475,0.21309966837135905,0.21340890906169596,0.21371807096124629,0.21402715413020426,0.21433615862868732,0.21464508451673669,0.21495393185431688,0.21526270070131667,0.21557139111754833,0.21588000316274861,0.21618853689657808,0.21649699237862202,0.21680536966838984,0.21711366882531591,0.21742188990875899,0.21773003297800303,0.21803809809225677,0.21834608531065425,0.21865399469225461,0.21896182629604263,0.21926958018092835,0.21957725640574782,0.21988485502926253,0.22019237611016027,0.22049981970705448,0.22080718587848522,0.22111447468291853,0.22142168617874719,0.22172882042429026,0.22203587747779385,0.22234285739743057,0.22264976024130023,0.22295658606742982,0.22326333493377318,0.22357000689821196,0.22387660201855486,0.22418312035253862,0.22448956195782729,0.22479592689201316,0.22510221521261617,0.22540842697708474,0.22571456224279512,0.2260206210670524,0.22632660350708961,0.22663250962006892,0.22693833946308081,0.22724409309314506,0.22754977056720993,0.22785537194215333,0.22816089727478189,0.22846634662183207,0.2287717200399694,0.22907701758578938,0.22938223931581692,0.22968738528650706,0.2299924555542445,0.23029745017534442,0.23060236920605176,0.23090721270254227,0.23121198072092169,0.23151667331722686,0.2318212905474247,0.23212583246741356,0.23243029913302218,0.23273469060001084,0.23303900692407056,0.23334324816082405,0.23364741436582509,0.23395150559455924,0.23425552190244356,0.234559463344827,0.23486332997699017,0.23516712185414601,0.23547083903143928,0.23577448156394717,0.23607804950667904,0.236381542914577,0.23668496184251539,0.23698830634530155,0.2372915764776754,0.23759477229431,0.23789789384981139,0.2382009411987186,0.23850391439550425,0.23880681349457397,0.23910963855026732,0.23941238961685704,0.23971506674854998,0.24001766999948651,0.24032019942374125,0.24062265507532263,0.24092503700817355,0.24122734527617082,0.24152957993312607,0.24183174103278507,0.24213382862882857,0.24243584277487173,0.24273778352446485,0.24303965093109295,0.24334144504817634,0.24364316592907026,0.24394481362706555,0.24424638819538813,0.24454788968719982,0.24484931815559757,0.24515067365361454,0.24545195623421931,0.24575316595031685,0.24605430285474775,0.24635536700028907,0.24665635843965397,0.24695727722549216,0.24725812341038958,0.24755889704686906,0.2478595981873899,0.24816022688434841,0.24846078319007753,0.2487612671568476,0.2490616788368657,0.24936201828227644,0.24966228554516159,0.24996248067754054,0.25026260373136994,0.25056265475854445,0.25086263381089619,0.25116254094019536,0.25146237619814993,0.2517621396364062,0.25206183130654825,0.2523614512600989,0.25266099954851906,0.25296047622320822,0.25325988133550437,0.25355921493668432,0.25385847707796361,0.25415766781049653,0.25445678718537679,0.25475583525363665,0.25505481206624814,0.25535371767412196,0.25565255212810878,0.25595131547899846,0.25625000777752061,0.25654862907434434,0.25684717942007895,0.25714565886527319,0.2574440674604162,0.25774240525593689,0.25804067230220479,0.25833886864952915,0.25863699434816029,0.25893504944828849,0.25923303400004505,0.25953094805350146,0.25982879165867062,0.26012656486550584,0.26042426772390165,0.26072190028369358,0.26101946259465852,0.26131695470651428,0.26161437666892057,0.26191172853147798,0.26220901034372929,0.26250622215515845,0.26280336401519144,0.26310043597319599,0.26339743807848198,0.26369437038030102,0.26399123292784721,0.26428802577025662,0.26458474895660783,0.26488140253592179,0.26517798655716207,0.26547450106923459,0.26577094612098839,0.26606732176121495,0.26636362803864899,0.26665986500196781,0.26695603269979223,0.26725213118068619,0.26754816049315644,0.26784412068565377,0.26814001180657188,0.26843583390424847,0.26873158702696448,0.2690272712229449,0.26932288654035835,0.26961843302731758,0.26991391073187915,0.27020931970204382,0.27050465998575646,0.27079993163090649,0.27109513468532725,0.2713902691967971,0.27168533521303839,0.27198033278171868,0.27227526195044971,0.2725701227667886,0.27286491527823686,0.27315963953224143,0.27345429557619405,0.27374888345743198,0.27404340322323723,0.27433785492083779,0.27463223859740654,0.2749265543000623,0.2752208020758693,0.27551498197183766,0.27580909403492299,0.27610313831202726,0.27639711484999785,0.27669102369562876,0.27698486489565971,0.27727863849677692,0.27757234454561275,0.27786598308874616,0.27815955417270244,0.27845305784395358,0.27874649414891811,0.27903986313396151,0.27933316484539578,0.2796263993294803,0.2799195666324209,0.28021266680037116,0.28050569987943119,0.28079866591564873,0.28109156495501891,0.28138439704348406,0.28167716222693423,0.28196986055120687,0.28226249206208737,0.28255505680530857,0.28284755482655155,0.28313998617144492,0.28343235088556568,0.28372464901443861,0.28401688060353686,0.28430904569828175,0.2846011443440431,0.28489317658613889,0.28518514246983595,0.2854770420403494,0.2857688753428434,0.28606064242243023,0.28635234332417175,0.28664397809307823,0.28693554677410921,0.28722704941217314,0.28751848605212771,0.28780985673877985,0.28810116151688592,0.28839240043115133,0.28868357352623158,0.28897468084673095,0.28926572243720411,0.28955669834215492,0.28984760860603737,0.29013845327325516,0.29042923238816204,0.29071994599506157,0.29101059413820796,0.29130117686180484,0.29159169421000697,0.29188214622691877,0.29217253295659551,0.2924628544430426,0.29275311073021648,0.29304330186202387,0.29333342788232264,0.2936234888349209,0.29391348476357826,0.29420341571200481,0.29449328172386208,0.2947830828427625,0.29507281911226968,0.29536249057589881,0.29565209727711594,0.29594163925933914,0.29623111656593742,0.29652052924023181,0.29680987732549463,0.29709916086495031,0.29738837990177486,0.29767753447909617,0.29796662463999418,0.29825565042750091,0.29854461188460024,0.29883350905422867,0.29912234197927445,0.29941111070257853,0.29969981526693401,0.29998845571508681,0.30027703208973505,0.30056554443352984,0.30085399278907449,0.30114237719892567,0.3014306977055925,0.30171895435153706,0.3020071471791746,0.30229527623087332,0.30258334154895455,0.30287134317569298,0.30315928115331631,0.30344715552400581,0.30373496632989616,0.30402271361307565,0.30431039741558569,0.30459801777942197,0.30488557474653333,0.30517306835882291,0.30546049865814723,0.30574786568631707,0.30603516948509696,0.30632241009620587,0.30660958756131651,0.30689670192205604,0.30718375322000591,0.30747074149670178,0.3077576667936337,0.30804452915224667,0.30833132861393964,0.30861806522006652,0.30890473901193588,0.30919135003081111,0.30947789831791039,0.30976438391440664,0.31005080686142822,0.31033716720005805,0.31062346497133447,0.31090970021625075,0.31119587297575579,0.31148198329075344,0.31176803120210317,0.31205401675061978,0.31233993997707377,0.31262580092219094,0.31291159962665316,0.31319733613109757,0.31348301047611754,0.31376862270226197,0.31405417285003601,0.31433966095990046,0.31462508707227244,0.31491045122752503,0.31519575346598788,0.31548099382794625,0.31576617235364246,0.31605128908327457,0.31633634405699773,0.31662133731492303,0.3169062688971187,0.31719113884360917,0.31747594719437588,0.31776069398935697,0.31804537926844745,0.31833000307149928,0.31861456543832134,0.31889906640867965,0.31918350602229745,0.31946788431885464,0.31975220133798915,0.32003645711929563,0.32032065170232638,0.32060478512659102,0.32088885743155676,0.32117286865664824,0.32145681884124805,0.32174070802469601,0.32202453624629024,0.32230830354528611,0.32259200996089732,0.32287565553229525]}
},{}],49:[function(require,module,exports){
(function (__filename){
'use strict';

// MODULES //

var tape = require( 'tape' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var abs = require( '@stdlib/math/base/special/abs' );
var PINF = require( '@stdlib/constants/math/float64-pinf' );
var EPS = require( '@stdlib/constants/math/float64-eps' );
var sqrt1pm1 = require( './../lib' );


// FIXTURES //

var large = require( './fixtures/cpp/large.json' );
var small = require( './fixtures/cpp/small.json' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.equal( typeof sqrt1pm1, 'function', 'main export is a function' );
	t.end();
});

tape( 'the function returns `NaN` if provided `NaN`', function test( t ) {
	var v = sqrt1pm1( NaN );
	t.equal( isnan( v ), true, 'returns NaN' );
	t.end();
});

tape( 'the function returns `+infinity` if provided `+infinity`', function test( t ) {
	var v = sqrt1pm1( PINF );
	t.equal( v, PINF, 'returns +infinity' );
	t.end();
});

tape( 'the function returns `0` if provided `0`', function test( t ) {
	var v = sqrt1pm1( 0.0 );
	t.equal( v, 0.0, 'returns zero' );
	t.end();
});

tape( 'the function returns `-1` if provided `-1`', function test( t ) {
	var v = sqrt1pm1( -1.0 );
	t.equal( v, -1.0, 'returns negative one' );
	t.end();
});

tape( 'the function returns `NaN` if provided a `x < -1`', function test( t ) {
	var v = sqrt1pm1( -1.5 );
	t.equal( isnan( v ), true, 'returns NaN' );
	sqrt1pm1( -2.0 );
	t.equal( isnan( v ), true, 'returns NaN' );
	sqrt1pm1( -3.0 );
	t.equal( isnan( v ), true, 'returns NaN' );
	t.end();
});

tape( 'the function handles large `x` values (|x| > 0.75)', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var v;
	var i;

	x = large.x;
	expected = large.expected;

	for ( i = 0; i < x.length; i++ ) {
		v = sqrt1pm1( x[ i ] );
		delta = abs( v - expected[ i ] );
		tol = 1.0 * EPS * abs( expected[ i ] );
		t.ok( delta <= tol, 'within tolerance. x: ' + x[ i ] + '. Value: ' + v + '. E: ' + expected[ i ] + '. Δ: ' + delta + '. tol: ' + tol + '.' );
	}
	t.end();
});

tape( 'the function handles small `x` values (|x| <= 0.75)', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var v;
	var i;

	x = small.x;
	expected = small.expected;

	for ( i = 0; i < x.length; i++ ) {
		v = sqrt1pm1( x[ i ] );
		delta = abs( v - expected[ i ] );
		tol = 390.0 * EPS * abs( expected[ i ] );
		t.ok( delta <= tol, 'within tolerance. x: ' + x[ i ] + '. Value: ' + v + '. E: ' + expected[ i ] + '. Δ: ' + delta + '. tol: ' + tol + '.' );
	}
	t.end();
});

}).call(this,"/lib/node_modules/@stdlib/math/base/special/sqrt1pm1/test/test.js")
},{"./../lib":45,"./fixtures/cpp/large.json":47,"./fixtures/cpp/small.json":48,"@stdlib/constants/math/float64-eps":26,"@stdlib/constants/math/float64-pinf":30,"@stdlib/math/base/assert/is-nan":34,"@stdlib/math/base/special/abs":37,"tape":131}],50:[function(require,module,exports){
'use strict';

// MODULES //

var isLittleEndian = require( '@stdlib/assert/is-little-endian' );


// MAIN //

var HIGH;
if ( isLittleEndian === true ) {
	HIGH = 1; // second index
} else {
	HIGH = 0; // first index
}


// EXPORTS //

module.exports = HIGH;

},{"@stdlib/assert/is-little-endian":18}],51:[function(require,module,exports){
'use strict';

/**
* Return an unsigned 32-bit integer corresponding to the more significant 32 bits of a double-precision floating-point number.
*
* @module @stdlib/number/float64/base/get-high-word
*
* @example
* var getHighWord = require( '@stdlib/number/float64/base/get-high-word' );
*
* var w = getHighWord( 3.14e201 ); // => 01101001110001001000001011000011
* // returns 1774486211
*/

// MODULES //

var getHighWord = require( './main.js' );


// EXPORTS //

module.exports = getHighWord;

},{"./main.js":52}],52:[function(require,module,exports){
'use strict';

// MODULES //

var Uint32Array = require( '@stdlib/array/uint32' );
var Float64Array = require( '@stdlib/array/float64' );
var HIGH = require( './high.js' );


// VARIABLES //

var FLOAT64_VIEW = new Float64Array( 1 );
var UINT32_VIEW = new Uint32Array( FLOAT64_VIEW.buffer );


// MAIN //

/**
* Returns an unsigned 32-bit integer corresponding to the more significant 32 bits of a double-precision floating-point number.
*
* ## Notes
*
* ```text
* float64 (64 bits)
* f := fraction (significand/mantissa) (52 bits)
* e := exponent (11 bits)
* s := sign bit (1 bit)
*
* |-------- -------- -------- -------- -------- -------- -------- --------|
* |                                Float64                                |
* |-------- -------- -------- -------- -------- -------- -------- --------|
* |              Uint32               |               Uint32              |
* |-------- -------- -------- -------- -------- -------- -------- --------|
* ```
*
* If little endian (more significant bits last):
*
* ```text
*                         <-- lower      higher -->
* |   f7       f6       f5       f4       f3       f2    e2 | f1 |s|  e1  |
* ```
*
* If big endian (more significant bits first):
*
* ```text
*                         <-- higher      lower -->
* |s| e1    e2 | f1     f2       f3       f4       f5        f6      f7   |
* ```
*
* In which Uint32 can we find the higher order bits? If little endian, the second; if big endian, the first.
*
*
* ## References
*
* -   [Open Group][1]
*
* [1]: http://pubs.opengroup.org/onlinepubs/9629399/chap14.htm
*
* @param {number} x - input value
* @returns {uinteger32} higher order word
*
* @example
* var w = getHighWord( 3.14e201 ); // => 01101001110001001000001011000011
* // returns 1774486211
*/
function getHighWord( x ) {
	FLOAT64_VIEW[ 0 ] = x;
	return UINT32_VIEW[ HIGH ];
}


// EXPORTS //

module.exports = getHighWord;

},{"./high.js":50,"@stdlib/array/float64":2,"@stdlib/array/uint32":7}],53:[function(require,module,exports){
arguments[4][50][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":18,"dup":50}],54:[function(require,module,exports){
'use strict';

/**
* Set the more significant 32 bits of a double-precision floating-point number.
*
* @module @stdlib/number/float64/base/set-high-word
*
* @example
* var setHighWord = require( '@stdlib/number/float64/base/set-high-word' );
*
* var high = 5 >>> 0; // => 0 00000000000 00000000000000000101
*
* var y = setHighWord( 3.14e201, high ); // => 0 00000000000 0000000000000000010110010011110010110101100010000010
* // returns 1.18350528745e-313
*
* @example
* var setHighWord = require( '@stdlib/number/float64/base/set-high-word' );
* var PINF = require( '@stdlib/constants/math/float64-pinf' ); //  => 0 11111111111 00000000000000000000 00000000000000000000000000000000
*
* var high = 1072693248 >>> 0; // => 0 01111111111 00000000000000000000
*
* // Set the higher order bits of `+infinity` to return `1`:
* var y = setHighWord( PINF, high ); => 0 01111111111 0000000000000000000000000000000000000000000000000000
* // returns 1.0
*/

// MODULES //

var setHighWord = require( './main.js' );


// EXPORTS //

module.exports = setHighWord;

},{"./main.js":55}],55:[function(require,module,exports){
'use strict';

// MODULES //

var Uint32Array = require( '@stdlib/array/uint32' );
var Float64Array = require( '@stdlib/array/float64' );
var HIGH = require( './high.js' );


// VARIABLES //

var FLOAT64_VIEW = new Float64Array( 1 );
var UINT32_VIEW = new Uint32Array( FLOAT64_VIEW.buffer );


// MAIN //

/**
* Sets the more significant 32 bits of a double-precision floating-point number.
*
* ## Notes
*
* ```text
* float64 (64 bits)
* f := fraction (significand/mantissa) (52 bits)
* e := exponent (11 bits)
* s := sign bit (1 bit)
*
* |-------- -------- -------- -------- -------- -------- -------- --------|
* |                                Float64                                |
* |-------- -------- -------- -------- -------- -------- -------- --------|
* |              Uint32               |               Uint32              |
* |-------- -------- -------- -------- -------- -------- -------- --------|
* ```
*
* If little endian (more significant bits last):
*
* ```text
*                         <-- lower      higher -->
* |   f7       f6       f5       f4       f3       f2    e2 | f1 |s|  e1  |
* ```
*
* If big endian (more significant bits first):
*
* ```text
*                         <-- higher      lower -->
* |s| e1    e2 | f1     f2       f3       f4       f5        f6      f7   |
* ```
*
* In which Uint32 can we find the higher order bits? If little endian, the second; if big endian, the first.
*
*
* ## References
*
* -   [Open Group][1]
*
* [1]: http://pubs.opengroup.org/onlinepubs/9629399/chap14.htm
*
* @param {number} x - double
* @param {uinteger32} high - unsigned 32-bit integer to replace the higher order word of `x`
* @returns {number} double having the same lower order word as `x`
*
* @example
* var high = 5 >>> 0; // => 0 00000000000 00000000000000000101
*
* var y = setHighWord( 3.14e201, high ); //  => 0 00000000000 0000000000000000010110010011110010110101100010000010
* // returns 1.18350528745e-313
*
* @example
* var PINF = require( '@stdlib/constants/math/float64-pinf' ); // => 0 11111111111 00000000000000000000 00000000000000000000000000000000
*
* var high = 1072693248 >>> 0; // => 0 01111111111 00000000000000000000
*
* // Set the higher order bits of `+infinity` to return `1`:
* var y = setHighWord( PINF, high ); => 0 01111111111 0000000000000000000000000000000000000000000000000000
* // returns 1.0
*/
function setHighWord( x, high ) {
	FLOAT64_VIEW[ 0 ] = x;
	UINT32_VIEW[ HIGH ] = ( high >>> 0 ); // identity bit shift to ensure integer
	return FLOAT64_VIEW[ 0 ];
}


// EXPORTS //

module.exports = setHighWord;

},{"./high.js":53,"@stdlib/array/float64":2,"@stdlib/array/uint32":7}],56:[function(require,module,exports){
'use strict';

// MODULES //

var isFloat64Array = require( '@stdlib/assert/is-float64array' );
var GlobalFloat64Array = require( './float64array.js' );


// MAIN //

/**
* Tests for native `Float64Array` support.
*
* @returns {boolean} boolean indicating if an environment has `Float64Array` support
*
* @example
* var bool = hasFloat64ArraySupport();
* // returns <boolean>
*/
function hasFloat64ArraySupport() {
	var bool;
	var arr;

	if ( typeof GlobalFloat64Array !== 'function' ) {
		return false;
	}
	// Test basic support...
	try {
		arr = new GlobalFloat64Array( [ 1.0, 3.14, -3.14, NaN ] );
		bool = (
			isFloat64Array( arr ) &&
			arr[ 0 ] === 1.0 &&
			arr[ 1 ] === 3.14 &&
			arr[ 2 ] === -3.14 &&
			arr[ 3 ] !== arr[ 3 ]
		);
	} catch ( err ) { // eslint-disable-line no-unused-vars
		bool = false;
	}
	return bool;
}


// EXPORTS //

module.exports = hasFloat64ArraySupport;

},{"./float64array.js":57,"@stdlib/assert/is-float64array":15}],57:[function(require,module,exports){
'use strict';

// EXPORTS //

module.exports = ( typeof Float64Array === 'function' ) ? Float64Array : null;

},{}],58:[function(require,module,exports){
'use strict';

/**
* Test for native `Float64Array` support.
*
* @module @stdlib/utils/detect-float64array-support
*
* @example
* var hasFloat64ArraySupport = require( '@stdlib/utils/detect-float64array-support' );
*
* var bool = hasFloat64ArraySupport();
* // returns <boolean>
*/

// MODULES //

var hasFloat64ArraySupport = require( './detect_float64array_support.js' );


// EXPORTS //

module.exports = hasFloat64ArraySupport;

},{"./detect_float64array_support.js":56}],59:[function(require,module,exports){
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

},{}],60:[function(require,module,exports){
'use strict';

/**
* Test for native `Symbol` support.
*
* @module @stdlib/utils/detect-symbol-support
*
* @example
* var hasSymbolSupport = require( '@stdlib/utils/detect-symbol-support' );
*
* var bool = hasSymbolSupport();
* // returns <boolean>
*/

// MODULES //

var hasSymbolSupport = require( './detect_symbol_support.js' );


// EXPORTS //

module.exports = hasSymbolSupport;

},{"./detect_symbol_support.js":59}],61:[function(require,module,exports){
'use strict';

// MODULES //

var hasSymbols = require( '@stdlib/utils/detect-symbol-support' )();


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
	return ( hasSymbols && typeof Symbol.toStringTag === 'symbol' );
}


// EXPORTS //

module.exports = hasToStringTagSupport;

},{"@stdlib/utils/detect-symbol-support":60}],62:[function(require,module,exports){
'use strict';

/**
* Test for native `toStringTag` support.
*
* @module @stdlib/utils/detect-tostringtag-support
*
* @example
* var hasToStringTagSupport = require( '@stdlib/utils/detect-tostringtag-support' );
*
* var bool = hasToStringTagSupport();
* // returns <boolean>
*/

// MODULES //

var hasToStringTagSupport = require( './has_tostringtag_support.js' );


// EXPORTS //

module.exports = hasToStringTagSupport;

},{"./has_tostringtag_support.js":61}],63:[function(require,module,exports){
'use strict';

// MODULES //

var isUint16Array = require( '@stdlib/assert/is-uint16array' );
var UINT16_MAX = require( '@stdlib/constants/math/uint16-max' );
var GlobalUint16Array = require( './uint16array.js' );


// MAIN //

/**
* Tests for native `Uint16Array` support.
*
* @returns {boolean} boolean indicating if an environment has `Uint16Array` support
*
* @example
* var bool = hasUint16ArraySupport();
* // returns <boolean>
*/
function hasUint16ArraySupport() {
	var bool;
	var arr;

	if ( typeof GlobalUint16Array !== 'function' ) {
		return false;
	}
	// Test basic support...
	try {
		arr = [ 1, 3.14, -3.14, UINT16_MAX+1, UINT16_MAX+2 ];
		arr = new GlobalUint16Array( arr );
		bool = (
			isUint16Array( arr ) &&
			arr[ 0 ] === 1 &&
			arr[ 1 ] === 3 &&            // truncation
			arr[ 2 ] === UINT16_MAX-2 && // truncation and wrap around
			arr[ 3 ] === 0 &&            // wrap around
			arr[ 4 ] === 1               // wrap around
		);
	} catch ( err ) { // eslint-disable-line no-unused-vars
		bool = false;
	}
	return bool;
}


// EXPORTS //

module.exports = hasUint16ArraySupport;

},{"./uint16array.js":65,"@stdlib/assert/is-uint16array":20,"@stdlib/constants/math/uint16-max":31}],64:[function(require,module,exports){
'use strict';

/**
* Test for native `Uint16Array` support.
*
* @module @stdlib/utils/detect-uint16array-support
*
* @example
* var hasUint16ArraySupport = require( '@stdlib/utils/detect-uint16array-support' );
*
* var bool = hasUint16ArraySupport();
* // returns <boolean>
*/

// MODULES //

var hasUint16ArraySupport = require( './detect_uint16array_support.js' );


// EXPORTS //

module.exports = hasUint16ArraySupport;

},{"./detect_uint16array_support.js":63}],65:[function(require,module,exports){
'use strict';

// EXPORTS //

module.exports = ( typeof Uint16Array === 'function' ) ? Uint16Array : null;

},{}],66:[function(require,module,exports){
'use strict';

// MODULES //

var isUint32Array = require( '@stdlib/assert/is-uint32array' );
var UINT32_MAX = require( '@stdlib/constants/math/uint32-max' );
var GlobalUint32Array = require( './uint32array.js' );


// MAIN //

/**
* Tests for native `Uint32Array` support.
*
* @returns {boolean} boolean indicating if an environment has `Uint32Array` support
*
* @example
* var bool = hasUint32ArraySupport();
* // returns <boolean>
*/
function hasUint32ArraySupport() {
	var bool;
	var arr;

	if ( typeof GlobalUint32Array !== 'function' ) {
		return false;
	}
	// Test basic support...
	try {
		arr = [ 1, 3.14, -3.14, UINT32_MAX+1, UINT32_MAX+2 ];
		arr = new GlobalUint32Array( arr );
		bool = (
			isUint32Array( arr ) &&
			arr[ 0 ] === 1 &&
			arr[ 1 ] === 3 &&            // truncation
			arr[ 2 ] === UINT32_MAX-2 && // truncation and wrap around
			arr[ 3 ] === 0 &&            // wrap around
			arr[ 4 ] === 1               // wrap around
		);
	} catch ( err ) { // eslint-disable-line no-unused-vars
		bool = false;
	}
	return bool;
}


// EXPORTS //

module.exports = hasUint32ArraySupport;

},{"./uint32array.js":68,"@stdlib/assert/is-uint32array":22,"@stdlib/constants/math/uint32-max":32}],67:[function(require,module,exports){
'use strict';

/**
* Test for native `Uint32Array` support.
*
* @module @stdlib/utils/detect-uint32array-support
*
* @example
* var hasUint32ArraySupport = require( '@stdlib/utils/detect-uint32array-support' );
*
* var bool = hasUint32ArraySupport();
* // returns <boolean>
*/

// MODULES //

var hasUint32ArraySupport = require( './detect_uint32array_support.js' );


// EXPORTS //

module.exports = hasUint32ArraySupport;

},{"./detect_uint32array_support.js":66}],68:[function(require,module,exports){
'use strict';

// EXPORTS //

module.exports = ( typeof Uint32Array === 'function' ) ? Uint32Array : null;

},{}],69:[function(require,module,exports){
'use strict';

// MODULES //

var isUint8Array = require( '@stdlib/assert/is-uint8array' );
var UINT8_MAX = require( '@stdlib/constants/math/uint8-max' );
var GlobalUint8Array = require( './uint8array.js' );


// MAIN //

/**
* Tests for native `Uint8Array` support.
*
* @returns {boolean} boolean indicating if an environment has `Uint8Array` support
*
* @example
* var bool = hasUint8ArraySupport();
* // returns <boolean>
*/
function hasUint8ArraySupport() {
	var bool;
	var arr;

	if ( typeof GlobalUint8Array !== 'function' ) {
		return false;
	}
	// Test basic support...
	try {
		arr = [ 1, 3.14, -3.14, UINT8_MAX+1, UINT8_MAX+2 ];
		arr = new GlobalUint8Array( arr );
		bool = (
			isUint8Array( arr ) &&
			arr[ 0 ] === 1 &&
			arr[ 1 ] === 3 &&           // truncation
			arr[ 2 ] === UINT8_MAX-2 && // truncation and wrap around
			arr[ 3 ] === 0 &&           // wrap around
			arr[ 4 ] === 1              // wrap around
		);
	} catch ( err ) { // eslint-disable-line no-unused-vars
		bool = false;
	}
	return bool;
}


// EXPORTS //

module.exports = hasUint8ArraySupport;

},{"./uint8array.js":71,"@stdlib/assert/is-uint8array":24,"@stdlib/constants/math/uint8-max":33}],70:[function(require,module,exports){
'use strict';

/**
* Test for native `Uint8Array` support.
*
* @module @stdlib/utils/detect-uint8array-support
*
* @example
* var hasUint8ArraySupport = require( '@stdlib/utils/detect-uint8array-support' );
*
* var bool = hasUint8ArraySupport();
* // returns <boolean>
*/

// MODULES //

var hasUint8ArraySupport = require( './detect_uint8array_support.js' );


// EXPORTS //

module.exports = hasUint8ArraySupport;

},{"./detect_uint8array_support.js":69}],71:[function(require,module,exports){
'use strict';

// EXPORTS //

module.exports = ( typeof Uint8Array === 'function' ) ? Uint8Array : null;

},{}],72:[function(require,module,exports){
'use strict';

/**
* Returns a string value indicating a specification defined classification of an object.
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

var hasToStringTag = require( '@stdlib/utils/detect-tostringtag-support' );
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

},{"./native_class.js":73,"./polyfill.js":74,"@stdlib/utils/detect-tostringtag-support":62}],73:[function(require,module,exports){
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

},{"./tostring.js":75,"./tostringtag.js":76,"@stdlib/assert/has-own-property":14}],75:[function(require,module,exports){
'use strict';

// MAIN //

var toStr = Object.prototype.toString;


// EXPORTS //

module.exports = toStr;

},{}],76:[function(require,module,exports){
'use strict';

// MAIN //

var toStrTag = ( typeof Symbol === 'function' ) ? Symbol.toStringTag : '';


// EXPORTS //

module.exports = toStrTag;

},{}],77:[function(require,module,exports){
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

revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function placeHoldersCount (b64) {
  var len = b64.length
  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // the number of equal signs (place holders)
  // if there are two placeholders, than the two characters before it
  // represent one byte
  // if there is only one, then the three characters before it represent 2 bytes
  // this is just a cheap hack to not do indexOf twice
  return b64[len - 2] === '=' ? 2 : b64[len - 1] === '=' ? 1 : 0
}

function byteLength (b64) {
  // base64 is 4/3 + up to two characters of the original data
  return (b64.length * 3 / 4) - placeHoldersCount(b64)
}

function toByteArray (b64) {
  var i, l, tmp, placeHolders, arr
  var len = b64.length
  placeHolders = placeHoldersCount(b64)

  arr = new Arr((len * 3 / 4) - placeHolders)

  // if there are placeholders, only get up to the last complete 4 chars
  l = placeHolders > 0 ? len - 4 : len

  var L = 0

  for (i = 0; i < l; i += 4) {
    tmp = (revLookup[b64.charCodeAt(i)] << 18) | (revLookup[b64.charCodeAt(i + 1)] << 12) | (revLookup[b64.charCodeAt(i + 2)] << 6) | revLookup[b64.charCodeAt(i + 3)]
    arr[L++] = (tmp >> 16) & 0xFF
    arr[L++] = (tmp >> 8) & 0xFF
    arr[L++] = tmp & 0xFF
  }

  if (placeHolders === 2) {
    tmp = (revLookup[b64.charCodeAt(i)] << 2) | (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[L++] = tmp & 0xFF
  } else if (placeHolders === 1) {
    tmp = (revLookup[b64.charCodeAt(i)] << 10) | (revLookup[b64.charCodeAt(i + 1)] << 4) | (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[L++] = (tmp >> 8) & 0xFF
    arr[L++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] + lookup[num >> 12 & 0x3F] + lookup[num >> 6 & 0x3F] + lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2])
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var output = ''
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    output += lookup[tmp >> 2]
    output += lookup[(tmp << 4) & 0x3F]
    output += '=='
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + (uint8[len - 1])
    output += lookup[tmp >> 10]
    output += lookup[(tmp >> 4) & 0x3F]
    output += lookup[(tmp << 2) & 0x3F]
    output += '='
  }

  parts.push(output)

  return parts.join('')
}

},{}],78:[function(require,module,exports){

},{}],79:[function(require,module,exports){
arguments[4][78][0].apply(exports,arguments)
},{"dup":78}],80:[function(require,module,exports){
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

},{}],81:[function(require,module,exports){
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
    arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }}
    return arr.foo() === 42
  } catch (e) {
    return false
  }
}

function createBuffer (length) {
  if (length > K_MAX_LENGTH) {
    throw new RangeError('Invalid typed array length')
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
      throw new Error(
        'If encoding is specified then the first argument must be a string'
      )
    }
    return allocUnsafe(arg)
  }
  return from(arg, encodingOrOffset, length)
}

// Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
if (typeof Symbol !== 'undefined' && Symbol.species &&
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
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number')
  }

  if (isArrayBuffer(value)) {
    return fromArrayBuffer(value, encodingOrOffset, length)
  }

  if (typeof value === 'string') {
    return fromString(value, encodingOrOffset)
  }

  return fromObject(value)
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
    throw new TypeError('"size" argument must be a number')
  } else if (size < 0) {
    throw new RangeError('"size" argument must not be negative')
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
    throw new TypeError('"encoding" must be a valid string encoding')
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
    throw new RangeError('\'offset\' is out of bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('\'length\' is out of bounds')
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

  if (obj) {
    if (isArrayBufferView(obj) || 'length' in obj) {
      if (typeof obj.length !== 'number' || numberIsNaN(obj.length)) {
        return createBuffer(0)
      }
      return fromArrayLike(obj)
    }

    if (obj.type === 'Buffer' && Array.isArray(obj.data)) {
      return fromArrayLike(obj.data)
    }
  }

  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
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
  return b != null && b._isBuffer === true
}

Buffer.compare = function compare (a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError('Arguments must be Buffers')
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
  if (isArrayBufferView(string) || isArrayBuffer(string)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    string = '' + string
  }

  var len = string.length
  if (len === 0) return 0

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
      case undefined:
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
        if (loweredCase) return utf8ToBytes(string).length // assume utf8
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

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
    if (this.length > max) str += ' ... '
  }
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (!Buffer.isBuffer(target)) {
    throw new TypeError('Argument must be a Buffer')
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
  byteOffset = +byteOffset  // Coerce to Number.
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

  // must be an even number of digits
  var strLen = string.length
  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

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
  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start
  var i

  if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start]
    }
  } else if (len < 1000) {
    // ascending copy from start
    for (i = 0; i < len; ++i) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, start + len),
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
    if (val.length === 1) {
      var code = val.charCodeAt(0)
      if (code < 256) {
        val = code
      }
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
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
      : new Buffer(val, encoding)
    var len = bytes.length
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

// ArrayBuffers from another context (i.e. an iframe) do not pass the `instanceof` check
// but they should be treated as valid. See: https://github.com/feross/buffer/issues/166
function isArrayBuffer (obj) {
  return obj instanceof ArrayBuffer ||
    (obj != null && obj.constructor != null && obj.constructor.name === 'ArrayBuffer' &&
      typeof obj.byteLength === 'number')
}

// Node 0.10 supports `ArrayBuffer` but lacks `ArrayBuffer.isView`
function isArrayBufferView (obj) {
  return (typeof ArrayBuffer.isView === 'function') && ArrayBuffer.isView(obj)
}

function numberIsNaN (obj) {
  return obj !== obj // eslint-disable-line no-self-compare
}

},{"base64-js":77,"ieee754":100}],82:[function(require,module,exports){
(function (Buffer){
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

// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.

function isArray(arg) {
  if (Array.isArray) {
    return Array.isArray(arg);
  }
  return objectToString(arg) === '[object Array]';
}
exports.isArray = isArray;

function isBoolean(arg) {
  return typeof arg === 'boolean';
}
exports.isBoolean = isBoolean;

function isNull(arg) {
  return arg === null;
}
exports.isNull = isNull;

function isNullOrUndefined(arg) {
  return arg == null;
}
exports.isNullOrUndefined = isNullOrUndefined;

function isNumber(arg) {
  return typeof arg === 'number';
}
exports.isNumber = isNumber;

function isString(arg) {
  return typeof arg === 'string';
}
exports.isString = isString;

function isSymbol(arg) {
  return typeof arg === 'symbol';
}
exports.isSymbol = isSymbol;

function isUndefined(arg) {
  return arg === void 0;
}
exports.isUndefined = isUndefined;

function isRegExp(re) {
  return objectToString(re) === '[object RegExp]';
}
exports.isRegExp = isRegExp;

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}
exports.isObject = isObject;

function isDate(d) {
  return objectToString(d) === '[object Date]';
}
exports.isDate = isDate;

function isError(e) {
  return (objectToString(e) === '[object Error]' || e instanceof Error);
}
exports.isError = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}
exports.isFunction = isFunction;

function isPrimitive(arg) {
  return arg === null ||
         typeof arg === 'boolean' ||
         typeof arg === 'number' ||
         typeof arg === 'string' ||
         typeof arg === 'symbol' ||  // ES6 symbol
         typeof arg === 'undefined';
}
exports.isPrimitive = isPrimitive;

exports.isBuffer = Buffer.isBuffer;

function objectToString(o) {
  return Object.prototype.toString.call(o);
}

}).call(this,{"isBuffer":require("../../is-buffer/index.js")})
},{"../../is-buffer/index.js":102}],83:[function(require,module,exports){
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

},{"./lib/is_arguments.js":84,"./lib/keys.js":85}],84:[function(require,module,exports){
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

},{}],85:[function(require,module,exports){
exports = module.exports = typeof Object.keys === 'function'
  ? Object.keys : shim;

exports.shim = shim;
function shim (obj) {
  var keys = [];
  for (var key in obj) keys.push(key);
  return keys;
}

},{}],86:[function(require,module,exports){
'use strict';

var keys = require('object-keys');
var foreach = require('foreach');
var hasSymbols = typeof Symbol === 'function' && typeof Symbol() === 'symbol';

var toStr = Object.prototype.toString;

var isFunction = function (fn) {
	return typeof fn === 'function' && toStr.call(fn) === '[object Function]';
};

var arePropertyDescriptorsSupported = function () {
	var obj = {};
	try {
		Object.defineProperty(obj, 'x', { enumerable: false, value: obj });
        /* eslint-disable no-unused-vars, no-restricted-syntax */
        for (var _ in obj) { return false; }
        /* eslint-enable no-unused-vars, no-restricted-syntax */
		return obj.x === obj;
	} catch (e) { /* this is IE 8. */
		return false;
	}
};
var supportsDescriptors = Object.defineProperty && arePropertyDescriptorsSupported();

var defineProperty = function (object, name, value, predicate) {
	if (name in object && (!isFunction(predicate) || !predicate())) {
		return;
	}
	if (supportsDescriptors) {
		Object.defineProperty(object, name, {
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
		props = props.concat(Object.getOwnPropertySymbols(map));
	}
	foreach(props, function (name) {
		defineProperty(object, name, map[name], predicates[name]);
	});
};

defineProperties.supportsDescriptors = !!supportsDescriptors;

module.exports = defineProperties;

},{"foreach":96,"object-keys":106}],87:[function(require,module,exports){
module.exports = function () {
    for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] !== undefined) return arguments[i];
    }
};

},{}],88:[function(require,module,exports){
'use strict';

var $isNaN = require('./helpers/isNaN');
var $isFinite = require('./helpers/isFinite');

var sign = require('./helpers/sign');
var mod = require('./helpers/mod');

var IsCallable = require('is-callable');
var toPrimitive = require('es-to-primitive/es5');

var has = require('has');

// https://es5.github.io/#x9
var ES5 = {
	ToPrimitive: toPrimitive,

	ToBoolean: function ToBoolean(value) {
		return !!value;
	},
	ToNumber: function ToNumber(value) {
		return Number(value);
	},
	ToInteger: function ToInteger(value) {
		var number = this.ToNumber(value);
		if ($isNaN(number)) { return 0; }
		if (number === 0 || !$isFinite(number)) { return number; }
		return sign(number) * Math.floor(Math.abs(number));
	},
	ToInt32: function ToInt32(x) {
		return this.ToNumber(x) >> 0;
	},
	ToUint32: function ToUint32(x) {
		return this.ToNumber(x) >>> 0;
	},
	ToUint16: function ToUint16(value) {
		var number = this.ToNumber(value);
		if ($isNaN(number) || number === 0 || !$isFinite(number)) { return 0; }
		var posInt = sign(number) * Math.floor(Math.abs(number));
		return mod(posInt, 0x10000);
	},
	ToString: function ToString(value) {
		return String(value);
	},
	ToObject: function ToObject(value) {
		this.CheckObjectCoercible(value);
		return Object(value);
	},
	CheckObjectCoercible: function CheckObjectCoercible(value, optMessage) {
		/* jshint eqnull:true */
		if (value == null) {
			throw new TypeError(optMessage || 'Cannot call method on ' + value);
		}
		return value;
	},
	IsCallable: IsCallable,
	SameValue: function SameValue(x, y) {
		if (x === y) { // 0 === -0, but they are not identical.
			if (x === 0) { return 1 / x === 1 / y; }
			return true;
		}
		return $isNaN(x) && $isNaN(y);
	},

	// http://www.ecma-international.org/ecma-262/5.1/#sec-8
	Type: function Type(x) {
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
	},

	// http://ecma-international.org/ecma-262/6.0/#sec-property-descriptor-specification-type
	IsPropertyDescriptor: function IsPropertyDescriptor(Desc) {
		if (this.Type(Desc) !== 'Object') {
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
		// jscs:disable
		for (var key in Desc) { // eslint-disable-line
			if (has(Desc, key) && !allowed[key]) {
				return false;
			}
		}
		// jscs:enable
		var isData = has(Desc, '[[Value]]');
		var IsAccessor = has(Desc, '[[Get]]') || has(Desc, '[[Set]]');
		if (isData && IsAccessor) {
			throw new TypeError('Property Descriptors may not be both accessor and data descriptors');
		}
		return true;
	},

	// http://ecma-international.org/ecma-262/5.1/#sec-8.10.1
	IsAccessorDescriptor: function IsAccessorDescriptor(Desc) {
		if (typeof Desc === 'undefined') {
			return false;
		}

		if (!this.IsPropertyDescriptor(Desc)) {
			throw new TypeError('Desc must be a Property Descriptor');
		}

		if (!has(Desc, '[[Get]]') && !has(Desc, '[[Set]]')) {
			return false;
		}

		return true;
	},

	// http://ecma-international.org/ecma-262/5.1/#sec-8.10.2
	IsDataDescriptor: function IsDataDescriptor(Desc) {
		if (typeof Desc === 'undefined') {
			return false;
		}

		if (!this.IsPropertyDescriptor(Desc)) {
			throw new TypeError('Desc must be a Property Descriptor');
		}

		if (!has(Desc, '[[Value]]') && !has(Desc, '[[Writable]]')) {
			return false;
		}

		return true;
	},

	// http://ecma-international.org/ecma-262/5.1/#sec-8.10.3
	IsGenericDescriptor: function IsGenericDescriptor(Desc) {
		if (typeof Desc === 'undefined') {
			return false;
		}

		if (!this.IsPropertyDescriptor(Desc)) {
			throw new TypeError('Desc must be a Property Descriptor');
		}

		if (!this.IsAccessorDescriptor(Desc) && !this.IsDataDescriptor(Desc)) {
			return true;
		}

		return false;
	},

	// http://ecma-international.org/ecma-262/5.1/#sec-8.10.4
	FromPropertyDescriptor: function FromPropertyDescriptor(Desc) {
		if (typeof Desc === 'undefined') {
			return Desc;
		}

		if (!this.IsPropertyDescriptor(Desc)) {
			throw new TypeError('Desc must be a Property Descriptor');
		}

		if (this.IsDataDescriptor(Desc)) {
			return {
				value: Desc['[[Value]]'],
				writable: !!Desc['[[Writable]]'],
				enumerable: !!Desc['[[Enumerable]]'],
				configurable: !!Desc['[[Configurable]]']
			};
		} else if (this.IsAccessorDescriptor(Desc)) {
			return {
				get: Desc['[[Get]]'],
				set: Desc['[[Set]]'],
				enumerable: !!Desc['[[Enumerable]]'],
				configurable: !!Desc['[[Configurable]]']
			};
		} else {
			throw new TypeError('FromPropertyDescriptor must be called with a fully populated Property Descriptor');
		}
	},

	// http://ecma-international.org/ecma-262/5.1/#sec-8.10.5
	ToPropertyDescriptor: function ToPropertyDescriptor(Obj) {
		if (this.Type(Obj) !== 'Object') {
			throw new TypeError('ToPropertyDescriptor requires an object');
		}

		var desc = {};
		if (has(Obj, 'enumerable')) {
			desc['[[Enumerable]]'] = this.ToBoolean(Obj.enumerable);
		}
		if (has(Obj, 'configurable')) {
			desc['[[Configurable]]'] = this.ToBoolean(Obj.configurable);
		}
		if (has(Obj, 'value')) {
			desc['[[Value]]'] = Obj.value;
		}
		if (has(Obj, 'writable')) {
			desc['[[Writable]]'] = this.ToBoolean(Obj.writable);
		}
		if (has(Obj, 'get')) {
			var getter = Obj.get;
			if (typeof getter !== 'undefined' && !this.IsCallable(getter)) {
				throw new TypeError('getter must be a function');
			}
			desc['[[Get]]'] = getter;
		}
		if (has(Obj, 'set')) {
			var setter = Obj.set;
			if (typeof setter !== 'undefined' && !this.IsCallable(setter)) {
				throw new TypeError('setter must be a function');
			}
			desc['[[Set]]'] = setter;
		}

		if ((has(desc, '[[Get]]') || has(desc, '[[Set]]')) && (has(desc, '[[Value]]') || has(desc, '[[Writable]]'))) {
			throw new TypeError('Invalid property descriptor. Cannot both specify accessors and a value or writable attribute');
		}
		return desc;
	}
};

module.exports = ES5;

},{"./helpers/isFinite":89,"./helpers/isNaN":90,"./helpers/mod":91,"./helpers/sign":92,"es-to-primitive/es5":93,"has":99,"is-callable":103}],89:[function(require,module,exports){
var $isNaN = Number.isNaN || function (a) { return a !== a; };

module.exports = Number.isFinite || function (x) { return typeof x === 'number' && !$isNaN(x) && x !== Infinity && x !== -Infinity; };

},{}],90:[function(require,module,exports){
module.exports = Number.isNaN || function isNaN(a) {
	return a !== a;
};

},{}],91:[function(require,module,exports){
module.exports = function mod(number, modulo) {
	var remain = number % modulo;
	return Math.floor(remain >= 0 ? remain : remain + modulo);
};

},{}],92:[function(require,module,exports){
module.exports = function sign(number) {
	return number >= 0 ? 1 : -1;
};

},{}],93:[function(require,module,exports){
'use strict';

var toStr = Object.prototype.toString;

var isPrimitive = require('./helpers/isPrimitive');

var isCallable = require('is-callable');

// https://es5.github.io/#x8.12
var ES5internalSlots = {
	'[[DefaultValue]]': function (O, hint) {
		var actualHint = hint || (toStr.call(O) === '[object Date]' ? String : Number);

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

// https://es5.github.io/#x9
module.exports = function ToPrimitive(input, PreferredType) {
	if (isPrimitive(input)) {
		return input;
	}
	return ES5internalSlots['[[DefaultValue]]'](input, PreferredType);
};

},{"./helpers/isPrimitive":94,"is-callable":103}],94:[function(require,module,exports){
module.exports = function isPrimitive(value) {
	return value === null || (typeof value !== 'function' && typeof value !== 'object');
};

},{}],95:[function(require,module,exports){
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

function EventEmitter() {
  this._events = this._events || {};
  this._maxListeners = this._maxListeners || undefined;
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
EventEmitter.defaultMaxListeners = 10;

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function(n) {
  if (!isNumber(n) || n < 0 || isNaN(n))
    throw TypeError('n must be a positive number');
  this._maxListeners = n;
  return this;
};

EventEmitter.prototype.emit = function(type) {
  var er, handler, len, args, i, listeners;

  if (!this._events)
    this._events = {};

  // If there is no 'error' event listener then throw.
  if (type === 'error') {
    if (!this._events.error ||
        (isObject(this._events.error) && !this._events.error.length)) {
      er = arguments[1];
      if (er instanceof Error) {
        throw er; // Unhandled 'error' event
      } else {
        // At least give some kind of context to the user
        var err = new Error('Uncaught, unspecified "error" event. (' + er + ')');
        err.context = er;
        throw err;
      }
    }
  }

  handler = this._events[type];

  if (isUndefined(handler))
    return false;

  if (isFunction(handler)) {
    switch (arguments.length) {
      // fast cases
      case 1:
        handler.call(this);
        break;
      case 2:
        handler.call(this, arguments[1]);
        break;
      case 3:
        handler.call(this, arguments[1], arguments[2]);
        break;
      // slower
      default:
        args = Array.prototype.slice.call(arguments, 1);
        handler.apply(this, args);
    }
  } else if (isObject(handler)) {
    args = Array.prototype.slice.call(arguments, 1);
    listeners = handler.slice();
    len = listeners.length;
    for (i = 0; i < len; i++)
      listeners[i].apply(this, args);
  }

  return true;
};

EventEmitter.prototype.addListener = function(type, listener) {
  var m;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events)
    this._events = {};

  // To avoid recursion in the case that type === "newListener"! Before
  // adding it to the listeners, first emit "newListener".
  if (this._events.newListener)
    this.emit('newListener', type,
              isFunction(listener.listener) ?
              listener.listener : listener);

  if (!this._events[type])
    // Optimize the case of one listener. Don't need the extra array object.
    this._events[type] = listener;
  else if (isObject(this._events[type]))
    // If we've already got an array, just append.
    this._events[type].push(listener);
  else
    // Adding the second element, need to change to array.
    this._events[type] = [this._events[type], listener];

  // Check for listener leak
  if (isObject(this._events[type]) && !this._events[type].warned) {
    if (!isUndefined(this._maxListeners)) {
      m = this._maxListeners;
    } else {
      m = EventEmitter.defaultMaxListeners;
    }

    if (m && m > 0 && this._events[type].length > m) {
      this._events[type].warned = true;
      console.error('(node) warning: possible EventEmitter memory ' +
                    'leak detected. %d listeners added. ' +
                    'Use emitter.setMaxListeners() to increase limit.',
                    this._events[type].length);
      if (typeof console.trace === 'function') {
        // not supported in IE 10
        console.trace();
      }
    }
  }

  return this;
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.once = function(type, listener) {
  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  var fired = false;

  function g() {
    this.removeListener(type, g);

    if (!fired) {
      fired = true;
      listener.apply(this, arguments);
    }
  }

  g.listener = listener;
  this.on(type, g);

  return this;
};

// emits a 'removeListener' event iff the listener was removed
EventEmitter.prototype.removeListener = function(type, listener) {
  var list, position, length, i;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events || !this._events[type])
    return this;

  list = this._events[type];
  length = list.length;
  position = -1;

  if (list === listener ||
      (isFunction(list.listener) && list.listener === listener)) {
    delete this._events[type];
    if (this._events.removeListener)
      this.emit('removeListener', type, listener);

  } else if (isObject(list)) {
    for (i = length; i-- > 0;) {
      if (list[i] === listener ||
          (list[i].listener && list[i].listener === listener)) {
        position = i;
        break;
      }
    }

    if (position < 0)
      return this;

    if (list.length === 1) {
      list.length = 0;
      delete this._events[type];
    } else {
      list.splice(position, 1);
    }

    if (this._events.removeListener)
      this.emit('removeListener', type, listener);
  }

  return this;
};

EventEmitter.prototype.removeAllListeners = function(type) {
  var key, listeners;

  if (!this._events)
    return this;

  // not listening for removeListener, no need to emit
  if (!this._events.removeListener) {
    if (arguments.length === 0)
      this._events = {};
    else if (this._events[type])
      delete this._events[type];
    return this;
  }

  // emit removeListener for all listeners on all events
  if (arguments.length === 0) {
    for (key in this._events) {
      if (key === 'removeListener') continue;
      this.removeAllListeners(key);
    }
    this.removeAllListeners('removeListener');
    this._events = {};
    return this;
  }

  listeners = this._events[type];

  if (isFunction(listeners)) {
    this.removeListener(type, listeners);
  } else if (listeners) {
    // LIFO order
    while (listeners.length)
      this.removeListener(type, listeners[listeners.length - 1]);
  }
  delete this._events[type];

  return this;
};

EventEmitter.prototype.listeners = function(type) {
  var ret;
  if (!this._events || !this._events[type])
    ret = [];
  else if (isFunction(this._events[type]))
    ret = [this._events[type]];
  else
    ret = this._events[type].slice();
  return ret;
};

EventEmitter.prototype.listenerCount = function(type) {
  if (this._events) {
    var evlistener = this._events[type];

    if (isFunction(evlistener))
      return 1;
    else if (evlistener)
      return evlistener.length;
  }
  return 0;
};

EventEmitter.listenerCount = function(emitter, type) {
  return emitter.listenerCount(type);
};

function isFunction(arg) {
  return typeof arg === 'function';
}

function isNumber(arg) {
  return typeof arg === 'number';
}

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}

function isUndefined(arg) {
  return arg === void 0;
}

},{}],96:[function(require,module,exports){

var hasOwn = Object.prototype.hasOwnProperty;
var toString = Object.prototype.toString;

module.exports = function forEach (obj, fn, ctx) {
    if (toString.call(fn) !== '[object Function]') {
        throw new TypeError('iterator must be a function');
    }
    var l = obj.length;
    if (l === +l) {
        for (var i = 0; i < l; i++) {
            fn.call(ctx, obj[i], i, obj);
        }
    } else {
        for (var k in obj) {
            if (hasOwn.call(obj, k)) {
                fn.call(ctx, obj[k], k, obj);
            }
        }
    }
};


},{}],97:[function(require,module,exports){
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

},{}],98:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

module.exports = Function.prototype.bind || implementation;

},{"./implementation":97}],99:[function(require,module,exports){
var bind = require('function-bind');

module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);

},{"function-bind":98}],100:[function(require,module,exports){
exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = nBytes * 8 - mLen - 1
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
  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

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
  var eLen = nBytes * 8 - mLen - 1
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
      m = (value * c - 1) * Math.pow(2, mLen)
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

},{}],101:[function(require,module,exports){
if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    var TempCtor = function () {}
    TempCtor.prototype = superCtor.prototype
    ctor.prototype = new TempCtor()
    ctor.prototype.constructor = ctor
  }
}

},{}],102:[function(require,module,exports){
/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */

// The _isBuffer check is for Safari 5-7 support, because it's missing
// Object.prototype.constructor. Remove this eventually
module.exports = function (obj) {
  return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer)
}

function isBuffer (obj) {
  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
}

// For Node v0.10 support. Remove this eventually.
function isSlowBuffer (obj) {
  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isBuffer(obj.slice(0, 0))
}

},{}],103:[function(require,module,exports){
'use strict';

var fnToStr = Function.prototype.toString;

var constructorRegex = /^\s*class /;
var isES6ClassFn = function isES6ClassFn(value) {
	try {
		var fnStr = fnToStr.call(value);
		var singleStripped = fnStr.replace(/\/\/.*\n/g, '');
		var multiStripped = singleStripped.replace(/\/\*[.\s\S]*\*\//g, '');
		var spaceStripped = multiStripped.replace(/\n/mg, ' ').replace(/ {2}/g, ' ');
		return constructorRegex.test(spaceStripped);
	} catch (e) {
		return false; // not a function
	}
};

var tryFunctionObject = function tryFunctionObject(value) {
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
var hasToStringTag = typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol';

module.exports = function isCallable(value) {
	if (!value) { return false; }
	if (typeof value !== 'function' && typeof value !== 'object') { return false; }
	if (hasToStringTag) { return tryFunctionObject(value); }
	if (isES6ClassFn(value)) { return false; }
	var strClass = toStr.call(value);
	return strClass === fnClass || strClass === genClass;
};

},{}],104:[function(require,module,exports){
var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};

},{}],105:[function(require,module,exports){
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

},{}],106:[function(require,module,exports){
'use strict';

// modified from https://github.com/es-shims/es5-shim
var has = Object.prototype.hasOwnProperty;
var toStr = Object.prototype.toString;
var slice = Array.prototype.slice;
var isArgs = require('./isArguments');
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
	$console: true,
	$external: true,
	$frame: true,
	$frameElement: true,
	$frames: true,
	$innerHeight: true,
	$innerWidth: true,
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

var keysShim = function keys(object) {
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

keysShim.shim = function shimObjectKeys() {
	if (Object.keys) {
		var keysWorksWithArguments = (function () {
			// Safari 5.0 bug
			return (Object.keys(arguments) || '').length === 2;
		}(1, 2));
		if (!keysWorksWithArguments) {
			var originalKeys = Object.keys;
			Object.keys = function keys(object) {
				if (isArgs(object)) {
					return originalKeys(slice.call(object));
				} else {
					return originalKeys(object);
				}
			};
		}
	} else {
		Object.keys = keysShim;
	}
	return Object.keys || keysShim;
};

module.exports = keysShim;

},{"./isArguments":107}],107:[function(require,module,exports){
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

},{}],108:[function(require,module,exports){
(function (process){
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

// resolves . and .. elements in a path array with directory names there
// must be no slashes, empty elements, or device names (c:\) in the array
// (so also no leading and trailing slashes - it does not distinguish
// relative and absolute paths)
function normalizeArray(parts, allowAboveRoot) {
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = parts.length - 1; i >= 0; i--) {
    var last = parts[i];
    if (last === '.') {
      parts.splice(i, 1);
    } else if (last === '..') {
      parts.splice(i, 1);
      up++;
    } else if (up) {
      parts.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (allowAboveRoot) {
    for (; up--; up) {
      parts.unshift('..');
    }
  }

  return parts;
}

// Split a filename into [root, dir, basename, ext], unix version
// 'root' is just a slash, or nothing.
var splitPathRe =
    /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
var splitPath = function(filename) {
  return splitPathRe.exec(filename).slice(1);
};

// path.resolve([from ...], to)
// posix version
exports.resolve = function() {
  var resolvedPath = '',
      resolvedAbsolute = false;

  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
    var path = (i >= 0) ? arguments[i] : process.cwd();

    // Skip empty and invalid entries
    if (typeof path !== 'string') {
      throw new TypeError('Arguments to path.resolve must be strings');
    } else if (!path) {
      continue;
    }

    resolvedPath = path + '/' + resolvedPath;
    resolvedAbsolute = path.charAt(0) === '/';
  }

  // At this point the path should be resolved to a full absolute path, but
  // handle relative paths to be safe (might happen when process.cwd() fails)

  // Normalize the path
  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
    return !!p;
  }), !resolvedAbsolute).join('/');

  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
};

// path.normalize(path)
// posix version
exports.normalize = function(path) {
  var isAbsolute = exports.isAbsolute(path),
      trailingSlash = substr(path, -1) === '/';

  // Normalize the path
  path = normalizeArray(filter(path.split('/'), function(p) {
    return !!p;
  }), !isAbsolute).join('/');

  if (!path && !isAbsolute) {
    path = '.';
  }
  if (path && trailingSlash) {
    path += '/';
  }

  return (isAbsolute ? '/' : '') + path;
};

// posix version
exports.isAbsolute = function(path) {
  return path.charAt(0) === '/';
};

// posix version
exports.join = function() {
  var paths = Array.prototype.slice.call(arguments, 0);
  return exports.normalize(filter(paths, function(p, index) {
    if (typeof p !== 'string') {
      throw new TypeError('Arguments to path.join must be strings');
    }
    return p;
  }).join('/'));
};


// path.relative(from, to)
// posix version
exports.relative = function(from, to) {
  from = exports.resolve(from).substr(1);
  to = exports.resolve(to).substr(1);

  function trim(arr) {
    var start = 0;
    for (; start < arr.length; start++) {
      if (arr[start] !== '') break;
    }

    var end = arr.length - 1;
    for (; end >= 0; end--) {
      if (arr[end] !== '') break;
    }

    if (start > end) return [];
    return arr.slice(start, end - start + 1);
  }

  var fromParts = trim(from.split('/'));
  var toParts = trim(to.split('/'));

  var length = Math.min(fromParts.length, toParts.length);
  var samePartsLength = length;
  for (var i = 0; i < length; i++) {
    if (fromParts[i] !== toParts[i]) {
      samePartsLength = i;
      break;
    }
  }

  var outputParts = [];
  for (var i = samePartsLength; i < fromParts.length; i++) {
    outputParts.push('..');
  }

  outputParts = outputParts.concat(toParts.slice(samePartsLength));

  return outputParts.join('/');
};

exports.sep = '/';
exports.delimiter = ':';

exports.dirname = function(path) {
  var result = splitPath(path),
      root = result[0],
      dir = result[1];

  if (!root && !dir) {
    // No dirname whatsoever
    return '.';
  }

  if (dir) {
    // It has a dirname, strip trailing slash
    dir = dir.substr(0, dir.length - 1);
  }

  return root + dir;
};


exports.basename = function(path, ext) {
  var f = splitPath(path)[2];
  // TODO: make this comparison case-insensitive on windows?
  if (ext && f.substr(-1 * ext.length) === ext) {
    f = f.substr(0, f.length - ext.length);
  }
  return f;
};


exports.extname = function(path) {
  return splitPath(path)[3];
};

function filter (xs, f) {
    if (xs.filter) return xs.filter(f);
    var res = [];
    for (var i = 0; i < xs.length; i++) {
        if (f(xs[i], i, xs)) res.push(xs[i]);
    }
    return res;
}

// String.prototype.substr - negative index don't work in IE8
var substr = 'ab'.substr(-1) === 'b'
    ? function (str, start, len) { return str.substr(start, len) }
    : function (str, start, len) {
        if (start < 0) start = str.length + start;
        return str.substr(start, len);
    }
;

}).call(this,require('_process'))
},{"_process":80}],109:[function(require,module,exports){
(function (process){
'use strict';

if (!process.version ||
    process.version.indexOf('v0.') === 0 ||
    process.version.indexOf('v1.') === 0 && process.version.indexOf('v1.8.') !== 0) {
  module.exports = nextTick;
} else {
  module.exports = process.nextTick;
}

function nextTick(fn, arg1, arg2, arg3) {
  if (typeof fn !== 'function') {
    throw new TypeError('"callback" argument must be a function');
  }
  var len = arguments.length;
  var args, i;
  switch (len) {
  case 0:
  case 1:
    return process.nextTick(fn);
  case 2:
    return process.nextTick(function afterTickOne() {
      fn.call(null, arg1);
    });
  case 3:
    return process.nextTick(function afterTickTwo() {
      fn.call(null, arg1, arg2);
    });
  case 4:
    return process.nextTick(function afterTickThree() {
      fn.call(null, arg1, arg2, arg3);
    });
  default:
    args = new Array(len - 1);
    i = 0;
    while (i < args.length) {
      args[i++] = arguments[i];
    }
    return process.nextTick(function afterTick() {
      fn.apply(null, args);
    });
  }
}

}).call(this,require('_process'))
},{"_process":80}],110:[function(require,module,exports){
module.exports = require('./lib/_stream_duplex.js');

},{"./lib/_stream_duplex.js":111}],111:[function(require,module,exports){
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

var processNextTick = require('process-nextick-args');
/*</replacement>*/

/*<replacement>*/
var objectKeys = Object.keys || function (obj) {
  var keys = [];
  for (var key in obj) {
    keys.push(key);
  }return keys;
};
/*</replacement>*/

module.exports = Duplex;

/*<replacement>*/
var util = require('core-util-is');
util.inherits = require('inherits');
/*</replacement>*/

var Readable = require('./_stream_readable');
var Writable = require('./_stream_writable');

util.inherits(Duplex, Readable);

var keys = objectKeys(Writable.prototype);
for (var v = 0; v < keys.length; v++) {
  var method = keys[v];
  if (!Duplex.prototype[method]) Duplex.prototype[method] = Writable.prototype[method];
}

function Duplex(options) {
  if (!(this instanceof Duplex)) return new Duplex(options);

  Readable.call(this, options);
  Writable.call(this, options);

  if (options && options.readable === false) this.readable = false;

  if (options && options.writable === false) this.writable = false;

  this.allowHalfOpen = true;
  if (options && options.allowHalfOpen === false) this.allowHalfOpen = false;

  this.once('end', onend);
}

// the no-half-open enforcer
function onend() {
  // if we allow half-open state, or if the writable side ended,
  // then we're ok.
  if (this.allowHalfOpen || this._writableState.ended) return;

  // no more data can be written.
  // But allow more writes to happen in this tick.
  processNextTick(onEndNT, this);
}

function onEndNT(self) {
  self.end();
}

Object.defineProperty(Duplex.prototype, 'destroyed', {
  get: function () {
    if (this._readableState === undefined || this._writableState === undefined) {
      return false;
    }
    return this._readableState.destroyed && this._writableState.destroyed;
  },
  set: function (value) {
    // we ignore the value if the stream
    // has not been initialized yet
    if (this._readableState === undefined || this._writableState === undefined) {
      return;
    }

    // backward compatibility, the user is explicitly
    // managing destroyed
    this._readableState.destroyed = value;
    this._writableState.destroyed = value;
  }
});

Duplex.prototype._destroy = function (err, cb) {
  this.push(null);
  this.end();

  processNextTick(cb, err);
};

function forEach(xs, f) {
  for (var i = 0, l = xs.length; i < l; i++) {
    f(xs[i], i);
  }
}
},{"./_stream_readable":113,"./_stream_writable":115,"core-util-is":82,"inherits":101,"process-nextick-args":109}],112:[function(require,module,exports){
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

/*<replacement>*/
var util = require('core-util-is');
util.inherits = require('inherits');
/*</replacement>*/

util.inherits(PassThrough, Transform);

function PassThrough(options) {
  if (!(this instanceof PassThrough)) return new PassThrough(options);

  Transform.call(this, options);
}

PassThrough.prototype._transform = function (chunk, encoding, cb) {
  cb(null, chunk);
};
},{"./_stream_transform":114,"core-util-is":82,"inherits":101}],113:[function(require,module,exports){
(function (process,global){
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

var processNextTick = require('process-nextick-args');
/*</replacement>*/

module.exports = Readable;

/*<replacement>*/
var isArray = require('isarray');
/*</replacement>*/

/*<replacement>*/
var Duplex;
/*</replacement>*/

Readable.ReadableState = ReadableState;

/*<replacement>*/
var EE = require('events').EventEmitter;

var EElistenerCount = function (emitter, type) {
  return emitter.listeners(type).length;
};
/*</replacement>*/

/*<replacement>*/
var Stream = require('./internal/streams/stream');
/*</replacement>*/

// TODO(bmeurer): Change this back to const once hole checks are
// properly optimized away early in Ignition+TurboFan.
/*<replacement>*/
var Buffer = require('safe-buffer').Buffer;
var OurUint8Array = global.Uint8Array || function () {};
function _uint8ArrayToBuffer(chunk) {
  return Buffer.from(chunk);
}
function _isUint8Array(obj) {
  return Buffer.isBuffer(obj) || obj instanceof OurUint8Array;
}
/*</replacement>*/

/*<replacement>*/
var util = require('core-util-is');
util.inherits = require('inherits');
/*</replacement>*/

/*<replacement>*/
var debugUtil = require('util');
var debug = void 0;
if (debugUtil && debugUtil.debuglog) {
  debug = debugUtil.debuglog('stream');
} else {
  debug = function () {};
}
/*</replacement>*/

var BufferList = require('./internal/streams/BufferList');
var destroyImpl = require('./internal/streams/destroy');
var StringDecoder;

util.inherits(Readable, Stream);

var kProxyEvents = ['error', 'close', 'destroy', 'pause', 'resume'];

function prependListener(emitter, event, fn) {
  // Sadly this is not cacheable as some libraries bundle their own
  // event emitter implementation with them.
  if (typeof emitter.prependListener === 'function') {
    return emitter.prependListener(event, fn);
  } else {
    // This is a hack to make sure that our error handler is attached before any
    // userland ones.  NEVER DO THIS. This is here only because this code needs
    // to continue to work with older versions of Node.js that do not include
    // the prependListener() method. The goal is to eventually remove this hack.
    if (!emitter._events || !emitter._events[event]) emitter.on(event, fn);else if (isArray(emitter._events[event])) emitter._events[event].unshift(fn);else emitter._events[event] = [fn, emitter._events[event]];
  }
}

function ReadableState(options, stream) {
  Duplex = Duplex || require('./_stream_duplex');

  options = options || {};

  // object stream flag. Used to make read(n) ignore n and to
  // make all the buffer merging and length checks go away
  this.objectMode = !!options.objectMode;

  if (stream instanceof Duplex) this.objectMode = this.objectMode || !!options.readableObjectMode;

  // the point at which it stops calling _read() to fill the buffer
  // Note: 0 is a valid value, means "don't call _read preemptively ever"
  var hwm = options.highWaterMark;
  var defaultHwm = this.objectMode ? 16 : 16 * 1024;
  this.highWaterMark = hwm || hwm === 0 ? hwm : defaultHwm;

  // cast to ints.
  this.highWaterMark = Math.floor(this.highWaterMark);

  // A linked list is used to store data chunks instead of an array because the
  // linked list can remove elements from the beginning faster than
  // array.shift()
  this.buffer = new BufferList();
  this.length = 0;
  this.pipes = null;
  this.pipesCount = 0;
  this.flowing = null;
  this.ended = false;
  this.endEmitted = false;
  this.reading = false;

  // a flag to be able to tell if the event 'readable'/'data' is emitted
  // immediately, or on a later tick.  We set this to true at first, because
  // any actions that shouldn't happen until "later" should generally also
  // not happen before the first read call.
  this.sync = true;

  // whenever we return null, then we set a flag to say
  // that we're awaiting a 'readable' event emission.
  this.needReadable = false;
  this.emittedReadable = false;
  this.readableListening = false;
  this.resumeScheduled = false;

  // has it been destroyed
  this.destroyed = false;

  // Crypto is kind of old and crusty.  Historically, its default string
  // encoding is 'binary' so we have to make this configurable.
  // Everything else in the universe uses 'utf8', though.
  this.defaultEncoding = options.defaultEncoding || 'utf8';

  // the number of writers that are awaiting a drain event in .pipe()s
  this.awaitDrain = 0;

  // if true, a maybeReadMore has been scheduled
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

  if (!(this instanceof Readable)) return new Readable(options);

  this._readableState = new ReadableState(options, this);

  // legacy
  this.readable = true;

  if (options) {
    if (typeof options.read === 'function') this._read = options.read;

    if (typeof options.destroy === 'function') this._destroy = options.destroy;
  }

  Stream.call(this);
}

Object.defineProperty(Readable.prototype, 'destroyed', {
  get: function () {
    if (this._readableState === undefined) {
      return false;
    }
    return this._readableState.destroyed;
  },
  set: function (value) {
    // we ignore the value if the stream
    // has not been initialized yet
    if (!this._readableState) {
      return;
    }

    // backward compatibility, the user is explicitly
    // managing destroyed
    this._readableState.destroyed = value;
  }
});

Readable.prototype.destroy = destroyImpl.destroy;
Readable.prototype._undestroy = destroyImpl.undestroy;
Readable.prototype._destroy = function (err, cb) {
  this.push(null);
  cb(err);
};

// Manually shove something into the read() buffer.
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
};

// Unshift should *always* be something directly out of read()
Readable.prototype.unshift = function (chunk) {
  return readableAddChunk(this, chunk, null, true, false);
};

function readableAddChunk(stream, chunk, encoding, addToFront, skipChunkCheck) {
  var state = stream._readableState;
  if (chunk === null) {
    state.reading = false;
    onEofChunk(stream, state);
  } else {
    var er;
    if (!skipChunkCheck) er = chunkInvalid(state, chunk);
    if (er) {
      stream.emit('error', er);
    } else if (state.objectMode || chunk && chunk.length > 0) {
      if (typeof chunk !== 'string' && !state.objectMode && Object.getPrototypeOf(chunk) !== Buffer.prototype) {
        chunk = _uint8ArrayToBuffer(chunk);
      }

      if (addToFront) {
        if (state.endEmitted) stream.emit('error', new Error('stream.unshift() after end event'));else addChunk(stream, state, chunk, true);
      } else if (state.ended) {
        stream.emit('error', new Error('stream.push() after EOF'));
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
    }
  }

  return needMoreData(state);
}

function addChunk(stream, state, chunk, addToFront) {
  if (state.flowing && state.length === 0 && !state.sync) {
    stream.emit('data', chunk);
    stream.read(0);
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
    er = new TypeError('Invalid non-string/buffer chunk');
  }
  return er;
}

// if it's past the high water mark, we can push in some more.
// Also, if we have no data yet, we can stand some
// more bytes.  This is to work around cases where hwm=0,
// such as the repl.  Also, if the push() triggered a
// readable event, and the user called read(largeNumber) such that
// needReadable was set, then we ought to push more, so that another
// 'readable' event will be triggered.
function needMoreData(state) {
  return !state.ended && (state.needReadable || state.length < state.highWaterMark || state.length === 0);
}

Readable.prototype.isPaused = function () {
  return this._readableState.flowing === false;
};

// backwards compatibility.
Readable.prototype.setEncoding = function (enc) {
  if (!StringDecoder) StringDecoder = require('string_decoder/').StringDecoder;
  this._readableState.decoder = new StringDecoder(enc);
  this._readableState.encoding = enc;
  return this;
};

// Don't raise the hwm > 8MB
var MAX_HWM = 0x800000;
function computeNewHighWaterMark(n) {
  if (n >= MAX_HWM) {
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
}

// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function howMuchToRead(n, state) {
  if (n <= 0 || state.length === 0 && state.ended) return 0;
  if (state.objectMode) return 1;
  if (n !== n) {
    // Only flow one buffer at a time
    if (state.flowing && state.length) return state.buffer.head.data.length;else return state.length;
  }
  // If we're asking for more than the current hwm, then raise the hwm.
  if (n > state.highWaterMark) state.highWaterMark = computeNewHighWaterMark(n);
  if (n <= state.length) return n;
  // Don't have enough
  if (!state.ended) {
    state.needReadable = true;
    return 0;
  }
  return state.length;
}

// you can override either this method, or the async _read(n) below.
Readable.prototype.read = function (n) {
  debug('read', n);
  n = parseInt(n, 10);
  var state = this._readableState;
  var nOrig = n;

  if (n !== 0) state.emittedReadable = false;

  // if we're doing read(0) to trigger a readable event, but we
  // already have a bunch of data in the buffer, then just trigger
  // the 'readable' event and move on.
  if (n === 0 && state.needReadable && (state.length >= state.highWaterMark || state.ended)) {
    debug('read: emitReadable', state.length, state.ended);
    if (state.length === 0 && state.ended) endReadable(this);else emitReadable(this);
    return null;
  }

  n = howMuchToRead(n, state);

  // if we've ended, and we're now clear, then finish it up.
  if (n === 0 && state.ended) {
    if (state.length === 0) endReadable(this);
    return null;
  }

  // All the actual chunk generation logic needs to be
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
  debug('need readable', doRead);

  // if we currently have less than the highWaterMark, then also read some
  if (state.length === 0 || state.length - n < state.highWaterMark) {
    doRead = true;
    debug('length less than watermark', doRead);
  }

  // however, if we've ended, then there's no point, and if we're already
  // reading, then it's unnecessary.
  if (state.ended || state.reading) {
    doRead = false;
    debug('reading or ended', doRead);
  } else if (doRead) {
    debug('do read');
    state.reading = true;
    state.sync = true;
    // if the length is currently zero, then we *need* a readable event.
    if (state.length === 0) state.needReadable = true;
    // call internal read method
    this._read(state.highWaterMark);
    state.sync = false;
    // If _read pushed data synchronously, then `reading` will be false,
    // and we need to re-evaluate how much data we can return to the user.
    if (!state.reading) n = howMuchToRead(nOrig, state);
  }

  var ret;
  if (n > 0) ret = fromList(n, state);else ret = null;

  if (ret === null) {
    state.needReadable = true;
    n = 0;
  } else {
    state.length -= n;
  }

  if (state.length === 0) {
    // If we have nothing in the buffer, then we want to know
    // as soon as we *do* get something into the buffer.
    if (!state.ended) state.needReadable = true;

    // If we tried to read() past the EOF, then emit end on the next tick.
    if (nOrig !== n && state.ended) endReadable(this);
  }

  if (ret !== null) this.emit('data', ret);

  return ret;
};

function onEofChunk(stream, state) {
  if (state.ended) return;
  if (state.decoder) {
    var chunk = state.decoder.end();
    if (chunk && chunk.length) {
      state.buffer.push(chunk);
      state.length += state.objectMode ? 1 : chunk.length;
    }
  }
  state.ended = true;

  // emit 'readable' now to make sure it gets picked up.
  emitReadable(stream);
}

// Don't emit readable right away in sync mode, because this can trigger
// another read() call => stack overflow.  This way, it might trigger
// a nextTick recursion warning, but that's not so bad.
function emitReadable(stream) {
  var state = stream._readableState;
  state.needReadable = false;
  if (!state.emittedReadable) {
    debug('emitReadable', state.flowing);
    state.emittedReadable = true;
    if (state.sync) processNextTick(emitReadable_, stream);else emitReadable_(stream);
  }
}

function emitReadable_(stream) {
  debug('emit readable');
  stream.emit('readable');
  flow(stream);
}

// at this point, the user has presumably seen the 'readable' event,
// and called read() to consume some data.  that may have triggered
// in turn another _read(n) call, in which case reading = true if
// it's in progress.
// However, if we're not ended, or reading, and the length < hwm,
// then go ahead and try to read some more preemptively.
function maybeReadMore(stream, state) {
  if (!state.readingMore) {
    state.readingMore = true;
    processNextTick(maybeReadMore_, stream, state);
  }
}

function maybeReadMore_(stream, state) {
  var len = state.length;
  while (!state.reading && !state.flowing && !state.ended && state.length < state.highWaterMark) {
    debug('maybeReadMore read 0');
    stream.read(0);
    if (len === state.length)
      // didn't get any data, stop spinning.
      break;else len = state.length;
  }
  state.readingMore = false;
}

// abstract method.  to be overridden in specific implementation classes.
// call cb(er, data) where data is <= n in length.
// for virtual (non-string, non-buffer) streams, "length" is somewhat
// arbitrary, and perhaps not very meaningful.
Readable.prototype._read = function (n) {
  this.emit('error', new Error('_read() is not implemented'));
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
  if (state.endEmitted) processNextTick(endFn);else src.once('end', endFn);

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
  }

  // when the dest drains, it reduces the awaitDrain counter
  // on the source.  This would be more elegant with a .once()
  // handler in flow(), but adding and removing repeatedly is
  // too slow.
  var ondrain = pipeOnDrain(src);
  dest.on('drain', ondrain);

  var cleanedUp = false;
  function cleanup() {
    debug('cleanup');
    // cleanup event handlers once the pipe is broken
    dest.removeListener('close', onclose);
    dest.removeListener('finish', onfinish);
    dest.removeListener('drain', ondrain);
    dest.removeListener('error', onerror);
    dest.removeListener('unpipe', onunpipe);
    src.removeListener('end', onend);
    src.removeListener('end', unpipe);
    src.removeListener('data', ondata);

    cleanedUp = true;

    // if the reader is waiting for a drain event from this
    // specific writer, then it would cause it to never start
    // flowing again.
    // So, if this is awaiting a drain, then we just call it now.
    // If we don't know, then assume that we are waiting for one.
    if (state.awaitDrain && (!dest._writableState || dest._writableState.needDrain)) ondrain();
  }

  // If the user pushes more data while we're writing to dest then we'll end up
  // in ondata again. However, we only want to increase awaitDrain once because
  // dest will only emit one 'drain' event for the multiple writes.
  // => Introduce a guard on increasing awaitDrain.
  var increasedAwaitDrain = false;
  src.on('data', ondata);
  function ondata(chunk) {
    debug('ondata');
    increasedAwaitDrain = false;
    var ret = dest.write(chunk);
    if (false === ret && !increasedAwaitDrain) {
      // If the user unpiped during `dest.write()`, it is possible
      // to get stuck in a permanently paused state if that write
      // also returned false.
      // => Check whether `dest` is still a piping destination.
      if ((state.pipesCount === 1 && state.pipes === dest || state.pipesCount > 1 && indexOf(state.pipes, dest) !== -1) && !cleanedUp) {
        debug('false write response, pause', src._readableState.awaitDrain);
        src._readableState.awaitDrain++;
        increasedAwaitDrain = true;
      }
      src.pause();
    }
  }

  // if the dest has an error, then stop piping into it.
  // however, don't suppress the throwing behavior for this.
  function onerror(er) {
    debug('onerror', er);
    unpipe();
    dest.removeListener('error', onerror);
    if (EElistenerCount(dest, 'error') === 0) dest.emit('error', er);
  }

  // Make sure our error handler is attached before userland ones.
  prependListener(dest, 'error', onerror);

  // Both close and finish should trigger unpipe, but only once.
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
  }

  // tell the dest that it's being piped to
  dest.emit('pipe', src);

  // start the flow if it hasn't been started already.
  if (!state.flowing) {
    debug('pipe resume');
    src.resume();
  }

  return dest;
};

function pipeOnDrain(src) {
  return function () {
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
  var unpipeInfo = { hasUnpiped: false };

  // if we're not piping anywhere, then do nothing.
  if (state.pipesCount === 0) return this;

  // just one destination.  most common case.
  if (state.pipesCount === 1) {
    // passed in one, but it's not the right one.
    if (dest && dest !== state.pipes) return this;

    if (!dest) dest = state.pipes;

    // got a match.
    state.pipes = null;
    state.pipesCount = 0;
    state.flowing = false;
    if (dest) dest.emit('unpipe', this, unpipeInfo);
    return this;
  }

  // slow case. multiple pipe destinations.

  if (!dest) {
    // remove all.
    var dests = state.pipes;
    var len = state.pipesCount;
    state.pipes = null;
    state.pipesCount = 0;
    state.flowing = false;

    for (var i = 0; i < len; i++) {
      dests[i].emit('unpipe', this, unpipeInfo);
    }return this;
  }

  // try to find the right one.
  var index = indexOf(state.pipes, dest);
  if (index === -1) return this;

  state.pipes.splice(index, 1);
  state.pipesCount -= 1;
  if (state.pipesCount === 1) state.pipes = state.pipes[0];

  dest.emit('unpipe', this, unpipeInfo);

  return this;
};

// set up data events if they are asked for
// Ensure readable listeners eventually get something
Readable.prototype.on = function (ev, fn) {
  var res = Stream.prototype.on.call(this, ev, fn);

  if (ev === 'data') {
    // Start flowing on next tick if stream isn't explicitly paused
    if (this._readableState.flowing !== false) this.resume();
  } else if (ev === 'readable') {
    var state = this._readableState;
    if (!state.endEmitted && !state.readableListening) {
      state.readableListening = state.needReadable = true;
      state.emittedReadable = false;
      if (!state.reading) {
        processNextTick(nReadingNextTick, this);
      } else if (state.length) {
        emitReadable(this);
      }
    }
  }

  return res;
};
Readable.prototype.addListener = Readable.prototype.on;

function nReadingNextTick(self) {
  debug('readable nexttick read 0');
  self.read(0);
}

// pause() and resume() are remnants of the legacy readable stream API
// If the user uses them, then switch into old mode.
Readable.prototype.resume = function () {
  var state = this._readableState;
  if (!state.flowing) {
    debug('resume');
    state.flowing = true;
    resume(this, state);
  }
  return this;
};

function resume(stream, state) {
  if (!state.resumeScheduled) {
    state.resumeScheduled = true;
    processNextTick(resume_, stream, state);
  }
}

function resume_(stream, state) {
  if (!state.reading) {
    debug('resume read 0');
    stream.read(0);
  }

  state.resumeScheduled = false;
  state.awaitDrain = 0;
  stream.emit('resume');
  flow(stream);
  if (state.flowing && !state.reading) stream.read(0);
}

Readable.prototype.pause = function () {
  debug('call pause flowing=%j', this._readableState.flowing);
  if (false !== this._readableState.flowing) {
    debug('pause');
    this._readableState.flowing = false;
    this.emit('pause');
  }
  return this;
};

function flow(stream) {
  var state = stream._readableState;
  debug('flow', state.flowing);
  while (state.flowing && stream.read() !== null) {}
}

// wrap an old-style stream as the async data source.
// This is *not* part of the readable stream interface.
// It is an ugly unfortunate mess of history.
Readable.prototype.wrap = function (stream) {
  var state = this._readableState;
  var paused = false;

  var self = this;
  stream.on('end', function () {
    debug('wrapped end');
    if (state.decoder && !state.ended) {
      var chunk = state.decoder.end();
      if (chunk && chunk.length) self.push(chunk);
    }

    self.push(null);
  });

  stream.on('data', function (chunk) {
    debug('wrapped data');
    if (state.decoder) chunk = state.decoder.write(chunk);

    // don't skip over falsy values in objectMode
    if (state.objectMode && (chunk === null || chunk === undefined)) return;else if (!state.objectMode && (!chunk || !chunk.length)) return;

    var ret = self.push(chunk);
    if (!ret) {
      paused = true;
      stream.pause();
    }
  });

  // proxy all the other methods.
  // important when wrapping filters and duplexes.
  for (var i in stream) {
    if (this[i] === undefined && typeof stream[i] === 'function') {
      this[i] = function (method) {
        return function () {
          return stream[method].apply(stream, arguments);
        };
      }(i);
    }
  }

  // proxy certain important events.
  for (var n = 0; n < kProxyEvents.length; n++) {
    stream.on(kProxyEvents[n], self.emit.bind(self, kProxyEvents[n]));
  }

  // when we try to consume some more bytes, simply unpause the
  // underlying stream.
  self._read = function (n) {
    debug('wrapped _read', n);
    if (paused) {
      paused = false;
      stream.resume();
    }
  };

  return self;
};

// exposed for testing purposes only.
Readable._fromList = fromList;

// Pluck off n bytes from an array of buffers.
// Length is the combined lengths of all the buffers in the list.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function fromList(n, state) {
  // nothing buffered
  if (state.length === 0) return null;

  var ret;
  if (state.objectMode) ret = state.buffer.shift();else if (!n || n >= state.length) {
    // read it all, truncate the list
    if (state.decoder) ret = state.buffer.join('');else if (state.buffer.length === 1) ret = state.buffer.head.data;else ret = state.buffer.concat(state.length);
    state.buffer.clear();
  } else {
    // read part of list
    ret = fromListPartial(n, state.buffer, state.decoder);
  }

  return ret;
}

// Extracts only enough buffered data to satisfy the amount requested.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function fromListPartial(n, list, hasStrings) {
  var ret;
  if (n < list.head.data.length) {
    // slice is the same for buffers and strings
    ret = list.head.data.slice(0, n);
    list.head.data = list.head.data.slice(n);
  } else if (n === list.head.data.length) {
    // first chunk is a perfect match
    ret = list.shift();
  } else {
    // result spans more than one buffer
    ret = hasStrings ? copyFromBufferString(n, list) : copyFromBuffer(n, list);
  }
  return ret;
}

// Copies a specified amount of characters from the list of buffered data
// chunks.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function copyFromBufferString(n, list) {
  var p = list.head;
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
        if (p.next) list.head = p.next;else list.head = list.tail = null;
      } else {
        list.head = p;
        p.data = str.slice(nb);
      }
      break;
    }
    ++c;
  }
  list.length -= c;
  return ret;
}

// Copies a specified amount of bytes from the list of buffered data chunks.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function copyFromBuffer(n, list) {
  var ret = Buffer.allocUnsafe(n);
  var p = list.head;
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
        if (p.next) list.head = p.next;else list.head = list.tail = null;
      } else {
        list.head = p;
        p.data = buf.slice(nb);
      }
      break;
    }
    ++c;
  }
  list.length -= c;
  return ret;
}

function endReadable(stream) {
  var state = stream._readableState;

  // If we get here before consuming all the bytes, then that is a
  // bug in node.  Should never happen.
  if (state.length > 0) throw new Error('"endReadable()" called on non-empty stream');

  if (!state.endEmitted) {
    state.ended = true;
    processNextTick(endReadableNT, state, stream);
  }
}

function endReadableNT(state, stream) {
  // Check that we didn't get one last unshift.
  if (!state.endEmitted && state.length === 0) {
    state.endEmitted = true;
    stream.readable = false;
    stream.emit('end');
  }
}

function forEach(xs, f) {
  for (var i = 0, l = xs.length; i < l; i++) {
    f(xs[i], i);
  }
}

function indexOf(xs, x) {
  for (var i = 0, l = xs.length; i < l; i++) {
    if (xs[i] === x) return i;
  }
  return -1;
}
}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./_stream_duplex":111,"./internal/streams/BufferList":116,"./internal/streams/destroy":117,"./internal/streams/stream":118,"_process":80,"core-util-is":82,"events":95,"inherits":101,"isarray":104,"process-nextick-args":109,"safe-buffer":124,"string_decoder/":130,"util":78}],114:[function(require,module,exports){
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

var Duplex = require('./_stream_duplex');

/*<replacement>*/
var util = require('core-util-is');
util.inherits = require('inherits');
/*</replacement>*/

util.inherits(Transform, Duplex);

function TransformState(stream) {
  this.afterTransform = function (er, data) {
    return afterTransform(stream, er, data);
  };

  this.needTransform = false;
  this.transforming = false;
  this.writecb = null;
  this.writechunk = null;
  this.writeencoding = null;
}

function afterTransform(stream, er, data) {
  var ts = stream._transformState;
  ts.transforming = false;

  var cb = ts.writecb;

  if (!cb) {
    return stream.emit('error', new Error('write callback called multiple times'));
  }

  ts.writechunk = null;
  ts.writecb = null;

  if (data !== null && data !== undefined) stream.push(data);

  cb(er);

  var rs = stream._readableState;
  rs.reading = false;
  if (rs.needReadable || rs.length < rs.highWaterMark) {
    stream._read(rs.highWaterMark);
  }
}

function Transform(options) {
  if (!(this instanceof Transform)) return new Transform(options);

  Duplex.call(this, options);

  this._transformState = new TransformState(this);

  var stream = this;

  // start out asking for a readable event once data is transformed.
  this._readableState.needReadable = true;

  // we have implemented the _read method, and done the other things
  // that Readable wants before the first _read call, so unset the
  // sync guard flag.
  this._readableState.sync = false;

  if (options) {
    if (typeof options.transform === 'function') this._transform = options.transform;

    if (typeof options.flush === 'function') this._flush = options.flush;
  }

  // When the writable side finishes, then flush out anything remaining.
  this.once('prefinish', function () {
    if (typeof this._flush === 'function') this._flush(function (er, data) {
      done(stream, er, data);
    });else done(stream);
  });
}

Transform.prototype.push = function (chunk, encoding) {
  this._transformState.needTransform = false;
  return Duplex.prototype.push.call(this, chunk, encoding);
};

// This is the part where you do stuff!
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
  throw new Error('_transform() is not implemented');
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
};

// Doesn't matter what the args are here.
// _transform does all the work.
// That we got here means that the readable side wants more data.
Transform.prototype._read = function (n) {
  var ts = this._transformState;

  if (ts.writechunk !== null && ts.writecb && !ts.transforming) {
    ts.transforming = true;
    this._transform(ts.writechunk, ts.writeencoding, ts.afterTransform);
  } else {
    // mark that we need a transform, so that any data that comes in
    // will get processed, now that we've asked for it.
    ts.needTransform = true;
  }
};

Transform.prototype._destroy = function (err, cb) {
  var _this = this;

  Duplex.prototype._destroy.call(this, err, function (err2) {
    cb(err2);
    _this.emit('close');
  });
};

function done(stream, er, data) {
  if (er) return stream.emit('error', er);

  if (data !== null && data !== undefined) stream.push(data);

  // if there's nothing in the write buffer, then that means
  // that nothing more will ever be provided
  var ws = stream._writableState;
  var ts = stream._transformState;

  if (ws.length) throw new Error('Calling transform done when ws.length != 0');

  if (ts.transforming) throw new Error('Calling transform done when still transforming');

  return stream.push(null);
}
},{"./_stream_duplex":111,"core-util-is":82,"inherits":101}],115:[function(require,module,exports){
(function (process,global){
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

/*<replacement>*/

var processNextTick = require('process-nextick-args');
/*</replacement>*/

module.exports = Writable;

/* <replacement> */
function WriteReq(chunk, encoding, cb) {
  this.chunk = chunk;
  this.encoding = encoding;
  this.callback = cb;
  this.next = null;
}

// It seems a linked list but it is not
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
var asyncWrite = !process.browser && ['v0.10', 'v0.9.'].indexOf(process.version.slice(0, 5)) > -1 ? setImmediate : processNextTick;
/*</replacement>*/

/*<replacement>*/
var Duplex;
/*</replacement>*/

Writable.WritableState = WritableState;

/*<replacement>*/
var util = require('core-util-is');
util.inherits = require('inherits');
/*</replacement>*/

/*<replacement>*/
var internalUtil = {
  deprecate: require('util-deprecate')
};
/*</replacement>*/

/*<replacement>*/
var Stream = require('./internal/streams/stream');
/*</replacement>*/

/*<replacement>*/
var Buffer = require('safe-buffer').Buffer;
var OurUint8Array = global.Uint8Array || function () {};
function _uint8ArrayToBuffer(chunk) {
  return Buffer.from(chunk);
}
function _isUint8Array(obj) {
  return Buffer.isBuffer(obj) || obj instanceof OurUint8Array;
}
/*</replacement>*/

var destroyImpl = require('./internal/streams/destroy');

util.inherits(Writable, Stream);

function nop() {}

function WritableState(options, stream) {
  Duplex = Duplex || require('./_stream_duplex');

  options = options || {};

  // object stream flag to indicate whether or not this stream
  // contains buffers or objects.
  this.objectMode = !!options.objectMode;

  if (stream instanceof Duplex) this.objectMode = this.objectMode || !!options.writableObjectMode;

  // the point at which write() starts returning false
  // Note: 0 is a valid value, means that we always return false if
  // the entire buffer is not flushed immediately on write()
  var hwm = options.highWaterMark;
  var defaultHwm = this.objectMode ? 16 : 16 * 1024;
  this.highWaterMark = hwm || hwm === 0 ? hwm : defaultHwm;

  // cast to ints.
  this.highWaterMark = Math.floor(this.highWaterMark);

  // if _final has been called
  this.finalCalled = false;

  // drain event flag.
  this.needDrain = false;
  // at the start of calling end()
  this.ending = false;
  // when end() has been called, and returned
  this.ended = false;
  // when 'finish' is emitted
  this.finished = false;

  // has it been destroyed
  this.destroyed = false;

  // should we decode strings into buffers before passing to _write?
  // this is here so that some node-core streams can optimize string
  // handling at a lower level.
  var noDecode = options.decodeStrings === false;
  this.decodeStrings = !noDecode;

  // Crypto is kind of old and crusty.  Historically, its default string
  // encoding is 'binary' so we have to make this configurable.
  // Everything else in the universe uses 'utf8', though.
  this.defaultEncoding = options.defaultEncoding || 'utf8';

  // not an actual buffer we keep track of, but a measurement
  // of how much we're waiting to get pushed to some underlying
  // socket or file.
  this.length = 0;

  // a flag to see when we're in the middle of a write.
  this.writing = false;

  // when true all writes will be buffered until .uncork() call
  this.corked = 0;

  // a flag to be able to tell if the onwrite cb is called immediately,
  // or on a later tick.  We set this to true at first, because any
  // actions that shouldn't happen until "later" should generally also
  // not happen before the first write call.
  this.sync = true;

  // a flag to know if we're processing previously buffered items, which
  // may call the _write() callback in the same tick, so that we don't
  // end up in an overlapped onwrite situation.
  this.bufferProcessing = false;

  // the callback that's passed to _write(chunk,cb)
  this.onwrite = function (er) {
    onwrite(stream, er);
  };

  // the callback that the user supplies to write(chunk,encoding,cb)
  this.writecb = null;

  // the amount that is being written when _write is called.
  this.writelen = 0;

  this.bufferedRequest = null;
  this.lastBufferedRequest = null;

  // number of pending user-supplied write callbacks
  // this must be 0 before 'finish' can be emitted
  this.pendingcb = 0;

  // emit prefinish if the only thing we're waiting for is _write cbs
  // This is relevant for synchronous Transform streams
  this.prefinished = false;

  // True if the error was already emitted and should not be thrown again
  this.errorEmitted = false;

  // count buffered requests
  this.bufferedRequestCount = 0;

  // allocate the first CorkedRequest, there is always
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
      get: internalUtil.deprecate(function () {
        return this.getBuffer();
      }, '_writableState.buffer is deprecated. Use _writableState.getBuffer ' + 'instead.', 'DEP0003')
    });
  } catch (_) {}
})();

// Test _writableState for inheritance to account for Duplex streams,
// whose prototype chain only points to Readable.
var realHasInstance;
if (typeof Symbol === 'function' && Symbol.hasInstance && typeof Function.prototype[Symbol.hasInstance] === 'function') {
  realHasInstance = Function.prototype[Symbol.hasInstance];
  Object.defineProperty(Writable, Symbol.hasInstance, {
    value: function (object) {
      if (realHasInstance.call(this, object)) return true;

      return object && object._writableState instanceof WritableState;
    }
  });
} else {
  realHasInstance = function (object) {
    return object instanceof this;
  };
}

function Writable(options) {
  Duplex = Duplex || require('./_stream_duplex');

  // Writable ctor is applied to Duplexes, too.
  // `realHasInstance` is necessary because using plain `instanceof`
  // would return false, as no `_writableState` property is attached.

  // Trying to use the custom `instanceof` for Writable here will also break the
  // Node.js LazyTransform implementation, which has a non-trivial getter for
  // `_writableState` that would lead to infinite recursion.
  if (!realHasInstance.call(Writable, this) && !(this instanceof Duplex)) {
    return new Writable(options);
  }

  this._writableState = new WritableState(options, this);

  // legacy.
  this.writable = true;

  if (options) {
    if (typeof options.write === 'function') this._write = options.write;

    if (typeof options.writev === 'function') this._writev = options.writev;

    if (typeof options.destroy === 'function') this._destroy = options.destroy;

    if (typeof options.final === 'function') this._final = options.final;
  }

  Stream.call(this);
}

// Otherwise people can pipe Writable streams, which is just wrong.
Writable.prototype.pipe = function () {
  this.emit('error', new Error('Cannot pipe, not readable'));
};

function writeAfterEnd(stream, cb) {
  var er = new Error('write after end');
  // TODO: defer error events consistently everywhere, not just the cb
  stream.emit('error', er);
  processNextTick(cb, er);
}

// Checks that a user-supplied chunk is valid, especially for the particular
// mode the stream is in. Currently this means that `null` is never accepted
// and undefined/non-string values are only allowed in object mode.
function validChunk(stream, state, chunk, cb) {
  var valid = true;
  var er = false;

  if (chunk === null) {
    er = new TypeError('May not write null values to stream');
  } else if (typeof chunk !== 'string' && chunk !== undefined && !state.objectMode) {
    er = new TypeError('Invalid non-string/buffer chunk');
  }
  if (er) {
    stream.emit('error', er);
    processNextTick(cb, er);
    valid = false;
  }
  return valid;
}

Writable.prototype.write = function (chunk, encoding, cb) {
  var state = this._writableState;
  var ret = false;
  var isBuf = _isUint8Array(chunk) && !state.objectMode;

  if (isBuf && !Buffer.isBuffer(chunk)) {
    chunk = _uint8ArrayToBuffer(chunk);
  }

  if (typeof encoding === 'function') {
    cb = encoding;
    encoding = null;
  }

  if (isBuf) encoding = 'buffer';else if (!encoding) encoding = state.defaultEncoding;

  if (typeof cb !== 'function') cb = nop;

  if (state.ended) writeAfterEnd(this, cb);else if (isBuf || validChunk(this, state, chunk, cb)) {
    state.pendingcb++;
    ret = writeOrBuffer(this, state, isBuf, chunk, encoding, cb);
  }

  return ret;
};

Writable.prototype.cork = function () {
  var state = this._writableState;

  state.corked++;
};

Writable.prototype.uncork = function () {
  var state = this._writableState;

  if (state.corked) {
    state.corked--;

    if (!state.writing && !state.corked && !state.finished && !state.bufferProcessing && state.bufferedRequest) clearBuffer(this, state);
  }
};

Writable.prototype.setDefaultEncoding = function setDefaultEncoding(encoding) {
  // node::ParseEncoding() requires lower case.
  if (typeof encoding === 'string') encoding = encoding.toLowerCase();
  if (!(['hex', 'utf8', 'utf-8', 'ascii', 'binary', 'base64', 'ucs2', 'ucs-2', 'utf16le', 'utf-16le', 'raw'].indexOf((encoding + '').toLowerCase()) > -1)) throw new TypeError('Unknown encoding: ' + encoding);
  this._writableState.defaultEncoding = encoding;
  return this;
};

function decodeChunk(state, chunk, encoding) {
  if (!state.objectMode && state.decodeStrings !== false && typeof chunk === 'string') {
    chunk = Buffer.from(chunk, encoding);
  }
  return chunk;
}

// if we're already writing something, then just put this
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

  var ret = state.length < state.highWaterMark;
  // we must ensure that previous needDrain will not be reset to false.
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
  if (writev) stream._writev(chunk, state.onwrite);else stream._write(chunk, encoding, state.onwrite);
  state.sync = false;
}

function onwriteError(stream, state, sync, er, cb) {
  --state.pendingcb;

  if (sync) {
    // defer the callback if we are being called synchronously
    // to avoid piling up things on the stack
    processNextTick(cb, er);
    // this can emit finish, and it will always happen
    // after error
    processNextTick(finishMaybe, stream, state);
    stream._writableState.errorEmitted = true;
    stream.emit('error', er);
  } else {
    // the caller expect this to happen before if
    // it is async
    cb(er);
    stream._writableState.errorEmitted = true;
    stream.emit('error', er);
    // this can emit finish, but finish must
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

  onwriteStateUpdate(state);

  if (er) onwriteError(stream, state, sync, er, cb);else {
    // Check if we're actually ready to finish, but don't emit yet
    var finished = needFinish(state);

    if (!finished && !state.corked && !state.bufferProcessing && state.bufferedRequest) {
      clearBuffer(stream, state);
    }

    if (sync) {
      /*<replacement>*/
      asyncWrite(afterWrite, stream, state, finished, cb);
      /*</replacement>*/
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
}

// Must force callback to be called on nextTick, so that we don't
// emit 'drain' before the write() consumer gets the 'false' return
// value, and has a chance to attach a 'drain' listener.
function onwriteDrain(stream, state) {
  if (state.length === 0 && state.needDrain) {
    state.needDrain = false;
    stream.emit('drain');
  }
}

// if there's something in the buffer waiting, then process it
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

    doWrite(stream, state, true, state.length, buffer, '', holder.finish);

    // doWrite is almost always async, defer these to save a bit of time
    // as the hot path ends with doWrite
    state.pendingcb++;
    state.lastBufferedRequest = null;
    if (holder.next) {
      state.corkedRequestsFree = holder.next;
      holder.next = null;
    } else {
      state.corkedRequestsFree = new CorkedRequest(state);
    }
  } else {
    // Slow case, write chunks one-by-one
    while (entry) {
      var chunk = entry.chunk;
      var encoding = entry.encoding;
      var cb = entry.callback;
      var len = state.objectMode ? 1 : chunk.length;

      doWrite(stream, state, false, len, chunk, encoding, cb);
      entry = entry.next;
      // if we didn't call the onwrite immediately, then
      // it means that we need to wait until it does.
      // also, that means that the chunk and cb are currently
      // being processed, so move the buffer counter past them.
      if (state.writing) {
        break;
      }
    }

    if (entry === null) state.lastBufferedRequest = null;
  }

  state.bufferedRequestCount = 0;
  state.bufferedRequest = entry;
  state.bufferProcessing = false;
}

Writable.prototype._write = function (chunk, encoding, cb) {
  cb(new Error('_write() is not implemented'));
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

  if (chunk !== null && chunk !== undefined) this.write(chunk, encoding);

  // .end() fully uncorks
  if (state.corked) {
    state.corked = 1;
    this.uncork();
  }

  // ignore unnecessary end() calls.
  if (!state.ending && !state.finished) endWritable(this, state, cb);
};

function needFinish(state) {
  return state.ending && state.length === 0 && state.bufferedRequest === null && !state.finished && !state.writing;
}
function callFinal(stream, state) {
  stream._final(function (err) {
    state.pendingcb--;
    if (err) {
      stream.emit('error', err);
    }
    state.prefinished = true;
    stream.emit('prefinish');
    finishMaybe(stream, state);
  });
}
function prefinish(stream, state) {
  if (!state.prefinished && !state.finalCalled) {
    if (typeof stream._final === 'function') {
      state.pendingcb++;
      state.finalCalled = true;
      processNextTick(callFinal, stream, state);
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
    }
  }
  return need;
}

function endWritable(stream, state, cb) {
  state.ending = true;
  finishMaybe(stream, state);
  if (cb) {
    if (state.finished) processNextTick(cb);else stream.once('finish', cb);
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
  }
  if (state.corkedRequestsFree) {
    state.corkedRequestsFree.next = corkReq;
  } else {
    state.corkedRequestsFree = corkReq;
  }
}

Object.defineProperty(Writable.prototype, 'destroyed', {
  get: function () {
    if (this._writableState === undefined) {
      return false;
    }
    return this._writableState.destroyed;
  },
  set: function (value) {
    // we ignore the value if the stream
    // has not been initialized yet
    if (!this._writableState) {
      return;
    }

    // backward compatibility, the user is explicitly
    // managing destroyed
    this._writableState.destroyed = value;
  }
});

Writable.prototype.destroy = destroyImpl.destroy;
Writable.prototype._undestroy = destroyImpl.undestroy;
Writable.prototype._destroy = function (err, cb) {
  this.end();
  cb(err);
};
}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./_stream_duplex":111,"./internal/streams/destroy":117,"./internal/streams/stream":118,"_process":80,"core-util-is":82,"inherits":101,"process-nextick-args":109,"safe-buffer":124,"util-deprecate":137}],116:[function(require,module,exports){
'use strict';

/*<replacement>*/

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Buffer = require('safe-buffer').Buffer;
/*</replacement>*/

function copyBuffer(src, target, offset) {
  src.copy(target, offset);
}

module.exports = function () {
  function BufferList() {
    _classCallCheck(this, BufferList);

    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  BufferList.prototype.push = function push(v) {
    var entry = { data: v, next: null };
    if (this.length > 0) this.tail.next = entry;else this.head = entry;
    this.tail = entry;
    ++this.length;
  };

  BufferList.prototype.unshift = function unshift(v) {
    var entry = { data: v, next: this.head };
    if (this.length === 0) this.tail = entry;
    this.head = entry;
    ++this.length;
  };

  BufferList.prototype.shift = function shift() {
    if (this.length === 0) return;
    var ret = this.head.data;
    if (this.length === 1) this.head = this.tail = null;else this.head = this.head.next;
    --this.length;
    return ret;
  };

  BufferList.prototype.clear = function clear() {
    this.head = this.tail = null;
    this.length = 0;
  };

  BufferList.prototype.join = function join(s) {
    if (this.length === 0) return '';
    var p = this.head;
    var ret = '' + p.data;
    while (p = p.next) {
      ret += s + p.data;
    }return ret;
  };

  BufferList.prototype.concat = function concat(n) {
    if (this.length === 0) return Buffer.alloc(0);
    if (this.length === 1) return this.head.data;
    var ret = Buffer.allocUnsafe(n >>> 0);
    var p = this.head;
    var i = 0;
    while (p) {
      copyBuffer(p.data, ret, i);
      i += p.data.length;
      p = p.next;
    }
    return ret;
  };

  return BufferList;
}();
},{"safe-buffer":124}],117:[function(require,module,exports){
'use strict';

/*<replacement>*/

var processNextTick = require('process-nextick-args');
/*</replacement>*/

// undocumented cb() API, needed for core, not for public API
function destroy(err, cb) {
  var _this = this;

  var readableDestroyed = this._readableState && this._readableState.destroyed;
  var writableDestroyed = this._writableState && this._writableState.destroyed;

  if (readableDestroyed || writableDestroyed) {
    if (cb) {
      cb(err);
    } else if (err && (!this._writableState || !this._writableState.errorEmitted)) {
      processNextTick(emitErrorNT, this, err);
    }
    return;
  }

  // we set destroyed to true before firing error callbacks in order
  // to make it re-entrance safe in case destroy() is called within callbacks

  if (this._readableState) {
    this._readableState.destroyed = true;
  }

  // if this is a duplex stream mark the writable part as destroyed as well
  if (this._writableState) {
    this._writableState.destroyed = true;
  }

  this._destroy(err || null, function (err) {
    if (!cb && err) {
      processNextTick(emitErrorNT, _this, err);
      if (_this._writableState) {
        _this._writableState.errorEmitted = true;
      }
    } else if (cb) {
      cb(err);
    }
  });
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
    this._writableState.finished = false;
    this._writableState.errorEmitted = false;
  }
}

function emitErrorNT(self, err) {
  self.emit('error', err);
}

module.exports = {
  destroy: destroy,
  undestroy: undestroy
};
},{"process-nextick-args":109}],118:[function(require,module,exports){
module.exports = require('events').EventEmitter;

},{"events":95}],119:[function(require,module,exports){
module.exports = require('./readable').PassThrough

},{"./readable":120}],120:[function(require,module,exports){
exports = module.exports = require('./lib/_stream_readable.js');
exports.Stream = exports;
exports.Readable = exports;
exports.Writable = require('./lib/_stream_writable.js');
exports.Duplex = require('./lib/_stream_duplex.js');
exports.Transform = require('./lib/_stream_transform.js');
exports.PassThrough = require('./lib/_stream_passthrough.js');

},{"./lib/_stream_duplex.js":111,"./lib/_stream_passthrough.js":112,"./lib/_stream_readable.js":113,"./lib/_stream_transform.js":114,"./lib/_stream_writable.js":115}],121:[function(require,module,exports){
module.exports = require('./readable').Transform

},{"./readable":120}],122:[function(require,module,exports){
module.exports = require('./lib/_stream_writable.js');

},{"./lib/_stream_writable.js":115}],123:[function(require,module,exports){
(function (process){
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

}).call(this,require('_process'))
},{"_process":80,"through":136}],124:[function(require,module,exports){
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

},{"buffer":81}],125:[function(require,module,exports){
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
Stream.Readable = require('readable-stream/readable.js');
Stream.Writable = require('readable-stream/writable.js');
Stream.Duplex = require('readable-stream/duplex.js');
Stream.Transform = require('readable-stream/transform.js');
Stream.PassThrough = require('readable-stream/passthrough.js');

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

},{"events":95,"inherits":101,"readable-stream/duplex.js":110,"readable-stream/passthrough.js":119,"readable-stream/readable.js":120,"readable-stream/transform.js":121,"readable-stream/writable.js":122}],126:[function(require,module,exports){
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

},{"es-abstract/es5":88,"function-bind":98}],127:[function(require,module,exports){
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

},{"./implementation":126,"./polyfill":128,"./shim":129,"define-properties":86,"function-bind":98}],128:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

var zeroWidthSpace = '\u200b';

module.exports = function getPolyfill() {
	if (String.prototype.trim && zeroWidthSpace.trim() === zeroWidthSpace) {
		return String.prototype.trim;
	}
	return implementation;
};

},{"./implementation":126}],129:[function(require,module,exports){
'use strict';

var define = require('define-properties');
var getPolyfill = require('./polyfill');

module.exports = function shimStringTrim() {
	var polyfill = getPolyfill();
	define(String.prototype, { trim: polyfill }, { trim: function () { return String.prototype.trim !== polyfill; } });
	return polyfill;
};

},{"./polyfill":128,"define-properties":86}],130:[function(require,module,exports){
'use strict';

var Buffer = require('safe-buffer').Buffer;

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
// continuation byte.
function utf8CheckByte(byte) {
  if (byte <= 0x7F) return 0;else if (byte >> 5 === 0x06) return 2;else if (byte >> 4 === 0x0E) return 3;else if (byte >> 3 === 0x1E) return 4;
  return -1;
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
  if (--j < i) return 0;
  nb = utf8CheckByte(buf[j]);
  if (nb >= 0) {
    if (nb > 0) self.lastNeed = nb - 2;
    return nb;
  }
  if (--j < i) return 0;
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
// UTF-8 replacement characters ('\ufffd'), to match v8's UTF-8 decoding
// behavior. The continuation byte check is included three times in the case
// where all of the continuation bytes for a character exist in the same buffer.
// It is also done this way as a slight performance increase instead of using a
// loop.
function utf8CheckExtraBytes(self, buf, p) {
  if ((buf[0] & 0xC0) !== 0x80) {
    self.lastNeed = 0;
    return '\ufffd'.repeat(p);
  }
  if (self.lastNeed > 1 && buf.length > 1) {
    if ((buf[1] & 0xC0) !== 0x80) {
      self.lastNeed = 1;
      return '\ufffd'.repeat(p + 1);
    }
    if (self.lastNeed > 2 && buf.length > 2) {
      if ((buf[2] & 0xC0) !== 0x80) {
        self.lastNeed = 2;
        return '\ufffd'.repeat(p + 2);
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

// For UTF-8, a replacement character for each buffered byte of a (partial)
// character needs to be added to the output.
function utf8End(buf) {
  var r = buf && buf.length ? this.write(buf) : '';
  if (this.lastNeed) return r + '\ufffd'.repeat(this.lastTotal - this.lastNeed);
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
},{"safe-buffer":124}],131:[function(require,module,exports){
(function (process){
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

}).call(this,require('_process'))
},{"./lib/default_stream":132,"./lib/results":134,"./lib/test":135,"_process":80,"defined":87,"through":136}],132:[function(require,module,exports){
(function (process){
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

}).call(this,require('_process'))
},{"_process":80,"fs":79,"through":136}],133:[function(require,module,exports){
(function (process){
module.exports = typeof setImmediate !== 'undefined'
    ? setImmediate
    : process.nextTick
;

}).call(this,require('_process'))
},{"_process":80}],134:[function(require,module,exports){
(function (process){
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

}).call(this,require('_process'))
},{"_process":80,"events":95,"function-bind":98,"has":99,"inherits":101,"object-inspect":105,"resumer":123,"through":136}],135:[function(require,module,exports){
(function (__dirname){
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


}).call(this,"/node_modules/tape/lib")
},{"./next_tick":133,"deep-equal":83,"defined":87,"events":95,"has":99,"inherits":101,"path":108,"string.prototype.trim":127}],136:[function(require,module,exports){
(function (process){
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


}).call(this,require('_process'))
},{"_process":80,"stream":125}],137:[function(require,module,exports){
(function (global){

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

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}]},{},[49]);
