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

},{"./float64array.js":1,"./polyfill.js":3,"@stdlib/utils/detect-float64array-support":125}],3:[function(require,module,exports){
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

},{"./polyfill.js":5,"./uint16array.js":6,"@stdlib/utils/detect-uint16array-support":131}],5:[function(require,module,exports){
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

},{"./polyfill.js":8,"./uint32array.js":9,"@stdlib/utils/detect-uint32array-support":134}],8:[function(require,module,exports){
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

},{"./polyfill.js":11,"./uint8array.js":12,"@stdlib/utils/detect-uint8array-support":137}],11:[function(require,module,exports){
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

},{"@stdlib/utils/native-class":139}],17:[function(require,module,exports){
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

},{"@stdlib/utils/native-class":139}],22:[function(require,module,exports){
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

},{"@stdlib/utils/native-class":139}],24:[function(require,module,exports){
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

},{"@stdlib/utils/native-class":139}],26:[function(require,module,exports){
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

// MODULES //

var constantFunction = require( '@stdlib/utils/constant-function' );
var gammaln = require( '@stdlib/math/base/special/gammaln' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var ln = require( '@stdlib/math/base/special/ln' );
var NINF = require( '@stdlib/constants/math/float64-ninf' );


// MAIN //

/**
* Returns a function for evaluating the natural logarithm of the probability density function (PDF) for an inverse gamma distribution with shape parameter `alpha` and scale parameter `beta`.
*
* @param {PositiveNumber} alpha - shape parameter
* @param {PositiveNumber} beta - scale parameter
* @returns {Function} logPDF
*
* @example
* var logpdf = factory( 3.0, 1.5 );
*
* var y = logpdf( 1.0 );
* // returns ~-0.977
*
* y = logpdf( 2.0 );
* // returns ~-3.0
*/
function factory( alpha, beta ) {
	var firstTerm;
	if (
		isnan( alpha ) ||
		isnan( beta ) ||
		alpha <= 0.0 ||
		beta <= 0.0
	) {
		return constantFunction( NaN );
	}
	firstTerm = ( alpha * ln( beta ) ) - gammaln( alpha );
	return logpdf;

	/**
	* Evaluates the natural logarithm of the probability density function (PDF) for an inverse gamma distribution.
	*
	* @private
	* @param {number} x - input value
	* @returns {number} evaluated logPDF
	*
	* @example
	* var y = logpdf( -1.2 );
	* // returns <number>
	*/
	function logpdf( x ) {
		var out;
		if ( isnan( x ) ) {
			return NaN;
		}
		if ( x <= 0.0 ) {
			return NINF;
		}
		out = firstTerm - ( ( alpha + 1.0 ) * ln( x ) ) - ( beta / x );
		return out;
	}
}


// EXPORTS //

module.exports = factory;

},{"@stdlib/constants/math/float64-ninf":32,"@stdlib/math/base/assert/is-nan":41,"@stdlib/math/base/special/gammaln":63,"@stdlib/math/base/special/ln":82,"@stdlib/utils/constant-function":120}],44:[function(require,module,exports){
'use strict';

/**
* Natural logarithm of the probability density function (PDF) for an inverse gamma distribution.
*
* @module @stdlib/math/base/dists/invgamma/logpdf
*
* @example
* var logpdf = require( '@stdlib/math/base/dists/invgamma/logpdf' );
*
* var y = logpdf( 2.0, 0.5, 1.0 );
* // returns ~-2.112
*
* var mylogPDF = logpdf.factory( 6.0, 7.0 );
* y = mylogPDF( 2.0 );
* // returns ~-1.464
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-read-only-property' );
var logpdf = require( './logpdf.js' );
var factory = require( './factory.js' );


// MAIN //

setReadOnly( logpdf, 'factory', factory );


// EXPORTS //

module.exports = logpdf;

},{"./factory.js":43,"./logpdf.js":45,"@stdlib/utils/define-read-only-property":122}],45:[function(require,module,exports){
'use strict';

// MODULES //

var gammaln = require( '@stdlib/math/base/special/gammaln' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var ln = require( '@stdlib/math/base/special/ln' );
var NINF = require( '@stdlib/constants/math/float64-ninf' );


// MAIN //

/**
* Evaluates the natural logarithm of the probability density function (PDF) for an inverse gamma distribution with shape parameter `alpha` and scale parameter `beta` at a value `x`.
*
* @param {number} x - input value
* @param {PositiveNumber} alpha - shape parameter
* @param {PositiveNumber} beta - scale parameter
* @returns {number} evaluated logPDF
*
* @example
* var y = logpdf( 2.0, 0.5, 1.0 );
* // returns ~-2.112
*
* @example
* var y = logpdf( 0.2, 1.0, 1.0 );
* // returns ~-1.781
*
* @example
* var y = logpdf( -1.0, 4.0, 2.0 );
* // returns -Infinity
*
* @example
* var y = logpdf( NaN, 1.0, 1.0 );
* // returns NaN
*
* @example
* var y = logpdf( 0.0, NaN, 1.0 );
* // returns NaN
*
* @example
* var y = logpdf( 0.0, 1.0, NaN );
* // returns NaN
*
* @example
* // Negative shape parameter:
* var y = logpdf( 2.0, -1.0, 1.0 );
* // returns NaN
*
* @example
* // Negative scale parameter:
* var y = logpdf( 2.0, 1.0, -1.0 );
* // returns NaN
*/
function logpdf( x, alpha, beta ) {
	var out;
	if (
		isnan( x ) ||
		isnan( alpha ) ||
		isnan( beta ) ||
		alpha <= 0.0 ||
		beta <= 0.0
	) {
		return NaN;
	}
	if ( x <= 0.0 ) {
		return NINF;
	}
	out = (alpha * ln( beta )) - gammaln( alpha );
	out -= (alpha + 1.0) * ln( x );
	out -= beta / x;
	return out;
}


// EXPORTS //

module.exports = logpdf;

},{"@stdlib/constants/math/float64-ninf":32,"@stdlib/math/base/assert/is-nan":41,"@stdlib/math/base/special/gammaln":63,"@stdlib/math/base/special/ln":82}],46:[function(require,module,exports){
module.exports={"expected":[-0.5958124060280952,-18.290227559402407,-8.064877724503514,-5.548637936659835,-0.5632181662498663,-2.11711928653238,0.9993142004168547,-9.453056444129015,-1.330007121819035,-28.35140060294293,-3.1331650352972744,0.5789513200628207,-32.18129469832433,-4.630746374623923,-2.274858853563913,-11.945160058766515,-0.6783776628893268,-2.277343079602499,-11.960061397587674,-3.447080062539296,-20.828440276029664,-8.999671804296897,-22.615063308917712,-97.03446628203127,0.23333645069700282,-0.19872751880535588,-13.34481995593363,-24.08957586824949,-21.151735431289076,-20.600589655109268,-35.98921032542316,1.2339521234071462,-102.80377115964336,-4.974633537024353,-11.095283221691243,0.31599485013967765,-10.19815673543785,-6.820945778867658,-12.579433559622299,-3.7636688486101413,-4.137187611712882,-862.3885840913211,-4.545789181947626,-2.4676368942134905,-29.952116344191502,-12.3051311674969,-7.612257966109395,-23.01677604718143,-28.85482064560751,-8.740017447958769,-5.632124471105344,-0.3247335915367451,-2.515847578555352,-10.74494555164186,-16.987297309018828,-12.219011590424302,-2.6692494267174975,-2.4020126273097073,-3.8197780034116073,-1.1067123237126388,-1.6725869546437302,-11.964978803357093,0.31065798826593394,-11.794910819339618,-12.786388154508215,-6.55045720639963,-0.05167525355932767,0.6510816653288778,-5.852712010365042,-216.81037879120737,0.17134276423268346,-0.577992477559846,-1.8446713013390088,0.16718577032244397,0.08515904749303616,-5.9051209527113295,-0.43500786508431943,-3.629490406917265,-12.46704077866036,-24.047624955857682,-16.608152344256986,-37.03926984394969,-8.808874465257452,-22.52564580202612,-0.7873479870526268,-0.24389905810362045,-12.347515655322017,0.8563667454551371,-23.376044548952425,-7.356994041392387,-18.754021027912522,-2.624976660106917,-40.19209646949793,0.6903821870395639,-6.566126830727036,-17.915926805087643,-25.210511493411595,-13.37844325956944,-5.080303128503161,-1.1216232414261285,-4.670531695329288,-17.95243433092094,-1.7157965492503475,-12.49289616325876,-2.225218424637328,-9.838110498324857,0.3546901025904994,-14.94007851039677,-0.5237933636709649,0.08334820068760251,-0.7933907875009538,-1.8094202685025405,-10.6413663085156,-8.353769721185806,-0.3800402136012355,-1.7432464587906686,-1.5684434056070575,-1.2366634053313224,-0.1748208905086912,-61.683535732003776,-26.630700247710436,-11.941005579474083,-1.110997104984003,-5.419631414519188,-14.574584241012957,-1.837391236469383,-3.0976133034894495,-2.7340031425239593,-10.023715926611322,-1.1614231544933133,-22.069636945072965,-11.335536290564502,-12.149236999740692,-12.733936328794542,-13.790981616533259,-6.615647664596693,-21.729229104458312,-8.867667995319975,-21.183614554795504,-13.324774813992494,-0.40103606391293134,-3.24418415796638,-0.15656724454805904,-21.77857175895143,-0.4287850513930671,-18.792824291410454,-4.8750550551435685,-6.794516113345139,-1.220304656355335,-20.96058621425509,-15.416556923499064,-49.82488434248158,-14.509193205664005,-7.5972357582368994,-5.792226264200113,-13.042609572837923,-3.300243841426264,-0.21467485886822146,-18.41608496369828,-8.867134698332881,-4.066228994765629,-16.555678528154754,-9.603474306925907,-4.285060742941541,-0.6018731674790523,-31.967104830903455,-3.329067629362245,-21.059077373824596,-41.681388777703425,-12.580580546706772,-16.46313671611674,-12.05840260653671,-1.0932200671745758,-6.163982935388994,-7.246254619137472,-9.099432326508369,1.585245300418979,-19.448181846368108,-24.326259659242066,0.9588195868382172,-7.540007945770843,-1.7934809805829186,-9.673654871337959,-6.1971256707607605,-9.271042142478631,-23.28215065039524,-6.042549940914813,-8.184787883888497,-17.89810726659934,-3.965324491520178,-14.093282691493162,-27.763440777925084,-2.65913830850862,-24.778295584132223,-425.7712677838689,-63.57008148276756,-18.743586783540916,-1.9407015742804479,-13.025293406205506,1.285350878345639,-2.029667428239449,-3.419613445682625,-12.426836318258744,-0.8194486549126854,-18.716825417195096,-6.296772305589277,-7.627584393697547,-21.57713209367062,-0.2997776868908364,-21.03580833425148,-10.653529679476492,-41.39639548482441,-6.828739069338024,-14.726700665398,-0.3781969000265928,0.23685987568440225,-17.64072059718796,-12.641483087828298,-12.864600283560707,0.34305751647147353,-46.12640371136428,-0.7629970125933792,-10.576125268086674,-7.190977257319338,-24.42634880510721,-10.014385507557986,-5.852618940785041,-14.094855137547821,-20.145739849108224,-37.4485319924284,0.09678296988338886,-4.9945562355016815,-3.665913523752325,-25.538314656194963,-5.092512346750922,-83.63552667412364,-13.378287543452151,-4.462283829033822,-7.017397751456651,-10.401331106927554,-7.993250863580355,-27.34401392289172,-22.8568648532602,-16.682510011095115,-11.417358350043855,-5.485141770479469,-7.530847764361425,-12.221873595999368,-39.625420310915985,0.09755206599529131,-4.51608263742602,-16.278693199352052,-1317.1038729456566,-28.666005092952705,-145.30699027061357,0.15604573784693443,-2.280973311362567,-10.177544087676322,-49.70040539529771,-19.73576058803454,-43.5117765039223,-215.0434233019212,-1.0908010249049198,-1745.6148325181061,0.6130023480556055,-22.455581755892165,-30.43101226351523,-2.6435904698947645,-0.548240806828133,-7.857875807834482,-13.4753622448141,-6.52906028598635,-1.1457055084393097,-32.73619125184902,-19.71338428824655,-6.142843895222828,-27.12848129633671,-5.29616111145699,-6.179424101242912,-3.3958191614762043,-2.933646569878988,-1.579013653233309,-0.30656920942672095,-2.1541493272744283,-6.075985801261073,-30.494633189451193,-1.613409394537758,-35.43853835626575,0.33818683852947373,-239.25019458743904,-3.2643670416730615,0.724937506643542,-7.677403947269404,-8.784836265425954,0.47211536860625003,-7.114020161711845,-0.7499285383193861,-0.601626204360592,-4.80975000760512,-24.493627460423454,-28.019766861177626,-2941.5354534590224,0.8554313041531572,-0.24476292637591612,-15.075922318337208,-19.285965239397857,-1.1629817682531733,-12.643481314448097,-12.74619290139296,0.11696609696737781,-9.146100622120787,-0.08718941932291457,-5.7832771719999885,-10.444983911532216,-24.642056058836047,-6.780441602997016,-12.084725506600138,-0.7761647642482927,-23.62304072021834,-0.4784562412408917,0.4653763010225447,-8.21895382928529,0.04027618210420414,-6.885337930927555,-13.254141765280709,-4.650296889213571,-1.8272564738705803,-6.664123497448978,-6.450768338511423,-20.94304154981632,-0.3236284428028835,-0.19799504160219428,-3.4654768078785496,-0.1813784849542408,-3.8924753318522605,-22.3509450300182,-10.542270720205185,-32.48793868154384,-14.869674533881277,-0.7755698472630783,-4.785520644868914,-0.5862837903903646,-0.09349738729851254,-0.7146500948345071,-2.167111116657452,-2.956025170702272,-39.943324335652555,-11.945178888552142,-5.43490310060035,-10.458941932367704,-3.9938711662784145,-12.695034484434343,-1.8171345662521867,-16.191815969395527,-5.132223213926256,-1.5946863331002046,-16.058715219123318,-1.9290186565077931,-19.15265066563047,-12.264554564484367,-3.4172468369601816,-1.5267939077505837,-66.14038376440794,-2.027910131934682,-2.1753561284303995,-0.4445685250751481,-24.398550777076554,-12.09169136219042,-21.57185908154288,-1.851144668606949,-6.173409407393205,-0.07248134703610631,-31.55421301724651,-3.6007109079874606,-11.149655151897697,-3.289683136369252,-17.5378230691747,0.6515261490981032,-17.336571777166995,-2.3127993976366525,-4.650224691848333,-6.947965083774951,-20.564906990990796,-0.1519881377693899,-36.314896157573926,-2.193738619952656,-9.69581437729252,-1.70921626533082,-10.965405251253436,-1.9394534637279577,-22.878262797854884,-22.321293444531687,-4.299446582899237,-2.709171233417008,-21.08409547988307,-5.3178749125301,-4.43067552311131,-9.392326281423749,0.6077127584186997,-16.40572767959857,-1.7589701184949913,-15.702273679529139,-8.904446489748707,-4.86178148232033,-0.5486385395187803,-2.88077959177531,-6.104383592096873,-4.361047254096582,0.4656845482586043,-4.135927140149956,-24.178859769912407,-40.662616156522944,-26.514067162373678,-10.619195767070822,-8.223730744485017,-62.18796058668809,-19.18548976191714,-1.8759040749952849,-5.639588278853602,-9.478859992299217,-7.275007513113842,-10.595128886021502,0.6547079842531929,-2.4780664336880758,-4.767367642338063,-19.780419740532032,-11.679867488880959,-3.910836240810138,1.1976576256715283,-13.396548547212804,-15.600318556913866,-4.288576735839214,-2.6758291078009098,-2.2101331687308647,-5.847473856416005,-9.88453541454679,-23.189383066988846,-23.067745842985094,-6.841556814389535,-19.82089229824154,-3.006566790108633,-0.4670496868724374,-34.1931580620545,-5.857972068666431,-1.4012940843902681,0.6617512304767068,0.5462871347759872,-19.71090360810377,-18.03877432533002,0.7974876418033503,-14.91295168211208,-16.174209526084457,-45.83406785931706,-7.586154532990727,-7.630066350035818,-11.10576189935571,-30.497505486117284,-1.1468545757302326,-0.029855133576512927,-4.429909866157072,-4.643451034259903,-57.43367415566887,-3.1448571134594214,-2.5740687393433133,-8.501584624188208,-181.0914687605867,-5.976891795693686,-13.26684033821184,-5.359089243750521,-15.170793517067025,-35.37714102930571,-0.9463968219790964,-15.352151895792051,-7.685964882756122,-4.654996154026,-33.0935213309743,0.12962077555089735,-20.158003465922675,-18.18193901166819,-19.391721552766313,-17.21562729327502,-2.1756240715333224,-5.520577786808194,-13.61417602683072,-0.42457189790700234,-31.932950949273298,-13.442605277432701,-13.660577205491865,-17.666862191028272,-20.660611295864687,-2.409328184303945,-0.5459262740026816,-44.022794511722154,-0.5982965395050872,-8.092979548065326,-12.720621433629269,-43.84264904845553,-7.725402370892649,-72.2953778595561,-5.146657457057696,-3.476669666210615,-13.972920829270677,-3.283563835045518,-4.480932683854065,-10.940281076577184,-8.291840328071794,-13.666804225444764,-1.342439193107988,-79.98729051299992,0.15075024183760455,-16.836255898639433,-2.481398203596309,0.5518233601579077,-3.3968980561043267,-12.518663176478572,-9.296237779001777,-18.294902015803345,0.2799312841111714,-4.242506492351204,-14.44585255486211,-2.6745444438437236,-6.02361017573544,-4.682268113636818,-153.7393378028462,-8.791043564119503,-35.504017532470336,-3.4987078470769992,-19.658714869568826,-14.646642247201417,-2.326061117508072,-18.24177004296275,-5.390126671103095,-0.14938882227005124,0.013565049980201138,-4.12705798789462,-2.0196218629269787,-4.6668302100134635,-7.998974381933036,-9.844772130142811,-8.344876837404462,-4.151848864710155,-17.519581954729453,-19.10680389114853,-0.32767546247378654,-7.382339582525368,-0.5704590236216998,-7.712535681790068,-38.00260577731571,-4.094394099774376,-2.738966184230595,-9.063359492432165,-8.911112726949577,-28.06115918747304,-9.58077665782112,-14.8682441584135,-2.3078072307832542,-3.0082304599908056,-20.73438597039889,-14.373954298032675,-0.9365831406944807,-6.672690149548705,-17.284055772186797,-3.506650777309555,0.18439455642128522,-10.133851020031566,-0.9162279682055718,-11.353115095848704,-12.685173313534479,-20.905461213466175,-3.1066238137754567,-70.70135122954345,-7.471981995848518,-15.356850551283646,-1.2990101895281594,-0.4470327319147689,-4.464119264279567,-18.321168413304186,-0.69492849144528,-8.174406447770156,-85.30549297875486,-9.328193019911948,-16.084863147208004,-13.300069024077288,-5.173283859218831,-18.01681387028514,-11.488453222684015,-17.666509016788282,-22.896362219242345,-10.246268801456011,-25.55559118868005,-4.241373604674948,-14.00312398162571,-3.6479437383472124,0.2871215887391241,-9.151171122982815,-9.050118126851753,-19.722390482434285,-5.969629271365627,-3.1750254174524635,-9.903236576557074,-33.126637634534326,-0.46026061632567483,-7.303271629472929,-4.3111092479211734,-5.674398395334141,-4.772124273859493,-12.17378528466098,1.0615949666073448,-5.112630542152726,-3.4827326376344017,-1.3981763394214184,-6.811654099955092,0.6033338776641841,-6.897138929921676,-1.9476355500993794,-22.65198797952747,-37.02227034850087,-1.8867678098528664,-4.554340263754542,-14.341914445213542,-15.396705455707899,-6.042745937057592,-24.803696342517387,-8.417293862743481,-10.015015140146295,-13.359092471195744,-0.7096369068881536,-23.49389429573604,-3.720539251547077,-9.51021980653843,-0.5304235342347301,-11.778010861455437,0.29862023711269714,-10.83856157774989,-8.78908162542385,-4.4092233689885845,-13.044291631107257,-0.1665692153270122,-17.564014554037243,-27.18229916165062,-1.840016149837858,-1.630741440917146,-9.126953108466209,1.223232642167705,-2.3646813273392056,-2.884474535365799,-21.977593651119196,-2.5913275046633437,-11.006476018640933,-5.4384891857933635,-24.758421239188355,-4.360845096049612,-2.6250899492768625,-10.771285533749904,-7.538758267046116,-13.32640199393914,-7.174355422669458,-21.39704718807072,-0.41379697804025284,-0.029186887588707577,-177.57982582161162,-0.22073149513638946,-29.573724647134622,-0.14751606039615694,-13.205009385761679,-1.0257550028933657,-0.07812741083465014,-5.483674623154089,-10.02804989758432,-5.149162020646939,-8.802318659123259,-3.672006665596509,-6.354425262048574,-5.237226663953095,-20.51566135563681,-11.891415577722402,-38.82896608728801,-5.910770101606104,-1.1700791801575718,-11.701885501041959,-12.820356215877737,-2.2978513970191408,-3.814403260825916,-0.952785427970408,-8.520801280059917,-4.206329809058713,0.5411481109486225,-2.2312574896582973,-2.67266786452155,-11.117263247728765,-8.793059685976868,-24.14552306311771,-10.970425119248675,-0.6005749893122605,-4.112301918829784,-10.372234806658316,-0.4747908669564307,-1.690309645838405,1.1280140949612054,-4.285450844192599,0.17615759954930255,-0.28886138715629883,-1.3132467887138795,-41.45031158843673,-0.5616886088438946,-0.2400511070436302,-16.516298281461225,-13.530907707487202,-6.933333351520368,-24.419746557169102,-13.070784654575451,-26.74595082809921,-2.5521132492731864,-19.496224644236133,-4.960033331346916,-0.12010951608554343,-5.881873096738849,-31.06363767058579,-0.4640848039461307,-11.349835976533011,-6.652046986504608,-37.09034737261287,-2.2817470550859706,-1.0164909294938553,-1.5357022083923662,-20.39067583330954,-19.7604758197248,0.029848461704794715,-16.490045051978854,-47.2364790654794,-3.0471129993587063,-24.083034419042164,0.12055976092244691,-35.19525195170136,-10.372383167058217,-22.5346763112223,-21.938523282865823,-12.99763890092706,-33.85568890008094,-0.9374996038117587,-17.271486013681212,-8.973264911015203,-5.215466408594363,-0.8123611602234888,-18.418063321009967,-13.845071991305081,-13.021065449975644,-2.0019008673504075,-15.818827751469145,-17.19022531601849,-19178.408971819175,-2.6123281772505216,-1.024738283313921,-31.184873053170143,-7.5701240885459375,-14.870720043988124,-0.9322350490913323,-3.6093965321843378,-0.2991345909957257,-3.1042675199769496,-5.650135245093372,-117.43561032575519,-4.866111228476839,-0.5624968313891543,-39.973522868699234,-2.4582211817472377,-25.623112115752917,-0.6224330947283896,-1.6299714357110426,-35.97487870456399,-7.606980581606466,-17.73343515767063,0.9989825646376502,-6.606393955222105,0.37129343294794737,-3.903999460423461,-6.1662261717539115,-10.627147755264941,-0.7427534843374666,-16.657554525308328,-641.3612783236888,-23.57351015661662,0.3612454286518094,-26.768195095787974,-1.3437181142415557,-22.7356084243127,-5.942085648263145,-7.484577750825281,-17.98672698601431,-14.106788326177101,-0.14647148531905607,-3.6730469012775506,-5.879781226208872,-7.547765016129919,-10.666019333886275,-8.715296174510684,-15.262848074118093,-10.622357083937818,0.054709365925802445,-3.7548838331830368,-1.0967477603907145,0.1135457606916006,-10.068670770867602,-40.78167943500689,-1.1627149733633697,-2.6138406257904387,-2.917172653673749,0.8356990844650554,-13.237552724785056,-8.062622434901566,-8.087951602904688,-6.942248637274199,-15.989923814134857,-5.6564021274214475,-1.1051398686114347,-5.335197874494825,0.1789540868884405,0.25048565888144125,-7.2902677699281435,-2.7562034104803033,-14.413702151100518,-90.91855617565602,-9.695794912121343,-2.5434991663205526,-26.498688295998484,-96.1492162162251,-2.2624874411629996,-0.013383988122555479,-3.144823194591474,0.297697357191133,-66.55668980593501,-13.465901954541511,-20.02666230386927,-165.21446828870106,-4.213720989896397,-5.093754947255217,0.0196408787691027,-12.360944855944286,-17.06544210681392,-21.754105348735813,-22.895305948973093,-1.157519272412828,-24.415288617233152,-109.40551824524067,-10.221723616934232,-27.02043447452376,-2.2257862167554237,-2.81280747377863,-3.073432566540591,-9.24629376559453,-1.4326299473256334,-8.25645711544955,-9.681131644626085,-0.19008326974403644,-11.736416743032063,-9.887921200188956,-5.291116698641173,0.11519714782311219,-6.133248408683203,-13.15671337963062,-2.6364740272542946,-7.173722890018881,-8.328635616571137,-5.455857211166739,-0.8903591617398714,-23.082137602102428,-0.279017397823651,-33.535903971979124,-12.612393915608616,-144.1539533956227,-9.581781813659543,-36.59130251172692,-8.076233508705037,-7.066712637885703,-3.0318087993442955,-12.752027368124768,-16.139342086011553,-14.17940988664138,-2.8288890826332196,-44.62801824816369,-30.403639430797746,-0.41816923575839837,-11.207439467754128,-11.967474651998447,-4.181838841260716,-18.898760012011603,-15.201804901946092,-20.196039786698343,-20.27435167010614,-10.672077383187755,-13.884611077314087,-49.086449701332626,-5.994646059706646,-5.097181760667645,-9.6763180735367,-4.003899757792162,-175.51271482259523,-16.724321810497468,-10.531368038247905,-4.038762018164462,-18.681843646711485,-5.2659032100944545,-1.8201013715892866,-2.3481198450797613,-6.115978819674828,-0.311393019240354,-6.681554488100041,-1.8407026005375222,-7.431738523958449,-4.347628519798856,-13.370075248881275,-18.184848965766747,0.42958092857646335,-0.8314725549805182,-0.8261646153253857,-0.6697474442130531,-7.269009760417852,-2.309551978361279,-3.2489353462990334,-2.6258410845179094,0.6520785017961472,-0.02881012783109327,-13.722096763912145,-19.295739096587745,-20.52006878345255,-11.973750591395714,-21.752038680759032,-9.269071622947555,-15.836558171092173,-3.3571651349918428,-7.025758491988457,0.38308139715388556,-1.9026318648103029,-1.0584815954122835,-4.374654402035991,-12.479049888062224,-2.669615093522637,-24.79522717067305,-3.091334351878819,-29.971945908147184,-1.9472089027945323,-8.631095983837328,-35.367920620943366,-4.461721238621033,-1.6929484154728538,-5.532008054867493,-16.63285991843362,-2.43511551108136,-2.522376139102704,-14.831075135034961,-8.537179974057775,-17.01708944771157,0.3579121800128391,0.20159265726376674,-9.94223187878412,1.4485994333205632,-6.125535081562486,-1.249766762455522,-5.964059548097198,-629.269005009551,-8.914817939866033,-43.937849825624085,-4.686196674997481,-1360.5637420482842,-5.454314045872922,-0.6346743177044019,-11.827430660273208,-2.7403206342717397,-14.286409744533708,0.41817832419564205,-8.073826121608246,-25.049942924410676,-6.975501584499193,-1.285973623441362,-6.448804408687632,0.16544978713946001,-2.815134837577583,-1.4186518800524421,-8.019183616510633,-6.813177759201306,-14.286746340267891,-0.6303618117583483,-1.7096729101549517,-0.6439686091044834,-0.5264917735442864,-0.6947985137397765,-14.41452349441874,-1.9931305519837572,-22.454748689754886,-73.09140630864269,-2.2467582721078827,-20.27931294698259,-20.92365125687607,-22.152273879753416,0.4365502253585838,-7.731966979128545,0.9180913214721294,-8.714956566639291,-8.533969006040806,-11.322701424286436],"alpha":[13.946661609585016,22.049917165447354,25.439346819813164,10.091617642804946,15.166177356344189,10.607334739332558,25.01560483351851,27.302153377169837,15.06211742202483,29.863621881165958,23.220353313354853,25.73485768868432,27.705186908650784,14.069222508829284,20.646109497732716,17.639606754535873,11.366498282335197,18.163320595381244,19.571307825633347,27.29364835935792,24.982392223283586,17.837162952275904,29.877214924699352,27.69809796978809,22.55805275666129,17.33252471281154,18.70385804247395,24.849887319391684,23.450739590153038,24.921938720030447,29.001789206256422,23.392118581468864,28.808927129427772,10.856811141195513,12.82695083352483,17.281047497784293,22.10585090161167,10.79524776475482,26.5751505927133,13.402033108167108,22.285826877879003,11.1928301017652,10.230104772333156,14.34802262528792,21.93884699281625,18.214693580257123,27.690843077619043,26.226481252021326,24.083199452055695,29.38349918201458,19.45781637497031,19.642718929561326,13.790795668010464,22.706289333148938,22.133842883378477,29.306623985636836,10.018153483846316,15.126455895343689,15.222146981658993,11.221266486630682,20.478137112357476,20.033764551623694,18.721092820456494,25.11520421039425,26.535823861319198,16.523682812048083,23.62093548880917,17.79418259700528,13.510244135878843,19.149363449042724,26.855007951080655,12.052870215296188,21.371751999648637,18.699213148150996,15.80068526006729,24.224088082064924,28.007020323319725,18.793107894735208,15.313793457802172,22.684163433268715,21.59832484049886,13.788062953477539,19.623494143519746,28.2235020984391,13.26318255377621,13.753091006079137,21.394077131079506,29.686258319437783,22.869032169157162,20.060191035088653,18.184384043835358,12.740743197506998,25.368871059002633,19.82132236617189,21.120509321159826,28.261590999451837,25.629082234950125,28.377995576046278,13.074903539380074,11.480334622763593,23.77162003274001,23.04997798606732,13.830910974178888,17.689380095475467,13.301525516177314,23.46975565757564,17.51266970770803,12.764467560658769,16.22964980447797,23.007037060081007,22.212487661611643,15.29203454460947,14.205309080070286,20.825963773274935,11.473634701431198,21.97294618502907,14.395729236452599,10.964766802251171,11.314241482818947,23.545745982790784,22.499094350811397,18.333953680110522,21.693451348664986,19.79439106293222,27.917048631001297,11.697087283687742,28.5565735039123,10.8350815162063,13.578177691948623,12.669581530083235,27.441838123068916,25.43190404143141,27.915186961718597,21.36285353714021,19.354453811412085,26.34673831138073,28.388564500495484,15.892351743053105,23.038205642731413,26.33285673228032,12.645915568439662,26.77010190598212,14.681157063559205,20.99594124948279,22.844709503131742,25.474523277003847,15.29042027964194,16.084226536607073,11.878785402606296,18.264679738256614,29.5420806406483,19.77228288028746,25.70652225628865,12.648143417763595,15.261260937380143,20.917985328562942,17.54135933156704,17.352617050654615,28.96496416493403,23.570616307325682,19.480700026603863,23.4183954162655,17.275424193733183,17.310554398739704,10.419298422466996,29.90282532196675,11.83394673965621,28.991944263573004,29.497681962944373,26.94862633459585,20.21248900295411,28.822825975889987,10.833653668269093,19.290470626773395,15.140313825595925,18.400561499853122,26.659623796915124,27.79366394582385,22.872980874296907,28.887933276764095,15.743002372265469,17.833037863331352,21.667550829008242,23.07828681339505,16.4784405245541,20.2907672719957,16.062016971318602,12.638242760342674,29.263556015808142,13.629296016016465,25.202776315436743,26.76371978916457,11.053922387714103,21.327713329060025,11.844875455945285,15.370500943024679,20.180901028254148,22.90475506667849,22.433762743855464,27.3004426802099,15.290194119448838,20.158388829012587,15.883263827272538,10.230034271862106,25.889541082579626,19.906680246298766,21.015843294762362,19.670533330798868,10.026451015241676,26.80499462516056,15.510548195254152,26.730089136510106,23.82727240456071,23.65039511106059,10.529965430098756,11.856213962116367,17.189640523682236,23.462341103453728,15.04438350769227,17.933999686717325,20.733053319401854,10.039153830855593,23.03986848075761,24.403022432353374,27.928910980340067,16.15616558098056,12.941634937951282,22.776167211202548,29.871004164031987,28.304863888678078,15.965744408116652,14.074345910532223,18.446475928195888,24.81993045390994,15.750428350533054,29.11234576563421,27.137030839262803,13.219288581844385,20.75637726289382,17.836886871345037,21.858901245726354,28.67461754144424,21.456160597770943,26.23581271221644,23.771926190158943,19.211653012514954,22.949876031045346,25.259987837783846,29.492711936672574,10.49067908104016,16.098597934236643,18.359696005328438,13.270748498654882,26.967991656787063,20.467370310614452,18.71383010543321,18.0137139639714,13.480459846474858,19.826737219417147,26.243066273386084,22.857889434405003,15.676060009343233,10.435256499090215,28.78879868643788,21.425222150833307,23.98778834790147,27.519444277649797,16.657138171702435,18.40929617242081,26.9105665934405,25.127471075424893,14.860013241469542,10.327199708930825,28.600128687983716,17.82419125918565,18.833636322805173,12.872986374758511,18.034423830605526,22.13120766330615,15.89829150442756,11.64613737947131,12.968625492395741,10.483651152051712,23.58622475404023,13.795773856804496,28.130510959553362,11.131460622126358,15.425279428056648,19.440256732676122,29.958237569808162,25.91627226766278,22.250261284312614,11.658765058474302,25.427240877480855,18.977505103075817,17.25998735608805,16.455602521472695,15.736568387171644,15.934224471216343,25.11673495426152,29.772162437487893,16.637892415492583,28.209742447948795,18.583171675091336,18.61330378414406,17.71887636608417,23.384455131616896,22.02037170031442,17.94952152931156,16.01161947913074,13.682561516985006,22.872479171396833,23.19807516814106,13.761675946257036,27.185531607441714,21.23744784084478,29.1776937421606,10.450662607513248,28.2422142950617,21.15719362731471,18.22289583388808,26.756495475408162,22.475841270744695,20.585414025717192,24.881327875995588,14.0135482393625,16.1132951384813,12.415482144956353,16.444702884512612,26.374951906872948,15.202422509754761,10.860999693759563,14.504161138253417,17.649480184926137,19.87217672286867,29.37863827952963,24.81565139665335,16.1287971865165,24.097794554483862,10.528275400800995,25.976744365324173,12.24878247699424,29.936304985352436,19.329261134159864,28.493463602959128,17.026176796621368,29.092460651028706,29.357671581333342,12.170683219242644,25.695023357434238,13.08363985002348,18.902843221571032,10.360305125846008,21.261482597971014,27.717069027128964,19.949894715275814,25.933155652985675,13.131979930287807,28.94563531390478,27.48232753891648,11.282764138666646,11.179707927481694,26.10362331194796,26.677202181632403,11.629976279425431,25.213567007942615,25.07744174758727,19.069191190207,21.966693166473004,12.850842485878587,20.72000212885335,26.141118248933836,26.13504849215678,16.284790563455775,12.981575960856734,18.231092917403622,25.025947787686874,25.418381122582893,28.817028906050854,23.897720324739772,17.649507097312018,17.206481712222057,26.961060848058235,21.86865793723859,29.76786891633496,15.428787317896857,26.11927203157056,13.32975797056446,25.037244537008792,13.01966610843344,26.68593836797062,26.541730536650675,12.725200764199114,20.660202220582455,24.803664440227976,14.394539312221326,26.076702931056545,20.308177601108408,23.079927019109526,15.027523075450526,18.31754192307372,23.08282386202821,27.96183053922935,14.192200485321372,24.6924090682907,11.46553871147525,23.65954499480891,15.336706863581501,27.090133277953683,14.787903433867143,25.114620697562803,28.59591990271529,29.397119371541578,25.145691024325725,20.91346797328083,17.416837508461455,13.150405656404015,15.756398790977446,11.328377188438008,12.016525111184514,14.375756058867735,26.38524056049508,18.975871194809493,26.11114073274266,14.037563858202024,28.792887767446018,28.130529201056227,10.649760335902801,25.20034897057233,27.18245998178846,22.73707362708648,22.60468799307901,13.259418144499469,24.29949754427788,18.57936033166198,28.13339163368857,29.503222926384765,21.747686398935254,18.408753180153127,28.5636469604255,10.615057765770928,18.16221938979996,25.284444859040942,23.795953719711974,11.291974991704542,16.621119617920648,24.678443090001174,22.652625352277724,28.63513251176834,21.04856595054301,24.3373200753883,15.36361570502033,26.845541020652178,16.369468136540487,19.047239577669266,24.245640627122352,28.36192008736955,24.171525095483993,12.237378217496166,23.237219299463302,10.149808771063649,25.380215765161154,13.320761089586224,12.400815800516508,12.923818294442441,16.712838881875562,12.452230673798947,26.01144225834315,26.242999336528733,22.877870067083805,28.667681640686272,14.975102942817422,22.30336576345522,15.532150640506067,15.20660083479974,28.048121713598437,25.71814403806053,23.784562945133114,22.85166446793629,25.85054921199013,20.773190873778017,11.707612270234105,11.711322866767468,22.489545404940102,16.145267970702577,24.69250139564147,24.922782508209632,22.539523505072708,17.07712896117161,19.718453452564326,17.086331787166493,22.230412602438218,24.267192597971643,10.77759109275473,24.771379788891768,27.9166186955258,27.644089664835306,24.576108021767507,14.293703435589862,14.954725252670315,11.771040189617885,13.948847979257252,22.583612354123147,13.7687596948135,26.13551797714221,26.413224938196013,10.396434500957179,10.217669249771202,22.27980990849922,11.493911214565973,27.057672845200482,10.09561117728834,12.917856866045646,17.67596210804813,19.951829607545704,24.71322306188561,28.897031142839285,17.18206242653201,29.890056788441164,22.343373340652583,14.563840688300678,23.40180778876605,15.371228533280474,15.819642436891064,22.890976664847944,28.504119717356463,12.138428634257497,22.547020655788693,18.544939461503503,26.646384089118428,29.066752285599378,14.96637436889284,10.366999240543153,17.590322582484287,10.07787177555445,13.729454205725599,18.939092985976202,16.31156270362521,17.13870438741294,16.507526099023053,16.231219282942302,19.85646643991107,22.89059416121516,13.94299080527225,16.779129935553122,16.32613565990603,16.70866658544069,25.61272863878859,14.535287625738228,13.3650007841071,28.408467934785236,15.423530067623346,28.30001361614901,12.925621987222428,24.89479760047976,18.34601732263544,17.324042986435696,23.483297696968442,26.997629908910994,19.91247658862396,27.856536054046806,25.040162810746864,16.069015867607593,10.454694889501903,24.333457837262916,28.439548047309152,17.823968769147633,20.672663495342043,23.196726975544998,23.6741409841559,14.706789149610021,19.53857610116842,22.948428178483397,19.807783228941535,12.453252095321865,25.871501745392024,26.338632356679845,10.041224891898812,19.132067789145168,10.251764982580077,27.447034756704912,22.65370953432639,20.908087583582788,16.765523574012274,20.142531861124482,28.51608161338168,21.868042096689408,27.939048992965887,22.40450672164957,24.885715950012862,12.39043031293226,27.673506187610265,10.047124301976105,10.91895669203113,14.211286167050865,16.96745505520305,27.449604136629585,17.43034600780493,13.547980512813357,28.92226534730762,27.591930339335132,15.923147966475572,20.525114439307437,11.449973145537342,27.979639374073194,10.289104958249645,17.5776102842539,22.814320568258193,12.801352416892318,12.233405585713534,11.85017229298544,28.23638236832121,27.324530065885288,18.2149443022054,14.260472597056681,27.891023531213442,27.76088911072875,10.803190232967669,10.204199183695994,25.450643852823575,23.811979342415476,29.670403160165893,28.776030521689087,16.952828250543426,24.20234910766613,21.38501155257403,22.64406433269082,28.838200672111142,13.665546301712364,20.678655635840624,12.129836997759188,14.840428308500663,15.658355928630412,18.094211806692915,18.258901178806475,24.066328021339412,18.038540449520227,25.676382144236793,10.250453998200175,29.956996574069482,24.072921800766352,12.424705955183523,15.315737615433328,27.203794966889504,25.252344473883674,11.319800553135234,24.866517265673586,12.211708845834725,15.107750880759463,18.459554013244265,27.907238103318434,11.255658346793167,22.752361849524924,19.782811470960482,26.609963035099934,18.415836274342738,13.278448199431768,29.10296099225382,17.22759955424057,20.65449428314075,26.109266765951133,12.862514833556485,27.851113400860463,15.497973731921327,15.707923937815536,15.869149899962665,21.257291351379862,13.857673084380622,20.717057117516934,14.30749016114837,17.356232537711623,11.554122702408218,23.037892448922914,14.610449801724235,29.961965866568736,26.562643852831364,26.712650849044294,12.05889720238293,14.23438918029698,27.32095088179738,21.952662197428236,13.612863843697225,27.48169525282959,10.770496557990299,11.053270291215739,13.032190260434561,17.12756899414579,15.45177357298028,17.253578675428574,24.101739974332492,29.833539543614776,29.4524536567739,22.589860257325554,20.91781678274816,11.80779812980322,21.769936207321656,10.908272492824182,12.310835296308662,19.787363941223806,11.100108465125093,26.961856983102564,10.490670290503239,12.207958058356688,27.702504550635165,10.494977551860414,15.606594237180289,28.256124048699593,22.94667829127429,16.1041434569707,21.99170533893279,21.06717475795658,25.744022147479974,10.462141242225798,27.92475839765875,12.583421537920469,16.12733738419189,17.061084427451103,28.343635464695893,10.392410282758146,16.05145660709258,25.66495815322003,12.829374144621406,11.508255316511224,14.6094256050737,11.349796800565839,23.351500224572067,25.153211587686528,28.236904425114815,22.76564351717092,27.58336220360405,10.476299412457909,18.918676602357753,13.233763446640832,25.62313436462283,15.104243810703819,18.012411183645447,27.32892863170887,23.74695233826259,10.469743034019707,29.828559399033217,24.91414217967142,15.71220223746328,10.958888993706605,10.648398322899064,23.020287082308815,20.67462335352191,15.539276765126932,18.334089901527406,22.493095933143806,24.567946311495664,18.488336640620297,16.257670207317968,23.187964376916188,27.819940449023413,12.26605592421052,26.885947824811854,12.805810515430277,12.776006724652017,13.415307710174297,12.26328974874001,24.703898382724798,20.508526978604188,28.916609239229466,12.022827770138091,16.369804056576097,28.43534758726396,16.807812438598763,14.727806471372507,12.44081944673991,18.304746263518,11.701123701311227,26.304528156666947,29.114370374510322,18.456675033743064,27.33067714677119,10.47184569694875,11.974635901059404,17.59503356282763,17.255263950907555,20.95943521177288,24.796135840600964,25.230499968334005,21.418895793900408,26.93205356361525,10.958185105464192,24.870250027165113,23.29822474784531,10.881478044977673,20.861676125012746,27.985457129920505,13.565544546275397,13.075973251933345,22.146323766274456,18.424828746226126,18.949528452280454,15.235849823874737,28.78980798101701,21.167060368356033,16.461141319310748,17.522262068954046,12.00635546048983,19.46260262911272,17.273535186775145,16.014159980342303,22.607022761431452,13.851541489268296,13.387014122140055,29.507534333041896,21.279465403190837,14.04947279493291,21.278413612190835,18.854821890936158,16.799145040535425,14.619410913658445,29.164525192047908,14.781975710214939,17.163120151354722,20.33850061619432,15.017298643493998,10.46974866416059,17.285359852768636,16.900237810208033,21.73018208399357,14.794976030324438,29.67204961957169,16.637765394608,10.456067921985861,13.812475039091048,23.919791415135077,12.371363713766783,13.200647862796252,13.358034287141765,27.650182119232348,21.591018110121126,11.976372089852806,18.406162832153544,29.236520959444086,13.252636608291928,23.94365082112056,29.887399335724126,22.969605909923022,12.223569028669573,28.40644254774307,25.549580854878972,22.79747663194734,27.828113517080073,22.347546072888633,14.900414413675502,21.95142834549799,11.26648158329182,17.322790200989353,25.479880134052483,21.997805043217554,17.361466666708015,29.16358669979378,18.800286815428766,10.774547055133702,13.422923560214887,15.346337541586323,20.733438593933855,12.180074125354317,23.020606049812166,18.398947931994492,18.50975470655452,14.126221496326604,28.2567881065722,24.96600601460246,24.276599427270796,22.7498064152455,12.508963996401272,15.713546771923319,28.808635489433108,19.574456526954837,14.624370313559346,18.898220150583406,20.810491338259997,28.012853531378312,24.790744928983997,15.845439812355586,28.506775193898907,22.47310507911955,20.129611899266493,20.81287885603059,20.220362607659084,14.47832353155723,26.49379769087536,16.499490287368147,27.704550154966316,24.469944039973463,29.144639875849467,12.660981217685796,26.80947358566812,16.812594967253297,28.46421363200051,29.81920893339856,12.905720534304614,26.663731547875784,27.88911985235345,18.46308378255212,11.591650942830487,21.764673515861507,21.33997375647588,10.242542378896262,13.05621888992075,19.134557182194783,15.138994707548278,25.33387309269198,24.267095533751295,25.380127460632632,11.039894194021066,26.00511291096104,18.006751813340593,19.582722407153806,11.884621980017904,16.450797861946725,11.62821393047719,23.328151201049252,20.899400275081895,26.346402981249174,15.194841079992587,23.027021647780607,17.206953492273836,19.932705235639574,27.981569848232823,20.025845072334594,23.717722479324227,24.387142619793863,13.156432765660956,20.174120409946337,16.450258098255773,15.378800165743268,17.097924097350937,18.1279794922969,15.981284368774018,14.945529392358821,23.347215628358093,26.454570634324135,29.505674359364438,18.318630173560337,29.96972765736615,28.468976501381515,26.286166052676165,27.127027864352797,19.69266560237253,13.673457120106129,20.633018220385324,29.47633724755244,14.345725693325404,11.912941308627442,24.356218379778415,24.047957486231134,23.641139464559018,20.93204945734108,14.004400876132816,15.079810926833517,28.746084973061787,17.192917518684567,24.48446933451748,12.913882520559845,10.992315328742507,18.23133184399872,18.56623418000346,14.081365998992288,16.737011783714372,19.898792141979808,19.294052607006083,20.336269794230688,29.645237728729192,27.1618252707789,15.033449254285953,21.3205091714898,22.6854438737116,25.381826128758934,11.335660645318871,27.70801769592896,11.873795863380083,20.18087850479563,21.138795487384584,26.212148390795107,29.84174859087746,28.980412883784577,29.37603422693122,24.427257314182004,16.20225455173597,25.589082002054706,23.04070104083276,17.509828819592418,13.560417402996933,26.334759098814704,21.660998786150255,20.241032053620707,23.901578460035257,24.780758796576055,29.230578513996853,24.572840824801503,24.677329518907683,22.26170186189168,14.245328194472059,19.246234605681533,19.861479040005932],"x":[2.1874492750267907,2.462716361010737,1.41227081232134,3.5099712092575053,1.9629886739878366,2.842164263454725,0.3125473656510813,2.4801226492002915,2.049100776765189,4.407819982224246,1.6927800774742596,0.7597662467460176,3.1643255892266406,3.368265003964175,1.3446274383776802,4.718374935803381,2.038126344560408,1.2833291619385467,4.781688421082345,1.0127044229527693,3.8577751744684985,2.192911552876927,3.1534971774043408,0.16556195850404687,1.134353564312507,0.9411615774839677,3.5283121705804033,4.7070391320016105,2.646502516493304,3.634886783758472,3.269250033599862,0.551345792002369,0.1337675615826206,4.763643016835028,4.723635545372506,1.2032646854639573,2.6112209581877366,4.522994594491112,2.3371430084248246,0.9383016238062669,0.2615951945163897,0.014140868802712259,2.76921951070484,2.0577950103808473,4.765464096361157,3.02390448172414,1.7429923129655023,4.463652013069756,4.929715275289847,1.178451146086903,2.1050179790112242,1.8205234945337478,3.2917748267995286,3.4069465306847246,0.4146929046704939,2.9455696451199307,4.453831639982946,1.8876425546502285,2.8534379215922145,1.879239903065516,1.6067634527616703,2.2093068140620553,1.0941222154519903,2.613164852405858,2.0553990360722163,4.2736735055705255,1.2079567380583534,0.8165483252745365,4.532586487057157,0.07345140367393199,0.34353326471579737,2.262291508695294,1.4901501055650113,1.2063517403722224,1.44342160663398,1.3717376522240665,1.2386897108321704,1.653296945353413,3.372037027216659,2.952034128622656,2.766107951080735,0.3055195552968992,3.3816034149241716,4.456027226926333,1.93110997510479,1.8757413596216443,4.014181585740184,0.9185442714877756,4.055010072843165,3.5482954094352968,4.362538651480692,3.6354007532883035,0.23674081985375572,0.8280238682006558,0.5151375169011652,3.733294934278304,3.399124005272852,1.1828095048688425,3.276025184176042,1.6392295411571312,0.3966031267236081,2.4237101232183313,3.197513405661917,2.8687868752722077,3.585499574776411,3.3155458125957105,0.7384959997775753,0.6288010737839977,1.4666113471761233,0.8050818650357616,0.6034219557857912,1.889048843536042,4.826322604804742,3.543015601986176,1.9033918691631013,1.7900606379451656,1.9521712202697128,3.2841816252680243,1.5406094227177103,0.2113769298629209,4.594012949223265,2.7976062779763433,1.0982637971995457,2.630811417204325,2.9418002840412183,1.2587459498894749,1.67085924569919,4.372563319028808,3.7398925172552078,2.269771647852653,4.787899755608463,2.732302968479808,2.4008037834985863,4.748280517239079,2.5437363279586114,2.1450082405577184,4.125914411309872,4.7816787438869355,2.707476149037503,2.1061655493279985,1.54634682083428,0.6377818240132138,1.7008642541344698,4.535860894797472,0.8914073569868664,4.989871940617601,4.317799436108997,3.523071030717506,2.3705395342334667,4.8404082619927316,3.0452906361400633,0.2507179892964173,3.1028510128489373,3.806635967620704,2.484838535290359,2.9353532639435267,2.0623142941682215,1.6097784687512695,3.0528862074072762,1.8972537930049727,1.4818468819202146,4.072001511308394,4.383559405819647,2.751820807486498,2.2852188081787017,3.6295577329959947,4.322575522063746,2.006333092425203,4.53948641750713,2.0140805359435743,4.392793719660645,2.855573276493306,3.1106735936228724,1.5135017647587967,4.173985303068437,4.749887278654801,0.34467068738100126,2.763991806376107,4.584279860735789,0.43176005572269194,4.759985697204508,2.385485219023229,4.014227021685416,1.5182717232339704,2.762881505169583,4.925544139327896,3.019593970726361,3.3203575401217633,2.1645883464899898,0.7022469319719138,3.9903923541247233,3.144208612008889,2.4389569879045747,0.34511858438442955,0.02468646674525954,0.19982436435648676,4.511835217113961,1.4270585726307528,4.6622113675513335,0.4610024838166893,1.3314168113230707,2.237381537506258,4.5975567718295025,2.356976031518893,2.3861556734111433,2.669539725207508,1.8472778141673318,4.939131853219832,0.9934927073882505,3.103941053732646,0.5233515850834214,4.794511085898781,2.205046502408762,3.4344769947910514,1.487496992518239,0.9739262629919754,4.497057998523852,0.4984604009808624,4.84397216170316,1.0597806326432058,0.18538458142927094,1.9873923443621189,2.771343467999717,1.9868870245476566,4.151180085102887,3.258614435522842,4.020290458220711,1.882002250749516,1.80282865634121,3.261404482719561,1.3152759771921918,4.636393719181807,2.920738048580528,2.6245246374424003,0.9039594537100926,0.07088605145229798,1.6775607260699132,4.051949510680021,2.484149895110842,2.394081672126598,3.4857397124805347,0.306388720102837,3.70931101162421,3.942548745410195,1.694254207427759,3.3972371651357633,2.271194345981644,3.703924056459953,4.282372500634518,1.150896044954045,2.4211762308716755,4.933249451452566,0.018818010906594962,3.8483958801903317,0.08701011489786858,1.442711403150675,1.1214265200733098,4.995379984642746,0.23116865096168282,3.824112786418181,0.16338392852527694,0.06994487616053591,2.816277183559772,0.014956281442448649,0.5083980201577554,3.265972323743237,4.676243184926817,0.7175432601850396,0.8295198635410261,2.048334789911732,3.580506308204865,3.9520529524391868,3.040533034955124,4.461069480826588,4.599687162138241,2.078140730552873,0.23337479740100364,2.999360513080662,2.5229473283407233,2.715177703740416,3.8196730865698845,2.132195665063983,1.5450318539303232,1.7394612488045103,3.359855574046675,3.790355924660221,2.307456299587176,0.24081104831182976,0.8303302005251134,0.08041320617455328,0.6782856057611475,0.7279613289630826,4.452284113516118,1.9860179704382297,1.026803688838932,1.9002844920389017,1.5060182478350537,0.8254511849438106,3.536161649947042,2.721369075437278,3.5705007477340134,0.007734286289209358,0.6286116874929815,1.6521719745472196,4.309121197107855,4.1389908259171735,1.5174875379594632,2.089325282193417,3.85353578023048,0.817718095133072,4.674543949586825,1.2996854047090345,1.2790142103271807,0.6312173429931256,4.243799680917036,2.561335281263013,1.6842816427724039,1.9294069962984373,3.455765718950449,1.1427974719442369,1.0423290676911534,1.7372370988681396,1.0286220437206695,3.104093061206137,2.185201056832937,3.615959000299763,2.7766874805620265,4.84935234396977,0.7822540557213853,3.948563540043193,1.761532123286097,1.3889504417222054,2.5769183537314677,0.9453468838328949,0.7631554189737288,4.163989160823842,2.3184282990699057,0.37526218906086317,4.0999966594279496,2.148781027836608,1.4836768463708594,1.26960314799075,0.8358772868401276,1.9009705716965353,1.4734819414624367,1.7362617064190988,4.996005671494893,1.7442051028722372,3.05709884673273,2.586819867031187,3.8411789284850064,4.432875029047053,3.0436351021736052,2.884576364271183,2.0211171790759828,1.9961856596771899,3.504609492537808,2.561027135330045,3.063024624266789,3.1103004604138995,1.2748250218242274,1.2221824856281016,0.14326319289932443,1.1381882361048379,2.392455687766659,0.702956298068862,4.26563905609674,4.271377422330699,3.5645272065740388,1.3481653788801418,1.7749226101564952,1.3899541307970764,3.5616276084863085,2.391490865538387,4.894237984928691,1.9506103897674765,4.965443690359753,0.7829516667814851,2.2088480469888214,0.41085515998192323,0.7131898937486636,3.2395392277170796,3.774806334902805,0.7887540804595095,4.525412238185514,1.413137202179936,2.6455149349752727,1.2364360692539278,2.3484434523964994,3.3246074128402503,3.766142905837382,2.7349658168110444,3.6021367625653857,2.363672537259199,3.8613348040124884,1.8981708088254412,1.322644514561142,3.8936381900455697,0.5709461788681292,4.735442880576459,2.235068947210471,4.208141470519994,0.23855008719671944,2.2655092503702856,0.8953317744867872,4.410558456006012,2.529752462147429,4.02297165319598,0.7684207861712655,4.173093969297654,3.290491898485911,3.728239755513205,4.281631222016193,2.0186555525620986,0.634115843401265,0.12197462061678821,0.27693502753275756,2.4535288769264074,4.574981870715543,4.229193966388439,3.9272786023956696,3.053047816185214,0.7151395056688292,1.657918873750911,3.653514366347684,4.144816010718903,0.3561761249638362,0.5355998984625943,0.5235949456709288,1.8334161005242455,2.7271849615101216,0.6769542057919786,2.9046149014261466,1.353921980728171,3.58862752943216,1.23259000444771,4.685962073718733,3.449478153576436,4.075106589516202,1.5705112410095567,4.779197681598938,1.4051642971416534,4.370822232729841,2.099187623132528,2.4589438273765376,0.59941212002246,1.128571893391126,4.026238643896813,2.7058087702440736,0.5829399110188294,3.2943696312458415,4.853657589718646,0.22507745464756423,4.024719825731387,4.146131488857357,3.1125228315478823,2.9951021370935758,1.617134409569868,1.3626013425516648,1.6429878980766288,3.906041555191159,0.13147044021511678,3.7371295196825582,3.277294126891217,3.819043990604162,0.07989638505171759,2.5585250880229173,2.684933740706328,1.8789400603262152,3.772655304629755,3.638786969513146,1.3009184644374183,3.142298135696542,4.954933786152394,3.2649631702881043,0.25819351433528426,0.7362554836738044,2.6820018504113854,4.616794226610946,4.033920053981848,4.735359909852094,3.398247239058284,4.1166467706098375,0.37961145886098446,1.2695260294708877,4.364471840837016,3.5907475202867243,2.628699225596037,4.104774655364036,4.806905816852769,0.691237344087754,0.6007301155996536,0.253377532107284,1.2848192746167697,2.552101790903125,3.0714407240307304,4.730737912205213,1.7237599807595927,0.17232722469984307,0.6350019918480343,1.1822291146995123,0.5758510128619543,1.81317081949823,2.6943320595566655,2.647347008028167,2.2208779906415863,0.7130225121616451,3.2826127659667304,0.11633842543591011,0.7472704027675192,2.1415492056927086,2.0332156371911845,0.6981371635387401,2.7915847600167973,2.7623345301077484,2.839472250878443,3.579716661424377,0.9594605654714605,1.7592383877543494,4.544299145662723,3.5309845588639432,2.421778479765319,4.249698627643372,0.09768372341165565,1.9819133717974147,4.5868370240172975,4.382721141075143,3.98645327710054,4.276206089358662,1.7077392512471878,2.3384372160869793,3.4289987965531807,1.108199589305655,1.5561992956970472,4.487511046623124,2.386487319408226,2.983873516938569,4.773367250463085,4.142367867340121,2.800294951041825,3.192254755710743,4.5433898036262,3.3922819258908343,2.0300306256201885,4.44961107957503,1.6745918962902417,3.199396150378621,4.445632018717683,2.6126662799292397,0.4528902502633203,1.8779782109122956,4.126246857074202,3.7659508253175042,3.3778382385047245,4.322642058965954,2.3490993779611835,1.9649773024899608,4.916809973743998,3.080898351723458,1.0106170672972425,1.9806308493155955,2.800102602438874,2.189746234001222,1.061514967168773,1.3562705370531025,0.5775960762771204,4.427494199375639,4.285301895481439,3.240142535169123,0.705708718108452,0.21328475943506287,2.547775074961285,4.094599830096359,0.9020446052417486,2.1863198406947815,1.9395021783679267,3.8612326296363806,2.1674933296858647,4.105426363928596,0.2003367958250768,2.734795808661815,2.9599697177772266,4.7692994040524574,2.5171351406338696,3.530991574565001,0.34447155382089645,3.7964905364333768,2.2032620290132776,3.2389583746297013,4.20177640511012,3.5735475129441485,3.3721400166500235,3.7581000733580963,0.9260868478524853,4.607742503378349,3.975118537779742,1.9396898372589277,3.5610826465186243,0.8478002877803703,2.2422011763163754,3.7602652085332955,1.9208066404412816,3.1532845247226424,3.031438268486953,1.7011217842105908,3.6028021713433933,4.472569507212233,0.5879640402303765,4.586186696000102,4.267547468186566,3.0143790515475386,2.234350455972056,0.9703104743589852,2.3333239168567035,3.1771603305121987,4.82649129573479,3.43133397292668,3.206852808941274,4.2851771135124075,3.5651834254417603,4.4822839751061565,1.3692251850982462,4.7721520044521935,3.502451227832526,3.037265041223863,4.972371723639469,1.7059496686520692,4.319290357189539,0.715102138146988,0.39746906920171465,2.0545626699053035,3.826729009570559,1.1456615905227185,4.77536743477247,2.1222507957381787,0.6674933764537283,2.970955898403017,1.0358406738439652,0.5483135194669941,2.0521110474078075,1.7372119462538016,2.3238238034252623,4.676930213255971,0.5837375837363601,0.7080830842399111,4.406366539823463,4.351420060017955,0.9496119313146723,3.913006080894853,3.44362076054896,4.469278276441945,4.962517580079343,0.7650742710816105,3.15847547666144,1.442589290025138,3.6703994619652125,4.432289320212295,2.0787052065090372,2.017922329748191,1.3461504752607212,0.09940344432197934,1.6349096260256957,4.666863603786857,0.9448060802902158,4.216370868423787,2.181651064106461,1.5069533380926459,4.933226385683525,3.2791618026507074,4.842087276192406,2.096574802471171,1.2732950284143418,1.148063243470021,0.7085303191126857,3.5877932745146204,1.8942889106181737,4.863103486928837,0.9102822076933392,2.2958536826353173,2.34743162097553,4.372456564943654,2.8483800178955345,1.6841648129282416,3.1035025849286493,4.750321357867241,3.8964810501791103,0.9420704761399423,1.8344923891739462,2.651164455128555,1.407942916654894,1.797645184863016,4.173486854221796,3.2956272932364152,1.4418461911769864,2.856027370954096,2.8666937809948942,1.5771646634287972,1.668871054397456,0.4957460800216884,4.7094516414307535,0.7911601792443312,1.693098574994849,3.2004001477469277,4.225815574041915,2.161410684358861,1.6460111938825273,2.483670491706741,4.47930634560488,2.9389407565428947,4.585302603392796,4.979944520240923,4.386544386448775,3.398257818086795,3.5521389867510678,4.404672363048489,1.6110691392743604,2.0104640322448395,3.894380083051275,1.9431398552022372,3.8613172537232243,1.2129997779823043,0.3853488451696818,2.8750568077242433,2.0500137035725343,3.2067058132475292,3.060950724301165,3.9500885113641315,0.5827274488514256,2.988517819540216,0.23710568169270752,4.063387057281622,4.885499779253526,0.9855609014473432,0.20943096387067595,4.688986292876453,0.4356272592213417,4.789214009144578,2.632263910130016,0.3012124638569347,1.1959881303237019,3.679986292922015,4.373631734448108,0.6871568093005298,2.8472731769968296,4.681168693846324,3.7912886652755864,3.568280118553698,0.4535427970314265,4.093341394412768,4.46452445657335,0.0009282574631075402,2.1132536891531872,1.213230837028637,2.8998066955157267,4.92862088436386,3.3022096933979093,1.469272334014492,2.407129386362412,1.93780339743589,1.913060314722197,2.225395508594908,0.1427585799545017,0.3045989549569139,2.26540769290571,0.24864059943442318,1.4035672436272872,0.2709151404190624,1.0635263509136117,2.1093774014830693,0.29786553111935343,3.737180967407261,4.526706225663379,0.6350608964889082,2.7474073304003754,0.7980513668541456,4.359126323845008,4.606947827397566,2.2734662133011585,1.026649036598416,4.569504989281187,0.017346179185282473,3.1522582070664127,1.2768965094040496,3.284667107229641,1.722709081669288,2.464105715686671,0.246861229993115,0.48356983096696116,4.933580336292903,3.1835914126350673,1.604931923619165,2.74092723338753,1.9879772856613076,3.4673721972577387,3.0159516490593297,2.9501490917513804,3.0470497854898513,3.842037755577019,1.4792639253512418,0.5065131191947381,3.0769951624254155,0.8477652148591153,3.51686570611929,0.3197724795817902,1.6860850877863942,2.764481230739777,0.5850137195065885,0.4978064163467333,3.3955983830139393,0.8100689935371197,3.159748185207029,3.111362242802156,4.094575843393553,3.670583292540923,1.377986780730599,2.3133227688706794,1.3180655212604053,1.336625956175549,4.3837660132879055,1.3703796259120915,4.494035374798755,0.08820346879090502,2.559777386189719,2.2974906565221307,4.055568965615342,0.1730323689496216,4.535100684424026,0.5078290310661671,1.5593343084160294,0.9491545221977293,0.10318614525941738,4.7754465023647965,3.4666638904484426,0.11161208619598684,4.7451201747765905,3.066296202791542,1.1944482071344076,4.708011902795316,3.77987927155087,3.3350380129790924,4.581767273934418,1.8008317249108663,2.8006055351710857,0.15195447141938767,2.9659664649145023,4.3439131398799375,0.512854615542464,2.3685407687421236,1.722176524943979,4.846328876473657,1.6349962226004888,2.07318472789894,1.8587419883133816,1.8658557200043335,2.6985698933516455,4.96674239446254,3.542193401000513,1.079719497941033,3.8100220131414773,4.224334471587525,1.121234227322715,1.7272685998181447,4.461980447236592,2.882006228957139,2.148592369314264,3.7025802177760525,1.1147964063850235,4.4685163506983985,4.389920520288106,0.0640817555925488,3.120169116954333,4.717558087550059,4.152543427410783,3.7161715019372865,2.742131556863836,4.781547911101013,3.425218421728633,3.673895607244085,2.1752203780408608,4.557079040780112,4.052949148407167,1.651496285935904,2.9116351028564367,4.912627444193426,3.2972154398767115,4.292712519542259,4.530292100466341,2.3250558583892134,3.246667064281672,0.4224258868147779,0.2465135025051035,0.24865190689977945,0.7255373424792122,1.3396358471281034,2.192259279669674,2.9419802514722972,0.08882052331425472,3.865338285209843,4.089127363330008,3.665082469307662,4.861041374006263,1.3981815619792592,1.6561022504023526,3.0936699062462703,2.990938985744367,1.986313800435524,0.27099505142109015,1.4284877478608782,2.418917476190937,3.1866610009840635,3.7608916199152933,0.43103880693994845,1.0559896055195306,1.2010863307725483,1.7859146486908262,2.5780835979789885,3.0553014980874327,1.8389452126151806,1.1039201715442915,1.6619655588856919,0.6048308914714151,1.5149350120081273,3.980093826542884,3.1951234533087525,4.828539373207384,3.556519855288517,4.662544547927851,4.917255160027851,3.033108429840584,1.534186147313995,3.9346337814037478,1.0042035486071466,0.9149776502350859,2.462577154953461,3.1155384183021715,3.0478455728127027,1.074857295746633,2.5573675836501275,2.903549035189866,4.720977278317964,1.4527883362411809,1.9322698772214486,3.267585332730951,2.368536347493709,1.8585050884249399,3.120968593225386,3.599598734292939,0.864642557690396,3.9857768937672953,3.6015045727788064,1.4969689250080342,2.740057741651931,0.8939787518412801,1.212960235987094,0.40989066179134115,0.4643680569819919,2.2142436954403277,1.0772012492797578,4.235955823939127,0.03192836392376441,0.23400169403189786,0.24578564989543916,3.909819330504188,0.012054414285469495,3.054055538808412,1.7433626538179525,2.734714484293863,0.5980404951995211,1.9462901882200356,0.8484354309424369,1.5174495329422122,4.563054849586745,1.9941045023095927,1.5872655278522718,1.080738143121459,0.9910368423701388,1.9591236551433167,1.8824959444619116,2.0884057167388304,1.8140737296134601,2.2907171050559407,1.1642829195266036,0.9131706811865492,1.0626850168661928,0.8084541000962242,0.6475569771218137,3.1004629470085474,2.9386567366741065,2.5738373380497306,0.14379152250578953,1.7767401100778257,4.891166567673462,4.509986412823219,3.928652590428782,1.0597157661967016,1.6154000890216225,0.5350035861794467,4.635483263168773,3.3902511926864722,4.219246001073731],"beta":[25.562561931475734,10.759626842537863,14.02996768743944,11.526705854563932,24.034954144905342,17.471949462369622,10.03923009889862,26.05877928595177,20.751159494981167,22.821350342043676,21.99005959252898,23.193451742666543,11.710483948864718,20.482025501382193,16.111975304909727,21.317285139117466,18.595965195365153,13.029706887989994,25.950730273195397,15.042230306502438,19.329911092646476,11.98067789107852,20.45478021781864,29.626770420137216,21.791812955661204,21.638973736858148,15.675296864963064,20.062046195272288,11.258931137387043,18.279571386404648,11.559132708798758,12.438677530878426,25.214856301211658,19.93115298833761,12.713846491127455,20.769515714648584,18.83626421515917,14.391253755504483,19.61497229985906,25.3138760716853,11.27062373738816,13.116551007333035,10.422831000342105,16.159130747389195,11.434248155693245,13.633418346672066,20.482516327463713,22.326063747810206,15.623015217880356,13.811203653576968,17.426980402961675,29.949947224373055,26.369164271483907,25.20036646257035,26.621661595322927,29.917086732146693,24.988396186497877,15.78739660277515,20.978463113734524,29.818189459768718,21.00690551899325,11.835384748215873,23.0993078401084,21.020058641027,16.8945465837235,27.27758124860534,22.950509273706494,15.83142096918111,23.208568730451184,21.39245484833895,12.81169567367527,24.23744786659517,19.846070228156243,25.891384343064484,22.321041301734063,14.687548547055815,26.362812128703155,15.469022499584018,10.943310495657585,10.123001177404397,12.875348761013203,23.195318349181804,22.671830546050952,26.37603087835071,19.228395969422817,26.024420217305565,24.46306363013558,26.937888966656118,14.900167025543096,27.726745886165816,12.895609389304568,26.411272175673282,24.460690974326287,15.084950699337698,23.111324322721263,27.18377941993881,14.436016675420316,10.244348735633086,16.878446995786206,27.3980591257404,18.01367139062063,11.764227596411443,29.84609255983464,12.043533314944327,29.49344072773878,27.394644844108377,16.113843320140656,27.94365746484526,17.858020092078,14.11169728995651,19.78569846360461,17.56914786369849,16.465400987193924,27.09826721534824,23.462686631645834,25.53939080451147,17.760514409079498,28.01531853348075,16.204819386320167,26.876177339437902,13.848273787618265,13.032696447879264,15.735681642707142,23.214426207879526,24.42637013926435,24.814064720697424,28.201451376897275,26.48408965990001,12.157246788591852,20.303029282964534,27.47788518489385,23.10667341291202,22.389827179718914,28.45552896498704,11.419985663043764,25.39849276535851,25.511375382520434,23.31345670864114,11.098287419963405,16.618414205547868,24.19633459771311,28.840438315512728,26.956423465169472,15.215420723285318,27.647079991830495,29.14988169437926,29.52764029259546,20.677268590631375,19.73698763291262,12.608360700707335,26.748443757630184,26.19031148724385,22.499657546507205,14.076610621218158,14.386380518575507,16.10511138837093,18.73554726085149,23.527168482974005,22.48650945710102,16.21868528103059,13.76641612714562,22.652583388361805,22.86907734408207,22.68661814039411,22.35457701319554,16.18855987795278,26.065467962926093,12.887418834911486,13.611360897665744,17.15791259511644,18.661464205444894,28.435710128014584,27.315612993416188,11.474906077609898,21.67975117700429,28.836589908156864,10.359015945155354,17.897539852326368,16.14306464918082,15.287715870628404,25.87434863000999,27.649568121167995,29.939318921658177,14.948868896914922,13.16566244283393,14.132462784253391,18.77097497470228,11.323029595463217,16.373020253268177,19.856325026541942,29.00794618399098,13.009797735806687,13.70960948096096,25.688876221922897,11.988088441785356,22.268956360744944,16.63100616396505,20.30598076475662,29.811703545776766,14.253478877958937,11.324938439082683,24.23859074513779,16.46126196432307,29.167257968880808,13.901065989698838,22.00613146112697,14.409272680231112,14.617905535231808,13.566457584295005,17.498520605170707,22.564506534755566,11.2953334128639,22.307681200182397,21.36887401212595,12.605137404426227,10.111418603739427,12.740265296060866,29.484279855062013,15.145078984451894,16.902892688816532,18.948886750686967,25.255367096011,20.940359759888892,20.131178110105633,22.041973526910684,14.286775605650405,19.012092299758578,10.964361626529563,12.696286510940894,10.263697043985376,23.311801317690183,28.052357305090624,28.272630362078466,10.11739149360421,29.913157938018898,11.83906058072762,13.71991494606165,23.636080268015803,20.401755877551157,11.788878131341525,29.460185478126686,27.91379560635722,12.143752956212372,26.762107425856975,12.39966600452997,29.252467759697517,20.705239460343478,29.940329226882703,13.84468330042317,12.615858929146228,17.350688438207733,17.685366956345728,26.27946400389959,15.700675002784132,18.89342425177158,25.810535514345993,11.076049883524242,16.238356944613944,24.16204492561448,22.251580623802255,16.877743493256006,19.51194731100669,22.882742905993155,28.416610089969087,13.85528465052531,13.766824922262293,18.649807977465255,21.38942478988572,21.66092666768567,22.962253427574396,26.647041782586626,21.347381036674538,24.710738030004954,17.602481962213258,12.265442329247303,15.657068070987478,14.482521867710538,23.768093536421766,24.36320714910193,22.182980565288513,23.68634510532715,17.478187758252712,18.76836459245761,25.591024026293564,16.712921381441703,15.694245881093405,16.06027811485152,18.70246982653224,19.679423443674978,27.805717965192773,29.831479338778507,18.589076998115477,14.466909213710949,19.242920243888058,20.931132334916732,11.406784557213028,17.771736106311455,18.86938382033007,25.220381097523067,11.332590111050663,18.45790224316869,23.59129146339687,20.70461903576674,25.67346761175731,17.063583930172985,11.129146054370462,24.581892737551954,12.599399419602326,16.670164744322307,16.819063530776155,17.16540831050623,24.11498655090391,12.923192368798961,24.994273972461905,21.14298785704319,22.231873431658713,16.615124239279982,25.97542528679132,19.287141924527262,17.64362711039093,18.097025949613453,18.67996308709806,28.697891058973532,25.913502384311144,15.747003081143603,22.00715148179098,29.237755286486443,19.933227409061995,28.87616000546761,21.914204765136237,22.728509592534106,12.826847186999855,18.358937016158965,22.029880479657113,28.16900776787588,26.76663371857291,19.57113714116012,28.07346388857935,26.425081536990188,28.039308503371036,19.152406853025703,21.298182611587123,18.96576024809235,28.14473354525694,26.67862927550891,15.492544740986691,15.517248121369223,17.53500264002453,13.401031046977918,23.353290970267246,23.40329608095912,21.36087924662341,19.904348319220986,13.387938133636986,28.390417428301568,26.39900286170521,23.919642044001513,20.590649849953024,21.785586351407208,28.50246401485917,28.760994420851258,22.353027806437726,19.834468988396175,18.81992226737153,15.649976494817546,12.310485781447538,18.172186408799323,21.767522890997686,13.143646690245339,28.538443748679203,15.148748390852402,29.984742453707543,11.885012496530113,19.343008399467934,13.455101540043497,18.537183483440415,29.937096082962018,17.05074063153805,16.699007873006934,16.50960824496221,25.29461147478193,20.61678673562679,22.211146625074218,12.52565423471529,17.016861116512942,11.973095011089043,25.69427433365405,26.80602562527103,19.61733117179125,27.86606368752708,19.480477472732055,14.149030021958087,20.047084372695913,28.77884272459511,18.83102234414253,10.287730198608656,17.482737552105604,26.66506004909352,16.4137715910249,11.062211116443933,26.589260025139087,23.971353930666382,14.487181413298273,12.926765753342329,15.601116451863547,27.839004011924832,27.02488803592923,29.146737433118254,16.98174805479741,29.755113401694366,14.034965212943336,10.664041787153566,23.109081414927935,17.18022251180121,29.945716054522595,14.039719157002327,14.423552941420144,24.42790761298032,18.446416558578925,11.756559895580136,18.613628051521292,28.78933840812664,11.570596752309289,26.51580871548117,21.993228084885274,28.76187316282686,23.24515881084617,12.944728782430142,14.637902152675641,15.093083936994564,14.823412177912978,28.320045518055743,21.124285396438026,19.97271242130562,28.62371818285698,12.705235273324792,29.436442269553865,11.453205984813586,29.611823809691952,10.253028046669161,27.17960915099885,19.274696966299846,12.100212768734316,22.71208482816087,18.64622194669787,12.08712694516397,28.7796648981597,17.630283010556948,19.755533486931988,10.187022895043967,21.292196457139116,12.130522166126232,25.574949146113262,22.79572562851978,29.663274506988778,24.893654814186213,12.505298818972687,27.489488623953623,18.178443230312624,18.933535741395893,15.102268066080079,16.598958732196426,26.38539504226837,22.815868640417936,13.286064927644844,19.63384278932653,10.627339774721282,21.093628939452902,23.976057493481434,21.667796844377133,12.877904073942856,27.98292393538326,16.86191100078251,26.09605426289812,22.001575531647646,25.422300946706898,24.32284865527382,12.375540714438547,22.547978537615784,23.258910691581708,20.351093935522606,24.082920163705804,17.495619022059834,22.63985829027725,15.20764561757234,12.629839287591045,26.407207457528052,15.736674474949247,11.373861310066138,15.087061287353807,20.702507541976715,19.246878360787964,26.89498182699531,19.041447914710897,25.281430233719476,28.152147737932705,11.03937687694668,16.846680246533904,20.515809913763732,20.745026708087604,27.84181563037576,26.083513804115476,22.55293914750158,15.743473676522658,23.89656473638256,23.681280774527163,27.212862828436478,25.118725226462328,17.1132637358329,11.1745671414768,14.7866410596487,10.161213130341817,10.520304234619001,26.252308938498622,14.364635605065509,26.077402821200796,26.599310370607952,19.51960758925817,28.844292543075937,26.401483430337322,29.772450057506802,25.54797908703939,29.898820874099354,20.856552432610172,16.317523675454446,16.08167592470812,26.604404915214232,17.33295278257775,17.307376389598907,28.501617809908456,17.260287390071166,20.869678793351913,14.41898404946237,29.579282505043125,19.137138641369972,19.612742229489115,26.938265479812213,26.285969126205142,20.804466651454415,14.520662457689859,24.907586637509382,17.481308069155183,15.530633980337619,29.505272431153884,26.948266265353237,20.967216862096656,18.11663885763537,10.770454155290864,17.22800990255882,11.92425062812632,21.093075525212864,18.804943827262427,17.493145471790214,10.378002751342468,29.594157687883857,26.029249789894973,18.089265445738523,22.14746013665403,24.473187493863698,28.971881961848595,25.14229500901382,16.6191593511969,17.41255834324231,10.855599151735579,11.006381783882606,10.764417446624886,21.215884402403127,24.166244469677103,13.800399833327761,28.581437385619918,25.167083589325504,18.444352705477097,23.50579333597277,11.033752122638884,27.371450296159672,26.079116307900104,24.271030351259984,18.244169488095675,28.246982581261726,24.614015254181027,29.35371709828304,15.612340198413701,26.535374735113177,17.879054545722894,13.35086408773575,22.585518223675038,17.334392203309736,12.18303619841735,24.14790615875362,16.6474094860869,19.295840865394037,28.613462735055172,16.827603645661675,11.19359754176437,18.03853095364836,20.913392397703735,11.911291539632693,25.57832496922504,22.21471382507065,24.915489952123707,13.348087362015413,25.318670752271753,25.37025274817438,14.143955776460263,23.004283251025996,13.755860546947467,19.652896474339094,12.136174181144472,23.824271684225202,26.123897799929292,25.48865250121965,28.87475399288093,29.47446604397451,15.80445242400193,29.19591034252004,27.855016931757255,10.495035682699205,21.878066956599366,17.192246203266457,25.836051833224076,27.587818072279227,19.308323139528273,26.637805434717134,19.222419651959633,25.895344766694244,28.756903395917757,29.182167485582124,25.51822420501957,19.891817667091225,19.846814287361795,21.418551319822768,12.531330788914214,18.778965688408316,24.580888353290295,12.225379725065597,29.47090563697783,12.453874175616795,20.38797626550991,23.82895013743575,10.87116595206949,27.146790867917375,18.276644385717642,20.888743187872393,14.986387712670943,28.833181034824065,27.353477959714574,20.521324780009323,21.660846211426446,14.19210060439764,28.191267447855708,23.424915581913893,24.171422001770097,28.986917358759847,18.449997528699154,15.874717846477528,15.909182880375837,18.932246913724345,13.271985766492236,29.600676303945352,23.172824201790128,26.58584791584793,18.758015283807676,19.819851264626102,19.303639292774776,13.781803027877157,25.307880606380593,27.165887055078134,27.697257788239025,21.87104523676239,29.58040414921686,11.081728676667947,29.88442739288873,10.912910324584963,22.755042248641473,25.767379357880817,16.311727435818373,12.723013164151089,26.342545599252993,23.231889053718923,21.639513955391465,27.171639340047445,22.753916807386446,25.528078834084877,29.469779246375907,12.80831302112723,22.959604601151,15.467978361844668,16.09063962943937,26.363536362597163,10.617231312977253,22.007190943126517,24.95624978484356,23.76848151828199,22.433824842104922,14.212556401639741,20.05882952364975,21.460750570503933,11.980696052437017,11.036788334913293,22.57895829727274,16.593940541667717,18.574705094510755,29.15796636047817,10.854093033128596,20.772395116050852,29.92299168842672,18.961524861215857,28.802983823002926,16.753697954258616,14.734123401842325,28.58345465423405,17.724484720209183,19.433976975393893,23.426133939974846,22.65480346785027,23.072703537052636,13.350984484110997,16.034277502645683,22.095245317278227,15.178627920511282,13.270436480770957,28.378239661771087,18.85735093771471,21.530958437445335,25.361494453524365,13.538554157190328,21.190902275635114,21.867929675940296,15.553280060821223,27.695630124605174,21.82944421838398,11.375573246402947,10.624629761303424,20.369199546642875,18.265340797840754,28.32530576276604,27.430775446904665,17.961106646732937,19.539092459089606,25.420846955307375,21.965342563711374,20.555724173943418,18.20580531200996,28.413958377082906,22.906348083391023,19.66083512837146,11.436867518737808,14.373506602892752,22.048322098445972,26.34850700708003,17.945958306996506,19.076673912990486,19.23884123420349,11.25213656870054,17.88339687702687,25.469345879367587,12.622787806201519,14.029823204396688,24.97510057657047,10.986461704295039,25.893201907882293,26.50455892675008,16.311454218245366,24.55761792273465,21.18780693634795,24.555537998406912,18.31978054955018,22.096512179176955,16.274447222231213,24.986790875407138,12.068475823601812,29.47027694673625,20.850111034087373,19.759261731369797,17.599818674975385,20.27084714164893,18.902079535416792,10.698052316099584,25.225363093322546,20.625819149078243,13.107111630106075,13.947506631440794,27.856327820956288,14.425326022759744,11.71539312748922,10.888999693834563,11.912226299029559,14.80498351382562,20.461115334923853,27.297873340991217,23.735596915927182,16.64677386307591,19.310804529156368,23.382384002003015,16.443054567880893,13.000956565045364,25.80522093311918,25.746148149908265,25.85650388202017,17.305566732379102,29.411732933881133,20.99287947988049,17.341981925668012,27.23150077044717,26.69964274157455,21.271021779429628,15.32894142869901,17.943601919587554,19.145743247169747,29.08107962009774,25.26614269598256,22.681916200592383,12.349798446542458,21.106111061302634,28.472063770453694,13.311409380317816,21.067791645995946,28.982375332362032,22.48932120025882,27.219018571506602,16.204525466565304,12.99517466110296,18.559157077667884,18.845355145680568,22.27517839053492,26.26775110478168,29.607176298935542,10.163325379567532,20.84570012095538,13.186221863510315,11.395214897185472,11.152182595936072,21.86597488639906,26.98435356690996,25.588903739391903,25.568858527252104,28.479376983008336,11.961249653747391,21.217913349230408,22.516647894028125,17.537418356257405,14.626708401499577,15.134797206732497,28.66057951271552,22.64603338078125,20.479182723638512,19.15493111697721,18.921356329930262,20.99168384927713,12.45777449293624,18.277909924942236,20.90370103288802,13.461717024689065,29.57631127676504,27.76706642768739,29.438284598548,13.395417057647222,17.008286312352627,22.448035353759302,23.189757765504822,25.23100042523437,15.91476963407548,28.710902167375988,23.24206045250574,22.81268528701091,21.25196013059698,21.16266166605895,11.535996498837573,29.390331544010326,12.434625771001881,13.479053604891384,16.26495175958436,29.865476401166276,18.39031218367238,29.277552621590402,27.357648373845812,26.65085640861526,25.713732187252617,18.52555527799109,11.180211162246598,10.001818357040012,26.409286332783715,17.878434816889236,28.248770737114988,22.027566745538067,26.64967719824617,14.062539647864295,14.334745281755756,15.916615262782031,27.319699850308115,10.867702302330366,29.257137233337076,26.68070369148603,18.986517889204432,25.807845903647344,16.916197215537892,23.690303756732575,29.167274378912033,22.043276814639896,18.653646068012204,21.037719820467885,13.162638454910574,28.08654732449928,23.644820954647955,23.88239734977308,27.48700851677899,14.214131061403489,22.028997414450625,25.879042758883468,14.133756003620181,29.91843249960533,25.384873047819923,22.605970772800394,20.804682970699837,21.510848287424437,28.119970832123894,29.72071309460545,23.11197831073716,16.038790220699394,13.293826240511265,17.02323329814254,29.16026857760613,19.530445790513365,21.245574593142905,15.803210683125549,26.22444548060991,21.451450491513842,16.729805540247842,13.046181422082665,12.27842186643782,21.28632926794211,15.30834733353923,26.924736478123737,29.394567421661293,21.076871966620168,21.02332629406868,16.472300661804017,14.625046230133961,29.805872831873927,23.138070464974266,26.812489540394072,19.84834496233667,10.088653047406106,22.492243119913745,15.415478966304326,29.347488495222244,29.958529304420708,22.21617895941145,27.72474785249345,23.53375487818859,13.282946166444628,14.795481204700621,15.488034060030834,16.910595145840016,17.082464769048492,14.342382064606918,14.667936731495473,17.40077677011826,19.823209868937024,22.01370913838236,10.763973915677582,23.274641372675116,24.085969235931795,17.562794333201445,27.435008672643676,25.72558211346343,15.403732068524715,10.018736654182504,15.32176842210716,10.897245854593777,11.539567369055575,15.196603779681945,21.724613665577994,11.154572285301608,13.27947197944749,13.770894565562074,22.392510623979334,27.056905397606087,22.31660944285303,25.002371283649122,20.299916640780058,25.181289278871,13.710179773073662,24.1879014604473,28.418865792965992,21.567644616684905,11.159309282724035,24.87955068633301,12.988381617352246,19.743798087810337,21.552408051843848,23.369602606739225,22.305330153336605,25.163716598445518,29.35766183872966,15.808852549826238,14.101404063461,19.027528008682996,22.524167200158644,24.354022782853527]}
},{}],47:[function(require,module,exports){
module.exports={"expected":[-1.5921056222118581,-1.7748715719809316,-5.78830470385417,-0.13973338666605706,-1.1203791410465005,-1.8042799322935066,-7.926414669926839,-3.289286128441524,-0.7938777915331015,-1.6114004657284244,-3.1149260056585213,-3.1836096186981893,-1.925380895748515,-1.5911827689368443,-2.884849142566001,-2.810366576965369,-17.92564475996756,-1.6732854031043738,-6.362784269136609,-2.607180729331418,-5.199563855988137,-0.7042062923715395,-1.209098186279573,-5.850432839566345,-2.11110619752748,-1.4717001268383108,-1.5031709730951097,-1.265572321801418,-1.3529010558347014,-0.8758093221214542,-84.56415905778577,-2.2476252310952596,-1.7363811687174744,-5.352582065737375,-6.030698509593076,-0.006995056114721621,-5.280455942663643,-3.1465980323449845,-4.142296024069099,-27.107075657245606,-1.6942784669278765,-4.659055366326616,-1.1604419558053234,-1.7700734434632617,-2.069049525540628,-77.9175388633757,-2.0659321659504473,-1.6095884259597248,-1.18877512567303,-3.3296493756623513,-0.5661208818234478,-2.8610186543168536,-1.613000300354635,-18.963996777211925,-2.3327829877146278,-1.779253730348623,-0.9253450827833216,-3.6471194374976093,-3.1535477457625736,-2.895088686694545,-3.6544889605558257,-17.428291504561187,-2.209313853292291,-16.88903020011906,-3.666765232209274,-5.399544546324906,-2.0224437492468423,-3.8549677502546285,-2.13995730537745,-4.960464896673218,-0.1890324632484397,-2.23382079505895,-0.5981374895698179,-2.5565289408022913,-1.0054999128609339,-171.79326358105928,-2.4143345016884137,-1.469250411740112,-1.8541963868440412,-1.6089363207680774,-1.4054535407327124,-18.400080919763568,-1.252536391127646,-14.950496454188066,-6.193466618721956,-2.9805706393580946,-7.186171739283976,-10.033205577505,-0.18828038251271906,-2.7050945953196504,-3.2685025820291793,-6.900872491258692,-11.705370092585413,-5.503152046362897,-4.265900707772592,-3.0861616503594718,-2.6742840281634526,-0.6139471260311673,-0.8138514673151436,-39.18454920508463,-4.0191508924585015,-17.924243698218326,-6.238633874168089,-1.2079961609309269,-2.6818812110027324,-2.1752142530500382,-1.808472931416147,-2.4521701523939257,-16.388880086236263,-1.9035129719797625,-0.6885121447734779,-2.6264950168403227,-1.6859808880015343,-1.862761250282364,-17.008698886448826,-1.9021187842769347,-2.6938389141775434,-30.856570275999683,-20.877637605791517,-8.863975918538557,-6.336321156274602,-1.063882245031313,-0.9971109209615374,-1.3145058063309456,-2.612892241861564,-1.5212818904918688,-47.19450975754515,-2.047804598152741,-2.0920124963888593,-0.8949197270980713,-1.6140947263174308,-3.4949063243375833,-2.5404374192345314,-2.1296471163704327,-1.6577114401552575,-2.223190507009977,-3.7564930230470273,-4.842987906117205,-10.166067560997513,-1.1073952165156955,-2.3823734337715154,-4.816947561038932,-0.8058162961434903,-1.5759558327424932,-1.6161646544549741,-4.044927425381657,-1466.1745110322356,-0.3497454139703873,-49.713368374324055,-1.8047192358259596,-10.530889933942793,-12.223368379981308,-0.66235738023334,-0.5305279620260315,-439.7802414617691,-6.616630953664952,-5.353258253224655,-1.0594275865925882,-4.491204533733958,-0.14191999144888,-1.0560307147563899,-10.97446057570772,-3.4755696106169145,-9.301632092320702,-4.317267285235348,-1.1623603947328327,-2.735637415949587,-1.0790341672916028,-0.8990748504291215,-1.416463330673869,-3.292554829954565,-47.56804513755687,-1.3763615338528776,-2.5271075826523353,-1.6514524763167304,-25.830667417283518,-0.7607472425326662,-12.530734861198404,-16.531256852687747,-0.8723658810995074,-24.47433413757273,-3.2440473851923963,-5.642853740536947,-2.7541753866016463,-5.11599279407811,-4.3088401784449655,-6.349141293024729,-22.31103246013988,-1.8086752184675245,-2.2294309381048265,-46.37838149592305,-2.7368245260828137,-3.0988778694942685,-1.2619806718753157,-2.275189792629665,-2.1341509733082686,-1.7808865740290338,-2.0254987664582673,-5.229098713903291,-4.284289649370556,-0.9664671758823848,-1.896349698827783,-133.11830940099674,-3.52478005843827,-1.0701652350369635,-404.4650166654645,-1.1752332363820361,-12.526155428761367,-8.881073897847813,-3.845317669243039,-5.00400547084108,-4.848826317990024,-4.347027684581219,-2.3265894856989204,-3.919296110073688,-2.7567278789800835,-10.094421015675998,-1.7792370851497794,-2.4368654522722792,-20.25715649972008,-5.158192900718785,-2.6901076677930664,-2.415916338755153,-2.1635057282355543,-1.159758299390833,-2.588142773540492,-1.7776565356513032,-18.479184332745547,-4.683519048635372,-2.1836262101266772,-2.321209424618659,-1.8497445667229195,-1.8543234576098309,-72.26897877870368,-1.6199927559701504,-11.361935218440294,-2.097535371129105,-1.7318892322259085,-110.607436051235,-0.4444916273483024,-2.6505139638244173,-0.19929624714181848,-2.052969174617548,-49.918894978836065,-2.198701316589374,-58.83090213356471,-1666.1997964766333,-105.60076516236455,-7.114557886631209,-6.52956514395328,-2.240713842887495,-8.248753807218396,-6.576288020017222,-2.1203444406707215,-1.6106449003405388,-3.414769382328787,-0.6114469994992842,-2.718593607731034,-2.802395502062655,-1.8937589619459017,-8.620896046359274,-9.357684356352893,-1.9680953580776066,-1.4032809084297062,-1.5580849193976398,-2.2856654437079866,-13.57363244916759,-4.198516945551599,-0.7469635446856682,-0.12245406349719978,-10.895442818929585,-13.979369328654343,-3.586861519993112,-5.084471159657756,-2.302048971094353,-11.498338698502904,-1.7104302420527935,-2.5727863260762254,-2.6265720917790287,-3.386446962458956,-8.674108486625354,-0.11333898670396003,-5.144473568471767,-4.670145806859011,-1.679137379403027,-1.1595597818445214,-0.14384468345746093,-3.959174055808651,-1.3024786097917218,-6.004501189215981,-1.3080327986089202,-13.363618392851539,-2.438705280468481,-190.6009260849948,-1.1646034748705008,-2.470156147106476,-1.118905713210589,-2.3177069421255347,-10.264166313234288,-0.8695468356080713,-11.682114952293173,-1.0090118832367354,-1.7069781142604814,-7.517747662310835,-0.8195580040393384,-1.6764945093841899,-4.101864005223595,-1.8103284324257722,-35.50993992315879,-3.358098351864241,-5.6384760839867045,-2.3579260255717474,-4.621099076029964,-1.635479144178312,-92.39164388378059,-4.028966809637531,-13.388753940722939,-1.5786243138891694,-16.85187886235792,-184.22423187470753,-1.06358201418222,-25.76457190016576,-1.2282784757122016,-3.8363606067192713,-2.2320526360842985,-0.7731578095556024,-1.292237924766087,-0.4060169363584434,-1.9685748349930736,-1.0645969625104046,-7.1641753277388665,-9.665631451634251,-1.9403175996896733,-1.2775961672900102,-3.0614327768735388,-1.6984035300408475,-3.9293325900273635,-1.0917217688724863,-3.3184479653417482,-1.1310361582942345,-7.0519978170206095,-8.719412389667223,-0.17679950909335673,-1.7158608943880926,-1.7465071805301413,-0.32650549871891865,-8.866409155942337,-1.139453793900013,-1.1041946851208282,-8.150830673922902,-31.74377271996809,-5.158364731347286,-100.1674239532189,-8.62077841094072,-92.05313373960031,-18.002660027598527,-2.331083994642303,-0.4796252893748054,-5.129033274042735,-37.84564321766101,-27.58656072517082,-2.7775485541737455,-0.9817014312871857,-9.535452457504519,-35.62482151988474,-3.4117170808876756,-6.741578891075313,-3.064850708842315,-0.8913989853883519,-0.9018862168618318,-1.3900605764733096,-0.8836415552488095,-1.7669314766738227,-1.080272116816018,-65.15978775208492,-1660.2674700975751,-1.2321490381828282,-8.874134860320455,-3.2693692009002104,-0.5986857801878465,-0.10852633459452399,-1.2628500581986426,-7.2302373884710684,-7.695553286964426,-3.172703986228334,-2.1183801345850446,-36.86016332142394,-4.278548662662554,-7.814152025319206,-41.614701894512635,-0.9333965019667074,-2.808364418654768,-1.3494405149385926,-5.2417848552451725,-3.139330740974762,-0.9798889156090169,-29.17526209474896,-4.014655336703194,-2.1685939130909677,-5.928750287338559,-21.972427381465955,-1.4381957041762208,-31.84661589880512,-2.331642289964697,-5.476524596062834,-2.250844676475349,-11.287761286466315,-1.3170086626520492,-1.3542759537133033,-1.9305365443316385,-1.5562763375356399,-5.8277166642236855,-1.7204990093088925,-2.890903637046388,-6.696220576291859,-1.0287332381625474,-4.196415184692464,-4.086482332690384,-5.866930359620092,-15.270252700234796,-3.7405116285123956,-5.600545919137091,-1.5690299932906457,-2.6955923975343037,-1.4465659007689071,-20.822849812763472,-8.592394704152303,-1604.3173876385292,-1.3272042087081193,-30.665477755593635,-16.131466506032865,-4.159243404056083,-3.07163426451884,-0.5683123776405559,-2.78111308232709,-15.596483843515294,-52.306437793933654,-2.0128809830964696,-1.8141543733843823,-9.849586159490226,-27.0983451422754,-2.1884594541243105,-1.3261619451004023,-65.1784508495486,-1.170916974604994,-1.4541459337109153,-6.233263728871007,-0.3409854154742771,-2.399426278001302,-1.1846645135809286,-2.535345925916103,-2.6245496390267684,-22.430605939658335,-2.858431116177192,-1.6543543428094178,-4.960102505511035,-1.2303744211205405,-0.789307044460843,-0.7255148723963378,-25.17145453081463,-7.779056300133419,0.12617942762847356,-2.5715973157620695,-2.0736051351954226,-7.1663601059664845,-0.8033802936740289,-2.7036531837895175,-0.9934304615382148,-2.164739726903878,-3.868497871391215,-7.18297943024645,-2.7943948677268082,-3.0914054769962007,-1.9572853014186906,-61.69011303017649,-6.8580090133296885,-2.82328641601877,-1.5171130023483705,-4.256037054353056,-2.987176941170388,-1.2906729497983571,-2.4452832240361717,-0.1478033243796748,-3.8092212656072766,-2.4636108602433264,-4.113019271890639,-5.335384316762086,-0.7910062028214053,-1.7020741799990953,-2.786832432336398,-1.5812330234119498,-16.859650198409376,-1.1103520908628983,-4.036321371395113,-7.541206494021524,-11.723200414589149,-2.781750851516234,-2.031087654088889,-2.8412565927122038,-4.782594161394218,-3.1593481762832085,-4.006528023256973,-2.6963282599175575,-3.4481617524705475,-11.59110941460828,-1.8619788089197598,-3.924876145637765,-1.6993799469954745,-2.1152620599584178,-1.436549348468879,-66.85286234583111,-4.238974139957822,-4.442076053515696,-2.090688076684474,-2.1125316358205435,-1.760655669309518,-2.5259722884191484,-1.7988325775758405,-1.8004753022715914,-2.3702410021096245,-7.65546702879378,-1.3873098926765,-4.044942003227538,-6.155151902361579,-3.2113120677160136,-7.214410680211644,-1.6068398461463254,-3.042956837964818,-0.8991470860708466,-1.3514294695661517,-41.47172768621118,-3.0268725246828225,-0.781494158134441,-0.3348105790910427,-2.9322485762934862,-10.204152269090008,-2.520566392629246,-3.974445189346465,-1.443194430580502,-1489.3128996534153,-1.6240836115633086,-3.5684674737896174,-3.891025183327578,-1.3500006993563094,-9.752435242289895,-1.9476067303562279,-4.145220369952261,-7.262573885388438,-1.695463281786021,-52.47471765159181,-1.0952358025213886,-11.144430523011605,-1.792695749705814,-2.033787189809388,-1.3704168592854202,-1.7943293577904247,-10.50358181613138,-2.1040603942065546,-4.523072908812511,-1.906352047943506,-55.440597621549685,-1.3992929167477381,-1.7958040976371143,-1.3635407544926217,-8.534833799398912,-82.02320962995334,-8.142643067159334,-1.4161156380923838,-6.483390519480794,-3.4674437861298024,-8.539429231098955,-4.487619298152259,-51.61789491089837,-1.2990039132965832,-0.5332836717431846,-7.055838930889503,-1.6398930245266747,-5.119786642820732,-1.9012466973457767,-5.556501280247463,-3.5221765928062414,-4.095466138008775,-1.5802737730401644,-1.5925768058484158,-24.839382794642177,-0.9388498230661213,-0.008128703364887357,-1.6361830387924519,-1.0706177982505318,-5.527663712632978,-5.498775613422991,-0.6896788204037527,-1.029613162884342,-1.6830733225165946,-3.092805714287943,-3.8029754019708557,-6.9939641807492885,-2.9345616748644794,-4.21495945690725,-8.706421956277865,-1.9347152191537034,-49.539650250884705,-498.9104226645143,-13.552526071040658,-2.0398323566549337,-3.7442096423592632,-1.1831529251269588,-1.9340778768907674,-12502.779183738285,-1.2233495066649578,-1.1387364741501997,-1.7519926885167836,-0.5445258333736298,-1.6564767751460865,-10.04343824674586,-1.7821234061533788,-121.6316592480158,-5.665310284755456,-2.905325246593137,-4.322258834946562,-4.880557068265141,-2.237183814699115,-0.4214203244727912,-11.18126782823824,-4.140271766879689,-1.278565059156219,-1.8127407767369772,-29.739778573715064,-1.699254728353485,-64.4529013009312,-1.7615538591226683,-1.5261146324971282,-2.678080188393127,-1.5615198641126211,-2.8278086126595916,-22.19661369610844,-2.4157989048618855,-2.4344364792016933,-0.6087668683893757,-4.842577530439103,-1.985973516071759,-5.638154276411999,-1.7489812329145602,-3.4041649328244556,-7.9991766034322325,-3.188630803385754,-37.19801799335036,-3.4705668403651795,-6.349009049658518,-1.3729049766417987,-1.0651334184552521,-11.107753125187724,-4.422454368775597,-4.895936788468481,-3.037497799475769,-56.40706492332761,-1.0927534399202354,-2.543776565618245,-2.2494330641329867,-4.714888832693222,-1.9098526919334335,-39.87646151418441,-12.394439524047828,-76.63925526980212,-4.735861006529142,-38.0741543581539,-2.0844334438970007,-3.2713869967965485,-3.8927893856320495,-3.661942846936925,-3.0559195112086086,-4.384185813189372,-1.2595480144137348,-2.2659687919024396,-0.8188525532780986,-1.753318197423921,-1.8392932839524452,-20.904411760658395,-3.6726742759120157,-13.246805871326146,-0.8792130783113681,-3.649161005116923,-4.718510846469881,-3.1032233425675413,-1.8241421488694112,-1.3135958312189402,-3.7781147203514545,-36.62377164367353,-12.678662985286149,-4.622092844313913,-3.427908822791145,-0.7351948726576225,-2.7267608807911086,-319.9339184255748,-5.509498458439461,-16.513984193362127,-11.528613519490502,-2.5092316443534797,-2.354021933151924,-1.5993542737322457,-1.5746267069635156,-3.814787015810478,-3.4026970737935813,-1.943322654444974,-1.2602965686686831,-4.0768840483625155,-5.060927263526123,-0.6578663002612757,-1.814592800669962,-2.205697233023212,-72.89314889203962,-1.6107393424357888,-33.901450873835714,-0.8860785043019641,-4.468067391763906,-8636.466799516023,-11.587314029805391,-1.4681584681445692,-3.3345660822035175,-0.8106689345626332,-33.25072830878378,-1.6887889593048047,-5.283723274704378,-1.953359829945383,-2.221754649662194,-7.8553846693327785,-1.3062429757406537,-0.6734725520776816,-1.5495722090904875,-3.907475680416876,-0.6075744663597984,-11.81642929404928,-12.062984300644084,-2.032045342748668,-50.47736932273453,-0.6830971117074522,-9.693190210204314,-1.3262336865143425,-3.9201147166259407,-1.4390648931785788,-2.499848193097881,-1.233217209416118,-5.924726397896928,-4.615715615657255,-7.382788043373491,-0.4631752935886144,-2.7047619985639697,-23.451817080173768,-7.1990039783166,-1.6282970600460889,-11.135636224942333,-1.4156542225190076,-3.107110950092632,-3.3515203768915764,-1.9105806638162681,-0.9359345327427366,-2.8213228850811563,-2.4113021724580523,-3.159017666287443,-18.809142513580614,-1.8340280113995204,-0.889071319930685,-6.2874462743905495,-5.107887065257983,-0.5431333735772359,-1.1480732622860108,-8.15144678309672,-18.581813945811604,-1.2327986371709097,-1.385669595971203,-0.4026780780536292,-381.31741836677236,-7.392984052149011,-1.0255691590101579,-4.140338122532912,-0.5839073638976213,-0.9325816736402244,-3.3227969085274403,-1.0306883586091384,-12.658913555620057,-5.3481992415376185,-6.3186351751686285,-2.3583223797376887,-2.410216906604605,-2.5665670573862513,-1.1098611263405704,-5.417225808674408,-953.6865982494435,-3.1574945930475784,-1.585186239002117,-1.9346542249075775,-0.8161239130898172,-3.188785115496655,-4.099467944452215,-47.79384132074135,-1.3215874230426232,-6.69881294689019,-0.9653078660283683,-5.135524724463185,-3.3330299037933844,-2.6167804196748827,-2.0856437804157846,-3.784515130268378,-20.78921263665843,-6.45958607948202,-1.3764547300253955,-0.9945843326491772,-23.954948093802823,-43.3540343415899,-2.0994197992990733,-2.7459114715320894,-34.343469493579015,-1.2869691429438905,-1.6869632867037776,-2.619535306775754,-2.412919585904225,-2.01159024531493,-18.313163089858506,-1.3194989188425117,-1.6630121704477636,-1.7667535884162797,-4.088959850768591,-6.1485139496349275,-4.276074724352863,-8.336473855018543,-7.074982842357224,-1.7435594432207226,-0.9555788077709488,-8.039593422413272,-15.334685804442902,-1.166758882477409,-3.273326810871705,-11.57810209475191,-3.1910302267101036,-5.062544203215514,-14.973440239886763,-124.31859842880291,-10.405800421463418,-4.263874246776441,-0.9104267992601089,-2.821792427301929,-3.0987796438609214,-1.9930214883766224,-5.453846677494785,-0.11003616680964079,-11.696455139905105,-0.23898663188713876,-0.6916749724605031,-3.4035425477958214,-28.71941410930829,-21.14729299088978,-1.624187020398534,-14.002610772939406,-1.9335358845777604,-0.7298496852176442,-0.8095765380430926,-3.351124347488314,-3.915893815050337,-0.9003262716681242,-2.052350052763983,-18.720009661976835,-3.7043212263231933,-2.0557141956068143,-2.1106359355748148,-1.7286475350782897,-1.5277797862882618,-21.478552508926334,-5.932089270371611,-1.1333726236861965,-4.489999258048467,-1.699965312621381,-0.5620774189622946,-3.7270679064933354,-28.56060628779925,-17.93548613286855,-1.6288270372834033,-2.792964256345702,-1.5527543368812111,-4.259896581146431,-2.0820748505329023,-136.8756724886694,-0.5501724616313179,-1.293366541560573,-1584.6113216228387,-6.952497773031233,-6.846800317118147,-1.8925785445473293,-219.56323834332488,-5.33700526412761,-130.92245476551432,-7.584565333872189,-23.72125905973195,-6.9326095502014216,-1.4996594881563614,-19.296608177164195,-0.7866722547849161,-35.06556824353399,-0.57099135553295,-1.344671372092039,-1.0957462878108783,-1.523472191108178,-1.5506575342705355,-49.95262836541652,-0.928179910471993,-5.12835147094883,-3.7393908620842433,-1.2533920193575634,-40.07325129427282,-11.047921988005513,-2.081142327507729,-3.8508017380033355,-1.6502831665835211,-1.9258987021586194,-1.2757947489139285,-3.5254394538734912,-4.562622800479017,-3.9937315055273768,-0.7909906005991463,-4.286689446985191,-1.8911212150778685,-2.0391317416051153,-4.491009478522552,-1.8771852689864876,-1.0345951084917688,-3.459546362517886,-1.246025577091575,-2.774596635279888,-1.4548497623907828,-3.22609801457637,-0.7134706429627036,-2.35969708157455,-4.664553224976306,-2.3775015307839187,-0.6491141108336427,-0.5093689296238004,-4.5806434354212175,-1.4973142001472404,-20.443908298917194,-1.2725301587022981,-0.794070720987861,-5.473200953030821,-8.762067558472193,-2.038444903141811,-3.986562084009243,-3.615834896213115,-3.7310023021141183,-2.064428150407387,-17.035831169244034,-2.1370423622325614,-2.0921300905755906,-24.335411231753834,-4.2498751728556226,-0.6124671799046233,-151.43127891280727,-2.7487154516024086,-1.7537073003615613,-0.9567538732445522,-1.8754192627055595,-2.2259656348564447,-6.836049272204714,-2.1731339697143257,-24.011184754617616,-2.2203050976045526,-5.821244776501268,-5.327008846569829,-158.568321786495,-3.7269049549153506,-7.328613603302491,-2.135479024076612,-1.714614834601913,-1.6808947461175237,-4.670725777586773,-22.87097701457285,-9.769620717165616,-3.1613324529465214,-2.449059544549415,-1.5211910475172772,-2.080238511415228,-1.8633619793696976,-56.25581066738368,-4.2830664984835884,-4.816322572925702,-2.6011084684395653,-2.0641121799824367,-3.7294075635133415,-1.9173376908591537,-8.670147851806888,-4.568143636414381,-1.7013051655926286,-177.83352101346009,-1.8149149747524844,-2.244927589527778,-73.44123418190678,-0.7631665940089718,-0.7733655085112483,-1.293565841036905,-4.964767380092846,-1.7740398566311324,-1.5657232034263289,-4.7513302483504525],"alpha":[8.584834093419465,4.4636988550835754,5.263286457244554,8.743935286156745,5.4413361614439015,4.266064939395227,3.1538314994100536,9.724625753077811,9.358387151579956,4.61413457520242,6.306264167576055,2.5955853797470207,3.1067217917744894,2.9427841125269416,7.850502867656928,7.570627848709675,2.3573502054891216,3.7527899132595843,0.1998615632862455,2.589486195502697,8.987996125873208,7.657949439929714,5.521747372429669,8.280092616828759,4.387683717658984,5.422082966413249,3.985853418885743,4.326311963211458,6.684573410597117,5.123168247882526,1.6737125608862646,5.093228175995068,4.821463892000242,5.302977758818129,3.6356265464866677,9.924105323952414,8.123770165013863,2.95533094196617,0.9177080331404031,2.8887404898971614,9.118551944079773,3.2192882218499363,6.351314788836544,9.516342298708267,3.7031089965886044,0.3068447354984105,8.646622693266172,7.747071082892932,8.050853309379693,7.2252745126417945,9.011562642105243,2.577403264391982,5.616121618352996,8.066982099189953,1.9257192954205893,8.717355104857326,6.081390135493374,0.8765209837292143,1.61627159100862,5.8887485942312985,1.4536394042002443,5.329946102378786,4.21629495915311,5.816540801597585,5.896126860727784,0.2871398838369954,2.783597404641236,6.689298903191371,6.029838277354457,3.3275321228278365,7.3292666335124395,8.938355701175409,7.499174133937617,2.8954391026120563,6.758092995275926,4.503407022248962,7.423954147459133,4.446738680459317,7.374918142302338,3.797466716081126,7.876457565103654,5.044488725087373,7.19855811890892,1.259655043773793,0.16640593277962967,8.846996672130384,6.6021124786072205,1.2388344403411322,9.341112298342413,5.187774562183776,5.27769943471468,1.014334971182953,5.513561219627945,0.6652030494038952,3.2127387728344825,8.98195862140513,1.3268125571896472,6.980198389120071,6.932685831679793,1.6099385767877683,7.9794043524346865,3.778033386605504,0.306492298859915,7.485125242222366,1.207327044616453,9.736060280735623,3.8633487629065733,1.8127189985108272,9.034322200429765,3.050363228551025,7.002826792456749,1.7207308045385394,2.6502813421519256,2.547137618288202,1.5764508584256354,3.883889786301622,5.91384409874089,0.006868799979087292,0.2300226552565987,0.2893326110872052,1.2412500877373867,9.010907985317294,9.076614070422211,6.872913475142434,7.8550970164790375,3.1427469193609325,2.2619725916919253,2.9450943080967806,5.843488024000996,6.766297900053342,4.51996224286442,1.6964057276124156,5.158861691072474,4.3276755308204695,5.441739368470115,9.438071642909897,3.4708805532444487,7.8096188878578765,5.724145653180934,6.137036920843098,1.8624945577731888,1.9907424174360688,9.21129015383273,5.86622323165024,4.929421143849034,8.610307384147148,1.1334397046101863,7.665258790026743,0.31640212113593025,3.632162197469455,0.8380450366018599,1.2510320233360006,7.82667641874448,8.604506518565957,8.783353157496258,8.616833679182038,1.8487104823109646,6.2603330016186405,0.8229326207320264,8.12429807133916,5.240477598578588,4.239285054168538,2.7517043193491997,2.579552292031575,1.2914135685685135,9.364970787230915,5.803380317404692,8.082845085756269,7.178192471349021,7.465162770484907,7.668358144253105,2.5633125821507297,5.20487858654808,1.472794346471853,4.6434365981375585,1.446493260090067,7.125315141401181,0.00588541214316507,4.2794476669673,6.973898906709552,4.37101296264909,1.386377691366909,2.5147680364047753,1.3735503840401209,4.615536381276149,2.496860929455189,0.6375185783630655,4.022547757162918,3.949446393905076,4.982498787862848,7.6629772880898805,1.9775705318014603,4.29233639075054,7.745556416599941,2.2381571838656655,2.692768470555611,3.580756592198744,6.9876680231519845,9.281706958945792,8.672966943849868,5.479546810893547,7.388790625539004,0.2840462179768122,3.938770543830181,5.530524450364642,4.681091595379887,6.317868555637906,2.5803819798784433,1.2344576655761852,7.835956315386232,0.8856859465853439,0.9351706866611353,4.542147109532719,4.690144218376934,0.7507193481453855,2.5006228886183868,7.555240511145717,4.650511992052664,9.942143138186644,1.5423258038547627,9.611210496323128,2.2085218789989547,7.274133107356462,8.998834448510717,6.5696845663194425,6.866142955572019,3.3260307651151932,5.756625247644629,1.4559600018573526,9.057796840254568,6.508266167771925,4.584684568199435,3.663267413418536,3.9842685040952897,9.15503261962268,0.30163772385583876,6.518890259057724,3.3787093187404738,7.428369129105057,8.91558215216325,7.932457641169401,9.134840791437055,9.118617787728434,2.6354530751254046,6.797497365319538,0.3310807538402516,8.740329659339059,9.31013224795304,1.3606514711130235,1.3546080499597735,3.033789742125299,5.430605822652852,0.794556511639779,2.284152442373919,3.556778139475174,8.981100818935646,6.676068675695959,1.3724233743916803,3.4544919656234763,3.390881180606513,0.816328301390612,0.29310527273539,3.0268906033002296,5.413727431405519,3.6655833632699686,8.320041230833224,1.7841773538411054,3.2058380819324706,7.853672708233761,9.9510168544482,3.170546352738244,8.83982966386501,7.172025021067232,1.1441954645888308,1.8069349365667442,0.8709051022431225,5.401811200563563,8.006900343919055,5.848668726126109,7.0350486475701075,0.19631032562671624,9.292335963111455,9.594947061999019,6.126389301780948,4.136706553643672,6.862742751164223,9.8938418275659,4.933550112419605,5.765635603171084,5.21454186606684,8.305222472298528,0.7995405187821092,2.839795433843284,7.342706921375486,8.23974297304532,1.7987088194799261,5.5433322488678165,4.83782876784532,7.702785026233297,7.135404229794744,1.7798153225266433,6.019301227847185,9.207206855763877,0.9824866069742066,6.0754768953370935,8.63106105610691,1.1751398311373928,3.3381233100766217,3.1257445334308986,2.109421885762457,3.85586099787973,6.818233787423509,1.7597460723921499,4.136521315204651,0.5694089309399253,3.0147934568853474,1.5136422197437116,5.806296093444305,5.699386321158741,9.606026180454936,7.389638645751639,6.992255002450982,6.130620270539162,2.2377724449626646,4.388773469315012,8.47719199932272,5.295094616962997,7.602443423204952,5.180681738292807,5.579387110282001,0.7655004356690265,2.73743821101339,7.645228143604212,5.157344800117725,4.848116504366102,4.9123264407743665,8.079212061245514,6.599929271232579,1.6408604843093921,9.166215687271356,0.7340705859472929,1.579462391089248,9.475949214434314,3.8604796615025805,2.7338976410745475,8.517608061308476,5.200088001604513,7.971998052939393,7.319302419141362,0.8219833188123782,2.5031884175006547,9.787376393683925,8.230951252192678,0.018016830072657974,9.385206128769646,1.8458950508488625,2.581061373917235,8.96182011322156,4.669139282233099,1.9176850803358025,0.21514650214790487,1.7389587679735241,6.318702161753933,5.373749728951404,6.565443558452975,9.607092940555562,0.6713079320891424,1.5966827363621316,7.412585267512178,8.632604749853703,3.425217927305957,6.999407527936636,4.644734014395009,6.76941434510913,2.528304276030142,6.215343200671015,6.283959218944655,0.28230796482011655,1.2750222830123414,8.259443070856792,9.959440605945264,9.95154680881159,1.0904581562257731,4.765533790760013,8.491506813464643,7.798072228008522,1.453126455619338,0.6288945331278151,7.6975468237997235,7.451593081270785,5.091354240591286,9.835060939036438,6.409467616458815,3.718281976704869,7.496971691667236,8.565300249053028,0.22438326381254647,9.562793924249428,7.494158669937059,2.33743728563931,3.0125467666513384,8.323696725401255,0.5260133322652294,7.660010088240989,1.1414156074788728,2.1068431649493746,0.20994307306987592,4.259240266554405,6.083986135638451,4.024444572635291,5.422691925531746,0.8717558549898996,3.315006655316304,7.058576770935878,0.0928854455449657,9.658347378362553,1.1955131260689256,7.482412092123408,3.0632068759682407,1.3413663084381633,3.53403548815421,0.7862115347469034,5.123715340622863,6.323954155383433,6.281507866043028,2.4516897519019443,5.564969483792773,9.775571972970681,7.48905097886329,3.817572170648895,1.2657177008851916,9.605654686114828,4.287343144586426,9.830335174760208,1.2270879025420878,8.956263991881578,2.14856086268981,5.451251178509164,3.8578213898686164,6.616161050763596,6.2760017220088855,7.4609210263399355,4.061014508208061,9.059033403752245,3.8753423920041596,8.72966615911071,7.114385473677296,7.914916746271787,7.501952460496888,5.3308189204191825,1.7137913553549566,8.314363237147989,0.780880388838241,3.7000299633703215,6.588918634352369,0.37256302248198425,6.117674787357474,8.265944797624897,8.56883723236761,0.2796121641306559,7.964844091358019,9.919395161027866,1.6166115066158415,1.9935329513217637,9.78130754088953,5.496477181531178,6.7862131168610285,5.645250481442625,2.062813060731663,2.1642425304685964,0.13838051486172898,4.445796835832643,9.971728429528085,2.3988970531536946,5.472598290465478,3.4123158868639103,8.41733734176169,5.608965011807944,0.5562390589290556,2.2157390601038207,7.11845505174762,5.986635179709074,9.2706110266754,2.0277195251886515,2.350548944880073,1.0511631723477266,9.097629216629159,8.248440194705635,4.97584341846456,2.319835666927119,6.83463192495207,2.246166660009674,7.832785486985379,8.890796505845167,9.74935521352569,4.66840857432179,6.986505656824676,2.6243345942589458,6.817803621097118,1.7643881223752222,7.195970423772717,2.767582431067912,1.3878383628907698,8.235551635913918,1.5782270895165662,2.8497083476445106,1.9107320183683907,5.109100986407384,2.401981404349236,4.2113098704803935,0.7965405987610064,2.813925824746497,0.6228527744401924,2.229349724000105,8.661629064191448,3.358558964734446,8.406506190023165,7.939209031769332,7.911514342195421,6.3289473240418985,3.2863741781987987,6.329504275476454,1.750887103426062,8.503425943476996,6.782057217557263,0.8001873387290837,6.825788501287842,5.10645869876546,6.209230204099445,4.2676597388921,7.239401865477253,1.6551822401807148,7.182533837401753,9.979014884279627,3.282655238642387,2.451912892370476,4.998138369949141,2.0232513428213172,7.135879861718255,0.6446061834249917,4.036769535595058,1.723950644870691,1.2246709878090511,5.5097467289031865,6.793767187921665,3.79903346030249,5.630071521111146,0.23541453461600303,4.038757453318111,4.611929230850407,7.460704611926934,3.9781259602366625,8.152427294450476,3.2976713488666043,4.489893562925644,3.9524461233069275,1.780307026293244,4.9131340617880825,9.082939942339095,8.177885186517704,1.1668449173786888,6.313128463297741,3.1245072461862455,7.864764549430654,2.785784987740345,0.3339104237306967,0.04563992541193995,4.650530113572029,0.6998253639649921,7.721013112662989,0.7208788681869938,1.3970716256265092,9.981730464391799,4.956843364996191,8.401947175036783,0.7349633961916124,3.0969156365863815,1.6925002976959935,4.260896502250806,0.42203993861698264,2.9962488904450257,0.6500001579160464,3.7690912998998605,8.897828902065282,0.4175571604276973,6.230594285959943,9.097087017525617,4.668025525516645,6.19993038225541,1.200725882583955,0.8541377787539228,7.823555372953763,4.677921858395653,2.6822344274079457,4.483750358519569,1.422391649793786,9.10682255749769,8.998164687353574,1.904462955267534,2.8097925295421144,2.700166239683628,7.475417940046521,0.150499151903436,1.7988866829523764,8.560452728866403,0.8459692603837143,4.499955636687827,4.29927134279926,7.887830462359718,9.843691881896476,4.956831549095169,3.89409643915559,8.771040591673447,3.2015221884059852,4.108257912558734,3.877544500607961,0.3521722935642768,1.617501623343649,1.8221024170147393,3.701875987692771,5.757009191211231,2.7495901227777653,8.805778296222853,0.021001035194825324,8.117354941308498,6.932887937082346,3.837022243832884,1.2236475598581764,5.570342783286377,5.720189993943443,6.142521252924295,3.8504921437341055,5.72801808479658,3.6892321885988233,4.528474139498422,7.441696789546828,1.8767797785260099,5.305566112038022,7.800489486036268,9.12957510006001,3.377649016198492,4.7894875874365805,6.5365529714164055,2.3600457311320633,0.349208459339021,1.591619561347939,7.705497159735984,7.305857362761499,8.995004242074472,5.321057928902537,9.757717842356428,6.493109360036183,8.721832597278283,2.0941375863384004,6.7309105304507,8.86936497094274,5.789158765422824,7.616837746850229,2.5567594406719563,8.265822348142944,3.6989497935425075,2.398072754322147,0.10074646237922646,3.3556230159166978,9.749933496694254,9.539997079174928,2.8556310614826885,8.044683311548402,7.484410402174859,1.0167279496822768,8.335581665300476,3.479198295678987,5.94219438621746,8.472141482910953,5.628748456695982,3.692482277289033,2.725081904148352,1.6426272292496558,1.1153310200002364,1.2383629680131314,6.480071650104973,9.61962826741106,9.793887164470323,9.574136689875875,3.2374503626676177,4.738965954111034,2.9528722530765505,9.144605933227048,1.01560965252951,8.810126950549162,9.722216229900607,9.59644009823304,1.4849258552851508,9.91404574960095,9.8889127730138,5.675020945681693,0.4470194190171628,8.488629548687019,1.7582299140193292,5.779977769606306,5.48886248972101,8.488155445379684,2.550451817922732,7.759294332132686,8.961996217119822,9.244628157705236,0.7534451344502591,8.451358867329555,3.780715540484856,7.667606218761504,9.534244634620233,2.7802445636997275,1.9768933439777703,5.858135379385101,9.005026700395868,0.32680520536185753,1.5965427909650698,4.712459486433145,6.2471322950606805,6.718072381805862,2.047770003764633,3.7462796287622058,0.3997764641211954,2.8585027657831863,4.008777057094419,3.1337234585423945,5.268438126364803,8.210353177106093,5.757261782563563,1.0822772833060368,9.181537716806316,5.3359976640397555,3.498215758960841,5.765809769878841,7.509449364872662,8.82586728247176,3.942833797552252,7.4329838461555315,0.7598612653034498,3.436065441570022,2.424877783814068,7.173033113231567,1.7699235359013876,9.049303186907187,0.05347610661111224,8.99567341976617,2.405328727584428,0.1327653934472517,0.8610245322771637,3.364019603008621,2.1746223961858324,4.8934826671907095,8.138394158693334,5.25394721246252,5.060822027271154,7.058611724519115,2.109318139688876,9.333782422198984,7.818385704919213,5.1774407208614,3.236114276589508,8.113052460426097,9.596099248650887,7.3425422471846495,8.931780844192694,4.657932178619739,9.99283340341066,1.8513074105453686,5.641739432117843,7.310924436109982,9.875203127796945,8.062337294373442,5.793225876177948,6.344744057060668,8.85827766430964,8.696498606987934,5.929989306850045,7.163866968080708,7.3223094298245,6.347855306601269,2.721170403652584,4.988330173737047,3.2783995656460485,4.215331388455105,7.439962714658666,6.108834456628149,3.3590591202235087,9.526362763349303,2.0440270973347596,3.526117577400978,2.2604399728637614,9.02099017540478,4.92970670520365,7.885981128973127,6.730158903930952,7.386859987381181,9.861779463828329,5.705090076788208,3.8061149066192645,8.356291535213371,4.796173893741398,1.9707985736011446,1.1091631397605606,3.6381524825428957,0.3776234403486889,5.637043091244768,7.468896230787809,0.049751360643577325,5.2893123541066505,9.298210981295426,8.706844526804407,1.076421745085514,4.825138974969452,3.764521613421652,2.239091036570009,8.023102516508779,6.748466990449606,4.41951291616467,8.209553929724752,5.075847923505887,4.547890893375623,0.8709288868842457,8.50982492974718,6.201919302340677,4.8524916757038845,1.1049079873986534,3.775941794620843,6.705119686438275,7.412677939306674,3.590880327483481,5.63161174234309,5.100289303696865,1.4214641941777773,2.3425412733789064,3.4169168365830993,0.19829548633193417,6.860849689649191,5.5142818613680085,2.2622094176348018,6.8887344168775115,7.707565870470936,5.530375028564634,6.087957186103379,0.8377814538571116,9.546013078983314,7.224576298518883,7.218037012968845,8.027608112713956,7.619046444450288,7.065498611509177,6.981212343884133,3.6993638291393727,3.1826239545474233,5.206079543405435,7.931072650997695,6.94687721069257,2.959151843055039,5.106985428399364,4.9083805448988365,6.346647377337289,3.8044228020735327,8.308979541068588,2.237692278697514,2.210972960003119,4.4148052783004115,4.2411564846607686,6.278622456623461,2.643463948324476,7.901329821300784,8.794001187031203,9.57900307200114,8.343201087042527,1.280516732040955,2.4715550792392715,2.952247352888404,3.632556289334965,2.138001575331263,7.711358373716262,0.7772207277802723,2.6139565235667295,5.74555964035568,8.995747928680027,6.517293480271487,8.874433634212888,6.271209153039729,9.936742609970459,6.964633899723307,3.6684871639434746,1.6335261680383728,1.8105300441364958,1.5147936916915583,3.6147686864738393,9.987878241115158,4.685616666265126,0.3300183860316519,7.152074935421702,4.48309920924337,8.15555079109944,8.340545856694295,9.008538360408453,4.4483174211932175,4.747064983246778,8.790689970853672,9.598608407142597,0.5163569908369103,0.7987820579440896,8.453050811809897,2.6142250026769442,0.025643513995514677,5.955149410587803,7.759072417378869,3.3281309155138583,6.787491950763358,4.774092667082388,2.6702457896364495,8.889755133104916,4.506773481194061,5.266941877166776,7.731274589348036,8.529182838384548,2.34415523116853,0.9449376140012289,2.5297133572342245,4.3227294573841135,1.2126139859885998,5.2075573795416386,4.690506597367483,7.2320426980389545,2.9506472558496943,6.013022450620856,6.560787444739824,9.23751250748541,8.625631746687167,7.172837392960824,7.848002015482393,8.921225380903973,6.524800557803545,3.50402862743175,5.286354576942449,6.557703146016387,0.2708138360984025,0.35669746107871214,2.3675746190674607,8.68246734170562,6.9129166309289865,9.163443645135164,2.0673105708772876,0.1306138220951425,3.1074256556447977,5.724559083544163,1.9500256058013332,1.55083521708969,7.935095099641202,9.16557213705018,6.352202161377784,3.9512059667416177,6.282283856347788,6.914444677598235,3.235723276594944,1.8658161030923037,2.7650496869391805,8.027038647574818,2.4905086525052456,3.1423163046269,8.986530327996515,9.905701305074519,2.377848445987776,9.718699979568846,2.5618674415804876,7.431422230110103,3.374278141828586,2.7713809778902543,6.179818878601003,0.6808155599250032,1.6380119375388857,6.7148578412022015,3.2657793478097386,5.467599032023789,6.869545626098303,6.446158247223652,8.54149075945415,9.739759119983804,9.949132441493498,9.265854957868346,1.7620573867241318,2.9138944260589783,0.30617588202381807,0.7397560986249019,3.2999074008152984,5.465397580571922,2.6542085110444513,1.9717121747490718,4.370776332664987,8.905538460781795,9.047630737561857,6.122214377759105,0.38719973744981706,4.440006166856754,2.8222981064259045,7.646485695921044],"x":[2.3685202909118077,4.239287275352894,0.9738399993712199,1.2104871313290078,2.652370664958493,3.636979557441432,0.8932481822347393,4.257806593086748,1.8776108692887272,4.215810363894014,4.101910112223047,2.029375514020104,4.571629139967178,2.3356623674460577,2.8783793196888507,3.2222157068345036,0.3907448022823168,3.702059354904692,3.0209781215788234,3.4034714303213254,3.699524354799447,2.04967650402054,2.391231401115701,0.7619391124620256,1.64751528878889,3.9024335200972224,3.307089865290773,2.8684209596185606,3.082699777244595,2.0462908136317726,0.20464883227700792,4.934852407948508,4.5202398970684925,0.903740541322422,1.129711844119471,1.0223187026649294,0.5659971921763729,1.5577855223903303,3.1769001319801173,0.5124735592313046,2.972974863163551,1.6518978527885975,1.916314944873898,3.142564646592408,4.283636451148988,0.23812057255251595,3.7024551484308454,2.473760142453135,2.954329480511398,4.755149895239429,1.6789226075878516,3.1468852748739007,4.13927728868944,0.31811976204366044,4.647735649640598,1.1947042332229418,2.4455355759123742,3.682991338032809,2.8513586483736555,3.995918296241757,2.3452129932802923,0.5933624591101061,4.962997250884679,0.5606014215092392,0.7211380680142299,3.519783350829103,4.368610318422573,4.364038621360403,4.837155582743863,1.1632047548557456,1.1931836881116076,1.0077822152243976,1.9593037178336359,1.777869917581949,1.1503532306272257,0.0810380172866032,4.655720916161536,3.4625750134689537,3.19684841660954,3.477066984182944,2.253962317128856,0.578480010227832,3.2377568031449155,0.6785589705521988,3.2275125699876406,3.2638418482619977,0.4665383315803229,1.064563237059054,1.0314830501396721,4.772824403095378,4.694589740511218,2.0006682853535915,0.6135214438884151,2.3608966472758777,1.4345205634334224,3.605371653342826,4.192280861659693,1.8830745946789418,2.1901089715288147,0.41466579174613716,0.6895218360721089,0.4221653920658508,4.704941733859852,0.8948835245746201,4.3644745034879175,2.5166198105137703,2.968995872354696,3.1736817577119867,0.46360854331876644,3.7833505870722006,1.8755229499518444,4.958987227238461,3.2237195948937467,3.9667755189154064,0.7120767196900168,4.182848528041978,4.6760401172040345,0.46174841158196256,0.8742463970295011,2.2699227307151473,1.8098487230272398,2.3524610496077036,1.2784371994676635,3.327503623392407,4.142820657747888,2.631104532476308,0.19726178165181407,2.3486926029157154,1.2713677356715825,2.4851282679659734,1.1715127693413596,2.8698464592817654,4.2737280999697616,4.3763434960644005,3.1565456025777925,3.4406653689298294,1.720131839372001,0.8391778562493446,0.7607495102292217,2.64121940420773,4.129746714566309,2.022897260358633,2.4502086810026382,3.1888430380997725,2.1148664780828574,3.2834293707283067,0.01028594584610687,1.4648781532435118,0.37425569667526193,4.182656706060351,1.173224508472328,0.8131668241230527,0.9765596961160317,1.9458215333151008,0.03988059218768103,0.6171825243844498,1.7407190032425324,2.6482459183592697,3.8811000530411075,1.157536016776518,2.3067879404017653,0.7581043234735685,2.4165969212514513,0.9136291265177376,3.504895963092285,1.8218323669637315,3.8564462641525123,1.3628743954043787,2.401080549261824,3.4030383548416623,4.096269874430721,0.31448303450595905,2.5759337580912565,3.3493445578706194,4.088470666721909,0.4719022878491752,1.0406365377293303,2.074642268126874,0.5838808565154574,2.489326907514812,0.3507810203780648,3.211471690170119,1.407437545561947,4.463977776669001,0.8951252293673961,1.9931530313405288,1.9809244016198846,0.42615844596839425,4.296810081105828,4.1006754893784905,0.14339829205898602,4.506495515638285,1.2221558279842926,2.790952856972365,3.5343931689952726,4.445906713116427,3.69036455161568,3.9390259431764885,4.445948219747931,4.27671288712018,1.9127020195243305,3.761081332360443,0.14527538549597985,0.9176335805490654,2.676939867288053,0.03157210669250565,1.626161996530866,0.5133508120395913,1.535489781870678,4.69156680037536,2.1279548116451554,2.7149481609644175,1.33584661012063,4.293323586955311,4.001733182260242,2.6387015420226243,0.5327260528313504,4.7437563883544875,2.191619646804682,0.7381355505520804,3.5041583593354164,4.324613648531156,0.9628510487758324,3.4145242462117977,3.085212958230019,4.240641051901413,1.5693137839275728,0.41114231524170375,2.753451320291843,2.3152039619544396,3.6902972823067506,1.390629201982041,2.0593636459902767,0.2021802383780169,0.9073552082833969,1.7370137120562668,0.985762208142078,3.604655418052509,0.10406936126949318,1.465588561243566,3.0054652025034576,0.9155045296503583,2.940782221646999,0.2860678864423083,4.17596592139586,0.27619660972720506,0.007286332706462062,0.1057991032229122,1.4268343710134879,1.8548483825015583,2.299000176657211,0.5354548744369159,1.3502895459412567,4.791185543358502,2.1747216514995316,3.4824123097194604,1.3680268239278992,4.619103811761008,1.5335184687790204,4.227113860251512,1.7500363837359545,2.4900815342050264,3.0593261831033827,3.5901562425069713,3.287167203208581,2.4425823189567133,1.0259561817732654,1.9288225762106492,2.3005263554394375,1.3921096796240429,0.5038696304455847,0.3901396197580509,3.818293203577061,3.212931589570606,2.6242037281543995,1.3407710685833418,4.441167007581815,3.676814083484319,4.429290380940378,4.417541544827323,2.421759599075682,1.2741263939697034,0.4938356200733729,0.950442935166117,4.193976061967026,1.7683244999125003,1.3928114454208085,0.7377674161459669,3.087164874823073,1.1535417621977562,2.694685659251771,1.0542295657137235,3.500298273412066,0.07488453285731667,2.2505498612091257,4.638338699422894,2.74846659101605,4.155332045161986,0.4922103412283585,0.972706473759769,1.171408475332174,2.463490923243896,2.623000364213505,1.693556173356946,1.9426492335376044,3.0453952854448216,3.6040038724622034,4.321671682392479,0.264601062342662,1.9383459290666993,1.342788671581815,4.918061972836912,1.535391138381379,4.081077551822581,0.20595086464605838,2.152409953751646,1.0903485366360843,2.9788269661617983,0.5825985540669654,0.06568470180550734,1.8372135019066171,0.3103671754462012,1.9757909241960825,2.337682304900924,4.448501714691318,2.389989078319524,3.2365247901252547,1.5995694951248574,4.417679716301305,2.0886723355660153,1.7301061735346857,1.108392104601209,2.8667428896563276,2.6947765287924828,4.895176247388434,1.7287205438301634,4.034465473224602,2.890595222601322,4.235405720428012,0.705159997422693,2.503577967885594,1.4482898582612214,0.9926200995713585,4.180522795043289,2.9142144193070596,1.5483618489878193,0.8508966360280334,2.8504823276669597,3.009794940967211,1.8286633317093326,0.24003730540224422,4.106453373875914,0.14841083141128086,4.592578771666091,0.10525032462302408,0.7717820902751926,4.301310768102176,1.4278897048987182,1.195316010388866,0.3497081963623394,0.7286116939495235,4.729757683206612,2.570549557730306,0.44221939640627816,0.31076141795004175,3.554994899420796,2.235959156030628,3.838254077967181,2.291579479050494,1.782816764548183,2.8244444108491598,2.35817973448184,2.259957860336389,2.224529663835113,0.17708252636016275,0.00946066542614532,2.741410292039358,2.6482259582973144,4.566374262323556,1.868266822085296,0.9040592737636188,0.9984045905414018,1.0775877310515414,0.923882442374393,4.51825511677608,4.040389751840625,0.3476350589310573,3.396184629332711,0.4931754673571198,0.23239660987357635,2.1662473145690875,2.544185541608859,1.9263781813718717,1.4567745668343968,3.4234410486835176,2.089043189102963,0.5728386886271708,3.417241647391378,3.148529835080518,1.6234040299906594,0.5817498356416728,2.8651460395086237,0.49688308088365774,4.125238502405402,2.592637922472356,4.804371696007043,1.5929778455541566,2.836713070389141,1.7426858777259757,4.91886690883919,4.090120398454865,2.725223151560201,3.898576816286119,4.47232063732843,4.860249350219772,2.400259528727827,3.2657239655595416,4.811486140738307,1.5398369120342181,0.9867092429882351,1.8727244072089178,2.771857619355634,2.2031898404505967,0.765175307313517,3.4322760223587903,0.4948417752549561,0.7845910742366746,0.010684295913611086,1.3022631837755916,0.383300659670448,0.8178637850656745,3.181024122024546,1.7829592853111331,2.081907764791968,4.840734802925224,0.49194637195222435,0.27796744294533715,4.341154470708038,3.7263428663701683,0.6714637857132111,0.3383907858245849,4.300261612067038,2.8097800294552986,0.15777813940054508,2.4148939892302987,1.263872912279611,0.805866779168718,1.4281885155044471,4.547156592093985,2.095894387468932,4.368801310211347,2.7852867638245824,0.704180786942401,2.2901377764038555,4.016366064600447,3.5056897256159427,2.935170701688122,0.9805194639870585,1.7033770754568234,0.5743462065689819,0.6898578172325376,0.968390806950491,3.1709056256146404,3.318425379156996,4.319972345353184,1.8136925777781476,4.3184332684877615,2.4538637258603426,4.304495415783519,1.412021749793596,4.146638415816558,1.9054561283658167,3.1219176075971413,4.077800949217481,0.21007119198879431,1.2085212713129223,3.912246934516903,3.682006662709638,4.889182019155271,2.0425891436854093,2.8056616774809715,4.451276782717692,1.3674991002236137,1.6982561477916247,4.482712070840066,3.0363193466902985,4.4239284853224845,1.7228431390601318,4.501620649195315,3.8528495239942973,3.865752503853259,0.809555565904293,1.6259132812539012,4.4678521024181,4.884131986685858,0.6672215056818531,0.7780009221993056,4.771954354020669,4.3274155736271345,1.2277717552474265,3.3037503437584617,1.3331272467102528,3.155319446338205,4.595042844886149,0.9571473762202343,4.2080476912059,2.0658005004162696,1.3155006201278663,4.777901902939751,3.347981690059573,0.22697081213477577,1.2138790528457344,4.707739382400956,2.36705880176183,3.7375799372717475,4.0963612718488305,4.129604842407115,1.0675526316552286,2.4641383205174163,3.9438906600244916,1.255350543838547,3.163054204486595,1.8756061377622057,4.974740029211652,0.9208994382215452,2.4305379180505406,3.7237847212356323,4.597701283524719,2.368518735055881,3.119305097334768,0.15207606067385582,4.343408958309806,2.060682149344364,1.7463570171338327,2.059581525015428,1.1153523410496935,4.08039162467412,2.3142910123846674,3.0627823751194914,0.01255185170512152,3.675782137375424,3.276127117009132,3.20284503781334,2.641489058942448,0.753556056676129,4.5341124260492025,1.211940359511775,1.7506680119147622,4.094012578388362,0.23650226232376337,2.850413125133189,0.8889732074587187,3.669412979136477,2.120699807820942,3.220884741829737,4.668265364555923,0.989839181335086,4.292958701665368,4.416486106164052,2.2912670667013257,0.25367793325394516,1.2889795243791657,4.1361802007484485,1.1564661410828403,0.7831461531217132,0.22223431279868588,4.6628218321925194,3.370437589379586,2.691886589928858,3.9291687045667523,1.5978892350295681,1.548932670843175,0.17653807390216048,3.1817737399494472,1.8509155093718743,1.9799905245984761,3.522979577939495,1.5095896719013324,4.9241368149427345,2.432059972786489,1.2022765207591268,4.809641816172379,3.4257139510067947,2.957266568721766,0.7086630504994118,1.3034755580715751,1.1885323300089534,2.6962689066166243,2.7786420440273085,1.4990348333456727,2.19119589464749,2.10914385174764,2.3578357541779615,3.0862122258172455,0.9474567918241927,3.8888390024937056,4.436143132521826,0.8888800419698117,1.408175100168585,1.0274392229839169,2.4706439767006327,0.22988232563657118,0.03560156619019206,0.7903763266827235,1.0207159396818943,4.0256572621223565,2.7083050955742225,4.765466809547709,0.0013021569876936478,1.217433182890798,2.6954837356793604,2.996674822778136,1.3376273022830942,3.6051520087241418,0.48674069396479336,3.8374203558364552,0.09390441937186744,1.1335379102338072,3.6387347998415622,1.0199863291061062,1.011950405308476,4.777682686655402,1.697005021641781,1.470638972080488,4.658915047028246,3.2710806256974956,4.658076097124859,0.41310008854460456,1.9517318997762445,0.22775959760005682,4.22488126692263,2.982100906513274,4.3664360854261055,3.2961335979532205,1.4784816561743563,0.4190499920548796,2.879718769234094,3.848467711097714,1.9645117535778267,3.9628884690581643,4.961724747396134,0.8921245450734605,3.7720140576784864,1.3704268189221536,2.0587011097476173,4.0134493932753745,0.249038304477589,3.9556835414282556,4.1830291363498,3.548519926316996,1.0009415985230297,0.677918344381695,4.167113868817598,1.1581995089716102,4.0392915217719025,0.2034344654467357,2.677616774665481,3.2176535721963937,4.17185476493601,3.789527305398166,4.6533311924524305,0.20422788007891435,1.2254991022369643,0.19661148519115268,3.0877592503082307,0.17372404314476286,4.9185137024927865,3.16803248396191,0.8171648278343602,4.800259093483906,4.047808965070522,1.6073430735973093,3.3322071089459246,2.9359060052976673,2.0454773410604545,3.2574936713324956,4.00410917490511,0.4162421027928953,3.1541510952254272,1.16092014084334,0.9861917618162575,3.6041517283103386,3.7191943984144373,2.931666280638612,3.2791973648906305,3.0937100370801716,1.9266068961395466,0.2861889181365618,0.8646675994782616,4.419419002925206,2.7943541275308634,1.1794728641080798,4.602619903002059,0.05395324619285269,4.08423666166187,0.4424150384056691,1.233666929893723,4.113843982002203,4.28704523656978,1.6545856281271332,3.9794201551633526,3.785498204307731,2.3687067315949353,2.806560800179163,2.944516456150814,4.746976916267363,4.327320873611038,2.1456085420384863,4.613206783451731,3.670919243653916,0.1320192186463287,2.8250733267352093,0.4341233858011717,2.1711589534662226,0.5164288255151439,0.001469589706646346,0.8652913753016467,3.6927074910239743,0.8840555660943394,2.2021247820404555,0.24327343685563996,4.081987663959728,4.744546691763697,4.225018370931512,1.9996813805422575,0.8854992663269989,3.278227837854213,2.2044026969996655,2.8195016504678883,2.5659878863346606,1.2748550919959356,0.6957411283975723,0.5774076632542358,4.813255174270795,0.2218419021316309,1.4855673173056416,0.6670361471510533,1.2113898838917114,3.2391576343241812,3.0304332732709516,4.294009010119351,1.0718626361746708,1.7823468454314406,4.959368500957697,3.225409466564929,1.8797704979065832,1.761011772750185,0.6656663036586874,2.425684384849651,2.950989249569793,0.6933177172490868,3.572795138337237,4.164345198581047,1.1087709402910806,4.730243220288926,1.2024908641685494,4.275933189237895,2.615537394139823,3.768159094424226,0.5798606933641903,2.1573287393078386,2.4829437309896116,4.003836195877007,4.85295042238425,1.9942079434359206,2.6370020486898014,0.35998408983199615,0.7233103803387297,3.040281868081618,2.6771295755190048,1.4510735382915718,0.02981587618797188,0.4653611134294888,2.7489196756332044,3.1370710903966117,2.082006313573199,2.2009604557144655,0.7437878624310945,0.8839355054579268,0.6114417063800615,1.411865731569234,1.040776598156059,2.85516427368223,2.3150866087345867,4.675001467587441,2.9197462258519025,1.4425937939018074,0.01149581067441785,3.444620394624913,3.5506500995353862,2.797773223714813,2.0635916940181733,1.7035579595652262,4.690352746915566,0.26547649971786713,3.055873589893837,4.32422725032835,1.2974959061567426,1.2225164190555493,4.675825900882751,4.9799639692954045,4.042168360579589,4.968634631479802,0.518503000545536,3.8568841628974084,2.13352257819854,2.2740029720832853,0.7241193164867477,0.17533264464585585,2.4953402550491766,3.955716234877965,0.3167959258908526,2.2227041741885447,1.4044236071618132,2.514339067366306,4.237886046628249,3.8812974928576183,0.4295758720494114,2.934612175961141,1.986802517056323,2.679110280665331,2.5725255890145204,4.476138284618028,0.8658896106482961,0.8587804193690651,1.5506435966016274,3.514180753123023,2.652890816787287,0.5363113752561266,0.6731865895441402,2.573349496569408,0.8513228925359095,1.1795991281760076,1.375649169430655,1.0181934698930817,0.8903354179573064,0.07521831032074489,0.690250531123584,1.1256548140810896,2.1811692227629687,4.335337411803987,4.895807284710695,4.742711145064355,2.579334712542228,1.336732623628324,0.352021383958091,1.1627212976281553,2.0950412522147532,4.995859242984622,0.2557836934444935,0.2819418085084813,3.638007923323634,0.66573985204612,4.191918810034474,0.9746312381628497,1.09530916211112,2.26906659233038,1.4608040767770003,2.029532153305124,3.1065022595735337,0.4540351705305645,4.498833754335716,4.233043452913378,4.641758353542061,4.606019341756799,3.0741650638529783,0.262207982778504,1.548200450829852,2.9221608588812753,4.445862111458539,2.2764814958918276,1.6227014593993028,4.415484161563001,0.2988517104408961,0.5297079470765409,3.6954719831378657,2.433001733119944,3.5386289501617307,4.117424180337022,4.871729411301683,0.11835470845422136,2.045379248805003,3.448416360902945,0.00847495450972846,0.5205266306711787,4.404459975798555,2.8532333898602946,0.06767591843872989,1.1315196163132368,0.08061033633344872,1.3931841669790757,0.2991170933216025,4.249137377500709,3.535998507409206,0.8627829983108048,2.048794864335802,0.2894440837584489,1.9492826251945294,2.4767853665104966,2.1893522855010596,3.7852653157300598,3.9320782980913926,0.1751158501609773,2.189142143169751,4.265195660314239,2.978960845459755,2.403798200824674,0.2635361340721831,1.6568549826228263,1.433853234602196,0.7427683589807799,3.487895380651752,4.238202550886367,1.58535385148744,2.103587693469949,3.356484755592566,1.296757363550265,1.971688115259671,4.679348488800948,3.401044673152356,2.2471471125027365,2.0839410801312153,3.9163189472748194,1.5883119225130082,3.621237969618586,3.1137549239063613,1.7822894323897331,3.5167392913507847,2.12871619780979,1.784543941288137,4.536778795367259,4.61746247973946,0.8795882752506823,2.0189233976445387,1.7856155950347852,4.362734999396504,2.756143398895307,0.4664910754551077,2.1471326308142666,2.000498248554625,3.9440299098247222,1.7901904683597902,2.3347661879114368,4.607040873517894,4.61839861395532,4.293579119615927,4.082374291270851,1.2772776636591776,3.7364675469545725,4.974619990479686,0.5673388604800755,1.663045978672023,1.5612757605449212,0.059752203990822705,3.86402175157438,4.3381063532368405,2.160545079264875,3.121126683218458,4.991699069402574,1.3379912519315051,4.588780374332289,0.3057202214620758,4.468906843897702,0.9845309509522704,3.768835719563163,0.07216156467969026,1.4263220735786797,4.707544365106314,4.917437409462542,3.515996607661961,2.8226527981526917,1.421422123612428,0.3848330679799705,1.6764684066288515,3.2708388421549426,4.959904119606938,3.138848407112902,0.9875425847053698,3.01712376178226,0.1448480761058557,4.548157046009193,4.08788651222202,3.16039605632168,2.8069514441615864,2.281869073439453,4.267163389536261,1.5545025703918658,4.882650349851785,2.2556756131497444,0.08298463132357381,3.861963727002169,4.538070920516583,0.11444905052032883,1.8495087897708717,1.9904904417413316,3.356680078555354,4.886131597053708,4.810092713393621,2.352156099273178,4.660449696210414],"beta":[12.474886509594107,14.558089367803005,16.758838280483545,12.305564628815633,12.431391363343096,10.400077979331817,14.229524075754085,19.994901719408055,13.169945187843693,19.29602834483032,11.234329666783564,14.756051697030959,16.144170935422274,10.696799962274813,10.22188057667583,11.411410321774024,10.312369948512234,17.0544956899268,12.114037458676275,18.377112307888677,10.760304130002979,17.990050053828824,17.65786457143598,17.51223642501534,14.676567529835324,19.34921675824853,11.047269800964292,13.074870431001726,15.513493993785488,11.874767599283281,19.2069449657866,15.341410661923614,18.10188994535707,15.144774497570236,16.043954369188107,12.350200399447216,12.617212969528957,12.94230385424031,13.546103291945158,19.302364128048893,17.3764735191872,18.105221604224003,17.673682076469664,19.12453945208657,10.09239339832905,18.96000876937128,19.498683270613228,11.72981711244265,18.658641137036902,15.332524554800539,18.715121239761256,18.83786721969512,18.739777555798707,13.203531954991995,13.142624875424442,18.49037615904357,15.152765396858412,12.180210789400201,13.477156911178538,10.589384493892668,12.583777739270573,19.509945033101534,13.18247283624878,18.722634363516313,11.227355724859589,11.777432934170225,15.927443348715453,10.894474193006221,18.590546841287967,14.058383450211613,10.084189613621003,17.296069360644317,15.105612230457774,12.495133016136563,12.472418743328355,15.851693885513614,19.903807243350457,13.528247770894463,14.423493062254478,10.546692335765567,11.300219114433105,19.321931098456055,19.093230857432093,12.99990667399436,11.336399431841588,13.66287285974624,10.601133736996676,14.125946205254403,12.503700545103133,12.24644520913213,10.069746091060075,16.746978801932524,16.089951347683073,12.912472993256134,15.18886764214159,15.375128668115003,11.079314023731413,12.134601484482257,13.168053697260998,19.22070840850189,13.572906792857912,12.72114142039904,19.031614368510468,11.660029580111377,10.051465973180655,13.40461521555153,17.976444953708473,11.96656205118237,18.42804068707341,16.03096684955014,15.504354263022218,14.958350328134165,10.359733767912978,10.359151941095202,15.923608394364123,11.480317515820797,13.993386100939084,12.317148522178316,17.77236024689435,17.008682049608332,15.374538786610135,15.62615677821501,17.663424637157604,18.487598339254316,17.259457828735734,11.401915725941294,11.414615943936655,13.273811713276121,14.879551214744712,17.713532431517223,10.319143313073662,15.488871377451387,11.123763836369234,11.577551121687979,11.275416534042684,18.81098537354732,17.298911373325048,17.15271679607435,18.56418588660656,19.487815555160395,13.03939925967404,16.86775739942885,19.53014295838586,12.840177764388654,17.16571886223177,10.720804825167063,15.213818266969039,12.647978272006231,19.04948625264624,12.277240122776822,14.502815127504235,13.008279085909098,11.596254197087264,15.86111752939016,19.43046625349265,15.46965542305216,15.48508964370141,19.191201165754173,16.23077933179559,11.06771935589773,14.782890910784914,16.91728055395555,18.733285449286676,14.83761227774615,18.684680557454623,11.101290939705306,10.43079994078417,17.00467219392761,14.8158227366034,19.20335304078304,13.918498300679094,18.504095614914004,18.673874329931103,10.42177328255746,15.790808538456286,14.960570538218024,11.421948330723573,13.85905357857566,17.155521490096667,17.581454154020513,13.782621697829818,13.418909785192,15.547661870993652,12.411186728497475,13.568829751057471,17.446976688455358,12.911098874398107,15.22588044527672,13.471618258592367,11.499663315863167,10.523282234686018,17.865912902302863,13.483878048347755,15.909807609060332,14.115584663736884,17.014646986930593,17.72629640987478,16.996590067208516,13.948470845227344,14.178944037844827,13.851686502410757,17.75975588224156,19.654027372441085,10.57398686318885,15.542370450314154,13.690795027496165,15.797991365533319,10.608229637022216,17.764380976289097,14.956080151860512,12.162010697339731,14.61517128456517,17.764677922229268,11.01134024322722,12.822628052485856,15.749870609086617,15.103879874046314,18.865710112952492,10.998687337714006,18.959358240392913,11.302862693719483,18.99644408616545,14.543676424675223,17.900095956853065,18.043495534250603,15.2264430363774,10.323610472768816,14.614563036291306,17.959155316418055,11.05119651883208,12.952954098234866,12.575979181780411,13.863183330159263,18.201296477246988,14.857063874147263,18.111571334414542,13.08114999962749,15.636874475854452,14.8095356865459,16.24740195507768,11.558894235749651,11.32442012608518,15.496435599250844,17.635499224320686,16.76685228256413,16.70527068043817,12.577787676780893,15.104107573909083,14.282395566909926,16.70213920614087,14.33903068596985,11.646903673966554,10.45816856621695,12.072054767373078,12.735687331057846,13.781945016244224,12.23800354337699,12.177483227007876,13.333719044344491,18.479963991083046,17.12711560410444,19.75163688950272,15.322873392797563,17.302001772714284,14.671159078561054,10.37062541006872,19.353742191951902,19.37919752238341,19.19852680667902,14.577643522272488,10.210665741029752,14.217950659349597,10.870094175044894,19.414984779023285,10.064753957904733,17.93212481916371,19.1303325871928,15.3529313569081,13.138686310983704,13.303139542738984,16.024310981984325,13.209336925524447,12.21439410831312,16.26694993468963,18.93997098275091,18.057543478847684,12.71601587302106,10.56061513979439,14.439561980956238,19.82497230536167,15.822432326914521,16.17346227700137,19.080780324028375,16.90565363239373,12.918878264009743,13.719908464846837,13.700032088662963,10.905478673392324,14.259706927526762,11.160758360917962,19.44644550825176,17.244369116344842,14.879802331175675,15.506544139943717,14.361163399692744,17.002588750222696,17.016675439232383,15.275062502410215,12.736963056949836,12.86947424824913,18.62429477227805,19.843753263107526,12.152144432823098,16.880858899606608,19.796896199307,19.949105380794016,19.385001364910636,11.445371328325674,19.25189511211717,14.919779745583783,19.357173671007622,14.693304300715225,17.817856118541386,17.124697458348013,11.362366240872282,18.314579308548886,18.52517961501143,13.078493128048986,15.286679138385235,15.530014907940027,13.881123536440212,18.64893485785948,12.63015908479203,17.795471092944105,10.211814599321109,15.16274142888828,12.788056688712764,17.00008902598169,18.722173285914263,11.17034602150936,18.47811142435338,18.02621627158181,12.33057685890681,14.53821743866855,11.700949265127484,12.083707267896202,18.29230512082638,18.00068378785423,19.17642022568843,16.904007228089043,10.142788996822741,13.96651342905246,19.791353249890488,14.285067997752915,13.51792894709475,18.677646222318184,18.427302524490234,16.344694666352417,17.760556394685125,16.18545968608744,19.794018281793857,16.45292961007293,17.797263629893145,10.426719582462205,17.90914271155113,15.487351470947486,15.518471879882096,15.647013621316248,13.962539412315058,10.842096044891036,10.868585013977812,14.313355487425154,17.822283822976797,10.974738182311718,13.739450122941717,16.14011402361031,13.14419778441776,19.336687861026665,15.631998543852754,17.96256071294606,11.920001513461614,16.39635011741168,10.427021568191757,17.523465500728562,18.464384100776275,19.18130007352262,15.129503304724993,11.839238883541901,12.596611655402228,15.561518867427623,12.449001003501968,12.044287245411965,18.998747240485034,18.842694263201075,11.214408263649421,13.03162559560455,16.66175430780827,13.157276194768698,13.013257416832285,17.593301659531896,18.776525136534566,16.40534992548521,16.832460498899252,18.06276541048559,17.561582333581732,13.486880659380155,15.657726992674764,14.233546894823785,16.861950351688073,15.81874218857565,19.073832763054774,17.299133445955764,11.72863146777696,15.451170229464706,14.01668787481794,17.419012949365708,16.41911101586148,13.707403797191606,19.08420781713819,19.11604696727342,18.761472823429905,16.068726042359,18.03113375147463,11.128800864103594,16.5675165775108,14.636983580699034,17.23331078312132,17.83307620847372,16.165148479700875,17.076396396972847,16.554501201481944,11.875624688296549,18.449713579282403,18.463725765992464,11.32731844591227,18.93418839827479,17.344647609388915,15.238187248601523,19.970484706824784,17.396804030434048,15.935704866524997,19.395812301555964,13.380629473260901,15.43256372751302,10.488977898133935,18.43408861207675,17.30438051663299,13.090112957020143,19.618867314974473,15.702042752688234,13.471736044809736,11.242588115316572,17.694607717442988,19.54723511730814,19.53456561918105,11.492539925940143,14.54611316668105,12.59669076087453,10.869294061754536,14.623579483255762,17.582859134998117,11.218303547995648,11.407963332908588,10.580247786137463,11.0198795829736,12.258324488231075,14.84427186192547,12.530212745042782,12.071834881534876,11.19153888762824,16.757761899414476,19.08088244900878,14.823022130311049,11.569539734843161,17.552653829625317,17.820117083049375,16.584744986567628,16.346129625564082,13.52133271207187,12.696129990249425,14.644788252351507,14.500761413012357,11.856588598102242,12.393754882825386,18.324050278588498,14.100452577893474,13.208945857668535,18.923208035504135,18.989434748015874,19.303407013926808,19.799396111189623,19.506733372108748,19.021818255111924,16.217755505130867,11.964934718576913,16.239218435283775,12.238778368040702,12.678718251041893,14.380170772175005,10.333764616785864,10.101684837644054,12.58928679213762,10.537262418367048,17.02259273949508,15.44789489305911,11.763389039282817,14.325664775435584,12.7325376985684,13.578655609866153,13.228089856274956,16.247090027070527,12.132045085568812,15.376052371939608,10.505281094724886,19.5083383900074,14.985918605578934,19.090251234207322,15.62313920943345,11.25116612431518,13.478525650908589,19.398081548192042,15.133215878771615,12.89658395982886,11.863678966459268,14.610594238737207,19.007218308451815,18.395150007381602,10.101081722170203,15.840388114486553,13.037334219412923,10.148612537369274,17.05390283774454,17.593599968308137,17.307787689926577,16.7082620241005,18.68738781618922,10.124497503234602,16.402658077735545,15.508034567108178,18.80356646829396,12.068861743603224,17.593075543034416,15.115542171341737,19.877917195521214,19.565739043810595,12.665516230442124,18.23816582015573,10.089673036708227,14.203214306229563,16.782797075330542,17.641612896801416,19.333925884535162,19.764822325566264,13.654517329368831,15.642555396855112,18.098521008559644,15.308824263120151,12.901480093611045,15.093907842275854,10.334267823323609,15.651266207842871,14.03625725890664,12.797782100879306,15.427665798337259,12.528734006483017,18.672839424415635,16.78228330039183,13.887413983390516,17.62391591840959,12.823239914348312,15.106708864800142,10.625353660167313,14.993084704450613,14.994476004839193,17.363736802120176,15.14316435899979,10.960931574327956,12.694410540185377,16.889741626515733,11.106799814355348,11.234234242446528,13.894332169113712,15.590378941510037,17.361057887593674,18.27498867192201,12.439711452393746,11.359868906944872,19.171185681718036,18.93416371002522,11.470371718127655,13.50830332103796,14.842506166292093,11.624719367256125,10.743056263899076,11.152342597818318,18.648645522450742,10.270284458484333,16.79770055007079,11.024831303988055,16.370197158070262,12.031482576709484,17.44487721189338,17.8491006360392,15.153178943512554,16.503188983208524,13.021116610032731,11.881896895679628,15.343042427996851,16.37537973429057,19.053619983813665,12.459681612155187,17.73298442760329,15.69912152999198,12.52724011877948,10.42785804926745,10.850083966836994,11.716335552430007,10.483238812238966,15.872945665368555,12.344398275058154,16.897498151858784,19.26361069967642,13.379757658672178,10.272371060624117,14.667481445778046,18.55578271586559,16.90199189898853,14.48683789430098,18.538484753221432,19.854304139979995,18.709527873258406,15.20490141864687,12.34602729939877,14.87148037687035,15.760706425189369,18.340335630510033,11.556493459068825,10.358487929418427,13.998245171687667,12.677568103940898,19.786710452536994,14.484196292699,16.772528906233738,10.582361457435297,14.453576869640548,16.835193409983297,15.568950613388104,11.970921197321045,10.351886700584947,19.91111895766487,15.646454864460594,18.5233986709397,13.514656690785271,10.885319279456171,12.265154834477798,17.76295564762167,17.683531220322635,12.288824344695294,17.140565611924174,10.557136306201354,13.78350994483152,10.346643517589909,12.475464650136626,18.16864661045628,10.668979553389333,11.874075612230255,17.339308759343382,10.89355206957984,15.019157846434041,15.95580026866222,16.17499750224369,17.854955479863378,18.47220198205241,13.413254245089183,12.814437934789806,17.382276492585277,10.34281734773543,11.371970203050981,13.164673339531204,19.361828531663846,10.363591586567482,15.084481955366595,13.366728591731308,12.999352898667023,15.657010553590037,13.188401929000165,17.22566759633693,18.646441767582985,13.510121890151519,14.18432722004885,11.795879829875275,16.489655085773883,13.370001800451663,19.900142772744758,13.362901629825581,14.561984584293112,14.47794202964862,19.304831511245688,11.900077140986907,16.49925812133567,17.743494230579493,13.007050485720946,17.253503276839524,12.484060312178155,19.69612031123089,18.27564424090217,19.62699923350705,19.77847691974123,16.221725219110162,16.137354705587285,14.228226213523998,10.559211316235926,18.29442697624805,10.962745368140006,11.663342179495066,12.704523491316497,14.105438823674428,17.60131394273632,13.502838770790618,16.517139959697822,10.29349200873913,15.722519157067225,16.23203465195901,15.35679021175564,16.244023232445425,13.997603738463408,18.61059739048169,18.83608546738649,10.605229263433957,12.000625033552392,16.21556754378546,17.97370928642871,12.858176772627326,18.62434967524389,17.094111891770517,17.74265903414169,13.497820805753378,15.154153810242349,11.353729175064418,10.94856860286914,18.913490472637882,13.07963388308449,16.7364917453868,16.926323153230772,10.891755376492782,17.286458868031552,11.223962299006702,14.854264148149364,19.421913543367182,13.850104137676453,12.246031791145553,17.682077230415906,16.046494893348044,14.703925279154248,17.402921574310568,13.187252145598151,19.1684283559671,12.651211729067837,13.294041193942576,19.82662927020482,12.667817457159238,17.185401512389245,11.08070823136309,10.912759933230076,19.012663867714487,11.461198618659996,11.001039723445816,18.02054173254782,19.593991832263306,13.39404926100542,17.785472377798754,12.670928239192369,10.000940266326332,18.218025170469414,10.40707567052239,18.626136807697073,15.607222506900886,12.679550907650519,10.95798850370013,17.836800028298285,15.673965838445778,18.0616177273466,18.44808670717037,19.784350698434984,19.142955367498878,16.802975517720462,18.00485261560228,11.637525993080896,18.314102474438027,13.241843554524559,10.580538449255016,14.472770335478398,19.956300081769328,14.30044297205475,19.062509227707356,16.968588070196056,11.943337914229,11.490063980245884,16.13990248484671,18.187946374504218,12.28778272414819,10.231528705231195,18.286056777462516,17.0000456048799,18.706343269018866,18.146761880770992,12.972665944991169,15.536919512081987,11.11992522833427,12.769179713547402,17.867211937972577,12.510083172253026,15.262197271289931,10.329445597032434,13.382565900432938,19.26511688915371,16.13151213326919,13.812304202898812,17.591553848818627,17.11352728060928,19.567233429898014,11.143312749821794,10.51727195899243,14.522768633191351,17.25170486331827,14.160594434584937,18.201459116096828,17.762478338446705,13.528168804119062,17.602214497539965,18.12519162848009,11.325949080670512,18.19237293953242,10.140419264484814,12.817325819983337,12.536756086596224,11.67363290250143,16.852358027057484,10.107108877074445,11.97671274509172,16.893075562360785,11.958765006113,19.56173990953495,15.14630198181101,11.948147970085639,10.703646649462994,10.195853571367488,14.779402524269184,17.18195698793582,13.092728993436072,11.828948348846568,11.458056694710404,15.713324414009103,14.426114751604524,11.91294043806398,11.73338083908722,18.258062083870172,19.693497590929873,11.484486200652732,10.949322144372628,14.08663473467358,15.89292730778469,11.829182986359825,11.542180800681443,19.294327345134548,17.322192585361023,10.708251673965115,17.926322930551926,18.685135174906627,14.588314051863517,13.023127970564301,16.805637908751823,18.444943022767,11.514201140695754,14.68895930239444,15.056514469435928,13.318832349004792,19.58744963665459,15.166068011513616,14.704631082076354,19.404282452214296,17.807201704950504,19.538813684941132,13.939296047369108,11.256681635914877,12.101144939390306,11.46695918522433,16.3089152619186,10.059856828448092,11.485965638676085,15.333799593554101,10.951598761383558,11.58067530388994,13.827136628402247,16.761631893670728,17.53550749162718,14.92081555982314,17.141182068038564,13.934537147999077,13.94902585500174,17.19363285462726,16.859115017086374,14.020448391152573,15.851456879230861,16.337499009293357,10.40807863431234,14.027693907127059,13.528479144725306,11.504365844920132,16.649555240342416,14.050791896180066,13.918269321819576,19.022924682391793,12.275370104488623,16.585007967761648,10.513266646933577,16.519307540625086,10.97080185494179,13.329947464358886,18.131343307463368,10.453386276181574,11.040529399857704,11.346697548406127,10.089740362976906,14.185771574630637,16.39834947936803,18.72392391411344,19.25112467725319,16.88836763714182,12.791524993284835,17.028770378406538,15.908554067279368,15.187684435197173,14.74243683370952,12.820127230981155,14.339694884265388,11.885784975359254,15.003671501275047,16.40012719251775,10.866423624046082,12.674400051758694,14.33387061061131,10.776537810460635,16.424299082788547,12.973407744769357,17.104470654878202,10.67700847948829,19.380106701902676,18.932177031941134,18.849556441871172,17.96192905840107,11.377145128074934,15.93002833820124,11.439550297047232,11.674892228686225,15.010784069413987,17.013161037309782,12.917001568271044,10.505029435309687,14.830070411357356,18.282027778706514,14.560985272397248,16.583265679575945,12.887503143875598,10.765329657875025,14.515113095481968,11.640734256368193,11.749335117511484,10.030424010848902,17.461842790428967,14.190769707671002,14.620231139609833,16.084830804839484,17.7265531167467,14.960238247705046,19.107529359164594,11.563914555469108,11.43337506985018,12.300818952097748,11.72465612287115,14.921871692573898,14.562223168698276,16.553619272404426,14.850901888324248,14.149931631416575,14.976485263014945,12.098450656871567,18.283740771434722,12.55357724569035,17.055568077334637,10.612809345780894,12.295196322036334,10.660991677975865,12.479381705492631,14.043083840818058,17.893809657547695,14.510606213031407,19.890172668099197,10.05566859625024,11.886509640898124]}
},{}],48:[function(require,module,exports){
module.exports={"expected":[-27.890556473429438,-24.877882643195704,-3.7905278214603646,-39.26168285923148,0.06066773868288955,-29.409685794116378,-19.38650588087347,-58.98968577460656,-22.091090511794498,-2.106202421584846,-2.267742847005641,-9.533202063075123,-1.4213292498499142,-17.876556899984713,-15.361246706861449,-14.89210064817991,-21.749918869840524,-10.404730410663069,-59.605944904887984,-0.029257720820169197,-5.4981848583354775,-5.387295441644034,-6.68690136136902,-15.202955632837234,-32.505723352029385,-26.987932154632365,-12.237663922811228,-15.90986143856692,-35.79591658305045,-3.5119784651783066,-18.69312349642827,-7.536821410563415,-7.457906949071259,-0.45201546204681264,-0.8813999815079328,-7.343190428847028,-16.378370148955874,-14.905468118978268,2.728041504007072,-25.110443621530262,-20.49322343725654,-35.268273757957836,1.3169966374929274,-12.086550637635947,-28.62289730616389,-28.348400578826052,-2.9622538250892934,-12.708300796512045,-33.254370519611925,-7.5239843488273985,-0.37182924720596233,-3.3479837669925265,-12.949155257310371,-8.429403066091133,0.900949954858703,-30.898994497095067,-22.019965789279027,-44.80339830401325,-15.636793861720863,-15.796365483230877,-51.027787249563474,-21.21147218305887,-8.539630133684792,-86.90390069082319,-14.094433385875217,-21.988890985896905,-78.11957793629317,-38.21114345736618,1.2444744410288067,-19.193452742370994,-4.401546611893736,-14.890504167109704,-27.393168189760807,-33.752555394010294,-31.080273696686458,-19.951651417823086,-9.564384264326248,-26.92924729203365,-17.103633696872826,-9.12592656205759,-13.796863986904606,-42.695693931968805,-21.043697795270543,-52.73527276488756,-17.044762330585137,-50.1632667462813,-15.56020423673904,-9.619629135213579,1.2277387534536182,-16.49928444323402,-5.835818530100447,-9.71848167300688,-7.15789753671458,-9.298063651040318,-7.868868806203288,-23.323343912020242,-26.997177491031064,-56.333103491002994,1.2398988074764397,-11.24451729393581,-13.892343151248882,-33.50949931192333,-48.07464156502986,-16.410833360889374,-0.39844173851269105,-23.7244781601979,-2.5009239507581986,-13.862103623275841,1.1483563691158558,-10.19207149732414,-18.148962175114903,-18.198929477599705,-2.78067006227041,-11.969349314199398,-3.7968831156524177,-16.969198331279646,-49.97731511314779,-55.106262482257485,-27.035664136023787,-15.07756254008261,-4.8215526167460325,-34.11989120412157,-49.28436757192811,-36.67047732605318,-46.31187254407198,-20.34304479197397,-30.53359143286287,-33.38020098123883,-40.9261844958148,-7.752310455586764,-23.18564608590619,-21.997325603389775,-51.320765120328446,-24.425878951455626,-2.818555117183024,-44.85260256646763,-11.260535731045902,-7.922553760797371,2.06795050617532,-18.240386300680008,-19.890050015758153,-25.25933944503411,-2.3581055641650153,-9.800358246893476,-19.555634295315677,2.2490207560324027,-74.89572197414542,-6.473096926188324,-25.710045928066112,-13.080469219925163,-47.20487505966867,-6.475185435901809,1.3240783785776635,-30.107112927317196,-1.2086570168181794,-41.56871718582419,-3.1565990993042767,-20.40024277910101,-29.20258355904947,-43.894332487628795,-17.111920915947096,-9.118713301346736,-13.07052149198663,-19.40912986493863,-24.795241262262508,-10.68369019402561,-9.920481358898215,-11.309552684393942,-10.561497973734223,-15.870506332294983,-56.77731326138961,-24.016448669791103,-16.83411878027436,-12.574895184081072,-43.310252866063735,-27.49701782819838,-24.75011192667292,-7.941862032824983,-28.020454939370893,-12.893842773029395,1.3658615110055656,-10.884010807220953,-35.349736384864826,-21.470487190554355,-6.057640366011647,-5.539834199430211,-22.97065154551974,-62.70821556455771,-19.431186838060825,-24.492430002319658,-15.888203673407265,0.028519850646915756,-24.81357331699064,-56.98757334744393,-23.0983986538743,-50.012207007948895,-30.624309351204666,-27.797519598362875,-15.474312815557488,1.1225713848477845,-47.51465246954041,-25.74059043441146,-19.40978488552724,0.857125715028733,-41.52314769576826,-22.605293922679984,-7.639884167232925,0.41056054402314857,-8.22294760300423,-24.892897513611818,-4.665980494860367,-16.503135228592896,1.524849129550807,-10.236044648940844,-35.79621340458516,-43.59988934307362,-7.714026355114788,-45.268725491853246,-4.092553997023176,-49.22059265505167,-8.356926182151796,-7.827998873687525,-3.5713165440801773,0.17070859283727735,-10.18285031763654,-77.0159178846412,-46.1844597885007,-40.45107075565855,-37.864970153390075,-12.412201393498508,-12.492140099469653,-13.814061662664184,-20.736953626842674,0.13273132716412306,-61.44809067935338,-30.693508955204557,-1.5332803361697245,-8.553534211826136,-13.606569638746656,-21.992028026902776,0.9714855740859143,-452.1827585529184,-33.432256738194795,-35.659636988086284,0.45392230768412034,-13.639088061746737,-4.548231948178356,-52.422585453274,-1.039841329693207,-26.889829517434233,-5.628275635970449,-2.1237498139744737,-26.143857242242714,-48.33486643647824,-13.360134124896936,-56.053167585651146,-37.26489013694694,-31.511107697022897,-17.53370597811447,-27.748967432143615,-23.798631747901823,-50.965119553851245,-8.340519953686034,-40.80187093027104,-49.40854517864417,-28.70376982770004,-20.776881890325896,-5.204076357505389,0.2534983247622975,-17.36443301523661,-7.4186066542996585,-26.313966400725388,-0.8474852706233271,-32.94335560684245,-8.775941268179832,-0.8168596852904422,-37.686734726448314,-9.487127961781033,-7.615327383246088,-24.268318378536176,-16.164007519318172,-70.3273416267781,-14.333282131205623,-21.584651058807296,1.1681587061307042,-22.631992748137232,-24.314831862662164,-22.859310451734377,-34.879468686307604,-31.76453481780972,1.8497041090979778,-13.670195450084162,-5.20448307008153,-32.48842233650563,-107.0229096050154,-1.1056194199549587,0.7925905029259219,-47.54374822255386,-8.356397804226846,-4.477835413989733,-22.9082753395773,-36.28963885032934,-53.92396421121734,-12.322516265156382,-5.134364323467572,-50.78490279858709,-18.064798285710275,-8.071608487028428,-45.78414008348324,-0.2744085905902285,-19.794300762975265,-37.26462827404065,-20.141134903325877,-13.00667217554949,-31.77682121848335,-11.1560021980209,-30.001085643553484,-10.92240345590558,-5.321451153029824,-12.475922661893343,-3.527718708424654,0.036835433246878324,-20.226968551479153,-21.916440251419992,-26.690460708646775,-104.70616528482424,-22.754350055169198,-38.255965754842265,-38.893992406577844,-22.073342541917476,-44.501572335604116,-8.799472545998825,-38.05810304465985,-20.535900287036092,-11.815988167792085,-59.29225745245183,-9.60764540267384,-10.924184755950614,-42.22801967346541,-52.62748032544474,-6.141710107111184,-18.632793052773465,0.3924643547168323,-37.05671751364808,-30.428774438786547,-26.94818851511985,-25.577133818762352,-14.639445260169662,-1.759708803250688,-1.3821614417871508,-14.911488966985235,-27.66697855638614,-14.533278286161977,-9.229047672361622,-24.787521818150836,-0.04300359901778883,-167.76132756244698,-7.670255032389466,-32.21443605566732,-0.33072864574085337,0.08957003144989262,-12.847553905575136,-19.649529848821842,-3.920420863021323,-5.453827439021962,1.2286245637600857,-8.405080687011708,-12.06449809775438,-18.673316267682583,-13.470068410148219,-35.63427325051871,-14.726500253036896,-19.97086927506887,-27.73326839601663,-12.084798084769135,-30.797713855001078,-16.26103508288669,-38.893481716355346,1.9602030593846358,-18.38167409674036,-18.45044728995287,-29.407346223813082,-13.791615292251281,-31.900929572409275,-16.700706344568147,-8.342295127758186,-5.1916029475499865,-67.14914835738603,-32.236050699370836,-16.884317703026202,-4.275080922152125,-14.350465597992944,-13.707036952269176,-5.073036996071772,-2.849869647898217,-23.830296485549823,-141.46316250996495,1.942523502997652,-41.698125066705636,-17.834764557421714,-18.12409692188958,0.3451115867539869,-54.998407728723706,-31.216539765244335,-123.46716777515005,-28.245308910766102,-18.388492781022663,-69.78531757728419,-33.62195138283913,-31.302052515049244,0.7804897726419142,-36.31501350670919,-17.544251803171452,-3.6480897639118357,-49.26554123029129,-57.929022379196766,-38.828882247436525,-8.69358623905973,-1.5825994289374323,-17.277245478092723,-46.3982808866453,-12.85308224155736,-17.3410887470601,-2.2635680771198263,-11.428202833788468,-16.79475711939936,-33.89575346727299,-18.84648809958191,-20.497455225743284,-4.907797476410439,-23.811888471838177,-59.85218473947405,-14.845436949949695,-23.183388169076256,-10.862177053140318,-71.08736487205636,-18.555325229906913,-5.213025201043567,-29.266946838424907,-5.855099255430777,1.453422381116102,-14.234602951502774,-42.779347269418395,-22.329795113929034,-9.399967170561002,-55.590715403764435,-21.34568269435935,-12.99240528662817,-21.712434415115208,-46.812305196938574,-19.124326755636837,-12.089412908929352,-39.103336691955285,-33.9033861160218,-45.57418384165747,-20.298565802710687,-35.751462173143516,-12.429244549587429,-28.092723751335704,-74.22911802840731,-45.63325477546011,-0.8664264679838602,-10.215806525388333,-1.0465038266146731,-0.15743914828097605,-29.942614653133273,-5.701152217384805,-12.752355163625174,-20.777961857046968,-7.62845242146359,-15.20312706205198,-2.5981863283313356,-28.493892689476098,-9.770270453311717,-26.54305090133309,1.4997795050164022,-44.98828788642916,-30.709721973459544,-17.39089150086584,0.9626020465133927,-7.313400392484009,-26.11134831606497,-3.650996143988686,0.717223908587437,-11.594057002606085,-26.32719604292343,-11.873326924713055,-33.240450991455674,-13.026009810211281,-23.521586627835415,-4.894937479741399,-21.02406375823623,-11.170806223494269,-8.644106265658543,-12.748789446130242,-0.5189673532368868,-8.508702955200727,-21.20579662535119,-18.54133776509156,-15.927030894397834,-45.389312731784656,-16.33423295213667,-17.425416549797024,-39.11674324300698,-58.934854049446336,-7.0243652790256235,-37.6558602307606,-6.945536315084434,-19.661797129532882,-10.865001072583995,-42.24638623510892,-18.819237396782995,-46.20140506304597,-16.851284546793018,-29.55219300877628,-16.305535476773628,-14.43741842077608,-11.277649313214042,-14.644167737050369,-14.636837728087013,-19.86528726833333,-30.9232990965634,-13.270818545012485,-12.213671675832158,-10.547241793720232,-6.205077869084314,-6.1936744747287,-4.892544295217483,-15.192698980381362,-16.347317713269874,-14.816208334710376,-8.882265585922777,-28.70309672541855,-12.556524664485245,-10.940059459001137,-0.018341549467775664,-10.71680125101608,-16.792990519056826,-5.479161198655318,-49.7669333547346,-0.2776042090570989,-18.79196170582602,-5.195840625219546,0.8461344514900269,-4.427539819065373,-11.98093692416651,-43.86925701432772,-3.29602275974884,-42.25073275146867,-48.4875820412295,-9.585248296639502,-36.64031522004843,-6.004860369694041,-6.827738500109751,-3.6838538601218267,-5.098013916598869,-24.323124988425942,-2.457161533290516,-19.138410170267132,-8.205868880174386,-15.63708707029425,-40.65718236434478,-44.45046731063172,-10.94612944814277,-16.52651911532159,-19.464621440700377,-11.937257131630219,-10.04118967036204,-24.08698947308878,-17.108174953746165,-17.003715994877577,-4.033190515758922,-8.267135218618186,-15.701419382883252,-16.61743293347669,-13.705466016954752,-5.610698879665399,-15.500844940125015,-27.1736902626572,-15.183831261942629,-46.28743869281949,-71.36325405394672,-27.87961460326751,-46.16364336906545,0.7163606296995901,-20.03007952852912,-3.7857179370583287,-21.981479192279973,-53.80820978165641,-17.61839032389293,-1.7094423195714725,-13.844129877176528,-22.401346381928278,-39.31880304096481,-0.16770601118676964,-36.50355172833673,-0.019558907004324055,-39.0279358298945,-15.717430977531325,-2.9924111299398817,-45.17074682395023,-26.362779853565073,-16.8626914918877,-33.95942058865946,-20.283520787733057,-5.558388414335486,-24.640363520965757,-15.43027518813025,-45.6471772273293,-59.5490838857295,-18.25778820367203,-8.09747700492359,-71.24028835592654,-2.2285205247220503,-10.137860545692508,-15.808612677751709,-24.989384074981448,-5.6331483314243656,-8.329706659973805,-22.573588821647906,-10.098028301232988,-15.4144847536503,-14.335759103117251,-26.991579600311148,-41.83443932406776,-36.38180953276347,-13.821601489000333,-21.437111765276878,-17.362569921701894,-10.151469090275137,-21.313904626818456,0.988185233520916,0.7210147229405486,-1.2894203611545194,1.3462469731165392,-35.65533494791489,-33.31945495815888,-20.22907507831177,-41.66991394826965,-21.277191184522113,-10.711715133141345,-6.902005266758074,-13.28247376190429,-2.686169181677797,-2.806996476391472,-46.05212380260099,-35.16014139488501,-32.059823046608734,-45.849114967688884,1.3944367034553604,-14.279986745182441,-48.87546127943358,-5.248887726117669,-12.865212189292066,-24.043732193437066,-13.809044265807042,-10.147308740491919,-17.45091605243614,-3.321330353952537,-7.538941182183128,-36.48857961701256,-15.235940597048605,-8.437649173696443,0.37748920297218014,-63.56409197078133,-15.764467675066571,-17.68711281733549,-13.668669883599993,-27.812368122007662,-2.2843125624103306,-57.75278342679461,-8.013056189631559,-38.13079639526669,-53.624062152211415,-9.122930483141843,-13.828100662915794,-22.031090679835167,-36.75605986055319,-21.78679518674043,0.2538496414062674,-15.05005817830758,-22.064304430157975,-2.944974649914689,-19.462177356980416,0.3921036048640154,-37.681370760912905,-18.213321113146865,-17.543918164505474,-14.533669827664376,-14.868729015253669,-73.83377920401526,-30.113225505557647,1.4928812285722088,-83.54214894301859,-9.449846032819593,-42.145662883944965,-5.825796756498679,-31.5516805886058,-15.468193370263574,-25.019484405391655,1.07621169741968,-36.80917177496858,-20.850193851386003,-119.85424316100456,-28.334159361708984,-6.839175767979314,-6.0960512844783965,-27.004571914634194,-26.02109011382436,-0.7622292687764789,0.3921958252335127,-34.62500950084255,-8.597217361456401,-12.738498388474,-15.257849057818607,-28.09345508505617,-60.81968958092846,-5.89517868206275,-18.562968617053567,-1.025457293106177,-12.427297135187661,-9.293114318284271,-49.35712196934214,-51.864613810906725,-43.69349881294157,-10.305956287968137,-10.68510479035221,-1.010471286525644,-15.299122077560959,-15.651227577305614,-23.824108827806597,-10.888253879838906,-3.9846352497560167,-23.999081094288186,-45.57016102143287,-10.973767671545831,-5.237519815317328,-38.98980957524202,-14.206590825131288,-30.675127723391704,-10.019714361766447,-7.7063501154331595,-48.7065360018917,-9.433154739904248,-0.013531034694560518,-57.398402452562436,-9.170981231272187,-60.62546631861103,-37.73044832792798,-29.16498071764084,0.6779462380194587,-58.75580340779965,-2.108056873527766,-11.058879865020266,-35.212160976585984,-32.594343634604385,-2.0828813187438335,-11.003785674721184,-34.361300110539275,-17.570417688663554,-24.33620439087824,-29.221088032444623,-15.421282912493,2.0659118854965826,-6.874969807295185,-39.77875174503551,-7.073434510037725,-26.357571265876974,-32.00287159518363,-8.123225705475399,-43.20522871938407,-13.141115241998005,-13.755688196798037,-21.591142052834776,-28.983379177705338,-10.003250540650761,-38.88159711062848,-41.58157574956055,-50.64292475069936,-29.258012530038314,-22.741290212958155,-34.28726616154414,-15.269280503374226,-15.030074572392023,-13.298457911448322,-40.276142268189496,-38.763879689516166,-20.332801585669923,-23.258866942414244,-0.8479332251736054,-39.51254997175312,-44.297267677050925,-3.291884842271312,-29.386526953017096,-24.908375895833036,-6.216333941456551,-20.1723042348952,-17.35061022392451,-39.94532378653017,-11.991101402906041,-23.244522528188412,-11.836290200059091,-11.020585498054338,-28.553927301006436,-16.416072175579437,-35.83755289752734,1.4638125877983015,-31.218358605815613,-16.09922713996048,-26.414277492463356,-20.65372024846117,-22.023711088618544,-8.363141241034128,-2.465547646468977,-2.7427332450757564,-10.500175200347359,-19.964025872308877,-57.926014299083235,-24.233985486772568,-23.231649029104176,-11.323002430218263,-5.083994581290453,-42.98554412252925,1.0684470726988184,-0.07629316776571482,-21.617454518574572,-40.60165194844037,-19.714026331276425,-10.693598522822995,-38.132517655726005,-23.61592543549717,-29.508718048460786,-11.743123536285722,-21.990080475269338,-6.675172532724541,-0.449686191474326,-6.014164635203098,-2.368976277672615,-32.572954526658485,-41.7277137427556,-17.084639099247386,1.4442910660092778,-22.400224329158178,-124.92162565689316,-132.94037632217254,-11.568886304566796,0.7456190116684418,-38.78147301002403,-15.583924289255382,-21.03871461874563,-8.930438213452817,-15.563074117401351,-8.68754814862021,-6.643508890704146,-40.79748662394494,0.05464254059737783,-17.791105428076524,-24.727157000780828,-24.319902639141297,-23.152556938251127,-9.04114426674127,-9.191691516332275,-26.993802385507614,-7.609688460695226,0.4282208744186917,-4.175694109886386,-42.62977854996872,0.3973872481956562,-20.807735775131576,-21.085584538356983,-25.972794886692316,-20.885818819489778,-11.750709601735892,-35.89108482751454,0.28449729452055905,-19.649345348061154,-19.092665720744353,-11.960690310423091,-55.258485399765156,-37.11180224068142,-158.26048119818336,-59.613239666715835,-2.2465526058717495,-69.32840316172978,-94.18180931014126,-9.682927251471675,-3.9916679696746558,-0.8326795211917588,-6.8387659096485525,-18.627967812423147,0.7015171583353474,-18.815407732128524,-28.785114123328935,-27.067845095444248,-3.9036934666558176,-14.906705412418292,-8.982049540743692,-10.01665612238347,-11.288229240483235,-10.773969747913338,-21.345411545739204,-25.876202130382634,-19.33185374332782,-18.71281721419224,-4.573621496206119,-31.167688102585238,-3.512975021252137,-9.712420819574223,-37.61616382122229,-37.65424158870697,-10.933037846251437,-28.02180241240555,-7.309416765338161,-9.396497402015127,0.46892597505413036,-55.53192221769099,-18.210358125551835,-8.246605578308543,-17.482202938900343,-25.149737947112797,-11.776923305758288,-26.34156832827285,-41.55334736627019,-23.857033524394563,-12.689206350120624,-5.474018619330754,-18.824351225153876,0.2079278942632854,-63.96581527188223,-16.60910008576366,-6.747848341487487,-7.188712681338667,-16.923781900928603,-17.91065699687035,-24.970634139645615,-21.96179372420358,-7.069574277565515,-10.226669527109053,-17.786796207587322,-8.714248307304253,-23.370219076053065,-9.328973873443449,-32.57868447140108,-26.48774592242441,-11.355698105606553,-14.088393846049986,-10.444154973665329,-22.514863076434537,-8.552106166940057,-13.101140494450823,-18.917305055005357,-16.44135401484995,-33.92503990567208,-7.7455894119875115,-38.81380276685342,-75.9582066165749,0.35263577976655824,-0.6591900289547077,-20.049717073945875,-5.3800263552946745,-23.359065207883074,-11.878243111884558,-11.445982934089223,-19.755084490118726,-54.57191170778078,-20.688226859623267,-13.62966437281181,-30.81088236996941,-15.234678076919637,-12.418357394481175,-75.80990944078151,-11.065368425925442,-24.888928660005945,-19.854232099596764,-13.764763107873186,-28.90040734034897,-17.766030770849685,-0.7347027184585819,-35.25175167492468,-15.686091276180171,-14.66287345240481,-32.254565281835646,-15.11683440341766,-10.019817636354965,1.7028631588379959,-40.52466533665385,-27.765261647743017,-11.289585922442665,-50.46487055368598,-8.104063959643137,-66.57044086979974,-17.51711613569118,-28.448042257196217,-2.2605505302274382,-26.786562701688094,-14.419324156334504,-18.859111132360823,-11.156239298485852,-34.464446906118845,-5.348639097346557],"alpha":[15.697407393027742,18.102093245506055,10.676729751028615,15.973119822839081,15.020393073600797,16.745211541934683,11.64260007709587,17.19404794282516,14.440145591089234,15.432375376853875,16.726684492215764,14.095717939269786,11.871872383674223,19.370826670599296,13.869989607311108,10.35974322086937,15.09149196001437,10.2470642177428,13.513887816647706,17.844124909563362,10.10428549606289,16.31320517541289,14.042253782743625,19.550988028704403,17.068061912145907,17.76068191386371,10.769238849819454,10.520081389918026,11.204986010283168,17.77605362195131,16.37679592995908,13.359810610729301,15.89585512303376,15.750294872528013,13.522528480482233,14.424581168558891,11.476082686377833,12.639917192788541,11.873648772326895,13.054519154338651,15.522994498250963,14.490274618551222,17.60091236352618,12.320885058054628,19.931872656950567,14.02289527582723,15.541896282598795,10.205279329699277,14.282391497074503,12.001349904395628,17.586815831302474,11.423947205678552,11.994459296050435,16.80669851358294,16.092699328765843,12.664114882563336,14.014522173523279,14.350488594243256,11.562120138381752,18.69153439445402,11.244274349039763,14.90140175354611,12.757365188433704,18.380431364712464,16.709845008653243,18.067923965844592,15.617953891807439,19.777456600003227,11.64045669729235,17.589786527626117,18.196736545216446,13.656558110139613,17.850012155886432,19.53643874000734,18.996681902687314,19.74038255714386,10.751997471484882,14.813527360693302,15.621338218305013,11.57905240120084,10.038436374386666,18.007949362111688,14.210584819425616,17.7420165570439,12.989924422467249,18.932726170218608,15.834247795169627,16.964172552396892,19.239205720357262,18.785556368326333,12.31532546304248,10.634487925576817,11.268114479267616,14.756356229879689,14.798852247101745,18.67709243131636,16.37511895242471,18.875038819292804,18.61126966861423,10.667449757161464,12.582784383135351,13.195406565236903,17.949186158971614,17.995981722348418,13.169334401032831,12.542432549800681,12.009796602180254,12.297518557826898,14.288958727848565,14.153342571650537,13.412153469676873,10.708070801545267,10.033846594998035,14.248617336487758,11.097673948227744,14.107016855456786,15.348535658026933,15.140830050824777,14.808891171137743,18.06962013301422,10.116933824648813,13.851974899984894,18.255464786645778,18.6042051859752,17.369527859868413,11.143011476155332,18.102975125606527,15.251977735395204,17.68542751517415,14.360734884112613,12.53282579558106,16.516111750246452,11.621748823347254,10.610810435640348,14.289679167294642,16.34344170773517,13.00947037548755,17.007881216944742,13.336692999402665,14.612158043268861,16.130277621073887,16.63908660949006,12.114011799150692,16.636861897328778,12.144068212961452,17.155891534801185,18.691057649816393,14.759584576839718,17.373944488951775,10.153690068477438,18.703603697189518,10.080612176341221,19.995880238617335,14.097735323933303,16.17605286049601,13.388221294063115,13.022008334582413,19.506976208253914,13.682911254212017,12.043231919860865,12.893170390730358,19.2019055591321,11.654167682452453,10.754710573549882,17.019762324170458,18.78965610793416,10.248611401406901,10.9945336197644,11.476764550986637,13.806994933639988,14.012931122762547,19.661737560473135,14.332960161015185,18.254622104630663,10.613645107529885,18.901954893892157,19.87717891588095,10.720586379783585,17.164053789458585,11.96071193016233,14.381729491685356,16.059805599555222,17.390540173431575,12.278565677769336,19.486126433999107,16.77961360000902,11.20697120537275,13.51189912123505,17.651891144180887,18.333248022058868,15.447065889271592,16.367816470166137,19.799874299679942,17.031191074977663,10.558586882172627,17.517440575688106,14.151948313548438,13.661829077555863,18.5854771510648,17.400070958258766,12.482893271872506,15.654163816808994,10.052958889349409,17.570234425376192,13.131023646890158,13.171222372852274,17.80746133662366,15.573131386260282,19.388858959130765,15.780743367904371,14.398616047687877,15.13415052872249,12.136364179544232,14.682277646516638,16.835176168211625,11.963955991861226,14.536842510157388,19.016325635058227,10.044210648281759,11.037455008086432,11.39151742449059,13.950494305967315,15.585240327032501,10.860394111053001,10.736620990506553,19.042112386215692,13.08750294285137,13.63234484609414,17.691931808427807,10.060155661073749,14.434734146242905,18.651242987777245,18.063326373408366,11.910320680988331,17.55860795979486,10.407550832872483,19.71901264281179,16.532396387468484,13.993775680853735,11.725470302410809,13.151227509723167,14.017723444452281,13.77871042563315,16.361628640980637,10.992507603543785,12.191862289761676,17.839167370478908,16.770624520286304,10.86098877668865,11.221680067065584,13.23022966435504,16.254128252873958,12.57741639111281,10.525384133073054,16.030008159050936,17.391096341928723,18.31108972144447,17.802316320647456,15.859397023583526,19.22768136870765,13.112017524511803,18.48955244516845,10.493358724022116,17.184542201666684,18.59232515664027,14.496983602040887,15.064898973195088,11.330696444555135,14.16680888379138,18.3305726319757,18.326978001951176,18.61858909908434,13.877595175377905,11.794570332360351,18.76241567364611,12.848676461973312,14.673191712963494,14.787401797012429,10.095201960646383,17.887694480565557,12.485035889706877,10.440486787821023,10.501573542832203,10.560642633045196,17.91026361977191,11.613845643257928,16.218328539761313,13.197072993478365,17.656294946182925,18.084671432038544,15.612912365020437,18.77503228691804,12.278938347260276,19.43840096888366,15.380822984322789,12.529478471623538,16.08626788110714,16.074262134202804,12.559068504028259,13.591357275979437,16.203892808121267,16.822667923583978,17.77534850086723,12.5042719173918,11.79268496162334,14.882303975194251,11.302397232877935,18.917571742797513,19.405832723806704,17.55154331366754,15.900230617533722,14.256851302385327,16.155923176677028,14.64246615261229,19.10751428301085,16.059693397190728,10.394305923920236,10.62359124493308,15.398399106925055,13.288271587255329,14.74536491100084,13.437694304853153,19.782806027843243,17.67377680690774,13.080528942437283,19.494737838886607,13.300040328122043,11.454135198231157,15.572363433147935,18.771823118257302,12.497675590407304,16.059601931625025,12.888591656053494,14.014548485370089,17.312769891543546,15.722116191104213,10.789883367071532,12.276355842644344,15.046539780917293,17.054544768366355,12.021756175866045,16.32858726259485,12.11672487862205,13.816564389298588,18.93438916065418,18.66939340558008,10.03020898394334,13.63319173122018,10.043678494306187,16.651510024524082,10.514841102585626,18.622215330307668,11.5510901966236,16.617821925131143,17.86706020186691,19.783356668969528,18.699715086117443,13.32262369291966,19.870876878638782,16.26224855584171,10.331255501213143,13.260308557349187,16.685607406261134,19.345561581933396,12.54152741169442,14.410704060718105,16.57271716873839,16.378487990863327,14.48918133608519,17.025280082839743,18.277272975697514,15.146588205457077,11.460793995532546,19.21074926913637,11.502549174924866,15.48996058855527,19.188191375121292,19.670390638466912,16.183920944052335,15.759359631216174,14.461140100361744,12.89104848545014,15.845874571605393,13.293829848028833,12.606963344859249,13.619806262016308,10.546507215408168,16.21979134508575,10.81354824527251,14.15150318104575,12.627774488427512,18.864112442735276,12.91626006174484,11.473817655398191,17.269217972123812,18.9958412282059,16.98926389121111,15.877663606915863,13.927595056887593,15.496889295108476,18.573373545958862,11.867130352660862,19.288679053909295,19.03309386414375,16.944586800876316,19.331776946746423,18.51121004432874,19.94424671107526,17.195133549088414,14.040675245412299,15.247639081050545,19.62657730658129,18.904174251396412,10.10983420445636,15.393968397223198,19.003565639827425,18.081566015628603,19.038295670606473,15.23404708898461,13.220175260562039,16.305869257754225,16.356249857126706,13.574825296702372,15.878272174457422,17.26900089993824,17.166550759123005,13.168471450929566,16.06649995639659,19.499659457781974,19.141903399301246,19.71262374234626,15.214866628632066,10.95275311388397,11.754111077909517,15.93948158258032,19.38805010348838,17.15107641179312,11.94603664809322,17.484317661680294,11.350924849066686,17.138635750842898,14.481995194958197,13.342409717908847,12.717399918315458,10.192194491257737,17.016621740346146,16.943019480146674,17.013718120565635,16.310890974312965,10.61320442869134,11.886567231971322,12.29962859092736,13.283486934206085,18.90587224021379,17.14819589497056,12.889146949947927,10.236238311303227,10.758349242201433,19.20706909164697,16.66302310508563,18.038376922074125,12.434287865718346,15.717950766383531,11.690901274544798,11.633765451156943,14.696780678086313,12.300950081367201,13.341986870000218,15.661993566600895,11.126342614693478,15.24069377399931,11.799562789845869,19.36015193697441,15.3593732303409,17.266351550347373,16.45631167519871,16.671296276602,19.940443330333306,12.097891068302104,14.549613505224348,16.234940908941134,13.20191415922334,14.6689651892852,16.962548077965273,15.480970993661225,15.71913262800095,15.951930499686833,14.863436379872983,10.78902863894406,17.783338372492814,15.820269915451119,19.10827753575132,10.237224108301731,17.42340844702167,12.719388053727283,11.690025249188615,13.907424557124044,18.157876889095334,11.188339551266617,17.453487463144818,18.80090824361833,12.310919773661162,15.697716693228879,16.548408999837932,17.401162257052142,11.02078309205816,11.870032451411296,10.555084743783802,16.264017689061383,15.705482833788661,17.35194574516198,15.916247483568178,16.365491308494057,15.127618371774972,14.549456692053575,18.70297416887148,10.715996296859188,14.71310489228932,12.449641758321464,19.820167153972278,13.079050109561372,17.494030698497724,14.622791077206905,10.029249208388295,12.559833312584141,16.40684803399046,19.211855951669076,13.005387911028858,15.725820998279856,19.007798144257407,11.931154106955763,10.147972727558107,13.023714474911788,10.173184698860931,12.025684811912672,14.631765260636882,13.758339648626542,11.352782347858527,15.955030307549077,13.75773829536454,11.568268615558356,14.99266645463091,11.181032886824514,17.0417547126084,12.038258444733778,10.478358966821641,15.817607965328877,10.3827464730272,18.634031480080324,14.968256239572034,14.472216344011402,10.136040297444946,10.550619406737521,11.066372111760803,15.454968624812846,14.384820358993082,15.946755450225346,13.261551799529983,12.001562186665408,18.26521355368521,16.425421242693837,15.999062031189053,15.120311655065294,18.029963129982214,10.222038296788991,14.66977598459163,13.217321653217127,11.25561592308573,13.149939921324163,12.752208162905417,10.393206746929915,11.857146769391251,17.27020070518243,11.356409990345988,18.537157784261364,12.005931946509493,12.225624475658519,10.647578563517822,19.145564735294364,19.955255809303367,17.97226285031266,17.7189163519402,18.329620763509062,18.063242851222235,10.828688547193433,19.224084654210547,13.593122425344868,16.17631627250942,19.69702408252183,11.154034075416181,19.043964785455678,16.36674725912657,15.328097248689833,15.256834012157885,16.080470510968983,13.326520776125765,10.627821919390101,12.523557244212874,14.396701579315863,19.517075369605323,11.771414343850623,15.045379225320284,12.304449301117167,15.1618705561552,14.526309313165411,10.487425722846462,19.49946962074498,15.04320231163047,17.307083866715146,12.030709871180257,16.933609874829585,10.497261459338155,14.002746479852824,18.994852194713626,11.115197306770119,10.47957277130714,18.480441851653104,14.630337115438168,10.251204067612615,12.873412738088284,14.045680530380258,13.661479543103074,14.121952587582598,16.05437169687246,13.501849232557232,17.835427498194562,12.872123993155885,18.04357488958754,15.536407206660108,10.668749942140739,17.55331070353609,16.225713229350912,13.524659678361093,14.275726407543008,11.758160777930796,17.82065419477493,11.437834316909177,14.015172001449283,18.460950999053008,17.997609390677983,11.551119576256315,15.694771860941072,12.889074797253727,13.664512415453505,13.149491089814818,15.08369605651743,15.358199154013937,15.621621812232796,16.032420371408683,16.309818413418725,12.629036901177674,16.71825723379694,11.355166899876934,16.000642671354413,19.49002436536152,10.396316737215363,10.436990166465407,10.835122741138637,16.61585246560376,12.865756895120487,16.678972024244317,11.434710068152201,13.399336395040828,12.796992803697007,11.517605597036468,13.661978736573786,11.168598865451498,12.946472313290746,18.413416796658964,15.828662307698934,14.472063705323743,16.231744138913278,17.744650757130547,15.092086894342767,11.764574437317794,11.18608175247791,14.34095358870647,15.67527915692149,19.20188975996846,17.606494508383136,11.697875605652825,14.733095341893437,10.477807073849405,13.191242270630223,10.164747142442149,18.19693411230094,17.358906699730642,14.651736341041401,15.02624959775995,18.576876280375803,17.27069036003291,19.600459933069782,18.916910347098103,11.369123180215439,15.694143942142858,19.218236613976465,12.577268565628671,12.158411662248,10.59088648874659,15.310436498083837,17.120107842781202,19.676806693950404,11.861359509397222,15.966639009960303,14.59605413158572,15.815550262652291,16.19861032033853,19.404458879672184,19.12705292181929,11.20693980333411,13.753405652497326,17.916573711886834,15.021359000704583,18.55197303752682,17.838367770435013,17.030938882226266,17.827415381195202,18.579097893137728,19.531099588710113,13.683934619329216,19.059118942392786,15.588261902283305,19.348459163519372,19.399708443983386,15.89609948886061,13.838787768879858,12.42319886315262,10.293772190410323,12.935776278666587,13.538882666994647,18.053764270003178,15.02007083873978,10.260358397319854,16.856719423011054,13.94243037885098,12.076641001386292,16.54505688214672,18.893289554718514,10.806923563004078,17.920180218476247,10.955520724909533,17.05215109132974,11.54288612885042,13.257244592629771,12.37295282038348,15.388414745629461,19.51478221884394,16.04794124250219,19.97651761017231,16.072134285447603,14.019212449209872,12.17926980504873,16.477296602864357,18.091201314138225,19.54510778954717,17.387642354165642,10.74657482395736,12.171703025182763,17.156651579573296,10.09525079237598,19.41904770473806,14.965530666137285,11.44164661580434,19.765550302094677,15.746352927594254,13.80823687756939,11.394731426143089,17.890359860282192,13.332922335303873,16.76341894993482,17.337787956534775,10.273222847490896,12.906193223469547,17.65907626782154,17.043066966031624,15.010833855780925,18.380366944848607,16.610827128566196,10.856580838015624,17.310740253719764,14.799834145713909,17.951249259703555,18.338883212233267,13.04588151692689,15.343799851220615,19.33613707431146,16.663607874970058,19.82240034158769,18.91029894192217,11.927057458459114,19.626146196801027,18.369972011677984,17.07396862068923,18.978403761238773,19.001445075750397,11.377528376191023,16.35907798348607,10.818828521353428,16.883098880973023,12.375859035270748,16.47855227779896,10.358189834872588,10.721319673982041,18.435186462548977,15.672511944689466,17.73024658484987,18.447200370574095,18.656491665580575,11.835246980735457,18.866613354887896,11.418787372548875,16.662602197464604,12.221080993893182,19.81219904110197,15.092247757564923,19.78381772428193,16.541828005231757,19.20674429079253,18.305884639948033,17.581413852941804,18.018605339373313,12.40203446195717,19.402076651745947,13.786710298636125,10.597132487639406,16.960464536074547,19.40312224556941,18.404239010650173,10.545615744182438,10.688389284240971,16.813620065687118,18.172803150164793,10.040386411453055,18.46208477832314,12.387209521128915,15.411348472418322,11.67392640623256,10.459259134191184,19.98308226320475,12.725789488823327,13.77863964768581,19.48368363612026,17.15173649163121,11.130299572925487,17.57661650649633,11.441473944435113,16.97102464729814,15.961048225944023,19.09123672750628,17.968702821811753,11.48536569572595,15.451315514379054,15.45814695118098,11.689593411136007,18.28971095866224,16.87284167484814,19.88319465784629,18.839079279433776,19.08652580720789,17.50991798180982,10.599244004785511,10.421564864314254,14.686996591373331,10.333668945607847,11.184418411527474,12.695837731363412,12.46678130229336,18.348752212903296,10.756860016853683,15.968206016306182,18.680365423787862,18.26193560686731,12.42007431609206,19.31109317106401,10.743111292431065,18.246737484604232,16.473960247564126,14.390944351911761,16.458855080180875,17.618985137675097,10.541748230874814,17.280759833366258,10.175600827017528,18.938492269960708,13.207541716462519,13.59451669667995,16.25163436487354,12.281889233291158,13.149361107999173,10.315259249429229,10.43049299820089,14.401541643486084,18.79608409850306,10.880832414145615,12.789521336030958,13.021430785672766,10.37611117088934,18.129671196468237,11.059087802580557,11.304163935001712,14.194429622570778,13.28570100999453,13.379044744172745,13.207064675057733,12.873060228419092,12.842965398783777,12.974484316068526,15.265946102284918,17.308342006480203,14.756785713701577,19.727676906029824,12.389344354581173,12.153389005868764,10.24404631655802,14.016569553048575,17.5611435413715,13.928219117894775,13.088077459108407,15.797012271699735,11.60997841080367,11.16020328427889,18.662938160458065,12.259686138153397,11.371631852606603,13.663388581110139,14.735327822131994,12.975856086906008,19.742735822366257,10.07188722944791,19.14203662429079,11.51409489194138,19.151561863014827,15.92357616867947,15.707458666829003,15.233788632222911,18.097202331679657,10.754083071015948,10.304104680623826,16.48366211551125,15.57668959160486,10.654370089511334,10.761462795836573,10.858921176045959,19.541189596538594,12.312253272589484,14.073007657200955,13.581237082031887,15.25978651656411,16.719176653065233,16.153695030236698,15.212765466854872,13.309593552129076,13.896623982797795,13.887898944850928,18.37650746987835,16.47949466966719,15.688794540472335,14.719596588001702,16.14857992518723,11.132662577268617,10.49977039373351,13.573366788668535,11.854036115322215,17.786789788628617,19.24622548896192,16.466600309819,15.660349146514863,16.6943492372437,10.275005581817469,14.73605071735722,19.13397067713418,16.54672398089665,18.901055143122175,18.997637797322565,14.603911327648332,13.335664014894213,19.869426378305846,12.938041011984978,19.58163553508683,15.689466804070005,10.530955620406246,17.403732247316764,13.424674607000336,13.611084577917644,14.762072882424771,18.523603614676937,14.332669161788495,11.714343962082028,13.60443038646963,15.584429858014065,17.333573268756943,12.659131637131098,19.317574811158835,10.193411589556673,11.977208090196177,15.627276448985148,11.28587601992657,13.059039119678681,15.544803907818302,16.805048374542984],"x":[1.805654076109121,3.323228577490328,1.5042963707800294,3.755509258295514,0.673762883077843,4.14122203768888,4.713518223290779,3.6788373974480293,4.706878733141613,0.4835604141089134,0.6948576654763927,2.645355642279086,1.316114972278486,1.6369586338733422,3.2644971076527485,4.392662018233863,1.523813736162698,1.8708484724641572,0.9180289002714614,0.6777389191740224,2.9975883761315925,1.3398171925066682,0.9219695749386492,2.257331463592097,2.901852411612599,4.342956535723795,2.46758131782392,1.0467784330560748,3.9171588135785287,0.7550937145189163,4.09445485402445,1.019540360332719,1.5153977815054431,0.8994260274511701,0.15533414171655213,2.0302031551039135,2.7674686082978806,4.309644898822919,0.07334757621380916,1.7506848229454053,1.672597901421664,3.2884895609110822,0.275687675324483,4.127548601389023,2.1738295329789583,4.094516714038404,0.9112153705732773,4.280196133310788,4.95728181751606,1.4826867730568305,0.546186120912443,0.6254897839254392,0.5300690350430093,0.18672895812515078,0.21173755622099888,4.076203827471403,2.4042975010624525,4.688249270259241,4.885616433414217,2.244269293074921,3.6879514037006897,1.797356065751291,0.16135778357654895,1.3485426244982768,1.337556286405055,2.3950514888805152,4.540409297823245,3.8081854091767475,0.31516582194491716,1.2786161842671007,0.3442841714392175,3.632468957601173,2.8018934815971797,4.339395129082659,4.8398497565038126,1.240257511969064,1.9795607699965279,4.234135083353196,3.6300003789237567,1.7857271445203404,3.23876623535164,2.7340572552561837,1.9791587075176142,4.014672860056071,4.027385039170412,4.553065933673636,1.3807091833214535,1.6968246799454734,0.46332997760839323,2.632151831938019,1.0620825601296646,2.6967955984598357,2.7121304961661297,2.0482345195196516,1.2007674309080274,3.962827966502167,4.750911169068867,3.468359927656357,0.4958076251279053,1.1038805157837794,1.9934043846024851,1.0280499446118896,4.843824687656029,1.818042814296017,0.8085489530354584,3.82299687819881,0.7658796588233274,3.5634714817253843,0.12854661352999952,2.766979038700186,2.8736420969680454,4.311153959446154,0.11612950996298332,2.827017036019308,2.0943789874573095,2.7408437244447423,4.473776986004645,1.6354726988731516,3.009711385693122,0.13474799778486535,1.227025669838776,3.0452289924482034,1.0866794049225426,4.0441932621083865,1.0408394362551654,3.5562764859940197,4.548894394505693,2.6828135804950124,0.6761543736053277,1.5954197345434962,2.5818309982171828,3.9530885466982713,4.871941206663999,3.524932338324227,0.22297802686693124,4.507846203242428,1.7091963515135256,0.23204916871776282,0.18204524945326317,1.1121662415622569,3.7873098563590113,3.2894328485654354,1.2576491082587593,2.0783143831518744,4.363924023402563,0.09252501777674005,3.1919671050407628,1.890222520380831,4.8323328040811795,3.857980484092378,3.109849616761926,1.73736936573059,0.3553340255498294,3.0350099019079413,0.7829088776099735,2.188764420427267,0.6407694963981392,1.9393458673098274,3.9545678596487557,0.03436745164284716,4.145986213673561,1.6303501553365107,0.39065694496765,1.2366974836661693,2.0060697129447815,1.7334770467572214,4.463274324802221,3.644833412487981,1.8839894631315657,2.47691379527983,4.265295007779048,2.525424059903467,4.042423874012372,1.1287695967552236,1.8977774285110327,4.086047354317462,3.9238284020436076,1.2887821725480342,3.749814509658166,4.52331999330582,0.2648769986621602,1.9820170251990088,4.886818083234715,3.215207985509979,0.5508973672549466,0.8411995677313533,3.2457809092710646,2.132037863258901,0.8095080436643731,1.3227649375147021,3.49304879442474,0.3534480917993277,1.5537986643969581,3.8615870014995766,2.421771847856732,3.2901266867906456,4.093902904003837,3.308365197464025,1.8740891529402381,0.22386420745955982,0.08264704156645597,3.094639445096119,4.569915708655481,0.2942611242641213,4.145084427716488,2.701464177018752,1.5089637626458596,0.36900811516968335,0.9574739843162527,3.127989948341625,0.301814352410541,3.308099454768346,0.22541723061201058,2.108148783860684,0.26829992090748545,3.8677829350375594,1.6898594293847902,1.6643666062192697,2.264257550846076,4.578479999456372,3.435871776089463,1.0145350621944205,0.8643027540701631,0.6880556662773862,4.378125108298704,2.518671967252714,4.618852464940847,2.45683676237594,1.026288398764098,4.855670019523214,1.8792405370992393,1.197126194617807,1.9534867080673812,0.6977981225079177,2.3599359823292163,3.2679007041325736,0.13945029030313139,0.384179429654119,3.4563612571854296,2.93936617149694,0.5313129607293532,0.013630945173472853,2.3954151637399113,2.375393183848107,0.47015636259263527,3.7230032685490477,0.7082670071160824,4.738511900134679,1.1222900831929272,2.5400334862657337,1.0508592970959807,0.33392960319812093,1.4218920809585467,3.0929130650033185,2.986710386345207,1.1977409784545734,3.3748890596286163,2.954436529590192,3.012243818711492,2.8955842002202328,4.688291336483752,4.9201427549346395,3.6988399975810484,3.9917527476068937,2.6508916964762252,3.998595853270046,1.985711412598803,0.3445685797843234,0.6284057652709485,1.4172829910511409,0.21443873742749142,1.4289576468196374,0.9312864050589043,2.9811902346517583,0.8607067874135688,0.9094247367879182,3.7861993399012963,2.461289514449052,1.4266734990925856,1.9613997172879538,4.457742794628855,0.0743307551747352,3.5812896329652313,0.11460971866017022,0.5136581356392134,2.294453869768075,2.0067272568106875,3.4467529251938367,3.3222224918409085,2.554381709493386,0.24584697549303924,2.1963821008832185,0.8982097508775555,2.619743807582404,3.9754515154520833,1.1993193623543763,0.5581214342265872,4.67301631062167,2.979895450652349,1.6101569167551733,4.999168882066991,2.567170312136672,4.268220406683771,3.082025854433338,1.497914678962473,0.05130430241827244,0.5585691404974924,0.10219057836653667,4.708025181258111,0.7885888267352237,3.6330779590579745,3.431286453589324,3.840816967307794,2.820507180022945,2.5082129931538666,1.9527495017289975,2.9464316824322556,4.967685472962707,1.4138270925726537,3.0802539692417175,0.17222790799419352,0.5685633179138161,0.5737569642723195,2.786130993645042,4.579396538345296,0.03507220325100757,1.4567477355683933,2.6446154017834846,4.092427992144593,2.3007909211236366,1.653430550389683,0.9208902539702069,4.005859266354756,3.7696735778009502,0.0655419597503637,3.713513497045544,3.7735040694290243,3.9845376286884857,4.069829352338869,3.173217224035546,1.9683281617770043,1.8079503361584637,0.535206681921857,4.481648745850809,4.806587576245809,2.3318285412144526,3.1935425582854204,3.925224454539312,1.7681666956645448,0.6124821752115306,4.680844963071015,2.0880856926434155,4.2764676227131995,1.1071586732811733,4.016154251111673,0.6620855616165,3.4235233906554265,0.5418309051566583,2.674777665263167,0.41997587286577875,0.5901138359506652,2.665543847594394,3.0220040266356785,1.030416693672721,1.5905098183679522,0.3944498464792756,1.5297182152668654,1.3055705358106584,4.6097751231785615,1.7750634430384082,1.959343297197269,2.3444416612131924,0.47868264964159635,2.094821502527695,3.518685403154216,1.8979293544218878,1.971245719728849,4.929597956169993,0.20890820370439322,4.453622641318924,4.542859156968167,4.071299790569622,1.0064575808015486,0.13756904368885992,2.91955493669672,1.6082666086257302,2.668097667265521,3.5127755148132223,4.03798477035191,2.7356198904781506,1.9228097242348208,2.3320954055244405,4.629800313788071,2.363979534812567,0.8996363058692958,3.723748163347741,4.596500096284137,0.18033392047893004,2.1847607981720083,4.3249450937310385,0.5646645477147527,0.7390328678362512,3.9379211966440275,2.978960811471455,3.222726340232925,4.7904747452635945,1.005065360177111,4.346894047539953,4.201564468252257,3.8892503433590964,0.5294934986124289,2.4522264242995426,2.596424696648155,0.8833548445298101,2.9239550791465496,2.511110134268524,2.2129682043586585,1.5327709054554928,0.708875011381791,3.5042494924124856,0.5723138601934741,2.7997770123600176,2.804487332099972,1.1370806422346313,0.1368309972853743,2.187542128646005,2.018993682518311,0.7083623512731085,2.204230076875189,0.6298332473632884,3.8666645601858707,4.266020621876258,2.9891205534494567,2.593833021164645,2.3467738129409654,3.7573275296749067,1.919020181267409,1.415718349801186,4.62666498069639,1.2196604327003224,0.23124903005882103,1.240938817827919,4.0109151147706426,0.59502981814334,4.537420534641066,3.7468798716627605,4.380053202028384,1.6690363434542321,3.057691800287868,0.10246296083102457,0.023954672730640558,3.0967697157992524,3.842993633554287,0.9194724625092743,4.435000735483755,4.264415431847976,2.975566705738647,3.902540046047094,3.813582370956584,4.653079192286416,4.215172246088818,0.38786168733924486,1.9211410265071605,0.8977869986619624,0.6044378278094076,3.9847253982269226,1.7307754906243666,3.6311434923967534,3.2593992731317476,2.096794370892545,2.7214849603370075,1.3952455015569043,3.1086998352231943,1.0200739251623037,1.2962554705811757,0.3360595691870516,0.015826889686124668,1.431758242396265,2.6114865704426284,0.5719078236929453,1.1583731511596562,2.2323965912282304,1.1530686062043416,0.4045461360056024,1.6217207099338982,4.536581608211783,0.13221901300963013,2.6767707765009585,4.574789333533257,3.7355383496106387,0.9346351317143986,2.7128013548992955,3.2763833753568985,1.5790964816773667,3.1059192069905506,0.7006016362558853,0.9101864889667255,0.8681713585491513,4.9842498093386745,2.622040635938917,3.7690613638638526,4.70523013022632,2.7259848594436145,2.9237319862865805,3.538954168547268,2.804123111921059,4.716200714852685,0.8560547179384259,3.495840471705054,2.2516534658086416,4.109165396800676,2.7822640229415976,3.891065612033824,2.396531719944054,3.7089219737501535,0.9462105781361541,4.808553293244026,0.1928126969245103,4.36160141103468,0.6529615035405745,3.8745525173341178,3.885518111007994,2.347012448929533,4.754643028476336,1.085698201674623,1.4601591743081044,1.2932142326351315,1.9336380471913894,1.76636649208338,2.488114392123869,3.6804239047354823,3.209382919083886,4.167674988995175,0.2531743803082964,1.5030423320771757,0.10372566042834874,2.8683642069203605,3.727464310634667,0.8555385643679725,4.772285986547744,0.30851325799756024,3.560425951163632,2.3338895268419844,0.6381215994251455,0.9051865073249155,4.84194417568382,3.6049028036600395,1.3653081909572073,4.603734742807045,4.6595794885472746,0.8216925029345246,4.473208208687912,3.0083805955181186,2.4243242175746618,1.141179104976684,1.3960838116972707,2.151459584083728,1.4449489229613188,2.840776050748773,0.21948630515962408,3.1202035978799216,2.6193860212928364,3.334255366269696,0.5139121706747196,4.837605900348084,4.339265980460044,1.2482762545190318,1.856325156256563,3.902600855969469,4.20617870984846,3.126649207630453,1.3336032986564827,1.3284129775535203,4.260663361337978,2.2490442364211916,2.4556794949148375,0.1958546370708314,2.1253059554304676,4.766823072558911,0.16134336550671424,1.5098505780820637,2.6608232201286155,4.9374257165888285,2.730452863938014,0.6337103281847689,2.626225442232908,1.4390021037234946,2.732069940336012,2.6689183267378858,3.9956256779739396,0.10835644528518706,2.8190368798407817,4.709534032480218,4.899755317279317,0.8318801455605684,3.759404947216739,0.43570542377076915,4.385138287547324,2.7715501771155138,0.3685379962586188,4.212071518343113,2.819361233839671,3.815313317684672,2.309093552370165,0.8397789684674151,1.9630473693103734,3.0438364897927084,1.784274199317899,2.7568165482586737,3.6022572209504586,2.7151185044586104,0.24917529391458526,4.89425140353546,0.9150155317872488,3.125057514923223,4.524823743148584,2.284145448816157,1.538458570683513,4.136366389969204,0.23095078833239913,2.749907410329601,4.154665399405762,3.67847276107255,1.6584841383799165,4.261328053232402,1.603128751732742,1.386572708827719,1.8930900592603273,1.789718858298991,4.3636324344246225,2.4030960683680025,0.328312624024949,0.6092699529399548,0.06346598978913431,0.3360234253478189,3.6944176670280706,3.463288604052719,2.870464745969902,4.78689855816743,4.037318141594977,3.9835817666669007,1.0856145155501784,1.9368666190520378,1.405933203908204,0.8499177693446824,3.5457191242422406,4.638726250195643,1.076999172716302,1.519400852073718,0.3748472245490275,3.694645508019244,4.304587156676266,0.0927531657391234,0.48766199569442614,4.035954762193689,3.7602126469637156,4.675540496532894,4.957502970448703,0.5203818976724583,1.067736443452536,4.761921639771517,4.634806010405638,2.2289477078615083,0.7236762124754803,0.0856525251497775,4.9588644848360195,3.459974783037846,4.134452459362793,3.3703564825838974,0.9339029738271876,4.457395425743553,1.0644522245726273,4.592050869835834,4.1316486278411935,2.3433491441578393,3.4207503871159703,2.130201509854074,4.9165272590361155,3.6730261833289877,0.2776290965099526,4.20252069237028,4.578948348259743,0.38731445173009416,2.5648133067628507,0.8126415888462513,3.7145639564092656,2.856468939671327,2.5313111855874415,1.2977827108026885,1.7747930605666673,4.893960420407145,3.5814938074739455,0.2970755692715188,0.06130334863967746,0.5800004730357278,1.2375706264214414,1.2626022114988678,3.1714282569689956,4.407676132145058,3.8023002106725823,0.523035395789696,4.800988229351328,1.4018988722998127,4.23731949395441,4.875726022234389,0.6130339805726115,1.2311225397004077,4.052618974028952,4.091626682553182,0.5756766012372927,0.7287450500473258,3.1152388728848446,0.6467754165248063,0.6157914671578768,2.817967495933833,2.94256082845459,3.7998031000747776,0.6662594684818257,0.36976112408145245,1.0872735766792685,1.9314545455660515,2.020118923316053,1.5502671842758053,4.238608659367512,3.773316906553096,0.8287572969198154,3.8026730465450287,0.6276651589606652,2.37192875850351,4.899855053044332,1.5213578368604785,2.182611182898946,2.0971792722903637,3.4058477002123198,3.3993028656609683,3.7395147527926733,1.2324266965747244,2.6433757409321257,4.760576305007095,4.506557600998019,3.6943687267143064,1.297297709671914,2.9245325792654056,2.8994148535640427,0.5402792962204095,0.06306831982321959,0.11735446636332303,0.7459227826281589,2.6686411942787505,3.628948817542926,0.7397855503418538,0.0982549372612529,0.8951841771132507,1.9590270507176222,3.069895895155894,0.9075696843358128,0.20529268912482856,2.1852225285721816,2.0046616193424818,1.6966352979291133,1.2184484129073425,2.7666669425404287,3.3506909507058893,0.17585623274066542,1.7073910969505224,1.422443137181778,0.4954648879014212,4.89886183007653,4.957622390440207,0.5786360475435759,3.173362336718053,1.3317003013950324,3.6780942521285054,3.6163511918267255,2.4684401490114594,0.5419233342825358,4.508451596377322,4.244177272586459,1.949631795349196,4.158306870732135,4.705215936290378,4.621454638436226,1.3634776803406246,2.894437752972996,2.982430402864237,4.177858063109659,4.683837347469555,1.8521555194349482,3.9302798492247093,0.360720037867831,2.4720252075765536,1.911780015218868,1.1023695898669428,1.430936856529894,3.581696403510569,2.163372565825693,3.8567506413932593,4.120690103184826,3.160525647190553,2.4802628081088063,4.886058695249972,2.2675924013807833,3.8741383062353574,2.1734560129659797,3.459568571307546,4.929143845217081,0.2307999809271455,4.160434807364983,4.670337395228974,3.3020728732291715,3.0738414522539257,1.747941174528268,1.481179477727106,0.07115889343457527,1.030492774046543,1.5348603261931748,2.0896003650695527,1.1771371833089594,3.9697258091790855,4.018910418677811,1.7208223300404357,2.181449820727507,2.783064401183435,0.44809643249229314,0.9151595388695555,4.487040124308899,4.842428042579643,1.495170458954943,3.422768086721961,3.7930236253733596,3.590027307513549,2.589824074989706,4.079865943299513,3.6744336668721242,2.1916668024551544,0.9389319350348235,1.8399155162838166,1.1722209688572294,2.5299981688383255,4.831870874842659,2.684985625124179,0.2866587029733936,1.350003909023727,0.05441944177986713,0.8342837286190607,4.802454590381283,0.22103826546042038,2.315407499534403,1.0646668373348978,3.377657212406481,3.2345625852033932,1.4038015544225402,1.6976859588811677,1.6140307613801663,1.221846205127679,0.32769217255052885,1.4130822454922387,2.6381669272932387,1.7926751403577712,2.0898746839620275,1.4609438353411774,3.9265279017790133,3.2516712701391404,1.8646944598541737,0.23550670864255885,1.3060826351721744,2.0397226595025875,0.682636090705725,0.16918327501482144,4.821608119796678,4.846138150988656,2.8380002924650127,2.5743827757637305,2.938193146215111,0.48263304785183925,1.829589176890829,1.4970135884463853,1.9031817273596852,2.111773623762528,1.493276510214988,0.04302337354791019,1.7210290902049208,1.3371763457018626,1.9230233292348509,3.717445960596847,1.5939179320632924,0.7098462417199247,1.0887977034654794,0.7554838191417812,4.839896886673692,0.6336651702536644,4.982663596520622,2.8659679507602345,0.15072222607511065,1.8002583407096495,4.058046556760841,4.071034796535185,1.674628467405157,2.7474014961211477,2.355044710792664,1.7352528529269706,4.3543789405448985,2.098675463361136,3.6415560889429432,1.1775579299549555,4.269949529734671,1.5179909550983472,2.0350892687625963,1.9083072395066603,3.1049570461948948,1.191990080483356,2.5675751983603288,2.509634694244359,1.9566640008349834,0.17885878568818847,4.508303142972116,2.5439643909967558,2.266690761834922,1.6049313575524604,1.0391346815028535,1.1233261327867383,4.656767173329335,2.93089133518711,2.2174929923315756,2.2485492766082094,1.4569541660465113,2.684282945511968,0.21703261010274089,0.03683177415835903,1.9921877117924858,1.7015871018664952,0.8706069760535307,3.4071991267964554,1.7533540713109619,2.92217778469423,3.717325862350289,1.218002520897371,4.085008124676872,2.84749337115189,1.336277609976414,1.7980276156207653,3.5244176196688204,2.2800311646020077,3.5037550963652144,0.21736835430283152,2.8408360292642163,2.7079720344375247,4.8113201354943405,1.2193609593075594,2.750272524321021,3.7018448951245206,2.4498951746166977,4.029213904211234,0.37814331634814513,2.3277743817187946,1.0036865472360212,0.7605119525141057,0.7823354689777928,2.633556699626803,1.4629259918880522,4.51366526740072,1.823911002926607,4.1525493893939815,3.26376181859654,2.233727125090663,1.7619510014744078,1.2836576684255685,1.249604315411259,3.8243280406629943,2.828043996280228,3.863724059615615,0.16179469536743762,4.272880617449974,2.5464565568225717,2.866762156844409,4.454062963386586,0.42489413011396304,0.7430302981656001,2.329868474188209,1.4677886170339927,4.011500634171984,3.9704677970525717,3.9160317337377792,2.043766187888841,0.26427601546620827,4.211780407914998,4.548658089908716,2.6446177662908408,3.5773390387994395,1.1483205768160987,4.077058128535916,2.6828366796265604,4.395140964991128,1.5985389482149892,2.2232275401126134,0.7491376950615336,0.17255106529970976,3.068671249280881,4.272621852474082,0.2366691927303044],"beta":[1.9033718153107215,6.472894391753838,6.169731498035091,2.0637201048907228,7.225296624408037,5.007287149585813,4.625338990653233,0.7991068383749722,6.4419857551372335,3.5933542759559023,5.891887659570094,9.331349827409545,9.104333639911477,5.4937111984195415,6.766193019177367,5.001673213968029,2.2014540803766813,3.12361120282193,0.053804550897273984,8.588428839815805,9.71008852456378,8.391256121124469,3.849645134265709,9.337178314318724,2.979220264030542,7.1918258735027045,3.8498108999212377,0.9550404765945908,0.7413198280328737,6.108381381113168,9.629202413615925,3.622163334352373,7.569024720998345,9.675349256089312,3.8674232175182,8.984199894635008,3.315116266972189,7.763585275544001,1.0387391108568433,1.3215974192546143,2.8606347653191833,1.6802761968969837,6.077928517523532,9.177407565936493,4.222532728501191,3.178609472481535,6.651768213386373,5.97744035867223,2.8745167060484023,4.543618340315943,6.177932022884911,2.663208104575292,0.8373730308423988,8.087387804318455,4.838982925200925,1.8664004353831731,2.905978039822674,1.201920359473656,6.773145982452133,8.169584350794173,0.17942270836459828,2.648370343065074,5.9832509887963825,0.07988100597915881,4.2240283322160455,5.451388072230445,0.18829467137380318,4.424792348462918,4.412831740442158,3.148397079767915,2.451956710317005,7.647828599136748,4.462105265722873,6.248649219352154,7.547922387896464,3.753628789734116,4.046183353221653,4.2983047573060995,8.565619903451307,4.379788469836681,3.7303653315259466,1.8024509380906362,2.636033354231191,1.4377677585091875,6.3344589069669315,2.426509322432464,3.5038657697235243,7.928102663585534,9.838365555866977,9.337500234275032,3.970460243712206,5.490579733614007,8.335377095789976,7.826683759860009,5.010620607129921,9.25676396761653,6.38345343410178,1.288739994298731,9.262988426400689,1.721733337171023,3.6357038782937945,0.3952023599906229,2.3948907778522277,5.797513973354603,7.059077688018888,3.0728095802174127,4.077242466163806,6.546067883788695,2.738619723845872,9.284001571678255,4.311725416957033,3.7680807789955995,2.7758609831400594,8.198917005103901,9.547728084769627,5.087877052953942,1.0590657423137961,0.2425251930457062,2.955229372175636,7.568550797673734,3.8599738210192713,1.4409084258295057,0.49076784479893165,4.274056520965697,0.46177655397745987,2.7515051063908524,6.402970815742215,1.8288327589869913,0.4282634312906519,6.57186937906562,2.096598183331748,7.5101887077861935,0.2824780248408132,1.5789355852383902,1.2446984388176618,1.904695822123812,4.219003662280039,9.846809221341497,2.358058620044532,1.886518833238915,7.858131070035577,5.049289883016037,7.481166656954478,9.40338018805948,4.678347948245998,1.1955052181481896,0.41552348576194387,9.41175841799097,8.25206122324429,5.046553011126862,1.8268584726932735,4.534555926715685,5.971619530813895,2.052607894466343,7.451501583589537,0.5070557071233872,3.4067716593110586,5.717957953549913,2.6602821646267083,2.847436887559396,6.385379213581441,9.74557231621919,0.5539608012991715,0.8545460622569112,3.2577432323125133,8.929461547833979,8.75172936272197,6.863407475416388,3.9116083809769187,4.756086423471551,0.4151875235221625,6.215882010969764,8.118214637084032,4.66903574238398,0.1306933400833432,7.667302381293468,9.741598052871222,3.011712037569947,5.269302709246704,8.806474421894517,4.741207791019071,7.67066667111852,4.600366445845292,2.913385689152974,3.934129016379313,5.179884703442303,1.970505761194561,0.10555782086851151,1.919538482882146,2.5724599372867685,8.801892652256115,8.611293358534677,3.611138186844065,0.908656682533624,1.1730543460537168,1.2977550899590473,2.7574514525235405,2.434736568009259,6.809040633976629,5.26761062847376,7.19641333182355,3.8955731742685384,2.9741051150338538,6.9785826603979935,0.934785112356773,2.6595130882392115,8.91723588844883,8.103540492429378,5.9778789245214465,4.27032491356091,9.751069367001223,7.572254710981891,3.374895164619889,7.353094394045101,0.18553629979054742,0.4904849250817289,7.172860459116423,1.1132685071248183,8.627852444750543,0.24196365132542308,9.59895843824172,3.7750786230654665,5.8606816356025515,9.889194669829804,9.10539862570165,0.3173093050563569,0.7219632908933415,0.6717057164966134,0.7987435856630332,6.89326094991803,5.15784025614315,4.75300468654468,4.750266105975507,6.053232594719892,0.47518772473596593,0.7329890705895159,4.913847346892981,1.65779694108096,8.526984871740275,2.2134619407009404,6.574564616679323,7.109724104242416,1.1508750600872952,1.7317524542087237,7.020889930214138,6.88604923908779,5.165578580402208,1.392085421291307,7.33585874644816,1.0496976110901168,4.515862962200421,9.949219933657076,0.8646113980151338,0.13242638432015452,9.761491795081636,0.3040007462045713,3.2505989194411433,3.646528497679973,7.017768043333099,5.480713903311713,4.32400002935654,2.308795690930694,8.994727985725286,2.567393687653794,1.3375156618258277,3.3354387513297246,3.128820536545136,9.727833442948349,6.536102681266563,4.336178398528321,9.386358693254298,2.6006991094553866,8.092373502903762,0.8676711321301589,4.8399840088466455,7.2396449533528795,1.7197040472395786,9.435606950970286,3.1375114435942986,3.7285322166796564,6.976963258545816,8.028261167762448,4.3778649728094425,5.87297603872035,9.608060724326357,1.5493021696594123,2.970490139698394,3.4087433649350274,3.2916235713094277,3.218775755763097,3.915582577965002,9.296839753560612,3.5298543060550958,3.8801988271316468,0.022740860583081446,9.250765534116205,7.47166947842673,1.5669799866187506,9.751522126580417,8.666045332858376,8.653807147346429,1.976189419581189,1.443470599436485,6.707858654274281,5.9301396457011135,4.974104219877504,0.46845078724726097,4.808574266685244,3.471338086297213,9.641084541664927,7.319016060604544,1.4389846987067112,7.865098590261514,7.893134650366525,3.678891340919761,7.3821642820897715,0.6968561119454453,9.425384757995893,8.216242208266692,7.48448867932513,5.472112606414488,5.172108974749758,1.6395105273421873,6.108758050418364,3.3075867674365256,5.975423421802497,1.3842179483560546,0.42498949185525214,2.1212020286036415,5.678475800850089,0.2212574568166814,3.978777720387656,1.0972462574507458,5.305076713090504,3.3486091832815745,0.5269892475193783,8.32628386466492,9.850219365458601,1.4876257217696232,0.962555444476596,7.337798834901317,4.002466503256585,8.648685098921923,1.737333303213895,7.711021436106322,4.236955325690026,1.0434938376655567,8.472105749980532,9.918704379454773,5.690716590582929,5.550956763950181,3.58874251404794,6.51186387192344,4.975287454885217,7.707502052652922,9.322238498823792,0.0031035308656401916,1.7733246403120062,4.276552471998478,4.1842778631392274,4.1456007863247795,6.150739869386128,6.784923986373279,9.282688634663444,6.720120207114293,6.4189779912297045,7.535326573797194,4.614150547625419,8.279655693074579,6.2209418433232795,1.9982180493472157,6.016876477902056,0.3438623280161246,3.886511106127868,6.677465155075872,1.5827159577916272,7.274150804802268,5.508108686505682,3.068722384777025,9.890979953880558,8.257225552888968,2.233025929821335,2.8566728215523263,9.567032955468084,4.285732455294258,5.706644936800515,9.50667640776649,0.3525433394087796,0.9243328165466513,5.149657792802785,9.751347481315083,9.547825482614257,9.829699155577325,9.597280035579791,7.660795580086848,8.7441909149285,0.007388315211342977,3.3771272603525304,0.5878650079429981,9.615306799673355,1.5948053732898537,7.035265047970087,1.7224112840124972,4.506801293581086,0.014321274599833345,9.196236220990471,2.87454237361918,1.0202845452073661,4.210284332544076,2.4196526528332174,9.761814978381931,3.013489323825287,8.710095626898337,3.1450275964942542,0.7142017446315241,0.8647721822873811,1.8264998518202202,9.288043823476947,5.84425229159179,5.562848595255234,0.19114757424061324,9.84951557105887,4.625242261649857,9.600723543584307,6.746247906914277,6.233968906305483,0.7880420589049164,1.3921894090159448,6.505691439888903,4.878299962519089,9.932689163306117,0.5033629017948771,3.7552897672680574,1.7459369710517247,9.100246527806107,0.7197342063387668,4.790095000088637,5.623533213508041,6.404721091267362,4.038331948705956,5.007792974454461,2.8622177584421493,0.8749405653883913,0.47864592629106806,9.39663156074409,0.9529921639010674,9.305993132075848,6.025007092128163,5.647164520365598,8.361696064493733,1.2641367474236964,6.6672747528742615,1.0875891015415773,1.0963330978162977,2.1377064439036064,4.991830889928071,0.3751349086583633,6.254184516339681,7.170267048705583,0.354829785009132,2.4206131183496016,8.238258439829265,7.539626550192457,6.088272439745806,4.546283917541423,3.16557603241991,6.953230176906771,8.804833522669103,5.85599903222948,5.772270426398515,6.895251563614853,7.840503996069785,5.7609693668147655,3.7778876766264635,1.9000841807588564,5.046017630007196,1.5093057086906003,2.4248378452328634,3.2229162155791258,8.011962691496787,5.922591686820118,1.639530860080709,7.354002892437146,5.0986678632184335,5.436770977616878,5.6940291462796715,6.323156213503509,1.6944711667508439,7.034848087686603,7.6418002639588405,5.664819043983391,7.5085773117602095,5.330070340138868,8.31416706544225,6.728373624767903,5.0415443738648165,3.121036387520719,1.9701358418062842,4.799262229625743,8.323327244602055,2.518656936326129,7.050495998965234,6.212196256506379,1.801246490021513,0.8108561959571614,8.467647001329436,0.9748696768730025,2.086603747916711,7.471148271284019,8.466809162326015,2.5090036726449894,5.913057155958203,1.5045143330734412,5.202897726056806,2.9239993149123444,3.151120420192315,6.292342743224433,8.534100627656066,7.7923411195659265,2.6563732527682093,4.846377675848695,4.810636555459569,6.308097046387111,6.843568196201339,2.5606227230104195,8.591892204265006,9.590999374399733,9.473732508325519,4.627774397358078,9.094932162886094,5.783462421127501,6.732025326724685,2.5054906050216896,9.531508408616665,3.224101467267404,0.7720127578324787,8.723850567085254,4.29751337036403,4.910851050566139,0.7142525613631889,5.9085659972591875,6.726917517229611,8.937322983799715,9.754787496081743,3.798270003128492,7.89029279473379,1.4148207543100888,5.7218135038396785,3.5943748886152527,1.100162613946909,2.7186656586222657,0.5146437531919368,9.734957014081473,7.420036427772585,7.793550451134572,7.485756668178658,3.0602511765788054,9.7355013842823,2.9493128094845877,9.87157560964385,9.037646189748084,1.2922514234949989,1.0537707802178442,2.206647592066373,4.511628305301421,7.5093328432888935,2.901132137342328,3.913258527149517,3.4914754635827383,6.321375131213074,2.7630749663595933,6.062803244778772,7.009391564440726,5.548271681087032,7.625827682423683,4.1905081914497515,6.125696096054285,2.2467779904122187,9.499271003474215,9.560496993838184,0.7771927201144324,0.3194247252224369,8.465970586852997,1.4911471298132195,7.05677642513905,7.814066996094409,8.3277628993998,4.815934550948075,1.3184763123682242,4.089122718543621,3.819908208805989,9.204145565644925,7.32790629603528,2.3247923602060316,9.554510246387808,1.3135037486571655,7.075034573900442,0.9986858168320167,5.969684714766606,3.328661306344649,0.4365728236495059,3.0250247947321673,5.334680059475813,1.4685895437798346,1.174472311481105,6.307104380002029,7.162045838038735,4.177360854517436,1.3300036029870688,0.12272629468594642,6.8877890978482785,7.948928643111495,0.1698941881202587,9.49499456707834,6.7332995603104,4.8187423273561265,4.54444879219158,8.072227327986921,9.784821756073912,0.17439477107178858,9.172691741740111,8.46465833506581,8.733719075030397,1.9682946792004241,1.0531438518124725,1.4346687078873854,2.588872345410127,4.382503702894152,3.8803704522107862,8.991315163795456,5.340516012863985,6.902582039919789,7.067044953802362,1.8209894090176837,3.595794972047619,3.6171257562955983,0.8792428298184518,4.051079849853334,3.753535532578831,9.852821841766133,8.93231686708998,5.420994653327615,3.928286553578233,9.482757986724762,4.984510162806961,1.0002023179889918,2.973230127974964,0.8145799047845848,0.522999999919942,5.609823694504314,6.93964536461152,1.5410417753692007,2.8274855252274467,1.433994331191819,9.986392775014885,4.776996871127526,9.302886999990964,4.891430376409973,3.7562577628240934,3.56613215090146,3.661236224854907,6.4795568507810275,7.864655385804246,7.411861756967921,8.828795608340647,9.954833528768674,3.479227260165949,8.760681634490304,5.738261325056653,7.630260591849076,0.4763388009573477,5.075668725536668,3.8809971234447938,0.7092355332953626,6.104111571310938,5.083631238549691,2.707696163891715,3.040667864708939,9.994167556681969,3.119093335949923,6.2489590881765,6.596036976249529,1.430442770607081,3.276096035513556,7.485762092825712,3.444820371632349,7.700079381305707,4.8643876246671365,3.1728990738493,6.685431404238427,0.4631776389427178,6.303183585056306,6.618679426742462,7.679698809528521,2.1888173453324744,1.0002940542537542,4.990987079178764,1.1685979901470112,4.981258152390115,4.812238850244173,9.777741858972654,6.001698039764349,1.1315963453662548,0.014547461769447434,4.326010244173419,2.958050495934861,7.0601586786889925,8.353727202645224,8.624469093276318,3.5914881397024034,8.04291693225948,3.2620197069103307,2.4494107615650518,2.4890287257344124,9.845087982436304,3.9682514250560685,0.8718572519380063,4.552252107474876,1.1051130669780096,9.254129384286996,9.08026480329535,8.496264229826906,0.8809701409657622,2.245523752136531,1.530391131272979,2.361119797394111,9.810648371047888,3.411845956120847,4.114203006721082,9.726498400906019,2.9939991037427482,7.5213662003876625,8.287490919276442,5.887319378179329,0.7151580065947605,8.848189632150943,7.9357081101634,2.5092106917784496,6.503891571504317,6.113029790317121,7.988971226310168,7.01464648023348,0.1964510802392283,9.325167353874813,4.384014199151398,6.662344725834874,5.81970750462432,0.09686948308639032,3.2158928729866476,3.9360850108860634,9.843592613645118,9.738397465772845,7.838842872839534,9.264501767326133,4.007417486554504,0.9115558228806742,4.663818354003926,4.95685491345685,1.8213258890835538,1.2230565440472918,2.73939764405714,2.38149019632794,4.459583309924053,2.96098665001449,8.968125713441278,0.41284048061888123,1.2847807612955076,8.659156828687253,2.5123258556095984,2.741707698065343,1.796749205749919,1.5793646296909825,7.597820534761695,8.219978510457667,3.1169444089386067,1.7856841107431531,4.071287939142998,2.324142573554624,0.07640679760903657,5.567492740156579,6.531008408713803,5.083029039781031,4.786611283039788,5.33574833102227,8.985152626822028,4.0728563017431885,3.1100232033287445,5.663206310987827,9.48332765367108,7.453098734840255,2.556519619846147,1.2068875914926802,8.997905540003053,2.2874350447192904,7.872838167016171,7.383908994130404,8.114953113213229,4.015319613873607,1.9887493910793719,5.343225418207227,8.602157210787258,3.362329084938871,7.200283043248712,3.4597892354173188,8.628988219040153,4.78203961565357,5.368484612634314,6.0753998372857465,6.513981029003153,6.491545799691172,2.4394207225544218,3.204060600224241,4.278059051873653,2.761955645545069,7.54586335886221,8.683272085989199,4.386257553096846,0.40658522350214055,8.36021139258561,8.186285766037233,7.845842381842516,9.858479776310054,2.316943000630911,7.033424601878568,7.221796932707038,9.398222216490398,4.72600213575229,3.9795894075858818,6.292311257038405,0.47089736585439246,6.346918619905583,3.7870679279668407,6.108895216725512,9.03132967654367,8.163067063799357,9.953600213613566,6.584902556574681,5.656881454716888,4.015719488199547,0.9530804567835105,4.667630846795845,4.570419470675205,2.546403320814663,9.227077485882067,0.002692703545050801,9.833396288376242,2.4869957440236123,1.2687541465730012,3.9043792897158203,8.244635963639002,8.53019440711453,3.383126449426521,7.311745668515575,5.280280224519036,0.9034817365577985,8.249111361986433,4.987966313374443,5.637787046014713,3.9586336417948553,4.062217472748064,2.9771533818158846,8.554200180434455,3.1449983061737408,4.433530775545034,4.114910542291865,6.430542804218207,0.31956696180641675,9.785752226417603,8.487205863308771,9.12883665891675,9.763871065394419,7.176933579643164,5.74085334850901,3.559420403248439,7.295825877177915,4.859387479639114,3.2312118294346703,5.441157949247071,0.4587222858821294,1.2262616754382138,8.75099346340281,0.3524317055156678,6.516868821805872,0.3498036914611524,0.015529693592779559,4.9436302763504685,4.778117500585129,8.527239273985002,2.7205290439923258,3.700216788510353,6.573046210532427,8.778109305075606,4.814282853015954,8.800530527427053,9.68641661865256,7.764242849925038,9.063121704146424,8.500135787866705,5.089637548714827,4.7463178610935515,2.228246949114183,3.503577341090407,2.7623093116136155,5.11884187829785,5.55841755409717,2.013729723673656,8.588211875748712,7.955312482251628,1.4572776233005325,1.4223646800636613,6.3950202755585845,1.335447103283094,8.548085878361189,3.6972477259316827,1.479466466903896,1.327006964877715,4.11772282351701,7.839413759606053,3.5516477382116274,0.5192109621693253,1.8308495717724882,9.13418224775022,0.4802550918879178,1.2507567051695268,5.512731090095075,7.81600114096036,3.4850616731117667,6.4412827128552745,3.711261662921852,7.158457157400145,5.3910266029678215,5.7326151939890435,8.455742946669595,3.7358292837199802,3.5933578626929386,8.748070267697173,3.15942551430735,7.723150465935371,7.062125284399965,5.69537423122928,0.8474067991976875,7.930038643146828,0.48678878186618535,7.5072868951351595,8.704479933375413,6.689594576586224,8.201354969725411,7.3532322570768365,5.905920009781688,9.251429383485206,7.1880711336887515,4.1168162614022314,1.9973031120607487,1.2792239171194386,2.030613629198965,0.05909481855792098,9.514261309114989,7.295228625889676,5.279234121560483,5.100881141796892,2.2268080611939167,4.657427324808474,9.114851841867733,8.44589062058005,0.9615514260584312,3.4397112276365993,3.670070065394224,1.268041087341527,4.050710682263814,8.426378488374784,0.5434364550748749,7.6509056951502625,9.38216750268305,7.450222517787997,7.4982120511224455,2.856108971767568,1.3943869363455774,5.821501380597008,3.0054302504796993,3.634279121075392,4.823218808182914,4.46899428150865,7.838949424932249,6.300163067870093,3.5909096066720503,3.5367814865767566,3.9684326902312272,5.496155894539969,0.47285637547130444,5.102683984045038,0.5933036151935633,3.6707358154154934,8.283088791177608,8.058121749843941,1.1371974743562019,1.9242980770024443,8.400741176580675,8.15128782704614,2.968867633456407,1.3236410872169646]}
},{}],49:[function(require,module,exports){
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

var largeRate = require( './fixtures/julia/large_rate.json' );
var largeShape = require( './fixtures/julia/large_shape.json' );
var bothLarge = require( './fixtures/julia/both_large.json' );


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

	logpdf = factory( 1.0, 1.0 );
	y = logpdf( NaN );
	t.equal( isnan( y ), true, 'returns NaN' );

	logpdf = factory( NaN, 1.0 );
	y = logpdf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	logpdf = factory( 1.0, NaN );
	y = logpdf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	logpdf = factory( NaN, NaN );
	y = logpdf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	logpdf = factory( NaN, NaN );
	y = logpdf( NaN );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'if provided a finite `alpha` and `beta`, the function returns a function which returns `-Infinity` when provided `Infinity` for `x`', function test( t ) {
	var logpdf;
	var y;

	logpdf = factory( 0.5, 1.0 );
	y = logpdf( PINF );
	t.equal( y, NINF, 'returns -Infinity' );

	t.end();
});

tape( 'if provided a finite `alpha` and `beta`, the function returns a function which returns `-Infinity` when provided `-Infinity` for `x`', function test( t ) {
	var logpdf;
	var y;

	logpdf = factory( 0.5, 1.0 );
	y = logpdf( NINF );
	t.equal( y, NINF, 'returns -Infinity' );

	t.end();
});

tape( 'if provided `beta <= 0`, the created function always returns `NaN`', function test( t ) {
	var logpdf;
	var y;

	logpdf = factory( 0.0, -1.0 );

	y = logpdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = logpdf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	logpdf = factory( 0.0, NINF );
	y = logpdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	logpdf = factory( PINF, NINF );
	y = logpdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	logpdf = factory( NINF, NINF );
	y = logpdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	logpdf = factory( NaN, NINF );
	y = logpdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'if provided `alpha <= 0`, the created function always returns `NaN`', function test( t ) {
	var logpdf;
	var y;

	logpdf = factory( -1.0, 0.5 );

	y = logpdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = logpdf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	logpdf = factory( NINF, 1.0 );
	y = logpdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	logpdf = factory( NINF, PINF );
	y = logpdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	logpdf = factory( NINF, NINF );
	y = logpdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	logpdf = factory( NINF, NaN );
	y = logpdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'the created function evaluates the logpdf for `x` given large `alpha` and `beta`', function test( t ) {
	var expected;
	var delta;
	var alpha;
	var beta;
	var logpdf;
	var tol;
	var x;
	var y;
	var i;

	expected = bothLarge.expected;
	x = bothLarge.x;
	alpha = bothLarge.alpha;
	beta = bothLarge.beta;
	for ( i = 0; i < x.length; i++ ) {
		logpdf = factory( alpha[i], beta[i] );
		y = logpdf( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', alpha:'+alpha[i]+', beta: '+beta[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. alpha: '+alpha[i]+'. beta: '+beta[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the created function evaluates the logpdf for `x` given a large shape parameter `alpha`', function test( t ) {
	var expected;
	var delta;
	var alpha;
	var beta;
	var logpdf;
	var tol;
	var x;
	var y;
	var i;

	expected = largeShape.expected;
	x = largeShape.x;
	alpha = largeShape.alpha;
	beta = largeShape.beta;
	for ( i = 0; i < x.length; i++ ) {
		logpdf = factory( alpha[i], beta[i] );
		y = logpdf( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', alpha:'+alpha[i]+', beta: '+beta[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. alpha: '+alpha[i]+'. beta: '+beta[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the created function evaluates the logpdf for `x` given a large rate parameter `beta`', function test( t ) {
	var expected;
	var delta;
	var alpha;
	var beta;
	var logpdf;
	var tol;
	var x;
	var y;
	var i;

	expected = largeRate.expected;
	x = largeRate.x;
	alpha = largeRate.alpha;
	beta = largeRate.beta;
	for ( i = 0; i < x.length; i++ ) {
		logpdf = factory( alpha[i], beta[i] );
		y = logpdf( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', alpha:'+alpha[i]+', beta: '+beta[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 20.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. alpha: '+alpha[i]+'. beta: '+beta[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

}).call(this,"/lib/node_modules/@stdlib/math/base/dists/invgamma/logpdf/test/test.factory.js")
},{"./../lib/factory.js":43,"./fixtures/julia/both_large.json":46,"./fixtures/julia/large_rate.json":47,"./fixtures/julia/large_shape.json":48,"@stdlib/constants/math/float64-eps":26,"@stdlib/constants/math/float64-ninf":32,"@stdlib/constants/math/float64-pinf":34,"@stdlib/math/base/assert/is-nan":41,"@stdlib/math/base/special/abs":53,"tape":198}],50:[function(require,module,exports){
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

}).call(this,"/lib/node_modules/@stdlib/math/base/dists/invgamma/logpdf/test/test.js")
},{"./../lib":44,"tape":198}],51:[function(require,module,exports){
(function (__filename){
'use strict';

// MODULES //

var tape = require( 'tape' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var abs = require( '@stdlib/math/base/special/abs' );
var PINF = require( '@stdlib/constants/math/float64-pinf' );
var NINF = require( '@stdlib/constants/math/float64-ninf' );
var EPS = require( '@stdlib/constants/math/float64-eps' );
var logpdf = require( './../lib' );


// FIXTURES //

var largeRate = require( './fixtures/julia/large_rate.json' );
var largeShape = require( './fixtures/julia/large_shape.json' );
var bothLarge = require( './fixtures/julia/both_large.json' );


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

tape( 'if provided `Infinity` for `x` and a finite `alpha` and `beta`, the function returns `-Infinity`', function test( t ) {
	var y = logpdf( PINF, 1.0, 1.0 );
	t.equal( y, NINF, 'returns -Infinity' );
	t.end();
});

tape( 'if provided `-Infinity` for `x` and a finite `alpha` and `beta`, the function returns `-Infinity`', function test( t ) {
	var y = logpdf( NINF, 1.0, 1.0 );
	t.equal( y, NINF, 'returns -Infinity' );
	t.end();
});

tape( 'if provided `alpha <= 0`, the function returns `NaN`', function test( t ) {
	var y;

	y = logpdf( 2.0, -1.0, 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = logpdf( 0.0, -1.0, 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = logpdf( 2.0, NINF, 1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = logpdf( 2.0, NINF, PINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = logpdf( 2.0, NINF, NINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = logpdf( 2.0, NINF, NaN );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'if provided `beta <= 0`, the function returns `NaN`', function test( t ) {
	var y;

	y = logpdf( 2.0, 2.0, -1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = logpdf( 0.0, 2.0, -1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = logpdf( 2.0, 1.0, NINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = logpdf( 2.0, PINF, NINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = logpdf( 2.0, NINF, NINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = logpdf( 2.0, NaN, NINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'the function evaluates the logpdf for `x` given large `alpha` and `beta`', function test( t ) {
	var expected;
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
		y = logpdf( x[i], alpha[i], beta[i] );
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

tape( 'the function evaluates the logpdf for `x` given large shape parameter `alpha`', function test( t ) {
	var expected;
	var delta;
	var alpha;
	var beta;
	var tol;
	var i;
	var x;
	var y;

	expected = largeShape.expected;
	x = largeShape.x;
	alpha = largeShape.alpha;
	beta = largeShape.beta;
	for ( i = 0; i < x.length; i++ ) {
		y = logpdf( x[i], alpha[i], beta[i] );
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

tape( 'the function evaluates the logpdf for `x` given large rate parameter `beta`', function test( t ) {
	var expected;
	var delta;
	var alpha;
	var beta;
	var tol;
	var i;
	var x;
	var y;

	expected = largeRate.expected;
	x = largeRate.x;
	alpha = largeRate.alpha;
	beta = largeRate.beta;
	for ( i = 0; i < x.length; i++ ) {
		y = logpdf( x[i], alpha[i], beta[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', alpha: '+alpha[i]+', beta: '+beta[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 5.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. alpha: '+alpha[i]+'. beta: '+beta[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

}).call(this,"/lib/node_modules/@stdlib/math/base/dists/invgamma/logpdf/test/test.logpdf.js")
},{"./../lib":44,"./fixtures/julia/both_large.json":46,"./fixtures/julia/large_rate.json":47,"./fixtures/julia/large_shape.json":48,"@stdlib/constants/math/float64-eps":26,"@stdlib/constants/math/float64-ninf":32,"@stdlib/constants/math/float64-pinf":34,"@stdlib/math/base/assert/is-nan":41,"@stdlib/math/base/special/abs":53,"tape":198}],52:[function(require,module,exports){
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

},{}],53:[function(require,module,exports){
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

},{"./abs.js":52}],54:[function(require,module,exports){
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

},{}],55:[function(require,module,exports){
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

},{"./ceil.js":54}],56:[function(require,module,exports){
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

},{"@stdlib/number/float64/base/from-words":100,"@stdlib/number/float64/base/get-high-word":104,"@stdlib/number/float64/base/to-words":115}],57:[function(require,module,exports){
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

},{"./copysign.js":56}],58:[function(require,module,exports){
'use strict';

/*
* The following copyright, license, and long comment were part of the original implementation available as part of [FreeBSD]{@link https://svnweb.freebsd.org/base/release/9.3.0/lib/msun/src/s_cos.c?view=log}.
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
var kernelCos = require( '@stdlib/math/base/special/kernel-cos' );
var kernelSin = require( '@stdlib/math/base/special/kernel-sin' );
var rempio2 = require( '@stdlib/math/base/special/rempio2' );


// VARIABLES //

// Scratch array for storing temporary values. Note that, in C, this would not be thread safe.
var buffer = new Array( 2 );

// High word absolute value mask: 0x7fffffff => 01111111111111111111111111111111
var HIGH_WORD_ABS_MASK = 0x7fffffff|0; // asm type annotation

// High word of π/4: 0x3fe921fb => 00111111111010010010000111111011
var HIGH_WORD_PIO4 = 0x3fe921fb|0; // asm type annotation

// High word of 2^-27: 0x3e400000 => 00111110010000000000000000000000
var HIGH_WORD_TWO_NEG_27 = 0x3e400000|0; // asm type annotation

// High word exponent mask: 0x7ff00000 => 01111111111100000000000000000000
var HIGH_WORD_EXPONENT_MASK = 0x7ff00000|0; // asm type annotation


// MAIN //

/**
* Computes the cosine of a number.
*
* @param {number} x - input value (in radians)
* @returns {number} cosine
*
* @example
* var v = cos( 0.0 );
* // returns 1.0
*
* @example
* var v = cos( Math.PI/4.0 );
* // returns ~0.707
*
* @example
* var v = cos( -Math.PI/6.0 );
* // returns ~0.866
*
* @example
* var v = cos( NaN );
* // returns NaN
*/
function cos( x ) {
	var ix;
	var n;

	ix = getHighWord( x );
	ix &= HIGH_WORD_ABS_MASK;

	// Case: |x| ~< pi/4
	if ( ix <= HIGH_WORD_PIO4 ) {
		// Case: x < 2**-27
		if ( ix < HIGH_WORD_TWO_NEG_27 ) {
			return 1.0;
		}
		return kernelCos( x, 0.0 );
	}
	// Case: cos(Inf or NaN) is NaN */
	if ( ix >= HIGH_WORD_EXPONENT_MASK ) {
		return NaN;
	}
	// Case: Argument reduction needed...
	n = rempio2( x, buffer );
	switch ( n & 3 ) {
	case 0:
		return kernelCos( buffer[ 0 ], buffer[ 1 ] );
	case 1:
		return -kernelSin( buffer[ 0 ], buffer[ 1 ] );
	case 2:
		return -kernelCos( buffer[ 0 ], buffer[ 1 ] );
	default:
		return kernelSin( buffer[ 0 ], buffer[ 1 ] );
	}
}


// EXPORTS //

module.exports = cos;

},{"@stdlib/math/base/special/kernel-cos":74,"@stdlib/math/base/special/kernel-sin":78,"@stdlib/math/base/special/rempio2":86,"@stdlib/number/float64/base/get-high-word":104}],59:[function(require,module,exports){
'use strict';

/**
* Compute the cosine of a number.
*
* @module @stdlib/math/base/special/cos
*
* @example
* var cos = require( '@stdlib/math/base/special/cos' );
*
* var v = cos( 0.0 );
* // returns 1.0
*
* v = cos( Math.PI/4.0 );
* // returns ~0.707
*
* v = cos( -Math.PI/6.0 );
* // returns ~0.866
*/

// MODULES //

var cos = require( './cos.js' );


// EXPORTS //

module.exports = cos;

},{"./cos.js":58}],60:[function(require,module,exports){
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

},{}],61:[function(require,module,exports){
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

},{"./floor.js":60}],62:[function(require,module,exports){
'use strict';

/*
* The original C code, long comment, copyright, license, and constants are from [FreeBSD]{@link https://svnweb.freebsd.org/base/release/9.3.0/lib/msun/src/e_lgamma_r.c?revision=268523&view=co}.
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

var isnan = require( '@stdlib/math/base/assert/is-nan' );
var isInfinite = require( '@stdlib/math/base/assert/is-infinite' );
var abs = require( '@stdlib/math/base/special/abs' );
var ln = require( '@stdlib/math/base/special/ln' );
var trunc = require( '@stdlib/math/base/special/trunc' );
var sinpi = require( '@stdlib/math/base/special/sinpi' );
var PI = require( '@stdlib/constants/math/float64-pi' );
var PINF = require( '@stdlib/constants/math/float64-pinf' );
var polyvalA1 = require( './polyval_a1.js' );
var polyvalA2 = require( './polyval_a2.js' );
var polyvalR = require( './polyval_r.js' );
var polyvalS = require( './polyval_s.js' );
var polyvalT1 = require( './polyval_t1.js' );
var polyvalT2 = require( './polyval_t2.js' );
var polyvalT3 = require( './polyval_t3.js' );
var polyvalU = require( './polyval_u.js' );
var polyvalV = require( './polyval_v.js' );
var polyvalW = require( './polyval_w.js' );


// VARIABLES //

var A1C = 7.72156649015328655494e-02; // 0x3FB3C467E37DB0C8
var A2C = 3.22467033424113591611e-01; // 0x3FD4A34CC4A60FAD
var RC = 1.0;
var SC = -7.72156649015328655494e-02; // 0xBFB3C467E37DB0C8
var T1C = 4.83836122723810047042e-01; // 0x3FDEF72BC8EE38A2
var T2C = -1.47587722994593911752e-01; // 0xBFC2E4278DC6C509
var T3C = 6.46249402391333854778e-02; // 0x3FB08B4294D5419B
var UC = -7.72156649015328655494e-02; // 0xBFB3C467E37DB0C8
var VC = 1.0;
var WC = 4.18938533204672725052e-01; // 0x3FDACFE390C97D69
var YMIN = 1.461632144968362245;
var TWO52 = 4503599627370496; // 2**52
var TWO58 = 288230376151711744; // 2**58
var TINY = 8.470329472543003e-22;
var TC = 1.46163214496836224576e+00; // 0x3FF762D86356BE3F
var TF = -1.21486290535849611461e-01; // 0xBFBF19B9BCC38A42
var TT = -3.63867699703950536541e-18; // 0xBC50C7CAA48A971F => TT = -(tail of TF)


// MAIN //

/**
* Evaluates the natural logarithm of the gamma function.
*
* ## Method
*
* 1.  Argument reduction for \\(0 < x \leq 8\\). Since \\(\Gamma(1+s) = s \Gamma(s)\\), for \\(x \in [0,8]\\), we may reduce \\(x\\) to a number in \\([1.5,2.5]\\) by
*
*     ```tex
*     \operatorname{lgamma}(1+s) = \ln(s) + \operatorname{lgamma}(s)
*     ```
*
*     For example,
*
*     ```tex
*     \begin{align}
*     \operatorname{lgamma}(7.3) &= \ln(6.3) + \operatorname{lgamma}(6.3) \\
*     &= \ln(6.3 \cdot 5.3) + \operatorname{lgamma}(5.3) \\
*     &= \ln(6.3 \cdot 5.3 \cdot 4.3 \cdot 3.3 \cdot2.3) + \operatorname{lgamma}(2.3)
*     \end{align}
*     ```
*
* 2.  Compute a polynomial approximation of \\(\mathrm{lgamma}\\) around its
minimum (\\(\mathrm{ymin} = 1.461632144968362245\\)) to maintain monotonicity. On the interval \\([\mathrm{ymin} - 0.23, \mathrm{ymin} + 0.27]\\) (i.e., \\([1.23164,1.73163]\\)), we let \\(z = x - \mathrm{ymin}\\) and use
*
*     ```tex
*     \operatorname{lgamma}(x) = -1.214862905358496078218 + z^2 \cdot \operatorname{poly}(z)
*     ```
*
*     where \\(\operatorname{poly}(z)\\) is a \\(14\\) degree polynomial.
*
* 3.  Compute a rational approximation in the primary interval \\([2,3]\\). Let \\( s = x - 2.0 \\). We can thus use the approximation
*
*     ```tex
*     \operatorname{lgamma}(x) = \frac{s}{2} + s\frac{\operatorname{P}(s)}{\operatorname{Q}(s)}
*     ```
*
*     with accuracy
*
*     ```tex
*     \biggl|\frac{\mathrm{P}}{\mathrm{Q}} - \biggr(\operatorname{lgamma}(x)-\frac{s}{2}\biggl)\biggl| < 2^{-61.71}
*     ```
*
*     The algorithms are based on the observation
*
*     ```tex
*     \operatorname{lgamma}(2+s) = s(1 - \gamma) + \frac{\zeta(2) - 1}{2} s^2 - \frac{\zeta(3) - 1}{3} s^3 + \ldots
*     ```
*
*     where \\(\zeta\\) is the zeta function and \\(\gamma = 0.5772156649...\\) is the Euler-Mascheroni constant, which is very close to \\(0.5\\).
*
* 3.  For \\(x \geq 8\\),
*
*     ```tex
*     \operatorname{lgamma}(x) \approx \biggl(x-\frac{1}{2}\biggr) \ln(x) - x + \frac{\ln(2\pi)}{2} + \frac{1}{12x} - \frac{1}{360x^3} + \ldots
*     ```
*
*     which can be expressed
*
*     ```tex
*     \operatorname{lgamma}(x) \approx \biggl(x-\frac{1}{2}\biggr)(\ln(x)-1)-\frac{\ln(2\pi)-1}{2} + \ldots
*     ```
*
*     Let \\(z = \frac{1}{x}\\). We can then use the approximation
*
*     ```tex
*     f(z) = \operatorname{lgamma}(x) - \biggl(x-\frac{1}{2}\biggr)(\ln(x)-1)
*     ```
*
*     by
*
*     ```tex
*     w = w_0 + w_1 z + w_2 z^3 + w_3 z^5 + \ldots + w_6 z^{11}
*     ```

*     where
*
*     ```tex
*     |w - f(z)| < 2^{-58.74}
*     ```
*
* 4.  For negative \\(x\\), since
*
*     ```tex
*     -x \Gamma(-x) \Gamma(x) = \frac{\pi}{\sin(\pi x)}
*     ```
*
*     where \\(\Gamma\\) is the gamma function, we have
*
*     ```tex
*     \Gamma(x) = \frac{\pi}{\sin(\pi x)(-x)\Gamma(-x)}
*     ```
*
*     Since \\(\Gamma(-x)\\) is positive,
*
*     ```tex
*     \operatorname{sign}(\Gamma(x)) = \operatorname{sign}(\sin(\pi x))
*     ```
*
*     for \\(x < 0\\). Hence, for \\(x < 0\\),
*
*     ```tex
*     \mathrm{signgam} = \operatorname{sign}(\sin(\pi x))
*     ```
*
*     and
*
*     ```tex
*     \begin{align}
*     \operatorname{lgamma}(x) &= \ln(|\Gamma(x)|) \\
*     &= \ln\biggl(\frac{\pi}{|x \sin(\pi x)|}\biggr) - \operatorname{lgamma}(-x)
*     \end{align}
*     ```
*
*     <!-- <note> -->
*
*     Note that one should avoid computing \\(\pi (-x)\\) directly in the computation of \\(\sin(\pi (-x))\\).
*
*     <!-- </note> -->
*
*
* ## Special Cases
*
* ```tex
* \begin{align}
* \operatorname{lgamma}(2+s) &\approx s (1-\gamma) & \mathrm{for\ tiny\ s} \\
* \operatorname{lgamma}(x) &\approx -\ln(x) & \mathrm{for\ tiny\ x} \\
* \operatorname{lgamma}(1) &= 0 & \\
* \operatorname{lgamma}(2) &= 0 & \\
* \operatorname{lgamma}(0) &= \infty & \\
* \operatorname{lgamma}(\infty) &= \infty & \\
* \operatorname{lgamma}(-\mathrm{integer}) &= \pm \infty
* \end{align}
* ```
*
*
* @param {number} x - input value
* @returns {number} function value
*
* @example
* var v = gammaln( 1.0 );
* // returns 0.0
*
* @example
* var v = gammaln( 2.0 );
* // returns 0.0
*
* @example
* var v = gammaln( 4.0 );
* // returns ~1.792
*
* @example
* var v = gammaln( -0.5 );
* // returns ~1.266
*
* @example
* var v = gammaln( 0.5 );
* // returns ~0.572
*
* @example
* var v = gammaln( 0.0 );
* // returns Infinity
*
* @example
* var v = gammaln( NaN );
* // returns NaN
*/
function gammaln( x ) {
	var isNegative;
	var nadj;
	var flg;
	var p3;
	var p2;
	var p1;
	var p;
	var q;
	var t;
	var w;
	var y;
	var z;
	var r;

	// Special cases: NaN, +-infinity
	if ( isnan( x ) || isInfinite( x ) ) {
		return x;
	}
	// Special case: 0
	if ( x === 0.0 ) {
		return PINF;
	}
	if ( x < 0.0 ) {
		isNegative = true;
		x = -x;
	} else {
		isNegative = false;
	}
	// If |x| < 2**-70, return -ln(|x|)
	if ( x < TINY ) {
		return -ln( x );
	}
	if ( isNegative ) {
		// If |x| >= 2**52, must be -integer
		if ( x >= TWO52 ) {
			return PINF;
		}
		t = sinpi( x );
		if ( t === 0.0 ) {
			return PINF;
		}
		nadj = ln( PI / abs( t*x ) );
	}
	// If x equals 1 or 2, return 0
	if ( x === 1.0 || x === 2.0 ) {
		return 0.0;
	}
	// If x < 2, use lgamma(x) = lgamma(x+1) - log(x)
	if ( x < 2.0 ) {
		if ( x <= 0.9 ) {
			r = -ln( x );

			// 0.7316 <= x <=  0.9
			if ( x >= ( YMIN - 1.0 + 0.27 ) ) {
				y = 1.0 - x;
				flg = 0;
			}
			// 0.2316 <= x < 0.7316
			else if ( x >= (YMIN - 1.0 - 0.27) ) {
				y = x - (TC - 1.0);
				flg = 1;
			}
			// 0 < x < 0.2316
			else {
				y = x;
				flg = 2;
			}
		} else {
			r = 0.0;

			// 1.7316 <= x < 2
			if ( x >= (YMIN + 0.27) ) {
				y = 2.0 - x;
				flg = 0;
			}
			// 1.2316 <= x < 1.7316
			else if ( x >= (YMIN - 0.27) ) {
				y = x - TC;
				flg = 1;
			}
			// 0.9 < x < 1.2316
			else {
				y = x - 1.0;
				flg = 2;
			}
		}
		switch ( flg ) { // eslint-disable-line default-case
		case 0:
			z = y * y;
			p1 = A1C + (z*polyvalA1( z ));
			p2 = z * (A2C + (z*polyvalA2( z )));
			p = (y*p1) + p2;
			r += ( p - (0.5*y) );
			break;
		case 1:
			z = y * y;
			w = z * y;
			p1 = T1C + (w*polyvalT1( w ));
			p2 = T2C + (w*polyvalT2( w ));
			p3 = T3C + (w*polyvalT3( w ));
			p = (z*p1) - (TT - (w*(p2+(y*p3))));
			r += ( TF + p );
			break;
		case 2:
			p1 = y * (UC + (y*polyvalU( y )));
			p2 = VC + (y*polyvalV( y ));
			r += (-0.5*y) + (p1/p2);
			break;
		}
	}
	// 2 <= x < 8
	else if ( x < 8.0 ) {
		flg = trunc( x );
		y = x - flg;
		p = y * (SC + (y*polyvalS( y )));
		q = RC + (y*polyvalR( y ));
		r = (0.5*y) + (p/q);
		z = 1.0; // gammaln(1+s) = ln(s) + gammaln(s)
		switch ( flg ) { // eslint-disable-line default-case
		case 7:
			z *= y + 6.0;

			/* falls through */
		case 6:
			z *= y + 5.0;

			/* falls through */
		case 5:
			z *= y + 4.0;

			/* falls through */
		case 4:
			z *= y + 3.0;

			/* falls through */
		case 3:
			z *= y + 2.0;
			r += ln( z );
		}
	}
	// 8 <= x < 2**58
	else if ( x < TWO58 ) {
		t = ln( x );
		z = 1.0 / x;
		y = z * z;
		w = WC + (z*polyvalW( y ));
		r = ((x-0.5)*(t-1.0)) + w;
	}
	// 2**58 <= x <= Inf
	else {
		r = x * ( ln(x)-1.0 );
	}
	if ( isNegative ) {
		r = nadj - r;
	}
	return r;
}


// EXPORTS //

module.exports = gammaln;

},{"./polyval_a1.js":64,"./polyval_a2.js":65,"./polyval_r.js":66,"./polyval_s.js":67,"./polyval_t1.js":68,"./polyval_t2.js":69,"./polyval_t3.js":70,"./polyval_u.js":71,"./polyval_v.js":72,"./polyval_w.js":73,"@stdlib/constants/math/float64-pi":33,"@stdlib/constants/math/float64-pinf":34,"@stdlib/math/base/assert/is-infinite":39,"@stdlib/math/base/assert/is-nan":41,"@stdlib/math/base/special/abs":53,"@stdlib/math/base/special/ln":82,"@stdlib/math/base/special/sinpi":94,"@stdlib/math/base/special/trunc":96}],63:[function(require,module,exports){
'use strict';

/**
* Evaluate the natural logarithm of the gamma function.
*
* @module @stdlib/math/base/special/gammaln
*
* @example
* var gammaln = require( '@stdlib/math/base/special/gammaln' );
*
* var v = gammaln( 1.0 );
* // returns 0.0
*
* v = gammaln( 2.0 );
* // returns 0.0
*
* v = gammaln( 4.0 );
* // returns ~1.792
*
* v = gammaln( -0.5 );
* // returns ~1.266
*
* v = gammaln( 0.5 );
* // returns ~0.572
*
* v = gammaln( 0.0 );
* // returns Infinity
*
* v = gammaln( NaN );
* // returns NaN
*/

// MODULES //

var gammaln = require( './gammaln.js' );


// EXPORTS //

module.exports = gammaln;

},{"./gammaln.js":62}],64:[function(require,module,exports){
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
		return 0.06735230105312927;
	}
	return 0.06735230105312927 + (x * (0.007385550860814029 + (x * (0.0011927076318336207 + (x * (0.00022086279071390839 + (x * 0.000025214456545125733))))))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

},{}],65:[function(require,module,exports){
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
		return 0.020580808432516733;
	}
	return 0.020580808432516733 + (x * (0.0028905138367341563 + (x * (0.0005100697921535113 + (x * (0.00010801156724758394 + (x * 0.000044864094961891516))))))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

},{}],66:[function(require,module,exports){
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
		return 1.3920053346762105;
	}
	return 1.3920053346762105 + (x * (0.7219355475671381 + (x * (0.17193386563280308 + (x * (0.01864591917156529 + (x * (0.0007779424963818936 + (x * 0.000007326684307446256))))))))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

},{}],67:[function(require,module,exports){
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
		return 0.21498241596060885;
	}
	return 0.21498241596060885 + (x * (0.325778796408931 + (x * (0.14635047265246445 + (x * (0.02664227030336386 + (x * (0.0018402845140733772 + (x * 0.00003194753265841009))))))))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

},{}],68:[function(require,module,exports){
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
		return -0.032788541075985965;
	}
	return -0.032788541075985965 + (x * (0.006100538702462913 + (x * (-0.0014034646998923284 + (x * 0.00031563207090362595))))); // eslint-disable-line max-len
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
		return 0.01797067508118204;
	}
	return 0.01797067508118204 + (x * (-0.0036845201678113826 + (x * (0.000881081882437654 + (x * -0.00031275416837512086))))); // eslint-disable-line max-len
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
		return -0.010314224129834144;
	}
	return -0.010314224129834144 + (x * (0.0022596478090061247 + (x * (-0.0005385953053567405 + (x * 0.0003355291926355191))))); // eslint-disable-line max-len
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
		return 0.6328270640250934;
	}
	return 0.6328270640250934 + (x * (1.4549225013723477 + (x * (0.9777175279633727 + (x * (0.22896372806469245 + (x * 0.013381091853678766))))))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

},{}],72:[function(require,module,exports){
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
		return 2.4559779371304113;
	}
	return 2.4559779371304113 + (x * (2.128489763798934 + (x * (0.7692851504566728 + (x * (0.10422264559336913 + (x * 0.003217092422824239))))))); // eslint-disable-line max-len
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
		return 0.08333333333333297;
	}
	return 0.08333333333333297 + (x * (-0.0027777777772877554 + (x * (0.0007936505586430196 + (x * (-0.00059518755745034 + (x * (0.0008363399189962821 + (x * -0.0016309293409657527))))))))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

},{}],74:[function(require,module,exports){
'use strict';

/**
* Compute the cosine of a number on `[-π/4, π/4]`.
*
* @module @stdlib/math/base/special/kernel-cos
*
* @example
* var kernelCos = require( '@stdlib/math/base/special/kernel-cos' );
*
* var v = kernelCos( 0.0, 0.0 );
* // returns ~1.0
*
* v = kernelCos( Math.PI/6.0, 0.0 );
* // returns ~0.866
*
* v = kernelCos( 0.785, -1.144e-17 );
* // returns ~0.707
*
* v = kernelCos( NaN, 0.0 );
* // returns NaN
*/

// MODULES //

var kernelCos = require( './kernel_cos.js' );


// EXPORTS //

module.exports = kernelCos;

},{"./kernel_cos.js":75}],75:[function(require,module,exports){
'use strict';

/*
* The following copyright, license, and long comment were part of the original implementation available as part of [FreeBSD]{@link https://svnweb.freebsd.org/base/release/9.3.0/lib/msun/src/k_cos.c?view=co}.
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

var polyval13 = require( './polyval_c13.js' );
var polyval46 = require( './polyval_c46.js' );


// MAIN //

/**
* Computes the cosine on \\( [-\pi/4, \pi/4] \\), where \\( \pi/4 \approx 0.785398164 \\).
*
* ## Method
*
* -   Since \\( \cos(-x) = \cos(x) \\), we need only to consider positive \\(x\\).
*
* -   If \\( x < 2^{-27} \\), return \\(1\\) which is inexact if \\( x \ne 0 \\).
*
* -   \\( cos(x) \\) is approximated by a polynomial of degree \\(14\\) on \\( [0,\pi/4] \\).
*
*     ```tex
*     \cos(x) \approx 1 - \frac{x \cdot x}{2} + C_1 \cdot x^4 + \ldots + C_6 \cdot x^{14}
*     ```
*
*     where the Remez error is
*
*     ```tex
*     \left| \cos(x) - \left( 1 - \frac{x^2}{2} + C_1x^4 + C_2x^6 + C_3x^8 + C_4x^{10} + C_5x^{12} + C_6x^{15} \right) \right| \le 2^{-58}
*     ```
*
* -   Let \\( C_1x^4 + C_2x^6 + C_3x^8 + C_4x^{10} + C_5x^{12} + C_6x^{14} \\), then
*
*     ```tex
*     \cos(x) \approx 1 - \frac{x \cdot x}{2} + r
*     ```
*
*     Since
*
*     ```tex
*     \cos(x+y) \approx \cos(x) - \sin(x) \cdot y \approx \cos(x) - x \cdot y
*     ```

*     a correction term is necessary in \\( \cos(x) \\). Hence,
*
*     ```tex
*     \cos(x+y) = 1 - \left( \frac{x \cdot x}{2} - (r - x \cdot y) \right)
*     ```
*
*     For better accuracy, rearrange to
*
*     ```tex
*     \cos(x+y) \approx w + \left( t + ( r - x \cdot y ) \right)
*     ```
*
*     where \\( w = 1 - \frac{x \cdot x}{2} \\) and \\( t \\) is a tiny correction term (\\( 1 - \frac{x \cdot x}{2} = w + t \\) exactly in infinite precision). The exactness of \\(w + t\\) in infinite precision depends on \\(w\\) and \\(t\\) having the same precision as \\(x\\).
*
*
* @param {number} x - input value (in radians, assumed to be bounded by ~pi/4 in magnitude)
* @param {number} y - tail of `x`
* @returns {number} cosine
*
* @example
* var v = kernelCos( 0.0, 0.0 );
* // returns ~1.0
*
* @example
* var v = kernelCos( Math.PI/6.0, 0.0 );
* // returns ~0.866
*
* @example
* var v = kernelCos( 0.785, -1.144e-17 );
* // returns ~0.707
*
* @example
* var v = kernelCos( NaN, 0.0 );
* // returns NaN
*/
function kernelCos( x, y ) {
	var hz;
	var r;
	var w;
	var z;

	z = x * x;
	w = z * z;
	r = z * polyval13( z );
	r += w * w * polyval46( z );
	hz = 0.5 * z;
	w = 1.0 - hz;
	return w + ( ((1.0-w) - hz) + ((z*r) - (x*y)) );
}


// EXPORTS //

module.exports = kernelCos;

},{"./polyval_c13.js":76,"./polyval_c46.js":77}],76:[function(require,module,exports){
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
		return 0.0416666666666666;
	}
	return 0.0416666666666666 + (x * (-0.001388888888887411 + (x * 0.00002480158728947673))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

},{}],77:[function(require,module,exports){
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
		return -2.7557314351390663e-7;
	}
	return -2.7557314351390663e-7 + (x * (2.087572321298175e-9 + (x * -1.1359647557788195e-11))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

},{}],78:[function(require,module,exports){
'use strict';

/**
* Compute the sine of a number on `[-π/4, π/4]`.
*
* @module @stdlib/math/base/special/kernel-sin
*
* @example
* var kernelSin = require( '@stdlib/math/base/special/kernel-sin' );
*
* var v = kernelSin( 0.0, 0.0 );
* // returns ~0.0
*
* v = kernelSin( Math.PI/6.0, 0.0 );
* // returns ~0.5
*
* v = kernelSin( 0.619, 9.279e-18 );
* // returns ~0.581
*
* v = kernelSin( NaN, 0.0 );
* // returns NaN
*
* v = kernelSin( 3.0, NaN );
* // returns NaN
*
* v = kernelSin( NaN, NaN );
* // returns NaN
*/

// MODULES //

var kernelSin = require( './kernel_sin.js' );


// EXPORTS //

module.exports = kernelSin;

},{"./kernel_sin.js":79}],79:[function(require,module,exports){
'use strict';

/*
* The following copyright, license, and long comment were part of the original implementation available as part of [FreeBSD]{@link https://svnweb.freebsd.org/base/release/9.3.0/lib/msun/src/k_sin.c?view=co}.
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

// VARIABLES //

var S1 = -1.66666666666666324348e-01; // 0xBFC55555, 0x55555549
var S2 = 8.33333333332248946124e-03;  // 0x3F811111, 0x1110F8A6
var S3 = -1.98412698298579493134e-04; // 0xBF2A01A0, 0x19C161D5
var S4 = 2.75573137070700676789e-06;  // 0x3EC71DE3, 0x57B1FE7D
var S5 = -2.50507602534068634195e-08; // 0xBE5AE5E6, 0x8A2B9CEB
var S6 = 1.58969099521155010221e-10;  // 0x3DE5D93A, 0x5ACFD57C


// MAIN //

/**
* Computes the sine on \\( \approx [-\pi/4, \pi/4] \\) (except on \\(-0\\)), where \\( \pi/4 \approx 0.7854 \\).
*
* ## Method
*
* -   Since \\( \sin(-x) = -\sin(x) \\), we need only to consider positive \\(x\\).
*
* -   Callers must return \\( \sin(-0) = -0 \\) without calling here since our odd polynomial is not evaluated in a way that preserves \\(-0\\). Callers may do the optimization \\( \sin(x) \approx x \\) for tiny \\(x\\).
*
* -   \\( \sin(x) \\) is approximated by a polynomial of degree \\(13\\) on \\( \left[0,\tfrac{pi}{4}\right] \\)
*
*     ```tex
*     \sin(x) \approx x + S_1 \cdot x^3 + \ldots + S_6 \cdot x^{13}
*     ```
*
*     where
*
*     ```tex
*     \left| \frac{\sin(x)}{x} \left( 1 + S_1 \cdot x + S_2 \cdot x + S_3 \cdot x + S_4 \cdot x + S_5 \cdot x + S_6 \cdot x \right) \right| \le 2^{-58}
*     ```
*
* -   We have
*
*     ```tex
*     \sin(x+y) = \sin(x) + \sin'(x') \cdot y \approx \sin(x) + (1-x*x/2) \cdot y
*     ```
*
*     For better accuracy, let
*
*     ```tex
*     r = x^3 * \left( S_2 + x^2 \cdot \left( S_3 + x^2 * \left( S_4 + x^2 \cdot ( S_5+x^2 \cdot S_6 ) \right) \right) \right)
*     ```
*
*     then
*
*     ```tex
*     \sin(x) = x + \left( S_1 \cdot x + ( x \cdot (r-y/2) + y ) \right)
*     ```
*
*
* @param {number} x - input value (in radians, assumed to be bounded by `~pi/4` in magnitude)
* @param {number} y - tail of `x`
* @returns {number} sine
*
* @example
* var v = kernelSin( 0.0, 0.0 );
* // returns ~0.0
*
* @example
* var v = kernelSin( Math.PI/6.0, 0.0 );
* // returns ~0.5
*
* @example
* var v = kernelSin( 0.619, 9.279e-18 );
* // returns ~0.581
*
* @example
* var v = kernelSin( NaN, 0.0 );
* // returns NaN
*
* @example
* var v = kernelSin( 3.0, NaN );
* // returns NaN
*
* @example
* var v = kernelSin( NaN, NaN );
* // returns NaN
*/
function kernelSin( x, y ) {
	var r;
	var v;
	var w;
	var z;

	z = x * x;
	w = z * z;
	r = S2 + (z * (S3 + (z*S4))) + (z * w * (S5 + (z*S6)));
	v = z * x;
	if ( y === 0.0 ) {
		return x + (v * (S1 + (z*r)));
	}
	return x - (((z*((0.5*y) - (v*r))) - y) - (v*S1));
}


// EXPORTS //

module.exports = kernelSin;

},{}],80:[function(require,module,exports){
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

},{"./ldexp.js":81}],81:[function(require,module,exports){
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

},{"@stdlib/constants/math/float64-exponent-bias":27,"@stdlib/constants/math/float64-max-base2-exponent":30,"@stdlib/constants/math/float64-max-base2-exponent-subnormal":29,"@stdlib/constants/math/float64-min-base2-exponent-subnormal":31,"@stdlib/constants/math/float64-ninf":32,"@stdlib/constants/math/float64-pinf":34,"@stdlib/math/base/assert/is-infinite":39,"@stdlib/math/base/assert/is-nan":41,"@stdlib/math/base/special/copysign":57,"@stdlib/number/float64/base/exponent":98,"@stdlib/number/float64/base/from-words":100,"@stdlib/number/float64/base/normalize":109,"@stdlib/number/float64/base/to-words":115}],82:[function(require,module,exports){
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

},{"./ln.js":83}],83:[function(require,module,exports){
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

},{"./polyval_p.js":84,"./polyval_q.js":85,"@stdlib/constants/math/float64-exponent-bias":27,"@stdlib/constants/math/float64-ninf":32,"@stdlib/math/base/assert/is-nan":41,"@stdlib/number/float64/base/get-high-word":104,"@stdlib/number/float64/base/set-high-word":113}],84:[function(require,module,exports){
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

},{}],85:[function(require,module,exports){
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

},{}],86:[function(require,module,exports){
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

},{"./rempio2.js":88}],87:[function(require,module,exports){
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

},{"@stdlib/math/base/special/floor":61,"@stdlib/math/base/special/ldexp":80}],88:[function(require,module,exports){
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

},{"./kernel_rempio2.js":87,"./rempio2_medium.js":89,"@stdlib/number/float64/base/from-words":100,"@stdlib/number/float64/base/get-high-word":104,"@stdlib/number/float64/base/get-low-word":106}],89:[function(require,module,exports){
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

},{"@stdlib/math/base/special/round":90,"@stdlib/number/float64/base/get-high-word":104}],90:[function(require,module,exports){
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

},{"./round.js":91}],91:[function(require,module,exports){
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

},{}],92:[function(require,module,exports){
'use strict';

/**
* Compute the sine of a number.
*
* @module @stdlib/math/base/special/sin
*
* @example
* var sin = require( '@stdlib/math/base/special/sin' );
*
* var v = sin( 0.0 );
* // returns ~0.0
*
* v = sin( Math.PI/2.0 );
* // returns ~1.0
*
* v = sin( -Math.PI/6.0 );
* // returns ~-0.5
*
* v = sin( NaN );
* // returns NaN
*/

// MODULES //

var sin = require( './sin.js' );


// EXPORTS //

module.exports = sin;

},{"./sin.js":93}],93:[function(require,module,exports){
'use strict';

/*
* The following copyright, license, and long comment were part of the original implementation available as part of [FreeBSD]{@link https://svnweb.freebsd.org/base/release/9.3.0/lib/msun/src/s_sin.c?view=log}.
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
var kernelCos = require( '@stdlib/math/base/special/kernel-cos' );
var kernelSin = require( '@stdlib/math/base/special/kernel-sin' );
var rempio2 = require( '@stdlib/math/base/special/rempio2' );


// VARIABLES //

// Absolute value mask: 0x7fffffff = 2147483647 => 01111111111111111111111111111111
var ABS_MASK = 0x7fffffff|0; // asm type annotation

// Exponent mask: 0x7ff00000 = 2146435072 => 01111111111100000000000000000000
var EXPONENT_MASK = 0x7ff00000|0; // asm type annotation

// High word for PI/4: 0x3fe921fb = 1072243195 => 00111111111010010010000111111011
var PIO4_HIGH_WORD = 0x3fe921fb|0; // asm type annotation

// 2^-26 = 1.4901161193847656e-8 => 0011111001010000000000000000000000000000000000000000000000000000 => high word => 00111110010100000000000000000000 => 0x3e500000 = 1045430272
var SMALL_HIGH_WORD = 0x3e500000|0; // asm type annotation

// Array for storing remainder elements:
var Y = [ 0.0, 0.0 ]; // WARNING: not thread safe


// MAIN //

/**
* Computes the sine of a number.
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
*     | 0 |   S    |   C    |    T   |
*     | 1 |   C    |  -S    |  -1/T  |
*     | 2 |  -S    |  -C    |    T   |
*     | 3 |  -C    |   S    |  -1/T  |
*
*
* @param {number} x - input value (in radians)
* @returns {number} sine
*
* @example
* var v = sin( 0.0 );
* // returns ~0.0
*
* @example
* var v = sin( Math.PI/2.0 );
* // returns ~1.0
*
* @example
* var v = sin( -Math.PI/6.0 );
* // returns ~-0.5
*
* @example
* var v = sin( NaN );
* // returns NaN
*/
function sin( x ) {
	var ix;
	var n;

	ix = getHighWord( x );
	ix &= ABS_MASK;

	// Case: |x| ~< π/4
	if ( ix <= PIO4_HIGH_WORD ) {
		// Case: |x| ~< 2^-26
		if ( ix < SMALL_HIGH_WORD ) {
			return x;
		}
		return kernelSin( x, 0.0 );
	}
	// Case: x is NaN or infinity
	if ( ix >= EXPONENT_MASK ) {
		return NaN;
	}
	// Argument reduction...
	n = rempio2( x, Y );
	switch ( n & 3 ) {
	case 0:
		return kernelSin( Y[ 0 ], Y[ 1 ] );
	case 1:
		return kernelCos( Y[ 0 ], Y[ 1 ] );
	case 2:
		return -kernelSin( Y[ 0 ], Y[ 1 ] );
	default:
		return -kernelCos( Y[ 0 ], Y[ 1 ] );
	}
}


// EXPORTS //

module.exports = sin;

},{"@stdlib/math/base/special/kernel-cos":74,"@stdlib/math/base/special/kernel-sin":78,"@stdlib/math/base/special/rempio2":86,"@stdlib/number/float64/base/get-high-word":104}],94:[function(require,module,exports){
'use strict';

/**
* Compute the value of `sin(πx)`.
*
* @module @stdlib/math/base/special/sinpi
*
* @example
* var sinpi = require( '@stdlib/math/base/special/sinpi' );
*
* var y = sinpi( 0.0 );
* // returns 0.0
*
* y = sinpi( 0.5 );
* // returns 1.0
*
* y = sinpi( 0.9 );
* // returns ~0.309
*
* y = sinpi( NaN );
* // returns NaN
*/

// MODULES //

var sinpi = require( './sinpi.js' );


// EXPORTS //

module.exports = sinpi;

},{"./sinpi.js":95}],95:[function(require,module,exports){
'use strict';

/*
* Notes:
*	=> sin(-x) = -sin(x)
*	=> sin(+n) = +0, where `n` is a positive integer
*	=> sin(-n) = -sin(+n) = -0, where `n` is a positive integer
*	=> cos(-x) = cos(x)
*/


// MODULES //

var isnan = require( '@stdlib/math/base/assert/is-nan' );
var isInfinite = require( '@stdlib/math/base/assert/is-infinite' );
var cos = require( '@stdlib/math/base/special/cos' );
var sin = require( '@stdlib/math/base/special/sin' );
var abs = require( '@stdlib/math/base/special/abs' );
var copysign = require( '@stdlib/math/base/special/copysign' );
var PI = require( '@stdlib/constants/math/float64-pi' );


// MAIN //

/**
* Computes the value of `sin(πx)`.
*
* @param {number} x - input value
* @returns {number} function value
*
* @example
* var y = sinpi( 0.0 );
* // returns 0.0
*
* @example
* var y = sinpi( 0.5 );
* // returns 1.0
*
* @example
* var y = sinpi( 0.9 );
* // returns ~0.309
*
* @example
* var y = sinpi( NaN );
* // returns NaN
*/
function sinpi( x ) {
	var ar;
	var r;
	if ( isnan( x ) ) {
		return NaN;
	}
	if ( isInfinite( x ) ) {
		return NaN;
	}
	// Argument reduction (reduce to [0,2))...
	r = x % 2.0; // sign preserving
	ar = abs( r );

	// If `x` is an integer, the mod is an integer...
	if ( ar === 0.0 || ar === 1.0 ) {
		return copysign( 0.0, r );
	}
	if ( ar < 0.25 ) {
		return sin( PI*r );
	}
	// In each of the following, we further reduce to [-π/4,π/4)...
	if ( ar < 0.75 ) {
		ar = 0.5 - ar;
		return copysign( cos( PI*ar ), r );
	}
	if ( ar < 1.25 ) {
		r = copysign( 1.0, r ) - r;
		return sin( PI*r );
	}
	if ( ar < 1.75 ) {
		ar = ar - 1.5;
		return -copysign( cos( PI*ar ), r );
	}
	r = r - copysign( 2.0, r );
	return sin( PI*r );
}


// EXPORTS //

module.exports = sinpi;

},{"@stdlib/constants/math/float64-pi":33,"@stdlib/math/base/assert/is-infinite":39,"@stdlib/math/base/assert/is-nan":41,"@stdlib/math/base/special/abs":53,"@stdlib/math/base/special/copysign":57,"@stdlib/math/base/special/cos":59,"@stdlib/math/base/special/sin":92}],96:[function(require,module,exports){
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

},{"./trunc.js":97}],97:[function(require,module,exports){
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

},{"@stdlib/math/base/special/ceil":55,"@stdlib/math/base/special/floor":61}],98:[function(require,module,exports){
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

},{"./main.js":99}],99:[function(require,module,exports){
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

},{"@stdlib/constants/math/float64-exponent-bias":27,"@stdlib/constants/math/float64-high-word-exponent-mask":28,"@stdlib/number/float64/base/get-high-word":104}],100:[function(require,module,exports){
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

},{"./main.js":102}],101:[function(require,module,exports){
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

},{"@stdlib/assert/is-little-endian":18}],102:[function(require,module,exports){
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

},{"./indices.js":101,"@stdlib/array/float64":2,"@stdlib/array/uint32":7}],103:[function(require,module,exports){
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

},{"@stdlib/assert/is-little-endian":18}],104:[function(require,module,exports){
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

},{"./main.js":105}],105:[function(require,module,exports){
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

},{"./high.js":103,"@stdlib/array/float64":2,"@stdlib/array/uint32":7}],106:[function(require,module,exports){
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

},{"./main.js":108}],107:[function(require,module,exports){
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

},{"@stdlib/assert/is-little-endian":18}],108:[function(require,module,exports){
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

},{"./low.js":107,"@stdlib/array/float64":2,"@stdlib/array/uint32":7}],109:[function(require,module,exports){
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

},{"./main.js":110}],110:[function(require,module,exports){
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

},{"./normalize.js":111}],111:[function(require,module,exports){
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

},{"@stdlib/constants/math/float64-smallest-normal":35,"@stdlib/math/base/assert/is-infinite":39,"@stdlib/math/base/assert/is-nan":41,"@stdlib/math/base/special/abs":53}],112:[function(require,module,exports){
arguments[4][103][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":18,"dup":103}],113:[function(require,module,exports){
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

},{"./main.js":114}],114:[function(require,module,exports){
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

},{"./high.js":112,"@stdlib/array/float64":2,"@stdlib/array/uint32":7}],115:[function(require,module,exports){
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

},{"./main.js":117}],116:[function(require,module,exports){
arguments[4][101][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":18,"dup":101}],117:[function(require,module,exports){
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

},{"./to_words.js":118}],118:[function(require,module,exports){
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

},{"./indices.js":116,"@stdlib/array/float64":2,"@stdlib/array/uint32":7}],119:[function(require,module,exports){
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

},{}],120:[function(require,module,exports){
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

},{"./constant_function.js":119}],121:[function(require,module,exports){
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

},{}],122:[function(require,module,exports){
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

},{"./define_read_only_property.js":121}],123:[function(require,module,exports){
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

},{"./float64array.js":124,"@stdlib/assert/is-float64array":15}],124:[function(require,module,exports){
'use strict';

// EXPORTS //

module.exports = ( typeof Float64Array === 'function' ) ? Float64Array : null;

},{}],125:[function(require,module,exports){
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

},{"./detect_float64array_support.js":123}],126:[function(require,module,exports){
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

},{}],127:[function(require,module,exports){
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

},{"./detect_symbol_support.js":126}],128:[function(require,module,exports){
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

},{"@stdlib/utils/detect-symbol-support":127}],129:[function(require,module,exports){
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

},{"./has_tostringtag_support.js":128}],130:[function(require,module,exports){
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

},{"./uint16array.js":132,"@stdlib/assert/is-uint16array":20,"@stdlib/constants/math/uint16-max":36}],131:[function(require,module,exports){
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

},{"./detect_uint16array_support.js":130}],132:[function(require,module,exports){
'use strict';

// EXPORTS //

module.exports = ( typeof Uint16Array === 'function' ) ? Uint16Array : null;

},{}],133:[function(require,module,exports){
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

},{"./uint32array.js":135,"@stdlib/assert/is-uint32array":22,"@stdlib/constants/math/uint32-max":37}],134:[function(require,module,exports){
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

},{"./detect_uint32array_support.js":133}],135:[function(require,module,exports){
'use strict';

// EXPORTS //

module.exports = ( typeof Uint32Array === 'function' ) ? Uint32Array : null;

},{}],136:[function(require,module,exports){
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

},{"./uint8array.js":138,"@stdlib/assert/is-uint8array":24,"@stdlib/constants/math/uint8-max":38}],137:[function(require,module,exports){
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

},{"./detect_uint8array_support.js":136}],138:[function(require,module,exports){
'use strict';

// EXPORTS //

module.exports = ( typeof Uint8Array === 'function' ) ? Uint8Array : null;

},{}],139:[function(require,module,exports){
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

},{"./native_class.js":140,"./polyfill.js":141,"@stdlib/utils/detect-tostringtag-support":129}],140:[function(require,module,exports){
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

},{"./tostring.js":142}],141:[function(require,module,exports){
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

},{"./tostring.js":142,"./tostringtag.js":143,"@stdlib/assert/has-own-property":14}],142:[function(require,module,exports){
'use strict';

// MAIN //

var toStr = Object.prototype.toString;


// EXPORTS //

module.exports = toStr;

},{}],143:[function(require,module,exports){
'use strict';

// MAIN //

var toStrTag = ( typeof Symbol === 'function' ) ? Symbol.toStringTag : '';


// EXPORTS //

module.exports = toStrTag;

},{}],144:[function(require,module,exports){
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

},{}],145:[function(require,module,exports){

},{}],146:[function(require,module,exports){
arguments[4][145][0].apply(exports,arguments)
},{"dup":145}],147:[function(require,module,exports){
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

},{}],148:[function(require,module,exports){
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

},{"base64-js":144,"ieee754":167}],149:[function(require,module,exports){
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
},{"../../is-buffer/index.js":169}],150:[function(require,module,exports){
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

},{"./lib/is_arguments.js":151,"./lib/keys.js":152}],151:[function(require,module,exports){
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

},{}],152:[function(require,module,exports){
exports = module.exports = typeof Object.keys === 'function'
  ? Object.keys : shim;

exports.shim = shim;
function shim (obj) {
  var keys = [];
  for (var key in obj) keys.push(key);
  return keys;
}

},{}],153:[function(require,module,exports){
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

},{"foreach":163,"object-keys":173}],154:[function(require,module,exports){
module.exports = function () {
    for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] !== undefined) return arguments[i];
    }
};

},{}],155:[function(require,module,exports){
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

},{"./helpers/isFinite":156,"./helpers/isNaN":157,"./helpers/mod":158,"./helpers/sign":159,"es-to-primitive/es5":160,"has":166,"is-callable":170}],156:[function(require,module,exports){
var $isNaN = Number.isNaN || function (a) { return a !== a; };

module.exports = Number.isFinite || function (x) { return typeof x === 'number' && !$isNaN(x) && x !== Infinity && x !== -Infinity; };

},{}],157:[function(require,module,exports){
module.exports = Number.isNaN || function isNaN(a) {
	return a !== a;
};

},{}],158:[function(require,module,exports){
module.exports = function mod(number, modulo) {
	var remain = number % modulo;
	return Math.floor(remain >= 0 ? remain : remain + modulo);
};

},{}],159:[function(require,module,exports){
module.exports = function sign(number) {
	return number >= 0 ? 1 : -1;
};

},{}],160:[function(require,module,exports){
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

},{"./helpers/isPrimitive":161,"is-callable":170}],161:[function(require,module,exports){
module.exports = function isPrimitive(value) {
	return value === null || (typeof value !== 'function' && typeof value !== 'object');
};

},{}],162:[function(require,module,exports){
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

},{}],163:[function(require,module,exports){

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


},{}],164:[function(require,module,exports){
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

},{}],165:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

module.exports = Function.prototype.bind || implementation;

},{"./implementation":164}],166:[function(require,module,exports){
var bind = require('function-bind');

module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);

},{"function-bind":165}],167:[function(require,module,exports){
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

},{}],168:[function(require,module,exports){
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

},{}],169:[function(require,module,exports){
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

},{}],170:[function(require,module,exports){
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

},{}],171:[function(require,module,exports){
var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};

},{}],172:[function(require,module,exports){
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

},{}],173:[function(require,module,exports){
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

},{"./isArguments":174}],174:[function(require,module,exports){
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

},{}],175:[function(require,module,exports){
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
},{"_process":147}],176:[function(require,module,exports){
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
},{"_process":147}],177:[function(require,module,exports){
module.exports = require('./lib/_stream_duplex.js');

},{"./lib/_stream_duplex.js":178}],178:[function(require,module,exports){
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
},{"./_stream_readable":180,"./_stream_writable":182,"core-util-is":149,"inherits":168,"process-nextick-args":176}],179:[function(require,module,exports){
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
},{"./_stream_transform":181,"core-util-is":149,"inherits":168}],180:[function(require,module,exports){
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
},{"./_stream_duplex":178,"./internal/streams/BufferList":183,"./internal/streams/destroy":184,"./internal/streams/stream":185,"_process":147,"core-util-is":149,"events":162,"inherits":168,"isarray":171,"process-nextick-args":176,"safe-buffer":191,"string_decoder/":197,"util":145}],181:[function(require,module,exports){
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
},{"./_stream_duplex":178,"core-util-is":149,"inherits":168}],182:[function(require,module,exports){
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
},{"./_stream_duplex":178,"./internal/streams/destroy":184,"./internal/streams/stream":185,"_process":147,"core-util-is":149,"inherits":168,"process-nextick-args":176,"safe-buffer":191,"util-deprecate":204}],183:[function(require,module,exports){
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
},{"safe-buffer":191}],184:[function(require,module,exports){
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
},{"process-nextick-args":176}],185:[function(require,module,exports){
module.exports = require('events').EventEmitter;

},{"events":162}],186:[function(require,module,exports){
module.exports = require('./readable').PassThrough

},{"./readable":187}],187:[function(require,module,exports){
exports = module.exports = require('./lib/_stream_readable.js');
exports.Stream = exports;
exports.Readable = exports;
exports.Writable = require('./lib/_stream_writable.js');
exports.Duplex = require('./lib/_stream_duplex.js');
exports.Transform = require('./lib/_stream_transform.js');
exports.PassThrough = require('./lib/_stream_passthrough.js');

},{"./lib/_stream_duplex.js":178,"./lib/_stream_passthrough.js":179,"./lib/_stream_readable.js":180,"./lib/_stream_transform.js":181,"./lib/_stream_writable.js":182}],188:[function(require,module,exports){
module.exports = require('./readable').Transform

},{"./readable":187}],189:[function(require,module,exports){
module.exports = require('./lib/_stream_writable.js');

},{"./lib/_stream_writable.js":182}],190:[function(require,module,exports){
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
},{"_process":147,"through":203}],191:[function(require,module,exports){
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

},{"buffer":148}],192:[function(require,module,exports){
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

},{"events":162,"inherits":168,"readable-stream/duplex.js":177,"readable-stream/passthrough.js":186,"readable-stream/readable.js":187,"readable-stream/transform.js":188,"readable-stream/writable.js":189}],193:[function(require,module,exports){
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

},{"es-abstract/es5":155,"function-bind":165}],194:[function(require,module,exports){
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

},{"./implementation":193,"./polyfill":195,"./shim":196,"define-properties":153,"function-bind":165}],195:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

var zeroWidthSpace = '\u200b';

module.exports = function getPolyfill() {
	if (String.prototype.trim && zeroWidthSpace.trim() === zeroWidthSpace) {
		return String.prototype.trim;
	}
	return implementation;
};

},{"./implementation":193}],196:[function(require,module,exports){
'use strict';

var define = require('define-properties');
var getPolyfill = require('./polyfill');

module.exports = function shimStringTrim() {
	var polyfill = getPolyfill();
	define(String.prototype, { trim: polyfill }, { trim: function () { return String.prototype.trim !== polyfill; } });
	return polyfill;
};

},{"./polyfill":195,"define-properties":153}],197:[function(require,module,exports){
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
},{"safe-buffer":191}],198:[function(require,module,exports){
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
},{"./lib/default_stream":199,"./lib/results":201,"./lib/test":202,"_process":147,"defined":154,"through":203}],199:[function(require,module,exports){
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
},{"_process":147,"fs":146,"through":203}],200:[function(require,module,exports){
(function (process){
module.exports = typeof setImmediate !== 'undefined'
    ? setImmediate
    : process.nextTick
;

}).call(this,require('_process'))
},{"_process":147}],201:[function(require,module,exports){
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
},{"_process":147,"events":162,"function-bind":165,"has":166,"inherits":168,"object-inspect":172,"resumer":190,"through":203}],202:[function(require,module,exports){
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
},{"./next_tick":200,"deep-equal":150,"defined":154,"events":162,"has":166,"inherits":168,"path":175,"string.prototype.trim":194}],203:[function(require,module,exports){
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
},{"_process":147,"stream":192}],204:[function(require,module,exports){
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
},{}]},{},[49,50,51]);
