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

},{"./float64array.js":1,"./polyfill.js":3,"@stdlib/utils/detect-float64array-support":110}],3:[function(require,module,exports){
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

},{"./polyfill.js":5,"./uint16array.js":6,"@stdlib/utils/detect-uint16array-support":116}],5:[function(require,module,exports){
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

},{"./polyfill.js":8,"./uint32array.js":9,"@stdlib/utils/detect-uint32array-support":119}],8:[function(require,module,exports){
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

},{"./polyfill.js":11,"./uint8array.js":12,"@stdlib/utils/detect-uint8array-support":122}],11:[function(require,module,exports){
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

},{"@stdlib/utils/native-class":124}],17:[function(require,module,exports){
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

},{"@stdlib/utils/native-class":124}],22:[function(require,module,exports){
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

},{"@stdlib/utils/native-class":124}],24:[function(require,module,exports){
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

},{"@stdlib/utils/native-class":124}],26:[function(require,module,exports){
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
var log1p = require( '@stdlib/math/base/special/log1p' );
var pow = require( '@stdlib/math/base/special/pow' );
var NINF = require( '@stdlib/constants/math/float64-ninf' );


// MAIN //

/**
* Returns a function for evaluating the natural logarithm of the cumulative distribution function (CDF) for a Pareto distribution with shape parameter `alpha` and scale parameter `beta`.
*
* @param {PositiveNumber} alpha - shape parameter
* @param {PositiveNumber} beta - scale parameter
* @returns {Function} logCDF
*
* @example
*var logcdf = factory( 10.0, 2.0 );
* var y = logcdf( 3.0 );
* // returns ~-0.017
*
* y = logcdf( 2.5 );
* // returns ~-0.113
*/
function factory( alpha, beta ) {
	if (
		isnan( alpha ) ||
		isnan( beta ) ||
		alpha <= 0.0 ||
		beta <= 0.0
	) {
		return constantFunction( NaN );
	}
	return logcdf;

	/**
	* Evaluates the natural logarithm of the cumulative distribution function (CDF) for a Pareto distribution.
	*
	* @private
	* @param {number} x - input value
	* @returns {number} evaluated logCDF
	*/
	function logcdf( x ) {
		if ( isnan( x ) ) {
			return NaN;
		}
		if ( x < beta ) {
			return NINF;
		}
		return log1p( -pow( beta / x, alpha ) );
	}
}


// EXPORTS //

module.exports = factory;

},{"@stdlib/constants/math/float64-ninf":33,"@stdlib/math/base/assert/is-nan":45,"@stdlib/math/base/special/log1p":66,"@stdlib/math/base/special/pow":69,"@stdlib/utils/constant-function":105}],50:[function(require,module,exports){
'use strict';

/**
* Natural logarithm of the cumulative distribution function (CDF) for a Pareto (Type I) distribution.
*
* @module @stdlib/math/base/dists/pareto-type1/logcdf
*
* @example
* var logcdf = require( '@stdlib/math/base/dists/pareto-type1/logcdf' );
*
* var y = logcdf( 2.0, 1.0, 1.0 );
* // returns ~-0.693
*
* y = logcdf( 5.0, 2.0, 4.0 );
* // returns ~-1.022
*
* y = logcdf( 4.0, 2.0, 2.0 );
* // returns ~-0.288
*
* y = logcdf( 1.9, 2.0, 2.0 );
* // returns -Infinity
*
* y = logcdf( +Infinity, 4.0, 2.0 );
* // returns 0.0
*
* var mylogcdf = logcdf.factory( 10.0, 2.0 );
* y = mylogcdf( 3.0 );
* // returns ~-0.017
*
* y = mylogcdf( 2.5 );
* // returns ~-0.113
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-read-only-property' );
var logcdf = require( './logcdf.js' );
var factory = require( './factory.js' );


// MAIN //

setReadOnly( logcdf, 'factory', factory );


// EXPORTS //

module.exports = logcdf;

},{"./factory.js":49,"./logcdf.js":51,"@stdlib/utils/define-read-only-property":107}],51:[function(require,module,exports){
'use strict';

// MODULES //

var isnan = require( '@stdlib/math/base/assert/is-nan' );
var log1p = require( '@stdlib/math/base/special/log1p' );
var pow = require( '@stdlib/math/base/special/pow' );
var NINF = require( '@stdlib/constants/math/float64-ninf' );


// MAIN //

/**
* Evaluates the cumulative distribution function (CDF) for a Pareto distribution with shape parameter `alpha` and scale parameter `beta` at a value `x`.
*
* @param {number} x - input value
* @param {PositiveNumber} alpha - shape parameter
* @param {PositiveNumber} beta - scale parameter
* @returns {number} evaluated logCDF
*
* @example
* var y = logcdf( 2.0, 1.0, 1.0 );
* // returns ~-0.693
*
* @example
* var y = logcdf( 5.0, 2.0, 4.0 );
* // returns ~-1.022
*
* @example
* var y = logcdf( 4.0, 2.0, 2.0 );
* // returns ~-0.288
*
* @example
* var y = logcdf( 1.9, 2.0, 2.0 );
* // returns -Infinity
*
* @example
* var y = logcdf( +Infinity, 4.0, 2.0 );
* // returns 0.0
*
* @example
* var y = logcdf( 2.0, -1.0, 0.5 );
* // returns NaN
*
* @example
* var y = logcdf( 2.0, 0.5, -1.0 );
* // returns NaN
*
* @example
* var y = logcdf( NaN, 1.0, 1.0 );
* // returns NaN
*
* @example
* var y = logcdf( 0.0, NaN, 1.0 );
* // returns NaN
*
* @example
* var y = logcdf( 0.0, 1.0, NaN );
* // returns NaN
*/
function logcdf( x, alpha, beta ) {
	if (
		isnan( x ) ||
		isnan( alpha ) ||
		isnan( beta ) ||
		alpha <= 0.0 ||
		beta <= 0.0
	) {
		return NaN;
	}
	if ( x < beta ) {
		return NINF;
	}
	return log1p( -pow( beta / x, alpha ) );
}


// EXPORTS //

module.exports = logcdf;

},{"@stdlib/constants/math/float64-ninf":33,"@stdlib/math/base/assert/is-nan":45,"@stdlib/math/base/special/log1p":66,"@stdlib/math/base/special/pow":69}],52:[function(require,module,exports){
module.exports={"expected":[-1.878257231933404e-6,-3.3333212580416467e-6,-2.5734776782694348e-5,-1.2355191547649857e-8,-7.311199653335626e-8,-4.610205778913566e-5,-0.43601832448981176,-0.00315732192737485,-5.77761655924826e-9,-2.1715367497689802e-5,-0.00070690686695406,-5.0040501127089415e-6,-1.5787858550654643,-5.153868983997572e-11,-2.216935042373457e-5,-0.9981060975498819,-0.0004904981489130132,-3.988069199107638e-7,-0.00024409323076574418,-7.061888740501658e-5,-0.000113001076653693,-4.48302004607806e-5,-0.016653270960521507,-1.1841816704542483e-6,-5.632356901476051e-5,-1.460081260166086,-6.568919097078831e-5,-0.0493495424709465,-0.009224523646271134,-1.8835866290264502e-7,-0.0017842065378348396,-3.2930739035014076e-9,-1.548178241563972e-12,-3.7825106317869115e-8,-2.8942311847892148e-8,-0.07142716729479068,-1.749339929913403e-5,-6.515893967887333e-6,-0.003647858449921685,-0.00024340737195135143,-3.065778840516669e-11,-0.0002892594585658942,-0.23916116854274516,-0.0011813514933500147,-5.312486974636133e-5,-1.2664139468780313e-5,-0.0019515661425410723,-5.174493575275915e-6,-2.6361357274877814e-5,-0.0002174222106920145,-0.7265060674757731,-0.1777865903933512,-1.0146678026711835e-6,-0.25448460332327727,-0.00026540249809960164,-7.124861463711232e-6,-0.49969469036855113,-0.016795369571151027,-7.805290461960242e-5,-0.0001122300492987309,-1.395581619601988,-2.3054477240584033e-5,-1.1538040985823013e-9,-0.09400765951633734,-0.004040266133987811,-0.07242177452566126,-4.105033360193681e-6,-0.031199227081553118,-5.868448819805728e-6,-7.062328792570885e-9,-6.733602052390946e-7,-1.235598226951239,-0.04103867514560513,-5.330412095405391e-8,-0.023149645091066345,-3.605577975128626e-7,-3.5859182905265894e-9,-0.07454397392321707,-4.806210609610887e-7,-3.1828028662336326e-5,-4.008524481604316e-6,-8.999648759458098e-7,-2.885864454564045e-5,-4.3467602254664646e-8,-0.7297620132294652,-3.184032579345873e-6,-0.00033669633211232906,-2.077625778355299e-5,-0.0026630746318364604,-1.123761184719713e-6,-0.010126153962022346,-0.002566557092286447,-1.2757528272665372e-5,-8.63010241719806e-5,-2.888118988210699e-5,-9.804805160866288e-6,-0.9861297177464542,-0.0005665499358337148,-4.61987330840685e-7,-4.272419525591138e-6,-0.6420151896984586,-1.9667700508183913e-5,-3.71307997461838e-5,-6.987835646180171e-5,-0.0005889410196057076,-0.001985540543464745,-0.0006279537269860025,-5.475832807959263e-8,-2.9106855791864023e-9,-0.0026520956525657845,-2.5373472253707808e-5,-0.1267644774082041,-5.860387731316354e-6,-0.00012317359712508337,-0.07273480990419957,-0.00017101661255265375,-0.005664859216955643,-0.0001812913845856775,-6.7525783999579016e-6,-0.05612897231949306,-0.0021899637396809862,-0.0005715243650739775,-0.0472151472356039,-0.07900055787297072,-0.00013282053579257054,-4.669819461682787e-6,-1.5516941094882392e-7,-0.0017332944113633228,-0.6371522503220057,-0.03360682576528809,-0.00012442145254623884,-0.00012253032648640294,-2.109333344140128e-8,-0.06280633917256678,-0.23496703443263453,-5.123364098691634e-5,-0.003482810488796013,-0.0006375098369545542,-0.22839005670199436,-0.001774676464379205,-0.016061412668011348,-7.232324757651646e-5,-0.31662280096067996,-0.00164274924796578,-7.560813532405485e-6,-0.18338696975063284,-1.4560469871803923e-8,-1.3418406127203062e-6,-4.45149586975896e-5,-0.00015922839081043924,-1.5987819521333878e-6,-4.960122233642897e-12,-1.9763422650729652e-8,-1.6049595448213897e-5,-1.510799158615969e-11,-0.7232863529476172,-0.00010914120110092928,-0.00010314822866431811,-1.3198459083095028e-5,-0.003432023257548265,-1.1401372360826065e-5,-0.24762055094238877,-0.03030864679699416,-0.0010231736991168556,-2.5235905347553774e-9,-1.5518853827434545e-9,-2.713025367414406e-6,-0.04062637341729076,-4.9950333764184156e-8,-6.014859021628803e-6,-0.009405000333556145,-9.106356167829553e-9,-6.678582287965513e-9,-0.0033157214980584354,-0.021214764560999914,-9.295192227437235e-7,-0.0057546501019071685,-0.004775884061374137,-7.729800983191589e-7,-2.1800122300335992e-6,-0.0007219637610133288,-8.047427779627228e-6,-6.358422456677654e-6,-0.09928713415068224,-0.0009187818448938658,-4.705104158664425e-6,-2.990166891936121e-5,-8.487680505443377e-5,-0.00020254558734872702,-0.0010564335339234888,-1.1210539658232855e-5,-7.885214367363965e-6,-0.006250833335258805,-0.6344269477490985,-0.007797487512176168,-7.26325515126315e-5,-1.0319349486461775e-6,-0.0005536066374051875,-0.3717285399509635,-9.68001814257822e-6,-0.00020774508785452946,-0.15119019588797752,-9.913563575926222e-9,-6.853722115831961e-8,-5.7261283921980164e-5,-0.0026155838376334234,-0.006696089054037435,-0.00035438382976779077,-4.455503924343575e-8,-0.013848623927087654,-0.01618659286623431,-0.00021109602873900694,-0.027795772650252567,-1.731038997614179e-5,-0.015540245560271657,-0.12960536039781936,-0.013810792728174287,-0.014294306218878517,-5.702584316949513e-7,-2.354099646169969e-9,-0.0001672321308978988,-0.00035894456755001744,-6.237167969093215e-5,-0.0046015672114483475,-6.326061176095736e-5,-0.0034193633125409718,-0.06196948068504907,-0.7825764479638074,-0.00013001962943881532,-0.00020720547615683715,-0.005923631486578626,-0.00014548416117299875,-0.025924732755616815,-0.0019156932205728896,-9.8094011818011e-5,-5.790593638449864e-9,-0.23253332047114775,-7.665305770667796e-5,-0.30389403919814517,-0.3594219573798431,-0.014804378684550456,-7.922477267080229e-5,-0.05985536247974304,-2.5723747392267166e-5,-0.002091233425671114,-6.446233194598298e-7,-0.0003528333129490621,-0.6190163504034276,-0.08829418662414402,-0.00015012834825945905,-0.08074276024575004,-1.1664161498494787,-0.4785917586564723,-0.0003920947682055246,-0.000779058106857884,-0.010971256812149312,-0.00012269626249745893,-5.814629798644764e-6,-0.00011719122198885774,-3.975818257157243e-7,-0.00813787552380176,-2.4990692162596546e-10,-0.10330697632635782,-1.7175354376986825e-7,-0.18549842614041195,-0.012648043290357501,-0.6524961908146897,-5.2589269597376774e-8,-0.0003373897461232608,-3.434141436089345e-6,-2.3210881576191685e-5,-0.1739211535714071,-6.958503678707743e-5,-0.0013285269800583264,-7.249086463007788e-9,-0.0036315932518153665,-1.827890250932014e-8,-0.6792855506817761,-0.0017052680519842162,-0.08588300934553017,-0.00028132947257043876,-4.6416666020273585e-8,-0.0002597342354661584,-0.0027809119411395297,-0.003049052599424955,-5.602232177615931e-5,-0.0012591349869469101,-0.001818615123077124,-0.002478132097194296,-4.301834424706989e-7,-0.0002701671893702343,-0.21641180290009768,-0.001014984229893657,-3.5435003157366715e-7,-0.0006634717919742504,-0.042505442234162596,-0.0114232757132451,-0.000330177589296299,-8.141057387455478e-5,-0.39437760058646265,-0.004821968856231716,-0.010430331489470843,-0.026486349973498843,-5.628219979632799e-5,-0.0012194181154281775,-0.00013658656105006286,-2.955385806130875e-5,-2.8059708706321137e-5,-0.0029696968276732103,-0.06009427432153742,-0.0016593215915716086,-0.006119928445951083,-0.21068594912519664,-0.008686315611835606,-8.43770711801703e-6,-0.00032090065473338995,-0.00012515007608359112,-0.06005820932004815,-0.046025428367392304,-1.8692020387997437e-9,-0.17807055830882326,-0.010202586203354761,-1.2422198474706012e-7,-1.6846059997871524e-6,-0.05566672481784455,-1.9167522015250685e-5,-9.30107671017937e-8,-0.3612223512051619,-2.035927421962274e-6,-0.004823533757025966,-1.1111144269697846e-6,-0.13621498607432286,-0.4336165210143983,-3.687199641793968e-5,-5.210459565697678e-5,-2.2273028828427172e-5,-0.9621929386611865,-3.636837543003688e-6,-0.0003470061153477383,-0.0006037942384106273,-2.4868933480162373e-5,-7.28012590646939e-7,-4.842109263088556e-7,-0.0002947960897968754,-9.689153531201736e-5,-0.1372986625393217,-0.00030243197514377197,-5.966926191232257e-5,-9.794073368253407e-7,-0.07877942956171725,-2.6156479855183214e-6,-0.004788598302186884,-0.00011398583835342664,-0.0007364393825041743,-0.0067350967116462926,-6.302738343782268e-7,-0.006924167085080662,-0.013834711877566505,-0.00020584041993243195,-0.06195512222750001,-0.04271704956202284,-0.00039602051750390715,-0.2953868393540683,-0.00100830820969751,-0.00031792160677172703,-0.0018978275871501607,-1.1612723653187332e-5,-0.005505927119120108,-0.00014607359468862499,-2.5556992030978803e-6,-0.00020878981867480828,-8.664806528084148e-8,-1.3188675496005676e-5,-0.00032155927131642003,-0.00693180027362948,-0.02034962581241064,-0.009781030687076506,-6.423119699150855e-9,-0.0018650180866140128,-0.05412162591333504,-0.01939703325456513,-1.4498980842009502e-6,-0.44156633885608676,-5.479914702883054e-5,-4.687478266089471e-6,-0.018583588407768862,-0.0019700704687354506,-0.13019890945251864,-0.0006397306386291316,-2.2060971609317574e-5,-0.005312712863004747,-5.394474662599738e-8,-0.2050661692437985,-0.401894626165779,-0.011554216927201193,-1.5358205617511252e-9,-9.579891673146778e-5,-0.03218779538962712,-1.0097038318149872e-5,-1.5975850219262092e-5,-4.505908059892258e-6,-0.022257143972658492,-0.05467997813562844,-0.05406735490538183,-4.736547374317416e-9,-0.11753063637873398,-3.6797989002469924e-6,-0.027770677564221927,-0.0015892276406203095,-0.0035160598546570506,-7.259608304174948e-6,-1.815389790276583e-8,-0.15911605819405902,-7.116975583096938e-5,-2.088027291172047e-5,-6.865779769567534e-7,-0.011434784699288221,-1.830970031531418e-8,-0.0007241677438329888,-0.002461616861872419,-8.198103334020058e-5,-0.0008233050930786091,-0.004738065437322903,-0.0032652364932574253,-0.24652633620802078,-6.374796640218383e-8,-0.0003362076164593554,-0.05603456720753115,-0.043151277394654186,-0.0006075107174298442,-2.6354681556793075e-6,-6.701680385280117e-8,-0.00018939682335683317,-3.8650171095038895e-13,-0.000174107268738359,-0.11304928617625815,-1.2223314304080237e-5,-0.00017291542559432974,-0.0010006330047619522,-0.4966732499931651,-0.00046442090724567285,-0.001043600969795677,-0.5755405908778793,-0.0002476217463404689,-1.3687268875395415e-6,-0.0581596444985173,-7.452375092366635e-8,-0.00025689883768767577,-0.0059972850861245265,-0.01612351292100095,-0.0032710324557329758,-0.03415229662751062,-0.06858325057200548,-0.000927428902490044,-1.3022711291818883e-5,-3.301765875131883e-5,-1.430686642149815e-7,-0.00011680092668708749,-0.0031827196767911935,-3.871817299979232e-5,-1.855769363150653e-5,-0.11484727951332335,-0.05219695740207081,-2.6355392119508697e-7,-3.382611483935351e-9,-0.01816614028816466,-0.006336834521135745,-9.191087578474404e-6,-0.2389381790360326,-0.16074663430181693,-0.002290677389240308,-1.4607149896952559e-8,-0.022834957891537232,-0.0002737969448898784,-0.7532846472318478,-1.7803593009124792,-2.9207873566717466e-6,-0.09082367255352955,-2.7311601164953846e-5,-0.02154822270842159,-0.000391057575083683,-0.11739585750925968,-0.0006460579000422971,-6.723909845312914e-5,-4.67630998873337e-7,-0.0020932899934013715,-2.0192321734991184e-5,-8.252785498890384e-7,-0.10438136745422721,-0.19135982848121913,-6.045248847119017e-6,-0.0008147349396030427,-0.006073592901587356,-0.09056476090832008,-4.365510983815019e-5,-0.0005720835678835993,-0.0008436458638011737,-0.021592827091537252,-2.6607240997935108e-8,-1.464751528669286e-7,-5.093952776096872e-6,-0.13500613342527887,-0.18114521562109775,-0.14825965969106622,-2.1900112597803815e-7,-9.52544713720181e-5,-0.00897636462256773,-0.003887631611713148,-5.804264412262838e-6,-3.1488648438708573e-9,-0.033124478812673726,-0.06238674639822727,-0.00023926608165023377,-4.328800766457288e-5,-1.5687093265434557e-5,-0.01530063345173477,-3.1029910439637514e-8,-0.14904920068815106,-0.11474177471021382,-7.712040682021113e-7,-6.504812334838953e-8,-8.253419705740339e-7,-2.2523163241625273e-5,-0.0007120180639483275,-0.7515104502147628,-0.258548344343343,-9.6104778411143e-9,-1.0221061236760939e-6,-3.991174511420499e-9,-0.06453705370035105,-0.32521648822207083,-0.00016075515063620834,-0.02351835419117028,-0.00018647594552118543,-0.00016383091593932643,-0.00011435431506406042,-0.028929412689255703,-1.8819773331882578e-5,-0.08273461724092994,-0.0011375084181627847,-9.998843231181133e-9,-5.1873893568688396e-9,-0.03430578448516013,-0.029036752556557636,-0.0008958760344373132,-0.0013299906998347434,-0.07808647800966101,-5.18578357928395e-7,-0.09568232646669331,-1.5353953562355875e-11,-1.7969588640404492e-9,-0.11425371605179903,-0.004126898183969732,-0.006648511086026353,-0.6355661051352132,-0.011632968113258058,-0.1784970293639608,-0.007011304220192004,-2.1226089877039763e-5,-0.00010787619753559131,-1.3383236709561783,-0.00011398555241326234,-6.637870156668367e-6,-2.6195111011493907e-9,-0.004999155021299662,-0.03238513259399179,-3.469577327906727e-7,-0.0005267252440772929,-3.6612113834867166e-5,-0.0020822194713981325,-0.00016021032314850956,-0.0002012589453978542,-1.6461608518609827e-5,-0.00011903501889268035,-0.005360442180234766,-0.02114511129798475,-2.0691184621262283e-6,-1.8629051669336474e-5,-2.167510170670195e-7,-0.00026382757240314025,-7.225710297074086e-5,-0.00012681869803900483,-0.02139572735067049,-8.58513231384653e-7,-0.009055241344339523,-8.399959674169356e-9,-0.012619002980036481,-1.3730215247748645,-0.00018104785704442804,-1.7431884087001662e-8,-0.0738123619571353,-0.10544000233601165,-0.20480355359767077,-0.0011663342236712473,-0.01588118776736578,-0.020111317563593554,-0.2428992850289499,-0.0033988565506610016,-0.02160561414750217,-0.004725230899878348,-3.6761854591956414e-5,-0.004684004855193846,-0.00018773145485948402,-2.374692196411794,-5.080562270272601e-5,-0.041009884916200265,-8.002348821546079e-7,-0.004463922587008708,-0.004833537347751299,-1.0839840420861635,-0.02985298273317895,-9.812936442902239e-8,-0.09350745551625939,-0.04889022780683987,-7.323999105274007e-5,-3.9916333319025317e-5,-0.0013991353518154248,-0.012781650993415971,-4.189937153302836e-7,-0.11705733245881365,-1.326528160103513e-7,-0.0006130456818280042,-2.740089173233905,-0.33678236183153154,-6.390967925000075e-7,-0.7104796166753543,-0.6908069452038941,-5.688034114505181e-7,-7.188695559495645e-10,-3.117592347687061e-9,-8.895230702375496e-5,-0.4605109854850047,-4.2141572339222186e-7,-0.26441031566774137,-6.298901961445054e-6,-0.0004692489211898804,-0.0006780017715052224,-0.00014327347166078616,-8.205065612138294e-7,-1.4734588805647134e-5,-0.2979667363920051,-0.010963954338599426,-0.005856592403039101,-0.013028310696728012,-1.8717437536653715e-5,-1.0524335648883329e-6,-0.00014370250175007972,-0.0001976124317026365,-0.008746293809332475,-1.3567317928632545e-5,-0.00022332513463930144,-0.007896016114806077,-0.0001022435222919915,-1.7098099875062036e-8,-0.38375987856527904,-0.00021042833861848462,-0.00015347245335645905,-5.841427414490492e-6,-0.0051802216744075945,-0.004487530456857168,-0.004872799036801729,-1.5499809861829405e-5,-0.0028181657160103344,-0.004159776421428201,-5.939074311457833e-6,-3.03546206053639e-5,-0.0007843894416443036,-2.009731196313391e-8,-0.6061180622982562,-4.096386301546959e-5,-0.00014790792338088095,-0.0006276038145267854,-1.8249022604453466e-5,-0.024815852417883075,-9.189299254622443e-6,-5.2685500083305496e-9,-0.01328611809633244,-7.940292461591711e-5,-0.019750438291297648,-0.0007547113681664432,-0.005031551293688164,-0.0020535687376235915,-4.92687653823059e-6,-3.032524451941602e-6,-0.02486579197355791,-0.055351638707043495,-1.9104734006168007e-6,-3.7461131702861728e-6,-8.903857369047872e-5,-0.004530095470910646,-3.647045453138105e-8,-0.0007834733123696719,-0.0024370160461661245,-6.00602365847245e-6,-0.3711944041711933,-0.04974897673110031,-0.02192472606531963,-6.217945594135226e-8,-0.006947273552598454,-0.012725162144330199,-0.002167798217461588,-0.001169762987350467,-1.9702200909424356e-8,-0.0029499828758857666,-9.229553372147387e-5,-0.009678234391267337,-0.00022828665938105758,-0.0366181869665231,-1.3881113747721787e-5,-0.0001307081126356911,-0.49239231048044996,-1.3265442350259797,-1.3416236854353403e-8,-0.023329099869623976,-5.863553087989119e-8,-1.2998264797581975e-5,-2.4144042659042234e-5,-0.06381598065720738,-6.368463027799338e-5,-8.796705298618142e-6,-4.486591946892293e-6,-0.09790889053031518,-0.04148698103277534,-0.0010094604181844203,-1.8266786002578806e-5,-2.6782580181835702e-11,-0.15179718814445006,-0.024847636864648914,-7.410824292077749e-5,-3.317973554319199e-6,-0.0009548553193966549,-0.0006093218617260783,-0.017779535953326497,-0.017241285243642195,-1.0883732959302265e-5,-0.01796233007366822,-0.0011882274079107345,-3.172551157394928e-5,-0.002097524941178077,-6.12302902880339e-5,-6.631423688968224e-5,-0.0023894486837837637,-0.03785663118535871,-0.0016134952902549995,-0.004723201330613089,-1.0371797667981261e-8,-6.018167770280844e-6,-1.7419573462426825e-7,-0.00038335838203566665,-0.08445967230805994,-1.8896919525260205e-5,-0.0005743413342207583,-0.0002655394908256625,-5.09293834674095e-5,-1.8151375675199785e-6,-3.2661096080708854e-7,-1.901099983582479e-7,-9.905464565102999e-5,-0.0018381915932980013,-0.06310756351984105,-0.0006366252850157354,-2.145743555058102e-6,-6.595324875134344e-8,-1.2010593743140234e-7,-0.004036029572907043,-3.19124621488233e-6,-0.04749669584345177,-1.838317055979846e-5,-0.003246341096323471,-1.7007755361481226e-6,-0.008798853214528243,-5.8021167761973806e-5,-8.502051415199168e-5,-0.0003138363863267719,-0.010422890145406427,-1.3219403958873837e-5,-2.632947052690981e-6,-3.279256147158973e-6,-1.0095031642597244e-8,-0.0003632217615436,-0.0003800050832095356,-9.323596917412925e-7,-6.850483873645147e-5,-0.005993361208041473,-2.7222595569780008e-6,-0.0014839817067940342,-4.089313119958035e-5,-0.02943617068067445,-5.909748228729964e-5,-1.0160195158242073e-7,-1.555370164109194e-5,-8.7637118782336e-6,-4.0625948533070255e-9,-0.00021392932155123628,-0.0003526338329067124,-0.049781947423657186,-0.03678342235653635,-0.029007849026989146,-8.742906238438673e-5,-1.0909996690954204e-6,-0.003596774881920118,-2.521877706179205e-8,-0.017861157807227097,-0.0018265700136374005,-6.842266698612771e-7,-1.0433195401336224e-6,-8.560077678998226e-6,-0.0013454838241321462,-4.839785277275679e-8,-0.00021678660742296128,-0.013318851377516367,-0.003938384931464365,-1.2986216853229868e-10,-0.0022826870962399876,-1.814067625041013e-8,-0.07734197111795907,-0.5101368797616594,-0.011616448847191008,-3.429047029321199e-5,-0.0784243670661289,-0.002549620336230858,-0.011496492254706347,-5.017134529913585e-5,-0.6971362130913766,-4.670229044096833e-6,-0.016604742076835405,-5.344978436345306e-5,-1.0274611436337077e-7,-0.00044510042265487196,-1.30247306449388e-7,-3.9305303845036276e-7,-0.0002788953010538267,-5.0902062430291454e-6,-1.322631672969597e-8,-0.21465037010488675,-0.00036951056655271217,-0.07775005154243436,-2.867232137123363e-5,-6.400362451981853e-11,-0.0005964237446076552,-5.864960082929667e-6,-5.494412592333715e-5,-8.141756578430869e-7,-0.02218727825304181,-0.007888827851640454,-0.00013270216717391794,-0.024155272048503543,-0.0015471576064613047,-0.04546382651924371,-6.228587926415465e-5,-0.08564558134793063,-0.006364999038708545,-0.0013960358969530187,-0.0007889429297510191,-0.01704073719948578,-2.78765898470229e-6,-0.6457565867414132,-0.004368623895899202,-0.01418597593613463,-0.014176643157002903,-0.0003157831943280533,-1.1445749844784217,-0.02317714765803301,-0.0010088740917964577,-1.0237528376867194e-5,-0.10509927628327126,-0.0011385554455470744,-0.18187415736601306,-2.4429968419246303e-10,-1.1027949601239566,-1.946769183103912e-7,-0.01876041567818749,-5.896549695157126e-6,-2.0767385073386063e-7,-0.0068562332416769855,-5.107737332409024e-7,-0.0021663500125977805,-0.0005819414967045377,-0.0025791146136679996,-0.21019360446567154,-0.035594215652806946,-0.16860580679178513,-0.0008671053813431819,-2.3216493115025348e-7,-0.014181161075814238,-2.447662646647885e-10,-0.03527340146663289,-0.00024141268263957108,-0.000933771336236904,-0.08065954376497345,-0.2732388478368678,-0.001725694039620914,-3.19463434271476e-6,-0.6539725874282495,-4.985866218842117e-10,-0.006447084174622482,-8.181826628914614e-7,-0.004265309267442497,-0.018646470367825376,-0.05619311671603301,-0.09543922059250509,-6.2757154389935605e-6,-0.0017178741286801454,-4.591703438213013,-7.632204979659735e-5,-1.7634575059938007e-5,-1.0227725429841677e-6,-0.012173599760561832,-0.02052772846647582,-8.994845315359501e-5,-3.7661091394190864e-7,-0.0008273483681851284,-1.3784036912473077e-6,-0.049817623077294704,-0.003908132605581161,-9.455744242646517e-8,-2.809991924186096e-6,-0.011552488984395487,-0.763912079528529,-3.725475939355923e-9,-0.00015478486671981518,-0.0003367821008623588,-2.4999430646483125,-5.96964287838262e-6,-3.0953629189095464e-5,-0.021888468753707136,-1.8772628358942576e-9,-1.1935137028673709e-6,-1.2207613950684478e-5,-0.00011904421501058987,-0.0016178339183074238,-3.624702039028833e-5,-0.0001260649772796366,-2.805575218347275e-5,-0.018109522226926196,-0.004558130430195596,-0.06342126980393017,-2.336855021447538,-0.02377658325601253,-1.2809964142208956,-0.0013427183551499504,-0.003390989976252939,-0.0006321173237350821,-1.1989795835123492e-10,-0.0003164672567967444,-0.010478368124259401,-0.00013113655649769004,-0.0007929496717300389,-2.5143412345147784e-6,-0.0034088994853234897,-0.006615055926347416,-1.750538924536892e-6,-6.601033170264619e-6,-0.00886092728776622,-3.208029503071387e-5,-0.00020285313850655864,-0.0012568773140936432,-0.0005913490301989958,-0.002746487284290493,-2.6269713216481793e-5,-0.012010662426960793,-5.019195390081589e-8,-4.033169278332514e-9,-1.5740430649441124e-5,-0.03698703585609519,-0.021260139266742792,-0.009955122509077074,-1.6561803868490802e-5,-0.00336559334137673,-0.04644668539145344,-0.17916038826597336,-0.12248021903824387,-3.615490069943673e-8,-0.009883503799622013,-0.01940080858873839,-2.5423351981781386e-10,-3.113389149096169e-5,-5.481631900083048e-5,-0.02149101427665026,-0.019620874363955678,-0.0002790226437297768,-0.019207852249141972,-0.21678675665798408,-1.7485871289626142e-6,-1.3649047199299668e-8,-4.282673100803992e-6,-0.0004948079474018207,-5.488227025110055e-5,-0.00029654691026378353,-8.151302064747921e-7,-0.010449613183870636,-4.543039869058687e-7,-0.008110670450054728,-0.09035825451656433,-1.81642244849281e-7,-0.00650816182725029,-0.3171837932589714,-0.05405800790483239,-0.00023494894941431863,-0.26469400936736365],"alpha":[12.50293942521417,29.990321418376695,17.415364578021748,21.711292950246197,28.109129733412857,17.16074371173363,17.873898379533173,10.813276061047166,21.960114405693663,18.667277533323468,12.5004930636366,22.429901241815465,17.088220183004804,26.865788929698663,20.536711779759898,22.384268886333622,12.67804207072901,29.802592369468137,19.870145407244685,21.340930398797337,12.841746592635355,23.52139080080682,11.891785287435205,23.89872878898752,20.956426644511865,19.200821305276644,23.820966374152306,15.381662033118438,15.660968846780312,26.762965349414646,11.580819890401024,24.06836579160383,28.759453819100163,29.391035674511766,29.260647045295592,15.112825584774075,22.096269055958018,24.722988468106347,14.072784498672029,22.01865392676082,27.879359040488048,23.545336381330657,28.748948072904458,10.19629778683937,21.432882750284765,16.84139805403836,12.382757065283538,24.663653279134962,18.826235883014263,20.478504784152825,26.41654267270184,29.259460148247495,26.63268962041528,11.908092796009772,15.980297410002215,21.31088222042144,24.190129973834015,28.398303834813795,14.64650998827246,17.6548101183121,15.562603193942227,29.090170308405998,27.3198111564193,18.462610155288857,12.456886742197625,14.138867602437543,18.309988633374413,12.530561194070984,16.216654440703007,28.509686934820493,29.818833332243038,18.42684336260159,15.59297531052155,26.823998554515065,16.990743220733485,18.689373029896437,19.08959237740939,18.27397966312374,15.936366420048657,27.40426622990811,29.572602373566074,21.610944695501807,24.883500572378377,18.282691249310478,11.89419229219856,24.849765389780025,26.19132465490793,18.315029017095057,12.37873484790268,16.85085353398985,11.056315083392096,18.998419018788773,17.73961127901864,14.534625699352976,24.31497703686512,27.23985228229512,29.425391190489346,18.733283653871627,19.895261612958866,27.728417624372167,23.38694720149747,24.625161930323568,20.94631036770011,28.594017346251043,14.995953359594015,12.37044991120801,12.095024138993345,25.771730306736874,21.951179298992606,12.05088263221571,22.20655633609846,12.595574445741327,14.331872523655456,22.75166830413585,15.440094542239988,10.126814786685024,26.272962923566862,11.830302005291685,23.548435208813064,15.102107681808343,11.584025808549825,26.839829966389388,18.331564973881775,14.921687012438639,17.593101238329815,23.438025727008945,20.012015618299426,16.923911109399718,22.654375208193628,21.702419176530615,27.33374399056588,10.706842163400125,18.192260696107393,19.438809126731414,14.506862400423458,29.250114735453792,28.67713700336718,21.656876372255418,10.076287002226758,15.6569500156596,27.65622915524585,18.76673180525576,16.506039072254982,23.425408561087615,21.886054433183055,18.014885876752164,28.089199149112375,25.544523277028055,23.469129564008103,14.381819095218486,25.33509358982482,25.013047041395502,29.612957833262552,28.515315092962737,24.877637077824055,23.29085707986803,17.88054577738796,14.690590608837146,16.341181071463524,19.070507582848045,29.96760020611334,14.483639939663032,12.190037451264772,13.902568827501058,21.619548337204748,27.576888994398416,24.24851181279328,13.155589717353022,22.07202111354008,26.684776026003604,29.081496201645646,25.748536424176383,22.525495980983052,24.827384756320292,13.980016478279822,26.350655189755912,22.776145259647645,11.12771251729801,16.535429373036706,15.683645196554053,16.245912800696818,17.796354449447264,26.061032748580125,28.08460072704159,16.427099382674626,14.292107379867595,13.810182318901706,27.73733096671488,10.645023944430854,11.555989174479988,28.004017322934743,26.47764060213102,14.726712019036023,15.61568290643315,21.357989370503763,15.270802856670018,28.58461150438819,23.312303706733996,24.456159500962986,29.65818786705803,18.548402163673572,11.5879961837177,19.769864261234133,28.783756757813777,15.639645599601689,22.546632517003108,10.274536573573304,10.277820779982822,23.34699336166979,16.223192933175877,16.355934358267483,11.421958986028912,16.43100380088736,25.638954147718962,28.942503280669545,13.687610432483893,20.96759002079098,27.33094928953828,13.275496091878445,29.380017719695424,13.568395110373949,12.401191853543194,21.52840816048673,20.930002356357427,17.134297170670276,13.574352684915345,19.2513109489187,12.874336442933117,13.092712731905687,18.83844824540605,10.45853266259467,26.1321357722106,21.72053402792795,12.009091222599917,21.590458011945373,27.41000153728955,15.13365350934909,24.08518794296803,11.385191344706268,15.842929361401943,26.679768258841587,19.408002188133217,12.682452991875856,18.034543666942998,12.261019952815566,22.776530013578522,24.48090276205745,13.456943863740513,29.512033635007853,12.6790353218145,14.086731696968627,12.085675662162156,16.299101318863784,19.273355750915456,16.090952686395003,12.021237097810072,29.074313781321578,28.220439716956154,19.068624867558782,23.894987757484042,18.250328332556958,29.031253775429285,28.172992928829412,27.898275070881866,12.790918800394223,24.73572502756076,14.489580542361043,25.092136505771165,26.009418478549875,16.392571725504958,28.25465306876763,27.48442676842388,12.318940214811498,25.0051634564428,24.90917059786094,11.515454295734893,26.5242838413771,14.934710687146445,13.551953971144805,14.807209773741729,14.067445491346602,22.227754725714565,17.647336237019484,13.468163786704093,11.698696605265123,29.63877491626578,21.327402293574664,14.850572638784048,21.407426740007445,25.401917977223725,18.643961850610587,16.409823000871842,18.80713461518535,28.174996952390558,15.250344952598791,20.382816180150215,17.960154769017382,28.99801043966348,16.471098521459552,24.493262627319027,21.239067685595252,19.668526255686814,12.623556566607967,14.599615552617578,15.609255182885544,27.036742571191944,12.685852118092487,23.596236338456286,29.09112939125488,20.88396496775813,25.588941520728387,10.306609404614777,13.836005290501031,10.978171683143785,13.770445317441297,11.692312116638917,22.706012466669712,26.91852625482564,10.581398692268804,23.77578524561099,11.87490827047748,21.95609502083315,16.518906280694306,28.741091755056416,12.65738395152216,15.364905517674817,21.39797008068235,11.144336198562325,25.922881780542344,10.187549953702346,23.874224389814707,18.495902125577977,17.78402054730631,17.355201089776,26.869361663029885,24.148186816705977,10.934703637487196,24.17680789059304,14.047394327022191,22.059021080929085,16.64953016553872,20.39182884313245,23.276416512188682,23.887565207214045,18.726968057038004,13.100193890922537,21.714837370584586,23.866583918753467,20.133190465007274,14.349027606914039,15.797530133231191,20.477751461110117,16.89751098429045,11.166580721598107,29.206308463412736,24.243797370308855,12.966573068982644,18.110800543565574,13.039147732756042,14.317520594741055,10.756470396801504,10.017550966614671,18.65084669044268,21.493705833769425,12.659273590888516,29.74295640373496,14.73563679370165,26.72661518379794,12.92968986694174,20.869271598029616,12.160657084510284,24.277098248308878,15.701251883639049,25.12257949801644,18.270382283859767,14.4592884452967,10.269505275842462,21.45418896278896,11.93059342131837,23.965043087075575,21.006270072185078,18.068087286057633,18.5908378690798,22.400384582237383,18.90413153184958,11.153913310624656,21.681322258652905,20.62731310116196,27.993178745713642,19.86758722063547,14.68772471269023,22.205993582086986,13.809170321649859,14.239018093023175,17.07865085649258,28.794294812554106,25.811373451718985,12.850482446423307,29.4998360143763,22.063660138909015,19.62347050406769,22.063704243338293,14.114495344496746,27.468252991751335,22.81157088669119,20.504404207710532,18.125029222388594,19.030507500935236,22.990889923685458,19.00103920971114,28.65436320736029,29.292603892276862,23.539608420836974,26.85385332361097,29.887009592147,23.17545935365589,25.148882769720654,23.55939875795034,26.241145503017687,20.530266452571464,10.865516890342155,28.952987623142413,13.264481078480369,15.08895775042339,18.706667246630282,20.946686410124883,10.279888719804928,25.819957654223717,16.117091549589478,18.331795977589877,22.57541814128494,25.78372407315605,15.014073813172942,28.968682770970645,12.37090150689939,16.412758425096186,17.347245145107717,19.11548382309431,25.219007852086236,12.91054296115652,14.401774574331817,14.482038640399445,21.26385346693432,13.90742182502624,27.776444786673913,10.474875277461866,21.014061881150777,24.439760615803632,14.95854168688231,26.890779736772927,19.81719664955685,15.26512707417941,11.517287967083117,10.561423939367334,23.076646038195527,18.02378475528757,25.20919528540803,19.691373154654578,15.924486305987129,27.249427248140638,13.661101127171126,13.278687561938135,29.266483719435108,27.583949349192945,21.896096504026158,28.474720032162494,25.556906907638744,17.308716750267934,10.21165205764433,12.169272802384432,27.701953465299077,20.270276353920494,29.760586725804025,13.26052908699304,13.804256979312157,19.287936061607827,12.850191538206332,12.149686037610664,28.805169961362633,28.765741648730867,15.959151771979009,12.406800429679619,21.92469532289905,19.246517216299694,13.782876272770427,12.298432469887256,25.664951796932584,22.80954494882193,10.60790430841383,18.25831417971707,22.936256934279218,12.750983850178068,26.177280117732735,18.721031313354814,19.789694711838305,26.33563910601021,11.962288299069673,12.648943357939565,23.093635175109814,18.493668727909046,23.10781559494533,10.932255818357284,13.036660535712148,14.706882027987223,16.48903175343472,17.157547432067798,29.881227200049537,12.398140434740895,25.536078304822194,25.58343517825852,25.84344832125547,10.43377421912055,24.972845774891567,19.018593173158784,17.44407022631192,11.56384886477332,26.62836598311347,15.864003379904945,13.903614605972368,19.237027858758793,29.0415253043691,27.655073074003834,14.019092181587505,17.676391003867273,28.83265880232195,20.889757888321224,28.93814825058413,19.46550317638288,22.909611674655824,28.73685225694713,13.77980443323433,26.698991293607904,21.931071894756165,20.81152402076082,19.16719292766668,10.752273588615054,11.698687616264593,23.453129925202887,24.925697787952007,29.125536775768673,28.719227148445725,20.303933376981107,12.250997240557417,12.839492520648697,11.87301226872243,29.519846395729484,17.17894010509578,26.72954421804053,13.671955952183033,28.42067382644673,28.673056342302317,17.588046649149103,15.236116140109687,18.86771618254152,21.351452352027444,13.316060055235507,15.268612585867185,13.644328798095806,15.804018071800234,24.708063716364393,15.442129373684628,17.26956209620638,15.316743660078785,29.30338001208357,16.361476992831747,21.219047376322486,25.085684583374523,27.442017933099017,25.976771504665845,13.332725533935385,17.293945251336144,13.859865483981721,23.125750838909212,22.131435698624465,24.886546207493264,10.243232203571079,26.235661455440816,12.583364721983523,29.864073641035134,27.11059295052733,18.878981595497034,26.222553472616205,20.981324663529644,23.42830794684005,17.91551624820314,29.705959548518003,17.439744212343836,14.18653071163786,23.568268035572004,21.606643428611257,14.671216552704616,17.24591649105082,27.790782102626807,25.36856457418064,23.86162749024622,23.669979435779997,29.628269121467042,21.54136937619993,14.338502098092277,13.433417267154976,13.243912616713382,24.724448325194576,19.223487306549565,20.75334026665386,19.00695263232656,19.034663211068402,28.122174629790052,10.464153135636423,15.787165087523242,18.663234262609407,11.983406369586099,19.36999912792694,28.880022383046352,10.225162071468015,16.396878497498708,27.873068624510367,20.662500522208767,11.681442034496762,26.700219225835845,18.005820651080438,24.8979620524726,25.272743939515404,20.212213007201854,21.084992175805105,15.833013116791559,10.752623668417268,27.051715345916648,22.52164607384036,26.86346277158718,21.31519865553216,19.298199841965555,28.25355039881518,24.788936041554646,18.910823704707845,14.242111170477996,20.453345785056033,19.16564903007199,27.73713755166204,28.669265625892628,19.931816025689663,10.348928638048207,27.33922344593755,13.856738087517835,11.144621054172505,28.061269453878115,15.478498521971552,14.169735635842597,10.18499517495246,16.02737062682316,28.820027750813374,21.663029710250647,28.616853949164213,10.07131273678031,26.668488183809416,18.62671149499056,23.49096312545285,11.089941876430096,29.147690614152836,12.315004012088288,13.762745286512125,24.836893172680305,27.435546515467344,22.974076061165203,11.8962851209483,27.640553982710134,19.75692141312574,17.945705507317907,24.71340236546801,22.351798608621806,21.860882310401347,20.95078243188125,19.033115225432347,26.724087503353715,13.879002595752503,24.481779593449456,21.06854373670839,23.643416855951585,16.660119031938603,12.058674152738963,26.540729894520638,29.098885502110967,12.957914868939536,15.52515001022828,26.706243727754515,29.135545429787456,16.500449955937828,23.84529864686485,27.208215575418638,23.6226271983813,28.289194708457465,28.853625230066946,28.834456008917137,19.27395423077638,28.077088056644484,11.03208251461945,15.693237266976436,19.175210173109704,25.206297951000558,25.747344058234066,27.552663970608137,21.955821173897952,11.224170595915561,28.732025828865844,15.849187667648955,25.610273047288054,18.269648694260447,19.44706659591242,24.483970448383374,24.674642997037694,24.09397519804566,25.110735314243126,10.42653054288143,28.577455988717087,21.86857976861491,25.676744842751503,23.654040050124415,12.789360418534166,16.4703536929563,12.122944980902854,18.697206719957798,29.22394657225324,22.449716443403233,14.781741118059003,24.980351353089468,20.49527721406388,25.196669891925644,21.258363792146252,12.462435320084065,18.00126257793314,21.70564427505728,11.186964590192439,22.013518144805317,14.197210519103551,29.688240088417757,18.316937699387847,10.83663251138644,10.830558360535004,23.212318681532306,10.066223418122352,24.87649411212224,16.0300864147357,10.35996625590708,17.0452365524322,16.184066236079005,12.8403143128631,26.44148761528363,22.93658605436083,23.686499546571696,19.36683305357757,10.091496260355814,17.82517678762384,27.814618100883738,29.592577230247784,11.812228432000937,24.582872120453843,25.716838546774717,19.276555593141637,26.801601865819062,19.932486374302805,10.343904558242055,17.282242871091622,27.147508885535466,24.242950748415364,29.484598610115093,11.931914264432413,28.03461970779667,13.07526976827019,21.02446298511561,14.144194572153426,24.224409482735982,19.484018438048267,19.742633904434147,16.93060443318153,10.617485918211912,11.482381757625447,18.67197832667486,26.50616821237103,22.0625156089852,21.176994210652488,24.36273845024828,13.19895699180055,22.217877981406954,15.367336916288444,13.387377873621862,22.192422044084253,17.825906332732508,12.842460347431214,20.432335071351865,17.81292079735985,29.88882419787837,25.320409816989454,28.825597013869068,22.570015810569423,26.58521401770637,24.24339705435161,18.625120649930274,15.776030891782069,10.093486812693659,20.022458453348353,22.232269005173553,12.858461930955327,28.489725545793988,28.066790200326103,27.172324162761896,25.51600241508503,24.922821143996362,24.54270865879196,10.407517166952989,26.265925610721762,20.643304550110532,10.362522262447857,13.490809536801969,23.44201796962174,27.298108585206144,28.03586341966391,23.036582903218495,21.49042318170536,11.362606200668921,29.370382978751607,10.83504653634618,17.336941546383144,12.97683308059022,20.345280263028226,19.159705337234524,29.47878513269725,10.198867392399364,11.345047458726567,22.910994305077303,18.181927699623127,26.527713280646278,29.185350258362284,13.444010497414274,29.904478024110848,23.578418703437855,21.68311794313621,22.405763725420172,23.207210745569434,20.93023894586147,27.2362992345057,26.84091950484166,28.041937919457332,22.875423951952992,27.197720346161294,11.079258825534852,18.333757468157756,29.228419185850125,28.298706598805726,17.50291413027902,22.999787298214383,20.520531956887353,26.718157453040845,18.389384034545078,13.93624791278954,20.423925802688775,21.276578092108352,18.204213422112907,20.232923094054726,13.505051711057071,21.01683197926321,17.304208110976994,11.509772987188196,10.714415431423244,19.03297682871571,29.221451331479983,29.273773599650657,16.130887165344102,17.023616701194626,23.065695453719364,29.09537509230495,13.874967430446791,23.61010051172681,23.507615296142323,21.928545119854185,23.02068804399913,14.289824047329297,23.67918291805948,18.06278561469444,16.02322371004685,14.331417639999241,14.488774042536928,13.493354781451306,21.85373644419966,17.921669791796056,21.254800350570193,10.727606306810955,29.431595918005925,12.571629120830874,14.9297587431569,23.806705108516304,11.376081114446572,18.00978072743669,16.480508512297625,21.311852541309023,26.024822653454734,21.946782746473286,20.86033109815518,16.129904447534958,21.734546617516784,13.849405966836201,23.76016156163546,17.482546030692752,21.92224180925299,12.220599837920044,12.202237127640828,29.106671953522714,13.22693803437652,25.880088115805158,15.705466527874012,10.682865656311499,18.138758781160963,19.38109221341208,22.541188945706757,21.989276620056447,16.35397548989087,27.31872882196402,21.51858310267802,23.326292171032566,18.576661271136125,21.05851501676635,27.054134994059382,19.08145937500473,25.215610617003364,20.814673552054856,29.769678022507264,28.823599553876914,18.66849046392366,28.581469584780514,27.449806212442653,29.179409233650958,21.10138764707091,19.937933474914114,22.70126919217138,15.275091277700131,27.37011845226849,27.587522074815354,21.085072967981525,12.006820667154724,27.096748190733074,22.483444258797206,16.548343246379634,18.246531069340136,16.604900180240886,15.722628030746137,27.975898339683674,12.549471070387055,14.065820530687233,25.734816963193936,11.405446934103987,19.46998272329045,10.951553399914072,26.99650328223109,16.66328427691213,19.44238226769332,16.20664007752699,26.800017676527553,13.498677134126837,11.839691869039012,27.302018716166923,20.10108344545969,28.209917472598846,12.593974143968648,25.935857733605726,28.69083254990807,18.240398165118208,29.747724866323836,11.532190079318365,11.410279898125758,19.082943845870087,21.041696473772685,16.423182657296014,10.338183709981097,27.056122131150854,24.512344748742265,11.454158399869065,14.58982107702456,26.419476180258165,22.064939229929635,19.98565251685426,10.748207728060542,24.46251834414625,27.885948652461718,13.164060942764998,10.161914318135544,20.75365844625878,20.147031015230805,15.306066139537368,20.466120821611035,25.160217749472203,14.110715418471056,24.594946812921684,11.304414830246277,15.773339321473427,11.089146734017831,12.608047460927555,27.216067379452294,27.726363364039727,26.484030807565325,26.88853070349488,26.947574587671493,17.232820450470893],"x":[29.601305083875403,27.668672093783158,29.316403420537277,28.76194339805815,23.845652106621294,22.38744813900351,14.107980712987565,38.7236180268717,24.674223302326112,22.329293814550493,43.79245658755369,32.54394241376565,30.239149488174494,27.925722971609307,36.07350622507255,28.807523096657185,40.42548087661563,47.82211054197428,45.48561057081238,18.74819942262553,37.40308761666731,35.8546167141789,28.635098953453166,20.508858308238203,36.42099395487066,24.871288864585406,36.204878502636305,14.465160802662758,16.237029003799353,26.132198336511347,35.26742251965206,31.881690355767578,27.973728466526296,34.15226253923831,38.231436157982145,19.261435547696184,33.98235625169715,31.880916868036557,40.15190666099625,43.40738707154487,34.401311664518985,40.25627136937864,22.38629557470576,35.65290427378065,42.20942739680832,28.890834471154825,44.05609628173029,46.51207444858494,20.42424290510433,39.030501620154176,20.781432259239395,24.739699066649067,45.82616731850737,27.347892166358815,35.026319059148804,46.22113155652842,28.190335469650627,30.324673137682815,40.783263653801974,45.282081904538316,12.801756009585525,38.823508620254344,27.686966840682043,24.8805143161779,27.325900473330478,30.280554905387387,36.85581607967271,29.29932291708383,29.104533968837103,35.978445621674005,35.29292050464374,24.760976716102086,35.09957177535501,33.309845709451096,24.32635171198504,31.88878562117051,28.44948041901466,32.23014073415456,32.18575253643505,39.64072789971226,37.55758892100229,35.02369019466205,18.53176578088689,28.428318498976115,18.500058603487574,31.083397656482944,25.308533365418544,28.202604184012795,23.11088823215778,26.799033656916013,43.99746868831856,29.665932318316685,39.32163390381908,41.90121861852064,24.12210616797499,39.14144577643378,19.347249652406866,44.01764746489752,33.961875177572175,26.71319301680509,26.159486401710346,32.41548467219923,16.997146341932854,36.40126872639358,43.73025919250819,45.58794259233753,35.78830805758078,28.894934190294403,24.98505506076603,31.35103126600309,44.259427196146866,29.771947894102077,29.541618322724208,35.28847606687657,12.486426697813648,33.84260207964803,34.40364219092269,30.812136055236095,25.738730655948682,22.89344656303089,17.044890363400064,15.939501093405681,25.74474140741249,34.708789837901264,33.176406956767664,28.45518370413161,34.403139047175316,26.78096781918062,14.946490119278865,24.830070246335584,34.427923423747,28.46440546350788,31.6948994347864,22.323570345298748,31.218298246853646,41.19503726403103,35.362864899565125,33.32816392235561,26.516642068877772,38.61895926851301,19.400326973549817,47.515602066498694,17.817876712658755,23.06672745973458,39.98402342065012,21.590580655925777,37.5927349182081,29.01262465140429,42.128157833591864,21.971058307260968,20.422482591475184,29.338192461261812,43.91519698526505,41.25451761484031,30.484919668752813,28.437972528553384,43.440033380629686,32.6307393958873,34.81792200592256,27.555677270553964,40.32709490159138,15.425901044454221,21.338532686051664,43.552884387343994,31.402175221952085,37.260274462602645,46.12044476796558,29.1666931530691,37.381922487259004,27.83511470656562,24.181566227382515,29.809791609295143,33.80510738027371,28.93317334110192,27.32970118179485,32.27782313436147,23.843675843693312,37.511193578283596,27.491255778990443,28.684458366073937,24.82894541909514,36.41233753240844,39.483141597867366,24.5923536662168,40.35801351940718,33.60661343926626,32.654463053339185,29.487008577095438,25.998279177896926,44.27005340453255,18.653934911043972,44.15740751245912,32.35130465427893,13.225892095747746,27.920204443355434,26.919530079652457,48.16977152536801,35.98736031984318,25.430558021529546,20.52733040927795,35.3946019121867,32.36541471514409,31.306547790965205,34.34274737146426,24.978753557694063,29.360470552296125,48.84386785486773,30.437050986147447,34.830420330049336,36.4024399821566,27.916484258732275,28.354294381387206,24.575911656434776,39.90027098676598,20.860938240881406,27.744170485562943,15.06528238622553,33.59448916806431,29.690833009472094,20.051324949399614,22.837151751131263,35.06518284476478,36.58514134387922,38.48454301506851,39.44950803235935,37.54851480669201,16.424874462350758,29.758350848539184,25.239229383580533,46.358713289786024,34.370835899125254,17.829337437172043,35.25675640357295,44.818571455193485,37.66811355475207,31.88191358696279,30.773009151050484,35.33415092036569,32.923808288326505,19.307240304590252,24.588818448702153,29.942858675752518,30.891373218948583,28.99385206858221,47.18761237937177,37.1454501704047,26.875011756191263,23.615176494247685,16.407096144058947,36.2118912127426,27.122197319120097,15.24875383051588,27.327155101764077,39.82576900044528,36.789031771964304,38.08537974344546,36.93828027998765,37.035193435425676,37.79846458075424,39.575577938086425,25.650222166345845,34.43348326496853,19.4109036765943,28.219038305494678,26.23983204994506,33.491853318976666,16.49979790309395,33.69552425152176,32.72702489229757,33.59169203865014,18.51999634098426,30.605888861113524,36.674043433008364,37.35035207985008,31.547217902005023,18.72115285112526,35.81204982014911,13.639945919358833,38.64815943976015,26.66334986346929,29.177049799416164,23.30267038754842,44.99745743206327,42.41672476285925,45.23204451508508,32.51605521373925,33.4921179345268,39.70711325597361,36.77240564310597,23.188602750439905,45.54334322779637,14.773645715493064,26.774053414676153,42.88544815643088,25.832207068947625,20.467251928995225,35.192501496687036,24.21553156536043,20.987851474809872,27.702776443263936,30.18837948016235,36.926577875965656,28.77493493543888,39.02408605622217,36.30920596597579,28.162566293749475,28.970274452453793,45.8888358093204,27.15736679538672,27.443137964552925,18.242629453531343,33.359620214420985,29.54978052559208,28.59195616072103,34.932791117060795,22.76560323997911,35.24385309371742,32.62875574189825,29.97449761236092,30.008304259773066,19.770381730787168,16.023828424762012,28.634537011681978,40.87849380952582,22.37845748869408,24.513660174132852,25.92295566501823,29.59951987408597,32.923856276258476,23.617730922071516,29.921751070343852,33.03641063482782,29.33311950844194,44.440289679805815,21.05767900762508,28.922383557626368,31.120277980377487,42.75590735133076,40.40004584986258,34.03865204675202,39.78013885542831,33.511641268126866,40.57535079181135,17.020942959461763,16.627102329533322,31.664657657495084,23.355829153619506,42.8588090668979,25.857092345479906,25.86521354712461,28.19907561907066,29.597235326113733,26.342233113062463,35.2736162581882,28.418125360702263,35.5910378632686,38.19686105135433,19.734777885088725,41.73027697450712,32.63663996454309,14.852919778990934,34.96051760938083,16.69935556566264,27.642313876652445,38.87835745158782,22.238017175250413,24.838480576910126,13.605337751241793,31.594401589771213,23.13636696686175,38.49178190594512,36.741867678709404,27.865132720349603,36.40248917560538,33.80104721146246,36.01736931436264,42.781656182172796,32.19559836353862,25.98865115577712,18.060054822780803,32.70039525313943,35.05201448446475,25.82732701421425,36.368560325565674,21.198862613751846,42.84177674999589,27.76400937591036,15.55847590893329,17.47418137487665,46.269641319410916,40.04435688556471,30.91613718756752,28.21807444632317,23.567506574234933,34.83200521764847,32.570245421178676,41.89741542826326,38.10338650340775,36.156369648595245,47.163359865216364,30.02326328016519,33.19414243502938,27.607369192417572,27.18548114723481,27.917443596914858,20.511636867461064,28.8778721519093,21.09308860157239,24.195623832163196,33.669168703150724,33.836987010119216,32.328912294103624,14.581497524938726,25.933564858864493,20.11682506960875,23.424733942288455,26.201468807775058,34.59347427909391,35.93163078723981,28.51374414687467,31.395350691693906,26.361898611405092,29.326341503358773,40.49858457381907,26.651962651485672,31.673400346410947,32.741927165532644,29.340369419094888,36.423952159944385,42.600157848987045,38.48738952293919,37.34516532726168,42.00771962680673,31.683902253439303,31.921126414531958,28.058401543436222,23.247251474491833,37.32342821524221,30.393809827691435,22.619580576804506,45.741611707479805,36.21135848508315,18.142328235517407,41.95957546475274,22.03890599075569,36.65929231338015,25.770578194538633,30.34764797284933,28.516540063291416,29.764118371644322,39.8105564545425,16.337300515992276,37.60483966269483,25.262661080002253,23.294444520729122,32.89666208993525,41.768370032594376,47.17829436029589,28.098223103985855,43.32935339049766,36.31953506362332,34.223894333918636,20.25151095893146,42.82608187407779,29.106961919997012,20.706052287690454,33.5408112025071,31.12427706631074,20.002287486584517,30.45810172018082,13.321300876210042,32.91359877809083,22.268693177519594,38.9566229873074,15.198667843987156,12.358769388000912,29.138041924206597,34.076036319748546,30.964710233241416,30.079506570593686,33.962413934434096,19.350540117597156,37.82566261935139,41.33072530259934,30.36702458942247,28.696933927898353,17.056452997965863,27.739834664781576,16.36986022113429,24.234513477002828,26.76736230296668,22.017089824689577,34.587251111257714,23.252150698549933,23.66977219135319,30.702800753369523,28.422819166893053,32.19309079190339,28.693442455836067,30.445301092944412,34.285527574032976,33.40204538383322,30.96304295495425,32.42346555755096,25.653783899379633,47.665134514591685,28.336846827692366,33.07896598645472,37.69488607346998,26.068738506149728,26.54869156556242,28.369583782865885,24.99010131144329,42.447660194406296,42.186959412753595,37.45220959123216,22.073759642195814,18.328192213311347,25.43201949410712,34.353574079932,19.967652914518233,27.90335660638069,29.219486823110582,33.30596822722568,19.768280843723012,25.95126240972798,37.151332020527505,34.69181438668794,25.722100943769014,13.620687953696615,12.111670937234239,35.788615946972406,33.7379578862089,41.98609383680822,24.98736612048561,27.295960362771282,25.111233649028836,27.76655179052529,30.261061335646477,15.282003173342154,20.622235908961546,26.863670545229656,31.915085225959164,38.70497015295393,21.22369899212938,35.84390150114566,20.769371289991117,46.12418246324664,35.019703302685414,32.26467865521375,39.52085125601169,15.347181092649379,21.487513178250055,24.594952396812822,28.222987693915822,37.296368178612084,26.533992701877246,39.316649411211614,35.389002684858866,30.778301868683606,17.685720687900396,39.72250751885501,33.24047263891221,36.41991209164619,36.265353572308285,30.256612017379297,44.275364786900454,36.73998703256261,21.98525802198217,22.93103265639389,29.951949579098986,35.020161634322115,29.967683164457338,38.072739812984345,31.04801623805792,27.93921920619137,26.34938878453161,31.433149991367742,35.77450899525782,31.80887085713942,34.24317831926359,42.19357780295622,21.170139919795467,30.945737644751134,30.58441022523681,19.241583673771867,21.309380853461356,22.966052930686487,21.6629884367425,24.88902697157604,33.948862692013634,25.14602201139163,23.159912267332622,20.40265305803765,32.55396927052804,17.402406823697916,24.531642735340142,34.737214622489745,28.619727316737304,19.03490168482405,36.140757730045095,34.91431046962832,24.888832719519144,26.712938454886814,25.181232278267778,24.797930072924235,26.878634978052432,31.336243656879606,41.517992624112736,26.310797605520925,17.13157619590445,26.092027385106327,27.59725755776026,35.86782262100315,40.12979601967059,24.727989514845138,33.60558990727789,35.14251013073823,35.655977120813745,33.68154296434476,27.800375686819063,30.504624474417554,28.913728496821367,28.82913601784383,32.87941911464979,27.5424861604457,20.742662651313903,39.75753825494746,25.367665265520728,25.520664714546328,36.594780280069365,14.398401364341392,23.900284385310144,11.649815662435996,25.987666556196373,39.336079821020945,41.481543629643895,31.757804988841364,38.6373281618317,18.893551757327746,13.874276396268431,23.94637282015991,40.73264594153134,37.44045673382338,27.67804125231749,32.496343695475574,31.189797219358244,31.822451789268854,25.078163407340714,31.448707221150954,38.873587857804935,26.05201983725747,29.388372500586556,35.99375422989831,20.71723884786179,19.213781670013176,22.37805209386204,44.8326894603587,34.307621202143075,37.92875198796612,30.26715021661557,41.53627890994339,27.76116499685138,46.4082088309336,28.05234050214406,33.34484744991225,27.782539165462218,20.62875271912629,15.743447612838828,35.77711099090298,40.62678979199365,16.367582050387778,44.39492462033101,34.473825957344644,17.837578520222632,31.64776196103962,23.718847756416466,26.01477255702133,17.538589184132995,16.77108734946392,26.94857737653866,38.57735785128997,27.361559834873454,41.411613153560005,25.909034673645234,13.531430608976194,26.672497410779332,45.46628635044603,37.86673369169138,29.623711173808143,39.07854698724817,20.481775239481976,37.776752969789136,28.083641321449434,20.052603355791334,20.597009317108775,13.892047279855815,37.57515791569176,25.918736753918015,30.680125459380466,39.33946446844745,38.63500450936337,35.824493933582545,35.92302406863617,23.62457287778509,30.530717681536295,32.36442639611245,23.844243807660714,44.74661160844565,41.04531314730838,30.688590485731662,28.424824012903045,20.750192424066157,34.03929877940123,32.189538454829666,29.227426002321742,31.935505320528137,14.747559888270647,30.72323098426179,41.19187330114948,34.440152291906756,21.79146183522171,32.00611401841764,38.134612620830126,44.07318199130742,28.926499424833075,12.85001441410687,20.695084237168615,21.063216124823576,38.92639530054922,34.77837205475785,35.06042596642031,33.85873013056514,24.13995777791437,24.215879488435103,26.60495587197268,26.742026836807277,41.790534879462314,35.060680723963294,37.811780063096506,42.170615023352575,44.709377289067525,31.62627384384897,37.4323794674799,40.38558816596318,35.600384611697606,41.86581403180515,19.84810511988071,38.460351003880476,31.850486660036296,30.215132866614287,34.37349988616497,22.498016534647007,31.90587670530568,32.289350918623356,36.9010341077291,30.067503390855126,22.782900031839567,29.77760538171571,26.67805224047642,38.654097003876146,47.86684297211217,29.894148929016666,33.10065509692453,30.61504577763874,31.360093717684123,25.40943028103003,21.05134328910239,26.081725575456716,46.24965629245386,15.957496418990175,32.66417480918312,25.52246683885496,34.646746918366446,33.0143122154701,18.423229879432952,39.548676098276985,23.194571668438506,32.62483745350247,25.975390899688353,29.98125772793908,41.5093335427438,25.792796754614805,25.603556598452705,27.014546352286395,43.178245221731174,33.36592842075713,12.506210335192101,19.554050628664214,33.64594339861026,43.7210520577354,16.952587149291187,29.86118075203121,34.77115374637441,25.36409062311992,16.705195845280606,24.113436816918973,40.4333559275123,18.93477820991857,36.503633116662684,25.60895917933809,33.63818090716323,28.001690776432447,21.60043167450442,31.22483846334812,43.36057469741166,32.759115436628946,29.38597770436558,32.89506013078683,22.828347789728937,39.393030706168375,16.063480560429326,28.825264889280415,36.570078670269574,28.74755284285291,28.02844597309393,11.039057209034972,39.922853388817906,39.347909830976015,27.022681009420825,16.458375876055136,26.622152268960726,45.3931107921279,18.983957825920776,44.6683098033763,43.137817925517176,26.6454274694406,35.22865336580138,37.70009135682583,36.86458771358673,43.795956464971354,40.53844596460662,18.26427778073597,25.10617964675772,25.94968255474997,25.853790144236267,18.329574128899452,29.856089894109772,29.512643012322016,13.77913850602764,30.240426154779144,40.39174407853646,17.58197894533879,23.896639129061175,19.53381463032631,31.996318580769973,24.82862549995462,35.607136285748204,19.5569475315361,41.5558877760974,27.723649248756765,15.840184657703883,33.51958485150452,37.02838767138691,31.193344183772233,23.99035597397294,23.22939163601519,37.84145525347327,35.420304836637975,31.619764253747206,26.981875062122924,22.148351935421456,12.637732818022066,16.607065316123347,20.217118344789558,14.849149555893128,43.59217184710599,31.25290627021286,32.77185803220581,28.235695489093317,35.91692919366662,27.961697938602875,38.6228554800452,28.216465041586893,42.175072999076505,36.2903008704221,41.04460204303439,47.43783135448125,36.59926879400517,31.675305047369353,34.814760996990046,23.402519569964177,19.601122651549815,37.35259509574911,32.14454062376161,27.04826564042786,37.775845615122876,18.419202786818122,14.39764042429933,35.941152858015556,30.604749287751993,15.46777671333348,31.579069483045227,27.878963964551687,31.985770957817138,17.78683990364648,26.249223864923497,36.9720192364913,38.681167759384074,22.511086352843265,30.2432340631433,32.47473734541,18.668325334365715,25.93069053758584,24.731057593716294,28.422077269882145,21.40262702421225,36.392667290304225,16.36528583884872,33.93650563389592,28.500077035552017,25.990564291607285,28.999366535888406,21.667463746947906,25.835156542609138,33.956652604525,44.407543505728526,19.581738985689128,25.926807205437925,32.674832760899235,36.867289376233614,26.32468002223842,21.7404881807472,37.617119439819824,25.658341421090093,20.44998102247914,23.900951558067334,49.116842494218,34.51719036496764,28.455774936749545,34.30318953122543,33.05637197519586,38.41390433195048,43.17325023236103,24.447613338986436,32.941497409113865,28.410870594206127,19.427810514675713,33.78598273971044,23.38957317432414,37.779219432606865,29.16802532423408,26.578433622689733,32.47224423622461,31.63794085777549,23.265728890593564,34.383257341924384,32.14327608279652,38.11567585238532,35.18275769920926,33.11006583486578,34.15098507739306,23.162716448930425,37.7401786957773,40.315112910639094,27.282358699071917,42.41383620214654,15.62313074500405,39.361971804585636,42.589879625837725,27.244838633333273,38.9502991348629,21.234123656707816,33.09072528600811,32.10926331486457,35.991572626477065,19.49147430131513,40.87311283210556,19.94465956533465,15.54820472649337,35.25193007381453,17.36809144669906,36.82731645380791,41.848787086979485,33.53715592768361,27.116699314200197,24.433577464635697,47.852464553804516,17.47528682801822,16.089713641425995,34.41694478712501,38.50441969809982,29.649091185023202,26.008823835644343,32.40911849978162,25.562637043978977,19.79570787541021,18.815562506110997,35.14967967243365,36.63742203387358,31.097336007116926,32.190993823663874,34.08072260651788,26.3522569098362,42.187269920418615,30.639457863374993,21.75644376104147,26.55120461121356,16.827895812020188,27.809020152432595],"beta":[10.311430776004196,18.170154141651608,15.980114123490115,12.433027191775983,13.29049336826432,12.511748592994007,13.31039960147475,22.732765448940086,10.401533935297508,12.56223365476027,24.510148747667934,18.886355000499275,29.83320206136231,11.562955106152039,21.407085104584972,28.221844285216374,22.162346692241286,29.168084397857644,29.9273837782057,11.979709312675526,18.43126017343007,23.42466579245847,20.27859942733646,11.586550410217269,22.834020861358443,24.53134574599897,24.16493448065559,11.876173805928186,12.034673371075467,14.651946656336573,20.417542059875377,14.161589094896915,10.866671874001298,19.09352099669025,21.12462608861498,16.137260022616285,20.699621784545123,19.668235932011076,26.940795280411866,29.7469773466074,14.436752731294401,28.479825185658576,21.212909099315294,18.40534181923998,26.666311682383412,14.789828679099983,26.616443998399568,28.39467001960086,11.665934852481787,25.855097913461925,20.267990291494854,23.25189410010998,27.293795241307027,24.125212994838417,20.922298252030487,26.503925993096406,27.123500774385324,26.252509530874015,21.381147553288358,27.051797529146235,12.569768110421133,26.89584999326607,13.035219948002666,21.834600568068872,17.553112547675276,25.085352989788245,18.720277533269307,22.189302310207534,13.84718710160973,18.62677833845649,21.91354343465958,24.303779475824648,28.562377652954765,17.841275561979202,19.477176740228522,14.417676165307864,10.272254034856338,27.904700841574734,12.918127280518693,27.166637549080445,24.67159059615753,18.39105657753904,12.175237054765349,11.248232587750394,17.504665248974128,18.67747739308982,18.649712014930238,15.654106756545495,14.314720493585828,11.886699353156267,29.028815871515732,21.670422320623324,20.83235952946991,22.00991159916795,15.693653797151743,25.631139168398413,19.04272563482731,29.532833317086457,16.3138150887384,17.103537236088798,25.337094155889602,20.875505330481804,10.444071815222431,26.048509944726913,26.630962999971885,27.566498077633955,19.4530160339164,15.10280287447998,10.205097582587692,19.160625684281023,27.482532161646983,25.14370287021531,12.745843845063298,23.75740218698823,10.51236758590569,14.3708068839636,28.2513781226409,14.874554962353006,15.524479350103007,18.883572802113488,10.045332707351267,12.068227977691741,21.767153178789314,29.202522198910028,19.97433435309171,16.85478651256797,15.716027985809205,18.393082958779253,14.458197040243238,21.219914691127126,24.776633743098134,12.272938171806294,11.996641897009802,19.329955081697968,28.0286786603141,29.387539256361237,29.027240476645765,23.72756127821249,22.64871375559157,25.767889546597623,16.703498585035558,28.5886587784952,16.464225138442497,17.543132538708992,23.32824617327332,19.55228111747509,19.774528077564444,17.088429518353287,27.488974135812107,11.960974828700977,12.059425646803032,10.363081411219577,24.124248711727958,28.011245125718354,11.197585882555593,27.638811553869537,26.079940202327876,17.46862062512811,17.506634571424243,20.461793413056974,27.583579157710744,13.891834388251908,15.997883716068216,26.541724276982045,12.567965258460635,17.856930708352152,27.18510908038843,22.82810006948281,17.452592756003842,17.739720965958735,20.59329856939923,14.523882606830224,14.65703811464449,22.987972022008055,20.73047471904654,19.054665138032224,19.00949979085796,23.200331925771557,11.73746170736397,12.492888753930625,15.906618254256264,18.83609162465602,24.946438511347058,22.611086767923023,26.36653938261871,14.245291457263388,15.358034666526606,21.030651959229587,11.694266419765773,24.465142029070375,12.416428156955007,28.33138508264417,22.915822184619635,12.601218896078134,22.240206616864157,14.422313622665346,29.740552980398768,26.088063209775953,24.242878105608927,13.908127815257938,22.407924746336782,27.31993893110658,12.325035579204338,19.361638461226434,13.376032587437066,22.552800830279406,29.99577975176154,14.049783282263682,16.869249692856094,27.949971886968754,21.684732941908074,13.515143145637204,19.7443495736213,26.01684693013071,18.060508858960635,23.78521858657507,12.278250880594243,28.751114629707374,10.052811437687934,10.196899237630813,12.030823125161891,18.49592907583979,23.333517438552413,29.75611403391276,22.438020463797343,24.709725755704845,14.192762722084673,28.37890631553153,12.742900354774926,29.552401268654975,21.04222176692319,12.714410686456628,29.781880757089535,26.614725162065668,24.56511284142099,15.959656217043175,27.73554665078741,23.84089407378861,29.27024545405907,17.901572816345144,20.991363062775214,18.406898579246498,24.68272862975704,16.136620053099154,28.526265667421953,19.865713381532387,19.42316858607322,22.296529121736658,15.08934178228456,18.083600214804147,22.620656432464592,14.785059827106926,25.753544188212985,26.50986432605716,23.579201508000963,26.153922620252636,27.0989580369446,24.159825581348233,23.513493860390188,21.358200795067454,19.70170828157996,16.07778896576423,17.87569357224937,16.145470952933117,22.838052598118004,28.06067303516537,15.683137220924802,17.277354184589417,24.06681810808399,15.591899803559137,12.694670124616959,28.629357459824032,16.860498430260733,28.657726911427744,14.865693088346257,11.491676831261191,18.293408590885786,13.009107214987644,24.145444625621657,22.525063981379194,16.316445393708626,10.901547622845683,28.1845622524362,27.398407785419543,27.56366993207644,23.369472257435532,24.488257269068306,25.96089154462915,27.782368655726344,13.021168123722129,29.31071566848919,13.37113250366119,18.558032211343253,25.314154673146923,15.986437582458741,17.511305219397553,27.426617900901537,18.367079753442226,11.849349449899487,26.463284864307322,23.4806258750849,29.27312124937629,21.559382722141137,19.96428512837767,23.622477975472602,20.264346731769862,12.732386215515291,29.430536890587152,22.232619402667456,23.951799561809377,14.204631268112697,20.34000361943647,26.207243234485084,18.549022404489964,14.954750148447467,11.441318226625942,23.725117667800973,29.359149934012034,22.359238553390387,12.886376438737773,16.970654988735795,13.00083665026448,10.935427328886508,25.74039345119572,17.773584490997038,12.088748268606686,12.164104216228546,26.593547021680738,19.859382156306022,13.987393418754724,16.849483445007,29.553082038130466,27.659802480235673,24.679206340718807,14.588296528712021,18.56012417137189,29.78005363779669,25.469300087589684,22.91350192160223,24.32398255727547,21.043649483135457,16.757127843143238,21.724966529036976,12.11114724635685,10.150499557544443,27.070667262515347,16.081258286964022,28.513153706326918,13.00515320971957,21.608343050566162,12.498613276174275,22.799056549193256,15.391974075976997,18.487518069215177,23.9436114560899,19.75084660128919,26.023035289257344,15.574674355267186,21.763295409218507,26.816610852588326,11.057151179071596,15.993264721976397,15.522055106320014,20.051905198110394,20.578255936819968,18.012474308444567,11.48730072025371,11.197879316692827,15.957703136017333,12.482968524599825,19.174549009045663,18.80441635211982,13.622929339032389,26.43019834015014,25.74364256012394,27.493319300582705,27.249798225593906,13.364349028751352,15.345589051817665,15.97267599472286,27.09197946100234,16.65578754115185,24.435186177742768,23.469051166458556,11.076772706425352,29.945094792840734,20.8294013638247,14.050377081089973,13.436697815284129,26.972763310267386,28.02806423996438,14.550700875809648,24.976304753348217,21.80653411482833,26.816374701477713,16.09646653323894,29.274793757256848,29.126782183429384,24.481298332487846,28.58967896893574,16.033113867076768,27.921880328268234,22.426620357863314,24.42211024810783,12.048958948526343,18.425491699042105,14.479348676532835,17.459783380640197,18.28041441817975,25.006007287604465,22.389489184126575,17.592412725907227,13.441301452172212,18.172175367456237,14.026867311517988,12.697944716971126,21.92885390166163,16.239650718881542,27.277552303144276,21.279346496393615,13.206424806289597,20.627083983060142,19.585990250950683,27.709645295480602,24.57068068463707,14.36078331341816,15.038857202737198,26.21347296638642,29.930548950692632,28.441126057749784,21.786372470548223,19.67904275676704,23.73470545983522,11.812631958605856,15.85631045513082,24.484916731647296,12.110647303049372,23.72286065894621,23.111574463397588,21.034621307627166,26.84531601171457,22.540100121328205,17.450726399225864,23.09542803985833,13.554618418806701,27.864225597099306,11.801487437578476,21.6382054590869,20.251765671146945,25.5213099926172,29.822934244279512,13.080428633016389,29.71060771563306,13.04095554239109,14.307159625205692,18.55758375435275,22.353278082606103,29.78732315363526,19.580341481923753,29.84469293433607,16.360379751124473,28.95264571421209,18.291753276675195,24.728361479225953,11.943614631810293,17.98151389582291,27.511267956025513,15.926154087577125,17.187669790914835,26.03983708786223,10.69614408078333,13.51535270757456,19.60536619850115,20.985387625623414,14.513865998672886,12.241039970336555,10.80852273735324,27.867046832845375,21.499833015165493,26.313084563061032,20.771273713002017,16.205842655421883,27.057925449093112,25.08916057348106,10.547017959724991,17.376089034320007,11.193386706146008,15.010658611546086,13.164764182438947,22.022266242193744,15.851848442751217,12.603509867758266,28.457120510380783,20.40354670358168,14.252094186242399,23.12328904060884,15.728633198913435,23.752346226090218,13.482492639183082,13.000966456455734,20.232822173749252,27.642220289950163,26.974756926431485,28.335495625954348,10.122170357747414,27.786601451632997,24.198316551576188,21.138514761918795,23.508734685125425,12.128347338640548,23.254308676751137,21.681026809855993,17.896317865320626,25.02723814059579,22.374707117257127,26.074182595640693,11.532224856465657,16.180612411838013,21.675922760602674,16.527537005066417,11.29436646238803,16.814484724042906,13.619754238269905,22.10296026025884,19.33565654351102,24.17725238525447,19.630276946155412,17.079582036799778,11.058498222013275,12.367932732153433,11.036117799573827,25.801622993147465,28.4201760792112,27.79110589741257,15.856753167333162,11.735441223138476,18.527131230076016,17.459816967191966,27.336744689180964,12.108506111347372,10.858628452276843,10.49817526528518,24.20123703880606,29.347020463288786,11.751922517323369,28.640090311291377,17.863998700061753,26.840379705990674,29.394119081726302,13.434992512664707,19.580330764551938,13.52274819983383,14.984157962994512,18.8526597827023,27.243404718206776,26.681831139466077,23.56612890805411,27.326401723761954,17.913296219296132,21.266000762167614,17.340735172995636,23.480413421156968,15.26186334968969,18.55577808709032,26.229139987667804,25.720898538231253,24.471228987330683,27.904087147454774,14.837094678884629,14.430122760556614,18.07025265006406,18.950822996627434,18.612489971455133,25.310102757993388,25.161761496898865,19.154229778826966,15.999656985341604,13.228470708636294,21.400701315544577,23.47162358493695,20.664383360107905,29.966758168874104,17.61666443381366,17.047962687090813,23.51525153621283,10.289292303545036,16.5777695471295,22.497945307818895,15.029174583834575,10.887328808319845,28.35243589913106,22.0040467155239,21.796346370664757,15.633425817651352,27.35657351745526,14.74855755367682,23.293760652159918,26.67838414420806,21.887075519489507,12.774840736598993,16.716903252401536,28.102736460080436,15.927695027730934,26.587528906673242,14.967677827851142,20.9448025997529,16.315896239761276,18.67888871971326,29.613192643493,25.735151713421892,12.764311096000242,11.34229237318625,25.382408968014687,26.63664812444606,22.452695428511262,17.19377769215514,24.449242840685763,24.182887916492888,20.571486149239412,29.802668642382038,14.717428377448197,22.763912466874462,28.818409323865385,27.167146154563508,13.3563824042613,25.863977027167238,20.21617091528105,20.995634837976517,11.585551494331202,10.181822721921927,22.568897144349187,13.899248496914227,13.219657793590152,10.784499256817623,11.209885142594175,27.04239517831492,28.347277963912934,23.08174154773571,23.698827667500126,10.811947443452752,12.170349630246452,20.298300087391205,28.10272280749418,25.34764591106621,18.778267901568295,13.354692467014559,16.70441547554621,13.773329861893107,18.65352853983969,21.316186920453198,26.37020611975888,21.994172158237973,11.802184520906383,18.406981894818955,19.48366431379109,13.399452867952757,10.136937804906268,29.65133812412659,22.371771098676902,25.603115585875376,24.424894787178296,27.740824242239842,21.498835137975213,29.267004348895966,18.150511298847398,19.695201451391235,18.65152964775165,10.069968553731105,15.197765434014649,22.53716952261996,26.668658111062665,11.11035013587891,29.512872626317076,26.390049082414613,11.107146602469783,12.806200960016852,19.75152754703412,14.760888624580009,12.655969396965979,12.79134656150334,22.465493904001693,23.927459479825796,12.453193851640041,25.73335710510547,22.813904187153668,11.335659960348789,15.354367942762352,28.72426932539211,25.514871188089266,24.476539005058417,21.5850207215132,15.982480623601667,27.645106695105788,18.301485036494725,18.033367775085804,16.98538883970282,11.376195145189367,19.453863857316414,21.3665101905054,26.179861853331236,29.749063709251324,21.17118098603166,19.319483859785045,24.870897675298096,16.43676233211686,23.679549559564794,21.028702307621007,20.815976054946532,28.437731366535157,28.318668345381486,29.555616870357944,27.596324677173605,11.003917292254624,28.649505038542173,16.829273721298982,18.164552213206363,13.90770046376431,12.454445496675026,13.8467574135883,22.10109715491224,22.597560968062986,19.606236896227244,25.770682157522778,28.932094678404468,25.88108739094867,11.00805946823086,11.718150172747102,15.3698983334017,12.419039922681062,21.76784708157443,18.67790155896785,25.047108277633058,25.475919836124554,21.04807106595732,12.975873000434706,18.344946597572907,14.357937135193843,26.747040614359,18.997996628205374,25.60168636210519,23.13926737191551,24.962475785627444,26.070570619640968,25.159156476867057,26.60827801273616,17.762309833852264,24.788607268967162,10.288882611595763,25.621498180045357,24.82844861069839,16.414505535421494,26.284754291209897,17.033564223081527,13.817521402782242,18.859016239212153,20.645786653709003,13.472114012790936,16.151374114977266,21.70830903301917,20.362626824223735,25.249403004558868,29.59606314013061,15.114233214414273,19.28070962135184,19.284983679139106,19.967908997580537,20.090933918659125,12.532514579657285,17.391662702585414,26.726722363642722,12.513138541802359,19.9291634876573,14.672372879380088,16.20692623607998,22.176449284330197,10.094302574973003,24.357436066426168,13.086085255346575,13.676465958141248,18.76578235606305,16.508828572402994,22.21897130177775,13.820221656899015,17.466314584188556,15.164678382392097,29.96189972240908,15.191344773149664,10.516654326751688,11.320250090202041,19.631902249526377,28.235635252211647,11.318548724797846,12.685916145798712,25.303515412535184,18.27254191742865,14.200974928413611,19.535967598866534,28.431044765974033,11.873251579243611,19.686088452631807,16.529323168758125,18.202463922509097,24.252864548289935,17.126560765460038,17.901727828722013,24.951162470351797,20.363591676253186,15.5683324958689,17.323129752643315,15.169903186372103,25.950674232055526,10.654433297501296,10.915153932424143,29.264481247858573,15.222216256357498,25.039269497067448,10.57776714361308,26.95943652320677,27.72703463460698,21.287881751252154,11.661643936891814,18.862417521996356,27.903622092519612,18.31324061472657,29.455679155832698,28.84022888046831,11.196052667676145,17.453374093597457,24.66058573345554,20.279664450007022,26.421397715098646,22.05288365258403,12.150571761961988,11.631553889069792,24.054763971386073,18.168919980480513,16.391919798188383,18.11341628437671,12.46624597300864,10.449260318040356,19.67975212165491,26.306470655983915,10.499734735101667,16.928722890703952,14.996431590338313,23.57490646232524,21.758437201885698,24.6006491951182,17.0808930062045,25.923011036807896,25.247179183699128,12.02977293729493,20.91259888934209,26.09750512995449,25.74946158433186,11.882304759440707,22.391942376608483,25.30309868666822,28.918094754014874,24.715047711256858,13.394412885018756,21.370111656191597,10.363462216686866,13.11451996764404,13.654194881975673,12.871979145210698,29.27376393225543,28.91425002484777,15.315692274824734,27.426630340402824,18.66679514220031,23.60126460933705,22.30332816747163,14.461558329541555,29.752349735616683,19.68256018809152,29.223311638274524,29.799910222630697,24.144272672616175,28.240582074873966,27.154026002348157,21.489853710298323,13.225735595451905,18.205117267838745,21.603683857413536,12.751966533558804,28.911098746435144,10.543466810969594,10.740335376379026,28.70474398718335,28.26722047728144,10.51357383990251,17.439514510498594,27.103738931785134,12.053177710219565,13.964238206294407,11.008637720160749,28.759762989661954,28.99583668424772,19.918787387440688,26.36894166137727,18.803425506401858,11.08707091496425,25.909050792359174,17.85602817258725,12.42410440437839,12.560486652081476,27.475167931062945,11.363939722932713,20.30520770213068,13.285669230664091,18.969960844958827,15.69880544418998,18.009346401395035,21.087945054672318,16.013828997060706,25.6727427381935,15.396721777273608,25.16616412091839,15.946287338187632,23.278498027367878,19.170873523945854,21.65120656589273,25.113265602152737,17.89715613188118,16.65445502122222,11.833027384508345,29.884671417621178,23.423432590679873,18.543684684254657,24.850158000722267,21.068761501680484,21.340665146170707,29.437610935342107,21.132276208985118,25.507029606034493,22.52094214019653,19.35508448797235,28.594538733156387,22.93414465110146,26.29277322153321,20.70766299819512,16.635776327116176,14.35089197411246,16.64687492655913,16.819347972584442,24.293436432358206,17.18735085893809,19.656362258491015,20.939303407232988,27.490043628710254,15.414285761337325,12.541260827760192,28.18632200082464,27.40249188200643,14.5314767180434,24.126036171187764,11.899388140967776,29.351483116173466,29.304387769494518,19.168543318159173,20.373781369817287,10.825667871909857,18.046392091774095,28.72266362035481,25.750052360606567,13.007794243336978,22.956480252610124,15.214801408335795,12.879529526436798,29.596674496644866,16.035180429073602,18.30521214630984,27.95389215807594,25.578997131428856,11.750777346995278,15.266399673720263,29.288441229833175,12.213106481187982,13.695651406075102,25.66312348026043,28.497039447600024,25.242001369252026,13.73120817356343,13.191439718014028,11.399251733027832,13.647461250587348,12.740288139737261,19.765175208642383,20.71872133631407,20.763006016222114,12.753285955695812,22.069497629898663,21.700337739762517,23.85090245899654,25.548691827775368,20.712195892900276,23.797096135972097,12.341218643685444,25.552087708345837]}
},{}],53:[function(require,module,exports){
module.exports={"expected":[-0.40629765625484543,-1.2781307066117674e-13,-0.43031937331273196,-3.0622177735880944e-8,-0.13769969860526288,-1.1564329419567033e-7,-1.692594214467305e-12,-3.96094093316355e-12,-1.0814114494077336e-6,-1.7537658575131945e-15,-5.510602329306273e-9,-1.3087331217277548e-7,-2.6029557557892983e-15,-0.11102583098841075,-0.7370417076057615,-1.6473419940359604,-0.00014508056104311628,-4.940227867784499e-11,-9.77834562658089e-5,-9.690363384390482e-5,-0.0037616561448645387,-1.831514349852279e-9,-9.14246443593547e-16,-1.5125739016522042e-15,-0.062985080839544,-0.0001072219587396993,-7.051350281585283e-15,-4.1887480477086305e-14,-1.3934067438424512e-6,-3.6976702835588235e-7,-0.003204283689791802,-0.23672080368633303,-1.9972035503491237e-11,-0.0550213055659661,-1.5410288084018708e-16,-8.775156152267748e-13,-0.0009682520611590683,-3.9936158560614723e-10,-4.4496807281486985e-13,-2.5187140988034164e-7,-1.5918444553695097e-7,-6.124156759833981e-5,-2.5455204598893518e-8,-5.160040470056842e-10,-9.640854798772504e-7,-4.4261595580550646e-13,-1.2716324341048633e-8,-2.808633475705951e-12,-6.49325987960496e-9,-9.48652684141439e-5,-4.684619992316555e-14,-1.4252593007001825e-14,-0.02137597149962183,-6.217743598863489e-11,-6.162836716899411e-16,-1.4100407791801707e-6,-1.0327694015386983e-11,-0.01773906217176145,-3.5661194338781264e-6,-8.191640840963947e-8,-5.564906719421521e-9,-7.495195740968924e-9,-2.296049340284492e-5,-3.724990357193904e-22,-1.0452734202180883e-13,-2.9762837156590686e-5,-0.0684879787742043,-2.9081513184009323e-9,-9.886905232581892e-9,-8.388837268163885e-10,-1.230880935457227e-31,-1.3535540764053644e-9,-4.139835586731036e-10,-2.580134006422479e-10,-5.681980893187241e-8,-4.8455883466524765e-9,-4.8790267691088783e-5,-6.482712574803933e-7,-2.0646548642962257e-6,-1.2831589119345642e-10,-1.9445081014280547e-6,-5.2278923237619866e-8,-1.5651712181409176e-11,-2.076690581473596e-9,-2.316419315911073e-6,-0.24540456520898446,-6.176727397058422e-5,-3.8723170322618865e-13,-7.910311737269297e-12,-0.003088457984972378,-5.984965977183705e-8,-1.878635833131249e-9,-2.061643374406023e-7,-2.8879638865536496e-8,-0.5685394227909303,-1.926352316541591e-6,-7.266493237664261e-7,-5.408748984118275e-9,-0.07490609909722055,-9.350146695192907e-7,-5.96899732656402e-6,-5.929969811883082e-9,-1.1523841403844349e-10,-0.3808429389700825,-2.5413850024586344e-6,-0.00038122396573249905,-6.436698665976308e-11,-3.7246078525696546e-6,-0.003821763677729851,-4.500701393617088e-22,-9.716780794680648e-9,-6.493649903913444e-10,-0.4762914092205851,-0.015508936520680215,-1.1854538551201273e-13,-6.382523575962748e-8,-4.0236910880718827e-7,-4.6564107825131315e-23,-3.06479391084344e-22,-0.04704235457174879,-5.981738301483861e-6,-0.00012852092587981048,-2.5594836901435734e-10,-9.38822978826477e-6,-6.681425029283617e-12,-1.9697852434215838e-8,-4.475786073496006e-15,-0.29979435285207595,-1.0323051553282477e-7,-3.592189195822729e-10,-1.5848979094944167e-6,-6.0481378212144e-18,-8.639532473476533e-10,-5.838823698170168e-11,-0.013446523098459607,-2.085114910033578e-12,-3.3412816369305295e-19,-0.22673330332757302,-4.624151814670169e-6,-0.0021885657497344117,-7.961346314146122e-8,-1.207193550823519e-5,-3.7626436805402706e-11,-0.0373235000768221,-1.208973559586957e-15,-0.015344714399837495,-7.18724158573158e-28,-3.3552765383362596e-8,-1.9195377053071357e-8,-9.71870284842815e-25,-1.92634106774657e-6,-4.651414117104165e-7,-0.9845582223637477,-2.9207535308993986e-8,-3.9678225161611306e-9,-7.761001940106978e-31,-0.013030089032385242,-8.512163176884398e-10,-0.17933050775922865,-5.070546799977726e-9,-5.351201633718766e-9,-2.829484930657462e-10,-1.0660385410602783e-5,-2.0029624227297675e-9,-0.0021777376681901494,-4.79297540659183e-16,-8.695115854550024e-6,-1.0686246104489179e-23,-2.2332407666063054e-12,-0.040438912295533556,-2.3081658481051267e-7,-3.4264166045124047e-15,-7.075007397946916e-11,-3.4381768387763945e-14,-6.096192606242061e-12,-2.1806856258455077e-13,-5.641090133412422e-20,-2.379764312460558e-17,-3.025597388308957e-19,-8.68986087724466e-7,-4.028986592506099e-6,-6.569767094188684e-6,-0.0006630084589384561,-0.00013441687795672297,-3.814026980960407e-8,-0.002481703145344483,-0.002462003569795606,-2.5218037036820338e-11,-9.754309406111686e-13,-9.559472706076304e-17,-0.32088978660429707,-1.027466110489272e-9,-2.8354340374906217e-9,-3.3667857522907433e-22,-9.850401969382302e-11,-0.04968786883676371,-7.278972583562106e-11,-0.0007363532747034772,-1.1518608887522746e-10,-3.460540710320346e-5,-1.0704196656233916e-7,-3.13730150063128e-6,-8.181968282725136e-15,-0.033635427032968734,-2.238618959839471e-18,-2.5935406656568183e-12,-0.00010146407355787458,-4.806270722782417e-18,-2.185758663346942e-9,-0.000849958832832682,-1.4114859349137395e-18,-6.797656976011506e-9,-1.71095043020871e-9,-1.2072172348783868e-9,-1.5698803915284987e-14,-0.06593778705719175,-3.109433319994456e-11,-0.7033324459830311,-0.0002803455188244172,-3.193302314825068e-5,-1.2559366666510177e-14,-0.014138738768810681,-1.1132394273068185e-14,-5.596345562570125e-6,-1.3007649927452548e-13,-4.384933067569506e-8,-0.0001693817879096679,-8.736523896226689e-10,-1.6166284906707687e-10,-1.4485406878253502e-12,-1.0117166166456724e-7,-2.57601204871647e-12,-1.4045886756217028e-7,-0.008510465578014857,-1.658224847883609e-10,-6.319612790501316e-11,-0.0020742778151342208,-0.0023863582043062055,-2.3631288900558866e-5,-2.824550172594554e-17,-1.01488491265438e-11,-2.518233661579219e-10,-0.00010514846295290236,-7.599904502086218e-5,-1.5749073432171078e-5,-0.0002757208406843748,-0.030658874246367804,-1.740061455407023e-6,-6.202171657924502e-5,-1.400864997136139e-7,-3.7000802758555064e-30,-3.0761051842679355e-7,-8.228634054660869e-7,-2.8580630451714724e-8,-2.266327008982658e-19,-4.322747983485092e-33,-2.1468528429142937e-5,-1.5042184659678467e-17,-2.1500849280288886e-30,-4.632218900292836e-9,-0.292850879967619,-2.049162423743734e-10,-7.67582095436865e-12,-4.750823449471527e-8,-2.3046589766202828e-11,-1.0892792840310945e-5,-2.9938799272543087e-9,-2.3670850289127358e-11,-2.7595591779910355e-10,-3.6512313724185045e-15,-3.7729929410093166e-7,-1.395609202744465e-12,-7.488399822165067e-7,-1.743707377265245e-11,-8.608145745029989e-27,-0.02029166790413364,-1.156896720410528e-6,-1.157790815416059e-9,-0.002425642447032441,-0.0026140773225452915,-1.6842540618820345e-14,-2.999559642356629e-6,-2.0486332250831035e-8,-1.294525824590704e-8,-4.34453359296199e-8,-9.642141995478832e-10,-1.3909953259707208e-14,-4.217278742959351e-10,-7.449956013969303e-7,-1.391435725318391e-12,-3.574554335457119e-7,-3.140602631973335e-6,-7.204413636806267e-11,-1.152885407482043e-7,-1.7845939924479388e-10,-4.8983753325891454e-15,-0.020439824837904224,-7.859138286300252e-7,-2.830472715188567e-7,-1.4638660168562779e-12,-4.923788360039268e-11,-0.00021754859786286257,-3.96642029138959e-13,-1.0815787616015912e-7,-0.0015348439852510185,-2.0094458264016754e-7,-6.935763849206339e-5,-0.01144013611922347,-9.377314413684844e-6,-0.0008127376679099651,-0.00021766175423873802,-1.1451146648809214e-6,-9.115495108567525e-15,-1.0510372986378047e-7,-4.6184452439742525e-24,-6.7025216395438575e-9,-5.895889024885065e-9,-4.439001653960887e-7,-0.8824348465151236,-2.2992137107963172e-7,-2.304358879732988e-5,-0.0001918549031361521,-4.944267976114385e-8,-4.4042484636009495e-11,-8.44892525776747e-5,-2.3235297567776353e-16,-2.9009161868021505e-5,-0.0001022505625960191,-5.228689602394889e-20,-3.2299211758312606e-9,-2.2544871618724203e-6,-6.28378924374079e-6,-5.635793414089261e-12,-1.1835680513955384e-9,-3.0303552251491715e-7,-1.6649239506704005e-10,-5.052999366719162e-7,-6.320027819336845e-17,-5.89072472202612e-13,-1.112799316154811e-7,-1.7753651195046835e-8,-9.816744804475253e-5,-3.124875323536149e-10,-7.197086130988484e-12,-2.5847704163638573e-10,-0.006291789282849755,-0.09571008340623273,-9.202445021816412e-26,-2.6753249547038812e-20,-0.00010107572187072427,-0.00010604073055942126,-1.4788948028345552e-36,-4.648235552051488e-10,-1.2039351699460456e-24,-0.3934462535660279,-8.127611380506093e-13,-8.086506477245298e-10,-3.960275501738543e-15,-0.05297062768757396,-0.00025144793637154,-0.01440953414767054,-5.3293181862996484e-5,-1.4776668590812295e-15,-3.632762225172092e-11,-0.0005153791958668939,-7.312231353031727e-9,-5.24252405300774e-5,-0.003926220024205611,-0.37060899079195186,-3.300784828725481e-28,-4.6649391756180294e-11,-5.062185276290398e-7,-1.0285519883627006e-10,-0.40866846771254667,-1.4433681868925544e-17,-3.3645439725429316e-9,-0.10527003896885832,-3.470108502434505e-8,-5.2086979143355604e-5,-5.025100767919633e-7,-1.909532253341609e-6,-2.0138598185050166e-7,-0.00024692496004060684,-3.0020224688903654e-6,-0.2568999399500491,-9.408840029286195e-10,-4.762401387252511e-23,-1.0283964237945828e-8,-2.6834650761751336e-22,-8.492273546631244e-16,-7.063156602673831e-26,-0.0022967283533047666,-7.843054686773804e-15,-0.007873652558963754,-8.45097222011734e-9,-0.0002680909072160343,-1.6357914973152557e-9,-1.1827334696548095e-6,-2.3685338590699643e-13,-2.0791737780808656e-5,-0.0014592593105388187,-3.883893205278135e-17,-0.00556911777847162,-0.23771012928166585,-4.8689636456189396e-14,-0.051482560419018136,-1.531655499271743e-25,-3.1383332303767243e-12,-1.0501882974036095e-7,-3.16957877971124e-5,-1.2030796168201365e-11,-1.1002011383797024e-5,-5.508140934896882e-9,-8.386729178476178e-6,-5.180679123297971e-7,-3.121732921758086e-17,-2.9205273291496327e-8,-1.6011877810970733e-7,-7.303476138996195e-6,-9.475634710527254e-7,-7.7333153577946e-5,-1.865756553906343e-9,-2.416552434898002e-7,-3.4329063044301936e-9,-5.807831189748736e-13,-6.054890692185931e-7,-2.326459867801539e-16,-4.27104500310823e-9,-9.659445419550626e-18,-5.55159380951083e-37,-3.7948064568117733e-6,-1.1132000641033107e-18,-9.87268457816946e-5,-1.0557755769409412e-5,-0.6793424015514907,-0.0004303540502068645,-4.039210017242207e-7,-8.833206410399122e-10,-1.6005985520496276e-23,-1.7505950002217427e-10,-9.565889909379255e-14,-5.0829870700075124e-8,-1.338991718179714e-7,-5.20401903498444e-6,-0.0027572056509747164,-2.6784122934750438e-9,-5.769327183103135e-12,-1.3030464759928612e-8,-4.980013451708608e-10,-5.278245566436794e-13,-2.6087412714078915e-10,-0.0008984933446531716,-0.0019115057339314692,-5.60617804687351e-11,-1.1259322664959073e-7,-1.550265223131815e-13,-3.227863823924693e-14,-2.622288520307853e-11,-5.447801980735981e-7,-1.7177073059502518e-6,-2.3628551810121097e-5,-8.247713695764477e-6,-7.794662121023834e-19,-3.296161571980864e-9,-1.0763619479767999e-7,-7.900588740220633e-11,-4.315847621363196e-14,-3.3238941663760715e-6,-2.3607704281576004e-7,-0.012511166628413698,-5.991029954577216e-8,-1.6285650391330904e-6,-1.1023849962835974e-13,-0.050036472754968246,-1.389592645033217e-5,-4.958168981652403e-10,-3.623897094056772e-27,-4.826817685790409e-22,-4.271060489415593e-8,-1.508783193336675e-5,-5.312126671883412e-26,-1.2163131571451121e-11,-7.405065028447713e-12,-4.213618299285694e-8,-1.0237546146728538e-10,-0.5332322950116596,-3.6547247581904455e-5,-0.028371731590617948,-5.340197132432251e-8,-3.6679716290226957e-13,-0.0012448481587365604,-1.1094213260291723e-11,-2.3439189479302637e-21,-1.9442430602843434e-11,-4.085725540058749e-12,-1.8602551164087758e-5,-5.605173360516117e-13,-0.00031326154257014984,-0.00018523667481074632,-0.0071528588856124295,-0.0031288394331411454,-4.353163360910961e-8,-2.0039230507726314e-8,-0.0006614463166045603,-0.015520710896869277,-3.711922908526317e-8,-1.1538537667868112e-7,-2.8513882595871944e-10,-6.810736249687095e-6,-0.0002922631844721996,-1.9680113942990325e-14,-1.1210056476287017e-5,-0.0009666273511949649,-2.2103746660920723e-6,-1.732759349868669e-5,-8.09266100255943e-12,-0.0021595952695007913,-1.539548652678845e-59,-2.2253689129852775e-11,-1.5274571662441324e-14,-0.003298151152966905,-2.152553932737769e-5,-1.1764412673508075e-15,-4.650454427602226e-19,-2.3310730286550096e-44,-5.776837486785325e-13,-8.782033616030163e-11,-1.7263273969208162e-7,-5.213107726914927e-17,-0.20824143836811032,-2.45074693856983e-8,-9.13914037062409e-9,-2.3787452043676144e-8,-1.824107558719265e-8,-0.002317026774086109,-0.001822769928001161,-6.673378643841098e-8,-4.5448744354929353e-10,-4.593236694738299e-11,-1.9253653296219287e-5,-4.768145703754572e-8,-5.5273029173849525e-5,-3.0344417937091137e-5,-1.0025337018455344e-5,-2.1311122245918574e-5,-7.744300101927224e-10,-0.0073930372943230415,-7.843602900868268e-5,-0.006336582817404277,-0.002691418551559228,-4.754502310485403e-14,-1.258681531802938e-5,-0.057090694609937334,-6.488367297374865e-5,-0.1003848384385148,-3.7887551044323e-9,-1.5789413382546919e-7,-0.00011171203683646592,-9.90777724626928e-25,-0.2610650160681338,-2.1294410336418544e-15,-8.24008591638439e-11,-6.784459053101805e-7,-1.3223578149750004e-10,-4.100826699976413e-15,-2.1395652567110253e-6,-0.00011851851488988448,-0.03256451999054015,-7.669158807258145e-6,-1.9013312365752187e-7,-5.681874074773177e-17,-7.712185896766092e-29,-5.43425855566286e-10,-1.4976353968995027e-9,-0.27515714034845107,-0.00037275894716317867,-0.0002654139953816269,-7.659102926773524e-28,-0.0008006370950452277,-0.009691563078723929,-8.16931381292806e-8,-1.8700012835636677e-9,-3.482078291271023e-37,-2.0970682097035772e-11,-4.886845573513052e-17,-2.2356267850266068e-11,-1.7658866222150762e-10,-2.4938820953309498e-8,-1.2066576838402173e-9,-3.759618203815696e-14,-9.536640597733564e-9,-2.2472319913999544e-23,-9.690559325670913e-12,-5.316857894887859e-6,-4.578553362331574e-22,-5.773092490576695e-6,-9.539828204557262e-6,-6.430533432963401e-8,-1.274439327456219e-18,-7.784193240860705e-6,-0.0014850238445132267,-1.9167785522463007e-18,-1.5074560754806096e-6,-1.5755462893852132e-5,-0.0001005155533374017,-1.1063967003319757e-9,-8.198937730309838e-10,-0.0001137097916924681,-0.00013251712014595925,-0.0015852796228201383,-0.00018452721663906466,-1.799296162113759e-12,-1.0685665223615118e-5,-9.615505524373224e-9,-0.007449260192140528,-3.061581732907383e-11,-2.2685116020165202e-12,-5.562553715552208e-12,-7.628171996562507e-22,-5.89302484653844e-5,-7.47696058192096e-30,-1.1200984530211078e-9,-1.4063900956346606e-17,-1.0798609694868923e-17,-0.00905106293444945,-0.00010975821572788318,-6.848417672261854e-13,-1.013168711239043e-5,-1.0903790191575485e-45,-2.0465301618551883e-7,-0.05363950204521903,-2.5902230386580318e-8,-1.839977834428005e-5,-1.4594021822357742e-6,-2.6663647870667838e-5,-0.00021546214114023915,-4.6467526970822816e-11,-0.0008099405910299071,-3.022429774508423e-10,-9.139834805484304e-5,-0.04855966601225873,-0.008846254266235344,-9.756309900453938e-17,-0.000737739766229721,-7.101102110775746e-7,-2.159245909029044e-11,-1.6485000272615068e-7,-1.3775277415411504e-6,-1.0166007070683588e-5,-3.6464635528385015e-7,-6.090118044567052e-17,-8.71227716895665e-7,-1.1149213729728878e-7,-2.1840558720748574e-11,-9.50174386717447e-8,-5.956442679286933e-9,-0.0011492751743447504,-1.9871954772083443e-5,-0.0592638577269978,-4.250699048808057e-11,-4.004591027738904e-15,-0.0005928243339518264,-2.4283970774428584e-5,-4.4447116112716e-6,-3.385148575872936e-6,-8.827628798663215e-8,-0.00014580591431713244,-0.010438524527986494,-6.659710300670113e-9,-0.0001821726587777325,-1.1508457027446114e-12,-3.5333738016373114e-7,-4.496236556531493e-10,-0.00010039864992153647,-3.241879386319043e-12,-6.337019622878536e-8,-4.211575496019011e-8,-0.00059886463558797,-3.755116755666932e-7,-0.002283761112175084,-1.1344311050949966e-12,-0.0003977711699569064,-0.001208257171749764,-6.115619809996655e-5,-0.0025969470938983536,-4.770542864566093e-9,-1.0715697597530075e-20,-2.2139638314170833e-6,-4.287663706529326e-6,-4.360539908325719e-6,-2.1299938486619215e-16,-5.949874374577904e-12,-7.280042648468227e-9,-5.9619520776589e-7,-0.01050849273023218,-2.103442897725867e-10,-4.7939333167711466e-32,-1.6946554699188703e-8,-6.563585824337435e-10,-1.6996691478785292e-6,-1.081923286039589e-6,-0.17854380327861608,-4.8838810363827514e-20,-3.9626616908878364e-16,-7.888118198765677e-9,-5.309457784412075e-6,-3.964425646346133e-21,-3.554092769589252e-6,-0.0022681176860765394,-1.8434040768816037e-6,-3.2078203214891746e-5,-4.3138532019909145e-5,-2.2085841765208902e-8,-0.513936179404852,-0.01302304143632584,-0.1075336662401932,-2.5698703415049963e-11,-2.3161292530135479e-10,-3.951562082353111e-12,-2.3016792671718887e-13,-6.8120808433345454e-6,-8.397788135331689e-8,-2.5635168741331896e-8,-0.8923618615377296,-9.492436870367312e-12,-1.079402114567591e-22,-2.500426365368311e-7,-3.150383929462991e-7,-3.3663464220389246e-11,-4.6780370143130703e-7,-0.0008822521997257892,-2.8531231463327532e-8,-2.5877934176155834e-5,-8.418125623814172e-17,-8.804061650493913e-13,-6.996837158499528e-6,-9.425540348131337e-11,-0.00021623451570319056,-0.00023205001198364406,-1.3594807108354254e-5,-7.052994768915115e-7,-1.0024508971810857e-16,-2.988551508476151e-16,-8.266661676445442e-11,-2.059111461287047e-5,-0.18916073972461295,-1.4043378295449076e-5,-2.967856491365323e-13,-1.1408583585415746e-10,-2.1688174187989161e-7,-0.00013937408496712274,-1.1480318109077632e-18,-4.493424968179837e-5,-5.684546611801711e-11,-5.6297044205855746e-8,-4.067991628167066e-6,-1.974671495928073e-12,-1.6450737181967154e-10,-1.6125629747194883e-12,-1.1157829114521292e-5,-4.029157305780257e-6,-0.16239416099813075,-6.0576241154470366e-5,-1.4291912233302667e-9,-8.26705963651281e-13,-9.257624543042876e-7,-1.3513578522656451e-11,-1.4867329770473527e-19,-1.2930729611451614e-8,-6.245955818086249e-8,-4.732227741973031e-26,-1.5244778818194902e-12,-8.698751234633121e-12,-0.0015188023879199664,-0.00020281580082447852,-5.37955570619361e-11,-5.653910251804365e-7,-1.6383638431183134e-7,-2.5082417368983495e-18,-1.5071260161016221e-5,-0.44881768720684323,-1.6504279111192824e-12,-1.6778788167417528e-6,-5.365409517268969e-5,-4.7481811806154876e-8,-5.977456299488118e-5,-9.770449480938e-29,-2.530102050035556e-15,-6.864404427042373e-7,-6.238548590041872e-5,-0.0004598548969769486,-0.000447468191770719,-8.444126067631063e-11,-1.5914327619300217e-22,-6.018608911212708e-8,-6.740674344574341e-11,-2.279555558114527e-10,-3.690589195763078e-9,-6.144060735241265e-17,-6.212005567796636e-7,-5.050316960555827e-9,-0.0010345076615857157,-3.2422911137444767e-13,-2.8736061882985334e-7,-5.0657045533051544e-8,-6.394554955734753e-13,-0.06783185159917869,-7.717294497110532e-7,-0.30986814298600474,-3.835382444630324e-9,-1.4889077806931461e-5,-0.0038470343629744426,-7.653253349848202e-10,-1.5393381914384642e-5,-1.2596736994951175e-8,-0.10361982151084713,-1.6885349626197562e-8,-1.2592390430661926e-8,-5.882368736201485e-15,-5.247637917437627e-13,-7.685665883140258e-12,-3.913188756120481e-15,-2.789748790578032e-6,-7.983875717720784e-17,-0.00016463070689083035,-2.2203050083497124e-10,-5.318070716789969e-10,-3.939933408221518e-12,-1.4831270380438332e-5,-0.00029728208722836836,-1.0113645340056767e-10,-1.5258678455191774e-13,-1.1466963645112847e-13,-0.0002713051245567928,-0.0007487538840981876,-8.159024602798108e-16,-3.266167198443365e-7,-6.02940940022645e-14,-0.0013259731714338773,-0.026638539015551226,-0.004004545412697879,-0.00047398503648108243,-0.0010596691874677738,-5.847085115910603e-13,-1.892855784094043e-9,-2.0577449049236573e-5,-1.1694234459611228e-8,-1.4807904905427263e-8,-0.00016816656964660707,-8.574550878483942e-9,-1.8846330471743807e-5,-0.005287216934029235,-0.0006164124112787516,-3.106572380459258e-7,-7.901518474684226e-6,-3.732955324376788e-5,-0.04574998252901527,-3.274451044249491e-11,-1.345177310458487e-13,-0.021418869068445093,-0.00022454576085465897,-6.149939222791826e-8,-1.540398157873574e-6,-0.0003740264125283203,-2.0735101650877983e-8,-8.523740165754495e-11,-9.55772438838692e-9,-0.002844598247334265,-2.3369664869142017e-12,-9.949301873379037e-13,-1.069825432142882e-12,-0.19010803856871655,-1.4021566286412669e-21,-6.265373384165655e-5,-1.21185273207833e-8,-2.995952036639308e-8,-2.197007763195726e-8,-1.2639400673640182e-6,-2.9305782985822192e-15,-0.0016323100791360917,-4.86302912471239e-16,-3.350006918134489e-6,-1.4673199740892591e-8,-3.0281435076021173e-5,-7.923414246773424e-19,-0.0005521977103810804,-5.917967415660421e-9,-6.55507669706179e-13,-0.008792604849514902,-7.138299260996372e-10,-1.4479194481697105e-20,-9.338844836349102e-9,-4.2184480325122714e-8,-9.817728299897508e-15,-1.5452106803497327e-6,-6.455812407003039e-5,-8.915361817555502e-6,-0.006484894913026726,-0.008287059487910727,-1.3705643777279687e-18,-6.039280248870882e-6,-0.035531577980837566,-2.1569787975260612e-8,-0.7624440561128932,-3.2229440794133826e-9,-1.830968372469216e-12,-3.6927491182203876e-10,-0.00277632612902542,-1.3817948357739266e-5,-2.0424265417368527e-7,-3.488000656357162e-14,-2.209519499311037,-9.031307195529436e-6,-8.331514330718381e-8,-3.914333600363571e-6,-1.2152525095132018e-8,-7.037490108879787e-24,-1.0104316425493694e-6,-7.147986711499802e-5,-2.635582180944091e-8,-9.472279519636348e-10,-3.995844454091957e-52,-9.525182967236265e-31,-3.716819338118356e-5,-1.0247494628088098e-31,-8.290534622796782e-9,-0.042813106951508216,-9.052230581886442e-9,-5.839220609003081e-17,-5.915758836036233e-23,-7.999659451620212e-8,-0.007966077514184685,-5.105689544966936e-7,-0.13903794176580894,-2.3941709316566835e-6,-6.140508668508772e-9,-0.014904833937384059,-5.525687955283955e-8,-6.932320897829736e-18,-2.2028878355216e-9,-3.826849507607244e-15,-6.818382005318874e-9,-2.838343698072862e-9,-4.132413051732969e-5,-2.797047744168103e-5,-5.448001167365618e-27,-0.002338835174465867,-1.3946052655803818e-7,-8.328252216978944e-5,-1.9051807844086088e-7,-1.0434173944814692e-9,-1.9902121131138317e-9,-4.761829077725824e-28,-8.92309557550526e-15,-1.9643268377547734e-7,-4.1148620994115236e-26,-4.744645311716617e-6,-3.884218120285988e-15,-1.058599825646125e-12,-9.055650162853386e-10,-1.3888661073028746e-6,-2.3705249037927855e-11,-7.112539355761648e-40,-1.3072535407524574e-10,-2.5866666014184592e-20,-0.00045812137296141975,-1.7724570077359095e-10,-3.150446918261349e-10,-0.00480726887791721,-1.323019710017997e-24,-3.024080450265593e-7,-1.9885652933508185e-11,-6.153186893965775e-29,-3.360811167987486e-10,-0.6008927453378217,-1.1562665699635394e-10,-0.0001217923856785022,-1.8209023822387745e-6,-6.0677441125950435e-12,-8.298711005211808e-5,-4.338541653350225e-12,-3.084964108940545e-12,-6.671168280989902e-6,-2.3869785013865415e-14,-0.23528933495400864,-6.649618241058433e-7,-4.0340428449813576e-12,-8.954938921486522e-21,-5.1234813178576924e-8,-9.177686485415658e-11,-0.00012285920205068297,-3.055938128663592e-11,-0.2417431766432844,-0.003709798840895956,-2.406026885087983e-7,-0.004953904064696733,-2.0243294588300743e-30,-4.542119487961249e-15,-4.081285242295144e-9,-2.1901008122228606e-8],"alpha":[17.591020811408157,10.301822189124506,10.902396365974447,15.806469403971985,11.862686921625578,16.814336319125616,15.927919849724859,16.194003277937554,11.348355617788656,16.539642541494498,19.389765098360854,15.76495869069163,17.734678591454756,14.285097909356296,12.215645182590059,16.819281657379033,13.970766305851187,17.672145021920773,14.933637475538987,10.691834870623374,17.296613273759082,12.168158732245434,10.42999102438859,18.672503800287608,13.39235666131562,16.036090725027247,12.434059018858918,18.172369386295102,10.451731188869664,12.550738481567144,10.103571820849126,16.83270666315729,18.93998164549835,18.09324012594049,13.583478021358527,10.812431690087518,17.38275560630766,16.928218038293792,16.530507728339973,19.623302171437594,10.474411580730367,13.38819132243566,13.747372587649478,16.343142014901925,18.464293474334262,14.664487501956465,12.821915105767474,19.73192880040589,16.76920045058364,10.810794791790423,17.15692309802602,13.325749669890104,17.600582256530416,14.018873785457151,18.199869292316723,15.532333681673675,19.489022174716602,11.908121554747964,14.750324452717006,17.12915872954934,19.21677420400418,16.6781468894911,11.010674750310855,17.421810556518487,15.102571671596445,10.507205383056338,12.566567157473635,11.876412028910172,12.192519194331108,15.637550813044347,19.98917062858356,16.13719985894207,14.940143035661976,13.933225743216965,13.94416108861078,16.16446690049185,19.555635624667957,10.128239154742314,16.322630651911975,14.531049072884183,16.50586658576359,16.81766048919671,17.156342291917287,11.95038857375586,16.29282102574456,15.634654305978156,11.46767265461653,17.001430386212462,18.21925661318452,15.157162534591087,12.518819148632186,17.808366068904732,15.287876854320706,17.69549612970706,16.938401354721265,16.64823975456123,10.057042447870261,12.983797204704091,15.501686727379564,17.694124142945284,10.011578879294758,15.406043361573383,16.68857055094996,10.74639341912061,18.793174582925865,11.849601556687158,10.452401478209012,19.168010595415197,18.00964127557981,14.442117635438848,13.17890013038345,15.360264140188448,18.562723807316072,10.540032083588738,16.02481392145685,15.290746205857273,11.293823019023062,14.25545230088942,12.128579432861443,11.060933601843374,12.176298833095792,10.886113307282837,17.822394953289482,13.825316633101107,19.774076769115936,17.049192920459475,13.593106671806845,18.098947550132415,17.735696650593614,19.527205102979067,11.835851278039097,19.594705051073497,14.418277868250138,12.60364885337327,10.331091965033036,12.60414671827151,13.673547955856822,14.716128743374489,12.729148648671329,15.968802040701288,18.80637962325951,10.584534605443883,18.367799255957316,10.221177455763497,15.864983985244942,12.680099692740626,14.78174441922991,19.367685245946845,14.278136834635205,13.310239422149497,14.539091223271011,17.23720546344604,18.709174015836055,14.377376889043504,18.501307745820363,18.241097749148068,12.759198057330734,18.042454696736932,16.47767115997846,17.072377762794712,15.076649734078622,15.083988108000739,10.998366949871093,17.03565456835378,18.515411042087884,16.72093693561063,10.631290662016394,14.195816414369084,13.521707903652139,17.918551481557166,11.286081038092593,19.649455674400166,18.692387541743,13.213757640118924,17.358452841451083,12.084456474963584,15.60360925507893,17.378891414837025,15.18704213404315,10.712133222940942,16.525316235195838,13.481729867280256,10.902418687294777,14.531724408992947,11.118726764841451,10.651063427620597,13.563302105155348,19.048956363896036,11.982063298422512,12.031616694501519,17.039758203251736,13.267611421581906,18.577774891172723,16.57344742532926,11.709836916378437,18.14615905579717,15.547758759093904,17.07945321898411,17.300761564910545,19.273455215283516,13.738140244468111,12.879448461463657,15.949973060883266,10.94724889215976,14.01447336129819,14.050228591723343,17.45539286352294,19.404265942973314,14.48995055457927,14.120212596094849,18.549886038305267,17.845405776495504,11.592920344097868,17.631882316328344,15.783952589276291,11.00286706350192,17.349885034349803,16.118127781069944,17.219159477422604,12.656793939771037,15.519059550038754,15.633068857037438,18.08710616851794,11.077684863582729,17.573824183314628,18.70413994009339,13.285418971818787,19.661302375710296,10.335133976206146,16.967197758246833,14.777016003350118,18.875441377978735,11.126101049660841,10.951354568482447,15.783309352989189,14.331499123662216,13.948363048642701,10.713483793651566,12.765002151923483,12.43399138720706,17.774378530456705,19.79151246579678,15.34348519916437,11.35470893576053,12.901105260033052,18.994325329576874,13.456914162544592,11.458165405400356,10.949838326515088,18.50581614444916,18.202614959315614,14.280894258670077,13.21278316326676,17.385644954372445,17.303964150096313,19.140558883608726,14.376044042541345,13.981783949585541,17.684114267692497,11.564766879642187,12.572205551370653,12.716638532905522,10.908011123597593,14.872863320242764,10.78165349786602,19.364940855919055,12.566545796622286,12.478834635672333,13.231433909673546,10.951375383483233,16.04009276831705,19.825633401680527,13.712576603443631,13.143195043570696,10.878771281084461,12.266269067291603,11.861106791995656,18.129856340502656,14.785142816180066,17.885608954338313,10.114879055346506,10.306666777856003,16.336827749230054,16.19407848037616,16.48537986363356,18.671603468134126,10.981391750852456,19.86341459648611,17.812583857021277,11.770722924106414,14.648560206411688,10.384586909239244,19.192660309958615,14.311999998454134,19.12241056559526,15.141744268106121,12.889383120747018,17.127581496582927,10.818108806441282,12.669060540204313,11.28675800642091,13.747241427316046,19.084251253455296,18.77743381311328,12.228478714170448,11.88454920174795,15.682837525124778,14.358236259170855,10.72020988127184,14.66319191453929,11.882402261742953,11.770450246527432,14.856013282166886,18.53804172439453,17.607610523053225,14.171127114638697,14.684945665338763,14.46673004695688,13.551945157167719,14.714307024441787,12.729713490685322,17.81148952996824,16.128012447588358,12.214493387862937,15.901521040664946,13.581962640315712,17.918697815212017,11.658606636036062,17.839158506927564,18.773350781092464,16.065269184096547,15.126460033721042,10.044835065841415,16.272968152368676,15.25345569666851,18.3679588232901,14.85626399935656,15.192966267208615,19.693992431060277,14.781952650865692,14.101586236588545,14.39732779811855,16.219108786231736,16.56822608667499,18.815175572574034,12.821648872181227,11.039672742643036,13.21368825913864,15.158261597615235,17.602599962908673,12.679012511410882,18.783048077754607,10.725799611535095,12.862941197137845,19.112593709123672,19.486119232704404,12.22564054568262,19.993809089289478,12.724618842517149,15.107482938763576,11.194408720074518,18.412343052181598,17.235494958406605,18.77978731224109,13.078382852109854,18.655460812473315,19.1176537879044,14.368360613416693,12.124690038396157,14.720698231694655,14.028952437932398,18.131101169276427,18.16662448329879,13.511944940102833,16.263081393611895,11.71691534249673,15.533447957288416,19.10343376591856,12.3903751660883,15.244593196994892,11.5505917026697,14.986022049530865,17.30952855973776,13.270877710179702,12.206587483607924,13.227473092133744,19.028028841354192,18.558592324457535,19.61498334136072,12.196597990437954,19.354780882127436,11.228335669103902,16.268854361078944,15.592908791432784,14.177413753401765,12.417374606037816,11.66003910527974,10.472482645427707,14.773911652042155,16.283760296832952,13.048551442952164,19.674858442075305,16.022605652219,18.188088797882926,13.131336636778173,10.068906407584347,16.872903728123838,13.080277916757908,17.92410001768427,10.438960400914684,18.773049771169163,13.228367366141763,13.063667163144256,15.214374994895136,10.83521302192542,19.53961926247503,19.480861443267994,15.30975936772963,10.58992865666649,16.092817067255798,18.38292928090308,14.969892865796686,13.942964020608882,16.795673941947506,18.436590358220766,15.564376981642393,10.489011258820696,14.013165314734191,19.091564812035614,19.642313681187318,10.405847064611262,17.487368610473766,17.799152444653195,12.865192875735016,17.776124380987536,13.38212307450986,12.568601463852021,14.614688929489294,17.185513997110256,15.142681486279653,18.973672552929113,19.967334036673556,12.969654488550546,13.391173040824082,11.211672947871493,16.239773342271818,18.882545902348944,16.423748190414308,13.176560894541788,12.807816218343433,18.013972382741542,16.081095202070827,16.703117291808084,19.07220356278951,18.93487620379769,16.97939881025949,19.3200652788261,18.25721013079606,14.674993756860207,16.319176738287226,18.341046978382852,14.265294419272454,18.92958905663643,16.776763916345082,14.517546826041192,16.910009949687936,14.46115386136989,12.441608385209415,17.166016363477965,14.464115986908997,15.614097658171245,13.058405334704378,19.834213479768955,18.72855486592901,10.20453657536137,15.224588058586333,15.293188016369355,10.652776127699486,15.386849880020998,15.962939505867338,19.839976467661977,10.405400088687182,16.88178529987482,15.558489497530712,16.409444928501927,14.610237531062753,16.56554931062015,16.504367603829294,14.618810024904507,19.233972649773342,10.991233803742341,18.290569939668153,19.54145232736697,15.541950460573098,19.773658453755438,12.148110208705937,18.68971219073731,10.747401168895648,10.682804495235834,11.678632575236536,15.342977178408418,14.490744496450406,19.02921925684249,12.215553951605385,10.898635947776661,12.500911666406257,13.850136984284216,11.968915961307445,17.775351276893733,19.002321323014584,18.07532252738978,14.98888237716481,10.235135806246639,13.993233619632138,15.445491896081595,13.375920052314589,12.99374274649873,15.93734958500063,16.229958164323882,19.90274665704625,15.488091064137349,17.111298439211232,15.389948254779867,19.14707831320561,17.242947348865446,19.848930223679282,19.291715016926847,17.221677844776877,12.463083716766537,17.986250572298367,17.50802444125994,12.718462036398305,19.219589003914926,15.586949138982266,11.053152178078939,17.388390487728856,11.980328072470193,13.940635146898522,19.66731491379807,16.764003708542326,18.770718998100932,12.81451405114624,12.670774939361726,17.189721939057044,11.782789276580747,15.486196742583687,10.572491295217743,16.825901425480467,17.306192080432936,12.920828761084469,10.832932101073627,19.79265143586937,15.33597468188129,14.436636753656078,12.593222224811505,16.918319127156533,17.27279756079622,10.781885251894971,19.79301609704623,19.71320263877162,18.79835343640898,13.970058937608202,16.05789704425745,19.77956682471181,12.322492257575776,13.06988566252498,10.516413183722813,13.23297514200852,15.4327059837303,17.50991661738847,13.69918851640154,17.52504950955879,16.11671801208941,17.380102794714773,13.124187920455906,12.983952753571637,12.971713298921266,14.750840843484072,19.09690066158738,11.155505968154522,10.343551362457536,10.549566832774335,19.170526744698407,19.19692101185414,18.41777889993009,10.892983336618535,17.494136696978376,12.974673012138725,10.183511005651853,12.117937375073446,19.270889412098583,14.436436303713657,14.698387543369762,15.530212520868968,13.371454438294975,11.416010046072646,12.013851974697175,18.50205650805887,14.654042068572926,11.59621153743168,13.453352410109149,19.75787055158405,11.893098609360313,12.606966982176207,19.088183219739985,12.167845650271227,19.068968351917665,10.99857417607673,14.463385365681683,17.523040700574573,18.971362170699383,16.16508698407144,17.31264940522248,18.42726308146944,10.401075178010135,17.2733726101335,18.06886445549676,13.727035689642326,13.689119735907697,12.352747911061687,14.732995397098914,17.533664403919403,17.71979925933094,19.741018728949456,18.544956583000825,10.816941579185823,16.60854067482863,15.105625815440806,17.739775528357608,12.922802545645593,18.40203921050798,11.043387873496954,13.4272727079052,17.85132233441633,11.326397242654194,13.838594859424212,19.36782075723613,11.039884445853092,15.913015729753855,14.863712461284727,12.018771987425925,16.218092020309346,11.001114959955533,11.280640870365211,10.974147290534201,10.079854590006283,12.859035782003366,18.19500008450232,15.323830516496358,17.122328220631957,14.955584633233626,15.358217378940349,13.622326118717075,13.08368874471751,19.692225350856845,13.998029315288633,17.300191376968552,10.38305939820999,12.258758037888693,15.839780947697438,19.660153482248827,18.682814437715628,10.800782343867365,15.683701733282946,17.760426704973362,12.26361360806582,11.947730253615465,13.761776281649254,12.61789854211716,14.934657433563325,13.888907228833675,15.123187134256565,12.325876044196137,15.958800671268612,13.902065786681606,12.95066786935803,16.79625896663347,17.189565309873053,15.59754180592535,11.815098451344788,19.570887623513542,18.943752041481567,15.163973967483212,10.508642339127904,18.53189585399054,19.895237689800055,15.64327344820137,16.887716982735824,11.123540107717325,12.978915493894625,11.951177413812777,19.824349241064958,15.467609689894847,10.960700714872635,19.52210050987078,19.579574154961968,18.81216512836739,11.903408189091069,19.205692095067306,12.379471237123473,19.82177873372092,10.017213510083032,12.206988839619354,19.53715943815071,12.448428974260706,14.369000985540598,18.934782140566863,14.403554037318605,12.22242950473587,11.47066331226091,13.614824754195556,14.640194545138074,10.043894298646698,17.59703971493942,12.91533733844558,17.138221750224325,18.07986838860878,15.72554544848244,19.04207398497141,16.802920868208986,10.714112834882073,13.219339845671305,11.172809812757961,10.983196412879835,16.59972262827901,10.2647524873619,14.117517304832916,14.678692689642423,19.032640180860056,16.671493445953125,12.040875718020953,19.512685919466563,12.748635405960457,19.934291683564894,13.08408929324571,15.073401335060986,19.467733679996755,10.611743501828435,17.752336339189142,12.684802286468562,18.00560870059445,16.925835971905812,17.143851849124907,14.5402667987688,14.501192359075187,11.88329378846934,19.882318044228356,12.718238505494766,16.13396256401753,10.34126421010427,14.344602958480632,18.67508377649528,17.670569146776607,18.73134616355359,11.12060586246372,19.821582603214086,18.62658430405279,15.366035948474542,11.6281212399585,11.447010186161041,19.45195019135351,10.637121602372154,16.32470202575854,18.206957649294836,17.534570979440645,11.262753775715266,18.46823772229974,13.631646207876178,15.017941746828573,19.213484362477164,16.48182715880292,15.735202040897168,16.36532441893185,14.183087044500775,12.987880119881448,18.83956489501287,10.003678747321164,12.043660340112242,16.624359438695166,11.39469570073679,14.27648156646292,11.199641191602787,10.384202729929587,12.696965448323619,18.781049730726938,13.142687483856367,12.550809872425164,15.46915745162532,15.216887109545631,10.35276815162684,13.78092604961234,15.43888297824363,13.596386220044058,18.90947442290068,10.968185234227457,10.615301277945168,18.54972908256303,12.066843160701374,15.464326596560278,10.447863254284751,15.76690687553592,11.121457948007444,14.465906201051462,14.380198895148022,18.828861201185596,19.402928984675288,14.719135007073646,13.06581831506282,10.563252688127886,14.08964167079803,16.712415503486927,17.811129304432793,10.23044453025729,14.334862651632639,18.116998595679974,17.95491464646842,18.406162689776117,13.47323014437565,18.718225847199623,14.061013760419756,17.85643129149428,14.94447339789623,10.692738880539805,10.228459026101568,17.363700552380777,17.823386690403954,17.676684631788433,13.593115880412663,14.623169654259547,18.599217441575732,14.251531169543522,16.165976404539602,17.29464382435259,15.07730415191923,19.31152820871651,15.67807309299784,13.465774404519165,18.523085252652812,13.931627045015185,15.808339707166377,16.664885412293888,15.12819624744907,12.58774674049617,17.436797573730875,12.646601075860877,11.93077200115058,17.665218545494973,16.04140147347115,11.560870803548909,17.03729543973186,10.454511451274467,13.899538337381179,12.572303447606165,10.102618835968627,15.966285422731838,11.173832031642476,10.437736941114114,19.466449567039916,17.144019295790752,18.431360476530642,11.647220496828318,14.716326652854937,17.779855152599236,10.678573225998027,17.520296626302695,10.784598794951073,17.231485504562105,13.459003791603712,14.242575243104948,17.130895677884304,15.749135232293693,19.345853405702236,11.49589075592841,12.919526090951333,14.642236754622871,16.203877157879585,12.269595941476172,10.817977958170859,18.10808436865905,14.204773097413756,17.922911442284658,15.939392233092708,16.4371133150119,10.953693983277713,17.643519351376984,11.80080348333442,14.401416271670854,13.70387134879935,10.006324023422009,15.317995099742578,18.01568550155764,13.280432475902167,11.823603575207894,12.1554267961476,19.84282680499431,11.667217470783191,13.890163206045955,11.87628391742674,14.487334547901225,13.81701936282118,10.33946648761015,18.141803642954013,14.562161417760848,15.024295535973566,13.933081989748128,10.063947697354793,18.46845606958292,16.16960486505442,15.488467172443158,17.295808154734416,18.79486362627453,16.32521316709886,14.720056553224332,19.535548382146295,14.166305544546136,10.104168233976264,17.442439838299318,11.11556857352942,11.796203990920752,19.612160291231906,15.22341616022355,15.918494794398377,18.678144871221164,13.202107573199848,14.031466003932458,10.361401690940612,15.024097805501096,17.71695649835875,19.565794739699975,14.954109070708434,11.573760346923443,13.833807756845012,12.013607013797627,14.645554053510201,10.513267191191611,17.60473434575959,18.58106296566308,12.458996165649022,18.169325011038907,14.86045642296119,19.355316590534713,18.510291202836093,15.638528931866421,14.446666527464927,14.366029262636108,10.95231476560686,11.89696176427834,12.274217739356176,10.563719455502511,18.471996292352195,16.217981140764294,12.56477509009473,18.714629426159405,12.608383963396541,18.157725138260375,15.82503780295302,13.912335207201558,19.275083875894644,18.576371879651035,12.73459484745642,18.314166603844235,13.536346790263496,16.096650515951985,17.69923488481601,15.358889013640303,10.0750024006382,16.29622377248807,10.032601163049232,16.207206534668682,15.551109205911839,12.51041811240545,19.17857167916422,18.806688942007856,17.119282418087415,18.680302542880874,15.617330077325711,11.57382330328819,11.996535178284544,13.95984531528529,17.02946902364478,17.82728391233752,11.590397496682103,16.252580518762585,18.785200195611893,15.360261235575647,18.042920488604253,17.55182486936809,13.312067199465709,15.4640254088593,13.86945891482048,10.063571885965581,15.217169809277216,14.894131813587308,19.794616790815986,15.958984165127273,15.757589919249842,17.248942421026165,19.45904195311276,17.633067173933256,13.420518599632993],"x":[4.98157506033353,12.08552305367829,7.596239878466598,19.840848872937947,11.743058503195119,1.5550061771217205,4.856767024225139,16.996890790176046,19.068596756416802,10.213852033281391,20.838418061598095,24.89973854613451,22.742529855462166,8.989622419291333,8.03903250064269,4.261084498696084,10.497828463881014,9.986330083269293,7.165451348811336,17.00962516859261,4.443572302658905,12.83397892900275,19.432487964681368,19.504199054598313,8.994681194782624,13.265827568437041,11.849289932869713,24.206016392587856,20.419454119682133,23.004896723090713,12.497441553258222,9.37551936209038,15.42542232517702,8.24414273845364,3.5811017473693862,16.54995406028225,8.97430942678421,25.295853454629558,19.935427697012592,16.598455941984145,5.796534923223682,5.252201022240706,27.605065308038462,20.18828868760196,13.230883027609796,14.727316662157214,13.825800975706189,27.010758731261575,11.295884337001144,16.72299916933321,21.985295685667392,15.919490177227916,10.830068836322212,14.641488500860433,14.129323098675146,5.181968331496549,27.422226705997964,6.088110491570495,14.766226422547774,11.290995840867144,9.768392935188274,26.845057694188935,4.125385261043746,16.903025154796346,19.6950049469504,22.88130878408708,12.39014101685623,10.69070474981497,18.441318083462345,18.913817809112516,18.13105835477765,19.68542273935163,17.727691846547707,19.91505282552769,9.93549488705244,12.25407568886931,12.605844332211792,23.4229391667758,14.221602320253819,20.42262765356641,20.597095413761856,1.787237177590426,17.00740064348602,14.946134299946024,14.801465876973376,3.947279679339881,21.504417317888304,15.872660796020877,8.100955708389385,5.428413525200866,9.813442764113681,23.72460491212963,14.820996290121565,25.11400083435011,3.576287442819903,6.796082455878551,16.91462116984829,21.552570793258518,10.8373883150959,14.100141446329285,13.984180307979967,23.415602179745036,7.2203316779866755,9.12471103555713,11.324618099937783,12.221487678910874,19.533182970825983,1.7084268286123838,9.460392415428132,19.508014224334588,18.777575758929878,13.03625184724853,8.617744708393715,5.193396609130354,17.694881659174076,22.1448583341789,19.177023727665674,5.02826207024045,18.875676390967254,8.468043952018032,21.860456250373975,22.66120945607576,13.740937557244493,16.774392838791492,13.896994270041727,2.3786959981891176,7.723537774636187,9.642318298081282,22.49151113379768,19.06706759951622,15.33268357298352,22.330241050718794,20.513544864141505,15.179062502872466,13.07810937695306,12.116773013752285,12.602769186719552,4.508122421214353,11.988550520077737,14.086899957295081,22.786898373175234,8.475026951654954,20.52675659753739,10.655652273835702,2.728969280379352,9.634807397388027,13.875336266491221,7.460632458070902,10.722950916795668,11.542221251935434,23.68852230543137,4.237108398535918,6.913493694408861,24.48635733253029,21.847500303052087,6.396250332045776,12.446391566184316,5.669948415854709,10.475442216638662,14.459163983102929,24.469876907548677,22.223131474770966,23.66479931198446,23.918415771927666,8.036394568721619,21.423434807709604,12.587446251398854,6.026130210942078,16.62084396696713,8.344108494049891,19.090665340501687,15.192217093463334,24.43120152840008,3.488377208109017,19.93358084652537,9.21358691296112,17.899140096632518,18.402570734943243,9.459918694886522,5.249288726055159,18.891958833700777,17.589380137016526,6.989896814273713,3.469583366555351,22.356146588756296,1.9129101544985994,9.78386588349097,27.11413137924034,16.868872224980908,11.8829534553759,5.182153254875728,21.689320502679735,15.209660610912143,12.21556455214957,22.649985346336123,10.21113892524043,18.16643657786674,4.398143675062798,14.786675780106108,15.719254798334706,26.816092511446257,15.529081203632078,19.90870616574761,12.954790133978385,4.531776899430571,19.99707592464851,11.683384734992707,14.026417525966359,26.173463501200047,11.702644897945188,12.77128187569092,20.7809917801111,15.10881053278724,12.501963172507919,14.223024335235625,12.712760702437025,13.909644683282815,6.8350024457377785,12.006173048478178,11.699100771583598,14.648872338203812,13.04755529785453,11.022615307302008,22.68704883268383,4.006608353690851,20.353263150926736,15.851450634477079,14.38691449311042,11.932156425358999,13.572811229864413,10.60237370943719,21.73643665488776,16.857600533356557,11.190607120561651,24.47795325114737,18.907928036974024,10.689610795260915,13.359803977306534,11.810597267296696,17.311773604137322,15.941722229973472,26.1686825013959,8.950981770783349,16.23923994933205,10.882169783632957,13.292542894379062,7.55986497441994,14.954240547883384,21.473883217939782,22.209725733374988,19.388961529847606,8.513177315099709,10.415779847820756,21.388056670009746,17.466866336615592,14.676521609464581,18.223000985194204,19.78710206368652,17.546523855757165,16.969054878885093,6.855601900328445,21.71655358297925,21.443759172335728,12.37898093247408,21.841380663986044,13.039309172575667,13.70682517275534,9.0705458292012,15.024709905308764,16.486286608731284,12.587036467804417,24.93482008144982,25.910565611296644,16.392616061337577,12.805879403262583,8.959311342839818,16.122870085273128,18.678386933293332,13.956530797849435,10.44300475657614,15.900764409792266,20.58504910416685,22.472595233357122,25.290170430072646,21.579865543320217,20.396903072616897,8.740680628331726,24.49191649823174,17.84568049928355,18.195448372329356,13.891237117445277,16.097482185355098,20.99452575758503,6.749551515231413,20.31002822087376,5.205120924794051,12.796153649360114,22.089282960400787,19.98846556216172,22.574694428635027,22.435414391148427,7.512463055913059,18.218489990475206,22.99161949690411,12.587707844443853,25.514962470743846,18.009325323478635,13.581247597817748,21.68012390115374,11.19073340668641,12.25325923078399,11.937172796055815,18.034916351811525,19.795131764711844,8.972334064250933,10.429445517553685,13.85013400410949,24.998909518117472,5.729312048215999,23.072140256800616,18.16021185814687,11.616674435968118,27.67477183967386,22.840541148264982,13.761964772684719,15.133717584042568,14.592148096204065,8.78833284801776,7.1526938894428564,24.222568092516163,8.635004794086695,18.63578251327728,17.88239500651099,14.89322568682677,26.684964908747155,15.56799025732823,26.531017035061176,11.25535811293136,19.107231643454774,14.390159117283371,26.99581115197374,16.19611385964076,21.75181827911144,20.111365527152333,20.75030729253555,4.9331080870181765,7.664991279521929,17.859780500823536,17.670119729876678,7.317481400003878,19.65916101096079,4.209277068472808,10.418803698788139,16.4094337541629,6.0042166538863535,21.506460123277584,23.502999670290084,18.63260483764992,2.3136174472373994,11.093167391955326,6.50319093727248,11.055654683537714,20.09057425910685,26.945518198113323,13.33368680839884,10.080515899738142,5.455364229872959,8.390520086479139,8.008009709189864,9.442383083980381,22.367044266350895,19.22383316301515,14.530304624864876,3.911543938645625,17.658883481089923,24.554096987091576,11.279104931661188,16.22606500624916,12.018061059815048,24.76261279842487,19.01699194364635,20.724336932540645,11.50966039890141,7.144526151018782,2.169931276687982,14.7612350190645,9.301546044228186,13.367804104827263,20.412411524837175,19.19052002522804,20.135413424295628,16.61632769651557,21.229519850446312,9.814561094525747,16.578479511081994,12.119206914590325,23.963555435789438,22.216313486395336,20.324231770536283,10.042884640592295,6.701047046629672,11.405325140064802,3.0144618300764003,8.593114585411145,16.859267167703603,12.760320307551476,12.070483670841966,15.701864519261687,12.82159417243794,16.58483911987517,20.712130780282543,11.313858816253727,19.90651614029982,11.488717338389359,26.052828519013698,10.012957542096059,22.970721842160675,16.056618086421857,24.793531952979087,22.27624950644732,14.105380387998922,9.25537968759232,17.18666203693529,5.322652271537485,15.032837356935687,24.74938120009563,15.41325656122415,19.349114763409727,12.49683374891447,13.00046207778451,8.388556214451073,12.257718188706937,2.2454216366810864,22.249788911727705,6.90208482412048,7.547094774047225,22.48541614315465,21.53783378223065,12.448571953137801,17.4243118453266,13.93943277635917,16.938491367760022,17.513351698901104,20.597416393264865,6.367061698856307,13.274906850190995,22.968151720822263,8.55164107962034,19.129989657293713,9.25716660205282,13.590798726601745,9.004060426829035,6.453088348222371,17.95787602496548,9.661108962486598,20.02512307670036,18.578430867894237,22.48499586356458,8.863522138475446,13.333504737935012,10.037400447311578,17.494803000444655,16.532368457842274,16.2128998064658,15.50566369454799,14.512629830484455,15.8836366655276,3.7906306145864077,22.195365733565303,9.804019149299165,19.297274287815753,24.749715509759405,25.46654053763499,11.690883006848967,21.103611299147516,10.98769854830764,18.429933822165367,14.85802196365202,27.896416330335605,19.3805709974186,7.0804648628515405,13.118339431453682,21.700002265609534,28.477436446924806,26.21243113084372,9.579828167772678,11.789328174715754,4.934979661728505,9.596688776230721,23.449225628249078,17.407988362425268,19.203281489461077,12.111181679636967,16.5202866161477,26.876610525866447,20.439587493688514,19.769236795742668,6.602197239165999,16.130468530893523,5.077582229207652,13.714561812916644,25.33663523730234,21.008690722678622,11.756686057149551,14.339713648558295,18.24519224419603,27.712769053537173,9.5977795219139,12.602566601619984,15.197682651327451,11.21936493889116,10.527524300989498,19.171245234667563,7.94675958887141,12.794628564293205,18.012066223877046,6.398410320841574,13.06556431119809,7.90297799781281,14.414968343069583,6.505917352604249,11.393826440312244,12.896816965479669,12.904545637481608,15.12294980727186,14.035389609288337,8.946626180293944,22.29210735545295,18.164227665636023,6.826579121376202,10.832331598599838,24.19690297023658,21.348814248915417,21.430622845045956,15.998414026228353,5.501458064232803,18.003855262421467,20.364803272621426,20.069469460751584,18.387765375457732,23.287975672378852,1.8839249123217439,20.168913970670033,13.139722163172344,14.467836108901404,18.951254996535226,8.96819693909385,16.43219758922031,7.534743276701423,5.685680859587512,6.162674031969903,16.193972457780593,7.866090761944979,17.063483551070686,5.663691844361762,10.117013958727593,4.19072814531776,7.578614531175784,5.274259405432719,8.677184506319467,8.817841379178667,4.73876528863406,7.698169345315328,25.967985964905672,5.532291384051975,24.19314995290147,17.32359730178794,7.745616507998672,19.14692417715725,22.706166553247247,8.919771715633772,17.73695278089569,19.16157489630297,10.2678261186599,1.727409672436775,17.769850854214265,11.781840512503026,15.439430699801804,10.499512183432042,10.269969901935987,10.40181632908969,19.659048515818277,4.725961322520971,19.12090964887412,17.056810696995598,14.550157288812654,24.30761048278073,24.956618531134325,8.51919188062861,21.04019270496476,12.30061533355344,17.989362531716733,19.955319894325367,14.911765253547445,10.154590199335834,23.115765314139924,7.168018485429249,3.4673898623580035,20.847919728565948,20.105448137143085,9.660191782823034,19.96983656056244,25.662517437248603,11.400853802507374,9.650098425780111,23.576568878975472,29.857060174391766,20.254098724410046,5.5870060219987705,11.913561082344133,15.386531495875097,17.375895531561216,12.941989134872705,26.320917698499557,10.377887577224318,9.894159098007112,25.702057260505043,13.006384537110975,16.719258570133967,10.789859403888865,7.100152192063341,27.358946572525248,5.522565038167276,12.936973546271403,10.695071879110802,3.2692601505720242,23.441152836724164,7.101498949025862,9.440857406379209,27.56642870450076,3.1706054023542696,11.948233160381177,10.288868510846203,7.975842862349927,14.930250954298668,16.583915352714982,15.329074292942005,13.294810898863936,12.247051562258648,8.986676481613562,6.624501442477122,9.024274490896044,12.145099771990942,8.697675072220637,18.646534757539865,11.32691324080357,22.09126118998026,4.005193324212504,11.793921955457183,18.951803918645282,21.286625598672273,16.798813143050864,25.186384824546536,19.52177200049826,14.904883981987453,23.41123253528267,8.73580616427526,27.79927768905771,1.5624286540497656,18.244222919538984,20.862956168513417,11.05508225015895,26.086420979402554,21.413036594206744,12.089761747770368,2.6805136099316162,16.787105006528,10.990091755267532,24.771843675848828,12.230766760173646,11.909914332379296,3.959719919104001,19.35026282837343,6.539301422944012,10.744405184047157,1.9144762524193792,19.322323056713305,4.7242279747887554,17.67132621417404,11.516123126906262,12.50992055606075,8.735715390258893,15.411744588282971,18.32800106692933,13.558538161951216,23.969738652116384,13.785455816135022,2.0854469676277865,27.1577095569625,19.045367093244046,18.119035113042518,27.265708235627706,20.70729958287926,9.06270845033031,11.783863815765132,25.489480070348602,20.395662167605266,19.997393750484946,3.9455233909273457,17.029079178901725,8.778676997731408,6.000348251913379,15.070140547745154,15.011200939640352,20.30855703199042,13.548275981721755,15.41084784749565,15.637565300785306,14.492183752393622,7.012004474593681,20.28415325037354,19.867339881592244,13.63428592888674,8.933729697552828,11.57372709804585,0.30050649476852875,22.128287738155585,13.099308084956213,18.73711549777855,19.13904442722887,23.095368766090296,23.348629814986246,10.745165423005353,6.3750258255966985,19.722380755260282,17.877074137809426,22.299195744944395,21.129546157034483,23.91175553322096,7.171844707529638,6.960340955740321,4.14774426114114,19.259889778816202,21.518757054084013,21.649284431632918,21.183959285159382,7.245150815161871,6.05470644309994,11.09865231416009,14.404935599183927,7.4823379309858495,5.054231827091009,6.833741984786643,13.288219440979377,17.658990347919367,10.879286410061216,12.903476108272391,12.11906704802178,7.9830314365349775,25.339314964759637,13.039905624856537,3.768326506803197,8.982866784074485,23.219558163897325,15.481017935732625,10.655683909906632,8.917054561134508,25.738293076415662,6.598034195899127,25.276326804213724,13.125189957299714,4.651439407126594,8.396551914245332,26.05550760260159,8.085114300336375,25.726777119962748,21.571630707853128,14.318253418047004,18.350183783959324,16.782102210969594,17.858825389623156,18.364394188785795,24.947377525827818,11.691816937390573,5.1949549964846,20.8745852357596,21.856313894321897,13.314016873851418,13.809024118346748,19.55481452797391,8.454405828031728,4.4689913115128395,16.794601743641095,9.582210003930419,22.4086502542134,4.908496020424591,8.336161798572919,10.921038657337753,20.92564798238859,19.441724933073736,13.587389815065315,7.060879043932589,23.023074792392656,9.934868408040767,17.991585602627143,18.67109518248982,11.721559851901874,16.673437612352057,21.694120462616713,25.734564151408378,6.418758153999002,12.162816109017786,18.461619578786074,27.567717234334935,22.90080668744782,16.692227358144503,6.980601347022839,18.34869539467295,5.664981061685294,6.3059588910327875,6.042839499168586,9.139019954948914,16.516000046599032,11.588154638252304,20.235169202643966,10.61366865193725,16.863622328986576,20.61219305207541,18.159379774896564,11.948631785594564,23.773739993103643,20.776307413886684,19.972065002910192,15.890842168108003,13.73105136383732,26.759140148517762,6.2807974976725305,17.615623507491474,13.333723888601202,11.169390862137021,10.732800530218833,22.08934685073794,23.49426069028621,4.524102761314657,10.725382942568459,19.790211457393916,21.3657582216365,20.828308684980815,12.140801250455526,10.126856041723766,6.168894748801293,10.771714256617681,3.3186006271329482,23.25647954918325,20.89090700201785,14.502124522983703,16.66682889998961,7.415182750394374,14.302539256477537,25.10326520227496,15.379741268099348,10.762490600914873,14.690805697284059,23.261071876142758,12.577101056623231,19.934633993166983,11.461515668441763,18.950911914909092,22.831117788798544,3.220015826408109,11.815749705257229,19.40289375458337,3.917415846198271,16.07155242219675,20.83727467229108,22.036194967395502,25.728610210869547,7.50023650209892,23.1651070517256,23.75925319550508,18.55509157380935,2.089288102375515,14.783481386343523,19.671735419276622,16.262075253254682,24.759217415783723,22.111991915238846,16.411903842088336,14.113709166011867,0.982199914728572,22.618426361248233,16.584051563725893,24.675297598081393,19.133822704621288,21.22361772644699,18.395049152585248,16.090669905114645,18.963653362246067,11.829941645456834,19.728990082658747,12.301201444481519,12.206114347212937,23.07918427877997,18.862676870855555,11.790634737794061,18.244805703695192,21.556445665006404,13.576809141631088,6.499955183995223,18.60343360865408,21.8554224498634,6.82889386532257,14.578265584441386,10.362270818956288,24.75980992840354,15.261465787258127,22.32291559128595,12.709152647014534,16.36073747942053,24.020714168968208,18.502916356054826,7.634946790726551,16.884200819435453,6.391076103160287,20.961389611420678,4.856886057808458,12.842556171023997,19.186432255821963,22.23809351869588,23.294192226156426,24.356004825554542,19.199450852537804,20.451233924137455,16.16076787248368,1.6108087486350842,21.60875043190972,1.429427090802755,15.255517394357437,22.38017716993193,17.200773572353988,16.251428002435564,11.051516239875488,9.01806113675563,5.844623631922503,27.582746083565908,15.744598566955718,10.036746579673366,13.8522914260127,22.477120231552952,20.362732020410633,8.660050173693765,11.317532512792003,20.836761303273448,18.458786633903387,12.73144745290049,13.750440167498418,8.170210113267565,6.789846000744683,16.80279596769141,23.058336946136656,16.547370360538242,20.402826397792847,19.5796878406592,18.083279523909955,14.885090593396573,11.704765054939283,7.99061140565729,10.73227907464073,18.868264799630694,22.68091584967781,8.449882863751153,11.237227283369384,9.902717763580462,14.305115316906491,5.419026356050867,14.43525153621043,16.633679930021255,16.25467277792469,9.066514622191333,5.9970631107253585,18.92137715290685,15.834642385048088,12.921899398580795,6.22140230676548,5.938476501419367,22.3588651737468,19.94167077234723,12.539393904918928,13.584644946114388,14.533522108492942,9.790891954079747,16.213271622620372,14.45459523068763,8.086012087622388,10.061323407351967,13.801859839339546,16.73660732334648,6.752503962752863,14.27518638814489,8.586165999170507,22.918114775227284,20.071477849736418,3.7628984596008297,10.011267639186043,21.542760739538465,13.068020647544822,8.03710214697648,7.218156772677502,14.465110460827278,25.80443282534928],"beta":[4.680419024542659,0.6771705446170029,6.898345306610752,6.640297783712357,9.878781322385672,0.6014155836184676,0.8857321736369017,3.359458198220988,5.683331467102464,1.3092672314250242,7.814993955054613,9.111379423330352,3.4234585632490533,7.677965631400707,7.621767905301622,4.207240128646692,5.576384968411858,2.6074377554572914,3.861344800112947,7.166348228360373,3.217407733220665,2.456542035566649,0.7024814548234737,3.1364080409891915,7.299777260059129,7.502120201177378,0.8620850067396479,4.4438089740094,5.620327173110587,7.068621952800993,7.077538485692427,8.547248231296393,4.200653817988771,7.012586997806041,0.24543783336692382,1.2697407339857159,6.020021593060363,7.044403008557005,3.567968188206061,7.652316645222403,1.3006150111357861,2.5448577371640813,7.737061768848939,5.45541378180439,6.248518087191548,2.116811172700266,3.3488666881668006,7.016407407286406,3.6700478101628375,7.098950224027658,3.6747329067147083,1.4550576874820842,8.699224199730779,2.7386750164378815,2.0624765388908606,2.176765211907339,7.48860510054641,4.336218938177387,6.308628350155116,4.35526874140405,3.6330747255770834,8.743531815327874,1.5636658159602423,0.9953176156188248,2.7217537367143696,8.4858866498498,9.982564636351533,2.042859494208795,4.066743537700304,4.970068055268095,0.5153433434397114,5.553599164748897,4.174568192859316,4.083349022676637,3.0031796923571763,3.7488848855891277,7.587336393471384,5.736570367130498,6.377488893066512,4.259726553955881,9.285306354877727,0.6594842158098402,3.9885602458890257,2.8052575455159934,6.674759612672771,3.580434901378138,9.23578239050765,2.9552335205582736,1.99155183996776,3.7069213379128296,2.5992913948226715,7.677074065335563,5.4144128519994705,9.415691521782714,3.404159734868313,3.082926742799692,4.1483609436064235,4.9749632497694485,9.146985858642156,6.433963807846572,4.205631495958249,6.846955704517603,1.8324647894394808,8.198871432838288,5.705751009842082,6.28925765340147,2.068947841601272,0.889955372112603,6.944105586799236,0.6488213479034233,4.630861658282301,3.2886508832504058,8.178793357958241,3.495114219731681,2.7619539515555336,7.494218914616644,5.206060748365296,0.13641527428640332,0.3177669649152004,6.409810775977364,8.141358167840817,9.950623074158294,3.9794737345624975,7.261197385460552,3.782512879422222,0.8401896086554839,0.6795134910531786,8.948864378074884,9.080566425509797,6.260631339533768,4.96114225472676,2.952346543030544,4.824232290290831,2.3403654952129616,8.61233874458877,1.4342960231163127,0.5613549277151475,4.045002806973859,4.567224115854531,9.598886797402157,9.55446136552255,2.9072313226997126,5.556199381491216,7.7104179062207585,0.31312310408100785,6.9265748868605375,0.20228441637441197,3.068040495012996,3.089238295448624,0.18123218143113462,9.58167368851864,1.8184466554520107,6.742783230195157,7.326074815966788,7.678944741800007,0.14297257698039578,8.852812408958723,1.781878572980089,9.387501764926697,4.723607746607261,6.918289174429599,5.173646607442679,8.356315983340775,7.381370264279614,5.7711703100343925,2.5984160834991687,4.2064505874942615,0.14516883837190298,2.2855819533688915,6.968506052010421,4.9291861715200325,2.7890757891078066,6.997266585055717,0.333972157635154,4.503039707109253,0.8254400751135971,1.045275068143836,2.033979067248588,0.5707950280484964,1.4265750916508368,8.908816162987067,7.258468717636402,3.5720579578620337,1.8786895988893915,4.810373557820602,1.0890403786491798,6.282537345819672,7.530513657071991,1.6775962584900639,0.5539474618648588,4.803525433264333,4.558156456139233,5.272701473901211,0.6184433224535901,3.166110338662831,8.642410955813633,4.04779824973438,2.882891606331337,3.939220501436451,9.2253062962162,8.33712558448222,5.805523741651468,2.605164413538248,9.488382083135727,0.2493760927522759,2.99464927426903,6.898799116754635,1.7966054760035766,6.6096452297006625,7.092665731781507,1.3929867684066943,7.243985297464038,2.6485815547705993,3.9010160155592444,1.8985601431781407,9.89970511025607,3.4490768673981287,6.551396093243531,7.4662310337782305,5.1635294648181755,1.8623651993115864,9.931626240523968,1.8656423120688381,7.614878772959274,0.7405230501991489,8.22703268597499,8.245389815287375,4.980031545426728,1.3468839484190998,2.722122122855306,3.5648135921987856,5.287047247362253,4.082310872159926,7.238741100829371,5.8763897936734955,3.67259581381727,6.863849384574767,7.603065532661466,5.126656081332017,0.8079586999082378,3.837319133526469,8.566054354428365,4.92712080331726,7.043529880401791,4.6178658790756755,8.633864782411651,5.8284716544148925,4.700189052750076,8.864640070330408,9.466611633709585,0.46844176410616445,2.9791879587829517,3.607262367134525,7.875066890665721,1.4612848226457942,0.2990548685329397,8.627778144074574,1.2393558572682561,0.3685979890317359,3.2285113772721274,6.147345141595865,3.7576908218372007,2.0527521090680834,3.983786978222108,2.252476354614583,7.22726123031973,2.8750580173464346,1.2768172401917188,2.846739430915697,0.792117752967505,5.00575760579792,6.292613902498186,9.263222102465622,2.4893489682363934,0.05145769970776648,6.515100856255844,5.092413516572078,6.003856976505009,9.286742539212057,7.48848157847773,0.6913564641413172,5.99364030355866,7.603739607398485,8.238857057734755,7.717342400315641,6.7096710902207874,0.47831389338858665,8.261352700618207,8.081933690162874,1.7892552777010273,5.04248429727263,4.751592266227156,6.218046761161751,2.210507258005494,6.2793989307927855,0.5906970565847436,9.454902217955636,9.722117829512129,4.960038167715732,2.6272166889433235,2.7395421917503437,4.067859287124758,4.080168203597141,9.785780033563977,7.409793226062941,6.9710242633167745,9.77930834130069,9.943595896685856,7.362888476835394,6.888289443027551,6.026185115112015,3.733791630190477,2.046574168518498,8.319986722461651,0.42422630965839536,2.7635759555090322,3.8111275900605524,9.094843662626007,5.507924186452097,8.164577786438992,7.849090182941563,7.1844319464062,9.751911031150298,3.2422810707541005,7.6300570287660445,1.0687375251678977,8.145049612955004,3.9961288364253034,0.5937601971159734,8.549492703428026,3.84381009396934,8.442314106495655,1.3568823563975374,4.211358114968049,9.97517269530566,4.569403785748902,9.99837105546574,0.9663261895823982,4.573037654337979,4.871416575588561,7.614866701990756,8.531435077520486,5.642195352028249,4.274630995270547,6.4188659436504425,3.3214959526171883,6.170733576626888,0.22759719883866714,0.903693750139607,4.338955625882304,9.551910106299303,0.05207545311311401,1.4050759583117167,0.22674341641801377,5.661563566221252,5.153774105939386,4.240536691156822,3.547618136263959,1.8328051541017243,6.408982760927544,4.449989188429273,6.478782811261221,2.770346691172998,7.491733492208588,7.4738463521216385,3.6928909560663836,3.257783902896072,5.705274506272529,7.270054896056526,0.12830051613447857,4.1038545259343895,8.641915170662859,4.0972053539897075,3.607796882929488,1.6272370154405946,4.644886672050442,9.724665076357827,6.6027591712593425,5.42175764519202,9.563355054455776,6.081480470629241,7.40740722076721,7.122819593772642,2.740502105460665,1.921408866200971,3.0670436174074434,0.6243591303712326,4.961901604112596,1.6224012714563707,1.1153630911265378,1.0103882219968252,9.670969727164746,2.8834636237988276,7.191831081970257,4.467980488533501,6.249291427838701,4.226823896389417,6.0353403875691995,2.8407436311396084,5.179952344007686,4.062434813697616,1.6711331755797398,2.1799411637668964,7.889749833721098,1.6331933293788725,9.479899810955121,0.40835041960922025,2.072586442122417,5.231098417964308,6.147933177285266,5.4269464672527175,4.772765194014966,4.6428450871355516,5.328596113693498,6.850859583663329,1.4316518099904108,9.427758386972538,5.778074084025617,8.115302772758191,9.409171088985957,8.427873276092301,2.417023352991763,5.762743987227257,1.6678948877018485,3.261080473629392,9.864365360282239,0.4982513102665975,4.891068662217945,1.6053369234445136,0.18542529768881488,2.5278322767745443,1.1528120320238222,1.3373782513324772,9.130874302870373,6.632905191745772,4.228927261912134,6.969417266892641,5.172451436953926,0.5870430732921639,3.9521210157376574,2.8712388304790792,7.304391597856014,5.1691940503795,8.303280044049972,3.763518555915071,3.937168986858768,5.8334693668264865,2.8310631093336114,3.7644871448341455,1.018316867888025,3.9924312721514776,5.820779414093716,4.435895090006214,5.208992431791022,4.150106975300409,3.5249700618909396,3.721474741585875,5.9200238388221615,3.31720906486499,5.91120215756651,5.615250414251907,7.700925022348793,1.826950324879879,5.06152031712441,5.134717914714453,3.6671471874512185,1.891273792024506,1.375264647445622,9.124560916809498,7.238859246787463,6.651710072810861,8.918993346939306,5.6581077197549074,9.949901417156596,7.053110374501825,2.689957752084622,0.3440294081650208,0.14823419876200283,9.259825453177763,9.667873105354976,0.3768185360664744,1.1719488723992177,4.754900262826749,9.560068201383139,6.4524330829586285,9.017632855102118,6.362602305537317,3.973500599831692,3.052458842769128,5.291592050187191,9.471811510044883,4.835464590447993,1.065317443210958,3.3793602224734176,7.135424807158726,8.338263822821325,4.369921194725177,3.11631401341266,7.215579125247798,3.325146079259922,9.416635655137434,7.866038325970061,8.276695141265142,6.456390743681437,9.777761857952253,4.6425833516877235,8.744946020451971,1.5300057511387233,6.453367684120175,9.903412441629055,1.9574848466440264,4.921020282690193,9.729300280662898,3.1334876096215547,6.291659496877808,2.6688182358860835,3.9892291247053957,0.0026661868266786293,1.7435594958519784,2.9149868022113723,4.498084661710586,6.080270117277708,1.3816748951451485,1.4232647539890686,0.04458460124928232,3.393530092895054,2.6938801504957177,9.025173089851688,0.8968632115027231,6.220801311323301,3.9812920954847097,5.645196478542241,8.56472145361549,6.831764899415626,9.239142168659889,3.8275487839215128,4.533278968863432,4.352298129575384,5.982714011063512,9.621488572995343,9.48581675185942,0.8766439321323549,8.874004638392796,6.726335104696077,5.806896930691005,4.889972818886994,5.636062695501057,9.369075718160618,5.623077353170229,3.596103273534368,0.36300947474076084,9.157614930596488,6.514406179976097,8.749451649519028,4.700107685737855,3.2157191207565017,1.6924360926149062,3.258788078521604,0.3231538158851488,8.053391403814906,1.461781704635019,0.8991473311019971,3.1786827826815256,8.222447153843246,0.37614459288290103,8.910366965344332,7.333209653504815,5.972181224014204,8.925727103678815,9.382260391296008,0.5814066099848603,0.4412941716704233,5.100009714502836,3.189608098293284,1.5496934238981797,9.674205034506706,6.244908156063054,0.22406563551728098,7.22786315847533,6.774501207514918,2.1471839308104324,2.925600093590228,0.05925271119706643,5.3119421096584984,2.2196664069477734,1.5315068776560015,6.733472158413337,6.474233880116063,1.1340394330211279,1.6413445899484036,4.71762810943261,0.48549321057858696,3.5542545811935633,6.821983223516339,0.2575015118899793,8.035761639206918,2.738480837510784,1.4167801970154636,1.2529095806647628,7.290496569153094,5.95297609617528,2.533068296905423,8.313658933367696,4.7423268912796885,5.957909012284208,4.329472767359526,9.966745969675891,8.869525033228927,3.0134960289301116,8.245905939317222,9.779548963518218,3.261277148098094,6.68125948117078,9.66579586704871,6.476944596359773,2.4360894632299934,5.8281416878517645,1.9690726779187817,0.47925064616877844,4.904652078348515,0.07487310195334329,8.445207302739055,0.6181875222174393,1.7880179299956178,8.2965375779111,1.4073278760957164,4.340702547130613,3.3168322801590033,0.027571299852693354,8.370853218354666,2.700660411804192,2.456500093681664,4.567860940659168,3.7571956758379255,5.891475949234362,9.0100447506756,4.487555502802278,6.976408253239688,3.088883454094329,4.806821692747247,5.140121330161165,6.7404995165923225,0.42562694245868116,4.589195902430852,5.132286858911268,0.9908122334818392,6.557501821059031,1.9076887657973596,5.569748070744915,7.973386178020537,1.7533613194897546,6.771893479513076,7.7762760342101505,2.990253630625588,6.557392544352694,6.0511878824891685,5.907078717984451,9.799484466139887,1.2377893960831376,4.03968403819972,3.864203635094867,7.42720731143576,9.753483363306287,9.759380607494002,5.948477587502625,0.7128658176567293,8.014735059215674,7.8860783496573195,5.571174061878537,6.87162048244804,1.6455193891286801,1.4826797340829567,3.3756021017722837,3.672762619063772,1.6022999667281645,0.5324019717399731,7.029758407291404,3.0679263726326833,6.844175116828495,6.881881964940549,3.0683004084778265,5.778243762565463,9.894987380277732,7.280353682509193,9.832506379169248,9.149572052273252,0.7291811063949538,0.9646071069369921,8.93990114881033,7.358280834956474,0.8847722502297595,7.402340886409744,6.165955850519391,2.4510676498752137,9.328811640595687,8.16804054293614,0.44125989755652295,4.447766730031574,1.3121167318648408,5.822725937300197,4.389922967558267,5.008027651970619,0.3945803389468594,2.443829464970142,4.536818644209781,5.818053643752448,1.2892824828447447,6.543963122490206,8.80526799987829,2.2178142081842434,9.486159636609269,9.99949596733206,2.3571629375348957,8.482687802925517,8.265740115410939,0.2630238085215231,5.7439221735881585,3.1954786758345888,4.719095469392145,3.386817372276103,7.608337383109456,6.807654744821432,2.247921638165049,6.076302895631862,4.274987538798878,0.12950079528890823,7.597036759777338,7.620087332287381,6.735263367128869,2.9918833025883007,3.881009853457804,1.7027734618244028,8.410941652217732,3.3606913706340324,2.594605211581129,9.638453700113246,2.2133859243354226,2.7334398020010986,6.926891563750866,5.954605628162064,3.4071146059256696,0.5733469933216528,0.8494014503189362,2.6917574443192493,8.390689356890125,9.383013652233629,7.356039637379137,1.2544747974932169,1.931543909658271,5.746557930464375,7.022198900473389,0.4125796442308971,5.097863864917809,6.590123812140101,3.4506450026863944,5.696711071432883,2.0981912396382074,5.941045121471684,0.6386746577873037,9.334154606062405,6.930530554445539,3.891369795142421,4.6316661932950165,8.51336406960479,1.6542850345023363,7.493445053080028,5.56348094109818,0.5952635873255252,5.474908891283052,7.077509810893607,0.5191777436885103,3.258314444824677,5.262262904275881,7.39837331156993,2.6992569056949467,5.950152708474043,5.1884967472598404,3.6382556053173287,1.2062508919541015,7.380523763810663,7.873005523182841,0.3964382037439651,4.666737891217081,4.417053518738346,9.130114423369156,2.342023750682698,0.048891215408914945,1.2435214432635844,8.234595013867258,7.63079868775844,7.7795592502952005,4.2846685867827965,4.180920876163274,0.6988684859946015,3.9514454149953626,2.055874708421963,3.541484740701113,3.3356148503761274,1.9409897165219037,6.553091413443459,1.9109197650718768,6.5552602478420425,2.528827777067768,9.671623713827488,9.384140902327973,3.926835414375691,5.801052879414765,6.248543022187862,4.99831631970123,1.5937467554272877,3.1074615671486994,6.687602256836998,2.1223839698675517,5.34912169017379,7.414237882315719,9.327992688993271,6.377850986226803,5.342989803978497,3.153954830526162,1.5994801767866318,5.671146553035264,2.2568446178098456,6.038990399647894,0.4239588473642386,8.313908818040936,7.688602421560371,1.8765277341327358,2.552150848946819,6.233530244023369,7.217776940812685,2.134904399676234,3.559400648867732,4.1948975914777815,2.6240866709662036,7.388388512942532,2.158063394872345,7.047832593684453,4.026844336228017,7.545443047796905,8.044718757933087,4.428870848609286,6.494418930570205,1.9257916258503371,4.6235780005713885,4.267917763709679,5.8696795165538695,5.926979739297009,2.410131088489844,6.744371334599489,8.438242002761314,5.43265768139189,7.3795209775523425,8.160214922544636,5.277985284210183,6.025789758966389,8.004408357465637,8.510420724071155,5.482999512914509,4.052815908253226,2.612419317076995,5.7436721188673046,6.278526491049991,1.8454072077920558,7.675701002086979,7.591090561486267,2.5671786211862724,8.810687934971495,4.851360894537981,3.5332461062691767,4.733857317128054,3.2238716606279527,1.9082238429163212,0.2268853738172516,9.300707482640401,4.682853914796727,8.50034604086982,5.253753689557829,4.676598687475513,2.223662528322503,0.625114243319278,3.1628304500903903,7.519774740087481,8.23549979574356,7.400522197994464,1.999333963034624,9.741277441660458,4.317709420406941,2.4483434723846154,7.367728635139665,4.988877860716068,0.9743753457108095,3.0335455804235356,5.488846212452893,1.32799714868858,6.007380343562363,7.980092599634228,9.332980900718418,8.880518465099387,4.667691460181896,0.9478944193740513,6.835853129238878,5.675894311049728,4.337729171581348,9.937839343983011,6.085282849184265,1.0406924035653353,6.886635162676324,8.830233925542828,7.944187085781302,9.858150749806661,3.5581492906969903,7.580769178533764,7.67011202249255,2.7745643738165726,8.703932999794837,0.7998063108250375,0.6043393216689985,5.5413580471333646,9.900173692070641,9.56747742190336,6.221067050281917,0.011335517473454182,0.5051649376597833,7.463145057951273,0.00996507512488698,3.5865391788534517,1.1573468533460929,5.3634133648047015,3.3125951705263668,0.5612217365203098,3.960046476861525,7.79085007350951,2.7000899892217833,5.084075489824449,8.053681289364603,5.378705528150983,8.000381227290056,3.6224440232288546,2.554700977466995,5.324548250425966,1.5583043064497604,4.098024386556971,5.919698528092312,9.178159941544841,6.136606191298446,0.05499286860855879,4.909549159294421,1.876408919034993,6.905651768360695,9.977703666821444,4.623038489433593,4.1418161856124165,0.6789945554220789,1.3898892410460162,6.35899944637063,0.2912181022872673,3.310644901815991,1.9189274817027568,4.2764305319512825,4.421212433607968,4.0459923369056945,1.8438429844348314,0.036618214830079765,3.954298721990963,0.2874860731526896,6.729739276594639,4.193752759014455,1.8361282947576862,6.521491297056192,0.1747662456453969,5.699470759197903,4.381449331777317,0.40858299030323453,1.7398154432217838,5.691113384426158,5.1662228368063845,9.152705929232521,4.1670520289804225,2.135656060507738,8.370030371743326,2.256564516216981,1.6471855378896127,6.9429776119159925,1.5225830899298587,9.088315782362006,6.274454811629349,3.7539576933958507,0.21060444799351208,4.820998050714982,1.6221972184306255,9.366715751342863,4.088773734120414,3.393650170149971,7.544924879964194,8.290285244986162,9.329524991160227,0.15262263338469362,1.322369883658494,4.836780356656066,6.933636824193037]}
},{}],54:[function(require,module,exports){
module.exports={"expected":[-0.006105914976861763,-0.35027580639256517,-0.1099641840047813,-1.1718644322603033,-0.2882400789349893,-0.17563592647838622,-0.23171551280748487,-0.01980012139418637,-0.03576753983851878,-0.004597574158765867,-0.37203679295908776,-1.8085801184789994,-3.768145959032231e-5,-0.009407040209210299,-0.9884001811650974,-0.004280401979124777,-0.0012120164182784557,-0.023178345023506304,-0.294251578227701,-8.375347531594064e-5,-1.6913116509614075,-0.39146857502488025,-0.8803176134710262,-0.15108090680386171,-0.0038319386618395454,-0.30593970319077674,-0.001537809068229626,-0.057705168966977485,-0.0020880534653528737,-0.07412837005019164,-0.03298167232637589,-0.007235748833937655,-0.7692634522841131,-1.2927758963580245,-2.078822863242001,-0.06607405207753471,-0.04722608984270911,-0.0019426561933222127,-0.0006610903581677277,-1.4196244558527593,-0.11070892741519561,-0.004777172770543588,-0.44066134914529576,-0.10349939337716259,-0.0010804008617553474,-0.018102045516928338,-1.910200717019304,-2.4100197530708405,-0.06419238338496473,-0.15172239182657582,-0.6947523246011781,-0.0017868228283570145,-0.8471050718163872,-1.7351877915642182,-0.25182137570715746,-0.4801072841759414,-0.06266422051637117,-0.0033515017528462764,-0.10563792820293375,-1.0147353650137867,-0.009327552061975585,-0.00016796315480135487,-0.04638263649712282,-0.01716002766761176,-0.019373039219242147,-0.19046162539040085,-0.004845792670084701,-0.24138964290185785,-0.028355368050405446,-0.005857469951631327,-1.8045446650947132,-0.008939298751911528,-3.5924132867464245,-0.06312357203433057,-0.0031228336670251293,-0.16262555122285974,-1.4303823741541366,-0.7189710136530801,-0.04768232855974377,-0.2014746861337492,-0.2874279553028109,-0.0880417589974165,-2.980679500971005,-0.13985851950706563,-0.6459250499074219,-0.9499857550897624,-0.0005380559069251359,-0.009970774836055107,-0.026711347835617606,-0.4701944198961185,-0.9062597956543862,-0.8824857549753072,-0.01974388920863486,-0.8154745008044356,-0.024479058811453135,-0.06429733198225136,-0.014657275136870701,-0.1923799694225085,-0.6010214998021983,-0.08290385428661506,-0.2954275246363017,-0.015249123432925218,-1.6200243526328824,-0.030988767276207946,-0.1672369618805895,-0.01382138197431788,-0.2549847114809049,-0.02557960594398638,-0.11483669519076681,-0.3980549458092102,-0.04402592427547436,-0.01589469282428198,-0.004698180928994101,-0.0007179815948619036,-0.7911563824393272,-3.397723252208841,-0.012342558916011511,-0.018338074526680088,-0.31802602571707655,-0.036315079653105445,-0.05366458922066341,-0.00464283702566043,-0.11492813314261732,-0.002213845205085992,-1.5513110333411941,-0.1665123299694382,-0.27574720582199824,-0.14795897393885707,-0.40132002976674674,-1.3157665397434097,-0.10505432288652866,-0.0004739090392314841,-1.496589114280162,-0.9337301898168708,-2.866314143486462,-0.2757253113029203,-0.12212565727225186,-0.6893121837245627,-0.009013984875358505,-0.20298208758137415,-0.07700517216855098,-1.1240282262786119,-0.013391773300918033,-0.044202713920037315,-2.8976881288459397,-0.348722102856061,-0.21900105830271657,-0.00188064882890273,-0.01407614315850774,-0.0052564312165808225,-0.01881022754331218,-0.7828116886628825,-0.03322617447022379,-0.31042749861364477,-0.2855476591711521,-0.06703491300903447,-0.3019215653992385,-0.3152997965317267,-0.011442591625343676,-2.1875826160554768,-0.7274229344562831,-0.15037804073724767,-1.6482692793114582,-0.030962715656986523,-0.0006418732094503752,-0.40290939505004936,-0.015776770915362937,-0.07673354660691808,-0.6963521559698496,-0.0054180436770779675,-2.201764474461846,-1.8593166388298403,-0.8845953491619145,-0.05082526883517543,-0.16797311870694553,-0.0003695015369930937,-0.004310408667268966,-0.10858872431518975,-0.013200160717651224,-3.7961585047674156,-0.012964255863582486,-0.9802261874855704,-0.20859459856974694,-0.0180969119640745,-1.3714598626374592,-0.002800965065465067,-0.5990645295144591,-1.2760600937372946,-0.0010944602832862148,-0.5397823077268802,-0.0005000282001721689,-0.6244084473929655,-0.442482083211962,-0.09183026544763558,-0.8303369733540545,-0.03445335221533161,-1.2697807979909996,-0.18307249065074907,-1.9628202783231818,-3.1920125026289456,-0.17834712062787053,-0.00030939846316988467,-1.1741466498869222,-1.582870940729422,-0.0060264125156196365,-0.07088803503273591,-0.009548927805839642,-0.5764578282565818,-1.4407614608149335,-0.04766480206879344,-0.6181298599882332,-0.001380435505042811,-0.35476749984900785,-0.1577638203729326,-0.9367842344743014,-1.3441094262084148,-0.0020761603596422063,-2.2740623033921388,-1.6784786714803315,-0.28909141887957657,-0.14878301041309278,-0.06489425324741398,-0.0021054591626223835,-2.7092874368697757,-0.25607655066891133,-1.3195203842129477,-0.00657466229954799,-2.5165495690838116,-0.2442460874925143,-0.11312235961694307,-0.39175202959939265,-0.2905941798000999,-0.08760585393054945,-0.09067499520579952,-1.906359764772076,-0.004812414385079212,-0.001961700683129257,-0.0012382564729162217,-1.304020356773242,-1.9985264467216466,-0.00022791747324489152,-0.01869867607869836,-1.6645104641233996,-2.286852798951049,-0.2962533554008129,-1.9154849812632504,-0.15974592160133064,-0.010955803933314629,-0.4774586056962043,-0.20394641037704844,-0.01809400398972476,-0.33041425234099125,-0.0017106595349964619,-0.4640700265086017,-0.016252539811932795,-0.017897984010693615,-0.009650923854882937,-1.3552635573163052,-0.009661079970165569,-0.29725063437911803,-0.2634230650631649,-0.5044305368077232,-0.45276034279311533,-0.7739415072381479,-0.018524465229999534,-0.28100209427615913,-2.8590383350129622,-0.4235554153157155,-0.12859026151980457,-0.19271863120454563,-0.004420492807098779,-0.25006612480220075,-0.00043039651798357096,-0.5468552995467819,-1.3412688040834153,-0.002392139410109562,-0.776621774400311,-0.22744019513614203,-0.4300631509219276,-0.025415778418056974,-0.007873038209819817,-1.5729621763548938,-0.3827515517062736,-0.3642716809581912,-0.007340377861895451,-0.2084865550636249,-0.0003348540373806027,-0.4856033688547567,-0.5038482744974954,-0.1742025453305714,-0.984505362049392,-0.3266886913191761,-0.0034470016755646154,-2.7538195293127776,-0.4211933987924864,-0.6102925482869571,-0.18364842787075356,-0.658663492110526,-0.0025958009146011068,-0.043308555382556777,-0.12488617074848118,-0.01827228854527623,-0.216371406251135,-0.03373253811340263,-0.11120547410553043,-0.03446510625519967,-2.0896415060889684,-0.7730682280865592,-0.13592350739154646,-0.22490369568083998,-0.16123526986554693,-0.3848950863181845,-1.9206245891267142,-0.01529256358727833,-0.009568047017243897,-0.1591944463021765,-0.6609008757120526,-0.019120618041073265,-0.021357855984051276,-0.8006047877117399,-0.16164545933402535,-3.7617650861923364,-0.00461854558852837,-0.7825809116780695,-0.18299010206126112,-0.13018362911424547,-1.458675595922959,-0.7743602080942635,-0.0005887960353881925,-0.11885921647110712,-0.0004031785567076368,-0.01783182498697636,-0.06698671280835293,-0.006088571446871828,-0.3832800750035599,-0.04076991987138798,-1.2424442876873973,-1.630312570685243,-0.01889151754845118,-0.014117014135923303,-0.3486044454233322,-0.05478744562681516,-0.03041943246632253,-0.010334312502875602,-0.28126946059505775,-0.7126347700560317,-0.3388271667795867,-0.1251595036647819,-0.006970555990969043,-0.42634101403123653,-0.03698882832051455,-0.011678287536472244,-0.03649224305591671,-0.02495586401193741,-0.039002026660929036,-0.6143403831939227,-0.8133739710543185,-0.350091090274273,-1.6151718851048078,-0.007679674061592419,-0.5588340212953117,-1.5005349002617454,-0.0011699254540929835,-0.027833481183128464,-0.34309868954070527,-0.05673118038000376,-0.009236505511210904,-1.6335605656853516,-0.004816174648087275,-0.0064379316199777185,-0.19457191140904395,-0.016923379457325093,-0.06366515143671873,-1.3818087383376925,-0.6423615964624213,-0.16262211041317154,-0.17166910575966807,-0.19170943544963753,-0.5616113185974212,-0.8812737257726581,-1.5164781726527559,-0.10738520861891843,-2.4652312176946887,-0.015662720182316996,-0.03240993844092023,-0.09219920582747186,-0.6529524411433452,-0.05012860160719148,-0.02340622556904696,-0.0015194155239372142,-0.06401148809968482,-0.6937114195433468,-0.0006565674129213824,-2.4011422490151513,-0.6699094389900057,-0.5872370680184422,-0.5306424085117256,-0.2057295320768331,-0.24797577132005758,-1.369284022338581,-0.9019282884629518,-0.000942450127928365,-0.20624249329165018,-0.023823146313370517,-0.041063594128859245,-0.1555575930390581,-0.6984839436939314,-1.1571100538600931,-0.3430082155452271,-1.2562593672110756,-1.7504967217626142,-0.010971604771576217,-1.043231635227826,-0.13080274043429407,-2.489226226609917,-0.0002284906387833438,-0.010751281047994124,-0.004780199772676366,-0.21238649494712855,-0.16509183978152336,-1.527669955006525,-0.06546929439286038,-0.06923119661548639,-0.0022315543350838406,-2.419218183803287,-0.030317891908847823,-0.009824424122995034,-0.0648815098581831,-0.12816306757842383,-0.06655985152888311,-0.0011502884342097116,-0.33737244379648845,-0.05593829003632039,-2.01715786248282,-0.17443728218444862,-0.11618716301106508,-0.056797010677707725,-0.004797593859095366,-0.8533437714542265,-1.5205450156452724,-3.4461118909000126,-4.148982308628837,-0.09074711794635307,-1.0470235997967996,-0.0035783100971998614,-0.029861666822858395,-1.5568394520267252,-1.2228872547419523,-4.675723987494182,-0.18380283409317477,-1.0528850726642003,-0.5006132989358693,-0.4428667330973203,-0.4621755193898032,-0.6930240868316688,-0.6083079816215188,-0.030025439428907445,-0.044996078782492385,-3.746053681232528,-0.14371869770321677,-4.654596492514557,-0.048577703431861845,-1.4807445689149388,-0.9739275115543535,-0.023227773336998138,-0.0020197037292993226,-1.6502719874888498,-0.8230339272488045,-0.015626101633998205,-0.08861439049913464,-0.026010766390809775,-0.577382871621598,-0.03863878701424066,-0.007033065041256103,-0.012351174635257724,-0.09641300495998739,-0.06995050532082486,-0.006525062477009402,-1.078644281325855,-1.3573073689331079,-0.00159006478311507,-3.0683957823150125,-0.024315327544566,-0.9094480213279249,-0.021971669349129048,-0.01949912532272921,-0.3722877207086246,-0.2370090633770659,-3.282777631603229,-2.114241346903221,-0.21848489067462656,-0.11404845635242948,-1.3788085070222291,-4.930275066572687,-0.08221971266112471,-1.319520778662398,-0.34257388829865587,-2.4398872216934038,-0.12364210919305645,-0.9260195886316507,-0.007931796677510147,-0.2057492896629709,-0.008166812914966045,-0.8010268727550771,-1.572852106036856,-1.167084761435047,-0.0051585901702861,-0.00882861135605534,-0.04519173338644896,-2.019229653287861,-1.1562920340685146,-0.0029918895694120515,-0.08355226917033502,-0.08728094286649671,-0.0027880088530603093,-0.00920553813056323,-5.01602163661637e-5,-0.03716855346385695,-0.016133258770810507,-0.02539938222927541,-0.030599344896335586,-0.44796916458139857,-1.6175541672400557,-0.00857444649045479,-1.2945592427019097,-0.07621461784590162,-0.0329546613133178,-0.5274849394536968,-2.47686560730296,-0.0005841383126173307,-0.038454619348068375,-0.012674312472408772,-0.004629116108451109,-0.0007400074856586156,-0.1276636500723617,-0.03576933205024111,-0.5430991677799658,-1.301160561384072,-2.3603664910387687,-1.777615921176002,-0.5099715652583572,-0.04743538249003716,-0.012180595081400793,-0.19532786205135533,-0.040879473396693955,-0.01145608608906284,-0.055617562896201664,-0.09466104870540147,-1.2771375454298448,-0.24115592256657997,-0.6203871619604572,-0.11213449229986001,-0.1329088958401944,-1.8738219281275208,-3.205660358183731,-0.03263560625322814,-0.9192711416558813,-0.04528831190812943,-1.469831054205051,-0.0392255383205334,-0.573983280644971,-0.23504116635575034,-0.011118776361268857,-0.08404602136307988,-0.26024536366639217,-1.1719645290800866,-0.05155264270542188,-0.4602565195557695,-0.6390287075634035,-0.37014028388913817,-0.0005744189368194375,-0.15331445613413244,-0.12158673394407787,-1.2152576546766973,-0.02165790879772805,-0.7254132340605927,-0.18558993445664307,-0.5099767223242817,-0.011917120587841083,-0.5241082110360795,-0.2938091013375147,-0.000501855751637729,-0.05660987461646088,-0.2623034025630535,-0.7325195096478534,-0.01040284051967,-0.29287235598975453,-0.15690640933541206,-0.5008571355573215,-1.6525854344304811,-1.9487539426625502,-0.009853444327260805,-0.5940589159957316,-0.8510981545972671,-0.0013268090712482315,-1.3385745597594025,-0.38565593845428875,-0.06411658197231807,-0.005062782110134847,-1.1347198656185093,-0.11676643222508426,-2.421848705252379,-1.0789972215170254,-0.020357257031208335,-1.2450042258163232,-1.7421614531033485,-2.522226504807712,-0.0007570450992037822,-0.25762961514024096,-1.460704797048971,-0.5631653815984317,-0.2775252192077004,-0.3839413061475599,-0.0002877061442390134,-2.0997095926798344,-0.005839935135649006,-0.26899267188798914,-0.30458887841140286,-0.005822375076239697,-0.018317262529339302,-0.005188121065612669,-0.0772741510660961,-0.0833928953947186,-0.3321791645497588,-0.8640776880036376,-0.0796738880931026,-0.8895102235401438,-0.607026604814571,-0.0013983941262365087,-0.11232400616870018,-1.139259171967525,-0.03523567095766193,-0.021742019413469423,-0.32481591145450717,-0.003216403134913099,-0.01230563847449746,-0.19185721225492855,-0.47705688632637233,-0.03732717153522837,-0.0007307764572893388,-0.25450750771621844,-0.03945524945377222,-0.5991517841101686,-0.10245024707860179,-0.019949530251463912,-0.004369145648340138,-0.0007053508975098648,-0.016075207365595867,-0.265307881053466,-2.7636858307582033,-0.06211737433197348,-0.005819750174315484,-2.073487211227787,-0.03147187853772824,-2.060862533420353,-0.000449550931696638,-0.17204893249054573,-1.2174702511379543,-0.43363412346176067,-0.012071696238952592,-0.009091014615847168,-0.3523873679304473,-0.02458899027238676,-0.004575472992608572,-0.12828020694912654,-0.26385220553585664,-1.2381839636022476,-0.02679846422957352,-0.013723506386166501,-0.0023655970556175797,-0.5063999502047081,-0.9602001192225841,-0.014495305886400408,-0.05013340656680317,-0.0009648820604750783,-0.11678229125068718,-1.0876490635375669,-0.6680410122498388,-0.2182843699521662,-0.33080356003372907,-3.0452286540074454,-0.03657506814194532,-0.05967514716798182,-0.03230326842516464,-0.26496933576787046,-3.7117495534630107,-0.21677958664688202,-0.8559523945829456,-0.3149862069518291,-0.07491910025964728,-0.0036922106115731264,-0.006603739816230075,-0.10085774359958766,-0.7636254496436865,-0.0013733773426535024,-1.258489002778436,-0.05238398836731692,-0.14577332005454544,-0.8068634362381499,-0.09555946921226523,-0.21643086568658942,-0.07106778686046607,-0.010545554200850687,-0.23097556495040236,-0.06694832606237676,-0.15930651655099606,-0.01417585236164118,-0.007118085665637677,-0.0019605924676716854,-0.014610167208066833,-0.3812628347985413,-0.8534567085821888,-0.10659838885377323,-0.38140452097092903,-0.12098163940179314,-0.35451671207122204,-0.28137666671537936,-0.18334432154955835,-1.3308870892702023,-1.9305029415679864,-4.1121895672185955,-0.21051819849018247,-0.06142854738391196,-0.001449216477757178,-0.02522139393015238,-2.482712337925607,-0.027733135887215706,-2.909739527943739,-0.28006513538950295,-1.808305150659498,-4.5356229988931815,-0.01389808412617118,-1.958427902269737,-2.02427133478463,-0.00030768650712974564,-0.07218940263221889,-0.1106642875030334,-0.0485338662624059,-0.9468518570505033,-1.266170243361905,-0.12605698153629877,-0.1137942396697868,-0.02443873991781493,-0.24552481206731464,-2.076198850774732,-0.0033132030610341606,-1.7306812402037703,-0.43371229209472295,-0.17541573060109822,-3.663561285382084,-0.000912729098512355,-0.07551953451590268,-0.03189493671152857,-2.913033692359443,-0.04833019461207488,-1.82714652947878,-0.09221991534314705,-0.05846781322545581,-0.0038823074971887322,-0.027245761125595257,-0.0008898886915249143,-0.001225295639352806,-0.22363057971152697,-3.6640622625861403,-0.1153690825316043,-0.011372667000790726,-0.7981230819838,-0.43901991368559234,-0.14178805301347602,-0.02048609861802752,-0.559906217942686,-0.005387297414265014,-0.00482712789831936,-0.6827788982553649,-0.016320944469341545,-1.3751928774955562,-1.454502780520771,-0.37768379831056903,-0.1437452244340498,-0.6785362224795854,-0.47959667753417756,-0.13343791630654536,-0.6464702144452834,-0.2891832621632863,-0.1515963404185368,-0.03592704199009409,-0.30345958342093604,-0.08178169271209337,-0.007554430278211303,-0.1447270956532942,-0.02882005732643005,-1.7113918646356763,-0.48065874242642814,-0.17249624770158456,-0.0003356620100380263,-0.19350431875327215,-0.013485204150120339,-0.028229028386402136,-3.041475478010078,-0.022961619463748126,-0.12670503820956963,-1.5337582090499118,-0.5437460412240703,-0.1334410454368209,-0.12201117694148995,-0.2136827251591289,-0.05319960077020993,-0.047065122236315635,-0.304797849572088,-3.1115832317476153,-0.3180847582613145,-0.014898340527859986,-0.3614108590167775,-0.094660755329466,-0.1431098910749859,-0.010427185145303056,-2.177060866789611,-1.509456897150039,-0.8466033102431288,-0.0008564394519818273,-0.005843401427646121,-0.0867964594949288,-0.012703419432047355,-0.3374332550726834,-1.2699152843312986,-0.22939952488592238,-0.001581435511945923,-0.8131311627830439,-1.3800952002195042,-0.14234488403294787,-1.47900178494132,-0.00406866721973944,-0.03352653147659088,-0.6674994767895713,-0.059045901796638794,-0.1158188302771095,-0.010634188376695742,-0.6619527771152777,-0.008072469634215646,-0.0022806236525471477,-0.1362866692787319,-0.003258656455416884,-0.19006888385442375,-1.4042116416496686,-0.002118251058047967,-0.7406454187601053,-0.006964518895618648,-0.008119561159878589,-0.00451580519241352,-0.001556654389986253,-0.00742038226642617,-0.16925161434219982,-0.0048139128731446235,-0.22959213619186644,-2.932757219729106,-2.5367960777867773,-1.0122163489170306,-0.047916905423684736,-0.05583065260426938,-0.47016291025649326,-0.0007130980623802095,-0.044661885240481265,-0.005332837862397075,-0.8647814116289986,-0.0571403757222009,-0.035102191013285454,-0.025882486091946957,-0.9698046637976103,-0.802341904633345,-0.004131850836957543,-0.08948914444638191,-0.13431525340680667,-0.7371613065556717,-0.015013302162980285,-0.1456425265069884,-3.664260021724571,-0.03623829444532352,-0.4419363360237026,-3.2151978426936028,-0.05614013371946127,-0.4264111787710666,-0.475212702096914,-0.005327746171307045,-1.282456296609931,-0.007777222355649517,-0.0009624781230601882,-0.0014535896415489196,-3.154465447618927,-0.018335297654212226,-0.048195376664977654,-0.00021673144536289406,-2.4846555945627546,-0.10546164532100949,-0.05870111122483421,-0.34363289223077886,-0.10659337803961638,-0.14332798463902088,-0.18536718527527704,-0.04922212068456511,-0.025993332688051974,-0.035830572839857855,-0.6971647385909221,-0.0332161752692119,-0.40447245080987215,-0.0029516036431892355,-0.04330668543955086,-1.4072382215499464,-0.03151898065676004,-0.20459195006657035,-0.09167003130267373,-0.010599566097601622,-0.0014592110369911172,-0.5487703478650535,-0.017106333480682263,-0.0038240245999461887,-0.003072909520874586,-0.6632615379722413,-2.0089519924401147,-0.02807685191231248,-0.00019240176703979087,-6.582312906835539e-5,-0.002581767888109961,-0.044997308801438055,-0.0018402728275849854,-0.08453511318241519,-0.025527908854486556,-0.19479832355803298,-0.0007017000861186044,-1.5352203676754357,-0.03131152800766431,-0.05413677352900111,-0.21968160715653381,-1.8204855549822265,-1.230050827723533,-0.08645094373765491,-0.11019330888610228,-0.009163347018252083,-1.3667869612798684,-0.08493886314167039,-1.9613928236659453,-0.008988836899510605,-0.43681655679126996,-0.0033003347876008836,-0.24432336332813825,-0.07017023956577015,-0.003964629985397579,-0.016820057613536218,-0.019769905611896853,-0.0031638109026911154,-2.441199051923348,-0.01906094194249682,-1.8342061352787393,-0.053219558054517196,-0.347790573474076,-0.49223673154306385,-0.341179562228045,-0.0016688614079998008,-0.001159828764630102,-0.0007006191598348114,-2.3895834614435265,-2.35805738535879,-0.21999114903523853,-1.3380393467153346,-0.004609309112153565,-0.09398791770081111,-0.4867652922864196,-0.30129712436792105,-0.21506110773707965,-0.22748915296471123,-1.4399843539077752,-0.11846934438379386,-0.08238335865792984,-0.6998884679969379,-0.004341679380406434,-1.7639921385577213,-1.8555575532915867,-0.0042677417459611325,-10.385388142720446,-0.5327381403787547,-0.7384050945019077,-0.16704063853879844,-1.313981846036633,-0.06467158987890255,-1.5998014311577133,-2.225306031337504,-0.021434844454792337,-0.11080658617963837,-3.6178003985074496,-0.06591196758018433,-1.0619245312077321,-0.02672897775936703,-0.1442705966786058,-0.12378040328190129,-0.0038978393937064084,-0.19086873905928214,-0.054784763736880675,-0.07678454431448757,-0.5741404226151121,-0.019679877826100665,-0.2508579929406336],"alpha":[9.074582723754801,2.4323032745655193,5.1129928183201345,1.4815628193674635,2.368911081207874,9.055619288160113,5.747582299642405,6.378991413027255,9.51764672594075,5.578171908509542,3.9979368988950093,0.3981657721993104,9.777794727895214,6.239538179478479,0.8390337184589103,5.2901187331826165,8.008755468535266,7.667292022392857,1.5258034010801058,9.944954592577657,0.46949063010077285,8.439593017068258,3.5263646044143204,2.238521839020291,9.667017585998906,5.887271672347898,7.276248461431982,4.6112708009534575,5.9835093164570115,6.979481488784744,5.736807913375957,6.533630818468712,1.677020807242291,2.946851853198218,0.5737795843333382,5.173846905860704,5.324581824112215,9.595214371818294,8.625738969854035,1.507582141537438,5.448836623983411,8.60392236349449,1.4868953126896267,3.530473940207721,9.977711778273594,9.66223298548822,2.546829427595667,0.12250771635355262,3.7168738235931054,5.453887722923662,2.351600417143618,6.998690838633865,7.001210936046524,1.0014806224732675,2.789849464247547,7.377659833238508,3.2423017702248824,6.694722368577075,4.078534854358562,5.389297426849032,9.057275855883084,9.93599299947231,8.479139854499794,8.64663347673271,6.811052665911445,3.160478940141287,9.928455216783469,2.4724077027497993,4.545031415570651,8.078568397731862,9.15672870395982,6.792468483998659,0.4534943396840063,6.007704454479114,8.897373737761484,4.234932824368958,3.806610332629672,2.508400089582832,9.432296880005193,9.544745561007666,3.48821256204374,9.694324876303016,8.187897629657435,3.2496803944931285,1.0256092831506414,1.5372530780319016,9.04567575150923,8.808073211951399,5.334427472153813,8.17437618333696,6.88524629031966,2.1271660749698573,5.192946194874571,3.7406380426169394,7.382939536538283,3.9981331592502434,6.805771652957045,2.7637514184912715,2.3642515621246107,3.7660932064774943,8.278110640132997,6.862862344260369,0.7119134511611902,6.849953824800796,3.69305947514988,7.57952467825822,2.6198138539679228,6.25005381697088,3.2307689440681875,2.0827971246299515,4.942791607553881,9.991266208317937,7.029090112161976,9.436544323961286,2.020534658179909,0.04444369641098511,4.972553450980024,7.928618110327246,3.3546098022750193,5.44394249518839,3.0444567360459995,6.527877568421561,6.1594596560753985,9.894813321578074,0.8708158751048112,8.641725837412746,7.98814247413172,8.365649152646528,1.9487003096117084,0.4899409233776497,3.7481972763586535,9.874535414755595,6.426505161821994,2.846051747260583,0.5730279430472618,1.8419287936516593,4.230346603411636,1.0827555069479633,7.108246319419765,5.258614122992904,3.260810638548899,4.079408214641019,7.711965868197536,6.135722873442813,0.7061712972315859,2.408612237348391,4.586630464233066,8.993208062551805,6.8552852856540225,9.82504287281574,5.725971542010568,1.0632082114081332,3.9715224848357367,3.4732803977036064,1.4854626798699044,4.108961896195515,1.4848711828279337,1.8660192925713948,8.240251663833387,0.14320817996471558,7.502152440375552,7.943643534819673,0.4807290187907953,4.552023917576542,9.948358265567585,3.8475390845476576,9.03346738147438,7.738576158684376,0.7651640319404129,7.100475183481749,0.27510217376736534,0.779923309799373,1.6879500619121957,3.8586765248902144,3.6517448638066496,8.544573473226482,7.020542679360259,3.2180935295073954,6.602591320670141,0.6235727855198858,9.435638674031313,2.504906921753498,7.128024748720478,4.8951761208936,6.361636596075688,6.654846235433385,5.3617384209133245,0.43938953900366506,7.621251336087161,2.3259421169347316,8.094583532779964,1.1087668932702854,1.4476331394354225,3.6735523403121007,6.961086220431197,8.58202769847842,0.5158371212508217,3.1161547971219816,0.5116689505425343,0.1547470165747722,4.127367963985995,9.7468987934963,5.981849609293173,0.7335388617533756,8.402771118146381,6.756284195666784,5.365187287978392,6.608703336447648,0.40696631880305256,7.650036689988832,2.189502425338028,7.603436982393386,1.9859849177566047,8.680639103131455,0.9186526243589044,7.836032898288652,7.683497267374237,0.15909436913225772,0.3569527107136983,5.988168083557999,7.400906226081501,4.844709486957893,6.881952633325465,1.382227971133294,8.391855148313665,3.5793450955483985,8.002177777119295,0.5392816250685262,4.64014013782164,7.233346985029476,1.9552100097479364,3.709434286054636,4.721720896594965,3.3139828049321696,3.3422216442006514,9.042029091863778,7.725552726258305,7.606397855004254,8.060587036328357,2.094715930831297,8.707149603508082,4.624513923099678,0.9781072613080788,0.5593000859844288,2.624551451198396,2.1467678055830253,7.814889257430552,8.257073327818933,4.717894923421111,8.288323482317042,4.563013392610866,4.832444907846205,6.502390394551501,2.047006526886066,6.441778416536874,7.762360240992123,6.230819476839868,6.115880237790819,5.970595506776279,1.619820423523075,9.624147889596513,2.6199236529139824,1.5414928473827172,1.3003370958659177,4.441916479990898,3.9931028490388187,9.03846834834316,2.077829910276643,3.6137668545298274,4.984836484587287,5.411564068039865,4.765578397470436,8.611468101773767,9.640985236347424,1.8251916032277715,8.308984737039737,1.5548435183906695,6.224031949283901,5.87744855888271,5.607005065587069,6.837230621413848,2.2102907239835012,4.905077900897126,4.1820226695983305,9.657145927295401,2.1465668544730643,9.365744649528116,6.783848089589313,2.4481351642077986,5.143895701871724,1.7261387935972494,8.100742383344787,6.882916886414991,0.09419368351755164,1.6987360289796838,1.3543104691852803,5.091576506245992,1.1303334204554805,8.9343813817732,7.275176824553196,6.622013361962676,4.993919161677534,2.823006085703317,5.814222749732938,2.7169411269872,4.704420094369732,3.1339016624409033,4.848248813333713,3.7921345046464427,8.17934070921051,2.246666652136464,2.108071983281854,0.25247242817484805,6.549129003522777,5.128056637015302,3.6921796061366297,2.420445327931411,4.974460343235072,7.099358111831808,1.0048298090959817,7.80216560237128,0.07954179509423343,7.64298483772304,3.98880224240014,3.7467400310755172,5.8054567260083445,1.6654717974975752,1.010926770910816,8.441575300129164,2.9549475319566887,8.845531062396239,8.47187845707152,9.962098078094051,6.3254133383329325,1.7435159175675286,8.397947805682406,0.854460743494565,0.5130880740278876,4.292782993668931,5.121949387468718,6.8421831125588595,5.778249559415592,8.872980120880126,8.34961515684768,8.178007665039562,1.692080525094306,2.033675182470902,3.365008361470725,8.194845097176046,4.137565466061812,7.547182649831448,8.288965011101473,3.3127373038790275,3.82148417488295,5.23242631415028,6.4282433386582465,1.249155156845081,1.7621878297429605,3.1047884485525956,6.3719211307551245,9.763466886675623,8.38533399510278,9.55812111403754,3.9171328108994707,6.28571766348645,8.437873605450939,8.890712780432777,1.5286090578375355,8.541945269654887,7.790843149578444,3.1537237902145376,7.013436740954814,6.646487139193824,8.405313311713904,1.4740179272488607,1.8341243407144625,7.63017155679607,8.83394924422741,1.573724474077387,4.808192638410782,0.5782374207036933,9.624573600940556,0.943887802660397,6.928734373142939,4.511671222620031,6.783185156685478,3.511308711789589,5.580805572745893,6.532590838350414,8.228981347799282,4.007768072040716,1.7769412290440711,9.039348820733977,9.107375445053243,1.7585634827033458,8.197625427324597,1.3132479969394084,5.0047108130826246,4.288217314840126,5.125209907012094,1.9151296697005038,8.460143638965874,2.1951491680528257,7.499274315867222,4.848604611613709,6.393019267180009,0.7916351943432987,4.823651963863689,1.5516441367923561,2.6733996969716856,0.528143205132714,6.126988144615297,1.3721874397666878,6.168198718078144,5.351070254071708,9.595077720991867,7.907773232145596,7.402100468653088,7.675408718989174,5.843598381367516,0.8714370159794327,7.991986636740595,2.960510997998389,7.532194109932702,0.1037270818609004,9.871598466324267,5.663948205051243,8.013349493834196,5.229066537974427,3.8429371746522123,8.196475390096108,1.9639773603050892,6.252073807333436,0.14028362838184538,2.4904864723909714,2.406581174500322,6.115913829629472,9.426676124482842,4.44241389307593,0.2792772203035754,0.19169240493910555,0.05766642461703109,4.881168027153391,4.9589714780626775,9.672146057201427,6.592280759407261,3.1651955617843663,1.3808759794101766,0.10930197089500604,9.548746959159063,2.2160490594739612,2.217424517459279,2.123532948452622,6.436640767288209,1.3768992035419192,1.3275802437195416,5.662093190044917,8.917305339167141,1.7825092441387325,5.5025792177226585,2.654249350929929,6.294583006708676,1.1498105530672742,0.5766525034784342,8.49483567228244,8.8840155024978,5.077193728323426,4.728913877026175,4.400694927968969,9.9351880454999,9.935029240176705,3.6940360537359096,4.820369606453642,8.214871767845437,9.177318841864967,9.395622061850869,4.651984144336414,8.186241255313021,2.754763118310799,0.37132277061437735,6.945543423753911,0.6098665953373161,6.9135203939401535,0.7809636401898534,6.718333379751076,9.054039202501208,2.2499981151386628,9.030105754905808,0.998148694137102,1.0592929644159699,3.248774479009995,2.649694892392327,0.6057472411808495,4.456443846536581,6.875947247783174,3.9279469408941603,3.1866296732729915,0.3182279768350549,4.017323607702479,0.8310767059562685,9.663152826113482,5.679225932915664,9.442304819493593,1.3599849590084379,0.6326770950302141,1.6190341673661202,8.40352566845276,8.52281770784284,3.3811619262609405,1.1280264774172721,2.761018044423298,7.107977826497109,5.772414687028721,9.592238235247786,7.4745650293843795,7.501672314805541,9.422487772207557,8.389638820139089,5.377915922811132,5.306575140196632,7.8378781669706665,1.2991588464141124,3.064643437723391,8.844910335751678,6.617917141546805,6.291775642900408,8.522818315522011,1.5745509220397524,0.1322584042100372,9.04222013471518,9.473679782457419,8.332406413619148,6.286788612754217,8.427753051417364,7.068388944492687,7.42845411905116,9.775917418417439,1.0552761814071077,0.30277924025916114,0.298986678150468,1.2658388052190017,6.496944266194022,4.650326126879261,5.083439528651594,5.0857600827193306,6.364391728630629,4.127685808699133,3.139019848688198,0.9691334508168881,2.284191770098851,4.909583991800082,3.234478183447722,2.4532870924781824,4.793123457787408,0.4738779032438023,5.343244474322777,3.4505920007928848,7.264756960364124,1.824011965816137,8.461518994642827,3.5866224123046764,6.491415971226228,4.675846462155135,6.263216134086549,2.510358979601006,8.392775618862176,4.444180338308135,4.905992662908416,1.4937600769010029,1.580881541755943,9.441674046442738,3.01493111348623,5.119144014449657,0.8360500424612405,5.560867146272617,1.0273946555319569,2.7144422419123804,1.644043965258346,9.426573111296575,3.351951796751629,1.86198528813174,7.572554788087043,5.215622440266065,2.2589767214542,8.70400369625846,7.461443713355269,1.90285110527878,9.346518259442181,1.2762354691155897,0.7073422056615009,0.6704921572383116,5.965262872517496,1.9587056189069707,1.8167160401116011,7.156895582588286,0.6429413510746129,2.98555221835183,4.779033461651734,7.1736065707913355,2.014256191015893,3.447756623467546,4.931356606997072,1.5524742407012249,8.00711425544133,0.6802790155607052,7.599772739648052,0.14057042261196528,8.60170069289665,1.4093469459903951,1.5236784074637089,6.290495593980408,4.470806086426551,2.218012258287936,9.386937372668953,6.736080079463198,6.5142783692972035,4.253794930066559,4.756571862361259,5.969241229549844,6.35723101761964,7.586775893609367,4.122595517125025,9.596949704378378,4.94621949304239,3.540886652499897,3.31393898115087,0.7475867789526602,7.646376149358824,9.388928591938516,4.471993040392466,0.4878271356371511,8.532759710976201,6.870016377068541,3.5018988853597555,6.850464832203798,7.78655963322902,2.2741833830366143,1.3836772810333198,5.474809287816072,8.45786084756018,2.385270978447833,6.629378393650896,7.6713515273169275,4.853489427970457,7.5271092863998,9.514673047434375,9.416425794565107,7.252894072474962,1.8414254113179074,1.45704703790831,5.067976229954178,5.6266450495635745,3.678497168875512,8.923164751474804,0.1442185136892582,8.609411734401263,5.881787896240489,5.409514761379364,2.92097519391316,8.808006392718548,5.041802059150102,2.334262108648919,5.809362575906027,6.98325229730065,5.693469539610765,4.109049181156195,0.9977655594498369,5.7286108326678775,4.246683502281412,8.68258835117516,1.829081119842173,0.743492520936555,6.335504924904289,3.23628350963028,9.606829975972337,3.938714369206442,1.6619467842693547,1.364824667519855,3.2027561336309573,9.908826879698214,0.12591331633915237,4.297949562113996,6.519055923451262,8.051793677615356,7.390770181902598,0.1464754236379484,7.966249922955733,2.803301108408014,2.5664966333644768,6.805089761667615,9.538980583449737,7.391686910917841,3.4395545730305965,2.5724129250497363,9.415221171983358,0.9556417403801132,9.091465477293516,4.62984107411883,0.8996090930788792,2.9310041841090406,4.266764925482873,3.980827915221443,6.7036693157011085,7.964659979346602,2.960356782863929,6.172352292652961,5.524654873870418,5.1095838573801355,7.6780512748257195,6.291935608395656,3.9283969470727964,1.4726396905201833,4.715301457818207,4.371509733635246,7.837259163261199,1.628511729670823,4.150298414111255,2.1495704957090833,0.39127680968946477,3.4792780565941372,0.0831993895171057,2.838355686925824,7.8256280844213695,9.179671966452133,5.335325558180013,0.8545908913520761,3.808560542362145,0.24395236229402872,6.969480856900239,2.8582523008860017,0.16769581689193735,9.420236599329666,0.21870192760303553,0.48077902925802496,9.097517418082449,9.272664165065777,8.200723789393678,3.3359721576437784,0.6462150038182979,2.887219906708156,2.958294111217674,4.477221824276095,6.484945349684114,3.9816961997213673,3.283434342446776,6.2876708550880505,3.7714421116498187,2.0712063026338523,3.7768704270925957,6.606703300837548,9.222872122691584,5.579896542925351,6.523642502851253,0.7491474772721207,4.199220578395597,1.5362500123498846,2.499991055273454,4.167729796028599,6.182004015180416,5.149162138794765,8.29458430508948,9.392828826983624,1.6656094455011528,0.15073885431746703,5.532224773803883,7.517139860255968,1.1369910253090487,2.240682993878864,2.8033950713846933,5.887125472355487,1.201275672604174,8.849919432734302,8.886998467979215,2.661434472501132,8.235124648363287,3.463072598851038,0.5662893998460783,6.967530492316898,9.766015232043177,1.9201420705644434,7.662375007496536,3.1932310577459266,7.283894060899443,4.925168357681162,8.366777967240399,6.536585229817302,7.248600869555595,3.3469365604130386,6.602321553676487,4.471331017386831,8.71676471197237,0.6037789450933762,9.723005956963018,6.391678324603294,9.459676175422407,5.682409232016051,5.58017313731926,9.809513670758655,0.05926938327649456,4.851461910353747,4.967454779570543,5.470433710074348,1.4440349683118003,2.6180173045460498,5.783946789930205,7.54094851791717,5.302989001023231,5.923154289649859,4.055121932373034,4.460268350194012,4.176137641052577,9.305969112433894,1.4534937918786173,3.92388219145664,4.690291844344772,8.266716568422925,4.7763376929788866,2.9640799924823624,3.0122408181043925,7.385084824783905,6.705604623022678,6.320481953372255,5.801145757705628,5.3281978576622935,1.700805488966124,1.6540932008597453,6.809303499458011,1.7900343508664451,0.517010895807799,3.869824052467399,5.851095459820037,8.549062641971636,5.580415179965503,0.881249724588784,8.015412392783656,8.178164581204694,5.849194144261234,6.573930912551673,9.760549506777519,9.574532394478732,6.730527465096245,6.799199456335872,2.9332019784152763,0.6819898705874117,9.668361053031811,1.7573921443471807,6.378857327305862,5.324674115784191,5.649531756899786,9.634251752720505,7.752923462788203,3.6447308326795835,8.152947402928344,7.952456740781799,0.09010305098266169,6.14966549241278,7.762804260822476,7.931385555033281,4.37241720691201,3.2282108190733028,8.136769035269351,4.241210448750623,8.214776319549875,3.0673355894945242,5.564173636337895,4.410117150650348,3.998322216694974,5.619797785383927,1.6445031289186929,6.099319565632248,2.5603821800691873,5.427785248996231,3.309804435585706,7.705384259325296,2.5401294812644215,0.14080436948466835,4.751664630008705,1.4666076974283593,1.4927407793847935,9.613740856785391,1.4282524212961034,1.267247953902142,6.702875080408058,3.1154896104034258,5.447587278285835,7.578420726882056,8.106136611202345,0.10715508308318578,6.558859633688567,6.130002623093769,9.809188290011948,0.11826628582387144,2.4587964840808785,4.141754212300688,7.205437613979453,4.163977678005539,6.433700061178273,5.541393120484129,7.001355760485557,4.838390640532618,9.933152771761677,1.4404755639724809,5.943742482093619,1.9367509201108546,8.103291842938953,6.075883592955953,2.354213750165126,7.808106451745653,8.164883146944401,4.039102446648668,8.791488840216246,9.635458532724616,2.066767450031808,7.454551263530352,9.705716954217385,7.410731048732606,9.018613233557055,4.479277672637374,6.544365391564941,9.960705696704048,9.47592830878391,8.60952248871091,7.59692771826237,8.95632336425869,4.889808549544075,7.119333924236544,3.038707968673575,7.738100710752152,0.3404300723523912,8.405010928038505,5.435976529518809,2.089796249685547,0.2904325933257623,3.288888835015702,5.746302934405129,8.155865548310455,8.635144752056478,1.5501586847416737,8.685094877036896,0.17813860401216575,8.962371691651306,2.142779494611333,9.559735304468983,1.8022747688478558,2.8602415885831323,8.169522420636351,4.564002627936521,4.267872773340777,7.175029198953576,0.11306194467469499,4.858496885136477,3.8330921273933116,4.168722468087505,2.2887276942348467,1.5231614189972364,3.339607249397445,9.207117112032133,9.484127475920051,9.006199332592184,0.362731239237033,0.22526274736636598,7.861400460838448,3.150828175934688,8.654338143697517,6.273571494370154,1.2209256864534868,1.7506621120193722,3.913108591006922,2.490128590614389,1.5686814765469603,3.959924552305163,8.905527875574537,0.9574876625016571,7.8056069031076,2.9114234244068227,1.7560963549872222,7.443824777400128,0.0017872578005229123,1.5581388259692663,1.1444236586878698,4.458908569925848,0.44903861303995596,8.46220891634141,3.6644306116259684,0.863286446726963,7.353379685677604,6.715606769023208,0.04333154687212293,9.009117475734502,4.801697184936584,5.357724489088818,5.432436370698623,5.668603047345746,6.356689217712484,2.6500747077272035,6.790258414188159,3.0753579389624064,8.041097057944338,5.735404510261278,2.3337863424365057],"x":[29.831391656743715,32.35544865364916,29.334358189302762,17.187698360082713,23.26292480498727,13.377768911501828,25.209070413538555,20.470380512469195,23.545798900122797,32.06349849392372,21.321868578571525,23.649894239627976,30.7009482010562,27.971657202106545,21.587087725026656,30.607780935676992,35.175122956828716,24.32671077517825,27.971724230970135,28.836024447167347,25.92629033346343,22.46785383208169,16.942832435338985,28.91043721501361,20.20337496271491,20.797913582582016,26.825454621170636,21.429189244718998,29.93384077404585,22.97031278166484,20.877818694150115,35.3344627676995,24.25488540421839,22.224570508872773,19.207164355834575,19.12324218314143,28.582634362382887,36.77727911932798,25.221986123805337,14.073533483892353,28.204986836879424,29.5787655238456,35.30981753305227,33.91182285879302,20.54871012289397,29.107631214751493,15.97465750582759,35.14842786508666,30.90341979688519,21.309365413946402,16.266466942659306,31.580373189561357,20.940500976521623,20.806839253317683,22.774046266019184,18.460216954726846,34.000093386150255,34.368048318102,22.464487340427908,18.997745464200687,22.662628542526413,33.595793586515704,16.159111619414134,27.717333449048873,30.954996445879342,25.209021772474486,32.856833173499425,29.017229163125343,26.095440614087135,31.30333175950854,14.898788592463138,33.14659345022052,12.429647240614692,17.001589883310764,35.326022073034395,24.005247853922754,15.114868502595536,19.610316110704687,17.534686566141826,16.161249512354303,18.701042296455114,13.194864242266188,18.62762574220474,35.89921391600512,33.16301743304137,16.529565904195966,34.206812990358486,21.481221426084346,29.449876689440945,13.64682986705972,20.18661368436009,16.29016872961911,36.56605948252095,11.736349019150076,31.116232653540354,32.10710336742736,30.16749025578747,19.080621527447725,27.797629759033505,35.75694565570386,20.896967245440635,36.04030862176014,23.595835100539155,26.298832444397178,29.161878876153953,28.51962860410392,22.69139615580999,32.57014555948212,32.27069970421563,27.91141022475405,34.856789539797944,16.672024351159063,35.39666616414162,36.5027870261989,23.14337891321967,32.679815042950025,24.858373519616176,18.669288122023115,15.129867095804856,32.908682745581004,30.148300410678743,30.690745261662144,23.639479632332915,36.73179985107786,21.017239733311087,19.880935365407822,19.234434300168715,22.902958169009672,32.29795381857359,35.70732621362275,22.31142722359643,26.153054955523366,12.73871462309168,18.823832973293936,13.461158898824108,34.77521470218971,21.323364462070728,34.586211909741806,34.14181957987009,26.97758158237819,31.379348166076642,19.802646371491996,33.46596585471255,20.649463023767048,11.018590749361294,26.01649804148337,18.181049928368914,26.01417310228495,35.98650228450461,31.127113180600084,30.28351189667783,33.975010835702115,32.166575241341974,16.33340496816811,31.33185013092951,22.88081631583981,29.905580971878997,33.72333086534817,31.198808041491862,29.776598596491997,19.00284495683285,21.841486998650538,28.12800741479284,21.80104173924765,30.622135071749,25.05874861465235,29.28261402615558,26.804314008847733,25.365361866786884,25.855756762820036,24.673286107671025,12.665787509905083,13.928520572527182,22.609928389247326,27.617749993241354,32.31449152954599,24.576072807350165,36.030994537226434,22.504632681491508,20.573175894594545,18.778236070825663,23.466861895448154,17.65373199497105,33.60599239284696,15.790907757959395,30.507675023064603,22.365683752464733,35.40324616010787,30.932538855138887,15.149057013796421,28.76470289345398,27.601705395272397,29.036484237679204,21.723240734386003,16.521129498266298,26.035310665596292,35.2227473453145,35.40739173665967,15.195431029944775,20.317498957617403,28.89090437531033,33.522236427695184,19.65800237950009,23.620657168875333,20.64718874848719,14.949128891549286,31.182373471722176,18.64034413994294,35.01758155297479,25.160295313228172,28.374403120064503,29.10363506747636,34.46210280129654,14.588787288510707,30.705034791743348,11.281913521793236,27.63712540856713,20.858751324097163,32.97125675969076,22.488502534688216,22.704598123539153,19.144759591300986,27.370379458746044,11.123766801073856,21.26811035430424,14.879941246197895,19.451826354167174,16.63974735905744,23.134323366312557,22.9050512968546,27.55546594670013,19.79349715442421,31.681949480443784,31.011598553401623,16.017373456738596,29.1340116179045,33.22237659045038,31.721841684949617,12.981620200243118,14.107253872393473,27.104057145581884,26.174265897076022,18.896072252390592,12.679351848088281,31.634922609615124,19.939717771895523,23.733734098673054,31.205251287276724,14.73007017376818,13.610893778002344,29.600172461535692,23.80502937025197,30.169972438806628,27.353159256800488,33.456596085492436,21.27517577872551,22.583779669315255,20.749526471631334,27.626096886352034,26.135840509512278,16.00280158339188,21.521022007928522,19.978693421894626,22.101491700164097,30.698823489094664,17.369958395360406,11.689550014166052,29.371941101229332,23.396862085339762,21.34347176963095,28.309644124236364,20.49245110319627,27.363422333467604,21.78543447147557,21.591071301934626,24.61970848674212,22.121097802111997,22.061574288961317,18.272198831203035,27.484655127868002,31.0051533186744,19.677526611331434,16.852256559212414,15.18725942942989,17.639364593244697,34.13879463999422,34.67928321094466,20.513136298435725,27.35728110886891,20.30033329997177,25.025120705507234,18.982178270806855,33.863343285118354,30.254633691880393,32.062955036774575,32.64652020338491,28.257473864919746,21.86078358200527,25.840157485015126,18.457571253640168,22.762838060548873,29.029130703452868,31.893362128696435,34.63870329731233,31.658395885406204,27.482111002409894,14.921780553547734,20.180520427642378,23.703090813555594,21.421034095383632,32.48226366677708,19.42840453344465,24.93902116194208,30.08478077083892,26.621891477309802,23.69971132521962,25.820652568620687,25.893996442762784,24.33326611783772,31.983220009610367,17.210665433123392,17.10654605488686,33.37384510052382,19.268802170026582,32.12513773641746,17.46930971293107,23.275020384157692,35.390431551866754,25.893843952846556,28.792367789064322,33.934440874534324,26.24649720371645,20.370725582791295,30.381653094149836,27.27014670604879,19.251774059685893,18.192261790182645,24.60232507312574,28.762295483856317,33.4884445040715,20.52652453464206,33.06066580956948,20.54648308568874,20.728815977916057,22.684731491276402,27.262474796803847,25.204971288414207,32.82075454488735,31.560546087800464,19.297387403432516,25.130352382031536,31.72302646324392,28.143365220658865,31.573430429058973,32.735279036116104,20.471121182661992,20.98829788359113,36.896747391160616,21.227662063405006,30.460868341358385,15.956134512428088,19.94205095487328,38.8429143335963,31.182326544871138,20.17667150470267,15.813066002649288,28.90519229927352,15.272744280838214,21.915934614116928,22.984065960093407,18.62755411975411,30.418887161929483,22.657158329397536,19.483957911805103,18.23077256712825,29.059173934509502,22.21012361769346,13.115122421996855,23.151188284900833,18.045948404110852,19.584772040934435,22.04796853113178,20.640756184494567,35.672102328150885,31.167393012959785,25.994564149676904,23.880040399703436,18.667157165627433,30.904408513213838,25.848292106240994,38.14451190307895,28.215361929521272,23.206995710270814,13.531635622829192,27.417706639754833,20.36249288645533,31.038905186714516,25.856006174504337,24.350265634880568,20.586135042964404,14.93456770253259,31.01614855184392,27.544577879805512,31.81029856103667,33.51278269813005,14.227787540922645,33.53438323947408,17.272016875453726,28.707660235975247,18.48021194129361,17.55470496313679,29.069380752201536,15.171742100940515,22.817855334893604,17.542725427482267,29.53629706212919,21.60268609949167,24.277282713592278,19.421322727672923,22.98853582085616,15.730956010569034,24.42460334684465,32.53496834299082,27.57013840250805,27.79961223129142,14.271830951496234,27.877733745059526,22.634175329927082,28.054206497414526,26.42746905551856,28.289697248188695,27.829725127647443,16.88766362077424,28.21173429274283,35.901846406879315,26.75154833751982,20.7127832384343,33.02599081872361,19.25021427093075,30.53127647911846,19.53526664711951,20.646926065391177,29.89165582910591,11.970259487995648,25.101120913791455,32.19873831041149,15.937102263362807,24.612916420537925,19.505834060320506,22.14502377550448,19.385146264079285,25.170843668634788,23.84267346623933,16.93447746322049,17.30378035979846,30.506808976571605,30.359467188257003,25.827832271422654,17.34680249422045,25.680414937077078,14.00222589906744,17.730135812316064,13.70510890592185,33.970148449253585,28.68759681740133,35.731444179051664,16.096775630595566,19.18641256801282,30.182665441589485,14.915207625010682,26.873300055902227,24.5313261886371,36.379555011407724,33.073140552139904,27.87537789144685,21.499630137128506,32.67485092113756,25.431081115409185,13.764008019376801,35.20439371513953,32.375016444590386,17.71981324144493,25.05830126256189,24.06340474538476,35.29168455599236,19.21752828975476,22.9625138300662,12.40623280333412,18.11771104163271,21.264238592647352,20.63490218479138,34.49293286125413,28.128948125771892,16.974297474211948,16.150946114038007,13.747734257101115,25.50822004541147,17.197687181196816,29.43706998867448,25.513608268003097,31.901549852032776,23.056899658263326,18.857026329912742,25.390324709352917,27.45495000391095,19.21491115856763,30.300294300542802,17.8327030002527,30.106609454521674,16.174382485870606,21.417131931397833,32.845103904411,30.454167534255273,14.483670723638554,35.241149419374544,24.690896423274083,28.98022507009454,24.464977860943183,32.042989120757596,21.4749655741157,18.34253662866869,27.80156841488827,16.926538965308772,33.59137461891265,19.50166337313884,29.96466302069959,27.53395741579104,27.37512401924748,33.90006339232419,23.567083486985457,27.424144408502407,25.317495076964704,32.60172356670122,30.582756396221633,14.95659965755798,22.465473412326595,16.875884902323627,16.53605210837813,20.597341528000488,29.42462327967533,26.402843470531423,29.444327073231932,29.20699088690815,25.9317449100139,33.46303357100382,22.140503915780307,35.7004249165916,34.61932522099016,23.010191518066122,37.270483848039675,23.152566091544962,25.131419498094356,25.341578619778623,15.711806442216684,16.887476380635164,30.178122651294405,22.273815630823904,26.751784283244675,13.747490058293014,14.753896764252644,17.978699487668855,25.01562545096199,28.1422753789544,28.3785651623318,34.233429982641326,15.895946872071685,21.124998235308354,14.290673294772446,22.615845374012984,24.588308692713767,34.05949223856097,37.16985376196611,28.42379399590407,27.940601723976215,29.5485970193986,35.69498043925708,29.9837493985875,27.571691094043892,30.7556002306371,21.847736394784658,29.54112980363162,27.44730816266508,26.204801352097213,32.00997836438277,17.95282592452212,34.544477452149245,38.71866920633508,13.415077183640754,36.257665660432245,17.32459606072823,18.006747232206976,28.459533870154235,24.881945938358854,23.511384874301125,30.81357046445918,16.083851045537195,24.928767960655872,20.844984247164597,27.924104903888164,22.33979875555457,26.304798227988307,14.269780341312288,25.89674137693354,25.40045482223345,19.84001631582735,18.911643348221503,33.09872482585109,34.02809058458622,29.042245195623224,21.68416714457294,19.021358817999918,16.606547541516186,27.925597265852886,25.673087427742047,20.02938992153678,29.907181589819444,17.222713945548282,22.72143134187246,28.322194198725718,35.312637563766856,38.45569328540063,36.689856986939844,25.583491696745686,17.108402319229917,18.66075384563566,25.706466844347442,28.1936708223539,19.49585406510076,36.96509977357092,31.65143354405572,24.869312281026307,17.905898418499067,27.06309065442484,24.230338805212483,27.67416982116771,28.29556297980963,31.592607522626665,35.97188165834178,28.96747121630775,34.50350873925963,28.476693635431104,23.83621573632308,17.806251568285024,24.42360403544258,20.949052372039304,28.308458111693348,35.01322149599507,27.26673285349915,29.321767535854043,14.933340034123798,22.284481209017194,29.711993403326673,18.19614564474067,16.71160332202453,29.447883003122627,28.940325121236647,25.697390768194815,13.291052908668334,16.423046186672252,18.102735391700076,30.814318484288517,28.734714787854013,29.63242330122891,37.15439660330067,28.48352143833921,26.941483279272006,17.919391673705825,26.207122545973817,30.39300846908327,23.417058936146887,29.64446281035,33.02632263840344,31.053142222201497,30.2744061528357,31.35392424515223,24.682824430028617,16.843638286703836,27.65022441781455,31.319603736412972,18.175318124386536,28.434223953366864,23.501761730137467,17.790083621996047,16.01430418307295,19.337237374109844,14.487904543631947,24.27016203147086,23.136630954900873,28.55753772876071,23.363840586272637,30.617619660747984,37.24464463312036,24.791284337321063,19.528589773377938,22.212946517264456,17.660122651521434,22.452088382586766,27.213123249422093,22.236827028918633,27.670881144351018,16.078644208434056,37.39187752415713,25.306451258582356,20.4638255553032,29.38952728650475,26.867629050598367,33.60797783782246,27.862214636286353,32.778894664269146,34.01786215987944,14.948411083814934,21.967009512748866,27.539486090505896,17.924951035312077,18.593215967650437,38.13498202343345,18.686553143418337,28.243780587566814,31.186163739759564,15.09124995477783,19.39543752673137,30.045484904696703,27.782869947069866,30.48892269765853,26.471605585975528,14.11273484380131,26.346959133067823,23.826258632464686,24.41038732407794,16.19241192780851,17.579046634652464,24.214680219928628,39.75311028439927,24.62570199284745,24.452270651117445,13.852711535438969,20.177559808629336,27.435269988107677,31.479984176292106,19.938009935233815,36.964676862749855,21.841027254098133,23.599340307639274,25.288057993263777,15.692379606971748,28.407109268348897,19.730447714455085,25.14952275918337,29.76569614262399,12.789027410855628,35.12695383940603,30.286339005822935,27.714157948454098,17.541979692423435,29.310476551389485,12.023006075342234,28.327929055745066,39.118234435866604,32.067471805374886,25.756854232497496,29.13126638070863,35.672310590088514,32.047879779984946,16.036135553598406,28.557537601419682,28.32941934492039,30.82857911939414,17.418339577595123,22.32823959971221,25.55561408175268,36.77377657449611,19.062963145699463,34.62118231516616,21.74789893549337,28.699495888585233,13.820413600860366,31.620086655895992,15.570433118830564,18.358509767312047,16.416898941215088,12.991128083273315,31.97895231668027,11.114034033658637,17.972575402984262,24.538956612832003,30.15326085811079,20.1994511075989,28.82116116505056,27.94986015703407,18.237534295209166,16.13629269439246,23.77077332822429,15.28798841089058,20.826415542827025,34.061097696225836,24.76728800833599,31.986997960717336,17.439322690410762,25.864640699877327,23.97133799455593,18.38815825262871,20.799314742789313,33.287184187481614,33.2000147124035,19.361335252236266,20.058447968997797,28.73951666264452,32.97231974648837,23.554551113017393,17.062158760398944,20.358533002497843,22.2851900590557,27.32900642532738,36.54053673295036,24.72249687561873,29.50327574663568,15.326795917834575,11.526531503859076,20.019756823816838,27.4573837226845,26.7435529736113,24.201044945595058,31.02671898175503,25.085684755307806,14.330065017821878,28.524817735569634,26.553225965450697,24.88418760025691,20.82789316011689,24.60833361990962,20.390391076222674,26.468450941621764,35.681725480651636,26.070269894819,17.036342618149583,16.990986813713864,30.149975887714632,14.979296121134844,25.58734008402972,34.620892336475485,17.605052442190285,34.63939834419904,28.084510237392905,19.272812471372546,37.49219428595461,22.259966126438606,22.971710782740175,32.92682738382578,32.113879561613864,35.77262890464502,19.49086958384656,33.020202843234244,23.40312360212594,23.578857456249942,36.258324407158725,13.704005929694247,19.472861946225994,16.20462126584076,31.101968359451902,15.567844480805089,31.203378769442686,35.45953839735617,31.58923431822021,19.823476263088743,19.172015697972657,31.742977187554068,32.39648169190051,14.909220380945019,25.18618163399087,31.592417726016404,27.34769786831532,27.285976620297703,12.967296179154875,30.904207823008683,36.29516440072474,21.76908170827741,25.85387794303974,27.7934543574466,15.127060746446753,25.402403346055742,33.643101704784684,22.064668697056156,28.550451296923008,22.177222514303566,24.527962001272073,32.514823876497175,27.569586450803293,27.11028888854896,31.89352022127226,27.23679952728573,33.86776659480164,30.22091190289467,27.540846988239743,35.84537237607674,16.673410965190946,32.79992355641099,18.635159120441784,21.54843586284617,24.433755411192646,28.057729313043343,23.423812515335776,28.719474356454832,25.590522261071875,35.10093835612754,31.22788581431596,19.570879235335426,13.273693178081711,23.040543391097884,23.871216646361226,22.49415771251259,31.036568720681654,19.889126666601513,20.40656826137439,33.801558898012146,30.559726569348197,32.41958597554014,18.624383144788204,10.982443369159217,23.94043431695402,33.68352957566709,28.077673674301494,38.94553223293012,30.16318399764368,28.969250775083644,30.936934876671643,30.341833351826388,31.523214453097093,32.74828324523179,34.068436244604186,23.81415142497838,18.157329209189133,31.22619438623545,32.90701483304013,17.13469078310204,29.850332976845582,20.152501062803232,28.758810569289736,18.293147320227757,26.473813161849755,29.799959610348303,17.99320973721208,26.264428230804636,32.877195054629865,24.075871518485826,31.176640616877798,29.069574840704828,31.012643817712977,26.471225929108865,35.22219902489546,29.941677953381415,35.678133591984064,15.371786199498693,31.724210990364707,33.15338439921395,19.57389090823764,22.648020445083876,39.49110888293035,36.91932231153148,26.754057150272516,24.007950439919153,21.916002760222977,19.0921589854951,20.95760638582837,24.067012042381712,23.737149111428884,26.97887376098906,22.983700693454857,21.361169029620463,26.22638562995702,17.603913531472532,19.852675969489553,19.178758398203993,31.29013026767279,39.36961162200852,11.55463223535357,11.630037197360043,35.450698759485945,16.8810939063401,24.85538706994545,18.00798971825918,22.68870145413255,29.572105422985004,18.583989128396624,21.122934786456398,14.02780839258465,25.219374742557356,14.768770186072896,29.468406993718414,14.585614794741526,21.45289967240268,32.01911084727659,20.29013581597167,20.96065716930692,28.710932569979278,29.827130332808267,23.73612483898625,28.782914115625005,21.632315827929542,20.73513480715981,33.4151881180816],"beta":[17.002855025888394,19.60107718397828,18.846772808869947,13.382477822516424,12.966427938136407,10.93496381652951,19.16383379976454,11.051744574895192,16.562192346286114,12.212176116355861,15.916038632728043,15.08678905236474,10.832039945082299,13.231219880933097,12.395137425635482,10.912688713377253,15.206871642920792,14.866046757681913,11.420123020567456,11.21959599226212,16.80074097977471,19.6587745460494,14.555593361001971,12.020355728856309,11.359409770306897,16.582654442474333,11.01253927011291,11.47251179318172,10.669542733891404,15.738722706829291,11.485657460272849,16.608981203868304,16.734518510625577,19.931490944440995,15.216902386458258,11.23930592941475,16.039262506169127,19.183860462688735,10.79266787675406,11.71278710075387,18.643946501824452,15.88981014165476,17.641922402962102,17.58017364861353,10.362317834450874,19.19918888010967,15.000608098090373,16.304120153406423,14.636518284636733,14.874659553314322,12.12211799172314,12.7858206548548,19.331447780480367,17.142114531873492,13.29159527756284,16.19859182324579,14.331067948118331,14.668569548770016,12.781326077922184,17.475233893753952,13.518608043457078,14.007832631897783,11.218863694979568,17.303728057235297,17.323680809714272,14.481151070604879,19.203850268519872,15.567298778280572,11.878488368948965,16.561921840649646,14.609117486636896,16.54018535931032,11.687533505975193,10.678452529647178,18.46817925833868,15.339723372705647,14.067321465867138,15.025685955078714,12.667350782826643,13.522955715695623,12.565287348144887,10.223242023490442,18.509491943257373,19.184811765434745,16.075082867209453,12.0259375881591,14.8830681294098,12.723442711486681,14.89582418523569,12.104265016198326,18.72480147958663,12.673545899173353,17.139858938888814,10.03945963311773,18.794679557021347,16.033813434005193,16.203273313036128,10.155684412973097,19.862805984145382,18.258519198822462,17.723708813194932,19.569690904262302,17.310640756880712,15.801307094045963,17.571729046857456,16.196573049201653,12.842153394725477,18.079985774449852,16.226930355786745,16.352327565597403,18.448559142110135,11.005539089259283,16.50487389066061,16.949180332198925,17.16429440324774,15.199454192801225,10.259079070645665,11.261366950466575,10.267851303627022,17.838903246879767,11.433999156904706,13.471923131402598,16.484790614730457,19.800954308049782,15.98714015469001,16.00362628834411,16.095919975209327,18.067580193900106,18.30101227275627,18.87516087386031,12.061814362218506,12.046411240016026,12.246072809671546,15.794543894198704,12.152793192601303,16.059805528588342,12.787436965268304,18.169238323188438,17.591617680324823,19.546371564923735,14.127828469301942,17.983941530746314,19.113331086868286,12.37614686796844,10.16804257455779,15.659242227358103,12.753830051205151,12.944378378206027,19.30226721225465,18.240342723004467,15.105296941195434,19.126531982702712,13.592923050492525,11.166055164354582,12.268871379968147,11.757230321832385,12.090362605396951,16.732794813892845,18.122911891742632,12.97209727020902,17.402484109719285,17.046740181896674,18.034770977790718,10.126696065130236,14.625446588368556,18.809330500888997,18.482157611875678,19.141679375047815,10.29521538741559,12.394696046851614,16.113151700593136,10.193795323664347,10.159919337770976,10.378237747759783,16.56449033038046,12.813996205612817,11.309465327653323,17.774286428600693,11.673183504394062,19.837306257841753,11.839777770150704,19.44931013435749,13.966785993122441,14.779979477996912,15.080882498805785,12.610542558873703,19.276374588561332,16.80873972837415,12.644211562445163,10.40220339879383,11.247143526854064,13.82049125841609,14.26938645878483,11.20072283692698,15.216695463150806,17.548821210791857,18.58674884987614,19.94806769921174,11.30424911484317,15.492390191297709,18.625602246262044,14.630686690377875,18.479740392376854,17.265555060260382,11.233464507528803,10.051338450051265,13.092218258401289,16.45207164329905,18.029262975472783,16.84939701442428,19.922852570673786,12.239516255690532,18.753444244803905,11.687884949171574,17.86760270021534,10.855175690737617,12.367394452293441,10.541104045342628,18.48276898236304,17.85355550014838,17.37797317850257,10.813931524507062,11.175741683322524,10.582837835099753,17.81326302784453,13.641755157049344,10.377446081949767,14.234814437895372,16.639087015630878,16.815962215676205,15.48681067356793,13.653197742337966,18.743662896125706,14.826808653961525,15.26455050453797,16.142341233984812,14.822873013878336,13.15587912503561,12.481489348768278,13.159708143587066,10.344895983848195,11.048315726838002,15.247579329911382,10.469253494491387,18.834532508033064,18.51355345739322,18.580464965989368,18.051965829614268,11.996358548971157,11.100081371422581,12.262167233172791,18.310766811335256,11.324189695787336,16.857731468869517,17.62804171959798,12.655740777433875,10.71516628448575,19.761942968334058,12.690696915097547,11.300706158612373,13.746297106318766,15.1136726859962,10.373951104915735,13.736817557102823,12.480687375703374,12.212783370133826,11.613451427167496,17.60641273406666,13.032087960438849,15.05062106886915,10.391180697299964,14.932266828732399,11.124236195732655,19.9168313583147,18.286923758307797,11.905648005670669,14.88392365093416,17.08131132066341,15.279840843431973,14.244950122133881,15.257307276105013,17.713004361460687,13.34205183122178,11.435814607177068,10.600163537092815,15.678680463262268,14.75753970483659,17.81849673582549,18.734914566210783,14.21389402473022,19.084339686168857,16.212467862989303,14.853978347174866,15.045261119284472,17.099852499090908,18.305856242072217,19.900586636767237,11.471588855427168,13.268407462571014,11.95304524261299,16.47164941286061,13.000977384149387,17.859248368115217,19.281530076560465,13.822914027177575,13.383212572787048,14.30594972798265,17.761145599965857,13.75803318082279,17.609907831237607,13.915831286949041,11.30733376263459,13.315493969853678,15.871756896616983,10.74195220491368,14.104332953393957,19.12576690188893,11.665450906806452,14.133621479632062,17.67148379294793,13.487185648754485,12.728005070634648,16.508264877451353,16.53192935177291,19.931690704652304,12.160179182420013,19.85512672818336,19.20334495676883,10.728702813962357,13.727966066820622,14.024177692925843,16.300103565347833,15.477710439552885,13.556611015586387,14.144859854279069,13.12030660518915,12.211126897004213,16.086456366776478,11.384850226413821,14.556480128068065,17.16658679616535,19.90557371264279,13.837048811392417,11.980761301260028,19.102020894203655,18.304849672906514,13.65239443776873,17.37576617953156,17.209897902851488,14.94286315904617,16.195982228030864,18.53160799797469,10.30314223262983,11.980675210604153,17.544339914612223,18.135618759385128,13.131045367496545,18.46879641471383,19.76463885753482,14.177821932317068,14.628241753583746,19.35089989451115,19.166681750385496,12.453307219810556,16.57390258961634,11.21693920777721,17.057564143678782,13.24974194966926,11.731486968480924,12.022294883295853,10.75359142185695,16.983674802477815,14.899682484526162,18.82501965380754,10.98543079280831,10.332626041057773,17.435527796892025,10.76293439119275,13.53569086381132,16.14611854833686,12.758652264179993,17.38929222856261,18.787054586218026,19.557348251413657,14.522472332338822,18.16896866696524,19.369740339093983,10.86950834299181,17.3629459403251,11.746385244509309,19.06010297283678,19.107961671425073,10.315895085641351,13.391239812272765,18.237962329595565,18.443060838848233,15.793545631619686,18.474671110914052,17.099523259527242,19.440684725683507,11.380333529713951,13.611847608936854,12.812971871722734,19.295597851299284,17.27469113001345,10.507932200873583,14.06497679052552,15.972005726346975,12.938379723702294,16.303227393270625,12.232417799141642,13.905775680756882,11.055150696757396,16.236949695494935,17.261041316051564,12.327407794877061,12.169576950599,11.79126809907646,15.657064096233086,16.65682773456671,11.880031739927094,17.294766351013884,13.049065958409958,12.256504553932126,11.319019673676285,10.00021852810616,12.314373599775195,16.024278732479637,18.711229173524607,12.94477598737144,12.38812256725186,14.722521898714742,10.600728380965398,10.197324121098113,17.20384320214783,10.678605411250023,12.898934338695012,18.73889077759783,16.9890059759249,12.623340838680878,16.498380409120692,15.669770501548761,18.114890618934915,10.970954287205405,14.01807483347271,18.860091838435437,14.788591411871197,19.120616503028366,17.90458290504933,18.370417191138444,15.972321063927863,16.53477475207194,14.694755141088578,14.511204880969252,10.4585923682003,16.877865699831297,16.30234771570244,18.19538893055585,17.115825972223327,17.819306647705183,13.951866257291659,10.923493089252085,10.949703851982513,14.927511322300687,18.397139203166933,17.769686924940174,15.43486914972955,16.978223460562255,11.710188163816477,11.635114120698333,18.587998014900375,19.62618344972318,18.449993428738008,18.080964546412993,17.25810758079414,16.67629628868285,18.308019023836078,13.747693328854279,11.836534212653733,15.798090693529826,12.800525269564274,16.389075346891588,14.612230692225307,12.437559907336674,19.95977998989386,12.427000678554478,13.661003861319221,10.44273183130355,17.436627211239042,18.832249655077053,12.500664456541735,14.880453928637456,17.42207807246323,16.9467023479503,11.163985511158465,12.701317395462809,17.298264075960653,12.9121395624803,17.230605438557955,13.905691039104076,19.330729821911422,17.145937424866098,11.328140898974512,16.38374023248899,19.011720046028437,15.261871808519787,16.18490374564833,10.232450897180543,11.967285380837913,14.255714002239097,18.678028845144247,14.496983392276185,19.668354883101564,11.181678539879442,16.03919362364003,13.209032236774432,10.134064825765387,16.487635582687265,14.853069766227406,10.722387207124468,11.733094130949668,12.69228607987257,15.748249983715038,19.604104116180274,18.580474856087086,19.783790989627313,18.413460472331206,15.537308217941382,17.461112540959697,10.34411448230059,19.403848445544845,14.97670888699413,13.85945538415864,13.00094519524118,11.07856607507263,14.313647506675661,15.439307943595505,12.236660992659944,14.845890969065616,15.839261753730867,12.789161654196775,18.350593701633485,11.304810794358367,18.454610649721136,17.775001912041063,10.960354901099267,17.61034786831999,16.09385196675483,16.422291556979722,18.987823949780594,19.78530801557774,12.559377947802428,10.837923562113067,15.174799003100986,15.475493847743396,15.85636543156404,19.219900087855315,17.41804930146609,11.91252675300197,10.03895306151718,14.270614211482041,19.66200519267009,10.738985788019068,18.983784428476056,19.03466186743685,15.209096520990197,10.77774312248592,11.66190370004754,13.685257936645991,11.706301961960435,15.451967583141496,19.460846634869732,18.612885227041044,18.34212322935275,14.804365589305092,18.74203889722456,15.588504014868453,15.778916642498062,19.211632589548415,16.719637945455595,14.168357745528134,10.064161104556618,15.028825161768024,16.723956986839497,16.65089874351795,18.721051700897426,18.838176677287365,10.91278630135781,17.475901765141046,12.82641794804867,14.318401014346689,13.107507121012901,16.512272981416007,17.30527617533875,12.209139859920494,10.022374404365724,17.019647230124463,11.65374664765697,13.360360448626027,18.426651775421284,13.87502616718885,14.003342648789097,19.816841061822544,15.597970659340296,12.043255221242656,18.43852775286645,18.249872900574726,14.75697699580827,10.145190485205926,18.233817672528247,16.636795457576152,12.094644236414888,16.679353354479915,10.770594834291426,19.644595986865088,13.573897513571538,12.26362009862645,17.15306152257178,11.953980143120141,18.79538998886179,19.2146107986369,19.533376819902813,19.663821100789043,13.251443930980475,15.9886855042552,11.839196326266485,13.892818020988123,17.588166640350828,18.354605174616758,19.17179286322346,11.278447984878785,12.072997734423016,15.47635510813253,16.79988578005753,11.970432566757081,16.072906805767097,14.664640838932124,17.855245250559907,15.834642421148724,14.690605442321923,15.228507464846881,14.594204709023682,16.049363717876624,15.11450589754605,12.437427506594098,15.988961685527611,16.200358083981502,15.41077631672649,13.294089014806676,14.280471227458321,12.800728457062982,11.897977202377366,17.543389906014685,11.321908889565277,11.451550239458212,11.82240396658325,18.77918009705439,12.456162418647576,11.485472139256068,10.956306217749143,12.119057840090719,17.081673784000504,15.625668465231168,17.172874832320556,19.638608937962548,18.878332392830295,12.714624650588293,13.899939189781254,11.053173941720667,11.668687321341157,17.89764028354687,17.257065953560723,15.899238663218004,11.914335341464014,15.2186507630858,14.100532403531957,13.153362603708063,16.3282961950343,18.832500353210687,15.993637351530015,19.305378135682737,10.83816483754367,11.492412170818225,10.435030368095049,15.875862111953388,12.236511681659195,19.76609977041724,18.99332744134253,17.150842517206762,15.877832432580885,17.016049067450854,18.87624536791738,12.540886552017522,15.302538149709692,11.030020447674698,12.448572318640343,16.185700169712234,17.67612748816953,11.527551304048746,12.220514995515385,10.956006446585926,19.074764626905818,12.822927659913661,16.78430890081239,11.658628962530049,19.699302960620088,15.534730467584446,10.57786224668167,14.551094199913287,17.358230050907476,11.15801317955196,15.069200405276032,16.939481815066273,13.78333034044884,14.092734693589865,18.150895367169976,13.31864898389167,12.301263604314181,14.235434404900856,14.426474330878845,15.904948624713846,16.731686359968343,19.375497510580942,14.957258809204305,13.249501328508677,12.743577956723906,10.2408685469828,18.93684112884992,19.94084081257725,15.209212047814793,16.484753440936437,15.368276017073976,19.832351661170474,18.340810673286814,10.052738591645715,10.393164143043128,15.324673053229503,10.997351201259091,14.725891601749998,17.777429419589467,17.971875636473833,13.273582346827691,13.289836227001295,17.243371773509537,15.064871824238306,11.453267912922227,18.73623197946396,15.189274130038573,18.34976521173094,12.738843663685397,16.44526009549445,18.934680751423777,16.303485271821607,16.28195047382555,14.164272694203834,10.725811108943244,10.719996341240153,19.655465286834655,13.059903326558507,12.760613426038432,12.489532195742319,17.47047907314436,12.208391315026876,13.498936631130068,19.129341654832253,15.60566035552484,18.217069244935242,10.976357794754259,10.848822577708543,13.17991952248282,18.170065844471807,10.56121010274646,18.99256208569583,16.69550279592994,17.394671980137385,12.705041618351016,19.770094995605874,13.188889441967477,14.942406421263712,11.354358073316718,11.45379426396569,16.670988429866803,10.03746854112913,13.575778386937046,19.410958533481807,18.07779225488501,16.789213541500004,13.476103200880875,13.327840552195024,11.648814989675449,10.724609219928068,17.090697083041718,13.845927895034386,15.61097461594381,14.621690283190192,18.2420528524689,14.767559383501723,12.105068944255727,11.326089601248777,10.985775156179233,11.979565299511743,19.895640057139893,18.237601419122687,14.999661140400066,13.318235925101243,16.12036541785482,16.445669043093506,19.60396902260402,16.940411106112137,16.888791231576302,14.911662744932524,14.169624715245256,12.027090654284187,19.79953546513486,16.089003963459522,16.97696968682107,14.94548479529312,10.594993350034851,16.62264677972054,10.551067036131531,12.415811191866574,16.327810851469504,14.602095199357578,19.83857066476991,11.804899496428172,10.942645135575503,10.297349534684887,17.93668627907696,11.891768610828287,14.601749256344256,19.508838320236514,13.899472603147853,19.359640358648218,11.523350075402446,11.925557277059793,12.962684174010583,13.852576706649444,13.414446870836976,15.610315474814275,18.337991848893722,12.962540144451804,14.917416437895437,15.444786678549578,12.749878175569942,19.829818828077265,15.39701551555523,10.53879573652937,13.323517978664054,12.34223325536324,18.28418571692187,10.35007316745763,19.823108206242512,12.158847620542868,19.32037480400335,19.754115514800187,13.521554310133919,18.372272844780007,11.014542222201626,15.974591771548983,11.489793793068095,12.80672502133055,16.948635145578436,16.699236334143507,16.587240709556283,11.403672811556444,14.79370361512299,12.947330236614398,13.696752764802119,17.543086324142408,12.840923356411526,10.470903715138387,18.62063075450277,10.65197695485688,17.90355458977143,16.525402791282946,18.104162896165075,12.812910552542503,13.775424688041912,14.717472215721394,18.772187808543187,16.039399001790137,10.245080153183599,13.06965549449378,19.98137219480129,10.050220196090915,13.001736317543992,12.312342652578963,18.04819652168392,17.310421019195285,16.5428990045799,14.330008968518545,14.477805945650438,10.8002780115998,17.95014953855425,14.046953087626887,18.917686877074402,13.627636821654367,15.63771295173683,15.836959196397022,13.160478219416344,16.72357279730188,17.799316145495766,14.39112337315156,19.884812582192282,15.214296507809664,11.632295201126725,11.781256586842844,14.76819978844501,19.41452127406385,12.30970349461421,18.492507419600905,10.098702024087887,13.447692660937843,19.562474696273018,17.2181332412789,14.848712016791744,17.187775001672286,10.63494777591484,13.839017488626702,14.268175760620888,10.164143011335982,19.48881941904542,19.9945603418367,14.338663078135486,18.50637176224741,18.092979870771018,17.829846216136396,12.811349302114095,16.70599546685513,15.741721127494142,10.566056719174636,14.35978958017081,17.91023626233988,15.425045961660519,19.34983376026154,15.274942610147502,16.693010959731712,15.130223941289035,19.83377606123124,12.724400834431208,10.630902797639418,16.174977247078697,18.082045696977737,10.307502855647945,12.165340076917682,14.768572058406313,12.647594691927415,10.53194954077,15.787721041216415,13.378713508950725,15.760221616175317,14.689428211931023,15.596918992356098,19.412288457001978,10.526359054622556,15.61832196414442,19.714352237452925,18.100844579013653,11.942961292424974,18.417956047096762,14.097980336622683,15.532496203003454,19.028241247419913,12.922366546023722,16.162543485074934,12.35532356891024,10.6507694422431,14.03912069735123,13.836975921646992,14.816515009436849,11.414172534037021,14.423986821499287,15.277380614698188,19.606205618401624,10.832208030595062,10.556744243503749,17.027161442044346,16.59192154620562,14.091059344633619,10.206000711077468,14.9104329415897,14.728637586663314,13.395146239058937,19.861904032063897,12.287821160420318,14.93304485865622,10.556592603588328,15.727411064111841,10.74611289411201,19.63845692562088,16.245395045872925,14.021979923128145,14.343217500714998,11.992663018909084,15.410161447382913,15.413757456541887,12.338927159097004,19.515044309375742,10.435570795684328,17.528810328147443]}
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

var largeAlpha = require( './fixtures/julia/large_alpha.json' );
var largeBeta = require( './fixtures/julia/large_beta.json' );
var bothLarge = require( './fixtures/julia/both_large.json' );


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

	logcdf = factory( 1.0, 1.0 );
	y = logcdf( NaN );
	t.equal( isnan( y ), true, 'returns NaN' );

	logcdf = factory( NaN, 1.0 );
	y = logcdf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	logcdf = factory( 1.0, NaN );
	y = logcdf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	logcdf = factory( NaN, NaN );
	y = logcdf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	logcdf = factory( NaN, NaN );
	y = logcdf( NaN );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'if provided a finite `alpha` and `beta`, the function returns a function which returns `0` when provided `+Infinity`', function test( t ) {
	var logcdf;
	var y;

	logcdf = factory( 0.5, 1.0 );
	y = logcdf( PINF );
	t.equal( y, 0.0, 'returns 0' );

	t.end();
});

tape( 'if provided a finite `alpha` and `beta`, the function returns a function which returns `-Infinity` when provided a number smaller than `beta` for `x`', function test( t ) {
	var logcdf;
	var y;

	logcdf = factory( 1.0, 10.0 );
	y = logcdf( NINF );
	t.equal( y, NINF, 'returns -Infinity' );

	y = logcdf( -100.0 );
	t.equal( y, NINF, 'returns -Infinity' );

	y = logcdf( -10.0 );
	t.equal( y, NINF, 'returns -Infinity' );

	y = logcdf( -1.0 );
	t.equal( y, NINF, 'returns -Infinity' );

	y = logcdf( 9.0 );
	t.equal( y, NINF, 'returns -Infinity' );

	y = logcdf( 10.0 );
	t.equal( y, NINF, 'returns -Infinity' );

	t.end();
});

tape( 'if provided a nonpositive `alpha`, the created function always returns `NaN`', function test( t ) {
	var logcdf;
	var y;

	logcdf = factory( 0.0, 0.5 );

	y = logcdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	logcdf = factory( -1.0, 0.5 );

	y = logcdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = logcdf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	logcdf = factory( NINF, 1.0 );
	y = logcdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	logcdf = factory( NINF, PINF );
	y = logcdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	logcdf = factory( NINF, NINF );
	y = logcdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	logcdf = factory( NINF, NaN );
	y = logcdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'if provided a nonpositive `beta`, the created function always returns `NaN`', function test( t ) {
	var logcdf;
	var y;

	logcdf = factory( 1.0, 0.0 );

	y = logcdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	logcdf = factory( 1.0, -1.0 );

	y = logcdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = logcdf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	logcdf = factory( 1.0, NINF );
	y = logcdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	logcdf = factory( PINF, NINF );
	y = logcdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	logcdf = factory( NINF, NINF );
	y = logcdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	logcdf = factory( NaN, NINF );
	y = logcdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'the created function evaluates the logcdf for `x` given large `alpha` and `beta`', function test( t ) {
	var expected;
	var logcdf;
	var delta;
	var alpha;
	var beta;
	var tol;
	var i;
	var x;
	var y;

	expected = bothLarge.expected;
	x = bothLarge.x;
	alpha = bothLarge.alpha;
	beta = bothLarge.beta;
	for ( i = 0; i < x.length; i++ ) {
		logcdf = factory( alpha[i], beta[i] );
		y = logcdf( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', alpha: '+alpha[i]+', beta: '+beta[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 1.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. alpha: '+alpha[i]+'. beta: '+beta[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the created function evaluates the logcdf for `x` given large `alpha` parameter', function test( t ) {
	var expected;
	var logcdf;
	var delta;
	var alpha;
	var beta;
	var tol;
	var i;
	var x;
	var y;

	expected = largeAlpha.expected;
	x = largeAlpha.x;
	alpha = largeAlpha.alpha;
	beta = largeAlpha.beta;
	for ( i = 0; i < x.length; i++ ) {
		logcdf = factory( alpha[i], beta[i] );
		y = logcdf( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', alpha: '+alpha[i]+', beta: '+beta[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 1.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. alpha: '+alpha[i]+'. beta: '+beta[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the created function evaluates the logcdf for `x` given large `beta` parameter', function test( t ) {
	var expected;
	var logcdf;
	var delta;
	var alpha;
	var beta;
	var tol;
	var i;
	var x;
	var y;

	expected = largeBeta.expected;
	x = largeBeta.x;
	alpha = largeBeta.alpha;
	beta = largeBeta.beta;
	for ( i = 0; i < x.length; i++ ) {
		logcdf = factory( alpha[i], beta[i] );
		y = logcdf( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', alpha: '+alpha[i]+', beta: '+beta[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 1.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. alpha: '+alpha[i]+'. beta: '+beta[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

}).call(this,"/lib/node_modules/@stdlib/math/base/dists/pareto-type1/logcdf/test/test.factory.js")
},{"./../lib/factory.js":49,"./fixtures/julia/both_large.json":52,"./fixtures/julia/large_alpha.json":53,"./fixtures/julia/large_beta.json":54,"@stdlib/constants/math/float64-eps":26,"@stdlib/constants/math/float64-ninf":33,"@stdlib/constants/math/float64-pinf":34,"@stdlib/math/base/assert/is-nan":45,"@stdlib/math/base/special/abs":59,"tape":183}],56:[function(require,module,exports){
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

}).call(this,"/lib/node_modules/@stdlib/math/base/dists/pareto-type1/logcdf/test/test.js")
},{"./../lib":50,"tape":183}],57:[function(require,module,exports){
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

var largeAlpha = require( './fixtures/julia/large_alpha.json' );
var largeBeta = require( './fixtures/julia/large_beta.json' );
var bothLarge = require( './fixtures/julia/both_large.json' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.equal( typeof logcdf, 'function', 'main export is a function' );
	t.end();
});

tape( 'if provided `NaN` for any parameter, the function returns `NaN`', function test( t ) {
	var y = logcdf( NaN, 0.0, 1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );
	y = logcdf( 0.0, NaN, 1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );
	y = logcdf( 0.0, 1.0, NaN );
	t.equal( isnan( y ), true, 'returns NaN' );
	t.end();
});

tape( 'the function returns `0.0` if provided `+Infinity` and valid parameters', function test( t ) {
	var y = logcdf( PINF, 2.0, 2.0 );
	t.equal( y, 0.0, 'returns 0.0' );
	t.end();
});

tape( 'if provided a number smaller than `beta` for `x` and a valid `alpha` and `beta`, the function returns `-Infinity`', function test( t ) {
	var y = logcdf( NINF, 1.0, 1.0 );
	t.equal( y, NINF, 'returns -Infinity' );

	y = logcdf( 0.5, 1.0, 1.0 );
	t.equal( y, NINF, 'returns -Infinity' );

	y = logcdf( 0.0, 1.0, 1.0 );
	t.equal( y, NINF, 'returns -Infinity' );

	t.end();
});

tape( 'if provided a nonpositive `alpha`, the function returns `NaN`', function test( t ) {
	var y;

	y = logcdf( 2.0, 0.0, 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = logcdf( 2.0, -1.0, 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = logcdf( 0.0, -1.0, 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = logcdf( 2.0, NINF, 1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = logcdf( 2.0, NINF, PINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = logcdf( 2.0, NINF, NINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = logcdf( 2.0, NINF, NaN );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'if provided a nonpositive `beta`, the function returns `NaN`', function test( t ) {
	var y;

	y = logcdf( 2.0, 2.0, 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = logcdf( 2.0, 2.0, -1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = logcdf( 0.0, 2.0, -1/0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = logcdf( 2.0, 1.0, NINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = logcdf( 2.0, PINF, NINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = logcdf( 2.0, NINF, NINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = logcdf( 2.0, NaN, NINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'the function evaluates the logcdf for `x` given large `alpha` and `beta`', function test( t ) {
	var expected;
	var delta;
	var alpha;
	var beta;
	var tol;
	var x;
	var y;
	var i;

	expected = bothLarge.expected;
	x = bothLarge.x;
	alpha = bothLarge.alpha;
	beta = bothLarge.beta;
	for ( i = 0; i < x.length; i++ ) {
		y = logcdf( x[i], alpha[i], beta[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', alpha: '+alpha[i]+', beta: '+beta[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 1.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. alpha: '+alpha[i]+'. beta: '+beta[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the function evaluates the logcdf for `x` given large `alpha` parameter', function test( t ) {
	var expected;
	var delta;
	var alpha;
	var beta;
	var tol;
	var i;
	var x;
	var y;

	expected = largeAlpha.expected;
	x = largeAlpha.x;
	alpha = largeAlpha.alpha;
	beta = largeAlpha.beta;
	for ( i = 0; i < x.length; i++ ) {
		y = logcdf( x[i], alpha[i], beta[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', alpha: '+alpha[i]+', beta: '+beta[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 1.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. alpha: '+alpha[i]+'. beta: '+beta[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the function evaluates the logcdf for `x` given large rate parameter `beta`', function test( t ) {
	var expected;
	var delta;
	var alpha;
	var beta;
	var tol;
	var i;
	var x;
	var y;

	expected = largeBeta.expected;
	x = largeBeta.x;
	alpha = largeBeta.alpha;
	beta = largeBeta.beta;
	for ( i = 0; i < x.length; i++ ) {
		y = logcdf( x[i], alpha[i], beta[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', alpha: '+alpha[i]+', beta: '+beta[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 1.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. alpha: '+alpha[i]+'. beta: '+beta[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

}).call(this,"/lib/node_modules/@stdlib/math/base/dists/pareto-type1/logcdf/test/test.logcdf.js")
},{"./../lib":50,"./fixtures/julia/both_large.json":52,"./fixtures/julia/large_alpha.json":53,"./fixtures/julia/large_beta.json":54,"@stdlib/constants/math/float64-eps":26,"@stdlib/constants/math/float64-ninf":33,"@stdlib/constants/math/float64-pinf":34,"@stdlib/math/base/assert/is-nan":45,"@stdlib/math/base/special/abs":59,"tape":183}],58:[function(require,module,exports){
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

},{"@stdlib/number/float64/base/from-words":83,"@stdlib/number/float64/base/get-high-word":87,"@stdlib/number/float64/base/to-words":98}],61:[function(require,module,exports){
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

},{"@stdlib/constants/math/float64-exponent-bias":27,"@stdlib/constants/math/float64-max-base2-exponent":31,"@stdlib/constants/math/float64-max-base2-exponent-subnormal":30,"@stdlib/constants/math/float64-min-base2-exponent-subnormal":32,"@stdlib/constants/math/float64-ninf":33,"@stdlib/constants/math/float64-pinf":34,"@stdlib/math/base/assert/is-infinite":41,"@stdlib/math/base/assert/is-nan":45,"@stdlib/math/base/special/copysign":61,"@stdlib/number/float64/base/exponent":81,"@stdlib/number/float64/base/from-words":83,"@stdlib/number/float64/base/normalize":89,"@stdlib/number/float64/base/to-words":98}],66:[function(require,module,exports){
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

},{"./log1p.js":67}],67:[function(require,module,exports){
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

},{"./polyval_lp.js":68,"@stdlib/constants/math/float64-exponent-bias":27,"@stdlib/constants/math/float64-ninf":33,"@stdlib/constants/math/float64-pinf":34,"@stdlib/math/base/assert/is-nan":45,"@stdlib/number/float64/base/get-high-word":87,"@stdlib/number/float64/base/set-high-word":93}],68:[function(require,module,exports){
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

},{}],69:[function(require,module,exports){
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

},{"./pow.js":75}],70:[function(require,module,exports){
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

},{"./polyval_l.js":72,"@stdlib/constants/math/float64-exponent-bias":27,"@stdlib/number/float64/base/get-high-word":87,"@stdlib/number/float64/base/set-high-word":93,"@stdlib/number/float64/base/set-low-word":95}],71:[function(require,module,exports){
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

},{"./polyval_w.js":74,"@stdlib/number/float64/base/set-low-word":95}],72:[function(require,module,exports){
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

},{}],73:[function(require,module,exports){
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
		return 0.5;
	}
	return 0.5 + (x * (-0.3333333333333333 + (x * 0.25))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

},{}],75:[function(require,module,exports){
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

},{"./log2ax.js":70,"./logx.js":71,"./pow2.js":76,"./x_is_zero.js":77,"./y_is_huge.js":78,"./y_is_infinite.js":79,"@stdlib/constants/math/float64-ninf":33,"@stdlib/constants/math/float64-pinf":34,"@stdlib/math/base/assert/is-infinite":41,"@stdlib/math/base/assert/is-integer":43,"@stdlib/math/base/assert/is-nan":45,"@stdlib/math/base/assert/is-odd":47,"@stdlib/math/base/special/abs":59,"@stdlib/math/base/special/sqrt":80,"@stdlib/number/float64/base/set-low-word":95,"@stdlib/number/float64/base/to-words":98,"@stdlib/number/uint32/base/to-int32":102}],76:[function(require,module,exports){
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

},{"./polyval_p.js":73,"@stdlib/constants/math/float64-exponent-bias":27,"@stdlib/constants/math/float64-ln-two":29,"@stdlib/math/base/special/ldexp":64,"@stdlib/number/float64/base/get-high-word":87,"@stdlib/number/float64/base/set-high-word":93,"@stdlib/number/float64/base/set-low-word":95,"@stdlib/number/uint32/base/to-int32":102}],77:[function(require,module,exports){
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

},{"@stdlib/constants/math/float64-ninf":33,"@stdlib/constants/math/float64-pinf":34,"@stdlib/math/base/assert/is-odd":47,"@stdlib/math/base/special/copysign":61}],78:[function(require,module,exports){
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

},{"@stdlib/number/float64/base/get-high-word":87}],79:[function(require,module,exports){
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

},{"@stdlib/constants/math/float64-pinf":34,"@stdlib/math/base/special/abs":59}],80:[function(require,module,exports){
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

},{}],81:[function(require,module,exports){
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

},{"./main.js":82}],82:[function(require,module,exports){
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

},{"@stdlib/constants/math/float64-exponent-bias":27,"@stdlib/constants/math/float64-high-word-exponent-mask":28,"@stdlib/number/float64/base/get-high-word":87}],83:[function(require,module,exports){
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

},{"./main.js":85}],84:[function(require,module,exports){
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

},{"@stdlib/assert/is-little-endian":18}],85:[function(require,module,exports){
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

},{"./indices.js":84,"@stdlib/array/float64":2,"@stdlib/array/uint32":7}],86:[function(require,module,exports){
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

},{"@stdlib/assert/is-little-endian":18}],87:[function(require,module,exports){
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

},{"./main.js":88}],88:[function(require,module,exports){
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

},{"./high.js":86,"@stdlib/array/float64":2,"@stdlib/array/uint32":7}],89:[function(require,module,exports){
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

},{"./main.js":90}],90:[function(require,module,exports){
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

},{"./normalize.js":91}],91:[function(require,module,exports){
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

},{"@stdlib/constants/math/float64-smallest-normal":35,"@stdlib/math/base/assert/is-infinite":41,"@stdlib/math/base/assert/is-nan":45,"@stdlib/math/base/special/abs":59}],92:[function(require,module,exports){
arguments[4][86][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":18,"dup":86}],93:[function(require,module,exports){
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

},{"./main.js":94}],94:[function(require,module,exports){
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

},{"./high.js":92,"@stdlib/array/float64":2,"@stdlib/array/uint32":7}],95:[function(require,module,exports){
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

},{"./main.js":97}],96:[function(require,module,exports){
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

},{"@stdlib/assert/is-little-endian":18}],97:[function(require,module,exports){
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

},{"./low.js":96,"@stdlib/array/float64":2,"@stdlib/array/uint32":7}],98:[function(require,module,exports){
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

},{"./main.js":100}],99:[function(require,module,exports){
arguments[4][84][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":18,"dup":84}],100:[function(require,module,exports){
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

},{"./to_words.js":101}],101:[function(require,module,exports){
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

},{"./indices.js":99,"@stdlib/array/float64":2,"@stdlib/array/uint32":7}],102:[function(require,module,exports){
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

},{"./main.js":103}],103:[function(require,module,exports){
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

},{}],104:[function(require,module,exports){
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

},{}],105:[function(require,module,exports){
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

},{"./constant_function.js":104}],106:[function(require,module,exports){
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

},{}],107:[function(require,module,exports){
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

},{"./define_read_only_property.js":106}],108:[function(require,module,exports){
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

},{"./float64array.js":109,"@stdlib/assert/is-float64array":15}],109:[function(require,module,exports){
'use strict';

// EXPORTS //

module.exports = ( typeof Float64Array === 'function' ) ? Float64Array : null;

},{}],110:[function(require,module,exports){
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

},{"./detect_float64array_support.js":108}],111:[function(require,module,exports){
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

},{}],112:[function(require,module,exports){
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

},{"./detect_symbol_support.js":111}],113:[function(require,module,exports){
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

},{"@stdlib/utils/detect-symbol-support":112}],114:[function(require,module,exports){
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

},{"./has_tostringtag_support.js":113}],115:[function(require,module,exports){
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

},{"./uint16array.js":117,"@stdlib/assert/is-uint16array":20,"@stdlib/constants/math/uint16-max":36}],116:[function(require,module,exports){
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

},{"./detect_uint16array_support.js":115}],117:[function(require,module,exports){
'use strict';

// EXPORTS //

module.exports = ( typeof Uint16Array === 'function' ) ? Uint16Array : null;

},{}],118:[function(require,module,exports){
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

},{"./uint32array.js":120,"@stdlib/assert/is-uint32array":22,"@stdlib/constants/math/uint32-max":37}],119:[function(require,module,exports){
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

},{"./detect_uint32array_support.js":118}],120:[function(require,module,exports){
'use strict';

// EXPORTS //

module.exports = ( typeof Uint32Array === 'function' ) ? Uint32Array : null;

},{}],121:[function(require,module,exports){
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

},{"./uint8array.js":123,"@stdlib/assert/is-uint8array":24,"@stdlib/constants/math/uint8-max":38}],122:[function(require,module,exports){
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

},{"./detect_uint8array_support.js":121}],123:[function(require,module,exports){
'use strict';

// EXPORTS //

module.exports = ( typeof Uint8Array === 'function' ) ? Uint8Array : null;

},{}],124:[function(require,module,exports){
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

},{"./native_class.js":125,"./polyfill.js":126,"@stdlib/utils/detect-tostringtag-support":114}],125:[function(require,module,exports){
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

},{"./tostring.js":127}],126:[function(require,module,exports){
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

},{"./tostring.js":127,"./tostringtag.js":128,"@stdlib/assert/has-own-property":14}],127:[function(require,module,exports){
'use strict';

// MAIN //

var toStr = Object.prototype.toString;


// EXPORTS //

module.exports = toStr;

},{}],128:[function(require,module,exports){
'use strict';

// MAIN //

var toStrTag = ( typeof Symbol === 'function' ) ? Symbol.toStringTag : '';


// EXPORTS //

module.exports = toStrTag;

},{}],129:[function(require,module,exports){
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

},{}],130:[function(require,module,exports){

},{}],131:[function(require,module,exports){
arguments[4][130][0].apply(exports,arguments)
},{"dup":130}],132:[function(require,module,exports){
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

},{}],133:[function(require,module,exports){
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

},{"base64-js":129,"ieee754":152}],134:[function(require,module,exports){
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
},{"../../is-buffer/index.js":154}],135:[function(require,module,exports){
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

},{"./lib/is_arguments.js":136,"./lib/keys.js":137}],136:[function(require,module,exports){
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

},{}],137:[function(require,module,exports){
exports = module.exports = typeof Object.keys === 'function'
  ? Object.keys : shim;

exports.shim = shim;
function shim (obj) {
  var keys = [];
  for (var key in obj) keys.push(key);
  return keys;
}

},{}],138:[function(require,module,exports){
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

},{"foreach":148,"object-keys":158}],139:[function(require,module,exports){
module.exports = function () {
    for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] !== undefined) return arguments[i];
    }
};

},{}],140:[function(require,module,exports){
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

},{"./helpers/isFinite":141,"./helpers/isNaN":142,"./helpers/mod":143,"./helpers/sign":144,"es-to-primitive/es5":145,"has":151,"is-callable":155}],141:[function(require,module,exports){
var $isNaN = Number.isNaN || function (a) { return a !== a; };

module.exports = Number.isFinite || function (x) { return typeof x === 'number' && !$isNaN(x) && x !== Infinity && x !== -Infinity; };

},{}],142:[function(require,module,exports){
module.exports = Number.isNaN || function isNaN(a) {
	return a !== a;
};

},{}],143:[function(require,module,exports){
module.exports = function mod(number, modulo) {
	var remain = number % modulo;
	return Math.floor(remain >= 0 ? remain : remain + modulo);
};

},{}],144:[function(require,module,exports){
module.exports = function sign(number) {
	return number >= 0 ? 1 : -1;
};

},{}],145:[function(require,module,exports){
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

},{"./helpers/isPrimitive":146,"is-callable":155}],146:[function(require,module,exports){
module.exports = function isPrimitive(value) {
	return value === null || (typeof value !== 'function' && typeof value !== 'object');
};

},{}],147:[function(require,module,exports){
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

},{}],148:[function(require,module,exports){

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


},{}],149:[function(require,module,exports){
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

},{}],150:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

module.exports = Function.prototype.bind || implementation;

},{"./implementation":149}],151:[function(require,module,exports){
var bind = require('function-bind');

module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);

},{"function-bind":150}],152:[function(require,module,exports){
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

},{}],153:[function(require,module,exports){
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

},{}],154:[function(require,module,exports){
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

},{}],155:[function(require,module,exports){
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

},{}],156:[function(require,module,exports){
var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};

},{}],157:[function(require,module,exports){
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

},{}],158:[function(require,module,exports){
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

},{"./isArguments":159}],159:[function(require,module,exports){
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

},{}],160:[function(require,module,exports){
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
},{"_process":132}],161:[function(require,module,exports){
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
},{"_process":132}],162:[function(require,module,exports){
module.exports = require('./lib/_stream_duplex.js');

},{"./lib/_stream_duplex.js":163}],163:[function(require,module,exports){
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
},{"./_stream_readable":165,"./_stream_writable":167,"core-util-is":134,"inherits":153,"process-nextick-args":161}],164:[function(require,module,exports){
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
},{"./_stream_transform":166,"core-util-is":134,"inherits":153}],165:[function(require,module,exports){
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
},{"./_stream_duplex":163,"./internal/streams/BufferList":168,"./internal/streams/destroy":169,"./internal/streams/stream":170,"_process":132,"core-util-is":134,"events":147,"inherits":153,"isarray":156,"process-nextick-args":161,"safe-buffer":176,"string_decoder/":182,"util":130}],166:[function(require,module,exports){
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
},{"./_stream_duplex":163,"core-util-is":134,"inherits":153}],167:[function(require,module,exports){
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
},{"./_stream_duplex":163,"./internal/streams/destroy":169,"./internal/streams/stream":170,"_process":132,"core-util-is":134,"inherits":153,"process-nextick-args":161,"safe-buffer":176,"util-deprecate":189}],168:[function(require,module,exports){
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
},{"safe-buffer":176}],169:[function(require,module,exports){
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
},{"process-nextick-args":161}],170:[function(require,module,exports){
module.exports = require('events').EventEmitter;

},{"events":147}],171:[function(require,module,exports){
module.exports = require('./readable').PassThrough

},{"./readable":172}],172:[function(require,module,exports){
exports = module.exports = require('./lib/_stream_readable.js');
exports.Stream = exports;
exports.Readable = exports;
exports.Writable = require('./lib/_stream_writable.js');
exports.Duplex = require('./lib/_stream_duplex.js');
exports.Transform = require('./lib/_stream_transform.js');
exports.PassThrough = require('./lib/_stream_passthrough.js');

},{"./lib/_stream_duplex.js":163,"./lib/_stream_passthrough.js":164,"./lib/_stream_readable.js":165,"./lib/_stream_transform.js":166,"./lib/_stream_writable.js":167}],173:[function(require,module,exports){
module.exports = require('./readable').Transform

},{"./readable":172}],174:[function(require,module,exports){
module.exports = require('./lib/_stream_writable.js');

},{"./lib/_stream_writable.js":167}],175:[function(require,module,exports){
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
},{"_process":132,"through":188}],176:[function(require,module,exports){
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

},{"buffer":133}],177:[function(require,module,exports){
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

},{"events":147,"inherits":153,"readable-stream/duplex.js":162,"readable-stream/passthrough.js":171,"readable-stream/readable.js":172,"readable-stream/transform.js":173,"readable-stream/writable.js":174}],178:[function(require,module,exports){
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

},{"es-abstract/es5":140,"function-bind":150}],179:[function(require,module,exports){
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

},{"./implementation":178,"./polyfill":180,"./shim":181,"define-properties":138,"function-bind":150}],180:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

var zeroWidthSpace = '\u200b';

module.exports = function getPolyfill() {
	if (String.prototype.trim && zeroWidthSpace.trim() === zeroWidthSpace) {
		return String.prototype.trim;
	}
	return implementation;
};

},{"./implementation":178}],181:[function(require,module,exports){
'use strict';

var define = require('define-properties');
var getPolyfill = require('./polyfill');

module.exports = function shimStringTrim() {
	var polyfill = getPolyfill();
	define(String.prototype, { trim: polyfill }, { trim: function () { return String.prototype.trim !== polyfill; } });
	return polyfill;
};

},{"./polyfill":180,"define-properties":138}],182:[function(require,module,exports){
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
},{"safe-buffer":176}],183:[function(require,module,exports){
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
},{"./lib/default_stream":184,"./lib/results":186,"./lib/test":187,"_process":132,"defined":139,"through":188}],184:[function(require,module,exports){
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
},{"_process":132,"fs":131,"through":188}],185:[function(require,module,exports){
(function (process){
module.exports = typeof setImmediate !== 'undefined'
    ? setImmediate
    : process.nextTick
;

}).call(this,require('_process'))
},{"_process":132}],186:[function(require,module,exports){
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
},{"_process":132,"events":147,"function-bind":150,"has":151,"inherits":153,"object-inspect":157,"resumer":175,"through":188}],187:[function(require,module,exports){
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
},{"./next_tick":185,"deep-equal":135,"defined":139,"events":147,"has":151,"inherits":153,"path":160,"string.prototype.trim":179}],188:[function(require,module,exports){
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
},{"_process":132,"stream":177}],189:[function(require,module,exports){
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
