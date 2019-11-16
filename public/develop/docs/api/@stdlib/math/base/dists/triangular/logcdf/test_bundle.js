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

},{"./float64array.js":1,"./polyfill.js":3,"@stdlib/utils/detect-float64array-support":111}],3:[function(require,module,exports){
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

},{"./polyfill.js":5,"./uint16array.js":6,"@stdlib/utils/detect-uint16array-support":117}],5:[function(require,module,exports){
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

},{"./polyfill.js":8,"./uint32array.js":9,"@stdlib/utils/detect-uint32array-support":120}],8:[function(require,module,exports){
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

},{"./polyfill.js":11,"./uint8array.js":12,"@stdlib/utils/detect-uint8array-support":123}],11:[function(require,module,exports){
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

},{"@stdlib/utils/native-class":125}],17:[function(require,module,exports){
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

},{"@stdlib/utils/native-class":125}],22:[function(require,module,exports){
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

},{"@stdlib/utils/native-class":125}],24:[function(require,module,exports){
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

},{"@stdlib/utils/native-class":125}],26:[function(require,module,exports){
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
* High word mask for the exponent of a double-precision floating-point number.
*
* @module @stdlib/constants/math/float64-high-word-exponent-mask
* @type {uinteger32}
*
* @example
* var FLOAT64_HIGH_WORD_EXPONENT_MASK = require( '@stdlib/constants/math/float64-high-word-exponent-mask' );
* // returns 2146435072
*/


// MAIN //

/**
* High word mask for the exponent of a double-precision floating-point number.
*
* ## Notes
*
* The high word mask for the exponent of a double-precision floating-point number is an unsigned 32-bit integer with the value \\( 2146435072 \\), which corresponds to the bit sequence
*
* ```binarystring
* 0 11111111111 00000000000000000000
* ```
*
* @constant
* @type {uinteger32}
* @default 0x7ff00000
* @see [IEEE 754]{@link https://en.wikipedia.org/wiki/IEEE_754-1985}
*/
var FLOAT64_HIGH_WORD_EXPONENT_MASK = 0x7ff00000;


// EXPORTS //

module.exports = FLOAT64_HIGH_WORD_EXPONENT_MASK;

},{}],29:[function(require,module,exports){
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

},{}],30:[function(require,module,exports){
'use strict';

/**
* The maximum biased base 2 exponent for a subnormal double-precision floating-point number.
*
* @module @stdlib/constants/math/float64-max-base2-exponent-subnormal
* @type {integer32}
*
* @example
* var FLOAT64_MAX_BASE2_EXPONENT_SUBNORMAL = require( '@stdlib/constants/math/float64-max-base2-exponent-subnormal' );
* // returns -1023
*/


// MAIN //

/**
* The maximum biased base 2 exponent for a subnormal double-precision floating-point number.
*
* ```text
* 00000000000 => 0 - BIAS = -1023
* ```
*
* where `BIAS = 1023`.
*
* @constant
* @type {integer32}
* @default -1023
* @see [IEEE 754]{@link https://en.wikipedia.org/wiki/IEEE_754-1985}
*/
var FLOAT64_MAX_BASE2_EXPONENT_SUBNORMAL = -1023|0; // asm type annotation


// EXPORTS //

module.exports = FLOAT64_MAX_BASE2_EXPONENT_SUBNORMAL;

},{}],31:[function(require,module,exports){
'use strict';

/**
* The maximum biased base 2 exponent for a double-precision floating-point number.
*
* @module @stdlib/constants/math/float64-max-base2-exponent
* @type {integer32}
*
* @example
* var FLOAT64_MAX_BASE2_EXPONENT = require( '@stdlib/constants/math/float64-max-base2-exponent' );
* // returns 1023
*/


// MAIN //

/**
* The maximum biased base 2 exponent for a double-precision floating-point number.
*
* ```text
* 11111111110 => 2046 - BIAS = 1023
* ```
*
* where `BIAS = 1023`.
*
* @constant
* @type {integer32}
* @default 1023
* @see [IEEE 754]{@link https://en.wikipedia.org/wiki/IEEE_754-1985}
*/
var FLOAT64_MAX_BASE2_EXPONENT = 1023|0; // asm type annotation


// EXPORTS //

module.exports = FLOAT64_MAX_BASE2_EXPONENT;

},{}],32:[function(require,module,exports){
'use strict';

/**
* The minimum biased base 2 exponent for a subnormal double-precision floating-point number.
*
* @module @stdlib/constants/math/float64-min-base2-exponent-subnormal
* @type {integer32}
*
* @example
* var FLOAT64_MIN_BASE2_EXPONENT_SUBNORMAL = require( '@stdlib/constants/math/float64-min-base2-exponent-subnormal' );
* // returns -1074
*/


// MAIN //

/**
* The minimum biased base 2 exponent for a subnormal double-precision floating-point number.
*
* ```text
* -(BIAS+(52-1)) = -(1023+51) = -1074
* ```
*
* where `BIAS = 1023` and `52` is the number of digits in the significand.
*
* @constant
* @type {integer32}
* @default -1074
* @see [IEEE 754]{@link https://en.wikipedia.org/wiki/IEEE_754-1985}
*/
var FLOAT64_MIN_BASE2_EXPONENT_SUBNORMAL = -1074|0; // asm type annotation


// EXPORTS //

module.exports = FLOAT64_MIN_BASE2_EXPONENT_SUBNORMAL;

},{}],33:[function(require,module,exports){
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

},{}],34:[function(require,module,exports){
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

},{}],35:[function(require,module,exports){
'use strict';

/**
* Smallest positive double-precision floating-point normal number.
*
* @module @stdlib/constants/math/float64-smallest-normal
* @type {number}
*
* @example
* var FLOAT64_SMALLEST_NORMAL = require( '@stdlib/constants/math/float64-smallest-normal' );
* // returns 2.2250738585072014e-308
*/


// MAIN //

/**
* The smallest positive double-precision floating-point normal number.
*
* ## Notes
*
* The number has the value
*
* ```tex
* \frac{1}{2^{1023-1}}
* ```
*
* which corresponds to the bit sequence
*
* ```binarystring
* 0 00000000001 00000000000000000000 00000000000000000000000000000000
* ```
*
* @constant
* @type {number}
* @default 2.2250738585072014e-308
* @see [IEEE 754]{@link https://en.wikipedia.org/wiki/IEEE_754-1985}
*/
var FLOAT64_SMALLEST_NORMAL = 2.2250738585072014e-308;


// EXPORTS //

module.exports = FLOAT64_SMALLEST_NORMAL;

},{}],36:[function(require,module,exports){
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

},{}],37:[function(require,module,exports){
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

},{}],38:[function(require,module,exports){
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

},{}],39:[function(require,module,exports){
'use strict';

/**
* Test if a finite numeric value is an even number.
*
* @module @stdlib/math/base/assert/is-even
*
* @example
* var isEven = require( '@stdlib/math/base/assert/is-even' );
*
* var bool = isEven( 5.0 );
* // returns false
*
* bool = isEven( -2.0 );
* // returns true
*
* bool = isEven( 0.0 );
* // returns true
*
* bool = isEven( NaN );
* // returns false
*/

// MODULES //

var isEven = require( './is_even.js' );


// EXPORTS //

module.exports = isEven;

},{"./is_even.js":40}],40:[function(require,module,exports){
'use strict';

// MODULES //

var isInteger = require( '@stdlib/math/base/assert/is-integer' );


// MAIN //

/**
* Tests if a finite numeric value is an even number.
*
* @param {number} x - value to test
* @returns {boolean} boolean indicating whether the value is an even number
*
* @example
* var bool = isEven( 5.0 );
* // returns false
*
* @example
* var bool = isEven( -2.0 );
* // returns true
*
* @example
* var bool = isEven( 0.0 );
* // returns true
*
* @example
* var bool = isEven( NaN );
* // returns false
*/
function isEven( x ) {
	return isInteger( x/2.0 );
}


// EXPORTS //

module.exports = isEven;

},{"@stdlib/math/base/assert/is-integer":43}],41:[function(require,module,exports){
'use strict';

/**
* Test if a numeric value is infinite.
*
* @module @stdlib/assert/is-infinite
*
* @example
* var isInfinite = require( '@stdlib/math/base/assert/is-infinite' );
*
* var bool = isInfinite( Infinity );
* // returns true
*
* bool = isInfinite( -Infinity );
* // returns true
*
* bool = isInfinite( 5.0 );
* // returns false
*
* bool = isInfinite( NaN );
* // returns false
*/

// MODULES //

var isInfinite = require( './is_infinite.js' );


// EXPORTS //

module.exports = isInfinite;

},{"./is_infinite.js":42}],42:[function(require,module,exports){
'use strict';

// MODULES //

var PINF = require( '@stdlib/constants/math/float64-pinf' );
var NINF = require( '@stdlib/constants/math/float64-ninf' );


// MAIN //

/**
* Tests if a numeric value is infinite.
*
* @param {number} x - value to test
* @returns {boolean} boolean indicating whether the value is infinite
*
* @example
* var bool = isInfinite( Infinity );
* // returns true
*
* @example
* var bool = isInfinite( -Infinity );
* // returns true
*
* @example
* var bool = isInfinite( 5.0 );
* // returns false
*
* @example
* var bool = isInfinite( NaN );
* // returns false
*/
function isInfinite( x ) {
	return (x === PINF || x === NINF);
}


// EXPORTS //

module.exports = isInfinite;

},{"@stdlib/constants/math/float64-ninf":33,"@stdlib/constants/math/float64-pinf":34}],43:[function(require,module,exports){
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

},{"./is_integer.js":44}],44:[function(require,module,exports){
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

},{"@stdlib/math/base/special/floor":63}],45:[function(require,module,exports){
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

},{"./is_nan.js":46}],46:[function(require,module,exports){
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

},{}],47:[function(require,module,exports){
'use strict';

/**
* Test if a finite numeric value is an odd number.
*
* @module @stdlib/math/base/assert/is-odd
*
* @example
* var isOdd = require( '@stdlib/math/base/assert/is-odd' );
*
* var bool = isOdd( 5.0 );
* // returns true
*
* bool = isOdd( -2.0 );
* // returns false
*
* bool = isOdd( 0.0 );
* // returns false
*
* bool = isOdd( NaN );
* // returns false
*/

// MODULES //

var isOdd = require( './is_odd.js' );


// EXPORTS //

module.exports = isOdd;

},{"./is_odd.js":48}],48:[function(require,module,exports){
'use strict';

// MODULES //

var isEven = require( '@stdlib/math/base/assert/is-even' );


// MAIN //

/**
* Tests if a finite numeric value is an odd number.
*
* @param {number} x - value to test
* @returns {boolean} boolean indicating whether the value is an odd number
*
* @example
* var bool = isOdd( 5.0 );
* // returns true
*
* @example
* var bool = isOdd( -2.0 );
* // returns false
*
* @example
* var bool = isOdd( 0.0 );
* // returns false
*
* @example
* var bool = isOdd( NaN );
* // returns false
*/
function isOdd( x ) {
	// Check sign to prevent overflow...
	if ( x > 0.0 ) {
		return isEven( x-1.0 );
	}
	return isEven( x+1.0 );
}


// EXPORTS //

module.exports = isOdd;

},{"@stdlib/math/base/assert/is-even":39}],49:[function(require,module,exports){
'use strict';

// MODULES //

var constantFunction = require( '@stdlib/utils/constant-function' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var pow = require( '@stdlib/math/base/special/pow' );
var ln = require( '@stdlib/math/base/special/ln' );
var NINF = require( '@stdlib/constants/math/float64-ninf' );


// MAIN //

/**
* Returns a function for evaluating the natural logarithm of the cumulative distribution function (CDF) for a triangular distribution with lower limit `a` and upper limit `b` and mode `c`.
*
* @param {number} a - lower limit
* @param {number} b - upper limit
* @param {number} c - mode
* @returns {Function} logCDF
*
* @example
* var logcdf = factory( 0.0, 10.0, 2.0 );
* var y = logcdf( 0.5 );
* // returns ~-4.382
*
* y = logcdf( 8.0 );
* // returns ~-0.051
*/
function factory( a, b, c ) {
	var denom1;
	var denom2;

	if (
		isnan( a ) ||
		isnan( b ) ||
		isnan( c )
	) {
		return constantFunction( NaN );
	}
	if ( !( a <= c && c <= b ) ) {
		return constantFunction( NaN );
	}

	denom1 = ( b - a ) * ( c - a );
	denom2 = ( b - a ) * ( b - c );
	return logcdf;

	/**
	* Evaluates the natural logarithm of the cumulative distribution function (CDF) for a triangular distribution.
	*
	* @private
	* @param {number} x - input value
	* @returns {number} evaluated logCDF
	*
	* @example
	* var y = logcdf( 2.0 );
	* // returns <number>
	*/
	function logcdf( x ) {
		if ( isnan( x ) ) {
			return NaN;
		}
		if ( x <= a ) {
			return NINF;
		}
		// Case: x > a
		if ( x <= c ) {
			return ( 2.0 * ln( x - a ) ) - ln( denom1 );
		}
		// Case: x > c
		if ( x < b ) {
			return ln( 1.0 - ( pow( b - x, 2.0 ) / denom2 ) );
		}
		// Case: x >= b
		return 0.0;
	}
}


// EXPORTS //

module.exports = factory;

},{"@stdlib/constants/math/float64-ninf":33,"@stdlib/math/base/assert/is-nan":45,"@stdlib/math/base/special/ln":66,"@stdlib/math/base/special/pow":70,"@stdlib/utils/constant-function":106}],50:[function(require,module,exports){
'use strict';

/**
* Triangular distribution logarithm of cumulative distribution function (CDF).
*
* @module @stdlib/math/base/dists/triangular/logcdf
*
* @example
* var logcdf = require( '@stdlib/math/base/dists/triangular/logcdf' );
*
* var y = logcdf( 0.5, -1.0, 1.0, 0.0 );
* // returns ~-0.134
*
* y = logcdf( 0.5, -1.0, 1.0, 0.5 );
* // returns ~-0.288
*
* y = logcdf( -10.0, -20.0, 0.0, -2.0 );
* // returns ~-1.281
*
* y = logcdf( -2.0, -1.0, 1.0, 0.0 );
* // returns -Infinity
*
* var mylogcdf = logcdf.factory( 0.0, 10.0, 2.0 );
* y = mylogcdf( 0.5 );
* // returns ~-4.382
*
* y = mylogcdf( 8.0 );
* // returns ~-0.051
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-read-only-property' );
var logcdf = require( './logcdf.js' );
var factory = require( './factory.js' );


// MAIN //

setReadOnly( logcdf, 'factory', factory );


// EXPORTS //

module.exports = logcdf;

},{"./factory.js":49,"./logcdf.js":51,"@stdlib/utils/define-read-only-property":108}],51:[function(require,module,exports){
'use strict';

// MODULES //

var isnan = require( '@stdlib/math/base/assert/is-nan' );
var pow = require( '@stdlib/math/base/special/pow' );
var ln = require( '@stdlib/math/base/special/ln' );
var NINF = require( '@stdlib/constants/math/float64-ninf' );


// MAIN //

/**
* Evaluates the natural logarithm of the cumulative distribution function (CDF) for a triangular distribution with lower limit `a` and upper limit `b` and mode `c` at a value `x`.
*
* @param {number} x - input value
* @param {number} a - lower limit
* @param {number} b - upper limit
* @param {number} c - mode
* @returns {number} evaluated logCDF
*
* @example
* var y = logcdf( 0.5, -1.0, 1.0, 0.0 );
* // returns ~-0.134
*
* @example
* var y = logcdf( 0.5, -1.0, 1.0, 0.5 );
* // returns ~-0.288
*
* @example
* var y = logcdf( -10.0, -20.0, 0.0, -2.0 );
* // returns ~-1.281
*
* @example
* var y = logcdf( -2.0, -1.0, 1.0, 0.0 );
* // returns -Infinity
*
* @example
* var y = logcdf( NaN, 0.0, 1.0, 0.5 );
* // returns NaN
*
* @example
* var y = logcdf( 0.0, NaN, 1.0, 0.5 );
* // returns NaN
*
* @example
* var y = logcdf( 0.0, 0.0, NaN, 0.5 );
* // returns NaN
*
* @example
* var y = logcdf( 2.0, 1.0, 0.0, NaN );
* // returns NaN
*
* @example
* var y = logcdf( 2.0, 1.0, 0.0, 1.5 );
* // returns NaN
*/
function logcdf( x, a, b, c ) {
	var denom1;
	var denom2;

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
	if ( x <= a ) {
		return NINF;
	}
	denom1 = ( b - a ) * ( c - a );
	denom2 = ( b - a ) * ( b - c );

	// Case: x > a
	if ( x <= c ) {
		return ( 2.0 * ln( x - a ) ) - ln( denom1 );
	}
	// Case: x > c
	if ( x < b ) {
		return ln( 1.0 - ( pow( b - x, 2.0 ) / denom2 ) );
	}
	// Case: x >= b
	return 0.0;
}


// EXPORTS //

module.exports = logcdf;

},{"@stdlib/constants/math/float64-ninf":33,"@stdlib/math/base/assert/is-nan":45,"@stdlib/math/base/special/ln":66,"@stdlib/math/base/special/pow":70}],52:[function(require,module,exports){
module.exports={"expected":[-0.806747831395336,-0.8067478313953359,-0.8067478313953356,-0.8067478313953355,-0.8067478313953356,-0.8067478313953358,-0.8067478313953359,-0.8067478313953356,-0.8067478313953359,-0.8067478313953359,-0.806747831395336,-0.8067478313953358,-0.806747831395336,-0.8067478313953361,-0.806747831395336,-0.8067478313953358,-0.8067478313953361,-0.8067478313953361,-0.8067478313953358,-0.8067478313953361,-0.8067478313953359,-0.8067478313953359,-0.8067478313953361,-0.8067478313953461,-0.806747831395336,-0.8067478313953361,-0.8067478313953358,-0.8067478313953358,-0.806747831395336,-0.8067478313953359,-0.8067478313953358,-0.8067478313953362,-0.806747831395336,-0.8067478313953361,-0.8067478313953361,-0.806747831395336,-0.8067478313953359,-0.8067478313953359,-0.8067478313953361,-0.8067478313953359,-0.806747831395336,-0.806747831395336,-0.8067478313953367,-0.8067478313953359,-0.8067478313953358,-0.8067478313953359,-0.8067478313953352,-0.8067478313953359,-0.8067478313953359,-0.806747831395336,-0.8067478313953359,-0.8067478313953366,-0.8067478313953362,-0.8067478313953358,-0.806747831395336,-0.8067478313953359,-0.8067478313953356,-0.806747831395336,-0.806747831395336,-0.806747831395336,-0.8067478313953356,-0.8067478313953361,-0.8067478313953359,-0.806747831395336,-0.8067478313953358,-0.8067478313953356,-0.8067478313953358,-0.806747831395336,-0.8067478313953359,-0.8067478313953358,-0.806747831395336,-0.8067478313953358,-0.8067478313953358,-0.8067478313953358,-0.806747831395336,-0.8067478313953361,-0.8067478313953355,-0.8067478313953361,-0.8067478313953361,-0.8067478313953355,-0.8067478313953358,-0.8067478313953355,-0.8067478313953355,-0.8067478313953358,-0.8067478313953359,-0.806747831395336,-0.8067478313953359,-0.8067478313953358,-0.8067478313953356,-0.8067478313953362,-0.806747831395336,-0.806747831395336,-0.8067478313953362,-0.8067478313953359,-0.806747831395336,-0.8067478313953353,-0.806747831395336,-0.8067478313953358,-0.8067478313953358,-0.8067478313953362,-0.806747831395336,-0.8067478313953359,-0.806747831395336,-0.8067478313953359,-0.8067478313953358,-0.8067478313953361,-0.8067478313953359,-0.8067478313953361,-0.8067478313953355,-0.8067478313953359,-0.806747831395336,-0.8067478313953359,-0.8067478313953359,-0.8067478313953355,-0.8067478313953355,-0.8067478313953358,-0.8067478313953361,-0.8067478313953358,-0.8067478313953356,-0.8067478313953358,-0.8067478313953362,-0.8067478313953353,-0.8067478313953358,-0.8067478313953358,-0.8067478313953358,-0.8067478313953361,-0.8067478313953359,-0.806747831395336,-0.8067478313953356,-0.806747831395336,-0.8067478313953361,-0.8067478313953359,-0.806747831395336,-0.8067478313953359,-0.806747831395336,-0.8067478313953367,-0.8067478313953329,-0.8067478313953365,-0.806747831395336,-0.8067478313953361,-0.8067478313953358,-0.8067478313953356,-0.8067478313953359,-0.8067478313953362,-0.8067478313953363,-0.8067478313953362,-0.8067478313953366,-0.8067478313953359,-0.8067478313953361,-0.8067478313953353,-0.8067478313953365,-0.8067478313953359,-0.8067478313953355,-0.8067478313953196,-0.8067478313953363,-0.8067478313953361,-0.8067478313953358,-0.8067478313953358,-0.806747831395336,-0.8067478313953359,-0.806747831395336,-0.8067478313953355,-0.8067478313953365,-0.8067478313953362,-0.806747831395336,-0.8067478313953358,-0.806747831395336,-0.8067478313953359,-0.806747831395336,-0.8067478313953356,-0.806747831395336,-0.8067478313953366,-0.8067478313953359,-0.8067478313953359,-0.8067478313953359,-0.8067478313953359,-0.8067478313953362,-0.8067478313953359,-0.8067478313953362,-0.8067478313953359,-0.8067478313953359,-0.8067478313953359,-0.8067478313953361,-0.8067478313953361,-0.8067478313953362,-0.8067478313953362,-0.806747831395336,-0.8067478313953359,-0.8067478313953359,-0.8067478313953359,-0.806747831395336,-0.8067478313953359,-0.8067478313953358,-0.806747831395336,-0.8067478313953359,-0.8067478313953361,-0.8067478313953343,-0.8067478313953359,-0.806747831395336,-0.8067478313953359,-0.8067478313953362,-0.806747831395337,-0.8067478313953363,-0.8067478313953363,-0.806747831395336,-0.8067478313953359,-0.8067478313953359,-0.806747831395337,-0.8067478313953362,-0.8067478313953359,-0.8067478313953358,-0.8067478313953365,-0.8067478313953363,-0.8067478313953361,-0.8067478313953356,-0.8067478313953356,-0.8067478313953359,-0.8067478313953361,-0.8067478313953361,-0.8067478313953359,-0.8067478313953356,-0.8067478313953356,-0.806747831395336,-0.8067478313953358,-0.8067478313953361,-0.8067478313953355,-0.8067478313953361,-0.8067478313953358,-0.8067478313953361,-0.8067478313953358,-0.8067478313953371,-0.8067478313953358,-0.8067478313953358,-0.8067478313953362,-0.806747831395336,-0.806747831395336,-0.8067478313953361,-0.8067478313953358,-0.8067478313953358,-0.8067478313953365,-0.8067478313953359,-0.8067478313953361,-0.8067478313953359,-0.8067478313953361,-0.8067478313953362,-0.8067478313953361,-0.8067478313953358,-0.8067478313953363,-0.8067478313953359,-0.8067478313953355,-0.8067478313953359,-0.8067478313953361,-0.8067478313953359,-0.8067478313953358,-0.8067478313953371,-0.8067478313953361,-0.8067478313953361,-0.806747831395336,-0.8067478313953361,-0.8067478313953361,-0.8067478313953361,-0.8067478313953375,-0.8067478313953361,-0.8067478313953361,-0.8067478313953356,-0.8067478313953363,-0.806747831395336,-0.8067478313953361,-0.8067478313953358,-0.8067478313953367,-0.8067478313953358,-0.8067478313953353,-0.8067478313953356,-0.8067478313953358,-0.8067478313953366,-0.8067478313953362,-0.8067478313953359,-0.8067478313953358,-0.8067478313953359,-0.8067478313953359,-0.806747831395336,-0.8067478313953349,-0.8067478313953361,-0.806747831395336,-0.8067478313953361,-0.8067478313953356,-0.8067478313953359,-0.8067478313953359,-0.8067478313953359,-0.8067478313953362,-0.8067478313953359,-0.8067478313953362,-0.806747831395336,-0.8067478313953353,-0.8067478313953356,-0.806747831395336,-0.8067478313953358,-0.806747831395335,-0.8067478313953361,-0.8067478313953367,-0.8067478313953358,-0.8067478313953358,-0.8067478313953359,-0.8067478313953359,-0.8067478313953361,-0.8067478313953351,-0.8067478313953361,-0.8067478313953359,-0.806747831395336,-0.8067478313953356,-0.8067478313953348,-0.806747831395336,-0.8067478313953363,-0.8067478313953355,-0.8067478313953359,-0.8067478313953356,-0.8067478313953361,-0.8067478313953358,-0.8067478313953355,-0.8067478313953361,-0.8067478313953359,-0.8067478313953356,-0.8067478313953361,-0.8067478313953609,-0.8067478313953358,-0.8067478313953349,-0.8067478313953358,-0.806747831395336,-0.8067478313953351,-0.806747831395336,-0.8067478313953358,-0.8067478313953358,-0.8067478313953362,-0.8067478313953359,-0.8067478313953361,-0.806747831395336,-0.8067478313953351,-0.8067478313953358,-0.806747831395336,-0.8067478313953359,-0.8067478313953353,-0.806747831395336,-0.8067478313953358,-0.8067478313953356,-0.8067478313953361,-0.8067478313953356,-0.8067478313953359,-0.8067478313953359,-0.806747831395336,-0.8067478313953358,-0.8067478313953359,-0.8067478313953359,-0.8067478313953358,-0.8067478313953356,-0.806747831395336,-0.8067478313953359,-0.8067478313953359,-0.8067478313953359,-0.8067478313953358,-0.8067478313953359,-0.806747831395337,-0.806747831395336,-0.8067478313953361,-0.8067478313953358,-0.8067478313953361,-0.8067478313953356,-0.8067478313953358,-0.806747831395336,-0.8067478313953356,-0.8067478313953358,-0.8067478313953358,-0.8067478313953362,-0.806747831395336,-0.8067478313953345,-0.806747831395336,-0.8067478313953359,-0.8067478313953359,-0.8067478313953359,-0.8067478313953359,-0.8067478313953358,-0.8067478313953361,-0.8067478313953361,-0.8067478313953362,-0.8067478313953395,-0.8067478313953356,-0.8067478313953359,-0.8067478313953362,-0.8067478313953363,-0.8067478313953359,-0.806747831395336,-0.806747831395336,-0.8067478313953358,-0.806747831395336,-0.806747831395336,-0.8067478313953358,-0.806747831395336,-0.8067478313953356,-0.8067478313953356,-0.8067478313953362,-0.806747831395336,-0.8067478313953349,-0.8067478313953359,-0.8067478313953358,-0.8067478313953361,-0.8067478313953355,-0.8067478313953356,-0.8067478313953358,-0.8067478313953358,-0.8067478313953359,-0.806747831395336,-0.8067478313953359,-0.8067478313953355,-0.8067478313953361,-0.8067478313953358,-0.8067478313953362,-0.8067478313953362,-0.8067478313953359,-0.8067478313953365,-0.8067478313953361,-0.8067478313953356,-0.806747831395336,-0.8067478313953358,-0.8067478313953356,-0.8067478313953361,-0.8067478313953358,-0.8067478313953359,-0.8067478313953359,-0.8067478313953359,-0.8067478313953358,-0.806747831395336,-0.8067478313953367,-0.8067478313953362,-0.8067478313953358,-0.8067478313953366,-0.8067478313953358,-0.806747831395336,-0.8067478313953359,-0.806747831395336,-0.8067478313953363,-0.8067478313953362,-0.8067478313953358,-0.806747831395336,-0.8067478313953359,-0.806747831395336,-0.8067478313953358,-0.8067478313953341,-0.8067478313953359,-0.8067478313953361,-0.8067478313953359,-0.8067478313953353,-0.8067478313953363,-0.8067478313953358,-0.806747831395336,-0.8067478313953363,-0.8067478313953361,-0.8067478313953361,-0.8067478313953359,-0.8067478313953359,-0.806747831395336,-0.8067478313953359,-0.8067478313953347,-0.8067478313953356,-0.8067478313953361,-0.8067478313953358,-0.8067478313953359,-0.806747831395336,-0.8067478313953359,-0.8067478313953362,-0.8067478313953361,-0.8067478313953358,-0.8067478313953358,-0.8067478313953362,-0.8067478313953362,-0.8067478313953359,-0.8067478313953363,-0.8067478313953362,-0.806747831395336,-0.8067478313953358,-0.8067478313953361,-0.8067478313953361,-0.8067478313953363,-0.8067478313953356,-0.8067478313953358,-0.8067478313953358,-0.8067478313953356,-0.806747831395336,-0.8067478313953359,-0.8067478313953359,-0.8067478313953356,-0.8067478313953361,-0.8067478313953339,-0.8067478313953358,-0.806747831395336,-0.8067478313953359,-0.806747831395336,-0.8067478313953362,-0.8067478313953361,-0.8067478313953361,-0.8067478313953361,-0.8067478313953353,-0.8067478313953355,-0.8067478313953361,-0.8067478313953355,-0.8067478313953363,-0.8067478313953366,-0.8067478313953363,-0.8067478313953358,-0.8067478313953359,-0.8067478313953359,-0.8067478313953358,-0.8067478313953358,-0.8067478313953361,-0.8067478313953359,-0.8067478313953359,-0.806747831395336,-0.8067478313953359,-0.8067478313953362,-0.8067478313953356,-0.806747831395336,-0.8067478313953359,-0.8067478313953359,-0.8067478313953359,-0.8067478313953356,-0.8067478313953356,-0.806747831395336,-0.8067478313953358,-0.806747831395336,-0.8067478313953358,-0.806747831395336,-0.8067478313953358,-0.806747831395336,-0.8067478313953358,-0.8067478313953358,-0.806747831395336,-0.8067478313953358,-0.8067478313953359,-0.806747831395336,-0.806747831395336,-0.8067478313953358,-0.806747831395336,-0.8067478313953358,-0.8067478313953361,-0.8067478313953359,-0.8067478313953363,-0.806747831395336,-0.8067478313953355,-0.8067478313953358,-0.8067478313953359,-0.8067478313953359,-0.8067478313953356,-0.8067478313953363,-0.8067478313953359,-0.806747831395336,-0.8067478313953361,-0.8067478313953353,-0.806747831395336,-0.8067478313953356,-0.806747831395336,-0.8067478313953358,-0.806747831395336,-0.8067478313953361,-0.8067478313953359,-0.8067478313953361,-0.806747831395336,-0.8067478313953361,-0.8067478313953358,-0.8067478313953362,-0.806747831395336,-0.806747831395336,-0.8067478313953355,-0.8067478313953359,-0.806747831395336,-0.8067478313953359,-0.8067478313953359,-0.8067478313953358,-0.8067478313953355,-0.8067478313953359,-0.8067478313953359,-0.8067478313953351,-0.8067478313953359,-0.8067478313953362,-0.8067478313953362,-0.8067478313953362,-0.806747831395336,-0.8067478313953359,-0.8067478313953358,-0.8067478313953359,-0.806747831395336,-0.8067478313953359,-0.8067478313953356,-0.8067478313953359,-0.806747831395336,-0.806747831395336,-0.8067478313953361,-0.806747831395336,-0.8067478313953358,-0.8067478313953359,-0.806747831395336,-0.8067478313953358,-0.8067478313953359,-0.806747831395336,-0.8067478313953359,-0.806747831395336,-0.8067478313953362,-0.8067478313953356,-0.8067478313953358,-0.806747831395336,-0.8067478313953355,-0.8067478313953361,-0.8067478313953365,-0.806747831395336,-0.8067478313953355,-0.8067478313953361,-0.8067478313953362,-0.8067478313953361,-0.806747831395336,-0.8067478313953333,-0.8067478313953148,-0.8067478313953341,-0.8067478313953358,-0.806747831395336,-0.8067478313953363,-0.8067478313953338,-0.806747831395336,-0.8067478313953361,-0.8067478313953362,-0.8067478313953361,-0.8067478313953352,-0.8067478313953366,-0.8067478313953359,-0.806747831395336,-0.8067478313953356,-0.806747831395336,-0.8067478313953359,-0.8067478313953358,-0.8067478313953362,-0.8067478313953358,-0.8067478313953361,-0.8067478313953362,-0.8067478313953358,-0.8067478313953355,-0.806747831395336,-0.8067478313953355,-0.806747831395336,-0.8067478313953356,-0.806747831395336,-0.806747831395336,-0.8067478313953361,-0.8067478313953358,-0.8067478313953361,-0.8067478313953353,-0.8067478313953359,-0.8067478313953361,-0.806747831395336,-0.8067478313953359,-0.8067478313953361,-0.8067478313953365,-0.806747831395336,-0.806747831395336,-0.8067478313953358,-0.806747831395336,-0.8067478313953356,-0.806747831395336,-0.8067478313953359,-0.8067478313953361,-0.806747831395336,-0.8067478313953348,-0.806747831395336,-0.8067478313953341,-0.8067478313953358,-0.8067478313953358,-0.8067478313953358,-0.806747831395336,-0.8067478313953351,-0.8067478313953361,-0.8067478313953351,-0.8067478313953361,-0.8067478313953358,-0.8067478313953359,-0.8067478313953355,-0.8067478313953359,-0.8067478313953361,-0.8067478313953359,-0.8067478313953359,-0.8067478313953373,-0.8067478313953367,-0.8067478313953359,-0.8067478313953356,-0.8067478313953356,-0.8067478313953358,-0.8067478313953359,-0.8067478313953362,-0.806747831395336,-0.8067478313953362,-0.8067478313953363,-0.806747831395336,-0.806747831395336,-0.8067478313953361,-0.8067478313953359,-0.8067478313953358,-0.8067478313953362,-0.8067478313953361,-0.8067478313953359,-0.806747831395336,-0.806747831395336,-0.806747831395336,-0.8067478313953359,-0.8067478313953361,-0.806747831395336,-0.8067478313953359,-0.8067478313953362,-0.8067478313953362,-0.8067478313953358,-0.8067478313953358,-0.8067478313953359,-0.8067478313953352,-0.8067478313953359,-0.8067478313953361,-0.8067478313953361,-0.8067478313953359,-0.806747831395336,-0.806747831395336,-0.8067478313953363,-0.8067478313953361,-0.8067478313953356,-0.806747831395336,-0.8067478313953358,-0.8067478313953359,-0.8067478313953361,-0.8067478313953358,-0.8067478313953359,-0.8067478313953359,-0.8067478313953359,-0.8067478313953358,-0.806747831395336,-0.8067478313953361,-0.806747831395336,-0.8067478313953362,-0.8067478313953358,-0.8067478313953358,-0.8067478313953359,-0.8067478313953362,-0.8067478313953365,-0.806747831395336,-0.8067478313953358,-0.8067478313953358,-0.8067478313953355,-0.8067478313953361,-0.8067478313953358,-0.8067478313953359,-0.8067478313953358,-0.8067478313953361,-0.8067478313953362,-0.8067478313953356,-0.806747831395336,-0.8067478313953362,-0.8067478313953358,-0.8067478313953361,-0.8067478313953359,-0.8067478313953365,-0.8067478313953358,-0.8067478313953361,-0.806747831395336,-0.8067478313953361,-0.806747831395336,-0.8067478313953398,-0.8067478313953363,-0.8067478313953359,-0.8067478313953355,-0.8067478313953358,-0.8067478313953358,-0.806747831395336,-0.8067478313953359,-0.8067478313953359,-0.8067478313953361,-0.8067478313953359,-0.8067478313953362,-0.806747831395336,-0.8067478313953358,-0.8067478313953353,-0.8067478313953358,-0.8067478313953359,-0.8067478313953361,-0.8067478313953359,-0.8067478313953361,-0.8067478313953363,-0.8067478313953361,-0.8067478313953362,-0.8067478313953361,-0.806747831395336,-0.8067478313953359,-0.8067478313953365,-0.8067478313953361,-0.806747831395336,-0.8067478313953358,-0.8067478313953356,-0.8067478313953359,-0.8067478313953361,-0.8067478313953359,-0.8067478313953359,-0.8067478313953358,-0.806747831395336,-0.806747831395336,-0.806747831395336,-0.8067478313953356,-0.8067478313953356,-0.8067478313953359,-0.8067478313953362,-0.8067478313953362,-0.8067478313953359,-0.8067478313953359,-0.8067478313953361,-0.806747831395336,-0.8067478313953359,-0.8067478313953362,-0.8067478313953359,-0.8067478313953363,-0.8067478313953359,-0.8067478313953359,-0.8067478313953358,-0.8067478313953356,-0.8067478313953359,-0.8067478313953359,-0.806747831395336,-0.8067478313953358,-0.8067478313953358,-0.8067478313953359,-0.8067478313953359,-0.8067478313953358,-0.806747831395336,-0.8067478313953361,-0.8067478313953358,-0.8067478313953355,-0.8067478313953358,-0.8067478313953359,-0.8067478313953358,-0.8067478313953355,-0.8067478313953362,-0.8067478313953361,-0.8067478313953359,-0.806747831395336,-0.8067478313953358,-0.8067478313953338,-0.8067478313953361,-0.8067478313953365,-0.8067478313953359,-0.806747831395336,-0.8067478313953359,-0.8067478313953358,-0.8067478313953362,-0.8067478313953359,-0.8067478313953359,-0.8067478313953361,-0.8067478313953359,-0.8067478313953356,-0.8067478313953361,-0.8067478313953365,-0.806747831395336,-0.806747831395336,-0.806747831395336,-0.8067478313953361,-0.806747831395336,-0.806747831395336,-0.8067478313953356,-0.8067478313953362,-0.8067478313953362,-0.8067478313953359,-0.8067478313953359,-0.8067478313953361,-0.8067478313953358,-0.8067478313953359,-0.8067478313953361,-0.8067478313953359,-0.8067478313953359,-0.8067478313953359,-0.8067478313953363,-0.806747831395336,-0.8067478313953359,-0.8067478313953358,-0.8067478313953361,-0.806747831395336,-0.8067478313953361,-0.8067478313953361,-0.806747831395336,-0.8067478313953366,-0.8067478313953362,-0.806747831395336,-0.806747831395336,-0.8067478313953356,-0.8067478313953362,-0.8067478313953362,-0.8067478313953359,-0.8067478313953358,-0.8067478313953358,-0.8067478313953366,-0.8067478313953361,-0.8067478313953351,-0.8067478313953361,-0.8067478313953359,-0.8067478313953349,-0.8067478313953358,-0.8067478313953356,-0.8067478313953361,-0.8067478313953365,-0.8067478313953355,-0.8067478313953358,-0.806747831395336,-0.806747831395336,-0.8067478313953358,-0.806747831395336,-0.8067478313953358,-0.806747831395336,-0.8067478313953363,-0.8067478313953363,-0.8067478313953352,-0.8067478313953359,-0.8067478313953361,-0.8067478313953359,-0.8067478313953358,-0.806747831395336,-0.8067478313953361,-0.8067478313953359,-0.8067478313953363,-0.8067478313953361,-0.8067478313953361,-0.8067478313953358,-0.8067478313953356,-0.8067478313953361,-0.8067478313953359,-0.8067478313953359,-0.8067478313953356,-0.8067478313953365,-0.806747831395336,-0.8067478313953356,-0.8067478313953359,-0.8067478313953362,-0.806747831395336,-0.8067478313953363,-0.8067478313953361,-0.8067478313953356,-0.806747831395336,-0.8067478313953358,-0.8067478313953358,-0.8067478313953359,-0.806747831395336,-0.8067478313953361,-0.806747831395336,-0.8067478313953361,-0.8067478313953359,-0.8067478313953358,-0.8067478313953359,-0.8067478313953359,-0.806747831395336,-0.8067478313953359,-0.806747831395336,-0.8067478313953361,-0.8067478313953358,-0.8067478313953355,-0.8067478313953366,-0.806747831395336,-0.8067478313953359,-0.8067478313953362,-0.806747831395336,-0.8067478313953492,-0.8067478313953361,-0.8067478313953362,-0.8067478313953356,-0.8067478313953362,-0.806747831395336,-0.8067478313953359,-0.8067478313953358,-0.8067478313953316,-0.8067478313953359,-0.8067478313953358,-0.8067478313953362,-0.8067478313953358,-0.8067478313953356,-0.8067478313953361,-0.8067478313953361,-0.8067478313953358,-0.8067478313953359,-0.8067478313953361,-0.8067478313953359,-0.8067478313953359,-0.806747831395336,-0.8067478313953375,-0.8067478313953359,-0.8067478313953362,-0.8067478313953371,-0.8067478313953353,-0.8067478313953359,-0.8067478313953358,-0.8067478313953365,-0.8067478313953355,-0.806747831395336,-0.806747831395336,-0.8067478313953359,-0.8067478313953355,-0.8067478313953363,-0.8067478313953348],"c":[66.42835690564354,30.08476671454828,13.016186186847637,50.13047769540363,29.67967661298489,38.69879332503065,60.33989656376146,31.340627597347794,56.636931525834925,33.5747648349684,32.16232909683156,58.476825775562936,26.655831722840226,36.751834718380046,53.293364641347395,53.40399020326862,33.851619578521294,7.7851546765070765,17.65835178949034,57.115801063032926,48.09852767613952,33.024908177779444,52.73361243411897,10.8899728733279,49.01289069092052,15.286943039399052,57.5297199280414,34.76662546259945,39.947251374874234,50.18260157929516,43.289642042827225,22.604262436428023,28.449568507515128,28.045271123718962,37.003440179165075,26.654148986751494,58.446015036130596,35.14457924047163,57.334420001038836,32.42540235288878,49.84339299234746,53.81832456638645,17.99104002621766,54.738605382462076,32.63959143333308,4.492762254298,19.905658212522447,56.334090714144025,14.496590688273399,13.080248436725508,47.48383571798279,25.272259743913832,52.647803340715484,19.738492693860117,42.515241925856984,31.355408480815996,18.26552970988304,48.30951980404351,44.038727998611385,28.249826474234567,46.29245376918741,47.490333590720404,56.43879952821371,30.445485340137616,37.877470091747405,44.711658813296474,44.91752861071477,42.06096809277005,43.40643243931283,19.86159546370913,44.780581751303245,20.405159287060073,47.18421057750241,25.438745153969826,33.423796875381655,38.33741537162394,33.45733872961782,42.12164244897767,18.310676282165364,20.62379410522915,24.13832920393223,51.79160331241346,59.92759805046582,53.40742291030867,36.06659857331093,60.14119275568184,18.435580585993204,50.05102481024633,30.830112720647733,62.83557139799353,22.865072760077002,47.373131197976704,23.071193011886066,56.89131329501048,32.073691867491,32.348134203149726,11.18877451834465,28.512881953810354,43.42773739614147,40.8168006913851,32.001930271246394,40.70347757420894,44.93632759469566,46.29537034092175,49.36646117061135,46.97896930812033,41.532409127200125,42.969642249772114,49.310733187764015,47.705739765691284,52.35200320505824,42.919463067850494,22.75178078594429,36.890913678195474,28.411066202909698,19.913371034275066,62.5905858741675,27.905620987502985,41.00105826849545,57.30149038601549,27.06081461793243,23.441111125438887,47.04241683430042,45.00052779905384,39.363606760250576,13.970232739031129,27.564970472148946,47.20847201050381,26.239975259290123,51.565415878058,50.98148786095099,51.52041590373412,36.291487205824254,4.219172252746342,65.43449514768187,22.121658315575218,13.593571133562628,9.57431522030727,14.578150549240043,35.76206152670406,19.859775012723972,34.582775932301296,16.29593690790372,14.206636510488334,44.805980579021124,15.665522674912523,36.18152364371139,20.45498194333988,30.658282211014775,11.98314003743953,18.82953835096738,45.093049788240045,39.25543564685365,17.30214828857897,32.692198427282406,56.69113975721252,19.12321705255906,38.27044555761661,56.17814477087372,29.679402478388436,44.2780714812955,17.990353517926614,16.869741100651026,54.54599591805438,34.25111363500518,58.39508310160304,49.30618109349719,49.3066121216538,43.376774704472474,56.46056915226356,30.62519551069537,12.296829378977503,56.73354588055094,41.151382092038055,30.899867826894308,41.25642394546393,64.27258352088799,46.18123868440575,40.4212549991153,22.033870275777005,37.98824401337842,39.49746590762797,45.430043368163126,19.94846379087771,42.21138651110772,19.56888371740693,18.81144203856968,11.836546988501855,34.263789803758186,49.48689607467417,24.09804177614822,19.353025089224523,49.32554777595066,4.084225675317832,24.353079032808143,55.41178226828117,17.434892639074945,67.68765529751612,44.897145198681194,36.016107327193055,61.23856958352647,14.930372944586255,28.335682133230833,22.353287049291794,50.78016592727345,43.70155745433347,29.120536220836847,18.564634616409258,45.66992888300601,51.70253683789147,62.762788436745346,50.722587918197036,16.61787098264287,48.29836052415243,30.875980402998493,50.9308533784653,13.899260096651119,23.012003611154007,51.811945538443304,48.16612018922501,52.498960808874386,25.014465227785863,31.486024809637442,17.037001169058854,6.470471600985498,52.427518400615554,23.177610164611682,12.40284638899906,64.47885124902596,38.16871777105937,19.136639267558454,55.987074370585745,36.94352050234603,15.501224572776664,41.66711733000983,34.23900594752535,62.48098331671373,28.367213709339808,47.80472845470494,20.812342792240173,34.70238375503896,69.43577769475385,36.902657045406485,44.00943313423085,19.44375527974405,51.92149193272756,52.92781100084662,23.21111000138474,17.22038036557057,18.959707379458155,32.54452444246603,25.01047676461651,54.33520874860609,61.90880314334855,8.583394027950602,46.20883750388168,65.84479999681415,51.342189113006896,62.33722534463072,24.497145095894396,51.189209808404144,6.512842911830292,35.3636746824006,63.189922712011104,20.46988127662584,18.54437967995595,47.93119803594786,18.17320639851261,48.502065573248885,16.369819287395043,47.36277432471546,14.988679679553963,54.248973866983064,5.064967482918393,36.57771149599182,47.17465424586245,45.270188932657334,58.89806957188324,51.59196092156889,30.192531233982837,65.24317167847944,19.718433817451658,68.18091071283501,61.63253006196583,52.89306572041241,44.108522609724815,40.76526358888635,27.828563841157603,32.51362391866966,21.65352054603017,54.45285638843753,39.386136496709796,51.358555342077366,26.17056029975729,51.90426267605993,41.48041181221383,24.141845391212566,26.407788992563653,21.120521417614185,17.790384115719554,7.614514253137675,33.44816959206433,48.801196648414006,44.36609426216554,20.16811565172653,9.507234344511184,13.316864976179016,26.873488999920408,29.787612689083552,21.879495681907468,16.707818874468746,11.997367566327352,24.443793383993917,43.06022932468149,25.13032913310921,48.66606985756364,52.409539680371374,59.96865245892698,18.089517847215014,21.708914188710423,32.55132258694045,57.00166503520272,3.574399549642484,19.563852879777496,42.45608543101541,22.174212443284745,60.538450029178264,51.865780803027526,20.309603322280097,20.42586278647901,23.243546772334195,0.40467367495033413,19.773759247659292,38.675168237739534,21.338220480356384,17.991074061766504,60.39716862263279,43.697805633379794,54.18619572675545,53.09964335656144,19.96558233102197,48.17415515074429,32.851413608315404,49.33060678418069,21.20530380419981,49.74075520279912,58.834416761891234,38.41338742417271,50.15486696461448,45.35569000238853,35.795510810973624,26.310920520806235,68.82797859352975,30.039613091960845,65.37286723245676,15.489492313668919,53.93243924628091,44.922147116390896,22.447788999817398,58.95813637106172,20.296593021889546,53.92753425798311,18.278731466675268,43.51558296164232,35.96821824944078,47.07860449539153,33.55367626792088,53.84150128594298,43.00458774853254,65.84237959839948,34.85960090371985,44.88629121913618,27.25716273843497,17.425984824306173,59.30514540951424,53.922644003723036,61.44281083100529,23.54340615433357,55.39649412702126,28.985905154577033,9.780055342022138,30.96609047683819,46.53954686210756,14.361467502287676,32.518471682199774,28.556082643277744,19.68098929109534,20.859601780199622,29.760684180995817,46.03607677525936,32.967862736079866,11.849638711479127,42.509788580978785,60.66404573183379,67.99503191334144,46.97113561729218,16.114481388222533,23.914004331462216,30.058873805903644,20.072986409691993,19.12849025109579,63.00385899733092,31.2285860290635,61.45790053521033,47.48177487068365,9.757950558354164,46.498563864881376,46.25758199221702,24.28400264432823,58.00654947822275,41.227412084605476,26.532585709231984,34.97551990494665,34.14531278055224,12.890474695484148,19.404798015855697,21.667332242289298,35.846339723291806,52.58349888169275,23.588435193963974,46.59970385715933,35.455668464249676,31.135095667806397,7.7887705740300115,30.182409288070534,50.46361390208247,22.579247964137217,48.79288725439713,51.07348888753057,24.215945805720942,2.3126083951044776,38.726472918956695,30.59078442763551,18.932624534171772,46.13316134649612,26.844845547035064,59.34800810129948,15.862786136461931,40.06562407490566,56.499442207763465,9.892508144368934,50.234846773597255,52.15155556321704,37.93123461546331,40.10917609968338,14.631436365265971,30.673103468095412,56.59021845273949,45.93429127329553,14.32928155637734,13.608264143922227,11.411152789490998,12.547407768308455,40.0764133173321,28.82580272724721,42.41484002238229,57.10202456035084,15.286565971869042,27.026971954189627,16.98406133838626,8.708913514452519,11.220994617565536,49.503851874895126,20.40813203174196,48.2003037247222,39.32820894612911,50.274371078055204,28.837124649636827,41.19998926447698,17.252331829271604,6.664203542243635,16.073762262802944,11.447221701677327,41.69726650831802,6.663296343402246,36.04351337773458,51.40229066172106,47.88165838439903,16.33912670468318,50.19946906401364,21.326156143815805,21.792228397148516,65.1615446995828,50.09136433268173,42.617122648840976,42.248063762157074,34.83324298331583,52.47876577440386,29.56299913127211,43.24250091097487,18.491921694374067,52.657594207428986,40.18721302055677,60.00855490141652,63.41313229671536,20.51738829962036,13.32250958181477,48.23430466570989,20.74719442315472,22.8166729993559,39.485963882344734,8.87719161059574,19.329634647556766,23.696757106952056,8.629037721010553,18.782946440721947,38.69034503691765,26.31008351840612,56.18453599117584,52.70108152314545,22.69818335562481,49.66672335037346,13.854933276883049,29.810906192611053,47.52193448118253,47.61896013332425,21.665498230497107,56.4889472620401,44.75231471173978,30.51183402413441,49.74840373275298,30.29783052149014,39.82925757910729,35.52700304782957,51.29582594316789,59.2296702578127,37.55890765501329,55.801083694595285,34.04358567947267,27.341791706889868,51.97886428042831,39.69154996210598,24.374547170769738,24.93717410436043,41.60075381429335,43.308856829304844,61.446383887247094,16.630049561832635,49.541310604773386,27.922346346192104,19.989612545147057,8.649007420509669,64.76951084912358,16.52766242264008,17.932833909767037,53.72277058828076,28.048536271810626,40.69836614855534,7.465427068138095,19.622254637222813,46.2125883195511,29.912656229121175,44.86273512661039,54.289617171832994,34.23699433577175,53.02565943976928,26.940573817099345,56.921565852923834,12.27576254927623,19.222228892324704,51.05780444917184,31.005087626784597,55.87166198237671,36.43398533364578,25.778538160077993,65.2675696031956,45.69287306825575,52.702346451617515,50.31035359627276,46.431957890962465,59.542154881516325,15.354735747654455,32.954211139368766,58.05540866450377,20.613142907380027,64.24212770540603,43.035604596915036,52.1432270257533,6.515204703335362,51.81677253157137,30.85000781650667,11.242177336754235,66.87405854099023,8.558201055818026,21.16675789984044,33.61322131479548,61.03542738935232,27.072121456112512,56.037336827132286,14.311316659231702,14.159539920467743,21.98932836985232,10.15979986181322,37.65590533692884,52.535723389299235,57.43181954286639,31.750309111773763,47.187501831588094,12.581539561442234,31.634313422030015,28.457178471957608,28.356817253796706,18.279987702581575,51.84952245560241,33.60687610317565,37.85701412869944,44.68853758922688,18.97240696143903,39.58195869743356,20.095762536711455,7.247512793137381,20.32319437511734,18.97841027628438,13.36619949289603,39.58397229232724,26.354072291832136,18.28964944953902,16.83453131293091,22.640175253859198,44.637511112782306,57.07801181523471,41.06286092591158,14.16180660697792,30.58398473459699,55.402540707567056,44.08328635864308,21.16929802097147,20.33700028416967,20.035996623891126,40.736874439408105,27.983249864286442,36.69053271551172,37.71677936450218,21.41682384577419,43.00091682533004,39.00535842722365,31.250774088529433,39.595834768141316,51.96060930353289,29.77914582757313,12.79375169601871,56.47278863873747,12.931015547067247,46.416331141783886,34.26456282745867,43.63775637745424,47.680126308455556,23.667317168056467,54.424040737102324,53.61709946591664,28.3104168342431,50.42573967500756,5.832783160993692,37.77692910503414,32.45766586411258,30.585245895610228,48.35682085647072,24.95393624617624,43.17578521063777,60.055502307008354,50.21964529390992,42.879279612419765,26.703094842125076,17.03347058357347,4.297926663617021,25.610506668786506,21.511477078006372,44.74490699137638,16.369413793547775,35.80749178694531,46.023999406648024,21.013660928354888,42.53070536257639,12.157027282506679,52.60883724148762,12.142492212700002,26.88750359339373,37.70696263874679,40.67321340705815,20.195974138480775,46.055214688772324,31.62817758350269,44.659752498146005,46.63567049555239,15.751881180028773,17.041095303079143,43.51467010087963,16.59160213269439,23.601249817684927,18.362993491646876,35.58230399325857,33.33824958597836,40.45000842882057,7.446392781658274,39.456827646984465,36.20126118303957,49.47994889655805,5.21057423269259,39.26564524226251,26.950103979337758,42.50307127076304,54.40691869385182,54.66290805997304,58.07106568579347,53.7442111114914,6.286970689222277,55.18822163461645,37.27193528129411,47.57154170619137,26.80007281386257,11.646907938975364,65.38660768662882,44.95820439113734,33.393352581255,50.7375910547776,12.66257680952056,65.07777629783493,67.49609043034066,35.123642215893696,28.89800619229362,51.373296974160226,3.1439800972569274,34.62674476970457,19.74818754198053,6.146533127974479,27.65313076768613,7.648633132242745,31.807206485216742,23.813479740198083,46.46657426579948,17.721169725311853,31.735027945465554,64.8175579740701,55.40931844562111,8.003914228879642,21.107776428724364,54.06640505027503,51.97598638051771,12.3558150131703,51.53665833390358,54.902702225319594,25.271180749384847,21.523793099285754,32.722663898283365,32.2851210581496,30.502847442056304,50.679533424832904,13.621793457512464,34.61114454817945,26.34528510423161,19.09115860246026,46.495990001085836,54.81940989391764,39.15373362020289,30.96115981667014,23.876904360333732,54.30546259542608,19.220905480368828,47.69508460785203,26.539441256586976,40.43474632687183,18.58116984811614,30.57919531756535,24.4448312354857,64.73681295921739,7.80048586690918,17.54397486269781,48.34369191475981,58.26638515396954,61.207569796297626,38.216054546337176,40.9964811744859,50.8055909331281,15.495946296773337,38.36794148100324,4.401596346856719,30.192040575619934,41.21029474916347,26.081717303814386,38.70353807030387,65.51980655335117,51.05808968356198,26.584250492930945,62.054593422083,43.41162329148709,20.347247448719614,62.42643807372902,36.53703453100748,54.31593233290562,33.09957208794464,39.297742667814575,56.62751770190199,20.211316768518564,16.206354432639035,49.6324068537405,37.70735753956033,22.378880138361986,63.363070315424274,16.092958453913592,24.51839455081734,42.23640177262413,45.79221385358238,60.288735069038225,47.86286405848277,41.13219650921071,55.08864736616524,33.67969615254362,48.579302854448,34.79113810504772,17.748422131375754,42.68013570352588,19.932141862475117,33.960971914140984,57.29130056327006,14.516135624546585,43.32515102272963,58.65809517426882,0.7159561961594396,40.952490913243594,37.50490134295268,47.08796952961949,25.175137123677167,43.2054108824931,32.95778962158677,36.446099098131434,45.53543156689497,7.819303970615921,30.058981215903696,41.431419288980884,57.552114248499095,35.35494273377469,61.75526405060421,16.13234922664268,46.43593834945114,29.092993600354355,10.899968154105691,46.10496580004019,25.78302106289678,25.96192366981778,45.16530544760079,20.699289769366448,33.28841150149637,20.207749814671793,31.404409708309338,24.77512354963524,4.099688092609425,54.94391527936572,33.96712646176437,9.170646660908673,17.022121933376102,34.95423597088676,22.347444218411866,29.17509966472236,45.6063002795858,46.00182157319128,25.52045165699131,17.28872478109468,34.4531254635346,50.610926265367524,37.69955366803025,33.12605198212542,16.313883739991834,26.034670071175505,55.031243060404464,22.89718896191898,30.665328067574414,35.27268822059635,47.541018096377556,42.31769873408276,17.495571159053913,31.30066444308115,32.43351047646688,42.769243979423514,43.46534515136062,10.851922136218292,33.44763078378279,33.0053099891107,24.110557655702166,29.31438084251808,54.23140993624688,18.144576857379104,60.54524645258516,22.176160769456526,53.927403697754045,28.385056996250796,26.533770953029112,26.00707540815066,28.842553694183536,34.399018871119615,19.5537064705236,6.059030007395268,48.83460908439264,48.9208587776891,36.51721736462405,19.56972319074263,15.167675277592597,22.74587112607368,40.931412171009114,28.755363800437348,9.95483786452968,19.015819171161368,46.37719044990979,67.44198041102023,40.27436909788443,15.351644927462635,64.49569365387906,61.898821271081744,50.43183309757469,42.153220153140495,30.474267541348688,10.535223218136107,50.17183454966431,36.71364069088811,24.245787321046773,41.432672883159825,28.38767807274489,35.29273786432704,16.08804065752805,47.52558272156321,4.91788494080173,37.33345943986129,35.91427009898524,49.17971564606077,61.8969814254113,18.884177195772494,63.78265045259654,6.636401289510125,39.78849464446109,32.82000458368403,47.906931029506595,11.448621220133825,19.686711732951082,28.012464085151883,7.008906869010731,27.925463189203,53.90031873225341,8.941595849152478,50.48620343177839,23.675451365792018,47.38829935762219,16.85605705846962,22.739304892608928,37.6644856639894,49.460583778461576,34.07375435554732,48.05304785441761,50.69833378591895,30.711204252302416,27.310704475492823,15.073506399715537,63.801496614735356,64.01082716176484,32.346935064924466,40.83244428740849,55.65960566430369,45.121387411352934,63.13537573384655,52.196231626673,39.20623338613413,11.07828462454469,46.132679738315964,22.671375681147428,9.633231976429165,15.153599554422861,53.797432862994874,15.493745211032522,41.06805487662978,18.24884908383309,36.6987311509396,30.015322655046802,59.770182301252134,11.996657950309407,43.70216332460851,35.546856361406924,23.396310852065795,27.837812589383923,57.236990748600476,15.22843422241278,27.093004085702834,46.899911823423494,41.86721133846678,44.815929744956094,41.466012585445725,18.3671608144332,50.224912210071224,17.891174219381345,43.39842328150775,24.875271849719738,21.126993075206435,9.86316007772236,35.1774589650038,35.93354239024025,48.77119076426278,40.03247344879183,38.672571141306875,55.921358051768635,36.83961354868296,64.25355653767306,35.8485051667664,4.815422638882075],"x":[58.783264346417596,25.800891281916687,11.896482530713655,43.85598408715454,27.619045992089248,33.59848966251405,53.532845457682114,29.502601276410466,49.0717128886328,28.302061501485472,27.76619300062638,51.527337136261345,23.52714653542722,33.1486912094511,45.58745791696992,46.82059771944894,30.85791423694733,7.370873694057639,14.974097101955183,50.28899879683398,42.12252206848526,27.937829862349094,45.73288689663708,10.85448385036846,42.31775567128409,14.308659000428314,50.97153587935562,29.835582186534445,34.49697737237948,43.265826958561924,37.77916851311035,20.012246241785697,24.467441975852303,25.67656451093374,33.692525376453105,24.822323230145635,51.89383005665692,31.286563535597136,51.10158801357231,28.810758281016433,42.65521602304499,47.106533083198556,17.071180014047272,47.07836999386588,28.161333707609938,3.87197059948329,18.42165596953094,48.49356279609826,12.700607867917,11.175163646646272,40.43409279632576,24.063036064253374,47.3906024289226,19.059472449062657,38.29560702215555,26.871772669953355,17.102962950765193,40.687182098607295,39.96082247250527,26.638043360349727,41.23236647804612,40.50448586540706,50.62422613818647,27.101092094342334,32.77868574207476,39.05562551259602,38.18294507807592,35.51494065255634,38.136307076825624,18.534485344092175,39.4424563431329,17.231157686773088,41.78716833298289,24.558687283976976,28.428493963127803,34.38534132733261,28.147965644417532,35.56884563544863,16.64190208011197,18.700085503802576,21.504184422628782,46.40892282026314,53.308332995732755,48.03616073534618,31.057437911209973,53.38238349050018,15.580330214447198,42.17175458009985,26.663191522738423,55.26563175270904,20.380181054709283,40.39736818613923,20.337106510986587,49.07731272994368,28.406289196009777,30.13631478666275,9.603962676595216,25.168376881161944,38.94750190090496,37.26622731107854,28.898793907176827,34.50368534005158,38.352464881670286,41.19282218416973,41.60477081998377,41.86915947893628,37.06028696524005,36.73441457728368,44.55363254488654,41.693454231984234,45.890759042961065,37.137378016923456,20.08811698658328,32.39148789473934,25.81147794361234,16.966045841188368,55.67399355920449,23.65161509471974,35.00265179957671,50.73555115637606,23.067703997089474,21.90305171577826,40.92085663461233,39.76163131698473,36.21231244582951,13.438948372493309,23.522386509446505,41.22674180316841,25.066739447666254,45.855473293094434,43.937174804169565,45.18655883246977,30.636917617845473,3.5965182876974127,57.88444003752686,20.9392845798995,13.47342275475303,8.67935198067876,13.538602201005807,31.740198363079116,18.619488203815212,30.216468223944517,15.242002503112396,13.521414824268659,39.15340799782963,13.947906272190078,32.74549390235221,19.345470183168604,26.434376790192537,11.5886930327264,17.695258347935543,40.32479825219189,34.86666047799933,17.252978835829843,29.581615646501014,50.107956641714686,17.42453138313739,33.61031812501362,48.587661807169766,26.827593268089586,37.62772641025188,17.359785055393772,15.743568864732023,49.04359707120457,29.150815593875887,50.9213278764211,43.518964170976204,42.01046347884557,36.60709396671643,49.19624546581603,25.966947192497187,11.444289559117198,49.070503532404715,36.93848106038066,27.435842803423448,36.370731558122344,56.927082311948794,40.92663858323927,35.41132037587475,19.35165995026556,32.65661851030201,33.90573024696359,39.96534458000686,18.38331466869785,38.52770738968743,19.20082715065778,17.402202614938552,11.275215435919188,31.723067537264832,44.611743206872056,20.74709021782882,16.936504123890593,42.227786536555065,3.703517236865966,23.472180575118568,48.25603748348357,16.92542416388258,60.056533585460976,39.12513456068263,31.9105189246809,54.66873276036233,14.85523035920355,26.0305453577554,20.18127679169774,45.616140367323844,39.35190636210406,26.678368757709492,18.442410711113506,39.71809504288035,45.79231575357352,54.874176396545835,44.7084059574796,15.693539638440193,43.63394009513219,27.176365380866578,45.083923555435945,12.622942398905977,20.60496500960204,46.09244605586155,41.79564470673808,45.55391254834879,23.68873596137052,29.5236989002159,14.840155468427824,5.998474010081169,45.650232152619395,20.810442823437203,10.990923547676523,56.531380203736376,34.00922640539379,18.500957392389985,50.05765822341273,33.962360442541765,13.831554112774452,37.4042321992458,29.79309215265185,55.12181316976094,25.12302997229192,42.49288325446042,20.173466060138825,32.185054781648674,61.43159468191405,31.745410484438572,40.07553353760085,16.682143495743553,46.07308787767853,45.13540164194952,22.009069241183482,14.825319700528791,16.509531599658196,29.421214551512456,22.767028440516498,48.03122686753187,54.888864064155584,8.192701289557593,41.33425384619717,58.4242803501159,45.94721931575737,55.03370125086992,20.831442918941686,45.20746960296373,6.460428606890797,31.679195005686676,56.26533299286555,17.783173184249296,17.937800482448797,40.58912573208423,16.560177510692625,41.71284950160096,16.142934755942505,41.84465116645195,13.86222916827262,48.40103542948607,4.685482755365415,33.52545143869672,39.981435095950694,40.50950726942791,51.99304175193982,46.36269342134316,25.970525382492422,57.788719531677785,19.055393080168116,60.26480122193229,54.054668776311146,46.28208921910962,38.43554047176056,36.41952382714732,26.25642680195544,27.687042694726692,20.174672963639523,46.47755039430944,34.62056475990657,43.61670484052725,24.800186911380614,45.93202442969063,35.337081661689666,20.38254288475496,25.36569411839769,19.837757193446333,17.37178917698343,6.863700851352591,29.7598719981948,42.94493684623333,40.04215413571476,17.46040741213157,9.117705179841613,12.91123241540807,23.05520564808869,25.440762603573734,21.432111679925193,16.28472795045436,10.714998958620862,23.70264164140445,36.27680538291689,23.152702420906103,41.22570488444393,47.11505221259284,52.020524938595486,16.933613469272604,18.608146642578212,28.126773663356076,49.289300311832235,3.4339584240760597,19.542496645375092,38.647870382123614,21.79053215467255,53.19490966984906,44.59212386917602,20.15928530883748,18.078791387067643,20.75569111858627,0.35665714719315217,18.658955305207364,33.75469582969784,19.328464471056545,15.754156193963656,53.632949298496456,38.87924602906076,46.49975909282105,46.277123571733775,18.126124533826548,41.45785161442825,29.82668605545566,42.984426172223394,18.07750716824312,44.11914460043212,51.416018899876654,35.05643670676055,45.31150161681878,39.155620597170326,31.78687691027504,23.020185468358193,60.98494111167528,25.600289991990415,57.51122871228439,13.701408275618915,46.551933370281105,38.24557039893423,19.136066084028514,52.12106541618346,19.70315519012804,47.3623706658349,17.55043414817142,39.06869393623252,33.16812214026312,41.764882239345894,28.486088430187575,45.818027279618995,37.38431782508461,58.4236237611199,31.40236547662302,40.30936849814722,25.04480851661917,17.18214002053016,51.85359888382542,47.11162979515137,54.82656618104612,20.57486504012178,49.05521652709679,25.93324950097476,8.96042624920121,27.863392968043286,40.82320229194778,14.250294918235744,28.931193612754118,25.165630283759413,16.914183295559816,18.11425431757275,25.451149752970743,39.0092755642284,30.850958560977716,10.4166633347918,38.3950614571646,53.41155005647186,60.11903002169614,42.361425243506524,15.082442370285206,20.932774952452704,25.769815078446918,19.247078451777547,18.449580040033656,56.06850943270327,29.393071073736493,53.77339470097956,42.83206074601338,8.411657929765799,40.14635861124102,39.23240805165234,20.632446672377995,50.11435741001914,34.689552614274916,25.081103468945344,31.071202128212057,29.419179928557956,11.461551217528935,17.621045502586945,19.59003916715341,32.65826922612304,46.9973974621646,21.04448102206645,41.247137269437125,30.823157395300306,28.551199681544297,7.154066917764874,27.395802612916597,44.43966206198746,19.05508204630725,41.348675124511125,44.59014983463992,21.857691089678315,2.2423432123899243,33.242526991270616,28.699514581116716,17.67610971742444,40.45478109360634,23.367598177331963,51.97508219152183,14.562379900698227,36.73867182492302,49.03628851129284,9.042394461188517,43.26134998032259,46.25626155557637,34.25535786394217,35.628121454211595,14.474112090874902,25.848619375680876,49.590808303700726,40.60989188731492,14.078267724817056,12.427865607804168,10.355634396379617,11.559194416267953,35.93144451948747,24.32547126487032,38.38773937558799,49.20303035996157,14.81890789533958,23.967723909477964,15.096651011242368,8.644909251758298,10.543511367072144,42.820970993248366,19.0753540696514,41.15587893653639,35.4276119651171,42.50657350542521,27.266734566920817,37.35746239762824,15.17132581966139,6.005280868097813,15.458340167768196,11.116820256593584,35.68745927207974,6.163700469845011,30.451484659992577,44.94950408948868,41.411505854276314,13.821630781535825,44.20554302772775,20.31548201597161,19.82615118475543,57.34061348551388,45.06818601786595,36.424793019368224,36.83461835392301,29.878918039786292,44.904354443796194,27.425606262984772,36.89724239652642,18.142088975749413,46.69295658283903,33.95333086368332,53.42339053295602,55.76322094289837,18.371714092611978,12.339164602961727,41.68695647334667,17.620947253464557,19.531206243659106,34.29713007911751,8.760767071597572,17.905400797431398,22.286850149682238,8.287816100188632,17.324036591895577,35.59579950177469,22.5837625138621,48.28434245589217,46.83150591438475,20.229976485024462,43.19057357358885,12.59984210068379,26.76304919529013,40.23699678311638,40.35654487628904,19.911964566696327,49.99417705520588,39.37059774724496,26.826922762647293,42.72232876872757,25.67259790071423,36.63942977453644,30.751772120338586,45.10083811231074,51.73567223591971,33.497790845837876,48.9526798889383,30.378355154845405,23.102657915341624,46.693826242105004,36.20875036929561,21.518980175880287,21.783846555115844,35.32777292997633,39.24048118848131,54.480616116186944,15.261439359225026,43.722735910003564,24.487541019713607,18.010787434334194,8.23976863554015,57.40669002314095,15.961920427664614,15.65642854818791,47.841046278397286,25.955636451118995,34.74027916854267,7.012119085554749,17.639872274531022,40.98781073392939,27.171748007447775,37.807443749001585,47.78413044912358,30.402868740585653,45.84239377162752,23.968609866079248,49.59238519964425,10.898655605347633,16.6863051632315,43.71851118211969,27.362955903157623,48.432366480518844,30.71578251953418,24.714489871377896,57.257703419564564,41.18624738355757,44.921877709294506,43.03844342174909,40.27480427437939,53.064671703487086,13.354997355542281,29.65499312137075,51.37184651881143,18.95238443977734,56.34620707836324,36.44832085288831,44.50785212330683,6.299324448576288,44.86847976672567,27.37388004953555,9.92574044828083,59.128726961726706,7.995814218313191,20.209902681132196,30.842393175809708,54.39259607163991,25.628631474336103,49.268892203891355,12.924329278074385,12.899675635463431,19.679420305923067,9.247061406689046,32.01428307671884,47.06950369731943,51.291365367501925,26.753136245037794,40.56315458706571,11.567863254289545,26.837136763825132,24.661267581378524,25.960860564201447,17.26800428704621,45.64318971803034,29.95982269342142,34.714632634032476,38.25771975737428,16.785855836336317,35.4821277297806,19.32039475893672,6.431289820727479,17.53554787378736,18.28059096823957,11.254761309255844,36.391389954888325,23.02520869437723,17.98531799918414,16.817058583972347,22.193504527029937,38.49410072163053,51.13806097744778,36.67001004150262,13.980421985810644,25.807785149131554,49.45506130524606,38.87145521871485,20.786815697084915,19.104996286183308,19.03281995741969,34.634838955312404,25.933842084563032,32.769235236836366,34.2196824424948,19.22297682688744,36.81963325973601,32.9391671276698,26.805325235850802,35.002406718256765,45.215378779530305,26.314469784143505,12.043982932043479,50.50823333555874,12.118927997340542,39.543716063756406,30.205994936058005,37.486946893434705,40.67002364800496,20.453409261200797,46.69894966501479,46.710477823535456,26.815529207014794,42.45492508313336,5.241297249322022,34.23916753492574,29.768497220200825,26.606256736053773,43.609741274624,21.85094363843463,37.01375762688483,53.29139655349434,43.40539470541735,37.89356932623903,24.765485497693934,15.72388574100922,4.118042307586725,23.876916258148945,21.200576244660475,39.229331512097616,16.004853639244327,30.448573265258343,39.97457026688538,19.728527486936837,35.78729177022054,11.692142486559018,44.68877241785933,11.728740646071575,22.867829839497656,32.571024843991715,36.40255648708593,18.538211678078753,38.82216470183422,27.04806537920306,39.61257697139237,41.81548515319619,15.488611013939288,16.76075198366868,39.29846162406087,15.557644180605699,22.367885333439823,17.28854500042073,30.229205295914653,29.60034513946855,35.19323704080159,6.85483386456208,35.34809821945965,30.548435680595553,42.05017034262872,5.114102453980474,35.02590984360294,23.53835903368756,36.291385429862814,47.75403147269938,47.73911668001228,51.54594039549032,46.168500515423545,5.46305766347545,47.85701059239072,32.49992326201434,40.140748503074725,23.654265200907187,10.251741259066364,57.794375687445736,39.41012944689821,28.422621799162343,43.35833153988943,12.137596584389705,57.37018727536538,59.47402656505621,30.46454211043142,27.186839856028843,45.23951112168534,2.7309767768918305,32.17283394347733,18.1356576159321,5.209230225642098,25.127147324638383,6.460455806367888,26.865175581265284,21.89560997585056,40.29249115891468,16.187913550434136,29.248579048305707,56.8746207340372,47.97051096496973,6.935930287698595,19.099819108775783,46.09497017014767,45.73689368331857,11.081770196790528,43.58723362014753,47.38168794315738,22.52222907833699,18.417436406453476,29.31222933240955,27.297764890584983,26.99259313713133,44.69006446115009,13.078004752474287,29.32918712883796,23.026056765654126,16.43949501873837,41.667009856858044,48.900476931235644,33.491310973409206,27.972993949890107,21.440349518110942,47.6016123076416,18.920507593070862,40.42406607379147,25.403318598938398,34.18833741567846,15.928163639626447,28.56080916011654,22.830565355109286,56.71666604117364,7.760871129116683,16.2672702373178,40.910085135592006,51.409384724060814,54.35356181673164,32.324341072936306,34.978595941221364,45.827068001237485,13.742842005165333,35.2112045638529,4.070677008454303,27.046318308385572,36.20377215517166,24.064464653897083,35.54813636940328,58.227879847846204,43.73714968376418,23.41449220837882,55.34354212406113,37.81629329349243,17.7733676043883,55.16495459626739,32.50079550545064,48.702385845702786,29.554712777605,33.38759655887146,49.79662545022036,18.251347705070938,15.202192405295838,42.94736354934693,34.786265820169405,19.657622018452784,56.27902790852652,14.694695989030349,22.57231212339579,36.30693608016825,39.13401325037712,52.83969553692525,42.59629251792289,35.18312955925298,48.57279816982642,31.14198564404063,41.39862226739744,32.1975325310436,15.674365159735709,37.11948257645304,18.19611991537194,31.71192288973804,49.418396557788554,12.523275020361531,36.91001606630005,51.29672513541006,0.6183983140554974,35.677338624824884,32.210899559144316,42.55273097754727,23.88299649407483,36.403261167465956,29.22186417214994,30.996710831504124,41.001692442312695,6.797981798777026,28.187784956159696,35.59325049663128,50.88162308425454,30.72909045096055,55.05971258213545,15.057706665844224,39.97014086178533,24.513954755127358,9.327166829362286,40.64190699571606,24.141238248396615,23.93905097428098,40.14211572288774,18.03481543101385,28.529745286123553,19.829330044800493,26.50470546527793,21.21199784369304,3.5961989701359447,48.8263826374371,29.5471940310263,7.720751874899482,15.302240867061425,29.507637132241392,19.882685637842584,24.728710039670506,38.938503592244416,39.459411338114805,23.042742225442105,16.64347790064602,30.41155910827254,44.49017572688659,33.377658764659,28.88547944759171,13.786010534910929,22.96664280322431,47.19870088838704,20.555902605113594,28.345529622013622,30.047189796464394,40.21802029469292,38.003023719723416,15.70445836892074,28.51495793005583,29.957276547720433,36.99618792807876,36.77043276298998,9.174269749800086,31.296890581668187,29.895857073484812,20.62578851194541,26.614667962709042,47.79449941831086,15.329737635627502,53.31205602938774,21.70756737333545,46.00483370111323,26.689591124181895,22.557411148686043,24.602539327922855,27.41250304751911,31.124962529245863,18.19214364354776,5.562676596432659,42.33188338145359,43.581488260914064,32.27826186153038,19.078187302619597,12.945212897846886,21.415250849825384,36.918116769329266,26.212226752469363,9.816718804184069,17.29317144421698,41.629863048333036,59.752383747628656,36.792656029626414,14.303144094814332,56.56501664116881,54.00600404390721,43.603169729661616,37.23152147838457,26.262987939660434,9.172713594298338,42.7727948656309,33.65011722025884,22.662397931636114,37.95963576574698,24.138108517789426,32.7814907869884,14.134340145618232,42.558957599842195,4.536645727847669,34.52262323847801,31.995275838452482,43.50081120257249,55.234934407447234,16.864221876309266,55.88860658105585,6.3145876551001665,36.2279947024666,28.09412300528006,43.129297691882634,11.18458532992385,19.04963673230779,25.841477624100406,6.759787556996116,26.503290642736154,46.74548992797587,7.542191376647889,45.13681887703322,22.564070056242752,42.427617852625986,14.218701594747845,19.496731152956315,32.65248712366778,44.63336995511763,31.767882464474283,41.25424843260119,42.89021352995667,28.40824640034367,23.727901904636234,14.737963255738634,56.769845660507386,56.134010282930696,27.29100505913867,36.88825427537823,47.80357234002082,38.120687991934105,55.26713825548071,45.409554629567495,35.790467918395066,10.104167818175636,39.66448050408082,19.74309549337964,8.527817482383437,15.140846011629243,47.82308006051572,14.65417804110142,37.637678157452314,17.598210246984745,31.937046928231506,25.88933672929182,52.990821406125065,11.950217487041966,37.175918354513534,31.53809429832751,21.418821662995853,24.18343461260538,49.77545685756979,13.844061863734677,24.743395427180836,41.89897945146612,35.769841012483894,40.091871514324545,37.54892387982664,15.689020819386476,44.58915598274962,17.628405666255144,37.11525721747993,23.578840315407724,20.69288634828068,9.526171725670418,31.12302138614868,31.83140244729245,43.82693926495453,36.6521372000128,35.41120228420814,48.936502025135155,33.42057685121537,57.11278047696548,33.05710354069353,4.672822733647566],"b":[94.55956379993006,45.847896483236426,17.136295259037002,73.21837054733858,37.26206045988323,57.46608704220038,85.38741057639604,38.10390721899668,84.47423094830171,52.97642769481227,48.338537965427726,84.04845897780126,38.16827446076258,50.01011442320397,81.64834591753029,77.6285204615882,44.86738474969861,9.309560553789664,27.53544920682436,82.23599228230985,70.08809141889162,51.743537346776606,78.49377910042787,11.020559787693415,73.64859352427447,18.88667848909654,81.66149215907234,52.911101481567385,60.00231080115995,75.63385889104416,63.566214203210635,32.14195518245375,43.102370219673446,36.76126445930159,49.18642273992516,33.39461274885144,82.55571283760145,49.3406974894598,80.26901298580981,45.72600001698599,76.29331389908232,78.51531722961016,21.375795948488154,82.92553247407517,49.11797853359474,6.7770535620290495,25.366255818865405,85.18442984533006,21.10516526165248,20.09027924612406,73.42436883047472,29.721770492210506,71.99242283207862,22.23704439141347,58.04198951913877,47.8535850113013,22.5433596741125,76.3569969730391,59.04396216177507,34.18061199372377,64.9117656202212,73.19575522824053,77.83435043485056,42.751656600259984,56.63917328092559,65.52383888179898,69.69838786596236,66.1480083515702,62.798609287720446,24.74488615734409,64.42297445244435,32.08435022016634,67.04339616899192,28.67704342543256,51.80472537763555,52.87963467639004,52.99393316345269,66.23359158099328,24.451168627305144,27.70235388090423,33.83104008457791,71.59794279064369,84.28412654247275,73.1717470642368,54.49851863976342,85.0111940440766,28.94188097604129,79.04392179653028,46.162892725922624,90.69024244207064,32.008585691027506,73.04144469598623,33.13165368359657,85.64404125285517,45.56842231278769,40.4868387559034,17.020315400732944,40.81946469676532,59.91340198100366,53.88164112084657,43.42036247498463,63.5164960811203,69.16258812834815,65.0709229942941,77.92670624434784,65.78124231942178,57.988219546761705,65.91305049877735,66.81516251481452,69.8288006633822,76.1270713170995,64.19546850374266,32.553111097664264,53.447191661664064,37.97662143925554,30.758473843580987,88.04117236587075,43.55884153026593,63.073049170625865,81.4617989098669,41.75403385059528,29.100619775422864,69.56756942848845,64.27779353431104,50.959243001016205,15.925169231819467,42.44023391223234,69.21910023308656,30.557063521713854,72.57596283582704,76.90204101230569,74.82674507244437,57.09828133490376,6.510316196216501,93.2159982127724,26.47237087098105,14.035674205058758,12.867459922183787,18.40331675020387,50.56107983550245,24.423586969135314,50.649226999617,20.174038652847585,16.728007294970926,65.60542643721085,21.985736853574803,48.82488444023305,24.537588482793268,46.20074378025438,13.43456396886413,23.003283167546975,62.63851041483467,55.404558934910824,17.48307429273773,44.138030781838765,80.91489961497335,25.37377290190499,55.41804814642928,84.10840788087759,40.17304062553359,68.74896331976773,20.310619982080397,21.013652233421713,74.79285613282303,53.0183866674797,85.89582987322038,70.60106998180616,76.15383017849936,68.28677912453193,83.19068274963416,47.76588363042997,15.433871065826118,84.93080157959866,56.653351444088244,43.64624125106526,59.23402491044987,91.30140137365998,65.51628812265871,58.85602296580935,31.903445171884456,57.60671938800266,60.07305365227607,65.53818084768446,25.707652896223287,55.76600847206535,20.923200273787437,23.996939203271936,13.902046381695982,43.61273923582128,67.42571537646447,36.428345281245264,28.244958144783606,75.44277112738403,5.48509659552217,27.594470366418424,81.74236433310247,19.309554452614094,95.76745446989406,66.1360803973939,51.123204576718926,85.41321985785163,15.206870789392791,36.817761198744925,30.345508132234087,69.78193344139166,59.70671813035462,38.10683921762967,19.01437488320997,67.5705491645665,73.45003705792243,91.79005994359044,72.85262698916387,20.019079807938272,65.4617598046957,44.48924078023335,72.44546438857279,18.595652840095337,31.869044958688516,72.8576584621025,71.60719201726377,78.05425500500274,29.89267487540285,38.706682470000096,25.120607801747248,8.207253959141653,77.36550837878882,31.88793953107782,17.5982175712722,93.7227028478652,53.47415865042845,21.47572126176295,77.80520555817415,47.91312352253874,21.645014826685166,57.35301029351406,50.59837894776696,89.56009797365219,40.304649810076064,67.35041938792644,23.163180717544293,43.965254233430414,98.88830905517575,55.87948026729897,58.48477697040195,29.605499150806285,73.44152758951319,81.60109104054621,27.63419017453188,26.033347189804765,27.975478118001224,44.03718801151018,33.26556438755665,77.53160790015384,87.73966877279746,10.021003601763514,64.14556231597672,93.14965887553015,71.19374883960617,89.21158242367622,37.98561832938709,73.19987482043823,6.7057088117589725,48.92124240057714,88.66993679140325,30.356006346490403,20.776374226869798,74.94739874414584,24.108575920620694,73.48395303660759,17.204673234022835,67.66749438280482,19.13361476615268,75.76729621767223,6.461335584588004,47.808937083093,73.64312857426216,62.78779513410572,84.30610285713365,70.83379544676305,45.72800306732722,92.67289002403055,22.158186641288257,97.30936300576016,89.51634990999393,77.21909529960757,64.98306833881182,56.75603196731209,33.61346598241371,50.27371693925251,27.095150844559722,83.79913064581248,56.921736420322695,79.84579686551987,31.213044352396686,73.87996387641223,64.08567004100388,37.97473436778192,30.24232549837235,25.840635073152242,19.330663809557468,10.377239096688534,47.01978588016699,70.3501386455948,60.27664777781979,30.131513754145654,10.940562383091251,14.809447754177722,40.923406397161635,45.78246666195747,23.52570883413012,18.264642186461273,16.716025494751694,27.17096677651021,68.02080382121287,32.40728827646406,76.04395244124106,71.89136036487662,89.21491965117883,22.34283263104569,33.11862998947846,48.832080500464954,85.38040943843585,4.091172672945986,19.64243618583987,56.46895507365026,23.586018709408236,87.56005265654395,78.63023741347251,20.86271986120145,29.062246273141326,32.397965973478506,0.5813573274003581,23.875839125532842,56.78074724230088,28.733403948269,26.22213194068636,85.28707699345794,61.42838196210837,82.46953403220104,78.20407657571697,26.734129273434974,72.88775055606463,43.98132942413672,72.68228217600307,32.714476990490176,70.4262720502646,86.13146823167682,50.76576568955852,67.97671955932708,68.16972839969327,50.545850162708085,38.41964881644765,97.6875520221648,46.37473469165251,94.30088583076312,22.069002192598226,81.09006175690617,69.4895620337803,34.63374512773636,84.1161126928123,22.48023204193431,78.08498871321837,20.958605175027103,59.87854446153573,46.271570675972924,66.63120232276563,52.20058744837619,83.36501660433478,63.68517137697433,93.1407482891559,47.58099104105068,61.727730221457115,35.397835183563615,18.323246508449124,86.72417210835886,78.98474081640758,85.78822531347728,34.466575967014435,78.73012818777644,40.218586394631764,12.795997321546896,42.382907850091065,67.57365083618393,14.77054285863025,45.718372242871354,41.03173497213446,29.861846003266113,30.961498764384796,45.61822987761704,71.89219259611862,40.757313140223445,17.1224756959526,57.65051305708236,87.35063647785634,96.97590258262984,63.93322145773267,19.91201593887169,34.88386242154312,45.84107624611149,23.11203236757133,21.626637063848897,88.52346546060366,37.98262472327771,89.73413418815976,64.59106020988295,14.711826025743772,69.87240778381278,72.10771003963795,37.72042290179603,87.0469942079805,65.28439713492921,31.873521334087297,49.34201322173681,51.53579171058066,18.148402141496845,25.968369432451798,29.31102796264995,47.577299166182556,73.13835463364519,32.9492768822533,66.2952349351904,52.50165270984551,40.64290895060796,10.12425307246068,40.43612542093216,72.62960263565625,35.5469183744358,76.18492599931244,74.9298582970255,32.8934798986684,2.571159142148418,58.905432989577086,37.54998118466373,23.55614975663613,67.02757020825712,39.639872477308856,86.47773904666307,20.647816086261912,52.30761870696931,83.96117914460595,13.020622515770821,75.89482139764755,73.84412947868296,51.45714664515479,56.59785486450059,15.210333439186655,48.42547979454358,82.34554495993284,65.5261771209141,15.252922699273448,17.951708671245534,15.295083045051904,16.18367953958999,55.32841634008362,45.385413285292515,57.23313039643054,86.16749870425298,17.007380468844396,38.28391083622704,23.929056444197478,8.94442631459443,13.713890725676624,74.09446386226806,25.312278358979007,74.12126800769227,53.68101106513814,78.85708854494695,34.615598615698616,55.339114128011815,24.909689820830817,9.088803366265843,18.338295510584928,12.662980875005516,63.8112081575107,8.501630513157984,56.620179467637286,75.14623786731548,71.68950610533007,25.602611498482936,72.25497357616327,25.04507553855578,29.026689511059736,93.93977496750159,68.57486434870819,65.40268143898287,62.16760713069109,53.06338721352056,80.34989102149002,37.427840600013155,66.59078331368728,19.779181006119714,74.60532783745516,63.12567025322681,84.23960506162575,91.56207063199778,28.41270213362298,16.940867480593912,72.32620482014718,32.25066612764068,34.90601584678441,58.579016860820666,9.305592283152277,24.570305940067545,28.88471055674875,9.88461127198887,24.151213009047478,50.07716606210499,40.02161236142212,85.25442325863251,74.29902092708949,31.780302060775988,73.49663879453142,18.4732200111943,41.02593009344856,74.32790027017434,74.34205139287154,28.11787508667352,80.38737923050806,64.5551087527349,44.070989819950704,75.60184722432243,47.31703268042702,51.566683284861725,53.09814533925082,74.09116596388766,86.80490328293006,52.502365343162666,81.00076085482345,47.53032340106064,42.94028823505738,71.42591444345476,52.50700708805681,34.88201262150389,36.54029192223477,64.68308038307643,58.279024422314386,87.07791847328312,21.66604572131984,70.95158488208092,40.5612017337778,27.270981366863772,10.154859814049505,91.86205869948604,18.60939066675863,26.30919164588965,75.36541286823763,35.749659235173766,62.621995748909235,9.133438350682317,26.91671287385583,65.43790156450109,39.99821839397642,70.82368457299414,78.22748208672186,48.34520552370541,79.45750851441032,37.87633844530062,83.89032989675454,17.343023678569402,28.553521422610903,78.06377929562844,44.40683002033499,83.24560929423082,57.47492698099609,29.693855381294828,94.74101299994739,62.2756441137624,81.33168929203681,77.06838275699556,69.08808153186979,83.37697676545842,22.713057966404836,45.094153714904735,82.64852745995883,26.724140215998588,93.2962921984381,67.27445330136405,80.23867641792027,7.309566846628197,77.38400534343143,43.64091500907305,16.086194356303004,95.37410918565817,10.627583520178124,24.6876429534656,43.80887807662964,85.47867130232527,32.38364842751304,80.94279278778457,19.414934264490846,18.795389988418666,30.48896407076448,13.51835100067207,58.41505792951025,72.64945725104809,80.02649521145678,50.13811837786561,71.56273096473595,16.311505902521553,49.286208155148515,42.42477321170886,37.17308112798825,22.00372480785143,74.68660767633399,47.02672854178333,49.41985437980611,68.35164768578134,27.018133237306046,54.66787064541474,22.948838703777845,10.250921467506302,30.58073669648693,21.546135804439913,21.1355370029827,51.33153369407335,38.60309999913624,19.409480364344628,16.898824707619504,24.283763808570907,67.24306459838962,78.9349068972994,57.22698138981998,14.829237153563106,48.15869134099256,77.28713821506142,63.260961312816676,22.5766962052715,24.87033445814488,23.727328041713214,63.19018306184216,35.524337668721984,51.11950526386104,50.58484554947496,29.489396401908895,65.74583005023742,61.326773267667164,47.608436267747464,56.49800747884095,76.78064567985973,42.52791477240136,15.552632645969734,78.42021935540672,15.919207344701839,71.70509712689568,49.19864140963614,66.27053587905553,73.47479743422815,35.493349039682926,82.84961355294064,79.03099744782074,33.811068762193926,79.75548717811881,8.009239813073279,50.79462665419918,42.35284488378542,45.22650320027511,65.8243762622478,36.371839478031845,65.84984330790239,84.94499277855377,75.29365082744228,61.22491068084513,33.83280438144479,21.852274524323498,4.959836770961243,31.989499484608498,22.655480973146272,65.04025250179811,17.71086480237137,55.52639571064929,68.28373549285433,25.742492456191634,67.34405608013967,13.867637098607585,81.75184374449938,13.664950029069196,41.67846565727658,56.605377220540866,56.38770377582081,26.295947211909805,72.67025225476279,48.48135274391502,63.2315536732075,64.3722289589281,16.72062125138591,18.07265847365837,59.028809668451096,20.39619767485023,28.13959009461115,22.316579739266757,55.27979304442639,47.092401353434205,59.793047426284346,9.623118067594909,54.575482745392684,57.0016377009993,76.81887724309479,5.565555882082216,54.866355469477696,39.50410541138056,65.3598539975855,78.88716473570534,80.13998453663442,82.0811935070902,81.62011719088115,9.318676010070392,82.16445678374475,54.831233141511674,74.91420359892027,38.37551995516307,16.78062243889617,93.32330662177768,65.3731363114908,51.68386443099059,77.89062740218449,14.594316316159123,93.43894782944241,97.01441693394362,52.267464608179,35.19448643279925,73.94343559896839,4.6636846349341265,43.6562591435263,25.68172106318749,9.595472648831919,36.94784659976143,12.020700824340121,49.992113045863114,30.8705546832671,69.1849923773889,23.36300418883006,40.88427078539219,94.04472679075772,82.78147001394142,11.933713243920149,28.496341362997683,83.39843499235593,74.93361653840708,17.04384436592434,80.7876987341088,82.57734542778347,35.38633993177043,32.954074961349214,45.271843601313215,50.63680838153523,43.419328091363525,72.71863750355831,15.622741444694705,54.04685913491717,38.55885850423193,28.848332411651988,64.26491019051359,76.59896671114446,59.98942419763326,41.956541701405,32.842554919152455,78.973234499169,20.32626228968406,74.44983285050242,30.719966383261802,63.41929753613638,28.343284036359098,38.00613464470743,30.384752447879023,94.2480857824344,7.946253936591838,22.241791361481177,75.69670676128162,83.49769481747282,86.42786831257663,59.895453376124124,63.14014696421404,69.12477510781194,21.946743216814774,49.983604553652775,5.619261182409914,41.76717367518489,59.632507668291744,33.50448572855889,50.31428802459949,92.35148939059641,77.9965310692634,38.24782754145302,86.74886246857034,64.00043691225149,29.818204910776714,89.14610071763022,51.38895087121058,74.97177612012423,46.14338678315859,61.04496700527571,81.76275860526273,27.42330207845557,19.901311626124972,74.230975783585,48.45593054620204,32.39213695518644,89.42981326883037,21.23806433555229,31.679282005746217,64.05471526913713,70.29201124143702,87.69853692797167,67.24196411296948,63.02263562433475,79.06464247860862,43.01756339214324,75.00163975504384,44.33467919879635,25.38021014803399,63.141350839014805,26.320081863024466,42.23666811150375,86.2607721192144,21.8491500430769,66.93055374559246,85.74530464678634,1.0749343176633452,60.36316505155658,56.98493488411805,63.776025695705464,29.92975259840954,68.23488952868954,46.70465938746162,56.497899333145455,62.21797037598154,11.577404359740711,36.944314351491435,62.91379283894645,82.09713650613321,52.37642502743418,86.39249926674786,20.086649580893493,70.22776107141193,45.94221918318994,16.68731462861907,66.2070687254829,31.8241947533909,33.40537185283238,63.648847447969246,30.503602574743827,50.79860157551402,21.600199252879218,49.433569291890095,37.88615204898926,5.952348026233345,77.4542479011685,50.230897332374845,14.505741021663097,23.350669264261917,54.99577210836775,31.416874449284407,45.53622354987351,70.14140782570435,70.07555181052264,34.63753638851913,19.663002574486367,49.3246444721123,73.13309959583097,53.60258149408041,48.72984257001531,25.615553220610163,37.32391335546953,83.85219750174038,31.512285560400365,39.201356836299,54.50065389350744,74.48703145719604,58.194159950248974,24.08622576263149,41.55106830118843,41.54516588528919,64.01202592543248,68.1002287812647,17.025083025169323,41.361585668283425,44.44698484391074,36.93326202486584,39.24835887989684,77.91693893897238,28.502178666357626,87.16080077379286,23.90041690807848,83.07962834165495,34.62376514267005,41.165353170710645,31.17526595094496,34.10462871799442,46.44637547580237,24.56377080767862,7.885433074238937,72.76231443380894,68.56783303327094,52.115057855030926,21.378399496181093,23.345542129439472,27.64207794095411,55.6989041795003,38.11319876485223,10.46306661814208,25.3545468238651,63.845657743678345,95.73694649490841,53.085828202000776,19.20975306985085,93.67774921801771,90.94156636230883,75.55887250566892,60.263311380723124,45.97027061090155,15.548771429188456,77.39765484655486,47.98631161150027,30.072094087467292,54.212207590502814,44.02457447864232,44.53322914000601,23.276959939307588,65.80098720922862,6.320708921380391,47.67633156527992,50.33476762815198,70.07605334178471,86.41093224418164,26.31689047802844,92.82990915646896,7.82056039037855,52.88986127140528,50.20955891675023,65.48691333116606,12.420178882447592,22.030919930750684,36.00091796290553,7.925576857418957,33.15854962132907,80.22753031629614,14.090903910479916,70.17002576628178,27.764937178445024,65.6418334610521,26.56058210234249,34.67081677863165,56.10684810752864,67.22300453863583,42.558538383598794,73.0701986195927,79.42942430893339,39.18526565841214,40.494136801700435,16.308185186407606,89.67545775639385,92.99469669248599,50.95094959240748,55.34565317261733,84.5669991460364,70.88145797252905,92.08767613865682,77.16877620363499,51.77502890181012,14.662686148382363,69.93334002883806,33.44639968097148,13.70076204163638,15.200528031505778,75.7809148737108,18.583052184887357,53.69061457292415,20.64296734872587,54.220026412775375,45.19747549638267,84.7158062390171,12.167542249004569,67.71641116716535,50.2976673048747,30.672763959465954,41.28461681553055,84.69276738063219,20.32242948002523,35.73872377862199,65.30155472441047,64.3033538472077,62.198774810210416,55.87949835391633,28.221758349894685,70.96247989919286,18.8580685343998,66.5182276696214,29.645676319446807,22.724350602894287,11.103156713354686,50.09633947392622,51.02795054166562,66.9642683217841,52.47090210743552,50.67324233879422,81.6231305927574,49.42044602003729,90.5290590503428,46.11986500443648,5.340139299430109],"a":[18.332905873776273,3.134809012844144,5.972105039810831,10.657495812256489,16.716202547199718,6.6126670750356675,17.516583358904064,19.77756224148832,9.043969152627994,0.40406833698279687,4.506137009358895,14.757434812180087,6.973202106569594,14.084377018949858,4.815330314453807,11.98771847389514,15.018151239965514,5.178903601000391,0.7716445480440992,14.168232860999792,10.503340588149479,1.021982886862296,8.691888979878195,10.666710623369301,6.893644129271732,9.132535917827415,16.272035036980206,3.745320150369804,5.659453762678113,6.669015250182091,8.62312783678691,6.297829649975393,3.3979199993274856,13.143683991645512,16.17439991171264,15.13009152201484,17.22607042581712,10.873714764142353,18.12353232103358,9.685594350620716,4.622408320516773,11.594291814001902,12.204179784986904,6.547890466891708,4.466770308273151,0.5873478457959536,10.569766376543681,7.009151398492479,3.1980219500458684,1.0953167275287612,3.133742785930882,17.665006094446927,19.574632929888796,15.466760902478196,15.969422851577736,3.1487536999215626,10.951795807871205,0.3572200744924059,18.384531659715062,18.110062275527767,14.4593296254686,3.542206790943938,19.859186190011258,9.405831426419574,5.800901873381505,9.129424780018503,2.550110557263938,0.8797607018768483,10.251954015448073,11.512715541397851,11.198313494682157,0.43744308754196215,13.231295164469188,19.90228109371833,1.9982327315285042,13.474827744460871,0.05595199022438102,0.8978487767174714,7.812379852615168,8.521699575603009,7.566864521383483,17.929038009918962,18.28565116223901,19.616690500734602,4.553855010239531,17.62137006825207,0.47313561040015273,0.4823567287143993,4.615916767474255,15.212909055651163,7.2325625701536955,3.4884475598613296,5.870992700090993,7.733258159808165,9.001978316095705,18.433527988394683,1.2186872055887221,7.472524534817899,15.242474078126351,18.480062865822976,12.480028883249904,1.7004437331304922,3.517097642702778,14.195123926683525,0.5374907832440057,14.833039547584068,13.398186973210029,3.743683260849857,19.38370493392378,9.882314838408357,11.704169343574314,6.544234609254849,5.994611289948524,8.58492382087368,12.056997385630076,1.3716812638842946,19.07814643479801,1.143573239797635,3.2649468532103443,15.995017475331249,1.9400649550890403,13.765144425445758,8.531542499963232,12.042510971604447,19.538742612158963,10.62791071521465,2.1329828913402116,9.577271335822886,18.859122105498855,15.64403731234262,6.665554332230235,11.673977125668578,0.7184614225425534,0.3020420082381081,17.9369268677334,14.683318273906046,12.837714951988751,3.9440811409395815,8.038328265803827,10.460428963791152,12.057102511217735,7.114234910660513,9.66561161573046,9.895891310185796,9.2455180108221,4.859958850969295,14.565382453877067,13.475018245424696,4.085597216477113,9.501664966617383,11.693757074335274,15.095871012048793,11.645551320629114,16.992822143913052,13.12345146252516,15.276185168709917,8.436746902029352,8.953477973418806,8.426243945488636,11.738605926404801,2.4405995041369932,14.023432989882828,9.784965971182235,19.93027972543546,2.1650227492855123,11.377519132005403,12.898667914077514,3.4063751980425483,0.7885593360130105,10.760543752368875,1.3200494779228356,6.933481997482924,8.525172318660609,14.647925959821283,9.10760768107676,10.52042210483406,18.061868482164268,13.124430032335553,8.903642428925727,5.160024162281944,4.446866807419596,4.319729789040112,11.051499101553848,10.102075093787404,19.037277443248453,17.253431491563216,9.945884798241082,8.305197434427235,18.28004828499254,18.81719859098744,3.01712936929726,4.150636778641874,4.673370515744919,1.689180237066883,18.811326816253413,10.394829206221882,14.22981488349896,19.68009518270069,8.585295100768917,10.18775738370743,19.907576823401936,14.457649232259126,13.834014292356427,8.689121157832007,18.29316377238859,16.337803583286963,13.756805209795463,17.79572125054276,8.226806933864118,14.521201681224053,13.135350815868563,12.887232525493776,10.802881489981836,18.954385601931424,7.601618221604305,14.147684984916701,5.8699164546400295,7.86926906661916,15.83044431262258,8.089314153971024,8.807504369283006,16.674272284347072,19.140987917801052,3.21659494104507,3.501124030025946,9.791456594393235,8.285706625222765,3.5204077069906603,14.481130289502357,12.001263061380998,15.137550144416942,18.684982637271656,18.188974816506484,4.997289764102182,14.849210094378492,6.269661226486236,16.184276678307224,7.957980092505097,14.387789583387157,16.79315475152784,18.86580997481886,19.081280458540153,4.45830172717443,19.261181370336292,2.0703927864230387,15.12904911203995,3.905586634337972,15.649044261474128,2.152999291830957,3.5455958662330334,12.895710938380255,10.8968923732718,14.67671547096787,17.74620686155787,6.125537131867507,15.542720933980618,19.16214226128512,17.402311512847536,16.390589291462923,1.436129394223289,13.557946235417369,6.183103328292523,12.184529302995713,19.62717142118086,3.5677396095665426,14.728376163366956,1.7420543169795177,8.025605007668455,5.790952975317101,14.942483543866981,12.648136131643447,7.902153913456611,17.45946025689686,2.677620437742303,17.375874110124503,1.9219491012305534,15.320632398401033,15.458382633495766,18.69452023772368,3.631796473281117,18.34704381365244,15.547229470988832,18.380486004679447,13.960032500027978,11.303262310180546,8.419663056042284,13.426115986843437,17.938213999273106,2.1494917503361943,12.350056797035865,4.280025133196039,9.405816398469327,2.6543978961352055,17.54951017048091,14.332776143530307,2.8325822224247155,0.4919878894723695,19.851946456618776,13.05062253137458,15.156993843174696,2.891130079580928,10.245005609067789,11.959333143992104,17.164088661137797,3.1338615812684756,7.056697517165502,10.765021317995082,2.8525816595375852,2.4414800149654603,19.064992758223056,14.04614425636292,3.9299575122369212,19.781190928006925,0.3855551474772234,12.689034543249122,1.8585647225137203,19.101798698467626,9.966801599995714,10.81769713658661,2.201915088191422,4.716384756717571,8.483003289880106,2.690881237050049,19.42950032381187,18.498518013239085,19.760471028137125,14.340070739913067,6.107039731607848,19.36394928359714,5.6603832734206305,7.592390315792548,0.10260060761003942,12.760502310746812,7.720364496477239,8.694799752292868,3.918572919397887,17.843311131370516,13.384137656399183,5.830648181315019,10.179016342158365,8.393511525491192,5.921736969590019,13.822783833552407,9.406640331551973,1.5282640853339968,14.375075147024429,12.165107222026585,17.294734171132756,19.68514549168882,6.350912471867347,10.577103841777635,5.6088315208675965,19.4872515549255,2.1117305823365218,15.915120639068885,4.240614994438028,7.501509051565547,2.919651255509521,1.6136648746329696,15.945967615181601,16.56326213585607,12.625940900383274,13.696996484739534,15.540103043136249,18.352749991838472,13.64985702337108,1.6733660151349028,3.3656439713146424,7.647341934305851,19.17081802800736,13.110054262991145,16.092766366606057,13.339192051202362,15.891951622153279,12.427296873141017,11.074398831021316,19.819865377852505,4.868246541993471,15.503372634516488,9.781579063350945,4.623750092258887,11.446949937347979,10.577893262031806,13.66207824951751,9.950823823115673,7.226669798392167,2.2749498949642266,3.588558502261794,2.649305156146955,1.8303106661276258,19.650370461913155,2.8347580510525505,16.62394673409623,15.038430618481144,18.446925023596492,17.971342895888395,9.621900472340617,5.159022556927146,3.0763078786594544,14.877180676932413,14.857450684443405,19.37341727404536,19.681319731331662,13.11449969458466,18.230317643342595,1.288393036163531,6.536696254508985,2.062053078569841,1.3119810398132303,8.356589819812754,0.09758957787179057,17.40127794931659,10.41336804228822,4.413103602929809,3.9010846220644657,8.183170417461557,8.599034298209109,15.790115773761798,17.441207902136227,7.584361684852645,12.926585811788396,6.312436051404133,14.87974729681297,3.79583544824027,12.651803366471267,12.566795976185325,0.4086400851492522,1.961179568700322,10.286655565938045,9.380111793584138,1.870568533806165,4.226844460156367,18.692762842334837,11.027861266556638,10.410342129140012,4.969403320580481,12.96476364634942,7.681900954341838,19.13569186220768,9.548572696218255,4.544423643863702,6.364419967962416,15.064126985158047,14.806210433955641,11.918759488922163,13.641705779732568,0.32216440186656925,12.556770137087799,12.43837373420659,12.750147837510841,6.182350127558509,4.7708625907986635,6.330535112562137,14.00032041185414,0.5141152232525625,17.080258333824307,7.409272533776146,12.34451838446124,7.781172980676225,5.110320077184225,8.306261243287295,6.958932092280121,7.4616963738259745,12.02359558362228,3.8836672911972414,14.789464693919975,1.4069800182784187,18.957764950707947,17.026565420165834,4.160675730033563,2.5189060245669914,12.202127876904836,9.368658701978045,3.88943260673273,3.5203273490768483,0.8639336304114353,10.807663690283045,7.177781777215468,0.5015026397472777,12.491544152243751,14.967982237046629,9.423591973066303,15.95988869400272,18.49043539781725,3.661036223427918,8.191955673418704,3.665472171969464,4.827971958070192,16.116612022652916,3.3243353947298493,16.29111611123529,15.13392335924436,0.9697187009464958,18.581136205499963,15.287366118564218,7.01890310090604,7.136263972429018,7.044788393028774,1.0799024317846895,2.1477269740062344,6.842892505210125,8.14476218990328,10.36974712939072,14.82700039733215,6.482404749843926,9.604911426683888,19.222488748932953,2.867713394739333,6.484238921524499,15.77544797691461,7.170637840401279,8.925117928147056,5.959126164309385,10.636768557104844,1.6922258657227607,1.9309407062333417,10.63397810085721,15.630200291205117,10.895810983623102,7.329973535113199,5.547206460037759,1.2003869915132759,19.761978368774283,5.485916761458354,12.323016712435537,12.084758394069608,12.01032951586706,12.717619716916687,10.98553715329967,0.6733046860361069,18.730569873974385,17.781178573904132,6.410110310527504,5.09951882978692,2.1372885117809037,17.71461321529665,17.62458053601292,8.020091674299508,12.936524967501928,6.313907978198068,7.540778802398278,6.074476923937735,18.449837705975387,12.968566675241,3.611916046662138,16.720709287196108,14.88205593676156,3.2159055542759107,4.613656247864428,7.1510421420618675,13.343393790517272,12.669540316907447,0.4777367320721293,13.363452356084501,10.11642308241691,7.835571875154459,8.24388106061106,10.813523800754394,3.6123514689964775,3.268675081394581,4.886143713940716,8.092354182645959,9.070884915339859,0.4606414786387658,19.084586194387306,14.877319410378922,17.341588468595887,3.7552407753379935,4.56260142748123,7.697164562045682,18.79216100175715,2.774336076978128,12.198755610372029,16.008967315841474,10.165273645424184,14.56871159860376,1.5948528611465607,4.108909993528367,5.157097114568199,8.10490484156793,8.98160903628301,2.9604429541260613,18.148001556042367,5.020212680315725,15.147159973529831,16.18187852281189,19.245224605157368,17.991093176116447,13.456897883179252,5.5857475238040255,6.233705071928193,7.457644244882982,4.41774149780414,2.164331486880502,18.14761108217215,18.80208277816608,0.31298104177716723,5.513582771899257,6.204478876416006,1.4551660450007065,4.577016793749915,13.283799269228167,11.913577037192464,12.805342158903063,10.663180219760573,18.088220732232934,4.232116462777968,5.216764142027603,13.789828907490138,15.217906225783011,2.112635524287114,2.78604688341356,14.588413150787346,0.08309389523624144,19.49936425312197,5.41211574874898,16.37509337914366,16.72460997796871,19.830159560372216,5.989176727381338,19.709646103857935,13.42733618050846,13.020711833081826,0.5368045988948777,17.986812625612888,11.295538213686838,18.7630930291377,12.586435134410742,13.724989417004698,2.348830534579802,15.090378947365203,12.021561162064533,15.716463153402,7.615282392761489,4.114321438810022,0.842811101940315,3.284354329404442,10.698474516430206,9.526210785450132,7.98279010039995,8.076939362664103,18.949635676421714,7.822154316298255,3.1805534993990836,8.73201998795989,4.942874130671009,3.5794111605148338,3.4485494870071642,5.825317242782715,10.167385754352157,18.90604479865025,0.28116393341655943,2.1117318486045455,15.520790668588837,15.54004481142699,5.553334666643446,18.49283532531291,5.432939232505896,4.41032964349005,17.50235929111216,7.351039981576064,11.514062897193845,14.513550422350011,8.794842577478823,3.1662700917925912,14.704449998025218,19.555592869919252,10.04629630469573,14.075957577859155,2.09441358064844,7.966903209546641,12.928857242551617,0.10773720277466481,9.23242646626434,2.783529445266959,9.539571704154746,1.5996446568414724,5.39666125302106,13.806413668897019,9.76695282591133,0.5519328432151172,2.814587618981177,12.90785655762173,16.311774963633624,14.095642582102577,15.277449109607524,16.990406755987976,10.086949158456697,15.84212581795395,11.60361361551062,1.9058384341647328,9.823007765660412,7.379540161816873,3.724882190484333,13.60871744376154,0.6392074814930293,2.7390431652210045,4.6036680804045504,12.593373497399337,5.48673899120296,3.425214479372065,12.553453992585982,11.105179139097281,17.021354195008207,6.085243586620703,1.1037151200658624,9.067406359444355,7.251099219632335,0.8242527937581245,7.009725629381922,2.86988264921876,17.623703639296146,10.055138831810728,2.1223722666702205,4.314501746140205,9.359914282562713,16.58915859541231,17.029104345038803,5.813137570085125,18.13301988301928,12.785510780302083,0.545766822958873,19.189135994523056,9.603725130980587,0.24993926832884927,11.762111522170153,0.17378257273882536,0.716777756249436,11.748117467329223,7.625277128656269,8.075420284495944,16.092721426589346,14.848359286451242,8.611611531085007,1.285202983989966,8.475671296246489,3.917927061186761,12.7257124333042,4.340770119482076,1.5266468016585266,7.587830454253437,7.977463314361635,1.9816325498581033,11.267542539101383,0.909550065733491,8.419757836007879,12.999648058099972,10.200806356017624,1.382230385749974,5.463944193716448,2.4094827357661552,16.116766170722883,17.583268112476635,3.5313040654485883,12.162540439932652,8.548482474954975,12.131388083795414,17.331095544558387,1.9529417694772366,19.392067797884923,1.1384459111528455,1.8910474984954284,17.881482131368593,14.289447896357256,14.281886432571191,7.551268651175147,9.512197050142493,1.57870273144757,15.128839617757013,18.08884983319753,1.1511511905516336,3.1378284100285025,19.485590027080587,4.46712735735606,18.508837795453626,2.3197752685200568,10.402230303009809,9.714147332519252,13.391135039258323,18.852834260525402,19.646129933262095,5.0018897697228715,6.643229089134124,19.835217191399288,8.2112751150698,4.154910854238856,16.744280493111088,11.144963093976301,19.000983808893185,10.798781606401935,2.1168791829341593,13.654219308248638,7.881106848265564,9.88914829811511,7.576647502028098,19.33070314836955,5.259383462913516,18.797198542235613,7.296457510529439,12.27554577339097,4.933998348809561,3.9053225450707707,13.4266580862244,14.730742809126722,3.7064811289953514,14.09729199331732,17.714901671740332,3.405478093726284,18.47470649690993,4.700482587931338,7.697940510141601,9.010788340549748,19.812153389909454,7.762682545783837,1.979004274023839,2.967391221974749,12.34754896588731,0.10221734275072336,7.766387984102225,4.200215809942849,18.556680731055685,17.046251057761758,0.41293244013371755,9.454997716829453,2.163873670406491,17.013575700746312,1.3941429770894542,18.287243021194012,4.703366738541108,15.58790274117499,6.253600895832947,19.633397599887005,9.3717484544166,5.759459413336385,0.2861561621518449,1.0054392767847542,11.736738708988991,15.454528065848137,13.235985570548765,13.564304732813302,3.9370211541543654,3.351534195508923,17.82710244247327,0.5802589651024714,2.359418758236158,0.9322265808742536,16.45837840242335,6.161231092951636,0.049325611929083024,6.202311059307575,0.689558897988567,6.8415919741393605,1.2027614852175184,3.6590397876939518,4.843370102020668,9.933125314884075,13.229461992361916,9.027539674259412,12.105145528084872,10.510414611875426,6.44851379645337,0.41097595857866764,6.7336408047462815,5.756542254500614,8.168103283365259,16.07142332699304,2.398958880112807,1.471872504102909,15.173980163780453,6.227639891636625,13.77572146189003,16.855466556023973,6.450817162392348,1.3474991680644077,0.29777284706414164,19.917275294725826,13.443671031723937,2.187795777736783,12.330425762175178,13.736659583185332,0.43635934352328487,15.04108111932907,19.228229065241887,4.086335801179173,17.71884266404026,1.5184010574642581,17.171107008060194,19.84607257679823,13.80185601844289,10.98808378324803,2.9364594189406157,7.925813906766219,15.330757514539627,9.84985196048978,16.477459747954406,1.1861139391057263,14.374908728623058,15.683679593203097,12.756430836536655,9.085927717012453,8.178603172196407,16.51164587919832,19.066553048450142,18.370833060333794,8.755502361124051,14.603624334971972,12.244928723378376,7.4725566623627415,11.19070194011095,3.981011861916288,1.9636442102853158,3.624307747411639,17.44094491576407,14.284648688280628,19.583717449545066,1.6535394271339943,19.494425430384574,3.7972663374580096,16.280431209681336,2.5195003880951328,19.65042501811494,11.259788143215896,13.453598733736843,19.985892234238733,6.176592375682368,14.12104105730906,4.611864401925527,17.389308593729954,3.0893761739286862,17.850731126391842,9.787565434363836,15.678858425787382,14.354738921008149,5.441691615660744,18.978543379197752,8.889128124462378,0.13791050986926567,16.833103628180602,16.68372629025267,16.180539273630295,0.264393899861477,2.3401998059765594,6.133888944538368,19.092471912920153,19.567461885742183,5.281646182785389,1.5772718089286242,16.22324406878953,4.7712120797423685,12.962596855429535,19.565220660936326,14.457593169093519,0.5399644978552498,16.01945528637168,6.2371214856398804,1.0798282664403924,13.636114944496086,9.501092404390437,17.717575202168252,4.950093657974448,5.441091359951615,4.24949847203326,2.6790442728239583,15.073366726872193,16.21264360992297,10.212009065057984,19.48747697781069,14.155665374852727,6.742867492218925,4.058651429288029,17.121068842781035,11.704499940491587,2.6454079028070954,10.327643119760502,10.955881423361804,4.848037688361382,10.296311469889492,6.5193162528306425,12.311562617917925,15.438932620640777,3.5085160493462197,15.096772057474347,16.8235185189438,1.518921242393736,14.770241706234746,16.238091280006792,3.8708827819670466,16.719391604760986,18.39601779064092,7.743158696592594,9.6709000155942,10.1268867842434,17.666792219440875,18.76670128646512,18.155225543684566,11.979470050924416,15.330375984153166,19.330772059042086,18.287734099966485,3.918323394337455]}
},{}],53:[function(require,module,exports){
module.exports={"expected":[-0.29782489906294357,-0.2978248990629434,-0.29782489906294357,-0.29782489906294357,-0.2978248990629434,-0.29782489906294357,-0.2978248990629434,-0.2978248990629434,-0.2978248990629434,-0.2978248990629434,-0.2978248990629434,-0.2978248990629434,-0.2978248990629434,-0.2978248990629434,-0.2978248990629434,-0.2978248990629434,-0.2978248990629434,-0.2978248990629434,-0.2978248990629434,-0.29782489906294357,-0.2978248990629434,-0.2978248990629434,-0.29782489906294374,-0.29782489906294357,-0.2978248990629434,-0.29782489906294324,-0.29782489906294357,-0.2978248990629434,-0.29782489906294357,-0.29782489906294357,-0.29782489906294357,-0.2978248990629434,-0.2978248990629434,-0.2978248990629434,-0.29782489906294357,-0.2978248990629434,-0.29782489906294357,-0.2978248990629434,-0.2978248990629434,-0.29782489906294374,-0.29782489906293236,-0.2978248990629434,-0.29782489906294535,-0.2978248990629434,-0.2978248990629434,-0.2978248990629434,-0.2978248990629434,-0.2978248990629434,-0.2978248990629434,-0.29782489906294357,-0.2978248990629434,-0.2978248990629434,-0.2978248990629434,-0.2978248990629434,-0.2978248990629434,-0.29782489906294357,-0.2978248990629434,-0.2978248990629434,-0.2978248990629434,-0.29782489906294374,-0.2978248990629434,-0.2978248990629434,-0.29782489906294357,-0.297824899062944,-0.2978248990629434,-0.2978248990629434,-0.2978248990629434,-0.29782489906294324,-0.29782489906294357,-0.2978248990629434,-0.2978248990629434,-0.2978248990629431,-0.2978248990629434,-0.29782489906294374,-0.29782489906294357,-0.2978248990629434,-0.29782489906294374,-0.29782489906294357,-0.2978248990629434,-0.2978248990629434,-0.29782489906294324,-0.2978248990629434,-0.29782489906294357,-0.2978248990629434,-0.29782489906294357,-0.29782489906294357,-0.2978248990629434,-0.29782489906294357,-0.2978248990629434,-0.2978248990629434,-0.2978248990629434,-0.2978248990629434,-0.2978248990629431,-0.29782489906294357,-0.2978248990629434,-0.2978248990629434,-0.29782489906294374,-0.29782489906294324,-0.2978248990629434,-0.29782489906294324,-0.2978248990629434,-0.29782489906294374,-0.29782489906294374,-0.2978248990629434,-0.29782489906294374,-0.2978248990629434,-0.2978248990629434,-0.2978248990629434,-0.29782489906294357,-0.29782489906294357,-0.2978248990629434,-0.29782489906294374,-0.2978248990629434,-0.2978248990629434,-0.29782489906294374,-0.2978248990629434,-0.2978248990629434,-0.2978248990629434,-0.2978248990629434,-0.2978248990629434,-0.2978248990629434,-0.2978248990629434,-0.2978248990629434,-0.2978248990629434,-0.2978248990629434,-0.2978248990629434,-0.29782489906294374,-0.2978248990629434,-0.2978248990629434,-0.2978248990629443,-0.2978248990629442,-0.2978248990629431,-0.2978248990629434,-0.29782489906294374,-0.29782489906294374,-0.2978248990629434,-0.2978248990629434,-0.2978248990629434,-0.29782489906294374,-0.2978248990629434,-0.2978248990629434,-0.2978248990629434,-0.29782489906294374,-0.2978248990629434,-0.29782489906294357,-0.29782489906294357,-0.29782489906294357,-0.2978248990629434,-0.29782489906294357,-0.2978248990629434,-0.29782489906294374,-0.2978248990629434,-0.29782489906294357,-0.29782489906294357,-0.2978248990629434,-0.2978248990629434,-0.29782489906294357,-0.2978248990629434,-0.2978248990629434,-0.29782489906294374,-0.2978248990629434,-0.2978248990629434,-0.29782489906294357,-0.29782489906294357,-0.2978248990629434,-0.2978248990629434,-0.2978248990629434,-0.2978248990629434,-0.29782489906294374,-0.2978248990629434,-0.29782489906294385,-0.29782489906294357,-0.2978248990629434,-0.2978248990629434,-0.29782489906294374,-0.29782489906294374,-0.2978248990629434,-0.2978248990629427,-0.2978248990629434,-0.2978248990629434,-0.29782489906294374,-0.2978248990629434,-0.2978248990629434,-0.2978248990629434,-0.2978248990629434,-0.2978248990629434,-0.29782489906294374,-0.2978248990629434,-0.2978248990629434,-0.2978248990629434,-0.29782489906294357,-0.2978248990629419,-0.2978248990629434,-0.2978248990629434,-0.29782489906294374,-0.29782489906294374,-0.29782489906294357,-0.29782489906294374,-0.29782489906294374,-0.29782489906294357,-0.2978248990629434,-0.29782489906294374,-0.297824899062944,-0.2978248990629434,-0.29782489906294324,-0.2978248990629434,-0.29782489906294374,-0.2978248990629434,-0.2978248990629434,-0.29782489906294374,-0.2978248990629434,-0.2978248990629442,-0.29782489906294446,-0.2978248990629434,-0.29782489906294374,-0.29782489906294324,-0.2978248990629434,-0.2978248990629434,-0.2978248990629434,-0.2978248990629434,-0.2978248990629434,-0.2978248990629434,-0.29782489906294374,-0.29782489906294357,-0.29782489906294357,-0.29782489906294374,-0.2978248990629434,-0.2978248990629434,-0.2978248990629434,-0.2978248990629434,-0.2978248990629434,-0.297824899062944,-0.29782489906294357,-0.29782489906294374,-0.2978248990629389,-0.29782489906294374,-0.29782489906294357,-0.29782489906294357,-0.2978248990629449,-0.2978248990629434,-0.2978248990629434,-0.29782489906294374,-0.29782489906294357,-0.29782489906294357,-0.29782489906294357,-0.2978248990629434,-0.2978248990629434,-0.2978248990629434,-0.2978248990629434,-0.29782489906294374,-0.2978248990629434,-0.2978248990629434,-0.2978248990629434,-0.29782489906294357,-0.2978248990629434,-0.29782489906294374,-0.2978248990629434,-0.2978248990629434,-0.29782489906294374,-0.2978248990629434,-0.2978248990629434,-0.29782489906294374,-0.297824899062941,-0.2978248990629434,-0.2978248990629434,-0.2978248990629434,-0.29782489906294357,-0.2978248990629431,-0.2978248990629434,-0.2978248990629434,-0.2978248990629434,-0.2978248990629434,-0.2978248990629434,-0.2978248990629434,-0.2978248990629434,-0.2978248990629434,-0.2978248990629434,-0.29782489906294357,-0.2978248990629434,-0.2978248990629434,-0.29782489906294324,-0.2978248990629434,-0.29782489906294357,-0.29782489906294374,-0.29782489906294357,-0.29782489906294357,-0.29782489906294357,-0.2978248990629434,-0.2978248990629434,-0.2978248990629434,-0.29782489906294357,-0.2978248990629434,-0.2978248990629434,-0.29782489906294374,-0.2978248990629434,-0.2978248990629434,-0.29782489906294374,-0.29782489906294374,-0.2978248990629434,-0.2978248990629434,-0.2978248990629434,-0.2978248990629434,-0.2978248990629434,-0.297824899062944,-0.2978248990629434,-0.29782489906294357,-0.2978248990629434,-0.29782489906294357,-0.2978248990629434,-0.2978248990629434,-0.2978248990629434,-0.29782489906294374,-0.2978248990629434,-0.2978248990629434,-0.2978248990629434,-0.29782489906294374,-0.2978248990629434,-0.29782489906294357,-0.2978248990629434,-0.29782489906294374,-0.29782489906294374,-0.29782489906294374,-0.29782489906294357,-0.2978248990629434,-0.2978248990629434,-0.29782489906294357,-0.2978248990629434,-0.2978248990629434,-0.2978248990629434,-0.2978248990629434,-0.2978248990629434,-0.2978248990629252,-0.29782489906294374,-0.29782489906294374,-0.2978248990629434,-0.2978248990629434,-0.29782489906294357,-0.2978248990629434,-0.2978248990629434,-0.2978248990629434,-0.2978248990629434,-0.2978248990629434,-0.2978248990629434,-0.2978248990629434,-0.2978248990629434,-0.29782489906294374,-0.2978248990629434,-0.2978248990629434,-0.2978248990629434,-0.2978248990629434,-0.2978248990629434,-0.2978248990629434,-0.2978248990629434,-0.29782489906294224,-0.2978248990629434,-0.29782489906294374,-0.29782489906294357,-0.2978248990629434,-0.2978248990629434,-0.29782489906294374,-0.2978248990629434,-0.2978248990629434,-0.2978248990629434,-0.29782489906294357,-0.2978248990629434,-0.29782489906294374,-0.2978248990629434,-0.29782489906294357,-0.2978248990629434,-0.2978248990629434,-0.29782489906294357,-0.2978248990629431,-0.2978248990629434,-0.2978248990629434,-0.29782489906294324,-0.29782489906294374,-0.2978248990629434,-0.2978248990629434,-0.2978248990629434,-0.2978248990629434,-0.29782489906294357,-0.2978248990629434,-0.29782489906294374,-0.2978248990629434,-0.29782489906294357,-0.29782489906294357,-0.29782489906294374,-0.2978248990629434,-0.2978248990629434,-0.2978248990629434,-0.2978248990629434,-0.29782489906294357,-0.2978248990629434,-0.2978248990629434,-0.2978248990629434,-0.2978248990629434,-0.29782489906294357,-0.29782489906294357,-0.2978248990629434,-0.2978248990629434,-0.29782489906294357,-0.29782489906294374,-0.29782489906294357,-0.29782489906294374,-0.2978248990629434,-0.2978248990629434,-0.29782489906294357,-0.29782489906294374,-0.2978248990629434,-0.2978248990629434,-0.2978248990629434,-0.29782489906294357,-0.29782489906294357,-0.2978248990629431,-0.29782489906294357,-0.2978248990629434,-0.2978248990629434,-0.29782489906294357,-0.2978248990629434,-0.2978248990629434,-0.29782489906294374,-0.29782489906294374,-0.29782489906294357,-0.2978248990629434,-0.29782489906294374,-0.29782489906294357,-0.29782489906294374,-0.29782489906294357,-0.2978248990629434,-0.2978248990629434,-0.2978248990629434,-0.29782489906294374,-0.2978248990629434,-0.29782489906294535,-0.29782489906294374,-0.2978248990629434,-0.2978248990629428,-0.2978248990629434,-0.2978248990629434,-0.29782489906294324,-0.29782489906294374,-0.29782489906294357,-0.2978248990629434,-0.29782489906294357,-0.2978248990629434,-0.29782489906294374,-0.29782489906294357,-0.2978248990629434,-0.29782489906294357,-0.2978248990629434,-0.2978248990629434,-0.2978248990629434,-0.2978248990629434,-0.2978248990629434,-0.29782489906294374,-0.29782489906294374,-0.29782489906294357,-0.2978248990629434,-0.2978248990629434,-0.2978248990629434,-0.29782489906294324,-0.2978248990629434,-0.2978248990629434,-0.29782489906294357,-0.29782489906294357,-0.2978248990629434,-0.29782489906294374,-0.2978248990629434,-0.2978248990629434,-0.2978248990629434,-0.29782489906294357,-0.2978248990629434,-0.2978248990629434,-0.2978248990629434,-0.29782489906294374,-0.29782489906294324,-0.29782489906293697,-0.29782489906294374,-0.29782489906294374,-0.2978248990629434,-0.29782489906294357,-0.29782489906294357,-0.29782489906294324,-0.2978248990629434,-0.29782489906283394,-0.29782489906294374,-0.2978248990629434,-0.2978248990629434,-0.2978248990629434,-0.2978248990629434,-0.2978248990629434,-0.29782489906294374,-0.29782489906294357,-0.2978248990629434,-0.29782489906294357,-0.29782489906294324,-0.2978248990629434,-0.2978248990629434,-0.29782489906294374,-0.29782489906294357,-0.2978248990629434,-0.2978248990629434,-0.29782489906294357,-0.29782489906294374,-0.29782489906294374,-0.2978248990629434,-0.29782489906294357,-0.2978248990629434,-0.29782489906294324,-0.2978248990629434,-0.2978248990629434,-0.29782489906294357,-0.29782489906294324,-0.2978248990629431,-0.2978248990629434,-0.2978248990629434,-0.29782489906294357,-0.29782489906294357,-0.2978248990629434,-0.2978248990629434,-0.2978248990629431,-0.2978248990629434,-0.2978248990629434,-0.2978248990629434,-0.29782489906294357,-0.2978248990629431,-0.2978248990629434,-0.2978248990629434,-0.29782489906294357,-0.2978248990629434,-0.2978248990629434,-0.29782489906294374,-0.29782489906294385,-0.29782489906294374,-0.2978248990627849,-0.29782489906294357,-0.2978248990629431,-0.2978248990629434,-0.29782489906294374,-0.29782489906294374,-0.2978248990629434,-0.29782489906294357,-0.29782489906294357,-0.29782489906294324,-0.2978248990629431,-0.2978248990629434,-0.29782489906294374,-0.29782489906294374,-0.2978248990629434,-0.29782489906294374,-0.29782489906294357,-0.2978248990629434,-0.29782489906294374,-0.29782489906294357,-0.2978248990629434,-0.29782489906294374,-0.2978248990629434,-0.29782489906294357,-0.29782489906294324,-0.2978248990629434,-0.2978248990629434,-0.29782489906294357,-0.29782489906294374,-0.29782489906294357,-0.2978248990629434,-0.2978248990629434,-0.29782489906294357,-0.2978248990629434,-0.2978248990629434,-0.2978248990629434,-0.29782489906294374,-0.29782489906294357,-0.2978248990629434,-0.29782489906294374,-0.2978248990629434,-0.29782489906294385,-0.2978248990629434,-0.2978248990629434,-0.2978248990629434,-0.29782489906294357,-0.2978248990629431,-0.2978248990629434,-0.2978248990629434,-0.2978248990629434,-0.2978248990629434,-0.2978248990629434,-0.2978248990629434,-0.29782489906294357,-0.29782489906294374,-0.2978248990629434,-0.2978248990629434,-0.2978248990629434,-0.2978248990629434,-0.2978248990629434,-0.2978248990629434,-0.2978248990629434,-0.2978248990629434,-0.29782489906294357,-0.2978248990629434,-0.2978248990629434,-0.29782489906294374,-0.29782489906294324,-0.2978248990629434,-0.2978248990629434,-0.2978248990629434,-0.29782489906294357,-0.2978248990629431,-0.2978248990629434,-0.29782489906294357,-0.2978248990629434,-0.2978248990629434,-0.29782489906294374,-0.2978248990629431,-0.2978248990629434,-0.29782489906294324,-0.29782489906294357,-0.2978248990629434,-0.29782489906294374,-0.297824899062944,-0.2978248990629434,-0.29782489906294374,-0.2978248990629434,-0.2978248990629434,-0.29782489906294357,-0.29782489906294374,-0.29782489906294357,-0.2978248990629419,-0.2978248990629434,-0.2978248990629434,-0.2978248990629434,-0.2978248990629434,-0.29782489906294357,-0.29782489906294374,-0.2978248990629434,-0.29782489906294357,-0.29782489906294374,-0.29782489906294357,-0.2978248990629434,-0.2978248990629434,-0.29782489906294374,-0.29782489906294357,-0.29782489906294296,-0.2978248990629428,-0.2978248990629434,-0.2978248990629434,-0.29782489906294374,-0.2978248990629434,-0.2978248990629434,-0.29782489906294374,-0.29782489906294357,-0.2978248990629434,-0.2978248990629434,-0.2978248990629434,-0.29782489906294357,-0.2978248990629434,-0.29782489906294357,-0.2978248990629434,-0.2978248990629455,-0.29782489906294374,-0.2978248990629434,-0.2978248990629434,-0.2978248990629434,-0.2978248990629434,-0.297824899062944,-0.2978248990629434,-0.2978248990629434,-0.2978248990629434,-0.29782489906294357,-0.2978248990629425,-0.29782489906294357,-0.29782489906294357,-0.2978248990629434,-0.2978248990629434,-0.2978248990629434,-0.29782489906294374,-0.2978248990629434,-0.2978248990629434,-0.29782489906294357,-0.2978248990629434,-0.2978248990629434,-0.2978248990629434,-0.29782489906294324,-0.2978248990629434,-0.2978248990629434,-0.29782489906294374,-0.29782489906294374,-0.2978248990629434,-0.2978248990629434,-0.29782489906294357,-0.2978248990629434,-0.29782489906294357,-0.29782489906294357,-0.29782489906294357,-0.2978248990629434,-0.29782489906294324,-0.29782489906294357,-0.29782489906294357,-0.2978248990629434,-0.2978248990629434,-0.29782489906294357,-0.29782489906294374,-0.2978248990629434,-0.29782489906294357,-0.2978248990629443,-0.2978248990629434,-0.29782489906294324,-0.29782489906294374,-0.2978248990629434,-0.2978248990629434,-0.29782489906294357,-0.2978248990629434,-0.2978248990629434,-0.2978248990629434,-0.29782489906294357,-0.2978248990629434,-0.2978248990629434,-0.2978248990629434,-0.2978248990629434,-0.2978248990629434,-0.2978248990629434,-0.2978248990629434,-0.2978248990629434,-0.2978248990629434,-0.2978248990629434,-0.2978248990629434,-0.29782489906294357,-0.29782489906294374,-0.29782489906294324,-0.29782489906294374,-0.2978248990629431,-0.29782489906294374,-0.2978248990629428,-0.2978248990629434,-0.2978248990629434,-0.29782489906294357,-0.2978248990629434,-0.29782489906294357,-0.29782489906294374,-0.2978248990629434,-0.2978248990629443,-0.297824899062944,-0.29782489906294374,-0.29782489906294357,-0.2978248990629434,-0.29782489906294374,-0.2978248990629434,-0.29782489906294357,-0.2978248990629434,-0.2978248990629434,-0.29782489906294374,-0.29782489906294357,-0.2978248990629434,-0.29782489906294357,-0.29782489906294374,-0.29782489906294357,-0.29782489906294357,-0.2978248990629434,-0.29782489906294324,-0.2978248990629434,-0.29782489906294374,-0.2978248990629434,-0.29782489906294374,-0.29782489906294357,-0.2978248990629434,-0.2978248990629431,-0.29782489906294357,-0.2978248990629434,-0.2978248990629434,-0.29782489906294357,-0.2978248990629434,-0.2978248990629434,-0.2978248990629434,-0.2978248990629434,-0.29782489906294374,-0.2978248990629434,-0.2978248990629434,-0.29782489906294374,-0.2978248990629434,-0.2978248990629434,-0.29782489906294374,-0.2978248990629434,-0.2978248990629434,-0.2978248990629434,-0.2978248990629434,-0.2978248990629434,-0.29782489906294374,-0.29782489906294357,-0.29782489906294374,-0.2978248990629434,-0.29782489906294374,-0.2978248990629434,-0.2978248990629434,-0.2978248990629434,-0.2978248990629434,-0.29782489906294374,-0.29782489906294374,-0.29782489906294374,-0.2978248990629428,-0.2978248990629434,-0.2978248990629434,-0.29782489906294374,-0.29782489906294374,-0.2978248990629434,-0.29782489906294357,-0.29782489906294374,-0.2978248990629434,-0.29782489906294374,-0.29782489906294357,-0.29782489906294374,-0.2978248990629434,-0.2978248990629434,-0.2978248990629434,-0.2978248990629434,-0.2978248990629434,-0.2978248990629434,-0.29782489906294374,-0.29782489906294474,-0.29782489906294224,-0.2978248990629434,-0.29782489906294357,-0.29782489906294357,-0.2978248990629434,-0.2978248990629434,-0.2978248990629434,-0.2978248990629434,-0.2978248990629434,-0.2978248990629434,-0.2978248990629434,-0.29782489906294374,-0.29782489906294374,-0.2978248990629434,-0.2978248990629434,-0.2978248990629434,-0.2978248990629425,-0.29782489906294374,-0.2978248990629434,-0.29782489906294357,-0.2978248990629434,-0.2978248990629428,-0.29782489906294357,-0.2978248990629434,-0.2978248990629434,-0.2978248990629434,-0.29782489906294374,-0.29782489906294374,-0.2978248990629434,-0.2978248990629425,-0.29782489906294374,-0.2978248990629434,-0.2978248990629434,-0.29782489906294357,-0.2978248990629434,-0.2978248990629434,-0.29782489906294357,-0.29782489906294357,-0.29782489906294357,-0.29782489906294374,-0.29782489906294374,-0.29782489906294357,-0.2978248990629434,-0.29782489906294357,-0.29782489906294374,-0.2978248990629434,-0.2978248990629434,-0.2978248990629434,-0.29782489906294374,-0.29782489906294324,-0.2978248990629434,-0.29782489906294374,-0.29782489906294324,-0.2978248990629434,-0.29782489906294374,-0.2978248990629434,-0.2978248990629434,-0.29782489906294357,-0.2978248990629434,-0.29782489906294385,-0.2978248990629434,-0.29782489906294357,-0.2978248990629434,-0.2978248990629434,-0.29782489906294357,-0.29782489906294357,-0.2978248990629434,-0.2978248990629434,-0.2978248990629434,-0.29782489906294357,-0.29782489906294357,-0.29782489906294357,-0.2978248990629434,-0.2978248990629434,-0.2978248990629434,-0.29782489906294374,-0.2978248990629434,-0.29782489906294357,-0.29782489906294374,-0.2978248990629434,-0.29782489906294357,-0.2978248990629434,-0.29782489906294374,-0.2978248990629482,-0.2978248990629434,-0.29782489906294374,-0.29782489906294374,-0.2978248990629434,-0.2978248990629434,-0.29782489906294374,-0.2978248990629434,-0.29782489906294357,-0.2978248990629434,-0.29782489906294374,-0.2978248990629434,-0.29782489906294357,-0.29782489906294357,-0.2978248990629434,-0.29782489906294357,-0.29782489906294357,-0.2978248990629434,-0.29782489906294357,-0.2978248990629434,-0.29782489906294374,-0.2978248990629434,-0.2978248990629434,-0.29782489906294374,-0.2978248990629434,-0.2978248990629434,-0.29782489906294163,-0.2978248990629434,-0.2978248990629434,-0.2978248990629434,-0.2978248990629434,-0.29782489906294374,-0.2978248990629434,-0.29782489906294374,-0.29782489906294374,-0.29782489906294374,-0.2978248990629434,-0.2978248990629442,-0.2978248990629434,-0.29782489906294357,-0.2978248990629434,-0.29782489906294357,-0.2978248990629434,-0.29782489906294357,-0.2978248990629434,-0.29782489906294374,-0.2978248990629434,-0.2978248990629434,-0.2978248990629434,-0.29782489906294357,-0.29782489906294357,-0.29782489906294357,-0.2978248990629434,-0.29782489906294374,-0.2978248990629434,-0.29782489906294374,-0.2978248990629434,-0.29782489906294324,-0.29782489906294374,-0.29782489906294324,-0.2978248990629434,-0.29782489906294357,-0.2978248990629434,-0.2978248990629434,-0.29782489906294357,-0.297824899062944,-0.29782489906294324,-0.2978248990629434,-0.2978248990629434,-0.29782489906294357,-0.29782489906294357,-0.29782489906294374,-0.29782489906294357,-0.2978248990629434,-0.2978248990629434,-0.2978248990629434,-0.2978248990629325,-0.2978248990629434,-0.29782489906294374,-0.2978248990629434,-0.2978248990629434,-0.29782489906294374,-0.29782489906294374,-0.2978248990629434,-0.29782489906294324,-0.2978248990629434,-0.2978248990629434,-0.29782489906294374,-0.2978248990629434,-0.29782489906294374,-0.29782489906294357,-0.2978248990629434,-0.2978248990629434,-0.2978248990629434,-0.29782489906294374,-0.2978248990629434,-0.29782489906294357,-0.2978248990629434,-0.29782489906294296,-0.2978248990629434],"c":[16.368291136177174,14.689280655883074,18.261908634251668,17.193183556447895,3.7320197695497104,15.959349164626254,6.079633952102432,3.146319370773121,8.97770808627903,4.3714800411731005,12.434860987115144,3.356262113372922,13.434867742936536,15.925670761254896,4.069487544777216,8.7109005609821,6.64687106846589,3.2717235710333097,4.061421792054856,8.206164314834973,8.46132648675948,21.04208256830193,19.986952622278665,11.238481919915406,8.389365121043792,10.961471697446884,11.989735570113103,15.78217830571527,22.204480659865453,16.80672806361146,6.010119139618089,18.01044692246716,18.3387540234711,18.29374440556136,3.550461851601171,13.104575132346671,10.10302771235663,19.276451470635568,13.221724146512502,7.034312376516089,4.743138466748569,10.983592847234428,16.600676813310766,18.03412445182977,19.63326470854603,16.374396797214132,3.3575893831949375,18.62592964053658,11.190742003357135,4.385222364061621,16.93649952342429,15.717147871360467,19.12537241739215,4.241972952886959,20.902734104228422,15.194224746538996,14.230077422663575,12.877079607859251,5.655044866635314,15.725629065359117,7.820231625080189,15.41889667012145,15.022578442423638,18.163536404250934,13.24788093948577,4.152735952465444,9.685428892990231,18.47370340175553,13.920443381876694,14.160265397386215,23.51087387051168,14.678374848599963,6.8083765655939015,20.178231646559198,12.30401186625808,17.238740697158708,10.173793295335763,17.94329515967961,11.001144317929715,7.445631007212602,11.999543912039913,18.550292454490066,3.283743900670006,21.157047294729665,10.835353026632733,5.347185539218416,10.097594357707374,3.5614893864152384,12.492566555465562,16.031801331320093,10.369038603468605,1.4508740147246892,4.460910636791363,21.576187256349396,20.335372542959853,13.232947698586765,8.392478812407228,14.93135551499528,5.459441119411617,20.090411865307214,11.434426909185625,19.400847053763652,7.32931246069653,20.129683468782428,7.503275624385224,17.429750419797262,5.6203999784868115,21.2524187075452,20.33992784969011,12.017255575774655,12.402476692398965,17.984092965075092,8.478917486949888,12.822705550122672,19.033611436148625,16.01340289790983,5.6883926568179275,5.367737845632686,9.802709245853311,7.771842658648858,13.409640050271221,6.81770443188414,19.204114354844588,9.96506700208602,19.144980701245025,13.858250548404387,16.95189490133083,21.593797155954288,21.78351019754041,16.8056185392761,11.610000763643637,15.270182352885088,8.901789789746964,4.381372951153673,17.888859386362302,11.95593760876814,15.515052042510595,0.5704418260393571,9.564528620640846,5.163364390776794,3.839900986186816,5.557264596666435,16.26261755888182,8.682282731243584,15.857060064471643,14.095724813934417,1.3408851828125978,7.755885846931176,11.302690784487062,8.056203108805075,10.61326630582655,2.3600983622850875,6.579919154054072,11.605558096662888,5.435786663174436,19.41398860919807,4.3191969300231765,14.186444984585394,4.018746288551535,10.791714017272525,8.576522255600343,15.29185763142799,18.328836444820524,10.245042628430747,16.41755051652836,13.22692639056685,16.581013213950843,19.48573107161501,9.914040767797974,6.551338433656456,8.337166304651245,14.758853451492413,12.754162088143005,14.354070637378216,10.93441220436797,17.70547532849124,20.272384002627206,17.981551997789712,16.735345405886655,8.039585936022094,18.2496169297264,18.18724645885247,13.941648099671381,16.278917188119447,6.466228231321386,17.286105443791218,22.338680776375714,23.335108858758975,9.241398248918124,10.32936455777777,14.617654071831971,19.631409128035514,19.610125818526782,10.548558677155237,7.817791442039776,12.992772560826012,6.275568619695238,13.977399604257979,13.378984049097847,19.547314228085927,17.267104475361037,9.740710701492088,17.75420520781766,4.967720938657319,13.151480036821763,18.174947046562927,18.49649365120239,13.948332989323776,13.988196080258561,19.84947753025072,10.753311512666984,15.698357352722255,17.249281688421277,7.2734437152904245,10.409355462036425,21.547635965389276,17.96813474250994,8.550375326011753,11.037694061405645,13.469089854445357,10.93776624831307,5.113745284506404,16.492422655383308,12.771850273906733,4.346282942423059,16.95327042700151,14.7443148097709,12.338415775276225,16.070164163521834,16.338439735764517,13.543032772050934,17.960687978453894,18.704375516317334,15.549842422767265,10.268617241534606,5.469437995435975,21.494334987892614,3.016252485340422,9.41516851804033,3.4640990957461155,19.83492977931646,21.118838008699655,7.068685000296975,8.461815117596926,15.43590290081195,3.621037669110283,9.066223575654382,5.354077020738455,10.231329344506507,12.197288177862458,17.206495239140455,11.12912962510381,9.974261686595922,14.158068146670232,9.29174967841222,8.89852536925585,5.02747545486371,7.738321147126488,4.531259524824725,14.521997525412894,6.1054616610685315,11.212511861267826,18.138152786864413,3.846970782199595,6.3678133070554885,18.409420368121346,18.674873052322294,20.288375882603713,18.47700077042614,5.583053353333388,7.2311142560324555,19.96249023896637,20.82232719906482,11.394473222017021,14.759517370916365,7.329683227938245,16.33176573148158,6.275412241656834,16.174274125427647,8.918397254818895,14.356606830169374,5.507344418744104,9.467908633976517,10.76039115346344,4.685015304059174,2.340876457352385,1.5528525681511727,9.55577926752542,20.89557428573265,17.971521996825405,16.47976808067313,13.518373780185339,3.322158008065546,11.525972458795902,18.732035246340875,11.489485350826063,14.950891872786762,17.88331616444139,18.751567303237383,6.959089211259177,12.722323907999423,20.892585520914494,7.987482336024584,7.6876535776638235,4.6808915406396086,21.27697058346363,23.050251453363263,16.36747297748255,20.53606342901923,15.482584121195156,1.5774471955737077,12.76868591157026,20.559286503060214,10.21756286236865,17.68309818387493,10.441051557427844,7.850908148155413,15.249324624862368,22.60530267797339,19.166445507318908,16.189369620721628,17.986302228383096,7.74879713650427,20.307320346577853,12.996183460363708,16.281181774600523,8.485421710694773,5.2518624609931805,16.18423652297319,9.189460250429875,2.537292419586227,9.548976011413686,5.594345607955793,19.749501242582866,17.258635033043365,8.85898005771392,11.900326246306031,13.4744722693727,3.1530351633238407,20.36700208624422,13.426357106651762,23.572777622032852,11.686302360153368,8.409655734505037,20.325068358984808,10.414259194176651,15.036742269201593,10.23068841410204,2.224305748172984,6.702892340268637,12.845301607180268,20.122277912474605,10.44288430134878,16.201022948511937,18.80951949532302,7.14381139901426,10.319255114662797,18.304733836668138,21.070018292770236,18.80332266492302,10.869476543406018,18.04322858065013,6.385758617724445,17.037019060960812,20.194083145293554,16.54653259891591,13.309517263592218,20.904444490993416,15.571879450150064,20.741964149948224,18.019821641215323,19.475035470533697,15.28328122565332,17.719029901411172,1.78804931124893,19.714133358156378,17.67040893726273,21.689134615531923,7.377777793723498,21.37121873909043,9.926713772008185,16.82314665347994,12.075870037555612,16.982522717768695,12.523135593905467,11.666825305488729,7.44408436758411,12.47985107040821,20.965138260909303,19.49173327281522,7.0164657259164755,10.343639106172336,6.5801234607115635,2.716096291530301,10.931238014965908,22.2507886500435,15.960884106713996,18.326204756191,3.0809050164192815,9.926577166102796,19.40474337738129,21.78280938905988,12.610107307750829,22.493515381077504,13.821210449965147,10.769775381443152,21.66755534105875,2.4112242910806287,6.964936458492993,12.93275487584676,17.50964529188294,7.052003621164474,7.361315993285932,18.180793744470726,13.950468154212297,3.5300029796412664,7.613786738979927,10.174728843949723,19.792441354351492,20.990200208520385,12.881965287763755,17.292006304100166,19.86709273177596,9.25828950697623,16.79451038260365,4.115339514426273,18.124207378470757,17.136550130195026,11.203184412267307,8.485256956941878,5.2034359268105534,22.839572050510114,9.668237143685324,19.229519723527947,16.50038501288822,12.003738079513703,14.682738082848537,5.4936050508855985,2.8120763433194504,11.018101583350072,15.898460346383956,9.586083506953475,7.008914982528756,4.57481231085049,20.440251829051853,3.591754746092086,22.351144384639603,18.281728068581153,0.6724418436230536,18.98507683736364,19.96819903329237,1.5473135273213185,13.297029369280967,5.762311949130172,13.09594186674779,6.749155405880405,0.6460924323846408,18.743268896184915,17.58766841170012,20.326483586805708,13.026858759533933,17.659855311701893,12.825482633347342,14.7738127430813,16.410340462244445,21.057677984182156,16.752478411074808,2.8491647707843217,15.553367458803205,2.742084094908643,13.066341618683301,11.507013748654387,12.863669392875844,11.809703409750123,7.623896475065319,18.32390240740854,16.554455139773335,13.725007462505747,8.623856886451971,14.871706281687015,8.734155606508095,17.377060163105128,21.552007484413746,6.732814324588275,19.395435884689473,15.680611267312994,6.825338733954926,2.1818525517905636,11.400505264420083,9.029849709342344,5.122598401929722,16.87920298369375,16.874805284406463,8.319184960639655,16.559935805157476,15.839868540424492,5.088318579898546,13.37452257106386,7.930445980163426,9.46962195637435,14.99888121667719,5.132921826333362,17.52507417001793,9.996356617611422,20.823165173431295,21.43016152525089,17.25617637658542,17.958224327554507,6.596490348276912,19.539296494709074,8.571469124753785,21.10245259645398,18.8809368354745,4.521081855157068,11.633109242262519,17.476796904444953,8.465114497142999,14.021240527457625,19.632939110523395,8.211965900474585,14.773712724931391,17.052493854874534,23.12206621604573,14.81385304288802,13.876479390424397,19.686377801590037,7.933589821808146,18.220593309025443,8.268085110571727,16.015462147401216,8.68158329686225,20.065780278290056,9.68189438007874,7.755614780782568,15.028185179155654,5.382546134976258,13.95685149857626,16.94261582965857,5.967585850105471,7.483013133764432,17.164106184166645,10.170354410549535,11.18130762594639,5.123391540093988,16.39504074115669,20.89362047963121,11.542371832885431,13.930192281732463,18.17096522585706,21.248819875538125,5.491725148694206,13.256224479879233,19.55177924418501,4.875452328359052,8.414321359041484,2.1216932238853103,19.423274289535183,13.851861257093104,16.270643219120462,2.2591252142220446,15.079313397434529,4.713933105730771,9.58777747478862,8.361015157183942,22.405597767892587,12.212044512131811,11.525952386149022,10.480489267179152,15.023070428024665,14.44432064461473,11.541803760782852,8.231540615248864,15.535624119803343,11.885153381328724,4.3435233805283,8.425102142353458,9.758176346614631,8.096666177190553,18.549460491860916,19.573840505174708,15.629192667407967,10.034137377596966,4.450688639430124,19.950423743980632,3.1167106239259743,16.1280189255878,4.528905115942342,23.985469838718906,2.5687919323175716,7.808859907855634,20.86846528908224,6.282612834460608,15.829500628367992,16.39643223735092,5.351084909594788,4.793294936692158,21.94306952269285,20.945291035120647,19.98797547245986,13.977208002735399,12.774769536553535,12.21965756451559,15.141916746912372,4.825188705656291,18.015269063754598,8.402704935068515,21.982691817400575,1.8011260339202881,8.306057214609071,3.3006392729454985,10.760862558631873,10.876019044710162,14.219764795929283,2.5393873770260185,10.701367658675716,10.207396482446352,8.668584097378023,16.682755083219497,16.930949490542133,15.415150242533343,21.242791424995144,4.330488693643414,20.356465212219632,4.3200267604468685,4.502332337754088,6.005901366428321,17.74431743404663,5.669936586107687,15.48759624258834,20.869382934833702,17.680078573568114,21.127708416663815,4.409117334606246,18.81802975324721,16.631924925950216,6.660847360178698,19.866759613009354,7.520442282205519,19.728916706451933,8.371556288052115,18.20716971759145,8.184854190520603,17.283159844436152,5.850164680595567,14.144519757527,3.788429939727899,8.547231630009918,16.30473674035313,12.304418722555614,21.915039821033563,12.973374413556336,17.282831265883576,4.837604984415302,10.251484726878344,3.6458058776476854,3.0008940339594705,19.01354866040476,15.872817577800182,10.397481302852155,7.482606105346651,19.217143014277998,19.84263473174556,12.714805952699257,2.96137169228912,2.091186651476823,21.393883138810793,11.50000338771564,21.423336588274495,7.349060701246252,20.388090804549755,15.769237600109772,20.853283522293506,10.436521778420692,6.424640894149624,20.91723149322035,10.386784769476517,6.646993748593987,0.7384166340345023,17.760796910789438,9.094990506680823,19.231950024706492,7.179382145577527,16.468436198865625,16.562024521602694,12.5923768629661,21.82494142067324,13.530047523383944,10.788831675554079,15.686275583009596,19.882944417615146,17.92437809247564,20.75101895574325,9.818001275775487,7.580313474452385,16.967508253510683,10.403520773740315,19.06592826249001,6.993071802037386,13.09592445530444,22.793228426331684,9.669717734984049,9.540563507335918,18.708010271082987,15.297637216613637,7.013655649195027,2.6833951995750303,20.71025029928547,5.64771569507872,13.442286808903006,10.95536818599946,6.564295987849402,6.310146648521654,11.078702837736227,3.673168995544735,20.649605765934552,4.030847376892171,10.970525535374227,19.441481421719075,4.495744219613744,20.224799645572237,13.435368043035222,11.238032702627924,11.545768234541086,9.051210516389041,7.826555653530475,15.241275902679526,7.1098966453334675,7.537144578310908,18.35963745227124,16.00523654580767,5.516979059793059,13.168238873661405,12.63727633731982,15.04440571430018,4.018906069375008,10.938813168524304,6.637120721486944,17.707136970993457,18.69053344785182,19.443348471545622,4.512012859172332,2.266334536311682,12.24146691944571,21.45955147287992,9.92318551248297,5.98281228576093,13.256360323822152,14.195540959248028,15.619305556264845,5.769868540374951,19.62590423202203,19.677867435657586,16.90306787468723,15.303223841966648,8.586624050404868,10.798171669698679,4.808198120547949,15.425971517072483,5.143733274640018,18.65860505253124,4.819834125185224,6.143209051782685,10.168375424283052,7.834936696350388,12.154504319547904,10.25151013547263,7.088512579158982,5.505527582352311,8.453361328297047,20.70077037518891,14.301744757994637,10.759368270816513,12.297219391244969,10.158187983381595,12.156166035762912,13.239964845250467,20.214177969703805,6.310111268956035,20.95740325636237,15.790137294911494,10.76303739073759,17.61447096375215,7.178693640498146,8.699414408920227,0.6691686177402435,4.646468975901377,21.091606338734785,3.311377880168943,6.56432386779482,5.832680315721472,15.28717275245564,8.725566160607922,17.86623084393182,19.319397145670404,14.766026699692178,5.15283594276426,18.756359557738033,8.421877229378502,17.784843016163023,7.596109704228695,5.312722429444278,12.274011511135754,20.492182406649047,12.804711106901102,3.883687347091767,12.731217632660455,18.254376236065337,8.9787440825076,15.772916295840915,5.840788512257394,9.61664912334301,17.74281904926615,18.213734553139282,4.455450183846342,8.46549104488512,9.222654200657614,12.226029226234267,18.20879376199241,22.986923018752588,8.066116074854612,5.952743265804768,11.880605417436772,12.793787554890542,14.786495355897884,18.85241873776767,19.980548659221988,5.671256001816207,11.950025748212818,12.625286439381725,6.329052050383992,4.969504918083546,10.06245947235174,9.936018782617266,20.08540584753167,11.732073827478503,21.237569169910987,7.184101825617493,8.170471317161631,18.02344850416423,11.541984800443819,8.90656983984768,14.658790988143053,11.46781446147239,13.543195697440757,12.986663471493804,21.228492650899394,11.805374621281196,18.41982234211862,3.9595912679501475,7.4834935965560305,11.95997968996935,21.791536238607407,14.121914090326172,10.591785717756832,14.069858363379097,4.434082431958165,13.695500958989902,10.026063977411724,0.9847495053610474,1.9556861252277953,12.304981454874724,21.92245551689255,7.472633198519874,10.69550854614794,19.73877778577228,19.412123849458688,14.568272024041626,19.87493419986971,8.485559875786924,23.21903476546123,5.992038682730424,21.821423913817448,7.9851814756293145,4.891416291417475,8.55018332285339,16.418028207325815,5.80107015287794,10.314743592468826,6.427674601607969,10.839048367198993,19.56413200832446,8.204118714777863,17.475028889719223,9.025211553866594,4.781806671196495,15.188185936699007,10.258881078493504,20.92011655877002,3.608165705587914,10.971354291580369,20.08407371647985,23.19933542179812,17.783036457750775,17.953604570509803,19.51835534795571,11.67094505703235,20.808966356584683,10.61970564994434,2.3899730158501438,8.863811784619752,12.020789456604671,14.73073122120592,8.198824499999233,14.701562154792182,7.155955459647457,19.30911403636276,13.279111030861701,9.442726749772575,19.237073135522678,12.818234100538266,21.524942252678233,7.475026610393764,17.076157443553154,4.240288098922017,21.273166201818288,5.6633185338650245,17.304215041139628,9.905578694527682,5.143294937392709,9.011012591994223,17.14625942264797,15.465987593042673,17.47720295120458,20.638279917612394,21.074967629713317,11.293388560728538,17.933863622408747,3.2173259768842715,20.77399500747894,14.027687422457614,3.3194692901692484,4.422176560737279,1.8382957779830489,17.181334775734644,7.704486844429303,19.830943335313876,18.92316788317956,14.556272293581978,10.144743870431995,19.474059820726204,10.309080087755373,5.466883126489256,6.993179827096672,17.522129784432618,10.38180356075789,16.24921201423657,16.41359362757729,23.07726667820854,11.494981286263817,23.029129451002298,19.93559533263187,19.75181734638739,2.8221896633340053,11.402952629959334,20.200639622072828,14.150301799289375,17.502296657685353,3.746090923266587,8.306321682758373,9.797703232067596,1.5337184656464204,21.169536881478958,5.288393059343168,4.878179951931412,6.070456808461779,14.95060347291523,13.467616351576655,18.517607962347473,11.026642894537948,9.77227086894244,5.095664586585168,10.977641957116623,16.800195759953752,10.208874156583368,11.561822780961617,15.466915679042417,10.828860620423072,21.967892030969946,12.191374776736259,15.216557932402385,17.53293997805901,12.716058664666189,2.754307808381241,15.531655224419064,8.42688273886942,21.682508355789427,6.5060063609154835,14.114638736702505,12.864998042452827,18.790509370674414,9.4187995269204,13.44121541966847,15.419310302509714,2.794947144740425,9.977094280412768,1.6397821484374775,11.539946623430382,19.315659600902638,17.299016916027497,5.716364424011549],"x":[28.380849447779447,24.26640941564214,28.320190660064142,23.755388767239133,15.86883534332895,28.395858866099665,19.25836597524179,4.748356569827524,23.14615299895749,12.105037931271585,14.911938505539032,8.66468946400264,18.504129460083888,28.14225385018763,18.11866373551083,21.264778034703312,13.746070459228005,12.042463034391911,5.8739364757299235,15.94912877287096,21.299315114352293,31.538097041656545,34.54302234228678,26.261119635377213,23.52169783769559,19.80444959897973,16.24333868758758,20.562005095517293,36.031504058137145,31.680274620328593,17.14085133987424,32.43031910797099,33.487803069544015,28.99679422881083,14.635318909756561,15.58438680890883,18.542971478703258,23.562200166550973,21.926123850180577,7.756276333867011,4.763449584815323,14.227292037667361,17.117574862603384,34.522227226004404,35.887686026108966,24.116032681467658,14.725699934018492,32.1407053317748,17.837519867808194,10.60148584355938,32.95463266537027,29.85932478647735,27.058712733810047,5.696504583863174,24.841873848705657,30.837691278173097,27.926011967927376,27.077821674286415,9.903202304529172,17.93181632088423,21.443601842524075,28.654604633545794,21.089430604795748,19.250884526434323,24.65220667792113,11.034939001619218,16.880362248565657,22.82078982214209,28.60539000897216,22.657856225979273,38.05082407600321,18.0375659940428,16.412910985104112,23.513334094895,23.175496493204008,22.954887875074053,16.120608924340097,30.776545046189327,13.18446296046108,15.81122624588335,14.7955210842382,28.31107715040831,6.598805920188758,29.605192382612138,23.706731116438842,17.71294466542127,16.96387821571767,15.888702835367717,23.80391364773014,31.08714738679347,18.30889566297892,3.8292322246123414,5.225028038016291,35.842719559257134,33.69825733270332,15.362835211695053,24.694082398173542,22.46085056743435,15.379955533677307,30.25003476018516,23.343607535114472,26.23402667399597,17.018683739134083,32.619736411682,19.60647091878181,30.88456845217941,9.35615784902324,29.78874764767015,25.300940018357707,23.075703564572514,21.74849101812493,27.767478571265983,14.762524967181042,18.511068551165227,20.75214282947451,24.373567439223645,12.94754648666494,19.932853221007548,21.801607237048106,16.280612489709725,29.34466551470566,13.888561810689703,27.457086579405527,15.120038730153382,29.804235124373903,24.909508537598157,29.29354468488301,30.1069766336566,36.073537464835184,17.330852586383706,11.690843344140562,18.12459960345236,21.26236561445678,5.444724176490973,24.28004689590213,12.219759468997358,30.382735168780684,1.3491377156927196,20.540305085650203,19.647501514239828,15.219102027472928,13.596646132625189,25.828611930806687,14.978117842243796,16.79861362559974,25.288010018646098,1.4985286843723378,23.641825679951765,23.09015268975031,10.031907926382026,22.55470983604533,5.594244519526314,9.091304885295367,22.43806546132045,15.428821115182409,34.48461501292664,12.079730050335506,24.4934671605077,13.355875209047127,13.539838037688439,21.48338138711845,25.339596864122836,33.53896719581172,13.041233252173855,23.357017671124886,14.714324737402741,17.52334626463914,30.248880879935758,11.155234963797653,15.972918483084799,9.03941294123722,30.57275322726171,18.80535131344013,26.124310547132406,25.84743141151435,21.437808793212163,24.41208695431124,18.839549198683297,22.039032746300574,20.057828716324387,25.039395147349275,24.66100959331241,23.401251849432775,28.573865922100275,14.148351897085599,28.77526772448492,31.437859843528813,36.29725819129914,21.42802934757717,23.392834085687795,21.711984699257027,20.176488461085604,24.913535597517594,20.625648315197033,13.325436614374475,15.425400064141,18.77819843214171,16.34369388550931,18.32967339413399,30.139927996582554,25.101049702684357,11.257474372408554,19.279629451457115,9.29583440456779,20.21410130941777,29.886384908063448,29.99712198504499,17.85032163508761,28.55578069062686,23.9698457212371,25.414558319898898,17.534573840745225,18.146986319223345,11.609302097266369,21.045247242139187,33.53177874370978,21.692059456759313,22.67698316834159,22.25593693775179,18.313516793463688,11.331436155897611,20.434679074934298,26.11085217120202,25.486786904464346,14.568600656985232,24.894300192633608,22.2260190691646,24.572234497228667,19.758213894165433,25.351211364401205,26.864600035463774,19.416205934739626,23.435742148807655,20.193389385640927,10.375321784983006,12.82745911661926,34.09899855555337,14.599671212947886,9.54294035255891,15.585942691714255,30.328131810223393,29.917554078816046,21.965968847723587,20.95603494591452,24.02128863272751,11.270524018218165,20.097442514738795,19.775816295968887,20.392823329131144,27.535735922516132,18.886662115911815,12.278436276139299,12.490168168475353,26.133422264838952,21.217374769110883,17.13393073298066,17.98088580890616,13.540954620594619,6.747742609030871,18.354243080795033,21.649940243447364,13.949052159807731,18.48431806916349,8.728120080193555,11.66362068429242,32.58352994374729,21.715661027911086,22.667830679605522,25.202872527183445,18.1457903227264,17.565777658487217,26.349591116768554,28.631961596981505,13.532143040583676,27.32670955489939,16.973753522154993,28.62572194241769,15.01438632887966,23.869064863052046,12.44441693065668,18.38920477947198,7.447091975604259,20.851244380168865,11.511396914416725,12.956092921447183,6.09726967764242,6.017257935771249,17.847105594015986,26.88975561936831,30.293309591091386,24.49504732267565,16.13269521229513,15.272181607329113,19.131011203908177,26.191168670192116,27.508403964394855,21.086747128920752,24.16876119733365,33.77364683535955,19.29660620170185,27.8353044759356,28.42391244316975,12.960014124266115,8.95084824093551,9.88676232561502,37.128985941908674,36.18505078078533,20.46278322490711,24.11814586413023,24.918698073786295,2.1617677179225074,14.65513041913367,24.03214678764155,25.016124310860384,29.80994955871647,20.573692992910075,17.2412991640805,25.365413137283117,37.32079949829835,28.64159146875641,21.53629465416897,31.12455634061743,14.165550522324944,26.09686372693576,27.645873872006536,29.266746651416888,15.542522177202134,6.903146908563796,21.93902403370206,17.1579218413218,3.833832443431559,9.56335019155622,9.665385328436546,27.923244616448947,28.19915570584679,18.61478108038885,18.373063143436912,25.304262120891487,6.130493808420826,27.931184494447066,17.262876590371235,38.72648559545739,13.877035257669515,12.507504880094832,26.42505448613767,24.684701408731236,28.93415524424477,14.767987402745849,6.832833843179999,13.888735010751569,19.20081323239538,32.57933393053664,14.573626093241405,16.386508584906952,34.08441977576582,13.446443974826039,24.584847348070507,32.329967392737366,30.934169488547447,24.8629391052831,23.708139620961358,26.97116489104728,16.19743067379718,25.673316224701743,26.67001113170399,18.87906432179141,20.04016301019032,28.714972588172863,30.780320176053543,29.303668502564747,26.80934052189008,23.14179271547203,21.58438405832654,20.543125005615703,1.9624279399431144,24.762698545835143,25.93653474058385,28.385933896125202,13.379153046911057,36.68594986053887,19.63390964899229,27.586547004293493,17.856740181951636,27.795119078794933,18.363441137395974,18.65449977100128,14.343052535049479,27.58201026986766,28.920008310971358,29.37746229049324,20.039098780839275,12.843759567488815,18.44765615570459,3.608712983905698,11.709262717294598,34.02627393824434,17.481054438433212,28.186129341153325,5.230652748899369,12.855109026275752,33.7021836511026,37.87829452433793,23.838852028493505,37.90621956964888,21.252938840332824,14.628240555071715,31.100346396692704,2.7657661061340755,9.722845442889303,26.84568641186854,25.17205691756689,22.121280686112826,21.964257690296975,18.642308591526014,28.773209771398044,13.35419327942324,22.16828371803261,25.89932462194127,28.030742657815274,32.12889565246094,27.67373696413606,24.476522911388393,32.229563434307536,11.072688914457665,26.344164834787975,11.038760063158502,22.67669001079678,31.967976998326627,27.39238330108826,24.628470249477814,15.246920513557306,33.995774152590144,13.548900056013021,19.384705632240745,21.604875573805913,21.992312354729627,16.615087530551293,13.977914803211828,8.287279825715395,14.70554603369196,19.459724099765342,21.105913611470967,14.431717103486134,13.022507558266271,27.815077526496395,10.405715742173227,38.79811370215204,28.67127329272932,1.0217993739112887,30.642801934521557,33.639205370262076,4.737018698093224,28.743428885217522,18.507013467587974,28.727847810397243,17.39568727452596,2.15904627321025,26.74948464946631,23.906659938094514,34.300441219890324,20.38238979421225,31.45380208093106,14.132000163739711,18.993457705613498,31.697514696320056,29.669038699624238,22.750999491653836,4.425211601166665,25.82150008832557,4.001769291103592,25.886136762160586,25.34600189899266,25.158037808323503,26.161172513915275,17.004211842219878,22.522564240065094,16.61473227574683,28.373003294790887,12.99628954240681,22.74565352264363,21.976105431082075,27.007044255660954,33.689360235212206,22.755813314277887,19.402021659446596,18.63290884875589,13.666038899262517,10.300858726633276,16.859155896455103,22.023301794835078,6.4144962665156555,18.466641286243338,31.24351904056492,24.0345015049323,32.93446316971084,22.373195589641128,7.144150410006774,20.295200258153134,13.049882952425232,23.645613119947534,20.74942583307974,6.963321122144045,27.053447483190606,14.671625106607227,26.36804862757807,29.345616168375493,30.289981016733954,22.033603680007854,8.40024690641644,32.78078616518837,13.299452713948794,35.917930328305744,20.478178199467802,5.175147259524524,18.83699065586489,31.35435734471944,17.937994789352953,28.5446990567073,35.64534036316036,12.60275272339338,15.480606271492382,21.41791944847999,38.805316020606284,26.986211233353387,28.345861705975096,23.133512962328197,14.12256140284814,33.42947082719986,10.398840332902202,19.92174718711501,21.82552359348345,26.38818339658617,11.847948198612535,9.51398602106477,15.031472806300147,15.865950729665839,16.48264314521621,29.77356031966142,7.9883504304763555,21.802830990533707,31.11006348059422,18.99360625015364,13.601969167863412,9.75231211740028,18.182725978523894,32.902028137613435,19.699177992322426,22.788423558242393,24.269918190798514,36.97144385472765,17.077216996416027,24.555816382374186,27.271584716955708,17.901493644401413,24.24110218582446,10.172599133060558,31.934465537863833,26.65530099340898,17.156928533263653,7.341025474854275,25.644972661575924,17.6711883324628,25.799341802442502,18.619746936467667,31.894365206105334,20.15091711441128,25.571645813590678,26.246391077288692,30.442143631584013,26.04679231339226,25.507424819474863,19.74113151100564,31.846281209111893,27.797100445785922,15.500065038942324,9.813420181353507,14.219460145586904,18.334093631769115,22.93719070600475,33.11178113668325,18.32107166520298,24.241770186215795,10.124497969798146,34.54481470339047,11.27900214822336,22.18457403137364,16.06441648682599,40.12132965581051,9.792250314488847,17.308702486215886,27.47718513305794,22.56174645287908,19.1049502054175,21.906557346305057,9.60411561255205,12.826704310028886,30.319474002134214,29.50262199771226,24.380866147410366,27.616970698483726,19.438996299207318,25.057424255865662,26.065653945217502,16.58400128734046,29.228987561127568,21.660883596341513,35.707612972465796,2.423343163957784,19.22330225833329,7.859514893909363,22.26701924810855,26.457090892091795,15.228001917933152,6.4194512932531715,16.2071645150508,13.513025943088769,13.662592082206501,28.18992051018497,19.351654990560604,27.746974217851747,27.197342289986427,18.89140657093625,34.14408349059286,6.629964024162335,5.536556447922958,9.225571945976476,18.55046401399072,16.230801482159528,30.392474877381527,27.919992487417254,33.17233863428304,34.037460656349836,8.576870607050793,31.99389370991436,29.099462062644605,10.141476192961669,36.14894391008211,22.78679517081146,30.09473085612889,13.97122760294216,31.797902961913078,8.658899365431282,18.500072601149768,18.059016250012807,15.839211498731668,11.637262337684394,15.635859468120492,31.436248794756565,21.225831075176316,31.461326889557554,23.42181184575349,29.009969830876685,18.40327599617447,16.93923781977064,9.351413576266387,14.066751130388834,33.22858282359289,16.224134405391855,14.670414489345934,23.25053512229558,24.171031335224043,32.05847669200665,13.96264920050139,3.1134572849010103,2.163919246742126,30.10974255912315,17.8559929501011,36.65224764065008,7.600432715313634,30.548917475455575,26.395378446512453,32.964995291313684,15.065614394314405,12.336951479346737,28.494815112165632,26.597991521518214,14.162183714217988,2.6180289550906783,31.123339345609153,22.591642535059087,29.55094972745983,7.530498387442506,18.255620635641616,29.909644954514736,18.044151485905118,32.75003332322109,19.155035068785658,20.198588691536706,30.159180364588714,35.75352597162514,23.915837858209443,32.47460792434293,19.661919751163236,19.94522617110313,24.599242061778277,17.789228857434495,24.632359101972757,13.691036828248015,26.364041814169184,34.08625851217005,18.346831011608803,23.49647586854098,29.709276650823423,16.405793872873172,13.158560137781269,4.5249075197470265,36.95118062902279,15.394385403329723,19.588413303050302,20.618545740945912,16.16028297643132,18.51027055603377,13.406054144791163,15.451889173957422,29.299268532786797,6.5850873738326,15.475187855488421,32.38425805860921,9.701155676142848,22.032301776420415,24.850627809403328,15.051380817095918,20.17643070059172,20.914714080367318,10.473537352968197,22.978889180404174,18.288579397149668,11.667479227585023,25.167585689639175,18.767881427080955,9.405180442044877,13.753557026250496,19.083516746042598,18.156473847329654,12.476167403429567,12.282280421084298,20.402259271213588,21.49834878316863,29.762132700258327,20.834336033390485,4.62209610924765,10.626885922483218,27.430488349345058,31.033867894566207,12.960303181576261,9.271511290673812,15.774898971829346,29.287448337041067,29.041859498379903,21.742512031733046,23.082719200700353,26.00650620179049,28.33511046429759,21.66424619300504,23.988199093256103,20.377519321927444,20.75703718674724,18.46457592598978,17.115201446153254,34.99906794463636,10.163927969877378,21.959326708320454,19.42885440692303,24.244142357735896,13.991096168975439,15.853521793253183,16.571114056254164,11.993031423735353,19.971215088501804,34.93121830182172,22.802237996072613,11.920936249121885,15.864433557298913,23.737997066388687,20.686194871869404,25.65213868188311,32.69733745493845,15.297000197703229,32.56982651062338,23.36243470759402,12.221360797287174,24.10222456237579,12.222431998614269,22.95867812999706,1.0812293950711391,12.561882853097341,30.36038071953284,11.728023458128764,14.989883938000682,10.33732531138439,19.985767224432408,17.870045021151796,25.515267542385672,32.828314471172,18.84026522734525,5.908595807173567,21.59297090561283,8.907495589412045,32.13906137596083,16.874208369472797,7.584202234429913,18.671620390830896,27.579984395945395,23.06247411641587,8.25294875803899,17.301048273923218,32.04300104852349,15.819475223657937,22.446344332543454,15.298330776879736,13.940043594774394,29.845355058685882,34.644253597261624,7.118592843350903,14.578506378892218,14.8548407161815,12.443083125291912,18.313981438999413,39.2101235249309,12.416454101344826,19.577054942258474,19.768326883704816,23.00349009493293,25.590135258381636,23.26867716938592,32.557974474772635,19.78354770374586,19.40175973624013,15.551252867541056,10.466652652118526,9.88712147789334,12.352256546341145,20.10888504196665,20.631884034665784,13.060959692234707,33.6566680158644,19.215265872915367,12.106424040010229,18.468039714695866,24.18043881081406,11.489420233917262,26.5862573250973,23.638579792473497,14.88167296236653,15.342606681543069,29.032537179120986,12.109540199711693,29.81267805024293,18.23987500650724,17.563531513155514,14.490921115396747,35.79815085801589,21.51689003548382,21.712117522136055,30.20478287844203,16.58713555830077,15.772389000435922,13.050233337389809,4.667757777513427,5.465017468542491,28.027117400976735,30.778402095983047,23.633424119085205,20.38319189315046,30.053269396503545,28.641565038063852,17.607090974245633,36.01482691898636,14.422157594299335,38.94998291871684,7.689753756013783,31.059767626693585,19.115310576940587,18.482010288681536,20.939698195419382,24.19580611556622,5.863695614150828,25.882299782399258,18.58797424188534,11.146588693019321,32.47843928457083,16.866507213575872,25.72773015976282,15.21236476741695,12.900144495863183,22.970331429905936,25.92171493881204,34.98849845362184,11.199113657932763,22.444401214089897,23.45714025533946,36.39272786625593,32.783912186412195,31.59157942499982,24.832375748233083,18.229280438994564,26.547571744593387,14.988805101004226,9.588626435345986,17.32007230071026,12.095895722433298,25.730372605788148,9.113537932631203,20.06082240523053,11.595313146346292,31.253707198237336,14.094852979318514,16.079025490939348,32.519964923518856,19.49235622903712,35.5004555213233,18.043425851770415,24.3734597284251,11.483449923142187,29.17948793814761,12.97262300848482,20.066685164758585,16.977634341402098,7.873499822628595,9.684261627921552,29.05623573920133,18.060750236108927,23.64444591563311,29.78223559288851,26.41758582383475,14.667216420952874,18.393436005134472,4.8660398003765515,27.485143538085822,28.724873052458246,13.291203070166958,12.831332341656724,3.4965595834297813,19.45567603783505,19.096555409667143,27.349044272477443,22.05433018166279,16.345325560335468,19.396702022591697,29.369143866485228,15.899306641526621,7.778118612487135,19.20276692017088,33.58292589100005,21.879050250561875,31.728522529154624,20.677655087330972,38.72668715666916,26.5813946559232,38.92132076095558,30.89356416800601,35.6446921259992,10.263965643102761,25.290501046116553,28.267474357950938,17.56647986695784,30.049611822499823,17.22790496541671,9.56074494739682,12.717537643561023,3.748466115987944,27.764861082314578,19.194829739865522,7.211955409501325,16.225461212724767,15.752694258287073,18.21362441933713,27.50777046439034,21.501034562859164,25.624014051649052,15.48820661037568,24.415925644031752,24.430037114333874,15.13801360213661,23.696412384243366,24.936831696706648,10.851796267900859,37.577296940221316,20.38083713001997,28.380253439511204,20.576785489393192,18.169193757234048,11.389839748748997,26.613468341992284,23.80014675031598,37.60426278626372,19.692945085938828,17.112118447731575,27.55925849589101,32.15157059034184,12.993305880211857,18.39943118581879,31.281407353380082,13.448838094250423,24.394544045955637,5.09751123162433,27.089235393024694,29.620845018127575,18.57048085775553,10.113647697957402],"b":[42.32474714676895,35.38331725592702,39.9956099968471,31.37264362382296,29.956967976060966,42.83186945697814,34.55593093736693,6.607964010152254,39.59255361499787,21.081971676067102,17.787272353118283,14.826588203608058,24.388410306823708,42.32297875528586,34.426619999037065,35.837026399995,21.98665564364338,22.223332974764322,7.977861274385938,24.936981442479727,36.201353084985676,43.721626000863616,51.43936879990322,43.699047347333554,41.08695695025845,30.069172234648825,21.180822043225564,26.110316624753803,52.08159053811845,48.945140790235925,30.061145842446205,49.16857064203161,51.07246610767413,41.42064499658886,27.502362616637342,18.462894403527134,28.33986148418155,28.536997360392945,32.029988143753606,8.594315267999445,4.787026257254978,17.992502453670657,17.717578070344913,53.66123262100506,54.75543943293012,33.10234317359618,27.92153769310642,47.82834195131183,25.552944689538045,17.8171796016794,51.54810826534812,46.27523412320363,36.267549262541536,7.384890998827549,29.41433545049145,48.99626260964304,43.823933562760566,43.56171207361513,14.834364442238055,20.492707065210062,37.25729245695573,44.01830593915659,28.13169118848038,20.513052882717723,37.89008218268401,19.023639890453758,25.23207318796581,27.866786416888402,45.65133377646825,32.52166159767353,54.928459376882984,21.93683677953117,27.561630676456065,27.384643282241704,35.794862455228746,29.590058287045,23.02353389790703,45.673082396624196,15.718808351846176,25.521814213353494,18.041026216994773,39.64116852072794,10.446852644867622,39.41160229097255,38.6475267965667,32.0668296375825,24.93410047851791,30.19784488380067,36.93386170716744,48.563042177468134,27.525296675199616,6.589974999795736,6.111997707283763,52.402977731651426,49.20958253406356,17.83515899342043,43.61660388219928,31.200912926578386,26.895457438068938,42.043088215722875,37.167506826104876,34.16582230917824,28.265880078948502,47.11789874922026,33.65557791482907,46.50260761881147,13.692538511970195,39.6975193163214,31.059567312306395,35.912092239286565,32.59712661020728,39.12380455144732,22.056390071696118,25.113987738216778,22.74697401525893,34.07785157978074,21.37380305574655,36.83969966453725,35.729648354503816,26.157394186908043,47.84167165970469,22.096248248222494,37.036944377118054,21.103809759837297,42.177249212476625,37.73755122835653,43.61944409403672,39.988876945896116,52.66106804426851,17.940532026093152,11.784683527299773,21.437940617056313,35.61023393105746,6.67903749423592,31.698788390959734,12.525997735182527,47.64079520529012,2.2530297545320144,33.28073058246125,36.46035029039414,28.427813369392258,22.92857283738735,36.93259523321432,22.286176495553562,17.89154705359475,38.27975381411052,1.6815175866227783,42.081854368095165,36.77276372681618,12.325260028830144,36.41605915435062,9.348365997263102,12.00646290665607,35.012187525764205,27.02850258908577,51.97824687570105,21.087976013623674,36.45761826589425,24.194196829839395,16.72979634721893,36.46536263347226,37.00277837238663,51.19453245331652,16.286986154508526,31.412189398843644,16.440862070078495,18.617184505947264,42.742494309572024,12.595984256717472,26.90926900595241,9.854564468997689,48.929159496059924,25.829430724840392,39.78693069322222,43.158116514010075,25.77021448570465,29.217357652288616,19.835492351252576,28.195429392527814,34.008324814087075,32.92081144598387,32.175602949101794,34.38173939738929,42.84555584142121,23.065581993104544,42.111619510128264,41.99997482070441,51.343419014293474,35.573986680487714,38.556605029892886,29.94691833667205,20.80920384616248,31.0696100569143,32.322899089887315,19.71858275803926,18.249137370224307,33.290959706707916,19.090433133518125,24.076318195016015,42.43558716605081,34.19451072869899,13.018098288829067,21.050306358833552,14.319807635980531,28.41222746682995,43.48074900710054,43.34678329793243,22.379659107405963,45.465493364583935,28.752673079651906,42.432991888893575,19.666011141445825,19.189020930928265,16.642265446729144,33.39114251875448,47.44269235397601,26.014704467695864,39.07482028826115,35.277811793427205,23.93681467020801,11.788399008950128,38.21886191801619,37.27570096648151,40.24598898503942,26.434428797919416,34.11206245478701,30.910606989651008,38.77296612340746,24.039216060307737,35.813026600934464,42.327964815289725,21.105737253133988,28.927802256947743,25.58351046819385,10.499181931944772,21.368478533081824,48.73019823496608,28.045433685236254,9.691254919957805,29.65669620157052,42.5083961517897,40.1308986122332,39.258388711416906,35.45903410692412,33.98700428187193,20.149869477774132,32.902224343201084,36.51623510426597,32.1880487020354,45.340248555447474,20.836960665081197,13.612524648582713,15.410573771806995,40.03413420324739,35.06036241151794,26.693397328083602,33.01690262934875,20.276516308617715,9.320584511314118,22.80262439937264,39.69360867063628,17.125564354978337,18.88613866042406,14.394044415310795,17.81087045293026,49.03650596850494,25.245336835184816,25.429846347551738,33.01010769557925,32.728322584096475,29.562014055369993,33.763588944956446,37.69720317885855,16.013500341094883,41.91441332552327,28.168365535362778,42.89625976412208,25.158383761022137,32.80099860084175,16.537338385782434,23.070150487092043,9.698705727905379,34.064755191171514,12.383146897263435,22.556967037152265,10.457603373613926,11.199435629992212,27.471483939289712,33.84766159886982,44.596153433870256,33.798996646390506,19.167338595995158,29.143490469797044,27.958762920732315,34.849556890862644,46.10279132152466,28.20910489551772,31.46475929014801,51.210926621105386,33.61770836094132,45.3781000653299,37.16610119409914,18.732013124116538,10.417135163477035,15.929615794200846,55.529635890677596,51.431619693706615,25.216523906486756,28.276143663507632,35.871919212688574,2.84003336090235,16.84487123420042,28.063362060437726,42.193949514895124,43.88651598156749,32.33542699926603,28.141446183812583,37.1079328963654,54.40220521803028,39.64012005376816,27.742880606683787,46.375135487224554,21.613968290679033,32.81723073998084,44.65089304635826,44.34008769243673,23.73423991158575,8.8199194071096,28.61904724337275,26.40752632685488,5.338825883312168,9.580035404831792,14.390953348038092,37.41113541094364,40.89865710080839,29.939087518967266,25.8864652668543,39.03600645138957,9.586658404941858,36.71151112766763,21.716218985345954,56.31655660786683,16.41998694342924,17.264192655487957,33.50577620385222,41.24949811543284,45.06594830429975,20.034778313244157,12.18230584013428,22.229893694782355,26.578142992463572,47.039194206816944,19.368494885799933,16.601815988328752,51.81516799340763,20.762392966853533,41.144014309700346,48.61013160400093,42.38424628263346,31.89680063150663,38.61096047739114,37.33450526751257,27.58659090569982,35.69812867726367,34.187117397179065,21.586612778976423,27.852939714721003,37.781251555323756,48.43392369182767,39.24189535858524,37.01200917217179,27.39807906049364,28.89855736017409,23.82126877847141,2.1648425877083044,30.622955343563245,35.53166090593713,36.15942241181207,20.34540956055229,54.46293279004142,30.901796367343195,40.08045125781575,24.567039504848253,40.346128914309794,25.142731686239156,26.765629421613724,22.35121398245817,45.112244666959,38.15383605270122,40.852586117305115,35.15546769901871,15.745841126092088,32.22321149919608,4.644841635274779,12.61237565753147,47.69498279737555,19.24563272731099,39.63129998391942,7.72602981036886,16.25448055124414,50.29831907561325,56.56155851525276,36.87291718036707,55.796927351908174,29.879515936893085,19.107056995382017,42.049710394257275,3.1773099813754113,12.924161910539965,42.99549305580034,34.06640573690957,39.6133462678816,38.91501204632477,19.17802426898401,45.979102751660605,24.757884396847913,39.06280457460548,44.15206889161969,37.59357079226855,45.05843370269421,44.84368075895082,32.8161423321707,46.579631280917845,13.178801456578904,37.4291811392122,19.07530526480483,27.96110574098052,49.18395161545101,46.184428032832315,43.36713597288807,26.905163327971987,46.945633523545936,18.053483114019627,19.564841817996115,27.530049241279258,33.58681655937073,18.85811373017788,23.826303811131325,14.642768411851286,18.98584560456793,23.593556058633553,34.47786389220229,23.047932794568712,22.828395302297853,36.375603303401384,18.315202846389155,57.88937233939924,40.731215229046434,1.4273254522326528,44.1748175086487,49.50819088193501,8.439554114568452,46.673249418110466,33.300765936276555,46.87299988078918,29.753933317922183,3.915247827660946,36.042913286725785,31.241598018663325,50.52108553489431,28.920518776298863,47.46549398087099,15.648575260664058,23.891523226492314,49.44251023325711,39.66490550422044,29.713942948256246,6.254650027321267,37.74050911468995,5.463982506061216,40.767056160487016,41.409976784297996,39.42905410741722,42.820023345499315,27.892663283702706,27.396273032859767,16.684700570243326,45.37605544092153,18.071707456629866,31.885547953715488,37.34705214362986,38.18530533430241,47.778116410507586,41.35493707690319,19.4096662732832,22.059867069042184,21.60656420787904,19.72521185631814,23.195430319706432,37.105798123851116,7.914101196127561,20.309302667776855,47.92238706224386,42.27647465641373,51.941632876442654,29.956929349362326,9.530512080998061,28.32856160993503,18.99240606581536,40.10077324813824,27.424523989909968,9.088005961711932,38.11376113747161,20.09856779731632,32.80442010081917,38.53369142442801,45.419317650655735,26.76420904325489,10.494005477085487,48.151198741588324,18.78758586428377,53.1153915597795,22.332218746235093,5.9343711359355344,27.199088292461084,47.46310604513848,28.933893438333655,45.40319120419408,54.232162519627366,17.699475726828645,16.30115182404151,26.485203728048724,57.01006684801936,41.11560090710614,45.14158344501033,27.13486711096927,21.30657536135888,51.083581361261324,12.872171331268095,24.45607181338998,37.08270313039306,33.727081573517005,14.362252984710363,11.555062372607573,15.035289007261348,28.03484243563002,19.4145232173981,44.667421619565374,10.334006855321189,38.424941791868974,47.29820565743951,29.23543133291158,16.411816664858996,15.125455232498886,20.257829334631317,46.841107854624354,29.16740846308101,33.07085195605871,31.349440637899036,55.22189930631545,30.52538589821279,37.67211929151726,36.232554976258946,33.02181879264857,42.61246047840737,19.517903061641945,46.45716472765183,41.51723541631483,18.185707868352768,13.239976848291741,37.90934367064513,32.71166819150704,44.617347814289424,30.52784367499037,42.90870528386794,29.366175391624175,41.87555936666398,44.547082426287275,48.34024441799211,39.514670995704236,41.71839223323308,33.101196356863355,50.779311789030075,46.26731772200351,28.45031855897622,11.42494740206061,19.398014395679127,30.217460806735986,28.030365669217577,48.82630707895686,21.445742063436025,40.73365919847094,16.710523595148153,51.48564356251166,20.753599902658806,29.214882031777076,29.454569216055653,58.85145963632005,18.177072439899174,28.335898328521967,35.14843309167763,41.4581853225382,22.907015730166222,28.302582142595234,14.540934522760303,22.151698667618767,40.04260908434874,39.435772324526965,29.480031253247386,43.44968931965473,27.174675395271386,39.959204608081365,38.745673474171284,30.233356857355137,42.245610623145296,37.05066836426724,51.63918154833557,3.1455983058472414,31.895785845568916,13.151351456295913,35.623097747360916,44.5432359283789,16.39834006913005,10.923339050547689,22.598165176630268,17.35012357327839,19.45952015048713,41.547169928402646,22.161553513095775,42.06146805782796,34.109246145193865,35.793380656527766,50.1484294258519,9.311285359786803,6.737059689276186,12.962890510524407,19.486220174297863,28.489607300497678,47.6937105932304,36.10417572020856,51.155393018635564,49.022800155232304,13.414701463569148,47.28812948732755,43.57148857713908,14.181709015440717,55.0489239364178,40.50762177523194,42.127126314324514,20.471195547936723,47.5737093386481,9.209159955406507,19.912636565298932,32.230766587463975,17.8063701719892,20.74800404437934,23.86417344062007,49.00055530170954,31.581598593515345,42.54243441351595,35.55011448451227,42.62255894057544,34.14999071750236,24.702225731623063,15.974350006324332,26.911740124549798,49.72906315572105,16.631934790355682,19.630335738555615,41.553579605743124,29.921389432780437,46.23834131221709,15.41111655777717,3.2899946959887183,2.2483455480722814,40.22690902467339,25.23387748849686,54.32961263426997,7.892219490255581,42.343368246148806,38.72995506656378,47.02398801260172,20.43895720779541,19.19982380230698,37.290697558460145,45.415582467928886,22.88564106201055,4.799839127304666,46.63426714935352,38.25824162917523,41.52900406681924,7.938065937170045,20.33014267409544,45.4032516462472,24.37244439806407,45.43162536128433,25.684389504086603,31.1212153127522,46.95899090008798,54.17572712746433,30.870584705124884,46.08307674528232,31.088510875006108,34.29812862756888,33.45798078570366,26.36238665465104,31.09374227788466,21.465878514276266,41.7653631906079,47.194944617481205,28.41902185666292,39.69617365254699,42.479290246534504,17.692116290506142,20.291422042488986,6.662492098970776,55.80327401162438,26.708092424957833,26.722693683330746,31.83533701705606,27.29908100918552,32.67189002697011,16.10758929603697,29.124353018247625,39.3395954659144,9.549989627968172,20.704094881854136,47.40793150803244,15.743475966974243,24.130408120587727,38.10119527893984,19.477826426722583,30.19470252740847,34.685592502488014,13.546092013735866,31.960530324633034,31.264533782339456,16.46187541848168,33.0700933236864,21.974695213441958,13.918513980232493,14.432980695160467,26.56616236329691,21.768889999960187,22.29315923786477,13.841745894275443,36.38051126141795,25.899099089047482,42.613787055239186,22.44896197399452,4.749878180110936,20.33161910353457,45.06155039894321,42.14751123836627,16.485718582617643,13.088956442468227,18.698359932251478,46.80578265849185,44.62244726104244,40.28318430558281,27.09530944478108,33.35264257338957,41.6051590438791,29.04797267516472,41.865988422561955,31.49700280087313,39.27007783870701,21.991717099965882,31.01140266825778,53.96669640572614,16.367227544474613,40.318307441420274,30.178202566411866,43.291565823147536,16.122969180445516,22.356206353726257,27.578296830067927,19.52357467185221,33.340871274819605,51.44959057129196,32.6694124170475,13.269257284472745,20.005172616505003,39.501122931290524,30.587653526619068,40.05990076807558,47.18749802749222,25.728771399479616,46.049256761412686,32.1521810488698,13.91414861695828,31.633057722876178,18.07708592508996,39.51049910201839,1.5595399410702049,21.749910789010073,41.11935798385415,21.497869469562623,24.770077684254453,15.566212227930865,25.439786172502995,28.484742942646267,34.394091057942916,48.50915083630895,23.569546347754514,6.785864242503221,24.88564324239195,9.471190062929699,48.80110347940351,27.644009045848335,10.22088304832855,26.09781566269527,35.80733974239033,34.969446329570886,13.324685564972691,22.605601168532743,48.04851534508799,23.760036488310732,30.192704053059707,26.276425400936006,18.958539127386295,43.893696772098636,53.71641714058113,10.20990676988395,21.674352096237968,21.392551548206423,12.695034232218351,18.43608084275118,58.041636541592524,17.46622508466772,35.39183838036517,28.924210114468067,34.85467483531946,38.130748645577825,28.394967022506385,47.15755720639437,36.164766981569976,28.05155886427254,18.947646498823207,15.269482991276174,15.595376160546216,15.010199619159827,31.91731108630603,21.266223176958857,14.603499430326696,48.072468491468065,33.1807606762372,16.67518622137271,18.984110829333908,38.850861648535144,14.487532770188242,40.43138224324201,37.76612051208656,16.435346174218672,18.077330647363645,38.091290170544845,12.462608513652148,43.037239411164606,34.816095524884375,29.26420458087698,17.42877893076389,52.05670264157446,30.10080575027152,34.62033948758687,48.93382718215673,30.694116363582914,18.18319223076923,16.56061864300989,8.942907936145614,9.538567496247667,46.27700635513163,41.05817847028669,42.39249354341203,31.628428921497452,42.02609084771849,39.35488524966704,21.13448118274681,54.74963819816754,21.31322185552665,57.2101008775404,9.660421842680332,41.78342168097018,32.03490501631439,34.257655030677704,35.3211582842592,33.22406942673919,5.936389789920011,43.9527561585404,32.703366631640975,11.503574335071166,47.4690661637236,26.921605879734326,35.30727343978704,22.394268007328293,22.323721820241644,32.00366453190823,44.10276741400452,51.31874825084128,20.01050911094115,35.762046667570374,27.37251727409788,51.707310303741934,50.196579091319784,47.42222276170924,31.000766769506512,25.842043288471768,33.20881112338398,20.060353908675673,17.944655538237583,27.135902408979895,12.183077325227766,38.49849994499502,10.175315965058541,26.281726790118853,16.74841607636608,45.118712535556945,15.041747219746053,23.78228639060856,47.938436112930454,27.239521635132615,51.722905581827064,30.310977362550823,32.84399813493417,19.891143344834372,38.35696192886227,21.45709327710574,23.273296096507707,25.18671170057994,11.042658017701923,10.465753416714527,42.88105864932269,21.07269023336414,30.8032378024326,40.3963262131186,32.619172497644,18.583477163806563,18.926896915273733,6.779828378408417,35.27528832873567,45.78502356925955,24.866159220477595,22.592484371258557,5.42143355792307,22.095678364457576,32.32020307347296,36.075880608184114,25.68891039650459,18.422016893068424,30.136159400662834,40.85512679184622,22.3883113279533,10.460946894278017,33.375371036339445,52.225923665920654,35.224786229868755,49.69654538257461,25.627278242923257,56.89216969084052,44.093351660786965,57.36860601781282,43.613318983397335,54.09277073850572,18.90220574725024,41.41084355614019,37.63126809729937,21.531899743512604,44.614242812567085,32.87728047096351,11.016850234848938,16.106813372822643,6.319293567090689,35.420559690603376,35.337097306915894,9.920947564930596,28.013153632004588,16.683742546787357,23.722679964275734,37.943341553747786,33.65946427396854,44.02434806516468,27.551627161868122,40.01477212782879,33.28657912189607,20.85964378198467,37.781961162304896,35.929289484886084,10.87841943290822,55.696330334338825,29.886974149444143,43.660364364299724,24.110010412895022,24.499065870828282,21.413763947855195,39.47697871359355,41.64507329424176,56.08586422436352,35.000036196328814,20.591523030934887,44.61601353591874,47.66077903406165,17.142509540396706,24.154812480904067,49.69375989573189,25.815626387188374,41.12998369138744,9.111162558520345,45.138487373417334,41.58286405682945,20.046366565988553,15.217911630325375],"a":[13.242367272952041,12.197107502193099,15.644529139230352,15.485557809151395,0.573761516684792,12.723104108190707,2.6502468182733407,2.729435125103179,5.290776551090932,2.359043345407552,11.790272588453966,1.9748961044767643,12.115737732532374,12.746655299753776,0.41359227467044235,5.444113907117751,4.799507983123528,0.9893901100450053,3.589766816055815,6.191279829479219,5.120608051449551,18.310795754957063,16.199152845390582,7.329271200164542,4.451609422529734,8.660340254224197,10.882857322807533,14.538365436154098,18.606394284186113,12.936314043017155,3.113665237176373,14.258088648727348,14.396648379534298,15.508582578753089,0.6659456395083208,12.459275247426817,7.906774346575287,18.161208258254355,10.956653705816631,6.8464419575652835,4.737853080654557,10.1395131398581,16.466168917055416,13.74356846998527,15.403517625411327,14.359858035090923,0.3993645713928906,15.109096777500799,9.461108647906409,2.767618033109982,12.768239662877763,12.037051829352666,17.060948073559853,3.8634728018664344,19.877685933103454,11.123461128470344,10.666103162254835,9.181743664467795,4.549583701296047,15.151532090351862,4.27514015034185,11.974683181510422,13.443854122667274,17.88058523310172,10.280232163509698,2.3618399430673387,7.813153788295417,17.342498805323835,10.099107085220474,11.949011036575623,19.727268735079978,13.804241671445485,4.309071874759103,19.310366862129037,9.475019711336948,15.751277293805686,8.626305041568001,14.603809845862127,10.432998243739897,5.2687247139556215,11.271971022327833,16.010328109400966,2.4210940632181233,18.95865977017599,7.485945941161414,2.129351291358219,8.31084086135169,0.3536855458351251,9.549112806168768,12.114079203930949,8.30291846410178,0.8319744855207745,4.262070992742553,17.86373129032436,16.858064931854017,12.678705543792814,4.150453896834816,12.972020321615023,2.8779116950698924,17.446661314869193,8.335404124497563,17.622707986088333,4.807931409862221,16.87950531901681,4.353766085231774,13.92851981830641,4.648276108464713,19.03108386395045,19.048966680426922,9.13961156675203,9.970444443397216,15.438247381125851,6.84378881076912,11.342472182142117,18.58641291667002,13.837909787925028,3.799406015094462,1.577584196302455,6.680340089330397,5.55767928298275,9.263006579841747,4.97771654249993,17.056514971757956,8.623633418912235,16.371215371567946,10.9824775306191,13.74033441860571,19.378486296188015,18.064940340707274,16.668941438608357,11.58896380007727,14.527402108436096,5.685304347478972,4.104666284343064,16.22573609220764,11.887285534235904,11.646163811567366,0.3678085483876048,6.7083975052347355,1.3942830096085368,0.8787901922407082,3.465246065979861,13.773341810368201,7.043972164759333,15.612047747454024,11.18325350699903,1.2998629816606577,3.6220255046395966,8.235341806798324,7.542082579626235,7.505848025374737,1.5185045578817569,5.92640302673022,8.786708656653094,2.835385978385081,15.492290209310573,2.2997407040581352,11.504337997650929,1.5890262114888154,10.076593538213267,5.217882246375183,12.677221596020903,14.370836038580999,9.517414194074444,14.611753165628603,12.839873619134705,16.33579805712557,16.684929946945243,9.591055567183,4.099642371765242,8.15442675307267,10.643739468488217,11.179513598655335,11.291203190212592,7.053726558302982,16.734242561894273,19.195145007596963,17.758282827702672,15.355212848738336,4.912182852809162,16.48277183262713,16.502635226012075,11.480057460026117,13.079509314481083,4.467175817659816,14.296380390219664,19.97088032588378,19.96208116005967,6.070176934069109,6.92997118339826,12.771557942545506,19.48956786072725,18.230065488780284,7.926285040323919,6.384584707238807,12.359751004076887,3.022117700247966,13.36163936657135,12.090709098697317,16.790890217982273,15.228544853499585,9.34601644646305,17.357257287062993,3.841453509614472,11.313635357923836,15.1273811464179,15.5037848860662,12.932952326401544,10.197399883321925,18.77726985230438,6.938142414582784,15.220534661746044,17.01567979823594,6.145160893912345,7.641669590327331,18.4291064299391,16.99909011211819,4.874330688783091,8.118468014714484,12.20846664833763,10.835324942603561,1.1269115643208805,13.989502164149803,9.463152592542139,1.686217862817485,14.886845124491614,12.79741579997018,9.154915234480875,15.110454968966248,13.993124343576756,10.076476862470791,17.58193116455258,17.47317301319326,14.341492470598144,10.240850443652949,3.554723975974663,18.2143327092756,0.001999894084745435,9.381919561722349,0.30973687081341517,17.10437482347714,18.829224437978873,3.192094030417403,5.2105526553788195,13.201802433764328,1.6304781812952518,6.195665146078229,1.6012328904325557,7.587091896611864,8.205896953269157,16.769279985065282,10.830055523364361,9.319569163542463,11.041825608026365,6.188447693281711,6.755497258005341,1.6567218247447713,6.228352165186655,3.9544833556166292,13.524765502011409,2.060456818501506,10.500405713685502,18.048073197780244,2.5767916351125875,4.989731284380956,14.721014766824654,17.883595170514184,19.6691909980459,16.72678549737035,2.3139612697497203,4.541814432452762,18.300430373545,18.79009377348943,10.838205945370408,11.48926594548049,4.820090459327435,13.132616133506883,4.001344808995837,14.171925469518772,8.00085173612143,13.307238840975707,5.002580735660427,6.505721901633397,10.56496343784386,2.532704511627162,1.3633828292365013,0.39111907960067693,7.398199329142869,19.335760465456502,14.76513007935134,14.39402148090101,12.838071588196822,0.21250701066206634,9.546979185469823,16.7910096493141,7.321021093811613,13.354211476411955,16.24770931786891,14.842501834695812,3.748604169440788,8.789604051302376,18.932773635939974,6.693523516070563,7.3589433862630615,3.3262129373396077,17.15193811296025,19.632296543907714,15.301785910859076,19.603929184714403,13.027106027737982,1.4253945339172702,12.277792818702027,19.655574191692327,6.366661566133978,14.527432828079005,7.8043221581552835,5.407328137946927,12.616902649192824,18.776016569498154,16.700810452728433,14.79798569372036,14.567448310239568,6.079021056100622,18.800757686036317,9.1840215828738,12.90206085189974,6.649013663282752,4.822163030968518,14.686718080943844,7.115896601951772,2.199905054211264,9.545235543183995,4.53497425005803,17.622518896152258,14.41167822666575,6.320312570688995,10.215982062305109,10.39610865734469,2.378236923927557,18.398640503120703,12.428012915947289,19.629459625838713,11.116226938693487,7.34330799243216,18.73772187494797,6.700785785754837,11.42033902445534,9.049986450766712,1.0250684522664155,4.832982825710959,11.191461938982666,16.8806862662736,9.367977191209956,16.152755630089626,14.834664676187362,5.503731987217235,6.607043774770429,14.655068950723047,18.503155779931546,17.226481234349652,7.528582601831917,15.719989147542055,3.8325522962538594,14.78967035356957,18.508908571806074,15.939558098969142,11.55805969656548,18.871978505810027,11.614318824481348,18.514026082844456,15.73260137533473,18.520867034861187,13.643599885645617,16.984140126122938,1.742672273108341,18.400389026112613,15.519386712457734,19.946484620799602,5.8160919621559914,17.38599908565702,7.400694380488755,14.02228033231025,10.571564337984531,14.168854545543619,11.003363535917604,9.848483384176454,5.648825716853443,8.549947164574977,18.89511142122047,16.91925575053004,3.6276988727233306,9.693054442336129,3.4919383558739714,2.483818391433501,10.728779394570376,19.186556243538433,15.565303365890593,15.760442097626818,2.521494808988014,9.164510719600054,15.684244498179577,17.59442089017066,9.688148457175977,18.48280104611758,11.887316227115011,9.765720454190951,19.212941936256907,2.318964949528355,6.247269723123154,9.312313370571182,15.515722371446824,3.130656348004792,3.5613191283480505,18.060697738589162,10.09327466239557,0.9735391441822916,3.8263962228301285,6.0828536657441035,17.648659657819504,18.091674100240738,9.0328308350393,15.422441859466556,16.650114201886886,8.786144085647468,14.309486629686239,2.313717832596649,16.93955430722937,13.277096550852772,6.990409596083027,4.284448573640853,2.5899070410175407,19.93649033641995,8.658405891414812,19.1891370404476,15.172087706013233,9.404498027847353,14.179899545546299,3.2858067093637278,1.3873116281209974,10.05854989563774,14.971743567062973,6.588378031573572,5.077343565348773,2.376541844379947,18.52116490045796,1.818616774294446,18.071292205467437,15.578146824538095,0.5815315635313745,15.951488144026937,16.410711624322985,0.7172842153854697,9.277546791523982,2.4458688091413716,9.028186560224167,3.9787007562124455,0.2523895763970829,16.65988080947409,15.943332052075906,16.690161789577335,11.112792713687023,14.070376180321148,12.485498907979625,13.675771131913649,12.432291698608232,18.81681827245524,15.191535296090674,2.439043773336662,12.881380361235198,2.414287141687277,9.730357515950722,7.905813889316335,9.6644125304962,8.075145076599831,5.182938363549208,17.231321054139496,16.538769743469,9.913286550704822,7.486056658968954,12.822737282759512,5.288317852506426,14.871132924581406,18.393609446632112,2.5632882666854417,19.393722125643556,14.912360473286817,5.045242660061162,0.0691139919202266,9.980047953906412,5.648676366734318,4.786419025396889,16.466117682243468,13.135759525032666,4.229724436939715,12.298934567107045,14.139757506651165,4.553347293198842,11.573614640330451,6.598259298296183,5.780726725765359,13.502466866239304,4.656612892833425,15.045588223331926,8.779752047823726,19.380268243525972,19.37039141505535,13.864502438661335,16.89772370486661,6.127114423325826,16.0935784826165,7.341146961644953,17.24714932251726,18.465300568367716,4.350880087757738,9.758505662034818,13.865559712638396,6.0000690180052185,10.24192687790027,15.466170809818468,7.06938952731019,14.589763948273164,15.916517014453696,19.04095014190801,11.646345843147788,10.11123752494914,18.78935971608311,6.323087424886618,14.262919020692406,7.713617159332622,14.99896347114447,5.261249712272615,18.420556149694363,9.118240981298143,7.298049083465776,15.027329668457785,2.6545406809895677,13.299586644832262,13.60373042917912,5.441739809662907,3.7566911302093153,13.53507067169662,7.87435610933632,10.551399867549796,3.9188476853848586,15.929846916621905,17.768776704998558,9.419796910867433,11.625091585033642,16.58388759266177,17.157457801433136,2.4769330873715623,10.315829681662173,17.542921220704486,1.4857985729349776,4.29585545185073,0.026675805508729056,16.16759550188254,10.520133180113941,16.040012878668307,0.9367063852622515,12.329903524219938,1.3421789577388132,5.369182694434689,5.691474361338957,19.936418114541414,10.146180549531865,7.870963405327336,6.377865378487102,11.01069873953357,11.425110071726564,7.907651318004665,5.236499600359008,11.29124328952614,7.7445254027638954,1.4403533066383511,8.063832180095325,8.597255156799655,5.432669220988906,17.407679513487736,16.050979630644385,14.92870834276625,6.33700831612912,2.97424244694366,16.15265196332725,0.9927082929855136,14.551974119559405,1.5271190406212742,19.78657498655528,0.6890940073523266,5.336798266839753,19.148735442218538,2.0464350836066947,14.97715879325693,14.962580170152231,4.2443556167544205,2.702830490087509,19.76335043445983,18.71849101737218,18.844851632128186,10.427850855541614,11.040595605659673,8.878996881749233,12.299327358538577,1.7652948929638912,15.097220356963202,4.952644091647098,18.41117462292718,1.6392118667263533,5.465157223314714,2.11432260971796,7.76671519745705,6.82149185416876,13.957399994218619,1.5297119963155925,9.268641895106278,9.347201197981265,7.369036713051531,13.688345227036853,16.301030293310053,12.206146644664614,19.693290297855025,0.5414273228337185,16.76863288912665,3.7189318206431565,4.233205167501173,5.168074416059825,17.534540901343295,2.921774309718974,11.609028947062768,19.03466396165568,13.648662103996866,17.768315558992352,3.3245790478879256,15.389388951481134,13.387605869151376,5.7551135068897485,15.629788010508099,3.5478116767151224,17.03151079409637,6.914402388326546,14.670571079304757,8.061497526098105,16.96649319217107,2.673161125361667,13.703524823956048,1.7459963585705962,6.702619488125858,12.36719459565827,9.982876962396716,19.430892333160404,10.25446816099111,14.231179707842557,1.3075280735409134,8.511188743112893,2.1610850715819963,0.12132201711788415,15.314493608630082,15.781397446764425,9.285572959337447,3.3794546942009696,17.928035622121495,16.663812127730772,12.390090527001668,2.92179577757834,2.0722600790285117,19.12583063544393,9.846039350073399,17.46044914708927,7.283648342201863,17.744027005916475,13.00408912930656,17.701557814813054,9.231933155602068,4.8861315886658785,18.945382629255462,6.168283037922855,4.691381043886067,0.24930142180476178,14.283578387736128,5.582873807242623,16.546726229847156,7.088014211225726,16.00337269332519,13.088689021685699,11.173708836663119,18.981999509363856,12.066305800562699,8.340212219114008,11.920117096750488,15.753080627066499,16.365272482210138,17.70029107838566,7.256403748283198,4.362699485613359,14.981568355428836,8.48160201615678,17.617424243381485,5.250118455433697,9.643277350808109,19.85454115275183,7.411747804539561,5.908937474700191,15.845246136243167,15.009271221116428,5.414620449544132,2.204194420129997,16.484013858903847,3.111424370809468,11.842933617343544,8.440803300648273,4.06721552083229,3.1354142170493793,10.473076392468146,0.6080948016163878,18.398779043566957,3.3661796556850643,9.798316329229042,16.073494911587318,3.141185143371521,19.754449042720932,10.464873999802208,10.245718196376,9.299885795659453,5.964073877370333,7.137754563441203,13.227783908564831,4.2009649867395416,6.462343415364509,16.588064128524238,15.286337429068478,4.505186136876147,13.015926607340091,10.959827104690461,14.23457921534171,1.8181463031461487,10.589214337425798,3.055138103210573,16.720582802696676,15.809467199562635,19.08138384251064,4.483366849769035,0.09074076104469864,8.288959608750517,18.968110149534915,9.132862722701223,5.127022666950687,12.600982855006322,10.268304796051897,12.12647075915429,1.613446057064305,18.726367254048842,18.031020658507764,13.928206582921106,13.647950165383168,4.578805756511426,8.305421112866004,0.657970056338053,14.63526184588099,2.0285019421910766,14.406468116701202,3.4291869338785164,2.027517928902025,7.75860129575539,3.5649114258839054,11.676583951528933,8.79374722861471,4.620937440391395,3.8173407245239366,5.456170139856602,16.997704333438243,12.089735128336692,10.457103510225426,11.368954187642771,6.624432044847364,9.936470613595407,10.010052499854876,16.965793644638637,3.971531107277091,17.935603068695002,13.819664014554531,10.383550538846084,15.926219113763228,5.8662053524478575,4.988849882903859,0.5619416155026213,2.5867094738698793,18.67967357069132,1.1211871998838197,4.371813446508854,4.660475617767985,14.064498264425552,6.345977737771862,15.875788364806617,15.804088754340032,13.70582294394756,4.956171108035168,18.018212788914205,8.295508975366953,14.049569268064035,5.181750558514353,4.721634940580177,10.609217239518802,18.64778516823924,10.13542240561085,2.7467123451925346,11.542050239514596,14.666281991337211,7.198639948038936,14.036347997204981,3.379734315010383,8.491609677305112,14.593481070124179,13.938163085936441,3.7624436672846118,6.874754083352306,7.757039152278913,12.16954717261418,18.18142168510885,18.765300256583068,6.93406534116809,2.4074068033536777,9.828052071321807,10.137005212737495,11.975157845198993,17.703214108789407,16.707634224600653,1.9989367296384675,10.010925642194405,11.863887573001621,5.2523601316472,3.6898362117386663,9.466605439442421,7.288822026303956,19.94320056855753,11.386269384462242,18.005854789401198,4.053336353161829,7.1462524770337055,17.907756389434702,8.25318952798864,8.23445708313669,11.55500987146878,8.300721757735502,13.194895367545607,12.373596803290141,19.197713828633223,11.726224250866824,15.455158312649594,0.24355688509375195,4.860452754766382,11.301374753956077,18.146716397065514,12.197583637535153,7.698038220130421,9.871206896750419,1.2715988216197127,13.155050397036536,9.239110613808958,0.026352205823521047,1.042483266563119,8.213746377387334,19.617949347187764,3.2672507415294083,8.174566731071359,17.054727092600686,17.010426416878595,13.777506524631832,15.6749899005899,6.940730540245443,19.125506563735478,5.550257013674318,19.417409854558866,5.088884512395282,1.3548538881848682,5.326167323153244,14.394084519764142,5.78477367224822,6.2637334642432085,3.2633052937980622,10.75901981554091,16.20355383299522,5.9499804855576555,15.327500014776621,7.415182334945998,2.669242030295793,13.163105710382027,6.183077668456214,17.25922355485369,1.63283915705275,7.985822797898856,19.206329866039297,19.76613333368073,13.879488671080935,14.40471265774053,18.135533908258857,9.964326321728585,19.315658848001522,9.482772793461894,0.5167298711858326,6.6633124525694765,12.001245204452765,11.868389944762363,7.9607965568328565,13.306968341258,6.000739911861879,16.200876154582254,13.066837578631958,7.715820285687562,15.780581409473676,11.08148518441411,17.888215645900157,4.7249037366673585,15.177243760244178,2.3554629181224485,19.215772668747405,3.7612816248142433,16.58536140006913,8.06527899023662,4.432837399466774,8.835818834535756,14.0470295822898,14.790775015091487,15.872354803729234,18.258827638740918,19.684704434156153,10.415446598232263,17.814273087172467,2.7882954780682168,19.027611031868158,10.203166276225563,0.724611494514118,2.233934885376163,1.406780170191002,16.58950267470329,4.740027646326648,17.87457313372938,18.108372675150797,14.09072247862506,7.737187043718139,16.899147920620663,8.854383916300325,4.865450361560613,3.8159848729207946,13.342768110623107,7.389974771520511,12.22116529265524,15.303993896566723,19.004953716196443,7.569174781154189,18.89364234108825,17.084098142238258,15.616152383091912,0.8856808434378438,7.789116353815597,18.10147718327578,13.261339409617792,14.237217656552197,0.2378353842930947,7.979893996348659,9.037900047200825,0.9573938933413118,19.45329286664775,1.6696416539836312,4.270881805692164,3.427908087779823,14.741882344457089,12.232603834738963,16.178175947081847,8.300982796210024,5.647309224370862,2.3913035113627457,7.480713944942505,14.814748318733585,8.926206949620692,8.40414377309318,13.0026415673602,10.822892275803252,17.90599197347386,10.060302016624192,11.79108362072661,16.74086646024221,11.297036615151193,0.5071582284315346,12.647931110583489,4.426431579133814,17.539328291426305,3.074483668232726,13.33463058896356,9.041238089547253,15.313676291393445,8.488636740679304,12.150981933978855,11.291654360626087,0.02257750528520841,6.2253663720094865,0.7400072983739481,7.493690067563539,16.634030577753585,16.968154882014378,4.572097535740798]}
},{}],54:[function(require,module,exports){
module.exports={"expected":[-1.920346677716793,-1.9203466777167921,-1.9203466777167932,-1.9203466777167932,-1.9203466777167923,-1.9203466777167997,-1.9203466777167932,-1.9203466777167935,-1.9203466777167935,-1.9203466777167928,-1.9203466777167932,-1.9203466777167952,-1.9203466777167935,-1.920346677716793,-1.9203466777167932,-1.9203466777167926,-1.9203466777167928,-1.9203466777167892,-1.9203466777167915,-1.920346677716793,-1.9203466777167932,-1.9203466777167937,-1.9203466777167928,-1.920346677716793,-1.9203466777167923,-1.9203466777167928,-1.9203466777167937,-1.920346677716792,-1.9203466777167946,-1.920346677716794,-1.9203466777167926,-1.920346677716792,-1.9203466777167926,-1.9203466777167935,-1.9203466777167926,-1.9203466777167921,-1.9203466777167937,-1.920346677716793,-1.9203466777167928,-1.920346677716792,-1.9203466777167935,-1.9203466777167946,-1.920346677716792,-1.9203466777167886,-1.9203466777167932,-1.9203466777168126,-1.920346677716793,-1.9203466777167928,-1.9203466777167932,-1.9203466777167972,-1.9203466777167932,-1.9203466777167946,-1.9203466777167921,-1.9203466777167886,-1.9203466777167928,-1.920346677716793,-1.9203466777167932,-1.9203466777167932,-1.9203466777167928,-1.9203466777167921,-1.9203466777167972,-1.9203466777167943,-1.920346677716791,-1.9203466777167906,-1.9203466777167912,-1.9203466777167926,-1.920346677716792,-1.920346677716793,-1.9203466777167946,-1.9203466777167932,-1.9203466777167906,-1.920346677716792,-1.9203466777167923,-1.9203466777167957,-1.920346677716792,-1.9203466777167923,-1.9203466777167943,-1.920346677716792,-1.9203466777167921,-1.9203466777167932,-1.920346677716792,-1.9203466777167928,-1.920346677716787,-1.920346677716792,-1.9203466777167917,-1.9203466777168008,-1.920346677716796,-1.9203466777167646,-1.9203466777167926,-1.9203466777167915,-1.9203466777167932,-1.9203466777167926,-1.920346677716793,-1.920346677716793,-1.9203466777167928,-1.9203466777167932,-1.9203466777167935,-1.920346677716792,-1.9203466777167915,-1.9203466777167932,-1.9203466777167946,-1.9203466777167937,-1.9203466777167932,-1.9203466777167932,-1.920346677716793,-1.920346677716797,-1.9203466777167932,-1.920346677716792,-1.9203466777167932,-1.9203466777167892,-1.9203466777167915,-1.9203466777167932,-1.9203466777167921,-1.9203466777167917,-1.9203466777167901,-1.9203466777167921,-1.9203466777167926,-1.9203466777167844,-1.9203466777167946,-1.9203466777167926,-1.9203466777167928,-1.9203466777167932,-1.920346677716792,-1.9203466777167926,-1.9203466777167928,-1.9203466777167928,-1.9203466777167948,-1.9203466777167904,-1.9203466777167932,-1.9203466777167921,-1.9203466777167926,-1.9203466777167917,-1.9203466777167921,-1.920346677716793,-1.9203466777167906,-1.9203466777167963,-1.9203466777167932,-1.9203466777167906,-1.9203466777167955,-1.9203466777167928,-1.9203466777168077,-1.9203466777167928,-1.9203466777167923,-1.920346677716793,-1.920346677716792,-1.920346677716792,-1.9203466777167928,-1.9203466777167888,-1.920346677716793,-1.9203466777167935,-1.920346677716794,-1.9203466777167932,-1.920346677716793,-1.9203466777167946,-1.9203466777167926,-1.9203466777167926,-1.920346677716793,-1.9203466777167932,-1.9203466777167932,-1.9203466777167937,-1.9203466777167946,-1.9203466777168174,-1.920346677716793,-1.920346677716793,-1.9203466777167928,-1.9203466777167932,-1.9203466777167932,-1.9203466777167875,-1.9203466777167928,-1.9203466777167912,-1.9203466777167921,-1.9203466777167935,-1.9203466777167928,-1.9203466777167928,-1.9203466777167921,-1.920346677716793,-1.9203466777167926,-1.9203466777167932,-1.9203466777167941,-1.9203466777167917,-1.9203466777167926,-1.9203466777167926,-1.920346677716792,-1.9203466777168998,-1.9203466777167941,-1.9203466777167932,-1.920346677716783,-1.9203466777167932,-1.9203466777167923,-1.9203466777167932,-1.920346677716794,-1.9203466777167932,-1.9203466777167923,-1.920346677716792,-1.9203466777167932,-1.920346677716793,-1.9203466777167935,-1.9203466777167932,-1.9203466777167906,-1.9203466777167923,-1.920346677716802,-1.9203466777167928,-1.9203466777167932,-1.9203466777167946,-1.9203466777167935,-1.920346677716793,-1.9203466777167941,-1.9203466777167928,-1.920346677716793,-1.9203466777167917,-1.9203466777167937,-1.9203466777167753,-1.9203466777167926,-1.920346677716793,-1.920346677716793,-1.9203466777167923,-1.9203466777167932,-1.9203466777167928,-1.9203466777167928,-1.920346677716793,-1.9203466777167937,-1.920346677716789,-1.9203466777167926,-1.920346677716793,-1.9203466777167906,-1.9203466777167928,-1.920346677716792,-1.9203466777167928,-1.920346677716793,-1.9203466777167932,-1.9203466777167923,-1.920346677716793,-1.9203466777167932,-1.920346677716793,-1.9203466777167921,-1.9203466777167932,-1.9203466777167906,-1.9203466777167932,-1.9203466777167932,-1.9203466777167935,-1.920346677716793,-1.9203466777167926,-1.9203466777167957,-1.9203466777167906,-1.920346677716792,-1.9203466777167926,-1.920346677716792,-1.9203466777167926,-1.920346677716793,-1.9203466777167928,-1.9203466777167932,-1.9203466777167923,-1.9203466777167917,-1.9203466777167921,-1.920346677716797,-1.9203466777167901,-1.9203466777167928,-1.9203466777167946,-1.9203466777167932,-1.9203466777167935,-1.9203466777167932,-1.9203466777167926,-1.9203466777167917,-1.9203466777167926,-1.920346677716796,-1.9203466777167941,-1.9203466777167928,-1.9203466777167912,-1.9203466777167921,-1.9203466777167932,-1.9203466777167928,-1.9203466777167932,-1.9203466777167917,-1.9203466777167923,-1.9203466777167928,-1.9203466777167937,-1.9203466777167926,-1.9203466777167943,-1.9203466777167932,-1.9203466777167932,-1.9203466777167928,-1.9203466777167928,-1.9203466777167928,-1.9203466777167921,-1.920346677716792,-1.9203466777167921,-1.9203466777167932,-1.9203466777167932,-1.9203466777167932,-1.920346677716792,-1.920346677716793,-1.9203466777167923,-1.920346677716793,-1.9203466777167923,-1.9203466777167926,-1.9203466777167928,-1.920346677716791,-1.9203466777167926,-1.9203466777167935,-1.9203466777167932,-1.920346677716794,-1.920346677716793,-1.9203466777167932,-1.9203466777167926,-1.9203466777167948,-1.920346677716793,-1.9203466777167926,-1.9203466777167928,-1.9203466777167932,-1.9203466777167952,-1.9203466777167981,-1.9203466777167928,-1.9203466777167928,-1.9203466777167926,-1.920346677716788,-1.9203466777167921,-1.9203466777167928,-1.9203466777167935,-1.920346677717307,-1.920346677716794,-1.9203466777167932,-1.9203466777167932,-1.9203466777167937,-1.9203466777167928,-1.9203466777167928,-1.9203466777167917,-1.9203466777167932,-1.9203466777167906,-1.9203466777167932,-1.9203466777167928,-1.9203466777167921,-1.9203466777167928,-1.9203466777167932,-1.9203466777167941,-1.9203466777167923,-1.9203466777167932,-1.9203466777167928,-1.920346677716793,-1.9203466777167946,-1.9203466777167923,-1.9203466777167926,-1.9203466777168117,-1.9203466777167935,-1.920346677716792,-1.920346677716793,-1.9203466777167926,-1.920346677716791,-1.920346677716794,-1.9203466777168094,-1.9203466777167946,-1.920346677716794,-1.9203466777167932,-1.920346677716792,-1.9203466777167932,-1.920346677716793,-1.9203466777167921,-1.9203466777167932,-1.9203466777167937,-1.9203466777167923,-1.9203466777167937,-1.9203466777167923,-1.92034667771679,-1.9203466777167921,-1.9203466777167928,-1.9203466777167915,-1.9203466777167935,-1.9203466777167912,-1.920346677716793,-1.920346677716792,-1.9203466777167928,-1.9203466777167904,-1.9203466777167923,-1.9203466777167912,-1.920346677716793,-1.9203466777167932,-1.9203466777167932,-1.9203466777167915,-1.9203466777167948,-1.920346677716793,-1.9203466777167935,-1.920346677716794,-1.9203466777167928,-1.9203466777167928,-1.9203466777167926,-1.9203466777167932,-1.920346677716794,-1.9203466777167972,-1.9203466777167941,-1.9203466777167975,-1.9203466777167937,-1.9203466777167963,-1.9203466777167937,-1.920346677716793,-1.9203466777167928,-1.9203466777167926,-1.9203466777167928,-1.9203466777167957,-1.920346677716793,-1.9203466777167901,-1.9203466777167928,-1.9203466777167935,-1.9203466777167928,-1.9203466777167935,-1.9203466777167915,-1.920346677716792,-1.9203466777167928,-1.9203466777167935,-1.9203466777167937,-1.9203466777167872,-1.9203466777167932,-1.9203466777167921,-1.9203466777167932,-1.9203466777167926,-1.9203466777167952,-1.9203466777167946,-1.920346677716793,-1.920346677716793,-1.9203466777167937,-1.9203466777167935,-1.9203466777167968,-1.9203466777167932,-1.9203466777167946,-1.9203466777167943,-1.9203466777167923,-1.9203466777167506,-1.9203466777167928,-1.9203466777167926,-1.920346677716794,-1.9203466777167928,-1.920346677716783,-1.9203466777167917,-1.920346677716789,-1.9203466777167926,-1.920346677716794,-1.9203466777167932,-1.9203466777167932,-1.9203466777167852,-1.920346677716792,-1.9203466777167932,-1.920346677716793,-1.9203466777167948,-1.9203466777167923,-1.9203466777167928,-1.9203466777167921,-1.9203466777167877,-1.9203466777167926,-1.9203466777167932,-1.9203466777167921,-1.920346677716792,-1.920346677716788,-1.9203466777167928,-1.920346677716792,-1.920346677716793,-1.9203466777167926,-1.92034667771679,-1.9203466777167928,-1.9203466777167475,-1.9203466777167926,-1.9203466777167935,-1.9203466777167932,-1.9203466777167866,-1.9203466777167932,-1.9203466777167915,-1.9203466777167928,-1.920346677716793,-1.9203466777167926,-1.9203466777167928,-1.9203466777167923,-1.920346677716788,-1.9203466777167928,-1.9203466777167941,-1.9203466777167937,-1.920346677716793,-1.9203466777167926,-1.9203466777167943,-1.9203466777167963,-1.920346677716793,-1.920346677716793,-1.9203466777167926,-1.920346677716792,-1.9203466777167923,-1.9203466777167943,-1.9203466777167928,-1.9203466777167932,-1.9203466777167932,-1.9203466777167946,-1.920346677716793,-1.9203466777167935,-1.9203466777167923,-1.9203466777167937,-1.9203466777167704,-1.9203466777167941,-1.9203466777167921,-1.9203466777167932,-1.920346677716793,-1.920346677716792,-1.920346677716793,-1.920346677716793,-1.9203466777167926,-1.9203466777167946,-1.9203466777167926,-1.9203466777167937,-1.9203466777167328,-1.9203466777167926,-1.920346677716793,-1.920346677716793,-1.9203466777167884,-1.920346677716793,-1.9203466777167946,-1.9203466777167983,-1.9203466777167926,-1.9203466777167928,-1.9203466777167821,-1.9203466777167928,-1.9203466777167932,-1.9203466777167921,-1.9203466777167926,-1.920346677716793,-1.920346677716792,-1.920346677716793,-1.920346677716793,-1.9203466777167926,-1.9203466777167932,-1.9203466777167912,-1.9203466777167966,-1.9203466777167932,-1.9203466777167932,-1.920346677716792,-1.920346677716793,-1.920346677716794,-1.9203466777167928,-1.9203466777167892,-1.9203466777167932,-1.920346677716793,-1.9203466777167917,-1.9203466777167926,-1.9203466777167946,-1.920346677716793,-1.9203466777167943,-1.9203466777167915,-1.9203466777167932,-1.920346677716793,-1.9203466777167937,-1.920346677716792,-1.9203466777167937,-1.920346677716792,-1.92034667771681,-1.920346677716852,-1.9203466777167961,-1.92034667771679,-1.9203466777167941,-1.9203466777167952,-1.9203466777167928,-1.920346677716793,-1.920346677716795,-1.9203466777167912,-1.920346677716793,-1.920346677716793,-1.9203466777167895,-1.9203466777167932,-1.9203466777167926,-1.9203466777167928,-1.9203466777167915,-1.920346677716793,-1.9203466777167857,-1.9203466777167932,-1.920346677716791,-1.920346677716794,-1.9203466777167923,-1.9203466777167917,-1.9203466777167926,-1.920346677716792,-1.9203466777167935,-1.920346677716794,-1.9203466777167932,-1.9203466777167721,-1.9203466777167932,-1.920346677716793,-1.9203466777167928,-1.9203466777167926,-1.9203466777167932,-1.920346677716792,-1.920346677716794,-1.9203466777167921,-1.9203466777167937,-1.920346677716795,-1.9203466777167932,-1.920346677716793,-1.9203466777167932,-1.920346677716802,-1.9203466777167908,-1.9203466777167915,-1.9203466777167932,-1.9203466777167928,-1.9203466777167926,-1.9203466777167932,-1.9203466777167932,-1.9203466777167906,-1.9203466777167926,-1.920346677716792,-1.9203466777167921,-1.9203466777167921,-1.920346677716795,-1.9203466777167928,-1.9203466777167932,-1.9203466777167884,-1.9203466777167926,-1.920346677716793,-1.9203466777167915,-1.9203466777167926,-1.9203466777167937,-1.9203466777167877,-1.9203466777167977,-1.9203466777167948,-1.9203466777167921,-1.9203466777167917,-1.9203466777167935,-1.920346677716793,-1.9203466777167928,-1.9203466777167923,-1.9203466777167928,-1.920346677716793,-1.9203466777167932,-1.9203466777167921,-1.9203466777167932,-1.920346677716792,-1.9203466777167928,-1.920346677716793,-1.9203466777167937,-1.9203466777167921,-1.920346677716793,-1.920346677716793,-1.9203466777167946,-1.9203466777167935,-1.9203466777167923,-1.9203466777167923,-1.9203466777167928,-1.9203466777167928,-1.9203466777167926,-1.9203466777167923,-1.9203466777167937,-1.9203466777167928,-1.9203466777167935,-1.9203466777167941,-1.920346677716794,-1.9203466777167928,-1.9203466777167923,-1.9203466777167941,-1.9203466777167972,-1.9203466777167932,-1.9203466777167921,-1.9203466777167932,-1.9203466777167932,-1.920346677716793,-1.920346677716792,-1.9203466777167928,-1.920346677716793,-1.920346677716793,-1.920346677716794,-1.9203466777167932,-1.9203466777167932,-1.9203466777167928,-1.9203466777167928,-1.9203466777167935,-1.920346677716791,-1.9203466777167901,-1.9203466777167928,-1.9203466777167932,-1.9203466777167926,-1.9203466777167923,-1.920346677716793,-1.9203466777167928,-1.9203466777167906,-1.9203466777167937,-1.9203466777167932,-1.9203466777167932,-1.9203466777167932,-1.9203466777167921,-1.9203466777167955,-1.920346677716792,-1.9203466777167928,-1.9203466777167923,-1.9203466777167946,-1.9203466777167926,-1.9203466777167932,-1.9203466777167932,-1.9203466777167932,-1.9203466777167928,-1.920346677716794,-1.9203466777167943,-1.9203466777167932,-1.9203466777167897,-1.920346677716793,-1.9203466777167923,-1.9203466777167921,-1.9203466777167932,-1.9203466777167937,-1.920346677716791,-1.920346677716796,-1.9203466777167908,-1.920346677716793,-1.9203466777167928,-1.9203466777167932,-1.9203466777167917,-1.920346677716793,-1.9203466777167926,-1.9203466777167921,-1.9203466777167935,-1.9203466777167928,-1.9203466777167923,-1.920346677716795,-1.9203466777167928,-1.9203466777167932,-1.9203466777167917,-1.920346677716792,-1.9203466777167895,-1.9203466777167923,-1.9203466777167928,-1.9203466777167923,-1.9203466777167935,-1.9203466777167912,-1.920346677716793,-1.920346677716793,-1.920346677716792,-1.920346677716793,-1.920346677716793,-1.9203466777167926,-1.9203466777167943,-1.9203466777167937,-1.9203466777167932,-1.920346677716792,-1.920346677716789,-1.9203466777167941,-1.9203466777167928,-1.9203466777167932,-1.9203466777167912,-1.9203466777167892,-1.920346677716792,-1.920346677716793,-1.9203466777167932,-1.9203466777167928,-1.920346677716793,-1.920346677716793,-1.9203466777167932,-1.920346677716801,-1.920346677716804,-1.9203466777167928,-1.920346677716793,-1.9203466777167912,-1.9203466777167921,-1.9203466777167932,-1.9203466777167932,-1.9203466777167917,-1.9203466777167917,-1.920346677716793,-1.9203466777167946,-1.920346677716795,-1.9203466777167932,-1.920346677716794,-1.9203466777167946,-1.9203466777167928,-1.9203466777167921,-1.9203466777167923,-1.9203466777167928,-1.9203466777167926,-1.920346677716793,-1.9203466777167928,-1.9203466777167928,-1.920346677716793,-1.9203466777168117,-1.9203466777167941,-1.9203466777168043,-1.9203466777167932,-1.9203466777167926,-1.9203466777167923,-1.9203466777167928,-1.9203466777167932,-1.920346677716793,-1.920346677716796,-1.9203466777167995,-1.9203466777167926,-1.9203466777167932,-1.9203466777167797,-1.920346677716793,-1.9203466777167932,-1.9203466777167937,-1.920346677716792,-1.920346677716795,-1.9203466777167917,-1.9203466777167932,-1.920346677716793,-1.9203466777168958,-1.9203466777167928,-1.9203466777167897,-1.9203466777167935,-1.9203466777167928,-1.920346677716794,-1.9203466777167935,-1.9203466777167932,-1.9203466777167921,-1.920346677716793,-1.9203466777167932,-1.920346677716795,-1.920346677716793,-1.9203466777167932,-1.9203466777167941,-1.9203466777167932,-1.9203466777167928,-1.920346677716797,-1.9203466777167948,-1.9203466777167932,-1.9203466777167935,-1.9203466777167995,-1.920346677716792,-1.9203466777167928,-1.920346677716793,-1.9203466777167928,-1.9203466777167928,-1.9203466777167935,-1.9203466777167926,-1.9203466777167923,-1.920346677716792,-1.9203466777167926,-1.9203466777167932,-1.9203466777167932,-1.9203466777167932,-1.920346677716793,-1.920346677716793,-1.9203466777167923,-1.920346677716793,-1.9203466777167928,-1.920346677716793,-1.9203466777167937,-1.920346677716793,-1.920346677716795,-1.9203466777167926,-1.9203466777167932,-1.920346677716793,-1.9203466777167928,-1.9203466777167921,-1.9203466777167928,-1.9203466777167932,-1.9203466777167926,-1.9203466777167935,-1.9203466777167915,-1.9203466777167928,-1.9203466777167932,-1.9203466777167935,-1.9203466777167923,-1.9203466777167915,-1.9203466777167923,-1.920346677716791,-1.9203466777167932,-1.9203466777167901,-1.9203466777167926,-1.9203466777167926,-1.9203466777167937,-1.9203466777167932,-1.9203466777167932,-1.9203466777167904,-1.9203466777167921,-1.9203466777167926,-1.9203466777167932,-1.920346677716794,-1.9203466777167641,-1.9203466777167932,-1.9203466777167852,-1.9203466777167946,-1.9203466777167932,-1.9203466777167932,-1.9203466777167926,-1.9203466777167923,-1.9203466777167923,-1.9203466777167926,-1.9203466777167921,-1.9203466777167932,-1.920346677716792,-1.9203466777167688,-1.9203466777167895,-1.9203466777167937,-1.9203466777167923,-1.9203466777167932,-1.9203466777167932,-1.9203466777167946,-1.9203466777167926,-1.9203466777167932,-1.9203466777167923,-1.9203466777167928,-1.9203466777167941,-1.9203466777167926,-1.9203466777167932,-1.9203466777167932,-1.920346677716792,-1.920346677716792,-1.920346677716793,-1.9203466777167917,-1.9203466777167892,-1.9203466777167926,-1.9203466777167928,-1.920346677716793,-1.9203466777167928,-1.920346677716793,-1.9203466777167935,-1.9203466777167932,-1.9203466777167932,-1.9203466777167923,-1.9203466777167935,-1.920346677716793,-1.9203466777167912,-1.9203466777167928,-1.9203466777167932,-1.9203466777167926,-1.920346677716792,-1.9203466777167923,-1.9203466777167932,-1.9203466777167937,-1.9203466777167928,-1.9203466777167932,-1.9203466777167943,-1.920346677716793,-1.9203466777167932,-1.9203466777167935,-1.9203466777167928,-1.9203466777167937,-1.9203466777167932,-1.9203466777167955,-1.9203466777167904,-1.920346677716793,-1.9203466777167926,-1.9203466777167932,-1.9203466777167912,-1.9203466777167932,-1.920346677716793,-1.9203466777167928,-1.9203466777167926,-1.920346677716793,-1.9203466777167926,-1.920346677716793,-1.9203466777167935,-1.9203466777167915,-1.9203466777167923,-1.920346677716793,-1.920346677716793,-1.9203466777167935,-1.9203466777167932,-1.9203466777167917,-1.920346677716793,-1.9203466777167921,-1.9203466777168008,-1.9203466777167932,-1.9203466777167932,-1.920346677716793,-1.9203466777167932,-1.920346677716793,-1.9203466777167724,-1.920346677716793,-1.9203466777167928,-1.9203466777167935,-1.9203466777167932,-1.9203466777167952,-1.9203466777167926,-1.9203466777167923,-1.9203466777167932,-1.9203466777167941,-1.9203466777167955,-1.920346677716793,-1.920346677716793,-1.920346677716793,-1.9203466777167935,-1.9203466777167977,-1.9203466777167932,-1.9203466777167897,-1.920346677716792,-1.9203466777167928,-1.920346677716792,-1.9203466777167921,-1.920346677716793,-1.920346677716769,-1.9203466777167928,-1.920346677716792,-1.9203466777167977,-1.9203466777167906,-1.9203466777167932,-1.920346677716792,-1.9203466777167917,-1.9203466777167932,-1.9203466777167928,-1.9203466777167915,-1.920346677716793,-1.920346677716793,-1.920346677716448,-1.9203466777167923,-1.9203466777167921,-1.9203466777167937,-1.9203466777167917,-1.920346677716793,-1.9203466777167923,-1.9203466777167932,-1.920346677716793,-1.9203466777167928],"c":[12.492474934418219,18.891658032636773,17.011019571614913,2.7710183853987678,9.27410534865906,14.366529072863313,3.5262086915309645,7.177735340170537,10.359886236129896,7.7497137387702475,12.0919671403662,19.068985964386023,5.157678489155677,9.19058880575509,10.933006619193296,6.641778902184243,9.070583515253713,14.116774096189562,20.87620027079847,11.480383276310558,5.3942025810927445,20.064666958962448,6.609998149636404,23.82992954872349,2.432923095783476,16.99475651289168,16.259791729875612,20.633183514840095,14.436563894669545,21.868598230887226,6.575709972152365,2.781253148026542,5.998895592188488,8.893911328874378,15.53596212253009,9.204431527403425,21.54198782423655,9.773915268922607,3.3751810793511163,19.31899665493751,13.886751073378235,5.587533045559269,17.446039169458583,5.813324244390509,9.94306691020283,19.649527202222405,1.0577123085235025,10.872211933229472,12.170995840817634,12.657752023115036,12.285601297863488,16.764906807593675,20.054668910792824,14.510113742032974,3.463164280515403,15.805781368469425,11.545217000621701,9.655814708389755,3.6747893757964305,14.650843476939063,7.346332639291692,10.06212790229509,18.151634726747105,22.016728182927007,14.885193223635795,16.453024919180248,17.80374068011198,4.5781794030701874,3.8350292868420395,14.404482931008474,14.486367418076837,12.773253266664447,15.065385004317882,15.759457457741316,12.157961909223877,12.104512704677006,12.217556061565663,17.110272361019415,10.952992493108862,6.472583071785195,15.875374369424,23.381485215922126,4.747810408220715,15.41893004494622,21.72357994179597,19.37285600569743,20.070757052616674,6.771771315251002,15.052910439393262,14.604001014198161,14.07910949572366,15.058709230527894,14.688675324924253,10.692287469832555,8.721825790315576,6.8084261119336995,15.066078615429888,11.76570664349254,17.54609585993639,13.112964745827508,19.63906147596624,7.46400427361249,11.082578294966122,14.51174920192289,19.263718455826655,11.331985507278976,17.222501752017827,8.74426129041674,16.61836853523813,16.502566817808813,18.886766423096326,9.767615171588051,3.7859729189715385,20.442517612549665,17.145065286281916,16.98541222148097,13.397487576533008,19.073524224107995,12.362904218774977,7.06569084466527,9.762987411077292,7.3652916985445085,19.873267895657992,7.462935605325227,12.472317121228814,7.095555847956588,18.34896634712605,21.030429054814714,4.871230042568935,9.079188314707807,7.569219109909238,7.7678793396835095,20.457046107639208,6.106658414347659,15.89966150679316,9.89918679416584,6.666121640107347,1.265511733697087,10.957754422207813,3.8158664878647315,17.13225819907838,7.795168218949333,3.115158336953677,7.454748643867379,19.08975889759223,8.990245637619402,6.836341168501031,15.244412534745942,5.500320104209501,5.75364754104878,17.46593812074186,6.794893582948635,9.237188843491388,18.34446774919563,11.695636608829822,10.09622841554754,8.389736314637894,5.185083261439755,11.012354338586496,6.705815168843621,8.877544322671735,11.25701093268673,16.104073920651768,10.736520333129574,4.364114714397457,14.499741288096288,16.886660610206114,15.458996267243739,15.200418893673206,19.042651421403978,6.325434021119264,13.638894657348182,5.814062837878704,5.1190047781422265,16.882063601260683,11.561230064516634,14.630351456455028,16.375409210117162,9.349783157570432,9.509057597252806,9.101939957675107,5.519307225337151,21.27780938086617,18.03466666440269,21.06030842474576,15.37336799468772,11.484724924840616,7.588574877176446,16.462582905724986,3.4835912884216507,17.160272619033144,15.295153146319862,11.453536011675233,9.597383134321774,10.445059897821327,6.816827515462242,18.513678671247998,1.7159073440328756,4.641519519923122,10.121257540458203,13.51340020152086,21.731392968793266,15.44189153957186,21.539421155401776,3.8023777185211154,17.39442011695574,19.80044324378225,3.88078816925378,8.947749288456968,19.672399987319327,16.050407860972513,17.97676142114158,17.2688640436807,5.972855960044145,7.160073052943602,15.052343655224174,19.173115393730118,10.539385537202147,2.8609082812130815,7.760282003554688,16.44246531129911,15.102549141788518,20.15189276019788,6.633036245106886,18.629436023740553,8.561860283035163,16.65760760005702,2.9310487147110367,5.5382405264093935,9.495362545583196,11.959656070005622,15.553707852543567,2.2307498579146485,0.558223046145325,21.035117238751848,4.236709785456176,10.85632259641049,11.40808116893524,13.618090547847908,20.830878293106835,11.920556075348001,5.028112749715826,20.739087613658537,14.528300700170215,19.510835021970045,13.041184596871918,5.80951547293203,12.754798907523774,13.858391952346164,8.7753898419583,10.912380581216258,5.973276924663538,11.509766954739959,21.386128924015352,19.76073648132923,20.285276832546593,15.945243587183953,20.71385580803203,5.129409627384781,8.471597507088186,11.964729176707507,13.942515761097525,14.425121047957482,22.141562697613256,17.20361859225306,17.60991574287546,16.374076458650563,20.7365075177809,18.651524713835865,8.513607564321916,13.364164001416125,10.060835921633462,23.377890217962353,11.203958633133778,7.838578865653591,11.123699623635169,6.910276256319559,17.802816499558787,8.317230920634735,13.046513628193884,15.868560365690318,13.605580485120907,4.28958941963119,9.1303935032891,17.140473397697733,23.81795415327302,12.908950202071233,19.593757255413387,8.306998976323328,12.918186958325304,18.030555650535952,17.430426526420607,15.97917392433771,5.779680762448149,12.31605549854031,2.5676243839139774,19.17229595276524,22.37792818662006,11.117886451817414,14.716145958193334,5.557488390016093,3.9032375911207104,21.62548859580839,6.244886799974925,5.383533693622219,4.1845365395849665,12.196868827425225,1.7355441589780465,13.744839246802012,10.570032550141365,10.20905617827107,7.054972640284305,9.5110421213701,16.34073883487132,14.6177236451863,8.979712260547116,14.835283327978958,22.68748938982693,10.74301357163449,11.221738331027687,4.7197748093205405,8.142672874973714,14.803667994958607,11.06145717837694,6.804639439692853,20.54403097272952,12.073983500117492,9.875493434365215,15.478725573587178,11.889714510399445,9.933565971793097,13.673595561443157,5.815757379408933,2.6907620517979067,22.564074948705727,15.914049142746336,12.524238800865788,20.144745002068746,4.005617997269006,21.69170541519647,2.7155393859128276,5.8880405063612455,13.693649326864843,11.38229958384764,5.765601148763766,6.344152509059654,17.65372862546399,15.132970717296258,13.763966096420056,5.846508950671727,21.35901546657608,6.085065886119855,17.99039997383155,4.992929291844782,8.019481036497726,10.497425130105524,10.388831348134769,18.67346783011679,14.572789491777828,5.14286427309014,6.447281469260375,17.912095967270332,15.558823075708663,6.9189921374598775,22.047837375091248,11.938004780408646,20.0732253534349,11.272121053633184,13.178951523052591,13.04584564745256,20.485186858187447,12.507368181364308,7.309096295159411,4.526321893538485,6.9710331154149365,17.395155068403863,14.45155033801847,13.099937292487887,14.981664457525778,14.490622334135384,20.935557438563393,12.741087567112398,5.729760895970087,16.06908412233635,10.877773006165539,8.546325582363465,20.38222768787858,18.485589172555127,18.569793046802157,18.085585127602812,16.75846657984351,11.282257730040843,4.267268751534577,19.644776769045453,6.909622754508496,14.914958541220098,9.407470296005938,6.102189114723051,10.00673868160589,12.02200794399171,4.575286056340838,8.97974030725473,13.807572138951764,13.817765521371982,15.288956201303161,15.513659996947007,10.764052767407911,24.23992132162938,17.574419185148514,7.429510893128223,14.57628246162087,11.979737330742047,15.844170518451655,17.30448818779506,18.968420445680593,14.061185817909285,1.754993367495158,11.316882532936503,11.21022248585881,10.648855066107995,20.85439287192808,10.425988507629297,13.659392078529592,21.223172597373605,9.613334808024025,14.000390693728214,6.576113257165331,6.918128148606097,4.805954284885549,16.94558766888018,18.992289365280797,20.126023181840143,12.749918852463098,23.324668875696915,8.8242936225483,14.198620332367238,19.908671112563983,14.660172940489424,8.090108867519902,1.577071796699356,20.51224375643694,13.7525739616876,15.20286870996911,23.223733910351037,15.490830736196992,18.376789566454637,18.843150946601746,6.692199976539156,5.038373452757467,16.32968584758165,14.420817235389588,16.467826347442518,14.492070389008179,15.434475808012671,13.141633721698089,1.657745920923138,3.237766653050234,2.752083315005151,21.267174100148136,8.351693875006408,10.831244756370019,13.679646662488324,22.018983743241307,13.36208417001733,22.441377515480195,1.7412962956445919,12.08942966578697,14.541545449679147,19.651520034879688,1.594098606146538,19.983957718179145,13.722073049766458,18.952937327826714,11.1158365010189,17.006633257401152,7.491268691154089,13.819780116468905,10.455889818712238,10.52730259352092,10.927964233809842,11.799782022481123,19.910283859537856,8.510873431329939,19.25354291856721,14.226976399490702,19.049093286828384,6.355794861101048,0.792318597768608,23.0983987225167,3.192417457598965,12.115001207250888,19.0445018009991,11.494591590695748,2.9775200150599397,5.484141386095102,20.212280275675592,12.18549721808733,14.809251008496544,21.89706224989482,17.24706482018473,7.188294901824038,10.981878772927393,16.36306468085798,13.864366051723673,3.683733835610716,11.38900355726727,17.81434777200391,15.543675873733896,20.71967551761736,18.5534332501823,19.774245823414233,19.24113407399632,17.068829702365708,12.712738570650448,14.500743295084463,11.518820998918695,22.78956786070259,14.355783197902548,12.168732236164361,16.78946321667833,2.691497110760706,16.73543183498234,6.659941766678371,8.673612253284542,4.970756267607829,10.399655472733325,9.683808339612295,17.069533614618457,10.595115800839862,16.16255290524208,13.540760322445252,3.558984384008544,6.75895600227637,19.252018031301592,9.754956073702928,3.368650681079585,22.307787853584603,19.808226889080913,15.146776134445286,15.395482826817894,6.730876484344508,8.932790015176629,19.56853797046169,7.357072252551244,21.661887850648167,9.571704958705826,8.477538467062153,6.676513397178579,12.66371670077858,13.538970621400997,5.3347115199585415,21.799427054834716,2.337730761595479,0.8641254504873958,16.299473779807013,8.444714607131607,17.19553778685336,1.5255010024964113,5.047270406939915,20.286509989248366,14.31015756151922,2.9890415155857086,15.036678376523472,10.224452750185272,9.168515368942321,3.0417764929881415,19.34188939911944,9.243172128725735,10.915677095355823,15.3086845067965,21.059471380902142,18.530042277456463,9.70974206327907,19.814824023223508,14.271469020514424,4.437077526975795,21.759677819599588,5.487388258436535,9.624796945155508,13.877387776204348,10.152751666426491,6.961102016242092,17.22022166862176,16.6550322107189,8.858673542418757,20.49113891954643,17.354281613018657,12.700462701148334,3.3562683660006147,12.598197590873486,16.899581026544144,15.095416644842093,5.241144102928259,11.66633737836006,7.82612249868172,10.918220304489788,14.066006391182665,18.474345377225326,6.923117948144746,24.02287945206107,21.1038168168672,19.794902010837056,14.244672289679167,12.319321570152136,6.5227968748172795,13.981074020709,9.578806051174425,22.733780860196426,16.208161340822766,21.53092095543435,20.122150899703065,19.68931608991164,6.2552632926001035,19.848142920727277,3.9488892943955642,6.887258070470788,9.962665606872626,4.758490834823164,11.779816299017103,10.184491821975662,11.248609420030085,5.144297889482475,3.1407020934445757,19.9657682516342,5.712917800228604,8.595734115301212,10.500577829880651,3.0676516378409326,12.461316310417773,15.515203499923498,16.42741745282058,7.635418803505859,2.0029775363857816,10.53022498931954,10.827534827290265,22.828867445261942,19.75804363168679,16.824557098327,15.202254079707815,14.597780559708681,19.079645250398787,17.778790075981707,8.027508357736085,17.539982099954223,17.202511386605188,6.7634783636048885,15.616297440069786,15.084934126682365,9.681042574127012,8.63725117251705,7.890889513708302,14.906815335438164,9.543712282094969,7.615456589898614,18.37326707130119,9.030997794526069,6.621467641370096,6.373068840753398,18.657497055982255,14.043695861070645,4.940632212169019,7.491708229647394,12.623966779543524,7.800894128987955,16.702759265549528,20.278431426209362,15.826392422048547,7.879720325971579,5.5868439186111125,4.843699866945327,7.16715299144034,23.35262858237551,20.25385592730093,19.153645055018753,22.588161405245636,7.052986036428997,17.731606096151943,21.997941566137825,21.160718088604376,17.698936064878357,9.482928168984344,0.8690836061343121,17.10919938543471,13.742049964087194,5.155659530640983,7.282052332833261,8.517243264414898,6.665110943950628,21.301275451440834,21.983620629891142,16.14514861902222,17.608750234539553,8.747798556381063,22.19833915777715,16.735791948314098,12.03908762710956,10.01560262060924,11.227176455419904,14.631430396311986,16.240734168969965,10.754458391566594,3.790556903639937,16.09289930189627,23.354207997151086,9.12295294796412,2.1304666258854223,15.677782680016165,17.49201848546089,4.652780563480227,11.106532459553573,16.673711223172123,4.688231443577553,18.999555736341886,12.184126035297616,15.09089386339582,3.6066855042862636,8.801374559624128,21.094436341104675,9.478394461934634,11.393879308656606,14.056764884385208,11.477644726197354,3.1262246155487974,20.941180510735233,24.25150581713612,6.914348010308386,19.59610557465372,9.680992856880195,19.490287230293998,10.106262516074928,4.505822679013284,3.1923908888565515,13.506446528581161,4.796718554088694,9.642842160387236,20.215925920847337,16.963592343196726,6.529429435669725,16.970309344713062,8.527607154839423,14.610699498521697,0.8678232698890964,0.9511059597549263,4.298295090794285,17.091730352834496,14.693951209510173,17.732248393873405,3.4009690746585752,18.61050445251687,2.204694926011925,11.435521691829234,16.48388159123507,8.52780675686145,7.786312002994725,23.867216187431733,17.011131271936357,16.7471554610075,15.855747646056516,20.048504201962942,10.500439202919006,13.522183677054276,7.661889510711807,21.373787225573775,5.234660871009501,2.8747531924362404,15.342815300398971,4.538743855040659,13.620498504696187,10.434570773539903,15.534373721338955,13.165317156989246,4.798105404607178,1.7765875835070175,6.931202988947914,8.06181291858975,13.400259413879002,6.997514363743999,4.894536209710434,11.358352330024811,13.749620007074137,3.415571445947019,19.049521153793876,9.697283447058645,9.832400637865009,13.510801122001695,15.049086458459136,10.954510725756514,11.840681197554868,20.00053748785771,20.346333538851933,5.3641086903283295,9.949588277714005,10.438520298501322,16.87293662213491,17.385637201599252,1.5916538074231148,15.18141970687358,11.038423762958962,15.631591757685264,14.28311634893429,4.1844094300044805,3.2665451043658,12.432591325115848,16.176112294292366,17.17224988972555,16.365961108819505,13.291068017796832,2.8633696427486712,9.694087770526746,21.925121460042472,2.342504938346252,23.158138253081674,18.818073100616093,19.34983790506396,22.46726274709085,19.500191715844387,16.957425821758846,3.724218821490561,18.803281298955646,6.625495206874508,22.600529328484274,13.687201120262134,16.408426380185354,12.798846990302362,8.099806346178646,7.958740540905777,16.59715055518028,5.674128607368006,4.8577539724678855,3.126106333813192,24.52337887843587,20.774109817681186,14.002065220242816,12.269732118729726,4.657004890755475,12.221937501736052,17.937073458306344,22.4938071737454,2.2350351658030165,3.3376679771561015,7.530287140380944,1.616680740513338,3.7452507850132952,7.226079924506883,18.559783086185796,10.904118623641773,6.160016806234124,17.5737967233624,9.67560780908012,2.216801747683604,21.82601944337984,5.927202680129566,5.073327412741337,14.104442234180421,3.766052976530905,17.049388018601,23.361233441778076,7.1983662008119325,7.325699167070543,1.80383991282876,21.05341851645768,13.982337866714081,21.016999372898383,12.321274899935613,16.831902181660723,3.535435778757683,8.135683053021488,18.67900864406343,1.4611476339270135,8.002086881565688,20.890769310237957,11.786582296646293,16.32536842892012,12.775448502081048,17.45415931561968,3.7108445584307006,10.203181786260922,18.88235226927811,20.368860218138543,14.196923120301449,9.959955294363748,7.085686868319593,0.7980356222871052,15.151738892680573,11.718420961361026,10.750591562780837,7.102366750043276,3.9690788072869263,23.89925495723238,13.837831236900985,14.728050223834169,16.190578202107588,15.332327254803038,4.372369708346161,6.203712379934416,6.690295286500272,14.358883014104078,6.127360977866803,15.039033883015932,10.674597834113563,2.1049091128748536,5.01369977309598,21.806485883374645,6.138439554610969,12.69449118468949,19.137666160031557,19.944471271388004,5.462659387603247,13.110053569383197,14.168408754748027,16.582960308897107,6.363624614050472,13.184416390006128,15.168855915995193,2.5409450672606697,21.078050078592366,6.091209996822424,17.87573953189809,20.99586223621231,21.45021098665689,15.24825687458129,12.723296189758077,11.512519985857558,23.303917626030497,7.4915653382531024,19.752982081524816,0.9750855949275491,7.943084299848371,15.72020215141917,8.692527621035342,4.847353286064981,15.26936667996908,1.699854812397254,2.6325614768425663,16.23889809528284,15.11099062714733,12.53819299444909,18.965486344699453,20.052535348243712,9.019296454952533,12.448324057182436,1.8825639382686712,11.473700958253387,5.451746644915598,7.5145789115039205,7.79568004708574,11.223900090749893,9.704280229474309,19.79685636266546,8.08077803930902,4.031907213852449,13.732121846625096,3.68525604889253,8.499172327999265,17.67472760534984,5.902777786569765,16.094073350165488,14.122716813958288,17.928417968104842,21.439742664290417,16.408963120865298,8.989457304291902,3.5806733695369246,19.929148592571675,9.117796933424327,7.7015037806127555,6.316654709565128,6.4047864788381705,22.050787484089874,19.3251956552091,7.72287303857293,17.058444337500692,7.70675961298191,17.373428502873143,9.242511018328674,11.172703599416945,11.609351333998847,13.961794401315466,7.077079561007802,22.329768011493847,14.395152266813467,12.912634015237948,18.489691393709037,20.079829461067302,21.906883289416065,16.901331551757973,9.301839213781943,17.554586043116135,7.425391069310157,13.423416468445485,12.901651819341026,7.438491692918079,21.542943557199024,19.694826689149227,22.24168393344692,13.895408519458352,13.901025238530877,20.951885031280284,8.523216145769606,22.507867323491382],"x":[11.644016537879137,18.656480799696585,16.447894604064192,2.3147226393285,8.25083872596903,14.301910668823927,2.9587906465098945,7.066960599067654,10.082808436295068,6.811813146169464,11.508797873273432,18.48558108210036,4.787489787698746,8.286531820978231,10.03378164877941,5.924622179669235,8.02769965183905,14.01870973190635,20.411835807479502,11.060582952353672,4.587944822121825,19.09282485984309,5.750861172537477,22.864100258206705,2.2034149937964838,16.399769578719084,15.412504349949483,20.089311267283893,14.244255340676206,21.429847643423926,6.202390857625301,2.637904461197441,5.327168245990384,8.077750648368966,14.551280993103381,8.580027225663457,20.999908712133937,9.36041110599968,2.669355734925307,18.982353164100793,13.447358485905653,5.529948027105041,17.11803818399186,5.7723549658991296,9.536218243372417,19.62318130066374,0.9347560223756932,9.867289086882481,11.322415273755787,12.628943742725658,11.392451027721622,16.58776628965523,19.875964099561795,14.45396911842519,2.8284389219656876,14.858801738412225,11.081094941913332,9.034992147074812,3.019336520636539,14.277852810886223,7.299595450435489,9.665945044851878,17.7376851726437,21.499727702502792,14.73956880268636,15.535067144571594,17.270775640578464,3.5764358786895403,3.7683250982770216,13.610773763417594,14.393438594233102,11.830217128145502,14.077795949602306,15.615712835404251,11.394009093701477,11.55877884143305,12.006852990383946,16.220626024843515,9.90308971322916,5.419665935849332,15.399434698167266,22.619771780839734,4.698568424008188,14.698665640213907,20.734194559436055,19.254569686808438,19.69277422516395,6.765159540917598,14.14612890751883,14.09960737828932,13.755124163524517,14.064708422768211,13.626933640180646,10.05596150568811,7.745130008217275,6.206627830266598,14.547934924045132,11.333904500519887,17.134706740169296,12.22163919200782,18.805603207922374,7.133143803028852,10.578550519854183,14.111003511333154,18.22613482630823,11.179660642846311,16.28970986820845,8.57434198485989,15.752211505972152,16.265942291412316,18.38477351446985,8.77746212383464,3.52161138685294,20.19660240960763,16.674709458893794,16.041092958271353,12.428401664547529,18.92194847276446,12.056169803740893,6.819384087380183,9.130449683779903,6.727479680647401,19.02659745753855,6.725700169910802,11.726658637511548,6.431696324267485,18.098635460588174,20.71301541094027,4.36692857481488,8.588525114485677,6.636469077110588,7.676228626827179,20.096555146816137,5.139570027286548,15.748916145765463,9.827425849024715,5.961363452682809,1.2364473010177999,10.867656643875621,3.6822612344211776,17.103801431064376,6.936290784663823,2.828772091162538,7.164497743521721,18.052249619066338,8.344025803463374,6.107484424085973,15.128569196781472,5.07978562699373,5.531033822303676,16.432582731163485,5.8951832792786,8.883650569713039,17.829299554501528,10.949533055617994,9.707617408809114,7.753737067441532,4.135707853142055,10.880074344394837,6.566355109715586,8.69671068014079,11.23505541195252,15.581270926082855,9.949349673660903,3.8308238149769513,13.749709608195419,15.881039054526008,15.339629556102148,14.335963614661203,18.62306553211094,6.0934543514891155,13.259105862288179,5.491220465141418,4.294541401121211,16.476713080480515,11.04111743170138,13.86678832181609,15.745389633456691,9.063041087183871,9.249112939099087,8.197789600735879,5.243566309710892,20.684445603494705,18.033461508583684,20.37235780670098,14.465578805980652,11.450289295761118,6.650044938108815,15.410060618096937,3.2608708780988156,16.61319173792847,14.607832979269078,11.174670130246879,8.706206295098045,9.396019995570217,6.37688656461046,18.343176227562815,1.5546956817288633,4.472086558988654,9.430601418371669,13.471818014349722,20.677024073532877,15.050454352500092,21.17889036667265,3.6853919484295825,16.87973655301765,19.271635828645255,3.464082809806497,8.025385639903778,18.719971197329524,15.728031635501146,17.921823328196805,16.67024000376579,4.957911714000763,6.153825244722762,14.450551589898048,18.17617597582305,9.775516578258683,2.5807845450247577,6.841316379502422,15.645819663305485,15.039790415130556,19.448432234135893,6.468040664534258,18.164666539122646,7.583534091424179,16.228623213110158,2.6883329378119556,4.772905053017105,8.627879723793598,11.43726382938596,14.512914197087579,1.7542933003261172,0.47593011523245726,20.503837680830078,3.825295977966209,10.731729168460701,10.372708374224327,13.013999565658803,19.83236242732238,11.038867752640902,4.1462090044985,20.573965782341123,14.437887093305111,18.967410154182645,12.375410558271696,5.643734717444681,12.393425035652438,12.842316795864265,7.933957080348154,9.912637533567413,5.30489367187765,11.054191220946192,20.477220620501704,19.6995414963306,19.96761437056724,15.453029410485858,20.066491473753455,4.253714387325774,7.880407887476972,11.114078016015778,13.279293713247123,13.97343165582381,21.14573975355335,16.928174866861266,17.420897214265352,15.48843854001506,20.182864052625558,17.905107704939127,8.348448839008816,12.313252835849854,9.165395361758211,22.459824715913896,10.418265481840061,6.995968183967215,10.368090413621143,6.857185810712054,16.922400640261536,7.410006854799009,12.307200689134705,14.97660923994696,13.200259284381797,3.7782409575658966,8.753334404744555,16.631616785727303,22.948267034277748,12.227175401249326,18.919058168927926,7.549949711673527,11.962300353211194,17.3590801200607,16.850310399497896,14.986233591265043,5.556658224198894,11.739788943663955,2.036461081593692,18.812024014950882,21.521235084249874,10.682461356426803,14.026169805966587,5.105397660013329,3.048498187893556,20.87995241436835,5.629358747735004,5.222015775978629,3.7124736788860857,11.573714911180838,1.4822113931421321,13.057919307574892,10.366300704965438,10.191289287146018,6.208850580213811,8.851905696749338,15.982925340741172,14.508578525970936,8.097696216812679,14.127375514247209,21.725105659809373,10.742407589580218,10.768510040780225,4.2256535815167835,7.87638021248914,14.582383307290108,10.167990008669772,5.965235350914552,19.952694678970605,11.556300434441638,9.78669365291857,14.81954006996114,11.648484730837929,9.790843301572146,13.36017848806533,5.615924243490148,2.653093443837496,21.660882747397302,14.941365233389186,11.464781727219188,19.253334271025754,3.985246767406614,21.032171967325198,2.1478314536485557,5.879179314636249,12.949544680280969,10.84770266581554,5.420334339221206,6.267586987141503,17.395407551847395,14.868961233681787,13.73162791075606,5.738115078160737,21.00671866221747,5.336679698971057,17.160653297372455,4.703781360927197,7.033752637092758,9.65266192831572,9.401759996041323,17.95499845223785,13.707241877083973,4.517477557158758,5.607206584934927,17.559813633856784,14.563990211668667,6.404266252783585,21.51285924978786,11.398764177400809,19.24023521230862,10.32443159592934,12.851847965514697,12.627645094209305,20.127029404264555,11.723413810051962,7.273446063254211,3.7882155591739517,6.578755449056066,16.81274195940233,14.234464141174254,13.081465602477511,13.946061414782353,14.276263309032041,20.102002637506512,12.235951645436641,4.694346807645569,15.086484756824778,10.099486269732381,8.174341493248074,20.124281169057713,18.178208474396786,18.517730107170653,17.268348312553037,16.5604103789677,10.776604576650579,3.770978298483426,18.839368391664525,5.9862902102935625,14.828352940141032,9.28509051413253,5.1524345492748065,9.818589794399166,11.747131437298075,4.344420463738973,8.740841884086429,13.102855753780275,13.649079547674884,14.607959965446135,14.715254874936647,10.134723712199225,23.29212841137147,17.46195080095579,6.504296642649017,13.861742657556697,10.955812007554453,15.331899144659985,17.22227951498237,18.174421443826226,13.115869075448856,1.6054427947945022,11.02587093930512,10.436370794793149,10.488382918110197,19.866775870659712,10.061287541234556,13.334751562246206,20.22873031191898,9.61007594286756,13.700702970085102,5.831000492471242,6.685167803476599,3.905584763311001,16.87306123897281,18.734555426416282,19.880706353518114,12.730351378257463,22.45303993084626,7.886574963687416,13.314745523937287,19.743897085163454,13.948731074508185,7.377495413776175,1.413411939195057,20.152818992056005,13.255388457212735,14.747948780244242,22.369634290462166,15.419844429178939,17.526461510326413,17.85365904868981,6.070362834805913,4.815644305553588,16.161603587322244,13.776601885667848,15.892323494218545,13.65421317468551,14.49501599483381,13.01550288320323,1.472339965699527,3.235152512140753,2.6488768137518077,20.811010492880623,7.536234849020413,10.777328121787201,13.056538335918423,21.50707983680281,12.625898471566217,21.564680104416453,1.4862692138885318,11.746315430207904,14.08041003738527,19.53109972130368,1.2676241029012707,19.064249982101778,13.296515352574321,18.13419121528464,10.276193950553864,16.339744772617735,7.439513852880955,12.81797882280038,9.640928152816906,10.216004823527994,10.183020353054346,11.025611999108865,19.227647559973974,7.862923841759668,18.337670864424947,13.424576735673956,18.47600493107983,5.630811809222787,0.7106668348198668,22.38529930200751,3.0010264347683284,12.087369561177294,18.842254130915514,11.029602179172958,2.346906930683929,4.629250441422216,19.81513342830987,11.7901858030596,13.882467210480272,21.043764394968154,16.721519816175494,6.655300753730354,10.49552575180406,16.347822458119474,13.288122908563418,3.302341510485603,10.442880022882704,17.764444777716754,14.812583471491651,19.921131192502862,18.338112993801232,18.832091221167378,18.219731292890856,16.9777557826674,12.023546077610987,13.636245710365936,10.468831843634547,22.168668288673572,13.559608932472159,11.518706181342178,15.92184536742512,2.150625798094039,15.796871500108034,6.114656441713478,8.493613057308862,4.912411061199734,10.095032994725935,8.622443561675766,16.69788290415157,9.716355221154162,15.682526804564727,12.944872029907293,3.518402965158912,6.050075484926831,18.342327796164483,9.481195335801038,2.8195337500363005,21.66889488540471,18.783571018312134,14.816102631232809,15.010608357277476,6.044876038784728,8.173969294901374,18.688918113350613,7.275343300776002,20.690416631423787,9.014206035449414,8.46450194067588,6.6730869885993185,12.60250613450629,13.430549224359188,5.1459379787796475,21.273331559388456,1.8299411036385422,0.7225421864595499,16.0155858383909,8.236827199090888,16.826576811587145,1.4398991909937788,4.981035779324419,19.318469819659125,13.280871332512445,2.6245414736827044,14.96234896662224,9.43469201853661,9.102316613650517,2.751282550547459,18.736973064159766,8.452201182085489,9.939312525122642,15.024171803252296,20.505076741170143,17.770912635255936,8.704635502095414,18.800296913776386,13.65621996042152,4.42616664180062,20.760556588953346,5.247243629895648,8.811125891192072,12.928797732692647,9.775211456964822,6.576165694684091,17.178417440221573,15.990005445474427,8.703078658960598,20.059902546494072,16.595370010903792,11.735701060078688,2.7396058305091042,12.555466483714726,16.477909016617417,14.816468579661873,4.512822005434689,11.03376941218266,7.413491543706373,10.026682963661944,13.535422249407723,18.06081843865601,6.082276261274208,23.12593844525329,20.618663968917197,19.125704281693846,14.002926420444066,11.367817613407588,5.722179263609954,13.91430052586367,9.0203209135726,21.77800307615573,16.075046936093532,20.790176602709117,19.45416220319018,19.448418617236896,6.2355343909507095,19.441968094825448,3.816619943191217,6.576398483692444,9.671391194622878,4.476083745713582,10.839636616173205,9.76422585885895,10.368278226091515,4.670098472699349,3.044411270699112,18.949144754625358,5.6713609711426844,8.321954096221228,9.696611905390135,2.8119995508767146,12.016267206156064,14.498626080391691,15.705570572086208,6.993209668589984,1.953632759398454,10.19467736319421,9.874742201886388,21.837186358966022,18.955166909128316,15.841863684317106,14.319010152344086,13.96026513333572,18.51415095884715,17.29960995869252,7.9196157637732965,17.41363024617941,16.32185319721197,5.810570636095848,14.736935789603205,14.792990911905191,9.581363935131401,8.147934050344057,7.146700501379351,14.475113263332824,8.848219309979108,7.456939164868186,17.31933748423309,8.270292893645836,6.46474263572348,5.60045482780194,17.9698365833595,13.517335805180062,4.707558389204481,6.607329963030011,11.958886463631938,7.610464815873534,16.397385376729268,20.108520058399435,15.066357341829235,6.8822539121951625,4.946325089203411,4.516399070805159,6.228480769592348,22.306499335676747,19.65821020102814,18.486054191484474,21.653114871076177,6.668511872413415,17.26270500374017,21.466189257720057,20.75755726034314,16.915276597869457,8.429681632622993,0.832948005267984,16.546955453830638,13.140877850602983,4.8487376991420135,7.090859430605623,8.09267185972101,5.8669850467131495,20.90427899280825,21.11783835774832,15.616046549535266,17.382514313467702,7.758681384143016,21.480195523516297,15.722715688132176,11.007070567284867,9.752562053311664,10.845247896054968,14.586935853951376,15.85515152339159,9.971101064959905,3.262753586998882,15.408228606690272,22.301302524382216,8.38742187222634,2.0090355346084894,14.982999464192002,17.071156728114165,3.7579266369728925,10.56230084634378,16.343323311292693,4.297993092182193,18.12827852443648,12.0081477423201,14.718415008886282,3.555966065402313,7.991542819661346,20.7254685414153,8.767818676789396,10.596651871179656,14.048202096132956,11.196817760222958,2.9585346781355684,19.889878092425278,23.26525423871407,6.462695710379535,18.77809332982831,9.295495634919995,18.96297280533684,9.317018742674913,4.362159879381244,3.176017572832554,13.256216244748558,4.498358748792233,9.216813874084394,20.022423916540777,16.71795501943499,6.453611159461787,15.930558390889797,7.719446756820783,14.04769181766083,0.8122623654315541,0.7512450349394492,3.4660980236748777,17.01434073158495,14.66305108405626,16.99247627014024,2.7187222267182136,17.930797145839627,2.0480684421997637,10.375472127970792,15.754005600059237,8.198910045424135,7.536574500817699,22.999132229146994,16.515735369828057,16.33869394142987,15.179170683611975,19.091193316295545,10.395954186096493,12.872069611418036,7.561277545354574,20.730814469208408,4.38693221431641,2.3831763373630963,14.830843091860878,3.6669969936223965,13.303056698086433,9.377038871043673,15.51992431822778,13.009039113274229,4.770848156344298,1.5895455365796716,6.223579936518759,7.799538513530987,12.511898571866167,6.17111942803413,4.456393464490436,11.27242065968658,13.717172656482301,2.7937575661075726,18.243178846892317,9.683657005573117,8.931888043110508,12.985355168445228,14.329247959039392,10.483155283637892,11.669034341644517,19.179571719460764,19.658787373073896,4.481307284988262,9.947685833371112,9.602782780996064,16.542698622593353,16.47401834992151,1.4717165853509642,14.529814375143172,10.207693400394206,15.180721265375018,13.728121642571685,3.520337862625445,2.742090206422903,12.305991421390335,15.804916193802375,16.218758437193166,15.820253650224306,12.294094732151677,2.2946109734254057,9.562515415677552,21.45050981242782,2.226266843015454,22.185314810379843,18.737487035348423,18.85424412993685,21.51113366063222,19.10746309271519,16.11050823901239,3.108232155413854,17.75846366977579,5.9420627684546625,21.82718486477323,13.362569062593302,15.752078669917022,11.780282089997542,7.114149059529495,7.542071259545798,15.706153949589817,5.293952937315503,4.592992494385318,2.621804111502237,23.511372733486823,20.58601354994192,13.714733948301465,11.787554235063508,4.532770567681489,11.955326419881779,17.336435958020953,21.872950447269744,2.1179040699287226,2.8961823207155444,6.629560560879725,1.4222479741126381,3.2586216953928506,7.021187202632624,17.596704728038773,10.576226443132317,5.3677538062204215,16.516839913110452,8.667628511806729,2.140937798372887,20.82843008425902,5.894432311912558,4.337755461652234,14.072571108304986,3.5497779910171463,16.030504424347424,22.340773478147227,6.85839768346867,6.800706795214788,1.7738013516469913,20.148412547643424,13.615526151150961,20.21019821494919,12.157415659996346,16.81724430996236,3.0571198996498294,8.101285768913321,18.54817966396206,1.3672859734766738,6.971768660972277,20.239255644991736,11.522393517768352,15.790637043988117,12.063203686411056,17.078898045603573,3.4194676147151837,9.432046648405066,18.853841008550724,20.0128170594811,13.788295350672392,9.058086155007986,6.766132605413187,0.7220655845484625,14.863951017813495,10.682642372331081,10.3169916758115,6.49359202100665,3.1621307365057088,23.024207620913387,12.897390312218505,14.606832636104265,15.650416611000438,14.721397928856586,4.256452049057323,5.677908195640615,6.525880384220753,14.251937199134186,5.601630169942971,14.151563342868437,9.711353775243188,1.6708450423473191,4.076465388395414,21.023045369292294,5.882885932076895,12.429022348347049,18.116898073836225,19.65382796089462,4.47264090456256,12.97331654665987,13.887712195774474,15.901711674105291,6.1488412089802615,12.796411829980535,14.21706392148187,2.047612635003814,20.073208955919455,5.385970887993658,16.83682148853369,20.03238404897094,20.855170637394718,14.919639301966317,12.1174534712613,10.682175121782377,22.51796948017986,6.7327787601621285,19.476127754175383,0.9695964300154911,7.697102429614532,15.18018354803696,7.858018776355272,4.6773563264807905,15.111473082211104,1.3372533048190198,2.0700618346649,15.347217060118828,14.374086196451124,11.6000929047606,18.616199695888472,19.121761793874136,8.8638048602665,12.051200265991444,1.6820831436093637,10.86792715825578,5.025178790044613,6.744113577314492,7.646290994575104,10.903769799229922,9.243320450208609,19.664699137751185,7.6923482429292545,3.6509095585681894,13.000461065890677,3.1430180653122948,7.934805510424219,17.61933358971836,5.649163764541208,15.644621396164792,13.580211176931948,17.23796040153406,21.033226228017057,15.576596681666143,8.499817578391536,3.120233087136331,18.96784573395155,8.886308546814275,6.910256194544622,5.832456038437868,5.825886424754909,21.197575042082114,19.183004939863604,7.219219048467034,16.767265735983443,7.633871035443331,16.643720341584476,8.863391381920698,10.783539165394956,11.038648037345508,13.943265705369312,6.860139184315698,21.35390250933387,14.352252030118116,12.72499139272095,17.640537036625375,19.945062802377908,21.18243957826504,16.235913440352622,9.100091008404556,17.221413434872005,6.616747495618028,12.514814873254192,12.900735123566701,6.592623048016563,20.61359705935369,18.733214366302334,21.22946372083046,13.783363327790939,13.313082669115985,20.008107871902094,7.632984105152202,21.64424524963487],"b":[24.60124610641705,22.247989126951595,25.047655664940258,9.28304160122047,23.877651536237998,15.288730410258697,11.624113425633723,8.758656687786006,14.31420113091599,21.134958913089022,20.414665387649485,27.395046793107603,10.440825305411954,22.092835044066625,23.766292780664646,16.87667867195145,23.95409708830439,15.516299343481128,27.503376157882105,17.47156219735123,16.90070749500546,33.93430823018207,18.87116864842411,37.613759042056884,5.708347206637043,25.486110556428724,28.351850742194365,28.39505447907588,17.181094780593842,28.130225774257802,11.903532468082162,4.827053453263028,15.585450169602261,20.54174575438666,29.58883557189337,18.115615433911845,29.27826806183625,15.67523854879898,13.448365124569897,24.123403109882567,20.157540917736743,6.409357444070545,22.127104137885397,6.39801716552558,15.749406299827031,20.025522648310428,2.81248253555614,25.213964978004686,24.281510569024,13.068889300460222,25.032192394694764,19.29296711762817,22.605054027327068,15.311381550304763,12.521645114807432,29.320597995519645,18.168933411114896,18.51588181838693,13.029082608722021,19.973978521566128,8.013342273931073,15.716250228878152,24.059314405367857,29.395098812301715,16.96347166076872,29.55365623314178,25.40994946148669,18.874558765022986,4.786997891127585,25.73190066495854,15.812600817141265,26.231790367399412,29.15975889972753,17.810908355257105,23.060711964027416,19.892951710982004,15.224604238098465,29.806857075960064,25.936676509044233,21.49928646010681,22.667745797925377,34.25227596025654,5.450567221420819,25.69818109109675,35.84359012118131,21.060978810595472,25.465137711986202,6.866131230564068,27.994040042506683,21.80245310418386,18.702865081956155,29.24458843808855,29.84131823207789,19.773611341523072,22.660736381955882,15.396988278485814,22.460764576209094,17.92816948452561,23.417234308479422,25.833514409762138,31.533758364252318,12.185878374333443,18.275809003810952,20.230989986514793,34.07158975853223,13.505889301200469,30.534838005885252,11.169264092069223,28.979725685077955,19.879552955850798,26.05095654169119,23.898581085072326,7.5588076415231775,23.95209560987646,23.857746905664825,30.462261431952694,27.22779393227836,21.236737053080418,16.74046339831165,10.580856908490999,18.79024747325936,16.46782378140209,31.9565222250435,17.984388659165106,23.113979680786144,16.56982482271499,21.92156275814068,25.560396813073528,12.06836675504146,16.08168653765603,20.880958087216914,9.075872182060625,25.60179165083391,19.908457099807457,18.0510234231469,10.923322883035572,16.724075757747233,1.680304687592078,12.24358456471113,5.722613416086548,17.538378868732607,20.052634653342334,7.202318687111151,11.597063398590093,33.896569100356224,18.21276984213055,17.23821776173179,16.897670345540323,11.501976491031964,8.930678484495878,32.21346611126705,19.635106176363898,14.282709136752256,25.69668891889355,22.343650976192087,15.642289100090427,17.466397446495204,20.161240895604198,12.900187833821818,8.696118936834,11.458311047991536,11.57034907350432,23.565255111259656,21.97062377025492,11.97497400406081,25.203815902379592,31.238385282894857,17.162537886565854,27.537489520448,25.03077003885588,9.636131101336058,19.05904917739236,10.421506681969275,16.88533110924247,22.667022204533254,18.984015766344108,25.527540181831917,25.36673149389611,13.442021657252848,13.218856917768885,22.005518756490016,9.454542781606424,29.745998547537933,18.051866041647877,30.878393372126773,28.328878368922123,11.976172890219173,20.982801767494543,31.48365121774063,6.6621448803639405,24.967935586237733,25.10424061444605,15.43336950695041,22.315810418396964,25.416429358562596,13.095443325955227,20.947003726751053,4.016639044089683,7.059581455921897,19.97795407973362,14.106840246831705,36.77881513546536,21.028286047301393,26.68473510242466,5.4719397456006424,24.739724880438146,27.347316502470207,9.827797314634136,22.111259017700473,33.26498428214523,20.65119908591463,18.760810231086555,25.81212502966973,20.457629377110692,21.520735286675507,23.640817105286843,33.400932966192954,21.440938833119493,6.8586932464933925,20.875296837484065,27.81179101550784,15.998210099647032,30.191327308036872,8.987770122094352,25.262392170939076,22.524039258589468,22.779856845380504,6.394966113953275,16.460723178384363,21.875640738995177,19.41497518699885,30.40739102969421,9.030498027973643,1.7326663347752413,28.617271674934763,10.108200564753705,12.63445728720134,26.184400550070485,22.239372982241203,35.081194136185786,24.503568027651724,17.614199103654663,23.0956232777285,15.818638188525998,27.266321207329824,22.54277656478908,8.17545497109213,17.91214491279451,28.359305153958285,20.783894688537398,25.18021014617358,15.512106284115553,18.01151451776274,34.35761074147356,20.63408050532012,24.81879559755845,22.969876565728,29.952713742218922,17.626891320695705,16.908758188547104,24.104794374986103,23.40768700155335,20.87140469896026,36.35344651729585,21.13461279908391,20.30749304253308,29.013455056053193,28.637828381342874,29.304012562958256,10.87066976092807,28.362239190308905,22.840112880744194,36.48005896372119,22.41697581727578,19.863894394665863,21.907373940297056,7.667956373462594,30.36766849455941,21.26467614569852,23.597615768360107,28.598037877243925,19.390120647525457,11.58729728787662,14.511591168631268,24.402618835638165,36.22969096689252,22.63889699458587,29.222723014411297,19.11122502790931,26.56011945014718,27.61351644070221,25.70955189396571,30.149918570945037,8.962546172083115,20.54024171148502,10.148119678668621,24.313915709822734,34.60422093538011,17.33205424618117,24.563138309886174,12.009499733076932,16.10164812908716,32.26540571882478,15.029393341393806,7.688636115734782,10.92158007916011,21.09020786151026,5.350981880367081,23.548214864879725,13.477590898019356,10.462616305613324,19.130400794176037,18.917905403551817,21.447272921101842,16.17538784947769,21.56740128239779,24.938187326941136,36.42214557800515,10.751661842497807,17.689984361320814,11.771624261348682,11.943067718092578,17.96173167583546,23.812570906295853,18.7841920887289,28.983284913797416,19.462095642630803,11.142799218652307,24.886289286628735,15.332424503602489,11.970432083097542,18.14652627720969,8.667675311146974,3.2283494644758814,35.45397943263629,29.795704305962644,27.644276888380052,32.86651027246123,4.296345936201642,31.104234813371626,10.817581244838603,6.014502974464411,24.313136304963425,19.01179771376374,10.693075267813734,7.436857099353431,21.340356964681988,18.900781180797225,14.225480405100576,7.393451740131094,26.386818133160123,16.76565685608861,29.832126895213896,9.119503022059137,22.087300595857393,22.55346034258357,24.475816852302007,28.9271011565255,26.925449383587317,14.068068700449615,18.43640737470681,22.939692111810345,29.756576971694386,14.264900881216178,29.68277590330617,19.633775244944076,31.961241369980492,24.79706798357134,17.847208851790896,19.01419344609758,25.596629765451173,23.695570372810426,7.817878460707677,15.060203978835647,12.569422520482805,25.707061808013936,17.54969527112131,13.363555954767737,29.761269822687893,17.549846444848246,32.83163199742225,19.950133185941077,20.506669598773964,30.092247684938712,21.985089565365595,13.85509526759012,24.063510569580433,22.872371779540785,19.312809115841,29.748777603670224,19.585024989051433,18.49868501955532,11.350076294434782,31.139159736433914,20.086960074952053,16.150950087720783,11.154012944212202,19.65660822293709,12.691904896880079,15.944907091066538,7.870083589969958,12.389178355479714,23.864929675876887,16.225166831507863,25.007791706522273,26.908096028708226,19.745520276594366,37.76634467434735,19.17951135446318,20.633702978236645,24.773834888458616,26.59268416027161,23.15504971831716,18.477728987229682,30.299974548353802,27.55227055017693,3.889303866230618,15.470053519345402,22.254244309911556,12.939032790213925,34.94916560647252,15.630817131276874,18.292498122231763,35.415352352382904,9.65984369121852,18.277383040617572,17.209987589506333,10.242820935935972,17.65557490442301,17.980648371034384,22.67053841284575,23.627061477776405,13.02917599522521,35.76411845052495,22.206942330105832,26.812836708360877,22.26024309419598,24.813513154325,18.26016939219419,3.9127429063790498,25.641773080669257,20.848155227991498,21.695256967413243,35.41301378254232,16.503911579680967,30.51224357903446,32.96468126233193,15.56674666758699,8.21705173306841,18.728471263408217,23.614734446992607,24.681113394806367,26.44954682441788,28.841973393603038,14.94170956194731,4.303766391562864,3.2750743563075613,4.224994552889028,27.77731149748771,19.98951464038865,11.60071582671443,22.572335063686204,29.32461863400354,23.86855590629186,34.953161688937506,5.380914441028257,16.98618333270744,21.122637945844556,21.37009813782512,6.2533783886489225,33.10956360139576,19.795418303701947,30.637669738013784,23.098792355220652,26.524130040299028,8.229887692686146,28.11698393262068,22.086612511222,14.969987678109206,21.559428339585374,22.848346924984124,29.652525528470782,17.75808383445733,32.3244078798598,25.6784205212983,27.227921841537153,16.702388064232665,1.9576114599402628,33.27539472026096,5.923853800599699,12.509346151888865,21.930878749004552,18.13068642398263,11.977312542218668,17.6847146472981,25.880160181217626,17.827182757148815,28.035842886037248,34.07489973610623,24.74737858936067,14.794919105917938,17.922864289264943,16.580594011755164,22.088218144440276,9.126773129622642,24.891602417785197,18.526538188276007,25.977458650177326,32.11609818601425,21.62637556986428,33.22020208218674,33.81808045262715,18.368590843114845,22.54854693286969,26.838417687608615,26.503737721150095,31.650734028848426,25.71838156743472,21.445576906198152,29.171668454086202,10.410540242744876,30.130092518953884,14.441979460432016,11.242470177378294,5.803429685963368,14.747074150048327,24.831072222527716,22.37354548757663,23.136344478393596,23.013243797569405,22.04497809888267,4.138141967562032,16.87574193767059,32.23465918331203,13.661931530193504,11.20537112818182,31.425746714792083,34.43159972597505,19.865981930953254,20.88821753322102,16.521129551620263,19.762297389803877,32.12202982292131,8.523466714802472,35.526236110685545,17.52804897967835,8.663589209836351,6.725413375771838,13.537283092864456,15.086306227110015,8.028792482309925,29.30759716071526,9.584649168896416,2.8847305301130177,20.350979587421655,11.411579056553173,22.461163112879994,2.7471669694100997,5.9925376737029,34.101892035879004,28.99961254053957,8.191002646020662,16.097470301637344,21.4955203937754,10.113270683957575,7.187559822158129,27.974950852820953,20.531511351525637,24.84986079796949,19.369106605035267,28.9715126299256,29.36395843030833,24.054116993732023,34.29364427674992,23.0519939264391,4.592792188306354,36.01863312528137,8.914611522473535,21.237100673790405,27.415187413491,15.540815504615262,12.454719443507539,17.81683057459132,26.14595946943572,11.079245401939382,26.645527377051867,28.1850860075163,26.469055238963257,12.156965681354912,13.20803444394981,22.9174717076512,19.076423025257498,15.635390484404944,20.694028994617184,13.714983794251072,23.641792486003858,21.63823619814906,24.375993699663066,18.923187273551996,36.82357003455731,28.027674065770704,29.34535516690191,17.694747654934805,25.89870711040767,17.948808438762338,14.934031729342532,17.549224826883094,36.37416031243255,18.107903123257802,32.102451510954154,29.655349350622885,23.12728356649017,6.536824246586579,25.64486559179009,5.836570898273026,11.323689624775897,14.119587408315603,8.78886266369185,25.19758750212737,16.182316110730362,23.812253113647138,11.91183328207693,4.514916248604521,34.47450709324491,6.305995947710983,12.502984743060548,21.974374835661983,6.716189542965045,18.81283311523715,30.02328474697462,26.729252799948362,16.800704327208564,2.7072013563280706,15.318991814696695,24.425311598012733,36.98164075570135,31.216296095733373,30.84906287375898,27.807466838672283,23.696079837620157,27.150095143288667,24.617407519210765,9.567297152069276,19.343212159033015,29.770821794760934,20.3628978136367,28.16610429726505,19.251400741161397,11.103605937584188,15.620538847083491,18.51158051725596,21.067850015422643,19.46943791040679,9.87773749170536,33.41441965257458,19.88739524636332,8.858168035928188,17.399427145733675,28.471441193942066,21.55564164044864,8.266944498042621,20.113109707481193,22.115658286427138,10.518605434986235,21.060901699770362,22.70332094433317,26.673230530560936,22.11505891822345,14.728006252900261,9.514772085737127,20.56341046998309,38.282458632124246,28.75461192009529,28.68116583391332,35.932674894195515,12.540007783871614,24.423526470179254,29.586842859445166,26.914426502407462,28.882929530542935,24.51433259437799,1.3847927131899773,25.133261777190484,22.32167577350885,9.535893423630238,10.01066119831011,14.576512648256262,18.055562020298396,26.96700908468022,34.33962943469969,23.69622703628135,20.837475426393162,22.863980975908078,32.44732363522848,31.1939064113987,26.767515649025672,13.769585198130226,16.677868614594257,15.266434108980897,21.7435756073332,21.93413986149031,11.323100173997211,25.86417484143994,38.38074493462399,19.62008223837201,3.863470039413146,25.593379023781928,23.498345649579015,17.42368538644035,18.873532109514166,21.388841203924525,10.25751677195586,31.43398555561673,14.695599655684584,20.406724591292324,4.330527806894264,20.35888553132362,26.360159061863644,19.619374406012273,22.771508019533222,14.178968688323913,15.485465833020529,5.5194109971866245,35.94483946185258,38.32679192409043,13.360102300033926,31.270364594173877,15.182615172361974,27.015853284617624,21.36995239174636,6.556105844067637,3.4260626137992567,17.077607188423535,9.054759518729632,15.722903425244183,22.97748912893016,20.469204588730207,7.611469711306302,31.80911160899534,20.061265575566047,22.64566173524459,1.660760532258072,3.803420480639277,16.174992754299932,18.196196073983405,15.13494224670624,28.28990378658056,13.137652686047403,28.310945009252297,4.439989266538711,26.564015501422624,26.900304361207482,13.221655075485446,11.350439931085639,36.256073498326074,24.081172234043805,22.57651267322599,25.511513505531546,33.7107633089433,11.991596771477505,22.800284393126883,9.097772838221179,30.54997077024211,17.333017563233916,9.890290637538724,22.64942496434739,16.979876275769442,18.150868187337856,25.527133787412538,15.74058832957299,15.395638735833582,5.18710713214015,4.445957531431359,17.030043017931334,11.804861214278827,26.07849820316553,18.791406928219985,11.147488934536197,12.584725876208879,14.212692262657688,12.289786154955223,30.557232693216278,9.891753161201304,22.684063125812234,21.00970129297185,25.32225919836399,17.681458343426574,14.290338728306592,31.716947709163048,30.15864634705921,17.96300599771031,9.97673900579863,22.365745487862046,21.5859271294582,30.39580259812691,3.3033374715849373,24.48080302202762,22.894189357312293,22.066188482593446,22.203721446871967,13.661704585575439,10.751301428457431,14.239361428237455,21.473636202483824,30.77999996947808,24.15402328126794,27.519368933570632,10.98040709210197,11.57182219324988,28.69854000357198,4.0013965275755,37.04178476596051,19.96815686189222,26.422702811298457,36.11265581061103,25.105016948953594,29.0442072748632,12.515270468749181,33.71439260366468,16.379098968830924,33.637312259039966,18.320186446874978,25.775490534801854,27.33529256256651,22.166611020081188,13.905234797983681,29.313005635560373,11.099804412575317,8.636296522508315,10.323253814942,38.966221195549124,23.45852507440129,18.10271250794625,19.151132174794775,6.430014617510862,16.02687666582593,26.509069537246887,31.354361871719533,3.906671209305772,9.63832904829934,20.38500351092617,4.391527316713533,10.690176211985202,10.150205720307316,32.30435265739343,15.583630782484402,17.4667955644373,32.65815231019181,24.060980983041617,3.299493846853938,36.06311264970368,6.394884880671761,15.571040055589105,14.559290900648696,6.852620709840909,31.590381830490248,37.92472440396931,12.050225760438158,14.818126048314138,2.2325351383929215,33.969208177288934,19.217290040067404,32.53125940351431,14.659791495369934,17.041091948640464,10.361719249668763,8.626583778269774,20.54613399655619,2.800694007506528,22.70626992506741,30.18884440746915,15.556951571900944,23.956785602749015,22.94024800971745,22.80969927712376,7.869229637344892,21.2084343302544,19.28925063150937,25.450128967584057,20.028652969573542,22.83097770405645,11.646204463942436,1.882241762102197,19.258902587513255,26.500531634764826,16.93871090125733,15.790493261925299,15.48543550389439,36.387490094481905,27.259330752037933,16.458006622203648,23.899492545225883,24.051203089286403,6.02668819567298,13.707725039675783,9.036742015167366,15.885159855202806,13.630326446989283,27.704566732205237,24.421532202640957,8.299653045451612,18.389437163592213,32.98735456307936,9.785572224949188,16.483128795772828,33.70555449237257,24.092386306223155,19.59170486123938,15.06149553241987,18.174368758494268,26.305397924670906,9.428905262042884,18.721822172312606,28.752352186305657,9.581537226276122,35.41863680422589,16.15602758267628,32.70265491734896,34.74613796700423,29.942327343466417,19.938121464434673,21.369578523014788,23.362783939804665,34.52057396413975,18.320585452811432,23.70410768948208,1.0534241936338606,11.45361373920748,23.42707584569863,20.60221781027567,7.27346432690926,17.522744632940864,6.87472101655815,10.660273241195238,28.964521010035536,25.627719748256844,25.926285290788677,23.950329586440745,33.33606702025311,11.238394229106792,18.115874916603847,4.7437249295586215,20.118999721379403,11.539508360790421,18.51027235470938,9.92768541096888,15.792638476807053,16.28286617946479,21.682937756568638,13.6242525808236,9.469313978549,24.174016234820947,11.423803620254432,16.553531479798483,18.465283114395213,9.52222945477259,22.50842541032742,21.86508420058219,27.78228082300045,27.241340626629405,28.288077977441304,15.977349016875912,10.151845321752377,33.64837912821203,12.421482669660865,18.993791062083677,13.226894427130173,14.666556666917247,34.22740600011441,21.354469974285397,14.910769275952607,21.213998776394885,8.74698870384516,27.787456089171524,14.65311564290574,16.72666251958852,19.754141525797397,14.226226623617364,10.17314342229687,36.25682926576786,15.007402851506294,15.590575075683851,30.60839496429505,22.003151380375556,32.245779293160595,26.397843905902477,12.181088052901273,22.3094578087353,18.965945130047004,26.390521099105698,12.914734440022162,19.510303233072275,34.8061089967897,33.41847374246817,36.68758131656064,15.494461098061661,22.29184565395952,34.420997608732584,21.228159739690636,34.833046865672856],"a":[8.643977637621498,17.824924591220757,14.456757719510227,0.7013200331232472,4.632700599306099,14.073428368947493,0.9524739965538709,6.675275474811464,9.103097255059804,3.4955182354767667,9.44678694398156,16.422737048030402,3.478550528759494,5.089903520234822,6.854238724425286,3.3888489774681574,4.340197505054828,13.671966852374808,18.769903263071,9.576223427657276,1.7371219056255427,15.656517182107939,2.7130641957380197,19.449053092219785,1.3919040974533647,14.295972910616221,12.41660601263051,18.166249504804178,13.564277223675232,19.87848244358627,4.882382863881154,2.131042087576809,2.9520274292086635,5.1919122850919575,11.069576168589116,6.372214559362814,19.083187244165003,7.898313990516521,0.17364881670443477,17.79202542128122,11.893723257260845,5.326334866884781,15.958269219789397,5.627492908206042,8.097654099287155,19.530025608103273,0.49999853399524063,6.3140121753730805,8.321944394367229,12.527081397830262,8.234387456035588,15.961420381836007,19.244087053447146,14.255449007656367,0.584132336755987,11.510404528234663,9.440019508783791,6.839844050598143,0.7017401944222845,12.959006168368514,7.1343388094154525,8.265093820097555,16.27401321168466,19.67168102508023,14.22465972823102,12.289287453011845,15.386280351711047,0.03440063750173028,3.5324677347086286,10.804321039304483,14.064854319949767,8.495763592832674,10.585809078235503,15.107450485154562,8.692770973037792,9.629134647211984,11.261834245178107,13.074951909428645,6.190769587721792,1.696687438093436,13.716573719042913,19.92645181910984,4.524455151317333,12.151904076556818,17.235856106385803,18.836324597263967,18.356275947095114,6.741781163992049,10.939866961435065,12.316136868784833,12.60955402870701,10.550050423825056,9.872752681810951,7.805995386589952,4.291660336675762,4.078747120412198,12.715846000866264,9.807108099639548,15.680088143101543,9.070027580689906,15.858602817482165,5.963264070142338,8.79637364669918,12.694018700075596,14.557373619485272,10.641059668846275,12.99147868953471,7.973529347900108,12.689592534754471,15.429268640894861,16.60979166541752,5.276409305469296,2.586863279788889,19.327078131222027,15.011592227827242,12.702102460390176,9.001839507219437,18.385996265536285,10.971596675696386,5.948475323596689,6.8938782790848485,4.472259068124411,16.032880546470757,4.118931241801338,9.090106902525111,4.084375107932421,17.213497897434813,19.590681914118065,2.583783959957504,6.853603645624369,3.3383858781854103,7.352163587307388,18.821905841591597,1.72007085914188,15.215900091046457,9.573688449735855,3.4694298632775356,1.1336792348315816,10.54908257951852,3.2098503781618515,17.003181988359998,3.8994115176067767,1.8161474517261489,6.138208186575049,14.383751307714485,6.059076242596095,3.530341461178663,14.71896217109026,3.592830231545876,4.743900571350501,12.778772032640674,2.7139242794469087,7.633585064567048,16.007731601892306,8.311407612595367,8.333539266570043,5.504926177117846,0.42525244518283767,10.412349433050228,6.07324241954367,8.057306362520684,11.157423536840291,13.732707310853574,7.166016266648416,1.945176327791991,11.09769481842305,12.325291597391907,14.917564339609118,11.27936181173518,17.139464220587662,5.273204312361468,11.916221916876598,4.349691686813486,1.379345779285086,15.043446186616753,9.202066586867993,11.16692806224005,13.517722082973327,8.049158298105397,8.329982325793392,5.000831148130627,4.26858217773014,18.5863882074227,18.02920023383806,17.939853603773273,11.255753915964277,11.328529375398798,3.331524739894678,11.6884782527713,2.4733603795577475,14.678784663172578,12.177557969327623,10.18863652429486,5.555120519312822,5.686750893498416,4.821312394143891,17.74030168977636,0.9846721424957794,3.8729935735663235,6.988530903880328,13.324788791019433,16.948912343004277,13.666383202974215,19.904100235135402,3.2717454308362726,15.05988219193657,17.401841360670304,1.9906666784003324,4.764027349231621,15.352306464032118,14.588151093476508,17.727569353443776,14.553583001254307,1.3692004322890794,2.595863439788868,12.322692860219476,14.651127432345476,7.0745749635873745,1.5903033277034906,3.59197306296263,12.828983925158912,14.817883693395553,16.961087007086263,5.884637680831597,16.521301891906027,4.124299503203956,14.711790032257213,1.8301214151566336,2.0667780333663544,5.560572922081506,9.590152586873145,10.832802754681117,0.06960467813909244,0.18495297956868662,18.62530203644438,2.3705900883107756,10.291182958899325,6.7117643926791715,10.878012163972834,16.30173976851319,7.921332141214648,1.0279116870023763,19.990116392371412,14.118196300198061,17.045930268569332,10.021319865399052,5.057555457029714,11.115653871417406,9.249606761447563,4.958759914431048,6.377675718771454,2.9415771358899745,9.44333448481185,17.263438685605706,19.48316396238735,18.844401085181616,13.712623889866373,17.777495108820144,1.1573695392298955,5.790038031398281,8.106285785973357,10.934226528838522,12.376316519993654,17.624638916865244,15.954241561023327,16.752552200517034,12.356937669391836,18.22525253140707,15.265873923249483,7.764468996653111,8.597367189276861,5.999233622476643,19.213664114092246,7.640156352197436,4.016606045360227,7.696354200411779,6.669464877423854,13.809364294496715,4.202180165995997,9.693085977454583,11.822785687402968,11.767096062382315,1.9701790843610922,7.420102312347421,14.832365771426943,19.873166123400456,9.816508087419624,16.533409663731668,4.87312165195354,8.582409233888107,14.984829691030853,14.799094978053517,11.475325293340543,4.768079440476356,9.70218510993622,0.15833650194405635,17.538149146692103,18.49207933167954,9.142854665458007,11.586503576751564,3.5068634455055125,0.02625046222519689,18.24383312437954,3.4529313489939284,4.650909357566211,2.043320599323968,9.37032344589885,0.5864595739395329,10.629059451334374,9.64593131120119,10.128467863338777,3.2170726628381185,6.521284746440976,14.717743210649413,14.122655533452972,4.979001826317866,11.624305254521442,18.322241549082502,10.740264915592794,9.165953560714776,2.478504975408251,6.934803878793088,13.799949337934866,7.008805921202104,2.9972113091438457,17.86180620211974,9.725840224056231,9.472709137282935,12.488745582652484,10.79552750213097,9.286194441524266,12.251976346423756,4.9093401802499725,2.5199021292594903,18.46731220889206,11.502081023781262,7.718678857522949,16.10142148408819,3.913216739437586,18.70014719427114,0.14048979998010136,5.847847289417256,10.318487111966533,8.957437266125696,4.199515659341699,5.996861227210384,16.482017722991582,13.935457924490526,13.617284278408889,5.354848396601581,19.7610428320018,2.6904831582565603,14.226776613623805,3.6813917608947477,3.5483448016982155,6.665688757664947,5.911603654033999,15.414583870835994,10.646777716791856,2.306191201632548,2.636810697068084,16.31418897102689,11.04639016958194,4.584262251058466,19.62124595060454,9.492079309620873,16.294890057963332,6.973524527211756,11.695252190130505,11.148942151370026,18.860631076934872,8.951452781016723,7.147391464755248,1.1783672452758953,5.191712473726526,14.753404707096522,13.466875491102313,13.016152101178363,10.284303306042437,13.51831758469892,17.15466091884634,10.449856509686558,1.0332568172358014,11.612140779644973,7.347565262906106,6.859053976293583,19.212215717404206,17.091350173005818,18.333642301812855,14.378704877031865,15.860109327686512,8.988680576609337,2.0161595931076226,15.991548778360865,2.721506030164269,14.522126761842582,8.852371470131235,1.7942255272832641,9.15331971991725,10.775203743245427,3.5281096565599634,7.896128029360492,10.61106997172275,13.052627812288208,12.200045556402973,11.892197864756305,7.909497756053621,19.94085554783377,17.06427717428934,3.2328589931042506,11.335222539753541,7.335344801322781,13.520573975232374,16.931600305038046,15.366943903330101,9.773351620245041,1.0766513567135316,9.9968916695126,7.700131533449235,9.920974205596957,16.374690183905095,8.771752202072673,12.186864781441606,16.71251130507747,9.598553018137288,12.641046029301224,3.19637834920647,5.861450222913125,0.7219948544266641,16.61661718478411,17.823241629930614,19.013297850218542,12.661163326095863,19.37107297547294,4.570923347114024,10.189478782440101,19.161277484756273,11.433164864165079,4.857786620983702,0.8347318991055452,18.881939619234483,11.497404966032668,13.13941088228237,19.34964875573966,15.168846049873036,14.519811736134889,14.354943970455762,3.871627313495263,4.028102914533749,15.567286504388843,11.498739921908875,13.857420010531163,10.69165868046085,11.173207882306588,12.569520589256701,0.8167685431299132,3.2259092487689855,2.2839520044948136,19.1980751123521,4.65287744516508,10.586685891385299,10.853308069815405,19.697053984299377,10.022841277276374,18.464791709564274,0.584526513234942,10.533107972814385,12.449894998803469,19.1053091031863,0.11325258194835541,15.812282653644928,11.791798502475164,15.239211099488479,7.3073267391718355,13.981713542512555,7.2565154539856325,9.275739316899557,6.759329349766876,9.115296263919536,7.548995361503166,8.288247155995826,16.813934098273048,5.571858089984474,15.099266010051991,10.587395543498662,16.44963879746217,3.0673657209594607,0.42195678595943864,19.86387219373066,2.324292589014516,11.989667642689508,18.127132587876737,9.385459898930906,0.11714081385778563,1.6064668848468244,18.410873660156383,10.392415885716986,10.605479844312736,18.026613797215205,14.863260811025638,4.770702540767675,8.775844517486032,16.293927934441655,11.250601855628833,1.953787690637414,7.097509856023616,17.587994259092056,12.22753551232691,17.097581978191894,17.5767684802793,15.500754683834712,14.608183468451843,16.655730208981794,9.586650765692548,10.57949431994594,6.75620630589433,19.97324789229522,10.744439941961499,9.220298317618795,12.854061126105982,0.23817495235752606,12.47824382626185,4.186598220700923,7.85715923453469,4.706109974921566,9.017927402226853,4.869595296915592,15.383774170880642,6.609171729513603,13.985216740753351,10.837888275472096,3.3749123288788585,3.5435658713049945,15.125781052413636,8.513212855553313,0.8779274666408066,19.409852172810794,15.160520690537922,13.646883990733208,13.64974212618456,3.6192673929533647,5.490877597732431,15.578696328126359,6.986360322231437,17.255420336918252,7.0429621141878584,8.418406473364124,6.660971652045533,12.38607350719926,13.047185219627195,4.478459208829162,19.413126087880244,0.034462700415311964,0.2219221190035725,15.011794879356927,7.501764273743121,15.521978633301972,1.1372222825113365,4.746838722401998,15.89560527187932,9.641448658265169,1.3357165774767488,14.699529808904565,6.64220045205969,8.86824639661436,1.7241336282595432,16.598067322071653,5.655430452284547,6.487013975799534,14.018171766324418,18.54480916402712,15.086728630206316,5.150708998739448,15.213060572993582,11.480779041745151,4.3875871662538035,17.227793438469348,4.398123354524079,5.934090524624747,9.57470630930592,8.440278218733557,5.215080762875188,17.030603107889668,13.638557014314925,8.152915321595323,18.535106634708328,13.91195696733146,8.324428964132121,0.5591670460591436,12.404374828248447,14.986931452967669,13.830144382617146,1.9375694847328084,8.797091086727908,5.954481978327548,6.874322500938201,11.65934550636695,16.59864079143974,3.1091690590123733,19.954471320128725,18.903226391355602,16.75950786289132,13.1481443655546,8.003422970574658,2.8912991784451814,13.678198104272607,7.0455898662335725,18.398496734041224,15.604371657256868,18.171000597867135,17.092240767035545,18.596636382602956,6.165775552274626,18.005786564910295,3.3489326640700368,5.477239283126862,8.641482632266309,3.4775288884652023,7.515283137830719,8.27821989445654,7.255541246059387,2.9933908077957883,2.7039394041319964,15.354495859189505,5.524421410714426,7.3539034402272785,6.853892618514594,1.9080469128296285,10.44263126742746,10.90414010894138,13.153213578430115,4.722441420308896,1.7791560247814475,9.008224455931678,6.505790993730627,18.33073059440164,16.116298899085784,12.367187163839217,11.19597412451279,11.706093229993467,16.514636451773264,15.605291182472643,7.538121538177336,16.96686647085428,13.207960003642265,2.441212441817493,11.627626989601257,13.760717550511865,9.228913189483329,6.4177721389656694,4.515344626727069,12.948670700066621,6.389046320809126,6.896442099367044,13.592779090522686,5.580538978113441,5.910583332803214,2.868591835823442,15.538358297031065,11.656194882237006,3.8834395657270004,3.4802830586478706,9.607248684255572,6.937131451005021,15.31762289300502,19.507735488283757,12.378971825321656,3.355341979640678,2.6815335420764663,3.3591058852923528,2.909457477911679,18.607521934315216,17.552084129461495,16.125539441169114,18.34691154101078,5.309061069762713,15.604731526965434,19.585982028865526,19.332032835365546,14.144358312221286,4.70553841766439,0.7051772050432792,14.55893379817093,11.015211190269971,3.7635018907733997,6.414826113620649,6.591442412037631,3.0449153391324124,19.500550979719506,18.05654447913648,13.745210221976375,16.582573424651343,4.261291287314277,18.940932729320217,12.140609362270261,7.357992029276694,8.822484706611476,9.49479802144948,14.429608920214276,14.491781273632856,7.201251108605979,1.3965094811392609,12.987321785727698,18.578365266072833,5.786679338988834,1.5796709375728168,12.526336081260201,15.583044112550217,0.5938391572320567,8.63796841349933,15.17511448472411,2.9181608701970285,15.047555251160665,11.385911311297674,13.401378065636997,3.3766287045231413,5.12808276969086,19.420846232854515,6.255314816008006,7.777759000840319,14.017925186910048,10.203850013541329,2.3656047979274897,16.17260902687066,19.77799651013744,4.865711727777189,15.88570807514332,7.932427432001243,17.09845735709401,6.526355073549324,3.854186843609435,3.1181236499265275,12.371434399719412,3.4433971551374176,7.710433081894603,19.33822591394518,15.849413285808032,6.185527563492785,12.25413380628602,4.861896355300379,12.056969643637725,0.6158062099075545,0.044562713762985595,0.5235570762077613,16.740701063250146,14.553792246189001,14.376737940979307,0.3063858154714838,15.527440223285836,1.4942574997142488,6.62727428969295,13.17325871273589,7.035973910307098,6.653535067840921,19.929699886716413,14.764079680621073,14.894426959112618,12.78688225246286,15.706266125572661,10.026508711527281,10.573350552865431,7.205526678683567,18.457346154473978,1.3894735795543678,0.6450243033902492,13.020575731987627,0.5846131005521249,12.180623621483061,5.637743156965582,15.468833101975044,12.456460209802183,4.674470059980149,0.9281891058404002,3.7215165558439356,6.872170217185798,9.370769797166867,3.2490940650718336,2.9071775160274616,10.968577413122711,13.602443031101878,0.5951042958378361,15.392056979873665,9.635475674944036,5.747792246009151,11.127446392855948,11.783992341355326,8.81650354446936,11.062113310585747,16.27674318830685,17.227713260930212,1.3598359576662933,9.940959036798018,6.647723259930864,15.375019866617583,13.250652268099202,1.0476341161656677,12.225822393001877,7.2703385300960965,13.58650165316243,11.765732307612478,1.1722668872910624,0.8876856750077122,11.85835057359549,14.492414902476396,12.847336266903472,13.890702819418287,8.768926436742674,0.2835540497286493,9.097292625313077,19.77234455274354,1.8152640064512848,18.74553722895353,18.452545155336544,17.1018887873866,18.130385158708982,17.718825592705553,13.115917456582075,0.9301831575983055,14.064123977929572,3.5255342629664987,19.09273909360082,12.214712190353225,13.431318252043866,8.17876864418093,3.6289926696208274,6.06878269557936,12.555705456567235,3.9497010520829834,3.6568302302396694,0.8386568286294782,19.93305019636397,19.92092953107562,12.698767818906394,10.082635745549894,4.093494106408393,11.012624196572762,15.212659620654385,19.6776815472138,1.7037436992068766,1.3351462715349705,3.4447081414538827,0.7347589174115088,1.5379643186571723,6.296713099353322,14.191384502294206,9.41684219915382,2.5664145431862773,12.779577650656062,5.103544386044594,1.8726927082332878,17.30108343290474,5.778560538083912,1.736868398471323,13.959878938822863,2.7850576790483217,12.4278641180419,18.73255933407632,5.656313077961768,4.944401825719162,1.6675888933571459,16.94842876236532,12.318527476556653,17.357453910109268,11.57803062946373,16.765415975810143,1.3658569576036284,7.979661431398779,18.0855853503385,1.0354033098806603,3.3286969982568904,17.935587783655336,10.588256243768402,13.899896186771832,9.544798350058908,15.752022841821493,2.389196514387324,6.705412767050638,18.75302888667598,18.753894606123378,12.343440529725118,5.8691937920522275,5.636230157193127,0.4534453794804927,13.846370399664778,7.020263554678969,8.783838685209439,4.341043497645365,0.3088669669367805,19.930153676451212,9.572113116600875,14.178222959933358,13.740475248693622,12.561231030133321,3.846582232797795,3.818732762603365,5.944530603686289,13.873790661321408,3.742714186237781,11.013582560150699,6.305447653221474,0.13605075885790185,0.762526102474026,18.252901272808444,4.979281451490363,11.490358957092877,14.507594448320766,18.626150892535684,0.9720638895771128,12.489832160214176,12.895205551342519,13.49290481514846,5.389394932098792,11.42447800470132,10.85165081443832,0.3032531076936129,16.520221008727365,2.892336822847277,13.163341967338113,16.62565007938063,18.751185100459573,13.757690165538921,9.975272157077736,7.746183324169302,19.7389587228402,4.049807785330781,18.497206742678625,0.9501874544743494,6.827342424327516,13.270747771789315,4.907303683120938,4.076269114947011,14.553181789075506,0.05514137986895484,0.08113601956599492,12.194348512850208,11.768487658115486,8.283092598227576,17.38116738546769,15.830667166453388,8.31400673860962,10.647022021482911,0.9732090430219431,8.725989530951033,3.5168901533448382,4.01984803489456,7.118070670947372,9.771830588505765,7.61342642724625,19.197408322656226,6.318910837027203,2.3037512401142335,10.413403394059358,1.225734848393789,5.939277605171465,17.423467531448665,4.75241745990207,14.055417551522563,11.661981572125274,14.79659195360668,19.595836808112832,12.633456856481583,6.76851498205389,1.4921759377440136,15.568803444367232,8.067795620758226,4.112507303588817,4.120392306426788,3.7789708792252252,18.180726453337922,18.680237003295375,5.438363830637782,15.737695947956558,7.376146474177694,14.063566878985512,7.522873494756297,9.407504176024752,9.02071516350138,13.877750638471213,6.093066135398231,17.903368600020926,14.200562354535556,12.06151140455228,14.638037310102945,19.46854536772806,18.620900528895774,13.883081259900422,8.386735507818797,16.043358282951953,3.757488647552636,9.302117419225917,12.897493806144542,3.6017411738268956,17.32754831880618,15.333077851329557,17.65038426818628,13.387186055033432,11.23419396160013,16.67103418289323,4.485239014759981,18.59058955212611]}
},{}],55:[function(require,module,exports){
(function (__filename){
'use strict';

// MODULES //

var tape = require( 'tape' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var abs = require( '@stdlib/math/base/special/abs' );
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
	var logcdf = factory( 0.0, 1.0 );
	t.equal( typeof logcdf, 'function', 'returns a function' );
	t.end();
});

tape( 'if provided `NaN` for any parameter, the created function returns `NaN`', function test( t ) {
	var logcdf;
	var y;

	logcdf = factory( 0.0, 1.0, 0.5 );
	y = logcdf( NaN );
	t.equal( isnan( y ), true, 'returns NaN' );

	logcdf = factory( NaN, 1.0, 0.5 );
	y = logcdf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	logcdf = factory( 0.0, NaN, 0.5 );
	y = logcdf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	logcdf = factory( 0.0, 1.0, NaN );
	y = logcdf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	logcdf = factory( NaN, NaN, NaN );
	y = logcdf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	logcdf = factory( 0.0, NaN, NaN );
	y = logcdf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	logcdf = factory( NaN, 1.0, NaN );
	y = logcdf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	logcdf = factory( NaN, NaN, 0.5 );
	y = logcdf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	logcdf = factory( NaN, NaN, 0.5 );
	y = logcdf( NaN );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'if provided a valid `a`, `b` and `c`, the function returns a function which returns `0` when provided `+infinity` for `x`', function test( t ) {
	var logcdf;
	var y;

	logcdf = factory( 0.0, 1.0, 0.5 );
	y = logcdf( PINF );
	t.equal( y, 0.0, 'returns 0' );

	t.end();
});

tape( 'if provided a finite `a` and `b`, the function returns a function which returns `-infinity` when provided `-infinity` for `x`', function test( t ) {
	var logcdf;
	var y;

	logcdf = factory( 0.0, 1.0, 0.5 );
	y = logcdf( NINF );
	t.equal( y, NINF, 'returns -infinity' );

	t.end();
});

tape( 'if provided parameters not satisfying `a <= c <= b`, the created function always returns `NaN`', function test( t ) {
	var logcdf;
	var y;

	logcdf = factory( 2.0, 1.0, 0.5 );

	y = logcdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = logcdf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	logcdf = factory( 0.0, NINF, 0.5 );
	y = logcdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	logcdf = factory( PINF, NINF, 0.5 );
	y = logcdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	logcdf = factory( NINF, NINF, 0.5 );
	y = logcdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	logcdf = factory( -1.0, -2.0, 0.5 );
	y = logcdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	logcdf = factory( -10.0, 10.0, 12.0 );
	y = logcdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	logcdf = factory( -10.0, 10.0, -12.0 );
	y = logcdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'the created function evaluates the logcdf for `x` given a small range `b - a`', function test( t ) {
	var expected;
	var logcdf;
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
		logcdf = factory( a[i], b[i], c[i] );
		y = logcdf( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', a: '+a[i]+', b: '+b[i]+', c: '+c[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 10.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. a: '+a[i]+'. b: '+b[i]+'. c: '+c[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the created function evaluates the logcdf for `x` given a medium range `b - a`', function test( t ) {
	var expected;
	var logcdf;
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
		logcdf = factory( a[i], b[i], c[i] );
		y = logcdf( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', a: '+a[i]+', b: '+b[i]+', c: '+c[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 10.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. a: '+a[i]+'. b: '+b[i]+'. c: '+c[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the created function evaluates the logcdf for `x` given a large range `b - a`', function test( t ) {
	var expected;
	var logcdf;
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
		logcdf = factory( a[i], b[i], c[i] );
		y = logcdf( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', a: '+a[i]+', b: '+b[i]+', c: '+c[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 10.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. a: '+a[i]+'. b: '+b[i]+'. c: '+c[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

}).call(this,"/lib/node_modules/@stdlib/math/base/dists/triangular/logcdf/test/test.factory.js")
},{"./../lib/factory.js":49,"./fixtures/julia/large_range.json":52,"./fixtures/julia/medium_range.json":53,"./fixtures/julia/small_range.json":54,"@stdlib/constants/math/float64-eps":26,"@stdlib/constants/math/float64-ninf":33,"@stdlib/constants/math/float64-pinf":34,"@stdlib/math/base/assert/is-nan":45,"@stdlib/math/base/special/abs":59,"tape":184}],56:[function(require,module,exports){
(function (__filename){
'use strict';

// MODULES //

var tape = require( 'tape' );
var logcdf = require( './../lib' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.equal( typeof logcdf, 'function', 'main export is a function' );
	t.end();
});

tape( 'attached to the main export is a factory method for generating `logcdf` functions', function test( t ) {
	t.equal( typeof logcdf.factory, 'function', 'exports a factory method' );
	t.end();
});

}).call(this,"/lib/node_modules/@stdlib/math/base/dists/triangular/logcdf/test/test.js")
},{"./../lib":50,"tape":184}],57:[function(require,module,exports){
(function (__filename){
'use strict';

// MODULES //

var tape = require( 'tape' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var abs = require( '@stdlib/math/base/special/abs' );
var PINF = require( '@stdlib/constants/math/float64-pinf' );
var NINF = require( '@stdlib/constants/math/float64-ninf' );
var EPS = require( '@stdlib/constants/math/float64-eps' );
var logcdf = require( './../lib' );


// FIXTURES //

var smallRange = require( './fixtures/julia/small_range.json' );
var mediumRange = require( './fixtures/julia/medium_range.json' );
var largeRange = require( './fixtures/julia/large_range.json' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.equal( typeof logcdf, 'function', 'main export is a function' );
	t.end();
});

tape( 'if provided `NaN` for any parameter, the function returns `NaN`', function test( t ) {
	var y = logcdf( NaN, 0.0, 1.0, 0.5 );
	t.equal( isnan( y ), true, 'returns NaN' );
	y = logcdf( 0.0, NaN, 1.0, 0.5 );
	t.equal( isnan( y ), true, 'returns NaN' );
	y = logcdf( 0.0, 1.0, NaN, 0.5 );
	t.equal( isnan( y ), true, 'returns NaN' );
	y = logcdf( 0.0, 0.0, 1.0, NaN );
	t.equal( isnan( y ), true, 'returns NaN' );
	t.end();
});

tape( 'if provided `+infinity` for `x` and a valid `a`, `b` and `c`, the function returns `0`', function test( t ) {
	var y = logcdf( PINF, 0.0, 1.0, 0.5 );
	t.equal( y, 0.0, 'returns 0' );
	t.end();
});

tape( 'if provided `-infinity` for `x` and a valid `a`, `b` and `c`, the function returns `-infinity`', function test( t ) {
	var y = logcdf( NINF, 0.0, 1.0, 0.5 );
	t.equal( y, NINF, 'returns -infinity' );
	t.end();
});

tape( 'if provided parameters not satisfying `a <= c <= b`, the function returns `NaN`', function test( t ) {
	var y;

	y = logcdf( 2.0, -1.0, -1.1, -1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = logcdf( 0.0, 3.0, 2.0, 2.5 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = logcdf( 0.0, 0.0, 1.0, -1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = logcdf( 0.0, 0.0, 1.0, 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'the function evaluates the logcdf for `x` given a small range `b - a`', function test( t ) {
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
		y = logcdf( x[i], a[i], b[i], c[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', a: '+a[i]+', b: '+b[i]+', c: '+c[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 10.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. a: '+a[i]+'. b: '+b[i]+'. c: '+c[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the function evaluates the logcdf for `x` given a medium range `b - a`', function test( t ) {
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
		y = logcdf( x[i], a[i], b[i], c[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', a: '+a[i]+', b: '+b[i]+', c: '+c[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 10.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. a: '+a[i]+'. b: '+b[i]+'. c: '+c[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the function evaluates the logcdf for `x` given a large range `b - a`', function test( t ) {
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
		y = logcdf( x[i], a[i], b[i], c[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', a: '+a[i]+', b: '+b[i]+', c: '+c[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 10.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. a: '+a[i]+'. b: '+b[i]+'. c: '+c[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

}).call(this,"/lib/node_modules/@stdlib/math/base/dists/triangular/logcdf/test/test.logcdf.js")
},{"./../lib":50,"./fixtures/julia/large_range.json":52,"./fixtures/julia/medium_range.json":53,"./fixtures/julia/small_range.json":54,"@stdlib/constants/math/float64-eps":26,"@stdlib/constants/math/float64-ninf":33,"@stdlib/constants/math/float64-pinf":34,"@stdlib/math/base/assert/is-nan":45,"@stdlib/math/base/special/abs":59,"tape":184}],58:[function(require,module,exports){
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

},{}],59:[function(require,module,exports){
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

},{"./abs.js":58}],60:[function(require,module,exports){
'use strict';

// MODULES //

var toWords = require( '@stdlib/number/float64/base/to-words' );
var getHighWord = require( '@stdlib/number/float64/base/get-high-word' );
var fromWords = require( '@stdlib/number/float64/base/from-words' );


// VARIABLES //

// 10000000000000000000000000000000 => 2147483648 => 0x80000000
var SIGN_MASK = 0x80000000>>>0; // asm type annotation

// 01111111111111111111111111111111 => 2147483647 => 0x7fffffff
var MAGNITUDE_MASK = 0x7fffffff|0; // asm type annotation

// High/low words workspace:
var WORDS = [ 0, 0 ]; // WARNING: not thread safe


// MAIN //

/**
* Returns a double-precision floating-point number with the magnitude of `x` and the sign of `y`.
*
* @param {number} x - number from which to derive a magnitude
* @param {number} y - number from which to derive a sign
* @returns {number} a double-precision floating-point number
*
* @example
* var z = copysign( -3.14, 10.0 );
* // returns 3.14
*
* @example
* var z = copysign( 3.14, -1.0 );
* // returns -3.14
*
* @example
* var z = copysign( 1.0, -0.0 );
* // returns -1.0
*
* @example
* var z = copysign( -3.14, -0.0 );
* // returns -3.14
*
* @example
* var z = copysign( -0.0, 1.0 );
* // returns 0.0
*/
function copysign( x, y ) {
	var hx;
	var hy;

	// Split `x` into higher and lower order words:
	toWords( WORDS, x );
	hx = WORDS[ 0 ];

	// Turn off the sign bit of `x`:
	hx &= MAGNITUDE_MASK;

	// Extract the higher order word from `y`:
	hy = getHighWord( y );

	// Leave only the sign bit of `y` turned on:
	hy &= SIGN_MASK;

	// Copy the sign bit of `y` to `x`:
	hx |= hy;

	// Return a new value having the same magnitude as `x`, but with the sign of `y`:
	return fromWords( hx, WORDS[ 1 ] );
}


// EXPORTS //

module.exports = copysign;

},{"@stdlib/number/float64/base/from-words":84,"@stdlib/number/float64/base/get-high-word":88,"@stdlib/number/float64/base/to-words":99}],61:[function(require,module,exports){
'use strict';

/**
* Return a double-precision floating-point number with the magnitude of `x` and the sign of `y`.
*
* @module @stdlib/math/base/special/copysign
*
* @example
* var copysign = require( '@stdlib/math/base/special/copysign' );
*
* var z = copysign( -3.14, 10.0 );
* // returns 3.14
*
* z = copysign( 3.14, -1.0 );
* // returns -3.14
*
* z = copysign( 1.0, -0.0 );
* // returns -1.0
*
* z = copysign( -3.14, -0.0 );
* // returns -3.14
*
* z = copysign( -0.0, 1.0 );
* // returns 0.0
*/

// MODULES //

var copysign = require( './copysign.js' );


// EXPORTS //

module.exports = copysign;

},{"./copysign.js":60}],62:[function(require,module,exports){
'use strict';

// TODO: implementation (?)

/**
* Rounds a numeric value toward negative infinity.
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
var floor = Math.floor;


// EXPORTS //

module.exports = floor;

},{}],63:[function(require,module,exports){
'use strict';

/**
* Round a numeric value toward negative infinity.
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

var floor = require( './floor.js' );


// EXPORTS //

module.exports = floor;

},{"./floor.js":62}],64:[function(require,module,exports){
'use strict';

/**
* Multiply a double-precision floating-point number by an integer power of two.
*
* @module @stdlib/math/base/special/ldexp
*
* @example
* var ldexp = require( '@stdlib/math/base/special/ldexp' );
*
* var x = ldexp( 0.5, 3 ); // => 0.5 * 2^3 = 0.5 * 8
* // returns 4.0
*
* x = ldexp( 4.0, -2 ); // => 4 * 2^(-2) = 4 * (1/4)
* // returns 1.0
*
* x = ldexp( 0.0, 20 );
* // returns 0.0
*
* x = ldexp( -0.0, 39 );
* // returns -0.0
*
* x = ldexp( NaN, -101 );
* // returns NaN
*
* x = ldexp( Infinity, 11 );
* // returns Infinity
*
* x = ldexp( -Infinity, -118 );
* // returns -Infinity
*/

// MODULES //

var ldexp = require( './ldexp.js' );


// EXPORTS //

module.exports = ldexp;

},{"./ldexp.js":65}],65:[function(require,module,exports){
'use strict';

// NOTES //

/*
* => ldexp: load exponent (see [The Open Group]{@link http://pubs.opengroup.org/onlinepubs/9699919799/functions/ldexp.html} and [cppreference]{@link http://en.cppreference.com/w/c/numeric/math/ldexp}).
*/


// MODULES //

var PINF = require( '@stdlib/constants/math/float64-pinf' );
var NINF = require( '@stdlib/constants/math/float64-ninf' );
var BIAS = require( '@stdlib/constants/math/float64-exponent-bias' );
var MAX_EXPONENT = require( '@stdlib/constants/math/float64-max-base2-exponent' );
var MAX_SUBNORMAL_EXPONENT = require( '@stdlib/constants/math/float64-max-base2-exponent-subnormal' );
var MIN_SUBNORMAL_EXPONENT = require( '@stdlib/constants/math/float64-min-base2-exponent-subnormal' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var isInfinite = require( '@stdlib/math/base/assert/is-infinite' );
var copysign = require( '@stdlib/math/base/special/copysign' );
var normalize = require( '@stdlib/number/float64/base/normalize' );
var floatExp = require( '@stdlib/number/float64/base/exponent' );
var toWords = require( '@stdlib/number/float64/base/to-words' );
var fromWords = require( '@stdlib/number/float64/base/from-words' );


// VARIABLES //

// 1/(1<<52) = 1/(2**52) = 1/4503599627370496
var TWO52_INV = 2.220446049250313e-16;

// Exponent all 0s: 1 00000000000 11111111111111111111 => 2148532223
var CLEAR_EXP_MASK = 0x800fffff>>>0; // asm type annotation

// Normalization workspace:
var FRAC = [ 0.0, 0.0 ]; // WARNING: not thread safe

// High/low words workspace:
var WORDS = [ 0, 0 ]; // WARNING: not thread safe


// MAIN //

/**
* Multiplies a double-precision floating-point number by an integer power of two.
*
* @param {number} frac - fraction
* @param {integer} exp - exponent
* @returns {number} double-precision floating-point number
*
* @example
* var x = ldexp( 0.5, 3 ); // => 0.5 * 2^3 = 0.5 * 8
* // returns 4.0
*
* @example
* var x = ldexp( 4.0, -2 ); // => 4 * 2^(-2) = 4 * (1/4)
* // returns 1.0
*
* @example
* var x = ldexp( 0.0, 20 );
* // returns 0.0
*
* @example
* var x = ldexp( -0.0, 39 );
* // returns -0.0
*
* @example
* var x = ldexp( NaN, -101 );
* // returns NaN
*
* @example
* var x = ldexp( Infinity, 11 );
* // returns Infinity
*
* @example
* var x = ldexp( -Infinity, -118 );
* // returns -Infinity
*/
function ldexp( frac, exp ) {
	var high;
	var m;
	if (
		frac === 0.0 || // handles +-0
		isnan( frac ) ||
		isInfinite( frac )
	) {
		return frac;
	}
	// Normalize the input fraction:
	normalize( FRAC, frac );
	frac = FRAC[ 0 ];
	exp += FRAC[ 1 ];

	// Extract the exponent from `frac` and add it to `exp`:
	exp += floatExp( frac );

	// Check for underflow/overflow...
	if ( exp < MIN_SUBNORMAL_EXPONENT ) {
		return copysign( 0.0, frac );
	}
	if ( exp > MAX_EXPONENT ) {
		if ( frac < 0.0 ) {
			return NINF;
		}
		return PINF;
	}
	// Check for a subnormal and scale accordingly to retain precision...
	if ( exp <= MAX_SUBNORMAL_EXPONENT ) {
		exp += 52;
		m = TWO52_INV;
	} else {
		m = 1.0;
	}
	// Split the fraction into higher and lower order words:
	toWords( WORDS, frac );
	high = WORDS[ 0 ];

	// Clear the exponent bits within the higher order word:
	high &= CLEAR_EXP_MASK;

	// Set the exponent bits to the new exponent:
	high |= ((exp+BIAS) << 20);

	// Create a new floating-point number:
	return m * fromWords( high, WORDS[ 1 ] );
}


// EXPORTS //

module.exports = ldexp;

},{"@stdlib/constants/math/float64-exponent-bias":27,"@stdlib/constants/math/float64-max-base2-exponent":31,"@stdlib/constants/math/float64-max-base2-exponent-subnormal":30,"@stdlib/constants/math/float64-min-base2-exponent-subnormal":32,"@stdlib/constants/math/float64-ninf":33,"@stdlib/constants/math/float64-pinf":34,"@stdlib/math/base/assert/is-infinite":41,"@stdlib/math/base/assert/is-nan":45,"@stdlib/math/base/special/copysign":61,"@stdlib/number/float64/base/exponent":82,"@stdlib/number/float64/base/from-words":84,"@stdlib/number/float64/base/normalize":90,"@stdlib/number/float64/base/to-words":99}],66:[function(require,module,exports){
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

},{"./ln.js":67}],67:[function(require,module,exports){
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

},{"./polyval_p.js":68,"./polyval_q.js":69,"@stdlib/constants/math/float64-exponent-bias":27,"@stdlib/constants/math/float64-ninf":33,"@stdlib/math/base/assert/is-nan":45,"@stdlib/number/float64/base/get-high-word":88,"@stdlib/number/float64/base/set-high-word":94}],68:[function(require,module,exports){
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

},{}],69:[function(require,module,exports){
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

},{}],70:[function(require,module,exports){
'use strict';

/**
* Evaluate the exponential function.
*
* @module @stdlib/math/base/special/pow
*
* @example
* var pow = require( '@stdlib/math/base/special/pow' );
*
* var v = pow( 2.0, 3.0 );
* // returns 8.0
*
* v = pow( 4.0, 0.5 );
* // returns 2.0
*
* v = pow( 100.0, 0.0 );
* // returns 1.0
*
* v = pow( Math.PI, 5.0 );
* // returns ~306.0197
*
* v = pow( Math.PI, -0.2 );
* // returns ~0.7954
*
* v = pow( NaN, 3.0 );
* // returns NaN
*
* v = pow( 5.0, NaN );
* // returns NaN
*
* v = pow( NaN, NaN );
* // returns NaN
*/

// MODULES //

var pow = require( './pow.js' );


// EXPORTS //

module.exports = pow;

},{"./pow.js":76}],71:[function(require,module,exports){
'use strict';

// MODULES //

var getHighWord = require( '@stdlib/number/float64/base/get-high-word' );
var setLowWord = require( '@stdlib/number/float64/base/set-low-word' );
var setHighWord = require( '@stdlib/number/float64/base/set-high-word' );
var BIAS = require( '@stdlib/constants/math/float64-exponent-bias' );
var polyvalL = require( './polyval_l.js' );


// VARIABLES //

// 0x000fffff = 1048575 => 0 00000000000 11111111111111111111
var HIGH_SIGNIFICAND_MASK = 0x000fffff|0; // asm type annotation

// 0x00100000 = 1048576 => 0 00000000001 00000000000000000000 => biased exponent: 1 = -1022+1023 => 2^-1022
var HIGH_MIN_NORMAL_EXP = 0x00100000|0; // asm type annotation

// 0x3ff00000 = 1072693248 => 0 01111111111 00000000000000000000 => biased exponent: 1023 = 0+1023 => 2^0 = 1
var HIGH_BIASED_EXP_0 = 0x3ff00000|0; // asm type annotation

// 0x20000000 = 536870912 => 0 01000000000 00000000000000000000 => biased exponent: 512 = -511+1023
var HIGH_BIASED_EXP_NEG_512 = 0x20000000|0; // asm type annotation

// 0x00080000 = 524288 => 0 00000000000 10000000000000000000
var HIGH_SIGNIFICAND_HALF = 0x00080000|0; // asm type annotation

// TODO: consider making an external constant
var HIGH_NUM_SIGNIFICAND_BITS = 20|0; // asm type annotation

var TWO53 = 9007199254740992.0;	// 0x43400000, 0x00000000

// 2/(3*LN2)
var CP = 9.61796693925975554329e-01; // 0x3FEEC709, 0xDC3A03FD

// (float)CP
var CP_HI = 9.61796700954437255859e-01; // 0x3FEEC709, 0xE0000000

// Low: CP_HI
var CP_LO = -7.02846165095275826516e-09; // 0xBE3E2FE0, 0x145B01F5

var BP = [
	1.0,
	1.5
];
var DP_HI = [
	0.0,
	5.84962487220764160156e-01 // 0x3FE2B803, 0x40000000
];
var DP_LO = [
	0.0,
	1.35003920212974897128e-08 // 0x3E4CFDEB, 0x43CFD006
];


// MAIN //

/**
* Computes \\(\operatorname{log2}(ax)\\).
*
* @private
* @param {Array} out - output array
* @param {number} ax - absolute value of `x`
* @param {number} ahx - high word of `ax`
* @returns {Array} output array containing a tuple comprised of high and low parts
*
* @example
* var t = log2ax( [ 0.0, 0.0 ], 9.0, 1075970048 ); // => [ t1, t2 ]
* // returns [ 3.169923782348633, 0.0000012190936795504075 ]
*/
function log2ax( out, ax, ahx ) {
	var tmp;
	var ss; // `hs + ls`
	var s2; // `ss` squared
	var hs;
	var ls;
	var ht;
	var lt;
	var bp; // `BP` constant
	var dp; // `DP` constant
	var hp;
	var lp;
	var hz;
	var lz;
	var t1;
	var t2;
	var t;
	var r;
	var u;
	var v;
	var n;
	var j;
	var k;

	n = 0|0; // asm type annotation

	// Check if `x` is subnormal...
	if ( ahx < HIGH_MIN_NORMAL_EXP ) {
		ax *= TWO53;
		n -= 53|0; // asm type annotation
		ahx = getHighWord( ax );
	}
	// Extract the unbiased exponent of `x`:
	n += ((ahx >> HIGH_NUM_SIGNIFICAND_BITS) - BIAS)|0; // asm type annotation

	// Isolate the significand bits of `x`:
	j = (ahx & HIGH_SIGNIFICAND_MASK)|0; // asm type annotation

	// Normalize `ahx` by setting the (biased) exponent to `1023`:
	ahx = (j | HIGH_BIASED_EXP_0)|0; // asm type annotation

	// Determine the interval of `|x|` by comparing significand bits...

	// |x| < sqrt(3/2)
	if ( j <= 0x3988E ) { // 0 00000000000 00111001100010001110
		k = 0;
	}
	// |x| < sqrt(3)
	else if ( j < 0xBB67A ) { // 0 00000000000 10111011011001111010
		k = 1;
	}
	// |x| >= sqrt(3)
	else {
		k = 0;
		n += 1|0; // asm type annotation
		ahx -= HIGH_MIN_NORMAL_EXP;
	}
	// Load the normalized high word into `|x|`:
	ax = setHighWord( ax, ahx );

	// Compute `ss = hs + ls = (x-1)/(x+1)` or `(x-1.5)/(x+1.5)`:
	bp = BP[ k ]; // BP[0] = 1.0, BP[1] = 1.5
	u = ax - bp; // (x-1) || (x-1.5)
	v = 1.0 / (ax + bp); // 1/(x+1) || 1/(x+1.5)
	ss = u * v;
	hs = setLowWord( ss, 0 ); // set all low word (less significant significand) bits to 0s

	// Compute `ht = ax + bp` (via manipulation, i.e., bit flipping, of the high word):
	tmp = ((ahx>>1) | HIGH_BIASED_EXP_NEG_512) + HIGH_SIGNIFICAND_HALF;
	tmp += (k << 18); // `(k<<18)` can be considered the word equivalent of `1.0` or `1.5`
	ht = setHighWord( 0.0, tmp );
	lt = ax - (ht - bp);
	ls = v * ( ( u - (hs*ht) ) - ( hs*lt ) );

	// Compute `log(ax)`...

	s2 = ss * ss;
	r = s2 * s2 * polyvalL( s2 );
	r += ls * (hs + ss);
	s2 = hs * hs;
	ht = 3.0 + s2 + r;
	ht = setLowWord( ht, 0 );
	lt = r - ((ht-3.0) - s2);

	// u+v = ss*(1+...):
	u = hs * ht;
	v = ( ls*ht ) + ( lt*ss );

	// 2/(3LN2) * (ss+...):
	hp = u + v;
	hp = setLowWord( hp, 0 );
	lp = v - (hp - u);
	hz = CP_HI * hp; // CP_HI+CP_LO = 2/(3*LN2)
	lz = ( CP_LO*hp ) + ( lp*CP ) + DP_LO[ k ];

	// log2(ax) = (ss+...)*2/(3*LN2) = n + dp + hz + lz
	dp = DP_HI[ k ];
	t = n;
	t1 = ((hz+lz) + dp) + t; // log2(ax)
	t1 = setLowWord( t1, 0 );
	t2 = lz - (((t1-t) - dp) - hz);

	out[ 0 ] = t1;
	out[ 1 ] = t2;
	return out;
}


// EXPORTS //

module.exports = log2ax;

},{"./polyval_l.js":73,"@stdlib/constants/math/float64-exponent-bias":27,"@stdlib/number/float64/base/get-high-word":88,"@stdlib/number/float64/base/set-high-word":94,"@stdlib/number/float64/base/set-low-word":96}],72:[function(require,module,exports){
'use strict';

// MODULES //

var setLowWord = require( '@stdlib/number/float64/base/set-low-word' );
var polyvalW = require( './polyval_w.js' );


// VARIABLES //

// 1/LN2
var INV_LN2 = 1.44269504088896338700e+00; // 0x3FF71547, 0x652B82FE

// High (24 bits): 1/LN2
var INV_LN2_HI = 1.44269502162933349609e+00; // 0x3FF71547, 0x60000000

// Low: 1/LN2
var INV_LN2_LO = 1.92596299112661746887e-08; // 0x3E54AE0B, 0xF85DDF44


// MAIN //

/**
* Computes \\(\operatorname{log}(x)\\) assuming \\(|1-x|\\) is small and using the approximation \\(x - x^2/2 + x^3/3 - x^4/4\\).
*
* @private
* @param {Array} out - output array
* @param {number} ax - absolute value of `x`
* @returns {Array} output array containing a tuple comprised of high and low parts
*
* @example
* var t = logx( [ 0.0, 0.0 ], 9.0 ); // => [ t1, t2 ]
* // returns [ -1265.7236328125, -0.0008163940840404393 ]
*/
function logx( out, ax ) {
	var t2;
	var t1;
	var t;
	var w;
	var u;
	var v;

	t = ax - 1.0; // `t` has `20` trailing zeros
	w = t * t * polyvalW( t );
	u = INV_LN2_HI * t; // `INV_LN2_HI` has `21` significant bits
	v = ( t*INV_LN2_LO ) - ( w*INV_LN2 );
	t1 = u + v;
	t1 = setLowWord( t1, 0 );
	t2 = v - (t1 - u);

	out[ 0 ] = t1;
	out[ 1 ] = t2;
	return out;
}


// EXPORTS //

module.exports = logx;

},{"./polyval_w.js":75,"@stdlib/number/float64/base/set-low-word":96}],73:[function(require,module,exports){
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
		return 0.5999999999999946;
	}
	return 0.5999999999999946 + (x * (0.4285714285785502 + (x * (0.33333332981837743 + (x * (0.272728123808534 + (x * (0.23066074577556175 + (x * 0.20697501780033842))))))))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

},{}],74:[function(require,module,exports){
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
		return 0.16666666666666602;
	}
	return 0.16666666666666602 + (x * (-0.0027777777777015593 + (x * (0.00006613756321437934 + (x * (-0.0000016533902205465252 + (x * 4.1381367970572385e-8))))))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

},{}],75:[function(require,module,exports){
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
		return 0.5;
	}
	return 0.5 + (x * (-0.3333333333333333 + (x * 0.25))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

},{}],76:[function(require,module,exports){
'use strict';

/*
* The following copyright, license, and long comment were part of the original implementation available as part of [FreeBSD]{@link https://svnweb.freebsd.org/base/release/9.3.0/lib/msun/src/s_pow.c?view=markup}.
*
* The implementation follows the original, but has been modified for JavaScript.
*/

/*
* ====================================================
* Copyright (C) 2004 by Sun Microsystems, Inc. All rights reserved.
*
* Developed at SunPro, a Sun Microsystems, Inc. business.
* Permission to use, copy, modify, and distribute this
* software is freely granted, provided that this notice
* is preserved.
* ====================================================
*/

// MODULES //

var isnan = require( '@stdlib/math/base/assert/is-nan' );
var isOdd = require( '@stdlib/math/base/assert/is-odd' );
var isInfinite = require( '@stdlib/math/base/assert/is-infinite' );
var isInteger = require( '@stdlib/math/base/assert/is-integer' );
var sqrt = require( '@stdlib/math/base/special/sqrt' );
var abs = require( '@stdlib/math/base/special/abs' );
var toWords = require( '@stdlib/number/float64/base/to-words' );
var setLowWord = require( '@stdlib/number/float64/base/set-low-word' );
var uint32ToInt32 = require( '@stdlib/number/uint32/base/to-int32' );
var NINF = require( '@stdlib/constants/math/float64-ninf' );
var PINF = require( '@stdlib/constants/math/float64-pinf' );
var xIsZero = require( './x_is_zero.js' );
var yIsHuge = require( './y_is_huge.js' );
var yIsInfinite = require( './y_is_infinite.js' );
var log2ax = require( './log2ax.js' );
var logx = require( './logx.js' );
var pow2 = require( './pow2.js' );


// VARIABLES //

// 0x7fffffff = 2147483647 => 0 11111111111 11111111111111111111
var ABS_MASK = 0x7fffffff|0; // asm type annotation

// 0x3fefffff = 1072693247 => 0 01111111110 11111111111111111111 => biased exponent: 1022 = -1+1023 => 2^-1
var HIGH_MAX_NEAR_UNITY = 0x3fefffff|0; // asm type annotation

// 0x41e00000 = 1105199104 => 0 10000011110 00000000000000000000 => biased exponent: 1054 = 31+1023 => 2^31
var HIGH_BIASED_EXP_31 = 0x41e00000|0; // asm type annotation

// 0x43f00000 = 1139802112 => 0 10000111111 00000000000000000000 => biased exponent: 1087 = 64+1023 => 2^64
var HIGH_BIASED_EXP_64 = 0x43f00000|0; // asm type annotation

// 0x40900000 = 1083179008 => 0 10000001001 00000000000000000000 => biased exponent: 1033 = 10+1023 => 2^10 = 1024
var HIGH_BIASED_EXP_10 = 0x40900000|0; // asm type annotation

// 0x3ff00000 = 1072693248 => 0 01111111111 00000000000000000000 => biased exponent: 1023 = 0+1023 => 2^0 = 1
var HIGH_BIASED_EXP_0 = 0x3ff00000|0; // asm type annotation

// 0x4090cc00 = 1083231232 => 0 10000001001 00001100110000000000
var HIGH_1075 = 0x4090cc00|0; // asm type annotation

// 0xc090cc00 = 3230714880 => 1 10000001001 00001100110000000000
var HIGH_NEG_1075 = 0xc090cc00>>>0; // asm type annotation

var HIGH_NUM_NONSIGN_BITS = 31|0; // asm type annotation

var HUGE = 1.0e300;
var TINY = 1.0e-300;

// -(1024-log2(ovfl+.5ulp))
var OVT = 8.0085662595372944372e-17;

// High/low words workspace:
var WORDS = [ 0|0, 0|0 ]; // WARNING: not thread safe

// Log workspace:
var LOG_WORKSPACE = [ 0.0, 0.0 ]; // WARNING: not thread safe


// MAIN //

/**
* Evaluates the exponential function.
*
* ## Method
*
* 1.  Let \\(x = 2^n (1+f)\\).
*
* 2.  Compute \\(\operatorname{log2}(x)\\) as
*
*     ```tex
*     \operatorname{log2}(x) = w_1 + w_2
*     ```
*
*     where \\(w_1\\) has \\(53 - 24 = 29\\) bit trailing zeros.
*
* 3.  Compute
*
*     ```tex
*     y \cdot \operatorname{log2}(x) = n + y^\prime
*     ```
*
*     by simulating multi-precision arithmetic, where \\(|y^\prime| \leq 0.5\\).
*
* 4.  Return
*
*     ```tex
*     x^y = 2^n e^{y^\prime \cdot \mathrm{log2}}
*     ```
*
* ## Special Cases
*
* ```tex
* \begin{align*}
* x^{\mathrm{NaN}} &= \mathrm{NaN} & \\
* (\mathrm{NaN})^y &= \mathrm{NaN} & \\
* 1^y &= 1 & \\
* x^0 &= 1 & \\
* x^1 &= x & \\
* (\pm 0)^\infty &= +0 & \\
* (\pm 0)^{-\infty} &= +\infty & \\
* (+0)^y &= +0 & \mathrm{if}\ y > 0 \\
* (+0)^y &= +\infty & \mathrm{if}\ y < 0 \\
* (-0)^y &= -\infty & \mathrm{if}\ y\ \mathrm{is\ an\ odd\ integer\ and}\ y < 0 \\
* (-0)^y &= +\infty & \mathrm{if}\ y\ \mathrm{is\ not\ an\ odd\ integer\ and}\ y < 0 \\
* (-0)^y &= -0 & \mathrm{if}\ y\ \mathrm{is\ an\ odd\ integer\ and}\ y > 0 \\
* (-0)^y &= +0 & \mathrm{if}\ y\ \mathrm{is\ not\ an\ odd\ integer\ and}\ y > 0 \\
* (-1)^{\pm\infty} &= \mathrm{NaN} & \\
* x^{\infty} &= +\infty & |x| > 1 \\
* x^{\infty} &= +0 & |x| < 1 \\
* x^{-\infty} &= +0 & |x| > 1 \\
* x^{-\infty} &= +\infty & |x| < 1 \\
* (-\infty)^y &= (-0)^y & \\
* \infty^y &= +0 & y < 0 \\
* \infty^y &= +\infty & y > 0 \\
* x^y &= \mathrm{NaN} & \mathrm{if}\ y\ \mathrm{is\ not\ a\ finite\ integer\ and}\ x < 0
* \end{align*}
* ```
*
* ## Notes
*
* -   \\(\operatorname{pow}(x,y)\\) returns \\(x^y\\) nearly rounded. In particular, \\(\operatorname{pow}(<\mathrm{integer}>,<\mathrm{integer}>)\\) **always** returns the correct integer, provided the value is representable.
* -   The hexadecimal values shown in the source code are the intended values for used constants. Decimal values may be used, provided the compiler will accurately convert decimal to binary in order to produce the hexadecimal values.
*
*
* @param {number} x - base
* @param {number} y - exponent
* @returns {number} function value
*
* @example
* var v = pow( 2.0, 3.0 );
* // returns 8.0
*
* @example
* var v = pow( 4.0, 0.5 );
* // returns 2.0
*
* @example
* var v = pow( 100.0, 0.0 );
* // returns 1.0
*
* @example
* var v = pow( Math.PI, 5.0 );
* // returns ~306.0197
*
* @example
* var v = pow( Math.PI, -0.2 );
* // returns ~0.7954
*
* @example
* var v = pow( NaN, 3.0 );
* // returns NaN
*
* @example
* var v = pow( 5.0, NaN );
* // returns NaN
*
* @example
* var v = pow( NaN, NaN );
* // returns NaN
*/
function pow( x, y ) {
	var ahx; // absolute value high word `x`
	var ahy; // absolute value high word `y`
	var ax;  // absolute value `x`
	var hx;  // high word `x`
	var lx;  // low word `x`
	var hy;  // high word `y`
	var ly;  // low word `y`
	var sx;  // sign `x`
	var sy;  // sign `y`
	var y1;
	var hp;
	var lp;
	var t;
	var z;   // y prime
	var j;
	var i;
	if ( isnan( x ) || isnan( y ) ) {
		return NaN;
	}
	// Split `y` into high and low words:
	toWords( WORDS, y );
	hy = WORDS[ 0 ];
	ly = WORDS[ 1 ];

	// Special cases `y`...
	if ( ly === 0 ) {
		if ( y === 0.0 ) {
			return 1.0;
		}
		if ( y === 1.0 ) {
			return x;
		}
		if ( y === -1.0 ) {
			return 1.0 / x;
		}
		if ( y === 0.5 ) {
			return sqrt( x );
		}
		if ( y === -0.5 ) {
			return 1.0 / sqrt( x );
		}
		if ( y === 2.0 ) {
			return x * x;
		}
		if ( y === 3.0 ) {
			return x * x * x;
		}
		if ( y === 4.0 ) {
			x *= x;
			return x * x;
		}
		if ( isInfinite( y ) ) {
			return yIsInfinite( x, y );
		}
	}
	// Split `x` into high and low words:
	toWords( WORDS, x );
	hx = WORDS[ 0 ];
	lx = WORDS[ 1 ];

	// Special cases `x`...
	if ( lx === 0 ) {
		if ( hx === 0 ) {
			return xIsZero( x, y );
		}
		if ( x === 1.0 ) {
			return 1.0;
		}
		if (
			x === -1.0 &&
			isOdd( y )
		) {
			return -1.0;
		}
		if ( isInfinite( x ) ) {
			if ( x === NINF ) {
				// pow( 1/x, -y )
				return pow( -0.0, -y );
			}
			if ( y < 0.0 ) {
				return 0.0;
			}
			return PINF;
		}
	}
	if (
		x < 0.0 &&
		isInteger( y ) === false
	) {
		// signal NaN...
		return (x-x)/(x-x);
	}
	ax = abs( x );

	// Remove the sign bits (i.e., get absolute values):
	ahx = (hx & ABS_MASK)|0; // asm type annotation
	ahy = (hy & ABS_MASK)|0; // asm type annotation

	// Extract the sign bits:
	sx = (hx >>> HIGH_NUM_NONSIGN_BITS)|0; // asm type annotation
	sy = (hy >>> HIGH_NUM_NONSIGN_BITS)|0; // asm type annotation

	// Determine the sign of the result...
	if ( sx && isOdd( y ) ) {
		sx = -1.0;
	} else {
		sx = 1.0;
	}
	// Case 1: `|y|` is huge...

	// |y| > 2^31
	if ( ahy > HIGH_BIASED_EXP_31 ) {
		// `|y| > 2^64`, then must over- or underflow...
		if ( ahy > HIGH_BIASED_EXP_64 ) {
			return yIsHuge( x, y );
		}
		// Over- or underflow if `x` is not close to unity...

		if ( ahx < HIGH_MAX_NEAR_UNITY ) {
			// y < 0
			if ( sy === 1 ) {
				// signal overflow...
				return sx * HUGE * HUGE;
			}
			// signal underflow...
			return sx * TINY * TINY;
		}
		if ( ahx > HIGH_BIASED_EXP_0 ) {
			// y > 0
			if ( sy === 0 ) {
				// signal overflow...
				return sx * HUGE * HUGE;
			}
			// signal underflow...
			return sx * TINY * TINY;
		}
		// At this point, `|1-x|` is tiny (`<= 2^-20`). Suffice to compute `log(x)` by `x - x^2/2 + x^3/3 - x^4/4`.
		t = logx( LOG_WORKSPACE, ax );
	}
	// Case 2: `|y|` is not huge...
	else {
		t = log2ax( LOG_WORKSPACE, ax, ahx );
	}
	// Split `y` into `y1 + y2` and compute `(y1+y2) * (t1+t2)`...
	y1 = setLowWord( y, 0 );
	lp = ( (y-y1)*t[0] ) + ( y*t[1] );
	hp = y1 * t[0];
	z = lp + hp;

	// Note: *can* be more performant to use `getHighWord` and `getLowWord` directly, but using `toWords` looks cleaner.
	toWords( WORDS, z );
	j = uint32ToInt32( WORDS[0] );
	i = uint32ToInt32( WORDS[1] );

	// z >= 1024
	if ( j >= HIGH_BIASED_EXP_10 ) {
		// z > 1024
		if ( ((j-HIGH_BIASED_EXP_10)|i) !== 0 ) {
			// signal overflow...
			return sx * HUGE * HUGE;
		}
		else if ( (lp+OVT) > (z-hp) ) {
			// signal overflow...
			return sx * HUGE * HUGE;
		}
	}
	// z <= -1075
	else if ( (j&ABS_MASK) >= HIGH_1075 ) {
		// z < -1075
		if ( ((j-HIGH_NEG_1075)|i) !== 0 ) {
			// signal underflow...
			return sx * TINY * TINY;
		}
		else if ( lp <= (z-hp) ) {
			// signal underflow...
			return sx * TINY * TINY;
		}
	}
	// Compute `2^(hp+lp)`...
	z = pow2( j, hp, lp );

	return sx * z;
}


// EXPORTS //

module.exports = pow;

},{"./log2ax.js":71,"./logx.js":72,"./pow2.js":77,"./x_is_zero.js":78,"./y_is_huge.js":79,"./y_is_infinite.js":80,"@stdlib/constants/math/float64-ninf":33,"@stdlib/constants/math/float64-pinf":34,"@stdlib/math/base/assert/is-infinite":41,"@stdlib/math/base/assert/is-integer":43,"@stdlib/math/base/assert/is-nan":45,"@stdlib/math/base/assert/is-odd":47,"@stdlib/math/base/special/abs":59,"@stdlib/math/base/special/sqrt":81,"@stdlib/number/float64/base/set-low-word":96,"@stdlib/number/float64/base/to-words":99,"@stdlib/number/uint32/base/to-int32":103}],77:[function(require,module,exports){
'use strict';

// MODULES //

var getHighWord = require( '@stdlib/number/float64/base/get-high-word' );
var setHighWord = require( '@stdlib/number/float64/base/set-high-word' );
var setLowWord = require( '@stdlib/number/float64/base/set-low-word' );
var uint32ToInt32 = require( '@stdlib/number/uint32/base/to-int32' );
var ldexp = require( '@stdlib/math/base/special/ldexp' );
var LN2 = require( '@stdlib/constants/math/float64-ln-two' );
var BIAS = require( '@stdlib/constants/math/float64-exponent-bias' );
var polyvalP = require( './polyval_p.js' );


// VARIABLES //

// 0x7fffffff = 2147483647 => 0 11111111111 11111111111111111111
var ABS_MASK = 0x7fffffff|0; // asm type annotation

// 0x000fffff = 1048575 => 0 00000000000 11111111111111111111
var HIGH_SIGNIFICAND_MASK = 0x000fffff|0; // asm type annotation

// 0x00100000 = 1048576 => 0 00000000001 00000000000000000000 => biased exponent: 1 = -1022+1023 => 2^-1022
var HIGH_MIN_NORMAL_EXP = 0x00100000|0; // asm type annotation

// 0x3fe00000 = 1071644672 => 0 01111111110 00000000000000000000 => biased exponent: 1022 = -1+1023 => 2^-1
var HIGH_BIASED_EXP_NEG_1 = 0x3fe00000|0; // asm type annotation

// TODO: consider making into an external constant
var HIGH_NUM_SIGNIFICAND_BITS = 20|0; // asm type annotation

// High: LN2
var LN2_HI = 6.93147182464599609375e-01; // 0x3FE62E43, 0x00000000

// Low: LN2
var LN2_LO = -1.90465429995776804525e-09; // 0xBE205C61, 0x0CA86C39


// MAIN //

/**
* Computes \\(2^{\mathrm{hp} + \mathrm{lp}\\).
*
* @private
* @param {number} j - high word of `hp + lp`
* @param {number} hp - first power summand
* @param {number} lp - second power summand
* @returns {number} function value
*
* @example
* var z = pow2( 1065961648, -0.3398475646972656, -0.000002438187359100815 );
* // returns 0.012345679012345678
*/
function pow2( j, hp, lp ) {
	var tmp;
	var t1;
	var t;
	var r;
	var u;
	var v;
	var w;
	var z;
	var n;
	var i;
	var k;

	i = (j & ABS_MASK)|0; // asm type annotation
	k = ((i>>HIGH_NUM_SIGNIFICAND_BITS) - BIAS)|0; // asm type annotation
	n = 0;

	// `|z| > 0.5`, set `n = z+0.5`
	if ( i > HIGH_BIASED_EXP_NEG_1 ) {
		n = (j + (HIGH_MIN_NORMAL_EXP>>(k+1)))>>>0; // asm type annotation
		k = (((n & ABS_MASK)>>HIGH_NUM_SIGNIFICAND_BITS) - BIAS)|0; // new k for n
		tmp = ((n & ~(HIGH_SIGNIFICAND_MASK >> k)))>>>0; // asm type annotation
		t = setHighWord( 0.0, tmp );
		n = (((n & HIGH_SIGNIFICAND_MASK)|HIGH_MIN_NORMAL_EXP) >> (HIGH_NUM_SIGNIFICAND_BITS-k))>>>0; // eslint-disable-line max-len
		if ( j < 0 ) {
			n = -n;
		}
		hp -= t;
	}
	t = lp + hp;
	t = setLowWord( t, 0 );
	u = t * LN2_HI;
	v = ( (lp - (t-hp))*LN2 ) + ( t*LN2_LO );
	z = u + v;
	w = v - (z - u);
	t = z * z;
	t1 = z - ( t*polyvalP( t ) );
	r = ( (z*t1) / (t1-2.0) ) - ( w + (z*w) );
	z = 1.0 - (r - z);
	j = getHighWord( z );
	j = uint32ToInt32( j );
	j += (n << HIGH_NUM_SIGNIFICAND_BITS)>>>0; // asm type annotation

	// Check for subnormal output...
	if ( (j>>HIGH_NUM_SIGNIFICAND_BITS) <= 0 ) {
		z = ldexp( z, n );
	} else {
		z = setHighWord( z, j );
	}
	return z;
}


// EXPORTS //

module.exports = pow2;

},{"./polyval_p.js":74,"@stdlib/constants/math/float64-exponent-bias":27,"@stdlib/constants/math/float64-ln-two":29,"@stdlib/math/base/special/ldexp":64,"@stdlib/number/float64/base/get-high-word":88,"@stdlib/number/float64/base/set-high-word":94,"@stdlib/number/float64/base/set-low-word":96,"@stdlib/number/uint32/base/to-int32":103}],78:[function(require,module,exports){
'use strict';

// MODULES //

var isOdd = require( '@stdlib/math/base/assert/is-odd' );
var copysign = require( '@stdlib/math/base/special/copysign' );
var NINF = require( '@stdlib/constants/math/float64-ninf' );
var PINF = require( '@stdlib/constants/math/float64-pinf' );


// MAIN //

/**
* Evaluates the exponential function when \\(|x| = 0\\).
*
* @private
* @param {number} x - base
* @param {number} y - exponent
* @returns {number} function value
*
* @example
* var v = pow( 0.0, 2 );
* // returns 0.0
*
* @example
* var v = pow( -0.0, -9 );
* // returns -Infinity
*
* @example
* var v = pow( 0.0, -9 );
* // returns Infinity
*
* @example
* var v = pow( -0.0, 9 );
* // returns Infinity
*
* @example
* var v = pow( 0.0, -Infinity  );
* // returns Infinity
*
* @example
* var v = pow( 0.0, Infinity );
* // returns 0.0
*/
function pow( x, y ) {
	if ( y === NINF ) {
		return PINF;
	}
	if ( y === PINF ) {
		return 0.0;
	}
	if ( y > 0.0 ) {
		if ( isOdd( y ) ) {
			return x; // handles +-0
		}
		return 0.0;
	}
	// y < 0.0
	if ( isOdd( y ) ) {
		return copysign( PINF, x ); // handles +-0
	}
	return PINF;
}


// EXPORTS //

module.exports = pow;

},{"@stdlib/constants/math/float64-ninf":33,"@stdlib/constants/math/float64-pinf":34,"@stdlib/math/base/assert/is-odd":47,"@stdlib/math/base/special/copysign":61}],79:[function(require,module,exports){
'use strict';

// MODULES //

var getHighWord = require( '@stdlib/number/float64/base/get-high-word' );


// VARIABLES //

// 0x7fffffff = 2147483647 => 0 11111111111 11111111111111111111
var ABS_MASK = 0x7fffffff|0; // asm type annotation

// 0x3fefffff = 1072693247 => 0 01111111110 11111111111111111111 => biased exponent: 1022 = -1+1023 => 2^-1
var HIGH_MAX_NEAR_UNITY = 0x3fefffff|0; // asm type annotation

var HUGE = 1.0e300;
var TINY = 1.0e-300;


// MAIN //

/**
* Evaluates the exponential function when \\(|y| > 2^64\\).
*
* @private
* @param {number} x - base
* @param {number} y - exponent
* @returns {number} overflow or underflow result
*
* @example
* var v = pow( 9.0, 3.6893488147419103e19 );
* // returns Infinity
*
* @example
* var v = pow( -3.14, -3.6893488147419103e19 );
* // returns 0.0
*/
function pow( x, y ) {
	var ahx;
	var hx;

	hx = getHighWord( x );
	ahx = (hx & ABS_MASK);

	if ( ahx <= HIGH_MAX_NEAR_UNITY ) {
		if ( y < 0 ) {
			// signal overflow...
			return HUGE * HUGE;
		}
		// signal underflow...
		return TINY * TINY;
	}
	// `x` has a biased exponent greater than or equal to `0`...

	if ( y > 0 ) {
		// signal overflow...
		return HUGE * HUGE;
	}
	// signal underflow...
	return TINY * TINY;
}


// EXPORTS //

module.exports = pow;

},{"@stdlib/number/float64/base/get-high-word":88}],80:[function(require,module,exports){
'use strict';

// MODULES //

var abs = require( '@stdlib/math/base/special/abs' );
var PINF = require( '@stdlib/constants/math/float64-pinf' );


// MAIN //

/**
* Evaluates the exponential function when \\( y = \pm \infty\\).
*
* @private
* @param {number} x - base
* @param {number} y - exponent
* @returns {number} function value
*
* @example
* var v = pow( -1.0, Infinity );
* // returns NaN
*
* @example
* var v = pow( -1.0, -Infinity  );
* // returns NaN
*
* @example
* var v = pow( 1.0, Infinity );
* // returns 1.0
*
* @example
* var v = pow( 1.0, -Infinity  );
* // returns 1.0
*
* @example
* var v = pow( 0.5, Infinity );
* // returns 0.0
*
* @example
* var v = pow( 0.5, -Infinity  );
* // returns Infinity
*
* @example
* var v = pow( 1.5, -Infinity  );
* // returns 0.0
*
* @example
* var v = pow( 1.5, Infinity );
* // returns Infinity
*/
function pow( x, y ) {
	if ( x === -1.0 ) {
		// Julia (0.4.2) and Python (2.7.9) return `1.0` (WTF???). JavaScript (`Math.pow`), R, and libm return `NaN`. We choose `NaN`, as the value is indeterminate; i.e., we cannot determine whether `y` is odd, even, or somewhere in between.
		return (x-x)/(x-x); // signal NaN
	}
	if ( x === 1.0 ) {
		return 1.0;
	}
	// (|x| > 1 && y === NINF) || (|x| < 1 && y === PINF)
	if ( (abs(x) < 1.0) === (y === PINF) ) {
		return 0.0;
	}
	// (|x| > 1 && y === PINF) || (|x| < 1 && y === NINF)
	return PINF;
}


// EXPORTS //

module.exports = pow;

},{"@stdlib/constants/math/float64-pinf":34,"@stdlib/math/base/special/abs":59}],81:[function(require,module,exports){
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

},{}],82:[function(require,module,exports){
'use strict';

/**
* Return an integer corresponding to the unbiased exponent of a double-precision floating-point number.
*
* @module @stdlib/number/float64/base/exponent
*
* @example
* var exponent = require( '@stdlib/number/float64/base/exponent );
*
* var exp = exponent( 3.14e-307 ); // => 2**-1019 ~ 1e-307
* // returns -1019
*
* exp = exponent( -3.14 );
* // returns 1
*
* exp = exponent( 0.0 );
* // returns 0
*
* exp = exponent( NaN );
* // returns 1024
*/

// MODULES //

var exponent = require( './main.js' );


// EXPORTS //

module.exports = exponent;

},{"./main.js":83}],83:[function(require,module,exports){
'use strict';

// MODULES //

var getHighWord = require( '@stdlib/number/float64/base/get-high-word' );
var EXP_MASK = require( '@stdlib/constants/math/float64-high-word-exponent-mask' );
var BIAS = require( '@stdlib/constants/math/float64-exponent-bias' );


// MAIN //

/**
* Returns an integer corresponding to the unbiased exponent of a double-precision floating-point number.
*
* @param {number} x - input value
* @returns {integer32} unbiased exponent
*
* @example
* var exp = exponent( 3.14e-307 ); // => 2**-1019 ~ 1e-307
* // returns -1019
* @example
* var exp = exponent( -3.14 );
* // returns 1
* @example
* var exp = exponent( 0.0 );
* // returns 0
* @example
* var exp = exponent( NaN );
* // returns 1024
*/
function exponent( x ) {
	// Extract from the input value a higher order word (unsigned 32-bit integer) which contains the exponent:
	var high = getHighWord( x );

	// Apply a mask to isolate only the exponent bits and then shift off all bits which are part of the fraction:
	high = ( high & EXP_MASK ) >>> 20;

	// Remove the bias and return:
	return (high - BIAS)|0; // asm type annotation
}


// EXPORTS //

module.exports = exponent;

},{"@stdlib/constants/math/float64-exponent-bias":27,"@stdlib/constants/math/float64-high-word-exponent-mask":28,"@stdlib/number/float64/base/get-high-word":88}],84:[function(require,module,exports){
'use strict';

/**
* Create a double-precision floating-point number from a higher order word (unsigned 32-bit integer) and a lower order word (unsigned 32-bit integer).
*
* @module @stdlib/number/float64/base/from-words
*
* @example
* var fromWords = require( '@stdlib/number/float64/base/from-words' );
*
* var v = fromWords( 1774486211, 2479577218 );
* // returns 3.14e201
*
* v = fromWords( 3221823995, 1413754136 );
* // returns 3.141592653589793
*
* v = fromWords( 0, 0 );
* // returns 0.0
*
* v = fromWords( 2147483648, 0 );
* // returns -0.0
*
* v = fromWords( 2146959360, 0 );
* // returns NaN
*
* v = fromWords( 2146435072, 0 );
* // returns Infinity
*
* v = fromWords( 4293918720, 0 );
* // returns -Infinity
*/

// MODULES //

var fromWords = require( './main.js' );


// EXPORTS //

module.exports = fromWords;

},{"./main.js":86}],85:[function(require,module,exports){
'use strict';

// MODULES //

var isLittleEndian = require( '@stdlib/assert/is-little-endian' );


// MAIN //

var indices;
var HIGH;
var LOW;

if ( isLittleEndian === true ) {
	HIGH = 1; // second index
	LOW = 0; // first index
} else {
	HIGH = 0; // first index
	LOW = 1; // second index
}
indices = {
	'HIGH': HIGH,
	'LOW': LOW
};


// EXPORTS //

module.exports = indices;

},{"@stdlib/assert/is-little-endian":18}],86:[function(require,module,exports){
'use strict';

// MODULES //

var Uint32Array = require( '@stdlib/array/uint32' );
var Float64Array = require( '@stdlib/array/float64' );
var indices = require( './indices.js' );


// VARIABLES //

var FLOAT64_VIEW = new Float64Array( 1 );
var UINT32_VIEW = new Uint32Array( FLOAT64_VIEW.buffer );

var HIGH = indices.HIGH;
var LOW = indices.LOW;


// MAIN //

/**
* Creates a double-precision floating-point number from a higher order word (unsigned 32-bit integer) and a lower order word (unsigned 32-bit integer).
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
*
* In which Uint32 should we place the higher order bits? If little endian, the second; if big endian, the first.
*
*
* ## References
*
* -   [Open Group][1]
*
* [1]: http://pubs.opengroup.org/onlinepubs/9629399/chap14.htm
*
* @param {uinteger32} high - higher order word (unsigned 32-bit integer)
* @param {uinteger32} low - lower order word (unsigned 32-bit integer)
* @returns {number} floating-point number
*
* @example
* var v = fromWords( 1774486211, 2479577218 );
* // returns 3.14e201
* @example
* var v = fromWords( 3221823995, 1413754136 );
* // returns 3.141592653589793
* @example
* var v = fromWords( 0, 0 );
* // returns 0.0
* @example
* var v = fromWords( 2147483648, 0 );
* // returns -0.0
* @example
* var v = fromWords( 2146959360, 0 );
* // returns NaN
* @example
* var v = fromWords( 2146435072, 0 );
* // returns Infinity
* @example
* var v = fromWords( 4293918720, 0 );
* // returns -Infinity
*/
function fromWords( high, low ) {
	UINT32_VIEW[ HIGH ] = high;
	UINT32_VIEW[ LOW ] = low;
	return FLOAT64_VIEW[ 0 ];
}


// EXPORTS //

module.exports = fromWords;

},{"./indices.js":85,"@stdlib/array/float64":2,"@stdlib/array/uint32":7}],87:[function(require,module,exports){
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

},{"@stdlib/assert/is-little-endian":18}],88:[function(require,module,exports){
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

},{"./main.js":89}],89:[function(require,module,exports){
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

},{"./high.js":87,"@stdlib/array/float64":2,"@stdlib/array/uint32":7}],90:[function(require,module,exports){
'use strict';

/**
* Returns a normal number `y` and exponent `exp` satisfying \\(x = y \cdot 2^\mathrm{exp}\\).
*
* @module @stdlib/number/float64/base/normalize
*
* @example
* var normalize = require( '@stdlib/number/float64/base/normalize' );
* var pow = require( '@stdlib/math/base/special/pow' );
*
* var out = normalize( 3.14e-319 );
* // returns [ 1.4141234400356668e-303, -52 ]
*
* var y = out[ 0 ];
* var exp = out[ 1 ];
*
* var bool = ( y*pow(2.0,exp) === 3.14e-319 );
* // returns true
*
* @example
* var Float64Array = require( '@stdlib/array/float64' );
* var normalize = require( '@stdlib/number/float64/base/normalize' );
*
* var out = new Float64Array( 2 );
*
* var v = normalize( out, 3.14e-319 );
* // returns <Float64Array>[ 1.4141234400356668e-303, -52 ]
*
* var bool = ( v === out );
* // returns true
*/

// MODULES //

var normalize = require( './main.js' );


// EXPORTS //

module.exports = normalize;

},{"./main.js":91}],91:[function(require,module,exports){
'use strict';

// MODULES //

var fcn = require( './normalize.js' );


// MAIN //

/**
* Returns a normal number `y` and exponent `exp` satisfying \\(x = y \cdot 2^\mathrm{exp}\\).
*
* @param {(Array|TypedArray|Object)} [out] - output array
* @param {number} x - input value
* @returns {(Array|TypedArray|Object)} output array
*
* @example
* var pow = require( '@stdlib/math/base/special/pow' );
*
* var out = normalize( new Array( 2 ), 3.14e-319 );
* // returns [ 1.4141234400356668e-303, -52 ]
*
* var y = out[ 0 ];
* var exp = out[ 1 ];
*
* var bool = ( y*pow(2.0,exp) === 3.14e-319 );
* // returns true
*
* @example
* var Float64Array = require( '@stdlib/array/float64' );
* var pow = require( '@stdlib/math/base/special/pow' );
*
* var out = new Float64Array( 2 );
*
* var v = normalize( out, 3.14e-319 );
* // returns <Float64Array>[ 1.4141234400356668e-303, -52 ]
*
* var bool = ( v === out );
* // returns true
*
* @example
* var out = normalize( new Array( 2 ), 0.0 );
* // returns [ 0.0, 0 ];
*
* @example
* var out = normalize( new Array( 2 ), Infinity );
* // returns [ Infinity, 0 ]
*
* @example
* var out = normalize( new Array( 2 ), -Infinity );
* // returns [ -Infinity, 0 ]
*
* @example
* var out = normalize( new Array( 2 ), NaN );
* // returns [ NaN, 0 ]
*/
function normalize( out, x ) {
	if ( arguments.length === 1 ) {
		return fcn( [ 0.0, 0 ], out );
	}
	return fcn( out, x );
}


// EXPORTS //

module.exports = normalize;

},{"./normalize.js":92}],92:[function(require,module,exports){
'use strict';

// MODULES //

var FLOAT64_SMALLEST_NORMAL = require( '@stdlib/constants/math/float64-smallest-normal' );
var isInfinite = require( '@stdlib/math/base/assert/is-infinite' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var abs = require( '@stdlib/math/base/special/abs' );


// VARIABLES //

// (1<<52)
var SCALAR = 4503599627370496;


// MAIN //

/**
* Returns a normal number `y` and exponent `exp` satisfying \\(x = y \cdot 2^\mathrm{exp}\\).
*
* @private
* @param {(Array|TypedArray|Object)} out - output array
* @param {number} x - input value
* @returns {(Array|TypedArray|Object)} output array
*
* @example
* var pow = require( '@stdlib/math/base/special/pow' );
*
* var out = normalize( new Array( 2 ), 3.14e-319 );
* // returns [ 1.4141234400356668e-303, -52 ]
*
* var y = out[ 0 ];
* var exp = out[ 1 ];
*
* var bool = ( y*pow(2.0,exp) === 3.14e-319 );
* // returns true
*
* @example
* var out = normalize( new Array( 2 ), 0.0 );
* // returns [ 0.0, 0 ];
*
* @example
* var out = normalize( new Array( 2 ), Infinity );
* // returns [ Infinity, 0 ]
*
* @example
* var out = normalize( new Array( 2 ), -Infinity );
* // returns [ -Infinity, 0 ]
*
* @example
* var out = normalize( new Array( 2 ), NaN );
* // returns [ NaN, 0 ]
*/
function normalize( out, x ) {
	if ( isnan( x ) || isInfinite( x ) ) {
		out[ 0 ] = x;
		out[ 1 ] = 0;
		return out;
	}
	if ( x !== 0.0 && abs( x ) < FLOAT64_SMALLEST_NORMAL ) {
		out[ 0 ] = x * SCALAR;
		out[ 1 ] = -52;
		return out;
	}
	out[ 0 ] = x;
	out[ 1 ] = 0;
	return out;
}


// EXPORTS //

module.exports = normalize;

},{"@stdlib/constants/math/float64-smallest-normal":35,"@stdlib/math/base/assert/is-infinite":41,"@stdlib/math/base/assert/is-nan":45,"@stdlib/math/base/special/abs":59}],93:[function(require,module,exports){
arguments[4][87][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":18,"dup":87}],94:[function(require,module,exports){
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

},{"./main.js":95}],95:[function(require,module,exports){
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

},{"./high.js":93,"@stdlib/array/float64":2,"@stdlib/array/uint32":7}],96:[function(require,module,exports){
'use strict';

/**
* Set the less significant 32 bits of a double-precision floating-point number.
*
* @module @stdlib/number/float64/base/set-low-word
*
* @example
* var setLowWord = require( '@stdlib/number/float64/base/set-low-word' );
*
* var low = 5 >>> 0; // => 00000000000000000000000000000101
*
* var x = 3.14e201; // => 0 11010011100 01001000001011000011 10010011110010110101100010000010
*
* var y = setLowWord( x, low ); // => 0 11010011100 01001000001011000011 00000000000000000000000000000101
* // returns 3.139998651394392e+201
*
* @example
* var setLowWord = require( '@stdlib/number/float64/base/set-low-word' );
* var PINF = require( '@stdlib/constants/math/float64-pinf' );
* var NINF = require( '@stdlib/constants/math/float64-ninf' );
*
* var low = 12345678;
*
* var y = setLowWord( PINF, low );
* // returns NaN
*
* y = setLowWord( NINF, low );
* // returns NaN
*
* y = setLowWord( NaN, low );
* // returns NaN
*/

// MODULES //

var setLowWord = require( './main.js' );


// EXPORTS //

module.exports = setLowWord;

},{"./main.js":98}],97:[function(require,module,exports){
'use strict';

// MODULES //

var isLittleEndian = require( '@stdlib/assert/is-little-endian' );


// MAIN //

var LOW;
if ( isLittleEndian === true ) {
	LOW = 0; // first index
} else {
	LOW = 1; // second index
}


// EXPORTS //

module.exports = LOW;

},{"@stdlib/assert/is-little-endian":18}],98:[function(require,module,exports){
'use strict';

// MODULES //

var Uint32Array = require( '@stdlib/array/uint32' );
var Float64Array = require( '@stdlib/array/float64' );
var LOW = require( './low.js' );


// VARIABLES //

var FLOAT64_VIEW = new Float64Array( 1 );
var UINT32_VIEW = new Uint32Array( FLOAT64_VIEW.buffer );


// MAIN //

/**
* Sets the less significant 32 bits of a double-precision floating-point number.
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
* In which Uint32 can we find the lower order bits? If little endian, the first; if big endian, the second.
*
*
* ## References
*
* -   [Open Group][1]
*
* [1]: http://pubs.opengroup.org/onlinepubs/9629399/chap14.htm
*
* @param {number} x - double
* @param {uinteger32} low - unsigned 32-bit integer to replace the lower order word of `x`
* @returns {number} double having the same higher order word as `x`
*
* @example
* var low = 5 >>> 0; // => 00000000000000000000000000000101
*
* var x = 3.14e201; // => 0 11010011100 01001000001011000011 10010011110010110101100010000010
*
* var y = setLowWord( x, low ); // => 0 11010011100 01001000001011000011 00000000000000000000000000000101
* // returns 3.139998651394392e+201
*
* @example
* var PINF = require( '@stdlib/constants/math/float64-pinf' );
* var NINF = require( '@stdlib/constants/math/float64-ninf' );
*
* var low = 12345678;
*
* var y = setLowWord( PINF, low );
* // returns NaN
*
* y = setLowWord( NINF, low );
* // returns NaN
*
* y = setLowWord( NaN, low );
* // returns NaN
*/
function setLowWord( x, low ) {
	FLOAT64_VIEW[ 0 ] = x;
	UINT32_VIEW[ LOW ] = ( low >>> 0 ); // identity bit shift to ensure integer
	return FLOAT64_VIEW[ 0 ];
}


// EXPORTS //

module.exports = setLowWord;

},{"./low.js":97,"@stdlib/array/float64":2,"@stdlib/array/uint32":7}],99:[function(require,module,exports){
'use strict';

/**
* Split a floating-point number into a higher order word (unsigned 32-bit integer) and a lower order word (unsigned 32-bit integer).
*
* @module @stdlib/number/float64/base/to-words
*
* @example
* var toWords = require( '@stdlib/number/float64/base/to-words' );
*
* var w = toWords( 3.14e201 );
* // returns [ 1774486211, 2479577218 ]
*
* @example
* var Uint32Array = require( '@stdlib/array/uint32' );
* var toWords = require( '@stdlib/number/float64/base/to-words' );
*
* var out = new Uint32Array( 2 );
*
* var w = toWords( out, 3.14e201 );
* // returns <Uint32Array>[ 1774486211, 2479577218 ]
*
* var bool = ( w === out );
* // returns true
*/

// MODULES //

var toWords = require( './main.js' );


// EXPORTS //

module.exports = toWords;

},{"./main.js":101}],100:[function(require,module,exports){
arguments[4][85][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":18,"dup":85}],101:[function(require,module,exports){
'use strict';

// MODULES //

var fcn = require( './to_words.js' );


// MAIN //

/**
* Splits a floating-point number into a higher order word (unsigned 32-bit integer) and a lower order word (unsigned 32-bit integer).
*
* @param {(Array|TypedArray|Object)} [out] - output array
* @param {number} x - input value
* @returns {(Array|TypedArray|Object)} output array
*
* @example
* var w = toWords( 3.14e201 );
* // returns [ 1774486211, 2479577218 ]
*
* @example
* var Uint32Array = require( '@stdlib/array/uint32' );
*
* var out = new Uint32Array( 2 );
*
* var w = toWords( out, 3.14e201 );
* // returns <Uint32Array>[ 1774486211, 2479577218 ]
*
* var bool = ( w === out );
* // returns true
*/
function toWords( out, x ) {
	if ( arguments.length === 1 ) {
		return fcn( [ 0, 0 ], out );
	}
	return fcn( out, x );
}


// EXPORTS //

module.exports = toWords;

},{"./to_words.js":102}],102:[function(require,module,exports){
'use strict';

// MODULES //

var Uint32Array = require( '@stdlib/array/uint32' );
var Float64Array = require( '@stdlib/array/float64' );
var indices = require( './indices.js' );


// VARIABLES //

var FLOAT64_VIEW = new Float64Array( 1 );
var UINT32_VIEW = new Uint32Array( FLOAT64_VIEW.buffer );

var HIGH = indices.HIGH;
var LOW = indices.LOW;


// MAIN //

/**
* Splits a floating-point number into a higher order word (unsigned 32-bit integer) and a lower order word (unsigned 32-bit integer).
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
*
* @private
* @param {(Array|TypedArray|Object)} out - output array
* @param {number} x - input value
* @returns {(Array|TypedArray|Object)} output array
*
* @example
* var Uint32Array = require( '@stdlib/array/uint32' );
*
* var out = new Uint32Array( 2 );
*
* var w = toWords( out, 3.14e201 );
* // returns <Uint32Array>[ 1774486211, 2479577218 ]
*
* var bool = ( w === out );
* // returns true
*/
function toWords( out, x ) {
	FLOAT64_VIEW[ 0 ] = x;
	out[ 0 ] = UINT32_VIEW[ HIGH ];
	out[ 1 ] = UINT32_VIEW[ LOW ];
	return out;
}


// EXPORTS //

module.exports = toWords;

},{"./indices.js":100,"@stdlib/array/float64":2,"@stdlib/array/uint32":7}],103:[function(require,module,exports){
'use strict';

/**
* Convert an unsigned 32-bit integer to a signed 32-bit integer.
*
* @module @stdlib/number/uint32/base/to-int32
*
* @example
* var float64ToUint32 = require( '@stdlib/number/float64/base/to-uint32' );
* var uint32ToInt32 = require( '@stdlib/number/uint32/base/to-int32' );
*
* var y = uint32ToInt32( float64ToUint32( 4294967295 ) );
* // returns -1
*
* y = uint32ToInt32( float64ToUint32( 3 ) );
* // returns 3
*/

// MODULES //

var uint32ToInt32 = require( './main.js' );


// EXPORTS //

module.exports = uint32ToInt32;

},{"./main.js":104}],104:[function(require,module,exports){
'use strict';

// MAIN //

/**
* Converts an unsigned 32-bit integer to a signed 32-bit integer.
*
* @param {uinteger32} x - unsigned 32-bit integer
* @returns {integer32} signed 32-bit integer
*
* @example
* var float64ToUint32 = require( '@stdlib/number/float64/base/to-uint32' );
* var y = uint32ToInt32( float64ToUint32( 4294967295 ) );
* // returns -1
*
* @example
* var float64ToUint32 = require( '@stdlib/number/float64/base/to-uint32' );
* var y = uint32ToInt32( float64ToUint32( 3 ) );
* // returns 3
*/
function uint32ToInt32( x ) {
	// NOTE: we could also use typed-arrays to achieve the same end.
	return x|0; // asm type annotation
}


// EXPORTS //

module.exports = uint32ToInt32;

},{}],105:[function(require,module,exports){
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

},{}],106:[function(require,module,exports){
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

},{"./constant_function.js":105}],107:[function(require,module,exports){
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

},{}],108:[function(require,module,exports){
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

},{"./define_read_only_property.js":107}],109:[function(require,module,exports){
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

},{"./float64array.js":110,"@stdlib/assert/is-float64array":15}],110:[function(require,module,exports){
'use strict';

// EXPORTS //

module.exports = ( typeof Float64Array === 'function' ) ? Float64Array : null;

},{}],111:[function(require,module,exports){
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

},{"./detect_float64array_support.js":109}],112:[function(require,module,exports){
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

},{}],113:[function(require,module,exports){
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

},{"./detect_symbol_support.js":112}],114:[function(require,module,exports){
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

},{"@stdlib/utils/detect-symbol-support":113}],115:[function(require,module,exports){
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

},{"./has_tostringtag_support.js":114}],116:[function(require,module,exports){
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

},{"./uint16array.js":118,"@stdlib/assert/is-uint16array":20,"@stdlib/constants/math/uint16-max":36}],117:[function(require,module,exports){
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

},{"./detect_uint16array_support.js":116}],118:[function(require,module,exports){
'use strict';

// EXPORTS //

module.exports = ( typeof Uint16Array === 'function' ) ? Uint16Array : null;

},{}],119:[function(require,module,exports){
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

},{"./uint32array.js":121,"@stdlib/assert/is-uint32array":22,"@stdlib/constants/math/uint32-max":37}],120:[function(require,module,exports){
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

},{"./detect_uint32array_support.js":119}],121:[function(require,module,exports){
'use strict';

// EXPORTS //

module.exports = ( typeof Uint32Array === 'function' ) ? Uint32Array : null;

},{}],122:[function(require,module,exports){
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

},{"./uint8array.js":124,"@stdlib/assert/is-uint8array":24,"@stdlib/constants/math/uint8-max":38}],123:[function(require,module,exports){
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

},{"./detect_uint8array_support.js":122}],124:[function(require,module,exports){
'use strict';

// EXPORTS //

module.exports = ( typeof Uint8Array === 'function' ) ? Uint8Array : null;

},{}],125:[function(require,module,exports){
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

},{"./native_class.js":126,"./polyfill.js":127,"@stdlib/utils/detect-tostringtag-support":115}],126:[function(require,module,exports){
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

},{"./tostring.js":128}],127:[function(require,module,exports){
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

},{"./tostring.js":128,"./tostringtag.js":129,"@stdlib/assert/has-own-property":14}],128:[function(require,module,exports){
'use strict';

// MAIN //

var toStr = Object.prototype.toString;


// EXPORTS //

module.exports = toStr;

},{}],129:[function(require,module,exports){
'use strict';

// MAIN //

var toStrTag = ( typeof Symbol === 'function' ) ? Symbol.toStringTag : '';


// EXPORTS //

module.exports = toStrTag;

},{}],130:[function(require,module,exports){
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

},{}],131:[function(require,module,exports){

},{}],132:[function(require,module,exports){
arguments[4][131][0].apply(exports,arguments)
},{"dup":131}],133:[function(require,module,exports){
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

},{}],134:[function(require,module,exports){
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

},{"base64-js":130,"ieee754":153}],135:[function(require,module,exports){
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
},{"../../is-buffer/index.js":155}],136:[function(require,module,exports){
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

},{"./lib/is_arguments.js":137,"./lib/keys.js":138}],137:[function(require,module,exports){
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

},{}],138:[function(require,module,exports){
exports = module.exports = typeof Object.keys === 'function'
  ? Object.keys : shim;

exports.shim = shim;
function shim (obj) {
  var keys = [];
  for (var key in obj) keys.push(key);
  return keys;
}

},{}],139:[function(require,module,exports){
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

},{"foreach":149,"object-keys":159}],140:[function(require,module,exports){
module.exports = function () {
    for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] !== undefined) return arguments[i];
    }
};

},{}],141:[function(require,module,exports){
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

},{"./helpers/isFinite":142,"./helpers/isNaN":143,"./helpers/mod":144,"./helpers/sign":145,"es-to-primitive/es5":146,"has":152,"is-callable":156}],142:[function(require,module,exports){
var $isNaN = Number.isNaN || function (a) { return a !== a; };

module.exports = Number.isFinite || function (x) { return typeof x === 'number' && !$isNaN(x) && x !== Infinity && x !== -Infinity; };

},{}],143:[function(require,module,exports){
module.exports = Number.isNaN || function isNaN(a) {
	return a !== a;
};

},{}],144:[function(require,module,exports){
module.exports = function mod(number, modulo) {
	var remain = number % modulo;
	return Math.floor(remain >= 0 ? remain : remain + modulo);
};

},{}],145:[function(require,module,exports){
module.exports = function sign(number) {
	return number >= 0 ? 1 : -1;
};

},{}],146:[function(require,module,exports){
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

},{"./helpers/isPrimitive":147,"is-callable":156}],147:[function(require,module,exports){
module.exports = function isPrimitive(value) {
	return value === null || (typeof value !== 'function' && typeof value !== 'object');
};

},{}],148:[function(require,module,exports){
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

},{}],149:[function(require,module,exports){

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


},{}],150:[function(require,module,exports){
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

},{}],151:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

module.exports = Function.prototype.bind || implementation;

},{"./implementation":150}],152:[function(require,module,exports){
var bind = require('function-bind');

module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);

},{"function-bind":151}],153:[function(require,module,exports){
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

},{}],154:[function(require,module,exports){
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

},{}],155:[function(require,module,exports){
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

},{}],156:[function(require,module,exports){
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

},{}],157:[function(require,module,exports){
var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};

},{}],158:[function(require,module,exports){
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

},{}],159:[function(require,module,exports){
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

},{"./isArguments":160}],160:[function(require,module,exports){
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

},{}],161:[function(require,module,exports){
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
},{"_process":133}],162:[function(require,module,exports){
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
},{"_process":133}],163:[function(require,module,exports){
module.exports = require('./lib/_stream_duplex.js');

},{"./lib/_stream_duplex.js":164}],164:[function(require,module,exports){
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
},{"./_stream_readable":166,"./_stream_writable":168,"core-util-is":135,"inherits":154,"process-nextick-args":162}],165:[function(require,module,exports){
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
},{"./_stream_transform":167,"core-util-is":135,"inherits":154}],166:[function(require,module,exports){
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
},{"./_stream_duplex":164,"./internal/streams/BufferList":169,"./internal/streams/destroy":170,"./internal/streams/stream":171,"_process":133,"core-util-is":135,"events":148,"inherits":154,"isarray":157,"process-nextick-args":162,"safe-buffer":177,"string_decoder/":183,"util":131}],167:[function(require,module,exports){
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
},{"./_stream_duplex":164,"core-util-is":135,"inherits":154}],168:[function(require,module,exports){
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
},{"./_stream_duplex":164,"./internal/streams/destroy":170,"./internal/streams/stream":171,"_process":133,"core-util-is":135,"inherits":154,"process-nextick-args":162,"safe-buffer":177,"util-deprecate":190}],169:[function(require,module,exports){
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
},{"safe-buffer":177}],170:[function(require,module,exports){
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
},{"process-nextick-args":162}],171:[function(require,module,exports){
module.exports = require('events').EventEmitter;

},{"events":148}],172:[function(require,module,exports){
module.exports = require('./readable').PassThrough

},{"./readable":173}],173:[function(require,module,exports){
exports = module.exports = require('./lib/_stream_readable.js');
exports.Stream = exports;
exports.Readable = exports;
exports.Writable = require('./lib/_stream_writable.js');
exports.Duplex = require('./lib/_stream_duplex.js');
exports.Transform = require('./lib/_stream_transform.js');
exports.PassThrough = require('./lib/_stream_passthrough.js');

},{"./lib/_stream_duplex.js":164,"./lib/_stream_passthrough.js":165,"./lib/_stream_readable.js":166,"./lib/_stream_transform.js":167,"./lib/_stream_writable.js":168}],174:[function(require,module,exports){
module.exports = require('./readable').Transform

},{"./readable":173}],175:[function(require,module,exports){
module.exports = require('./lib/_stream_writable.js');

},{"./lib/_stream_writable.js":168}],176:[function(require,module,exports){
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
},{"_process":133,"through":189}],177:[function(require,module,exports){
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

},{"buffer":134}],178:[function(require,module,exports){
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

},{"events":148,"inherits":154,"readable-stream/duplex.js":163,"readable-stream/passthrough.js":172,"readable-stream/readable.js":173,"readable-stream/transform.js":174,"readable-stream/writable.js":175}],179:[function(require,module,exports){
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

},{"es-abstract/es5":141,"function-bind":151}],180:[function(require,module,exports){
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

},{"./implementation":179,"./polyfill":181,"./shim":182,"define-properties":139,"function-bind":151}],181:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

var zeroWidthSpace = '\u200b';

module.exports = function getPolyfill() {
	if (String.prototype.trim && zeroWidthSpace.trim() === zeroWidthSpace) {
		return String.prototype.trim;
	}
	return implementation;
};

},{"./implementation":179}],182:[function(require,module,exports){
'use strict';

var define = require('define-properties');
var getPolyfill = require('./polyfill');

module.exports = function shimStringTrim() {
	var polyfill = getPolyfill();
	define(String.prototype, { trim: polyfill }, { trim: function () { return String.prototype.trim !== polyfill; } });
	return polyfill;
};

},{"./polyfill":181,"define-properties":139}],183:[function(require,module,exports){
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
},{"safe-buffer":177}],184:[function(require,module,exports){
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
},{"./lib/default_stream":185,"./lib/results":187,"./lib/test":188,"_process":133,"defined":140,"through":189}],185:[function(require,module,exports){
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
},{"_process":133,"fs":132,"through":189}],186:[function(require,module,exports){
(function (process){
module.exports = typeof setImmediate !== 'undefined'
    ? setImmediate
    : process.nextTick
;

}).call(this,require('_process'))
},{"_process":133}],187:[function(require,module,exports){
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
},{"_process":133,"events":148,"function-bind":151,"has":152,"inherits":154,"object-inspect":158,"resumer":176,"through":189}],188:[function(require,module,exports){
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
},{"./next_tick":186,"deep-equal":136,"defined":140,"events":148,"has":152,"inherits":154,"path":161,"string.prototype.trim":180}],189:[function(require,module,exports){
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
},{"_process":133,"stream":178}],190:[function(require,module,exports){
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
},{}]},{},[55,56,57]);
