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


// MAIN //

/**
* Returns a function for evaluating the quantile function for a Pareto (Type I) distribution with shape parameter `alpha` and scale parameter `beta`.
*
* @param {PositiveNumber} alpha - shape parameter
* @param {PositiveNumber} beta - scale parameter
* @returns {Function} quantile function
*
* @example
* var quantile = factory( 2.5, 0.5 );
* var y = quantile( 0.5 );
* // returns ~0.66
*
* y = quantile( 0.8 );
* // returns ~0.952
*/
function factory( alpha, beta ) {
	var alphaInv;
	if (
		isnan( alpha ) ||
		isnan( beta ) ||
		alpha <= 0.0 ||
		beta <= 0.0
	) {
		return constantFunction( NaN );
	}
	alphaInv = 1.0 / alpha;
	return quantile;

	/**
	* Evaluates the quantile function for a Pareto (Type I) distribution.
	*
	* @private
	* @param {Probability} p - input value
	* @returns {number} evaluated quantile function
	*
	* @example
	* var y = quantile( 0.3 );
	* // returns <number>
	*/
	function quantile( p ) {
		if ( isnan( p ) || p < 0.0 || p > 1.0 ) {
			return NaN;
		}
		return beta / pow( 1.0 - p, alphaInv );
	}
}


// EXPORTS //

module.exports = factory;

},{"@stdlib/math/base/assert/is-nan":45,"@stdlib/math/base/special/pow":66,"@stdlib/utils/constant-function":102}],50:[function(require,module,exports){
'use strict';

/**
* Pareto (Type I) distribution quantile function.
*
* @module @stdlib/math/base/dists/pareto-type1/quantile
*
* @example
* var quantile = require( '@stdlib/math/base/dists/pareto-type1/quantile' );
*
* var y = quantile( 0.8, 2.0, 1.0 );
* // returns ~2.236
*
* y = quantile( 0.8, 1.0, 10.0 );
* // returns ~50.0
*
* y = quantile( 0.1, 1.0, 10.0 );
* // returns ~10.541
*
* var myquantile = quantile.factory( 2.5, 0.5 );
* y = myquantile( 0.5 );
* // returns ~0.66
*
* y = myquantile( 0.8 );
* // returns ~0.952
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-read-only-property' );
var quantile = require( './quantile.js' );
var factory = require( './factory.js' );


// MAIN //

setReadOnly( quantile, 'factory', factory );


// EXPORTS //

module.exports = quantile;

},{"./factory.js":49,"./quantile.js":51,"@stdlib/utils/define-read-only-property":104}],51:[function(require,module,exports){
'use strict';

// MODULES //

var isnan = require( '@stdlib/math/base/assert/is-nan' );
var pow = require( '@stdlib/math/base/special/pow' );


// MAIN //

/**
* Evaluates the quantile function for a Pareto (Type I) distribution with shape parameter `alpha` and scale parameter `beta` at a probability `p`.
*
* @param {Probability} p - input value
* @param {PositiveNumber} alpha - shape parameter
* @param {PositiveNumber} beta - scale parameter
* @returns {number} evaluated quantile function
*
* @example
* var y = quantile( 0.8, 2.0, 1.0 );
* // returns ~2.236
*
* @example
* var y = quantile( 0.8, 1.0, 10.0 );
* // returns ~50.0
*
* @example
* var y = quantile( 0.1, 1.0, 10.0 );
* // returns ~10.541
*
* @example
* var y = quantile( 1.1, 1.0, 1.0 );
* // returns NaN
*
* @example
* var y = quantile( -0.2, 1.0, 1.0 );
* // returns NaN
*
* @example
* var y = quantile( NaN, 1.0, 1.0 );
* // returns NaN
*
* @example
* var y = quantile( 0.5, NaN, 1.0 );
* // returns NaN
*
* @example
* var y = quantile( 0.5, 1.0, NaN );
* // returns NaN
*
* @example
* var y = quantile( 0.5, -1.0, 1.0 );
* // returns NaN
*
* @example
* var y = quantile( 0.5, 1.0, -1.0 );
* // returns NaN
*/
function quantile( p, alpha, beta ) {
	if (
		isnan( alpha ) ||
		isnan( beta ) ||
		isnan( p ) ||
		alpha <= 0.0 ||
		beta <= 0.0 ||
		p < 0.0 ||
		p > 1.0
	) {
		return NaN;
	}
	return beta / pow( 1.0 - p, 1.0/alpha );
}


// EXPORTS //

module.exports = quantile;

},{"@stdlib/math/base/assert/is-nan":45,"@stdlib/math/base/special/pow":66}],52:[function(require,module,exports){
module.exports={"expected":[16.8691318208387,16.442550247219476,12.254489384098953,13.481788759666227,21.60021026785545,11.193992952061274,18.039007641910075,24.68625559930668,27.015982545528278,27.8729372641354,28.57825367185751,11.015282357435705,37.51479046002579,15.595739424263199,13.89136050253677,18.52240153497241,30.882599811014725,21.833383534044327,10.98364455732715,32.642765458065895,28.018891782259075,24.17492734869151,20.532253008074424,19.850743764908632,21.892247878273462,16.822564689782705,19.57994826362689,13.852410880353736,10.650461669124915,17.11679265994883,23.248745433181547,30.988734101094863,14.226568426439103,23.3924126656239,24.498904443436746,29.7420648948377,13.003711295208264,28.812661344555913,13.661392814171293,14.260154778947856,10.813855506713946,27.663804627106156,26.49145672437767,11.690284221913801,29.956529031958123,23.472732193153963,26.94732583210037,14.069113991913838,21.280108988912357,17.53471942301139,14.696418232537097,17.692495143289626,29.831460694545132,30.504163945157696,21.174544990945073,18.035640195382047,29.157907644778945,30.806836269269905,24.186877790645916,17.12819359575295,21.50953329095819,22.81125891168167,22.833249672349414,16.977171968755783,18.683319237713672,27.37665803341357,14.413565276676202,25.609504992583734,14.53961926346789,26.73805108540705,31.28949823555893,28.691157157044692,29.89716784341457,20.85014585244149,19.235043515440054,19.23990040560538,34.65175714989794,25.16924671180257,21.355407288399984,28.05730041287479,28.994109484764042,15.403673417828688,29.614525264980752,24.912636113385062,31.343810914977915,26.775954371719912,23.36886070622726,22.97185619120461,20.688634692083536,19.832051932653055,21.888324747754474,15.441061221741311,27.29108018625333,29.070559445518278,17.17779303282009,18.693160712195823,38.74719389379544,32.18612276435134,29.676903828527124,22.146326640412607,27.534750140810324,29.625286352114546,13.359357055032897,27.13454897486271,14.108135405053899,14.761609293585712,19.433966444931215,23.29299768992112,22.02577487603862,15.806489488792842,27.068263638874775,18.66837568163181,22.00275537062928,10.600889900961779,21.749906993339614,29.143458331213857,28.568958620256964,21.502357763166092,16.5542248449458,29.51715517470657,13.409483086219504,26.27407164666821,10.889186792443585,19.707073422598107,21.033969425182203,25.838113334451688,24.15448669940225,19.072398032357103,30.12730604158627,29.541588732595795,25.828087054977615,25.011439472150027,12.824467056714338,25.30728007723723,12.189358127600643,29.036154097926136,23.411011036148253,25.31125111233022,12.485205501931105,16.556999108318898,27.871797217392913,26.841688603296458,26.244378250777824,29.77378103436774,12.883427939807444,16.79065527891516,30.93916737696149,13.97348569603631,28.597367406247585,26.284776096942046,23.017800051801565,19.38185820406505,23.114207795631668,29.221249575283274,17.51657111068893,19.697446077771996,17.35647460269353,19.722682539896084,19.777860582315963,11.812651234312025,17.84606460116854,17.8563249807196,26.446895180482073,19.52725794072979,12.896471243607252,20.07656568658958,13.675204550561032,17.472342407020022,25.196395304337845,25.852678982698023,27.32361809372241,28.058594782466507,17.153821162965002,24.252595060200065,25.829224026825223,16.039008039815407,28.27462273704741,29.590075963787093,29.170488119352957,25.556118601949972,13.335706481809245,18.68455315744108,23.83456109843835,22.766101028786974,37.14082111178157,25.04472160032282,16.26414330678098,14.777483003295384,27.827578239312025,27.188039362885434,14.55874349029455,17.82567310335055,23.772034740114652,28.96193384848287,58.89155912550854,18.693051744869532,18.186939484711807,16.762731430731197,28.200941532678936,18.32409224858966,24.91870160279737,25.77082265787712,12.04947803663282,24.47557557881858,28.929812159119685,25.192104455291048,15.967291568966244,32.16777129985103,17.30199855248757,31.11678773950394,26.773203543786465,17.980786026647163,31.107579565899478,25.074800847190616,17.55655057071897,24.939363569742596,25.04257700456221,30.072139198065607,33.51639227740878,12.738757069220078,31.3358019302631,16.564084796681744,21.56780657320869,27.218422100072242,27.153147467793698,25.66926602837319,13.862291116045828,22.17772870449106,21.997493201702415,22.94827240026367,30.214469621729076,27.76421620340213,14.848475429147912,32.398036117184,21.145174354423535,32.331172224394884,18.080468551293666,29.57067420763463,27.703285856890002,15.852804141850214,15.916306003995171,14.012603747218055,28.042414108804824,20.167342793650008,13.721866801758324,17.96260435010886,28.27334941025209,25.788053948807516,13.398848263403124,22.412315204177684,20.311755398245737,19.339779288622037,23.74950347636212,15.737384730952312,24.930318189452795,34.446461729566074,29.145565585214747,27.133424945159575,16.39259801469958,22.0369578526798,20.450239959890766,11.869721383518462,20.17186534434684,30.386740664868988,27.778622513318947,19.758923781917314,23.707177657919875,20.099890669025033,32.94376890012979,23.22750029642784,34.22462778821633,15.227555045610346,24.794077799597666,13.98721457680618,12.61256738921349,30.07263019648923,24.5403461754289,31.23848375185406,32.4644012086251,16.62581881666513,29.760418314806902,11.654349675103719,25.882079085702923,30.011230843816172,24.143407180022056,20.274666836067823,24.44115368110889,21.58604328210249,13.439755066842771,16.34747252968495,10.960678041539783,16.686158652769944,31.064635532012613,27.028312209861248,29.42151767256788,29.965129718839002,14.124651898485604,16.86906816201297,25.90455589318734,22.965993553979445,25.48378895102599,12.542308751418204,23.812018717761443,17.837474144213306,13.669737319096646,25.348148335462984,21.054821380123652,21.600641577100692,11.355422675026132,15.895327325650154,19.082723346791912,21.00178505191444,25.95758833355794,25.423411419024834,14.438952415950482,15.435925061547197,29.43659984259927,13.336086493997671,21.390890671366755,26.85480891783156,21.96943554041738,14.189225120974182,25.83207927740177,23.930983606095026,11.016992361779495,26.43343773756995,17.01496941523878,20.178874346244125,27.501816038907894,13.761446062302596,15.699469798260523,25.086481015877403,21.636216773422273,32.7920535404842,17.740841591644443,23.565898688099058,24.105099834505506,22.728092578906374,10.735572624182579,13.982366011111887,30.19867223538967,22.538882696587535,18.09723790720341,28.692937323994563,10.945097744066123,23.940863580800357,13.26098939940906,24.58496406591973,16.55257175337576,18.973409047955123,17.682144008948498,26.31908843909901,19.51470609874795,29.800677947112547,21.733959351939923,11.092834659178369,19.993505202015697,24.904880967393662,14.903609406698353,15.853243370442133,11.63890391321848,19.714139471464172,11.024676853497883,11.566596928335631,29.419235696764115,23.207816597288055,21.835113156791422,27.87387605495309,20.117141401071656,20.487543319849483,30.489263150705042,28.747570473733678,13.571064340922698,17.884798437119883,30.795557395864066,15.006356315584865,23.541942755795557,15.172357163140326,27.516323284455307,23.310464829209234,27.177349447342344,12.973818740658563,22.10240659312817,17.067143682487046,22.756822868282082,21.940716462075486,18.55608783617056,17.480445255577624,22.990546223873828,16.550773365293676,18.561538437151746,26.641334627062715,28.870823553486577,21.022446477999953,22.98295884187366,15.319880775487254,21.385381142475026,16.1136334717593,13.205696466876393,24.052739938258338,20.26226081912409,27.405124319820196,16.94917567688039,27.209535295947347,16.62097840636927,13.944513011687727,18.51081216349965,25.6541386572844,21.75001153100192,12.297395305175888,16.369749311061128,11.735401471282394,31.099348461512985,28.762418664945926,11.594823198666978,27.393016485389015,16.02145542748058,11.979818337118694,21.592615239501306,20.193514398892606,13.629059680474818,17.68946805823313,17.539769267000757,17.280474501099953,20.794956136748766,22.22483259849749,29.18483199460679,16.070180911639348,16.843627468998243,20.99297207591269,28.86894829358492,23.249349342173385,12.162996871524541,29.395820236152876,22.53947093790321,14.991112109352148,16.225191873096353,27.110730104794946,30.029358021089497,22.86389272101013,25.37329851301423,21.93552316670115,27.87691319520357,14.331771468782986,26.763950325354394,25.844867534567065,23.176666378953875,25.503041261142158,16.019295617850116,31.930482580245478,24.71625227516445,28.165753711958704,21.284701841469126,11.228021271942998,16.826997115559767,10.146748806503545,27.35354619116766,20.27208609493727,21.257180554555276,20.16023926461039,21.872218983869576,26.294096671866587,15.380710941389294,21.630471476171348,16.131489687496565,14.192570916482172,20.679066224972196,23.66428862754561,25.928741581302187,10.251465839092695,11.526361721947037,18.064858461812996,27.120059425504664,31.063729109077983,21.14691721416494,17.225074130954358,22.690177411200576,12.742084428684187,21.745038728338816,26.130450605153715,28.48956955398082,14.906094241016273,25.574048397654177,13.272331195491502,28.670878888245678,15.288116042498645,19.89810497084423,27.397733112405888,22.722509270315555,17.943338404826992,31.086561246565047,23.059275305222602,10.474981314399287,28.518410216435722,25.69998600772757,28.97523041993741,20.63058336472522,14.605830178037978,17.319077103402375,20.382922263551016,25.7136175489321,17.92812090632698,18.786056227294097,18.942212049943063,17.439570364475376,15.69524363117085,11.116071061473177,15.804019703797637,17.513317421115133,30.04235143812219,11.527888895266583,26.3169970663877,19.286471212953096,24.7859899948247,24.86075906090274,16.652680088131053,31.897045914804952,28.980578270069493,13.217317079093664,13.419787637741802,16.219821188271865,18.099311016849512,21.73773794444111,22.816205225600065,18.22455371833593,12.482601998086377,28.650009139440648,22.017585544017404,29.404711682195707,19.54312388626654,15.569513819780084,29.64521094927667,22.928770573994772,14.821233861899785,16.43506660763627,34.578154786747305,25.29351623937949,13.001340735086004,20.724200040688835,14.085636108682237,16.009347915307305,19.066724025038607,28.763030555883347,28.014623090393883,14.38505578008518,31.189396413790966,13.83272669962258,17.6888344108281,19.068439844916806,17.828423209840622,18.019859751445615,12.762523326865551,31.740240172821313,29.9962301290904,14.442793216825178,23.866543937869675,11.54336755888561,13.240800314187597,22.913559276046225,23.66511449355446,15.72455254874821,10.734709382979528,22.474357052380288,25.20141753137845,18.167653261978536,21.548835245081506,28.46150660919149,17.612070619914384,22.220018365905393,25.657194564737104,34.9304604994228,25.196763899647575,18.449661603508016,21.04193908447551,22.429374937968205,28.790982328101215,20.874305179738784,14.99474084825926,26.991857337181393,31.095963824456987,13.199728856595492,29.234768679006564,18.395333489965918,20.422418135998765,23.748190474568094,33.097569039308624,25.964372522338504,22.678358011255547,27.69771039519007,15.632370000625489,17.340477183677475,10.916936786537008,10.362203161395643,24.228557571749914,13.474874650742924,18.438072640894166,18.97019420240288,12.388493694120964,22.772475920897428,20.400471282104505,21.266891060425152,28.212791022182373,29.726520081491866,21.982553671612013,10.332840310821096,16.300552980043847,28.24699432501042,12.276339321625636,20.82762207298826,28.51412961494222,14.155850165621128,20.00808678436591,21.760547602131606,16.47013626735945,19.57216889861677,14.350570156458346,26.326395024385924,16.837868775943374,22.774684798334324,17.15098880612395,30.628619488445022,24.492461386420324,15.449578762591607,19.08888356238548,18.954776571509793,23.822120360176047,21.059394389317305,14.665618164902137,12.162577595498934,15.76516789111737,33.6304479676382,24.26037332523984,26.407263793642265,13.755082735440698,22.665690565924457,17.151499025039872,28.193074606076205,14.531274328363999,21.347761577113204,20.010261545694565,14.39435561385483,23.50840844850894,10.503771708570909,21.575417488906655,19.232849856710416,11.33643940761652,17.4708183691286,12.71808476862395,19.850279280185507,13.896727983397376,21.121554233335804,14.731542254723458,13.42562094364952,33.52564776381607,16.778803680658413,29.883169709704394,28.714266969993844,27.409187398774428,12.806563459795822,16.339880167183786,26.711044720119062,11.271673907424345,27.26739091646642,14.187070842683015,19.77523025044367,18.05493065233479,25.026059513077517,15.102565070732242,18.10407968372661,20.604981830003126,12.147736334442145,21.21209966188413,32.528204023938244,26.138397580296466,20.317996555542557,32.108802952665414,27.28393200411377,14.507918587036412,30.14333895276322,29.783586555532533,22.66696764769519,11.402556358558602,22.468729465931894,16.47758816299005,14.727205072120086,28.876670330993537,22.489361360058705,18.149792247199244,24.701376558627302,26.49238149233304,11.93396970612613,12.914165069244433,13.952855226287152,28.365286057376984,15.946836298423909,28.280914514434137,10.879607278004928,17.01254164442567,31.83306552349757,12.233529777115178,30.511393324312333,14.029086053053367,18.06831960616894,23.83366999176584,13.8693910915971,15.916098918257905,15.338570498844042,22.462160705577375,31.665103326775267,16.942158883947933,31.686449397939423,26.7197669071216,33.40460685883526,28.193488596490752,20.804424947744753,30.17455465187481,24.971037202698533,28.478563818226057,28.339470011185885,28.110089884729692,31.23105704998106,16.410393431924106,23.33181100707435,17.821752953117404,29.73179837731868,30.703392331340876,27.96082038842653,27.48393177812805,12.924043168138379,18.723621010567957,28.836701749607194,35.69484801952637,26.248996568498672,30.135478594855055,29.23571687910849,20.261440343199798,19.175515779051835,16.789237522984656,21.606794545061245,14.20299018759619,24.661845104156896,21.77405080359422,20.413607222047148,14.96727613158559,13.596688660200051,27.6751899201114,23.03738980081951,30.838018004754513,28.756079503714794,24.97044030317469,31.72229426007171,14.872276479177517,13.588601700907248,12.85620194753823,15.868061098593502,15.911038350463928,16.641035269709086,26.040022546277246,23.895360169958966,14.535492422938379,18.03644544855015,14.45812942756422,18.25479547198417,28.158793707194796,13.81687808164579,18.85326423489882,28.61698162398762,10.61014932676534,21.399055424754632,17.199528399201075,33.73174376141393,26.432097249493605,11.861638585929308,16.036105414505073,15.415111493294207,24.587365779325925,10.096787235612993,17.287997221696934,25.230040677900714,18.980477330958543,14.87417724951872,24.63393906387098,18.623015239699264,11.347483145779888,23.67850237635665,25.047505761324672,24.783581199337554,13.19464215498033,27.970063155875476,24.827726817923114,19.5427773397553,18.02173898639181,25.948682721332162,29.919341728232343,22.0270546227605,16.184335500976474,28.206050532482603,11.596547511851433,27.634255784472114,24.464889414798783,29.64897765376024,18.69199830250146,30.137824592849178,11.502139278771391,19.526261057775915,24.121055186143362,30.568121445860143,23.260937181266044,25.2552023211677,21.100975400167922,29.97095681103143,29.104530372460683,28.635480920271217,17.10764223539496,17.739148709550722,21.475127772951335,16.347239052601836,22.39294686612934,19.0711731747966,11.291213315902288,26.151335063990665,34.07127784153421,23.73888805314527,26.99483549928076,30.9200644341299,23.326849861224385,24.320756087607652,26.781731469603315,27.119174099750094,17.255678199230225,27.081664677885758,20.259811928935395,18.41449797353653,27.757330493293097,25.815843466130225,12.342186559741817,11.996661475954609,15.98196047633173,13.914002303604766,25.984083413811014,10.72237870168519,23.56096922135999,24.891342752854037,28.060590466045007,15.694509818097213,12.11408652216428,26.346445254989817,27.94581063923741,27.76949463373242,14.591545981553534,13.401840219120913,16.357317037803917,29.23556016991731,26.00010653464341,30.08270005699773,27.553123219860108,16.230924987356833,22.099691544552687,23.16637165904439,17.99013237890361,21.47127658259835,19.180709094098304,12.46288707906888,24.407434132223084,22.96296279019024,23.098054742097805,26.808982253888466,23.629343362542247,14.249113498614772,18.556312073541775,30.460958796020307,25.056207977355164,13.580694082123546,21.39928879648089,23.210414975203545,16.993135205722393,30.50776424371716,19.745751654956006,16.130240778369973,20.86591757932654,13.804273634019774,14.702579104136634,12.15818296664599,26.507145330191108,11.78540227943015,29.67245791225375,16.86606175770736,24.870319917716817,18.070966560628378,20.996830160914993,10.655698402815728,22.408756501034382,27.95938907182851,26.68879797572454,27.87690180747999,18.356983289640624,25.71269481050785,27.608864625317427,26.102762350387806,14.81047723175725,20.91960400868028,25.409609052708678,27.334540431150355,11.1858526251916,24.186963824632528,13.909331328833984,11.406723442925827,15.165203556804977,26.11984455339837,10.960819065732608,19.432120478027343,23.60260966570248,22.879349272848152,30.705615391481324,25.484566687541157,14.180595844653821,19.42639833319825,29.865315446942073,32.387629127952636,14.882305386508891,10.43208745092346,24.355379216547398,17.152096042041116,29.035439762696054,14.790741194257764,29.19401513396991,30.391604728088232,29.52506795887189,27.193711608186117,27.032400331870466,26.620181258755103,30.810913796963135,29.497466594139546,27.767644793713515,12.229352687126319,20.973811700462438,16.946399446002964,27.680340404844188,29.758409307306827,30.877375768517528,33.72538630621246,28.9950067871327,16.17095126858955,20.148397022418887,25.118842834900093,18.766902703371077,14.59215838767221,19.3621777936862,26.697588262054513,29.413873067146373,25.731332200706603,23.10651267778193,25.852332652432416,12.193366847938446,22.746089851343804,30.462406353698483,13.850909943475184,29.085195510105052,28.042960531504374,22.75449949438568,16.480390404282524,24.812821340183152,25.887565703237648,12.301945681767153,19.877045782913612,19.52993231372889,21.77821975683769,16.8357652185972,29.539452177661882,18.934063689615524,11.341493916580923,28.02599104721615,11.075007535109407,16.726953097557825,30.429799093833886,24.59464816501452,29.531186647237647,21.644344399538316,14.456396610275075,23.44522357347396,23.58684952064961,16.765162664854266,34.888459852582116,29.648173459969165,21.435700018562244,26.29197005102716,23.52421901833801,20.590218669264974,25.53706250983188,14.133919563226277,11.438264284373693,29.6126776558939,20.05208363645472,26.391646859035603,14.792342001538046,31.353110060006777,14.183421294231836,16.002323837326497,13.438155335106712,13.862185344812511],"alpha":[24.90230588836522,18.62814197478295,16.43359340352049,15.000953006294178,19.55185337750804,20.882540522823184,12.787025896017852,14.610793423576819,17.957757552493128,26.74366691823282,18.953197113576444,11.496222826273366,10.50155987247095,22.12268135332117,25.27120293910576,25.472225816610383,13.633429162121292,25.5843012391112,12.289906709607639,24.145755791013706,20.14438773774266,27.470173833504976,22.150609467270957,26.68320328207966,12.462290090089873,24.878776059459856,19.881962724975132,18.14754529421572,18.732112243080024,10.297092118914776,26.015191916941703,12.255182760184212,23.253658788229814,13.362504979227667,25.31687853617313,27.241472970235876,29.996620581812152,18.608193657164435,14.64397452361652,14.072836336929072,26.69810399607647,28.508753939050237,22.80703110225689,18.742728160311056,23.450110499970958,20.36830236886608,28.79343848457343,10.482036754626481,23.53406149792783,19.343203150860447,18.76208369057334,27.67705025273259,10.212163550588013,14.929323351879887,23.107948456844856,25.987283633199432,15.538010156218585,14.699009597871697,10.790918323876042,26.888780326706044,19.372520836151608,27.21607647961136,18.40879316808225,17.834368772742447,16.320702871885125,23.309668475485886,26.238819435090367,24.545942832561405,15.698954099577595,18.254051986699697,15.349607856991788,27.436034775404693,21.851287737022446,13.60084490145805,11.415691652208704,23.614379204895318,29.918647930485207,10.972920861249161,16.431960607810737,14.65443370093574,12.799097795362089,23.18765831379379,13.243016361003086,11.093854398665028,15.620876247863421,10.101722683729273,16.17818203345195,12.84926238968847,11.972250056913133,11.288996040310796,24.84156885770183,24.241729277994963,25.626877881741088,14.94486605176375,15.29485274146194,19.268760135991414,10.842324477610127,27.682130792359306,11.322232138131323,12.438663762342866,17.51494106007518,25.693897279332084,29.413680514583177,16.81269301179904,23.049568013103148,25.98400503368765,15.059750542107313,13.776321696796527,22.304629757435826,23.163492253410713,28.79182207397089,11.542836811704893,28.396676190917983,16.873784710238994,28.188505700302542,15.623392320000509,27.685885389358337,23.012172918962133,14.998731196878303,17.550287608738838,28.786995476727594,18.12842224164192,15.950957422062197,17.952668911308372,10.819113215848578,17.886173317162108,15.627372062800685,11.953189853165455,14.965598399590863,13.780782550798062,28.728386390182404,14.250181273433675,27.543552846407557,11.65818881823364,24.272113949536642,23.59007301960961,27.556454686094106,15.418145389839326,15.441557771786002,26.772754210074186,14.208040771539077,18.59095075571102,25.604588425745266,17.24398555808144,24.11671070054512,14.231482255417763,10.320035155993349,19.052857768006742,15.002591428705813,17.180744577316254,18.650346618666998,10.490953999433867,21.711496590155438,14.963479749765565,19.61834081575126,18.31502855858037,27.866203704918572,27.79720403573471,21.13422729628684,19.475098899555242,28.370678443429984,19.96854100466015,17.571076067205542,16.31213509168134,11.48100420050875,24.10566130001825,13.555896083526466,13.969788222519956,24.276224708811867,14.423982207555355,14.4744831106896,29.2688530923178,19.697232502538505,22.65108389570554,16.658317980229814,29.125238506226548,10.472354273122257,15.309205275676415,19.548103799285293,29.79111879692396,19.652968508241408,11.263728468570209,26.45457646673307,27.136457150639707,11.861853096081214,14.459044155027406,15.920819785917185,23.63634730254908,12.106023707503976,24.01792226083323,17.193300043170932,29.725580550199375,21.29275075982269,17.236536919960823,11.030121119124923,26.378266353311748,14.150811227369488,29.524973743658283,15.728729003719483,20.22347092144716,10.029007335292736,14.71694368803847,27.406365594708134,13.788100645594433,25.356493412146133,20.329040412172684,29.04498704858205,29.33094350301948,12.555962257855274,14.551790463447327,16.341565139328928,27.89914143509028,10.453544693024398,28.25321389338314,16.90802839165174,15.430261375759438,10.59817497995789,13.349303634124489,12.529667855468762,26.35377627001551,19.26486651403364,26.48326206398754,20.056773309914007,10.51217464706939,13.229099021640685,21.07889849231617,14.150835633886661,10.301730740315032,11.85670470462079,23.584337749520635,15.342947931009707,23.301978912818072,21.38517024924367,15.814433264413491,11.526215386669922,10.557778914882805,11.443893729276521,13.555849859220924,27.839714961390776,23.27061928431982,13.908938145461116,15.280693767045221,28.34716757535861,20.294935399329393,27.634272909114866,22.49943933603596,29.29092122986834,17.211646177325278,15.412458101216512,17.668572664412885,22.78006019020176,11.740753918406757,29.76393136850882,29.347865817126166,24.532299334586636,14.525455315052355,10.395837946509676,22.946254257693322,15.109366875917987,10.498297972128587,15.623216124809915,16.34365059574555,12.792441086714298,12.32403402595304,14.690410329617883,12.20360303239126,21.4794653730989,27.869106985895414,12.312375994732152,25.085856187655548,10.410879990667063,23.80359886008913,23.28455994642781,12.162594701998302,20.828203913862794,10.513732795996585,13.200193505335331,28.331304881780017,14.76842434709344,25.72308017036994,19.073479473101457,22.777701055403643,15.897184667819616,20.015397926887843,29.7045363288619,28.95984426868495,25.304102610022152,15.918910175821095,16.803349491118517,26.24679798747718,29.154782471145438,21.391497763483084,20.936059624182203,20.409279159179306,13.064923482241024,12.792889036437117,28.685064165390173,26.510717698802,20.149976218623635,12.829668346166363,19.93809070609874,14.058268022081485,23.343286815451417,17.476892893182775,13.791383777282062,27.990803738687177,22.26657025502448,10.93320426650755,25.99453959102025,11.034416986167269,29.922246664179134,12.861297009191816,29.84693457889309,19.65375973042758,10.567257819018288,29.598767319197016,18.998142730691562,14.905446128763455,13.160332933938953,18.41918157912759,20.58246542591393,22.409923531559123,25.056712242914475,23.527068753768784,19.2011087996,10.347746962715402,28.837163313566055,21.46757626450742,19.90946732739299,24.71696230454935,15.50100419525561,29.013109307830955,22.361403166683083,17.883689569003202,12.004575283452223,28.410370060810045,19.9536639297129,25.349769502009266,27.002699128039747,12.237326225711879,25.37567112234573,22.76165431878254,13.72418290779731,19.755998613258598,17.61354744419257,24.445302387441814,17.503539123275754,24.56253376937771,11.861469791409327,16.64629137655116,14.14362398247941,21.874092628209763,12.415529603489453,18.77533971442851,16.452953703243626,24.05807952011319,29.739884323725004,17.16126177858112,19.645463398399254,13.586697077240192,28.271502755810978,13.05158329839891,16.38561299783552,22.187628519999368,20.320699740680496,26.959538586239052,12.807950710507336,10.197154664328139,13.082985552191957,12.261602068432378,29.43762307252456,21.179890761827362,29.620826572581784,14.775927189621228,26.39411122074265,12.798555884517375,15.568072513218706,16.18491141416808,26.990957358888746,25.049144969431868,13.980585099846028,11.935252429999998,29.627929031310156,17.450285083377977,22.712941304991418,10.97825789636586,21.985871546382647,25.60026854977288,22.0431436003682,10.259948154681231,22.02156148004859,20.350295566170796,28.357366408746575,15.359357771715185,11.765249885221056,13.987587502165875,27.673078252227057,22.92107898764556,23.397985730554943,17.414310093179473,13.241906421296603,12.185864907191043,27.929897081132932,23.20653706804031,15.111243416676992,10.584181837434627,26.252419299637424,13.217630488298507,10.927971103800704,10.495561718505888,18.86733789082133,29.742899729486197,26.22854474686807,16.23528068742571,28.93518558160137,12.471987728309806,24.440948877640704,11.46884696070018,15.951812381232484,21.15372039615218,20.327789926344803,29.542425141808387,20.292262997687246,28.793281617397337,12.12501833519732,22.792083799717503,10.5831531750041,19.532707223092004,27.12617135245626,14.92211591139682,10.854353000659188,25.335652715120847,20.47920835554992,17.176771145456712,15.97722901370361,20.974437666420926,27.353924242201003,16.598674750655178,17.349945426973985,13.318622044014514,13.056707439908877,26.152453327217387,11.356679861487521,13.24030855656039,11.292101132207017,24.70662311291095,21.736468634325977,27.760392331473707,23.53468075220798,13.070020147783454,17.090114457230335,20.650260313867932,16.52709196244658,24.53279087508387,21.498093631784847,22.913549621511162,14.440511893739014,20.59280974084642,20.972171307471335,29.142955415187735,17.889999976894092,11.64565215882902,12.648010705294661,14.12544423551048,15.455228884952149,12.858084243908259,20.855217536613043,15.496613753190909,29.467736666647685,19.749868443278,11.631831890788389,18.078431863381326,20.448873798114025,16.655406863287165,20.636156606585434,27.681572562179845,15.436014238854119,16.682926325077617,29.881201593613554,23.809546302072544,24.683854736643216,20.853986813175283,13.116602308361651,17.4090378934875,21.755356162548477,26.756368542693544,18.846888881491353,19.298047022218242,29.040766465954412,18.860563734709125,29.540790591857977,29.19989381148751,28.62986546368851,22.58922855141676,11.91830062794736,13.942557431816297,27.921222422947917,25.15379088749949,16.425704891362116,25.607098900772144,22.48285684050669,15.30896179605261,18.931731665929313,15.420084666398042,12.06216356273953,22.740105530316743,11.493185009683522,13.665187165463134,28.16949677827518,23.599858589036707,22.913681670328852,21.871456338766876,18.1976618788618,25.064475153757225,21.998179274118375,26.33896727982534,13.45852959168797,26.770986355681128,26.96869093115902,24.797168862016616,22.553599850552708,29.469467625687113,23.499954559831476,12.731017215491613,17.83874583526185,28.03530385582796,22.30341876040242,27.792909746490256,11.471934959343738,28.59235792087597,25.36762050791979,26.802557397565856,16.99468939748271,27.740762734196096,18.080800425811834,20.943426676713095,25.006356642597616,23.947574617018923,19.69079587602873,18.11025381818898,27.590989786552818,20.18989653926819,25.495023837321416,14.792683430459235,26.15873634875008,12.372116460544182,14.933997576883717,29.08902544427309,15.421020135254384,12.600159289139388,24.070657237560585,14.559412210782195,20.78381644128381,12.591352344443361,27.457174640506853,22.128969624914106,21.74676619963264,12.477578777146551,24.3307151335013,15.530486531715546,22.765541677992125,29.91779130887666,13.104326775806982,13.807640977402142,23.302066813481822,27.47820812706116,15.775054950474118,14.528170197456314,20.3460200517939,16.881575266785372,13.973569145525545,22.80402490425207,13.266212220274301,12.300244618801678,25.383927779820283,22.34187264685766,10.322806336462964,15.092184543156453,25.076396457006144,20.697827716395608,17.192370773415146,14.003352450343968,24.97144151263198,13.191316672418093,17.3590981448301,29.361857954198104,28.60338572665219,20.022949397427556,12.91748382752158,19.75242718892151,10.589955426839538,17.677477978616082,28.22680425096811,25.098214860703155,11.561596653004607,19.294175070133992,21.741070081581487,11.541228181415995,19.157517177280127,11.474628693901385,10.241521608486286,13.578185285681666,12.219169380694549,28.41796354818957,19.485093685884742,28.52615932964802,11.834061540668372,19.910017406339268,21.29484709721978,11.75676977326277,26.975602843667218,13.78700368486609,18.427433385098936,27.967027434949998,14.450396592412025,18.16696450391707,12.41048625641322,11.49913429376879,24.806157291271504,22.66167631655595,26.92369401112491,19.105832820827683,23.492970574447007,16.677126587163315,20.798411492710752,19.43129866025962,20.69161404643044,16.919514899588606,15.777661986002887,11.611599403307098,11.548480590449412,17.07288196841362,18.056722779257942,19.683748305446905,16.292937125863777,15.578419383192648,12.093181236361712,17.568833180114485,15.209301653539544,22.728059168861222,14.347169172718214,16.907159282169474,21.40420555822756,23.026492817060262,13.340180674356045,26.633777427328486,25.69965490738219,10.620659917723444,13.378669402372903,27.605144679205708,25.427719488284808,17.604461128626824,29.996111490910245,18.458093464488577,29.617637864401907,26.64331256900354,15.778408987875295,28.11131657547464,25.724105039124044,15.901958621771346,18.393325176165494,25.1800483622211,22.00312948770734,23.346121580870612,24.505701677349364,25.58116172003308,16.94404900614932,29.74529363094573,11.040743285308846,13.431305811544618,15.673077689810606,23.608933798630783,22.35147979343609,25.964908569022185,26.011553689642987,20.111285851224533,14.650404734671373,22.542060381316364,29.336485753483498,19.97346145773896,20.58178775006915,26.523204074654217,26.46079614063458,14.927601707589977,23.447381423439065,21.697591132902616,28.938789141397557,21.27331287299464,29.824843587532047,25.429670310838205,15.944658762038873,12.62708249572681,24.591665429915487,28.94272870616339,21.337680180309476,18.9196323004251,24.068126556945863,12.75981927368007,20.769002701439916,28.048627239946285,20.204104630766174,16.383491136164807,10.031770308944763,21.942437549644286,15.779110576104154,25.27074197715016,24.777864542703018,28.09848135205817,15.048853530581287,16.392366706346944,15.512782087536241,11.612751399862319,13.402522021970832,23.157220919108887,29.90373730709882,29.781923797569196,14.042286051884938,13.112158429068712,29.55134479863039,11.64634403289515,12.149273777119545,25.98991515045146,15.11830079434878,19.653011299526902,13.136110629369867,25.742759540556403,16.394545966536008,15.385997824765546,26.344185675071962,21.58188309554632,16.017195353931072,12.144206722601925,15.95457132799623,24.058995377966433,23.779568009768987,29.17586748789306,27.72639384462191,26.293315744036626,24.354459743902964,29.15372846059573,21.960037427513377,18.81171513824397,11.644203521263075,21.207897095350322,12.988010570049475,15.57353953624688,22.12377709800251,14.20904989174025,14.791313536620919,10.05843756042081,24.994522386053287,20.46510711252095,12.520156255194292,22.957794039507622,28.40950234329486,15.611696856735001,19.068350678062046,28.1809469269993,29.655172884410952,27.7511191351568,10.416104678659748,20.04150920802058,28.995934085366688,13.809753897820594,28.468985166045044,21.25667815882001,17.5103927113705,23.441007180239893,22.96177761024331,14.667315761546407,21.249447186277735,16.892852056558993,14.681153274806915,12.844464028476423,18.18884312896879,14.713482522662122,11.267448693163358,19.310212713241967,29.720659248309044,13.081080994632067,15.08707757806054,12.997143203278622,20.0545603103305,20.23328166625918,18.52174230026778,22.694874532348543,23.003942648947767,26.30363236900875,23.62768083798727,22.034064489848376,11.408976826985198,14.042834440492609,23.869485360016117,24.19416922242919,15.235630401668123,14.117808262864656,17.32867705543295,23.90665728846394,29.739534575273137,25.284875208783475,12.038726490704805,29.400969058622408,17.834733607777224,22.618265138333193,18.363918030531444,24.02943536894187,10.27303142305624,19.756329676681922,27.648045303995865,23.910084376128026,21.134239500775536,15.88242814944861,10.258344228396679,27.051148083975235,22.64696100032797,20.719266579601886,21.52329473114413,23.35197069899015,28.621361375488807,21.797455275989577,26.280988832645953,11.818534290521846,22.17160054562081,12.778442881005514,12.669837675286377,29.65496523344353,24.27735625622331,18.528674886518143,20.625196554507077,17.41966561310001,20.233959776272176,15.237247634661454,17.07901144022284,28.00058951027621,20.877008589343056,23.483039720514242,14.008290025556347,22.596759801189105,25.336519560069803,18.398750238300956,27.550752441973817,22.330889585632697,15.936013081367918,17.636497190368814,23.019445259870288,23.45359564324131,23.761751434816457,20.507477931767582,14.898931623672787,22.94720522313519,28.97105373988264,24.087858413317495,14.059518913096941,24.984884384624127,28.952703530725184,13.82024410639973,24.36079270826532,21.4927605944248,23.605811663530922,11.045739189826978,21.564981122502296,28.21670051590909,12.004976794837553,20.293350643678465,22.359110000866856,26.82529625052643,17.41228785094036,20.541038438213256,29.400449146024364,17.103187399462545,29.421262956877214,19.69836341745197,26.679716042197704,12.30727361352864,28.324746006164695,24.489734338348242,10.025764430626163,21.43462437779377,29.152672545907752,25.37940059106829,25.341130115011936,16.39319915513755,23.115428663281495,14.195315742438899,10.367892731978184,25.103025896134415,26.600038657014625,16.441104807833952,11.75177147625158,20.304789400123543,12.415571509479669,12.32638784566873,12.29295027578158,28.10923863911498,25.962441305991113,20.351599480102216,29.734471350774538,15.072708149120807,16.592669250778272,11.684121969825831,18.89209807957449,17.148089848891928,28.934399213303056,10.91540825815553,27.576718303908585,23.832196214171965,26.062204919461294,14.198488422629394,29.257282612935576,15.840925897010361,18.391965642396574,14.89019592584655,14.222097861926146,23.88928454539652,16.21517651453771,23.073477780197106,23.554804226694323,25.699403001256588,25.15451496839873,23.75464250920528,29.353882156056205,24.767149576708412,25.475883700827488,25.615536612861337,11.066504322723576,29.824831887981702,19.02739342845375,19.20581801348792,29.18747140017053,21.68023916692721,12.120723883213138,27.55183490669118,28.86957386091733,15.973073831124122,26.741563428556645,21.522425022995915,20.297041293164458,17.20256628417178,17.54067658478924,12.108761126890153,28.25361601904644,26.69966686909547,11.639681851327431,28.541363281342274,26.036427935746055,22.07131830426043,27.276640038681847,25.390698265548366,26.532867868413447,18.368407482382153,14.913554874296429,22.313211407048886,27.555085721250443,27.105480340184968,11.133505128958978,20.83017709728727,29.08589699391808,23.667513100801685,17.910877226761418,28.185155611416054,11.77142461215594,15.861264035032328,15.620165093490188,20.40048222216978,22.767156029845566,24.47722248671657,12.109296683598764,26.206663558943397,20.369414087673505,24.44730697667839,26.95046498450747,25.43743368006379,21.96931112843551,23.881000203969297,14.9505084788189,14.79501720195266,29.503637482849786,29.43736814004619,27.071249240983605,15.063328230859065,12.592898243753474,23.05875388177372,15.656677736248493,12.557859486339007,15.922506496984843,10.358892657027123,27.17677122845668,10.607852493763769,17.935085569675376,15.556918757824576,25.740992324417633,24.02725253952525,11.747824108445911,23.49954273779032,24.548160664724108,18.565236028307144,29.301412507270584,26.61748054332645,12.330897843115798,19.728915836669188],"p":[0.4286016064575633,0.3452947801136885,0.10219006924987561,0.9093590360496797,0.6446254421681294,0.7731048086540055,0.7465934178035079,0.385252303809678,0.005090068241855317,0.3628178505698929,0.6518619061079161,0.14913129005789694,0.9325977840949329,0.5095668607037964,0.6374859864906159,0.6305736272894344,0.4082154770355928,0.6948265362582933,0.5876108463128902,0.8723640312127969,0.01580949382672303,0.3581522948963931,0.9449471244807242,0.3923259832838413,0.47306974643236055,0.3319742662225109,0.973680952618198,0.1691089427007404,0.3911611520294267,0.7101325389332702,0.03230709382153529,0.7326782328389843,0.73728209942674,0.5381530509250769,0.25466984713212515,0.5197143782432998,0.2590302959333506,0.803916026867491,0.5332728937306781,0.763207117168371,0.435350397483244,0.9916765858355863,0.7021674902587658,0.884777642799685,0.20463003729484108,0.7648558794010822,0.2540028988068086,0.898345037115243,0.24052160452707594,0.838642316735964,0.31168339070249984,0.1376917133970561,0.21961983542632035,0.32737495361941615,0.22038276060342876,0.8875272799870777,0.4005314758092344,0.9672730517634607,0.20268074721283735,0.7626566672671526,0.26762343233533104,0.009911286097503691,0.29473837943529535,0.07168326453560225,0.29194080397501887,0.6453129489456699,0.8292103689263508,0.3943260838106737,0.09712417158348052,0.7331602340057679,0.9382653620731212,0.097625229752071,0.3070097832542331,0.8836832826827856,0.9188939253295054,0.3318208437891881,0.9988866911408252,0.11412099360319594,0.5611546604717721,0.9449604689800926,0.5720252620385555,0.9201030323477986,0.7892053393952163,0.728869772132269,0.9217104432068748,0.2783127943511381,0.4563519664393636,0.6247514124118956,0.9530448183440217,0.21513477468961684,0.8674999263375898,0.8808326642834337,0.0679497193130274,0.9411436722235467,0.3063979524922431,0.6246258382182488,0.9612070964314692,0.9733801649417433,0.49152357878510133,0.5792795935346897,0.7034932346975673,0.19626606182280537,0.05604261469253924,0.9245185773328515,0.6527095446088842,0.9766812029678691,0.24005365575165216,0.23460809603259603,0.552839089428641,0.25669558984374263,0.28073661018485696,0.3462967938441628,0.49976076917997747,0.0430857457573357,0.7765666974843144,0.5696895447551809,0.5901108965610395,0.7507470494895643,0.8842250516742773,0.2782980049277137,0.3029830361755661,0.33922879701373665,0.6558582975589171,0.653412926763028,0.7251397335496308,0.13897474336159443,0.5829907855111744,0.033731793414551126,0.6829804270130806,0.17319930676947615,0.4227824540656029,0.05401117731383964,0.6330563340809581,0.7902579709114712,0.553869781818142,0.04805824899687905,0.49513460363729633,0.7741387444975751,0.8647287218447999,0.6990543620214993,0.9805162533988931,0.9881753293477151,0.016825070452932023,0.7762036897510354,0.534736630884197,0.3229560704063761,0.7883391682102989,0.9270251940558221,0.6496624001417823,0.9026920053734597,0.5724679497273129,0.09173687833673183,0.17765816143046997,0.41284210341605254,0.14197166874954292,0.702189419895723,0.8688076087891252,0.24406977620163328,0.1540481054220788,0.909110122262492,0.2036709455375032,0.5472263310241601,0.7570224867040893,0.6688152497224096,0.6907636535982553,0.3698415801816757,0.15311656335414137,0.4125230945061735,0.40541717073670114,0.26700405343137534,0.26301537851248047,0.0005187467720733085,0.9877107024555933,0.4312739156329466,0.24793936925625837,0.11815151677509772,0.8131472518410605,0.359055753106859,0.3355480429089439,0.7707869836983601,0.10886699108128828,0.27760686903630694,0.05711143201908797,0.9697687140517146,0.9331962981339128,0.22486769238374582,0.8308460071703998,0.7965356200641098,0.08303658049273688,0.3167629020313436,0.14476530446098157,0.40482880220116835,0.5525392405321223,0.31159182694160603,0.9999099158927245,0.45921630792988455,0.34360851422250627,0.7165291039120694,0.002199637450631453,0.934424526539072,0.07506048985204483,0.5406287351926844,0.22828942784985062,0.1474340297533947,0.736534965113572,0.028564969906674786,0.7821160746808231,0.9011066105757253,0.23799988737551314,0.42093716192049,0.8957778542105965,0.06638472973966869,0.7916903899315879,0.1564730559483387,0.5973891718663036,0.6255408775498641,0.26935030877537325,0.24825346093387712,0.9566569316930869,0.24404534147264068,0.7585177285034832,0.11105742275322017,0.46143154413591647,0.47457185398749213,0.6698385169525851,0.5778755152765269,0.31692838653828925,0.30435069496226275,0.8485243475446929,0.33166793598776456,0.6527595191760089,0.4465646747620209,0.3601071538530427,0.7667882577045348,0.4559756092300733,0.7976426421642986,0.2984591588372276,0.5821022032333394,0.5514673665561196,0.8877072539887352,0.11911751729234421,0.7297641080693265,0.9588706228289132,0.23711365384491478,0.15225754209732378,0.34590505189638776,0.3072649114865573,0.593264132894145,0.273487405180731,0.7718749894631258,0.18966218872811846,0.3279598178104266,0.6575791004480922,0.0833966124856913,0.7470191143199376,0.9618334071830537,0.6934079335665175,0.3197844009136197,0.883209199137158,0.9511736945969944,0.6932161040346443,0.5321427000064354,0.07194375023004351,0.6422449278623679,0.08402076996366548,0.2662711776071238,0.7263520181271492,0.02334712392799121,0.8681273069444233,0.5646017653219411,0.8800242606113644,0.5371939868388638,0.5181137413832653,0.05625508772429022,0.629969699626711,0.9618235855871031,0.10593804158484477,0.8378681752161796,0.7838342959332689,0.3080389345732857,0.522264932157122,0.5773914068233583,0.5146232223327176,0.9040983874996422,0.8139005391797876,0.6933381144500605,0.0054784650874890595,0.9424929139962346,0.037102832817467624,0.6658168467089252,0.20715275195944538,0.12018088162756269,0.6204428825929513,0.562538022559687,0.17661300300993021,0.8464687455545101,0.16832314378139168,0.4754050744375595,0.18626036751376462,0.588711949314082,0.7274194485797161,0.6002448815917858,0.6469668924432261,0.32173869876004324,0.484594981862428,0.9883186179771923,0.6332351652372941,0.026889966293321077,0.40467073021558275,0.002080558082916184,0.8712768278158594,0.8529726324690954,0.8047049185487669,0.7815182673423913,0.23188094164257622,0.06863797776018887,0.8708426479684983,0.28646021659586585,0.13642590882943417,0.620161027055196,0.8787550972160367,0.44756040310667555,0.24314763474895384,0.2597424160407904,0.8308107196344128,0.38336568195245135,0.9790933447334231,0.05868918846981974,0.42773304261801526,0.9438463745873082,0.502929915339803,0.8423874214419285,0.6846667148734291,0.802250089925826,0.5826597183726148,0.21874595907321548,0.22006008653018538,0.5528860013829924,0.16010970359524457,0.23696444911178305,0.8737046534913515,0.40981631826687415,0.8152862098938296,0.28803153939202764,0.5168176607481547,0.7881115553705498,0.4365456176990363,0.5967559243190874,0.5874427088240248,0.6017717247410723,0.6266654143978261,0.6103306291826154,0.6992508883492705,0.13801231149128057,0.2913884802652098,0.6348934128463144,0.8753712670543161,0.3602823588612438,0.21279343969828624,0.27075314928098915,0.36540244080103346,0.6659387784342543,0.14413288996831142,0.21973324629955115,0.569717289667506,0.11819845937937523,0.9127482053631641,0.8799890580608634,0.360865893108963,0.8427227312241838,0.385117774252298,0.18488931649008755,0.8895113720106342,0.9630991425631754,0.6800098258856155,0.720365589040989,0.1503853465894911,0.548328865052162,0.7271557664088892,0.3913264162254002,0.6697105551772375,0.4610203715169441,0.47395194746908986,0.37370012596453184,0.8652524568951423,0.8709594948180699,0.2008441767340594,0.23593952227061643,0.7113823515175297,0.38542716446237946,0.1145028050997523,0.2636471157415041,0.6197351980161929,0.4963455266582939,0.1700234386491366,0.29690543208849385,0.035511975629323844,0.30457793869751204,0.10351516894595547,0.2876793696374571,0.2931998726528895,0.46787210593378314,0.8700908004906931,0.22991132960601401,0.8499961642973852,0.657817827997139,0.6629052741838171,0.5033957770950914,0.18825666096074434,0.6393226100395777,0.4841525623838998,0.07506920117923244,0.7636044395480248,0.7185673980834542,0.5975259876381622,0.9143538335320676,0.5347170490844253,0.20264086410523974,0.09464794017342482,0.7509321584520585,0.644654250308343,0.05505976244550115,0.3213995475453597,0.8693187391720667,0.682291134763312,0.8273465855892641,0.995320305200466,0.2775909007050952,0.7485257489750021,0.14090175396038074,0.5841704561335528,0.20903843525631283,0.5540748000568108,0.12666372125196768,0.0816533423464505,0.7119143428351347,0.2756252057776234,0.2584196535925771,0.40838877633890247,0.11816287088752486,0.8395753398191772,0.7361317188005829,0.6904233426666613,0.23823853865127753,0.048892251653620544,0.46845285457742136,0.7612568005787383,0.17879827629168643,0.5037951909393061,0.9513157795956977,0.0651189996351842,0.9341592946209416,0.8804876793645053,0.2908434943067708,0.33246915894835505,0.22512855245932162,0.6959035338939235,0.5035747224020912,0.19237165311639792,0.8174824270599226,0.17497665565497522,0.557521966576725,0.5096404095376097,0.8512068565650297,0.36532525695177154,0.4580136932299743,0.4005879748512349,0.9464983935511455,0.4418640518780641,0.32252953465973744,0.07226837177419099,0.11468414791234993,0.012708531137662904,0.8591146301395982,0.06333635140909699,0.5958537652046265,0.47231565985760415,0.7396598807079156,0.33975884325506356,0.9575267944006505,0.23597905661000151,0.5018156092907675,0.13687426069323316,0.39031135411867224,0.9694965392931747,0.35241171722318776,0.4412869421620971,0.33925907364163943,0.8874575447362716,0.015775681924877327,0.8173628039804473,0.0005187234833128329,0.5438612687689215,0.6513383448670071,0.2100797995539161,0.1165626601009393,0.2615173457853963,0.41512834349520267,0.5748615695316213,0.46669488277346294,0.9275372053489139,0.9175984152758083,0.9456012487871621,0.7622025425071057,0.8057192666201305,0.9239730217715325,0.5650277372112442,0.41455457160152753,0.0004548032673494795,0.9035699789748379,0.4158781578066848,0.853881650331271,0.35878776489597386,0.6198738819321776,0.1886793117863328,0.06522089272762566,0.7993672988225189,0.4562712392541537,0.8743521470413969,0.6818506507660711,0.24723418597640956,0.8386886711066088,0.01326245198944953,0.4551018033382499,0.9038204131239245,0.4230194742266047,0.6751766937189039,0.17176780563326233,0.5113547324336707,0.21354681362116157,0.5967852160882914,0.4429304061501922,0.8306148453723703,0.10184594040326389,0.4952983614043869,0.9971015433434587,0.05438197697242031,0.734101950765885,0.8527307206319166,0.0622653505868036,0.47075527571105846,0.3496506411747602,0.19028800241973598,0.5771478604929814,0.1067387446114294,0.506302528831351,0.4309964243404232,0.09341677139082138,0.6517036420458517,0.2511195307337277,0.4586965213227363,0.22202377681873542,0.9227751919976559,0.17834673775252963,0.6756698820946365,0.3805426073108913,0.36887985210686813,0.46958957584915506,0.17478060541939855,0.714703026057514,0.8507546025190258,0.5182849232831315,0.8891539985522068,0.8255850651020602,0.8527627328345844,0.3806403868923067,0.6933060158928384,0.10415125433949624,0.24489791652569437,0.27101986058381233,0.926004688758066,0.3735870791559297,0.8945225626921782,0.025895055932195987,0.5057461464084669,0.012423695807317392,0.24152865484586883,0.002105612060566475,0.9912030316212213,0.745173763779065,0.7469395001678303,0.3091586161419486,0.40801976684032604,0.7423295728849937,0.9724611832541692,0.9457640017596753,0.5534608269659247,0.8597999644617733,0.5310190546425466,0.7264029184413359,0.1424089296419866,0.5798239835397991,0.47360210018003346,0.3237546710374455,0.7008067723330009,0.034476338131598006,0.046689049637815394,0.2616817644776619,0.01904741185990444,0.024583055727480874,0.3779675632198263,0.14415472380593664,0.32486647300121274,0.8475963485260578,0.16540458755287712,0.4221445739107603,0.9078083577803719,0.9596537189213283,0.7862423887458749,0.22188151063209904,0.8516868028801907,0.48989459291430815,0.6784802842564013,0.8120401049758261,0.005532720706883598,0.06965883568366049,0.011133254147739136,0.42034615434996625,0.18612084364421366,0.10213614739880539,0.8067930775857737,0.05642378760278799,0.3509029873203191,0.06310526497210667,0.263361937877562,0.5427502883595803,0.1056486077546086,0.11664130411639517,0.7781128896437708,0.31414066120750483,0.7511380654458817,0.034661085543374215,0.12494408286160041,0.41144697410962694,0.7305777999597838,0.37154350492506416,0.17602332587905378,0.5686417337785354,0.11994680535978275,0.09883615573337301,0.8060233728442592,0.4280101665224303,0.3740166989523699,0.25147341961406644,0.06200531562307532,0.2530184811458578,0.0096802198681738,0.4577894489578398,0.8011538220252508,0.36574509830239244,0.5620391844282908,0.32222857674883953,0.4669111799072072,0.8890386218787933,0.6487878751107243,0.38775431620098844,0.5178434395796419,0.86986649895283,0.40490920905321004,0.09965429724481423,0.9728551827202179,0.148624606026442,0.9989149824770955,0.22950680817935587,0.5729413498238822,0.7083673019145016,0.7454379933390758,0.9305480309876513,0.5376398709695482,0.4259728397626348,0.48047053318361965,0.6459319673012114,0.9995161530852281,0.46359126870563294,0.9125984359585715,0.7823459564183599,0.7788688902418914,0.9694602774846195,0.5828498828560738,0.30376651443871117,0.9260128501521143,0.6206968175183045,0.6547434501030833,0.6677074138715522,0.20825098724468183,0.17421561792971718,0.5877288105763814,0.9182721244664547,0.3354222511340885,0.7184088818785301,0.8351928959203847,0.5038094566842983,0.8821468644155364,0.1332733551252674,0.15739094492992112,0.6050576626576858,0.37631265676890346,0.5312312189917225,0.9818225659694602,0.3005984105940511,0.5385194460526683,0.7388467786194743,0.813103961614124,0.34388810265406455,0.0071858543278702225,0.2011421777872764,0.5584318455203043,0.9514952652250956,0.86873645570153,0.3041992014664281,0.6105952505287229,0.7884609342740947,0.7751348564978797,0.6728437499751028,0.28878498540088904,0.45708346760820806,0.8978840791005545,0.5272691089054904,0.3364290778300618,0.10476690519333198,0.6726195441652136,0.7103305351025879,0.7945977846232823,0.524891293743994,0.15675038828684684,0.6556662730066669,0.8031994814465602,0.7891616458833766,0.02386602351545619,0.37745197495627725,0.762640435660346,0.9149996291798788,0.3608402483680009,0.12621546116751725,0.7242830215494733,0.8323406926141914,0.6327051091905296,0.17768292550180065,0.9128351473818119,0.5401764530030111,0.3329309769031006,0.3718550347474663,0.3641562554793314,0.7691953175608832,0.8640504751985518,0.06626964191107132,0.2970287192552694,0.6758400471396082,0.804805442406062,0.8425087395598343,0.8644463492515504,0.7751468269294959,0.22975470130843134,0.8860687727823029,0.9521303203824207,0.5845314588895003,0.294571943427433,0.14631249566012916,0.5809361452122754,0.6688781436934126,0.4057769859117626,0.6039686578818981,0.3712999240740886,0.06044116430128765,0.41458795870322085,0.0049948342092562825,0.637803665441971,0.6838140697684936,0.7155858058900604,0.0555980504733542,0.9731199549142209,0.6378297486008362,0.8469318166214816,0.5184917507856002,0.15158018963620368,0.7087669472923446,0.0932904600168396,0.2905322521528866,0.18948992089884986,0.2829020872281385,0.5764442294604,0.7732884513419482,0.7044966907268926,0.5485310935027383,0.5218571355263828,0.7911496372174509,0.038129903607074134,0.683562339729002,0.7088587798763908,0.4869180161778419,0.7421209710597161,0.8725364950848469,0.9442877846507647,0.3836070042586821,0.5365776008744028,0.8919285193501838,0.8236964113351135,0.29089774242780164,0.8494401568318617,0.4234939939736213,0.7306152104016215,0.3291815431845557,0.22064846882781453,0.4914293536650549,0.6011982063226251,0.8209674120354851,0.8250811915683542,0.7833505884690062,0.46029439821141427,0.24515210840541202,0.1516753093831693,0.03799763527058575,0.2677381451362786,0.31107102011518983,0.2320941905124343,0.6304391356953267,0.05026169323542651,0.9960026049024413,0.9686256885096787,0.8337450787859948,0.4370145534388794,0.8535962559077586,0.49128988463438183,0.9858700200495576,0.5323126334281221,0.31114544674569133,0.7497114364625477,0.19480548278334253,0.6750392923532098,0.30495416355743443,0.6347326181316713,0.6696148970217797,0.5188567748959476,0.5615839762185919,0.5122814317883688,0.8188456347072486,0.37956686062609934,0.8346146480705221,0.8462069017956642,0.9442279556824811,0.1629337337019674,0.7178143174736584,0.9038443748246139,0.004709681927903775,0.29129843719455883,0.054950603893243466,0.12585185416918598,0.23606424087494782,0.17144957916028214,0.15268559310012053,0.12150839144624914,0.3787046295915888,0.7149323633260023,0.32195781444815563,0.6423519051279987,0.5214415707755249,0.1266060704521872,0.7696527212286748,0.5853892913261509,0.78394153354303,0.6585074028748481,0.9316455975706299,0.10853167164606758,0.8616732137994456,0.9729691654989681,0.2607856309645413,0.7472989934168524,0.8519627809649997,0.538862091756455,0.0628993469882888,0.6894796431736485,0.12515609745837564,0.38121315018564594,0.9609740629201486,0.8358280075292359,0.15149012599754363,0.9709698692242661,0.28623923263135986,0.41429246648997076,0.28176288834865315,0.043888117546385,0.6372163428272724,0.8200587524778962,0.9515845914676333,0.2732660746906377,0.5024050917330667,0.5642571822953346,0.5842071102429098,0.9212190618158882,0.46892135156324355,0.3640997026129753,0.020620233356251294,0.12649286276473015,0.27087740063432797,0.10498681804453502,0.009824614525391517,0.022595542614811004,0.266643748674702,0.10617320507741534,0.49315456666747925,0.06483236321414365,0.2641101571086719,0.9598802535639979,0.2564620292473161,0.2835290694516588,0.3680923370204219,0.5284026041653695,0.5942299938781981,0.5494888382214231,0.4359282584153923,0.09661589328156306,0.48909853048211605,0.5244048976802613,0.4716137940501426,0.8316196596906804,0.6674735448019664,0.3234124988823348,0.34075553832497096,0.8953377701644005,0.1571042091473167,0.011367124624783731,0.5977021395453181,0.619195278262819,0.3568946429460209,0.7822627376810842,0.9211666923828572,0.8080990413841589,0.38043657282683685,0.6259415577799805,0.6752260792610392,0.3772632065988075,0.7525962843871437,0.9635894339638229,0.8373629188014444,0.6203081470250553,0.11922391118237008,0.8327343150789273,0.6306983776667281,0.7743983229257256,0.339577061731428,0.9732522413460369,0.31491196079519934,0.8742131618687967,0.5611945472472104,0.09649839286063666,0.08453063506664238,0.49094271237235887,0.20996118019859655,0.3793830051084177,0.4764113490407451,0.13807375800122212,0.2282350906256272,0.8991583438034174,0.0009548131387324688,0.5602593784188035,0.4447266485445658,0.08646791856225278,0.8415832119027777,0.00639146872635421,0.029872004053156376,0.7299730056292719,0.7411784959508307,0.082849441243809,0.7728542949046595,0.8421724696082578,0.9169521140849206,0.9710786116944226,0.6152600621970965,0.20901747708077112,0.37292238386898635,0.7826619260358112,0.8785051208951795,0.07421364834306865,0.038439346638567295,0.8050329255352735,0.40897677247739894,0.4597023062639276,0.3784233500632057,0.9338872764659145,0.5152401061359564,0.8076436459058787,0.8709880630169713,0.9737090866387372,0.8178854408378533,0.5848842119755144,0.7520784668922527,0.9620956266721479,0.5217443785992479,0.37404499248770606,0.30550838862323926,0.3563246974765899,0.9569860802359884,0.655692966130573,0.1736559872806498,0.9769766513896505,0.6747321951319147,0.3203869482157875,0.8479885774244942,0.21616990906181988,0.9361468824784582],"beta":[16.494233961981273,16.072895023325245,12.174368577770323,11.48788912070529,20.48695252942715,10.426474929472981,16.202747240700205,23.87773337412387,27.008306488222352,27.407142379152283,27.030730937518456,10.861622927526025,29.017784730873608,15.101476499957208,13.344642443961042,17.812263538045453,29.716814616597574,20.843651197121005,10.21986007737353,29.975103350706323,27.99673539757915,23.787845085618503,18.01310208815403,19.483611491520225,20.795207170644552,16.55197365194398,16.30632571933003,13.711719881320231,10.372041620925284,15.17728190723365,23.21941570773431,27.826008124400015,13.431852040800468,22.078385148251826,24.21611783841135,28.952053305823462,12.87439545474642,26.39729206600389,12.96869061110729,12.872638566458106,10.584814135586754,23.386349654019995,25.121267824657366,10.417278575695965,29.665480805236967,21.86244505703351,26.674471120947434,11.312159460300443,21.032783756331174,15.956709247916407,14.406742079313748,17.59804840151009,29.11581030972134,29.704549685392987,20.947646640273074,16.58118322442594,28.21329287615412,24.412567508551252,23.684489042837594,16.236098956434596,21.166480245854522,22.802911815289416,22.40421997530212,16.90651226211451,18.29226635112621,26.185960111191378,13.4747091013867,25.091672522914838,14.445301324553167,24.871295149729175,26.097786901627444,28.58393325803151,29.399578347569538,17.79961387012106,15.435746717420663,18.914181242052123,27.60650522738125,24.892829635127516,20.311406842601457,23.020307472610206,27.133904148455166,13.813203044228652,26.329850988235464,22.147583400999483,26.62748525566775,25.925222962293223,22.504900636089427,21.284686911641955,16.02441637804492,19.411022216798553,20.177959218256724,14.14384662134179,27.216244749749016,24.05121600050647,16.771771138988463,17.766362344586355,28.71304579810928,28.234504645471205,27.956055714146952,20.65726673927027,25.688421868417834,29.374437016352836,13.333187732534482,23.269004406131387,13.475431731407784,12.773635744405833,19.082935276735267,22.845291756476204,21.245168595935446,15.605350070317474,26.76022854095759,17.993359215542483,21.472543815174383,10.57325708265784,20.6237735502297,27.61218128602028,27.663308359350648,20.242629676966075,14.337646720894135,28.973693132800157,13.242398067715385,25.680355963748582,10.184800064098777,18.57756337712969,18.667188302152333,25.62285950481361,22.83972258706935,19.017725706151516,27.901202019858463,29.13667931429396,25.338725236987315,24.914174305935415,12.366067487983416,22.13410395126974,11.79067902388038,28.975595559123075,22.837505666758375,22.98289134704628,10.96812279046986,15.83078392240591,21.124553439770782,21.141992164199902,26.226991802350376,27.298020704997793,12.481091234868916,16.33674920284712,26.617295839587804,12.179732353611406,26.666360776517777,22.95143134752746,21.99262042099441,19.204903990838638,22.906906837170236,28.19972144615243,17.38038907428109,18.436864632771535,16.13641279805836,19.52515018492442,19.62192242457347,10.444066566042899,17.703380553453453,17.161649691761028,24.400920420090188,18.248183059320855,11.643270795513182,19.695626097781,13.508573161538058,16.81956616354864,24.662530826989272,25.301902794539856,26.753542373394474,28.058097361097122,13.720468167223064,23.655802204752092,25.391175616305446,15.969916131020753,24.089770393686855,28.742698865042307,28.566804913103834,24.323160983231475,13.257723554349914,18.15283915038488,23.781636933393088,20.012082210898825,29.56498408376016,24.607378289089063,14.546514879521709,13.81478682806479,27.629024821261225,26.760250641897372,14.426926764741808,17.51719857153838,22.890975102932508,28.34131415143013,25.31034557753017,18.26245391923522,17.653833058421586,16.062067637101176,28.196993608836095,16.014496768353293,24.725583188132102,24.4440232982663,11.93607905659901,24.194066554197285,27.447342483554344,25.15621641569264,15.151191234610728,29.72778284046069,16.931473863928236,29.970173109232668,23.313406132086456,17.936569752752845,26.772753904169875,24.924234227824368,16.63683593939779,23.401229772525816,24.31191572422325,29.43613596955946,26.089697162585214,12.60423666825908,29.107683448570953,16.49061800852308,20.91250527500661,25.602123859474087,24.971248472143422,24.640189708891526,13.493891280634847,21.410052395025406,18.760435883088633,22.55950110343591,28.201672081650656,27.06818782893412,14.541699739125615,29.548770135021933,20.057363799154903,27.790681673125526,17.529008451091418,27.727325893849116,26.916820447216768,14.431025608671915,15.771830136190395,12.862664360525944,25.05687989561296,19.900183440511586,13.640091700643534,17.626876327964403,27.921206513906377,24.4748223671138,13.123949989229944,20.61393038407435,20.125101478092517,18.696063664158686,22.909564001892626,15.690758280752082,23.571983691801336,27.5106655519031,26.012588999477252,26.68156739726261,14.220833761905913,16.52879849207571,18.960594139220653,11.330684232308318,20.05447539196958,27.955100719307676,27.613165701861526,19.263928880934778,22.319153751403498,20.082859684367786,27.94557567762356,22.470222725076066,27.91788822651776,14.742578121897395,24.02876256476263,13.920787440734763,12.024687139069323,22.043507811100472,24.333045448412307,29.29550218829187,29.266073560312762,16.389515789453164,28.629857810159493,11.221883847018844,24.731599440051863,26.69403755699812,22.814691844862537,19.463807266203897,24.43584807656591,18.04100638824066,13.409548717751498,15.678859998233552,10.873757737547201,16.586581854741627,29.65996634939202,25.9552946920129,28.987137628539728,25.88227496791177,14.034187143761013,16.463519838964476,25.64092789512329,21.429404929842196,23.875424469918215,11.750384946956398,22.773256622426192,17.445610158739974,13.02831779222788,21.62247984733813,20.12741723896971,21.546855018505305,11.131105558220815,15.892327395640699,17.819073791163547,18.093359261385082,24.5753360242608,23.530042195305505,14.082947714410427,15.398886748466282,26.430164553967856,13.037499140454303,21.153806864372704,25.479916949166387,19.828901186949466,13.818427711123906,25.546462198423324,23.627010168419158,10.043300442595564,25.22679344066614,14.879313118591728,20.122103198911358,26.7415264380381,12.248032827082254,15.00722158153967,23.53872673964929,20.547848444928896,29.950883549115282,16.495309312175756,23.362023923394162,23.80671424670279,22.017735891060035,10.666425958387396,13.67673884890658,27.833990752315287,22.022724235231625,16.001711693608275,28.203755196643797,10.502319193840917,22.46841519814457,12.833412806293838,23.692522377888757,15.362018054711854,17.95245838666667,16.492286953710966,25.20919859630635,17.71472259218625,29.565882285397322,21.283681783880148,10.637854398336879,18.641429429182676,24.26494214165972,14.723197311522917,15.489075681717726,11.453182816728788,18.125659906412793,10.92045377782556,11.437970729472129,28.223318960250516,23.0997854074117,18.049069360958867,22.64121398968723,19.440465635627874,17.61869131766006,29.989702845717147,28.47142958807806,12.598425789421777,14.305546313250396,29.49436584473488,13.58423754913018,23.296782384990962,14.445278872010071,26.223542450575383,22.85300070075149,25.106993583325977,12.31905816582962,21.62836206979646,16.615573001260934,20.83465817212463,18.20738652342849,18.367825006935114,17.297654394538885,21.73034013150481,15.783790313094649,18.45932164183349,26.24367624793996,27.90302212040432,20.104350259876203,22.621784078375118,14.938882059963277,21.357457081043997,15.860289214831838,13.1441666567301,23.588731623163955,19.738180197427823,26.022440469107117,15.754818666951138,26.904939304796578,14.660015348355744,12.600845973159803,17.759745180925123,24.330926196362192,21.338827581607212,11.158765391500388,15.80538876266942,11.704651690514186,29.435431885951417,26.601739173668662,11.23579665677379,22.49389796691751,15.527682131645854,11.745599132329914,21.45844199649445,18.909237995400062,12.952712972874707,17.655589373326496,17.207819568025347,16.10131941758688,18.91857081889061,20.576412072191253,17.579905001256428,15.804872822645887,16.007922043504983,20.780396662530517,26.62698774090601,23.03514704281926,11.692679747212962,29.164952815922412,22.419624691740026,14.127503395568306,16.035053198730218,26.62678885985905,29.134454725121593,22.649038921395004,22.05512123707213,20.84603139927914,25.142290222173106,14.040223616629763,26.645403054332505,25.192172468559463,21.69862885949709,25.322713383848733,15.54933795687965,25.338229980279632,24.6190604215661,24.689161168385706,18.71737085315577,11.071824931819787,16.51360044448768,10.034428358620318,25.189083737100834,19.594262071242174,21.041723085687064,19.0172790557113,21.63832035243604,24.51609786733547,14.538088864807683,18.901210882739882,15.66386537946384,13.532336542917797,20.177759498048054,19.590010840667517,25.420667777872296,10.051326921154025,11.452268277368884,17.943548262909502,27.103102186665993,27.615379752016075,21.079972905071585,16.67044753024177,21.769692944669877,11.75458016521777,21.445016185984137,22.88378111569184,28.18059845060782,14.41627220043436,25.2886599852515,12.900410000056466,24.4215409979423,15.04185527864312,19.292911409939016,26.815684002807668,21.07603848579085,17.928216655542503,29.347855582880733,23.05886556453016,10.191685276154697,27.218742344536704,25.196467054192734,28.718811931632597,20.40779625072165,14.297682137320571,16.440294937933523,19.888608322140627,22.88036765768867,15.230787722415942,16.108225218722943,17.257481942382977,15.224528626846805,14.013881068706011,10.339381211812544,15.196813427662184,17.513034602378646,27.20769879076167,11.260547691443303,24.101563676675024,18.821191529172786,23.847705603867443,24.625577930721306,16.610092856948924,28.308528273783327,28.3284329684072,12.23883126757122,12.814101319978658,16.01685732973926,17.012784365014642,21.725391448022236,21.75361460755965,15.982724572135044,12.240126499374222,27.24136668856484,21.868790922006987,27.625283166655908,19.37961783700839,15.021910406994724,29.005106148506957,20.654102144374967,14.763956241008982,15.825124104984752,26.159303180760443,25.23702073897777,12.301709392998678,18.803133433330025,14.035723187235059,15.644364598802873,18.664711826293825,28.525880697692205,26.431070900074115,14.323117315427783,29.4598384406736,13.320176404823174,17.629297660286976,17.807876220351694,17.423917225040878,17.566181935009823,12.544335764383234,28.060495918819246,29.531892536823587,13.862487811677756,23.355577364640084,11.30162537010496,12.584721585414949,22.733354948302082,21.829082186488158,14.464087472707696,10.475809160816109,19.001558305668297,22.207398077275403,16.73380126614425,21.176397832083573,26.40702673141032,17.479244055318524,21.915351135534976,25.181231756862807,28.992148795871824,24.68520402154773,15.572369295839525,20.997104779175785,21.81525689689706,28.774876685354705,20.322699271330183,14.992646771875213,22.34892296966865,29.108320892116648,12.185780625018566,28.47275119826898,18.01314470311789,18.427290176339643,19.309051966969264,29.97013716441016,25.242746624795558,20.558807074812094,26.120803259640425,14.639547137834196,17.0907357074381,10.394380721167998,10.12929011944966,23.853841227391243,12.139424586807035,18.404575179061116,18.928519763597777,12.067084474935537,22.7496273871323,20.35626742917409,20.303530017906127,27.891195430590955,28.786015682676855,20.574465343565485,10.237402176275015,15.990158928239339,23.093341166140625,10.448260894184012,19.371934670398467,27.91211561974995,13.188978178282259,19.054674310688394,20.461030197250896,15.5145928464316,19.564655805683042,14.293647548729687,26.302656283109563,16.058003415109468,22.586389625354478,17.06964408015847,28.814353029296726,24.41812195291783,15.167968842870042,19.01441822755585,18.67824941584938,22.881830663334775,20.94605930603363,14.558508857278705,11.055617039355973,15.261423196258633,29.814518766593714,24.2102982299714,26.21279232473794,13.389598307304169,20.912746375586423,16.64765602929598,27.745294689066256,13.85220983088101,21.169170837543604,19.918847166402877,12.839503990059304,22.744352906961144,10.276393560681068,21.305721692771684,19.14078476567167,11.212950992382261,17.46420687599109,12.005824912719959,17.59274863970761,13.669402698534526,20.446761890416294,14.409639158881937,13.146995668794874,29.761010035680005,16.196372388154593,29.33792353594243,27.41693538185235,25.491327105248295,12.550751891700331,16.23236802138132,21.95504199372552,11.199876825322601,19.994469017673993,14.029514106813341,19.1004199553481,17.205828699818944,23.084673426242283,13.80732611422121,16.88233504601594,19.77079127238135,11.650652284948194,20.299455739964195,23.117171361250982,25.518837851470767,18.50070018770884,29.764300150165056,24.61355788416272,12.427719036810622,29.25823809661544,29.248546809925898,19.973286151420094,10.993318845335374,21.58361008311914,15.305245976083723,14.581265767187666,28.62303358824238,21.81119713466151,16.134115793547835,24.365272761418616,25.204479725066907,10.658008628557658,12.216962989821836,12.790865542684614,28.22545387407932,15.819362233888645,26.925772800077183,10.66827878064462,16.03178569660098,26.246854252327015,12.078581093651124,29.36563180233879,12.925233352481364,15.286513904716115,23.380290978677614,13.863053574822576,15.775284693686134,14.840806125550943,20.168785837360215,27.668229598550592,16.571419057976176,29.817389962949083,23.374403628736452,29.88487519047464,26.865470835925727,20.568685251319657,29.562005350383295,21.226123292081454,26.89691612075316,27.948885687778002,27.844234650542333,28.488589267611104,15.646417451348675,21.012644646672594,17.159504598129548,29.348405730359577,29.45777416972847,25.321440503632807,24.839310440048592,12.912198324788582,18.31693517699149,26.36030404320754,29.137345972205473,25.52282254116752,29.966953552083982,27.69386754011351,19.0584531764104,18.495180299868508,16.6647847106154,19.54701761145188,13.82949595467636,24.211337627016796,21.242441242951053,19.635029485423516,13.96748854722631,11.660263396552466,27.553608732732386,22.673304105185935,28.48753261059207,25.74898711488065,20.778692904604963,29.28474388083807,13.826392001729122,13.308211520329522,11.695579643353993,14.258133188017181,15.040565328649166,16.339274144788277,25.894259767007632,23.204729931235374,13.967951276515729,17.157299430478247,13.805121854993887,17.96494008667386,28.03195592149807,13.559441328819165,18.848823570407678,27.004465522290815,10.101570599538427,20.258805477066723,17.13257984540579,28.45297570375607,24.889762006735623,10.438149175958698,15.149146240132755,15.276426705542994,22.60992833340396,10.009409414696773,16.983416973651792,25.052321654897128,18.504043480900123,14.050891575166865,21.97576563167638,17.52468156682424,10.910132846408978,22.753769643819005,23.37730874676383,24.741733169814832,12.629896461579598,26.546824537304538,24.08707113211809,17.353885773189322,15.562902637392572,22.99204200470125,29.326914639082425,20.94269772911244,13.824524123708649,25.517942915194634,11.430993038061388,25.929731402612447,23.9377434300302,26.588480044452822,18.43988202959207,29.71949002675377,11.163382587755756,18.57284673778092,22.454666197089747,25.796735566716187,21.528087648119673,24.698083621660917,20.85423211931694,29.738592564847508,29.033628858026688,27.778701691677256,16.87360791056658,17.533492360392803,20.467765913777328,16.30811872289531,17.677152042079285,16.898544804461796,10.399013709794978,25.585870821665452,28.958989596375105,23.02615273873823,19.3426818826573,29.119960250206198,23.03549588959858,22.971982054182234,26.470374165996468,25.680760319359504,16.899061885100455,25.766698251427588,18.83949994410035,17.64235691161945,26.951826043200867,24.94306153819901,11.476168408511406,11.594757396282468,14.758605255139333,12.922945382770816,22.211262222659023,10.653384037664239,22.26319795975277,21.489633981786852,28.053080419414577,15.461501127277085,12.084929344769858,26.197730265411423,27.58126923464342,27.421148012009926,14.48657149940113,13.34204543477564,16.03728719035818,26.73892493074209,25.598900515368854,29.03311188495954,26.122316671594735,16.140982754589363,20.64047189634477,22.318260128977062,15.659984826468104,20.427728084695538,17.440895403103603,12.34418846286394,22.140548312224585,19.538608066117746,22.839331965268,24.77260188882831,21.53093031171988,13.878856799408918,18.48596165055705,29.2738745116008,24.886705782932577,13.338548746069021,16.44155558458955,21.776053844916543,16.87952919152547,21.433362110067794,19.437544106592902,15.83695917935312,20.59558575798802,13.779847248533663,13.8207508005495,11.28872190019627,21.415371445700558,11.428095157442426,28.858803558296806,16.347484449431605,23.57763656191912,14.55706883844246,20.35250900198931,10.274154266631399,22.370910056689546,27.653483974836902,26.390527836137913,27.75806004911187,18.348079905381674,25.692938918463962,27.046611343787283,25.926782716877455,13.973669313823102,20.845512425975073,24.95922528603216,24.45921553900266,10.886260182252059,23.89629094384152,13.643998708634303,11.082453861519408,14.231785439464307,25.417592261266876,10.571712329687827,19.32506263131515,22.561732612524963,21.71446944587402,29.896518544966266,22.832957225547467,13.51980790429392,19.106838473698907,29.385017256520133,29.60817231863293,14.775613174732012,10.428025339450748,23.476215625848056,16.514239860932204,28.53934299678826,12.887352483272778,26.81028873571075,27.866034698570495,28.798198463625177,26.29280065359652,25.665889143856422,25.600028459965827,29.28789252166223,26.299514495378137,24.78318759887155,11.794412550215142,20.850460059087858,15.5172959219721,26.122992392915965,27.33653947951026,29.837362150180766,29.668310489029285,28.587180065150406,13.532639925642647,19.575228108603465,25.02113228509966,18.691956991625553,14.235384045552134,19.18329203123926,26.221874870006484,28.395771722596926,25.476240643391677,22.839777985271596,23.787066795800268,12.192937128812712,21.12803141940393,29.614109425609346,13.80791019101622,26.90679562102207,28.032923124441197,22.73002879295856,14.745676143438349,22.78598311579817,25.74463095944093,11.439863735051837,18.328785242235675,17.642115237639434,16.25354273594312,16.23317895496218,29.201362939887822,18.57605135622319,10.717034155943646,25.79722503693192,11.036202647334923,16.699520444655565,27.277619764488467,23.735768184189574,28.921361347606506,21.29753604568019,13.076210550051478,22.344859580283067,20.69288065318382,15.340447658093366,27.653746645954055,25.88797909111415,20.2841635110778,22.980157645487715,20.85530194708931,19.20713474064624,24.878653340226307,13.806543246556778,11.244162487766221,25.978214419247646,18.312319129471636,26.178294797452985,12.685799002267473,29.51263077919326,13.997691662145968,14.908938414199845,13.175325786098448,12.057851747513709]}
},{}],53:[function(require,module,exports){
module.exports={"expected":[5.894198988175872,2.5530590050308044,5.128534691098306,4.221209460083106,6.276966959064423,2.9673815429875248,2.3170922599685975,1.031145586738183,0.32802814050193524,2.4634388428025606,11.183426748633215,9.887928248390496,9.263259452424581,10.437280456976968,0.1457777360123348,1.1137379742937863,1.5567261021449377,4.5254314125236235,6.543762543573818,8.879249120705122,0.37033527968735175,1.6918427576171202,5.8795287322968735,3.4287749298103014,4.873440915845912,0.4155295527779789,6.827567020775338,7.628180703401967,8.938160629699595,8.792069309239947,6.5976495680105165,8.708575653295908,4.2805145330831955,4.760864847021098,2.580689630167584,5.287998961793122,5.309289498317314,4.6706145722480255,4.4275013769250595,3.8404792643762944,9.640439078660007,7.868896342696821,1.0298380664596918,9.486450886872882,9.613690820603624,9.350921010026786,7.832280843919089,8.137047391700102,6.461843009610644,4.657421253339958,4.687073705894697,8.369537829063752,10.144385357062164,5.66182039319888,4.81714581511823,0.6932247681787943,10.132119823460094,10.963518719533583,5.734665147830167,5.384226571637058,2.741367727582594,1.6507601277602002,2.4219914793061714,8.37336634702596,0.857852007446861,3.804433304663019,0.8209617610975234,1.5902579556680436,6.1728723298162205,0.77921972589112,10.029026783480218,9.85373888208546,3.655561158591425,1.987786053913032,6.622942119971451,2.278465678032204,2.975024994037657,8.241980658139804,6.513179580418803,3.431122970846124,5.348374789815573,8.070450482218698,0.9727539616673082,9.031161081521015,0.3031664395676946,6.455311038577635,4.239032387730101,3.7341564165030428,9.912638321498077,5.632038629885726,4.698254255505615,3.4777485925470364,6.601456270965595,7.065951283376099,9.83746456802787,9.744589529289753,5.797636237695879,8.585018622857271,10.237921024450724,7.203653480433419,9.301001880504364,3.183485960927261,4.326431152286591,6.282985185738713,0.17110682729214055,3.987227710935572,4.064257891999117,3.618703272217782,10.252714462755923,9.930518214122689,9.183439826603745,10.136467432513086,7.808601674595726,7.841849401635436,5.041058211716222,9.875735152591588,3.8001480005795667,1.7102629819740212,9.170170609923664,10.622203661009427,5.013488262354461,8.228405831707478,9.660131404747855,2.078566928801666,3.7083964582884814,5.680810977033317,4.986680457565598,2.215516131552591,9.424340713290448,2.3832846904790035,3.481116340467074,3.9632388181562725,3.8588187571009804,6.968872158519453,0.5223361394534953,6.964191674785652,3.1038392884287704,3.3195273921196162,5.975270191021024,1.9586818791165372,9.487276350901658,2.457098028573466,7.883959617514983,4.338986764890717,10.663130810949921,5.792566586039964,11.980000224933356,8.873682788089502,9.184265293914725,6.409951733925347,8.63069223634332,4.727078077899201,5.346914659530012,8.317222716730608,2.7847329563778733,3.867400532232244,2.384913932858567,8.704546511441789,1.8090894229890067,9.431993645395544,6.5501323183442475,8.947451673973234,3.6859051026271277,1.4417931601072864,10.13103010624853,4.40162888746706,4.533143928351407,10.471046022754933,4.365906260259743,4.749120714212915,6.216961058218405,6.761367598717396,6.845424297328889,0.982680578223762,4.672728442800431,9.72466449361124,8.1513770367869,8.869946596875057,8.088994602183899,8.290048296835788,4.584164501930585,4.485471024337795,4.400849194458645,9.362780221934724,10.063103121474416,3.130468694480258,3.5629620067866004,3.506305584716883,6.246852589121256,5.812399062255099,9.354318311092566,12.464016364533705,9.782040466978689,9.789886984781948,12.21764839150359,7.518815706190391,5.9611199750359365,2.6195944948910888,3.3103447417722442,2.4511352709948504,6.99884283719029,9.028307468043844,4.5958571344007995,2.6045943550870096,5.54923919236896,6.09438755360514,11.093747575061721,0.6980331740645765,6.957394166911438,9.986747104400518,0.6397344785032151,9.058852792000025,8.658829713183604,0.24897228166167992,3.4890481276836076,4.762864757575424,1.8892850815059474,6.974874465392359,5.325944112289575,2.0873043610838566,0.5235817654393732,5.4125880806126725,6.5947081592363554,3.812514119093834,10.064344892147954,3.150976334710478,9.992115334794267,2.2648805964414476,9.2221289152858,7.1271300398055475,9.397336294039214,3.6871813157415034,6.990684640501727,1.6313280799996595,3.3299931810267096,0.633948972080419,3.6996048715481566,8.170444698570869,1.945596283040242,5.065626911334204,1.5909103480593727,2.6451247193696794,5.655531424142919,2.153609222881601,6.222908870219356,7.192666911307632,9.870807497090189,0.40455849466842647,4.955003426259978,8.634128532456304,10.61480006305307,8.614507109926937,5.391909751629857,2.960035238066182,0.7516975846691141,8.645061205717607,8.175024008183554,3.6508613350719767,7.529315931143854,8.280796629853045,6.735740136123759,1.2389995168345098,1.73584585329631,9.113529363346116,8.507106715803113,10.641739387342362,3.508101292967236,6.138517015554899,2.764384619522478,3.62079730206845,4.603845960294609,11.831031360490504,2.0409681501618184,1.4242332780779914,7.877651502249547,7.469311231124996,6.003365373261873,8.971761784774648,7.6944450954243715,6.799189252269762,3.3230391903427248,4.46159602557071,8.146546187014987,9.051421309862393,10.138236722912785,3.1430750913173764,7.6278307308079825,6.876692112916459,7.773759691939212,7.797279012831783,4.66528905403692,3.540181525731592,7.65731212229761,5.022986751453273,6.419375104737419,1.286794811058013,6.40506871753644,9.733301772662411,5.656594670407865,3.170835839712793,6.843893353841961,8.059957861381875,10.401017083609416,4.627216260699568,1.7063995407674903,6.280907269154529,5.813779588868086,6.862786118866016,4.6616262829682205,4.2231456706941986,2.9180991965633236,2.5048595955251662,5.992380637597813,9.2051316825569,1.4626316912448527,7.925475688670722,4.907327740914723,6.3603849825562095,9.586801279414146,5.733376369577432,5.413604069148668,4.278950013351951,7.904354176096224,9.508810059863134,9.39638996616012,2.476575572020183,0.758735381212682,5.049030967598854,8.904219797206814,6.6639510198716865,5.8187569741808565,8.322036003501571,2.6931582009258945,2.829663318308529,5.574935393712108,2.9784077792609867,2.738873126480817,9.046369076261639,10.931186153608735,5.1004217404993195,9.647262031841498,10.198809224300625,0.9284215634822887,4.771071144554153,2.149450904631695,0.32539148328703926,0.6093964636781425,7.289468477212284,10.338116069628562,6.023549762934063,2.470812085437484,0.4017220365808345,5.3230367127744005,5.867728651351396,8.3905357867123,8.321458191978996,6.854056153077222,0.34289752530420614,1.4019554688685558,8.288740706075929,7.90211173147216,4.051418845227951,9.103934611250857,4.574238064577774,3.7929259373768955,8.000347363942707,9.08353107512227,5.796832854368411,7.744899245767058,5.898752773608793,9.62943265788865,5.823834838101484,3.8635018230246834,3.155182343280109,2.278721526535719,7.102432294926257,3.9967125977391067,4.985353828396611,11.252444679216193,0.3100989847657369,7.495125908235761,6.388401808074453,8.073802206860373,2.5700657480622184,5.184780428368862,4.101845704080391,6.638109162301588,2.6581477113215985,4.281941797796043,1.5173557450262327,2.2159074076326335,1.8935594580886694,5.421600721617839,7.538060241469834,0.6806617360159887,2.1828017377081776,2.4738058537019016,1.61282016955679,1.4330912986502577,3.0005659930737707,0.8009400004528037,3.4062903073270525,5.178660149113622,3.553842575768131,0.24225038907502844,7.757128959708846,9.255575793696146,5.424531631174013,5.733259342934985,5.077710480748373,4.858368237361472,3.0587618308233977,8.101164538574835,1.3828662691269373,8.742353572666696,6.688364199436931,2.750373366039429,11.981234459021156,1.859231186353164,1.0115072403250718,6.262562092726156,7.793809608827809,7.134416327939808,6.42836083192484,7.172144041491271,1.5973467813281184,6.941854352291662,0.5086225127747391,8.274962772551193,7.506987221611402,3.7642359295279055,10.204400870259503,5.838548721303333,6.825542179015084,4.314387370625209,2.7865484382981185,3.786659615233123,7.507867123049859,1.6772323266804499,6.880027803681692,9.32741410369509,4.565835700835952,7.462029266593681,0.6055417046761511,7.525733348403811,3.713272423498361,9.276611539000676,2.1580742189720623,1.7953682798050674,8.867880559727373,3.770564989982157,0.7611699697256286,4.754720026955388,0.875820085455224,10.148290710540445,8.208094189555707,11.916385231941543,1.3671042619958576,6.202918513112168,8.210685691955577,9.525748340085864,8.444445472065109,3.2272196481397755,9.844245482286807,9.443387401571599,2.452190564976036,10.914310887289767,8.77137056039147,7.784182002923716,5.253329637739837,5.204408400552647,2.478225551437611,9.939094649295777,3.3634793697230148,0.6280994130482825,7.405890529898477,1.4472353986854705,5.401742753830752,7.31741220543501,6.555952725422376,5.704187923299292,6.0608580175524445,8.08447120834149,5.0707344230901565,2.1185427854624246,0.12654045178097825,0.718448106917972,1.1377424729923815,6.3966855395707425,8.81066008847158,8.258107064624332,0.7756114976746539,5.155786957516103,1.4643720892846368,0.47773935852932103,0.5796648011877013,8.240863395934884,0.5809772856459494,3.561106394525913,8.338640094360715,2.846254125276677,3.988206691398056,7.124799868961435,11.281629209825612,1.34043223719518,9.062464387086234,6.661526053908059,5.470958240752713,5.281132845531849,9.355603581130556,0.07871157152656251,3.148491713570727,0.0039874337153466485,7.176845638684559,3.5614360949423305,9.459866956188632,3.355962552998439,7.367423061248833,5.0583001380916315,7.8724303176246595,1.6359259532690331,7.9472677840161605,0.7112941852716219,3.0480672019848423,2.8811386916260884,5.205543777966825,4.994732668416349,7.445318321285485,6.369576934520965,6.418576084740224,3.1096386949774613,1.1393765630194257,2.9899719659615034,2.2347466421283255,10.675029080281416,9.494510554403673,1.3697440246809311,0.2737051798049576,7.782857112133337,4.008719825306122,8.8093706286964,1.018845860373798,0.15250609916637356,0.1411449594797997,0.5042667197362865,3.0399543454830122,8.562236219836318,8.231501148807792,3.707735154453194,3.0339712550694693,7.155704308287187,3.7163507809432135,8.08382775793654,3.478601157384467,8.499905904881182,10.368178118976315,8.193703854578693,8.366765215799946,1.3073807759970093,1.6690906220365602,3.838330594225863,9.934470706890842,4.737304816266986,1.869907408894737,2.0008879502961414,5.634109488789025,7.597422555548599,8.068979733088451,0.13822870142930854,3.9954185070959385,10.200431456529568,8.625497043277418,2.9087098945826355,3.856541216377892,0.9290822937112657,11.370431853845954,1.4169204432846012,6.587463178083715,3.7980086393612362,0.046204327011385056,7.800449411373942,5.020958736542462,7.702877056782736,3.943624706337745,7.911400513602255,8.317438732621143,6.586792310309547,2.543437046461135,10.024500075767328,6.392614056688739,9.050949932937412,0.597417415375493,3.338988915180994,5.999834537826674,4.584437350653938,3.9954709183351307,7.572491893594753,9.870449669926368,9.947061963422819,8.20720065730164,6.4038854627116635,8.471323200760724,7.531560755468286,5.091191411386715,1.2017065766654536,10.522352742099574,3.7642055553030658,10.21441826268845,4.881715060764511,11.748112123259132,10.483661027117057,0.07019898194756607,0.9090344201624225,1.324404257604864,4.244655113411875,4.8042775129235675,9.564027634643875,0.4411953397139005,3.415819283580637,6.114223966798133,8.687001395483932,5.280331636950459,6.472203308154665,3.975021712782555,5.414197316170134,2.986495930856639,11.478559276590033,9.683207709465133,3.209664872088517,7.798226810902024,10.0805892720748,5.883322571909223,9.50905944528945,4.343837370368391,0.37127369851152653,0.6643171096742684,5.776834311677273,8.830415184367785,8.193836739144002,10.084779762905075,9.646283881661017,0.21248312071867118,4.002161428937985,2.500438233215063,5.536102881085575,12.547317159488081,8.198671641293782,9.16152367736967,6.901442394875415,7.634233218786725,1.1450677029100782,9.3035211521265,6.2347846612124025,9.225503611659581,2.0855743922107286,8.560550398312548,0.24508572820740185,0.21775659948021547,6.306573822827199,2.3163273868578504,1.9723890830887414,3.956740807851172,3.248844979545218,4.6507775640293065,6.366519926692887,5.179400871141329,5.433669097719588,9.288651930122862,8.027470511652178,6.671208309998002,4.927813885646459,8.69578014123178,8.854174683448035,7.690063961569717,2.471502369955823,9.301129752994653,9.049361580657212,1.350619333116049,10.670411933777338,0.083328693576639,2.822307036412795,3.28330217897802,4.493725350131423,1.456482332840669,3.3957532775439105,7.640272472757153,3.923248423336667,1.0469622661834261,9.10623816022073,2.2227850541967524,3.743150837594382,5.830496945580659,0.6394761021851663,8.938427332878316,6.803165013555485,3.1881613034158387,9.368437380016564,7.302363412282736,4.253024680418008,4.0084459968129815,11.336094790718976,7.176039929890097,1.5982100054720483,10.454619556003111,8.990669674022964,5.7807259328592515,9.933986474060536,5.388228937735682,6.341177975813943,5.921503020590965,1.4467045579053044,2.5040038447888278,6.572010915300577,5.249136102150851,4.213435045637142,5.751503148052349,5.728062754474648,2.930351557743843,5.207431639746395,0.3056195810864696,5.086338704119128,4.990148434004757,6.34962897105984,6.733024203623628,0.3358522661985593,1.5189366714098738,7.8513018172396976,0.29191577702862476,7.697020084772356,4.358608584897031,9.236700235172345,2.2232458792882386,8.133572099291467,13.531163152079813,3.558008357368745,0.45499289292270084,1.2711999281653958,3.5881565480166007,4.303096418951995,8.943801608263435,6.796902555405384,7.076637772072796,7.3375578631635525,3.0618713338716717,3.6414647685801707,8.620545300414156,1.0550195323246099,3.9951027255943354,8.85319519432068,7.087471841928049,0.5411434670100339,3.832475578211489,2.110640744185226,4.234367203908804,1.6365164137522346,11.273728816494973,5.593325377543851,8.24077978461277,2.5067783347328136,7.4971434992702095,11.348060283146058,5.238108297405103,8.995636776177387,2.8424968473465877,4.840020737925278,9.49261810430885,0.3579988807066251,7.668825541127806,5.5891855504823935,5.1909059014008,4.863848138359202,10.348889465681724,0.3756551573711104,4.577928316777434,4.188246152970452,6.7011980289647655,3.2903384735589514,1.1857898191795158,10.422854419009951,1.5482261166893139,2.542533010593435,0.9036515205453282,9.246616025672587,5.200612819920231,12.756476134210804,9.201969327709959,4.216327684680517,6.108339784110394,7.219758658861117,2.4813860692413874,5.9922414398118935,0.6920237475196765,4.049881515521916,2.507896331371155,11.315452381643999,7.8508410292703825,8.561652204192775,4.136732064615808,8.776410365915039,8.658039484521746,9.2449165361473,4.600938605846832,4.2867931432445046,4.587933025366167,2.0744770208861993,2.5155381610830228,2.8713386577286477,1.8977840960710055,7.351278370711639,7.908738699114139,6.087738896775917,4.998296737045313,8.923352986149053,3.658401685652472,1.092171818305815,10.674409402982212,10.075337082861095,6.228033315014985,0.23219706454124797,4.225649147943621,4.6695929976164905,7.487299431834633,0.8326127654115376,8.4908797578507,8.02585427648457,6.052303442594785,1.803319007730603,0.33858321764999655,10.135380233899985,6.449725804009444,6.543219222860764,10.011727630116209,4.185759228234892,3.542358107659914,8.265058346705512,8.019499581981854,7.569827857045434,3.1732377389456774,2.09809500410957,1.7307603318958698,7.691594909169959,1.1270528248814946,7.227942542452653,1.623918029896729,10.203762551520292,10.36337140589419,8.693356612268786,12.804367285329736,3.412894299074346,9.56130616970194,3.716483901407831,2.097296801429061,6.43569370090682,7.517917201965698,1.368734155610739,5.622314508797227,2.8703376052813128,3.929097686641251,1.4776397560755719,10.94634280307068,4.9424360593577115,5.268556521914202,5.3218632006576545,9.828694071348215,7.454563300560858,0.3424476366774355,3.091945438976427,7.548646583533358,3.7086891694184154,1.9635765310431696,5.253354605669036,5.60380234491612,3.719104193524768,1.969539535288452,4.780006623730116,2.438186315428961,9.573941953597735,7.158978578950202,5.634810454837373,0.09629303591927109,5.126523350395525,8.179691940664638,9.624187102957794,6.476372938169641,10.862513336046364,0.48827190159967926,4.968217571680453,2.8033901066703173,5.129677622566325,8.294695471502619,6.8482140554954585,4.837670250977823,5.331981883211234,9.226976506315589,8.856940105689036,6.174940904931279,0.9029175164980457,8.290695049304004,10.66973467263108,7.271379286854876,2.0507697156580136,8.840793376460743,9.993965459812253,5.548846649103312,4.132658946685585,8.37342753754246,0.49046054136346084,0.819862971286304,0.20792474773666358,9.669176822197707,6.110576438847502,5.735894299150416,9.49050323911219,7.712605399544539,6.500083673898615,5.196050266962352,0.15289819667449972,0.31351966021335537,5.180710089171272,0.5229859495770118,5.194605193499272,4.028815579184297,8.863056212736879,8.325513127938075,4.911735321566132,8.356995382359113,2.620386821557987,9.366012823918846,9.398141144132941,2.708393193807282,10.002567103338686,7.915440813084742,1.900198033151627,9.252129770301336,2.9517417388339204,10.289981198890684,3.3676459740732367,10.11528857482024,5.495261701573519,2.4456419607336,1.914279177759026,9.670379935966618,5.077363137469307,7.138895553583891,0.6970805214227699,9.700889004789682,3.587176793366839,10.008380719620916,8.515353736636623,6.1882400584368735,6.351604581159578,3.6142656643960973,11.03428070923155,6.990324912373432,4.951635025822941,8.343543536329419,0.05966691396435438,10.009788529170276,8.64275076546834,5.730285758212145,10.676660463383154,4.754261130859328,6.530083350441777,4.6900199641907205,3.491409479486657,6.948996243547847,2.1782610872265247,6.145145026380883,6.376499778283033,6.652133812275386,1.7662704435955232,4.967986234647516,10.343210686802575,9.064438708734503,0.8556909812815344,8.523618392754594,4.607329336033408,3.946882911816265,7.200098335706661,3.2918502316922305,8.767918181626936,9.932074782379866,7.816799153899221,4.512571824386842,1.6367138607160903,8.03940544784791,3.8606498800567772,5.423700939645179,2.0642136207085486,3.7148539160134115,0.029756533871897674,3.5953301662126806,8.371909233860695,0.6994210274348432,4.973122903526974,2.4626496319363,4.387575213710841,9.860925137714414,6.705028391529189,14.048222394275092],"alpha":[10.842541430055494,14.579515058378085,18.560220020009634,10.705350729140768,11.246233125782243,14.383724242962913,10.895742481085362,11.66357871650986,18.187333518973713,16.757642668591007,14.193165214651282,12.571407367887712,15.25662271873394,13.623539001183516,14.326694407486116,19.235246427325123,10.660471142905886,10.500228391650241,16.284309650803433,10.42821946464096,14.715589082266074,15.140333569954343,14.410578071362988,13.165282877562799,13.992337514202514,17.73002907969761,15.400058893857874,10.710820564751472,19.603583981449965,14.440824794937805,16.556437689025884,11.759114085015,15.691337161310624,17.432902906351217,17.069417981171572,15.510386588218168,18.62452178011136,13.536061575453445,18.817503307583138,13.952431525077543,17.014119908817392,13.85652079109203,17.471120872004274,10.983560578930046,14.59102524633275,13.919843244379916,19.431306312109463,19.882667864990797,13.083439634001532,11.938867190341579,16.791745863665106,15.90683131850411,16.018895394690226,14.030056833950855,10.38537978997978,14.821908362223567,16.647794534502545,18.005922200246356,15.029452899225717,15.662943911026241,12.259587741556302,14.08531752632409,11.1539583003717,19.739253410139842,11.397373852508881,12.351737329812584,19.470598606117562,16.38836530848515,19.462976465466998,19.823585393943972,13.650448723610252,12.681949211229984,14.137488608191441,13.75454819720594,16.30350364003088,11.04859731366992,11.89352902806754,12.778543586934067,11.247807209943158,17.934785864543578,17.555724661454462,14.735208138434054,10.469596880025446,12.226762942892993,12.041532652665259,12.346072199286027,14.579098816196417,11.779669975194349,19.87611236040501,12.131522613374859,13.844549614290877,19.71604601928454,16.399908689644363,10.311337311522262,18.50213479878983,19.175482943283896,17.856129422423784,15.109674934184111,12.164014979199356,11.850416032439178,11.02707963945641,10.41050972816401,15.969940519943485,19.94693882431666,13.984626415440877,11.485981576398451,18.50150645205602,14.040719712900056,17.68492732189845,10.700804638378713,12.266217834164742,16.195055667778156,17.95424234365926,14.594223443567348,10.235888481580801,16.264604468238847,19.299045381861298,14.939936691471136,13.51144360965781,13.535853823455803,18.709619408379623,17.21140559330152,15.135905449787119,14.888445919039608,15.694321129945173,16.99212442778404,12.501159918026977,19.23027418096609,13.506747153080125,18.972158063884898,10.540560336526902,16.432470583609486,11.682237906566389,12.183141429282829,10.041921301671636,18.342990511956753,10.274340885276725,10.60228823818255,15.259817569468058,12.962782385644772,17.749877080495047,11.8847166649217,10.557840193260402,12.51600008190751,10.876536843707918,18.94490708605185,14.983881418218113,17.31920099117762,19.318471134160713,12.328376818284315,14.436724641347524,13.999245103620122,16.113161672350685,11.254698047006,17.3200597030428,15.597573340802072,14.78359759474907,16.470174923273134,13.904252179827417,12.861946961450911,10.829501391050218,19.929453631432114,11.437510640876553,12.610257426405532,19.941273846476513,15.64377730142079,12.144206998828386,16.35855590899834,10.375006439402085,15.965566122159654,13.652100123009651,13.44405762098199,19.06590874077004,11.848218936820523,18.549408617792302,16.815231535906268,11.089291560320703,10.521115536522911,16.694617766682327,10.924461780464448,17.582716036507726,16.198126095833807,16.31196892120596,18.97758789635045,10.68298234508648,12.088345171440531,11.594628157066406,19.327040170170807,14.66590431952313,11.703253532138525,10.98216332544958,11.438087740031975,16.032378921759275,10.750613321951155,16.43433502400468,11.525579088076034,19.500357202291013,19.095083737817916,16.63235842820886,15.575156091607308,13.308593911998408,19.253066462267178,19.171492432079283,15.435709042120639,14.728954429177378,18.618735681647358,17.42722386700669,18.895551556264074,12.757198183473301,15.408142844033154,18.48628325742962,12.096125797122767,19.168510663083822,14.763037319876553,10.01733249545347,19.470944464771957,17.467102334287894,19.810240264714903,14.796634561168904,13.197576730440101,14.910081659766243,17.467583620148698,18.059258783394156,19.336065606653868,10.192334197198939,11.796653975488084,10.970199929181968,15.968926482036057,15.804310170404426,19.41493778318207,18.415114515932164,11.122880675384973,16.518127575439166,11.752188857698329,17.924838233026254,16.669556316364257,11.960174979712798,15.24242449214725,15.896871857399574,13.105611402617075,10.866685092390036,16.57009477394753,12.031175390928281,10.435003262995943,15.227258116198918,12.192320013618097,10.003373832785593,11.935982732243527,16.15993744921837,10.255998937213937,16.871780804411657,12.083899624937867,14.177640565463527,12.415955522587158,16.92677299157377,12.58004388995116,10.985351809087573,16.283149400898807,12.99152920067298,11.703522932312824,11.589743126676115,17.15435883727699,19.994293145032685,14.080173348050735,16.924312581059144,19.433242361256188,17.621859662539762,15.757295900562712,12.05258537330919,16.141188855987643,19.51922871009711,12.16240527570253,10.860736388720834,12.090727516570771,12.494066167528082,11.002817923247543,17.75885190523197,14.47604319216837,10.874409457299043,19.165475511561638,12.463969833985564,10.634066382892616,10.583792126688294,12.646677560235979,17.54269666260869,13.175806585789221,11.114261573102073,11.001624962526455,12.603254660526853,10.835008823336935,10.243006969814044,12.414300559563248,12.464288522950206,14.423964524371051,17.245532204887077,13.740101792792178,18.352885336714486,19.47388582388158,14.037146916211807,18.02304122717087,14.954695394236543,17.78724923928506,12.474804858896908,16.58694346432497,17.925532473600192,13.578625365095249,18.3223596037395,12.267392943493562,13.517824913643882,11.122958211814538,19.059379081080557,10.37371835756445,18.802052602961282,11.11977790261902,16.84088766291247,15.748160493258311,10.651390479728196,14.972309634602414,18.881902763902865,18.174800659040578,13.31181310368655,17.494827740480886,12.89524685249666,10.977197749606516,16.36390617719446,14.058022383406556,17.488402545429977,12.980673259743373,10.080768858920376,14.448362704754931,10.029424584211348,16.437555898148865,13.682161927261955,14.700978040649161,13.577588577221366,12.752453733369965,15.047786356012452,17.1551168788969,10.062120104211438,10.814397035649069,17.78348921554546,15.311659192253577,19.71617652445208,16.874321124934454,12.360423131300172,16.54055378504772,13.253569023929765,15.334722928613317,18.489022227686966,10.14736622185959,10.636376040299584,15.338976145140727,17.66984188064396,16.81228082868381,13.995299266351397,18.61062774121953,10.557906254793927,17.12168696027816,14.358577803064453,13.051358100687363,19.216358421305557,12.257165113880813,12.316429614676625,10.445859401755815,15.29734629396158,15.480896316015322,10.916941856356157,18.30803472810132,19.082083286385974,15.046463317517905,19.7422225000627,10.189854928766582,10.474737434146473,19.47297294083419,15.101512411123945,10.228517828529025,19.062903831596145,14.282391049942902,18.69956488111267,18.345262845307577,14.96482656144337,16.293489088336273,19.43149126947955,16.60441473413917,11.34963541767789,16.29732525573677,16.504269332978474,11.942680520257177,12.099772429535768,17.40923265083267,13.715398376826734,16.741890128747517,19.769968716293327,19.205686450524176,19.737414903619133,13.220766212091329,18.440235330378584,17.004942538469603,10.317154034733589,17.001203636081357,12.664695139601774,10.88094098236526,12.48466033138521,17.178029406406722,13.012997491774598,11.946252232421195,10.36983639836401,13.100944842458677,19.71214254376534,16.294268219674777,16.136966037522335,15.907515542021141,10.036211183770083,19.17124911193264,12.641172755462884,13.540193215043349,13.058003661069446,12.57170984054226,14.428106593973531,19.751364845193745,15.499465344981182,12.523620170673084,17.672294316739023,12.173850742817777,13.30987786156503,14.32119048182936,13.808397538257172,11.354230540220058,17.3767901486689,17.320240792609816,16.95021330925572,17.588758790396692,14.77749009462894,15.69367476279692,19.218692746876734,12.45485801344726,11.462912190484877,11.134132173425758,11.150116479323346,16.31880273415217,11.909684371293832,18.78393206144919,10.629275221052417,18.9460863663709,13.469607328580498,15.34279460972753,12.518070087730395,15.83553138626137,17.362239720032434,19.631972320518955,16.733654697020768,19.863338318632614,15.446894339521142,15.275061471746323,14.613373802540297,10.56093116986397,16.481930263138324,15.138168834386024,12.648275897968684,17.34429456989729,15.619502284818099,15.04261256509185,18.510432988268057,15.896166173764056,19.647112255022638,13.190923866938896,12.013659486806741,17.314804513646344,12.990407870226562,11.884376518423178,15.369514935033138,10.314300115409093,14.717939754192962,15.36522679414394,10.940237509097585,14.904248684137942,18.00279080019796,16.13707234751938,18.46443248442153,17.174695743333043,12.471851520968173,10.790933794521804,18.784902251173413,17.07430347151702,14.240680263816689,16.547539052673557,11.590267230268033,16.140211058447658,11.23164542148685,19.74071479940625,18.052167283386467,14.830585711791839,10.527001935844254,15.324611529012513,12.477212958483024,12.125353282855896,17.138104367250314,12.449576774546696,15.872184318953767,11.452107478967177,11.362195236847173,14.211822371776663,12.860779162233824,15.41118415135255,19.50600614566819,15.027211479598733,16.15980945113914,11.454189044906453,14.640853509639019,13.704583635407817,13.85272855759677,14.505027091645653,16.074036408035262,17.281707015878265,19.234080509650013,13.493381428579426,14.265084216328797,18.611121395480346,11.655641176298158,11.581904638699891,18.951435320776522,18.254839085298997,14.241726554412892,13.973597632723518,15.63043192020698,18.69398891092738,14.347445972283271,16.137195715166285,19.564640374522277,19.255987452497124,12.301800783920491,11.208802204743833,12.559521511806125,12.938533765125698,14.947815905796302,12.515890203378309,10.00227050613004,13.712515490772217,12.271757322272915,14.845188234598615,14.882252938310064,17.200205584216516,19.21549694659418,10.518737281955126,18.957577811257558,16.009613143200614,11.744819180204152,13.083050279576064,18.29393799900356,11.495795526489479,13.348803636892823,17.062408772282897,11.871100933205817,18.700831451575517,11.494207991301625,15.014772465914618,13.823555943031314,19.915148611169666,12.89538945109775,18.524905522909584,19.427548441476436,19.186911745180495,18.38747142501837,15.378845181426977,10.721705093387012,18.513383745141173,17.5130195148738,15.037621720619649,13.026651629339565,19.248725746333214,12.40865109224378,14.559754406527636,16.218421969126858,11.647778958235797,17.639264440006336,13.796775468260844,10.05101681149197,14.44708391317758,13.129547465240524,14.102091048182949,18.617810199954256,18.538217547816227,16.19795390894417,19.56841860709367,15.102885973828768,13.303972646577105,15.42453415171715,15.53426440385951,13.799047825518485,19.438510292075776,15.51330746983082,13.632008003545142,15.450118700455029,11.925327702003564,17.18728407447717,11.906181382296577,11.363889312321406,19.0930000460544,14.382744851563707,15.18677686427183,14.655125231246087,13.444132095571234,19.088526575440856,17.538731189833854,10.434939282270228,16.115436049413006,10.381661913585738,10.038458289992551,14.92705555375374,19.790761150761185,12.786349872300784,14.698313915723277,13.73207066531373,10.537968865643794,18.58164165033397,12.636247620709224,14.243663285177398,15.022240088925775,12.95263397213419,16.1658874530477,11.499585164654707,17.730058061499307,19.74469835362452,17.327911761953008,15.835414286463081,16.162356850094525,17.216559008321674,12.910475286964582,14.765183881478102,12.232051762056685,12.376274004069746,13.171710462959549,17.718656332360272,17.560390347228218,18.813073625752672,14.676579286321715,18.840019013072464,16.714996052831943,17.13444724435643,13.307604444315224,19.339628075366832,15.538730068192827,18.96301409022681,13.847729120038064,13.743515043436425,10.808502120482189,10.629220756337483,19.346391495669994,12.228075086952375,11.682131885998363,17.27451787388751,12.315664626527305,14.781661857874631,12.276158068081639,10.03876260843679,19.672302542144745,17.217566442742736,16.62773473414903,18.84817557859006,14.080652623961177,11.441241412247432,15.583723823570734,17.23357777334347,11.24217543696983,12.818644368904355,10.74060051406602,14.439180348862157,11.820947827435816,19.030101119813516,18.657254164887256,15.199751567345173,10.30461017788452,15.56971977864441,11.923850949149795,14.792738008430938,11.719260450747537,14.81082828726717,12.861008772298277,10.167757429168736,18.487520733823168,10.06410992959921,15.116508199534787,18.1336300273755,12.640706170825089,17.468713633729962,14.029141458734372,17.76126957925385,15.799010285750398,13.24571643937199,13.829420728122312,11.275049499630846,16.22623668974274,18.176435262187894,13.823305380543605,18.737231245948337,17.763940051090685,16.86760265724272,14.086367409739548,17.99911052095161,18.494258836514273,13.35088306209165,16.535995430718913,18.3664717836647,19.53421898215271,13.99662922315108,13.621596289328199,14.644252389895776,10.048629081940636,18.917292207301557,18.244568608317284,19.459024003400067,17.289693179178386,12.096605539012685,10.991322280862661,11.550504671038677,17.36026674862437,12.913458808762655,16.076393230763628,18.96673670100248,16.787002512137228,16.90663713548261,13.357400454806768,15.631101956271038,14.31504894391448,14.737041971748972,17.632968595263762,14.875957530111272,15.185769587837875,17.550601415790858,17.422112264054128,13.927544438011362,17.806944405757765,13.751387336871026,16.20904822592431,16.87524346674292,11.531197254658068,13.864464489509775,16.50312518491338,15.781119281290897,11.913852685763924,10.191739357060698,11.391796451574198,19.773697548297157,14.501857911673724,17.957974651372787,13.95082457946867,15.19294421211217,11.053762385660285,16.943206945510493,13.985344275849307,17.658779674169516,13.887161439181906,15.147557416174886,16.612583173369398,16.693159005094444,14.587478177554605,15.036998029045987,17.697458992909116,16.911549271386797,15.32673192321247,10.757420187287998,19.60686999627997,14.994857096738851,14.749330217564196,18.237253859335638,18.775565040242814,16.33921940956706,16.672018900728702,18.41478926525106,18.32162091029126,15.819524239329779,15.117435377082018,17.434642509014928,15.544027015827531,14.25952288505448,10.470732551566297,12.1274609500077,17.408724154376994,12.401223652453496,14.49026912908128,13.340932480894763,18.27676517981226,15.827123204802032,13.62178177872738,16.315306589752048,10.773653888486791,14.059277882617721,18.738801913528043,11.271853249695457,15.032865144050751,19.801066553666956,13.24774105018645,13.934994272382074,12.587116039892233,11.666730710441321,19.696434981409272,11.563698563809567,12.839457553030943,15.298599592584672,19.92122769987931,12.617706385209546,15.27845344807589,16.554337428360512,12.949958990776631,12.823987256936842,10.436505177401177,13.159099480184675,14.783967184474403,12.557715297376815,17.281903515584077,18.34806345873866,15.745644206613026,17.175961974739373,15.01816650281058,11.615666316043708,13.269463390760595,13.329030183741732,14.737971958480756,12.4806567153232,17.56705871815287,17.74737541267417,15.469338584098445,13.04096888676202,16.460238871589702,11.730263358266145,11.559252729149359,15.39410997129117,15.58656002844064,11.928440803564147,11.693701031361787,19.724093415835224,18.060747275892176,19.415826712196807,12.360691483142258,14.081428287978433,14.497276342608213,19.250810550366182,10.418620541756386,15.080989675207476,19.5384930247021,13.507222991808321,13.124334494310201,17.740136947991488,14.05866794777262,18.11352794477271,18.011653077715163,13.298872089583133,11.125782828560931,16.414045244262102,16.698028374697394,19.75530937865883,15.409569867648738,12.435838436693341,12.422899242687427,19.57561760336976,12.272437579512562,11.499733557017148,18.930649643247158,14.693314453373937,19.59713875125594,12.260142189927885,11.000227749292682,13.07689124427036,17.746276848016837,19.179188371881935,13.05819639079159,13.167486183872928,17.56961361688714,13.31188831979031,11.050519864846663,18.6912665610316,12.937427441645388,16.17582966766154,10.984621382384193,15.014067143061782,13.171844182695061,16.41978258610591,12.326298500821377,18.53768415821864,15.466758478510553,18.481646597780355,12.720127495990301,12.554112248429437,15.916000548101394,16.269842533940075,12.591183064070826,15.943994683297891,13.532920434699662,10.976566581282043,18.975902196487773,14.888480005264102,14.777618062560363,13.88026020636194,16.29559366067165,10.266395351234781,16.466101819277448,17.840136668358785,18.98982915035901,16.96647612386227,10.891068194582923,11.881250379994235,17.071030867917678,11.30092834348622,11.485984716207264,17.524552940979852,11.893074891803309,16.154089272488747,14.00543300691178,15.140697206905108,18.203979400232623,10.976375710794432,15.611452727739142,19.713367948816288,17.246173739128768,10.665607230817322,10.278796977289852,17.215017063291178,19.712735205065094,16.862090582734446,13.726721981933746,18.254152492039026,18.462298107842816,16.87469160276668,11.807291760376447,11.596998553857604,15.981427321420643,13.026454724628255,17.93223582992121,10.113384227816752,18.907591863643887,15.57301417822545,10.579216962349896,19.330159797015277,19.976790648535346,13.71105395253505,11.80351159762571,17.82348744293091,18.91931488794245,16.81493643109982,14.783750657001312,16.7287450208176,12.783547944460558,14.86995982299512,15.7646755292329,12.411235559465307,17.61005189267494,10.975319284923495,11.263706280535414,14.178854343557795,13.668312135654968,10.146729732766355,14.152616023249,12.507773249618012,12.730355377786001,14.692086912092147,19.918176758570883,11.813118969785306,16.291332488670495,19.261530094780177,11.05110166831185,17.44573788641855,16.140866634558577,18.232949206545783,16.347844861422622,12.02291299915884,13.83743793173116,17.958068431800413,18.124947243522364,16.093342486647643,11.106402599068604,12.494081364909203,18.86349616086629,18.778366498474156,18.493336141029175,15.715012661155752,14.789657681887338,17.137295285555368,18.729684154939537,13.16367327906278,15.409653108336226,16.843387108161153,13.256830350630999,18.744395620954773,15.406333637559033,12.303393388752376,11.241408515792575,15.117461423963142,15.717146145168115,13.652735820246413,13.817572123778374,12.52700181675972,14.79722555538736,14.885000760347133,12.694627416603947,14.308724504642434,17.76104909949316,16.27920183901644,12.341756959310274,11.845221759552134,12.863097549072362],"p":[0.9099683661801083,0.5138458411005451,0.2621806563327116,0.24376525130334192,0.3006643847854369,0.16276618336819837,0.7089197696242984,0.0890402099183385,0.04012172999745389,0.5364880738043598,0.8794239235534747,0.5173967999835929,0.6213829925745451,0.5491477003905978,0.07980502870897599,0.1332487118564245,0.06441828210968259,0.19900968530395802,0.2968815398648348,0.32276837295666416,0.03866815848138039,0.8180951770167815,0.42248072405982984,0.26261145088254056,0.8035938639416011,0.3658056202763176,0.9424401198558372,0.5555172876609777,0.7584759996318804,0.677110737329017,0.6003347617055328,0.5257453576522566,0.3848797947728604,0.2413635176784903,0.38811749625440384,0.08219138685055927,0.8800558299125132,0.3155175656258,0.05989589332901235,0.20187802508617003,0.1929495264086485,0.38627146192760975,0.43294117557560563,0.26482115141865026,0.3271662262793533,0.8567361886925449,0.6679536589087329,0.39641572743642106,0.05196329027253599,0.948738256127378,0.8823161147594882,0.3770113419247114,0.22577360427371107,0.7386543732994697,0.4782123169359629,0.20725203609873133,0.19631231823136353,0.9355835128980432,0.44024241613979664,0.20104288319565433,0.37241496711049904,0.5107303753505408,0.5205890925041217,0.10835978857853568,0.390554807145437,0.38312509305308984,0.5574751559696096,0.602841476420173,0.7189274650645161,0.05480740575593246,0.08873950320186097,0.9268032582544576,0.49200964941568315,0.6319315016359492,0.31975286557549376,0.9643450021377591,0.5677068689592599,0.5044007856213357,0.6579451349453622,0.3574172817972676,0.19708187569548596,0.6007253941133821,0.059193596052897535,0.17120359763037452,0.18189256165256507,0.5833659352549072,0.5259496760938496,0.14331439086240372,0.6129159257308399,0.7183444052484149,0.6905996597857478,0.9269879820146385,0.3510332825834299,0.5020333504923198,0.37880380882278164,0.20701664192146096,0.451528461725474,0.3498870013003481,0.5051062778443183,0.3869254091791874,0.40568961103995793,0.027765401527523936,0.008586536749444873,0.48390625271006527,0.8070098080029702,0.23391433043876764,0.7402519551264184,0.16989889920295864,0.5062660833021881,0.360585232455076,0.18711737152849328,0.9309304106848781,0.15518490841661503,0.34710273126251634,0.4757026144502745,0.3655199208146902,0.15528793405785968,0.1632397461965982,0.3204563011804291,0.8504209279353978,0.4513928217205845,0.5656828737050805,0.3572393790843065,0.9779511744692333,0.058336805291325566,0.8327852072860218,0.30728804854749403,0.5035354564052319,0.19633576325227842,0.47336901610813187,0.4649882082926229,0.8389151781520003,0.342669889189106,0.07651799422147887,0.17009066716308308,0.4539038288684234,0.22406236194053064,0.19892007520099209,0.21827059164695162,0.6678881469241464,0.8289913974277139,0.8046351992472167,0.680898404370637,0.8932951735957009,0.7374768065574231,0.029961797722642514,0.9902058038752943,0.34788525258639935,0.1680513240175252,0.8083822597029242,0.9659144954603758,0.5545443000679637,0.3087569831857859,0.0011328359013198508,0.02792042396098493,0.1812434229656259,0.1549111306294455,0.07317216958729356,0.7243700749805921,0.15095541846220284,0.848193998312571,0.2734652557798243,0.5477303160235751,0.694248509808814,0.6662140365046496,0.24040830332261476,0.2925101314031211,0.9189350545357544,0.13038673435650705,0.4048146003212245,0.9679736039206737,0.8797549166915393,0.9265544693740873,0.8750473577994562,0.7404906026401301,0.5447339870654242,0.7293434324137664,0.9297215695183476,0.10864435290732533,0.23444022500063655,0.9555714417122501,0.37213082763323757,0.5677960545251717,0.3379187450176324,0.3209626097504956,0.9168980121188766,0.2980760561274989,0.7124509819823965,0.4463177056161918,0.9903420352293739,0.6569553251863767,0.955310516174581,0.3856581858096513,0.23217423058369402,0.9928275242554672,0.9361525421361026,0.2484451079307386,0.3938078819405795,0.5559642960493356,0.6705789211999889,0.30764278420361624,0.1993427083350814,0.8749323466689709,0.4589945787914713,0.7141108216988163,0.4298713257328559,0.9803732923719835,0.38534789015021054,0.7510926919832905,0.3163987486072075,0.8164466166583135,0.9422005507921289,0.08017602468863694,0.770137832722178,0.9692657192594276,0.7164987667718177,0.02539643180649165,0.34538684333080005,0.5732657831011116,0.2589262450389216,0.1295047739864601,0.2326900646061707,0.9593308534497635,0.5596814542792949,0.6703640465396101,0.5042979414205047,0.3270982499924917,0.888291831500843,0.16913221305007098,0.8152734257704104,0.03681849750411814,0.09171576675238358,0.8640114382836039,0.07160881191943091,0.6355450639209643,0.3000767324411475,0.390546955153229,0.4503510825750612,0.9835960393563059,0.4564534154487909,0.30190546756485714,0.21878683837675683,0.43290127572106396,0.009922435290891318,0.18644676099110824,0.09235260305688353,0.608933345911647,0.33652581973025253,0.38202494298824496,0.03815874807442832,0.7152817129945261,0.7255418355314704,0.7638778909113131,0.02910054915759508,0.30430783601189804,0.4445120832931504,0.038856114820487564,0.5804099679669166,0.7181960050312801,0.29543604447060523,0.9308547970933014,0.14783440801067171,0.8296694772259405,0.3283553598871958,0.7041982276057597,0.8531474260284515,0.34800804291293796,0.666003871731744,0.5039719447626259,0.09570374917097979,0.8145365263362183,0.9752737220618677,0.1800212840564397,0.8271631595129882,0.0798838112971123,0.07100002494780511,0.9215404886965084,0.3062930559268233,0.04638042849716584,0.920249513411834,0.876181473278034,0.08391820493757152,0.5000183847491053,0.8646190596875278,0.29802356129945173,0.7195357322945648,0.8675435270978378,0.18088740852068796,0.2950376405045121,0.5612151180395146,0.6992222388705425,0.9490034596648882,0.9854400765592015,0.8798897826892258,0.6479855515645341,0.4163507146560701,0.550751481488688,0.6730478648446094,0.7402811569784944,0.003598739085757252,0.5487662641771502,0.28049290498087576,0.5159769461016008,0.8517185373476477,0.9314756086926548,0.6676380539785676,0.888250440957719,0.39906288957793445,0.24898684104406388,0.8854498594557663,0.1651838721202461,0.612435644963617,0.04111489540490032,0.2755757366720557,0.5839831552096453,0.7334278485508221,0.4156504347120742,0.5587087004058415,0.5820081252121789,0.07493564904241867,0.8782648171810672,0.6342135251107033,0.26441755730122996,0.9005206511068071,0.26407674579137885,0.3147564536299592,0.4839692016606405,0.19965213672240711,0.2008444462597947,0.44163581716277944,0.47847176373502487,0.5117071712432408,0.027839790355197902,0.5380579244399548,0.7268736532467248,0.03729458334608449,0.6526693364517544,0.185226248259575,0.7423431595794341,0.3042528547158556,0.5456719623347375,0.7559525477045339,0.04357836333557019,0.02480343706329502,0.32959267229124367,0.9137441027945556,0.9416988636829247,0.5113383071296203,0.6497288663739023,0.434307350583216,0.8643756909216052,0.6512021857425123,0.9676825087655965,0.7591079225804351,0.5979985817888918,0.9875187382816841,0.39871016863310427,0.15296942035897065,0.524562830012455,0.35087510710807956,0.2436230603910141,0.3243799759817909,0.49249177821502954,0.5106405829837086,0.9918462741422176,0.720640175086176,0.8018323810360448,0.4770303402821876,0.10191457004044291,0.7669129982212795,0.8717171443702272,0.9468851351183445,0.5365371179800551,0.8672938876512202,0.9335506984895556,0.8529493927806675,0.7444218290758209,0.5394369634350522,0.9063356874395296,0.4157542336920168,0.7806849000031271,0.7785445586791022,0.28007875028172236,0.23648372612264468,0.2566406214746233,0.5779790912707763,0.21243207575713563,0.45585696977954804,0.7810388263878001,0.5158743972124413,0.004426133591030945,0.39848860106565986,0.5058725229059853,0.3097711778652126,0.46752563376723955,0.044160699624638866,0.3635545312014197,0.8702861037392324,0.5473406249441102,0.12609997615455537,0.46106672455139797,0.668984105143799,0.509246641976399,0.9150816495768357,0.04691050313434508,0.5509339585480937,0.4664150006347776,0.3055559627999902,0.5616267954609317,0.4422688326746327,0.5480780687143711,0.3217574727131318,0.28423167644962355,0.13986247211028102,0.22429896166092456,0.28848453366793003,0.9755730468656623,0.9320229092288697,0.21144316607809555,0.6572253255552063,0.96613540005298,0.3323783969749403,0.27720702427430344,0.9962298794249485,0.5390926558223295,0.5794521055962989,0.46590758447550407,0.3253369067461096,0.8114546398474858,0.5564622832193187,0.4726731414074725,0.38193260900068515,0.2086184443392196,0.4759356778759889,0.09998690784663133,0.8458166078198597,0.32543314030511716,0.36742219529851217,0.8596463980583344,0.7306350327597899,0.6691973422821718,0.35506731739929775,0.8610571143368786,0.29428377554556073,0.23299156678241162,0.7385776607985304,0.3919763945395991,0.8222610757768787,0.13381072076564293,0.8772280757161341,0.8594468612721329,0.5281021834840751,0.11127411527001363,0.49753765063721933,0.6194153219276184,0.8960144506764032,0.9829818069745209,0.10771149899665611,0.8676339617857762,0.012690151675287309,0.4092074272039157,0.1711266358411847,0.8492376691344847,0.8621971215000037,0.8725076525790354,0.2765936524746977,0.8311065270572244,0.6578486850683356,0.5699452649281651,0.4997680938451692,0.9112403295015492,0.5615684535200234,0.18425120782710658,0.7435642228062367,0.3070346380478981,0.4539986100844504,0.1645367425759343,0.9600924273612124,0.7243519201008786,0.5279973928503863,0.5493059378384402,0.9718028428202301,0.27476535511256994,0.4621817641512971,0.5701470370583599,0.31265022647345875,0.3735673428673012,0.33311797804035215,0.025623618012779348,0.020795831448799706,0.1550282646686143,0.5595083600093824,0.46761299479961616,0.8528241559461118,0.40923628632307363,0.6285251257913538,0.8002994152139986,0.07147408165513114,0.35663983281976663,0.013780805453220246,0.26445178434653704,0.8388864408567307,0.4861561908471488,0.9816556703130039,0.6719979548453672,0.25016301854745593,0.14007283123113123,0.41085695746828477,0.3675743632845956,0.8285390132435004,0.3533531122446967,0.2021061148599459,0.4044670580171683,0.16567959093576268,0.5190048677224588,0.18891199850316154,0.802260477197152,0.9528320951902898,0.8036080401510228,0.37137146443857727,0.09383469905706576,0.028708559449306836,0.7943030568484446,0.13074612163658283,0.5487656465308806,0.1800358437559728,0.42674230227242127,0.7061266385390099,0.6034687733917932,0.6047686142640483,0.6739313448441759,0.5051156056955002,0.6463484499325252,0.34449007383370067,0.7791879120787202,0.48214363837880514,0.93805711736649,0.5299394305803171,0.2581862859303732,0.30951174998235653,0.3540696922941149,0.5866175806235181,0.2672101142513479,0.16198018719584684,0.3662878606180813,0.06563638345510303,0.6064913681788953,0.7831989578106844,0.8322481363857153,0.19286422211283538,0.14637815179487768,0.7588737673575168,0.1491032030711108,0.06297873317938385,0.9745452725993657,0.5789110644432531,0.13848841763133635,0.6551433426243884,0.2691116247710015,0.5705804890627366,0.12340982582649906,0.5388800221917032,0.4722145439403498,0.4898185245181579,0.9445215824291111,0.7164495021317048,0.17497517459709333,0.6406071186186617,0.6748647643816945,0.9484197699610288,0.23831899814055602,0.48215446606572665,0.45607775580963783,0.9673908559814481,0.6855378240290559,0.9395338066706982,0.7653243059799837,0.10246015196163638,0.9645431778226912,0.8433017146559572,0.5373077083466395,0.4943156257564141,0.5232773184696118,0.8406911936437129,0.6711082780890629,0.10947999531197894,0.32695786413177785,0.8602302971340212,0.17147046287135748,0.3972727562266316,0.0009667775698918302,0.5842269513235132,0.8079834983010963,0.7740153468026383,0.5545219325147455,0.18044060672616702,0.5683737305756291,0.5468837787135121,0.30925911993415367,0.0945365085003842,0.6482056768921032,0.8553265444957319,0.28682856389490463,0.6982631660353253,0.5193460185732968,0.7641404817213413,0.2629632570914202,0.8838261288051819,0.8278928290453513,0.9659468427261273,0.5690667315166373,0.4043821596511763,0.6967099572916349,0.4448626327197085,0.2556897225788244,0.9907616367457481,0.8567771080567976,0.43525100367601954,0.7281782750055985,0.44229153937585264,0.433240695375706,0.7101055632052766,0.36590890707874757,0.3100189480530222,0.5447664269845987,0.126945894762035,0.9669824586304523,0.39195771568594995,0.7117739753784125,0.5389441937805128,0.13267846828637886,0.7846628130615068,0.861640050209066,0.6262789708317291,0.05565405608703622,0.9164734366627527,0.27731084389730465,0.6491243589875231,0.4806579909699207,0.3702640032517255,0.33052698580886775,0.3043458262572085,0.6780825554192529,0.35966821126650594,0.595376422320899,0.9246849583006422,0.38370857649171963,0.6316711801513073,0.6577762507820781,0.9051972782241873,0.18694941559594924,0.939105391419083,0.590909510841428,0.2270253897749137,0.38155256862677467,0.1478553817249284,0.22046286110028634,0.9638969541143845,0.364407670808536,0.8440606611546122,0.32361392721008464,0.6193395316192585,0.4229295583701995,0.6154434913305038,0.014059548414232736,0.4935575182691514,0.581895053085228,0.46062224867914736,0.10156807652521671,0.6660089240864935,0.11063348908367443,0.3639701233411141,0.7349256257023442,0.7556175003357484,0.38790918032313937,0.60194454831099,0.8186286214601901,0.5975536339618783,0.6937880520573476,0.13439380760990205,0.6187470596137319,0.0738122185021084,0.020349160717163306,0.4240879699704745,0.5171478892770156,0.6573965485826927,0.6517972164201891,0.4277225910487399,0.8747150789304894,0.2689121806457404,0.9882173609506784,0.8725305541266244,0.1911921072512066,0.5429861788240191,0.7251406179046871,0.5411942684809252,0.7790074862820657,0.9848041614002938,0.5695083596995192,0.3317073441470213,0.9295758052058305,0.4151585887058209,0.6756851142120817,0.9051386818158855,0.13563173079377977,0.9809551743880862,0.030973936107929978,0.6681961694403133,0.8885377428502874,0.38085703875668786,0.9451464577246977,0.2710323959211345,0.2969691075030867,0.028829178277240075,0.32891497246955925,0.44544010287216773,0.6024297151831672,0.9104459155591946,0.17557242038028287,0.8974341812218478,0.3421504323756215,0.8743819645804602,0.6760646263869552,0.5185083507317256,0.656480386111228,0.913910060413863,0.0766922529836418,0.3895688601157461,0.2574586632207527,0.18706471031455307,0.3258875587580794,0.599289459575945,0.3532440478176744,0.9994963721972452,0.5741716737359377,0.19596665428258264,0.5735765785378937,0.046764330520259634,0.7912267313342178,0.3341089100347041,0.44117097614347967,0.7632649754588836,0.3904091661408917,0.633958384033606,0.05029647529407821,0.6061490621646084,0.7029057721358505,0.8571553182301392,0.018793450443913118,0.7492526276211147,0.7670164015971799,0.30524794442404857,0.3865018755510705,0.6642726701135862,0.7706658600394487,0.9877651444429969,0.1597368888377082,0.8013586892814575,0.06932208812836116,0.13991144611439266,0.9189978389593685,0.8048573470690974,0.5312177360583736,0.6220627543641122,0.04514621040868527,0.18304266246455692,0.0067085619232412075,0.35771525875838495,0.8873318420621632,0.9322688743825662,0.9470289918028434,0.6004917757391173,0.5448213361577696,0.6526494644107148,0.6244798116001491,0.05140182659506953,0.3723902489519517,0.939711057971796,0.7866322926119378,0.28465977108979823,0.15368675659040054,0.26392083945270994,0.9426205886990568,0.014744728699204623,0.9889749471610172,0.774240079729771,0.6233438074826405,0.02138632614016922,0.5783449669260416,0.9505781817804657,0.39762288862573203,0.39356582534470164,0.7537974330244765,0.9871343403364783,0.868990046329559,0.014973596470066575,0.8457215109488534,0.8442500911804425,0.9117697577950195,0.8143263006280135,0.4122201688241156,0.9690699734395805,0.346403358947174,0.3445986271461592,0.10836235664856875,0.7174798725538838,0.8225539985611274,0.028118565130983875,0.18006645261014986,0.17221973866866058,0.5370837902525081,0.2494531850167896,0.4806888747105098,0.3817556472424386,0.47215444702037956,0.8818989302466989,0.6123375830600881,0.1694244780649692,0.4003827702654381,0.3404387623041647,0.9365138594422187,0.40451848032285254,0.8889825139146939,0.2647298044922568,0.14557332108049725,0.3830214619567096,0.5423116241091721,0.42067917482480244,0.22005736707476165,0.01870931876082893,0.7950135135950822,0.3272295970991179,0.49610148352397765,0.39629875111707347,0.22426994580748816,0.42331761864631323,0.09876791950654895,0.940307594084203,0.3497668224883155,0.578953770129601,0.4327216344411857,0.2180932341136368,0.7784339334481987,0.16804044269755813,0.30898116865170944,0.528006358636264,0.7101485958374238,0.9686960123197792,0.5610308138655589,0.8437723386702345,0.9765251578057603,0.624098400202636,0.7675701966384838,0.17554454387527763,0.7273005855261752,0.21899734104218238,0.8092282662129033,0.8613052740275686,0.28112806335905005,0.870632614866063,0.37848457458986706,0.8713021004456001,0.7264792764424275,0.029210041525700392,0.08753448215039983,0.8565749500022695,0.8938384470505232,0.11757231598115436,0.1302270402982746,0.22728227965984837,0.6636937390094684,0.2623319961466055,0.5041611905263041,0.5222169135551828,0.031054436975441746,0.3578234327031582,0.3090446328150087,0.002755287756996516,0.6373970655554406,0.4837058207241689,0.7873257128374431,0.4010616740754338,0.6731206064660802,0.14481534876677293,0.7509613630693361,0.03906791008263033,0.21240611280914123,0.7743468448962729,0.4510667205488357,0.6642765811482878,0.8262066249834068,0.420982488295627,0.07990577423349654,0.6681845049596464,0.6719376024799955,0.21800489291379033,0.5257023738282922,0.195055028961171,0.8376668988443445,0.2908048670870922,0.38569150785211814,0.799941304971659,0.019395135003621666,0.20700125596267216,0.6107815071639471,0.8285370562690915,0.06613057973187164,0.6057457458551885,0.06704127507036883,0.672965583378359,0.431218993266697,0.2597763903591144,0.511680191956507,0.6024926188544915,0.4155676746196759,0.5441763796334493,0.0983111978291138,0.502646133177514,0.3841459925571038,0.27492005444784184,0.2819713556968475,0.18943137455980108,0.25636925500445096,0.2689908411891355,0.20521980400909867,0.003872147862070241,0.7815638218423435,0.20402439612254408,0.7809476206077561,0.566469662903754,0.4332533809596255,0.012480435625218611,0.7163594439450733,0.5189330473220708,0.4335243408723646,0.9740850427435417,0.34804902117237235,0.6443891863032853,0.8847182791904731,0.9521097455628353,0.8189551579986469,0.04306801686469641,0.07281176801295741,0.21995153840660686,0.7336678401886165,0.3710215087316586,0.3718419130966275,0.35884886383206305,0.33089033672290324,0.8332941551096407,0.17386006562275247,0.6329567154303113,0.7501327309678922,0.3562203479753614,0.34138923143447375,0.35580855063328354,0.03415047659261994,0.47048362516980635,0.2575009976750242,0.8609057994321925,0.8261639464524977,0.21843945247576113,0.07404644378816516,0.33137785460100666,0.49626200319697045,0.36690524656530754,0.024685283949379633,0.06647642605538762,0.051246003527401385,0.7604229812730607,0.043186684958536725,0.2196121822326631,0.6251627909040425,0.9047818703265531,0.2899010855932598,0.8974115074475641,0.7712338764354152,0.555838309453071,0.5240290900404752,0.694085234487877,0.03383976981545378,0.352769006998364,0.867231501289659,0.19404389892564167,0.2580351135239891,0.6802889452619649,0.98945474682935,0.729223579547513,0.16518079102520722,0.18857510781374964,0.008457968530135807,0.19434231188242146,0.0645339372734195,0.7770949014069519,0.10126014482643342,0.3836418080606583,0.6533006175891294,0.5743438147494642,0.8664172104898227,0.9915728897599774],"beta":[4.720515076687548,2.4298355018690976,5.045202717474848,4.11246361919114,6.080502874246802,2.930957119352726,2.0689546253856284,1.0229339009905902,0.32729041553074323,2.35295821914411,9.634824798027148,9.331174309520204,8.691942128491055,9.844477066427945,0.1449339148918205,1.1054886631020566,1.547032878590462,4.430796775806716,6.4037406456024275,8.553522787524441,0.3693441640536954,1.511727931323661,5.659744007251204,3.3503451235320303,4.338295511927168,0.4049924856545295,5.672239812845858,7.072019687393176,8.313277795297187,8.130064422819768,6.242117193369287,8.173254431675666,4.149984896767895,4.686021232791704,2.5074822746775394,5.25883908426414,4.737883227859802,4.541623571047557,4.412992820657933,3.778909784033877,9.51973654811749,7.596481060620177,0.9969359938264799,9.224429003882067,9.356119555285805,8.13263587411753,7.400269494209097,7.933029063944746,6.435541440892725,3.6314307066213525,4.126293618800911,8.124212049678452,9.983623159840668,5.145383915572797,4.5246761091583565,0.6824470349549583,9.999979281933182,9.41466548668547,5.517482772673823,5.307621467275332,2.639147652815006,1.5690730560769883,2.267496949414587,8.324854971584337,0.8213772009259879,3.658510246036719,0.7872967667158681,1.5031308734939208,5.783194565704415,0.7770072322102206,9.960985276137455,8.017956388174426,3.4845608890758473,1.8484650887461962,6.468257793002952,1.6849849615844614,2.7724715843252223,7.801420321522558,5.920675647286808,3.347548472311017,5.281919370378587,7.582950359855611,0.9671011394487294,8.89351861546932,0.2981538207553691,6.013375039807684,4.027458717862082,3.6854420322654358,9.450419028545646,5.0734802619994745,4.316547568009628,3.045435608332794,6.429687045626595,6.603967521474323,9.58755014183631,9.627425775587051,5.605866655465272,8.343808488451911,9.662682159256486,6.912292023747312,8.872294317010304,3.1748869635572308,4.324095551959162,6.078049837953889,0.15211710075125007,3.895793398437468,3.778661703764772,3.5710289201412926,9.851612514416333,9.524060030372523,9.02963986797329,8.594404628476088,7.735601758542849,7.616082127288664,4.732882487961858,9.603321302373477,3.7670626788507344,1.6899825513123679,8.911680349221742,9.231150716714989,4.855164346191138,7.839203212021955,9.38212511186006,1.6087758827190513,3.694220849964829,5.113278392678713,4.84235848816877,2.136292411539298,9.273058148220816,2.304076293342936,3.2805595835125922,3.546463180231898,3.7226880398795736,6.923486373366272,0.5127278897384158,6.73825567670586,3.02814095863311,3.2508058591508626,5.879621482025916,1.799011336162477,8.588770458254672,2.1416727108248046,7.075519927460734,3.628627918976055,9.429364305259469,5.7832729292044105,8.797865829425097,8.657312274736055,9.097211730831864,5.605966267997444,6.829674083856732,4.461758211164559,5.225773307534787,8.316385118547414,2.780183748527023,3.8181350591559315,2.3579153116774787,8.664479365952342,1.6489521675971641,9.312749816263292,5.5036398132489195,8.805167552784708,3.438863958110918,1.312479173419705,9.588636193067526,4.324936450271071,4.405801255783455,8.980219187480715,4.307510344619443,4.597255057442757,4.831793900977031,5.775742662884731,5.969262355627249,0.8244738798081652,4.344977101314839,9.280079507229164,7.245162692087237,6.8915189102101415,8.033459794243687,8.089781207542956,3.84014203766051,4.35842322092933,4.180252367009616,9.161529324148873,9.705010866748708,2.5482085341082983,3.4558445189624765,3.2873276002391782,6.000057207512324,3.9099509242245567,8.485993437350828,9.498373450387867,9.489247906647984,9.552236104876826,9.047089939545101,5.922150966557702,5.874446997710436,2.551816717567572,3.1526420239071573,2.28246747051857,6.808144222439334,8.924653879910487,4.12356551355699,2.5029697643456705,5.096978649834445,5.913213137351255,8.85358844349021,0.6802832835019368,6.238838457156235,9.743222796959376,0.5836783725459771,7.156819684474474,8.62116018280133,0.22537144544685583,2.4645120425570455,4.464288484939578,1.8865047050776185,6.827276614050566,5.028072843213341,2.040445446334238,0.5187340098433357,5.331135027863856,5.523140054580498,3.6541655453410016,9.026065072258145,2.9689922433926963,9.637717506719488,1.9743986716837614,9.114642968243432,6.53335125485921,9.378212476132175,3.6554296723790713,6.195299915940606,1.6210466991662797,3.1476621181567843,0.620524508810556,3.549555910912756,7.855858318756697,1.50232280581869,4.835383459602838,1.5391537702785762,2.6060025139878817,5.395083483536127,2.151552154713723,6.1391512831318895,7.135729252082907,8.986519333262326,0.3908892179992174,4.809599822290052,8.601437240200065,9.85314123431343,7.740369137219815,4.8699857140510705,2.9530029183424022,0.7357554231889507,8.2503430655105,8.145584627932292,3.461240937080854,6.829928767238416,8.036700369446573,5.349045518490902,1.2274988314203616,1.5887838255559883,8.8595105161182,7.916352380608789,9.641438376250523,3.423976687119985,5.72583495927339,2.6081628027916937,3.598301238851662,4.223111423421457,8.72784827440219,2.004008772380017,1.2317641129440027,7.825332577988546,7.419482883174419,5.201784171047327,8.747948755996347,7.660915368521064,5.9587161699852125,2.8102730051200475,4.42497315735523,7.630086635384328,7.727645048856145,9.935786055369428,2.853977165878101,6.359310509861935,6.753095470536312,7.56108116508215,7.226454249122871,4.1489762494094995,2.785575996634726,5.453911143645498,4.336608030864673,6.042262588803622,1.2373424676873257,6.1318103449931645,9.190275975886841,5.138596907204289,3.170201626570497,6.4892355570140765,7.912163929549372,9.813279666105617,4.124259321881992,1.4693889837074914,5.791504125273224,5.158383253046781,6.583719039192486,4.563922983773791,3.475648688412276,2.890587428735363,2.2861292590091753,5.979014887155003,8.942093271094794,1.3884110284429974,7.287270239799087,4.66594117833349,6.022192365042905,9.153991070617622,5.708857343532552,4.621487766915127,4.039907430189911,7.718340365431793,7.705870684405833,9.221958305314189,2.410874587278402,0.7305684493494513,4.963143861862836,8.708372897553872,6.4005228939738394,5.453068425600147,7.966912658984294,2.687606299799985,2.68484431524469,5.066727849982802,2.969544054114408,2.5530070778618996,8.938991087282453,9.552896242197184,4.932165925943652,9.228631417672453,9.301341539429021,0.9263258004314112,4.763975027269507,2.081027159064719,0.280586432285983,0.49177739737874315,6.956897944313489,9.767872672187801,5.69468719665577,2.047692354989765,0.3750632251524788,4.38331991281026,5.391388423279939,7.861596337675243,6.575157952902606,6.531657752632549,0.3395887262454944,1.3312065356564529,8.018794327308976,7.788123467107633,3.92385937658448,8.616152124565069,4.271754798790943,2.7697336550967644,7.367724749381008,7.8318142308837,5.5951757327593725,7.701394588290356,5.354574162919645,8.678144787851886,4.366221912841488,3.590015376499691,2.8443437509668223,1.904225154850978,5.888623224469187,3.720684601739719,4.721942981086828,9.914015008208441,0.30114625911869863,6.772467318197178,5.823843447641428,7.93841107429458,2.528639815075373,5.051052509880343,3.8903609855647825,6.5427517370733685,2.5260939289519735,3.7768054998744494,1.4554294427764125,2.2151908347474647,1.836932049314639,5.231682329678304,7.3939466078635085,0.6592713564504171,2.175357458777185,2.4139247703493583,1.4302891594971934,1.3271169166860686,2.976870896961865,0.7627848855173447,3.0771873297207453,4.891658016610084,3.078585323551075,0.2413576036087628,7.254316577461697,8.71157582504682,5.275630355932028,5.498348699873086,4.898980476775295,4.62503341986335,2.9850111416738923,7.835687356219938,1.3720411933365906,8.568453921042796,6.522335103017191,2.0698193971792356,9.674385637828367,1.8288705940034777,0.9581351231930069,5.033773531451899,7.546380487205113,7.004556557140507,4.064565458735836,6.766678851093735,1.5035972571895395,6.633604267155677,0.49129548342258245,7.517400005071302,7.162768057797835,3.624771007475558,9.929033107238501,5.746833759117822,6.550227110829711,4.2908030440482285,2.3981380022695165,3.658817720916836,7.205329450325779,1.4064096304745521,6.3486599130575865,8.500054951149975,4.460457429974056,6.197480471170849,0.59450368602042,7.378978565658385,3.4023646355176207,8.915135722888488,1.9350437944036725,1.780575031124596,7.969314848915898,3.3533705435747296,0.7329288995333427,4.718546992584098,0.837234833095819,9.499111512430341,6.624618305070031,9.306998016817216,1.3568508367135568,5.286422083313593,8.204642031896919,9.210130772282131,8.339738023379027,2.9136471490496985,8.690298218390883,8.503518848479377,2.392731860034689,9.412476592616049,8.244544691825517,7.294603383942196,4.955890525902744,4.445680208582199,2.287821918208517,9.802516708883894,3.078391864694636,0.6073912261095771,7.1112232441087535,1.4328557796699082,4.424279362104427,6.824143740624229,6.2755408709570615,5.351085346041331,4.3542568081939725,7.947385870798309,4.889842261588209,1.9965880345009857,0.12370570189293106,0.690033017501348,1.1095389822367463,6.3819191355880145,8.801285631978965,8.181405737265488,0.7338978058057832,4.856107209269995,1.2922573900297207,0.4580055385087545,0.5342053419008397,7.501535898786338,0.5775269304017883,3.4635138576849944,8.32854219325659,2.770345692783056,3.5074245515365687,6.765316466390785,8.703501990635424,1.2659765610424079,8.890493404137507,6.599607285192746,5.223994159320348,5.118416644600949,8.22602767315509,0.07627303664004659,3.0998629540359635,0.003860911857156424,7.10201457105285,3.428461815625401,9.314209867192055,2.9955211545731086,6.252430859307985,4.399039731544397,7.563134983277888,1.6274424135827559,7.934596674200933,0.6365414997937369,3.0176554839473213,2.7381270099914112,5.150563202567722,4.804735914995925,6.901220204186704,6.0754366010704475,6.1164921466987625,2.8388820855927244,1.0700701556438963,2.7524808827176073,2.162977384521232,9.649050623776832,9.008206933837196,1.0372082857267584,0.25904456205203985,7.595732377434374,3.909947869619459,8.554418110868522,0.9678401527555702,0.15005848750424544,0.13879354796171306,0.4922777863575112,3.0270905534768033,7.908607486242703,7.323708384355092,3.362999178313011,2.9779465758412416,7.071365326065713,3.4190940974640682,7.974620187650501,3.4665221501696952,6.176115819540968,9.787805767314733,8.10582146747003,7.931238596457366,1.2759807997451444,1.5946389500302027,3.8123953387986353,9.541641577204247,4.575485846168428,1.7898435822382242,1.5278784096887255,5.263312142869323,7.514438199095695,7.538137395629716,0.1268064906150035,3.4251047933455125,9.97908595817685,8.2443172360263,2.801522169244166,2.8745064796013664,0.8701026264133049,9.278123243879312,1.226625007028126,6.538357586236144,2.94506685416146,0.04051384587344886,7.484138218531333,4.839640906300657,7.358517426765667,3.5902760170849213,7.3498120588683635,8.245263733656806,6.4198612675759925,2.2408251101099275,9.888777483137517,6.228263260318561,9.050385629355532,0.5601681504937206,3.0007476833687274,5.296335337095357,4.373749065565022,3.92924940164443,7.0328122623136196,9.469582727321654,9.694440883073144,8.153707787356586,5.963268177586311,7.336676750035287,7.399360430881796,4.754989551136015,1.120231673863925,9.62021000636331,3.655185279303994,8.242949695641666,4.3388709002737365,9.90375777427162,9.815688375772728,0.0677673866320383,0.8333896131854468,1.2524646109303617,4.177732717126473,3.3161222409204827,8.344249397770318,0.42472951241390833,3.0890088238713465,5.897316501743375,8.268477002869501,4.924144388744507,6.32458193776862,3.890798504095816,5.151713616659624,2.9615155425491424,9.415658949045898,9.317159250548919,2.9503198272690523,7.319929401206351,9.965311739582514,5.2359183848438136,8.504683870423083,4.10706619829003,0.3701453439794311,0.5609357633413437,5.678103052777326,8.294099187844617,7.8864328723909445,9.740341512496702,9.448201919464408,0.2075781380836217,3.769952571938089,2.42122898806725,5.183374310715427,9.877345483089249,7.833692394960465,8.700551209884953,6.32202497635981,6.239940537003898,1.1314307685807234,7.412390764822985,5.868951210962536,9.034001680798223,1.988092325429498,8.491207989053326,0.2415660404062736,0.17832872962837643,6.156742954211369,2.0299442498558284,1.9061236779408608,3.7189549260587396,3.1468351467310685,4.271766069934615,6.359491427996988,4.861495660509627,5.115227089133505,8.816008959285892,7.982417571591731,6.290387885011739,4.8899485875027455,8.322182476931875,8.13041272768658,6.832979707269686,2.3908351188816535,8.598031694750041,8.064136337612144,1.258337882074354,9.49798346250134,0.0826807099486393,2.5644388779293315,3.2666898429894298,4.488633462599818,1.3942707445646052,3.2571368462692907,7.078621795954982,3.69700398416118,1.0106219209954914,7.784556547932651,2.1730071696436215,2.524486886085202,5.135385094579292,0.632054189052933,8.446170777993355,6.350040811985602,3.051350393611705,8.56640138398632,5.4247901634314815,4.0584631293838,3.9220383856940444,9.293005853209584,6.946990076288591,1.503167717517142,9.26708525214691,8.897529559152627,4.322111163320037,9.912665813889909,4.827986454478479,5.646762362163084,5.767928167935306,1.2461993750593314,2.4586364733923727,6.383340103410005,5.235184340184748,4.070421126530988,5.559453163814238,5.333188661912331,2.521948925734796,5.154693087904631,0.26684969240275747,4.961897191886829,4.2723233252132715,5.907856195323317,6.39789222505279,0.3123630878954198,1.3217178135449448,7.809301210481947,0.2825800529116296,7.56757139089848,4.307102765623105,8.978831121269852,2.1119484790796417,7.879857747345415,8.469841710148485,3.382485898997867,0.44646750952844316,1.1954060917334153,3.5777585857079397,3.8964670712234972,8.643693234083168,6.419694901110182,6.235886269695962,7.156166767079519,2.856863207285536,3.631015395545951,8.063581612644002,0.9740166548189366,3.3502027770605336,8.843287306403687,6.419995024126051,0.4982928463292735,3.73327281593435,2.0436491188423056,3.9651089769452064,1.4983365890208145,8.336212281948326,5.528960689369615,7.521518508123572,2.4961518666982463,7.423779448727794,8.983725449263012,4.819263130587348,8.552422211872022,2.6610263704537407,4.827775927062492,9.390953397611776,0.3578514285335288,7.467860863901434,4.964292591633752,4.481539233626226,4.039453400998898,9.739466288568796,0.3590737613142725,4.276859993464601,3.910225806650882,6.6675105512135495,3.1663474887210286,1.00911709610904,9.202153751538626,1.5128436294280667,2.510929571349687,0.8886277170071688,7.718940822385414,5.194944658154115,9.67707373276032,8.01469342367125,3.9334391025417514,6.101296860723469,6.687290391323355,2.031480289934955,5.840797479777356,0.6663839326053655,3.6623545780048095,1.7746426791112113,9.506326026101455,7.844829841283547,7.283904479895957,3.5789835672241277,7.488532564481682,7.956324848699214,8.863645998223888,3.6647076623926833,4.17807203347254,4.440661892825942,2.0560059917543794,2.228598462660789,2.5177851951775,1.894126390461981,7.235971752887831,7.82271421547323,5.837479126637312,4.908031317155381,8.589344321596206,3.5431176521925867,1.033716404157543,9.087155895912149,9.38390597469468,6.150078290605894,0.22287384841016333,4.126716007672622,3.9977381540570867,7.240553823463294,0.7034647207682321,8.333722118852902,7.918931306738499,5.804660078619452,1.7140489107162504,0.3269300436251199,9.926389393782205,6.439317228917252,6.03804496487141,9.794409095347698,4.040579071554089,3.4006396432475094,8.11733866424243,7.7207065546989595,7.529046056628013,2.421100851578446,2.03906005301171,1.65580712861368,7.375455359789833,1.1061226500454358,6.639282292774789,1.6028059086208901,9.997674761114506,9.940268698180363,7.920381969520916,9.378656750785897,3.2459265747692423,8.555266778569043,3.07364211765194,1.9682689632839834,5.723176593694712,7.402003573875402,1.2808303836287593,5.510209324148949,2.4852354142683586,3.5397506278517765,1.4448159710259767,9.861599644103586,4.754380537263314,4.372655576424769,4.8195879975016105,9.812288947822818,7.419043187525816,0.2951265643963019,2.607709780981715,7.49509844571135,3.670021069305769,1.9182908341964833,4.9558322839623,5.473550189562497,3.5612634627743622,1.8414631753475375,4.769973644179622,2.3575673547125198,9.360799650966667,7.157376308840444,5.33473927900221,0.0922640066542657,4.714624641778822,7.856619423653792,8.80405024874759,6.413028687270506,9.972931068457832,0.48672894684785417,4.894369314944105,2.5113475139442154,4.856903548282608,7.831057790808565,6.088823425251631,4.662057571292262,5.300086679503433,8.623004727375799,7.945758537973598,6.083408753285169,0.8659436632245598,8.196503158806179,9.585509553668622,7.045541130859725,1.968367507938007,8.04551598564,9.976659874916084,5.437923851963569,3.916019621092459,7.219553754931232,0.48838764892572994,0.7671483539561574,0.20697394734504826,9.093365416215455,5.8043890438984835,5.6264324864552595,9.151623547872694,7.31087895948966,6.180848646773245,4.813694106950659,0.15198182621096068,0.30260565302749676,5.033897261919263,0.5108801741622648,5.101192303897721,3.9832451685700954,8.708835665151915,8.107485248157323,4.81541073910037,8.354966877729382,2.3315644755392384,9.24758589774865,8.087905948063238,2.59127859343123,9.644410305710174,7.906049682916656,1.7802833524908745,8.919356666501926,2.8318934835301257,7.551091034267509,3.287780543612615,9.577333113745368,4.832706228734001,1.9912343442111835,1.72837390511837,9.637135128416723,5.051615396491876,7.027291695629756,0.6265966797512568,9.448805692267868,3.4383820628498074,9.621119825337514,8.27742861802452,5.428046745903796,6.233166987858394,3.3671598064100383,9.876219243435543,6.752634036727971,4.812866396744424,8.161350999563222,0.059491666952282696,9.626667582407284,8.510183266975325,4.79352959932071,9.65783539674818,4.682217465420826,6.502588686480355,4.575946870277114,3.297856900274876,6.723179010028519,2.1752313668941348,6.121866745298535,6.355690376424386,5.849077334488588,1.7600404612033027,4.9031084509541305,9.816604971827097,7.982091117638297,0.8372513655563862,7.307345028730743,4.227351032523805,3.7795147532222795,6.805268983595736,3.0483050363477893,8.750016052257232,9.611422155222522,7.01853881002876,4.449825211631293,1.5974884541118772,7.26388141310188,2.8568554309510397,4.991093700423706,2.0370967054335054,3.6590967685537645,0.029736364277348493,3.5432060680418997,8.334472630589465,0.6214237219331809,4.936155037124679,2.3964568255192042,4.111163773942494,9.201569024046956,5.657108809934557,9.690807301317498]}
},{}],54:[function(require,module,exports){
module.exports={"expected":[16.386136227014635,13.65030836228016,702.6283778118197,14.009731708328504,41.093407893345415,16.120589446007845,17.31030548162456,13.582992986713773,11.434389805977187,41.70331082208774,19.493608560433337,14.825129201214116,17.538903078352046,16.096823250770242,14.570356098737143,20.351220302984487,16.101481879942096,15.669097811976217,16.08658169482363,15.588978747582381,10.990237615544398,13.425885161229743,135.75161738246362,17.309540354222708,10.311535666161452,140.8702081290763,15.678587784125469,17.837026781532252,11.014735712237536,15.957701078173226,18.975765225985317,10.24089151039422,10.833298896882326,17.016702232518245,14.417701606017935,14.145844551318818,15.676690555906383,22.097917608906013,18.35128295362759,120.39581689727083,18.80071693762251,13.9380737214786,24.57408065269512,27.01896500575088,8357.137311928625,26.211481922265435,6.72060020080568e7,16.803417230184262,40.46932523768319,16.156020344721707,22.275743258062704,20.004732420923588,15.114463660003686,15.817497895660916,16.891505799423655,20.314070237299006,19.674092557041128,15.083505881877079,18.274078036936867,21.31690926678445,20.874243385033417,379.90358568049186,14.771649980198715,47.707053743729624,21.912462599395553,17.31292622018218,19.358608873509795,10.970709266826375,10.905534141052797,14.573439319610408,14.553236945763622,19.855921074323568,25.194743881918402,20.75427432443196,11.92437393577329,15.089324588621993,16.426888902692976,24.192268021295334,11.65747315345183,10.315460452862755,12.819691256361345,13.367604788182728,14.94389088002738,17.181707352583647,21.47123050366109,19.90503746641899,22.62285280260281,30.215760812111526,16.48277979486692,15.794292222187032,16.466618267823602,12.183262479457255,18.97651526215545,18.231113490379833,13.087776110227553,11.795844161414733,17.015576941077555,16.954425011611654,12.086811047198426,14.88320457648218,13.277288395441003,15.168979552511756,15.088384541580375,18.695721596961068,255.50069612221864,13.169726350427363,20.410686966137302,14.581004154778018,19.623972705310738,21.86049796621918,98.87596907851643,18.03215770379463,12.28348512355061,16.494694433845538,18.132492541560996,16.93864140282595,17.266552450019855,16.245518411936654,14.780837794052395,21.947376333624323,107.94679273685433,21.511701936998307,18.292621905902735,12.20269364626677,20.63344003074703,15.31970062113901,15.18395431546805,14.518861893208632,18.838471238118036,18.683823362897456,15.363894073484277,18.495306013204708,20.08723934277639,15.781440956457802,20.101557806430332,57.991377576185585,13.43215002539649,972.963934011482,22.457310046855223,14.196475859188569,18.13058600086278,42.42846880766572,14.581031060179262,33.146025473887164,14.892652025371275,15.755575986183754,26.981644873065232,12.563786984843313,19.43362445119462,5.004068818805712e7,16.239351044311537,19.742311695855104,21.52780767142171,18.315360956637434,12.972234446752212,18.560988906654813,13.834837448130266,18.08811878489021,22.29900149449028,22.45630341249272,20.2931556346211,37.82987542490093,15.742041007192586,16.321045822609847,18.314611899353622,15.726356443575765,24.78570384456047,15.190636659318667,13.68841971401904,27.071322975197294,27.461362320292668,28.244366644998994,13.671981566983805,18.299992269281848,15.802341464565217,19.8948385707635,13.621221916724371,13.40375441334156,12.548333153280383,53.5906159565876,26.027253407895287,16.19947069191663,27481.97240777898,279.78565178306513,13.665484237379506,28.51405956134148,14.137523860524265,16.35238172711711,19.05859573142361,14.706247937791849,21.12741466725794,19.6404489893835,20.335480400336643,20.660371100895805,22.377259961486008,16.32001434927579,17.337350204713275,20.13474457846312,14.9332949131705,7.134348886976099e7,22.956099146839254,15.397981597181165,19.01746913753658,13.70463728312553,30.89448449917039,14.640431429763364,12.840863333839634,19.36029897658631,18.712304233123835,7552.955253538663,23.907084754231523,16.614001532976875,16.16772440299548,11.041245987400966,17.421145047880902,12.620028914804923,18.787822395760042,18.632769012011238,11.022496790296874,12.487715313253126,12.566010367402587,31.16743225537891,11.213626070376826,26.523638268038134,29.20177076325791,1814.701516026334,21.05112211058948,11.168763430739734,15.627812435441454,10.061343015312548,12.184650358296418,11.862653707898039,11.88750742377046,19.64864314924059,15.710256564901185,11.402468976858904,36.26178998837404,17.793561379597477,16.100790436133963,331.5794327828499,21.38801279321512,16.730716167690634,22.143735881168713,17.85024067760999,17.419161282383897,23.617775188264265,18.905048601543744,41.48933199910464,21.987912784120912,19.66220105941049,44.238372295264625,10.909423085036655,7000.800098222557,3.4179177758022306e14,15.331193606288407,16.942382926608225,11.094405163737683,14.068770845190462,15.509405894901201,29.917037668124365,125.38263509637588,20.452015155938028,18.53561797321672,27.7286691992177,20.370364338347446,11.296957349499046,15.148844570304087,18.268938263428186,31.869909275602243,15.178889409138952,20.074107633355446,10.829744205370568,15.898800709750727,19.17372769214979,29.521434559614494,51.855584853795115,17.647624398596882,18.707178670431773,15.244166311329952,14.17242739836326,17.315570139055605,22.152406855064246,13.816116114665139,18.303570410365587,20.20256124955069,27.796740906956533,12.762253281890901,18.229414608435267,21.583634220576503,19.928760139192917,16.27650847553926,15.720227357336292,101.83851703322459,14.43913153134384,23.372558554442435,13.684961791052512,19.57159074596349,11.159977955008408,52.823172092837,20.287003568695443,14.505762014869537,16.46342892343172,40.57588976740891,13.704192847924466,29.75237654103952,21.39283053155964,19.754236565990173,11.499570333139207,11.388078085227948,14.379055211370124,23.300147968267254,39.94564675057603,14.862299340768956,103.43619546577908,23.651050139163125,35.00336873162474,19.100342200764633,14.029537353578949,38.56770463726526,41.38342212903048,20.878277485603213,29.746026134607526,19.490783165911296,18.987555734880377,16.446769573768414,11.770056997510293,25.974779520957938,19.10541741471266,11.966699593054223,16.025843647313305,18.232724349889903,12.930719097556782,27.583480492265018,16.90463283244566,21.018920362708997,15.526636808679863,19.202336657037396,13.44619283323009,22.135277702484366,15.619912093532543,12.595414979962918,11.255500708103458,17.57930103865609,30.177477757646532,17.67605427040703,13.270912050745647,25.339938330522394,17.360762582271533,10.32496015903979,18.23531597531393,20.568899635884122,22.66541024117283,19.80842994566367,23.262526632057007,19.867890218578168,13.44850944367066,38.69164217183726,19.89859208419951,22.32935293972371,46.245076281916134,19.82739577118191,18.355896588304923,15.75706019904787,19.743381263702553,19.79545643370388,15.087010537168839,16.34052728608723,17.315973867173447,26.81752972897861,19.532440567172987,31.062469365411694,15.20658233112663,28.75149147484489,39.37526337927549,21.401027288923004,16.708863406242045,30.633174810993083,17.747312604105606,10717.142996497618,4586.246845263175,12.455841658638168,108.46800021213488,13.869773614396742,18.246289943183,12.737893530050114,19.091130831786064,20.713737414505495,15.654969331812783,25.8487958438007,20.238362233714874,16.71803202793587,21.510227550916134,15.109320351867632,13.749301435369473,16.151545875720288,39.26388264733923,42.772241070590695,45.47804259070706,23.56957883906881,12.16284974183931,20.43391533064837,20.18771284371044,14.615018088723323,10.955071165659035,15.47237976356249,12.645349021453924,18.110956554817967,19.246895649243708,17.72993199914774,30.972525949414898,18.556708476089597,3766.805187827563,19.82219406754412,59.353011491334826,25.827528166251245,16.83383620903044,62.27712101728608,43.346892775372204,19.86340537872685,21.864197173837514,19.680944854919105,52.48709877016148,17.810468096979875,11.492364076425238,18.06802566081495,16.972024850126438,17.93579422940536,22.2228088639174,15.438980172609696,21.101659158886154,13.135601739243622,18.1929087906684,20.749468175993393,19.458722685063975,19.517312246313953,23.127260670235028,12.932540344302033,21.68444343200782,215.1468332775098,17.710470060306346,46.417888789160926,72.60026906309898,49.071446498701754,17280.609069944596,16.698383456783137,10.356359688900017,55.43097758020983,24.18705926819368,16.0801721886077,19.676602682419123,27.582075623113273,33.42071489551678,13.273451210000783,12.821566572895213,14.724249820526584,15.360797049576878,16.616359146757,14.393939371752767,19.27028045617449,15.674481873587476,13.245645680987723,12.354825149279105,40.12710770080825,21.381096663529082,29.912341716880594,14.923285117728906,16.74480700332048,12.146154338715233,17.412518450959166,19.707592204986145,14.856097939738897,16.057226097680886,18.40186519354116,19.04355795860394,20.216069092121373,16.83608642418909,13.48862086227805,15.485409860228005,12.692154696064883,16.440481797525756,14.783488273722188,12.411899021151124,15.180313605627536,14.359560432183327,21.986153378884016,19.59236031482165,49.91689513101649,42.81511899350434,20.04658315191228,198418.40493101304,20.65686375119218,16.640904155753628,19.036604420940975,18.736857712965296,81.24042580634793,14.001539027150638,4807.44695863434,12.563630538824102,18.565838652297316,14.680712837872441,28.562504952848712,16.904092957456196,19.57343200089425,20.41960543927696,12.261380910446329,18.098976082166583,12.714130068004097,16.81461888395438,18.835754591685845,26.20029382189543,18.728657276472696,18.378132486610607,23.337228915812194,2.478930634994342e7,4.2765986121024325e14,80.4249704280644,14.435332565548174,32.469982300112804,16.439656071319835,14.090272669148115,38.554553668290986,12.656591308899285,19.272840122355447,13.471373177866383,749.3288999262633,346.99695255960717,20.523357850196586,13.847042420696665,31.16249009482276,19.639964388530835,11.605661316907023,13.650085742627986,16.70872380920812,18.008952005903655,21.223251314258338,16.00585255827164,12.484502260464271,7.61114405059059e6,19.872046717556632,14.981589816906489,20.982601872258908,16.035114830758552,16.27460071356335,10.982771777643979,17.87099949527703,80.85886295111209,12.705946015565539,11.931786632379866,17.4906633624377,17.17794822091936,18.347063144052644,18.818312771142587,22.76105197311014,20.409808959418793,17.662243882250618,36.840008373207404,20.209572503283233,14.422766846693527,18.13074722361976,17.33749138189375,15.526434223946085,12.091994455342956,19.51464545775723,11.376291398878598,93.73402163408029,16.826373847832574,15.51116858022173,14.640701593875185,17.331700637571593,14.350913185191686,12.710581252575155,24.64313759790601,11.436632015383173,15.086259958212041,11.317367278372767,15.08836864749672,10.75432666627766,17.146420291490013,17.66956707981207,13.068555225212467,3122.4827584515215,17.792190317841623,11.198649945098156,13.000883024669069,18.022230075823412,19.17283098052684,17.234783969387482,15.909282066676402,15.233819780464556,22.030665013143505,15.691434124799244,12.604388184833462,319.2482555775377,16.0399200655942,14.692746136753518,23.742663738376653,19.709841320538462,14.446314227824887,16.992395369234128,17.849347033729345,651424.8908426217,11.989121146633225,13.922070608060528,18.729898874775067,19.206007281112086,17.85838670525549,20.634364501197894,21.52888970545189,14.878879684822909,13.967657675405333,450.3711107643707,21.035786692331275,19.990650499755453,21.438727507406988,13.940583038318698,18.793664132808527,19.855832388774186,34.259731720223535,26.435242570124135,13.366524947657094,28.201310577437926,12.06417497310067,11.00611405785365,26.227828029073937,24.601642137988566,24.81669216349037,17.04123751316315,19.988335358359805,17.573191800164384,27.435350455615847,11.866423876890916,20.643346025898236,19.500115890190585,13.578285461992467,15.952002830356726,15.45809747280271,19.38160368808597,19.525939502086445,27.481913265105458,27.840617441226165,22.76420964657619,17.29128429044881,13.115844139508186,19.40232565369802,13.038308237588504,16.192157002945745,23.184670309555113,11.172074157707872,25.151968892889716,18.483768843330445,17.6796357129871,13.961277340467973,11.376393115997308,13.970565539411902,13.396509615267112,17.381974573975377,26.66673311859588,28.717592244916922,33.2204572373967,14.152898410664562,19.574282965383023,27.772929623096307,34.04762256570288,14.784743227581869,20.048181973062533,37.783841782079556,20.08944596570223,16.019189473083877,23.247954032509064,12.922277706823383,801.7318638558261,76.10472548936042,16.883892524225047,12.353039955180074,19.000323310037647,24.905742209196546,77.55630505327235,26.786432473016564,21.772610405305002,20.15153113344799,18.68605433538528,2.9169143492049617e6,12.562777725099838,20.471717513871692,12.83757954303275,20.122136262983254,17.424384955858184,13.723211729745467,19.432699608138535,18.09239874665733,22.2913414256474,14.523624889849943,21.084304291783525,22.162835520759607,16.1779930637785,16.023334101809393,16.792319524102723,10.65500462988358,32.292768266540904,17.77120994514124,23.547378993074343,23.31946202025101,18.848057317347383,205.8450801621084,11.575886713834258,39.104302827279525,19.01530609851886,17.460904706518022,19.30446421412265,10.89981215107508,10.46073634749819,33.0660608227617,13.511504119488299,21.207964669651467,21.135352327679588,15.336721114974933,13.594622802018943,21.919120782239812,16.70156026374247,15.834642862053519,12.006343000834839,16.358172028437973,22.33252249878385,12.005486547966843,17.065536936491583,43.20945380279148,11.577151906194265,12.618255172718893,23.384188854835244,66138.97283311734,21.43407744410137,11.520646098336725,13.109082155127115,15.655347278056135,16.853798709171162,15.737800026603544,11.452645433425984,11.788582933381548,12.206604541712883,18.011797701483292,13.346144551606914,20.512171618493394,15.882391407596787,24.59981560289972,32.90013704387676,22.86275133952951,16.12521670823483,47.27627376536128,13.291936754420169,13.191512903715033,17.95328395221735,94.73777020161859,18.57725698094781,529.2809594231626,20.575836958009987,19.222186199378964,16.508944061015338,18.84348305585097,54.491384593156056,16.536870406335453,68.24691673335579,21.081857744744532,16.859827780858126,12.475533337743306,25.876355677457134,30.782091288670618,17.130772085046946,19.631680087538562,23.05655081793257,3633.7169629692626,19.82317443629169,15.364114191823603,15.481655304701954,14.144018877102253,18.831142918437667,16.10712946426706,19.631833215999848,29.197829581297093,17.576731765602204,19.556561642924603,14.332619965384714,156.0107283331578,10.886398654867703,21.081685653149847,11.988920896299327,4.1809785984778875e6,11.407850460105761,27.812011630295917,15.486497430959606,17.06868733400688,10.383652836297841,20.597712071920895,52.359750692460054,23.035627683900138,42.5970049263682,603.0677555588663,14.981681291032288,15.968735122433843,27.54428748844976,16.641397328605226,21.85506586839267,15.399995512552401,18.726876968201577,34.70555491454661,16.631585932833357,378.72429532010364,12.990089564455285,13.101217550715706,13.526935301642093,21.59203733749136,21.20515820673373,20.407365272886377,120.51412059523854,18.49208916385974,21.305493269102,24.487419657683848,25.585504375536793,15.782577039851702,16.601129484028544,15.593784224672401,49.304594060513885,16.81296496193543,40.175693702212556,16.23772312781272,14.23805147639025,28.471640159474095,12.89142693039481,26.072823622856276,21.590960826715282,37.39667501177914,906.1807541382884,13.949139381651086,12.814531273103519,21.354615243273116,13.716878510441378,15.16144710236124,15.499584431024699,15.796175596533978,15.904933359793088,12.604501499866522,20.065057025198588,31.693505003469923,23.252411584331803,19.52213685260621,37.94012155034918,16.795140370820857,15.665151391340261,18.4944541777589,24.125188429288563,20.552934183912242,11.228117387708835,12.722474771318716,16.1528341169808,11.909376556240682,24.25125983324453,14.392706459126368,12.569576161287927,14.369765379623686,15.934531711401219,15.030788607643313,20.653768641148705,13.415714448901904,7.806111573061404e10,16.05068217892453,24.305422625527083,25.918615526277982,12.898226032217348,20.197511608904637,26.143475236073822,29.112472124317843,17.717482653154836,15.629439880141314,32.48548101387283,18.735852029906418,14.042847308254817,16.5071449070924,15.27475939550975,22.59223780188691,21.141115894353298,68.29157378341024,12.49610157998663,22.017484979706413,17.489186084271573,17.97380248149988,18.537451549631847,18.054795717699395,24.66921867380447,10.73589986711544,11.400841859892102,15.830510953834018,15.805369459505465,13.434974299089218,22.432023810516473,18.93419123215899,14.99113832100784,20.96381946906024,14.24947270054795,17.12423882970001,17.241602977831334,11.715743369932953,5.047638583476404e7,20.27376655070911,16.082132491181206,28.204798981503913,21.73854558752706,19.28484427670729,13.966808188836064,19.484468392572225,11.457427235337107,47.61013916863687,17.123461381289303,12.904072253796368,15.493203909216195,13.54984673902064,23.293973006465745,17.968637124544234,85.77360053017549,19.120653546660073,17.912356236443873,22.906048453861633,50.60657693540246,27.73147787515299,29.72955139377122,18.589340435937036,17.99325226387577,22.565838804241377,22.119850284200087,14.146730389275664,18.96081485697288,20.853211112358284,25.03704248667672,38.770979106265315,17.232998802801525,20.688048760015647,12.894023477682131,15.204834562012422,11.00643312096653,17.85463696157655,11.1835104190289,12.113877678960359,24.143959128885836,18.602415967181297,18208.188778468357,64.98422088114606,19.04902066716425,17.134429277634318,15.74675627312745,20.43634007987423,18.007203066619713,45.64903138552838,51.64784785180328,25.13813985016636,18.33232037430516,12.751131069434624,27.123788917524298,17.767698413582877,19.589146028137797,21.811002647146683,29.837233598273475,23.756132471967152,18.3426478063558,32.65071923396305,18.485438808836033,18.221469936596087,17.395712586103624,15.35158003094162,24.41296476106524,17.347298487205542,21.55457596517995,17.67901231512238,23.046749743050206,17.05065401351736,17.07977066481051,18.458123846786894,54.32635408072575,22.076937163640423,17.928362764818097,15.748402421215449,13.053437077658483,13.2554184327056,23.838272101866743,722.3954656810208,18.532628402566885,13.779323841661512,121.52968781102446,19.422378271645726,55125.35762151714,16.153220967815734,17.447921468814112,20.71431207568679,14.33352571278594,21.550387986794288,12.843068521790045,20.2058494529445,18.885090521143972,10.339206677428908,50.96310168906881,24.037047514483145,7286.272175116704,17.880018138185036],"alpha":[4.581057245432056,9.9915952945193,0.37169992283961006,7.969198182924224,1.632023177196662,0.46068919018266374,7.904892896323115,9.025287346857729,7.591278953583678,2.0178066526435456,2.88448264343657,7.713965883135076,8.235580523034647,8.52290091266015,0.6319316892375682,4.181827597100716,3.6046967862886636,8.25163755611432,4.710445354354764,8.637480068381285,9.586714006961374,7.482491318789863,1.002727318025154,7.412711546797466,4.229089338438081,0.12389745069446567,6.807757147328067,6.471296450908948,6.417135482110352,9.8939061717164,9.919880342478404,9.003375511855943,3.457355296756348,0.8856610936521836,1.8451560559733737,4.178717294971063,7.148956715050234,1.464630840205805,9.54843142823897,3.0842084128952907,8.189497130759245,5.645147926982914,8.062685156045042,4.563415663008494,0.21597369494242846,2.5315316767242924,0.28632641319259466,7.334615205270594,0.12488234035358925,7.882430356134398,9.953324764612887,6.340086030754524,5.982904713150261,3.5469097998892773,4.996493285030976,2.3077363367090076,2.617478631155905,9.799937421210299,8.826844182175218,7.962511404391108,7.795131802941404,0.42962172388435027,8.982013288284818,1.7248807295584623,5.7705116837379595,4.507972077886269,7.371194496331421,3.822616506504568,9.362134493315125,2.82142023252554,5.100816815400371,3.4594038862328813,2.8902484493586145,6.221091412031745,9.022714155287407,9.21012662961321,7.782463430378916,4.526326489712542,6.353363061559991,7.22751478599494,4.643775620616017,8.119824430544956,6.214873639644938,3.2075058033938353,1.2284852579858896,5.407804585392741,5.269259009898686,8.425834556113085,4.206922489073688,4.826261366780528,6.2811176829555855,5.662399677819147,9.0725253659779,5.479800101683596,7.366142640187476,7.115530313402791,9.521766568476624,4.71181964202575,8.232947241087832,9.495448455761341,1.9754222806434862,7.983767129866537,8.507437598421312,3.8669642221463185,1.4251601536783354,9.710971798758866,7.925692702529545,3.6337100255610366,9.193198396693646,2.4907692730627606,0.5071440906136337,8.12584868357235,6.609822976154145,2.980416138976252,6.032884191915732,9.357608276624163,2.4254451916935427,7.3385816276361915,4.12396794299209,4.026198501338136,0.24089526842265396,5.468112909061538,2.474835732587255,4.052736116896121,5.557171198708519,7.415407788296555,9.725617147755944,1.4381247940089725,1.5644973533106632,7.556647390822215,9.576848301814344,9.913344682551541,5.213538995258215,5.015439092948329,6.413850368182208,0.3916454013982795,9.832737972626372,0.2080561235410716,4.08965914742375,8.792198888382874,6.018712679158571,0.754436758902135,2.30522455293249,2.8921508274311147,9.554478480577552,5.262649392651115,5.143394148906748,7.189037024304401,9.96673998680961,0.14078220279210907,4.780098349615121,5.823030931873929,2.5902971724175883,6.8412018559811845,7.507401964727187,3.5092368459205536,4.546299499950026,8.980372554389376,2.6685032058489355,7.848024742311828,7.481913116940735,3.957967338200341,3.544018800186406,7.246236925768166,3.780529153383423,0.49945231791115985,1.4269850967345987,5.730295365726117,4.634856881133553,3.4287598535833674,2.425223749929424,6.294311406447369,6.810917963046766,6.917378226161885,2.915956737190899,2.3128740223557998,4.855647696932803,3.5473469992554696,5.219791914741947,0.0376615678490122,1.9392162426658355,7.901367769941119,0.06890460312527269,0.2281215843843909,6.7717451221349005,6.8183042880562255,3.6105526613832772,6.4045623595477945,0.9907467710681028,1.386219010785248,3.390947685933914,0.3816944460078009,5.306115372389191,7.49662074197296,1.1164321553468048,3.490786665731702,9.62215612397566,4.96287439759036,7.856376421909774,0.19179904335176579,9.419759147844001,9.514948322248678,1.798479004920921,9.432165820824922,0.12180125984185608,7.212494569974113,5.948594680869044,6.903456791341918,5.2157896623253475,0.1348938890292084,9.211903515872685,8.67419522357762,4.1435845884991025,5.019346973899934,4.436423452613614,1.3494694753600722,9.246312679151815,7.757891558055611,7.608883069922752,7.865273978334601,7.9941636170995745,2.488191257288921,3.2752231249785413,6.026158004906157,1.4567083514653256,0.3372760198161706,6.747636773265482,3.937375230528366,9.610920624616035,3.9005129136485084,9.405387862752963,0.7074834891691673,9.236985579434622,1.0602874029241782,5.79053984563223,9.833689226176563,2.8320788563729926,8.5681660587529,4.920305793784618,0.34325628815072173,7.043129511917696,4.123757375339858,2.6625879904639094,9.7804934386271,9.72246938804279,0.7296910644733434,0.729882756810154,1.4110280188730684,8.889310355196764,9.804880071306847,0.7827627549093852,3.820575443247902,0.2273854352527782,0.06506316987397787,6.962219849715572,8.724399371487499,9.67328978212199,9.874885291375897,8.57456839114396,1.7539563552913928,0.21663209360129,2.1745381455203883,4.843492235346167,1.3300745278276316,8.343655444109103,6.622521017599907,9.280768762850789,8.090767116349358,2.078139199305753,6.890446849761556,4.189830222886917,4.439437802804031,8.372880967130117,6.300110595520126,2.4427810753150214,1.5250567538193782,1.6384180530829484,2.345204382316801,3.553915337105118,8.40062058259711,8.727988684571372,4.31216721405362,7.6935570806709475,7.558892568494704,6.783733579757019,4.2067223813955135,1.7490119065715404,7.244978818368204,9.692102134456086,5.693277307297723,4.115713537250214,6.6232666467591494,0.624521829631306,9.99526919728229,2.6566659680407145,6.673824860936344,9.21095257625803,5.3615075641074945,4.6450569229369165,8.322266593815684,4.347453185768351,8.846914275455457,0.5247664754991432,7.200791752862941,3.523570967155729,6.502038328814754,7.48976427176935,7.434214207041441,8.226994272930622,9.721042808259309,3.24592089210044,2.235186314273765,1.3101493492426286,1.2982593492482764,4.096444968621933,8.073129379503541,9.245504471803912,7.739759955590568,3.1857025468416778,0.9749796558654245,1.7760734703729009,6.108152763631209,8.347682832961222,7.724248707908177,5.064137008509631,8.260386843785497,2.6538424692247276,7.960690294260595,7.052979028509294,8.111339479204299,1.650339786678332,7.277456721318634,2.2076566103613926,8.685795955945267,5.35507180979468,3.354139859865335,1.4108500694430548,1.586215523647514,9.776156859947736,1.38770054428073,7.708732747435314,4.808947944723425,6.989078199414394,3.9552946571227054,6.696931277901572,5.597289188607714,4.874533532378324,4.709915174625445,5.718720937469648,4.221288572736976,7.159759918525712,3.0616228195495987,8.582918659814638,3.108568418763822,8.759129989082092,2.512362158674075,1.2782790046015902,6.442957851913449,7.047383352863214,6.658991387774131,9.869645760429913,7.157707849259509,6.476954345945258,2.714344822031527,5.180386984343777,6.878683362806792,9.294231206836338,5.538410177583435,5.461106063483401,5.442429186260414,0.9505268565922687,9.127826241747737,2.2996175640362315,2.588252589399762,6.7842816178521925,6.636679806316403,0.6728983799506127,8.226417697596709,0.18794929330455457,0.29627570804821257,2.5852362619705938,0.25914486441969586,8.47509682380802,2.6668933738646317,8.406132368922044,5.57106922093692,7.5574501287270675,9.415456521364325,2.7093354137461523,5.65840064342294,7.140109008374078,3.2481998487451635,5.419174330961498,6.964261157499414,1.7071708039257882,0.9181296909286174,1.6514220590296214,2.381099925159378,5.992257838140322,2.1231084187192906,5.371487518517258,3.3123457931158917,4.853800317115589,4.928842571126788,4.498666447604234,7.574820181097488,5.396980405012679,2.734371578675485,5.089842340307882,5.888515950893121,8.177511349556477,0.15355598170108564,7.854638057733256,4.497830304436592,3.4451459201334766,4.649813753460488,1.5316665906645222,0.5945980760540825,3.7906716083854897,1.2970935478124224,9.89071521730136,0.7139568480797798,9.345135244834388,6.239242243888774,3.205189712196843,6.246913271538588,9.677806346163326,5.864636836749188,7.2351242253816554,8.263057407932521,4.475241271433921,5.729857932595741,5.993363980770359,3.103328398278491,6.460926658026336,5.177408143978168,5.660917178743448,7.689613272665381,1.1293669183293376,2.660906535741414,1.7871540470703207,1.057626126779736,3.241853618623376,0.07602673370443513,5.910925148075073,7.6377209432825826,0.6998869050302736,2.0300797229130874,3.7942880961428216,9.051263843729318,1.1354527426588423,3.7832518762262124,1.7504202192387686,5.015388835948842,5.137071360269687,9.460948461943914,3.36099822355326,3.8335684015060467,9.780078953932488,7.402636488589048,8.412210257083636,6.732311155190109,1.934039104900338,5.555967433243136,5.1042758498771,4.988427154432444,4.870680069070826,2.671345303427979,9.480783445743295,9.768457216035033,1.6840877602459003,5.175201104810416,4.325422843999986,0.36815406905946313,7.624328219831799,6.519173840046104,1.1217970224377671,8.250686606419041,4.915298940693695,4.2610683282589745,6.821941521842652,2.9637620248625907,6.267312351927221,8.771496360155398,1.9204236353750637,8.314130788933197,0.9296646475377579,1.6490555895947412,7.289071189033722,0.09436076915630309,5.475817534842838,5.004524247769002,4.694709349637105,9.558240622926366,1.255849405111975,7.676810848080093,0.15779713361955938,4.569686443340553,0.8305533316259894,5.535916496100133,2.0886454977907243,2.7593822334334583,4.040298093214101,4.576180183542673,7.733153094223462,3.455412648930425,0.8012504839779999,1.6621931087959063,8.153417546223423,2.078482523880254,4.911695187623925,5.66486844301735,4.841552162252034,0.1794027026521383,0.17752487298719588,0.7112412553643455,6.163759077849226,5.2981380770062225,7.325801327053814,8.951313147735025,0.5932974741067465,5.765962375448057,1.1639069869865426,1.7011083431952123,0.29838619864171134,2.3951699011938077,8.39324061328208,5.214317046354353,4.276663624804775,2.7459307268997923,6.744031497947988,2.014882989144453,4.917145539183734,5.053850939592788,4.326894938014448,6.58221979828425,2.0234565660201453,0.13757308584401384,8.1025917132666,3.7831358985179953,7.2668890210251575,5.90446005011686,6.489289430937539,6.793840421990152,7.529649093363964,0.9403015632374401,8.78886669182137,2.446175784267093,5.625361913527726,6.742996462107049,6.220673603526599,6.55791958908398,0.8357908286796323,9.849118193886458,8.910303509969825,2.493541731101623,2.632668974264003,7.825796701101373,6.073120007918742,9.514610622479335,3.287865470106466,5.3347205769456085,6.017177228609373,8.080305140911626,0.714083564208392,8.154999943074753,9.043369271420822,7.269939205105347,6.909414413244026,9.654357943978189,4.366256418735233,1.1421241183575392,8.465816518290751,9.816875630132092,8.525913316838913,5.746129560527288,6.983449626126312,9.033997889352385,8.860180520848091,9.266925223120857,0.39231022977750385,4.026698875995605,6.74310752482474,7.9148396860739245,9.31713532901707,3.010618186628906,8.999668824347317,1.7993936602435845,7.25874927015804,4.564067651761661,5.874038772784546,4.630483909763095,1.7872970244182484,7.0447650586061865,9.990868504797925,3.719585091547095,1.2844241993397398,5.936231694647982,1.3768038012960182,1.5969820846741967,0.026764126254432696,2.5397052297579314,2.2838300765578534,0.3137147268857787,3.9315723695475846,4.0381011570567065,3.524009197162259,1.663077767864023,7.535539343972799,8.935538151853088,0.7673506313227452,6.80241088229216,5.90048907443199,9.579800139784325,7.477306958666114,2.6723788236192014,4.840533480512887,1.6858719270532108,0.9584381677693377,3.197619173032795,1.0007272117889388,5.215422802944357,4.934352278517933,2.435539514702607,9.06003410569053,4.823210216826162,3.760477011679433,6.124850015891181,2.739331560492697,3.236232682044009,5.961301459920181,2.0025076869393543,8.931661726539549,5.191919412794414,9.829224206454597,8.368755049219544,9.5604258452985,3.960776614865271,2.229166727451619,3.1872887661038996,6.818006516825372,5.6121086749119815,5.020933365832539,5.692905719607772,8.478548620908864,7.870339748436319,7.974146510389783,5.334611538416196,5.2477137117120805,7.2086540447981555,3.056780416133378,7.951707973065682,9.836937999488791,7.042474943578203,7.678910057358124,4.2458835029244675,2.576374321570205,4.865365567692073,3.1300385867694125,4.801699027317287,5.817978028920496,0.7015900635124539,5.132034531295582,4.3962677808016215,8.592049965972336,4.5073380518170225,8.529831947068683,8.262623843038696,1.4055175546278242,5.801762314893124,0.2547923144000652,0.7897898479039678,9.884209615109867,9.447985307636095,0.4686103329572777,1.7066448235370157,1.2721299263798347,0.4250026453074174,4.667158454164073,6.477081546929324,6.95462344564985,0.3497282265563184,5.082364050719203,8.94813822025219,5.072763462532059,4.790572939317819,4.467653844733204,9.032130993199566,9.308428267328656,4.568149096936464,6.8328621215271035,1.52825101557728,8.627114188632747,0.37986249353380463,2.8218628449783467,7.7286440648825705,5.361635520966546,9.467074822593965,2.010418925886681,5.699044598305076,7.63682774006962,3.0467448835372557,8.238953994419768,0.8529550835870792,2.9685455535155247,1.0790314604663975,7.226639931226533,0.8668691198220446,4.451589985128342,9.80311553763592,6.726023024085204,3.760713031846832,5.294098908584641,5.038737372951747,4.1357084856763855,8.595488162387863,8.226197987739951,8.871263623590655,4.099703629429499,9.576030358298052,9.810108933141017,7.432250852270121,7.02108095514089,6.802705010262082,8.358925806018805,3.4553254970836544,5.987829322518534,9.113769706714264,5.067346226917917,0.010278115193338433,9.472298891595084,7.662887919177086,8.673706133281186,6.320756288319465,3.8945129352122043,4.233125758703446,5.889314011578706,8.729986315665293,6.586524951554644,8.948224363115159,6.214968467961182,0.6961073828833286,9.789060986666755,5.216185426678075,1.969369987020546,3.0598945303688407,5.370489624861401,1.2688502760400788,2.2260956383641894,7.822796594153232,1.3823268091773144,0.7334260332334663,6.684350225463231,1.053334196417246,5.360096640143368,5.9254939404296465,3.174090525262494,9.559600307286127,1.427158888232829,7.280942459474047,0.6260471283463764,9.438171905790742,9.783415618674185,4.628498696317466,4.83205152390032,2.3962787268464747,8.137254472398093,8.08032579174993,8.034000081128239,0.07571044230178403,5.529659508228793,8.109812312274215,5.233020266940578,7.424026924888098,2.2756003115217505,4.318298246530072,6.615465389436257,1.2910324005696916,1.7830145574094702,8.163289589405803,7.963378063256947,0.661783068280204,7.009790449436428,3.2082825409987037,5.225983626854227,0.14310491049964957,6.317573242932573,1.0123677331489822,5.935320586226718,8.108229315058399,6.225321655401306,9.646966697954046,1.2277323293852604,1.525871734084694,0.3442086964619362,1.379337042710922,5.171520640894847,7.573893464977295,4.809639521054674,5.812498129367924,2.067466465308687,3.7636671310306857,7.280816307463325,1.5103961346001138,6.882349615626229,0.9418675450318559,2.931165172693284,7.132097045932186,9.838559263706706,7.582818437958707,3.288634286484049,6.645925011808385,0.6269550225845744,9.481006337704416,7.227601399873285,3.647781299092594,5.820590898085638,1.9985942262876777,8.609788218955938,4.369826707781765,2.7535855504209628,9.930609193322395,1.506189412006611,9.524015223984279,2.7376414839295493,1.848060366932105,8.077568973330623,1.9359034750603477,3.860823165912357,4.6811959983946245,0.37567656991719156,6.2034832702676095,5.723171417467063,3.0014297521963007,4.299660694956673,5.77747761424,7.454717443402121,7.704730616746325,1.182033820293762,9.483751403080209,7.843318309653293,1.9039560556072388,1.2639587823910015,2.5011213751294714,2.5624860781233516,5.922908782588479,4.5923690808471544,4.9325433323110275,1.6693022395207047,2.5974308024021764,1.495153709338164,6.676147939604711,6.5109020136613704,6.158255853564276,4.5189416550716555,5.352425941067027,3.7694206733641034,8.673075361068465,8.947271248349281,9.241433328767993,4.1731534147341005,5.069558424235458,0.033726822879804885,5.502520015807633,8.57313521091557,4.783482928871399,7.420340796186182,6.048137774734479,1.159539424763416,1.132105549318203,2.390560711508931,9.037347058398087,3.6369093036586153,8.45333001557275,8.394770695509104,6.893680021343231,7.71752434698686,1.362048331375254,5.719243162804581,1.3216455999962107,9.152666971023944,3.4672832304283974,6.304183873885362,7.536713298700781,1.345335300941477,6.136147045395431,0.8388393191376453,7.764461260713196,9.807527305018404,7.728716088193394,2.444445432223614,8.104247208982793,8.711938718453974,8.550401163747598,4.215653245844866,3.892007083088045,4.788212838391825,6.804651709744132,9.903234455786642,5.898032547966954,0.18446461210275933,0.4146233361374052,9.96085616338392,5.05902801396831,1.152943024556663,7.816104968169972,7.2055483534787435,9.875888620107977,5.772731608863253,1.471485071080978,3.6018587924658085,0.4395710933640684,4.353151007038258,7.074960126559045,1.782702380709451,8.645564215479421,1.2010948731264115,3.8445281714048773,8.43549603693343,2.2985264880563716,1.1418511115485797,2.1124690352444997,3.1977560950068384,6.738739245571597,9.585562217082423,6.087162561511816,8.513075663624479,5.0553433763293,3.6257495186743283,6.799532008900611,2.832341722384595,1.3026416820335474,6.9892850167598874,7.618846681422104,6.575866071998664,8.369763064923731,9.796654224017612,9.748600854896365,5.865008289179299,4.45143940763002,4.636225583863132,4.196286553788868,0.20786860862049172,0.34579918262069853,9.271588479891147,7.457239248975878,9.08348246855195,5.8860348091676595,7.931399066951242,2.2585750939678984,1.02870845001239,8.142849379920783,7.814747300172495,5.952475896173873,0.8261538760907849,7.10552213798064,5.482879496559486,3.6675530224656283,1.6552142517471036,5.1638674597984675,5.288427660308857,1.8701474980536004,1.0960732035477005,9.721964062894752,5.601347419593732,9.842333535238232,3.4615354607282756,8.601759120990046,6.459778532070269,1.2553419562133539,8.94844659262926,7.213090982806099,5.192188738667323,6.010215305903301,1.1048500651290305,8.086505304889446,8.779369190914766,5.519738449122437,9.822285210111856,5.7035337825024985,1.6688055504796884,0.3802934044185857,0.7874367116023873,4.231310793648477,1.5492855589675414,5.410787763428071,0.10218449696009602,7.912144422800256,8.599344793872222,9.262771035217384,4.553180370973751,6.5236614905189665,9.682859564861454,7.175424479878421,7.897851578102624,5.776114199410493,0.9217633160030525,7.3117343249520435,0.3976242264678853,4.583825359459914],"p":[0.02131510471428344,0.29000969873546123,0.7409641267575726,0.5888953496126663,0.7877524539051413,0.16890416937029995,0.17827163425564652,0.4748709555591868,0.026352554563109365,0.7981131934566947,0.5332322856984602,0.40106353121149674,0.4426511191236182,0.5840660101046913,0.059203903245613754,0.29994737180714215,0.08885003599937225,0.07436840445822757,0.5528191169162138,0.011719340698596259,0.04925897622947284,0.5759157513167643,0.9059029329615893,0.3058540341120859,0.05354231634512452,0.21703794747272354,0.08876115182066058,0.6952666944515513,0.3205361168554368,0.9096572533313698,0.6852361443125885,0.054451242811506706,0.09393175080768712,0.03147692722550577,0.1866984787807402,0.372068950821,0.8882778728368155,0.1501750342701429,0.036172990149167195,0.997469762731358,0.2607603889404635,0.026162020433367683,0.9363750063352023,0.7866342812416367,0.7298692314680335,0.5872910141348657,0.988870701910884,0.701438481673627,0.14586552206607983,0.07620112575876292,0.7496750348790577,0.2997450885498649,0.24865805610018943,0.006100084245922455,0.12559870611241597,0.13249080465466712,0.5940611053410969,0.07352625609253005,0.4408456689032205,0.6024969459549367,0.7230176384934206,0.7446853848209674,0.109602225080081,0.8059106513687246,0.5321463719393926,0.4269380659952553,0.7628892940571048,0.05826943990542999,0.3589571562316958,0.5838406295721461,0.2617388298551173,0.06692889134822999,0.7495670972038495,0.7556438045147178,0.13369121261445938,0.7525343748809799,0.12965816061379365,0.6726025033872229,0.535557041625315,0.0020485032024339933,0.13227275579093156,0.6461951670972781,0.32432707992623344,0.47329562433015804,0.5691125013489986,0.3686633960714514,0.7951804803189912,0.9799119881339922,0.2032112285361738,0.14275119013094195,0.0012120679861988837,0.537270806301698,0.76431943371816,0.6262723899497213,0.7016526946367878,0.31341943849963916,0.7454431372056054,0.19154641723697474,0.3666490540609242,0.18316119652501084,0.38527656226348106,0.9159781670569234,0.09290550790545593,0.7262152810598328,0.9798608084677911,0.8938626131689764,0.6744706078470186,0.25450221625657865,0.6544367032996408,0.7285523857182752,0.6335488769830913,0.24636349721987205,0.20379365760330148,0.2991128647377208,0.33330184351148917,0.15246364910314236,0.18710269756912523,0.7283862087441293,0.7394341085269944,0.628331150390353,0.3831745611167898,0.8755452050453794,0.5924873447605619,0.1048741522026524,0.16392587893920574,0.2128715638596923,0.44120907963253386,0.3577218055883691,0.3964311771154203,0.5260078130555768,0.563670730296242,0.005500757814733914,0.8035425109599683,0.4928015070882874,0.33998189534825274,0.35551067843168593,0.08296966921308124,0.5804035942904395,0.6907061710695084,0.5962310743100372,0.325373045791179,0.6633435897600866,0.11805335222258106,0.854417842341755,0.7324301219087308,0.12091915262299535,0.8692838805193852,0.3553398234087477,0.6627361966906011,0.8772421755798512,0.42453951777369303,0.00993557372376741,0.5285967711000421,0.8380074890388589,0.6326100099203096,0.27450200894860943,0.18859184320629763,0.27834230689338724,0.5009857554385708,0.9307405584159503,0.299896567119206,0.9618826551382813,0.581602609515625,0.07300084716564825,0.030862315183562083,0.08173413700159271,0.2709742955604817,0.8772321837546253,0.4202925800999566,0.772776449390828,0.670464908229442,0.9478575472278712,0.5726255353522973,0.5591686127699209,0.5090444469019562,0.18605263589121335,0.10789146859013443,0.19533059644456152,0.3584655196073028,0.048174706337865025,0.6931434230818161,0.46708243974947394,0.39262904112478414,0.4822793547241766,0.36729933083449606,0.9373420621135242,0.227826828110943,0.5386061478448754,0.2318754220062913,0.14513377029872343,0.5405428020741421,0.03845702687577468,0.4223674826683379,0.40575703535245133,0.37623844930036565,0.44640414231133096,0.4240370927779,0.09252689345963283,0.5474087178579095,0.9472606308463298,0.7969232756741644,0.07758773630399429,0.36056458557107707,0.5608557499397433,0.1210894719594835,0.8521815052414285,0.11060854927092723,0.11818481548838666,0.8794597442390655,0.552601651660015,0.9321533374209665,0.012950007840524025,0.2336512947790801,0.100635728380982,0.7095798710384196,0.2480228269989757,0.12550253263801414,0.7932125466472879,0.14915344698002442,0.5389552776927629,0.5170953622644028,0.8244161168017026,0.2649778777949532,0.8687573285561636,0.4595618224984783,0.8155802542919162,0.3758720014880137,0.15224165609660312,0.12352923328430587,0.021906900527948192,0.6973031761892377,0.0435066976152616,0.3138676448338784,0.053854910438986714,0.11601878221716744,0.42747273456616774,0.9282704188616158,0.19893140625870798,0.86594365961315,0.6645606523589189,0.9046463834230813,0.5048163557758332,0.5859929266988806,0.08037541300663142,0.27148548449096066,0.24872067299822342,0.13717209217526105,0.8179584126017598,0.6462140763929891,0.6312476173853199,0.4888855093852511,0.004455725327807247,0.7382721952164493,0.8681168080625543,0.22440117855348451,0.7437427235757745,0.49197833607612207,0.8836472765643426,0.508783667694878,0.8368264853508522,0.35904747977954043,0.7322278535562547,0.674932654424016,0.40960028562814665,0.5205470005222603,0.3908885255682908,0.5511842665060873,0.11918904015199638,0.8742695557870759,0.8326447281263485,0.12325208189935788,0.06268694765426064,0.08634679070440399,0.17625535021222305,0.7264156251348286,0.9010647856447027,0.34241922784961987,0.0067593023268492924,0.3470456712862795,0.7387902470362395,0.7968155388228688,0.4364399875373375,0.2775656864135425,0.058899216318788916,0.49875029737827137,0.7744896262792575,0.11048560882233627,0.5615428730968279,0.7240615345366976,0.9150448172589074,0.7757324477324214,0.17294233013018867,0.7554658566961161,0.22539371020317134,0.4112103084263339,0.5176144248768129,0.23657781433112923,0.01994949763063758,0.9916116013491849,0.6872178117916667,0.6803404982082668,0.4211348119583036,0.4195346903084116,0.1444712059367621,0.7549902965945268,0.4016545253019166,0.033322070994282305,0.3563633943492934,0.25096553035997426,0.07042997906876747,0.6324685990567576,0.8808838060942565,0.29588691830658354,0.9051691059753355,0.8125927594392681,0.9982385095695625,0.7738784982144824,0.37554460654374444,0.9470465369024814,0.6467661004315568,0.5444789644438373,0.997623032760506,0.3823224946821562,0.0937074053607696,0.10995949712852293,0.3179878543616652,0.6508013764441287,0.6591907987061527,0.05473955163022093,0.4567061422220364,0.4282737021341734,0.5154362743707257,0.6391361595495266,0.2252595238263042,0.4334220693282478,0.3343512213641999,0.052790526468089904,0.08305218256035185,0.9636077129730067,0.14188793571038238,0.20603609263588907,0.056242132943519874,0.2967410434077915,0.8711093689867324,0.8017380302816022,0.2954202621567872,0.8017954440113209,0.5040794869061251,0.10927062045047942,0.9021169149851422,0.709269428053241,0.8844250466669905,0.6073865102621743,0.8006752777198733,0.17486520881604695,0.24893340170738654,0.6714270279095047,0.633140701274082,0.9314321092203064,0.996906876301475,0.6967961845854658,0.8653637845645883,0.28952631066991175,0.5799391006109236,0.9182137210688046,0.18506053342871986,0.296877543198814,0.6962681233410195,0.8139450553852396,0.23453242541860342,0.5384787143793552,0.8373697932277877,0.6366241485947755,0.9669353120666195,0.4083478454856997,0.10929019976066678,0.37813283773465867,0.36310457433122445,0.713627061089672,0.8165654320666784,0.19351528155686792,0.3890282798114666,0.1786128817310224,0.6532931102845358,0.7860632222507422,0.24032052773365864,0.37535142901459784,0.5190575113218223,0.5519225641267267,0.911985515157228,0.37631060800816263,0.8275731238395039,0.6751029633893386,0.43990746252449875,0.16423606163468585,0.4800860497840409,0.7475958333091739,0.8741301266421875,0.9531406251029533,0.32572345015630777,0.8412590098133317,0.7436580739217686,0.4610736623271705,0.30277502279528123,0.2024392079357915,0.37895221499805487,0.4059654188761208,0.5827858017703147,0.2885183389537429,0.9450650919144405,0.7993968763391952,0.5710413639347827,0.5846610005219772,0.9935213878128712,0.5900624497158893,0.46414826104432483,0.8851755351645008,0.5219647801230249,0.14631141934614145,0.5823452136239742,0.014799440781842588,0.6661958338057683,0.6785723062436584,0.43852497351870623,0.2031578785836614,0.4394088730492014,0.58549312388033,0.9068716603643456,0.7425396696807558,0.46110467043350445,0.3367509067909291,0.3554228258526655,0.44682248562421867,0.34514960530333805,0.6992579303814017,0.9550564870858651,0.35533700229423926,0.9579785838841532,0.933382739532433,0.2608085827947224,0.8980382988616011,0.8572048528578895,0.9497873849303118,0.4030373433333847,0.29595556507981335,0.23159662706160877,0.6474700476465121,0.5246006132098731,0.15630959721032633,0.2283317740131381,0.4637156650143206,0.9683016508794964,0.2356883856049823,0.5847563408278034,0.14725039777843296,0.5533892985446114,0.28099066450871835,0.4280150293476308,0.017185493357982695,0.4569320903730294,0.8338737782354468,0.08005293742771968,0.8334671551984103,0.8901962272667052,0.9569937005831872,0.1134348665869862,0.6841554088937107,0.2237617836499619,0.5895402434217869,0.8241610746684525,0.20954963544277572,0.7268356119393131,0.4621195601228685,0.13778475100345222,0.27233101421212025,0.7903607383270097,0.17130683727617813,0.21823429511195203,0.45489251226902905,0.2734743839175753,0.46194663250932266,0.3502348347721611,0.8093916731554718,0.6894357133810438,0.35057959686399376,0.621833074761911,0.6921362800085493,0.8539265657400787,0.49195064353678397,0.5834255530797119,0.48594489154619125,0.6990884470628072,0.4769179904623453,0.5594181829967997,0.9222843656844135,0.08483819597621811,0.5903694432871451,0.07339882781594365,0.09127749737450963,0.5936002365832094,0.6811250107650162,0.3658555171933222,0.49172539306003404,0.23225919500771153,0.5709357156288204,0.7505903578370983,0.1296563298816522,0.4848365050638861,0.6642483177992422,0.7376021674525968,0.43250273502937775,0.040859346054790135,0.8402920607255087,0.9238210326605512,0.9957404547170703,0.7475807725602275,0.43490461667755453,0.9631217423883354,0.5479328008905209,0.8382741369205213,0.4275213241730975,0.1388104256554057,0.1988439109864586,0.22396034430278178,0.6861598078753024,0.9993803592702932,0.2453850457188811,0.6341317036872673,0.9657594277997181,0.39299373503825974,0.10075730835627672,0.2956055650154088,0.4865747770404516,0.8098984252392134,0.2423997975087402,0.6708402352277087,0.005405939344338417,0.8432889240080852,0.9514532460643987,0.5352695123440323,0.7564848056196345,0.7534061186394134,0.4899437492644254,0.4589631980360285,0.03247004612953219,0.814553008391419,0.11316482612087131,0.18262915350806996,0.5576753773052214,0.24083366476713253,0.06234372397183274,0.01927058396071346,0.18962150435654723,0.49673006676975184,0.9064338257038584,0.9447853633412158,0.783707492378086,0.28414967210122977,0.2535089621479256,0.1272821810325342,0.43349846664428693,0.23232743804337153,0.5525395502650841,0.18197405434360547,0.6682986189286342,0.5517436243937104,0.41193974586038395,0.8576932173404315,0.8566128955126235,0.9488145622283342,0.6296653953345857,0.4378017055719423,0.005602156790069035,0.02077637604534943,0.479676359158566,0.09667007105796,0.2625737614743213,0.9755559212409812,0.29777162694247794,0.46731782460502047,0.8684218549245459,0.41821638646040893,0.2667790099543885,0.8173458252500376,0.4649059228247865,0.05227912741241103,0.304135443730813,0.10303916514633227,0.20381297442934376,0.6846102501718665,0.787847185357851,0.4314959368662088,0.9961676478286419,0.8558399135984578,0.9546359840038754,0.5555761380014503,0.20421781117158022,0.7444722292263708,0.3753472019829931,0.41318953149171755,0.25243398183063537,0.0023143759542718634,0.18791511603638456,0.11295895319196503,0.7001932934847888,0.6870744498906389,0.43230388938338904,0.1261361841731481,0.8425808227427782,0.7587787718543009,0.9171201871355219,0.653170235034491,0.9772244328071023,0.5152856238438432,0.7428177692874456,0.4653121944242118,0.7802088597901324,0.7958459117829859,0.35628396510768723,0.10110666818829128,0.36072604222908455,0.4168010788561818,0.37675455540149927,0.776394926924266,0.922279050684851,0.6522268843919228,0.21842683832215903,0.4456183061229073,0.29892364927409365,0.8199139709102266,0.127639594000442,0.11256334157008219,0.7270144833373788,0.6098469728981872,0.08196065423080734,0.9676100090570721,0.47023668029289634,0.24253095505283073,0.7354735295489307,0.9500545325665963,0.7612790475268927,0.8562237394484504,0.3550545746771654,0.31834423840934645,0.621554774493329,0.492424265118502,0.9504463217920476,0.19785970861653968,0.8621135758873368,0.6643028903584973,0.47024775431754584,0.5588908162916797,0.2429348201351862,0.8581232558427654,0.4545068774910008,0.06408668950180707,0.7707367551187674,0.8397060299961834,0.8344744831137854,0.4593210758069668,0.9308410847248774,0.31660172761194416,0.98101348166221,0.7649807812239082,0.1410084296210996,0.9618084010707346,0.578409994808712,0.6139958849796681,0.20948569545252194,0.24185466999031435,0.6357207862643708,0.6562686876602701,0.7208625705269338,0.11202103877921221,0.21892800867933615,0.42199390233707557,0.8731462916473083,0.13788933862297847,0.3459818786597375,0.9493629759258155,0.769144836469873,0.9857940448916283,0.15661341710264987,0.32390264241433475,0.7129403781523025,0.34023945511048237,0.37727812794877247,0.3604292994853706,0.2522513202215271,0.5880674487864463,0.8273302692144786,0.32168518281835756,0.38625714183683524,0.08181726398722389,0.5639916202380677,0.8669136402744435,0.686323198304883,0.0626239440548626,0.7567534027366645,0.23415196489973966,0.8955308723767397,0.578458580874162,0.2737777512527899,0.9075996399254953,0.3419719966325292,0.5646933122555478,0.8870206306053052,0.2911559391969467,0.6316622864493018,0.2573870755008343,0.012152107817223312,0.9462044822012785,0.500870633374443,0.43264902646978953,0.36197447991649745,0.4237774718560068,0.7191353854298277,0.8100010838183633,0.2830042851416523,0.28338975409436906,0.3307303197161613,0.8923844597750066,0.8021189307146603,0.5839376652488872,0.858740021954141,0.9338370506918143,0.10617578741527356,0.2560511686729121,0.8772239397335799,0.0820111557929275,0.5464184555354699,0.07255942896555423,0.4253033794752634,0.8712680360390019,0.2115512718743391,0.8385321329341913,0.12814294409766092,0.010560361721203781,0.6883637029816412,0.8953545096362399,0.25555436898392747,0.2665418699697819,0.6808002834836262,0.8440918391841767,0.631883433937815,0.36287584015594176,0.38415839721463163,0.7504677263004602,0.268048657254617,0.657399469796436,0.5058078779576551,0.7608464320480492,0.12097495476757425,0.9769585378797709,0.39888136064606394,0.2389510217598214,0.20948597916986,0.4161121289986407,0.7936737472162783,0.6298731662262174,0.5919780273915101,0.988017407726552,0.8647635572511845,0.2822728055113273,0.7679036093151141,0.7903054946742647,0.585071761686281,0.13633780315576804,0.8413283146023944,0.34601896411811883,0.15257528144844978,0.8174675657868133,0.645149468051911,0.1629510085026753,0.7580713674093054,0.6212536083543425,0.5456686722610631,0.5121248647918515,0.24271999295975544,0.668311411501932,0.1324634769381321,0.7984416396778407,0.04268470861600848,0.3294349456716317,0.1927194602179314,0.829736514092277,0.16459058681283212,0.4725252666248305,0.6494770224284319,0.40272144028530943,0.12542576982083542,0.5845550309653946,0.7110130225990887,0.5332285314072354,0.2623894890851248,0.9951488081758477,0.8385041362302721,0.7695884197570046,0.8893492002147345,0.6856582415368471,0.5791024044440303,0.020541882437408177,0.611621875551347,0.7333302329975111,0.01718499198712542,0.9518357038604535,0.003811322105600201,0.0657809715409432,0.6547847843945973,0.7587284963100047,0.4866115325250342,0.8435838666373086,0.7283499616454532,0.30795760442639364,0.6591074908377055,0.7619665912216294,0.94819800841492,0.013299584838845746,0.07096901367172004,0.3834459915150945,0.9600122705284981,0.6049201468053902,0.6971684039753512,0.3566075672698896,0.06340714940584458,0.5138801169100533,0.2523880813399668,0.42283743373074456,0.4783063978642341,0.9787243646140236,0.7634724386036733,0.4611259371057299,0.6585961718226685,0.6380831681587165,0.006127905239698528,0.29130127231171166,0.47308001597756677,0.05962472861270629,0.175772763800482,0.14898939684220913,0.8205661952661467,0.6528204509991722,0.2012946458563749,0.17629583053329223,0.8946970980321396,0.3657085210462019,0.08246460198452521,0.09369771553709216,0.28785616750900167,0.29243597649142195,0.13388505206445078,0.29150700433566423,0.49810066663173735,0.046404700919143504,0.802772905460448,0.25669616915601945,0.17076502402364002,0.7222975054306537,0.5724449498336992,0.29323129228499356,0.5833463047591776,0.6456824260007636,0.5351584110155259,0.497528382673192,0.9704069342614254,0.7615962625147208,0.0889913973916252,0.26237123125610684,0.5974373587575952,0.4978509729086469,0.18826349000287768,0.8162378172684188,0.8340379948636176,0.11706472342841345,0.8227778709859646,0.004611124572733383,0.0026122943126403175,0.4135603531668941,0.3216671971240448,0.8620032420680162,0.1644112679066434,0.33873841293048246,0.09772975308324527,0.11671269239847226,0.13447951899662347,0.8991214534089733,0.5070776849709975,0.31768924572230084,0.07946685218504546,0.23247312315833435,0.12638178026973979,0.03960214932795747,0.9979003214720183,0.048498068841073216,0.32343362094666284,0.39869807638667765,0.34816128904280785,0.7330335962986758,0.022940261480845825,0.11106670131975083,0.9375807683938733,0.1166553495653253,0.31287655752253474,0.8770263192171881,0.12089712347459747,0.9152190036633208,0.5531188174054069,0.5980530318136563,0.10957902062309022,0.7786973569927509,0.7408751845934185,0.08470904286261605,0.4332466958869947,0.0640481037729641,0.49006636030674167,0.6568755930327121,0.8445815480803551,0.4982020790417774,0.5003698126674547,0.6210832184858794,0.784563621884782,0.5106430594711473,0.9547390144228438,0.8877128279466648,0.8255888449884519,0.7056283506568939,0.7328767365756008,0.5454537678483313,0.24395854961593044,0.3354635548713254,0.4742229809453744,0.6557570519040645,0.6443308572144726,0.6821420697152913,0.6330738614553966,0.17026793433053888,0.06967256930478238,0.8296504859784084,0.006539318992730525,0.04650269301939902,0.6520443390542947,0.04238562610790253,0.7660526172767244,0.33951327119817254,0.0004083560764958083,0.3877094389600495,0.2520989917160159,0.8193898286713406,0.08497914754815405,0.9371606064460116,0.6368269711406367,0.975525851246198,0.4872657252670112,0.34188964611232797,0.22288868740208145,0.3369455270183721,0.049864858249851984,0.4630433854491196,0.7246267763956695,0.6669849858441226,0.7892815577137087,0.7910085742693695,0.29283653907617624,0.0965385745209768,0.3946008685013209,0.5280890599475778,0.8175138367421217,0.6114802032220656,0.7221398018050551,0.3421212888781735,0.8779756733794728,0.12056653266525896,0.6010930291635703,0.7219919203810345,0.7386897514062527,0.8576739205393629,0.554675863332365,0.37206760560528984,0.3409329251616662,0.3904450310801175,0.460845701707691,0.792793822600925,0.11804340005466951,0.1524238029436915,0.9628037643283467,0.7418604051915507,0.5607863021909927,0.1674379914079176,0.7405284903677436,0.7361785219364072,0.0016417725660291538,0.3865215352986884,0.19659919673916515,0.6205412471511804,0.7290662478467758,0.10560021682787402,0.6499402587093388,0.782576841497443,0.9057337501839426,0.5532696110326634],"beta":[16.309250170441615,13.19031574207293,18.555090809620907,12.53104682011245,15.896597107545416,10.788739624648247,16.88563994300536,12.647392904749033,11.394234466937291,18.870813859762414,14.968395250519404,13.872005123079585,16.337141880356228,14.522452024060502,13.229034333349341,18.68773098191206,15.691173886559467,15.523037203753526,13.560115932082406,15.56771720394991,10.932481000835336,11.971639975835826,12.856207397006845,16.47770448185267,10.178230866507045,19.551503158288185,15.465973758758027,14.844766231294539,10.370987305688416,12.515264814115877,16.8885483991685,10.177403484742163,10.528585187692665,16.41315863337826,12.89009207340107,12.655159387062504,11.537389980880215,19.774245979326093,18.280609374429744,17.323370185979687,18.119745249890297,13.872772201903459,17.461977785879448,19.26003353438481,19.50452661968788,18.47838856921483,10.107939578040526,14.250294065175941,11.450379444889222,15.994379327026888,19.38208768580627,18.911480651500916,14.40920047622926,15.790234689772365,16.44380594816179,19.10071235204324,13.94146011682386,14.966418996052864,17.109335618562973,18.984798866408244,17.7045789885068,15.833084113988583,14.581963949222912,18.44171982377356,19.209804612933084,15.301447460304715,15.92494737511002,10.799754850159724,10.39967867425348,10.68109360802202,13.712687126607612,19.462264852103495,15.60495675907335,16.547648442890853,11.736207169493715,12.966417091581906,16.136369420846282,18.903504448603655,10.331909542430001,10.31253414593263,12.433943432784302,11.762006910776716,14.030319392706762,14.068882185302103,10.819950523645351,18.282167031296005,16.744007891133606,19.002978192003816,15.616345033677447,15.298185951665245,16.46343908231302,10.633081349795976,16.1819991477247,15.233842819394152,11.105959739529984,11.188658844610393,14.738072801561234,16.206323338439194,11.434543542607585,14.569451896482907,10.378502096495525,11.123258098395706,14.916435144362744,13.373830311422335,16.496047146828108,10.45356145332313,17.715776165701865,13.448831914186378,17.48194612862408,12.950751323069955,13.658600284563146,17.415291321927214,11.867186672873606,14.640488343732969,16.95400622652015,16.641835336122774,15.853083752142663,13.601925399385088,10.667628273696803,17.164094646272545,14.525639155765848,14.695078291316975,12.727606954282987,11.873623109053087,19.97927707208862,14.833088078969215,14.301999305043466,10.671682503495044,13.64237456221193,16.926194051916838,14.089359925625569,18.485017793224607,14.701556279241716,13.783634760397517,18.840663838498692,18.889836203948384,13.3143483615031,14.971904088387708,16.85558168951588,12.805106946944246,16.982867917226056,10.021836006347403,13.807697456798188,17.024127411015055,12.97316455384206,15.374419697658876,18.166090500921364,11.819479545640036,17.4258213750186,16.93106346546865,14.46650900656449,19.708486835135552,16.103156385990715,14.036695211723897,11.352432639361803,16.938997124267143,13.213273760122037,17.44287326306611,17.18524321601159,15.980538411214386,19.348826906938985,16.57099313396815,12.310805890674247,16.15120185623932,18.163372918842153,13.258175967232837,19.86160936762133,10.534432361888971,12.169258338747259,17.571898524789567,17.375486933300255,17.665560086231928,12.067731498006413,16.256450127603816,12.381328765059113,18.200596483427713,13.30469132279167,12.607238108041436,11.525334384330389,14.445577299603551,14.15321758045052,14.959146583976626,19.785882600654432,15.614446814102344,12.77225251466431,18.99409982133781,13.160553442369915,14.492043431521342,14.60335125042299,13.133307740567393,16.797377223284293,17.722752061499822,18.337278323997275,19.27464579189011,14.66232752394459,13.776960172231066,16.371229166970835,19.744665974066464,13.499949820018578,15.517929891825755,19.382036770132203,15.26783643197394,14.831010603289656,12.559625608619914,10.706839736090956,11.231511181779954,12.590309199519606,19.010770976236067,12.472595643592681,19.437145931197907,17.8518391991834,16.589054656714218,15.162008159486094,10.810374083447151,13.183759387999295,10.217015341584968,18.517295743858625,15.207148302124587,10.790974277400363,11.316989001104643,11.472319538536649,15.490328917692471,10.207621289165697,18.935799288205537,19.140130147804523,12.077446825172224,19.63065545722606,10.709961223956206,15.414878906366294,10.004368107243574,10.730816545428208,11.139777784824132,11.412485809841685,18.649076724076643,15.37921728059972,10.773799601259451,14.302078335583225,17.338841120893846,10.702311897139744,13.758486839440318,15.319843878262256,14.108998380118582,15.900427325433933,17.69797036977497,16.860808165934188,15.959965090497015,15.445024724468237,12.405578665606555,19.56229142515386,17.760018185303707,18.76823652948692,10.896679049394038,19.273327877414445,10.264938571639735,14.78169684483926,14.49426931930523,10.344246908842969,11.314885170592028,14.275462170780377,10.641895099540875,16.08874423293138,11.157935805067448,14.697647178831659,18.658129192494577,18.6524427729268,10.482158562141992,13.896004650823722,17.98460647205335,11.749836521337947,11.710298657862603,19.453689648676157,10.672965712931399,15.728248440376468,18.592617591926068,17.36600077578855,11.377157160875058,13.66382932332826,18.65315631046472,13.52120627553425,12.079343819956318,14.42577275818304,19.393824358902734,13.244413856839234,18.157164139844753,18.246979173240838,19.508865514216936,11.935909137894429,16.268560701990616,18.898588728824084,12.924002284478217,11.31921136714645,15.275946822183563,10.678394470477347,14.07485484494246,19.14769921884026,12.26884482760801,19.006332350006133,11.118112008780315,18.872467098134713,17.642754929702704,11.158579929089713,15.476883985881793,14.39189095307243,13.410428022955035,19.960437101001517,19.768054649101515,19.66505394774486,10.837803319759649,10.995019290340293,14.271431713402727,17.117291093941283,15.4194200345359,11.370924099554188,16.852167062146865,15.715468152877978,15.957445058240996,16.26321218719918,13.201446658083963,15.333844041331627,14.232820119296939,13.40977015241788,11.062237366603327,18.397714089921852,18.747222292527205,16.072769124620606,11.237183881673804,17.473345320872866,16.689060478243572,11.871565125553605,14.864656507194008,12.99341109190423,11.705407637924843,17.38358452564364,16.41512695632141,18.90315929040684,13.752443579176672,18.478180431322833,12.73093215532089,15.772156412496702,13.98908459849034,12.224027942286451,11.120829608222156,16.715785808274227,17.977283200318457,13.881858830509064,12.466148300387571,18.180672233821802,14.95888706806668,10.118140744451713,10.515199022732931,17.309203361291672,11.20139804984685,17.76408101610196,13.84623420027368,19.43666207111643,12.000248041390886,16.198595672222766,17.03056663927003,15.266011742738677,19.417405540079926,17.56930726312998,13.871110134268857,14.947038813780962,14.343160554965685,12.208827321797187,14.644781424230315,15.732856243537777,13.963902799043863,19.709722869152518,18.596407300034283,13.770494053053927,12.462772880270494,18.513095925407324,10.547840422821233,19.80784915744047,16.420004692976782,15.121828072779188,16.80022895577291,13.824199630305564,14.98075415560355,11.461550193629819,16.202802802872924,13.551477318702831,12.265214953486751,10.602977854763985,18.172093281773417,19.463325139232523,14.483978191176273,19.220149291903997,13.171890930746642,15.648390490727923,12.520568449307941,12.278558795084953,12.651242872916553,14.540302879502029,19.25724301305989,18.582677843090313,19.045498426188313,14.142678738014338,10.102219050685937,14.505922051929911,13.384719314126228,12.867315105381643,10.182104436813672,14.713648530225212,11.874626096992085,16.44489997235315,13.980426155900634,16.58294699433943,18.922349763382428,15.247063129399317,15.211020187615826,17.724308825979065,19.35846062691609,19.93741923321692,14.720101150729368,15.157948280515246,12.527688650994314,19.05154185289681,11.153240916906062,19.6512985957528,11.288434920653405,15.773552876101524,10.47690712321646,16.832144139214833,15.470244666213706,16.375722599742996,14.825639900074963,12.798826626358949,19.58047003841996,11.98404223415949,16.85062303152442,18.797651991502327,16.977312280374623,16.205286042117095,12.702555256374467,11.96747435089566,14.359415604270982,19.546892057774222,15.809108934772757,12.937712123660233,11.526785434735743,19.501788498103863,19.522348615929385,15.735903212009969,10.005238132669769,12.496407699936906,16.768912213189896,15.375737438111114,19.121116492348385,15.933221954507706,13.421635398277779,11.384062624033335,10.76058611778118,14.274689070862054,14.106266457482679,15.062948846984341,12.442068288164098,19.236154751163177,14.433625530394503,10.700470193981724,12.202646475866628,15.88226127572571,14.366596224517977,16.14878955736806,14.567408683775955,13.216515503238345,11.047377057838208,15.851512897374265,16.4951305580741,12.920025765422402,12.496005140910185,15.944053454945799,12.731042606583378,19.390458737705586,13.24827522431951,11.408316186526788,15.030152003080115,11.218210674133541,15.252902799455299,13.499563642436389,10.731503335885705,11.652566760220363,12.567345566622699,17.560142969422444,17.429773238439132,14.057140127938442,13.334806746562977,18.268087946538234,18.502363549296966,18.293156310589335,13.090583137306533,16.582241515116944,17.197059361053658,10.62461192805639,13.840774611461256,16.809221953301254,12.355781096829306,16.544938074179445,12.476967857613259,16.524947830398002,14.331937029031279,16.554818787577304,19.27365660357241,10.990554828214776,12.10932883471488,10.690986276741658,11.282073408267028,16.47593704952952,13.764364903174322,16.6884009523269,18.243288317269872,15.977178775116165,14.506242464722778,18.93519130754185,11.608588759979316,13.158650761888232,17.416718702498137,14.75117492907177,11.49549928256947,15.058447015535847,12.33277568089967,15.930223642818595,11.605928800782099,15.415618764884906,15.886268753092969,19.846329417120433,11.418566695069593,14.156897190705786,16.375139801763567,11.424331484336857,11.471108655753424,14.590259692073415,12.966480957755502,19.90439579665439,13.519514809672067,12.451102490973181,10.733450845362139,13.680187096037015,12.234574268923906,17.27582932799706,12.65016150022891,14.670815823195065,10.033328655780288,17.792827087197768,13.473726146744447,12.533505495136119,10.987586444119026,15.12972296099742,16.49016555943041,18.158185761622192,18.762557766367927,17.698644441365097,19.035409214066238,13.538636769873927,11.53023547451201,11.297374062692938,13.819661382560025,17.278575385735117,17.091178482150966,13.061954322847187,11.507316053723649,17.073370818987495,11.096984051151555,19.987271044247095,15.24962841169768,14.626741487902175,11.19658951969253,13.084671682848253,10.548062856608794,10.124204966567172,14.883630430209827,11.429045194925571,15.054029620954006,10.482558175644893,14.823754950278206,10.295349485433325,11.369873479805044,16.978478328977452,12.209856985590285,17.75401994757111,15.55284062569583,10.694982057719308,10.487777909879137,16.852377314146423,18.833909285232586,16.554190418590757,14.976308768373805,14.76291706334087,17.10896380215072,12.051217151517427,11.157168590680284,14.192782274092972,12.18430544299833,10.780808951831373,19.09153087146076,16.498542214968897,11.47984003606079,12.073214533215905,12.783802838543206,12.38728491785579,11.978188057371785,12.709305731862464,12.782044844176248,14.137449841164365,13.393456138135274,17.57183581533038,19.852356652321497,11.641693611974075,11.912640898109053,17.54320499811854,18.003327449297757,10.530644482256928,19.877787228240678,11.625395835624222,14.868494912065719,14.519603993829781,13.349817654593783,16.694823204297364,12.92830359047396,18.03422601856371,10.879164804654254,10.000447898416251,14.179737172260221,18.556984034197686,19.936110431796664,15.960232677054385,18.153003090397753,15.436430549417093,16.152988930325,11.59769505167182,19.44828220626514,16.8619065699914,11.326974753098524,15.81382111005593,10.260344043220254,18.135488863387344,18.203483345847243,15.13448705160293,10.8726860379452,18.45047322463474,12.238798345984918,12.018760154682663,18.13920710029153,11.626498279698135,14.855451142381773,15.905838346592096,10.719759663222518,17.2424873144921,15.886526807963746,14.361706656620768,12.595736759432041,11.059043423570063,10.587396206877415,12.379826730869851,17.112933391657755,15.05526883114577,19.712021051122562,18.70013618804975,12.451665909203866,12.36738220015016,16.142722803128038,15.726574103275997,10.635585283444248,19.696641684593924,18.310528361302453,18.154811678127714,14.276016100091338,19.667510147267834,12.320065983522529,15.232181907671078,19.687518483846382,14.839018622852869,12.198674625694785,11.214167326569997,18.063627987182528,15.301667790792475,18.892933102415036,19.879167363086864,12.71423444135587,15.13466083986592,15.211279531881019,12.148727015931634,19.595526969514964,10.037661210640678,18.448972963878667,15.671626699447806,13.060642806371312,18.835223056684143,14.899746336563455,17.23858481231076,11.266092596606416,19.92434340434162,17.702519006654647,12.055086381054288,12.343137775779091,13.526937842946776,10.582467038972649,15.985254628537485,16.958511524134234,17.517999901899643,17.56240207911329,18.130257056917447,12.615422505383902,10.053727377121316,18.091542058870644,14.062427049285422,11.73993035901282,15.42480918804597,10.573912318248615,10.441738118993058,15.201237152279488,11.849480436232497,18.951684825925096,18.95919999552241,14.38399630683586,11.649972326964768,18.17696716558798,15.399784164588887,15.293111441991545,11.524796968214353,12.119222788631681,17.730700584524925,10.553485510472186,13.50313280471602,19.6904157218413,11.362151359603525,12.215309824026644,15.45846002552565,16.023446994914913,19.717759382966776,11.407952386710159,12.298091866054534,11.318976431667206,15.85594630646921,10.22983375564706,11.189056862535956,11.77425557590637,10.226285718849171,13.996095350885833,12.727218879463784,13.140600899086294,14.133622137483213,17.226456457206837,19.8068416235633,19.730915052573827,14.733438367682004,15.831050566580478,11.553441566581657,11.503390219483249,10.78208238363096,13.470118774872395,18.222333805802457,14.760751305827908,18.711968762492084,18.356492381117867,15.330475267192407,17.81220290843992,18.031883367931158,14.426749604702202,16.301163087169673,13.192469673366663,13.74165152425579,11.612848217441805,19.126137514768594,16.039361926515703,15.375492552616649,19.278780428299566,18.334949004319725,13.313600471324136,19.23848183717414,12.45733880160692,12.700875991035483,13.8091688972296,10.093492192761195,12.863974558934233,17.4248475414787,16.74644440586512,15.039014557484585,17.083709026758783,14.079138501328586,13.869345757549665,10.81886209051487,18.612646937907066,11.507714711130316,17.71932137485673,11.087697713615343,14.78522119446106,12.979134142958504,16.017535300625234,10.162503571881455,18.805040516737087,19.049239665104892,13.981160669461419,17.594967379657806,12.665977351657325,10.530410936922312,13.15528841653332,17.428282833455736,13.637077305700597,14.380446179042472,15.315301652374398,16.445634487875544,14.466014026771274,16.589749164247106,15.126750338100742,12.973177618471654,12.97681866243826,12.140888157463843,17.90030031394877,17.313890497895834,15.436611628809853,15.075698264120835,17.78787748730734,18.357995193214325,16.521710764210127,15.385575221718232,15.677201068310183,16.4597958550055,13.960085790344852,15.316484922069913,15.311966740921095,18.176856599618475,15.502992639783649,13.901405379782775,19.271116099608236,12.435468577846569,19.628427671898308,18.242281843691128,16.429873454404976,19.52419386040161,12.625925677421606,10.620659974800448,15.220588035260667,13.697282989159039,14.284257593974774,14.223090743381642,15.670638971054638,13.505405445699068,12.391896344228343,16.118157239207463,18.18273041385606,19.464340298852477,18.065540687000162,15.761950113931409,15.552595987286352,15.374309602445583,18.12922622135817,19.68570661602373,17.99012871322907,10.19895654692707,12.08241684494492,14.530042133255314,11.817839702192966,16.932337951358434,13.616714457196416,11.960418973384941,12.39637725820026,14.490947761361813,14.476791439671059,16.745079355877873,10.932736567491686,10.666704604416745,14.163644771102067,16.1204630185403,19.206021740830003,12.73723150167434,19.206408265248108,11.927988249178084,15.842422547869452,16.2371299307667,12.957819548740328,19.82548722848204,18.46192652054264,11.427133382405765,16.49608159041086,15.269583175233493,15.268329296654361,19.75404181985562,15.260331693854551,12.253259452803256,19.541663340547167,17.2061965990994,17.68025686483552,16.650516522063672,12.423471042004387,10.614741547079618,10.22013659763093,11.304992855760576,15.297746808136736,14.955464138466546,13.36815444260983,11.053294264755952,18.824423868403166,13.66414139174163,18.39548150825241,13.031147844830189,14.103416085337827,17.201245885397384,11.484199216284745,14.87291747408281,15.031756476741968,15.4875624549008,18.63843448690911,19.439879483873554,14.063765487318774,12.489646438476353,17.76675000242795,11.229375540238047,17.08290815327495,11.769593620597584,10.550572380172543,13.598507707046819,13.423669610609977,15.965204622100668,15.87751631656925,18.206226994095452,15.981123619720222,16.49789441786759,15.017266772218953,13.193109378560983,19.771887938645914,11.292947998217727,13.43807460047952,14.996433755096248,18.45872211278642,18.942622106168862,12.10379116994952,17.553319728183105,19.636811338619154,19.952986794735192,17.099034420648927,14.863677520244599,17.798602175375173,11.070657099864682,14.86950746087449,10.92559455848261,14.890280478700204,11.171007165616569,11.984981743738572,19.22731060643204,18.4114067676666,16.79824642303319,19.583105857007773,19.048181522860578,16.043573328718452,15.251150709340344,15.280175189763796,17.806699786718298,13.407269218457332,19.294869634881024,15.938774809197259,16.83039612292514,11.885662179303262,19.988866331721713,16.769371765940182,19.40724417888887,18.409436029927388,13.689464917006127,19.199913750837162,13.664052057838962,14.136886236117219,13.475332594979708,18.032181802692666,15.9048829706367,14.223832681066956,14.934747262723018,15.541715630549572,17.67834227955652,12.664666309973677,18.218765287959084,16.74964171735276,14.309060025136827,14.917221686598856,16.124221216799178,17.347288395579277,16.350222227365034,14.475207071015069,12.510948335877643,12.153455382050618,16.46299823101735,11.513905629801563,15.800035827314607,13.251167643337814,14.52106181336212,15.121809019773305,17.558961199421084,15.78340668748882,14.914524084767764,17.93889574730295,14.328354057619457,19.995268678005186,12.555981081934604,17.65336747908119,16.007004340071163,10.141356598516015,16.319471329137023,19.50952896705024,19.190028177105205,14.997623295050499]}
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
	var quantile = factory( 1.0, 1.0 );
	t.equal( typeof quantile, 'function', 'returns a function' );
	t.end();
});

tape( 'if provided `NaN` for any parameter, the created function returns `NaN`', function test( t ) {
	var quantile;
	var y;

	quantile = factory( 1.0, 1.0 );
	y = quantile( NaN );
	t.equal( isnan( y ), true, 'returns NaN' );

	quantile = factory( NaN, 1.0 );
	y = quantile( 0.1 );
	t.equal( isnan( y ), true, 'returns NaN' );

	quantile = factory( 1.0, NaN );
	y = quantile( 0.1 );
	t.equal( isnan( y ), true, 'returns NaN' );

	quantile = factory( NaN, NaN );
	y = quantile( 0.1 );
	t.equal( isnan( y ), true, 'returns NaN' );

	quantile = factory( NaN, NaN );
	y = quantile( NaN );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'if provided a valid `alpha` and `beta`, the function returns a function which returns `NaN` when provided a number outside `[0,1]` for `p`', function test( t ) {
	var quantile;
	var y;

	quantile = factory( 1.0, 1.0 );
	y = quantile( -0.1 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = quantile( 1.1 );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'if provided a nonpositive `beta`, the created function always returns `NaN`', function test( t ) {
	var quantile;
	var y;

	quantile = factory( 0.0, -1.0 );

	y = quantile( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = quantile( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	quantile = factory( 0.0, NINF );
	y = quantile( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	quantile = factory( PINF, NINF );
	y = quantile( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	quantile = factory( NINF, NINF );
	y = quantile( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	quantile = factory( NaN, NINF );
	y = quantile( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'if provided a nonpositive `alpha`, the created function always returns `NaN`', function test( t ) {
	var quantile;
	var y;

	quantile = factory( 0.0, 0.5 );

	y = quantile( 0.5 );
	t.equal( isnan( y ), true, 'returns NaN' );

	quantile = factory( -1.0, 0.5 );

	y = quantile( 0.5 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = quantile( 0.5 );
	t.equal( isnan( y ), true, 'returns NaN' );

	quantile = factory( NINF, 1.0 );
	y = quantile( 0.5 );
	t.equal( isnan( y ), true, 'returns NaN' );

	quantile = factory( NINF, PINF );
	y = quantile( 0.5 );
	t.equal( isnan( y ), true, 'returns NaN' );

	quantile = factory( NINF, NINF );
	y = quantile( 0.5 );
	t.equal( isnan( y ), true, 'returns NaN' );

	quantile = factory( NINF, NaN );
	y = quantile( 0.5 );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'the created function evaluates the quantile for `p` given large `alpha` and `beta`', function test( t ) {
	var expected;
	var quantile;
	var delta;
	var alpha;
	var beta;
	var tol;
	var i;
	var p;
	var y;

	expected = bothLarge.expected;
	p = bothLarge.p;
	alpha = bothLarge.alpha;
	beta = bothLarge.beta;
	for ( i = 0; i < p.length; i++ ) {
		quantile = factory( alpha[i], beta[i] );
		y = quantile( p[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'p: '+p[i]+', alpha: '+alpha[i]+', beta: '+beta[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 1.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. p: '+p[ i ]+'. alpha: '+alpha[i]+'. beta: '+beta[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the created function evaluates the quantile for `p` given large parameter `alpha`', function test( t ) {
	var expected;
	var quantile;
	var delta;
	var alpha;
	var beta;
	var tol;
	var i;
	var p;
	var y;

	expected = largeAlpha.expected;
	p = largeAlpha.p;
	alpha = largeAlpha.alpha;
	beta = largeAlpha.beta;
	for ( i = 0; i < p.length; i++ ) {
		quantile = factory( alpha[i], beta[i] );
		y = quantile( p[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'p: '+p[i]+', alpha: '+alpha[i]+', beta: '+beta[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 1.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. p: '+p[ i ]+'. alpha: '+alpha[i]+'. beta: '+beta[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the created function evaluates the quantile for `p` given large parameter `beta`', function test( t ) {
	var expected;
	var quantile;
	var delta;
	var alpha;
	var beta;
	var tol;
	var i;
	var p;
	var y;

	expected = largeBeta.expected;
	p = largeBeta.p;
	alpha = largeBeta.alpha;
	beta = largeBeta.beta;
	for ( i = 0; i < p.length; i++ ) {
		quantile = factory( alpha[i], beta[i] );
		y = quantile( p[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'p: '+p[i]+', alpha: '+alpha[i]+', beta: '+beta[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 1.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. p: '+p[ i ]+'. alpha: '+alpha[i]+'. beta: '+beta[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

}).call(this,"/lib/node_modules/@stdlib/math/base/dists/pareto-type1/quantile/test/test.factory.js")
},{"./../lib/factory.js":49,"./fixtures/julia/both_large.json":52,"./fixtures/julia/large_alpha.json":53,"./fixtures/julia/large_beta.json":54,"@stdlib/constants/math/float64-eps":26,"@stdlib/constants/math/float64-ninf":33,"@stdlib/constants/math/float64-pinf":34,"@stdlib/math/base/assert/is-nan":45,"@stdlib/math/base/special/abs":59,"tape":180}],56:[function(require,module,exports){
(function (__filename){
'use strict';

// MODULES //

var tape = require( 'tape' );
var quantile = require( './../lib' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.equal( typeof quantile, 'function', 'main export is a function' );
	t.end();
});

tape( 'attached to the main export is a factory method for generating `quantile` functions', function test( t ) {
	t.equal( typeof quantile.factory, 'function', 'exports a factory method' );
	t.end();
});

}).call(this,"/lib/node_modules/@stdlib/math/base/dists/pareto-type1/quantile/test/test.js")
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
var quantile = require( './../lib' );


// FIXTURES //

var largeAlpha = require( './fixtures/julia/large_alpha.json' );
var largeBeta = require( './fixtures/julia/large_beta.json' );
var bothLarge = require( './fixtures/julia/both_large.json' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.equal( typeof quantile, 'function', 'main export is a function' );
	t.end();
});

tape( 'if provided `NaN` for any parameter, the function returns `NaN`', function test( t ) {
	var y = quantile( NaN, 1.0, 1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );
	y = quantile( 0.1, NaN, 1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );
	y = quantile( 0.1, 1.0, NaN );
	t.equal( isnan( y ), true, 'returns NaN' );
	t.end();
});

tape( 'if provided a number outside `[0,1]` for `p` and a valid `alpha` and `beta`, the function returns `NaN`', function test( t ) {
	var y = quantile( 1.1, 1.0, 1.0 );
	t.equal( isnan( y ), true, 'returns true' );
	y = quantile( -0.1, 1.0, 1.0 );
	t.equal( isnan( y ), true, 'returns true' );
	t.end();
});

tape( 'if provided a nonpositive `alpha`, the function returns `NaN`', function test( t ) {
	var y;

	y = quantile( 0.5, 0.0, 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = quantile( 0.5, -1.0, 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = quantile( 0.5, -1.0, 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = quantile( 0.5, NINF, 1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = quantile( 0.5, NINF, PINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = quantile( 0.5, NINF, NINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = quantile( 0.5, NINF, NaN );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'if provided a nonpositive `beta`, the function returns `NaN`', function test( t ) {
	var y;

	y = quantile( 0.5, 2.0, 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = quantile( 0.5, 2.0, -1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = quantile( 0.5, 2.0, -1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = quantile( 0.5, 1.0, NINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = quantile( 0.5, PINF, NINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = quantile( 0.5, NINF, NINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = quantile( 0.5, NaN, NINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'the function evaluates the quantile for `x` given large parameters `alpha` and `beta`', function test( t ) {
	var expected;
	var delta;
	var alpha;
	var beta;
	var tol;
	var i;
	var p;
	var y;

	expected = bothLarge.expected;
	p = bothLarge.p;
	alpha = bothLarge.alpha;
	beta = bothLarge.beta;
	for ( i = 0; i < p.length; i++ ) {
		y = quantile( p[i], alpha[i], beta[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'p: '+p[i]+', alpha: '+alpha[i]+', beta: '+beta[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 1.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. p: '+p[ i ]+'. alpha: '+alpha[i]+'. beta: '+beta[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the function evaluates the quantile for `x` given large parameter `alpha`', function test( t ) {
	var expected;
	var delta;
	var alpha;
	var beta;
	var tol;
	var i;
	var p;
	var y;

	expected = largeAlpha.expected;
	p = largeAlpha.p;
	alpha = largeAlpha.alpha;
	beta = largeAlpha.beta;
	for ( i = 0; i < p.length; i++ ) {
		y = quantile( p[i], alpha[i], beta[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'p: '+p[i]+', alpha: '+alpha[i]+', beta: '+beta[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 1.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. p: '+p[ i ]+'. alpha: '+alpha[i]+'. beta: '+beta[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the function evaluates the quantile for `x` given large parameter `beta`', function test( t ) {
	var expected;
	var delta;
	var alpha;
	var beta;
	var tol;
	var i;
	var p;
	var y;

	expected = largeBeta.expected;
	p = largeBeta.p;
	alpha = largeBeta.alpha;
	beta = largeBeta.beta;
	for ( i = 0; i < p.length; i++ ) {
		y = quantile( p[i], alpha[i], beta[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'p: '+p[i]+', alpha: '+alpha[i]+', beta: '+beta[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 1.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. p: '+p[ i ]+'. alpha: '+alpha[i]+'. beta: '+beta[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

}).call(this,"/lib/node_modules/@stdlib/math/base/dists/pareto-type1/quantile/test/test.quantile.js")
},{"./../lib":50,"./fixtures/julia/both_large.json":52,"./fixtures/julia/large_alpha.json":53,"./fixtures/julia/large_beta.json":54,"@stdlib/constants/math/float64-eps":26,"@stdlib/constants/math/float64-ninf":33,"@stdlib/constants/math/float64-pinf":34,"@stdlib/math/base/assert/is-nan":45,"@stdlib/math/base/special/abs":59,"tape":180}],58:[function(require,module,exports){
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
