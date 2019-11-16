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

},{"./float64array.js":1,"./polyfill.js":3,"@stdlib/utils/detect-float64array-support":107}],3:[function(require,module,exports){
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

},{"./polyfill.js":5,"./uint16array.js":6,"@stdlib/utils/detect-uint16array-support":113}],5:[function(require,module,exports){
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

},{"./polyfill.js":8,"./uint32array.js":9,"@stdlib/utils/detect-uint32array-support":116}],8:[function(require,module,exports){
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

},{"./polyfill.js":11,"./uint8array.js":12,"@stdlib/utils/detect-uint8array-support":119}],11:[function(require,module,exports){
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

},{"@stdlib/utils/native-class":121}],17:[function(require,module,exports){
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

},{"@stdlib/utils/native-class":121}],22:[function(require,module,exports){
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

},{"@stdlib/utils/native-class":121}],24:[function(require,module,exports){
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

},{"@stdlib/utils/native-class":121}],26:[function(require,module,exports){
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
var NINF = require( '@stdlib/constants/math/float64-ninf' );


// MAIN //

/**
* Returns a function for evaluating the natural logarithm of the cumulative distribution function (CDF) for a Fréchet distribution with shape `alpha`, scale `s`, and location `m`.
*
* @param {PositiveNumber} alpha - shape parameter
* @param {PositiveNumber} s - scale parameter
* @param {number} m - location parameter
* @returns {Function} logCDF
*
* @example
* var logcdf = factory( 3.0, 3.0, 5.0 );
*
* var y = logcdf( 10.0 );
* // returns ~-0.216
*
* y = logcdf( 7.0 );
* // returns ~-3.381
*/
function factory( alpha, s, m ) {
	if (
		isnan( alpha ) ||
		isnan( s ) ||
		isnan( m ) ||
		alpha <= 0.0 ||
		s <= 0.0
	) {
		return constantFunction( NaN );
	}
	return logcdf;

	/**
	* Evaluates the natural logarithm of the cumulative distribution function (CDF) for a Fréchet distribution.
	*
	* @private
	* @param {number} x - input value
	* @returns {number} evaluated logCDF
	*
	* @example
	* var y = logcdf( -2.0 );
	* // returns <number>
	*/
	function logcdf( x ) {
		var z;
		if ( isnan( x ) ) {
			return NaN;
		}
		if ( x <= m ) {
			return NINF;
		}
		z = ( x - m ) / s;
		return -pow( z, -alpha );
	}
}


// EXPORTS //

module.exports = factory;

},{"@stdlib/constants/math/float64-ninf":33,"@stdlib/math/base/assert/is-nan":45,"@stdlib/math/base/special/pow":66,"@stdlib/utils/constant-function":102}],50:[function(require,module,exports){
'use strict';

/**
* Fréchet distribution logarithm of the cumulative distribution function (CDF).
*
* @module @stdlib/math/base/dists/frechet/logcdf
*
* @example
* var logcdf = require( '@stdlib/math/base/dists/frechet/logcdf' );
*
* var y = logcdf( 10.0, 2.0, 3.0, 5.0 );
* // returns ~-0.36
*
* y = logcdf( 3.8, 2.0, 3.0, 2.0 );
* // returns ~-2.778
*
* @example
* var factory = require( '@stdlib/math/base/dists/frechet/logcdf' ).factory;
* var logcdf = factory( 3.0, 3.0, 5.0 );
* var y = logcdf( 10.0 );
* // returns ~-0.216
*
* y = logcdf( 7.0 );
* // returns ~-3.381
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-read-only-property' );
var logcdf = require( './logcdf.js' );
var factory = require( './factory.js' );


// MAIN //

setReadOnly( logcdf, 'factory', factory );


// EXPORTS //

module.exports = logcdf;

},{"./factory.js":49,"./logcdf.js":51,"@stdlib/utils/define-read-only-property":104}],51:[function(require,module,exports){
'use strict';

// MODULES //

var isnan = require( '@stdlib/math/base/assert/is-nan' );
var pow = require( '@stdlib/math/base/special/pow' );
var NINF = require( '@stdlib/constants/math/float64-ninf' );


// MAIN //

/**
* Evaluates the natural logarithm of the cumulative distribution function (CDF) for a Fréchet distribution with shape `alpha`, scale `s`, and location `m` at a value `x`.
*
* @param {number} x - input value
* @param {PositiveNumber} alpha - shape parameter
* @param {PositiveNumber} s - scale parameter
* @param {number} m - location parameter
* @returns {number} evaluated logCDF
*
* @example
* var y = logcdf( 10.0, 2.0, 3.0, 2.0 );
* // returns ~-0.141
*
* @example
* var y = logcdf( -2.5, 1.0, 3.0, -3.0 );
* // returns -6.0
*
* @example
* var y = logcdf( 0.0, 2.0, 1.0, -1.0 );
* // returns -1.0
*
* @example
* var y = logcdf( NaN, 2.0, 1.0, -1.0 );
* // returns NaN
*
* @example
* var y = logcdf( 0.0, NaN, 1.0, -1.0 );
* // returns NaN
*
* @example
* var y = logcdf( 0.0, 2.0, NaN, -1.0 );
* // returns NaN
*
* @example
* var y = logcdf( 0.0, 2.0, 1.0, NaN );
* // returns NaN
*
* @example
* var y = logcdf( 0.0, -1.0, 1.0, 0.0 );
* // returns NaN
*
* @example
* var y = logcdf( 0.0, 1.0, -1.0, 0.0 );
* // returns NaN
*/
function logcdf( x, alpha, s, m ) {
	var z;
	if (
		isnan( x ) ||
		isnan( alpha ) ||
		isnan( s ) ||
		isnan( m ) ||
		alpha <= 0.0 ||
		s <= 0.0
	) {
		return NaN;
	}
	if ( x <= m ) {
		return NINF;
	}
	z = ( x - m ) / s;
	return -pow( z, -alpha );
}


// EXPORTS //

module.exports = logcdf;

},{"@stdlib/constants/math/float64-ninf":33,"@stdlib/math/base/assert/is-nan":45,"@stdlib/math/base/special/pow":66}],52:[function(require,module,exports){
module.exports={"expected":[-0.863445533481775,-17.784819097671345,-4.356250819332555,-2.336733159781717e-11,-3.9496050059984816e-8,-98403.49596851399,-7.637235548895143e-14,-1.614025436639619,-1043.615800485142,-3.697725317307972e-5,-0.46080406945214153,-513.2427138162979,-91.52905049072882,-6.864266939413076e-6,-27.563463752037855,-1.0544496969335488,-9110.357677502681,-6.361977688896394,-2.2888714492868014e-6,-48.840728098587874,-432.3605833898073,-1.9885722953097453,-25.336124652710453,-2.282507627452673e-7,-123.99356158740373,-231930.77281017898,-4.814959216265345,-24.04862272511892,-0.013820655601755407,-24076.759742643335,-0.003040187941375472,-3604.3427468445934,-2.895743422882866,-1.4164054650435636,-0.5631899944672537,-2917.0654238030024,-0.00010152200981305882,-13486.200424040007,-3.588375442964338,-1.2232939665124923e-6,-561.9605130511245,-3.613449919708199e-7,-10.97387668099648,-155.61600870867375,-0.49168828187331115,-1.734427255800631e-23,-6.470141226909213e-10,-0.9939998271232894,-1.9688735889235665,-0.5542217785635044,-0.04066886608367162,-175.97766472106076,-6.32360954944779e-18,-1.2002413263103548e-23,-278848.02093399,-35.73763448061685,-0.027434637540410974,-3.8220110516793513,-0.06314286808789556,-0.0006986964184079339,-0.05028112505270272,-0.0004112922479438441,-1571.7514393712877,-72.15442921947668,-6.602081462035055e-6,-2.3760595517804616e-9,-1.3275507763050804e-5,-1.9969285598626123,-1.5104640582483374e-5,-1.2071288757874294,-1.8572497785135064e-9,-4.938483169900367e-22,-10.87356539408782,-0.0004649760887788273,-128.0936816432791,-2254.1948106085256,-7.559281877083273e-5,-1177.7227496139867,-41579.71766817402,-1081.041966574405,-0.6391991102510739,-2.8760469338317414,-0.0825752429320363,-0.7817537696654607,-0.9660356783380972,-0.34065272423536774,-0.9613725316590308,-1.1078247993400997e-28,-3.006660270493958,-1.7818177463969678,-0.0003883100519741318,-0.0069753689692569195,-0.5828058260803267,-0.002428809594506195,-0.12780712409169578,-1.0253206162431968e-11,-0.7290195388198664,-1.1387906940720478,-7.606944481526907,-0.0025902304004454257,-5.161805338474832e-6,-2.539899245350572,-6.64358372436023e-27,-49243.87857790292,-0.0001265671198545888,-1.2416041782236538,-4.7836503269982815,-87.60493922735053,-31.820588692585744,-1.6924911180190638e7,-789.6023911369068,-0.001164115364514574,-0.0017602923733306738,-1.0156340474154155,-6.670563061220994e-19,-0.13632750336090438,-0.01938630790530288,-631.9260506794324,-46.40782555942111,-0.7516050637291173,-1.0846835923868918e-13,-0.9697270495106777,-0.002446834974755695,-0.42690555255086915,-3.155922751758081,-44.58847873707674,-9.673729433065102e7,-1.6303439644535968e-19,-0.036608456809115564,-0.06004406685384386,-0.02587892154899488,-57425.896077776255,-46224.67687028278,-0.08705966881022967,-7.899665128062038e-5,-4.015844215051655,-35762.07529902501,-3.5323109340514156e-7,-0.18713397939893484,-1.3542148420775404,-6340.041266078842,-30.696691800421945,-5102.9322064667795,-17.899590233810773,-97.78893437994432,-20.186983400467145,-0.06080375314446198,-276.6186285555938,-1.241380513610479,-0.2342988446638741,-0.03883952671553664,-0.4813458533676703,-2.572630442253306e-22,-0.7069507483281103,-2.409934640325874e-19,-24.380437625849815,-19.538761133236438,-0.8388777637873442,-0.9193893304000983,-5.826828808002103,-2.379425051541886e-9,-6.273229549441272,-70505.66984921794,-0.270498930266201,-1.0285291142480107e6,-1.2135173381188182,-0.00038130946750725137,-45049.3189742955,-7044.736778231296,-2.2742222403083936e-16,-0.028892145291202525,-4.644471844167185e-9,-13.541099253012323,-13.929832515447357,-2561.180474187505,-2.2120265119057344e6,-1.8277560814258247e-5,-0.4185288815159631,-0.24016475087830594,-0.44897930167953254,-0.9396951854441287,-8.596309587346446e-5,-0.029641196781449625,-34208.712767004494,-1.9921296904905559,-0.002886649501064634,-0.005652579475148597,-0.0073804931178084905,-1.4176544431613611e-34,-2.041693809257582,-0.046856822333500615,-5.617466708625993e-15,-0.0003622190667553544,-0.8769310314188098,-93.78765139083137,-6.656259386898311e-5,-116685.82824295739,-2955.3962844006455,-1.150973170890722e-11,-0.00033800153358946015,-1.9469299060417085e-6,-0.4265562336779117,-52.677900056355924,-104.17508022996154,-9.999846580394099,-1.0744531317632917e8,-8.360058371357839e-20,-0.002255873737110073,-104.34259584842337,-0.8657823354064097,-0.054188532843831794,-1.61379812290951e-23,-46.99452387921248,-0.20682492241774225,-1.1712705158114196,-5.312107392831592,-1.5242364817492065,-0.0019479976224295581,-0.058016689601420285,-1.2458448245354337,-19364.747940692876,-0.37312133918111323,-0.0695553019543481,-0.002026064324841071,-0.008208157726461251,-0.5902368690816554,-1.1020227660575028,-74.44677414151252,-0.9376012718860202,-0.11192592209328309,-0.07223213554887586,-0.5903854558975097,-1.7570483716503123e6,-1.636642161761372e-20,-0.19010114478984177,-0.982253991837891,-27.709672308527633,-2.6312272184309937,-14.51759174628772,-0.0005014935478483217,-149.62139186343586,-0.0029543905405237853,-144.53880801972278,-8.89970475619487e-26,-62.69031415459993,-7.479387773164234e-6,-206.1094352773936,-50.58908946869257,-1.5557957633509523e-7,-3.19350014121355e-5,-0.3330818664489247,-7.880156058642862e-6,-1.123112801189335,-3.78781904540735e7,-2.285957270748718,-0.1346172579511556,-0.9012548621594649,-6.430829397818682,-0.016077459761572287,-141.31360002650965,-3.5068638296257247e-9,-0.029072665493989933,-0.00010022136605532539,-6.113652273314045,-0.5563234054922266,-1496.1918893047973,-17.872849971301786,-0.0005320562120430238,-2.110486525449577e-6,-56.113466899671444,-6.688153501492154,-282481.5944873359,-1.50322301560888e6,-9657.36160048654,-102530.78581912883,-4.185573605632882e-6,-1.2648599395850872,-4.4996520168150385,-1.783681541294327e-8,-6.978610909365334e-13,-0.06139591977288768,-0.06331711581985677,-1.094015621125419,-5.260546015655079e6,-4419.1252351388075,-121.68807132936456,-44.57292405513307,-133.58069119527607,-0.39062693970280427,-1.075141137303911,-4.152688411098528e8,-2.2104945186700267,-5.7294895792069536e-8,-0.29696045987674285,-1.779308107424148e8,-0.045120430239704655,-4.373949859038046e-5,-17479.27854223248,-2.771716744176769,-1.1632153390379076,-3.14742152438642,-1.008230984783852,-3.290547236568223,-184.66861252247242,-0.08471514433679432,-1.1496377460872185,-0.016439676131088862,-1.6842693042644974e-16,-630.6722622664736,-3.164366078748542,-4.508738176370434,-0.3053691099298197,-0.11561494017118402,-3.6034277731197945e-13,-5.4605689383120595,-36.40798334624744,-1764.849991431191,-9.86451544318208,-1.0183904180532573,-12257.290486543738,-0.4962257980040634,-0.051504282029410056,-2.356523094860469e-19,-4.039050864821921e-7,-7333.7244604994585,-69.7940744959922,-0.034796963777972735,-0.0015767468557964332,-0.0001422336795330382,-787.6154352476921,-50.15010291073574,-3.298108236476085e8,-0.014363580886783535,-359445.77599657746,-2.3276116641371557e6,-2.68533270804885,-0.059967344810208774,-6.120912432417456e-42,-0.6334329046107298,-3308.5014614863644,-0.0055330751220699715,-237750.85555293653,-6.737573480958286e-35,-3.734472624290471e8,-1.6856525230959827,-8.362313326835465e-8,-0.0001920826570699362,-0.00040848740483208395,-1.7609218524022892,-218.09988895481501,-1.6229497859957815,-0.6140169228905455,-0.015049341911176827,-1.010547523576577,-22.463429879756454,-1904.4410862336663,-83.35030236071897,-1.9725493354348806,-1.7296963672048908e-18,-2.8893892524719624,-16255.976318839992,-1.6905836763712463,-0.18052219847127676,-2.5284552568711157e-6,-0.9247662430902325,-2.7506784587673776,-3.3928712429004584,-9.127189184293958e-11,-350.592537499134,-9.30669263380673e-22,-432589.64938932133,-5.122896784149941,-4.5670280285790843e-7,-4.030960584057094e10,-0.007027057448629606,-9.49495323336443e-24,-0.000528772566526325,-0.14280924466176706,-74.46877663470111,-0.9518610545063625,-0.003020272213175873,-10.483172623225801,-4.2083814360015115,-8.525474260717534e6,-1.1008072851892847,-1.010600393226493,-0.0005359481683807298,-3.0664647307363286e-19,-0.2718880834437009,-115197.70767011034,-1582.4250633126194,-0.8309181093595017,-1723.099904125173,-225.35265404649078,-3780.315588436533,-4.908488789334539e-7,-1.1212912696296396e-5,-3.9741859616416376e-10,-265952.5648141674,-0.762347705149245,-8.097084992316399,-0.3823328443560037,-70.85020843570035,-1.197354293724197e6,-1.7406825042443708,-1.8910535646831368e-6,-2.002425485439538,-2.949607702494247,-0.0005517463277013619,-3.5091135621594004e7,-0.10015834881632585,-0.6697983613828954,-0.5540350878201492,-34.03044725393023,-0.390025814883647,-4.6772968285615555,-0.015322892379399817,-16.367157203297857,-4.351424928675981e7,-0.031146404189443127,-3.0350485435188983e7,-0.005910924456325437,-0.022455023881443173,-0.005641104634859662,-8.305785480780804,-651.5490077546847,-3.542612007385471,-2.3287013838223403,-0.0008526383114766504,-6.774168441894666e-7,-23.128343761264446,-0.027662397385333277,-0.7636739301240681,-1060.0559201147064,-2533.5130129389945,-0.009714625744263376,-4.009955627599645e-17,-81.95724621332374,-140.8471177453658,-1041.9534759376868,-3315.3729437654665,-421.8820535496909,-0.3852707878802082,-1.3714148246506214e-6,-1.0353968787299852,-0.041877157703684637,-6.320371094820903e-5,-51.208866696894376,-0.013005750035198249,-389888.4881414408,-10.34320258319902,-23.04887043923354,-318.7943997915156,-2.683179366970799e-5,-6.230206422127194e-14,-181.17352220037185,-0.6425688894113332,-0.00329528565621793,-4.99331825684463e-32,-2.621301218245173,-1.0105761069345527,-492.4749324533914,-4.46808029980803,-123042.77043825669,-0.0007773868342829177,-5.6807286436653004e-12,-0.44695081062055475,-2.838013620901428,-0.004766770740688288,-1.0775391578476328,-2.383650080152965,-10.831116325839025,-13.38733834681571,-1.2126393159868416,-197.76455165635133,-4.213948137356863,-12.142539081059521,-0.16288755577014882,-0.5099498715570421,-0.0001712073012488786,-4782.506681231869,-4.8021456604729105e-6,-0.6411885647130401,-0.20570896631462637,-229.05672456614968,-19.455157313008435,-0.001996733576014656,-515.9972669726693,-1005.9395640268864,-0.9872057543995926,-29.972106180354753,-1.6149835229591475e-19,-5.727116851974706e-5,-290.30625735477156,-7.304838899673737e-12,-4078.501016889899,-0.00013957683646345856,-6.677187672013622,-81559.0567450132,-2.0132384897615108,-2.107014172273715e-7,-3.965298852549554e-21,-2.7635316018586874e7,-0.00014190287528461734,-784.0959182881152,-4.6011856461087355,-6.706997900563223,-3.717805038398739e-20,-233667.50553463973,-9.67980156136797e-8,-1.1078971423937185,-0.2475512460612702,-1.5992889464079486e6,-0.8864048958941418,-643.4377405040402,-0.08599705330043758,-101668.85780564343,-90.94476341584293,-0.9212222721163669,-0.3780246734202626,-2653.0197548505994,-0.3351686758241308,-1.4953392274530729e-10,-0.0032981111105590986,-90.35734246463724,-0.006309785639081573,-0.9686578406568835,-14122.478537576773,-2.0476907586281814,-0.3972983683795256,-0.0006520540696850596,-2.8903468821603195,-0.12184383282991437,-0.0028173681386661886,-1.2447805799571923,-0.9036406430541611,-4.4751375214668786e-7,-1.3222123838433828,-0.016960498307969103,-19.638153428016135,-1.311324084449341,-11.980036375217082,-1.1271223366675043e-5,-0.04681697441199946,-0.6567358816610989,-0.029018479375775518,-2.801702781950036e-6,-0.33958075989933095,-1.1076095610632652,-241.8997049317138,-9.612037020183259e-5,-2353.7852964282083,-0.00046709438200824696,-0.6073673697632276,-18.336467155244865,-1.2699259238234741,-0.00015417316340718862,-471.30801690359715,-2.4619565364850513e-7,-0.12297619987087313,-325.54235215343016,-2.4241739968935496,-1.0327481213575536,-0.048949814845695015,-12.842070078673185,-27.870677622134764,-1.5298417558140416,-2528.2436405681538,-1.7400026077630288,-1.0443102860742458e-13,-0.7932498145889154,-0.014475940819439,-2.976035581378135e-12,-15909.814031155347,-686046.6264538654,-0.40705736537428283,-125.22493120739861,-0.010570701825442234,-6444.43024808438,-3.7960647195839746e-19,-2.452780057572718,-0.010405340259181663,-1012.6380681418048,-0.0020500489553050153,-2.2293465167952066e-6,-6897.236286390535,-0.0003597102401217423,-2.2749012110577454e6,-3.427455778954429e8,-0.23793713529791327,-116974.0793237338,-194.58037404501476,-1.3418003186805432e-10,-0.002357320561915024,-0.00022425524054411823,-1.644459140128874e-5,-4.868040414458854e-8,-2.5704672905111465,-4.69351239946419e-8,-4.20657201270453,-510.53664910792213,-0.0004277739306581162,-5.629540883153159e-8,-27.040815554269983,-0.811164124084871,-1.6616013513271174e-6,-5.625271400626779e-9,-0.037344244473669116,-4.818246826945414,-2.0990065310722357,-1.0423656971406114,-0.7062258722373148,-5.396037239359908e-19,-0.8501430322536447,-0.0771223222749386,-1.8723825884663187e-6,-0.8109361178490985,-2.1553943148211885,-1.563630433473405e-6,-1.2213825504998302e-5,-3.752206495349251,-43.24567086861987,-3.6943429696831308e-9,-0.05038964148499714,-1.3027473630638875e-5,-16.680714985640613,-8.359251684861228e-8,-9.927827201563095e-13,-0.1820128263918101,-110.88834966273775,-44.39321518939624,-0.00042306355735648805,-162.63307830050223,-0.8747242535622357,-0.4427852032114195,-2.0917093315112334e-6,-3.811776110351588,-21.319009790562035,-0.23108427782573493,-104.9475135442741,-0.24636277805620102,-0.00020244723900893384,-70983.09112749127,-63702.30052722663,-1.1670236317740879,-239.77046555828352,-6.751628071090099,-1.0173156401549878e-5,-706299.6141985813,-0.13143657191731425,-6.64732728391204e-12,-571.1032014888999,-4561.299543110008,-44472.51073224979,-4.899034506757257,-0.005608153611249972,-0.08657134984095669,-573.8709065131706,-0.15871533067238183,-8.08179136770794,-10.357755569564585,-1.2628377625828633,-0.004491833133591001,-6.615534722650418,-0.00011068165497545008,-0.810673727229386,-7.793498880629466e-37,-0.6641342269733361,-15.318138185994664,-21.61768540236436,-0.1250484663983615,-139.843149083917,-2.4883669506864193e-5,-2.2368185187429685e7,-0.03360302182166825,-1.7681668680021632,-6.267470910196206,-537.119456944133,-1.0244312682239214,-9.433057430583218e-24,-49145.68021505202,-29.293308338836272,-0.09339105277107625,-10.621512290703185,-1.4394479554193809,-0.006524667268458519,-4.453055763533374,-0.006779597037449616,-1.2473444184444333,-1.3342371388309606e-8,-1586.565415258046,-3.9063232904955797e-7,-0.3906929743161514,-0.00219048073871448,-6.446786422231285e-11,-3.0303374955985155e6,-3.7063203071038675,-306.16811403140423,-1.1066795617490248,-10647.268274269309,-1.0542865264057446,-944330.4915400948,-0.23502349048897023,-18.281988020288473,-3.175292623798571e-7,-0.0030951656640018344,-0.006131289683304312,-158.55170156797828,-546.5597092428765,-0.010831545594877564,-441.08888853239773,-2.12692038938382e-11,-12059.152755518993,-0.0708785893708796,-1.0307202086941682e-6,-24.208804832309582,-19.260936487813186,-19.94542836975411,-2.70881799938078e6,-0.004667701554373957,-190.41513845874636,-0.8766068540139561,-139.71050073737837,-1.6656559705759948e-5,-0.2901311325320403,-11107.694916125914,-1.1323979192068225,-213.50017385654635,-1.3400192502140023,-0.17810201473530407,-0.4982434416907562,-1.3849279279013057e-5,-4824.5249928484045,-0.029903971395433028,-129.22592360717772,-2.423722461755982e6,-0.24719197850013633,-68.17597257873973,-155.97426805272957,-87831.35260962736,-1.007463182992469,-37.88118800344298,-6.616163209337223e-13,-1.4236974755303536e-8,-0.019972688965483938,-7.162578654532649e-13,-7581.824163526366,-1.9926625106090887,-3.782816646796388,-2.6935704024598057,-3.5437781806148174e-15,-13.18671982493717,-0.18519256046211513,-0.0147561821941386,-1.4510428801712258,-6.5401759295929035e-6,-4.944030271220737e9,-4.771567665764707e-30,-37.634878733551716,-48.87341576649726,-50.69778426776851,-1.3572427800826605,-42344.0136878995,-2.2643991581471465e6,-1.308310425137933,-5.327911855193449e-7,-67.85536375815913,-0.005645287640796773,-4.0720722314523866e-7,-2.9413386857462687,-0.006651405576978879,-10.7061023650853,-4.963710326072379,-0.009412502343893778,-8.99805299629816e6,-0.8657045414634162,-9.89664416529131e-10,-0.0050217186082564405,-1656.0229532968883,-0.9884971349215413,-1827.9409762426749,-55.225947635970684,-2.1545994521013756e-9,-1.9912626874279578e-9,-4.05862841103974,-0.12937677937873096,-0.0003993987216160843,-0.013166351366565129,-53158.28794812327,-1.6693225683977202,-5.96225625359498e-9,-6.831621550370052,-0.0006943782626158399,-23.429282973873057,-142.50526951043608,-102.49975972304392,-0.15798384656591546,-0.9964296109539907,-0.1132486222115503,-3.5713502890689597,-1.4782376186498434,-4.849911320811246e-6,-1.2024222297129015e-5,-8.337131254302816,-0.0001866934608344536,-9.90721309768834e-11,-6.637800283115354,-1052.3411179450054,-0.2984925407041386,-13.750690809168708,-1.7282094771017949e-22,-1.4778665987752384,-1.2208874619474115,-0.4567329606622256,-0.22941304925793948,-8.055793857381909e-6,-387.99656086458197,-87.16023727291885,-4.4768044326274615e-35,-0.12032016681127168,-1.2460328738052564,-0.0005218238624260062,-35.3884799524671,-0.8763220109567762,-5.305326846969427,-5.953649934795965,-0.00019502490431536355,-1.6669137578295445,-1.4607485384141898,-1.2521172152712573e-13,-0.07964321659686699,-0.010001714423439674,-0.6131745327504156,-9213.835211820839,-1.179455044546106,-0.0024050403978898073,-0.643072186761298,-2.4899155062850085,-107.27491396670764,-2.0796269763181256e6,-208576.59961838395,-0.007048958508062409,-0.36774815715447,-0.4503583805196394,-0.27789697876962194,-3.1386960142623188e-6,-1.2598714220588132,-257.97353307912243,-0.015815416749105967,-0.008711953699929434,-10.906734538631902,-0.41872085780101487,-0.07042562187042906,-8.079719403418392e-10,-6.3841600127790405,-3.9329721877376256e-14,-9.492236846053833,-7.328949291719809e-21,-6.849332317649159,-0.029535528360520036,-0.6552947472300588,-1.9890185098379603e-9,-4.0862609865508474e-21,-8343.796816491047,-1.0005479516535385,-1.2017392891272416e7,-5.382740303061452e-16,-0.003273426517411581,-1.4160923687463593e-16,-4.889432689782368,-155.14919956102443,-0.6187185734486274,-1.0166506449925066,-355.46083020227144,-0.07509714553949856,-13240.322772594463,-6.232678799857466e-6,-0.579802342993907,-2.3460754959337687e9,-3.2703399914843443,-4399.946702729751,-3.670691347456212,-0.002533948597919741,-0.0528703789302607,-640.8804135874796,-1.5751616502119128,-2.239672898970148,-2.272692257656973,-12.061836843243423,-4.0536035372353485,-8.76547535834766,-0.02519258671839424,-244.51040922902772,-0.17344302117898552,-8.78573849721182,-9.649038008498872,-1.4564879062547058,-9.033783942204237e-5,-0.004573055792186305,-15788.224807464654,-0.016680725658199398,-86.87984663044882,-33.34689162926392,-5.275419912950383e-6,-0.4243515167683871,-1.1403149509124206e-9,-2.4233256682332507,-1.4659007130466674e-5,-0.256503215660383,-263.56853378450694,-31.115779669514733,-4.697563774471168e-52,-12.813632265800742,-254.63694511987526,-595427.2951538579,-2.3481761702011055e-6,-0.2700260096001759,-0.01182006138901931,-6.832895097488059e-10,-5.548140846259672,-4.195222213359422e6,-1.2363902537333667e-6,-20.633141226663696,-1.215656191577356,-0.029722517964883143,-7.416867313194484e-11,-0.7300849804664362,-76.16332015291036,-0.500284818339022,-3.6232608768523153,-3.016491934741982e-16,-2.365568170545933e-6,-100.74925643611896,-0.00019367113593496388,-0.09671326482846143,-0.004246470706502996,-96.4412399803575,-265.9186616999352,-0.05033624633589343,-890.663769880279,-0.5270909545757166,-1.0846406753674507,-2.5068937341134574,-6.867303904692886e-18,-0.008166644282183616,-0.005703617706625494,-1945.0715986876025,-0.7811320872518797,-0.16141990957412852,-0.00011728078379716475,-9.676939450611473e-14,-18.74314064216345,-1.0623775852285747e-9,-2.6575408799572497,-5.542035559696432e-12,-5.919196089616084e-20,-0.5778614878179088,-0.7132524329877801,-0.0027929301997019792,-0.03374589868449374,-0.00011442496974178808,-1.1700636093508179,-0.0015883697606776108,-91137.35224684331,-4.2828612495042515,-0.5534775678099098,-0.5564763931152746,-4.96889165625409e-19,-3.4970710096703366,-35.50608574530442,-8.959370543547475,-0.0004981992874898499,-0.3242162922130757,-11.511183693770617,-0.04486390423710539,-4.997278125863849,-0.033525693394329925,-21.63157901245277,-4.830578662963671e-9,-102392.97876175608,-3.593525746725007,-66.78766981641603,-6.955639586815014e-10,-0.8831471722817281,-1333.6611371194087,-0.13451469172839028,-150.38063026867826,-676.3024320883485,-0.0059929268445271765,-445.45804175618287,-0.2262644667221392,-3.5788168576856034e-15,-4.163141241342423,-121.71273650957562,-1.026599628887839e-5,-4.2576969782665685e-5,-1.6842266021255086,-182.55280401544763,-9.176309651262021e8,-0.0005973288969630071],"alpha":[6.6140000679346045,14.706484109688734,2.3365923994738447,19.03801082123488,18.820521666144124,11.656135985211344,12.046829873258025,15.904201335191019,14.077460260126378,4.933848334545741,4.076060549843863,16.913730207197048,14.601525407211158,10.422083631159186,7.338016615307796,12.37909561785687,17.825228239227293,14.2458554156899,16.89153392194021,9.927448330506516,8.218444233905533,1.3458828677583234,8.798933282926447,3.865547857498073,7.441277900397845,18.737590982255288,4.962606208536089,5.406019525273664,11.97573749169262,10.343104563417857,10.594234919730532,17.69732272287095,2.1159571320846515,11.432212610197542,1.1901562558371914,12.595377153769709,5.047229582389696,19.92763007415494,9.499862604848254,9.514314827767706,9.095371712762987,7.940381376974184,5.612173544529866,13.464751025866043,10.638540947116276,10.65080917960782,12.970478183867789,0.15805133417044814,2.8828313749175027,18.41764540445039,1.9518037451843773,7.465833196399512,14.803603606527563,19.09266896947125,19.333261763206295,10.417769665703602,9.199893975340565,5.9310351504108505,9.148048253954052,18.85872161568247,2.733657909918552,4.311417961207034,13.69848833565932,18.439667074400834,14.706241611716804,19.38666629800099,12.274651730294938,1.7547133056775,10.6388181745917,0.363179459775127,17.655710495944735,19.128023751259136,10.922350004421268,16.7017237568559,7.006185127019515,13.531030790443928,17.83785650755986,8.507592663282676,11.450308825099835,5.858487081412362,12.185782378341727,8.7898403159843,10.085418707160784,0.8233421523159823,1.0649013210933367,0.7914738387393117,1.678093074023712,13.648900016681086,9.3016983885007,1.855015691485189,11.081513531229419,7.5581697605528,2.563425104494139,6.256463127248306,19.693691929839694,11.910514817825803,6.033084500983179,1.7265796124292399,13.394710177061846,8.746140222158637,13.307086486376608,14.087326654737971,18.29169839668801,16.752931044667008,17.56052872561076,5.07072218106861,19.878628298420185,14.241535143464382,5.947293970320771,19.46444151198493,18.872979518762378,15.786124056702926,16.410489268365396,0.15783694007110327,16.331551257040143,11.007342024550915,8.220164007081037,16.16321014299138,5.6354062715201225,0.29261130001373203,11.105187501825938,5.926343447459126,5.305869421135263,1.7422158596762882,3.5828185083816244,11.738881587100604,18.242510873399617,15.230340472299986,11.981267042786762,3.8559141246755013,3.185269659422172,15.76891550130675,16.816128826429058,15.367586987885776,15.61749977525615,17.435070710887594,18.73116473016321,10.394164039999891,7.46266918965842,10.314815078872881,15.834544767968953,5.041438204790603,13.40839455866313,15.666408740769437,14.713267310873555,5.470255904574697,11.242350037347123,4.512037541533771,5.714658417535503,2.274601561441596,19.12513790162565,2.472254640734244,16.205364700275524,0.9582783191282385,13.693618081462308,5.059691796048522,5.603904385813858,0.490151557438927,0.5700287039671581,7.485807925519099,5.981997998015918,8.70497679672885,19.495041969296896,0.7275079821246111,12.773494132090653,4.912331123406863,12.135797817801794,13.32245180904187,17.572419721901493,11.507228948950484,15.178320873106843,13.436377696183133,4.188782998592364,18.342345460228394,19.400687657746587,14.30836655964811,5.16306895551641,2.686890316572681,6.342921277577522,1.6397532403472104,0.21344957398762077,4.4191420339559695,13.906154460623554,17.838596659418084,2.3628083566581504,3.266929573788051,3.8847556957799068,15.741934980633303,17.444238389262182,1.5070749283864249,12.726235644339425,15.08032924091195,6.809172868244082,1.3334930369115305,9.073121763555667,9.289874488923111,10.708520251208808,10.485041260358194,19.02192452141529,8.606575436002917,14.119071675783266,1.0851164946393599,14.81835415934533,4.265783168549628,8.246013037720484,14.528647153094028,18.63071017866752,7.250972859462954,11.748005322196358,0.31201458841668916,6.7587014679976765,19.818840144561687,4.4096767651393876,9.414497440959536,0.26512922623023627,14.79418463833396,2.23851623903057,7.591428867337444,6.683372164414854,0.42185524549002373,18.68050307319946,2.3849076152097703,2.833702165768117,4.389164121383118,4.2867522335029795,2.0070594713229006,0.21610568772744365,7.0043018033825355,0.680360331604315,1.7538114546035022,5.968979764507769,4.1267062733801785,16.958225698239453,17.162363579526115,14.86434644532336,1.4785304462265536,18.58557657589508,8.724109616085647,18.056593647521304,12.990463534296847,19.05116562770158,5.083556750612113,16.202118409074235,12.40173761453823,19.717003847399667,16.426801676664844,8.351324662379177,6.651421699567406,7.716788055787158,5.163129136941453,1.4635129645076672,6.278142170667107,1.5996011963404788,17.296106161640008,3.411993385583254,5.26958809357605,1.046002568999409,18.230458869633523,17.989844163886847,13.733601405267937,15.755184800371872,16.142238987662452,15.994157929301576,14.693693963396829,1.9755483378000172,11.276262876301285,6.037291585983446,7.826133259606882,8.203369988963738,16.86040503228123,6.532596700971749,9.538847997538443,12.65019544703383,10.539384841300091,17.332839481704227,13.3347607065752,1.194521907387509,4.671628550893505,12.275098750035408,11.309088252014913,3.60589671864882,13.88155474137385,6.5150473772997275,18.26985450207241,17.28918924849455,8.968054026182259,4.305766886966054,11.24259336770879,8.592891260861165,1.6920469015172834,18.31518422523739,2.529757988310406,19.719814241184174,0.9460697421762987,18.031342785341078,7.5130307127419815,8.13733726863369,17.990056214004415,0.9663634098125806,0.677134820566887,3.0071901862366035,11.060012975876642,1.8550789887511332,11.722908053502096,15.211671964689693,2.3237186990367276,14.658155243735198,14.761055016967939,11.976244043703224,12.39944685181901,3.8342735724544674,13.130311508344912,4.48196774878534,18.001562331227845,9.748013095933942,5.489872406584202,12.720477524648688,16.55278890398828,5.726684247870302,13.529450327192713,0.14128408508883084,16.36507746201294,15.681632053139896,19.49143219602729,13.541680190257082,18.80040760889734,5.62139242786694,2.7158953315588086,14.300716578808249,16.051244148087726,5.502808672328023,16.763984675990823,19.23249485423429,19.5858696330523,19.482701296657446,5.090376539343597,6.44154137283679,19.123300300329905,8.492363995971072,18.826954025548346,6.955787120741075,19.051067576330517,14.950726240880234,18.720576009628044,0.8616419606174519,18.208825570448216,6.181087449322562,10.4964159958109,15.910486252287193,18.087442975794833,1.6786833042201543,4.521150906874176,4.608649386579917,0.5421529605173125,5.585651771589704,17.40858710809964,4.097136218639954,1.9145227154129518,18.798715750947785,2.4892937075132693,13.827079045608368,11.38133199702918,13.638926056714649,7.821171491668526,1.4727131219962342,2.322705667448055,2.4539144886950526,11.145392967016935,7.204144614139354,16.61616356514733,18.058781808595047,9.078351437458947,12.9990958144578,19.132035497472838,17.47106519721099,14.084154698953256,14.04989726019744,4.021657670326908,9.720870050364718,0.06037637867307488,10.45108270142248,13.497144409621779,1.9684129776801917,18.00398721535111,0.52588854001137,3.0113568454423767,11.371686409303162,19.764167843593277,7.1654214889620915,8.914463452316745,10.806403121907495,5.567070307521127,8.522802877507178,18.31367171993302,18.244182455204736,7.967942227474696,16.85817248862563,17.229128508763228,19.442404949867086,0.7357112112985931,8.798163539005124,5.141478680426577,10.901645238524743,19.847870935546283,0.6507383819414381,13.316153213584618,1.6158754633870087,3.850496738823317,18.345706365756413,19.549943181968445,14.485148082924706,4.561615669503922,0.29799992546148957,11.30504756944723,2.3352195037741774,12.385507370344717,19.168875068263524,8.465988421553785,18.098997174793826,16.646461459207842,19.40526409093974,8.846818419327285,12.080129412251107,5.773316620626074,2.0217208594705527,11.288934157468699,4.039069280124381,11.351609623511504,4.518824731354738,16.129613410627623,5.161077409097614,3.469935380566178,0.6939576496047994,9.448860448097012,16.694011762855517,8.114357463060333,17.602931278176648,4.355090968454647,9.3181819127919,8.483949915659439,16.548628610057317,5.427120504761316,3.8494839551245663,16.862949870815722,0.10782559604656683,5.362824619245328,16.54413053642338,3.8189880380901187,11.149410585173172,12.11075169130314,15.635559097354651,5.190928528667937,16.736108554340483,11.756104750822715,9.608629440044547,6.427235961456161,13.895185964385309,5.104502604507974,19.26635171438452,1.6075052044305949,0.7476971967014645,11.170455218206516,16.081020132706524,16.696751865336047,8.453313777631188,11.865144686369389,2.983789042354137,15.618167704231908,2.8564343157152416,0.2361261165533124,2.0824295818801986,15.316068789991931,8.964420848465124,7.198377087832375,19.93039289400464,18.406887479592193,11.35675413396049,2.0481424637323675,0.2884074346359933,14.276542133817824,19.556838305429277,3.8267175826404243,1.7492121405347305,19.02020843714371,18.35473945506825,15.123566925294508,18.488874955932634,6.908515063884586,8.043279225606232,1.0746725632566534,14.506025204730676,15.437340058402032,8.702819412811715,14.12623077099482,19.557619367725543,12.742733111695955,5.732717291421969,11.370617745696748,15.362958104774961,5.871003350069626,18.635785295547027,16.3961901531218,16.369009034521515,19.99207930647468,18.935146950966598,8.448011296249645,4.741016984272326,17.032258836645397,17.516977867924354,19.457651478314475,0.8493886611144674,0.7575816079209741,13.475829850894993,1.1420878589998296,11.013294465607935,4.916276904777348,17.54134886399038,9.56592971557697,12.133901260608916,7.545502799191461,16.578905326144554,4.598420704802626,13.178620747654,14.737869634668073,11.662506053228556,12.506319749217369,3.5798171661508116,9.128656851927918,3.5358451879943598,5.589738807658282,4.146451947596175,6.545269038048094,1.5772155529023202,10.139763693597423,3.828428815527034,5.248077777545963,16.22174985762254,1.8782763166905436,4.032443833355521,9.075631221220423,2.153920827968543,11.334681604465668,9.936252585625049,12.076238285193641,0.5564668927648153,3.556107852992074,18.21986944752421,9.722016050031899,0.1247653968325757,12.201945063151815,19.711455458829505,19.005949947445803,4.300487516121678,1.500227011453683,16.253197371415666,1.4099534621669063,10.805402754011189,17.961860278450917,9.557546318887994,3.8102691406583356,9.05474355008836,1.2525436804394996,0.2809628485003124,10.250597418276403,7.05015040869323,4.155534341888414,5.509055480611624,9.842726602891227,0.5763128388638927,14.465255799882563,1.3944281293772232,5.179829056917855,18.556177676820003,19.901108307513773,16.283386425762536,3.157200116313237,9.333616245443634,15.124419629760894,16.960829469563713,12.848604715055348,11.238239952469309,8.141008268150474,17.20979106594614,7.38614581011928,12.882060346959454,13.243538693609116,4.388819027055582,13.223809443588497,18.825845209928392,3.1388063191445914,13.496690176711077,9.052603537743419,15.828292682280685,7.658799951376256,8.63782383172195,2.892734054845172,10.95792785553928,16.09181397118924,19.99062975681432,1.2866046018945942,7.049800240528219,15.070703491624805,8.320425535582135,12.948134303409486,4.614884002015107,14.101676052895629,16.894922572357963,9.362072421568,3.4426773055701343,1.121872484192985,0.44966569561705416,3.747890993391203,10.762760538338476,13.46203826493062,6.077702656043793,5.1100542091263845,9.202970002941324,3.3269534705172887,12.03394704990798,11.73951256156264,1.8494900592572794,6.60065813292416,12.777822209296833,3.1227981792521975,6.837614265072145,15.925857587970679,16.854834561417242,18.633341733587518,17.797818457737606,4.463139833677681,5.314213265029304,4.255755148087124,16.71492261514625,12.104110174367682,7.684310025957699,12.594722565198438,9.566976260534389,6.283920425981302,2.3517857825614774,8.85563793658385,4.227577077945122,13.903816078405594,13.09072630805014,14.959805462636556,5.79963968730473,19.08611944453783,7.797548847690541,6.573256494713049,11.066166379491182,12.68068200049354,7.014847520773939,18.26083055968789,11.430368712512436,12.056178586541378,1.440443227182997,15.804524215812208,16.540574496840968,15.22478632923403,4.8754819457969445,2.2854324154995487,14.929689973234916,2.1405385078589134,16.29463444447947,3.3568540900047505,7.876345262193092,0.6169521590413396,10.310389427363024,1.7562437769983008,3.212049612417789,10.113996928850906,7.090806333833299,9.985114796550448,10.439802987617806,19.401591770070283,5.341029094998251,17.691507158111502,6.603972612023363,8.670454784533405,0.10159268605518967,19.846027159475415,11.54803093683373,4.557668301633089,19.788661171220433,19.081666114007135,13.147835338906212,11.088482838901946,3.3155367593075535,14.169714171811814,2.910181405734069,8.579974524656908,14.906690221249574,17.1277450975213,1.3157122336862415,16.049351875424662,17.136333755666634,18.564345367118527,5.263889190257411,17.52044974951232,0.4235382306438984,19.755639435294743,3.438511088962306,18.243282838008046,4.366062473549026,13.193948479629341,9.460092142034476,7.431776019399741,7.057654854007094,7.478115299665196,17.05657343575105,5.447561626462307,18.50054073073999,16.58944253408942,15.844238651066863,5.712517608993832,14.226592961071788,16.435537824726545,9.321457761546434,11.341513240833518,19.387062137182973,14.801566864465375,12.582830830410337,12.951377167275485,10.744371357179979,6.1181474588645335,3.3471754090661587,12.967407676822663,4.3146871169033885,11.48321026387968,2.78521090858761,3.510791086301146,1.1141959987330186,7.5094110261074665,17.20345801550686,1.2626679622074732,15.090287084598062,19.64923963535542,18.339729913330626,9.606114563835426,11.50957935001304,10.943773259137593,16.409170257995605,6.923603009592489,19.74449360356143,18.46380234257122,7.598978998087267,17.757712646859908,15.285346918761107,0.7502663075601124,2.685157769265456,2.4898109543250513,19.084313992738174,4.6361537304920075,4.512325414774434,10.155904344965649,1.0038849055714527,18.8803051965157,18.873203766393118,18.680093341275725,12.178396976072445,19.77750335356315,5.592808496944035,0.7460069351127352,19.879703207783166,17.29558158585359,0.44968523133882776,7.779919268813602,15.332042658960345,1.005273309417678,11.055042329187025,2.585612816998495,19.555767150523046,14.90849250969192,14.24604547752438,7.295625430496679,14.30010143279555,0.23156272191902527,15.84498193186941,1.3578443660643336,12.520337802836877,13.493575665815056,15.015371723785647,14.293229078883432,10.477903766165074,13.8186227706978,12.558880452177569,19.85732990325536,8.40845601672276,7.709557836048457,12.107192528085555,1.874993281602908,17.226041757790952,12.625713088879253,3.1626977554982583,11.832821993850558,14.786051112698711,5.067946136727097,15.851864189623956,2.07648822044296,2.6499259219648863,9.428292643264893,0.6420914854630189,7.874295265775171,14.678712705498986,6.554641990008103,13.829722899056268,11.671615320092696,4.633175863577241,15.035810349177186,4.276477898649711,12.399425667901323,15.106028637702078,3.475669949841773,2.1157839264907707,1.7603099855477788,6.677059964195808,6.4940754974016635,12.756021127873094,13.833499212493056,14.12734926760705,3.035509549176494,1.34349377445111,16.168839244626618,3.604043816178737,1.7595101436887983,3.5742464163929144,19.257522300339215,5.357268842548004,1.422063001071212,15.359555852426038,18.343904217993483,4.900485624324089,2.868358027050295,1.1630975423090817,18.877573325063683,17.889885669852195,13.634114281027024,3.3328159923148615,3.1002888673386853,8.17126549422615,15.570146494928583,17.003989503336857,3.557147096449249,0.41884397160590225,6.290373076514841,9.259709961306267,17.329476087799275,12.18881520023784,9.6780809649376,3.4414223134120414,19.60158889720089,4.782287002368855,6.70402077491584,16.15667022888008,12.079288798508138,15.955450407046182,15.772602670102337,5.430552573274854,15.553178581846673,4.550913807329926,17.83796436350506,13.219782015153672,13.63292193652848,11.165314711837313,10.4633566580886,0.9539858645483701,17.084191467216,19.18272956081079,1.92890030677912,14.791704015079826,14.765550884831073,12.403557887768484,8.011136323369188,0.056299760006770505,5.449178204213618,18.256334639997732,15.674543684486153,8.592804676579275,0.3713038776372146,19.29231502550095,3.6551317456497223,9.521563154229904,19.695380148809733,6.356829129684507,9.656025918953688,18.503980654134725,0.5417062736189804,16.841569777805667,0.7771413510930048,13.708334058880789,5.924913975654622,8.071118707578258,12.457851079238802,18.58253669994827,6.308678842949895,5.581686892437849,9.503087978200693,1.7782396736020534,7.557650785063288,10.083611239845357,18.905951098658647,3.689817716359909,12.85627801851351,19.38532141254488,18.720883280454625,1.3806354552152467,16.847236101296428,10.217371143482946,5.551841681765102,4.409776334240547,11.662289929371475,6.302577558160789,12.093630226374504,3.717524191241135,6.060775517660266,14.631838310829274,17.490797117644853,14.773953309159644,6.773464635331163,9.911731228597173,7.172918340714358,16.976330287707988,10.843900774327434,3.2512612258414864,1.029389656397992,5.777018130805738,16.62373047065616,3.1415947714330628,5.426872184252964,19.376718780843536,6.419794206211371,12.281700947368197,9.246054679849802,6.840579942351099,12.344795183439237,1.7160045186105943,2.5931869973367183,12.869618243711095,12.148518368080019,13.778218560965826,15.876642421371216,5.126075825517162,13.67511152923576,2.6787103567898596,17.57692353296659,6.509891120760276,10.81244688413259,15.785934844118593,5.149774843821406,2.5667326595189754,14.18356583314691,19.183344311038176,15.768277571207129,12.0523180052049,2.568986729708005,15.318605689030305,19.238609316549777,5.415109039594093,1.5442234446774838,11.384602243276882,13.60656495874271,16.55313455699682,0.46387221914096166,5.18563936249234,18.390780400646086,2.139312550750536,9.381054742621377,1.5606123251497106,19.889789030691738,10.078586628783412,18.22509668761444,5.212189350860106,10.874662667648632,11.883462922127258,3.3679847843117017,16.04386201555045,10.823676240692318,1.3007659212502976,15.636904348365249,13.828150969961053,15.958153695838813,3.8331592806219117,18.092498918560466,5.738781103531148,5.018008230346935,14.562167531484729,16.056248215086416,15.16032807079422,11.77706301745916,16.688861294186754,14.312625591816012,2.1160084592465322,17.735300487573014,5.357548086424533,18.03717734473846,17.572128659684047,14.010351725658335,18.801455676403872,17.369870062792153,19.31751209294908,16.61686350376739],"x":[5.2719711761224985,6.331022627963716,8.472037431767191,12.048025044255224,9.33768009955175,6.183278647059314,14.551253190461459,8.896534675410066,5.784108680675155,10.639611966386047,8.522330931135402,12.190848968549961,11.208816241154949,12.409360792986293,12.279664765776728,12.209600425124933,5.817378199701915,10.660428743799724,11.880568446921947,11.407956515289863,5.186965077002357,5.907669857243056,12.839237721486194,6.385377914149841,8.338472674643016,9.362769365436808,12.042980810487672,11.101001155109088,14.730624224976491,5.719748430648915,10.094392256210085,8.557021248359554,10.679596208720882,14.08777801578667,11.176571943682262,6.360851313964964,14.716501047807169,6.877379870993401,8.916993884532761,6.490794772107165,8.056253529870862,12.679607743866285,6.033463128306296,12.23685208222664,13.16424033829124,7.601400022062563,11.78252000005197,6.946364476728231,13.30518689877507,8.05989412695078,10.392525485720029,9.82546889367369,7.0687388314701805,8.685303071692053,9.102724493788978,9.419032765911213,6.262966239102186,11.948458911732697,12.702992796869601,12.521956477292557,13.41271896774745,10.936429377962217,7.38972042092368,13.847778515566713,14.3350596929806,8.616158055833367,12.492608660734028,7.987462183506229,13.13324230264136,10.661763224526712,10.452750059392468,9.565670740456532,7.481943072515074,12.459713891364569,5.480709920140303,9.893227203558867,11.732486757680583,8.611456061507472,5.3434637244728105,5.822348640156985,9.918170943779963,8.004965754112456,11.0852588971194,10.807345204687888,9.559297886652708,6.532674421839209,10.755405284956204,9.529991964159336,14.367506596495447,8.655170057346243,8.456177312294216,6.565441095147304,5.034821561156971,5.749842684071098,10.485337571736661,12.087216024394722,12.490068286335072,7.459325546477427,8.574309372361398,13.477859805956545,11.66381833025918,14.211482365087404,13.436701462910953,7.234563648209988,11.895481882664898,5.173369930391425,14.991513866859172,9.470213064295256,5.067983967223935,5.694890187247577,9.33334026465333,7.240032712092585,13.353890754116104,10.451927468369906,13.711835126835998,9.605488821749244,11.054649715468104,5.000921992598002,8.583916631091986,8.90667108040816,13.673001980029992,12.53546096650785,12.142870011272128,6.236023091964937,8.223053409127896,12.78595305140679,6.471967581324822,8.849358885617509,13.748188035240705,13.290751045024994,11.06664136811341,9.851648392262888,10.542297621406993,13.371751268251764,12.263434990109756,7.903624514734526,7.0498307231834545,9.995069674671317,5.517208834336951,13.725344528568717,7.514263321286294,9.835640567421882,8.957224437186255,12.350024962285032,12.891827027194683,10.496182459108978,11.228049482932876,5.737100557914374,8.423806708580052,7.896885333547021,6.9910687100213025,8.994541705371354,10.975439792391699,13.5161693915302,14.581481483040765,5.7823044674947806,9.20913651985976,8.409291680097494,10.042585086379827,10.383976970660548,13.403166065318599,14.8933070875335,8.904840909019033,11.663107147354978,5.015813874100314,13.815141598020082,11.131835890416573,8.339044683516647,10.398549322889272,13.933100930108806,11.617357574113253,10.892205614228391,7.594303885806473,8.65350374282669,11.01128256025265,5.958743505838553,11.149374779958407,10.933215581370256,14.480551141758216,9.98402201293211,11.742224650420637,10.286838742800237,8.844403729192468,8.990617688424864,13.331296406268272,9.603523146105664,5.54277714137238,7.787979086494678,8.490866657044974,10.61219188150638,10.623066502629504,13.245667649323117,10.579161158672585,13.82344097825882,6.714351464656552,11.393569332367354,5.078984217346578,8.264502529288348,6.685498916494268,11.697315742733018,7.5658629139846445,7.609821318893484,6.6217815466500785,5.666746229017445,12.683747877783416,5.037233903192426,14.819157101953728,8.002441065880124,11.788999309222834,12.661916374374904,6.10182140027558,11.591994714623159,6.621121623645953,7.977738689186642,7.609878968785024,10.81773193120899,14.092574680890564,14.710352530348487,6.444426906098877,5.207258729503026,7.147843924203679,12.986826668115782,9.716233129590568,11.991661517313002,14.66251950303954,12.593213913971786,6.507765490843422,7.104523979880066,11.97136856886071,9.752173863341717,14.393186833362659,9.738011441976566,5.327165036450987,12.563625078409453,6.856003950237102,14.998773742520745,11.481762031232869,12.945622517757265,11.611200839825468,13.780833954437611,8.12415787152858,9.905053249538954,11.711347737875624,11.491394696316856,14.847168439633613,14.946222866432757,9.721569057131552,7.362096681355688,14.667451413817886,7.859200859796203,13.496828076862794,13.120447509644462,11.846160093727496,6.7066371137577026,5.694181168020194,12.18483760175875,8.401145235148919,14.431189863570816,5.774624302456772,10.904082634737613,13.62274095181199,11.312992142361246,13.665814555039296,11.826045496316567,9.089547398918397,8.097826969079044,5.98055562948375,8.79263588634101,7.509333196771191,5.61101466499248,12.607754389084928,5.042841855235651,5.313315211688665,7.855040803058049,9.300810731150452,8.708009295447711,11.614024106178586,5.019124752649624,12.623186526873944,14.768017043776291,6.8104763124413825,9.676868304532693,11.793016393373154,6.671099976084934,5.529540026269935,5.83298403415065,7.798427073446255,10.384528035874737,13.176439040358893,12.878511718278693,6.767644241012669,10.035829870485296,11.651206095438155,10.175624186769301,6.532256697597656,14.516878098378065,5.771985746230143,8.10928407778469,6.21656521271571,9.777859145997411,12.074844027861445,9.497335806653336,9.886974058396856,11.816792180807118,14.555016159155521,12.843218198839224,13.177331459913702,12.6961286081349,9.871061516252446,11.812987035384396,10.436992772476401,9.350413044565535,7.504798068722607,10.216489636802928,11.126727282628735,9.990342605331033,9.837277826121355,13.328271412126151,9.587342556545506,6.0515397285041335,10.089614507017703,13.51464308666474,9.181357794365967,7.527119089448258,8.889507731260016,13.21052924521484,13.768223031823464,8.114747636751254,14.298129929027162,10.57806812855745,8.950766853510224,5.06216512329175,13.183375807205014,8.760865101197826,8.760517632048522,12.853556405800521,6.940899658035347,14.630733642536573,14.539736534112704,6.641742343951114,10.114665529182837,9.610951088571152,8.845908267429731,6.792923258724919,6.593633610281355,8.053314785633738,14.891208154763529,5.821868689724814,13.833311944647061,12.825429862599185,11.044729590894613,12.664473733715461,6.919392243622959,14.924881862059785,9.43168264678273,10.207025918107878,6.12474245378878,11.1131686605101,9.783790389889953,8.270584838074415,6.7992044306181,6.498206822461878,12.296763797906902,6.25163939161975,11.581225623666471,9.418957353550548,9.443057308854684,6.122769762604124,5.839119861825866,12.172610351053974,5.142715590603473,8.646480714112748,7.673159261095837,5.497986727971293,8.24041282541664,12.08897926493533,12.357314461042922,13.761037858465153,12.35265270693867,13.313507284112216,9.247594352906845,11.38893246681067,9.286599482460439,7.426748988223606,12.234146866310216,9.145014839208162,13.758024560856832,9.905198111207598,11.594485075032319,5.336166329272405,5.118403581486692,13.016085951177194,5.254203916078184,13.905071129459778,9.035400964416262,9.18001693178301,7.120083841768087,11.278450370835147,5.236994559247288,10.635396111061581,14.20396359101144,9.476677208414246,10.851296080685543,5.175471876073785,5.117293826209965,9.126881294740024,10.843948840410935,14.956805156641984,10.93619097259436,7.782580111939934,9.367000213723228,10.054374130779243,9.935874315614841,11.076721749661811,12.431172143978975,12.39407043401378,13.938273982762247,7.581080767153208,7.070941643744377,13.802843387309371,7.503180412441772,13.100677355503905,9.419155952352918,10.46888395280904,6.222442515751974,10.934099296960609,7.46684386114323,13.967777621987608,11.008549934186401,6.257892452794513,10.303784240005015,12.702856340672756,9.801481724123448,7.104852297097191,5.7272640712891825,5.974945870304622,13.650158490181143,6.758189332278537,11.01838137129735,6.531938632015271,8.66797257142352,6.447942366493955,11.794954583901456,11.668006503522117,10.464100618596202,11.03407372371342,14.387429700771445,5.872567234564794,12.560912029411979,6.498672730296214,14.460540430697753,10.781021989351585,12.155933438505572,9.2570115550289,14.224383113868358,6.324397006989948,13.336070686658296,5.002241875053497,10.333658165198292,7.973502103880792,10.301023600344934,8.414200220695193,12.677307933576209,7.551775632050022,9.107402444812267,8.967904129545,12.578569807212922,14.856900115274637,13.217566398405447,12.976091705576264,9.269456344470084,13.05372600275873,8.400269459515389,8.267903354934798,8.22472439236211,11.983686308497266,12.887735626462833,7.930028815417806,8.514175870347454,8.332155461330276,7.740609352522783,14.896477781228922,12.027920867024749,5.203240369905697,13.366693247329032,6.845427364392469,14.171759294671684,6.240229727241786,5.745116857800953,12.810876417648132,8.507599639465377,11.774615545749377,13.206570383253455,11.794224590036748,14.461336221644771,8.33634494599012,8.093928455142887,11.963939477881471,8.269488079859673,9.916606083395443,11.037895377156573,13.515087573619644,6.775072635333689,6.971065227098339,7.323460715571866,12.900212567698109,11.631562909752251,8.251009952775139,5.854666096990395,5.674409219043528,9.397203298031684,7.3116661939371035,6.122415253969294,13.538994470277657,9.772239122835213,10.827892617622187,10.097030601152294,10.977472605943783,14.088842224114979,7.780519465503102,6.092466923236648,13.443517326675792,10.444642070469055,11.50779508261122,12.46452445975378,7.8839903743286825,11.880505230678903,5.823656122975049,5.791363004674654,10.022736551363245,13.919807736177582,12.348937046330102,9.06551251787455,8.227796442698052,14.103070274575852,13.631686647822113,14.349680977115318,10.872655940148558,12.124292200044627,13.633706499483186,14.255926301214693,13.37204481330141,8.522038979391924,11.338217747762027,11.272338808368662,11.933428188178357,11.812591019674796,14.824326369089478,6.683109969859324,10.244382915251226,7.42648216704379,12.17368210350694,13.9695331324717,5.005229807831421,5.513990041580583,8.028150976414857,14.29959913313461,10.524441876796747,10.911626198920663,10.894377996835383,8.072200243947027,7.7089375747743,5.619864533401994,9.41531525506007,6.3354355668458755,7.101761327449605,11.652264933395273,5.33103349348697,5.759204240454931,14.868237350115853,7.785285316532285,13.413535846208921,14.725470426154972,8.518540904538952,8.471261440500466,8.066061497025455,6.7702708558547915,10.282101581665245,11.28959212805125,14.983030379009115,13.882019077107932,11.74424254906002,7.476951934929721,9.477565565076116,14.274801819631017,9.778963311894772,13.32514370345118,5.769603962218548,5.13394659041841,13.472320809806394,7.973422850729737,8.98911977220999,13.438149667311304,12.21024027540336,5.098186459746534,12.697398579757193,8.876090297912338,12.156979255595887,10.761334563330555,5.936902187928803,7.7819440718105515,11.268136090918029,5.870071915408279,12.532108072481405,12.656482686575231,10.74106152809107,14.200067750774592,12.197152173170817,9.87846916719289,7.873474927600073,11.679825753416432,10.026548932199432,11.584061757601097,10.523605353661535,5.872609234979825,7.17746699641218,12.550005477816333,13.429203732621211,14.055243833730092,5.843443590992782,8.756645238466398,8.55869260684994,14.16176761668542,9.114567831966326,14.313740553765317,14.02133661432774,11.786090279142584,13.255636557085298,13.286322155349577,6.703802921113611,5.682188760071119,6.818543370398801,14.699737404526687,13.477767312610776,5.417409481995015,14.744441152423835,11.788599915123473,6.57408523229245,13.414534658474487,8.656423758130954,11.195781262018926,14.337432372238455,5.569170380922066,8.41084719477611,11.993534746544189,14.307186378669357,13.832379291691478,12.343207749525678,5.480933352438613,9.17068166031773,10.331188478067993,6.1993326337191235,6.308143280242293,5.866587419083684,6.211531228556919,14.472441423879808,6.685006346215232,12.660745652219337,12.595203691127587,6.725264468075098,11.016128499703388,10.81806270179607,5.130194942321252,10.095342724657781,14.300166795810664,14.4707718794388,9.123036305544463,5.227721139818023,7.674249957934062,14.257188953437907,6.141582407757653,8.887785857687163,5.160523542284022,6.8482660827612785,7.441190198125893,11.298018535842358,9.402122056200898,9.220451529004738,12.082340553067352,14.932886220984866,6.872317850609697,9.290098724856579,13.388542313085042,7.6765896782360095,5.370537146703325,10.500096280880374,9.235595852326064,12.757908962734284,9.462602785195768,12.385046591750337,9.038919409854183,14.004359529881699,13.494675944570886,14.325099339341394,12.396799164707737,8.483366163682984,13.875143066309167,13.992181783337596,11.258850605197146,7.42167371817501,13.230426199835687,6.5293939487767165,9.9367113982058,8.117626242780261,6.933548098578239,7.922235700727731,11.41244507973523,9.82837112519274,10.374119441061255,12.217711113934886,11.367627351187464,7.077453654906963,8.132127380329742,11.953631358967339,11.027054720356318,11.427302080102953,7.020459177261298,13.055084410785325,6.414495368784252,14.086766775862978,9.08123448447341,11.813060266305813,11.416043483662081,12.856620138879178,9.094071871942926,7.910241782021421,11.199503372943255,12.14646100019511,14.556583390953957,10.506644715294744,10.617319723986267,10.981942588424232,8.63396044009548,13.778253132713596,11.949230508186076,8.814583525307302,5.839931007162534,6.82338542411059,12.458961116974196,6.398195128392126,8.437396208855045,11.268175802630076,5.3658136618907015,8.455494901716122,14.270399398206804,14.052562279885436,5.410074711735751,6.581184781919125,10.713108443824746,6.809354921775861,7.905980606112566,6.878985466825849,14.898869572782441,7.247422020820327,12.67950769429045,8.678181065112556,5.802472240937808,6.5143178370660815,10.408382378884923,12.853351427953974,5.482010026430277,12.273321039741251,10.143668302517291,5.119808229801286,7.20873431441492,9.746097698387853,11.685883718132263,6.387675219256506,9.91558043852223,11.096681199579654,11.66454689251858,5.8260156341224985,11.347791945913759,13.05126998159096,5.558657262371183,7.064195707600169,6.8449251873031836,5.288473725713267,6.369323960071609,14.070231596835201,11.050718147071088,7.648583832594966,8.02537146191366,14.28521377697858,5.340714887546836,14.348080774731386,9.742895630478642,12.818360975424293,8.092268650968137,13.482313617776073,11.24548184816921,11.293682027264303,10.847338983664054,12.10426665604588,12.3342437804949,7.5469733878982055,10.771327902992581,14.83583787079632,7.674831735655179,12.323118324225783,5.482718189571871,10.413256532736296,12.1884945114248,14.198103615668725,12.126954338333096,11.70522735416645,10.440600240750605,12.122055993151946,10.50619849561635,10.15375215390124,13.930250761800973,13.7815989452986,9.906817285693199,14.974897633238225,12.61568860987088,9.802429725062286,11.710392084961816,11.464311522155612,8.676216883880725,13.050732880042322,11.724519146338526,14.714225589714392,5.554528289836702,13.555380058708879,10.241231861472965,9.386125057854684,7.385993147723462,8.532586864673961,12.017099323355932,14.05845739384816,13.703943094271384,10.756103882543291,12.88908271762182,6.472815545893296,10.744794787204556,5.697690994632025,8.89836424634481,11.034825719881871,7.031485070392334,7.047609035848068,6.36080551879666,13.893983808529377,6.351588124787233,13.512544906671112,11.489821786852923,5.175746552691285,11.48729868076739,9.053784090459976,11.517706823442488,13.728812616343916,5.406255810797362,8.442945020082727,10.204971799891842,13.808249415634496,13.331600672429467,6.704487547434024,11.871677183004874,11.309676279782185,9.921345759320417,12.015316766207418,8.185452079525064,13.123468189865061,14.913685114365249,7.782675327329791,6.539847136545312,6.6075274844521985,7.178957185732735,10.676970864971011,5.497402092548647,14.329317711252969,9.070493511414885,11.160711715489338,9.726755256537505,5.132901521822659,12.595196385721755,9.446121104701742,11.7184214542118,8.668198059455005,6.275010367389616,12.090736684311294,8.21089115008397,9.208307503330612,13.747932126256298,9.972890639158019,9.356325687463173,8.382905458200865,8.60739029356976,5.952307533834132,13.25629296055051,5.908213617182001,11.69195844710218,9.276333873968785,14.247557763839549,12.467874575551294,9.226846549807572,5.19662684868366,8.736627471949141,5.4078010690117555,12.73204255067908,9.247400768492467,12.011891929852865,13.845585059358159,11.895246431150184,13.928725982052772,7.666925563394191,8.694298680076702,12.475019187450492,14.743769961446224,6.982762995072211,11.015525439766519,8.524036242914113,11.10661154137074,7.8377795915454485,6.410941012955993,7.586630125952039,13.66973241136006,11.620409095780415,11.822882679829519,14.970177719975435,11.460506804747544,6.968478611645914,7.914982672112673,5.885534054015822,14.098471882184032,14.718569215948587,9.422484744792111,13.407780864386694,5.01296552392787,12.579997026304685,11.967523821873819,7.75551482830608,14.017416716503128,9.116520752161016,12.38998742797428,9.819385179738862,10.95083328918385,11.14349285127594,7.091034048123195,12.188698715278468,9.06850376156999,12.791819192228393,7.94762796168845,12.829886925460901,9.379010671398152,10.53615923530902,9.498185957770868,9.836873634368663,9.88832907277855,8.382414430875274,13.118105660532928,5.689847448207135,12.92358103206477,5.866541256689666,13.3905766331176,5.564773671998367,10.051545196171013,11.836321923738355,14.256347960538644,6.145178085172214,5.548305661469451,6.532673095081536,12.746965204687907,13.19569037250295,8.404233890908358,8.835472387739564,12.912711452234271,13.921112131133297,10.127654781042477,6.793693223527166,14.216608844902186,12.024268019664067,11.828644734081058,8.574205272861112,6.423096267578428,8.359981423305047,6.825435381503667,8.540855553654021,14.176278137056176,13.18126105825403,7.823730477246835,13.446255716438273,7.957021721217512,7.836379020661266,14.096936849985811,8.917729217233695,14.274409348457791,6.941046283204861,9.987701346646624,13.253288651908948,12.925003170338513,12.385020460706798,12.552123192827644,7.326229968103217,6.428775403222424,9.189829617643166,11.09400168674999,14.517618918956412,14.653812231961938,5.429410505840191,8.386576101285922],"s":[5.1562279187052384,7.69969904374129,15.90418221451834,3.3303214205562703,3.774574915326383,16.57974317070564,1.1859351211437597,9.168399857973553,9.476764996354232,1.344707845856301,7.04704740841708,17.631038439503207,15.272110820157545,3.9657021130102432,19.296134232733948,12.262005646971176,9.70193319090717,12.13901670310233,5.5070590263524855,16.87797207293739,10.85516846557702,9.845425016047567,18.53849648158239,0.12219050412409338,15.937090586437446,18.10282184149322,16.530317652949478,19.991013467626754,10.302705082962763,15.17057226009953,5.841020538698918,13.59263442427351,17.651529916212205,14.523363281420995,6.899259114243539,11.984278767618445,2.3800733989600564,11.083257074367712,10.200691568740696,1.551919128329322,16.16040937137031,1.9579426021193669,9.24575262922497,17.80201554846729,12.314458270714512,0.055448207840882446,2.305560622627576,6.686834753726694,16.829825532855338,7.805710560537795,2.0145648591741194,19.638928090841517,0.48699877223012056,0.5473761912497199,17.411227260292,13.276713953889573,4.236703097383097,14.979213559582544,9.39217078451592,8.518004463719233,4.4923904793544045,1.7928914393127426,12.646386350535327,17.46446995958548,6.370102358640493,3.0936022386763984,5.004197252249782,11.846321574678406,4.6262648962159725,17.90335329694951,3.347410663524646,0.735920789461062,9.308931575627085,7.869979714180055,10.95585841822035,17.504033345193175,6.891843956799977,19.77212420432233,13.527195068790277,19.184588038521674,9.560520548561907,9.027253635542905,8.656617002036814,8.013936588213681,9.254091003669739,1.6756492915254828,10.505862235714076,0.08529103506619062,16.172566261030575,11.817095109951996,4.162749354365762,3.403708826217602,4.078629265950342,2.1966004756311674,9.445291274200702,1.444389623241129,11.852595420544088,8.042493758530483,9.976703803235498,6.821376262620706,4.672171055592194,15.183629519747148,0.49793613322032915,13.788078972527424,7.135513308794192,5.398933868931088,16.21963139825442,12.96458353361405,9.067888000691164,13.392332240652337,13.291029336997866,4.719335445147754,9.073253081952926,11.531379656455938,1.057225858176949,8.01489281086166,6.8425064230896515,7.452881488650762,16.959820922553547,3.356679151876283,0.9298625545445249,12.470606408067102,3.909761778379144,3.825823577583476,11.33298214567712,17.669547220069152,17.733022258760176,0.5168206531812736,10.431740124965243,6.408489367471586,3.5137265911756366,19.73840319228424,19.96825044444256,11.407751072157204,6.697812706633552,8.559656173379548,12.338776548921174,2.393638465619774,4.407452609702536,14.134813818046164,13.061713996392857,19.398865341761855,16.931802405944794,14.846970984611811,17.602981801072634,18.180562173507653,8.752571897345396,19.94734427276022,8.74864275849751,4.172373657777344,5.899030582394955,6.691699953642676,0.5107052939678791,9.412076850959362,0.6370750256703905,10.870174757332718,15.65220867928856,5.8761191148591285,8.665880749437886,13.140589186676905,0.48487245843903626,18.390959595072705,15.787605668089792,1.9332783095028683,14.825880730679843,14.370256706462126,5.819171788239212,18.639231248934415,17.216488568063205,0.6090135018366238,9.19810226434777,2.611734718983527,14.146562068347382,9.989836427142018,16.501539855217406,16.541956797385314,1.3476074929484705,7.906106238630759,11.564280606992178,6.126557253540539,8.773965298022194,1.2367002371735536,6.867230971676013,16.14229095499004,17.846421014029787,1.6034770927147957,1.4625770290190587,5.70158718628377,0.0974032084777221,17.04101031825457,8.352223589667197,1.5035012821444749,3.304450852009917,12.5269505887521,11.075552087382569,4.046273714227948,15.099173472591225,17.710185628373374,1.778541478405793,4.62147349454062,2.981226204816765,3.4703669401116377,8.652806927378883,16.840117271936073,16.769399850253485,17.98767374536087,1.4022535124069258,3.4531181260305166,17.5101585416636,7.978031483056842,3.963982258138805,0.8206041737919767,15.852888125665295,6.748134333094282,13.814503636208947,12.110442019426518,17.012350097543816,6.465279734254237,4.209018456744844,8.768083505864052,12.124568815645432,8.5897061506933,3.7928160609150474,2.9190658724586216,4.782449979124106,9.683947682605876,10.201477252587896,13.145505988198405,10.889698900795356,2.7977850183695807,9.267377626778313,8.570594624942988,12.437733964561204,0.8835695954408562,6.131471359556895,14.81823043060627,13.728704598563413,14.463837675974883,13.465563179770697,7.678270728765426,10.566818935247415,3.149675504755267,15.919221221930297,0.1097600129147791,18.314430126521746,7.285716914448828,18.400510691289185,13.279933402475077,1.9236062156464007,1.058376835507433,6.367908473075485,2.0186195550818953,12.737965416943924,18.39334036433342,7.255516393129926,8.328193386719516,7.606272636735367,15.982260876659403,4.590002149646204,15.636979658309627,3.9592289411433734,9.086392360506448,7.684298894202772,13.376803494301996,6.755070149974318,15.48575133623341,9.641650742321296,3.3556116333143438,1.5266421460636614,7.124912683638578,16.86453483037138,18.798663342430714,16.355366601514856,18.760334520065868,18.09742521817857,3.440279162061013,14.1386538277767,6.925421970816492,2.9506441266022865,1.2428366313900296,3.14123234045276,7.932293245271942,11.95679146872013,15.562268087308464,8.985326118984673,9.963463891697156,18.836416491364886,16.049674952977906,11.811070827382277,13.44193468903963,19.998344270094435,13.731821563923855,5.001864526068336,2.8196884207734874,18.733279472363332,9.610976402588305,1.6812443044509529,13.957529122520738,17.85296164559275,12.223943961613472,17.6794858180264,9.504377509144103,18.788939368711567,18.442928258553838,12.374792659023267,13.637537945224851,9.956648946208716,1.0841175847853757,16.910001307336515,12.963051023062576,15.458117010358126,8.542701927099138,4.63748123429601,2.0800229642606993,13.24332383189686,19.229055857478077,17.705560466494482,15.3048369892201,9.61789983225557,12.135305287320985,0.07078020073598701,11.274332217426167,0.5957138196342004,3.5367270881116752,17.15207950782019,16.55745355167455,7.575825436183026,0.7541945757019608,7.696121427600806,16.026846855114492,18.232355908148293,16.310421939236548,10.57335689195578,16.83457565027244,18.592076897469198,15.6062876702131,4.4843179187542015,0.10236155009106795,13.77863581230204,10.2147661024607,4.791469237965886,18.406096129526397,0.0458283934702397,19.496688342287744,12.086654702801889,3.2906371660878797,3.7295670088201582,2.7682627952943584,14.334129883197978,17.273053339546433,14.737875118172177,11.369367914963098,2.7836822907400682,15.216536198636215,16.46433236378232,15.75065531892141,18.027240614281055,15.846664587104833,1.1108457535625327,12.666347568547426,13.709018839177745,6.805022358358923,10.846259375013405,1.2032440407198353,10.982206056376569,14.56115768850523,15.535501787987265,0.7694094790639738,13.170093706139223,0.6602009014883325,10.550879149127002,10.351279899167555,2.495857588810577,19.70293539579334,6.204455577108705,0.28038238837832186,7.222758578494619,8.481608738464876,19.24566554570781,5.88045966165927,5.307742407945839,13.554736059577582,19.271780257011827,18.01994217343388,14.685527028399816,9.177093262349931,7.094513945251175,1.1459078831484115,9.667528246756651,19.724600303925875,10.120282239168619,12.590148051130017,12.595941908497785,18.691706929166866,14.191845438023925,1.482651296685158,3.621114628211397,3.2108360554389392,9.95637665795234,7.354831783889577,18.015663682080767,7.860359520020026,16.040284306128115,10.475879422842493,11.993831111753451,3.3925119561326467,16.665122209818676,19.807961615063828,7.265452136622845,18.92641348012547,7.991195210481932,9.20870166427715,1.36959665395882,15.132623544136488,8.306305910755988,14.038122678909563,11.208358951001633,10.546910928233686,18.686349868224127,11.20632760894392,18.231374275756522,7.3352150421226225,6.8791183444085835,4.2698506048554385,17.730151677255716,19.411047862574122,10.212676784465629,15.047610944355757,2.304194760417211,2.593910264217505,18.93697748919132,4.517206212717464,6.646009023384907,14.850267427386,9.158747260348438,3.375263566204909,1.5982806267885152,18.587511852206198,18.737650770346033,14.81681124439287,14.146732674547282,19.639854132821387,9.20637421420848,5.239880253676659,14.447955955387716,6.106290860238519,8.019764776804333,16.459594280026995,8.508958280914127,18.813762131129256,16.791078491317247,19.73176279957692,17.15440647779431,3.7811311800968594,0.6007533064588655,14.202058257664273,12.918270502866761,1.6326998526292602,0.24523161337192345,14.521147870179014,10.446990010905818,14.65683148003797,13.914092407332355,15.237094129516153,3.9045127482063346,1.011362430265348,9.603240232158674,15.883046712644692,2.033894499881037,17.803227073104694,14.067251409323308,15.250681248662797,11.219624690657124,8.492340687489484,10.723331758151605,12.95770916034738,16.056603378950008,3.269498740633723,0.8242286388810127,4.538731967996581,11.937874654576097,0.6070623090709004,9.329256595459427,4.788149748527291,17.97206678481233,8.329790527531053,10.12528643011545,15.41179851681774,13.570655492562258,12.658291625780794,10.754923183247701,0.7139198644642386,4.2988714208560985,17.620398122220678,3.8975712337593693,16.007137722943064,1.72056398049802,14.138192461977454,17.26530923297354,11.171850660351774,4.837633038457767,0.7700558754212716,19.298380034831183,4.475303352351472,10.412939052688358,15.454731282193208,17.376955994638173,0.5966882353440717,11.85719174268026,2.4742218083847556,10.602019224584357,1.1578718370965646,17.67246667944537,12.182422975135395,17.579424697603642,6.573725314096861,19.482479929371856,17.59010442804918,13.99388966929358,6.839394358460713,9.801781893489343,10.599218939981663,1.8764981764460575,7.809090101665901,18.33958630623342,5.25818897586646,11.77529226703614,16.58816318462023,7.0927049783414065,8.497058605773887,2.3731974537579292,14.52293803148474,2.3865225041916416,4.610870909454294,14.933178898171352,13.37102693364708,5.826962209968469,12.615857718537455,4.411409741727357,18.92755250935092,16.167565749563867,16.64732948119593,2.707485534562788,8.799227769694049,5.294874713211013,4.410213569341708,5.855866623238661,13.265636402354929,15.161419945622372,16.063293855515965,4.644977907718544,18.31588103410195,2.348078643884519,3.5898819836802343,6.594671792064615,9.510857061595758,6.346557161992719,14.826251594194506,2.2203597416370435,6.285317286529795,15.292647136851997,15.632224312636938,6.302815815518108,7.014765392390512,9.099684188252045,15.817237001894853,12.587145700446909,11.817634279057817,15.057647857669219,1.8830247852810444,6.593825040176369,5.921668140137224,3.5229690236829203,13.851359609182472,19.33623472253703,6.067716468002695,11.359306477779718,7.610954285204556,18.935004483376193,0.5519873108835549,15.03575366732722,6.703087224499282,11.177917235551478,4.099588808135208,5.1979749376696205,19.060991638082882,2.187458362674417,17.452874920773716,14.581961605102478,8.526837542932736,18.93001277899254,16.09101876452918,3.196144908624645,5.541714847586783,1.9272655193404908,0.28178895804262805,1.909340266476498,12.891552441201917,4.626678018286152,18.134336725117336,18.84587401439707,6.73472713348549,0.7894972154985069,16.166676328760108,12.095331775982125,4.1802687958471285,4.613032562239452,8.585231366349086,15.597303568002111,15.247508458703805,12.80887023493709,9.137914916973626,0.23255933171167253,10.397454068458467,3.8524084811571857,0.5434016840089573,12.26745156256587,16.91609660136784,4.627869039749042,2.229230787668728,17.899817603680326,15.144425771898899,3.0987596198144285,3.5010031576921152,2.762499587267233,16.731445237659678,4.481679918466361,3.0076333850539694,12.073477576519043,19.252772844935816,11.60109044866935,1.0989505443350112,19.9342125295663,13.329551896077474,4.872466882484181,5.2201812137569314,13.558301452383077,10.697700414818723,7.195238422612813,14.64035337649471,8.037783308022624,7.776986701841944,13.072841997832958,17.618838811368125,12.31723913434815,19.065205094053134,17.67114699602881,2.147357288348104,18.509790981661048,7.814541124516854,0.2634906855633723,8.776234200436237,13.183218745309189,14.253502995612575,18.719515778483647,10.425642620697118,5.765782271412223,19.216077023576922,8.634670903260044,16.780037434278906,12.883448443269536,12.064136793117509,3.6818267828433715,17.72416141328001,4.498702776421011,10.29776463380696,0.0028708790298281883,4.141001886105151,17.948302748756802,19.320142882181045,4.580821158045532,14.577315749787743,1.8693089093052428,16.3831153901091,3.942180114375673,11.667917788834226,12.41437327185357,19.03806219276623,15.322721904174843,1.0326292453038244,17.51304667861814,19.49147170921878,11.876780020798577,8.688543576827556,5.521407706114134,6.669636262598662,14.49128464436006,8.968523154670018,10.209243608905956,1.4965454500174147,14.818899417035446,5.917249863070455,6.606011210840821,9.781207530483606,3.152305470405614,18.954168450977203,17.79596784163229,19.398783141796887,14.303175402485833,11.867368931761701,13.435404693657059,13.880256055188847,7.131853719782089,10.117675295835845,1.4257624963362536,3.6408338793298833,5.544937344145762,19.35067749200297,15.012555278062996,5.323793248632023,15.798396450308037,1.6090196149362912,14.716147512782278,7.521037135553663,4.184444552839084,13.87234424022704,9.64239424561239,16.99765562231008,13.771155036436781,9.802457344623527,13.78226048007158,11.693547288097786,18.07908082157139,2.12864716076294,6.283525854794565,16.224591673478784,11.526937529594052,19.377702686138868,16.169526504559094,6.427283966320552,5.68154243525679,2.4756047874565823,14.135830950443552,0.8550889450909116,16.491281968281164,18.62620768293741,5.4114300332098875,10.589649581453763,19.320722768579053,18.104611324445198,8.441220304268079,19.047185381168084,1.2965385658090156,3.1781027769947645,8.52666715843808,2.9095863611865447,9.70568818080794,16.49709110286779,17.58344966825771,10.137753249480234,1.3828066537862105,11.99867967530949,10.252919450122526,4.78510838465847,18.372021982224997,4.611424775887927,18.934579027254696,0.1754736716767269,14.020357695784863,15.646604996524772,11.060980725526935,18.48355746590763,17.33542650637925,11.931247616781512,13.103819465791066,1.5221843614116581,15.385894792427015,0.03705294773411971,2.6198997150709014,16.842458368095695,9.026944814400721,6.830225777536851,12.698529733660164,6.885122814244986,17.032191904732464,3.7896118656154876,1.8496125857332268,0.10717581831864553,11.513313427297515,14.058172801550683,18.223509673374704,10.126676516023391,1.1948980622537775,3.351494480392665,5.970924139348703,12.94397230046112,3.841496919006242,7.309875926355409,19.878396033161223,17.71956237398306,3.7456496750108714,13.150210893015464,1.0881302242080082,15.80148001669012,17.24959622902405,18.81593574430241,9.5877009388657,14.810304942890053,3.3735735031341108,14.104448092613854,10.077606481008585,2.201398759673263,5.6334532328618625,19.622032307352644,6.518151325278145,1.626498061513706,15.70893664736265,19.256330724668857,7.918911156522936,12.543859320640042,0.5050278464630598,15.420771167560506,10.886802796694642,9.59454209000353,10.119358096399043,1.6104348344785846,18.686196778153445,15.834715971445137,0.032132529873214466,6.496315751847752,13.81021118077526,9.219872930532471,14.941832515395138,12.575498136042258,16.33471730181011,10.297198801729701,1.4993694802377977,12.221678600758047,12.31727134105212,2.7834178155690115,8.17734688492207,2.1598217821895416,8.46432904378982,10.497869734310719,10.844385221559989,3.661138697779207,7.794336802262509,14.80999997148257,12.460617276902163,17.9397917648075,13.071838695621114,3.450505447576737,0.582939880921578,11.903159060379217,10.005888731477732,2.4911914075072517,11.707089011992927,16.069752833709572,3.4519088395395015,10.778177996676375,8.910123506296749,7.414786319467677,8.659510035313222,2.440030877790993,14.974136186571073,0.9472321966549213,17.96751329282062,0.5739342979880924,15.142328388515134,9.862395905196365,7.9278818292906506,3.018475893974921,0.2225935068580842,18.445907080535832,6.5436035521620495,17.157186786230678,1.1483787375969179,0.5497314429143296,0.4663207171324313,15.95532611033239,13.622398768060462,10.511501710350476,13.042261689887415,15.08233908876214,10.929911510708186,17.3069763798895,2.9046372469973614,1.9970623647201036,19.20073239943457,16.72011194871053,19.81721080566794,9.836802290159898,5.368165132744784,7.355192305102176,13.267538861446994,19.39369137135959,9.029513829245142,17.118675227672814,15.896788363837349,7.482503397163982,15.300153518110049,6.90312077335415,19.154207115986214,9.444735695496686,13.618775884591887,6.596563620622304,10.793941970733862,1.5773081856217352,7.462061778067364,15.419979446970075,3.960983616087539,19.594142911437945,14.254136000978509,7.277697208074296,4.12079932981646,2.560985487345806,13.603935913117922,1.9857534097010232,5.128943871280254,17.765942602996574,14.707180795581367,0.0006329265454496635,15.565128472698406,15.991445237454606,18.82454356981331,6.515057163835758,10.634942461191317,6.140089797430139,1.7804312266996947,14.552843414033699,17.110195314534792,2.2575736070775276,14.931746809622805,17.04360315830708,8.008610966447689,2.3163749855790705,12.130182629988514,11.138857613944788,12.138293890554458,14.624945560188213,0.42257274757918406,3.4529100195242712,17.892701253507177,6.198713877222901,2.5169654501751326,1.3327645887145767,15.892904906289672,11.227982156010494,9.811649581197388,13.909936846646943,11.289571792175085,7.994988231538196,18.081141536602765,0.9901343549588937,5.03438398895657,5.890009387458903,15.892896036980817,9.425226630761202,4.118972760047739,6.9300341645684815,1.1931250508729097,15.563403687427488,1.0563752375511548,19.589877598442236,1.0247860245960716,1.0064633055886318,10.696288810819684,11.454399848021893,3.666077602959743,4.325074060781238,3.7755496122028553,17.883415536519998,3.807701723348429,15.638027673687933,17.439235435677773,12.123624272906675,9.562309409943284,1.2168883642766648,7.692232982788725,17.292595728199114,18.313049250297,5.878120662637603,7.798846213331778,13.267992956311128,6.8893655024565925,7.919292519684582,0.627833522474317,17.256106880916402,3.3004638415471854,16.120440462419353,18.77268556439535,10.03700844739527,0.19877644232245473,13.752134309772273,14.616876560149276,12.59786674343378,9.661311257407693,17.36901209221953,9.753473927894163,19.792402094119964,6.136153648630511,1.9238393308955715,9.560862706843904,8.389604085348346,4.7798555062304215,5.409001454265789,14.925780164578919,19.776112200185775,15.802239504805481,5.365099419770352]}
},{}],53:[function(require,module,exports){
module.exports={"expected":[-3.971079310624706,-0.14196470065455966,-0.010692548509192193,-0.04267903176791627,-0.8272992647726756,-1.0676614572761007,-0.4808089663998366,-0.93441873707306,-0.8685733272572453,-1.030051640459983,-0.7401506826365234,-1.313347486142022,-0.1654305236632408,-0.45919609117125165,-1.0592520808707584,-0.994551752976341,-6.61205019714049,-0.3869406005385417,-0.8017151694059024,-0.3492458202763011,-1.0558148856266159,-1.0188482759819313,-1.539573718596853,-1.0720913470153774,-0.14476976370548353,-0.33565014827901507,-0.5240784367037055,-1.6815632067770945,-1.030970457720967,-2.7692727730032183,-0.5607806526276263,-0.8494339934842718,-0.6610432801045356,-1.006150223782211,-0.8875902216610511,-1.020913181876742,-1.8784926006121276,-0.03562680402551468,-0.39599878443173897,-1.337162649587126,-0.9220529516865146,-0.11878703000822766,-0.4623848865558724,-0.7195702646595037,-1.6545491677198099,-0.906412509382579,-1.115129080959547,-0.7624750435183529,-1.3955695656307427,-1.3854971647575398,-0.9488904959063099,-0.6257390163331646,-0.7906763387385093,-1.042884958414765,-1.1105057263842544,-0.3012783216263391,-0.9117597318228836,-0.7930363868003781,-1.4033580721703882,-1.2302323018196528,-1.5932060346366643,-0.615775155904034,-1.3074485270026848,-0.8187523085395582,-1.255801663451775,-0.9484815255831186,-1.074435496384966,-0.5192959714286209,-0.26530207987064525,-1.0965484635632827,-3.507116431095028,-1.0948628325896193,-1.020214274478363,-0.5238090861006983,-1.6384448260102422,-2.091398437834971,-1.1535527845769642,-1.466154023902869,-1.119730840278104,-0.689240779926842,-0.9992878945798581,-0.8653666484979707,-0.9014304473695414,-0.4687203109163955,-2.0785655720703686,-1.9961929984468954,-0.16843326601113362,-1.0621835722778843,-1.7490769644671673,-2.2373078564744406,-0.2369166618110579,-0.13982773850472185,-0.22418527352958828,-0.9426045468992799,-1.1047423716699596,-1.3195288782123007,-1.0646882013675347,-0.9847122257991944,-0.642487438686387,-0.8579917545833766,-3.999308376976029,-0.8931122759879859,-0.9082238044826353,-0.5219590921359584,-0.0013655235902263062,-1.025809458777038,-0.01858671146996122,-0.17981831208558646,-0.07674748289777161,-1.3257179601229576,-0.9088503123272684,-0.0841021107988216,-1.0013468318670333,-1.1091718025265052,-1.1887467422752291,-1.3461833292146694,-0.498121613260589,-1.164287690757257,-0.6740847373615915,-1.5179964984904468,-0.6287207733055721,-1.2466344445700892,-0.9900152808001847,-1.733174989815203,-0.9136615702717686,-0.6851108175079708,-0.7133304276544237,-1.724262254137232,-1.852869140975339,-0.19063553263144867,-1.1339417054305874,-0.3920874098068775,-0.9223747529501786,-1.013962864331517,-2.6814957993052917,-1.4068961755078142,-0.03380824241336003,-0.015040089344398419,-0.6090407676513204,-2.0534661286352756,-1.1463905249290225,-0.5403562583732064,-1.0614315234161378,-1.0285345414913163,-1.0451784429278967,-0.5001091846013519,-0.2997202212495895,-1.9946121492108635,-1.0616711206713279,-1.4729743265814474,-4.447005458883172,-1.08301090089168,-0.2952598918917496,-0.24127417889176234,-1.12147298988367,-0.5646618093397042,-0.48102874861946066,-1.7656463361155126,-0.733178734258275,-2.7145329260906887,-1.60686289782381,-1.2485341537611054,-0.8337291455374691,-0.9904980512340532,-1.1355979600846258,-0.9549984139428922,-1.0574824026044214,-1.1949911480528534,-0.23982365283525914,-1.2183859870463216,-0.015619988498698325,-1.2373166946488618,-1.0381254279233776,-0.17772514611389362,-1.0458460656944708,-0.8425645943277378,-0.9566481206029348,-1.0571141099371275,-2.504404181575727,-0.5352502750440408,-0.4049039138659559,-1.1013822422981123,-2.524307285628294,-1.8688904354983071,-0.9400226712089101,-0.9653954885607349,-1.7983396508327643,-1.777561150148457,-0.8611226460547703,-1.8868618955877365,-0.28923135521100346,-1.1965251634697465,-1.2727238012708364,-0.13862640342524427,-0.8788180492996331,-3.39581220108282,-0.7283291893184467,-1.4046784431990378,-3.122887561015674,-0.9549298298844419,-1.06161506186332,-1.3211796461030054,-0.9809676523675052,-4.916633694375417,-2.48679362397271,-2.0121435249033777,-1.108904980060861,-1.2766857598174421,-0.17772660776646215,-0.1267407053536937,-1.4247888982860624,-1.4767866500769216,-0.6914962784648919,-1.2404996883652126,-1.3558885967276098,-1.0122383396661918,-1.132363735239327,-1.0475948181455852,-0.22622971018238608,-0.5078508605702234,-1.0599181188356621,-1.4666545346244537,-2.2190202326159163,-0.1239670546806027,-2.0785229975596335,-0.7508016473847829,-1.1249249393210634,-0.38243202079536726,-0.2086436775127868,-0.10267180140038817,-0.22716049859844886,-4.32722683983234,-0.8512164207023336,-0.6355618132576383,-0.862665599543601,-0.06075660408544781,-1.143705871392548,-1.6365105141022536,-1.608041465526549,-0.9788347113775444,-1.3646269228683818,-0.33505853616938963,-3.714053146737863,-0.4744487657358802,-0.8767100687005591,-0.7569501068535929,-0.11784591502783903,-1.023200024684801,-0.9037384337760621,-1.0861940811639532,-0.9871061316813419,-0.34429801934133103,-1.3366977205042814,-3.6329901660448853,-0.8806076466761268,-1.6727476822442306,-1.6194899670844825,-1.2995652037810004,-0.0025434431808062105,-1.3663860833238743,-1.0273574221548238,-0.9885132088966279,-0.31956814076357276,-1.194408783922744,-2.316637414139414,-1.5162418279635592,-0.6628374852527101,-2.792327603359395,-0.9917118462305203,-0.3129942367662517,-1.246477403431613,-1.6566921584965015,-1.1248393246494468,-1.249994240659915,-1.0847376728349443,-1.4721711900705905,-1.417578863999374,-0.009843176374152494,-0.7599036667340062,-0.2912991864982482,-0.8655379448784475,-1.062372924644787,-3.1111861001623415,-1.0036992076060385,-1.6095195203260895,-1.4593358663260054,-0.1541065198924051,-0.4436696121242396,-2.2535608438650363,-1.0112539723467358,-0.7275047575908711,-0.464133937384696,-1.3990011311668722,-0.7871370100404678,-6.84919701982944,-0.8703933176398657,-2.715097855344862,-1.7014180669008563,-0.5277864371952955,-1.0747599209685215,-1.1860161075743143,-1.1129351415761783,-0.8940217235830092,-0.19541310311571072,-1.3787730147536446,-0.6871235497902013,-1.4934949561266548,-0.7285793918396979,-0.01972393884715267,-1.0019695961100323,-0.6572427220648717,-0.47905887034660033,-1.0173835272925447,-1.1063506264566572,-0.9541554808665875,-0.0006852356888117289,-0.939729768104731,-2.2696433181341136,-2.2461808922373323,-1.3053301003716677,-1.1220575124488108,-0.9837363457993054,-1.3514449525216086,-0.7712777588144969,-1.1336652246106784,-0.6756825662647419,-1.1176257465920196,-2.2713636654068554,-5.594049526169287,-0.14143503670696828,-0.33385476803027037,-3.3138298563882396,-0.9888080387585232,-0.044808443669808753,-0.3786292030845455,-0.30865241229912393,-0.9330338259608815,-1.1888214261985643,-0.019149761955482316,-2.5650820362597266,-1.1526046564057364,-0.9518138715176621,-1.8681031688403453,-0.08247700972535973,-1.421844674647128,-6.2080906141525265,-0.4037780263938512,-0.6138472447614741,-0.891082241868571,-0.4021277090407563,-0.06541088696726483,-1.3470025063698068,-0.09799276837514742,-1.2167026728186845,-1.1073715068642334,-1.2037483880700743,-0.4472707035856344,-1.2207422002619486,-0.9968040956362257,-1.2622492980598563,-0.4289037222221028,-0.1381283683127277,-0.06254833888339266,-2.708519654775805,-0.7314917225379319,-1.1357068904192893,-0.5638625796294828,-1.0228650468067915,-0.7610230295977545,-0.0892213425904686,-2.1490379608737022,-1.0919317307373413,-0.30765559236882595,-0.4150139818206559,-0.01183027165083854,-1.8121375302239284,-1.5558111869996807,-1.07608424560734,-3.406246987482137,-1.0140430448512872,-0.49299669961861964,-0.6978769171058412,-0.1547783395155004,-0.449580804719925,-0.7047575553566412,-0.8139909841129953,-1.6539889158029126,-1.2281099566349953,-0.6426916082080163,-1.0500199813928641,-0.800283113490826,-1.6518603208025375,-0.332971486409045,-1.0348038808132403,-0.9536472844005932,-1.3976682429047016,-0.3058306818132125,-0.011491620076749984,-1.0850233526303215,-1.2575358969095771,-2.6545861608212475,-0.23203900213207246,-0.4226102922952105,-1.302168892771687,-2.193057710953103,-0.8797273137547303,-0.19422110215522218,-1.6626357589145426,-0.9987030227377001,-0.6738033892302638,-0.8336562560282723,-0.6793062718698386,-2.6022788891695745,-1.5867725730341848,-0.9142002922461759,-1.4074757856466023,-0.3118232962389735,-0.4153300632863991,-1.9905385082166895,-0.09680506943250147,-1.1144833148130129,-0.7587023600665392,-1.2104255573810532,-0.003077366437864211,-1.5380534944856135,-1.1219404075656931,-3.6759248458683036,-0.6599770470448368,-1.1412507773009324,-1.440964935328186,-0.12883980917686028,-0.21927167145986828,-1.8098942154393336,-2.7611108811328386,-1.2162909753221842,-1.3588889307502203,-1.0004449137224476,-0.1283897509409875,-0.4848153774608386,-1.0717757824516303,-0.09328635604881375,-0.5999438513581085,-3.4930158737223103,-1.1882370984654003,-2.6087089887659296,-0.6744531161806503,-1.4996234292915198,-1.5613057328478943,-1.1100747308286976,-1.1297149606202392,-0.4246317923640909,-1.2639036752277093,-0.7696543299160987,-1.8211079779153692,-0.3067068362283981,-1.0912454305887116,-0.169489710006186,-1.897690250799054,-1.9954195238309134,-0.5001867269668416,-0.00015845995722135931,-1.7565930110533632,-0.9743494034120034,-0.31509877080214277,-1.0476944334919318,-1.271350587202873,-0.31445351899405405,-1.5166670324259295,-0.8640609588634048,-0.49918591389812283,-2.7855308386341013,-0.8921280299006062,-0.7590331974747027,-0.24191626435563732,-0.8722147486620635,-1.0700167402749254,-0.016508527092237903,-1.0703103755039813,-2.0738028094797674,-4.382723084534582,-1.6439572346540845,-1.0915185997659325,-1.0498398264725952,-1.3292337233613059,-5.248587722473125,-0.13804985023397148,-1.5155035661460081,-1.019422605336963,-0.6827205656344113,-0.10585185805098386,-0.7384032469515656,-1.9715767048652455,-0.6292839078888802,-7.414194936073722,-0.18798661324554897,-1.0682516766441759,-1.0748888085726667,-0.8296549340614727,-0.9844956631178751,-0.9717217114690154,-0.08840056373178017,-1.0585898646206,-0.09602759079104714,-1.34100144534916,-0.952133912061702,-1.0198272483209354,-0.7909761723517268,-0.8643961064649694,-0.8978616726040123,-2.5159405481803905,-0.8779146133761982,-0.8667455509598685,-2.164379896923412,-1.0022731019122566,-1.0887086259019036,-0.37540539883120294,-2.3313241667097353,-1.2778735870411926,-1.0330515388842558,-1.0756370473165509,-1.582762240477563,-1.286103548641954,-0.7416210427965935,-0.11829909400708585,-0.9253384308104595,-0.8426269400581314,-0.07477887337617815,-1.5389938451314702,-0.3170051088884966,-6.494860238219313,-1.0528066570735715,-0.5139584327545776,-3.2930674044211123,-0.6739659226229608,-0.41488234600725016,-1.7941273578449075,-0.5233962697871022,-2.244658896669835,-0.4555120602503326,-2.668605926640633,-1.1977076429254372,-0.5522210463835031,-1.2072690597969382,-0.7182923466289648,-1.8940456520777342,-1.589499608201296,-2.044332903860473,-1.1585561671384703,-1.2997864330726574,-0.040768518377285956,-0.6789019653525677,-1.4112699298202345,-0.030340900188461566,-0.009917314880884008,-3.478574150800215,-1.4698208030660476,-1.2861392453434264,-1.120088386912256,-0.4075516040717563,-2.773109405884224,-0.254648093564168,-1.439688388116466,-0.8813558807676648,-1.0222357302458465,-1.2207104136341018,-1.4073015720384219,-1.4026908340928241,-0.8683825172902209,-0.40260369329744317,-2.7064143178016713,-0.8346403948737405,-1.3601934454198952,-1.4134375801588688,-1.309700427764645,-1.556873217151482,-0.7184530609072262,-1.412590581307209,-0.915041920519451,-1.1817761746165214,-1.0988181554541023,-1.251106479159836,-1.6004744066561458,-0.9320663470862489,-1.5015019807815277,-0.9701378671793178,-1.6551266255551689,-0.6469486126364741,-0.2913140185683878,-0.3384887099098752,-2.3859196319830867,-0.2527871801830965,-0.5130861322257572,-2.1405549155017463,-0.8619428332365795,-4.319272805626349,-1.80409970511875,-1.1611898669677885,-1.1414774942707047,-0.7324790944939393,-0.4691275974090507,-0.00522695364630237,-0.5493247353276878,-0.9687329034755693,-0.29922459871689744,-3.0673947611800383,-0.9669470561264144,-0.6861880717077766,-2.4506302225002727,-0.7878202776982643,-3.8291637258577786,-1.1779631804472315,-0.08731002040771338,-1.478929047433771,-0.810314683216782,-0.6309242124795205,-2.417190605027412,-0.2859466741591678,-0.014804229053411359,-0.7255516804483315,-1.6391866247157139,-0.03642858094201677,-0.6950830117674246,-1.0157279181468009,-0.7583132002968089,-0.9419366984318656,-1.8814900791079183,-1.823703112774898,-1.0411603928459738,-2.600039690515636,-0.7345327366321017,-0.8119492818965941,-0.4372001242045817,-1.0494597028112327,-3.3675903945872445,-0.7679660542171467,-0.058996803160358505,-1.176704282572591,-0.9627609686043874,-0.8102759471079684,-0.9661000038005251,-0.10584197166789969,-3.8834402750446277,-0.9940390929807871,-1.1589547893320742,-0.793378479507356,-1.1814975821248987,-0.009653865333724154,-1.6568999396374369,-2.636112082571667,-0.8293266921247457,-4.7897337997884595,-1.0868330210098829,-2.5858103462571984,-5.158352173290416,-1.0026209909433415,-0.6164169759789635,-3.381305939153331,-2.610634316557416,-0.515198038151242,-0.023780812130785468,-1.261533428271368,-0.8092925070530312,-0.9364640155646808,-1.3790741431944082,-0.08323695445361035,-1.0598072055595367,-1.6272806294699262,-1.195669206211143,-0.28035865402854343,-1.0212690370318984,-2.344125971107172,-0.1953225504076045,-0.5797282194347522,-0.8740225088652949,-0.9759986048705048,-1.5914330837798503,-0.04817599942325829,-1.012213446165518,-1.9712722505123779,-1.106023722673228,-0.457864737687266,-0.5653424041997873,-1.0703098899425076,-1.479324803534461,-1.3784357665761235,-1.1705250376905971,-0.38227989360078246,-0.14215917014003226,-0.06981107279449486,-0.91165959942399,-1.1850999650729854,-1.1760281730945894,-1.343291767181346,-0.008268517900305432,-0.7189350562925734,-0.9870494100493529,-1.254725565610345,-1.0275663161729212,-0.979952776376774,-0.9877279389321174,-1.549617723999033,-0.8515037559350881,-0.25212079905095924,-0.45649152117569697,-0.07283783677442193,-1.2961054389054836,-0.05826442047032189,-0.05030545282244709,-1.5873896520335153,-1.5066634664851943,-0.979773849093109,-0.0421709106798455,-1.4899893809999671,-3.44697613713237,-1.0730971078132552,-0.7990204478397477,-1.209428785134965,-0.30016678257465923,-3.4666380340780774,-0.5465483511692527,-0.5860448081461824,-1.0643686236904664,-0.6827475070177735,-0.0385447424587096,-2.979617725794509,-0.8778263584727304,-0.756939521651004,-1.0898964807346843,-0.9508935728742097,-0.1813597837936889,-0.40441762170355544,-3.7430163022408207,-0.999992003864559,-0.45863118847899126,-0.8318807732029254,-1.7289065676165065,-0.0032622816028777344,-1.4016941943365417,-0.9057245424370154,-3.9656518934873692,-1.9734420747725792,-3.2097331347298383,-3.6598137170179443,-3.749718624314084,-0.8845144002059261,-0.25031914617399553,-0.4570319567581417,-1.1713838491306048,-0.4125722425901629,-1.5256972103085003,-2.7813736535444016,-0.2861018874498217,-1.2410510652275615,-0.9577723862013809,-0.5361359023738084,-0.06255155400228576,-0.3464943159723818,-0.8698756010684153,-0.7969951751416455,-2.4036946137700137,-0.04905524697184293,-0.015454868754066235,-0.12020009730527517,-0.12964500861331907,-1.7801944750622065,-0.008718070497062424,-0.1379389641736962,-1.3560840680351078,-1.75827892055301,-0.45436412895429173,-0.6595557069783404,-0.7406306147035524,-0.6289614167239839,-0.7234745048259928,-3.3160744582520874,-0.9138065514251763,-3.21480568484313,-0.5811028844386331,-0.43468144763755695,-0.46543892140150606,-0.6957615391439065,-5.427627852637567,-1.2666733052899732,-2.1095773692521638,-0.7310970234606488,-3.1787312312366245,-0.7747325354922769,-0.8316903023822315,-0.717215377998759,-0.8572788457681746,-1.5023010270087518,-0.6070125046387889,-0.98681667209349,-1.9754277123759225,-0.3414980003774086,-1.2681249316542764,-1.5648461257708624,-2.1566285619188306,-0.8403108272999816,-5.20106683042143,-2.8958707977936573,-0.7724262682903544,-0.5283816165668179,-1.480633540944476,-0.6622073311284328,-1.103266412906371,-2.2333633869419613,-0.5693729320967874,-0.24054553451206018,-1.1351437389517187,-1.4167888093630319,-1.3407884933081367,-1.4404949118534383,-0.45777802864281975,-3.8384887465480237,-0.12123828923744082,-2.5235827303716087,-0.955364569587252,-1.8385694418803598,-0.988646437170249,-0.5117117016821491,-1.0971366763345798,-0.1610461383894331,-1.1992922199113194,-0.16234718758621547,-0.4097068834746196,-1.1254815332832913,-0.9759409637572609,-0.8434727045625279,-2.4932921248641824,-4.7183092165365705,-1.0170417667659637,-0.9601110250535768,-0.9993650956776307,-1.3814083260946421,-1.8719347174577254,-0.7902061367689995,-0.8440162250684344,-0.14020456477679388,-1.5471408601301502,-0.5175987072859968,-0.7438628400618907,-0.989695806607774,-1.0074224645672265,-0.011009453419560151,-1.4498167208809214,-1.1729457946461015,-0.7315051829577516,-2.672753127667392,-1.9258287427178158,-1.8809859571125758,-1.2753930815924954,-1.0797417421364324,-0.70124838452291,-1.1946480275540063,-3.640124579212811,-0.1511126021356205,-1.6819606984308875,-3.1405329491682874,-0.8215194163684484,-0.4487070372043459,-1.0441574868214514,-1.138396088709628,-1.5486583257861517,-2.3186733619211606,-2.3337893780066965,-0.8754084510328143,-0.7198638288418688,-4.525673811289879,-5.261807092245368,-0.9624806493528341,-1.1189661567712077,-0.9035666302320282,-0.21049300516765326,-0.43021849148229035,-0.9366368558995957,-1.4414309710563524,-0.5360283944570604,-2.6033538119692317,-0.9991940939101708,-2.139852960974052,-0.042977997666744136,-1.9862222765432684,-0.13742115141542363,-0.7013479862304728,-1.731601590953063,-1.3267218269821295,-0.1616406604739179,-2.944126752605572,-1.1655097425773169,-0.13406750277767637,-1.0778055406089695,-0.6093110333591587,-2.2311521446974267,-1.5360866100365054,-0.21376423779521456,-0.5027487635366229,-1.0821384413166337,-0.9428686607388327,-0.6420981056051697,-0.5982725020176352,-0.36410226702748005,-0.9165730855741199,-1.541778150243422,-3.200537743055536,-5.551375016430855,-0.16018174238872215,-0.32911663181202344,-0.17400341221820972,-1.241728302972821,-9.25806790471791,-0.8933851361892248,-0.06424972945322875,-0.041395289551933154,-1.1909199796077883,-0.7889471695118588,-0.7463848045578568,-0.26873579296373534,-1.2422001620574714,-0.7254086393418263,-0.7700062494028064,-0.6433107296922396,-1.2252982191225608,-1.0083364273027777,-0.0023223534437798086,-1.1738632099300494,-0.8286804406533946,-1.085551486098435,-0.019460474544658986,-1.6690631066564348,-2.7404033723953933,-2.3873109134637485,-0.9375498976550473,-0.37512366680651543,-1.0752314652573554,-1.2260698325774064,-0.3556660793518337,-0.2880515283852822,-0.5611717214765347,-1.0371299018676152,-0.4621529558193097,-0.8523005559065666,-3.008107255443225,-0.7206255213537256,-0.3138695891447163,-1.2963489418174623,-1.3225928475124018,-0.3728045191036052,-0.5105673065627585,-0.7793771345036766,-0.11780755840487565,-0.46874719602986226,-0.7377631839076241,-4.414249629940604,-1.2483960492408162,-0.6798913397970774,-1.3068464517680607,-2.244762014322715,-0.7150940045986884,-0.901617467409226,-0.47016695653788826,-1.1334258725835757,-0.9428073601179834,-2.689218205605167,-1.27693469280214,-4.661348567836643e-5,-1.0267888822271338,-2.0631963880753004,-2.1047624837781496,-1.0307988283058143,-3.711165313107243,-0.328251598416165,-0.23081073721372924,-1.0548851294481667,-0.5975290842984153,-0.5570399311845697,-0.7877576994655888,-0.5913649335475761,-2.935550458800987,-1.2976327012146327,-3.247330171324939,-1.342894239551911,-0.38994776258568636,-1.6270563770178317,-0.42257120047209756,-0.3127099765845964,-0.6573410005578962,-0.9986428937445637,-1.2855683310566777,-1.236731748319345,-0.7144049885325986,-0.9978376379528234,-1.4037440856513967,-1.0452973323558807,-0.48710179294683814,-0.9149975145317053,-1.3085601225667596,-1.005719596781473,-1.1239413513128775,-0.35934781782868075],"alpha":[1.2519434594551182,0.8016196857596256,1.7447492450213429,1.4789990876835204,1.4176798662641317,0.19302978105483515,0.4064934249544101,0.25271448470370483,0.10441547725040534,0.2566480900308745,0.2344133803196029,1.3992598369113978,1.9454853246859072,1.8244342360252088,1.208162872833697,1.1603638871016773,1.9446998297508062,1.1010821804764572,1.169915409821173,0.9277317218192653,0.11670579136220782,0.05697781646826927,1.9202390990830884,0.6273535651927049,0.42499528350310456,1.1517022450820966,1.5110666254881053,0.5578913636616756,0.8400306325601998,1.036366505779994,0.27922402409379554,0.24609816272418694,0.6954147990714152,0.06981855518508961,0.4141785595231564,0.043108267743761086,0.48142892921356095,1.3069440133753374,0.8764134839096984,0.8620936353943391,0.6343402889228646,0.9358850762666222,1.5025717820821298,1.3762119416153036,1.4105966339665668,0.03210365670521975,1.4009854796260641,1.3764333153906194,0.947127577691643,0.493959601218144,1.6170190049988347,1.5681894426686296,1.259354247299124,0.04058239976112166,0.47451764645352235,1.340831104567994,0.09168325302973201,0.5796268300938547,1.1079745757117188,0.20220752468349135,1.4779780302689076,1.950902741926829,0.9198569200984101,1.5352326671556553,1.138628671285924,0.1781539045168521,0.5591797996506473,0.8419422812011588,1.8384330847807488,0.5992068477490236,1.4833074975148324,0.33013256591905993,0.09375656929743048,0.8585188943690882,1.9088096523954765,0.7525114968257478,0.18426359665827174,0.5784306789137204,0.9338360651116409,0.5698542848827048,0.04023166312124182,0.2601791653221279,0.5423415128035218,0.6318590727729223,0.8457302427225022,1.1073812586726088,1.039416181626566,0.1904012049942656,1.976572811546729,1.252770857534082,0.7374134255065106,1.4280758255711543,1.8962926833633378,0.3808929500639451,0.25289553872084847,1.070465693836173,0.10260216835287217,0.13410656773349627,0.3908508155726764,0.18066100847851452,1.8976740091785018,0.6728235897622903,0.40780752082859717,0.717521064047876,1.6878786455273826,0.10430259483222892,1.6203746344468453,1.1418458046933466,1.4306226333524732,1.7670577157767067,0.17488583383068823,0.7066583235871287,0.9829414029510195,0.6756036767775657,0.6296562737466171,0.6930430194222348,1.265841042675373,1.2420997193760974,0.7285427819951216,1.4570140962964078,0.7970582915957425,0.3127257329394264,0.7104926356884578,1.5947153802782457,0.16190810034153325,0.29704706498330236,0.7488673249116959,1.3860741908934249,1.988709034340066,0.7035738969576242,0.5619361491395334,1.5696588882547662,0.26989631542059955,0.765573210936835,0.9559863063176133,1.1419643629708611,1.926842903565698,1.3509214834522028,0.7120201529004913,1.1546186330818595,1.4410443926770342,1.349213008133975,0.5714717534990115,0.04644671563863323,0.2801057564437377,0.8721377379253088,0.3899946573042459,1.116157092529651,0.8508378359623183,0.6894646090509973,1.7678089649192636,1.9350064944569971,0.8547820176370378,0.7952852121918457,1.5884157668492884,1.603764998685096,0.9493401817131075,1.8257770364319983,0.160175261200441,1.3071551747893948,1.8442673743593807,0.5781228286572673,0.9535622617376309,0.05540386945280096,0.22867499086080034,0.078930360183604,0.07577354617542742,0.42893062253791037,1.3366382047998253,0.8638625520138667,1.9763100291740034,1.124189112558474,0.5758751947508891,1.7446794053757895,0.38123077384065684,0.15154015555149103,1.2145569727556609,0.1260855841917996,0.7609521845231813,0.356126753048311,0.5488551730763538,0.6371622590864026,1.5824838589015089,1.722284054652977,0.0340523154731871,0.9031459245303664,1.6323334179041917,0.6077898331115286,0.05416984450502316,0.8829792358873356,0.3936488602731463,1.161774878025088,0.7486550238078187,1.0428708466593322,0.7185067096278415,1.4638486503713208,1.4183356254749282,0.49465054840046374,1.517949327531281,1.5650419487441285,0.6449763645578024,0.6947301330430031,1.556835782973827,1.8753018085166238,1.9246614226317118,1.350263653643725,0.48325231765635124,0.9546110658908953,1.1876408749990812,1.7746741044333785,1.0345402895124014,1.0865161244005836,1.3843960164554283,0.4646089872619448,0.24787404508820732,0.5190012925866125,0.6725223880576552,1.6481276793972248,0.9523192819191117,0.44187020331088345,0.48465403154172293,0.8437503999810914,1.5859781431498803,1.0030130045586656,1.069973839451102,0.17145527930712046,0.11382530888865938,0.7064140807743162,0.9932596015356361,1.1336092855919486,1.4439077423721502,1.354992699156115,1.6223023395281273,1.7915139067548838,1.9988101143110675,0.8483154809472842,0.2638954090011132,1.5504774557322376,0.5715637924868324,1.2055755772610488,1.5181790109854556,1.4535518495793802,1.6135238991409029,1.0694172719888453,0.6924753987308936,1.785643206600028,1.8169712389012527,0.29157876355572077,1.3535602870009957,1.0041126624113228,0.02995465608927894,1.9011327800245015,0.3578241531925168,1.8464278090030137,0.5491458067623363,0.9337997229925632,1.121712926057484,1.127307971831736,1.708234384900631,0.5097195338167682,1.3096607596827434,0.7207156158801937,1.11799917961202,0.5871639537868361,1.0598235606128967,1.0162410607899295,1.3066942721233996,1.6837855048510058,0.12039928187833926,1.9781929905450952,0.3050643438869609,1.7092143681256684,1.3219846867551093,0.5483083585232729,0.638700232926213,0.5469020251953371,1.4723847653501192,1.673528956588819,0.374424705428007,0.8809118285786015,0.20650504070879183,1.2059087901429253,1.8358098793253776,0.23222336195316018,1.2312878083202907,1.159159793513576,0.5848553370314451,0.9140500514807037,0.8172417646620809,0.12373268242351676,0.5734533278277985,0.288194710410862,0.44851109870207706,1.735528096789717,1.6797309312393538,0.16861363028713727,1.2402222754736103,1.076336254429052,1.051932392322096,0.20602850024730124,0.47183536409071314,0.5120986676222801,0.20164530052218188,1.3695246357553192,0.5924191946074568,1.4825102124422749,0.63431201318657,0.06981845044846002,1.1063020823855867,0.031084443111594418,0.8859293925104743,1.317005880540198,0.7474905554398097,0.10080712905705669,0.9372388481958711,1.6192735828822498,0.22050211005995068,1.6735273367776875,1.7383285879523398,1.3496842710185866,1.6305888672781923,0.00799591153117607,1.1094262965391066,0.32331747013250567,1.1969967961991732,0.8609426611991804,0.5356966411505368,1.8103010177564003,1.906836241605383,1.3741039206017178,0.3089292387774969,1.0214703778494174,0.6853287279175313,1.606977498737065,0.5554267294591297,1.6094736621823547,0.02212081228884255,0.6120138383928375,1.924095165932059,1.5079956043465965,0.8815282455325786,0.22519588440718996,1.3993498323466285,1.990041832783533,1.331092366668651,1.5871631659719423,0.4650680283945232,0.42441319305088854,0.7705744256315805,1.0697732312936923,1.363918260303044,1.3935159515704347,0.8857192639454836,0.46416720098317166,0.4233540975150709,1.7322387141469906,0.44653404723279166,0.3245142928995506,0.5396631792819928,0.6429747959376644,0.5138935711235604,1.115729138433108,1.1609955529315554,1.2227402415859387,1.1005096993344674,0.3444021674965305,0.5693931175966105,0.39186700216661574,1.981114023753502,1.110197144726722,1.1939065336508272,0.37647455682139386,0.7644817628341332,0.5625647578060065,0.9021402354779693,1.9600404938020768,1.285276891235811,1.3856371463539787,1.6663585231750955,0.1379505119092621,1.4644894239050616,1.124788771367903,0.9213870556477648,1.1363971547366725,0.43930465857016454,0.5228074781316074,1.2368714911328271,0.38180752957709885,1.0212902215403212,0.18822105247574905,1.7806639840570786,1.497345367889324,1.5379248904342901,1.6347384225322994,0.1680555697409547,0.6983475077146091,1.689891914280024,1.627719602136314,0.37038169932716336,0.7826204405396386,1.480358499030082,1.6029598785112835,1.2568886636985432,0.9074389744570852,0.9244232985001943,0.16960349414615505,1.8769937710059428,0.6735265983239516,0.20100734670069365,0.26238023709891634,0.3563113348109912,1.1063761546327542,1.2606540012016811,0.8528476810370478,0.39830673844735953,1.184182099629849,1.3372543772172203,1.4295799038879862,1.556912344937237,1.570464283481328,0.13222806778541152,1.2653941551475278,0.37293610086533624,1.4294993197159243,0.8644945462623657,0.24866911754828802,1.9811561250684306,1.1611252643573469,0.4010212841424776,0.7137096758416082,1.8238533903862613,1.348187525309124,0.8679087567805595,1.683950119350536,0.9332649395919175,0.26148294500783686,0.011374244660285804,1.0386336867923278,1.9527921755643094,1.7743733359960947,1.9954148523055464,0.3730218483208363,1.9943160249398422,1.0783259734452253,1.851710795598354,1.2504073821556143,0.6900544022368593,1.2029360179312585,0.5209413709236621,0.7054231602758194,0.8327150299278525,0.6642871531611405,0.598289193162918,0.9467420662958341,1.7497986735495408,1.8840468184634505,0.49758496461509694,1.7725131643626937,0.7784628159399247,0.6277895223266787,1.4713640527648484,1.1430741209268667,0.500004180708848,0.4004200634462709,0.8860259554872769,0.9252291921089171,1.8497999914060608,1.8123430831482978,0.25917864098685506,1.5106658111959277,1.7897612044005857,0.3356654290743273,1.532680591675489,1.2992079089815083,0.10655653177042756,0.8176278321447992,1.1262181921757835,0.967286235858468,1.8587319151101696,1.589542564810242,1.3521246230398862,0.30465634768029437,0.10224784374221851,0.40784110597729617,1.9599862645935033,1.2397045531328632,1.6463810230235887,0.16909121084878453,0.2588439824775737,1.7947383819284797,0.7173899323063675,0.9741075492055602,0.7111912920875767,1.761629134462034,0.6985702700977563,0.25849301339018993,1.9127274752178653,0.7559607179638603,0.6936594541214647,0.43483141370618617,1.6563757928399574,0.2236262447312365,1.0127002570725225,1.5591993137796174,0.611030142366614,0.15196994353251014,0.7181548408768599,0.6483548367066545,0.23932412115011426,1.567634249021058,0.21982405929834092,0.34315031406704843,1.6333044231391982,0.2599991575798217,0.26125178181013364,0.7957121632792923,1.6943282069107632,0.7091097973301617,0.10701555081017045,0.07025671495719621,1.5078422946492398,1.0586823563820578,0.27610542258356485,1.5915865182085969,0.349927361909788,1.048241038981463,1.323510570876627,0.7726206801602826,0.8521879000094312,1.9266881379923886,0.30169634471393314,1.5102200851534922,1.917878325966913,0.3861624025728707,1.6554104885141974,1.2313328539558088,0.556465865918427,1.2855967793442202,0.9375793844506548,1.97448977985762,1.5537226874357537,0.6436830844518289,0.6796679198482733,0.564990099193377,1.9215722796890686,1.2663700033928178,0.7250814368240683,0.4469841106934975,0.9135092123916735,1.4530646379268237,0.196378956007913,1.4554502086435481,1.6685431363530205,1.9242639895377107,1.7049492590731359,0.8250336615608389,0.9329351187788419,0.8384401352942792,0.8772086801409742,1.8802544575277147,0.641115881678683,0.45482230020863046,0.4127688095952937,0.3839642087751076,0.36483716263889043,0.6038891340773547,0.4682953374029597,1.540394943640032,1.9729051668975681,0.8044967937135419,0.16302115089606684,0.3770494230524948,0.6577412753927669,0.31094071441498583,1.3359565809722782,0.4778526115391748,1.2538595234220251,1.7365673637148173,1.0161231589120274,0.49552920607637985,1.0606310258250167,0.7018661898589484,0.13205782593370685,1.4913414479153357,0.019459918020155786,1.2665978149958677,1.9785019193959617,1.3353876141671086,1.1950913278663946,1.215733963528653,0.8338542793464985,1.2033183195256418,0.8529329123519807,0.5373005788717777,1.163435732556072,1.2899229222060535,0.966689200810992,1.2186711949222597,0.126861618628487,1.8534607370912628,1.6124963517035482,0.8930617337693225,0.04054254340110086,1.2421585846008596,1.4425048710090032,0.18474218070390558,0.3379467796965363,1.2738693187597323,0.6244757958398797,1.4751666017136666,1.169231363555582,0.9824229831596916,1.3149133139491385,0.20953970526455645,0.47695534664273165,1.522354191213577,1.5788309714625282,1.0826189073015131,0.7361142564134671,0.8740002211164621,1.8106858925877862,0.7892793863341443,0.11561963453620239,1.6736519772918124,0.4526810901937215,1.3900514565163808,1.479742065275095,0.09570080650661783,1.123363703557247,0.12290383240080427,0.29756640465567186,1.2226124744996194,0.13998860024974968,1.3194752610933547,0.17598113283711037,1.5498931919122176,0.9230425775275717,0.6925465754588083,0.4173027902668798,0.4193268788984823,0.9180484650248095,1.5282793160878216,0.04329801214664686,0.1581872538695679,1.06335593092422,1.5816457151884613,1.8741124590322218,1.8060134233196141,1.8860349595344288,0.16683661573171893,1.6675147457894033,1.0805882004220062,1.3853061869330379,1.3614914385844692,0.17157382096994134,0.9982361082374953,1.8287658214362383,1.8072273848914708,0.8706933720686316,1.835157948565362,0.30798112242551623,0.20187471422836278,0.23984723420835374,0.37726650303048004,0.672876604287663,0.1112528664072503,0.7009358492209183,0.25238983528085734,0.7001705182122411,0.3219122907634442,0.7245896093587461,1.5242709266623131,1.0888525661090087,1.811890035800555,1.1463203188445243,0.980160128262904,1.329373328599008,0.7916875441740787,1.9017006762727409,0.2693979925891514,1.4695803174491862,1.5081275222278956,0.29033572915576755,1.5582518934352878,0.7666519744902587,0.22313448778758227,1.1253651692128104,1.5806035259411741,0.6127257627401024,1.3267861448445313,0.6418992642736341,0.3561243427511602,1.5575073753474724,0.6831139892718943,1.5779157080251243,0.01867748444123407,1.0079947984307065,0.1133906921926644,1.3214136972122934,0.6061356159824096,0.8750725296765345,0.1532957452516337,1.8568732279213669,1.8853753042612804,1.3246937644717645,0.44627025348604166,1.5135145273456896,1.98543376120531,1.1455326973830209,0.520031426262964,0.6783536910904568,1.004724835352412,1.5957236898768685,1.1619599046861948,0.05564376133084625,0.9446351915476074,0.2646355117126902,0.8512524725211414,1.4225000557657652,1.143404351415699,0.8963923926697746,0.053728838132807155,1.362222771332366,1.4042557755392675,1.530705360674653,0.1561138917707563,0.5566306485475252,0.3546593348293001,0.27328243734245516,1.9650374829572943,0.9005629335944492,1.077853569239871,0.13109431549194372,1.308159181315319,0.8995067958880014,0.6868726486069585,1.7273657732629064,0.476230559757703,0.13532886222962226,1.4472147400882895,0.9400350138750468,1.9674123795919836,1.2902338454810898,1.9420365434299764,0.6090965977760847,1.9211077536432284,1.4878466159994441,1.1764932482509733,0.29656379456871207,1.2548369150893204,1.0163045863071187,1.1955707264020186,0.3348754477815432,0.29151628523209183,1.3013377971847433,0.681102148210321,0.7183848108766755,1.575228206297711,1.0029297523652527,1.2171578816301998,1.7049456351708905,0.7357548603836324,0.600547335169352,0.6701087075344208,0.5773232050328985,1.1083548337984794,0.8549818034227745,1.2506764624702322,1.495408597326017,0.9795205992781533,0.6464845921192675,1.5929981464503395,1.1226276241196071,0.28040119669102115,1.9248993244662556,0.8445788305804021,1.1090282969266378,0.2045750870574099,1.3595539692918823,1.2076466205442475,0.6397321863755301,1.5664169834204098,1.603523151727984,0.9360258440647895,1.932281722555183,1.8790413752231863,0.13635738397156194,0.8650801926424325,0.43304078009924707,0.5398350318796696,1.5069407829980124,0.3384965716566195,0.7815186601293771,1.474507579760059,1.5104442902043091,1.7609847225958735,0.9768176683986001,0.998078580007213,0.09005522847464142,1.911296206859244,1.4544682441115322,1.5814821519070583,1.7475999931707022,1.4777288853233115,0.6171157132052261,0.6059749062173232,1.3343722535739766,0.8594427217245051,0.9374329565663291,1.9938651709473123,1.5888898476000142,1.3029148043333443,1.894787525138768,1.1518964457643102,1.9872845739892,1.948070345571331,1.0666272964921366,0.12690447686373307,0.9246720108984761,0.33174613760841165,0.7189894223082369,1.304554285643968,1.3114542143211532,0.5646613779618037,1.3407598724801657,0.8395997393997301,1.8312029789204916,1.958348956983941,0.45736698339229687,1.685614170938766,1.8557700154593229,0.03918554751101766,1.0908923747694548,0.15711296135234276,0.4750486426589111,0.7999032070435672,0.35951293585768473,0.8140963734563704,1.6270924215477045,0.89227039075667,1.7016523463191224,0.7040372038402696,1.1515183118514045,0.014526590459917443,1.8385797846601135,1.1747831193890383,0.6347314671271582,0.7789055007005281,1.2169146751971067,0.8875038345860813,1.957280876089445,0.449215460618944,0.6912755790658571,0.7937347642733292,1.5855541145355003,1.554692465629807,1.9913510823955431,1.4567449901580742,1.5643618712258367,0.3364861347988275,1.9003528048880218,0.16045047406544954,0.2809502909543671,1.1293395908439736,1.9339662522641095,1.6614436530350294,0.1722784040821228,1.0623292770412722,1.6334292895441793,1.8627947387912416,0.3043066957408689,0.9324884317939963,0.6431538413035769,1.2524068899493543,1.3798977021028298,0.5638441394649547,1.1051702118233249,0.9709473320203821,1.3712897318751152,0.001674498528613455,0.9089970079988605,1.5811815704614292,0.5368809374406913,1.4977531118859315,1.2349463435407064,1.3846509560631963,1.9762494479081076,1.2831159107193826,1.458400208069512,0.6742413009174761,0.622685162159379,0.2507450569867058,0.14281925360464687,1.931489863950771,1.6525130311184415,0.8161824125977786,0.9285869709528045,1.435539162344695,0.07069787197873811,1.6369328911578793,1.8157531394502788,1.305393415764553,0.25494326571204917,1.2518582649555268,0.9303169209981554,1.9331770910768018,0.7652970908582559,0.9946232316499808,1.76194747049919,0.7133384766258426,1.7403815537843075,0.1243167640363616,1.4878630869840674,1.4156833734091494,0.5722658844413964,0.23157491036415223,1.6910184368317513,0.8710085261294807,0.5864556852753324,0.3989750795185927,0.24880640970709944,1.5457261840755168,0.6161943101449272,0.0728075835663069,1.662323977160138,0.5862633161633468,1.1656281398190633,0.18569610235828238,1.3722147246075775,1.2130531067058703,1.4603273782264377,1.0972953808171084,1.3429365373234705,0.5478611636734536,0.30232464875900167,0.2573425507036613,1.7291400499333158,1.1706959937298662,1.4161194149496228,0.07527241490723702,0.5487071823919756,0.5777231291703191,1.6416273987858645,1.6725325919499792,0.4174414391202075,0.8333524505188246,0.9834818715625349,0.5739280789708499,0.7791900811944297,0.6572097652607933,0.7639453769807032,0.1584953065759871,0.19531278410489783,1.2674526765840692,1.6968496814553111,0.7632097746303885,0.41107594263777036,1.6752299404007451,0.5176653351080716,0.2975349242735663,1.8574280377971082,0.12944578076044122,0.2778067467363794,1.8238391636456943,1.0174937584035386,1.4651699349051417,0.5191579818713237,0.8253785814898902,1.7051656844543355,1.85640338390863,1.9597226216182397,0.881314830591466,0.8102458520032436,1.245172236776074,1.6147163106204352,0.5219011334835337,0.2601084390438344,0.783143638893125,1.2590286639396266,1.3496053147765124,1.3084218486999255,1.2005360457480871,1.0719119852905772,1.2415707539726126,1.3878383070791394,1.7723518455352751,1.412673116965113,0.006886408697356128,1.74700192852064,0.8989119521177291,0.5223463054239073,0.425223189085735,1.559990506744628,0.25592116765158357,0.43610196738501683,0.11074920431361335,1.304826696147861,0.07301211767977955,0.9851685899061207,1.3985104212517898],"x":[6.2000929194121746,6.078210122550831,7.796574961252913,12.494236353842785,12.82641140138778,13.01933359455158,13.477748579816982,10.970285109292357,6.962377383079003,12.155944384335333,8.716790096782912,14.317001923220687,9.16555530986692,12.872254324170562,10.814947770472438,6.721268700275891,6.516687354000455,14.886148909706467,13.805803575941662,8.592496390997741,12.222150394125023,9.23507721790547,9.731479777019612,11.994016837075351,5.896571606601153,11.782893622825778,6.877784275131463,6.179349151709063,9.39502811384456,5.189160903467485,11.575332347550988,5.083297358755381,8.024606511745183,8.914200026384238,7.317895688352172,12.272456396552256,5.08571966810983,12.560517809945953,12.359927672165602,10.567794552048547,12.33788433088812,14.448461660441339,5.031259601104823,10.107798185864452,11.930855398994515,6.804104746572599,13.121430287543244,13.421204490587971,10.706062653125452,5.38460207617671,14.634582864305285,12.865600127462871,11.395073289531684,5.5808462616254895,11.214869710768562,14.646408900439019,13.167861202996828,14.659174951121866,13.71421320780099,7.176779069921524,11.650647112835792,12.130399715399555,12.772664099732822,8.343272991091151,11.473350343731038,5.911609065297306,11.50175254734057,10.861476696603315,12.05516775211983,11.38867625127171,8.534649883359922,12.300377629298083,6.19225779574186,12.441667679267209,14.246315923395585,5.11379029750862,7.701540000727105,8.543082851801767,8.002569724876187,11.485280660975839,11.469638518544322,12.56655934350061,11.406947118237865,7.142480495116712,7.18772977114152,10.09813416881525,11.998013937814063,13.472866586685068,14.643197593810537,6.322128892937659,6.130234075332462,9.546044724941323,13.985232781024084,10.070252388674286,10.994854943675694,14.167251917556454,9.8715277997548,9.083392839092326,11.612556446301038,12.945740195501369,8.950507229568196,9.543408819901595,10.630351850824027,13.228721424588343,12.183202215977404,11.11609683075166,14.849830053538449,9.204499843533938,8.485144204827243,10.059698227217302,14.944109758353687,8.54267914862749,8.63556467989142,12.41669556511175,13.182000746040526,11.947659661012242,11.025068065708519,9.696110006714251,10.80376725464314,10.697558217004406,13.791079082686124,8.327996358251944,14.567830056118627,14.149221242430752,12.130641488608847,13.654709804751846,14.210514051760626,10.766324588865317,7.787726597332001,13.430888349358774,6.7471442943189075,8.932092686648756,13.602587218716538,7.677729407548684,6.970492119100848,9.55406159453678,13.199609483773054,9.602952984361941,11.066215870832458,10.083795017020245,11.888692108751886,9.556722805974477,5.482297039838482,9.357320212858154,12.932806230316551,12.884750279786166,12.557753033282939,10.500681856494719,10.564803661529211,10.790318853357192,5.687576209880991,11.262186709581567,12.18985138057395,10.563192411648659,10.66746893480345,12.174930440223688,11.0392943243559,9.23474049348016,6.553020653410497,8.584088143543982,14.878447786161068,12.44913805333713,10.913882194048403,14.525134908781697,9.19994018227434,8.35944104338591,6.378958158416673,11.685296138832255,9.579458787877066,13.549213237797082,9.092015099414873,14.898099820107028,10.865885574464436,12.978885808895937,13.619647600430252,8.622593290114631,5.417070206982119,12.026258475895318,5.022152082579627,12.523564400808848,11.262510928633773,7.613313608487571,7.236241741637032,9.647059535047473,5.514280821394239,10.539182773966651,11.862056100845969,5.241490188877707,10.32011666333149,8.476594800588437,11.633902674932004,8.776459915379853,10.62319837025626,9.33453899700698,14.256418568516295,7.040067138431021,7.050248208400085,9.876518658030946,6.9247172218605275,8.058093010957524,12.781227358738498,12.314061932730647,9.288089724297702,5.387123728673961,11.649444476455562,6.807140657501682,10.048399420852752,10.030633574674452,14.264924116345835,12.510462663324295,12.747907030097343,9.0508236675983,8.62240779309358,10.253034709055802,5.266828368761926,7.783911476843384,9.729973509409984,7.390283975867325,14.441037949635888,13.382203994678665,9.277925786615203,12.009197871879705,8.15267126663022,11.28449106573642,5.421944323856156,14.503252563890186,5.010867171787828,6.888553808434159,6.009977089520133,7.077181313081389,7.23777801685908,5.622592403231521,11.394756914063333,12.16649409730639,13.247682085150256,6.162839963050171,9.891931077316817,7.454731098777357,8.60231116781203,13.656437439766918,13.728446541081244,13.311511341219607,7.985516448411827,5.894953252297734,14.998737377614175,8.57800647483045,5.780964699152746,14.561422968772689,11.086256363419489,10.077213658923004,7.398198737845519,12.199469916339638,6.064401555784846,8.964935240930016,11.671678613122975,8.467343993123064,12.44993426928765,7.261961617921084,9.210496764436499,7.506196032185752,11.229769180843155,5.140399086058853,7.499080627103738,8.127224794750296,7.188728274961083,13.021103790437127,8.12506710756018,10.155778302242148,13.643015325192563,6.780141315585546,9.675122552502486,11.210333719615003,6.340635129005296,6.965210967140274,14.726767810521238,9.28841840224172,12.956753537113794,11.733710656649684,9.051335362262417,13.816256848325455,11.611404432320658,14.24572477634153,5.268793519801116,8.88446082435554,5.243102517481657,10.624201838025325,10.411324386672609,14.080659171767973,6.336805204709752,8.172752369747052,6.021907366403183,9.535823559871055,5.081997371690983,8.68158144059393,5.031733606956871,12.83208721965105,6.430965628608325,7.452914038755669,11.626033802617421,10.003346583094249,9.812850353450436,6.352573227502994,8.73248851737256,14.18326251484159,11.361854134994205,12.933801570141924,6.7505198298249836,6.560784355277156,13.18049458250021,8.182673813793338,14.098717725856798,12.046803973039133,8.825683010708548,7.1066240614932985,10.003198874773185,9.539400237181129,14.596388137588786,6.408587822008367,8.491173526122605,13.333637928139098,11.961568141780381,10.857817121835172,12.816912262401283,8.713495756648037,10.511020307447914,11.443620654514781,9.292877634380671,12.10497576020336,8.01768050643034,14.695207162474638,6.364041716756539,5.895176525329995,9.44975777838436,12.74823038873266,13.392256624958211,14.544172542926603,13.678919939126091,11.148829240746105,13.214805104116344,6.110900163292499,8.835326070293794,13.948424116840684,11.171562989658202,7.443145023759509,11.231591922100195,6.19240022600537,11.319054301733011,13.89260435997972,9.272429890772148,5.986467857612672,13.09700933698483,7.35857172049994,6.672012707690584,13.044817257959046,14.607000302851725,6.142363094268375,10.889831344924021,6.303747384991136,14.530424551045185,12.156373839406445,5.437876790444336,14.489514714266692,8.636295455742587,7.892737288714644,11.61642193751123,5.277605836956294,13.992185778595319,11.803709929996113,7.517076594182699,9.685998372050024,9.231344347404491,14.616208445143556,14.379757165575121,8.208218721682645,11.779205584816676,11.32344178059524,6.101714337895419,9.65130668507732,6.374516332938287,13.436891714335474,13.979049890962134,9.426437904894083,8.574610016609189,7.360101749329009,6.494733919231999,6.329865248980823,7.517464436585506,11.164677527908658,8.640856277510082,14.741355930105243,12.856568001332743,13.134765526543559,7.165909526582257,12.659500236609677,6.020583634182561,9.484066200734386,14.878179553370767,7.000924956145007,11.65996725320489,12.253421664669217,7.261541394487995,11.123429287341892,11.269719247048744,11.816802799791915,5.07488159923581,6.980493816752531,9.54542262291062,8.975321008961801,11.240779353991893,7.108262231427835,13.870243847403778,13.593679923732072,6.169018900223411,11.161486244282575,12.14354741031887,7.491678784917073,14.336593979946795,14.431962745187212,11.929331216911052,5.321131542980124,7.146638248564234,14.116804999381547,10.452842877219608,14.989450453202977,8.518333635868364,8.112930353242387,6.62636838334544,11.470259282542298,5.752736409969838,11.106179329784068,10.320494613597305,14.74459749236656,5.818209305628466,6.293759930551821,5.002676548750813,5.235718560978171,8.442751765546195,13.01895701886549,13.480318696072569,8.99661359565348,10.587328246322434,5.584905099688193,5.693303096562364,9.971528660033247,10.426140203580061,8.84092592216553,10.795959719605593,7.761002233072977,10.73651640918548,14.815528534671316,11.828100653967798,13.535810174614687,12.090401702255049,6.438312989108679,12.979297271108583,13.398202766995649,8.329653556262702,10.845848345052877,7.723681937897002,14.457677667001185,9.013677600429508,6.689456819281747,13.925191435422839,12.792298435885517,11.757409060969747,5.894428800787459,14.205152871427646,8.986529894860134,9.300570323277508,9.3756350207355,10.536622646973955,12.003925805304407,13.91340960833029,14.926264547092805,14.17329207060315,10.283707905526223,11.49851039266662,11.499758667156502,10.971080361822235,7.161496956273377,9.072582221589006,11.693552919221414,8.551532594922238,6.596550003586154,7.954829868039495,5.80163888239511,12.441741194347156,13.659371545796953,11.919416086254149,13.15357668424804,8.808303846459495,9.94722205206788,7.11668906256156,5.048237263815363,7.153821179190145,14.393925104722348,13.132681990584489,13.346328039496214,12.0364347284354,13.491132659334127,14.547222628335046,10.758433556802586,8.615429422559968,11.752360980562106,8.318232690839341,13.969815614788175,13.710725871370595,6.351726427651496,7.61262966049226,10.922084571190108,13.32356601925012,14.34126387873631,5.371534855127569,11.108174172242824,9.466212684966726,5.3755879563284115,6.11423526147359,14.060523897213432,13.489434810540779,5.55534482225246,9.62231921102365,12.203629124274165,6.499444703895849,14.03492524075074,13.574559881535661,10.811282973915176,10.10480767559753,11.131434554020919,13.682330009815217,5.777710548738182,12.177851707183935,11.216205431311783,5.014004938981853,12.556141040434365,10.478479912501884,11.037301060212332,8.448598375752486,10.190277644375762,14.476990433040665,9.002642147545574,10.444490141140335,6.515032099851934,8.176971100197093,11.476544154964849,12.346135250998225,8.123009319660932,6.36316711104495,12.022619614363705,7.490387162864667,8.018830494061671,13.88537451481767,9.410879439818192,6.256188149706158,13.964073940048415,8.389601710010455,9.854592407646127,11.65632563452959,8.454454297549523,8.24055703337751,9.148435427962163,14.95612713142232,8.473370663809586,14.430572899074923,12.382485292333707,10.537674309631235,10.192109116269311,7.5023535549093,13.557023699806642,8.150198786345648,5.533134807205045,9.167535337326676,8.701064829460908,11.18986846640668,6.510619972062772,13.647303659519412,10.22849491059726,13.630404939510273,12.318357572107617,12.419949663777421,10.478246253682514,11.522324120189777,8.219301124842337,9.199332366884384,8.244676769976728,14.856679779948731,11.86616206694306,11.572051916568054,10.140877361088478,12.7844555192528,9.033844719525277,9.898930242428076,14.260855645844572,7.755104959343235,9.297184391941226,5.4742412079272995,11.011746741030684,12.931945835698322,12.001062009320895,6.285748645932792,10.507293484184428,14.263090265549302,10.169260659509195,10.167262852879798,8.360718647470975,5.753585904066805,11.936845672483052,12.025037427703477,9.808292502019807,14.7392545109697,7.3395308644357975,10.451041710131754,13.070547023383934,11.083983294963225,11.03124614789268,13.230857772479867,5.829867559106066,13.013148962936011,12.733045060727955,11.358983747240964,9.696282693490756,12.839158755686348,8.361905638720078,7.234105158052833,9.28427193122927,11.262847879847346,12.40319231082763,9.612460145827361,11.565342230027456,8.002691210198398,7.173682155128402,13.738824626559442,11.753725404354824,11.887712797758114,6.022042261022449,13.551575131495333,8.374321694205788,13.864759240029382,11.811420680474871,10.88523490476106,9.155666753569715,14.826463830108821,8.204242468553302,8.797467628548182,7.108456590093919,11.224109506531228,9.5763351866941,12.442492051982208,12.326184111339833,10.536391086258792,14.062316655893545,7.109737276289197,14.53253328369177,9.071117026100747,5.788366566036254,13.353132826395267,14.374918775225831,7.603438886428277,6.560269175904647,5.00438601442262,8.071413221865967,9.223456781881094,14.173596140854485,10.812581466372622,7.105644104859083,7.73303629994202,9.559909504463228,7.467335211184305,8.791386239562378,13.082960850384746,9.559694157961268,5.644653904714614,13.299806367796903,12.563471731131006,8.59636635944094,8.394404748148096,6.445914492781933,9.550581433217848,14.589383972135767,13.856208494870607,11.151846138138648,12.565458719788898,11.04685275508626,12.101387908078598,9.946610077314432,5.457458847939083,8.00552441087903,12.333187733441736,12.94733745235616,12.35333452143471,14.204912533135195,14.626730933343648,6.783630923755039,11.843873650370547,11.349020246382235,8.830254601916774,13.941514416117958,13.131971808666963,12.825059577887444,6.536966472073149,12.196208873020558,10.771889296348043,8.337199666531616,9.184011353199997,14.551949998511901,6.346517637417262,10.927967162911967,11.10515218353833,6.097089646397151,11.992784890560648,7.414003172617685,9.160366965304975,11.925690293680955,6.227572925273233,6.672020908622514,5.2979739895156825,12.76140721544466,7.147111760999647,7.340666908840268,7.710698657451074,14.687597374726103,11.205518906081942,5.399094896243087,7.313817574566399,13.155956201264987,6.947920705486452,13.454486315627568,11.052337904868867,13.76414473811516,14.639382120993707,13.883907983916359,12.417351113144788,5.64207853122185,8.057860002131552,8.856456177457668,13.691256024551386,6.8033417106631955,6.6839624358968175,5.301606515279175,10.501959972368539,5.040582263188906,7.305294433002554,8.939617490385869,7.185459790926227,6.220028512171012,11.960231985614367,14.073149578681575,11.48593611251776,12.424203576706972,6.7536115271600465,7.005264781654201,7.0842879453412655,11.08851834215326,8.261348580404439,8.814744287327475,6.552560950630884,8.266049666833265,14.386669818545911,13.823542231014699,11.101571021623611,9.473196216233335,13.235674994485514,12.111973446542496,7.84681860869979,12.886448079934604,6.684698694466052,10.968486160440222,13.744411276128403,7.727636030854166,9.11891958638892,5.33145613610716,14.09226914528375,6.971672807294905,5.736915855692777,6.082710366722239,8.308439646792413,8.107113678326623,5.946024451517154,5.495273473220516,13.851876451845095,5.107250780240291,12.785821444185208,5.105350671902982,8.79224306293587,8.780220630055132,13.507423853223624,6.12095223530787,11.347999470539945,10.510229209892326,7.6850794922757775,7.754352890383918,8.840677391421607,14.913212639095052,13.124600945970888,11.102062744646954,10.125077419805875,7.498776781423131,5.590314237896685,5.218835078334663,14.261577469281514,5.975862964543626,9.17743678703168,12.123808498248543,9.846963680392797,9.521049480049996,9.657687903477672,10.621862169812852,6.056455837941899,5.862393691691496,10.180598310519116,6.742381902610757,6.760928595330958,8.82043005536037,11.981006440328887,5.672179738395531,10.12791643374976,11.400071531759547,6.659151240066441,6.629280576745893,5.228934586407547,11.368350550608184,10.492606510914644,10.545120813251321,11.925841527564515,6.906116782819631,5.5046144136017405,9.419995576159524,13.170014543614041,5.454028549887784,11.651939324145024,6.952866634976351,6.677060179603012,7.23604608037647,13.009505662383752,13.235415719144179,8.12263806759498,7.880807773776517,8.19975850000636,11.503314929171434,9.278759465708417,12.106274420276469,11.873949812512645,10.344633639677415,10.936981825859489,7.71391377177522,8.6072015326054,12.391030764031022,13.84260762633364,13.981591926603276,8.325971411182266,5.846343365728823,9.456781584356797,10.847470839058815,5.610250260918952,10.906326940141977,14.936367536583056,8.539616375223071,8.128801133956268,6.247394878433321,7.976503920269322,14.43926488365652,7.101504661176909,11.884576028268093,7.82666835098177,11.863310932869847,8.1678127500204,6.6584203669370705,12.667483791531541,14.337121191011654,7.714639648909587,6.7028169208733495,12.89691662321949,13.750511639517883,11.178541258677539,9.433068759446638,12.610289617276347,9.11174456214434,13.931217548987734,7.041879316611297,9.060069429207518,13.81667001128198,7.438451011925455,13.160667249760651,5.2329352224063115,14.532325454996776,8.57998615981564,8.018311220405177,11.453501090346283,5.700006103056998,6.200507763571947,8.21359605056031,13.435113092348324,13.198662919911001,14.293699168770724,12.754514390732224,13.541473728275601,6.882673955414322,14.942278282883345,6.095253126284613,12.217033671456283,9.95275086558703,13.95000456574836,13.458507575006882,5.7876575659917195,13.848319474526589,5.532583154463895,7.312663090066209,9.029060097235167,12.000240235936728,5.785362708926254,8.17360352340543,5.119554124373167,10.662959252004068,11.243660319836204,9.466843404920894,9.654996918711507,12.051492456171571,14.978339430169177,5.268073173909835,11.27419112821358,8.752532270882899,9.531286424434715,11.464644930081079,9.178415807214527,7.498575914129633,6.960641792088069,14.322888390519886,13.33486579424472,6.473529041380521,11.858323971382392,6.2950790812004715,7.265457352927767,7.124675178875004,9.21602835185794,14.749933942285619,14.301804495512478,6.792763604771171,12.963469907993378,9.323207140832881,8.753496942712767,10.69161602859657,14.310239181831658,14.627981553854262,6.79446237714461,5.142494183375865,13.008663352468341,5.732307100388865,13.049917073861474,14.092825836280108,13.691417798221213,14.817270955241366,10.274033308039217,12.64022689404187,13.732176519751022,6.077449883798045,7.368311673382895,14.950025590776555,6.856371613566978,8.17966763744716,7.314432919579719,10.66835629359919,8.518691342090074,6.839436509406182,9.096543195118766,9.007938670836758,12.599686832388077,12.334622064748311,13.198047040764624,5.986215606091068,5.899657821396991,13.345232322778225,7.291245695755581,10.336710959420632,13.988516414827181,10.755300508442415,11.833646205689128,13.337100625452829,6.419668266065191,13.992425169635464,7.998995593979723,13.278892211778333,5.811394974288557,11.843988040930238,13.721099529046143,11.266702734167522,12.373371515452778,10.601626543576865,14.6630471824143,12.792303836458622,13.624362480905663,13.271331687789328,8.18484695363719,10.762353013297412,6.849061909379568,14.391534376045406,8.428220810600468,5.548676553823777,13.564626548052663,5.421018226864649,12.487773913208615,5.367712027493273],"s":[18.65439946317006,0.5322828396901036,0.5784624702972563,1.4809918231195995,11.220861789921361,18.276380709736756,2.2245868474192587,8.387832670944334,1.8059249475702188,13.642448512055587,2.414796249829587,17.39617235996097,3.6351218481821768,8.402155275400474,11.342699921342083,6.689698476949477,17.213082116937347,6.284662726102392,11.429353282232292,2.7647858217920662,19.465287441643714,12.816460819684563,12.183474327271174,13.40151980125352,0.06247439364239327,4.566558185529166,4.484865798173576,15.68647777508641,9.74241935462867,13.865645310616287,1.4583857787454457,2.619205184387159,4.4250278655006525,9.732437790326838,5.487184783959389,19.83574915413684,18.84064384841988,0.979284118254844,4.2951566558328125,14.80314141485878,10.856263931482664,1.483220069563389,3.0111200010152706,7.9579525230173065,17.048962416505343,0.31879456351500135,14.182770388508033,11.02114211361869,15.221654965034865,10.419050767969612,14.167404142108197,9.541012886905458,9.456321602280342,15.706064076657702,13.987010999965834,5.986076053466083,4.8075757619783355,9.825738013508062,18.620764094856824,19.99646391463982,15.966409121632035,9.460987026713997,17.09423435104634,7.3243126901486555,14.014177570736246,4.393047857168075,13.077504618175793,4.9874518178321425,5.857629531530031,13.282340352696203,19.887228113669664,16.18610704557848,7.6656812001725605,5.858308770292697,18.451877015754402,13.632202102839717,16.720737432370388,16.55421162071763,9.032810409410468,5.977359742161834,11.268339580052839,7.2084990107770075,9.42043393728088,2.152914940877566,17.073351896970117,18.850958297609992,2.1620822853235433,18.49532539125976,19.43029169816213,12.023340042461946,0.8697041447053211,2.407305663428323,6.356466314854683,8.622731409405308,16.3024273754162,18.355984578560363,18.184639867091906,8.097620153992317,3.7440832538890634,5.545500025290138,18.58104552557601,8.067453956249228,8.395196111623404,5.345537727077483,0.24464807862316196,14.192345690056566,1.269331376234013,2.048341548766812,1.4103377498151382,11.799988393829807,8.652242888446997,0.25708483322839815,8.647397317658093,14.47476043458638,17.34745721424625,18.347159534621163,6.357402128928555,10.959277305289113,6.287358469745894,14.246138462059118,7.704433658550154,16.853285432743586,14.363522220960423,19.97577893420796,6.9451348240383615,3.822752992262357,9.051104672825282,15.950261168446609,10.619239593624844,1.2736432943456322,8.438544852148095,4.919320889060197,10.083214867505585,7.818057640775455,19.559740191084245,12.88305174728877,2.2758719910268255,0.4296758122873712,5.514989971282125,18.80465444048574,13.07095754564983,6.055901614108734,6.085133444413784,17.148438784338595,15.142730487313841,5.8213186176919285,0.571662658337857,19.492612995876723,11.334641707064229,18.922769227626954,13.228815143510978,11.736017954191894,2.92547560850819,1.767493505783544,11.46585222739121,8.525079480824363,5.106836788938156,12.608308476960858,0.9438977333758958,18.428061525986582,19.241707691244436,18.276229116406,9.01899661251079,12.2259072130718,16.04291289910792,4.664691150447697,13.337910259633494,17.70134067400037,3.291621633422923,17.030129435033423,1.1083434390952451,18.005094095585452,11.595320299384987,4.8218652730399825,15.319036157699264,2.7841977377415095,5.222962331013257,18.68288738527066,16.78202987908747,2.165303191413668,2.1689054926910156,8.859185561222915,12.990742245775667,13.870213327184388,0.8967130165752968,10.136125564433037,16.99415094360897,13.504935103331434,0.6530630751286726,17.39823637411086,0.4978610592981525,10.242140918278725,14.660599248739747,1.4035123805803318,11.91051111044333,16.22858800471917,5.638172035931404,19.631328783526165,14.662486136603889,7.824107877536384,14.022745798488936,18.38716629264011,9.174152804586143,12.594679007540442,18.701158519342002,11.424925155088182,12.445068470878384,12.955565107966866,3.3308647435975125,3.906440303813481,17.949655904142027,12.957570490959732,6.605457329917419,16.30440539803814,17.987939191288113,7.968501062910285,11.705379392291078,7.601747128029541,3.0327152999719953,2.8878648466919454,10.461548190811968,18.90789519524656,13.476077740562262,1.4077058839622936,10.74309581326026,2.7256846890741304,14.094617467419166,1.766817591884542,1.2406790079819752,0.9502189665751848,2.593127546204377,16.57549692895053,10.317658821794687,9.44692930046978,12.30387870549416,0.22691996544849324,16.453425119664786,10.242397155746552,19.74921844693194,13.416246449392265,16.848176207241117,6.273713282437643,18.008308971617303,2.9355444491787797,12.403188655516342,7.339413164853332,1.7818986511076718,15.753046032153453,10.287495026780089,10.942103748999275,4.797002274560516,6.962536861931206,13.646114915790996,18.02928825332316,9.259373749333474,14.689851088110837,19.13491153073149,9.162219622997156,0.2788802362889875,13.848298837496529,11.463596874723226,5.058653992799238,2.7031013377828605,10.99870788670271,15.882362133080141,19.61224553358475,5.931322994079449,18.688419865695167,12.731788989337547,3.7690021722444067,19.920933332574577,15.062222604981512,6.9307394485983576,10.463434545177375,16.726868495468604,18.838675644880254,16.421868668696025,0.741743950528555,4.34757282537424,3.406552559361913,5.770227676364765,14.97872162931571,9.777260611929602,9.026853969071919,7.717174491253562,14.7201433500415,0.42542443029492283,5.787553102317973,17.12581068267141,8.946404050982713,3.4578049553550505,0.6647399435151513,10.743611190005895,7.5631675493811334,15.819832335993983,5.633355779875964,14.38932749399286,12.211457433801925,6.332739829402931,14.194551726432344,14.08709783402172,7.828771720693792,5.010294218248723,4.305706677933854,19.53944238008968,10.041556531255921,12.704904308051397,0.07034466986160837,0.3791015720544255,8.71738590675462,8.778819407839883,6.889564132585346,9.031532107323619,19.367646692871716,9.514659954116311,0.10603754325778869,11.010603656556004,10.458306189251093,13.525136281316957,16.243794613883846,12.836929581063657,1.3967769010454623,16.81437416763074,3.902498600718265,11.672471230032837,7.257827280157123,11.436851029366908,19.04472295300545,19.777801696924662,3.5399418419359563,0.18259757260392195,19.04978827444903,9.29583306601626,1.8459064587695417,2.330574891364421,7.006251747995287,0.5959697828788535,14.789928340931837,1.6914472039504025,11.412828375754035,10.379881574186918,11.201695143568134,17.460704563680828,2.1242792155472623,14.630980579182937,19.564382997190116,1.610382538654913,4.399593518297489,7.983626501066428,2.554694682505607,1.7734883481129682,9.112331196107446,0.48449442140225507,19.90485742172091,18.58599665726123,6.836404640758422,1.7967342825524257,11.655555734787079,14.44449217458327,17.462729971308235,1.047195951382851,2.4575987804743127,0.7933637269353744,17.829168880648275,8.743464815311217,7.636723766135258,5.115430241714609,12.504715354804365,6.549114105577161,1.098471135415533,17.52056530689497,18.462496217991784,3.0768164334100634,1.7192042938963414,0.08611495954228499,15.335781460272893,8.60602262059961,10.17581592540511,13.300622784670374,14.866250615871488,8.624655722949441,6.846337028262277,1.131854120901128,3.6421989013660117,2.9285354572424938,4.270041491409464,11.29153830623089,19.123585310483055,5.604822511605114,19.105482477782317,11.344564329008975,18.36519316852689,3.505319231547852,12.92723092693219,4.5392840117643285,15.318147320178479,7.380422800552071,0.45033757192471047,14.53382527234738,16.42178698634451,14.04247894031144,4.471430676918442,5.679436510927687,15.807516907715753,11.867485166029393,3.2791143630313746,3.986787669078522,19.09292235979739,11.168436211705885,1.5785501915661238,8.32398781868157,9.584054265955517,13.173191066118658,19.179354341148397,9.6947120569497,9.99844075482018,5.997777633988743,7.805292736937979,18.562821188989563,1.2030126007244935,16.222009977762717,11.349082594269078,17.44321909713983,0.26221193770858076,14.016286968573969,12.886253313764753,12.783437304654438,8.019465352859903,7.997640139449875,18.529287907222205,3.355445171511171,4.78426863321979,11.52540038836856,11.503876400455404,6.170504759677358,16.91676058111769,8.779465130686397,1.8041233521905786,9.304388419479487,9.355026536488236,3.2248672737571438,1.419622619725871,10.659545048327805,11.701031256747779,17.498891290018406,6.45213946252893,19.421726745597677,11.239946145617473,13.11963007164534,17.611860732823978,4.228619150411466,19.257581209134685,7.805337684190317,12.126980540840906,6.605665088438486,14.033782084752552,0.2351965166803982,15.567902601734357,18.760447676570877,4.795666816610034,0.023561873394695176,10.950588852590881,13.21998036719604,0.715123006391325,12.392220986214744,7.640698758113036,7.600207387221505,11.308426504953836,5.292685245995701,5.9191928149539,18.676114522448678,8.543544871749521,11.622766467446297,5.006777506941527,3.928619856120079,11.171098521916768,0.3006740564218857,12.33662846347718,16.243165483744228,18.143980094852484,13.103838418844077,15.587605379058061,13.76038704554405,13.254989046686308,18.535404680184122,1.1745351271450222,16.015856337477015,15.305148307984933,2.728228588732713,3.7637537060796955,5.771666036146739,19.96879423609201,3.7105471174787574,15.741174398346928,0.6538140419144245,18.582544812294724,13.638000900804519,10.42504124697485,11.768325956124324,12.629844792117861,3.3629915273955335,13.877946299887135,0.8519904300066328,14.18575595155195,7.676595954442922,15.8963675925661,9.891389982117849,5.073174567558185,4.853146659451544,19.67496037269884,7.3685096331158295,9.453502726333763,8.618034958426147,11.205604508430419,13.105812784510258,1.5692260719984352,10.076341181465605,19.86885028383729,18.279140900925732,15.682885524012335,13.047644224463713,15.477749518558511,2.201409980609861,3.670800001648926,10.874812295273859,9.18194963816292,1.4242733337739555,19.44872434296977,3.5537445112807564,15.258088062064083,14.442661238107014,7.218308517839511,9.333975221781303,4.519597111334317,6.158776968849429,17.742885879343003,2.639415197095696,19.11295874781128,6.258097642753491,14.800145595351154,11.730460105801264,2.589844439897626,10.788258502595358,6.3895840140800875,17.21420643097123,11.71234840642757,17.05973496701921,16.710731065803998,9.980622594887452,0.8866164255148812,1.932352381842195,11.924034014077849,0.770107156195805,1.2699300482838183,17.429630998824216,15.717197454944687,15.265320527585526,9.67895228663933,2.961915699334914,15.737497963459752,1.770992249090817,18.881433736406468,10.626827629374297,13.112414912643985,18.203110826779287,17.946645908709446,15.45328323896741,12.370195221985124,5.139180591190611,19.07405277365359,3.024936782749199,19.67453191072508,18.936458456724232,15.504327191874188,19.008754562839563,5.120322469408891,17.953634902941733,11.704386442023157,14.638754434133121,12.672979747244145,14.232216082131096,16.063603417712848,5.40000594337299,10.827815140567761,3.128410052964843,17.663678861646822,9.285766040979917,4.026841768235507,5.164466318604752,18.47195219198049,1.9025762407992053,8.190369096633429,18.92801688024163,7.051261520476477,19.251922721989054,17.398814691328525,15.093973800994917,13.377514455741558,0.540245649290787,6.984608585567762,0.5484926742464769,5.199538373917796,4.64430558490486,3.1651560902614495,12.513710628992714,9.951192204487613,3.9456110254691623,19.823499124306004,10.060506788218216,18.23678829660563,12.022530460616343,1.092476002702325,14.925947258925234,4.042841469997764,5.037484462937729,10.409909134048618,5.888493668730046,0.25998190916505237,7.346146043228248,17.067718065328382,2.0608878068050984,5.2743522069412,8.27947499411087,7.869695105316592,9.868715203684673,19.543825300407505,14.427319552391381,17.628053958162994,18.734601086148523,0.5828402949578049,6.822018811899895,5.97421042917154,16.782860285430985,15.114262420351011,3.023111450438778,1.3485936380906738,16.537561020076787,11.181593573895068,6.574930157818066,8.432784965775028,1.2841907386281948,19.933381947478072,7.662822123666673,18.062566834997305,9.028620110539576,10.6413127139942,1.0460979458687802,16.302501942221767,17.615393248135256,4.580442943478311,18.190003381865687,15.696658038975961,18.00937568131383,19.314668394476534,13.558412617102391,8.853371670726847,14.802067191387325,11.156329473101021,2.3364167206924957,1.0522905036668107,19.611336121853448,4.96906356393183,8.223687993369726,16.657154980182103,0.19220771968949446,16.1141091935248,14.95724255159697,17.84686738384844,2.1277379536575802,10.205571697946478,18.291313710462013,4.55556726274553,7.6147468729977685,7.980694218095441,8.218372911644941,10.35517430897842,0.9754614788249372,14.814816490462697,19.798645159671135,16.21061565330104,7.384505470349723,7.568378198443786,15.292361116074611,12.788290102155946,8.29473423127892,16.21231050515418,5.247824648213264,3.7684849257704656,0.16032791378443267,13.248430690276543,19.056733304728407,10.695368396670887,14.314814928202985,0.010146422887031825,7.163919034989434,6.937644307995581,16.44739264466544,16.300890212986587,6.437550051200853,11.950265575920419,17.76942508692994,2.92148439028054,4.372954025327842,9.600301204984838,0.8784934831139202,19.54084041400599,1.6974987794046603,1.3525934416734353,17.95180042454621,16.306886052599957,8.888551030267354,0.5104609715103825,7.995550514027356,19.354626025394964,18.82513181592565,10.063415533024877,14.66167391914646,1.7855527970416096,18.47748028392115,8.659356973859653,6.173615440917248,17.240818339362068,5.526821282838235,1.2946683572023154,14.178193548882376,5.839376800636251,6.701696150999004,17.54530612861542,12.175944135830594,5.823527014921486,4.544086175936162,19.198041719806483,8.057368523669561,4.88058165214837,11.157671633186474,15.09689567967583,0.24298044751736025,10.773416409629895,5.052395250597219,13.058869831863298,15.055476978744942,16.17141036770483,19.641077345694562,12.284506363052117,9.777796978563709,6.843647173205145,6.785975769111876,14.212215405046988,0.34120791715921417,9.809197455003043,19.38332527716377,3.893106182528916,15.744330120419132,7.60209118361082,4.05858896219895,0.14122919946267576,3.290121393490124,12.652752341873699,8.853765211343493,19.472497845086746,2.258370516099202,0.041868368758013474,0.23046196505148941,0.6110869073915515,18.152001583031353,0.1520251392354055,1.3548482212712054,9.858678611734547,13.299548566359661,2.382796903342892,7.402768909925732,5.774040347192515,3.795765065629908,1.9175892840012976,15.487730493337693,7.28646444748815,17.042102101307243,0.3869149564386909,7.505345122423885,2.711181737906765,7.252203613365031,15.031432097718387,10.188824746160332,19.492095677791745,11.486202973669348,11.326913035372442,1.7458028416125426,8.493581650139607,3.5670319013176277,5.82988200656239,11.581925626814126,3.4125975235950756,12.903613187990878,17.61646844190946,4.971355123315853,8.581682550593793,8.84144315806774,11.27175350008891,2.065981537506252,14.160020183468593,19.063886431655117,10.297434214376896,6.835484743441338,12.417355310698861,4.952270571872299,12.492037413175975,11.0594703444655,3.0441654313454514,2.22674190307504,7.184945346572356,8.418472334616913,11.046890028234827,14.526133519029493,2.878413229281054,19.928246586078995,3.8593465925706294,15.860768999972695,4.625943145358176,10.10273575164022,10.983716042883348,4.132224399495423,11.321741558847055,2.9633222142708426,9.52813678760712,1.4185365195011013,3.254538459935379,14.048229100001087,5.386624576935395,8.03078219843307,11.955060836133583,15.405001532426002,11.137413982084015,12.533005055628097,13.18202149622869,16.03547155761907,17.25739716141849,4.259530949636625,9.340187236597055,2.773931330292023,19.743472661239053,8.063419774158067,6.794949210875476,10.839047235805639,12.833973503952315,0.7409384685478537,16.998888632450537,17.797671518408393,9.35904989072033,18.676198262828404,12.234293434961533,13.059617901482397,18.642453575695864,6.268777063656095,6.97425172164595,16.709359523924046,19.60451947098107,3.1469844252944323,8.92715222845431,16.577390001645497,8.050050727658391,4.658080102274771,15.55757646472577,12.414943367490068,17.47457115333695,12.617141315359328,11.089256824931152,5.8512575213600915,10.521744586315958,19.441545503740358,16.34491364600167,11.373899749778694,15.512083207608658,9.547954838815365,2.7182138601277206,6.843254346836791,8.113009887154625,19.394196098655488,3.704871383875572,18.20351089453974,8.536915360249871,17.176804575798013,1.7984164179017892,18.786899792579653,3.8622655042104492,6.437704064458836,11.920402282021247,13.21496394022076,1.3773902793825687,13.001177391640134,10.308282505332723,0.5330503906633854,17.79528001185209,0.44526480233340937,19.324563975121094,17.55793085909081,1.0393999584748492,7.125251784965276,6.439812806864533,5.316009391282717,7.5928897182790855,10.512468244605104,6.206845595516803,4.112496098063825,19.5700214982324,19.319388412867436,17.74767470181038,0.8247543521365674,3.9258223517342117,2.1444022679094976,11.071987328684783,18.39000434749833,4.3056113862351975,1.776937838209811,0.9982910295055225,13.102445382034,4.329794591226173,12.599084621298541,1.1653694380932311,16.319129379587004,3.914670045989741,3.3338837466532834,8.618255763461043,12.763572081175765,8.404253434020838,0.18116633252836856,18.826883239822042,11.349386833799148,10.072185863245142,0.6718088436215242,9.602851559996072,14.490009578544285,15.74582727758898,8.783948768977282,2.4634245318755843,18.179836186597747,14.997027625732354,7.129829832077879,3.2199468072041615,5.821089531554504,17.35354006451995,3.505342063394088,11.092901218010724,13.289488027827879,4.227649924545713,0.8103498045615343,7.826951578574026,17.340968213482228,2.525550428386185,5.777877745050342,10.140355296638223,0.6250461707612498,0.10607102202264684,2.8938451900492757,19.61115688214806,8.397520798173668,9.017680390404328,13.147008119156824,13.254422001473497,3.8268959490977306,7.532337445715407,5.67440516319357,17.997838915080315,7.358828114543803,15.494828921918767,16.02149653431841,0.013640220235298095,13.887517883072436,14.39589846518691,9.127888710441532,13.56508787679096,14.236700194789318,2.9203682705126566,2.2903744468808362,11.226869178436797,8.602345529751393,4.346717438297367,2.565599926891906,7.154416770769401,18.81499059948688,16.10654876030765,14.296494863005357,15.14090471965348,5.69946036288401,16.67504893242866,6.6516912169646325,5.501996820446053,10.89537847131747,10.502776362282717,15.73125125319045,16.80997039556243,4.299284799551941,10.70770382634301,8.512301786085166,17.111413369580333,1.6197012342777928,2.487906123185857,16.66927848484098,5.861456489628489,14.06023589822424,2.582032875204434]}
},{}],54:[function(require,module,exports){
module.exports={"expected":[-1.690205309214644e-14,-1.3421416745084627e-7,-0.19232765283668077,-7.699243902049472e-11,-2.1172035795772382e-9,-0.0006098880914194787,-1.826137120630705e-9,-8.435945292551809e-14,-7.868789302051742e-9,-7.2294104466844366e-12,-1.0963599213932962e-20,-5.2331352825991545e-5,-0.00025384958929624933,-4.32091261138782e-14,-5.174849541748544e-10,-7.497878928243946e-14,-0.002980900054445282,-4.648959193789165e-12,-1.7109912051479438e-12,-2.2839041139110566e-9,-4.3469635242213066e-5,-1.3169096352049704e-14,-5.792997021208803e-11,-2.2388009114159452e-10,-2.583331941863378e-13,-9.399539730908082e-17,-0.029256531354013383,-5.169125492006286e-7,-1.174925803045466e-10,-1.0307163605901535e-26,-1.0874011016016323e-6,-0.0024615424222840794,-0.001650723470149284,-6.828467207740083e-28,-2.346292082275414e-23,-0.20322712333937154,-1.914896736876053e-10,-2.4093719151285626e-29,-7.881815202056108e-10,-1.7425833895542206e-21,-4.681634723057735e-16,-4.242236931617469e-24,-1.0027938936276414e-19,-1.2470721252865221e-26,-4.5771431911069375e-12,-3.7052112591590664e-7,-3.9128027434716495e-5,-3.2028925039036095e-6,-1.3061797583369421e-19,-3.884055111212641e-14,-4.284819250774818e-11,-5.42198650287391e-16,-1.9763509202661246e-13,-0.07013444051615927,-1.4600680422873332e-25,-2.4766174390103006e-9,-3.6815744185281895e-12,-8.207270654347179e-20,-4.017726805011311e-8,-3.333707509464449e-14,-2.6075410887086412e-18,-5.071595624978628e-7,-1.2853843909958592e-10,-2.281734802600331e-11,-1.3598774458006973e-12,-0.010397604735810783,-2.9921408419957084e-13,-1.026179951905912e-17,-0.2782181154138961,-0.5409809927339134,-4.7619774479044746e-17,-0.1701508378381274,-8.644313807783013e-6,-3.7224115940048056e-11,-2.115877874856971e-20,-0.05691770472408806,-3.5408858046064393e-23,-0.004736856662393087,-1.0659445942411957e-19,-4.2255506352513915e-5,-9.145741412954265e-9,-5.144985649957766e-24,-0.007707152648698907,-5.4381360605151514e-11,-1.2086635462146636e-26,-1.1844385413971105e-34,-1.1039361411364319e-5,-1.505559448068175e-8,-4.0528552010766116e-15,-0.6098204253204437,-9.71301173668873e-16,-4.381966654018791e-12,-2.355709013098945e-16,-7.336569509589097e-5,-1.2507872715611328e-8,-3.3937975973838907e-6,-2.3296100398708426e-15,-4.006782735260915e-15,-3.4506174311737403e-15,-2.9765050218845003e-5,-2.1937949522440217e-14,-2.5070448746556143e-14,-1.0240468478426352e-7,-1.8939647477626975e-9,-1.0281213310311643e-7,-5.962696165517412e-10,-0.0005543772007582256,-0.005871014412437266,-1.7545216048781252e-7,-1.0389878319906051e-13,-0.053011804400815106,-0.017585145958193965,-1.1742836030191407e-16,-3.70371460925969e-10,-3.091005718882534e-13,-1.4529568735854546e-24,-0.0319530814313458,-7.054912007080337e-17,-8.650875117006362e-27,-6.922546940759424e-23,-5.6475860356825e-13,-1.941010200582308e-10,-1.0664506565745866e-15,-8.561642784464389e-12,-5.420840487671546e-8,-3.263516870739791e-12,-3.4052544602656744e-17,-1.1744450895087406e-5,-2.5819149006319238e-11,-4.747933043995395e-5,-0.0044889937322653796,-1.7959225074501756e-16,-6.124976974968055e-10,-5.249110494244079e-11,-6.397417118201516e-8,-7.156414621253667e-16,-2.9122849283155844e-25,-0.10627676669057817,-0.0003206480689403752,-5.0654075700943364e-5,-4.2927947878166004e-17,-2.1287144365098073e-12,-8.519121089871505e-16,-2.228923356409349e-14,-3.17574147652796e-5,-1.9549464696266104e-6,-1.913599285758594e-27,-1.9725423416847985e-17,-1.8034481606660325e-9,-9.827199833956149e-17,-3.12563529997994e-6,-0.004176552338929638,-1.3779557021526086e-17,-2.990157950713931e-13,-4.160929900281268e-37,-3.7200386579945963e-10,-0.00021031513994588418,-0.0036181871068062064,-9.329382143259917e-6,-3.503413244233312e-23,-0.07990350988035765,-1.4849479753538176e-17,-1.6044919570283356e-11,-0.011056417615214108,-6.894619049450059e-15,-7.95137336173668e-20,-5.5607488906231136e-11,-1.3585913093927316e-7,-7.130075993594698e-12,-0.004168212228390704,-1.3400246553338634e-14,-3.502947702651435e-9,-0.004194093959081256,-4.394607243040887e-11,-2.711617603101975e-6,-1.6213931624934528e-16,-5.034072843214346e-18,-0.002909831113420649,-1.5379362597035704e-6,-1.2014772282175873e-29,-4.294317055573891e-18,-5.471547010581847e-19,-1.0606942615426174e-19,-1.0127709715264703e-5,-0.0020766732571878893,-0.002982695749490816,-0.5832901030962437,-3.4256913236723325e-6,-0.03259982218733288,-4.486816049938514e-6,-7.20488016176953e-7,-5.259559715580749e-13,-4.375208259284391e-26,-1.213741428345309e-22,-2.0929325673232828e-13,-5.2965540998725866e-8,-4.9939479561451897e-8,-0.0463271404488667,-5.7571331718618484e-5,-1.3907602526535803e-16,-2.748886622751214e-14,-0.04319538711839717,-0.004184169381866796,-0.0022591247591229663,-1.9120049266397985e-5,-1.665559435454651e-11,-3.2771631424014176e-11,-2.7913472104869244e-15,-4.946638722722308e-11,-3.438081222076876e-15,-1.3274365482309137e-6,-3.8952132432731285e-8,-6.884514478456929e-41,-1.8221002269681503e-17,-7.544901586878099e-12,-1.011138194377806e-30,-5.601710266093341e-20,-6.903756420866933e-7,-4.727370136219177e-19,-0.7536996199241216,-1.932098385395918e-5,-0.0003587029526499571,-0.00923106426247693,-0.46621285419298947,-0.0006941066916687327,-5.367451525508696e-15,-3.2717280206598425e-16,-3.772886665725883e-17,-0.00014266244386852047,-5.6022314741818495e-14,-1.3229384854706843e-9,-0.09315444942624074,-0.1766919640432366,-1.5823762054658567e-6,-0.68828640644705,-4.477399430689119e-9,-2.5849530565160006e-30,-5.584878175741063e-19,-0.000495208591377019,-1.783232492448838e-6,-1.2082836397263135e-14,-2.4896583436174132e-26,-3.9608560230700874e-9,-1.0771358555987473e-7,-2.055853505573279e-31,-2.5029836068101146e-6,-0.26361924427310446,-8.439539598069654e-13,-9.702053797434035e-8,-6.292900615190023e-11,-0.010839726436444323,-5.660648120015214e-6,-3.238305750872816e-8,-2.0045995996624012e-19,-2.6814263692168773e-7,-3.0406473187565363e-18,-1.624177888554896e-10,-2.9030328052666533e-24,-0.0005328129783915073,-3.129889101202668e-12,-1.3439121476425893e-10,-3.3110413576315754e-13,-1.9635895857689264e-26,-1.2330855003058474e-23,-2.7490157623836305e-14,-2.6316863464394036e-14,-2.043055070346356e-15,-1.49957239506825e-27,-1.1446827863300227e-14,-0.0036677011633235025,-3.838647381260685e-32,-3.400739708252675e-8,-2.702197798845313e-8,-3.1058156319420536e-7,-2.3348375654200743e-15,-9.257392430481508e-5,-2.9563484909163604e-6,-0.0017311384774227692,-2.763452615895822e-7,-0.03528430309239,-2.4438045390980385e-14,-6.203612767481838e-14,-0.0685825527150007,-0.08841401271908629,-8.541393140511723e-9,-2.148054673173836e-15,-5.939751097775729e-16,-1.2907178722597802e-15,-4.636379145846915e-9,-1.3059884719814694e-12,-8.264078807741955e-23,-0.00040844259116942685,-0.0003283557848991361,-8.810513020686415e-21,-4.262831564459142e-11,-0.23933637848172032,-5.769217470269191e-8,-1.0496772640983398e-9,-1.383019734076249e-11,-0.007369521982555003,-3.1155179068681604e-13,-5.505821467128904e-15,-0.0015405321700082283,-1.3429457503625463e-11,-3.6989508903919506e-8,-2.1985116233562534e-8,-1.5577149503324059e-18,-9.932733607094154e-12,-7.882399796878055e-20,-1.8094373294366068e-16,-6.548098360172382e-8,-1.6223158756442307e-20,-3.6983539103781646e-9,-1.2056588059319675e-9,-6.011746808487785e-23,-8.111942626582141e-10,-0.0007155830910397603,-1.2037949536781814e-11,-2.098521181248652e-24,-4.449405814800359e-25,-7.025691498674141e-15,-3.9420097437493427e-25,-9.62294816786526e-16,-5.687221709540385e-7,-0.0001611334334805321,-8.34517710235581e-17,-1.0373034952848281e-22,-8.109711164804401e-37,-6.886164467082228e-13,-0.013003827389132975,-0.07801606560080375,-9.060197004646005e-11,-2.027947012491116e-14,-1.01751795770061e-17,-2.2980406441696876e-11,-2.1420434269725355e-10,-1.3874461007178977e-6,-5.7431820517577256e-9,-7.890027488883366e-17,-3.5035744382853775e-11,-6.779635265622532e-9,-1.4511387895719495e-7,-0.07976783941494106,-0.12742679094761872,-1.445791319203395e-5,-5.0112254096815736e-17,-1.6682447135834084e-7,-1.1331404999446731e-8,-2.1988651429199758e-21,-9.484715151498811e-19,-0.0016548993133140536,-0.01369541843955155,-2.5587521746237927e-5,-5.776068101011748e-6,-9.515066503072034e-18,-3.089801612502468e-5,-0.01695390541980259,-0.009654789630602253,-3.6031939311216244e-17,-1.9080330484950945e-11,-3.249452431636098e-9,-2.0528782277197903e-12,-1.960192289782103e-10,-8.047301534999678e-13,-1.0761917205420512e-22,-2.990609127737807e-29,-0.03022846680102417,-3.317280922478981e-15,-6.717181753067068e-18,-1.4426682623304277e-16,-1.487292039300012e-16,-4.1915490586867817e-17,-5.597889951696712e-16,-9.751063083318008e-7,-2.5292732197473373e-10,-7.521025231853671e-13,-8.375431812955204e-14,-2.2987000158459996e-12,-2.2470802375827727e-25,-0.0034293278488885686,-9.760425826840516e-25,-1.3334529941745922e-11,-7.81451890760982e-19,-0.0005742360888946246,-2.641745961330467e-13,-0.002440320724279747,-5.375017705098877e-12,-1.320668054596854e-7,-8.288300200455045e-16,-0.019563505705511623,-6.252950203221266e-31,-0.0004949536676234415,-4.1201072195141876e-29,-3.5435826023311336e-11,-2.20347987449271e-5,-2.7880095893062584e-11,-2.029571033575872e-13,-0.00033197303666612093,-0.024937550814647835,-4.3657859109497466e-7,-6.891864741562059e-6,-8.144496215359712e-13,-0.013799610423466231,-0.0003850140194442492,-0.05725500578469879,-1.1307938421699288e-8,-0.07666443141232161,-1.6905381304091362e-13,-1.298542991885971e-27,-0.0010020961507536063,-1.1360765853492367e-7,-0.3844234893201941,-0.17987533758393381,-1.1364936827463817e-22,-6.209518084242767e-13,-3.31491914638312e-11,-1.0629757109621104e-19,-9.195571102509167e-9,-3.3822780923146083e-7,-0.002379436886630457,-0.0024815609248685136,-2.083765266018948e-7,-9.426108802583367e-14,-8.116739362044392e-14,-3.335571619837479e-14,-0.00018752284141577286,-5.0363530819000076e-14,-2.865205038073535e-16,-7.954925222915385e-20,-2.2804019143873972e-7,-1.3005563135687412e-13,-1.6947597420729594e-12,-2.9457270861442006e-5,-2.384409287019847e-23,-2.957089710131584e-13,-2.256593075829415e-5,-1.835325174648978e-20,-1.9163466532304877e-24,-2.346596360912937e-8,-0.00017532295687650156,-0.07803830644361884,-5.1746313611659025e-14,-0.0016964918378271766,-0.23928801750452225,-3.2795658238873575e-18,-3.5899308127965075e-11,-0.0008956659045759722,-3.623989699603602e-12,-9.827370931376916e-21,-2.226221556312808e-17,-3.4866582448961546e-25,-3.3335894139062597e-10,-0.010715979005126733,-0.005223523447687175,-1.6875339217129332e-17,-1.2832473869583384e-9,-9.26062382132095e-18,-1.8228298048965472e-13,-4.0948502015367955e-11,-5.712221531087369e-19,-1.516615682552566e-7,-0.11574377608165408,-0.001342130553229189,-3.955968322629496e-14,-2.518216901550438e-15,-3.853116068947895e-20,-1.1575279269629292e-15,-0.011975708745633293,-0.0050807890384077375,-0.48976371081266995,-3.264099936196931e-12,-0.019064780029898823,-4.911253274863434e-35,-4.168357043099747e-10,-3.0245745035409543e-34,-3.5561824178617967e-10,-4.613343441555475e-14,-0.24740398956734813,-2.1460517844393754e-19,-2.5557352089588614e-17,-0.005522997659140438,-9.957454320870307e-6,-0.0010590957599303887,-2.6523661471519704e-8,-8.637245643571365e-16,-5.377506056174724e-5,-1.500852973791534e-7,-8.054500960751492e-8,-3.66196882982644e-10,-1.8279683973658343e-17,-5.317522337989646e-5,-0.0010146784536266952,-0.974695969407366,-1.7103352693702003e-21,-1.0475819138013915e-22,-8.945867679664922e-5,-0.0008776945675722805,-2.531854155484089e-8,-1.379657488852837e-15,-1.7426524582015656e-7,-0.37034429912914385,-1.4082684410751327e-10,-3.2504365467037297e-10,-0.08224776631545302,-1.6862534127421333e-15,-5.7754457236650375e-31,-4.1402763188180405e-10,-6.113206251189504e-6,-1.642815692345548e-10,-8.827763036766836e-18,-3.8502449627512146e-21,-2.162702575319849e-9,-1.976117947770346e-7,-7.180253546149064e-15,-7.650869343892313e-10,-6.113904836511349e-6,-0.0006531959574443559,-6.290488393165655e-23,-4.818294024545476e-19,-0.36310115320513875,-2.3584370250197923e-23,-1.1080004306104827e-10,-2.1766928310635006e-10,-1.5733129453648666e-18,-2.109744977397578e-30,-1.999898402039779e-13,-0.3092517068505816,-0.0005805911997224735,-4.6267997315808835e-14,-1.0467599995848266e-13,-2.896166094397334e-10,-7.248862939236943e-9,-0.12270083781101912,-1.2435029598312747e-5,-6.190711037273562e-12,-1.3668499990203896e-28,-2.920414390968137e-6,-3.0951501570212354e-5,-1.4913173232454827e-17,-1.8891822317253535e-24,-1.475035953112465e-5,-0.05245290879976833,-9.066942249945813e-5,-1.961559347803901e-6,-0.06238711425003437,-2.5607795436236692e-17,-6.140966768961596e-29,-3.6740624663369136e-13,-5.419289769202933e-15,-3.114684630486812e-13,-5.003936668443096e-6,-3.788290210669306e-13,-1.9237945943366974e-16,-1.1600603650991171e-15,-7.025937085802655e-17,-1.543538669423547e-7,-1.8236062901923307e-5,-0.0016642064983972739,-0.0002526582638167075,-3.3045501452936254e-17,-0.0034039140734664075,-4.722236060269325e-48,-3.987847871109629e-9,-0.00011136248270618158,-8.789918289223046e-20,-2.839692865355678e-14,-2.1547092652142145e-8,-1.9499444155907172e-10,-0.34126011577320114,-1.3459239753077143e-10,-5.080222660136458e-31,-4.644484329021825e-6,-1.4199842795433807e-17,-1.8026246039465985e-5,-0.00470963094440676,-4.8194015342639785e-6,-9.181955264553047e-21,-5.974784120264513e-9,-1.593035452663899e-13,-4.739968004677459e-14,-9.94829321321116e-20,-5.946438163432765e-9,-0.00011500869093590646,-1.6147355906500903e-9,-6.188483394671005e-14,-5.493692926596074e-13,-4.00036357320179e-6,-5.625078821845503e-14,-0.00021039347553255606,-0.00025771138887687096,-1.3512237176921089e-9,-1.745918666125272e-11,-0.5032098083592639,-0.7835731183080858,-2.0419675519590476e-5,-5.4888468320555576e-11,-1.689048048552588e-26,-2.4395945705751544e-18,-1.5538039186166053e-13,-3.249542450960041e-17,-7.628666655998748e-13,-1.4140593057306648e-28,-1.8063333772061514e-12,-2.400449520011427e-26,-1.3100480511528224e-16,-6.121095726365034e-11,-0.006028986488943441,-2.5392187105640014e-8,-0.0007878381720624137,-1.2936167417469308e-7,-7.729383951135498e-36,-3.5565917395634686e-9,-3.0113285119776175e-6,-6.148569145158553e-24,-3.572496067049954e-21,-2.2269218107895497e-20,-2.2165903876581087e-5,-8.249385800677212e-6,-0.00048588609975503885,-0.05762716985898404,-4.547243211175029e-13,-0.28010760330010637,-6.256340234800114e-14,-6.791573651083393e-10,-3.57813798877519e-13,-4.907086134990559e-15,-4.871589595227992e-11,-0.0005427879349090993,-2.56879545769772e-14,-1.114693903464921e-14,-4.274897188262759e-11,-0.0978254008187712,-4.6315019266401816e-10,-2.6347292522244357e-20,-0.0003876165120669146,-7.873785309842477e-16,-0.0005929294697035372,-1.6488610000368985e-17,-6.62982171590426e-16,-4.070274121856329e-13,-1.6411743651916633e-7,-0.028341407416837258,-2.2151169998760518e-11,-5.350351766197913e-6,-0.3541642814368794,-2.400047096147333e-19,-4.852282255128101e-15,-8.249525090183219e-10,-1.019098150323221e-9,-5.041965694632792e-7,-7.955501696733297e-40,-9.067364553991758e-14,-4.691963967384356e-24,-4.708968334555716e-18,-3.192535428515609e-11,-8.385735737521259e-7,-3.607716627518012e-14,-1.4673091758293328e-6,-0.04403877555940724,-1.9050601779139098e-20,-0.05667764624576554,-4.8030691261284e-34,-6.025443194912114e-13,-2.2377378135003675e-8,-9.628851592339363e-17,-3.4440228838237696e-12,-2.2340738869409967e-30,-4.450560618914288e-15,-1.7539399663947203e-20,-1.7076972799239142e-15,-2.2436145205601664e-9,-0.02627167588970123,-0.11687701324187118,-2.94114399073995e-7,-4.9771866595443e-17,-9.706561999571919e-17,-1.7196443636141573e-16,-5.5399410245687886e-8,-0.004602703358943516,-2.8225444666758528e-5,-9.529853646742977e-8,-1.0027331830545021e-12,-0.0016547255279328286,-1.0218240411067728e-15,-0.0016467022345002034,-2.064520770206989e-7,-5.320227356384392e-12,-0.0016049586410829065,-6.802233171011259e-19,-1.1087538926699573e-12,-3.5601465252384978e-9,-0.0006163828908935311,-4.489284241657515e-10,-5.708548409212847e-13,-1.3355476724888815e-6,-1.3408309947490147e-8,-5.5649668667391967e-36,-1.1206722816741938e-9,-6.82914865001107e-16,-2.6869445495397835e-12,-5.754750849049487e-22,-9.242111243306815e-22,-7.992793992912654e-12,-2.973293781294683e-18,-0.15299131359838408,-6.429253391360429e-6,-1.3730919698646453e-12,-2.1791534347726394e-6,-2.932967385448472e-11,-5.848026430880655e-7,-0.6441773838072323,-1.4745427615331187e-17,-4.177280873591533e-12,-1.5058044685280215e-14,-3.796512607481301e-16,-2.0144208613976255e-5,-0.025723437070060043,-1.1995579695516687e-9,-1.3921512310268538e-19,-1.4678811888416912e-9,-6.4407914548118425e-21,-5.156948002704906e-5,-2.909420572384812e-11,-6.124986058006279e-11,-6.796957576734483e-25,-7.841273781286442e-12,-6.505446608800157e-32,-1.0438281825708918e-7,-8.27438398280834e-13,-3.177478513559693e-7,-7.379165246275845e-21,-2.3662325062596368e-18,-2.750483258548316e-28,-0.27029481873259065,-6.375631660958774e-5,-2.8839365036974825e-15,-0.15881593994103146,-1.337366534292179e-14,-1.9404239395451302e-18,-5.3489299365807604e-15,-1.3621795164429552e-18,-0.005187181855654737,-4.593480768722021e-22,-4.916076934731996e-19,-1.044304506898378e-10,-6.015427330431246e-42,-0.07572329509578106,-6.303621512025409e-6,-4.594334912095929e-9,-3.4025265926906235e-11,-2.4034483248741855e-16,-2.3586478283497974e-15,-6.768414205994487e-6,-8.801305058948986e-18,-3.8499224818392564e-7,-1.0225746122554233e-59,-0.03836143199755955,-7.061917343264164e-17,-5.310597545373994e-26,-5.985377065399532e-6,-2.052060720934125e-20,-4.8900249487707245e-23,-5.1120610914838684e-11,-0.00013689357207602733,-8.943391025401334e-14,-1.863800832739676e-15,-4.9873585237789944e-14,-6.27773635778583e-9,-3.5011527459760604e-8,-0.0031640006861705632,-1.9142398524255894e-10,-1.0149719231690744e-15,-9.576072193541202e-10,-3.642115705682986e-17,-1.0030563789761682e-13,-4.7310612983169085e-22,-5.9960412670989946e-21,-1.1804093122308023e-7,-0.02198252713789557,-0.1218576901610389,-5.311036813177612e-10,-1.194891569451933e-6,-1.2379305565069558e-8,-2.135714711277313e-11,-6.754962694779867e-8,-4.032567497947285e-14,-1.1190498449350823e-18,-8.462509190022592e-6,-0.13943020356965186,-9.953389994389151e-9,-2.1209009575788084e-7,-2.1892863715812276e-10,-6.430185273281377e-5,-3.8992802572964564e-19,-4.3595836648572636e-12,-3.612116283635811e-14,-6.464736906704544e-21,-0.0029281495033329436,-7.928745560546266e-28,-9.490759621804758e-18,-5.6876220018798615e-12,-1.0304236606080647e-18,-0.2683870032719345,-6.511745155998348e-9,-4.7344888920640085e-5,-3.813501457174189e-9,-0.002290382134172126,-2.8029594680570734e-17,-9.3190506674927e-18,-0.15459121930054212,-2.170471859287459e-7,-7.112297023606528e-21,-1.844155189254477e-12,-0.0010539183145288431,-5.9282190449609295e-5,-0.00011281926587997872,-0.0010569394748263154,-0.0005619753012993967,-3.2213148248371084e-22,-5.8172148657132965e-9,-1.7804599410485956e-12,-0.0013481856266015684,-2.8077678790949956e-7,-1.5424365505513894e-44,-4.47319790516349e-12,-3.9014791159977763e-19,-1.4437835749546079e-5,-4.247504099773469e-17,-1.4985687697566032e-18,-3.8719443375705165e-16,-1.057817811016793e-10,-2.176422044508715e-15,-7.642651205614112e-9,-2.343444710503434e-15,-3.605162827395056e-8,-0.029995517912423802,-8.020808740086424e-15,-1.198735736224041e-12,-4.305722654943724e-34,-2.1843443986744323e-8,-7.022845171851215e-14,-0.00011892909308272855,-1.551369494991285e-5,-2.9420336618295346e-7,-0.0006556925095056743,-4.2530282327163404e-26,-0.014338004993479219,-1.7193361734316998e-28,-2.0735734893753683e-26,-4.081694238605085e-5,-1.222840317851547e-12,-7.435024283424482e-8,-3.088976746038975e-34,-1.7725551125932163e-17,-1.572021208352282e-32,-6.239305708081637e-7,-1.569483428180361e-29,-1.7210277183988835e-14,-6.233567558097734e-8,-1.2874232208288174e-15,-0.8319216742900248,-1.9553897621995535e-9,-0.18575953726976183,-0.02116225147963485,-0.25202262206389325,-1.7900441107089308e-17,-0.4526840190553879,-1.9687495793386667e-8,-8.495030993691722e-21,-1.4612041083611136e-6,-9.744893960796273e-30,-9.851566301383412e-16,-0.0001050148963851583,-5.419385867868797e-5,-1.3190517126963502e-7,-4.599580875721027e-9,-4.2752264582220304e-7,-2.4932962078234012e-12,-5.881007564949042e-32,-7.12161941097198e-21,-3.903329147469567e-24,-6.9589507266782215e-28,-4.6143970512442904e-29,-5.286192720942309e-6,-0.00015444681149377927,-0.0004014784209611228,-6.616831305204875e-9,-7.679438956761812e-7,-8.538610877010567e-8,-0.0032848349628433263,-0.0021006264500361776,-1.6154143165379494e-15,-2.4599617637388284e-7,-1.2802568337900025e-12,-2.7116191035033055e-8,-0.0025279750119999427,-3.6906464788348256e-13,-0.007587279811643419,-5.961321145846667e-7,-0.0017146165844417094,-3.608715551613537e-13,-9.262206462167105e-17,-6.347713662131551e-13,-5.702278673468783e-15,-1.9894799363417225e-58,-0.0016095049976866667,-5.170136044460405e-12,-0.0034213270961429842,-2.0974885223719478e-14,-0.0925350410998713,-3.941377255311058e-9,-0.00047522171520294196,-2.3379717907665485e-8,-1.2598060219729753e-10,-8.492903191636572e-14,-1.4962436500348318e-6,-3.4632974591721796e-10,-2.1379247320864275e-17,-1.2473950616368493e-13,-4.339923309295983e-13,-0.040814891841853315,-0.0005232761804619727,-1.5929382605368553e-5,-7.195977178907347e-12,-0.1386529858205261,-1.5672990865285016e-6,-3.421542588961558e-12,-0.025470118561647784,-1.0883213853662517e-18,-5.0763685820785344e-14,-2.9602820303322145e-9,-1.1138439946903094e-5,-0.0003234471811077765,-1.9095105248659485e-9,-1.771715786602894e-6,-7.021755632273297e-12,-6.799960624106432e-15,-4.4039561739412133e-16,-9.495849037093942e-6,-1.3892152836644782e-5,-1.8702283651421316e-10,-1.7045729323719997e-6,-2.3004417976305452e-12,-7.161170187377075e-9,-1.0376021235272635e-29,-0.005314482534866135,-0.015892717813445555,-1.4904430286534576e-12,-3.0557781911480424e-32,-1.1172648588324456e-13,-0.3940457440699456,-0.01358385978245176,-7.306051194186524e-17,-1.31541601432227e-7,-7.367139196583774e-7,-3.020727625351811e-29,-1.835940510954764e-5,-5.934708482315978e-11,-6.9432252383173935e-16,-7.342224943126629e-18,-0.00034993149745989787,-7.663800515731928e-7,-2.781698540093802e-5,-0.3544120139784942,-1.7096971413369946e-10,-2.6200382606888843e-10,-1.3695540613542829e-19,-1.5539399988821447e-14,-9.741302483891456e-22,-2.104713872960514e-12,-8.731924795810439e-8,-3.110983372540817e-9,-4.124628863944455e-15,-3.9894127265949424e-15,-6.333363103208624e-21,-6.696258329090602e-15,-4.3425597074369e-10,-1.648142780328454e-27,-7.890955431335246e-6,-2.898072070319787e-14,-3.430876171873391e-14,-7.721734486184625e-23,-3.5105082283604862e-12,-2.0168232823316983e-9,-2.613911396736598e-11,-7.351926330457169e-16,-4.7525525781266666e-14,-9.883599632464172e-22,-0.28260109217979235,-4.425278477053319e-26,-1.8819085899800377e-14,-4.865986353355867e-8,-4.919091082895153e-18,-0.0002593045300287963,-7.811545279636856e-9,-0.6413776286050182,-0.0005258498632908562,-0.04512597218257604,-1.7879462054181771e-10,-0.044350654375463344],"alpha":[18.66686524101601,5.280285037600918,0.9130341679816212,18.226809662254077,8.018757492640516,3.932272909099166,17.690255023995817,4.200510420089381,4.6485431310107295,6.052969969492477,16.810489628661077,3.6676888993209866,2.772362857614805,14.160242856643709,9.830673377269243,6.956036653023672,3.3309079805606556,15.171849428156152,10.557529572654317,5.798502394735912,4.585528073587866,13.44347985221226,18.326825477854946,10.49334558777321,19.77819505425834,14.001498177132055,1.3190957992424535,8.482824409423273,8.006999773764862,19.902718157007023,4.909589822479696,3.8833768801633273,0.6943745265269596,14.232280202360927,19.114366981232536,0.8153921235838801,7.5832126054773585,17.370079775715176,11.061078647580441,19.65584502943755,6.7295579331907485,19.25063989976614,18.899977150924844,16.791206479071544,12.321091655269063,6.518797701969787,6.339925763652419,4.176464454355329,16.526394034110332,14.32646776508002,10.378195460419889,17.37197492381892,13.439394164836283,1.4068268408994111,16.052670914574275,9.51184670808724,8.87414912933085,19.403334180712115,8.656368812843516,14.733250112574648,8.417850075650586,7.064324371384405,11.319608870102087,6.189174620579583,15.97346358228151,2.227571135173525,13.633310801982654,13.360395805204925,0.6962171330227562,0.2670384026948369,15.929429223656495,0.3690420943873063,4.36078553030792,15.285321130922034,9.925557273505795,1.2152556249854518,17.7505915917633,2.8941982237975505,19.949012593349135,4.171725818192478,9.308008050334209,13.76148327286284,1.5776597443908091,13.573623191762504,12.253822235055356,15.59077698108727,3.817404246023668,12.850797563340537,14.034889193684602,0.2672357922507018,15.15944002248684,16.303823911364983,11.623186731320402,6.949759263833006,9.185696982373678,3.281386050908095,15.003015501294051,10.649542933476845,17.038701298715505,4.471410180984257,15.088394446663798,13.963079968346515,9.99589583561741,17.498782295113358,8.281492803341175,7.819912076557509,3.008929950652637,3.606934039555414,8.024989705259902,13.135117362669897,0.8469334442260434,1.8067994145632715,19.102434492190973,8.935358722345379,13.5218879626353,12.673734698291375,1.1179296258028515,15.213514596764872,17.97652466702263,14.891667394904097,15.007599363518942,8.666177790442443,15.009227593981148,19.684431538816952,5.186977608739567,6.5916976306935915,12.314835578716634,9.115421179260652,8.959863794869737,8.22597646057822,2.382695758630171,19.739094649218654,2.897637072688033,11.76261536157961,7.649905856642829,15.553125536326657,18.731468478114035,1.1847193611769447,3.539917418009084,2.5487961795777503,18.530308707095003,18.176274899394087,11.781193928741693,6.212312369578932,5.548588892942363,8.665530657134713,18.330052940366272,14.097032625896976,6.395719635689514,12.776612890921575,5.684233884246961,2.610752466666777,15.585083738931385,19.510773976705554,18.56766348760935,4.390809243337279,2.1362601372047063,2.252746015655873,2.470526672606459,13.2714792893421,1.3050009267771756,18.153832983284698,15.575241679173772,2.233504004935223,14.553233074109922,19.25318070537262,10.084140604494003,13.32190030169562,9.042476756734441,4.226432975872583,15.950984682236475,8.990633614960677,3.373889024032466,15.270734347121198,4.135985698635141,14.44582270621062,17.582684971545287,4.138373262522288,8.831209901350473,18.07348024483241,16.514782782170812,17.624151897667307,7.477094487716176,5.120518951289497,1.7826611585995833,3.5713214661724235,0.3030752125876246,3.8284170919080474,1.4549687020224988,7.504582624635012,10.752712091860918,12.397345800288537,16.517392843614346,10.175735529150977,14.84421796482657,12.264986153349566,7.974604407847634,1.195299002403254,3.305888354169002,17.799349552607588,16.637220500909166,1.1485460682942517,4.559063592317969,2.9112509411235576,7.369963902270293,17.418499656993415,9.429443736721694,19.70501485484921,8.773887167430514,10.627129857116465,2.564328193223302,4.744489906094138,17.324827005783995,12.455366670361432,9.368526226628827,17.674676422538788,13.655421562197345,7.111579896687292,12.616383857979173,0.15335114507694758,2.646338922879501,5.323163896511884,2.2844984257663414,0.1622449832018935,3.723293790654063,14.555601356518185,11.396234121310048,12.950448202790316,5.1053729862294706,10.611229130089196,10.435108002650185,1.0264462154598242,0.4663158075568452,3.9527506043323957,0.14568521834260384,9.721239950458607,18.316534337594668,14.53591584543123,4.462301413390355,6.383914295164286,9.197612951718694,16.68096721559742,4.913272557200279,11.208226870709446,19.143340534701277,6.99758532764017,0.3255841280758931,8.600090404622431,8.046731458294447,10.104622558316532,1.0870946304602125,5.03146594959099,8.323917037802882,16.501205607205964,6.368674971880068,18.32978525586658,10.035490342242127,10.920417619636119,2.3335824727256416,12.780001125119572,12.330753253592404,9.050584409227792,16.764132719038184,19.547552254427778,11.647808717936199,11.911326786923304,10.230809993413015,13.939601079551212,12.795051166922406,2.498085730611428,15.440613156647874,12.124096177465248,4.92544524939222,8.305132844208662,13.39287337196781,2.980617531739558,3.0173606320334967,5.01118081602141,7.8320300175668445,1.8239119704178375,17.900779997198843,14.920649155607158,1.1504052320428748,1.1355036149959608,8.29058437638654,17.339570369591115,16.542105319116274,19.535090891759022,14.037420424385655,11.080666721637517,11.046557303157867,3.9320608344069408,2.9637993695554288,15.960732965606974,15.399020435820997,0.81754465022565,7.365141871696728,6.5575520384069685,14.442147655367634,2.0291605143836877,16.424591203784313,15.20038602205386,2.234124296054607,7.859119324590531,4.6759153974426715,9.677392908917835,16.96786192295834,9.942623686144309,15.338879135026167,16.00478562044147,8.839440785750213,18.57442673219033,13.158980498014415,11.513720099911495,18.46768584491363,15.24611881002372,2.0952239725197863,16.33735829695475,19.3663973221422,16.29507834325318,9.428380135913304,12.474859602293837,15.292557695531412,5.261452384692307,6.264706551128043,16.643790959829143,9.513260605783046,15.465693720281607,12.621000281179601,2.3748854148501186,0.9324438507124944,13.535297518065427,17.0773648750235,12.350791577278407,18.27344669920375,13.610658660416242,5.596268413552843,13.822682476367834,9.603414099496025,11.268904974464817,10.281313397577394,10.450147060353995,1.2522805083031363,1.7360855872537284,5.26686310109612,15.854838747682196,9.8361714937182,7.167027444849023,17.104564202458196,12.513538834308534,3.452185095750284,1.4989376681834532,4.59377661098336,2.924080365595998,16.1524241461247,6.358766239098279,0.8590441963406192,2.385740940694001,19.105915689828556,10.060786200152316,12.689633721071694,12.370973518401996,4.685658686034726,19.63134757020912,18.736744155077332,17.01528253055883,1.3404960056680126,13.268041669670755,13.568175529572883,13.219698241496225,9.125881644171287,9.800191770609699,16.82344861822395,5.544592214220017,8.641404640616415,19.687091078325007,5.935539442623066,8.996822207591947,14.306333774184626,2.630812471137083,14.729879619382945,10.506185276300833,17.012774163284693,3.067090972750508,8.35498378393638,2.4018064071018452,18.424210849743506,5.730636199881678,11.956484949590408,1.4104696988176846,18.722359816000882,7.114020382127935,17.1261412804854,15.83782021684538,4.677478257926313,8.671753905804774,16.32674762164408,4.408282566863937,2.3459583584286703,13.703104338328377,4.3755617856749,14.620141016941478,1.8690112288986072,3.948023870667896,1.645693427800774,8.044344549717657,1.0965563626277053,12.636340047449742,13.167595190076709,2.340221484288856,9.544772592419255,0.5839353973977346,0.9094720004792523,18.374561256909292,12.890331602919773,7.036027519464159,8.61274340238603,5.903813154477784,8.32546507935346,2.111589879338367,3.575933365268975,5.337405110636175,13.448369486623587,10.961017887591655,10.141694944552476,4.419795261938897,10.950377226682551,16.44841854663843,19.628332378884743,6.783272007828716,11.091589356612971,6.93965787230479,3.7612888785897214,9.06592576196286,12.463429008822544,5.982845108828809,17.95957207485302,16.120176380899494,10.709969990420994,2.3493234718804334,1.3123297828538716,14.230302620483748,3.421950803822349,0.33670050282393227,17.596134862211834,13.464361663754914,2.864281617653761,9.5053337990927,19.483730929941167,17.35675181015018,17.721237386168106,5.999377096501783,3.3917467376926425,2.416894434318584,8.442578357772593,11.553068068913998,12.783387944017374,18.6073558498938,9.933153483484695,9.650278142653894,11.7431899676656,1.54017340559355,3.4354768056600182,10.353295873815163,12.374361163382602,19.303431935590982,16.643882199642558,2.82733017566005,3.80399637935815,0.24847236227070635,10.858469547444338,1.733880502606464,18.791998250558514,7.5793696075568295,18.72390450799596,12.604832375376859,10.260089343388131,0.7179094939298736,8.479608180640405,17.55611423250866,2.436485533217314,5.613432937631564,3.7890786603239324,11.700624549337046,18.31916639522276,4.778022737489369,2.9509978099531553,4.770703182467675,9.057731656364542,14.135414630666233,6.583215986554545,2.062973914461894,0.013333364275895931,17.075577483507203,15.75440163718897,4.506430293527832,4.134268797397862,7.517821655351002,9.177861913848782,10.408282641776378,0.5892054541773106,10.891662694604598,5.535555416118982,0.5600439001140378,17.117068248148524,11.492610694019634,6.465087060915726,7.760159073694841,8.54504120551811,18.424382084058312,16.306513900896963,5.5447656401967915,7.943746754974201,15.22078658059906,10.89992679129898,7.435699926535988,3.8354674540238287,19.59276842311556,18.763890995579395,0.442784225182975,17.806851018797015,6.559009831930274,11.258114427465635,16.37513076149975,19.767482525121505,17.03796844072787,0.6172498524103887,5.560235172429144,13.763072717079075,14.626532355196748,6.420652777931122,9.564031269686959,1.7919764313060416,10.28385891373707,10.114439344417082,15.050467635304546,6.610833899256017,5.302486991960529,16.409065076360424,14.587428788197073,11.723318283129522,2.9625328812993024,3.72580999248866,4.32956130730894,1.4843809555770715,15.051769952725795,14.86561299790273,16.154302367082796,16.296380566270095,15.644397919289652,6.034711520256035,13.254766254090878,12.548612924908102,18.99504544383636,9.771961074924672,11.379725311195404,4.737485002514981,3.305487205539719,5.166855032761557,12.14220706784197,2.551059747953528,19.35015582986317,8.955374952916806,4.543061741931753,18.652584753673743,11.618063467973027,9.657753547040965,5.830078418956859,0.5689606246127266,8.900565019620434,16.185910016745044,7.570632235322474,13.715571663682727,5.632085927718986,2.5594115523036054,5.8649467783750175,18.75672862704296,11.441361066351629,15.778027707238245,15.946116691482782,17.304992469133992,7.81230419125889,4.368767813488308,11.073426460410714,12.14409940747576,10.566824367779244,7.517516542067768,15.02634362954424,4.902712599197954,3.5124524905125343,10.401123706891724,15.764538043120577,0.57888311487027,0.06209811996024328,5.384736301205182,10.26814877153467,15.891500525271418,8.36342863301882,10.970792938271385,12.73992504436424,11.519656114185457,19.296207184327102,19.54878786279833,16.405775677058937,17.886094987723222,15.264392873066118,2.798374495582623,11.686838937456754,5.542038215743443,7.629706223379378,18.316412327526315,15.333653579963894,5.3204068830777995,16.71779149680644,17.652241771183856,14.67079280084359,7.38060844439179,5.185988436276263,3.4458251782170546,1.8942930241923328,9.68933234786681,0.7905171970290148,12.452918993136795,9.16319609097215,14.55034055094027,5.129879023553934,5.714381336296541,3.7087843925257458,10.595064163360135,7.130098323087148,9.035514032179165,1.0734282816541096,7.747291982606352,10.287213138717629,2.795606823765455,17.257001175641953,4.05403101170986,17.72718878994386,13.37431099918707,15.282306621029544,6.977251312537058,1.502613845558316,11.064457003646568,4.127654965961902,0.19310464736339572,19.78475768562747,12.31724196903735,12.835948006717457,7.9665287680022745,8.378422866057162,16.693404238326494,13.744688864663885,17.508358838249105,15.537779410157139,7.328888223239378,4.761774013045885,19.398725518337,9.896120103982442,1.4726793231291735,18.500389032529863,1.6604659019544954,14.816622352896447,13.737143294042134,8.191717103538103,18.289111398903447,7.816360326490472,19.795275976755878,11.176432845250321,14.392986489546754,18.332823126115606,11.16004012092719,1.885059545445955,1.3056456806624617,6.852617281288285,13.168655925134765,18.8050414751558,15.416610650677057,9.414114274799989,1.4372584147232992,5.899761098160754,14.944660590188409,5.956374611333035,2.9662499791423214,10.081987779828605,1.8632913121490624,6.474369418356831,6.830597035620549,2.95484662211257,19.660384912586085,12.835022771536835,12.203097787095913,4.597576709856277,10.076038052943712,16.909931898894747,7.98103990280381,7.964671649676043,13.174763613619639,11.965297720786383,16.81703302327297,13.798717580909274,12.439050651935224,11.436513897527467,8.194992051395907,15.569427714184044,0.8896529070338888,7.187211905683468,12.697267563122763,14.142438452163212,14.961665489408421,5.242626906085386,0.22112366872733435,11.251675320004919,11.217460167074558,16.48508327760412,18.244208906687895,6.596369318436173,1.7203332086188272,9.781829741503788,15.592397492258115,6.61472324922602,18.950071736578884,7.548105346573766,8.714134193261579,7.319631769068842,19.799656470959558,6.273484979762651,19.08544949851865,10.325455155435165,13.777310801873575,6.920314060950927,12.98735086282981,16.092388205281956,19.87850560037114,0.328095794176928,8.316792298304051,9.623841756616036,0.7732343673233277,15.92505234561354,16.70709826463603,9.593029193579486,16.523589094508196,4.04480461676151,19.590048960122246,7.657536878653262,7.581720307867932,19.41111419628819,0.864845138269934,8.012633529631664,12.759518443270416,11.236043194679848,7.737236896292892,15.498249625631516,6.5832113078085985,17.173543263111956,6.889491765735936,14.162492283010106,1.0334688524567337,18.47836503765082,16.73132344808944,6.374458802014673,18.355524476239886,17.406522130253986,12.902069266264169,9.001239748515154,18.044717505633194,10.71810482044004,19.071079214497665,6.700453179509638,7.067604655881734,3.6297877659917877,11.978681613811958,11.464937510866857,10.056364234360853,15.997364638304932,12.042317774713807,19.193671391629152,15.721962894564104,8.92058175935642,2.441708252129575,0.9718267267164027,6.588014431605558,4.855747295241604,8.860435247698755,17.149379902995744,8.094628589589487,18.302312273618845,18.68878193056291,4.888824557497138,0.7540851265252435,7.861921487395196,6.384180626481073,8.93398629996689,1.8950274894503094,10.646287541696179,11.294755250893767,18.836801745607822,14.263200234234152,3.2336083676348304,15.779933215596786,11.347845046937097,10.637237010752862,15.552913529082236,0.5972118292134354,5.147940395852193,6.696476033508052,9.561886646524918,3.731407540791385,10.128999379447933,15.734116336623885,1.6162460378467358,6.475269457538375,10.98330686594676,17.14985572934049,2.939664888564497,3.044330730459408,4.999196744082504,3.83386565859829,1.4963772521421737,14.978006616420787,9.611706210511223,11.432535770370906,3.086990296119705,9.363334481827405,19.39690585858753,11.307679865754796,19.703950612281712,5.140305690091451,10.903786872626572,14.358688089243934,13.88151800114034,10.453056599585349,15.099967428374104,10.366594209256451,16.47783121243586,12.9194746643457,1.1570771986472161,12.581852819483167,15.459736157435856,19.759458367294627,8.941295778885557,14.65572703868498,4.848877846505952,5.99281387768666,5.934233020002626,4.501207763483066,16.243319176625405,2.1452707896348278,11.870347419411477,9.77571151218437,4.165917080530495,8.9617258647809,6.448196233272707,16.0142358723029,17.08807067302449,18.991057835900243,7.18277434970898,17.901977938060334,17.297860507930736,3.688098664003223,11.171631246606996,0.130234788816872,4.276019831226399,0.7016004131493769,1.8777265101556306,0.6945611389100792,10.52030568924784,0.4171601054072349,11.18345132686513,15.05292367374786,6.575259586420024,18.4165707319043,12.077013790466857,6.72180796692861,4.988184020897437,4.269682560406061,9.100229104654328,6.508328326012225,19.316510917034645,16.644074030744473,15.822429420269177,9.976391919835287,11.620857113053432,19.14799307321009,2.8787246641443387,4.179221495096952,3.4877901592161997,11.267707173184602,6.676717787648103,8.468122964293885,2.9633146249726394,3.1693241968543973,7.266134619404814,5.616154753762199,10.826769340869191,10.222898829706025,2.5328531665503995,11.54292172435599,2.961112518779214,12.796823959227703,5.172256594582381,14.87890557170064,9.412315702355066,15.47441743900074,14.815389146432235,19.345176371375054,3.8697435984398876,10.701011621778518,2.761144734205354,11.918837819126775,0.7528377616544146,8.01306503486915,3.588139177494587,11.284934418997597,9.1825335510153,12.380570736144936,6.298806138397688,8.470591917503851,19.655654574102005,11.467965949542922,14.666505212201448,1.3363215724750521,6.2434265792300225,6.287423614962138,12.303858054033277,0.6072349043171599,7.475406196809966,14.10858875431554,0.6903806613122265,18.48149911409992,11.942668636085605,5.106736870345334,8.76474623100924,3.789542264799328,10.88614091013747,5.341073531604286,8.444188453913487,17.360281911385144,12.827199340134303,6.454186813058307,5.661720884531003,10.972774095437625,11.192261266004397,10.341951059351668,9.290098478996844,18.171957340336608,3.415438389880734,1.8018755525403751,13.997520439677826,19.57468870936728,14.837109417871304,0.4424116265319622,1.386828204051036,13.65798136231617,7.1010448110243685,6.521400297130326,17.38496941205007,3.009022651907425,19.358505095177414,13.100488963320384,17.745427247352318,3.6667403607970117,8.304986436265054,2.683977700615978,0.5540839446837609,14.837691775404721,10.487709983930564,15.352671861805334,11.955687848888811,18.22719713795962,9.771851531548897,7.871520058747472,15.293102008947121,11.153819265785504,16.357936936584167,17.169830195285904,14.15228824349069,12.127410453589818,17.610072038179666,2.769682319598381,18.34629995435186,11.012237340362363,12.012260571491034,18.360883734072587,8.377659136063018,14.507135438167431,19.756133649294583,14.447747798913086,15.46469845561456,0.786335504134934,14.917706321070462,12.723350304518227,7.390983283379704,18.229630957511326,5.072823787591645,11.496934734698856,0.2090526743319865,2.388514609473944,1.9844520275918232,5.970622184093832,0.5827582517034191],"x":[9.243697411527801,11.54228992734027,9.963049828383976,6.8771599260637934,11.047249801961987,11.765915940046956,5.688115188174628,13.490652790532337,14.349800594518474,6.095775337319216,12.56674051653906,10.422161225152058,12.314745669396125,14.236811512718464,13.98781996566221,10.132268473032111,10.0601380428372,9.852305545081316,7.592299202157998,13.14353702188194,14.37154042150867,12.428462709309759,5.910159955369041,11.859643074044614,6.033495919325995,11.667998703892227,13.5598005500551,5.248874476893994,8.811330358855038,10.298114519443706,9.904924551077434,9.309859780038359,8.131620698606346,5.23572214665206,9.726470295520286,6.407454870638394,14.7331263426124,14.802194451228827,9.992540336398534,13.213457205872839,7.446832637054708,14.976569508759441,6.117210807015563,13.317194557055956,13.421602172224375,11.42503006750226,5.7333500437113045,12.416679854393697,14.887263577003623,13.188570111968955,12.253816249780707,14.206130812303272,10.606812139987195,9.821155601334974,5.880587900485548,13.112629594757534,7.182802675158529,5.176600998167364,14.298446457215729,14.694000915099384,10.790541903632178,6.457143742562021,7.846467876973926,12.76734593325906,10.57469590489697,7.810387263824192,10.144424363402226,7.087074272861833,10.881136825209609,9.565984223128673,12.026644377845393,6.7214533283629425,12.383973439767049,6.969382871025385,14.48074981436422,14.462939893581924,8.295557276798146,10.670623261825618,12.080321161507396,9.061974442270555,13.360514183401008,13.370528194442974,7.504296302900835,8.772590133816585,13.18809048650147,13.74504787686983,9.899006761573295,7.766447313614071,11.739575670139729,11.239124692977489,13.177760819057358,9.697799559313731,8.94186123673358,5.596878598679494,13.00478774238008,11.319342939382487,11.95994955271808,14.632317219176807,5.487596612218832,14.530597431633097,10.959378762659995,14.893259465946828,8.173381129540696,5.678347145839213,13.293511518333203,13.893669092295543,7.49531793802168,8.257231686842504,12.61694248738368,10.191595930315673,10.416615965689699,12.27901596483349,5.050453521518006,14.256839136646843,7.664580206622922,14.821470886402876,5.207973070814815,7.821265496962271,8.414961044679314,13.934337396251577,6.188787446311093,12.660355434113109,10.305066093767952,5.5600752185244335,12.06976450272347,11.94661319059912,12.983010562617368,6.211327883963325,14.83517719810065,5.517044179901651,7.8208204622470205,12.545135325081091,7.792091852750776,10.207744618475479,6.509482486186798,13.96329335503488,11.40213589503611,6.072930567464072,7.715232828488423,7.712710968922403,11.557036861462306,7.822014611112333,5.633049344672026,13.358641944888037,12.709802106394816,6.918609702305059,7.606178813714218,11.211004555227982,14.98464348052898,7.771673029682267,6.276760571555052,13.879864854245199,7.908050968049243,5.414428378978511,12.716156664656701,12.74677862195291,11.657555225774157,9.06637469049879,12.312874611635365,11.176942097843856,12.882638771333852,12.622797390678315,8.335253846371614,10.320951982574194,12.82215098647091,12.539263631154796,14.55205540090583,5.609163769705516,14.281504165847315,5.131452147058244,6.417295242094097,7.126456022382614,6.452245245486122,6.222138257031656,7.71869245358398,9.844804709153134,13.359162061786982,7.130777289950365,7.3385226341057646,14.74126704428516,9.795299492944896,11.408275204802603,13.147748626354645,7.006187301095721,8.221567133141106,9.057737223310518,8.745942343881419,12.145210577467761,14.483919284829303,8.103287638169817,6.749421894014807,11.145075201369028,10.18686430943609,13.294626569086015,11.54060620232752,5.655101158448776,9.60912192818068,13.827769102043675,10.22617553143892,14.946102110685619,12.53417048820837,14.245096801201022,5.252577990771812,10.839451746525647,5.20046952776182,7.8170035387155075,14.127362485661743,10.86740902980633,13.563016638067392,14.78440532548224,11.217157839830037,10.919147620411318,13.862529766763629,6.845982682894089,13.8381410943449,10.9540403475329,7.004091533681001,10.579939474353292,14.125786241552058,7.351691487658507,10.018246711898842,7.830075436310211,11.289316436966887,8.10812640506716,6.9137473527909705,7.874590939974495,9.707437476089709,9.918007147337986,10.989265346019161,8.873268229814702,5.944688534594926,5.058551015212302,12.74972109675426,12.864822870776209,8.842957974188788,11.477241266366713,10.929139141219933,10.945694411228645,7.310315332857245,9.00492124659567,9.425300599095685,9.337156745249274,7.413798650030687,6.19928095790563,9.167845863501242,11.848195648919317,9.540814022730462,11.120013873539516,9.912454646532499,13.305690581662269,9.550421161948247,11.500583571803562,9.552570835411514,6.783649159348801,13.780769237838621,7.811655547292348,8.440508022869794,9.528445654409408,6.689319929653655,12.16660838490613,5.120866427424917,6.895950639720525,12.904903966189421,11.692311932105248,8.834406329290957,11.726252618718412,8.971252795348462,10.340101082372101,11.586725898013475,12.597661376872981,14.678839546964568,5.352606125977124,14.085617779098015,11.873771111249109,8.852652302272517,6.735038194151189,11.554514066570668,6.839359936786964,7.376011822992787,10.765519183083365,8.038097074611976,9.471556753717786,11.66728990217598,5.035983415870458,14.170567788276092,8.239518947645523,8.62773817340507,8.731498297469106,5.979465363457148,12.26544071382728,10.773726285898624,6.291162902599812,7.918243146906054,10.36766156640757,7.793086624535657,11.339412104598852,13.839854098171276,6.961201410893601,7.8773150286956835,12.556747974903788,7.134439261549286,14.710814781489852,6.80892091365588,12.258708172870795,6.021904754730114,10.818998555203287,8.222449476167728,6.216874153033833,12.402088602526742,13.027415388722389,10.564154225000673,9.108186568324284,7.814123510886473,6.676732965945735,8.378990328947113,7.138123436919046,11.840751365012622,7.871152449998007,13.637843787397163,12.690445454985369,12.725292013798544,6.113064873183882,11.787868314043145,12.89534316177826,6.99613146027779,14.803948450185,12.009637218284418,13.069729194517057,14.061835501785085,7.880359095320402,14.332825472046531,9.874667813134934,12.218441703005464,10.609987575039408,6.388937747496001,8.707089429538994,14.177825743176623,5.8882925782573885,13.658680237565154,9.272585875113265,8.304086648580999,7.174107367283051,13.000428930164613,5.221324750946497,14.726813416564168,8.913701217629331,5.005944612284614,13.148300125954233,10.91675892077718,13.80740509131629,10.697928258529675,7.937149494941604,7.504685709907422,13.510780378753218,5.138044012033898,7.71226962061683,5.660103822788686,13.855161860039345,11.400803475473367,13.246925258075898,7.691371103855298,9.32325052092068,12.644056732383582,5.220875663386913,6.068356373024473,12.540262897799543,6.932315449780924,14.504541061129615,13.493598574842824,6.339472904452412,9.298348106447836,11.267148446693074,6.2258167721281215,8.374242505818263,12.534573105566775,7.190514425277135,10.464438322230635,11.483601077998266,14.829792251355926,14.758526455757082,11.231993341322813,11.849291938678352,13.940520694951356,5.873747218395993,10.070208721709733,8.759808125821657,5.54567699828354,12.832366362822079,14.367513887053994,11.9268724906517,14.685928485284258,5.1677033166694075,12.596880378919002,7.756370605060043,5.899511442862686,14.69357263311051,9.75656705448825,8.533221970998868,6.803102519031199,5.533942371518082,14.089137933632962,10.878993802170498,7.599578412316353,11.610027785228114,10.872782521284803,12.632286785865075,13.911346378563662,13.964588009974186,6.544715469833764,11.119820876715853,6.523492332237648,7.218183916236274,10.61780754658821,13.445853990841844,5.744663754675326,7.627715212706541,5.766603310068225,13.714418303467879,9.293143822671716,5.9537456952906815,10.101254819013224,11.988661839995292,13.237766284599354,11.911351296758973,10.514871310478934,7.263377992819658,13.191419618076125,7.833289223815414,13.557220443250738,12.889404308860977,6.152683784383763,8.897139329976131,6.324450133737405,10.920672784150938,7.587896093730578,8.552233194367352,12.039470696746113,11.549781302471828,7.678654352376439,11.199062052465623,9.801237262065342,12.927402037491934,8.054266179816214,14.728270739041353,9.039450125544137,11.895146380971862,14.467951995669281,6.439560386606815,7.433297696814569,5.1854232697107765,12.367817802774887,12.359378531977836,6.74435014269525,8.816809462754716,9.221642325282088,10.57923746182053,11.996213543444698,8.738551398459206,9.512679363536654,12.234902507798054,5.704376941151123,7.256798046646291,11.229059605106437,10.295997313442715,12.463264427089996,9.093220181421222,5.768944565138492,5.566012860631888,7.32945578086764,14.071034996202425,11.160509352098334,11.532982591048937,5.559350589114159,6.896603153125378,14.62239026160181,9.702015415201613,6.0471416384415395,8.496289754318232,13.81259770956805,9.615228894273384,12.089189165211556,14.363493611478027,9.030451480835968,6.894481556839613,12.980942914336032,11.795297467232682,12.322243568297598,7.480647403809431,8.802560549669614,12.222652977663046,5.811395851960556,9.101872275359986,11.143383846100605,14.1455768011246,11.461583069498236,13.447710252345749,7.964027003528498,8.894352269219485,9.261381003361107,7.761508812829243,9.122344633658816,10.601132009106188,14.194438568967126,11.09341918196316,7.303590681112373,9.14332315180194,7.582786697685693,9.160024389400654,5.888184835203192,11.543995681961112,10.787788137780346,11.607059756350724,6.908750275701112,11.15488642665419,11.846550885945948,9.670622317502682,8.859487402082538,5.27125396692929,9.877929280283333,8.658516162718428,12.570490886413495,14.943749886586044,14.185747389685686,8.444873129196175,9.432110020699614,6.9952562579438915,10.9452585741527,7.118666756030079,12.412182170703105,12.39264019842536,6.1086903365227325,13.22266712216244,5.200595573663898,5.4188686259642544,11.473084055269949,8.784944413292026,10.105377542870084,8.011653441509383,10.217978178549863,14.940317581416949,5.1332321809062105,5.350292568906639,10.712049561316409,13.683678348960264,11.146161504538384,13.40065665892415,13.308958514315325,8.353571456622435,9.983917237716433,12.061677142490899,6.122674038316074,7.985526653870991,10.82851484255773,11.627322517033443,14.382428102375073,7.886411454057047,14.647390199965004,12.435053788394901,6.347548676299811,14.767707028277076,14.617538817557872,10.89179951726501,9.171753316733293,9.506061217500823,13.957796250046759,5.631590239354896,10.75770611362995,12.078611098865984,11.149475847218396,10.532145647190209,7.898271348701773,5.350910676661216,10.24806505074759,10.211266715232277,11.76606894445471,14.534461011499163,12.699990295326408,10.1169552702299,11.764907830955858,8.729506827440623,12.800570630253619,6.269991127452778,10.16844911492187,6.866357985048612,10.573024547620157,13.461140386656766,10.225815264036566,13.32816521160911,7.02703420736616,11.427229179543197,14.069741141424556,5.57259186708788,5.760721627667181,5.840112563277944,6.384598026522594,11.014218096812607,14.362979001627954,8.472187949838316,13.227709515648908,11.485762205532644,12.690521840962681,12.40638332017064,5.319801096217322,14.339442695708325,9.383550617028554,8.344166914471522,5.639918604348068,7.90928425961932,5.465343653558219,7.069402222485353,14.072090674787482,5.918154302048377,12.622867366740444,10.514642848181266,12.63229561410683,7.648661427056829,7.139068830663908,11.291621608995738,14.792242834815493,7.923987717465682,11.858025356825728,8.845961740171695,9.177867696298158,12.99013260466332,12.539299924786778,9.450597765641293,10.185263846127878,13.205799673067178,12.70450291021185,7.450420427730846,8.684784855694117,12.091689914973516,14.484235433447466,14.706161629054522,14.062035456772566,8.618600109902612,7.03336854124476,11.381819095544468,8.272431072180616,11.406938430140784,5.042749202889922,13.735739559701205,12.15597873380978,6.414110294688797,13.884608849217756,11.954944697331074,10.892939121646085,8.27590443443112,12.514160111428513,9.249104682675469,5.092695587704846,14.169376221664109,13.938783443272829,8.58106199600249,10.702598473834628,8.139393882840537,9.525582496659027,7.7372462903270645,6.534887206037363,10.966993501882051,9.160619992765096,7.683793737788756,9.353930502193208,6.713504844363516,9.899272717055236,10.189118424291419,12.688624749805735,9.51776060225191,6.167968319688546,6.780288349448136,9.596497937312321,11.881591300370557,6.987222905809219,8.444303842221677,9.8718299007262,8.283219435404357,10.158750748685158,10.054508187085215,9.496457555756844,9.428887592868186,5.484723608200264,12.582456251524896,9.552054933111208,5.930102279063439,6.96554947024933,11.215816147687242,9.314232873957238,13.814708537553502,7.245533821236945,14.890065173428999,6.414055949765373,5.628715343986697,10.876927581459766,7.714029746828103,8.519785934723282,13.582221837991682,14.126251834609636,11.085869109533224,8.872518616515128,7.001832758529003,7.687987353603938,11.760505332698678,14.43198066050078,6.1353278123168415,10.330309816237794,9.334017883816335,9.140195796158366,5.0108388276661,10.071895663099376,7.902079352810802,14.11213237049668,13.662588006194525,14.274070824314101,6.98205754141261,8.403797746585502,5.848277467938412,5.863497068972514,10.02976934400057,13.930505359104304,9.218781811131596,11.039195222635584,5.407744433476205,10.46227910574367,13.480859347242987,12.19465884919661,8.217745184938405,6.43526465735321,5.08388146305222,12.667607564332457,12.393612364612956,9.869015913919451,13.416884996289573,7.984895320240533,6.454167245876672,5.884854329161959,9.629771549499843,11.642811287859073,14.832551199178116,8.327200629671578,12.503648617541339,14.797682159019462,6.742528579750924,12.724189875048829,7.282612423662647,14.427933552031272,10.858002740263874,13.851123130731935,6.2598328351498855,6.120499793143315,13.551194033870038,13.96341897132036,12.021107045953732,9.994391749003162,12.24944491497749,11.640859312318463,10.009642129478262,9.617337796143001,13.452677699431172,10.181267416506444,7.470730955286708,13.722371812426202,11.021846835938662,9.976812756932961,5.0225808387416615,9.393436419660997,6.909004079643994,7.319192444854686,11.062898527272857,14.838438815554042,9.703675626480042,11.196859608968674,14.97112264389132,13.204111169968574,7.319949721249257,12.8021283174036,10.009663186587215,5.3558025427198075,8.65342866145005,7.689607512586196,14.629185289348852,14.57058338039115,9.844457078491127,8.959431195684884,5.684833565573988,12.368662453042635,10.105301962929062,14.452598474877066,7.38067309291131,6.693918617245549,10.320597144934334,13.313898416169474,11.97308823431076,7.680150449884168,13.96386704860723,12.843117846715366,6.0047589139585344,13.008582434261346,10.25470982991486,5.860217877929916,10.324832551923198,7.763605209439732,7.035333230073886,12.106948165251891,8.444484086850203,8.31486864158615,10.708733864504651,9.457869067608138,12.330477063093713,14.464352038403876,5.233391972920154,10.36880622011821,13.4446706550668,8.06544954037712,13.68634681002225,5.456155062240611,6.599264847857167,10.67868705978437,14.569559295610032,11.600453995527015,10.259023864981582,12.760206988007674,9.075695744802108,8.333394617355479,12.263866017199913,11.215801773785874,12.660538432173237,12.867517499087915,13.67063296059515,13.255765943169601,9.688060765148867,10.899775628766026,7.448408509124769,11.143979986592182,7.98714126856394,7.398942266994086,12.051832043017342,12.488294885812135,6.381629176251473,11.04557722490721,14.151785751759773,11.292579058943584,12.632048517249796,9.255041774413149,12.80162949749547,9.521618647385841,14.078537448933409,6.13722377567899,14.505390471954787,11.046509482398521,6.694760176782825,8.505869755103577,9.857859404244977,8.208716857237732,10.014713180762364,12.624855567825204,14.11404307253141,10.821038854895686,10.640008104904231,7.83589462384499,9.772578083837505,5.6391557129032055,12.972511724372811,11.74266900077878,7.953589737316951,13.407856683773536,11.897629576980632,11.224613328419748,7.2901878990739055,5.065336386891907,13.406297307318653,6.454789295139802,12.468304288059471,5.133206412026041,5.516742349439882,7.910387221776638,13.528630613711814,13.633016922284355,7.208137403704013,13.795732914503112,12.098832928162064,13.429900423919028,13.278900113450444,7.178360277889988,12.433279410185863,14.0271541220252,7.843703397874839,5.320496077426256,5.346157079692309,7.819467958961768,10.8518898286016,9.576054699382272,12.864277628107441,12.417838398968337,9.885742841483404,10.19728592370424,12.537762853684901,11.64777554795678,7.892056246831396,5.02692512833161,5.495268189785936,8.743502928281506,7.378718612356609,8.320201281901866,6.973771252398309,8.544289885443238,6.61107043451964,8.616899744807004,6.157477465510251,13.824178108318044,6.081151519812929,8.498080272651725,12.070151650339469,8.245634552145784,9.494016111419572,14.28107076521085,5.252968492390197,7.290162848340625,7.741998628852156,7.8611219329500255,13.365263802859007,9.034043699827272,5.767421700231063,7.720484749573946,7.963540913987545,11.506238436029012,9.181255157937011,5.673943410688822,8.901577365531574,14.818980332477041,8.514315425740033,8.467791289559464,6.988043402038255,7.812835757030414,11.741164156360123,12.303457519931147,12.227684283633486,11.62253078538802,12.594528096603204,10.104304915614462,12.195424764917588,9.519152484333272,6.359329254098043,5.491678062198178,12.773914338215015,12.536105069961893,8.018180461955978,10.534881588294313,9.476567752012349,9.602464069231251,5.160433476505146,14.161633634461664,14.975092928321656,13.272384148797855,13.866487928293775,9.809617520198564,13.950737145930814,12.80521432844186,5.896177751054155,7.316092923876538,12.881133011292935,5.08295298841444,5.987766623470787,12.440960460474244,6.522568889919884,6.079712338584155,10.067639149741265,8.008164901546124,13.802148026621461,14.567920683879391,13.104929205217932,11.888800661398458,6.498987702783965,13.334045371944987,13.535674987799132,9.946419942502976,7.228829834460512,7.764794581750543,11.617065097119264,13.861728005734268,8.693225360212493,14.96494133000432,14.760712111426887,5.134599609409234,12.68066622364685,8.108754968895418,6.667243846856479,13.493484362790628,8.153291019250592,7.270754885150989,9.570999136168757,11.958133211657984,13.348703628200479,7.123133317428756,9.148942893679218,7.6659355545150865,14.345468739854004,8.833243336082717,8.677548231187815,14.863930646645025,12.171045490460909],"s":[1.6906924436324497,0.5765127257650215,1.6377195604215777,1.9166235365184847,0.9151891252098805,1.79100192564217,1.8238862172573689,0.01041324100303731,0.2591099915276649,0.08799579035356198,0.8163304300938803,0.7090434368028542,0.6216484751597946,1.6203679015874357,1.5890776918155982,0.1314763122779956,1.7553206388736387,1.764354325813176,0.5832258962204873,0.4250542153748036,1.6080157618722368,1.153223846410207,1.6331040630289007,1.4270613874184828,1.3935406865692785,0.8362589214492733,0.9321899580349546,0.9527318755233045,0.506848187290617,0.5094055347654192,0.6041783089768495,1.9822506456096858,0.0008002482169775504,0.06460108392150454,0.6368674409011299,0.9078030660761995,0.770547071529919,0.3332536258779375,1.5019875217024374,1.1611887049342857,0.03926636549843643,0.9147486814715791,0.6044012260363019,0.3816752799880696,1.6124253584456296,1.178411712466072,1.1566691256690396,0.6003841074790137,1.0719093164875755,1.5279814590255878,1.22813823618724,1.8780762718317852,1.2030787511420926,1.4853474057716198,0.16683498375403794,1.6327078802772523,0.3696886894600655,0.5375384767825384,1.9993405042095946,1.7881397914141024,0.08793794297460122,0.8297813680131068,1.0492613507361699,0.24360693093794072,1.9115229791688257,1.0056233882427335,1.223471241504237,0.3792186174783745,1.7323131730621855,0.9584181823796345,1.136283622096403,0.05536566156374079,0.8546117593054445,1.4484191502703276,0.15086344489366255,1.3676794592752168,0.45086752565589405,1.6789118043575701,1.3521991679333052,0.8104158577187568,1.8288655309948232,0.27154660163595556,0.3434924642407102,1.5378531528359605,0.10118396443929312,0.0916399597940134,0.49779506764968584,1.912144543143913,1.10711025071451,1.765856068278051,1.3474881532529195,1.9498738733548495,0.40446838596062085,1.4224342199507727,1.7937582886580365,0.24381013559509235,1.2659337197516072,0.6507361412309067,0.7773247822335123,1.4125675407995049,1.3631185376810455,1.5810026751280106,1.633603847326234,1.8019857925116094,1.904740656361223,0.9187403225580066,0.620316179550918,1.9871199606566474,1.8159490643342497,1.046630792004065,0.3247541311076385,1.31193861028164,0.7402754960773992,1.2546223663653535,0.9106030253900022,0.19499048669974073,0.23929818018913274,0.678612302706139,0.29868963472598287,0.45292226351113163,0.9450973851164934,0.9588937935501458,1.0363993903228765,1.5234815774295387,0.4796184465710067,0.21612358873517712,0.5972259677859619,1.78782246974344,0.9762743159186384,1.644810695075872,0.8088656754739563,1.9988657575050803,0.0051546942188358535,1.3645259092934072,0.7466951720719588,1.48323178836992,0.5586211992258177,0.9154458779530392,0.7949291973298775,0.15920126888560393,1.5120871296682514,1.7830737288902396,0.29622368777428987,0.08476298103805568,1.9654152262289397,1.5178095107943732,0.2651869433629286,0.7322261556193248,0.643425477850601,0.43414413388658124,0.6749264777973689,1.7024875894652465,0.6549630068869714,1.2349096497152527,0.13963425326014356,0.09075221634329189,0.22146982136229632,0.7475517764632533,0.11331745009706529,0.22714883698176003,1.858059952682238,1.493388940631089,1.6898701859863836,1.373387717310914,1.3642025180377808,1.2771770994378815,1.3995685657318755,1.7117399513464635,0.8356932319212018,1.4031554701822233,0.8662280049090612,0.8173112272702672,1.2737242177765986,1.3052960289103273,0.34802292758691333,0.7946023155611606,1.3866467920505081,1.7390166823371676,1.6120108183258761,0.3701557794930612,0.8697771848155194,1.0496258878555444,0.03812236769656785,0.7414716003069861,0.25710342918511087,1.7778250372003974,1.4768632916235904,0.4537915111681614,1.377269446133405,1.5704416025144088,1.8114532720286052,1.139265590283407,0.2969953991052754,0.09331202167774233,1.614636813594187,1.4428008681728457,1.167031764235642,1.0582194642471778,0.533599839342267,1.9216171542605287,1.9186905192534858,0.9238195138554,1.580114153278454,1.3369006662472702,1.1907134619376727,1.8803887367184209,1.0918709918972889,1.9839140748849955,0.90733935900196,0.6438560669106961,0.057287500153866855,0.2995635540348802,0.06662835236309794,0.3100864359133433,0.8992373346188547,0.22004061210915982,0.27260406695694916,1.4393343383269888,0.4983174138921038,1.163053304283201,0.1657577609983365,1.7641871230306183,1.4520832390693696,0.07349085049906678,0.9803601915294169,0.8238221762604852,0.42491577772833633,0.5348817596610274,1.9395693540728214,0.5003247006261122,0.8381141767399947,0.5009426797864962,0.3098704132455521,0.43842624003612674,0.6808112820980261,1.588543499249457,0.2649961597979895,0.6074730708820342,1.328126473757537,1.1323164711957419,0.2891311366442806,0.27245829963675305,0.14452267620871595,1.481423567793867,0.22869419127211277,1.8756672620928296,0.15891793438288637,0.438736395900047,1.3323866691846207,1.301621477061182,0.1487541353416426,1.0419720034390783,1.203210738344393,0.49927029420873437,1.2805752743879446,0.865134349362195,0.8930873528524863,0.0666327903302375,0.2646276547410804,1.5310037543409973,0.8105384302977052,0.28818657988916785,0.3778377756014968,0.7869324479848911,0.6052562231941185,0.8493517878061891,0.32886793344908405,0.12308938698125349,0.942701604981306,1.3344458364530944,0.13554048629122217,1.2958855854143323,0.4094563717860442,1.9543306209660747,0.7154367241667203,0.29860233506621725,0.16993175721616582,1.9227117234602131,1.0725581143677427,1.7207370073265529,1.3955428234147704,1.233810314237151,1.1358953706442017,0.5947311854275124,1.5072255830856625,1.1748382852231551,1.0362006951636769,1.509778449702294,1.5239695094470616,1.0379562361912598,0.1079690238251172,0.8647194897703407,0.5287214882377294,0.5743275448127338,1.65299083258039,1.9724666050440236,1.439707480490037,0.2974621737371632,1.3946648312715562,1.116657692411252,1.2356969921904315,1.696511248588601,0.37520811128493525,0.5070969988682865,0.1549991383067435,1.7493291758203777,0.7336965589535129,0.48632819366495905,0.7048150611770878,1.3528477746074365,1.6260229426521433,0.7834221177099336,1.7869063439826984,1.1218698293266507,0.5247529440327243,1.8084618015681238,0.37340848003167215,1.689139149452867,0.8167855666426314,0.40649615027248887,0.4013548974018497,0.06760547886559243,1.22878102835536,0.8384541243087433,1.7355305511120283,1.6008025484359165,0.058700307546976305,0.06062479893509698,1.5290025208229974,1.2659962203356052,0.929509617499455,1.7887380986078578,1.928401840031332,0.44657616023876745,1.672004043408593,1.6961383083396293,1.2731492101219497,1.492129255701479,0.2874864695906605,1.0949221436323229,1.3327959015211515,1.5899928168251583,1.7259167192208635,1.593688059447322,1.7749076851748669,0.8355591989333355,1.0242906356206039,1.023813444068848,0.6766397662897394,0.5009956845491375,1.6736196934803886,0.4534203376879704,0.7511477941241447,0.21838472224956895,0.45392875113320574,1.506309466282143,0.049152412238737675,1.9810820410511063,1.5714320702952231,1.139331831532476,1.6485281703466703,1.0587768929856,0.10717569934274929,1.2637757501173987,0.407952520131885,0.26419048867626627,0.5096594735475763,1.1754895526048537,0.7319126392706385,0.40158564417413745,0.171412092017746,0.24024836903448188,0.7719799420842062,0.6899784121495149,0.9716854922710776,1.7415623239456854,0.06554620423674384,0.5840535933740241,0.28069529933238835,1.7066699431966428,0.26326956875784635,1.0929133865851104,1.202140845981098,0.5155171686441324,0.31446815275047113,0.7157304890901917,1.3560636146446634,0.8088732340321387,0.7870694189420284,0.7331454675363749,0.35780612775403586,1.7728043235987454,0.2772361581634546,1.6975021550510694,0.5959604302751984,0.8912328542880772,1.6288679480605057,1.386564673562308,1.4103985686644709,1.9006877715119526,0.9315950122130072,1.6207141848623654,0.7683155712428822,1.584762767343988,1.9121866753124679,1.299064258143595,1.337147270842654,1.3623679049173871,0.05943178716712527,0.5815089977553316,1.2215168137204566,1.4041301531851769,1.6100784506664851,0.8596170464356696,0.6490531747132193,0.2471637933470907,0.036138171781702866,0.5969690894418114,1.5521508389742054,0.34068208402312505,1.8871971490976684,0.6714451265358141,1.4231352396899593,0.7615044777858189,0.49311722739119723,1.0420754711135132,0.8052203756993315,0.8892002199309981,1.4425135114037637,1.3522626577314685,0.4239308672426585,0.17909062231199835,0.3948514138523991,0.03490628725327172,0.749634269105254,1.4303243518991837,0.9586913686596281,0.39019285985629226,1.4890379106141638,0.28206870202697054,1.4035099689175317,1.506126180773967,1.24857664801903,0.21064341896977234,0.9172849638019773,1.9935383358339336,1.2482939729014495,0.402935828315516,0.6987083447239191,0.5693289194345272,0.5154235393116844,0.3253254109938446,1.7706300567348237,1.0025579838927459,0.09508736983700938,1.79810707979001,0.5579350784843409,1.8063590497338682,0.8561228208894174,0.15745935821787294,1.4980304620396607,1.7893491567747764,1.6379502503923433,0.5225516655675166,0.8238748776475928,0.8973876242943581,0.7306029596004104,1.1637440807338448,1.8281155272361351,0.795515153826778,0.9769457209597214,1.1751161080539556,0.08304441218440939,0.3990806451838371,0.23704399221941896,1.7267424236811504,0.3032200603899362,1.2141863333253693,0.08683926041183954,1.0910589143770868,1.4312788790864004,1.84590643283416,1.4809523288916728,1.5523279765050808,1.9544230043680795,1.5071461419091068,0.06002970360855375,0.24375568477031306,0.7994946983899709,0.7999174821530031,1.30319541273253,0.3220972783016314,1.6300720088680514,0.8598921880697956,0.461414129101287,1.6993882111327245,1.4513974749120284,0.8682416047867969,0.22260624513922433,1.7401221569939933,1.690221569465601,1.3209004460896798,0.27421878709124226,0.12821502164578824,1.0010948877824695,0.02137893670729829,0.26822513865203446,1.9500145743808899,0.4216399614718709,1.3700195905729258,0.6039607042536526,0.3176775483098213,0.9895589749227249,1.3128611986042054,1.72675013342519,1.9243565881949674,1.3092201426750596,0.3879499274443079,1.043462312348844,0.8786053915930858,0.6739698009368809,0.4535549049947236,1.9661143910936105,0.6908510368271852,0.29741790420652814,1.2573863874653939,1.6348805360367828,1.8637411377907211,1.333434006027764,1.605924051612262,0.19971095078530743,1.8631239289661559,1.6128380998462464,1.8068131534284593,0.8944081763114555,0.12369422539660846,1.4701369073549704,1.1305933791882996,0.9636735813071975,0.3532211951630453,1.9874187320738703,1.9780489609194438,0.8807711822322775,0.6576024155998925,1.7195034267233402,1.0588196074612584,0.16840591049513653,1.4194408125612972,1.3301123520897637,1.9141618890452308,0.810167241486782,0.922921337741029,0.605580950737302,1.9019308089941829,0.31974755584348813,1.9875425488074723,1.4636118405480985,1.7946802752733877,1.2774608133729215,0.648620740104846,1.5755231239865068,0.03902463538709222,1.0581583482997687,1.281814236437142,1.3279697878675791,0.38426011894284207,1.7293782981862162,0.26092762304576356,1.6850385751220154,0.81938582463673,0.10614436756575962,1.0567855484674014,0.6057281097027065,1.468067790887266,1.4502166830950673,1.8022920425752522,1.0852837180433803,1.933224951389728,1.8175016806896065,1.2747108732686154,1.0212925883281074,0.5550670155312458,1.275163413276473,1.1034756334951061,0.8640892928539703,0.9307519804289011,1.957288699538612,1.7498234024838974,1.249642180288948,1.0868905100554196,1.974983884794796,1.1578199982437605,1.7589725390466473,0.1150074341785694,0.859334380403797,1.1033079182664318,0.34314255178698083,0.06638639463731044,0.8994274596412235,0.5833735420653801,1.1261008918141195,0.4470752360132697,1.3340830010928983,0.39346395916841326,1.2144370397946065,1.7877152373671175,0.9079092637014683,1.7710678265015702,1.505267140226139,0.8842400119873792,0.17037161539252033,1.6640955974154696,1.1572041161322733,0.4299123457590244,0.8773190243969045,0.3499718256459987,1.6711969385549774,1.1816905620096647,1.6160158878249664,1.7566173425238354,0.6312689243817622,1.7685364955625218,0.7988290826503945,1.2974364489507706,1.7493413195901217,0.015349010284732234,0.15971468659407728,1.7390923035843446,0.6626121679276422,0.08227863853204775,0.6182556485655635,1.3867468507648257,0.9037568243110705,0.18375413697834775,0.8466535246619409,1.148704689694159,1.1250356017143073,1.2867205724601867,0.6063644209702868,1.7636117519856636,0.5373330622183641,1.2821171179346376,1.3238302429584907,0.3388367536341552,0.06427954455173124,1.369084157465879,0.7499458224706284,1.6223662988653356,0.9304785284767756,1.638620979928942,0.023160357564757206,1.5938130171492308,0.64832960761954,0.6582386016152166,0.3957008018071715,0.4310232265596823,1.9316118180579616,1.9912012832561437,0.7840711886146692,0.9422347565755866,1.6262182547291801,0.04333637531344703,1.2062415886125804,0.7817283723459103,1.3178552553665095,0.34802120502445666,0.4032151606987995,0.49481314832748513,0.26153522043894917,1.0610134410412573,1.6110570609133368,1.7235864558637708,1.3498143928281396,0.9406471823661695,0.5706646283938221,1.1659385868462269,0.9644294132523661,1.7043181920410264,0.22467682065845462,1.5971709516147636,1.859347741010835,0.12170716269536275,1.102699081379824,0.19328151797450221,0.22343704861307678,1.0405668279763116,0.2082678777823177,1.5652911284614763,0.8630018983324956,1.7436043039029325,1.302584494261029,1.127672236754945,1.2846304460334186,1.4562665778208053,1.5645580832820838,1.3948501898788992,0.029792895640926798,1.980294317969006,1.1123589507979128,1.0154868284400322,0.15076099183180158,0.1702978463185576,0.638512617666037,0.4593262227101036,1.2521350852795314,1.768873570571131,1.06344515128814,1.9933129955918667,1.9912811777591117,0.5114879062766935,1.9312893887170013,0.43615051800255644,1.3808217511358865,1.0127783662740608,1.200168345982449,1.1353871303826963,0.6984067002353171,1.2282762475063347,0.8602792889979356,0.4258654199682885,0.9494019383303476,1.4621051662990827,0.6464484429679347,0.54255424755471,0.7337672158688013,0.13947822151421185,0.1494544534242186,1.0716756999992962,1.6816140886571738,1.4263796086672729,0.27806782193383484,1.0773450430567717,0.32795735151958105,0.11971371153087595,1.8419472612691408,0.29701838909614997,1.0779509372207503,1.9953801862817153,0.7250110903612281,0.4067406944620182,1.227342541362074,1.8360463272194179,1.036122031657908,0.02960671879776333,0.6961863316573433,0.08169330218778947,0.7007523220027623,1.404547524177644,1.3593503386290489,1.5860439150469285,0.13374917490099492,1.3681657937643519,1.6386995006824732,1.2444937025768206,1.3643395072631699,0.000684178904792887,0.41002486824146844,1.7978578887521333,0.31417440442793376,1.1324362849687293,1.1610393250762554,0.5761178249553454,1.5897781324559839,1.869370093574552,1.777069480268986,0.2918385073282135,1.4687925382059817,0.6603029395025044,1.307566429849087,1.98726572444563,1.7291048928133872,0.7370220383537784,1.674490956808286,0.6869473509385147,1.0662666586682654,0.7751290367048655,0.2770701777596889,1.4473078326859397,1.6102865230776078,1.677150143180707,0.5696976940792342,0.5935642995846244,1.1477626192334003,1.3567854869172864,1.6088056547242617,1.873727096816697,1.5827602766226279,0.6769012645227357,0.49091161698180574,0.9905668777141128,1.1994724131815477,0.9930607116062369,0.04713923682521992,0.26052948701681444,1.267198874478653,1.1611272898008838,0.4997326681014096,1.6883487361321508,0.11232911308064564,0.32643817021206045,0.6806463371554972,0.4906616572186979,1.3382142001092414,0.21695209033359486,1.879464324860217,1.410253628074143,1.8546450797844334,0.2863004927262467,1.1964585595850274,1.6486086640102076,0.9697682869511683,0.19684793627741515,1.6688325514666489,1.3289890583948103,0.22303822536292994,1.0711378202708137,1.7876846067546648,0.0980268960629962,0.4261606125302553,1.4266210889792128,1.197114754344867,1.0668189109172848,1.6638332874834196,0.0675969846578135,1.112096277687232,1.4729369827158747,1.4717012610303852,0.43082827237223054,0.7604020442797386,0.7515857395002237,1.2108625992474393,0.7962528565638594,1.836826084145426,1.0340058285912557,1.963617112540446,0.5819079063671269,0.9466223366844742,1.0809704982117205,0.22624641601395679,1.9680504317629093,1.4298650728342213,1.9591494393836624,1.4583768790604816,1.0154123004442166,1.8685324408993464,0.3860152856504926,0.8484663612758534,0.06645660269782283,0.026059778642891107,0.5917621660521215,0.39851084642429324,0.773118233768936,0.06633618597729551,1.0479500650753888,0.2670346670416932,1.93107028677389,0.26623867804318424,1.7030380598640042,0.08718385037312926,0.4540920892351199,1.3726881952424246,0.11922615241510348,1.0660892040401646,1.0205310571998707,1.843219643255312,0.3044903932520744,1.6790240797795044,1.4917701800005636,0.23510237318163885,1.7371904798749007,0.17163420530131113,0.7132482757089909,1.3136274686202252,0.7699307016313983,0.1935967467763473,1.640937718907396,1.4321661048940104,1.8077297831188779,0.1833869150103209,0.6447596593283156,0.06048907173502194,0.06112290646230578,0.2377877531953141,0.18261311095596788,1.718004716605245,0.8331858431330996,1.000095244112888,0.6489659207468441,1.1440506611922219,1.5755354111741289,1.3687419942378218,0.11848928999115627,0.8265125171500975,0.7880536565908458,1.854837896302414,1.1825089106417521,0.9753074872727305,1.5180012254419601,1.640137868871673,1.6041498360846602,1.2747485715727138,0.14606430106222135,1.3548928669810318,0.7621461139366392,0.0088910929169006,1.2544086276393376,0.7596925318192795,0.7877083904265056,0.9840541699184473,0.25758625718674777,0.759433423081334,1.4307937853450996,1.737795047215136,0.7931388314313987,1.2560246099313273,0.6246356143784135,0.5570214597356498,1.0983751576113594,0.5892010936784224,1.9189749498339204,0.8247569926026794,1.7195939553395756,1.3321880956006225,0.9896066889335624,0.4444823939791429,1.5359459877311301,0.8733820888430515,0.04371602469992508,1.5807391796764612,0.6560860103335195,0.18100418572019494,1.9020887377147084,0.9371330448967838,1.8568524039062324,1.0307750485658875,0.5841017885144075,1.77506432572107,0.7998821910772485,1.6839711194176963,1.691569510214233,1.2360349231000387,1.9409791726395897,0.4114975378332022,1.6966113885418435,0.3185512305179352,1.7302851524299618,1.057634248944768,1.3543728555721604,0.23572281886020585,0.6914334595310243,1.7254877727241023,0.6747592464721412,0.8739608377104129,1.4892343136027977,1.125267332068169,0.3192316978731293,0.3415127152271564,1.7470135515208196,0.509553364041833,1.3944400134563932,0.5802096598590207,1.09873587835723,0.24974043410158853,1.0031830856373407,1.335431327844848,1.2283330827220342,0.4729982389154297,0.9659794819721967,1.0248223420553622,0.836549301348871,1.5079077810513986,1.8054071675915186,0.6843900243643444,1.7833183396498353,0.6626432184378235,0.7203142279215071,1.3126192425732133,0.350110498337481,0.19925746066483585,1.5895435484871099,0.8961509319340086,0.2129598163005535,1.2208044087295602,1.1620451552541446,1.5117192577414587,1.1426837942157526,1.6142411133467935,0.3573326628480151,1.4575561976144602,0.19114469782409804,0.997485343167023,1.3677708683963594,0.8002423115730974,1.796508886495923,1.5114640081831032,1.7141421787582565,0.37431961187198937,1.8211222853400937,0.3463636983052196,0.05800145610777241]}
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

var largeScale = require( './fixtures/julia/large_scale.json' );
var largeShape = require( './fixtures/julia/large_shape.json' );
var bothLarge = require( './fixtures/julia/both_large.json' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.equal( typeof factory, 'function', 'main export is a function' );
	t.end();
});

tape( 'the function returns a function', function test( t ) {
	var logcdf = factory( 1.0, 1.0, 1.0, 0.0 );
	t.equal( typeof logcdf, 'function', 'returns a function' );
	t.end();
});

tape( 'if provided `NaN` for any parameter, the created function returns `NaN`', function test( t ) {
	var logcdf;
	var y;

	logcdf = factory( 1.0, 1.0, 0.0 );
	y = logcdf( NaN );
	t.equal( isnan( y ), true, 'returns NaN' );

	logcdf = factory( NaN, 1.0, 0.0 );
	y = logcdf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	logcdf = factory( 1.0, NaN, 0.0 );
	y = logcdf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	logcdf = factory( 1.0, NaN, 1.0, NaN );
	y = logcdf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	logcdf = factory( NaN, NaN, NaN );
	y = logcdf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	logcdf = factory( NaN, NaN, NaN );
	y = logcdf( NaN );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'if provided a finite `alpha` and `s`, the function returns a function which returns `0` when provided `+infinity` for `x`', function test( t ) {
	var logcdf;
	var y;

	logcdf = factory( 1.0, 1.0, 0.0 );
	y = logcdf( PINF );
	t.equal( y, 0.0, 'returns 0' );

	t.end();
});

tape( 'if provided a finite `alpha` and `s`, the function returns a function which returns `-infinity` when provided `x <= m`', function test( t ) {
	var logcdf;
	var y;

	logcdf = factory( 1.0, 1.0, 2.0 );
	y = logcdf( NINF );
	t.equal( y, NINF, 'returns -infinity' );

	y = logcdf( -1.0 );
	t.equal( y, NINF, 'returns -infinity' );

	y = logcdf( 0.0 );
	t.equal( y, NINF, 'returns -infinity' );

	y = logcdf( 1.0 );
	t.equal( y, NINF, 'returns -infinity' );

	y = logcdf( 2.0 );
	t.equal( y, NINF, 'returns -infinity' );

	t.end();
});

tape( 'if provided a nonpositive `s`, the created function always returns `NaN`', function test( t ) {
	var logcdf;
	var y;

	logcdf = factory( 1.0, -1.0, 1.0 );

	y = logcdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = logcdf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	logcdf = factory( 1.0, 0.0, 1.0 );

	y = logcdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = logcdf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	logcdf = factory( 1.0, NINF, 1.0 );
	y = logcdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	logcdf = factory( PINF, NINF, 1.0 );
	y = logcdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	logcdf = factory( NaN, NINF, NaN );
	y = logcdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'the created function evaluates the logcdf for `x` given large `alpha`', function test( t ) {
	var expected;
	var logcdf;
	var alpha;
	var delta;
	var tol;
	var s;
	var x;
	var y;
	var i;

	expected = largeShape.expected;
	x = largeShape.x;
	alpha = largeShape.alpha;
	s = largeShape.s;
	for ( i = 0; i < x.length; i++ ) {
		logcdf = factory( alpha[i], s[i], 0.0 );
		y = logcdf( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', alpha: '+alpha[i]+', s: '+s[i]+', m: 0, y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 20.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. alpha: '+alpha[i]+'. s: '+s[i]+'. m: 0. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the created function evaluates the logcdf for `x` given large `s`', function test( t ) {
	var expected;
	var logcdf;
	var alpha;
	var delta;
	var tol;
	var s;
	var x;
	var y;
	var i;

	expected = largeScale.expected;
	x = largeScale.x;
	alpha = largeScale.alpha;
	s = largeScale.s;
	for ( i = 0; i < x.length; i++ ) {
		logcdf = factory( alpha[i], s[i], 0.0 );
		y = logcdf( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', alpha:'+alpha[i]+', s: '+s[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 10.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. alpha: '+alpha[i]+'. s: '+s[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the created function evaluates the logcdf for `x` given large `alpha` and `s`', function test( t ) {
	var expected;
	var logcdf;
	var alpha;
	var delta;
	var tol;
	var s;
	var x;
	var y;
	var i;

	expected = bothLarge.expected;
	x = bothLarge.x;
	alpha = bothLarge.alpha;
	s = bothLarge.s;
	for ( i = 0; i < x.length; i++ ) {
		logcdf = factory( alpha[i], s[i], 0.0 );
		y = logcdf( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', alpha:'+alpha[i]+', s: '+s[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 20.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. alpha: '+alpha[i]+'. s: '+s[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

}).call(this,"/lib/node_modules/@stdlib/math/base/dists/frechet/logcdf/test/test.factory.js")
},{"./../lib/factory.js":49,"./fixtures/julia/both_large.json":52,"./fixtures/julia/large_scale.json":53,"./fixtures/julia/large_shape.json":54,"@stdlib/constants/math/float64-eps":26,"@stdlib/constants/math/float64-ninf":33,"@stdlib/constants/math/float64-pinf":34,"@stdlib/math/base/assert/is-nan":45,"@stdlib/math/base/special/abs":59,"tape":180}],56:[function(require,module,exports){
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

}).call(this,"/lib/node_modules/@stdlib/math/base/dists/frechet/logcdf/test/test.js")
},{"./../lib":50,"tape":180}],57:[function(require,module,exports){
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

var largeScale = require( './fixtures/julia/large_scale.json' );
var largeShape = require( './fixtures/julia/large_shape.json' );
var bothLarge = require( './fixtures/julia/both_large.json' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.equal( typeof logcdf, 'function', 'main export is a function' );
	t.end();
});

tape( 'if provided `NaN` for any parameter, the function returns `NaN`', function test( t ) {
	var y = logcdf( NaN, 1.0, 1.0, -1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );
	y = logcdf( 0.0, NaN, 1.0, -1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );
	y = logcdf( 0.0, 1.0, NaN, -1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );
	y = logcdf( 0.0, 1.0, 1.0, NaN );
	t.equal( isnan( y ), true, 'returns NaN' );
	t.end();
});

tape( 'if provided `+infinity` for `x` and a valid `alpha` and `s`, the function returns `0`', function test( t ) {
	var y = logcdf( PINF, 1.0, 1.0, 1.0 );
	t.equal( y, 0.0, 'returns 0' );
	t.end();
});

tape( 'if provided `x <= m` and a valid `alpha` and `s`, the function returns `0`', function test( t ) {
	var y = logcdf( NINF, 1.0, 1.0, 1.0 );
	t.equal( y, NINF, 'returns -infinity' );

	y = logcdf( 0.0, 1.0, 1.0, 1.0 );
	t.equal( y, NINF, 'returns -infinity' );

	y = logcdf( 1.0, 1.0, 1.0, 1.0 );
	t.equal( y, NINF, 'returns -infinity' );

	y = logcdf( 2.0, 1.0, 1.0, 3.0 );
	t.equal( y, NINF, 'returns -infinity' );

	t.end();
});

tape( 'if provided a nonpositive `alpha`, the function returns `NaN`', function test( t ) {
	var y;

	y = logcdf( 2.0, -1.0, 1.0, 1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = logcdf( 0.0, -1.0, 1.0, 1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = logcdf( 2.0, 0.0, 1.0, 1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = logcdf( 0.0, 0.0, 1.0, 1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = logcdf( 2.0, NINF, 1.0, 1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = logcdf( 2.0, NINF, PINF, 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = logcdf( 2.0, NINF, NaN, NaN );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'if provided a nonpositive `s`, the function returns `NaN`', function test( t ) {
	var y;

	y = logcdf( 2.0, 2.0, -1.0, 1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = logcdf( 0.0, 2.0, -1.0, 1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = logcdf( 2.0, 2.0, 0.0, 1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = logcdf( 0.0, 2.0, 0.0, 1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = logcdf( 2.0, 1.0, NINF, 1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = logcdf( 2.0, PINF, NINF, 1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = logcdf( 2.0, NaN, NINF, NaN );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'the function evaluates the logcdf for `x` given large `alpha`', function test( t ) {
	var expected;
	var alpha;
	var delta;
	var tol;
	var s;
	var x;
	var y;
	var i;

	expected = largeShape.expected;
	x = largeShape.x;
	alpha = largeShape.alpha;
	s = largeShape.s;
	for ( i = 0; i < x.length; i++ ) {
		y = logcdf( x[i], alpha[i], s[i], 0.0 );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', alpha: '+alpha[i]+', s: '+s[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 20.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. alpha: '+alpha[i]+'. s: '+s[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the function evaluates the logcdf for `x` given large `s`', function test( t ) {
	var expected;
	var alpha;
	var delta;
	var tol;
	var s;
	var x;
	var y;
	var i;

	expected = largeScale.expected;
	x = largeScale.x;
	alpha = largeScale.alpha;
	s = largeScale.s;
	for ( i = 0; i < x.length; i++ ) {
		y = logcdf( x[i], alpha[i], s[i], 0.0 );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', alpha: '+alpha[i]+', s: '+s[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 10.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. alpha: '+alpha[i]+'. s: '+s[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the function evaluates the logcdf for `x` given large `alpha` and `s`', function test( t ) {
	var expected;
	var alpha;
	var delta;
	var tol;
	var s;
	var x;
	var y;
	var i;

	expected = bothLarge.expected;
	x = bothLarge.x;
	alpha = bothLarge.alpha;
	s = bothLarge.s;
	for ( i = 0; i < x.length; i++ ) {
		y = logcdf( x[i], alpha[i], s[i], 0.0 );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', alpha: '+alpha[i]+', s: '+s[i]+', m: 0, y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 20.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. alpha: '+alpha[i]+'. s: '+s[i]+'. y: '+y+'. m: 0. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

}).call(this,"/lib/node_modules/@stdlib/math/base/dists/frechet/logcdf/test/test.logcdf.js")
},{"./../lib":50,"./fixtures/julia/both_large.json":52,"./fixtures/julia/large_scale.json":53,"./fixtures/julia/large_shape.json":54,"@stdlib/constants/math/float64-eps":26,"@stdlib/constants/math/float64-ninf":33,"@stdlib/constants/math/float64-pinf":34,"@stdlib/math/base/assert/is-nan":45,"@stdlib/math/base/special/abs":59,"tape":180}],58:[function(require,module,exports){
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

},{"@stdlib/number/float64/base/from-words":80,"@stdlib/number/float64/base/get-high-word":84,"@stdlib/number/float64/base/to-words":95}],61:[function(require,module,exports){
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

},{"@stdlib/constants/math/float64-exponent-bias":27,"@stdlib/constants/math/float64-max-base2-exponent":31,"@stdlib/constants/math/float64-max-base2-exponent-subnormal":30,"@stdlib/constants/math/float64-min-base2-exponent-subnormal":32,"@stdlib/constants/math/float64-ninf":33,"@stdlib/constants/math/float64-pinf":34,"@stdlib/math/base/assert/is-infinite":41,"@stdlib/math/base/assert/is-nan":45,"@stdlib/math/base/special/copysign":61,"@stdlib/number/float64/base/exponent":78,"@stdlib/number/float64/base/from-words":80,"@stdlib/number/float64/base/normalize":86,"@stdlib/number/float64/base/to-words":95}],66:[function(require,module,exports){
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

},{"./pow.js":72}],67:[function(require,module,exports){
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

},{"./polyval_l.js":69,"@stdlib/constants/math/float64-exponent-bias":27,"@stdlib/number/float64/base/get-high-word":84,"@stdlib/number/float64/base/set-high-word":90,"@stdlib/number/float64/base/set-low-word":92}],68:[function(require,module,exports){
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

},{"./polyval_w.js":71,"@stdlib/number/float64/base/set-low-word":92}],69:[function(require,module,exports){
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

},{}],70:[function(require,module,exports){
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

},{}],71:[function(require,module,exports){
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

},{}],72:[function(require,module,exports){
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

},{"./log2ax.js":67,"./logx.js":68,"./pow2.js":73,"./x_is_zero.js":74,"./y_is_huge.js":75,"./y_is_infinite.js":76,"@stdlib/constants/math/float64-ninf":33,"@stdlib/constants/math/float64-pinf":34,"@stdlib/math/base/assert/is-infinite":41,"@stdlib/math/base/assert/is-integer":43,"@stdlib/math/base/assert/is-nan":45,"@stdlib/math/base/assert/is-odd":47,"@stdlib/math/base/special/abs":59,"@stdlib/math/base/special/sqrt":77,"@stdlib/number/float64/base/set-low-word":92,"@stdlib/number/float64/base/to-words":95,"@stdlib/number/uint32/base/to-int32":99}],73:[function(require,module,exports){
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

},{"./polyval_p.js":70,"@stdlib/constants/math/float64-exponent-bias":27,"@stdlib/constants/math/float64-ln-two":29,"@stdlib/math/base/special/ldexp":64,"@stdlib/number/float64/base/get-high-word":84,"@stdlib/number/float64/base/set-high-word":90,"@stdlib/number/float64/base/set-low-word":92,"@stdlib/number/uint32/base/to-int32":99}],74:[function(require,module,exports){
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

},{"@stdlib/constants/math/float64-ninf":33,"@stdlib/constants/math/float64-pinf":34,"@stdlib/math/base/assert/is-odd":47,"@stdlib/math/base/special/copysign":61}],75:[function(require,module,exports){
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

},{"@stdlib/number/float64/base/get-high-word":84}],76:[function(require,module,exports){
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

},{"@stdlib/constants/math/float64-pinf":34,"@stdlib/math/base/special/abs":59}],77:[function(require,module,exports){
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

},{}],78:[function(require,module,exports){
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

},{"./main.js":79}],79:[function(require,module,exports){
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

},{"@stdlib/constants/math/float64-exponent-bias":27,"@stdlib/constants/math/float64-high-word-exponent-mask":28,"@stdlib/number/float64/base/get-high-word":84}],80:[function(require,module,exports){
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

},{"./main.js":82}],81:[function(require,module,exports){
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

},{"@stdlib/assert/is-little-endian":18}],82:[function(require,module,exports){
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

},{"./indices.js":81,"@stdlib/array/float64":2,"@stdlib/array/uint32":7}],83:[function(require,module,exports){
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

},{"@stdlib/assert/is-little-endian":18}],84:[function(require,module,exports){
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

},{"./main.js":85}],85:[function(require,module,exports){
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

},{"./high.js":83,"@stdlib/array/float64":2,"@stdlib/array/uint32":7}],86:[function(require,module,exports){
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

},{"./main.js":87}],87:[function(require,module,exports){
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

},{"./normalize.js":88}],88:[function(require,module,exports){
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

},{"@stdlib/constants/math/float64-smallest-normal":35,"@stdlib/math/base/assert/is-infinite":41,"@stdlib/math/base/assert/is-nan":45,"@stdlib/math/base/special/abs":59}],89:[function(require,module,exports){
arguments[4][83][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":18,"dup":83}],90:[function(require,module,exports){
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

},{"./main.js":91}],91:[function(require,module,exports){
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

},{"./high.js":89,"@stdlib/array/float64":2,"@stdlib/array/uint32":7}],92:[function(require,module,exports){
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

},{"./main.js":94}],93:[function(require,module,exports){
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

},{"@stdlib/assert/is-little-endian":18}],94:[function(require,module,exports){
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

},{"./low.js":93,"@stdlib/array/float64":2,"@stdlib/array/uint32":7}],95:[function(require,module,exports){
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

},{"./main.js":97}],96:[function(require,module,exports){
arguments[4][81][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":18,"dup":81}],97:[function(require,module,exports){
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

},{"./to_words.js":98}],98:[function(require,module,exports){
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

},{"./indices.js":96,"@stdlib/array/float64":2,"@stdlib/array/uint32":7}],99:[function(require,module,exports){
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

},{"./main.js":100}],100:[function(require,module,exports){
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

},{}],101:[function(require,module,exports){
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

},{}],102:[function(require,module,exports){
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

},{"./constant_function.js":101}],103:[function(require,module,exports){
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

},{}],104:[function(require,module,exports){
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

},{"./define_read_only_property.js":103}],105:[function(require,module,exports){
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

},{"./float64array.js":106,"@stdlib/assert/is-float64array":15}],106:[function(require,module,exports){
'use strict';

// EXPORTS //

module.exports = ( typeof Float64Array === 'function' ) ? Float64Array : null;

},{}],107:[function(require,module,exports){
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

},{"./detect_float64array_support.js":105}],108:[function(require,module,exports){
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

},{}],109:[function(require,module,exports){
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

},{"./detect_symbol_support.js":108}],110:[function(require,module,exports){
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

},{"@stdlib/utils/detect-symbol-support":109}],111:[function(require,module,exports){
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

},{"./has_tostringtag_support.js":110}],112:[function(require,module,exports){
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

},{"./uint16array.js":114,"@stdlib/assert/is-uint16array":20,"@stdlib/constants/math/uint16-max":36}],113:[function(require,module,exports){
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

},{"./detect_uint16array_support.js":112}],114:[function(require,module,exports){
'use strict';

// EXPORTS //

module.exports = ( typeof Uint16Array === 'function' ) ? Uint16Array : null;

},{}],115:[function(require,module,exports){
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

},{"./uint32array.js":117,"@stdlib/assert/is-uint32array":22,"@stdlib/constants/math/uint32-max":37}],116:[function(require,module,exports){
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

},{"./detect_uint32array_support.js":115}],117:[function(require,module,exports){
'use strict';

// EXPORTS //

module.exports = ( typeof Uint32Array === 'function' ) ? Uint32Array : null;

},{}],118:[function(require,module,exports){
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

},{"./uint8array.js":120,"@stdlib/assert/is-uint8array":24,"@stdlib/constants/math/uint8-max":38}],119:[function(require,module,exports){
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

},{"./detect_uint8array_support.js":118}],120:[function(require,module,exports){
'use strict';

// EXPORTS //

module.exports = ( typeof Uint8Array === 'function' ) ? Uint8Array : null;

},{}],121:[function(require,module,exports){
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

},{"./native_class.js":122,"./polyfill.js":123,"@stdlib/utils/detect-tostringtag-support":111}],122:[function(require,module,exports){
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

},{"./tostring.js":124}],123:[function(require,module,exports){
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

},{"./tostring.js":124,"./tostringtag.js":125,"@stdlib/assert/has-own-property":14}],124:[function(require,module,exports){
'use strict';

// MAIN //

var toStr = Object.prototype.toString;


// EXPORTS //

module.exports = toStr;

},{}],125:[function(require,module,exports){
'use strict';

// MAIN //

var toStrTag = ( typeof Symbol === 'function' ) ? Symbol.toStringTag : '';


// EXPORTS //

module.exports = toStrTag;

},{}],126:[function(require,module,exports){
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

},{}],127:[function(require,module,exports){

},{}],128:[function(require,module,exports){
arguments[4][127][0].apply(exports,arguments)
},{"dup":127}],129:[function(require,module,exports){
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

},{}],130:[function(require,module,exports){
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

},{"base64-js":126,"ieee754":149}],131:[function(require,module,exports){
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
},{"../../is-buffer/index.js":151}],132:[function(require,module,exports){
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

},{"./lib/is_arguments.js":133,"./lib/keys.js":134}],133:[function(require,module,exports){
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

},{}],134:[function(require,module,exports){
exports = module.exports = typeof Object.keys === 'function'
  ? Object.keys : shim;

exports.shim = shim;
function shim (obj) {
  var keys = [];
  for (var key in obj) keys.push(key);
  return keys;
}

},{}],135:[function(require,module,exports){
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

},{"foreach":145,"object-keys":155}],136:[function(require,module,exports){
module.exports = function () {
    for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] !== undefined) return arguments[i];
    }
};

},{}],137:[function(require,module,exports){
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

},{"./helpers/isFinite":138,"./helpers/isNaN":139,"./helpers/mod":140,"./helpers/sign":141,"es-to-primitive/es5":142,"has":148,"is-callable":152}],138:[function(require,module,exports){
var $isNaN = Number.isNaN || function (a) { return a !== a; };

module.exports = Number.isFinite || function (x) { return typeof x === 'number' && !$isNaN(x) && x !== Infinity && x !== -Infinity; };

},{}],139:[function(require,module,exports){
module.exports = Number.isNaN || function isNaN(a) {
	return a !== a;
};

},{}],140:[function(require,module,exports){
module.exports = function mod(number, modulo) {
	var remain = number % modulo;
	return Math.floor(remain >= 0 ? remain : remain + modulo);
};

},{}],141:[function(require,module,exports){
module.exports = function sign(number) {
	return number >= 0 ? 1 : -1;
};

},{}],142:[function(require,module,exports){
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

},{"./helpers/isPrimitive":143,"is-callable":152}],143:[function(require,module,exports){
module.exports = function isPrimitive(value) {
	return value === null || (typeof value !== 'function' && typeof value !== 'object');
};

},{}],144:[function(require,module,exports){
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

},{}],145:[function(require,module,exports){

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


},{}],146:[function(require,module,exports){
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

},{}],147:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

module.exports = Function.prototype.bind || implementation;

},{"./implementation":146}],148:[function(require,module,exports){
var bind = require('function-bind');

module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);

},{"function-bind":147}],149:[function(require,module,exports){
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

},{}],150:[function(require,module,exports){
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

},{}],151:[function(require,module,exports){
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

},{}],152:[function(require,module,exports){
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

},{}],153:[function(require,module,exports){
var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};

},{}],154:[function(require,module,exports){
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

},{}],155:[function(require,module,exports){
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

},{"./isArguments":156}],156:[function(require,module,exports){
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

},{}],157:[function(require,module,exports){
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
},{"_process":129}],158:[function(require,module,exports){
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
},{"_process":129}],159:[function(require,module,exports){
module.exports = require('./lib/_stream_duplex.js');

},{"./lib/_stream_duplex.js":160}],160:[function(require,module,exports){
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
},{"./_stream_readable":162,"./_stream_writable":164,"core-util-is":131,"inherits":150,"process-nextick-args":158}],161:[function(require,module,exports){
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
},{"./_stream_transform":163,"core-util-is":131,"inherits":150}],162:[function(require,module,exports){
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
},{"./_stream_duplex":160,"./internal/streams/BufferList":165,"./internal/streams/destroy":166,"./internal/streams/stream":167,"_process":129,"core-util-is":131,"events":144,"inherits":150,"isarray":153,"process-nextick-args":158,"safe-buffer":173,"string_decoder/":179,"util":127}],163:[function(require,module,exports){
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
},{"./_stream_duplex":160,"core-util-is":131,"inherits":150}],164:[function(require,module,exports){
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
},{"./_stream_duplex":160,"./internal/streams/destroy":166,"./internal/streams/stream":167,"_process":129,"core-util-is":131,"inherits":150,"process-nextick-args":158,"safe-buffer":173,"util-deprecate":186}],165:[function(require,module,exports){
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
},{"safe-buffer":173}],166:[function(require,module,exports){
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
},{"process-nextick-args":158}],167:[function(require,module,exports){
module.exports = require('events').EventEmitter;

},{"events":144}],168:[function(require,module,exports){
module.exports = require('./readable').PassThrough

},{"./readable":169}],169:[function(require,module,exports){
exports = module.exports = require('./lib/_stream_readable.js');
exports.Stream = exports;
exports.Readable = exports;
exports.Writable = require('./lib/_stream_writable.js');
exports.Duplex = require('./lib/_stream_duplex.js');
exports.Transform = require('./lib/_stream_transform.js');
exports.PassThrough = require('./lib/_stream_passthrough.js');

},{"./lib/_stream_duplex.js":160,"./lib/_stream_passthrough.js":161,"./lib/_stream_readable.js":162,"./lib/_stream_transform.js":163,"./lib/_stream_writable.js":164}],170:[function(require,module,exports){
module.exports = require('./readable').Transform

},{"./readable":169}],171:[function(require,module,exports){
module.exports = require('./lib/_stream_writable.js');

},{"./lib/_stream_writable.js":164}],172:[function(require,module,exports){
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
},{"_process":129,"through":185}],173:[function(require,module,exports){
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

},{"buffer":130}],174:[function(require,module,exports){
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

},{"events":144,"inherits":150,"readable-stream/duplex.js":159,"readable-stream/passthrough.js":168,"readable-stream/readable.js":169,"readable-stream/transform.js":170,"readable-stream/writable.js":171}],175:[function(require,module,exports){
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

},{"es-abstract/es5":137,"function-bind":147}],176:[function(require,module,exports){
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

},{"./implementation":175,"./polyfill":177,"./shim":178,"define-properties":135,"function-bind":147}],177:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

var zeroWidthSpace = '\u200b';

module.exports = function getPolyfill() {
	if (String.prototype.trim && zeroWidthSpace.trim() === zeroWidthSpace) {
		return String.prototype.trim;
	}
	return implementation;
};

},{"./implementation":175}],178:[function(require,module,exports){
'use strict';

var define = require('define-properties');
var getPolyfill = require('./polyfill');

module.exports = function shimStringTrim() {
	var polyfill = getPolyfill();
	define(String.prototype, { trim: polyfill }, { trim: function () { return String.prototype.trim !== polyfill; } });
	return polyfill;
};

},{"./polyfill":177,"define-properties":135}],179:[function(require,module,exports){
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
},{"safe-buffer":173}],180:[function(require,module,exports){
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
},{"./lib/default_stream":181,"./lib/results":183,"./lib/test":184,"_process":129,"defined":136,"through":185}],181:[function(require,module,exports){
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
},{"_process":129,"fs":128,"through":185}],182:[function(require,module,exports){
(function (process){
module.exports = typeof setImmediate !== 'undefined'
    ? setImmediate
    : process.nextTick
;

}).call(this,require('_process'))
},{"_process":129}],183:[function(require,module,exports){
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
},{"_process":129,"events":144,"function-bind":147,"has":148,"inherits":150,"object-inspect":154,"resumer":172,"through":185}],184:[function(require,module,exports){
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
},{"./next_tick":182,"deep-equal":132,"defined":136,"events":144,"has":148,"inherits":150,"path":157,"string.prototype.trim":176}],185:[function(require,module,exports){
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
},{"_process":129,"stream":174}],186:[function(require,module,exports){
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
