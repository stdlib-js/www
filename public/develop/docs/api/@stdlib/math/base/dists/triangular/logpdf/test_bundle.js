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

},{"./float64array.js":1,"./polyfill.js":3,"@stdlib/utils/detect-float64array-support":63}],3:[function(require,module,exports){
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

},{"./polyfill.js":5,"./uint16array.js":6,"@stdlib/utils/detect-uint16array-support":69}],5:[function(require,module,exports){
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

},{"./polyfill.js":8,"./uint32array.js":9,"@stdlib/utils/detect-uint32array-support":72}],8:[function(require,module,exports){
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

},{"./polyfill.js":11,"./uint8array.js":12,"@stdlib/utils/detect-uint8array-support":75}],11:[function(require,module,exports){
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

},{"@stdlib/utils/native-class":77}],17:[function(require,module,exports){
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

},{"@stdlib/utils/native-class":77}],22:[function(require,module,exports){
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

},{"@stdlib/utils/native-class":77}],24:[function(require,module,exports){
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

},{"@stdlib/utils/native-class":77}],26:[function(require,module,exports){
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
* Natural logarithm of `2`.
*
* @module @stdlib/constants/math/float64-ln-two
* @type {number}
*
* @example
* var LN2 = require( '@stdlib/constants/math/float64-ln-two' );
* // returns 0.6931471805599453
*/


// MAIN //

/**
* Natural logarithm of `2`.
*
* ```tex
* \ln 2
* ```
*
* @constant
* @type {number}
* @default 0.6931471805599453
*/
var LN2 = 6.93147180559945309417232121458176568075500134360255254120680009493393621969694715605863326996418687542001481021e-01; // eslint-disable-line max-len


// EXPORTS //

module.exports = LN2;

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

// MODULES //

var constantFunction = require( '@stdlib/utils/constant-function' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var ln = require( '@stdlib/math/base/special/ln' );
var NINF = require( '@stdlib/constants/math/float64-ninf' );
var LN2 = require( '@stdlib/constants/math/float64-ln-two' );


// MAIN //

/**
* Returns a function for evaluating the natural logarithm of the probability density function (PDF) for a triangular distribution with lower limit `a` and upper limit `b` and mode `c`.
*
* @param {number} a - lower limit
* @param {number} b - upper limit
* @param {number} c - mode
* @returns {Function} logPDF
*
* @example
* var logpdf = factory( 0.0, 10.0, 5.0 );
* var y = logpdf( 2.0 );
* // returns ~-2.526
*
* y = logpdf( 12.0 );
* // returns -Infinity
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

	denom1 = ln( b - a ) + ln( c - a );
	denom2 = ln( b - a );
	denom3 = ln( b - a ) + ln( b - c );
	return logpdf;

	/**
	* Evaluates the natural logarithm of the probability density function (PDF) for a triangular distribution.
	*
	* @private
	* @param {number} x - input value
	* @returns {number} evaluated logPDF
	*
	* @example
	* var y = logpdf( 12.0 );
	* // returns <number>
	*/
	function logpdf( x ) {
		if ( isnan( x ) ) {
			return NaN;
		}
		if ( x < a ) {
			return NINF;
		}
		// Case: x >= a
		if ( x < c ) {
			return LN2 + ln( x - a ) - denom1;
		}
		if ( x === c ) {
			return LN2 - denom2;
		}
		// Case: x > c
		if ( x <= b ) {
			return LN2 + ln( b - x ) - denom3;
		}
		// Case: x > b
		return NINF;
	}
}


// EXPORTS //

module.exports = factory;

},{"@stdlib/constants/math/float64-ln-two":28,"@stdlib/constants/math/float64-ninf":29,"@stdlib/math/base/assert/is-nan":34,"@stdlib/math/base/special/ln":47,"@stdlib/utils/constant-function":58}],37:[function(require,module,exports){
'use strict';

/**
* Triangular distribution logarithm of probability density function (PDF).
*
* @module @stdlib/math/base/dists/triangular/logpdf
*
* @example
* var logpdf = require( '@stdlib/math/base/dists/triangular/logpdf' );
*
* var y = logpdf( 0.5, -1.0, 1.0, 0.0 );
* // returns ~-0.693
*
* y = logpdf( 0.5, -1.0, 1.0, 0.5 );
* // returns 0.0
*
* y = logpdf( -10.0, -20.0, 0.0, -2.0 );
* // returns ~-2.89
*
* var mylogpdf = logpdf.factory( 0.0, 10.0, 5.0 );
* y = mylogpdf( 2.0 );
* // returns ~-2.526
*
* y = mylogpdf( 12.0 );
* // returns -Infinity
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-read-only-property' );
var logpdf = require( './logpdf.js' );
var factory = require( './factory.js' );


// MAIN //

setReadOnly( logpdf, 'factory', factory );


// EXPORTS //

module.exports = logpdf;

},{"./factory.js":36,"./logpdf.js":38,"@stdlib/utils/define-read-only-property":60}],38:[function(require,module,exports){
'use strict';

// MODULES //

var isnan = require( '@stdlib/math/base/assert/is-nan' );
var ln = require( '@stdlib/math/base/special/ln' );
var NINF = require( '@stdlib/constants/math/float64-ninf' );
var LN2 = require( '@stdlib/constants/math/float64-ln-two' );


// MAIN //

/**
* Evaluates the natural logarithm of the probability density function (PDF) for a triangular distribution with lower limit `a` and upper limit `b` and mode `c` at a value `x`.
*
* @param {number} x - input value
* @param {number} a - lower limit
* @param {number} b - upper limit
* @param {number} c - mode
* @returns {number} evaluated logPDF
*
* @example
* var y = logpdf( 0.5, -1.0, 1.0, 0.0 );
* // returns ~-0.693
*
* @example
* var y = logpdf( 0.5, -1.0, 1.0, 0.5 );
* // returns 0.0
*
* @example
* var y = logpdf( -10.0, -20.0, 0.0, -2.0 );
* // returns ~-2.89
*
* @example
* var y = logpdf( -2.0, -1.0, 1.0, 0.0 );
* // returns -Infinity
*
* @example
* var y = logpdf( NaN, 0.0, 1.0, 0.5 );
* // returns NaN
*
* @example
* var y = logpdf( 0.0, NaN, 1.0, 0.5 );
* // returns NaN
*
* @example
* var y = logpdf( 0.0, 0.0, NaN, 0.5 );
* // returns NaN
*
* @example
* var y = logpdf( 2.0, 1.0, 0.0, NaN );
* // returns NaN
*
* @example
* var y = logpdf( 2.0, 1.0, 0.0, 1.5 );
* // returns NaN
*/
function logpdf( x, a, b, c ) {
	var denom1;
	var denom2;
	var denom3;

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
		return NINF;
	}
	denom1 = ln( b - a ) + ln( c - a );
	denom2 = ln( b - a );
	denom3 = ln( b - a ) + ln( b - c );

	// Case: x >= a
	if ( x < c ) {
		return LN2 + ln( x - a ) - denom1;
	}
	if ( x === c ) {
		return LN2 - denom2;
	}
	// Case: x > c
	if ( x <= b ) {
		return LN2 + ln( b - x ) - denom3;
	}
	// Case: x > b
	return NINF;
}


// EXPORTS //

module.exports = logpdf;

},{"@stdlib/constants/math/float64-ln-two":28,"@stdlib/constants/math/float64-ninf":29,"@stdlib/math/base/assert/is-nan":34,"@stdlib/math/base/special/ln":47}],39:[function(require,module,exports){
module.exports={"expected":[-2.916527931148815,-3.84384174736684,-3.238071808448817,-2.190503279798258,-3.312698746089967,-3.421550512032062,-4.063773223777478,-3.2086299049258926,-6.2622227505142565,-4.140679683130222,-3.3117550326485676,-1.925434735804198,-2.6965003551040785,-1.9555420790922287,-4.8046515191170736,-3.045564379442653,-3.3024539508249764,-2.3198799274364545,-5.773368550225926,-2.848771661939163,-4.106907933404246,-3.3791014180495993,-3.430065737692474,-2.381676188005877,-5.477360556977961,-3.8524016523446023,-1.7873816920675756,-2.0901111702915953,-4.899394366796534,-6.41205283792075,-3.5953661384262934,-4.189449825585468,-2.9286407610296967,-4.031269801335915,-5.622949840372261,-3.635096993345292,-3.469840353173437,-2.8641927561396954,-4.574987805617879,-2.0339255698779493,-3.481995374546471,-3.812191682037438,-3.6577169038908903,-3.945985304842607,-4.36134626369021,-0.8986952249921384,-4.589768344249099,-2.81156419776765,-3.4516956527576785,-4.843232030803196,-3.7403404823403745,-3.6555248546875303,-3.8611061043730333,-4.556315556783771,-3.3417328474563446,-3.357506058962208,-3.5711235446813383,-4.079639105205854,-5.046429463195742,-3.560333545815124,-0.9734240756912915,-3.966970374675747,-3.0678229720413066,-3.655345840947476,-4.904505071420609,-2.3797294801469913,-3.941627332446616,-3.87868798756881,-1.634648262572243,-3.558696412983071,-2.0601407404344205,-2.1784928101155527,1.0856879093016185,-4.3624572412940275,0.9914638961370479,-4.629609541629048,-3.558591037678314,-5.123328042660117,-3.4699010018940015,-4.73159694000389,-2.44144660403101,-3.4406113782205816,-3.1530311014875707,-3.739655455258142,-0.6216824490420513,-4.8241153929308505,-4.723343569288555,-5.217476228375996,-3.8034298623380076,-4.259595416635336,-3.0164115216305505,-3.6845052409128045,-0.05520677017527269,-3.3770363132517773,-1.790122711196835,-3.759886387272901,-2.741108743590114,-4.330207621475723,-4.082490923543446,-5.2327216393202685,-3.8433712843082617,-2.88381871524019,-4.725903080180563,-2.795411563407578,-1.5973799495607623,0.365263620642942,-4.653756708589606,-3.536217304926241,-6.31343924462695,-5.295515069591126,-2.8053181134418326,-3.56296257324548,-5.7982670651281545,-3.7184314693392517,-4.606793954042093,-3.9478836833659545,-3.3996846190490073,-4.682980880580971,-3.277706656168184,-3.912233366617432,-4.017069746923769,-5.3461086741397255,-2.3532716035429324,-3.4887427985746453,-3.9696896989259747,-4.674437421619709,-3.7325603466110424,-3.781767444747867,-3.6064119676996036,-2.930134999966567,-2.4682499621700655,-4.1126860364607145,-3.6315590694997586,-2.005953967796546,-2.4006967564513206,-3.876531163931986,-2.9962058944150542,0.23678434294836173,-2.568006787772253,-4.889851670478041,-3.182131134648443,-1.9935523952599319,-1.3633680015188419,-2.9203913184053008,-7.031763095387333,-3.895901752471912,1.3486145421849631,-2.5828177043337104,-3.3122923218495264,-4.978377644734539,-3.86327805437367,-3.22712175743126,-3.70273280333372,-2.3563072420985236,-1.294987106171757,-3.3561421684093875,-3.5220251685734167,-6.366064723261122,-3.0942811642474366,-3.25357599633021,-3.8855707948296474,-3.5891675355790484,-3.4517106932260777,-4.69540480802924,-3.6947085112443085,-3.679092841642903,-5.226474593572559,-3.9094196958227925,-4.864472336050173,-3.366753620409077,-2.669379619004489,-1.7795655826164842,-4.378830500568191,-4.020535938648494,-4.4575980467079885,-3.1638082338141365,-4.378847158460462,-4.866536837288547,-4.342009630126659,-3.7189371518149668,-3.8753588707848876,-4.334191077565697,-2.4695187932888083,-1.8174354158751158,-5.077681474821876,-4.1704097155916715,-2.9306833800293637,-4.397244414972222,-4.07585896259483,-3.5510890382804154,-3.4818762363706277,-4.1509233897796145,-4.313455008090422,-4.6741714485152865,-4.167683357071276,-4.871887889453146,-3.783361100864384,-3.5596078220761482,-3.917675760357278,-5.737219844085155,-2.4269158491717966,-5.667908322437666,-5.725842792155468,-4.084773992997315,-4.491212044200505,-4.083091858053293,-4.853066729953023,-4.232705140616715,-4.064139636189685,-4.8051385416656185,-4.489986327988896,-3.8143964514253375,-3.803120104290039,-2.4431528836952965,-2.86314758205028,-5.098460796843586,-3.382537163717551,-6.398757369659176,-2.003567604675029,-3.998042177098717,-4.589953890987396,-3.140554507301143,-2.2798825631727544,-3.0019984743044903,-5.273288687546636,-1.9041570795516358,-3.467318952991614,-6.511268578187065,-4.9496922711970335,-4.289655550378389,-4.133684415504078,-5.969276604026935,-3.6383652790953986,-2.9108563946736674,-4.591703292086408,-4.10256201012889,-0.5159192163173622,0.5328471394250949,-4.578069936140211,-4.701157319327245,-5.112967373373914,-4.274101239267356,-4.100907535935135,-4.594024332843084,-4.267320382831551,-3.3155684249092094,-5.545492525369784,-5.9252577740156225,-6.74544602021445,-4.319148680039966,-2.9515019047264324,-4.376512653948246,-4.348747184401127,-3.757013846683604,-3.625327396719423,-3.605382439728916,-4.705307645495862,-3.8890029258889096,-5.268067787776904,-2.901196538247401,-3.689285140026228,-5.704545993567485,-4.461894676788221,-5.270289247154766,-1.161571879969547,-4.7767134647957885,-4.057228514628903,-3.612135940033491,-3.5129062336271892,-2.3326637113937627,-1.7805895991896947,-3.206316559143357,-5.839368434235599,-1.3760074368881994,-3.2488550756344066,-3.5121251677595375,-4.021044372597037,-3.060847466259664,-4.041409930294377,-5.804260346326322,-3.1974095999437795,-2.6863522275469367,-6.822868057041821,-0.14493869341143298,-2.819790941279496,-2.7824248983792543,-0.5401344725292286,-3.288174358890658,-3.6258940000750477,-1.0572077311174302,-3.5098303915286673,-4.317090622623824,-3.513718985166259,-1.8134424075397497,-4.066517655214393,-3.68701350132675,-3.449053385720693,-4.47930806053953,-5.39377491068327,-3.478118638748849,-2.5598820424895745,-2.6470352978494063,-3.3438996551676534,-4.901487669415234,-5.122916062501621,-2.9521909567667444,-2.8009347465829655,-3.500159010433887,-3.394665203365445,-0.2923054160793035,-3.574324667378483,-3.3927413124836416,-2.3998692894595726,-3.4138740213947414,-3.429183619068834,-4.218800252392296,-1.9901476630667316,-5.205507278271573,-2.799782253507319,-4.055623558703265,-2.5484074545756044,-4.751394109060127,-3.5929607532514405,-4.820136123342187,-3.2096167785502994,-4.0759824016256765,-3.626510659923413,-3.9382213012350777,-3.4694000213988283,-4.685107691053607,-4.572359554554141,-3.2452762368493455,-1.3349902913648093,-2.550696284709524,-3.41448777627134,-3.8777728994560485,-2.4331724415637104,-4.516655896629193,-3.718121508947725,-3.493084708786304,-2.8239983818809833,-3.9878979817681497,-1.0349662744744343,-4.831825611572216,-3.7816954005336703,-4.616511282896331,-3.517067421656911,-3.629225493416837,-3.33930767657769,-2.894833619826872,-3.1846427110141704,-2.920067657709924,-3.7197204082834925,-2.0362623800322894,-2.538966239846346,-3.800073922725568,-4.064823353133,-5.002035585462577,-4.132308702483296,-5.12538178026915,-3.756040475922079,-4.169510026934718,-4.463732964000276,-2.2590864201423706,-3.7136459490808376,-4.9741268931362805,-4.165970995755512,-3.5177766548427103,-3.8840486942389756,-2.8216099284457807,-3.8686023013449224,-4.0743632366981695,-3.606187308052837,-4.07948637601831,-4.128866047493935,-1.3172847518540884,-4.210470719035365,0.007052726203302734,-4.5734437045922105,-4.251502801537969,-3.5573963214889215,-5.657839311997609,-2.7171672649504837,-2.7222929704605954,-3.6126371174030716,-4.471537929217746,-4.062911751525084,-2.73560064256681,-4.883271954179643,-5.906396787848021,-2.904501035746666,-4.92058216103074,-2.9198877037135587,-2.7592828186802705,-3.5216359747735004,-6.25498230393582,-4.194874827538411,-4.24432511595926,-3.8811984443523686,-3.470071489686807,-3.9549108091921985,-2.3725885402488083,-2.0788523386062554,-3.015972618495025,-4.316102561949665,-6.248326548383093,-2.531025091348197,-2.6561259329370492,-1.9453940517757708,-4.887156848629525,-3.349789075659623,-4.221539686056831,-1.4653900454850253,-3.423077144470956,-5.732626734337252,-3.592962274052621,-4.0802682238746675,-4.1094305692913204,-2.6786986672949324,-3.728414187474274,-6.562955500417457,-2.13230971480394,-1.2375525701550352,-0.016993448078958286,-4.058161635793098,-3.5813197765640066,-3.3131391232141647,-6.087378279055836,-1.3472777593139238,-3.211371201303459,-3.743832988481554,-4.664857008015415,0.44456405613172373,-3.390941088448417,-3.5255906939358477,-4.72543438665344,-3.4132874428719115,-4.6630036958417636,-4.408812214211331,-3.235825407785802,-5.123704903251762,-3.0526930861366894,-3.43311650001877,-3.8472458589791585,-3.606777263647648,-4.523970957189683,-4.838923746426544,-2.892441784371182,-3.3978993822621804,-3.1756590937190112,-5.61033315859715,-3.7931951674369997,-4.227129745646085,-3.810041535381139,-0.6255513897338929,-3.3749492317045457,-3.3810403162952016,-4.160405336798236,-3.7271469888481787,-4.6855785199692805,-2.665077833672985,-4.459676500847806,-2.0422296823416994,-2.612359433028105,-4.972965564003771,-0.6871892969225999,-4.02953690700583,-3.3562272850836865,-4.820470464892573,-3.1556595076605616,-4.042511588388302,-3.8564187571813697,-0.17580692864211397,-2.8935129009434313,-3.7320999390820884,-4.0194290092458065,-5.0160296677560785,-5.339920751688493,-4.604671727739493,-3.647661184916975,0.2732181733549063,-4.9985748937718055,-1.2125132996861485,-3.4201311957313534,-3.6182704130081347,-3.9842178538677167,-4.501243856962117,-4.245403461252175,-2.5624064305904075,-3.334604337541075,-2.559544709794292,-3.009770456756943,-4.828822782909024,-3.1532988602804837,-2.0462656301844264,-3.5068913693919246,-1.5554319167154151,-3.0766243647845526,-0.6277554161493413,-5.083904564488306,-4.402579926762049,-1.0871509738904066,-4.239199380040357,-6.015496814530359,-3.8991447103342702,-3.168309969227297,-4.433254231904656,-3.8838515215373492,-3.645013399121338,-4.2719660203934655,-2.769401650586938,-4.8406436984753345,-3.26879359524259,-2.1529536800521063,-3.2952942808932013,-7.578733699738967,-3.9601215461007486,-3.9336764642027604,-2.2148499910496358,-4.289746383194602,-1.332606660796379,-4.613246288687298,-0.5564466980959145,-5.1259131574259005,-4.76561976164023,-4.031808915857293,-4.624405312096297,-3.492620778784139,-3.763737701669225,-3.7160085787791197,-1.5815383177975209,-3.3790221278376444,-3.7755649813158945,-3.721079668996421,-3.8777203638839404,-4.06401308913255,-3.810965403467252,-3.136229366899254,-3.014829316906991,-3.274074975847862,-4.130924457895778,-4.0322617447307785,-4.151694909284975,-2.141861228555269,-4.0475862581369535,-4.623938845512264,-6.806770637856191,-7.056306625082963,-6.414616594514998,-3.7040811171567842,-4.531709084570269,-3.936184834751059,-5.508945123319987,-4.413180840479304,-3.245819774605926,-3.6911242117560032,-2.553539606671548,-2.241547534633283,-3.0989792012411845,-2.555583002840275,-3.7854797197517827,-4.718933764389886,-3.900384746845903,-2.1516193303657882,-3.7183168235152686,-5.796306298994231,-3.492129386050162,-4.354698723441586,-4.009789682740359,-4.306196434048715,-3.0279038458098384,-4.089676215805034,-4.060724045544876,-4.23679505234207,-3.7019486851029564,-3.9780738390498573,-3.9173980521249105,-4.450222668861375,-1.4877106353839251,-1.3168309558520312,-3.53056232138855,-6.740671260534016,-4.948811011338136,-3.844863205202307,-4.240715466643749,-3.9884197578325917,-4.4320000152311385,-3.9067423944978854,-4.422530531074276,-4.1854608749912225,-2.9961371988584076,-3.840032602562396,-3.101368984702521,-3.189012433321008,-4.06796647102424,-3.957396207228865,-1.2102948283420916,-3.825965215985516,-3.1026754535409884,-3.4086499712763603,-3.8421430136452357,-1.4053157296249434,-5.7699678114282715,-2.7755159121795505,-8.057139182627418,-3.1824081350225373,-4.160804591596085,-3.5466072123204975,-4.287269165007533,-3.9703755760558894,-3.5352632965216686,-3.6207896906462986,-2.618153038520415,-3.4121691157310834,-3.513392451915989,-5.564814587997964,-0.6949378991102537,-5.645913414694968,-3.2269387671800533,-5.323940712126566,-6.851020362479047,-5.905510417889662,-3.700408656229105,-2.0564018497393475,-3.9309472294907173,-3.826689675073979,-4.535735340849131,-4.285892181627753,-4.702668303487079,-2.8688907603527998,-3.4605864562403053,-2.335227510685139,-4.060522411072203,-4.6747272980768715,-4.879018641338105,-1.4247812923683498,-5.329746196611723,-0.7582281152497969,-4.113342155313612,-6.149123758826011,-3.338593525186184,-3.9991073188469803,-2.2586703719252714,-4.598740689160366,-4.863307848894204,-4.191495128253579,-3.0194458859190627,-5.256480987492706,-3.269972714526412,-4.081040331304869,-4.264193257499679,-3.2135964027164117,-5.604044879014461,-4.416820575731771,-2.470092520271338,-4.9880299069266405,-7.04299598937033,-6.5712703417934355,-10.91433662176894,-3.5141794874024095,-9.59972193654429,-3.4463369786194478,-5.935448403109454,-3.570954128894797,-2.4730169948710334,-6.261980800278763,-3.971341257202749,-3.2682095539952787,-4.7587565788863815,-6.13148019474116,-5.419471124149055,-4.732666514325301,-3.1930039879868497,-3.7950024162721108,-3.7698141401508547,-4.666802816533409,-4.326478516984204,-1.8280861721468038,-4.279670807868951,-3.902647678757557,-5.084220424244301,-4.45452156360617,-5.655626005231021,-4.653691574981761,-3.1583236115875275,-4.117067807356514,-3.810017471267696,-2.5087335174195715,-3.528543294320372,-4.850231611613025,-3.015895793437883,-4.324471170950501,-4.2493060081759255,-3.1093882880607198,-4.15820354202415,-2.880603434346456,-3.071080212040449,-3.7815044320223685,-4.02125384012769,-4.684781873991717,-2.3370434129149142,-2.7616849855550303,-5.138290776977773,-1.891729011084055,-7.816284562856399,-6.4711470215515146,-1.8648856094052573,-1.8164980928497956,-6.359992690572371,-4.163778662416786,-2.139455387327794,-2.4601118611996653,-0.3731214789168087,-3.215386598448341,-3.562192472490523,-5.234606616003538,-3.5810692494743206,-4.031577257220183,-4.5036707787506645,-3.167170099228244,-3.9136622905876575,-4.331649111365369,-1.410877701500382,-3.893695217752015,-2.5818438176988114,-2.6714299366912004,-0.799131535092951,-1.9291380312404494,-3.995217151398727,-5.847385782174754,-3.0971870535968087,-3.221739019886612,-4.792118361834013,-11.95580637958459,-3.6103624538348282,-7.648763013182407,-3.2988447045060947,-5.519451214325618,-4.89658390205289,-2.2654227493430388,-1.443694097694817,-3.643428546899535,-3.7574264199898946,-2.9705061550074343,-5.3087173681217195,-3.9523329313587725,-0.5029825398230802,-4.581248517098557,-4.16029052667912,-3.6576851570041597,-4.156421199223834,-3.7898092469475615,-5.046802445128583,-4.997887623029675,-0.9445410920290254,-4.037060955477772,-2.9822754798809767,-3.8487572293796792,-1.8032241426563795,-2.9773075210690076,-0.3320938482344093,-3.1872288003309133,-2.848502399411218,-2.3538448244709946,-2.5878790142423806,-2.8244710984658017,-4.627968159191449,-2.9644815379687555,-4.575211555852995,-4.480101748524,-3.0669288107918504,-3.1149159798821247,-3.3173517874505185,-3.2686894105105795,-5.308367723708295,-5.164010962234027,-5.150892160803487,-3.5751817934614585,-4.723427739231541,-3.06825306638141,-3.187965257952632,-4.590325102662607,-2.4357633813264776,-3.993931452415545,-2.0643235728859906,-2.3476869474644655,-4.229003079220225,-5.803711968492582,-2.1842290318862894,-4.748264507221005,-4.782963807089072,-4.04448125738237,-3.6984630528254203,-4.705800294873795,-2.3419140453383216,-3.1299085317908584,-3.4908598491829435,-2.8981072830702854,-3.3313697593429947,-1.8372156402791224,-4.3423311092251184,-4.240445599971192,-2.391988844656813,-5.022651781139502,-3.7951121404862147,2.006720437079449,-3.5724568800249425,-5.680651039718771,-3.6242478245757135,-3.4596061763806887,-2.447961097306335,-3.2722122756359866,-0.21705496032964966,-0.9336910699856024,-3.4189278211222747,-3.427571971155803,-3.38619072748048,-3.972097430071285,-3.1657632479395947,-4.02726669599146,-3.4191081699442654,-5.025167181493771,-2.0239973246010785,-2.0913436517813926,-3.750339307410812,-4.826410017835991,-3.70287407605471,-1.6242140933433804,-2.5978753411616573,-6.994016866241956,-4.636768141890108,-3.096961095587992,-9.791179194998232,-3.589254728643496,-5.687101923776861,-4.316492991844448,-3.519907560327287,-3.154765429430193,-4.825552584803569,-4.752617044098914,-7.304115727658469,-2.496385929609928,-2.8242802074859092,-0.6346538211469721,-0.7795755365031144,-5.398203752467719,-4.687345209787046,-5.212876868820255,-3.1094996918998508,-4.1017709583990705,-5.349224978947113,-3.010133627664254,-3.794372364753305,-4.767965091129584,-3.9945500431549297,-2.4214407867826355,-4.264282703611301,-4.009185574940598,-3.3178041072360593,-2.5816134014695837,-4.8298510959363945,-4.564162473949317,-0.8092722722469732,-3.1035911609238074,-5.437524304859751,-5.043185172308989,-4.323331475755383,-5.007219806779946,-2.5225081071705002,-2.72448573577481,-4.496256111642264,-4.681206239434223,-5.021268162595388,-3.511293383190643,-3.7183699392348437,-4.866497350971594,-3.9358079786417948,-3.7837126424425507,-3.7833871969273836,-3.9213790847891214,-3.3723243371924827,-3.8317956846300927,-2.3611169751641126,-2.333646481102396,-3.4772396426721413,-3.1778444063810896,-1.3037054531111905,-4.98637790415428,-5.618822725298492,-4.301147300847329,-4.258769506040559,-4.992396837854085,-3.983014786590203,-7.083843985313097,-4.4286287982182175,-3.7038873008897304,-4.193209535331341,-3.6404969118372392,-4.070921533676097,-5.89743791580883,-3.3262796541841215,-3.5113261702815177,-4.3666548996252175,-3.313701194780941,-2.625771978323372,-1.6338878892493292,-5.519492534168256,-4.708265945384981,-4.003858061395507,-3.8408090698180644,-3.288905801908782,-4.442117972104578,-3.695147494454414,-3.8463738448960587,-4.988004740162577,-3.6325505794207067,-3.187627298009035,-4.119121158342011,-3.425606265705628,-3.522429168896516,-4.984950727902518,-3.900702572098498,-4.413820283366804,-4.844579772751622,-4.636037980112624,-3.467576740114559,-4.883108293182675,-6.641428730293729,-2.4523719328821345,-2.0592849953543033,-3.5678809231937825,-4.9138636795043835,-3.6038199297277664,-3.7629724910562516,-4.0101334890841045,-5.0751913886068,-4.948813137068265,-9.027526923495166,-5.011727435637166,-3.904591621818491,-3.2249025595759235,-2.5454695321929126,-2.569425251787677,-0.6522358276787892,-2.3194759769888527,-2.686346314736715,-3.520979924422772,-7.045206511190213,-3.95048521334745,-2.435621708102328,-2.3940576105318137,-2.4683536756142037,-4.900863232441513,-4.058194356213574,-3.0766393296880032,-5.022382135520469,-0.7243095119823922,-2.6834648854314764,-3.206209258555809,-3.823834203819967,-5.888594766495757,-1.882562541466253,-3.545335351985799,-3.765298447851974,-5.642846239121762,-3.8398374159324478,-3.510903519563801,-3.7966711784038165,-4.3615292023117656,-2.7729893664709326,-3.0476940981787948,-4.992645040802705,-2.9633061554654487,-3.0629142938555294,-6.35515244931927,-4.824326905249694,-2.8131902447387716,-3.1698820752091668,-6.397106541472198,-3.2506134488231235,-2.5127042778769986,-2.891056666037631,-4.046017084330872,-3.6668879558967684,-2.752398446377523,-3.694222959250944,-5.765821205701302,-3.230420699371706,-0.5721743620381523,-3.8076242201928623,-11.977223959638192,-3.624013917329967,-4.879030851545608,-3.879673587644864,-5.029759725714351,-4.038675974396378,-4.245613465167864,-2.851141068252245,-3.0613648720672737,-3.076291200907999],"c":[21.35714791676243,60.94164052428863,18.653960887251504,17.948224537980362,49.52290859503695,56.83157294512898,40.58252721669758,41.00003077714953,57.28693538511157,48.91479646218595,8.347662987377438,21.96129085253794,26.49721750233156,12.099151891046894,46.44674707047194,17.04515143891197,13.858104234334213,15.239773852839415,43.49450964288205,23.961118012472127,34.491616917220895,43.10683155785766,44.174615359199414,10.237826071561638,53.04528910952657,22.577518375264617,3.275888839311623,8.515458219738711,13.899239997141315,22.64391154249232,37.48159821684735,29.2824771247827,29.46804727462444,17.863849632966755,65.37134811002154,23.19219771299782,19.863319164958153,47.196196680001876,33.4422571017276,23.92955282188435,32.13523446338566,16.75123539609064,27.947177990131976,44.243787005859545,6.721157430099419,15.61559425406219,15.683819643484448,21.34284807393944,32.78469840718533,37.563270814474166,58.61266900570245,27.507823728749592,61.24319515893505,47.014105086653814,16.019127864361568,33.462951438505925,20.110386447311615,39.40809997453551,45.57561024079427,70.02939585709642,18.163000268862888,13.75220352339709,6.456549504068141,21.967746315492164,36.8375064210108,8.62118422266514,65.76946717044882,27.825700591522935,8.455771766684167,28.37393071264134,26.352024374568327,25.68937455787986,19.881833633413788,28.86397830793537,1.3850305364354099,43.099227718027336,28.734938529114196,42.06448086702183,40.0395331820922,68.9713715351219,5.1174578249034575,44.553603741569624,35.25072471843015,30.922615035842675,1.6565408197105105,37.202489996386646,10.005021142863914,69.0678407655437,20.616574440259228,51.486525760942015,10.36594359551258,63.77865931738586,19.757247114342764,6.796022177091578,3.5804419203458453,51.93335212128946,22.352084583741313,39.654088151760774,73.0059805717587,36.2922574912147,18.204915531777537,31.36615628529489,74.18254037939728,28.331718107332037,20.28013164279027,0.8439822128192278,30.315045196219565,36.08598751760301,26.7700371195438,43.736538201720705,22.30853068125135,10.377722762124064,8.316596155230638,72.32850983552646,9.348808828303104,44.129385673325714,44.34012902521576,19.432603778004502,22.8384390043409,13.839895639006244,61.67978103554825,21.362139692643126,27.695979330510205,36.80581591752495,38.23258268956058,56.350607767084846,48.53336593964371,21.424016813135324,13.745909492574246,19.20031515332455,26.979002863348462,20.55002304621038,47.69340025647779,10.82513521467776,7.344033919752244,45.129479148734845,28.806855149199066,10.755715936742462,23.42204070249624,25.06758295597119,6.089883693543879,10.21760193818719,12.170108077496465,45.93499177512887,52.03461619368043,81.08652616315246,14.027326988104521,11.343639633726248,17.166815848291215,13.292216107929399,34.5551990956838,21.61450651185106,43.979529304090306,35.97732688601392,18.260005221878828,29.81155761283658,64.27791657867107,34.26373740942452,28.509098204136997,14.731042618342215,19.074670907537303,62.78187245933837,14.135061421134544,43.59811164918172,23.463142492663007,83.50534756148619,27.07235020089706,46.197941299854236,36.9322764250542,22.92311348943403,32.12831327614621,16.614391894258517,31.960262563300684,22.191844630594176,39.73364610936609,35.93474490504006,23.322572805693895,21.224886762903967,43.72836719914607,12.055629690653717,17.04278403923997,52.85642312260771,7.505422552992616,5.078744796344047,24.976320642218685,40.156230469170715,29.961492181624816,17.78734318566105,32.23739213712575,30.32328883590402,23.975327078173088,3.0407052717106495,48.70787070521235,28.353094167753063,24.346090281918325,50.66260954999677,69.4977888365017,48.999786119224936,61.070776163263346,17.269454739863832,22.631687716884784,20.929099176406975,23.573282227689923,56.22302914775723,5.17947595199243,18.297706808539914,41.42010561052749,12.564995091457163,20.812926369959406,41.16263222950564,19.094405115385925,38.49367250351372,28.465957546820214,7.120393927638403,26.5729614649807,56.29717355592442,13.378766178120758,34.94411293678151,14.190794025836219,61.12158752870536,32.30426785746395,10.088821645572665,26.10665154847581,19.616600694516663,26.61592565842747,19.99918924991881,16.23101287635493,34.458425623690054,22.510566011694955,22.43756099892276,24.77872387103398,18.065465170947533,36.30495060719184,35.087747264661004,52.01199419018055,32.491323149047965,12.524639599403226,3.9173306161140973,29.32126240210264,10.44597439469781,31.901964844313053,61.996600154381,40.200395325906086,19.989591750486206,30.596466327682,32.56232037886079,17.316206672522537,2.0093771458251197,53.7860976650388,9.877180707754068,40.127361441298156,52.14360636060283,47.010398763795706,56.84573275030198,39.925859592097154,71.91150718910973,50.69040493468228,21.418577905674,11.775016708474512,37.55383255003005,47.55226860974829,24.917135292987233,8.941979514303892,72.78718105543567,6.763726415956731,24.202022271535863,54.242145773130574,32.97688711948184,46.67560534449739,14.335302991691886,18.130502290013723,17.623011095095478,32.220941344112916,11.566286383505904,12.013397453457685,12.405533254816309,12.744319239371794,18.977279719327058,8.518062151199874,32.377748569653775,21.94413390592665,4.095255632281533,46.25168648672309,6.063116891531421,14.876140600086874,11.319962188127915,6.156093209859632,18.414178916170304,75.30455932287366,10.261304460036701,47.15472656728601,8.63842005753038,36.86256937489185,17.017863774936366,40.084025775179086,51.326382873418815,14.121555440214156,66.10080797722179,56.453923389135184,6.729798168117445,13.713523965600809,5.022645620476795,19.157126059548787,56.07054340864961,25.519580042061705,41.42286657456488,16.94507475438024,63.99237105893031,19.47184355463492,12.886823251254375,7.171367292398055,18.0092894611455,20.55116189827023,57.66262574364806,57.076971729425395,22.33705176447836,21.48112252603538,23.446159889802868,19.408893820908986,40.99385901178868,19.096030123130507,23.508319758255688,12.53983351346046,12.807796258584961,17.37243339645325,42.152973393930125,3.637930835139853,22.238267368473338,64.96755814682682,28.125156767013355,15.814931695955874,21.752029085513506,7.9584707973094435,21.07728139949023,19.52328703961081,72.52872118017734,26.49871713409763,25.45748109397819,34.0665592865868,24.923295911141732,4.199167594592472,55.02737533964649,0.8312738674613627,80.86824596393365,33.31490518643602,50.60821565155227,1.7822844610391462,19.73085781464095,50.75816486038967,12.000251580096073,11.465636100095743,14.767382899232866,41.05435652945604,21.411504333918586,6.222192717853204,57.58896997756628,50.930540011413555,48.89905283717195,58.16114443546912,23.55553306242522,43.74651134983245,23.14456090076026,59.94910024718044,21.3666917733768,26.457714574237553,32.91140908051734,31.820186115504406,18.237188924088557,40.77447048511338,26.326477223028625,15.448142450229788,19.406483322103064,76.61795660741504,17.35800790754614,71.81836801098484,22.927241256760794,47.20831617535417,10.096026717259761,39.21230996301502,37.116303881850754,27.621220918024846,31.64293706424428,3.9967296591911916,19.217052413745726,60.06872178099272,46.94955895800804,33.80184699596732,44.76470117988277,39.56719648121608,27.364653201609762,33.273424527541685,15.08725460664585,6.324244118390295,20.31861952599956,12.927967022044722,37.33496631183718,21.71934123088208,35.16498629094808,17.22122959113033,31.960170926224404,43.672829856680906,8.804048920091553,19.25914023694162,38.4803409201061,53.84623966019937,43.57601476381505,28.531563285420763,19.85190638826848,16.39100325063561,31.882296042789527,28.140303915291227,29.972010280968572,13.360928228777373,33.23092905877378,13.421077673632816,29.324430239305656,28.620711570420656,61.84449579745017,7.9434015562365206,47.158398217918005,62.814893590597364,20.47950736319108,10.230916909791674,2.659402812450829,19.537375283338292,27.88364696535509,49.390616481087335,52.067660762394304,20.169221536634875,10.641964534088755,50.49671443638761,32.06351294208319,9.742431018971295,27.426081842565754,19.187789217558954,16.87185223304118,23.895647119755573,36.47758718958676,79.23100480578843,36.56446009117601,31.658695532520586,12.802393322573138,18.432265935858005,53.236726017749696,28.68761322599493,31.8320584871367,23.537009213379093,9.016815625921403,54.70865726217965,21.307441123532875,22.385992895871958,28.210890704702233,72.93195888997059,31.665898290450137,7.096723013412898,27.497297597288792,32.89794547233105,14.68279502604488,52.718821302656856,37.0314902052458,34.15102481238769,70.06755025941462,26.83690211746275,20.97099242118035,8.452100113096876,2.3628958396111828,23.13888533578055,44.636956125119625,23.746138686762762,14.60256112656149,53.15860562023645,31.9677092101009,11.459845008556195,24.785675062105312,15.916501252172592,23.66731297193367,39.82308965061587,18.312685729961885,45.370926602828895,49.01680172941985,18.12911776055088,23.915668778733732,9.30632471534199,11.977826917115735,39.902395053494814,55.04902303184721,44.27465875821186,57.28697226520642,24.643243833297838,48.10836785803222,3.4642413227440665,21.65157740614406,38.234964827136594,33.713509561519224,20.31455453408363,10.190736382033084,8.826927797211955,51.042622518550374,2.633504251283883,42.89560882853006,38.03648987333694,11.427566019740276,51.98780218791389,7.0591254084095905,3.1653719617329465,24.35577367936905,37.06735697558462,15.518269936436848,51.570365679591426,45.10320567177169,6.801875013006101,10.17656067911253,24.456878886737645,23.21873627345585,17.385034561927952,64.38658537582576,17.64665456810984,82.99601371808009,16.786666087371085,18.521426425181655,20.13507761332767,17.18719360749213,2.2246554259133053,7.585792562193148,12.074275617037994,15.361479810436506,20.09264488962142,27.41326066819117,31.430411112659705,26.062478777807645,19.652281345416206,25.972367459161063,20.938117164956914,9.562105295099093,6.642474874100149,18.220453258354937,6.455577220430067,45.98620637820509,2.233209874406561,47.154895382492754,47.60123583212036,29.588139015398724,76.61495554286576,11.424531678951748,26.452148512715407,27.662270255855884,31.11131383327092,5.024937890509958,49.81677456264272,43.48857670225048,36.800160407839975,36.23821946761397,42.69834855352201,23.32230839777253,25.673932313445334,15.176400418382663,7.123083564223652,18.028062476838343,11.052609723975056,5.056157344444169,9.175134889317832,46.01048072492489,39.022637922246595,12.57543554893835,29.358775442574128,37.96098766489643,41.88195700523157,27.847740157870252,58.43940209108059,19.08877759831946,36.251599933695715,19.86926033764423,41.87812562930473,13.639008459921321,30.441476364242703,28.262060488651176,37.77200574072448,19.32772761692598,10.48986717206173,20.008718148663117,35.801762866698105,33.12336304938317,23.632074253878248,48.268115913401196,19.075949762429488,49.52941955532427,21.52770174295344,38.72689276011486,23.793946985559206,57.882192364437856,12.093830595098513,13.100391392972785,23.234891803491365,21.594326238088556,22.916684491223442,16.314599693388793,5.045375870458048,24.767551548072934,10.152292653244672,24.31061595873844,23.520332390453227,9.357356732088961,3.256753393920135,23.090893180408184,29.04704807195669,21.59658470380005,62.9715958453797,16.654140633403735,58.920791479083526,11.2006897438189,23.091908983274543,23.06935925489876,8.28326128826625,43.664875279859906,49.962028251673516,32.55007427287464,14.400895650716667,41.91504174387735,17.879013675973244,27.835200451662175,18.27759575792463,53.29177078915353,46.18411794900719,19.531134115049188,20.648764875460458,49.38830124871002,39.04446963483663,54.58047092878688,16.28266715514298,8.613932099366973,29.853358531277614,17.613988740103263,18.39775378639834,75.85042290045706,60.137028208619554,16.31240112164881,22.625625989074003,12.263333102033096,56.38777253922566,11.073922466426737,44.14249335765835,31.344459023792393,6.292422111057867,22.55958978752585,19.175431177951072,35.04706809519878,26.08101910261016,25.869569073948778,23.488493462317656,23.817675429248695,37.21444052960954,24.188786318048844,83.70272049627079,12.763799057204645,18.297785681131646,28.810126889458747,35.35774743321764,55.08465753429114,14.295038923471079,17.273953402717087,79.97517680208607,33.26252411384823,19.610650564248402,31.282772160122406,20.157807645021535,5.2294151123949675,40.34419157040536,23.787653099516486,71.24886093916841,26.694640279331963,21.56776042199884,15.520545369444118,57.08342174060082,23.22678732947089,32.270525482377515,37.469720573908475,66.97579706553267,8.861755350321078,48.9461526092493,37.596021417521115,30.15901245180801,73.80295086381246,34.572977691207264,35.28467625132572,17.44577445811816,45.32518900263141,49.291021920085505,13.284007053845325,35.94197314914665,39.281587677616706,21.51542025600612,22.17463764940871,52.19491052354188,24.176753844816073,61.022756198145245,16.53205135974371,18.85873375140931,17.920172156194532,52.88012180846191,40.906066554976746,14.281709695559664,22.78068205888505,73.02502710505098,4.442824048704724,31.243223378288558,31.957172175393808,9.090724341610517,2.3583458582065435,41.82530134630468,40.28786288502543,20.113149014100713,20.646805653154836,15.213661734131227,33.51773190177671,33.355409028448186,32.43119248927848,63.70021691658149,55.41903670444666,34.53832833338907,13.956518496308847,36.92813384187927,27.44499839781816,21.902080154114184,20.405575116340067,9.911551398100936,17.177125332598884,7.944006077220304,9.748741020807532,45.7781885171943,9.949837250850926,41.34328332442659,40.50679326834474,45.37975628902904,9.132231111096157,54.445597519848135,57.50155132501061,26.765454307815418,45.50802793859303,60.280566603251955,13.04318904030244,4.168779463568393,25.770209000709457,29.007009463691745,25.78350176775028,59.828980674323425,43.21756143396299,11.685421875112175,27.402558416854,75.38435869105355,42.4952897785556,15.047781555087653,18.891064889741834,30.249255688661894,22.60260147555218,6.790206225011879,79.07008848345922,44.562011799831694,42.07179160552262,20.200519261244324,47.49316966472787,16.325179480326934,16.422366310959568,24.849959612626243,9.83651257087639,24.075312989233744,19.895059463473,26.798273446582,10.061745411725797,46.39243577603516,29.114731407311332,46.12039804283265,9.319429786669977,48.750822412919675,40.03398465657301,32.65437171140713,20.56076599399274,9.467807369381006,42.947814506604146,20.280498000029294,9.279932658241997,26.21797211431547,38.98356738890783,16.189917765525113,24.203827581693197,7.731570625395392,17.58258005503313,37.283348294996664,41.05919207475702,12.290582701975115,42.99341362932876,48.48030142994834,75.32626842111323,26.297682438385177,63.446312097498804,22.829955118377086,29.332536780141908,38.890060968338574,9.11410726755303,44.502909876031744,19.766567517235313,14.909077248166653,17.868657670002104,20.099798161037732,14.026570495550455,64.13333802536997,15.00172879721175,34.95921725359744,75.14193961999013,5.110494851236195,73.19796881124542,16.167499262750155,12.386854447047835,0.5515298575286934,4.192873008317908,34.23583884102856,33.381995256774346,12.430519846292611,81.62841637378231,25.160825938230314,22.874681822186893,22.72464578739365,12.190517387761913,7.117507951072126,31.862784647390193,31.10912221076334,41.20944556556974,54.69846217027191,22.00146226686634,20.09533567903177,33.071671910868716,21.894851528747942,39.11120859146934,23.209160346369046,23.871968829043773,55.79235496151728,44.772986700162996,54.45455352570152,17.00728527704813,69.52258743137759,34.18677460352309,70.7330957439537,7.742757369649458,3.999074230457204,18.659274076981248,15.110499714111558,18.75509669080226,33.12281304146864,64.69615242134519,19.670295892418544,17.47939314064852,45.45821251556946,17.39247588680285,61.28310022443193,33.724578381597624,42.92607031812753,11.745223633368852,21.13036870487774,24.605591545028307,22.826084643407846,12.983810731036623,63.60551855115169,3.4075445909665127,17.982037755304994,24.42684464942164,40.52679282450469,42.752717388980045,46.47256087741173,43.753555997660584,19.515278402345977,30.059585921524928,35.129734493210876,10.14584052451167,65.63937253835282,51.1221951928956,26.22945349832201,84.67242220844082,40.99835654554464,56.04655631068936,36.91995243390659,37.94566372276178,33.39708621662506,35.932235893818145,2.759766229264419,19.181709178137755,60.62230465527216,22.23748044431335,9.244237500882875,77.69468074643574,51.142010234071705,49.47748821708129,46.34786962387305,69.09643075226022,33.55492957899024,15.661596918654432,44.48341622470566,18.44421080708188,45.74219035467837,26.29829187906548,24.853756556851184,6.569329111921772,48.09677381058868,17.178872339798716,22.143153241840306,21.378051258730437,11.186040036984302,19.55028672121188,77.12510017927181,41.59921807980531,38.754658461849836,26.30873214848609,24.205292195646408,60.122659190947104,19.57522720604902,30.637930939551946,33.09398566021371,10.741813388168637,20.43957875638697,88.92853282533252,42.289938648737696,29.902944250654286,30.17313796566046,22.772491070779374,53.41522959396397,68.03556193650726,50.92601897091924,44.51132641149056,40.603800085215866,31.684089335863167,24.272714340794934,20.24040350353312,43.81409281943309,30.127000096869832,57.4711882279289,40.54926561778223,35.721148974033035,59.43524612676633,13.590774921635498,65.1024801300926,50.51524682237348,55.615699308587125,6.064200635037761,14.205554670219097,17.506029930267132,8.992546035744162,21.79529471815523,12.510577334927923,46.52814081316019,34.96762792965284,19.94284873296243,24.412068932806843,20.527060436593786,13.596720859228707,8.872205997357467,75.48370632247494,8.795514531258304,31.519281417462146,11.286917494894062,26.04611247132737,13.630128701539963,73.0502005206327,32.87783450349713,3.7950104656783132,38.237728932070205,40.00225161906287,70.4929191527404,27.339104172212743,58.45336410344487,63.02047379934858,50.84519594230231,21.213129398652203,46.19861514125253,69.55595231206206,14.905337849530419,12.123812870378535,37.075129217183274,33.9097175866056,30.416377353432395,22.884643271787134,41.86692258171442,12.563985411749496,13.00637962335972,23.5843214498598,37.34614771236959,54.82456904347763,13.546744367821617,68.07841864745063,20.8726499319178,11.834723740312384,19.868999011208135,66.59324131151439,41.19462976413938,12.937453606592232,48.885493456880916,18.550970747134095,37.36447342569983,60.65350240960362,37.13548164276605,3.837303022342773,21.23371737848376,45.4295187513665],"x":[23.09373086528305,41.22315626892217,27.176389202381856,15.433298477016564,45.99423601767169,55.93968451496143,28.627176430800805,31.61737424660761,6.775866370576704,62.41568024409728,9.431232227235352,20.283698309524823,21.0048816344568,12.745135104948643,18.601203623042608,26.449422657073796,17.902320098774844,19.485634292272294,17.396440293937218,24.735096216099134,54.199251880512904,34.7219474456208,34.51706867284009,9.81091164382362,14.788474643048646,17.48980770735052,4.795706951726757,5.101765800293464,59.01482592787964,54.79102100773311,41.16678866495023,14.203888299493617,28.596327956892296,34.4101250892499,15.009499328883848,28.684878412934708,22.205900794403334,43.338856494765906,45.761612496155195,25.25260294228246,21.115511754246704,25.53654504635026,16.672979614534533,52.37373079185857,38.70968855802739,15.15335659882667,56.562267584368826,21.35716907859078,40.70620686258442,11.008025663704757,51.31824037714905,36.36480678866693,38.6708555727005,24.81860430627627,29.41777356020961,25.28780411479288,14.192206172563946,58.58575086643155,79.226818258984,64.76701946180496,17.146079752196894,8.948088362762913,11.400887168169799,30.530409599143077,59.49815082508272,12.490962051756709,72.30020389069605,30.456240716307484,7.325823957197548,12.31657421876071,23.90734929895539,24.041482202903076,19.72913902241036,55.629550569788734,1.5122695919421687,15.972760001590858,35.74673158956062,45.93976043491645,29.555471386490076,27.267422482571966,8.093958943196887,30.532020706989456,25.74234637295789,20.112358783670697,1.1711589181264084,44.74365072844696,36.80936232517169,19.39681634888612,36.39049099697293,27.888829263676165,18.842328733023614,52.861602417514206,19.620825029552943,6.165997520080139,3.0109309790602072,44.7896276100856,25.07086764815024,18.938364861007305,48.16524065291046,56.55568008581052,37.22443243381512,30.56789961980955,31.747219340765582,25.422563065126404,19.12559925346482,0.998213589240537,60.711309843615616,31.72491293479361,61.22536021675664,22.696577472008705,14.39142789014858,7.659451965909074,51.07551097472327,74.29889537148479,4.562360670661889,22.990560607514784,33.346656773131215,25.540976255080338,29.70585091547264,6.007535715926518,38.83423281173375,63.3327574661096,24.089646999355313,32.985830933915814,29.81446228107424,21.514556160929644,51.281336673563004,36.57259424128955,14.057533998218734,23.34294052793606,26.010092868852695,48.57300826038832,35.71256245161651,8.969158692030206,11.111548491360725,53.686280569305,23.13498537534347,10.622927986452558,24.741655105530782,13.846677852453107,14.436077649160982,13.137959871268068,13.50091935680137,41.482839572016225,16.966553412181867,62.76049201143285,14.11424874789908,7.097513623181335,24.192324427038827,9.860432929112948,13.977442094173654,12.958716052277731,46.23057440613122,33.96966548017352,17.136785989418723,32.83339195248182,64.29230403678113,11.271898711359563,29.490491281477887,23.441703981474618,34.75812640639843,52.22272672265881,9.842590677329106,11.12483068279281,17.355623488758546,82.10842502200961,66.10076576568744,39.542661626946554,49.651669519707696,27.84399192556817,29.27200335948331,17.609079306469322,13.030941107332627,8.687854406584849,61.51532382214871,29.116664061864395,14.606465429065345,3.9783456531413095,29.326826612671546,29.652525991596885,13.479710025845035,27.137917682734624,10.123179351190714,4.496739688798256,42.27592135584982,58.442036205210634,21.421822193837478,48.40480367197481,50.648068389119814,36.61043963822779,37.50673710193388,1.159745175436446,28.911302475413994,66.73715924166731,37.150655001704386,56.906427608050556,53.01580754,39.06583211935509,37.6215393961056,3.7064561337724973,23.4244184543981,75.05331138849456,41.400621053117135,36.40009388183122,1.2737184665643957,11.571555461662097,63.77321233230656,8.554667035910583,44.343277953511716,15.921508906948603,50.86524962723164,32.730834006919125,42.8200841916494,10.612480196252173,29.804285872539822,15.111007243824915,21.401967912604714,83.16608057736876,12.784747202657408,42.96080670911421,10.749576154353417,6.318888979247385,25.17346117747745,16.031419551542182,7.314784543497595,17.82195514755697,15.174919070847384,11.227126647229545,36.512312237997705,7.799293752652456,43.90118412736593,2.522017349799187,25.692024611639663,37.101209059438666,22.061581353803458,55.526549449359464,12.649826492666625,3.9642550175165066,60.04471008793316,44.70436233453092,14.960782020275662,27.64045971512106,21.47114925518239,7.837457816593644,54.02202573146735,35.579943653355976,58.268809349044105,50.609298080500174,15.423731592896775,43.27502158133153,34.40195771435542,30.409797964112965,24.183481852689987,61.078464000600775,23.830122604765762,69.20364408229264,17.659202403303926,42.48675472679338,46.76847351014358,34.141586510808914,52.014298027552776,2.3287820255904363,48.125497114504086,22.505417394491012,5.5720216238566636,59.52720180438814,35.658103013227155,19.254580957779993,43.65955549431153,11.805390865738952,17.347100680970545,6.850821548907141,86.68237593183302,10.394975448414488,18.172169287455816,23.681718488844297,36.40633202045521,20.63454141556834,33.16073353629131,15.291619172611846,18.408207454663184,9.726902697798103,82.83947257562032,6.0736087043557605,8.085485479165952,8.0040840691875,6.893897041104378,23.959087667692806,73.01958681113788,10.218579519459684,43.02061279500074,16.423696698451785,41.36084586867176,15.628817969679357,55.757501079886104,53.539450022061466,16.202999948045722,71.00900980425263,20.739968679181736,1.0566244256050998,11.492565781977058,8.996715885653007,28.648286160638328,72.83134937402295,12.823993809145877,37.02141902450515,23.249292475720353,57.624875765080105,28.620771902843742,13.214228626370577,14.098609561869901,12.634871557367585,20.844897608184766,55.98251451713627,58.32331814339661,49.4787898667714,24.230588718405794,4.958258784416868,12.921018166237385,16.823202186335365,24.432146907738495,7.642386165511084,25.198596207305144,2.279450041296974,10.628297194751124,59.480374807693806,20.67887189011627,45.928905765665945,60.453549709692034,63.92441360696939,54.80128861777103,32.120061114587095,7.307911765929723,17.20954658362235,31.88604934117918,62.71685779470427,21.072591330836588,11.60402132633643,22.134736435327994,22.149464959675424,3.7054588656479623,61.88750821587484,1.8013178097151672,32.586060677037246,39.90362553109013,66.16756929576843,3.426896060651644,30.53767809141533,49.138428580495685,15.336775970810827,21.30026324337043,16.74204182884368,27.010523451506465,23.96387316685918,8.582703057830564,61.80786365965181,31.43404630384555,70.18049482443341,37.738810003665144,12.024407016057596,27.179970093917703,49.42541357836723,29.668825611220633,20.594064677164763,39.398149829284655,18.712312932445514,52.477600542452656,29.043338372655935,22.67052577185335,30.705659738613917,13.41856384102259,14.630871152451771,76.028581206021,35.41542365501085,41.49978899497564,22.796260600451383,20.891931061855686,10.393012632203991,14.953922206942977,21.861660264310515,40.597822627416946,53.899112964345996,7.382853860668966,24.341285199382956,53.67034558014903,18.91300774844987,49.21054925395252,44.913688675052725,14.600380947576195,57.851407879075225,28.551352458043468,68.49365742263765,12.645167887472226,13.228759831430764,6.986969069575698,14.224008443130636,48.45595534836201,53.28334467024147,37.41828997388765,37.12549057512071,52.540968099849394,13.12888883665012,19.946962824013653,31.494802493022732,62.95604597325557,46.87098434516738,27.306353881678966,19.441096628570996,15.592260154339245,16.58225804221946,32.433366576012176,14.05733714352196,12.122608880549878,26.514988884534713,62.096952742124444,18.21898348266897,46.49937408297346,32.06518520586504,8.454693850432797,53.06804558137101,7.104498837679399,19.41518244790207,9.411415986261314,2.302559426550265,34.65570593371373,16.567951556975732,37.0965698886551,69.88571121472701,20.594193710681076,18.958144946846726,30.922935569772687,47.4958284185895,9.836294114831155,17.519037626290626,34.41936693840594,62.461175977093944,16.68811465843747,59.160344914037566,39.33029399529547,37.926796398640796,54.20931987796712,15.149401702787557,16.177140315819155,38.452904398655534,36.72136826316642,56.0053952701062,47.575638826294714,5.0756350971535,50.261634158093756,17.84512132379385,45.17226083593374,10.2677238621364,40.28603849322302,25.732896638482472,6.797085325490556,23.994973208968798,20.969264687633434,6.55890639077477,46.47981161013379,10.038533714889835,34.97053131687782,31.21730906760356,24.644662469630784,16.108644990383766,26.91971789315192,2.8068218785700707,10.294412366482945,47.813836940096834,11.211406681324313,22.148013977113756,39.13738529970534,23.2951026138309,11.155138880804445,16.187267113035887,24.54116443455652,19.358094170783623,7.469354474193995,48.20420600934183,13.57511918491931,49.33701508859852,18.331205026789917,7.727965411020039,10.092269280146503,24.58789950010791,41.79834756371197,40.447966178990534,27.694745592089056,30.36898452171482,22.874253276244644,42.0676950811236,7.769333156037378,19.08872326267655,13.849917751331901,27.091086020465433,16.70065958303704,3.1271824260473795,10.175228491666942,51.27712009641489,2.2744466817154,10.6366759997137,65.55527449287784,10.627501812338899,23.579119117309634,13.555719859668796,13.241549992601852,24.668139764508112,15.39580211603078,38.217931773455646,35.9238838292841,55.27967429421578,3.68887872070096,47.08821089467496,15.743858613959398,21.165762004312874,18.12405356757523,72.77521367743773,34.242982517035536,65.39165461421196,18.125367485677735,46.89746747183382,20.843871092265424,42.50435333210542,2.5937750358567024,33.1698347353093,53.41225642737872,8.011374008293263,47.89520103102676,32.67951771059765,42.386393706449816,12.384340405078422,20.792605571845076,22.314030015386606,16.718474043247742,22.30140699219576,24.433107135754284,45.508869916322254,23.77600821895401,38.81579266240608,12.25867849108891,47.17688474513331,21.30643641253102,16.677251336529537,47.774551250997945,12.928035443982528,43.84247872951731,40.745684973751196,3.1537580171482116,37.242946055778205,87.75018536284,33.08119745065753,17.427937558977426,50.656551871239884,18.751508464477812,4.5178631486716725,27.30850302150462,8.224921754259139,11.5539295946312,16.44833009901567,7.867245045185734,10.472997838008872,6.800736965264172,16.486078068601174,25.30573706387251,9.051017286198793,41.54964030167291,75.36970784728149,44.71529381352528,44.40956608870743,35.38129283812094,50.07586779081036,30.26350213368744,9.368388919228266,55.079438421354055,43.6810937073728,40.746552412778314,39.09613178568708,45.30838344057024,53.67847901191654,10.896827025485859,19.181525346426675,44.45240969891398,64.88551969380762,57.91431345407066,35.066253749945375,24.782046322701607,25.896417274984092,55.83052588594522,20.88660198682079,60.047713299111415,32.807500820851416,9.066590679877997,22.568053340714464,27.906283995238187,19.21278605455634,43.27381797694078,13.9986679434828,3.999180037662782,39.47080713302823,17.18384943022839,32.83238415283636,38.046727039318306,9.728428369800099,26.608265536617115,25.903181362428466,3.950100112622809,15.833497245539707,31.77883055235344,10.568070100108894,69.98976861114514,20.985813318894145,35.54678635460682,23.212739422381638,11.750867940321035,33.80305162511955,35.518412014607804,13.188577276523752,14.83257482650958,70.80242356078172,23.795665094079403,13.993342062754213,46.22421024462196,76.59449306486833,29.709298783702877,22.920640239523316,39.22827490953138,37.77445006064118,15.451397888815709,25.982113124442535,8.464676087728602,15.001065789034044,20.30933266391698,22.647979049475857,11.008903287976562,30.0205897911548,26.444915301586683,14.465613975052253,6.9189975805019905,11.601535286532213,32.41452552479522,61.28730322474431,46.593579634896045,13.772956047692166,7.818906086834261,58.5948344331422,55.16198523856907,55.55897625932054,32.93538539804133,55.90084373836513,25.227489086290834,42.82329641781694,16.782363227881117,20.389427256783204,27.703608814353707,4.2164484852644835,17.633288592600195,55.51829274758906,4.105650045887393,3.7063109170086004,2.8967299516499816,28.099606244073666,14.049209941698612,39.47679572577574,26.74238578010538,36.277265467773596,25.176241282806963,53.12080151318381,53.19178389010553,31.355109363658528,29.35203641193717,77.12845443051575,34.96498810151789,26.003400878866202,55.67362129393017,18.101814526997966,40.79563125118449,50.864437201324506,39.75242707460289,9.496826373958429,27.26928620148245,48.18919070405476,15.7832844997657,33.419239760133685,57.212856801583634,13.773524689773613,26.021928837449593,21.78899548752927,32.86606246119628,13.83751294788336,22.589024373593848,7.877120047370666,27.7069506370684,18.545805199054932,27.028025386438998,31.285451894588284,34.960893069263754,9.120730911967781,17.598334771007863,25.041638436615735,62.381230682947454,15.487562047791002,10.495117164019506,18.558241777982868,23.51512780323742,4.637460534051217,14.872700045119034,17.17162471924796,11.174448759586195,4.096997292898392,83.48109366869427,56.883453073983524,20.91729885902444,15.867445524861987,15.803477988387195,30.497412501930288,38.99885487878906,58.91903340388986,49.293594078409406,34.40724272873354,16.27518336620835,22.68791531445557,26.994033239134605,52.50469440311215,22.29828618170952,5.295763234460051,10.788486948790723,15.628868854809799,8.34008313156753,7.193800179528514,28.580008718672794,1.2451073600271143,36.29231490193135,36.50856642089307,22.308940673203892,65.19483281027757,37.82488557412255,18.77023796752714,27.299866752035257,6.557489990195767,25.79211957870887,16.650776917193348,4.753466780877674,27.597160755415835,18.004615279801154,26.09791419435603,22.53556342430917,55.16867729946315,11.505016689494717,61.77043945138193,48.797308555385996,23.35309563875227,40.67961939677617,34.26851435284674,63.54955655161716,32.524266873677156,6.840160936742419,60.34577683191329,42.06850450668209,29.237714529607565,18.064574050860134,45.09365716743781,16.04304862182356,23.998310225954082,19.63593264270894,7.809934453107483,27.503619586995832,17.533301397808014,20.00402011891132,15.824143000888446,26.13010742858214,42.104102033620876,41.144524386328996,13.21364463226507,42.23010764990726,30.08165205574819,46.86077869123598,49.99097830120209,5.0286254676861875,37.590780518455944,36.313811238230585,6.506876001160649,24.405449237504175,51.95949870735008,17.79677102120857,18.646665293883647,9.425735070070095,21.685056909221313,12.96536536976847,82.0844944640452,9.949755815278829,70.3497450237393,67.17074667652025,51.1689293231218,40.81903121192549,27.153323763234788,20.536067515855695,20.6141632594231,25.41829257032393,15.345192905456404,38.79599100238822,17.97813008708408,29.196734171910506,18.52307644081543,23.722511857930797,5.088748146047036,58.43669319925776,15.040281399774745,35.27647280621224,14.148001812493039,12.436473093763485,68.56195211209284,15.826718402846518,19.85033153777936,0.8200412007394833,5.176873328722884,37.546405564191815,21.274951615442262,26.691642509175416,60.35270832055791,29.710985477458,42.35396172017212,25.69597610040804,69.16399374479548,9.110895448356167,31.80498510724359,44.94129963805154,65.41842758563416,44.77948647117419,21.182616544395472,26.235557400553507,16.542956051777043,39.75799152118215,33.6850777353809,50.71906144996127,27.85103799759616,13.988527940697661,65.42064246146242,46.31687340367005,24.01336712445666,22.571362278120695,63.42048267969797,3.549167286453491,8.595580295917909,4.903832213320499,18.43843400879739,14.795798621031144,6.221763550962406,10.627892918349685,69.41775132315998,15.459339401593668,14.748480568245816,21.92270694684463,14.026080037255877,55.00593319930367,70.22007020432538,49.38274500164043,6.652423661734698,39.53171410038124,38.63098320495726,27.89068937526687,15.153588807709095,68.19229640227974,1.0501459174142769,18.664131635759745,18.01572149034848,79.24554188238197,70.89127706802984,25.974004382277712,20.846602885833807,16.08034130036829,23.370124323311806,15.712680064098597,25.474178844366207,82.73061274137392,40.97061511919338,36.480517029673045,33.074930040389035,21.431472262704876,34.942380506282504,46.14612774898738,23.9119823618598,39.76647470820089,30.878888152262896,7.854536579802978,21.308393846633635,61.27843532940284,29.461419046307633,7.766540644629378,28.64002283667986,21.108217378567247,67.87375547128408,61.132401691142576,26.79654237107638,16.211805579647702,6.947200042300162,24.519692860529222,32.38602458181861,52.74438426401423,35.87991134198918,44.62655285896878,72.25457729680511,44.294890943408255,28.468636676255343,23.02529371854454,28.738944082348745,9.761296420294205,17.59278540715444,23.594102807680382,17.064578052088088,49.37544812176646,37.78702437546848,19.809735076106175,29.602673426653467,22.842704716923084,46.653649035670824,13.28755737199157,21.49314938657056,28.042538029513985,61.00404491009665,35.87479907842313,34.68771075831711,70.83346367756936,18.159809972586856,31.725685168451808,30.372133267640784,21.856267433739553,30.10768211769232,72.45045808334397,11.614633618805867,21.01092061014566,20.803103313749098,30.408759074226907,53.1368580359324,49.11655695929985,25.867626663422904,37.819994106044945,72.95484636502903,57.32060584604377,9.573171753886633,24.78755198102774,38.56270344664472,15.74931954273143,15.551815311897503,14.835533146775198,9.733153215209356,25.165028196831756,17.089265938284324,34.175748608867444,65.66637042376202,12.496404814525208,20.835529643819434,21.748387952451253,16.249721468804065,39.73987895339104,78.55005785393476,11.335205598671779,17.17439352799695,10.587258898028688,19.821106261351638,23.921363126824847,59.54647667092426,17.36710650224971,3.786364108207528,22.2155061150943,28.334172782134026,12.106982290884094,41.430410513402116,59.218952445490196,43.71027758188049,59.05962752566688,24.55828142226737,45.9247489808996,27.834331817787618,15.065535586139895,17.38641797786461,56.05955358046117,45.34838527669552,27.211710340008505,20.06958367182657,17.272025965042108,21.984603661188224,18.07276818048328,18.767087409579926,23.994645139095482,51.588379933227955,13.801095340036735,70.57581105703487,5.109057587832244,12.631037225644612,19.681088976330795,70.52086243631395,75.53801353777388,10.216967679573113,21.678228303000658,35.09814124855856,59.72293503830596,46.02644017142012,18.029708638445186,9.845354087666093,16.232844474660062,44.79764508723911],"b":[34.65930308616806,68.14846237931908,52.68930096015329,19.569150286473715,53.855489117980824,77.50578343839265,80.11783023628354,41.98433839591178,65.15235400291951,81.76807812546352,56.20604535036973,24.953444246890513,29.753013765451357,20.61373659697404,48.39570437956603,36.404894823781575,58.08660242112998,23.29310146000701,89.11503737444801,25.399395927022365,91.29008036887407,50.708989920322814,49.96926226941185,23.896737256193763,56.041600700271616,73.002205855821,8.599949290730962,8.606565242052483,72.92359897820904,56.31284309068222,75.24561580002035,61.243291226189896,51.04213989103518,43.920816535401585,78.00835430677101,30.076167236151633,71.56337531718984,48.154338529331916,48.542175926374085,26.241001799556642,33.402893025018045,27.40977999563432,44.998594449805736,60.81468528528516,51.962668132194906,16.08021903177175,76.4337623759935,34.848519081801136,55.89496143129022,55.94086594624487,77.11892656139123,42.72901483430971,63.528416573619666,68.42311446996825,45.706514411785264,43.9339874868698,39.33199716092042,78.19737202504463,88.81373772212362,82.77356031716006,18.58201585427923,53.767891445571706,12.739765652351789,32.16726102940838,66.86769947974929,17.013363036286854,85.993409426303,31.235462662135998,10.629768814204471,30.102046667938332,29.617355924795714,31.711490798052868,19.90615468427091,75.43905877175774,1.8919772383986455,47.790322648379195,48.57913744917127,46.36314955102134,52.329264523061475,75.67734180142297,18.88023364108703,47.632476448963445,38.85081697171524,54.75954426677764,2.0702175923967037,46.09641872570369,42.434128488469725,78.848163547632,43.29751197091409,71.45611429041989,25.755087725498367,75.6988010097572,20.55974657962834,10.929682322507741,10.320087677888981,77.79832371450519,25.91765884892624,60.15553259151659,79.19557835931282,59.99292461244244,59.951289668139374,37.516805000206425,76.64609596945519,30.52805896113792,23.401841058111785,1.689183380574435,70.42930014770145,70.13267824728035,63.04923056991119,81.8877300705626,22.65497104725522,12.856056251785919,54.69246783621597,87.10998999786361,40.966097937622294,47.18646917155761,52.80976530526078,26.205631623684674,34.750558492690786,22.663117817771315,71.97400862984325,71.8154158397925,31.24628240118785,63.02899483703735,82.6144563065306,70.39447265538615,84.7769306628297,44.68407948411443,76.05558502021884,32.90550902771155,38.8485092622919,70.93876088000465,62.973971721182764,15.176793241060658,13.361708514492395,65.83357987721197,38.673101996510226,11.123825887974728,27.540021337784534,81.67292951374642,20.058346292002017,18.105186590305568,14.120641193809984,46.420049936272505,87.588012103988,88.86790914828995,14.36202911554604,14.117354406794721,48.221988383058466,20.10771172313083,36.0726359907716,27.195120858717665,48.89411628033527,38.07409169717445,19.584368616094658,34.36588997078003,84.45707489191453,67.0477607793623,60.14102162232942,45.14112738310527,44.69127693902463,68.64594911756544,24.838393723441815,44.016245529863745,37.77740927864088,86.13430146466445,75.12849746331774,93.15948240194142,51.62410953846589,63.82608854141746,32.86923703428343,26.59695310452575,63.755983863158825,23.345184322487246,72.78433318048154,43.197208798603235,60.146797793364385,45.19377361961213,92.993514729261,61.56815444539524,27.086121940944032,54.31020312302819,21.22804234503086,11.540395839784875,44.73074783928826,73.5275417796709,30.54046688563718,67.73938273014878,72.04068913930183,51.74255703233315,61.29795362366933,15.882551364446101,82.17601910409275,87.2473898839967,39.448106504953216,58.457163305277994,77.8225864239635,62.82639348268538,64.05055588201701,37.23798787491614,30.948050917770264,82.2613548530105,42.64321578935248,77.02820733026653,38.523173846300814,34.732613859415075,71.78836053411928,63.448289930954175,54.34509879407586,59.8473681654611,60.9950229614819,83.22440327969167,66.15630458959427,23.282110513179802,32.07348720838395,70.09081878086198,58.29775236840037,86.35700600847792,17.605166148632556,80.50416630995733,34.465509143163416,23.024367050896988,35.22052788952563,27.18388131860534,30.64216950061237,22.01912021904876,60.08329382096828,40.09951896467435,38.29713209614111,32.207968138217126,57.44115446611426,26.388898334823693,47.66972062939054,40.00070183058105,59.34599497301669,79.3286648060153,12.776161400776292,4.869020747927695,77.80523852554359,54.747891675694945,38.41626404745517,62.512524506818174,57.664283294934506,21.337868875380558,72.07010696070292,68.38691457532876,62.8225424160681,54.34624600366552,77.42845403612876,61.437865355884085,45.69470009202914,87.86525483171273,62.65672149291923,94.78784086723039,45.203561235863766,73.09094293185022,64.54172429146172,67.90489023197088,51.1451931885409,48.98625382691844,71.867466886305,55.09697915440896,74.40004823754414,79.94381058727848,7.615272554787107,69.57785288008071,74.89136788981897,41.195112998069085,77.34252647531905,19.518479024325174,22.527787466965815,18.33432412756664,93.41127548079118,13.390276534953038,54.978069082090414,29.850677799461923,83.50085755703195,43.60287099379564,51.0631401854671,80.46236679989012,44.434381303003846,23.09055878150346,84.30501494980014,7.1681291787883294,15.333881473803238,13.00912358732571,7.700782270739106,54.15405301931394,75.87395854608567,14.544583336973336,69.20534435288907,16.999411630349222,76.13643763882027,19.44032026703026,80.0165851940235,60.305448673420415,16.467412831228764,73.91916475902002,56.60126212634263,7.405885875602278,17.795971641741396,23.936165245904352,45.86786427005777,77.99580366365407,33.328199297590714,50.26689134790453,30.380620276891147,69.40455380642472,41.19518055585703,13.801856493279164,62.702235160394956,36.10195525301049,37.26798682883051,59.34403784076061,72.05240535392907,69.61746242429541,28.339081144687874,48.30602949437255,21.771967472245194,42.76315427426482,28.270478456097436,40.758462106292,40.3241794668928,13.23958531094576,26.178429022206565,76.87241301356144,30.224299804157923,72.56242253623252,73.77019339944782,83.02640196090546,81.90795783976432,38.25431144350051,10.961362133000371,24.156680922351565,40.63070418596891,97.84246025707492,26.82589217980778,29.750455642536217,35.24130194126563,60.29924848124353,29.58359238305192,67.69666985429944,4.404514722676178,81.93504040546486,82.93018562512495,74.26287151231718,66.86297336634289,37.969682208117426,69.57913612743272,31.543100257319004,44.633809746208534,48.43867752458843,54.59797504525677,28.689898942812476,27.325902909949736,93.74439936927588,63.603295077951266,76.3814485748494,81.33809545258507,80.04266225495174,50.68718396268591,81.40298809637197,79.49726382608503,28.237815319088057,45.87995324786549,76.27948902082477,67.6776639023167,53.92909226770999,44.20093033033031,39.42849783364774,79.98615263800039,79.2208464392767,89.05587844844077,44.80238302384428,71.95860367816488,25.587225616920204,51.74318224519665,10.972945737759465,54.34283377941804,62.38904591709369,56.035240070060134,55.96192752406048,29.118012848435733,29.019556615780235,67.87588078330703,47.91705453345891,65.52367293103853,47.63257188365898,54.76671755197875,60.04979063076219,34.45739452692742,88.65739804476647,34.83886492864738,20.32070858269378,25.552965799843953,44.42807402020462,83.7556159007312,72.95021528430587,71.53477624569479,43.07168177688334,62.26148214818975,15.647269080992459,29.54801004339108,39.50316832807613,68.05494941286517,46.99181937561371,29.400153379397356,32.5929635521288,22.07751414090415,69.19393236648116,57.78724735046862,50.26544741919552,15.149728788531384,50.353856724725446,66.84491150278896,44.56077967976617,55.14425824904988,63.20110815360382,32.27917638998633,61.829810648595235,83.64817462512926,28.58163822550489,10.30217778041916,2.6807839359096652,43.13879839278052,38.736147443095746,51.8684809027539,71.18037256073885,23.60168691206072,21.740172731029052,53.636431970037435,50.448963952853056,10.004674892033307,32.609503016060756,43.0810147362679,86.62906349279287,37.80616522513306,67.37892449413465,81.20670591644223,62.27790991614439,57.82883633918267,50.67961863422635,51.37274923204559,70.37863875773172,69.74464557244895,65.12481866565366,53.603645433698325,9.581541866434193,63.61286422351207,25.328690065637723,46.44211870541318,31.76557305882206,74.61820503179541,68.24317939798824,7.19218460865068,51.795253579501846,38.72952188504364,49.265911036359185,85.3864816588744,58.15647460010015,45.83264393616783,76.31029148170222,28.90126601997201,24.173023302124633,28.775976703255584,4.340187081719873,49.04581295864415,55.9086834004804,28.46659419576931,50.160512644917546,87.02615754418218,69.27293014409803,12.060375051937267,25.066188622824328,79.39247740903677,24.408376365737187,41.863439877362126,50.7810236306619,55.75859873147369,78.45810817711346,19.00041299006809,25.962591108225944,12.348734204156644,36.318443062889244,73.59300003335441,83.07517031172401,77.27913652948645,70.63060273144141,32.04399082640708,59.0127855653731,18.946810249627962,23.248783504797807,52.83174321924194,40.241140003925416,20.35945403152574,16.367094201703733,14.8793327380738,53.84131681742349,3.4717226074972984,76.99218189608796,86.69803492212334,11.582109082215336,61.95192491658918,13.616370223322058,14.909585916204824,53.548865999225164,62.74167898165899,59.814325849436685,55.48369104942176,59.15754492810221,16.12789296583138,57.12636285029936,29.781057358067685,27.003442404234782,55.69839013084392,72.90041476718129,83.74204232536638,93.32043010961522,19.929432133046628,64.83229920304117,20.973642392399118,49.98683471538117,2.7365976957596816,35.50444766404166,70.45856101958103,35.909811596539626,55.99157883802591,40.00488350666385,51.787755400336344,38.18237352193691,22.181397748608397,53.39907585719085,34.56594633756289,73.5555105383106,74.43714120378263,70.06333562471526,64.18992180177761,46.17029445794484,21.43821611512255,70.32273684557143,52.81879356737694,30.831153734562157,82.61408142161545,22.207922936884007,56.17742741681818,43.52014170720146,62.774634510014366,37.72687953293848,90.08351478668742,64.53536388009462,54.95341816364646,75.98586284638661,49.18871652926431,25.9810368139594,28.09699794294726,41.48125283858895,19.40627313742707,25.21017997690258,30.94224723175841,22.05586436677466,64.34976905486145,61.517319044976794,50.38910441137993,14.182160483960518,49.001984910419765,79.65904505151758,72.31340263576455,51.76652547925148,66.11987035059522,85.42815672629968,45.498813732869365,55.82016307107401,77.66002081670413,78.6995145657154,54.59310153210418,42.62026762936169,51.864667771798786,70.11450969769623,14.325854838515543,20.9521916120641,54.67458978337281,65.82296591792118,67.72958251199543,68.51417498372672,25.589541556810623,55.00151390850233,76.83688522210156,51.76849066941452,85.89911921492089,71.2602697932386,24.022810425199417,25.821280222224598,30.602101702509582,47.91192005547424,72.04116391530914,16.550330493233474,5.688743105288685,84.91075374377934,42.48725032052648,53.97521471674716,75.1131277000049,10.491778895613283,27.61720677331299,47.407150442426556,44.287438987744885,36.2438462280847,64.6525777443237,26.200198343073744,82.0921229918971,22.15299414424505,61.38948942823624,84.6934084258069,24.24578312503663,55.09684365172749,53.24685355727634,58.52354384127774,15.556886513880258,75.05518639383975,24.916677599586645,47.39693459254204,46.65381727370827,78.90923979912158,53.433018871275706,27.11203882086123,80.2505708564138,73.03674448219543,67.58507223117986,68.59295409170933,64.76829695145565,25.92557081469328,43.68355915447028,29.581148500153883,38.756765177987965,77.33506222735764,67.42192118576762,16.724615296355616,44.51495544001962,13.168548197878343,70.18025597738853,64.76182059891858,51.55309798080285,45.095543986949366,8.069527133450203,74.10776177206337,62.44139756881539,78.49870586305629,39.988704585504735,61.27446994559296,52.88115347091072,57.55404465252522,43.209553231267385,34.297105996074606,95.898031237466,36.00829771001665,33.17422701704477,60.76251472040647,57.031708811507656,59.0117390332539,34.53291625582583,38.892931203602124,83.0191366248771,50.15465492426108,26.972680482730137,69.82706396727718,32.941362721492354,55.67256948272135,84.36590431580599,56.91213231690922,83.06714959927093,81.42568412606116,35.978327466378545,26.94415381088879,66.61005175731023,34.965816980501586,72.74524414427165,55.40048676258028,87.44233172053737,11.34922450904324,78.535846753653,53.732124859431245,64.44190833932818,76.99197348351504,59.26808741237164,48.7698683526779,46.71759289099215,51.05252499297874,62.109909225041235,13.864059385542324,43.09022198372139,47.30265036936951,46.77931903635347,25.531438430452155,71.79420304661195,35.67548955441289,69.06540513720402,18.834250396092365,47.23726610317464,86.61703296004274,74.9030105420287,71.84492983252832,15.712582761247695,29.400741544364806,76.11598274830524,16.09615630687388,88.29135365553165,68.1835094123043,17.89877521672487,9.789956721633285,86.49723665378441,82.96880506193023,23.255263993311445,22.39792189832685,16.965788825305665,51.5405050629927,73.65608059734026,62.56217690895863,66.64866793655129,70.77688664778763,73.47766663729475,37.41026911744639,73.43751457771756,77.07936486664383,22.891734845900256,25.301617974274716,29.223901463603955,32.713311119047724,11.110296308908625,10.885101670647185,66.76226087020142,49.157958150059955,49.067799883694605,46.394446231669974,61.82724620055567,65.20588866343725,55.038336825778636,80.23152501421292,67.35992275615996,57.75334431780597,79.80756585555498,18.696690586572448,7.674126461587059,87.96054668960139,47.053683228648964,58.096155671497996,76.00415149367598,77.05373649384502,11.9362029148188,85.38008186928509,84.93137990506271,42.96918279973265,55.32872777635471,48.32068614941117,71.06739311817854,33.049058610723506,10.050487039793845,97.31586862971454,46.023656011814104,66.49047642034945,20.308608907130576,51.455204874568274,17.31700920952956,39.75139759763678,31.41497150846058,17.079802074085883,38.463808528393095,31.108939090966658,80.54695448108035,17.76953777088044,70.75365229127166,44.1760629261014,49.067758352651374,42.51557126194201,53.75037729917916,44.07660530046376,48.19210051619686,53.68778692769288,42.98237091939433,68.38288699666752,38.9614496416405,11.67059112024691,48.01608783729067,55.449978338669084,18.000259394218013,27.260202394435066,19.837534797159467,30.86260358084711,46.703836035587194,86.74647293069614,16.831601751675507,83.3953738232299,72.70343741195745,80.98434644294694,52.490931816826894,77.27171940168493,29.751635139140934,34.52578966016801,40.00410075807891,23.10344040172421,61.628087561955574,20.17550411630411,31.98940176965396,18.560019844784254,27.22508581202638,17.623863839452255,88.1818459503083,15.166089019134898,75.28352015005939,81.89606640988212,66.84178471141479,77.72735644107513,28.21554913380986,50.11773810193535,2.126282433969071,7.127208212655192,41.99389141089023,38.30535221876097,38.41589804375292,82.47399767756936,45.144352020730224,86.16670030215325,67.97363084791861,89.29138122504965,9.76964775089149,33.920994794406255,76.23796441808932,72.8998833619197,71.09753758451504,22.652785224021823,32.005154665046945,40.296473861509455,42.94249638160702,47.548483949107435,50.753047015808306,30.644649450569542,57.17632463230125,82.07168629370274,59.45083425260333,45.48416231522795,69.5398090896039,78.0889942353477,72.61646026534466,24.121455774681642,36.12979091663421,20.15341868396058,17.06783465370098,21.29425060604163,63.213292275912494,70.33206713295289,35.57463118185407,30.93365474377853,57.58721919438723,29.516995638620152,89.44744188567785,85.65571432286524,54.8155642823813,12.350071871479923,45.158205307757164,50.485015486636165,57.73620418492021,19.64548429318433,69.36508998813297,39.110345501584106,20.080560384539936,35.051369422033794,86.4411430111702,80.16009082541379,68.80827417035701,80.034787065117,25.883899258478962,31.555000535827485,38.870146785555605,27.119122915158165,87.63876451106884,57.669092315740315,75.08158487578028,89.19603324413129,49.73149106629586,56.38872475895744,74.41178751112736,43.71516506815048,50.6371081063361,84.41874000824073,11.604987753388043,27.92955377315224,64.4554196551655,51.37689445235368,9.7436473932986,86.87641553686049,67.97984448636795,89.60552337909685,72.83958830533611,75.5064435308956,39.88502789304192,37.25614640095943,71.22493818495076,49.64547420864981,57.53174576601068,66.07128054949597,57.592016693529985,80.30188798575116,65.80519468846472,37.13099773053416,23.049121771170874,56.78828671779463,25.57393067918307,20.11938676363722,84.47407718043581,68.73107659924987,55.383085884344,67.26902787823225,42.95084188611356,81.34736018085108,90.05076468899055,71.64373667237433,76.55883587624604,25.768530230803993,48.89016218722129,92.60477148794662,53.577267595895506,73.84151166106736,81.93668357794849,73.67550370091648,88.22861138647691,85.76679210628443,56.49820273328969,47.69712705915771,83.33106633111646,80.27454012722662,24.383146973628982,22.798855382073526,50.35321779014461,56.99475229177177,69.08982469898564,55.562241129867346,38.38586090781289,77.21332062673729,68.560415328739,88.71670424334854,68.91300317830371,72.55532319004364,42.68682936203723,37.6211256506771,18.45236533052477,10.404556502408422,27.661875128626093,20.555557381694342,55.45450389504843,66.30678980682649,29.647376697691605,28.60447035239141,29.273631341798158,30.972206891913135,44.65287749571875,84.4333680959469,11.513386283934558,49.26352668785432,11.711039359341022,28.286059279292527,41.45540902475448,86.00986966200477,51.20496627129236,15.330645394854386,40.87445418465044,62.64225931697051,73.43084535823536,87.90596421096345,69.35608353099734,66.82243488684158,63.08639990511888,27.086115698227214,58.51680114331837,73.78940071845136,41.60285635487825,46.50191839925165,56.81670218509031,47.58781614009413,36.40226736969153,29.816934152856852,60.557340199922805,27.774726569301514,20.41588253558246,25.12574832365159,56.573234903981984,75.11747951673254,36.83104534448538,76.62907326720962,40.87476188184652,49.62695933754801,20.362247405546633,83.99158937853511,75.54409341035804,55.24892001123667,80.64724100283253,72.52775390804311,64.35445557901963,92.23434667990387,42.518131726817515,12.405210117960127,21.49106409441049,46.90344412933773],"a":[2.5295714732516306,13.862722798531518,14.48285446630845,14.414545046328623,3.1127950843997,17.666531765271007,11.381511265064837,5.617890611785699,3.6280484832263893,7.729109426323304,2.5818266434300963,14.203133638199947,9.927187595964808,7.550667914431504,14.041572548956612,14.784477825256438,8.698590214026293,13.672508343226593,13.942886572475386,9.449529132364066,11.936341147407834,4.900102415979184,2.535614369434702,3.6543462317668407,10.79221679215384,0.7877215560207995,0.06295092440325334,3.5477902626983093,9.672587431566733,1.2468205807657284,9.497377825808226,1.8737769316186492,16.07171386172587,2.7986056172095353,7.6773484555033455,14.754327393624806,10.211982117413122,17.665401698330893,12.808298078575703,19.703669359460918,17.570651985111475,11.504615969933525,4.073473425298957,8.116562291609561,6.051848956827146,11.755763019850715,12.013020017433114,1.6119600405921597,14.418695816550802,4.207964273596243,4.181356663132383,10.377099442359135,12.52564887082077,16.500060593082946,14.68652266692079,19.02882351959077,10.049265541751335,18.411769130524537,19.87256507699724,19.793013973993414,16.472355361246265,4.797250683148011,3.5790849435798577,19.751987928620363,0.6594278264515507,5.371359806315565,16.25110290968371,9.132021816101314,6.592025567924513,0.8663992088703854,19.63584102562769,17.680396404318294,19.6095735790807,8.705976742827799,1.33616291105076,9.800351346693098,3.166057008085388,13.290513658324489,15.328261052049207,10.445886237090832,0.8707100531326839,12.65297035071455,18.305726637169254,1.0067063061935322,0.9667918456942903,8.230685884509477,3.3930755578475313,7.484798776950861,15.978287312906193,9.549111535662679,7.411772754169785,13.26072438303961,18.72575640615141,6.109495631826896,0.7518561803092672,4.977969229252128,18.553464401713637,8.158516815341045,2.2313595677605713,5.665141030077425,9.122992641616294,2.7496014116698086,16.233936404579513,1.3145747336124591,17.01120560037807,0.5544417372003752,19.56552562629866,19.287034667318224,7.553680298660108,18.739123202979002,3.531931702668465,7.43305474939584,3.2600868243639836,15.694474025301442,3.459771744547,12.236915665814102,16.917778226946268,4.990955454940056,12.292776299220428,4.239038144091913,12.57572642294467,1.2717381520628557,19.722192209731148,5.5411307893206985,14.901885455855366,6.828051947951801,7.541399916465901,14.070068715318857,2.756701397509702,6.768202382627937,17.713123477155328,16.6891179436089,19.24352252118088,5.7871788646611755,5.112276367265207,9.208418886079347,13.170059814966425,9.754918173256787,9.817666628887881,9.679932321455995,0.6595415338228294,8.858444382684517,11.63649776794827,14.592553914410873,15.818517018919543,19.975765186099842,13.977665241586195,4.785170276265576,5.744969992187383,9.733327288944782,3.0620775985450566,7.3301629018017955,4.931966304411732,19.549362843804833,16.126280327241997,15.06580500720446,16.799514298882254,10.088420255983571,17.367833319648778,8.203358422431005,6.927329991952078,11.004489478286224,8.320813490982864,3.819970721403698,14.934565152354944,8.386618945022043,5.194433707372821,14.09959371669296,16.824745485876687,12.831501051926741,7.331830106301105,15.92360946451496,0.6310062456435395,6.239787509105645,13.948016447215155,7.043509052552417,10.688754273418567,0.38257084653421813,14.171522117333573,8.426850420204932,12.863016147790525,19.545505145104816,2.102905351108366,3.3330262646546727,4.865414517515938,14.994307798800142,6.997989870781898,4.859680448966022,8.72694498326775,2.4996772781391163,19.837496887865992,0.9082876607007995,10.80119196348084,12.620700675870232,19.803501531556936,6.5041729329784115,18.081152556862218,10.817201309646824,7.52392815853923,2.9120840384002777,10.459073647192042,14.23146569621104,2.6752307520015384,0.3090355855500082,0.2058112890757391,9.780492859872613,4.151752861760096,5.658314774388717,19.61701716969153,9.342509176903802,17.90412122094157,17.872399885179956,10.629273610112794,5.237219316331152,17.62081940794215,4.87099453923896,9.925754685571757,11.743125942931485,5.057393585872125,11.04561837038187,7.301678569723862,3.5833589908133057,17.88991466640438,14.35400007547333,6.014188333144332,12.479281091142372,0.20649182070473948,10.708271110849514,6.384637554031607,4.343090336539781,5.700068420947582,2.0224132554050644,19.42162527455919,18.314767019506014,12.82130384835547,17.843073200701202,11.093337783244724,3.753036666520546,6.500537802178785,4.838703140473926,13.593208901841031,4.072751825235796,8.705819639120111,6.87901488197427,9.988554718357182,17.950068539122373,11.571523791561976,0.8841403538078074,13.935682880971761,8.510825409435782,16.83029550369007,9.112820038416682,13.585139576984648,18.70098380986528,8.11150548373515,2.364786718695213,5.669650041050325,14.470470035862952,8.002809562041126,19.455869281180544,6.521589241473049,0.04894892816701635,4.837040732326923,11.830454190741149,4.225785774937854,16.988248567211567,17.067848079886364,8.292609849075836,17.091018622491628,3.908802369416482,12.239018289895473,1.0479285558380003,17.850448088457828,8.41903742976827,10.841784620954126,6.144370526318075,9.275683165857114,3.784645236460009,3.1721164527239187,13.369246170610737,10.073325260323006,2.437850719967578,13.547972158425567,4.878143041793961,5.107773218882952,7.291272165402294,5.907791264234836,8.8801962527931,3.135689050826156,8.979873630604462,9.703354467594693,6.674928028609779,16.681269465641662,14.776255246586171,9.117043528740778,0.135399456478269,9.373009855002255,8.279039948883856,17.230880994821895,0.365032345247327,10.64387512305824,1.6423162586205153,9.34172423271499,14.638202707435358,11.960844829814171,19.747631736646074,12.907293643610714,11.144343258533231,6.6907080778649775,12.081406174020493,0.2606843024178218,7.73818584575074,15.611847177798799,0.36024659884025034,15.484802382707423,11.730432656639756,19.572550114181038,2.287250100008933,8.56728841239326,5.135241469652443,17.571265858342386,4.716627125485875,0.7560994633071072,1.768785968171831,5.989110112004332,17.854420242400426,3.238211419377408,18.233661845978087,15.382986554027172,7.648717122281492,2.5297958257820508,19.171030732457993,6.242167358726012,15.094115486514426,15.440552968462553,18.884137904925296,13.691599877270196,9.921071540329333,19.26339544112428,2.7547934675163477,0.8256191994467121,18.229950101047855,0.3028999626457063,15.026152023666533,6.806358167017774,5.036462502618644,1.1944656029031586,7.258841833002547,15.792562355655232,1.5558310587089208,10.64296589961713,13.528454795042197,12.072965500616855,18.739786257314947,4.826347060872798,14.768348750667615,19.603124825474858,9.270967522426696,12.752187420253449,8.934527849956627,15.741130304698752,10.394223571019165,8.93839122897794,10.443587729641223,18.51198811409322,14.886472403776976,13.032230962389475,6.922141641110602,14.839775807704342,17.053698401623723,6.857878942900291,7.047884168521126,16.12265898842011,4.363420128355178,0.691931474824008,18.333580017814963,8.429302597303465,9.659580713060683,7.140673892566047,13.787081169185633,17.92606330549235,7.353336349737285,2.924017427812231,14.496595046908869,1.902701867999692,11.559868727215626,5.722582809482026,18.396619594539555,9.42629328012385,10.630270827580777,3.7936709746194186,13.515670515397652,5.979739494202918,9.567766614062553,4.25981828492715,13.516897108526571,8.252338345841611,0.38471813232867635,10.627497516304318,8.6740414764343,7.677242509620745,7.753345860481726,14.626422581094399,8.05778350417237,14.30084056112567,10.403406425433793,5.610843359750728,4.893136852988458,9.773752250428661,12.413016897043363,9.046809558385792,6.538006888008661,10.963460624270564,19.88293289060591,11.960370006634431,4.826517620831838,16.579061460158606,1.096474726512402,3.758991029023626,12.12717928472947,3.7760003841523426,14.974088317136452,4.37220586219738,2.188696599184836,1.5397677560473344,8.204912547498049,19.599085906453734,11.534738167010383,16.860384942350763,9.30020129895928,10.945983656448405,16.348464137584628,9.181398923207897,12.414010047539477,18.448978340505402,8.482541281135706,10.988354546907786,11.019537597353914,3.826969238782616,14.117564559543103,11.369686449657745,10.958866850150137,12.33391959104134,5.961077754793966,10.470394500359266,14.614140923365406,2.946961856847947,4.417154162280799,9.722014242672943,17.129835971875956,17.595417483111344,0.5314419672820714,15.568981958398101,18.435986156153522,3.7926738181471853,1.1057529765348129,6.627124726902394,1.778981094568275,16.63930907163553,0.1822742633811547,19.110589038112778,1.8059261463569065,16.879697066556876,12.428772075068707,2.3887664485190108,1.2566620658322103,0.5617167540067403,14.714193548725198,10.21588173188813,13.183602150831932,10.824833128939183,3.5918525028583925,10.830611025692868,3.632038467487897,7.208959390392327,19.144241530040972,2.631981556238836,17.68683510669222,1.8275795702823894,2.523507229457218,17.831536524202182,6.596368443694969,7.361856120164125,6.8497638990614185,3.242021471365786,12.307245922842501,19.965648842881123,9.216540287447765,9.05262160759329,12.365056596162383,0.2775587737302443,18.770698765752773,8.613283677641475,3.771666154543132,10.69836080804016,1.0148187225916638,7.5156604174516906,14.105068811210298,2.0565077152488165,0.6433289454581548,15.736670280939396,6.642189038154451,1.86932860521837,6.0368960239826785,0.8882797518238572,6.522919938873004,3.6950670765868088,12.413984973714062,4.215321338761098,19.611400388103107,0.8145388838103784,3.011714358276878,10.831244837964595,13.374029532014443,2.768712475673194,15.367631140302995,5.161553519007973,19.434152370008853,9.413030383733108,8.331119038046584,19.800324338477942,3.9914817701597594,1.7632503398249577,7.352646443562745,1.9023769192955298,5.267525419716681,10.009042941718596,1.7573409136121532,11.970607286572319,1.1940894627832321,16.841268074669,15.781509351601425,15.541764485840517,7.384497430635393,3.1662701139859895,14.92548865212331,0.9184539834288419,9.080345323701868,1.9505385453022583,17.535334373249775,4.779382844117177,14.489382465449081,15.617075874829943,7.551909448147387,8.656404378954186,7.865655338332669,2.184288201537772,3.3902903216292435,19.30651144493784,5.651788941030729,11.519100019023076,10.702075641637162,17.08639131259102,1.1952870853714703,11.382038152630667,1.2104030737167149,2.9736727743984437,10.183549873836135,1.7051609522809263,4.505739648714258,0.5813820149949622,6.992792420024676,18.889790809407966,4.3837106721213015,17.744433406888405,11.95599980142648,12.719852648934689,3.880272062942516,16.55450309118666,6.390604752439826,17.120504022298512,0.22433508265576219,4.436292002900104,4.2218879722973535,8.124342704867749,16.399950579048117,5.09125100873193,14.679594028960459,6.411266681875536,18.859112786768932,17.6883398106892,17.308616220656724,4.958521622234726,1.2818269062547527,8.368129747021232,6.895121418789589,12.955152224580107,5.153534565615039,16.5458404345405,12.598590478378062,6.77285468751835,2.023751466044943,14.334448322731678,7.702623867228224,3.598450100007007,13.939404262996833,0.5364619814147265,15.587834662910648,7.652602530066512,10.891561666702714,8.118055063192076,5.005218444954189,1.0665246811927354,19.025141132671553,3.788044656551386,6.757128696881725,1.7709755123680937,8.48104547903846,6.0794138188726965,10.855689557091456,15.093652670618445,10.133162517960175,2.7817553737654332,16.28222383467,11.017952758458915,11.261695716707818,13.046105811795702,2.3884256656526626,16.887822327703663,12.71558374172793,18.044522841995295,12.57651408122683,4.4588747944496365,18.467299612051175,10.10839560510728,5.531322451737344,2.945276189886261,1.3711664215959773,5.596905801373899,3.690577109092632,1.2786427838530345,17.609687820134393,8.388860221174305,8.218850023177904,18.8043380985747,11.856435759970916,5.268702571590946,10.522048099426984,5.537334205290101,4.147031479775385,13.835102942524742,2.5324027078303857,5.370156495023339,14.305420069723226,18.881417775751622,8.682644472866286,19.21579364097258,3.051446591677256,3.3732086492394764,5.849376173957763,10.736418883019292,18.64465546377138,18.37862520497132,2.009342129802736,12.036934992176821,12.625228077853183,3.355410484292589,1.5531956975588024,2.8934480280616803,5.354800520884662,13.894481081477995,10.476188143589894,3.310821874613681,7.939196998525722,18.535335358467215,2.6314540896039773,9.222846731413812,16.384001463923322,10.379269502296777,9.173189369912347,4.227851267560148,8.234178286436968,19.725757689566144,16.78534976983579,4.2719476673761125,1.5889183268275175,14.28088889033857,2.0823269319961124,4.424066485790377,19.701541204776397,13.063107312740678,2.7842669981532486,11.681258959508325,8.69936758218319,13.443810226472106,9.935343138157023,6.340715250709592,12.739200114609401,9.944666085532035,0.9112760444348655,15.967229514619103,18.365066356916444,2.1700848707764298,18.56594988789436,17.1678488894973,3.573749567331932,11.689466709135568,7.9510787351987355,11.482442365213332,3.856819402694458,8.447772361616419,15.06098580472445,12.056700368612049,3.056008130038008,14.625969184931353,16.55644020389363,8.04259807168771,0.36715133214739293,8.414165868847348,4.3550038719031425,10.613734510760263,7.491257808497087,15.039012606681297,7.498447949045182,13.04499794915035,17.18330225327236,16.965540210839748,7.658643288441338,5.177034316520164,7.605933838278642,9.336328575780644,1.7530845362182657,17.975123661478996,0.06974205602289008,3.9816376824532673,10.596601490699475,7.219389032089323,5.603589128940452,9.241478219576225,0.5887012098172262,12.567443814429865,1.374306702047532,17.046846995474446,3.8008357550982375,6.973678438787632,18.188970988265037,13.91028815904901,1.6205181975455751,14.708391026461566,11.723036784358992,0.6147179298382932,13.760942900290818,9.362418859893427,19.47209685224992,16.03873129774106,9.71377855351407,8.838488222954005,5.86112101630917,5.554548347607615,4.714554905100781,8.892993724398055,6.065305656514992,13.778801532454455,18.169057168091314,4.986027317655628,19.789760235850217,9.3532855392528,8.406272731157687,17.387724561162266,15.093782107593237,15.568039539607232,7.040319914695501,6.944280596899666,0.6947335263340992,18.199386297820148,1.8051753401228732,16.9390882817485,7.984427895483139,18.7058601743659,19.897015166585902,12.466698107598283,2.7388128970270076,7.2438373042162985,7.697567421655953,13.572638026913655,14.659809257284113,4.471139632202892,7.8919348344063955,7.0572191585249655,6.093724862600434,3.3865090993944014,13.679541604969415,15.431948152668022,18.13665670307145,6.283120567831513,16.403371132834042,0.7188182528211184,19.087557749745546,7.141777488104335,8.881412800729095,18.133832198162235,7.4553956418907585,16.499071570345592,11.937969790388298,15.219192450503535,12.560830012685669,19.13865733998054,2.9834108502705847,17.50041926470613,17.4921368795208,6.847185188425091,11.139003052380797,16.474244194902322,4.691111217447355,8.29115755874415,14.96029506658083,4.635834824122851,4.9309046514807475,0.7485849923580501,19.622715000920515,5.850017010974309,7.810764010430695,0.06514558176040186,3.74557624955163,6.982180088828129,12.613161328624972,11.747914606148813,6.258664033026862,8.526568369940524,8.488142648265562,10.90047960786082,9.82919001596699,6.0098316925928685,17.7959531768948,17.241562099590922,13.992313359053261,6.754189857610586,13.479042559844707,18.98808409480971,16.359466779195408,11.71111292865643,12.217533236341382,6.641288247786603,0.7750825958226626,10.388374929977848,15.17465325892816,2.4630926592787272,10.126545684549765,6.773878991022371,0.6490695826569315,1.9123631229810067,1.1084502173725452,3.381045025418743,16.838196426600845,13.640157493744386,5.765414294725897,1.74495580453069,10.754128643305062,9.7171157511073,14.31319456273771,19.586900795657584,11.277741121296705,11.831421507921313,15.699248782732305,5.1902894360660135,3.109997198334269,11.85336023855136,0.006256605840939677,10.544924960631214,1.819367576706581,18.38048159786318,0.4557659443817075,17.048250692701536,8.937188914859524,14.390902398679174,3.3665968425431103,14.419596034767657,14.403785671542435,9.578311128588224,13.05561029767945,12.342414072930215,6.2051118462415555,19.992104819367032,5.634848188119559,9.976734583999685,10.745755462897826,7.942297269424667,4.310623508806928,8.120476606021256,19.477353623436237,13.881053894602315,17.680380297357843,2.613638428266478,12.314164908160471,10.796835653022999,15.284111658969369,4.861034504220774,11.693208901169756,18.120902543542314,9.688058824919036,10.332035220483164,16.11447503273986,9.303706600589688,6.8346128215733915,14.23744627502218,4.723113066718176,3.739886765916842,8.212097336502907,11.168160009165078,0.8240211218701798,16.925932653963596,8.04883557787528,18.905123536586007,13.24251292391201,2.4492969333648817,16.543673890785627,14.925185606299443,7.758368516458565,15.779362605222813,0.2395107757764814,15.038528097218835,4.2505991872864834,13.280131101655623,14.573278244349712,7.146586840220581,4.253727331935635,13.37904514939305,18.074178150107425,1.8472630328634043,13.484242538715243,19.218782722784816,9.70636330103336,14.038610145062833,16.163078139484753,14.402532399206102,11.889085440366415,16.0821873767205,10.659498544515134,5.1047321902455955,10.566912596204503,2.4324712153028116,17.89150162452338,8.029173709576334,5.570513091936333,14.961228183283644,0.5607162402853838,10.89594768358166,9.307200428394516,19.751837939972418,15.66873937203042,5.68737550422334,13.588712763879567,14.335847218054209,8.578820566811451,19.004773725273104,7.907160616634252,12.052863798539061,19.41450462359451,10.852295985637657,17.382877906970087,10.418101742989844,10.970523537420217,7.742711137452147,8.34880715570199,8.670043995658613,15.371413115055969,8.700901416990412,11.851796444464085,10.344580635237918,16.19868152408454,16.58569106380126,2.2642279519461317,5.743325644092283,5.450045974102085,3.9065947006348445,16.51558149166419,7.100795442675358,10.442942954134926,11.521876541377875,13.30724621225643,16.775552509443337,18.11429832794215,3.111458348154934,10.271021049396257,12.676226511245016,6.819715333027125,7.798061029734384,19.268333365462617,16.331062383799857,8.127969009803726,12.612408137174999,17.466289288923278,16.900498098521123,1.6175662661483958,5.813227323870196,19.691262611152457,4.14680156798684,0.11214525162045685,17.05465929641647,14.241751653076191,19.22614993130815,4.527864086387323,12.0847164184912,5.391182158779175,11.88000659115071,15.50037573588737,12.879969622631258,2.0631842248994703,15.401300755077587,4.212394449569148]}
},{}],40:[function(require,module,exports){
module.exports={"expected":[-2.0222488642711207,-2.43460128867915,-2.990608312786947,-1.8760247082485761,-1.0553571806799793,-1.7537147527914332,-1.2457825650195922,-2.5427792518035086,-2.6735624843254664,-6.227867349540407,-2.343734900627369,-2.1428819301510345,-1.818665026441602,-3.1281303101559392,-2.8812139561667363,-2.720961324539534,-3.045201153519857,-5.910447599587904,-2.806165790784964,-2.9431640741793363,-3.4602340119431814,-3.9180569990810827,-1.8966036170058576,-2.4109546501792116,-2.3721507939954884,-1.4995129229533133,-6.0946443463676605,-3.0893950851062915,-0.9617490286727576,-3.7706408113071768,-2.1044135951381744,-3.360907358926599,-2.7624120664154552,1.3238298533681712,-3.0468064397218635,-2.729365885985977,-3.332054611175448,-4.405722593218772,-3.4924508953911486,-0.41816723164914005,-3.635238447276656,-4.140606199431124,-1.835611879006268,-3.906666444646179,-3.2620701745481795,-1.0988166184693204,-2.427974640551435,-2.136997398940165,-2.924428703547823,-1.4403976668457308,-2.24414106058353,-0.8726122823706908,-3.6452020410216717,-3.0541475850660937,-1.4097856542864584,-1.5065541631655155,-2.50735344566883,-1.1169441962707491,-3.130986129146138,-4.357916297415531,-3.583483717166045,-4.298143089783472,-3.6270650395615665,-2.5111098644837226,-3.44145334472796,-2.506438871953653,-5.4362200527194275,-4.66663357207448,-2.284572826400693,-5.2802793869644775,-2.8792916085907287,-3.9138191011196395,-5.877895110895328,-2.7966445879943884,-2.438303294034636,-1.569795777813188,-3.456444961571795,-3.4140267165077134,-6.447422190011116,-0.6189561536619452,-1.884754585604846,-3.9816933361572198,-2.6592039984576092,-2.865489780234408,-1.3031680884796168,-3.7496297434303663,-0.43478365371795913,-4.833225270479788,-1.2609526741737482,-4.101261457415843,-3.9544366600378305,-2.3698180773607693,-4.946792147241315,-4.685644728047745,-2.344196218580209,-4.812806210057446,-2.2612347137912336,-1.848223792826935,-3.866792792202017,-3.826138296089259,-1.5435888502772377,-2.3989990289442367,-2.946918155481795,-1.0445074323609984,-4.954772266377064,2.466826512149693,-2.9892990369964956,0.843201809939729,-3.019543120793289,-4.003154694198216,-1.393403805005747,-2.003293011403162,-2.9447867811352455,-1.5261884118611584,-1.9073071365078604,-4.602630279259492,-1.6546411666416216,-4.54511612243807,-5.016860095012035,-2.372793967195531,-3.779417646954032,-2.176975229642277,-2.713401694704088,-2.9717536287476554,-2.401087554335379,-3.2172028542197966,-3.479720968233485,-3.5860806182893317,-4.2915480940115565,-2.376477356252009,0.47638933199196204,-4.9760604829839465,-2.210198379369654,-2.8302622259831067,-2.1241908290243465,-3.482523593964088,-2.94541598735366,-4.509761069307397,-4.458507222232308,-2.2322350058350255,-2.8715324019405175,-5.05231369740739,-4.265455989417724,-3.3683777267119344,-6.056271642676453,-1.2433461707615416,-3.600271980398571,-2.520593041553408,-2.582142849406796,-3.97594034103697,-1.9344980072464617,-2.360874276094219,-4.895591920567491,-3.595516438288049,-1.310114161560644,-4.051055929753204,-2.7201064887975344,-2.1410369920911934,-2.717070216495122,-3.417109867671751,-3.5890742460083485,-2.317699064881897,-3.0932752164370703,-2.8537405671385208,-3.273403021191139,-3.2119015018498023,-2.4415729447920245,-4.523318694158435,-3.4263515611559225,-3.18709292622494,-2.6917633813557984,-3.086862639927325,-3.396398267545955,-3.9984656821710356,-2.6747957219588505,-3.6225567588729217,-2.904628463092745,-3.2273872238440546,-3.887139885933703,-3.203947773372418,-3.5960831973578413,-3.1461312025480086,-2.0174243412168136,-3.0817806936277874,-4.408857729361735,-2.9465212431802037,-2.8095092232706786,-0.999638629029078,-3.3095651308963174,-2.865759082414442,-1.192234095743385,-2.6761549175416115,-2.091123964564617,-1.7671392349983437,-5.373425468649262,-7.333546425770546,1.3567910337167342,-3.0395693110727127,-3.8049682211452387,-1.9998786390362904,-3.433827132244099,-6.035084239530458,-2.78073124237512,-3.264069211345656,-4.448912102128523,-3.0377639646821644,-3.0372415431787116,-3.21116549018371,-3.621223566265923,-2.927220414388708,-1.2952086157464362,-3.6657118253335272,-1.3780609535119939,-4.304972466545584,-3.3464977246996814,-3.6611689721019833,-0.2613592741198668,-5.77511280215737,-3.481117583269487,-2.70491751725257,-2.624243111091675,-2.7372024599078393,-2.566388480204913,-4.701103509618829,-2.2519651519314783,-1.7210306513412976,-1.9796589596863048,-3.1699664843508444,-1.7819195915149117,-6.843249425310685,-3.472693822132135,-3.9457898392484387,-3.5938860895987546,-1.0908505611793113,-1.666301416855528,-2.8779619121289035,-1.6483497584613778,-2.9776160698561944,-3.0989747261287217,-2.9412175939431346,-2.058041111121801,-3.0678265861810274,-3.7643972275856408,-3.0556707984680433,-4.483902013277371,-4.653697267181032,-3.3166383627193596,-2.907437305005586,-4.7413822620610055,-2.334981391816086,-1.677655313687742,-2.992724388420247,-5.129331830913781,-3.485224673528348,-4.197991416186665,-2.9727151172063384,-3.743550350657446,-2.2286968753492715,-1.5130723748757549,-3.498791176771548,-4.4732605669383405,-4.348380640203791,-1.8875179257479773,-2.294328181585368,-2.880115584678366,-5.562041485845291,-3.0519905498758813,-3.4700104392412445,-5.307014363806191,-3.4080618769078903,-2.3026760613017516,-4.033648316901285,-4.007159133733335,-4.284651987978672,-3.4604035096856895,-3.610698458926715,-3.7173753401148146,-2.3003856408526353,-1.3645254707368686,0.39106700038958764,-3.562794365085324,-2.606131482400636,-3.125882893036653,-1.5299089600127984,-3.6225870709767407,-2.2711246475713165,-2.833282401408012,-3.167449154589576,-5.783550420957787,-1.5336021222080605,-2.8226090714310823,-5.358852024777943,-2.5646726982880645,-0.8731503311187263,-0.8479895288175168,-2.551480165018471,-3.635255009683499,-3.6198476744658152,-2.6855508711023233,-3.7176676881823254,-3.968267682645257,-1.3502185462537888,-2.884452148988088,-1.9479327733212222,-2.7077119782842263,-2.2967856370861073,-2.617271580928872,-3.8735812863862416,-3.873174628076926,-4.868919090209223,-1.420998760733886,-5.401832379454446,-2.105500571911417,-1.8079366074540952,-2.8271886059714832,-2.7036621922755235,-3.6127135746408916,-2.958323822932068,-2.588363511391532,-4.053912997725287,-4.234227571142912,-7.4368955900148075,-2.834335813357367,-5.1612302067103055,0.14103265827314654,-2.029391369262323,-2.786624840378886,-2.910968154744056,-2.735827729994528,-2.950516119114255,-2.673174467044676,-2.6495350517905805,-2.9491208119727137,-3.59228656614127,-3.303010556263483,-4.242609263885813,-3.2754049003555856,-2.109477147864871,-4.392214267894768,-2.65426221817732,-2.4270328147481957,-4.4442650062417925,-2.4364154755921725,-4.461291306408139,-3.2964388018634803,-2.8425277853533952,-4.788865927120332,-2.5995645581902487,-4.503329314464291,-3.8057361647152343,0.06985013063283177,-5.132913135354791,-3.801521371950214,-2.546129987350596,-3.438585083962086,-8.191949349262668,-3.4122552401999893,-2.902996488000881,-2.267325101775217,-5.249998866653252,-3.391702440538355,-4.869893842008194,0.5481475675737645,-3.13885587682969,-2.969612230828048,-7.450249406974289,-3.901324043708946,-1.3848148045328088,-3.9489202554911444,-1.0642081783823372,-5.534231619700136,-3.0863173826512353,-2.207435897008096,1.0164421729781095,-2.5941235137578333,-4.704073313703647,-2.6393069700988216,-2.7096253955023704,-3.5367480927660777,-3.9916447283646077,-4.5875765688086165,-3.311488514356082,-2.0171530472552965,-2.884357548603936,-4.861320976398829,-2.501522214065785,-3.014687050206277,-5.6440276343082845,-3.4331498750741165,-3.161064131407705,-2.7852440898329984,-3.9328750832916097,-5.245803659881909,-2.272065919293527,-2.756224281744448,-3.7528635528593712,-2.154986303179174,-3.108526483349009,-1.8836539674420172,-3.312770614396063,-3.0438804237430652,-1.7961566594727807,-4.165277319839866,-3.6138616466441915,-4.250357071973785,-5.412474195465525,-2.37678198551929,-3.381783660625286,-2.427582232816999,-3.2546235221636666,0.07562905299351297,-4.36886798071617,-2.7170263332296676,-1.4460480385757026,-2.529423789116872,-2.520176985365214,-1.6480081811165017,-3.628800359208738,-4.273317177116992,-5.197001716291359,-3.0385431499531608,-6.414269584763581,-2.80767797969863,-3.0994219143936825,-5.700070722492308,-3.0946697228877778,-3.8566381979166806,-2.0563713391314615,-3.271794182772175,-2.443357759183475,-3.0458129521333297,-3.118586496304054,-3.99221974694788,-2.6518056267263064,-5.160119843752546,1.6673575377107615,-3.073113460346317,-5.494840689306834,-1.7077071004686941,-3.5677856482114216,-0.8244836505848147,-3.6060056279781936,-2.7278103059627963,-3.133702294543892,-0.9694621063764111,-1.156666420545672,-3.8396317339182477,-3.539935397160606,2.4372630874735597,-3.0076177906649555,-4.905230691605956,-3.42483066381154,-1.56409564213481,-3.81536127519472,-2.8137732248477922,-2.405132382552767,-3.7552585730795895,-3.1803765437038987,-4.779790215041225,-0.6156428836585547,-4.326535855973082,-1.673519310794192,0.3654636524802595,-3.756424169382273,-0.3683025268635265,-3.8323892955021535,-5.05851201518997,-2.9147968784510248,-5.269849003354157,-3.4144234415061994,-2.475214679892633,-3.4998468410397856,-4.9241878495625,-4.283012049944251,-2.492909939659164,-3.3480350699334864,-2.4075992859162163,-2.7533472576743265,-3.077099568843111,-2.35651509304995,-5.141259707796499,-3.6289695836001137,-1.7547712560786413,-2.1020691791668535,-2.2492937849837693,-3.0197208603385626,-0.6979896824405639,-2.895706233848705,-3.018554779198695,-5.227893058670999,-2.783221228892572,-3.3321859046049114,-2.4167678422106356,-3.5986838474311336,-3.75078791405102,-3.1354602990635843,-3.156232603057254,-3.749396911914258,-3.383870241930654,-1.6797866375492156,-1.9987546372152356,-3.561618726818332,-2.0572609376880187,-1.589048873780163,-2.8567430622720575,-2.180844348512455,-2.5006466446173334,-4.347875657909266,-2.6843874636360545,-4.259965335500326,-2.6868571953091034,-3.1481022590785024,-4.422059934533593,-6.581213084364474,-3.10360085791823,-1.7784961510259878,-4.276379740674091,0.3430539510739036,-2.6841052984352447,-3.016293723191001,-3.55146015994644,-3.641962484089667,-3.5169712851265804,-3.0671898580302135,-1.8322915126626858,0.06292592796020761,-3.096051824779897,-1.397857880935063,-1.8939977979052556,-2.5644783492271883,-0.36879174420446226,-2.1088813052354074,-1.1325035681617717,-4.413894004575256,-3.191513033975276,-3.457318773862684,-3.3861208642722276,-3.530749877177832,-3.6404697769686973,-2.114388264220991,-3.173665817611929,-2.7361604051821224,-5.975411481890253,-3.372184390511115,-3.6669157375700023,-0.6449534356975679,-3.2519955894098276,-3.408867429597501,-4.480892351686077,-0.230610957078347,-3.492052049276865,-2.1374320166032734,-3.9327376594513326,-2.669965479245974,-2.81161311415089,-3.2620137396779745,-2.9596466656531732,-3.3991075883849358,-1.8353975988538287,-2.3485024380146067,1.444193599829308,-3.8064524628711247,-2.2163101405672667,-1.4198410111556876,-1.124306778137304,-3.4340461647274787,-5.074004022656665,-3.4627802750061907,-3.919623549962261,-3.211275614318908,-5.987011061793356,-2.376533671142095,-3.2573669327842385,-3.8786642085865113,-2.581169180273231,-5.028435423999038,-3.735889834738285,-3.2383055626898773,-2.4302528041014817,-3.799555779767897,-3.2240970204694994,-2.957911342158456,-0.5686930434537678,-2.9691034607541043,-2.637785034676303,-4.176843929884603,-1.1245714923457546,-3.39961665527568,-2.452088979012711,-4.411567965456144,-3.065263929019909,-3.2099821643963056,-2.12307736368024,-3.2676902934719947,-1.8697719092060279,-1.8195063679052572,-3.4051450292949914,-4.651879660808707,-3.291365737046115,-3.140699206470835,-2.8552755220012593,-3.372073737511543,-5.8823935300241965,-3.1806985152710734,-2.8339145906328413,-3.7469078576443824,-1.9582667584659044,-3.151591818557513,-1.810314687022169,-4.4635136005807645,-5.885367708222495,-3.1195608293385093,-3.5610464431070197,-3.9025579745488157,-2.7922372601817,-1.443773095469739,-0.8813990338959662,-2.649689250127021,-1.7738195806939205,-2.6758111312133104,-6.999384038488172,-3.1081458868359513,-0.2865933887014935,-2.2747109323641967,-2.2615461232074456,-2.995287338599584,-2.481868432921434,-4.354058777722595,-5.262666064218278,-2.262513873926827,-3.3594614624207737,-3.253688939548544,-2.6402302689968438,-3.3832735052589746,-4.508902214028052,-3.1287002717974945,-3.7773187811170406,0.3200586864351215,-3.1739091208287133,-2.2481496246188657,-3.940710606592659,-3.5998409238886464,-1.8468439871171887,-3.3682120085343388,-3.228787525679411,-4.043056115817172,-3.1053394775707734,-1.2039739820277544,-2.7314127406674102,-3.1478280546414323,-3.7629349292961605,-3.118801826027886,-3.7604800353212924,-6.097922774691631,0.011098033082803459,-2.1580811991524715,-3.6525271436201128,-2.1596217261386226,-1.1696120060548023,-2.4587535569257897,-3.6560856850967713,-3.1064304929152713,-2.9552767564645057,-6.117230514236514,-0.41603324401582215,-3.8436691715859723,-3.1640681949506893,-5.083835171344335,-3.338447131338328,-2.453239590072913,-3.6329462648630755,-3.554799868033517,-2.072609316177506,-4.713312881790035,-2.780368851866546,-2.518888729070559,-2.5117725495813277,-3.6798521102730732,-4.530343874012226,-3.2396923400548907,-1.8608340158831527,-1.9516654872652928,-1.0315999391818822,-6.001686345734222,-3.7324032779091856,-3.0135247306294204,-3.1517326419861127,-4.91339295994117,-2.2428552534121136,-0.9271989435695395,-3.1723627599215307,-1.8442988094812605,-2.6104036776952855,-3.570266626582475,0.1727412283624758,-1.788442565929564,-2.837808913556571,-1.5593146058647847,-2.2318546440374245,-3.178832552285285,-6.890727453690387,-3.1014158283732915,-2.4103236073395116,-2.7900330403913745,-3.49931705382467,-1.112182341367808,-2.9276169628271074,-3.6143834489286903,-2.906440751096363,-2.058262896692219,-5.888094148594314,-4.827712778280307,-1.9929425163579824,-2.2905518216222736,-0.4869414062550284,-3.2975520656388935,-3.6848293362215774,-3.5432749529785776,-0.5866764602474257,-1.960141457426991,-4.213682725736959,-1.9037074624136132,-2.478209314783901,-2.4077833011721204,-1.9384645120656836,-3.184778450139129,-3.4162115771054524,-2.9118817337736336,-2.5012398954073856,-0.4365964534499867,-2.7870987947705306,-2.7704336876473494,-2.686360859210728,-5.3555165265707565,-2.331295511906951,-2.9750827798138864,-3.735416715329646,-3.0750763681172035,-2.900067200213687,-2.099633282570133,-3.433132141911778,-2.5507203902575935,-3.417330597139654,-3.6884656119630423,-3.248743007497727,-4.09783487450096,-2.683210658464371,-0.9902476754230471,-4.254712293349805,-2.2957402465384003,-1.5513234393415691,-4.915196137952537,-1.4198752584971965,-4.531616593710351,-0.989342643120164,-3.0382955518099033,-3.3130810864707323,-3.2706511613130904,-2.6016152744450918,-3.152386373540063,-5.336887519945419,-3.5752596222936295,-2.2674954286488354,-4.537174697883001,-4.486887454583406,-3.0628461439396313,-3.867551184894553,-4.249335726271977,-2.5278867292043965,-3.513619104548539,-0.8934053387916043,-2.1790251394124507,-3.4256872046228395,-2.3777263452081554,-1.9198881665955099,-3.6441299769776916,-0.3090394126368013,-3.1558001460550735,-2.2173502547941664,-1.0204008783508072,-2.7478235570168,-3.374733549513812,-3.3000109982505013,-4.362853986821009,-0.6720501652015664,-4.878404879989605,-2.4616738290268074,-2.8537668418550224,-2.4544623218188195,-3.2098979218557107,-3.1520595060612004,-3.3859539641747385,-2.97693423966581,-2.916600257225285,-3.7360275293599017,-3.260159459542922,-6.593179647366898,-5.0387088287580095,-3.1271957963450987,-3.931792112168127,-3.0645737198709764,-2.964967576688434,-3.9205705362576997,-1.4432935396434343,-3.424420983073064,-4.1849136571035155,-3.0301790613686337,-3.2599969866782494,-4.531930260978491,-2.9943896839267676,-2.8670071228213843,-3.721058636401242,-1.7928537268608578,-0.8393746362560657,-2.6920414328678444,-4.236509900422106,-3.804145148032066,-3.942399807888188,-2.4917377593172847,-5.353643074729092,-3.500611255486168,-2.9401229161028417,-3.0334162924277086,0.6322146964893705,-2.789432684943052,-3.3063951795778244,-1.8126476937738962,-2.4984035117966137,-2.887564121687363,-3.8595540631470406,-1.0306754777093488,-3.417083033185618,-5.270508254000278,-2.5251305032188274,-3.3752683917603585,-3.2718710940251636,-2.204330467766797,-2.206774321510591,-0.9268467107040268,-8.957676144011765,-3.5258044350138302,-2.2356504183592407,-2.3836761605399417,0.1382251063027379,-1.3449091079612803,-4.403778019241486,-0.9869082856473304,-0.31904962661422254,-4.125188301759194,-2.778766810789532,-1.520214033239544,-3.6157348922955745,-2.637190840318518,-2.0026008292653192,-4.420455121861492,-2.9362880009178425,-2.6905507343465644,-4.397951916921501,-3.522660418317743,-5.123843541015438,-3.021083467168686,-3.0225046258814414,-2.8800259532369172,-4.299923796939081,-2.6195099745630728,-3.063034347535832,-2.601783482242756,-2.8633324995268414,-1.1654291234175562,-2.7227798586790097,-0.6451317798346339,-1.6741981417024423,-4.119740937250475,-3.2108563994901838,-2.0657156784295476,-2.7077303509629416,-3.1605019905944114,-1.6884949274453604,-1.5412100780786306,-2.8168051952486186,-2.555606341351942,-2.3645140271347804,-3.1948288553564095,-3.8094392046177283,-7.830791822908726,-2.3588362844981945,-2.0250492106633917,-3.538194780120603,-3.7516921882879535,-3.8131362440813534,-2.738723603381982,-3.854400682303815,-3.1989220818858697,-2.465141762328782,-2.717156145903425,-2.9102456977966287,-1.5754279327402145,-2.970733723880675,1.461042082726895,-2.676565869990419,-3.6775804540193997,-2.424224486995215,-3.173138294621768,-5.675122439942259,-4.794979074175934,-6.907601269887745,-3.0003928284577306,-3.2945396764730397,-0.5665644553578574,-1.8135630165879668,-3.246715047658757,-3.849133645167462,-3.1716060280345264,-3.952467107283203,-3.8005718707424174,-2.2198603862627886,-1.0784090031479754,-2.5314753713711466,-1.2875114668890455,-5.293774369814485,-2.8788709180744894,-5.957296897423085,-5.144278426132276,-3.136149076169108,-4.3392821441270035,-2.8169979569291566,-4.2507928100385515,-2.3577959746962853,-2.6330842131966508,-1.2841181630273395,-2.712476008479561,-3.848832824902366,-3.7965354243687566,-2.0089326083645496,-2.236012593200675,-3.6281212489251535,0.06526123317292742,-4.234170903910435,-4.345197828507163,-1.756929808619423,-2.5653368646527275,-3.090225112849336,-2.885383549123027,-0.11969724207889157,-0.3238314296221428,-1.7429709918590022,-4.062980010764216,-2.8416767296996324,-2.397504880575556,-2.215296731387514,-4.86921083935301,-4.463780534832509,-3.186429659756385,-2.3840322047384204,-3.509860489447908,-2.61154938690179,-2.941872425042282,-2.383976063473676,-4.810091677249136,-5.358478771842758,-2.5146589357556737,-1.7050720223203042,-3.075741330916924,-3.037282873620282,-2.3629356305885314,-2.6026328653550603,-1.7384332830491882,-0.6525784420721901,-1.9111480529909537,-3.5732514904151547,-7.613817803851597,-2.4227724815137384,-1.9043770456623546,-3.485286950006791,-2.9406066383424494,-3.7710863430779518,-3.724372667629709,-3.258873589175977,-1.5783361381303282,-2.223676744008869,-3.04620629099505,-4.6751202299734045,-3.77522555464475,-0.2597442331397604,-3.943272661092292,-3.2251447855974256,-3.7323394730950867,-4.290878915369294,-3.310707361535809,-3.1817652134951064,-2.5539459960404294,-2.0532776626753964,-1.829789798426905,-3.0659640131498174,-2.5575905129329346,-4.0597042106366015,-1.4928662209447214,-0.6776579412147974,-2.1431202754235947,-2.7801667233895024],"c":[9.72906374505051,21.268489178896274,30.36504113003388,24.616900734384267,5.893594118086455,19.400141431327903,12.510448390350389,20.935588262714585,5.707390295914755,21.76122602572547,10.811910466286562,15.240643943132934,16.89215362044648,28.616677300772334,40.95995661554206,16.771877028442265,5.727187179978445,12.696710257655884,10.442322389166849,16.91986155830389,29.353527489858102,11.635440628972853,15.29186769799017,10.703569655059598,19.81735769170883,16.626804593927883,14.5035102574405,22.94154121751755,20.37183652698143,19.6416809016485,14.122464100055335,19.599894657735483,30.240046068273788,13.153679890927828,44.65014730272558,11.379892166259944,44.36353635357142,21.314726481283877,33.738142381812644,7.611186082881453,6.306027448707425,8.577760056326728,8.85067892094705,14.183369416212804,34.64470618022959,6.4952965799919085,32.980690600493766,15.352851415626201,7.680570974648945,14.223658543372869,16.011752191116578,11.316137289802011,27.71216522728611,9.116558983430485,21.212961744619655,15.370205481421678,25.888505763879913,23.78211772518913,22.52780596840883,37.40963130738542,37.590403623260286,18.46160932177221,4.7393121136540195,12.37848564495571,41.28198553930993,21.23229981192732,27.794195783311373,21.86208391318322,17.577342334543268,26.795721657755134,23.253468683160712,17.369400633431432,25.097544782890175,25.33694892772253,14.429656150356529,25.323299314050118,21.22296998497076,14.611593093061476,27.134163957026104,13.967911635667235,5.807789216888024,32.82969821344082,21.085391980862255,10.172605490019675,4.550796109146049,2.42662890107059,20.907975880629813,30.808685825876424,15.43778764633839,14.019475304424418,16.309664750068002,23.69202345304066,31.576205992659155,6.392156227958294,18.411548808445065,25.111886643222782,14.24971457662236,15.683717181812156,15.346152099817326,24.281894934219665,7.5292081979001635,32.927183318723756,20.101536856526565,14.334786458312259,28.929458762739383,12.49891452214994,12.851336872037432,17.072839027590984,22.181762014662286,12.935465447593414,13.79227018765381,3.856810119977197,19.85423414977707,16.02104187590193,10.682807863233476,7.333246571299294,21.210651628060237,14.969438974860044,36.83244905366845,4.337383976846523,20.78080128278312,23.89844895050143,20.307853190203787,39.422254845865154,35.289816520551724,13.65900540281756,22.75421365232123,12.733576072644713,31.411367539276196,14.172664047182673,8.661102672652856,47.46347748261477,18.992833799181916,27.34056713911483,11.88545080040236,11.943076146578036,27.649154430924575,39.40968001614514,0.14011148943585902,8.106303044160427,24.86710756959195,23.859064972698945,55.9722059389267,15.193928493615704,7.4655567307135735,0.9328760511196155,34.53013272447335,13.581398768791313,5.485297120353987,21.563415479485617,12.983707683652339,16.693686389707082,4.402019472990989,35.71266637336912,2.6599526058262066,13.094560275970716,21.611753346267296,15.285317415264542,3.822589286184579,31.354295576542505,16.77525437379842,12.889965276711592,27.1967516035931,10.793092887810438,30.003062438622713,24.326967451016607,14.473321096213683,30.162549437907952,18.063394217649808,30.564138339799804,3.745460912261941,25.424837662933776,22.47049649844169,47.05219860479788,25.738631832522213,23.117870098844904,41.67848576367688,25.723219098341872,33.9889496221826,34.36825887714318,39.4332952691108,45.10312271944994,9.623686567566299,21.629596668492415,34.6731504508819,29.62632551489448,34.30313453406773,6.308968170037179,15.028640853171945,36.386435073637415,4.0186587004094925,10.775695673064769,12.848431711467374,14.6832968538171,19.78915399725435,10.827551909555396,13.586507217049002,42.99892979146671,15.43181929577699,18.35044092913821,22.544378111186024,33.71119240461933,8.492143643931684,34.55417007347215,35.7275100097865,26.21482548035118,21.590332822341985,28.036992178976014,9.102539044702961,17.966571328771884,11.154789965860454,18.273231223487166,18.309352129681734,30.678849801135048,22.584352021678384,24.007575361035613,10.626270210670363,5.400147694977715,23.88128137273746,24.041855960860786,22.33496000665374,17.358464899191926,27.76694315269097,13.652357416608051,17.277673341577486,7.786511724613492,16.861526166828284,40.003193794870484,12.683621692226293,16.753193676009182,20.08959321404143,14.412475664228955,35.792151721289386,7.689039760582408,12.70457186762682,17.397458109983095,7.920534838640128,15.683909943066508,49.42279499634424,28.08696766831146,29.186066505341756,26.57993523488685,36.766437949762086,43.285383458964425,44.32480629456084,15.586424194977322,8.032262264122535,18.901675630973084,15.338246305164478,23.819865108893033,9.511176865152134,7.418267007153544,18.95272231529379,23.373634679815503,34.83713929291878,8.923073530544494,18.642173550757484,17.489921085401626,6.3346979888159725,18.720944443658382,26.60307071495489,19.01155088931135,9.331910049409615,17.57455879251141,28.738119665688842,26.920480970900158,21.365987170731383,13.039568169612844,22.49285494683105,6.54688888848504,19.634289417444254,27.144172690990633,13.343229188377933,6.096451816199984,13.636888048867998,16.855171303951362,8.120156192645489,20.663394525482744,14.980211371853153,3.9946859937828982,10.093131593428463,18.388116956656646,20.07578570557753,13.737682550399178,33.92328185729454,12.517787402506947,14.074126434905004,30.522440256068087,28.00686911244277,9.3426722394325,17.452451430919904,21.220315799149027,17.12785159414203,2.1378540278347242,12.139203441291373,6.25179590380436,45.23534830972174,28.61148365420653,18.944210240425598,45.826622573877636,26.294552248244514,5.876619521164907,13.439844069645801,27.711513928877658,28.77770751061424,21.403008901050654,9.967494067652144,16.30783987970121,34.38226499265818,12.380570897966306,14.490557864675019,30.378555091044582,19.934716030951826,9.42016522211274,15.245059732868413,15.128761799276568,10.13608145832684,27.799537827186125,20.65855944913115,23.80744174759358,50.88240633272299,16.562238389482783,8.401476199585613,19.483941775726286,4.99129714664975,19.923685791026916,10.052533007194166,19.354327778660213,15.753970412749698,21.27825203898493,17.544593422143965,33.67140694718945,16.634372459500753,18.310817220379878,15.894121180102989,16.11399339623604,22.662483736527914,13.358733139734323,31.02668382587985,5.7525900165681305,6.4237661648581605,30.91657867720692,23.713381411306457,20.859228236766526,39.147187889439216,36.45404246048199,28.419335299627694,7.057419116041576,20.890874017169786,13.470662166908154,19.938196517277945,10.836106437134214,9.585638032235579,8.826672206376207,28.568279016833912,23.92102632763131,30.584685564445422,24.80372344177637,32.267997527290156,52.46188682282878,19.598149598481314,35.78472969389209,16.523043311333222,16.872201965648998,13.243690725665523,19.59426847941,28.21035107691693,18.564700549550327,18.274837153741714,16.22106503302765,29.856777635657135,16.52308422417304,6.24695412427035,4.065640941485218,13.28240184145529,44.527780511373805,15.145601003262009,19.88085722381516,40.354908735304946,32.867877505243676,45.77551956912042,9.906096401416702,20.92171215733123,12.115264592520148,26.66719191096366,6.8593690549846515,29.686441543537807,45.58509707028337,18.79262551048279,14.26341913784971,12.622699646364442,27.56791965692037,9.479116503623235,27.681942584995713,19.86440546896484,11.56034409818099,10.341080187159069,18.450472381090847,15.360137370530378,15.363737101745798,31.5081193503611,12.66992807001329,21.033801276374284,27.353566129845873,38.04544379606284,7.166250855504565,28.282312180150548,17.628846803900203,25.112674748318,16.317641850756043,14.265479176389787,23.188926949720983,13.281097448292924,20.140652468907412,29.40276795794988,21.58768715101771,16.430749804968826,12.320807160000971,26.14371209175507,23.691599233375698,8.023444170997829,34.4970287148529,15.660793464647861,32.21830965444093,21.397998003746398,16.55873218896337,24.277667078326303,8.052443378646656,37.23636712285032,28.06992461294395,28.99706664643506,11.05810012810218,6.115272565763224,36.30339947758988,5.242049866523999,15.681763655386648,26.505154926486433,17.205494222559743,20.2067535503555,24.322568001071478,4.8256577810114685,41.58440000709189,34.95951314948735,13.307801906271322,14.141212725338654,6.137718083049985,12.21272472248733,25.4231986100654,13.783899383043698,9.578719182496844,12.973731370374614,19.78859664232941,10.700743821190889,23.346603547270565,13.308413017536802,26.486927640087373,19.64384421509351,27.923404195879808,5.741185931538588,9.245088155521666,0.8632803694186293,19.963095535926964,12.862170632725075,13.460519631640263,5.605033351190643,17.741332047782166,28.338843370529872,7.017119869491361,22.8110708656938,17.949455087667864,11.831002487215017,20.329221855498815,8.167055439829056,32.49045721439663,32.28877447170885,37.63449730593183,13.31517107149134,8.468831287661967,29.722726622784908,9.822216857475942,38.72283084617325,44.09848052214882,10.698401852665128,2.7056576763375864,8.945939562774921,18.15498559673689,10.658307985427689,19.20745832309043,16.73147007723329,13.55521838679639,26.141413141678793,3.4895701855635886,18.53945883289716,17.04626001122675,12.456822573442986,16.95710326176618,29.211082584426975,31.712766557298973,23.524800753422177,5.982753308650134,17.50738517966025,19.703287658069264,12.476424592653641,16.283953919381613,33.26524062064148,11.34895875353574,27.135124596343417,21.66429224173843,13.270844550362504,12.449638925568582,32.37048962946017,43.17131060450412,11.731950498289883,23.14539067491235,18.909124439741397,26.07153824146833,31.33052425448471,16.422951700700096,8.935528324039616,20.718745719493963,21.080749136868423,30.047583654459658,28.755423962744903,28.929895303348623,6.441745654001988,5.19105206969225,9.064530922574738,2.7935238460785583,13.272140071465815,13.959810559445856,14.253732948413488,19.23981382035348,6.941169949096253,34.73181149213998,8.409969802827856,15.02042635301781,14.028696182800415,21.798062873484163,33.26805128753601,16.94068115290335,15.393618749000666,16.9907671996303,4.807031442686008,16.80313330318442,34.795587103688014,16.009660855285535,33.039197325660346,30.29597544655837,9.867399474064971,11.828151715426069,18.737321850494602,10.872754250134026,9.095099521332736,24.819127403861152,31.808978495100227,41.67698874801632,20.785389537742454,15.90505218353214,18.474069947601492,24.217375886422598,8.691134352845298,50.66173212540236,3.8433271543094527,23.58088280704222,11.526855305468885,19.135736445700083,8.167122690060339,42.092123158532274,6.787633871910204,18.36821472752191,26.960525259369213,5.720275047225275,27.245934925432422,32.8976783560592,19.15556702147712,33.234333902068144,14.453830477582175,30.637919454854067,23.811697043303383,20.024372564991054,37.41931591769465,31.352022905312094,13.592600084867227,31.789038316423618,34.83958397686324,22.139879459731763,10.06295977649344,22.53100650551575,8.987994234855071,28.570694355712668,49.200929482044,41.65653995217017,16.98540820440026,21.526558418511513,21.116899016683437,9.9726852481735,14.59929480063603,40.498079400444965,51.17489240526775,15.258399706663274,32.84949536536383,32.860707650777485,9.817176410503135,19.617222467932105,16.823284402246728,17.078578337979913,17.196978714070525,19.50800443279515,8.814522196572128,16.435347938573404,24.222097209828842,42.071120826184746,19.402548826026017,29.479614891049312,33.479210116923035,25.619615438129184,14.998496909621771,26.934237822360835,11.458970291306054,15.831037031179154,21.106446270322067,8.924450184259463,15.536000099144143,6.813634434952603,10.530040080238326,20.067095105164398,17.946028802487486,45.032482323331806,32.46150190044672,18.800968210015565,18.920798274796756,12.0910072857651,17.45409251507673,30.481966478247678,31.01067234337288,14.546609054764051,21.11389999313397,17.1034118287813,28.908493165718973,3.162114744512654,17.466510289465635,39.131045936662225,13.24522370729888,33.69188314857698,5.8038793086186224,17.726914731398658,28.358336163972794,15.415289837448796,30.398022810771366,14.839745452775706,11.163371993241851,15.91404919182589,20.32765452587616,30.327051516912036,12.948376201034119,6.8615437534360835,14.956697039333346,18.71003383274872,7.986750832417463,18.298945597910024,17.31936276391308,19.42349504312965,32.44197615838371,51.81380549206775,12.607989890549835,21.529433692348608,42.645292454697476,30.499976558169973,6.864540900573191,12.236068360762086,19.321880381391857,18.938725806709265,20.212778574837618,22.58017319789502,4.03429864086169,8.150291086094896,14.644451315443735,22.09951624626732,13.701500266229042,14.482912173023747,4.409992692855409,22.067234274428827,3.66728975892336,35.264305324767065,23.550607686248306,17.45315392117561,51.32668898587792,12.276852387162712,15.052338134686355,2.264996610974871,24.632180351912524,14.268936889277704,26.80496670576499,16.90254547387282,17.460679402124306,18.77919579910907,21.814720937233048,27.086480190640323,4.6399607520127635,43.47214609759709,14.219211123516182,24.026349228727568,10.016722543748624,5.761019362687101,42.34274512965048,12.426476209748046,21.114636292324978,45.48020040942621,25.9134936554515,10.113242767693851,39.34692708523961,39.813539842194736,4.797368776515908,2.6614928329701986,17.236171841659452,16.54898557249282,23.83675128726516,8.05341927009103,5.698236155607539,6.191323135588969,24.908165402526205,5.675050417858081,18.703958777790906,2.7505248084191245,13.485568359990793,24.71388281040263,5.482607573572372,41.62485940620118,16.81952495764587,10.993508343377641,5.631583873389452,4.778767809997358,16.757001061419384,17.752685856333734,19.828091687373583,7.789680380998107,14.18267166022721,19.126549278485914,35.66647248622329,17.5054603057488,26.156689634813254,19.861513102103967,20.788080843975784,26.782987613643243,28.047339708978996,16.07248631460559,11.904401079423296,12.764001740675798,9.86781618727462,25.600813250052298,9.243546294428134,28.330348536240564,7.004179916452253,26.474714427730525,4.155048699387287,11.294816957077444,24.77579509216655,23.03353267221813,35.78151674208516,13.867064417596588,17.923649028547274,43.312663054201685,10.089067777266731,12.41886328167672,43.673442189672784,25.86450421975791,12.581181487355224,26.438398228933824,20.456877021747104,26.447339762221265,2.4489845246642328,32.91441697923555,31.055948902154736,14.356334300850708,22.648878602988866,29.82992349204752,16.724865188210956,25.70690564551193,26.170278118455602,8.978174030121517,23.89941871926468,24.607960110279794,12.993463318109699,34.96830261062198,3.4474680146379835,28.703206075639915,25.369704621699235,28.75204098735329,18.633572130545943,28.147939222898373,17.58105649282868,12.042728413862891,14.10301306930765,31.31581684724283,24.13247619422394,35.20007615706788,12.841295934179286,20.69279901308836,23.989004413593992,24.468088992829816,6.805425930672077,16.488748625171905,33.95322514986627,19.250018628002607,33.56243951078251,49.262242109416306,34.23608610849493,19.912502373749167,12.58424980657204,30.548532751944744,22.861690418878815,28.42708872802082,0.8178635595870016,15.436414702674092,10.416140107959995,5.726958443715863,23.42779658705345,3.089272104873155,14.536586731792138,26.751494287925617,23.538021462301906,17.664765498792192,33.550205554453754,5.096668583947448,16.643563421116554,27.22754738310155,15.585498533974786,8.662486819237573,17.38402884021152,15.717075605743856,16.403269194988063,12.873179440256195,31.021620275240117,5.8126431062753054,23.768926579775208,41.091552893289325,13.611423887440262,11.543166301865753,8.521870475183706,24.284123510794167,15.119535526844459,6.8614611534105965,20.66277599096,10.437194267487795,6.091241511158282,50.654538556584214,16.91977882723847,16.371095947262162,18.312778720043003,37.905984332188154,13.966296024375966,21.13439224828617,20.55364517280625,21.536518394255545,33.45029280574018,35.76032303417841,16.93452014829806,39.85499120800218,32.73565744679012,9.043341438882894,9.480181951309627,32.61934555226938,5.22465042394683,26.928925587446642,13.117962095516795,32.98804218901694,29.914170000345035,20.980561972610722,14.382701777408354,25.786590093423822,12.696650619682014,21.96821869892609,2.917540986744683,25.830566826966024,15.300063288238611,10.47657700887701,4.712919658948508,13.72694129745608,14.600748817264524,29.186227736858175,36.525592405110366,12.059048779308135,41.06688482183499,32.049736613830625,13.979061369602725,23.276597842560335,19.44229185486173,38.5362077240579,10.47085243065083,46.716302943764816,16.23943340375638,35.821825419042966,17.738681548494746,9.258343725334077,24.499817225191865,26.305087717824883,10.653648357134852,41.2405923044964,15.64297499367205,19.488549439864833,26.383006672574126,12.740886861949114,53.35692254540853,32.463981801995814,34.84591879069719,16.115129262914888,8.494287192550308,23.09039896046447,8.714753490038728,17.876880864543697,26.76081692304819,36.699683214974236,19.615093772958755,12.619940505581363,17.412435619394962,19.212631048500832,19.58569577526018,21.66627806875619,9.007795023372083,27.643407069881462,17.80324235117645,34.772467167479185,23.29232446096958,50.65324123395898,28.98217831765532,19.273904096860214,20.690887213136754,14.974095996648774,22.175158147249412,10.851119599929318,43.06713802557513,24.205388067325302,47.00789655544791,6.458683013594276,11.175516476657817,33.382990507561395,17.699630072581858,29.08259139370033,22.98703393004376,9.719682618077574,24.96582246737972,24.904066102554044,11.459807369864103,15.968426596998153,19.158764141646717,6.797917609996476,10.11175179348674,22.121453305884128,4.9718594814674075,1.412103571901471,30.202106049456543,27.613054786531848,31.406997975649432,13.76402529732923,10.550872159094716,14.315734346155107,13.056535613116628,12.73447039452403,38.99169063703974,38.81226236265066,36.71984885557585,10.643376340805872,26.641641428215333,43.566863881103345,6.310299784880092,15.948295972658173,17.58913488924737,4.639768802563863,15.269156046898573,37.8938057879515,43.91836417052045,13.557072977376173,20.018121380216726,22.41579704919076,7.750957803401955,3.861415923783587,17.98137665189219,7.062458186029602,16.91050686711245,18.019797301427264,27.49995145816091,9.65764197448486,20.959148986936388,3.691334803120686,2.5968072194851253,43.703453132361034,18.486940671931876,17.418045331970827,12.012107227072311,15.064196622112991,20.9284159517188,15.624230111045264,26.928861167639063,25.995471193886477,33.410391153745095,20.653547973668612,9.564986516840692,15.440779199188839,21.67343542244645,9.938894823649875],"x":[10.077288643518152,21.477374710047805,21.52185604575817,25.388899811715685,6.290815240277345,20.518898442823957,12.311916301957725,22.230871045495213,4.129373036214027,16.191055259190414,13.412560072029565,12.628108533471657,14.519052072047673,21.51618746766925,35.890096139921816,18.06800069496026,10.33297224990504,35.58560934393181,16.15949007392664,11.3419671981129,19.821608436383897,5.246126183102124,15.584341631392686,10.868969237115115,18.73788003089158,15.165699778014776,40.847456154205865,26.036936174452347,19.468575815219275,16.87036307619855,12.520123259364858,12.856267438999343,26.961737870751325,13.107590391723301,45.06267546795356,12.839504378363461,44.87743417155605,32.59066275229358,23.702967454116347,7.135272854951042,3.3363986208320715,20.26138324989167,10.339553126478766,4.857552003938554,29.308027298906936,5.9023706892437104,32.38189230192159,16.259039213462415,10.26756681700843,13.641366820126251,15.897001592815887,12.077978460591792,15.880273987536494,15.475956278276813,20.696705309916965,14.686238233665112,24.283428235412714,23.495238792751106,27.755923536830032,47.43652755472015,21.84351152064499,32.79334946700546,19.048976753729185,11.920530166134668,26.206837182164108,22.95103466568328,46.64697525551418,39.20791926515853,16.874782141415867,11.071540454209403,17.269829042753557,19.812833933388333,38.362068553729635,20.21279202123878,8.923502745139917,25.287510396566518,28.423306819705623,24.384633520641156,19.903613632235142,14.519359545049278,3.8085987012103923,16.178935964114757,17.195402784185344,3.7922871611889453,4.748169356218794,22.823831528096907,21.000735799513492,18.07594185118432,14.215533279060912,26.89406775553404,34.269389441058294,20.786412657061796,42.70339362323938,18.403423954055647,22.503255262108894,37.56777952404773,11.18818166009967,17.636693595046143,25.419588696052195,8.516103148222678,7.4916657480835465,31.67002012524103,19.27819536912282,13.078269023550554,7.881837817787854,12.472086054603148,22.157723474214155,17.10992590228708,24.384408820073894,29.574153841413803,13.079887314661441,3.2343511308912287,29.28634062086149,16.520946338696067,12.425276145516243,1.9842691120672842,23.073138666461013,10.005721074218078,46.549531039918605,8.134831110115623,36.28851868479089,22.341693576212915,21.480745208525864,40.77506908576413,35.638104182937624,9.900758342017102,18.777601923093176,18.461900763073558,10.374871361980707,19.11758170713668,8.785323581994108,19.163524388420935,17.565687979013283,31.621875593531072,14.279003988448228,8.313738027368922,27.193909557342003,10.853360342666438,8.512700531054431,9.202279655164173,28.565521803472762,12.933178848011224,28.736880833970613,11.117873833718384,41.42800884394583,0.5854739721400232,22.6027186571514,18.975089800375656,8.4972506551185,36.50558777052181,10.551876034614887,20.137705128810598,7.82838286010529,22.26453457882767,3.29822267430451,36.643649616051235,23.419978480344035,14.250721956207133,9.51611814303882,40.38028073572482,33.31010405759679,14.038505401962098,34.55578878605447,12.050031085480121,24.422744700492455,28.155625574758112,12.056113336423218,11.676018531061175,12.596741551554283,36.31506763470912,9.513065760176033,21.227454477215755,15.1753413958208,26.71281567402765,20.276789900337544,28.944160763514134,34.16553820881584,20.141258226929438,15.987572158292295,24.569544264881323,23.201562635452696,36.006637807559756,7.847161623961243,19.2739554288926,10.366293137305622,20.770991506093488,29.83486479748673,6.84065472075484,27.558887225201943,33.88100663742211,5.289105330105394,10.476996967889942,15.497137852899538,15.470666459335627,2.489515178437988,19.614695572489104,13.522320781580252,41.44337360746883,27.521013332646724,18.083543806665382,17.239237761145198,43.718443156449396,10.607242077195522,37.26218068182607,38.84828691259354,33.00558295825266,20.383078076145363,20.233395751648946,11.275856359655066,14.08991428180395,10.711796281728928,9.052583536728301,19.114055229545496,11.606140680461841,16.657309085306082,14.121004799068055,10.001790261953312,18.510826598035358,20.128093933799363,27.215290006623672,21.546496197436294,16.19460017917843,26.535873951858406,23.711226641682224,15.758497704260726,9.7682475401857,15.00222681180248,32.800942646610345,14.443812097986186,1.1748695047188775,9.206658205359755,35.75571477090245,43.53346549642707,7.610400839455247,13.342404273866661,14.687196277261513,5.43106084146122,13.297933890186986,46.0883548260166,22.656785799928223,27.47240832467194,29.352237955734655,44.90593254048173,40.86092122097298,19.451039454661164,11.033882883970305,21.170366873439395,18.994981702969486,3.8583230662012133,22.3061139369552,7.543583909262193,13.558639445608993,40.41334960022358,29.671847293680898,18.25850314192617,3.939442163084456,7.862956078987943,22.09902198224856,5.076796338796779,29.2567298747362,17.078289900752402,37.071494126586934,8.035445379127248,15.773732961539713,32.19044928407578,55.14010014022905,19.50946383739686,21.819255924521045,26.4977369823139,18.756243414806285,19.320683695140225,40.37501960734764,16.101573212129047,23.03805415576011,24.47079938761445,8.480272538193768,18.484526786983356,16.95115715974719,16.79539986964531,3.7933416809612366,18.14911426764387,20.122382101747856,25.623872081846898,13.779507804241947,37.775966559414314,9.138115920995672,18.672472586075127,25.693229162906015,12.456289309647989,7.460330347822106,24.662968314846218,6.2312919673239415,19.165546998979664,1.8378315427579832,12.756866862270684,9.28017769251998,29.534129574140472,20.598895620835794,14.914687516182916,47.50524319686641,13.309643530981024,4.984607700843966,19.64439618599236,27.25356665843732,30.792238934462503,17.92722638857156,12.520195639559285,22.338567273187078,48.36270373397106,2.887593624436614,12.726360666202925,44.19060403906448,22.98235614808771,10.813728261188093,9.94182974805064,11.633174387260667,18.79628808125302,32.100749457639296,26.659946535939046,12.702765908610427,25.107255362626027,9.553792506936384,7.345391739421048,4.124524088085687,4.729934095926024,18.29618106705219,16.322765989253817,25.51973440045615,20.273002685762,18.795589847101294,20.58058046526424,34.737416298451805,16.808045141539225,29.61701064396099,24.303393237908963,34.85385634951619,16.084148919016897,16.004324195872087,18.963313828498197,10.867678796433504,3.0840842654819722,42.649245221480186,23.66960993691663,48.53405432423993,29.410778944908,31.623967304403642,20.237276556122257,7.601662447814869,16.415856729886904,26.99487572500206,20.09059381819742,40.5724161178163,11.265499229081449,7.46897303159361,17.701260323335955,12.431687034759408,16.437237893730362,16.793886413552762,31.652742763267327,22.70072944962852,32.078745610150676,44.33058601590346,16.543763168776238,21.52474041472022,9.27190157055815,8.87342121465762,11.179611001246595,17.901109549236093,29.27201149671003,17.283704162093787,15.472845321911135,21.847695239232742,8.698036686015106,3.981747459914698,14.534860147664581,20.54770913119039,17.274324688729145,26.800614877813242,23.44174359881785,17.333770574663923,20.87450470026765,23.529028522487195,21.915029199246103,16.59860384423725,40.54006208407158,3.8750186413786816,33.83693961419433,18.50189103740754,31.71945123704974,23.266005455189436,14.117585166660685,40.2933919801599,35.747583843073755,25.21442226762536,24.089655577355774,8.385687047445332,8.785473047543729,22.942163983996522,13.221759712538041,17.78755235101128,21.90372208577242,12.936266708311535,11.910640696718593,16.0364739253954,16.906790499673203,13.819066096598103,27.98823457174492,9.096221459796272,24.07872830198547,7.8950553482671,13.974540521800902,17.06753042615856,7.464430821422045,18.63604496774922,28.14016244335763,19.48097009359885,18.871784426039323,24.14385311239014,15.454769111330668,5.4876587080165455,7.450677575988119,6.542659436402225,13.744850012267857,24.909486582741813,42.013857271362504,22.130103848240832,37.98042119744643,8.194224064689552,25.50811408754449,24.65371796179104,31.843068857181446,19.40985220729443,24.975139960916383,36.60583649799987,29.561447500468287,15.661294982837829,25.398793547069168,32.41555913355155,18.11997736362271,38.32421310750888,4.590243946174154,28.122940101072956,33.875650272072015,17.231672273298443,14.782091649131013,6.831156486275949,5.231845193811616,37.48175076023088,13.788214361803094,4.193488060641231,28.0848610590762,12.312083494678326,9.885632477817346,12.623327086033242,16.71944408732281,22.35473919344495,38.394731107455314,19.123226744921507,16.152667348913372,9.47189950078805,13.326000419454797,19.788087642897835,12.828886433074977,3.8630374052449414,5.125158247934319,31.0327567966092,5.041894417172719,1.3679949459848415,11.676342252372757,15.487858908079039,14.228915673977863,11.997329880061137,19.679901191230098,18.77618960273206,30.451366299590816,27.43647241951573,15.951124996205097,11.968547180508107,25.32047251242262,7.41226656515312,8.855476776916008,29.47096892583886,9.67877300175384,4.831918518079041,10.860979225521948,20.42702822143169,11.566175340239518,17.952672287600087,20.63412088825711,37.02326723939642,20.094321635355612,16.060090877479958,16.007802248564506,10.410663273059463,28.987252751325578,27.685757236978446,22.13009502694064,36.557065216350885,14.200462443183795,5.974724656184227,18.7273849715293,10.419268088659077,14.452615850939358,15.110980067673419,31.952319187424713,9.552207046383002,28.601315231735718,23.36587328851246,16.90966373853883,3.387103186934411,26.844304375508813,36.57017398094804,25.933748719012645,52.53935595259778,10.847988705442653,25.778988807809714,11.496883034051852,16.253133390390825,12.465066923536064,18.70451719636685,37.69244353588502,37.56086238728187,16.944354856087656,19.717239597594862,7.37605321765345,4.931377974514121,19.358041392647195,1.2300885419492693,15.274265697877642,16.273674662457072,13.847022200771812,18.535912234431436,6.392033169057813,19.392668906152558,15.29650990470356,30.43453075506674,27.86294601860519,13.84575274561596,20.34609549153555,17.398546046110045,26.056237603644426,17.925147690974775,4.1055802262554835,30.879914519124227,16.65048990610744,15.357938176293317,26.381064683486585,17.290343969447456,26.604925862862554,11.401442305104972,17.213522655169736,9.417096288490441,30.016579054461005,19.25692313648069,30.88944560122484,32.511291644841904,20.651412061501585,25.668744077042057,20.38508020773432,21.32593981593272,8.789186540132187,29.845689589540005,7.4592284000644025,23.79593156322432,10.861302345432925,14.46225807306823,6.45079938083275,27.826463831622547,29.07300169180128,10.809145387670114,38.69030481144188,5.0152984151788775,19.845838209157492,40.51471130798593,18.006453682373664,7.171314443240853,22.628357369781924,22.990609603785657,25.008835382565866,32.843007433989804,42.302083593663404,29.918539435794628,13.561723416783472,28.462657022033714,34.145635307748734,6.108788416088266,8.833817336658958,17.117872922051966,12.097822284841836,10.217321582756398,45.47457722625855,31.794946565953897,16.11045869110375,14.327836454617545,21.67769290900482,10.86746731342605,7.294985357796943,17.613415243506978,41.53478339105173,23.52131667362051,29.942439511145306,36.77486687917056,42.83732254660727,15.104444726454764,21.115590465982475,18.48703009515808,16.877594967564704,27.407722863105334,6.736130335785646,35.57334972592603,36.81273037906615,32.20702388950656,8.308525842569678,20.907319321399978,28.937073539234554,25.057319815560906,14.387186121929124,28.233797166292568,11.96037993789842,11.183676269975926,31.728389121822044,14.290879082450346,15.465274112985199,5.79954919568601,7.396596491992385,16.77253794898105,21.112910341775034,22.25076076488247,14.955591066343896,21.961794421539288,10.057908032527472,23.11599009234743,18.675939872376745,24.75905380816883,48.32255410485514,5.645716608869295,18.470664522705754,16.950611389813822,22.9069731473297,1.9767069704337434,27.870818255059653,22.75231601804084,10.838917431059457,21.61574033387643,16.142198122474348,23.55333490714287,21.07213489175735,16.366489500360927,24.45204217303666,11.424937835906949,29.314998497162538,8.153662209700695,37.029767407076505,7.889914330010594,12.887618509405854,6.0967253716927035,26.687846955842243,19.92447299079184,7.932284203234419,14.548209937123461,13.800843722859275,21.363427265638023,27.8800544335728,20.16540887626633,13.191283816840954,33.55108730092156,35.05628478931791,42.54890247544859,19.371359075438136,11.264559757422166,11.075621511043467,27.596134158507603,19.10687855357257,9.160074083241565,1.9943939618263191,9.540297359287507,11.356061147046944,25.149784286832197,28.262209278649955,19.532449291893442,5.117882223605826,24.172498833843513,3.349550668471528,19.922100450417947,39.88017763312659,20.003462037328074,45.64171065170929,27.767176304558664,15.660682938168181,2.8037814947341184,21.572106455491937,16.26837731810344,28.10624206537155,31.02935075088678,17.720159338263482,17.733797773619006,24.66482981603518,26.01510506312615,3.9315130256124178,35.83493927800297,43.12432994818202,28.975047903981128,11.45624698939655,10.817994912552198,47.252078150752624,13.105903688613015,25.45719170611179,28.780189682367944,18.576736817150067,10.648861845481248,50.019007076404435,50.87139340929819,7.852352350581983,1.7559081842552824,16.96833766555993,24.93733672742841,9.122862576041548,3.198856618655163,5.053219654341399,7.526671822078913,42.6608910773442,3.8348677467515033,14.43860171246278,7.74565433226336,13.978088745895086,17.801105537986803,4.74794847134866,35.069499829492145,14.416126918284732,10.361537227188808,8.976016401866282,11.07451476884804,22.64957092512749,24.21610825446902,19.231241140622554,10.333999414033165,25.58627776722483,10.842603565671356,29.48558065031806,14.662864650903414,20.926248285917634,23.329292740620005,13.870148600794554,17.857343405205206,21.162345568608977,8.497754472836625,9.664631492745816,12.555867105651966,19.599413712210495,21.700522033580484,9.386788767842532,4.078275174511722,6.110622503709959,10.194337700330149,3.2234245936400083,18.11324852193267,20.071427671116954,12.974878386799094,33.455715772611796,21.403571862645556,1.9618097654322868,28.184927509936315,7.218892726015884,26.30473876364877,16.00919541229121,24.084855323881683,18.95344820841695,8.332995193118773,16.240574830989264,20.226423944010595,3.0716634946768933,32.408333628097566,26.028805561394197,15.322635319635312,19.60863020056348,16.371114659632916,16.12909852136698,21.375130716635304,23.167315914877634,9.709143245846281,23.16622368762605,36.98119200460114,20.470552002680595,12.879616164624224,3.215225800188841,11.292675005293148,24.89280470971896,26.96598035764724,14.800836978106386,31.700186715103186,13.789362516919864,15.700051121186515,22.01366470464575,32.46664278485694,19.06260914229416,26.959484493874186,20.342153090655493,4.008831984029839,29.675705624117406,40.57572405575876,2.9586499006258804,11.576401810025956,23.082601312036715,21.206318100232647,24.41563167019435,54.936859918399776,31.68703044538863,28.565396805148325,35.58498820143314,29.47303289597867,23.342125831000892,17.23378926439188,0.8759675163558599,14.513728625412512,16.04362526388432,22.142116518530976,34.02753908595149,4.286198764771923,13.95624031545153,15.974950666672262,18.11711480368974,17.16576102952254,34.43570082332867,5.316030186815658,11.282266701156372,37.13688984220242,14.827820895456721,6.19900941860229,24.01288021383762,32.08427386728691,15.794441782656632,6.558176946961206,35.94800114443822,11.42214326285588,12.876521617549383,31.821837755379306,12.042825456233277,10.205896264658813,8.79733077326824,9.24819674954278,30.85062777114386,7.632298079774376,18.6750050670275,10.288936913282175,5.301015544822323,24.257520814226137,15.816157118455953,16.923014238746646,4.849157583017268,38.857269639916,13.873262525648371,31.929245420292723,18.703952328155182,22.54197667961735,20.569537502521452,32.64484862109147,17.609589685183806,21.818932859594835,42.084676687115575,23.960585412578304,17.15259164490387,34.036816480228644,12.858348613564338,44.804898970047724,15.839942749666433,36.57324262002692,29.51969610001988,28.38318749951857,14.726936107786058,23.22156975946131,12.633547998758639,20.077506265609934,7.465246792178499,17.87227768805623,13.083460939396403,14.31969254577017,12.05890181125007,12.35126358943623,13.917951136814187,29.41718773751673,33.07099160605145,9.402796205564886,34.15080322716058,13.328618334231717,31.717198562620784,19.843427543460237,20.043987422364417,26.023510625078643,6.270397239952009,49.45226371407455,17.897596954232384,19.980350055823756,9.81233199219821,12.065459760605425,26.959591996186447,22.568126696078316,10.33914776672957,37.915002355226385,15.743385569229531,20.494080570248663,15.647711980715506,15.974682083408878,46.34302699050776,11.013634933380613,8.411582470635128,37.27973142099367,12.785903668856847,28.730984635063948,8.960399931256402,18.19773024997045,15.911149976916974,19.75746694530561,12.258614928144768,29.84037132311668,29.36935983997269,22.753145255015394,20.032579958053596,20.557677120563113,8.203165822930206,6.054104409235821,20.09610056427649,20.23846480837965,16.873026693987903,45.816878155590416,46.605993266229035,22.34879208373136,30.86605976629816,18.74623986118986,22.577690589079936,11.926184471781779,40.51094577377279,40.177472192830145,25.841238700799114,9.153968896229296,14.12471361035773,18.169308731990643,18.05204020822092,13.175005545073104,8.151783499087218,11.409916889498426,22.449794870207004,21.176726504717625,17.26145021353532,15.430680211936759,19.500320115963,6.052665582312913,28.386585842961615,27.688229152830893,1.4667492189899474,4.689839587640627,7.594779493515966,49.162123758245755,22.368658327971485,13.068842485544593,20.064107775715915,14.735114873458615,14.751088549568859,11.394721419167274,14.541841777122775,8.188608433242738,35.19759128331121,9.78040600355883,33.354010809267564,44.53082210499622,10.11913845392587,18.222356174866736,19.679987572138664,5.366933887598838,12.111434026625954,21.522369731392082,12.837056758300305,14.812158876301975,18.340449871410023,32.51467276354312,16.41032016617629,10.078868476967463,35.76135755880746,1.8105494569875038,18.233244806096234,21.579237813308676,20.791835986001278,8.434071015306218,6.030688220275019,4.092934943361739,20.62111997669324,36.350844652051286,35.29699609331165,34.43539380958275,24.49945648887352,26.4861317959463,26.045065265724993,16.021781372533134,25.207681027944805,32.61837771121587,28.90049537644923,5.875051745366617,8.78307925202067,14.687368637450529,22.44943826439107,15.218290510284675],"b":[10.235279028647435,23.720455865648738,30.53978519135075,30.63398603375466,8.894083359975342,25.848497974116892,16.25058255918907,38.34312624178676,19.61509026662136,51.74585979999831,18.7672356912853,16.483199612690164,18.114559281156133,36.315239983958975,43.11212603435007,27.393654159434064,11.360817078577048,36.50630294739382,33.84070709789823,18.001741732106854,41.59585062966045,17.241106246075155,19.889881142048026,32.50596261293579,24.601861002674383,16.927607404475978,41.92186162531817,36.83303514847033,20.488273890582718,45.24760008130285,15.990306959906619,34.259754382552885,38.55300247121357,13.176515408278688,49.93841997104189,32.10452262206416,45.377400291605476,33.93130051118365,47.06303316967588,7.777445901479458,22.601270624731317,22.100032323565713,16.34345216883974,17.418544558414276,53.444641402470246,8.092699753444418,40.58256000221161,19.542002415527875,33.57983879885685,14.330176355024564,27.909136894360852,13.432691370341653,40.77191801984122,38.89984320671101,21.21331690526476,19.37529336455124,35.57626990002285,25.239312212896035,55.8676492618845,50.76836940251413,42.24512215286766,37.48737284008862,24.51298317261071,29.626965686536572,41.659826047180616,31.253080437053875,48.03734694660258,43.10160971131006,24.46225894868901,28.178891704967302,28.40688817440499,20.140691737247828,38.97595786309159,30.47445269382832,14.856916352158684,26.248210102767985,35.517158384192726,28.468833492083334,35.950265657085836,16.61051126639218,8.712754160854711,45.085848040801864,28.556008421431034,11.599659285426194,9.206712163807659,40.9364818869729,22.28184054484421,34.61547075246722,15.855402975135533,28.863797318155843,43.03357201791613,24.16383026627577,43.73689840072934,19.348795095366125,33.556039312847375,39.446393933160934,17.320754666211634,23.237360263825785,27.627070492773054,26.4516382432818,12.093278869093247,39.3699475009379,39.78728576648277,14.535208934583741,41.22831038557695,12.532608107452203,32.19939005405486,17.40587479288881,55.53080950080502,38.36564883487892,16.902110700633486,12.607106600163029,40.16086820317928,17.17162745881255,21.49745180146808,36.735382785800994,25.427333730147886,48.47925852547415,47.870977095058294,15.758906996868465,42.090300062113485,30.28367172613833,46.1934007915044,44.948933915781375,37.50572663485812,34.68029369688256,28.603672269027946,20.222896245815917,36.29372427566949,26.550521878493804,9.409239261861826,50.892104886856345,27.018596959861938,36.27497174273672,22.274392761300803,23.117166415589775,52.96850809749511,39.46280516707799,8.965455426473316,9.974954902620027,32.70678558098511,31.350232529072613,57.01927120043101,35.37738347571887,42.94027529958759,3.8184429720588264,46.68268214603117,26.4444331787038,10.040635978880182,45.10829810182758,13.161070011818147,21.67013972293825,7.880204542824343,45.8229198571626,8.566771795808204,47.761074610287864,38.811589726649586,20.322017820697702,11.727834558319753,51.727503048811684,51.35869147644392,19.61092471031572,48.03792326335046,39.615754101412996,44.50490168026064,41.71817027611239,22.470706955646975,39.21457953221608,39.84620305843276,40.747881065208546,19.34132357745812,42.0145336851445,40.17771078952949,52.585704989857476,28.657613515347585,33.23899390299202,43.111078360671144,42.42698919082999,36.83495733574342,38.33063349492505,43.49775754219823,47.2646868051418,11.864612722651344,39.758186037547254,40.92061183379615,30.227530132185723,38.6471918771224,9.84842957650744,42.81061411818588,42.20931397726848,6.432939990756741,13.384614426181338,20.70093384347592,20.34297157632703,30.5115207230738,19.652733829682198,13.72774443152001,49.9513775953401,30.693054692126385,20.55867184325658,31.46464206568566,44.1853491969569,31.290069900414863,39.01453782708671,39.64651903914512,39.7576584929462,48.968638949492416,38.016762785614304,11.653820847208447,28.11856723633785,14.830368847869005,32.11024530581944,22.252459511259673,32.031658774040295,42.69149785962728,36.58792150780286,10.656154988214007,18.90194365502321,24.58254027360927,33.21478092327929,28.247482469215953,19.88387736173241,41.66646469442897,24.52328239936194,25.54171935739282,11.74126043888382,20.964456970960804,49.36676350070486,17.40593423866408,29.937890563811827,28.378744049776937,46.505198633840756,51.727155862670884,8.453962070912056,14.785817932482818,32.715965896384915,8.105429003168174,34.591597800708065,57.82800071890635,32.99536010376736,30.17674654986441,32.347423274486516,50.15618566686365,51.256297186067876,48.944073347837666,47.278800473584454,34.829504906611184,39.6211594869354,15.847076644524755,28.81757060142078,10.826941905542146,28.666163400271824,43.1282534903571,34.0175255070628,48.35636160986439,10.992780663643043,32.01274460227509,27.46073613498251,8.622191316236684,37.79738648002744,49.08561821952199,40.888034535241985,10.57045337522046,19.068973590120102,43.0242881048619,57.486071580229265,45.92616872371308,24.18787758409848,26.77236122583791,35.10364193268369,28.46003458879958,45.2421019523823,16.331985464642315,26.734981485987966,37.005818978059494,36.67302702503084,21.576806911556318,22.851779471712305,18.392782421941092,4.168160759301016,20.690699136340136,20.33197986732307,47.390893733187845,14.149900632902943,42.129614195571016,13.685104337812358,21.027425861292986,47.6958584101295,48.20267298246217,9.914462022690135,33.319520698964666,22.53144264613924,22.585402020320227,4.441405531646985,14.251377569528799,27.68852608230234,52.00140090054244,48.19439264493373,24.262190475997016,48.787405393542315,34.952111047708996,8.263839723562135,24.519053851552258,30.95096154970206,34.61115480128025,24.655603102136368,29.54336894222382,22.93371229451097,57.93967097949543,14.597370521304276,14.902970664246599,45.41407011580431,30.082252327473665,14.561875166375003,22.171341215369303,22.03715880773519,20.49863515987537,35.98779786477633,31.32131421302642,25.236247265259337,54.09291794778581,47.65972820246037,30.082850934112173,39.67441733826402,5.379914746829186,21.999545667477058,28.854399256132545,29.587897650997157,25.799832745026364,40.005996899491485,36.72585275097388,37.28286720436148,54.18447951503046,35.88676560626123,35.23677734241231,39.13232770554447,23.380669229135208,23.28581947266581,35.806936623021656,17.505415627577598,10.633258436193312,44.97542327271063,26.099032574424697,56.082441617832956,41.7997387818052,43.908245783974465,35.83658653634853,29.384147445213387,23.33967721607895,34.49917969758441,20.325159569115986,44.45789758565036,11.456522415787184,15.479125843604468,35.57357349450229,51.885799799039624,32.64661186552823,25.784593289098726,37.76463464991325,54.48326608630981,49.217611706323964,45.54543396805132,16.612726913795935,37.341398590628025,26.997904062599233,19.86532051092242,30.400032370186373,18.65973623692755,34.410552674051715,18.422500239633397,48.45475342933978,23.83413791457391,18.488269163134948,4.1223053168192525,29.825544002165238,47.931758233730115,28.510237457781937,37.6381712156884,40.76327867163381,36.600846014812454,51.455105509594006,37.845662148643015,22.44261442094175,29.78697827068946,41.94957119875335,11.452775604609492,39.322478442028235,47.879787997636036,40.66623223422759,31.910609716797858,30.908751802897168,46.305588432221626,37.9792471548513,27.769051483747354,24.9097250717725,21.137102206089683,17.22382442642825,44.25078259575511,16.189913088400885,18.04571613342999,33.32366157659004,19.33552524192002,47.347426385963715,41.68031315715385,47.60272901597056,14.029427496074192,35.72279991844775,20.026942331381292,37.380000128843754,19.109715621115924,14.276086223302684,24.601510099780647,13.314307639275995,21.462036577258274,34.79115489231596,24.866484448118126,21.581860988718915,31.819078744924752,32.79557911240979,26.766533140844754,17.1718094984611,35.74589056015293,30.22743664418152,40.56509957881542,43.14964997540521,24.545820783344045,43.03641479914698,8.196765533185522,39.441330053064235,32.02862293729073,34.462900156878106,33.6286159049997,32.46175948797785,37.4630322060453,31.90314848905108,15.87662097717776,51.65989427041065,33.49341363361151,20.520931549992696,50.97320419398356,7.214225403854706,52.042585628966386,35.91087354970965,17.97567398994086,15.015113465040839,6.985416763892625,23.59546089863805,52.163728434364806,13.80493546673598,17.417433479399328,29.199639673256257,35.67536370852225,13.425810665076078,41.093693133419784,17.385244562987843,29.475535310199778,52.38987280676877,28.7187010109586,16.758934284555384,9.510265371331124,14.603237164113562,20.07613994927211,13.770559416220719,19.042212349985157,6.123730825910889,37.63735778862501,33.35636472668721,7.085669899633831,36.57192165648072,31.58347048424531,25.026527187385167,38.337316113090615,20.593088529420122,42.44164673857671,39.32082732624461,44.83615084983238,24.493402738353097,13.273796094987578,42.46725784338934,11.764492473827609,38.728848944273466,49.6520911314903,12.50291779208232,5.691900001692809,21.442229414676387,55.95548872317873,13.088132274853482,21.1804516510081,34.95281908402283,39.22196714017004,29.011458594106628,29.41424647298465,22.91792238533465,34.56415532212241,35.78030367158223,43.11890755601482,38.06110357272272,37.857108188390875,27.816444850343814,15.085318695205757,26.18645930729067,20.31110952282349,24.484438640281162,18.392279567971144,39.94759423375577,16.012428304521286,40.75618267640266,23.45879317216188,25.348051748775852,13.39457500598979,36.26091920293439,47.521252998313585,27.86486723755398,53.274283072392485,25.04713581872278,26.340229705988335,33.2830491626879,16.822525948545604,31.68579514582085,39.45761156100039,54.9321415658602,40.32251843304351,37.366848081987065,29.215941446624,9.947250630890698,5.497761150266407,33.84291487769445,3.355910512386515,16.1887379220739,33.19479612567852,14.834149009679885,22.565649609748526,8.76295809730992,36.17523125508188,18.947746161761494,42.89097082238984,47.189258945733044,42.08798679563802,45.11153331664825,30.681640995325555,44.67900751507227,28.910914758242455,41.17990776166768,40.96833291033798,36.72175202188555,16.42134152058715,47.62139338122321,34.17534933992578,28.859789820116333,12.106652801504833,40.87920648581293,16.143463742072342,39.77388707373453,27.05788784688098,45.698803436327864,50.05603784052673,47.08727601943745,38.25033145394087,21.75419288741074,29.467441281812288,8.945526573691218,52.86166542273205,10.202973966747502,25.638215503263872,13.010376190115993,45.9527971260194,15.13751189899994,45.20990164660647,41.22142796240664,24.909679439742135,39.26755162073944,11.182474216124927,39.427439504490366,43.41642312744248,32.56175999236837,34.86914094138896,25.63776890626542,34.6124294077114,25.60516939480603,40.30758966585168,53.11899622979962,38.41230110154956,14.163111414100653,45.076952927627715,37.679481314385015,27.879332073269545,10.718288026565483,39.701074049886685,19.086612627658663,29.519672998028366,51.914090376546255,46.71877850769581,24.496445906404713,32.213098213674584,29.324504139585805,18.412996412138916,23.604730292623636,43.310117576490214,54.86267033037873,27.10811922971284,33.817988195501755,43.55905692660598,44.535788698508775,36.245084187264105,31.094304842137696,18.521148392924733,17.29726972023107,40.396119163183954,10.956571126682677,38.718310459571086,37.184533740095915,42.595260716175815,29.056488171251754,34.83642440435955,41.601793667128725,27.222625436446478,16.225126425596525,30.557052687700395,13.95666005240193,21.446583291296836,31.88501894699626,39.94343624942471,17.092139664018553,12.346289987697867,13.425211367984357,34.729013442855255,32.46917949129101,53.05748160852842,47.15393184627965,24.58750339523511,30.202481027527785,47.40426953754917,34.44454574509246,49.92468479446599,52.82166931214195,14.93855849291403,21.845293165662785,17.545695609278617,42.510912143647296,6.661291055777658,32.210060079014326,43.009028337249866,13.619929678001252,38.78426798321411,28.67172922718827,24.539061957004364,36.890644045284844,17.345091759416302,33.94397837592254,32.04975115464002,44.32924269509477,19.33026642405345,46.89395421952871,38.39076716901955,13.740701762244724,16.786284523975255,34.56802655399584,26.827187332008904,8.015849449564083,21.679940938626206,38.651544742091076,21.60026295263721,44.340795802209016,57.79821745396607,14.59510389361979,38.67700185306681,50.370845015144155,43.52831253765258,34.65259966846011,19.15009227278757,27.361386395716824,34.39270227979186,27.173426773008053,26.199068008964062,7.57814125732732,25.333845580814987,18.27573134751459,25.502286627775796,30.457114021591394,20.18254943489433,5.471997605350745,28.57084209071566,6.157871010574247,50.79780686170638,50.54551999359249,20.87551782690533,57.28962909804124,28.88972501276761,24.73234373996501,4.624378969795142,45.737673010435685,22.110365871109195,33.72665593165126,39.83541418325376,17.962295727614087,21.068731105357614,27.76563277960185,27.862169362589214,13.09475695641494,49.52489238316616,43.67888251488216,32.39739555636107,22.97673061901593,29.78715534470383,53.247011121895866,14.509487115700361,52.12137427422864,49.17880502836794,26.033660644508828,23.169061893206518,50.536915902059775,52.54446298907217,12.012190110636794,7.667561791597555,17.31038614694063,47.03143917603399,26.913703564023425,15.576915849801175,6.2435341678596545,18.265883041028875,47.418419161014505,9.117215639989759,19.424547478888243,13.424090796303147,24.66883898865166,36.28840891901996,8.286930724526954,44.010128696737354,25.413285154305242,11.283451291172794,33.21181109965309,18.83714517141349,33.8117735452021,24.336808429222152,23.901827007653946,41.064173268473816,28.346073507964945,24.549012922759097,36.14703875384543,17.838922288906154,44.05450846293978,30.834982689265384,34.071736331440526,37.65996111031117,41.88030993006035,18.978974334939256,24.866378339806367,13.708356257385859,21.325213252744103,27.82610746393069,12.656124701174832,38.3328052848741,8.31191861098764,40.72850431287565,4.89612906706093,34.19457727724232,44.156054408959456,29.396085899147813,38.4194936677365,26.404378726238036,37.78993033754961,48.93315120251601,14.494795831233155,27.94067242870099,47.90139392862934,44.46910375424576,20.002661147095004,37.62048515890295,24.552773571123744,32.73657106435541,5.881727750675689,33.451908205688575,53.83788554243488,17.846553029399512,23.398154392101254,39.99008425514048,16.889617631803304,40.737356671346134,28.3818865528782,13.495196465512963,45.48674288912305,50.48820501146114,22.925086959662153,37.67982746693549,3.784405971152638,43.46207927052288,38.581015640215824,45.92103774808274,21.834914439663375,42.201910925721556,21.94129976440329,16.354688828510554,30.32888868168748,40.068048221584185,27.981428787109763,45.228553452396504,20.413482194310944,34.10256462633215,33.03298723935561,49.396215677938244,16.792110794991732,27.63099682594326,55.486579377379456,23.545615080047764,47.34185583676789,57.372356588199196,43.98204892744079,36.54046515986016,40.6710224649848,55.29826665647352,47.45520149975307,29.22266460115867,12.699446222579631,15.884344680950374,18.699772481044434,25.602364904929964,39.44026428466925,4.312614300523099,31.187198482551835,27.529315433219843,38.36948956565804,46.3835982943876,46.12987911088805,5.8044646020108415,20.36189550744055,53.45531815806215,18.38404477658957,15.685281526226698,26.937057743750024,42.39139873580042,18.229428503800207,30.44552253542407,36.21852180700259,15.625083557709845,31.258030000502167,43.78565200558611,21.070445030057797,19.853141690719074,12.813484797181687,36.33069736593906,40.912218739050886,18.36249352927171,27.823105868643673,11.032663849663624,7.445428729725654,50.782417125372845,17.139853499453892,17.98433578432516,28.777347916546812,46.19603279507101,20.266609197384454,40.53505489174423,29.634125328166945,29.472742350578024,35.15785169576077,50.007665439207415,35.639149010699676,46.29026435230682,49.879666156566486,25.136887988740156,34.36178650769498,38.62629271275265,24.233712688887532,50.66817330333163,18.223616637521978,55.422479703868184,30.081077789590353,41.10842300444617,17.116224172255965,34.471467669187035,15.371723834070945,23.561518786762853,7.6575264193781845,34.42572680115677,15.643279576337875,22.83106669973284,37.270469190671534,16.832240414958463,18.68501958132805,49.82251400872974,39.681736161806896,18.28276727682625,43.89726481916536,34.770162327979556,31.797285364770012,27.383175241897195,25.67137027602812,48.355061017273044,33.50472860545746,51.03527139653544,18.00241656916627,37.76062183452415,22.9936123502398,12.95487917780016,30.57467023002841,38.57323687223921,15.262279888103315,52.86416790329075,15.876462678788164,32.22740006656689,33.69603461039034,18.75151722201621,57.513267756518005,34.600549352863496,35.8469892494953,37.592447404608606,15.208818335355044,36.541182340529076,11.003163115553637,24.707799678812535,30.700217815714794,46.70115932660774,23.7504430178846,35.2363315773964,32.72080087642772,30.801864052202173,23.77369835792345,30.99894903430509,11.423701019228512,28.844208309182875,26.513310127835183,53.61495581168883,35.205945160189245,57.30823212370632,52.216501202044924,25.571808156088732,32.0882901623946,29.24602920024748,44.209348203517386,14.307889599085449,45.961692373934625,51.73821729606124,47.23374086020348,12.730863850534991,22.325780183964767,36.3825579427884,18.69061403134397,37.68852760076405,41.03017339313912,12.429116991981415,25.200815696210334,42.47367154911164,25.298499173577092,16.018288549182614,20.225537605025316,12.380764670017577,34.305597368388554,43.32094817919999,5.60700142184583,15.149202092814363,36.147844179116944,55.27997866035675,36.196560732091946,26.89628723878511,22.816950017250154,14.838020360528285,45.93066785163009,23.000150418634824,49.481297640427336,44.10388105673211,42.33662978594636,15.436139503828246,49.79948503545917,48.16886861326599,15.107001296528363,34.602150358284035,20.739634738801698,6.983142308767714,15.336308432532931,40.18516935817722,45.22890062869235,20.664418940050634,21.69548693849918,36.25170033211877,29.868118726589163,10.63101391187887,48.034785361976056,7.5125283751640515,21.269472480364865,29.372097904975895,34.833775879312945,22.09912363302231,21.372648975062123,4.352646434961027,26.624241677957123,49.37764925873506,47.579940069400976,38.1489921517761,39.91030527543888,37.536628367229014,34.30969028714089,24.99339784340448,29.008694420439912,42.07598746267516,33.90487529146579,20.8397163746529,11.821541110145969,15.458150946819652,24.504894104149407,22.135867281127346],"a":[5.519245076811297,2.8421948675271036,4.188090820567942,19.253949979671606,3.908768165199099,16.300679130280432,11.999325469987387,14.805428913626013,1.49848025292326,15.987307833349993,4.7398622852460015,11.570467787980556,12.594950416948132,15.64212435880414,14.198097394448679,0.7121337884200329,3.6927960447059416,7.978525773640608,8.833879989005125,9.80551490958755,10.996149201890137,4.303193247666135,7.41110990860347,10.385864672903931,4.691129424657534,14.674902488400313,7.166062540291516,2.6936938507776675,19.16184965895586,15.419843469220984,1.702058000289557,6.657483925457526,12.847636511144117,13.099831990381684,11.126214667805279,3.6165745951164174,17.76629282486236,16.522012366596407,12.731024941431857,5.390135562470864,2.246642134675798,5.010837890580584,6.296903403764982,3.3169947385125553,17.311505698295136,3.157545439502276,18.873065684616172,6.26022573551726,0.05317349074175137,6.5240729307759615,9.37046620810509,10.369186363410897,6.082647770840546,5.548309076796043,13.576877586433596,13.211133374516514,14.486737561145095,19.54174109818507,17.255502591869778,11.812945062098862,3.7607696364056764,1.188513711891379,3.731897946836069,7.146106840702955,14.932078554086278,10.93670939924011,16.50159684508958,4.112814947183465,6.012593122802574,10.322800857986657,3.697049428975201,8.288916348480267,7.388282343593482,6.715161627968587,3.6438554426805236,16.67665859602717,4.049272653961085,10.556457104154191,19.809951719398654,13.671553051129921,0.7839625901490299,7.008726702563424,10.93309818409043,1.0536162734517696,2.1569168975173847,0.9527206453515502,19.401161830836546,17.12305445668065,10.569882843898357,12.83018229516269,8.817395609282674,6.358731154103121,19.81758477266075,3.533050907004709,18.339408792541096,7.186713983606596,8.681026402492979,13.823090127491561,10.447074685736194,3.15083505903897,2.804960419626754,19.391167227338787,18.201650281116038,10.980336784732305,4.779042019548516,12.439390003358968,11.572459955324831,16.6410570700613,17.27253815913493,0.4960041253925329,11.934334441117,0.7734046728151922,19.80418107534946,11.96814039787855,10.197874812794891,0.8094138082364388,19.58611985653793,8.675605687025453,11.73307599722651,1.4375387044617316,18.24524391203781,16.221352436927738,17.399040228843145,15.455840089745685,18.904310114737548,3.808604855794928,18.00111570629504,3.249808186246055,4.534894732679997,13.619401794269258,8.373425343533567,15.18691399726265,13.705683914213793,18.619729801306917,9.397157883789994,7.132130331516211,16.482002013803978,3.911725078664583,0.10478475726313885,2.2668796884613363,14.0449078228704,12.221423117178185,18.71429902480711,7.301608022722261,6.553404292785117,0.20816496243850846,11.673878063674845,12.001724925602723,1.0788603937641517,6.159172158982664,9.759502500928207,15.141740899055858,3.896222457511218,6.50435431316724,1.9546217057323334,10.907869546923067,11.639877646149754,5.020629010715005,3.258433676744832,17.773411839442158,13.573624239041813,2.776184279287852,19.510740982326435,6.424085341880952,19.34261957990259,2.9966271122585963,6.217089495236783,7.890121673640351,5.843935453833637,19.664565907745406,0.7412305189049473,12.998803864615077,3.813449235186388,16.75778697402318,9.253069513718245,1.4699631797401658,18.358973065744316,7.177108764014712,8.685119054960108,17.22196585953775,3.7948529245513107,14.668608917001684,6.996857481720076,1.1873814736947352,3.1011300005703912,14.621769117078301,12.136791414263959,5.230198287648085,12.755955425931113,10.481719150244588,3.3112766214619205,10.443357957018575,9.973254255475332,10.263637973745986,1.229121017810022,6.456631181413988,13.356452892289576,10.137200539546365,12.018259477095263,6.104396352442185,15.380460311358641,6.933811848971638,2.0215472284035396,18.462769338468867,4.803088207991837,18.958685481266787,13.479302880364905,5.857958911578924,0.5773866047229426,10.703506692128911,9.106152410009166,3.8237986851786676,15.937296768555825,7.89323551111174,4.344183724593664,8.552960975738383,9.181268013851781,0.23621991754072091,19.832133004518383,13.654850451479742,1.7140937721149863,16.028612551177986,19.512027686974687,8.07908581779445,11.915039075732881,6.163303699812452,11.68024865876841,16.099339243440856,9.952505968341603,0.9300807820182744,1.3408556155376372,11.859781514876842,14.319347852958861,7.59718158338285,7.444688401446764,4.824529007577798,2.380812179006453,8.667189934072459,18.216501714438994,19.73012154487376,16.65769281136641,10.021617140568466,16.326747343040783,12.085775396773073,13.153759603981792,10.052671481041173,6.725971901465333,3.16643687488694,3.1871049682357144,10.508253514285034,5.805525790905199,0.31107308448437454,5.192480265460979,7.373429314353297,12.03736392921057,2.5708519366027005,1.8917566141634001,17.471926262912373,3.277803452854111,8.18116970016218,14.758749147205235,13.898209968070478,7.67066510449498,15.359488000594697,16.00244891256903,17.520700494790074,11.99021269103027,10.531891545366063,0.8793681642861095,0.5198756972545793,9.050907042482145,14.870967858114103,7.8532289444756564,0.7338126891322139,2.858994895534459,0.44366770780033704,2.6617591568395627,9.579345094840871,14.728717903722055,3.6794474517433207,3.777321271132932,17.410657171910277,11.084779146736814,5.8514589650025695,2.410116630225323,7.586171223222542,9.511462582493394,14.674996622360656,11.526098015421118,6.203942705978434,14.965898667267933,5.609684705038598,6.297575518500156,1.2229786548812482,10.94710031479925,5.660274113797121,12.011738763645532,13.72906343996284,1.8399849077814512,13.131704810416451,9.112818706111568,2.7459537916953503,8.773172184386588,17.55514984686475,14.97804122101015,13.28746402401408,5.719299793304402,14.29031035194309,18.834976282654942,2.4218857579930297,11.489653421235552,9.315532104631735,18.592023957871298,5.671585351271324,2.935324619864672,8.881686255549583,8.320160931816641,17.69660493728709,19.68579077482631,11.157373646976318,14.876380660467724,9.474066158499035,3.7148797491862062,2.279866005163531,4.294475335727581,9.060766096751149,7.224599193596903,14.978960677967947,8.83014813270143,11.097129146200784,12.339706585365619,17.3398743557815,16.182731001783512,9.976490270049219,4.493670964199059,13.262917742380775,14.813054815594185,11.192011904740205,17.414395763345446,1.4493487584219622,0.2646514143386147,16.801775076950033,3.2840425200879997,18.965738481125793,1.886013291222528,19.193372373449407,19.646260340797603,3.1245010146490237,16.23257514364973,2.4112297032491536,19.19461009927152,5.2792137512754955,2.314360973841052,6.764755224809584,10.261946170884153,12.368487124714633,0.6839231134603274,2.308589671629764,19.379181153543698,19.713102372441988,14.827580641579786,13.108575209594342,15.723770793470703,1.6772620733360943,2.677841967749326,8.838952630474477,5.430318443091098,11.412742696734227,1.367825487091876,15.423684441834506,14.437072469752707,11.935515917052456,3.944661356432557,3.956893940584445,5.082539718122985,16.578921687560353,4.964209349060025,19.299855432284723,4.160742196823097,13.006100835026558,15.250795860901295,9.738794818218178,17.227549143506565,3.0813275247297645,18.118048893602396,1.9821165286471087,16.115810647749022,16.933084162481443,15.328108702567832,8.79356858746501,1.1505248183737926,13.543351433005979,8.260164411719359,11.290450737281418,19.792848199391088,7.797049714397679,5.391104310255335,7.2699859342304585,6.059475183380587,12.758976399988114,11.603864553727536,7.764242282773126,7.88111314223316,4.945203113022769,8.831320128696163,0.286522415307644,14.646991743826018,6.565362167866775,18.02153229777566,4.628460554601355,12.786553436865029,16.74711328186126,5.4081415177770165,16.274767625731172,11.464803028731634,2.7914203557450223,16.113823401658234,2.164415003307858,13.826862335531445,4.2800615244530915,7.27266132670886,5.840796381605617,1.6010765750652745,13.848724064113092,11.93589006091019,11.189540574788598,17.535876005458544,7.921436222248808,16.4063827438541,15.04305529467774,14.305863704168189,5.135807650604707,1.6730099289892708,16.50000150827617,1.305012697604493,15.565708985195723,11.663383723003498,1.2750474434471215,17.23471099661851,17.333828978238422,3.4129133640191034,12.57085560354534,6.476547629938789,10.656962935340673,13.609077226085695,5.828301984247348,3.2812820331152492,14.317818076396854,13.665991348141265,0.21237637332535364,10.650480464584625,4.71772153083748,5.315652421778352,5.804748718647823,11.939496886561045,16.339951167652277,15.852548889248581,15.940764686533413,3.6539185897407167,8.974704112852244,0.5328294904903208,9.594301347040538,12.7285872332982,1.3648669177917805,4.558113900109109,6.9827495344312585,2.510359007487186,0.032625706411049116,10.888726536302592,14.528093665771289,5.577266085587458,1.6423976632292847,0.37197898273135355,15.668297220888071,18.307348678279585,6.695961270797666,7.517313011536464,4.746788574956957,7.782901475545496,6.639525187322328,5.656598229474898,19.955820263219557,9.285790115319088,0.9787518156837605,5.386066438668045,17.44696132227005,10.570510084247498,17.82442818643019,2.7944001674229257,7.286725955225464,16.05024123898801,0.5684166800612811,14.479860176788343,6.204581905690643,10.991932589484046,15.983896963027107,15.687344852393196,19.8744148622957,10.241644838330096,4.411310719223009,13.501483511474506,8.560451264856042,11.410822381828222,14.252986778995469,6.869519633033567,8.101204552478585,18.999813638330618,15.452096583288494,4.8771189659588154,2.6424994220858666,19.562755045135575,10.289413061868897,7.930508938510208,18.07971580079183,2.832849716191297,14.805851083273524,7.084399101302963,16.050626980462887,6.939769483062572,15.979227297675966,19.421161150146467,19.805950158338295,7.584640168989161,15.306782643016899,0.7814813024541323,4.045415056969017,7.992355400529858,0.2630029829945091,12.021226914869514,10.333225180024964,13.497488364221578,18.289207249284985,3.5659583344837342,17.428985091303076,2.0908561477347742,14.526613283569652,12.743899820298289,3.5454268328168848,8.232843411932889,14.664708026110024,14.289138273108236,0.4742854897984605,4.070880318292485,16.635999045631493,2.687302189503491,14.946754976757092,14.371541676753402,5.753206667047821,7.8898330549614215,11.132175046258762,16.303024359961004,1.9561890879032084,7.303453855657311,7.400959351329965,14.158806591129043,18.471513616275793,8.941404984378662,4.537648531080558,16.522019638094875,17.37034691995828,8.655531207385563,14.074086198109645,2.2875879691245338,18.23004191802591,10.357215180732942,5.986690599168822,6.402576771720834,15.00316864363116,5.6717215291112755,6.255799200121568,1.9112156111750078,4.71253514135892,10.68717479474178,16.735379075034054,9.180853481792601,4.268952261806769,3.074960794028927,19.8835951772962,18.049546524831253,7.420550761874591,18.48919061310863,1.762810780834183,10.668491088560739,13.03716766483948,10.512798553644561,2.1686967310976613,7.3335694463236045,12.66553469933684,3.0135454718555366,7.367051733655519,13.510927287735957,16.911308085545787,9.825139064103986,8.311781055642346,17.237308996278415,7.383318979718836,3.6865663960327177,13.873579488641482,15.720945175823617,13.111674613126354,2.3752848177662544,6.603117602821329,9.443185595965012,9.423111463707308,7.303834497437824,16.51602157855325,3.452571857384217,11.328783972787715,3.859014972822745,14.219126433463414,16.54787493727914,12.345818344622943,0.9249773222061153,19.31449033889898,19.8152563560039,19.531974899146412,12.657431973845558,12.409157906925916,4.536179906881643,5.6230668828136965,0.032992393983057866,2.9279320261650588,14.638223438951403,5.212133795291081,4.885469999493917,2.0632084682637197,13.759489379368656,14.830115927294031,13.271018012522497,15.868732283610804,0.7972002087527885,11.796230352301226,8.42763262236041,17.990097007378925,15.352596761444683,2.207362760296596,18.360907437636502,16.780355017335708,9.461152660696484,1.5370542699847078,1.9220556612692352,5.955847156948306,9.802308144126002,7.602281230033214,1.0033266143742914,8.043025575857818,11.092741136148865,13.96442213241821,15.45129972423612,7.674932102518359,5.32930231990941,4.287715673341248,14.984752076278433,7.071418081898728,11.87470329965086,3.796830007608678,3.5701847221582383,12.085135402805616,7.931562053278052,11.806452697892166,11.94824200756785,16.73875909851453,18.461374544754957,18.741611977193635,12.45320185980514,10.759077147533462,17.098444595197467,19.262928492114675,3.6641700937143318,10.7110844754341,8.297331305699931,3.623985089099042,14.21000142539301,7.964041294421875,1.5228377208919097,2.512766419807755,9.556729927981404,17.289343359952888,6.146905858022906,14.359592924340498,1.1845561138127403,19.04809341342766,2.914213348658077,19.29993826135484,17.53251759312523,10.5001084834282,18.677304042578278,10.496837924545815,7.075996948260039,0.7238546622758424,16.90092845069126,12.687906363549693,11.632871677205245,12.551886965336493,17.150030554018837,10.645725085276329,9.96787051472455,19.737662756528334,3.114491990134076,13.888772796414264,6.66627119050434,14.221234805797046,3.175796585292394,4.077862670809278,16.859531323017613,10.41130421224187,19.9884624218212,12.328761774651973,15.681103701303364,8.147006561008068,17.146605780881853,19.70975775441696,3.5515203226580505,1.3281685899871576,16.933232806364693,7.824304581499186,2.6986341272754366,2.0146558983473684,4.2578597187670875,5.635698735304797,18.84184772660774,0.2397241540011974,1.4928722158773766,1.603580423991957,11.38468853769687,8.230351757111375,4.702003347361354,17.03203558896615,6.9719811321180725,9.696072540564668,4.681201719339536,1.2057056868752003,14.598309819324747,16.572348330330048,4.100382365811908,4.8777547327454585,12.015169519082868,0.30794432199341415,7.8831773079438605,13.696367097925215,16.823532232571246,13.302620174441593,9.05848161125531,14.13775920658411,9.766185136158466,7.716194900161959,4.699081232749891,12.495333569210967,0.10584491495721604,16.230777509362156,3.616755718985041,0.12675703730003818,1.3450128260855143,6.521021364996846,2.4413287587006804,4.883216444388103,14.589461697890407,2.363186690321344,14.379478762142345,7.743608266700255,0.38359838629637544,11.74336689651537,2.9728636488152693,8.24715549239819,7.99731249559033,5.415146401694075,6.480090164414092,2.2100096088268018,7.934451566586191,18.561480532308437,1.8813045589179511,16.315436404633484,19.79166942234557,2.25512216725944,15.929391485687688,5.064344584237239,15.323769039788173,2.590474131580498,14.91690095433797,8.844489958619114,19.628078314981828,19.99176883586717,9.523521549137065,7.654868465106119,0.1431815241586376,8.633224960378012,16.375505089802473,16.123469133084335,11.994687573989866,5.173720819004535,12.877930614095362,7.383347709556998,10.211948785801317,7.970748306712108,18.409372160054662,17.80245074530805,6.658595630896653,2.0764907202229033,16.098115290748098,13.30605939711685,0.6288422548443329,3.3959462181833855,16.124669136674893,18.933434521329335,7.410926187100957,17.91977199623354,6.3670093961258445,11.552892600870726,7.012136088496366,19.106813512719427,12.973598870822443,14.882919464764308,0.7450552411063693,13.028914975688256,9.233040962252147,1.519168703699636,9.093879943846325,2.0867230350026,10.478186862030805,15.663747362986928,15.203842114261622,14.485047711749544,7.517523948996576,5.071031033341273,7.997039881791679,19.500913056703446,7.243705760627495,3.874037982267371,15.948370731398015,5.725937087798076,14.115136390691134,0.43484844417133406,15.967888878539899,4.923293528879622,1.8590872236765632,4.374665257432926,8.12646499067618,6.482974856523507,8.084759540161155,9.221912264469392,14.40052098261216,0.9110465356818542,10.29021058421121,9.598911502730285,0.9493903661237546,17.515607623336432,15.182286074907942,16.17408172132425,0.9423046955114911,17.692486890777317,11.459670667142493,7.55139296873923,17.227282092135113,16.53329326718997,19.202252728522204,19.568287670562007,7.223515067383093,18.02271748513709,19.07580685149551,0.5810782767370748,5.9857297932243325,7.235925978664448,2.912397658947472,14.265235336155513,5.404321818067128,19.475078196249974,3.5085217584523543,18.955670101128952,11.509421000448272,8.55940064086596,11.840122213047657,18.078546859488284,2.6644637614552114,10.390045225091331,2.620287889241699,2.1697870241027672,0.7474470575777303,9.837875157848984,11.245137350953915,16.75017218697231,19.001291904061063,4.901923750592045,4.2561850510840715,3.310866732089761,9.171888185777313,14.539106587933652,11.98209811481398,12.037850695080818,4.050460798381712,17.833824075844042,16.163182772217205,14.925716074025503,5.356721400716999,7.2932790704153305,12.558692225144705,10.574386747522123,6.293915695405565,19.943638832864295,15.612010675486117,5.451847947766684,11.44627216832951,8.316638907861442,19.703536051765866,10.071581426548924,4.469913146648232,8.47635160948676,0.7075339044850493,5.22672813229085,7.857080893423096,13.019350231113389,5.391744977591939,7.747473011545107,8.947511636314411,10.392985621188657,13.136857069863495,18.01467247098651,18.52113152257119,19.644909929440814,6.524543183186635,4.657944945967607,0.29332523624155726,19.56895183534047,16.502685285677863,18.121137084640623,15.19718036242741,8.451834395331556,17.040489339775796,13.696918400628464,16.88456977495477,9.331287304671157,19.033552048218,12.320466639808814,11.984104037409068,4.227594094263369,8.563096605169251,9.92594177997836,17.483267637349073,9.00053668248546,3.3559665855295195,8.0696264577906,2.045999327817505,8.497832597513995,4.494936012509667,14.814710665549743,18.34594268051734,3.713802811562976,5.854168917270046,18.035914995461976,0.37157316434530685,1.194153787286374,4.463439723768805,16.885962106046918,3.4306752900807025,7.6772359267626245,7.805638235747474,9.470896478577199,9.981825492966916,8.915519479418847,9.83221360015429,5.091881389595487,19.84181522450871,7.153577796651724,19.027481886375618,15.205895708757971,3.0612318126436344,10.895022298466802,16.913116429839814,4.334050182521039,6.942381292834701,8.163447060951427,12.584621330403913,2.0930945319701744,10.67721266226997,18.624243081860058,6.83440962721134,3.546948019277707,14.183385840648576,1.068281086134868,14.51729945750143,16.684671623521314,5.721440587340503,8.350268450730432,1.6755718709062206,3.334241517336345,0.846711756098224,10.058788369885775,12.3040154054442,11.984589572226948,9.634037330234957,13.845551887701447,18.427136743160844,10.067968256271143,19.389087770951473,16.83870140696843,14.133784621758343,3.2272262656258155,8.261850290093196,14.416436053662022,12.126245705802013,3.848844458632086]}
},{}],41:[function(require,module,exports){
module.exports={"expected":[0.39856694915474095,-5.595872866711832,-2.1114033175040263,-1.548865330783379,-2.0240271534323777,-2.86449896853422,-1.9961923170595055,-1.4884112444616782,-2.118524639115708,-5.409505761053716,-1.7502193485451318,-2.294926074351648,-3.168973259662365,-2.927224531110733,-4.1434107333787,-2.85215449372041,-1.4768582797768568,-1.4620756450640606,-1.3230627705208722,-1.7063314396967302,-0.8954039586326186,-1.9898021480146926,-2.198004039853223,-1.7578813540525005,-2.4647975429219087,-1.50873568052068,-1.3088659749627327,-2.0249865396336437,-2.437291399733147,-4.8422822184287755,-4.144344134600627,-2.4499242665603975,-2.5064443972158257,-2.9089413143234415,-3.5326639278506478,-2.9443068472342797,-2.7997854436450065,-2.529911118093976,-4.625575891649513,-2.329380011499925,-2.0873313501352535,-2.50839952777425,-2.3796429880486976,-2.5199111025952927,-1.1208665697770535,-1.2765943497687884,-2.264287608455704,-3.75936430124784,-3.829921073297276,-0.9394387112529496,-3.1292483501942323,-2.286043849070603,0.2739619035616813,-0.9836125181223252,-2.3905956173137404,-2.1778187981518795,-2.0549542264673386,-2.967396991769064,-0.7583730089246928,-3.028843265220226,-3.0800091452498806,-1.640957546069652,-2.223767897951577,-2.2633990398462043,-1.9498177921985484,1.0973144930561542,-1.6510710626667393,-1.5579974602047681,-3.8028981514331592,-2.6635842385513664,1.672667412707112,-1.9017026229543932,-2.7316026519147147,-2.0934637270320486,-2.2221814314043553,-4.832485642322208,-1.7275665504675772,-4.161397260227225,-2.6518989162048854,-2.8352999313630125,-1.4788284706810764,-2.8254632672906794,-3.0171064694555736,-2.238176140464437,-6.156601068146714,-2.1852411798823543,-2.9437321481771965,-1.5002228920247473,-2.9986130038412266,-2.118261641922548,-1.7281190267784707,-1.8852168885785197,-2.3104698956816465,-1.963029926531836,-6.078319435715121,-2.985578314476997,-6.2240968811573705,-2.0377438875544907,-2.1565093050207365,-2.7938473812562923,-1.7392626309080956,-3.160578679138,-2.4980582810162044,-3.653252133117763,-2.1984930200571196,-1.5516060355544004,-1.5395818305698397,-3.8373697716004243,1.4406535343950602,-3.023748012965045,-2.557617274763264,-6.214594154341799,-2.4524696070490966,-2.7611338426974514,-1.3746163845769466,-2.672858778523713,-3.9420852216253377,-1.4567964436434373,-3.818631162482856,-0.9695841494907922,-0.5048663492808805,-3.5356513822771736,-2.7371750042192446,-2.129890939942933,-2.2792329366517774,-1.642375058654374,-1.9498761803204883,-1.8065723512539296,-2.289392102885064,-2.1879330922339233,-1.1652983704064344,-3.9423138913545546,-0.5043090158775811,-1.9589670027312118,-1.6959040426383631,-1.5448992361293357,-0.8183511872604747,-3.1131366164844696,-1.7712488251617835,-1.915947403605852,-2.188795217853562,-1.3080270669974008,-1.933834141268851,-2.2605097530209792,-2.260962320413401,-1.2549053897154117,-3.010727753717737,-2.527588729377482,-1.5173477117692913,-0.7988565659360747,-1.4564442179271317,-5.185772966650234,-2.6851915012641063,-2.5313727396068577,-1.926670651946017,-2.620743816279018,-1.35868644860858,-1.6613775988416746,-5.299156765192238,-1.8844300760428534,-2.430670521937226,-2.7212554795466426,-1.929036548161287,-2.320873625116139,-2.59404780349049,-2.1611744793222867,-1.1768897507311475,-0.9778921160288863,0.24823927406678115,-1.5240952032758925,-1.8053454702330223,-3.436621672021581,-1.5434498239727237,-1.6850357060186754,-2.488442887240213,-2.970307249526767,-3.4492800928089804,-1.4019409591991494,-2.2238679925194806,-2.2713793673530245,-1.9330289521236277,-2.7116763838650506,-3.4305479719239376,-2.4490026238258933,-0.3364347677766498,-1.5430934852463032,-3.420266266214959,-2.3333636502654143,-2.85408639203104,-3.241653958149518,-3.1471767639402395,-2.7247784388121263,-0.5569482128726374,-2.612458419675264,-2.391229447492571,-3.19877266122461,1.5400520413735568,-4.890477754861619,-2.371617136182167,-0.8579026658657611,-1.7613700887190666,-4.328129313117936,-1.9362674870731025,-1.9345289306682276,-0.860341909731268,-1.7561751600032984,-3.6792025125551007,-2.8605642351495293,-2.640223111755366,-2.7184212898346716,-2.2430507107477426,-0.8125863310747149,-3.8515217304140656,-2.575281249059049,-3.0315140931849607,-1.528428091137298,-4.762845937734134,-2.776042688823124,-4.32584538731795,-1.394277040978781,0.016774187817749652,-2.8642443939567928,-0.5691651988578839,-2.5515222194998146,-2.0196833365926095,-2.533524221871542,-3.6303052778988816,-3.0898292732550043,-3.0964825533823697,-1.2981012744652853,-3.3800375412654486,-3.1709558098678965,-1.314968751191816,-1.4491161524153937,-1.021638438171319,-3.5890823289429385,-2.3731203262619047,-2.1889652993651025,-2.2824677231501203,-3.0096108148022243,-3.396576310848817,-1.7646582922647884,-3.0634137683734144,-3.782539646889712,0.14241588961336707,-3.237418218204328,-2.3943984075533686,-2.2784326585695047,-2.1254092551738903,-1.0629090735592064,-2.993629923402389,-2.6299659398619046,-1.5659813775568936,-3.4848085925994874,-2.862843592128059,-2.479635008561643,0.17155978388649082,-1.4387862331406909,-1.830597703077291,-0.5298576856853333,-0.5225912946833956,1.2255898208344274,-2.210775481225367,-2.7656599414295457,-1.7001495373255675,0.6390726408853209,-2.3371420034513997,0.06485714326147475,-1.206453775250841,-3.255117883237176,-2.1436625493832784,-2.633920058576456,-2.212648782352382,-3.35525382766932,-3.050324930797951,-1.8749207319693162,-0.7732561810549082,-2.7403054010815646,-2.103202939542785,-6.195787886117885,-1.504456450581881,-2.0280727187862984,-2.0562271050743237,-2.961549726057462,-2.631491056067359,-2.6280334494827855,-0.5186618022982242,-4.348252516505541,-1.2313414099981557,-2.095784445117532,-2.2094919898771295,-6.111373381581133,-0.007477330475516083,-1.4328937107702973,-1.9094089231534603,-1.8311637680745065,-1.3625807049288328,-3.138370731184127,-2.3885020234245236,-2.397366544026223,2.5787891082596426,-2.3861205897642956,-5.172275118095186,-2.940599918766777,-1.1212840442196501,-2.814018629360177,-0.45244145882846276,-3.9727676846393125,-1.9650156396115368,-0.8353018141156072,-0.3421136714754983,-1.262165910220193,-3.4660590089688834,-3.4696091132432914,-2.166016287854462,-1.1778982867977923,-0.38716781644615855,-1.3867563279053272,-2.6921653975454727,-2.2175001888530224,-2.458328469380179,-1.3212734487601079,-2.47081531374499,-2.4978894391408843,-2.434070349547,-3.169709560941845,-1.3297246036053498,-1.5611835078336247,-3.4415347942265173,-1.303818581057841,-0.2279768255110019,0.5327293147092598,-1.8752808540609465,-2.7992571173426866,-4.810465165504331,-0.9097004550692844,-2.6006093399781385,-2.440122035879105,-2.3696862647477914,-2.6825935846915674,-4.07208111761893,-1.1303238957312516,-0.8948015536682313,2.0919183359232276,-2.010445803180529,-2.150339763189294,-1.2374294953042444,-2.2994331299696484,-2.469945115541619,-0.6752080968479931,-0.8884284606349346,-3.2634504697080104,-5.832421690637346,-2.8658740964328957,-2.1310369417664132,-2.304621601877881,-2.943493716110823,-2.4698501947860034,-2.527319219577093,-1.2443322496222256,3.4098512732996498,-1.8282433736210462,-2.5816549759241343,-4.038530492589783,-2.2866903943606887,-1.3960459057923766,-1.5679520637689561,-5.521768618552714,-0.7932717614871599,-0.7025756924958084,-1.557812058528697,-3.0625274954444395,-2.4781774722275367,-2.554391004989816,-3.9396077461809202,-1.0002706689680643,-3.773534812355335,-3.3936518176463784,-1.7957827198970984,-2.4786140184918,-1.7732091102764245,-0.7686643654116541,-4.545327361971246,-2.5849394303978555,-2.0320557633950664,-6.848546709644841,-3.2521978794427127,-1.260216787172571,-3.5876093479850866,-2.003488422214892,-0.5772902182869565,-2.371518289371789,-1.9829475775101872,-1.7747123416856174,-2.2621756971384763,-1.267474377622144,-1.1979778623655228,-1.8262839664851656,-2.876650414471928,-1.9003380301955035,-3.422115677196325,-2.1955241125994234,-0.5887581408940129,-0.9250075425602834,-1.4627530819209131,-2.2494534734015685,-2.7282085783710843,-2.191289060153695,-2.688777290995421,-2.690789784992659,-0.5423574644308438,-2.2301332730471315,-5.049120261441068,-4.276500796394469,-2.0285714642736155,-2.0324413079010757,-2.8368024563150733,-3.791086450479406,0.09361702876993754,0.3016584339506128,-2.1209588544416804,-1.7261220010741156,-2.556087617054527,1.7808940714109671,-0.2958976421649799,-1.2230564191838538,-3.721172477243469,-1.7149441267605208,-1.3684157682498825,-1.9883990184321023,-2.324595566744799,-1.720135397777241,-4.8130861086562,-1.5285846720478493,-1.7938338405166108,-2.749978240903791,-1.9599910356337746,-3.822882500315491,-2.21416952221317,-1.9500464889570575,-3.2619037509235453,-3.404708217038231,-3.6695047597934627,-1.8355481649117311,-3.146196942842838,-1.5493583570079394,0.8676477916016019,-1.2388566726290926,-2.555802145161452,-2.929780484161883,-1.9283438902835477,-0.4706532066163227,-4.01676392549076,-2.334173977506607,-4.203024017965624,-3.1234463012519216,-2.393185746415456,0.15978053645737475,-5.1256847488677115,-2.291319009186884,-3.525565744891462,-0.8301237454174206,-4.083760170786942,-3.1622389584778814,-0.2537885989371223,-2.460402089087742,-1.5567694466138737,-3.1009661990073014,-1.7393364593580491,-1.6454402224102402,-0.2670502913038448,-1.5298144497043644,-2.328605243219239,-3.8837544730081803,-1.5353849538170807,-2.4080785606936415,-1.0742567079697667,-2.1323958606496687,-2.2886718918460027,-2.3268139688582608,-1.9034119125205125,-2.2805371809384822,-1.8068338383211036,-2.3717938487769095,-2.019766983123751,-3.7552066008533656,-1.72877856591546,-1.7767685283734282,-5.579491905428325,-2.4238860984505446,-2.7993973139109554,-1.9638741731012417,-3.028250358168506,-3.972470494793002,0.03859911453789527,-4.205052857253318,-3.3063716898033784,-3.038018447163199,-1.808532664680096,-2.6568625683988407,-3.17370755598657,-3.5111848546215163,-2.79797108883067,-1.8596466547742472,-2.981422453943397,-2.4668250923408963,-2.738269852289187,-2.2443529000217537,-2.187249782767806,-2.165265150349993,-2.733800175915648,-1.5944699847720214,-3.17714463696755,-5.963054275072964,-1.6450208862576532,-2.2569294635850943,-2.9824265226985567,-1.789964084585855,-2.0340658341522944,-2.8822013255188237,-5.141052620200077,-2.052219525012759,-1.1945214763984244,-2.3576797530159057,-1.2892500968290599,-2.6846246758301184,-2.500959152982146,-0.671537963549795,-2.106238453357924,-2.8486464425988753,-2.2007015442579916,-2.7619145848168905,-3.644731232845112,-0.5898999138213766,-2.1595904170084803,-2.362601688424311,-4.00085827640065,-1.7265489876768068,-2.0184100210755527,-1.2245366656845076,-2.2071817029743976,-0.4835342798412213,-2.617482068499836,-2.0426973929464234,-1.7491105619225276,-1.2044909569588107,-2.3851129893968688,-2.683971891333875,-1.0438289321075036,-2.6918462658600832,-3.892154033176998,-2.5339917827151637,-4.216000545610849,-2.2206969148608113,-2.9333877670395148,-2.471920605645729,-4.240629451953245,-1.4650897299523102,-4.325653105217079,-2.6963066895245897,-3.324792871711351,-1.683647078020945,-2.26560589203218,-2.5809132074462893,-2.352854187040694,-2.6819686086596466,-4.271017851378932,-3.6703923731170995,-1.9547555077112424,-1.8110659339243527,-3.688157587102056,-1.7155930829589896,-2.831758584036089,-1.4385124465508845,-2.8944063979161267,-3.022501765721168,-1.989701981982815,-0.6201331179672881,-2.3973308563458007,-2.185607455138733,-2.7508365407504884,-4.547810884898615,-1.522270685912653,-2.288884507961117,-2.569113788082755,-2.6360811213796653,-2.303663827613047,-2.457288596545017,-2.81957686830907,-5.4252246608506285,-2.240448251245726,-4.807707153402895,-3.022643098467835,-3.7710211539875718,-2.1995117085069213,-2.153928310515502,-2.3740146782954796,-2.4622864026976297,-3.0365791518470786,-1.2183401440521344,-3.0649630270595556,-3.3781068933176623,-3.2666133002555946,-1.441448974317226,-1.4924926759143917,-1.8156599822618347,-1.4462887915367295,-0.8203826520219568,-1.3841608248444257,-0.40986120362193845,-0.5862744137515776,-2.9409423779396864,-2.252291158711183,-0.1752310290353458,-2.111052310043103,-0.7934187333413052,-3.0374992301460937,-1.3437884967437859,-1.7749005265405515,-2.1754609185440925,-2.7485902165060883,-2.444538248685797,-2.23905598492424,-2.667358064939304,-2.3598237934510107,-2.451363732014906,-2.6986341024468117,-4.450728680741683,-2.376702419629093,-0.7838259762795687,-0.9767076345978782,-1.228552358993824,-1.8253454297709717,-1.0832953602048012,-1.3941930203358424,-2.721718544519586,-2.537697423304206,-0.7664823310800764,-2.1268666829271266,-2.7127139364056223,-1.1997721002470798,-2.3538802122478035,-0.923979720454535,-0.838754102359794,-2.235335739817961,-3.1520594026219033,-2.2674537993668302,-4.104399227998375,-2.3127051923929165,-0.6748362859559544,-1.913852125082573,-1.195590332394035,-4.506751845122434,-3.137271864535022,-1.4806191275003362,-2.266496946821011,-2.9430556653973996,-2.1612401355207465,-2.786150201074331,-0.946182785194116,-2.133944284013417,-2.0455731677868667,-3.5535149574978573,-2.4288730337338964,-2.037939433047788,-2.502120922051648,-4.689863969097379,-2.8691660376602846,-2.073471318617421,-3.4768394338513215,-2.946682522975964,-5.214405769587537,-3.8461642937965745,-3.029072502292042,-3.4846160423695105,-1.5534130716675958,-2.3267042842356753,-3.107928136268792,-1.8759237284582746,0.8685223475340953,-2.2251403259879843,-1.8346607732481246,-2.6966345394107805,-2.069508236894801,-2.9728856372368604,-1.4455090982865053,-2.3175122010032956,-3.1702742692227197,-0.6733868732467947,-2.5283744178184038,-4.098782870335256,-4.210916874205742,-3.6031258872137277,-1.698549700948394,-3.2523600964355706,-2.9958946121805887,-2.9606481265645153,-0.5004448120518985,-1.390671271675145,-1.5042546761189066,2.320712911528197,0.2053184459025946,-2.2807343563901195,-2.732597769689412,-1.7390310025832907,-2.299365902147569,-2.0453477316660065,-3.186966125849939,-2.995032989124179,-2.4882395946071036,-1.4381522962882753,-5.364371863112449,-0.0900081639843084,2.027049245232008,-2.4290441008150463,-1.0414596289951277,0.5389434800760291,-1.5763570149157398,-2.642839908190408,-2.7435830157873413,-2.0197246763871677,-2.462601620758721,-2.1804892866157592,-2.365895281372262,-2.0735569015738466,-3.058098487398609,-2.339907421681863,0.2509864593399229,-4.439557640372318,0.7084642040794157,-1.1415273697290138,-1.6114705491716717,-1.3798066608003279,-2.2581235873813394,1.3038546373963467,-2.1419002678622667,-0.9434055261288546,-4.487656081941967,-0.9401928777406441,-2.12774018228834,-5.36673158333592,-1.3083501313064752,-2.659430983044148,-4.715655100796684,-0.4813367174145699,-3.885596858576127,-3.7420213348810023,-2.7470354648495747,-1.5827583196806592,-2.2679888389558953,-2.4947790726512835,-1.1245262299718826,-2.456154059651708,-2.394549259308139,-3.3211502085992444,0.7834458254869214,-2.4554243392966186,-2.6414335559844804,-2.5361340653953817,-2.5252382153073802,-1.5581954373563915,-0.8859622125002081,-3.4142261014252577,-2.4856880110274875,-2.1925108278489716,0.9864898506833053,-5.124374764927501,-3.185411143412473,-4.46422781056567,-1.6837462674798003,-3.0329079170465323,0.8142343971470289,-2.493044314946924,-2.058949936820103,-2.3115532455521013,-3.071969467062784,-1.7414388480332232,-4.056190840878523,-2.5753224081574,-1.998954328133931,-0.91517969719136,-2.4839619139219336,-2.3458391484402883,-1.6201744716969233,-2.306288732874497,-2.0874562628095132,-3.6231727659702213,-2.582721210626439,-2.161803489133357,-0.7576148416203673,-1.1252823110454853,-2.113997875785504,-2.0988009646964247,-5.680733536236642,0.9416646700108038,-2.0768374776873175,-2.3323838036285585,0.48259652735088565,-3.8404226526648872,-1.8776041632577865,-1.2947468984165384,-2.031869093692972,-1.8516541293848798,-1.6609739773279846,-2.374107944949806,-2.2971692107363277,-1.79371617664492,-5.143560219757176,-5.567719935873578,-2.2937347389439906,-2.113079936027893,-2.6286385370598353,-3.404953757634989,-7.617093482012332,-6.054160391236284,-2.3061773980111355,-4.784852663680076,-3.756646668847572,-2.7245229565270086,-2.014645159120777,-3.7832737483975953,-1.3314743708707797,-1.6037710175683906,-1.6576594857284834,-4.503708010658227,0.6571443192582389,-1.5890433875659329,-4.062759487787359,-2.49075838241456,-2.9819569720151753,0.03647386374565164,-2.199853448505031,-0.35675982631552516,-0.053503829112886266,-2.137881274391779,-4.703215917489951,-4.420443160906304,-0.4325738730605481,-3.2304847745779974,-2.41589464611409,-4.7779486300529515,-4.643528884285872,-3.2537055335330787,1.490694917421632,-2.336023572075703,-0.802669687988702,-1.6463641173803183,-2.314067520975218,-1.8324433557449542,-2.2120495299310594,-1.8503774911633726,-3.6274222534669764,-3.12937668292503,-2.7998483150712463,-2.6368959378239163,-3.185273487536561,-2.2528743750196356,1.2491114511296417,-2.589583438291406,-1.1702321282344237,-1.8771561475481922,-3.8606272358772307,-3.065869619974584,-2.0142495038150985,-0.7767029836217452,-2.4298224428164614,-2.7577445753444487,-3.1831657458232465,-1.641343178277641,-5.500075354702948,0.6183962067428803,-2.311060681466051,-2.927432412373926,-2.2738071864527885,-1.2894680135458083,-2.2616711158705463,-2.981604517888146,-2.819202120612177,-4.3328839784173665,-2.130464015467004,1.3527191540887389,-1.9117799624361367,1.456695086934605,-2.0373871352321222,-4.611299832382963,-2.8780123213110747,0.245672035325758,-2.746136946488593,-2.8545344869150013,-0.8916928191928094,-2.2936453444312592,-2.613158860680218,-0.6972045774571277,-2.1054333406164636,-1.473498727845835,-2.136114898403012,-2.8398850942153886,-2.4495949232178327,-2.9897709218031103,-1.6382208549622197,-3.2187134162997135,-2.281097433007903,-0.786990022046759,-0.8664304484345363,-3.322841550222065,-1.6695150870140347,-2.2894523760522127,-3.368638268402824,-1.4459494029837392,-1.4159490998676307,-4.986422859506824,-1.8265563703847436,-2.5624149084437193,-1.62667909632572,-2.1090094983275125,-2.024711923347384,-1.0299750594592096,-2.7004240715391785,-4.419214078598674,0.5834531497683331,-1.763572980405099,-1.2864914567421835,-1.9180450390161186,-1.3446653478102373,-2.7617876579942333,-2.2990732236202738,-1.5447122530126371,-2.5609385912093177,-3.290390809794869,-0.27070581812950284,-1.9990150267268119,-4.168917210655563,-1.7602883344285636,-2.327001347293481,-1.6000472244870134,-2.5639547207839577,-2.6309931238223867,0.9034660222176549,-2.104822151882231,-1.9903518320003386,-1.8397299194150531,-2.4120334689920075,-2.0566558101003385,-0.23621910616817646,-2.3437539927655084,-3.2673574617531407,0.734209373254567,-2.1063588948653793,-1.8033239988432666,0.836094753461431,-5.502309157501249,-2.963662433722325,-1.0711170927128708,-0.6332412933882834,-2.0491869378935177,-0.8817300548024292,-2.677704574627397,-2.3798376643334174,-4.800153257608497,-3.5626028413754125,-3.1058515051282316,-2.717157463490481,-0.21385238843250856,-1.6739383882218837,-0.3816137115184583,-6.577526841785967,-1.538020495993319,-2.7271049484020367,-1.906176521952598,-2.8133425582444413,-2.377120952379186,-1.1160010095861608,-2.258227674649494,-3.3716401154088276,-0.33540391720030494,-2.936135120177923,-2.584734104067706,-2.79847489990274,-2.4852672990954194,-2.7565853343449875,-3.059462729950531,-2.3615992589106765,-1.0018414864765828,-0.23740382275776756,-1.74505660217312,-2.6763554297558563,-2.8197306357842686,-1.716455351902907,-1.9549622040418215,-3.990713315324402,-1.1433206399502938,-4.003637324763283,-4.006762035086406,-4.17630981671732,-1.7099670505125966,-2.5720973185172333,-4.917610776203626,-0.747151804040094,-2.796372326056402,-2.657499667868753],"c":[14.187602381244727,4.58359752047535,10.582908910828777,11.624167506491382,4.775765791735476,8.069036667014702,5.963057357219407,12.729157975180536,24.758324575904957,31.73574080739695,12.397337202726332,14.023162290293687,28.67099504292232,15.58881060671341,18.480768091883366,11.660548915892985,10.08282960029021,17.407162335274954,4.896484253629911,16.465552500646183,20.912715367468234,22.772855062194218,22.068587960762308,22.4127378204631,9.090150589121263,7.407034467024356,7.697806705090008,10.07411790501956,13.431103726741945,26.57933920034087,22.611354683085636,18.98397602244816,19.374591875769703,7.11510432708587,10.495801099120206,12.361644061747985,3.0084441214514746,26.305527155163496,7.70326644192049,14.537548673014733,16.080476584435186,14.920256094851892,2.556912931878241,15.33954062239048,6.064168071696836,19.290452300443327,22.308760419169992,10.934287565114634,18.629868088558638,4.075417357547385,12.193335103277677,29.905083025488807,18.43257942957629,18.698295138610817,18.373081342893485,11.412579241177786,10.864089033603229,22.44908512176853,10.439656580536935,15.438643104459507,21.09501029822323,10.426855326057899,29.061694648247833,28.14508717985538,15.949398082415712,14.12535018833193,19.003718458181428,14.840345031380538,3.2679508589788075,12.717259668318881,18.507592027350874,17.408468605485037,8.397755544987099,7.850189299563508,11.104131082657439,23.42583727951905,14.159756325504453,6.282779393182587,8.27372762617464,27.00460062626306,9.376110100162022,15.694066420223404,20.124999108394793,15.320435029742288,11.879924856925186,18.337877078209537,13.672118523991925,21.636790987702756,25.807933760222017,10.53576031103037,3.791445277545164,15.489685658959916,16.243458500164536,15.293858421517811,30.382753367861294,26.55656096736616,12.901588481152952,16.07190376702295,11.045609168916119,14.60013439485067,4.321436700017356,22.605573507172473,27.311099606926298,10.622910117908546,21.07237070006972,12.22401969113639,17.72099731728666,1.4664536015377623,13.547390374534276,21.036860835919022,16.00594604928208,23.79026799991378,20.220594444055397,25.023919542731427,13.282259465413148,19.22800290795287,10.08119905551182,20.058743091422496,22.360481140408467,10.888503300052644,4.308176724857859,11.536591464096194,6.700950009560614,14.057660311669146,30.25649243821059,20.71316763234746,20.071992600625947,21.5851536109593,18.787913477393925,23.917439388062892,13.309968661703229,14.135841939769925,14.133735804383424,22.435548464875666,15.674899700495702,10.062701886841221,12.10493027114154,15.35683977815572,8.649522653338586,6.507563944907997,9.957591072111365,11.06327968768023,13.92732356573349,20.624742304969203,5.307882210852281,9.695257605992262,16.936248663571867,24.741197767711917,18.467746605581944,17.903434176278864,16.102112789565155,15.63226422250494,19.655295588067133,2.356489486496534,8.404668739199824,21.33323891813299,12.394708592149572,12.492617347739971,27.924701655481684,12.393789028981601,12.267376614233466,20.703315292575827,16.99554416780345,14.257274199040047,16.66287704347505,2.93105245856039,1.747457654033978,8.878934748859876,0.8556482895217211,7.102357822531106,15.680820440624178,21.90063337231252,20.91674340842613,4.3826861654965565,21.548990145444698,7.402760207845666,12.509044863983645,7.992744326063878,23.302574278307397,11.802129265773264,10.302622865941508,14.891997059938548,15.384708412623288,7.9572594713249485,12.424081770645977,11.413004528185384,11.697218220655262,8.583721579586562,8.283753384672245,11.874150740604431,20.464975736290196,9.33967700101006,6.7128485578230865,5.605957618906012,29.39168789281526,5.097725578313225,8.745664818620869,16.305444383405796,10.022755315321943,17.567955776238215,17.17856943632853,25.848400581328924,12.352805588500058,15.90952407065831,8.548710277686375,27.599378359793462,11.802060033042045,33.45511392952517,15.818256908782686,9.00604918710878,8.562682918743725,7.845752343787884,22.290036222623513,14.990606426975704,7.8483300958937345,25.404051316882786,10.751697946615787,12.566920535374297,9.287007847398684,18.290386808277976,12.784622946149328,27.134473445866206,4.516512126355533,29.330843853834153,20.265713426453893,25.13102286999912,17.524703911727343,20.100459678267026,27.95433164839839,6.570491434358332,23.78771389912333,2.5133071797686943,19.48864383859055,4.504948441512419,22.351046250808906,9.82446121489685,16.19274748869846,24.821641854185643,16.84028973585278,27.34211745169896,24.310361115438553,18.671486106068876,17.260339788529087,17.14826439536214,7.420508636515829,16.130158525996542,11.456991443215797,12.40135537175208,21.822837800574213,6.139967917883214,15.838276329600037,15.441926335171122,11.616211610631833,33.54881791373573,15.996816672291711,13.475222326443218,11.392973602380009,8.495879773433032,18.25407898496699,20.390205529398187,11.04617968978966,4.2279550905699494,12.276320871344161,15.964995742703707,3.4980776328797547,10.726766499459508,10.831333787023876,17.396035643007224,10.210229445323552,10.724332825099,17.630119239409268,10.69078907764057,35.81933753346069,6.3894105240115735,17.55708934505384,14.196315993076661,13.893966541849267,16.612600472715528,23.452862671603956,4.5441027910996645,19.468543908844516,6.1035537370912305,14.462645488163412,24.54730376769843,28.1718570407567,18.565505573434724,16.77629615717181,23.0523074457161,1.9592431156589156,13.902397678308706,21.343745812011026,10.602508898179071,18.285640419218343,17.789549894134005,5.021543730242527,19.576187246346855,10.119182052515823,14.997857447128876,32.70203669759648,17.934903585799024,9.303756887809698,27.588799906124784,7.0581448320893125,17.435656956774967,11.014202655432456,29.76520982192237,14.997016166878005,19.728814585732348,17.234522759873887,18.15749215652885,16.44428986019351,18.11267828539431,24.404728243849437,4.85116923450482,17.515863981638663,18.3926590094683,12.503221859709871,1.643203852495355,17.395709552478856,22.945127544066413,18.657913572131218,8.44077154699258,4.019368018413105,25.77312715821097,21.31804381505265,24.210605068487162,14.130646110297157,8.326473862826155,23.444872698438484,18.26216262554515,2.5847769924386688,7.177888344556804,22.977409097624893,9.363637437133065,23.535565085639718,1.128818642497357,15.33030209600424,17.918619658815565,11.343096967760962,24.06022194924992,14.64634138729708,18.541104663429856,10.800737036522747,2.9578549691604645,19.71477267599498,22.744045137736453,5.417017355816185,9.416042899436949,13.443389165081225,1.4616124490932154,4.960755484161154,6.7314510220983195,26.647204614751494,14.632531728986883,24.844532951793063,19.847923163528602,5.330424717271249,17.427539064169252,17.314046843535127,18.357664424479488,1.2100120727453596,3.0944095408352688,28.741584742078224,13.987003330035838,4.333061602138192,12.641965095375955,17.450894219422132,31.193641573739747,15.045329957959614,17.59337108348359,17.858754693650503,19.168114682830797,31.604288969382424,7.4169653459549405,17.69883294295261,3.2612875872023945,31.000537609463557,20.560253629384604,8.459198021758423,27.044693576593126,3.5805479339567015,12.704045912780014,23.346419528102903,7.030937886272402,15.064667054749567,3.4057888198204016,20.186846372307954,3.8868105741980576,7.801993708448172,6.459307177850153,17.016464511616892,6.947945604534812,21.627284713992832,22.367668786944705,22.41217046692006,15.413956159846464,16.198488677845894,9.754094063446303,15.194384270696109,12.698219052207786,21.159562150267817,16.144825742400062,6.249739420663242,20.197470609727368,18.164754602346072,30.502120556175846,13.238041191573691,9.5292355053274,25.499631820593773,19.959584483494243,4.782595587781595,22.832856413163682,8.5016646390395,17.159135140531063,10.012834710521576,17.503494377059997,19.703581410396122,18.69618853720698,3.962998043488716,13.323638330048462,10.433016449058455,22.15445366375851,18.754818425668944,17.275546341229145,16.388248641056173,6.947898097639163,20.112909190567258,11.203617712125947,15.572733285383752,8.74254009471743,22.504359450868037,7.9082146961618776,18.59662925645522,10.275699218405096,9.90791375935082,27.677998306486742,23.23353038043496,23.43028080100131,16.0029629915388,14.328064804720716,26.05806350321101,15.222516454564719,4.4911563884071874,23.31662536276437,13.681412712500816,23.929762913964698,2.082971984100295,6.420237186917849,21.688142089788705,14.680439710818076,23.16874179258039,14.735998812048948,3.759233937224688,28.839347572464312,7.082336479608146,12.40444157041047,20.124761692621185,0.7298997201457226,12.018642329356744,10.746749398556872,16.33556099009942,10.876696996279415,6.887561010305324,19.674739356740062,14.05459356440108,13.524140351474525,19.85557056738994,23.271555450416482,6.327862742230795,13.593329035590807,9.420066658378072,16.22796864349756,21.121476349008894,11.302218741007772,11.04091331592343,12.487032162189276,8.091197063734661,24.310217304556033,22.880441892812705,10.248858518614671,26.828051365035368,7.726181008308888,9.416048174324201,30.149264997532008,23.415200647582907,16.740922376942482,19.258044197553417,19.002204088755704,9.222017075873339,20.31990090425728,15.367594389150042,23.649844046954854,14.177240947608155,13.690784606829592,1.518345920915178,9.444946117373298,24.338634549006194,5.02144690944934,9.760000335846264,16.839150567018798,12.939371537778193,22.616433852443556,21.27880061716975,5.519186310131981,27.515370126150515,28.5433552127728,13.341603179762885,19.52982750098696,11.129957757760764,27.742179177856155,34.123083903720776,17.369903670210462,17.829456088458663,17.714205668305947,14.397748311077484,5.598695305327498,15.566694331741957,21.840681475619878,19.142962272953863,14.185648884770751,22.79101454937304,15.091700765872892,13.972432192148432,31.749388278293544,3.452146026531825,25.84685572150228,5.25894337505819,7.518672072240363,16.606559063111302,9.762635296900005,7.246765789020812,21.15568941799901,25.649314763500858,13.890329792097264,16.01563360955222,7.840507056592763,10.584808872794719,3.38481137692896,12.707088708219768,7.4526721056285075,26.186558459873282,20.785879641717226,16.841068680226346,20.513097559748847,13.84977567963086,20.79827870886048,25.42103477036248,9.60122464382231,9.457398910938686,12.237005634981294,7.381725432816937,8.360204104044286,9.864124684548639,31.651852003053506,19.765199388272034,22.584588009696454,20.620571639526577,8.400009473363768,12.334101089755931,14.28251863778414,21.025601774513937,2.0228630378123555,9.677086801132402,15.842607037196366,19.994020219283563,4.478455435966859,15.5177538423773,9.76732589385731,19.166593360226134,5.585174092887207,13.187814761794577,4.839945077323024,12.583649544825192,14.97153637943866,21.514332990200487,8.611550630831859,16.53578929533909,15.124141865447186,22.221781392512167,24.864851669060066,1.1368863613667946,15.344882168162066,13.640453317332854,27.439863547228285,24.56511276282392,5.17748664888876,30.02048206375507,22.558098790349494,23.008759376577057,22.007108643298665,25.661200524596644,8.213896760617363,18.109553413991232,2.6106506945650714,9.596723391892795,17.495254225948404,15.531251141166738,21.093011957130553,14.948254562747621,3.520240447680979,8.015750030955115,22.6894932578182,21.037050807661902,23.55705294820869,2.947002637196806,19.406558287942282,2.543656266301492,9.279445366293158,10.487836310919688,11.07581485937193,14.850990275863817,15.705021103797492,19.33968871817842,13.600796645144603,11.24459416229581,1.683762545023358,18.12895990777323,19.325394396837197,22.517840260320284,12.16040311362443,17.368925867299268,13.656498280642369,15.455304908818848,15.691471820451957,11.7594415720137,29.49031001673707,4.565735887636748,17.05444646145213,27.04833172500124,13.331461910916866,4.72969025172507,18.20134371043572,19.059122210257758,9.542584491186776,1.574412956810981,8.41065779088535,6.433423128466858,4.965891782178511,12.24189813096481,19.838667760365023,2.7353881549204986,11.819309518818486,20.55251623610851,19.225842326798517,7.2175915573348455,10.366918580368658,19.2694616059321,1.844049048763128,17.593566016183992,9.704121575489964,7.587724735216496,13.41438335362293,17.513819864814472,21.11914146722353,12.254614155297103,17.588379735810154,14.226382101280116,8.193577182467735,2.0993703995980293,16.55526196481273,18.599712882875938,9.445158634040755,20.35536305661991,7.696796249198994,3.8883388623989266,15.072152354526713,8.42326237069912,16.039444763604553,17.78172978613439,12.734149980255964,14.684702904161224,8.525808049255275,22.420251974213024,6.979200245701783,20.791793435277462,18.069474168037537,12.71817196360658,18.134093447280268,22.6930321251689,19.167915862112903,16.23397686660432,4.949208649562573,17.82226505263553,9.181539935582418,20.752246768701482,23.404554858043483,35.03711542167641,16.022027356779812,19.59439840378269,15.622568664655455,23.23164142996636,14.25874231909547,31.088803620321862,21.77548379267694,11.410707335486741,8.634792265977062,11.07898163573926,7.585657884871934,11.008814149703035,13.66316393943055,0.4509263446851632,7.93780935040445,22.882971383502493,21.837542471517427,11.470785347206798,23.34751860087929,7.294533930469262,13.793737309150156,13.535300431390104,11.14567840941627,11.197580947802678,14.474801253922855,14.82456149221473,2.740182381436113,15.72969970395133,7.159214210245448,13.231497998236248,8.477501174361105,16.140925060406467,1.4073803807734873,21.4589197899612,14.850206300560462,17.476974934996377,11.4462677589547,6.788767748315857,22.91011196366274,19.72911347607204,17.00648171708055,11.368860180194009,9.453273221651596,24.39361083738625,12.393538734111177,17.93686521258024,9.44465530442529,7.0125385515712155,20.151642871575763,3.901329211256088,4.149503805783367,13.141179965737711,20.5369347378307,3.999258889736928,22.961540399258173,18.973241832563865,17.149301815756772,11.065806672242259,17.944209934271164,30.636080474334253,17.269684965906738,1.3609873874407996,30.088237385289933,24.72943030249855,18.241760222237076,15.00056001813158,21.526345577964562,6.5566008410929735,10.621852180564176,19.433841745729033,31.46211737470247,9.02938454289745,21.165439721010255,23.396414005740183,2.63596962366631,30.27166525998414,9.365099570567182,22.13156522307124,18.634699405506783,18.99203200985164,13.683124503678995,18.22536412983666,18.329838486125904,18.630629680675415,7.515756405893301,3.3162055992589106,14.96836959420536,26.510822648104725,7.403402330212772,19.760518801787832,27.36632559098372,5.194249203896854,9.036310729723471,8.55120125994808,19.29592222718946,9.846083691779308,19.840412156681392,17.671842568186804,15.253965770342,12.635920965829401,9.420426240563383,14.511126337927603,16.681686476829768,12.799579929035218,25.493494686309216,13.617630363625505,14.362880399075419,9.84282427303656,21.059767796464143,19.08336502273912,10.083542566434435,12.472370648084087,1.5291630433870933,11.908550697540305,10.617525525265505,16.798345968234422,25.99748419650134,9.773132175551876,15.356224094670342,8.15209100591861,17.273688424178424,19.58861647795647,12.57560534377661,18.96309946594141,32.30791743776774,8.431269295447935,12.08811089278963,9.536242413926145,14.8057124332503,20.623088881403632,11.630666500936233,2.698234010810753,10.714815917530377,23.4429548640161,10.668653695232287,12.505645699305404,23.362591727971797,9.766417373406702,14.32556933260941,19.481766190195344,26.416033262657457,12.89864184700898,9.081724961238884,10.968676952400278,29.03714055404208,6.497563603344565,16.417902745915985,7.843860122726167,19.13472763616559,4.394392306931879,7.177640753424831,25.5787392250689,18.613840538630974,17.289109381932843,4.089147069618959,13.188757437151391,11.064462415539351,14.679473604383213,11.200323562427613,22.16774590143199,6.675019420107384,13.72877730030164,24.590833309622084,11.395075117863762,3.9192573550681225,15.898521367100045,20.21507468511729,3.809797408631502,6.55511569709607,21.573828214314744,13.613198405777439,11.78736488129795,19.700265635536223,13.514868838698625,8.419405107360163,20.824228783117114,22.543912300197583,20.436484442293438,13.808911048707149,12.065059489929583,19.565700989025537,22.254262396775104,13.810626045288704,11.914557227255656,7.627091767441138,19.98573022363447,8.097949407873887,23.405732653341893,1.8479130060109545,23.952638818848435,17.52665365834778,15.397965482992692,27.35947855633929,1.2805599016304559,9.295713251675721,14.347725486934214,6.113296874479955,21.540785668748192,16.971761004572212,8.134587960088455,17.410677106062472,3.6426977046827664,4.158173404694339,7.508479798124057,11.676294489751486,20.459478322888216,3.6734910586956184,20.965798576667144,10.28056889438502,23.795983544240393,16.78138713557779,31.830097168688486,20.313876575518574,10.816884252108096,8.522260705688982,13.284214523190391,15.281226699361056,4.162364122036218,4.963189695498849,2.9040388013838103,19.15678157188269,10.449622236338534,19.38795367097858,0.23007142260718905,8.774898191232115,30.905160400774427,12.40967746671194,22.08673760360678,8.152896442533532,11.401426007604254,30.011351262985777,19.495948281986365,4.019288606877184,17.597057469305987,12.64826037799756,16.779142339067292,19.054108213415486,14.47303279016832,15.61795427633086,9.063132809011577,12.855796945262497,5.3646299830984745,9.6358518536942,12.433309312864317,9.985163075688511,11.82195401785275,17.05258211274622,5.832357646954167,26.183566448927625,8.725289170715548,9.587631675396205,14.46396070963501,18.871098694482185,16.817939522240025,2.6596948736234114,18.49814409347855,15.299428509272811,19.15936218926107,15.666707404781736,3.831373934814521,23.516628488569303,19.569457871371434,16.246517593224176,20.944176066834245,6.54041083753431,15.940177167534596,10.597162201725233,5.49986087916124,16.15322755220528,33.663284649937154,22.368766827746935,8.245804341176854,30.83087797350887,13.51220661091774,4.306174672265751,16.79202892467475,23.19396052709496,11.104669096547,26.824469057094156,11.858887962502559,9.319042032672419,10.734452548302382,13.907625573132414,12.897520193600322,19.287619391521716,20.436605129175597,4.464687921780994,14.767435215544674,8.683567222220237,16.73331297104309,17.25695970302531,8.896627397610624,7.554305186892815,19.14094590011924,14.17307432184153,3.465865787636585,7.556741032894562,25.35884584056344,15.247024415821649,12.639053123733229,25.01916984999669,7.58185604371868,6.9853930790127485,10.140188923494133,26.16651615559679,11.682046162998596,15.978372278510586,16.49927720601432,10.808686612004736,2.6041352188126683,9.81279477507373,17.424677753340166,16.25483678831472],"x":[14.373334287094519,18.663047102241375,14.454962066474707,9.694716229216573,3.487356553379988,5.13784969847278,7.305277847640101,12.906538147095171,26.077849319389976,35.57488456975276,12.75039449801623,15.210195704013058,30.773638141595377,19.636600888160345,4.762676186774117,9.288845479041894,9.981704231273074,18.498625262024774,4.87905728236081,14.410822539692328,20.82835041696641,23.473020585998654,18.18557585287069,20.459874096981384,8.26442038571497,7.829271328262489,9.419907443808258,11.491375698797452,14.955934506636783,15.692937645272867,17.080570035393425,23.782145618356147,16.768652789261466,5.599626524215148,14.15490708667999,7.491232353343539,1.6566466019283763,20.614578487135596,2.0781356475498907,16.98043499087855,19.973700441208504,18.17039436584362,7.040193214835621,19.934855374852024,4.839068976846536,17.79598199336499,24.07302175867511,7.019436476724972,26.01264497192397,4.357918384983167,20.33357380367483,26.509080963845573,18.729295409988488,18.177396089490934,23.028974601963903,14.149849483650009,13.376723500130652,26.850101350106776,11.113539195509334,11.125347810885083,19.41973600476664,12.43862319509844,29.725479641751306,24.660797362764995,15.863604251696632,14.053880512122754,20.525012513086615,14.064561963252144,11.772002588537777,10.445771900311883,18.559259760676543,17.80023040195231,15.757766309932316,5.972293051604799,12.340289526374077,14.476737163710446,12.198868180718573,12.24577623257399,13.81731482768208,22.82541156100329,8.060750684185653,22.771621125128913,17.54309412684676,11.538870606013388,1.4679807940989857,20.94298769894386,19.21201490156895,21.387002327881262,20.59256468662383,9.956979006894404,6.1967221558943,17.00933726543421,18.10722367235781,14.765915841335847,19.53196838232078,19.91702503697614,20.664673646381722,16.38959681816527,11.293691531253822,22.350923015337273,5.804802491970164,24.73596061733568,23.585566187391592,7.586733901775234,23.864928819249755,12.981371798279206,19.608203291527797,10.73612116626666,13.576988955901118,14.139175787218903,14.97758784209375,19.221115589266063,23.18028727082944,28.65023965133861,12.035667247629764,17.28599866998596,18.50969145978329,18.75020823946486,8.078018117406446,11.296513189090746,4.361488597302116,14.68361577778597,12.89566501755445,14.13335011502124,28.51265996941264,21.496198196818618,18.649235670163485,19.015266531488297,20.278082342124215,20.824838498499943,12.423892591389496,14.880668952236949,13.586514755400696,22.7851775319703,14.241461248261723,9.958824377173615,11.320639983640504,20.473447408576245,7.095771439568091,6.048511988021967,8.27709606822223,12.680196653573724,13.689083626961862,20.442493368871844,2.844528249291976,9.275710087625326,25.880571040213432,20.807730143632803,20.148882142455697,18.157292918921776,17.134267203919396,11.18573407132908,18.288916128399773,5.563677787900678,8.16992793226343,24.362900784027172,12.138236015952277,10.620185254238773,35.969201546161045,14.938720055033462,14.470781031296497,26.64392358401971,18.190943985169305,17.991505769951914,10.261793724853556,2.7578751879813055,2.887086049864349,9.723323969755105,0.47011918941714675,6.479627938008035,16.022867565100768,15.22432186298659,21.790200914788564,3.374789096785017,19.41442442973289,11.41187038371556,15.0031385849271,8.867183335821505,24.04074223934739,8.255642321047361,8.945064644599036,10.143590121287687,21.26754802906766,10.99195744317961,12.165904001277013,11.700876836210513,20.811072735692033,6.487476453399853,15.235723546911117,12.563935765573355,28.226322427737284,5.519450630243915,7.093564113515409,7.43351272092118,24.79209789454454,2.2414516951676173,8.699845872237757,4.478177607184071,7.151894461998601,17.149812907510615,19.09396997256956,28.976573399354344,12.775356776234581,17.807256451190913,9.290900628465874,26.89610933721569,23.51133306915861,25.80509164379892,18.401939743545103,13.924916702473471,7.7075307502114345,8.026720918105793,10.981528439739195,16.98104287453655,12.203829722550314,24.889400618535603,16.430781133009333,14.272629476149234,1.8116355170650578,20.01647584557504,12.92742414863513,18.42505588055168,4.223673241888617,25.668845583935592,22.238252057734787,21.10527607225299,6.03806019839592,15.905916394632406,20.79679541485801,7.174693236362131,15.972587846898806,5.68500110956929,18.146784363983627,5.062860017203009,22.229268435621464,1.9966000714942194,12.215235887354506,21.341231060219876,13.475014283246104,21.7602242644979,25.972090145509746,20.29161804566853,21.76059049028953,15.73642118907218,7.083509241525154,18.75604049942871,12.991175672905513,15.585584876594952,17.928678150811525,5.223712522763893,24.226180163282063,18.605582788575617,11.35497094003215,21.389330302050706,8.777551500711468,16.798278201694536,11.072891071072101,6.502603619574737,19.864268038804646,20.859077118318062,11.363651152002458,4.205742043868624,10.52096924906845,21.80160028195707,3.551966434309057,10.911930808800086,13.516372568203835,17.113110738233985,8.892799404556136,3.446822845754,15.95881325908184,13.188397275100968,35.51948775880095,16.797521697157514,27.47952307188804,17.26036867176546,13.136480766268823,12.750594990662277,21.65316821421452,22.597659809606117,18.37096088605652,8.817051812131062,17.75740201385559,26.2398559317891,24.116056201117818,21.95979412414817,16.44930251850202,11.56306649503576,2.5796838673473665,17.05719312981512,24.18859159709158,16.531976582731332,18.62393280957085,16.380134896518275,6.447302849603627,19.774452465886124,8.996163016208103,18.915278410881392,29.429385383447574,20.72330532139511,9.30110044905386,24.19503009853382,20.294225434660024,14.563254202984712,10.019309339940184,24.57317493869624,15.080719899585052,13.781865961693361,18.00413117880322,18.151879932867885,16.149993600373175,17.102381216728052,18.045870709967648,1.6811182072395032,20.41336568769212,18.50538082226774,13.118533088204408,1.5876450085745493,11.551729129755124,21.93787583799995,23.480363609985517,8.83694523767676,5.078017987985928,28.04927299091484,19.24797278612587,13.873259337873883,13.546597312230368,8.484717918435535,28.473560803917675,18.269448342020013,2.890134403131995,7.125476523770634,20.09207772258118,13.041157716833908,10.615858472747504,1.870835649324696,20.891386952457154,20.61373691785316,12.332485467501057,20.22859374009509,5.7115831851858445,18.574324532168767,11.501301935384568,2.9535741917264446,18.233977457771577,21.613109974735913,6.010519437966725,5.088655927143257,15.932445101083081,1.4443032360243553,4.729165090542437,3.7127353922260644,32.30205217112544,20.604377307941817,26.009633451997363,19.46329043926762,13.823159718569254,20.841815298737433,13.475300008724817,17.310629559583077,1.2232453688260991,4.977594017608672,24.41601285115314,22.46086358321261,1.97850626499245,11.390677433225195,17.244796814630497,18.848912098860907,15.074036807980825,18.44102731606094,17.03157339792864,11.395996494891822,27.399151288948588,4.224269356063335,27.089668187990654,3.801218985676639,20.169436613018394,15.606909153498194,9.142604791181993,23.53426581236319,5.738479572971069,12.750666341202253,6.936430639515251,3.4515856104307883,17.509182763772998,20.14569962051305,12.569370843062305,5.322404300909346,13.315585072648673,4.605090727422121,16.42342671305779,8.292991791020786,23.460679788256982,23.41426308013005,22.3392814597944,16.32078550914489,17.098426475344496,11.242440870415106,13.510173070744571,12.192849548328276,22.071592895033007,11.94631916674465,6.340439144170298,21.056543523396726,20.129319297036545,30.093409859622735,17.541295762175093,10.929713372604525,20.675910962333283,22.00597282599697,4.982184593954961,20.810989387035164,1.7590034523969165,29.107652310184122,13.23488360057826,14.39402910845212,12.392326040386532,22.893893299269457,4.1993084138625765,13.468034520262417,11.154520116465802,20.464351298599325,13.132765890053445,17.295053536816607,15.768784159167057,7.332392391270051,13.601310052980843,11.82255978918508,15.403376435167916,9.054810518989097,25.34673993061816,9.064369633070152,29.186788103400232,9.600726131779272,8.338310123759447,20.455627889038063,21.63963148290769,15.754904823233774,12.788976393747047,12.577105596430975,16.356063761661872,12.269029866227836,13.380804167097494,22.25945770961082,17.85949099490377,24.609143951153555,2.2214692669495166,5.924532695744667,19.45212653362206,23.396986776519594,20.3837736765944,14.49472813839889,0.8948825989381264,24.737251764802657,15.821792915232912,17.69103117273699,17.211035944198628,1.117582852668725,6.633968715082301,6.828321042043891,4.568691858858453,11.164970984993175,15.207786851937007,9.546343565019347,14.093129600787469,9.215070754636049,19.019999807295918,18.162413340227907,6.796622374654039,14.438828083072927,9.242728064591555,15.47550260082659,24.681000401005083,5.437974188127657,11.304708968329972,8.96006672225284,8.186081109392177,20.680278346753383,24.69124789706603,13.694867356299978,26.05937110750836,7.811831925529653,8.616077132300292,27.960289014667886,20.859326653013614,29.44467510861955,19.914491690035646,21.638150635825944,12.16730109256548,17.542693558839865,17.404854821687007,24.71357852996549,11.318683668577805,14.857689430408318,1.6111440848248648,17.368186857941122,15.420300032624345,12.240942270985425,10.982082495102297,20.236808987676273,6.1554665245475695,16.915516363379044,18.072702174249596,7.076586611806892,19.40816570589062,25.608507785775274,17.08097303882763,18.400273041209765,7.843683456671844,26.71397072917228,35.40307739943507,18.979870355502158,13.397932034304073,30.459113623776712,12.074421449346936,7.367366644594502,23.398508691479293,22.05963382779335,21.979686728499356,9.516437278941867,5.7484308805445075,17.20798707604085,13.321543675667101,30.918164331031164,1.7504462308906041,27.048585963475233,9.016379060585036,8.096662456629923,15.422298631134812,15.262494908107504,9.238329488354012,13.647598930887117,27.43816385761368,13.7785081290319,17.313821880640248,6.362245254174165,21.56825755686844,5.166708253405424,10.986578059104833,9.11557252817258,25.94516759573573,20.44201783824928,16.129372629877214,17.832235024321477,14.534789245952688,20.441310519122478,24.480364833730988,10.76356993828116,10.704211833080022,14.638060816398585,15.56638640610483,6.534204061759191,12.808319819469641,30.241071044578458,16.959009315997392,23.09485182703779,13.667552356078993,8.420793077476219,25.27916180336856,9.279213295532244,13.260936041044197,3.3745536507904785,11.568663521224718,12.96372955991907,17.979251855487927,3.8867632354535635,19.772510923291424,18.92897582401006,20.542842544412043,6.830045775580265,7.9598126111496335,5.806961342652784,11.231089706967937,13.969616525877,23.846671413132682,11.679421499400299,17.54367904770279,14.663001793551269,22.904966178716112,26.689394571902405,0.16647759903880807,12.360140278379436,15.737403752704042,25.692622732843606,22.18912616289263,4.488464738056618,27.554618091227255,26.579779258520862,19.224604042667405,17.76944162493387,25.009925937905066,20.273485241613255,11.118955354605557,10.575459724425514,9.3547699651269,17.34777682105727,18.390598048938728,23.457529319770785,23.156757460701797,4.949803020030509,4.053893397833093,30.107753896315828,25.23980715762031,22.164681321477865,2.1950087834088388,22.010216884083125,2.6016543001541392,8.77208710393374,10.745457785079624,11.220631423243383,15.022436407477796,9.68316897748519,23.590628766455325,13.861630644397737,9.46007640633228,0.9036800937838496,16.169781423461146,20.977047280756643,20.374895416369185,8.693881143256291,14.040509519499585,15.889989751153932,17.209925846525785,19.52200742483394,7.935880770034293,30.13726736753116,11.0491996290653,24.447605262949104,29.079410092106635,13.0163189681299,5.235394480939603,19.125376658305807,21.969765504172933,9.3123584055219,1.2290053278713993,8.962914616570142,4.402885167950162,5.193224786876107,12.886082395972355,26.810827549750606,3.208567264832725,14.451243995597547,20.765075531681134,18.7334589522165,9.501455878640273,14.973709108025126,21.443442801740794,8.108464097975336,13.63021435951121,8.879598101526453,4.647734087435225,14.095328197538636,29.185380201299388,25.664640600405516,11.509287700776262,19.598991453206644,7.437805312815049,10.016057222267651,7.975318460813058,16.627891543854194,22.51190581554374,11.151538607677262,9.405671553402408,8.383064206762267,2.3286373476564375,10.607208984662309,4.7154356437539064,11.819384174238412,17.020585943768147,8.02421290059801,7.297668452315708,17.05864888350225,29.832890970720992,16.103846709171584,13.083423129504823,17.269315366127476,9.854534074499579,28.673667635036168,23.85456521562486,19.292413083472752,13.381584027518143,4.381747436763453,22.01996569654184,10.56866937353481,26.339408766520286,23.94156773994221,34.2821326541433,19.65530710772382,19.771732164266716,20.55161245463763,20.164243743645624,12.318861565396249,20.983180730835084,22.07088358501298,18.48318773252471,3.502215172304643,16.742186094168574,7.6828348607917745,9.267899860051001,14.161600370143812,0.46073564735793326,7.7986455307205205,24.476244923868837,15.358240739473821,14.05313157471892,22.729444787565406,8.376274305523635,20.184636895663235,16.726576690680865,9.765029367406726,12.569530514435149,29.719280698565935,14.80753920048016,2.7250050417696303,18.095386353205626,7.4518185229425775,13.28967531878833,9.649657016479672,10.08431656055297,7.222179216434996,20.537414593832423,10.011817375634084,19.353195235611324,15.398233346328396,8.965052889229273,16.8400238874567,21.24659487796133,16.96060585180279,13.330907423488691,9.430558359797239,24.145785172911076,14.20062141590473,18.286551595822903,5.680222090147286,6.990341703828577,23.006869778697848,4.371035640831647,13.449795527312727,13.015458204155612,22.162480191325823,12.030963972989742,22.8855859012224,14.714455382741589,8.404241553304395,11.057422784678367,9.977128244005542,21.16136123224785,23.85522619730098,1.7346414099809877,30.53080885647531,21.261650121958013,18.08163375819911,18.64850578592427,22.135666944064802,3.815930413707588,10.71490812591584,14.089234884815324,25.8264563296331,12.196842465188759,22.051573412320398,22.246189647683696,1.739403877693421,17.725704837116457,14.024326960625213,24.98068313507413,18.647332974137477,4.041500250204255,22.199247121829053,4.179037616489322,20.710350049565918,23.15766606722829,7.6337091916108175,5.304443486748145,13.707394049189123,26.544227113872957,2.328163189222314,20.81822756004342,35.32010611710926,6.176960732013443,8.050446400805468,9.08326647595938,16.08379356240523,12.294670994713032,18.988968688968857,18.909782886979574,18.44700966076099,8.191632970017814,5.715004657991242,15.49218481184595,16.258119788991753,13.746467734174107,23.88754158135413,12.353870445853708,8.820930728918192,9.788878220351434,18.954672978728798,15.579985192661859,10.192560786696403,8.8867666302019,0.6439556958059717,13.154450045087682,8.88389309755664,15.972569695374952,23.873858440167933,13.297690832270584,12.757462073743723,8.088729624097272,10.001976147979386,28.17987293689039,13.810560119483453,17.40171772114721,25.722304235874518,5.9255674730539925,9.10249435782707,11.950638942489269,16.461793343328118,12.053066154002885,11.785944940598572,7.917001470128581,11.560772920683272,25.824729418933202,10.173650503515471,12.54737891786522,22.73786718174519,6.27852559932916,14.29844178766136,18.693874448252746,13.296963846044287,17.334838568992417,5.344461609284764,11.042245288640979,29.29053497736467,6.4930180847398535,16.379855972978177,8.824610467594718,11.784354503290325,12.60557469815268,7.405688843397627,16.346210711183264,15.828071041562389,14.885193148924774,16.56987030172236,18.27655625390803,11.038792200540943,15.799004018095642,10.702383721765745,21.30074592594623,8.336148732752232,12.707617734314546,25.729002782915003,12.945029185356173,1.5243000008518885,21.304550152013814,27.039921537446105,2.892112849758168,4.6662507784517215,21.90317617462298,13.491627480601647,8.498526932529145,18.78406615701343,15.623702547288445,12.346645943289664,12.115618835808874,22.559307726992085,20.997932209490777,14.81239053924336,17.44345608193273,27.68281196432462,23.087423692319142,27.109986196858785,12.160478185225253,5.262987012088053,22.172745291091168,5.965055740099013,22.196447178044245,4.92750826368836,28.20646865319151,24.292021530764618,6.286269026132045,25.81701341485888,1.4059443370741005,6.917197299725074,14.247821415115727,9.797182923693551,31.098804507352305,10.090316963005357,7.880732326954525,20.68983619136514,10.559406266434554,4.345810980320518,10.096817816632738,14.669418561637894,20.481083347754442,7.283730860350385,19.357804865769978,12.700177631923173,16.557116886338353,17.12829921078448,23.87713234157934,18.420397218074253,11.234917923273574,4.906965810998576,12.967891915652807,15.342311409914643,15.08630542804235,2.818595744838523,6.82917936926677,29.52620055749476,9.343663741215122,20.543837718360248,10.056043996867178,6.839958936216965,26.408021593771508,13.740686808352843,19.11992003745743,6.45675059874677,12.194241827965154,33.14162714884627,11.289866214799822,3.908691348981594,18.257839965067063,11.955346031551148,15.586949894103583,18.67072435273333,12.30976866814928,11.012272024026766,8.778155198939942,17.416152058630146,14.895035086932499,9.401313229891517,14.87973393517462,17.217450219126555,10.901764706976463,12.5616621077553,6.701841156748499,21.695958640100592,14.37868505555452,9.578104247543475,16.48151293125367,21.0439717348756,15.154414789722953,7.383545117152178,20.25234899500473,15.11907374165072,19.791819266898525,23.511078285442345,3.70332460975486,24.739882527167442,17.899536856055754,16.044587913027044,35.01698374189239,15.373754713566731,16.47213334976878,11.38966454318157,8.25290530638433,15.228731656849728,33.96351690385226,24.313641132812798,9.452433642271632,18.25653109510095,5.885653687586959,1.4046706172380798,16.753362951622304,20.824072175889583,11.362493574665772,17.03771998177843,12.63399391708633,16.490240278029752,10.64799749925157,19.361124529906466,13.92558018684355,18.850831684018676,17.426316946343004,8.473742069116472,14.686064887239297,3.2168637138861618,15.900220267032033,19.989309859909735,5.240994210279111,8.38738499684481,21.346125028040944,16.149194994290173,2.819863122078522,7.2053272649914,23.836068313508605,13.03585364754637,7.069718316540914,24.8604677791742,5.542743461913308,6.467028283176754,10.39420743988993,17.093929843115077,10.27880548875838,28.552999812879236,16.588668171330948,14.236745818009375,12.683806992058951,10.841521527748158,24.630418471862015,22.215015533981088],"b":[14.466395554334547,19.170828558862485,20.714534313084084,12.442371409752697,11.079931702923297,16.950844010888396,8.836653360469647,14.191571537712772,32.07333304454625,35.734018991430816,22.473101601641993,16.40979987248619,32.14017431833543,20.212241196341466,18.99289831279841,13.003742243404144,12.318993386747245,18.88217526661683,10.204706611811392,16.81094255244691,23.525782093459497,26.42527235672862,23.22848933973756,24.493352345053502,16.34041434907774,8.033252521423147,10.79125420205305,12.100544471567986,17.903650533792092,33.460907713516846,25.36265239671263,30.952530324498955,21.8513220048772,19.688127446652125,14.861791786828444,18.654654558457903,3.564463257918189,27.17715235668615,20.689591150175822,20.59502151614521,24.066920286081093,26.83626340368975,9.671239900561211,25.341080478368117,6.713644869053215,19.481852861958668,34.45252979298718,16.89548214042366,27.15359545702201,4.4067016558263195,24.59556727207451,30.328450312130926,19.09113239187109,19.927766136477928,30.87088397792708,16.7003575429505,15.561422000841034,28.41972326440125,11.336844797374589,16.20176194171991,32.72782982582563,13.660927214519486,34.575033228976196,30.964120590267257,22.183658472401042,14.252429184879446,27.48824119046294,16.486181426540544,12.976972086375035,18.428682716247497,18.788483970351262,17.928768537387178,25.965122515779534,13.010116259160446,24.826088653282724,31.517835244020596,15.021771885601295,12.838377885682881,26.389455557915138,35.03991134008976,9.999188217274222,32.724844897081276,32.1393648426633,16.58633362544041,17.3093390600045,23.460962621165397,25.09097564577771,25.449713235764502,27.40456926081536,15.589600879138374,11.553322754947013,19.29670510253334,26.16730144553544,17.66942688851059,35.76143559224063,32.39680410846141,20.794313676689953,16.41886218374971,17.92066286450804,31.508385113285122,13.632368500650522,25.470278100002517,32.59197699572647,22.841029937246937,25.873029363499384,19.98368616062939,21.96956732674702,12.044758954673064,13.634896389037749,26.652540155323443,31.414345384991652,37.212246569475184,37.42111309907894,31.911593605279332,14.903065059020477,30.73216554438396,20.476865544268122,21.938784587623058,23.741756317239336,12.789951158648694,6.060250118682271,15.068311354648367,21.370166448622776,20.77551776803849,35.11818380460063,26.47357633551995,22.96519972451882,22.452818847003723,21.40158981431192,26.745429937292634,14.935851247920612,14.979186175986673,14.752595994787328,24.18586474634141,18.670801120529347,11.919490045780755,12.855048244926902,21.306765250432196,9.007013369144383,13.294086270786218,16.003356594641804,14.283500004293845,16.7606817928433,31.40093295458108,9.347485420785944,10.834668844148627,30.96736242301139,27.03285729722704,21.608025012198855,21.577468676055464,21.528841258834376,24.160326175924936,33.42407191728385,6.294785603585891,16.09017279064986,26.757069177812166,17.30738031981756,12.627577827993427,36.342944099046264,19.82580727749765,16.845821307453743,37.10434416368935,18.33389607432518,23.56527578868824,16.793242194602897,16.466697329203864,4.2256949015672784,12.387447210132413,0.8589539284125713,8.40339925413418,24.465551900656692,27.37000065044925,25.411952150236214,7.812955702812192,26.246887002850414,12.936506712143272,15.28200141054549,9.540549049812096,32.0112687341052,13.843165698019497,10.780919889608521,21.034980029130956,22.728194622076458,14.169991607378561,12.588926027950773,17.994701067241458,25.05649355690932,11.392638756563693,17.997399942069226,12.66121323058599,30.531207952835327,11.658640406778073,8.300648007215461,7.715080677854482,29.78705519260122,6.184232890780335,8.889205626642532,18.946262891034877,14.245046293176449,19.469509766189397,22.267380165030634,29.370808705357852,23.647537041150013,23.26900130991653,11.935570103773632,30.234666855158093,26.126806747601165,35.62956907502927,22.55805504526366,21.088765040870165,18.22023813157947,8.343364976617615,26.533488574318394,21.985379068069015,13.30139288314571,27.418880281739398,16.81260611529669,14.944378579797789,17.330968468491825,21.63610382812019,14.251298273597403,27.237383126678015,5.210995778374232,35.59266987611636,22.77242430248632,28.834493663928694,18.77191303269425,22.846031232171903,33.35375792970689,7.873909161290271,27.385925473248275,6.058789510537523,19.544713362560124,5.107285926861982,24.567678534456615,10.49401948723602,17.630826113863577,25.561831420453956,17.43591769633483,34.627173177508425,26.60290216604656,26.21292424162298,23.4247830265358,30.55153940428412,7.608476992438642,19.453838315018515,19.82496749663342,18.63285714342971,21.950383751636103,6.833673858131064,32.23328158830369,19.38414096581729,16.769006080711684,34.94999547708552,16.440441343731713,20.817949936608162,11.596081973127596,8.653540929534312,26.791607583249107,21.271894272817892,12.772509491267847,4.320700994418973,17.406349948991107,26.796737969656377,12.145401884609669,11.093726808894631,16.493905924944077,17.54393790408914,10.720909071865211,13.452890742560296,21.780844364932186,13.607876050747453,37.53085173282953,21.59153202005821,35.65010069579419,21.618467574487514,14.495794319794317,24.20176108907949,26.041078876272607,22.94340739103159,20.942470138541836,12.510249038837875,22.473883080781484,26.990124676371025,34.605162578842226,22.93597235089346,16.78095522828768,26.037652011652177,7.267350544113409,22.644490841867615,32.976677877585004,16.622252222972023,18.99724342469193,19.27221099356684,11.170348087675324,21.274667067308137,11.986750004768417,19.720962029953032,35.93812340985799,23.473864470228403,9.363914842728033,28.386971994382204,20.99735282490042,26.734166347916954,11.731893522761897,36.700847377078446,16.716186881899617,21.344929117270503,19.012408536509042,18.88083196942913,17.04827432765851,19.77396540407404,34.2212357457238,5.981515913978082,26.909416771263462,20.569816864744066,14.528282505275346,1.946926625469727,18.528371301793584,24.108856300449848,32.96754567342445,10.60217928423501,5.347631662310461,29.97096317319662,27.683412229992854,24.925018477203764,14.683154085302622,14.407709537791689,29.815795315426808,19.560265669044842,3.785347004481614,7.788988876718905,23.597417400149308,13.59562624732753,27.091287551587158,2.590265218550476,27.880573686158925,29.241183439541764,22.556737000357835,28.178352667351387,23.52446707168378,19.710087857949162,12.935652921055114,3.0191355769947226,22.89911818951674,27.8871310901623,9.773385062015944,10.448469111637152,25.171026083115862,4.7723456049173185,7.559039795534295,14.854931710767847,32.4147608131915,24.91851109723338,31.570640948785517,34.24483327139527,19.403859148432865,24.43414521982348,20.6266006373311,19.732441604581133,1.2287052205777949,5.501704212607201,33.346581595219604,23.50334461155607,6.117048483415171,13.001718936659708,23.72854749748661,33.06519730847438,19.43546473068158,18.89883906371809,18.925958666652942,22.680196800065858,31.634935407777185,14.6468370965842,28.76753465686184,6.492647378550926,31.84811332135385,20.70226208099446,19.19910857917989,32.513798779259176,11.117577626791281,12.812680876563022,24.23919867035492,7.512879076960304,25.513716044579898,20.297623878267892,24.61519013081558,5.921111103095207,14.274024873399092,9.129944899923888,17.52208820149702,21.710989845839688,31.12426679476573,24.393347516801505,28.655842580399447,20.408427664315045,21.7511036469033,13.99294942303059,29.886969315825386,18.62505866238745,22.362369448173283,16.220053139358427,6.516324714399904,22.794699985798225,22.894055680410833,33.64654659704678,21.89339205065043,12.671037910936596,30.708534138345357,23.013557084499816,5.224155139440363,24.3124299822913,15.925064195883884,31.01004235584344,18.391648318920957,18.00600783771864,22.23529290626986,23.670967174704394,4.5339816309930425,13.687335631262481,19.602743505907043,22.781126813116806,20.451781102031568,17.484421785576757,16.477637714389807,11.334326472489757,25.17987610502095,21.394025907439854,18.048932257325706,22.915485706786612,26.969081175262456,16.29009436492459,29.94021085126048,13.631006793384977,12.863906870982373,28.282301442914928,27.820065166133706,32.589296934348575,18.21239782027471,17.18178380910946,29.925809740356364,27.413656253385884,15.490887570445423,25.972120033224687,20.19897359849466,25.662387201871677,2.699882594850913,6.517832249515343,25.43031202528433,31.461595691159857,24.54549403766101,16.02078031346738,10.144517603983386,29.89352886772255,16.49624978702157,21.246917161549373,25.653937099449116,1.4097987528055,12.802263415226847,12.739469202122727,17.258687901959256,11.731256136425717,16.536105802821076,19.99412549715459,15.908062432340806,15.755141453093625,21.97139958946515,33.04685371386913,16.50694104076763,17.345663749979025,10.579386994515367,18.765020654409735,28.07546570726611,17.478380303468942,15.837825902678727,17.004639127953318,11.277428138432004,25.400978503542166,34.4600372544963,24.07841874806092,31.49596976250326,24.707913991317326,10.139524492389235,35.120643652124684,23.622897501139004,32.57584474449844,24.920746226665912,22.98596936638642,12.199323588353765,26.935833987924408,18.652127441614066,26.026751688079532,21.214000377120698,14.922338039842789,3.027204348110897,18.275279966440586,26.866962058068165,16.04695232018898,17.059499964083955,21.1741302075104,14.272163870795751,32.442529750515085,32.73387419900254,8.771915383787551,29.239043069747787,32.929612994819955,18.586209292233526,26.17472195715726,13.182878066488332,29.200488922248546,37.1733575220741,20.36862648418594,29.923526974004865,30.705985559206393,14.938889276632805,8.009365723402727,26.71560538271375,31.444208319859523,30.428620793169497,21.753108365100605,22.98697566889289,26.76308510980713,15.615136190961971,38.81533172458428,3.622892005271159,28.438678079525268,15.295876008451158,9.12226056487006,24.215902824492275,20.46265277691289,16.08697623511906,21.914559036461306,27.652313896009257,14.988013332349052,20.37427820210349,11.290920184451934,23.207354134714635,5.984222283442384,17.550371066932538,11.326152095047455,35.83746453735248,21.552984681883878,18.469335980217895,20.97531272638141,18.824507891987146,21.81291992074724,36.86042831498362,11.260754560422846,11.743914151311188,15.411707529574965,17.22240324329246,19.849151614982222,13.078619832294038,33.074213559545825,22.04753607512731,24.99995470766317,22.581456207086845,16.407306685228278,26.92786033613728,18.165076255066417,23.070667730690015,10.932586948116693,13.361388006716268,23.341333835584713,25.507619260868047,4.80242593559697,19.96793829576644,21.480357617753306,28.646873261556685,8.992159030049702,24.940901710974124,8.12508204663629,13.651325426805121,17.586666981182187,24.523563972264597,11.971154092725662,21.619386471723363,15.4272568802898,24.429077457427233,29.97082676402244,1.740940155136248,29.606517353739147,19.405840158070802,28.987294018331013,34.892441681790416,5.345825004287366,33.82554218968288,33.060461081572214,26.812220130203265,25.710415874020523,34.13473871689861,21.211727655185065,22.711592508793185,11.603223041983592,23.45446362471737,26.506636278324677,29.43247243610726,33.337512650167554,28.16033637446123,5.9592684960316955,15.18281260762998,33.45228801674255,25.86604389638228,24.947060955663144,6.24219270373136,26.207452572432203,10.330202397195979,9.946854821747163,11.801371504599917,12.361423834260343,15.171180783735068,19.75480486977219,28.275879471933763,14.38062530385388,16.866942046152754,2.265929292566873,19.088856362984146,23.402420067715312,23.862030806220247,13.591466646631698,19.00983225660265,17.163235471074355,18.446854213737343,21.661500747194534,14.936452364569131,30.858083015045082,18.35258765515479,24.837181798916447,33.57335108114354,15.244521678431262,5.998673425926091,23.578444503190884,23.970074844357928,13.073604195378511,2.8862774281010317,9.03418783355077,6.62314803831165,8.218134201321451,20.403932000058347,34.33369869708548,8.692156923267564,15.11297096589422,24.600957444504132,19.87516303293054,11.713126626745817,17.326890323615352,35.02062376573714,8.49573226111142,18.55677045463692,10.030425007648752,8.500982593193637,14.34748775294242,30.129745060408705,26.66550934542898,15.21222597557732,30.70294833483117,18.20151818269217,12.766883350055313,10.479131383935474,18.702715856797546,27.62528803651198,16.93142402785711,22.950058913679875,8.712269750024753,4.8972306566966495,18.27119783212325,8.947387793107913,21.749263477839236,23.777483641670855,21.028767922616037,18.58558709650569,17.418752814478783,30.903375531925754,24.20226724756105,23.28682165870375,18.410683871993925,16.901745514040805,35.16543756742928,24.536456001203334,19.653752799950684,20.03882265144767,7.510838560072268,26.75103243135365,12.509469735265482,29.413078988623724,26.353541979733706,37.856162462785264,20.05340620279288,21.56027324538028,30.694778765332014,29.854858683644398,18.85042106614639,36.49832584077127,22.831632443871985,20.988247614821454,10.429977178470692,19.005134992088507,7.701095850409532,11.127983828390263,18.28973154159997,0.526171309668868,8.577168193621523,28.96902829044255,22.849194326193526,16.77977949306625,27.494035174886513,20.15039948618907,22.8043608149416,17.23569184015104,23.52856353624457,16.77227421117227,30.37875384707716,16.593260504506485,2.749727615296651,30.13342802984133,8.580095178069191,13.867777616191368,14.90895931210876,17.701003285694377,9.659664649851166,22.879584509253334,16.375324876079787,23.61852864877532,23.475519716810357,14.080899670969682,28.38612808625372,29.261651464479222,17.976641954028185,13.356108001083381,9.5412082613875,25.193128434259794,15.076861122931373,24.305741340976667,11.50736460127591,7.175211318390011,31.017720737912146,4.715502643249039,14.102017918406588,15.423977046209838,32.33388715825,12.265199952078891,25.598414678158594,25.124122718034755,22.59903530748489,11.615740824017067,25.95184218595167,32.81349320003932,33.58562989950211,10.398241350568332,38.077973658782554,28.588873905006864,19.797274963828613,24.446601654204457,23.788837750897407,13.676267564812232,11.214951428925279,19.726482423246047,34.289780133838036,14.769789009488086,22.139382144429195,23.785793125942707,2.972399923461695,30.399863858606352,16.5371093755953,32.854920061495946,18.986829997724982,21.294533436832513,25.226725014483893,18.866491256154433,23.393749482281354,25.850443197155123,8.05851378253363,5.552682373899271,16.363959230484106,27.665458820375058,8.039933279472224,22.112146606314408,36.925424613816574,6.334142313270825,9.955593178159464,10.601545664969066,22.51661798122745,27.777016467313555,21.38507436855646,20.53949898086634,26.30793380080717,16.839575173286843,15.016098053479066,23.574951239405348,17.21199619045128,15.313303309421213,27.765856783502244,19.161111233919573,14.866167962315856,10.206709396528705,25.36540055471253,22.453191808669384,10.955196049444048,15.72192420459262,3.293052141994126,13.679920346288561,13.609203822737754,22.930444155107367,26.452313763285932,25.906708492806374,18.401480902141767,16.40799039071701,20.997118350777285,28.44740040434403,14.409724840287183,20.279459467226452,32.98078441791448,20.961442824360322,28.565651637973836,11.960703034906413,17.042888840583196,24.712553711762432,11.790087245620047,9.839511295254724,14.424633207531269,26.296384802713803,12.90080420405669,18.506604156974955,23.46051935296105,10.89009102741028,14.820578003006073,20.581296572194347,27.991100336715085,19.43599588595981,21.100384284665896,11.29984670622007,29.976640054157908,7.0488384479865385,16.84915706479885,16.09244232616644,21.551023090048126,13.174741348675465,8.470815909174888,27.125433518873884,21.747068857612465,18.176436975275102,17.528027185867384,20.34132801179023,11.206745919426574,28.475311827438766,11.262620270002138,24.00245096297597,20.37802594471936,13.863261125215413,34.19712459326445,18.19882016102435,13.124715795079567,24.24356104806051,33.937098778598056,4.926319348473753,8.090681917582604,24.243133933605577,13.625090663819762,19.67925624338175,21.018685080021356,16.63311243693687,12.62150151562603,21.668160277073444,24.915084847576665,21.273363739896244,14.866641107194178,21.20578444595118,32.78310075551258,26.788782120637226,27.65656658248847,12.30372002733986,13.925658390350687,22.47330094386227,13.165396381597523,24.346207523766328,6.034478677813313,30.87174271827548,33.85792775973273,16.73838248224298,32.33508542456032,1.530139129878676,9.981858151795286,14.371680548337174,14.93145521560384,31.967089079298837,20.94957500262831,8.363988910166672,23.9888364418509,15.551832450288469,7.2147977749677406,12.03315759107344,17.82160631356573,21.14941458899972,14.317549243719458,22.188136476545086,15.304901877535407,25.304709017459636,18.43955896545966,34.19354994625374,21.647255169231027,11.319986875641984,9.603475657264724,15.275890052671501,15.425019507374763,20.035525635093073,6.035438411952532,12.381222849039787,34.52928426690267,10.715807502126417,22.612445504703963,10.417798074088417,10.052123307254774,34.451423966971305,14.532478876131186,22.95852577657501,12.611686001379617,14.026467951679424,38.827529347688426,19.76104921294846,4.098396584456494,21.42112578390725,13.569233236957746,21.73254063210632,20.465770611194092,25.348590519286496,16.350080880387175,10.980258814987433,23.02040917154681,19.010508528374288,10.477927567764876,16.40009792038467,18.00719866535576,14.826817230067405,17.662561848557505,8.715252126383174,30.38453383533755,25.752735735832836,10.213125599746679,20.6109302576549,21.66437694849483,20.071682671746835,16.073215110140104,22.960072353637266,16.216528956402833,19.836043600940254,25.571155676458332,3.965546136993936,28.35007498030915,20.177804462343886,16.25978540319718,35.575920835495126,23.699373210717606,19.756838747588827,12.121440627241885,10.628014739842051,16.709388733131277,34.60134270099257,31.960562744727877,9.459322428811529,31.64733624217976,15.257621944643326,7.801935255675896,18.62294730413459,23.651198179574735,12.53264048245105,32.897700175202054,19.200105634645137,26.631049710813794,20.179998726476388,24.108030271298905,18.250207093176464,19.68622383215478,24.21781450605687,9.139570497847647,15.781734822467532,10.742731621079557,19.69985798477367,23.268446192396766,14.140138742356099,8.475373464065079,22.149709012065358,28.41279244033563,4.731248740079144,7.92302027505817,27.52283029980396,20.10544244247822,18.49786304204072,27.597738143762587,9.82421040896567,15.782416548219475,10.465952757203798,32.25464895801722,15.19295116873091,30.343906760688736,21.559237864428248,15.283866260471424,13.160622932491469,11.740359037981108,35.24198915542456,27.70671166169735],"a":[14.01824762274909,0.4212859078359843,10.50828112686029,7.878449711301498,0.41923980651990433,3.262181985685242,0.9911413580795791,6.406134578106206,18.43683195947373,17.941410592123454,11.364745338539969,6.4338279717615965,13.403522528645402,15.561798344797516,2.7303696984765535,8.97698313282012,3.699409966721827,16.638151020975926,2.7560412761309383,13.545162089424633,18.827217763047802,14.601308599669945,14.674353083585356,17.605804303908474,7.793114184416883,5.087948572831613,7.509033344731528,7.545661346981514,2.8215111597311937,14.829409257730429,16.67132977440048,17.068378685964667,15.941164199430201,4.532268116181686,3.7824943224117558,4.64715242479484,1.5693279901322565,16.174255067802616,1.4942518981293995,8.336614690541486,15.80162984175763,8.967461690473293,1.6822743672727203,11.905985614733998,3.2389789086294885,17.009016160538494,18.000447693883395,6.478772690498205,14.823091386118303,3.6531845645126593,8.886217501507275,15.199414573645708,18.25558305797507,17.845209717805446,17.16709577494495,8.18509301209723,8.299937052685703,18.197898364068728,10.274162941712262,10.424816253464568,18.61573896054025,9.76044435750067,18.316280672025,19.361095346354848,8.286195939185754,14.014227687826892,18.932369011719214,13.750796263774747,1.849198491603672,9.403558737891174,18.482061245601052,14.619689215472999,8.118478898772267,1.9383550922626558,8.03374162797538,13.797061165819615,6.743427921402008,1.2385278476205652,6.706581861611167,19.190138928185846,7.552145196092317,13.007775291519996,15.827801461550965,8.929013681828248,1.2881535973951186,14.719422110222062,5.540625265688357,16.96354320746615,19.264965388758625,9.634173234146264,3.782535207272808,11.380442310275228,9.794851481205399,4.099338590182193,19.323637593676864,14.36516760197966,4.212460406729002,15.124405721539777,1.2624240266530062,13.804892771110797,4.060080606486438,13.379454102291316,17.730322665417802,6.7897503890759925,18.334128909658656,11.466767795480418,16.78655723511355,0.5637020315163577,13.321525589583732,8.905431109028342,11.516915940238302,19.13700557673607,18.184985673119378,16.93198261255512,9.989162044633598,14.965752805304277,0.9763402246735309,16.770348899249342,4.168816587841371,8.647877577570778,2.8475455875236833,7.59221616277431,3.5267818312032784,4.137218683615886,18.470731521916676,17.543570165340746,11.151288494297456,15.099894295749818,12.91712384561906,17.482169373163007,11.134804242025403,2.9381891740831945,12.762826544855619,12.835150592254902,11.675056885581906,2.67633597082519,10.364674519308657,15.006668714187462,6.720645507214722,0.8001320785036992,6.254552262276456,10.60026823807505,13.619071168596971,12.663985159711086,0.9109675242104132,9.142313685939595,16.246805981663627,18.92490869866531,17.370274369751858,17.43867107871989,14.579648183501712,11.015968174355834,16.396509125534237,1.627501180532973,2.947710209047494,14.621694850879482,11.210120220453653,4.590226437915992,18.569333700460557,11.168737818247102,5.053215077478019,17.71628717398558,16.863548163955674,11.367933802516607,0.8856765392857291,1.8266733585283035,0.720940961590153,8.349557679145697,0.14447083191534205,6.293885346996562,12.775037185352915,13.264817182301556,17.869536003307466,2.3341683096167287,18.378777247612383,2.1925302848228867,8.950876733131423,6.005299709255332,15.092157353834308,0.5887643847377566,8.7051333441199,3.6980378010200976,10.438504962450743,2.3261046491238613,10.100076075173469,9.045923011882678,5.622117306109202,5.685527101760917,8.127006657725445,6.33905368602619,19.874724535616078,4.306374760293781,5.646950971483133,4.075196359257345,14.841744273374907,1.972915894195033,8.576793257047699,3.762271884005699,4.954783990714047,16.253954395928623,15.008105650198829,12.402892357788918,10.300618315514107,12.996654405912196,8.243704187548984,19.68294196028672,11.660730602751709,16.00907655273417,5.271636565603011,3.1163192644935345,1.7370673706626016,5.475149984772338,8.256728422260501,3.190769560579483,4.957113022870683,18.93013408288462,2.061168703167837,5.871517713150545,0.9006823150142784,17.73234583293818,12.476055448149843,9.151048867129745,2.106835773093083,19.88918891066369,19.56065459817125,18.132884385500397,3.0029943883955745,14.993341411005012,16.312104538847137,3.9446026868618134,13.569131069604495,1.034101494012094,13.87658639257105,4.478982277971197,19.22888188520623,0.7842092824319069,2.3245559028441987,12.938461394516047,12.271069771517702,17.80393977846185,10.16951132411073,17.04281095169581,11.86995721234192,15.44320327653769,6.763093181909152,8.760007896432068,1.921162966223724,9.086025520126576,11.545336546898305,2.502446509080918,12.738843493654386,13.904394111382086,7.860216189777445,16.646984487111038,5.496189451644922,7.748570483001984,10.554528913505244,4.913253836973022,16.66922423965842,19.681200047105534,10.019979431934601,3.7614931707000476,2.405392628109566,12.141597191152464,1.2641056677995266,10.570789648336302,5.607594376199052,16.996343115214174,6.275191203976447,1.1929039590236101,7.547759827819127,9.602091781070051,19.588771735915444,3.520082698975826,16.573052108794716,13.961355815946984,12.474067286872224,9.058506647897286,12.300373884142886,4.5024176064163335,17.775345594996935,3.748733866204814,13.270307897709657,15.117686258701655,18.63832799877391,16.7505164571554,13.78916019403988,10.257891283180246,1.216564527549484,12.249981405679131,19.21075617960939,3.0965962939913494,17.940158389599876,14.047288525968673,0.8020569114862397,10.249445851232938,6.897687715520671,11.851517871284173,19.578865325052558,12.554792030786288,9.21681949143137,11.126905965900743,3.2097896290822403,12.910999901616451,9.416716994218639,17.698223598426004,13.724985858182631,13.294389485386162,10.919556430710319,14.276480279582845,14.71036050901521,15.005049056118992,15.397522523987007,1.4399923883882293,14.844107233647357,14.411014954930494,12.477692993202819,1.5850137563238453,8.584174705135194,6.892766453815216,17.473056911256375,4.4798405136480035,0.5442280358189588,18.840647093381662,8.579905049648824,8.35155778687129,7.823178837154705,5.126754645204152,16.654590817421962,12.234941825076294,1.9121745249842093,6.763461313642853,15.786519037175069,9.289722606961126,9.626711279231523,0.1450717721654149,12.87564964098701,11.754838900119658,3.0557506283086777,18.263305662475272,3.9196810865708454,13.692769356331805,9.647802582195029,2.778115719735297,10.319464761697859,12.632617501222088,3.819054015086003,1.7161303249350857,6.5455111652335685,0.9866410448412211,3.434053799047141,2.808915780608654,19.08003978215507,10.184830121809348,17.641727989555736,16.521059953869475,4.349522882288346,12.313079228115598,1.7710212807645664,14.88259495820564,1.2094011536899618,2.792015779190198,15.631800797442787,11.071383150046387,1.1930495728735258,10.970327972708787,16.671371937569962,18.478058264907666,15.043140500234419,17.48279929470229,10.496065911290678,6.809004875123361,13.260877753409499,0.011534692802137592,13.184909930778229,1.9632592174357821,18.146676551773258,15.091669357472274,7.917399962820908,16.995740678193414,2.710710907363425,10.350156386944139,5.078337980477325,2.647572987158422,13.824110677719727,3.343852130182592,9.388866673515448,3.845555976390065,3.5678784429666033,3.456021773017497,15.015480161182403,2.2359163269754534,19.40070274888074,18.691345693167982,9.556826795324774,14.59448889648404,16.19832283047428,5.932867670870374,11.752297635399923,6.306337168798639,7.550861349917608,9.343841755530624,4.138836182224264,19.419230174276457,17.845672022091662,15.187578681890566,6.501580242730234,2.7536889522169528,15.554656956992293,13.285157764340202,3.3390044574936217,8.29784677797801,1.4302389642156,11.235245160767878,9.032805009301388,12.77128971157396,3.789825105712672,9.82999902107446,3.466476502345137,12.795423325769262,4.23678334963248,13.823178344372767,6.755642901745618,17.178917502196775,14.935227358573378,5.134842549250531,12.411086360336085,10.956257603665097,10.4505081801457,8.629671981613427,19.539970354664792,6.660338030575783,13.586539609456496,8.885350521696157,6.6722950828082705,15.399074886322,19.11060210895033,13.766236352685093,10.392603070694356,6.124159764130077,10.698069707386516,11.178667207186578,0.4389220774348468,15.035464202964612,3.509574888853555,19.937959596708946,2.0485596505936643,0.16123713941742057,18.654128214397918,13.465473616014227,17.025598707205013,13.39467523700947,0.6263414618311192,15.692237944737538,6.911867600846517,2.970147142381432,10.159842063076464,0.6771469707594857,6.531746945564718,3.108190195726226,0.810358091433927,8.691482752018565,0.1895954228460095,4.696993205989104,13.383859627513175,6.294488331532961,13.791710019659034,14.504004001090468,5.644204422200132,9.314943200997533,8.439696125986078,10.813825240175255,18.055464915922492,4.5374501616198115,7.062276280739748,3.678826420834378,5.5961735921702305,15.415824405620953,17.820741903149454,8.6936841226483,19.482576702128704,5.242721108986839,8.490870731381905,17.35424329788449,11.893435420399815,15.671974160351883,14.959396113908294,18.986443511666664,6.500251219536386,13.33814073669366,6.170231604345955,18.151954049900475,10.291627570426343,9.345886407003231,1.2212787397237834,4.505214916925189,12.116951887492053,1.6425226620632438,6.899546205053184,15.011130668919224,4.386204867762995,14.89101229021447,13.580075453214558,2.078152605641961,14.644072820477021,14.17351604285721,9.711844532544372,9.412754594334958,1.3497011096110745,12.981041534841907,19.30817238771198,15.806270419054744,10.338916829297276,15.930062179926932,9.290690385665306,2.920762671417454,14.9718483449346,19.73883277708051,18.98170260639229,5.704718901711221,4.790062644654496,14.01601461954861,10.129799627870737,19.06767056298549,0.36601166030979737,12.721085516171065,0.03756019020841883,6.6186918975176345,12.284890504292939,3.681821617433796,2.093529637210616,6.712850809161992,19.46853186952351,13.717736234419693,8.202250702123205,5.853505292177186,9.015528230851494,2.448476992537274,7.202740672991106,7.4424639701992445,18.207333756684253,18.90118428110394,16.06078954727301,16.854889959878335,8.908927003455357,15.600919371241826,17.83221809682297,2.486771749431327,9.161094673974425,8.218481474877336,0.7251838487561901,2.511130934905985,1.6827085364564942,16.345128720723373,16.46996633757866,6.31436390514883,13.161730424458046,7.773910560051918,9.843003500864329,5.598960243499476,11.13862429869673,1.7962273329704947,3.9829922652475025,10.04789592927886,16.457281629154053,3.867204544985343,13.67987562658621,4.373616530344342,16.572921268692546,1.2283621831786373,6.378802103863377,0.27841600816105316,11.122222658977092,11.995472600249105,16.393032444837633,8.40349978210227,9.892615109792974,14.512552415211113,9.24691459873924,18.536463240675246,0.11326640855301662,12.0543072191014,13.574125088677507,11.40971817622091,16.197138711286357,4.466044049727036,17.86581041100157,18.654223335983918,17.843282665786884,17.69328526286561,16.706639309783956,3.5336571317198695,6.618636210872477,1.6772555971585223,7.606140946203022,9.590949939760156,12.370025422388577,14.405249823189479,12.380261318482919,3.160138468122895,2.363692932189685,15.23290142728345,19.064866779047982,19.186731429781663,1.2203114064041465,18.622402714384986,1.8988296403255633,8.54583553230627,5.384104295287715,9.687628367870765,13.501329325012135,6.40382637268988,18.304206627498733,12.79465313442245,6.231219861292203,0.2501376287125323,16.013831067835007,18.841368535418074,15.86113237767865,1.9707539158895448,13.29541025506613,8.7939482282248,10.686383950001769,11.339036569033297,2.944379472791545,18.62730968809036,2.609454671816125,16.258561775549566,18.73914518626865,12.473415224392825,2.8039287823742587,17.92003153417692,18.91533438970974,8.12326363246834,1.1330364262938053,5.557815227255327,4.186490495499302,4.21464643212802,4.950971284344066,18.69101852569616,2.5807865398142615,10.883295342650165,19.826910537360668,15.941962395435937,2.513651348181609,1.5144136673610875,18.376165190935126,1.4386014136250846,4.441701740329074,7.964905179150201,1.6013792186610365,12.560944756684446,16.56198464065431,18.34981897910451,7.939303947024587,14.369387648304151,2.800840635798294,2.3226269641217234,0.7872096370025661,13.725236830229397,18.0528273112365,4.989751851100261,5.860413875043431,1.3557111963819546,1.9594700180377345,2.584978610568607,4.640594538581939,9.5992114246482,9.300004240833344,6.682721195871739,0.8798147448744853,2.5251449465823006,19.08867982843335,4.756311063872509,11.357948135507465,9.879268087518538,7.356834479400813,18.108532533850543,19.7078370664571,19.029643432124637,10.004396713279355,4.175842020855791,11.035428991024885,3.270730461111553,15.537999893427719,19.411193500774555,18.481133393834604,15.350133129920245,17.992302753044875,13.825921616140452,19.88773047929214,12.218513406085547,17.440907021411608,14.957240661638904,7.465150605081492,2.165973597518329,7.978692524268496,7.179245401514911,8.345862676862449,10.257909505548156,0.35536880215230937,7.5775249511333564,14.523952969739625,11.641400932041833,10.93324683069838,8.381637974119664,5.987878841425736,8.724042281992382,11.736173530623422,4.317186598953193,10.420083456291621,12.659756649740078,14.697063522400855,2.503148979984471,11.164998907544064,4.08034843859479,12.80772725131682,6.997586771207471,5.306199399129539,0.4780130520691417,8.914282141449078,6.4930279376709565,11.324925457879282,9.168402997344142,2.9218469860361296,13.615169793405379,11.805965296504128,16.59338122636797,11.206972261564111,9.427596099086335,19.230666804763693,11.804713880868217,16.79387855517026,0.010507912130415242,6.667137954067641,18.4617208907394,2.541918239390384,2.448496709513619,10.551648776395893,17.855938936682794,0.12758913359555368,18.31936626304568,9.766663258041213,7.782957214757422,8.389406989454034,8.201436267193456,19.36455361308054,14.983144698443681,1.0640843203869554,19.828244538100105,18.98645259639606,13.86503764142789,10.132645358932493,7.767448659966574,3.1746730384237543,10.444644084966498,5.13195413343138,19.880542754098308,3.4471595410863864,19.88653647799529,15.70631821047904,1.2423470210383636,12.481817983567245,8.121906469716617,19.69954753724519,18.26781969895646,3.190440783130253,12.545063139388407,2.7417422702479,17.685920289881913,10.366570282568834,7.3650944319838585,2.8670237523345543,2.241626214814767,8.069116096359807,1.4067288282872248,15.833503503309343,17.52748760813669,2.7115802746168205,7.890069709093357,6.9031590397949705,3.377633368114985,9.744810265425734,18.677441790917,9.131136672531346,14.838126202202195,7.563546469476687,2.2754969195723485,8.081868371128124,13.516571567102428,11.472342879123714,13.403317205280793,11.12763092164839,8.762633576693396,9.669476330154833,14.639452984243588,9.025194513490188,9.875220310802035,8.589236275194626,0.3915035888464713,11.514359426612927,7.825394814994611,14.124465588306983,19.22489476928998,9.11702223097369,11.321312277339338,4.59889255646631,9.755309404927516,12.632942485976324,7.933753139831339,17.018498677643095,18.276786632276828,5.023864692631861,9.088120873964375,8.424982524905534,11.829292617004118,11.55457153127616,9.565660254026787,1.6290425329495672,2.8480985193475483,11.763812557708423,6.158802393980358,8.63226410965952,13.640839445338756,6.185286910739083,13.84208441424156,11.786352727447484,11.061131901965942,11.676934613637112,1.7452809106230882,9.799860790235083,16.79685617307047,4.197099005277787,14.788502026951672,1.1464208969257639,11.43094593415416,2.396901332414525,5.931957331855089,12.64220555594143,14.494102704339404,14.851088960291182,2.7109510942052895,5.395972364853594,10.800042198892577,9.473420678373255,7.381584485555193,14.856786293273263,2.59952739017431,12.591988236745578,18.09281001096072,8.37312041560045,1.0671929004545389,8.141783925961406,17.408277720322822,2.8171808614727656,4.51541741621782,7.5610383307962525,13.427951303870294,1.8526468436491328,16.32043564103379,12.402277634061534,6.40826859215661,8.078945604104657,10.022211996246684,19.84216928081988,13.70166258818962,8.228635099609956,14.166085438571333,18.361527255000443,8.336262708157719,11.907074543906813,0.04223324960245467,17.95945011526326,4.099995195296291,19.146015562534785,0.9582709399402756,15.67969184007553,14.219804962286236,5.565010981458207,18.394524397969676,1.2728351633050972,5.883782400003756,14.078772370078578,5.999285001389136,15.209027086251332,3.3346401591889707,7.687123931001971,8.35951663233384,0.9915427882500927,2.6357650798105414,3.5503147600175966,3.8264220203698995,17.25891937690756,3.465993941829839,16.9861596018122,6.52648406968332,11.893242967584063,0.11916734806141083,18.913410629085135,16.593878903701395,2.866926447727587,3.1140295323464695,11.854215462468254,12.688951900218708,2.7375577182126687,0.07945781250501938,0.8174361306185274,15.627439216572338,9.079732332376764,17.32573231509378,0.019983249596484676,0.5503405904576164,16.765838356448963,10.737673297343235,17.748338334243336,1.1139398828921498,10.11639100204102,19.626332508628085,10.82306401035455,3.1196475243412225,11.770559415148924,7.260200495332012,14.03722784390586,13.303572780664151,10.365871834694822,6.608793441188596,1.9843617904634625,8.742693444573986,2.8130502667087898,8.325373016799325,10.741618938053993,5.278853864116222,4.701280964962087,4.501097952756692,1.79653842095147,16.69557566753665,7.1994247471607675,9.46657329820268,9.586139499379623,18.41357844031165,11.229825009697635,1.618040695214602,13.469203477153417,14.048939487534856,18.474014217748667,14.654777829832666,3.200619197649943,16.073323075082495,10.202425423074901,15.73551075943075,16.83808990775541,4.903707106808088,14.733146697299695,10.312779918342283,3.4384408268219335,14.334494065009205,14.812760382273575,14.735251829741113,8.07955292602017,14.086010645208006,3.0003831681710524,0.47889704684075607,16.37660622549966,17.207297382949818,10.132240532264394,16.92777396702871,10.872426635596941,8.719968139728387,7.040239706227758,8.596939124028214,0.8410672593778612,14.094483036283751,13.909992906895635,0.8428526646232148,13.123138495510114,1.4199946259651552,15.754623396732343,5.355385382672706,0.029641910488917844,5.466986330168737,10.763450143690768,10.141216121893684,0.4521708301547678,5.937448568467216,18.682527799974626,12.2113243597859,0.9881951168448477,16.680007002044736,4.19003677602265,6.417907525730593,9.084110294297476,15.450949062165641,10.212214324299659,14.106018962673165,10.697025802175396,9.156641208218419,0.813876211052067,9.771628746608311,15.72483164641703,14.029507135372722]}
},{}],42:[function(require,module,exports){
(function (__filename){
'use strict';

// MODULES //

var tape = require( 'tape' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var abs = require( '@stdlib/math/base/special/abs' );
var ln = require( '@stdlib/math/base/special/ln' );
var PINF = require( '@stdlib/constants/math/float64-pinf' );
var NINF = require( '@stdlib/constants/math/float64-ninf' );
var EPS = require( '@stdlib/constants/math/float64-eps' );
var factory = require( './../lib/factory.js' );


// FIXTURES //

var smallRange = require( './fixtures/julia/small_range.json' );
var mediumRange = require( './fixtures/julia/medium_range.json' );
var largeRange = require( './fixtures/julia/large_range.json' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.equal( typeof factory, 'function', 'main export is a function' );
	t.end();
});

tape( 'the function returns a function', function test( t ) {
	var logpdf = factory( 0.0, 1.0 );
	t.equal( typeof logpdf, 'function', 'returns a function' );
	t.end();
});

tape( 'if provided `NaN` for any parameter, the created function returns `NaN`', function test( t ) {
	var logpdf;
	var y;

	logpdf = factory( 0.0, 1.0, 0.5 );
	y = logpdf( NaN );
	t.equal( isnan( y ), true, 'returns NaN' );

	logpdf = factory( NaN, 1.0, 0.5 );
	y = logpdf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	logpdf = factory( 0.0, NaN, 0.5 );
	y = logpdf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	logpdf = factory( NaN, NaN, 0.5 );
	y = logpdf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	logpdf = factory( 0.0, NaN, NaN );
	y = logpdf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = logpdf( NaN );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = logpdf( NaN );
	t.equal( isnan( y ), true, 'returns NaN' );

	logpdf = factory( NaN, 1.0, NaN );
	y = logpdf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = logpdf( NaN );
	t.equal( isnan( y ), true, 'returns NaN' );

	logpdf = factory( NaN, NaN, 0.5 );
	y = logpdf( NaN );
	t.equal( isnan( y ), true, 'returns NaN' );

	logpdf = factory( NaN, NaN, NaN );

	y = logpdf( NaN );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'if provided valid parameters, the function returns a function which returns `-infinity` when provided a number larger than `b` for `x`', function test( t ) {
	var logpdf;
	var y;

	logpdf = factory( -10.0, 10.0, 0.0 );
	y = logpdf( PINF );
	t.equal( y, NINF, 'returns -infinity' );

	y = logpdf( 20.0 );
	t.equal( y, NINF, 'returns -infinity' );

	y = logpdf( 11.0 );
	t.equal( y, NINF, 'returns -infinity' );

	t.end();
});

tape( 'if provided valid parameters, the function returns a function which returns `0` when provided a number smaller than `a` for `x`', function test( t ) {
	var logpdf;
	var y;

	logpdf = factory( -10.0, 10.0, 0.0 );
	y = logpdf( NINF );
	t.equal( y, NINF, 'returns -infinity' );

	y = logpdf( -100.0 );
	t.equal( y, NINF, 'returns -infinity' );

	y = logpdf( -11.0 );
	t.equal( y, NINF, 'returns -infinity' );

	t.end();
});

tape( 'if provided parameters not satisfying `a <= c <= b`, the created function always returns `NaN`', function test( t ) {
	var logpdf;
	var y;

	logpdf = factory( 0.0, -1.0, 0.5 );

	y = logpdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = logpdf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	logpdf = factory( 0.0, NINF, 0.5 );
	y = logpdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	logpdf = factory( PINF, NINF, 0.0 );
	y = logpdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	logpdf = factory( 0.0, 10.0, 20.0 );
	y = logpdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	logpdf = factory( 0.0, 10.0, -10.0 );
	y = logpdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'if provided valid parameters, the created function returns `ln(2/(b-a))` in case `x = c`', function test( t ) {
	var logpdf;
	var a;
	var b;
	var c;

	a = 0.0;
	b = 2.0;
	c = 1.5;
	logpdf = factory( a, b, c );
	t.equal( logpdf( c ), ln( 2.0/(b-a) ), 'returns ln(2/(b-a))' );
	t.end();
});

tape( 'the created function evaluates the logpdf for `x` given small range `b - a`', function test( t ) {
	var expected;
	var logpdf;
	var delta;
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
		logpdf = factory( a[i], b[i], c[i] );
		y = logpdf( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', a: '+a[i]+', b: '+b[i]+', c: '+c[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 40.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. a: '+a[i]+'. b: '+b[i]+'. c: '+c[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the created function evaluates the logpdf for `x` given a medium range `b - a`', function test( t ) {
	var expected;
	var logpdf;
	var delta;
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
		logpdf = factory( a[i], b[i], c[i] );
		y = logpdf( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', a: '+a[i]+', b: '+b[i]+', c: '+c[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 60.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. a: '+a[i]+'. b: '+b[i]+'. c: '+c[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the created function evaluates the logpdf for `x` given a large range `b - a`', function test( t ) {
	var expected;
	var logpdf;
	var delta;
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
		logpdf = factory( a[i], b[i], c[i] );
		y = logpdf( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', a: '+a[i]+', b: '+b[i]+', c: '+c[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 50.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. a: '+a[i]+'. b: '+b[i]+'. c: '+c[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

}).call(this,"/lib/node_modules/@stdlib/math/base/dists/triangular/logpdf/test/test.factory.js")
},{"./../lib/factory.js":36,"./fixtures/julia/large_range.json":39,"./fixtures/julia/medium_range.json":40,"./fixtures/julia/small_range.json":41,"@stdlib/constants/math/float64-eps":26,"@stdlib/constants/math/float64-ninf":29,"@stdlib/constants/math/float64-pinf":30,"@stdlib/math/base/assert/is-nan":34,"@stdlib/math/base/special/abs":46,"@stdlib/math/base/special/ln":47,"tape":136}],43:[function(require,module,exports){
(function (__filename){
'use strict';

// MODULES //

var tape = require( 'tape' );
var logpdf = require( './../lib' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.equal( typeof logpdf, 'function', 'main export is a function' );
	t.end();
});

tape( 'attached to the main export is a factory method for generating `logpdf` functions', function test( t ) {
	t.equal( typeof logpdf.factory, 'function', 'exports a factory method' );
	t.end();
});

}).call(this,"/lib/node_modules/@stdlib/math/base/dists/triangular/logpdf/test/test.js")
},{"./../lib":37,"tape":136}],44:[function(require,module,exports){
(function (__filename){
'use strict';

// MODULES //

var tape = require( 'tape' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var abs = require( '@stdlib/math/base/special/abs' );
var ln = require( '@stdlib/math/base/special/ln' );
var PINF = require( '@stdlib/constants/math/float64-pinf' );
var NINF = require( '@stdlib/constants/math/float64-ninf' );
var EPS = require( '@stdlib/constants/math/float64-eps' );
var logpdf = require( './../lib' );


// FIXTURES //

var smallRange = require( './fixtures/julia/small_range.json' );
var mediumRange = require( './fixtures/julia/medium_range.json' );
var largeRange = require( './fixtures/julia/large_range.json' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.equal( typeof logpdf, 'function', 'main export is a function' );
	t.end();
});

tape( 'if provided `NaN` for any parameter, the function returns `NaN`', function test( t ) {
	var y = logpdf( NaN, 0.0, 1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );
	y = logpdf( 0.0, NaN, 1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );
	y = logpdf( 0.0, 1.0, NaN );
	t.equal( isnan( y ), true, 'returns NaN' );
	t.end();
});

tape( 'if provided a number greater than `b` for `x` and valid parameters, the function returns `-infinity`', function test( t ) {
	var y = logpdf( PINF, 0.0, 1.0, 0.5 );
	t.equal( y, NINF, 'returns -infinity' );

	y = logpdf( 20.0, 0.0, 1.0, 0.5 );
	t.equal( y, NINF, 'returns -infinity' );

	y = logpdf( 2.0, 0.0, 1.0, 0.5 );
	t.equal( y, NINF, 'returns -infinity' );

	y = logpdf( 1.1, 0.0, 1.0, 0.5 );
	t.equal( y, NINF, 'returns -infinity' );

	t.end();
});

tape( 'if provided a number smaller than `a` for `x` and valid parameters, the function returns `-infinity`', function test( t ) {
	var y = logpdf( NINF, 0.0, 1.0, 0.5 );
	t.equal( y, NINF, 'returns -infinity' );

	y = logpdf( -20.0, 0.0, 1.0, 0.5 );
	t.equal( y, NINF, 'returns -infinity' );

	y = logpdf( -2.0, 0.0, 1.0, 0.5 );
	t.equal( y, NINF, 'returns -infinity' );

	y = logpdf( -0.5, 0.0, 1.0, 0.5 );
	t.equal( y, NINF, 'returns -infinity' );

	t.end();
});

tape( 'if provided parameters not satisfying `a <= c <= b`, the function returns `NaN`', function test( t ) {
	var y;

	y = logpdf( 2.0, 3.0, 2.0, 2.5 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = logpdf( 0.0, 2.0, 3.0, 4.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = logpdf( 2.0, 2.0, 3.0, 1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = logpdf( 2.0, PINF, NINF, 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'the function returns `ln(2/(b-a))` if provided `x = c`', function test( t ) {
	var a = 0.0;
	var b = 2.0;
	var c = 1.5;
	t.equal( logpdf( c, a, b, c ), ln( 2.0/(b-a) ), 'returns ln(2/(b-a))' );
	t.end();
});

tape( 'the function evaluates the logpdf for `x` given a small range `b - a`', function test( t ) {
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
		y = logpdf( x[i], a[i], b[i], c[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', a: '+a[i]+', b: '+b[i]+', c: '+c[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 40.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. a: '+a[i]+'. b: '+b[i]+'. c: '+c[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the function evaluates the logpdf for `x` given a medium range `b - a`', function test( t ) {
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
		y = logpdf( x[i], a[i], b[i], c[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', a: '+a[i]+', b: '+b[i]+', c: '+c[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 60.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. a: '+a[i]+'. b: '+b[i]+'. c: '+c[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the function evaluates the logpdf for `x` given a large range `b - a`', function test( t ) {
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
		y = logpdf( x[i], a[i], b[i], c[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', a: '+a[i]+', b: '+b[i]+', c: '+c[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 50.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. a: '+a[i]+'. b: '+b[i]+'. c: '+c[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

}).call(this,"/lib/node_modules/@stdlib/math/base/dists/triangular/logpdf/test/test.logpdf.js")
},{"./../lib":37,"./fixtures/julia/large_range.json":39,"./fixtures/julia/medium_range.json":40,"./fixtures/julia/small_range.json":41,"@stdlib/constants/math/float64-eps":26,"@stdlib/constants/math/float64-ninf":29,"@stdlib/constants/math/float64-pinf":30,"@stdlib/math/base/assert/is-nan":34,"@stdlib/math/base/special/abs":46,"@stdlib/math/base/special/ln":47,"tape":136}],45:[function(require,module,exports){
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

},{}],46:[function(require,module,exports){
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

},{"./abs.js":45}],47:[function(require,module,exports){
'use strict';

/**
* Evaluate the natural logarithm.
*
* @module @stdlib/math/base/special/ln
*
* @example
* var ln = require( '@stdlib/math/base/special/ln' );
*
* var v = ln( 4.0 );
* // returns ~1.386
*
* v = ln( 0.0 );
* // returns -Infinity
*
* v = ln( Infinity );
* // returns Infinity
*
* v = ln( NaN );
* // returns NaN
*
* v = ln( -4.0 );
* // returns NaN
*/

// MODULES //

var ln = require( './ln.js' );


// EXPORTS //

module.exports = ln;

},{"./ln.js":48}],48:[function(require,module,exports){
'use strict';

/*
* The following copyright, license, and long comment were part of the original implementation available as part of [FreeBSD]{@link https://svnweb.freebsd.org/base/release/9.3.0/lib/msun/src/e_log.c?view=markup}.
*
* The implementation follows the original, but has been modified for JavaScript.
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

var getHighWord = require( '@stdlib/number/float64/base/get-high-word' );
var setHighWord = require( '@stdlib/number/float64/base/set-high-word' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var BIAS = require( '@stdlib/constants/math/float64-exponent-bias' );
var NINF = require( '@stdlib/constants/math/float64-ninf' );
var polyvalP = require( './polyval_p.js' );
var polyvalQ = require( './polyval_q.js' );


// VARIABLES //

var LN2_HI = 6.93147180369123816490e-01; // 3FE62E42 FEE00000
var LN2_LO = 1.90821492927058770002e-10; // 3DEA39EF 35793C76
var TWO54 = 1.80143985094819840000e+16;  // 0x43500000, 0x00000000
var ONE_THIRD = 0.33333333333333333;

// 0x000fffff = 1048575 => 0 00000000000 11111111111111111111
var HIGH_SIGNIFICAND_MASK = 0x000fffff|0; // asm type annotation

// 0x7ff00000 = 2146435072 => 0 11111111111 00000000000000000000 => biased exponent: 2047 = 1023+1023 => 2^1023
var HIGH_MAX_NORMAL_EXP = 0x7ff00000|0; // asm type annotation

// 0x00100000 = 1048576 => 0 00000000001 00000000000000000000 => biased exponent: 1 = -1022+1023 => 2^-1022
var HIGH_MIN_NORMAL_EXP = 0x00100000|0; // asm type annotation

// 0x3ff00000 = 1072693248 => 0 01111111111 00000000000000000000 => biased exponent: 1023 = 0+1023 => 2^0 = 1
var HIGH_BIASED_EXP_0 = 0x3ff00000|0; // asm type annotation


// MAIN //

/**
* Evaluates the natural logarithm.
*
* @param {NonNegativeNumber} x - input value
* @returns {number} function value
*
* @example
* var v = ln( 4.0 );
* // returns ~1.386
*
* @example
* var v = ln( 0.0 );
* // returns -Infinity
*
* @example
* var v = ln( Infinity );
* // returns Infinity
*
* @example
* var v = ln( NaN );
* // returns NaN
*
* @example
* var v = ln( -4.0 );
* // returns NaN
*/
function ln( x ) {
	var hfsq;
	var hx;
	var t2;
	var t1;
	var k;
	var R;
	var f;
	var i;
	var j;
	var s;
	var w;
	var z;

	if ( x === 0.0 ) {
		return NINF;
	}
	if ( isnan( x ) || x < 0.0 ) {
		return NaN;
	}
	hx = getHighWord( x );
	k = 0|0; // asm type annotation
	if ( hx < HIGH_MIN_NORMAL_EXP ) {
		// Case: 0 < x < 2**-1022
		k -= 54|0; // asm type annotation

		// Subnormal number, scale up `x`:
		x *= TWO54;
		hx = getHighWord( x );
	}
	if ( hx >= HIGH_MAX_NORMAL_EXP ) {
		return x + x;
	}
	k += ( ( hx>>20 ) - BIAS )|0; // asm type annotation
	hx &= HIGH_SIGNIFICAND_MASK;
	i = ( (hx+0x95f64) & 0x100000 )|0; // asm type annotation

	// Normalize `x` or `x/2`...
	x = setHighWord( x, hx|(i^HIGH_BIASED_EXP_0) );
	k += ( i>>20 )|0; // asm type annotation
	f = x - 1.0;
	if ( (HIGH_SIGNIFICAND_MASK&(2+hx)) < 3 ) {
		// Case: -2**-20 <= f < 2**-20
		if ( f === 0.0 ) {
			if ( k === 0 ) {
				return 0.0;
			}
			return (k * LN2_HI) + (k * LN2_LO);
		}
		R = f * f * ( 0.5 - (ONE_THIRD*f) );
		if ( k === 0 ) {
			return f - R;
		}
		return (k * LN2_HI) - ( (R-(k*LN2_LO)) - f );
	}
	s = f / (2.0 + f);
	z = s * s;
	i = ( hx - 0x6147a )|0; // asm type annotation
	w = z * z;
	j = ( 0x6b851 - hx )|0; // asm type annotation
	t1 = w * polyvalP( w );
	t2 = z * polyvalQ( w );
	i |= j;
	R = t2 + t1;
	if ( i > 0 ) {
		hfsq = 0.5 * f * f;
		if ( k === 0 ) {
			return f - ( hfsq - (s * (hfsq+R)) );
		}
		return (k * LN2_HI) - ( hfsq - ((s*(hfsq+R))+(k*LN2_LO)) - f );
	}
	if ( k === 0 ) {
		return f - (s*(f-R));
	}
	return (k * LN2_HI) - ( ( (s*(f-R)) - (k*LN2_LO) ) - f );
}


// EXPORTS //

module.exports = ln;

},{"./polyval_p.js":49,"./polyval_q.js":50,"@stdlib/constants/math/float64-exponent-bias":27,"@stdlib/constants/math/float64-ninf":29,"@stdlib/math/base/assert/is-nan":34,"@stdlib/number/float64/base/get-high-word":52,"@stdlib/number/float64/base/set-high-word":55}],49:[function(require,module,exports){
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
		return 0.3999999999940942;
	}
	return 0.3999999999940942 + (x * (0.22222198432149784 + (x * 0.15313837699209373))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

},{}],50:[function(require,module,exports){
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
	return 0.6666666666666735 + (x * (0.2857142874366239 + (x * (0.1818357216161805 + (x * 0.14798198605116586))))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

},{}],51:[function(require,module,exports){
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

},{"@stdlib/assert/is-little-endian":18}],52:[function(require,module,exports){
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

},{"./main.js":53}],53:[function(require,module,exports){
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

},{"./high.js":51,"@stdlib/array/float64":2,"@stdlib/array/uint32":7}],54:[function(require,module,exports){
arguments[4][51][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":18,"dup":51}],55:[function(require,module,exports){
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

},{"./main.js":56}],56:[function(require,module,exports){
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

},{"./high.js":54,"@stdlib/array/float64":2,"@stdlib/array/uint32":7}],57:[function(require,module,exports){
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
	* @returns {*} constant value
	*/
	function constantFunction() {
		return value;
	}
}


// EXPORTS //

module.exports = wrap;

},{}],58:[function(require,module,exports){
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

var constantFunction = require( './constant_function.js' );


// EXPORTS //

module.exports = constantFunction;

},{"./constant_function.js":57}],59:[function(require,module,exports){
'use strict';

/**
* Defines a read-only property.
*
* @param {Object} obj - object on which to define the property
* @param {string} prop - property name
* @param {*} value - value to set
*
* @example
* var obj = {};
* setReadOnly( obj, 'foo', 'bar' );
* obj.foo = 'boop'; // => throws
*/
function setReadOnly( obj, prop, value ) {
	Object.defineProperty( obj, prop, {
		'value': value,
		'configurable': false,
		'writable': false,
		'enumerable': true
	});
}


// EXPORTS //

module.exports = setReadOnly;

},{}],60:[function(require,module,exports){
'use strict';

/**
* Defines a read-only property.
*
* @module @stdlib/utils/define-read-only-property
*
* @example
* var setReadOnly = require( '@stdlib/utils/define-read-only-property' );
*
* var obj = {};
* setReadOnly( obj, 'foo', 'bar' );
* obj.foo = 'boop'; // => throws
*/

// MODULES //

var setReadOnly = require( './define_read_only_property.js' );


// EXPORTS //

module.exports = setReadOnly;

},{"./define_read_only_property.js":59}],61:[function(require,module,exports){
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

},{"./float64array.js":62,"@stdlib/assert/is-float64array":15}],62:[function(require,module,exports){
'use strict';

// EXPORTS //

module.exports = ( typeof Float64Array === 'function' ) ? Float64Array : null;

},{}],63:[function(require,module,exports){
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

},{"./detect_float64array_support.js":61}],64:[function(require,module,exports){
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

},{}],65:[function(require,module,exports){
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

},{"./detect_symbol_support.js":64}],66:[function(require,module,exports){
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

},{"@stdlib/utils/detect-symbol-support":65}],67:[function(require,module,exports){
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

},{"./has_tostringtag_support.js":66}],68:[function(require,module,exports){
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

},{"./uint16array.js":70,"@stdlib/assert/is-uint16array":20,"@stdlib/constants/math/uint16-max":31}],69:[function(require,module,exports){
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

},{"./detect_uint16array_support.js":68}],70:[function(require,module,exports){
'use strict';

// EXPORTS //

module.exports = ( typeof Uint16Array === 'function' ) ? Uint16Array : null;

},{}],71:[function(require,module,exports){
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

},{"./uint32array.js":73,"@stdlib/assert/is-uint32array":22,"@stdlib/constants/math/uint32-max":32}],72:[function(require,module,exports){
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

},{"./detect_uint32array_support.js":71}],73:[function(require,module,exports){
'use strict';

// EXPORTS //

module.exports = ( typeof Uint32Array === 'function' ) ? Uint32Array : null;

},{}],74:[function(require,module,exports){
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

},{"./uint8array.js":76,"@stdlib/assert/is-uint8array":24,"@stdlib/constants/math/uint8-max":33}],75:[function(require,module,exports){
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

},{"./detect_uint8array_support.js":74}],76:[function(require,module,exports){
'use strict';

// EXPORTS //

module.exports = ( typeof Uint8Array === 'function' ) ? Uint8Array : null;

},{}],77:[function(require,module,exports){
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

},{"./native_class.js":78,"./polyfill.js":79,"@stdlib/utils/detect-tostringtag-support":67}],78:[function(require,module,exports){
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

},{"./tostring.js":80}],79:[function(require,module,exports){
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

},{"./tostring.js":80,"./tostringtag.js":81,"@stdlib/assert/has-own-property":14}],80:[function(require,module,exports){
'use strict';

// MAIN //

var toStr = Object.prototype.toString;


// EXPORTS //

module.exports = toStr;

},{}],81:[function(require,module,exports){
'use strict';

// MAIN //

var toStrTag = ( typeof Symbol === 'function' ) ? Symbol.toStringTag : '';


// EXPORTS //

module.exports = toStrTag;

},{}],82:[function(require,module,exports){
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

},{}],83:[function(require,module,exports){

},{}],84:[function(require,module,exports){
arguments[4][83][0].apply(exports,arguments)
},{"dup":83}],85:[function(require,module,exports){
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

},{}],86:[function(require,module,exports){
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

},{"base64-js":82,"ieee754":105}],87:[function(require,module,exports){
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
},{"../../is-buffer/index.js":107}],88:[function(require,module,exports){
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

},{"./lib/is_arguments.js":89,"./lib/keys.js":90}],89:[function(require,module,exports){
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

},{}],90:[function(require,module,exports){
exports = module.exports = typeof Object.keys === 'function'
  ? Object.keys : shim;

exports.shim = shim;
function shim (obj) {
  var keys = [];
  for (var key in obj) keys.push(key);
  return keys;
}

},{}],91:[function(require,module,exports){
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

},{"foreach":101,"object-keys":111}],92:[function(require,module,exports){
module.exports = function () {
    for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] !== undefined) return arguments[i];
    }
};

},{}],93:[function(require,module,exports){
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

},{"./helpers/isFinite":94,"./helpers/isNaN":95,"./helpers/mod":96,"./helpers/sign":97,"es-to-primitive/es5":98,"has":104,"is-callable":108}],94:[function(require,module,exports){
var $isNaN = Number.isNaN || function (a) { return a !== a; };

module.exports = Number.isFinite || function (x) { return typeof x === 'number' && !$isNaN(x) && x !== Infinity && x !== -Infinity; };

},{}],95:[function(require,module,exports){
module.exports = Number.isNaN || function isNaN(a) {
	return a !== a;
};

},{}],96:[function(require,module,exports){
module.exports = function mod(number, modulo) {
	var remain = number % modulo;
	return Math.floor(remain >= 0 ? remain : remain + modulo);
};

},{}],97:[function(require,module,exports){
module.exports = function sign(number) {
	return number >= 0 ? 1 : -1;
};

},{}],98:[function(require,module,exports){
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

},{"./helpers/isPrimitive":99,"is-callable":108}],99:[function(require,module,exports){
module.exports = function isPrimitive(value) {
	return value === null || (typeof value !== 'function' && typeof value !== 'object');
};

},{}],100:[function(require,module,exports){
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

},{}],101:[function(require,module,exports){

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


},{}],102:[function(require,module,exports){
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

},{}],103:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

module.exports = Function.prototype.bind || implementation;

},{"./implementation":102}],104:[function(require,module,exports){
var bind = require('function-bind');

module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);

},{"function-bind":103}],105:[function(require,module,exports){
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

},{}],106:[function(require,module,exports){
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

},{}],107:[function(require,module,exports){
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

},{}],108:[function(require,module,exports){
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

},{}],109:[function(require,module,exports){
var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};

},{}],110:[function(require,module,exports){
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

},{}],111:[function(require,module,exports){
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

},{"./isArguments":112}],112:[function(require,module,exports){
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

},{}],113:[function(require,module,exports){
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
},{"_process":85}],114:[function(require,module,exports){
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
},{"_process":85}],115:[function(require,module,exports){
module.exports = require('./lib/_stream_duplex.js');

},{"./lib/_stream_duplex.js":116}],116:[function(require,module,exports){
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
},{"./_stream_readable":118,"./_stream_writable":120,"core-util-is":87,"inherits":106,"process-nextick-args":114}],117:[function(require,module,exports){
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
},{"./_stream_transform":119,"core-util-is":87,"inherits":106}],118:[function(require,module,exports){
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
},{"./_stream_duplex":116,"./internal/streams/BufferList":121,"./internal/streams/destroy":122,"./internal/streams/stream":123,"_process":85,"core-util-is":87,"events":100,"inherits":106,"isarray":109,"process-nextick-args":114,"safe-buffer":129,"string_decoder/":135,"util":83}],119:[function(require,module,exports){
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
},{"./_stream_duplex":116,"core-util-is":87,"inherits":106}],120:[function(require,module,exports){
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
},{"./_stream_duplex":116,"./internal/streams/destroy":122,"./internal/streams/stream":123,"_process":85,"core-util-is":87,"inherits":106,"process-nextick-args":114,"safe-buffer":129,"util-deprecate":142}],121:[function(require,module,exports){
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
},{"safe-buffer":129}],122:[function(require,module,exports){
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
},{"process-nextick-args":114}],123:[function(require,module,exports){
module.exports = require('events').EventEmitter;

},{"events":100}],124:[function(require,module,exports){
module.exports = require('./readable').PassThrough

},{"./readable":125}],125:[function(require,module,exports){
exports = module.exports = require('./lib/_stream_readable.js');
exports.Stream = exports;
exports.Readable = exports;
exports.Writable = require('./lib/_stream_writable.js');
exports.Duplex = require('./lib/_stream_duplex.js');
exports.Transform = require('./lib/_stream_transform.js');
exports.PassThrough = require('./lib/_stream_passthrough.js');

},{"./lib/_stream_duplex.js":116,"./lib/_stream_passthrough.js":117,"./lib/_stream_readable.js":118,"./lib/_stream_transform.js":119,"./lib/_stream_writable.js":120}],126:[function(require,module,exports){
module.exports = require('./readable').Transform

},{"./readable":125}],127:[function(require,module,exports){
module.exports = require('./lib/_stream_writable.js');

},{"./lib/_stream_writable.js":120}],128:[function(require,module,exports){
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
},{"_process":85,"through":141}],129:[function(require,module,exports){
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

},{"buffer":86}],130:[function(require,module,exports){
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

},{"events":100,"inherits":106,"readable-stream/duplex.js":115,"readable-stream/passthrough.js":124,"readable-stream/readable.js":125,"readable-stream/transform.js":126,"readable-stream/writable.js":127}],131:[function(require,module,exports){
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

},{"es-abstract/es5":93,"function-bind":103}],132:[function(require,module,exports){
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

},{"./implementation":131,"./polyfill":133,"./shim":134,"define-properties":91,"function-bind":103}],133:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

var zeroWidthSpace = '\u200b';

module.exports = function getPolyfill() {
	if (String.prototype.trim && zeroWidthSpace.trim() === zeroWidthSpace) {
		return String.prototype.trim;
	}
	return implementation;
};

},{"./implementation":131}],134:[function(require,module,exports){
'use strict';

var define = require('define-properties');
var getPolyfill = require('./polyfill');

module.exports = function shimStringTrim() {
	var polyfill = getPolyfill();
	define(String.prototype, { trim: polyfill }, { trim: function () { return String.prototype.trim !== polyfill; } });
	return polyfill;
};

},{"./polyfill":133,"define-properties":91}],135:[function(require,module,exports){
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
},{"safe-buffer":129}],136:[function(require,module,exports){
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
},{"./lib/default_stream":137,"./lib/results":139,"./lib/test":140,"_process":85,"defined":92,"through":141}],137:[function(require,module,exports){
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
},{"_process":85,"fs":84,"through":141}],138:[function(require,module,exports){
(function (process){
module.exports = typeof setImmediate !== 'undefined'
    ? setImmediate
    : process.nextTick
;

}).call(this,require('_process'))
},{"_process":85}],139:[function(require,module,exports){
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
},{"_process":85,"events":100,"function-bind":103,"has":104,"inherits":106,"object-inspect":110,"resumer":128,"through":141}],140:[function(require,module,exports){
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
},{"./next_tick":138,"deep-equal":88,"defined":92,"events":100,"has":104,"inherits":106,"path":113,"string.prototype.trim":132}],141:[function(require,module,exports){
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
},{"_process":85,"stream":130}],142:[function(require,module,exports){
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
},{}]},{},[42,43,44]);
