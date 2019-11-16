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

},{"./float64array.js":1,"./polyfill.js":3,"@stdlib/utils/detect-float64array-support":115}],3:[function(require,module,exports){
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

},{"./polyfill.js":5,"./uint16array.js":6,"@stdlib/utils/detect-uint16array-support":121}],5:[function(require,module,exports){
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

},{"./polyfill.js":8,"./uint32array.js":9,"@stdlib/utils/detect-uint32array-support":124}],8:[function(require,module,exports){
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

},{"./polyfill.js":11,"./uint8array.js":12,"@stdlib/utils/detect-uint8array-support":127}],11:[function(require,module,exports){
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

},{"@stdlib/utils/native-class":129}],17:[function(require,module,exports){
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

},{"@stdlib/utils/native-class":129}],22:[function(require,module,exports){
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

},{"@stdlib/utils/native-class":129}],24:[function(require,module,exports){
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

},{"@stdlib/utils/native-class":129}],26:[function(require,module,exports){
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

},{"@stdlib/math/base/special/floor":69}],45:[function(require,module,exports){
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

var isnan = require( '@stdlib/math/base/assert/is-nan' );
var exp = require( '@stdlib/math/base/special/exp' );
var pow = require( '@stdlib/math/base/special/pow' );


// MAIN //

/**
* Evaluates the cumulative distribution function (CDF) for a Fréchet distribution with shape `alpha`, scale `s`, and location `m` at a value `x`.
*
* @param {number} x - input value
* @param {PositiveNumber} alpha - shape parameter
* @param {PositiveNumber} s - scale parameter
* @param {number} m - location parameter
* @returns {Probability} evaluated CDF
*
* @example
* var y = cdf( 10.0, 2.0, 3.0, 2.0 );
* // returns ~0.869
*
* @example
* var y = cdf( -0.2, 1.0, 3.0, -1.0 );
* // returns ~0.024
*
* @example
* var y = cdf( 1.5, 2.0, 1.0, 1.0 );
* // returns ~0.018
*
* @example
* var y = cdf( NaN, 2.0, 1.0, -1.0 );
* // returns NaN
*
* @example
* var y = cdf( 0.0, NaN, 1.0, -1.0 );
* // returns NaN
*
* @example
* var y = cdf( 0.0, 2.0, NaN, -1.0 );
* // returns NaN
*
* @example
* var y = cdf( 0.0, 2.0, 1.0, NaN );
* // returns NaN
*
* @example
* var y = cdf( 0.0, -1.0, 1.0, 0.0 );
* // returns NaN
*
* @example
* var y = cdf( 0.0, 1.0, -1.0, 0.0 );
* // returns NaN
*/
function cdf( x, alpha, s, m ) {
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
		return 0.0;
	}
	z = ( x - m ) / s;
	return exp( -pow( z, -alpha ) );
}


// EXPORTS //

module.exports = cdf;

},{"@stdlib/math/base/assert/is-nan":45,"@stdlib/math/base/special/exp":66,"@stdlib/math/base/special/pow":72}],50:[function(require,module,exports){
'use strict';

// MODULES //

var constantFunction = require( '@stdlib/utils/constant-function' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var exp = require( '@stdlib/math/base/special/exp' );
var pow = require( '@stdlib/math/base/special/pow' );


// MAIN //

/**
* Returns a function for evaluating the cumulative distribution function (CDF) for a Fréchet distribution with shape `alpha`, scale `s`, and location `m`.
*
* @param {PositiveNumber} alpha - shape parameter
* @param {PositiveNumber} s - scale parameter
* @param {number} m - location parameter
* @returns {Function} CDF
*
* @example
* var cdf = factory( 3.0, 3.0, 5.0 );
*
* var y = cdf( 10.0 );
* // returns ~0.806
*
* y = cdf( 7.0 );
* // returns ~0.034
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
	return cdf;

	/**
	* Evaluates the cumulative distribution function (CDF) for a Fréchet distribution.
	*
	* @private
	* @param {number} x - input value
	* @returns {Probability} evaluated CDF
	*
	* @example
	* var y = cdf( -2.0 );
	* // returns <number>
	*/
	function cdf( x ) {
		var z;
		if ( isnan( x ) ) {
			return NaN;
		}
		if ( x <= m ) {
			return 0.0;
		}
		z = ( x - m ) / s;
		return exp( -pow( z, -alpha ) );
	}
}


// EXPORTS //

module.exports = factory;

},{"@stdlib/math/base/assert/is-nan":45,"@stdlib/math/base/special/exp":66,"@stdlib/math/base/special/pow":72,"@stdlib/utils/constant-function":110}],51:[function(require,module,exports){
'use strict';

/**
* Fréchet distribution cumulative distribution function (CDF).
*
* @module @stdlib/math/base/dists/frechet/cdf
*
* @example
* var cdf = require( '@stdlib/math/base/dists/frechet/cdf' );
*
* var y = cdf( 10.0, 2.0, 3.0, 5.0 );
* // returns ~0.698
*
* y = cdf( 0.0, 2.0, 3.0, 2.0 );
* // returns 0.0
*
* @example
* var factory = require( '@stdlib/math/base/dists/frechet/cdf' ).factory;
* var cdf = factory( 3.0, 3.0, 5.0 );
* var y = cdf( 10.0 );
* // returns ~0.806
*
* y = cdf( 7.0 );
* // returns ~0.034
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-read-only-property' );
var cdf = require( './cdf.js' );
var factory = require( './factory.js' );


// MAIN //

setReadOnly( cdf, 'factory', factory );


// EXPORTS //

module.exports = cdf;

},{"./cdf.js":49,"./factory.js":50,"@stdlib/utils/define-read-only-property":112}],52:[function(require,module,exports){
module.exports={"expected":[0.2895207901869315,1.0070710181356387e-36,0.0,0.8061906713926075,0.9997554077248518,0.00012567725569602496,0.9961091551162554,0.010511550579050254,0.565602100210209,0.7929050446245347,0.8569661922020805,0.0,5.8710971456640056e-167,2.955280695120969e-28,0.9986765949843692,0.0,0.3738272601942316,0.9999997086472642,0.47094087321211053,0.9999999973298209,0.7733399110582477,0.2203540589436479,0.47117661546749295,0.0,4.580604419633133e-8,0.9312038148255518,1.9810631851304447e-102,0.26310093558327635,0.2889822203289482,0.9999995972587559,0.8668396292211991,0.0,0.6143703373079585,0.004269026225244508,4.445892902869999e-5,1.415811917239045e-114,0.9999999999999505,0.8096981328135755,0.0,1.2327432994343876e-21,0.8726160185156828,0.9994814940437363,0.43375983384948824,2.2245360322714348e-11,0.9999999999996385,1.1728523426801354e-164,0.9999999648558188,0.37279555785278773,0.03108904365407266,0.9999947257228725,0.0,0.0,0.0,0.9999999999947963,0.0,0.8982812887743072,0.990940047659207,1.5154183232006757e-7,0.9998696796270721,1.2735525040515678e-10,0.9997368088151504,0.9996794894935381,0.2134403226573068,0.38162386328758047,0.01845123784525126,0.0,0.014275429637322482,0.9852441875673902,0.0,0.03906225682684751,0.5112383035157336,0.5263985067463798,0.6586086316385557,0.0,0.0,0.8272445500610992,0.9999999997246826,0.999995167963719,1.0,0.9999999996382828,0.3598372110262957,0.9999965273168929,0.999999995164975,0.42353375948708105,1.0,2.834471769938558e-7,0.33031968350272584,0.999993295904002,0.008252265998044992,0.8550257241391226,0.9998896529197467,0.880282240479432,0.6117450097326426,0.29689474748752637,0.48478150911375223,0.9999999953440161,0.00029920245778736855,0.0,0.0,0.13542700309824168,0.0,0.3286353800403047,0.07926710965771164,0.0,0.0,0.7142379245366028,0.9999123880613159,0.0,0.10638299548622951,0.9134149751854023,0.0,0.4475365537823876,0.0,0.0,0.9999293762860464,0.08447564745370485,5.342347809517377e-62,0.839223637963077,0.05843225680608269,1.503896226695085e-37,9.26116449699166e-6,9.169653555454371e-231,0.9999924182319725,0.41843304244625823,0.9999999627730725,0.9999994463690572,0.20668167041200156,0.8752455577655082,0.9999988598433445,0.9284048301276112,1.580635516277611e-19,0.06417588470124624,0.5212954176315261,0.999999992106146,0.0,0.9999988442850206,0.9983506795715251,0.9999991385090758,0.00014256335923434242,1.0690616408123878e-57,0.10182707674801504,0.3181496708145204,0.0,0.0,0.22763724515772227,0.0,0.9566319864772368,0.12919113104575,5.956430083714444e-61,1.073767525451254e-40,0.9999185110942085,7.291137897627101e-153,7.386744932325874e-9,0.9994259504879779,0.43660249318880595,0.0,0.9998612183843548,5.718133061218653e-5,0.2781882634329692,0.9999868040836998,0.0,0.4087972072492856,0.3551425683935563,0.6911178278019765,0.9999906229999399,0.03746887438656736,0.296808943143697,0.0,1.9730681102329974e-5,0.997843171526736,0.9999676771084748,0.8040995470159833,0.9999741256700078,0.9999946629617851,0.2899171147370609,1.0,1.0693824203122595e-10,0.33445944250867105,0.3357988747068667,0.18857936335164915,0.009275683797059018,0.9999999999999871,0.07706630308836324,0.41043313507779666,0.09624684828610978,0.00013938442066172552,3.2655797368086775e-11,0.15197507911903316,0.49014435383536437,0.606309614006319,0.04725566423353749,0.3633471559736192,0.01992920803605118,0.0,0.8292721967777644,5.117998981282833e-47,0.0,2.0210774641670514e-7,0.3772729766384426,0.9990057928933963,0.21433031198404295,0.999999999999974,0.999998281825491,0.00104833225794405,0.9999997240760022,0.9998670676965025,0.999999999999619,0.627898826427135,0.999994967827766,0.0,0.9999999999991028,8.923544427319299e-76,0.019474950271447106,0.9226163192220361,0.9995606847673624,6.326393178218756e-5,0.7622851386995944,0.026384078458999476,0.9999999956031788,0.0,0.0,8.071661718545276e-7,0.07130718580800027,0.5942472304624062,0.9999999999999785,0.0017195277459920865,0.0,0.3670875367037152,0.9999999633879552,0.9999999999999833,0.998959978075013,0.9996431688616673,1.0,0.9999048688364117,0.5043750577157639,0.9995101419789801,0.9949691185439916,0.4603919434689108,0.9999999999999999,0.8163787435144327,0.1307506675018459,0.9999839593007132,0.8287172785100182,2.1873928289502184e-23,0.9975663915856047,5.6956931744095545e-230,0.5198010051156468,1.2829196750568768e-11,0.9999510473591667,6.866565468102603e-119,0.9999999999999064,0.979273348387337,7.366560091250534e-15,0.16891892351295557,0.9999211507074409,0.5052568850890025,4.680133556316199e-15,1.2809688373308036e-177,0.0,0.741817381753922,0.7415411830621794,0.9999999999517912,0.9999999804672816,0.46542144550444053,0.9704999348163904,0.8266665685425507,0.0,9.125588264013557e-10,0.7714949104970692,0.14822178286774296,0.0,0.0,1.892798052855484e-7,0.21493265412306448,0.0,1.5560665386455456e-9,0.0,4.944254945716177e-12,0.14297170102871748,0.9997934439922702,2.337112466910514e-22,0.0,0.9881142162807696,0.00018103761542328134,2.1030978401679426e-163,0.9275037663179811,0.12126844807427155,0.1641890056458003,9.456719975947368e-80,0.9999992892307799,1.1471196262819751e-21,0.999999885117841,0.8394414294488564,4.0535162889862636e-10,0.6986206646569844,0.0,0.9994012279916425,0.9999999999948037,0.990915735589875,0.42312705781152904,0.9999062523678842,0.9992554544783324,1.0,3.3994184484586933e-13,0.0,0.26968481193696625,1.2679827951262088e-5,0.9689198170243746,0.0007955323610459872,0.9974701895622721,0.08071813410211114,1.0,0.9999999999892358,2.875402815212404e-18,0.9953386148701169,1.9347055871762355e-5,0.40533795564078806,0.9999874785047795,0.0,0.014458489017438122,0.9999999848684458,3.795619832176633e-12,0.9999999999999166,0.9667097231859577,0.0,0.08516392378526037,5.491749766465718e-26,7.422288587416503e-12,2.8172049663673463e-5,0.14751921163916182,0.9996579835513764,0.03491811294630375,6.376528621368876e-8,0.9086378021618806,0.15020800442284193,1.0,4.515282884178308e-71,0.9989180284887956,0.7311784184800965,1.0,1.6675750776275783e-111,0.12636494683473895,0.0,0.9999791445120941,0.9999646317739744,1.9730672309893847e-10,0.6127810310295578,0.9521219054424316,0.0,0.9472102348811421,0.9999952858274928,0.9877060853087491,0.6212269030640252,0.9999999832205025,3.27041147270169e-5,0.9999994434736231,0.0,0.0,2.503436779555523e-9,5.565011833764853e-8,0.9976706339346462,0.9999587795526618,0.14427148671665307,0.0,3.7071604746788486e-8,0.00012800288211589045,0.9938925962799867,0.6676637198713631,0.9999999999832118,0.0,0.9993989130739619,2.376804616293767e-60,0.0,0.09011312226383048,0.2222012302862559,0.0,0.1900022082333479,7.88217815796167e-62,0.521521526883511,0.9987040691739156,0.9966285724672435,0.8545879850941787,6.41815041903685e-16,0.9999999999949624,0.9913796873179606,0.9993672793204526,2.9417785145725234e-38,0.9974847305917685,0.0,1.6628104684459704e-26,0.21214355528154916,0.9937444245976448,0.9997517738922015,0.9415762926652543,0.5656093827642054,5.703836798916565e-293,0.0,0.0,0.0,7.849751203208671e-5,0.0,4.4452593025853286e-7,0.2568316564657368,3.611625325525647e-11,2.1766421339865887e-6,0.3410858307697462,1.4107782354946169e-112,0.999999114520574,0.016261481591600044,0.9999999999900029,1.0,0.755134239060149,0.999813469798843,0.0,0.0,0.010265279933569942,0.0,0.9999278283247318,0.7428383899054205,4.197172726313938e-117,0.3836142038610643,0.9742253055179416,0.0,0.0,1.4103055697789328e-109,1.0,5.190155130299321e-13,0.015675212142435748,0.9656644849765395,0.4038109165653911,0.6580435317739852,0.9879420332193417,0.957116554037519,0.8152673657710481,0.0,0.9999980542680299,0.17998079191215138,0.9971964732928574,0.6779359601320948,0.6307708075621429,0.999999971233599,1.242791117346612e-60,6.701652911001076e-66,6.043398113038535e-201,0.9981764734708757,0.9999999999999993,0.9875950675350375,0.9999998841605026,0.999007271882997,0.011026357942416073,0.0,0.9999612436217802,0.9046209439736842,9.208131048088987e-110,0.9999999999876458,0.004800128272460317,0.0,0.9999999999994781,0.3107330759628908,0.9999993490787898,7.997964464119297e-129,0.3320539253438703,0.6030935838949592,0.9213133737997754,0.9999999710926564,0.0,2.3438309796419805e-152,3.1241890363716263e-21,1.5177084452444504e-24,0.97400745810815,0.579742071017343,1.6649037843860373e-14,0.9997251544808908,0.39803736277401336,0.0,0.9974988344863465,0.9643635605513123,0.8909574753149065,0.3478486107383755,0.007308679186432464,0.01422077875450283,0.0,0.9894350444625122,0.9998676271066212,0.11479723029407998,0.4611280344724179,6.294506995491432e-75,1.764169311948155e-20,0.0,0.0,0.002326083341625808,0.11315396331144027,0.3005761802295989,0.8883561481177451,0.303606627102571,0.0,1.7527001547342636e-62,0.00038518746064318017,0.0,0.5111087562540032,0.6929146077212287,0.0009569359821276772,0.9993582941657548,9.148054658090332e-31,0.37408035783157045,0.010170164597146428,1.0,0.5769574106523699,0.891186736514047,0.0002055112752485769,0.0004500700178135678,0.574598434175592,1.0,0.4183605933065713,4.347190642489041e-185,0.999999965893805,0.999996680788392,0.0,1.0,0.46674598514070587,3.6932013037467206e-140,1.7515704268453373e-9,0.9999999469788572,9.76437570230647e-75,7.606592262477961e-106,0.8481159580008428,0.4297067885577168,0.9989411530236866,1.0123249723985588e-80,0.6950779344620882,0.9999831146595115,0.9587565402456132,0.999999943594643,0.9999922299036419,0.00011792914844611501,0.9999996826180906,3.4518731258591424e-54,5.583122059963536e-18,0.9999970442751612,0.43839659550631466,0.07054311718309872,0.09276921909550988,5.475408389911583e-81,0.9999999999889386,0.9933941200342027,0.9993100958949576,0.999866726987366,0.0,0.48136672309220324,0.6318191048306236,0.7334856567825458,0.2700480112705906,0.9770678747863792,6.599713114251853e-13,0.9973157034079878,0.9968648230478927,0.9981479001788263,0.7446942865239679,0.0,0.9999999254273528,0.9999911294716597,0.9999986573632924,0.0,0.823942022324674,0.008066283513769153,0.9999999999579647,0.872999932960284,1.1231183059153798e-5,0.9963902427197057,0.9999999999996392,0.0,0.5889088222517171,6.59019843964444e-46,1.3721598675574433e-245,0.9999999999962673,0.9999613838816429,0.0012485523305546676,1.0447985900470577e-27,1.3080517476041773e-10,0.0,0.9991769796259206,0.47696459244982997,0.9995733883213799,0.8379519752230931,0.9999999971657694,0.011272341550853295,0.8845224885288934,0.8728094336759021,0.3406121603941616,2.1631339729912716e-288,0.5828347969281641,0.9998084883545221,0.999996282188974,0.0,2.1082008202448937e-8,0.8423896591903128,0.9997021569978326,7.587146580205818e-49,0.9999999997116383,0.9729404488733417,8.35631514471556e-17,0.042323415081204796,0.678071659113606,0.8174195847246032,0.9459916195240481,0.4230031944394297,0.9999968295783794,0.9999999999999003,0.0,0.9567742873633082,0.0,0.6657477134725458,6.488693392994795e-124,0.9998265183011164,0.12158551419516417,0.41247116747338763,0.4480532168181802,0.9950587303872339,1.4558617210910124e-11,0.9870661144959298,0.9999999999968536,0.9996826394174555,0.07485151395678125,0.9999993371037841,0.9999999937205237,0.3462315280008379,0.8333997418118506,3.3795685701011066e-146,0.0,0.9826670452812212,0.8590680611481949,0.0,0.23654053503633088,0.9999999999482845,0.9763969879947927,0.916349609861838,0.7432987315952582,0.0,0.9437501068661256,1.2578180891194078e-9,0.0,0.39544759526992745,0.484329174079748,0.0,0.0,0.9960992607528217,0.999999999999162,0.3810932863322997,3.9635509793212465e-191,3.1559597641723095e-106,5.939516823569035e-43,0.999999628313888,0.9938564252700428,0.00034718649650270313,4.3106957701624657e-14,0.9999999998877385,0.20307950020912913,0.0,0.003635017099621249,6.46862726928961e-30,0.9918373387341485,1.987016826710693e-70,0.44143733238450084,1.4583407099789922e-101,1.7420762848435258e-5,0.9528631394744421,0.9999999999986335,0.0028803335069228523,0.0,0.9341607924800754,0.9999031646833054,0.0,0.10704340475332158,1.20929302679661e-9,0.9982425712205866,0.10966840233090644,0.42013650189685875,0.0,0.36348766354515616,0.9658541915015998,0.43118797737956016,0.0,0.0,5.012849548893536e-7,0.9999955774806872,0.999999853878591,3.994689075842691e-31,0.840246878897731,0.0,0.9999987094556304,0.0029953440540546952,2.0921453976855106e-12,0.0018054152204320447,0.6953315543281038,0.37886267584531774,0.3090407774850727,1.4993131713315199e-74,0.9999999999998553,0.6238204418057149,0.00030606425554265457,0.35238993967615817,0.9676573517285605,0.38240771472975205,0.9999922145836331,0.0001616031875693373,0.0,0.895814648565908,0.0,6.207212499277569e-29,0.9903696428011122,0.29271497346869546,0.9999668200436084,0.9999999999990106,0.5650961910182338,1.0,0.9947069150860295,0.9081970966256239,0.0,0.9999543543243012,1.006143342998241e-292,0.9804257340902583,0.9993732121791048,0.44527855721083587,0.9999999998569455,0.9903323411125922,0.9505677899248712,4.086573735955015e-13,1.2238574292513564e-16,0.0,1.0272505526231403e-17,0.05619367963145569,3.2894462457457976e-304,0.9999831643283135,0.0004766643271287538,0.9984512298211308,0.23653868983816428,1.0,4.945488534839078e-88,0.9205716921532292,0.42981538311559236,3.7741490139236e-310,0.9999999999949611,6.82951278528919e-113,0.9962474072364091,0.999999386793727,0.9997210334497314,0.018247851290703564,1.1719265028549198e-20,0.0,6.132608176183667e-69,0.0005568718740319664,0.9813309302322751,0.27528332566053415,0.3807454558712633,0.0,0.9620788398235286,1.0,0.774424734547917,0.9999999925207149,0.7235931499875682,0.9999999692995263,0.043333254949857736,3.117944829893977e-11,0.09254874202416404,0.7744085784687407,0.999999999997191,0.999999415397654,0.99999972446663,8.64871062583555e-17,0.9905029169004461,0.9772604660475013,0.9999999999999999,0.01594667021688298,1.1643925303090393e-191,0.3769308896213642,0.012152868943038221,0.9290234259742958,0.9999999999974761,0.9066978836082898,0.6409431283968934,0.31767446100453905,0.9984021051987583,0.99565487129403,4.489858076598787e-12,1.9738285626447468e-6,1.8323245864564996e-18,0.9930268773063966,0.9990198546837685,0.9014797269283875,0.0020815017829637432,6.244709167379222e-5,0.996127003816477,0.9999536981334576,0.04434325371785387,0.5477649705659545,3.059790291405284e-17,0.5005599324039833,0.30820656830636023,0.9960756156637112,0.9646770009343877,0.9999140857567942,0.19431865413171595,0.9216130395064382,1.8613493998916836e-9,0.0,3.7587368497960663e-44,0.007218986735654036,0.2423440574815644,0.9979630291789402,0.5914411078602486,0.0,1.1286568542139195e-15,0.0,0.049895779972750263,0.9996223264870908,0.19867840447059423,0.9999999999999999,0.9980578640100549,0.9999932969058865,2.4058697722437416e-278,0.9999995401407076,0.34685746024480213,1.0,3.484784269778247e-23,0.2603610530528433,2.829812571565117e-35,0.0,3.268452839698342e-65,0.9999999999998982,0.720693117052457,0.9996797905418255,0.08219815926891735,0.9992915301148974,1.9313107277235847e-22,0.24512254025932387,1.3882501356989365e-16,0.0,0.002850758533522962,0.9999999999508087,0.0,0.6829268324392489,0.8489198560195935,5.003509167855948e-8,0.0,1.0930076246339407e-44,0.999998128737056,0.9990175773953335,1.92393946248965e-102,0.9867789773056759,2.2174927936831294e-79,0.9999012062196909,0.9999998478215141,0.9877088940242216,0.0,0.9999999945892827,0.0,0.8256585867101351,5.124468996505606e-9,0.13062124320921592,0.9978362415170694,0.0,0.9994424293905647,0.0,0.7122012458911313,1.9366081895581627e-6,0.9998188905100528,0.9929873249694557,0.0,5.693051838249018e-20,0.34211092767064366,0.000988943725328625,0.0,0.8676425698507575,2.1801024836317635e-20,0.02053206000914587,1.2321516689125062e-8,8.319931799244917e-8,0.39739634626171655,0.9999258846531791,0.33984467054890427,0.7955133227208003,0.9965551252372651,0.9999863243849126,1.0,0.6575370436399508,0.0,3.38319171598777e-10,0.7675388644847734,0.9255970405507612,0.9999999999960234,0.9824745422999988,0.000956838306177033,0.03431005397433752,0.9996224802890943,0.9505206516361993,0.9961024621911316,0.0,0.19627066338632843,0.3661261798902523,3.084656587391433e-5,2.872921353794876e-6,3.5173853377518334e-16,0.20231406873161467,0.47282872304915324,0.0,0.5564144174195704,0.044524298937184036,0.9993135641612945,0.0005657393432550414,0.9999991640558414,0.0,0.0,0.9036281327589747,0.5997946744602891,0.17153881390624737,0.6629888067335635,0.9999574822155378,0.0063740742221029935,0.9996477298630415,1.1216819789059117e-73,0.0006812801583001074,0.008978786286187278,0.9994246482142473,0.04381681940365605,0.0,4.009832446479095e-9,0.983795968907373,0.8539274157303337,0.035849606822797274,6.696891111799558e-65,0.9907495783157296,0.9870781280103884,0.9997933994122972,0.9221474980618051,0.0,2.2069328780480363e-10,0.015680149352773304,0.989084519446387,0.40175347823221436,0.9955591891149278,6.684635332918211e-8,0.0,9.153365069244643e-7,0.026412327835717123,0.0,3.895637452365267e-5,0.9726885155624434,5.019959765631759e-305,0.9189223292320858,0.9999863883108662,0.9959210597149281,2.553035891504561e-5,0.8305091296807484,6.238395021879866e-107,1.0,0.9033760052036282,0.1363760815552307,0.0,0.8349975558502717,0.9603325083362215,1.7170400259693037e-10,0.03255001785425176,2.441279088053435e-5,0.9999999999115761,0.9643616255037105,6.9191057466638936e-34,0.4008084864403254,0.977862643551255,0.9491342658234503,0.0,0.9999999999999999,0.9820992007184449,0.9968563603788321,0.49683521259551217,0.0,0.0,2.671935971091425e-7,0.5137782034058787,0.0,0.02231863345724901,0.0,0.9999999999194078,0.9999979215610537,1.0,0.00017585564548990235,0.16213750978811384,0.9999747648739044,0.9757493937010148,0.0,0.21829468791576245,0.7364509837677504,0.9999999999939708,2.874672522172979e-49,0.9475043765501684,0.4338577383256211,0.9966014773090033,0.9999939815103432,0.4217777022427363,0.4602912280628673,0.9770334189871999],"alpha":[2.960689835980981,4.301325277290475,17.78722123370924,4.4854016601065005,18.177734509052847,4.2243613728968565,11.453943654269043,9.728592131062488,1.3586612581698265,7.050974341405878,1.8619721225953656,8.485726741942226,13.816521289771678,14.451625424663582,5.453075404979542,8.874490620447308,0.13847681615727137,14.622562340270392,14.906917938844511,8.655631684418331,3.516425778385446,5.618401235691972,7.172128605859767,12.071611699365704,4.928906875599002,4.010974116491739,4.618900375654733,1.1622766201331602,0.8791314424816621,19.811927924042617,10.288779207789315,16.367855053116376,0.39596974056427037,3.1484267828581025,7.834168419325516,12.633224571190249,13.159024310070336,12.03549563381653,12.631760843941265,11.582251867505743,5.484627759279244,4.035286539594378,3.091561949396495,9.347497089633032,15.025811237469338,6.264880371178783,12.923101831405997,8.711962104371631,5.981846089309442,10.323411321067981,17.70740261985981,17.394001722464907,14.377565347361259,17.830218832272926,16.71484569890595,19.224855926777366,4.530254407192529,8.820121756460239,7.808462656689965,14.363880022691365,9.855523342198826,15.787192570654982,1.5062830424877394,1.0632245883969205,6.054238357838049,17.122716913747244,5.107394590105754,6.51886692002225,16.06891519121635,17.921631318792286,0.15473823111792573,6.049281730607001,4.917126963556169,19.125988343355232,18.282716835313366,3.527376069216146,11.795426354841041,3.6392936358482686,15.546601672243554,7.351379725744538,0.09522617844386794,12.630015844055604,15.355008099576866,8.787308393782451,10.862402475957635,9.427157136616318,0.12359915805558508,15.302324848157088,3.2523093963643523,8.99931377547373,18.056539882518553,9.888422051008718,2.2973487902651435,0.366657661309282,19.74605797400354,3.4010383011559098,5.013306759850851,17.18988990812901,11.235885938837967,10.881667846145255,15.39337345246873,5.515025126584536,2.1047639670100082,15.75773132503186,12.501421134111727,0.5072072481415102,12.99620288313684,18.16607472360086,7.9772405867016705,13.621049054261118,10.549180385640895,0.11896724227629552,11.515848482516473,19.076912337230123,19.799590272202103,1.4213253301850326,11.576060731391031,1.4342070560926334,5.043612813176828,15.637902736209197,6.753858988140657,12.060234644546245,12.812596936645564,10.177328613587555,15.214623266567395,6.1811987319990624,9.70659672369563,8.98635530242155,15.722019556728405,3.952846542187012,7.725774963162855,5.67138040826054,0.2672229237762247,9.245879855603514,19.878278920291553,17.134124651016265,3.7298806028786524,12.286548928453392,19.019975356588965,8.89651161380657,2.3984820965064957,2.2803449434378686,13.693090443181312,16.14412795283934,12.371839044108889,16.143089491677557,10.078255849625211,8.126331380776705,15.526030022311442,6.990461906954053,13.36887271639577,11.093393988534611,10.792816043340729,19.849422051398747,0.6764926745958633,19.15026085460914,18.32980421483848,3.1041060402747744,8.499814882349245,19.013201569802153,18.63038381873013,0.10129143602341628,0.04607270530094798,13.055165186699526,19.056179548483215,8.133311640402798,0.3450808816215245,16.391085552641066,9.40357175244018,3.226609762679109,9.207857134546117,8.606144705914796,10.77532173081169,6.819304468372112,7.708274840618099,19.80587793837415,5.370749581462748,7.308668280701038,0.5242158626133042,2.7451320926530576,1.3266093104075471,17.215775393931565,1.3903345426188762,2.52978495924133,1.5583185424212465,7.212553553266394,6.564602468474612,13.34109157581803,4.780062952106099,3.031375832165364,12.350137578942185,0.05294302716281951,6.44391062030083,17.574613763543795,3.326976196467597,17.350734638826136,13.99344456773354,6.375573418085958,0.05722798803313278,13.298775810491392,2.1823164727170807,8.274325185553248,18.55415309048343,5.878221095336791,11.4934393098506,10.047401510208683,12.356487879733503,9.788165482312806,11.61148694554068,12.458387789004032,13.37133874121669,4.466092039249601,14.315117720000469,17.646564918503216,18.143202231098986,14.779411456982054,0.6644625476491228,9.842562023101124,15.74982023823232,16.39030725929215,14.438972172263039,5.139991601220073,18.557448135258817,2.1987543473825744,16.322351229753707,11.437327287365155,12.844103614047775,4.255133373577111,11.869661011291921,9.320566157710065,7.3777556771517805,10.480879275757168,13.350149239094954,14.41881544931249,12.317729846536537,5.342901719617119,3.302785114866227,1.65732528061731,13.08069730761957,5.005788534805062,8.662142958001535,14.598455786070744,3.0647940166781007,9.59040379168587,7.986442048029612,16.701402387946956,0.6897535402230615,5.251826277661729,13.994032168869875,13.207967803732021,14.522667327622374,3.872434937062317,7.846859874581189,7.712097912655542,19.57725173302252,6.013727334166816,7.8624153810210995,16.553307041114074,14.625141561366455,10.62743466504218,15.418321395331787,15.488605680603008,13.828711615623828,5.288635399540227,2.1340864656693226,2.7230892448662614,19.981906987307564,14.770804543822313,2.0550464351265774,15.771089794789543,12.198318348657207,12.819593512837915,3.050966879254262,0.6707449176639413,11.11715628482106,14.510685578396796,12.136787482447229,16.952633653364245,15.517323169313428,13.148009973456647,6.128772981626525,5.927324536637704,7.727690635258564,3.3103192676545046,18.309974038330804,3.3623229562811696,3.8999350976071856,0.9157770181540048,13.695914222111071,15.128915730554144,4.0701995836651905,7.07462502064943,14.189428097601958,5.902627492864809,2.0687004571181866,17.57491377079114,17.364387698429802,5.246948585291529,9.500186008078417,7.733553051805906,5.303791299150613,19.203870777041516,10.756698558334135,9.76672568809596,17.4417065440756,2.599596139644742,19.692218663325185,12.448052087019716,8.544340410350454,10.27211285468439,8.833290357886817,17.170418338024916,8.830580867765715,15.776440929924966,18.436539535252848,6.7088434068656255,0.14804717178064752,4.667867615173615,17.356726780476688,3.2247473439519547,15.101565676426132,7.358629892272006,14.007777076681709,9.352155959505083,13.514870882748472,7.26547962496134,15.694583894551165,3.759107896300029,4.949547991384766,13.97125611791683,13.33747892873102,5.548465463701802,8.649031079845235,3.1638055288787292,3.8592401209647775,15.119825373689903,6.854347397069818,6.950158734284453,18.771446167430685,16.204368957823885,12.32177555588827,5.7551628292142665,17.274891854843016,14.350875880835702,18.60607146275658,17.642275197569738,3.440893338571329,16.666337128387415,15.204290955920555,13.593591647285045,19.640125705297255,10.154148802968997,0.6080751315171407,18.00153909446476,12.074216209548672,4.5067027028082585,11.401044453511906,8.392322282325267,17.620675412950586,7.026086673185525,16.484181671454362,7.538595308674232,8.687281188311594,10.066302301368335,18.839334483258593,4.870362918549036,10.176251876939979,11.654252843397753,16.234278652775554,12.986225231075373,2.3283950492063576,13.578940818265512,15.133787834951713,1.7198949884235537,1.3113250382434272,10.073108352575835,3.1776866667496106,11.663611395433016,0.28517721215708836,19.28965890076566,2.2560142316764598,2.7743417037920715,11.67682322047555,10.468106908828734,6.89623160696045,18.193726250598438,15.367467941010627,19.98280263943501,16.93302388452253,8.32365726047826,1.4781086345226635,2.594592593557512,17.984299720833302,4.1427802121963175,0.684012268002876,14.297406712257708,18.01757213610462,7.792077848734,15.578755605546535,3.6932008891148183,19.395846848366254,7.165420893677106,3.430011546800098,16.23620024050941,3.3801784969595206,0.7018181632227583,15.47126389411369,12.701854730864097,4.46256197079677,10.789501713939229,9.977108552150057,6.497045901960137,11.46505795105346,15.342977302863044,13.982456642402497,8.199521283242998,14.026432374115432,9.301415463101193,10.62334149391293,10.242769146965252,13.14399793423366,4.931942650286292,14.088342590013504,9.00106537692308,4.777541787859194,7.5266042160019175,4.520804416675537,3.8158233201624414,10.293125909302972,0.3012901734678497,15.059372851871263,5.9914209101786176,14.597630517845115,4.508419068969545,7.7620921444336854,7.615069630469691,12.561234692099244,5.393831550636565,10.099974222345738,1.4333555630523476,13.102493797106378,10.52538843390363,6.843427817679282,5.007551581323808,18.00378711581787,18.975199317589365,10.991280507676429,15.897527366175982,4.742061830308981,8.647522040425578,19.391645137981605,11.346360698082044,6.909562892359151,18.37092448169208,16.199051330567155,19.081882014640183,18.82871499529726,8.910180063438332,5.6059523689539015,12.19018349294073,19.509098904638435,1.6836164321080682,5.891774503998022,8.014030892038594,5.1159174508744165,16.83250978326589,6.434624015403121,13.008384746434661,10.582157105388328,17.92112845664483,0.9117909562420623,7.069760591100924,3.5892267438748915,0.9917055852576961,19.00422152163907,9.143747866556549,2.9462777580019184,5.86415490421297,0.1841666057239877,18.729910235567978,1.9459614716131401,17.015153339171857,10.838035350938995,8.739975772878195,3.1822914824321913,17.579628322267634,5.094104360750178,19.079317460963466,19.60973319265618,16.193494243129287,13.47083862722235,2.561056063744962,2.541430423588853,10.686966210429908,1.210298085218744,14.589920541181595,15.860021066896115,19.325349608446373,16.377967357248934,0.34796040543481066,10.518512364824733,8.433684817938127,17.694662134102643,5.818817875446003,9.340905525715172,6.542681402777748,15.065950721339213,6.7670488181401645,2.611478218120804,7.332842770322681,7.4714272335354615,7.770087362793325,17.325860476187998,17.630400249345236,8.164050396054755,17.860128091449937,12.524599260687324,9.966951910229165,13.851598947746302,0.5389590084739515,7.705170851156327,12.84242613643829,16.003180718895536,8.970383975414817,14.790541125532659,6.827835023230091,4.40272924295281,14.74265434661607,4.617431892430948,6.166950017517112,13.034061760148683,7.061157810293244,19.12380442508317,12.375765870516249,4.3800814280989675,12.278335487516658,14.466985627427817,4.05718490052883,15.676145250915155,2.1742615695120637,11.003272518797997,15.058669340902995,11.24501485116236,13.535131013995358,10.979988851152878,19.928095849070992,14.797520930975363,19.51892656820923,1.54804339099055,8.87862274064117,2.489739609530539,0.8721798709743434,12.815536401577212,6.82127097549424,1.681730716634915,2.930861511138776,13.961968441004986,3.8771732990160146,16.46024917280647,15.524099278128048,14.807110647897872,17.958518580641112,19.275923769012806,17.309151538969772,10.991182787879747,16.841687090066287,3.3188065906515885,8.540312077643648,7.1393692540461595,15.213412577990347,13.862659805032923,1.7381166466885034,17.24886604555101,12.878538995252264,9.166631233289824,13.460572492422372,16.28166287407315,5.160268545713964,16.918376424690365,14.912813928967985,9.443285682737205,6.214336803014562,13.428957812608546,16.81088589592321,12.997975234353172,7.588586914697606,1.5851450788959642,7.292438759339817,6.11726827091843,12.205125525272042,2.0261626602118366,11.487667479123518,14.371823985354343,18.12093488493431,3.0787240280934824,3.2356329436147657,5.15185533443665,17.77867565927503,18.066102053275262,8.289932861567738,13.84160737456603,3.041668516027003,3.213158348323266,6.015832677266095,6.32929436225357,0.22909985964777224,11.569833106199404,18.023247903636438,18.572977636909105,4.066237255040583,14.797868114275005,0.8195947065620368,7.478009603906184,9.810602140931785,6.572279880632612,1.6212548110469616,0.8586497920155267,18.176450768171883,19.745456706187664,8.800707369248698,19.263679357172897,11.434024797963236,7.577904519371499,17.593574138476797,19.69258483354325,0.058530198384234566,2.8017988633139623,18.735376759283508,19.224278803869836,5.573174146688316,13.256895846412732,19.578777290941417,1.25896805868702,15.564331010202226,10.730502516985823,2.680835735459972,9.540790004396689,7.56412244287767,8.281542141458615,11.78648939656715,9.666822871024836,9.641725557800713,5.511858858935854,19.56825897741993,13.02178168171924,6.888887113148212,7.722933556815734,0.19257242098934757,14.870224945087106,14.315975482145017,3.7701065585145166,16.047726628458907,3.652429246396802,3.138638382212191,16.695907023812495,12.398708318261665,1.0046486966195722,14.420097166331027,7.622195485818937,6.0612574004958475,7.833189393157514,8.035640692954047,8.259666323879093,15.778386658484393,17.135862201111166,12.26802320125691,18.58301231953396,8.420655763238294,16.63967466728634,3.234952290053026,3.9305462067905905,14.853989901871941,1.7774679168951302,9.3550889882387,3.461439630498333,9.66266275434621,6.22070110348246,16.41650862683846,0.47999375767917574,12.895671972883349,2.498925806001533,12.551388446857885,11.84338220461572,7.209395547243389,5.7840281456216625,14.143610720016984,5.197716132548513,5.841194444425453,17.573030376894017,9.696009600081155,2.6508431587990255,16.646360469136088,7.015463641872568,1.430260042235929,4.688688374678218,6.7212388994546135,7.336669205696822,13.394649798313111,14.349498652686869,6.083663664414813,0.5008240498797845,7.742246589866983,0.7912699436469905,18.557329321648503,1.9770241621297657,18.044698648022308,10.344924034344887,12.937133487870764,5.901604243308216,18.752051673362466,5.9900538861693775,5.21938412291131,19.58720935767509,2.887050013228296,16.057636731505344,19.36411802823859,7.008543911335323,19.56516725157817,13.950438049432194,19.399500995771774,17.19027362293349,4.930007806161836,0.3974950393158583,13.94717531355516,18.75489807519252,3.835453505829336,18.536743374283837,8.657226455832445,17.07353567281601,13.3303296869625,6.7676892190261695,12.226152336460254,7.759880039401312,3.780712976113083,16.35845740061486,1.7205677300691802,19.725424847544556,10.775922878075415,2.240870022938992,0.29480325776185534,14.475630608642183,11.510444439245076,12.153503924284568,14.118394534380032,9.035445535712817,9.156406758247844,4.39739533032935,6.546097287482673,16.95286128602755,10.517258729403135,6.597784617132723,6.631215230689196,13.624662703503292,1.1572037900816312,18.94943025461224,3.030048338535849,17.24626867333752,7.013345377009856,18.513980532439504,14.484705395118468,18.581189893651235,16.67367886656653,4.883908047883878,4.0568728263806175,7.718263387099569,12.690887144777413,12.507788210649649,11.82393558626083,7.282579585448086,19.9834189543811,3.008508405470929,13.558706119625432,4.253659944418948,18.21297542940084,0.11882124641057867,2.6533930643113512,1.9650756803635572,19.897365601580894,7.100656910943073,15.266658326114113,15.100248739731086,4.642086193633048,8.068865269113052,13.662955310183932,9.67914356497047,10.85855748055506,19.57434903197352,14.351650123894695,6.996443625862803,9.744638905115348,13.483279850576547,12.968384509024746,17.241846592747233,10.754497587689515,11.921489515121898,16.6326602557864,0.7717911760041485,1.6032581487048247,7.187201912806409,16.265166857789257,10.012557137478852,0.6027748949257905,3.369073259922879,17.381019238347093,12.356323006454119,16.435970586114404,4.285149747340773,3.8649361165164375,11.732273950959119,1.88478464281852,17.347835598743437,8.209217881326891,17.597056965083556,2.9053163271816196,10.239013833094521,7.974861923094778,14.592206549400593,15.890260951502206,14.822064284277152,8.787040556275008,17.294072962782217,0.397684311650055,19.512300568240683,11.886582157278616,5.615433731446942,8.388749229101041,12.175380285776756,8.611589923829746,18.354137566872694,13.329249964479036,7.308317195517442,1.811224536392757,5.6392175106141895,9.078790277252287,0.682496557190917,15.15017147824076,14.947965092710449,10.053025159570801,19.09481585245298,13.392853171339718,10.2903110515823,1.5581344401887565,12.552012047816813,14.49780241734219,11.787412648235978,19.006266516066997,17.708874513737708,16.607798561352052,16.16245245670896,19.53999867765748,5.7584356509119505,8.94593811051922,14.69644635080166,11.479260676556965,17.67024017701604,18.214878528199804,1.0949393958896536,7.911878216405848,1.115113737078186,4.963102385972484,18.60624705672994,3.5801364747073094,15.989833870384317,18.46652149399471,2.521106239650819,11.713804880415172,12.296437428309126,19.826472083994894,8.638048617416437,10.029268045728417,6.953183431079979,8.542156406766054,1.4506207628352197,9.175726940423363,5.333926013874213,14.49258170046043,16.541227810982075,10.844463040035617,8.765517975916225,0.18090560917465304,8.783384492695596,12.498817574867074,12.785857983482444,15.589881171805601,10.799619609645026,18.544972194997715,7.981281225861534,11.971740535391362,1.2156541453048808,11.229584888424275,2.3429395214917026,8.07570389294657,5.3344849421470375,12.747339093364442,10.881394993894617,9.587256005563107,14.054331463258375,4.072990100617688,1.014780134041886,16.428613479548932,5.415849998004898,6.306220669710472,1.3336488430487137,0.37096964819557154,19.52573847652966,16.205966769580314,4.055941642943548,7.024752284748033,8.315923594395702,7.994906124224999,11.628895343837922,19.22139817716523,7.249802452875809,0.6251242348462194,1.2580423562153165,1.6464345217609244,7.293633441450114,3.224057436652581,16.062869364206797,12.238306786038295,4.05033183851172,4.364721259019264,15.89517824411439,8.92423141558805,11.43714318034959,6.992897398972966,10.207380043088627,2.187613909462418,1.4801085100931788,11.223746068632678,14.040444458083975,14.303007327666668,14.935960998466914,3.4691694324729516,15.095403093737904,3.8873662776599405,4.294635988948774,5.578944025345276,0.23077503052001624,17.026704820931798,4.959585900045065,13.775009110268996,9.83464231943801,4.580663528590105,15.08153609224296,5.487336999003443,15.746612373273967,6.674846662565166,1.0234278815212061,9.034844407575484,1.810307744291344,8.059606917908745,2.2349680169304786,11.77457083764924,10.295004646146495,0.5413178018431664,3.478806566172774,15.860799337096147,13.52605517404783,16.40976706724129,15.772906645426064,1.3920765692977222,10.341955469857208,14.198478383087094,11.860246576923732,14.216225493313651,4.437811182711591,5.18628823569399,3.6494784265740643,13.324734122411407,9.753554194677939,19.892795486162814,8.315536355490675,9.948245870315603,15.174961201523093,19.96955952657357,11.649038754496157,15.486568225750217,18.506993318982445,17.6800563933417,16.28941034708763,18.59461243515508,5.476277897122701,19.685549752679968,18.294157011932775,9.934349372373546,4.363396877821808,15.608240646388136,19.13271621204362,18.683816525776308,9.575658184710608,7.882027669852132,12.138144210028043,2.835334469301327,0.6481610513104563,11.032576267578659,13.990924622478516,0.7151194775411662,9.452511048832175,14.935476031825953],"x":[7.547558448825546,6.086057319891475,6.923596818469477,12.167490943512295,13.532146559207137,11.667718819635208,11.285151137997296,10.627072900695289,13.372758927801572,7.218812063211699,5.380244586651653,8.480316742633612,12.257200755816823,11.267472120424738,13.802376963782965,5.5139098946310945,13.69575319819172,14.075695451018099,7.944751851219407,11.890265677493703,11.302424551083405,12.991948964501635,12.763957562210006,8.684888527695476,8.389317928476476,14.226902871342276,5.574026704102881,10.213804435425576,11.557798116540976,13.913919699510293,12.746120515229775,10.323024331205314,13.910912532501369,6.727539211838048,5.146614342966016,11.643265155651266,12.414732524804158,12.376115094738648,7.024441149102037,12.430512691062388,12.33386078393897,12.217245409621713,5.938923881854308,12.816594298459512,9.650939657041306,5.089445653591833,14.351185288316975,10.28029165266171,13.818917522992372,7.930659539872254,9.480348751988393,8.551658046979817,5.895022741562752,13.996854651797818,11.900397127305762,10.614175728922612,10.70957394089599,14.252781503390743,14.34922557332753,14.611697472027736,13.309555279736626,10.235279353172826,5.990077886882634,14.652920836769347,14.203904150690327,9.303446238713313,14.864510852975174,11.019104758766725,8.10872177229647,14.04511036099948,7.358462971170199,10.95932337064805,9.793962438039285,6.0331897758973945,7.966199176100002,14.283109492665993,12.176002259218015,14.48389520621085,12.26983913771994,9.518543131243934,14.13901287173273,14.477401613389645,11.930553608342594,12.67944899948998,12.96317577489799,12.547637859059632,7.80793724277919,7.653789109900691,7.034738291234026,14.108214927161942,14.562341332605763,6.315191810416834,10.914928130053084,11.651904800432899,10.957194453968597,8.120360815193923,7.5201087276210625,12.39436181060113,7.592421185150037,12.926393052387493,8.923550851856286,9.844532202885157,12.751526779048842,8.26625351346869,8.143103365721645,7.806828159107235,7.384902651849689,8.195097890118426,11.859463162606323,13.751906606189854,8.032908621258377,11.038564284116124,9.004605079037935,6.096619747583429,6.842656789037109,10.573183176383917,12.538224755933857,7.614968581614441,14.924834366073295,9.982522412999701,12.826985989789108,7.880530621009083,8.717617862069728,11.155460496611195,14.678934923801902,8.569766719645841,8.769864222253613,13.014470855294482,7.420527717851241,11.164125435632233,7.974948578236594,6.8519192394300905,12.968746598829616,14.740925324046461,5.734576454291258,10.292511116826859,7.252330255384029,5.445231634394196,10.341744788361503,5.616607009792888,6.327787004429966,6.431916840229269,6.865539029011765,8.328223427336601,8.466120843874513,7.400416378486563,10.263591949078556,13.873248780021088,7.950144767200904,7.203813391417646,13.562584067663623,9.471309460316693,10.654782463406177,5.011537646252917,13.470812362754144,5.383241535591397,11.523673181989967,7.65736302181649,5.099040255315568,9.605534603466648,8.867669129605405,12.04809666136508,8.495177909443338,10.876809002535115,11.838907701317137,14.944858151561844,7.19936160733795,6.14446602362241,6.526694019866475,13.499207927670485,6.835921027508491,14.089311670603317,13.782098230781578,9.465598134481922,11.632247828797617,6.427203493483519,7.64295589767973,7.077871287509279,5.967524776813342,13.159335854794218,5.977254489956105,9.458999524610903,9.777918342531724,10.76648419975211,7.930415398443767,11.457136782295144,10.956187138186245,14.926101783761148,10.807831982386551,10.065055569276897,14.242425786156687,11.868222380638338,6.9523781734498735,6.533280188928208,14.722625063237267,6.661075940803545,6.845538939776383,8.63928980703072,12.100381376826817,10.884280418522586,12.65914417521036,13.103119617078637,9.145434696627266,12.253229001729657,12.413376530125277,13.502859518570185,12.818748134301956,8.394977619264711,11.376092218752017,8.553621549615322,14.713799950329385,6.060406605534123,12.961797147622146,9.309556508518238,7.93263915122461,14.841175127812678,9.337205806890271,13.283672070959543,9.898793357875565,6.068004174750852,6.931724440224403,9.577883183177413,11.210566583410788,7.273801770586461,13.926571773476768,10.171134863155466,9.916161186257606,11.064790111091439,14.108507906071033,14.529832704663878,11.314159865706628,8.650886788842751,9.386753581919866,8.861989516982131,10.222601573931565,14.679455905542,10.323510294149651,8.546741069304606,12.525820397332295,11.395225416056455,10.706870862369868,9.926149694525005,7.080293722084137,6.915391434231333,13.351828487505216,8.363104387524867,8.924996439461445,8.266395350388066,11.73181543632976,10.613575023186598,14.237367900786804,8.605850655137488,8.669131033402547,9.784769888677205,10.30721996589692,9.127446626576356,11.764843358843413,12.226480826384432,5.110877307211254,7.949907985228537,13.613150989659598,13.031800827762874,5.128919626547619,12.503845814967935,14.850799062701679,9.588287667152224,10.273530924039147,10.262967393571214,11.978844015997925,11.993168722606761,5.720588185648672,5.3375031951396075,6.88686115804601,6.878708608323367,8.129353911706067,9.176191885118701,5.9871780206454694,7.494709094155876,12.101758158996924,7.94124136458453,9.46187546142582,6.413239911783779,5.7017654834532605,7.909001679475316,9.682743222192558,6.277707331919173,9.376668969330558,5.320722149047219,12.088776793104225,11.833282797358402,5.975533131605375,9.39953415588475,10.611397413699713,8.933707560451031,14.891742833683479,7.410702654689283,5.779931221532701,12.960198641383016,5.076921974396267,7.17820028505921,10.043074981265667,8.550215800523155,12.908006584493366,12.874210253769638,7.074898172529213,13.732371059991435,11.799095583176069,11.844096802763076,11.55759812552384,10.646551638993344,13.761793868636179,13.985304479614156,13.363899597243972,5.803381080034136,8.260515623288606,13.965304941370677,11.251648575234771,7.799197811030567,5.822950801276656,10.969825903734263,14.952023083055048,9.182946911499432,11.95317362049644,13.473826210783615,9.172989690097639,13.671636498874113,14.469214991384433,5.384288788300502,5.202917363305071,14.257827867269341,14.079295991858432,12.01349954619805,9.460112758724433,14.451656150824574,12.639302558869618,8.902980192668457,5.163072504825643,13.218393542211835,9.285765932592575,14.014164197932832,11.861443624367284,10.947137971645367,9.260787212737537,10.181884892340559,5.112255915570918,13.048506958923936,13.62190788408209,13.73394318321979,9.651370097475896,14.862964831216946,10.812336600756513,14.78782198790891,13.222429596819898,6.712793058732414,10.847302081934194,11.709086067034864,9.600926954661858,6.207582094865223,10.985906755607795,8.608874908832927,5.976517549742237,14.915084804167902,7.77483447670642,9.211477541682989,8.0972372632367,11.823920925326272,11.165195087471787,13.18587518607197,13.701340713285635,6.744288443192845,8.846341463570129,11.007202159935929,9.913792779549668,8.907805278103286,13.60649647694129,6.460289925545489,7.825488832130098,8.238809825622223,11.042798272042102,14.518999498069459,8.081961976923866,11.956521325654151,12.893453228722478,14.365867425015015,10.733889211482975,8.69010615899928,13.75213839071212,12.011633106007665,9.509298617159734,5.530412560938538,14.449991629597097,13.907751170715796,11.119736190958818,14.725721210410669,7.032108188265824,11.152436794236877,12.510809318450143,6.337384963834253,12.173786594009592,7.192095703222243,5.38948264637503,9.158853299844633,12.222687512358593,13.219194718073908,5.275227161010658,14.913243905711047,6.632030474746853,12.766296306372418,9.717314817798094,5.677346860558295,9.045674661225211,12.467972024988933,10.58870973190478,7.984459409164577,5.384545497743602,11.829140329758605,9.371590101470478,11.033983333155213,14.572509421895209,8.366896415998726,5.216596989810642,14.659583438470925,10.070087789920446,5.219143658990388,5.757326864639765,14.083703998894526,8.582887607821547,13.312680321070808,10.73069697218849,5.05401191309804,9.482149310028303,11.203715212477107,11.173605004527207,10.943176500956653,5.283305832221583,10.35575216203469,10.823141220785894,12.362254870164948,10.118155617027648,12.293636175867197,11.755332497207778,9.685068065460525,9.200187703858054,5.505610790946516,14.478379697954242,5.761487807639192,13.318198940166596,11.756510652823277,6.759726687882961,7.175054365942373,6.278251352486707,10.22714562236699,6.097495872299872,6.13084653904556,7.66817012768731,12.029411277427645,8.814891949747405,14.664003230850081,7.409429403487691,7.302979381802914,8.861879296405855,11.640846683784789,14.260960103938183,5.9624290196638485,10.932907147552335,5.541337025437265,6.748874815211414,11.242228129887899,10.605737352036705,5.3995083918115565,9.170682260311336,8.616766198945013,14.121601636545284,8.420807303795081,6.448743410841402,14.15581026465995,11.083023888887118,14.739807635909017,5.713157483267322,13.502037119792194,8.588614865142542,7.816695605711715,6.579943802221139,12.336120426320534,13.142862338980368,14.831921466042884,5.288037317978949,14.876842018108256,7.54813092057991,9.782699510053698,12.212583298861293,6.961017930955413,7.162193741869101,9.973142499085778,10.194316090156,8.946370369022043,14.518869572794058,11.528695240426707,8.892155653101867,14.941674450270492,13.798495835687154,12.137623138414458,11.121297805644918,6.249603071417063,13.527980090256156,8.026060208634986,12.042287681680353,9.324351294169377,10.427313598872827,9.203927509502826,11.86669950979815,13.458521058248362,13.941471115701614,13.074754965993812,5.732818763062717,11.705321294792439,9.44624238638793,5.075298333484907,6.142293755795826,13.675764619853956,7.618320976321447,12.143786514459737,13.415910345549626,9.305913467058836,7.292564748410539,8.913725088633917,12.906913218567453,10.457063592290021,5.007968858911777,9.710264936709056,11.188851955353257,8.303606335452894,9.817814927632453,13.657849727688333,11.826721901520349,10.553874566284788,14.103083966522068,5.552832690476337,14.975667790432114,14.701817687598446,11.869444809727112,13.260962521025832,7.1148800059977475,8.231766469630326,7.437463839191823,14.854167322756865,13.56761574883988,7.594297193554742,10.459159085896184,7.984514739011126,14.666086846997286,14.630101371187806,8.160990553797136,12.200072171169145,6.897592585294667,9.109277388451636,8.662652352253595,10.201706519764882,8.792703018927755,12.849642944134686,5.962714400006163,11.133982432675587,6.214614496948521,6.692172780988434,10.227105926292841,9.029999226471844,10.6433338225002,9.404070581780886,8.110041396481089,9.363187974025355,5.024232060038254,11.83386062289065,7.319116549846731,6.913220510327729,10.237837543693109,9.057564442299038,10.368329332009274,6.314007929744148,7.124581786992645,12.328027879467012,7.146340801346758,6.18264507753681,14.496205049170856,11.101108523898798,14.400664062777295,5.3863733494043124,13.565005640055993,13.007910857431174,11.985092944032338,8.898566074439117,12.052756964171316,8.679203876132199,10.745449851837662,6.8404369734462716,6.839017030303718,13.848039552697628,13.062009043001277,10.672067935241198,7.913583180181282,13.752806512091386,11.101862143024917,8.515316406653122,13.363349045772086,8.658085959927014,9.836054270035678,8.893498373512402,12.496825945912436,9.817776034376706,11.78322338687379,6.107646730883349,8.330859748229031,14.973081336881783,6.594642529938692,14.03023862595882,13.347746153548867,13.384164304753059,14.303296087006327,13.83294727670581,12.151989120395687,13.892959736004958,8.61533061916335,13.854145948971084,12.942199472545218,13.284634183222192,14.28867343942239,7.1058497269813214,7.061544082928952,10.369801108094368,5.572825620534479,12.502962294640072,6.83316411435984,5.296763806337131,9.067704357784912,5.605155547338994,5.189430894179852,13.89153987371911,14.019454469587219,6.976096015199092,13.842898475328626,10.835435474950167,5.0010083969167525,8.612989145535918,6.368984927480681,5.482598071928941,10.96887892355489,8.131287317330996,11.14740682116329,10.786645449768745,8.53239613604513,5.919208942668188,5.357827105608068,6.459641496086883,13.735388066230442,5.794376690962353,8.62750999105716,7.226614098957331,12.42388218679859,11.562040226385573,11.87289988543993,8.1380273323864,10.95417382410427,5.72622647803172,12.326491987379175,10.019948593734433,14.689671377175186,11.64301995508896,11.963624401457727,7.568268718020752,7.78731411321764,8.8346117276867,11.773984001632027,9.733936529714896,7.87106459372505,11.264540572194921,10.59142302330497,12.733917307703276,8.98962067975753,8.92964721735505,8.03637130596101,12.283781816882078,8.613067099916304,9.292328570238592,7.58663978676112,8.539976407765188,13.837830325703049,13.234316685939362,8.361515206339948,9.594007786943175,10.674629639113792,13.289813554848063,5.8916863656734675,13.159985124051875,9.204890795972904,10.573284087619879,12.639700112357069,8.73580019497405,8.82057400381277,11.253360610159401,14.958296362122944,6.010002152702478,8.078945457946691,14.72478177656024,14.67251730436098,8.712632862955136,5.03511995535683,12.066601503441625,11.183682262654395,5.439185830114601,5.2674426106527195,12.018579236641116,5.8099718330851635,12.340377235558966,13.759614104588941,14.689796977951916,13.400951434260106,8.161084641023859,10.91292460526448,8.446352038280926,7.6225746272755135,13.243904296279911,13.258472650053276,8.079518687311136,12.008918258607013,12.503695699530482,13.996049963561779,13.349317213534402,10.079778008665352,5.608250314616569,6.3940726921524815,8.183450284435551,14.535945777899375,6.981695411522278,5.557173113313494,5.033590353097681,11.236143490321984,7.377847735457155,6.881807809726645,5.974932682915535,11.871206072592098,6.925508200367602,6.439467218856283,7.170168280109324,9.353534596187878,13.237027792416772,6.280229765250169,13.528544903263525,8.00591800257735,9.652069410989911,9.913461195335904,7.310409396418656,14.603950821056063,14.294910048493419,13.487820431970237,13.467183565036489,12.360753033147882,13.691438339526123,12.374561013080625,5.881807867000983,14.847450451584399,9.866530165226086,6.7775438889826685,9.584828992569745,6.177163359493032,6.8997981306444744,10.190362677073717,6.744605069853662,9.203936379562867,11.833634441381191,7.8372324077398,6.116099736335608,13.942880908314079,6.429672697160611,12.256181065258513,13.143774728360798,9.749996617149128,10.867652407042137,14.668313034360219,14.05575181882585,9.115205956337382,9.57587516657339,11.320279397542878,14.740724207978456,11.540847361381473,11.376986195788865,12.05984847641689,7.027494502575376,12.024381932958645,11.384140677237117,13.926905417464834,9.48663911242117,8.635361979792302,8.113184521614226,5.023447377131916,5.600346905402347,6.573264169074193,12.304222328141403,9.82318925839525,11.78183663650872,11.542708993937405,6.750439301123283,7.027754464490492,5.891620311373713,8.66120023036147,6.318397259797641,8.178328499591272,12.255530257508722,5.463392995693221,13.286423414166348,8.34127734548338,14.651317005196582,12.520153834488262,8.056047905819955,6.7153697858135715,13.494022032499082,13.067581168955861,8.576260704655594,8.650286614414078,8.8124298796886,12.633093316886153,8.84191141702919,11.502043324844468,14.352830384753926,14.311083396837414,11.821346339642885,14.593898219075784,11.81302676925405,10.457683685267407,9.843688749603817,10.446893646039557,5.826537298020762,9.220110133327752,9.8874874581752,11.806847793669462,12.790400539348806,8.834458203486967,14.75302430009316,11.353761452082383,14.417339842605259,9.847568604956516,7.053666269718972,7.1237155194194735,13.945738680823691,11.458899179731446,8.936675054997627,8.912264961408507,7.546668224281213,8.566067206382728,12.21402175620672,9.522983312574615,9.440850816893786,10.993030654996893,11.132345039246186,11.38937045330909,6.812027052696321,6.324019196502575,11.2235526079464,13.079008066030688,7.4119556978949745,9.57062767899389,10.106078934162817,7.012985533162954,8.289006091200823,5.789497197700091,6.715401620110921,6.265333097253114,14.08735229620494,6.619277028341037,5.3422647803048795,8.842334474606997,12.88772090412131,5.574673121199069,7.982001457347227,12.221839387061221,13.091770049678148,12.10374149471448,11.578601106981655,9.919930774316061,14.89488526865918,14.642041278354245,12.714784323573038,13.332256890515325,7.158119820116666,14.822021292482514,8.645721397476224,14.76630962583986,5.4647379865973615,11.437840636399507,11.7703076509781,6.851792766376283,9.325330391760202,13.424248235733957,12.16208458001838,13.390683487640654,13.083621347525387,8.051464699903704,14.915695358825792,11.687228600533153,10.88742201799018,5.0876200108998155,14.527678912895492,10.559530898597133,5.6028087997317915,10.655365829670869,8.335379075231721,5.4597942132691735,9.220257661288878,7.155584547118055,6.9422154700116785,5.254688093443081,13.469511854977785,5.368190070651857,6.09600004241506,8.12531907500804,14.507698872859615,5.9862482756791024,8.308402098298778,14.865559200979037,10.281187869074664,7.896785170637739,12.09291556939682,11.340862143407547,8.134620054049485,10.15698260696869,9.850938405918733,9.03789046544118,12.908768308736722,13.592745714511413,13.093683436869618,6.7486018008579185,10.406487410797231,10.42896569609545,6.657274219093228,8.112089055753085,7.756794986365794,9.310124312558303,8.237533275817379,7.836000651408018,10.343052203869032,9.614773223379851,12.888498896696554,6.787929972057967,8.752014850120862,8.494845053836888,14.556575400675236,8.361152543124895,12.683091523477332,13.988076870790785,7.212417312813586,10.392187417162955,13.603240447886833,9.02867852625819,13.619009653231053,9.735807902599465,8.579715675395898,14.03356228161454,13.54515423307303,11.490553960970637,8.270700876583758,5.222717602136844,14.238072439384307,10.53661319415401,6.029890347364162,14.392453996782038,7.656632365635785,9.383033547134538,8.362059952517543,9.41116928526702,11.997553491119264,6.835622166213264,5.382149422931992,14.301152086012044,9.529150869098984,14.381156816370115,14.558031762751396,5.00134854399869,12.327102721530245,12.011165777792428,13.62948783025499,12.474083184020468,14.44162530141998,5.4557016661764095,10.293518227811214,8.589820666545972,12.129954576792432,11.709475139954286,10.348040505755103,13.917704747988903,10.811575412230617,5.833825436375626,13.38622294057567,6.818100823354163,6.291600631159719,11.005092192543803,14.452071864141411,14.791200774047386,8.713850588724647,14.996637948359892,8.425246987863677,13.758340371589128,11.129872758804506],"s":[8.115301981562695,16.996402534058603,10.304220236896011,8.641057779422571,8.564250100125017,19.618605269057344,6.953079865287637,12.419448067496365,8.840245743649842,5.868001559434282,1.9723666502985404,18.55636002215748,18.851079167188033,15.014788194513681,4.094253224756947,13.91704689571418,12.186463925940929,5.029421600294377,7.795002521149601,1.2153043127999696,7.680441390462409,13.98487783887612,12.267854493040131,17.402915753255428,14.888129349019774,7.364316900602685,18.162713599631676,13.098152391052702,14.780682635377511,6.617066043867181,10.550018689827073,16.221562054721392,2.262462647067607,11.5321647697262,6.906906552730625,18.093308321215208,1.210135669386947,10.875685725548404,17.86044260356946,17.368361794883917,8.5757113575796,1.8744402322034004,5.603002739764902,18.04849867468959,1.4339403439101206,13.12173809574523,3.8025936899550583,10.264534202089646,17.014573342410834,2.443768674925275,15.162641166086264,14.806004541657005,12.042640041667303,3.259793290070756,17.85801876134711,9.450527771071782,3.795490010356861,19.475778417773867,4.5634841553908645,18.16425812162665,5.7669845596655245,6.148589199442687,7.993685410661988,14.146851018906501,17.853349713881656,19.47854880337973,19.731951902161946,5.777742680007032,13.51037232176504,14.997961190628466,0.5580071591620994,10.184357859300789,8.200449380506424,19.7139725085599,14.327508750308704,8.915133832478933,1.8836794036431614,0.5014162587108428,1.0025965372844459,0.4945793090380324,17.788033675044005,5.351060371690779,3.428501180379846,12.46223087526413,0.40317107455412504,16.73212878930716,17.86172553722099,3.5138260893908013,11.392938473328268,11.48166768288888,8.791729405507635,5.127818230569203,8.011663736174018,19.790567256739614,10.779480657318029,0.0288229615612412,11.418067625925108,18.736646810869438,19.0535077903637,13.77614777828506,16.805930240103656,10.037187125854485,19.83771722722807,13.279366492498191,16.170291085267298,0.9119838134301173,3.598690793916588,15.933685273364627,13.121641974096963,11.528885803928395,15.791140325798878,1.7640559685315704,19.20207163782014,19.531623536388068,4.222525019405947,19.98273009024077,19.22734060819312,2.261296994902824,18.356327047274895,13.260250633916733,18.43634247207342,13.256318321024821,3.473548049544717,11.005391788478178,4.768753927381892,0.8331850525805384,9.19098343049161,10.399678868848117,3.1076183589919637,5.783440742933226,12.987884744750705,8.187837108396177,2.6084105615295394,1.959591966946359,13.577572476147584,4.634588098028898,1.301724135687219,1.747461127589065,11.598327206498386,9.716955435168009,8.929787699675433,6.826014526227313,16.81802585356087,15.715362756276443,8.738694302700235,17.314218836843725,7.53401176153639,15.151278753381664,10.922861363481736,13.756505179323222,6.706429888247034,16.061139776217487,13.97773460324732,3.4410851049563362,10.204520209066246,14.184199002660876,7.097964231746552,15.95759383312338,5.2490411872593645,5.319625259756884,19.49435537280602,4.009296302820293,18.013537270243198,10.07805355694176,6.448573846475725,17.297691040136968,12.648522740448467,19.970759003727427,8.40877101640685,2.014383620900957,2.2239119008789476,11.803980662799521,5.171407604071256,1.595681671724618,11.959131806285699,0.6334114183948625,13.698136123232118,7.166522278059548,7.049098232560356,15.856167564347796,19.13194570704464,1.4754251912222438,19.242002142355513,10.284254609107277,13.687623806947741,15.5081200486338,17.795429666345782,15.651866598604919,10.069586380898059,8.009692447380496,15.58917912855858,14.977871221235471,8.592636072170091,13.38132690442058,8.897431043688595,8.717870340148849,18.34675155608447,13.267924797797797,7.744660680589632,6.472045505736661,15.429872411226446,0.2989016776509468,4.471939215493235,17.003235096585133,3.335786330811157,5.554186576012432,1.2670098458532308,7.763919565995945,3.9783210580462702,14.687775887340958,1.8482360208797433,19.209374299028713,14.264408092955536,8.071144799734004,5.180630874972039,17.303678142806696,1.3118881473827493,15.144853726113482,2.91730503318008,9.48565270987868,13.164483612460366,16.011472850309538,11.81280772078576,5.404724072124245,2.025619877562188,11.957823521483512,19.153545553665445,11.070389072452688,3.3340973272073793,0.4829223630783952,4.4600034468652305,4.0563193758851535,0.2592173467479153,4.662447659964228,9.912725627313993,3.5255710167552,2.081012424424493,7.332229441586744,0.763374989583272,8.285708555660577,11.621749602872512,4.659474689071215,4.103228166716688,10.444788102269298,6.28541088764464,12.172468255056078,4.825380408900437,15.267212377715435,5.772468260304389,16.225468853508076,1.8042439628995943,3.1712783015101342,13.512024620901135,10.543116924959591,6.361391322417589,8.566092913527061,18.353307426957024,17.577996042023575,12.16089723830744,7.095405956173897,12.587923920214902,2.8113181185221148,1.4208406580187205,11.88572230538858,2.869271996317968,5.214041696782181,17.058236629266958,12.604574255850567,6.2125389243260365,12.495099169965297,12.354897848942086,13.280877063499329,16.903899649711956,13.061604844671638,18.373221955256138,11.291206591779378,11.317343884342929,9.083502875063338,12.631915075159931,4.165087544136452,17.902621445705897,19.865425981248794,3.215469772118489,15.159203325172207,13.382970822069433,2.9085294817197127,11.354971462161894,10.150603602578684,17.67638007944084,4.642086014482185,15.485283165761455,0.9821352924004412,9.384884489773949,15.03831126072756,9.071392911786802,16.330486889947778,3.7699487787751007,0.09161579148484034,3.096679512827145,7.039651977228987,1.7474563208057114,5.876192387514947,0.3796157546703016,18.155423052445727,16.649833149544428,15.237748725460833,13.343744843239937,8.973185984579853,14.546434025549368,5.9490913011665425,15.277567529224982,0.13136530429485926,0.7653910365476735,7.336620188174985,6.174505103569001,19.92536024283887,5.649568072874693,0.694733988726921,15.880544388862972,17.164650620010033,4.538006823254821,14.3199143997919,1.3924770281849996,9.381458502696303,16.043223256610556,15.47764417134523,18.744855725874757,12.760533060233614,8.363262599101953,14.935859171067492,7.739641244023723,14.942018308667194,13.087851404226122,6.885970625110875,14.91764785830506,0.600015282134545,10.845540955828511,4.948695224640383,8.7287367149052,0.356632216876247,18.59755703719154,12.42083861122901,18.976844251336132,4.804649064090976,2.9469259746140164,15.560963896343004,11.069729662367621,11.461422298829799,15.876623517908314,11.994811763822897,5.7904166059773665,9.594835048143242,3.901336385097731,2.4830385692585377,13.161449418092875,0.4794001005574877,18.527414247448082,14.460764311186352,13.014593032564047,12.85248543080305,4.137751920296817,3.908125598491803,8.38916176919648,17.83452249138215,9.414534818681432,18.549283697114213,6.767332480871167,12.199206279268076,2.971969454349135,16.37013188596307,0.36596244233747743,15.816117661756,17.772709150155585,14.843629429623459,18.57595412996918,13.824471105594927,9.17988998365082,12.590734380401635,2.451290978803611,10.286412196636473,0.6486665122057733,6.136285452755135,17.481710930741734,1.1969468720980947,5.390964419620925,5.7971488036710905,18.38189860008076,8.903213566662775,14.145477195875443,9.032813745933751,19.44141706418295,1.9698168316973685,7.008682385135971,7.472927591849059,3.0904269889293623,17.585922466704996,18.438244120277616,18.520482990503957,19.788850850471377,13.212999490770404,11.34356252160147,13.318217274826218,13.367100869207555,16.079130871402487,11.276261270796436,16.54560147364254,9.494549487711481,4.26122443415315,13.344791431909954,0.5427807002251361,0.1777894452457307,10.254381500420546,5.006976791431774,16.393107919898583,16.48580327806874,14.240968802536615,17.601253402718342,3.9579005178659488,12.99995215242635,14.441681691783185,5.199644287934957,7.00039681786389,19.453678199626204,15.970578490596896,18.29665827812676,0.0055934938767432385,17.977251295607466,19.33707642652894,7.746528224140112,3.652817837004503,8.949212713866018,5.364827156415255,9.01880367975159,7.6935581944320885,18.008590564315714,1.8417568446041388,11.297989890392053,4.159325298052754,9.214447461506868,7.160339399370277,3.123826392344715,15.466444356871524,19.13410723791207,18.738990074804292,10.200053066076752,0.9121066469484251,8.938090796123328,4.305019898704012,1.5727872931397213,8.539766481828512,16.730661308939485,4.177709903443283,4.370939253090351,8.282280947828546,1.6267008426891127,13.133120328359983,13.36366088380939,0.6134510305640539,7.618505370182378,2.2698852586579976,11.860987491482051,12.33519132580167,12.702481470675838,4.363730764967051,0.36736796788665593,11.139608305417967,16.76629949259575,15.119758458701845,15.484134077657377,4.407792096924377,4.714620457047833,14.05130244817968,1.4381016504102284,7.752004068239944,9.336854690137448,7.352647461977027,3.59601218836044,10.200222598074507,7.679644678334796,14.700683429908953,18.071857913269874,13.973296207518802,4.326151476416893,4.440691209644991,16.75243441475604,14.617432400275492,14.506775882755205,18.172042207897164,15.174224719409114,17.28699595543239,13.960884381268217,9.435185771618544,7.7000668185599785,8.1680383717482,11.786572773259302,19.144471007080284,19.846157718716285,12.826830084604754,13.52745969364963,4.750511238188033,12.543747251298125,15.275053021919014,7.340614821877964,12.943450359861387,13.503589459768497,10.130500595687177,0.9985093435794123,8.53589788497179,4.558071130782606,12.321141961601922,15.596488138005578,12.4737157451553,0.2929441987943404,12.97307749475332,12.02966033337253,4.469839161696378,3.4498707633740633,18.615880753039825,0.1303687583458757,8.258399059117414,16.11278744076541,15.343886736760712,4.709649574331269,16.501482493909783,10.56957114994701,6.844651810139464,12.42134456750228,6.570805718056545,15.497226353666678,8.241563274735103,4.815379905842723,5.302299480360273,4.101806956438945,5.278532285888136,19.553437719249807,3.119989085794934,19.66975521147709,13.761024861226954,6.647575844432145,13.454164231705095,12.96936337199718,14.0460354414129,11.317315644941406,1.2765260687931645,4.709844298324679,10.309199806300434,7.4236909172737375,17.796615232383637,8.543559892832793,7.314332081953339,9.162010478528192,19.924339465414587,6.084154018924406,19.8894122880508,0.20424974768546988,1.2748222302521262,5.520536190683316,7.444686198900934,16.543847572529664,4.464484505575017,2.718024072325327,5.244118449273607,9.946838081002767,6.0866276722033374,11.800441723940637,2.1856192194478785,5.8321418441639405,12.504217089292364,3.6898855036600064,1.4241242258360343,11.664955139309239,8.208223556714614,9.580846605474957,11.305826664037792,0.5801149756456425,4.257439481102336,11.651681009594848,14.054668418854583,8.56988843956589,19.864631204907614,3.3686740688285255,5.890618174320279,8.134173563088464,10.013867161594927,3.1679266015713514,6.56430562306916,3.6110001629967403,9.89481860542484,12.131331581452681,15.15168170849023,8.891029447463325,4.119543301495074,4.5021715837159615,18.73668256953325,17.383896455957167,8.030469517746056,2.7015092694751752,13.907471598927955,2.34589694890309,8.912547363015664,14.411519971586202,12.433415392146836,9.956948903823534,6.634523087857054,6.229476112580987,4.61309037642788,4.183330145328141,1.864909310004883,18.821581827476447,2.836065725575496,15.581042253723826,4.997684823491215,14.034300656030538,5.8040879283362345,14.950618794313408,12.417774067089447,11.075600830438148,10.32993385145765,14.302234662479588,8.483140055551765,2.1786114161809023,6.848850262740509,14.675670208344629,5.9178936820147365,5.476285370780403,19.431366665331964,3.846050479017049,14.143008548703605,10.22372239425922,6.049122917657028,5.927701070950873,19.870470200594887,12.124853691491705,1.2237516631177137,3.6641670354736977,5.595462133910907,12.34288008713229,17.546458877822218,9.813283553131917,14.000011415626968,12.418013424265597,8.546245076681478,6.008011173676615,11.432943498799467,18.51929625683985,3.6358851190467556,0.3043821296995475,8.950838954466459,12.844993569095756,8.687478071418955,18.04019456786537,2.5676723379875677,3.4095581764556737,11.223914230262029,10.593050705175635,1.1388081202859057,19.762936226522136,18.692835911591906,14.889841330051837,16.293484160528738,5.932354791908714,10.772791093800622,12.029801607442057,14.151640896702503,16.89224915760844,9.094500569270041,2.750477723067677,9.334676392353414,15.413028272361053,3.850338807364184,1.1212572750825434,17.432161186832907,12.373254653738769,15.55990304942354,1.6947970866120121,13.823230614732843,8.786013263570918,18.660184036329547,8.238757853542804,9.466348442270123,8.037239775242506,19.711716729358415,13.84772452336129,12.375788223696702,1.6419449329195102,4.349348567842326,18.934841640739208,7.112285033675416,19.474643776251334,3.281952107381758,11.442894126114043,16.03755751950416,11.970848073730043,5.209723371995918,12.559459907018734,8.947126529402505,17.762574240011332,1.2380001441777955,14.195563834012539,8.474878317903887,8.787740056078679,9.473028936993767,13.958012979662517,4.6222739436093585,15.065867139775238,17.462997816398147,9.035009451919418,14.165204580502051,10.683960264204257,9.385075993803254,6.013093009378112,1.7106406887278336,3.3552528697643513,12.096434218411233,0.29371926933629666,6.226662866805972,7.814801689373954,19.240191473474468,3.7235571010458113,18.525591400299582,10.552758315643116,1.8102678769895997,7.046923030809222,2.461481920958848,10.93191895925251,6.134969440317608,12.0769322909204,8.50118919998032,9.768310205331797,10.774343674228653,16.994178429215797,11.92904359636092,1.3479332868763239,8.621584673438175,7.565897696328889,9.125537255038804,0.3068394150447773,9.774042462818686,3.9045185389442105,3.902074405060585,10.137335175950835,0.7481946190406497,14.772134267582109,8.913313758754224,1.2894885400590406,5.534332725064446,10.975277520721711,17.31703420991453,19.387124811305952,11.82357581128461,19.817095239823594,7.85379489655623,13.742239920372224,13.066182290798807,19.35384922115982,4.679528935818702,0.6875555813848822,4.8422381747534216,5.4042169066053125,9.127028185992732,2.671446705161289,10.265448825018,11.86038499645039,8.544009427097636,8.539723407702752,0.8293533785870721,2.9216820814487,3.298572819498502,12.866992402393045,4.845892511094183,3.979414348110457,0.4390260506006305,17.114725426219948,18.358696816690127,7.926214522661299,19.01149148154868,3.888784609410534,3.6725358037358458,6.571508461500759,9.080994623722049,11.423386215134075,3.6828233412646094,5.88335479969186,14.445998064953613,15.735994708486194,9.889437380694108,9.331832580299807,7.0254318862913046,10.073739824684518,11.435246996551012,10.218869971898407,5.287728582376232,2.8158788542235236,6.224566459491432,6.299232820069531,15.312727986821436,6.09681104140523,13.042322917150768,5.341128308241512,5.502293078761831,2.758893173886716,13.362656502334659,4.117141299149001,7.50909302377027,17.559078849342047,16.21861260050038,7.928105347493801,14.54134092789436,4.919281780660203,10.410890130802661,19.97861147911901,12.397213896778538,13.655944685098547,19.69047565555723,6.052085551157078,9.108304887183403,0.6893303739115542,5.949346411757475,5.655281049434917,18.443438013645522,4.946832466228188,16.57205125724505,1.4389145461764574,16.475101252260103,15.386282140710161,19.903594443929123,18.621268055543663,17.592955774421455,2.047039519649836,5.358514438198552,3.066074937594152,16.39311538526567,3.2630979454669617,19.67972572620216,14.554858187031318,18.707337824377493,18.77371065987987,17.189811744378524,2.841127849918803,16.57669630237665,6.486673789069064,4.366941715291279,14.34772871424796,15.314294599614783,13.185880513924921,3.770405724890491,5.793647094864758,16.964415339085388,7.289721353333225,12.318725056749816,2.2160156238342,1.9252740286216952,8.446777222734205,17.122876686477223,2.1535692385148364,19.022291668458475,2.891598424892212,10.76005658013164,18.102491222550437,2.9360062844255097,11.365866235136991,1.0226243901335286,19.73854165072186,6.333717835161439,17.411146840252563,6.751116108344055,4.423363348347866,11.284251635027234,13.714504050435092,12.978121523884427,7.362621369335529,18.495445871249462,3.1820443458086833,19.836101212641353,15.611127296156972,14.145609589307945,11.74342322127822,14.78497338892726,4.947987409927674,19.38368006932408,11.27119349344781,4.547933804951638,6.17281418707587,0.5892921574891563,13.624323367797352,14.120265725966238,16.829105843401276,10.532999892858438,0.8342444865070853,0.900421129512452,2.398276698862354,15.46265301213996,16.817752058180588,7.050225914757839,6.122106272275709,8.36448091896143,19.029196513937876,12.271777928492615,5.111570021118723,16.752054460287567,16.897933500121813,9.871727008306891,15.142632196931283,3.8247954906951476,18.359592973209324,8.921380970300756,9.466628242895325,2.461486044260628,6.69293125438339,2.3395912306656585,19.37313704921447,15.191217164895669,5.9251787770833,4.958986306609421,9.394778843030949,4.8414294880336195,3.7396750278426483,16.9953049353192,4.813705717956984,18.380485175187484,18.521253047672115,11.60363182154422,6.352329040689733,11.193615152673392,19.426270689200887,19.71666023827651,9.083516675913819,5.631686270431526,15.20728786817429,16.240763376139903,7.473588036924066,4.914126310718121,4.596471179707602,3.7594712355944715,16.78964866728355,18.29405784521724,10.91783733730554,4.606846561029578,6.447860511065615,9.377596685986159,11.948929653031026,17.714147767823036,11.101749081159369,19.292757493060314,18.82238023932026,19.349295768349613,11.138788921207237,19.24798485102768,0.9298204649233721,3.935967194730434,0.4327121850744797,18.248910063683216,4.58385550699544,13.687163020091937,0.2650499088248681,0.19829190450486145,14.008588891832211,17.9243834532677,4.6014636160746925,11.710476544884418,12.835451673291516,14.600961882068205,18.08656229702528,1.4995946949187733,7.094310951467886,11.343721973865781,9.223004414685265,5.7668917721856205,3.043799967323868,12.165064356025198,0.3314475375861248,7.787963848368564,7.193251246819838,14.044312765471268,19.216368214827124,17.31245861926398,15.166322413634617,13.276370606186827,19.596248597699336,15.574863056818176,17.23365153918719,2.949403386380709,0.7877168916659238,1.067148962867308,13.174842997115803,10.990578692716273,1.2297135666025971,8.525916378969995,17.258292749035625,13.69051901586845,6.024813375682099,0.23730258480861632,16.230990526822012,5.159871921585393,11.199798852087621,5.206089209384581,6.351237740249838,6.859571895661634,13.393933439664716,8.651573137174559]}
},{}],53:[function(require,module,exports){
module.exports={"expected":[0.4937490140881447,0.33146490650193494,0.2955058413133948,0.35626361073841034,0.1406856336204689,0.7219272107329564,0.6137985851564739,0.3873174153854733,0.6539054604944127,0.30891859211642847,0.13544896329984843,0.2786391771887578,0.3508050179464919,0.27235314496460505,0.5968382257702347,0.9222808327096249,0.1815820212463306,0.4212064070352126,0.10434143886689988,0.7435949682023423,0.4693932947635998,0.8591544539030415,0.2501962508838164,0.5739019612716562,0.44095595319589614,0.26458844984161395,0.9029777967268962,0.07995660946120055,0.6406227775818495,0.23449801406752852,0.5617893486912009,0.8186625760533596,0.35272088382983324,0.4619969037600921,0.30781407756259865,0.20869233436569137,0.3443026999162334,0.670561931897146,0.3346845075538654,0.33181842079039325,0.2710004917728773,0.541935726327446,0.19566513000047775,0.9673544521328792,0.5811868118366148,0.4143373741142139,0.4527612068352507,0.4246589389702007,0.14425329084968577,0.36704990653714087,0.9030405306558845,0.31397878598721907,0.2708973591346967,0.031179779222609495,0.21930544509300856,0.5032398843161632,0.4481362967111659,0.28768452251601206,0.8940390440808069,0.2675604119917194,0.5012741208471061,0.8948110113736791,0.1823597129953614,0.365061677348843,0.728839085916849,0.635137792573093,0.7570384234837622,0.5341934595339598,0.39546827227378667,0.5007087433210574,0.14411504191366992,0.5054017511142362,0.5024217630613164,0.7386653128404201,0.2350309217947935,0.45375527556615525,0.4108240509596488,0.3725149599647339,0.36159455905317206,0.8565286795944604,0.15577442002682199,0.36356285157297136,0.018982739873836436,0.6587688197204224,0.3705242796569354,0.7707470643818226,0.9535348969516533,0.2590188055453788,0.04118155709165251,0.04488333602080202,0.19599062922258376,0.7526114326702805,0.405703686866692,0.5942262908941132,0.013607118827959327,0.1323165874514146,0.08373249806681117,0.46935296374489227,0.2981076024522794,0.8386796002137711,0.36722711060949975,0.17486280532911655,0.25516530460823306,0.9999973720047367,0.2061312581518273,0.18228221137102363,0.4460527653279177,0.5158074366587716,0.3961065121395523,0.397894160177024,0.7173562400717148,0.5084725042928331,0.3297189957973921,0.26272979374088495,0.4850778475165417,0.22199792419795827,0.367775233689629,0.1387535120722232,0.3852455713386986,0.8875492508049192,0.048361109469687656,0.34267559733413755,0.4752463345468246,0.04161499583461031,0.40484488934864493,0.6154128615895512,0.36759270222509216,0.43022421621000595,0.3077720827311401,0.2548290340313099,0.302630531519412,0.9187879609019642,0.3938488684962856,0.36900626777922085,0.3279103477784156,0.03424662222811002,0.3101817858841796,0.6980161676697201,0.21005470000399318,0.1947798152438467,0.395605706239197,0.009836474600498779,0.5399818467758881,0.2770919708917765,0.5763096676425753,0.3301466513094359,0.3678918071559942,0.9329011463846629,0.3374819929216489,0.6469865462983019,0.008357897588613158,0.48312408146890184,0.9124761744828013,0.3301347088096259,0.7705574947035456,0.5715234622733256,0.5043033322945325,0.3756794260371275,0.221227605740309,0.7129215411987455,0.9614853537058783,0.5162518357686335,0.8836523496542238,0.5419125702624332,0.06527209858117172,0.4490049793995987,0.3566640066241396,0.44067993064120936,0.47529025437183087,0.30912383823017486,0.9373732513397466,0.10131065390851007,0.2520303606966858,0.11151418454134455,0.36861410715285514,0.2345287634993662,0.3878291565837575,0.39577506969933335,0.4006358045245241,0.9251540645407254,0.21669860752116,0.9136700080304165,0.7412490857616139,0.3790447274217218,0.031081419196986673,0.7462985533888031,0.3915662753992806,0.026751273953283736,0.2626416973399003,0.09697798038242479,0.023147733862207406,0.9370847249380201,0.4984121057741114,0.24925755624277787,0.45382225591059,0.37569792947609615,0.3283408055812912,0.15808303931435574,0.7933099058916935,0.3047411841598991,0.5437182814448239,0.28236158136466327,0.2467813646138781,0.3735458669079082,0.45515434225448415,0.3083709294703234,0.4207550540744368,0.18746285852606498,0.8289337302925003,0.6303430818235309,0.42298648891645385,0.6797697673646874,0.01182750239518214,0.5018479280994115,0.016906272339402076,0.9989042165811688,0.3986384978375728,0.25696690441257236,0.39529176603315197,0.6270650091721358,0.37831896241568197,0.7039250440705589,0.28121270968798334,0.39695599698938294,0.6683855411518863,0.961857633257113,0.3123715518143032,0.7566042665466057,0.5195433434555983,0.2879919275915019,0.5666457198503817,0.8259610010923472,0.15133823859842216,0.18053233397827612,0.35178284216805,0.3844594963622867,0.7907109867442679,0.46456966258030297,0.3800038724332291,0.4101328784070078,0.15856587589972815,0.3614578170574049,0.3741437652173689,0.8595435007225942,0.9653088321688205,0.3719192122249582,0.8398152995790242,0.09369711817226006,0.3543359043755683,0.3916676060701212,0.3015332992247209,0.47344135768519013,0.3517345020399878,0.6968850615218113,0.36467014689020927,0.5733312635687959,0.3753949805777015,0.05915851967896884,0.3624646953265159,0.21046934634101533,0.007053771748255802,0.3883981867469614,0.873717816962553,0.3408263766751428,0.7610610199358536,0.1174043506106772,0.368768692053857,0.018482519786907202,0.3364161367427288,0.2915358771478796,0.6825856698387278,0.24875430790756414,0.008999030412468493,0.7607594784163778,0.7181572209157915,0.13025904232865723,0.3047949123798295,0.4162003804467968,0.9368506810752227,0.26599323173656964,0.7835034147855446,0.12676454255489403,0.6568642545664771,0.19269099365094142,0.4836226786135353,0.8197549182465457,0.7555690352057606,0.3340520515669983,0.3631399848742979,0.2646909739001226,0.151146710903812,0.2792680335872063,0.5428270614561682,0.4951591252747264,0.38569777879944067,3.682257823444732e-5,0.9520923551476359,0.698388578370322,0.5135524766338354,0.628435132006389,0.2517351207148676,0.3611055239336613,0.0855931809023302,0.5268331392321713,0.6260629931109418,0.6603061047549192,0.4678954065792652,0.284800377450758,0.4669042482347225,0.1760634971899533,0.4319414229565206,0.6346322237214885,0.18535664241281447,0.3065627372019365,0.11554272547253541,0.08040225935055119,0.6242991189502677,0.3728822143600643,0.8394681560674082,0.5791265493743454,0.5238661512965578,0.009637961732080352,0.10986682513165023,0.21279270879202444,0.7196621982156721,0.8472249669110301,0.7731933039403569,0.16562538998885457,0.30195262836245546,0.5484935155106928,0.08199444899950024,0.3711936964590056,0.3828836571602164,0.49090607845516737,0.1686620946934,0.14372770598289084,0.3159182632361952,0.4167553198871274,0.27527365270254817,0.693183744866123,0.6456222483777733,0.01675024863961607,0.16846085890970908,0.9284765998894414,0.3100014523018244,0.9346935203928983,0.6822661952818049,0.44688451053126854,0.2813490373645595,0.3079869960462888,0.9359960382844562,0.3016908753903154,0.13328102330143762,0.9439458903832216,0.8675311119683153,0.5456108772165748,0.34297265903351554,0.6582100550490093,0.7723637225492463,0.3223483736468445,0.4755407078298896,0.31023684428474707,0.343011532493411,0.44291916429561684,0.6728520721769536,0.705201048067013,0.012088782494899567,0.060938535537818965,0.5176465427355745,0.321289290738524,0.4356255339576594,0.38520163350998055,0.388527157364555,0.4599283397966704,0.4389633053043874,0.6730506264614318,0.777136158267367,0.7012731374827104,0.5866954825729622,0.10534288692399152,0.525213983240545,0.7819282842536304,0.509649076017467,0.8942894604818807,0.2794441316335039,0.24580621400936545,0.039300340512223676,0.38279746923534547,0.1934597791838138,0.3767747741489663,0.021694002783924356,0.1646646208244047,0.2698847260404622,0.1577840959611331,0.36356280057717383,0.3113918796767127,0.5991310134911497,0.36807485940178175,5.0440159358244873e-5,0.7595850596329501,0.26327738191410927,0.3210585559784276,0.598645955551699,0.5641425429035859,0.07185614564540391,0.0551176119126325,0.3012573438219297,0.7377517593693552,0.377041160775219,0.31096313073865545,0.7599778514230978,0.0008879934690849832,0.2260974366770394,0.35705213812021563,0.3083740910779308,0.44263697453830686,0.4986484245320211,0.4231499655310539,0.9610240051193897,0.3647476618705842,0.1425584462967084,0.0006151734588137113,0.7393482547284815,0.022358646676020145,0.10343122278349717,0.4045927225516665,0.36946896962272247,0.24517368692128355,0.28130461142117386,0.7898861551979554,0.5998232011533625,0.46001470059277433,0.3269478138507732,0.0365016740739193,0.5617485123638797,0.40594037386787163,0.1334295047483467,0.1790152202685719,0.436507183155776,0.4723729537364861,0.3189630575453441,0.36468914034968664,0.36793627025874587,0.3677024065209961,0.6656028294109676,0.18224324362768196,0.09043742977264388,0.1543293263418226,0.6531143061998922,0.08259986754685035,0.3551079333649304,0.14173481583710476,0.22522444855786555,0.6164274413527958,0.011912498422514298,0.9499602114500766,0.11991351664414286,0.18122112986934177,0.9999525852857017,0.5073177825947314,0.47738529370488864,0.3915898411282884,0.03257220911987828,0.6091574118741507,0.3830163177413376,0.23795085410778294,0.9419434400856307,0.0018595027407901704,0.39726656185384746,0.9210559316361988,0.42118748269993267,0.34868307109441543,0.2919231688494092,0.6770180384437307,0.21732740107654322,0.9567340671345596,0.04759518324016292,0.26464386015140895,0.2554036479559025,0.14597817066867178,0.3657737708569536,0.36142666130006085,0.7111168377788828,0.10992062382546883,0.9088102735120684,0.7961423197053492,0.979296754843239,0.5020753122333218,0.43365319785836914,0.260639243163193,0.00404300294392378,0.5939263755016446,0.4476580588966733,0.3911542843342056,0.3570719635941759,0.19035829553745756,0.09461664627823065,0.26870133511156696,0.2896230421230571,0.3466994991819508,0.3473678126137781,0.33388718275697366,0.2908840828150972,0.35769943429359397,0.3692054529737217,0.9776241461618559,0.6365776174572209,0.47161731804762763,0.43846057511644004,0.11087044620317618,0.8588194535571558,0.4307919124415228,0.057873466022004626,0.249853582939317,0.28489930072193886,0.7182286561939493,0.6674022834694522,0.364331805418018,0.8967149625703904,0.39288190225505826,0.6986783201151431,0.35971295920239127,0.9959910730328966,0.3245478684786843,0.055767486075061753,0.1285529250585099,0.4544169104856732,0.19462079663292609,0.4510765964199842,0.08602692194553921,0.14449171451299678,0.21716560971210835,0.9978682838849624,0.2564986845602864,0.343635074970911,0.363182998225918,0.2686538080519476,0.31472708307863984,0.33330692140001184,0.7274387341605524,0.1889741372798802,0.44921220225819714,0.3650246499943932,0.8785870660595916,0.6456075297146879,0.16062643286258965,0.39038137688407976,0.5116843711770308,0.0023352164766549874,0.047949884098261536,0.12232177168472685,0.08169244376693682,0.137433677916246,0.2733289087971587,0.11345273308242364,0.2526634208346689,0.367389152695181,0.5117773760439476,0.9793166912473036,0.4743747867171345,0.266792108525577,0.20512096672247299,0.009914974370528084,0.34200219655123926,0.8614679768603544,0.21304576813339537,0.39666956862780833,0.014721428612685536,0.32983139304119835,0.6243663739340946,0.2812615555450073,0.18069235818522628,0.5842224959075225,0.825384637308013,0.3690246596134658,0.32865762049349334,0.11248510365701585,0.6241959996825712,0.1594630960512892,0.15532306975756113,0.6377164313182633,0.31306853671621293,0.915918792659544,0.4022962809127154,0.9999947670032526,0.4201812656039313,0.4785299140077333,0.007569935772096056,0.3042707511737138,0.1333467363228385,0.35757483398592155,0.2547952487042814,0.33387780467725353,0.9302037036029293,0.8212399857224404,0.16627760961103114,0.5576095014485019,0.3334677133247649,0.15528741933155288,0.999524295635287,0.2922678088221792,0.2657032504893117,0.0327731669141731,0.3855669881058087,0.3628150304765386,0.2807366847763456,0.17987505918897512,0.32773046101715886,0.38217777903503164,0.31081075919271395,0.4248375001815255,0.11143946102821314,0.47943386833977936,0.3181317159834219,0.4290712010718636,0.89109844862129,0.2996290642997981,0.5503032709500355,0.28928409494227464,0.22954616710419193,0.23292582053561572,0.37775822465911557,0.4077466148127632,0.3627666752790314,0.21004423252717153,0.12601397164238157,0.013706314734556288,0.4725022577768586,0.05049848464773482,0.1573939412717826,0.9804989693859845,0.21904939496924242,0.33301284107187246,0.36477432377428587,0.7342797043180219,0.4002782894053091,0.7980847428963698,0.6165247382190953,0.48875851284849736,0.9804729660247062,0.9059920456615637,0.5594613174324046,0.3036069916015598,0.1555266671582734,0.41628249062091544,0.31955004563008044,0.45075563759447534,0.7459364118287246,0.7768982095868711,0.21442949439373338,0.3506646277410469,0.297647521601356,0.30349253927432185,0.9252011424990721,0.03447283079593301,0.3692567110463634,0.3238843181937099,0.15513340243498383,0.3923231349863206,0.5530595905287317,0.559627631041741,0.16591007136323052,0.017306759932842662,0.9007972068376068,0.9196018644558916,0.9034641996014923,0.22758202705626246,0.2912833985607984,0.7145669928568616,0.3169367709559504,0.004242426107451696,0.27053925464189443,0.7365265836785821,0.08211575541354296,0.25480095192648494,0.6052975470434997,0.04027056525665991,0.937185574843193,0.38461531030352236,0.6523186889649325,0.9903803623544207,0.09697501788422239,0.28759004987131354,0.2449458951353357,0.7511801429958272,0.49489719089124945,0.2889064963779066,0.4726234788347152,0.6124935860721454,0.319928814342628,0.6958645020823969,0.3135868435463144,0.3747077367973833,0.9875548963902133,0.6611293754400588,0.8673579229429833,0.47567172289713977,0.3437446110250987,0.4627659105048732,0.2966912134153822,0.10485401317051324,0.37701500888278394,0.3495337834824268,0.7852985694878523,0.06572773739690208,0.3702206506352781,0.7236891228132382,0.3637391455302349,0.4054190233301808,0.8420590766182796,0.7189289445986425,0.38938276475168443,0.9536772725220899,0.42911587030205417,0.0018500192819575667,0.948117026352994,0.315254718497314,0.13719886443210072,0.08952403002063604,0.375990027395414,0.4258002005111118,0.13949309103503452,0.47794920530672125,0.5674643583624871,0.34729684346233025,0.11221094503199415,0.1458283546023465,0.9195971909730121,0.3640660383007054,0.6024533497277422,0.39332425885061273,0.6605092588802033,0.6679663970637997,0.22698769894909004,0.4821321723599664,0.42401284546047735,0.35742779053807716,0.9616202209505422,0.38033214258045667,0.6475222211291726,0.3560535313246913,0.3243091853467277,0.5593143351830159,0.39219270806877826,0.2720501211973664,0.8290732056903459,0.354375459645067,0.1624410969800656,0.7717224897017247,0.14712816756550715,0.45841363363379606,0.38736358053623765,0.4612776548890618,0.3426852820678575,0.8406154545556346,0.37812954701951657,0.6505184886249901,0.6110145292573578,0.8680330824760111,0.2665299827585783,0.9998565414285154,0.6886620187066097,0.48833874424676765,0.13847374679348834,0.5192040378353857,0.36248284835515554,0.24011923730685839,0.2618751522407735,0.3313066775444943,0.15480568618288704,0.35616727103686785,0.34351513582073284,0.4130405888042702,0.4140405602413273,0.4890850855961908,0.30779679791230996,0.24010487995675517,0.44045597951673876,0.3944929548717796,0.003926840677172294,0.5124496576515437,0.6111855984586636,0.31683227376512024,0.5018444955073188,0.33097230124786436,0.9978473157461928,0.2634900965642789,0.5538374489905765,0.48304759356636184,0.4860873486544481,0.9987235227736537,0.5816792603653419,0.07580599685792035,0.8026889562479049,0.20229327918944823,0.42740650719612827,0.2944975342229255,0.3866285674346793,0.7199272872483075,0.37300804383808905,0.6077946314948401,0.6418985001241222,0.23224606855283786,0.37342140783462363,0.22633504142698005,0.4063219268418508,0.8621707440717518,0.30382677116143353,0.21250998650684952,0.10884955589410757,0.002773978324132992,0.5918157659588712,0.5653260744015426,0.2360637976829387,0.27477574532080096,0.7073473386871183,0.231608510474162,0.3306750727518518,0.00032122577421428227,0.16576485306865035,0.2531023648890803,0.2558692827028274,0.5053502533318465,0.9342812722557465,0.5278302546359099,0.08091167774522506,0.36245451051229083,0.18516339515040858,0.6474943707104023,0.4039340488309552,0.1542375352797636,0.5911063392744317,0.2560421229923818,0.2747881694044062,0.1301771855395889,0.28425467732944676,0.18570246622970715,0.04886194643524093,0.393848992182064,0.06358976384348049,0.3718961578926488,0.1309894695324872,0.1877448920079834,0.8198758659563016,0.21649086799576667,0.3148609132782742,0.021253226845160206,0.8620071915939236,0.893903120727208,0.2525018735788656,0.07276462920790013,0.043502536945047424,0.5344443534086151,0.5558168438678838,0.021752076929091948,0.33639304658742164,0.7348141761479745,0.08980510834022001,0.3908492148905166,0.27394542474339323,0.39989651914045754,0.020280262668371424,0.962607380991068,0.4420691429210014,0.38481509875009323,0.24139766420031183,0.5519588914832023,0.2905859347551751,0.9800020173633868,0.3627832323749026,0.5069298187182081,0.3965544414040073,0.6673024711641988,0.524659408095574,0.5146594330270293,0.26758955778268334,0.37049283513848397,0.23472062496594406,0.8682112528071876,0.18784551907580954,0.4117862463958002,0.8483300757619525,0.6925712715174159,0.34596579230681024,0.4375988861477084,0.35199483910066515,0.2819504332795549,0.49221263125758563,0.9421129450952916,0.4882279389387203,0.707769463952383,0.4513211318417889,0.9666785529809689,0.4794663482497057,0.19959013091051678,0.32955725199925817,0.3470198899986816,0.568209057050187,0.4726682747884792,0.5016628341435498,0.5094585661194863,0.4481922466518947,0.3348535216319805,0.8422956517334226,0.06157894676135699,0.26430659333540096,0.49043314237131574,0.23732550350000434,0.2984177119508338,0.2858410906435543,0.6956057442520566,0.3866688793225941,0.22614959375870106,0.4433286793851944,0.2134601626586737,0.34978313862845456,0.36505162035063154,0.9990487852504145,0.3060981563629788,0.2962502950993413,0.30081945718983044,0.44507137304617417,0.057566465657938,0.010810695941241705,0.6392743168677056,0.5926322836264457,0.5149052705102549,0.35541012996940924,0.36327161363050575,0.7899711410272532,0.32677641305393496,0.9088713543493694,0.7654436125915504,0.3922871424151667,0.8039026507108261,0.9276396924265583,0.2691173093119535,0.3648234955882214,0.14278299311513526,0.3474512770923833,0.3954983770751749,0.889503824807028,0.4399503422286316,0.34449476210121216,0.36136648173826746,0.3791762038168736,0.7857017512977176,0.7338721007710229,0.7333971028929132,0.17637643099290234,0.9667068423996366,0.5660617865937834,0.8922058599460194,0.6573805636344285,0.29014880160700696,0.7036698395909922,0.7001832965673531,0.8070249624969597,0.40916924956483325,0.22195262337411764,0.2796390020408642,0.3190228415240608,0.14597202847666632,0.3946529057953861,0.20645568970195646,0.4201718637270206,0.4750731962179794,0.5259925126760367,0.18856453408540602,0.7961938295025843,0.46540960538154,0.3592408458029099,0.4381410346215068,0.24671949869295356,0.6360782027379844,0.9514735099572817,0.36894767158389175,0.36502865866991613,0.5122011935215377,0.22944143330174652,0.21996669877110442,0.5621359648411807,0.5587296309030896,0.5270351725818991,0.6660480619598997,0.35701041907951836,0.5366725339740882,0.507454562455134,0.051278772833327026,0.8707780606255261,0.380596053946608,0.6443380638043501,0.31065479626580317,0.4109094623470066,0.43254901382891714,0.347463532841533,0.44147503798359644,0.3462327362810135,0.3626892103557666,0.06020904028001949],"alpha":[0.3574134407495553,0.23685467555397421,0.9831365534828782,0.07904467398460957,1.710590655691424,1.2454648966397732,0.9669114435332182,1.1957077591644176,0.6880305766602963,0.7379503448625999,0.8921976768172644,1.4204168875472054,0.1094594909702753,0.8542549746866412,1.0093627265838125,0.9980851416271093,0.6373033285266594,1.7890717964948974,1.1356788279901795,1.761071096030185,1.2261487464860537,1.4923782919500863,0.31763014139795187,0.5448297388079424,0.13354816809704406,1.2039386444320797,0.9309781710642335,1.5305015228350656,0.6908821873402871,0.9529169873338748,0.7308944365010648,1.710002557258694,0.6545576277046954,0.30343739141480386,0.9341544533966797,1.4952547972609427,0.34109948851796723,1.3795512649636565,0.8941343457635407,1.0179302737415226,0.4293203008349713,0.624013220284303,0.5514371710220898,1.356270226668383,1.1804003928621345,0.1040379353899561,1.2646893045872285,0.3237749666620533,1.0477990262794337,0.03360061984919804,0.6480854829527116,0.8669247063066896,1.1468323324113032,1.8361857359318075,0.8071156608496453,0.4224434375439383,0.4787086426928453,1.9813879803616583,1.3662291120420509,0.3679670475147354,1.7302338050326678,1.6054045368669416,1.1074363977490709,0.04594779719176145,1.0510335930349246,1.2655991629763332,0.5420329137667692,0.6580117657806395,1.1726515459801168,0.3289502787735703,1.5957335598863436,1.8659403702085573,0.7600114131275522,0.5858776783223223,1.742171568902874,1.7757867337330868,0.39298076014003147,0.050982895620534485,1.2483994602448552,0.8528437000583926,1.6695503601433455,0.044516078789802016,1.790407045834427,1.4853355220731843,0.013269896501180156,1.5653353018957148,1.4853308025870304,0.836745060800359,1.0386876144257733,1.1946521753285642,0.7502332538492622,1.0830550647315214,1.2932242201398432,1.4093221853461113,1.4906012038384193,1.9822100849447963,1.6084456118814607,1.376808720332369,0.821888415929009,1.0678634716769695,0.002048553005367104,1.112700422882678,0.5264784052648812,1.781279154671355,1.2007806449357505,1.9568380022155867,1.4273089694084078,0.7790778898373869,0.6926550477168893,1.1512621935323546,0.31356336438069077,1.9485398400077747,0.6765488403043451,0.4354338619107576,1.0503786506614943,1.1181189682628836,0.5807243178790991,1.882833324002739,0.08804403887774503,1.529962525115757,1.5538942317522997,0.17250784737598934,0.6254693935289697,1.3593813508695103,0.6082531262096773,0.6446605696994911,0.008742556717427963,0.28424574822131143,0.852857505332421,1.0962117584638924,0.40996159901620466,1.6231880441414126,0.3316252832083806,0.24769173919861265,0.8864505616816989,1.3008828736584057,0.1773272407916524,1.2907751015550946,0.8429664029729671,1.2253384307669841,1.0773048325292156,1.4481850515236103,0.654560548774048,0.7762998928997331,1.23842493284968,1.485092834885053,1.6065906907599663,1.7810148246088016,0.08620276854918352,0.5083282627358114,1.5219283956053884,1.068223924818081,1.36683574100718,0.5471530118593755,1.3256246979524064,1.899333508386297,0.8012967658845311,0.034668770299446816,1.5084798206505674,1.1291388000200775,1.9132216114070864,0.55458650523093,0.41598653073860836,1.9740292346957227,1.904330866976228,0.5424454600021704,1.0677077351300777,0.11394769267464389,0.21502863138830008,0.4093192132138208,1.0617118646444665,1.625937586934385,1.716108149652976,1.9112637037283613,1.9424058215497628,1.8085122898310932,0.046537897714240994,0.15822250831293694,0.3680919333800978,1.3707860095129831,1.8096497946263828,1.0876224697836423,1.4223946122856743,1.1781543910995778,1.6675171613441644,0.9086390644815578,0.5248694520414445,1.3211974541000204,1.0611538479394524,1.1459047946007384,1.4788733674601882,1.380965776251553,0.43868995493171337,1.2337865779717991,0.8151020950030055,0.025307613731413436,0.3134000826670609,1.2261019742554002,0.7368058018651782,1.7472836278293875,0.557560646388314,0.6508129142405576,0.5532561285304931,0.10085431470390249,1.9066082753163243,0.2984121865369218,0.22393290600775684,1.9365351191976479,1.5243839892212208,1.9087045841433494,0.20972120773812675,1.078432434161149,1.1980711583462003,0.5799489980238142,1.8449561924689575,1.4468901497741622,1.2682492198940754,1.4975291716773342,0.30105502546277885,0.7711280657215642,0.17810781072464366,1.9557197546027196,0.9083312396110101,0.9768365202456337,0.6918983995866541,0.8900355245027671,0.4188117127797022,0.7892587876489907,1.0662316650081438,0.6980732068291196,1.8543230481226076,0.4571711185946512,1.0259130123968379,0.8627335043862807,0.2038339816166883,0.07235785608628342,1.236307099932631,0.8878843940596264,1.6119635623226847,0.11375906377479073,0.8653683998538733,1.0192931639052158,1.2976932372170866,0.7240036557741769,1.6632198074249605,0.3711528664708168,1.995672512984203,1.390562887892326,0.17373556505348997,1.0175622439038698,1.2278034277865792,1.8699921478337553,0.042764834318096856,0.29821646498771504,0.023010027677819345,0.3638373759345441,0.023906486183169928,1.3329545669344482,0.13162638788507852,1.2980017209264632,1.4674640650441941,0.6607424016789696,0.9735700049048681,0.2297597029104117,0.8404342479920981,0.8699106465405655,0.5336758682687819,1.5046493299367394,0.2844745845615364,0.5382985605573372,1.369803349678163,1.2212487024549832,1.642418991156703,1.575098383921476,1.7752866531430271,1.2382327979144505,0.5358242083073206,0.187781614436219,1.2588019108754689,1.196448461569998,1.673034388284643,0.680751183910203,1.287064792075216,0.789175977631142,0.37846796310942077,0.7471254769349804,0.5224944221413357,0.3055550712492425,0.1768432857794866,0.6292028979239466,1.1994647459072207,1.5113874066052948,0.32436665927563757,0.6235811644627529,1.0943301736195883,1.964057647258429,1.7996044271651308,0.6981496857129956,0.7846304586135138,1.7715963740240732,0.6456564375813159,0.05268624030617053,1.5437070678001241,1.6020170310230997,1.1559737909117263,0.6197542516302548,0.3205469987282408,1.4919101653214955,1.974999009930666,1.7737205698931935,0.5466795463676393,1.394290249468658,1.2557870934611994,0.8786301752649663,1.4914489917013478,1.7548878087001447,0.8717178775113297,0.11640812907661102,1.5346751087958554,1.6668317654212053,1.0290655719940598,1.1949659200467275,0.9268272149317522,0.49067093024599906,1.3203384823210582,1.6839646264751376,1.573528487227311,0.8138189151693331,0.37748047320903133,1.9068990307676885,1.9913943091506772,0.7500566348701669,0.017527995031586308,0.2215219312947534,0.6959359650222736,0.6505481574622642,0.5040080380752858,1.0564299750842365,1.6070522175058506,1.588102905689441,0.9587653770899993,1.671865449408242,1.3712893938356538,1.964606307867672,0.850466151494405,0.9500259255901566,1.4537159807773534,0.08205528515092819,0.6007866290362598,0.5418465554035654,1.7085341332805473,0.957267139079538,1.5987186475032673,1.6446721562803641,1.1254869365326203,0.512667864461696,0.20150981837835058,1.705210396577527,0.8651128583989838,0.8443735318770815,0.33847757867621375,1.3664723539529864,0.20499851221560217,0.6520520913684926,1.9298206209662219,0.8626740071803933,1.297334027574899,1.0968144576975667,0.15878699522431816,0.27776087345631595,0.8866220989972526,1.1959483956941503,0.9082116778089135,0.6268665630911414,0.2662298820033211,0.4684204195165145,0.8650598614519329,0.8025190354735288,0.23616527321294,0.8971785570248838,0.4572688258737747,0.8632944532808269,0.5895089337106105,0.6337810581820817,0.5101592249379592,1.4287865187076667,1.9794921244904993,0.06686685844530516,1.3128592674258388,0.08789363485457402,1.0437530575074865,1.3118916241792715,0.5892283200598141,1.387027791466008,0.11545240910700327,0.7828018968947386,1.193275798312527,0.9801958730074403,1.8657582037572902,1.0704440775613748,0.7048644658095373,0.17384479690732668,1.5384619833128812,0.3914848737222214,1.8760284310263495,1.9213765650609913,1.9796241846627702,0.5645825592268303,0.8674033000620187,0.21139154018670014,0.4188968027043978,1.5381008244976901,1.616711538874211,0.15476777834109656,0.6204798079469125,0.9350250233575128,0.950169255105159,0.4174459744150143,1.4687518701064364,0.03274052340517297,1.6798464749380315,1.835831953280516,1.7594629714426482,1.7808134522016568,1.8325306498775027,1.9851147106310663,0.7927411526050254,0.638181947249326,1.1347459365578163,1.5033079139077863,1.6800932469072118,0.5747021246031827,0.26515916669962847,1.7751771333230333,0.30697197050713854,1.7046163598677455,1.0749459749563557,1.0322709428301824,0.603340436130225,0.49398710032834137,0.1843067501078015,0.21735037834466997,0.0012665104053399823,0.056192840827032686,1.6064392628553241,1.0563505813526541,1.5963546272842435,1.189238034457747,0.7219655037351984,1.3583384984736395,0.4887844423858376,1.6104484500554355,1.8866705801425976,0.5609119154093647,1.4376612014717853,1.0828198435669703,1.4246339906323948,0.42003859203024785,1.732303237181522,0.8309911566042607,0.15911509715408956,0.4140640110615732,1.6826514304563602,1.698115347785356,0.20830057493661114,1.1316227452500196,1.9974222940324702,1.933415218310269,0.092894304735887,1.7030198429244825,0.05456324554856229,0.10950033473876841,0.35582917397742975,1.171411349586191,1.583242722728238,1.5120255439394445,1.2711900288858002,1.474924089020031,1.172405751872196,1.387310109907356,1.4824270292407853,0.4823110005174156,1.9296262798896926,0.9708343675061952,1.4650913456819885,0.475525849436647,1.8848373768294238,1.2216064181868265,1.6468605020966245,1.9466046084647823,1.5983322704132465,0.44359206173458654,0.5464689020530757,0.8270526103832938,0.42541171323908245,0.6348701095208757,1.5910354279518928,0.36130259663677977,1.3560983183107211,0.34077900283592566,0.4156595306874218,1.4387489460785305,1.8470425633862613,0.04627504029531382,0.3897495690984334,1.010375014615215,1.6386880573027685,0.4734775825788846,0.10236615104550095,1.1188624576096173,1.9212796167529125,0.8773745847555618,1.094901151436202,1.1051800955054945,0.5298595738979635,0.5192441497285478,0.4033076384163432,0.019522667521056025,1.6681720546863499,0.07379841789420194,1.2349291807975518,0.07870330127675462,1.4256075259991094,0.17422842957304763,1.1473060127210224,1.0604783337735668,0.401502067637292,0.7012834576301623,1.032074144859004,0.7906156995869638,0.6579382115774051,0.8100974071309901,1.3580796976163332,0.47355054719477474,1.4328242605211923,0.3002174658879868,0.8473932736135774,0.17718235693006568,0.9080270181343737,0.3749258912738309,0.9418696419578989,0.3085550379474853,0.08251569987292973,0.850740732565487,1.498172706089473,0.6434149072670516,1.5763714775908917,0.3743339153206642,1.8042970299750203,1.278908380446159,0.9365843732090533,1.1370706501766792,1.1097105825189924,0.869887360446437,0.9726709262582056,0.6286286054550696,1.285171018863319,0.5812914345882843,1.7064986529965127,1.3835269518358122,0.4799357673800979,1.1574976548724707,1.2036632244798833,1.0180612384849548,0.9993498702919168,0.4216969953195959,0.5664631114795395,1.7008880893017002,0.9865553714487696,1.3129841158913926,0.9812167258387161,1.1793410298112943,1.7876578215385788,0.7734424710002359,0.060165479812440914,0.6731907808822672,0.740212364069154,1.1010433361534622,1.9115173864314592,0.6163524861922713,1.3863784406143949,1.6163584537790956,1.6246802438190766,1.581508710355779,1.340410075222088,1.3637492449636315,0.43853467222144316,1.5207970241932416,0.4429852874257447,1.7735215918879415,1.843236977819131,0.9623846030780085,0.5131375539142753,1.5090404886532123,1.169308210384135,1.277268525190789,1.6531325693485313,1.6665916952994118,0.7373797713100454,1.8482859895308037,0.6626841766177587,1.67550109424083,1.1551846633450404,0.14046603902152643,0.4677194616411353,1.6133571191278686,0.43806521442896473,0.21157366944727407,0.06004080912063703,0.17664154358821493,0.3434657482301371,1.2877600378977734,0.17988580165110468,0.13047202389464818,0.3427519209524137,1.051427414516902,0.6605245396083341,1.1804485318072233,0.30224076734808003,1.0532575043054777,1.0840120211269513,0.02886425480782595,1.0716554406589003,0.12131648579955856,1.4175514593929406,1.0882744756476601,1.591940682781301,0.34304081935072883,1.4234519219950208,0.6925068740501596,1.4450353800710296,0.7451383168062655,0.8591922792742119,0.045566582181774784,0.3878080781286313,0.2796480158933914,0.6563617759927878,0.6751525193333459,1.9052097616359172,1.6891892164329958,1.3237777063541807,1.076108233649637,0.25558548066208076,1.1181770957726451,1.6801481693897218,0.614802628453317,0.33104025395177405,0.5040871688506159,1.0892464799795443,0.44177171455579023,0.9251592523150833,1.2857395671090806,0.3482537635438341,1.417880780573562,1.188110655404544,0.8408645196881728,0.13937114094905168,1.1189880712841425,0.10973505350867496,1.143982389341275,0.9763689726880096,1.9939811775059328,1.481065932039228,1.0241019642638793,1.485526108191367,1.3605845392432965,0.8578146013037213,0.3661464028048349,1.125989823061596,1.3770891236369311,1.728283125969817,1.130258813538524,1.8146804492926485,1.4559949072574256,1.0244489542478954,1.602727390427853,1.4968384818146898,0.5795731874129286,0.37486629261084925,0.6860207054590819,1.99213217037995,0.9508452864807477,0.26714851395385564,0.3911825438080334,0.8455566685880997,1.807965058441387,0.35110570720952294,0.07610635949617528,0.7835917238366665,0.22773376990481964,1.0928746421755955,1.0782170384464784,0.020232316805275374,1.9366843040908734,1.3001267280703814,1.9920785074712675,0.6655722921085707,0.3403766329287574,1.7807794959175212,0.49140411665502004,1.491204575759249,0.81395702698696,0.2963126929287352,1.606992880916302,1.2716305224241244,0.1043430321742207,0.9053505788482696,0.03127785254104776,0.31263810605596376,0.472408185408403,1.4567509593717975,1.782065168501986,0.6159857461327536,0.7534191817062679,1.6954695961108888,1.669410282197703,1.5054136235083662,1.6216161161094513,1.1504087557386313,0.876657409974579,0.9219093561092513,1.731980201313292,0.9714508339547834,1.0096509578839328,0.18919393804136986,0.7879438862924064,1.2290465633971919,1.1538518481295048,0.14213718184180824,1.895898432630525,1.5306011893858402,1.054453329228593,1.5190044326057444,0.7823308645147073,0.4088833662874132,1.2035008804764087,0.053473558626386364,1.6382913949146665,1.0836441836846267,1.8586536758414463,1.2279771425607682,1.467358498932207,1.8937352026247232,0.1491615223672862,1.4263174474025515,1.2913611145560955,0.9283469358398779,1.2834348548109973,1.9809111201744996,0.9515395580125809,0.5398849102338303,0.1466923322433331,1.8154183773438968,0.1663420753220346,1.4918200314673684,0.42475641848998746,0.5239581187296194,0.2789481514835739,1.574064429249658,0.36143692859450294,1.8046982669625145,0.9644125978180074,0.46218565455760174,0.8959468072616934,0.17921206574259063,0.7335920751522864,0.3332826692694453,0.782156154650242,1.1179485756799372,1.5724412773640246,0.21514789977908944,0.8834315200260887,1.1672728219970336,0.25421442306404307,1.1541103892207216,0.1400177907236051,1.003342166317494,0.7099075022968964,0.15626533913530816,1.9394327091497732,0.2572076515539301,1.3417746678971954,0.38125574351365055,0.235477637173529,0.4089617239106458,1.4677347445567492,0.370651159059892,0.5705253603537495,1.1001392767938745,1.5974111177381332,1.9588199445398118,1.959462933580535,1.900618249066433,0.9916045357788184,1.394077410373999,0.11380183069228522,0.7399449170038381,0.03422871067946742,1.7237292780776143,0.4473907791428302,1.0120315000762088,0.5496525290424779,1.73780108533029,0.47843694505505363,1.8974572283726983,0.07364667043048945,1.9851363095052674,0.8437955439223872,0.6565440501896673,0.9058330592872577,1.7807724179232989,1.5417760089909969,1.1573220422752573,1.0121269371435249,0.3817274207472541,1.9898955472880768,0.9682028094760056,0.314593294480519,1.913875738202902,1.7142331297072468,0.466973063619748,0.6030307015414595,1.268500715767484,1.8971676119839591,1.3048634688832457,1.899528184531035,0.04411225331373769,1.3588910303877002,0.5571175246134481,1.0744921339836377,1.1876923798978263,1.1968015853325413,0.50730137452515,0.9935597848894688,1.9909447383530456,0.31392649036634257,1.6257200296270118,1.9270692320595542,0.22557059587196981,1.30309716825544,0.03377651138149318,1.0784057624561818,1.5793894425983832,1.5651226201060373,0.6831135548063885,0.7132809924616983,1.5641719029375145,0.9804282539237801,0.45260814483479495,1.2265035827389612,1.1853779785482947,1.6636548974844834,0.6095305293776945,0.35552465349142404,1.5596164211249577,0.8898982515402882,1.2063481237110745,0.9244986439959688,1.1970530210241286,0.33432042735345346,1.7858028421372891,1.708039435343966,1.2803057744979274,0.21174658121986312,1.3186121440814689,0.5052802695288574,0.4848479806454802,1.0910350740567072,1.5391268049331779,0.03297532632960998,0.9035660000551591,0.6146616036403731,0.289105024834599,0.41158443548761126,1.9609472005663706,0.7647484716303823,0.8709118181598594,1.720636910587534,0.6018116752587908,0.5481795915279619,1.2134412041664016,1.419526536504803,1.9208957980568826,0.06367358701817416,0.44671929903257057,0.4627911203737405,0.3642649772852553,1.3036736169389034,1.8867643310026456,1.1031501120330889,1.067952239836734,0.7681832440013139,1.2255822891989294,0.3269394941994741,1.754342163060131,1.203890342274208,0.4956792454115173,0.5927629686061371,0.12443471738732148,0.6450462488254085,1.1312481118445437,0.22271919068043866,0.9393766844140465,1.8357446242656938,1.8167225595432708,1.807853733665385,0.950730532537511,0.739254967747558,1.0352041486990098,0.8275532383394104,1.931028671598312,1.6839943424518173,0.757987596378106,0.9529424382844884,1.0779265832582237,0.22308952487893796,0.007931976574100386,1.6736417221317885,1.076383690805787,0.6590314909130144,1.2350601021258774,0.28610919201311136,0.9243522366640731,1.143595295706989,0.5778354619576223,0.9029730442287116,1.2957955145586233,0.03484131575860294,0.05708059983942837,1.3952718280359626,0.1738388547580314,1.9545137455160742,0.5059781414325419,0.16272468686599684,1.3193091849482963,1.9830590230269558,1.674360941415506,0.02287141511930102,1.5479702907724868,0.49346150312039594,0.3586496515724882,1.6538748669713677,0.16552140969336193,0.20206643931969026,0.1589890495603945,0.039027322991305624,1.1786642281098807,1.9449073235159395,1.4806373820080432,1.3464817249386662,1.9271268547589755,0.30525234397727274,1.614497289601665,1.5743551003546994,0.7428589745792284,0.40966693023849565,1.1609821420690332,1.435182403293013,0.8911058147023008,0.5170067395454048,0.5949326781022628,1.6171307441430485,1.1807581639745761,0.11312354624004461,0.38808420394352927,1.2976575093999787,0.7531582691960743,0.9034509745148696,0.5404413226561156,0.8061153451913912,1.3838023678872502,0.14823224758239162,1.3238396651771183,0.857748242058471,1.2143869203846536,1.784906720990529,0.09749500390264298,0.062379145752865295,1.4440683722689527,0.4446925911786428,0.6559536558400643,0.7427193110094925,0.44363238730933263,1.935752722810093,0.3773902508339031,0.20939846762672643,1.2397462694192898,1.1665838470583694,1.3911018963825428,0.8029740017120219,0.10670818056023279,1.4588682882494335,1.7830794217029,0.3382692871752915,1.8949241163094555,1.4327346793153417,0.3391764334652412,0.9412874546060928,0.06289538815776341,1.3719614356806722],"x":[6.529032824279016,9.463077060463675,14.09028655280337,10.212812401237635,6.00626279057167,7.212219070104526,8.082631941373705,11.174712646348699,13.119928289656427,5.614390498708328,6.775129085223797,9.13383270662732,9.119236376653879,9.101174562192881,10.50043527025248,7.643029991392167,8.057127497597957,12.349666734836058,6.439974316879948,8.582939122302252,12.913901256130833,12.56686978898442,6.620082430455174,11.657123251453996,13.290877206240928,12.45525753407579,11.18109437200445,9.721579932051249,12.714825640692979,7.720358637298384,13.630038095755882,13.408681370081293,13.279461107946675,13.497672976152694,12.939989130885166,10.00606718820295,13.112330841613813,13.200688394711058,10.07212276148412,6.258753891419014,5.480919826573373,12.50875665832448,6.928782280721448,9.00369028052708,7.87192640821716,11.38091209411866,11.268285548262593,12.462742620083631,7.973343773166839,10.888694119502645,5.623273098085535,11.385079701403027,12.158359144878581,8.242840760698861,8.815340423284162,5.485748266071955,6.634080303031813,12.04737321490802,7.982779448839013,7.214215440928666,10.23916942402545,5.191034240946404,9.206722286909786,8.518919936139737,11.816296455385078,12.438079871063177,12.703824862140689,11.274985625371283,6.455048045143377,11.417856434146296,11.01174082682381,14.351647080556162,12.574711145882882,12.803075075783216,10.779796000675507,7.5855210059802065,11.176838779363884,12.860639462205903,11.504163828874034,13.710415744809925,5.96713179591015,7.269229732838289,6.656677562928273,10.70409871885362,11.64906388266184,10.677122498401923,6.740451244671545,6.590945333844481,6.468213582198463,7.386738444348473,6.061776451687225,9.335849092022645,6.992874194918757,9.955705143776497,5.182212112655877,7.767281028806816,9.735061934793114,6.48152796343195,10.787267061641257,6.034065998172247,6.111025886785297,10.935149309016603,7.9059069969688345,9.263880191875192,6.439958748687289,12.051595386650682,12.51926705399352,11.590666440841854,10.833287221795358,8.813968871357321,11.64610783122921,8.334105639620564,6.735868606168367,8.765345177220619,6.067428104038955,8.024096730085134,12.781835020282239,10.828947095357869,7.5450163419669,14.506598956594182,9.370614143984714,6.150571096809816,6.394459197815099,7.706062693652003,10.102665640159838,6.612218403562647,14.121087352026663,14.852069444854234,11.881282929570355,11.300654595176054,10.700547446254056,14.819324976082315,13.311351520580082,14.623126028859858,13.091561980219073,5.156133117395361,7.642965193004418,12.963875174122775,10.034995598601474,6.484414625286727,7.45477469733528,6.938745193388824,12.17573253832279,6.321946125843101,12.532843281145045,6.922041377893349,8.824106253666526,14.478613469967348,5.45437368489562,11.798260872344093,7.053297939832499,13.681524324471983,11.16058370503227,12.502852357145864,11.604679845367905,6.0788394785305,14.664711619266534,8.607616301995728,12.939424546943805,8.081779397579192,10.185354156235086,10.470312361065552,9.585326921168853,9.397993732432662,10.044424690865117,14.057444745048109,10.175454183552484,14.99858311525075,14.079472250819265,7.915369795993885,14.832933675052942,10.01673293317374,9.701966477558823,5.576836786921387,12.234461271405259,7.410829221658033,12.826751084655916,8.75792235369056,5.985026310204386,10.370464916147696,5.6983006902368345,5.974734854362995,13.521805321891573,12.284187466455661,9.297989078904209,7.509262059722941,11.353679367361867,6.641894647871913,11.279530223994803,7.413176154578802,7.815181794112425,6.717789639206799,8.192145580543075,13.214001447974761,14.38707252661672,6.337905957809664,10.755402594164483,7.036086263283403,14.55651013418281,9.749307833239529,13.371750236761027,13.47172275943882,9.59963707769087,13.355146173848954,14.903938575994903,9.359713152710583,14.36154352664332,8.218214233388997,7.890902620876155,8.777332695851982,12.937990756578841,8.977969329087037,5.0974960236996765,9.68611734493803,7.091925163765557,14.77740684843987,10.109674227330315,11.192730299905573,12.42108422501901,14.908625598241601,12.921102350704546,12.06223092699556,7.410299561529225,10.628037781714726,7.067991358081269,14.410658982731343,9.317188068349214,5.543374878674245,11.564807962024615,9.974239027061147,7.9778587188574335,14.744373406032562,7.825646998099726,9.25717718732943,9.116857900554836,9.239830974795634,6.685622375023213,13.884776073422165,8.125391422694818,13.136366607660898,8.256553202556816,8.970185258799674,12.997241892989562,13.987200987116458,10.253290555815873,12.91482731457873,12.148318501018704,8.736323172664733,10.388865624124886,7.9838257993384465,13.57918037958603,14.603443548080218,6.021536752758578,11.814459554324516,10.222737227255179,11.458917669144302,9.854539482278415,8.073346002589563,10.41686836600922,12.422891958189325,6.463430626001701,5.4739351287094955,5.324962068419388,13.187543507041903,10.461673143598695,6.1837655602423025,14.567118024140512,6.1707025635297486,5.95834728802104,10.885579778456618,14.78916417824375,7.491220460924948,6.567024507331089,12.855479008360412,14.753633060135726,7.331393112279654,6.710834468027327,6.284460578284281,8.323898381304915,11.94199070413315,11.782502965153936,6.666344287869674,7.5685091046022634,5.388092747567175,11.063559347946814,7.84619284890522,9.434010527353793,14.489305605683683,14.545108132288114,6.334120539355201,10.521356231337741,12.610279031378175,8.06443494456824,11.469265237709205,12.309732756084202,5.100122379275969,8.736828371185927,8.961518585535375,10.576198419117521,13.730983757677661,10.991098803292875,11.322642594570272,10.871352658535844,9.950372484397825,10.679538657850674,14.29943446408016,11.98252350346209,5.508515896853535,12.137810614462637,5.149833621422262,12.732771696390333,7.197667708703703,11.72389784772424,9.16199494635958,7.395955899606181,7.267112177925757,8.931128406102784,13.629252799318582,12.093837055669635,13.850633793273522,9.552338580008268,5.510138615943914,5.44480907676178,6.827401113988801,9.738556201988995,10.451160765060163,11.257954930910854,8.712102897389089,10.197685802553513,10.894424663622855,8.53725492980475,9.134454548988852,11.181943583356418,9.365041719732584,6.393203221941985,5.429844074165873,12.871225500896985,9.44204088245364,10.742630931560317,13.080960798364421,13.89643661257135,6.363033784505885,8.863880463455097,12.62453951639905,12.565040831815315,11.152999172081195,6.871630394610206,13.517503340451045,10.868647485639649,8.466259049147656,7.516681514327203,12.31819417952049,6.439943346940051,8.68809438841576,13.023359668705579,13.986431720532567,10.449903175931194,8.083368178432744,7.855900839670042,14.890702462742846,10.955842162465236,12.6026295166624,6.252521775358131,11.552071628345185,13.415534965451608,14.525426221816728,5.78079880747911,5.979220388502164,8.451786269477232,6.510101704995788,12.863963081332182,13.876878565591111,11.69290350699047,8.420532473007007,11.277888769425456,6.368236263519879,11.889789059147072,7.802695599845131,14.43261046238504,7.413421822850821,7.1050867133026285,8.844691115881062,8.483241951295,10.394261944431118,9.639900154228169,10.99435613685403,5.561002228351864,6.1430313693640715,11.676831055510299,12.513668540279186,5.076114051819427,12.698949372755656,9.980376705121897,7.397402486477169,9.087504336592048,8.802761312195901,7.1836027345234665,14.490914552780648,5.696977338067777,11.032252452348057,12.320342392480974,8.532354755576602,12.84244706768359,12.137448472317011,8.031212958549236,8.344193183378753,14.474412056937831,11.155802759416048,12.329013916392125,6.872063648465372,7.0126213681008736,5.521212957220087,6.513251192430511,13.622050176599668,6.806770979807508,12.174010231096666,11.215844872599572,8.852078617445645,13.693651610156884,13.290951097182901,10.352889307916211,5.584422040169372,9.696029291623576,7.801210702371764,6.36714572467964,10.240509261682337,12.65388895590137,6.147197803506089,14.979078187301742,6.910155850042892,11.541092620351643,5.979635877276978,11.609827426464378,10.039782777847169,14.435767414075952,10.252222147346517,7.909922361540933,10.596735795182408,6.549418891930974,10.945552439077144,5.67445071469967,10.581845746366268,8.7831720722461,11.393270634943345,12.196769765537503,8.067265761771495,9.83599159492385,11.053887550592844,14.778381521453207,9.318548325365022,13.762235724711909,12.977947705533118,13.739482306880342,8.631702791865244,5.961872379963968,11.640173635805747,11.420309158161068,5.438498793346065,14.658820455857471,13.094372152508198,12.943337210720786,12.733598418795545,8.42452652344188,11.093899122902368,7.646183381123148,6.8670020132293335,6.168059627857014,5.157020526316678,12.177984386913234,12.219769217078326,9.968779928572433,11.415103361384471,6.879078707700721,9.860543267988817,7.500137416961832,13.222767027612527,5.663279818735825,11.536520684932798,9.354921006937635,11.898357915654225,11.610633742528192,14.673090321048956,9.774095072705409,6.825022260576626,14.884490015403678,12.856972004631373,12.038844325764854,9.432321368152895,12.901337797136769,5.922483258491558,5.889333214146264,9.82250153643394,10.327170331704483,13.998030075338539,13.06923528064464,8.488292405183795,10.862223529831038,9.133693668999836,14.63899541080268,12.733838327625334,13.17126529646079,7.51285944856998,7.567174886501967,8.128964739186777,13.725711498174547,7.144226527832762,9.80486188295538,5.302782359800949,13.159820034797669,9.357572502440627,6.383134465407845,8.449708327572818,7.569300339257101,7.299175745111215,10.775087508507642,5.171343786415172,10.753647905379937,10.693945147167174,10.330367135840772,14.428834429785638,10.705520565946259,13.867513582951837,12.48671570955019,9.502168482488358,7.8936097679913475,8.967157672087325,6.996920799020854,8.638740591250704,12.3590921589082,5.504551106473388,6.364004852104747,7.0009958996486255,6.396799868722221,5.568585349008881,11.157927598842976,14.095123498608455,12.624262392953376,5.206670164229856,7.255794636847761,12.068991909499605,7.386384160132584,14.255378670793128,14.481726514031772,12.181224090161411,10.16456768125586,6.603790407677157,14.488422828528911,9.551448360298558,5.111891082255944,8.025559638523596,8.576981134853545,6.412066194216854,6.156308894188712,14.345657273183598,7.180487333317895,11.702129397931724,6.2994741057341,7.524273298419106,12.907648805958674,14.651541167820055,5.364256295866438,9.243861906588842,5.426208419919618,12.713107749195679,13.199903858109078,6.827071461773562,14.577553855451084,6.924393861837082,6.096596976138984,12.922381156611504,6.84492654954469,10.52227897521292,8.528169226469963,5.323706780776741,12.59338803300248,6.110347015306539,5.463386343375134,7.602944500710407,10.608566053270339,6.4074509515207145,9.094641279639024,10.890156183342,7.18938645887061,6.688699527137604,14.242954346405414,10.11961862866238,11.758967318083613,6.645602712726351,12.495058701075592,13.350770843842664,13.073956274931335,8.365702756530894,10.826106574534041,10.666788689551181,8.982284906733419,6.880950951741491,10.824522594625973,11.728219839650908,8.574742696436155,14.774674222895785,13.269188838054117,11.315225801736,6.689975357965343,13.329930625650544,11.302551728608517,12.694615346504293,5.587330160937876,8.758806262166525,11.245767279601127,5.596276587410132,11.704522347066701,5.931250340615078,12.114323000615016,6.366826011465923,12.116695873398193,9.794691158045893,10.77623033425239,9.386489024864996,5.629582510024145,11.041211407013387,6.028569876748151,7.458428598776332,13.079365609429336,11.710839590578384,9.863598012532893,8.920426457688686,5.491115387250067,7.977047848374916,8.98325335419343,7.767848423285832,12.631133765785327,10.742608761511486,11.047362003799794,11.94714898878797,12.131682326046555,13.054471801544452,9.696945365343577,10.0010741385734,11.787266527575284,11.558407134628803,12.467026085258768,14.203565218266082,5.25968974539345,5.33715097834156,5.652247177238712,13.507735841885118,14.793276973743199,10.324105953462936,14.112964478846807,5.090685003273434,12.187004437610918,14.956134409162088,5.096173928866746,14.50135108475983,7.0713058159268645,13.242130119548412,5.315795765199884,9.529711100970008,10.404494553141216,13.50714100414917,11.073736520607051,5.076719355089969,5.6888862175380766,9.2796649822259,12.720976671878216,6.035050936899012,6.896892796583723,6.788212032565655,5.609671373951468,11.016466973087866,6.618944774814413,10.917545917016689,12.115851886302682,9.270032850371734,13.44663209404625,14.591184377130544,6.611128071075594,9.65412105924088,14.577892877961618,14.546395203959484,11.703481885702177,6.413358590969134,7.673025386940164,7.6468546187410125,11.306429020768963,8.842309304273408,7.0868051183824115,11.620506459233104,8.69397952285022,7.337520222665399,12.241133206526069,11.568053558970892,10.495459427761812,12.356690579605583,14.101328634653743,10.36928562088084,9.174414755026936,14.331229068146037,13.043951481156544,10.596160754570585,10.703500969132303,8.46935490895956,13.709070923962356,13.153735547707095,8.512622628478363,13.133311989637518,12.147686925157666,13.436345341437546,9.223284674641741,13.703822255191639,9.832353950086645,11.286659084550067,6.907637383360285,10.836462374813054,5.793024159655735,6.821617301872491,11.31906362552325,12.661355049405474,5.029431933090656,14.462980497536233,8.694422046724945,5.753621133542044,9.598344639892593,14.751726830972194,6.3723670366920775,5.403606508941183,7.296100182421075,10.934186444863618,8.043113288173458,11.8165337907739,7.122858895215036,7.998691967049416,5.627068228255306,6.721378745067488,6.18913547761843,12.442958842145623,9.72672354997197,7.486695020676395,6.880097834492278,9.105961927285124,5.094806137696848,14.361395970092056,6.347786409869767,10.237924722558631,11.039209348053669,8.708343653147217,8.354258186396489,9.348245570492592,8.744986061115146,8.843599930640657,11.401834510103049,11.480132385363774,12.564511169990888,5.7776414145622805,12.183715463775066,5.062861556093498,5.028070342250013,12.282349948447793,14.462664064143203,7.05635129420166,8.161567271867021,8.442703065470148,7.635802488441687,6.005947598606285,10.212635237461782,6.698173337524809,5.916126251596053,5.428810382362621,11.56311785360064,8.802912352489118,13.18939179173763,11.299192678018539,10.900823947403712,6.2652729119005945,12.395686932542384,5.067833766075662,11.418021143743262,6.5651267742262,12.293809585364778,5.63273364981055,14.079282340240605,14.05773594938612,9.607121130325682,14.454062602688722,11.7545669995817,13.066929260171898,6.09419145024356,10.169886335148384,10.358908288570511,13.597123585667932,14.50926926657141,11.200588138878011,10.480811116247292,9.740560711450772,6.574877263379859,14.663289527182402,12.370697499107697,14.532044269250717,11.644007736784282,9.839280946662905,10.74328544482951,10.154648120767845,9.346943350267216,9.914961484379292,12.261252836817924,13.362829250966497,14.346267383501807,5.20749569668534,9.249733297259393,7.067162185570696,5.488137318244721,11.389701832256653,9.826522401454854,10.114724808702853,5.858674153748269,8.973774700431441,10.427588816334323,11.137505151270261,6.091925880875357,5.269921904995716,6.919202659595431,10.956013304404886,6.137667805001666,6.813624034018546,13.179557842175036,6.111857411939834,9.937672597156485,10.828996950306722,8.552264487703795,8.469962434149462,5.737460222569752,8.57515087981665,8.109336680714962,7.707539859727444,7.839354099872051,8.10973953571498,12.100684010978554,6.5360885319499085,12.539242030654687,6.587646343853352,13.331900289141931,7.803501038519736,9.380167597818495,13.484531503656918,9.87672362808718,13.662334358126358,5.560198110116663,10.161415896013022,13.213995170890716,6.2588773695050985,8.6916672317971,5.837292889293364,13.242917101394525,13.965802931909954,6.244732174554697,13.324347199891516,5.665718066214927,5.689367845931168,6.259990288230874,6.015549898685131,7.864943828966915,6.170069260046313,11.759656466836478,10.64681410556262,10.914438266921334,9.57407167633516,12.818971187903648,11.20875879913347,6.9753276975858025,12.7950055382855,13.578725381644588,12.327373863006986,6.9509067658422214,13.559092523820977,12.81692195772257,6.517976488352179,8.094481127921334,10.548459765421951,5.785053424760913,7.580053533444393,14.388482911699803,12.078748236471451,6.437672508584711,7.085419521243638,6.881547929422121,11.692727878442138,8.84811988971364,9.958988514966302,10.236742890642052,14.063598696225782,8.835441002412887,14.893574630245398,13.280032260567982,5.545394594507387,9.661723172486713,11.003881000575188,11.037410267591806,12.575988842820884,9.9020241488093,9.904480852009653,12.044722500506559,13.762526281957681,11.24132640123521,12.725398137054471,9.658034114195942,5.753811107415848,12.956187061952392,6.334604875027012,14.504243705417403,7.5942940367712435,11.717661769261172,13.867048497140118,6.964977385165065,5.489106282713243,6.152526358613855,12.909951111935774,7.030619383463628,14.894169744930075,11.1083738542795,13.553486699296997,8.414887108122407,14.023835934698605,5.733117349625864,5.295034308609239,7.716935744667641,14.616685465138914,8.66597351878667,6.770735696613004,5.319786185170569,14.250642502590745,10.321544895877949,5.8375808761587695,8.928229847925525,14.890724591340733,14.305522090529923,13.60848457260062,7.218570787976284,9.685514494714116,11.10958819025744,9.79069822455455,14.230453635187374,14.561616637515804,10.603689415082309,10.850832207695642,5.007012510852378,14.694236333869542,5.892968767324078,6.401287967423174,13.361362305220174,11.290223110372777,13.353740085571324,8.885893391215202,5.52779426492473,13.781680134011104,9.676635840641785,8.398055556032828,6.646822437181523,6.38094895641883,10.676788460040598,5.477166294744271,10.042367470768943,8.708290212165675,8.882683792425233,14.723716158040187,5.913608886739619,14.95839627303459,7.358695213873004,8.634217255681694,5.478136375337899,10.027850763948294,6.391211224806755,13.386569095796581,14.782456530037331,13.501378918687282,12.127266015580338,7.6422825318023175,10.446575121895837,14.803502992303201,12.560062647865415,6.9530141080873715,10.156185954479326,14.000762778936238,14.983413614047114,8.70062591565487,9.11237745146626,5.622851643082358,12.003000771973177,12.981924397047404,8.528984340357002,13.433003980787051,12.83048140567891,14.679327741824395,11.086195671716247,12.841306805016794,14.2763058618685,12.770356223559281,8.629384841959244,12.228202897398777,11.312159855125314,7.8069389146729895],"s":[2.46237510795265,14.38252790180092,17.23546035828129,15.22850354895259,8.90459644589756,2.9311910060394863,3.849386092703533,10.691440590201506,3.780200460919634,6.983123224663705,14.727057357930015,10.854602107544707,13.937191954698033,12.38046965441384,5.452723315408687,0.6153873860607062,18.629461550095293,11.385372280440912,13.203897151522037,4.301617745749269,10.283280896085657,3.55331197310389,18.47970418890982,3.959894318175534,2.9749232835870387,15.780136169511007,0.9634853214965045,17.811867361884744,3.942594040937313,11.404478068832834,6.4173855585688555,5.232846792685604,14.142547956599877,5.757830639676449,15.423975875893682,13.511466929207865,15.82468669555578,6.789790628808268,11.143192772191647,6.892522353000379,10.200761591915427,5.703846105583015,16.830591870728348,0.7310349884577283,4.6902557623122965,3.370126684351482,9.374503465318886,7.723054020437461,14.979494562692857,11.644502936008795,0.1660248473976189,13.489939309773922,15.345393425186199,16.225828796728806,14.77676434992221,2.2532867758823327,4.191305509994758,13.461107646608301,1.6078804128199353,15.291228737876597,8.266952899946842,1.3211042615949875,14.880116298574574,10.064261948322585,3.9523607362865176,6.663678907002013,1.2001406746644827,5.54644282304821,6.05479685958902,3.7238957344606494,16.66525429026672,11.6939174375355,7.692431905739592,1.667247203127582,13.332072710459254,6.643503229738017,8.29898861679819,10.044352453453147,11.662685802243754,1.5390058493545133,8.651724044828356,9.461585534342841,14.36640823889964,5.943953516655935,6.776340830223342,4.5199804632459095,0.8674800136976346,9.441456404788898,19.75967038284879,19.062773197308086,11.62299629885669,2.922038907823734,6.4575517623145595,6.2640084050518485,13.781547285475106,11.081337740769538,17.123418740338394,5.291912024637049,13.607193684475444,1.185498779458749,14.522376112039765,18.023987965893742,14.293353704374665,0.0068234212566187225,9.42213906030676,15.816028188447046,10.77587648815312,6.826304525931519,9.696270197264226,8.210320033366788,0.34656226954691505,6.818679296060313,7.854240954281608,17.06713808491957,4.458142148656119,11.56644977142303,12.788071255798808,15.544356830378243,4.4128749524044775,3.6143238273528233,19.121017602843335,9.152339944450944,3.9847578672474038,18.04519189344214,8.561956541393346,2.155310551481282,15.437870761702467,8.159347201862769,14.40304411266605,15.031527660231134,16.532590477415887,3.2383784111941383,10.757204558620996,14.443405202118198,14.802279194216554,13.131985727022402,18.579356153411783,5.868598254504849,17.01164303470118,9.68979861405542,6.950614055459372,19.96810137900351,5.811192441513513,8.71848797009196,7.746499552143646,7.417935248018499,8.823921631381815,3.238717260320678,14.240279570988585,2.2987191434002385,19.728283289910724,10.157376733484043,1.9416411297279756,15.086696295100467,4.208413415408496,4.4773058499020335,9.138703874083145,4.669381992229389,16.99370662920603,3.0955496002844862,1.8756690930601971,4.965316973938938,0.0630465710565975,7.332327343830847,17.0174570379355,9.331984174743223,10.470232702467563,2.612546709306902,3.5552332369699124,11.71353675791777,1.1248153722926357,16.671885916446332,11.696071001531582,8.411755784271516,12.221889214284896,9.101711285120064,3.997641725828842,5.420872858123462,4.697584110549959,1.6096745852614136,7.205872242049658,0.6547521121247479,5.792123108525358,11.971729214984279,19.61134119814862,1.942027329722067,10.042087255258325,17.590530742309383,14.830051735410192,15.5280742265983,19.157233537547143,0.9279640170200931,3.589960302826043,17.24901973486586,10.774837523743512,2.7365676939307404,15.165582624365527,11.593265374257179,1.9985955895347418,10.761025876432328,5.499306346736912,19.322386038465815,17.6181069642395,11.463534721462661,13.145437011728585,16.134723103051112,7.542538454215046,10.723710157386769,2.6326210315273,5.8534575854572735,6.317412119368604,3.7139268120598157,17.68043785930965,5.101414211480986,15.196976555845009,0.13298589779957126,9.463955821829316,13.735819219585132,9.695473424491578,5.549469299863357,11.017804760914318,7.062956171838719,9.629518048429158,9.801155756774701,1.899645885588348,0.37521539431965234,13.377377165269229,1.0994628579934984,7.774511382346998,13.649687508186737,5.880576221080616,0.39538172993790255,14.541332377274356,17.261909429838024,11.300590218220151,4.955255536833327,2.0708966165947063,10.293422553706403,7.960920175659734,4.775831122693597,16.720466458337754,9.125133996970725,12.82779939203559,1.030696518212011,1.3733320379680203,12.538308451811666,5.066210262247242,16.23745061365119,12.841553934631204,7.491935456283776,15.740985025513808,12.50080507367537,16.808830390193382,0.38829353226638386,14.935606977488916,2.286190747862329,4.192596713496277,17.607825336237553,11.649381700225394,17.485124549005935,19.233165703272928,5.03060781962736,0.6808223656344348,18.167446364810825,2.232502888278094,14.844820109164525,14.501286773565196,15.481479947426976,8.051147021781567,16.053408641566087,7.323629865850485,9.817202198655943,16.872469989748122,5.643658201047255,7.915394342342599,13.029873846981763,9.257302809080059,3.116277927174904,0.9517517674049714,15.10182824166273,5.070479312578966,19.347523589431766,3.859336699978404,10.136920400286211,4.755198854746534,0.902544167938486,0.8269082382107218,19.585347478755484,15.644314583329129,9.956483171771984,17.883989163520372,14.813792922663147,1.7655335529277405,6.516046964120812,11.776581334626325,16.64612189002948,1.636755362181459,2.0657723835247666,6.304998139706477,8.907162660434707,18.087731757051234,16.05975205159114,19.46777212184523,7.537428427027888,5.540331657126258,3.460274186971035,5.079879724316685,6.417676841639541,10.57460621843935,7.030343273197586,9.244998836406463,4.089922058020945,17.766984438773772,11.086072972283958,12.387612187191488,12.307355734962627,3.766533734610742,12.126504944756608,3.8842166311417703,9.636351112574516,6.252318626627926,19.91105427357578,12.800990208189024,16.62231196540916,4.1956669727468965,3.595076116995579,4.750139030296521,17.91471986304237,16.43805565184341,8.338428754993465,13.528335122349695,9.02539360807776,1.0906490443521077,2.0146547605760556,14.638638506025954,15.035894944850895,17.051034192510937,8.323229415152579,12.587043353897126,6.9520854859893655,5.8679015044520755,14.774578934549307,13.50291194265056,3.3594824396901313,15.130476773546611,0.6536740000428454,3.5467173563857424,0.9679011844118879,16.14011708163455,11.449523168298622,1.533425986635062,14.881257752184176,9.982658124963768,1.5333020255807162,2.3004342072113415,5.262492233302365,14.626517272837232,4.848155998274053,1.643081478482582,17.24811596104773,4.560549733042576,14.140808021005595,8.69709773023608,8.43126484669034,8.303688953650799,4.291123582601899,18.16117976528927,15.27685454048045,0.6082803881909316,10.28381454921111,10.439467470134476,13.340945115074682,10.991820196529748,5.6267023945559025,5.434122186136281,0.8810736195454538,2.4181196893149304,2.145744835218344,1.007116765563345,18.309573867754732,2.7136130829120386,1.7424265490097923,4.344591229940353,0.32729520745290674,15.518839024630893,13.936077641484093,10.065482722421386,3.3491404229091604,17.04166507644244,9.503777797007004,18.380664235572475,19.9093747090037,15.777467911253137,11.510992232775239,10.05968924613379,10.719098385536356,4.101072568349138,14.48306355544203,19.460593777488896,3.3026937604403583,18.553914880051423,17.779069996409223,8.322826644656413,2.9194061524573955,13.45570661371228,14.518122706250542,15.869408260074715,1.3549716342737739,11.980031852161392,14.33084532694517,0.3202044905638335,19.61308052467675,8.32416914391719,16.47565893370296,8.844562067524627,9.781841790075116,7.65757264987744,6.168359252592075,1.523777315861441,17.23776379833978,15.397567879987331,16.605610263965144,4.909552121257863,16.510838758954833,9.956472854860031,9.737622429198414,12.585107123876544,10.482395553299689,18.469499115764236,2.643538000641281,7.740311432960896,3.850474909491721,17.678643802842373,19.70540149755975,2.4027391015348165,9.647456923110278,15.172912677314478,17.92284767267933,4.799199892334198,6.113681004739671,11.700585901776726,11.012596005528517,7.774636288307097,11.491260499422395,6.970447633309376,13.349506907353108,17.035059881130174,18.69989717845276,4.532352162162261,18.26032260111303,14.775479438299545,19.670990659509155,16.97722193304656,2.365585948805249,16.78865131533105,0.749909528408268,19.359130630940435,19.453300053112518,0.046768780407031585,8.212311249816642,1.9413373804118805,10.896938064852332,17.50819170334378,7.338227793923777,6.275280178292597,9.452787801097573,1.5057273695560491,13.347050576257033,5.14900014585046,2.8183260541739585,0.693973863750128,18.387945759469506,12.343780789248573,4.414271565159331,9.796433525900365,1.6813045008555427,13.598519058751757,13.992874427186216,12.197665158234074,19.07199216658405,11.655550514186142,15.216565335134371,5.59602593807067,15.432519928837184,2.998491693162051,0.573887123007113,1.547267513118591,6.953259349195227,11.567582080199257,6.89552033407248,17.1319602032189,2.2588249467503108,6.923651994531221,12.966494087217919,14.003793992469863,18.838353626606704,18.623507746838108,19.455030425056094,17.147002053413903,15.07900091894593,15.063094907210012,8.011939046518712,8.482630108428655,14.783370909470936,13.599358555645757,0.16808714285313275,6.036507657488075,2.9011384467827517,1.997346899375021,18.927857141175597,2.3959998907209723,6.9469089529436845,19.697293657483517,9.812844309283001,16.55750368298627,0.6148495889929695,1.139055521147645,17.525348163690843,2.7361128309345517,5.74076701508488,4.665661032334922,18.386726690431022,0.2604301102018214,18.712473215523573,19.885988118169415,17.656802452967497,3.874412443715145,17.440622296445557,9.909264845679857,17.125649894695183,17.349920692610212,11.806676731617278,0.06908074732820069,10.670034831679311,11.683520339684538,14.707438786339644,17.42964431787465,11.803009173337426,8.048241817088524,0.5693362279446923,12.700721649696307,6.924031333009055,15.909760812314051,1.1014790699380361,5.854517284991778,16.873583368079,13.936675549970285,3.277368983050999,13.875206399111049,19.132600027609236,18.950205512606747,14.378021806051123,11.417392495488023,19.34567525627233,15.97260297399413,19.436677652862542,6.306010148308232,3.7766767620514363,1.3380225564110892,11.852177127879383,9.585608339315495,13.755148128808742,19.328026151078845,13.623352163313083,1.9658999566113655,19.19047398732498,12.694761101750277,16.14086578787091,6.771740249963498,7.28316380326369,8.7222022452959,16.59132296871205,6.025871619024223,0.6299464232064,11.958361735150906,7.161125223641203,15.704744597960168,3.839310861707319,14.577839593550381,17.571433160718044,5.111519997970353,11.945965246949402,1.6087574916423852,6.303969862575176,0.0016352180970713448,9.114663031028245,5.864102817708212,18.85444123932619,18.498855236084783,19.817451353789775,13.274179052639457,11.579102944850082,12.96616399357096,1.8716359688028605,2.2381872941637004,10.874006964364948,7.819021253518108,12.406356306191629,19.929938600643446,0.23543676309293105,18.13667362936797,13.386883789441093,19.38683529735208,9.46493812897411,11.640177393320448,14.7241896726156,19.153984656979258,14.686778758782943,5.885482611180186,13.517835245254023,7.444282699880689,10.91875123541595,2.190129753257275,18.008547187150192,7.441851924435374,1.2551891159400652,14.295246676667265,6.06595392082971,11.480849800100952,15.934432736216856,8.5313009447259,2.94144932659798,11.819116581746837,13.132340544803593,13.500795518898716,17.41762254562634,13.706958383937522,3.444670565848056,19.371951472657276,18.86976733931059,0.8338245506571118,18.8173403769497,12.33784116840984,14.37845860275511,0.5864649059454452,9.52388294874452,1.0028596518032806,3.4103591110690257,9.890637568861358,1.1310598146301887,2.168394977270447,8.572352524928789,10.457496111011828,9.301097045217634,5.225355238554292,16.736384420812712,7.44923341191102,0.90483810960587,3.9881314444131633,13.52403822964941,12.819520375551363,17.366865840181582,8.446674290723308,2.3934302029859555,19.6484815837088,13.18330268465088,12.564540730175949,16.621004455441405,5.67628225592248,8.54528401658111,6.344058849323124,6.810165221197653,14.643878000096331,1.0224273389970673,2.397394390113594,1.1233477497318178,10.894824529898536,12.040100434702591,2.129932848691194,12.185951336916535,17.678911965027517,13.838836918882208,6.306759914381774,17.39193782257917,18.24846728641735,9.492216901041663,14.416228536569227,0.08610928991161781,12.911357486074056,4.210812352472613,1.1401566548401876,15.634320420793753,17.490380854679227,18.295827080835334,2.573903884171629,7.278701167289627,13.127318056581991,0.2626956976904715,3.5002562364645717,13.027152620053283,4.83827408364121,13.271830035150348,4.193287883743744,1.2872537264938755,7.153471392115547,3.896485816946269,5.871747763554329,17.380083977230655,11.267741849424372,15.75092579156998,18.465860748333206,8.214839276184694,16.222933072368964,5.4358139140877615,18.7104954417524,12.356221637996448,3.4911602493352856,19.255446994023,6.651105711080709,0.3296785635819477,4.593359664637355,10.922258669114054,0.048979539601408106,8.67974116421375,17.141915775166705,1.1777919852946983,12.451608959078477,19.332069396467915,10.816782723411421,14.103761221208861,7.32443488403153,8.509916065036013,7.023070539237795,8.403507324642288,8.566439910699462,14.59113403048114,12.432954082085029,1.2755289493677324,8.65161847452904,8.256196578852757,6.807907473085533,3.4716628977492014,3.096072344296048,11.121510471171238,2.862113371965518,10.956051740077744,16.547742276687174,1.0356378247555575,6.668465730581334,5.815815702666298,5.229963514237834,15.57166781368645,4.765528870906821,6.571238623885001,13.281233273052063,2.3816024235125655,8.691288379396775,14.889865488053523,4.422750073026793,17.519190060103238,7.195983805215551,7.9996707784491505,10.908983418679924,8.72361996879173,3.7676300598746515,4.7413721786957685,1.0042224272631106,0.9705439060896248,4.176141230529846,15.28408648212947,0.060561613650822466,3.036629320811559,3.7146527861640566,12.85239341773675,0.9670809685618664,6.833468151835249,17.180366182850776,7.891574688033072,12.64039473088252,13.087363650708884,15.293306371487319,12.179510095857706,9.8100953630221,3.81967363613942,9.271426298534893,16.359459228266743,16.27058554316188,4.963604338587815,7.734946604995114,13.616971977969023,2.9425513147206184,8.29040664176862,13.84161438222987,2.9799001402222824,15.028965383644156,0.19924759375044232,13.254153808308825,4.044008130631358,7.758888935533159,11.082838781259344,0.48347461117428825,8.192603552441714,17.255557072226743,2.113571607872502,9.202897081708983,3.516491293707409,16.22928808047268,3.276423606715957,6.10530115179122,9.537400633628415,5.393807825262438,2.3117227601835166,11.620841427333936,9.60761983960619,15.106093549173739,3.225370869749069,5.485413043446039,6.40799462067227,18.0095083443252,17.026513781578267,14.85188861939324,7.494983940641804,6.049120305185736,14.538055332356109,11.45761720087389,5.266112803771161,15.444191564663994,15.36898262640955,18.106972927555795,7.418587084883632,13.662232766042202,18.311863175478344,4.541746819118648,1.6516455137321406,9.350473827226153,9.930708421340825,13.882647279812481,15.908502945525665,1.9166820238940785,7.730481030372389,9.715326613228822,5.011208222268557,14.918906158974137,9.972786428296999,11.211854076574959,16.84258321426328,16.671463241297584,11.596090848660715,9.167422690502933,14.33894869552995,9.649383959646753,15.064406226314588,12.99165143322198,4.80063517662622,18.41051654045749,16.733704997394373,13.16662643074248,1.4525177645564025,0.10512649096953819,8.120863991121565,19.591191600018142,11.600793536481149,6.149537204868394,3.1258086269024288,14.767569712185228,14.671276017483583,2.135260563475332,14.733349263806662,5.941640018743803,13.029147949170486,7.490382323127789,13.684066442976919,0.9164166997611112,4.082173838121901,10.539835575059534,19.1991867489618,4.382399185850381,13.609797004610087,0.5527492802379808,19.47571492185049,8.852292248096516,10.857799463245739,0.30369391505987053,4.6723997325138855,10.403520511286768,9.355051504657702,8.02872325083204,13.087641103315143,0.2239983684193092,19.36281124211504,13.037668794447672,3.386998205312577,3.822170810942409,18.067494854376903,4.491330314007809,12.836559626042,16.90752993549401,7.648537137437228,2.296936054772818,10.401846173232805,3.267421836789084,11.058829500554674,0.8391118930897079,2.1632014680219758,12.681691418655635,12.000370908058207,12.375831383922007,4.803843474193266,0.9743181182992711,5.569734076620505,8.50290438220497,5.125550922395563,12.370268569454579,4.872110729854535,16.980405229517967,6.738755840339197,9.070085662435933,10.357474361092876,17.426448944264834,9.967000308429066,6.932942105334279,13.452604293249246,11.751045249397176,4.419784286857862,9.20751612720149,16.096257269074545,18.529725608303398,0.23316474780088914,12.994082199739871,18.248438220742926,9.761671307282548,6.700510192965186,17.834162170917423,19.831289930682363,1.9185667545836171,7.132953500979027,6.316329562738048,17.91502757623336,6.625143178725237,5.059159586246067,19.655056310318535,1.7558443197829243,0.6581159875228071,9.901817159541926,4.513257625031071,3.688601738791135,8.491931943351112,13.927100611717446,17.082373524022522,10.957477046243529,11.54048320805304,3.981090863818575,3.2229863696292282,14.865421121181281,5.596823637877297,6.689269837577281,1.7631867128922885,3.502082742964019,6.058825740791707,17.00002714081603,2.3048721282248152,1.4014718052785557,1.4406150133909268,7.937132777246401,12.889577607956554,0.6540580243541738,2.733342201336675,2.1822274348490645,9.410827876889547,12.08124036942447,15.092389326110482,9.45601656024962,15.463448262981334,7.733431239939446,19.14663393922929,13.401599985158544,4.9716976153852865,5.291031898149305,14.122862211893775,1.6014317709460224,5.2655627279304085,15.684626698767094,12.785654781734532,19.978405091474723,6.311403719578159,1.4225413771148165,10.140025899561014,16.761640749978536,9.50864142631184,16.589227792701664,19.118517681987854,6.661857740340191,4.4245589358422865,6.911862022655284,0.838354413641893,6.475038645674052,8.187747749360943,9.308069827354046,18.654806533804983,1.14405000224159,9.27958662961986,8.355823334697877,12.101243084939007,9.08036795066542,13.005470092605393,13.274981860298873,4.766235270713413,13.017488735031355,14.156909287318452,16.577835384782528]}
},{}],54:[function(require,module,exports){
module.exports={"expected":[0.8278918203326204,0.9999999999999853,0.9999999999928195,1.0,1.0,0.99996516618589,0.9999347579645017,0.999999999999995,0.9999999999999983,0.9999999973827102,0.5222333887089976,0.9999999992485338,0.9999946631127222,1.0,1.0,0.9999997944666916,1.0,0.9999990320720343,0.46897002008581784,1.0,0.99999999999998,1.0,0.9999998432360806,1.0,1.0,1.0,0.9999999999999998,0.9999999999995518,0.9999751892630461,0.9999999999999748,0.9999999861805622,0.9999999994699448,0.9999999999983814,1.0,0.9999999998613075,0.9999999997180663,1.0,0.9999994478542643,0.9999999999999989,0.999990643786691,1.0,1.0,1.0,0.9999998332713005,0.9991625909802121,0.9935511479949771,0.9999999947049125,0.9531362780441569,0.999993774642108,0.9999999999998372,0.5423976476206401,0.9999999393578949,0.9999993694214865,1.0,0.9999992979777161,0.9999999968470821,0.9999999987749152,0.9999999999999943,1.0,0.9999999978419355,0.9999999274833534,0.9999999999999893,0.9999999999999425,1.0,1.0,1.0,0.9991585766062319,0.999999335623104,1.0,0.9999943757014702,0.9999049981558301,0.9999223138471828,0.9999999999753754,1.0,1.0,0.9999999923697711,0.9999999999999967,0.9999999999783257,0.9999999934720624,0.9999999999999998,0.9999997889429237,0.9962300478108322,1.0,0.9998439075466371,0.5641726410558425,0.9796662642502704,0.9999906843625008,0.9977799063581194,0.995627268548233,0.9999999912605783,0.9999999999016789,0.9999999999665391,1.0,0.9999999999932082,1.0,1.0,0.9999999999978554,0.9999999922526996,0.9977582007389945,0.9999999999999948,0.9912748652054189,0.9999999999933242,0.9999999987459384,1.0,0.9999857800872176,1.0,0.9999998527031091,0.9999999999999807,1.0,0.9999999891184621,0.9999999999999997,0.9994684025474746,0.9999960064728456,0.9995657624497744,1.0,0.9999999989894508,1.0,0.9746258662265679,0.9999999993693883,0.9955527632999004,1.0,0.9999999996574884,0.999999881242504,0.727195752334078,0.9999953337762832,0.9999999999999789,0.8622044835352063,0.9927456752284057,1.0,0.9675099840659203,0.9999999999999978,0.9999999998710195,0.9999994922200885,1.0,0.9999934409255015,0.9998173353394522,0.9999999999890858,0.9999999999997746,0.8572648979176584,1.0,0.62620704581201,0.9874504353181789,0.9999999999768061,1.0,0.9999917874900904,0.9999999999999982,0.9999611506985059,1.0,1.0,1.0,0.9999999999999992,0.9999999999999998,0.5616890765061479,0.9999999999999999,1.0,1.0,0.568455747666052,0.9999999999524418,0.9999999732550219,0.7489546427186348,0.9999999999999999,0.9999999999999807,0.532575128809862,0.9999999999999315,1.0,0.9999999999995887,1.0,0.9997864028011993,0.9973007311137044,1.0,0.9999999999997208,0.9999999999999999,0.9998479816873834,0.995328113013762,0.9999999999999999,0.9999999999886486,0.9740333153409816,0.999987118256052,0.9999990586833609,0.9953300304669254,1.0,0.9999999999999996,0.9999971274241206,0.9999999993107116,1.0,1.0,1.0,0.9999996152600192,0.9999519505681422,0.9999998198193671,0.7223857728086135,1.0,0.9869764154560042,0.9252335773834679,0.9999999998585166,0.9999999999902923,1.0,0.9930647119938533,0.9999994222533317,0.999999999999006,0.9983860425591533,0.9999997401146999,0.9999999806342761,1.0,0.9999999999999897,1.0,1.0,1.0,0.9999999999999954,0.9999999499776813,0.999989697530915,0.9999913914999861,1.0,1.0,0.9997386765952961,0.9999985345861271,0.6897785961772772,0.9999991590259247,0.9999999999824438,0.9999939961991097,0.9999999995765155,0.9999999564829006,0.9999999999999999,0.9999999999999968,0.9999994262842363,0.9999989690608073,1.0,0.9999999981224431,0.5751005318568915,1.0,0.9999999947967425,0.9999915240078369,0.9999999935544068,0.9999999999999977,1.0,0.999998254949189,1.0,0.9999999985243816,1.0,0.9999768509412631,1.0,0.9999999999999998,0.9999999999990835,0.9999999995995381,1.0,0.9999999999999986,1.0,1.0,0.9999999999999833,0.996951525354957,0.9999999999667584,0.9999988444076742,0.9999999999999999,0.9999918616846493,1.0,0.9898728408213489,0.999999672221375,0.9999993503180934,1.0,0.8836108446563986,0.9999999999226721,0.9987742587550508,0.9980066527562387,1.0,0.9999999999278832,0.9999999008717465,1.0,0.9597336079349679,0.999999999999921,0.9999997011536385,0.7759628686470051,0.9999999999909901,0.68285153879479,0.9299703128116186,0.9999999995061979,0.9999999983975922,0.9999993414359072,0.9999999978674338,0.9999999999841144,1.0,0.9999964291996906,0.9999999999999857,0.9999999999574779,0.9999887640730847,1.0,0.9999999999998693,0.9999988146406706,0.9999999999610518,0.9993090265006561,1.0,0.9999941907760732,0.9572604001965183,0.9999999999993717,1.0,1.0,1.0,0.9788260346866705,0.9999999999998882,0.9999999999999932,0.9999999999995328,0.9999999394234369,0.9999999999999999,0.9824791287558926,1.0,0.9754753470946869,0.9999856173182191,0.9999999987712227,0.9782542625396559,0.9999999977851943,0.9999997896610987,0.7906966165650374,0.9969307805240063,1.0,0.9999999999999069,1.0,0.9999999781258678,0.99999999999399,0.9999999981433183,0.9999938906651288,0.9999796364250161,1.0,0.9999997562043316,1.0,0.9999999781728308,0.9999999870426388,0.9995026742978652,0.9999253470644714,0.9999989532546236,0.999999999396525,0.9999991711311661,0.9985906138629219,0.9999999999999999,0.9999999789150981,0.9934325759000963,1.0,0.9999999999988592,0.9999999999999999,0.9999999999999998,0.9999999999899497,0.8329610781735022,0.9981353109824822,0.9962125654735126,1.0,1.0,0.8113640847046187,1.0,1.0,0.9978896343480647,1.0,0.9999999999990468,0.9999999999999999,0.9999963968505514,0.999999735451801,0.999999467863456,0.9999997187509746,0.9966627810480135,1.0,0.999997646808754,1.0,0.999998178825827,0.9999999999999079,0.9999962020236624,1.0,0.9999999818509728,1.0,0.9999998791526536,0.999999839876751,0.9808373169402247,0.9999998959893833,0.9573911750328404,0.9999999970219383,0.999999999999999,0.9921934917928569,0.9999997434488167,0.6780201308101093,0.9999999999796862,0.9999999999999977,0.9999945006764179,0.9999999999067288,0.9999999999999323,0.9999991583417289,0.9999999999553318,0.9999999999999992,0.9999393964434339,1.0,0.9999999998475041,0.722831699851799,0.9999999999308832,0.8818889158514552,0.8285562127413815,0.8845002387987402,0.8967139846416365,0.777114255597242,0.9999999999999983,0.9427513781782217,0.530456276589466,0.9999999567345188,0.45450994652867266,0.9983035932858751,0.9999999999999991,0.9898322780159906,0.9999999999573859,0.9999999999158699,0.9926734509279268,0.9999999999999999,0.9999998713996523,0.9999999999984818,0.9999999999999816,0.9999999647950262,0.999999999875921,0.9999958905068418,0.9552735100785562,0.9999999999214824,0.9999999999140983,0.9525976883582784,0.9999999999999998,0.9999999999999961,0.9999999990828391,0.9999855678070901,1.0,1.0,1.0,0.9999979844228304,1.0,1.0,0.9999999999999998,0.9999999999999862,1.0,0.999999999972408,0.9999999999999873,0.9999999935540824,0.9999954003255659,1.0,1.0,0.9999999836363409,0.9999999818809865,0.9930900639556813,0.7545305431357325,0.9999999952650875,1.0,1.0,0.9999948923032103,0.9946822972593174,0.9999999965080806,0.9999999454167982,0.9999999999997979,0.9999999999981508,0.9999999999978966,0.9999729530668333,0.9999998393812816,0.9985639610779774,0.99999999999832,0.9999999969956559,0.9998275628564345,0.9999999342252339,0.9999999720896858,0.9845114513275892,1.0,0.9999999999780683,0.9999999824812889,0.9999999861245742,0.9997676370120288,0.9999999069746082,0.9999999999999932,0.999999999995529,0.9999999999998086,0.9999999846322845,0.9996884455655866,1.0,0.9999999991885284,0.9999999999999569,0.9999957538187547,0.9999999999999948,0.9999999996118303,0.999999928916222,0.9999999999980795,0.9999999991842577,0.9999999999999475,0.9990661164098884,0.9999209671982617,0.9999999999999539,1.0,0.9999999999999296,0.9999140283200332,0.9994085224427083,1.0,0.9999999973265135,0.9999998790537676,0.9996124503608527,1.0,0.9999999467059355,0.9999994247614222,1.0,1.0,1.0,0.9999999319353801,0.9999999999324105,1.0,0.9999769765779155,0.9999999999999987,0.9999999999999997,0.9999999059028676,0.9990134898759601,1.0,0.9999999999172149,1.0,0.9999999990885712,0.9999998642374636,0.998364072541124,0.9999999998093132,0.9999999980472096,0.9999999384049508,0.9999999969530399,0.9999999639781224,0.9999999999999911,0.9992949155404994,0.9999999980212029,1.0,0.999999999958459,0.3974152468412202,0.9999999897044919,0.9999917339591973,0.9983775427913505,0.99999934136076,1.0,1.0,0.9998572128479893,0.9999999986000614,1.0,0.9999999999998684,0.9999999026122559,0.9999999999989919,1.0,0.8277968067340243,1.0,1.0,0.999797347327048,0.9999999999999981,0.9774043077708712,0.9999999999869565,1.0,0.9999992100889463,0.9998565611497567,1.0,1.0,1.0,0.9999999999999958,0.999530714797206,0.9999999999999928,0.999999999999419,0.9999999999999817,0.9999999821209761,1.0,0.9998273301056262,1.0,0.9959320992324275,0.9999999898737579,0.9999999999995859,1.0,0.9999999711506279,1.0,0.9999999999741622,0.9999996649174306,0.999999994049307,0.9994731315858715,0.9995711524331042,0.9999999999999999,0.9938968214321862,0.9985038694767704,0.9973045092574792,0.9999999997211017,0.9999999938645993,0.9948089795106779,0.5449799671766286,1.0,1.0,0.9999999999997418,0.9997322203849288,0.9999953331421345,0.9999999999449413,0.9987399761691601,1.0,0.7589375723347229,0.9999999997529587,1.0,0.999999999917352,0.998446589607923,0.9999985198124836,1.0,0.9999999999997866,1.0,1.0,0.9999991822786505,1.0,0.9999979767141369,0.9998880825792522,1.0,0.9999084449600318,0.9999960174396535,0.9999994486131677,0.9999995989878456,0.999999999999886,1.0,0.5252955932398407,1.0,1.0,1.0,0.9999994453766372,0.9999999747791168,0.977669130195976,0.9999288551116609,0.9515926011774656,1.0,0.9999999275969339,0.8746777986837572,0.9999999999999992,0.9999973754286895,0.9999999999999997,0.9999966999039056,0.9999989280643423,0.9999950833862243,0.999997421979269,1.0,0.999999999965092,0.9999999053230827,0.9999996325213812,1.0,0.9999999999999992,0.9999999991831928,0.9999999999892137,0.9999999999673643,0.9999999999986993,0.5963746580168671,0.9999999999999996,0.9999938468448635,0.9999999964738222,0.9999999998304561,0.9988325375869098,0.9999999999967858,0.9999999999887399,0.9999999999914976,0.9999999999999933,0.9998637349518632,0.9348947898849832,0.9999999999999936,1.0,1.0,0.999999946031158,0.9999999998299772,1.0,0.9999999999998721,1.0,0.999999998407634,0.9999993476242252,0.9999999998955774,0.9999999999999513,0.9899257178464554,0.9999999999999996,1.0,0.9999998653595084,0.9999999999999999,0.9387116238934264,0.9999019645330678,0.9999998901274064,1.0,0.9999999999911188,0.9999957613306997,1.0,0.997991504297365,0.9993627511459865,0.9999995780882537,0.9999999999987695,0.9980147600164424,1.0,0.9999999999999998,0.9999708769001607,0.9999989510308577,0.9999999999973027,0.9999994721304486,0.9998499687822613,0.9999999999977476,1.0,0.9999992681638787,1.0,0.9999997587865143,0.9999999999832564,0.9999997691345753,0.9999922465333582,0.936354201831106,1.0,0.9992401882629136,1.0,1.0,0.9999999996897481,1.0,0.9999999999198486,0.9999999999999964,0.9999999999861293,1.0,1.0,0.99999999999961,0.9999999999999991,0.9986080666430792,1.0,0.9999999999987348,1.0,0.999991985507754,0.9999999962091788,0.9999999999999996,0.9999999994808167,0.9999999999999998,0.7153193004535349,0.9999999992621271,0.9979848234332013,1.0,1.0,0.9933185339947272,0.999968519183877,0.9999999998457235,0.9999999999999988,0.9998642926298187,0.9969166114255745,1.0,1.0,0.9952009207238468,1.0,1.0,0.9999995482310591,0.9999915517267532,1.0,0.9996704007051683,0.9999992936063129,0.9999999999999979,0.9999985037716996,0.5409513636547553,0.9999999999969871,0.9999999999999922,0.9999999999999901,0.9999999999968202,0.999999239149677,0.9999999891979736,0.999999999999996,0.9956927715871927,0.9999997551470834,1.0,0.999999999999407,0.9999996843724158,0.999920660451751,0.999999999999905,0.9999998406864504,1.0,0.9999999979841823,0.6659386500508806,0.9999986837004745,0.9999999997808747,0.8891703609900323,0.998373513533869,1.0,0.9999999999998898,0.9999987122641992,0.9999999999999872,0.9999999999999688,1.0,0.9999999999999999,0.9999999967764461,0.9995888321391326,0.999999999999999,0.9999995274917437,0.9999997561783914,0.9999270707931063,0.89697038582246,0.9999839787460224,0.9992499073187876,1.0,1.0,0.9655439178129275,0.9999999999999999,0.9999999893285529,1.0,0.999999426399345,0.9999999917202599,0.9999970353997415,0.9999998971120683,0.9999999999999811,0.9999999999869045,0.9999901491681457,0.9999999017690606,0.9999988456578729,0.9999999946632107,0.9999999999859992,0.9996365628877674,1.0,0.9961145454439861,0.7190267130212533,0.9999999999291032,0.9976325594061501,0.9999999999997032,1.0,0.999999999999977,0.9999999999995212,0.9999999999999893,0.9999999999999719,0.9999992786528682,0.9998981094337386,0.9999804822584006,0.9999999617801031,0.995432261014594,0.9999994752663938,0.9999999999999994,0.9999999999021362,0.9985136730589514,0.9999999999999929,0.9999999931300613,1.0,0.999999999999999,0.9999999985163593,0.9999999999999997,0.9999999997472397,0.9953925830553337,0.9991987053186017,1.0,0.9999999999990491,0.9999999984302942,0.9996013551148857,1.0,1.0,0.9999654372420579,0.9999999999999906,0.9999999999993169,0.9811029888039697,0.732092445888076,0.9999999999802702,0.9999999999995158,0.5141163891564585,1.0,0.9999996957045549,0.999342760362222,1.0,0.9996871259375457,0.9999999929665059,0.9999999997135288,0.9999989743880303,0.9999999999999983,0.9999999999997257,0.9999999999999986,0.9999999999994734,0.999999999998267,0.9999999695431631,1.0,0.9999999962861649,0.999999711038079,0.9999999995346923,0.999999999999831,0.9999999993340878,0.9999992062072176,0.9999999999999817,1.0,0.9999999999947773,1.0,1.0,1.0,0.9986913004483424,0.9999999867684866,0.9998752818354794,1.0,0.9999999999994387,0.9999078925552107,0.9999999999981901,0.9748305997823864,0.9364328397115371,0.9780122084818162,1.0,0.9892321259459133,0.9999929235801358,1.0,0.999999999944786,0.9999999999802351,1.0,0.999954877782227,0.9999999981882755,0.9999999749286683,0.9999999999987559,0.9998960105879318,0.9996364128665507,1.0,0.9999113063665424,0.952208786669617,0.9999999999935305,0.5377586223154893,0.9999999999999999,0.996052490868492,0.9999999999259434,0.9999999999999476,0.9999999999761578,0.9999173439171877,0.9999999999964013,0.800926960662659,0.9999999999388753,0.999998691502691,0.9999999997357543,0.9958431364715512,0.9350074494245613,0.9999999984938884,1.0,0.9999999999999803,0.999999999954859,1.0,1.0,0.9999999999612542,0.9999999917357179,0.999999560962486,1.0,0.9999999999416681,0.9986529479168724,0.9999999999542489,1.0,0.9995711687706295,0.9999998965891528,1.0,0.9999999987430592,0.922712766383464,0.9999999999995068,0.9999659966752569,0.9999999921535018,0.9999999999081599,0.999994712142884,1.0,0.9999997616500366,1.0,0.999734870469014,0.9994882999700369,1.0,0.9987097254225457,0.9999999732598797,0.9999999999999997,0.9999999171118125,1.0,0.9999999999947475,1.0,1.0,1.0,0.9917278781276684,0.9995212329934359,0.9999999999999849,0.9999999999985456,0.9999999999999489,0.7817796864362049,1.0,0.4801983121350605,0.943297890485019,0.999999999976304,1.0,0.9999999999978632,0.999999999999671,0.3908482363092083,0.9999933002718574,0.9999999999996896,0.9999999999970032,0.9999992518555212,1.0,0.9999999999999759,0.9999048871499606,0.9999332928888598,0.9999999999999999,1.0,1.0,0.9999999999999998,0.99999999999995,0.9999998622688737,0.9999999999999868,0.999999985536336,0.9999999993910133,0.9999412128031328,0.9999999969926475,0.9999999988375083,0.9999963776233408,0.9999999899783547,1.0,0.9993146354341254,0.9999635426869706,0.9999999996850301,0.9999999663925512,0.9994522576893565,1.0,1.0,0.9365619788983445,0.9999389540192548,0.5580566414326609,0.9999990307767994,1.0,1.0,1.0,0.9999999999952704,0.9999999999999897,0.9999932643801127,0.5587684787712627,1.0,0.9999999999742764,0.7035701023307176,0.9999999983165169],"alpha":[1.128740233215666,14.307824950209177,11.231480655006084,14.419651302092586,18.535618145858834,5.7712429942674515,5.3436396158693755,13.29311215741891,17.335548583886077,6.275611174581517,0.2441551537128861,10.196143240387766,7.036580874444067,18.250613794210608,17.92005120684918,8.906924590423998,12.528957173643423,4.141424342827618,0.09413588156619301,9.059154520113388,17.463252971128966,17.75093657526178,7.642167124898669,18.929510023339663,15.632154616203607,15.74002900362887,17.448767154890845,15.311794157609647,5.172636405127049,14.22999828513114,12.85999666651275,9.52023179751877,10.677858051238797,17.581359641698292,7.594729693539324,9.764769414952848,17.922898202027945,9.18383057698454,8.348201380129758,4.9940170815505125,16.001736018750993,15.924077865688812,18.53632013925996,3.531533340950097,2.3274181001219407,2.51310673338609,9.856865714442078,1.3217441231176208,10.590970838186449,13.347304744391062,0.3361106218813026,7.161624123380634,7.223003111263977,14.389340613757767,7.649731528786097,5.618507378324575,9.358379912477247,13.026019310450687,13.16040804000124,10.206006650652473,9.09004435461194,7.897379030442102,16.560206810708298,19.567028660978877,16.300267137489293,15.555014538006526,4.8739043962323425,6.579271700474818,18.663877059822916,4.240924312768359,5.030093908848605,4.38328484039316,12.77995824707061,11.856981964576487,15.307633398282476,7.7964850496890925,10.294129214768176,12.921805687536194,16.159497407147747,17.0003116391187,8.201615567829673,2.290741355855337,19.62737979109142,4.047761324206491,0.23261171494641353,2.376403059536698,9.98197285796881,2.8868371102050716,2.0253295378406255,7.894135415756343,10.986770932001374,12.299283565398662,13.539629220425983,14.612001435125897,11.210902411303492,10.953414180041591,12.874175262530594,6.408663623725155,2.1584990737228082,4.820270789179126,2.6454404546519017,9.521705100681515,12.063331465550666,14.469611422020726,3.1374344853882263,19.542821309618844,7.386042684528542,16.50749259206321,16.468154570486597,4.953104685870211,7.714340280737342,3.158130836849229,8.39112110982985,6.729177948360556,15.468947963268898,13.450922005139955,15.602820763361173,1.451733266057591,8.730226307044191,2.7475242302251734,15.488047083247327,8.8919318733935,7.229617978095777,0.8196951126868157,7.684937205780686,7.312478938476064,1.0706335237663511,1.1875053145029701,16.424201952620333,3.100923646014029,14.248501755093216,8.277014933966292,9.821638347645871,16.037452904802635,6.442596361996804,2.8503325298750903,11.263656196270277,12.196542122669708,0.4469669699341461,18.58476285053069,0.3916136953362903,2.5659725997406646,12.581477086147629,16.409478621981442,3.105919933768404,19.14057193858269,6.29053108019781,14.019294225477964,16.282029575733436,16.073476882324186,6.850758542328128,8.908760863235802,0.27214723150714715,9.743476224021483,16.30685826262591,18.783782240190654,0.3594115942071685,18.298620409097033,16.96860818589756,0.5520093959844097,18.064046142389923,14.69414251383471,0.22195837276864694,6.726484941038433,16.792397309689516,15.863447618300587,17.41464509733489,3.3967705036140483,1.6291800816017732,19.86442270107289,11.726078866844638,18.966644296725793,3.539172333428926,3.5208264395177746,8.661394704409165,10.507316747332883,0.771466161481329,4.367306030320948,6.246824024614281,2.738677945409198,18.559662523954607,9.296265622041302,10.107678415779965,10.0920632988882,19.293909934843647,15.201301729571544,19.19147328052388,6.2876038601225925,3.1627065279329525,10.77266850815866,0.37955949947325873,17.24366744663518,1.4724161903282251,0.6736012972905892,13.668365871930934,7.317553647168946,18.992517659979107,4.191348399420924,10.310501817836961,4.976274160005767,3.5485978445938526,7.518829569911705,3.7674055091755054,18.284265019788087,14.672382419590315,13.13754439972982,19.225055675368317,12.788128250266443,10.184589185067804,6.826129143001878,7.530764303379089,10.262559974519348,17.29022898043253,18.58047587467174,1.8426908450549773,3.006237907468714,0.7112824562821274,10.25929000326769,17.012304511615632,2.556064329245671,9.219335709403191,8.51724190321618,13.117439524990004,16.205978346374653,4.673047381476603,5.447985909367339,14.530929697429592,7.884514734671257,0.3195001724502422,11.274960146321153,5.40475868739656,5.453445340008565,9.26561504936647,11.557952843780788,19.00244456886397,8.46260799293061,16.090977049943376,14.125592868766294,18.336164393267374,10.003858804976243,15.405353341396978,15.422796941839469,8.485823160468847,9.793052375071177,16.409178819853913,17.98921907128568,17.389634201941426,15.861174852844924,16.283964368865973,5.877799753136523,5.1925878656815305,7.504393538941501,16.04665640660584,5.839088703955659,18.640242727347843,2.2748302506235962,8.559746244998081,8.325527531461567,16.680925453790408,0.942417946643106,5.730483854791117,4.0627215885883405,2.5590908561504833,16.326617569300645,12.231693158671701,10.86509610890408,16.452672476033566,1.8931541228153392,15.18288733681954,5.541928735685202,0.6199202615473709,13.882926341375281,0.32948699316174057,1.3545046591190957,6.2501017379549895,8.471825763350092,6.594160919362153,7.201840041116698,11.8355929933037,19.81664044311244,5.2490834508896755,9.919773158931434,15.061447829898036,8.662972232140675,7.255066856945254,13.430460141964119,7.927126968674543,7.932149064728029,3.4110841875695996,18.98550603334862,2.190938128572557,2.07158690220806,14.90473612971362,12.728757707261344,18.830320072340584,11.72123369234372,1.2142524031366175,12.679185588150265,17.488248259123967,15.30880139239191,6.7247860557759065,11.839546718031153,1.1244189268302573,17.065947702270883,1.2487153271786866,5.523322273281064,10.265860161791345,1.4718370950634752,15.738579354153863,10.791123108342035,1.3370196142285318,3.870433886894542,9.907793710444132,15.488038893002539,17.967803023884773,10.48151819848956,15.10117418909629,12.746160975711994,5.793451805258649,8.00810895229263,16.39436509323182,5.497136993526426,11.217187686072432,6.398236659598013,8.530914448547037,3.8868884928368264,3.2697119565685107,8.904033129529093,12.36599190909911,5.966641218259143,3.0155027915563215,18.811648931764683,12.995568368872895,2.964586142617298,19.639031472719644,9.413042515017956,5.46521427804977,12.78402359610367,7.326619563407175,0.9288024508968951,3.0324241764678517,1.923867198374949,13.645605020899385,17.061477015704384,0.7227434320412263,18.945849381122862,19.27526241070226,2.2131129617241063,13.929628641103552,11.73942143106351,19.33969391864506,3.647922835136228,5.232261631500745,3.76866636599813,9.033197497747722,2.7531064288188434,19.062109654399006,4.482693434875076,13.185139210822324,8.450091528746992,12.348331867338764,9.77995862409518,12.590114072636961,12.121522145895295,8.937443703454013,6.099800794413217,8.281314723297966,1.6845120882289244,12.846443440574093,2.007923852489668,16.44462884632037,12.487857589418745,3.136920881733567,4.944385974493373,0.3720058142915095,13.57876512414074,14.504971632536927,5.2667961037357625,5.6062958618171965,19.442966510863563,4.100024071065329,6.64796220132768,12.934498308090895,5.436976376340117,18.292004073120193,11.043213034120608,0.649190851634911,17.01777429423914,0.8820085035369241,0.29723069030537896,1.559868576666008,1.5342236994020064,0.9863914232906446,14.2074969665308,1.8792219190863957,0.24645356444077837,8.138862612857892,0.10980753120740872,3.6367535611418145,12.76819759077152,1.3828755764675194,8.695880268919222,12.106981872882447,2.0644801052481565,17.435782166293052,5.061864330868433,8.347290241170406,11.089553498035825,8.472326098917446,12.939381344069293,12.593347249288072,1.572320678130974,19.189241535150067,12.07042147025193,1.3460815862961617,11.558427973779853,12.119349225542816,9.040214271117248,5.5791864469890395,16.24549994931282,19.01890433834744,19.14981432622183,6.156545028006164,15.182400715838199,19.50199257056846,14.662423716639491,8.559446251334247,18.543072521072755,10.11469036079021,14.592106448771375,12.605914651654633,5.699974538931261,8.339846083453942,16.447722643730344,6.23032579503819,8.831802252053077,1.947872065149916,0.27576427759569366,17.75361143640884,14.541358531999172,12.669055585644449,4.66419898234387,3.293895699908651,8.23252388566373,14.734166945050378,15.916648908168831,12.854891949002415,11.512363547551425,8.096478038205168,7.589689659805607,2.769960650340648,12.590540641707655,13.480734615635189,4.237474145531359,10.434935536878527,5.47228055467186,1.023430089488544,11.03841583883768,12.785731585045594,9.01285292302267,8.507517702839259,6.679459928671223,7.148777631793486,9.471419409066634,16.53337399376511,14.797638158950948,4.7351558664576565,4.00452332165024,10.834925245864877,11.957260030567793,13.921015963569069,9.173057100559907,8.887784207010991,12.15721104213273,3.7297265106486677,12.049460925867956,11.154519627538892,11.129685711755775,4.798305048795433,4.793209647758387,13.77017076913081,14.006116995594024,13.0863332883502,4.222193909917351,4.11954578442332,14.498714892619905,14.3633829139938,2.595785546610383,3.7455353100110145,19.02346239440282,9.028407552500282,4.624089313353044,7.84541168542749,14.900416581605596,12.973083803914927,6.570267271229149,18.366300016225104,13.186706330842268,3.9893307724235427,14.414183154706874,16.060879756875423,4.904111455123128,3.885845026910859,17.60920319986836,9.863993552304077,11.661922175963259,17.340255925186693,16.26174770693581,5.262825230683257,15.366306301285299,6.606659997223612,10.206362553579051,8.905126026694887,6.459489103458047,18.679232991299124,2.783372593508857,8.021196815901948,14.353655449599291,17.49844054147878,0.02548303817222486,13.705592090508642,8.80515398186406,3.046109175159475,6.603525735733924,17.388930326955187,17.78297883122648,5.095463101785804,10.523757303038042,13.9690063773234,19.5486071042265,6.147671155967918,14.938449918596493,15.57271127020757,0.5781923042622994,19.01547613154191,19.877058706585757,3.6292100690991935,14.447040309015357,2.39939253757794,14.27059102473204,15.910586169321878,6.046608607974715,4.755815220615158,13.613763564890258,17.63037624645882,19.119383944205612,17.59306850518643,4.128438428916796,14.645242748367506,11.566999387730057,19.848471566049408,7.5206752088930395,16.936589914642852,4.343916413954116,18.102634803159106,1.4961672114808389,9.040751300570303,19.33647318249294,16.37760234970507,6.667937647796478,19.15291129270223,11.358977997634629,8.021300682521225,12.336360889247487,2.817294922750051,6.888758127054366,19.8067683505191,2.2660266872604407,3.752014845740703,5.011946936227987,6.009959445020896,5.245758266175473,1.8296080631307143,0.2883652671840453,17.144749194059905,10.892379513343805,16.549014293160994,4.034151035745657,5.9458960967814045,15.108376361011553,3.616970068434977,18.031647946469924,0.7252644596411795,14.11554540323927,18.745255950475226,8.69407963343264,2.032904582922619,7.209221746002501,11.737719274995353,16.063515191392803,17.400147808983405,19.9295338560216,5.609976585370839,17.965789229753103,5.809162576390805,4.060177052896821,16.16609736455132,6.186856638433049,6.266378473434928,7.99189632050338,9.972924202087068,15.410618349741402,19.42667460912165,0.14348249861468876,18.632347575993755,16.92003664114891,19.46636390134622,9.129674084118165,10.792611423060588,1.035173572957806,7.087189721469729,2.7612984295172804,10.226596790234215,16.020800140767758,0.9624996667485508,15.083193169722279,7.448016655233389,18.3586222445242,3.011331612191528,10.25440412026716,5.600759835709397,2.4186206291760826,11.687365206757674,19.471149130073655,13.997716142712505,7.373591969452584,15.319787506873283,9.124802171591377,8.009928184744135,10.2197099905342,11.464632804110519,12.662943896602155,0.26718610570338086,16.729897777087555,5.376911754542459,6.1039618096751935,10.067943293931592,4.078564264438995,16.622643361443373,19.606443561135688,16.989019494914558,17.49256677937486,5.561303039396268,0.876408305634051,17.314860577125536,15.936134446247827,16.184271811216995,8.296916212874393,6.525286564851975,12.311192122122794,13.223627754216123,16.221718896843456,16.539349964749984,2.511634329673895,10.583572000990271,7.717957331222456,1.8058107629025733,11.13844887824937,17.182074145625485,8.429698856156627,12.687148458751064,2.0169395920958832,5.627243199868084,5.4135007813087155,15.97216705020218,6.196683527138003,5.117348378190041,14.857192900188604,2.8330167309902965,4.268183240084058,4.527849174515555,15.312847677809538,3.314596925828477,17.248524498521096,17.063767738693024,7.8259242515066685,4.672211549159946,17.18070324630423,13.946008816310513,2.9420622608863356,5.288616642588546,15.384400946287373,13.502633568886955,17.43105302230219,12.007517148043739,10.26806168817533,11.35245563035384,4.409911114528908,1.9372874969740517,16.343688505963264,1.5706837700486798,15.56872503925096,19.312453027482206,11.075274022168347,18.17652263164028,5.5343886319817415,12.058539858025883,9.86872460730931,18.03124519886973,11.776404568954874,13.227606631773913,10.234519575509061,5.87561009866211,14.961864776248026,13.712965686177366,16.509922669423425,8.478735851063615,7.434493052258002,14.848945649113809,5.406190559767987,6.001656406196623,0.47317592566402666,9.838186615875294,3.553361440158933,17.50876430394922,19.135378340386296,2.175819275293871,6.795942766878755,6.099547885381398,18.895776259727356,8.567177176365512,2.504589221336335,11.100570519829933,13.205448385410099,1.9829889146819024,14.408942509546527,14.875669821008977,9.371584486712049,6.798068269091377,18.738055239152033,3.717196032547192,10.267430494278402,16.700815877252964,8.664342066976447,0.22196542062839164,13.387899182030907,6.126276522732383,15.840315557354515,14.343719677115608,5.683508769504151,5.691195569592544,11.414670166017814,3.0705641550656315,2.95378435255532,13.92914177872003,15.199359463487262,8.327588656818957,3.9519923074129526,12.865860825062633,7.007713398372379,19.777172347932606,13.707695400066445,0.7212870509733671,8.170747628035585,10.968404836663552,1.1193444521207896,3.9986212415847477,13.645559479962731,14.646994315608737,5.7558515438706825,19.217504181322063,17.132492857279136,12.242817699640693,17.523230360256242,6.422112495143009,2.953316312705514,8.253135841264964,8.087668839625195,7.239645771022301,6.500549517869034,0.9390721761633269,5.075442456517911,3.3056278721267196,19.84961209041429,14.095666514760765,1.8904340877189973,11.595478847223507,9.359337014343883,12.70354813643677,2.2858715668120455,7.270729140280396,7.046106686099187,9.353999870842173,7.0124828229112435,9.832200262203825,7.676752390293502,4.544390215591494,3.773162653330835,8.5191212338327,12.384695604669398,3.3362292884226097,18.92025653131647,2.0910565105237966,0.25183917344920204,9.965428719393717,2.992178575295381,17.320427460665147,17.505363232098787,12.49258199362066,15.654631313738342,4.690119636063241,15.21984046750604,9.500469536254968,3.4291093317452903,6.5009892648389656,11.511475651446798,4.2701161451238745,4.578745320580668,7.655968429489999,11.75498970167923,3.5390561982324042,16.550317313587982,16.06273938822952,17.05565179667108,16.79513508128511,13.295240288312709,17.380502864064606,15.959155492936334,2.0323440193458397,1.8356573585332647,13.751748655879773,14.81608856096479,10.51514023256984,3.337314896957433,19.66320690428472,11.578487252611108,2.6428224492912333,7.585953508710763,11.583082838945664,2.8640772596080666,1.047852130934226,10.086028435361118,12.319845268496454,0.17311325485771079,19.74559226891862,4.979847390991452,1.3349335160233622,17.772996798748153,4.275511417288169,7.05904734326086,9.590202587067482,6.876063589064012,16.582240642568404,12.358731075632994,5.551382356143599,13.897999317488221,12.714264470066642,9.32852605871866,12.706142248599388,7.421244555201438,7.179029966566239,6.46371409623939,17.56869528354209,8.80150983725727,6.304800966912074,10.298457532191417,19.528050139063563,13.754127342340606,14.8081986124005,16.091122354064872,17.016226306596252,2.419283765521123,7.553509564054632,6.039947794335889,18.48152169788699,15.98627502866552,3.7684468538147176,17.818234891641826,1.2609480890529445,0.8588820282420961,1.0611299609917602,19.691438480621176,3.25839461800427,5.66305583278941,17.897491962156256,7.77825250951206,9.072093141257325,6.375126469528909,5.785325928015044,15.080785224963918,10.912638040012887,10.729113123349748,7.650524983997684,3.0531223173776922,17.364022345999487,3.904669095685813,1.5107944699627618,5.652943562656594,0.23323627877808395,12.768562217904877,2.9299206584199933,13.000273354070808,7.131119250860918,7.630727949430263,2.7985103976945336,15.666045393821996,0.5608285243374223,13.860376377304323,6.346352004924767,12.189265793435776,3.605070802827406,1.2301034050987347,7.883680310727277,19.93560222801686,18.089577349579532,13.209855852602015,12.412614548368648,12.844169919646337,11.831772453081824,13.897906852457314,4.81587403431972,15.430854436410337,14.23553677655526,2.871889573826558,7.856261136296778,16.893240607070766,2.902530039055411,4.9608251093249,14.639074168447475,5.0299093544911155,1.644907671132163,17.344253809057093,5.799738460049153,10.395552320122325,19.59461539126588,3.526356736460352,18.404785456018754,7.901531980484955,16.17035738104692,2.861871493722652,3.374238130472169,10.453427534614764,2.1349949718641703,7.030154601381295,12.362428796352646,7.053716289515131,11.05005035041017,11.054130240700491,14.693475068919408,15.761670042669294,12.451141359102271,2.731962975166864,2.2907969378046467,15.281874346188925,12.626303215040075,15.173864582339514,1.0016797164789537,16.6801717754258,0.28679636271112585,2.2212685153124756,15.887708730813737,14.532833846820402,10.83792631794763,11.448840838644907,0.024883473472940842,5.2461349388448,14.388434748763729,6.261044038639314,13.333227649186785,16.864728669505105,12.562307954676886,4.4668981434223864,3.312432546023518,13.493363941388331,12.85890374628237,17.733559604248768,8.94720121901619,11.570940676466206,11.923380816642428,17.446236369370645,5.57990139002873,15.591502252540002,7.579326052260389,11.710947755529077,8.243724370677597,7.579769923336062,8.498260111485676,19.957847051096834,2.412497610458013,7.532137406012729,12.058213039632424,8.143934857588736,3.1820813648543034,13.781416158529328,18.227495800863835,1.8392874163093387,4.954517265385507,0.21448537682993596,13.536583529616308,17.01019371331395,17.74358159606658,17.82228468887223,11.894021677161263,14.693403253441147,5.410194473704171,0.16176898872631185,18.266843637779772,12.665470472594219,0.47417749703285494,14.835409609335542],"x":[7.959911690838086,8.57345302402786,7.805315293138147,7.737146950666274,12.19339677609578,11.766864872614933,8.262751268350232,14.865699650070145,12.584456201525832,13.946055057211353,9.253316869309309,12.903199451807039,9.63954227143557,7.848020991096385,6.329973832710547,10.918432574426383,8.165840159672015,13.572327427374699,8.839616307921212,14.760579172044263,8.708413146850436,11.926084146203607,14.993570849775011,9.405460442070524,6.914135630997514,7.004965623728216,5.770542470998954,9.38158093714099,9.620346346768676,12.714410043446252,6.334100801839044,13.50218977716372,12.195038263878505,9.429192225215722,13.702398308671352,13.704217693018002,14.523538362090434,8.37920400793836,11.191515965125875,6.771037600996037,9.530568013363139,8.583948880443247,13.402860062254703,5.715845114820541,14.072073951573502,9.112126058761909,12.616093163430573,10.085146403063977,5.082051302546729,8.673306712198139,6.117206500674981,6.685522234739136,10.605485401426389,10.968712823940072,6.68888700542494,9.39747944939094,11.307056221766203,12.802830824657196,11.195491708905,11.798976601005833,11.147685930027118,7.084163793736233,6.229013358544815,8.724041241976298,7.95452630690086,14.509895154666918,7.682063816238703,5.521981221011529,10.557546173427262,7.8685828666752204,8.003391955001234,14.16340585934741,8.793441553743975,13.661798911115659,6.314628406801452,14.330407029512187,12.750096388036011,6.544208182353688,5.0626737179617765,14.180524185065096,8.120695453012267,11.513063563005764,12.906240688338109,10.541859832482494,11.031673013198233,5.983969897565215,5.438970252222173,11.83423486842489,6.157132118954641,12.139191746624974,6.922633298487009,10.413473077052755,13.258871906484169,10.795370056678957,13.017498907344136,11.064824016987364,7.937720472438183,12.851990312617916,13.28711109075222,12.294138985992863,11.744336668627444,9.402731860118024,6.427859817118893,14.919650974638701,8.282061208376408,9.187373681157682,11.976961028137467,11.798274983490211,11.946542001114157,10.46056819171981,12.243943568206248,12.786150130210531,7.340481827216929,5.303453278268626,7.567409634640234,5.291642242892269,6.927578429237331,11.695018928175145,8.35503290449687,10.419144523646269,9.581976705714732,10.567577926708214,8.360440786963528,6.110188122037769,7.392648598634006,7.496271773978982,9.981937423477962,13.700615827825885,11.601562774337811,5.8732700278384335,11.878159981337113,5.159118165081815,7.949240431607656,8.978997038301378,7.400975543129984,12.147881757853526,8.504293911082662,8.288082587524777,8.943761101733571,9.266840783683548,13.330349723347414,5.958285776909856,9.948102382897076,9.93700110384527,5.973045593226303,8.796736196183977,6.531496670952763,12.772449293416102,8.644581461887089,14.052448036017374,8.450717101783143,6.380657866113488,7.672489735214727,8.171017866830733,5.4738071906681025,13.98300217741686,9.382846141741108,5.323998404949686,5.109146775841571,7.670381210202577,11.484849181906318,11.46892053238701,9.996940828522131,11.239492350317551,14.269049927516281,6.0214195581784224,14.891053496141538,9.61506296337281,9.119514324837134,10.022655879509779,9.342710862667449,13.575510574116889,12.354180433422929,9.140686305252597,11.79351852711128,7.320388321260238,13.542963866428197,13.312845600491961,7.69248279311376,13.722106300183842,12.880028132112296,14.085685844707097,5.99781527031795,14.32908532691222,10.763437365516463,14.05785281518284,11.862985646888603,9.537401577182052,10.942986284658414,7.185640089474525,9.126585730768234,13.456179492471065,14.112079693151236,10.929988074932698,10.058598639582858,5.791103821125612,10.840135023144683,6.010611934395003,7.925930364203744,12.737511848574378,7.42139901133678,9.386759186236024,13.166044851826156,12.954711002237554,5.996638283992466,14.70136228069988,9.948894008540574,13.730377666619022,14.736138256844246,10.199583104203189,6.041117086193218,6.076055863606458,14.545596244196261,9.357612393700485,5.887652458660271,13.446163352895542,7.207880529457478,6.309976987893313,7.766102014379436,10.987874974344525,5.12417429534416,12.800002513780044,11.335256389918698,7.786337473015436,9.579702343147872,9.748381856440627,13.685122011782395,10.1999524989807,12.171527104260377,13.813996104832743,14.79835608597563,12.176407285893724,7.997964535287712,9.280015764364851,14.2573851395845,8.744350707187518,9.810385227457257,7.696080710728907,12.98447704863406,5.16144752591549,13.464058704739305,12.529836393094943,5.017159783808074,11.941011733308544,13.416147368583735,11.190784180121014,11.366047657174514,10.821847249678507,10.95277219595549,5.188609694282274,11.901077524282451,9.619567042511946,8.899394385396143,8.328230445103774,12.917816056396635,14.72525656280537,9.781127041494768,11.063460225475053,14.487115218918712,10.131300270845,8.027020368894906,8.378435518185018,13.098078993208812,13.588373829684475,10.331437918605308,8.018373633883618,14.246765586441361,7.527618195851591,12.91834774107719,14.316643261547117,12.692253175120449,11.373825314026169,9.341311659839736,13.134869087896492,11.543734928140745,13.768117114518382,13.279194518007266,10.8000561277079,12.509537092580398,12.477109802651045,8.631825460678195,13.871667996003668,5.563075646345119,7.263166011057713,13.949421133130597,6.740367702349914,10.11052845273117,10.16714378965215,9.459931015697347,9.78631055629318,7.745518119745578,5.535398587761979,8.515066103169517,14.486201454636877,13.74391632444574,10.270058699175117,12.689421536848975,10.129231412505703,9.66126358755462,10.050980761866166,12.942862575379536,9.214174998243188,11.236638374971442,12.71976339661592,9.549880417043596,8.983786061797733,12.500834207303548,13.568390377488724,5.789117321752495,6.704311156727309,5.119614811150592,5.256598729950273,10.785326828561372,12.088766243737648,14.369568905523858,9.571302809446333,10.455865226305045,5.762616883274065,11.639785620874896,6.719374257020416,9.305899732418887,5.067341939564487,10.59285753531254,6.806166612171014,12.934657025375326,6.88181164247804,13.923961451215332,7.627133209701292,9.15593283456488,14.049957249482501,12.04499603869651,6.482213963233252,6.709059927157297,9.401731161688076,8.067788756231408,11.71664755861303,8.819374072054313,11.274980779422867,7.5575212158748,10.224301705434787,14.593929663006808,7.463431696436049,8.488410319457726,12.950688931356853,14.032824398500747,8.700723570441593,10.262693499009517,12.030964981076993,14.164446703465408,11.352078918150587,6.500002149727306,11.276547546793324,6.232077094750528,7.263777749214588,9.918233705050243,13.644166304467742,7.1997767309019896,10.72584242020242,11.071830563165337,7.638262630018353,14.925131281313027,5.0621396644985905,10.033323709352826,8.174628251288294,10.316547131726363,13.666131992691525,7.202568462528092,8.822757533254693,6.756113248640427,8.075701169133831,6.537294559512112,14.20592700405009,5.426943355242495,13.852333593935722,13.229871841500707,7.075634343240909,7.027215031412872,12.320993936841704,11.541204560787273,8.55715193691186,9.707848939226038,5.582453035647732,11.439806950833699,9.67415270234276,13.401378161214328,13.593834518320005,10.973400325351747,6.562629481156119,8.15570868653012,13.431645239136259,5.861229116312668,6.608277024877324,5.813957275087582,12.364644559616476,5.155232260715874,7.258882587087978,10.445772025527837,6.190131776995953,9.092850926039215,9.794146469140191,10.168369559621329,9.475359083156805,10.619213996941442,10.227347999692075,7.435508171621137,12.457389020519592,13.223573437861429,9.6182612765475,8.633259853055426,11.328535863247941,5.10503696951794,7.438681223999208,6.305689763228777,10.34358227201727,13.737625533185838,14.424578333437152,13.0143922603574,10.073090693571762,10.805030200512205,13.460387864528645,9.667368400878606,14.223429625210809,12.562252898469774,7.095526578178681,12.573915841107828,12.627357358701545,9.421084486750049,11.153708600597774,12.62720290567729,14.28268387087983,8.343030825772003,11.974693857033811,8.57043012721183,12.808265210625756,7.524763768976229,10.09947512795863,12.739415730026947,11.094514374271089,5.678505052823031,9.173073547261112,14.602236436587152,13.44731084056809,8.296643436601396,9.557079832525133,5.351815078509803,9.172219549104517,7.142124157993484,5.871985395024528,5.595992142590789,7.3406592664623815,13.634854830330346,13.926292598915982,5.924737176001999,10.058880727202624,7.071848080053567,14.162951568873298,13.629012177217621,7.617955763126907,12.299500127852316,12.131102437157486,7.83639530708812,6.295662769276635,11.922738547381272,9.503338359598395,7.382862148405436,11.143976362758494,6.9106164135147115,5.600399965240268,10.343314509691716,8.81649813889979,6.201267856462993,6.130398946400408,10.792764938608492,8.642938148851208,14.9272770346869,5.951123845264004,9.749144604105735,11.808016116951363,6.0954806849884635,11.5137815858146,9.077524808291512,11.96621035900937,9.737779338608906,5.215493608495838,7.765024650337291,14.968902719025996,7.3142576481480726,13.772099640964278,9.690795745182307,12.52232832204584,9.93702675208189,9.598780929975938,10.864124779449325,14.830761684398775,5.161366825231228,10.926141034886607,6.540308538488677,11.07639514140989,14.231227968678258,5.492336434178096,14.702534751621242,7.103358239148275,7.406817615318513,12.896974464504645,13.091073430193479,13.788727065826174,5.044040333689961,5.144605283556734,6.002862037312465,6.1799146821302475,10.221580345856829,6.015775763741895,14.157885196743926,10.027084296351674,10.56327908590421,9.534025749794877,8.655330706619473,9.673563865021194,6.79186425205965,6.639928566247189,7.122852854985478,5.069315558636218,7.341533296465901,12.049882366038032,10.847433498779093,8.070100414398967,11.162440492381279,11.542282865977855,14.627194736531749,8.907342921637959,12.384502486124962,10.516560052087996,9.185966119083995,9.66620453198243,12.847265466711338,13.455227457153182,10.243171524729027,11.058284294370871,5.259011675722107,11.388174688539277,13.991286858805354,10.999033794606373,8.668192482324265,8.395724775121181,10.95672006791066,8.564319328963597,7.421215907383905,5.830753532421058,13.888609315279458,11.307034471150995,7.394458740893692,13.595647643732626,14.024361100624477,7.928480612593052,13.612163267181899,9.785197090865784,11.846244239834324,7.309067506693648,14.100920005803035,13.91923858934689,11.63081867040621,6.974507323692221,11.875546731693854,8.195584844617116,9.788223580159096,6.030620637823265,8.824305053939451,12.169104046413306,11.11648933330062,6.267110981210124,11.41787706461934,8.155372790739042,9.982238057309534,6.452234695267474,10.827752981378659,10.576560902177244,7.295269801872504,5.116752267361415,12.880514182873242,6.712340440370859,10.908574709083354,10.103097687987326,8.212763083375451,7.453518353120203,14.768958717528964,9.270095174993223,9.0782248944023,6.822953591008121,11.083145089526507,10.925383208059998,10.916166424322231,12.84669609932623,10.06661252113943,13.82817820673453,9.270901885745545,12.434929353624343,14.469876961195007,8.664671529879435,8.365424869700625,7.0209563161327315,8.386351168521733,8.939895493181291,8.967070538084553,12.595551746768468,12.549021439758729,7.1159627441092566,11.509965623495045,9.172423739731418,7.794054267985498,11.428217703905847,6.99095123945315,5.691284864771074,6.952591067035414,5.208980102776941,9.486050485039998,9.172656145971477,6.394504158939503,7.714490642697873,10.255697396226655,5.890431677018089,10.627597177199132,12.923021256734696,9.331895857300385,6.534087322377166,5.81433857209311,9.224275485418186,5.932181684115026,13.699843994276296,14.50841664089314,14.435125633068802,7.360618913617647,5.438682151965956,14.898602322768365,12.528197097783265,11.661009815144425,9.185075984599981,11.630754376208667,9.634205327465592,9.67038219856185,6.682620309264533,6.8172595901171125,8.725547896561924,5.210196812454706,10.256143406316564,12.324700642355463,14.10974789174965,7.649415122312943,14.727928107189197,8.38757090705512,10.791459476071466,10.176159070171238,6.635020478233962,5.6056689939188376,13.024433596768075,7.37736167949862,7.627684432608593,9.067054041357807,8.509185935068341,9.368319458795145,11.580126827549096,14.366504034571655,5.090988889097147,5.186251388343191,9.948435545407614,8.537871222048704,9.139684880324275,11.464026334135015,6.146416029598241,10.713763527573303,8.017205611665643,6.810759229837567,5.1295001286761766,10.32255572363467,13.668231073059909,12.698974201485607,7.201510324545904,13.325011474085375,5.027191972407308,5.582821599547052,13.527296824289095,9.745967041701658,13.400344031935658,5.105066330638309,12.733024194014993,6.215951382581588,14.40146277692865,7.553673313305191,10.50759533848993,7.159675233184297,5.230215724897221,7.733535752842791,10.25533296192728,10.76985648885055,13.850072163058947,11.341056825014688,11.640101035942232,8.732125696377299,10.256544952047067,11.50692305056011,10.293289945039504,10.926032652504801,13.077252488970835,5.160420093985962,11.009656179995488,13.626241204699912,11.429032469736457,5.150499220812312,9.853383052670534,11.716511011829889,8.74465607896374,6.707979237707534,10.068936765465274,5.044656968763506,9.701233120431745,9.574742786682858,9.652005667745794,9.548333723989117,7.947134944471652,13.184847993795643,8.536128199201805,5.375476483589541,5.785758097714839,12.439917826573355,8.961123023850119,11.216443855091446,8.82307888405669,14.143784247087396,8.747850055629144,6.991939789120356,10.038104222202263,14.674601603298152,7.775295266160571,13.000185405158964,5.313412991530804,14.744090898272004,14.427044633067204,12.991664294523533,13.776522464104985,8.943924341833501,5.885100951386015,12.734293470775151,14.540004509102225,8.249439997826045,7.715243878091391,10.85606985556825,8.41570419388465,10.049025595249464,12.027210836629923,9.185251676391976,7.792906152003942,13.05165313626924,8.088332279518319,5.644643870045895,9.86664345230439,9.290784588289773,10.469697641069775,8.224238778803091,13.761401296496134,8.962196336523995,12.999843377109972,5.560618193452744,9.90183032524385,14.319408961438189,8.585141988434069,10.279930738543015,10.37913522147256,14.035110858818525,10.610754470277188,6.326476213404561,6.434507958640041,11.626734814670757,14.424501142882269,14.969367950879926,8.467378913853526,10.437522885968749,10.763203859346028,9.105234796967247,10.934228074736849,12.427728360319739,14.708911436254716,14.441918995557916,10.073646835226812,10.2804517115208,6.202410728995556,14.858627734122988,8.807700858702322,14.27012254626949,10.881781274860963,6.075760520431867,13.247359894381262,13.643865439745042,13.93163317822406,7.952258769707923,6.682009935032712,6.678198770366441,13.132753735666203,9.823010873389698,14.903594776070515,9.419121832105706,9.902950393448346,13.430583965841997,10.102451183363826,6.600853694314419,9.249948494762696,9.56178154001808,6.957800240530823,5.9738521234624775,6.229129700781966,8.805098068141133,12.963501025118173,11.669827765245675,13.076894391514532,5.483360505764505,11.517662726140681,13.212920129837858,5.064030914452056,11.886862048670794,7.082212777078802,5.174114693523906,8.934817521819134,5.743754326567718,11.316882972557828,13.561882075547215,9.676685694893294,6.297852850992824,13.203984457439857,8.992907321901058,7.019081910765522,10.638589381004842,5.489537693850906,5.618431513337838,6.998305986980807,9.40711737701028,12.998268438919778,13.996968729109048,11.594312311882852,14.60868352203375,12.100558104063415,9.453378681628863,13.523960817967897,7.492270364907996,11.774348082680818,7.306818263710582,10.342247824909448,14.440420046628162,14.77517783066373,9.522356716936702,6.450604830575893,8.469934355492626,12.47089253658915,5.435608634570491,14.655651755377786,9.85540467037257,7.795235951623747,12.926854976279515,6.639227678355062,6.805242438650585,7.141158881886522,14.0985386563285,11.068712060019326,11.605295486155141,10.844639001680662,7.413399146256121,5.553585065476869,12.832648567449613,6.8104899634435405,14.870455465341335,7.176808288583787,13.67424424701934,12.212321486554188,9.434809216639833,14.788385191252617,5.725574075311302,8.258882874290606,6.886645268291945,13.641186314901486,8.638897090247347,11.107154094578835,7.749888624687895,5.630446229929003,9.881903874025564,6.543005369252861,6.266000836946124,7.325314135905245,9.487484729111682,8.818078381147416,12.025951539719728,5.7718414147236246,9.15744562303582,14.423766705032019,5.816010009361358,6.397495882841618,11.62084431439473,10.24646266072237,13.337508269097915,9.439575188343825,12.680263763909117,5.941482637823345,6.949307126131217,11.33596602185547,7.0167319605283,8.522111344105237,14.039127863167543,13.265383687719677,7.681036518681257,10.010298695826219,7.120317663621525,14.88768176593807,13.660929702141821,6.569444487589418,14.469715264832061,12.793939276129326,8.839676763238405,13.335599317841895,8.059284149415696,14.675601706646066,6.653445968156735,13.729409979978369,8.05006771320484,14.090716705810308,6.086349945853589,6.802724323294749,10.461021826482426,10.6236495925968,6.347625946946609,6.895003737900833,13.882985237946105,12.345381174451566,8.843746771890775,14.027296083584528,13.255118206382017,5.82757887046915,9.948142161362563,9.760160635581197,13.373166449114207,11.252427221166304,14.579358329112932,12.92881154723876,9.420196729820114,12.54041885764089,14.643209582640377,10.465657702530034,8.851190091218752,13.417844799396404,7.2101450875680895,8.942740193468513,7.616340995697321,6.608665499102065,5.870292277163798,6.349928343748694,9.30721438067617,6.818799144760089,6.247097733719902,6.912278313028299,13.249824717087431,8.527011161021925,10.427852738500194,5.56543578971066,5.618204073752553,6.5435403051471575,7.58766475695019,7.4607788266991175,6.21995283425429,13.190923915121944,10.677350560111776,13.92069552903049,10.903703228152256,9.977219086084297,6.757256873033828,8.848595763880962,10.08111724403038,5.472357430795558,6.472649367352254,6.769739613491379,14.676795821879786,5.01375602183569,13.156778022231642,11.912761490460053,8.346437771842599,6.73092981166578,12.111703603409158,5.724559461422336,6.49819310272316,11.86761870283241,13.737679334410187,6.136666514330617,13.023889789826095,14.783527265172726,5.555390070842354,13.256476171819148,5.004923763770853,13.930427041042787,12.933660961086389,6.958922395809244,9.855670883640883,10.386714654005022,7.477467902625219,13.443151971130256,11.651165429956398,7.2203530257769195],"s":[1.818173262710299,0.9253735048259211,0.794681588654536,0.3883217303918225,0.3860855881691183,1.9870631752908419,1.3610210299429704,1.2486794231992615,1.7650317783738014,0.5982897382021455,1.5814395188859431,1.6437674485753333,1.7168323220916983,0.40411916366788336,0.6663162962915496,1.938129938323955,0.3761822169271478,0.4791363056525446,0.46067519824309455,0.1330423109774892,1.4303200931899291,0.5229820214681102,1.9296700702347604,0.15426964175942848,0.07349069735110891,0.12387238287760116,0.7368050057291513,1.4648966716491176,1.2383984580830418,1.4081123236684703,1.5506915937703427,1.432491037245998,0.9592836688667679,1.0815424740143933,0.689919115783435,1.4416625586204352,1.0186504365852533,1.7449927121808209,0.18068305515127125,0.6663013812120671,0.7380470464885889,0.030032843647709306,0.08107144473561956,0.06883412048176485,0.670414833930848,1.2261430263072906,1.8251316994021058,1.013731563893855,1.6387167987377493,0.9551260961162589,1.4176797094095885,0.6567067992628655,1.4693515966751454,0.255003865075214,1.0493662042154517,0.28835331240184603,1.262018504102318,1.0319601760156893,0.23061411327190617,1.6701013879811364,1.8270825263315817,0.1205764814623822,0.9883708217276919,0.9236353313891614,0.47167497481460297,1.2029652808589333,1.7972454070316535,0.63554783433726,1.4173091653589949,0.4549621338334937,1.2695138929908207,1.6352982883601053,1.3003491694232943,0.0031142640822938716,0.2648164359239886,1.303433944602153,0.4996223490097753,0.9785458930680715,1.5770766400841447,1.704837218007616,1.246395925161457,1.0081443611514862,0.15488444221057662,1.2092054072671905,1.0022437154851174,1.1666868947288358,1.7042354668020003,1.4259053368567685,0.42167453747511496,1.1570882409027945,0.8499952844896352,1.4651510512536525,0.7121522183768141,1.8575195105678723,0.2579897005582956,0.04869415739486049,0.9847692835838755,0.6972096348320651,0.7874587357567586,0.013385398284281536,1.959480167279219,0.6303295295483964,1.175314407953445,0.8296342856918657,0.23616403058917612,0.3093685805951685,1.423590118512751,1.7418128257650647,0.8996657797612513,0.2581155844456111,0.11789248044758693,1.1747761634948337,1.6685874710835664,1.678483155398097,0.5332662057636499,1.1345670926015785,0.06054567200279104,0.9391415741773552,0.7380926517792283,1.4526923085903087,0.22881792725977457,0.9109422377270797,0.9211217126430835,1.5134364444388106,1.4965838011801167,0.10104850966520518,1.6785607260664932,0.2170082145758485,0.8199192039076273,1.9554597322084706,1.111442780946815,0.32943030724346034,1.817450776975531,0.10777040899952173,1.160848188838754,0.5928807329832662,0.9045215133214133,0.7612201164805672,0.1360853177895729,1.1321706724489333,1.918571707366306,1.084412552482449,1.4206255015349636,0.35762159975945096,0.13766754399490688,1.4927129483923705,1.29975744939616,0.5998992326434855,0.6557335383899092,1.2148856336165252,0.05264210770384414,0.1120212978120767,1.0158904631588426,0.17705151788484663,0.19336271091752621,1.8982148481440482,1.9146656269412383,1.4524771933677743,1.8283862637441692,0.8098571564251968,1.4473951464602592,1.3372186816115312,1.247163604129732,0.12407029380245715,0.11499038207868573,0.997522633074515,0.7790557796366553,0.7987460060200036,0.2418890266031788,0.9338627616222026,0.7940672563859206,1.962505280313624,1.0304111719124394,1.9922639278471008,0.1680510607766923,0.6650947057304153,0.12128780084362445,1.0106071089231943,0.8343995660106818,1.9353782083383222,0.10770037283085632,0.311850558142186,1.6971646363477073,1.7718057052790366,1.0062672860277528,0.8905612859171668,1.5166509272704696,0.9103223731721486,0.47179599710309894,1.6998462336897537,0.473140197214323,1.0288786996595993,0.7432424454096713,0.24629795512102826,1.9140222186685736,0.18103647483382845,0.3435437785131774,1.8373239388011067,1.9679343260599382,0.049330001477528196,1.2127312363136356,1.2493538134486135,0.11807739248536997,0.07338321898197941,0.6678144445511744,0.701963272612601,0.2757007332384771,0.5125935691583323,0.5752797667209784,0.8690400329517072,1.3149001573802828,1.9501737238385948,1.5407259093446575,0.09500051866313841,0.06693152173528061,0.1541536370668659,1.7906807550657473,1.6138395836841748,1.8112572906818554,0.09956264268254289,0.49310414239820366,1.749537354633655,0.6801164648827789,0.9925605054745605,0.44233986272807346,0.7763134663140918,0.9825173467252966,0.7976644178033401,1.9081849219455491,0.045860713425701416,0.4340512734617148,1.4305406304606811,1.0446881329459492,0.5025578609324532,0.6162786670062825,1.8251561525606053,0.7188400626794587,1.8242757256798119,0.4710869299157361,1.7758413214474165,0.4510520737068666,1.2011918603401224,0.19136939029477906,1.310504442809178,1.153140802160912,1.6727389822555603,0.6457400260872252,0.7245381592534423,1.561200975227241,1.9369860312687637,0.11419545125703578,1.5559404793338385,0.9078693817856056,1.1192657373133663,0.3041444630319581,1.9600155880851435,1.7093886801424518,1.9985681498045174,1.2434673585251894,1.1033718578132783,0.13804323108971595,1.6090359067981894,1.1538563250502185,0.5735795311984448,1.5311094619751122,1.8174874410357877,0.917865831573013,1.3946326479248445,1.771092805930853,0.9517746182459863,1.3883702713387187,1.8209778686177467,0.501369909950129,1.8944916572290458,0.37440277575640213,1.2609585755377362,1.5337916523885409,0.675172301187934,1.5304683245563249,1.5398842193531093,0.791321859144217,0.5578211155388666,1.1394890994929519,1.9489429151122937,0.016840123931439965,0.7402402784442739,1.807987200838566,0.4953128240465743,1.120423973338219,0.33795592813320274,0.0315690212495503,1.2211891623170743,1.2928049835436606,0.5320463585269297,0.8020267932259668,0.3357832703412593,0.5351472407476763,0.9640533720754481,1.4951758477382704,1.5731079366512581,1.0932838800912172,0.41477004807159146,0.31042331511209076,0.06165026124495343,0.4950667938124398,1.1933962850515418,1.6941909413529737,1.0142377247371832,1.631966000221308,1.6128627212292663,1.7322826399326163,1.1792428501258563,0.053656476204297476,1.7419684796882118,0.7710189096573332,1.7789113126412013,1.8892828386845362,1.190168866724337,1.465421528219074,1.7439334741428105,0.35547287402667305,0.31753755689737817,0.060974831748392244,0.43205697815784205,1.538786506691205,0.9724296931277241,0.7613623872475701,1.6245674171755158,1.6449877610098693,1.3440718874666042,1.3660623369109435,0.8917609373156843,1.7218550661535956,1.7276841530680263,1.1752649099908434,0.631033872275049,0.010550963401620095,0.664338338362116,0.23839794095144784,1.64042184503678,1.8375367169909644,0.41174038734824325,0.1614353281688854,1.3449363086265969,1.6091569319850891,0.35661211523109815,0.6855451785641629,0.7438970010950152,0.5928418731331551,1.0742512700382014,0.9612838522394838,0.3630841347900664,0.3447697698394183,0.15717693219278495,1.8673708016344883,1.7204393728120349,0.42053914859865715,0.5954699909950527,0.36112787774168087,1.5986509342603301,1.3130447829182796,1.412842829864914,0.17702234243538495,1.8786234876915682,0.11151414037341212,1.0035732821718577,1.0886784498439366,0.8481751099039387,1.932539574961384,1.695610579076404,1.9811933525241057,0.8913290631699016,1.1567686901964254,0.6434742159883844,1.042366832790873,1.1543673607513218,0.6891133160542573,1.2359333745624728,0.18756249409997316,1.7989375890582138,0.3202267126454399,0.1548662161685712,0.7764457152478754,1.6214670512106664,0.38980253106669416,1.7555090579404569,1.9390506047462002,1.6597037219698247,0.7767250901872997,0.04860283615640171,1.5273522725848454,1.5586005148794704,1.4384909777104458,1.1286451205391876,1.1428519898610192,1.1425743706053795,1.3006582647331775,0.7113233635863998,1.5739968753569502,0.6460546166453041,0.3696720904465898,0.608170967127518,1.5628738766880317,0.9469534986091728,0.8994279520929811,0.5421491062289872,0.5075508046309367,0.5554286218828528,1.1387817580157806,1.9434824006726474,1.9067599212591069,1.046036902749504,1.875572036504337,1.5161135466988398,1.4520093298710561,0.6445227013054757,0.8417660259245756,1.0079917147478321,1.465537314438441,0.8872312680029388,0.22200327922800023,0.051397424971907135,1.492582144776502,0.05128771452656311,0.859302622854222,1.0685404630714994,0.22627066647970562,1.4218963875752144,1.1411916512731874,1.5936313888138671,1.8688398511131137,1.3864261586148716,0.011834251431339649,1.096005698662069,0.42342822176754913,1.341866364240389,0.992543687613388,0.11211197373424664,1.9290030310879303,0.5399688659452369,0.0330046273418767,0.986470222326636,1.6935657128768522,0.8975652460744956,1.7201613835817047,1.4618880561335938,0.8731723903184845,0.5681687492750989,1.526498787713503,0.9344292969159169,1.2836741512266863,1.616718208830525,1.381939803133318,1.30149455650999,1.4496851653661724,0.5897922968626417,0.2340023073256745,0.05316521465073354,1.803970507208951,1.6722307569475747,0.9343113257663664,1.7989456559055617,1.238213381899393,0.3035363367618267,1.519702914873347,1.5401693954844249,0.1546805817481136,0.7457780720814471,0.130539926080532,1.5311852744416363,0.6798149463880292,1.5916976608489208,0.26690573542992446,1.453967582154104,0.18089420619205576,0.634196190504261,1.4934456531653848,0.7568646123233123,1.4244206669106894,1.6046761314438163,0.9759759333573652,0.5158463792314176,0.9624587001700249,0.5680382216579329,1.2781372933204826,0.09538997791755932,1.850592181790669,0.029794710552630832,1.1899208517406485,0.06741023227058962,1.5547210163906815,0.4292678197455899,0.06862690118114756,0.9616329969857254,0.08703862135359719,0.8864038636248592,1.827511384411769,0.4860532062685703,0.9787802502045984,0.5105419140020162,1.6060142715684003,0.2622417960304486,1.2477742550100377,0.15202760533134896,1.2441398317670425,0.07739295786237044,1.5185612334320648,1.9456252531557623,1.774220582059229,1.4402919899302193,0.4911913000499739,1.1825650695053875,1.5655980890047023,0.7060723789715571,1.8692145537831228,0.7030381057699016,0.7115556009253838,0.4950496980000434,1.7326316640306194,0.2834227989546787,1.8615445896912042,1.3418617843693776,0.8913265937950148,1.3960929489364,0.15516843367124844,0.1439100893280436,1.9638639039271717,1.6632884777753194,0.5855179966673565,1.953607221793245,0.8961198246873017,1.6550533222850552,0.4665191969053719,0.5417846346089048,1.6189961639909183,1.994551395715067,0.9835615012369372,1.058674664715678,1.0888606578131994,1.9666370508288873,0.7000689113466914,1.0767727792512822,1.3483470188901059,0.5134420290438833,0.3555395417429015,0.011099955550645468,1.1306698882213326,0.9109552295895109,1.502811391118351,0.9897523920637692,1.5023528245131876,1.268291171432454,0.9824376337086842,1.0788957899828553,1.5125007783730418,0.24735750991679684,1.546326184438768,1.672914014386519,0.40048898358676555,1.030033884737572,0.10976469259534793,0.8154734891577724,1.8511723659297634,1.7652924779011823,0.6716009837912735,1.9566223115661776,1.3697294966372628,1.284128477487886,1.9638909731347298,1.9254701215217307,0.2936287624321299,0.22179849319749323,0.5637442639160484,1.1425157079620374,1.1562656371465456,0.014644807954105943,1.2658749140339194,0.6660599666130893,1.6343787767050184,1.4055140726296043,1.7225520611673528,0.3435697750193776,1.3907662761775477,1.5550624885226303,1.0949902984757882,0.6417356292959622,0.3771733427045194,1.0600587585574717,0.027559716221725594,1.7767842931534616,0.7153388861545067,1.3744492399603767,0.827526227419229,0.25407539528590073,0.970412125049755,1.3228598563702372,1.321149141894888,1.9276582230250279,1.1501971681620793,1.1568713727355546,1.9149264943243254,1.2925460385820178,0.03259847576163022,0.5851689128915463,1.2945292294882247,0.3558252628058933,0.8823407466826976,1.8934152844123262,1.540781555644421,0.2935717352847913,1.816675564606348,1.917957371290521,0.007419092983081743,1.8666672364282615,1.1744732121775958,0.9101326349601115,1.138905749638694,1.111359185659048,0.15512550519978818,1.5416107275036373,1.19852502649741,0.06319190304400069,0.23743347542650683,1.8972740436933324,1.8311402672299262,1.2366726596282622,0.0991695918134039,0.3019164679890878,1.064248376298539,1.2197916311955495,0.8958773479655076,0.6264193697277123,1.2602768995227658,1.5161521130904374,1.2520190551346646,0.3786991284173711,1.2448868247043623,1.8399754809789313,1.9680764251861076,1.8472921051757578,1.5204969314508912,1.3504928593232806,1.051399485541149,0.47193447274210154,1.8668240571844898,0.7461545499460569,0.28888524084267697,1.9596151505536885,0.26696951029104543,0.5136321523352554,1.0779111468864815,0.475727051097274,1.6469731734084583,0.04487649852765374,0.8410393410422339,0.14372687677139107,0.7127329762005172,0.3591413419893086,0.12573844290758363,1.7727185951465652,0.8046231420646626,1.295259531399728,1.0057694661402112,0.5155188702462343,0.0406942328764619,0.1504780362563718,1.0219376008646082,0.49162118843035296,1.1969109405411378,1.4299851228451415,0.26625099191924617,0.8556619557190159,1.580079408581923,0.03329315641832897,1.5172965725608303,1.8960190916384758,0.6997180641810585,1.0664725643520652,1.9802812789673236,0.6784459909983318,0.06116220538597128,0.1420937768542836,1.7930903829569838,0.14769306179736663,1.7473758016213288,1.2850623936068652,1.965887201440987,0.728846212888218,1.75690033885268,0.017885268660524645,0.0798981332998836,0.4937889093014367,1.5358753123191402,1.9183919354373478,0.9686303929121673,0.17446581853195298,0.5527030482581301,0.8142681436224621,0.33584992213831555,0.1478103446170036,1.2599531261188872,0.4426992444703268,1.684978673393589,0.21529867446553563,1.8481642204032447,0.5964936156984728,1.2906304672613782,0.7258656683988982,1.0914170954965416,0.16762026220803916,0.015944027965905327,0.9983786765890228,0.595127367937875,1.6916873677129978,0.8260728234071255,0.8269355153411695,0.9570042455064733,1.7288777358670604,0.32469862657296966,1.3869049139363714,1.9010793197697833,0.5755454367417188,0.12411366461572015,0.49787878975057254,0.7603518796729016,0.44866262267981183,0.9223861197718985,1.8401183422362646,1.25407183037135,0.3689186371833113,1.6976740708838065,1.9572335804361782,1.7159925137636005,1.1299979472785364,1.6429696828871396,1.9889482153217672,0.0646364546242868,1.7992892144882133,1.4123761019795382,0.4933815864142761,0.5072032438026057,0.7968030141212727,1.4003984761119912,0.04458326027648285,0.6500032141904053,1.3202271509931576,1.665278265327503,1.1030336277356492,0.8932007406897817,0.8349521633996706,0.48548137599582697,1.8771704942940062,1.620762799170254,1.8812655679715462,1.2229368872414579,1.5453030369283751,1.6510351351293782,0.5522829018385407,1.1688033755392073,1.2319742311423134,1.0522345095088301,1.6120710574784067,0.518056787641533,1.0628028546904629,0.4894811951221083,0.7407815523322263,0.21464646389362096,1.7523404360282453,0.7721992524485133,1.4862603392348017,1.0946997167211427,1.6379342759918663,1.6979701480878822,0.8156116851175987,0.029668089706666567,1.8289496906133693,0.3789570717347357,1.538304302378604,0.20412984552545987,0.027362777936938087,1.1169836177380694,1.654380001659176,1.8407341468738307,0.06846116829629834,1.161763691433137,1.9619842046136382,0.40960123172147433,0.29043076974523396,0.6494174746274131,1.7609110143283253,1.2705318777211545,1.7229817368357616,0.559886865464994,0.081710776250012,0.6400311145973618,1.741805412662452,1.8576337274012102,0.162645344381668,0.7624643712227628,1.6173033951234066,0.014103828923305084,1.3004507257571722,1.489775919647442,0.6339195500229811,1.803434721358598,1.5779624500589264,1.6920873360320519,0.26476420899788655,0.08991105855235304,1.8248281477528043,1.8539794255441526,1.8264691298147584,1.7015671965410473,0.31430456070463464,1.6892006171267009,1.097611968919915,1.5327871452404551,1.7733853516822449,0.3669869772375618,0.18385611136604796,0.35359987706058327,1.747106461388476,1.972576115484336,0.9271396015367603,0.39881546342947205,0.20368401966584404,0.18441093696872946,0.0993399317291721,0.947552441987205,1.3777743534433808,1.84785860312516,0.6076252816274055,0.9415651867837296,1.2346839740900242,1.268817803337405,0.5696783247742871,0.060377033759055454,0.0034417328740130593,1.43187271710935,0.9465780593906787,0.7577812373251218,1.5846812362460896,0.9393311556940014,0.9958415320106719,0.03069975764872579,1.9322190404071455,1.1316272319151435,1.0089414084683908,0.42980251491300203,0.9118965372065131,0.6673884645183805,0.5274884625283072,1.84792106277723,0.7066666988707508,1.3929315981113666,0.3078209025036287,0.01751282451826386,1.0801847181875441,0.22364932421164507,0.6009813729919444,0.6137006495539761,0.697575897228516,0.6714393548098685,1.2537272703809794,0.29826129124023737,1.1663917156393708,1.2630179874020504,1.5737068061403394,0.7448856945123126,0.5127564800921882,0.2611922252511203,0.9049731982321463,1.4275829497551653,1.017385762289734,0.8251982613959674,0.6547163808999352,0.5709058980765334,0.020082283112406785,1.3745284224620962,1.48207741177034,1.9875818794824651,0.5083548847324515,1.8896184091810801,0.5474393371175545,0.7203599712303563,0.808387074005195,1.6329967897397677,0.060529703521130074,1.1822014267249799,0.7706672929591472,0.8800927610837683,1.0635603056499336,0.159526773958663,0.4154174383065361,0.4636484879220708,1.7557576085255655,0.8661145205388392,1.0889040246517765,0.8220846124581849,1.8564611387039305,1.534129906938409,0.9490151412346663,1.0673368308938516,0.4894223812627301,1.3418393832955107,1.6492526535470038,0.334462555323328,0.5161446272502554,1.8009257637866667,1.7216506685594295,0.6923838214925655,0.5756850827399327,1.6885917757517301,1.3352360358913056,0.38922425448205056,0.20095791189538392,0.4600557064845736,0.5364540312185508,0.4158080697379001,0.23954178414079186,1.3150556903726738,1.327726387568947,1.7746523606231714,1.7643396944484206,1.9515533415866226,0.2198714506226933,0.32399951567367324,1.7920075893440583,0.5176349815689001,0.789355677084087,1.40310391771032,0.059202107958012284,0.44112292174972456,0.8170779574915725,0.7571332102243282,1.1150806941096905,0.12331218682677214,1.233553797025388,0.04417754756310277,1.1295704384361152,0.46522422850848866,1.8121606421877763,0.3146472810861529,1.6723921302747002,0.8325926319582346,1.1898413549664872,1.8794207693130476,0.2088226062758194,1.992752771245284,1.7673654205265525,1.9954613773049519,0.292548607772277,0.5234589258445008,0.5614447424686908,1.0760055502614447,0.8801528903776323,1.4089195314801084,0.08035591067551451,1.9504857931573043,0.09297616755517168,0.6253459049988903,0.9385150434970164,0.3413017481819782,0.8513959621527558,0.21919563799820674,1.4992034856309866,0.19224923742100186,0.7070936415380902,1.7961767888976579,1.4167689918679547,0.39674895800301613,1.4032085653596562,1.7901607010119016,1.2673382548494359,1.2101069876035973,0.9601313316279483,1.5062285737731096,1.6271934435779989,0.4074051353626964,1.733161132688727,1.9734081693744048,0.6919223626253546,0.6136148993949164,0.6131948656477708,0.036646821025114296,1.3946935315563906,1.8371187271384342,1.1974929245314891,1.99741516994521,1.0599904002952956,0.004749576108278308,0.9002323387740816,1.4439336811824286,0.7773547331658324,1.0908956806671402,0.3659365989397769,0.10939214410426157,1.960630273079739,1.2852664235694005,1.8499060347769252]}
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
var cdf = require( './../lib' );


// FIXTURES //

var largeScale = require( './fixtures/julia/large_scale.json' );
var largeShape = require( './fixtures/julia/large_shape.json' );
var bothLarge = require( './fixtures/julia/both_large.json' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.equal( typeof cdf, 'function', 'main export is a function' );
	t.end();
});

tape( 'if provided `NaN` for any parameter, the function returns `NaN`', function test( t ) {
	var y = cdf( NaN, 1.0, 1.0, -1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );
	y = cdf( 0.0, NaN, 1.0, -1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );
	y = cdf( 0.0, 1.0, NaN, -1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );
	y = cdf( 0.0, 1.0, 1.0, NaN );
	t.equal( isnan( y ), true, 'returns NaN' );
	t.end();
});

tape( 'if provided `+infinity` for `x` and a valid `alpha` and `s`, the function returns `1`', function test( t ) {
	var y = cdf( PINF, 1.0, 1.0, 1.0 );
	t.equal( y, 1.0, 'returns 1' );
	t.end();
});

tape( 'if provided `x <= m` and a valid `alpha` and `s`, the function returns `0`', function test( t ) {
	var y = cdf( NINF, 1.0, 1.0, 1.0 );
	t.equal( y, 0.0, 'returns 0' );

	y = cdf( 0.0, 1.0, 1.0, 1.0 );
	t.equal( y, 0.0, 'returns 0' );

	y = cdf( 1.0, 1.0, 1.0, 1.0 );
	t.equal( y, 0.0, 'returns 0' );

	y = cdf( 2.0, 1.0, 1.0, 3.0 );
	t.equal( y, 0.0, 'returns 0' );

	t.end();
});

tape( 'if provided a nonpositive `alpha`, the function returns `NaN`', function test( t ) {
	var y;

	y = cdf( 2.0, -1.0, 1.0, 1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = cdf( 0.0, -1.0, 1.0, 1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = cdf( 2.0, 0.0, 1.0, 1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = cdf( 0.0, 0.0, 1.0, 1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = cdf( 2.0, NINF, 1.0, 1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = cdf( 2.0, NINF, PINF, 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = cdf( 2.0, NINF, NaN, NaN );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'if provided a nonpositive `s`, the function returns `NaN`', function test( t ) {
	var y;

	y = cdf( 2.0, 2.0, -1.0, 1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = cdf( 0.0, 2.0, -1.0, 1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = cdf( 2.0, 2.0, 0.0, 1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = cdf( 0.0, 2.0, 0.0, 1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = cdf( 2.0, 1.0, NINF, 1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = cdf( 2.0, PINF, NINF, 1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = cdf( 2.0, NaN, NINF, NaN );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'the function evaluates the cdf for `x` given large `alpha`', function test( t ) {
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
		y = cdf( x[i], alpha[i], s[i], 0.0 );
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

tape( 'the function evaluates the cdf for `x` given large `s`', function test( t ) {
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
		y = cdf( x[i], alpha[i], s[i], 0.0 );
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

tape( 'the function evaluates the cdf for `x` given large `alpha` and `s`', function test( t ) {
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
		y = cdf( x[i], alpha[i], s[i], 0.0 );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', alpha: '+alpha[i]+', s: '+s[i]+', m: 0, y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 4100.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. alpha: '+alpha[i]+'. s: '+s[i]+'. y: '+y+'. m: 0. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

}).call(this,"/lib/node_modules/@stdlib/math/base/dists/frechet/cdf/test/test.cdf.js")
},{"./../lib":51,"./fixtures/julia/both_large.json":52,"./fixtures/julia/large_scale.json":53,"./fixtures/julia/large_shape.json":54,"@stdlib/constants/math/float64-eps":26,"@stdlib/constants/math/float64-ninf":33,"@stdlib/constants/math/float64-pinf":34,"@stdlib/math/base/assert/is-nan":45,"@stdlib/math/base/special/abs":59,"tape":188}],56:[function(require,module,exports){
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
	var cdf = factory( 1.0, 1.0, 1.0, 0.0 );
	t.equal( typeof cdf, 'function', 'returns a function' );
	t.end();
});

tape( 'if provided `NaN` for any parameter, the created function returns `NaN`', function test( t ) {
	var cdf;
	var y;

	cdf = factory( 1.0, 1.0, 0.0 );
	y = cdf( NaN );
	t.equal( isnan( y ), true, 'returns NaN' );

	cdf = factory( NaN, 1.0, 0.0 );
	y = cdf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	cdf = factory( 1.0, NaN, 0.0 );
	y = cdf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	cdf = factory( 1.0, NaN, 1.0, NaN );
	y = cdf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	cdf = factory( NaN, NaN, NaN );
	y = cdf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	cdf = factory( NaN, NaN, NaN );
	y = cdf( NaN );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'if provided a finite `alpha` and `s`, the function returns a function which returns `1` when provided `+infinity` for `x`', function test( t ) {
	var cdf;
	var y;

	cdf = factory( 1.0, 1.0, 0.0 );
	y = cdf( PINF );
	t.equal( y, 1.0, 'returns 1' );

	t.end();
});

tape( 'if provided a finite `alpha` and `s`, the function returns a function which returns `0` when provided `x <= m`', function test( t ) {
	var cdf;
	var y;

	cdf = factory( 1.0, 1.0, 2.0 );
	y = cdf( NINF );
	t.equal( y, 0.0, 'returns 0' );

	y = cdf( -1.0 );
	t.equal( y, 0.0, 'returns 0' );

	y = cdf( 0.0 );
	t.equal( y, 0.0, 'returns 0' );

	y = cdf( 1.0 );
	t.equal( y, 0.0, 'returns 0' );

	y = cdf( 2.0 );
	t.equal( y, 0.0, 'returns 0' );

	t.end();
});

tape( 'if provided a nonpositive `s`, the created function always returns `NaN`', function test( t ) {
	var cdf;
	var y;

	cdf = factory( 1.0, -1.0, 1.0 );

	y = cdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = cdf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	cdf = factory( 1.0, 0.0, 1.0 );

	y = cdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = cdf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	cdf = factory( 1.0, NINF, 1.0 );
	y = cdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	cdf = factory( PINF, NINF, 1.0 );
	y = cdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	cdf = factory( NaN, NINF, NaN );
	y = cdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'the created function evaluates the cdf for `x` given large `alpha`', function test( t ) {
	var expected;
	var alpha;
	var delta;
	var cdf;
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
		cdf = factory( alpha[i], s[i], 0.0 );
		y = cdf( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', alpha: '+alpha[i]+', s: '+s[i]+', m: 0, y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 10.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. alpha: '+alpha[i]+'. s: '+s[i]+'. m: 0. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the created function evaluates the cdf for `x` given large `s`', function test( t ) {
	var expected;
	var alpha;
	var delta;
	var cdf;
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
		cdf = factory( alpha[i], s[i], 0.0 );
		y = cdf( x[i] );
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

tape( 'the created function evaluates the cdf for `x` given large `alpha` and `s`', function test( t ) {
	var expected;
	var alpha;
	var delta;
	var cdf;
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
		cdf = factory( alpha[i], s[i], 0.0 );
		y = cdf( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', alpha:'+alpha[i]+', s: '+s[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 4100.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. alpha: '+alpha[i]+'. s: '+s[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

}).call(this,"/lib/node_modules/@stdlib/math/base/dists/frechet/cdf/test/test.factory.js")
},{"./../lib/factory.js":50,"./fixtures/julia/both_large.json":52,"./fixtures/julia/large_scale.json":53,"./fixtures/julia/large_shape.json":54,"@stdlib/constants/math/float64-eps":26,"@stdlib/constants/math/float64-ninf":33,"@stdlib/constants/math/float64-pinf":34,"@stdlib/math/base/assert/is-nan":45,"@stdlib/math/base/special/abs":59,"tape":188}],57:[function(require,module,exports){
(function (__filename){
'use strict';

// MODULES //

var tape = require( 'tape' );
var cdf = require( './../lib' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.equal( typeof cdf, 'function', 'main export is a function' );
	t.end();
});

tape( 'attached to the main export is a factory method for generating `cdf` functions', function test( t ) {
	t.equal( typeof cdf.factory, 'function', 'exports a factory method' );
	t.end();
});

}).call(this,"/lib/node_modules/@stdlib/math/base/dists/frechet/cdf/test/test.js")
},{"./../lib":51,"tape":188}],58:[function(require,module,exports){
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

// TODO: implementation (?)

/**
* Rounds a numeric value toward positive infinity.
*
* @param {number} x - input value
* @returns {number} rounded value
*
* @example
* var v = ceil( -4.2 );
* // returns -4.0
*
* @example
* var v = ceil( 9.99999 );
* // returns 10.0
*
* @example
* var v = ceil( 0.0 );
* // returns 0.0
*
* @example
* var v = ceil( NaN );
* // returns NaN
*/
var ceil = Math.ceil;


// EXPORTS //

module.exports = ceil;

},{}],61:[function(require,module,exports){
'use strict';

/**
* Round a numeric value toward positive infinity.
*
* @module @stdlib/math/base/special/ceil
*
* @example
* var ceil = require( '@stdlib/math/base/special/ceil' );
*
* var v = ceil( -4.2 );
* // returns -4.0
*
* v = ceil( 9.99999 );
* // returns 10.0
*
* v = ceil( 0.0 );
* // returns 0.0
*
* v = ceil( NaN );
* // returns NaN
*/

// MODULES //

var ceil = require( './ceil.js' );


// EXPORTS //

module.exports = ceil;

},{"./ceil.js":60}],62:[function(require,module,exports){
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

},{"@stdlib/number/float64/base/from-words":88,"@stdlib/number/float64/base/get-high-word":92,"@stdlib/number/float64/base/to-words":103}],63:[function(require,module,exports){
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

},{"./copysign.js":62}],64:[function(require,module,exports){
'use strict';

/*
* The following copyright, license, and long comment were part of the original implementation available as part of [FreeBSD]{@link https://svnweb.freebsd.org/base/release/9.3.0/lib/msun/src/e_exp.c?view=markup}.
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
var trunc = require( '@stdlib/math/base/special/trunc' );
var NINF = require( '@stdlib/constants/math/float64-ninf' );
var PINF = require( '@stdlib/constants/math/float64-pinf' );
var expmulti = require( './expmulti.js' );


// VARIABLES //

var LN2_HI = 6.93147180369123816490e-01;
var LN2_LO = 1.90821492927058770002e-10;
var LOG2_E = 1.44269504088896338700e+00;
var OVERFLOW = 7.09782712893383973096e+02;
var UNDERFLOW = -7.45133219101941108420e+02;
var NEARZERO = 1.0 / (1 << 28); // 2^-28;
var NEG_NEARZERO = -NEARZERO;


// MAIN //

/**
* Evaluates the natural exponential function.
*
* ## Method
*
* 1.  We reduce \\( x \\) to an \\( r \\) so that \\( |r| \leq 0.5 \cdot \ln(2) \approx 0.34658 \\). Given \\( x \\), we find an \\( r \\) and integer \\( k \\) such that
*
*    ```tex
*    \begin{align*}
*    x &= k \cdot \ln(2) + r \\
*    |r| &\leq 0.5 \cdot \ln(2)
*    \end{align*}
*    ```
*
*    <!-- <note> -->
*
*    \\( r \\) can be represented as \\( r = \mathrm{hi} - \mathrm{lo} \\) for better accuracy.
*
*    <!-- </note> -->
*
* 2.  We approximate of \\( e^{r} \\) by a special rational function on the interval \\([0,0.34658]\\):
*
*    ```tex
*    \begin{align*}
*    R\left(r^2\right) &= r \cdot \frac{ e^{r}+1 }{ e^{r}-1 } \\
*    &= 2 + \frac{r^2}{6} - \frac{r^4}{360} + \ldots
*    \end{align*}
*    ```
*
*    We use a special Remes algorithm on \\([0,0.34658]\\) to generate a polynomial of degree \\(5\\) to approximate \\(R\\). The maximum error of this polynomial approximation is bounded by \\(2^{-59}\\). In other words,
*
*    ```tex
*    R(z) \sim 2 + P_1 z + P_2 z^2 + P_3 z^3 + P_4 z^4 + P_5 z^5
*    ```
*
*    where \\( z = r^2 \\) and
*
*    ```tex
*    \left|  2 + P_1 z + \ldots + P_5 z^5  - R(z) \right| \leq 2^{-59}
*    ```
*
*    <!-- <note> -->
*
*    The values of \\( P_1 \\) to \\( P_5 \\) are listed in the source code.
*
*    <!-- </note> -->
*
*    The computation of \\( e^{r} \\) thus becomes
*
*    ```tex
*    \begin{align*}
*    e^{r} &= 1 + \frac{2r}{R-r} \\
*          &= 1 + r + \frac{r \cdot R_1(r)}{2 - R_1(r)}\ \text{for better accuracy}
*    \end{align*}
*    ```
*
*    where
*
*    ```tex
*    R_1(r) = r - P_1\ r^2 + P_2\ r^4 + \ldots + P_5\ r^{10}
*    ```
*
* 3.  We scale back to obtain \\( e^{x} \\). From step 1, we have
*
*    ```tex
*    e^{x} = 2^k e^{r}
*    ```
*
*
* ## Special Cases
*
* ```tex
* \begin{align*}
* e^\infty &= \infty \\
* e^{-\infty} &= 0 \\
* e^{\mathrm{NaN}} &= \mathrm{NaN} \\
* e^0 &= 1\ \mathrm{is\ exact\ for\ finite\ argument\ only}
* \end{align*}
* ```
*
* ## Notes
*
* -   According to an error analysis, the error is always less than \\(1\\) ulp (unit in the last place).
*
* -   For an IEEE double,
*
*     -   if \\(x > 7.09782712893383973096\mbox{e+}02\\), then \\(e^{x}\\) overflows
*     -   if \\(x < -7.45133219101941108420\mbox{e+}02\\), then \\(e^{x}\\) underflows
*
* -   The hexadecimal values included in the source code are the intended ones for the used constants. Decimal values may be used, provided that the compiler will convert from decimal to binary accurately enough to produce the intended hexadecimal values.
*
*
* @param {number} x - input value
* @returns {number} function value
*
* @example
* var v = exp( 4.0 );
* // returns ~54.5982
*
* @example
* var v = exp( -9.0 );
* // returns ~1.234e-4
*
* @example
* var v = exp( 0.0 );
* // returns 1.0
*
* @example
* var v = exp( NaN );
* // returns NaN
*/
function exp( x ) {
	var hi;
	var lo;
	var k;

	if ( isnan( x ) || x === PINF ) {
		return x;
	}
	if ( x === NINF ) {
		return 0.0;
	}
	if ( x > OVERFLOW ) {
		return PINF;
	}
	if ( x < UNDERFLOW ) {
		return 0.0;
	}
	if (
		x > NEG_NEARZERO &&
		x < NEARZERO
	) {
		return 1.0 + x;
	}
	// Reduce and compute `r = hi - lo` for extra precision.
	if ( x < 0.0 ) {
		k = trunc( (LOG2_E*x) - 0.5 );
	} else {
		k = trunc( (LOG2_E*x) + 0.5 );
	}
	hi = x - (k*LN2_HI);
	lo = k * LN2_LO;

	return expmulti( hi, lo, k );
}


// EXPORTS //

module.exports = exp;

},{"./expmulti.js":65,"@stdlib/constants/math/float64-ninf":33,"@stdlib/constants/math/float64-pinf":34,"@stdlib/math/base/assert/is-nan":45,"@stdlib/math/base/special/trunc":84}],65:[function(require,module,exports){
'use strict';

// MODULES //

var ldexp = require( '@stdlib/math/base/special/ldexp' );
var polyvalP = require( './polyval_p.js' );


// MAIN //

/**
* Computes \\(e^{r} 2^k\\) where \\(r = \mathrm{hi} - \mathrm{lo}\\) and \\(|r| \leq \ln(2)/2\\).
*
* @private
* @param {number} hi - upper bound
* @param {number} lo - lower bound
* @param {integer} k - power of 2
* @returns {number} function value
*/
function expmulti( hi, lo, k ) {
	var r;
	var t;
	var c;
	var y;

	r = hi - lo;
	t = r * r;
	c = r - ( t*polyvalP( t ) );
	y = 1.0 - ( lo - ( (r*c)/(2.0-c) ) - hi);

	return ldexp( y, k );
}


// EXPORTS //

module.exports = expmulti;

},{"./polyval_p.js":67,"@stdlib/math/base/special/ldexp":70}],66:[function(require,module,exports){
'use strict';

/**
* Evaluate the natural exponential function.
*
* @module @stdlib/math/base/special/exp
*
* @example
* var exp = require( '@stdlib/math/base/special/exp' );
*
* var v = exp( 4.0 );
* // returns ~54.5982
*
* v = exp( -9.0 );
* // returns ~1.234e-4
*
* v = exp( 0.0 );
* // returns 1.0
*
* v = exp( NaN );
* // returns NaN
*/

// MODULES //

var exp = require( './exp.js' );


// EXPORTS //

module.exports = exp;

},{"./exp.js":64}],67:[function(require,module,exports){
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

},{}],68:[function(require,module,exports){
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

},{}],69:[function(require,module,exports){
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

},{"./floor.js":68}],70:[function(require,module,exports){
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

},{"./ldexp.js":71}],71:[function(require,module,exports){
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

},{"@stdlib/constants/math/float64-exponent-bias":27,"@stdlib/constants/math/float64-max-base2-exponent":31,"@stdlib/constants/math/float64-max-base2-exponent-subnormal":30,"@stdlib/constants/math/float64-min-base2-exponent-subnormal":32,"@stdlib/constants/math/float64-ninf":33,"@stdlib/constants/math/float64-pinf":34,"@stdlib/math/base/assert/is-infinite":41,"@stdlib/math/base/assert/is-nan":45,"@stdlib/math/base/special/copysign":63,"@stdlib/number/float64/base/exponent":86,"@stdlib/number/float64/base/from-words":88,"@stdlib/number/float64/base/normalize":94,"@stdlib/number/float64/base/to-words":103}],72:[function(require,module,exports){
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

},{"./pow.js":78}],73:[function(require,module,exports){
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

},{"./polyval_l.js":75,"@stdlib/constants/math/float64-exponent-bias":27,"@stdlib/number/float64/base/get-high-word":92,"@stdlib/number/float64/base/set-high-word":98,"@stdlib/number/float64/base/set-low-word":100}],74:[function(require,module,exports){
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

},{"./polyval_w.js":77,"@stdlib/number/float64/base/set-low-word":100}],75:[function(require,module,exports){
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

},{}],76:[function(require,module,exports){
arguments[4][67][0].apply(exports,arguments)
},{"dup":67}],77:[function(require,module,exports){
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

},{}],78:[function(require,module,exports){
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

},{"./log2ax.js":73,"./logx.js":74,"./pow2.js":79,"./x_is_zero.js":80,"./y_is_huge.js":81,"./y_is_infinite.js":82,"@stdlib/constants/math/float64-ninf":33,"@stdlib/constants/math/float64-pinf":34,"@stdlib/math/base/assert/is-infinite":41,"@stdlib/math/base/assert/is-integer":43,"@stdlib/math/base/assert/is-nan":45,"@stdlib/math/base/assert/is-odd":47,"@stdlib/math/base/special/abs":59,"@stdlib/math/base/special/sqrt":83,"@stdlib/number/float64/base/set-low-word":100,"@stdlib/number/float64/base/to-words":103,"@stdlib/number/uint32/base/to-int32":107}],79:[function(require,module,exports){
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

},{"./polyval_p.js":76,"@stdlib/constants/math/float64-exponent-bias":27,"@stdlib/constants/math/float64-ln-two":29,"@stdlib/math/base/special/ldexp":70,"@stdlib/number/float64/base/get-high-word":92,"@stdlib/number/float64/base/set-high-word":98,"@stdlib/number/float64/base/set-low-word":100,"@stdlib/number/uint32/base/to-int32":107}],80:[function(require,module,exports){
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

},{"@stdlib/constants/math/float64-ninf":33,"@stdlib/constants/math/float64-pinf":34,"@stdlib/math/base/assert/is-odd":47,"@stdlib/math/base/special/copysign":63}],81:[function(require,module,exports){
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

},{"@stdlib/number/float64/base/get-high-word":92}],82:[function(require,module,exports){
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

},{"@stdlib/constants/math/float64-pinf":34,"@stdlib/math/base/special/abs":59}],83:[function(require,module,exports){
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

},{}],84:[function(require,module,exports){
'use strict';

/**
* Round a numeric value toward zero.
*
* @module @stdlib/math/base/special/trunc
*
* @example
* var trunc = require( '@stdlib/math/base/special/trunc' );
*
* var v = trunc( -4.2 );
* // returns -4.0
*
* v = trunc( 9.99999 );
* // returns 9.0
*
* v = trunc( 0.0 );
* // returns 0.0
*
* v = trunc( -0.0 );
* // returns -0.0
*
* v = trunc( NaN );
* // returns NaN
*
* v = trunc( Infinity );
* // returns Infinity
*
* v = trunc( -Infinity );
* // returns -Infinity
*/

// MODULES //

var trunc = require( './trunc.js' );


// EXPORTS //

module.exports = trunc;

},{"./trunc.js":85}],85:[function(require,module,exports){
'use strict';

// MODULES //

var floor = require( '@stdlib/math/base/special/floor' );
var ceil = require( '@stdlib/math/base/special/ceil' );


// MAIN //

/**
* Rounds a numeric value toward zero.
*
* @param {number} x - input value
* @returns {number} rounded value
*
* @example
* var v = trunc( -4.2 );
* // returns -4.0
*
* @example
* var v = trunc( 9.99999 );
* // returns 9.0
*
* @example
* var v = trunc( 0.0 );
* // returns 0.0
*
* @example
* var v = trunc( -0.0 );
* // returns -0.0
*
* @example
* var v = trunc( NaN );
* // returns NaN
*
* @example
* var v = trunc( Infinity );
* // returns Infinity
*
* @example
* var v = trunc( -Infinity );
* // returns -Infinity
*/
function trunc( x ) {
	if ( x < 0.0 ) {
		return ceil( x );
	}
	return floor( x );
}


// EXPORTS //

module.exports = trunc;

},{"@stdlib/math/base/special/ceil":61,"@stdlib/math/base/special/floor":69}],86:[function(require,module,exports){
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

},{"./main.js":87}],87:[function(require,module,exports){
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

},{"@stdlib/constants/math/float64-exponent-bias":27,"@stdlib/constants/math/float64-high-word-exponent-mask":28,"@stdlib/number/float64/base/get-high-word":92}],88:[function(require,module,exports){
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

},{"./main.js":90}],89:[function(require,module,exports){
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

},{"@stdlib/assert/is-little-endian":18}],90:[function(require,module,exports){
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

},{"./indices.js":89,"@stdlib/array/float64":2,"@stdlib/array/uint32":7}],91:[function(require,module,exports){
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

},{"@stdlib/assert/is-little-endian":18}],92:[function(require,module,exports){
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

},{"./main.js":93}],93:[function(require,module,exports){
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

},{"./high.js":91,"@stdlib/array/float64":2,"@stdlib/array/uint32":7}],94:[function(require,module,exports){
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

},{"./main.js":95}],95:[function(require,module,exports){
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

},{"./normalize.js":96}],96:[function(require,module,exports){
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

},{"@stdlib/constants/math/float64-smallest-normal":35,"@stdlib/math/base/assert/is-infinite":41,"@stdlib/math/base/assert/is-nan":45,"@stdlib/math/base/special/abs":59}],97:[function(require,module,exports){
arguments[4][91][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":18,"dup":91}],98:[function(require,module,exports){
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

},{"./main.js":99}],99:[function(require,module,exports){
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

},{"./high.js":97,"@stdlib/array/float64":2,"@stdlib/array/uint32":7}],100:[function(require,module,exports){
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

},{"./main.js":102}],101:[function(require,module,exports){
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

},{"@stdlib/assert/is-little-endian":18}],102:[function(require,module,exports){
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

},{"./low.js":101,"@stdlib/array/float64":2,"@stdlib/array/uint32":7}],103:[function(require,module,exports){
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

},{"./main.js":105}],104:[function(require,module,exports){
arguments[4][89][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":18,"dup":89}],105:[function(require,module,exports){
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

},{"./to_words.js":106}],106:[function(require,module,exports){
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

},{"./indices.js":104,"@stdlib/array/float64":2,"@stdlib/array/uint32":7}],107:[function(require,module,exports){
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

},{"./main.js":108}],108:[function(require,module,exports){
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

},{}],109:[function(require,module,exports){
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

},{}],110:[function(require,module,exports){
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

},{"./constant_function.js":109}],111:[function(require,module,exports){
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

},{}],112:[function(require,module,exports){
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

},{"./define_read_only_property.js":111}],113:[function(require,module,exports){
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

},{"./float64array.js":114,"@stdlib/assert/is-float64array":15}],114:[function(require,module,exports){
'use strict';

// EXPORTS //

module.exports = ( typeof Float64Array === 'function' ) ? Float64Array : null;

},{}],115:[function(require,module,exports){
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

},{"./detect_float64array_support.js":113}],116:[function(require,module,exports){
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

},{}],117:[function(require,module,exports){
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

},{"./detect_symbol_support.js":116}],118:[function(require,module,exports){
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

},{"@stdlib/utils/detect-symbol-support":117}],119:[function(require,module,exports){
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

},{"./has_tostringtag_support.js":118}],120:[function(require,module,exports){
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

},{"./uint16array.js":122,"@stdlib/assert/is-uint16array":20,"@stdlib/constants/math/uint16-max":36}],121:[function(require,module,exports){
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

},{"./detect_uint16array_support.js":120}],122:[function(require,module,exports){
'use strict';

// EXPORTS //

module.exports = ( typeof Uint16Array === 'function' ) ? Uint16Array : null;

},{}],123:[function(require,module,exports){
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

},{"./uint32array.js":125,"@stdlib/assert/is-uint32array":22,"@stdlib/constants/math/uint32-max":37}],124:[function(require,module,exports){
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

},{"./detect_uint32array_support.js":123}],125:[function(require,module,exports){
'use strict';

// EXPORTS //

module.exports = ( typeof Uint32Array === 'function' ) ? Uint32Array : null;

},{}],126:[function(require,module,exports){
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

},{"./uint8array.js":128,"@stdlib/assert/is-uint8array":24,"@stdlib/constants/math/uint8-max":38}],127:[function(require,module,exports){
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

},{"./detect_uint8array_support.js":126}],128:[function(require,module,exports){
'use strict';

// EXPORTS //

module.exports = ( typeof Uint8Array === 'function' ) ? Uint8Array : null;

},{}],129:[function(require,module,exports){
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

},{"./native_class.js":130,"./polyfill.js":131,"@stdlib/utils/detect-tostringtag-support":119}],130:[function(require,module,exports){
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

},{"./tostring.js":132}],131:[function(require,module,exports){
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

},{"./tostring.js":132,"./tostringtag.js":133,"@stdlib/assert/has-own-property":14}],132:[function(require,module,exports){
'use strict';

// MAIN //

var toStr = Object.prototype.toString;


// EXPORTS //

module.exports = toStr;

},{}],133:[function(require,module,exports){
'use strict';

// MAIN //

var toStrTag = ( typeof Symbol === 'function' ) ? Symbol.toStringTag : '';


// EXPORTS //

module.exports = toStrTag;

},{}],134:[function(require,module,exports){
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

},{}],135:[function(require,module,exports){

},{}],136:[function(require,module,exports){
arguments[4][135][0].apply(exports,arguments)
},{"dup":135}],137:[function(require,module,exports){
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

},{}],138:[function(require,module,exports){
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

},{"base64-js":134,"ieee754":157}],139:[function(require,module,exports){
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
},{"../../is-buffer/index.js":159}],140:[function(require,module,exports){
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

},{"./lib/is_arguments.js":141,"./lib/keys.js":142}],141:[function(require,module,exports){
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

},{}],142:[function(require,module,exports){
exports = module.exports = typeof Object.keys === 'function'
  ? Object.keys : shim;

exports.shim = shim;
function shim (obj) {
  var keys = [];
  for (var key in obj) keys.push(key);
  return keys;
}

},{}],143:[function(require,module,exports){
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

},{"foreach":153,"object-keys":163}],144:[function(require,module,exports){
module.exports = function () {
    for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] !== undefined) return arguments[i];
    }
};

},{}],145:[function(require,module,exports){
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

},{"./helpers/isFinite":146,"./helpers/isNaN":147,"./helpers/mod":148,"./helpers/sign":149,"es-to-primitive/es5":150,"has":156,"is-callable":160}],146:[function(require,module,exports){
var $isNaN = Number.isNaN || function (a) { return a !== a; };

module.exports = Number.isFinite || function (x) { return typeof x === 'number' && !$isNaN(x) && x !== Infinity && x !== -Infinity; };

},{}],147:[function(require,module,exports){
module.exports = Number.isNaN || function isNaN(a) {
	return a !== a;
};

},{}],148:[function(require,module,exports){
module.exports = function mod(number, modulo) {
	var remain = number % modulo;
	return Math.floor(remain >= 0 ? remain : remain + modulo);
};

},{}],149:[function(require,module,exports){
module.exports = function sign(number) {
	return number >= 0 ? 1 : -1;
};

},{}],150:[function(require,module,exports){
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

},{"./helpers/isPrimitive":151,"is-callable":160}],151:[function(require,module,exports){
module.exports = function isPrimitive(value) {
	return value === null || (typeof value !== 'function' && typeof value !== 'object');
};

},{}],152:[function(require,module,exports){
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

},{}],153:[function(require,module,exports){

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


},{}],154:[function(require,module,exports){
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

},{}],155:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

module.exports = Function.prototype.bind || implementation;

},{"./implementation":154}],156:[function(require,module,exports){
var bind = require('function-bind');

module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);

},{"function-bind":155}],157:[function(require,module,exports){
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

},{}],158:[function(require,module,exports){
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

},{}],159:[function(require,module,exports){
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

},{}],160:[function(require,module,exports){
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

},{}],161:[function(require,module,exports){
var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};

},{}],162:[function(require,module,exports){
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

},{}],163:[function(require,module,exports){
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

},{"./isArguments":164}],164:[function(require,module,exports){
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

},{}],165:[function(require,module,exports){
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
},{"_process":137}],166:[function(require,module,exports){
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
},{"_process":137}],167:[function(require,module,exports){
module.exports = require('./lib/_stream_duplex.js');

},{"./lib/_stream_duplex.js":168}],168:[function(require,module,exports){
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
},{"./_stream_readable":170,"./_stream_writable":172,"core-util-is":139,"inherits":158,"process-nextick-args":166}],169:[function(require,module,exports){
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
},{"./_stream_transform":171,"core-util-is":139,"inherits":158}],170:[function(require,module,exports){
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
},{"./_stream_duplex":168,"./internal/streams/BufferList":173,"./internal/streams/destroy":174,"./internal/streams/stream":175,"_process":137,"core-util-is":139,"events":152,"inherits":158,"isarray":161,"process-nextick-args":166,"safe-buffer":181,"string_decoder/":187,"util":135}],171:[function(require,module,exports){
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
},{"./_stream_duplex":168,"core-util-is":139,"inherits":158}],172:[function(require,module,exports){
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
},{"./_stream_duplex":168,"./internal/streams/destroy":174,"./internal/streams/stream":175,"_process":137,"core-util-is":139,"inherits":158,"process-nextick-args":166,"safe-buffer":181,"util-deprecate":194}],173:[function(require,module,exports){
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
},{"safe-buffer":181}],174:[function(require,module,exports){
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
},{"process-nextick-args":166}],175:[function(require,module,exports){
module.exports = require('events').EventEmitter;

},{"events":152}],176:[function(require,module,exports){
module.exports = require('./readable').PassThrough

},{"./readable":177}],177:[function(require,module,exports){
exports = module.exports = require('./lib/_stream_readable.js');
exports.Stream = exports;
exports.Readable = exports;
exports.Writable = require('./lib/_stream_writable.js');
exports.Duplex = require('./lib/_stream_duplex.js');
exports.Transform = require('./lib/_stream_transform.js');
exports.PassThrough = require('./lib/_stream_passthrough.js');

},{"./lib/_stream_duplex.js":168,"./lib/_stream_passthrough.js":169,"./lib/_stream_readable.js":170,"./lib/_stream_transform.js":171,"./lib/_stream_writable.js":172}],178:[function(require,module,exports){
module.exports = require('./readable').Transform

},{"./readable":177}],179:[function(require,module,exports){
module.exports = require('./lib/_stream_writable.js');

},{"./lib/_stream_writable.js":172}],180:[function(require,module,exports){
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
},{"_process":137,"through":193}],181:[function(require,module,exports){
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

},{"buffer":138}],182:[function(require,module,exports){
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

},{"events":152,"inherits":158,"readable-stream/duplex.js":167,"readable-stream/passthrough.js":176,"readable-stream/readable.js":177,"readable-stream/transform.js":178,"readable-stream/writable.js":179}],183:[function(require,module,exports){
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

},{"es-abstract/es5":145,"function-bind":155}],184:[function(require,module,exports){
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

},{"./implementation":183,"./polyfill":185,"./shim":186,"define-properties":143,"function-bind":155}],185:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

var zeroWidthSpace = '\u200b';

module.exports = function getPolyfill() {
	if (String.prototype.trim && zeroWidthSpace.trim() === zeroWidthSpace) {
		return String.prototype.trim;
	}
	return implementation;
};

},{"./implementation":183}],186:[function(require,module,exports){
'use strict';

var define = require('define-properties');
var getPolyfill = require('./polyfill');

module.exports = function shimStringTrim() {
	var polyfill = getPolyfill();
	define(String.prototype, { trim: polyfill }, { trim: function () { return String.prototype.trim !== polyfill; } });
	return polyfill;
};

},{"./polyfill":185,"define-properties":143}],187:[function(require,module,exports){
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
},{"safe-buffer":181}],188:[function(require,module,exports){
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
},{"./lib/default_stream":189,"./lib/results":191,"./lib/test":192,"_process":137,"defined":144,"through":193}],189:[function(require,module,exports){
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
},{"_process":137,"fs":136,"through":193}],190:[function(require,module,exports){
(function (process){
module.exports = typeof setImmediate !== 'undefined'
    ? setImmediate
    : process.nextTick
;

}).call(this,require('_process'))
},{"_process":137}],191:[function(require,module,exports){
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
},{"_process":137,"events":152,"function-bind":155,"has":156,"inherits":158,"object-inspect":162,"resumer":180,"through":193}],192:[function(require,module,exports){
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
},{"./next_tick":190,"deep-equal":140,"defined":144,"events":152,"has":156,"inherits":158,"path":165,"string.prototype.trim":184}],193:[function(require,module,exports){
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
},{"_process":137,"stream":182}],194:[function(require,module,exports){
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
