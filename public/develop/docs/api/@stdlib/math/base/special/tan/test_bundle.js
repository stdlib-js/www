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

},{"./float64array.js":1,"./polyfill.js":3,"@stdlib/utils/detect-float64array-support":101}],3:[function(require,module,exports){
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

},{"./polyfill.js":5,"./uint16array.js":6,"@stdlib/utils/detect-uint16array-support":107}],5:[function(require,module,exports){
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

},{"./polyfill.js":8,"./uint32array.js":9,"@stdlib/utils/detect-uint32array-support":110}],8:[function(require,module,exports){
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

},{"./polyfill.js":11,"./uint8array.js":12,"@stdlib/utils/detect-uint8array-support":113}],11:[function(require,module,exports){
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

},{"@stdlib/utils/native-class":115}],17:[function(require,module,exports){
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

},{"@stdlib/utils/native-class":115}],22:[function(require,module,exports){
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

},{"@stdlib/utils/native-class":115}],24:[function(require,module,exports){
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

},{"@stdlib/utils/native-class":115}],26:[function(require,module,exports){
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

},{}],30:[function(require,module,exports){
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

},{}],31:[function(require,module,exports){
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

},{}],32:[function(require,module,exports){
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

},{}],33:[function(require,module,exports){
'use strict';

/**
* The mathematical constant `π`.
*
* @module @stdlib/constants/math/float64-pi
* @type {number}
*
* @example
* var PI = require( '@stdlib/constants/math/float64-pi' );
* // returns 3.141592653589793
*/


// MAIN //

/**
* The mathematical constant `π`.
*
* @constant
* @type {number}
* @default 3.141592653589793
* @see [Wikipedia]{@link https://en.wikipedia.org/wiki/Pi}
*/
var PI = 3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679; // eslint-disable-line max-len


// EXPORTS //

module.exports = PI;

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

},{"./is_infinite.js":40}],40:[function(require,module,exports){
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

},{"@stdlib/constants/math/float64-ninf":32,"@stdlib/constants/math/float64-pinf":34}],41:[function(require,module,exports){
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

},{"./is_nan.js":42}],42:[function(require,module,exports){
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

},{}],43:[function(require,module,exports){
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

},{}],44:[function(require,module,exports){
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

},{"./abs.js":43}],45:[function(require,module,exports){
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

},{"@stdlib/number/float64/base/from-words":80,"@stdlib/number/float64/base/get-high-word":84,"@stdlib/number/float64/base/to-words":95}],46:[function(require,module,exports){
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

},{"./copysign.js":45}],47:[function(require,module,exports){
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

},{}],48:[function(require,module,exports){
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

},{"./floor.js":47}],49:[function(require,module,exports){
'use strict';

/**
* Compute the tangent of a number on `[-π/4, π/4]`.
*
* @module @stdlib/math/base/special/kernel-tan
*
* @example
* var kernelTan = require( '@stdlib/math/base/special/kernel-tan' );
*
* var out = kernelTan( Math.PI/4.0, 0.0, 1 );
* // returns ~1.0
*
* out = kernelTan( Math.PI/4.0, 0.0, -1 );
* // returns ~-1.0
*
* out = kernelTan( Math.PI/6.0, 0.0, 1 );
* // returns ~0.577
*
* out = kernelTan( 0.664, 5.288e-17, 1 );
* // returns ~0.783
*/

// MODULES //

var kernelTan = require( './kernel_tan.js' );


// EXPORTS //

module.exports = kernelTan;

},{"./kernel_tan.js":50}],50:[function(require,module,exports){
'use strict';

/*
* The following copyright, license, and long comment were part of the original implementation available as part of [FreeBSD]{@link https://svnweb.freebsd.org/base/release/9.3.0/lib/msun/src/k_tan.c?view=co}.
*
* The implementation follows the original, but has been modified for JavaScript.
*/

/*
* ====================================================
* Copyright 2004 Sun Microsystems, Inc.  All Rights Reserved.
*
* Permission to use, copy, modify, and distribute this
* software is freely granted, provided that this notice
* is preserved.
* ====================================================
*/

// MODULES //

var getHighWord = require( '@stdlib/number/float64/base/get-high-word' );
var setLowWord = require( '@stdlib/number/float64/base/set-low-word' );
var polyvalOdd = require( './polyval_t_odd.js' );
var polyvalEven = require( './polyval_t_even.js' );


// VARIABLES //

var PIO4 = 7.85398163397448278999e-01;
var PIO4LO = 3.06161699786838301793e-17;
var T0 = 3.33333333333334091986e-01; // 3FD55555, 55555563

// Absolute value mask: 2147483647 => 0x7fffffff => 01111111111111111111111111111111
var HIGH_WORD_ABS_MASK = 0x7fffffff|0; // asm type annotation


// MAIN //

/**
* Computes the tangent on \\( \approx[-\pi/4, \pi/4] \\) (except on -0), \\( \pi/4 \approx 0.7854 \\).
*
* ## Method
*
* -   Since \\( \tan(-x) = -\tan(x) \\), we need only to consider positive \\( x \\).
*
* -   Callers must return \\( \tan(-0) = -0 \\) without calling here since our odd polynomial is not evaluated in a way that preserves \\( -0 \\). Callers may do the optimization \\( \tan(x) \approx x \\) for tiny \\( x \\).
*
* -   \\( \tan(x) \\) is approximated by a odd polynomial of degree 27 on \\( [0, 0.67434] \\)
*
*     ```tex
*     \tan(x) \approx x + T_1 x^3 + \ldots + T_{13} x^{27}
*     ```
*     where
*
*     ```tex
*     \left| \frac{\tan(x)}{x} - \left( 1 + T_1 x^2 + T_2 x^4 + \ldots + T_{13} x^{26} \right) \right|  \le 2^{-59.2}
*     ```
*
* -   Note: \\( \tan(x+y) = \tan(x) + \tan'(x) \cdot y \approx \tan(x) + ( 1 + x \cdot x ) \cdot y \\). Therefore, for better accuracy in computing \\( \tan(x+y) \\), let
*
*     ```tex
*     r = x^3 \cdot \left( T_2+x^2 \cdot (T_3+x^2 \cdot (\ldots+x^2 \cdot (T_{12}+x^2 \cdot T_{13}))) \right)
*     ```
*
*     then
*
*     ```tex
*     \tan(x+y) = x^3 + \left( T_1 \cdot x^2 + (x \cdot (r+y)+y) \right)
*     ```
*
* -   For \\( x \\) in \\( [0.67434, \pi/4] \\),  let \\( y = \pi/4 - x \\), then
*
*     ```tex
*     \tan(x) = \tan\left(\tfrac{\pi}{4}-y\right) = \frac{1-\tan(y)}{1+\tan(y)} \\
*     = 1 - 2 \cdot \left( \tan(y) - \tfrac{\tan(y)^2}{1+\tan(y)} \right)
*     ```
*
*
* @param {number} x - input value (in radians, assumed to be bounded by ~π/4 in magnitude)
* @param {number} y - tail of `x`
* @param {integer} k - indicates whether tan (if k = 1) or -1/tan (if k = -1) is returned
* @returns {number} tangent
*
* @example
* var out = kernelTan( Math.PI/4.0, 0.0, 1 );
* // returns ~1.0
*
* @example
* var out = kernelTan( Math.PI/4.0, 0.0, -1 );
* // returns ~-1.0
*
* @example
* var out = kernelTan( Math.PI/6.0, 0.0, 1 );
* // returns ~0.577
*
* @example
* var out = kernelTan( 0.664, 5.288e-17, 1 );
* // returns ~0.783
*
* @example
* var out = kernelTan( NaN, 0.0, 1 );
* // returns NaN
*
* @example
* var out = kernelTan( 3.0, NaN, 1 );
* // returns NaN
*
* @example
* var out = kernelTan( NaN, NaN, 1 );
* // returns NaN
*/
function kernelTan( x, y, k ) {
	var hx;
	var ix;
	var a;
	var r;
	var s;
	var t;
	var v;
	var w;
	var z;

	hx = getHighWord( x );

	// High word of |x|:
	ix = (hx & HIGH_WORD_ABS_MASK)|0; // asm type annotation

	// Case: |x| >= 0.6744
	if ( ix >= 0x3FE59428 ) {
		if ( x < 0 ) {
			x = -x;
			y = -y;
		}
		z = PIO4 - x;
		w = PIO4LO - y;
		x = z + w;
		y = 0.0;
	}
	z = x * x;
	w = z * z;

	// Break x^5*(T[1]+x^2*T[2]+...) into x^5(T[1]+x^4*T[3]+...+x^20*T[11]) + x^5(x^2*(T[2]+x^4*T[4]+...+x^22*T[12]))...
	r = polyvalOdd( w );
	v = z * polyvalEven( w );
	s = z * x;
	r = y + (z * ((s * (r + v)) + y));
	r += T0 * s;
	w = x + r;
	if ( ix >= 0x3FE59428 ) {
		v = k;
		return ( 1.0 - ( (hx >> 30) & 2 ) ) * ( v - (2.0 * (x - ((w * w / (w + v)) - r)) )); // eslint-disable-line max-len
	}
	if ( k === 1 ) {
		return w;
	}
	// Compute -1/(x+r) accurately...
	z = w;
	setLowWord( z, 0 );
	v = r - (z - x); // z + v = r + x
	a = -1.0 / w; // a = -1/w
	t = a;
	setLowWord( t, 0 );
	s = 1.0 + (t * z);
	return t + (a * (s + (t * v)));
}


// EXPORTS //

module.exports = kernelTan;

},{"./polyval_t_even.js":51,"./polyval_t_odd.js":52,"@stdlib/number/float64/base/get-high-word":84,"@stdlib/number/float64/base/set-low-word":92}],51:[function(require,module,exports){
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
		return 0.05396825397622605;
	}
	return 0.05396825397622605 + (x * (0.0088632398235993 + (x * (0.0014562094543252903 + (x * (0.0002464631348184699 + (x * (0.00007140724913826082 + (x * 0.00002590730518636337))))))))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

},{}],52:[function(require,module,exports){
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
		return 0.13333333333320124;
	}
	return 0.13333333333320124 + (x * (0.021869488294859542 + (x * (0.0035920791075913124 + (x * (0.0005880412408202641 + (x * (0.00007817944429395571 + (x * -0.000018558637485527546))))))))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

},{}],53:[function(require,module,exports){
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

},{"./ldexp.js":54}],54:[function(require,module,exports){
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

},{"@stdlib/constants/math/float64-exponent-bias":27,"@stdlib/constants/math/float64-max-base2-exponent":30,"@stdlib/constants/math/float64-max-base2-exponent-subnormal":29,"@stdlib/constants/math/float64-min-base2-exponent-subnormal":31,"@stdlib/constants/math/float64-ninf":32,"@stdlib/constants/math/float64-pinf":34,"@stdlib/math/base/assert/is-infinite":39,"@stdlib/math/base/assert/is-nan":41,"@stdlib/math/base/special/copysign":46,"@stdlib/number/float64/base/exponent":78,"@stdlib/number/float64/base/from-words":80,"@stdlib/number/float64/base/normalize":89,"@stdlib/number/float64/base/to-words":95}],55:[function(require,module,exports){
'use strict';

/**
* Compute `x - nπ/2 = r`.
*
* @module @stdlib/math/base/special/rempio2
*
* @example
* var rempio2 = require( '@stdlib/math/base/special/rempio2' );
*
* var y = new Array( 2 );
* var n = rempio2( 128.0, y );
* // returns 81
*
* var y1 = y[ 0 ];
* // returns ~0.765
*
* var y2 = y[ 1 ];
* // returns ~3.618e-17
*/

// MODULES //

var rempio2 = require( './rempio2.js' );


// EXPORTS //

module.exports = rempio2;

},{"./rempio2.js":57}],56:[function(require,module,exports){
'use strict';

/*
* The following copyright, license, and long comment were part of the original implementation available as part of [FreeBSD]{@link https://svnweb.freebsd.org/base/release/9.3.0/lib/msun/src/k_rem_pio2.c?view=co}.
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

var floor = require( '@stdlib/math/base/special/floor' );
var ldexp = require( '@stdlib/math/base/special/ldexp' );


// VARIABLES //

/*
* Table of constants for `2/π` (`396` hex digits, `476` decimal).
*
* Integer array which contains the (`24*i`)-th to (`24*i+23`)-th bit of `2/π` after binary point. The corresponding floating value is
*
* ```tex
* \operatorname{ipio2}[i] \cdot 2^{-24(i+1)}
* ```
*
* This table must have at least `(e0-3)/24 + jk` terms. For quad precision (`e0 <= 16360`, `jk = 6`), this is `686`.
*/
var IPIO2 = [
	0xA2F983, 0x6E4E44, 0x1529FC, 0x2757D1, 0xF534DD, 0xC0DB62,
	0x95993C, 0x439041, 0xFE5163, 0xABDEBB, 0xC561B7, 0x246E3A,
	0x424DD2, 0xE00649, 0x2EEA09, 0xD1921C, 0xFE1DEB, 0x1CB129,
	0xA73EE8, 0x8235F5, 0x2EBB44, 0x84E99C, 0x7026B4, 0x5F7E41,
	0x3991D6, 0x398353, 0x39F49C, 0x845F8B, 0xBDF928, 0x3B1FF8,
	0x97FFDE, 0x05980F, 0xEF2F11, 0x8B5A0A, 0x6D1F6D, 0x367ECF,
	0x27CB09, 0xB74F46, 0x3F669E, 0x5FEA2D, 0x7527BA, 0xC7EBE5,
	0xF17B3D, 0x0739F7, 0x8A5292, 0xEA6BFB, 0x5FB11F, 0x8D5D08,
	0x560330, 0x46FC7B, 0x6BABF0, 0xCFBC20, 0x9AF436, 0x1DA9E3,
	0x91615E, 0xE61B08, 0x659985, 0x5F14A0, 0x68408D, 0xFFD880,
	0x4D7327, 0x310606, 0x1556CA, 0x73A8C9, 0x60E27B, 0xC08C6B
];

// Double precision array, obtained by cutting `π/2` into `24` bits chunks...
var PIO2 = [
	1.57079625129699707031e+00, // 0x3FF921FB, 0x40000000
	7.54978941586159635335e-08, // 0x3E74442D, 0x00000000
	5.39030252995776476554e-15, // 0x3CF84698, 0x80000000
	3.28200341580791294123e-22, // 0x3B78CC51, 0x60000000
	1.27065575308067607349e-29, // 0x39F01B83, 0x80000000
	1.22933308981111328932e-36, // 0x387A2520, 0x40000000
	2.73370053816464559624e-44, // 0x36E38222, 0x80000000
	2.16741683877804819444e-51  // 0x3569F31D, 0x00000000
];
var TWO24 = 1.67772160000000000000e+07;  // 0x41700000, 0x00000000
var TWON24 = 5.96046447753906250000e-08; // 0x3E700000, 0x00000000

// Arrays for storing temporary values (note that, in C, this is not thread safe):
var F = zero( new Array( 20 ) );
var Q = zero( new Array( 20 ) );
var FQ = zero( new Array( 20 ) );
var IQ = zero( new Array( 20 ) );


// FUNCTIONS //

/**
* Zeros an array.
*
* @private
* @param {Array<number>} arr - array to zero
* @returns {Array<number>} input array
*/
function zero( arr ) {
	var len = arr.length;
	var i;
	for ( i = 0; i < len; i++ ) {
		arr[ i ] = 0.0;
	}
	return arr;
}

/**
* Performs the computation for `kernelRempio2()`.
*
* @private
* @param {PositiveNumber} x - input value
* @param {(Array|TypedArray|Object)} y - output object for storing double precision numbers
* @param {integer} jz - number of terms of `ipio2[]` used
* @param {Array<integer>} q - array with integral values, representing the 24-bits chunk of the product of `x` and `2/π`
* @param {integer} q0 - the corresponding exponent of `q[0]` (the exponent for `q[i]` would be `q0-24*i`)
* @param {integer} jk - `jk+1` is the initial number of terms of `IPIO2[]` needed in the computation
* @param {integer} jv - index for pointing to the suitable `ipio2[]` for the computation
* @param {integer} jx - `nx - 1`
* @param {Array<number>} f - `IPIO2[]` in floating point
* @returns {number} last three binary digits of `N`
*/
function compute( x, y, jz, q, q0, jk, jv, jx, f ) {
	var carry;
	var fw;
	var ih;
	var jp;
	var i;
	var k;
	var n;
	var j;
	var z;

	// `jp+1` is the number of terms in `PIO2[]` needed:
	jp = jk;

	// Distill `q[]` into `IQ[]` in reverse order...
	z = q[ jz ];
	j = jz;
	for ( i = 0; j > 0; i++ ) {
		fw = ( TWON24 * z )|0;
		IQ[ i ] = ( z - (TWO24*fw) )|0;
		z = q[ j-1 ] + fw;
		j -= 1;
	}
	// Compute `n`...
	z = ldexp( z, q0 );
	z -= 8.0 * floor( z*0.125 ); // Trim off integer >= 8
	n = z|0;
	z -= n;
	ih = 0;
	if ( q0 > 0 ) {
		// Need `IQ[jz-1]` to determine `n`...
		i = ( IQ[ jz-1 ] >> (24-q0) );
		n += i;
		IQ[ jz-1 ] -= ( i << (24-q0) );
		ih = ( IQ[ jz-1 ] >> (23-q0) );
	}
	else if ( q0 === 0 ) {
		ih = ( IQ[ jz-1 ] >> 23 );
	}
	else if ( z >= 0.5 ) {
		ih = 2;
	}
	// Case: q > 0.5
	if ( ih > 0 ) {
		n += 1;
		carry = 0;

		// Compute `1-q`:
		for ( i = 0; i < jz; i++ ) {
			j = IQ[ i ];
			if ( carry === 0 ) {
				if ( j !== 0 ) {
					carry = 1;
					IQ[ i ] = 0x1000000 - j;
				}
			} else {
				IQ[ i ] = 0xffffff - j;
			}
		}
		if ( q0 > 0 ) {
			// Rare case: chance is 1 in 12...
			switch ( q0 ) { // eslint-disable-line default-case
			case 1:
				IQ[ jz-1 ] &= 0x7fffff;
				break;
			case 2:
				IQ[ jz-1 ] &= 0x3fffff;
				break;
			}
		}
		if ( ih === 2 ) {
			z = 1.0 - z;
			if ( carry !== 0 ) {
				z -= ldexp( 1.0, q0 );
			}
		}
	}
	// Check if re-computation is needed...
	if ( z === 0.0 ) {
		j = 0;
		for ( i = jz-1; i >= jk; i-- ) {
			j |= IQ[ i ];
		}
		if ( j === 0 ) {
			// Need re-computation...
			for ( k = 1; IQ[ jk-k ] === 0; k++ ) {
				// `k` is the number of terms needed...
			}
			for ( i = jz+1; i <= jz+k; i++ ) {
				// Add `q[jz+1]` to `q[jz+k]`...
				f[ jx+i ] = IPIO2[ jv+i ];
				fw = 0.0;
				for ( j = 0; j <= jx; j++ ) {
					fw += x[ j ] * f[ jx + (i-j) ];
				}
				q[ i ] = fw;
			}
			jz += k;
			return compute( x, y, jz, q, q0, jk, jv, jx, f );
		}
	}
	// Chop off zero terms...
	if ( z === 0.0 ) {
		jz -= 1;
		q0 -= 24;
		while ( IQ[ jz ] === 0 ) {
			jz -= 1;
			q0 -= 24;
		}
	} else {
		// Break `z` into 24-bit if necessary...
		z = ldexp( z, -q0 );
		if ( z >= TWO24 ) {
			fw = (TWON24*z)|0;
			IQ[ jz ] = ( z - (TWO24*fw) )|0;
			jz += 1;
			q0 += 24;
			IQ[ jz ] = fw;
		} else {
			IQ[ jz ] = z|0;
		}
	}
	// Convert integer "bit" chunk to floating-point value...
	fw = ldexp( 1.0, q0 );
	for ( i = jz; i >= 0; i-- ) {
		q[ i ] = fw * IQ[i];
		fw *= TWON24;
	}
	// Compute `PIO2[0,...,jp]*q[jz,...,0]`...
	for ( i = jz; i >= 0; i-- ) {
		fw = 0.0;
		for ( k = 0; k <= jp && k <= jz-i; k++ ) {
			fw += PIO2[ k ] * q[ i+k ];
		}
		FQ[ jz-i ] = fw;
	}
	// Compress `FQ[]` into `y[]`...
	fw = 0.0;
	for ( i = jz; i >= 0; i-- ) {
		fw += FQ[ i ];
	}
	if ( ih === 0 ) {
		y[ 0 ] = fw;
	} else {
		y[ 0 ] = -fw;
	}
	fw = FQ[ 0 ] - fw;
	for ( i = 1; i <= jz; i++ ) {
		fw += FQ[i];
	}
	if ( ih === 0 ) {
		y[ 1 ] = fw;
	} else {
		y[ 1 ] = -fw;
	}
	return ( n & 7 );
}


// MAIN //

/**
* Returns the last three binary digits of `N` with `y = x - Nπ/2` so that `|y| < π/2`.
*
* ## Method
*
* -   The method is to compute the integer (`mod 8`) and fraction parts of `2x/π` without doing the full multiplication. In general, we skip the part of the product that is known to be a huge integer (more accurately, equals `0 mod 8` ). Thus, the number of operations is independent of the exponent of the input.
*
* @private
* @param {PositiveNumber} x - input value
* @param {(Array|TypedArray|Object)} y - remainder elements
* @param {PositiveInteger} e0 - the exponent of `x[0]` (must be <= 16360)
* @param {PositiveInteger} nx - dimension of `x[]`
* @returns {number} last three binary digits of `N`
*/
function kernelRempio2( x, y, e0, nx ) {
	var fw;
	var jk;
	var jv;
	var jx;
	var jz;
	var q0;
	var i;
	var j;
	var m;

	// Initialize `jk` for double-precision floating-point numbers:
	jk = 4;

	// Determine `jx`, `jv`, `q0` (note that `q0 < 3`):
	jx = nx - 1;
	jv = ( (e0 - 3) / 24 )|0;
	if ( jv < 0 ) {
		jv = 0;
	}
	q0 = e0 - (24 * (jv + 1));

	// Set up `F[0]` to `F[jx+jk]` where `F[jx+jk] = IPIO2[jv+jk]`:
	j = jv - jx;
	m = jx + jk;
	for ( i = 0; i <= m; i++ ) {
		if ( j < 0 ) {
			F[ i ] = 0.0;
		} else {
			F[ i ] = IPIO2[ j ];
		}
		j += 1;
	}
	// Compute `Q[0],Q[1],...,Q[jk]`:
	for ( i = 0; i <= jk; i++ ) {
		fw = 0.0;
		for ( j = 0; j <= jx; j++ ) {
			fw += x[ j ] * F[ jx + (i-j) ];
		}
		Q[ i ] = fw;
	}
	jz = jk;
	return compute( x, y, jz, Q, q0, jk, jv, jx, F );
}


// EXPORTS //

module.exports = kernelRempio2;

},{"@stdlib/math/base/special/floor":48,"@stdlib/math/base/special/ldexp":53}],57:[function(require,module,exports){
'use strict';

/*
* The following copyright, license, and long comment were part of the original implementation available as part of [FreeBSD]{@link https://svnweb.freebsd.org/base/release/9.3.0/lib/msun/src/e_rem_pio2.c?view=co}.
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
*
* Optimized by Bruce D. Evans.
*/

// MODULES //

var getHighWord = require( '@stdlib/number/float64/base/get-high-word' );
var getLowWord = require( '@stdlib/number/float64/base/get-low-word' );
var fromWords = require( '@stdlib/number/float64/base/from-words' );
var rempio2Kernel = require( './kernel_rempio2.js' );
var rempio2Medium = require( './rempio2_medium.js' );


// VARIABLES //

var ZERO = 0.00000000000000000000e+00;    // 0x00000000, 0x00000000
var TWO24 = 1.67772160000000000000e+07;   // 0x41700000, 0x00000000

// 33 bits of π/2:
var PIO2_1 = 1.57079632673412561417e+00;  // 0x3FF921FB, 0x54400000

// PIO2_1T = π/2 - PIO2_1:
var PIO2_1T = 6.07710050650619224932e-11; // 0x3DD0B461, 0x1A626331
var TWO_PIO2_1T = 2.0 * PIO2_1T;
var THREE_PIO2_1T = 3.0 * PIO2_1T;
var FOUR_PIO2_1T = 4.0 * PIO2_1T;

// Absolute value mask: 0x7fffffff = 2147483647 => 01111111111111111111111111111111
var ABS_MASK = 0x7fffffff|0; // asm type annotation

// Exponent mask: 0x7ff00000 = 2146435072 => 01111111111100000000000000000000
var EXPONENT_MASK = 0x7ff00000|0; // asm type annotation

// High word significand mask: 0xfffff = 1048575 => 00000000000011111111111111111111
var SIGNIFICAND_MASK = 0xfffff|0; // asm type annotation

// High word significand for π and π/2: 0x921fb = 598523 => 00000000000010010010000111111011
var PI_HIGH_WORD_SIGNIFICAND = 0x921fb|0; // asm type annotation

// High word for π/4: 0x3fe921fb = 1072243195 => 00111111111010010010000111111011
var PIO4_HIGH_WORD = 0x3fe921fb|0; // asm type annotation

// High word for 3π/4: 0x4002d97c = 1073928572 => 01000000000000101101100101111100
var THREE_PIO4_HIGH_WORD = 0x4002d97c|0; // asm type annotation

// High word for 5π/4: 0x400f6a7a = 1074752122 => 01000000000011110110101001111010
var FIVE_PIO4_HIGH_WORD = 0x400f6a7a|0; // asm type annotation

// High word for 6π/4: 0x4012d97c = 1074977148 => 01000000000100101101100101111100
var THREE_PIO2_HIGH_WORD = 0x4012d97c|0; // asm type annotation

// High word for 7π/4: 0x4015fdbc = 1075183036 => 01000000000101011111110110111100
var SEVEN_PIO4_HIGH_WORD = 0x4015fdbc|0; // asm type annotation

// High word for 8π/4: 0x401921fb = 1075388923 => 01000000000110010010000111111011
var TWO_PI_HIGH_WORD = 0x401921fb|0; // asm type annotation

// High word for 9π/4: 0x401c463b = 1075594811 => 01000000000111000100011000111011
var NINE_PIO4_HIGH_WORD = 0x401c463b|0; // asm type annotation

// 2^20*π/2 = 1647099.3291652855 => 0100000100111001001000011111101101010100010001000010110100011000 => high word => 0x413921fb = 1094263291 => 01000001001110010010000111111011
var MEDIUM = 0x413921fb|0; // asm type annotation

// Arrays for storing temporary values:
var TX = new Array( 3 ); // WARNING: not thread safe
var TY = new Array( 2 ); // WARNING: not thread safe


// MAIN //

/**
* Computes `x - nπ/2 = r`.
*
* ## Notes
*
* -   Returns `n` and stores the remainder `r` as two numbers `y[0]` and `y[1]`, such that `y[0]+y[1] = r`.
*
*
* @param {number} x - input value
* @param {(Array|TypedArray|Object)} y - remainder elements
* @returns {integer} factor of `π/2`
*
* @example
* var y = new Array( 2 );
* var n = rempio2( 128.0, y );
* // returns 81
*
* var y1 = y[ 0 ];
* // returns ~0.765
*
* var y2 = y[ 1 ];
* // returns ~3.618e-17
*
* @example
* var y = new Array( 2 );
* var n = rempio2( NaN, y );
* // returns 0
*
* var y1 = y[ 0 ];
* // returns NaN
*
* var y2 = y[ 1 ];
* // returns NaN
*/
function rempio2( x, y ) {
	var low;
	var e0;
	var hx;
	var ix;
	var nx;
	var i;
	var n;
	var z;

	hx = getHighWord( x );
	ix = (hx & ABS_MASK)|0; // asm type annotation

	// Case: |x| ~<= π/4 (no need for reduction)
	if ( ix <= PIO4_HIGH_WORD ) {
		y[ 0 ] = x;
		y[ 1 ] = 0.0;
		return 0;
	}
	// Case: |x| ~<= 5π/4
	if ( ix <= FIVE_PIO4_HIGH_WORD ) {
		// Case: |x| ~= π/2 or π
		if ( (ix & SIGNIFICAND_MASK) === PI_HIGH_WORD_SIGNIFICAND ) {
			// Cancellation => use medium case
			return rempio2Medium( x, ix, y );
		}
		// Case: |x| ~<= 3π/4
		if ( ix <= THREE_PIO4_HIGH_WORD ) {
			if ( x > 0.0 ) {
				z = x - PIO2_1;
				y[ 0 ] = z - PIO2_1T;
				y[ 1 ] = (z - y[0]) - PIO2_1T;
				return 1;
			}
			z = x + PIO2_1;
			y[ 0 ] = z + PIO2_1T;
			y[ 1 ] = (z - y[0]) + PIO2_1T;
			return -1;
		}
		if ( x > 0.0 ) {
			z = x - ( 2.0*PIO2_1 );
			y[ 0 ] = z - TWO_PIO2_1T;
			y[ 1 ] = (z - y[0]) - TWO_PIO2_1T;
			return 2;
		}
		z = x + ( 2.0*PIO2_1 );
		y[ 0 ] = z + TWO_PIO2_1T;
		y[ 1 ] = (z - y[0]) + TWO_PIO2_1T;
		return -2;
	}
	// Case: |x| ~<= 9π/4
	if ( ix <= NINE_PIO4_HIGH_WORD ) {
		// Case: |x| ~<= 7π/4
		if ( ix <= SEVEN_PIO4_HIGH_WORD ) {
			// Case: |x| ~= 3π/2
			if ( ix === THREE_PIO2_HIGH_WORD ) {
				return rempio2Medium( x, ix, y );
			}
			if ( x > 0.0 ) {
				z = x - ( 3.0*PIO2_1 );
				y[ 0 ] = z - THREE_PIO2_1T;
				y[ 1 ] = (z - y[0]) - THREE_PIO2_1T;
				return 3;
			}
			z = x + ( 3.0*PIO2_1 );
			y[ 0 ] = z + THREE_PIO2_1T;
			y[ 1 ] = (z - y[0]) + THREE_PIO2_1T;
			return -3;
		}
		// Case: |x| ~= 4π/2
		if ( ix === TWO_PI_HIGH_WORD ) {
			return rempio2Medium( x, ix, y );
		}
		if ( x > 0.0 ) {
			z = x - ( 4.0*PIO2_1 );
			y[ 0 ] = z - FOUR_PIO2_1T;
			y[ 1 ] = (z - y[0]) - FOUR_PIO2_1T;
			return 4;
		}
		z = x + ( 4.0*PIO2_1 );
		y[ 0 ] = z + FOUR_PIO2_1T;
		y[ 1 ] = (z - y[0]) + FOUR_PIO2_1T;
		return -4;
	}
	// Case: |x| ~< 2^20*π/2 (medium size)
	if ( ix < MEDIUM ) {
		return rempio2Medium( x, ix, y );
	}
	// Case: x is NaN or infinity
	if ( ix >= EXPONENT_MASK ) {
		y[ 0 ] = NaN;
		y[ 1 ] = NaN;
		return 0.0;
	}
	// Set z = scalbn(|x|, ilogb(x)-23)...
	low = getLowWord( x );
	e0 = (ix >> 20) - 1046; // `e0 = ilogb(z) - 23` => unbiased exponent minus 23
	z = fromWords( ix - ((e0 << 20)|0), low );
	for ( i = 0; i < 2; i++ ) {
		TX[ i ] = z|0;
		z = (z - TX[i]) * TWO24;
	}
	TX[ 2 ] = z;
	nx = 3;
	while ( TX[ nx-1 ] === ZERO ) {
		// Skip zero term...
		nx -= 1;
	}
	n = rempio2Kernel( TX, TY, e0, nx, 1 );
	if ( x < 0.0 ) {
		y[ 0 ] = -TY[ 0 ];
		y[ 1 ] = -TY[ 1 ];
		return -n;
	}
	y[ 0 ] = TY[ 0 ];
	y[ 1 ] = TY[ 1 ];
	return n;
}


// EXPORTS //

module.exports = rempio2;

},{"./kernel_rempio2.js":56,"./rempio2_medium.js":58,"@stdlib/number/float64/base/from-words":80,"@stdlib/number/float64/base/get-high-word":84,"@stdlib/number/float64/base/get-low-word":86}],58:[function(require,module,exports){
'use strict';

/*
* The following copyright and license were part of the original implementation available as part of [FreeBSD]{@link https://svnweb.freebsd.org/base/release/9.3.0/lib/msun/src/k_rem_pio2.c?view=co}.
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

var round = require( '@stdlib/math/base/special/round' );
var getHighWord = require( '@stdlib/number/float64/base/get-high-word' );


// VARIABLES //

// 53 bits of 2/π:
var INVPIO2 = 6.36619772367581382433e-01; // 0x3FE45F30, 0x6DC9C883

// First 33 bits of π/2:
var PIO2_1 = 1.57079632673412561417e+00;  // 0x3FF921FB, 0x54400000

// PIO2_1T = π/2 - PIO2_1:
var PIO2_1T = 6.07710050650619224932e-11; // 0x3DD0B461, 0x1A626331

// Another 33 bits of π/2:
var PIO2_2 = 6.07710050630396597660e-11;  // 0x3DD0B461, 0x1A600000

// PIO2_2T = π/2 - ( PIO2_1 + PIO2_2 ):
var PIO2_2T = 2.02226624879595063154e-21; // 0x3BA3198A, 0x2E037073

// Another 33 bits of π/2:
var PIO2_3 = 2.02226624871116645580e-21;  // 0x3BA3198A, 0x2E000000

// PIO2_3T = π/2 - ( PIO2_1 + PIO2_2 + PIO2_3 ):
var PIO2_3T = 8.47842766036889956997e-32; // 0x397B839A, 0x252049C1

// Exponent mask (2047 => 0x7ff):
var EXPONENT_MASK = 0x7ff|0; // asm type annotation


// MAIN //

/**
* Computes `x - nπ/2 = r` for medium-sized inputs.
*
* @private
* @param {number} x - input value
* @param {uint32} ix - high word of `x`
* @param {(Array|TypedArray|Object)} y - remainder elements
* @returns {integer} factor of `π/2`
*/
function rempio2Medium( x, ix, y ) {
	var high;
	var n;
	var t;
	var r;
	var w;
	var i;
	var j;

	n = round( x * INVPIO2 );
	r = x - ( n * PIO2_1 );
	w = n * PIO2_1T;

	// First rounding (good to 85 bits)...
	j = (ix >> 20)|0; // asm type annotation
	y[ 0 ] = r - w;
	high = getHighWord( y[0] );
	i = j - ( (high >> 20) & EXPONENT_MASK );

	// Check if a second iteration is needed (good to 118 bits)...
	if ( i > 16 ) {
		t = r;
		w = n * PIO2_2;
		r = t - w;
		w = (n * PIO2_2T) - ((t-r) - w);
		y[ 0 ] = r - w;
		high = getHighWord( y[0] );
		i = j - ( (high >> 20) & EXPONENT_MASK );

		// Check if a third iteration is needed (151 bits accumulated)...
		if ( i > 49 ) {
			t = r;
			w = n * PIO2_3;
			r = t - w;
			w = (n * PIO2_3T) - ((t-r) - w);
			y[ 0 ] = r - w;
		}
	}
	y[ 1 ] = (r - y[0]) - w;
	return n;
}


// EXPORTS //

module.exports = rempio2Medium;

},{"@stdlib/math/base/special/round":59,"@stdlib/number/float64/base/get-high-word":84}],59:[function(require,module,exports){
'use strict';

// TODO: implementation

/**
* Round a numeric value to the nearest integer.
*
* @module @stdlib/math/base/special/round
*
* @example
* var round = require( '@stdlib/math/base/special/round' );
*
* var v = round( -4.2 );
* // returns -4.0
*
* v = round( -4.5 );
* // returns -4.0
*
* v = round( -4.6 );
* // returns -5.0
*
* v = round( 9.99999 );
* // returns 10.0
*
* v = round( 9.5 );
* // returns 10.0
*
* v = round( 9.2 );
* // returns 9.0
*
* v = round( 0.0 );
* // returns 0.0
*
* v = round( -0.0 );
* // returns -0.0
*
* v = round( Infinity );
* // returns Infinity
*
* v = round( -Infinity );
* // returns -Infinity
*
* v = round( NaN );
* // returns NaN
*/

// MODULES //

var round = require( './round.js' );


// EXPORTS //

module.exports = round;

},{"./round.js":60}],60:[function(require,module,exports){
'use strict';

// TODO: implementation

/**
* Rounds a numeric value to the nearest integer.
*
* @param {number} x - input value
* @returns {number} function value
*
* @example
* var v = round( -4.2 );
* // returns -4.0
*
* @example
* var v = round( -4.5 );
* // returns -4.0
*
* @example
* var v = round( -4.6 );
* // returns -5.0
*
* @example
* var v = round( 9.99999 );
* // returns 10.0
*
* @example
* var v = round( 9.5 );
* // returns 10.0
*
* @example
* var v = round( 9.2 );
* // returns 9.0
*
* @example
* var v = round( 0.0 );
* // returns 0.0
*
* @example
* var v = round( -0.0 );
* // returns -0.0
*
* @example
* var v = round( Infinity );
* // returns Infinity
*
* @example
* var v = round( -Infinity );
* // returns -Infinity
*
* @example
* var v = round( NaN );
* // returns NaN
*/
var round = Math.round;


// EXPORTS //

module.exports = round;

},{}],61:[function(require,module,exports){
'use strict';

/**
* Evaluate the tangent of a number.
*
* @module @stdlib/math/base/special/tan
*
* @example
* var v = tan( 0.0 );
* // returns ~0.0
*
* v = tan( -Math.PI/4.0 );
* // returns ~-1.0
*
* v = tan( Math.PI/4.0 );
* // returns ~1.0
*
* v = tan( NaN );
* // returns NaN
*/

// MODULES //

var tan = require( './tan.js' );


// EXPORTS //

module.exports = tan;

},{"./tan.js":62}],62:[function(require,module,exports){
'use strict';

/*
* The following copyright, license, and long comment were part of the original implementation available as part of [FreeBSD]{@link https://svnweb.freebsd.org/base/release/9.3.0/lib/msun/src/s_tan.c?view=markup}.
*
* The implementation follows the original, but has been modified for JavaScript.
*/

/*
* ====================================================
* Copyright (C) 1993 by Sun Microsystems, Inc. All rights reserved.
*
* Developed at SunPro, a Sun Microsystems, Inc. business.
* Permission to use, copy, modify, and distribute this
* software is freely granted, provided that this notice
* is preserved.
* ====================================================
*/

// MODULES //

var getHighWord = require( '@stdlib/number/float64/base/get-high-word' );
var kernelTan = require( '@stdlib/math/base/special/kernel-tan' );
var rempio2 = require( '@stdlib/math/base/special/rempio2' );


// VARIABLES //

// Scratch buffer:
var buffer = new Array( 2 ); // WARNING: not thread safe

// High word absolute value mask: 0x7fffffff => 01111111111111111111111111111111
var HIGH_WORD_ABS_MASK = 0x7fffffff|0; // asm type annotation

// High word for pi/4: 0x3fe921fb => 00111111111010010010000111111011
var HIGH_WORD_PIO4 = 0x3fe921fb|0; // asm type annotation

// High word exponent mask: 0x7ff00000 => 01111111111100000000000000000000
var HIGH_WORD_EXPONENT_MASK = 0x7ff00000|0; // asm type annotation

// High word for a small value: 2^-27 = 7.450580596923828e-9 => high word => 0x3e400000 => 00111110010000000000000000000000
var HIGH_WORD_TWO_NEG_27 = 0x3e400000|0; // asm type annotation


// MAIN //

/**
* Evaluates the tangent of a number.
*
* ## Method
*
* -   Let \\(S\\), \\(C\\), and \\(T\\) denote the \\(\sin\\), \\(\cos\\), and \\(\tan\\), respectively, on \\(\[-\pi/4, +\pi/4\]\\).
*
* -   Reduce the argument \\(x\\) to \\(y1+y2 = x-k\pi/2\\) in \\(\[-\pi/4, +\pi/4\]\\), and let \\(n = k \mod 4\\).
*
* -   We have
*
*     | n | sin(x) | cos(x) | tan(x) |
*     | - | ------ | ------ | ------ |
*     | 0 |    S   |    C   |   T    |
*     | 1 |    C   |   -S   |  -1/T  |
*     | 2 |   -S   |   -C   |   T    |
*     | 3 |   -C   |    S   |  -1/T  |
*
*
* @param {number} x - input value (in radians)
* @returns {number} tangent
*
* @example
* var v = tan( 0.0 );
* // returns ~0.0
*
* @example
* var v = tan( -Math.PI/4.0 );
* // returns ~-1.0
*
* @example
* var v = tan( Math.PI/4.0 );
* // returns ~1.0
*
* @example
* var v = tan( NaN );
* // returns NaN
*/
function tan( x ) {
	var ix;
	var n;

	ix = getHighWord( x );
	ix &= HIGH_WORD_ABS_MASK;

	// Case: |x| ~< π/4
	if ( ix <= HIGH_WORD_PIO4 ) {
		// Case: |x| < 2**-27
		if ( ix < HIGH_WORD_TWO_NEG_27 ) {
			return x;
		}
		return kernelTan( x, 0.0, 1 );
	}
	// Case: tan(Inf or NaN) is NaN
	if ( ix >= HIGH_WORD_EXPONENT_MASK ) {
		return NaN;
	}
	// Argument reduction needed...
	n = rempio2( x, buffer );
	return kernelTan( buffer[ 0 ], buffer[ 1 ], 1-((n&1)<<1) );
}


// EXPORTS //

module.exports = tan;

},{"@stdlib/math/base/special/kernel-tan":49,"@stdlib/math/base/special/rempio2":55,"@stdlib/number/float64/base/get-high-word":84}],63:[function(require,module,exports){
module.exports={"expected":[11.111731272046756,27.204844503148987,-0.02353565428442732,96.88636682534987,-23.41014415760814,-10.417166276562591,0.10934514305079217,-8.147733711091817,-5.651404817406122,0.19060379701080965,-4.894058548145447,-3.84302191090987,-3.148028254029269,0.3322646200661146,-2.881853745212285,-2.453600454157994,-2.1240115493479403,0.48704768147158206,-1.986103316655083,-1.7487496900299841,-1.5517043405588358,-1.6462437568600976,-1.4651950235247642,-1.310266859743978,0.7843224992195071,-1.2408734725376434,-1.114435159230334,-1.0021154135171726,1.024607723268922,-0.9505164401138799,-0.8543647305315792,-0.7665527734350179,-0.8096574450066961,-0.7254305936512919,-0.6474475705404803,-0.574644706472309,-0.6105739218855271,-0.5400172416023381,-0.4733913910263946,-0.5063642015226586,-0.4414420978665315,-0.3794917884712575,-0.3199871354660267,-0.3495593851562931,-0.2910987756842289,-0.2344166693678054,-0.17912731453324982,-0.2067093676676892,-0.151981109924711,-0.09812848248367709,11.79141495108517,-0.0715162619640068,-0.01838520620276701,0.03464228735722771,0.008037651861075362,0.06112500954588302,0.11455785184041754,0.16864425927407564,0.14141272702205504,0.19594429174221437,0.2516217054502445,-3.763415553151926,0.2799097417498449,0.33799099824028733,0.3981935853209429,-2.417909978483241,0.4291361342094548,0.4934331503761497,0.5611875633104395,0.5267283678153921,0.5964600503175941,0.6707498602281682,-1.4491159089145849,0.7097576078011723,0.7926714198843426,0.8828662086217689,-1.1029588691221737,0.9310147529086767,1.0352166144088422,1.151531441640656,-0.845497624386027,1.2149300432906556,1.355366024091134,-0.7176023605115164,1.433124344888896,1.6085016036591104,1.816608954741218,-0.5333861395704436,1.9359763164757624,2.216754604122038,2.5723903661698344,-0.37361363635036804,2.788370414072258,3.3348357493935086,-0.2855226594120393,-0.2289920947339632,4.6483478260411495,6.240648335891322,-0.14671809255098361,7.504761364782111,12.55895187161891,37.80513412395361,-0.013235733019919881,40562.60472745974,-18.85491607216599,0.0662940917097967,0.11977671284726606,-7.507588730641308,-5.330898344480281,0.20129557195556935,0.25710297808235794,-3.6868352943387057,-3.0392173000617264,0.3437373395447041,0.4041703502331748,-2.3830971235784832,0.43524593798377315,0.4998511439499178,-1.936210446290774,-1.7077034281269263,0.6034613241203491,0.6782401579240376,-1.4332749299520302,-1.2826651426863491,0.8010887611016873,0.8920690522128611,-1.091612174207448,0.9406716777131112,1.045939192108951,1.163577743813191,-0.8367073773110093,1.2277575527988622,1.370074243086787,-0.7098317553318658,-0.6329313677802607,1.6271239082478646,1.8389556460882948,-0.5267913556812018,1.9606661687200553,2.247552662577644,2.612131653583432,-0.36775805342754797,2.8342040458364757,3.398328061323708,4.210652868826147,-0.22358029512095492,4.767587852283859,6.453124029408631,-0.1414630198806566,7.811724673304424,13.432601781972542,46.94766759026402,-0.008086961564311086,-195.1765432671278,-17.18193050867061,-8.960041154815249,0.1250020141101401,-7.223256437318884,-5.183491079321558,-4.023731696248269,-4.53574486860007,-3.6131079697598487,-2.9873276763646865,0.34950405476364627,-2.744254630197887,-2.349128133135403,-2.041587521305299,0.5063022541528652,-1.9120033040444262,-1.6877174145302132,-1.500300522241958,-1.5903591866427107,-1.4176660139537758,-1.2691362535457889,-1.1393489240039916,-1.2023825844433265,-1.080392300252054,-0.9716303511034508,-1.0247087978701916,-0.9215411344411502,-0.8279925343564624,-0.7423179869099756,-0.7844021402711056,-0.702117736702002,-0.6257441786255605,-0.5542792704593955,-0.5895680856563471,-0.5202322456522084,-0.45462149735945795,2.279071786701906,-0.4231113998437827,-0.36192460134902926,-0.3030436070462225,-0.33231937088784536,-0.27441916840853553,-0.21818093958686227,-0.16322994416687484,-0.1906548952849246,-0.13621559599798583,-0.082557599647421,14.436061308170416,-0.056008640658613204,-0.002938618813200392,0.050114855524339086,-15.780864384130489,0.07664312288865324,0.13023404506283542,0.18457078909753208,0.1572018442837744,0.21203176027287565,0.26810946220581605,-3.542073372713094,0.2966379842666136,0.35529155976725924,0.416199129231162,-2.3159709551213736,0.44754838581029693,0.5127870825990954,0.5816752566470467,-1.6680757158709658,0.6175955719867571,0.6933791855432687,-1.4022832891166872,0.7332416992688183,0.8181339192421554,0.9107311775540118,-1.0692965479896277,0.9602693946309097,1.0677351317713728,1.1881092261505288,-0.8193516733539735,1.2539059804525776,1.4001228571385866,-0.6944592842800754,-0.6186031473879555,1.6653214662180407,1.884944154028842,-0.5137081759145301,-0.448423744913697,2.311339330251316,2.6949117148374833,-0.35611284740579796,2.930007121275619,3.5322229469627886,-0.26889106667251517,-0.21279370002630263,5.024541769642382,6.923456533213604,-0.1309755266577787,-0.07737649231926044,15.600650251736598,90.89928897760163,0.0022095681652402293,0.05527733761202983,-14.590347214955191,0.08182362890966774,0.13547309659957224,-6.713628228688413,-4.911075886975822,0.21741731042242546,0.2736353778586138,-3.473583064553387,-2.888191189795242,0.36110027564180236,0.42225210282106823,-2.2835951354875617,0.45374206320070576,0.5193062408018384,0.5885860523878612,-1.6487684957814146,0.6247301331756036,0.7010298503849645,-1.3871210762319044,-1.242601309575306,0.8267644165880668,0.9201938601478848,-1.0583222905635292,0.9702140413267928,1.078813520835176,1.2006011010760542,-0.810783403957043,1.267234687838161,1.4154740139100324,1.587789186705869,-0.6115074559172797,1.6849152093714863,1.9086137684954403,-0.5072185233458841,2.0378253536353044,2.344384042905947,2.7380476063191623,-0.3503223643938468,2.9801082555509955,3.602888477474125,4.520069010967897,4.011235749816719,5.163250095843041,7.184692187387239,11.69698285050224,8.901167180135996,16.9686451506461,170.86323042547937,0.007357872269808061,-48.612248313860604,-13.566184245634066,-7.857201313214922,-9.966620857514833,-6.4843595469755995,-4.7849483760401395,-3.7737490777942546,-4.224349651242674,-3.4074993135060487,-2.8408029431020165,-2.42257133173444,-2.617846030999488,-2.2519717197334956,-1.9642028769849242,-2.100537112367671,-1.8421544373245635,-1.6297862849436713,-1.4512251357815658,-1.5371543214990264,-1.372173880805223,-1.2295871919138401,-1.1044666543237902,-1.165295311604694,-1.0474669710723628,-0.9420467725619466,1.0900156552531348,-0.8933791155412384,-0.8022863667143225,-0.7186326363929537,-0.7597514803153018,-0.6793050986184695,-0.6044563011964207,-0.53425958202324,-0.568941368900665,-0.5007626750110126,-0.4361133688944737,2.3782361605501654,-0.40501873845953845,-0.34455273047755375,-0.28625795603351806,3.676225025349629,-0.25788036105938855,-0.2020542700843986,-0.14741253340427798,-0.174694699964592,-0.12051628257144807,9.334049825397134,18.598529784808473,-0.04052782731242774,0.012506566424136204,-38.87738927672028,-12.675740665157445,0.09219802079579167,0.14597343270154284,-6.269903682793269,-4.664885511158997,0.22822494763446388,0.2847343434451149,-3.343694146276206,-2.794780830358655,0.3727830512313278,-0.41745376266474,-2.2210731616588504,2.9267527312106445,0.5324500435425418,-0.2692555430315251,-1.611119964073946,5.0156367508480475,-0.1856763371363183,-0.13132124202776707,8.481360444638888,15.51803087057225,-0.05118651334782702,0.0018696971046871433,-66.3079623410511,-14.663400192437877,0.08148149330430668,-0.7938592321745093,-6.729322787948706,0.1621327395613703,0.21706140132917448,-4.3302282554623295,-3.478028975166434,0.3018769047953294,0.36071613636645095,-2.6615729490285474,-2.285709000343022,0.4533322837406104,-0.3388035290560897,-1.8665128458883693,3.752391061628552,0.6242577168658969,-1.555766958532252,-1.3881153594982765,0.7406613744561421,0.826192393364372,-1.1783190642899461,-1.0590430891585159,0.969554464660407,0.017655923634571337,-0.9032960337698833,-11.894393951120609,1.2663494083069826,0.15123530695591714,-0.6873557250964659,-4.550454224701451,1.6836112171361963,-0.5762286890215256,-0.5076459051587188,2.0360753083947114,0.37865798041311244,-0.41142133856563734,-2.1908732386975664,2.9767533860822892,0.5390759629027597,-0.2637417273028915,-1.5927607478441659,5.153866056918712,0.7243184758237832,-0.12608777736987362,-1.2040463991518782,0.8531043105833422,-0.04602616415200683,-1.0261032540246953,-49.4292497527715,1.1128019901874016,0.08666606879925261,-0.7855007000216285,-6.499022202561871,1.4629033124180475,0.2224582143264629,-0.5904844632622995,1.7457948973514137,1.9825036836995138,-0.48794998872741524,-0.4239130589563629,2.44849157739492,2.8750841368935656,-0.33307434863276036,-1.8436486013508513,3.831557838350903,0.6314352541950226,-0.1913594340251948,5.627489761887217,8.09889663626341,-0.1100829645180104,-0.05669053833140171,23.01658937091046,-104.25081125345588,0.02280621704808875,0.07595942621239289,-11.203217157610421,-6.993073440485105,0.15650538130852426,-5.8799978187086825,-4.44126171506296,0.23908349967516093,0.29589858091415444,-3.222451453646885,-2.7065962393641554,0.3845558596812411,0.446732743051201,-2.161346973286907,3.028310410616265,0.5457387622029879,-0.2582428645950131,-1.5747001696812861,5.299630640571034,0.7321970231673397,-1.3285700701389083,-1.191512355584572,0.8620385777173037,0.9589637080447344,-1.0155900717053457,-39.398308648700876,1.1243917948701514,0.0918552728258985,-0.7772094982395035,-6.283633661668983,1.4791918423616341,0.227867403047623,-0.5835622462117454,-3.3478385672427393,2.0081477953260283,-0.4815919736027251,-2.580554953441317,2.4849636953105416,0.4658032893055113,-0.3273647826871919,-1.8212143083063979,3.913910703764775,0.6386596087313602,-0.1860279462264044,-1.358402956374559,8.45664381663838,0.8436662318638362,-1.1540208303989579,-1.037433512082619,0.9897318943290027,1.100592387657968,-0.8847700905484233,-10.587422097663046,1.2935125390039728,0.1617839549620834,-0.6723007990281106,-4.336950872921327,1.7237909900507564,-0.5625939580364968,-0.49476302328261107,2.0901926701500404,2.4106107373128673,-0.3994325137858287,-0.33918245524634383,3.0815004853162455,3.74727220631341,-0.2527586038529482,4.1884765821612895,5.453572309705109,-0.16974377422897063,-0.11564092822007038,9.777693846485604,20.430388956182206,-0.035712525616503836,0.017315950070054157,-32.75036530152755,-11.94301397532237,0.09704938703225957,-0.7689843823042559,-6.081743878861922,1.4957303569998572,0.2332892978386466,-4.044285954385187,-3.2860538585787347,0.3188091743584689,0.3782694296153455,-2.5416403655394317,-2.192845926286703,0.4720835935495998,-0.3216744295502708,-1.7991967959523938,3.999650583352439,0.6459316267670979,-0.18070666072569233,-1.3438566654481758,8.846959144792637,0.8525172584335807,-1.1420872939680233,-1.0268012117326664,0.9999753470547541,0.03311070612337472,-0.875633367652333,-10.035286701861555,1.3073668916042211,0.16707132898774135,-0.6648514263174342,-4.237196317071422,1.7444199888078422,0.30713105630668913,-0.4883708495101318,-2.623193620326792,0.39642227144358483,0.45914145196771855,-2.1042212964202753,3.1364054053533605,0.5591776718474487,-0.24728859742773876,-1.5394425695396416,5.616407877442562,0.7481340866987258,-0.11042696567344654,-1.1668993486165238,0.8801476265079,0.9789265132398983,-0.9948895588739189,-0.8946021154651972,1.1479792851627295,1.278945301626465,-0.7608241344037425,-5.89211267983399,1.5125255528605923,0.23872423194960232,-0.5698414841491347,1.8100488279466502,2.0610617484422673,-0.46896972592239344,-0.40581020031726045,2.5607830622246803,3.0248572646400733,-0.31600289228175393,-0.25860543176930617,4.08899565158922,0.6532521708854113,-0.17539526699486227,6.180116265473862,9.274525804141174,-0.09447657175488855,-0.04120870193608061,35.736758332860596,-39.933367880018665,0.03826544930451672,0.09151254625571162,-9.537399533007491,1.3214090045153781,0.17236780639596128,-0.6574528751057052,-4.141700947114438,1.7654228692582774,0.31277382792480546,-3.054951045330928,-2.5831603899250264,0.4023917207299969,0.4653897426801115,-2.0765775220641114,3.193112514366631,0.5659551468958428,-0.24183250098261266,-1.5222300825907928,5.788940449140682,0.756194836262199,-0.10521892805849045,-1.154813637206829,25.886274156465383,0.9890593250560737,0.027617587932007696,-24.48366071563615,1.159983063918783,0.10745347791022027,-0.7527275626828704,-5.713647284161707,1.5295843636049329,0.24417254162117366,-0.5630414860758551,-3.168547576392079,2.088369237470583,0.3900854998395866,-2.4667865088784113,-2.1343573305977,0.4847365679111424,0.5519955955165022,-1.7563620450888322,4.182183223721013,0.660622120399493,-0.17009345670593468,-1.3153589259788516,0.7813070578910231,0.8704549353826752,-1.1186357085541476,-1.0058697607998233,1.0207825068954979,1.1353382990677896,-0.8576043676515346,-0.7695253708468303,1.3356434803680217,1.4946306868078771,-0.6501042388807978,1.5836071637814841,1.7868110328379636,-0.542434617947975,-0.4756821136626337,2.175886032148787,2.519880976968502,-0.38163226691125457,-0.3220495080350037,3.2517151831758064,3.9938815913360215,-0.2363899734008697,-1.5052852786783095,5.97207281085689,0.7643185930425063,-0.10001652967503133,11.5352351413295,0.8985879082902467,-0.02025559958896655,-0.9746088613711428,-21.738441087423293,1.172131073495293,0.11266402339936783,-0.7446935005137919,-5.545381039744846,1.546913970671455,0.24963456617269156,-0.5562807958499425,-0.09205150622233209,-1.1248324886801924,39.09836872475423,1.0151948590826487,0.040673348368512593,-0.8623778231387113,-9.321264299388979,1.328032154026896,0.17484441907570394,-0.654014968621323,-0.16480092365679994,-1.301397954003344,-0.5459913314185393,-3.0302906674289978,2.1602438463972016,0.40518786199991386,-0.38477924077888,-2.063869662775145,3.220237613582704,0.5691336931856799,-0.2392892201523902,0.1829892935303298,-0.6428046285778933,-3.9624230986710396,1.8085963447729634,0.32411436575392527,-0.46938441009330223,-0.023000907195207813,-0.979973688217752,-23.120334243353206,1.1656379309434883,0.109886022594702,0.5796296396599415,-0.2309606766953966,-1.4886010840482697,6.166823390344867,0.7725065344070309,-0.09481948603851027,-1.1310676408748805,35.30757827452745,1.0096382560801833,0.037925086422237804,-0.8671739239272345,1.1844265847879794,0.11788061682954319,-0.7367208057900136,-5.386455735745939,1.5645218144984891,0.2551106480917134,-0.5495587183312839,-3.058466475348231,2.1447860144637114,0.40199687368524933,1.0257038662706555,0.045831165608269074,-0.8534405731407576,-8.889526180435482,1.3423580796243757,4.381144017962455,0.6755138392477216,-0.1595173636978889,-1.2876228107685832,10.843295722828925,0.8887170648718419,2.1897451232956677,0.4111938312658989,-0.3788804852821459,-2.037076978160009,3.279759300579508,0.5759695190812922,-0.23385291315123954,-1.4974618928458663,6.061506885499982,0.7681342293023803,-1.2668561706330241,11.86673372238483,0.9029427348788888,-0.017850573035857076,-0.9699320437359717,-20.65647518510814,1.1778544097052837,0.1150993567171188,-0.7409627529487653,-5.470050345466948,1.555101588808985,6.374345386344663,0.7807598632606442,-0.08962751381683717,-1.1194011637129218,-0.4535668823345257,-2.4142556487280937,2.660000719046401,0.494097911236642,-0.3020892380874768,-1.7259155225338891,4.326388206077969,-5.236106810653927,1.5824156063613577,0.2606011331252005,-0.5428745703681351,-3.005987007007537,2.173938496629525,0.4079894562218256,-0.38202168677750653,-2.0512872902593347,-0.844581514785913,-8.495575889782158,-1.694935515167793,4.487508417193119,0.6830374550031029,-0.15424247465982252,-1.2740290947719453,11.489849587470074,0.8979737949550581,-0.02059561103105909,-0.9752717800314699,-21.900587678439987,-2.0108404281648298,3.3413255481190682,0.5828460049710643,1.3795493630608675,0.19365088198818592,-0.6283490139655062,-3.7972008329339864,1.8534083383788014,0.335530850887893,-0.45687954413140014,-2.4331185724400055,-0.9599901853557922,-18.666278607239935,1.1902199502457989,0.12031887289651994,-0.733018331812128,-5.315220080494291,1.5728419912144365,0.25767284284880654,0.7890798087860693,-0.08444033076777749,0.34433505616706767,-0.4473740157394249,-2.379531939829909,2.7021529515043032,0.5005193151123447,-0.29647992558433084,-1.7056122659647104,4.430211411506961,0.6790207544106303,-0.1570529758508838,-1.2812523475567026,-0.5362276804953259,-2.9551070753712976,-1.0904415303871615,98.74825550506235,1.0470589666452526,0.056154379161697854,-0.8357991629020763,-8.134642040117365,21.772895251709176,0.9747505109399138,0.020328270286040444,-0.8984566215274441,-11.52550495086763,12.217702759374468,3.918276096424033,0.6390359007537544,-0.18575148327839186,-1.357642897059708,8.476065761675418,3.4050469793202516,0.5897638824994094,-0.2230191878508709,-0.4083012007601241,-2.175469540839945,-3.719343804626758,1.8764612920036645,0.34126857411525896,-0.4506712923008698,-2.3979332865185436,2.679540700062922,-17.02505469814959,1.2027379651364083,0.12554485931350456,-0.7251336456099745,-5.168637649764762,-43.66133111346476,1.1187992613771276,0.7974676272095462,-0.07925765567683905,-1.0964664100435264,-1.5560154479470507,5.46179930232402,0.7405488904919231,-0.11537013412020763,-1.1784925769976509,-0.48464686191124184,-2.5996474365169298,2.4673012636805294,0.4627925666210711,-0.3301092392292734,-1.8319546527649566,-2.905752072180845,2.2342475511474076,1.4965957786731892,0.23357108790537254,-0.5763254534688201,-0.8270920659880553,-7.802724082877137,1.3865522338375598,0.19614635856666987,-0.625000699479504,-0.889195469524244,-1.2473690042073455,13.043264861377478,0.9167469148311341,-0.010296713718365866,-0.9553810398031238,-1.343107103602323,-1.9599625944155206,3.4710423370552568,0.5967238965603571,-0.21762110535166868,-0.4023073204800772,-2.146283382920239,3.055701789265905,0.5492108334897519,0.3470264943356142,0.16734602922911662,-0.6644661434213884,-4.232137034550928,1.7455008992726349,0.3074235167349064,-0.48803992812368324,-0.7173076098554261,-1.0101780355069547,-35.64415538132587,1.1304587264297488,0.4067436856662941,-0.3832465810437449,-1.0851924402801936,-3.4219459976322892,1.978559611866141,0.7485509681336491,-0.11015648617220557,-0.6409186515191209,-1.6660559425443162,4.652750887999014,0.6941708904688599,0.46905834580505595,-0.32440969262118874,-0.9773586902811309,-2.8578519523460786,2.2654539261555326,0.8335329402959432,-0.057494383066830544,-0.22955416947644894,-1.4843141131222066,6.219388018355658,1.40170622082622,0.534509154906453,-0.2675371542589115,-0.8800187220626471,-10.293615249436172,2.6295215552060878,0.9262667578833224,-0.005148220406240263,-0.5021907409601704,-1.3287709484498933,9.297836987354366,1.5691365598281644,0.2565337532892849,0.08309526722239065,-0.791249451319405,-6.655925245631452,3.109771145275317,1.0284485569987198,-5.112693164212921,-0.4383404887912624,0.6150493721686131,18.210901605958327,1.7665234943499108,0.3130672236338706,-0.15814797619920318,-0.7095391623082202,0.3621165511529473,-0.11330361003390212,-1.173631355878047,-3.9922368329681586,-0.37735382724627864,0.6895746591501906,388.486330067495,2.0041219405476536,-1.8231019892331113,-24.110235631936686,1.1614654302179368,0.42245261809390067,4.772209694378391,-1.056418701147028,0.15287528769365213,-0.3187291522673248,17.708159376049803,-0.7804082794661333,0.3113615681219915,-1.616546102430594,1.0423359267264773,-4.936818351332138,-0.4303736387549791,6.430430789512696,2.906783941678291,1.7944724975538355,1.2228685806846114,0.8565089584871964,0.587524120336122,0.3697163102194958,0.17893914182381593,0.0],"x":[-1.8110048645192806e18,-1.8091920468370793e18,-1.8073792291548777e18,-1.805566411472676e18,-1.8037535937904748e18,-1.8019407761082734e18,-1.8001279584260718e18,-1.7983151407438702e18,-1.7965023230616689e18,-1.7946895053794673e18,-1.7928766876972657e18,-1.7910638700150643e18,-1.789251052332863e18,-1.7874382346506614e18,-1.7856254169684598e18,-1.7838125992862584e18,-1.781999781604057e18,-1.7801869639218555e18,-1.778374146239654e18,-1.7765613285574525e18,-1.7747485108752512e18,-1.7729356931930493e18,-1.771122875510848e18,-1.7693100578286467e18,-1.767497240146445e18,-1.7656844224642435e18,-1.763871604782042e18,-1.7620587870998408e18,-1.7602459694176392e18,-1.7584331517354376e18,-1.7566203340532362e18,-1.754807516371035e18,-1.752994698688833e18,-1.7511818810066317e18,-1.7493690633244303e18,-1.747556245642229e18,-1.7457434279600271e18,-1.7439306102778258e18,-1.7421177925956244e18,-1.7403049749134226e18,-1.7384921572312212e18,-1.73667933954902e18,-1.7348665218668186e18,-1.7330537041846167e18,-1.7312408865024154e18,-1.729428068820214e18,-1.7276152511380127e18,-1.7258024334558108e18,-1.7239896157736095e18,-1.7221767980914081e18,-1.7203639804092065e18,-1.718551162727005e18,-1.7167383450448036e18,-1.7149255273626022e18,-1.7131127096804004e18,-1.711299891998199e18,-1.7094870743159977e18,-1.7076742566337964e18,-1.7058614389515945e18,-1.7040486212693932e18,-1.7022358035871918e18,-1.7004229859049902e18,-1.6986101682227886e18,-1.6967973505405873e18,-1.694984532858386e18,-1.6931717151761843e18,-1.6913588974939827e18,-1.6895460798117814e18,-1.68773326212958e18,-1.6859204444473782e18,-1.6841076267651768e18,-1.6822948090829755e18,-1.680481991400774e18,-1.6786691737185723e18,-1.676856356036371e18,-1.6750435383541696e18,-1.673230720671968e18,-1.6714179029897664e18,-1.669605085307565e18,-1.6677922676253637e18,-1.665979449943162e18,-1.6641666322609605e18,-1.6623538145787592e18,-1.6605409968965576e18,-1.658728179214356e18,-1.6569153615321546e18,-1.6551025438499533e18,-1.6532897261677517e18,-1.65147690848555e18,-1.6496640908033487e18,-1.6478512731211474e18,-1.6460384554389458e18,-1.6442256377567442e18,-1.6424128200745428e18,-1.6406000023923412e18,-1.63878718471014e18,-1.6369743670279383e18,-1.635161549345737e18,-1.6333487316635354e18,-1.6315359139813338e18,-1.6297230962991324e18,-1.627910278616931e18,-1.6260974609347295e18,-1.6242846432525279e18,-1.6224718255703265e18,-1.620659007888125e18,-1.6188461902059236e18,-1.617033372523722e18,-1.6152205548415206e18,-1.613407737159319e18,-1.6115949194771177e18,-1.609782101794916e18,-1.6079692841127148e18,-1.6061564664305132e18,-1.6043436487483118e18,-1.6025308310661102e18,-1.6007180133839086e18,-1.5989051957017073e18,-1.5970923780195057e18,-1.5952795603373043e18,-1.5934667426551027e18,-1.5916539249729014e18,-1.5898411072906998e18,-1.5880282896084984e18,-1.5862154719262968e18,-1.5844026542440955e18,-1.582589836561894e18,-1.5807770188796923e18,-1.578964201197491e18,-1.5771513835152896e18,-1.575338565833088e18,-1.5735257481508864e18,-1.571712930468685e18,-1.5699001127864835e18,-1.568087295104282e18,-1.5662744774220805e18,-1.5644616597398792e18,-1.5626488420576776e18,-1.560836024375476e18,-1.5590232066932746e18,-1.5572103890110733e18,-1.5553975713288717e18,-1.55358475364667e18,-1.5517719359644687e18,-1.5499591182822674e18,-1.5481463006000658e18,-1.5463334829178642e18,-1.5445206652356628e18,-1.5427078475534612e18,-1.5408950298712596e18,-1.5390822121890583e18,-1.537269394506857e18,-1.5354565768246554e18,-1.5336437591424538e18,-1.5318309414602524e18,-1.530018123778051e18,-1.5282053060958495e18,-1.526392488413648e18,-1.5245796707314465e18,-1.5227668530492452e18,-1.5209540353670433e18,-1.519141217684842e18,-1.5173284000026406e18,-1.515515582320439e18,-1.5137027646382374e18,-1.511889946956036e18,-1.5100771292738348e18,-1.5082643115916332e18,-1.5064514939094316e18,-1.5046386762272302e18,-1.5028258585450289e18,-1.501013040862827e18,-1.4992002231806257e18,-1.4973874054984243e18,-1.495574587816223e18,-1.493761770134021e18,-1.4919489524518198e18,-1.4901361347696184e18,-1.4883233170874166e18,-1.4865104994052152e18,-1.484697681723014e18,-1.4828848640408125e18,-1.4810720463586107e18,-1.4792592286764093e18,-1.477446410994208e18,-1.4756335933120067e18,-1.4738207756298048e18,-1.4720079579476035e18,-1.470195140265402e18,-1.4683823225832005e18,-1.466569504900999e18,-1.4647566872187976e18,-1.4629438695365962e18,-1.4611310518543944e18,-1.459318234172193e18,-1.4575054164899917e18,-1.4556925988077903e18,-1.4538797811255885e18,-1.4520669634433871e18,-1.4502541457611858e18,-1.4484413280789842e18,-1.4466285103967826e18,-1.4448156927145812e18,-1.44300287503238e18,-1.4411900573501783e18,-1.4393772396679767e18,-1.4375644219857754e18,-1.435751604303574e18,-1.4339387866213722e18,-1.4321259689391708e18,-1.4303131512569695e18,-1.4285003335747679e18,-1.4266875158925663e18,-1.424874698210365e18,-1.4230618805281636e18,-1.421249062845962e18,-1.4194362451637604e18,-1.417623427481559e18,-1.4158106097993577e18,-1.413997792117156e18,-1.4121849744349545e18,-1.4103721567527532e18,-1.4085593390705516e18,-1.40674652138835e18,-1.4049337037061486e18,-1.4031208860239473e18,-1.4013080683417457e18,-1.399495250659544e18,-1.3976824329773427e18,-1.3958696152951414e18,-1.3940567976129398e18,-1.3922439799307382e18,-1.3904311622485368e18,-1.3886183445663352e18,-1.386805526884134e18,-1.3849927092019323e18,-1.383179891519731e18,-1.3813670738375293e18,-1.379554256155328e18,-1.3777414384731264e18,-1.375928620790925e18,-1.3741158031087235e18,-1.3723029854265219e18,-1.3704901677443205e18,-1.368677350062119e18,-1.3668645323799176e18,-1.365051714697716e18,-1.3632388970155146e18,-1.361426079333313e18,-1.3596132616511117e18,-1.35780044396891e18,-1.3559876262867087e18,-1.3541748086045071e18,-1.3523619909223058e18,-1.3505491732401042e18,-1.3487363555579026e18,-1.3469235378757012e18,-1.3451107201934996e18,-1.3432979025112983e18,-1.3414850848290967e18,-1.3396722671468954e18,-1.3378594494646938e18,-1.3360466317824924e18,-1.3342338141002908e18,-1.3324209964180895e18,-1.330608178735888e18,-1.3287953610536863e18,-1.326982543371485e18,-1.3251697256892836e18,-1.323356908007082e18,-1.3215440903248804e18,-1.319731272642679e18,-1.3179184549604774e18,-1.316105637278276e18,-1.3142928195960745e18,-1.3124800019138732e18,-1.3106671842316716e18,-1.30885436654947e18,-1.3070415488672686e18,-1.3052287311850673e18,-1.3034159135028657e18,-1.301603095820664e18,-1.2997902781384627e18,-1.2979774604562614e18,-1.2961646427740598e18,-1.2943518250918582e18,-1.2925390074096568e18,-1.2907261897274552e18,-1.2889133720452536e18,-1.2871005543630523e18,-1.285287736680851e18,-1.2834749189986493e18,-1.2816621013164477e18,-1.2798492836342464e18,-1.278036465952045e18,-1.2762236482698432e18,-1.2744108305876419e18,-1.2725980129054405e18,-1.2707851952232392e18,-1.2689723775410373e18,-1.267159559858836e18,-1.2653467421766346e18,-1.263533924494433e18,-1.2617211068122314e18,-1.25990828913003e18,-1.2580954714478287e18,-1.256282653765627e18,-1.2544698360834255e18,-1.2526570184012242e18,-1.2508442007190228e18,-1.249031383036821e18,-1.2472185653546196e18,-1.2454057476724183e18,-1.243592929990217e18,-1.241780112308015e18,-1.2399672946258138e18,-1.2381544769436124e18,-1.2363416592614106e18,-1.2345288415792092e18,-1.2327160238970079e18,-1.2309032062148065e18,-1.2290903885326047e18,-1.2272775708504033e18,-1.225464753168202e18,-1.2236519354860006e18,-1.2218391178037988e18,-1.2200263001215974e18,-1.218213482439396e18,-1.2164006647571945e18,-1.214587847074993e18,-1.2127750293927916e18,-1.2109622117105902e18,-1.2091493940283884e18,-1.207336576346187e18,-1.2055237586639857e18,-1.2037109409817843e18,-1.2018981232995825e18,-1.200085305617381e18,-1.1982724879351798e18,-1.1964596702529782e18,-1.1946468525707766e18,-1.1928340348885752e18,-1.191021217206374e18,-1.1892083995241723e18,-1.1873955818419707e18,-1.1855827641597693e18,-1.183769946477568e18,-1.1819571287953661e18,-1.1801443111131648e18,-1.1783314934309632e18,-1.1765186757487619e18,-1.1747058580665603e18,-1.172893040384359e18,-1.1710802227021573e18,-1.169267405019956e18,-1.1674545873377544e18,-1.165641769655553e18,-1.1638289519733514e18,-1.16201613429115e18,-1.1602033166089485e18,-1.1583904989267471e18,-1.1565776812445455e18,-1.1547648635623442e18,-1.1529520458801426e18,-1.1511392281979411e18,-1.1493264105157396e18,-1.1475135928335382e18,-1.1457007751513367e18,-1.1438879574691352e18,-1.1420751397869338e18,-1.1402623221047323e18,-1.1384495044225307e18,-1.1366366867403293e18,-1.1348238690581277e18,-1.1330110513759264e18,-1.1311982336937248e18,-1.1293854160115235e18,-1.1275725983293219e18,-1.1257597806471205e18,-1.1239469629649189e18,-1.1221341452827174e18,-1.120321327600516e18,-1.1185085099183144e18,-1.116695692236113e18,-1.1148828745539114e18,-1.1130700568717101e18,-1.1112572391895085e18,-1.1094444215073071e18,-1.1076316038251055e18,-1.1058187861429042e18,-1.1040059684607026e18,-1.1021931507785011e18,-1.1003803330962996e18,-1.0985675154140982e18,-1.0967546977318967e18,-1.0949418800496951e18,-1.0931290623674938e18,-1.0913162446852922e18,-1.0895034270030908e18,-1.0876906093208892e18,-1.0858777916386879e18,-1.0840649739564863e18,-1.0822521562742848e18,-1.0804393385920833e18,-1.0786265209098819e18,-1.0768137032276804e18,-1.0750008855454789e18,-1.0731880678632774e18,-1.071375250181076e18,-1.0695624324988745e18,-1.0677496148166729e18,-1.0659367971344716e18,-1.06412397945227e18,-1.0623111617700685e18,-1.060498344087867e18,-1.0586855264056655e18,-1.0568727087234641e18,-1.0550598910412626e18,-1.0532470733590611e18,-1.0514342556768596e18,-1.0496214379946582e18,-1.0478086203124567e18,-1.0459958026302552e18,-1.0441829849480538e18,-1.0423701672658522e18,-1.0405573495836507e18,-1.0387445319014492e18,-1.0369317142192477e18,-1.0351188965370463e18,-1.0333060788548448e18,-1.0314932611726433e18,-1.0296804434904419e18,-1.0278676258082404e18,-1.0260548081260389e18,-1.0242419904438374e18,-1.0224291727616358e18,-1.0206163550794345e18,-1.0188035373972329e18,-1.0169907197150316e18,-1.01517790203283e18,-1.0133650843506286e18,-1.011552266668427e18,-1.0097394489862255e18,-1.007926631304024e18,-1.0061138136218226e18,-1.0043009959396211e18,-1.0024881782574195e18,-1.0006753605752182e18,-9.988625428930166e17,-9.970497252108152e17,-9.952369075286136e17,-9.934240898464123e17,-9.916112721642107e17,-9.897984544820093e17,-9.879856367998077e17,-9.861728191176064e17,-9.843600014354048e17,-9.825471837532032e17,-9.807343660710019e17,-9.789215483888003e17,-9.771087307065989e17,-9.752959130243973e17,-9.73483095342196e17,-9.716702776599944e17,-9.69857459977793e17,-9.680446422955914e17,-9.6623182461339e17,-9.644190069311885e17,-9.62606189248987e17,-9.607933715667855e17,-9.589805538845841e17,-9.571677362023826e17,-9.55354918520181e17,-9.535421008379796e17,-9.51729283155778e17,-9.499164654735767e17,-9.481036477913751e17,-9.462908301091736e17,-9.444780124269722e17,-9.426651947447707e17,-9.408523770625692e17,-9.390395593803677e17,-9.372267416981663e17,-9.354139240159648e17,-9.336011063337633e17,-9.317882886515619e17,-9.299754709693604e17,-9.281626532871588e17,-9.263498356049573e17,-9.245370179227558e17,-9.227242002405544e17,-9.209113825583529e17,-9.190985648761514e17,-9.1728574719395e17,-9.154729295117485e17,-9.13660111829547e17,-9.118472941473455e17,-9.10034476465144e17,-9.082216587829426e17,-9.06408841100741e17,-9.045960234185396e17,-9.02783205736338e17,-9.009703880541367e17,-8.991575703719351e17,-8.973447526897336e17,-8.955319350075322e17,-8.937191173253307e17,-8.919062996431292e17,-8.900934819609277e17,-8.882806642787263e17,-8.864678465965247e17,-8.846550289143233e17,-8.828422112321217e17,-8.810293935499204e17,-8.792165758677188e17,-8.774037581855174e17,-8.755909405033158e17,-8.737781228211145e17,-8.719653051389129e17,-8.701524874567113e17,-8.6833966977451e17,-8.665268520923084e17,-8.64714034410107e17,-8.629012167279054e17,-8.610883990457041e17,-8.592755813635025e17,-8.574627636813011e17,-8.556499459990995e17,-8.538371283168982e17,-8.520243106346966e17,-8.502114929524951e17,-8.483986752702936e17,-8.465858575880922e17,-8.447730399058907e17,-8.429602222236891e17,-8.411474045414877e17,-8.393345868592861e17,-8.375217691770848e17,-8.357089514948832e17,-8.338961338126819e17,-8.320833161304803e17,-8.302704984482788e17,-8.284576807660773e17,-8.266448630838758e17,-8.248320454016744e17,-8.230192277194729e17,-8.212064100372714e17,-8.1939359235507e17,-8.175807746728685e17,-8.157679569906669e17,-8.139551393084655e17,-8.121423216262639e17,-8.103295039440625e17,-8.08516686261861e17,-8.067038685796595e17,-8.04891050897458e17,-8.030782332152566e17,-8.012654155330551e17,-7.994525978508536e17,-7.976397801686522e17,-7.958269624864507e17,-7.940141448042492e17,-7.922013271220477e17,-7.903885094398461e17,-7.885756917576448e17,-7.867628740754432e17,-7.849500563932417e17,-7.831372387110403e17,-7.813244210288388e17,-7.795116033466373e17,-7.776987856644358e17,-7.758859679822344e17,-7.740731503000329e17,-7.722603326178314e17,-7.704475149356298e17,-7.686346972534285e17,-7.668218795712269e17,-7.650090618890255e17,-7.63196244206824e17,-7.613834265246226e17,-7.59570608842421e17,-7.577577911602195e17,-7.55944973478018e17,-7.541321557958166e17,-7.523193381136151e17,-7.505065204314135e17,-7.486937027492122e17,-7.468808850670106e17,-7.450680673848092e17,-7.432552497026076e17,-7.414424320204063e17,-7.396296143382047e17,-7.378167966560033e17,-7.360039789738017e17,-7.341911612916003e17,-7.323783436093988e17,-7.305655259271972e17,-7.287527082449958e17,-7.269398905627942e17,-7.251270728805929e17,-7.233142551983913e17,-7.2150143751619e17,-7.196886198339884e17,-7.17875802151787e17,-7.160629844695854e17,-7.142501667873839e17,-7.124373491051825e17,-7.10624531422981e17,-7.088117137407795e17,-7.06998896058578e17,-7.051860783763766e17,-7.03373260694175e17,-7.015604430119736e17,-6.99747625329772e17,-6.979348076475707e17,-6.961219899653691e17,-6.943091722831676e17,-6.924963546009661e17,-6.906835369187647e17,-6.888707192365632e17,-6.870579015543617e17,-6.852450838721603e17,-6.834322661899588e17,-6.816194485077573e17,-6.798066308255558e17,-6.779938131433544e17,-6.761809954611529e17,-6.743681777789513e17,-6.725553600967498e17,-6.707425424145484e17,-6.689297247323469e17,-6.671169070501454e17,-6.65304089367944e17,-6.634912716857425e17,-6.61678454003541e17,-6.598656363213395e17,-6.58052818639138e17,-6.562400009569366e17,-6.54427183274735e17,-6.526143655925336e17,-6.50801547910332e17,-6.489887302281307e17,-6.471759125459291e17,-6.453630948637276e17,-6.435502771815261e17,-6.417374594993247e17,-6.399246418171232e17,-6.381118241349216e17,-6.362990064527203e17,-6.344861887705187e17,-6.326733710883173e17,-6.308605534061157e17,-6.290477357239144e17,-6.272349180417128e17,-6.254221003595114e17,-6.236092826773098e17,-6.217964649951085e17,-6.199836473129069e17,-6.181708296307053e17,-6.163580119485039e17,-6.145451942663023e17,-6.12732376584101e17,-6.109195589018994e17,-6.09106741219698e17,-6.072939235374964e17,-6.054811058552951e17,-6.036682881730935e17,-6.018554704908922e17,-6.000426528086906e17,-5.982298351264891e17,-5.964170174442876e17,-5.946041997620861e17,-5.927913820798847e17,-5.909785643976831e17,-5.891657467154816e17,-5.873529290332801e17,-5.855401113510787e17,-5.837272936688772e17,-5.819144759866757e17,-5.801016583044742e17,-5.782888406222728e17,-5.764760229400713e17,-5.746632052578698e17,-5.7285038757566835e17,-5.710375698934669e17,-5.6922475221126534e17,-5.674119345290639e17,-5.655991168468624e17,-5.637862991646609e17,-5.6197348148245946e17,-5.60160663800258e17,-5.583478461180565e17,-5.5653502843585504e17,-5.5472221075365357e17,-5.529093930714521e17,-5.5109657538925056e17,-5.492837577070491e17,-5.4747094002484755e17,-5.456581223426461e17,-5.438453046604446e17,-5.4203248697824314e17,-5.4021966929604166e17,-5.384068516138402e17,-5.365940339316387e17,-5.3478121624943725e17,-5.329683985672358e17,-5.3115558088503424e17,-5.293427632028328e17,-5.275299455206313e17,-5.257171278384298e17,-5.2390431015622835e17,-5.220914924740269e17,-5.2027867479182534e17,-5.184658571096239e17,-5.166530394274224e17,-5.148402217452209e17,-5.1302740406301946e17,-5.112145863808179e17,-5.0940176869861645e17,-5.07588951016415e17,-5.057761333342135e17,-5.03963315652012e17,-5.0215049796981056e17,-5.003376802876091e17,-4.985248626054076e17,-4.9671204492320614e17,-4.948992272410047e17,-4.930864095588032e17,-4.912735918766016e17,-4.894607741944001e17,-4.8764795651219866e17,-4.858351388299972e17,-4.840223211477957e17,-4.8220950346559424e17,-4.803966857833928e17,-4.785838681011913e17,-4.767710504189898e17,-4.7495823273678835e17,-4.731454150545868e17,-4.7133259737238534e17,-4.695197796901839e17,-4.677069620079824e17,-4.658941443257809e17,-4.640813266435794e17,-4.622685089613779e17,-4.6045569127917645e17,-4.58642873596975e17,-4.568300559147735e17,-4.55017238232572e17,-4.532044205503705e17,-4.51391602868169e17,-4.4957878518596755e17,-4.477659675037661e17,-4.459531498215646e17,-4.4414033213936314e17,-4.4232751445716166e17,-4.405146967749602e17,-4.387018790927587e17,-4.3688906141055725e17,-4.3507624372835565e17,-4.332634260461542e17,-4.314506083639527e17,-4.2963779068175123e17,-4.2782497299954976e17,-4.260121553173483e17,-4.241993376351468e17,-4.2238651995294534e17,-4.205737022707439e17,-4.187608845885424e17,-4.169480669063409e17,-4.151352492241394e17,-4.133224315419379e17,-4.1150961385973645e17,-4.09696796177535e17,-4.0788397849533344e17,-4.0607116081313197e17,-4.042583431309305e17,-4.02445525448729e17,-4.0063270776652755e17,-3.988198900843261e17,-3.970070724021246e17,-3.951942547199231e17,-3.933814370377216e17,-3.915686193555201e17,-3.8975580167331866e17,-3.879429839911172e17,-3.861301663089157e17,-3.8431734862671424e17,-3.825045309445128e17,-3.806917132623113e17,-3.7887889558010976e17,-3.770660778979083e17,-3.7525326021570675e17,-3.734404425335053e17,-3.716276248513038e17,-3.6981480716910234e17,-3.6800198948690086e17,-3.661891718046994e17,-3.643763541224979e17,-3.6256353644029645e17,-3.60750718758095e17,-3.589379010758935e17,-3.5712508339369197e17,-3.553122657114905e17,-3.53499448029289e17,-3.516866303470875e17,-3.49873812664886e17,-3.4806099498268454e17,-3.462481773004831e17,-3.444353596182816e17,-3.426225419360801e17,-3.4080972425387866e17,-3.389969065716772e17,-3.3718408888947565e17,-3.353712712072742e17,-3.335584535250727e17,-3.3174563584287123e17,-3.2993281816066976e17,-3.281200004784683e17,-3.263071827962668e17,-3.2449436511406534e17,-3.226815474318638e17,-3.2086872974966234e17,-3.190559120674608e17,-3.172430943852593e17,-3.1543027670305786e17,-3.136174590208564e17,-3.118046413386549e17,-3.0999182365645344e17,-3.0817900597425197e17,-3.063661882920505e17,-3.04553370609849e17,-3.0274055292764755e17,-3.009277352454461e17,-2.9911491756324454e17,-2.973020998810431e17,-2.9548928219884154e17,-2.9367646451664006e17,-2.918636468344386e17,-2.900508291522371e17,-2.8823801147003565e17,-2.8642519378783418e17,-2.8461237610563267e17,-2.827995584234312e17,-2.8098674074122973e17,-2.7917392305902826e17,-2.7736110537682678e17,-2.7554828769462528e17,-2.7373547001242378e17,-2.719226523302223e17,-2.7010983464802083e17,-2.6829701696581936e17,-2.664841992836179e17,-2.646713816014164e17,-2.628585639192149e17,-2.6104574623701344e17,-2.5923292855481194e17,-2.5742011087261046e17,-2.5560729319040896e17,-2.537944755082075e17,-2.51981657826006e17,-2.5016884014380454e17,-2.4835602246160307e17,-2.465432047794016e17,-2.4473038709720006e17,-2.429175694149986e17,-2.4110475173279712e17,-2.3929193405059565e17,-2.3747911636839418e17,-2.3566629868619267e17,-2.338534810039912e17,-2.320406633217897e17,-2.3022784563958822e17,-2.2841502795738675e17,-2.2660221027518525e17,-2.2478939259298378e17,-2.229765749107823e17,-2.2116375722858083e17,-2.1935093954637936e17,-2.1753812186417782e17,-2.1572530418197635e17,-2.1391248649977488e17,-2.120996688175734e17,-2.1028685113537194e17,-2.0847403345317046e17,-2.0666121577096896e17,-2.048483980887675e17,-2.0303558040656598e17,-2.012227627243645e17,-1.9940994504216304e17,-1.9759712735996154e17,-1.9578430967776006e17,-1.939714919955586e17,-1.9215867431335712e17,-1.9034585663115565e17,-1.8853303894895414e17,-1.8672022126675264e17,-1.8490740358455117e17,-1.830945859023497e17,-1.8128176822014822e17,-1.7946895053794675e17,-1.7765613285574525e17,-1.7584331517354374e17,-1.7403049749134227e17,-1.722176798091408e17,-1.7040486212693933e17,-1.6859204444473782e17,-1.6677922676253635e17,-1.6496640908033488e17,-1.631535913981334e17,-1.613407737159319e17,-1.595279560337304e17,-1.5771513835152893e17,-1.5590232066932746e17,-1.5408950298712598e17,-1.522766853049245e17,-1.5046386762272304e17,-1.4865104994052154e17,-1.4683823225832003e17,-1.4502541457611856e17,-1.4321259689391709e17,-1.413997792117156e17,-1.3958696152951413e17,-1.3777414384731264e17,-1.3596132616511115e17,-1.3414850848290968e17,-1.323356908007082e17,-1.3052287311850672e17,-1.2871005543630523e17,-1.2689723775410374e17,-1.2508442007190227e17,-1.232716023897008e17,-1.214587847074993e17,-1.1964596702529782e17,-1.1783314934309634e17,-1.1602033166089485e17,-1.1420751397869338e17,-1.1239469629649189e17,-1.1058187861429042e17,-1.0876906093208891e17,-1.0695624324988744e17,-1.0514342556768597e17,-1.0333060788548448e17,-1.0151779020328299e17,-9.970497252108152e16,-9.789215483888003e16,-9.607933715667856e16,-9.426651947447707e16,-9.245370179227558e16,-9.064088411007411e16,-8.882806642787262e16,-8.701524874567114e16,-8.520243106346966e16,-8.338961338126818e16,-8.15767956990667e16,-7.97639780168652e16,-7.795116033466373e16,-7.613834265246226e16,-7.432552497026077e16,-7.251270728805928e16,-7.06998896058578e16,-6.888707192365632e16,-6.707425424145484e16,-6.526143655925336e16,-6.344861887705187e16,-6.16358011948504e16,-5.982298351264891e16,-5.801016583044742e16,-5.6197348148245944e16,-5.4384530466044456e16,-5.2571712783842984e16,-5.0758895101641496e16,-4.894607741944002e16,-4.7133259737238536e16,-4.532044205503706e16,-4.350762437283557e16,-4.169480669063409e16,-3.98819890084326e16,-3.806917132623113e16,-3.625635364402964e16,-3.444353596182816e16,-3.263071827962668e16,-3.08179005974252e16,-2.900508291522371e16,-2.7192265233022228e16,-2.5379447550820748e16,-2.3566629868619268e16,-2.1753812186417784e16,-1.99409945042163e16,-1.812817682201482e16,-1.631535913981334e16,-1.4502541457611856e16,-1.2689723775410374e16,-1.0876906093208892e16,-9.06408841100741e15,-7.251270728805928e15,-5.438453046604446e15,-3.625635364402964e15,-1.812817682201482e15,0.0]}
},{}],64:[function(require,module,exports){
module.exports={"expected":[-6.420676210313675e-11,0.6550436337224089,1.520329130807131,2.2229716489648492,-1.103242584636981,-0.8010291915287792,0.5253352378935542,-13.866544042977948,1.0334895307380332,-2.431746301371779,2.066068916754913,0.28657964399805685,0.30559821123437747,0.32482114181156085,-0.5816959849823272,-4.857705299744476,-4.461248210345915,-4.122173081103239,1.4525477897736565,52.42324875308598,-0.8664673696582346,0.16334573242350067,0.9237294422415245,-0.095438563031598,-1.358003792479611,-0.060252527694834974,-1.26301369729465,5.782994162182802,0.6250659435953592,7.29359995159656,-2.082911584271163,-0.2524728773616521,-1.9088296141637886,-0.21558382622309413,-1.756542607656852,-0.5072116376418861,0.43046731454969783,-0.4639933444863082,-3.2856697560767683,-0.827853928479024,0.1865156292547726,1.7856367145312344,-13.60897944306501,-0.7162585613959924,-0.03771656933910967,2.1210179456164067,6.673193127233944,-1.1238591512271536,0.032253667848321774,0.7080352279560224,12.66322568826556,-1.8087151185097226,0.1025408229984586,0.8186996069494484,3.222443201342409,-1.5431291903296775,-0.12048991740992258,0.5003706077450858,4.252499259426075,-2.715073344455713,-0.35599707413062803,0.5911479872056775,2.054110527929577,-2.2223199411486423,-0.6326799782971048,0.019755537586451245,1.248950495679316,-4.914425885696335,-0.5387458551155935,0.08993546625928303,0.7980488284660626,-3.603685176196371,-0.8704677608969726,-0.13318051773286604,0.9195120722366367,-20.565193683125255,-1.3645098618335312,-0.06254154423364248,0.5744165877769029,5.705471834362217,-2.298613078209264,-0.29249326627551603,0.0072635736317240894,9.621059489745056,-1.0264924098504131,0.07757725488560459,0.3869906597634206,0.7778056712004806,29.53680865205522,-0.14569123178593324,0.14821710117502512,1.6392784720926479,-2.9373566017744897,-0.3841506155328227,0.5582088651568925,1.0315830265853236,-9.395097685238795,-2.3794164678537504,-0.3061017166223332,2.314238001597449,-1.9783413392251186,-1.0524764520087864,-0.5714215190469056,0.37269901766226543,-3.9840298372229386,-1.6768315781948933,-0.1584697722442877,0.874823045388288,-41.962862295583605,-3.0621927719601283,-0.39855308761338243,0.5419402187841843,1.0061292328124494,-10.658300917689585,-0.6861263218253502,1.15830074847749,2.23708439125154,-2.0412709547654027,-1.0791527464974253,0.052491274846852155,0.3585398163627292,-4.20580603390199,-0.49728291248453943,0.4398975834560447,0.8530122730338094,1.550780275055878,-0.8145782445939267,0.1947324599820994,0.525890334168002,4.67429444237445,-1.2749186619626598,-0.029778814242913117,1.1294701089762587,2.164125168841972,-2.1074934088247317,-1.1065579954593745,0.7200061236726891,14.085396116673552,-0.9615143029585921,-0.5129591498340075,0.42507189830897546,0.8316613569497286,-1.5166438398990907,-0.8355696878554257,0.1818001064864378,1.7666878373021089,4.404648804707104,-0.3470885158903127,0.6018980073216346,1.101441597190032,2.095006357577013,-2.17729645595795,-0.2706902584478305,2.539098298279887,11.96747912457433,-0.9858439465078999,-0.5288375561394779,0.4104028074455288,3.17127366153464,-1.5586599277817954,-0.8570039026295543,-0.44265251747432743,1.7163248394703392,4.163125058531109,-0.36114431865555024,-0.05480382933694052,-0.638472330382288,-7.8793010324826795,-2.251002196812406,0.31727472299028203,0.6827402013115225,-1.8828806563577152,-1.0107802190238173,0.7909638942326814,1.43148121078005,3.0384319524336996,38.25854322863777,-0.13782510554960434,3.95269805316446,-22.698791804126074,-0.06690303139636382,0.2288918937285009,0.5683666880505238,1.0476280137290044,1.9670618809408889,-0.6568180517024585,-0.29768775896452576,-1.035452161432695,-0.560665185704575,1.3953473846210511,0.07277185147321778,0.381506747861176,-3.8577992934627727,-1.6478132038591178,0.46422676718413197,0.8885283502072981,-1.4138207163652807,3.748273451283285,1.0226577064169011,1.909721771428404,5.184063423553414,-0.3108583152358138,-0.009569654910476844,8.265504680578132,-5.776386563145811,-2.0020458259247786,-1.0625988822529318,-0.5777775655024241,-1.6935087257049786,-0.9233735753363674,0.8671847495490179,1.578873069996632,3.5746943019165416,-52.49344052614167,-0.09204112109167771,0.20274819859918236,0.5357743387787174,-2.4962403849723707,-1.2548704198524472,-6.221684528735324,1.147172885042253,-1.0885984288944375,-0.5939696309907186,-0.2491244288972581,2.6976888869288396,15.81037490059459,-0.1757730884275968,-1.7446224378670852,0.4342064463739874,0.8447904320346385,-1.4914891840107691,0.5203584661018432,0.9728176565982322,-1.2863851687093857,-0.7111751663949808,-0.3384713136699851,-0.03456215938295964,6.830062299860325,-6.779826035868176,-2.13375987236595,0.33965532529739434,-4.544393565738041,-1.7944165806758028,-0.9707528793790405,0.8243403886422956,1.4949188470705161,3.2586745044124066,-0.4329448886086045,-0.11729509123649835,4.317704471624649,0.5040430206635405,-0.046636592259295825,0.2502525623159322,0.5954071145061248,-2.2024678067829946,-1.144716445089513,0.6947507414481672,-0.2758254585007356,2.5039398294410518,11.315609356669277,-0.20164285554803113,0.09311215049366917,55.59352347950439,-0.12953325217443284,0.16446237144317702,0.4890166365441243,0.9253428550221015,-1.3549155234860077,-0.7494762297469666,-0.3665553109000745,2.0073754940788904,5.813106725592282,1.2269520444870319,0.01063169147158382,9.946724700721475,-5.154624745643135,0.08096626663423002,0.39086794724850654,0.7832252178593851,-1.6179478255769342,2.990238475565361,-0.462936622186243,-0.1426975113933171,-0.7684743492418029,-0.3802907510492296,-0.07170438174705356,5.421153483120969,-9.103677167829407,-2.3571594276533854,-1.2041389040293957,0.6583391677226854,1.1950742783371888,2.333005041791381,-0.5669625608898129,1.3813586578750932,2.874563146029507,23.26053722086478,-0.15501918018149974,0.138907364607247,-36.76384572648443,-3.027601173408632,-1.4282481583573585,0.546305180506936,-0.39515845499182956,1.887717046164893,-0.6811843996001452,1.1662180135705311,2.257460366330868,7.946856330188053,-0.24048994552631342,-2.0262082375299344,0.3623452099870218,0.7436882709109469,-1.7121423358559653,-0.9322654122132313,-3.1547992098302178,-1.4655360778441353,-0.8089910141027135,-0.4091625583366521,-0.09686214929329286,0.19777816057254463,-0.3294165881048495,-0.026408307972135656,0.2718303256008915,0.6231060139559303,1.1361663553113288,2.180899731712729,0.7251323390418695,1.3111246247648307,2.658638720040838,14.695379321806103,-4.391896221406267,3.3559086084770073,-451.4896504484407,1.7824665858108513,-1.507008015504648,-13.793054466873313,-2.6233135160133134,-1.2991493338929097,-0.7183949139684953,-0.34380579867286054,-0.039347084749275035,-0.6169732199299954,-1.8110254001789448,0.030841718068483858,0.3343342676072661,0.7055937543592427,0.10133543243809144,0.41434336160049573,0.816346332175175,1.4795713084295847,0.4991515389127381,93.36937938345007,1.7296908951179875,4.22574124421023,-16.801319035664143,2.049029517063645,6.110627949083762,-7.672337232542968,-0.3583234658835398,10.832641777706673,-0.6349621303214523,-1.8676693947942284,-1.003994598989104,-0.5405671928870383,-1.5888594853646374,-0.872183765695367,-0.45308151158639154,0.7950321573230111,-0.7555976564494682,0.48310931326662143,-0.06352086112253938,1.679223397276779,0.5728310464898032,0.006723209984824636,1.9835704658165696,0.6700792890514358,-8.531290287161926,2.386508555084141,9.490849076306635,1.4053193036770222,-1.9271158444831535,-1.0302899955220888,-3.8049949652275123,-1.6353696976303318,-28.284633260991342,-0.46875197969675614,-1.403768747636321,-0.7761027020096375,-0.3857701965064721,-0.07650902343875748,0.21885606572507724,-0.30716887421383726,-0.006201597277567784,0.2936464034053969,0.6515111999519496,0.06404457400111273,0.37158848632710556,0.7564173612541611,1.367553391540371,2.830899789699512,20.929473342523945,1.5906993441377961,3.621663592004514,-44.604434942789375,-0.48461349319743785,4.952357712430127,-10.771260325260684,-2.4720897121358894,-1.2462356895635902,-0.6882029203008603,-2.046320909842769,-0.019128476754080446,-0.5894226890001895,0.6332532234382197,-0.9395970188621671,-0.4985001619751427,-0.172303230814531,0.12178817376801786,2.718503425123102,-0.10080851317935052,1.54598796033449,0.5246457620438797,-105.36076835669135,1.8132598226168208,4.64227593024036,1.1272527364572893,2.1585929846517393,-1.279775698151484,1.3005522109565506,-2.115191823663068,13.89353073779165,-0.6069722485834306,-1.7802898265403444,-0.9642326004211492,-0.5147421395760778,-0.1856420164134514,0.10869173003303796,-2.654436164262907,-0.11388224621009893,-0.7243367876313204,0.5082736959959153,0.9543873692345675,0.2538343554870449,0.5999780761862656,1.0983246552351114,2.0874272460323113,6.402574609731484,1.2663395854742927,0.4097716009039627,11.76742633359678,-4.760713661089723,3.1605214855042574,68.40430278840763,-3.5146099884629605,-1.5635079443480382,-0.8594533943039686,-2.7621287855101717,-0.1269945241968683,-0.7442298396155967,-0.3627396488132031,-1.1649877736275254,-0.6404596717816707,-0.2851955894821662,0.01400005051790083,2.02000082367207,-0.2106987130603051,1.233228899705093,0.39475545621574193,10.202691424996154,0.15555334865656098,0.47829804193556286,36.29827937162371,1.664392214358458,-1.6089483367010877,1.0464952843194932,-2.877795669603327,5.525402334467705,-0.7645093284767495,-2.3352529827100272,-1.1959211452657508,-0.6588389945308587,-1.9456780340684665,0.001074509899367474,-3.8663991889313722,-0.22423472974505085,-0.9022658535441144,0.3798917689159951,0.7679200030674456,0.14234181274924354,0.4625133605649677,-0.08044127853694918,1.6166873234856491,-0.31145096639437214,1.0197761262242437,1.9031845184557268,5.145030545040683,-9.981685843575862,2.2781485441743174,8.168854442362568,-5.825260532082127,-2.009130113772668,-1.0656066083026687,-4.083390110120225,-1.6989777445293646,-0.9259901885159223,-0.4894486952449513,-1.4549868168408309,-0.8034341464498125,-0.4052362844508177,-0.09346380196407943,1.5709353304000542,-0.32568740355070647,-0.023038401189818973,0.2754503542686938,0.6277913121404436,0.0471593303803233,0.35254873007055604,7.377024012502725,1.3203226062910554,-2.0759655922818583,0.843864894292211,-4.324562540571781,3.3976777776508333,-179.12192142028118,-0.5055724412372994,4.555713631236983,-0.8249260731164773,-2.597001290062025,-0.10651782721788437,-6.805296847389381,-0.34004420745617187,-0.0359744598197288,0.2615936584924255,0.6099168444957446,-0.9718029602849517,0.3380828033102357,-0.1896878421062545,1.285460078207005,-0.43358665750715325,0.8219740747651898,1.4903656368651095,3.242360408193824,136.20217271136025,0.2496784633386448,4.290165429761509,1.0897387769090647,-2.700577294260858,-1.3251596739182818,-7.475799642408447,-2.2107464429838872,-1.1479806083609811,-0.6302465142529444,-1.852648296132921,-0.9972547128970561,-0.5362231123083164,-0.2031111724048555,0.0916895614490799,-0.4490284749518306,-0.13096772826716255,0.16301400852645764,0.48726998045671854,-0.0601401376293377,0.23599152987812352,4.052520244251407,1.0618569096963406,2.0003011014218712,0.6749703738735301,1.2234241506331127,2.409240493843518,9.807708870262495,-0.6484542690138371,2.9848753639516925,-1.0233711726707118,-3.7535268551124137,-0.21660516828117574,-25.8215409994801,-2.9144830838807696,-0.14413707014458607,-0.7707203327403426,0.4713758464178253,-1.2054635654484598,0.22238784024706415,-0.30348705876461685,1.0347300302783033,0.297308286966409,0.6563191512580502,1.1916549494389226,0.37542617386332877,8.692812755240903,0.1383566427371764,2.861549857889367,0.8790552579716281,-3.9585014067235043,-1.6710440973900675,-38.77607161654883,-3.0420028139676023,-1.432544724802476,-0.7915307716184623,2.254170414657279,-1.237673138749186,-0.683251443153698,-0.31765847600095337,-0.01575960372890093,-0.5848937634397064,-0.24198257803503748,0.05445417137291216,0.36075028215475885,0.7414998857273131,0.12520738724698754,0.4422356556514744,0.8563994214737267,1.5574650206770317,0.5289482355269719,0.9860145031028703,-3.179960848195164,4.719429831768834,-0.8127714272223646,2.177793036566781,7.166499182123827,-6.477288679765802,-2.0968864488837604,14.579074412839406,-4.402885067981704,-0.2557077033957003,-0.9577545322728506,0.3462106173938584,-1.5087769386328014,0.11210062315522436,-0.4249697884513013,-0.11047201809975724,0.18382281940782624,-0.34441011737319654,0.9608436098313322,0.2574222778902965,4.435912641813081,1.1057828049323797,2.105597789037722,6.547117708583318,-7.083230579251124,-2.16858697143123,0.815446299644343,-0.62012659955231,3.19792869368868,88.88452967460681,-3.4701667848822266,-1.5519679319396997,-0.8536147343685281,-0.44031372580807926,-0.12357381397901733,0.17049238781929146,0.4963057644979481,0.9362902537613105,-0.6357205793054066,-0.2815572964514202,-17.473167101084044,-2.748147964122281,-1.5907655266133116,-0.8731355885203742,2.4596340563121832,10.569230881503135,0.1590045059441358,-1.877949659135049,-1.0085848842213858,1.6771612928013684,3.9854895860121977,-21.731345861375967,-2.8468362564041803,0.669296620362867,-0.7591867480513783,-0.3735918629836343,-0.06581115369046957,-5.305397932131312,0.5698058432561122,1.0499108140810267,1.6353008177181414,-0.2207002012510049,0.07473979898239781,0.3837506054291119,-1.4053750739175261,1.3985559033592347,2.929828207501693,26.9422970849774,-3.84060554755277,0.5550835678422767,1.026670042142757,-0.5728559443750447,5.239181531283394,-9.65378759179491,-2.3983365666470076,0.7555682077906195,-0.6726313385545349,-0.30966657790649327,20.694894970428063,-4.024673822831531,-1.6859629494365886,-0.9197539830023153,1.8675852608264432,-0.16136300987921684,0.13260434924327436,0.4509629086999508,0.8690911408519181,-0.6889994700611888,-0.3219663908858152,-0.01966901730945723,0.27907710561208,0.6324964646660984,1.151716208522243,2.2202512065601385,7.568427697251929,-6.178806836443704,-2.0582076587083087,0.8496474645334648,1.5441577033736864,3.440413932413118,-111.72166188029188,-3.2239358992552245,-1.4851961571765038,-0.819282058350918,-0.4164060443653709,-0.10311297902820353,-6.649526680317003,0.5217406941716435,-1.1109070712557014,-0.6077118969448455,-0.2598756141435974,0.03758531809089779,0.3418398850202201,0.7157312254869941,-0.7108486417644492,-0.4295914852626293,-0.11442962487634913,0.17978545639528165,-1.7898380619209056,0.9533553951244595,1.7568959976140373,-0.1880023756020901,-15.087165834486083,-2.6728989919771995,0.6989512895695441,-0.7278199312290345,2.5246416265343172,11.692540394209479,0.25140804849671994,0.5968805438107769,-0.9905599485833949,-0.5318946935970039,6.30817727927114,-18.163321229235812,-2.7667985172620693,-1.346927867603005,1.4600128246676993,-0.3633512035439656,-0.056760783345470744,-3.5453098628973985,-1.5713922612824172,1.0690478783410304,-0.5463295218705109,5.881989328258591,0.08381296957407282,0.3941310503766625,-1.1703782916416527,-0.6436806759042686,3.0185879869450383,35.59951461825421,0.3132165791720047,0.6773418408230867,1.0453638352132586,-0.46056200203489006,-0.1407009114977164,-8.872465410373378,-2.338744404251043,0.9051883813131976,1.6558258154683687,-0.29981276200684864,-24.77864699290338,0.300977511107071,0.6611484045404326,-0.903246548659824,2.34567361601665,8.958449588699224,0.14179057001018494,-1.9566416261557475,-1.0431305125082293,-0.5655269127203517,-0.31204381705932727,-34.29415181295499,-3.0078197443201415,-1.4223147574945518,-0.7860674443091911,-0.39289726897604,-0.08273721622369874,-5.844196092013841,0.5477175522579125,-1.066761172729529,-0.580382645309847,-0.23842041648006312,0.057832635285817925,0.3645610654364911,0.7467325333618937,1.3499387522975144,2.7760726421946633,18.52383897830756,-6.264887916117477,0.5332660654117486,0.9926788055541965,1.84249942505647,4.799075970906035,-11.547227927322394,-2.5167850387453576,-1.262159707361074,-0.6973622095365082,-0.3282119621842779,15.335414962185986,-4.335233113606483,-1.752538189308612,-0.9513181208249993,-0.5062510759774493,-0.17868279131198414,0.1155120912294401,0.43085757312806716,-1.0986153469211775,-0.714116832622452,-0.3406471347283439,-0.036515506880387745,0.2610164268737654,0.6091757467916707,1.1132967123550412,-0.4230497741910949,6.698178809443057,-6.914905486243933,0.4176601918558037,0.8210690652476059,1.4886265085525006,3.2361504384754363,0.0319298798862167,-3.4267503987978847,-1.540547927115733,-0.8478095487774164,2.566039165999666,6.220940212209553,-7.5066627919045885,0.5005102186923245,-1.149233811557241,-0.6310017364246682,-0.2779258968698059,-16.49888691200617,0.32314588871968,0.6905761406043073,-0.7364964798495263,2.4835750992701553,-0.13151737258310528,0.1624593614330386,-1.862800209740964,0.921728031327512,1.6900754414287278,-0.20548712192130017,0.08939010990657133,-2.816464866968806,0.6741841538038321,-0.753891316110217,-0.3697587731617982,9.755469708719378,-5.2089573332019725,0.5742757505562874,-1.0244780110031102,-0.5536868750813919,5.687375603519361,0.07812732240620325,-2.919621251791859,-1.39540263129051,1.4085582640113987,2.9624270578425613,-0.07366557197833705,-3.788238292777271,-1.6313823411238124,1.0336117973662433,-0.5683914904256209,5.336714750478464,-9.346539585728966,0.37480980390484403,-1.211074015144504,-0.6677508070799889,-0.3059796100371225,22.248958802717315,0.2948276096863451,-1.6730951180556093,1.010742320795454,-0.48112671295697684,-0.15790933665876059,0.13603295831415826,-2.4521221775636732,0.8750201610481037,1.5945437769426343,3.6370701153338185,-0.01630007979203115,0.2827106808783336,0.6372217054206379,-0.9342873589252092,2.2403714197804687,7.769844126276632,-6.049551783334042,-2.0406942175092513,-1.0789111025905904,-0.5879588593968099,3.4841520494085474,-81.17512505948382,-3.1859754920845336,-1.4744531886581842,-0.813669104100622,-0.4124597545600081,-0.09971049481980028,0.19484834573205229,0.526032869771291,-1.1034109371927503,-0.6031096623416423,-0.2562834509297827,0.040958360442455724,0.34560562751780805,0.7208366462596406,1.303482190081761,2.6360465270683227,14.107693893325195,0.18326427918187518,0.5118367984656096,0.9598049614125183,1.7707412887621568,-0.1845176876523234,-14.354428936656765,-2.645714560925441,-1.3067597447440773,-0.7226806430103572,2.5496885525998256,12.175359453928555,0.2549918094914359,-1.8231611784632964,-0.9839097040866808,-0.5275817545445168,6.44854475276607,0.09848617861179483,0.4110417945061804,0.8116559946570812,-0.7398454517185697,-0.35954336711100854,-0.0533827208245683,-3.5001498680292786,0.5863284864918392,1.076290814835002,-0.4430394058666219,-0.125890053210611,0.08720544282853476,0.398027240467184,-1.1624285270055221,1.435810508747757,3.0529931068315093,0.015087371417922518,0.3169187446555414,-1.5988471442592116,-0.8771631390544213,2.443644865005729,-0.13726800782922605,-8.611767590118577,0.4796345209264556,0.9113344839086798,-0.6547916825661485,-0.29614587783574636,-22.86700559851801,-2.8677370734411975,0.6659992119666294,1.20808774734005,2.3677464221124374,-0.14868095327505168,0.14522777845987508,-1.9404865621734182,-1.0361226365733522,1.6269519751010426,3.76971197698598,0.07244669134314456,-2.974322272404328,0.6499728975558643,-0.7806329674471949,-0.3890146584163077,8.364890530071987,-5.728085640239611,0.5521038399793461,1.0219961919918528,-0.5758891280562849,-0.2348639709249202,0.06121241551605706,0.36838121790340134,-1.446209598717095,1.359487385823344,2.805671898719845,-0.09061234045556817,-4.064261688929017,-1.6947605256486815,0.9993878176844544,-0.5908797390240599,4.881338983753158,-11.111731272046756],"x":[1.6470993291652855e6,1.8128176838469328e15,3.625635366046766e15,5.438453048246599e15,7.251270730446433e15,9.064088412646266e15,1.08769060948461e16,1.2689723777045934e16,1.4502541459245766e16,1.63153591414456e16,1.812817682364543e16,1.9940994505845264e16,2.17538121880451e16,2.3566629870244936e16,2.537944755244477e16,2.71922652346446e16,2.9005082916844436e16,3.081790059904427e16,3.2630718281244104e16,3.444353596344393e16,3.625635364564377e16,3.806917132784361e16,3.988198901004343e16,4.169480669224326e16,4.3507624374443096e16,4.5320442056642936e16,4.713325973884277e16,4.89460774210426e16,5.075889510324243e16,5.257171278544227e16,5.43845304676421e16,5.619734814984194e16,5.801016583204177e16,5.982298351424161e16,6.163580119644144e16,6.344861887864126e16,6.52614365608411e16,6.7074254243040936e16,6.888707192524077e16,7.069988960744059e16,7.251270728964043e16,7.432552497184027e16,7.61383426540401e16,7.795116033623994e16,7.976397801843976e16,8.157679570063962e16,8.338961338283942e16,8.520243106503926e16,8.70152487472391e16,8.882806642943893e16,9.064088411163877e16,9.24537017938386e16,9.426651947603845e16,9.607933715823827e16,9.78921548404381e16,9.970497252263794e16,1.0151779020483778e17,1.033306078870376e17,1.0514342556923744e17,1.0695624325143726e17,1.087690609336371e17,1.1058187861583694e17,1.1239469629803677e17,1.142075139802366e17,1.1602033166243643e17,1.1783314934463626e17,1.196459670268361e17,1.2145878470903594e17,1.2327160239123578e17,1.250844200734356e17,1.2689723775563542e17,1.2871005543783528e17,1.305228731200351e17,1.3233569080223493e17,1.3414850848443477e17,1.3596132616663461e17,1.3777414384883443e17,1.3958696153103427e17,1.413997792132341e17,1.4321259689543394e17,1.4502541457763376e17,1.468382322598336e17,1.486510499420334e17,1.5046386762423328e17,1.5227668530643312e17,1.5408950298863296e17,1.5590232067083277e17,1.5771513835303258e17,1.5952795603523242e17,1.613407737174323e17,1.631535913996321e17,1.6496640908183194e17,1.6677922676403178e17,1.685920444462316e17,1.7040486212843146e17,1.7221767981063126e17,1.740304974928311e17,1.758433151750309e17,1.7765613285723075e17,1.7946895053943062e17,1.8128176822163046e17,1.8309458590383027e17,1.8490740358603008e17,1.8672022126822992e17,1.885330389504298e17,1.903458566326296e17,1.9215867431482944e17,1.9397149199702928e17,1.9578430967922912e17,1.9759712736142893e17,1.9940994504362877e17,2.012227627258286e17,2.030355804080284e17,2.0484839809022826e17,2.066612157724281e17,2.0847403345462797e17,2.1028685113682778e17,2.1209966881902762e17,2.1391248650122742e17,2.1572530418342726e17,2.1753812186562707e17,2.1935093954782694e17,2.2116375723002678e17,2.2297657491222662e17,2.2478939259442643e17,2.2660221027662624e17,2.284150279588261e17,2.3022784564102595e17,2.3204066332322576e17,2.338534810054256e17,2.3566629868762544e17,2.3747911636982528e17,2.3929193405202512e17,2.4110475173422493e17,2.4291756941642477e17,2.4473038709862458e17,2.4654320478082445e17,2.483560224630243e17,2.5016884014522413e17,2.5198165782742394e17,2.5379447550962378e17,2.5560729319182358e17,2.5742011087402346e17,2.5923292855622326e17,2.610457462384231e17,2.6285856392062294e17,2.6467138160282275e17,2.6648419928502262e17,2.6829701696722246e17,2.7010983464942227e17,2.7192265233162208e17,2.7373547001382192e17,2.7554828769602176e17,2.7736110537822163e17,2.7917392306042144e17,2.8098674074262128e17,2.827995584248211e17,2.8461237610702093e17,2.8642519378922077e17,2.882380114714206e17,2.900508291536204e17,2.918636468358202e17,2.936764645180201e17,2.954892822002199e17,2.973020998824198e17,2.991149175646196e17,3.009277352468195e17,3.0274055292901926e17,3.045533706112191e17,3.0636618829341894e17,3.0817900597561875e17,3.099918236578186e17,3.118046413400184e17,3.136174590222183e17,3.154302767044181e17,3.172430943866179e17,3.190559120688177e17,3.208687297510176e17,3.226815474332175e17,3.244943651154173e17,3.2630718279761715e17,3.2812000047981696e17,3.299328181620168e17,3.317456358442166e17,3.335584535264164e17,3.3537127120861626e17,3.3718408889081606e17,3.38996906573016e17,3.408097242552158e17,3.426225419374157e17,3.444353596196154e17,3.4624817730181523e17,3.480609949840151e17,3.498738126662149e17,3.516866303484148e17,3.534994480306146e17,3.5531226571281446e17,3.571250833950142e17,3.5893790107721414e17,3.6075071875941395e17,3.6256353644161376e17,3.643763541238136e17,3.6618917180601344e17,3.680019894882133e17,3.698148071704131e17,3.716276248526129e17,3.7344044253481274e17,3.7525326021701254e17,3.770660778992125e17,3.788788955814123e17,3.8069171326361216e17,3.82504530945812e17,3.843173486280118e17,3.861301663102116e17,3.8794298399241146e17,3.8975580167461126e17,3.915686193568111e17,3.9338143703901094e17,3.9519425472121075e17,3.970070724034107e17,3.9881989008561043e17,4.006327077678103e17,4.024455254500101e17,4.042583431322099e17,4.060711608144098e17,4.078839784966096e17,4.096967961788095e17,4.115096138610092e17,4.133224315432091e17,4.151352492254089e17,4.1694806690760877e17,4.1876088458980864e17,4.2057370227200845e17,4.223865199542083e17,4.241993376364081e17,4.2601215531860794e17,4.2782497300080774e17,4.296377906830076e17,4.314506083652074e17,4.332634260474072e17,4.350762437296071e17,4.36889061411807e17,4.387018790940068e17,4.405146967762066e17,4.4232751445840646e17,4.441403321406063e17,4.459531498228061e17,4.4776596750500595e17,4.4957878518720576e17,4.5139160286940563e17,4.532044205516054e17,4.550172382338053e17,4.568300559160051e17,4.586428735982049e17,4.604556912804048e17,4.622685089626046e17,4.640813266448045e17,4.658941443270042e17,4.677069620092041e17,4.695197796914039e17,4.713325973736038e17,4.731454150558036e17,4.7495823273800346e17,4.767710504202033e17,4.7858386810240314e17,4.8039668578460294e17,4.8220950346680275e17,4.840223211490026e17,4.858351388312024e17,4.8764795651340224e17,4.894607741956021e17,4.912735918778019e17,4.9308640956000186e17,4.948992272422016e17,4.967120449244015e17,4.985248626066013e17,5.0033768028880115e17,5.0215049797100096e17,5.039633156532008e17,5.0577613333540064e17,5.075889510176004e17,5.0940176869980026e17,5.1121458638200006e17,5.130274040642e17,5.148402217463998e17,5.166530394285996e17,5.184658571107995e17,5.202786747929993e17,5.220914924751991e17,5.239043101573989e17,5.257171278395988e17,5.275299455217986e17,5.293427632039984e17,5.311555808861983e17,5.3296839856839814e17,5.3478121625059795e17,5.3659403393279776e17,5.384068516149976e17,5.4021966929719744e17,5.420324869793973e17,5.438453046615971e17,5.456581223437969e17,5.474709400259968e17,5.4928375770819654e17,5.510965753903964e17,5.529093930725963e17,5.5472221075479616e17,5.56535028436996e17,5.583478461191958e17,5.6016066380139565e17,5.619734814835954e17,5.6378629916579526e17,5.655991168479951e17,5.6741193453019494e17,5.6922475221239475e17,5.710375698945947e17,5.728503875767945e17,5.746632052589943e17,5.764760229411941e17,5.782888406233939e17,5.801016583055937e17,5.819144759877937e17,5.837272936699935e17,5.855401113521933e17,5.873529290343931e17,5.891657467165929e17,5.909785643987927e17,5.927913820809926e17,5.946041997631924e17,5.964170174453923e17,5.982298351275921e17,6.000426528097919e17,6.018554704919918e17,6.036682881741916e17,6.054811058563916e17,6.072939235385912e17,6.091067412207912e17,6.10919558902991e17,6.127323765851908e17,6.145451942673906e17,6.163580119495904e17,6.181708296317902e17,6.199836473139901e17,6.217964649961901e17,6.236092826783898e17,6.254221003605896e17,6.272349180427894e17,6.290477357249893e17,6.308605534071891e17,6.326733710893889e17,6.344861887715887e17,6.362990064537887e17,6.381118241359884e17,6.399246418181883e17,6.417374595003881e17,6.435502771825879e17,6.453630948647878e17,6.471759125469876e17,6.489887302291875e17,6.508015479113871e17,6.526143655935872e17,6.544271832757869e17,6.562400009579868e17,6.580528186401866e17,6.598656363223864e17,6.616784540045864e17,6.634912716867862e17,6.65304089368986e17,6.671169070511857e17,6.689297247333857e17,6.707425424155854e17,6.725553600977853e17,6.74368177779985e17,6.76180995462185e17,6.779938131443849e17,6.798066308265846e17,6.816194485087845e17,6.834322661909842e17,6.852450838731841e17,6.870579015553839e17,6.888707192375839e17,6.906835369197836e17,6.924963546019834e17,6.943091722841833e17,6.961219899663831e17,6.97934807648583e17,6.997476253307827e17,7.015604430129827e17,7.033732606951825e17,7.051860783773823e17,7.069988960595821e17,7.088117137417819e17,7.106245314239818e17,7.124373491061816e17,7.142501667883814e17,7.160629844705812e17,7.178758021527812e17,7.19688619834981e17,7.215014375171808e17,7.233142551993806e17,7.251270728815804e17,7.269398905637802e17,7.287527082459802e17,7.3056552592818e17,7.323783436103798e17,7.341911612925795e17,7.360039789747795e17,7.378167966569793e17,7.396296143391791e17,7.41442432021379e17,7.432552497035788e17,7.450680673857787e17,7.468808850679784e17,7.486937027501783e17,7.50506520432378e17,7.52319338114578e17,7.541321557967779e17,7.559449734789777e17,7.577577911611775e17,7.595706088433772e17,7.613834265255772e17,7.631962442077769e17,7.650090618899768e17,7.668218795721765e17,7.686346972543764e17,7.704475149365763e17,7.722603326187762e17,7.74073150300976e17,7.758859679831757e17,7.776987856653757e17,7.795116033475754e17,7.813244210297754e17,7.83137238711975e17,7.84950056394175e17,7.867628740763748e17,7.885756917585746e17,7.903885094407744e17,7.922013271229742e17,7.940141448051743e17,7.95826962487374e17,7.976397801695739e17,7.994525978517736e17,8.012654155339734e17,8.030782332161733e17,8.048910508983731e17,8.067038685805729e17,8.085166862627727e17,8.103295039449725e17,8.121423216271725e17,8.139551393093724e17,8.157679569915721e17,8.175807746737719e17,8.193935923559718e17,8.212064100381716e17,8.230192277203715e17,8.248320454025713e17,8.266448630847711e17,8.28457680766971e17,8.302704984491707e17,8.320833161313706e17,8.338961338135704e17,8.357089514957704e17,8.375217691779702e17,8.3933458686017e17,8.411474045423698e17,8.429602222245695e17,8.447730399067695e17,8.465858575889692e17,8.483986752711692e17,8.502114929533688e17,8.520243106355689e17,8.538371283177687e17,8.556499459999684e17,8.574627636821683e17,8.59275581364368e17,8.610883990465681e17,8.629012167287677e17,8.647140344109677e17,8.665268520931674e17,8.683396697753673e17,8.701524874575671e17,8.719653051397669e17,8.737781228219668e17,8.755909405041665e17,8.774037581863666e17,8.792165758685663e17,8.810293935507662e17,8.828422112329659e17,8.846550289151657e17,8.864678465973656e17,8.882806642795654e17,8.900934819617654e17,8.91906299643965e17,8.937191173261651e17,8.955319350083648e17,8.973447526905646e17,8.991575703727644e17,9.009703880549642e17,9.027832057371642e17,9.04596023419364e17,9.064088411015638e17,9.082216587837636e17,9.100344764659634e17,9.118472941481633e17,9.136601118303631e17,9.15472929512563e17,9.172857471947628e17,9.190985648769627e17,9.209113825591625e17,9.227242002413623e17,9.245370179235621e17,9.263498356057618e17,9.281626532879619e17,9.299754709701617e17,9.317882886523615e17,9.336011063345613e17,9.354139240167612e17,9.37226741698961e17,9.390395593811607e17,9.408523770633606e17,9.426651947455603e17,9.444780124277604e17,9.462908301099601e17,9.4810364779216e17,9.499164654743598e17,9.517292831565595e17,9.535421008387596e17,9.553549185209592e17,9.571677362031592e17,9.589805538853588e17,9.607933715675589e17,9.626061892497586e17,9.644190069319584e17,9.662318246141582e17,9.68044642296358e17,9.698574599785581e17,9.716702776607578e17,9.734830953429577e17,9.752959130251574e17,9.771087307073574e17,9.789215483895571e17,9.807343660717569e17,9.825471837539567e17,9.843600014361565e17,9.861728191183566e17,9.879856368005563e17,9.897984544827562e17,9.916112721649559e17,9.934240898471557e17,9.952369075293556e17,9.970497252115555e17,9.988625428937553e17,1.0006753605759551e18,1.002488178258155e18,1.0043009959403548e18,1.0061138136225546e18,1.0079266313047544e18,1.0097394489869542e18,1.0115522666691542e18,1.013365084351354e18,1.0151779020335538e18,1.0169907197157536e18,1.0188035373979535e18,1.0206163550801533e18,1.022429172762353e18,1.024241990444553e18,1.0260548081267528e18,1.0278676258089527e18,1.0296804434911525e18,1.0314932611733523e18,1.0333060788555521e18,1.0351188965377518e18,1.0369317142199519e18,1.0387445319021516e18,1.0405573495843515e18,1.0423701672665512e18,1.0441829849487512e18,1.045995802630951e18,1.0478086203131507e18,1.0496214379953507e18,1.0514342556775503e18,1.0532470733597504e18,1.0550598910419501e18,1.05687270872415e18,1.0586855264063497e18,1.0604983440885496e18,1.0623111617707494e18,1.0641239794529492e18,1.0659367971351492e18,1.0677496148173489e18,1.0695624324995489e18,1.0713752501817486e18,1.0731880678639485e18,1.0750008855461482e18,1.076813703228348e18,1.078626520910548e18,1.0804393385927478e18,1.0822521562749476e18,1.0840649739571474e18,1.0858777916393475e18,1.0876906093215471e18,1.089503427003747e18,1.0913162446859468e18,1.0931290623681466e18,1.0949418800503465e18,1.0967546977325463e18,1.0985675154147461e18,1.1003803330969459e18,1.1021931507791457e18,1.1040059684613457e18,1.1058187861435455e18,1.1076316038257453e18,1.1094444215079451e18,1.111257239190145e18,1.1130700568723448e18,1.1148828745545445e18,1.1166956922367444e18,1.1185085099189441e18,1.1203213276011442e18,1.122134145283344e18,1.1239469629655438e18,1.1257597806477436e18,1.1275725983299436e18,1.1293854160121434e18,1.131198233694343e18,1.133011051376543e18,1.1348238690587427e18,1.1366366867409427e18,1.1384495044231424e18,1.1402623221053423e18,1.1420751397875421e18,1.143887957469742e18,1.1457007751519419e18,1.1475135928341416e18,1.1493264105163415e18,1.1511392281985412e18,1.152952045880741e18,1.154764863562941e18,1.1565776812451407e18,1.1583904989273405e18,1.1602033166095404e18,1.1620161342917404e18,1.16382895197394e18,1.16564176965614e18,1.1674545873383398e18,1.1692674050205396e18,1.1710802227027395e18,1.1728930403849393e18,1.174705858067139e18,1.176518675749339e18,1.1783314934315387e18,1.1801443111137385e18,1.1819571287959383e18,1.1837699464781384e18,1.1855827641603382e18,1.1873955818425377e18,1.1892083995247375e18,1.1910212172069379e18,1.1928340348891377e18,1.1946468525713372e18,1.196459670253537e18,1.198272487935737e18,1.2000853056179366e18,1.2018981233001364e18,1.2037109409823365e18,1.2055237586645363e18,1.207336576346736e18,1.209149394028936e18,1.210962211711136e18,1.2127750293933356e18,1.2145878470755354e18,1.2164006647577352e18,1.2182134824399352e18,1.2200263001221348e18,1.2218391178043346e18,1.223651935486535e18,1.2254647531687345e18,1.2272775708509343e18,1.229090388533134e18,1.2309032062153341e18,1.2327160238975337e18,1.2345288415797335e18,1.2363416592619333e18,1.238154476944133e18,1.2399672946263332e18,1.241780112308533e18,1.243592929990733e18,1.2454057476729326e18,1.2472185653551324e18,1.2490313830373322e18,1.2508442007195323e18,1.2526570184017318e18,1.2544698360839316e18,1.2562826537661317e18,1.2580954714483315e18,1.2599082891305313e18,1.2617211068127311e18,1.2635339244949312e18,1.2653467421771308e18,1.2671595598593306e18,1.2689723775415304e18,1.2707851952237302e18,1.2725980129059302e18,1.27441083058813e18,1.2762236482703299e18,1.2780364659525297e18,1.2798492836347295e18,1.2816621013169293e18,1.283474918999129e18,1.285287736681329e18,1.2871005543635287e18,1.2889133720457285e18,1.2907261897279286e18,1.2925390074101284e18,1.2943518250923282e18,1.296164642774528e18,1.2979774604567278e18,1.2997902781389276e18,1.3016030958211274e18,1.3034159135033272e18,1.305228731185527e18,1.307041548867727e18,1.3088543665499267e18,1.3106671842321267e18,1.3124800019143265e18,1.3142928195965263e18,1.3161056372787261e18,1.317918454960926e18,1.3197312726431258e18,1.3215440903253253e18,1.3233569080075256e18,1.3251697256897254e18,1.3269825433719252e18,1.3287953610541248e18,1.3306081787363249e18,1.3324209964185247e18,1.3342338141007242e18,1.3360466317829243e18,1.337859449465124e18,1.3396722671473242e18,1.3414850848295237e18,1.3432979025117238e18,1.3451107201939236e18,1.3469235378761231e18,1.348736355558323e18,1.350549173240523e18,1.3523619909227228e18,1.3541748086049224e18,1.3559876262871227e18,1.3578004439693225e18,1.3596132616515223e18,1.3614260793337219e18,1.363238897015922e18,1.3650517146981217e18,1.3668645323803213e18,1.368677350062521e18,1.3704901677447212e18,1.3723029854269212e18,1.3741158031091208e18,1.3759286207913208e18,1.3777414384735206e18,1.3795542561557202e18,1.38136707383792e18,1.38317989152012e18,1.38499270920232e18,1.3868055268845194e18,1.3886183445667192e18,1.3904311622489196e18,1.392243979931119e18,1.394056797613319e18,1.395869615295519e18,1.3976824329777188e18,1.3994952506599183e18,1.4013080683421181e18,1.4031208860243182e18,1.4049337037065178e18,1.4067465213887178e18,1.4085593390709176e18,1.4103721567531177e18,1.4121849744353172e18,1.413997792117517e18,1.415810609799717e18,1.4176234274819167e18,1.4194362451641165e18,1.4212490628463163e18,1.4230618805285166e18,1.4248746982107162e18,1.426687515892916e18,1.4285003335751158e18,1.4303131512573156e18,1.4321259689395154e18,1.4339387866217152e18,1.4357516043039153e18,1.4375644219861148e18,1.439377239668315e18,1.4411900573505147e18,1.4430028750327145e18,1.4448156927149143e18,1.446628510397114e18,1.448441328079314e18,1.4502541457615137e18,1.4520669634437135e18,1.4538797811259133e18,1.4556925988081137e18,1.4575054164903132e18,1.459318234172513e18,1.4611310518547128e18,1.4629438695369126e18,1.4647566872191124e18,1.4665695049013123e18,1.468382322583512e18,1.4701951402657119e18,1.4720079579479117e18,1.4738207756301117e18,1.4756335933123116e18,1.4774464109945114e18,1.4792592286767112e18,1.481072046358911e18,1.4828848640411108e18,1.4846976817233106e18,1.4865104994055104e18,1.48832331708771e18,1.4901361347699103e18,1.49194895245211e18,1.49376177013431e18,1.4955745878165097e18,1.4973874054987095e18,1.4992002231809093e18,1.5010130408631089e18,1.502825858545309e18,1.5046386762275087e18,1.5064514939097088e18,1.5082643115919086e18,1.5100771292741084e18,1.5118899469563082e18,1.5137027646385078e18,1.5155155823207078e18,1.5173284000029076e18,1.5191412176851075e18,1.520954035367307e18,1.5227668530495073e18,1.5245796707317071e18,1.5263924884139067e18,1.5282053060961068e18,1.5300181237783066e18,1.5318309414605064e18,1.533643759142706e18,1.535456576824906e18,1.5372693945071058e18,1.5390822121893053e18,1.5408950298715054e18,1.5427078475537055e18,1.5445206652359053e18,1.5463334829181048e18,1.548146300600305e18,1.5499591182825047e18,1.5517719359647043e18,1.553584753646904e18,1.5553975713291041e18,1.5572103890113042e18,1.5590232066935037e18,1.5608360243757036e18,1.5626488420579036e18,1.5644616597401034e18,1.566274477422303e18,1.568087295104503e18,1.5699001127867028e18,1.5717129304689024e18,1.5735257481511025e18,1.5753385658333025e18,1.5771513835155023e18,1.578964201197702e18,1.5807770188799017e18,1.5825898365621018e18,1.5844026542443013e18,1.586215471926501e18,1.5880282896087012e18,1.5898411072909012e18,1.5916539249731008e18,1.5934667426553006e18,1.5952795603375007e18,1.5970923780197002e18,1.5989051957019e18,1.6007180133840998e18,1.6025308310663e18,1.6043436487484995e18,1.6061564664306995e18,1.6079692841128996e18,1.6097821017950991e18,1.611594919477299e18,1.6134077371594988e18,1.6152205548416988e18,1.6170333725238984e18,1.6188461902060982e18,1.620659007888298e18,1.622471825570498e18,1.6242846432526979e18,1.6260974609348977e18,1.6279102786170977e18,1.6297230962992973e18,1.631535913981497e18,1.633348731663697e18,1.6351615493458967e18,1.6369743670280965e18,1.6387871847102963e18,1.6406000023924964e18,1.6424128200746962e18,1.644225637756896e18,1.6460384554390958e18,1.6478512731212956e18,1.6496640908034954e18,1.6514769084856952e18,1.653289726167895e18,1.6551025438500948e18,1.656915361532295e18,1.6587281792144947e18,1.6605409968966945e18,1.6623538145788943e18,1.6641666322610941e18,1.665979449943294e18,1.6677922676254938e18,1.6696050853076936e18,1.6714179029898934e18,1.6732307206720934e18,1.6750435383542932e18,1.676856356036493e18,1.6786691737186929e18,1.6804819914008924e18,1.6822948090830925e18,1.6841076267652923e18,1.685920444447492e18,1.687733262129692e18,1.689546079811892e18,1.6913588974940918e18,1.6931717151762913e18,1.6949845328584914e18,1.6967973505406912e18,1.698610168222891e18,1.7004229859050906e18,1.7022358035872906e18,1.7040486212694904e18,1.7058614389516902e18,1.7076742566338903e18,1.70948707431609e18,1.71129989199829e18,1.7131127096804895e18,1.7149255273626895e18,1.7167383450448893e18,1.718551162727089e18,1.7203639804092887e18,1.722176798091489e18,1.7239896157736888e18,1.7258024334558884e18,1.7276152511380884e18,1.7294280688202883e18,1.7312408865024878e18,1.7330537041846876e18,1.7348665218668877e18,1.7366793395490875e18,1.738492157231287e18,1.740304974913487e18,1.7421177925956872e18,1.7439306102778867e18,1.7457434279600865e18,1.7475562456422866e18,1.7493690633244864e18,1.751181881006686e18,1.7529946986888858e18,1.7548075163710858e18,1.7566203340532856e18,1.7584331517354854e18,1.7602459694176855e18,1.7620587870998853e18,1.7638716047820849e18,1.7656844224642847e18,1.7674972401464847e18,1.7693100578286845e18,1.771122875510884e18,1.7729356931930842e18,1.7747485108752842e18,1.7765613285574838e18,1.7783741462396836e18,1.7801869639218836e18,1.7819997816040835e18,1.783812599286283e18,1.7856254169684828e18,1.787438234650683e18,1.7892510523328827e18,1.7910638700150825e18,1.7928766876972823e18,1.7946895053794824e18,1.796502323061682e18,1.7983151407438817e18,1.8001279584260818e18,1.8019407761082813e18,1.8037535937904812e18,1.8055664114726812e18,1.8073792291548813e18,1.8091920468370808e18,1.8110048645192806e18]}
},{}],65:[function(require,module,exports){
module.exports={"expected":[1.4695761589768238e-15,-0.1649997180370246,-0.33923507954975585,-0.5341321460714512,-0.7667026350778715,-1.0666381829404812,-1.4946971197136079,-2.2030143870217445,-3.720348820005156,-10.061929312379899,15.490289214534407,4.309828213722031,2.4222891613396134,1.6127216473072736,1.143451157550063,0.8231486998483514,0.5794486674546068,0.378281850390766,0.20075192045619078,0.03460591571169736,-0.12965348528913995,-0.3010944532884739,-0.49046049383818385,-0.7131744560758603,-0.9952939845743605,-1.3882818233807457,-2.014805108952534,-3.265342823479474,-7.437551146934674,33.46283857736457,5.105966289668655,2.681689099287031,1.7446986898797845,1.2265935957367415,0.8829048802213779,0.6266197834750281,0.4183644876830253,0.23700435377150258,0.06929481677571228,-0.09462301714521298,-0.26374045454167155,-0.4482465633865941,-0.6622247959029715,-0.928700772670353,-1.2916227795966932,-1.8511306354317627,-2.902728112825903,-5.887580516682381,-211.99281182756246,6.243837264832961,2.9941599672959147,1.8936364991945749,1.3171072840472575,0.9464276939241545,0.6758820330561904,0.4596247989271404,0.27385637171657706,0.10415048645673185,-0.059821215895612484,-0.22706214716771825,-0.40732227160747253,-0.6135580348424844,-0.8662546952142247,-1.2032349231232324,-1.7071636927931197,-2.6063138895724633,-4.862303927567451,-25.42622168133895,8.008971289054374,3.378869649398155,2.063463278778979,1.4162661931388159,1.0142524012417622,0.7275039136822595,0.5022188760227498,0.31141356955858407,0.13925832020287596,-0.025163208116819658,-0.1909557596198662,-0.36753566134893145,-0.5669149624696186,-0.8074436088685337,-1.1219135952399597,-1.5792584075364342,-2.3589455269523443,-4.132367366286083,-13.506913688294112,11.127708152523095,3.865459396398017,2.259409166249952,1.5256458239186066,1.087011477491627,0.7817921817640507,0.546319688106411,0.3497890752959689,0.17470617321171117,0.009434492078248641,-0.15532343574748458,-0.3287484246305109,-0.5220668206746498,-0.7518298196381182,-1.0466708438299628,-1.4646091370523304,-2.1489161306012163,-3.585079467381201,-9.18095424815871,18.152599210629734,4.502332216795361,2.488595699933757,1.647218920528225,1.1654584768562257,0.8390996311772824,0.5921201643345004,0.38910501824835864,0.2105852594159981,0.044054791205139596,-0.12007211922001164,-0.2908337974262324,-0.4788104282914146,-0.6990365394535151,-0.97668829833471,-1.361021039936681,-1.967962285311665,-3.1586017576813066,-6.9410654426605864,48.91496718140274,5.374292255120322,2.7609773525461616,1.7834900451324645,1.2504992244364845,0.8998347792389396,0.6398368884693965,0.4294942176811867,0.24699112187556396,0.07878081270835646,-0.08511254338823072,-0.25367475442190485,-0.4369641592076429,-0.6487371532968838,-0.9112817934729589,-1.2667518960786888,-1.8100839728696732,-2.816170632519277,-5.568818580316181,-70.66007756370759,6.644693601459579,3.0909075867704643,1.937688767133819,1.3432331107684532,0.9644740369651236,0.6897145615503892,0.47110214372695325,0.28402469720342527,0.1136966976991275,-0.05035830245825125,-0.21716244621635702,-0.39636459843871247,-0.6006466345981885,-0.8498744570566393,-1.1804006289277513,-1.6708186244662375,-2.534556558358057,-4.6400162624804935,-20.499335183578886,8.673803360756336,3.499872802992795,2.114053591055242,1.4450085311074794,1.0335771478232303,0.7420314349117196,0.5140892153431381,0.3217935002258496,0.1488884265887576,-0.01572498289479092,-0.1811948322586982,-0.35686373986843567,-0.5545146186093264,-0.7919759860219194,-1.1008271941528174,-1.5467776996749873,-2.298359992347032,-3.9682245482560443,-11.971890741200939,12.443516159795704,4.0215545374913075,2.318260576808934,1.5574984715292939,1.1078069745161505,0.7971059777947056,0.5586335162987152,0.36041295978906746,0.18444467881537419,0.018870663827504276,-0.14567547116533802,-0.3183266188578646,-0.5101197666984641,-0.7371665078615842,-1.0270939959647847,-1.4353413234823966,-2.0969678543944608,-3.458661278163517,-8.440429657507215,21.915251866389102,4.711915780970378,2.5580906728413257,1.682805341584625,1.1879551400926878,0.855305128190236,0.604934031454013,0.40000794276947776,0.22045774922596986,0.05351152452332695,-0.1105124365033795,-0.2806292952798624,-0.4672651438689862,-0.6850838817055456,-0.9584223677473656,-1.3344514674506134,-1.9228271903539444,-3.0580383251484804,-6.505608406614175,90.85106719514967,5.671281819617753,2.8445067481368094,1.8236091736496,1.2749756562202479,0.9170545916889165,0.6532145336319676,0.4407145113115214,0.2570245417380094,0.08828092019438481,-0.07561733107585808,-0.2436571195962556,-0.4257743973175568,-0.635413608710372,-0.8941597798006627,-1.2424684636905854,-1.7704156972977305,-2.7340936254365076,-5.2818795516754,-42.39101470461424,7.099170166799784,3.193467233977966,1.9833816764700356,1.3700296073885434,0.9828518148348904,0.7037282885968782,0.48268196864101476,0.2942476637828774,0.12326341081344147,-0.04090437650597448,-0.20730322768261764,-0.38548857235913137,-0.5878807423302526,-0.8337548073494858,-1.1580693205789974,-1.6356016124745294,-2.46615084151814,-4.4363741817159275,-17.169336929486157,9.457143615789862,3.629139755935001,2.1667030222720682,1.4745453847224228,1.0532824875254145,0.7567637954942427,0.5260752622071367,0.33223664889219656,0.15854562559562602,-0.006289557715219095,-0.17146722018948093,-0.3462634383068297,-0.542243345884678,-0.7767377936845433,-1.0801742868970492,-1.5152313427369886,-2.240346149927223,-3.8159286218684447,-10.748434459981079,14.109365540319008,4.189961726778627,2.379743901901558,1.5903011783003027,1.1290417550265344,0.8126518474617643,0.5710778303855113,0.3711093398594879,0.19421713626257148,0.028310196115151606,-0.1360539900099314,-0.3079672242245796,-0.49828715760367553,-0.7227057479336798,-1.0078929105452583,-1.4068555920370769,-2.047035173380212,-3.34023261613835,-7.809143923549313,27.639385539313558,4.941000121604384,2.6310230276367217,1.7195399614025868,1.2109617932765668,0.8717742890897093,0.6178950018948005,0.41099347150636867,0.2303713923501014,0.0629778112048862,-0.10097266742349496,-0.27047868522399976,-0.45582120535072096,-0.671310429408879,-0.9404838064389426,-1.3085425918975409,-1.8793004997944018,-2.963114891684161,-6.12051442164548,635.9826284696476,6.0018492367386305,2.932643046056726,1.865132954236776,1.3000480989153522,0.9345749743714775,0.6667580873413865,0.45202850063276334,0.26710673988215583,0.09779686587807736,-0.06613565708501229,-0.2336854358396497,-0.41467417352379443,-0.6222488562901135,-0.8773242302087318,-1.2187477388598338,-1.7320508075689007,-2.6561444590371326,-5.022180509799713,-30.273904647359878,7.618895945573371,3.302398846645761,2.030817223997223,1.3975278930344246,1.0015736061642513,0.7179293425740937,0.49436774181315835,0.30452754785965036,0.13285240062476625,-0.03145774450612263,-0.19748249920221736,-0.37469136940523035,-0.5752556773556167,-0.8178867744530423,-1.1362207129717947,-1.6014549561359432,-2.4008559214308205,-4.2490941225203285,-14.767761718269796,10.393962198919166,3.7675725030758027,2.2215498646329475,1.5049156412977913,1.0733833892239455,0.7717080375836839,0.5381808821059135,0.34274547117688264,0.16823175830874554,0.0031447477575108533,-0.1617710301240556,-0.33573216977395937,-0.5300969886407065,-0.7617213114315934,-1.0599380763779511,-1.4845742119079062,-2.184733967170542,-3.67421735100762,-9.750264457590264,16.286814403660443,4.372231221755187,2.4440514426303106,1.6241032013822347,1.1507337891978626,0.8284379379329548,0.5836569665499471,0.3818808840300745,0.20402547238173815,0.03775477220312043,-0.12645717746189983,-0.2976678539289865,-0.48656528018136874,-0.7084408499302938,-0.9890535501154799,-1.3791161357063495,-1.998994623617457,-3.2290400977949485,-7.264495499118223,37.40186316835589,5.192486671494827,2.7076682518298756,1.7574861265604407,1.234500215072694,0.8885166060125558,0.6310079710312142,0.4220645249639057,0.24032822269799828,0.07245535362129409,-0.09145105670634945,-0.26037974854898666,-0.44447527333862585,-0.6577103466554658,-0.9228607826138486,-1.28326562778653,-1.837290397585281,-2.8733543870902136,-5.77746623789333,-127.19400989357653,6.372100065919855,3.0257952333480325,1.9081442634707018,1.3257432206884598,0.952407068331991,0.6804731117879473,0.4634394038786059,0.27723988101322594,0.10733038781512234,-0.05666580801699639,-0.2237576245672578,-0.4036604647461157,-0.609237771788025,-0.8607650920704407,-1.195566307491725,-1.6949196010305845,-2.5820065007540816,-4.785978131281202,-23.54077855867669,8.219124505230281,3.4183365915029276,2.080105983026782,1.425760995123668,1.0206525898024545,0.7323240844178113,0.5061630332192203,0.31486667163957305,0.14246545818477316,-0.022016718133641353,-0.1876982975899467,-0.36397023426620106,-0.5627669112981322,-0.8022617528708503,-1.1148355568421877,-1.568324779684719,-2.3384534564463646,-4.076250709236395,-12.953555820976174,11.53448890481172,3.9162091707265727,2.2787450169640397,1.5361607194628526,1.0938955726124115,0.7868714839183858,0.550410061051981,0.35332247721669874,0.17794868719627221,0.012579613061542526,-0.1521043921393207,-0.32526740538792753,-0.5180715194346412,-0.7469191196980475,-1.0401025820015868,-1.4547639990087609,-2.131368025741142,-3.5420015893840726,-8.920265509923963,19.254917584359134,4.570184836680418,2.5113946365491673,1.6589572126462435,1.1729019959705946,0.8444727370136083,0.5963754039811042,0.39273032541553454,0.21387164099915063,0.04720607894977149,-0.1168832367581539,-0.2874261700005358,-0.4749505294637765,-0.6943653727480703,-0.970562527622374,-1.3520892583960464,-1.9527325736346646,-3.1244221070305644,-6.789715464806039,57.81088476904496,5.469882355127009,2.7883320086125267,1.796711878420688,1.2585933965555554,0.9055419875182209,0.6442780045063052,0.43322409999301686,0.25033030738517914,0.08194586220775936,-0.08194586220773568,-0.25033030738515416,-0.4332240999930227,-0.6442780045062921,-0.9055419875182558,-1.2585933965554947,-1.7967118784206486,-2.7883320086123202,-5.469882355126721,-57.81088476906135,6.789715464807148,3.124422107030665,1.9527325736347778,1.3520892583959923,0.9705625276224197,0.6943653727480842,0.47495052946377053,0.2874261700005305,0.11688323675816334,-0.04720607894974792,-0.21387164099914088,-0.39273032541552383,-0.5963754039810917,-0.8444727370135923,-1.1729019959705724,-1.6589572126462087,-2.511394636549203,-4.570184836680525,-19.254917584355674,8.920265509925857,3.5420015893843915,2.131368025741272,1.45476399900879,1.0401025820016359,0.7469191196980398,0.518071519434653,0.3252674053879535,0.15210439213933022,-0.012579613061519005,-0.17794868719629192,-0.3533224772166883,-0.5504100610519688,-0.7868714839183477,-1.09389557261236,-1.536160719462869,-2.278745016963894,-3.9162091707266526,-11.534488904810473,12.953555820975346,4.07625070923681,2.338453456446333,1.5683247796848003,1.1148355568422086,0.8022617528708655,0.5627669112981445,0.3639702342662116,0.18769829758995632,0.022016718133636447,-0.14246545818474915,-0.31486667163957843,-0.5061630332192265,-0.7323240844178406,-1.0206525898024066,-1.4257609951235968,-2.0801059830266566,-3.4183365915028094,-8.219124505229644,23.540778558697635,4.785978131281425,2.582006500754262,1.6949196010305656,1.1955663074917475,0.8607650920704322,0.6092377717880182,0.40366046474615963,0.22375762456728251,0.05666580801700573,-0.1073303878151273,-0.2772398810132312,-0.46343940387859456,-0.6804731117879129,-0.9524070683319732,-1.325743220688395,-1.9081442634707904,-3.025795233347938,-6.372100065918876,127.19400989372713,5.777466237894139,2.873354387090168,1.8372903975853219,1.2832656277865546,0.9228607826138395,0.6577103466554587,0.444475273338654,0.2603797485489966,0.09145105670640183,-0.07245535362129903,-0.24032822269800347,-0.422064524963878,-0.6310079710311813,-0.8885166060125137,-1.2345002150727422,-1.7574861265604025,-2.7076682518297983,-5.192486671494566,-37.40186316834286,7.264495499118724,3.2290400977950546,1.9989946236176452,1.3791161357063353,0.9890535501154701,0.7084408499303291,0.4865652801813627,0.29766785392902756,0.1264571774618804,-0.03775477220312534,-0.20402547238171365,-0.3818808840300638,-0.5836569665498775,-0.8284379379329871,-1.150733789197874,-1.6241032013822008,-2.4440514426302458,-4.3722312217552854,-16.286814403657967,9.750264457589793,3.674217351008167,2.1847339671705956,1.4845742119078904,1.0599380763779709,0.7617213114316305,0.5300969886407549,0.33573216977396975,0.16177103012405056,-0.003144747757515757,-0.16823175830873596,-0.34274547117687226,-0.5381808821059015,-0.7717080375836917,-1.0733833892238644,-1.504915641297761,-2.2215498646328924,-3.767572503075661,-10.39396219892125,14.767761718278061,4.249094122520235,2.400855921430787,1.6014549561359763,1.136220712971816,0.8178867744530816,0.575255677355648,0.37469136940522474,0.19748249920221228,0.031457744506131945,-0.13285240062475676,-0.3045275478596091,-0.4943677418131468,-0.7179293425741011,-1.0015736061642326,-1.397527893034397,-2.0308172239971753,-3.3023988466458194,-7.618895945571983,30.273904647381453,5.0221805097999574,2.656144459037093,1.7320508075688812,1.2187477388598569,0.8773242302087231,0.6222488562901067,0.41467417352382197,0.23368543583967452,0.06613565708502164,-0.09779686587805361,-0.26710673988214584,-0.4520285006327693,-0.6667580873413731,-0.9345749743714601,-1.300048098915289,-1.865132954236798,-2.932643046056637,-6.00184923673776,-635.9826284601351,6.120514421645292,2.9631148916841132,1.8793004997945084,1.3085425918975275,0.9404838064389869,0.6713104294089132,0.4558212053507493,0.2704786852240097,0.10097266742350436,-0.06297781120486258,-0.2303713923500916,-0.410993471506391,-0.6178950018947876,-0.8717742890896429,-1.2109617932765788,-1.71953996140255,-2.6310230276365356,-4.941000121603786,-27.639385539306442,7.809143923549009,3.3402326161382905,2.0470351733802605,1.4068555920371046,1.0078929105453345,0.7227057479337156,0.49828715760366943,0.3079672242245898,0.1360539900099409,-0.028310196115142294,-0.1942171362625913,-0.37110933985949346,-0.5710778303854612,-0.8126518474617253,-1.1290417550265457,-1.5903011783002698,-2.379743901901401,-4.189961726778454,-14.109365540319988,10.748434459980507,3.815928621869032,2.2403461499272788,1.515231342737066,1.0801742868970694,0.7767377936845127,0.54224334588469,0.34626343830684014,0.17146722018950514,0.00628955771519998,-0.1585456255956456,-0.3322366488921547,-0.5260752622070886,-0.7567637954942504,-1.0532824875254247,-1.4745453847223933,-2.166703022272096,-3.6291397559348693,-9.457143615790306,17.169336929493113,4.436374181716119,2.4661508415183064,1.635601612474668,1.1580693205790191,0.8337548073494775,0.5878807423302651,0.3854885723591421,0.20730322768258286,0.040904376505983796,-0.12326341081341759,-0.29424766378283645,-0.4826819686409858,-0.7037282885968855,-0.9828518148349,-1.3700296073884757,-1.9833816764700598,-3.19346723397818,-7.099170166798575,42.391014704630976,5.281879551675669,2.734093625436707,1.770415697297769,1.242468463690573,0.8941597798006795,0.6354136087103851,0.42577439731758454,0.24365711959625042,0.07561733107586745,-0.08828092019436112,-0.25702454173799955,-0.4407145113115273,-0.6532145336319746,-0.9170545916888994,-1.2749756562202608,-1.8236091736494984,-2.8445067481365958,-5.671281819616973,-90.85106719507284,6.505608406614578,3.0580383251487238,1.9228271903538547,1.3344514674505996,0.9584223677473833,0.685083881705601,0.46726514386898027,0.28062929527987246,0.1105124365034033,-0.053511524523303364,-0.2204577492259452,-0.4000079427694834,-0.6049340314540197,-0.8553051281902445,-1.1879551400926311,-1.6828053415845892,-2.5580906728411485,-4.711915780970163,-21.915251866384622,8.440429657507888,3.4586612781636377,2.0969678543943577,1.4353413234823817,1.0270939959648622,0.7371665078616205,0.5101197666984579,0.3183266188578749,0.14567547116536206,-0.018870663827494964,-0.18444467881537926,-0.360412959789073,-0.5586335162986656,-0.7971059777946903,-1.107806974516098,-1.5574984715292133,-2.3182605768089655,-4.021554537491148,-12.443516159794255,11.971890741204334,3.9682245482557246,2.2983599923470903,1.5467776996751152,1.1008271941529009,0.7919759860219114,0.5545146186093385,0.3568637398684622,0.18119483225869312,0.015724982894814443,-0.1488884265887626,-0.3217935002258237,-0.5140892153431263,-0.7420314349116831,-1.033577147823211,-1.4450085311075382,-2.114053591055269,-3.4998728029926713,-8.673803360754544,20.499335183570835,4.640016262480704,2.5345565583582315,1.6708186244663537,1.1804006289277906,0.8498744570566309,0.6006466345982108,0.3963645984387068,0.21716244621635933,0.050358302458232085,-0.11369669769910368,-0.2840246972034229,-0.47110214372693315,-0.689714561550344,-0.9644740369651056,-1.343233110768487,-1.9376887671337746,-3.0909075867703657,-6.644693601458517,70.66007756375406,5.568818580316706,2.816170632519487,1.8100839728697435,1.2667518960786759,0.9112817934729499,0.648737153296897,0.4369641592076371,0.25367475442193743,0.08511254338825441,-0.07878081270835424,-0.24699112187555408,-0.42949421768116725,-0.6398368884693934,-0.8998347792389743,-1.250499224436497,-1.7834900451324256,-2.7609773525457753,-5.374292255120255,-48.91496718136345,6.941065442661393,3.158601757681253,1.967962285311745,1.3610210399366671,0.9766882983347283,0.6990365394535077,0.47881042829145226,0.2908337974262425,0.12007211922002828,-0.04405479120513739,-0.21058525941598838,-0.3891050182483234,-0.5921201643345263,-0.8390996311773029,-1.1654584768561869,-1.647218920528085,-2.4885956999335876,-4.502332216795314,-18.15259921062431,9.180954248160715,3.58507946738133,2.148916130601189,1.464609137052315,1.0466708438299674,0.751829819638155,0.5220668206746888,0.3287484246305291,0.15532343574748683,-0.009434492078239333,-0.17470617321169427,-0.3497890752959744,-0.5463196881064358,-0.7817921817640243,-1.0870114774915447,-1.525645823918552,-2.259409166249982,-3.8654593963978687,-11.127708152521047,13.506913688294516,4.132367366286251,2.3589455269523123,1.5792584075365412,1.1219135952400128,0.8074436088685842,0.5669149624696215,0.36753566134890975,0.1909557596198685,0.02516320811682897,-0.13925832020285198,-0.31141356955860505,-0.5022188760227293,-0.7275039136822236,-1.0142524012417002,-1.4162661931387663,-2.063463278779005,-3.3788696493979518,-8.008971289054694,25.426221681344977,4.8623039275671545,2.6063138895726463,1.7071636927931562,1.2032349231232726,0.8662546952142783,0.6135580348424972,0.4073222716074751,0.22706214716772802,0.059821215895621824,-0.1041504864567368,-0.27385637171656707,-0.45962479892712055,-0.6758820330561458,-0.9464276939241368,-1.317107284047271,-1.8936364991945323,-2.994159967295822,-6.243837264833157,211.99281182893876,5.8875805166832205,2.902728112825924,1.8511306354318353,1.291622779596756,0.9287007726703571,0.6622247959029439,0.4482465633865882,0.2637404545416815,0.09462301714525823,-0.06929481677570293,-0.23700435377148527,-0.4183644876829893,-0.6266197834750251,-0.8829048802213487,-1.2265935957367538,-1.744698689879747,-2.6816890992871296,-5.105966289667826,-33.462838577346176,7.437551146933998,3.2653428234794992,2.014805108952581,1.3882818233808354,0.9952939845743225,0.7131744560758528,0.4904604938381866,0.30109445328851503,0.12965348528912773,-0.034605915711695155,-0.2007519204561737,-0.3782818503907716,-0.5794486674545849,-0.8231486998483596,-1.1434511575500415,-1.61272164730724,-2.4222891613394517,-4.309828213721431,-15.490289214530453,10.061929312379398,3.7203488200052943,2.203014387021882,1.4946971197135002,1.0666381829404556,0.7667026350779089,0.5341321460714997,0.33923507954977417,0.16499971803702684,7.83773951454306e-15],"x":[-37.69911184307752,-37.862638187408514,-38.02616453173952,-38.189690876070514,-38.35321722040152,-38.516743564732515,-38.680269909063526,-38.843796253394515,-39.00732259772552,-39.17084894205652,-39.33437528638752,-39.49790163071852,-39.66142797504952,-39.824954319380524,-39.98848066371151,-40.15200700804252,-40.315533352373514,-40.479059696704525,-40.64258604103552,-40.806112385366525,-40.96963872969753,-41.133165074028526,-41.29669141835952,-41.46021776269052,-41.62374410702152,-41.78727045135252,-41.95079679568353,-42.11432314001453,-42.27784948434553,-42.44137582867652,-42.604902173007524,-42.76842851733853,-42.931954861669524,-43.09548120600053,-43.259007550331525,-43.42253389466253,-43.58606023899352,-43.74958658332452,-43.91311292765552,-44.07663927198653,-44.240165616317526,-44.40369196064853,-44.567218304979534,-44.73074464931053,-44.89427099364153,-45.057797337972524,-45.22132368230353,-45.384850026634524,-45.548376370965535,-45.71190271529653,-45.875429059627535,-46.038955403958525,-46.20248174828953,-46.36600809262053,-46.52953443695153,-46.69306078128253,-46.85658712561353,-47.02011346994453,-47.18363981427554,-47.34716615860653,-47.51069250293752,-47.674218847268534,-47.83774519159953,-48.001271535930535,-48.16479788026153,-48.328324224592535,-48.49185056892353,-48.65537691325453,-48.81890325758553,-48.98242960191653,-49.14595594624754,-49.309482290578536,-49.47300863490954,-49.63653497924054,-49.80006132357153,-49.96358766790253,-50.127114012233534,-50.29064035656454,-50.454166700895534,-50.617693045226545,-50.78121938955754,-50.94474573388853,-51.10827207821953,-51.27179842255054,-51.435324766881536,-51.59885111121254,-51.762377455543536,-51.92590379987454,-52.08943014420554,-52.25295648853654,-52.41648283286754,-52.580009177198534,-52.743535521529544,-52.90706186586054,-53.070588210191545,-53.23411455452254,-53.39764089885354,-53.561167243184535,-53.72469358751554,-53.88821993184654,-54.05174627617754,-54.21527262050855,-54.37879896483955,-54.542325309170536,-54.70585165350154,-54.869377997832544,-55.03290434216354,-55.196430686494544,-55.35995703082554,-55.523483375156545,-55.687009719487556,-55.850536063818545,-56.01406240814954,-56.17758875248054,-56.34111509681155,-56.504641441142546,-56.66816778547355,-56.831694129804546,-56.99522047413554,-57.15874681846654,-57.32227316279754,-57.48579950712855,-57.649325851459544,-57.812852195790555,-57.97637854012155,-58.13990488445254,-58.303431228783545,-58.46695757311455,-58.630483917445545,-58.79401026177655,-58.95753660610755,-59.12106295043855,-59.28458929476955,-59.44811563910055,-59.61164198343155,-59.77516832776254,-59.938694672093554,-60.10222101642455,-60.265747360755554,-60.42927370508656,-60.59280004941755,-60.756326393748544,-60.919852738079555,-61.08337908241055,-61.24690542674155,-61.41043177107255,-61.573958115403556,-61.737484459734546,-61.90101080406556,-62.06453714839655,-62.22806349272755,-62.391589837058554,-62.55511618138956,-62.718642525720554,-62.88216887005156,-63.045695214382555,-63.20922155871355,-63.37274790304455,-63.53627424737556,-63.699800591706556,-63.86332693603756,-64.02685328036856,-64.19037962469956,-64.35390596903055,-64.51743231336155,-64.68095865769256,-64.84448500202356,-65.00801134635456,-65.17153769068555,-65.33506403501656,-65.49859037934756,-65.66211672367857,-65.82564306800955,-65.98916941234054,-66.15269575667156,-66.31622210100255,-66.47974844533356,-66.64327478966456,-66.80680113399556,-66.97032747832655,-67.13385382265757,-67.29738016698856,-67.46090651131956,-67.62443285565057,-67.78795919998156,-67.95148554431256,-68.11501188864355,-68.27853823297457,-68.44206457730557,-68.60559092163656,-68.76911726596757,-68.93264361029856,-69.09616995462956,-69.25969629896056,-69.42322264329157,-69.58674898762257,-69.75027533195356,-69.91380167628456,-70.07732802061557,-70.24085436494657,-70.40438070927756,-70.56790705360858,-70.73143339793957,-70.89495974227056,-71.05848608660156,-71.22201243093257,-71.38553877526357,-71.54906511959456,-71.71259146392558,-71.87611780825657,-72.03964415258756,-72.20317049691857,-72.36669684124956,-72.53022318558057,-72.69374952991157,-72.85727587424257,-73.02080221857356,-73.18432856290457,-73.34785490723557,-73.51138125156658,-73.67490759589758,-73.83843394022857,-74.00196028455957,-74.16548662889056,-74.32901297322158,-74.49253931755257,-74.65606566188357,-74.81959200621458,-74.98311835054557,-75.14664469487657,-75.31017103920757,-75.47369738353858,-75.63722372786958,-75.80075007220057,-75.96427641653158,-76.12780276086256,-76.29132910519357,-76.45485544952457,-76.61838179385558,-76.78190813818658,-76.94543448251757,-77.10896082684857,-77.27248717117958,-77.43601351551058,-77.59953985984157,-77.76306620417259,-77.92659254850358,-78.09011889283457,-78.25364523716557,-78.41717158149658,-78.58069792582758,-78.74422427015858,-78.90775061448959,-79.07127695882058,-79.23480330315158,-79.39832964748258,-79.56185599181357,-79.72538233614458,-79.88890868047558,-80.05243502480658,-80.21596136913757,-80.37948771346858,-80.54301405779958,-80.70654040213059,-80.87006674646159,-81.03359309079258,-81.19711943512358,-81.36064577945457,-81.52417212378559,-81.68769846811658,-81.85122481244758,-82.01475115677859,-82.17827750110958,-82.3418038454406,-82.50533018977158,-82.66885653410259,-82.83238287843359,-82.99590922276458,-83.15943556709558,-83.32296191142657,-83.48648825575758,-83.65001460008858,-83.81354094441959,-83.97706728875059,-84.14059363308158,-84.30411997741258,-84.46764632174359,-84.63117266607459,-84.79469901040558,-84.9582253547366,-85.12175169906759,-85.28527804339859,-85.44880438772958,-85.61233073206058,-85.7758570763916,-85.93938342072259,-86.1029097650536,-86.26643610938459,-86.42996245371559,-86.5934887980466,-86.75701514237758,-86.92054148670859,-87.08406783103959,-87.2475941753706,-87.41112051970158,-87.5746468640326,-87.73817320836359,-87.9016995526946,-88.0652258970256,-88.22875224135659,-88.39227858568759,-88.55580493001858,-88.7193312743496,-88.88285761868059,-89.04638396301158,-89.2099103073426,-89.37343665167359,-89.5369629960046,-89.7004893403356,-89.8640156846666,-90.0275420289976,-90.19106837332859,-90.3545947176596,-90.51812106199058,-90.68164740632159,-90.84517375065259,-91.0087000949836,-91.1722264393146,-91.3357527836456,-91.49927912797659,-91.66280547230758,-91.8263318166386,-91.9898581609696,-92.15338450530061,-92.3169108496316,-92.4804371939626,-92.6439635382936,-92.8074898826246,-92.97101622695561,-93.13454257128659,-93.2980689156176,-93.4615952599486,-93.6251216042796,-93.7886479486106,-93.95217429294159,-94.11570063727261,-94.2792269816036,-94.4427533259346,-94.6062796702656,-94.76980601459661,-94.9333323589276,-95.0968587032586,-95.2603850475896,-95.4239113919206,-95.58743773625162,-95.75096408058259,-95.91449042491361,-96.0780167692446,-96.24154311357562,-96.4050694579066,-96.5685958022376,-96.7321221465686,-96.8956484908996,-97.05917483523062,-97.22270117956161,-97.38622752389261,-97.5497538682236,-97.71328021255461,-97.8768065568856,-98.0403329012166,-98.2038592455476,-98.36738558987861,-98.53091193420961,-98.6944382785406,-98.8579646228716,-99.02149096720261,-99.18501731153361,-99.34854365586462,-99.5120700001956,-99.67559634452661,-99.83912268885761,-100.00264903318859,-100.16617537751962,-100.3297017218506,-100.49322806618162,-100.65675441051262,-100.82028075484361,-100.98380709917461,-101.1473334435056,-101.31085978783662,-101.47438613216761,-101.63791247649861,-101.8014388208296,-101.96496516516062,-102.12849150949161,-102.29201785382263,-102.45554419815362,-102.61907054248461,-102.78259688681563,-102.9461232311466,-103.10964957547762,-103.27317591980861,-103.43670226413963,-103.60022860847062,-103.7637549528016,-103.92728129713261,-104.09080764146361,-104.25433398579463,-104.41786033012562,-104.58138667445662,-104.74491301878761,-104.90843936311862,-105.0719657074496,-105.23549205178061,-105.39901839611161,-105.56254474044262,-105.72607108477364,-105.88959742910461,-106.05312377343562,-106.21665011776662,-106.38017646209762,-106.54370280642863,-106.70722915075962,-106.87075549509062,-107.03428183942162,-107.1978081837526,-107.36133452808363,-107.52486087241462,-107.68838721674562,-107.85191356107663,-108.01543990540762,-108.17896624973862,-108.34249259406961,-108.50601893840063,-108.66954528273162,-108.83307162706262,-108.99659797139361,-109.16012431572463,-109.32365066005563,-109.48717700438664,-109.65070334871763,-109.81422969304862,-109.97775603737963,-110.14128238171061,-110.30480872604163,-110.46833507037262,-110.63186141470364,-110.79538775903463,-110.95891410336561,-111.12244044769663,-111.28596679202762,-111.44949313635864,-111.61301948068963,-111.77654582502063,-111.94007216935162,-112.10359851368263,-112.26712485801362,-112.43065120234462,-112.59417754667562,-112.75770389100663,-112.92123023533765,-113.08475657966862,-113.24828292399962,-113.41180926833063,-113.57533561266163,-113.73886195699264,-113.90238830132363,-114.06591464565463,-114.22944098998563,-114.39296733431661,-114.55649367864763,-114.72002002297863,-114.88354636730963,-115.04707271164064,-115.21059905597163,-115.37412540030263,-115.53765174463364,-115.70117808896464,-115.86470443329563,-116.02823077762663,-116.19175712195762,-116.35528346628864,-116.51880981061964,-116.68233615495065,-116.84586249928164,-117.00938884361263,-117.17291518794364,-117.33644153227462,-117.49996787660564,-117.66349422093663,-117.82702056526765,-117.99054690959863,-118.15407325392962,-118.31759959826064,-118.48112594259163,-118.64465228692265,-118.80817863125364,-118.97170497558464,-119.13523131991563,-119.29875766424664,-119.46228400857763,-119.62581035290863,-119.78933669723965,-119.95286304157064,-120.11638938590166,-120.27991573023263,-120.44344207456363,-120.60696841889464,-120.77049476322564,-120.93402110755665,-121.09754745188764,-121.26107379621864,-121.42460014054964,-121.58812648488066,-121.75165282921164,-121.91517917354264,-122.07870551787364,-122.24223186220465,-122.40575820653564,-122.56928455086664,-122.73281089519764,-122.89633723952865,-123.05986358385964,-123.22338992819064,-123.38691627252165,-123.55044261685265,-123.71396896118365,-123.87749530551466,-124.04102164984565,-124.20454799417664,-124.36807433850765,-124.53160068283863,-124.69512702716965,-124.85865337150064,-125.02217971583165,-125.18570606016264,-125.34923240449363,-125.51275874882465,-125.67628509315564,-125.83981143748666,-126.00333778181765,-126.16686412614865,-126.33039047047964,-126.49391681481065,-126.65744315914166,-126.82096950347264,-126.98449584780366,-127.14802219213465,-127.31154853646565,-127.47507488079664,-127.63860122512766,-127.80212756945865,-127.96565391378965,-128.12918025812064,-128.29270660245166,-128.45623294678265,-128.61975929111367,-128.78328563544466,-128.94681197977565,-129.11033832410666,-129.27386466843765,-129.43739101276867,-129.60091735709963,-129.76444370143065,-129.92797004576164,-130.09149639009266,-130.25502273442365,-130.41854907875464,-130.58207542308566,-130.74560176741664,-130.90912811174766,-131.07265445607865,-131.23618080040967,-131.39970714474066,-131.56323348907165,-131.72675983340264,-131.89028617773366,-132.05381252206467,-132.21733886639566,-132.38086521072665,-132.54439155505764,-132.70791789938866,-132.87144424371965,-133.03497058805067,-133.19849693238166,-133.36202327671265,-133.52554962104367,-133.68907596537466,-133.85260230970567,-134.01612865403666,-134.17965499836765,-134.34318134269867,-134.50670768702966,-134.67023403136065,-134.83376037569167,-134.99728672002263,-135.16081306435368,-135.32433940868466,-135.48786575301565,-135.65139209734664,-135.81491844167766,-135.97844478600868,-136.14197113033967,-136.30549747467066,-136.46902381900165,-136.63255016333267,-136.79607650766366,-136.95960285199467,-137.12312919632564,-137.28665554065668,-137.45018188498767,-137.61370822931866,-137.77723457364968,-137.94076091798064,-138.1042872623117,-138.26781360664268,-138.43133995097367,-138.59486629530466,-138.75839263963564,-138.9219189839667,-139.08544532829768,-139.24897167262867,-139.41249801695966,-139.57602436129068,-139.73955070562167,-139.90307704995269,-140.06660339428365,-140.23012973861466,-140.39365608294568,-140.55718242727667,-140.72070877160766,-140.88423511593865,-141.04776146026967,-141.2112878046007,-141.37481414893168,-141.53834049326267,-141.70186683759366,-141.86539318192467,-142.0289195262557,-142.19244587058665,-142.35597221491767,-142.51949855924866,-142.68302490357968,-142.8465512479107,-143.01007759224166,-143.17360393657268,-143.3371302809037,-143.50065662523468,-143.66418296956567,-143.82770931389666,-143.99123565822765,-144.1547620025587,-144.3182883468897,-144.48181469122068,-144.64534103555167,-144.80886737988266,-144.97239372421367,-145.1359200685447,-145.29944641287568,-145.46297275720667,-145.6264991015377,-145.79002544586868,-145.95355179019967,-146.11707813453066,-146.28060447886168,-146.4441308231927,-146.60765716752368,-146.77118351185467,-146.9347098561857,-147.0982362005167,-147.26176254484767,-147.42528888917866,-147.58881523350968,-147.75234157784067,-147.91586792217169,-148.0793942665027,-148.2429206108337,-148.40644695516468,-148.56997329949567,-148.7334996438267,-148.89702598815768,-149.06055233248867,-149.22407867681966,-149.3876050211507,-149.5511313654817,-149.71465770981268,-149.8781840541437,-150.04171039847466,-150.20523674280568,-150.36876308713667,-150.5322894314677,-150.69581577579868,-150.85934212012967,-151.0228684644607,-151.1863948087917,-151.3499211531227,-151.51344749745365,-151.6769738417847,-151.8405001861157,-152.00402653044668,-152.16755287477767,-152.3310792191087,-152.4946055634397,-152.6581319077707,-152.82165825210168,-152.98518459643267,-153.14871094076366,-153.31223728509468,-153.4757636294257,-153.6392899737567,-153.80281631808768,-153.9663426624187,-154.12986900674971,-154.2933953510807,-154.45692169541167,-154.62044803974268,-154.7839743840737,-154.9475007284047,-155.11102707273568,-155.2745534170667,-155.43807976139772,-155.6016061057287,-155.76513245005967,-155.92865879439069,-156.09218513872167,-156.2557114830527,-156.4192378273837,-156.5827641717147,-156.7462905160457,-156.90981686037668,-157.07334320470773,-157.23686954903872,-157.40039589336968,-157.56392223770067,-157.7274485820317,-157.8909749263627,-158.0545012706937,-158.2180276150247,-158.3815539593557,-158.54508030368672,-158.70860664801768,-158.8721329923487,-159.0356593366797,-159.19918568101068,-159.3627120253417,-159.5262383696727,-159.6897647140037,-159.8532910583347,-160.01681740266574,-160.1803437469967,-160.3438700913277,-160.50739643565868,-160.6709227799897,-160.8344491243207,-160.9979754686517,-161.1615018129827,-161.3250281573137,-161.48855450164473,-161.6520808459757,-161.8156071903067,-161.9791335346377,-162.1426598789687,-162.3061862232997,-162.46971256763072,-162.6332389119617,-162.7967652562927,-162.9602916006237,-163.1238179449547,-163.2873442892857,-163.4508706336167,-163.6143969779477,-163.77792332227872,-163.9414496666097,-164.1049760109407,-164.26850235527172,-164.43202869960268,-164.5955550439337,-164.7590813882647,-164.9226077325957,-165.0861340769267,-165.2496604212577,-165.41318676558873,-165.57671310991972,-165.7402394542507,-165.90376579858167,-166.06729214291272,-166.2308184872437,-166.3943448315747,-166.5578711759057,-166.7213975202367,-166.88492386456772,-167.0484502088987,-167.21197655322973,-167.3755028975607,-167.5390292418917,-167.7025555862227,-167.86608193055372,-168.0296082748847,-168.1931346192157,-168.35666096354672,-168.52018730787773,-168.68371365220872,-168.84723999653968,-169.0107663408707,-169.17429268520172,-169.3378190295327,-169.5013453738637,-169.66487171819472,-169.82839806252574,-169.99192440685673,-170.1554507511877,-170.3189770955187,-170.4825034398497,-170.6460297841807,-170.80955612851173,-170.97308247284272,-171.1366088171737,-171.3001351615047,-171.46366150583574,-171.6271878501667,-171.7907141944977,-171.95424053882869,-172.11776688315973,-172.28129322749072,-172.4448195718217,-172.60834591615273,-172.77187226048372,-172.93539860481474,-173.0989249491457,-173.26245129347672,-173.4259776378077,-173.58950398213872,-173.75303032646974,-173.91655667080073,-174.08008301513172,-174.2436093594627,-174.40713570379376,-174.57066204812472,-174.7341883924557,-174.8977147367867,-175.0612410811177,-175.22476742544873,-175.38829376977972,-175.55182011411074,-175.71534645844173,-175.87887280277275,-176.0423991471037,-176.20592549143473,-176.36945183576572,-176.5329781800967,-176.69650452442772,-176.86003086875874,-177.02355721308973,-177.18708355742072,-177.3506099017517,-177.51413624608273,-177.67766259041372,-177.8411889347447,-178.00471527907573,-178.16824162340674,-178.33176796773773,-178.49529431206872,-178.65882065639974,-178.8223470007307,-178.98587334506172,-179.14939968939274,-179.31292603372373,-179.47645237805472,-179.63997872238573,-179.80350506671675,-179.96703141104774,-180.13055775537873,-180.2940840997097,-180.45761044404074,-180.62113678837173,-180.78466313270272,-180.94818947703374,-181.11171582136473,-181.27524216569574,-181.43876851002673,-181.60229485435775,-181.7658211986887,-181.92934754301973,-182.09287388735072,-182.25640023168174,-182.41992657601273,-182.58345292034372,-182.74697926467476,-182.91050560900575,-183.0740319533367,-183.2375582976677,-183.40108464199872,-183.56461098632974,-183.72813733066073,-183.89166367499172,-184.05519001932274,-184.21871636365375,-184.38224270798474,-184.54576905231573,-184.70929539664672,-184.8728217409777,-185.03634808530873,-185.19987442963975,-185.36340077397074,-185.52692711830173,-185.69045346263275,-185.85397980696376,-186.01750615129473,-186.18103249562571,-186.34455883995673,-186.50808518428775,-186.67161152861874,-186.83513787294973,-186.99866421728075,-187.16219056161174,-187.32571690594276,-187.48924325027372,-187.65276959460473,-187.81629593893572,-187.97982228326674,-188.14334862759776,-188.30687497192875,-188.47040131625974,-188.63392766059073,-188.79745400492178,-188.96098034925274,-189.12450669358373,-189.28803303791472,-189.45155938224573,-189.61508572657675,-189.77861207090774,-189.94213841523876,-190.10566475956975,-190.26919110390077,-190.43271744823173,-190.59624379256275,-190.75977013689374,-190.92329648122472,-191.08682282555574,-191.25034916988676,-191.41387551421775,-191.57740185854874,-191.74092820287976,-191.90445454721075,-192.06798089154174,-192.23150723587273,-192.39503358020374,-192.55855992453476,-192.72208626886575,-192.88561261319674,-193.04913895752776,-193.21266530185872,-193.37619164618974,-193.53971799052076,-193.70324433485175,-193.86677067918274,-194.03029702351375,-194.19382336784477,-194.35734971217576,-194.52087605650675,-194.6844024008377,-194.84792874516876,-195.01145508949975,-195.17498143383074,-195.33850777816176,-195.50203412249274,-195.66556046682376,-195.82908681115475,-195.99261315548577,-196.15613949981673,-196.31966584414775,-196.48319218847877,-196.64671853280976,-196.81024487714075,-196.97377122147174,-197.13729756580278,-197.30082391013377,-197.46435025446476,-197.62787659879572,-197.79140294312677,-197.95492928745776,-198.11845563178875,-198.28198197611977,-198.44550832045076,-198.60903466478177,-198.77256100911276,-198.93608735344375,-199.09961369777474,-199.26314004210573,-199.42666638643675,-199.59019273076777,-199.75371907509876,-199.91724541942975,-200.0807717637608,-200.24429810809178,-200.40782445242274,-200.57135079675373,-200.73487714108475,-200.89840348541577,-201.06192982974676]}
},{}],66:[function(require,module,exports){
module.exports={"expected":[-1.4695761589768238e-15,0.1649997180370246,0.33923507954975585,0.5341321460714512,0.7667026350778715,1.0666381829404812,1.4946971197136079,2.2030143870217445,3.720348820005156,10.061929312379899,-15.490289214534407,-4.309828213722031,-2.4222891613396134,-1.6127216473072736,-1.143451157550063,-0.8231486998483514,-0.5794486674546068,-0.378281850390766,-0.20075192045619078,-0.03460591571169736,0.12965348528913995,0.3010944532884739,0.49046049383818385,0.7131744560758603,0.9952939845743605,1.3882818233807457,2.014805108952534,3.265342823479474,7.437551146934674,-33.46283857736457,-5.105966289668655,-2.681689099287031,-1.7446986898797845,-1.2265935957367415,-0.8829048802213779,-0.6266197834750281,-0.4183644876830253,-0.23700435377150258,-0.06929481677571228,0.09462301714521298,0.26374045454167155,0.4482465633865941,0.6622247959029715,0.928700772670353,1.2916227795966932,1.8511306354317627,2.902728112825903,5.887580516682381,211.99281182756246,-6.243837264832961,-2.9941599672959147,-1.8936364991945749,-1.3171072840472575,-0.9464276939241545,-0.6758820330561904,-0.4596247989271404,-0.27385637171657706,-0.10415048645673185,0.059821215895612484,0.22706214716771825,0.40732227160747253,0.6135580348424844,0.8662546952142247,1.2032349231232324,1.7071636927931197,2.6063138895724633,4.862303927567451,25.42622168133895,-8.008971289054374,-3.378869649398155,-2.063463278778979,-1.4162661931388159,-1.0142524012417622,-0.7275039136822595,-0.5022188760227498,-0.31141356955858407,-0.13925832020287596,0.025163208116819658,0.1909557596198662,0.36753566134893145,0.5669149624696186,0.8074436088685337,1.1219135952399597,1.5792584075364342,2.3589455269523443,4.132367366286083,13.506913688294112,-11.127708152523095,-3.865459396398017,-2.259409166249952,-1.5256458239186066,-1.087011477491627,-0.7817921817640507,-0.546319688106411,-0.3497890752959689,-0.17470617321171117,-0.009434492078248641,0.15532343574748458,0.3287484246305109,0.5220668206746498,0.7518298196381182,1.0466708438299628,1.4646091370523304,2.1489161306012163,3.585079467381201,9.18095424815871,-18.152599210629734,-4.502332216795361,-2.488595699933757,-1.647218920528225,-1.1654584768562257,-0.8390996311772824,-0.5921201643345004,-0.38910501824835864,-0.2105852594159981,-0.044054791205139596,0.12007211922001164,0.2908337974262324,0.4788104282914146,0.6990365394535151,0.97668829833471,1.361021039936681,1.967962285311665,3.1586017576813066,6.9410654426605864,-48.91496718140274,-5.374292255120322,-2.7609773525461616,-1.7834900451324645,-1.2504992244364845,-0.8998347792389396,-0.6398368884693965,-0.4294942176811867,-0.24699112187556396,-0.07878081270835646,0.08511254338823072,0.25367475442190485,0.4369641592076429,0.6487371532968838,0.9112817934729589,1.2667518960786888,1.8100839728696732,2.816170632519277,5.568818580316181,70.66007756370759,-6.644693601459579,-3.0909075867704643,-1.937688767133819,-1.3432331107684532,-0.9644740369651236,-0.6897145615503892,-0.47110214372695325,-0.28402469720342527,-0.1136966976991275,0.05035830245825125,0.21716244621635702,0.39636459843871247,0.6006466345981885,0.8498744570566393,1.1804006289277513,1.6708186244662375,2.534556558358057,4.6400162624804935,20.499335183578886,-8.673803360756336,-3.499872802992795,-2.114053591055242,-1.4450085311074794,-1.0335771478232303,-0.7420314349117196,-0.5140892153431381,-0.3217935002258496,-0.1488884265887576,0.01572498289479092,0.1811948322586982,0.35686373986843567,0.5545146186093264,0.7919759860219194,1.1008271941528174,1.5467776996749873,2.298359992347032,3.9682245482560443,11.971890741200939,-12.443516159795704,-4.0215545374913075,-2.318260576808934,-1.5574984715292939,-1.1078069745161505,-0.7971059777947056,-0.5586335162987152,-0.36041295978906746,-0.18444467881537419,-0.018870663827504276,0.14567547116533802,0.3183266188578646,0.5101197666984641,0.7371665078615842,1.0270939959647847,1.4353413234823966,2.0969678543944608,3.458661278163517,8.440429657507215,-21.915251866389102,-4.711915780970378,-2.5580906728413257,-1.682805341584625,-1.1879551400926878,-0.855305128190236,-0.604934031454013,-0.40000794276947776,-0.22045774922596986,-0.05351152452332695,0.1105124365033795,0.2806292952798624,0.4672651438689862,0.6850838817055456,0.9584223677473656,1.3344514674506134,1.9228271903539444,3.0580383251484804,6.505608406614175,-90.85106719514967,-5.671281819617753,-2.8445067481368094,-1.8236091736496,-1.2749756562202479,-0.9170545916889165,-0.6532145336319676,-0.4407145113115214,-0.2570245417380094,-0.08828092019438481,0.07561733107585808,0.2436571195962556,0.4257743973175568,0.635413608710372,0.8941597798006627,1.2424684636905854,1.7704156972977305,2.7340936254365076,5.2818795516754,42.39101470461424,-7.099170166799784,-3.193467233977966,-1.9833816764700356,-1.3700296073885434,-0.9828518148348904,-0.7037282885968782,-0.48268196864101476,-0.2942476637828774,-0.12326341081344147,0.04090437650597448,0.20730322768261764,0.38548857235913137,0.5878807423302526,0.8337548073494858,1.1580693205789974,1.6356016124745294,2.46615084151814,4.4363741817159275,17.169336929486157,-9.457143615789862,-3.629139755935001,-2.1667030222720682,-1.4745453847224228,-1.0532824875254145,-0.7567637954942427,-0.5260752622071367,-0.33223664889219656,-0.15854562559562602,0.006289557715219095,0.17146722018948093,0.3462634383068297,0.542243345884678,0.7767377936845433,1.0801742868970492,1.5152313427369886,2.240346149927223,3.8159286218684447,10.748434459981079,-14.109365540319008,-4.189961726778627,-2.379743901901558,-1.5903011783003027,-1.1290417550265344,-0.8126518474617643,-0.5710778303855113,-0.3711093398594879,-0.19421713626257148,-0.028310196115151606,0.1360539900099314,0.3079672242245796,0.49828715760367553,0.7227057479336798,1.0078929105452583,1.4068555920370769,2.047035173380212,3.34023261613835,7.809143923549313,-27.639385539313558,-4.941000121604384,-2.6310230276367217,-1.7195399614025868,-1.2109617932765668,-0.8717742890897093,-0.6178950018948005,-0.41099347150636867,-0.2303713923501014,-0.0629778112048862,0.10097266742349496,0.27047868522399976,0.45582120535072096,0.671310429408879,0.9404838064389426,1.3085425918975409,1.8793004997944018,2.963114891684161,6.12051442164548,-635.9826284696476,-6.0018492367386305,-2.932643046056726,-1.865132954236776,-1.3000480989153522,-0.9345749743714775,-0.6667580873413865,-0.45202850063276334,-0.26710673988215583,-0.09779686587807736,0.06613565708501229,0.2336854358396497,0.41467417352379443,0.6222488562901135,0.8773242302087318,1.2187477388598338,1.7320508075689007,2.6561444590371326,5.022180509799713,30.273904647359878,-7.618895945573371,-3.302398846645761,-2.030817223997223,-1.3975278930344246,-1.0015736061642513,-0.7179293425740937,-0.49436774181315835,-0.30452754785965036,-0.13285240062476625,0.03145774450612263,0.19748249920221736,0.37469136940523035,0.5752556773556167,0.8178867744530423,1.1362207129717947,1.6014549561359432,2.4008559214308205,4.2490941225203285,14.767761718269796,-10.393962198919166,-3.7675725030758027,-2.2215498646329475,-1.5049156412977913,-1.0733833892239455,-0.7717080375836839,-0.5381808821059135,-0.34274547117688264,-0.16823175830874554,-0.0031447477575108533,0.1617710301240556,0.33573216977395937,0.5300969886407065,0.7617213114315934,1.0599380763779511,1.4845742119079062,2.184733967170542,3.67421735100762,9.750264457590264,-16.286814403660443,-4.372231221755187,-2.4440514426303106,-1.6241032013822347,-1.1507337891978626,-0.8284379379329548,-0.5836569665499471,-0.3818808840300745,-0.20402547238173815,-0.03775477220312043,0.12645717746189983,0.2976678539289865,0.48656528018136874,0.7084408499302938,0.9890535501154799,1.3791161357063495,1.998994623617457,3.2290400977949485,7.264495499118223,-37.40186316835589,-5.192486671494827,-2.7076682518298756,-1.7574861265604407,-1.234500215072694,-0.8885166060125558,-0.6310079710312142,-0.4220645249639057,-0.24032822269799828,-0.07245535362129409,0.09145105670634945,0.26037974854898666,0.44447527333862585,0.6577103466554658,0.9228607826138486,1.28326562778653,1.837290397585281,2.8733543870902136,5.77746623789333,127.19400989357653,-6.372100065919855,-3.0257952333480325,-1.9081442634707018,-1.3257432206884598,-0.952407068331991,-0.6804731117879473,-0.4634394038786059,-0.27723988101322594,-0.10733038781512234,0.05666580801699639,0.2237576245672578,0.4036604647461157,0.609237771788025,0.8607650920704407,1.195566307491725,1.6949196010305845,2.5820065007540816,4.785978131281202,23.54077855867669,-8.219124505230281,-3.4183365915029276,-2.080105983026782,-1.425760995123668,-1.0206525898024545,-0.7323240844178113,-0.5061630332192203,-0.31486667163957305,-0.14246545818477316,0.022016718133641353,0.1876982975899467,0.36397023426620106,0.5627669112981322,0.8022617528708503,1.1148355568421877,1.568324779684719,2.3384534564463646,4.076250709236395,12.953555820976174,-11.53448890481172,-3.9162091707265727,-2.2787450169640397,-1.5361607194628526,-1.0938955726124115,-0.7868714839183858,-0.550410061051981,-0.35332247721669874,-0.17794868719627221,-0.012579613061542526,0.1521043921393207,0.32526740538792753,0.5180715194346412,0.7469191196980475,1.0401025820015868,1.4547639990087609,2.131368025741142,3.5420015893840726,8.920265509923963,-19.254917584359134,-4.570184836680418,-2.5113946365491673,-1.6589572126462435,-1.1729019959705946,-0.8444727370136083,-0.5963754039811042,-0.39273032541553454,-0.21387164099915063,-0.04720607894977149,0.1168832367581539,0.2874261700005358,0.4749505294637765,0.6943653727480703,0.970562527622374,1.3520892583960464,1.9527325736346646,3.1244221070305644,6.789715464806039,-57.81088476904496,-5.469882355127009,-2.7883320086125267,-1.796711878420688,-1.2585933965555554,-0.9055419875182209,-0.6442780045063052,-0.43322409999301686,-0.25033030738517914,-0.08194586220775936,0.08194586220773568,0.25033030738515416,0.4332240999930227,0.6442780045062921,0.9055419875182558,1.2585933965554947,1.7967118784206486,2.7883320086123202,5.469882355126721,57.81088476906135,-6.789715464807148,-3.124422107030665,-1.9527325736347778,-1.3520892583959923,-0.9705625276224197,-0.6943653727480842,-0.47495052946377053,-0.2874261700005305,-0.11688323675816334,0.04720607894974792,0.21387164099914088,0.39273032541552383,0.5963754039810917,0.8444727370135923,1.1729019959705724,1.6589572126462087,2.511394636549203,4.570184836680525,19.254917584355674,-8.920265509925857,-3.5420015893843915,-2.131368025741272,-1.45476399900879,-1.0401025820016359,-0.7469191196980398,-0.518071519434653,-0.3252674053879535,-0.15210439213933022,0.012579613061519005,0.17794868719629192,0.3533224772166883,0.5504100610519688,0.7868714839183477,1.09389557261236,1.536160719462869,2.278745016963894,3.9162091707266526,11.534488904810473,-12.953555820975346,-4.07625070923681,-2.338453456446333,-1.5683247796848003,-1.1148355568422086,-0.8022617528708655,-0.5627669112981445,-0.3639702342662116,-0.18769829758995632,-0.022016718133636447,0.14246545818474915,0.31486667163957843,0.5061630332192265,0.7323240844178406,1.0206525898024066,1.4257609951235968,2.0801059830266566,3.4183365915028094,8.219124505229644,-23.540778558697635,-4.785978131281425,-2.582006500754262,-1.6949196010305656,-1.1955663074917475,-0.8607650920704322,-0.6092377717880182,-0.40366046474615963,-0.22375762456728251,-0.05666580801700573,0.1073303878151273,0.2772398810132312,0.46343940387859456,0.6804731117879129,0.9524070683319732,1.325743220688395,1.9081442634707904,3.025795233347938,6.372100065918876,-127.19400989372713,-5.777466237894139,-2.873354387090168,-1.8372903975853219,-1.2832656277865546,-0.9228607826138395,-0.6577103466554587,-0.444475273338654,-0.2603797485489966,-0.09145105670640183,0.07245535362129903,0.24032822269800347,0.422064524963878,0.6310079710311813,0.8885166060125137,1.2345002150727422,1.7574861265604025,2.7076682518297983,5.192486671494566,37.40186316834286,-7.264495499118724,-3.2290400977950546,-1.9989946236176452,-1.3791161357063353,-0.9890535501154701,-0.7084408499303291,-0.4865652801813627,-0.29766785392902756,-0.1264571774618804,0.03775477220312534,0.20402547238171365,0.3818808840300638,0.5836569665498775,0.8284379379329871,1.150733789197874,1.6241032013822008,2.4440514426302458,4.3722312217552854,16.286814403657967,-9.750264457589793,-3.674217351008167,-2.1847339671705956,-1.4845742119078904,-1.0599380763779709,-0.7617213114316305,-0.5300969886407549,-0.33573216977396975,-0.16177103012405056,0.003144747757515757,0.16823175830873596,0.34274547117687226,0.5381808821059015,0.7717080375836917,1.0733833892238644,1.504915641297761,2.2215498646328924,3.767572503075661,10.39396219892125,-14.767761718278061,-4.249094122520235,-2.400855921430787,-1.6014549561359763,-1.136220712971816,-0.8178867744530816,-0.575255677355648,-0.37469136940522474,-0.19748249920221228,-0.031457744506131945,0.13285240062475676,0.3045275478596091,0.4943677418131468,0.7179293425741011,1.0015736061642326,1.397527893034397,2.0308172239971753,3.3023988466458194,7.618895945571983,-30.273904647381453,-5.0221805097999574,-2.656144459037093,-1.7320508075688812,-1.2187477388598569,-0.8773242302087231,-0.6222488562901067,-0.41467417352382197,-0.23368543583967452,-0.06613565708502164,0.09779686587805361,0.26710673988214584,0.4520285006327693,0.6667580873413731,0.9345749743714601,1.300048098915289,1.865132954236798,2.932643046056637,6.00184923673776,635.9826284601351,-6.120514421645292,-2.9631148916841132,-1.8793004997945084,-1.3085425918975275,-0.9404838064389869,-0.6713104294089132,-0.4558212053507493,-0.2704786852240097,-0.10097266742350436,0.06297781120486258,0.2303713923500916,0.410993471506391,0.6178950018947876,0.8717742890896429,1.2109617932765788,1.71953996140255,2.6310230276365356,4.941000121603786,27.639385539306442,-7.809143923549009,-3.3402326161382905,-2.0470351733802605,-1.4068555920371046,-1.0078929105453345,-0.7227057479337156,-0.49828715760366943,-0.3079672242245898,-0.1360539900099409,0.028310196115142294,0.1942171362625913,0.37110933985949346,0.5710778303854612,0.8126518474617253,1.1290417550265457,1.5903011783002698,2.379743901901401,4.189961726778454,14.109365540319988,-10.748434459980507,-3.815928621869032,-2.2403461499272788,-1.515231342737066,-1.0801742868970694,-0.7767377936845127,-0.54224334588469,-0.34626343830684014,-0.17146722018950514,-0.00628955771519998,0.1585456255956456,0.3322366488921547,0.5260752622070886,0.7567637954942504,1.0532824875254247,1.4745453847223933,2.166703022272096,3.6291397559348693,9.457143615790306,-17.169336929493113,-4.436374181716119,-2.4661508415183064,-1.635601612474668,-1.1580693205790191,-0.8337548073494775,-0.5878807423302651,-0.3854885723591421,-0.20730322768258286,-0.040904376505983796,0.12326341081341759,0.29424766378283645,0.4826819686409858,0.7037282885968855,0.9828518148349,1.3700296073884757,1.9833816764700598,3.19346723397818,7.099170166798575,-42.391014704630976,-5.281879551675669,-2.734093625436707,-1.770415697297769,-1.242468463690573,-0.8941597798006795,-0.6354136087103851,-0.42577439731758454,-0.24365711959625042,-0.07561733107586745,0.08828092019436112,0.25702454173799955,0.4407145113115273,0.6532145336319746,0.9170545916888994,1.2749756562202608,1.8236091736494984,2.8445067481365958,5.671281819616973,90.85106719507284,-6.505608406614578,-3.0580383251487238,-1.9228271903538547,-1.3344514674505996,-0.9584223677473833,-0.685083881705601,-0.46726514386898027,-0.28062929527987246,-0.1105124365034033,0.053511524523303364,0.2204577492259452,0.4000079427694834,0.6049340314540197,0.8553051281902445,1.1879551400926311,1.6828053415845892,2.5580906728411485,4.711915780970163,21.915251866384622,-8.440429657507888,-3.4586612781636377,-2.0969678543943577,-1.4353413234823817,-1.0270939959648622,-0.7371665078616205,-0.5101197666984579,-0.3183266188578749,-0.14567547116536206,0.018870663827494964,0.18444467881537926,0.360412959789073,0.5586335162986656,0.7971059777946903,1.107806974516098,1.5574984715292133,2.3182605768089655,4.021554537491148,12.443516159794255,-11.971890741204334,-3.9682245482557246,-2.2983599923470903,-1.5467776996751152,-1.1008271941529009,-0.7919759860219114,-0.5545146186093385,-0.3568637398684622,-0.18119483225869312,-0.015724982894814443,0.1488884265887626,0.3217935002258237,0.5140892153431263,0.7420314349116831,1.033577147823211,1.4450085311075382,2.114053591055269,3.4998728029926713,8.673803360754544,-20.499335183570835,-4.640016262480704,-2.5345565583582315,-1.6708186244663537,-1.1804006289277906,-0.8498744570566309,-0.6006466345982108,-0.3963645984387068,-0.21716244621635933,-0.050358302458232085,0.11369669769910368,0.2840246972034229,0.47110214372693315,0.689714561550344,0.9644740369651056,1.343233110768487,1.9376887671337746,3.0909075867703657,6.644693601458517,-70.66007756375406,-5.568818580316706,-2.816170632519487,-1.8100839728697435,-1.2667518960786759,-0.9112817934729499,-0.648737153296897,-0.4369641592076371,-0.25367475442193743,-0.08511254338825441,0.07878081270835424,0.24699112187555408,0.42949421768116725,0.6398368884693934,0.8998347792389743,1.250499224436497,1.7834900451324256,2.7609773525457753,5.374292255120255,48.91496718136345,-6.941065442661393,-3.158601757681253,-1.967962285311745,-1.3610210399366671,-0.9766882983347283,-0.6990365394535077,-0.47881042829145226,-0.2908337974262425,-0.12007211922002828,0.04405479120513739,0.21058525941598838,0.3891050182483234,0.5921201643345263,0.8390996311773029,1.1654584768561869,1.647218920528085,2.4885956999335876,4.502332216795314,18.15259921062431,-9.180954248160715,-3.58507946738133,-2.148916130601189,-1.464609137052315,-1.0466708438299674,-0.751829819638155,-0.5220668206746888,-0.3287484246305291,-0.15532343574748683,0.009434492078239333,0.17470617321169427,0.3497890752959744,0.5463196881064358,0.7817921817640243,1.0870114774915447,1.525645823918552,2.259409166249982,3.8654593963978687,11.127708152521047,-13.506913688294516,-4.132367366286251,-2.3589455269523123,-1.5792584075365412,-1.1219135952400128,-0.8074436088685842,-0.5669149624696215,-0.36753566134890975,-0.1909557596198685,-0.02516320811682897,0.13925832020285198,0.31141356955860505,0.5022188760227293,0.7275039136822236,1.0142524012417002,1.4162661931387663,2.063463278779005,3.3788696493979518,8.008971289054694,-25.426221681344977,-4.8623039275671545,-2.6063138895726463,-1.7071636927931562,-1.2032349231232726,-0.8662546952142783,-0.6135580348424972,-0.4073222716074751,-0.22706214716772802,-0.059821215895621824,0.1041504864567368,0.27385637171656707,0.45962479892712055,0.6758820330561458,0.9464276939241368,1.317107284047271,1.8936364991945323,2.994159967295822,6.243837264833157,-211.99281182893876,-5.8875805166832205,-2.902728112825924,-1.8511306354318353,-1.291622779596756,-0.9287007726703571,-0.6622247959029439,-0.4482465633865882,-0.2637404545416815,-0.09462301714525823,0.06929481677570293,0.23700435377148527,0.4183644876829893,0.6266197834750251,0.8829048802213487,1.2265935957367538,1.744698689879747,2.6816890992871296,5.105966289667826,33.462838577346176,-7.437551146933998,-3.2653428234794992,-2.014805108952581,-1.3882818233808354,-0.9952939845743225,-0.7131744560758528,-0.4904604938381866,-0.30109445328851503,-0.12965348528912773,0.034605915711695155,0.2007519204561737,0.3782818503907716,0.5794486674545849,0.8231486998483596,1.1434511575500415,1.61272164730724,2.4222891613394517,4.309828213721431,15.490289214530453,-10.061929312379398,-3.7203488200052943,-2.203014387021882,-1.4946971197135002,-1.0666381829404556,-0.7667026350779089,-0.5341321460714997,-0.33923507954977417,-0.16499971803702684,-7.83773951454306e-15],"x":[37.69911184307752,37.862638187408514,38.02616453173952,38.189690876070514,38.35321722040152,38.516743564732515,38.680269909063526,38.843796253394515,39.00732259772552,39.17084894205652,39.33437528638752,39.49790163071852,39.66142797504952,39.824954319380524,39.98848066371151,40.15200700804252,40.315533352373514,40.479059696704525,40.64258604103552,40.806112385366525,40.96963872969753,41.133165074028526,41.29669141835952,41.46021776269052,41.62374410702152,41.78727045135252,41.95079679568353,42.11432314001453,42.27784948434553,42.44137582867652,42.604902173007524,42.76842851733853,42.931954861669524,43.09548120600053,43.259007550331525,43.42253389466253,43.58606023899352,43.74958658332452,43.91311292765552,44.07663927198653,44.240165616317526,44.40369196064853,44.567218304979534,44.73074464931053,44.89427099364153,45.057797337972524,45.22132368230353,45.384850026634524,45.548376370965535,45.71190271529653,45.875429059627535,46.038955403958525,46.20248174828953,46.36600809262053,46.52953443695153,46.69306078128253,46.85658712561353,47.02011346994453,47.18363981427554,47.34716615860653,47.51069250293752,47.674218847268534,47.83774519159953,48.001271535930535,48.16479788026153,48.328324224592535,48.49185056892353,48.65537691325453,48.81890325758553,48.98242960191653,49.14595594624754,49.309482290578536,49.47300863490954,49.63653497924054,49.80006132357153,49.96358766790253,50.127114012233534,50.29064035656454,50.454166700895534,50.617693045226545,50.78121938955754,50.94474573388853,51.10827207821953,51.27179842255054,51.435324766881536,51.59885111121254,51.762377455543536,51.92590379987454,52.08943014420554,52.25295648853654,52.41648283286754,52.580009177198534,52.743535521529544,52.90706186586054,53.070588210191545,53.23411455452254,53.39764089885354,53.561167243184535,53.72469358751554,53.88821993184654,54.05174627617754,54.21527262050855,54.37879896483955,54.542325309170536,54.70585165350154,54.869377997832544,55.03290434216354,55.196430686494544,55.35995703082554,55.523483375156545,55.687009719487556,55.850536063818545,56.01406240814954,56.17758875248054,56.34111509681155,56.504641441142546,56.66816778547355,56.831694129804546,56.99522047413554,57.15874681846654,57.32227316279754,57.48579950712855,57.649325851459544,57.812852195790555,57.97637854012155,58.13990488445254,58.303431228783545,58.46695757311455,58.630483917445545,58.79401026177655,58.95753660610755,59.12106295043855,59.28458929476955,59.44811563910055,59.61164198343155,59.77516832776254,59.938694672093554,60.10222101642455,60.265747360755554,60.42927370508656,60.59280004941755,60.756326393748544,60.919852738079555,61.08337908241055,61.24690542674155,61.41043177107255,61.573958115403556,61.737484459734546,61.90101080406556,62.06453714839655,62.22806349272755,62.391589837058554,62.55511618138956,62.718642525720554,62.88216887005156,63.045695214382555,63.20922155871355,63.37274790304455,63.53627424737556,63.699800591706556,63.86332693603756,64.02685328036856,64.19037962469956,64.35390596903055,64.51743231336155,64.68095865769256,64.84448500202356,65.00801134635456,65.17153769068555,65.33506403501656,65.49859037934756,65.66211672367857,65.82564306800955,65.98916941234054,66.15269575667156,66.31622210100255,66.47974844533356,66.64327478966456,66.80680113399556,66.97032747832655,67.13385382265757,67.29738016698856,67.46090651131956,67.62443285565057,67.78795919998156,67.95148554431256,68.11501188864355,68.27853823297457,68.44206457730557,68.60559092163656,68.76911726596757,68.93264361029856,69.09616995462956,69.25969629896056,69.42322264329157,69.58674898762257,69.75027533195356,69.91380167628456,70.07732802061557,70.24085436494657,70.40438070927756,70.56790705360858,70.73143339793957,70.89495974227056,71.05848608660156,71.22201243093257,71.38553877526357,71.54906511959456,71.71259146392558,71.87611780825657,72.03964415258756,72.20317049691857,72.36669684124956,72.53022318558057,72.69374952991157,72.85727587424257,73.02080221857356,73.18432856290457,73.34785490723557,73.51138125156658,73.67490759589758,73.83843394022857,74.00196028455957,74.16548662889056,74.32901297322158,74.49253931755257,74.65606566188357,74.81959200621458,74.98311835054557,75.14664469487657,75.31017103920757,75.47369738353858,75.63722372786958,75.80075007220057,75.96427641653158,76.12780276086256,76.29132910519357,76.45485544952457,76.61838179385558,76.78190813818658,76.94543448251757,77.10896082684857,77.27248717117958,77.43601351551058,77.59953985984157,77.76306620417259,77.92659254850358,78.09011889283457,78.25364523716557,78.41717158149658,78.58069792582758,78.74422427015858,78.90775061448959,79.07127695882058,79.23480330315158,79.39832964748258,79.56185599181357,79.72538233614458,79.88890868047558,80.05243502480658,80.21596136913757,80.37948771346858,80.54301405779958,80.70654040213059,80.87006674646159,81.03359309079258,81.19711943512358,81.36064577945457,81.52417212378559,81.68769846811658,81.85122481244758,82.01475115677859,82.17827750110958,82.3418038454406,82.50533018977158,82.66885653410259,82.83238287843359,82.99590922276458,83.15943556709558,83.32296191142657,83.48648825575758,83.65001460008858,83.81354094441959,83.97706728875059,84.14059363308158,84.30411997741258,84.46764632174359,84.63117266607459,84.79469901040558,84.9582253547366,85.12175169906759,85.28527804339859,85.44880438772958,85.61233073206058,85.7758570763916,85.93938342072259,86.1029097650536,86.26643610938459,86.42996245371559,86.5934887980466,86.75701514237758,86.92054148670859,87.08406783103959,87.2475941753706,87.41112051970158,87.5746468640326,87.73817320836359,87.9016995526946,88.0652258970256,88.22875224135659,88.39227858568759,88.55580493001858,88.7193312743496,88.88285761868059,89.04638396301158,89.2099103073426,89.37343665167359,89.5369629960046,89.7004893403356,89.8640156846666,90.0275420289976,90.19106837332859,90.3545947176596,90.51812106199058,90.68164740632159,90.84517375065259,91.0087000949836,91.1722264393146,91.3357527836456,91.49927912797659,91.66280547230758,91.8263318166386,91.9898581609696,92.15338450530061,92.3169108496316,92.4804371939626,92.6439635382936,92.8074898826246,92.97101622695561,93.13454257128659,93.2980689156176,93.4615952599486,93.6251216042796,93.7886479486106,93.95217429294159,94.11570063727261,94.2792269816036,94.4427533259346,94.6062796702656,94.76980601459661,94.9333323589276,95.0968587032586,95.2603850475896,95.4239113919206,95.58743773625162,95.75096408058259,95.91449042491361,96.0780167692446,96.24154311357562,96.4050694579066,96.5685958022376,96.7321221465686,96.8956484908996,97.05917483523062,97.22270117956161,97.38622752389261,97.5497538682236,97.71328021255461,97.8768065568856,98.0403329012166,98.2038592455476,98.36738558987861,98.53091193420961,98.6944382785406,98.8579646228716,99.02149096720261,99.18501731153361,99.34854365586462,99.5120700001956,99.67559634452661,99.83912268885761,100.00264903318859,100.16617537751962,100.3297017218506,100.49322806618162,100.65675441051262,100.82028075484361,100.98380709917461,101.1473334435056,101.31085978783662,101.47438613216761,101.63791247649861,101.8014388208296,101.96496516516062,102.12849150949161,102.29201785382263,102.45554419815362,102.61907054248461,102.78259688681563,102.9461232311466,103.10964957547762,103.27317591980861,103.43670226413963,103.60022860847062,103.7637549528016,103.92728129713261,104.09080764146361,104.25433398579463,104.41786033012562,104.58138667445662,104.74491301878761,104.90843936311862,105.0719657074496,105.23549205178061,105.39901839611161,105.56254474044262,105.72607108477364,105.88959742910461,106.05312377343562,106.21665011776662,106.38017646209762,106.54370280642863,106.70722915075962,106.87075549509062,107.03428183942162,107.1978081837526,107.36133452808363,107.52486087241462,107.68838721674562,107.85191356107663,108.01543990540762,108.17896624973862,108.34249259406961,108.50601893840063,108.66954528273162,108.83307162706262,108.99659797139361,109.16012431572463,109.32365066005563,109.48717700438664,109.65070334871763,109.81422969304862,109.97775603737963,110.14128238171061,110.30480872604163,110.46833507037262,110.63186141470364,110.79538775903463,110.95891410336561,111.12244044769663,111.28596679202762,111.44949313635864,111.61301948068963,111.77654582502063,111.94007216935162,112.10359851368263,112.26712485801362,112.43065120234462,112.59417754667562,112.75770389100663,112.92123023533765,113.08475657966862,113.24828292399962,113.41180926833063,113.57533561266163,113.73886195699264,113.90238830132363,114.06591464565463,114.22944098998563,114.39296733431661,114.55649367864763,114.72002002297863,114.88354636730963,115.04707271164064,115.21059905597163,115.37412540030263,115.53765174463364,115.70117808896464,115.86470443329563,116.02823077762663,116.19175712195762,116.35528346628864,116.51880981061964,116.68233615495065,116.84586249928164,117.00938884361263,117.17291518794364,117.33644153227462,117.49996787660564,117.66349422093663,117.82702056526765,117.99054690959863,118.15407325392962,118.31759959826064,118.48112594259163,118.64465228692265,118.80817863125364,118.97170497558464,119.13523131991563,119.29875766424664,119.46228400857763,119.62581035290863,119.78933669723965,119.95286304157064,120.11638938590166,120.27991573023263,120.44344207456363,120.60696841889464,120.77049476322564,120.93402110755665,121.09754745188764,121.26107379621864,121.42460014054964,121.58812648488066,121.75165282921164,121.91517917354264,122.07870551787364,122.24223186220465,122.40575820653564,122.56928455086664,122.73281089519764,122.89633723952865,123.05986358385964,123.22338992819064,123.38691627252165,123.55044261685265,123.71396896118365,123.87749530551466,124.04102164984565,124.20454799417664,124.36807433850765,124.53160068283863,124.69512702716965,124.85865337150064,125.02217971583165,125.18570606016264,125.34923240449363,125.51275874882465,125.67628509315564,125.83981143748666,126.00333778181765,126.16686412614865,126.33039047047964,126.49391681481065,126.65744315914166,126.82096950347264,126.98449584780366,127.14802219213465,127.31154853646565,127.47507488079664,127.63860122512766,127.80212756945865,127.96565391378965,128.12918025812064,128.29270660245166,128.45623294678265,128.61975929111367,128.78328563544466,128.94681197977565,129.11033832410666,129.27386466843765,129.43739101276867,129.60091735709963,129.76444370143065,129.92797004576164,130.09149639009266,130.25502273442365,130.41854907875464,130.58207542308566,130.74560176741664,130.90912811174766,131.07265445607865,131.23618080040967,131.39970714474066,131.56323348907165,131.72675983340264,131.89028617773366,132.05381252206467,132.21733886639566,132.38086521072665,132.54439155505764,132.70791789938866,132.87144424371965,133.03497058805067,133.19849693238166,133.36202327671265,133.52554962104367,133.68907596537466,133.85260230970567,134.01612865403666,134.17965499836765,134.34318134269867,134.50670768702966,134.67023403136065,134.83376037569167,134.99728672002263,135.16081306435368,135.32433940868466,135.48786575301565,135.65139209734664,135.81491844167766,135.97844478600868,136.14197113033967,136.30549747467066,136.46902381900165,136.63255016333267,136.79607650766366,136.95960285199467,137.12312919632564,137.28665554065668,137.45018188498767,137.61370822931866,137.77723457364968,137.94076091798064,138.1042872623117,138.26781360664268,138.43133995097367,138.59486629530466,138.75839263963564,138.9219189839667,139.08544532829768,139.24897167262867,139.41249801695966,139.57602436129068,139.73955070562167,139.90307704995269,140.06660339428365,140.23012973861466,140.39365608294568,140.55718242727667,140.72070877160766,140.88423511593865,141.04776146026967,141.2112878046007,141.37481414893168,141.53834049326267,141.70186683759366,141.86539318192467,142.0289195262557,142.19244587058665,142.35597221491767,142.51949855924866,142.68302490357968,142.8465512479107,143.01007759224166,143.17360393657268,143.3371302809037,143.50065662523468,143.66418296956567,143.82770931389666,143.99123565822765,144.1547620025587,144.3182883468897,144.48181469122068,144.64534103555167,144.80886737988266,144.97239372421367,145.1359200685447,145.29944641287568,145.46297275720667,145.6264991015377,145.79002544586868,145.95355179019967,146.11707813453066,146.28060447886168,146.4441308231927,146.60765716752368,146.77118351185467,146.9347098561857,147.0982362005167,147.26176254484767,147.42528888917866,147.58881523350968,147.75234157784067,147.91586792217169,148.0793942665027,148.2429206108337,148.40644695516468,148.56997329949567,148.7334996438267,148.89702598815768,149.06055233248867,149.22407867681966,149.3876050211507,149.5511313654817,149.71465770981268,149.8781840541437,150.04171039847466,150.20523674280568,150.36876308713667,150.5322894314677,150.69581577579868,150.85934212012967,151.0228684644607,151.1863948087917,151.3499211531227,151.51344749745365,151.6769738417847,151.8405001861157,152.00402653044668,152.16755287477767,152.3310792191087,152.4946055634397,152.6581319077707,152.82165825210168,152.98518459643267,153.14871094076366,153.31223728509468,153.4757636294257,153.6392899737567,153.80281631808768,153.9663426624187,154.12986900674971,154.2933953510807,154.45692169541167,154.62044803974268,154.7839743840737,154.9475007284047,155.11102707273568,155.2745534170667,155.43807976139772,155.6016061057287,155.76513245005967,155.92865879439069,156.09218513872167,156.2557114830527,156.4192378273837,156.5827641717147,156.7462905160457,156.90981686037668,157.07334320470773,157.23686954903872,157.40039589336968,157.56392223770067,157.7274485820317,157.8909749263627,158.0545012706937,158.2180276150247,158.3815539593557,158.54508030368672,158.70860664801768,158.8721329923487,159.0356593366797,159.19918568101068,159.3627120253417,159.5262383696727,159.6897647140037,159.8532910583347,160.01681740266574,160.1803437469967,160.3438700913277,160.50739643565868,160.6709227799897,160.8344491243207,160.9979754686517,161.1615018129827,161.3250281573137,161.48855450164473,161.6520808459757,161.8156071903067,161.9791335346377,162.1426598789687,162.3061862232997,162.46971256763072,162.6332389119617,162.7967652562927,162.9602916006237,163.1238179449547,163.2873442892857,163.4508706336167,163.6143969779477,163.77792332227872,163.9414496666097,164.1049760109407,164.26850235527172,164.43202869960268,164.5955550439337,164.7590813882647,164.9226077325957,165.0861340769267,165.2496604212577,165.41318676558873,165.57671310991972,165.7402394542507,165.90376579858167,166.06729214291272,166.2308184872437,166.3943448315747,166.5578711759057,166.7213975202367,166.88492386456772,167.0484502088987,167.21197655322973,167.3755028975607,167.5390292418917,167.7025555862227,167.86608193055372,168.0296082748847,168.1931346192157,168.35666096354672,168.52018730787773,168.68371365220872,168.84723999653968,169.0107663408707,169.17429268520172,169.3378190295327,169.5013453738637,169.66487171819472,169.82839806252574,169.99192440685673,170.1554507511877,170.3189770955187,170.4825034398497,170.6460297841807,170.80955612851173,170.97308247284272,171.1366088171737,171.3001351615047,171.46366150583574,171.6271878501667,171.7907141944977,171.95424053882869,172.11776688315973,172.28129322749072,172.4448195718217,172.60834591615273,172.77187226048372,172.93539860481474,173.0989249491457,173.26245129347672,173.4259776378077,173.58950398213872,173.75303032646974,173.91655667080073,174.08008301513172,174.2436093594627,174.40713570379376,174.57066204812472,174.7341883924557,174.8977147367867,175.0612410811177,175.22476742544873,175.38829376977972,175.55182011411074,175.71534645844173,175.87887280277275,176.0423991471037,176.20592549143473,176.36945183576572,176.5329781800967,176.69650452442772,176.86003086875874,177.02355721308973,177.18708355742072,177.3506099017517,177.51413624608273,177.67766259041372,177.8411889347447,178.00471527907573,178.16824162340674,178.33176796773773,178.49529431206872,178.65882065639974,178.8223470007307,178.98587334506172,179.14939968939274,179.31292603372373,179.47645237805472,179.63997872238573,179.80350506671675,179.96703141104774,180.13055775537873,180.2940840997097,180.45761044404074,180.62113678837173,180.78466313270272,180.94818947703374,181.11171582136473,181.27524216569574,181.43876851002673,181.60229485435775,181.7658211986887,181.92934754301973,182.09287388735072,182.25640023168174,182.41992657601273,182.58345292034372,182.74697926467476,182.91050560900575,183.0740319533367,183.2375582976677,183.40108464199872,183.56461098632974,183.72813733066073,183.89166367499172,184.05519001932274,184.21871636365375,184.38224270798474,184.54576905231573,184.70929539664672,184.8728217409777,185.03634808530873,185.19987442963975,185.36340077397074,185.52692711830173,185.69045346263275,185.85397980696376,186.01750615129473,186.18103249562571,186.34455883995673,186.50808518428775,186.67161152861874,186.83513787294973,186.99866421728075,187.16219056161174,187.32571690594276,187.48924325027372,187.65276959460473,187.81629593893572,187.97982228326674,188.14334862759776,188.30687497192875,188.47040131625974,188.63392766059073,188.79745400492178,188.96098034925274,189.12450669358373,189.28803303791472,189.45155938224573,189.61508572657675,189.77861207090774,189.94213841523876,190.10566475956975,190.26919110390077,190.43271744823173,190.59624379256275,190.75977013689374,190.92329648122472,191.08682282555574,191.25034916988676,191.41387551421775,191.57740185854874,191.74092820287976,191.90445454721075,192.06798089154174,192.23150723587273,192.39503358020374,192.55855992453476,192.72208626886575,192.88561261319674,193.04913895752776,193.21266530185872,193.37619164618974,193.53971799052076,193.70324433485175,193.86677067918274,194.03029702351375,194.19382336784477,194.35734971217576,194.52087605650675,194.6844024008377,194.84792874516876,195.01145508949975,195.17498143383074,195.33850777816176,195.50203412249274,195.66556046682376,195.82908681115475,195.99261315548577,196.15613949981673,196.31966584414775,196.48319218847877,196.64671853280976,196.81024487714075,196.97377122147174,197.13729756580278,197.30082391013377,197.46435025446476,197.62787659879572,197.79140294312677,197.95492928745776,198.11845563178875,198.28198197611977,198.44550832045076,198.60903466478177,198.77256100911276,198.93608735344375,199.09961369777474,199.26314004210573,199.42666638643675,199.59019273076777,199.75371907509876,199.91724541942975,200.0807717637608,200.24429810809178,200.40782445242274,200.57135079675373,200.73487714108475,200.89840348541577,201.06192982974676]}
},{}],67:[function(require,module,exports){
module.exports={"expected":[4.898587196589413e-16,0.05035830245825063,0.10097266742349174,0.15210439213932936,0.20402547238171978,0.25702454173800304,0.31141356955857663,0.3675356613489261,0.425774397317565,0.486565280181372,0.5504100610519712,0.6178950018947866,0.689714561550381,0.7667026350778746,0.8498744570566413,0.9404838064389366,1.0401025820016045,1.1507337891978546,1.2749756562202368,1.4162661931388167,1.5792584075364304,1.7704156972977594,1.998994623617479,2.2787450169639936,2.631023027636642,3.0909075867705,3.720348820005185,4.64001626248048,6.120514421645905,8.920265509924787,16.286814403660003,90.85106719510013,-25.426221681343353,-11.127708152523011,-7.099170166799516,-5.19248667149515,-4.076250709236495,-3.3402326161382994,-2.816170632519263,-2.4222891613395876,-2.1140535910552356,-1.8651329542367823,-1.658957212646205,-1.4845742119079115,-1.334451467450625,-1.2032349231232318,-1.08701147749161,-0.9828518148349046,-0.8885166060125256,-0.8022617528708421,-0.7227057479336951,-0.6487371532968815,-0.5794486674545923,-0.5140892153431367,-0.45202850063274796,-0.3927303254155228,-0.33573216977396125,-0.28062929527986696,-0.22706214716772352,-0.1747061732117105,-0.12326341081343618,-0.07245535362128966,-0.022016718133634608,0.028310196115141555,0.07878081270835091,0.1296534852891347,0.18119483225869756,0.23368543583964635,0.2874261700005315,0.3427454711768987,0.4000079427694728,0.4596247989271408,0.5220668206746529,0.587880742330262,0.6577103466554517,0.7323240844178216,0.8126518474617477,0.8998347792389425,0.9952939845743644,1.100827194152816,1.2187477388598302,1.35208925839603,1.5049156412977802,1.6828053415846154,1.893636499194552,2.14891613060127,2.4661508415181896,2.873354387090254,3.4183365915028325,4.18996172677844,5.374292255120157,7.437551146934485,11.971890741200978,30.273904647356954,-57.810884769058276,-14.767761718273077,-8.44042965750643,-5.887580516682624,-4.502332216795309,-3.629139755934915,-3.025795233347997,-2.5820065007541455,-2.240346149927192,-1.9679622853116876,-1.7446986898797767,-1.5574984715292413,-1.3975278930344286,-1.258593396555529,-1.1362207129718005,-1.0270939959647913,-0.9287007726703524,-0.8390996311772797,-0.7567637954942331,-0.6804731117879409,-0.6092377717880156,-0.542243345884691,-0.47881042829142034,-0.4183644876830136,-0.3604129597890662,-0.3045275478596373,-0.2503303073851673,-0.19748249920221816,-0.14567547116534235,-0.09462301714521268,-0.044054791205138034,0.006289557715225189,0.056665808017000815,0.10733038781511568,0.15854562559563118,0.2105852594160007,0.2637404545416736,0.3183266188578659,0.37469136940524495,0.4332240999930169,0.4943677418131563,0.5586335162987107,0.6266197834750298,0.699036539453528,0.7767377936845318,0.8607650920704484,0.9524070683319766,1.0532824875254214,1.1654584768562504,1.2916227795967032,1.4353413234823975,1.6014549561359857,1.7967118784206955,2.0308172239971416,2.3182605768089073,2.681689099287048,3.1586017576812555,3.8159286218685535,4.785978131281286,6.372100065919581,9.457143615789034,18.152599210627912,211.9928118273312,-21.915251866388115,-10.39396219891932,-6.789715464806665,-5.022180509799734,-3.9682245482561003,-3.2653428234794597,-2.760977352546156,-2.379743901901511,-2.080105983026754,-1.8372903975853139,-1.6356016124745663,-1.4646091370523198,-1.3171072840472497,-1.187955140092687,-1.073383389223915,-0.970562527622399,-0.877324230208734,-0.791975986021927,-0.7131744560758678,-0.639836888469393,-0.5710778303855032,-0.506163033219231,-0.4444752733386332,-0.3854885723591261,-0.3287484246305165,-0.2738563717165721,-0.22045774922595374,-0.16823175830874698,-0.11688323675815297,-0.06613565708501262,-0.015724982894808028,0.03460591571169811,0.0851125433882408,0.13605399000992494,0.18769829758996598,0.2403282226980054,0.29424766378286843,0.3497890752959722,0.40732227160748463,0.4672651438689871,0.5300969886407235,0.5963754039811068,0.6667580873413637,0.7420314349117157,0.8231486998483429,0.9112817934729496,1.0078929105452716,1.1148355568422006,1.234500215072712,1.3700296073885172,1.5256458239185913,1.7071636927931344,1.922827190353952,2.184733967170536,2.5113946365491837,2.932643046056725,3.4998728029927473,4.309828213722049,5.568818580316288,7.80914392354976,12.953555820974557,37.40186316834605,-42.39101470462831,-13.506913688295,-8.008971289054204,-5.671281819617684,-4.3722312217551975,-3.54200158938443,-2.9631148916841665,-2.5345565583580782,-2.2030143870217764,-1.9376887671337746,-1.71953996140256,-1.5361607194628317,-1.379116135706371,-1.2424684636906107,-1.1219135952399835,-1.0142524012417682,-0.9170545916889133,-0.8284379379329561,-0.7469191196980448,-0.6713104294089007,-0.6006466345982024,-0.5341321460714585,-0.47110214372694875,-0.41099347150637555,-0.3533224772166942,-0.2976678539289929,-0.24365711959624942,-0.19095575961987005,-0.139258320202872,-0.08828092019438341,-0.0377547722031215,0.012579613061529693,0.0629778112048851,0.11369669769912576,0.16499971803703062,0.21716244621635863,0.27047868522400836,0.3252674053879337,0.3818808840300837,0.44071451131151107,0.5022188760227448,0.5669149624696138,0.6354136087103734,0.708440849930313,0.7868714839183675,0.8717742890897101,0.964474036965116,1.0666381829404932,1.1804006289277589,1.308542591897562,1.4547639990087773,1.6241032013822108,1.823609173649623,2.0634632787789933,2.358945526952366,2.7340936254365307,3.2290400977951124,3.9162091707265843,4.941000121604387,6.644693601459478,10.061929312379709,20.499335183583096,-635.9826284716735,-19.254917584357248,-9.750264457590918,-6.5056084066139555,-4.862303927567521,-3.86545939639794,-3.19346723397796,-2.7076682518298765,-2.33845345644635,-2.0470351733802135,-1.8100839728697142,-1.6127216473072747,-1.4450085311074936,-1.3000480989153333,-1.1729019959705789,-1.0599380763779622,-0.9584223677473805,-0.8662546952142336,-0.7817921817640548,-0.7037282885968752,-0.6310079710312149,-0.5627669112981486,-0.4982871576036737,-0.43696415920764636,-0.3782818503907689,-0.3217935002258528,-0.26710673988214645,-0.21387164099914416,-0.16177103012406327,-0.11051243650338742,-0.059821215895608654,-0.009434492078244462,0.04090437650597609,0.09145105670636505,0.1424654581847605,0.19421713626257067,0.24699112187556233,0.30109445328847306,0.35686373986844794,0.4146741735238021,0.47495052946376615,0.5381808821059062,0.6049340314540211,0.675882033056185,0.7518298196381268,0.8337548073494885,0.9228607826138469,1.020652589802461,1.1290417550265357,1.2504992244364805,1.388281823380763,1.5467776996750227,1.7320508075688754,1.9527325736347585,2.2215498646329928,2.558090672841277,2.994159967295948,3.585079467381253,4.436374181715988,5.777466237893831,8.219124505230466,14.109365540316189,48.91496718138199,-33.46283857735794,-12.443516159796292,-7.618895945572906,-5.469882355126789,-4.249094122520183,-3.4586612781636243,-2.902728112825938,-2.488595699933717,-2.1667030222720514,-1.908144263470762,-1.6949196010305776,-1.5152313427369883,-1.361021039936688,-1.2265935957367444,-1.107806974516159,-1.0015736061642355,-0.9055419875182356,-0.8178867744530518,-0.7371665078615957,-0.6622247959029652,-0.592120164334493,-0.5260752622071353,-0.4634394038786065,-0.40366046474614564,-0.3462634383068286,-0.2908337974262341,-0.23700435377149542,-0.1844446788153634,-0.1328524006247727,-0.08194586220775313,-0.03145774450612744,0.01887066382749778,0.06929481677570139,0.12007211922000911,0.17146722018948304,0.2237576245672582,0.2772398810132289,0.3322366488921819,0.3891050182483487,0.44824656338659263,0.5101197666984605,0.5752556773556095,0.6442780045063021,0.7179293425740837,0.7971059777947153,0.8829048802213713,0.9766882983347208,1.0801742868970576,1.195566307491728,1.325743220688428,1.4745453847224232,1.6472189205282193,1.851130635431789,2.096967854394445,2.400855921430874,2.7883320086123744,3.3023988466458625,4.0215545374911805,5.105966289668602,6.941065442660507,10.748434459981318,23.540778558684288,-127.19400989374846,-17.16933692948586,-9.180954248158768,-6.243837264832973,-4.7119157809701155,-3.7675725030756695,-3.124422107030598,-2.656144459037164,-2.2983599923469833,-2.014805108952508,-1.783490045132449,-1.5903011783002923,-1.4257609951236239,-1.2832656277865229,-1.158069320578993,-1.046670843829953,-0.9464276939241584,-0.8553051281902194,-0.7717080375836699,-0.6943653727480723,-0.6222488562901386,-0.5545146186093372,-0.4904604938381863,-0.42949421768118856,-0.3711093398594846,-0.31486667163957066,-0.2603797485489989,-0.2073032276826175,-0.15532343574749435,-0.10415048645673215,-0.053511524523329836,-0.003144747757516306,0.0472060789497559,0.0977968658780734,0.14888842658874732,0.20075192045618873,0.25367475442190124,0.30796722422458284,0.3639702342662015,0.42206452496389213,0.4826819686409996,0.5463196881064101,0.613558034842484,0.6850838817055439,0.7617213114316099,0.8444727370135998,0.9345749743714669,1.0335771478232094,1.143451157550038,1.2667518960786983,1.4068555920370434,1.5683247796847755,1.7574861265604007,1.983381676470045,2.259409166249959,2.6063138895724745,3.0580383251484324,3.674217351007747,4.570184836680311,6.00184923673842,8.67380336075584,15.490289214533508,70.66007756373511,-27.639385539311313,-11.534488904811672,-7.264495499117888,-5.281879551675294,-4.132367366286062,-3.3788696493980708,-2.8445067481367228,-2.444051442630349,-2.131368025741149,-1.8793004997944922,-1.6708186244662353,-1.4946971197135912,-1.3432331107684576,-1.210961793276555,-1.0938955726123756,-0.989053550115471,-0.8941597798006881,-0.8074436088685524,-0.72750391368226,-0.6532145336319691,-0.5836569665499164,-0.5180715194346429,-0.4558212053507257,-0.39636459843871996,-0.33923507954975607,-0.2840246972034251,-0.23037139235009643,-0.17794868719628648,-0.12645717746189888,-0.07561733107585795,-0.02516320811682033,0.025163208116817572,0.0756173310758552,0.12645717746189428,0.17794868719628548,0.23037139235009915,0.2840246972034279,0.33923507954975896,0.39636459843871885,0.45582120535072235,0.5180715194346417,0.5836569665499151,0.6532145336319678,0.7275039136822585,0.8074436088685448,0.8941597798006832,0.9890535501154726,1.0938955726123774,1.210961793276557,1.343233110768455,1.494697119713588,1.6708186244662315,1.8793004997944878,2.1313680257411436,2.444051442630342,2.8445067481366975,3.378869649398059,4.132367366286109,5.2818795516753685,7.264495499118026,11.534488904811303,27.639385539309202,-70.66007756374887,-15.49028921453417,-8.673803360756052,-6.001849236738456,-4.5701848366803715,-3.674217351007761,-3.0580383251484426,-2.6063138895724545,-2.259409166249943,-1.9833816764700498,-1.7574861265604047,-1.568324779684779,-1.4068555920370462,-1.2667518960787103,-1.1434511575500443,-1.0335771478232187,-0.934574974371472,-0.8444727370136045,-0.7617213114316059,-0.6850838817055401,-0.6135580348424853,-0.5463196881064114,-0.48268196864100077,-0.4220645249638933,-0.3639702342662046,-0.3079672242245839,-0.2536747544219042,-0.20075192045618975,-0.14888842658875015,-0.0977968658780726,-0.0472060789497551,0.0031447477575171027,0.053511524523327074,0.10415048645672938,0.15532343574749335,0.2073032276826146,0.26037974854899787,0.31486667163957155,0.37110933985948347,0.4294942176811874,0.4904604938381851,0.5545146186093382,0.6222488562901423,0.6943653727480709,0.7717080375836655,0.8553051281902178,0.9464276939241498,1.046670843829951,1.1580693205789947,1.2832656277865202,1.425760995123621,1.5903011783003014,1.7834900451324374,2.014805108952521,2.298359992346955,2.656144459037156,3.1244221070305684,3.7675725030756277,4.711915780970134,6.243837264833005,9.180954248158836,17.16933692948583,127.19400989380446,-23.540778558685325,-10.748434459981121,-6.94106544266073,-5.105966289668628,-4.0215545374912125,-3.3023988466458953,-2.788332008612399,-2.4008559214308742,-2.0969678543944603,-1.8511306354317894,-1.6472189205282064,-1.4745453847224264,-1.325743220688421,-1.1955663074917369,-1.0801742868970579,-0.9766882983347227,-0.8829048802213763,-0.7971059777947198,-0.7179293425740838,-0.6442780045063048,-0.5752556773556083,-0.5101197666984595,-0.44824656338659274,-0.38910501824834876,-0.33223664889218596,-0.27723988101322994,-0.22375762456725923,-0.17146722018948496,-0.12007211922001101,-0.06929481677570058,-0.018870663827498763,0.03145774450612913,0.08194586220775393,0.1328524006247726,0.1844446788153633,0.2370043537714925,0.29083379742623017,0.3462634383068285,0.40366046474614037,0.4634394038786042,0.5260752622071363,0.5921201643344917,0.6622247959029677,0.7371665078615982,0.8178867744530531,0.905541987518237,1.0015736061642282,1.1078069745161507,1.2265935957367442,1.3610210399366751,1.515231342736985,1.6949196010305703,1.9081442634707615,2.166703022272046,2.4885956999337355,2.9027281128259124,3.4586612781636346,4.249094122520249,5.469882355126732,7.618895945572901,12.443516159795724,33.46283857735784,-48.91496718138221,-14.109365540316384,-8.219124505230534,-5.7774662378937425,-4.436374181716008,-3.585079467381242,-2.99415996729594,-2.5580906728412844,-2.2215498646330145,-1.952732573634776,-1.7320508075688759,-1.546777699675023,-1.3882818233807632,-1.2504992244364808,-1.1290417550265288,-1.020652589802462,-0.9228607826138446,-0.8337548073494865,-0.7518298196381283,-0.675882033056189,-0.6049340314540249,-0.5381808821059098,-0.4749505294637657,-0.4146741735238079,-0.35686373986844755,-0.30109445328846884,-0.2469911218755624,-0.19421713626256892,-0.14246545818476242,-0.09145105670636514,-0.0409043765059784,0.00943449207824215,0.059821215895606336,0.11051243650338867,0.1617710301240586,0.213871640999145,0.2671067398821473,0.3217935002258537,0.3782818503907673,0.4369641592076489,0.4982871576036697,0.562766911298146,0.6310079710312123,0.7037282885968723,0.7817921817640575,0.8662546952142265,0.9584223677473829,1.0599380763779649,1.1729019959705818,1.3000480989153307,1.4450085311075016,1.612721647307265,1.81008397286971,2.0470351733801877,2.338453456446341,2.7076682518298645,3.193467233977922,3.8654593963979704,4.862303927567562,6.505608406613952,9.750264457590887,19.25491758435845,635.9826284707383,-20.499335183583323,-10.06192931238015,-6.644693601459513,-4.941000121604412,-3.9162091707266327,-3.229040097795126,-2.7340936254365107,-2.358945526952387,-2.0634632787789924,-1.823609173649607,-1.624103201382211,-1.4547639990087777,-1.3085425918975722,-1.1804006289277595,-1.066638182940494,-0.9644740369651207,-0.8717742890897112,-0.7868714839183629,-0.7084408499303172,-0.6354136087103726,-0.566914962469613,-0.5022188760227442,-0.44071451131151484,-0.3818808840300874,-0.3252674053879335,-0.27047868522400825,-0.2171624462163606,-0.16499971803703076,-0.11369669769912241,-0.0629778112048873,-0.012579613061528437,0.03775477220312264,0.08828092019438445,0.13925832020286932,0.19095575961986722,0.2436571195962464,0.2976678539289936,0.3533224772166887,0.41099347150637594,0.47110214372695336,0.5341321460714564,0.6006466345982049,0.6713104294089032,0.7469191196980473,0.8284379379329526,0.9170545916889092,1.0142524012417635,1.121913595239986,1.2424684636905994,1.3791161357063684,1.5361607194628344,1.7195399614025553,1.9376887671337688,2.203014387021789,2.5345565583580676,2.9631148916841505,3.542001589384408,4.372231221755159,5.67128181961774,8.008971289053951,13.506913688294944,42.39101470463054,-37.4018631683468,-12.953555820974685,-7.809143923549587,-5.56881858031629,-4.30982821372209,-3.4998728029928223,-2.9326430460567368,-2.511394636549194,-2.1847339671705495,-1.9228271903539462,-1.7071636927931313,-1.5256458239185915,-1.3700296073885174,-1.2345002150727045,-1.1148355568421997,-1.0078929105452745,-0.9112817934729587,-0.8231486998483446,-0.7420314349117173,-0.6667580873413677,-0.5963754039811092,-0.530096988640722,-0.467265143868991,-0.40732227160748424,-0.3497890752959678,-0.2942476637828676,-0.24032822269800647,-0.18769829758997067,-0.13605399000992505,-0.08511254338824134,-0.03460591571170043,0.015724982894806602,0.06613565708501476,0.11688323675815018,0.16823175830874781,0.22045774922595457,0.2738563717165739,0.32874842463051596,0.3854885723591214,0.44447527333862935,0.5061630332192314,0.5710778303855008,0.6398368884693916,0.7131744560758717,0.7919759860219218,0.8773242302087361,0.9705625276224014,1.0733833892239197,1.1879551400926869,1.3171072840472398,1.464609137052311,1.6356016124745627,1.8372903975852939,2.0801059830267534,2.3797439019015045,2.7609773525461323,3.2653428234794797,3.9682245482561287,5.022180509799778,6.7897154648067035,10.39396219891902,21.915251866387216,-211.99281182737522,-18.152599210629408,-9.457143615789041,-6.372100065919585,-4.785978131281331,-3.8159286218685686,-3.158601757681227,-2.6816890992870563,-2.318260576808902,-2.030817223997174,-1.7967118784207035,-1.6014549561359859,-1.4353413234824086,-1.291622779596701,-1.1654584768562484,-1.0532824875254252,-0.9524070683319785,-0.8607650920704439,-0.7767377936845333,-0.6990365394535254,-0.6266197834750373,-0.5586335162987132,-0.49436774181315973,-0.43322409999302125,-0.37469136940524406,-0.31832661885786506,-0.26374045454167466,-0.2105852594160008,-0.15854562559563493,-0.10733038781511577,-0.056665808017001794,-0.006289557715227058,0.04405479120513616,0.09462301714521348,0.14567547116533952,0.1974824992022199,0.25033030738516915,0.3045275478596295,0.36041295978906707,0.41836448768300516,0.47881042829142023,0.5422433458846897,0.6092377717880143,0.6804731117879395,0.7567637954942358,0.8390996311772765,0.9287007726703539,1.0270939959647876,1.136220712971784,1.2585933965555218,1.3975278930344102,1.5574984715292317,1.7446986898797727,1.9679622853116698,2.2403461499271917,2.5820065007541584,3.025795233347978,3.6291397559349385,4.502332216795288,5.887580516682652,8.440429657506295,14.767761718271888,57.81088476904906,-30.273904647357853,-11.971890741200479,-7.43755114693444,-5.3742922551202925,-4.189961726778458,-3.4183365915028,-2.8733543870902634,-2.4661508415182216,-2.1489161306012754,-1.8936364991945727,-1.6828053415846191,-1.5049156412977833,-1.3520892583960227,-1.2187477388598282,-1.100827194152826,-0.9952939845743664,-0.8998347792389378,-0.8126518474617492,-0.7323240844178286,-0.6577103466554531,-0.5878807423302681,-0.5220668206746542,-0.4596247989271484,-0.4000079427694678,-0.3427454711768958,-0.28742617000053444,-0.23368543583964738,-0.1811948322586949,-0.1296534852891357,-0.07878081270835548,-0.028310196115142537,0.022016718133630073,0.07245535362128867,0.12326341081342977,0.17470617321171497,0.2270621471677262,0.28062929527986397,0.3357321697739542,0.39273032541552777,0.4520285006327489,0.5140892153431421,0.5794486674545933,0.6487371532968751,0.7227057479336936,0.8022617528708318,0.8885166060125333,0.9828518148349097,1.087011477491604,1.2032349231232162,1.3344514674506371,1.484574211907914,1.6589572126462215,1.865132954236754,2.1140535910552205,2.422289161339593,2.8161706325192224,3.340232616138374,4.0762507092365725,5.1924866714950735,7.099170166799192,11.127708152523553,25.42622168134387,-90.85106719507888,-16.286814403661683,-8.92026550992501,-6.120514421645942,-4.640016262480582,-3.7203488200051997,-3.0909075867704536,-2.6310230276366497,-2.2787450169640215,-1.9989946236174483,-1.7704156972977487,-1.5792584075364213,-1.4162661931388358,-1.2749756562202441,-1.1507337891978568,-1.0401025820016139,-0.9404838064389384,-0.8498744570566339,-0.7667026350778762,-0.6897145615503878,-0.617895001894788,-0.5504100610519679,-0.48656528018136663,-0.4257743973175704,-0.36753566134893534,-0.31141356955857574,-0.2570245417380079,-0.2040254723817208,-0.15210439213932672,-0.10097266742349273,-0.05035830245825518,-1.4695761589768238e-15],"x":[-12.566370614359172,-12.51605481610348,-12.465739017847788,-12.415423219592096,-12.365107421336404,-12.314791623080712,-12.264475824825018,-12.214160026569324,-12.163844228313632,-12.113528430057942,-12.063212631802248,-12.012896833546556,-11.962581035290864,-11.912265237035172,-11.861949438779478,-11.811633640523787,-11.761317842268095,-11.711002044012403,-11.66068624575671,-11.610370447501017,-11.560054649245327,-11.509738850989631,-11.45942305273394,-11.409107254478247,-11.358791456222555,-11.308475657966861,-11.25815985971117,-11.207844061455479,-11.157528263199787,-11.107212464944093,-11.0568966666884,-11.00658086843271,-10.956265070177016,-10.905949271921324,-10.855633473665632,-10.80531767540994,-10.755001877154244,-10.704686078898554,-10.654370280642862,-10.604054482387168,-10.553738684131476,-10.503422885875784,-10.453107087620092,-10.4027912893644,-10.352475491108708,-10.302159692853015,-10.251843894597323,-10.20152809634163,-10.15121229808594,-10.100896499830247,-10.050580701574553,-10.000264903318861,-9.949949105063167,-9.899633306807475,-9.849317508551783,-9.799001710296091,-9.748685912040399,-9.698370113784707,-9.648054315529013,-9.597738517273323,-9.54742271901763,-9.497106920761937,-9.446791122506244,-9.396475324250552,-9.34615952599486,-9.295843727739168,-9.245527929483476,-9.195212131227784,-9.14489633297209,-9.094580534716396,-9.044264736460706,-8.993948938205014,-8.94363313994932,-8.893317341693628,-8.843001543437936,-8.792685745182244,-8.742369946926551,-8.69205414867086,-8.641738350415167,-8.591422552159475,-8.541106753903781,-8.490790955648091,-8.440475157392399,-8.390159359136703,-8.339843560881011,-8.289527762625319,-8.239211964369627,-8.188896166113935,-8.138580367858243,-8.08826456960255,-8.037948771346858,-7.987632973091165,-7.937317174835473,-7.887001376579782,-7.836685578324088,-7.786369780068395,-7.736053981812703,-7.685738183557012,-7.635422385301318,-7.585106587045627,-7.534790788789935,-7.484474990534243,-7.434159192278549,-7.383843394022857,-7.3335275957671655,-7.283211797511472,-7.2328959992557795,-7.182580201000087,-7.132264402744396,-7.081948604488702,-7.031632806233011,-6.981317007977318,-6.931001209721626,-6.880685411465933,-6.830369613210241,-6.780053814954549,-6.729738016698856,-6.679422218443164,-6.629106420187471,-6.5787906219317795,-6.528474823676086,-6.478159025420394,-6.427843227164702,-6.37752742890901,-6.327211630653317,-6.276895832397625,-6.226580034141932,-6.176264235886239,-6.125948437630547,-6.075632639374855,-6.025316841119164,-5.97500104286347,-5.924685244607778,-5.874369446352087,-5.824053648096394,-5.773737849840701,-5.7234220515850085,-5.673106253329316,-5.622790455073623,-5.572474656817931,-5.522158858562239,-5.471843060306548,-5.421527262050853,-5.371211463795161,-5.32089566553947,-5.270579867283778,-5.220264069028084,-5.169948270772393,-5.119632472516701,-5.069316674261007,-5.019000876005315,-4.9686850777496225,-4.918369279493931,-4.8680534812382374,-4.817737682982545,-4.767421884726854,-4.717106086471162,-4.666790288215467,-4.616474489959776,-4.566158691704084,-4.515842893448391,-4.465527095192699,-4.415211296937007,-4.3648954986813155,-4.314579700425622,-4.264263902169929,-4.2139481039142375,-4.163632305658545,-4.1133165074028515,-4.06300070914716,-4.012684910891468,-3.962369112635774,-3.9120533143800826,-3.8617375161243905,-3.8114217178686993,-3.761105919613005,-3.710790121357313,-3.6604743231016217,-3.6101585248459274,-3.5598427265902353,-3.509526928334544,-3.459211130078852,-3.4088953318231576,-3.3585795335674664,-3.3082637353117743,-3.257947937056082,-3.2076321388003888,-3.1573163405446967,-3.1070005422890055,-3.0566847440333116,-3.006368945777619,-2.956053147521928,-2.9057373492662357,-2.855421551010542,-2.80510575275485,-2.754789954499158,-2.704474156243466,-2.654158357987773,-2.6038425597320805,-2.5535267614763892,-2.5032109632206954,-2.4528951649650033,-2.4025793667093116,-2.3522635684536195,-2.3019477701979256,-2.2516319719422344,-2.201316173686542,-2.1510003754308498,-2.1006845771751568,-2.0503687789194642,-2.000052980663772,-1.9497371824080791,-1.8994213841523868,-1.8491055858966956,-1.7987897876410035,-1.7484739893853094,-1.698158191129618,-1.6478423928739259,-1.5975265946182335,-1.5472107963625397,-1.4968949981068491,-1.446579199851157,-1.396263401595463,-1.3459476033397708,-1.2956318050840785,-1.2453160068283864,-1.195000208572694,-1.144684410317002,-1.0943686120613096,-1.0440528138056175,-0.9937370155499234,-0.9434212172942331,-0.8931054190385409,-0.8427896207828468,-0.7924738225271546,-0.7421580242714624,-0.6918422260157702,-0.641526427760078,-0.5912106295043857,-0.5408948312486935,-0.4905790329930013,-0.44026323473730733,-0.3899474364816151,-0.3396316382259247,-0.2893158399702307,-0.23900004171453845,-0.18868424345884624,-0.13836844520315403,-0.08805264694746183,-0.03773684869176962,0.012578949563922597,0.06289474781961481,0.11321054607530884,0.16352634433100105,0.21384214258669143,0.2641579408423855,0.3144737390980777,0.3647895373537699,0.4151053356094621,0.4654211338651543,0.5157369321208465,0.5660527303765387,0.6163685286322309,0.666684326887925,0.7170001251436172,0.7673159233993075,0.8176317216550016,0.8679475199106939,0.9182633181663861,0.9685791164220783,1.0188949146777704,1.0692107129334627,1.1195265111891548,1.1698423094448471,1.2201581077005412,1.2704739059562333,1.3207897042119237,1.3711055024676178,1.42142130072331,1.4717370989790022,1.5220528972346945,1.5723686954903884,1.622684493746079,1.673000292001771,1.7233160902574634,1.7736318885131572,1.8239476867688496,1.8742634850245399,1.924579283280234,1.974895081535926,2.025210879791618,2.0755266780473107,2.1258424763030046,2.176158274558695,2.226474072814387,2.2767898710700814,2.3271056693257735,2.3774214675814656,2.427737265837156,2.47805306409285,2.5283688623485423,2.5786846606042344,2.6290004588599265,2.679316257115621,2.729632055371311,2.7799478536270033,2.8302636518826976,2.8805794501383897,2.9308952483940818,2.981211046649772,3.0315268449054664,3.0818426431611585,3.1321584414168506,3.1824742396725427,3.232790037928237,3.2831058361839274,3.3334216344396195,3.3837374326953134,3.434053230951006,3.484369029206698,3.5346848274623883,3.585000625718082,3.6353164239737747,3.685632222229467,3.735948020485159,3.786263818740853,3.8365796169965436,3.8868954152522357,3.9372112135079296,3.9875270117636217,4.037842810019314,4.088158608275006,4.138474406530698,4.1887902047863905,4.239106003042083,4.289421801297775,4.3397375995534695,4.39005339780916,4.440369196064852,4.490684994320546,4.541000792576238,4.59131659083193,4.641632389087622,4.691948187343315,4.742263985599007,4.792579783854699,4.842895582110391,4.893211380366085,4.943527178621776,4.993842976877469,5.044158775133161,5.094474573388855,5.144790371644547,5.19510616990024,5.24542196815593,5.295737766411623,5.346053564667315,5.396369362923008,5.4466851611787,5.497000959434392,5.547316757690085,5.597632555945777,5.64794835420147,5.6982641524571624,5.748579950712855,5.798895748968546,5.849211547224239,5.899527345479932,5.949843143735625,6.000158941991317,6.05047474024701,6.100790538502701,6.151106336758393,6.201422135014086,6.251737933269779,6.302053731525472,6.352369529781162,6.402685328036855,6.4530011262925475,6.5033169245482405,6.553632722803933,6.603948521059626,6.654264319315318,6.70458011757101,6.754895915826703,6.805211714082395,6.855527512338088,6.905843310593778,6.956159108849471,7.006474907105163,7.056790705360857,7.10710650361655,7.157422301872242,7.2077381001279335,7.258053898383626,7.308369696639319,7.358685494895011,7.409001293150704,7.459317091406395,7.509632889662088,7.55994868791778,7.610264486173473,7.660580284429166,7.710896082684858,7.761211880940549,7.811527679196241,7.861843477451935,7.912159275707627,7.96247507396332,8.012790872219012,8.063106670474705,8.113422468730397,8.163738266986089,8.214054065241783,8.264369863497475,8.314685661753167,8.365001460008857,8.415317258264551,8.465633056520243,8.515948854775935,8.566264653031629,8.61658045128732,8.666896249543012,8.717212047798704,8.767527846054398,8.817843644310091,8.868159442565783,8.918475240821474,8.968791039077168,9.01910683733286,9.069422635588552,9.119738433844246,9.170054232099936,9.220370030355628,9.27068582861132,9.321001626867014,9.371317425122706,9.421633223378398,9.471949021634092,9.522264819889784,9.572580618145473,9.622896416401169,9.673212214656859,9.723528012912553,9.773843811168245,9.824159609423937,9.87447540767963,9.924791205935323,9.975107004191015,10.025422802446709,10.075738600702401,10.12605439895809,10.176370197213783,10.226685995469474,10.277001793725168,10.32731759198086,10.377633390236554,10.427949188492248,10.47826498674794,10.528580785003632,10.578896583259326,10.629212381515018,10.679528179770706,10.7298439780264,10.78015977628209,10.830475574537784,10.880791372793478,10.931107171049169,10.981422969304862,11.031738767560554,11.082054565816247,11.132370364071942,11.182686162327634,11.233001960583326,11.283317758839017,11.333633557094707,11.383949355350401,11.434265153606095,11.484580951861785,11.534896750117479,11.585212548373171,11.635528346628863,11.685844144884557,11.73615994314025,11.786475741395941,11.836791539651632,11.887107337907322,11.937423136163018,11.987738934418712,12.038054732674402,12.088370530930096,12.138686329185788,12.18900212744148,12.239317925697174,12.289633723952866,12.339949522208558,12.390265320464248,12.440581118719939,12.490896916975633,12.541212715231326,12.591528513487017,12.64184431174271,12.692160109998403,12.742475908254097,12.79279170650979,12.843107504765483,12.893423303021175,12.943739101276865,12.994054899532555,13.04437069778825,13.094686496043943,13.145002294299633,13.195318092555327,13.24563389081102,13.295949689066711,13.346265487322405,13.396581285578097,13.44689708383379,13.497212882089482,13.547528680345174,13.597844478600866,13.64816027685656,13.69847607511225,13.748791873367944,13.799107671623636,13.849423469879328,13.899739268135022,13.950055066390714,14.000370864646406,14.050686662902097,14.101002461157789,14.15131825941348,14.201634057669175,14.251949855924865,14.30226565418056,14.352581452436253,14.402897250691945,14.453213048947639,14.50352884720333,14.553844645459023,14.604160443714713,14.654476241970405,14.704792040226097,14.755107838481791,14.805423636737482,14.855739434993176,14.906055233248868,14.95637103150456,15.006686829760254,15.057002628015947,15.10731842627164,15.15763422452733,15.207950022783022,15.258265821038714,15.308581619294408,15.358897417550098,15.409213215805792,15.459529014061484,15.509844812317176,15.56016061057287,15.610476408828562,15.660792207084254,15.711108005339948,15.761423803595637,15.811739601851329,15.862055400107025,15.912371198362715,15.962686996618409,16.0130027948741,16.063318593129793,16.113634391385485,16.163950189641177,16.214265987896873,16.264581786152565,16.314897584408254,16.365213382663946,16.41552918091964,16.46584497917533,16.516160777431026,16.566476575686718,16.61679237394241,16.667108172198102,16.717423970453797,16.767739768709486,16.81805556696518,16.868371365220867,16.918687163476562,16.969002961732254,17.019318759987947,17.069634558243642,17.119950356499334,17.170266154755026,17.22058195301072,17.270897751266414,17.321213549522103,17.3715293477778,17.421845146033483,17.47216094428918,17.52247674254487,17.572792540800563,17.623108339056255,17.67342413731195,17.72373993556764,17.774055733823335,17.82437153207903,17.87468733033472,17.925003128590415,17.9753189268461,18.025634725101796,18.075950523357488,18.12626632161318,18.176582119868872,18.226897918124568,18.277213716380256,18.327529514635952,18.377845312891644,18.428161111147336,18.478476909403028,18.528792707658717,18.579108505914412,18.629424304170104,18.679740102425797,18.73005590068149,18.780371698937184,18.830687497192873,18.88100329544857,18.93131909370426,18.981634891959953,19.031950690215645,19.082266488471333,19.132582286727025,19.18289808498272,19.23321388323841,19.283529681494105,19.3338454797498,19.38416127800549,19.434477076261185,19.484792874516877,19.53510867277257,19.58542447102826,19.63574026928395,19.686056067539642,19.736371865795338,19.786687664051026,19.837003462306722,19.887319260562414,19.937635058818106,19.9879508570738,20.038266655329494,20.088582453585182,20.138898251840878,20.189214050096574,20.23952984835226,20.289845646607954,20.340161444863643,20.39047724311934,20.44079304137503,20.491108839630723,20.541424637886415,20.59174043614211,20.6420562343978,20.692372032653495,20.742687830909187,20.793003629164875,20.843319427420568,20.89363522567626,20.943951023931955,20.994266822187647,21.04458262044334,21.09489841869903,21.145214216954727,21.195530015210416,21.24584581346611,21.296161611721804,21.346477409977492,21.396793208233184,21.447109006488876,21.49742480474457,21.547740603000264,21.598056401255953,21.64837219951165,21.698687997767344,21.749003796023032,21.799319594278728,21.849635392534417,21.89995119079011,21.9502669890458,22.000582787301493,22.050898585557185,22.10121438381288,22.15153018206857,22.201845980324265,22.252161778579957,22.30247757683565,22.35279337509134,22.403109173347037,22.453424971602722,22.503740769858418,22.55405656811411,22.6043723663698,22.654688164625497,22.705003962881186,22.75531976113688,22.805635559392574,22.855951357648266,22.906267155903958,22.956582954159654,23.00689875241534,23.057214550671034,23.107530348926723,23.15784614718242,23.20816194543811,23.258477743693803,23.3087935419495,23.35910934020519,23.409425138460882,23.459740936716575,23.51005673497227,23.560372533227955,23.61068833148365,23.66100412973934,23.711319927995035,23.761635726250727,23.81195152450642,23.86226732276211,23.912583121017807,23.962898919273496,24.01321471752919,24.063530515784887,24.113846314040575,24.164162112296268,24.214477910551956,24.26479370880765,24.315109507063344,24.365425305319036,24.415741103574728,24.466056901830424,24.516372700086112,24.566688498341808,24.6170042965975,24.667320094853192,24.71763589310888,24.767951691364573,24.81826748962027,24.86858328787596,24.918899086131653,24.969214884387345,25.01953068264304,25.06984648089873,25.120162279154425,25.170478077410117,25.22079387566581,25.271109673921497,25.32142547217719,25.37174127043288,25.422057068688577,25.472372866944266,25.52268866519996,25.573004463455657,25.623320261711346,25.67363605996704,25.723951858222733,25.774267656478425,25.824583454734114,25.874899252989806,25.925215051245498,25.975530849501194,26.025846647756882,26.076162446012578,26.12647824426827,26.176794042523962,26.227109840779654,26.27742563903535,26.32774143729104,26.37805723554673,26.428373033802423,26.478688832058115,26.52900463031381,26.5793204285695,26.629636226825195,26.679952025080887,26.73026782333658,26.78058362159227,26.830899419847967,26.881215218103655,26.931531016359347,26.981846814615036,27.03216261287073,27.082478411126424,27.132794209382116,27.18311000763781,27.233425805893503,27.283741604149196,27.334057402404888,27.384373200660583,27.434688998916272,27.485004797171964,27.535320595427653,27.585636393683348,27.63595219193904,27.686267990194732,27.736583788450424,27.78689958670612,27.83721538496181,27.887531183217504,27.9378469814732,27.98816277972889,28.03847857798458,28.08879437624027,28.139110174495965,28.189425972751657,28.23974177100735,28.29005756926304,28.340373367518737,28.390689165774425,28.44100496403012,28.491320762285813,28.541636560541505,28.591952358797197,28.642268157052886,28.692583955308578,28.742899753564274,28.793215551819966,28.843531350075658,28.893847148331353,28.944162946587042,28.994478744842738,29.04479454309843,29.095110341354122,29.145426139609814,29.195741937865503,29.246057736121195,29.29637353437689,29.34668933263258,29.397005130888274,29.447320929143967,29.49763672739966,29.547952525655354,29.598268323911046,29.64858412216674,29.69889992042243,29.74921571867812,29.79953151693381,29.849847315189507,29.900163113445196,29.95047891170089,30.000794709956583,30.051110508212275,30.101426306467967,30.151742104723663,30.20205790297935,30.252373701235047,30.302689499490732,30.353005297746428,30.403321096002124,30.453636894257812,30.503952692513508,30.5542684907692,30.604584289024892,30.654900087280584,30.70521588553628,30.75553168379197,30.805847482047664,30.85616328030335,30.906479078559045,30.956794876814737,31.00711067507043,31.057426473326124,31.107742271581817,31.15805806983751,31.2083738680932,31.25868966634889,31.309005464604585,31.359321262860277,31.40963706111597,31.45995285937166,31.510268657627357,31.560584455883046,31.61090025413874,31.661216052394433,31.71153185065012,31.761847648905817,31.812163447161502,31.8624792454172,31.912795043672894,31.963110841928586,32.01342664018428,32.063742438439974,32.11405823669566,32.16437403495136,32.214689833207046,32.265005631462735,32.31532142971843,32.36563722797412,32.415953026229815,32.46626882448551,32.5165846227412,32.566900420996895,32.61721621925259,32.66753201750828,32.717847815763974,32.76816361401966,32.81847941227536,32.86879521053105,32.919111008786736,32.96942680704243,33.01974260529813,33.07005840355382,33.12037420180951,33.1706900000652,33.221005798320896,33.27132159657659,33.32163739483228,33.37195319308797,33.422268991343664,33.47258478959935,33.52290058785505,33.573216386110744,33.62353218436644,33.67384798262213,33.72416378087782,33.77447957913351,33.82479537738921,33.875111175644896,33.925426973900585,33.97574277215628,34.02605857041197,34.076374368667665,34.12669016692335,34.177005965179056,34.227321763434745,34.27763756169043,34.32795335994613,34.378269158201824,34.42858495645751,34.4789007547132,34.5292165529689,34.579532351224586,34.62984814948028,34.68016394773597,34.73047974599167,34.78079554424736,34.83111134250305,34.88142714075874,34.93174293901444,34.98205873727013,35.032374535525825,35.082690333781514,35.1330061320372,35.1833219302929,35.23363772854859,35.28395352680429,35.33426932505998,35.38458512331567,35.434900921571355,35.48521671982706,35.535532518082746,35.58584831633844,35.63616411459412,35.68647991284982,35.736795711105515,35.7871115093612,35.837427307616906,35.887743105872595,35.93805890412828,35.98837470238397,36.038690500639674,36.08900629889536,36.13932209715106,36.18963789540674,36.239953693662436,36.29026949191813,36.34058529017382,36.390901088429516,36.44121688668521,36.4915326849409,36.54184848319659,36.59216428145229,36.64248007970798,36.692795877963675,36.74311167621936,36.79342747447505,36.84374327273075,36.89405907098644,36.94437486924213,36.99469066749783,37.04500646575352,37.095322264009205,37.1456380622649,37.195953860520596,37.24626965877629,37.29658545703197,37.34690125528766,37.397217053543365,37.44753285179905,37.49784865005475,37.548164448310445,37.59848024656613,37.64879604482182,37.69911184307752]}
},{}],68:[function(require,module,exports){
module.exports={"expected":[-4.898587196589413e-16,0.025163208116819352,0.05035830245825143,0.0756173310758534,0.10097266742349074,0.12645717746189428,0.15210439213933016,0.17794868719628548,0.2040254723817206,0.2303713923500973,0.257024541738002,0.28402469720342594,0.3114135695585755,0.33923507954975896,0.367535661348923,0.39636459843871885,0.4257743973175618,0.4558212053507266,0.4865652801813708,0.5180715194346439,0.5504100610519677,0.5836569665499127,0.6178950018947853,0.6532145336319704,0.6897145615503822,0.7275039136822585,0.7667026350778731,0.8074436088685448,0.8498744570566397,0.8941597798006832,0.940483806438938,0.9890535501154691,1.0401025820016025,1.0938955726123736,1.1507337891978564,1.210961793276557,1.2749756562202343,1.343233110768455,1.4162661931388139,1.494697119713588,1.579258407536433,1.6708186244662382,1.7704156972977554,1.8793004997944796,1.9989946236174652,2.1313680257411534,2.2787450169639873,2.444051442630342,2.6310230276366204,2.8445067481366975,3.090907586770452,3.378869649398059,3.720348820005197,4.132367366286109,4.640016262480458,5.281879551675317,6.120514421645935,7.264495499118026,8.920265509924707,11.534488904811303,16.286814403659744,27.639385539309202,90.8510671951067,-70.66007756374,-25.426221681342835,-15.490289214534599,-11.127708152523132,-8.673803360755915,-7.0991701667994755,-6.001849236738456,-5.192486671495177,-4.5701848366803715,-4.076250709236575,-3.674217351007761,-3.3402326161383114,-3.0580383251484426,-2.8161706325192872,-2.6063138895724687,-2.4222891613396067,-2.259409166249943,-2.1140535910552507,-1.9833816764700498,-1.8651329542367947,-1.7574861265604047,-1.6589572126462089,-1.5683247796847728,-1.4845742119079088,-1.4068555920370516,-1.3344514674506278,-1.2667518960787056,-1.2032349231232298,-1.1434511575500443,-1.0870114774916122,-1.0335771478232187,-0.98285181483491,-0.934574974371472,-0.8885166060125242,-0.8444727370136045,-0.8022617528708409,-0.7617213114316087,-0.7227057479336966,-0.6850838817055401,-0.6487371532968829,-0.6135580348424853,-0.579448667454596,-0.5463196881064114,-0.5140892153431401,-0.4826819686409986,-0.45202850063274913,-0.4220645249638933,-0.39273032541552594,-0.36397023426620256,-0.3357321697739623,-0.3079672242245839,-0.2806292952798699,-0.2536747544219023,-0.2270621471677264,-0.20075192045618975,-0.17470617321170967,-0.14888842658875015,-0.12326341081343538,-0.09779686587807439,-0.07245535362129064,-0.0472060789497551,-0.02201671813363559,0.00314474775751355,0.028310196115142353,0.053511524523327074,0.07878081270834993,0.10415048645673117,0.1296534852891355,0.15532343574749335,0.18119483225869656,0.20730322768261647,0.23368543583964718,0.26037974854899787,0.2874261700005285,0.31486667163957155,0.34274547117689363,0.37110933985948347,0.40000794276947377,0.4294942176811874,0.45962479892714175,0.4904604938381851,0.5220668206746517,0.5545146186093382,0.5878807423302607,0.6222488562901373,0.6577103466554504,0.6943653727480709,0.73232408441782,0.7717080375836711,0.812651847461746,0.8553051281902178,0.8998347792389407,0.9464276939241498,0.9952939845743625,1.046670843829951,1.1008271941528138,1.1580693205789947,1.2187477388598145,1.2832656277865202,1.3520892583960373,1.425760995123621,1.5049156412977884,1.590301178300289,1.682805341584598,1.7834900451324374,1.8936364991945474,2.014805108952503,2.1489161306012643,2.2983599923469775,2.4661508415181825,2.656144459037185,2.873354387090245,3.1244221070305684,3.41833659150282,3.7675725030756277,4.189961726778422,4.711915780970134,5.374292255120127,6.243837264833005,7.43755114693433,9.180954248158836,11.971890741201221,17.16933692948583,30.273904647356055,127.19400989374698,-57.81088476906749,-23.540778558685325,-14.767761718273874,-10.748434459981535,-8.440429657506437,-6.941065442660556,-5.887580516682595,-5.105966289668532,-4.50233221679533,-4.0215545374912125,-3.6291397559349163,-3.3023988466458953,-3.025795233347998,-2.788332008612399,-2.5820065007541464,-2.4008559214308742,-2.2403461499272037,-2.0969678543944603,-1.9679622853116794,-1.8511306354317894,-1.7446986898797805,-1.6472189205282197,-1.5574984715292384,-1.4745453847224264,-1.3975278930344368,-1.3257432206884308,-1.258593396555527,-1.1955663074917284,-1.136220712971805,-1.08017428689705,-1.0270939959647916,-0.9766882983347227,-0.9287007726703576,-0.8829048802213763,-0.8390996311772798,-0.7971059777947198,-0.7567637954942332,-0.7179293425740838,-0.6804731117879476,-0.6442780045063048,-0.6092377717880122,-0.5752556773556083,-0.5422433458846923,-0.510119766698464,-0.4788104282914226,-0.44824656338659274,-0.41836448768301576,-0.38910501824835286,-0.36041295978906523,-0.33223664889218596,-0.30452754785963937,-0.2772398810132261,-0.2503303073851674,-0.22375762456725923,-0.19748249920221825,-0.17146722018948496,-0.14567547116534152,-0.12007211922001101,-0.09462301714521545,-0.06929481677570058,-0.044054791205141684,-0.018870663827498763,0.006289557715225097,0.03145774450612913,0.05666580801699983,0.08194586220775393,0.1073303878151102,0.1328524006247726,0.15854562559562926,0.18444467881535964,0.21058525941600245,0.2370043537714925,0.26374045454167255,0.290833797426234,0.3183266188578668,0.3462634383068285,0.3746913694052459,0.40366046474614037,0.4332240999930189,0.4634394038786042,0.49436774181315285,0.5260752622071363,0.558633516298706,0.5921201643344917,0.6266197834750297,0.6622247959029677,0.6990365394535278,0.7371665078615982,0.7767377936845244,0.8178867744530531,0.8607650920704467,0.9055419875182306,0.9524070683319747,1.0015736061642353,1.0532824875254212,1.1078069745161587,1.165458476856244,1.2265935957367442,1.2916227795967052,1.3610210399366751,1.4353413234824026,1.515231342736985,1.601454956135979,1.6949196010305703,1.7967118784206952,1.9081442634707615,2.0308172239971456,2.1667030222720256,2.318260576808912,2.4885956999337355,2.681689099287011,2.9027281128259124,3.158601757681245,3.4586612781635884,3.815928621868538,4.249094122520181,4.785978131281284,5.469882355126842,6.372100065919355,7.618895945572901,9.457143615789185,12.443516159795724,18.15259921062759,33.46283857735784,211.99281182728717,-48.91496718138221,-21.91525186638987,-14.109365540316384,-10.393962198919233,-8.219124505230777,-6.789715464806628,-5.7774662378937425,-5.022180509799829,-4.436374181716008,-3.968224548256102,-3.5850794673812914,-3.265342823479461,-2.9941599672959756,-2.760977352546149,-2.5580906728412574,-2.3797439019015414,-2.2215498646330145,-2.0801059830267445,-1.952732573634759,-1.837290397585318,-1.7320508075688759,-1.6356016124745698,-1.546777699675023,-1.4646091370523284,-1.3882818233807632,-1.317107284047245,-1.2504992244364899,-1.1879551400926918,-1.1290417550265288,-1.0733833892239164,-1.020652589802462,-0.9705625276224052,-0.9228607826138512,-0.8773242302087333,-0.8337548073494925,-0.791975986021925,-0.7518298196381283,-0.7131744560758694,-0.675882033056189,-0.6398368884693894,-0.60493403145402,-0.5710778303855033,-0.5381808821059098,-0.5061630332192338,-0.4749505294637657,-0.44447527333863596,-0.4146741735238079,-0.3854885723591277,-0.35686373986844755,-0.3287484246305181,-0.30109445328846884,-0.27385637171657223,-0.2469911218755624,-0.22045774922595662,-0.19421713626257261,-0.16823175830874618,-0.14246545818476242,-0.11688323675815578,-0.09145105670636514,-0.06613565708501315,-0.0409043765059784,-0.015724982894808563,0.009434492078245703,0.034605915711698465,0.059821215895606336,0.08511254338823579,0.11051243650338867,0.13605399000992305,0.1617710301240586,0.18769829758996495,0.213871640999145,0.24032822269800438,0.2671067398821473,0.2942476637828693,0.3217935002258537,0.3497890752959696,0.37828185039076323,0.40732227160748613,0.4369641592076447,0.46726514386898427,0.4982871576036697,0.530096988640724,0.562766911298146,0.5963754039811066,0.6310079710312172,0.6667580873413648,0.7037282885968723,0.7420314349117088,0.7817921817640575,0.8231486998483413,0.8662546952142265,0.9112817934729421,0.9584223677473829,1.0078929105452705,1.0599380763779649,1.1148355568421955,1.1729019959705818,1.2345002150727085,1.3000480989153211,1.3700296073885219,1.4450085311074907,1.525645823918585,1.612721647307265,1.7071636927931375,1.81008397286971,1.9228271903539536,2.0470351733802064,2.1847339671705384,2.338453456446341,2.5113946365491535,2.7076682518298645,2.932643046056718,3.193467233977922,3.499872802992702,3.8654593963979704,4.309828213722052,4.862303927567562,5.568818580316228,6.505608406613952,7.809143923549685,9.750264457590546,12.953555820974355,19.25491758435713,37.40186316834406,635.9826284721753,-42.39101470463406,-20.499335183583323,-13.506913688295302,-10.06192931238015,-8.00897128905408,-6.644693601459513,-5.671281819617806,-4.941000121604412,-4.372231221755199,-3.9162091707266327,-3.5420015893844345,-3.229040097795126,-2.9631148916841696,-2.734093625436541,-2.5345565583581084,-2.358945526952387,-2.2030143870217795,-2.063463278779011,-1.9376887671337781,-1.8236091736496223,-1.719539961402563,-1.624103201382211,-1.536160719462841,-1.4547639990087777,-1.379116135706374,-1.3085425918975722,-1.2424684636906134,-1.1804006289277595,-1.1219135952399903,-1.066638182940494,-1.0142524012417746,-0.9644740369651207,-0.9170545916889129,-0.8717742890897112,-0.8284379379329558,-0.7868714839183629,-0.7469191196980504,-0.7084408499303172,-0.6713104294089008,-0.6354136087103774,-0.6006466345982028,-0.5669149624696177,-0.5341321460714589,-0.5022188760227442,-0.4711021437269514,-0.44071451131151484,-0.4109934715063741,-0.3818808840300874,-0.3533224772166949,-0.3252674053879335,-0.2976678539289957,-0.27047868522400825,-0.24365711959625225,-0.2171624462163606,-0.19095575961986924,-0.16499971803703076,-0.13925832020287496,-0.11369669769912241,-0.08828092019438642,-0.0629778112048873,-0.037754772203124606,-0.01257961306153199,0.012579613061530031,0.03775477220311908,0.06297781120488177,0.08828092019438445,0.11369669769912404,0.13925832020286932,0.1649997180370324,0.19095575961986722,0.21716244621635855,0.2436571195962464,0.2704786852240062,0.2976678539289936,0.3252674053879313,0.3533224772166887,0.3818808840300852,0.41099347150637594,0.44071451131150824,0.47110214372695336,0.5022188760227417,0.5341321460714564,0.5669149624696105,0.6006466345982001,0.6354136087103748,0.671310429408898,0.7084408499303089,0.7469191196980473,0.7868714839183655,0.8284379379329526,0.8717742890897078,0.9170545916889092,0.9644740369651169,1.0142524012417635,1.0666381829404823,1.121913595239986,1.1804006289277549,1.2424684636905994,1.3085425918975668,1.3791161357063684,1.4547639990087715,1.5361607194628344,1.6241032013822039,1.7195399614025553,1.8236091736496138,1.937688767133752,2.063463278779001,2.203014387021768,2.358945526952351,2.5345565583580676,2.7340936254365245,2.9631148916841505,3.229040097795104,3.542001589384408,3.9162091707266007,4.372231221755159,4.941000121604271,5.67128181961774,6.644693601459424,8.008971289053951,10.061929312379586,13.506913688294944,20.4993351835825,42.39101470463054,-635.9826284729678,-37.4018631683468,-19.25491758435786,-12.953555820975284,-9.750264457590735,-7.809143923549807,-6.505608406614036,-5.56881858031629,-4.862303927567523,-4.30982821372209,-3.8654593963979447,-3.4998728029927753,-3.1934672339779437,-2.9326430460567368,-2.70766825182991,-2.511394636549194,-2.3384534564463535,-2.1847339671705495,-2.0470351733802166,-1.9228271903539462,-1.8100839728697182,-1.7071636927931313,-1.6127216473072847,-1.5256458239185915,-1.4450085311074967,-1.3700296073885276,-1.300048098915336,-1.2345002150727133,-1.1729019959705864,-1.1148355568421997,-1.059938076377969,-1.0078929105452745,-0.9584223677473799,-0.9112817934729522,-0.8662546952142298,-0.8231486998483446,-0.7817921817640607,-0.7420314349117173,-0.7037282885968753,-0.6667580873413677,-0.631007971031215,-0.5963754039811092,-0.5627669112981487,-0.530096988640722,-0.4982871576036766,-0.467265143868991,-0.43696415920764703,-0.4073222716074884,-0.3782818503907695,-0.3497890752959718,-0.32179350022585584,-0.2942476637828676,-0.2671067398821494,-0.24032822269800647,-0.21387164099914333,-0.18769829758996698,-0.16177103012406427,-0.13605399000992505,-0.11051243650339065,-0.08511254338824134,-0.059821215895611866,-0.03460591571170043,-0.009434492078244108,0.015724982894806602,0.04090437650597288,0.06613565708501476,0.09145105670636317,0.11688323675815018,0.14246545818476042,0.16823175830874415,0.1942171362625706,0.22045774922595085,0.24699112187556033,0.2738563717165739,0.30109445328847056,0.328748424630512,0.3568637398684493,0.3854885723591255,0.4146741735238014,0.44447527333862935,0.4749505294637633,0.5061630332192314,0.5381808821059026,0.5710778303855008,0.6049340314540222,0.6398368884693916,0.6758820330561809,0.7131744560758717,0.7518298196381253,0.7919759860219218,0.8337548073494832,0.8773242302087298,0.9228607826138475,0.9705625276223945,1.0206525898024508,1.0733833892239197,1.1290417550265324,1.1879551400926784,1.2504992244364848,1.3171072840472495,1.3882818233807577,1.464609137052311,1.5467776996750164,1.6356016124745627,1.732050807568868,1.8372903975852939,1.9527325736347667,2.0801059830267534,2.2215498646329817,2.3797439019015045,2.5580906728412693,2.7609773525461323,2.9941599672959205,3.265342823479438,3.5850794673812643,3.968224548256069,4.436374181715895,5.022180509799778,5.7774662378937975,6.789715464806536,8.219124505230399,10.393962198919407,14.109365540316704,21.915251866387216,48.914967181369015,-211.99281182737522,-33.46283857736004,-18.152599210629408,-12.44351615979603,-9.457143615789041,-7.6188959455730165,-6.372100065919585,-5.469882355126793,-4.785978131281331,-4.249094122520218,-3.815928621868624,-3.4586612781636137,-3.158601757681266,-2.9027281128259643,-2.6816890992870563,-2.488595699933724,-2.3182605768089246,-2.166703022272057,-2.0308172239971376,-1.9081442634707706,-1.7967118784207035,-1.6949196010305916,-1.6014549561359859,-1.5152313427369914,-1.4353413234824086,-1.3610210399366909,-1.291622779596701,-1.226593595736749,-1.1654584768562484,-1.107806974516163,-1.0532824875254252,-1.0015736061642393,-0.9524070683319853,-0.9055419875182341,-0.8607650920704502,-0.8178867744530564,-0.7767377936845333,-0.7371665078615958,-0.6990365394535307,-0.6622247959029655,-0.6266197834750324,-0.5921201643344943,-0.5586335162987085,-0.5260752622071387,-0.49436774181315973,-0.4634394038786066,-0.43322409999302125,-0.4036604647461468,-0.37469136940524406,-0.3462634383068307,-0.31832661885786506,-0.29083379742623616,-0.26374045454167466,-0.23700435377149456,-0.2105852594160045,-0.18444467881536533,-0.1585456255956313,-0.1328524006247746,-0.10733038781511577,-0.0819458622077559,-0.056665808017001794,-0.03145774450612754,-0.006289557715227058,0.018870663827493247,0.04405479120513972,0.06929481677569861,0.09462301714520989,0.12007211922000902,0.14567547116533952,0.17146722018948296,0.19748249920221622,0.22375762456725717,0.25033030738516915,0.27723988101322783,0.3045275478596334,0.3322366488921838,0.360412959789063,0.38910501824834653,0.4183644876830093,0.4482465633865904,0.47881042829142023,0.510119766698457,0.5422433458846897,0.5752556773556105,0.6092377717880143,0.6442780045062969,0.6804731117879395,0.7179293425740755,0.7567637954942358,0.7971059777947107,0.8390996311772765,0.8829048802213727,0.9287007726703539,0.9766882983347119,1.0270939959647876,1.0801742868970536,1.1362207129718005,1.1955663074917322,1.2585933965555218,1.3257432206884254,1.397527893034431,1.4745453847224088,1.5574984715292317,1.6472189205282124,1.7446986898797727,1.8511306354317962,1.9679622853116698,2.0969678543944306,2.2403461499271917,2.400855921430837,2.5820065007541584,2.7883320086123504,3.025795233347978,3.3023988466458722,3.6291397559349385,4.021554537491118,4.502332216795288,5.105966289668576,5.887580516682652,6.941065442660634,8.440429657506295,10.748434459981308,14.767761718273444,23.540778558682266,57.81088476904906,-127.19400989366372,-30.273904647357853,-17.169336929485358,-11.971890741200479,-9.180954248159003,-7.43755114693444,-6.243837264832941,-5.3742922551202925,-4.711915780970014,-4.189961726778458,-3.7675725030756575,-3.4183365915028903,-3.1244221070306275,-2.8733543870902634,-2.656144459037172,-2.4661508415182216,-2.2983599923469673,-2.1489161306012354,-2.014805108952513,-1.89363649919454,-1.7834900451324602,-1.6828053415846191,-1.590301178300321,-1.5049156412977833,-1.425760995123616,-1.3520892583960227,-1.2832656277865255,-1.2187477388598282,-1.1580693205789911,-1.100827194152826,-1.0466708438299699,-0.9952939845743664,-0.9464276939241535,-0.8998347792389378,-0.8553051281902211,-0.8126518474617492,-0.7717080375836686,-0.7323240844178286,-0.6943653727480685,-0.6577103466554429,-0.62224885629014,-0.5878807423302681,-0.5545146186093408,-0.5220668206746542,-0.49046049383818746,-0.4596247989271484,-0.4294942176811855,-0.4000079427694678,-0.3711093398594857,-0.3427454711768958,-0.3148666716395698,-0.28742617000053444,-0.2603797485490076,-0.23368543583964738,-0.2073032276826148,-0.1811948322586949,-0.15532343574749535,-0.1296534852891357,-0.10415048645673135,-0.07878081270835548,-0.0535115245233326,-0.028310196115142537,-0.0031447477575155093,0.022016718133630073,0.04720607894975848,0.07245535362128867,0.0977968658780724,0.12326341081342977,0.14888842658874632,0.17470617321171497,0.20075192045618773,0.2270621471677262,0.2536747544218983,0.28062929527986397,0.30796722422457395,0.33573216977396214,0.3639702342662044,0.39273032541552777,0.42206452496389096,0.45202850063274036,0.48268196864100055,0.5140892153431331,0.5463196881064065,0.5794486674545933,0.6135580348424851,0.6487371532968751,0.6850838817055477,0.7227057479336936,0.7617213114316084,0.8022617528708318,0.8444727370135859,0.8885166060125333,0.9345749743714683,0.9828518148349097,1.0335771478232074,1.087011477491604,1.1434511575500235,1.2032349231232338,1.2667518960787099,1.3344514674506371,1.4068555920370405,1.4845742119078913,1.5683247796847783,1.658957212646195,1.7574861265603896,1.865132954236754,1.983381676470049,2.1140535910552205,2.2594091662499745,2.422289161339593,2.606313889572467,2.8161706325192224,3.0580383251483485,3.340232616138374,3.6742173510077585,4.0762507092365725,4.570184836680289,5.1924866714950735,6.001849236738186,7.099170166799557,8.673803360755496,11.127708152523553,15.4902892145337,25.426221681339268,70.66007756374796,-90.85106719513755,-27.639385539312062,-16.286814403661683,-11.534488904811326,-8.92026550992501,-7.264495499117749,-6.120514421645942,-5.281879551675322,-4.640016262480582,-4.132367366286145,-3.7203488200051997,-3.378869649398061,-3.0909075867704536,-2.8445067481367317,-2.6310230276366497,-2.4440514426303928,-2.2787450169639776,-2.1313680257411742,-1.9989946236174483,-1.8793004997944884,-1.7704156972977487,-1.6708186244662255,-1.5792584075364462,-1.4946971197135945,-1.4162661931388358,-1.3432331107684705,-1.2749756562202441,-1.2109617932765444,-1.1507337891978568,-1.0938955726123738,-1.0401025820016139,-0.9890535501154765,-0.9404838064389384,-0.8941597798006835,-0.8498744570566339,-0.807443608868551,-0.7667026350778762,-0.7275039136822696,-0.6897145615503772,-0.6532145336319757,-0.617895001894788,-0.5836569665499153,-0.5504100610519679,-0.5180715194346396,-0.4865652801813754,-0.45582120535072684,-0.4257743973175704,-0.39636459843872524,-0.36753566134893534,-0.33923507954975124,-0.31141356955857574,-0.2840246972034242,-0.2570245417380079,-0.23037139235009935,-0.2040254723817208,-0.17794868719629117,-0.15210439213932672,-0.12645717746189808,-0.10097266742349273,-0.07561733107586252,-0.05035830245824806,-0.02516320811682309,-1.4695761589768238e-15],"x":[12.566370614359172,12.591528513487019,12.616686412614866,12.641844311742709,12.667002210870557,12.692160109998403,12.71731800912625,12.742475908254097,12.767633807381943,12.792791706509789,12.817949605637633,12.84310750476548,12.868265403893327,12.893423303021175,12.918581202149019,12.943739101276865,12.968897000404711,12.994054899532559,13.019212798660403,13.044370697788251,13.069528596916095,13.094686496043941,13.11984439517179,13.145002294299635,13.170160193427483,13.195318092555327,13.220475991683173,13.24563389081102,13.270791789938867,13.295949689066711,13.32110758819456,13.346265487322404,13.37142338645025,13.396581285578096,13.421739184705944,13.44689708383379,13.472054982961636,13.497212882089482,13.522370781217328,13.547528680345174,13.57268657947302,13.597844478600868,13.623002377728714,13.648160276856558,13.673318175984404,13.698476075112252,13.723633974240098,13.748791873367944,13.773949772495788,13.799107671623636,13.82426557075148,13.849423469879328,13.874581369007176,13.899739268135022,13.924897167262866,13.950055066390712,13.97521296551856,14.000370864646406,14.025528763774252,14.050686662902097,14.075844562029944,14.101002461157789,14.126160360285636,14.151318259413483,14.17647615854133,14.201634057669173,14.22679195679702,14.251949855924867,14.277107755052715,14.30226565418056,14.327423553308405,14.352581452436253,14.377739351564097,14.402897250691945,14.42805514981979,14.453213048947639,14.478370948075481,14.503528847203329,14.528686746331175,14.553844645459023,14.579002544586867,14.604160443714713,14.62931834284256,14.654476241970405,14.679634141098253,14.7047920402261,14.729949939353947,14.75510783848179,14.780265737609637,14.805423636737483,14.830581535865331,14.855739434993176,14.880897334121022,14.906055233248868,14.931213132376714,14.95637103150456,14.981528930632408,15.006686829760254,15.0318447288881,15.057002628015946,15.082160527143792,15.10731842627164,15.132476325399484,15.15763422452733,15.182792123655176,15.207950022783022,15.233107921910868,15.258265821038716,15.283423720166562,15.308581619294408,15.333739518422252,15.3588974175501,15.384055316677946,15.409213215805792,15.434371114933636,15.459529014061486,15.48468691318933,15.509844812317176,15.535002711445024,15.56016061057287,15.585318509700716,15.61047640882856,15.635634307956408,15.660792207084254,15.6859501062121,15.711108005339945,15.736265904467794,15.761423803595637,15.786581702723485,15.81173960185133,15.836897500979179,15.862055400107025,15.887213299234869,15.912371198362717,15.937529097490563,15.962686996618409,15.987844895746253,16.0130027948741,16.038160694001945,16.063318593129793,16.08847649225764,16.113634391385485,16.138792290513333,16.163950189641177,16.189108088769025,16.214265987896873,16.239423887024717,16.26458178615256,16.28973968528041,16.314897584408254,16.3400554835361,16.36521338266395,16.390371281791793,16.41552918091964,16.440687080047486,16.46584497917533,16.491002878303178,16.516160777431026,16.54131867655887,16.566476575686718,16.59163447481456,16.61679237394241,16.641950273070258,16.667108172198102,16.69226607132595,16.717423970453794,16.742581869581638,16.767739768709486,16.792897667837334,16.818055566965178,16.843213466093026,16.86837136522087,16.893529264348718,16.918687163476566,16.94384506260441,16.969002961732254,16.994160860860102,17.019318759987947,17.044476659115794,17.069634558243642,17.094792457371486,17.119950356499334,17.14510825562718,17.170266154755026,17.195424053882874,17.22058195301072,17.245739852138563,17.27089775126641,17.296055650394255,17.321213549522103,17.346371448649947,17.371529347777795,17.396687246905643,17.421845146033487,17.447003045161335,17.472160944289183,17.497318843417027,17.52247674254487,17.54763464167272,17.572792540800563,17.59795043992841,17.623108339056255,17.648266238184103,17.67342413731195,17.698582036439795,17.72373993556764,17.74889783469549,17.774055733823335,17.79921363295118,17.824371532079027,17.849529431206875,17.87468733033472,17.899845229462564,17.92500312859041,17.95016102771826,17.975318926846104,18.000476825973948,18.0256347251018,18.050792624229643,18.075950523357488,18.101108422485332,18.12626632161318,18.151424220741028,18.176582119868872,18.20174001899672,18.226897918124568,18.25205581725241,18.277213716380256,18.302371615508108,18.327529514635952,18.352687413763796,18.37784531289164,18.403003212019488,18.428161111147336,18.45331901027518,18.478476909403025,18.503634808530876,18.528792707658717,18.553950606786564,18.579108505914416,18.60426640504226,18.629424304170104,18.654582203297952,18.679740102425797,18.704898001553644,18.73005590068149,18.755213799809333,18.780371698937184,18.805529598065025,18.830687497192873,18.85584539632072,18.88100329544857,18.906161194576413,18.93131909370426,18.9564769928321,18.981634891959953,19.006792791087797,19.03195069021564,19.057108589343493,19.082266488471333,19.10742438759918,19.13258228672703,19.157740185854877,19.18289808498272,19.20805598411057,19.23321388323841,19.25837178236626,19.283529681494105,19.30868758062195,19.3338454797498,19.35900337887764,19.38416127800549,19.409319177133337,19.434477076261185,19.45963497538903,19.484792874516877,19.509950773644718,19.53510867277257,19.560266571900414,19.585424471028258,19.610582370156106,19.635740269283954,19.660898168411798,19.686056067539646,19.71121396666749,19.736371865795338,19.761529764923186,19.786687664051026,19.811845563178878,19.837003462306722,19.862161361434566,19.887319260562414,19.912477159690262,19.937635058818106,19.962792957945954,19.987950857073795,20.013108756201646,20.038266655329494,20.063424554457335,20.088582453585182,20.11374035271303,20.138898251840875,20.164056150968722,20.18921405009657,20.214371949224414,20.239529848352262,20.264687747480103,20.289845646607954,20.315003545735802,20.340161444863643,20.36531934399149,20.39047724311934,20.415635142247183,20.44079304137503,20.465950940502875,20.491108839630723,20.51626673875857,20.54142463788641,20.566582537014263,20.59174043614211,20.61689833526995,20.6420562343978,20.667214133525647,20.69237203265349,20.71752993178134,20.742687830909183,20.76784573003703,20.79300362916488,20.81816152829272,20.843319427420568,20.86847732654842,20.893635225676263,20.918793124804107,20.943951023931955,20.9691089230598,20.994266822187647,21.01942472131549,21.04458262044334,21.069740519571187,21.094898418699028,21.120056317826876,21.145214216954727,21.17037211608257,21.195530015210416,21.22068791433826,21.245845813466108,21.271003712593956,21.2961616117218,21.321319510849648,21.346477409977492,21.37163530910534,21.396793208233184,21.421951107361036,21.44710900648888,21.472266905616724,21.49742480474457,21.522582703872416,21.547740603000264,21.57289850212811,21.598056401255953,21.6232143003838,21.64837219951165,21.673530098639493,21.698687997767344,21.723845896895188,21.749003796023032,21.774161695150877,21.799319594278725,21.824477493406572,21.849635392534417,21.87479329166226,21.89995119079011,21.925109089917957,21.9502669890458,21.97542488817365,22.000582787301497,22.02574068642934,22.050898585557185,22.07605648468503,22.10121438381288,22.126372282940725,22.15153018206857,22.176688081196417,22.201845980324265,22.22700387945211,22.252161778579957,22.277319677707805,22.30247757683565,22.327635475963493,22.352793375091338,22.37795127421919,22.403109173347033,22.428267072474878,22.453424971602722,22.478582870730573,22.503740769858418,22.528898668986265,22.554056568114113,22.579214467241957,22.6043723663698,22.629530265497646,22.654688164625497,22.67984606375334,22.705003962881186,22.73016186200903,22.75531976113688,22.780477660264726,22.805635559392574,22.830793458520418,22.855951357648266,22.88110925677611,22.906267155903954,22.931425055031806,22.95658295415965,22.981740853287494,23.00689875241534,23.03205665154319,23.057214550671034,23.082372449798882,23.107530348926726,23.132688248054574,23.15784614718242,23.183004046310263,23.20816194543811,23.23331984456596,23.258477743693803,23.283635642821647,23.3087935419495,23.333951441077343,23.35910934020519,23.384267239333035,23.409425138460882,23.434583037588727,23.45974093671657,23.48489883584442,23.510056734972267,23.53521463410011,23.56037253322796,23.585530432355803,23.61068833148365,23.635846230611495,23.66100412973934,23.68616202886719,23.711319927995035,23.73647782712288,23.761635726250727,23.786793625378575,23.81195152450642,23.837109423634267,23.86226732276211,23.88742522188996,23.912583121017803,23.937741020145648,23.962898919273496,23.988056818401343,24.013214717529188,24.038372616657036,24.063530515784883,24.088688414912728,24.113846314040575,24.13900421316842,24.164162112296268,24.189320011424112,24.214477910551956,24.239635809679804,24.26479370880765,24.289951607935496,24.315109507063344,24.340267406191188,24.365425305319036,24.390583204446884,24.415741103574728,24.440899002702576,24.466056901830424,24.491214800958264,24.516372700086112,24.54153059921396,24.566688498341804,24.591846397469652,24.617004296597496,24.642162195725344,24.667320094853192,24.692477993981036,24.71763589310888,24.742793792236732,24.767951691364573,24.79310959049242,24.81826748962027,24.843425388748113,24.86858328787596,24.893741187003805,24.918899086131653,24.9440569852595,24.969214884387345,24.99437278351519,25.01953068264304,25.04468858177088,25.06984648089873,25.095004380026573,25.12016227915442,25.14532017828227,25.170478077410113,25.195635976537957,25.22079387566581,25.245951774793653,25.271109673921497,25.29626757304935,25.32142547217719,25.346583371305037,25.37174127043288,25.39689916956073,25.422057068688577,25.44721496781642,25.472372866944266,25.497530766072117,25.52268866519996,25.547846564327806,25.573004463455657,25.598162362583498,25.623320261711346,25.64847816083919,25.673636059967038,25.698793959094886,25.72395185822273,25.749109757350574,25.774267656478425,25.79942555560627,25.824583454734114,25.849741353861962,25.874899252989806,25.900057152117654,25.925215051245498,25.950372950373342,25.975530849501194,26.000688748629038,26.025846647756882,26.051004546884734,26.076162446012578,26.101320345140422,26.12647824426827,26.151636143396114,26.176794042523962,26.201951941651807,26.22710984077965,26.252267739907502,26.277425639035346,26.30258353816319,26.32774143729104,26.352899336418886,26.37805723554673,26.40321513467458,26.428373033802423,26.45353093293027,26.478688832058115,26.50384673118596,26.52900463031381,26.554162529441655,26.5793204285695,26.604478327697347,26.629636226825195,26.65479412595304,26.679952025080887,26.70510992420873,26.73026782333658,26.755425722464423,26.780583621592267,26.80574152072012,26.830899419847963,26.856057318975807,26.881215218103655,26.906373117231503,26.931531016359347,26.956688915487195,26.98184681461504,27.007004713742887,27.03216261287073,27.057320511998576,27.082478411126424,27.10763631025427,27.132794209382116,27.157952108509964,27.18311000763781,27.208267906765656,27.233425805893503,27.258583705021348,27.283741604149196,27.30889950327704,27.334057402404884,27.359215301532732,27.38437320066058,27.409531099788424,27.434688998916272,27.459846898044116,27.485004797171964,27.510162696299812,27.535320595427656,27.560478494555504,27.585636393683348,27.610794292811192,27.63595219193904,27.661110091066888,27.686267990194732,27.71142588932258,27.736583788450424,27.761741687578272,27.78689958670612,27.812057485833964,27.83721538496181,27.862373284089657,27.8875311832175,27.91268908234535,27.937846981473196,27.96300488060104,27.98816277972889,28.013320678856733,28.03847857798458,28.06363647711243,28.088794376240273,28.113952275368117,28.139110174495965,28.16426807362381,28.189425972751657,28.2145838718795,28.23974177100735,28.264899670135197,28.29005756926304,28.315215468390885,28.340373367518737,28.36553126664658,28.390689165774425,28.415847064902273,28.441004964030117,28.466162863157965,28.49132076228581,28.516478661413657,28.541636560541505,28.56679445966935,28.591952358797194,28.617110257925045,28.64226815705289,28.667426056180734,28.692583955308578,28.717741854436426,28.742899753564274,28.768057652692118,28.793215551819966,28.818373450947814,28.843531350075658,28.868689249203502,28.893847148331353,28.919005047459198,28.944162946587042,28.969320845714886,28.994478744842734,29.019636643970582,29.044794543098426,29.06995244222627,29.095110341354122,29.120268240481966,29.14542613960981,29.170584038737662,29.195741937865506,29.22089983699335,29.246057736121195,29.271215635249042,29.29637353437689,29.321531433504735,29.34668933263258,29.37184723176043,29.397005130888274,29.42216303001612,29.447320929143967,29.472478828271814,29.49763672739966,29.522794626527503,29.54795252565535,29.5731104247832,29.598268323911043,29.623426223038887,29.64858412216674,29.673742021294583,29.698899920422427,29.724057819550275,29.749215718678123,29.77437361780597,29.79953151693381,29.824689416061656,29.849847315189507,29.87500521431735,29.900163113445196,29.925321012573047,29.95047891170089,29.975636810828735,30.000794709956583,30.02595260908443,30.051110508212275,30.07626840734012,30.101426306467964,30.126584205595815,30.15174210472366,30.176900003851504,30.20205790297935,30.2272158021072,30.252373701235044,30.27753160036289,30.30268949949074,30.327847398618584,30.353005297746428,30.378163196874272,30.403321096002124,30.428478995129968,30.453636894257812,30.47879479338566,30.503952692513508,30.529110591641352,30.5542684907692,30.579426389897044,30.604584289024892,30.629742188152736,30.65490008728058,30.680057986408432,30.705215885536276,30.73037378466412,30.75553168379197,30.780689582919816,30.80584748204766,30.83100538117551,30.856163280303353,30.8813211794312,30.906479078559048,30.93163697768689,30.956794876814737,30.981952775942585,31.00711067507043,31.032268574198277,31.057426473326124,31.08258437245397,31.107742271581817,31.13290017070966,31.15805806983751,31.183215968965357,31.208373868093197,31.233531767221045,31.258689666348893,31.283847565476737,31.309005464604585,31.33416336373243,31.359321262860277,31.384479161988125,31.40963706111597,31.434794960243813,31.459952859371665,31.485110758499506,31.510268657627353,31.5354265567552,31.560584455883046,31.585742355010893,31.610900254138738,31.636058153266585,31.661216052394433,31.686373951522278,31.711531850650122,31.736689749777973,31.761847648905814,31.78700554803366,31.812163447161506,31.837321346289354,31.8624792454172,31.887637144545046,31.912795043672894,31.93795294280074,31.963110841928586,31.98826874105643,32.01342664018428,32.03858453931212,32.063742438439974,32.088900337567814,32.11405823669566,32.13921613582351,32.16437403495136,32.1895319340792,32.214689833207046,32.239847732334894,32.26500563146274,32.29016353059059,32.31532142971843,32.34047932884628,32.365637227974126,32.39079512710197,32.415953026229815,32.44111092535766,32.46626882448551,32.49142672361336,32.5165846227412,32.54174252186905,32.566900420996895,32.592058320124735,32.61721621925259,32.64237411838043,32.66753201750828,32.69268991663613,32.717847815763974,32.743005714891815,32.76816361401966,32.79332151314751,32.81847941227536,32.84363731140321,32.86879521053105,32.893953109658895,32.91911100878674,32.944268907914584,32.96942680704243,32.994584706170286,33.01974260529813,33.044900504425975,33.07005840355382,33.09521630268166,33.12037420180951,33.14553210093736,33.1706900000652,33.195847899193055,33.221005798320896,33.24616369744874,33.271321596576584,33.29647949570443,33.32163739483228,33.34679529396013,33.37195319308797,33.39711109221582,33.42226899134367,33.44742689047151,33.47258478959936,33.4977426887272,33.52290058785505,33.54805848698289,33.573216386110744,33.59837428523859,33.62353218436644,33.64869008349428,33.67384798262213,33.699005881749976,33.72416378087782,33.74932168000566,33.77447957913351,33.79963747826136,33.82479537738921,33.84995327651705,33.875111175644896,33.900269074772744,33.925426973900585,33.95058487302844,33.97574277215629,34.00090067128413,34.02605857041197,34.05121646953982,34.076374368667665,34.10153226779551,34.12669016692335,34.15184806605121,34.177005965179056,34.2021638643069,34.227321763434745,34.25247966256259,34.27763756169043,34.302795460818274,34.32795335994613,34.35311125907398,34.378269158201824,34.403427057329665,34.42858495645751,34.45374285558536,34.4789007547132,34.50405865384105,34.5292165529689,34.554374452096745,34.579532351224586,34.60469025035244,34.62984814948028,34.65500604860813,34.68016394773597,34.70532184686382,34.73047974599167,34.75563764511951,34.78079554424736,34.8059534433752,34.83111134250305,34.85626924163089,34.881427140758746,34.90658503988659,34.93174293901444,34.95690083814228,34.98205873727012,35.00721663639798,35.03237453552582,35.057532434653666,35.082690333781514,35.10784823290936,35.1330061320372,35.15816403116506,35.1833219302929,35.208479829420746,35.23363772854859,35.25879562767643,35.28395352680429,35.30911142593213,35.33426932505998,35.35942722418782,35.38458512331567,35.40974302244351,35.43490092157136,35.46005882069921,35.48521671982706,35.5103746189549,35.53553251808274,35.560690417210594,35.585848316338435,35.61100621546628,35.63616411459412,35.66132201372198,35.68647991284982,35.711637811977674,35.736795711105515,35.76195361023336,35.7871115093612,35.812269408489044,35.837427307616906,35.86258520674475,35.887743105872595,35.912901005000435,35.93805890412828,35.963216803256124,35.98837470238398,36.01353260151182,36.038690500639674,36.063848399767515,36.089006298895356,36.11416419802321,36.13932209715105,36.1644799962789,36.18963789540674,36.214795794534595,36.239953693662436,36.26511159279029,36.29026949191813,36.31542739104598,36.34058529017382,36.36574318930167,36.390901088429516,36.41605898755736,36.44121688668521,36.46637478581305,36.4915326849409,36.51669058406874,36.541848483196596,36.567006382324436,36.59216428145229,36.61732218058013,36.64248007970798,36.66763797883583,36.69279587796367,36.717953777091516,36.74311167621936,36.768269575347205,36.79342747447505,36.81858537360291,36.84374327273075,36.868901171858596,36.89405907098644,36.919216970114284,36.94437486924213,36.96953276836998,36.99469066749783,37.01984856662567,37.04500646575352,37.07016436488136,37.09532226400921,37.12048016313705,37.1456380622649,37.17079596139275,37.195953860520596,37.221111759648444,37.246269658776285,37.27142755790413,37.29658545703197,37.32174335615982,37.34690125528766,37.372059154415524,37.397217053543365,37.42237495267121,37.44753285179905,37.4726907509269,37.49784865005475,37.52300654918259,37.548164448310445,37.573322347438285,37.59848024656613,37.623638145693974,37.64879604482183,37.67395394394967,37.69911184307752]}
},{}],69:[function(require,module,exports){
module.exports={"expected":[4.898587196589413e-16,0.009434492078243496,0.01887066382749674,0.028310196115143457,0.03775477220312234,0.047206078949754975,0.056665808016999275,0.06613565708501457,0.07561733107585618,0.08511254338824072,0.09462301714521341,0.10415048645673228,0.11369669769912552,0.12326341081343525,0.13285240062477385,0.14246545818476203,0.15210439213932936,0.16177103012406183,0.1714672201894847,0.1811948322586977,0.19095575961987057,0.20075192045618961,0.21058525941600187,0.22045774922595437,0.23037139235009643,0.2403282226980077,0.25033030738516904,0.2603797485489991,0.27047868522400775,0.2806292952798679,0.2908337974262334,0.3010944532884723,0.3114135695585786,0.3217935002258552,0.33223664889218174,0.34274547117689486,0.35332247721669435,0.36397023426620445,0.3746913694052452,0.38548857235912726,0.39636459843871996,0.4073222716074835,0.4183644876830155,0.4294942176811908,0.4407145113115121,0.45202850063274896,0.46343940387860355,0.47495052946376964,0.4865652801813742,0.49828715760367587,0.5101197666984615,0.5220668206746508,0.5341321460714583,0.5463196881064112,0.5586335162987123,0.5710778303855029,0.583656966549914,0.596375403981106,0.6092377717880191,0.6222488562901413,0.6354136087103743,0.6487371532968826,0.6622247959029669,0.6758820330561859,0.689714561550381,0.703728288596877,0.7179293425740861,0.7323240844178218,0.746919119698044,0.7617213114316114,0.7767377936845321,0.7919759860219244,0.8074436088685495,0.8231486998483435,0.8390996311772795,0.8553051281902166,0.8717742890897103,0.8885166060125271,0.905541987518236,0.9228607826138472,0.9404838064389399,0.9584223677473821,0.9766882983347223,0.9952939845743681,1.0142524012417702,1.033577147823215,1.0532824875254236,1.073383389223923,1.0938955726123796,1.1148355568421984,1.1362207129717963,1.1580693205789974,1.1804006289277627,1.2032349231232338,1.2265935957367473,1.2504992244364797,1.2749756562202321,1.3000480989153342,1.325743220688435,1.3520892583960356,1.3791161357063675,1.4068555920370407,1.4353413234824064,1.4646091370523273,1.4946971197135912,1.5256458239185955,1.5574984715292437,1.5903011783002927,1.6241032013822159,1.658957212646215,1.694919601030575,1.7320508075688743,1.7704156972977447,1.8100839728697233,1.851130635431796,1.8936364991945442,1.937688767133776,1.9833816764700491,2.030817223997143,2.080105983026762,2.131368025741159,2.1847339671705357,2.240346149927202,2.298359992346984,2.358945526952384,2.422289161339606,2.4885956999337187,2.5580906728412818,2.631023027636642,2.7076682518298756,2.788332008612381,2.8733543870902554,2.963114891684182,3.0580383251484595,3.1586017576812386,3.2653428234794775,3.3788696493980708,3.4998728029927673,3.6291397559349377,3.7675725030756713,3.916209170726596,4.076250709236542,4.249094122520205,4.436374181716,4.64001626248048,4.862303927567508,5.105966289668622,5.3742922551202135,5.671281819617731,6.001849236738518,6.372100065919554,6.789715464806611,7.264495499117983,7.809143923549879,8.440429657506547,9.180954248158777,10.061929312379554,11.12770815252334,12.443516159796468,14.109365540316311,16.286814403660003,19.25491758435697,23.540778558684202,30.273904647358695,42.39101470463318,70.66007756373939,211.9928118273422,-211.99281182746333,-70.66007756373511,-42.39101470462845,-30.27390464735791,-23.540778558684714,-19.25491758435731,-16.286814403659776,-14.109365540316139,-12.443516159796058,-11.127708152523011,-10.06192931237983,-9.180954248158704,-8.440429657506357,-7.8091439235497155,-7.264495499118032,-6.789715464806654,-6.372100065919518,-6.001849236738486,-5.671281819617702,-5.374292255120134,-5.105966289668599,-4.862303927567531,-4.640016262480461,-4.4363741817159825,-4.249094122520154,-4.076250709236558,-3.9162091707265816,-3.7675725030756584,-3.6291397559349257,-3.4998728029927557,-3.37886964939806,-3.265342823479447,-3.158601757681249,-3.0580383251484506,-2.9631148916841563,-2.8733543870902474,-2.7883320086123735,-2.7076682518298685,-2.6310230276366355,-2.558090672841275,-2.4885956999337253,-2.4222891613395876,-2.3589455269523665,-2.29835999234699,-2.240346149927197,-2.184733967170541,-2.1313680257411445,-2.080105983026757,-2.0308172239971385,-1.983381676470045,-1.9376887671337801,-1.8936364991945405,-1.8511306354317845,-1.810083972869712,-1.7704156972977558,-1.732050807568878,-1.6949196010305647,-1.658957212646205,-1.6241032013822125,-1.5903011783002898,-1.5574984715292468,-1.5256458239185926,-1.4946971197135885,-1.464609137052319,-1.4353413234823984,-1.4068555920370487,-1.3791161357063648,-1.352089258396033,-1.3257432206884276,-1.300048098915332,-1.2749756562202346,-1.2504992244364774,-1.226593595736745,-1.2032349231232318,-1.1804006289277564,-1.1580693205789954,-1.1362207129717983,-1.1148355568421966,-1.0938955726123738,-1.0733833892239175,-1.0532824875254256,-1.0335771478232132,-1.0142524012417684,-0.9952939845743665,-0.9766882983347206,-0.9584223677473804,-0.9404838064389349,-0.9228607826138489,-0.9055419875182344,-0.8885166060125256,-0.8717742890897089,-0.8553051281902151,-0.839099631177278,-0.823148699848342,-0.8074436088685479,-0.7919759860219259,-0.7767377936845279,-0.7617213114316072,-0.7469191196980455,-0.7323240844178205,-0.7179293425740849,-0.7037282885968731,-0.6897145615503798,-0.6758820330561846,-0.6622247959029657,-0.648737153296884,-0.6354136087103731,-0.6222488562901376,-0.6092377717880155,-0.5963754039811073,-0.5836569665499152,-0.5710778303855018,-0.5586335162987087,-0.5463196881064101,-0.5341321460714572,-0.522066820674652,-0.5101197666984604,-0.49828715760367476,-0.4865652801813709,-0.4749505294637664,-0.4634394038786068,-0.45202850063274796,-0.44071451131150896,-0.4294942176811877,-0.4183644876830145,-0.4073222716074846,-0.396364598438719,-0.3854885723591263,-0.3746913694052422,-0.3639702342662015,-0.3533224772166934,-0.34274547117689586,-0.3322366488921808,-0.32179350022585423,-0.3114135695585757,-0.3010944532884733,-0.2908337974262325,-0.28062929527986696,-0.27047868522400875,-0.26037974854899626,-0.25033030738516815,-0.2403282226980049,-0.2303713923500974,-0.2204577492259535,-0.21058525941599912,-0.20075192045618873,-0.19095575961986969,-0.18119483225869681,-0.17146722018948382,-0.16177103012406277,-0.15210439213932847,-0.14246545818475934,-0.13285240062477116,-0.12326341081343618,-0.11369669769912465,-0.10415048645673321,-0.09462301714521076,-0.08511254338823986,-0.07561733107585532,-0.0661356570850137,-0.05666580801700198,-0.04720607894975234,-0.037754772203119694,-0.02831019611514082,-0.01887066382749766,-0.009434492078244415,2.1437508791444563e-15,0.00943449207824515,0.01887066382749662,0.028310196115141555,0.037754772203120436,0.04720607894975486,0.05666580801700272,0.06613565708501444,0.07561733107585605,0.0851125433882388,0.09462301714521329,0.10415048645673215,0.1136966976991254,0.12326341081343513,0.1328524006247719,0.14246545818476192,0.15210439213933105,0.1617710301240617,0.1714672201894846,0.18119483225869756,0.1909557596198723,0.2007519204561895,0.21058525941600176,0.22045774922595426,0.23037139235009632,0.2403282226980057,0.2503303073851689,0.2603797485489989,0.27047868522400764,0.28062929527986774,0.2908337974262352,0.3010944532884741,0.31141356955857646,0.32179350022585307,0.33223664889218163,0.3427454711768967,0.35332247721669424,0.36397023426620234,0.3746913694052451,0.3854885723591251,0.3963645984387219,0.40732227160748546,0.4183644876830154,0.42949421768118856,0.44071451131151196,0.45202850063275096,0.46343940387860555,0.47495052946376515,0.48656528018137185,0.4982871576036757,0.5101197666984613,0.5220668206746529,0.5341321460714581,0.5463196881064111,0.5586335162987097,0.5710778303855026,0.5836569665499162,0.5963754039811059,0.6092377717880165,0.6222488562901386,0.6354136087103767,0.6487371532968825,0.6622247959029667,0.6758820330561857,0.6897145615503809,0.7037282885968769,0.7179293425740887,0.7323240844178216,0.7469191196980438,0.7617213114316084,0.7767377936845319,0.7919759860219271,0.8074436088685463,0.8231486998483433,0.8390996311772793,0.8553051281902194,0.8717742890897102,0.8885166060125238,0.9055419875182358,0.922860782613847,0.9404838064389397,0.9584223677473819,0.976688298334722,0.9952939845743644,1.01425240124177,1.0335771478232183,1.0532824875254272,1.073383389223919,1.0938955726123794,1.1148355568421981,1.1362207129718,1.1580693205789971,1.1804006289277582,1.2032349231232335,1.2265935957367424,1.250499224436484,1.2749756562202366,1.300048098915334,1.3257432206884296,1.35208925839603,1.3791161357063721,1.4068555920370456,1.4353413234824006,1.4646091370523213,1.4946971197135908,1.525645823918595,1.5574984715292493,1.5903011783002923,1.6241032013822154,1.658957212646208,1.6949196010305814,1.732050807568881,1.7704156972977516,1.8100839728697151,1.8511306354317876,1.893636499194552,1.9376887671337752,1.9833816764700487,2.0308172239971425,2.080105983026761,2.1313680257411582,2.1847339671705353,2.2403461499272015,2.2983599923469833,2.3589455269523714,2.422289161339605,2.4885956999337306,2.558090672841267,2.6310230276366413,2.7076682518298747,2.78833200861238,2.873354387090254,2.9631148916841634,3.058038325148458,3.158601757681257,3.2653428234794757,3.3788696493980694,3.4998728029927655,3.629139755934911,3.7675725030756695,3.916209170726623,4.07625070923654,4.249094122520169,4.436374181715998,4.6400162624804775,4.862303927567549,5.105966289668618,5.374292255120157,5.671281819617726,6.0018492367384475,6.372100065919623,6.789715464806688,7.264495499118024,7.809143923549762,8.440429657506538,9.180954248158843,10.061929312379814,11.127708152523102,12.443516159796173,14.109365540316464,16.286814403659736,19.254917584357585,23.540778558685123,30.273904647357767,42.39101470463137,70.66007756373878,211.99281182741652,-211.9928118273491,-70.66007756373573,-42.391014704630265,-30.273904647357206,-23.540778558685275,-19.254917584356697,-16.286814403659807,-14.109365540316164,-12.443516159796216,-11.127708152523025,-10.061929312379661,-9.180954248158791,-8.44042965750643,-7.809143923549779,-7.264495499117944,-6.78971546480666,-6.372100065919524,-6.001849236738457,-5.671281819617706,-5.374292255120165,-5.105966289668578,-4.862303927567534,-4.640016262480463,-4.436374181715967,-4.249094122520174,-4.076250709236529,-3.9162091707266127,-3.767572503075647,-3.629139755934915,-3.4998728029927575,-3.378869649398062,-3.2653428234794584,-3.1586017576812404,-3.058038325148452,-2.963114891684166,-2.8733543870902487,-2.7883320086123744,-2.707668251829877,-2.6310230276366293,-2.5580906728412693,-2.48859569993372,-2.4222891613396005,-2.3589455269523674,-2.298359992346985,-2.240346149927203,-2.1847339671705317,-2.1313680257411547,-2.080105983026753,-2.030817223997144,-1.9833816764700412,-1.9376887671337724,-1.893636499194545,-1.851130635431789,-1.8100839728697127,-1.7704156972977527,-1.7320508075688785,-1.694919601030572,-1.6589572126462089,-1.6241032013822099,-1.5903011783002934,-1.5574984715292413,-1.525645823918593,-1.4946971197135888,-1.4646091370523222,-1.4353413234823988,-1.4068555920370438,-1.3791161357063704,-1.352089258396031,-1.3257432206884305,-1.30004809891533,-1.274975656220235,-1.2504992244364779,-1.2265935957367433,-1.203234923123232,-1.1804006289277589,-1.1580693205789936,-1.1362207129717985,-1.1148355568421988,-1.093895572612376,-1.0733833892239197,-1.053282487525422,-1.033577147823217,-1.0142524012417669,-0.9952939845743649,-0.9766882983347208,-0.9584223677473807,-0.9404838064389368,-0.9228607826138475,-0.9055419875182362,-0.8885166060125242,-0.8717742890897091,-0.8553051281902153,-0.8390996311772797,-0.8231486998483408,-0.8074436088685453,-0.7919759860219246,-0.776737793684531,-0.7617213114316074,-0.7469191196980443,-0.732324084417822,-0.717929342574085,-0.7037282885968759,-0.6897145615503787,-0.6758820330561861,-0.6622247959029646,-0.6487371532968804,-0.6354136087103746,-0.622248856290139,-0.6092377717880156,-0.5963754039811062,-0.5836569665499154,-0.5710778303855019,-0.55863351629871,-0.5463196881064092,-0.5341321460714585,-0.5220668206746499,-0.5101197666984594,-0.4982871576036749,-0.4865652801813722,-0.47495052946376654,-0.4634394038786048,-0.45202850063275024,-0.4407145113115102,-0.4294942176811889,-0.4183644876830136,-0.40732227160748474,-0.39636459843871913,-0.38548857235912437,-0.3746913694052444,-0.3639702342662026,-0.3533224772166925,-0.342745471176896,-0.3322366488921819,-0.3217935002258534,-0.3114135695585768,-0.3010944532884715,-0.29083379742623455,-0.28062929527986613,-0.270478685224007,-0.26037974854899826,-0.25033030738516826,-0.24032822269800597,-0.2303713923500966,-0.22045774922595454,-0.21058525941600018,-0.20075192045618886,-0.19095575961986982,-0.18119483225869693,-0.17146722018948304,-0.16177103012406108,-0.1521043921393295,-0.14246545818476128,-0.1328524006247713,-0.1232634108134354,-0.11369669769912567,-0.10415048645673154,-0.09462301714521268,-0.08511254338823908,-0.07561733107585543,-0.06613565708501294,-0.05666580801699943,-0.04720607894975513,-0.03775477220312071,-0.02831019611514094,-0.018870663827496893,-0.009434492078244539,2.4492935982947064e-16,0.00943449207824414,0.018870663827497382,0.028310196115141434,0.03775477220312209,0.04720607894975562,0.056665808017000815,0.06613565708501343,0.07561733107585682,0.08511254338824047,0.09462301714521228,0.10415048645673293,0.11369669769912527,0.1232634108134359,0.13285240062477177,0.14246545818476178,0.15210439213933,0.16177103012406158,0.17146722018948354,0.18119483225869928,0.19095575961987032,0.20075192045618936,0.2105852594160007,0.22045774922595412,0.23037139235009807,0.24032822269800555,0.25033030738516976,0.26037974854899787,0.2704786852240075,0.28062929527986763,0.29083379742623505,0.301094453288473,0.31141356955857635,0.32179350022585396,0.33223664889218246,0.3427454711768966,0.3533224772166931,0.3639702342662032,0.37469136940524395,0.385488572359126,0.3963645984387197,0.40732227160748635,0.41836448768301415,0.4294942176811884,0.44071451131151185,0.45202850063274974,0.4634394038786065,0.4749505294637661,0.4865652801813728,0.49828715760367553,0.51011976669846,0.5220668206746516,0.5341321460714591,0.5463196881064097,0.5586335162987107,0.5710778303855025,0.5836569665499161,0.5963754039811069,0.6092377717880151,0.6222488562901409,0.635413608710374,0.6487371532968824,0.6622247959029652,0.6758820330561868,0.6897145615503807,0.7037282885968753,0.7179293425740871,0.7323240844178214,0.746919119698045,0.7617213114316082,0.7767377936845318,0.791975986021924,0.8074436088685475,0.8231486998483416,0.839099631177282,0.8553051281902162,0.8717742890897083,0.8885166060125251,0.9055419875182356,0.9228607826138501,0.9404838064389361,0.9584223677473833,0.97668829833472,0.9952939845743659,1.0142524012417697,1.033577147823218,1.0532824875254232,1.0733833892239188,1.0938955726123771,1.1148355568422,1.1362207129717996,1.1580693205789927,1.18040062892776,1.203234923123231,1.2265935957367466,1.2504992244364792,1.2749756562202386,1.3000480989153314,1.3257432206884294,1.3520892583960347,1.3791161357063693,1.4068555920370451,1.4353413234823975,1.4646091370523238,1.4946971197135905,1.5256458239185946,1.5574984715292428,1.590301178300295,1.6241032013822116,1.6589572126462109,1.694919601030574,1.732050807568877,1.7704156972977547,1.810083972869711,1.851130635431795,1.8936364991945431,1.9376887671337746,1.9833816764700436,2.030817223997146,2.0801059830267605,2.1313680257411525,2.1847339671705344,2.2403461499272006,2.298359992346988,2.3589455269523705,2.422289161339604,2.488595699933717,2.558090672841273,2.6310230276366333,2.7076682518298885,2.788332008612379,2.8733543870902447,2.963114891684171,3.058038325148457,3.1586017576812555,3.265342823479454,3.3788696493980677,3.499872802992752,3.6291397559349217,3.7675725030756677,3.9162091707266207,4.076250709236538,4.249094122520166,4.436374181715977,4.640016262480494,4.862303927567546,5.105966289668567,5.37429225512018,5.671281819617693,6.001849236738508,6.372100065919544,6.789715464806683,7.264495499118017,7.809143923549754,8.44042965750653,9.180954248158832,10.06192931237971,11.127708152523088,12.443516159796292,14.109365540316261,16.28681440365994,19.25491758435688,23.540778558685545,30.273904647357654,42.39101470463115,70.66007756373817,211.9928118273312,-211.9928118273546,-70.66007756373634,-42.39101470462889,-30.273904647358133,-23.54077855868485,-19.254917584357074,-16.286814403659605,-14.109365540316189,-12.443516159796236,-11.127708152523041,-10.061929312379673,-9.180954248158802,-8.440429657506439,-7.8091439235497315,-7.264495499118046,-6.789715464806624,-6.3721000659195655,-6.001849236738429,-5.67128181961771,-5.374292255120169,-5.105966289668581,-4.862303927567536,-4.640016262480466,-4.436374181715969,-4.249094122520159,-4.076250709236547,-3.9162091707266002,-3.767572503075662,-3.629139755934904,-3.499872802992759,-3.3788696493980632,-3.2653428234794597,-3.1586017576812417,-3.0580383251484533,-2.9631148916841674,-2.8733543870902416,-2.7883320086123833,-2.7076682518298707,-2.6310230276366373,-2.5580906728412636,-2.488595699933721,-2.4222891613396014,-2.3589455269523683,-2.298359992346986,-2.2403461499271984,-2.184733967170532,-2.1313680257411507,-2.0801059830267583,-2.03081722399714,-1.9833816764700463,-1.9376887671337688,-1.8936364991945456,-1.8511306354317894,-1.8100839728697131,-1.7704156972977532,-1.7320508075688754,-1.6949196010305727,-1.658957212646206,-1.6241032013822136,-1.5903011783002905,-1.5574984715292446,-1.5256458239185904,-1.4946971197135892,-1.4646091370523227,-1.435341323482399,-1.406855592037044,-1.3791161357063682,-1.3520892583960311,-1.3257432206884283,-1.3000480989153302,-1.2749756562202352,-1.250499224436478,-1.2265935957367435,-1.2032349231232324,-1.180400628927759,-1.1580693205789938,-1.136220712971799,-1.1148355568421981,-1.0938955726123762,-1.073383389223917,-1.0532824875254234,-1.0335771478232163,-1.0142524012417689,-0.9952939845743644,-0.9766882983347202,-0.9584223677473818,-0.940483806438937,-0.9228607826138485,-0.9055419875182349,-0.8885166060125237,-0.8717742890897078,-0.8553051281902163,-0.8390996311772799,-0.8231486998483417,-0.8074436088685455,-0.7919759860219255,-0.7767377936845311,-0.7617213114316083,-0.7469191196980445,-0.7323240844178202,-0.7179293425740859,-0.7037282885968748,-0.6897145615503801,-0.6758820330561855,-0.6622247959029648,-0.6487371532968819,-0.6354136087103747,-0.6222488562901398,-0.6092377717880159,-0.5963754039811058,-0.583656966549915,-0.571077830385502,-0.5586335162987097,-0.5463196881064099,-0.5341321460714575,-0.5220668206746512,-0.5101197666984602,-0.49828715760367565,-0.48656528018137235,-0.47495052946376615,-0.4634394038786055,-0.4520285006327493,-0.44071451131151085,-0.42949421768118795,-0.4183644876830137,-0.4073222716074849,-0.3963645984387198,-0.38548857235912554,-0.37469136940524456,-0.3639702342662023,-0.3533224772166927,-0.34274547117689613,-0.3322366488921816,-0.3217935002258535,-0.31141356955857546,-0.3010944532884726,-0.29083379742623416,-0.28062929527986724,-0.27047868522400803,-0.2603797485489979,-0.25033030738516887,-0.24032822269800563,-0.2303713923500972,-0.22045774922595374,-0.21058525941599984,-0.20075192045618853,-0.1909557596198704,-0.18119483225869798,-0.17146722018948363,-0.16177103012406166,-0.15210439213933008,-0.14246545818476095,-0.1328524006247714,-0.12326341081343553,-0.11369669769912445,-0.10415048645673211,-0.0946230171452119,-0.0851125433882401,-0.07561733107585601,-0.06613565708501307,-0.05666580801700089,-0.04720607894975481,-0.03775477220312083,-0.028310196115140622,-0.01887066382749657,-0.009434492078244216,1.2246467991473532e-16],"x":[-12.566370614359172,-12.556936402186231,-12.547502190013288,-12.538067977840344,-12.528633765667402,-12.519199553494461,-12.50976534132152,-12.500331129148575,-12.490896916975634,-12.481462704802691,-12.472028492629748,-12.462594280456807,-12.453160068283864,-12.443725856110923,-12.434291643937978,-12.424857431765037,-12.415423219592096,-12.405989007419153,-12.39655479524621,-12.38712058307327,-12.377686370900326,-12.368252158727383,-12.35881794655444,-12.3493837343815,-12.339949522208558,-12.330515310035613,-12.321081097862672,-12.31164688568973,-12.302212673516788,-12.292778461343845,-12.283344249170904,-12.273910036997961,-12.264475824825016,-12.255041612652075,-12.245607400479134,-12.236173188306193,-12.226738976133248,-12.217304763960305,-12.207870551787364,-12.198436339614421,-12.18900212744148,-12.179567915268539,-12.170133703095594,-12.160699490922651,-12.15126527874971,-12.141831066576769,-12.132396854403828,-12.122962642230881,-12.11352843005794,-12.104094217884999,-12.094660005712056,-12.085225793539115,-12.075791581366172,-12.066357369193229,-12.056923157020286,-12.047488944847345,-12.038054732674404,-12.02862052050146,-12.019186308328516,-12.009752096155575,-12.000317883982634,-11.99088367180969,-11.981449459636748,-11.972015247463807,-11.962581035290864,-11.95314682311792,-11.94371261094498,-11.934278398772037,-11.924844186599096,-11.91540997442615,-11.90597576225321,-11.896541550080268,-11.887107337907324,-11.877673125734383,-11.868238913561441,-11.858804701388499,-11.849370489215556,-11.839936277042613,-11.830502064869671,-11.82106785269673,-11.811633640523786,-11.802199428350844,-11.792765216177902,-11.783331004004959,-11.773896791832017,-11.764462579659076,-11.755028367486133,-11.745594155313189,-11.736159943140247,-11.726725730967306,-11.717291518794365,-11.70785730662142,-11.698423094448477,-11.688988882275536,-11.679554670102593,-11.670120457929652,-11.660686245756711,-11.651252033583766,-11.641817821410823,-11.632383609237882,-11.622949397064941,-11.613515184892,-11.604080972719053,-11.594646760546112,-11.585212548373171,-11.575778336200228,-11.566344124027287,-11.556909911854344,-11.547475699681401,-11.538041487508458,-11.528607275335517,-11.519173063162576,-11.509738850989635,-11.500304638816688,-11.490870426643747,-11.481436214470806,-11.472002002297863,-11.46256779012492,-11.453133577951979,-11.443699365779036,-11.434265153606093,-11.424830941433152,-11.415396729260209,-11.405962517087268,-11.396528304914323,-11.387094092741382,-11.37765988056844,-11.368225668395496,-11.358791456222555,-11.349357244049614,-11.33992303187667,-11.330488819703728,-11.321054607530785,-11.311620395357844,-11.302186183184903,-11.292751971011958,-11.283317758839017,-11.273883546666074,-11.264449334493131,-11.25501512232019,-11.245580910147249,-11.236146697974306,-11.226712485801361,-11.21727827362842,-11.207844061455479,-11.198409849282537,-11.188975637109593,-11.17954142493665,-11.170107212763709,-11.160673000590766,-11.151238788417825,-11.141804576244883,-11.13237036407194,-11.122936151898996,-11.113501939726055,-11.104067727553113,-11.094633515380172,-11.085199303207226,-11.075765091034285,-11.066330878861343,-11.0568966666884,-11.04746245451546,-11.038028242342518,-11.028594030169574,-11.01915981799663,-11.00972560582369,-11.000291393650748,-10.990857181477807,-10.981422969304862,-10.97198875713192,-10.962554544958978,-10.953120332786035,-10.943686120613094,-10.934251908440151,-10.924817696267208,-10.915383484094265,-10.905949271921324,-10.896515059748383,-10.887080847575438,-10.877646635402495,-10.868212423229554,-10.858778211056613,-10.84934399888367,-10.839909786710727,-10.830475574537786,-10.821041362364843,-10.8116071501919,-10.802172938018959,-10.792738725846016,-10.783304513673073,-10.773870301500132,-10.764436089327189,-10.755001877154248,-10.745567664981303,-10.736133452808362,-10.726699240635421,-10.717265028462478,-10.707830816289535,-10.698396604116592,-10.688962391943651,-10.679528179770708,-10.670093967597765,-10.660659755424824,-10.651225543251881,-10.641791331078938,-10.632357118905997,-10.622922906733056,-10.613488694560113,-10.604054482387168,-10.594620270214227,-10.585186058041286,-10.575751845868343,-10.566317633695402,-10.556883421522457,-10.547449209349516,-10.538014997176573,-10.528580785003632,-10.51914657283069,-10.509712360657746,-10.500278148484803,-10.490843936311862,-10.48140972413892,-10.471975511965978,-10.462541299793033,-10.453107087620092,-10.44367287544715,-10.434238663274208,-10.424804451101267,-10.415370238928324,-10.40593602675538,-10.396501814582438,-10.387067602409497,-10.377633390236555,-10.36819917806361,-10.35876496589067,-10.349330753717727,-10.339896541544785,-10.330462329371843,-10.3210281171989,-10.311593905025958,-10.302159692853015,-10.292725480680073,-10.283291268507131,-10.273857056334188,-10.264422844161246,-10.254988631988303,-10.245554419815361,-10.23612020764242,-10.226685995469476,-10.217251783296534,-10.207817571123593,-10.19838335895065,-10.188949146777707,-10.179514934604764,-10.170080722431823,-10.16064651025888,-10.15121229808594,-10.141778085912996,-10.132343873740053,-10.12290966156711,-10.11347544939417,-10.104041237221228,-10.094607025048285,-10.08517281287534,-10.0757386007024,-10.066304388529458,-10.056870176356515,-10.047435964183572,-10.03800175201063,-10.028567539837688,-10.019133327664745,-10.009699115491804,-10.000264903318863,-9.990830691145918,-9.981396478972975,-9.971962266800034,-9.962528054627093,-9.95309384245415,-9.943659630281207,-9.934225418108264,-9.924791205935323,-9.91535699376238,-9.905922781589439,-9.896488569416496,-9.887054357243553,-9.87762014507061,-9.868185932897669,-9.858751720724728,-9.849317508551783,-9.83988329637884,-9.830449084205899,-9.821014872032958,-9.811580659860015,-9.802146447687072,-9.79271223551413,-9.783278023341186,-9.773843811168245,-9.764409598995304,-9.75497538682236,-9.745541174649418,-9.736106962476477,-9.726672750303534,-9.717238538130593,-9.707804325957648,-9.698370113784707,-9.688935901611766,-9.67950168943882,-9.67006747726588,-9.660633265092937,-9.651199052919996,-9.641764840747053,-9.63233062857411,-9.622896416401169,-9.613462204228226,-9.604027992055283,-9.594593779882342,-9.5851595677094,-9.575725355536456,-9.566291143363513,-9.556856931190572,-9.54742271901763,-9.537988506844687,-9.528554294671746,-9.519120082498802,-9.50968587032586,-9.500251658152917,-9.490817445979976,-9.481383233807035,-9.471949021634089,-9.462514809461148,-9.453080597288206,-9.443646385115265,-9.434212172942322,-9.424777960769378,-9.415343748596436,-9.405909536423495,-9.396475324250552,-9.387041112077611,-9.377606899904668,-9.368172687731724,-9.358738475558782,-9.349304263385841,-9.3398700512129,-9.330435839039955,-9.321001626867014,-9.311567414694071,-9.30213320252113,-9.292698990348187,-9.283264778175244,-9.273830566002301,-9.26439635382936,-9.254962141656417,-9.245527929483476,-9.236093717310531,-9.22665950513759,-9.217225292964647,-9.207791080791706,-9.198356868618765,-9.188922656445822,-9.179488444272879,-9.170054232099936,-9.160620019926995,-9.151185807754052,-9.141751595581109,-9.132317383408166,-9.122883171235225,-9.113448959062284,-9.10401474688934,-9.094580534716398,-9.085146322543455,-9.075712110370514,-9.066277898197571,-9.05684368602463,-9.047409473851685,-9.037975261678744,-9.028541049505801,-9.01910683733286,-9.009672625159917,-9.000238412986974,-8.990804200814033,-8.981369988641092,-8.971935776468149,-8.962501564295206,-8.953067352122263,-8.94363313994932,-8.934198927776379,-8.924764715603436,-8.915330503430495,-8.905896291257552,-8.896462079084609,-8.887027866911668,-8.877593654738725,-8.868159442565783,-8.858725230392839,-8.849291018219898,-8.839856806046955,-8.830422593874014,-8.82098838170107,-8.811554169528128,-8.802119957355185,-8.792685745182244,-8.783251533009302,-8.77381732083636,-8.764383108663417,-8.754948896490474,-8.745514684317532,-8.73608047214459,-8.726646259971648,-8.717212047798704,-8.707777835625762,-8.698343623452821,-8.688909411279878,-8.679475199106937,-8.670040986933992,-8.660606774761051,-8.651172562588108,-8.641738350415167,-8.632304138242224,-8.622869926069281,-8.613435713896338,-8.604001501723397,-8.594567289550454,-8.585133077377513,-8.57569886520457,-8.566264653031627,-8.556830440858686,-8.547396228685743,-8.537962016512802,-8.528527804339857,-8.519093592166916,-8.509659379993973,-8.500225167821032,-8.490790955648091,-8.481356743475146,-8.471922531302205,-8.462488319129262,-8.453054106956321,-8.443619894783378,-8.434185682610435,-8.424751470437492,-8.415317258264551,-8.405883046091608,-8.396448833918667,-8.387014621745722,-8.377580409572781,-8.36814619739984,-8.358711985226897,-8.349277773053956,-8.339843560881011,-8.33040934870807,-8.320975136535127,-8.311540924362186,-8.302106712189243,-8.2926725000163,-8.283238287843359,-8.273804075670416,-8.264369863497475,-8.254935651324532,-8.245501439151589,-8.236067226978646,-8.226633014805705,-8.217198802632762,-8.20776459045982,-8.198330378286878,-8.188896166113935,-8.179461953940994,-8.17002774176805,-8.160593529595108,-8.151159317422165,-8.141725105249224,-8.13229089307628,-8.12285668090334,-8.113422468730397,-8.103988256557454,-8.094554044384513,-8.08511983221157,-8.075685620038627,-8.066251407865686,-8.056817195692743,-8.0473829835198,-8.037948771346858,-8.028514559173916,-8.019080347000974,-8.00964613482803,-8.000211922655089,-7.9907777104821465,-7.981343498309204,-7.9719092861362615,-7.962475073963319,-7.9530408617903765,-7.9436066496174345,-7.934172437444493,-7.9247382252715495,-7.915304013098608,-7.9058698009256645,-7.896435588752723,-7.887001376579781,-7.877567164406838,-7.868132952233896,-7.858698740060953,-7.849264527888011,-7.839830315715069,-7.830396103542127,-7.820961891369184,-7.811527679196243,-7.802093467023299,-7.792659254850358,-7.783225042677415,-7.773790830504473,-7.764356618331531,-7.754922406158588,-7.745488193985646,-7.736053981812703,-7.726619769639762,-7.717185557466818,-7.707751345293877,-7.698317133120934,-7.688882920947992,-7.67944870877505,-7.670014496602108,-7.660580284429165,-7.651146072256223,-7.64171186008328,-7.632277647910338,-7.622843435737397,-7.613409223564453,-7.603975011391512,-7.594540799218568,-7.585106587045627,-7.575672374872685,-7.566238162699742,-7.5568039505268,-7.547369738353857,-7.537935526180915,-7.528501314007973,-7.519067101835031,-7.509632889662088,-7.500198677489146,-7.490764465316203,-7.481330253143262,-7.471896040970319,-7.462461828797377,-7.453027616624434,-7.443593404451492,-7.434159192278551,-7.424724980105607,-7.415290767932666,-7.405856555759722,-7.396422343586781,-7.386988131413838,-7.377553919240896,-7.368119707067954,-7.358685494895011,-7.349251282722069,-7.339817070549127,-7.3303828583761845,-7.320948646203242,-7.3115144340302995,-7.302080221857357,-7.2926460096844155,-7.283211797511472,-7.2737775853385305,-7.2643433731655875,-7.2549091609926455,-7.245474948819703,-7.2360407366467605,-7.226606524473819,-7.2171723123008755,-7.207738100127934,-7.198303887954991,-7.188869675782049,-7.1794354636091064,-7.170001251436164,-7.160567039263222,-7.15113282709028,-7.141698614917337,-7.132264402744395,-7.122830190571453,-7.11339597839851,-7.103961766225569,-7.094527554052625,-7.085093341879684,-7.07565912970674,-7.066224917533799,-7.056790705360857,-7.047356493187914,-7.037922281014972,-7.028488068842029,-7.019053856669088,-7.009619644496145,-7.000185432323203,-6.99075122015026,-6.981317007977318,-6.971882795804375,-6.962448583631433,-6.953014371458491,-6.943580159285549,-6.934145947112606,-6.924711734939664,-6.915277522766723,-6.905843310593779,-6.896409098420838,-6.886974886247894,-6.877540674074953,-6.86810646190201,-6.858672249729067,-6.849238037556126,-6.839803825383183,-6.830369613210241,-6.820935401037299,-6.811501188864357,-6.802066976691414,-6.792632764518472,-6.783198552345529,-6.773764340172588,-6.764330127999644,-6.754895915826702,-6.74546170365376,-6.736027491480818,-6.726593279307876,-6.717159067134933,-6.707724854961992,-6.698290642789048,-6.688856430616107,-6.679422218443164,-6.669988006270222,-6.660553794097279,-6.651119581924336,-6.641685369751395,-6.632251157578453,-6.62281694540551,-6.613382733232568,-6.603948521059626,-6.594514308886683,-6.5850800967137415,-6.575645884540798,-6.5662116723678565,-6.556777460194913,-6.547343248021971,-6.5379090358490295,-6.528474823676087,-6.5190406115031445,-6.509606399330202,-6.50017218715726,-6.4907379749843175,-6.481303762811375,-6.4718695506384325,-6.46243533846549,-6.4530011262925475,-6.4435669141196055,-6.434132701946663,-6.424698489773721,-6.415264277600778,-6.405830065427836,-6.396395853254895,-6.386961641081951,-6.37752742890901,-6.368093216736066,-6.358659004563124,-6.349224792390182,-6.339790580217239,-6.330356368044298,-6.320922155871355,-6.311487943698413,-6.302053731525471,-6.292619519352529,-6.283185307179586,-6.273751095006644,-6.264316882833701,-6.254882670660759,-6.245448458487816,-6.236014246314874,-6.226580034141932,-6.21714582196899,-6.207711609796047,-6.198277397623105,-6.188843185450163,-6.17940897327722,-6.169974761104278,-6.160540548931336,-6.151106336758394,-6.141672124585451,-6.132237912412509,-6.122803700239567,-6.113369488066625,-6.103935275893681,-6.09450106372074,-6.085066851547797,-6.075632639374855,-6.066198427201913,-6.05676421502897,-6.047330002856029,-6.037895790683085,-6.028461578510144,-6.019027366337202,-6.009593154164259,-6.000158941991316,-5.990724729818374,-5.981290517645432,-5.97185630547249,-5.962422093299547,-5.952987881126605,-5.943553668953663,-5.93411945678072,-5.924685244607779,-5.915251032434836,-5.905816820261894,-5.89638260808895,-5.886948395916009,-5.877514183743067,-5.868079971570124,-5.858645759397182,-5.849211547224239,-5.839777335051298,-5.830343122878355,-5.820908910705413,-5.811474698532471,-5.802040486359528,-5.792606274186585,-5.7831720620136435,-5.773737849840701,-5.7643036376677586,-5.754869425494816,-5.745435213321874,-5.736001001148932,-5.726566788975989,-5.717132576803047,-5.7076983646301045,-5.6982641524571624,-5.6888299402842195,-5.6793957281112775,-5.669961515938335,-5.6605273037653925,-5.65109309159245,-5.641658879419508,-5.632224667246566,-5.622790455073623,-5.613356242900682,-5.603922030727738,-5.594487818554797,-5.585053606381853,-5.575619394208912,-5.56618518203597,-5.556750969863027,-5.547316757690085,-5.537882545517142,-5.528448333344201,-5.519014121171257,-5.509579908998316,-5.500145696825373,-5.490711484652431,-5.481277272479488,-5.471843060306547,-5.462408848133604,-5.452974635960662,-5.443540423787719,-5.434106211614777,-5.424671999441836,-5.415237787268892,-5.405803575095951,-5.396369362923007,-5.386935150750066,-5.377500938577122,-5.368066726404181,-5.358632514231239,-5.349198302058296,-5.339764089885354,-5.330329877712412,-5.32089566553947,-5.311461453366527,-5.302027241193585,-5.292593029020642,-5.283158816847701,-5.273724604674757,-5.264290392501816,-5.254856180328873,-5.245421968155931,-5.235987755982989,-5.226553543810046,-5.217119331637105,-5.207685119464161,-5.19825090729122,-5.188816695118277,-5.179382482945335,-5.169948270772392,-5.16051405859945,-5.151079846426508,-5.141645634253566,-5.132211422080623,-5.122777209907681,-5.113342997734739,-5.103908785561796,-5.094474573388855,-5.085040361215911,-5.07560614904297,-5.066171936870026,-5.056737724697085,-5.0473035125241426,-5.0378693003512,-5.028435088178258,-5.019000876005315,-5.0095666638323735,-5.0001324516594305,-4.9906982394864885,-4.981264027313546,-4.9718298151406035,-4.962395602967661,-4.952961390794719,-4.9435271786217765,-4.934092966448834,-4.9246587542758915,-4.9152245421029495,-4.905790329930008,-4.8963561177570645,-4.886921905584123,-4.8774876934111795,-4.868053481238238,-4.858619269065295,-4.849185056892353,-4.839750844719411,-4.830316632546468,-4.820882420373526,-4.811448208200584,-4.802013996027641,-4.792579783854699,-4.783145571681757,-4.773711359508814,-4.764277147335873,-4.754842935162929,-4.745408722989988,-4.735974510817045,-4.726540298644103,-4.717106086471162,-4.707671874298218,-4.698237662125276,-4.688803449952333,-4.679369237779392,-4.669935025606449,-4.660500813433507,-4.651066601260564,-4.641632389087622,-4.63219817691468,-4.622763964741738,-4.613329752568795,-4.603895540395853,-4.59446132822291,-4.585027116049968,-4.575592903877027,-4.566158691704083,-4.556724479531142,-4.547290267358198,-4.537856055185257,-4.528421843012315,-4.518987630839372,-4.50955341866643,-4.500119206493487,-4.490684994320545,-4.481250782147603,-4.471816569974661,-4.462382357801718,-4.452948145628776,-4.443513933455833,-4.434079721282892,-4.424645509109949,-4.415211296937007,-4.405777084764064,-4.396342872591122,-4.38690866041818,-4.377474448245237,-4.368040236072296,-4.358606023899352,-4.349171811726411,-4.339737599553468,-4.330303387380526,-4.320869175207584,-4.311434963034641,-4.302000750861699,-4.292566538688757,-4.283132326515814,-4.273698114342872,-4.26426390216993,-4.254829689996987,-4.2453954778240455,-4.235961265651102,-4.2265270534781605,-4.2170928413052176,-4.2076586291322755,-4.1982244169593335,-4.1887902047863905,-4.1793559926134485,-4.1699217804405055,-4.160487568267564,-4.1510533560946214,-4.141619143921679,-4.1321849317487365,-4.122750719575794,-4.113316507402852,-4.10388229522991,-4.094448083056967,-4.085013870884025,-4.075579658711082,-4.06614544653814,-4.056711234365198,-4.047277022192256,-4.037842810019313,-4.028408597846371,-4.018974385673429,-4.009540173500487,-4.000105961327544,-3.990671749154602,-3.9812375369816597,-3.9718033248087172,-3.9623691126357747,-3.9529349004628327,-3.9435006882898906,-3.934066476116948,-3.9246322639440057,-3.9151980517710636,-3.9057638395981216,-3.896329627425179,-3.8868954152522366,-3.877461203079294,-3.8680269909063516,-3.858592778733409,-3.8491585665604675,-3.839724354387525,-3.8302901422145825,-3.82085593004164,-3.8114217178686984,-3.801987505695756,-3.7925532935228135,-3.783119081349871,-3.7736848691769285,-3.7642506570039864,-3.754816444831044,-3.745382232658102,-3.7359480204851594,-3.726513808312217,-3.717079596139275,-3.707645383966333,-3.6982111717933903,-3.688776959620448,-3.6793427474475053,-3.6699085352745633,-3.660474323101621,-3.6510401109286783,-3.6416058987557363,-3.6321716865827938,-3.6227374744098517,-3.6133032622369092,-3.603869050063967,-3.5944348378910247,-3.585000625718082,-3.57556641354514,-3.5661322013721977,-3.556697989199255,-3.5472637770263127,-3.5378295648533706,-3.5283953526804286,-3.518961140507486,-3.5095269283345436,-3.5000927161616016,-3.490658503988659,-3.4812242918157166,-3.4717900796427745,-3.462355867469832,-3.4529216552968895,-3.443487443123947,-3.4340532309510055,-3.424619018778063,-3.4151848066051205,-3.4057505944321784,-3.396316382259236,-3.386882170086294,-3.377447957913351,-3.368013745740409,-3.3585795335674664,-3.349145321394524,-3.339711109221582,-3.33027689704864,-3.3208426848756973,-3.311408472702755,-3.301974260529813,-3.2925400483568708,-3.283105836183928,-3.2736716240109853,-3.2642374118380433,-3.254803199665101,-3.2453689874921587,-3.2359347753192163,-3.226500563146274,-3.2170663509733317,-3.207632138800389,-3.1981979266274476,-3.1887637144545047,-3.179329502281562,-3.1698952901086197,-3.1604610779356777,-3.1510268657627356,-3.141592653589793]}
},{}],70:[function(require,module,exports){
module.exports={"expected":[-1.2246467991473532e-16,0.009434492078244216,0.01887066382749657,0.028310196115140622,0.03775477220312083,0.04720607894975481,0.05666580801700089,0.06613565708501307,0.07561733107585601,0.0851125433882401,0.0946230171452119,0.10415048645673211,0.11369669769912445,0.12326341081343553,0.1328524006247714,0.14246545818476095,0.15210439213933008,0.16177103012406166,0.17146722018948363,0.18119483225869798,0.1909557596198704,0.20075192045618853,0.21058525941599984,0.22045774922595374,0.2303713923500972,0.24032822269800563,0.25033030738516887,0.2603797485489979,0.27047868522400803,0.28062929527986724,0.29083379742623416,0.3010944532884726,0.31141356955857546,0.3217935002258535,0.3322366488921816,0.34274547117689613,0.3533224772166927,0.3639702342662023,0.37469136940524456,0.38548857235912554,0.3963645984387198,0.4073222716074849,0.4183644876830137,0.42949421768118795,0.44071451131151085,0.4520285006327493,0.4634394038786055,0.47495052946376615,0.48656528018137235,0.49828715760367565,0.5101197666984602,0.5220668206746512,0.5341321460714575,0.5463196881064099,0.5586335162987097,0.571077830385502,0.583656966549915,0.5963754039811058,0.6092377717880159,0.6222488562901398,0.6354136087103747,0.6487371532968819,0.6622247959029648,0.6758820330561855,0.6897145615503801,0.7037282885968748,0.7179293425740859,0.7323240844178202,0.7469191196980445,0.7617213114316083,0.7767377936845311,0.7919759860219255,0.8074436088685455,0.8231486998483417,0.8390996311772799,0.8553051281902163,0.8717742890897078,0.8885166060125237,0.9055419875182349,0.9228607826138485,0.940483806438937,0.9584223677473818,0.9766882983347202,0.9952939845743644,1.0142524012417689,1.0335771478232163,1.0532824875254234,1.073383389223917,1.0938955726123762,1.1148355568421981,1.136220712971799,1.1580693205789938,1.180400628927759,1.2032349231232324,1.2265935957367435,1.250499224436478,1.2749756562202352,1.3000480989153302,1.3257432206884283,1.3520892583960311,1.3791161357063682,1.406855592037044,1.435341323482399,1.4646091370523227,1.4946971197135892,1.5256458239185904,1.5574984715292446,1.5903011783002905,1.6241032013822136,1.658957212646206,1.6949196010305727,1.7320508075688754,1.7704156972977532,1.8100839728697131,1.8511306354317894,1.8936364991945456,1.9376887671337688,1.9833816764700463,2.03081722399714,2.0801059830267583,2.1313680257411507,2.184733967170532,2.2403461499271984,2.298359992346986,2.3589455269523683,2.4222891613396014,2.488595699933721,2.5580906728412636,2.6310230276366373,2.7076682518298707,2.7883320086123833,2.8733543870902416,2.9631148916841674,3.0580383251484533,3.1586017576812417,3.2653428234794597,3.3788696493980632,3.499872802992759,3.629139755934904,3.767572503075662,3.9162091707266002,4.076250709236547,4.249094122520159,4.436374181715969,4.640016262480466,4.862303927567536,5.105966289668581,5.374292255120169,5.67128181961771,6.001849236738429,6.3721000659195655,6.789715464806624,7.264495499118046,7.8091439235497315,8.440429657506439,9.180954248158802,10.061929312379673,11.127708152523041,12.443516159796236,14.109365540316189,16.286814403659605,19.254917584357074,23.54077855868485,30.273904647358133,42.39101470462889,70.66007756373634,211.9928118273546,-211.9928118273312,-70.66007756373817,-42.39101470463115,-30.273904647357654,-23.540778558685545,-19.25491758435688,-16.28681440365994,-14.109365540316261,-12.443516159796292,-11.127708152523088,-10.06192931237971,-9.180954248158832,-8.44042965750653,-7.809143923549754,-7.264495499118017,-6.789715464806683,-6.372100065919544,-6.001849236738508,-5.671281819617693,-5.37429225512018,-5.105966289668567,-4.862303927567546,-4.640016262480494,-4.436374181715977,-4.249094122520166,-4.076250709236538,-3.9162091707266207,-3.7675725030756677,-3.6291397559349217,-3.499872802992752,-3.3788696493980677,-3.265342823479454,-3.1586017576812555,-3.058038325148457,-2.963114891684171,-2.8733543870902447,-2.788332008612379,-2.7076682518298885,-2.6310230276366333,-2.558090672841273,-2.488595699933717,-2.422289161339604,-2.3589455269523705,-2.298359992346988,-2.2403461499272006,-2.1847339671705344,-2.1313680257411525,-2.0801059830267605,-2.030817223997146,-1.9833816764700436,-1.9376887671337746,-1.8936364991945431,-1.851130635431795,-1.810083972869711,-1.7704156972977547,-1.732050807568877,-1.694919601030574,-1.6589572126462109,-1.6241032013822116,-1.590301178300295,-1.5574984715292428,-1.5256458239185946,-1.4946971197135905,-1.4646091370523238,-1.4353413234823975,-1.4068555920370451,-1.3791161357063693,-1.3520892583960347,-1.3257432206884294,-1.3000480989153314,-1.2749756562202386,-1.2504992244364792,-1.2265935957367466,-1.203234923123231,-1.18040062892776,-1.1580693205789927,-1.1362207129717996,-1.1148355568422,-1.0938955726123771,-1.0733833892239188,-1.0532824875254232,-1.033577147823218,-1.0142524012417697,-0.9952939845743659,-0.97668829833472,-0.9584223677473833,-0.9404838064389361,-0.9228607826138501,-0.9055419875182356,-0.8885166060125251,-0.8717742890897083,-0.8553051281902162,-0.839099631177282,-0.8231486998483416,-0.8074436088685475,-0.791975986021924,-0.7767377936845318,-0.7617213114316082,-0.746919119698045,-0.7323240844178214,-0.7179293425740871,-0.7037282885968753,-0.6897145615503807,-0.6758820330561868,-0.6622247959029652,-0.6487371532968824,-0.635413608710374,-0.6222488562901409,-0.6092377717880151,-0.5963754039811069,-0.5836569665499161,-0.5710778303855025,-0.5586335162987107,-0.5463196881064097,-0.5341321460714591,-0.5220668206746516,-0.51011976669846,-0.49828715760367553,-0.4865652801813728,-0.4749505294637661,-0.4634394038786065,-0.45202850063274974,-0.44071451131151185,-0.4294942176811884,-0.41836448768301415,-0.40732227160748635,-0.3963645984387197,-0.385488572359126,-0.37469136940524395,-0.3639702342662032,-0.3533224772166931,-0.3427454711768966,-0.33223664889218246,-0.32179350022585396,-0.31141356955857635,-0.301094453288473,-0.29083379742623505,-0.28062929527986763,-0.2704786852240075,-0.26037974854899787,-0.25033030738516976,-0.24032822269800555,-0.23037139235009807,-0.22045774922595412,-0.2105852594160007,-0.20075192045618936,-0.19095575961987032,-0.18119483225869928,-0.17146722018948354,-0.16177103012406158,-0.15210439213933,-0.14246545818476178,-0.13285240062477177,-0.1232634108134359,-0.11369669769912527,-0.10415048645673293,-0.09462301714521228,-0.08511254338824047,-0.07561733107585682,-0.06613565708501343,-0.056665808017000815,-0.04720607894975562,-0.03775477220312209,-0.028310196115141434,-0.018870663827497382,-0.00943449207824414,-2.4492935982947064e-16,0.009434492078244539,0.018870663827496893,0.02831019611514094,0.03775477220312071,0.04720607894975513,0.05666580801699943,0.06613565708501294,0.07561733107585543,0.08511254338823908,0.09462301714521268,0.10415048645673154,0.11369669769912567,0.1232634108134354,0.1328524006247713,0.14246545818476128,0.1521043921393295,0.16177103012406108,0.17146722018948304,0.18119483225869693,0.19095575961986982,0.20075192045618886,0.21058525941600018,0.22045774922595454,0.2303713923500966,0.24032822269800597,0.25033030738516826,0.26037974854899826,0.270478685224007,0.28062929527986613,0.29083379742623455,0.3010944532884715,0.3114135695585768,0.3217935002258534,0.3322366488921819,0.342745471176896,0.3533224772166925,0.3639702342662026,0.3746913694052444,0.38548857235912437,0.39636459843871913,0.40732227160748474,0.4183644876830136,0.4294942176811889,0.4407145113115102,0.45202850063275024,0.4634394038786048,0.47495052946376654,0.4865652801813722,0.4982871576036749,0.5101197666984594,0.5220668206746499,0.5341321460714585,0.5463196881064092,0.55863351629871,0.5710778303855019,0.5836569665499154,0.5963754039811062,0.6092377717880156,0.622248856290139,0.6354136087103746,0.6487371532968804,0.6622247959029646,0.6758820330561861,0.6897145615503787,0.7037282885968759,0.717929342574085,0.732324084417822,0.7469191196980443,0.7617213114316074,0.776737793684531,0.7919759860219246,0.8074436088685453,0.8231486998483408,0.8390996311772797,0.8553051281902153,0.8717742890897091,0.8885166060125242,0.9055419875182362,0.9228607826138475,0.9404838064389368,0.9584223677473807,0.9766882983347208,0.9952939845743649,1.0142524012417669,1.033577147823217,1.053282487525422,1.0733833892239197,1.093895572612376,1.1148355568421988,1.1362207129717985,1.1580693205789936,1.1804006289277589,1.203234923123232,1.2265935957367433,1.2504992244364779,1.274975656220235,1.30004809891533,1.3257432206884305,1.352089258396031,1.3791161357063704,1.4068555920370438,1.4353413234823988,1.4646091370523222,1.4946971197135888,1.525645823918593,1.5574984715292413,1.5903011783002934,1.6241032013822099,1.6589572126462089,1.694919601030572,1.7320508075688785,1.7704156972977527,1.8100839728697127,1.851130635431789,1.893636499194545,1.9376887671337724,1.9833816764700412,2.030817223997144,2.080105983026753,2.1313680257411547,2.1847339671705317,2.240346149927203,2.298359992346985,2.3589455269523674,2.4222891613396005,2.48859569993372,2.5580906728412693,2.6310230276366293,2.707668251829877,2.7883320086123744,2.8733543870902487,2.963114891684166,3.058038325148452,3.1586017576812404,3.2653428234794584,3.378869649398062,3.4998728029927575,3.629139755934915,3.767572503075647,3.9162091707266127,4.076250709236529,4.249094122520174,4.436374181715967,4.640016262480463,4.862303927567534,5.105966289668578,5.374292255120165,5.671281819617706,6.001849236738457,6.372100065919524,6.78971546480666,7.264495499117944,7.809143923549779,8.44042965750643,9.180954248158791,10.061929312379661,11.127708152523025,12.443516159796216,14.109365540316164,16.286814403659807,19.254917584356697,23.540778558685275,30.273904647357206,42.391014704630265,70.66007756373573,211.9928118273491,-211.99281182741652,-70.66007756373878,-42.39101470463137,-30.273904647357767,-23.540778558685123,-19.254917584357585,-16.286814403659736,-14.109365540316464,-12.443516159796173,-11.127708152523102,-10.061929312379814,-9.180954248158843,-8.440429657506538,-7.809143923549762,-7.264495499118024,-6.789715464806688,-6.372100065919623,-6.0018492367384475,-5.671281819617726,-5.374292255120157,-5.105966289668618,-4.862303927567549,-4.6400162624804775,-4.436374181715998,-4.249094122520169,-4.07625070923654,-3.916209170726623,-3.7675725030756695,-3.629139755934911,-3.4998728029927655,-3.3788696493980694,-3.2653428234794757,-3.158601757681257,-3.058038325148458,-2.9631148916841634,-2.873354387090254,-2.78833200861238,-2.7076682518298747,-2.6310230276366413,-2.558090672841267,-2.4885956999337306,-2.422289161339605,-2.3589455269523714,-2.2983599923469833,-2.2403461499272015,-2.1847339671705353,-2.1313680257411582,-2.080105983026761,-2.0308172239971425,-1.9833816764700487,-1.9376887671337752,-1.893636499194552,-1.8511306354317876,-1.8100839728697151,-1.7704156972977516,-1.732050807568881,-1.6949196010305814,-1.658957212646208,-1.6241032013822154,-1.5903011783002923,-1.5574984715292493,-1.525645823918595,-1.4946971197135908,-1.4646091370523213,-1.4353413234824006,-1.4068555920370456,-1.3791161357063721,-1.35208925839603,-1.3257432206884296,-1.300048098915334,-1.2749756562202366,-1.250499224436484,-1.2265935957367424,-1.2032349231232335,-1.1804006289277582,-1.1580693205789971,-1.1362207129718,-1.1148355568421981,-1.0938955726123794,-1.073383389223919,-1.0532824875254272,-1.0335771478232183,-1.01425240124177,-0.9952939845743644,-0.976688298334722,-0.9584223677473819,-0.9404838064389397,-0.922860782613847,-0.9055419875182358,-0.8885166060125238,-0.8717742890897102,-0.8553051281902194,-0.8390996311772793,-0.8231486998483433,-0.8074436088685463,-0.7919759860219271,-0.7767377936845319,-0.7617213114316084,-0.7469191196980438,-0.7323240844178216,-0.7179293425740887,-0.7037282885968769,-0.6897145615503809,-0.6758820330561857,-0.6622247959029667,-0.6487371532968825,-0.6354136087103767,-0.6222488562901386,-0.6092377717880165,-0.5963754039811059,-0.5836569665499162,-0.5710778303855026,-0.5586335162987097,-0.5463196881064111,-0.5341321460714581,-0.5220668206746529,-0.5101197666984613,-0.4982871576036757,-0.48656528018137185,-0.47495052946376515,-0.46343940387860555,-0.45202850063275096,-0.44071451131151196,-0.42949421768118856,-0.4183644876830154,-0.40732227160748546,-0.3963645984387219,-0.3854885723591251,-0.3746913694052451,-0.36397023426620234,-0.35332247721669424,-0.3427454711768967,-0.33223664889218163,-0.32179350022585307,-0.31141356955857646,-0.3010944532884741,-0.2908337974262352,-0.28062929527986774,-0.27047868522400764,-0.2603797485489989,-0.2503303073851689,-0.2403282226980057,-0.23037139235009632,-0.22045774922595426,-0.21058525941600176,-0.2007519204561895,-0.1909557596198723,-0.18119483225869756,-0.1714672201894846,-0.1617710301240617,-0.15210439213933105,-0.14246545818476192,-0.1328524006247719,-0.12326341081343513,-0.1136966976991254,-0.10415048645673215,-0.09462301714521329,-0.0851125433882388,-0.07561733107585605,-0.06613565708501444,-0.05666580801700272,-0.04720607894975486,-0.037754772203120436,-0.028310196115141555,-0.01887066382749662,-0.00943449207824515,-2.1437508791444563e-15,0.009434492078244415,0.01887066382749766,0.02831019611514082,0.037754772203119694,0.04720607894975234,0.05666580801700198,0.0661356570850137,0.07561733107585532,0.08511254338823986,0.09462301714521076,0.10415048645673321,0.11369669769912465,0.12326341081343618,0.13285240062477116,0.14246545818475934,0.15210439213932847,0.16177103012406277,0.17146722018948382,0.18119483225869681,0.19095575961986969,0.20075192045618873,0.21058525941599912,0.2204577492259535,0.2303713923500974,0.2403282226980049,0.25033030738516815,0.26037974854899626,0.27047868522400875,0.28062929527986696,0.2908337974262325,0.3010944532884733,0.3114135695585757,0.32179350022585423,0.3322366488921808,0.34274547117689586,0.3533224772166934,0.3639702342662015,0.3746913694052422,0.3854885723591263,0.396364598438719,0.4073222716074846,0.4183644876830145,0.4294942176811877,0.44071451131150896,0.45202850063274796,0.4634394038786068,0.4749505294637664,0.4865652801813709,0.49828715760367476,0.5101197666984604,0.522066820674652,0.5341321460714572,0.5463196881064101,0.5586335162987087,0.5710778303855018,0.5836569665499152,0.5963754039811073,0.6092377717880155,0.6222488562901376,0.6354136087103731,0.648737153296884,0.6622247959029657,0.6758820330561846,0.6897145615503798,0.7037282885968731,0.7179293425740849,0.7323240844178205,0.7469191196980455,0.7617213114316072,0.7767377936845279,0.7919759860219259,0.8074436088685479,0.823148699848342,0.839099631177278,0.8553051281902151,0.8717742890897089,0.8885166060125256,0.9055419875182344,0.9228607826138489,0.9404838064389349,0.9584223677473804,0.9766882983347206,0.9952939845743665,1.0142524012417684,1.0335771478232132,1.0532824875254256,1.0733833892239175,1.0938955726123738,1.1148355568421966,1.1362207129717983,1.1580693205789954,1.1804006289277564,1.2032349231232318,1.226593595736745,1.2504992244364774,1.2749756562202346,1.300048098915332,1.3257432206884276,1.352089258396033,1.3791161357063648,1.4068555920370487,1.4353413234823984,1.464609137052319,1.4946971197135885,1.5256458239185926,1.5574984715292468,1.5903011783002898,1.6241032013822125,1.658957212646205,1.6949196010305647,1.732050807568878,1.7704156972977558,1.810083972869712,1.8511306354317845,1.8936364991945405,1.9376887671337801,1.983381676470045,2.0308172239971385,2.080105983026757,2.1313680257411445,2.184733967170541,2.240346149927197,2.29835999234699,2.3589455269523665,2.4222891613395876,2.4885956999337253,2.558090672841275,2.6310230276366355,2.7076682518298685,2.7883320086123735,2.8733543870902474,2.9631148916841563,3.0580383251484506,3.158601757681249,3.265342823479447,3.37886964939806,3.4998728029927557,3.6291397559349257,3.7675725030756584,3.9162091707265816,4.076250709236558,4.249094122520154,4.4363741817159825,4.640016262480461,4.862303927567531,5.105966289668599,5.374292255120134,5.671281819617702,6.001849236738486,6.372100065919518,6.789715464806654,7.264495499118032,7.8091439235497155,8.440429657506357,9.180954248158704,10.06192931237983,11.127708152523011,12.443516159796058,14.109365540316139,16.286814403659776,19.25491758435731,23.540778558684714,30.27390464735791,42.39101470462845,70.66007756373511,211.99281182746333,-211.9928118273422,-70.66007756373939,-42.39101470463318,-30.273904647358695,-23.540778558684202,-19.25491758435697,-16.286814403660003,-14.109365540316311,-12.443516159796468,-11.12770815252334,-10.061929312379554,-9.180954248158777,-8.440429657506547,-7.809143923549879,-7.264495499117983,-6.789715464806611,-6.372100065919554,-6.001849236738518,-5.671281819617731,-5.3742922551202135,-5.105966289668622,-4.862303927567508,-4.64001626248048,-4.436374181716,-4.249094122520205,-4.076250709236542,-3.916209170726596,-3.7675725030756713,-3.6291397559349377,-3.4998728029927673,-3.3788696493980708,-3.2653428234794775,-3.1586017576812386,-3.0580383251484595,-2.963114891684182,-2.8733543870902554,-2.788332008612381,-2.7076682518298756,-2.631023027636642,-2.5580906728412818,-2.4885956999337187,-2.422289161339606,-2.358945526952384,-2.298359992346984,-2.240346149927202,-2.1847339671705357,-2.131368025741159,-2.080105983026762,-2.030817223997143,-1.9833816764700491,-1.937688767133776,-1.8936364991945442,-1.851130635431796,-1.8100839728697233,-1.7704156972977447,-1.7320508075688743,-1.694919601030575,-1.658957212646215,-1.6241032013822159,-1.5903011783002927,-1.5574984715292437,-1.5256458239185955,-1.4946971197135912,-1.4646091370523273,-1.4353413234824064,-1.4068555920370407,-1.3791161357063675,-1.3520892583960356,-1.325743220688435,-1.3000480989153342,-1.2749756562202321,-1.2504992244364797,-1.2265935957367473,-1.2032349231232338,-1.1804006289277627,-1.1580693205789974,-1.1362207129717963,-1.1148355568421984,-1.0938955726123796,-1.073383389223923,-1.0532824875254236,-1.033577147823215,-1.0142524012417702,-0.9952939845743681,-0.9766882983347223,-0.9584223677473821,-0.9404838064389399,-0.9228607826138472,-0.905541987518236,-0.8885166060125271,-0.8717742890897103,-0.8553051281902166,-0.8390996311772795,-0.8231486998483435,-0.8074436088685495,-0.7919759860219244,-0.7767377936845321,-0.7617213114316114,-0.746919119698044,-0.7323240844178218,-0.7179293425740861,-0.703728288596877,-0.689714561550381,-0.6758820330561859,-0.6622247959029669,-0.6487371532968826,-0.6354136087103743,-0.6222488562901413,-0.6092377717880191,-0.596375403981106,-0.583656966549914,-0.5710778303855029,-0.5586335162987123,-0.5463196881064112,-0.5341321460714583,-0.5220668206746508,-0.5101197666984615,-0.49828715760367587,-0.4865652801813742,-0.47495052946376964,-0.46343940387860355,-0.45202850063274896,-0.4407145113115121,-0.4294942176811908,-0.4183644876830155,-0.4073222716074835,-0.39636459843871996,-0.38548857235912726,-0.3746913694052452,-0.36397023426620445,-0.35332247721669435,-0.34274547117689486,-0.33223664889218174,-0.3217935002258552,-0.3114135695585786,-0.3010944532884723,-0.2908337974262334,-0.2806292952798679,-0.27047868522400775,-0.2603797485489991,-0.25033030738516904,-0.2403282226980077,-0.23037139235009643,-0.22045774922595437,-0.21058525941600187,-0.20075192045618961,-0.19095575961987057,-0.1811948322586977,-0.1714672201894847,-0.16177103012406183,-0.15210439213932936,-0.14246545818476203,-0.13285240062477385,-0.12326341081343525,-0.11369669769912552,-0.10415048645673228,-0.09462301714521341,-0.08511254338824072,-0.07561733107585618,-0.06613565708501457,-0.056665808016999275,-0.047206078949754975,-0.03775477220312234,-0.028310196115143457,-0.01887066382749674,-0.009434492078243496,-4.898587196589413e-16],"x":[3.141592653589793,3.1510268657627356,3.1604610779356777,3.1698952901086197,3.179329502281562,3.1887637144545047,3.1981979266274476,3.207632138800389,3.2170663509733317,3.226500563146274,3.2359347753192163,3.2453689874921587,3.254803199665101,3.2642374118380433,3.2736716240109853,3.283105836183928,3.2925400483568708,3.301974260529813,3.311408472702755,3.3208426848756973,3.33027689704864,3.339711109221582,3.349145321394524,3.3585795335674664,3.368013745740409,3.377447957913351,3.386882170086294,3.396316382259236,3.4057505944321784,3.4151848066051205,3.424619018778063,3.4340532309510055,3.443487443123947,3.4529216552968895,3.462355867469832,3.4717900796427745,3.4812242918157166,3.490658503988659,3.5000927161616016,3.5095269283345436,3.518961140507486,3.5283953526804286,3.5378295648533706,3.5472637770263127,3.556697989199255,3.5661322013721977,3.57556641354514,3.585000625718082,3.5944348378910247,3.603869050063967,3.6133032622369092,3.6227374744098517,3.6321716865827938,3.6416058987557363,3.6510401109286783,3.660474323101621,3.6699085352745633,3.6793427474475053,3.688776959620448,3.6982111717933903,3.707645383966333,3.717079596139275,3.726513808312217,3.7359480204851594,3.745382232658102,3.754816444831044,3.7642506570039864,3.7736848691769285,3.783119081349871,3.7925532935228135,3.801987505695756,3.8114217178686984,3.82085593004164,3.8302901422145825,3.839724354387525,3.8491585665604675,3.858592778733409,3.8680269909063516,3.877461203079294,3.8868954152522366,3.896329627425179,3.9057638395981216,3.9151980517710636,3.9246322639440057,3.934066476116948,3.9435006882898906,3.9529349004628327,3.9623691126357747,3.9718033248087172,3.9812375369816597,3.990671749154602,4.000105961327544,4.009540173500487,4.018974385673429,4.028408597846371,4.037842810019313,4.047277022192256,4.056711234365198,4.06614544653814,4.075579658711082,4.085013870884025,4.094448083056967,4.10388229522991,4.113316507402852,4.122750719575794,4.1321849317487365,4.141619143921679,4.1510533560946214,4.160487568267564,4.1699217804405055,4.1793559926134485,4.1887902047863905,4.1982244169593335,4.2076586291322755,4.2170928413052176,4.2265270534781605,4.235961265651102,4.2453954778240455,4.254829689996987,4.26426390216993,4.273698114342872,4.283132326515814,4.292566538688757,4.302000750861699,4.311434963034641,4.320869175207584,4.330303387380526,4.339737599553468,4.349171811726411,4.358606023899352,4.368040236072296,4.377474448245237,4.38690866041818,4.396342872591122,4.405777084764064,4.415211296937007,4.424645509109949,4.434079721282892,4.443513933455833,4.452948145628776,4.462382357801718,4.471816569974661,4.481250782147603,4.490684994320545,4.500119206493487,4.50955341866643,4.518987630839372,4.528421843012315,4.537856055185257,4.547290267358198,4.556724479531142,4.566158691704083,4.575592903877027,4.585027116049968,4.59446132822291,4.603895540395853,4.613329752568795,4.622763964741738,4.63219817691468,4.641632389087622,4.651066601260564,4.660500813433507,4.669935025606449,4.679369237779392,4.688803449952333,4.698237662125276,4.707671874298218,4.717106086471162,4.726540298644103,4.735974510817045,4.745408722989988,4.754842935162929,4.764277147335873,4.773711359508814,4.783145571681757,4.792579783854699,4.802013996027641,4.811448208200584,4.820882420373526,4.830316632546468,4.839750844719411,4.849185056892353,4.858619269065295,4.868053481238238,4.8774876934111795,4.886921905584123,4.8963561177570645,4.905790329930008,4.9152245421029495,4.9246587542758915,4.934092966448834,4.9435271786217765,4.952961390794719,4.962395602967661,4.9718298151406035,4.981264027313546,4.9906982394864885,5.0001324516594305,5.0095666638323735,5.019000876005315,5.028435088178258,5.0378693003512,5.0473035125241426,5.056737724697085,5.066171936870026,5.07560614904297,5.085040361215911,5.094474573388855,5.103908785561796,5.113342997734739,5.122777209907681,5.132211422080623,5.141645634253566,5.151079846426508,5.16051405859945,5.169948270772392,5.179382482945335,5.188816695118277,5.19825090729122,5.207685119464161,5.217119331637105,5.226553543810046,5.235987755982989,5.245421968155931,5.254856180328873,5.264290392501816,5.273724604674757,5.283158816847701,5.292593029020642,5.302027241193585,5.311461453366527,5.32089566553947,5.330329877712412,5.339764089885354,5.349198302058296,5.358632514231239,5.368066726404181,5.377500938577122,5.386935150750066,5.396369362923007,5.405803575095951,5.415237787268892,5.424671999441836,5.434106211614777,5.443540423787719,5.452974635960662,5.462408848133604,5.471843060306547,5.481277272479488,5.490711484652431,5.500145696825373,5.509579908998316,5.519014121171257,5.528448333344201,5.537882545517142,5.547316757690085,5.556750969863027,5.56618518203597,5.575619394208912,5.585053606381853,5.594487818554797,5.603922030727738,5.613356242900682,5.622790455073623,5.632224667246566,5.641658879419508,5.65109309159245,5.6605273037653925,5.669961515938335,5.6793957281112775,5.6888299402842195,5.6982641524571624,5.7076983646301045,5.717132576803047,5.726566788975989,5.736001001148932,5.745435213321874,5.754869425494816,5.7643036376677586,5.773737849840701,5.7831720620136435,5.792606274186585,5.802040486359528,5.811474698532471,5.820908910705413,5.830343122878355,5.839777335051298,5.849211547224239,5.858645759397182,5.868079971570124,5.877514183743067,5.886948395916009,5.89638260808895,5.905816820261894,5.915251032434836,5.924685244607779,5.93411945678072,5.943553668953663,5.952987881126605,5.962422093299547,5.97185630547249,5.981290517645432,5.990724729818374,6.000158941991316,6.009593154164259,6.019027366337202,6.028461578510144,6.037895790683085,6.047330002856029,6.05676421502897,6.066198427201913,6.075632639374855,6.085066851547797,6.09450106372074,6.103935275893681,6.113369488066625,6.122803700239567,6.132237912412509,6.141672124585451,6.151106336758394,6.160540548931336,6.169974761104278,6.17940897327722,6.188843185450163,6.198277397623105,6.207711609796047,6.21714582196899,6.226580034141932,6.236014246314874,6.245448458487816,6.254882670660759,6.264316882833701,6.273751095006644,6.283185307179586,6.292619519352529,6.302053731525471,6.311487943698413,6.320922155871355,6.330356368044298,6.339790580217239,6.349224792390182,6.358659004563124,6.368093216736066,6.37752742890901,6.386961641081951,6.396395853254895,6.405830065427836,6.415264277600778,6.424698489773721,6.434132701946663,6.4435669141196055,6.4530011262925475,6.46243533846549,6.4718695506384325,6.481303762811375,6.4907379749843175,6.50017218715726,6.509606399330202,6.5190406115031445,6.528474823676087,6.5379090358490295,6.547343248021971,6.556777460194913,6.5662116723678565,6.575645884540798,6.5850800967137415,6.594514308886683,6.603948521059626,6.613382733232568,6.62281694540551,6.632251157578453,6.641685369751395,6.651119581924336,6.660553794097279,6.669988006270222,6.679422218443164,6.688856430616107,6.698290642789048,6.707724854961992,6.717159067134933,6.726593279307876,6.736027491480818,6.74546170365376,6.754895915826702,6.764330127999644,6.773764340172588,6.783198552345529,6.792632764518472,6.802066976691414,6.811501188864357,6.820935401037299,6.830369613210241,6.839803825383183,6.849238037556126,6.858672249729067,6.86810646190201,6.877540674074953,6.886974886247894,6.896409098420838,6.905843310593779,6.915277522766723,6.924711734939664,6.934145947112606,6.943580159285549,6.953014371458491,6.962448583631433,6.971882795804375,6.981317007977318,6.99075122015026,7.000185432323203,7.009619644496145,7.019053856669088,7.028488068842029,7.037922281014972,7.047356493187914,7.056790705360857,7.066224917533799,7.07565912970674,7.085093341879684,7.094527554052625,7.103961766225569,7.11339597839851,7.122830190571453,7.132264402744395,7.141698614917337,7.15113282709028,7.160567039263222,7.170001251436164,7.1794354636091064,7.188869675782049,7.198303887954991,7.207738100127934,7.2171723123008755,7.226606524473819,7.2360407366467605,7.245474948819703,7.2549091609926455,7.2643433731655875,7.2737775853385305,7.283211797511472,7.2926460096844155,7.302080221857357,7.3115144340302995,7.320948646203242,7.3303828583761845,7.339817070549127,7.349251282722069,7.358685494895011,7.368119707067954,7.377553919240896,7.386988131413838,7.396422343586781,7.405856555759722,7.415290767932666,7.424724980105607,7.434159192278551,7.443593404451492,7.453027616624434,7.462461828797377,7.471896040970319,7.481330253143262,7.490764465316203,7.500198677489146,7.509632889662088,7.519067101835031,7.528501314007973,7.537935526180915,7.547369738353857,7.5568039505268,7.566238162699742,7.575672374872685,7.585106587045627,7.594540799218568,7.603975011391512,7.613409223564453,7.622843435737397,7.632277647910338,7.64171186008328,7.651146072256223,7.660580284429165,7.670014496602108,7.67944870877505,7.688882920947992,7.698317133120934,7.707751345293877,7.717185557466818,7.726619769639762,7.736053981812703,7.745488193985646,7.754922406158588,7.764356618331531,7.773790830504473,7.783225042677415,7.792659254850358,7.802093467023299,7.811527679196243,7.820961891369184,7.830396103542127,7.839830315715069,7.849264527888011,7.858698740060953,7.868132952233896,7.877567164406838,7.887001376579781,7.896435588752723,7.9058698009256645,7.915304013098608,7.9247382252715495,7.934172437444493,7.9436066496174345,7.9530408617903765,7.962475073963319,7.9719092861362615,7.981343498309204,7.9907777104821465,8.000211922655089,8.00964613482803,8.019080347000974,8.028514559173916,8.037948771346858,8.0473829835198,8.056817195692743,8.066251407865686,8.075685620038627,8.08511983221157,8.094554044384513,8.103988256557454,8.113422468730397,8.12285668090334,8.13229089307628,8.141725105249224,8.151159317422165,8.160593529595108,8.17002774176805,8.179461953940994,8.188896166113935,8.198330378286878,8.20776459045982,8.217198802632762,8.226633014805705,8.236067226978646,8.245501439151589,8.254935651324532,8.264369863497475,8.273804075670416,8.283238287843359,8.2926725000163,8.302106712189243,8.311540924362186,8.320975136535127,8.33040934870807,8.339843560881011,8.349277773053956,8.358711985226897,8.36814619739984,8.377580409572781,8.387014621745722,8.396448833918667,8.405883046091608,8.415317258264551,8.424751470437492,8.434185682610435,8.443619894783378,8.453054106956321,8.462488319129262,8.471922531302205,8.481356743475146,8.490790955648091,8.500225167821032,8.509659379993973,8.519093592166916,8.528527804339857,8.537962016512802,8.547396228685743,8.556830440858686,8.566264653031627,8.57569886520457,8.585133077377513,8.594567289550454,8.604001501723397,8.613435713896338,8.622869926069281,8.632304138242224,8.641738350415167,8.651172562588108,8.660606774761051,8.670040986933992,8.679475199106937,8.688909411279878,8.698343623452821,8.707777835625762,8.717212047798704,8.726646259971648,8.73608047214459,8.745514684317532,8.754948896490474,8.764383108663417,8.77381732083636,8.783251533009302,8.792685745182244,8.802119957355185,8.811554169528128,8.82098838170107,8.830422593874014,8.839856806046955,8.849291018219898,8.858725230392839,8.868159442565783,8.877593654738725,8.887027866911668,8.896462079084609,8.905896291257552,8.915330503430495,8.924764715603436,8.934198927776379,8.94363313994932,8.953067352122263,8.962501564295206,8.971935776468149,8.981369988641092,8.990804200814033,9.000238412986974,9.009672625159917,9.01910683733286,9.028541049505801,9.037975261678744,9.047409473851685,9.05684368602463,9.066277898197571,9.075712110370514,9.085146322543455,9.094580534716398,9.10401474688934,9.113448959062284,9.122883171235225,9.132317383408166,9.141751595581109,9.151185807754052,9.160620019926995,9.170054232099936,9.179488444272879,9.188922656445822,9.198356868618765,9.207791080791706,9.217225292964647,9.22665950513759,9.236093717310531,9.245527929483476,9.254962141656417,9.26439635382936,9.273830566002301,9.283264778175244,9.292698990348187,9.30213320252113,9.311567414694071,9.321001626867014,9.330435839039955,9.3398700512129,9.349304263385841,9.358738475558782,9.368172687731724,9.377606899904668,9.387041112077611,9.396475324250552,9.405909536423495,9.415343748596436,9.424777960769378,9.434212172942322,9.443646385115265,9.453080597288206,9.462514809461148,9.471949021634089,9.481383233807035,9.490817445979976,9.500251658152917,9.50968587032586,9.519120082498802,9.528554294671746,9.537988506844687,9.54742271901763,9.556856931190572,9.566291143363513,9.575725355536456,9.5851595677094,9.594593779882342,9.604027992055283,9.613462204228226,9.622896416401169,9.63233062857411,9.641764840747053,9.651199052919996,9.660633265092937,9.67006747726588,9.67950168943882,9.688935901611766,9.698370113784707,9.707804325957648,9.717238538130593,9.726672750303534,9.736106962476477,9.745541174649418,9.75497538682236,9.764409598995304,9.773843811168245,9.783278023341186,9.79271223551413,9.802146447687072,9.811580659860015,9.821014872032958,9.830449084205899,9.83988329637884,9.849317508551783,9.858751720724728,9.868185932897669,9.87762014507061,9.887054357243553,9.896488569416496,9.905922781589439,9.91535699376238,9.924791205935323,9.934225418108264,9.943659630281207,9.95309384245415,9.962528054627093,9.971962266800034,9.981396478972975,9.990830691145918,10.000264903318863,10.009699115491804,10.019133327664745,10.028567539837688,10.03800175201063,10.047435964183572,10.056870176356515,10.066304388529458,10.0757386007024,10.08517281287534,10.094607025048285,10.104041237221228,10.11347544939417,10.12290966156711,10.132343873740053,10.141778085912996,10.15121229808594,10.16064651025888,10.170080722431823,10.179514934604764,10.188949146777707,10.19838335895065,10.207817571123593,10.217251783296534,10.226685995469476,10.23612020764242,10.245554419815361,10.254988631988303,10.264422844161246,10.273857056334188,10.283291268507131,10.292725480680073,10.302159692853015,10.311593905025958,10.3210281171989,10.330462329371843,10.339896541544785,10.349330753717727,10.35876496589067,10.36819917806361,10.377633390236555,10.387067602409497,10.396501814582438,10.40593602675538,10.415370238928324,10.424804451101267,10.434238663274208,10.44367287544715,10.453107087620092,10.462541299793033,10.471975511965978,10.48140972413892,10.490843936311862,10.500278148484803,10.509712360657746,10.51914657283069,10.528580785003632,10.538014997176573,10.547449209349516,10.556883421522457,10.566317633695402,10.575751845868343,10.585186058041286,10.594620270214227,10.604054482387168,10.613488694560113,10.622922906733056,10.632357118905997,10.641791331078938,10.651225543251881,10.660659755424824,10.670093967597765,10.679528179770708,10.688962391943651,10.698396604116592,10.707830816289535,10.717265028462478,10.726699240635421,10.736133452808362,10.745567664981303,10.755001877154248,10.764436089327189,10.773870301500132,10.783304513673073,10.792738725846016,10.802172938018959,10.8116071501919,10.821041362364843,10.830475574537786,10.839909786710727,10.84934399888367,10.858778211056613,10.868212423229554,10.877646635402495,10.887080847575438,10.896515059748383,10.905949271921324,10.915383484094265,10.924817696267208,10.934251908440151,10.943686120613094,10.953120332786035,10.962554544958978,10.97198875713192,10.981422969304862,10.990857181477807,11.000291393650748,11.00972560582369,11.01915981799663,11.028594030169574,11.038028242342518,11.04746245451546,11.0568966666884,11.066330878861343,11.075765091034285,11.085199303207226,11.094633515380172,11.104067727553113,11.113501939726055,11.122936151898996,11.13237036407194,11.141804576244883,11.151238788417825,11.160673000590766,11.170107212763709,11.17954142493665,11.188975637109593,11.198409849282537,11.207844061455479,11.21727827362842,11.226712485801361,11.236146697974306,11.245580910147249,11.25501512232019,11.264449334493131,11.273883546666074,11.283317758839017,11.292751971011958,11.302186183184903,11.311620395357844,11.321054607530785,11.330488819703728,11.33992303187667,11.349357244049614,11.358791456222555,11.368225668395496,11.37765988056844,11.387094092741382,11.396528304914323,11.405962517087268,11.415396729260209,11.424830941433152,11.434265153606093,11.443699365779036,11.453133577951979,11.46256779012492,11.472002002297863,11.481436214470806,11.490870426643747,11.500304638816688,11.509738850989635,11.519173063162576,11.528607275335517,11.538041487508458,11.547475699681401,11.556909911854344,11.566344124027287,11.575778336200228,11.585212548373171,11.594646760546112,11.604080972719053,11.613515184892,11.622949397064941,11.632383609237882,11.641817821410823,11.651252033583766,11.660686245756711,11.670120457929652,11.679554670102593,11.688988882275536,11.698423094448477,11.70785730662142,11.717291518794365,11.726725730967306,11.736159943140247,11.745594155313189,11.755028367486133,11.764462579659076,11.773896791832017,11.783331004004959,11.792765216177902,11.802199428350844,11.811633640523786,11.82106785269673,11.830502064869671,11.839936277042613,11.849370489215556,11.858804701388499,11.868238913561441,11.877673125734383,11.887107337907324,11.896541550080268,11.90597576225321,11.91540997442615,11.924844186599096,11.934278398772037,11.94371261094498,11.95314682311792,11.962581035290864,11.972015247463807,11.981449459636748,11.99088367180969,12.000317883982634,12.009752096155575,12.019186308328516,12.02862052050146,12.038054732674404,12.047488944847345,12.056923157020286,12.066357369193229,12.075791581366172,12.085225793539115,12.094660005712056,12.104094217884999,12.11352843005794,12.122962642230881,12.132396854403828,12.141831066576769,12.15126527874971,12.160699490922651,12.170133703095594,12.179567915268539,12.18900212744148,12.198436339614421,12.207870551787364,12.217304763960305,12.226738976133248,12.236173188306193,12.245607400479134,12.255041612652075,12.264475824825016,12.273910036997961,12.283344249170904,12.292778461343845,12.302212673516788,12.31164688568973,12.321081097862672,12.330515310035613,12.339949522208558,12.3493837343815,12.35881794655444,12.368252158727383,12.377686370900326,12.38712058307327,12.39655479524621,12.405989007419153,12.415423219592096,12.424857431765037,12.434291643937978,12.443725856110923,12.453160068283864,12.462594280456807,12.472028492629748,12.481462704802691,12.490896916975634,12.500331129148575,12.50976534132152,12.519199553494461,12.528633765667402,12.538067977840344,12.547502190013288,12.556936402186231,12.566370614359172]}
},{}],71:[function(require,module,exports){
module.exports={"expected":[1.2246467991473532e-16,0.0031431745866930603,0.006286411280277561,0.009429772192557145,0.01257331944514986,0.015717115174404925,0.018861221536317876,0.022005700711440538,0.02515061490981026,0.028296026375870757,0.03144199739340585,0.03458859029047938,0.03773586744437859,0.0408838912865693,0.04403272430766292,0.04718242906238272,0.05033306817455339,0.05348470434209819,0.05663740034204025,0.059791219035531785,0.06294622337288694,0.06610247639863011,0.06926004125656819,0.07241898119487168,0.07557935957117298,0.07874123985769396,0.08190468564637826,0.08506976065405242,0.08823652872761226,0.09140505384921888,0.09457540014152849,0.09774763187294347,0.10092181346288474,0.10409800948709408,0.10727628468296306,0.11045670395488534,0.11363933237964427,0.11682423521182345,0.12001147788925233,0.12320112603848343,0.12639324548029762,0.1295879022352497,0.13278516252924188,0.13598509279913729,0.13918775969841016,0.14239323010282964,0.14560157111618596,0.14881285007605904,0.15202713455961722,0.1552444923894705,0.15846499163956293,0.16168870064110044,0.1649156879885395,0.16814602254560856,0.1713797734513843,0.17461701012641648,0.17785780227889833,0.181102219910892,0.1843503333246091,0.18760221312873374,0.1908579302448135,0.19411755591370233,0.19738116170205205,0.2006488195088779,0.20392060157217315,0.20719658047558534,0.21047682915516386,0.2137614209061632,0.21705042938991131,0.22034392864075605,0.22364199307306482,0.22694469748830273,0.23025211708218646,0.23356432745189798,0.23688140460338372,0.24020342495872707,0.2435304653635946,0.24686260309476563,0.2501999158677428,0.2535424818444406,0.2568903796409625,0.2602436883354637,0.2636024874760972,0.266966857089056,0.2703368776866992,0.27371263027577664,0.2770941963657476,0.280481657977192,0.2838750976503273,0.28727459845361925,0.2906802439924994,0.2940921184181884,0.2975103064366205,0.3009348933174823,0.3043659649033639,0.30780360761901293,0.3112479084807175,0.31469895510579965,0.318156835722227,0.3216216391783537,0.3250934549527785,0.32857237316433546,0.33205848458221393,0.33555188063620645,0.33905265342709556,0.3425608957371811,0.34607670104093535,0.3496001635158152,0.35313137805321554,0.3566704402695617,0.36021744651756926,0.36377249389764704,0.36733568026945695,0.3709071042636441,0.37448686529372077,0.3780750635681168,0.3816718001024125,0.3852771767317271,0.38889129612329476,0.39251426178922405,0.3961461780994279,0.39978715029475215,0.4034372845002926,0.407096687738902,0.4107654679449007,0.4144437339779894,0.4181315956373628,0.4218291636760421,0.42553654981541367,0.42925386675999183,0.4329812282124052,0.4367187488886047,0.4404665445333118,0.44422473193569567,0.4479934289452968,0.45177275448819654,0.4555628285834334,0.4593637723596794,0.46317570807218106,0.46699875911995364,0.470833050063263,0.4746787066413768,0.47853585579059593,0.48240462566258263,0.4862851456429744,0.4901775463703041,0.4940819597552262,0.4979985190000508,0.501927358618602,0.5058686144564036,0.5098224237111851,0.5137889249537421,0.5177682581491367,0.5217605646782426,0.5257659873596667,0.529784670472027,0.5338167597766063,0.5378624025403981,0.5419217475595359,0.5459949451831202,0.5500821473374665,0.5541835075507527,0.5582991809781013,0.5624293244271015,0.5665740963837581,0.5707336570389085,0.5749081683150967,0.5790977938939165,0.5833026992438417,0.5875230516485492,0.5917590202357397,0.5960107760064806,0.6002784918650671,0.6045623426494234,0.608862505162055,0.6131791582015522,0.6175124825946782,0.6218626612290304,0.626229879086308,0.6306143232761885,0.6350161830708246,0.639435649939984,0.6438729175868451,0.6483281819844453,0.6528016414128288,0.657293496496883,0.661803950244884,0.6663332080877814,0.6708814779192177,0.6754489701363174,0.680035897681255,0.6846424760836146,0.6892689235035713,0.6939154607759096,0.6985823114548806,0.7032697018599507,0.7079778611224375,0.7127070212330476,0.7174574170903724,0.7222292865503241,0.7270228704765542,0.7318384127918847,0.7366761605307561,0.7415363638927239,0.7464192762970483,0.7513251544383627,0.7562542583434827,0.7612068514293774,0.7661832005623034,0.7711835761181631,0.7762082520441113,0.7812575059214101,0.786331619029606,0.7914308764120335,0.7965555669426808,0.8017059833944653,0.8068824225089335,0.8120851850674382,0.8173145759638234,0.8225709042786463,0.8278544833549903,0.8331656308758999,0.8385046689434743,0.8438719241596766,0.8492677277088829,0.8546924154422321,0.8601463279638206,0.865629810718767,0.8711432140832343,0.8766868934564287,0.8822612093546328,0.8878665275073373,0.8935032189555182,0.8991716601521097,0.9048722330647477,0.9106053252808239,0.9163713301149281,0.9221706467187402,0.9280036801934157,0.9338708417045717,0.9397725485999125,0.9457092245295627,0.9516812995692143,0.9576892103461373,0.9637334001681229,0.9698143191554843,0.9759324243761508,0.9820881799839604,0.9882820573602635,0.9945145352588777,1.0007860999545337,1.0070972453949045,1.0134484733562836,1.019840293603057,1.0262732240510728,1.0327477909349785,1.0392645289796967,1.0458239815761237,1.0524267009611745,1.059073248402322,1.0657641943867322,1.072500118815157,1.0792816112007113,1.086109270872674,1.0929837071854762,1.0999055397330249,1.106875398568512,1.1138939244298964,1.120961768971203,1.1280795949998383,1.1352480767201036,1.1424678999830618,1.1497397625430135,1.1570643743207347,1.1644424576737036,1.1718747476735405,1.1793619923908834,1.1869049531879192,1.1945044050188385,1.2021611367384355,1.2098759514191375,1.2176496666767282,1.2254831150050158,1.233377144119788,1.2413326173123174,1.2493504138127165,1.2574314291635167,1.2655765756037656,1.2737867824639812,1.282062996572382,1.2904061826727016,1.2988173238540084,1.3072974219929607,1.3158474982088493,1.3244685933319287,1.333161768385475,1.3419281050820029,1.3507687063341807,1.3596846967809464,1.3686772233293074,1.3777474557124385,1.386896587064614,1.3961258345135674,1.4054364397909287,1.414829669861346,1.4243068175709988,1.4338692023161852,1.4435181707327078,1.4532550974068321,1.4630813856086062,1.4729984680483466,1.4830078076571878,1.4931108983925474,1.5033092660694791,1.51360446921888,1.5239980999735305,1.5344917849831017,1.5450871863591775,1.555786002651462,1.5665899698564005,1.5775008624594606,1.5885204945123794,1.5996507207467896,1.6108934377256205,1.622250585033817,1.633724146509942,1.6453161515202694,1.6570286762771653,1.6688638452035083,1.6808238323450162,1.6929108628325351,1.7051272143962999,1.717475218934317,1.7299572641372256,1.7425757951719534,1.7553333164266485,1.768232393319614,1.7812756541748516,1.794465792167212,1.8078055673401567,1.821297808699249,1.834945416384798,1.8487513639271496,1.8627187005882475,1.876850553793428,1.8911501316575128,1.9056207256094213,1.9202657131199172,1.935088560537192,1.9500928260352812,1.9652821626806418,1.9806603216223841,1.9962311554120746,2.011998621459264,2.0279667856292414,2.044139825989938,2.0605220367152084,2.077117832152153,2.0939317510606252,2.1109684610334294,2.128232763106303,2.1457295965672643,2.1634640439753743,2.1814413363997676,2.1996668588901995,2.2181461561911653,2.2368849387123735,2.2558890887690572,2.275164667106445,2.294717919723676,2.31455528501322,2.334683401233022,2.3551091143296023,2.375839486131425,2.396881802933248,2.418243584493327,2.4399325934668163,2.461956845300299,2.4843246186139223,2.507044466099384,2.5301252259639844,2.5535760339528752,2.57740633598391,2.601625901431822,2.6262448371009675,2.6512736019287066,2.6767230224643153,2.702604309171581,2.7289290736067557,2.755709346527099,2.782957596989384,2.8106867525021775,2.83891022030021,2.8676419098145196,2.8968962564175227,2.926688246528099,2.9570334441686104,2.987948019072661,3.019448776450283,3.051553188525768,3.0842794279725094,3.117646403379274,3.1516737968934865,3.186382104198933,3.221792676998601,3.257927768187736,3.2948105799179173,3.3324653147704635,3.3709172302762798,3.4101926970402907,3.450319260751694,3.4913257083864035,3.5332421389361177,3.5761000390294004,3.6199323638439296,3.6647736237470765,3.710659977143617,3.7576293300554675,3.805721443010156,3.8549780458714027,3.905442961308955,3.957162237675687,4.010184292138888,4.064560065000878,4.12034318624313,4.177590155438408,4.236360536299841,4.296717167275296,4.358726389752335,4.422458295616373,4.487986996104056,4.555390914120175,4.6247531024425275,4.6961615905293845,4.769709762974714,4.845496773032787,4.923627995062552,5.004215520233692,5.087378700398531,5.173244745679456,5.261949382065332,5.3536375761666095,5.4484643352695805,5.546595591977959,5.648209184062524,5.753495941691404,5.862660896025758,5.975924625285932,6.093524756883291,6.215717647144019,6.342780263612501,6.4750122990230565,6.612738550901459,6.756311606569754,6.906114880283119,7.062566057580409,7.226121012002649,7.397278271526769,7.5765841268816265,7.764638492008857,7.962101649121801,8.169702038160098,8.388245284303839,8.618624699367354,8.861833545664469,9.118979417375943,9.391301178604452,9.680189004584303,9.987208210206825,10.314127728013794,10.662954329651793,11.035973989195455,11.435802189891398,11.865445514658582,12.32837758777273,12.82863342665565,13.370927629907055,13.960803735805637,14.604824783154752,15.310818974060894,16.08819996844068,16.948389672770684,17.905383943345303,18.976520929504876,20.1835421190488,21.55408499534105,23.123827035696745,24.939638650187625,27.0643461317528,29.58415299706576,32.62062830640075,36.350915545690164,41.04358709468999,47.126369333522845,55.324537425594414,66.974124563167,84.83626600583594,115.6882937483857,181.7985843356545,424.20018919629615,-1272.6026630324427,-254.5192753394501,-141.39796761482236,-97.88912757117195,-74.8545427170721,-60.59463864667261,-50.89756857120906,-43.87526323825834,-38.555080909718065,-34.38498167838659,-31.028355843131948,-28.26827715064119,-25.95865240855287,-23.997492028494616,-22.3114350773152,-20.846362832747598,-19.56147810313893,-18.42544391422671,-17.413791668757938,-16.507137152461034,-15.689925130839184,-14.94952841275255,-14.275589863147264,-13.659534218949556,-13.094200692781364,-12.573562878762896,-12.092512679844997,-11.646691810776678,-11.232359088051236,-10.846284942428195,-10.485666854591638,-10.148061027161686,-9.831326768889893,-9.533580914789708,-9.253160231061074,-8.988590219177096,-8.738559083432222,-8.501895891636638,-8.277552161584767,-8.064586262330389,-7.862150140737901,-7.669477978717118,-7.485876461264576,-7.310716394603399,-7.143425460846657,-6.983481933368011,-6.830409207475837,-6.683771025605022,-6.54316729626683,-6.408230422365902,-6.2786220679266265,-6.154030303349299,-6.034167078483839,-5.918765980427439,-5.807580239307721,-5.7003809506325585,-5.596955487255774,-5.497106077774368,-5.400648531357077,-5.307411091703962,-5.217233405134793,-5.129965589762363,-5.045467394384178,-4.963607437163109,-4.884262515403859,-4.8073169787983465,-4.732662159433819,-4.6601958526551055,-4.589821843565439,-4.52144947455253,-4.454993249751691,-4.390372472817624,-4.327510914777179,-4.266336509088802,-4.206781071343692,-4.1487800413162725,-4.092272245312337,-4.0371996769756535,-3.983507294901644,-3.931142835573696,-3.880056640285602,-3.8302014948449816,-3.7815324809702227,-3.734006838397394,-3.6875838368075105,-3.6422246567677328,-3.597892278954829,-3.5545513809965525,-3.512168241326663,-3.4707106495033857,-3.430147822490124,-3.390450326441022,-3.351590003573567,-3.3135399037464777,-3.2762742203933923,-3.2397682304921553,-3.20399823827635,-3.1689415224195816,-3.1345762864451467,-3.1008816121336387,-3.067837415719081,-3.035424406680836,-3.003624048953635,-2.9724185243916796,-2.9417906983355646,-2.9117240871421126,-2.882202827547799,-2.8532116477461478,-2.8247358400681617,-2.796761235163173,-2.7692741775848293,-2.7422615026937303,-2.715710514794698,-2.6896089664323504,-2.663945038773936,-2.6387073230134885,-2.6138848027357646,-2.589466837182622,-2.565443145368505,-2.5418037909951106,-2.518539168118748,-2.4956399875269666,-2.4730972637837807,-2.450902302905548,-2.4290466906319983,-2.4075222812590913,-2.386321187002604,-2.3654357678632296,-2.3448586219658063,-2.324582576347041,-2.304600678167552,-2.2849061863256646,-2.2654925634516867,-2.2463534682626247,-2.227482748258606,-2.208874432743311,-2.1905227261517255,-2.172422001669587,-2.154566795129757,-2.1369517991715403,-2.119571857649909,-2.102421960282182,-2.085497237520493,-2.0687929556390476,-2.0523045120256884,-2.0360274306679584,-2.0199573578243655,-2.004090057871996,-1.9884214093221977,-1.972947400996429,-1.9576641283548015,-1.9425677899702893,-1.927654684141845,-1.912921205640135,-1.8983638425798612,-1.8839791734129259,-1.8697638640370742,-1.8557146650148544,-1.8418284088980097,-1.8281020076526566,-1.8145324501809017,-1.8011167999346298,-1.7878521926175617,-1.774735833971745,-1.7617649976448984,-1.7489370231352002,-1.7362493138102293,-1.72369933499697,-1.7112846121399352,-1.6990027290245784,-1.6868513260632922,-1.6748280986414816,-1.6629307955212214,-1.6511572173002118,-1.6395052149237717,-1.6279726882477812,-1.6165575846505507,-1.6052578976916505,-1.5940716658158938,-1.5829969711006986,-1.572031938045135,-1.5611747323990428,-1.5504235600307203,-1.5397766658316467,-1.5292323326568993,-1.518788880299859,-1.5084446644999454,-1.4981980759821576,-1.4880475395271986,-1.4779915130710832,-1.468028486833149,-1.458156982471402,-1.448375552264217,-1.4386827783174596,-1.429077271796063,-1.4195576721792422,-1.4101226465384522,-1.4007708888373085,-1.3915011192526998,-1.3823120835163225,-1.3732025522759526,-1.3641713204757453,-1.35521720675492,-1.3463390528641814,-1.3375357230992921,-1.3288061037511802,-1.3201491025720533,-1.3115636482569528,-1.3030486899402451,-1.294603196706543,-1.2862261571155742,-1.2779165787405475,-1.2696734877195537,-1.2614959283195888,-1.2533829625127744,-1.2453336695643944,-1.237347145632345,-1.2294225033776465,-1.2215588715856573,-1.2137553947976474,-1.2060112329523993,-1.1983255610375243,-1.1906975687501873,-1.1831264601669407,-1.1756114534223892,-1.1681517803964023,-1.160746686409625,-1.153395429927011,-1.1460972822691484,-1.138851527331135,-1.13165746130877,-1.1245143924318473,-1.117421640704326,-1.1103785376511872,-1.1033844260717593,-1.0964386597993365,-1.0895406034668869,-1.0826896322786885,-1.075885131787703,-1.0691264976785262,-1.062413135555758,-1.0557444607376234,-1.0491198980547014,-1.0425388816536079,-1.0360008548055017,-1.02950526971926,-1.0230515873592056,-1.016639277267246,-1.010267817389309,-1.0039366939059453,-0.9976454010669863,-0.9913934410301457,-0.9851803237034515,-0.9790055665914047,-0.9728686946447581,-0.9667692401138257,-0.960706742405213,-0.9546807479418866,-0.9486908100264827,-0.9427364887077786,-0.9368173506502286,-0.9309329690064916,-0.9250829232928692,-0.9192667992675738,-0.913484188811754,-0.9077346898132004,-0.9020179060526711,-0.8963334470927554,-0.8906809281692203,-0.8850599700847653,-0.8794701991051361,-0.8739112468575205,-0.8683827502311794,-0.8628843512802529,-0.8574156971286835,-0.851976439877204,-0.8465662365123358,-0.8411847488173534,-0.8358316432851555,-0.8305065910330034,-0.825209267719074,-0.8199393534607892,-0.8146965327548676,-0.8094804943990642,-0.8042909314155564,-0.7991275409759256,-0.7939900243277132,-0.7888780867224905,-0.783791437345428,-0.7787297892463093,-0.7736928592719676,-0.7686803680001003,-0.7636920396744398,-0.7587276021412366,-0.7537867867870297,-0.748869328477677,-0.7439749654986039,-0.7391034394962577,-0.734254495420722,-0.7294278814694798,-0.7246233490322862,-0.7198406526371333,-0.7150795498972744,-0.7103398014592928,-0.7056211709521786,-0.700923424937401,-0.6962463328599505,-0.6915896670003212,-0.686953202427427,-0.6823367169524117,-0.6777399910833518,-0.6731628079808155,-0.6686049534142703,-0.6640662157193115,-0.6595463857557022,-0.6550452568661971,-0.6505626248361387,-0.64609828785381,-0.6416520464715189,-0.6372237035674098,-0.632813064307974,-0.628419936111255,-0.6240441286107242,-0.6196854536198192,-0.6153437250971245,-0.6110187591121877,-0.6067103738119494,-0.6024183893877785,-0.5981426280431021,-0.5938829139616083,-0.5896390732760217,-0.5854109340374268,-0.5811983261851398,-0.5770010815171072,-0.572819033660825,-0.5686520180447674,-0.5644998718703147,-0.5603624340841651,-0.556239545351226,-0.552131048027975,-0.5480367861362726,-0.5439566053376301,-0.5398903529079093,-0.5358378777124586,-0.5317990301816644,-0.5277736622869178,-0.5237616275169841,-0.5197627808547685,-0.5157769787544683,-0.511804079119104,-0.5078439412784246,-0.5038964259671735,-0.4999613953037158,-0.4960387127690096,-0.4921282431859257,-0.48822985269889857,-0.48434340875390786,-0.4804687800787825,-0.4766058366638207,-0.47275444974271913,-0.46891449177380434,-0.4650858364215649,-0.4612683585384706,-0.45746193414708175,-0.45366644042243465,-0.4498817556747046,-0.4461077593321364,-0.44234433192423844,-0.43859135506523644,-0.4348487114377808,-0.4311162847769018,-0.42739395985420775,-0.4236816224623256,-0.41997915939957053,-0.4162864584548513,-0.41260340839279525,-0.40892989893909903,-0.4052658207660929,-0.40161106547851805,-0.39796552559951337,-0.3943290945568061,-0.3907016666691025,-0.38708313713267445,-0.3834734020081413,-0.37987235820743687,-0.3762799034809668,-0.3726959364049425,-0.3691203563688976,-0.3655530635633781,-0.36199395896780207,-0.3584429443384911,-0.35489992219686484,-0.35136479581779784,-0.34783746921813435,-0.34431784714536195,-0.34080583506643314,-0.33730133915674243,-0.33380426628924553,-0.33031452402372613,-0.32683202059620303,-0.3233566649084749,-0.3198883665178033,-0.316427035626728,-0.3129725830730138,-0.30952492031972406,-0.306083959445424,-0.3026496131345027,-0.2992217946676213,-0.2958004179122754,-0.29238539731347823,-0.2889766478845554,-0.2855740851980521,-0.28217762537675173,-0.27878718508480127,-0.2754026815189428,-0.2720240323998475,-0.26865115596355427,-0.2652839709530039,-0.2619223966096757,-0.25856635266531536,-0.2552157593337605,-0.25187053730285663,-0.24853060772646218,-0.24519589221654542,-0.2418663128353643,-0.2385417920877347,-0.23522225291337884,-0.23190761867935844,-0.22859781317258462,-0.22529276059240966,-0.2219923855432916,-0.21869661302753815,-0.21540536843812108,-0.21211857755156352,-0.20883616652089954,-0.2055580618686999,-0.20228419048016885,-0.19901447959630372,-0.19574885680712287,-0.19248725004495357,-0.18922958757778546,-0.1859757980026812,-0.18272581023924997,-0.17947955352317657,-0.17623695739980771,-0.17299795171779556,-0.16976246662279257,-0.16653043255120278,-0.16330178022398126,-0.1600764406404877,-0.15685434507238605,-0.15363542505759553,-0.15041961239428533,-0.14720683913491875,-0.14399703758033927,-0.14079014027390097,-0.13758607999564298,-0.13438478975650264,-0.13118620279257215,-0.12799025255939103,-0.1247968727262804,-0.12160599717071079,-0.11841755997270971,-0.11523149540930065,-0.11204773794897957,-0.10886622224622221,-0.10568688313602345,-0.1025096556284701,-0.09933447490334026,-0.0961612763047356,-0.09298999533573815,-0.08982056765309768,-0.08665292906194313,-0.08348701551051975,-0.0803227630849513,-0.07716010800402606,-0.07399898661400431,-0.07083933538344743,-0.06768109089806994,-0.06452418985560805,-0.061368569060711,-0.05821416541984661,-0.05506091593622777,-0.051908757704752825,-0.04875762790696178,-0.04560746380600807,-0.04245820274164409,-0.0393097821252187,-0.036162139434686665,-0.033015212209631516,-0.02986893804629545,-0.026723254592622352,-0.023578099543305923,-0.020433410634849068,-0.01728912564062804,-0.014145182365963025,-0.011001518643194994,-0.007858072326767093,-0.004714781288308859,-0.0015715834117230663,0.0015715834117230663,0.004714781288308859,0.007858072326767093,0.011001518643194994,0.014145182365963025,0.01728912564062804,0.020433410634849068,0.023578099543305923,0.026723254592622352,0.02986893804629545,0.033015212209631516,0.036162139434686665,0.0393097821252187,0.04245820274164409,0.04560746380600807,0.04875762790696178,0.051908757704752825,0.05506091593622777,0.05821416541984661,0.061368569060711,0.06452418985560805,0.06768109089806994,0.07083933538344743,0.07399898661400431,0.07716010800402606,0.0803227630849513,0.08348701551051975,0.08665292906194313,0.08982056765309768,0.09298999533573815,0.0961612763047356,0.09933447490334026,0.1025096556284701,0.10568688313602345,0.10886622224622221,0.11204773794897957,0.11523149540930065,0.11841755997270971,0.12160599717071079,0.1247968727262804,0.12799025255939103,0.13118620279257215,0.13438478975650264,0.13758607999564298,0.14079014027390097,0.14399703758033927,0.14720683913491875,0.15041961239428533,0.15363542505759553,0.15685434507238605,0.1600764406404877,0.16330178022398126,0.16653043255120278,0.16976246662279257,0.17299795171779556,0.17623695739980771,0.17947955352317657,0.18272581023924997,0.1859757980026812,0.18922958757778546,0.19248725004495357,0.19574885680712287,0.19901447959630372,0.20228419048016885,0.2055580618686999,0.20883616652089954,0.21211857755156352,0.21540536843812108,0.21869661302753815,0.2219923855432916,0.22529276059240966,0.22859781317258462,0.23190761867935844,0.23522225291337884,0.2385417920877347,0.2418663128353643,0.24519589221654542,0.24853060772646218,0.25187053730285663,0.2552157593337605,0.25856635266531536,0.2619223966096757,0.2652839709530039,0.26865115596355427,0.2720240323998475,0.2754026815189428,0.27878718508480127,0.28217762537675173,0.2855740851980521,0.2889766478845554,0.29238539731347823,0.2958004179122754,0.2992217946676213,0.3026496131345027,0.306083959445424,0.30952492031972406,0.3129725830730138,0.316427035626728,0.3198883665178033,0.3233566649084749,0.32683202059620303,0.33031452402372613,0.33380426628924553,0.33730133915674243,0.34080583506643314,0.34431784714536195,0.34783746921813435,0.35136479581779784,0.35489992219686484,0.3584429443384911,0.36199395896780207,0.3655530635633781,0.3691203563688976,0.3726959364049425,0.3762799034809668,0.37987235820743687,0.3834734020081413,0.38708313713267445,0.3907016666691025,0.3943290945568061,0.39796552559951337,0.40161106547851805,0.4052658207660929,0.40892989893909903,0.41260340839279525,0.4162864584548513,0.41997915939957053,0.4236816224623256,0.42739395985420775,0.4311162847769018,0.4348487114377808,0.43859135506523644,0.44234433192423844,0.4461077593321364,0.4498817556747046,0.45366644042243465,0.45746193414708175,0.4612683585384706,0.4650858364215649,0.46891449177380434,0.47275444974271913,0.4766058366638207,0.4804687800787825,0.48434340875390786,0.48822985269889857,0.4921282431859257,0.4960387127690096,0.4999613953037158,0.5038964259671735,0.5078439412784246,0.511804079119104,0.5157769787544683,0.5197627808547685,0.5237616275169841,0.5277736622869178,0.5317990301816644,0.5358378777124586,0.5398903529079093,0.5439566053376301,0.5480367861362726,0.552131048027975,0.556239545351226,0.5603624340841651,0.5644998718703147,0.5686520180447674,0.572819033660825,0.5770010815171072,0.5811983261851398,0.5854109340374268,0.5896390732760217,0.5938829139616083,0.5981426280431021,0.6024183893877785,0.6067103738119494,0.6110187591121877,0.6153437250971245,0.6196854536198192,0.6240441286107242,0.628419936111255,0.632813064307974,0.6372237035674098,0.6416520464715189,0.64609828785381,0.6505626248361387,0.6550452568661971,0.6595463857557022,0.6640662157193115,0.6686049534142703,0.6731628079808155,0.6777399910833518,0.6823367169524117,0.686953202427427,0.6915896670003212,0.6962463328599505,0.700923424937401,0.7056211709521786,0.7103398014592928,0.7150795498972744,0.7198406526371333,0.7246233490322862,0.7294278814694798,0.734254495420722,0.7391034394962577,0.7439749654986039,0.748869328477677,0.7537867867870297,0.7587276021412366,0.7636920396744398,0.7686803680001003,0.7736928592719676,0.7787297892463093,0.783791437345428,0.7888780867224905,0.7939900243277132,0.7991275409759256,0.8042909314155564,0.8094804943990642,0.8146965327548676,0.8199393534607892,0.825209267719074,0.8305065910330034,0.8358316432851555,0.8411847488173534,0.8465662365123358,0.851976439877204,0.8574156971286835,0.8628843512802529,0.8683827502311794,0.8739112468575205,0.8794701991051361,0.8850599700847653,0.8906809281692203,0.8963334470927554,0.9020179060526711,0.9077346898132004,0.913484188811754,0.9192667992675738,0.9250829232928692,0.9309329690064916,0.9368173506502286,0.9427364887077786,0.9486908100264827,0.9546807479418866,0.960706742405213,0.9667692401138257,0.9728686946447581,0.9790055665914047,0.9851803237034515,0.9913934410301457,0.9976454010669863,1.0039366939059453,1.010267817389309,1.016639277267246,1.0230515873592056,1.02950526971926,1.0360008548055017,1.0425388816536079,1.0491198980547014,1.0557444607376234,1.062413135555758,1.0691264976785262,1.075885131787703,1.0826896322786885,1.0895406034668869,1.0964386597993365,1.1033844260717593,1.1103785376511872,1.117421640704326,1.1245143924318473,1.13165746130877,1.138851527331135,1.1460972822691484,1.153395429927011,1.160746686409625,1.1681517803964023,1.1756114534223892,1.1831264601669407,1.1906975687501873,1.1983255610375243,1.2060112329523993,1.2137553947976474,1.2215588715856573,1.2294225033776465,1.237347145632345,1.2453336695643944,1.2533829625127744,1.2614959283195888,1.2696734877195537,1.2779165787405475,1.2862261571155742,1.294603196706543,1.3030486899402451,1.3115636482569528,1.3201491025720533,1.3288061037511802,1.3375357230992921,1.3463390528641814,1.35521720675492,1.3641713204757453,1.3732025522759526,1.3823120835163225,1.3915011192526998,1.4007708888373085,1.4101226465384522,1.4195576721792422,1.429077271796063,1.4386827783174596,1.448375552264217,1.458156982471402,1.468028486833149,1.4779915130710832,1.4880475395271986,1.4981980759821576,1.5084446644999454,1.518788880299859,1.5292323326568993,1.5397766658316467,1.5504235600307203,1.5611747323990428,1.572031938045135,1.5829969711006986,1.5940716658158938,1.6052578976916505,1.6165575846505507,1.6279726882477812,1.6395052149237717,1.6511572173002118,1.6629307955212214,1.6748280986414816,1.6868513260632922,1.6990027290245784,1.7112846121399352,1.72369933499697,1.7362493138102293,1.7489370231352002,1.7617649976448984,1.774735833971745,1.7878521926175617,1.8011167999346298,1.8145324501809017,1.8281020076526566,1.8418284088980097,1.8557146650148544,1.8697638640370742,1.8839791734129259,1.8983638425798612,1.912921205640135,1.927654684141845,1.9425677899702893,1.9576641283548015,1.972947400996429,1.9884214093221977,2.004090057871996,2.0199573578243655,2.0360274306679584,2.0523045120256884,2.0687929556390476,2.085497237520493,2.102421960282182,2.119571857649909,2.1369517991715403,2.154566795129757,2.172422001669587,2.1905227261517255,2.208874432743311,2.227482748258606,2.2463534682626247,2.2654925634516867,2.2849061863256646,2.304600678167552,2.324582576347041,2.3448586219658063,2.3654357678632296,2.386321187002604,2.4075222812590913,2.4290466906319983,2.450902302905548,2.4730972637837807,2.4956399875269666,2.518539168118748,2.5418037909951106,2.565443145368505,2.589466837182622,2.6138848027357646,2.6387073230134885,2.663945038773936,2.6896089664323504,2.715710514794698,2.7422615026937303,2.7692741775848293,2.796761235163173,2.8247358400681617,2.8532116477461478,2.882202827547799,2.9117240871421126,2.9417906983355646,2.9724185243916796,3.003624048953635,3.035424406680836,3.067837415719081,3.1008816121336387,3.1345762864451467,3.1689415224195816,3.20399823827635,3.2397682304921553,3.2762742203933923,3.3135399037464777,3.351590003573567,3.390450326441022,3.430147822490124,3.4707106495033857,3.512168241326663,3.5545513809965525,3.597892278954829,3.6422246567677328,3.6875838368075105,3.734006838397394,3.7815324809702227,3.8302014948449816,3.880056640285602,3.931142835573696,3.983507294901644,4.0371996769756535,4.092272245312337,4.1487800413162725,4.206781071343692,4.266336509088802,4.327510914777179,4.390372472817624,4.454993249751691,4.52144947455253,4.589821843565439,4.6601958526551055,4.732662159433819,4.8073169787983465,4.884262515403859,4.963607437163109,5.045467394384178,5.129965589762363,5.217233405134793,5.307411091703962,5.400648531357077,5.497106077774368,5.596955487255774,5.7003809506325585,5.807580239307721,5.918765980427439,6.034167078483839,6.154030303349299,6.2786220679266265,6.408230422365902,6.54316729626683,6.683771025605022,6.830409207475837,6.983481933368011,7.143425460846657,7.310716394603399,7.485876461264576,7.669477978717118,7.862150140737901,8.064586262330389,8.277552161584767,8.501895891636638,8.738559083432222,8.988590219177096,9.253160231061074,9.533580914789708,9.831326768889893,10.148061027161686,10.485666854591638,10.846284942428195,11.232359088051236,11.646691810776678,12.092512679844997,12.573562878762896,13.094200692781364,13.659534218949556,14.275589863147264,14.94952841275255,15.689925130839184,16.507137152461034,17.413791668757938,18.42544391422671,19.56147810313893,20.846362832747598,22.3114350773152,23.997492028494616,25.95865240855287,28.26827715064119,31.028355843131948,34.38498167838659,38.555080909718065,43.87526323825834,50.89756857120906,60.59463864667261,74.8545427170721,97.88912757117195,141.39796761482236,254.5192753394501,1272.6026630324427,-424.20018919629615,-181.7985843356545,-115.6882937483857,-84.83626600583594,-66.974124563167,-55.324537425594414,-47.126369333522845,-41.04358709468999,-36.350915545690164,-32.62062830640075,-29.58415299706576,-27.0643461317528,-24.939638650187625,-23.123827035696745,-21.55408499534105,-20.1835421190488,-18.976520929504876,-17.905383943345303,-16.948389672770684,-16.08819996844068,-15.310818974060894,-14.604824783154752,-13.960803735805637,-13.370927629907055,-12.82863342665565,-12.32837758777273,-11.865445514658582,-11.435802189891398,-11.035973989195455,-10.662954329651793,-10.314127728013794,-9.987208210206825,-9.680189004584303,-9.391301178604452,-9.118979417375943,-8.861833545664469,-8.618624699367354,-8.388245284303839,-8.169702038160098,-7.962101649121801,-7.764638492008857,-7.5765841268816265,-7.397278271526769,-7.226121012002649,-7.062566057580409,-6.906114880283119,-6.756311606569754,-6.612738550901459,-6.4750122990230565,-6.342780263612501,-6.215717647144019,-6.093524756883291,-5.975924625285932,-5.862660896025758,-5.753495941691404,-5.648209184062524,-5.546595591977959,-5.4484643352695805,-5.3536375761666095,-5.261949382065332,-5.173244745679456,-5.087378700398531,-5.004215520233692,-4.923627995062552,-4.845496773032787,-4.769709762974714,-4.6961615905293845,-4.6247531024425275,-4.555390914120175,-4.487986996104056,-4.422458295616373,-4.358726389752335,-4.296717167275296,-4.236360536299841,-4.177590155438408,-4.12034318624313,-4.064560065000878,-4.010184292138888,-3.957162237675687,-3.905442961308955,-3.8549780458714027,-3.805721443010156,-3.7576293300554675,-3.710659977143617,-3.6647736237470765,-3.6199323638439296,-3.5761000390294004,-3.5332421389361177,-3.4913257083864035,-3.450319260751694,-3.4101926970402907,-3.3709172302762798,-3.3324653147704635,-3.2948105799179173,-3.257927768187736,-3.221792676998601,-3.186382104198933,-3.1516737968934865,-3.117646403379274,-3.0842794279725094,-3.051553188525768,-3.019448776450283,-2.987948019072661,-2.9570334441686104,-2.926688246528099,-2.8968962564175227,-2.8676419098145196,-2.83891022030021,-2.8106867525021775,-2.782957596989384,-2.755709346527099,-2.7289290736067557,-2.702604309171581,-2.6767230224643153,-2.6512736019287066,-2.6262448371009675,-2.601625901431822,-2.57740633598391,-2.5535760339528752,-2.5301252259639844,-2.507044466099384,-2.4843246186139223,-2.461956845300299,-2.4399325934668163,-2.418243584493327,-2.396881802933248,-2.375839486131425,-2.3551091143296023,-2.334683401233022,-2.31455528501322,-2.294717919723676,-2.275164667106445,-2.2558890887690572,-2.2368849387123735,-2.2181461561911653,-2.1996668588901995,-2.1814413363997676,-2.1634640439753743,-2.1457295965672643,-2.128232763106303,-2.1109684610334294,-2.0939317510606252,-2.077117832152153,-2.0605220367152084,-2.044139825989938,-2.0279667856292414,-2.011998621459264,-1.9962311554120746,-1.9806603216223841,-1.9652821626806418,-1.9500928260352812,-1.935088560537192,-1.9202657131199172,-1.9056207256094213,-1.8911501316575128,-1.876850553793428,-1.8627187005882475,-1.8487513639271496,-1.834945416384798,-1.821297808699249,-1.8078055673401567,-1.794465792167212,-1.7812756541748516,-1.768232393319614,-1.7553333164266485,-1.7425757951719534,-1.7299572641372256,-1.717475218934317,-1.7051272143962999,-1.6929108628325351,-1.6808238323450162,-1.6688638452035083,-1.6570286762771653,-1.6453161515202694,-1.633724146509942,-1.622250585033817,-1.6108934377256205,-1.5996507207467896,-1.5885204945123794,-1.5775008624594606,-1.5665899698564005,-1.555786002651462,-1.5450871863591775,-1.5344917849831017,-1.5239980999735305,-1.51360446921888,-1.5033092660694791,-1.4931108983925474,-1.4830078076571878,-1.4729984680483466,-1.4630813856086062,-1.4532550974068321,-1.4435181707327078,-1.4338692023161852,-1.4243068175709988,-1.414829669861346,-1.4054364397909287,-1.3961258345135674,-1.386896587064614,-1.3777474557124385,-1.3686772233293074,-1.3596846967809464,-1.3507687063341807,-1.3419281050820029,-1.333161768385475,-1.3244685933319287,-1.3158474982088493,-1.3072974219929607,-1.2988173238540084,-1.2904061826727016,-1.282062996572382,-1.2737867824639812,-1.2655765756037656,-1.2574314291635167,-1.2493504138127165,-1.2413326173123174,-1.233377144119788,-1.2254831150050158,-1.2176496666767282,-1.2098759514191375,-1.2021611367384355,-1.1945044050188385,-1.1869049531879192,-1.1793619923908834,-1.1718747476735405,-1.1644424576737036,-1.1570643743207347,-1.1497397625430135,-1.1424678999830618,-1.1352480767201036,-1.1280795949998383,-1.120961768971203,-1.1138939244298964,-1.106875398568512,-1.0999055397330249,-1.0929837071854762,-1.086109270872674,-1.0792816112007113,-1.072500118815157,-1.0657641943867322,-1.059073248402322,-1.0524267009611745,-1.0458239815761237,-1.0392645289796967,-1.0327477909349785,-1.0262732240510728,-1.019840293603057,-1.0134484733562836,-1.0070972453949045,-1.0007860999545337,-0.9945145352588777,-0.9882820573602635,-0.9820881799839604,-0.9759324243761508,-0.9698143191554843,-0.9637334001681229,-0.9576892103461373,-0.9516812995692143,-0.9457092245295627,-0.9397725485999125,-0.9338708417045717,-0.9280036801934157,-0.9221706467187402,-0.9163713301149281,-0.9106053252808239,-0.9048722330647477,-0.8991716601521097,-0.8935032189555182,-0.8878665275073373,-0.8822612093546328,-0.8766868934564287,-0.8711432140832343,-0.865629810718767,-0.8601463279638206,-0.8546924154422321,-0.8492677277088829,-0.8438719241596766,-0.8385046689434743,-0.8331656308758999,-0.8278544833549903,-0.8225709042786463,-0.8173145759638234,-0.8120851850674382,-0.8068824225089335,-0.8017059833944653,-0.7965555669426808,-0.7914308764120335,-0.786331619029606,-0.7812575059214101,-0.7762082520441113,-0.7711835761181631,-0.7661832005623034,-0.7612068514293774,-0.7562542583434827,-0.7513251544383627,-0.7464192762970483,-0.7415363638927239,-0.7366761605307561,-0.7318384127918847,-0.7270228704765542,-0.7222292865503241,-0.7174574170903724,-0.7127070212330476,-0.7079778611224375,-0.7032697018599507,-0.6985823114548806,-0.6939154607759096,-0.6892689235035713,-0.6846424760836146,-0.680035897681255,-0.6754489701363174,-0.6708814779192177,-0.6663332080877814,-0.661803950244884,-0.657293496496883,-0.6528016414128288,-0.6483281819844453,-0.6438729175868451,-0.639435649939984,-0.6350161830708246,-0.6306143232761885,-0.626229879086308,-0.6218626612290304,-0.6175124825946782,-0.6131791582015522,-0.608862505162055,-0.6045623426494234,-0.6002784918650671,-0.5960107760064806,-0.5917590202357397,-0.5875230516485492,-0.5833026992438417,-0.5790977938939165,-0.5749081683150967,-0.5707336570389085,-0.5665740963837581,-0.5624293244271015,-0.5582991809781013,-0.5541835075507527,-0.5500821473374665,-0.5459949451831202,-0.5419217475595359,-0.5378624025403981,-0.5338167597766063,-0.529784670472027,-0.5257659873596667,-0.5217605646782426,-0.5177682581491367,-0.5137889249537421,-0.5098224237111851,-0.5058686144564036,-0.501927358618602,-0.4979985190000508,-0.4940819597552262,-0.4901775463703041,-0.4862851456429744,-0.48240462566258263,-0.47853585579059593,-0.4746787066413768,-0.470833050063263,-0.46699875911995364,-0.46317570807218106,-0.4593637723596794,-0.4555628285834334,-0.45177275448819654,-0.4479934289452968,-0.44422473193569567,-0.4404665445333118,-0.4367187488886047,-0.4329812282124052,-0.42925386675999183,-0.42553654981541367,-0.4218291636760421,-0.4181315956373628,-0.4144437339779894,-0.4107654679449007,-0.407096687738902,-0.4034372845002926,-0.39978715029475215,-0.3961461780994279,-0.39251426178922405,-0.38889129612329476,-0.3852771767317271,-0.3816718001024125,-0.3780750635681168,-0.37448686529372077,-0.3709071042636441,-0.36733568026945695,-0.36377249389764704,-0.36021744651756926,-0.3566704402695617,-0.35313137805321554,-0.3496001635158152,-0.34607670104093535,-0.3425608957371811,-0.33905265342709556,-0.33555188063620645,-0.33205848458221393,-0.32857237316433546,-0.3250934549527785,-0.3216216391783537,-0.318156835722227,-0.31469895510579965,-0.3112479084807175,-0.30780360761901293,-0.3043659649033639,-0.3009348933174823,-0.2975103064366205,-0.2940921184181884,-0.2906802439924994,-0.28727459845361925,-0.2838750976503273,-0.280481657977192,-0.2770941963657476,-0.27371263027577664,-0.2703368776866992,-0.266966857089056,-0.2636024874760972,-0.2602436883354637,-0.2568903796409625,-0.2535424818444406,-0.2501999158677428,-0.24686260309476563,-0.2435304653635946,-0.24020342495872707,-0.23688140460338372,-0.23356432745189798,-0.23025211708218646,-0.22694469748830273,-0.22364199307306482,-0.22034392864075605,-0.21705042938991131,-0.2137614209061632,-0.21047682915516386,-0.20719658047558534,-0.20392060157217315,-0.2006488195088779,-0.19738116170205205,-0.19411755591370233,-0.1908579302448135,-0.18760221312873374,-0.1843503333246091,-0.181102219910892,-0.17785780227889833,-0.17461701012641648,-0.1713797734513843,-0.16814602254560856,-0.1649156879885395,-0.16168870064110044,-0.15846499163956293,-0.1552444923894705,-0.15202713455961722,-0.14881285007605904,-0.14560157111618596,-0.14239323010282964,-0.13918775969841016,-0.13598509279913729,-0.13278516252924188,-0.1295879022352497,-0.12639324548029762,-0.12320112603848343,-0.12001147788925233,-0.11682423521182345,-0.11363933237964427,-0.11045670395488534,-0.10727628468296306,-0.10409800948709408,-0.10092181346288474,-0.09774763187294347,-0.09457540014152849,-0.09140505384921888,-0.08823652872761226,-0.08506976065405242,-0.08190468564637826,-0.07874123985769396,-0.07557935957117298,-0.07241898119487168,-0.06926004125656819,-0.06610247639863011,-0.06294622337288694,-0.059791219035531785,-0.05663740034204025,-0.05348470434209819,-0.05033306817455339,-0.04718242906238272,-0.04403272430766292,-0.0408838912865693,-0.03773586744437859,-0.03458859029047938,-0.03144199739340585,-0.028296026375870757,-0.02515061490981026,-0.022005700711440538,-0.018861221536317876,-0.015717115174404925,-0.01257331944514986,-0.009429772192557145,-0.006286411280277561,-0.0031431745866930603,-1.2246467991473532e-16],"x":[-3.141592653589793,-3.1384494893540853,-3.1353063251183784,-3.13216316088267,-3.1290199966469623,-3.1258768324112554,-3.122733668175547,-3.1195905039398397,-3.116447339704132,-3.113304175468424,-3.1101610112327167,-3.107017846997009,-3.103874682761301,-3.100731518525594,-3.097588354289886,-3.094445190054178,-3.091302025818471,-3.088158861582763,-3.0850156973470555,-3.081872533111348,-3.07872936887564,-3.0755862046399325,-3.072443040404225,-3.069299876168517,-3.06615671193281,-3.063013547697102,-3.059870383461394,-3.056727219225687,-3.053584054989979,-3.0504408907542713,-3.047297726518564,-3.044154562282856,-3.0410113980471483,-3.037868233811441,-3.034725069575733,-3.0315819053400257,-3.028438741104318,-3.02529557686861,-3.0221524126329027,-3.019009248397195,-3.0158660841614875,-3.0127229199257797,-3.009579755690072,-3.0064365914543645,-3.0032934272186567,-3.000150262982949,-2.997007098747242,-2.9938639345115337,-2.990720770275826,-2.987577606040119,-2.9844344418044106,-2.9812912775687033,-2.9781481133329955,-2.9750049490972876,-2.9718617848615803,-2.9687186206258724,-2.9655754563901646,-2.9624322921544577,-2.9592891279187494,-2.9561459636830416,-2.9530027994473347,-2.9498596352116264,-2.946716470975919,-2.9435733067402117,-2.9404301425045034,-2.937286978268796,-2.9341438140330887,-2.9310006497973804,-2.9278574855616735,-2.9247143213259656,-2.9215711570902574,-2.9184279928545505,-2.9152848286188426,-2.912141664383135,-2.9089985001474274,-2.9058553359117196,-2.902712171676012,-2.8995690074403044,-2.8964258432045966,-2.893282678968889,-2.8901395147331814,-2.8869963504974736,-2.8838531862617662,-2.8807100220260584,-2.8775668577903506,-2.8744236935546432,-2.8712805293189354,-2.868137365083228,-2.86499420084752,-2.8618510366118124,-2.858707872376105,-2.855564708140397,-2.8524215439046894,-2.8492783796689825,-2.846135215433274,-2.8429920511975664,-2.839848886961859,-2.836705722726151,-2.833562558490444,-2.830419394254736,-2.827276230019028,-2.824133065783321,-2.820989901547613,-2.817846737311905,-2.8147035730761982,-2.81156040884049,-2.808417244604782,-2.805274080369075,-2.802130916133367,-2.7989877518976596,-2.795844587661952,-2.792701423426244,-2.7895582591905366,-2.786415094954829,-2.783271930719121,-2.780128766483414,-2.776985602247706,-2.773842438011998,-2.770699273776291,-2.767556109540583,-2.7644129453048754,-2.761269781069168,-2.75812661683346,-2.7549834525977523,-2.751840288362045,-2.748697124126337,-2.74555395989063,-2.742410795654922,-2.739267631419214,-2.7361244671835068,-2.732981302947799,-2.7298381387120916,-2.7266949744763838,-2.723551810240676,-2.7204086460049686,-2.7172654817692607,-2.714122317533553,-2.710979153297846,-2.7078359890621377,-2.70469282482643,-2.7015496605907225,-2.6984064963550147,-2.6952633321193074,-2.6921201678835995,-2.6889770036478917,-2.6858338394121843,-2.6826906751764765,-2.6795475109407687,-2.6764043467050618,-2.6732611824693535,-2.6701180182336457,-2.6669748539979388,-2.6638316897622305,-2.660688525526523,-2.6575453612908158,-2.6544021970551075,-2.6512590328194,-2.6481158685836927,-2.6449727043479845,-2.6418295401122776,-2.6386863758765697,-2.6355432116408615,-2.6324000474051545,-2.6292568831694467,-2.626113718933739,-2.6229705546980315,-2.6198273904623237,-2.616684226226616,-2.6135410619909085,-2.6103978977552007,-2.6072547335194933,-2.6041115692837855,-2.6009684050480777,-2.5978252408123703,-2.5946820765766625,-2.591538912340955,-2.5883957481052473,-2.5852525838695395,-2.582109419633832,-2.5789662553981243,-2.5758230911624165,-2.5726799269267095,-2.5695367626910013,-2.5663935984552935,-2.563250434219586,-2.5601072699838783,-2.556964105748171,-2.553820941512463,-2.5506777772767553,-2.547534613041048,-2.54439144880534,-2.5412482845696323,-2.5381051203339253,-2.534961956098217,-2.5318187918625092,-2.5286756276268023,-2.525532463391094,-2.5223892991553867,-2.5192461349196793,-2.516102970683971,-2.5129598064482637,-2.5098166422125563,-2.506673477976848,-2.503530313741141,-2.5003871495054333,-2.497243985269725,-2.494100821034018,-2.4909576567983103,-2.487814492562602,-2.484671328326895,-2.4815281640911873,-2.4783849998554794,-2.475241835619772,-2.4720986713840643,-2.468955507148357,-2.465812342912649,-2.4626691786769412,-2.459526014441234,-2.456382850205526,-2.4532396859698182,-2.450096521734111,-2.446953357498403,-2.4438101932626957,-2.440667029026988,-2.43752386479128,-2.434380700555573,-2.431237536319865,-2.428094372084157,-2.4249512078484496,-2.421808043612742,-2.418664879377034,-2.4155217151413266,-2.412378550905619,-2.4092353866699114,-2.4060922224342036,-2.402949058198496,-2.399805893962789,-2.3966627297270806,-2.393519565491373,-2.390376401255666,-2.3872332370199576,-2.38409007278425,-2.380946908548543,-2.3778037443128346,-2.374660580077127,-2.37151741584142,-2.3683742516057116,-2.3652310873700046,-2.362087923134297,-2.3589447588985886,-2.3558015946628816,-2.352658430427174,-2.3495152661914656,-2.3463721019557586,-2.343228937720051,-2.340085773484343,-2.3369426092486356,-2.333799445012928,-2.3306562807772204,-2.3275131165415126,-2.324369952305805,-2.3212267880700974,-2.3180836238343896,-2.3149404595986818,-2.3117972953629744,-2.3086541311272666,-2.305510966891559,-2.3023678026558514,-2.2992246384201436,-2.2960814741844366,-2.2929383099487284,-2.2897951457130206,-2.286651981477313,-2.2835088172416054,-2.2803656530058976,-2.27722248877019,-2.2740793245344824,-2.270936160298775,-2.267792996063067,-2.2646498318273593,-2.2615066675916524,-2.258363503355944,-2.2552203391202363,-2.2520771748845294,-2.248934010648821,-2.2457908464131133,-2.2426476821774064,-2.239504517941698,-2.2363613537059908,-2.2332181894702834,-2.230075025234575,-2.226931860998868,-2.2237886967631604,-2.220645532527452,-2.217502368291745,-2.2143592040560374,-2.211216039820329,-2.208072875584622,-2.2049297113489144,-2.2017865471132065,-2.198643382877499,-2.1955002186417913,-2.192357054406084,-2.189213890170376,-2.1860707259346683,-2.182927561698961,-2.179784397463253,-2.1766412332275453,-2.173498068991838,-2.17035490475613,-2.1672117405204228,-2.164068576284715,-2.160925412049007,-2.1577822478133,-2.154639083577592,-2.151495919341884,-2.1483527551061767,-2.145209590870469,-2.142066426634761,-2.1389232623990537,-2.135780098163346,-2.1326369339276385,-2.1294937696919307,-2.126350605456223,-2.123207441220516,-2.1200642769848077,-2.1169211127491,-2.113777948513393,-2.1106347842776847,-2.107491620041977,-2.10434845580627,-2.1012052915705617,-2.098062127334854,-2.094918963099147,-2.0917757988634387,-2.0886326346277317,-2.085489470392024,-2.0823463061563157,-2.0792031419206087,-2.076059977684901,-2.0729168134491927,-2.0697736492134857,-2.066630484977778,-2.0634873207420696,-2.0603441565063627,-2.057200992270655,-2.054057828034947,-2.0509146637992397,-2.047771499563532,-2.0446283353278245,-2.0414851710921167,-2.038342006856409,-2.0351988426207015,-2.0320556783849937,-2.028912514149286,-2.0257693499135785,-2.0226261856778707,-2.0194830214421633,-2.0163398572064555,-2.0131966929707477,-2.0100535287350407,-2.0069103644993325,-2.0037672002636246,-2.0006240360279173,-1.9974808717922095,-1.9943377075565019,-1.9911945433207945,-1.9880513790850864,-1.984908214849379,-1.9817650506136715,-1.9786218863779637,-1.9754787221422565,-1.9723355579065485,-1.9691923936708406,-1.9660492294351333,-1.9629060651994255,-1.9597629009637176,-1.9566197367280103,-1.9534765724923024,-1.9503334082565948,-1.9471902440208873,-1.9440470797851797,-1.9409039155494723,-1.9377607513137642,-1.9346175870780566,-1.9314744228423493,-1.9283312586066412,-1.9251880943709336,-1.9220449301352263,-1.9189017658995182,-1.9157586016638108,-1.9126154374281032,-1.9094722731923954,-1.9063291089566883,-1.9031859447209802,-1.9000427804852724,-1.896899616249565,-1.8937564520138572,-1.8906132877781494,-1.887470123542442,-1.8843269593067342,-1.8811837950710266,-1.878040630835319,-1.8748974665996114,-1.871754302363904,-1.868611138128196,-1.8654679738924884,-1.862324809656781,-1.859181645421073,-1.8560384811853654,-1.852895316949658,-1.84975215271395,-1.8466089884782426,-1.843465824242535,-1.8403226600068272,-1.83717949577112,-1.834036331535412,-1.8308931672997042,-1.8277500030639968,-1.824606838828289,-1.8214636745925812,-1.8183205103568738,-1.815177346121166,-1.8120341818854584,-1.8088910176497508,-1.8057478534140432,-1.8026046891783358,-1.7994615249426278,-1.7963183607069202,-1.7931751964712128,-1.7900320322355048,-1.7868888679997972,-1.7837457037640898,-1.7806025395283818,-1.7774593752926744,-1.7743162110569668,-1.771173046821259,-1.7680298825855518,-1.7648867183498438,-1.761743554114136,-1.7586003898784286,-1.7554572256427208,-1.752314061407013,-1.7491708971713056,-1.7460277329355978,-1.7428845686998902,-1.7397414044641826,-1.736598240228475,-1.7334550759927676,-1.7303119117570596,-1.727168747521352,-1.7240255832856446,-1.7208824190499366,-1.717739254814229,-1.7145960905785216,-1.7114529263428135,-1.7083097621071062,-1.7051665978713986,-1.7020234336356908,-1.6988802693999836,-1.6957371051642756,-1.6925939409285677,-1.6894507766928604,-1.6863076124571525,-1.6831644482214447,-1.6800212839857374,-1.6768781197500295,-1.673734955514322,-1.6705917912786143,-1.6674486270429068,-1.6643054628071994,-1.6611622985714913,-1.6580191343357837,-1.6548759701000764,-1.6517328058643683,-1.6485896416286607,-1.6454464773929534,-1.6423033131572453,-1.639160148921538,-1.6360169846858303,-1.6328738204501225,-1.6297306562144154,-1.6265874919787073,-1.6234443277429995,-1.6203011635072921,-1.6171579992715843,-1.6140148350358765,-1.6108716708001691,-1.6077285065644613,-1.6045853423287537,-1.6014421780930461,-1.5982990138573383,-1.5951558496216312,-1.592012685385923,-1.5888695211502155,-1.5857263569145081,-1.5825831926788,-1.5794400284430925,-1.5762968642073851,-1.573153699971677,-1.5700105357359697,-1.5668673715002621,-1.563724207264554,-1.5605810430288471,-1.557437878793139,-1.5542947145574313,-1.551151550321724,-1.548008386086016,-1.5448652218503083,-1.541722057614601,-1.538578893378893,-1.5354357291431855,-1.532292564907478,-1.52914940067177,-1.526006236436063,-1.5228630722003549,-1.5197199079646473,-1.51657674372894,-1.5134335794932319,-1.5102904152575243,-1.507147251021817,-1.5040040867861089,-1.5008609225504015,-1.497717758314694,-1.4945745940789859,-1.491431429843279,-1.4882882656075709,-1.485145101371863,-1.4820019371361557,-1.4788587729004479,-1.47571560866474,-1.4725724444290327,-1.4694292801933249,-1.4662861159576173,-1.4631429517219097,-1.4599997874862018,-1.4568566232504947,-1.4537134590147867,-1.450570294779079,-1.4474271305433717,-1.4442839663076636,-1.441140802071956,-1.4379976378362487,-1.4348544736005406,-1.431711309364833,-1.4285681451291257,-1.4254249808934176,-1.4222818166577107,-1.4191386524220027,-1.4159954881862948,-1.4128523239505875,-1.4097091597148796,-1.4065659954791718,-1.4034228312434645,-1.4002796670077566,-1.3971365027720488,-1.3939933385363414,-1.3908501743006336,-1.3877070100649265,-1.3845638458292184,-1.3814206815935108,-1.3782775173578035,-1.3751343531220954,-1.3719911888863878,-1.3688480246506805,-1.3657048604149724,-1.3625616961792648,-1.3594185319435574,-1.3562753677078494,-1.3531322034721425,-1.3499890392364344,-1.3468458750007266,-1.3437027107650192,-1.3405595465293114,-1.3374163822936036,-1.3342732180578962,-1.3311300538221884,-1.3279868895864806,-1.3248437253507732,-1.3217005611150654,-1.3185573968793582,-1.3154142326436502,-1.3122710684079426,-1.3091279041722352,-1.3059847399365272,-1.3028415757008196,-1.2996984114651122,-1.2965552472294042,-1.2934120829936966,-1.2902689187579892,-1.2871257545222812,-1.2839825902865736,-1.2808394260508662,-1.2776962618151584,-1.274553097579451,-1.2714099333437432,-1.2682667691080354,-1.265123604872328,-1.2619804406366202,-1.2588372764009124,-1.255694112165205,-1.2525509479294972,-1.2494077836937896,-1.246264619458082,-1.2431214552223744,-1.239978290986667,-1.236835126750959,-1.2336919625152514,-1.230548798279544,-1.227405634043836,-1.2242624698081284,-1.221119305572421,-1.217976141336713,-1.2148329771010054,-1.211689812865298,-1.2085466486295902,-1.2054034843938828,-1.202260320158175,-1.1991171559224671,-1.1959739916867598,-1.192830827451052,-1.1896876632153441,-1.1865444989796368,-1.183401334743929,-1.1802581705082213,-1.1771150062725138,-1.1739718420368062,-1.1708286778010988,-1.1676855135653907,-1.1645423493296831,-1.1613991850939758,-1.1582560208582677,-1.1551128566225601,-1.1519696923868528,-1.1488265281511447,-1.1456833639154371,-1.1425401996797298,-1.139397035444022,-1.1362538712083146,-1.1331107069726067,-1.129967542736899,-1.1268243785011915,-1.1236812142654837,-1.120538050029776,-1.1173948857940685,-1.1142517215583607,-1.1111085573226531,-1.1079653930869455,-1.104822228851238,-1.1016790646155306,-1.0985359003798225,-1.095392736144115,-1.0922495719084075,-1.0891064076726995,-1.085963243436992,-1.0828200792012845,-1.0796769149655767,-1.0765337507298687,-1.0733905864941615,-1.0702474222584537,-1.0671042580227463,-1.0639610937870385,-1.0608179295513307,-1.0576747653156233,-1.0545316010799155,-1.0513884368442077,-1.0482452726085003,-1.0451021083727927,-1.0419589441370847,-1.0388157799013773,-1.0356726156656697,-1.0325294514299623,-1.0293862871942543,-1.0262431229585467,-1.0230999587228393,-1.0199567944871313,-1.0168136302514237,-1.0136704660157163,-1.0105273017800085,-1.0073841375443005,-1.0042409733085933,-1.0010978090728855,-0.9979546448371782,-0.9948114806014703,-0.9916683163657625,-0.9885251521300552,-0.9853819878943472,-0.9822388236586395,-0.9790956594229322,-0.9759524951872244,-0.9728093309515164,-0.9696661667158092,-0.9665230024801014,-0.9633798382443941,-0.9602366740086862,-0.9570935097729784,-0.9539503455372709,-0.950807181301563,-0.9476640170658556,-0.9445208528301479,-0.9413776885944403,-0.9382345243587326,-0.9350913601230251,-0.9319481958873173,-0.9288050316516098,-0.9256618674159021,-0.9225187031801945,-0.9193755389444868,-0.9162323747087789,-0.9130892104730715,-0.9099460462373637,-0.9068028820016562,-0.9036597177659484,-0.900516553530241,-0.8973733892945331,-0.8942302250588254,-0.891087060823118,-0.8879438965874104,-0.8848007323517026,-0.8816575681159948,-0.8785144038802873,-0.8753712396445796,-0.872228075408872,-0.8690849111731643,-0.8659417469374568,-0.862798582701749,-0.8596554184660413,-0.8565122542303338,-0.8533690899946262,-0.8502259257589185,-0.8470827615232107,-0.8439395972875032,-0.8407964330517955,-0.8376532688160879,-0.8345101045803802,-0.8313669403446727,-0.8282237761089649,-0.8250806118732572,-0.8219374476375497,-0.8187942834018421,-0.8156511191661344,-0.8125079549304266,-0.8093647906947191,-0.8062216264590114,-0.8030784622233038,-0.7999352979875961,-0.7967921337518886,-0.7936489695161808,-0.7905058052804731,-0.7873626410447656,-0.784219476809058,-0.7810763125733503,-0.7779331483376425,-0.774789984101935,-0.7716468198662273,-0.7685036556305197,-0.765360491394812,-0.7622173271591045,-0.7590741629233967,-0.755930998687689,-0.7527878344519815,-0.7496446702162739,-0.7465015059805662,-0.7433583417448584,-0.7402151775091509,-0.7370720132734432,-0.7339288490377356,-0.7307856848020279,-0.7276425205663204,-0.7244993563306126,-0.7213561920949049,-0.7182130278591974,-0.7150698636234898,-0.7119266993877821,-0.7087835351520743,-0.7056403709163668,-0.7024972066806591,-0.6993540424449515,-0.6962108782092438,-0.6930677139735363,-0.6899245497378285,-0.6867813855021208,-0.6836382212664133,-0.6804950570307055,-0.677351892794998,-0.6742087285592901,-0.6710655643235827,-0.667922400087875,-0.6647792358521674,-0.6616360716164597,-0.6584929073807522,-0.6553497431450444,-0.6522065789093366,-0.6490634146736292,-0.6459202504379213,-0.6427770862022139,-0.639633921966506,-0.6364907577307986,-0.6333475934950908,-0.6302044292593832,-0.6270612650236755,-0.623918100787968,-0.6207749365522602,-0.6176317723165525,-0.614488608080845,-0.6113454438451372,-0.6082022796094297,-0.6050591153737219,-0.6019159511380144,-0.5987727869023067,-0.5956296226665991,-0.5924864584308914,-0.5893432941951839,-0.5862001299594761,-0.5830569657237684,-0.5799138014880609,-0.5767706372523531,-0.5736274730166456,-0.5704843087809378,-0.5673411445452303,-0.5641979803095226,-0.561054816073815,-0.5579116518381073,-0.5547684876023998,-0.551625323366692,-0.5484821591309843,-0.5453389948952768,-0.542195830659569,-0.5390526664238615,-0.5359095021881537,-0.5327663379524462,-0.5296231737167385,-0.5264800094810307,-0.5233368452453232,-0.5201936810096157,-0.5170505167739079,-0.5139073525382002,-0.5107641883024927,-0.5076210240667849,-0.5044778598310774,-0.5013346955953696,-0.4981915313596621,-0.49504836712395434,-0.49190520288824663,-0.4887620386525391,-0.48561887441683155,-0.48247571018112384,-0.4793325459454161,-0.47618938170970854,-0.4730462174740008,-0.4699030532382933,-0.4667598890025855,-0.463616724766878,-0.4604735605311702,-0.4573303962954625,-0.454187232059755,-0.45104406782404743,-0.4479009035883397,-0.44475773935263196,-0.4416145751169244,-0.43847141088121666,-0.4353282466455092,-0.4321850824098014,-0.4290419181740939,-0.4258987539383861,-0.4227555897026784,-0.41961242546697086,-0.4164692612312633,-0.4133260969955556,-0.41018293275984785,-0.4070397685241403,-0.40389660428843255,-0.40075344005272506,-0.3976102758170173,-0.39446711158130976,-0.391323947345602,-0.3881807831098943,-0.38503761887418675,-0.3818944546384792,-0.3787512904027715,-0.37560812616706374,-0.3724649619313562,-0.36932179769564843,-0.36617863345994095,-0.3630354692242332,-0.35989230498852565,-0.35674914075281794,-0.3536059765171102,-0.35046281228140264,-0.3473196480456951,-0.3441764838099874,-0.3410333195742796,-0.3378901553385721,-0.3347469911028643,-0.33160382686715684,-0.3284606626314491,-0.32531749839574153,-0.3221743341600338,-0.31903116992432606,-0.3158880056886185,-0.312744841452911,-0.3096016772172033,-0.3064585129814955,-0.30331534874578797,-0.3001721845100802,-0.2970290202743727,-0.29388585603866496,-0.2907426918029574,-0.2875995275672497,-0.28445636333154195,-0.2813131990958344,-0.27817003486012687,-0.27502687062441916,-0.2718837063887114,-0.26874054215300386,-0.2655973779172961,-0.2624542136815886,-0.25931104944588085,-0.2561678852101733,-0.2530247209744656,-0.2498815567387578,-0.2467383925030503,-0.24359522826734256,-0.24045206403163502,-0.23730889979592729,-0.23416573556021975,-0.231022571324512,-0.22787940708880447,-0.22473624285309673,-0.22159307861738922,-0.21844991438168146,-0.21530675014597372,-0.21216358591026618,-0.20902042167455845,-0.2058772574388509,-0.20273409320314317,-0.19959092896743563,-0.1964477647317279,-0.19330460049602036,-0.19016143626031262,-0.1870182720246051,-0.18387510778889735,-0.1807319435531896,-0.17758877931748207,-0.17444561508177434,-0.1713024508460668,-0.16815928661035906,-0.16501612237465152,-0.16187295813894378,-0.15872979390323624,-0.1555866296675285,-0.152443465431821,-0.14930030119611323,-0.1461571369604055,-0.14301397272469796,-0.13987080848899022,-0.13672764425328268,-0.13358448001757495,-0.1304413157818674,-0.12729815154615967,-0.12415498731045214,-0.1210118230747444,-0.11786865883903687,-0.11472549460332912,-0.11158233036762137,-0.10843916613191384,-0.1052960018962061,-0.10215283766049858,-0.09900967342479083,-0.09586650918908331,-0.09272334495337556,-0.08958018071766781,-0.08643701648196028,-0.08329385224625276,-0.08015068801054501,-0.07700752377483726,-0.07386435953912973,-0.07072119530342198,-0.06757803106771447,-0.06443486683200672,-0.061291702596299194,-0.05814853836059144,-0.05500537412488369,-0.05186220988917617,-0.04871904565346865,-0.045575881417760894,-0.042432717182053145,-0.039289552946345625,-0.036146388710637876,-0.03300322447493035,-0.0298600602392226,-0.026716896003515078,-0.02357373176780733,-0.02043056753209958,-0.017287403296392057,-0.014144239060684533,-0.011001074824976784,-0.007857910589269034,-0.004714746353561511,-0.0015715821178537612,0.0015715821178537612,0.004714746353561511,0.007857910589269034,0.011001074824976784,0.014144239060684533,0.017287403296392057,0.02043056753209958,0.02357373176780733,0.026716896003515078,0.0298600602392226,0.03300322447493035,0.036146388710637876,0.039289552946345625,0.042432717182053145,0.045575881417760894,0.04871904565346865,0.05186220988917617,0.05500537412488369,0.05814853836059144,0.061291702596299194,0.06443486683200672,0.06757803106771447,0.07072119530342198,0.07386435953912973,0.07700752377483726,0.08015068801054501,0.08329385224625276,0.08643701648196028,0.08958018071766781,0.09272334495337556,0.09586650918908331,0.09900967342479083,0.10215283766049858,0.1052960018962061,0.10843916613191384,0.11158233036762137,0.11472549460332912,0.11786865883903687,0.1210118230747444,0.12415498731045214,0.12729815154615967,0.1304413157818674,0.13358448001757495,0.13672764425328268,0.13987080848899022,0.14301397272469796,0.1461571369604055,0.14930030119611323,0.152443465431821,0.1555866296675285,0.15872979390323624,0.16187295813894378,0.16501612237465152,0.16815928661035906,0.1713024508460668,0.17444561508177434,0.17758877931748207,0.1807319435531896,0.18387510778889735,0.1870182720246051,0.19016143626031262,0.19330460049602036,0.1964477647317279,0.19959092896743563,0.20273409320314317,0.2058772574388509,0.20902042167455845,0.21216358591026618,0.21530675014597372,0.21844991438168146,0.22159307861738922,0.22473624285309673,0.22787940708880447,0.231022571324512,0.23416573556021975,0.23730889979592729,0.24045206403163502,0.24359522826734256,0.2467383925030503,0.2498815567387578,0.2530247209744656,0.2561678852101733,0.25931104944588085,0.2624542136815886,0.2655973779172961,0.26874054215300386,0.2718837063887114,0.27502687062441916,0.27817003486012687,0.2813131990958344,0.28445636333154195,0.2875995275672497,0.2907426918029574,0.29388585603866496,0.2970290202743727,0.3001721845100802,0.30331534874578797,0.3064585129814955,0.3096016772172033,0.312744841452911,0.3158880056886185,0.31903116992432606,0.3221743341600338,0.32531749839574153,0.3284606626314491,0.33160382686715684,0.3347469911028643,0.3378901553385721,0.3410333195742796,0.3441764838099874,0.3473196480456951,0.35046281228140264,0.3536059765171102,0.35674914075281794,0.35989230498852565,0.3630354692242332,0.36617863345994095,0.36932179769564843,0.3724649619313562,0.37560812616706374,0.3787512904027715,0.3818944546384792,0.38503761887418675,0.3881807831098943,0.391323947345602,0.39446711158130976,0.3976102758170173,0.40075344005272506,0.40389660428843255,0.4070397685241403,0.41018293275984785,0.4133260969955556,0.4164692612312633,0.41961242546697086,0.4227555897026784,0.4258987539383861,0.4290419181740939,0.4321850824098014,0.4353282466455092,0.43847141088121666,0.4416145751169244,0.44475773935263196,0.4479009035883397,0.45104406782404743,0.454187232059755,0.4573303962954625,0.4604735605311702,0.463616724766878,0.4667598890025855,0.4699030532382933,0.4730462174740008,0.47618938170970854,0.4793325459454161,0.48247571018112384,0.48561887441683155,0.4887620386525391,0.49190520288824663,0.49504836712395434,0.4981915313596621,0.5013346955953696,0.5044778598310774,0.5076210240667849,0.5107641883024927,0.5139073525382002,0.5170505167739079,0.5201936810096157,0.5233368452453232,0.5264800094810307,0.5296231737167385,0.5327663379524462,0.5359095021881537,0.5390526664238615,0.542195830659569,0.5453389948952768,0.5484821591309843,0.551625323366692,0.5547684876023998,0.5579116518381073,0.561054816073815,0.5641979803095226,0.5673411445452303,0.5704843087809378,0.5736274730166456,0.5767706372523531,0.5799138014880609,0.5830569657237684,0.5862001299594761,0.5893432941951839,0.5924864584308914,0.5956296226665991,0.5987727869023067,0.6019159511380144,0.6050591153737219,0.6082022796094297,0.6113454438451372,0.614488608080845,0.6176317723165525,0.6207749365522602,0.623918100787968,0.6270612650236755,0.6302044292593832,0.6333475934950908,0.6364907577307986,0.639633921966506,0.6427770862022139,0.6459202504379213,0.6490634146736292,0.6522065789093366,0.6553497431450444,0.6584929073807522,0.6616360716164597,0.6647792358521674,0.667922400087875,0.6710655643235827,0.6742087285592901,0.677351892794998,0.6804950570307055,0.6836382212664133,0.6867813855021208,0.6899245497378285,0.6930677139735363,0.6962108782092438,0.6993540424449515,0.7024972066806591,0.7056403709163668,0.7087835351520743,0.7119266993877821,0.7150698636234898,0.7182130278591974,0.7213561920949049,0.7244993563306126,0.7276425205663204,0.7307856848020279,0.7339288490377356,0.7370720132734432,0.7402151775091509,0.7433583417448584,0.7465015059805662,0.7496446702162739,0.7527878344519815,0.755930998687689,0.7590741629233967,0.7622173271591045,0.765360491394812,0.7685036556305197,0.7716468198662273,0.774789984101935,0.7779331483376425,0.7810763125733503,0.784219476809058,0.7873626410447656,0.7905058052804731,0.7936489695161808,0.7967921337518886,0.7999352979875961,0.8030784622233038,0.8062216264590114,0.8093647906947191,0.8125079549304266,0.8156511191661344,0.8187942834018421,0.8219374476375497,0.8250806118732572,0.8282237761089649,0.8313669403446727,0.8345101045803802,0.8376532688160879,0.8407964330517955,0.8439395972875032,0.8470827615232107,0.8502259257589185,0.8533690899946262,0.8565122542303338,0.8596554184660413,0.862798582701749,0.8659417469374568,0.8690849111731643,0.872228075408872,0.8753712396445796,0.8785144038802873,0.8816575681159948,0.8848007323517026,0.8879438965874104,0.891087060823118,0.8942302250588254,0.8973733892945331,0.900516553530241,0.9036597177659484,0.9068028820016562,0.9099460462373637,0.9130892104730715,0.9162323747087789,0.9193755389444868,0.9225187031801945,0.9256618674159021,0.9288050316516098,0.9319481958873173,0.9350913601230251,0.9382345243587326,0.9413776885944403,0.9445208528301479,0.9476640170658556,0.950807181301563,0.9539503455372709,0.9570935097729784,0.9602366740086862,0.9633798382443941,0.9665230024801014,0.9696661667158092,0.9728093309515164,0.9759524951872244,0.9790956594229322,0.9822388236586395,0.9853819878943472,0.9885251521300552,0.9916683163657625,0.9948114806014703,0.9979546448371782,1.0010978090728855,1.0042409733085933,1.0073841375443005,1.0105273017800085,1.0136704660157163,1.0168136302514237,1.0199567944871313,1.0230999587228393,1.0262431229585467,1.0293862871942543,1.0325294514299623,1.0356726156656697,1.0388157799013773,1.0419589441370847,1.0451021083727927,1.0482452726085003,1.0513884368442077,1.0545316010799155,1.0576747653156233,1.0608179295513307,1.0639610937870385,1.0671042580227463,1.0702474222584537,1.0733905864941615,1.0765337507298687,1.0796769149655767,1.0828200792012845,1.085963243436992,1.0891064076726995,1.0922495719084075,1.095392736144115,1.0985359003798225,1.1016790646155306,1.104822228851238,1.1079653930869455,1.1111085573226531,1.1142517215583607,1.1173948857940685,1.120538050029776,1.1236812142654837,1.1268243785011915,1.129967542736899,1.1331107069726067,1.1362538712083146,1.139397035444022,1.1425401996797298,1.1456833639154371,1.1488265281511447,1.1519696923868528,1.1551128566225601,1.1582560208582677,1.1613991850939758,1.1645423493296831,1.1676855135653907,1.1708286778010988,1.1739718420368062,1.1771150062725138,1.1802581705082213,1.183401334743929,1.1865444989796368,1.1896876632153441,1.192830827451052,1.1959739916867598,1.1991171559224671,1.202260320158175,1.2054034843938828,1.2085466486295902,1.211689812865298,1.2148329771010054,1.217976141336713,1.221119305572421,1.2242624698081284,1.227405634043836,1.230548798279544,1.2336919625152514,1.236835126750959,1.239978290986667,1.2431214552223744,1.246264619458082,1.2494077836937896,1.2525509479294972,1.255694112165205,1.2588372764009124,1.2619804406366202,1.265123604872328,1.2682667691080354,1.2714099333437432,1.274553097579451,1.2776962618151584,1.2808394260508662,1.2839825902865736,1.2871257545222812,1.2902689187579892,1.2934120829936966,1.2965552472294042,1.2996984114651122,1.3028415757008196,1.3059847399365272,1.3091279041722352,1.3122710684079426,1.3154142326436502,1.3185573968793582,1.3217005611150654,1.3248437253507732,1.3279868895864806,1.3311300538221884,1.3342732180578962,1.3374163822936036,1.3405595465293114,1.3437027107650192,1.3468458750007266,1.3499890392364344,1.3531322034721425,1.3562753677078494,1.3594185319435574,1.3625616961792648,1.3657048604149724,1.3688480246506805,1.3719911888863878,1.3751343531220954,1.3782775173578035,1.3814206815935108,1.3845638458292184,1.3877070100649265,1.3908501743006336,1.3939933385363414,1.3971365027720488,1.4002796670077566,1.4034228312434645,1.4065659954791718,1.4097091597148796,1.4128523239505875,1.4159954881862948,1.4191386524220027,1.4222818166577107,1.4254249808934176,1.4285681451291257,1.431711309364833,1.4348544736005406,1.4379976378362487,1.441140802071956,1.4442839663076636,1.4474271305433717,1.450570294779079,1.4537134590147867,1.4568566232504947,1.4599997874862018,1.4631429517219097,1.4662861159576173,1.4694292801933249,1.4725724444290327,1.47571560866474,1.4788587729004479,1.4820019371361557,1.485145101371863,1.4882882656075709,1.491431429843279,1.4945745940789859,1.497717758314694,1.5008609225504015,1.5040040867861089,1.507147251021817,1.5102904152575243,1.5134335794932319,1.51657674372894,1.5197199079646473,1.5228630722003549,1.526006236436063,1.52914940067177,1.532292564907478,1.5354357291431855,1.538578893378893,1.541722057614601,1.5448652218503083,1.548008386086016,1.551151550321724,1.5542947145574313,1.557437878793139,1.5605810430288471,1.563724207264554,1.5668673715002621,1.5700105357359697,1.573153699971677,1.5762968642073851,1.5794400284430925,1.5825831926788,1.5857263569145081,1.5888695211502155,1.592012685385923,1.5951558496216312,1.5982990138573383,1.6014421780930461,1.6045853423287537,1.6077285065644613,1.6108716708001691,1.6140148350358765,1.6171579992715843,1.6203011635072921,1.6234443277429995,1.6265874919787073,1.6297306562144154,1.6328738204501225,1.6360169846858303,1.639160148921538,1.6423033131572453,1.6454464773929534,1.6485896416286607,1.6517328058643683,1.6548759701000764,1.6580191343357837,1.6611622985714913,1.6643054628071994,1.6674486270429068,1.6705917912786143,1.673734955514322,1.6768781197500295,1.6800212839857374,1.6831644482214447,1.6863076124571525,1.6894507766928604,1.6925939409285677,1.6957371051642756,1.6988802693999836,1.7020234336356908,1.7051665978713986,1.7083097621071062,1.7114529263428135,1.7145960905785216,1.717739254814229,1.7208824190499366,1.7240255832856446,1.727168747521352,1.7303119117570596,1.7334550759927676,1.736598240228475,1.7397414044641826,1.7428845686998902,1.7460277329355978,1.7491708971713056,1.752314061407013,1.7554572256427208,1.7586003898784286,1.761743554114136,1.7648867183498438,1.7680298825855518,1.771173046821259,1.7743162110569668,1.7774593752926744,1.7806025395283818,1.7837457037640898,1.7868888679997972,1.7900320322355048,1.7931751964712128,1.7963183607069202,1.7994615249426278,1.8026046891783358,1.8057478534140432,1.8088910176497508,1.8120341818854584,1.815177346121166,1.8183205103568738,1.8214636745925812,1.824606838828289,1.8277500030639968,1.8308931672997042,1.834036331535412,1.83717949577112,1.8403226600068272,1.843465824242535,1.8466089884782426,1.84975215271395,1.852895316949658,1.8560384811853654,1.859181645421073,1.862324809656781,1.8654679738924884,1.868611138128196,1.871754302363904,1.8748974665996114,1.878040630835319,1.8811837950710266,1.8843269593067342,1.887470123542442,1.8906132877781494,1.8937564520138572,1.896899616249565,1.9000427804852724,1.9031859447209802,1.9063291089566883,1.9094722731923954,1.9126154374281032,1.9157586016638108,1.9189017658995182,1.9220449301352263,1.9251880943709336,1.9283312586066412,1.9314744228423493,1.9346175870780566,1.9377607513137642,1.9409039155494723,1.9440470797851797,1.9471902440208873,1.9503334082565948,1.9534765724923024,1.9566197367280103,1.9597629009637176,1.9629060651994255,1.9660492294351333,1.9691923936708406,1.9723355579065485,1.9754787221422565,1.9786218863779637,1.9817650506136715,1.984908214849379,1.9880513790850864,1.9911945433207945,1.9943377075565019,1.9974808717922095,2.0006240360279173,2.0037672002636246,2.0069103644993325,2.0100535287350407,2.0131966929707477,2.0163398572064555,2.0194830214421633,2.0226261856778707,2.0257693499135785,2.028912514149286,2.0320556783849937,2.0351988426207015,2.038342006856409,2.0414851710921167,2.0446283353278245,2.047771499563532,2.0509146637992397,2.054057828034947,2.057200992270655,2.0603441565063627,2.0634873207420696,2.066630484977778,2.0697736492134857,2.0729168134491927,2.076059977684901,2.0792031419206087,2.0823463061563157,2.085489470392024,2.0886326346277317,2.0917757988634387,2.094918963099147,2.098062127334854,2.1012052915705617,2.10434845580627,2.107491620041977,2.1106347842776847,2.113777948513393,2.1169211127491,2.1200642769848077,2.123207441220516,2.126350605456223,2.1294937696919307,2.1326369339276385,2.135780098163346,2.1389232623990537,2.142066426634761,2.145209590870469,2.1483527551061767,2.151495919341884,2.154639083577592,2.1577822478133,2.160925412049007,2.164068576284715,2.1672117405204228,2.17035490475613,2.173498068991838,2.1766412332275453,2.179784397463253,2.182927561698961,2.1860707259346683,2.189213890170376,2.192357054406084,2.1955002186417913,2.198643382877499,2.2017865471132065,2.2049297113489144,2.208072875584622,2.211216039820329,2.2143592040560374,2.217502368291745,2.220645532527452,2.2237886967631604,2.226931860998868,2.230075025234575,2.2332181894702834,2.2363613537059908,2.239504517941698,2.2426476821774064,2.2457908464131133,2.248934010648821,2.2520771748845294,2.2552203391202363,2.258363503355944,2.2615066675916524,2.2646498318273593,2.267792996063067,2.270936160298775,2.2740793245344824,2.27722248877019,2.2803656530058976,2.2835088172416054,2.286651981477313,2.2897951457130206,2.2929383099487284,2.2960814741844366,2.2992246384201436,2.3023678026558514,2.305510966891559,2.3086541311272666,2.3117972953629744,2.3149404595986818,2.3180836238343896,2.3212267880700974,2.324369952305805,2.3275131165415126,2.3306562807772204,2.333799445012928,2.3369426092486356,2.340085773484343,2.343228937720051,2.3463721019557586,2.3495152661914656,2.352658430427174,2.3558015946628816,2.3589447588985886,2.362087923134297,2.3652310873700046,2.3683742516057116,2.37151741584142,2.374660580077127,2.3778037443128346,2.380946908548543,2.38409007278425,2.3872332370199576,2.390376401255666,2.393519565491373,2.3966627297270806,2.399805893962789,2.402949058198496,2.4060922224342036,2.4092353866699114,2.412378550905619,2.4155217151413266,2.418664879377034,2.421808043612742,2.4249512078484496,2.428094372084157,2.431237536319865,2.434380700555573,2.43752386479128,2.440667029026988,2.4438101932626957,2.446953357498403,2.450096521734111,2.4532396859698182,2.456382850205526,2.459526014441234,2.4626691786769412,2.465812342912649,2.468955507148357,2.4720986713840643,2.475241835619772,2.4783849998554794,2.4815281640911873,2.484671328326895,2.487814492562602,2.4909576567983103,2.494100821034018,2.497243985269725,2.5003871495054333,2.503530313741141,2.506673477976848,2.5098166422125563,2.5129598064482637,2.516102970683971,2.5192461349196793,2.5223892991553867,2.525532463391094,2.5286756276268023,2.5318187918625092,2.534961956098217,2.5381051203339253,2.5412482845696323,2.54439144880534,2.547534613041048,2.5506777772767553,2.553820941512463,2.556964105748171,2.5601072699838783,2.563250434219586,2.5663935984552935,2.5695367626910013,2.5726799269267095,2.5758230911624165,2.5789662553981243,2.582109419633832,2.5852525838695395,2.5883957481052473,2.591538912340955,2.5946820765766625,2.5978252408123703,2.6009684050480777,2.6041115692837855,2.6072547335194933,2.6103978977552007,2.6135410619909085,2.616684226226616,2.6198273904623237,2.6229705546980315,2.626113718933739,2.6292568831694467,2.6324000474051545,2.6355432116408615,2.6386863758765697,2.6418295401122776,2.6449727043479845,2.6481158685836927,2.6512590328194,2.6544021970551075,2.6575453612908158,2.660688525526523,2.6638316897622305,2.6669748539979388,2.6701180182336457,2.6732611824693535,2.6764043467050618,2.6795475109407687,2.6826906751764765,2.6858338394121843,2.6889770036478917,2.6921201678835995,2.6952633321193074,2.6984064963550147,2.7015496605907225,2.70469282482643,2.7078359890621377,2.710979153297846,2.714122317533553,2.7172654817692607,2.7204086460049686,2.723551810240676,2.7266949744763838,2.7298381387120916,2.732981302947799,2.7361244671835068,2.739267631419214,2.742410795654922,2.74555395989063,2.748697124126337,2.751840288362045,2.7549834525977523,2.75812661683346,2.761269781069168,2.7644129453048754,2.767556109540583,2.770699273776291,2.773842438011998,2.776985602247706,2.780128766483414,2.783271930719121,2.786415094954829,2.7895582591905366,2.792701423426244,2.795844587661952,2.7989877518976596,2.802130916133367,2.805274080369075,2.808417244604782,2.81156040884049,2.8147035730761982,2.817846737311905,2.820989901547613,2.824133065783321,2.827276230019028,2.830419394254736,2.833562558490444,2.836705722726151,2.839848886961859,2.8429920511975664,2.846135215433274,2.8492783796689825,2.8524215439046894,2.855564708140397,2.858707872376105,2.8618510366118124,2.86499420084752,2.868137365083228,2.8712805293189354,2.8744236935546432,2.8775668577903506,2.8807100220260584,2.8838531862617662,2.8869963504974736,2.8901395147331814,2.893282678968889,2.8964258432045966,2.8995690074403044,2.902712171676012,2.9058553359117196,2.9089985001474274,2.912141664383135,2.9152848286188426,2.9184279928545505,2.9215711570902574,2.9247143213259656,2.9278574855616735,2.9310006497973804,2.9341438140330887,2.937286978268796,2.9404301425045034,2.9435733067402117,2.946716470975919,2.9498596352116264,2.9530027994473347,2.9561459636830416,2.9592891279187494,2.9624322921544577,2.9655754563901646,2.9687186206258724,2.9718617848615803,2.9750049490972876,2.9781481133329955,2.9812912775687033,2.9844344418044106,2.987577606040119,2.990720770275826,2.9938639345115337,2.997007098747242,3.000150262982949,3.0032934272186567,3.0064365914543645,3.009579755690072,3.0127229199257797,3.0158660841614875,3.019009248397195,3.0221524126329027,3.02529557686861,3.028438741104318,3.0315819053400257,3.034725069575733,3.037868233811441,3.0410113980471483,3.044154562282856,3.047297726518564,3.0504408907542713,3.053584054989979,3.056727219225687,3.059870383461394,3.063013547697102,3.06615671193281,3.069299876168517,3.072443040404225,3.0755862046399325,3.07872936887564,3.081872533111348,3.0850156973470555,3.088158861582763,3.091302025818471,3.094445190054178,3.097588354289886,3.100731518525594,3.103874682761301,3.107017846997009,3.1101610112327167,3.113304175468424,3.116447339704132,3.1195905039398397,3.122733668175547,3.1258768324112554,3.1290199966469623,3.13216316088267,3.1353063251183784,3.1384494893540853,3.141592653589793]}
},{}],72:[function(require,module,exports){
module.exports={"expected":[1.0e-309,9.9799599198397e-310,9.95991983967936e-310,9.9398797595191e-310,9.91983967935875e-310,9.8997995991984e-310,9.8797595190381e-310,9.85971943887776e-310,9.83967935871747e-310,9.81963927855714e-310,9.7995991983968e-310,9.7795591182365e-310,9.75951903807615e-310,9.73947895791587e-310,9.71943887775554e-310,9.6993987975952e-310,9.6793587174349e-310,9.65931863727455e-310,9.63927855711427e-310,9.61923847695394e-310,9.5991983967936e-310,9.5791583166333e-310,9.55911823647295e-310,9.53907815631267e-310,9.51903807615234e-310,9.498997995992e-310,9.4789579158317e-310,9.45891783567135e-310,9.43887775551106e-310,9.41883767535073e-310,9.3987975951904e-310,9.37875751503007e-310,9.35871743486974e-310,9.3386773547094e-310,9.31863727454913e-310,9.2985971943888e-310,9.27855711422847e-310,9.25851703406814e-310,9.2384769539078e-310,9.21843687374753e-310,9.1983967935872e-310,9.17835671342687e-310,9.15831663326654e-310,9.1382765531062e-310,9.11823647294593e-310,9.0981963927856e-310,9.07815631262527e-310,9.05811623246494e-310,9.0380761523046e-310,9.0180360721443e-310,8.997995991984e-310,8.97795591182366e-310,8.95791583166333e-310,8.937875751503e-310,8.9178356713427e-310,8.8977955911824e-310,8.87775551102206e-310,8.85771543086173e-310,8.8376753507014e-310,8.8176352705411e-310,8.7975951903808e-310,8.77755511022046e-310,8.75751503006013e-310,8.7374749498998e-310,8.7174348697395e-310,8.6973947895792e-310,8.67735470941886e-310,8.65731462925853e-310,8.6372745490982e-310,8.6172344689379e-310,8.5971943887776e-310,8.57715430861725e-310,8.5571142284569e-310,8.5370741482966e-310,8.5170340681363e-310,8.496993987976e-310,8.47695390781565e-310,8.4569138276553e-310,8.436873747495e-310,8.4168336673347e-310,8.3967935871744e-310,8.37675350701405e-310,8.3567134268537e-310,8.3366733466934e-310,8.31663326653306e-310,8.2965931863728e-310,8.27655310621245e-310,8.2565130260521e-310,8.2364729458918e-310,8.21643286573145e-310,8.19639278557117e-310,8.17635270541084e-310,8.1563126252505e-310,8.1362725450902e-310,8.11623246492985e-310,8.09619238476957e-310,8.07615230460924e-310,8.0561122244489e-310,8.0360721442886e-310,8.01603206412825e-310,7.99599198396797e-310,7.97595190380764e-310,7.9559118236473e-310,7.935871743487e-310,7.91583166332665e-310,7.89579158316637e-310,7.87575150300604e-310,7.8557114228457e-310,7.83567134268538e-310,7.81563126252504e-310,7.79559118236476e-310,7.77555110220443e-310,7.7555110220441e-310,7.73547094188377e-310,7.71543086172344e-310,7.69539078156316e-310,7.67535070140283e-310,7.6553106212425e-310,7.63527054108217e-310,7.61523046092184e-310,7.59519038076156e-310,7.57515030060123e-310,7.5551102204409e-310,7.53507014028057e-310,7.51503006012024e-310,7.49498997995996e-310,7.47494989979963e-310,7.4549098196393e-310,7.43486973947897e-310,7.41482965931863e-310,7.39478957915835e-310,7.374749498998e-310,7.3547094188377e-310,7.33466933867736e-310,7.31462925851703e-310,7.29458917835675e-310,7.2745490981964e-310,7.2545090180361e-310,7.23446893787576e-310,7.21442885771543e-310,7.19438877755515e-310,7.1743486973948e-310,7.1543086172345e-310,7.13426853707416e-310,7.11422845691383e-310,7.0941883767535e-310,7.0741482965932e-310,7.0541082164329e-310,7.03406813627256e-310,7.01402805611222e-310,6.9939879759519e-310,6.9739478957916e-310,6.9539078156313e-310,6.93386773547095e-310,6.9138276553106e-310,6.8937875751503e-310,6.87374749499e-310,6.8537074148297e-310,6.83366733466935e-310,6.813627254509e-310,6.7935871743487e-310,6.7735470941884e-310,6.7535070140281e-310,6.73346693386775e-310,6.7134268537074e-310,6.6933867735471e-310,6.6733466933868e-310,6.6533066132265e-310,6.63326653306615e-310,6.6132264529058e-310,6.5931863727455e-310,6.5731462925852e-310,6.55310621242487e-310,6.53306613226454e-310,6.5130260521042e-310,6.4929859719439e-310,6.4729458917836e-310,6.45290581162327e-310,6.43286573146294e-310,6.4128256513026e-310,6.3927855711423e-310,6.372745490982e-310,6.35270541082167e-310,6.33266533066134e-310,6.312625250501e-310,6.2925851703407e-310,6.2725450901804e-310,6.25250501002007e-310,6.23246492985974e-310,6.2124248496994e-310,6.19238476953907e-310,6.1723446893788e-310,6.15230460921846e-310,6.13226452905813e-310,6.1122244488978e-310,6.09218436873747e-310,6.07214428857714e-310,6.05210420841686e-310,6.03206412825653e-310,6.0120240480962e-310,5.99198396793587e-310,5.97194388777554e-310,5.95190380761526e-310,5.93186372745493e-310,5.9118236472946e-310,5.89178356713427e-310,5.87174348697394e-310,5.85170340681366e-310,5.83166332665333e-310,5.811623246493e-310,5.79158316633266e-310,5.77154308617233e-310,5.75150300601205e-310,5.7314629258517e-310,5.7114228456914e-310,5.69138276553106e-310,5.67134268537073e-310,5.65130260521045e-310,5.6312625250501e-310,5.6112224448898e-310,5.59118236472946e-310,5.57114228456913e-310,5.55110220440885e-310,5.5310621242485e-310,5.5110220440882e-310,5.49098196392786e-310,5.47094188376753e-310,5.45090180360725e-310,5.4308617234469e-310,5.4108216432866e-310,5.39078156312625e-310,5.3707414829659e-310,5.35070140280564e-310,5.3306613226453e-310,5.310621242485e-310,5.29058116232465e-310,5.2705410821643e-310,5.25050100200404e-310,5.2304609218437e-310,5.2104208416834e-310,5.19038076152305e-310,5.1703406813627e-310,5.15030060120244e-310,5.1302605210421e-310,5.1102204408818e-310,5.09018036072145e-310,5.0701402805611e-310,5.05010020040084e-310,5.0300601202405e-310,5.01002004008017e-310,4.98997995991984e-310,4.9699398797595e-310,4.9498997995992e-310,4.9298597194389e-310,4.90981963927857e-310,4.88977955911824e-310,4.8697394789579e-310,4.8496993987976e-310,4.8296593186373e-310,4.80961923847697e-310,4.78957915831664e-310,4.7695390781563e-310,4.749498997996e-310,4.7294589178357e-310,4.70941883767537e-310,4.68937875751504e-310,4.6693386773547e-310,4.6492985971944e-310,4.6292585170341e-310,4.60921843687376e-310,4.58917835671343e-310,4.5691382765531e-310,4.54909819639277e-310,4.5290581162325e-310,4.50901803607216e-310,4.48897795591183e-310,4.4689378757515e-310,4.44889779559117e-310,4.4288577154309e-310,4.40881763527056e-310,4.38877755511023e-310,4.3687374749499e-310,4.34869739478957e-310,4.3286573146293e-310,4.30861723446896e-310,4.28857715430863e-310,4.2685370741483e-310,4.24849699398797e-310,4.2284569138277e-310,4.20841683366735e-310,4.188376753507e-310,4.1683366733467e-310,4.14829659318636e-310,4.1282565130261e-310,4.10821643286575e-310,4.0881763527054e-310,4.0681362725451e-310,4.04809619238476e-310,4.0280561122245e-310,4.00801603206415e-310,3.9879759519038e-310,3.9679358717435e-310,3.94789579158316e-310,3.9278557114229e-310,3.90781563126255e-310,3.8877755511022e-310,3.8677354709419e-310,3.84769539078156e-310,3.82765531062123e-310,3.80761523046094e-310,3.7875751503006e-310,3.7675350701403e-310,3.74749498997995e-310,3.7274549098196e-310,3.70741482965934e-310,3.687374749499e-310,3.6673346693387e-310,3.64729458917835e-310,3.627254509018e-310,3.60721442885774e-310,3.5871743486974e-310,3.5671342685371e-310,3.54709418837675e-310,3.5270541082164e-310,3.50701402805614e-310,3.4869739478958e-310,3.4669338677355e-310,3.44689378757515e-310,3.4268537074148e-310,3.40681362725453e-310,3.3867735470942e-310,3.36673346693387e-310,3.34669338677354e-310,3.3266533066132e-310,3.30661322645293e-310,3.2865731462926e-310,3.26653306613227e-310,3.24649298597194e-310,3.2264529058116e-310,3.20641282565133e-310,3.186372745491e-310,3.16633266533067e-310,3.14629258517034e-310,3.12625250501e-310,3.10621242484973e-310,3.0861723446894e-310,3.06613226452907e-310,3.04609218436874e-310,3.0260521042084e-310,3.0060120240481e-310,2.9859719438878e-310,2.96593186372746e-310,2.94589178356713e-310,2.9258517034068e-310,2.9058116232465e-310,2.8857715430862e-310,2.86573146292586e-310,2.84569138276553e-310,2.8256513026052e-310,2.8056112224449e-310,2.7855711422846e-310,2.76553106212426e-310,2.74549098196393e-310,2.7254509018036e-310,2.70541082164327e-310,2.685370741483e-310,2.66533066132266e-310,2.64529058116233e-310,2.625250501002e-310,2.60521042084167e-310,2.5851703406814e-310,2.56513026052105e-310,2.5450901803607e-310,2.5250501002004e-310,2.50501002004006e-310,2.4849699398798e-310,2.46492985971945e-310,2.4448897795591e-310,2.4248496993988e-310,2.40480961923846e-310,2.3847695390782e-310,2.36472945891785e-310,2.3446893787575e-310,2.3246492985972e-310,2.30460921843686e-310,2.2845691382766e-310,2.26452905811625e-310,2.2444889779559e-310,2.2244488977956e-310,2.20440881763526e-310,2.18436873747497e-310,2.16432865731464e-310,2.1442885771543e-310,2.124248496994e-310,2.10420841683365e-310,2.08416833667337e-310,2.06412825651304e-310,2.0440881763527e-310,2.0240480961924e-310,2.00400801603205e-310,1.98396793587177e-310,1.96392785571144e-310,1.9438877755511e-310,1.9238476953908e-310,1.90380761523045e-310,1.88376753507017e-310,1.86372745490984e-310,1.8436873747495e-310,1.8236472945892e-310,1.80360721442885e-310,1.78356713426856e-310,1.76352705410823e-310,1.7434869739479e-310,1.72344689378757e-310,1.70340681362724e-310,1.68336673346696e-310,1.66332665330663e-310,1.6432865731463e-310,1.62324649298597e-310,1.60320641282564e-310,1.5831663326653e-310,1.56312625250503e-310,1.5430861723447e-310,1.52304609218437e-310,1.50300601202404e-310,1.4829659318637e-310,1.46292585170343e-310,1.4428857715431e-310,1.42284569138277e-310,1.40280561122244e-310,1.3827655310621e-310,1.3627254509018e-310,1.3426853707415e-310,1.32264529058116e-310,1.30260521042083e-310,1.2825651302605e-310,1.2625250501002e-310,1.2424849699399e-310,1.22244488977956e-310,1.20240480961923e-310,1.1823647294589e-310,1.1623246492986e-310,1.1422845691383e-310,1.12224448897796e-310,1.10220440881763e-310,1.0821643286573e-310,1.062124248497e-310,1.0420841683367e-310,1.02204408817636e-310,1.00200400801603e-310,9.819639278557e-311,9.619238476954e-311,9.418837675351e-311,9.2184368737475e-311,9.018036072144e-311,8.817635270541e-311,8.617234468938e-311,8.416833667335e-311,8.2164328657315e-311,8.016032064128e-311,7.815631262525e-311,7.615230460922e-311,7.414829659319e-311,7.2144288577155e-311,7.014028056112e-311,6.813627254509e-311,6.613226452906e-311,6.412825651303e-311,6.2124248496995e-311,6.012024048096e-311,5.811623246493e-311,5.61122244489e-311,5.4108216432867e-311,5.2104208416834e-311,5.01002004008e-311,4.809619238477e-311,4.6092184368735e-311,4.4088176352707e-311,4.2084168336674e-311,4.008016032064e-311,3.807615230461e-311,3.6072144288575e-311,3.4068136272547e-311,3.2064128256514e-311,3.006012024048e-311,2.805611222445e-311,2.6052104208415e-311,2.4048096192387e-311,2.2044088176354e-311,2.004008016032e-311,1.8036072144287e-311,1.6032064128254e-311,1.4028056112226e-311,1.2024048096193e-311,1.002004008016e-311,8.016032064127e-312,6.012024048094e-312,4.008016032066e-312,2.004008016033e-312,0.0],"x":[1.0e-309,9.9799599198397e-310,9.95991983967936e-310,9.9398797595191e-310,9.91983967935875e-310,9.8997995991984e-310,9.8797595190381e-310,9.85971943887776e-310,9.83967935871747e-310,9.81963927855714e-310,9.7995991983968e-310,9.7795591182365e-310,9.75951903807615e-310,9.73947895791587e-310,9.71943887775554e-310,9.6993987975952e-310,9.6793587174349e-310,9.65931863727455e-310,9.63927855711427e-310,9.61923847695394e-310,9.5991983967936e-310,9.5791583166333e-310,9.55911823647295e-310,9.53907815631267e-310,9.51903807615234e-310,9.498997995992e-310,9.4789579158317e-310,9.45891783567135e-310,9.43887775551106e-310,9.41883767535073e-310,9.3987975951904e-310,9.37875751503007e-310,9.35871743486974e-310,9.3386773547094e-310,9.31863727454913e-310,9.2985971943888e-310,9.27855711422847e-310,9.25851703406814e-310,9.2384769539078e-310,9.21843687374753e-310,9.1983967935872e-310,9.17835671342687e-310,9.15831663326654e-310,9.1382765531062e-310,9.11823647294593e-310,9.0981963927856e-310,9.07815631262527e-310,9.05811623246494e-310,9.0380761523046e-310,9.0180360721443e-310,8.997995991984e-310,8.97795591182366e-310,8.95791583166333e-310,8.937875751503e-310,8.9178356713427e-310,8.8977955911824e-310,8.87775551102206e-310,8.85771543086173e-310,8.8376753507014e-310,8.8176352705411e-310,8.7975951903808e-310,8.77755511022046e-310,8.75751503006013e-310,8.7374749498998e-310,8.7174348697395e-310,8.6973947895792e-310,8.67735470941886e-310,8.65731462925853e-310,8.6372745490982e-310,8.6172344689379e-310,8.5971943887776e-310,8.57715430861725e-310,8.5571142284569e-310,8.5370741482966e-310,8.5170340681363e-310,8.496993987976e-310,8.47695390781565e-310,8.4569138276553e-310,8.436873747495e-310,8.4168336673347e-310,8.3967935871744e-310,8.37675350701405e-310,8.3567134268537e-310,8.3366733466934e-310,8.31663326653306e-310,8.2965931863728e-310,8.27655310621245e-310,8.2565130260521e-310,8.2364729458918e-310,8.21643286573145e-310,8.19639278557117e-310,8.17635270541084e-310,8.1563126252505e-310,8.1362725450902e-310,8.11623246492985e-310,8.09619238476957e-310,8.07615230460924e-310,8.0561122244489e-310,8.0360721442886e-310,8.01603206412825e-310,7.99599198396797e-310,7.97595190380764e-310,7.9559118236473e-310,7.935871743487e-310,7.91583166332665e-310,7.89579158316637e-310,7.87575150300604e-310,7.8557114228457e-310,7.83567134268538e-310,7.81563126252504e-310,7.79559118236476e-310,7.77555110220443e-310,7.7555110220441e-310,7.73547094188377e-310,7.71543086172344e-310,7.69539078156316e-310,7.67535070140283e-310,7.6553106212425e-310,7.63527054108217e-310,7.61523046092184e-310,7.59519038076156e-310,7.57515030060123e-310,7.5551102204409e-310,7.53507014028057e-310,7.51503006012024e-310,7.49498997995996e-310,7.47494989979963e-310,7.4549098196393e-310,7.43486973947897e-310,7.41482965931863e-310,7.39478957915835e-310,7.374749498998e-310,7.3547094188377e-310,7.33466933867736e-310,7.31462925851703e-310,7.29458917835675e-310,7.2745490981964e-310,7.2545090180361e-310,7.23446893787576e-310,7.21442885771543e-310,7.19438877755515e-310,7.1743486973948e-310,7.1543086172345e-310,7.13426853707416e-310,7.11422845691383e-310,7.0941883767535e-310,7.0741482965932e-310,7.0541082164329e-310,7.03406813627256e-310,7.01402805611222e-310,6.9939879759519e-310,6.9739478957916e-310,6.9539078156313e-310,6.93386773547095e-310,6.9138276553106e-310,6.8937875751503e-310,6.87374749499e-310,6.8537074148297e-310,6.83366733466935e-310,6.813627254509e-310,6.7935871743487e-310,6.7735470941884e-310,6.7535070140281e-310,6.73346693386775e-310,6.7134268537074e-310,6.6933867735471e-310,6.6733466933868e-310,6.6533066132265e-310,6.63326653306615e-310,6.6132264529058e-310,6.5931863727455e-310,6.5731462925852e-310,6.55310621242487e-310,6.53306613226454e-310,6.5130260521042e-310,6.4929859719439e-310,6.4729458917836e-310,6.45290581162327e-310,6.43286573146294e-310,6.4128256513026e-310,6.3927855711423e-310,6.372745490982e-310,6.35270541082167e-310,6.33266533066134e-310,6.312625250501e-310,6.2925851703407e-310,6.2725450901804e-310,6.25250501002007e-310,6.23246492985974e-310,6.2124248496994e-310,6.19238476953907e-310,6.1723446893788e-310,6.15230460921846e-310,6.13226452905813e-310,6.1122244488978e-310,6.09218436873747e-310,6.07214428857714e-310,6.05210420841686e-310,6.03206412825653e-310,6.0120240480962e-310,5.99198396793587e-310,5.97194388777554e-310,5.95190380761526e-310,5.93186372745493e-310,5.9118236472946e-310,5.89178356713427e-310,5.87174348697394e-310,5.85170340681366e-310,5.83166332665333e-310,5.811623246493e-310,5.79158316633266e-310,5.77154308617233e-310,5.75150300601205e-310,5.7314629258517e-310,5.7114228456914e-310,5.69138276553106e-310,5.67134268537073e-310,5.65130260521045e-310,5.6312625250501e-310,5.6112224448898e-310,5.59118236472946e-310,5.57114228456913e-310,5.55110220440885e-310,5.5310621242485e-310,5.5110220440882e-310,5.49098196392786e-310,5.47094188376753e-310,5.45090180360725e-310,5.4308617234469e-310,5.4108216432866e-310,5.39078156312625e-310,5.3707414829659e-310,5.35070140280564e-310,5.3306613226453e-310,5.310621242485e-310,5.29058116232465e-310,5.2705410821643e-310,5.25050100200404e-310,5.2304609218437e-310,5.2104208416834e-310,5.19038076152305e-310,5.1703406813627e-310,5.15030060120244e-310,5.1302605210421e-310,5.1102204408818e-310,5.09018036072145e-310,5.0701402805611e-310,5.05010020040084e-310,5.0300601202405e-310,5.01002004008017e-310,4.98997995991984e-310,4.9699398797595e-310,4.9498997995992e-310,4.9298597194389e-310,4.90981963927857e-310,4.88977955911824e-310,4.8697394789579e-310,4.8496993987976e-310,4.8296593186373e-310,4.80961923847697e-310,4.78957915831664e-310,4.7695390781563e-310,4.749498997996e-310,4.7294589178357e-310,4.70941883767537e-310,4.68937875751504e-310,4.6693386773547e-310,4.6492985971944e-310,4.6292585170341e-310,4.60921843687376e-310,4.58917835671343e-310,4.5691382765531e-310,4.54909819639277e-310,4.5290581162325e-310,4.50901803607216e-310,4.48897795591183e-310,4.4689378757515e-310,4.44889779559117e-310,4.4288577154309e-310,4.40881763527056e-310,4.38877755511023e-310,4.3687374749499e-310,4.34869739478957e-310,4.3286573146293e-310,4.30861723446896e-310,4.28857715430863e-310,4.2685370741483e-310,4.24849699398797e-310,4.2284569138277e-310,4.20841683366735e-310,4.188376753507e-310,4.1683366733467e-310,4.14829659318636e-310,4.1282565130261e-310,4.10821643286575e-310,4.0881763527054e-310,4.0681362725451e-310,4.04809619238476e-310,4.0280561122245e-310,4.00801603206415e-310,3.9879759519038e-310,3.9679358717435e-310,3.94789579158316e-310,3.9278557114229e-310,3.90781563126255e-310,3.8877755511022e-310,3.8677354709419e-310,3.84769539078156e-310,3.82765531062123e-310,3.80761523046094e-310,3.7875751503006e-310,3.7675350701403e-310,3.74749498997995e-310,3.7274549098196e-310,3.70741482965934e-310,3.687374749499e-310,3.6673346693387e-310,3.64729458917835e-310,3.627254509018e-310,3.60721442885774e-310,3.5871743486974e-310,3.5671342685371e-310,3.54709418837675e-310,3.5270541082164e-310,3.50701402805614e-310,3.4869739478958e-310,3.4669338677355e-310,3.44689378757515e-310,3.4268537074148e-310,3.40681362725453e-310,3.3867735470942e-310,3.36673346693387e-310,3.34669338677354e-310,3.3266533066132e-310,3.30661322645293e-310,3.2865731462926e-310,3.26653306613227e-310,3.24649298597194e-310,3.2264529058116e-310,3.20641282565133e-310,3.186372745491e-310,3.16633266533067e-310,3.14629258517034e-310,3.12625250501e-310,3.10621242484973e-310,3.0861723446894e-310,3.06613226452907e-310,3.04609218436874e-310,3.0260521042084e-310,3.0060120240481e-310,2.9859719438878e-310,2.96593186372746e-310,2.94589178356713e-310,2.9258517034068e-310,2.9058116232465e-310,2.8857715430862e-310,2.86573146292586e-310,2.84569138276553e-310,2.8256513026052e-310,2.8056112224449e-310,2.7855711422846e-310,2.76553106212426e-310,2.74549098196393e-310,2.7254509018036e-310,2.70541082164327e-310,2.685370741483e-310,2.66533066132266e-310,2.64529058116233e-310,2.625250501002e-310,2.60521042084167e-310,2.5851703406814e-310,2.56513026052105e-310,2.5450901803607e-310,2.5250501002004e-310,2.50501002004006e-310,2.4849699398798e-310,2.46492985971945e-310,2.4448897795591e-310,2.4248496993988e-310,2.40480961923846e-310,2.3847695390782e-310,2.36472945891785e-310,2.3446893787575e-310,2.3246492985972e-310,2.30460921843686e-310,2.2845691382766e-310,2.26452905811625e-310,2.2444889779559e-310,2.2244488977956e-310,2.20440881763526e-310,2.18436873747497e-310,2.16432865731464e-310,2.1442885771543e-310,2.124248496994e-310,2.10420841683365e-310,2.08416833667337e-310,2.06412825651304e-310,2.0440881763527e-310,2.0240480961924e-310,2.00400801603205e-310,1.98396793587177e-310,1.96392785571144e-310,1.9438877755511e-310,1.9238476953908e-310,1.90380761523045e-310,1.88376753507017e-310,1.86372745490984e-310,1.8436873747495e-310,1.8236472945892e-310,1.80360721442885e-310,1.78356713426856e-310,1.76352705410823e-310,1.7434869739479e-310,1.72344689378757e-310,1.70340681362724e-310,1.68336673346696e-310,1.66332665330663e-310,1.6432865731463e-310,1.62324649298597e-310,1.60320641282564e-310,1.5831663326653e-310,1.56312625250503e-310,1.5430861723447e-310,1.52304609218437e-310,1.50300601202404e-310,1.4829659318637e-310,1.46292585170343e-310,1.4428857715431e-310,1.42284569138277e-310,1.40280561122244e-310,1.3827655310621e-310,1.3627254509018e-310,1.3426853707415e-310,1.32264529058116e-310,1.30260521042083e-310,1.2825651302605e-310,1.2625250501002e-310,1.2424849699399e-310,1.22244488977956e-310,1.20240480961923e-310,1.1823647294589e-310,1.1623246492986e-310,1.1422845691383e-310,1.12224448897796e-310,1.10220440881763e-310,1.0821643286573e-310,1.062124248497e-310,1.0420841683367e-310,1.02204408817636e-310,1.00200400801603e-310,9.819639278557e-311,9.619238476954e-311,9.418837675351e-311,9.2184368737475e-311,9.018036072144e-311,8.817635270541e-311,8.617234468938e-311,8.416833667335e-311,8.2164328657315e-311,8.016032064128e-311,7.815631262525e-311,7.615230460922e-311,7.414829659319e-311,7.2144288577155e-311,7.014028056112e-311,6.813627254509e-311,6.613226452906e-311,6.412825651303e-311,6.2124248496995e-311,6.012024048096e-311,5.811623246493e-311,5.61122244489e-311,5.4108216432867e-311,5.2104208416834e-311,5.01002004008e-311,4.809619238477e-311,4.6092184368735e-311,4.4088176352707e-311,4.2084168336674e-311,4.008016032064e-311,3.807615230461e-311,3.6072144288575e-311,3.4068136272547e-311,3.2064128256514e-311,3.006012024048e-311,2.805611222445e-311,2.6052104208415e-311,2.4048096192387e-311,2.2044088176354e-311,2.004008016032e-311,1.8036072144287e-311,1.6032064128254e-311,1.4028056112226e-311,1.2024048096193e-311,1.002004008016e-311,8.016032064127e-312,6.012024048094e-312,4.008016032066e-312,2.004008016033e-312,0.0]}
},{}],73:[function(require,module,exports){
module.exports={"expected":[-1.0e-300,-9.979959920040082e-301,-9.959919840080161e-301,-9.93987976012024e-301,-9.91983968016032e-301,-9.899799600200401e-301,-9.879759520240481e-301,-9.859719440280562e-301,-9.839679360320642e-301,-9.819639280360723e-301,-9.799599200400803e-301,-9.779559120440882e-301,-9.75951904048096e-301,-9.739478960521041e-301,-9.719438880561123e-301,-9.699398800601202e-301,-9.679358720641283e-301,-9.659318640681363e-301,-9.639278560721442e-301,-9.619238480761522e-301,-9.599198400801603e-301,-9.579158320841683e-301,-9.559118240881764e-301,-9.539078160921844e-301,-9.519038080961925e-301,-9.498998001002004e-301,-9.478957921042084e-301,-9.458917841082164e-301,-9.438877761122243e-301,-9.418837681162325e-301,-9.398797601202406e-301,-9.378757521242485e-301,-9.358717441282567e-301,-9.338677361322646e-301,-9.318637281362724e-301,-9.298597201402806e-301,-9.278557121442885e-301,-9.258517041482966e-301,-9.238476961523046e-301,-9.218436881563127e-301,-9.198396801603207e-301,-9.178356721643288e-301,-9.158316641683366e-301,-9.138276561723447e-301,-9.118236481763527e-301,-9.098196401803608e-301,-9.078156321843687e-301,-9.058116241883769e-301,-9.038076161923849e-301,-9.018036081963928e-301,-8.997996002004008e-301,-8.977955922044087e-301,-8.957915842084168e-301,-8.93787576212425e-301,-8.917835682164329e-301,-8.897795602204409e-301,-8.877755522244491e-301,-8.85771544228457e-301,-8.837675362324649e-301,-8.817635282364728e-301,-8.79759520240481e-301,-8.77755512244489e-301,-8.757515042484969e-301,-8.737474962525051e-301,-8.717434882565132e-301,-8.69739480260521e-301,-8.677354722645291e-301,-8.65731464268537e-301,-8.63727456272545e-301,-8.617234482765532e-301,-8.597194402805611e-301,-8.577154322845691e-301,-8.557114242885772e-301,-8.537074162925852e-301,-8.517034082965931e-301,-8.496994003006012e-301,-8.476953923046092e-301,-8.456913843086173e-301,-8.436873763126253e-301,-8.416833683166334e-301,-8.396793603206412e-301,-8.376753523246494e-301,-8.356713443286573e-301,-8.336673363326652e-301,-8.316633283366734e-301,-8.296593203406813e-301,-8.276553123446893e-301,-8.256513043486976e-301,-8.236472963527054e-301,-8.216432883567135e-301,-8.196392803607215e-301,-8.176352723647294e-301,-8.156312643687375e-301,-8.136272563727455e-301,-8.116232483767535e-301,-8.096192403807616e-301,-8.076152323847696e-301,-8.056112243887777e-301,-8.036072163927854e-301,-8.016032083967936e-301,-7.995992004008017e-301,-7.975951924048095e-301,-7.955911844088178e-301,-7.935871764128258e-301,-7.915831684168337e-301,-7.895791604208417e-301,-7.875751524248496e-301,-7.855711444288577e-301,-7.835671364328657e-301,-7.815631284368737e-301,-7.795591204408818e-301,-7.775551124448898e-301,-7.755511044488979e-301,-7.73547096452906e-301,-7.715430884569136e-301,-7.695390804609219e-301,-7.675350724649299e-301,-7.65531064468938e-301,-7.635270564729458e-301,-7.615230484769539e-301,-7.59519040480962e-301,-7.5751503248497e-301,-7.55511024488978e-301,-7.53507016492986e-301,-7.51503008496994e-301,-7.49499000501002e-301,-7.4749499250501e-301,-7.454909845090181e-301,-7.4348697651302604e-301,-7.414829685170341e-301,-7.3947896052104205e-301,-7.374749525250502e-301,-7.3547094452905814e-301,-7.334669365330661e-301,-7.3146292853707415e-301,-7.294589205410823e-301,-7.274549125450902e-301,-7.254509045490982e-301,-7.2344689655310626e-301,-7.214428885571143e-301,-7.194388805611223e-301,-7.174348725651302e-301,-7.154308645691383e-301,-7.134268565731464e-301,-7.114228485771543e-301,-7.094188405811623e-301,-7.074148325851704e-301,-7.054108245891783e-301,-7.034068165931864e-301,-7.014028085971944e-301,-6.993988006012024e-301,-6.9739479260521044e-301,-6.953907846092185e-301,-6.9338677661322645e-301,-6.913827686172345e-301,-6.8937876062124254e-301,-6.873747526252505e-301,-6.8537074462925855e-301,-6.833667366332666e-301,-6.813627286372746e-301,-6.793587206412826e-301,-6.7735471264529066e-301,-6.753507046492986e-301,-6.733466966533067e-301,-6.7134268865731455e-301,-6.693386806613227e-301,-6.673346726653307e-301,-6.653306646693387e-301,-6.6332665667334665e-301,-6.613226486773548e-301,-6.593186406813627e-301,-6.573146326853708e-301,-6.5531062468937875e-301,-6.533066166933868e-301,-6.513026086973948e-301,-6.492986007014029e-301,-6.472945927054108e-301,-6.452905847094189e-301,-6.4328657671342694e-301,-6.412825687174349e-301,-6.392785607214429e-301,-6.372745527254509e-301,-6.35270544729459e-301,-6.33266536733467e-301,-6.31262528737475e-301,-6.292585207414829e-301,-6.272545127454911e-301,-6.2525050474949894e-301,-6.23246496753507e-301,-6.21242488757515e-301,-6.192384807615231e-301,-6.1723447276553105e-301,-6.152304647695391e-301,-6.1322645677354706e-301,-6.112224487775552e-301,-6.092184407815632e-301,-6.072144327855711e-301,-6.0521042478957916e-301,-6.032064167935872e-301,-6.012024087975952e-301,-5.991984008016032e-301,-5.971943928056113e-301,-5.951903848096192e-301,-5.931863768136273e-301,-5.911823688176353e-301,-5.891783608216433e-301,-5.871743528256513e-301,-5.851703448296594e-301,-5.831663368336673e-301,-5.811623288376754e-301,-5.7915832084168334e-301,-5.771543128456913e-301,-5.751503048496994e-301,-5.731462968537074e-301,-5.7114228885771545e-301,-5.691382808617234e-301,-5.6713427286573146e-301,-5.651302648697395e-301,-5.6312625687374755e-301,-5.611222488777554e-301,-5.5911824088176356e-301,-5.571142328857716e-301,-5.551102248897796e-301,-5.531062168937875e-301,-5.511022088977957e-301,-5.490982009018036e-301,-5.470941929058117e-301,-5.450901849098196e-301,-5.430861769138276e-301,-5.410821689178357e-301,-5.390781609218438e-301,-5.3707415292585165e-301,-5.350701449298597e-301,-5.3306613693386774e-301,-5.310621289378758e-301,-5.2905812094188375e-301,-5.270541129458917e-301,-5.2505010494989985e-301,-5.230460969539079e-301,-5.210420889579158e-301,-5.190380809619238e-301,-5.1703407296593195e-301,-5.150300649699399e-301,-5.130260569739479e-301,-5.110220489779559e-301,-5.090180409819639e-301,-5.07014032985972e-301,-5.0501002498998e-301,-5.030060169939879e-301,-5.01002008997996e-301,-4.989980010020041e-301,-4.96993993006012e-301,-4.9498998501002e-301,-4.929859770140281e-301,-4.909819690180361e-301,-4.889779610220441e-301,-4.869739530260521e-301,-4.849699450300601e-301,-4.829659370340682e-301,-4.809619290380761e-301,-4.789579210420842e-301,-4.769539130460922e-301,-4.749499050501002e-301,-4.729458970541082e-301,-4.709418890581163e-301,-4.689378810621242e-301,-4.669338730661323e-301,-4.649298650701403e-301,-4.629258570741483e-301,-4.609218490781563e-301,-4.589178410821644e-301,-4.569138330861723e-301,-4.549098250901804e-301,-4.529058170941884e-301,-4.509018090981964e-301,-4.488978011022044e-301,-4.468937931062125e-301,-4.4488978511022045e-301,-4.428857771142285e-301,-4.408817691182364e-301,-4.388777611222445e-301,-4.3687375312625255e-301,-4.348697451302605e-301,-4.328657371342685e-301,-4.308617291382766e-301,-4.288577211422846e-301,-4.268537131462926e-301,-4.248497051503006e-301,-4.228456971543086e-301,-4.208416891583167e-301,-4.188376811623247e-301,-4.168336731663326e-301,-4.1482966517034065e-301,-4.128256571743488e-301,-4.108216491783567e-301,-4.088176411823647e-301,-4.0681363318637275e-301,-4.048096251903808e-301,-4.028056171943888e-301,-4.008016091983968e-301,-3.987976012024048e-301,-3.967935932064129e-301,-3.947895852104209e-301,-3.927855772144288e-301,-3.907815692184369e-301,-3.887775612224449e-301,-3.86773553226453e-301,-3.847695452304609e-301,-3.82765537234469e-301,-3.807615292384769e-301,-3.78757521242485e-301,-3.76753513246493e-301,-3.74749505250501e-301,-3.7274549725450904e-301,-3.7074148925851704e-301,-3.687374812625251e-301,-3.6673347326653305e-301,-3.6472946527054114e-301,-3.627254572745491e-301,-3.6072144927855715e-301,-3.587174412825651e-301,-3.567134332865732e-301,-3.5470942529058116e-301,-3.527054172945892e-301,-3.507014092985972e-301,-3.486974013026052e-301,-3.4669339330661322e-301,-3.4468938531062127e-301,-3.4268537731462927e-301,-3.4068136931863728e-301,-3.3867736132264532e-301,-3.3667335332665333e-301,-3.3466934533066133e-301,-3.3266533733466934e-301,-3.306613293386774e-301,-3.286573213426854e-301,-3.266533133466934e-301,-3.2464930535070144e-301,-3.2264529735470944e-301,-3.2064128935871745e-301,-3.186372813627255e-301,-3.166332733667335e-301,-3.1462926537074146e-301,-3.126252573747495e-301,-3.106212493787575e-301,-3.0861724138276556e-301,-3.0661323338677352e-301,-3.046092253907816e-301,-3.0260521739478957e-301,-3.0060120939879762e-301,-2.9859720140280563e-301,-2.9659319340681367e-301,-2.9458918541082164e-301,-2.9258517741482972e-301,-2.905811694188377e-301,-2.8857716142284573e-301,-2.865731534268537e-301,-2.8456914543086174e-301,-2.8256513743486975e-301,-2.805611294388777e-301,-2.785571214428858e-301,-2.7655311344689376e-301,-2.745491054509018e-301,-2.725450974549098e-301,-2.7054108945891786e-301,-2.6853708146292582e-301,-2.6653307346693387e-301,-2.6452906547094187e-301,-2.625250574749499e-301,-2.605210494789579e-301,-2.5851704148296597e-301,-2.5651303348697393e-301,-2.5450902549098198e-301,-2.5250501749499e-301,-2.50501009498998e-301,-2.48497001503006e-301,-2.4649299350701404e-301,-2.4448898551102204e-301,-2.4248497751503005e-301,-2.4048096951903805e-301,-2.384769615230461e-301,-2.364729535270541e-301,-2.344689455310621e-301,-2.3246493753507016e-301,-2.3046092953907816e-301,-2.2845692154308617e-301,-2.264529135470942e-301,-2.244489055511022e-301,-2.2244489755511022e-301,-2.204408895591182e-301,-2.1843688156312627e-301,-2.1643287356713423e-301,-2.144288655711423e-301,-2.124248575751503e-301,-2.1042084957915833e-301,-2.084168415831663e-301,-2.064128335871744e-301,-2.0440882559118235e-301,-2.024048175951904e-301,-2.004008095991984e-301,-1.9839680160320644e-301,-1.963927936072144e-301,-1.9438878561122245e-301,-1.9238477761523046e-301,-1.9038076961923846e-301,-1.883767616232465e-301,-1.8637275362725451e-301,-1.8436874563126254e-301,-1.8236473763527056e-301,-1.8036072963927857e-301,-1.783567216432866e-301,-1.763527136472946e-301,-1.7434870565130262e-301,-1.7234469765531065e-301,-1.7034068965931863e-301,-1.6833668166332666e-301,-1.6633267366733466e-301,-1.643286656713427e-301,-1.6232465767535072e-301,-1.6032064967935872e-301,-1.5831664168336675e-301,-1.5631263368737475e-301,-1.5430862569138278e-301,-1.523046176953908e-301,-1.503006096993988e-301,-1.4829660170340683e-301,-1.4629259370741486e-301,-1.4428858571142286e-301,-1.4228457771543089e-301,-1.402805697194389e-301,-1.382765617234469e-301,-1.3627255372745492e-301,-1.3426854573146293e-301,-1.3226453773547095e-301,-1.3026052973947896e-301,-1.2825652174348698e-301,-1.26252513747495e-301,-1.2424850575150301e-301,-1.2224449775551104e-301,-1.2024048975951904e-301,-1.1823648176352707e-301,-1.162324737675351e-301,-1.142284657715431e-301,-1.1222445777555112e-301,-1.1022044977955913e-301,-1.0821644178356715e-301,-1.0621243378757514e-301,-1.0420842579158314e-301,-1.0220441779559117e-301,-1.002004097995992e-301,-9.81964018036072e-302,-9.619239380761522e-302,-9.418838581162325e-302,-9.218437781563127e-302,-9.018036981963928e-302,-8.81763618236473e-302,-8.617235382765532e-302,-8.416834583166334e-302,-8.216433783567134e-302,-8.016032983967936e-302,-7.815632184368737e-302,-7.61523138476954e-302,-7.414830585170341e-302,-7.214429785571143e-302,-7.014028985971944e-302,-6.813628186372747e-302,-6.613227386773547e-302,-6.412826587174349e-302,-6.21242578757515e-302,-6.012024987975952e-302,-5.811624188376754e-302,-5.611223388777556e-302,-5.410822589178357e-302,-5.210421789579159e-302,-5.01002098997996e-302,-4.809620190380762e-302,-4.6092193907815634e-302,-4.4088185911823644e-302,-4.2084177915831664e-302,-4.008016991983968e-302,-3.80761619238477e-302,-3.607215392785571e-302,-3.406814593186373e-302,-3.2064137935871745e-302,-3.006012993987976e-302,-2.8056121943887775e-302,-2.605211394789579e-302,-2.404810595190381e-302,-2.2044097955911823e-302,-2.004008995991984e-302,-1.8036081963927856e-302,-1.6032073967935873e-302,-1.4028065971943888e-302,-1.2024057975951906e-302,-1.002004997995992e-302,-8.016041983967936e-303,-6.012033987975951e-303,-4.0080259919839685e-303,-2.004017995991984e-303,-1.0e-308],"x":[-1.0e-300,-9.979959920040082e-301,-9.959919840080161e-301,-9.93987976012024e-301,-9.91983968016032e-301,-9.899799600200401e-301,-9.879759520240481e-301,-9.859719440280562e-301,-9.839679360320642e-301,-9.819639280360723e-301,-9.799599200400803e-301,-9.779559120440882e-301,-9.75951904048096e-301,-9.739478960521041e-301,-9.719438880561123e-301,-9.699398800601202e-301,-9.679358720641283e-301,-9.659318640681363e-301,-9.639278560721442e-301,-9.619238480761522e-301,-9.599198400801603e-301,-9.579158320841683e-301,-9.559118240881764e-301,-9.539078160921844e-301,-9.519038080961925e-301,-9.498998001002004e-301,-9.478957921042084e-301,-9.458917841082164e-301,-9.438877761122243e-301,-9.418837681162325e-301,-9.398797601202406e-301,-9.378757521242485e-301,-9.358717441282567e-301,-9.338677361322646e-301,-9.318637281362724e-301,-9.298597201402806e-301,-9.278557121442885e-301,-9.258517041482966e-301,-9.238476961523046e-301,-9.218436881563127e-301,-9.198396801603207e-301,-9.178356721643288e-301,-9.158316641683366e-301,-9.138276561723447e-301,-9.118236481763527e-301,-9.098196401803608e-301,-9.078156321843687e-301,-9.058116241883769e-301,-9.038076161923849e-301,-9.018036081963928e-301,-8.997996002004008e-301,-8.977955922044087e-301,-8.957915842084168e-301,-8.93787576212425e-301,-8.917835682164329e-301,-8.897795602204409e-301,-8.877755522244491e-301,-8.85771544228457e-301,-8.837675362324649e-301,-8.817635282364728e-301,-8.79759520240481e-301,-8.77755512244489e-301,-8.757515042484969e-301,-8.737474962525051e-301,-8.717434882565132e-301,-8.69739480260521e-301,-8.677354722645291e-301,-8.65731464268537e-301,-8.63727456272545e-301,-8.617234482765532e-301,-8.597194402805611e-301,-8.577154322845691e-301,-8.557114242885772e-301,-8.537074162925852e-301,-8.517034082965931e-301,-8.496994003006012e-301,-8.476953923046092e-301,-8.456913843086173e-301,-8.436873763126253e-301,-8.416833683166334e-301,-8.396793603206412e-301,-8.376753523246494e-301,-8.356713443286573e-301,-8.336673363326652e-301,-8.316633283366734e-301,-8.296593203406813e-301,-8.276553123446893e-301,-8.256513043486976e-301,-8.236472963527054e-301,-8.216432883567135e-301,-8.196392803607215e-301,-8.176352723647294e-301,-8.156312643687375e-301,-8.136272563727455e-301,-8.116232483767535e-301,-8.096192403807616e-301,-8.076152323847696e-301,-8.056112243887777e-301,-8.036072163927854e-301,-8.016032083967936e-301,-7.995992004008017e-301,-7.975951924048095e-301,-7.955911844088178e-301,-7.935871764128258e-301,-7.915831684168337e-301,-7.895791604208417e-301,-7.875751524248496e-301,-7.855711444288577e-301,-7.835671364328657e-301,-7.815631284368737e-301,-7.795591204408818e-301,-7.775551124448898e-301,-7.755511044488979e-301,-7.73547096452906e-301,-7.715430884569136e-301,-7.695390804609219e-301,-7.675350724649299e-301,-7.65531064468938e-301,-7.635270564729458e-301,-7.615230484769539e-301,-7.59519040480962e-301,-7.5751503248497e-301,-7.55511024488978e-301,-7.53507016492986e-301,-7.51503008496994e-301,-7.49499000501002e-301,-7.4749499250501e-301,-7.454909845090181e-301,-7.4348697651302604e-301,-7.414829685170341e-301,-7.3947896052104205e-301,-7.374749525250502e-301,-7.3547094452905814e-301,-7.334669365330661e-301,-7.3146292853707415e-301,-7.294589205410823e-301,-7.274549125450902e-301,-7.254509045490982e-301,-7.2344689655310626e-301,-7.214428885571143e-301,-7.194388805611223e-301,-7.174348725651302e-301,-7.154308645691383e-301,-7.134268565731464e-301,-7.114228485771543e-301,-7.094188405811623e-301,-7.074148325851704e-301,-7.054108245891783e-301,-7.034068165931864e-301,-7.014028085971944e-301,-6.993988006012024e-301,-6.9739479260521044e-301,-6.953907846092185e-301,-6.9338677661322645e-301,-6.913827686172345e-301,-6.8937876062124254e-301,-6.873747526252505e-301,-6.8537074462925855e-301,-6.833667366332666e-301,-6.813627286372746e-301,-6.793587206412826e-301,-6.7735471264529066e-301,-6.753507046492986e-301,-6.733466966533067e-301,-6.7134268865731455e-301,-6.693386806613227e-301,-6.673346726653307e-301,-6.653306646693387e-301,-6.6332665667334665e-301,-6.613226486773548e-301,-6.593186406813627e-301,-6.573146326853708e-301,-6.5531062468937875e-301,-6.533066166933868e-301,-6.513026086973948e-301,-6.492986007014029e-301,-6.472945927054108e-301,-6.452905847094189e-301,-6.4328657671342694e-301,-6.412825687174349e-301,-6.392785607214429e-301,-6.372745527254509e-301,-6.35270544729459e-301,-6.33266536733467e-301,-6.31262528737475e-301,-6.292585207414829e-301,-6.272545127454911e-301,-6.2525050474949894e-301,-6.23246496753507e-301,-6.21242488757515e-301,-6.192384807615231e-301,-6.1723447276553105e-301,-6.152304647695391e-301,-6.1322645677354706e-301,-6.112224487775552e-301,-6.092184407815632e-301,-6.072144327855711e-301,-6.0521042478957916e-301,-6.032064167935872e-301,-6.012024087975952e-301,-5.991984008016032e-301,-5.971943928056113e-301,-5.951903848096192e-301,-5.931863768136273e-301,-5.911823688176353e-301,-5.891783608216433e-301,-5.871743528256513e-301,-5.851703448296594e-301,-5.831663368336673e-301,-5.811623288376754e-301,-5.7915832084168334e-301,-5.771543128456913e-301,-5.751503048496994e-301,-5.731462968537074e-301,-5.7114228885771545e-301,-5.691382808617234e-301,-5.6713427286573146e-301,-5.651302648697395e-301,-5.6312625687374755e-301,-5.611222488777554e-301,-5.5911824088176356e-301,-5.571142328857716e-301,-5.551102248897796e-301,-5.531062168937875e-301,-5.511022088977957e-301,-5.490982009018036e-301,-5.470941929058117e-301,-5.450901849098196e-301,-5.430861769138276e-301,-5.410821689178357e-301,-5.390781609218438e-301,-5.3707415292585165e-301,-5.350701449298597e-301,-5.3306613693386774e-301,-5.310621289378758e-301,-5.2905812094188375e-301,-5.270541129458917e-301,-5.2505010494989985e-301,-5.230460969539079e-301,-5.210420889579158e-301,-5.190380809619238e-301,-5.1703407296593195e-301,-5.150300649699399e-301,-5.130260569739479e-301,-5.110220489779559e-301,-5.090180409819639e-301,-5.07014032985972e-301,-5.0501002498998e-301,-5.030060169939879e-301,-5.01002008997996e-301,-4.989980010020041e-301,-4.96993993006012e-301,-4.9498998501002e-301,-4.929859770140281e-301,-4.909819690180361e-301,-4.889779610220441e-301,-4.869739530260521e-301,-4.849699450300601e-301,-4.829659370340682e-301,-4.809619290380761e-301,-4.789579210420842e-301,-4.769539130460922e-301,-4.749499050501002e-301,-4.729458970541082e-301,-4.709418890581163e-301,-4.689378810621242e-301,-4.669338730661323e-301,-4.649298650701403e-301,-4.629258570741483e-301,-4.609218490781563e-301,-4.589178410821644e-301,-4.569138330861723e-301,-4.549098250901804e-301,-4.529058170941884e-301,-4.509018090981964e-301,-4.488978011022044e-301,-4.468937931062125e-301,-4.4488978511022045e-301,-4.428857771142285e-301,-4.408817691182364e-301,-4.388777611222445e-301,-4.3687375312625255e-301,-4.348697451302605e-301,-4.328657371342685e-301,-4.308617291382766e-301,-4.288577211422846e-301,-4.268537131462926e-301,-4.248497051503006e-301,-4.228456971543086e-301,-4.208416891583167e-301,-4.188376811623247e-301,-4.168336731663326e-301,-4.1482966517034065e-301,-4.128256571743488e-301,-4.108216491783567e-301,-4.088176411823647e-301,-4.0681363318637275e-301,-4.048096251903808e-301,-4.028056171943888e-301,-4.008016091983968e-301,-3.987976012024048e-301,-3.967935932064129e-301,-3.947895852104209e-301,-3.927855772144288e-301,-3.907815692184369e-301,-3.887775612224449e-301,-3.86773553226453e-301,-3.847695452304609e-301,-3.82765537234469e-301,-3.807615292384769e-301,-3.78757521242485e-301,-3.76753513246493e-301,-3.74749505250501e-301,-3.7274549725450904e-301,-3.7074148925851704e-301,-3.687374812625251e-301,-3.6673347326653305e-301,-3.6472946527054114e-301,-3.627254572745491e-301,-3.6072144927855715e-301,-3.587174412825651e-301,-3.567134332865732e-301,-3.5470942529058116e-301,-3.527054172945892e-301,-3.507014092985972e-301,-3.486974013026052e-301,-3.4669339330661322e-301,-3.4468938531062127e-301,-3.4268537731462927e-301,-3.4068136931863728e-301,-3.3867736132264532e-301,-3.3667335332665333e-301,-3.3466934533066133e-301,-3.3266533733466934e-301,-3.306613293386774e-301,-3.286573213426854e-301,-3.266533133466934e-301,-3.2464930535070144e-301,-3.2264529735470944e-301,-3.2064128935871745e-301,-3.186372813627255e-301,-3.166332733667335e-301,-3.1462926537074146e-301,-3.126252573747495e-301,-3.106212493787575e-301,-3.0861724138276556e-301,-3.0661323338677352e-301,-3.046092253907816e-301,-3.0260521739478957e-301,-3.0060120939879762e-301,-2.9859720140280563e-301,-2.9659319340681367e-301,-2.9458918541082164e-301,-2.9258517741482972e-301,-2.905811694188377e-301,-2.8857716142284573e-301,-2.865731534268537e-301,-2.8456914543086174e-301,-2.8256513743486975e-301,-2.805611294388777e-301,-2.785571214428858e-301,-2.7655311344689376e-301,-2.745491054509018e-301,-2.725450974549098e-301,-2.7054108945891786e-301,-2.6853708146292582e-301,-2.6653307346693387e-301,-2.6452906547094187e-301,-2.625250574749499e-301,-2.605210494789579e-301,-2.5851704148296597e-301,-2.5651303348697393e-301,-2.5450902549098198e-301,-2.5250501749499e-301,-2.50501009498998e-301,-2.48497001503006e-301,-2.4649299350701404e-301,-2.4448898551102204e-301,-2.4248497751503005e-301,-2.4048096951903805e-301,-2.384769615230461e-301,-2.364729535270541e-301,-2.344689455310621e-301,-2.3246493753507016e-301,-2.3046092953907816e-301,-2.2845692154308617e-301,-2.264529135470942e-301,-2.244489055511022e-301,-2.2244489755511022e-301,-2.204408895591182e-301,-2.1843688156312627e-301,-2.1643287356713423e-301,-2.144288655711423e-301,-2.124248575751503e-301,-2.1042084957915833e-301,-2.084168415831663e-301,-2.064128335871744e-301,-2.0440882559118235e-301,-2.024048175951904e-301,-2.004008095991984e-301,-1.9839680160320644e-301,-1.963927936072144e-301,-1.9438878561122245e-301,-1.9238477761523046e-301,-1.9038076961923846e-301,-1.883767616232465e-301,-1.8637275362725451e-301,-1.8436874563126254e-301,-1.8236473763527056e-301,-1.8036072963927857e-301,-1.783567216432866e-301,-1.763527136472946e-301,-1.7434870565130262e-301,-1.7234469765531065e-301,-1.7034068965931863e-301,-1.6833668166332666e-301,-1.6633267366733466e-301,-1.643286656713427e-301,-1.6232465767535072e-301,-1.6032064967935872e-301,-1.5831664168336675e-301,-1.5631263368737475e-301,-1.5430862569138278e-301,-1.523046176953908e-301,-1.503006096993988e-301,-1.4829660170340683e-301,-1.4629259370741486e-301,-1.4428858571142286e-301,-1.4228457771543089e-301,-1.402805697194389e-301,-1.382765617234469e-301,-1.3627255372745492e-301,-1.3426854573146293e-301,-1.3226453773547095e-301,-1.3026052973947896e-301,-1.2825652174348698e-301,-1.26252513747495e-301,-1.2424850575150301e-301,-1.2224449775551104e-301,-1.2024048975951904e-301,-1.1823648176352707e-301,-1.162324737675351e-301,-1.142284657715431e-301,-1.1222445777555112e-301,-1.1022044977955913e-301,-1.0821644178356715e-301,-1.0621243378757514e-301,-1.0420842579158314e-301,-1.0220441779559117e-301,-1.002004097995992e-301,-9.81964018036072e-302,-9.619239380761522e-302,-9.418838581162325e-302,-9.218437781563127e-302,-9.018036981963928e-302,-8.81763618236473e-302,-8.617235382765532e-302,-8.416834583166334e-302,-8.216433783567134e-302,-8.016032983967936e-302,-7.815632184368737e-302,-7.61523138476954e-302,-7.414830585170341e-302,-7.214429785571143e-302,-7.014028985971944e-302,-6.813628186372747e-302,-6.613227386773547e-302,-6.412826587174349e-302,-6.21242578757515e-302,-6.012024987975952e-302,-5.811624188376754e-302,-5.611223388777556e-302,-5.410822589178357e-302,-5.210421789579159e-302,-5.01002098997996e-302,-4.809620190380762e-302,-4.6092193907815634e-302,-4.4088185911823644e-302,-4.2084177915831664e-302,-4.008016991983968e-302,-3.80761619238477e-302,-3.607215392785571e-302,-3.406814593186373e-302,-3.2064137935871745e-302,-3.006012993987976e-302,-2.8056121943887775e-302,-2.605211394789579e-302,-2.404810595190381e-302,-2.2044097955911823e-302,-2.004008995991984e-302,-1.8036081963927856e-302,-1.6032073967935873e-302,-1.4028065971943888e-302,-1.2024057975951906e-302,-1.002004997995992e-302,-8.016041983967936e-303,-6.012033987975951e-303,-4.0080259919839685e-303,-2.004017995991984e-303,-1.0e-308]}
},{}],74:[function(require,module,exports){
module.exports={"expected":[1.0e-300,9.979959920040082e-301,9.959919840080161e-301,9.93987976012024e-301,9.91983968016032e-301,9.899799600200401e-301,9.879759520240481e-301,9.859719440280562e-301,9.839679360320642e-301,9.819639280360723e-301,9.799599200400803e-301,9.779559120440882e-301,9.75951904048096e-301,9.739478960521041e-301,9.719438880561123e-301,9.699398800601202e-301,9.679358720641283e-301,9.659318640681363e-301,9.639278560721442e-301,9.619238480761522e-301,9.599198400801603e-301,9.579158320841683e-301,9.559118240881764e-301,9.539078160921844e-301,9.519038080961925e-301,9.498998001002004e-301,9.478957921042084e-301,9.458917841082164e-301,9.438877761122243e-301,9.418837681162325e-301,9.398797601202406e-301,9.378757521242485e-301,9.358717441282567e-301,9.338677361322646e-301,9.318637281362724e-301,9.298597201402806e-301,9.278557121442885e-301,9.258517041482966e-301,9.238476961523046e-301,9.218436881563127e-301,9.198396801603207e-301,9.178356721643288e-301,9.158316641683366e-301,9.138276561723447e-301,9.118236481763527e-301,9.098196401803608e-301,9.078156321843687e-301,9.058116241883769e-301,9.038076161923849e-301,9.018036081963928e-301,8.997996002004008e-301,8.977955922044087e-301,8.957915842084168e-301,8.93787576212425e-301,8.917835682164329e-301,8.897795602204409e-301,8.877755522244491e-301,8.85771544228457e-301,8.837675362324649e-301,8.817635282364728e-301,8.79759520240481e-301,8.77755512244489e-301,8.757515042484969e-301,8.737474962525051e-301,8.717434882565132e-301,8.69739480260521e-301,8.677354722645291e-301,8.65731464268537e-301,8.63727456272545e-301,8.617234482765532e-301,8.597194402805611e-301,8.577154322845691e-301,8.557114242885772e-301,8.537074162925852e-301,8.517034082965931e-301,8.496994003006012e-301,8.476953923046092e-301,8.456913843086173e-301,8.436873763126253e-301,8.416833683166334e-301,8.396793603206412e-301,8.376753523246494e-301,8.356713443286573e-301,8.336673363326652e-301,8.316633283366734e-301,8.296593203406813e-301,8.276553123446893e-301,8.256513043486976e-301,8.236472963527054e-301,8.216432883567135e-301,8.196392803607215e-301,8.176352723647294e-301,8.156312643687375e-301,8.136272563727455e-301,8.116232483767535e-301,8.096192403807616e-301,8.076152323847696e-301,8.056112243887777e-301,8.036072163927854e-301,8.016032083967936e-301,7.995992004008017e-301,7.975951924048095e-301,7.955911844088178e-301,7.935871764128258e-301,7.915831684168337e-301,7.895791604208417e-301,7.875751524248496e-301,7.855711444288577e-301,7.835671364328657e-301,7.815631284368737e-301,7.795591204408818e-301,7.775551124448898e-301,7.755511044488979e-301,7.73547096452906e-301,7.715430884569136e-301,7.695390804609219e-301,7.675350724649299e-301,7.65531064468938e-301,7.635270564729458e-301,7.615230484769539e-301,7.59519040480962e-301,7.5751503248497e-301,7.55511024488978e-301,7.53507016492986e-301,7.51503008496994e-301,7.49499000501002e-301,7.4749499250501e-301,7.454909845090181e-301,7.4348697651302604e-301,7.414829685170341e-301,7.3947896052104205e-301,7.374749525250502e-301,7.3547094452905814e-301,7.334669365330661e-301,7.3146292853707415e-301,7.294589205410823e-301,7.274549125450902e-301,7.254509045490982e-301,7.2344689655310626e-301,7.214428885571143e-301,7.194388805611223e-301,7.174348725651302e-301,7.154308645691383e-301,7.134268565731464e-301,7.114228485771543e-301,7.094188405811623e-301,7.074148325851704e-301,7.054108245891783e-301,7.034068165931864e-301,7.014028085971944e-301,6.993988006012024e-301,6.9739479260521044e-301,6.953907846092185e-301,6.9338677661322645e-301,6.913827686172345e-301,6.8937876062124254e-301,6.873747526252505e-301,6.8537074462925855e-301,6.833667366332666e-301,6.813627286372746e-301,6.793587206412826e-301,6.7735471264529066e-301,6.753507046492986e-301,6.733466966533067e-301,6.7134268865731455e-301,6.693386806613227e-301,6.673346726653307e-301,6.653306646693387e-301,6.6332665667334665e-301,6.613226486773548e-301,6.593186406813627e-301,6.573146326853708e-301,6.5531062468937875e-301,6.533066166933868e-301,6.513026086973948e-301,6.492986007014029e-301,6.472945927054108e-301,6.452905847094189e-301,6.4328657671342694e-301,6.412825687174349e-301,6.392785607214429e-301,6.372745527254509e-301,6.35270544729459e-301,6.33266536733467e-301,6.31262528737475e-301,6.292585207414829e-301,6.272545127454911e-301,6.2525050474949894e-301,6.23246496753507e-301,6.21242488757515e-301,6.192384807615231e-301,6.1723447276553105e-301,6.152304647695391e-301,6.1322645677354706e-301,6.112224487775552e-301,6.092184407815632e-301,6.072144327855711e-301,6.0521042478957916e-301,6.032064167935872e-301,6.012024087975952e-301,5.991984008016032e-301,5.971943928056113e-301,5.951903848096192e-301,5.931863768136273e-301,5.911823688176353e-301,5.891783608216433e-301,5.871743528256513e-301,5.851703448296594e-301,5.831663368336673e-301,5.811623288376754e-301,5.7915832084168334e-301,5.771543128456913e-301,5.751503048496994e-301,5.731462968537074e-301,5.7114228885771545e-301,5.691382808617234e-301,5.6713427286573146e-301,5.651302648697395e-301,5.6312625687374755e-301,5.611222488777554e-301,5.5911824088176356e-301,5.571142328857716e-301,5.551102248897796e-301,5.531062168937875e-301,5.511022088977957e-301,5.490982009018036e-301,5.470941929058117e-301,5.450901849098196e-301,5.430861769138276e-301,5.410821689178357e-301,5.390781609218438e-301,5.3707415292585165e-301,5.350701449298597e-301,5.3306613693386774e-301,5.310621289378758e-301,5.2905812094188375e-301,5.270541129458917e-301,5.2505010494989985e-301,5.230460969539079e-301,5.210420889579158e-301,5.190380809619238e-301,5.1703407296593195e-301,5.150300649699399e-301,5.130260569739479e-301,5.110220489779559e-301,5.090180409819639e-301,5.07014032985972e-301,5.0501002498998e-301,5.030060169939879e-301,5.01002008997996e-301,4.989980010020041e-301,4.96993993006012e-301,4.9498998501002e-301,4.929859770140281e-301,4.909819690180361e-301,4.889779610220441e-301,4.869739530260521e-301,4.849699450300601e-301,4.829659370340682e-301,4.809619290380761e-301,4.789579210420842e-301,4.769539130460922e-301,4.749499050501002e-301,4.729458970541082e-301,4.709418890581163e-301,4.689378810621242e-301,4.669338730661323e-301,4.649298650701403e-301,4.629258570741483e-301,4.609218490781563e-301,4.589178410821644e-301,4.569138330861723e-301,4.549098250901804e-301,4.529058170941884e-301,4.509018090981964e-301,4.488978011022044e-301,4.468937931062125e-301,4.4488978511022045e-301,4.428857771142285e-301,4.408817691182364e-301,4.388777611222445e-301,4.3687375312625255e-301,4.348697451302605e-301,4.328657371342685e-301,4.308617291382766e-301,4.288577211422846e-301,4.268537131462926e-301,4.248497051503006e-301,4.228456971543086e-301,4.208416891583167e-301,4.188376811623247e-301,4.168336731663326e-301,4.1482966517034065e-301,4.128256571743488e-301,4.108216491783567e-301,4.088176411823647e-301,4.0681363318637275e-301,4.048096251903808e-301,4.028056171943888e-301,4.008016091983968e-301,3.987976012024048e-301,3.967935932064129e-301,3.947895852104209e-301,3.927855772144288e-301,3.907815692184369e-301,3.887775612224449e-301,3.86773553226453e-301,3.847695452304609e-301,3.82765537234469e-301,3.807615292384769e-301,3.78757521242485e-301,3.76753513246493e-301,3.74749505250501e-301,3.7274549725450904e-301,3.7074148925851704e-301,3.687374812625251e-301,3.6673347326653305e-301,3.6472946527054114e-301,3.627254572745491e-301,3.6072144927855715e-301,3.587174412825651e-301,3.567134332865732e-301,3.5470942529058116e-301,3.527054172945892e-301,3.507014092985972e-301,3.486974013026052e-301,3.4669339330661322e-301,3.4468938531062127e-301,3.4268537731462927e-301,3.4068136931863728e-301,3.3867736132264532e-301,3.3667335332665333e-301,3.3466934533066133e-301,3.3266533733466934e-301,3.306613293386774e-301,3.286573213426854e-301,3.266533133466934e-301,3.2464930535070144e-301,3.2264529735470944e-301,3.2064128935871745e-301,3.186372813627255e-301,3.166332733667335e-301,3.1462926537074146e-301,3.126252573747495e-301,3.106212493787575e-301,3.0861724138276556e-301,3.0661323338677352e-301,3.046092253907816e-301,3.0260521739478957e-301,3.0060120939879762e-301,2.9859720140280563e-301,2.9659319340681367e-301,2.9458918541082164e-301,2.9258517741482972e-301,2.905811694188377e-301,2.8857716142284573e-301,2.865731534268537e-301,2.8456914543086174e-301,2.8256513743486975e-301,2.805611294388777e-301,2.785571214428858e-301,2.7655311344689376e-301,2.745491054509018e-301,2.725450974549098e-301,2.7054108945891786e-301,2.6853708146292582e-301,2.6653307346693387e-301,2.6452906547094187e-301,2.625250574749499e-301,2.605210494789579e-301,2.5851704148296597e-301,2.5651303348697393e-301,2.5450902549098198e-301,2.5250501749499e-301,2.50501009498998e-301,2.48497001503006e-301,2.4649299350701404e-301,2.4448898551102204e-301,2.4248497751503005e-301,2.4048096951903805e-301,2.384769615230461e-301,2.364729535270541e-301,2.344689455310621e-301,2.3246493753507016e-301,2.3046092953907816e-301,2.2845692154308617e-301,2.264529135470942e-301,2.244489055511022e-301,2.2244489755511022e-301,2.204408895591182e-301,2.1843688156312627e-301,2.1643287356713423e-301,2.144288655711423e-301,2.124248575751503e-301,2.1042084957915833e-301,2.084168415831663e-301,2.064128335871744e-301,2.0440882559118235e-301,2.024048175951904e-301,2.004008095991984e-301,1.9839680160320644e-301,1.963927936072144e-301,1.9438878561122245e-301,1.9238477761523046e-301,1.9038076961923846e-301,1.883767616232465e-301,1.8637275362725451e-301,1.8436874563126254e-301,1.8236473763527056e-301,1.8036072963927857e-301,1.783567216432866e-301,1.763527136472946e-301,1.7434870565130262e-301,1.7234469765531065e-301,1.7034068965931863e-301,1.6833668166332666e-301,1.6633267366733466e-301,1.643286656713427e-301,1.6232465767535072e-301,1.6032064967935872e-301,1.5831664168336675e-301,1.5631263368737475e-301,1.5430862569138278e-301,1.523046176953908e-301,1.503006096993988e-301,1.4829660170340683e-301,1.4629259370741486e-301,1.4428858571142286e-301,1.4228457771543089e-301,1.402805697194389e-301,1.382765617234469e-301,1.3627255372745492e-301,1.3426854573146293e-301,1.3226453773547095e-301,1.3026052973947896e-301,1.2825652174348698e-301,1.26252513747495e-301,1.2424850575150301e-301,1.2224449775551104e-301,1.2024048975951904e-301,1.1823648176352707e-301,1.162324737675351e-301,1.142284657715431e-301,1.1222445777555112e-301,1.1022044977955913e-301,1.0821644178356715e-301,1.0621243378757514e-301,1.0420842579158314e-301,1.0220441779559117e-301,1.002004097995992e-301,9.81964018036072e-302,9.619239380761522e-302,9.418838581162325e-302,9.218437781563127e-302,9.018036981963928e-302,8.81763618236473e-302,8.617235382765532e-302,8.416834583166334e-302,8.216433783567134e-302,8.016032983967936e-302,7.815632184368737e-302,7.61523138476954e-302,7.414830585170341e-302,7.214429785571143e-302,7.014028985971944e-302,6.813628186372747e-302,6.613227386773547e-302,6.412826587174349e-302,6.21242578757515e-302,6.012024987975952e-302,5.811624188376754e-302,5.611223388777556e-302,5.410822589178357e-302,5.210421789579159e-302,5.01002098997996e-302,4.809620190380762e-302,4.6092193907815634e-302,4.4088185911823644e-302,4.2084177915831664e-302,4.008016991983968e-302,3.80761619238477e-302,3.607215392785571e-302,3.406814593186373e-302,3.2064137935871745e-302,3.006012993987976e-302,2.8056121943887775e-302,2.605211394789579e-302,2.404810595190381e-302,2.2044097955911823e-302,2.004008995991984e-302,1.8036081963927856e-302,1.6032073967935873e-302,1.4028065971943888e-302,1.2024057975951906e-302,1.002004997995992e-302,8.016041983967936e-303,6.012033987975951e-303,4.0080259919839685e-303,2.004017995991984e-303,1.0e-308],"x":[1.0e-300,9.979959920040082e-301,9.959919840080161e-301,9.93987976012024e-301,9.91983968016032e-301,9.899799600200401e-301,9.879759520240481e-301,9.859719440280562e-301,9.839679360320642e-301,9.819639280360723e-301,9.799599200400803e-301,9.779559120440882e-301,9.75951904048096e-301,9.739478960521041e-301,9.719438880561123e-301,9.699398800601202e-301,9.679358720641283e-301,9.659318640681363e-301,9.639278560721442e-301,9.619238480761522e-301,9.599198400801603e-301,9.579158320841683e-301,9.559118240881764e-301,9.539078160921844e-301,9.519038080961925e-301,9.498998001002004e-301,9.478957921042084e-301,9.458917841082164e-301,9.438877761122243e-301,9.418837681162325e-301,9.398797601202406e-301,9.378757521242485e-301,9.358717441282567e-301,9.338677361322646e-301,9.318637281362724e-301,9.298597201402806e-301,9.278557121442885e-301,9.258517041482966e-301,9.238476961523046e-301,9.218436881563127e-301,9.198396801603207e-301,9.178356721643288e-301,9.158316641683366e-301,9.138276561723447e-301,9.118236481763527e-301,9.098196401803608e-301,9.078156321843687e-301,9.058116241883769e-301,9.038076161923849e-301,9.018036081963928e-301,8.997996002004008e-301,8.977955922044087e-301,8.957915842084168e-301,8.93787576212425e-301,8.917835682164329e-301,8.897795602204409e-301,8.877755522244491e-301,8.85771544228457e-301,8.837675362324649e-301,8.817635282364728e-301,8.79759520240481e-301,8.77755512244489e-301,8.757515042484969e-301,8.737474962525051e-301,8.717434882565132e-301,8.69739480260521e-301,8.677354722645291e-301,8.65731464268537e-301,8.63727456272545e-301,8.617234482765532e-301,8.597194402805611e-301,8.577154322845691e-301,8.557114242885772e-301,8.537074162925852e-301,8.517034082965931e-301,8.496994003006012e-301,8.476953923046092e-301,8.456913843086173e-301,8.436873763126253e-301,8.416833683166334e-301,8.396793603206412e-301,8.376753523246494e-301,8.356713443286573e-301,8.336673363326652e-301,8.316633283366734e-301,8.296593203406813e-301,8.276553123446893e-301,8.256513043486976e-301,8.236472963527054e-301,8.216432883567135e-301,8.196392803607215e-301,8.176352723647294e-301,8.156312643687375e-301,8.136272563727455e-301,8.116232483767535e-301,8.096192403807616e-301,8.076152323847696e-301,8.056112243887777e-301,8.036072163927854e-301,8.016032083967936e-301,7.995992004008017e-301,7.975951924048095e-301,7.955911844088178e-301,7.935871764128258e-301,7.915831684168337e-301,7.895791604208417e-301,7.875751524248496e-301,7.855711444288577e-301,7.835671364328657e-301,7.815631284368737e-301,7.795591204408818e-301,7.775551124448898e-301,7.755511044488979e-301,7.73547096452906e-301,7.715430884569136e-301,7.695390804609219e-301,7.675350724649299e-301,7.65531064468938e-301,7.635270564729458e-301,7.615230484769539e-301,7.59519040480962e-301,7.5751503248497e-301,7.55511024488978e-301,7.53507016492986e-301,7.51503008496994e-301,7.49499000501002e-301,7.4749499250501e-301,7.454909845090181e-301,7.4348697651302604e-301,7.414829685170341e-301,7.3947896052104205e-301,7.374749525250502e-301,7.3547094452905814e-301,7.334669365330661e-301,7.3146292853707415e-301,7.294589205410823e-301,7.274549125450902e-301,7.254509045490982e-301,7.2344689655310626e-301,7.214428885571143e-301,7.194388805611223e-301,7.174348725651302e-301,7.154308645691383e-301,7.134268565731464e-301,7.114228485771543e-301,7.094188405811623e-301,7.074148325851704e-301,7.054108245891783e-301,7.034068165931864e-301,7.014028085971944e-301,6.993988006012024e-301,6.9739479260521044e-301,6.953907846092185e-301,6.9338677661322645e-301,6.913827686172345e-301,6.8937876062124254e-301,6.873747526252505e-301,6.8537074462925855e-301,6.833667366332666e-301,6.813627286372746e-301,6.793587206412826e-301,6.7735471264529066e-301,6.753507046492986e-301,6.733466966533067e-301,6.7134268865731455e-301,6.693386806613227e-301,6.673346726653307e-301,6.653306646693387e-301,6.6332665667334665e-301,6.613226486773548e-301,6.593186406813627e-301,6.573146326853708e-301,6.5531062468937875e-301,6.533066166933868e-301,6.513026086973948e-301,6.492986007014029e-301,6.472945927054108e-301,6.452905847094189e-301,6.4328657671342694e-301,6.412825687174349e-301,6.392785607214429e-301,6.372745527254509e-301,6.35270544729459e-301,6.33266536733467e-301,6.31262528737475e-301,6.292585207414829e-301,6.272545127454911e-301,6.2525050474949894e-301,6.23246496753507e-301,6.21242488757515e-301,6.192384807615231e-301,6.1723447276553105e-301,6.152304647695391e-301,6.1322645677354706e-301,6.112224487775552e-301,6.092184407815632e-301,6.072144327855711e-301,6.0521042478957916e-301,6.032064167935872e-301,6.012024087975952e-301,5.991984008016032e-301,5.971943928056113e-301,5.951903848096192e-301,5.931863768136273e-301,5.911823688176353e-301,5.891783608216433e-301,5.871743528256513e-301,5.851703448296594e-301,5.831663368336673e-301,5.811623288376754e-301,5.7915832084168334e-301,5.771543128456913e-301,5.751503048496994e-301,5.731462968537074e-301,5.7114228885771545e-301,5.691382808617234e-301,5.6713427286573146e-301,5.651302648697395e-301,5.6312625687374755e-301,5.611222488777554e-301,5.5911824088176356e-301,5.571142328857716e-301,5.551102248897796e-301,5.531062168937875e-301,5.511022088977957e-301,5.490982009018036e-301,5.470941929058117e-301,5.450901849098196e-301,5.430861769138276e-301,5.410821689178357e-301,5.390781609218438e-301,5.3707415292585165e-301,5.350701449298597e-301,5.3306613693386774e-301,5.310621289378758e-301,5.2905812094188375e-301,5.270541129458917e-301,5.2505010494989985e-301,5.230460969539079e-301,5.210420889579158e-301,5.190380809619238e-301,5.1703407296593195e-301,5.150300649699399e-301,5.130260569739479e-301,5.110220489779559e-301,5.090180409819639e-301,5.07014032985972e-301,5.0501002498998e-301,5.030060169939879e-301,5.01002008997996e-301,4.989980010020041e-301,4.96993993006012e-301,4.9498998501002e-301,4.929859770140281e-301,4.909819690180361e-301,4.889779610220441e-301,4.869739530260521e-301,4.849699450300601e-301,4.829659370340682e-301,4.809619290380761e-301,4.789579210420842e-301,4.769539130460922e-301,4.749499050501002e-301,4.729458970541082e-301,4.709418890581163e-301,4.689378810621242e-301,4.669338730661323e-301,4.649298650701403e-301,4.629258570741483e-301,4.609218490781563e-301,4.589178410821644e-301,4.569138330861723e-301,4.549098250901804e-301,4.529058170941884e-301,4.509018090981964e-301,4.488978011022044e-301,4.468937931062125e-301,4.4488978511022045e-301,4.428857771142285e-301,4.408817691182364e-301,4.388777611222445e-301,4.3687375312625255e-301,4.348697451302605e-301,4.328657371342685e-301,4.308617291382766e-301,4.288577211422846e-301,4.268537131462926e-301,4.248497051503006e-301,4.228456971543086e-301,4.208416891583167e-301,4.188376811623247e-301,4.168336731663326e-301,4.1482966517034065e-301,4.128256571743488e-301,4.108216491783567e-301,4.088176411823647e-301,4.0681363318637275e-301,4.048096251903808e-301,4.028056171943888e-301,4.008016091983968e-301,3.987976012024048e-301,3.967935932064129e-301,3.947895852104209e-301,3.927855772144288e-301,3.907815692184369e-301,3.887775612224449e-301,3.86773553226453e-301,3.847695452304609e-301,3.82765537234469e-301,3.807615292384769e-301,3.78757521242485e-301,3.76753513246493e-301,3.74749505250501e-301,3.7274549725450904e-301,3.7074148925851704e-301,3.687374812625251e-301,3.6673347326653305e-301,3.6472946527054114e-301,3.627254572745491e-301,3.6072144927855715e-301,3.587174412825651e-301,3.567134332865732e-301,3.5470942529058116e-301,3.527054172945892e-301,3.507014092985972e-301,3.486974013026052e-301,3.4669339330661322e-301,3.4468938531062127e-301,3.4268537731462927e-301,3.4068136931863728e-301,3.3867736132264532e-301,3.3667335332665333e-301,3.3466934533066133e-301,3.3266533733466934e-301,3.306613293386774e-301,3.286573213426854e-301,3.266533133466934e-301,3.2464930535070144e-301,3.2264529735470944e-301,3.2064128935871745e-301,3.186372813627255e-301,3.166332733667335e-301,3.1462926537074146e-301,3.126252573747495e-301,3.106212493787575e-301,3.0861724138276556e-301,3.0661323338677352e-301,3.046092253907816e-301,3.0260521739478957e-301,3.0060120939879762e-301,2.9859720140280563e-301,2.9659319340681367e-301,2.9458918541082164e-301,2.9258517741482972e-301,2.905811694188377e-301,2.8857716142284573e-301,2.865731534268537e-301,2.8456914543086174e-301,2.8256513743486975e-301,2.805611294388777e-301,2.785571214428858e-301,2.7655311344689376e-301,2.745491054509018e-301,2.725450974549098e-301,2.7054108945891786e-301,2.6853708146292582e-301,2.6653307346693387e-301,2.6452906547094187e-301,2.625250574749499e-301,2.605210494789579e-301,2.5851704148296597e-301,2.5651303348697393e-301,2.5450902549098198e-301,2.5250501749499e-301,2.50501009498998e-301,2.48497001503006e-301,2.4649299350701404e-301,2.4448898551102204e-301,2.4248497751503005e-301,2.4048096951903805e-301,2.384769615230461e-301,2.364729535270541e-301,2.344689455310621e-301,2.3246493753507016e-301,2.3046092953907816e-301,2.2845692154308617e-301,2.264529135470942e-301,2.244489055511022e-301,2.2244489755511022e-301,2.204408895591182e-301,2.1843688156312627e-301,2.1643287356713423e-301,2.144288655711423e-301,2.124248575751503e-301,2.1042084957915833e-301,2.084168415831663e-301,2.064128335871744e-301,2.0440882559118235e-301,2.024048175951904e-301,2.004008095991984e-301,1.9839680160320644e-301,1.963927936072144e-301,1.9438878561122245e-301,1.9238477761523046e-301,1.9038076961923846e-301,1.883767616232465e-301,1.8637275362725451e-301,1.8436874563126254e-301,1.8236473763527056e-301,1.8036072963927857e-301,1.783567216432866e-301,1.763527136472946e-301,1.7434870565130262e-301,1.7234469765531065e-301,1.7034068965931863e-301,1.6833668166332666e-301,1.6633267366733466e-301,1.643286656713427e-301,1.6232465767535072e-301,1.6032064967935872e-301,1.5831664168336675e-301,1.5631263368737475e-301,1.5430862569138278e-301,1.523046176953908e-301,1.503006096993988e-301,1.4829660170340683e-301,1.4629259370741486e-301,1.4428858571142286e-301,1.4228457771543089e-301,1.402805697194389e-301,1.382765617234469e-301,1.3627255372745492e-301,1.3426854573146293e-301,1.3226453773547095e-301,1.3026052973947896e-301,1.2825652174348698e-301,1.26252513747495e-301,1.2424850575150301e-301,1.2224449775551104e-301,1.2024048975951904e-301,1.1823648176352707e-301,1.162324737675351e-301,1.142284657715431e-301,1.1222445777555112e-301,1.1022044977955913e-301,1.0821644178356715e-301,1.0621243378757514e-301,1.0420842579158314e-301,1.0220441779559117e-301,1.002004097995992e-301,9.81964018036072e-302,9.619239380761522e-302,9.418838581162325e-302,9.218437781563127e-302,9.018036981963928e-302,8.81763618236473e-302,8.617235382765532e-302,8.416834583166334e-302,8.216433783567134e-302,8.016032983967936e-302,7.815632184368737e-302,7.61523138476954e-302,7.414830585170341e-302,7.214429785571143e-302,7.014028985971944e-302,6.813628186372747e-302,6.613227386773547e-302,6.412826587174349e-302,6.21242578757515e-302,6.012024987975952e-302,5.811624188376754e-302,5.611223388777556e-302,5.410822589178357e-302,5.210421789579159e-302,5.01002098997996e-302,4.809620190380762e-302,4.6092193907815634e-302,4.4088185911823644e-302,4.2084177915831664e-302,4.008016991983968e-302,3.80761619238477e-302,3.607215392785571e-302,3.406814593186373e-302,3.2064137935871745e-302,3.006012993987976e-302,2.8056121943887775e-302,2.605211394789579e-302,2.404810595190381e-302,2.2044097955911823e-302,2.004008995991984e-302,1.8036081963927856e-302,1.6032073967935873e-302,1.4028065971943888e-302,1.2024057975951906e-302,1.002004997995992e-302,8.016041983967936e-303,6.012033987975951e-303,4.0080259919839685e-303,2.004017995991984e-303,1.0e-308]}
},{}],75:[function(require,module,exports){
module.exports={"expected":[6.420676210313675e-11,-0.8038777911311805,-0.8142458028436093,1.4041886947221967,-0.8353033412901791,-0.0606475831655485,-0.6365188089862741,-1.8405787232946678,116.60350734583955,-2.7952223341566635,6.0919123336476915,-0.5764841549691243,0.4175725503248284,3.8093135815419368,-0.7093442520940094,-2.0831181244082067,17.014464282089975,-0.8612526134129307,-2.709698432818781,-7.13174355157908,2.601688560744266,0.4293353267960436,-0.10107136381356235,-0.3258039026859244,-1.0743493883568946,-4.028644658483804,1.6128949237155519,1.0328756789815265,0.3041966755036438,-0.5502048911562253,-0.8721790132560316,-2.76264643162737,2.0648670719108577,0.704181882945005,0.10767406373291669,-0.10737857860325256,-1.2738927672381293,-6.225929521266461,18.173021755416542,1.5906476961169558,1.0200622611875778,0.29739271569763853,-1.032272123258767,-0.8832249858564539,4.033683599411699,1.0749788523197985,0.3261270479649738,-0.1933729258335968,-0.11369425058118066,-0.7131158177889936,7.146924403919263,1.3283924175339554,0.44566847749380833,-0.08724059192729668,-0.009213332540728893,-1.9625880566541516,-1.6345214472369136,1.6633866167681703,0.5768734056810702,0.016976418818782597,0.09506683871678472,-1.5422951469768087,-1.307152738825859,0.6123197324405513,0.7248900389504579,0.8509465189534449,-0.40556715829983414,-0.3175613148236002,-5.723665966102232,-3.9037009993327305,0.8971371635442151,0.22883843697504858,-0.2889638212484795,-0.20635037143737087,-3.5178015576265267,-2.69946969519367,6.550230424437079,0.34136322361763227,-0.1791879922459079,-0.8145873101550886,-2.4967330984694325,7.938473808567639,1.3669982197130244,0.4622024483885601,-0.07344286534009538,-0.654564774114416,-1.8978139652745376,-0.45133446475070077,-1.3415158174554054,0.5952913710867501,0.030693447184778892,0.829656604804913,0.18848384362840684,-12.06705391955472,-0.020938583323865417,0.7460139284673089,0.13549911030962664,-0.3896904858671354,0.2987321989361268,-5.294492981408673,3.021747905260053,0.9221896554069567,6.04371650192898,1.2615945073817074,-0.9771831590070986,-3.3428695745982977,4.566242047333659,1.1358912280848423,0.3567426819808765,-0.16507258260303442,-0.7920320918800604,-2.400842558585001,8.923362890801734,-1.6300136640988163,-22.705035322965465,-0.05967289647827157,-0.6351550036982474,0.09630829403668156,-0.4349333242988605,1.7716302137836974,0.6140124421338432,0.04442202476110123,-0.4977842346825138,-1.453395478652674,-10.342330431151174,-1.0557811298530368,0.7675743834239094,0.14948669295377456,1.0510202065026366,0.31372697875251415,-0.20506812275542013,3.1666449724669348,-2.6893086692427413,0.2578817954106573,-0.2594825470729242,-0.9507361965526082,-3.1832693230390987,4.885817033751832,1.167786986687064,0.37227331855873885,1.6217911413826471,0.5619774387053401,-2.3110633881787117,10.18282161362798,-1.580973296076437,-17.304668985548055,-0.045925439856852095,-0.616080351852782,-1.777856239442616,-163.81593762185844,1.8297834259530188,-6.1295750716728445,2.7865886439730403,-0.4807931462524001,-1.4115590320273605,-0.3011919897148225,-1.0272028562604942,-3.6744568807694664,-1.5783295157036343,1.080296478227484,-1.1393332787410964,-0.19082175035170562,0.512156841816323,-2.5804570454154385,-0.5983519464214826,0.12329294193224884,-0.9249698081616351,0.8783760628270371,5.251278493127663,-0.3003671789635501,0.38796329968224236,-3.6635185040626497,-8.08558430365188,0.019437618463844494,0.8108399951043364,-1.5340137230785584,-0.34388488042714604,-2.574675381316005,0.2733680460941407,0.1240608936500684,-50.46438541000314,-1.2323359665984586,0.6524236882750576,2.9115300666195427,-0.4640245885325898,0.23142912657823686,-8.03568335169086,-0.9994183305382952,0.812094438871402,4.33245139568583,-0.3430392708058564,2.157194567659788,-4.313550088819176,0.12482898950668217,-0.019233894699793825,8.09912405046264,-1.671919456278828,0.46519185104495636,-2.9024572153291306,0.2322261597287096,1.2347568120628107,-0.9979075878015305,-1.3346502176498638,0.5986285387057977,2.582017553484373,-0.5118998032813261,1.5372376417086597,-11.716728185991657,1.0028550566930674,0.7498506547657995,-1.669052373478851,-0.38685918150393656,1.9553300819063453,-5.223982357452732,0.08572901648127772,0.9267527934939466,-1.3325486200041408,-1.8288982740321515,0.4189659946765816,-0.5109455870612315,0.19181692017455887,-11.613053153642001,-1.0782182097665631,0.7510330031583469,3.688428168782982,-2.384298113156865,-0.5617095060235909,1.414435819187736,-21.50143610179879,-0.05720411009520176,6.166824247286235,-0.27071224999076865,0.41985542842467793,1.7818575355467698,-0.7064285947025549,0.046887537116987475,17.597984353037678,-1.4457651554851798,0.5482519537236191,2.3171644882721547,-3.844621092265494,0.15200298669072093,-21.1566034458142,-1.1655202796207427,0.6922345365470807,-1.8223436417518057,-0.4311133848902395,0.26050747235546806,1.3043759178954815,-0.9460627978933192,-0.0961027615493585,-1.443430308518106,-0.3126727756820461,2.321990535126055,-3.832719151083325,-0.766049855551346,0.00818671097700007,10.44701835756835,-0.20171828166296302,0.4989827224348974,-2.6630540694787457,-0.6126912488026347,1.3064212241222155,-116.7552062942491,-0.09533944906273012,0.6365031528597023,-2.0021817130331474,-0.47776758925605095,1.633529943054569,-8.846616585372969,-1.022159147960034,0.7935955517525679,-1.5697732234574528,0.4999277882327833,2.0951045230634033,-0.6116514097212746,0.1134206050699662,0.9790616713786958,7.4125338210597285,-0.24229504828644097,0.4515796185035611,-3.0120500126469323,-0.6671913680185839,-8.787062248238817,0.009699596411833673,-0.13452158131243003,4.134030365943058,-2.2122180333583232,0.33241972886979154,1.500048829818073,-0.8280370472496245,-0.029732541068986585,0.7324234299560674,3.520527282636514,0.4524905564748221,1.9022397969300942,-0.6660988378927026,1.208605633494415,34.066884266546396,-0.13375158990192249,-0.2836396988012575,2.5036943302292824,-3.453106048048257,0.18017901769219355,1.1159623521893507,-0.02897550721200723,0.733586213116487,3.530685400785542,-2.4615696028585607,0.290004302481706,-5.538033429041002,-0.8954059395816926,0.9074361577026142,5.756255995513432,-0.2828226398028634,0.40668553401015456,-3.443356074195878,-0.7234265646991225,0.0356196323636817,14.680547701823793,-0.1733344525849912,3.540897919691867,2.24733618146495,-0.5755946023125852,1.3834117189399369,1.0326928633425647,-1.192403082651708,0.6757235412824544,-1.8719676420482865,-2.7634102255933666,0.24853004283547112,-7.097268158867767,-13.104470551631188,-0.10746805959164249,4.67623594843911,-0.32506524272151927,2.2519204797578034,-0.5745880619593958,-0.7840554807221188,1.0342571146799402,-1.1905729078500746,-1.61216174185363,0.4850111813722519,-2.75689140448799,0.2493332956544288,-7.058619361187872,372.5879212488272,-0.10670300381006931,4.693593673510325,-0.3242291411229007,-0.4916591107160651,1.5930080754369833,1.1776786114136872,1.0358238153413222,-1.1887460263307197,-1.6094427882278468,0.4859458346873424,0.31914046973694926,0.25013685150347736,-16.137571545364516,518.7948654365093,6.831632679349725,4.711075082762545,-0.3233934495167839,1.8480297537271404,1.5956871377725732,1.179485650160216,1.0373929728808704,-1.399169874157381,-1.60673044641082,-2.2802113512658972,0.3199740912016126,0.1678104155408934,-15.942221659940653,853.8541486819653,6.867877620773041,4.728681523126123,-0.4129549332270806,-0.48978206272574587,-0.6824616569045308,1.1812959160560597,0.8857805813329516,-1.396935105429701,0.5694715253100696,-2.2755303360948713,0.32080811627461714,0.16858819646289322,-15.751526860776535,-0.040237740071367614,6.904501094707355,3.384994150407338,-0.4120698402611163,1.8547276611623646,-0.6813535587051535,1.0081876509620944,0.8871313315085669,-1.394705054306038,0.570473632282038,0.39363559150367744,-3.593810420378734,0.16936617577094862,-15.565322504070178,-0.03948015626641692,4.416295010737623,3.394441488848301,2.180951415851177,1.8580907273331262,1.351136005667395,-0.9144903849579661,0.888483895636107,0.6594616622526897,-1.923726562241905,-2.863679471393247,-3.583313537352817,-7.725288914500969,-15.38345161982623,12.711936470146485,4.431855594557999,3.403937464156307,2.185312761853851,-0.5896484360587344,-0.8023815489640828,-0.9131024059034236,-1.2181363974340593,-1.6533958489266234,0.47119126902662717,-2.8567352969850988,-3.5728734010746432,-7.6796582066941586,0.025874472692467627,-0.11809387102271514,-0.18338011431974968,-0.3367063247116187,-0.5057051472961726,1.5539129393413083,-0.8011389497941994,1.012773753114332,0.7575667823327187,0.6616344812170505,0.47211591369030403,-2.849821067591263,0.23821743339513507,0.09068807908850958,75.89011171092207,-0.11732700867072106,4.463291863702574,2.626191185974673,1.7993739837523604,1.5564987556784668,-0.7998978556611389,-1.0676328627458451,0.7587579404772007,-1.6477617022401332,0.4730412189712612,-3.779937729815626,-5.068000232900733,-19.43970892576918,80.51243750131847,6.364892433268007,-0.2654378490034429,2.632176134253001,-0.5038069630078982,1.5590906677966925,-0.938202070135122,-1.0660156318413991,-1.430666120895086,-1.6449551504689204,0.3798349534786624,0.30844587686217956,0.15704125526925522,-19.157266959316033,85.73425357949891,-0.19738806076705745,-0.2646283366966408,-0.4252903579623051,-0.5028589560066582,1.3177548379922464,-0.9367809113006778,0.8672277627606326,-1.42836406247101,-1.9814957902469201,0.3807007111695893,0.3092744137258337,0.15781638342844145,-18.88289337061289,11.018368630811326,-0.19660232565662022,3.258758406041988,-0.4243974546902928,-0.6059435634218429,1.3198267262665448,1.158238461630609,0.8685538778166971,0.6434392795526216,-1.977775181498455,0.38156696760307607,-3.745542142641102,0.15859169666305212,0.013864564037293463,11.111731272046756],"x":[-1.6470993291652855e6,-3.6292682672134995e15,-7.258536532779899e15,-1.08878047983463e16,-1.4517073063912698e16,-1.81463413294791e16,-2.17756095950455e16,-2.54048778606119e16,-2.90341461261783e16,-3.2663414391744696e16,-3.6292682657311096e16,-3.992195092287749e16,-4.3551219188443896e16,-4.71804874540103e16,-5.0809755719576696e16,-5.4439023985143096e16,-5.8068292250709496e16,-6.16975605162759e16,-6.53268287818423e16,-6.895609704740869e16,-7.258536531297509e16,-7.62146335785415e16,-7.98439018441079e16,-8.347317010967429e16,-8.710243837524069e16,-9.073170664080709e16,-9.43609749063735e16,-9.799024317193989e16,-1.0161951143750629e17,-1.052487797030727e17,-1.0887804796863909e17,-1.1250731623420549e17,-1.161365844997719e17,-1.197658527653383e17,-1.233951210309047e17,-1.2702438929647109e17,-1.306536575620375e17,-1.342829258276039e17,-1.3791219409317029e17,-1.4154146235873669e17,-1.4517073062430307e17,-1.4879999888986947e17,-1.524292671554359e17,-1.5605853542100227e17,-1.596878036865687e17,-1.633170719521351e17,-1.669463402177015e17,-1.705756084832679e17,-1.7420487674883427e17,-1.7783414501440067e17,-1.814634132799671e17,-1.850926815455335e17,-1.887219498110999e17,-1.923512180766663e17,-1.9598048634223267e17,-1.996097546077991e17,-2.0323902287336547e17,-2.068682911389319e17,-2.104975594044983e17,-2.141268276700647e17,-2.1775609593563107e17,-2.213853642011975e17,-2.2501463246676387e17,-2.2864390073233034e17,-2.322731689978967e17,-2.3590243726346307e17,-2.395317055290295e17,-2.4316097379459587e17,-2.467902420601623e17,-2.5041951032572867e17,-2.540487785912951e17,-2.576780468568615e17,-2.613073151224279e17,-2.6493658338799427e17,-2.685658516535607e17,-2.7219511991912707e17,-2.7582438818469347e17,-2.794536564502599e17,-2.830829247158263e17,-2.867121929813927e17,-2.903414612469591e17,-2.939707295125255e17,-2.975999977780919e17,-3.012292660436583e17,-3.048585343092247e17,-3.084878025747911e17,-3.121170708403575e17,-3.1574633910592384e17,-3.1937560737149024e17,-3.230048756370567e17,-3.266341439026231e17,-3.3026341216818944e17,-3.3389268043375584e17,-3.375219486993223e17,-3.4115121696488877e17,-3.447804852304551e17,-3.484097534960215e17,-3.520390217615879e17,-3.5566829002715424e17,-3.592975582927207e17,-3.629268265582871e17,-3.665560948238535e17,-3.7018536308941984e17,-3.7381463135498624e17,-3.774438996205527e17,-3.810731678861191e17,-3.847024361516855e17,-3.883317044172519e17,-3.919609726828183e17,-3.955902409483847e17,-3.992195092139511e17,-4.028487774795175e17,-4.064780457450839e17,-4.1010731401065024e17,-4.1373658227621664e17,-4.173658505417831e17,-4.209951188073495e17,-4.2462438707291584e17,-4.2825365533848224e17,-4.318829236040487e17,-4.355121918696151e17,-4.391414601351815e17,-4.427707284007479e17,-4.463999966663143e17,-4.500292649318807e17,-4.5365853319744704e17,-4.572878014630135e17,-4.609170697285799e17,-4.6454633799414624e17,-4.6817560625971264e17,-4.7180487452527904e17,-4.754341427908455e17,-4.7906341105641184e17,-4.826926793219783e17,-4.863219475875447e17,-4.899512158531111e17,-4.935804841186775e17,-4.972097523842439e17,-5.008390206498103e17,-5.044682889153767e17,-5.0809755718094304e17,-5.1172682544650944e17,-5.153560937120759e17,-5.189853619776423e17,-5.2261463024320864e17,-5.2624389850877504e17,-5.298731667743415e17,-5.335024350399079e17,-5.371317033054743e17,-5.407609715710407e17,-5.443902398366071e17,-5.4801950810217344e17,-5.5164877636773984e17,-5.552780446333063e17,-5.589073128988727e17,-5.6253658116443904e17,-5.6616584943000544e17,-5.6979511769557184e17,-5.7342438596113837e17,-5.770536542267046e17,-5.806829224922711e17,-5.843121907578374e17,-5.879414590234038e17,-5.915707272889702e17,-5.951999955545366e17,-5.988292638201029e17,-6.024585320856695e17,-6.06087800351236e17,-6.097170686168023e17,-6.133463368823688e17,-6.169756051479351e17,-6.206048734135016e17,-6.242341416790678e17,-6.278634099446342e17,-6.314926782102006e17,-6.35121946475767e17,-6.387512147413334e17,-6.423804830069e17,-6.460097512724664e17,-6.496390195380326e17,-6.532682878035991e17,-6.568975560691654e17,-6.605268243347319e17,-6.641560926002982e17,-6.677853608658647e17,-6.71414629131431e17,-6.750438973969975e17,-6.786731656625638e17,-6.823024339281303e17,-6.859317021936966e17,-6.895609704592631e17,-6.931902387248296e17,-6.968195069903959e17,-7.004487752559624e17,-7.040780435215286e17,-7.07707311787095e17,-7.113365800526614e17,-7.149658483182278e17,-7.185951165837943e17,-7.222243848493608e17,-7.258536531149271e17,-7.294829213804936e17,-7.331121896460598e17,-7.367414579116262e17,-7.403707261771926e17,-7.43999994442759e17,-7.476292627083255e17,-7.512585309738918e17,-7.548877992394584e17,-7.585170675050246e17,-7.621463357705911e17,-7.657756040361574e17,-7.694048723017239e17,-7.730341405672902e17,-7.766634088328567e17,-7.80292677098423e17,-7.839219453639895e17,-7.875512136295557e17,-7.911804818951222e17,-7.948097501606888e17,-7.984390184262551e17,-8.020682866918216e17,-8.056975549573879e17,-8.093268232229544e17,-8.129560914885207e17,-8.16585359754087e17,-8.202146280196534e17,-8.238438962852198e17,-8.274731645507862e17,-8.311024328163526e17,-8.347317010819191e17,-8.383609693474856e17,-8.419902376130519e17,-8.456195058786182e17,-8.492487741441847e17,-8.52878042409751e17,-8.565073106753175e17,-8.601365789408838e17,-8.637658472064503e17,-8.673951154720166e17,-8.71024383737583e17,-8.746536520031494e17,-8.782829202687159e17,-8.819121885342822e17,-8.855414567998487e17,-8.891707250654152e17,-8.927999933309815e17,-8.964292615965478e17,-9.000585298621142e17,-9.036877981276806e17,-9.07317066393247e17,-9.109463346588136e17,-9.145756029243799e17,-9.182048711899464e17,-9.218341394555127e17,-9.25463407721079e17,-9.290926759866454e17,-9.327219442522118e17,-9.363512125177783e17,-9.399804807833446e17,-9.436097490489111e17,-9.472390173144774e17,-9.508682855800439e17,-9.544975538456102e17,-9.581268221111767e17,-9.61756090376743e17,-9.653853586423095e17,-9.690146269078758e17,-9.726438951734423e17,-9.762731634390086e17,-9.79902431704575e17,-9.835316999701414e17,-9.871609682357079e17,-9.907902365012744e17,-9.944195047668407e17,-9.980487730324072e17,-1.0016780412979735e18,-1.0053073095635398e18,-1.0089365778291062e18,-1.0125658460946726e18,-1.016195114360239e18,-1.0198243826258054e18,-1.0234536508913718e18,-1.0270829191569384e18,-1.0307121874225048e18,-1.034341455688071e18,-1.0379707239536375e18,-1.0415999922192038e18,-1.0452292604847703e18,-1.0488585287503366e18,-1.0524877970159031e18,-1.0561170652814694e18,-1.0597463335470358e18,-1.0633756018126021e18,-1.0670048700781687e18,-1.070634138343735e18,-1.0742634066093015e18,-1.077892674874868e18,-1.0815219431404343e18,-1.0851512114060008e18,-1.088780479671567e18,-1.0924097479371334e18,-1.0960390162026998e18,-1.0996682844682662e18,-1.1032975527338326e18,-1.1069268209993992e18,-1.1105560892649655e18,-1.1141853575305318e18,-1.1178146257960982e18,-1.1214438940616646e18,-1.1250731623272311e18,-1.1287024305927974e18,-1.1323316988583639e18,-1.1359609671239302e18,-1.1395902353894967e18,-1.143219503655063e18,-1.1468487719206295e18,-1.1504780401861958e18,-1.1541073084517622e18,-1.1577365767173286e18,-1.161365844982895e18,-1.1649951132484616e18,-1.1686243815140278e18,-1.1722536497795942e18,-1.1758829180451607e18,-1.179512186310727e18,-1.1831414545762934e18,-1.1867707228418598e18,-1.1903999911074263e18,-1.1940292593729925e18,-1.197658527638559e18,-1.2012877959041254e18,-1.2049170641696922e18,-1.208546332435258e18,-1.2121756007008246e18,-1.215804868966391e18,-1.2194341372319575e18,-1.223063405497524e18,-1.2266926737630902e18,-1.2303219420286566e18,-1.233951210294223e18,-1.2375804785597893e18,-1.2412097468253558e18,-1.2448390150909222e18,-1.2484682833564887e18,-1.2520975516220552e18,-1.2557268198876214e18,-1.2593560881531878e18,-1.2629853564187543e18,-1.2666146246843208e18,-1.270243892949887e18,-1.2738731612154534e18,-1.2775024294810196e18,-1.2811316977465864e18,-1.2847609660121528e18,-1.288390234277719e18,-1.2920195025432855e18,-1.2956487708088517e18,-1.2992780390744184e18,-1.3029073073399844e18,-1.306536575605551e18,-1.3101658438711173e18,-1.313795112136684e18,-1.3174243804022505e18,-1.3210536486678164e18,-1.3246829169333832e18,-1.3283121851989494e18,-1.331941453464516e18,-1.335570721730082e18,-1.3391999899956488e18,-1.342829258261215e18,-1.3464585265267814e18,-1.3500877947923476e18,-1.353717063057914e18,-1.3573463313234808e18,-1.360975599589047e18,-1.3646048678546138e18,-1.3682341361201797e18,-1.3718634043857464e18,-1.3754926726513126e18,-1.379121940916879e18,-1.3827512091824453e18,-1.3863804774480118e18,-1.3900097457135782e18,-1.3936390139791447e18,-1.3972682822447112e18,-1.4008975505102774e18,-1.4045268187758438e18,-1.4081560870414103e18,-1.4117853553069768e18,-1.415414623572543e18,-1.4190438918381094e18,-1.422673160103676e18,-1.4263024283692424e18,-1.4299316966348083e18,-1.433560964900375e18,-1.4371902331659415e18,-1.440819501431508e18,-1.4444487696970742e18,-1.4480780379626406e18,-1.451707306228207e18,-1.4553365744937736e18,-1.45896584275934e18,-1.462595111024906e18,-1.4662243792904727e18,-1.469853647556039e18,-1.4734829158216056e18,-1.4771121840871718e18,-1.4807414523527383e18,-1.4843707206183048e18,-1.487999988883871e18,-1.4916292571494374e18,-1.4952585254150036e18,-1.4988877936805704e18,-1.5025170619461366e18,-1.5061463302117033e18,-1.5097755984772695e18,-1.5134048667428357e18,-1.5170341350084024e18,-1.5206634032739686e18,-1.524292671539535e18,-1.5279219398051013e18,-1.531551208070668e18,-1.5351804763362342e18,-1.5388097446018004e18,-1.542439012867367e18,-1.5460682811329334e18,-1.5496975493985e18,-1.5533268176640663e18,-1.5569560859296328e18,-1.560585354195199e18,-1.5642146224607657e18,-1.567843890726332e18,-1.571473158991898e18,-1.5751024272574646e18,-1.578731695523031e18,-1.5823609637885975e18,-1.5859902320541637e18,-1.5896195003197304e18,-1.5932487685852966e18,-1.596878036850863e18,-1.6005073051164296e18,-1.6041365733819958e18,-1.6077658416475622e18,-1.6113951099131287e18,-1.6150243781786952e18,-1.6186536464442614e18,-1.6222829147098276e18,-1.6259121829753943e18,-1.6295414512409608e18,-1.633170719506527e18,-1.6367999877720934e18,-1.64042925603766e18,-1.6440585243032264e18,-1.6476877925687923e18,-1.651317060834359e18,-1.6549463290999252e18,-1.658575597365492e18,-1.6622048656310582e18,-1.6658341338966246e18,-1.669463402162191e18,-1.6730926704277576e18,-1.676721938693324e18,-1.68035120695889e18,-1.6839804752244567e18,-1.687609743490023e18,-1.6912390117555896e18,-1.6948682800211556e18,-1.6984975482867223e18,-1.7021268165522885e18,-1.705756084817855e18,-1.7093853530834217e18,-1.7130146213489876e18,-1.7166438896145544e18,-1.7202731578801206e18,-1.7239024261456873e18,-1.7275316944112532e18,-1.7311609626768197e18,-1.7347902309423862e18,-1.7384194992079526e18,-1.7420487674735188e18,-1.7456780357390853e18,-1.749307304004652e18,-1.7529365722702182e18,-1.7565658405357847e18,-1.760195108801351e18,-1.7638243770669174e18,-1.7674536453324838e18,-1.7710829135980503e18,-1.7747121818636165e18,-1.778341450129183e18,-1.7819707183947497e18,-1.785599986660316e18,-1.789229254925882e18,-1.7928585231914486e18,-1.796487791457015e18,-1.8001170597225815e18,-1.803746327988148e18,-1.8073755962537142e18,-1.8110048645192806e18]}
},{}],76:[function(require,module,exports){
module.exports={"expected":[-6.420676210313675e-11,0.8038777911311805,0.8142458028436093,-1.4041886947221967,0.8353033412901791,0.0606475831655485,0.6365188089862741,1.8405787232946678,-116.60350734583955,2.7952223341566635,-6.0919123336476915,0.5764841549691243,-0.4175725503248284,-3.8093135815419368,0.7093442520940094,2.0831181244082067,-17.014464282089975,0.8612526134129307,2.709698432818781,7.13174355157908,-2.601688560744266,-0.4293353267960436,0.10107136381356235,0.3258039026859244,1.0743493883568946,4.028644658483804,-1.6128949237155519,-1.0328756789815265,-0.3041966755036438,0.5502048911562253,0.8721790132560316,2.76264643162737,-2.0648670719108577,-0.704181882945005,-0.10767406373291669,0.10737857860325256,1.2738927672381293,6.225929521266461,-18.173021755416542,-1.5906476961169558,-1.0200622611875778,-0.29739271569763853,1.032272123258767,0.8832249858564539,-4.033683599411699,-1.0749788523197985,-0.3261270479649738,0.1933729258335968,0.11369425058118066,0.7131158177889936,-7.146924403919263,-1.3283924175339554,-0.44566847749380833,0.08724059192729668,0.009213332540728893,1.9625880566541516,1.6345214472369136,-1.6633866167681703,-0.5768734056810702,-0.016976418818782597,-0.09506683871678472,1.5422951469768087,1.307152738825859,-0.6123197324405513,-0.7248900389504579,-0.8509465189534449,0.40556715829983414,0.3175613148236002,5.723665966102232,3.9037009993327305,-0.8971371635442151,-0.22883843697504858,0.2889638212484795,0.20635037143737087,3.5178015576265267,2.69946969519367,-6.550230424437079,-0.34136322361763227,0.1791879922459079,0.8145873101550886,2.4967330984694325,-7.938473808567639,-1.3669982197130244,-0.4622024483885601,0.07344286534009538,0.654564774114416,1.8978139652745376,0.45133446475070077,1.3415158174554054,-0.5952913710867501,-0.030693447184778892,-0.829656604804913,-0.18848384362840684,12.06705391955472,0.020938583323865417,-0.7460139284673089,-0.13549911030962664,0.3896904858671354,-0.2987321989361268,5.294492981408673,-3.021747905260053,-0.9221896554069567,-6.04371650192898,-1.2615945073817074,0.9771831590070986,3.3428695745982977,-4.566242047333659,-1.1358912280848423,-0.3567426819808765,0.16507258260303442,0.7920320918800604,2.400842558585001,-8.923362890801734,1.6300136640988163,22.705035322965465,0.05967289647827157,0.6351550036982474,-0.09630829403668156,0.4349333242988605,-1.7716302137836974,-0.6140124421338432,-0.04442202476110123,0.4977842346825138,1.453395478652674,10.342330431151174,1.0557811298530368,-0.7675743834239094,-0.14948669295377456,-1.0510202065026366,-0.31372697875251415,0.20506812275542013,-3.1666449724669348,2.6893086692427413,-0.2578817954106573,0.2594825470729242,0.9507361965526082,3.1832693230390987,-4.885817033751832,-1.167786986687064,-0.37227331855873885,-1.6217911413826471,-0.5619774387053401,2.3110633881787117,-10.18282161362798,1.580973296076437,17.304668985548055,0.045925439856852095,0.616080351852782,1.777856239442616,163.81593762185844,-1.8297834259530188,6.1295750716728445,-2.7865886439730403,0.4807931462524001,1.4115590320273605,0.3011919897148225,1.0272028562604942,3.6744568807694664,1.5783295157036343,-1.080296478227484,1.1393332787410964,0.19082175035170562,-0.512156841816323,2.5804570454154385,0.5983519464214826,-0.12329294193224884,0.9249698081616351,-0.8783760628270371,-5.251278493127663,0.3003671789635501,-0.38796329968224236,3.6635185040626497,8.08558430365188,-0.019437618463844494,-0.8108399951043364,1.5340137230785584,0.34388488042714604,2.574675381316005,-0.2733680460941407,-0.1240608936500684,50.46438541000314,1.2323359665984586,-0.6524236882750576,-2.9115300666195427,0.4640245885325898,-0.23142912657823686,8.03568335169086,0.9994183305382952,-0.812094438871402,-4.33245139568583,0.3430392708058564,-2.157194567659788,4.313550088819176,-0.12482898950668217,0.019233894699793825,-8.09912405046264,1.671919456278828,-0.46519185104495636,2.9024572153291306,-0.2322261597287096,-1.2347568120628107,0.9979075878015305,1.3346502176498638,-0.5986285387057977,-2.582017553484373,0.5118998032813261,-1.5372376417086597,11.716728185991657,-1.0028550566930674,-0.7498506547657995,1.669052373478851,0.38685918150393656,-1.9553300819063453,5.223982357452732,-0.08572901648127772,-0.9267527934939466,1.3325486200041408,1.8288982740321515,-0.4189659946765816,0.5109455870612315,-0.19181692017455887,11.613053153642001,1.0782182097665631,-0.7510330031583469,-3.688428168782982,2.384298113156865,0.5617095060235909,-1.414435819187736,21.50143610179879,0.05720411009520176,-6.166824247286235,0.27071224999076865,-0.41985542842467793,-1.7818575355467698,0.7064285947025549,-0.046887537116987475,-17.597984353037678,1.4457651554851798,-0.5482519537236191,-2.3171644882721547,3.844621092265494,-0.15200298669072093,21.1566034458142,1.1655202796207427,-0.6922345365470807,1.8223436417518057,0.4311133848902395,-0.26050747235546806,-1.3043759178954815,0.9460627978933192,0.0961027615493585,1.443430308518106,0.3126727756820461,-2.321990535126055,3.832719151083325,0.766049855551346,-0.00818671097700007,-10.44701835756835,0.20171828166296302,-0.4989827224348974,2.6630540694787457,0.6126912488026347,-1.3064212241222155,116.7552062942491,0.09533944906273012,-0.6365031528597023,2.0021817130331474,0.47776758925605095,-1.633529943054569,8.846616585372969,1.022159147960034,-0.7935955517525679,1.5697732234574528,-0.4999277882327833,-2.0951045230634033,0.6116514097212746,-0.1134206050699662,-0.9790616713786958,-7.4125338210597285,0.24229504828644097,-0.4515796185035611,3.0120500126469323,0.6671913680185839,8.787062248238817,-0.009699596411833673,0.13452158131243003,-4.134030365943058,2.2122180333583232,-0.33241972886979154,-1.500048829818073,0.8280370472496245,0.029732541068986585,-0.7324234299560674,-3.520527282636514,-0.4524905564748221,-1.9022397969300942,0.6660988378927026,-1.208605633494415,-34.066884266546396,0.13375158990192249,0.2836396988012575,-2.5036943302292824,3.453106048048257,-0.18017901769219355,-1.1159623521893507,0.02897550721200723,-0.733586213116487,-3.530685400785542,2.4615696028585607,-0.290004302481706,5.538033429041002,0.8954059395816926,-0.9074361577026142,-5.756255995513432,0.2828226398028634,-0.40668553401015456,3.443356074195878,0.7234265646991225,-0.0356196323636817,-14.680547701823793,0.1733344525849912,-3.540897919691867,-2.24733618146495,0.5755946023125852,-1.3834117189399369,-1.0326928633425647,1.192403082651708,-0.6757235412824544,1.8719676420482865,2.7634102255933666,-0.24853004283547112,7.097268158867767,13.104470551631188,0.10746805959164249,-4.67623594843911,0.32506524272151927,-2.2519204797578034,0.5745880619593958,0.7840554807221188,-1.0342571146799402,1.1905729078500746,1.61216174185363,-0.4850111813722519,2.75689140448799,-0.2493332956544288,7.058619361187872,-372.5879212488272,0.10670300381006931,-4.693593673510325,0.3242291411229007,0.4916591107160651,-1.5930080754369833,-1.1776786114136872,-1.0358238153413222,1.1887460263307197,1.6094427882278468,-0.4859458346873424,-0.31914046973694926,-0.25013685150347736,16.137571545364516,-518.7948654365093,-6.831632679349725,-4.711075082762545,0.3233934495167839,-1.8480297537271404,-1.5956871377725732,-1.179485650160216,-1.0373929728808704,1.399169874157381,1.60673044641082,2.2802113512658972,-0.3199740912016126,-0.1678104155408934,15.942221659940653,-853.8541486819653,-6.867877620773041,-4.728681523126123,0.4129549332270806,0.48978206272574587,0.6824616569045308,-1.1812959160560597,-0.8857805813329516,1.396935105429701,-0.5694715253100696,2.2755303360948713,-0.32080811627461714,-0.16858819646289322,15.751526860776535,0.040237740071367614,-6.904501094707355,-3.384994150407338,0.4120698402611163,-1.8547276611623646,0.6813535587051535,-1.0081876509620944,-0.8871313315085669,1.394705054306038,-0.570473632282038,-0.39363559150367744,3.593810420378734,-0.16936617577094862,15.565322504070178,0.03948015626641692,-4.416295010737623,-3.394441488848301,-2.180951415851177,-1.8580907273331262,-1.351136005667395,0.9144903849579661,-0.888483895636107,-0.6594616622526897,1.923726562241905,2.863679471393247,3.583313537352817,7.725288914500969,15.38345161982623,-12.711936470146485,-4.431855594557999,-3.403937464156307,-2.185312761853851,0.5896484360587344,0.8023815489640828,0.9131024059034236,1.2181363974340593,1.6533958489266234,-0.47119126902662717,2.8567352969850988,3.5728734010746432,7.6796582066941586,-0.025874472692467627,0.11809387102271514,0.18338011431974968,0.3367063247116187,0.5057051472961726,-1.5539129393413083,0.8011389497941994,-1.012773753114332,-0.7575667823327187,-0.6616344812170505,-0.47211591369030403,2.849821067591263,-0.23821743339513507,-0.09068807908850958,-75.89011171092207,0.11732700867072106,-4.463291863702574,-2.626191185974673,-1.7993739837523604,-1.5564987556784668,0.7998978556611389,1.0676328627458451,-0.7587579404772007,1.6477617022401332,-0.4730412189712612,3.779937729815626,5.068000232900733,19.43970892576918,-80.51243750131847,-6.364892433268007,0.2654378490034429,-2.632176134253001,0.5038069630078982,-1.5590906677966925,0.938202070135122,1.0660156318413991,1.430666120895086,1.6449551504689204,-0.3798349534786624,-0.30844587686217956,-0.15704125526925522,19.157266959316033,-85.73425357949891,0.19738806076705745,0.2646283366966408,0.4252903579623051,0.5028589560066582,-1.3177548379922464,0.9367809113006778,-0.8672277627606326,1.42836406247101,1.9814957902469201,-0.3807007111695893,-0.3092744137258337,-0.15781638342844145,18.88289337061289,-11.018368630811326,0.19660232565662022,-3.258758406041988,0.4243974546902928,0.6059435634218429,-1.3198267262665448,-1.158238461630609,-0.8685538778166971,-0.6434392795526216,1.977775181498455,-0.38156696760307607,3.745542142641102,-0.15859169666305212,-0.013864564037293463,-11.111731272046756],"x":[1.6470993291652855e6,3.6292682672134995e15,7.258536532779899e15,1.08878047983463e16,1.4517073063912698e16,1.81463413294791e16,2.17756095950455e16,2.54048778606119e16,2.90341461261783e16,3.2663414391744696e16,3.6292682657311096e16,3.992195092287749e16,4.3551219188443896e16,4.71804874540103e16,5.0809755719576696e16,5.4439023985143096e16,5.8068292250709496e16,6.16975605162759e16,6.53268287818423e16,6.895609704740869e16,7.258536531297509e16,7.62146335785415e16,7.98439018441079e16,8.347317010967429e16,8.710243837524069e16,9.073170664080709e16,9.43609749063735e16,9.799024317193989e16,1.0161951143750629e17,1.052487797030727e17,1.0887804796863909e17,1.1250731623420549e17,1.161365844997719e17,1.197658527653383e17,1.233951210309047e17,1.2702438929647109e17,1.306536575620375e17,1.342829258276039e17,1.3791219409317029e17,1.4154146235873669e17,1.4517073062430307e17,1.4879999888986947e17,1.524292671554359e17,1.5605853542100227e17,1.596878036865687e17,1.633170719521351e17,1.669463402177015e17,1.705756084832679e17,1.7420487674883427e17,1.7783414501440067e17,1.814634132799671e17,1.850926815455335e17,1.887219498110999e17,1.923512180766663e17,1.9598048634223267e17,1.996097546077991e17,2.0323902287336547e17,2.068682911389319e17,2.104975594044983e17,2.141268276700647e17,2.1775609593563107e17,2.213853642011975e17,2.2501463246676387e17,2.2864390073233034e17,2.322731689978967e17,2.3590243726346307e17,2.395317055290295e17,2.4316097379459587e17,2.467902420601623e17,2.5041951032572867e17,2.540487785912951e17,2.576780468568615e17,2.613073151224279e17,2.6493658338799427e17,2.685658516535607e17,2.7219511991912707e17,2.7582438818469347e17,2.794536564502599e17,2.830829247158263e17,2.867121929813927e17,2.903414612469591e17,2.939707295125255e17,2.975999977780919e17,3.012292660436583e17,3.048585343092247e17,3.084878025747911e17,3.121170708403575e17,3.1574633910592384e17,3.1937560737149024e17,3.230048756370567e17,3.266341439026231e17,3.3026341216818944e17,3.3389268043375584e17,3.375219486993223e17,3.4115121696488877e17,3.447804852304551e17,3.484097534960215e17,3.520390217615879e17,3.5566829002715424e17,3.592975582927207e17,3.629268265582871e17,3.665560948238535e17,3.7018536308941984e17,3.7381463135498624e17,3.774438996205527e17,3.810731678861191e17,3.847024361516855e17,3.883317044172519e17,3.919609726828183e17,3.955902409483847e17,3.992195092139511e17,4.028487774795175e17,4.064780457450839e17,4.1010731401065024e17,4.1373658227621664e17,4.173658505417831e17,4.209951188073495e17,4.2462438707291584e17,4.2825365533848224e17,4.318829236040487e17,4.355121918696151e17,4.391414601351815e17,4.427707284007479e17,4.463999966663143e17,4.500292649318807e17,4.5365853319744704e17,4.572878014630135e17,4.609170697285799e17,4.6454633799414624e17,4.6817560625971264e17,4.7180487452527904e17,4.754341427908455e17,4.7906341105641184e17,4.826926793219783e17,4.863219475875447e17,4.899512158531111e17,4.935804841186775e17,4.972097523842439e17,5.008390206498103e17,5.044682889153767e17,5.0809755718094304e17,5.1172682544650944e17,5.153560937120759e17,5.189853619776423e17,5.2261463024320864e17,5.2624389850877504e17,5.298731667743415e17,5.335024350399079e17,5.371317033054743e17,5.407609715710407e17,5.443902398366071e17,5.4801950810217344e17,5.5164877636773984e17,5.552780446333063e17,5.589073128988727e17,5.6253658116443904e17,5.6616584943000544e17,5.6979511769557184e17,5.7342438596113837e17,5.770536542267046e17,5.806829224922711e17,5.843121907578374e17,5.879414590234038e17,5.915707272889702e17,5.951999955545366e17,5.988292638201029e17,6.024585320856695e17,6.06087800351236e17,6.097170686168023e17,6.133463368823688e17,6.169756051479351e17,6.206048734135016e17,6.242341416790678e17,6.278634099446342e17,6.314926782102006e17,6.35121946475767e17,6.387512147413334e17,6.423804830069e17,6.460097512724664e17,6.496390195380326e17,6.532682878035991e17,6.568975560691654e17,6.605268243347319e17,6.641560926002982e17,6.677853608658647e17,6.71414629131431e17,6.750438973969975e17,6.786731656625638e17,6.823024339281303e17,6.859317021936966e17,6.895609704592631e17,6.931902387248296e17,6.968195069903959e17,7.004487752559624e17,7.040780435215286e17,7.07707311787095e17,7.113365800526614e17,7.149658483182278e17,7.185951165837943e17,7.222243848493608e17,7.258536531149271e17,7.294829213804936e17,7.331121896460598e17,7.367414579116262e17,7.403707261771926e17,7.43999994442759e17,7.476292627083255e17,7.512585309738918e17,7.548877992394584e17,7.585170675050246e17,7.621463357705911e17,7.657756040361574e17,7.694048723017239e17,7.730341405672902e17,7.766634088328567e17,7.80292677098423e17,7.839219453639895e17,7.875512136295557e17,7.911804818951222e17,7.948097501606888e17,7.984390184262551e17,8.020682866918216e17,8.056975549573879e17,8.093268232229544e17,8.129560914885207e17,8.16585359754087e17,8.202146280196534e17,8.238438962852198e17,8.274731645507862e17,8.311024328163526e17,8.347317010819191e17,8.383609693474856e17,8.419902376130519e17,8.456195058786182e17,8.492487741441847e17,8.52878042409751e17,8.565073106753175e17,8.601365789408838e17,8.637658472064503e17,8.673951154720166e17,8.71024383737583e17,8.746536520031494e17,8.782829202687159e17,8.819121885342822e17,8.855414567998487e17,8.891707250654152e17,8.927999933309815e17,8.964292615965478e17,9.000585298621142e17,9.036877981276806e17,9.07317066393247e17,9.109463346588136e17,9.145756029243799e17,9.182048711899464e17,9.218341394555127e17,9.25463407721079e17,9.290926759866454e17,9.327219442522118e17,9.363512125177783e17,9.399804807833446e17,9.436097490489111e17,9.472390173144774e17,9.508682855800439e17,9.544975538456102e17,9.581268221111767e17,9.61756090376743e17,9.653853586423095e17,9.690146269078758e17,9.726438951734423e17,9.762731634390086e17,9.79902431704575e17,9.835316999701414e17,9.871609682357079e17,9.907902365012744e17,9.944195047668407e17,9.980487730324072e17,1.0016780412979735e18,1.0053073095635398e18,1.0089365778291062e18,1.0125658460946726e18,1.016195114360239e18,1.0198243826258054e18,1.0234536508913718e18,1.0270829191569384e18,1.0307121874225048e18,1.034341455688071e18,1.0379707239536375e18,1.0415999922192038e18,1.0452292604847703e18,1.0488585287503366e18,1.0524877970159031e18,1.0561170652814694e18,1.0597463335470358e18,1.0633756018126021e18,1.0670048700781687e18,1.070634138343735e18,1.0742634066093015e18,1.077892674874868e18,1.0815219431404343e18,1.0851512114060008e18,1.088780479671567e18,1.0924097479371334e18,1.0960390162026998e18,1.0996682844682662e18,1.1032975527338326e18,1.1069268209993992e18,1.1105560892649655e18,1.1141853575305318e18,1.1178146257960982e18,1.1214438940616646e18,1.1250731623272311e18,1.1287024305927974e18,1.1323316988583639e18,1.1359609671239302e18,1.1395902353894967e18,1.143219503655063e18,1.1468487719206295e18,1.1504780401861958e18,1.1541073084517622e18,1.1577365767173286e18,1.161365844982895e18,1.1649951132484616e18,1.1686243815140278e18,1.1722536497795942e18,1.1758829180451607e18,1.179512186310727e18,1.1831414545762934e18,1.1867707228418598e18,1.1903999911074263e18,1.1940292593729925e18,1.197658527638559e18,1.2012877959041254e18,1.2049170641696922e18,1.208546332435258e18,1.2121756007008246e18,1.215804868966391e18,1.2194341372319575e18,1.223063405497524e18,1.2266926737630902e18,1.2303219420286566e18,1.233951210294223e18,1.2375804785597893e18,1.2412097468253558e18,1.2448390150909222e18,1.2484682833564887e18,1.2520975516220552e18,1.2557268198876214e18,1.2593560881531878e18,1.2629853564187543e18,1.2666146246843208e18,1.270243892949887e18,1.2738731612154534e18,1.2775024294810196e18,1.2811316977465864e18,1.2847609660121528e18,1.288390234277719e18,1.2920195025432855e18,1.2956487708088517e18,1.2992780390744184e18,1.3029073073399844e18,1.306536575605551e18,1.3101658438711173e18,1.313795112136684e18,1.3174243804022505e18,1.3210536486678164e18,1.3246829169333832e18,1.3283121851989494e18,1.331941453464516e18,1.335570721730082e18,1.3391999899956488e18,1.342829258261215e18,1.3464585265267814e18,1.3500877947923476e18,1.353717063057914e18,1.3573463313234808e18,1.360975599589047e18,1.3646048678546138e18,1.3682341361201797e18,1.3718634043857464e18,1.3754926726513126e18,1.379121940916879e18,1.3827512091824453e18,1.3863804774480118e18,1.3900097457135782e18,1.3936390139791447e18,1.3972682822447112e18,1.4008975505102774e18,1.4045268187758438e18,1.4081560870414103e18,1.4117853553069768e18,1.415414623572543e18,1.4190438918381094e18,1.422673160103676e18,1.4263024283692424e18,1.4299316966348083e18,1.433560964900375e18,1.4371902331659415e18,1.440819501431508e18,1.4444487696970742e18,1.4480780379626406e18,1.451707306228207e18,1.4553365744937736e18,1.45896584275934e18,1.462595111024906e18,1.4662243792904727e18,1.469853647556039e18,1.4734829158216056e18,1.4771121840871718e18,1.4807414523527383e18,1.4843707206183048e18,1.487999988883871e18,1.4916292571494374e18,1.4952585254150036e18,1.4988877936805704e18,1.5025170619461366e18,1.5061463302117033e18,1.5097755984772695e18,1.5134048667428357e18,1.5170341350084024e18,1.5206634032739686e18,1.524292671539535e18,1.5279219398051013e18,1.531551208070668e18,1.5351804763362342e18,1.5388097446018004e18,1.542439012867367e18,1.5460682811329334e18,1.5496975493985e18,1.5533268176640663e18,1.5569560859296328e18,1.560585354195199e18,1.5642146224607657e18,1.567843890726332e18,1.571473158991898e18,1.5751024272574646e18,1.578731695523031e18,1.5823609637885975e18,1.5859902320541637e18,1.5896195003197304e18,1.5932487685852966e18,1.596878036850863e18,1.6005073051164296e18,1.6041365733819958e18,1.6077658416475622e18,1.6113951099131287e18,1.6150243781786952e18,1.6186536464442614e18,1.6222829147098276e18,1.6259121829753943e18,1.6295414512409608e18,1.633170719506527e18,1.6367999877720934e18,1.64042925603766e18,1.6440585243032264e18,1.6476877925687923e18,1.651317060834359e18,1.6549463290999252e18,1.658575597365492e18,1.6622048656310582e18,1.6658341338966246e18,1.669463402162191e18,1.6730926704277576e18,1.676721938693324e18,1.68035120695889e18,1.6839804752244567e18,1.687609743490023e18,1.6912390117555896e18,1.6948682800211556e18,1.6984975482867223e18,1.7021268165522885e18,1.705756084817855e18,1.7093853530834217e18,1.7130146213489876e18,1.7166438896145544e18,1.7202731578801206e18,1.7239024261456873e18,1.7275316944112532e18,1.7311609626768197e18,1.7347902309423862e18,1.7384194992079526e18,1.7420487674735188e18,1.7456780357390853e18,1.749307304004652e18,1.7529365722702182e18,1.7565658405357847e18,1.760195108801351e18,1.7638243770669174e18,1.7674536453324838e18,1.7710829135980503e18,1.7747121818636165e18,1.778341450129183e18,1.7819707183947497e18,1.785599986660316e18,1.789229254925882e18,1.7928585231914486e18,1.796487791457015e18,1.8001170597225815e18,1.803746327988148e18,1.8073755962537142e18,1.8110048645192806e18]}
},{}],77:[function(require,module,exports){
(function (__filename){
'use strict';

// MODULES //

var tape = require( 'tape' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var abs = require( '@stdlib/math/base/special/abs' );
var PI = require( '@stdlib/constants/math/float64-pi' );
var EPS = require( '@stdlib/constants/math/float64-eps' );
var PINF = require( '@stdlib/constants/math/float64-pinf' );
var NINF = require( '@stdlib/constants/math/float64-ninf' );
var tan = require( './../lib' );


// FIXTURES //

var hugeNegative = require( './fixtures/julia/huge_negative.json' );
var hugePositive = require( './fixtures/julia/huge_positive.json' );
var veryLargeNegative = require( './fixtures/julia/very_large_negative.json' );
var veryLargePositive = require( './fixtures/julia/very_large_positive.json' );
var largeNegative = require( './fixtures/julia/large_negative.json' );
var largePositive = require( './fixtures/julia/large_positive.json' );
var mediumNegative = require( './fixtures/julia/medium_negative.json' );
var mediumPositive = require( './fixtures/julia/medium_positive.json' );
var smallNegative = require( './fixtures/julia/small_negative.json' );
var smallPositive = require( './fixtures/julia/small_positive.json' );
var smaller = require( './fixtures/julia/smaller.json' );
var tinyNegative = require( './fixtures/julia/tiny_negative.json' );
var tinyPositive = require( './fixtures/julia/tiny_positive.json' );
var subnormal = require( './fixtures/julia/subnormal.json' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.true( typeof tan, 'function', 'main export is a function' );
	t.end();
});

tape( 'the function computes the tangent (huge negative values)', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	x = hugeNegative.x;
	expected = hugeNegative.expected;

	for ( i = 0; i < x.length; i++ ) {
		y = tan( x[ i ] );
		if ( y === expected[ i ] ) {
			t.equal( y, expected[ i ], 'x: '+x[i]+'. E: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[i]+'. y: '+y+'. E: '+expected[i]+'. tol: '+tol+'. Δ: '+delta+'.' );
		}
	}
	t.end();
});

tape( 'the function computes the tangent (huge positive values)', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	x = hugePositive.x;
	expected = hugePositive.expected;

	for ( i = 0; i < x.length; i++ ) {
		y = tan( x[ i ] );
		if ( y === expected[ i ] ) {
			t.equal( y, expected[ i ], 'x: '+x[i]+'. E: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[i]+'. y: '+y+'. E: '+expected[i]+'. tol: '+tol+'. Δ: '+delta+'.' );
		}
	}
	t.end();
});

tape( 'the function computes the tangent (very large positive values)', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	x = veryLargePositive.x;
	expected = veryLargePositive.expected;

	for ( i = 0; i < x.length; i++ ) {
		y = tan( x[ i ] );
		if ( y === expected[ i ] ) {
			t.equal( y, expected[ i ], 'x: '+x[i]+'. E: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[i]+'. y: '+y+'. E: '+expected[i]+'. tol: '+tol+'. Δ: '+delta+'.' );
		}
	}
	t.end();
});

tape( 'the function computes the tangent (very large negative values)', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	x = veryLargeNegative.x;
	expected = veryLargeNegative.expected;

	for ( i = 0; i < x.length; i++ ) {
		y = tan( x[ i ] );
		if ( y === expected[ i ] ) {
			t.equal( y, expected[ i ], 'x: '+x[i]+'. E: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[i]+'. y: '+y+'. E: '+expected[i]+'. tol: '+tol+'. Δ: '+delta+'.' );
		}
	}
	t.end();
});

tape( 'the function computes the tangent (large positive values)', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	x = largePositive.x;
	expected = largePositive.expected;

	for ( i = 0; i < x.length; i++ ) {
		y = tan( x[ i ] );
		if ( y === expected[ i ] ) {
			t.equal( y, expected[ i ], 'x: '+x[i]+'. E: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[i]+'. y: '+y+'. E: '+expected[i]+'. tol: '+tol+'. Δ: '+delta+'.' );
		}
	}
	t.end();
});

tape( 'the function computes the tangent (large negative values)', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	x = largeNegative.x;
	expected = largeNegative.expected;

	for ( i = 0; i < x.length; i++ ) {
		y = tan( x[ i ] );
		if ( y === expected[ i ] ) {
			t.equal( y, expected[ i ], 'x: '+x[i]+'. E: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[i]+'. y: '+y+'. E: '+expected[i]+'. tol: '+tol+'. Δ: '+delta+'.' );
		}
	}
	t.end();
});

tape( 'the function computes the tangent (medium positive values)', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	x = mediumPositive.x;
	expected = mediumPositive.expected;

	for ( i = 0; i < x.length; i++ ) {
		y = tan( x[ i ] );
		if ( y === expected[ i ] ) {
			t.equal( y, expected[ i ], 'x: '+x[i]+'. E: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[i]+'. y: '+y+'. E: '+expected[i]+'. tol: '+tol+'. Δ: '+delta+'.' );
		}
	}
	t.end();
});

tape( 'the function computes the tangent (medium negative values)', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	x = mediumNegative.x;
	expected = mediumNegative.expected;

	for ( i = 0; i < x.length; i++ ) {
		y = tan( x[ i ] );
		if ( y === expected[ i ] ) {
			t.equal( y, expected[ i ], 'x: '+x[i]+'. E: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[i]+'. y: '+y+'. E: '+expected[i]+'. tol: '+tol+'. Δ: '+delta+'.' );
		}
	}
	t.end();
});

tape( 'the function computes the tangent (small positive values)', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	x = smallPositive.x;
	expected = smallPositive.expected;

	for ( i = 0; i < x.length; i++ ) {
		y = tan( x[ i ] );
		if ( y === expected[ i ] ) {
			t.equal( y, expected[ i ], 'x: '+x[i]+'. E: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[i]+'. y: '+y+'. E: '+expected[i]+'. tol: '+tol+'. Δ: '+delta+'.' );
		}
	}
	t.end();
});

tape( 'the function computes the tangent (small negative values)', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	x = smallNegative.x;
	expected = smallNegative.expected;

	for ( i = 0; i < x.length; i++ ) {
		y = tan( x[ i ] );
		if ( y === expected[ i ] ) {
			t.equal( y, expected[ i ], 'x: '+x[i]+'. E: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[i]+'. y: '+y+'. E: '+expected[i]+'. tol: '+tol+'. Δ: '+delta+'.' );
		}
	}
	t.end();
});

tape( 'the function computes the tangent (smaller values)', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	x = smaller.x;
	expected = smaller.expected;

	for ( i = 0; i < x.length; i++ ) {
		y = tan( x[ i ] );
		if ( y === expected[ i ] ) {
			t.equal( y, expected[ i ], 'x: '+x[i]+'. E: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[i]+'. y: '+y+'. E: '+expected[i]+'. tol: '+tol+'. Δ: '+delta+'.' );
		}
	}
	t.end();
});

tape( 'the function computes the tangent (tiny positive values)', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	x = tinyPositive.x;
	expected = tinyPositive.expected;

	for ( i = 0; i < x.length; i++ ) {
		y = tan( x[ i ] );
		if ( y === expected[ i ] ) {
			t.equal( y, expected[ i ], 'x: '+x[i]+'. E: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[i]+'. y: '+y+'. E: '+expected[i]+'. tol: '+tol+'. Δ: '+delta+'.' );
		}
	}
	t.end();
});

tape( 'the function computes the tangent (tiny negative values)', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	x = tinyNegative.x;
	expected = tinyNegative.expected;

	for ( i = 0; i < x.length; i++ ) {
		y = tan( x[ i ] );
		if ( y === expected[ i ] ) {
			t.equal( y, expected[ i ], 'x: '+x[i]+'. E: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[i]+'. y: '+y+'. E: '+expected[i]+'. tol: '+tol+'. Δ: '+delta+'.' );
		}
	}
	t.end();
});

tape( 'the function computes the tangent (subnormal values)', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	x = subnormal.x;
	expected = subnormal.expected;

	for ( i = 0; i < x.length; i++ ) {
		y = tan( x[ i ] );
		if ( y === expected[ i ] ) {
			t.equal( y, expected[ i ], 'x: '+x[i]+'. E: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[i]+'. y: '+y+'. E: '+expected[i]+'. tol: '+tol+'. Δ: '+delta+'.' );
		}
	}

	t.end();
});

tape( 'if provided a multiple of `-pi/2`, the function does not return `-infinity`', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var v;

	// NOTE: does not equal -inf due to approx errors. Comparing to Julia: -1.633123935319537e16
	x = -PI / 2.0;
	v = tan( x );
	expected = -1.633123935319537e16;

	delta = abs( v - expected );
	tol = EPS * abs( expected );

	t.ok( delta <= tol, 'within tolerance. x: '+x+'. v: '+v+'. E: '+expected+'. Δ: '+delta+'. tol: '+tol+'.' );
	t.end();
});

tape( 'if provided a multiple of `pi/2`, the function does not return `+infinity`', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var v;

	// NOTE: does not equal +inf due to approx errors. Comparing to Julia: +1.633123935319537e16
	x = PI / 2.0;
	v = tan( x );
	expected = 1.633123935319537e16;

	delta = abs( v - expected );
	tol = EPS * abs( expected );

	t.ok( delta <= tol, 'within tolerance. x: '+x+'. v: '+v+'. E: '+expected+'. Δ: '+delta+'. tol: '+tol+'.' );
	t.end();
});

tape( ' if provided a `NaN`, the function returns `NaN`', function test( t ) {
	var v = tan( NaN );
	t.equal( isnan( v ), true, 'returns NaN' );
	t.end();
});

tape( 'if provided `+infinity`, the function returns `NaN`', function test( t ) {
	var v = tan( PINF );
	t.equal( isnan( v ), true, 'returns NaN' );
	t.end();
});

tape( 'if provided `-infinity`, the function returns `NaN`', function test( t ) {
	var v = tan( NINF );
	t.equal( isnan( v ), true, 'returns NaN' );
	t.end();
});

}).call(this,"/lib/node_modules/@stdlib/math/base/special/tan/test/test.js")
},{"./../lib":61,"./fixtures/julia/huge_negative.json":63,"./fixtures/julia/huge_positive.json":64,"./fixtures/julia/large_negative.json":65,"./fixtures/julia/large_positive.json":66,"./fixtures/julia/medium_negative.json":67,"./fixtures/julia/medium_positive.json":68,"./fixtures/julia/small_negative.json":69,"./fixtures/julia/small_positive.json":70,"./fixtures/julia/smaller.json":71,"./fixtures/julia/subnormal.json":72,"./fixtures/julia/tiny_negative.json":73,"./fixtures/julia/tiny_positive.json":74,"./fixtures/julia/very_large_negative.json":75,"./fixtures/julia/very_large_positive.json":76,"@stdlib/constants/math/float64-eps":26,"@stdlib/constants/math/float64-ninf":32,"@stdlib/constants/math/float64-pi":33,"@stdlib/constants/math/float64-pinf":34,"@stdlib/math/base/assert/is-nan":41,"@stdlib/math/base/special/abs":44,"tape":174}],78:[function(require,module,exports){
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
* Returns an unsigned 32-bit integer corresponding to the less significant 32 bits of a double-precision floating-point number.
*
* @module @stdlib/number/float64/base/get-low-word
*
* @example
* var getLowWord = require( '@stdlib/number/float64/base/get-low-word' );
*
* var w = getLowWord( 3.14e201 ); // => 10010011110010110101100010000010
* // returns 2479577218
*/

// MODULES //

var getLowWord = require( './main.js' );


// EXPORTS //

module.exports = getLowWord;

},{"./main.js":88}],87:[function(require,module,exports){
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

},{"@stdlib/assert/is-little-endian":18}],88:[function(require,module,exports){
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
* Returns a 32-bit unsigned integer corresponding to the less significant 32 bits of a double-precision floating-point number.
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
* @param {number} x - input value
* @returns {uinteger32} lower order word
*
* @example
* var w = getLowWord( 3.14e201 ); // => 10010011110010110101100010000010
* // returns 2479577218
*/
function getLowWord( x ) {
	FLOAT64_VIEW[ 0 ] = x;
	return UINT32_VIEW[ LOW ];
}


// EXPORTS //

module.exports = getLowWord;

},{"./low.js":87,"@stdlib/array/float64":2,"@stdlib/array/uint32":7}],89:[function(require,module,exports){
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

},{"@stdlib/constants/math/float64-smallest-normal":35,"@stdlib/math/base/assert/is-infinite":39,"@stdlib/math/base/assert/is-nan":41,"@stdlib/math/base/special/abs":44}],92:[function(require,module,exports){
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
arguments[4][87][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":18,"dup":87}],94:[function(require,module,exports){
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

},{"./float64array.js":100,"@stdlib/assert/is-float64array":15}],100:[function(require,module,exports){
'use strict';

// EXPORTS //

module.exports = ( typeof Float64Array === 'function' ) ? Float64Array : null;

},{}],101:[function(require,module,exports){
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

},{"./detect_float64array_support.js":99}],102:[function(require,module,exports){
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

},{}],103:[function(require,module,exports){
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

},{"./detect_symbol_support.js":102}],104:[function(require,module,exports){
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

},{"@stdlib/utils/detect-symbol-support":103}],105:[function(require,module,exports){
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

},{"./has_tostringtag_support.js":104}],106:[function(require,module,exports){
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

},{"./uint16array.js":108,"@stdlib/assert/is-uint16array":20,"@stdlib/constants/math/uint16-max":36}],107:[function(require,module,exports){
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

},{"./detect_uint16array_support.js":106}],108:[function(require,module,exports){
'use strict';

// EXPORTS //

module.exports = ( typeof Uint16Array === 'function' ) ? Uint16Array : null;

},{}],109:[function(require,module,exports){
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

},{"./uint32array.js":111,"@stdlib/assert/is-uint32array":22,"@stdlib/constants/math/uint32-max":37}],110:[function(require,module,exports){
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

},{"./detect_uint32array_support.js":109}],111:[function(require,module,exports){
'use strict';

// EXPORTS //

module.exports = ( typeof Uint32Array === 'function' ) ? Uint32Array : null;

},{}],112:[function(require,module,exports){
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

},{"./uint8array.js":114,"@stdlib/assert/is-uint8array":24,"@stdlib/constants/math/uint8-max":38}],113:[function(require,module,exports){
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

},{"./detect_uint8array_support.js":112}],114:[function(require,module,exports){
'use strict';

// EXPORTS //

module.exports = ( typeof Uint8Array === 'function' ) ? Uint8Array : null;

},{}],115:[function(require,module,exports){
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

},{"./native_class.js":116,"./polyfill.js":117,"@stdlib/utils/detect-tostringtag-support":105}],116:[function(require,module,exports){
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

},{"./tostring.js":118}],117:[function(require,module,exports){
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

},{"./tostring.js":118,"./tostringtag.js":119,"@stdlib/assert/has-own-property":14}],118:[function(require,module,exports){
'use strict';

// MAIN //

var toStr = Object.prototype.toString;


// EXPORTS //

module.exports = toStr;

},{}],119:[function(require,module,exports){
'use strict';

// MAIN //

var toStrTag = ( typeof Symbol === 'function' ) ? Symbol.toStringTag : '';


// EXPORTS //

module.exports = toStrTag;

},{}],120:[function(require,module,exports){
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

},{}],121:[function(require,module,exports){

},{}],122:[function(require,module,exports){
arguments[4][121][0].apply(exports,arguments)
},{"dup":121}],123:[function(require,module,exports){
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

},{}],124:[function(require,module,exports){
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

},{"base64-js":120,"ieee754":143}],125:[function(require,module,exports){
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
},{"../../is-buffer/index.js":145}],126:[function(require,module,exports){
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

},{"./lib/is_arguments.js":127,"./lib/keys.js":128}],127:[function(require,module,exports){
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

},{}],128:[function(require,module,exports){
exports = module.exports = typeof Object.keys === 'function'
  ? Object.keys : shim;

exports.shim = shim;
function shim (obj) {
  var keys = [];
  for (var key in obj) keys.push(key);
  return keys;
}

},{}],129:[function(require,module,exports){
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

},{"foreach":139,"object-keys":149}],130:[function(require,module,exports){
module.exports = function () {
    for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] !== undefined) return arguments[i];
    }
};

},{}],131:[function(require,module,exports){
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

},{"./helpers/isFinite":132,"./helpers/isNaN":133,"./helpers/mod":134,"./helpers/sign":135,"es-to-primitive/es5":136,"has":142,"is-callable":146}],132:[function(require,module,exports){
var $isNaN = Number.isNaN || function (a) { return a !== a; };

module.exports = Number.isFinite || function (x) { return typeof x === 'number' && !$isNaN(x) && x !== Infinity && x !== -Infinity; };

},{}],133:[function(require,module,exports){
module.exports = Number.isNaN || function isNaN(a) {
	return a !== a;
};

},{}],134:[function(require,module,exports){
module.exports = function mod(number, modulo) {
	var remain = number % modulo;
	return Math.floor(remain >= 0 ? remain : remain + modulo);
};

},{}],135:[function(require,module,exports){
module.exports = function sign(number) {
	return number >= 0 ? 1 : -1;
};

},{}],136:[function(require,module,exports){
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

},{"./helpers/isPrimitive":137,"is-callable":146}],137:[function(require,module,exports){
module.exports = function isPrimitive(value) {
	return value === null || (typeof value !== 'function' && typeof value !== 'object');
};

},{}],138:[function(require,module,exports){
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

},{}],139:[function(require,module,exports){

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


},{}],140:[function(require,module,exports){
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

},{}],141:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

module.exports = Function.prototype.bind || implementation;

},{"./implementation":140}],142:[function(require,module,exports){
var bind = require('function-bind');

module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);

},{"function-bind":141}],143:[function(require,module,exports){
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

},{}],144:[function(require,module,exports){
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

},{}],145:[function(require,module,exports){
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

},{}],146:[function(require,module,exports){
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

},{}],147:[function(require,module,exports){
var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};

},{}],148:[function(require,module,exports){
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

},{}],149:[function(require,module,exports){
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

},{"./isArguments":150}],150:[function(require,module,exports){
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

},{}],151:[function(require,module,exports){
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
},{"_process":123}],152:[function(require,module,exports){
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
},{"_process":123}],153:[function(require,module,exports){
module.exports = require('./lib/_stream_duplex.js');

},{"./lib/_stream_duplex.js":154}],154:[function(require,module,exports){
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
},{"./_stream_readable":156,"./_stream_writable":158,"core-util-is":125,"inherits":144,"process-nextick-args":152}],155:[function(require,module,exports){
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
},{"./_stream_transform":157,"core-util-is":125,"inherits":144}],156:[function(require,module,exports){
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
},{"./_stream_duplex":154,"./internal/streams/BufferList":159,"./internal/streams/destroy":160,"./internal/streams/stream":161,"_process":123,"core-util-is":125,"events":138,"inherits":144,"isarray":147,"process-nextick-args":152,"safe-buffer":167,"string_decoder/":173,"util":121}],157:[function(require,module,exports){
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
},{"./_stream_duplex":154,"core-util-is":125,"inherits":144}],158:[function(require,module,exports){
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
},{"./_stream_duplex":154,"./internal/streams/destroy":160,"./internal/streams/stream":161,"_process":123,"core-util-is":125,"inherits":144,"process-nextick-args":152,"safe-buffer":167,"util-deprecate":180}],159:[function(require,module,exports){
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
},{"safe-buffer":167}],160:[function(require,module,exports){
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
},{"process-nextick-args":152}],161:[function(require,module,exports){
module.exports = require('events').EventEmitter;

},{"events":138}],162:[function(require,module,exports){
module.exports = require('./readable').PassThrough

},{"./readable":163}],163:[function(require,module,exports){
exports = module.exports = require('./lib/_stream_readable.js');
exports.Stream = exports;
exports.Readable = exports;
exports.Writable = require('./lib/_stream_writable.js');
exports.Duplex = require('./lib/_stream_duplex.js');
exports.Transform = require('./lib/_stream_transform.js');
exports.PassThrough = require('./lib/_stream_passthrough.js');

},{"./lib/_stream_duplex.js":154,"./lib/_stream_passthrough.js":155,"./lib/_stream_readable.js":156,"./lib/_stream_transform.js":157,"./lib/_stream_writable.js":158}],164:[function(require,module,exports){
module.exports = require('./readable').Transform

},{"./readable":163}],165:[function(require,module,exports){
module.exports = require('./lib/_stream_writable.js');

},{"./lib/_stream_writable.js":158}],166:[function(require,module,exports){
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
},{"_process":123,"through":179}],167:[function(require,module,exports){
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

},{"buffer":124}],168:[function(require,module,exports){
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

},{"events":138,"inherits":144,"readable-stream/duplex.js":153,"readable-stream/passthrough.js":162,"readable-stream/readable.js":163,"readable-stream/transform.js":164,"readable-stream/writable.js":165}],169:[function(require,module,exports){
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

},{"es-abstract/es5":131,"function-bind":141}],170:[function(require,module,exports){
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

},{"./implementation":169,"./polyfill":171,"./shim":172,"define-properties":129,"function-bind":141}],171:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

var zeroWidthSpace = '\u200b';

module.exports = function getPolyfill() {
	if (String.prototype.trim && zeroWidthSpace.trim() === zeroWidthSpace) {
		return String.prototype.trim;
	}
	return implementation;
};

},{"./implementation":169}],172:[function(require,module,exports){
'use strict';

var define = require('define-properties');
var getPolyfill = require('./polyfill');

module.exports = function shimStringTrim() {
	var polyfill = getPolyfill();
	define(String.prototype, { trim: polyfill }, { trim: function () { return String.prototype.trim !== polyfill; } });
	return polyfill;
};

},{"./polyfill":171,"define-properties":129}],173:[function(require,module,exports){
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
},{"safe-buffer":167}],174:[function(require,module,exports){
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
},{"./lib/default_stream":175,"./lib/results":177,"./lib/test":178,"_process":123,"defined":130,"through":179}],175:[function(require,module,exports){
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
},{"_process":123,"fs":122,"through":179}],176:[function(require,module,exports){
(function (process){
module.exports = typeof setImmediate !== 'undefined'
    ? setImmediate
    : process.nextTick
;

}).call(this,require('_process'))
},{"_process":123}],177:[function(require,module,exports){
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
},{"_process":123,"events":138,"function-bind":141,"has":142,"inherits":144,"object-inspect":148,"resumer":166,"through":179}],178:[function(require,module,exports){
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
},{"./next_tick":176,"deep-equal":126,"defined":130,"events":138,"has":142,"inherits":144,"path":151,"string.prototype.trim":170}],179:[function(require,module,exports){
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
},{"_process":123,"stream":168}],180:[function(require,module,exports){
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
},{}]},{},[77]);
