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

},{"./float64array.js":1,"./polyfill.js":3,"@stdlib/utils/detect-float64array-support":102}],3:[function(require,module,exports){
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

},{"./polyfill.js":5,"./uint16array.js":6,"@stdlib/utils/detect-uint16array-support":108}],5:[function(require,module,exports){
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

},{"./polyfill.js":8,"./uint32array.js":9,"@stdlib/utils/detect-uint32array-support":111}],8:[function(require,module,exports){
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

},{"./polyfill.js":11,"./uint8array.js":12,"@stdlib/utils/detect-uint8array-support":114}],11:[function(require,module,exports){
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

},{"@stdlib/utils/native-class":116}],17:[function(require,module,exports){
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

},{"@stdlib/utils/native-class":116}],22:[function(require,module,exports){
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

},{"@stdlib/utils/native-class":116}],24:[function(require,module,exports){
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

},{"@stdlib/utils/native-class":116}],26:[function(require,module,exports){
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

},{}],34:[function(require,module,exports){
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

},{}],35:[function(require,module,exports){
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

},{}],36:[function(require,module,exports){
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

},{}],37:[function(require,module,exports){
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

},{}],38:[function(require,module,exports){
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

},{"./is_infinite.js":39}],39:[function(require,module,exports){
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

},{"@stdlib/constants/math/float64-ninf":32,"@stdlib/constants/math/float64-pinf":33}],40:[function(require,module,exports){
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

},{"./is_nan.js":41}],41:[function(require,module,exports){
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

},{}],42:[function(require,module,exports){
'use strict';

// MODULES //

var isnan = require( '@stdlib/math/base/assert/is-nan' );
var erfc = require( '@stdlib/math/base/special/erfc' );
var sqrt = require( '@stdlib/math/base/special/sqrt' );


// MAIN //

/**
* Evaluates the cumulative distribution function (CDF) for a Lévy distribution with location parameter `mu` and scale parameter `c` at value `x`.
*
* @param {number} x - input value
* @param {number} mu - location parameter
* @param {PositiveNumber} c - scale parameter
* @returns {Probability} evaluated CDF
*
* @example
* var y = cdf( 2.0, 0.0, 1.0 );
* // returns ~0.48
*
* @example
* var y = cdf( 12.0, 10.0, 3.0 );
* // returns ~0.221
*
* @example
* var y = cdf( 9.0, 10.0, 3.0 );
* // returns 0.0
*
* @example
* var y = cdf( NaN, 0.0, 1.0 );
* // returns NaN
*
* @example
* var y = cdf( 2, NaN, 1.0 );
* // returns NaN
*
* @example
* var y = cdf( 2.0, 0.0, NaN );
* // returns NaN
*
* @example
* // Negative scale parameter:
* var y = cdf( 2.0, 0.0, -1.0 );
* // returns NaN
*/
function cdf( x, mu, c ) {
	var z;
	if (
		isnan( x ) ||
		isnan( mu ) ||
		isnan( c ) ||
		c <= 0.0
	) {
		return NaN;
	}
	if ( x < mu ) {
		return 0.0;
	}
	z = sqrt( c / ( 2.0 * ( x-mu ) ) );
	return erfc( z );
}


// EXPORTS //

module.exports = cdf;

},{"@stdlib/math/base/assert/is-nan":40,"@stdlib/math/base/special/erfc":58,"@stdlib/math/base/special/sqrt":75}],43:[function(require,module,exports){
'use strict';

// MODULES //

var constantFunction = require( '@stdlib/utils/constant-function' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var erfc = require( '@stdlib/math/base/special/erfc' );
var sqrt = require( '@stdlib/math/base/special/sqrt' );


// MAIN //

/**
* Returns a function for evaluating the cumulative distribution function (CDF) for a Lévy distribution with location parameter `mu` and scale parameter `c`.
*
* @param {number} mu - location parameter
* @param {PositiveNumber} c - scale parameter
* @returns {Function} CDF
*
* @example
* var cdf = factory( 3.0, 1.5 );
*
* var y = cdf( 4.0 );
* // returns ~0.22
*
* y = cdf( 2.0 );
* // returns 0.0
*/
function factory( mu, c ) {
	if (
		isnan( mu ) ||
		isnan( c ) ||
		c <= 0.0
	) {
		return constantFunction( NaN );
	}
	return cdf;

	/**
	* Evaluates the cumulative distribution function (CDF) for a Lévy distribution.
	*
	* @private
	* @param {number} x - input value
	* @returns {Probability} evaluated CDF
	*
	* @example
	* var y = cdf( 2.0 );
	* // returns <number>
	*/
	function cdf( x ) {
		var z;
		if ( isnan( x ) ) {
			return NaN;
		}
		if ( x < mu ) {
			return 0.0;
		}
		z = sqrt( c / ( 2.0 * ( x-mu ) ) );
		return erfc( z );
	}
}


// EXPORTS //

module.exports = factory;

},{"@stdlib/math/base/assert/is-nan":40,"@stdlib/math/base/special/erfc":58,"@stdlib/math/base/special/sqrt":75,"@stdlib/utils/constant-function":97}],44:[function(require,module,exports){
'use strict';

/**
* Lévy distribution cumulative distribution function (CDF).
*
* @module @stdlib/math/base/dists/levy/cdf
*
* @example
* var cdf = require( '@stdlib/math/base/dists/levy/cdf' );
*
* var y = cdf( 10.0, 0.0, 3.0 );
* // returns ~0.584
*
* y = cdf( 0.3, 0.0, 3.0 );
* // returns ~0.002
*
* @example
* var factory = require( '@stdlib/math/base/dists/levy/cdf' ).factory;

* var myCDF = factory( 2.0, 3.0 );
* var y = myCDF( 100.0 );
* // returns ~0.861
*
* y = myCDF( 10.0 );
* // returns ~0.54
*
* y = myCDF( 2.0 );
* // returns 0.0
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-read-only-property' );
var cdf = require( './cdf.js' );
var factory = require( './factory.js' );


// MAIN //

setReadOnly( cdf, 'factory', factory );


// EXPORTS //

module.exports = cdf;

},{"./cdf.js":42,"./factory.js":43,"@stdlib/utils/define-read-only-property":99}],45:[function(require,module,exports){
module.exports={"expected":[0.006756165517560977,7.116033375594758e-5,0.0033708002689426917,0.00029459460446985976,0.22436071944009212,0.04236802445726362,0.002483295185461875,0.038422581042605077,0.007006703841946023,0.06388890621133644,0.11770784164539706,0.07498628610860367,0.23297706786985106,0.047435131817145065,0.06399038648309033,0.08246596845555955,0.022806335701767783,0.3653916895438729,0.21283016137882646,0.06407009093674226,0.01964568912075847,0.3838623884338705,0.1604932180908853,0.22697598351964193,0.0002085450593172469,0.1651051029452049,0.034827277076530466,1.826145192449356e-12,0.004915394977677217,0.3099522062875623,0.48046608784231987,0.0006218782118725333,0.027757379669702858,0.04305917934738322,0.06689217699112034,0.05641641469289829,0.01087202095861424,2.3316287075907097e-11,0.34811733131572437,0.009545611632343461,8.849030691587564e-5,0.13564564310794142,0.1308093179830992,0.28518535847324555,0.08687928591852401,0.1420369093366819,0.023586365088845818,0.06908709938757798,0.024377681811734036,0.029726420926104596,0.018352870311209035,0.020611182058553536,0.2907701181779694,0.205904903523563,0.029612854611865986,0.17006678489687116,0.03173479832933457,0.42122606343028324,0.0012712396944455943,0.21151828792222804,0.026583686868783093,0.09309099986009822,1.9681996934974112e-15,0.007737916064025917,0.04272812871056227,0.0005043976883626504,1.3261579960011063e-5,0.16627988988293183,0.10794467948536604,0.0010052123840952399,0.04586643118609957,0.15198701545983553,2.5735310161796766e-5,0.005090282305518866,5.731273891132169e-12,0.04570211778304559,0.0001508960783393704,0.024530474299069443,0.00899582523611817,0.12268434650194646,0.20187154276194536,0.1690600637861125,0.29426001142384006,0.024095344726984314,0.03363814752703299,0.07122696090002645,0.01826565269208591,0.06481811601817661,0.03115291407575694,0.019781370165975136,0.645037263975099,2.3872996287686777e-6,0.0006284009239695522,0.0112236642486661,2.1837889912594499e-10,6.116293729322712e-5,0.030834608438071818,1.6589932586516537e-29,0.00020787738488757862,0.09723766035302302,9.303508682898921e-14,0.06441243282541509,1.0277449415041551e-5,0.03936532758699315,0.03166151099487342,0.34991558389391997,0.05065508709486737,2.371203745535161e-37,1.9711867034990304e-7,0.009272678960460013,0.07550476620734187,0.20756023806065702,0.028351640919216124,0.16341750984031866,0.048696574333942796,0.022192193896190697,2.701599115582248e-6,0.046205620710483994,8.339415134499092e-7,0.17507957302169294,0.41588520672825935,4.9299988825472e-7,0.03992197663530542,0.28457215020731463,4.37270988469707e-5,0.03217243439960981,0.14069961924526453,6.344293617508694e-5,0.43074893950933973,0.1321956188896277,0.05759549400990346,0.060066242095251805,0.05952248867050391,0.17637855924030993,0.09557942502465866,0.0329489474860369,0.019682834961264557,0.19642552252167547,0.008243959089249613,0.24697666098745225,0.04260104003344287,0.08157935658350865,0.011993281179515904,0.0009338968906340313,0.07709090624192069,0.03206267002806962,6.408554279251152e-17,0.06128995818568224,0.5445951630160503,0.159296960401104,0.05385917031449279,0.03267264304717255,0.03405831663754162,0.03723647281549181,0.19681675830475379,0.006565766175085997,1.3857187333164393e-10,1.8076361193430425e-9,0.008955755712715504,0.0590500372756928,0.04490379208875141,0.024061030457443493,0.0016028127904782702,0.051045504204588726,0.10440817531991484,0.09628210296733028,0.09924026513689369,1.1973021913305615e-32,0.05028049603568259,0.0003723625458903219,0.02613263521948176,0.0002718055914611965,0.07584416123572367,0.09506496994163736,2.073336563205605e-7,5.876938424989183e-11,0.008003393496624316,0.06095781238550236,1.41297214746087e-15,0.18686121073369494,9.282342782479852e-15,1.3245158825042033e-7,0.01545358748938389,0.011046631631353856,0.07215796180456008,0.14945630243775743,0.2597049810869386,0.03389485054546202,2.0558972104247873e-5,0.07411859847342316,0.0001203846206619666,0.02218830456490203,0.5026520865585691,0.19933809135428718,0.016856938760178932,0.04837124102910404,3.4830510141467558e-6,0.011118830589957012,1.161046245899206e-6,0.2019654004430133,0.0017441760077274674,0.04680151497793212,0.17573824989544376,0.05191758787471921,0.008248483862614025,0.0018886360575284195,0.08434765188729415,0.11176058759002036,1.5758742625422793e-5,2.5328366997398507e-5,0.013457878405264183,1.265624039258865e-5,0.00024700515634505497,0.019782671910271808,0.0009109145014198094,0.29955698217668697,1.5827538909306932e-14,5.212460319705288e-7,0.1490358149398854,0.004790464191513325,0.008110946074858055,0.006847824550900731,0.2498069381646707,0.32783260214328425,0.42690765932501035,0.06816656626676124,0.007912436957613638,0.02798319517524231,0.3142704827018967,0.18106407523374338,0.03425711921625007,0.44391510713014537,0.3043433165271593,0.23323600838274655,8.597833238511941e-5,0.07662902080031998,0.18181679296973735,0.3556573642367863,0.09532622932638529,0.14180946992115462,0.1381428303572554,0.05659689938876783,0.21038346427590937,0.07739578379892001,0.05116875177228433,0.1508494921379117,3.2400116120173175e-14,0.08832969843953727,0.06198221097260306,0.033428331716871554,0.00010941905474911533,6.671540952142525e-6,0.0003943103927889166,0.05449266046635155,5.5517469124577866e-5,0.18828301203672662,0.05952015410126111,0.07686864527462813,2.0543279358564287e-7,0.18969955132715832,0.0007489899338301881,0.041143867631846014,0.0010395910449427217,0.003802429532898603,2.384227039300808e-101,0.006029673357468348,0.0029581406481656853,0.014087913053759624,0.004459624363818579,0.06843216232681872,0.043744535963110384,0.5175150231572196,0.10149839012880879,0.000672760972755281,0.06380774194400392,0.05314457901940832,0.07847498465122774,0.0262967280672123,9.511476909854727e-5,0.0071941198587081295,0.05395446800117825,9.757225203592358e-9,0.02143340419286473,0.02326605203038501,0.010206973073190066,1.173770563686809e-30,0.13742297399008355,0.0002632427632849898,0.1029276946412295,2.6413223790837458e-11,0.05861978378896931,0.02043382499707476,7.1870281516666735e-6,0.14582082178847677,1.4855840636537424e-7,0.13226297583585295,0.044403592324598624,0.031014905297304197,0.007098584134445108,0.021965565859034534,0.010880850712366295,0.03815499252325778,0.058106286635810814,0.3772013820025111,0.01810476652209333,0.4117303686405056,0.0508241990746941,0.031695111161058914,0.17761558252711468,0.00795595246761269,0.0035871772702067454,0.017334849383729384,0.3367453506606593,1.6112640011974452e-5,0.1402379062639293,0.36481804111556376,0.00011282489212020046,0.0049807772469351325,0.04059191455518966,0.3346851249074983,0.11791203261080985,0.009130065001152253,0.01106945211258703,0.04246882268168317,0.13465996890970078,9.478218217775781e-14,0.07207275570612912,0.018486346703054962,0.023508994814588853,0.38409641310647447,0.0025596550847297324,7.67546792203771e-15,4.6792859680469075e-16,0.07436490952446898,0.1490456366948281,0.04816163626418719,0.40948371338197265,0.014668879487535568,0.00013594738237058274,0.19013153231607444,0.02262718666912272,0.16373678154976923,0.0887920139140635,0.2651227345516286,0.12754677678910697,0.3177404243938163,0.024102196899619642,0.14303948214856624,0.3590124575209287,0.1344230261903997,0.015994549002959255,8.248044802774575e-7,9.622308423421062e-6,0.12122081933432619,0.23838357108194208,0.4546109761645954,0.03282342326880906,0.06049292063027953,0.4212769514027146,0.007475498875965765,0.13952289355238742,0.009867957635984472,0.015101906490165622,0.002799992173302596,6.290406386362384e-5,0.0014234730045638634,0.17395476229414983,0.03631207452489592,0.00011666865799827329,0.07033177720449126,0.04131966781898834,0.009942534559641645,0.04649846461835733,0.26897585849820654,0.037652657993276495,0.011140124414464258,0.0552004555236913,0.0006804504664229072,0.00029264142997611944,0.0014565648426668018,0.025109107689322053,0.044112276181554826,0.045387051197064744,0.04055666164066398,0.08168720436133711,0.0254602528756365,0.006717264408081958,0.036559485629623655,0.04272417535798919,0.0009400849557374753,0.1867802853991694,0.0034934419910684364,8.618114402717503e-5,4.810152656599592e-28,0.34225381214139994,0.07847699583039128,0.14214937918569837,0.1454392875949046,0.09242373897519991,0.015837210693718757,0.35659490863117127,9.875041955525556e-18,0.19342911001230295,0.2009078672332747,0.47636285770363146,0.5421728321689012,0.05151057297088941,0.11208021537866418,0.03917600485978531,0.02746019117375515,0.017057812788145457,0.05588828203364203,0.03115559979169144,0.10962511591753615,0.6163027842269505,0.04087618715954903,0.004973634162285673,5.8837517535634465e-12,0.002689610111779456,0.3982435475447795,0.030871106282886765,0.007698600248929239,0.07524964539724152,4.8961677529711975e-5,0.15364498829058945,0.00024395024641065698,0.06073938352814056,0.006405921518202954,0.18772011920615442,0.11207399291996706,0.013110490459295496,1.2653737589528358e-9,6.11332271344427e-35,0.010559459711453592,0.00027609157710842004,0.0013873330165397296,0.035637716590247184,0.1083519543659349,0.04913154955826944,0.025133928937023806,0.0429340047409693,0.1476588708204118,1.094750214184539e-6,0.027551605372552638,0.13929492149328918,0.20764921576629836,0.1931825450118681,0.08541774576017466,0.2080313296364057,0.007577946752150458,0.09161457719867702,0.004034658621567899,0.13457399275902993,0.16718907198939073,0.03843525387574611,0.435391846431763,0.16375621982936636,0.45400258763963575,0.03570361747856227,0.004500054318625436,0.004414426591174033,0.14029224005626317,0.0031165328315537495,0.026532634395581144,0.037075749726761274,0.22470172752388773,0.0043641944554937305,0.43607390847854866,0.018232527032968817,0.015796016736533636,0.052553143343450334,0.33960060052244867,0.16455568977637308,0.04932883581172672,4.995379973075892e-5,0.0005737153903094773,0.13196839318573755,0.0004578896116820019,0.029717685326686824,0.17886748276849243,0.0009677060616753539,0.012153187420886238,0.4511844707044618,4.213258988593305e-5,0.00013809998273448226,0.16582539952756412,0.5616917089144743,0.23490073179205134,0.12091916035291467,3.0033071722076246e-7,0.06404428434198943,0.03643347805471765,0.5864490030640198,0.6408912259076702,0.0938394804356879,0.2937612483317825,0.014065332462242832,0.009795269005081882,0.06112873510333922,0.4462551370195401,0.4684738381613591,0.024064026968397063,0.04167768193111546,0.027521853337839915,0.055467848907104385,0.053968773410570756,0.44765598348609126,0.2909078902460204,0.25883570868398564,0.03985822097004273,0.05953628934793135,0.03859675460625804,1.3756118713679066e-10,0.5136725305235923,0.007831421773611333,0.2968532236119602,0.008551130938903796,0.015769469635878965,0.5574319320620793,0.611045908063953,0.2103458326068597,0.014519418805004132,0.005519856788326936,0.344485072162792,0.04770654707943867,0.0001187661528343383,0.4710075498058954,0.08546140338717081,2.3839851149478393e-18,0.0012942523102676144,0.020942239042384687,0.13842226636848953,0.0001151775366889855,0.5540391387348331,0.14171529789570808,0.024750633731575926,0.026310933106236355,0.45663967204743383,0.49263300842951435,0.04104859701208839,0.17028442831747637,0.10173085668300555,0.1374652710346559,0.006659864823724946,0.01189090495312468,0.09206938833116586,0.04841987049309832,0.020601290947630642,0.07929057344191932,0.00016376812638281362,9.035383829906297e-7,0.0652853499355059,0.06790097682936437,0.0041819473949836795,0.0015477746900148207,0.08109774295824615,0.08284291077078006,2.1696555762176387e-10,0.00795556013832276,0.26443905581040905,8.026361794397343e-5,0.02907466483649974,0.043826402589868065,1.610516798232793e-5,0.3628705073590024,0.038806026589529516,2.3101351247386604e-27,0.4613115455499816,0.06788919548294133,2.367293098750237e-5,0.3418950893807324,1.529411355537304e-9,4.773338080712702e-8,0.001824588157902669,0.15803413586306683,3.3986090360439663e-8,0.02331798455241817,0.011788780571999145,0.0010125381820641076,0.030159709216770147,0.18626103381660347,0.009939640077929962,3.0143624796445605e-19,0.0074352278780329805,0.2574373163978094,0.002997782612882553,0.0013965205288094184,0.047908161973499626,1.7502067721131835e-6,0.07340114222013092,0.4962260568758092,0.3699718458407387,0.00226034049522615,0.018905428695086206,0.5287994880434383,0.33262043185871315,0.004247818591418656,0.0010781479027959008,0.25142703027934593,0.028367446466600648,0.0095104272717741,0.046554025667808856,6.670818996510213e-5,0.43366349558171274,0.29952606249161484,0.10438537673764045,0.17392367539086423,0.05999449567681549,0.00052600954026295,0.060130999779610235,3.02925018907213e-6,2.325044127154457e-25,0.030676605841280617,0.4742748509633415,0.00838802694137638,4.4328219842990885e-12,0.11083901376047021,1.7065567489082007e-29,0.19373955575849997,0.0020433008288729963,0.0006025953358326066,0.018135726087614414,0.008011729835450915,0.000686353735857553,0.07618281478515544,0.013607782388913033,0.5486446866066246,0.06935898730027695,0.11430800835887578,0.009607113203238022,0.00045457899599511437,0.5084333095835487,0.007571792761236943,0.014043913904772136,0.009509877783262653,0.02673720016633559,0.09875492068676445,0.0005088549978342572,0.14662785057104302,0.04006801970049188,0.021250785089870806,0.0338976174369896,6.20955326808725e-5,0.22008463616188412,0.01573722425883196,0.3365708925147074,0.04280457494712223,0.1024111827423602,0.13588195506224543,0.31957947809919884,0.09638614237491396,0.00609642958639412,0.00040331095153631257,0.07203588740902339,0.05863272090515648,0.42002369309980503,0.06249496779417482,0.0012087554278848035,4.430387643813088e-7,0.008510213603306548,0.0499257986445498,0.004412722057864234,0.18350287404920132,0.001977132721688323,0.07430701246098494,0.036413811761686316,0.3065554517868029,1.7619431421986153e-7,0.09654825158242356,0.00017625629024788607,0.0006954027669047151,6.3036530817730064e-12,1.5928636451642613e-5,0.012982360404295819,0.02568623472579079,8.097617196345676e-8,0.1377168411532339,0.022542717481546383,0.027301643143511092,0.227114165852748,8.565746520782483e-9,2.528454454932551e-27,0.028022182969489804,0.001542788760044672,0.0009742865101452564,0.07159000132204214,0.014265340286262135,0.06568429882298167,0.05987042178967948,3.957141714846176e-194,2.1099436851999093e-9,0.27025472273589973,0.08181129397360042,0.008892129658046904,0.16509236797278884,0.02378921083961583,0.043358113667595635,1.0380397185720603e-7,5.654555514858039e-6,2.5069739187028414e-5,0.12197633040758178,0.09254240133491227,0.3747098827674141,0.011453246681035988,0.31739984074047356,0.13606990582758294,0.0835093033248514,0.0038198331294938014,0.01233725390239052,0.08657324047773039,0.07343135833183369,0.008376378558182901,0.3224318280041189,0.25230503498301504,0.24078803956415,0.041162564946157616,0.2927317889040452,0.01989233798044665,0.01302400730183848,0.0018559537276056153,0.0010640322606853738,2.4011800840967e-44,0.2157118032386346,0.38213296463523905,0.5887189882592305,0.02043093462990633,0.17843646617705303,0.07843507317961479,0.011606160216500325,0.21907533075215468,0.25009305891334804,0.0697145353753059,0.10463208171812277,0.032579212137520165,0.026383760286798678,0.022205086519038523,0.00015393187089942923,0.0568027360318784,0.04804770741119578,0.0912222304693458,6.812780456667185e-22,1.9238120373930015e-48,3.090472129357399e-5,0.0045525592902204565,0.041039178413921816,0.0002555233625787938,0.21789966962878232,0.02960853586472295,2.144460439485612e-10,5.188263672737484e-8,0.024270876911587455,5.1243520262424274e-6,0.15229231742104163,0.025798583760518527,0.09029634495067389,6.487560142456488e-89,0.09771990907305075,0.05034019015764308,0.21908523990735368,7.247764824236882e-5,0.06304575797772051,0.5453962107328643,0.0873753347733321,1.9996874358966707e-17,1.5696755202878234e-5,0.10238176419986024,0.08150725717031229,8.562012680424276e-5,0.05041420608553786,1.2187377701719597e-7,0.02906571483217447,0.41493424429776493,0.25474038645399455,0.15042550267226895,0.34250925333255805,0.1733254346812768,0.017726288126554596,0.008983901863705308,0.003252515624667963,0.18011992747284022,0.5997576729248649,0.03011328708006026,0.07091832777573272,0.28943776457726944,6.415327042101802e-9,0.04026021506894552,0.48000906515293185,0.02367932590456667,0.007380561141617613,0.001675953494294934,0.45793244551078416,0.08203800866489486,0.020136858097990613,0.06804991991079506,0.115610448211828,0.002080449346346458,0.28953873083580606,0.056161986571586546,0.40681360130735034,0.012420294493104013,0.03847842431537078,0.08577987339163906,0.042253980888560895,0.0031402490613395167,0.049963440419951266,0.04307036379056051,0.2524384666170173,2.2169096623530205e-6,0.0,0.0020223194107705494,0.23364408951722027,0.011296818504087152,0.02128672132667559,0.02655690495587242,0.0031847045707256534,0.043652099643972674,0.08499666581717759,0.1529580276457802,0.010353862532688687,0.31510817590868456,0.11260396200067459,0.2996822834714075,0.0009488508394463925,0.043189417836064774,0.0008781480019463059,0.028316546593682483,5.614981387144152e-16,0.12058338796726052,0.06837065250503559,0.016503302795028527,0.15989176326925972,0.0306244110357544,0.002754373827335536,0.0338615230698804,0.0002952578284929481,0.1336764590286072,0.014781380459048412,0.048593297516311904,0.15196880834485976,0.006004620737936437,0.23831882066896687,0.06959927712531155,8.177396444720717e-6,0.09813794272132753,0.021590740325197172,0.10097450192995065,0.025238581738782108,0.04093544893753365,2.0160739703622302e-5,0.011952860370375457,1.114986958854388e-8,0.018607015298331614,0.35495929716232316,0.48013898618653367,0.062316104049819195,0.002962396135144978,0.0699761096566834,0.025389358728376464,0.18309945917581774,4.264116632993943e-9,0.5768901509722094,0.4218378742249385,0.007190920891374877,0.5278699811466198,0.0002377736972949804,0.07945471146351865,0.24866342797428376,2.3087042000379728e-5,0.23317444457610592,0.03342426277812748,0.0007066501945398566,1.8649275630192885e-5,0.04737922111871977,0.22225146163974202,0.10727803972355282,0.30942297179452966,0.11120394831931274,1.3171842754169512e-39,0.08951193071447287,5.797648842635087e-6,0.37650378620635616,7.831318875256827e-5,0.027574725980251926,0.0005492779985079634,0.004874890948649814,0.0027731188881654698,0.13468830942675022,0.03555584922975101,0.19585687137651406,0.11795334574539865,5.017920082588448e-8,0.2463830035462029,1.8800987250242038e-14,0.005481612537702058,0.20806080070357105,0.06522003970361365,5.196896022922725e-9,3.1617933716201373e-7,0.027330182573976482,0.02001173259377251,0.09395614633434934,0.19484910195503974,0.037643071958462344,0.028070612641945308,0.00036707859792940386,0.001808036574802263,0.13729675649147405,3.017275771810162e-7,0.027612739356450818,0.15786528177176856,0.04295895816641036,0.004378074085379052,0.07536065436603873,0.04916067887646654,2.56796909554496e-9,0.07219394501291776,0.2429746412120688,2.764304875904007e-5,0.004545995060868384,0.16509100341948632,0.04241790978117291,0.0007423981349169269,0.1261534139871071,0.13441194368093687,0.4401385427628184,0.10350309379976251,0.0006585375178639426,0.19156480234327458,0.0028339861698196355,0.026235968912095103,4.3023711234077955e-12,0.009579313495331181,0.06961477733710997,0.11573406128558003,0.17600568481834636,0.044763460366274314,0.14602102735420128,0.011985017638918835,0.0907593149071373,0.40292934833461924,3.310945296224062e-8,0.0001177570531727781,0.009378770224095384,0.0006005109166185695,0.1095983787380191,0.08707693511727634,0.4270149272163366,1.054767128678089e-7,0.23342078240313996,0.1847124824971214,0.27362297210733943,0.34138119066503775,0.018880256528064694,0.023875585471901647,0.17557989243692912,0.02632880460589111,2.491583102057566e-7,0.4383467888826915,0.1385356953394637,0.051563575678636536,0.015759478290960704,0.0002765133066296756,0.027328183393913123,0.027547356255328583,8.943518867820884e-75,0.055465333970077704,6.745491620631337e-21,0.0005814244898276265,0.005362461114834694,0.04425940100358539,3.051966468710028e-5,0.5561152136306504,0.03034496320669219,0.02104214106251757,0.10091293993525062,0.0011188574545508022,0.006504528656946821,0.020093982924243893,0.08283767635252313,0.037114385544094575,0.2458124653250341,0.003755662227408858,0.5034206534021349,0.12075056523892334,0.08226280506401754,0.00021992578250267382,5.285393914870953e-16,4.5927135877860236e-5,7.433545066670286e-5,6.0654062208947655e-5,0.21839411420219887,0.05971771187499928,5.94608877182155e-7,0.1313701870462178,0.004112606740106762,3.3784331328960317e-7,0.0959546193856102,1.7841019195953465e-10,0.005157128309867865,2.4458937215311494e-16],"c":[14.776686964880804,2.1401196476782083,18.946559533201743,9.715221963670956,6.114654388798625,14.937378884829474,14.601525346394606,12.287997223921863,14.260093388430505,14.23418113518063,11.164735561818379,2.989932317078318,5.640117793463792,16.20857876688362,15.646724266454187,11.828477616802159,17.44219656728453,2.1771620340744215,6.618628160290786,8.764661024902576,15.190881484434286,2.663049454367478,8.819899587125597,6.0463674619096555,16.36025386776752,7.612775715975676,14.491498592473658,15.277962771651783,20.101863352763253,3.5318754875068006,2.3216431027161857,20.83041553909612,20.219992019835818,6.761219992848443,8.778068372522377,7.718678690921189,18.349127367710665,19.502855389440455,1.6687694727285587,9.800395025689776,15.459230475348042,10.323138281278812,5.742604428796291,1.612765939066886,9.102798845830375,4.369660195796533,8.53729544951435,6.042821992709512,6.51271252609848,18.525308353511182,15.531929523108026,17.2242885005598,2.298297740437584,6.716578761358515,20.514232010096222,6.8688609892241494,20.14845404080047,2.739445633362049,5.0238695435513705,5.805099475566856,20.608090979114685,5.964917056451692,20.181935625739346,20.193740964515193,14.806126405319468,4.907254632303108,14.85239063847842,8.800353352690955,4.591172384989907,14.874539156006755,6.360253396719381,8.895060698185311,11.463602558220133,5.387100082166353,18.25033164864883,19.232023522869248,16.495181357547956,19.54318231539731,17.67758917638123,11.806803240253835,2.967358751116044,8.552389041770283,5.181374703352874,14.818697098533711,6.781479563702612,10.485223989292017,11.535607842679129,10.337128653639422,17.826585153324892,19.144649257964602,1.0312227765495043,11.705882627035734,7.398262350813004,15.93281331542159,13.42212265848632,10.27634549796755,19.984741961813377,10.457475121224483,14.775053392553254,7.063374428620589,3.446430912224704,9.966116967376632,17.241297137755932,10.678637989831408,18.153141616201427,2.830800318798822,12.568298618268877,17.43258051506919,6.156402407798586,19.10134374696208,12.401772159630369,6.53408861936997,19.145744200809983,4.976488488552201,12.441029583401638,16.209923662491242,17.460679120214557,11.306728218956867,9.562081373743773,7.9910403299078006,2.105650926434061,4.7460290687226205,10.37050439720926,2.8019008601052278,20.77100539109051,8.556805149809382,6.738746086180777,12.068475726909103,2.724840316114511,6.804590888945782,18.014321267068254,15.844338193993277,11.168479332405154,7.797493933013632,10.441894695578075,3.303304380820914,17.316515374670615,6.4396352320509544,12.69353163319844,6.636071412009467,14.328415047387798,12.242090919696306,6.928953691320844,17.391288769058924,15.439947194225681,19.450158513318176,15.824245090413243,12.311138916879692,1.5676190177965879,3.367225714110681,12.519657589110746,16.259111827116058,15.670253380387553,7.8699475082520145,5.694614695206609,14.211195656014741,15.207517748044438,4.999005664430619,10.039822430507796,16.801308085688888,14.912118490631634,6.4445349327453485,19.142620568928955,7.9957440895059,13.03292467533986,9.566546935839764,4.591379558868821,7.957984256466285,2.382624513091666,18.391410002082893,18.667814857042853,14.553232210753162,13.974905131453234,11.767417339637046,11.086835908201447,11.763298104461398,12.936143845316224,15.715160350186887,11.080926050282644,5.324970857687758,15.63063073722346,15.913578819655484,16.25083877145284,14.412061405498958,11.172587428958186,9.56225757718201,5.398989625295195,16.37563379096244,9.04214198945787,8.229967194878547,17.13965162244763,17.61851294856584,2.039579610792174,7.294120716224119,20.642001361940665,16.774460252008925,19.240976797550225,18.663116577369777,20.042028306964344,6.12874256566894,20.28638924520751,9.10878258925567,6.419897789772126,12.492975720556045,9.264721721529074,18.276782556257633,14.579753126011314,4.342263077876968,20.596443941259267,11.89328757881082,18.543781957054236,20.08416382508156,13.031386649860352,16.13327955575872,14.551038408359112,4.127874912156061,5.8498055764078,9.82793257362955,6.088268932082647,6.347190965475819,16.677079102972677,19.275002954567828,5.32190979791681,3.049404897162037,2.5932640725045166,16.247212539592127,11.365086173970667,7.321468007364719,4.425918980303924,5.2671706857102265,4.435468658075425,2.070267886548031,3.262203572417225,4.7825742825726705,18.15374317193927,9.845479017930643,6.796154383606731,3.798878949748733,6.5638942342025555,9.036354580560992,5.1084793746749115,9.969406732918483,4.237051530947843,12.18347538677316,15.919518458498082,6.379892170383682,15.314260760649567,14.431416634446123,15.700908749790745,18.320843499312485,20.085709686953344,10.162695463331332,14.131814333136296,16.783225863460327,8.80567271738001,6.518738475741531,8.51491794441808,11.764839012037296,17.575908046455474,5.98662838175993,16.086845158949387,7.724380073395588,11.07609440924966,15.738874076499409,13.201590520978854,18.386060248268443,16.52926931653422,17.10343690683562,19.302925863721505,5.326554965394629,17.022255084647334,1.463548684415338,4.647380504219342,16.094611472921002,16.69156362371841,16.57702997886494,12.041131649954465,12.280954120715823,17.087257039167117,6.733575766856536,10.866037895262858,17.192656266820705,13.057185760967997,13.290024805861112,15.275298966880818,20.55216331822031,9.674152914739572,5.492977912513427,10.959240605770798,15.236767703581359,16.491769354704253,15.732059005759211,12.530262466066961,4.577449483254882,11.551584632798061,5.944929763652155,3.8963585119765467,13.840178579634273,9.770146590782662,15.71645171074735,15.140958565479842,13.888182862848389,3.4642195506774733,1.4134847085356919,11.65930702665252,3.1935303646414672,17.60176882665898,5.938433035152321,3.6116672090965265,19.667159448607705,19.695081834770797,13.667665263714238,3.8642655587530275,13.472059753222311,10.694884785827526,2.928983262817243,16.776002023081624,16.787523004608524,19.92309694814644,3.233893854723785,11.375041804138565,14.453738682349625,12.71230093058233,12.332560642063413,5.50728079636407,16.80218139530706,11.04043068632097,20.832711541893797,2.2549276803100406,2.8806141736416615,17.27403302957159,7.0380811453361005,4.650447351118875,11.423897805229885,4.543689350215207,15.33716744989586,1.2934672651453685,8.663885663291481,17.50914627286341,6.3818600893200985,13.335716665345426,5.629679479556077,7.570668778661548,4.400165063655991,8.842215978089527,3.3266193563241755,18.31077336070298,9.771308861503456,3.9876579695868433,6.682975378953943,19.02962361798833,18.38722468343982,18.644598142024968,9.20180073725787,6.780486603303254,2.4120895395616495,14.861928531542587,10.739051693325859,1.8935706581127034,6.630719828975104,4.853522354245427,13.350343682507017,4.1448462999893545,14.232886408884603,13.393581629704165,13.436076688121513,6.757120101085773,12.924138914322668,16.439806643730336,2.3501653158770166,17.582905144018238,15.862297752901966,10.208569474499884,6.01870017364098,20.072941945816005,20.79617144981358,15.938756908270951,14.905402907158319,20.181222696792428,16.578431248244033,20.848341691119064,17.58750513084595,11.229996211422367,12.86576753602064,6.5596663908973065,13.946561245006682,19.597246631071492,2.496150583774507,4.415708493749858,15.753444248909302,4.54308502630607,20.018030124196244,16.23539723391588,16.18064084211503,2.6321579124525964,7.139655870299143,1.7347435020780813,6.431503835258593,13.499759560415434,4.5954724243483005,3.594113754673444,15.705564108558459,3.4117579129722033,3.8026293346434983,1.561649220223237,1.235975670062536,13.549631824798183,9.299865465974179,1.8651133751007078,15.364675799399427,15.373636129727604,16.91828449266461,5.650730132165091,4.914206781799403,1.0199369669099347,13.649023952171326,16.650706359870288,4.918113522531819,17.22999506698595,2.176609884696145,12.25796546299025,10.622947678045254,14.742962126403238,16.759416894199788,9.56890895528267,20.29058996833985,17.082088674047704,19.580415906201672,4.959991375586154,8.184079428772062,18.309449618921565,7.3700180276672524,15.535946749954771,20.16427690751007,9.149292167528483,7.355415289239321,16.21727981364874,9.696409849561597,7.712140612752129,18.760770726032984,13.57327873944405,10.001828663155088,13.789172764769635,10.259560917598936,9.572220905155108,3.6880718089550637,3.7404069988196778,13.527087706404082,1.872404486507703,13.520117708861296,7.655154683059306,5.680084847310146,6.022867214202047,7.187247866827472,18.885767674857924,3.0276494941472833,4.006391627592402,1.9854728699536652,20.138443820937518,11.99065851606178,1.1288604298637397,7.537778917513024,18.98343961310037,15.692371590501576,13.363523434503506,7.077715938077182,14.39427246599978,1.8413558402963028,18.354159457927913,14.768604729313294,4.897948076650142,1.2607731310221695,6.425128299003745,18.742703620836604,4.015368461797743,9.64851720035654,5.985414671856181,17.022256216181713,13.840573084629048,8.916770776971598,10.448279623672665,20.25576461517094,1.1550836441686343,15.2860157754024,2.404014476723945,9.005912164126086,1.3730733680969278,2.8184278041802893,5.261452454791721,5.717619341578523,7.502510945082305,9.387515716584776,1.4711794827743887,1.0289209169384863,8.930931508178581,3.9038699806450463,11.44139804601297,9.507045840983158,2.2899707023258244,2.6310548810753556,1.4277702451826393,5.675353409724505,18.68527473228061,20.90837253218547,18.088241166752486,17.689917971153626,2.6207398714880306,4.599011946636397,6.287035581218595,12.473236762680642,14.632671996327396,12.423878716178347,19.072510431549716,1.6812469840862123,16.99190401218671,1.1331044599939846,8.354569638542262,15.167338734779795,1.676700035709401,1.0213691939100924,4.8359310801399005,17.123730918066897,16.8081508817072,2.28765646288846,16.6427793171725,18.704630220074527,2.040061880414198,14.758774032107208,20.50413911144459,10.463396847882514,12.635712084409949,10.570565600684349,12.999234999239716,1.6409933034643611,6.157890951312769,13.550298920103987,17.02519584459526,1.7760461568991994,2.079199206280612,20.06083227092815,4.37718322889093,7.047941279727036,8.970990767648004,18.171827083333447,11.859023410737763,4.247689548947759,18.03645912046033,17.768601341925265,9.632526215593138,19.689262504629795,20.62661704573746,14.514279936504296,13.60509738768269,11.354790475933765,9.07138796550408,7.40976689499539,12.190101215749483,14.554796376808964,16.756869461865875,4.875007932276433,14.712972992498269,12.39544186803291,1.6690767616542725,12.236744027530081,2.923010600978121,18.981126466346645,15.640845240645808,2.4174804299395705,14.303096950869726,10.081704592643831,2.337624503945749,13.166557363585252,17.588990544499286,7.809809822302535,6.035577196060279,2.4132000894750885,11.389543881616387,11.715251496200642,3.843220806603468,20.97968865961066,8.399867233842116,19.304226905559,19.75089197305581,8.780754733418163,2.1852003861693783,15.311730625531958,14.249950557229372,14.879616530536492,9.963445046119535,12.18060851392233,1.671271987244526,2.938248290343534,4.059588674686675,19.951389962658006,1.9261035043810972,3.963810606205639,15.987431898931112,11.651086771854313,6.4285188915440274,14.63606355459941,16.944069497483348,10.097889704075666,11.079012334402009,1.2014068022307791,1.575140506548042,10.323040524026895,8.351058343191488,16.597620071704206,18.985658784073735,16.646308667909395,9.078240729826005,17.245103774178652,17.247822905711082,2.0591064276277384,13.41405965927791,19.852514142994362,7.097664886852012,17.82435350813243,3.5639815585379866,16.86581353368047,17.194751156356872,19.9607503013275,15.013652776316817,6.4335472807203455,10.100522564194812,18.970605450225538,1.0919917471263565,13.710637344850637,2.342828677384529,16.542143875992718,19.570773407802964,2.0061483637010227,17.803448762775083,9.304043691174927,8.129788163371593,15.222085345924267,12.218452113972681,19.74271048283699,8.745435820393919,18.110533430854048,13.025566636098421,14.649848584884978,16.358896786141074,5.627557864006815,8.250117683096144,2.4475136157904256,11.326228804819927,9.312269595059462,6.371023060176574,3.356106057402503,12.597352016004061,10.223276633560808,19.88395204501797,11.474552466012618,15.619634734082254,2.4416366843833117,10.346209536037321,14.602216488417934,18.237338227106,17.763283466092794,9.840489625785231,9.15758044004728,6.036551369153437,20.658600819071978,2.692781412962936,16.136741510453074,5.177628263708066,20.486856457742434,11.25893818735594,16.436492797152845,20.322958928022807,19.778499987802313,16.2003185609357,8.526798564533532,20.194245322161976,7.911903901103353,6.57954750266211,7.063021840693148,19.22879741677314,4.400900402118596,12.480526227038062,11.063616517950056,15.403053909102796,13.099922288372532,14.254383531667365,9.255791769863855,17.775230511605145,2.5052068149066278,15.173240845445264,11.355527669088662,15.77532186509109,5.455716152209508,13.011047026812589,20.568727259128607,7.200057069882208,9.607269020787456,19.54641365761189,16.553285949421753,13.04619564309468,9.446410725093244,7.961570811920215,4.111438807763052,1.0635942010946478,14.17558203106707,2.2366154573232047,8.089313003229929,14.816197985603157,19.277203813396838,15.855454793526519,11.292985362405371,10.171591074389248,2.0978728810996463,1.031957125322153,1.2782438660326614,3.276472391095057,11.095664387363193,5.314833681362158,19.795221592410133,13.504091626282099,16.415639102932765,13.052347927950567,3.816295988429318,6.352295513206311,3.7054274665776035,1.127980181121501,19.860111333547515,5.41873798939886,12.510100555688641,16.038856805817872,3.0190651474596777,4.81396299494166,13.563535957013592,5.8094156889296125,13.994415353953116,19.78595042457262,19.22474050636226,9.623343902426388,17.76006344840475,12.057392058318229,11.30848457535698,12.821515742999837,3.1324164956601077,19.96652453298809,15.551577863300608,15.115359281407699,14.583318091058484,3.751605076397081,12.868394796564612,16.10737475561424,18.79670088457824,19.458760660979618,17.568649765641727,10.02867469682883,8.570286190606206,10.983157736223527,14.379846513401175,10.12404238515402,17.72911774003254,4.957847642244685,4.586105185968198,10.115337365416881,1.1731216184930773,11.673503000797151,13.375765777478321,8.827752743672072,6.415701580412349,10.629363165340333,6.952642607421392,14.237485423844916,9.201258151619001,12.600085992828916,1.093531187025735,2.6022756443309882,10.322842182558047,3.2767019976375336,5.367371129897828,5.482034592724333,15.319365227990758,14.695572907716471,3.6472837847418385,1.270676438042572,4.737293428333146,16.14537347158702,4.259060969922185,20.835108289043532,11.624552407845655,2.238323665986063,5.498557340697911,3.410486190246468,18.81602562219014,2.0733544472735534,11.851484395971077,10.659330259120855,12.008281623288214,10.48653663960959,18.227095848645902,1.6089028545709896,3.2142888348408585,2.9213767439649,16.812935294876848,10.40465783474901,10.955290991691758,8.072467100131345,17.313102612535996,5.037135126168998,17.28918273039469,5.686143699815535,13.699772180681519,18.022038006386126,13.568457219819248,1.2774693790391147,1.9734811002431254,11.826221996105602,14.856100325196966,20.957571464369117,9.767921511381749,8.114543087321227,8.878327946915412,17.062152186718066,4.626632470280606,8.1363631054255,2.124654161860348,9.645247011946191,9.016940896646346,18.553500910457707,19.7984527848569,10.072364526743243,8.072819771471298,8.911612893930196,17.19321722343241,9.416543913484297,10.899932731234827,8.077891782663555,7.884758729242,12.193679446322351,3.839388197852366,11.872931710445002,4.733532872067036,8.244987873965325,19.173352802371575,4.919452899378637,12.086671933651488,20.440763034428024,10.319553756981588,20.332075323300412,10.1865800150598,6.938076032291368,19.486119715994747,18.348200945575968,12.568489559843966,20.156892759862778,1.435964888541971,2.503666144537301,1.8082629924049733,15.002504101018296,18.146677585042678,7.931735245793322,20.801041461710874,5.932873524400256,12.344621444152526,1.1465902716918377,2.7358705566565336,19.36539383138546,1.347020068766608,13.301558814901053,4.336526591195947,6.273757667839218,12.013854561596759,6.28748016147599,18.25168943527729,17.598002733145968,15.237799382469095,4.329911219016157,2.214039213502769,8.858155548929124,3.2699399173059165,11.395317492063443,14.35240532403613,11.094377946786004,18.46411161117214,3.7713162266936653,20.422068900550528,11.848831313936653,8.867204975084992,16.816798618807482,10.172520207792395,8.7132364151657,13.471709592415845,7.468931051477567,7.621847694709824,17.640528772641385,3.0499114133646934,20.145031497073624,18.3032996455511,6.812093540505545,13.319911779463784,15.15312674554771,13.961337969850032,15.51423491200664,10.055701090814065,3.133364798494344,7.281373316080665,5.745566431588886,8.0404636170054,18.767322054551606,4.252470716622073,6.856237759221186,14.86469754000811,9.197082349264333,8.813927217248349,15.79654197758478,15.04684593549991,13.120844245688701,11.065371695018577,7.356378133235361,11.661523682031525,5.409363272310571,19.912615816316787,20.931398162179477,6.019889574131251,9.822644768009763,15.144444927216199,5.296021497786082,3.8629759441262737,2.480940918877116,7.456445635691126,13.875207844777595,6.381559130273517,6.979466463158221,13.69192579853792,13.374294347737598,19.10433648082161,11.956940635378572,11.864956300666266,4.513210020759967,17.361913472189826,9.980269289371003,14.992560079065509,3.627638150052678,3.1183007002678345,14.850692396926254,6.766590028017502,20.34847241421523,19.4808820271604,11.872097898006615,5.823992193537752,1.67890123651551,11.1499898448284,5.32705190152447,6.9587085044472765,5.513333674311131,3.3174667208758093,7.269151606917744,1.8114992605771354,4.254101438134942,20.96690126421268,12.406919023148712,2.38288534032851,10.79133128277617,16.62309146046406,6.88989171504557,11.916591963365079,9.67166001430881,12.207953290081578,12.039785920664338,5.60706927760183,12.42964559057685,13.930895573849238,20.51938430533488,15.339018179751424,3.566770276422341,1.6630694664614412,8.24800739000492,15.45483547347219,8.246819765224487,2.8959484675586236,14.63807215424622,19.358251380987216,14.585348122574757,4.6946404925711285,6.552152542292457,18.667484657742108,1.6807958046246343,6.236184241559236,12.896239898040651,11.060859364470431,16.97559579640382,3.548621155744648,3.690450577850716,7.459273197166526,6.1986490810162955,14.64630822611986,18.213251853337535,5.819561756798438,19.443450017033154,13.109010130417666,5.834677634621429,6.608329350660495,18.277850409231306,7.912156541535599],"x":[2.5372208679292263,0.7318948045112335,3.0469412682832617,1.6681808197470744,4.265066221195675,4.335367431029125,1.9327756293399119,2.948835460560357,2.5270310431180265,4.760096740532026,5.359009040574775,1.766906627678569,4.93078540383255,5.08715483583521,5.041052119142631,4.233866464050106,3.84018119583527,3.1746979702393734,4.716464225926298,2.604471539513473,3.2473001303374227,4.469906047758215,4.931836233309222,5.099829267486427,1.7150262428796186,4.792459111424292,3.4503644876807753,0.6384143170743475,3.1754198854257094,3.6425974519709676,4.847161478664703,1.8726960432056134,4.402854086828956,1.9898433504593678,2.7608492307221444,2.216144334101675,3.7963543420836725,0.5601587019147711,2.516597444022662,1.6805147231708473,1.8644600270159815,5.409691503285598,2.6523051525791224,1.8284899525982163,3.950714588660916,2.235275899475544,1.8191333922228399,2.7081829346651762,1.5806133291837536,4.3909913673652605,3.5618333278138032,4.02294055331621,2.7564386265854584,4.331880736305824,4.578416753114047,4.102134165346235,4.529600622233885,5.008434423792301,0.8173525423022274,4.395376414429998,5.184509687593894,3.0951494067291003,1.0929824734105216,3.0209071499878224,3.946106892097035,1.368190699330248,1.71436976566597,5.284813777540299,2.035833778216431,1.8998845998955458,2.4830883396094006,5.294200063837443,0.9414327811496446,1.5867227943317437,1.2451950016034463,5.06648958709622,2.0401348555394003,4.830616037238537,3.1730855904558917,5.954090584718704,2.820685325921862,4.537404086123336,5.395819033888516,3.6903181971631374,2.2402683767042157,3.4230831419290517,2.5737945750269713,3.3046213342103554,4.146839044723189,3.9645326279849513,5.233849507734954,1.4938908616054682,1.5585752993146103,3.3914123868085655,1.0172483581195986,1.3875754922684722,5.172100145791719,0.13409523779295673,1.8200854297027305,2.7071692531532308,0.38102235121065675,2.93755712887537,1.5053183758592406,3.2183693190389073,4.854428698298288,3.3272696711517233,3.4412306762834746,0.7255792629212632,0.28205822748071463,3.4618492713279196,4.183672162527492,4.125914429481225,4.2261612945690334,3.0332370573023955,4.053485583280742,3.896714880364369,1.7105301626813472,3.332342215280649,1.1495300354643436,4.483222002258055,3.5221586093613766,0.5076032656761089,3.452928082136567,2.7600668782136664,1.560025912093587,1.9720319731088418,3.344952539076427,1.3519916248544055,5.313667083552569,3.1296095990703137,5.900236009775325,4.486102305269368,3.6068330452218396,4.278006972897397,4.345307859401641,1.623552190430937,4.08710257094382,3.8761936349024966,1.973900255871643,4.964551328975278,4.031651926620381,4.048058398882441,1.2662568319382232,2.3626635246395993,5.371581652509643,4.433772733587457,0.7145597514990818,3.912528135518083,4.282689939759769,2.0317885342746465,3.4957960698365764,3.811446515353089,4.177024555999675,2.193331492162922,4.363018203797271,2.4730827838551246,1.2564181162437273,0.8088819846162885,1.4849618517761394,4.85261473446577,4.6092824349093995,1.381161558159221,2.079861672132424,2.921159676335966,4.976706740024536,3.967544592622588,2.610708689016163,0.27826761345244866,1.4326914784235776,1.9219497849329916,4.122550220265759,1.3356279423723403,4.647011600789755,4.293891341771438,0.42022843226982665,0.8914062692480109,2.718176300712386,5.029705865055798,0.43137730604321023,3.385441916302918,0.94917264670314,0.5781688164941159,3.3571496122075635,2.9103124452738145,4.324649743772393,4.634783126139101,4.5621045657664565,4.475110788998626,0.9672210439850539,3.4882991077437637,1.853421163235625,3.723673748058446,4.621795177619367,5.24272880695065,3.7397621855155627,4.503053139971119,1.1126239663211124,3.482078046792599,1.4176324663301938,4.716900945034815,2.563905509796032,2.314726675129612,3.855164058115223,4.240131254582928,2.2969495342022297,2.686260275225689,5.26416136168077,1.8363380870522148,1.7645667995228786,1.181283584581735,3.825547764173308,1.109516079397419,1.7784547667603638,3.0812139000468655,1.6152390183003997,4.059334607601774,0.9137629804902814,0.5807845306994912,3.1756475898104464,0.929450936676314,2.552241357735797,3.0416780359162106,4.136943171416552,4.125927872317144,4.268226806456022,5.167620572307957,2.357006486422998,2.2307488451479855,5.194517866365086,3.843820594200236,1.0115220391210549,4.187999430631456,3.6010476377439655,4.088058851251575,1.8984330520737827,4.111332535762788,3.9296293529094606,4.573767668748321,2.468936195272188,4.713623545646876,3.0148965181598912,2.9879784683549864,3.672932369732341,3.9407691062500674,4.473683322823468,3.7946775674553246,0.31243915445672665,5.802612846399883,5.254047874713077,4.635114700870041,2.1577963236323967,1.2895556583881715,1.280638737857054,4.74188052911609,1.0246015795237076,3.9330793311405605,2.7518222699854187,4.025406710275213,0.7683656624452964,4.287779616377677,1.6158933625839806,2.003461712034339,1.1530394851434065,2.2791886089193545,0.7228648077826316,3.1217321771082602,2.8690478975404723,3.156489901626908,2.91571644010293,1.8730602261505156,4.492395878458545,4.37617557591849,2.5477374710177703,2.1165257148563494,5.550445357259935,5.397257625774431,3.9230490447477804,3.475441595305967,1.787037915557093,1.1166327154275533,3.8899049736542413,0.6389173525575866,3.1974633016567404,3.484398973052153,2.4962456016639374,1.1295284548199929,4.68201215873272,0.8106127708748858,4.796425131362395,0.3886894281633204,5.346412150141593,3.7537037615188544,1.5391219838042063,2.547657654706237,0.4484289258122227,2.9115765594239433,1.707043009471567,3.734626434554044,1.6582251879851821,3.765320466120383,2.4351858923748635,4.219572762551778,1.1661314969968737,1.8321244175788411,2.930123413078371,4.819204010586415,5.411577097276277,2.2034702595039493,2.404792840783021,3.1653637785446875,2.911714176362802,2.7329768824052634,4.285311827822676,1.1467116214944153,5.037341087233032,4.0663159382949825,1.929449569790271,2.5934014207739695,4.94564733341511,3.619593171702855,5.3737767772218366,2.940555789277057,2.5391795673693025,3.6143397646802047,2.578613688420875,0.9700771477823216,4.199072994379538,4.31830275978068,0.6205536386094521,4.334426655693532,2.7715993904629603,0.9339638132178925,0.08959784828896611,4.362455825617017,2.92847763008715,4.818159043364679,2.8212939300472932,1.9037006709328437,1.6318083835111175,3.8788250794937147,2.599633384244815,2.9680915936213763,3.487995798964598,4.416708305071141,4.052230474215526,4.031836162396119,4.29171634354535,4.607266679753361,4.827062621790489,3.476269314726469,3.7009249734893706,1.5577409941754943,1.5582296787499108,3.96820600738054,5.634435892469162,4.839136093563754,3.857342546162238,3.996388335889818,3.604680295810508,1.2852106596986352,2.229327453691743,2.0502935283836914,1.0252400688684333,2.3649902794950943,1.6281430773923518,1.4622044242301413,3.934913580972075,3.0486010326300383,1.618215800521382,0.7355002852145893,4.49929353564353,3.137130952765077,2.707724749854674,5.420669681781227,5.552491665967798,4.1514112225871465,4.5716273732115695,2.230030421333517,2.097271889102686,2.0657115574282137,4.2431006907960205,4.962560155493766,3.276035254960295,3.4213424768398992,2.3951643046742555,3.2035976827355945,2.9922016329166574,1.2459705386472566,1.668898628788795,2.2733478712479864,2.698256645361048,3.0620066047733356,1.389215268881319,1.0166485165893882,3.2546934463260024,3.2344084494054526,1.0263061190022875,3.9663914229065607,5.0305757878767405,0.9294026662081436,4.870874221874211,0.8290762901349529,2.0657204537042757,2.3576365719956716,3.252167184720823,3.4175747449362035,4.345861616988968,4.402371567119465,0.8511048520738269,3.2672826204770886,3.376448157737118,5.14932094092838,1.8293936984412518,2.665544439349473,4.69282052348072,3.3435214561296793,2.2358317434144848,0.4604389383199703,2.2182727498125345,3.3986126731791813,3.436228524290812,1.8696827560780018,5.513685036675854,1.5342089707973219,5.617141062770925,2.064226581494631,5.307121409572755,3.354754095555273,3.0768463124714485,3.986495649133089,3.2612555407143695,0.5408488005971637,0.3778448138186288,3.8853449499872523,0.8343223130702075,1.1315469345564317,4.112196538405316,4.391287822987051,2.1927620999541144,4.047881234245919,3.3327977672540388,5.237145841611095,1.3234549855351454,2.955488688090712,4.7917127679147065,2.620536196297313,2.50597969086905,5.012472833844952,1.393165859783409,2.800146175487666,3.526186973993199,0.7234981866889592,2.9468359259285988,4.758245534519152,5.049401705763946,5.1063520622215055,2.433645056902656,4.064041240283319,5.184127500499505,1.8054166847013813,0.8321669075509559,4.071733686846896,2.9002639560504884,3.4224766706413003,4.011881842739491,5.78865490560772,2.2588457894055947,3.8796535253059723,4.103756626772599,2.722110069597753,2.118637176703974,2.192657664432512,4.024121114000094,5.342250779231263,0.5951486881946193,1.0450811325692906,3.3782439945937517,1.9219876454878395,3.627765328297607,5.060662699840417,1.026547006384846,3.4734359825416146,2.4364991538807272,1.447009665171049,0.31203442013309823,5.4703213557938195,4.448794898546211,2.784073729008914,2.2402304895527587,1.049458919550311,2.534015368035515,2.274499399397122,5.009838262562956,4.891433998423106,3.95398344736185,3.7817981376470406,2.013288200348657,1.5627770966251262,1.365000604887206,5.069319626082342,2.798318177417393,1.5603265230354595,4.550374575205836,4.996424154665952,5.65470513609798,5.3450555770648585,5.215651123634765,4.307530194202325,5.631775573861391,3.578215013457713,4.580358551604316,3.718483479615318,0.8567664870468739,4.727072293716336,2.904089296134268,1.4240560488107776,1.95457171113894,3.013362581400509,5.377409942234257,4.402654386803015,3.7700749104167595,3.3787664659667405,2.4708098017160003,3.0401443838006585,5.146311180058291,1.514591628734653,4.700099234552234,5.912831717852896,1.1465251960704221,1.8320164576638276,2.4874908548776684,5.3079939561230045,1.3351213566362254,5.051215624246649,3.347483086000672,2.9235645533000056,3.7171460165725208,3.3085901844521,5.105996715741032,5.3550263109241225,3.0153908382947234,3.58330941929533,4.718953313222548,2.469185290779608,2.263766582329259,1.8353930794292213,5.352255504698091,4.167133238974392,3.913975668136973,1.7987978451315125,1.636698708905965,4.540858567526802,4.991222873496093,1.5519917942151222,1.3511277408546574,2.4715553020341763,4.065458564037203,0.421031253193173,2.8101895866777546,4.672643308432926,1.9023367293105402,2.6607472390411475,0.9336661711812793,1.182182653886115,4.4766853586239534,4.946585787296288,0.4876408546387463,4.736092007420546,4.846102647800215,0.8964857437445,3.0020405346873136,0.7204011945801698,0.6980443654029433,1.0530823631584918,3.3119638723782634,0.6449281128461277,2.532634043523364,1.9742856697554956,0.5207813950937206,4.961536042038678,5.638025251746246,3.584798093204567,1.192175546449521,1.5818837508423504,1.9150680039897117,2.6673499254034523,2.1511672237048485,4.340336716344322,0.6523738827778054,4.783436958969951,3.69388070367827,4.466477461252954,0.5561894124990998,4.433401242958626,5.506220229938014,4.932416795693804,2.1312565939213686,1.955036681156713,5.411277252522664,3.8397771603834276,2.539099555396495,2.7246475095898885,0.7549739126643693,2.5141704449840905,1.658293308307576,4.01684028350524,5.313666640834309,4.945374613438982,2.1938839780549158,5.463878039119042,0.5133023455685564,0.22352432742087514,3.7724095778588547,4.88412406598755,2.906032278731455,1.063513467586374,3.356355626595336,1.007109486608206,2.271359365792086,2.343722405071082,2.2782789720105443,4.570056665920163,2.2505079741597767,1.203689191019465,4.194250046005184,3.7141154465100072,3.8261469483873967,4.959029411790798,1.8449428751010646,2.788586239804756,1.818608410137396,5.227547222686177,2.8345833992646234,2.352339268249504,2.102918723334583,3.5327497358371955,4.775616798215311,1.655187938121928,4.708381384061219,4.6528681316038245,3.1055844525704166,4.162851572918681,1.7079372995316997,4.568981620837611,1.6777818895131456,2.742917115115829,3.3422333599340623,4.069800934167701,3.703448657758961,3.7517149384678383,5.176139923200198,2.1864253328168903,1.885915309134341,3.8620813667598624,4.440407075260551,4.231093728518876,3.2545863004267575,1.5042406633230414,1.4325401683402255,3.448531314121487,2.7661527019412935,1.7187954075071645,3.7021732022654854,3.109116453289073,0.9467300463495505,4.675912215057332,5.746645891659568,1.2355407202117197,4.62732627841809,1.9823204902169418,2.1071657069215215,0.840681068949017,1.1490036991999597,2.05459650936221,4.769390716027255,0.9406235279370112,3.6903660678605332,2.0232917809128916,4.638540906097378,3.8844171125906923,0.9571141385664375,0.9474475450818283,3.8128978492979084,2.277750670277943,1.7266539844477728,2.897659722295667,3.073978091301491,0.7760055269896118,4.405828442795836,0.40102708487729744,0.896122090436813,4.997579990751999,4.753727385879591,3.1400970290260704,4.477223556990216,2.2813990861983973,5.300087336301385,1.0884275537575543,1.2829377105350765,1.040701054338604,3.7387595503108586,1.7135238309084015,1.7546249890844594,3.20328272407602,2.330499760056999,3.6901149758440672,5.637933757413785,2.7846715317064525,3.19415509834838,4.540326199786054,3.640155172725943,0.6225722641721312,1.4077755295084482,1.2450767392639106,2.9337652462912795,3.643531306638633,5.414220233062015,3.8154377212740918,2.4237705936741785,2.5642375935450743,2.082075149838029,0.591636258815671,4.976545572225923,4.925839481076821,4.219025384453951,4.148871089464535,3.4126662501838134,4.20852795820476,3.0818437080920837,2.372966371751466,4.467232937328287,4.853602718982499,2.982064086414871,3.8374077873115464,4.49898781821702,4.658616726080975,1.4086492060303344,5.3113734090025275,3.426805759879022,4.537502482263477,0.5001505240769266,0.8910648762678854,1.6717876195673174,2.4144143835251306,4.078713641668873,2.011430412179994,2.4805447201874156,2.8979829803483597,1.1358263700943163,0.8185360236487562,4.607679209271122,1.2749408102744446,5.4648132791862025,2.071232174067365,4.348057762845984,0.39233876866479656,3.8157444865228296,5.548555418099521,3.603090213651071,0.581317615625818,3.526976675138166,3.304354480533702,4.326810122518123,0.5417426278522202,0.7141267099324049,3.264232694445325,4.001485461389532,0.5388023914564235,4.383883848976572,0.5776578347145604,2.838402438907999,2.390448848259353,2.8812969182556305,5.6471551994066616,4.077751653601304,3.7373643244872,1.9425710811135983,2.8292827165527656,2.4273314402442727,2.707728742845504,4.941879666525204,1.3251138457853282,5.870026561362566,4.2916322782709875,0.8834097389877096,3.750196520814397,5.128921098254803,1.5866751969454094,1.470196253535524,2.0132533957759167,4.549070147734923,4.304738316599207,2.7534380058364842,3.889380929468521,5.229549265706296,2.725309140341432,1.9626234490822798,1.824638248715944,4.8256754441327505,3.0968150657477898,3.108948019291491,4.004556298907773,2.2014677489868335,2.968195875857702,1.8091566241315027,5.098782968106381,5.112726803210466,0.8775131152375291,0.5719157993308135,2.2684806260205375,0.9923685418463415,0.4322861168032175,2.494695006909352,3.335976979585169,2.9842861092271695,2.8395771222790662,2.828085693188349,5.320630865117611,2.717241095948374,5.545866364357858,3.286945183017231,2.4179128049047254,1.6802655621219467,2.407589108367036,2.2278174401061173,5.080952971357956,0.19449020907158676,4.206289257688382,2.8902702331405834,3.114819210521021,4.831677154397699,2.716625438495476,1.0420906687283922,1.8268139947821982,1.835615799084654,2.3157447644570253,2.5032924680022246,2.0813935156687933,4.934052817129314,2.7660423313737805,3.911523079753985,4.196661791780565,1.315071070663069,4.378548556007912,4.01495690786465,4.342851878181118,2.227785301723859,5.332594898599288,1.8463486283028394,2.359329870980447,0.9933094686982116,0.5200198134003207,3.592594274551689,4.520386315435797,4.895019593386806,2.189830231248514,2.421956110511851,4.824957165532158,3.9092701945642085,0.5119244349625114,3.97193072241412,4.88576476030995,2.7733060579025537,4.375349610003761,1.3771483043032084,2.3329267591868,5.183830684505059,1.2845133645461144,5.354234504123173,4.725052973396953,2.3077811070146206,1.0896669667767416,1.9013743017981124,1.6008679341406995,4.082664062172788,3.3272699615648866,5.377802984824732,0.8943291069456207,4.6814163240848785,1.4170279929676513,5.647909863149724,2.2522295131561703,2.4705377666040507,1.4600021298292372,2.8883443100960386,1.9254091149797032,4.08198239116693,3.1030262745880903,5.351409081114189,3.4769640063127687,0.6174840331086526,2.3199567863689796,1.2189681374617167,3.0567256350939034,4.780406111428215,4.057630851010151,1.0041584134855923,1.1856140713925845,3.4057199499983897,2.2998282643537378,1.3929726325154967,5.134160082282986,2.156945157619811,2.5691948607223196,1.7281623924275598,1.047488717562094,3.440448306102734,1.1441674544531506,2.2643217906018487,4.9507952933826935,3.893460539503417,2.1946238925572166,4.288086710915998,3.1094101971757047,1.0926000044165032,4.436162519484337,4.845832914186129,1.1857448576234684,3.188274630531285,4.004381617456299,3.3063259559624774,1.8249638405874955,2.76449239260546,2.324025505643575,4.569233318108476,2.828121057133629,1.4685361015709488,3.7436036548181884,1.4780898962045257,3.718484109807968,0.5817532028089265,3.031727590209421,3.73010990515167,5.057652201239428,3.297886149440763,5.195252081347183,5.452139790768015,2.565338087309163,1.7054221609404074,4.5980041236985905,0.48716238941743106,1.424315272578761,3.0367381064608394,2.468613907312835,5.357024274794042,2.517093474554147,3.583960399631817,1.2823801823250038,3.788141345537194,3.9742252966931515,5.3555283282477815,3.8873823685163185,1.343093343362363,0.6371555670263369,2.413024458419214,4.8131798453650045,0.5306158945086303,4.287062581400463,5.65959891971135,5.26428217526463,1.7140964010025352,1.570096848665595,2.655460881863248,2.7543474643923407,0.9194781143447612,2.5070552814033897,0.49697521612995343,2.085333567559223,2.980164054593499,4.509026997383648,0.7244685991763333,5.034993705796946,2.7307848590878994,3.119642954035492,3.8586140557354174,1.1295159125510776,2.6283639885059653,3.974622818705584,5.5808560376642795,1.5405670789915076,5.698644982505773,2.469092267952341,4.6286186695055065,3.498233844820099,4.341187247739835,1.3334730119886404,1.013388521553028,0.6042502519753681,0.34157831628094404,1.2015224005951857,4.096608562791821,4.583308901692014,1.7047739464668183,3.311299990994847,3.1195700065725647,1.3547060847330226,2.5452003461068418,0.8775228831823709,3.2089158845120416,0.6028592436824489],"mu":[0.5231361622345356,0.5962703119886754,0.8425812973986806,0.9268128586385711,0.12307389408985103,0.7101783550994616,0.3374792870914496,0.08197196084649261,0.5658697402287485,0.6143471953073842,0.7974279236306223,0.8238150184172206,0.9661113740288343,0.9627159396884515,0.48041300653434127,0.31146185929459014,0.47503809135145114,0.5172786914829091,0.4520756575200764,0.04825457033705027,0.4564528373637413,0.9580184551766329,0.4537586755710903,0.9576640106963699,0.5254043528365941,0.841537102647897,0.1964973673789958,0.33077775108464125,0.6341954474328231,0.2165173371213962,0.18340326355911984,0.09373582164380956,0.2278211062086979,0.3379761670694088,0.14652504717713866,0.09546519843782053,0.9673693256648059,0.12356350672120797,0.6209320063929109,0.22164170600205924,0.8585008634423272,0.773565014289135,0.1367893367358355,0.41652297651070325,0.8453001550080386,0.20829845959938842,0.15325280673937414,0.879561405961675,0.29543600406467463,0.4703277838208655,0.7694002157315203,0.8090779795754643,0.6971282865006649,0.13398767050953886,0.2428614355200629,0.45305478168500346,0.16162441639289082,0.7736539829887994,0.3335357509580803,0.6765520033664605,0.9938698050657289,0.98000047245195,0.7731244113963027,0.17397124633712147,0.340244295936847,0.9626102248378139,0.9315321185262508,0.6921263591125457,0.2591034596808446,0.5248965422051175,0.887637617603878,0.9597852246766398,0.29411502150324376,0.9002127500449437,0.8603244068254057,0.24950014047332925,0.8915247780461331,0.9658297862443954,0.582452279594665,0.998896680135483,0.9988589389884457,0.015341210378213566,0.68559727901364,0.777698996315364,0.7376146715122225,0.20133714405754133,0.5029518560780435,0.2728505908653096,0.30863852552505944,0.43951974892982526,0.37450621636027615,0.967903183553265,0.9256991492690609,0.9133542256110381,0.6841510075571062,0.7479542276135429,0.8855040377332875,0.05189825021536598,0.7462004056293972,0.13892693814493962,0.3189344946746684,0.0234568390444978,0.6192930265975274,0.7028080790753874,0.9223956573089966,0.08749011729146661,0.15079101012047946,0.6187007061284167,0.05455867279212301,0.6401882899573557,0.2579435008883295,0.012188199852537496,0.2429056485074037,0.47109281441720396,0.8518059729471987,0.7976902741641207,0.9174978257253594,0.4872255436314974,0.7556691267753637,0.1376745805967663,0.3410015117826213,0.3199465406113058,0.9961597320528115,0.31325736195754117,0.31642716477253074,0.10751378982960613,0.23995579338939454,0.5975704382142648,0.9244500583030479,0.12740287010324747,0.9036213095974477,0.004672979440654368,0.46134958393067893,0.012131466472381502,0.586254779612627,0.8973006133764538,0.9038071419020339,0.01724520956441644,0.15526362395620952,0.013460074960183865,0.5464063668335915,0.011963971891797875,0.16848986913731534,0.7750326706266313,0.4310982051701693,0.20100805983652892,0.48800411605190086,0.3971990746056575,0.012287070090771346,0.33193126533473793,0.1276335456401747,0.2480796264248415,0.6883687986113936,0.37979705513506823,0.9445523257487076,0.549551616631611,0.8871577015494672,0.6706762270043252,0.015352972968543765,0.13826661209562974,0.9018744986551934,0.11510134473269229,0.15723885667256954,0.8207638381856546,0.03415821894789528,0.5090145201483862,0.921279505619476,0.22206196907847753,0.8109339892170528,0.4699215353736643,0.34915641895135674,0.2377126407970418,0.21304009550277092,0.07079649769989738,0.00904906732176558,0.6169542923271611,0.87875236908006,0.5538949732300085,0.25755719849392955,0.32896588634738766,0.6888472341452099,0.006356381907051345,0.5858631851793803,0.6785832311171709,0.8691065811954966,0.03265698759056801,0.3120324162077275,0.836081179218193,0.4686687846641937,0.9078619786882116,0.694291174303902,0.3555503587112543,0.08266349468182987,0.8145816531734131,0.12546508925560196,0.19864329558342764,0.21894899032920967,0.586877418567664,0.5698566525828326,0.9525590727477946,0.4940756573980689,0.010170085711959764,0.3533381658554291,0.9337313153146871,0.9693810004963421,0.7932230468958257,0.37010173259345924,0.1194500005661634,0.659812056645982,0.5108505843726154,0.7895164307673308,0.055873924193893254,0.8084790559092363,0.11060729300888994,0.292467345584714,0.2236090376613049,0.8146011009919918,0.19053263538249698,0.25153593757509896,0.13175353364477638,0.17279703946063996,0.40576458677806104,0.11853648953464369,0.94097266429785,0.15989940104163147,0.2836296805667242,0.7456658428520924,0.7146352193859675,0.8238572740209187,0.8994060481714929,0.021865251953717024,0.6559713337309485,0.5091037418886339,0.7224602920093728,0.7213054028822876,0.9708153448156192,0.11737112171725794,0.12109931898166915,0.10956087988107588,0.526663316555734,0.6913030075458801,0.24491262249977375,0.9720842876873457,0.034253163573382484,0.2873561154414155,0.7031047113768274,0.04648843741518349,0.8340641522440821,0.7468705458629452,0.5851520150218883,0.8157793181000978,0.7885644763774755,0.15540142535690604,0.20285920925034118,0.4827050653283651,0.16720308217683733,0.3537301182919095,0.2665472742748243,0.11695506902626018,0.8070794341955503,0.20024187940260907,0.1511277299559024,0.12325035588136113,0.40010726380005357,0.6939649220692612,0.683719577518443,0.9977622515938758,0.31873116263254464,0.52866027258898,0.2687884124730475,0.306315919918406,0.8819084273842432,0.8148300465075511,0.7246232311724226,0.6919468295391078,0.9641462000901329,0.03405338989845719,0.9876062990569656,0.6651850633778293,0.18450169305315378,0.9642927232008771,0.1161699285454556,0.7297475887158127,0.9030751733484512,0.18124955537735032,0.9743964952026023,0.29778397527310085,0.39808290029617965,0.6757643792802037,0.04572115362526574,0.7346329933329159,0.8265075605580456,0.9170504463809386,0.3838217615472206,0.030015446228643494,0.2877413603824448,0.7428719360459499,0.7596114546441017,0.3102195440286719,0.7708610483753839,0.10030226812822352,0.9883345203473626,0.20133656168226577,0.01950684022796656,0.8428799576980945,0.07961214565970809,0.7966047221455832,0.9166781560770967,0.4175900269131583,0.37306687968119223,0.5896728133201847,0.3191124458332504,0.09768997079840736,0.4224506960701715,0.1209364334816001,0.4997758599619828,0.8042212356145679,0.46473528959396604,0.19410011202674826,0.14484538922542312,0.7211003057991081,0.8141322109267193,0.5695424116413066,0.6183975743844206,0.11774692809111409,0.6671843199860488,0.7864469285869171,0.5642985193707946,0.1810391687590227,0.5318853795476248,0.8728228212287008,0.8174717125611248,0.01905854309898447,0.7744881547591007,0.7461008077462608,0.8899200869769648,0.9199727794267734,0.4490053758148955,0.4290495208321521,0.16108820925026812,0.03354346574386158,0.06525466783852596,0.8739398011143542,0.8733568724343577,0.24439629705214183,0.6993010478863251,0.6923797198115524,0.051776628949049774,0.08743832810036567,0.49368563837908486,0.4219189804545813,0.801034976709583,0.6062447646707894,0.13647906001556165,0.7568353413619855,0.5251315189564403,0.5945454470211067,0.9488275025763573,0.6768566798047311,0.3584862680549312,0.006217872083376985,0.04530961502984421,0.32326394632194067,0.7717725954443206,0.7917316293698835,0.1417229646976259,0.27950654778048634,0.09949273414681459,0.510843612688463,0.01794954283781247,0.2755337775966791,0.7500869897953657,0.13204353426623316,0.4952318865558889,0.9066704672025685,0.9236088116322496,0.2357545577023612,0.9386137326058859,0.5587072367701733,0.4295909336011994,0.0870190689290633,0.6223872090274594,0.4714804727102193,0.35400650322004723,0.23097856883243528,0.40998680779822916,0.3248413871767648,0.6748756410539483,0.5935443505311309,0.8336256788443768,0.09153218719973544,0.7152205399383864,0.3361732655400911,0.88241774479238,0.33646386905362125,0.9284404099221077,0.22114737629310866,0.9318680571176081,0.263111183724821,0.13991908540220832,0.6417564427263212,0.615503638202382,0.04848575803590305,0.03295349104270673,0.17307473095011883,0.09083388519942681,0.7722638317698869,0.7187342484335677,0.4125867920309585,0.10689439742872597,0.6747762972170817,0.5210011579334914,0.6127093982068044,0.7456454257351028,0.6309175474482955,0.0790953250808708,0.12520869477791652,0.3566110167974823,0.30529723183615953,0.3485306941281219,0.805829294530136,0.3739730484763617,0.8550114090561809,0.517741010086701,0.9165559192016357,0.5565408797584976,0.45022579574036903,0.7202929571441035,0.21875445917750835,0.7449288983258338,0.2861116787385283,0.34093478080267103,0.27568245400936964,0.8011742387907133,0.14255697340507734,0.4120190765484739,0.4384380681663471,0.6302131487958216,0.20039997474155857,0.3066775167297391,0.020625264207808858,0.4658979576168212,0.7429528324700754,0.84268907620485,0.41229865492676354,0.29769361337901246,0.296875502735231,0.4404690290171711,0.2118932919846621,0.9040753985621623,0.8361771766847836,0.036514459622606577,0.2567720755114171,0.991282366561989,0.6426623827486913,0.12991829467673033,0.3676349615808221,0.5225998276277115,0.6188341253858345,0.3196118864714186,0.6928867311057147,0.6056910753364266,0.7277381774006897,0.23359819052932274,0.9376369712457797,0.987236292478967,0.48739732547517733,0.8440775445101465,0.8107440091873364,0.18691878707331822,0.815323107780459,0.8101377552591489,0.6982349723895915,0.4918146363525966,0.35105130364139914,0.2315044954312957,0.7405626176021567,0.5357868528351386,0.698884166632652,0.1261148851120164,0.06696429010568794,0.25229559440021765,0.40173531979489185,0.5356530825787691,0.14655857862022392,0.7804348455896271,0.37177500037256883,0.786517721999735,0.05285725775079886,0.8316247788598006,0.3463294842111402,0.1296147853191847,0.03836243226026137,0.16246933953264975,0.7725953961764356,0.24024014403637728,0.1158519258047015,0.13780781710470902,0.7119347393366622,0.5341589635116559,0.08172314557711746,0.4453284531194217,0.04599464637835915,0.692316839995929,0.7232954398214924,0.5815890165044739,0.6703323813132742,0.18439006883304443,0.7006651043419987,0.62520752746553,0.45877551881539036,0.814709568398682,0.393819329120787,0.7858369254539181,0.501260356655463,0.3828650930142983,0.7462606412021695,0.41104605389081517,0.5056924293320981,0.453879366711736,0.6879882385450062,0.5123258293834627,0.28813933273509273,0.4802957501027776,0.9010222068864793,0.25180423126497287,0.7739683091391116,0.9231385272671111,0.8779470979706023,0.8211291189516701,0.11752135607410952,0.49314848900664576,0.4609319987350493,0.3644138589316348,0.49559661766918484,0.23567946664606887,0.2675856134116896,0.10341729176005154,0.6894071136396662,0.5488940713951682,0.6876436162272193,0.9517100245052565,0.6525164521669626,0.0010207266212771682,0.3894336417495943,0.33857563918216216,0.7220049569645004,0.852225644796438,0.785906022423275,0.41290434954673905,0.7816540581040934,0.2691278793316545,0.9093429180285024,0.16778018005993256,0.4458769879118618,0.0363458022220855,0.013202784433245851,0.05993796964456832,0.4311186283366384,0.7581306246635222,0.956290912710998,0.05840519780569475,0.5228910620922116,0.5243638477018047,0.946199494622102,0.500668720151414,0.35444891296618497,0.2816358432237014,0.5551722955357348,0.3322634290139419,0.4142043148959229,0.3596389381357763,0.10794291491807217,0.24944959060073435,0.2834800797417485,0.5657171413215873,0.31877632379744814,0.12714232526195302,0.16507573728096792,0.49792988205342503,0.8297118859041601,0.6800208601631801,0.9466043373697275,0.35632520714313154,0.21118945749184936,0.9291222152288601,0.7555341282083452,0.5379246215893243,0.21636384882444082,0.9832618384272409,0.08420840377316852,0.8108442431876459,0.12085018331886044,0.8126184858604024,0.6508807606396079,0.7096167225271102,0.17554085543838283,0.8649588924806682,0.5239964769735503,0.7941481968222157,0.019299577022410475,0.17559849691937424,0.05826831745105765,0.554264213531694,0.19482026514710005,0.1024911420295267,0.7966374645761372,0.253516625116468,0.6145260231377869,0.7532377577203864,0.0968299519347986,0.0642711490314527,0.0798521879600782,0.8624227215382778,0.9755900479045807,0.649255211604854,0.5644369388133144,0.8669461616913972,0.16118238711298227,0.5702824342828068,0.8171271624697105,0.9947775600053124,0.11511155515647498,0.645504588464755,0.9821381155201623,0.5982178757543162,0.7907350682161114,0.8019295669977442,0.9054164490920737,0.321940751485706,0.22662582694332456,0.6398643697582729,0.33832524367997086,0.8100489105799709,0.8939337096190207,0.4310766172123184,0.2926640893899366,0.021254238408540127,0.5576963345208017,0.3561836816078594,0.6507592094806092,0.9072287895745061,0.6879060984124838,0.8268046764671686,0.2631526031285323,0.0925135897685514,0.5818279664335311,0.5789047140438086,0.8387603245677695,0.3639902814644289,0.619055756265831,0.82723203879042,0.29733307987791213,0.3161857664758845,0.07206501412331612,0.47616764490886143,0.27288654022666003,0.1104888863242619,0.7172702616612019,0.8826326346019886,0.20615794112070485,0.5890195469660977,0.2898111879566079,0.9505785345658184,0.1013310625666981,0.9897215476698218,0.7941487245640231,0.4845043777104563,0.5504469389341913,0.8140150274368614,0.340181426839377,0.4219360950294455,0.2790949826477096,0.6729580213594677,0.7118910368157549,0.6657383775901415,0.704123744655567,0.6659065924934617,0.6914466036345672,0.867712890899849,0.5805395446413277,0.8530897622400475,0.6216808588263567,0.971259770905976,0.4160031412665648,0.04637488534821044,0.11390967540421015,0.03650592343133385,0.12077694320221433,0.3881729492959014,0.4563234664197693,0.5089545899458063,0.45759105534481015,0.13489099228783097,0.7407218326299321,0.4012834024164027,0.5109250285639575,0.5035412358065543,0.6496798398415777,0.508785691665554,0.4100079454638874,0.26050435811372274,0.4048617657703317,0.9861311640568651,0.0930584169388462,0.049314640033321755,0.6913600392873112,0.4808624771984451,0.6620411810529165,0.6952058095977969,0.46609797167179035,0.3207714579116152,0.35374338501580005,0.26968669829966485,0.5525637426090975,0.9822600310774676,0.6131699363158425,0.16407074765682816,0.2336264288475134,0.8695994785287551,0.8636745341620795,0.5720795654924282,0.831957736202531,0.07471636129894632,0.36069447757720585,0.45375570070290383,0.41987774862007443,0.16914692323143088,0.5639939333536292,0.3741386550357053,0.8279662243549577,0.730607572210866,0.7760806621220788,0.7736681773251062,0.4861731721553726,0.9825073568489806,0.7367918274026806,0.4165836440374415,0.34174540994929914,0.5733292375025552,0.36150437096600485,0.876421473525796,0.5217315808754306,0.4823317749862728,0.45774480469590806,0.9207756832071696,0.009375797609828762,0.17847198055541535,0.7364409243621897,0.1844792092473937,0.7735699003045751,0.42989755254951234,0.5707207598345447,0.3466438564525349,0.5199494572796974,0.35635975487385885,0.12402797926281095,0.919653314892777,0.320514641006443,0.29004464119477413,0.5995706441223163,0.09585694692549351,0.33187661000344026,0.3563410481206746,0.2408133296976227,0.8595868305407761,0.49874820658178165,0.08820865000199873,0.6642218560392643,0.24893715659191895,0.19339098989474413,0.7450965315079547,0.8750983238448042,0.6552846927746536,0.4410797235615227,0.8422539531853044,0.9676403921286543,0.585023893921121,0.7304047302545058,0.6776640656724653,0.3273047732938401,0.3177820357102521,0.9199425783944073,0.4964717739309943,0.2652391692056024,0.9869753772057828,0.6418882110235955,0.5123118714687755,0.9950615193498147,0.10771494995149511,0.785790375777885,0.38567029428845045,0.779484582121009,0.28268698288147687,0.9939375252894642,0.8020450581682825,0.5283632251312349,0.9433463549256005,0.5800654568397889,0.40668625128952307,0.6800798396320002,0.293212468277092,0.24450678318830232,0.9836895255979661,0.49831935810517813,0.8743239057928707,0.7713572615490849,0.26584110731991717,0.5607978966954843,0.8445935335966352,0.0918154200486978,0.12479536795521362,0.26466372943033534,0.3160694621674287,0.5749569163670027,0.43957757468738734,0.09284925810938627,0.9738374104225287,0.12143824497083311,0.9611531002377782,0.05475356485555216,0.442606500774398,0.7973898324587072,0.2018647205369246,0.5515480182819403,0.9637300684924672,0.04087257113480636,0.8561921135569164,0.20743184702616224,0.12388317505446955,0.06440893997720343,0.3845374439059128,0.14088517759636554,0.07530021183355329,0.9048176811222093,0.6088049142186418,0.5052695538497349,0.8643428922673633,0.9167647502228098,0.22616051489471545,0.3736489802544969,0.5256303552942678,0.28768724615659313,0.6061561328680416,0.16306726225512924,0.5561371593062994,0.8422321989912154,0.669376854668452,0.836766145910872,0.36996742604127375,0.3755623979466063,0.2607303853702201,0.6665491578134317,0.8933245077950112,0.5773107353420035,0.134826776143806,0.006381095520639812,0.6623610900050596,0.5616871587444188,0.15410172804156197,0.2885705530331195,0.6453499589814518,0.09284472014013301,0.995040970319421,0.3923015910948624,0.9231420981829259,0.4695457228611004,0.6139481826186883,0.9307674000143535,0.6905630820104769,0.7737413914873095,0.2580222790360458,0.8001398272363438,0.1147105875560428,0.6676273743286407,0.16221116479497244,0.8862014473152058,0.8115738308006961,0.8333824750731131,0.5187002165209522,0.8257879603282576,0.9430037442417987,0.029724876233687914,0.7173840024764317,0.7664246786424005,0.7889465492729171,0.18800417748581455,0.053942001154238195,0.887021521823038,0.3587366762714519,0.023723758066227285,0.050166149190826737,0.8755112735565362,0.6837656778877301,0.48219899911451547,0.13932115482662932,0.5599709772031429,0.6516844857567483,0.2199346388286798,0.4414025632906513,0.2760084322751788,0.8014720983264498,0.8272846714983495,0.9023372059313275,0.24957489681718137,0.6106605283734812,0.3352651541550806,0.57764766682828,0.3688309158269887,0.5318040785425782,0.03783969940732956,0.34155287843610527,0.13883531727905662,0.2500361507117017,0.8853004702380631,0.82848630847949,0.8778486544788078,0.05263261570147204,0.58866311487591,0.8803532519605761,0.921291949868446,0.4941669944058922,0.5004722206655785,0.6000937547943643,0.40602989043679805,0.01513085748398435,0.2726827922090993,0.001943054526599708,0.6948818628752367,0.9470634517402072,0.30301523959063137,0.1852197140199232,0.09807780489126428,0.2620290593737258,0.833041342871975,0.8844417362503525,0.7296129956385022,0.19049883383673039,0.4373957435261555,0.14052926848244796,0.0005125191744699276,0.9679848721062521,0.02180949364625917,0.8141012670282539,0.7194913813634853,0.5277522779287112,0.9229597397164391,0.8879802584243892,0.036417386231174964,0.01882911144184707,0.7553086947638301,0.2226354122604719,0.0244437507388211,0.2822134923170456,0.09426438053457131,0.5639603818751968,0.06433758631008146,0.3195961346677185,0.7413682327286919,0.8780946712455628,0.5321982309512876,0.6689048627765868,0.6694761463328696,0.24044399904120883,0.8835100081639231,0.9784275996419942,0.3556336015254913,0.9081935827705556,0.33351204215021757,0.7184686852647895,0.5193070416976375,0.23502771345293905,0.9720137621515239,0.2163988749975354,0.794084394988158,0.8568214950128215,0.6515637569465429,0.39222332057093334,0.7325329513048597,0.4601360392809699,0.8341996718443898,0.2463303182643355,0.8744789271522173,0.9079813654467719,0.0703699242673197,0.5233134234744294,0.75495684563884,0.3905966005655628,0.10647533715273849,0.7376983585877255,0.004799524125272292,0.4520105564279482,0.9741879794212367,0.754642125749525,0.7580408591464822,0.8509070620666124,0.4399786172831823,0.7151156230520204,0.8726399447143496,0.48512903821572384]}
},{}],46:[function(require,module,exports){
module.exports={"expected":[0.24510482737745076,0.6096602955957955,0.3806787182028387,0.5384572229858325,0.6188179249439533,0.17844563722509318,0.2740356711140669,0.4920186442862912,0.34956594151622944,0.4545331288809892,1.5446382658847665e-17,0.35539512471775647,0.4716275980506007,0.00031087188784160395,0.24883120218222343,0.6228252983715136,0.3294326315017383,0.49569682302595214,0.342544556809281,0.05730838537575953,0.4503970933645051,0.5116335989159665,0.4957215421013573,6.774550496242277e-5,0.23384820566684472,0.4541538798014034,0.45004826946750603,0.24048078338796275,0.6656509071424537,0.40474351447970214,0.27727678380938925,2.2974745981148187e-9,0.18940569488390474,0.18031141149137284,0.3792119094157638,0.5379217660278656,0.4402013963715448,0.3982634816734377,0.4819095505966705,0.5233922721088686,0.5033207168744854,0.5594774840700575,0.2960270322049273,0.3334862334244252,0.5737461810561961,0.5473665432914355,0.4496405882034925,0.4695680644250087,0.6260378141335854,0.5693521785501608,0.6173157308415911,0.3654060532442728,0.31058237892526286,0.590972201717276,0.5730621241917316,0.5120258985880496,0.4561846851426452,0.3155029847653358,0.4371835195703454,0.6515758745406356,0.4098598701133703,2.042958796479993e-10,0.3769104799457125,0.3226941043970647,0.5359820279556822,0.1398373093869037,0.001571567210601134,0.5774168495044559,0.0041137569554402465,0.46265530241793845,0.5680490385561332,1.9359229350788307e-8,0.41552762920316727,0.23520821891473004,0.572941393912015,0.20109181057222483,0.1792757803564018,0.4480519901813758,0.1699909092546805,0.4553470054930046,0.4386319426269235,0.27119162275674036,0.4689349346424497,0.31092583688587,0.6190634537206361,0.4164118425247332,0.3454838270272498,0.44627259524924096,0.22350540539029295,0.37342926587869896,0.5630709118550317,0.49358378421228205,0.6392994994425005,0.3341726613362286,0.4818557033733861,0.5961340784806938,0.2636205141882223,0.5825837268576334,0.4450440241441974,0.2814999677770652,0.43316257321991836,0.16714054997871286,0.4882835051463398,0.4259087764376087,0.340521659266221,0.4600671726006289,0.4799802044621649,0.3657616605608834,0.2823299257724013,0.17881938065519326,0.36467382467121195,0.43747465666255425,0.43066712258973666,0.12418174042585231,0.6009381699055795,0.5463912016679384,0.22945102880211993,0.41243912686419826,0.34752293349148866,0.5119213270271344,0.4885447035604507,0.422595594903691,0.4357256080927448,0.4896638837121956,0.5201636671369391,0.6900524131295782,0.5331169916352074,0.1841645378987975,0.05568975946797501,0.4534018829450852,0.44426348534723936,0.4434085147260831,0.5671428621114348,0.4630028902576921,0.2789928730290725,0.5418135086745635,0.6226504921420741,0.5158209632663895,0.4097524992282752,0.16385069961534726,0.060225866759541676,0.40532032900117454,0.32381014312189177,0.11162120246678875,0.7281782140904249,0.0015543427929560216,0.5338256330581588,0.5013252334522111,0.22694301079794593,0.12470624684054618,0.12452675310417406,0.3041080332980262,0.5584167803163353,0.4880658784336373,0.48969252496116916,0.15787459590671957,0.36945531303680124,0.5126249956156771,0.4768693825083162,0.3771579563398896,0.5277198044156248,0.4453324668941885,0.5035524806288216,0.37648369750525695,0.5318328898487951,0.31482470701982546,0.43704907466016735,0.023430104135095452,0.401138253637761,0.24708316037021677,0.43662185391066877,0.004669650926780679,0.133762188982014,0.42733710418302795,0.5008479494724977,0.15718081134398826,0.059051374067994794,0.3850924219890916,0.240760629042638,0.1388065082555816,0.6696377112825045,0.37737595537395713,0.4505663493502933,0.2829084775013564,0.15456360568059946,0.4643704736876439,0.42687516566850126,0.12184433651452471,0.34134576900236946,0.5889092665249052,0.6615259911250191,0.08425239194677923,0.5325446064957134,0.2984027859181244,0.487660389343656,0.659203370477405,0.5521522125086966,0.7004610087275882,0.6903808464785054,0.0004637313332500765,0.2453377784698379,0.3614551857537386,0.6904044532631339,0.17737430397921197,0.423986412455798,0.2014395889171442,0.06461899802631157,0.03247502298854198,0.2925810375475199,0.5018865286999057,0.617999464846229,0.0839869692580129,0.13661409118834938,0.7102201087921078,0.07466244688630226,0.005810490294150516,0.20086614973009234,0.07576403023901954,8.461413308249023e-10,0.4420462539470613,0.27332676423746977,0.4364005706776111,0.4335189544364227,0.3974349536424736,0.3326223733701052,0.2872753822026767,0.4839367043832899,0.30581435103127874,0.40351820985552167,0.4134327122026438,0.6093858385050936,0.4616338272205345,0.480187163310489,0.1984211717292157,0.6578640785378373,0.08173888680467185,0.7186034289941814,0.610627836598971,0.14866328021538822,0.4928278371568983,0.5947015378945274,0.13416448618232465,0.5252823577977135,0.09746792743066865,0.3179847417539422,0.4356210282298182,0.27629594913105177,0.44649236057383773,0.047404929412802256,0.3925816280697363,0.23639579414246442,0.605657806860641,0.45938434404178696,0.47617805759765064,0.3598995975663532,0.09755156585420155,0.4628277099080256,0.0006566264776194688,0.46641075856540026,0.40505689900315467,0.4523826564121303,0.00010575630267884502,0.45221543493504474,0.005508517124947302,0.5519262632122524,0.00045105892923820565,0.41652683466795165,0.5959866488746709,0.3469514270887626,0.4568959278630931,6.049957851431857e-5,0.3782102508439853,0.7382267817178128,0.4467540384313723,0.436139298163665,0.18872776956634507,0.6705865286389991,0.6508406571013863,0.12935064542073374,0.6698602229603615,0.39880428711787985,0.4923167763022494,0.4147928290211025,0.6310079516878986,0.7010459812888675,0.4694796321445164,0.40615423244176274,0.2810510494741324,0.3074663461210187,0.374114631009894,0.4654565880582444,0.2650650729700121,0.43067381192288734,0.3545764819912298,0.5243694364246639,0.17175920754200746,0.22157239937635548,0.3833335659788205,0.0634124495012509,0.4367949482903209,0.018744433549328428,0.41391987480087095,0.5553863589111866,0.4925624329889291,0.00029067845836399904,0.5006879934066618,0.030372168276746433,0.40156675348326887,0.13745999338859127,0.6854074214135446,0.12772348505360678,1.233572201748874e-5,0.7109217108196989,0.5352885516740948,0.23501677763937817,0.6464932234520262,0.12976076725371344,0.3401244221483483,0.35963025425575323,0.5730420618974854,0.2648598958447841,0.6871843720422706,0.28965243070831487,0.0193922243078773,0.4419847708477322,0.43364557640502827,0.33345171512602834,0.5150791511755108,0.6547513090836875,0.3949554654595705,0.4443721263544741,0.2482609644184699,0.5207710418594246,0.595145475219905,0.010462506640117974,0.5415128491397186,0.5009616368776527,0.42628361186200203,0.668851979121003,0.30532856093054744,0.009400932136927862,0.456157608728744,0.08655172884425422,0.10522878500226607,0.1705136460909997,0.5653209868842819,0.5208570415833187,0.5333439675658997,0.5079908595241592,0.5373769254267523,0.3293148114104748,0.18701240648298853,0.46204825262371346,0.2760796847698421,0.2701589460198867,0.31701231083401893,0.38065619328777806,0.016892187005763223,0.13555071869194316,0.4871484364356951,0.26699926491561277,0.47952200241048387,0.5695905511475085,0.5288514698459665,0.4064261466112037,0.682924435659542,0.029962825554445183,0.5641169124961694,0.315389614892556,0.5496259639575306,0.20581002196227763,0.3090104704918923,7.805369905157323e-14,0.14137580707945793,0.2567760199769188,0.6359085976267136,0.3065421552259504,0.47980181378521664,0.2809194884805814,0.3718748072542287,0.515578393371562,0.6445614039799437,0.5584938036185348,0.2096117272475278,0.2706444446798678,0.34419780711996156,0.48608018282326915,0.3785408614573023,0.6004622746401679,0.2836345996896612,0.43264714897812556,0.400261525781363,0.6025791149581213,0.28848819946262505,0.3876393597376777,0.46164891844389205,0.7029990887440885,0.5535209327261672,0.598814898006688,0.5445774926590979,0.4426144520092336,0.4086939040585298,0.0932172537432792,0.5257808106593937,0.26807935100614694,0.16093897680611782,0.18384381703772407,0.6804642708281792,0.08641690654977426,0.6040391555898025,0.6651663277844366,0.17145035648201196,0.0861461183123634,0.2982554421711407,0.6205422590411938,0.06710416519662099,0.00922660146781859,0.42991402161234815,0.3688673999930374,0.3939016213833666,0.4719487812202035,0.4261063237768779,0.3839874056793039,0.4497377986494005,0.4224518073934649,0.05174962354800285,0.35277135087826794,0.2673261462012296,0.49398459028776837,0.4785445257251212,0.43464639955457496,0.0031984531569814946,0.35931552309723247,0.5871397290612933,0.36600989146215357,0.3396766296360598,0.007568658453396487,0.5008719911830194,0.3373312208575727,0.5974087066878111,0.4891251829166341,0.5490197274241465,0.21158056985864165,0.41902935693568216,0.5070915245629531,0.022980978909709016,0.48590648054513985,0.08477025332788808,0.6631950720997065,0.6574104511633083,0.4770534473088422,0.17595344350595366,0.49541584064709726,0.5760835056890707,0.6338416839191514,0.4545578805938549,0.3991160798354178,0.6453947731999549,0.5629993369711173,0.3750600786030732,0.461644923560692,0.13003572774048,0.5249008126787577,0.6506281024964685,0.5393166948504554,0.22016686166014612,0.1590568158986174,0.3305510280091181,0.3174118492758574,0.09762923990437157,0.3319357436194323,0.7160565448528453,0.5993721620991997,0.6070171259385948,0.5571415166625617,0.34862190524703013,0.3957545642286955,0.1772767935713374,0.05692161519347873,0.3839377103843731,0.5559359965347036,0.3365313414669344,0.519257150583435,0.436240919075934,0.28789461860057164,2.28579994585298e-9,0.47079384495798415,0.5638266173123022,0.19908578331151144,0.41203590794869394,0.23129379236941555,0.2195354441492444,0.6863438806152691,0.17275590544722458,0.5248137842416212,0.09240194646631228,0.43646349728453326,0.4728598000914267,0.1378938592808571,0.47791718279558726,0.5643636853054128,0.5583892644776374,0.22375738163826764,0.5674931434694614,0.6706045081233291,0.33796679770682114,0.4041128042912814,0.3846551248674621,0.40460940182276817,0.22119516456484278,0.4442102933383858,0.025754111020802457,0.07279179592977682,0.3911704717810464,0.32290821165344175,0.28192523563568306,0.3631713060568394,0.5169967835236049,0.00019212225344097724,0.4090988985083357,0.47493481738847276,0.0013752419871828395,0.5063103537555428,0.5261922887712025,0.0003047786639363503,0.3796724912606846,0.5050684921689566,0.390355292249148,0.3326247531994305,0.7014290170321558,0.33287824961108015,0.5804027622408627,0.061846996323087364,0.37037302869105054,0.4348950910434731,0.4415601613789476,0.41538118986497,0.4724714766077697,0.47240328028567885,0.38428976383653096,0.6538140734949254,0.13549552362234268,0.5171269946286187,0.0012151498337193008,0.523217064443232,0.6157999798144472,0.23690636398471082,0.6535742748674243,0.10015042723002027,0.5212970090726754,0.0808182685591189,0.4597855566904111,0.45790977068127675,0.4885139445788211,0.24051364472715986,0.35587874463110863,0.4056630331114853,0.19728213761079072,0.19808227418588972,0.17049633730370328,0.7220697535579996,0.5774989642190643,0.140190894175949,0.3714447223502927,0.05542478655542192,0.723044792953246,0.645477900513393,0.5838651063189934,0.1936125876001674,0.25381004975909727,0.5746923356529757,0.5883410591836721,0.3614984704952955,0.3346970809134562,0.25571649580315087,0.01554327827571373,0.40333302661642667,0.4277476978927954,0.4413517083720977,0.37425937782886476,0.39372717797004264,0.5141455880507019,0.12044102202663538,0.17575469478897982,0.42079478493014943,0.5414436359457713,0.35927710397251245,0.4621500271766793,0.5549748937565064,5.785609482264307e-6,0.2530703285790276,0.6530361756010133,0.18986133959244186,0.21971775013670025,0.3862370583326425,0.615172779309534,0.3987118219482827,0.028978123430583154,0.47411641453364795,0.41582179169005795,0.43308084288957904,0.19379773721446203,0.02236624923530034,0.30088209496975993,0.30104266177080935,0.20505141248112674,0.44874064433005867,0.3104714978274754,6.943029449522431e-7,0.6044634216355915,0.4421151692126722,0.5557427774885526,0.14285330596320484,0.47160833051183154,0.4615562809498137,0.29074936553027037,0.24087990776984458,0.3050339372773876,0.4058318711023698,0.43680878528186934,0.385855550365338,0.4576869309578609,6.607146863290773e-5,0.5056841097771936,0.4771057145962443,0.4692488479850159,0.39716005170671237,0.4884944882543043,0.06283018182070277,0.629152846457027,0.48679846982566527,0.257252770949362,0.5983928187614802,0.43284911313120644,0.2804080986553346,0.5982040791821206,0.2744073482667662,0.3658840575645068,0.6058974801481395,0.5039936965800468,0.49078582316523206,0.4494609448131438,0.4605166248859458,0.27659910573494095,0.27351432935742087,0.5181535786593343,0.3192908445941625,0.38898045716432333,0.6042075487335389,0.5897674931894937,0.14302860455392882,0.08752904258997904,0.2785728190140042,0.5358521172733821,0.34100866507005134,0.49385391942102674,0.14709693372385751,0.6465518337983576,0.3352662903827489,0.5064830255702303,0.3655293027158813,0.6476125981402986,0.43400899077703026,0.3102942667794426,0.41990052957925617,0.3865448837521906,0.4114300610706182,0.16172221053119887,0.426294304262816,0.33757373337482033,0.561842619203644,0.03887665868202984,0.2779416559227446,0.12541296178158143,0.6562707369849418,0.47610997853752546,0.450341412934693,0.39078744217645417,0.2952298136008893,0.00011285011694063464,0.21294539717296987,0.4518730077972479,0.30490048836881634,0.4783761476405379,0.5652461275813155,0.33390157719442093,0.5491592256086093,0.3312105046545859,0.03369622174797798,0.22410952196084144,4.314503502207303e-6,0.03688702161576844,0.43724709217834773,0.6602228598372347,0.4207101925968032,0.4651380207600606,0.6942550093187352,0.44384296037675175,0.6762284150208588,0.19340409369827424,0.45655366220479554,0.5292813081740833,0.4520169890273591,0.7175273777221605,0.5628914283382387,0.3947952099221867,0.46618967623273316,0.18583140139953278,0.3942230233717856,0.5185309394280362,0.4430825729493191,0.6649809814130173,0.587638930396208,0.49496877071051615,0.47699922383784676,0.34301236087622555,0.7186485717148373,0.42710715273270566,0.3117184393423298,0.4055516929112571,0.009528752598678306,0.5412262415029213,0.4180152123037081,0.3981382944038859,0.09485416377089595,0.610982259090012,0.3672892272431314,0.2555330390470974,0.16066423884460113,0.544812592937566,0.4642377566417363,0.3485908751632504,0.2995960682822003,0.3072102794766305,0.008164828904650047,0.5281702430416987,0.29897939161705617,0.317580569533509,0.47421026551810935,0.40168509334783364,0.30353571407552804,0.053259760814512086,0.5592463354549884,0.7031110549069841,0.3673513343689879,0.06302844341447122,0.41879322142268816,0.4708607854263644,0.4199216053135588,0.33112688465398554,0.5558796013597217,0.3705740819016889,0.4966628643124869,0.03921820805098753,0.4142708093396504,0.3391582517131798,0.24693769222211487,0.1513873814003175,0.3215804485580139,0.48161496450816044,0.6253059541237973,0.4223835151739008,0.6524135492299328,0.25557932946776263,0.5694393646577784,0.4957821789392527,0.3470586225879515,0.2632371104255421,3.590481862857447e-12,0.33685285782352986,0.6600263402875918,0.659734007035925,0.37170495745781473,0.5683364644168777,0.35574626990661673,0.3451162842202692,0.3751401640467857,0.2446780432209852,0.010530910901842815,0.5161842552148324,0.25887424289248145,0.3094938008968857,0.5728876669400512,0.635888343740896,0.6882612969052494,0.48280369765708425,0.2085769688756536,0.40283991884882486,0.6250008023507867,0.5419748885013538,0.6992721418659316,0.04208389678792741,0.3053026445507302,0.34204540004652767,0.19363398077313743,0.40562120590661177,0.4186341806618543,0.13873039458507466,0.24145656438267765,0.3794116314478099,0.49272339693628164,0.610725108570545,0.35097065405648487,0.6231350071388799,0.10789754087565948,0.1766315620348693,0.3982255218254401,0.5233917569522284,0.36659525634334533,0.629837339476233,0.12140294416382325,0.3421611105872293,0.6058051393193,0.598532079359095,0.016105814072067865,0.13122442592368824,0.2750735300733723,0.5488110990192646,0.3714191485155698,0.5896222813873189,0.3851866980449389,0.03042220777052032,0.522579405886164,0.39755716787807055,0.2979813060778317,0.5742042630556194,0.4466872694925563,0.1489372725239506,0.5035431278874329,0.40008422248023834,0.4668278103849219,0.3238533596385581,0.5239226318064371,0.6398221024548134,0.0012458491469538224,0.4878924561470566,0.293326817927128,0.07352539696182427,0.2834662335115839,0.48588350961287213,0.47063272009528795,0.3882332783354986,0.6504518740272514,0.46296745612957213,0.3980599184680835,0.12618262164800645,0.3890312451532518,0.1391239886000617,0.36423366516466554,0.34785612691405987,0.33306751600434137,0.43238552297412924,0.4157758377963732,0.5946719754906576,0.5540052305760423,0.45864107131549886,0.6194451804144354,0.5402197661133783,0.0815801304063,0.43445598719241185,0.42526841988114283,0.45870103158526565,0.39617251422335215,0.5126243413383622,0.16541372877863655,0.636090260920428,0.4698288578694694,0.03841454803457289,0.5742743325838155,0.210362936675691,0.5294162373450344,0.5736961465445654,0.5712692913213244,0.44351676295681736,0.43616731656666835,0.49975639733734806,0.6008348393843226,0.531841869595113,0.5176976719003403,0.3507567247957204,0.4950841968916,0.6163279312317101,0.3076535133117102,0.44478738058131284,0.3687223888079444,0.2288171891970988,0.40754951612947077,0.6431033304548783,0.4462276397699808,0.5121053103895629,0.6737567812501911,0.5858041101984711,0.42127959516496294,0.44991119562857557,0.1146984031119497,5.669316668422784e-6,0.13673565113168992,0.011308531161241081,0.2672344441150828,0.1466923086041992,0.6341410755192972,0.321608506659324,0.6478261207610114,0.5658624291806563,0.7220079134437067,0.5536205504453326,0.6699473143098881,0.39512631060995373,0.5301371980950473,0.39131346791998306,0.2976469994910893,0.717434146587606,0.1881176340351316,0.46883176076512995,0.4387235619073919,0.41515566218841915,0.4321355120137098,0.5693155886846709,0.4330340727465932,0.19294114799769982,0.37066849989918493,0.5563353110552574,0.5527171420886121,0.5414851064180258,0.05142675150960367,0.49069272647087353,0.4965967055999949,0.5657171179881245,0.5108043529334495,0.4457312832228246,0.0006934244166732217,0.4809921298419735,0.6838220396840993,0.4291381537060786,0.6254894242071556,7.092455700749887e-7,0.5755742046239644,2.6211607747742902e-5,0.3598326854458219,0.10724192355860818,0.513695898516884,0.30942830637942664,0.4549386616538685,0.6804069799470858,0.2652317954652422,0.7292532089400396,0.0129019668617859,0.2803662485125116,0.20353659926985387,0.32756259721889774,0.298213539871463,0.3698303253070974,0.2796917242464685,0.5167455325270203,0.12606980949596255,0.49174175781308094,0.49625878592561234,0.18654967414480592,0.21282605269078791,0.32542711265756663,0.31023777659625434,0.3491122256627906,0.6941899693093795,0.30917301047193174,0.6563419933671193,0.43582421386207426,0.43260857802690356,0.6119828126970822,0.4808779516060658,0.47757187779256927,0.3798326480651689,0.41073142217376646,0.5506315060309965,0.5317453248070391,0.5034574870071987,0.5971964035574456,0.6707812871740935,0.45335346572209345,0.6008551733623967,0.3624955732430818,0.11912350790591658,0.1265805050937168,0.5296190036427165,0.32751612070964964,0.396617765651085,0.39065928379835224,0.5170635782756854,0.06823746032945954,0.5797807442154922,0.40263792436174783,0.17456422936693722,0.2890363126858875,0.22960494636199955,0.4338565712680259,0.5480067641388758,0.3100420493525986,0.29674197203929864,0.0003162992554185562,0.03586467788459342,0.5668547083449591],"c":[5.6907584422544835,2.479249143554716,5.720179862279782,2.0532711944767,2.351621320455243,4.945131232914539,3.186316045364066,1.082706559084017,4.471978322365733,4.221152158232966,2.013103558926811,3.2025684660260128,2.6151126677103522,4.25657773348029,2.1243192694845074,1.6209297459700902,1.4335401794367844,3.2098435555949534,3.7863372132586695,4.226483909501116,1.3864137096396558,3.4774799605291364,3.092520928679672,3.7852764229680247,5.851588382601029,5.56713654049039,2.803692808498163,5.523474857297085,1.7514316823052836,4.981205817183677,4.2895521808987995,1.9317376093704977,5.097733062374877,2.81097049954714,2.3571315518403857,3.7328953944758694,4.949499256207412,5.227291568204787,4.470862425400528,4.020135240055336,4.155544188868074,3.0103083808165465,1.464744722820316,4.450781508201549,2.797352045080153,3.0267891994581255,4.630014300694486,4.49252099688517,1.0161684318718913,2.193653457960421,2.467631901820947,1.5400919076763888,1.1030704802264726,2.8316912950444597,2.0733795288624357,3.5096794403035263,5.458658282363532,4.157256650505392,3.0233212649140544,1.9880183922221086,1.5367061004834173,3.4445048213977705,3.294845576252987,5.01429141285359,1.4534916006755485,5.383977965201501,5.4002749610903305,1.506363326116217,5.618425558869621,4.281081134622459,2.3943963018214567,2.800149364092596,3.7610952603692738,5.648531595114104,2.2862339997615333,2.7461876688538003,5.161364372209629,3.059379273658367,5.7959722327015095,4.486286927564372,5.653992771066292,4.105803755958231,3.43503444973016,1.011361184642248,2.269569004444623,4.600567883272154,5.732353124912564,5.650508581077388,4.357841563008267,5.568078761544877,3.0059686503585206,3.4683804601505077,2.1832042065688384,5.697890352781249,2.7805392856649984,2.6684687353369987,4.515362464198196,1.7737010239973563,4.658855203916945,4.95211972435916,4.320706383954636,4.783321696739906,3.3725499527135363,5.937691590382672,5.8089455360559095,3.023721941058665,3.3480454374364745,5.806849149776759,5.591602753359637,5.28119405107671,2.703868773748808,3.315455783716823,4.937600367030779,5.469765660661828,2.0985792135485384,2.1362589901868403,4.683794109167416,4.095008813961576,3.9645294488002305,2.9537073638442437,3.324325135403021,4.958859902100218,2.6778327445246677,4.743658123754353,1.2258224859308355,1.4467565057401468,1.5808793471000107,3.247960999481738,2.7994820461820393,3.387806678807296,4.3786144727851966,3.4944704174492047,2.4072149157915046,3.7928505557381977,3.0728289282802836,3.2051790311894672,2.0319532140234564,4.1815289580489505,1.8886861183949157,2.537911251643118,1.3175886646893822,5.870842605670064,4.073688085362889,5.551679169861852,1.176018250223775,5.419167096319118,2.954815466900576,4.437248075882864,5.493602065964001,4.573181686200594,4.702782090060359,4.774187473571123,1.9849987712064001,4.045380614389474,4.357490741773495,4.557490575647691,3.325567841306031,2.2804540740718684,5.004198709296224,1.8065865515478743,3.1417596563099286,2.248583423604922,4.200239782686704,2.5248165983434414,3.0294018547747528,4.036065761358614,5.202834790851999,2.038375208179926,3.736042602904708,4.544859220720399,5.788384130670903,4.005701707718856,2.154502089546392,4.709734991380626,2.7507633828475164,1.5595313660122014,2.6634731496738366,5.534644662323285,1.81050466077228,3.8237280311213575,1.4206626920305234,4.823052640077698,2.009315774652152,3.8483018759084744,5.613745982070251,4.452337354180473,2.977975413660471,2.589343936260741,2.58984248229277,2.8716620073844448,1.2029690981138554,3.2479802509588307,3.6613176983554587,2.9552266005565833,3.4718881591877615,1.4370243202051893,2.7837493965843896,1.1295398726047092,1.3460900985070514,5.770988786258671,5.441066702131136,5.505939632820254,1.5053294066253422,2.180144571702928,3.57475124538571,2.9925364074728478,3.515342746169602,1.2431004677244852,4.131057079578926,4.407759516930269,1.3958325130888651,3.0705410803314885,2.7037957236917833,1.2917248348834722,3.918138709659063,5.299416891532778,2.0441487872615363,5.692888601297668,2.288978446495712,4.980416956465732,4.725868423912926,5.607456194466169,1.0790189826866683,2.7774661483534726,2.847448207254737,5.0669217679095055,3.570072569661593,4.290333959798202,4.686414550903738,5.378337776580644,1.9336954293320687,1.6030085221078851,2.014253804584114,2.3628209047566053,1.5554757412433708,5.5054268972359965,1.155292971040214,1.5145356127979706,4.0985637860760065,3.8058470104738387,1.8584089698782638,5.315910613857829,2.655691316641419,4.110685474302955,4.4546830776616,2.519707138735357,5.338598675465875,5.657065814412364,5.162595584565047,2.1584010010674186,2.84137146103305,2.0899113700215644,2.0193514363739298,5.037612182149592,3.827462843164766,5.205996076672167,3.6958454863722716,3.71500272075028,4.592126680780577,5.993677700302106,4.233369566399272,2.705661414019246,3.3099051407253413,5.047157220160003,1.6770567884157142,4.60935802790305,2.8216855956178044,1.897964100809373,5.887158675574945,1.125118957316176,3.093650299542995,4.593576520759944,1.086287228816967,5.166159406649425,3.4249456340411877,5.6964611022731955,1.1624632558745631,1.069949654457876,3.7901729319531112,1.4382555168722724,1.618981893594519,1.8414899895817252,2.347839603700063,2.1757042115320324,1.0347618825606666,4.409167546264014,5.027330538945084,4.155837153866102,4.376652331451995,4.559888946793308,2.56768930049226,3.737933736190218,2.98203119310405,5.051478194836077,3.6291539537221853,4.119244600532543,5.909529651790361,2.1398336623519265,2.9525464929205096,5.655174450528479,4.234752984965724,3.084871886655437,2.384051986887264,3.486672578647109,5.741072272257605,4.298045099276207,5.569040731686212,1.3912866608741716,5.9171194622192385,1.4666511896904368,1.147123585771164,4.338247892246873,1.2514964662883923,2.8741945002876035,3.119350733231581,1.9864050789032686,3.731587609742271,5.061492292896358,5.801061805860938,1.1469202607937836,2.1627626541890823,1.0646462305245166,4.082165944268862,5.606623742181929,4.499566482393596,4.08260410770532,4.290841667391934,2.3078233291807906,1.8671116356072484,4.4231611584652395,4.62089622517648,5.594573860383498,2.7024619148247933,2.2673500753180766,1.7878135487867832,1.4343205773842596,4.411847313899353,5.369874541922721,1.6550208330900087,1.4430225061473925,1.459940325427698,3.6300396597254583,4.399181949147698,4.347827484741241,5.989254471032467,1.91336127180074,3.927517161271923,3.0706588395475922,4.218574542903348,1.9128042025975558,1.0248007373539472,2.9881422928630146,2.791327983660116,4.300767560890041,5.440912981492096,5.379747073574069,5.5104356961375425,4.776430366598743,4.1019365025168195,3.7027145109499306,5.451505734628583,3.1895664209839047,3.1666757916186308,3.437135967995693,4.1828522548745966,1.1242293794711669,5.259233144364215,2.9590195543425617,4.474084548328604,2.0934746107616222,2.557576496333053,4.804313909582241,4.845903770757401,3.036840196972517,4.079805885691939,2.0770348446851283,4.424627333030506,2.9767697452712465,3.274833866711078,5.8225516381328575,4.166731357436543,2.089552188377929,2.61414718007833,5.973020778064066,3.211705532372928,5.089708328199258,2.826862644764083,3.3332471991838757,1.9439992596699742,4.510906355640576,4.319596483166011,1.144432526502264,2.665362944784732,2.076522841399762,5.0193656703658185,4.0085656681887905,1.0590587731717596,2.7346758051026514,2.6880703375647546,2.7497374638042116,3.630617595517534,2.762714390794755,2.445508005336389,1.0820662099238112,3.9795343658809834,5.987315429463546,4.406019759914205,1.0409392792897179,3.2520005248403727,2.156736262867933,1.1041922950211271,3.100631199063291,3.34154291745285,3.3684488800245895,2.0571206149387358,3.6195661303787277,4.8609011180311334,3.1834834984154474,5.497303458564145,3.767385016407303,3.418919929972132,4.784583267517002,2.309243785726851,5.30630387620718,4.212644290544292,3.2887429902578615,4.054962560584924,4.226177680645796,3.2913773583954757,4.4003326948820165,4.463111488298219,2.9100042316848773,1.3894371648520212,1.9419306841058273,5.290271094142676,4.3349592533933095,2.3539355900317607,3.6809031940243813,4.62322444897633,1.3186880696099204,4.4488318819246855,1.2364239819295655,5.805701594890842,4.716700530880726,3.612337820409465,4.937718060335048,4.357374198335212,3.2051066058204505,1.0931264433189716,1.2676981611256535,4.866731954164065,4.133264246983489,3.513973156873069,2.520491203214714,1.098501561721227,3.796784034921449,5.631341852220773,1.3350212625533433,2.7563974958498085,3.4767587305954466,1.9349417980583508,5.3765454799512575,1.255169547820303,1.435759604549265,3.3977957649854154,5.509347280845071,5.766502571811602,5.46842298567751,5.751493709501049,2.6458525991982818,4.529345561314175,1.0496066784469662,2.0990315019231245,2.642726385810537,2.1244342003366405,5.211927803674874,3.632200270400238,5.526874775727557,5.628684805000658,5.910745425089696,2.2519612192341523,1.4100601241749358,4.022056414262487,1.467725576575121,3.6235111538554934,3.9094869573375117,3.1089016088507617,3.1379310883245473,4.287950412143166,5.619328708280589,3.713431544464603,5.698750599046177,1.004354992202319,4.98768602615063,2.0164514305174444,1.4587083566573569,3.0958139218444236,1.1580837073032104,1.318049440856647,3.578659199106247,2.969320237066623,2.6739139870654074,3.1914883122457995,2.645713523970392,1.8018374251776261,5.588858441743049,3.9477370796495785,4.129789899460128,4.847966812765308,5.952770947034395,4.399031308783801,3.041180319550299,5.0471906271253255,5.717395444767719,3.5809622891387307,4.139114578459279,4.675062613161538,2.7545230610681006,1.5783906179462772,5.491349344645458,2.4187921506188337,2.5508047808780523,2.2134277236083357,2.225908422302362,4.3155068514748525,3.2822631681740644,3.2119514299963052,5.38061459768489,3.0071516878575713,1.1516132549230087,1.858635380560443,1.9421630329946795,5.126812995232385,5.232657861487176,3.332325937599342,2.9353250533764954,3.5476363738321597,1.3874043334850452,4.703187368931297,5.399920667489958,1.5635089092501988,4.676286360497314,3.2577143499947327,4.651774053469191,1.4788383793778705,1.82416544297636,1.87839800523707,1.0138305640507497,3.368863993275807,1.161161485298883,1.4253495203883295,5.271741326543509,3.655285429185544,1.5919279019924284,1.4728031442945724,1.1722599709166883,2.6900907334868585,4.332213125573949,5.985845839276032,4.176742137946164,1.1710861830879218,2.8130738930665546,3.440750883895003,4.778804941606505,5.663636188869264,1.0901647701834674,1.3165307572302445,2.53539521233418,1.8841902345373809,5.06950334629399,1.8982145146087384,2.390476361681232,2.2494661410479893,1.440541702900149,5.054141023228063,4.610247511299716,3.421893462177056,5.8582860069389735,4.7742702992652735,2.474301285638796,5.249635956996753,2.900482852462689,4.613887305518181,5.027191379746857,5.351794203208027,1.7390243339535074,4.411602829179715,3.522494614850217,2.801179407571416,3.92828773008311,3.3304603962729518,1.0246957428132744,5.891885416929956,3.5995615451284526,3.7951094145913125,2.328257808762623,3.989311146711459,5.3873028787874935,2.2721181170250584,3.163204804952652,5.838423789798323,5.008455180626543,5.118994081032571,4.532324610509418,5.466169202743701,4.996926933338286,4.091982194258376,4.667985236911022,2.7252393185518313,1.68730308297983,5.303335461246319,1.3792527058575157,3.604350587086821,3.3938516967553545,3.12242084340565,2.0876973202681652,4.099362846041648,4.268097059511282,2.7068307179268527,5.462715646592887,2.088970678104191,3.9946943370983026,3.7648965655117452,4.2917494797341975,4.11043999570244,4.51701705009642,3.317672695762232,2.275931384015893,4.296398151705171,1.847543008482179,2.8394018977194246,5.8625260966972945,1.9827565917466974,3.8748153179311275,5.702765348086108,1.7409319990591678,3.9157990548582093,2.8598944650301776,1.0820917087487583,3.1944096726048223,3.234716040329495,4.863503442039562,5.411866620036127,5.949843270703772,3.548300617818179,4.0725526087769435,5.0812809549852,3.4447094075005915,2.592766362774417,2.7911429696367867,5.901912230138395,1.012183094502387,4.93335736202625,3.29766990004886,3.0748170194291857,1.3611874255374303,3.33160665928954,2.0941700895137974,5.2329612452192755,1.3379502669478351,4.857158296020514,1.3722137203750242,3.8419643672767627,2.6511813261008035,3.908733836365729,5.812422388203748,5.589876873613646,2.5242526674232346,1.4007690653201534,5.093172894021528,2.7713374654917438,4.8204425686332,5.484297695511092,4.287599375601956,1.9166674956948795,2.291646427963321,3.0905744233889045,1.7018122307754682,5.630808638415399,5.694867517093853,5.104069431487511,5.229737701989745,4.927407618498241,2.005346292311758,1.9528132869039696,4.426767621924359,2.5337223784381946,4.271808507678652,3.135177747811695,4.96359197123901,4.597364391026971,2.315192762220353,3.7327810784434057,1.1097052782827257,4.819186956990109,1.0441019545427146,1.5172452553511053,2.832135260701848,1.674462903126376,2.1070932809657075,4.885408164062537,1.3611816256031142,2.450513061853332,1.1211204275291222,2.22355214275221,1.003501987020863,4.893748841504273,2.4826148248118454,5.513782570173083,4.045148422699824,1.4930836526635285,1.3029819679161583,1.3054741227478852,4.311997644291697,4.976198519640858,4.490727003489572,1.0763286429160925,4.488517212868024,5.212785451861468,3.7757451349862485,5.255392941351617,3.0880468034487274,5.567282821069031,2.2798315766993538,3.84384992949704,2.416540050126376,3.0994346097839034,3.3030050481845965,5.80506150117818,2.607917021140217,3.9785266283523146,2.854023740331429,5.134179000567439,5.004371345051134,4.892622687503515,3.2766452341938557,3.631588637995047,1.5707241733324964,2.5503135599162086,3.885159713473928,5.866131324241726,4.02615055376945,3.205991954748827,1.2701771934255226,4.793076116956299,3.2579290922938924,4.879923243775455,4.120649484723367,3.7888676650343647,4.566173845012919,1.7394056996953835,4.6871398308532255,4.616691336068476,3.0474669402047594,2.8733212364530774,4.931526698796221,4.383811336882765,1.8725203641989598,5.751468151034819,2.899326710292142,2.2984880564727117,5.479233723548257,1.1457023430257132,1.3334050467059158,1.5576667092230059,4.081384425889823,4.934882365736275,2.1415227587432577,5.748559351353978,4.880969099257227,1.0584506955412323,1.804658113101654,2.441477512317749,2.466295056724128,1.86211883961419,4.98841552942336,1.9365392492328817,5.846682823049997,5.0247653601941105,4.057908718538887,5.226877453968502,4.114013911559423,2.642328040212606,1.308614245490526,1.2003861889354774,3.084012845618095,5.26932144851646,4.184715655571403,1.9529118447642326,3.515711890103324,1.3888134681763722,3.63687488471355,4.918681848165302,5.261475375780864,5.7382264473218525,5.561025292073681,4.471118796255535,3.2919864443264193,5.895771926291021,4.212640425856923,4.6142192334116725,1.874439527306906,5.125898394004809,1.9981967964692273,2.085373741351164,4.690464485934932,3.0343294558993352,2.233624747004256,2.7581901762524463,1.1714609612503326,4.351962507558765,4.641169251061644,2.3196673429597174,1.8074187728313886,4.446798055553763,4.948275072115224,3.671773098300083,2.525233177493255,3.55883991201894,2.242869634828444,3.863684396244921,5.395290600156912,3.2065476486648175,5.087976843845409,4.356671592070214,1.6737245315297091,3.9777477416910205,4.902427469394442,3.531662997205004,3.39150106453919,2.977119058198414,5.980942726676172,1.6862255074420531,1.8334640756414302,3.6111711144253045,2.274456562615227,4.24853514580711,3.881459900890009,4.5238264390424865,3.4881888071242253,2.5944924018704896,4.843048855759779,1.285080678397951,4.009253343511803,4.9814412712956315,4.483693831404277,4.775965291126271,3.172996546799555,3.4322199559828404,1.3465307070452595,3.4716060168806164,4.061461147154697,5.926599519340882,1.1402198802763466,3.4289638118067125,1.9343861040979795,1.3845274630530737,2.9966166839433175,5.414320662016076,4.973629966305174,2.3317139484467955,5.0462386154494245,5.778142349775968,1.0235608943815768,2.874717799754083,1.547630297227052,1.4693365971647756,3.303605581715323,2.3262999292781807,4.704797084345552,3.3812982264020555,2.8339609802273293,1.448166254491883,4.393051121418114,3.948586469355061,1.8757790837394241,2.1731750427078125,1.4059110921949072,3.6039134406427786,2.953349413898926,2.424921646788638,2.009690066893849,2.7571504361458237,2.5194537352509174,1.9981942651171882,1.2061519754379815,5.656524277904085,1.300892739498001,5.773849391140744,3.9915599493370593,1.622738920884215,2.39317310348018,2.3405400047127136,3.951423277253038,3.9843790903107914,2.677860246181302,2.511805078176253,5.998980662359096,3.7579528532552477,2.597792111508931,1.795211587655289,2.0466340519233217,1.7470542456344886,3.267207590983351,1.1981471624761055,3.1342761532368026,1.4402626218941597,4.288362296389678,2.9084546754776843,3.299644181617343,2.3926788667179038,1.0174134646620516,4.201349440697655,2.3212097700120653,3.3467620654715304,2.552563399686334,2.1134588410799475,1.895941903342946,5.140494424821756,1.8552226524301276,2.8481432901498716,2.984222891325753,1.3572512721069765,2.214145314278934,5.1871043278533495,3.3962270856669363,1.8639966816061717,3.122845581211319,3.6053702822395186,2.967293329097953,2.443844171557296,2.0841838649071853,1.2243361340537542,5.110307555885729,1.2154180591354315,4.540965236128718,2.4593784913314236,1.8525857258892966,5.606902196226591,3.429760837166548,3.570431174207627,4.217097614153117,3.7888986542599037,1.0051484566729754,4.223867048427084,1.1457474475221643,4.625758185997963,3.637463008894848,5.229569282497164,5.741447687315147,4.903919414429625,2.692004382533293,5.7854075652934425,2.364388943780206,2.4364696257935314,2.3413037005497386,4.542288361804654,2.318614291362934,5.499203075882159,5.152270214784137,1.7875748216776945,3.379259804485987,1.4334190335255594,1.0048044218278764,1.5376915566175766,5.1955225203031645,4.992629339094396,1.423455123447577,3.381685295897599,3.0715841052824526,4.400294631260158,1.608266503584487,2.170455600709036,2.8277103960498184,3.908605978151211,1.6323249111427487,1.7702918826696892,2.232754889796478,1.9608092594302142,3.475103165820869,4.374297900123123,3.654478021022636,3.383336358392513,3.8233208740566953,3.227428820151397,4.942852949992211,1.9658852144598584,4.525761435617105,1.4057190349108863,5.368447709996595,1.850953411328823,3.4114602465909627,1.8222773633815672,5.80646673468679,2.281739490760101,5.179816482276163,3.1664880945813305,4.2516194090830375,2.3579907763652233,1.9995848261763352],"x":[-2.2038069443621477,7.642683826961438,7.122564516706399,-4.334683979812517,7.204710993195497,-4.30402656750879,-2.6643083891006274,-5.517635972672846,0.6237981973892763,-2.1003748967064935,-8.873231995908473,1.766382683597052,-2.6419984637352867,-3.0385051015210474,-6.871622816997121,4.3293363065570185,0.5794236622694737,6.193606876556762,-5.685576527182899,-8.266206831123409,-0.4784301227495735,1.909923822858187,5.352356206210165,-2.774754658997498,1.5629023262964186,4.663364998996547,3.601333839449124,-3.420998974929823,4.65131204556441,2.632125144084747,2.241153788742176,-8.061653951970948,-6.026890329073393,-5.483210185778727,-6.780055209187591,0.2257727792436448,1.1875602221360282,1.0317838392200454,3.3975055319958383,8.459995967793276,1.2278902190579792,5.781709992592331,-2.752217918922575,-2.8006761455138562,5.454694961301324,1.6127498183731905,6.172577453483225,0.46325924824701126,-5.506940470141353,3.8319472324741817,0.40190715954157064,-0.9598465806217149,-0.9972138638726835,0.003983106929112523,-1.4335149760138028,-1.0954631977885967,7.8930397316976055,1.7909841806450677,-1.0981465989656662,9.002325685098404,1.829694480546824,-8.169436173805392,-2.4849127828716107,2.073960544309377,-3.1674914250806196,-5.3528842188367225,-7.754722548927727,-1.258143686100821,-0.0006125339128515428,2.250451458525247,5.512676990466248,-8.01273010716187,0.5186780385693925,3.1404728140204514,-1.9597117685530403,-4.852353340466031,0.930352951683544,-2.169744899732356,-3.2725400007436667,0.6750237167309248,4.972125137093332,-0.34175822351436347,2.7624383485179855,-5.228812088271502,8.66624672611161,1.4897078914441373,0.7150423037282216,1.909044145863545,-0.24211592094030454,5.22626447773257,1.652627943937424,3.2919934894407543,2.0813440589400773,-2.1932571598750297,1.8134499815508072,5.976509399608478,-2.02520765363708,-0.39205524084653387,0.1872176189247199,3.9808568643354962,0.2865008338819166,0.4049210095078526,-1.8659206772960104,0.21621344245228613,4.289126856479048,3.7699026058456813,5.402692172676682,4.058064815493012,-4.061376781961306,1.0110197074056448,2.6580320392390444,3.4543390970550685,5.589988980786831,-1.5937486164941417,5.370963125631825,5.642830086113648,-5.591154753861414,4.545951162937238,2.5318005160117245,-0.11225847989874715,2.0376148608963423,4.073277222063956,-3.803972845963216,7.365829487395362,0.9798438706602486,2.5805322664740746,-4.129292422806388,-4.47408102183777,-0.37386488256820005,5.510590077400865,5.253674187241806,5.241936240193674,4.786330332783866,3.718493512124088,-0.9932081407582549,0.6844972383090848,-0.36842924490131956,4.79790649648268,0.6719795782634441,-2.9158318682136293,0.07591873395497384,5.813394808884643,2.3766841631587825,-2.832383164512215,5.248663763240449,-0.5330153237390567,3.2738719246970867,5.319775574763483,-3.941624267944066,0.005876751417499548,-1.2440668337291805,4.169303523295465,4.8292749141874065,0.4030903871793363,1.465543148217404,-6.519236110295832,-0.9260634680880342,1.7900651708651187,5.7666274987233646,-0.0886180376237089,-1.1899880212732734,1.015366703151328,8.307340962052686,-1.2382877784231971,3.7542796119070276,3.3797565365910054,2.919538949920966,-7.188184433292351,-3.2026241706880487,2.3805453696626944,2.27272819515988,-7.0511527380269845,-7.936267348234749,3.754491550237813,4.965766750390583,-3.936104891553453,-2.8219550274942917,1.160352285023766,-3.990211394516681,-0.6648485286636197,3.9372670280657873,4.273817782455578,-6.186970829626818,1.0753384949210631,-4.934452415602892,4.196389424745027,-0.15800074905649897,0.5107793948525763,0.0009620924581366097,4.130357861126853,3.54953437062628,-5.153074957411068,9.209408893394539,-4.64255832249254,6.588543283745549,-1.8647422627804726,5.684354605512398,-1.1478649494079054,1.4863627571009221,-3.2207877347847047,-3.4557428381517523,0.8955113729430497,6.050387165358957,-4.902698351366366,5.537958632761731,-2.432373803410712,0.6486310122750805,-0.7878447723625537,-0.10324821670592899,2.737200273012734,2.3850221381598775,-0.5778487589020131,-3.183262877868771,8.734863252732529,-3.848683522988064,-7.576526967492336,-6.942792178469959,-1.691535809428304,-2.9711766621461133,3.979991588407124,0.8521977421772253,4.731233619661392,-5.530775546115253,-3.7820257775073074,-2.7035475845649,3.5126202065948497,3.5871872325085192,-0.8482006452447024,-1.2393056249536105,-1.3480737669907388,2.3953739184861966,-5.480486725193341,-3.6880733642261143,-8.386065287596042,5.681287178120791,-7.682350298824336,7.081545341626401,3.818738150521008,-2.902484178859479,6.424700482251876,2.7617435927098755,0.3049627495790097,-1.1340147887812817,-7.096354664656088,-1.0487719522404921,-3.9819965839160627,1.7001202413944072,1.7854039229317475,-8.195688499870965,1.0681658346340805,-2.824681519044108,5.399535938396105,-3.535563911301531,9.143658476753613,-4.541948783229188,-1.3552942106596655,-0.48930538960544645,-1.6388569466856029,3.1165647981942683,1.3161107993564336,-2.082754791352402,-6.123645126835524,1.1178233031238047,-8.66394491788221,-4.8467201476305455,-2.886676755851183,-0.8317133049612391,2.962937448137757,4.4452403689442415,0.1930954634177806,-1.4932709593866833,1.281015535879897,4.141808808616892,2.4209848845922624,3.2625398542185695,0.31936251138460436,-3.1551176652318906,-4.196826893169272,1.2987604253700624,3.0712401566294716,1.8991013321652694,-3.632137187081281,-5.207690399417245,2.28837841333569,-1.735078871541904,1.119730117992332,4.3266040446021155,0.29433010117529523,-0.45063692934518507,-2.1685182058226538,-0.386669791801018,-2.8328163146353402,-3.502269086010725,5.23079474484401,1.7987349011022395,-3.0182833411990373,1.2658283895179512,-0.004780213936224076,-9.062504041731604,6.084992623329709,-9.086128391320695,4.518361535996856,3.2011350753429424,6.059721261214488,-6.871211358826612,5.134616221319636,-2.0201535356582934,-5.625141101820933,1.310807112205199,8.914710881861128,-7.24930697926137,-6.330005493270825,8.167847125503082,-0.052465833415726415,-1.7463505386498746,8.692906524957195,-6.417828740242827,-2.0520465912932346,6.308558151907689,-5.6585999618114275,-0.7521842634048514,4.972036200049352,0.8615171028556867,-2.422101529608436,0.6533934570262074,0.49376353225405634,-4.959794605339813,2.769160452759132,5.987362697189004,3.9673843090099385,2.907334912694907,3.455077706445544,2.7360543686224026,7.956810969483634,-5.946671633738445,1.5327654792381495,8.639745378153986,2.404013623251833,-0.6838070148719471,0.6194756113809885,-0.4304910304009524,0.23435377496653764,-3.0429416540677945,-3.1713106478079585,3.0833345389541145,0.4309729248666301,4.242921606675171,2.6958793473671534,4.008736663659677,1.0009843100585147,-5.3430524264651975,-3.2412203997787947,3.9357604327207625,-3.11922305500703,1.187844447070212,-0.13111671275300374,2.3632514141631367,-2.486840567560007,-5.692804291054185,6.135475142753181,-2.3842297145699387,5.795432356875006,3.746558397828899,7.141678898000338,4.526341974733432,4.128318349443112,-6.025527424301598,7.725348577624368,0.3884050194268118,4.509746555274667,1.4951659156109565,-1.6759550872290285,-0.7582229023405751,-8.128906885896974,2.504986555268125,5.201492713741869,3.5758437168959007,0.7681103117716095,-7.024698947006316,2.6626479308648694,8.22913624480812,5.61737964582883,2.225259209940196,2.476239502346307,-6.00903718857124,0.0016190926317944943,3.317887115121656,2.851993266867088,2.317944564706192,0.8381952325234554,-1.1058868216573394,-2.0061360937353556,1.1668597510426792,0.731244366191941,6.2860234495213785,-1.5456533675989128,6.73182725708968,-0.462806655507352,6.140034132356733,5.825323509305657,6.028149275563916,-0.07959202924261621,-0.8431471040727168,-2.170282730271893,-0.7424037732326205,-3.4334721165973536,-2.766564370781828,-2.453125473986077,-4.7317293205538675,5.3263901884489435,1.6190850119677762,-1.2485612266555224,0.4527397688306922,2.5309730196552382,5.281982080791842,-1.4289544191903225,-7.791349784478756,-4.428948464444988,-0.9024951165777306,0.9429430575734665,-2.155754387778474,4.9817121310447625,-0.30328300517762585,7.531978366089245,-0.9339594895784158,-1.6394961785300777,-2.883794616072744,2.4264725291457023,4.896759132938147,-0.8522611706942911,5.794007673033506,-4.0237574905828914,-6.7872625827466315,4.938380604883479,-1.0636399709642363,3.1011417947441338,-8.205370256181972,0.8354527340497668,0.021725726291162317,-1.2812644017623054,5.920247105014525,-0.8712894998635612,1.8684034369670632,-2.352621707555074,8.096504451555365,-3.6001120491600624,8.161673180534223,-0.04629388850495353,-0.9086800557970651,-1.1842465322892597,4.727752390439688,-4.17798184299595,3.1040905967258974,6.9533928002597,3.960243539024768,0.4685960230162145,-1.950702019661355,-1.1745975751558602,-0.502677626244715,-4.411562860480471,-2.991609222001561,-3.081488148582097,-1.807795789459921,-1.0206802061849487,0.4277011335933718,-3.9961531013979372,0.20571223128262206,-2.2989008252177054,0.44406487718761234,-8.653883827060483,-4.900078523700326,6.013742667056181,-2.270961188089413,2.455248405778942,-3.6017551102242518,-1.0610284496079618,-0.06141807987372694,-3.6853977252368013,-1.4143578425098258,5.131239281490545,-1.702313748065892,-1.0232574627651503,5.025555909610211,-7.077003713188279,-6.143673738404588,-6.364968674996899,-3.1991276450236334,8.105549081041808,-2.0594447097939246,6.864108493766243,-3.1024291901191936,-5.311273369109578,2.656165255080578,-0.6613949679026665,-0.3255707578190954,-8.420838705614631,0.970248440226138,-2.4431181046205825,-7.295827731382865,1.6130793255248417,5.315356784601567,4.3497114074325705,-1.5306308662104584,3.389293518028216,5.917462819343209,-2.7513528444189435,1.1394760194854774,3.6099513259705374,6.32107551217943,-1.1305410447502178,1.3376878165274357,-2.461880220874555,-7.4974677493548025,6.10447448304599,-5.8808475789802195,2.1473764505036708,3.1135873817642774,-0.15890592099996592,-3.9603693656370575,-1.0859716308085154,-4.179067388797783,-1.4259680655852147,-4.391070239999118,-1.9191956363839147,-3.6983448011517073,-4.608902190381588,0.15692298921196102,2.124639912433561,-2.9343941420922186,5.481746531701875,-5.22688516231653,1.8893139341471983,-1.6189662304637942,1.7204667235256093,-0.2823624751649767,-1.790735663170424,4.811700783581097,-5.340808899432677,3.544948652166841,2.595578392983673,6.654821828995909,-4.631400460581714,1.218617978506919,-8.288537529911846,-3.984979575611829,0.7375774806380919,-2.5788741161586115,2.9989322384753176,-0.8183606600245019,-4.844082710828033,0.3864922703939788,2.8304926071320864,2.055937451801582,-6.555846059875877,-1.7476609404512589,-7.790224847405095,-0.43034737402673784,-5.731765787279638,-3.252039738546355,-4.6614514192175465,-0.6244609786169661,-0.06373387515469453,-0.4258865607969531,1.9992630701100556,-5.984557385030966,1.0076951226235975,-2.9931073693950285,2.38590423896947,-4.488552668476194,-2.2451299125598068,1.2081335864423295,0.3090295641403813,-4.897358378864805,-5.554277054625377,-0.7268414391881288,-5.578704778621266,-2.787880641580971,-0.5360613804484977,-1.2536722451823756,-3.3875151461699415,5.973285867466338,0.9168784156279397,-5.175225097021164,2.0815880497827344,2.098140725556541,-0.5315471954379518,-4.213135106847627,6.05891770037806,1.6813230503597048,-3.047219217928341,1.9439829264835184,0.41672945628996594,-6.480458034491991,-4.823717197303006,3.705755412120715,1.069003593887965,-4.346033980368822,-0.8042517610039024,-2.0742003342563837,2.0000626588481207,9.018444528211198,-5.620874673503414,-3.86702008552334,2.592925473304981,4.760803961327074,-0.6334737052057515,6.867487854750804,3.1114861229405033,-5.628583321109824,2.5803207566488884,4.845483651285122,3.7726647236995037,-7.475411644022795,4.2692233675059255,-2.4297713127532132,-3.1599047783349747,-2.1876065161113534,3.410759165072909,-1.662962881399301,7.037426604550237,1.4935937038331315,0.17055687333046077,-7.780444267569802,8.287230126293743,1.8465169322870771,2.2211759917084706,3.8433469118542174,4.455256203935047,1.2218827198558158,-1.4081570327299122,4.339370288463471,-0.9746043145914118,5.581005170850477,-1.892591404359779,4.7658107138176415,3.5439136843455703,2.57933336847185,-4.37558701485168,3.898650788860996,2.325511387829226,4.274735048728615,5.123375753757074,8.205425332411801,-1.1586631186776026,-1.410487062468424,3.7145352069150466,-3.4437749162898257,-4.67536438850489,2.747379856728074,1.144671545595541,1.141650483338419,-5.061966356124552,-2.591923898084719,3.920979708885133,1.3557571051695194,-2.0446771233778955,-2.335739726367929,3.0295925258727445,-2.3769074648842334,1.3445215029243096,0.8521312258655147,-2.54728169281592,2.052001182553351,-0.452544099753176,-2.366934596508165,1.2442444521232154,3.1763537259578136,-4.38312532679922,1.1797544128215876,0.9290671048060384,4.32527497325272,-1.3896104133950726,-4.003617329711256,-5.2009758159569826,0.3505284512384659,-4.34513819197722,2.8337136227340327,-5.752969310999552,2.5654801456755223,-2.9783542075433234,-4.111656706513889,2.3448576518556328,0.8018147533536029,-1.45813404057908,3.7705042057522853,0.5015492406338433,3.3972236334915533,0.9287350601168392,-4.472327083147006,0.621238830363513,-4.077175530531343,-3.3190787947004097,-2.0998939750547017,-0.7143281425429722,1.7747853456103595,-2.0780016515362276,6.337293247352944,-2.1004139017205574,2.296911122457634,0.030871229599258587,-0.3328727467741359,-4.297444792727269,3.5109765664822223,-0.8708000166582561,0.09707872653702943,-3.74317554057942,2.4978860785538393,-6.259362651627267,1.9560448322563317,3.122709922615039,2.1881338079471413,4.556333808656379,-2.6124192168398146,8.404918438084104,6.069591716508809,-4.619171742260883,5.627561447867476,0.13033154161422722,-1.2238947703826053,-2.4237619029353716,-2.4526975645494065,7.007845924837259,-1.308406788546531,-2.1685284334119133,1.2900087976824803,5.458095290589348,-1.0514311908858032,-3.8939777665193387,-6.777424132553179,5.904771379332583,5.456011444958666,-0.021612775516077765,0.13917701146728856,2.5407954807975752,-5.755777968553907,-0.25662031489558323,-3.5359888827323216,-7.329897705819371,4.100445728366237,-1.0747259322291995,0.9537836198876022,-5.983206937897529,4.358647139883562,5.468002280303717,-1.6676713377033323,-2.3206585864255236,4.3346808222332545,-1.5925871708393373,-0.07952405142014296,-2.6236749529329346,4.389135861666265,-1.7825184296919616,0.6402869499110952,-4.964072369785553,0.14653466630738254,-1.5983161246047057,1.4617017717085123,-0.8897342617541981,0.33798383342986416,3.375793012956954,4.897674912670375,3.843151637252607,4.603514177829153,-6.245089457820874,-3.064871667936721,6.436769677528051,1.0141124618909014,-1.1428544817192199,-0.09404368341656255,1.4665640073018427,-3.545451736085397,6.186309466046495,-6.733517105089262,1.454881686115992,1.6031200349905705,3.107479725416673,-2.7255135936089214,-2.4844668892054784,-5.089558102764384,6.889653618638505,3.6365466651204637,-5.419750168036573,6.286188270465174,1.4201753668394712,6.015187735711331,2.7391750450355716,2.395939001136811,2.5946411284313537,1.3109189178278857,1.9963722829566244,6.78796595314138,0.334383574220698,-3.2605471563199258,0.9371697658216522,1.847294281873022,2.5059812927818363,2.358145279070733,-6.26976850283264,-4.492528379502283,4.1899447624384285,1.0843536459137528,4.657275221281789,5.762538129001529,3.0046892831470142,-0.1683080651410518,-7.266003745548666,-3.998835166556839,3.6369856215185665,-0.9105677226547271,-3.9757473338584806,-2.8696388442307112,3.8021087897642096,2.453358917239859,-2.3918855811343427,-5.322427409831853,-0.6478830296338822,-0.38567677163269476,0.7771056312016889,-5.310844593846515,-0.39007557831820705,-3.6345216257955606,-5.07877678720388,5.989677370705897,6.509871459458848,2.7586834613428146,4.2724861223378685,4.869517181659164,-0.6487486173243107,4.712968269706693,-2.249991795475994,-0.8673783548027725,-1.413155086309395,-0.3453019833078308,5.755636461760605,-4.050297076803457,3.9089054834947845,1.1651694503069598,-8.141867470978893,1.5020432164173014,5.356461089326183,0.25946966805077665,-0.39573579264071856,1.9474326160319988,5.47046017039845,4.022212058132766,-5.327799443112447,-0.6546061038279989,-3.6949821863414862,-3.799307251872661,-1.810443805558417,-6.112709686456874,2.7117717379168593,5.384985470321604,-2.954579313774297,7.110823792347838,-5.436869095133996,-2.3656461136183538,2.3076903282914474,-2.1357721712430267,4.347413427614864,-4.729148567211617,7.159896328860541,-1.4665303098078368,-2.727123389302248,-1.6777884659496656,-0.6135879440437275,1.2027398161217517,-2.59165095508904,0.737168810710001,2.553680800705742,7.5566206708974715,2.9304600298747943,2.334052890066742,0.7267158317521982,-2.4031987974361977,-5.434619680302742,-1.032557299935828,-5.171735572486039,8.471833764857843,-4.540597745289322,-3.6230737852981783,4.158670643619676,-5.297379640225415,-5.492282426344284,-4.803270354801404,-7.812426320886235,-0.8024419706890242,4.469381762018923,1.2997550537424534,0.7170091880134866,8.244804339388844,-0.6220117120555457,-3.339387526980522,-0.03538526283603183,-2.199775330457281,-9.278592678896777,-3.183414704710716,-7.976791731829379,-5.996898185542094,-2.185682308113237,2.3766412944988486,-4.742058430669164,-1.1879457600035046,1.5231490005825474,8.887776466157378,-0.8386219980520249,7.4964849397901006,3.9542313332077073,6.942424313547362,-0.8841787004501835,-7.442545936267708,-0.05329566746335157,-0.27980572535297066,-1.6475988734186924,1.2744915852912886,-4.941601288150423,0.9004437288551914,5.668939829915445,5.438993826234441,-7.225198846377843,0.6503664805530307,3.344065325824527,3.583572236689465,0.8424509668562736,-3.7676687525696946,5.880696897987132,-2.7224445147566616,3.505795253136462,3.5549969027057085,3.9999352050594124,-9.69231751177721,3.6947232869146034,5.579418428677789,7.335850972672466,4.184752405293796,-8.464420421602426,1.5849097218944213,-8.510484291463847,-2.2751951446694854,-1.6628723516511568,4.872004989869911,1.4779467441063443,2.3425549378252377,-1.1697482823319483,-1.0140055607108245,1.4473558658688894,-0.4888714998399424,-0.9067845849121174,-3.6847519274697675,5.038924234456181,2.951230147798783,0.5009739557099957,-0.6197881382784942,-2.8150105058291786,0.23250639673596085,-0.9821816826554164,7.322202591948052,-5.568525619700882,-4.50380850135657,-2.5324620786703704,-4.25063486844897,3.5184146491552326,8.480895210337257,-4.183275874492132,-2.0290684361692257,0.8421726267122551,-1.3970123662339144,3.393897659920106,0.11834024527217668,-2.9515090709650478,-2.122162064424387,-7.285428970993275,4.728673531750995,5.058901580312261,5.820862395140807,-0.6480884438436556,0.33663080256624234,-4.874968373171232,2.8240857496239915,-2.2662802400648108,-7.457790569011657,-7.634603388684784,6.098693776278232,3.0839504236721127,-4.331134826233097,-1.9279463849510634,-4.693656922508883,-2.5970263150334705,-4.2926245609972336,4.268793298154147,-4.298391051292365,-5.032452138119455,-6.646132990529425,4.672751490366233,-2.8017299735250036,-2.098927213298585,-5.965601168339205,-1.8463123641424217,0.14627562033921349,-1.8164257203881062],"mu":[-6.416089365498268,-1.8683840578308342,-0.3206538235419365,-9.760781444485216,-2.295542915885762,-7.03535573090234,-5.327486920233529,-7.810977441603864,-4.486846138761937,-9.647269732516161,-8.900939941495984,-1.9832595957522825,-7.6889188795519114,-3.365840355593015,-8.469030767035637,-2.3710311306711196,-0.9277782107485089,-0.7221162626683753,-9.8884856399857,-9.435806443872007,-2.912219242858669,-6.1636334871039855,-1.311355456524197,-3.0132303627271084,-2.56578283822404,-5.273265280154122,-1.3128536255239531,-7.429985412185969,-4.728094513689845,-4.543460584038073,-1.3928614265962636,-8.115758900883092,-8.986843600771781,-7.049162041798612,-9.82837812264134,-9.613037969911124,-7.120351616759864,-6.293835421402239,-5.64296066761308,-1.4125475587574376,-8.049375868903418,-3.05628873103182,-4.093551098264818,-7.559279120387325,-3.384970411639796,-6.747250805689946,-1.9281169169817747,-8.126774635645212,-9.786045228326916,-2.9434471163651033,-9.482127090872902,-2.8397779260667178,-2.070033421451365,-9.800072899028766,-7.962080238294719,-9.258937944753837,-1.9381372681416664,-2.335333289688859,-6.1064329880479455,-0.746727992073295,-0.432805380090846,-8.254643181581582,-6.704991553164572,-3.0531486418092,-6.9621360746068905,-7.822883812970383,-8.295141207935885,-6.110659768496096,-0.6830476797786167,-5.685366191306802,-1.8330480635137247,-8.101460954614454,-5.154768981453602,-0.8681771145257522,-9.153974593198493,-6.532567571106915,-1.9313206499478386,-7.485088335126447,-6.350553819233591,-7.374902831113319,-4.453415826582869,-3.73299554518139,-3.786914338150673,-6.213834839784813,-0.5153747972318001,-5.476420581112757,-5.725978002228054,-7.831509845045728,-3.183182913261664,-1.802173196270449,-7.336111554457498,-4.107937152336206,-7.857695213495857,-8.302546667767817,-3.8076565986604827,-3.52434650938805,-5.638527181736754,-6.263755244799589,-7.800630226987351,-0.2888228295043427,-6.746713709354831,-2.101529082336584,-8.88758238878815,-9.149915010516722,-2.105105912076053,-1.7707769925579342,-1.308051111266415,-3.040657040628869,-8.899072243043856,-1.9109501476967194,-0.6324129117165134,-2.044864632624448,-2.3607547263625306,-3.9077491992088387,-2.299752417692953,-0.22888412876323372,-8.834192866197002,-1.550001170808688,-1.960678626325807,-6.979144364753129,-4.891962385496553,-3.637762336043273,-8.21183094712804,-2.5734294875717767,-1.9841672801586463,-6.5169271874465995,-8.199037830050644,-6.315649152501008,-1.1384765720235834,-0.5161036746977543,-2.2279944769997484,-0.7066472907027954,-2.564246174286229,-3.323226581741434,-3.6150998007169943,-7.927201062090655,-8.75938764575228,-5.105275304730547,-2.1074671878728424,-4.2251651500764105,-0.29721389237173934,-2.66453645075331,-1.8079178606104085,-5.0257547100072415,-4.4873156939246,-1.0742253566912119,-4.359259970684963,-4.494324616958245,-7.7045742023482955,-1.9342180516661922,-3.2372426770138696,-0.35131029943633374,-0.9671392950837077,-8.0109835118295,-7.665794348381012,-8.804303013836792,-5.054661432880829,-3.5293345766618733,-4.12281550968361,-2.4049179231604723,-9.068409318165573,-2.8448352255647746,-1.0798979692998834,-4.46632482635358,-3.995767010370841,-0.6150580164894848,-5.6941693873212795,-7.585038702202176,-8.50264046908009,-1.0118467121240227,-7.292563563915488,-7.551669497907061,-8.894552351593557,-3.7206892150763093,-1.1046930548825395,-4.7154258331437955,-3.5693177921006036,-6.176308945036453,-5.305856236521318,-2.4099343200853496,-3.8674485764353372,-1.9156729235246361,-9.716874822359626,-2.262116222125996,-7.704451067654034,-4.120452849823105,-4.875136416393677,-0.5710657068518765,-2.8595714219784596,-5.702387783592833,-2.726546164985828,-6.242672009258112,-0.18982312152478142,-7.375542732663285,-0.619265230546524,-9.25331834212497,-2.191009363570837,-8.780266233424626,-6.997039125581804,-3.6916530939329473,-7.487181590685776,-5.71560121464006,-3.43810713856479,-6.100917454705259,-0.054237532212229045,-4.266141149309732,-0.38084883729767816,-1.059665082425596,-3.832626796112417,-7.037294365891009,-3.227733436458653,-1.6061584218719305,-4.403558763790634,-0.6215834888211003,-5.081802339997903,-8.27307124379506,-8.192221835783116,-3.4967929521066243,-3.0319716911854044,-4.447610888787359,-3.086109457054127,-4.526138573951746,-7.289918994955203,-7.660771150495487,-5.737068170367287,-0.9620894624811127,-3.698988491552182,-4.9394279538622605,-7.955127963454038,-9.38855266210524,-5.011427572024097,-8.438447153778892,-7.729203752684319,-9.814651659673109,-2.2496115791660865,-9.499333231457827,-1.8166340733712216,-2.0229872583260144,-4.8673614513987085,-1.6668821424940772,-3.803644075602166,-2.0643574076488713,-7.715499094785663,-8.593057436652487,-5.515884999116865,-8.127681813158073,-2.804191679809216,-7.975885714355986,-9.50900587928495,-1.8847824265804514,-4.851396165598112,-2.441161983165472,-7.224589294371013,-0.7806438554741391,-9.107999788396931,-3.2517469147368128,-7.345556393540489,-1.958890334765444,-5.540203994797821,-7.329500049121494,-9.57975452116738,-6.303649841397672,-4.739451558504079,-9.319042168565016,-9.585806908217094,-3.261182510191045,-5.106387068655797,-3.789182676525542,-2.2101054717724944,-1.8396832786402073,-1.6855790548894656,-4.634644415378164,-5.583991941749105,-6.503513232340157,-2.3852801979861327,-2.978114250818902,-9.580519753779384,-9.420121535250374,-0.3489399692515316,-4.841450526515958,-0.37497750666523944,-7.53807688959575,-8.738163437763681,-7.142650329830791,-8.755838385340304,-7.307570148555542,-2.9590672030920295,-3.282120434247786,-4.652782217753364,-7.94088003852405,-5.2064364648998085,-5.842161801980317,-8.30420771143544,-0.6635028792217756,-7.155709429593422,-5.224011334677772,-2.6892610780923043,-2.8204105263812074,-9.919356019950383,-3.267227631921592,-9.85257143240197,-0.10307621474986428,-3.6544026398424245,-1.344176683697178,-7.308475636894986,-4.343344350420562,-3.2080628510087794,-7.6024406943574725,-1.3712764535036293,-0.022712137682872058,-7.743765778972271,-6.557012790740522,-0.9433505871882364,-7.53068589953447,-3.958281619534616,-0.7504268275299752,-8.043534824613873,-7.614356479821202,-0.6041831200200098,-9.269593780299099,-2.491892219527665,-1.593758834242831,-2.779255520894175,-3.447866897226499,-6.958488032605801,-6.16584382486677,-9.546740993952048,-2.677221532285232,-3.3499573580766207,-2.1450699816360252,-4.992083858151782,-0.7417022966869347,-3.817496999056711,-0.07261635122511878,-6.21943700256991,-2.3152486962059737,-1.101611381935974,-6.080175719657854,-9.73021061690267,-0.7538173253704628,-0.6469379314462831,-6.302650411214017,-4.54060346892351,-4.8279713053930635,-0.1051159742618224,-5.357014863068626,-5.285355990432272,-5.2178574320968,-5.618240765248837,-4.027113512007561,-6.419987171989772,-4.957558997516469,-1.224494356412782,-6.744623660177216,-3.2868121679175166,-5.5042380397297475,-4.806365261254015,-3.3237036800475117,-7.534091769648763,-1.5334829098496083,-6.808798474842838,-0.5843358438012114,-6.046232042440673,-1.5248711900226009,-1.542528451226437,-2.6095479329395133,-7.141799984838255,-1.1705887360783174,-4.0503022752888596,-1.3381493668744149,-0.1026625308496465,-6.318250884142955,-0.8449829356372307,-9.53295336153074,-0.6673522119622355,-4.065478340421498,-0.6561614606480459,-5.193611751557732,-9.841430355209734,-4.639362698414438,-1.627604307736572,-4.200746748785722,-5.411327008253057,-1.3183085619796109,-8.655732111664893,-5.686900111136504,-2.508396234646333,-1.4465569739364992,-4.769203138550235,-3.0857245808297384,-8.121557882054336,-3.623616036245534,-8.663947888576997,-1.111828872420404,-0.4393366491887396,-8.94297996338164,-0.5533991681809969,-8.252858239322666,-3.5716583469074203,-1.6646694640938575,-0.1307110711392112,-4.126950243083726,-1.710989295590848,-4.858384152008455,-3.9869023084355604,-6.479861004137897,-5.26109161706003,-8.590606002900735,-5.837895366018568,-2.6928031935653673,-4.2759648735461315,-2.9064613820152863,-0.6819272600972326,-0.5822587494052711,-3.1107919916434823,-2.508625176758452,-8.508462916980914,-9.53841681491543,-7.7105000237215044,-4.240125117373514,-8.763517582588033,-2.571948208454413,-3.350192178917928,-1.755938546137612,-7.480572631546845,-2.508649976016004,-7.579956025016699,-1.0082825388356098,-2.1385701100329446,-9.614750662746301,-1.5180654027971618,-4.358600326774167,-8.440795144798592,-1.6481562658020321,-7.5375598891398,-1.6539204927291706,-8.53538605266144,-7.288577227487831,-5.0005286862060245,-6.009068201949086,-3.3781762441368013,-4.3146363813025035,-1.8518211040618393,-9.575349608282194,-0.11215860700706015,-4.555193895598442,-0.8119077463275071,-1.1250967739970053,-6.6721204374416825,-7.629585476776908,-4.8980630385746,-6.434777375567342,-4.45702731456085,-1.1093630186645553,-0.8813789358057234,-6.320326317089262,-9.87114990980512,-7.479132850016468,-8.742103346367763,-8.830248244240765,-6.562248276443641,-5.427196101793566,-4.912704426903687,-8.02065809295873,-8.589620278535584,-7.6610293432642855,-2.7020070150595554,-8.074969325031514,-5.309838159237222,-9.618168227868813,-9.711717498417,-1.9196408007897636,-9.877694994871185,-7.534589147654723,-9.765293003895383,-6.994009338822973,-5.09783196815172,-6.721630730057322,-2.967149108238112,-2.6660061948489755,-8.196049218085001,-2.5499564537178787,-4.657547409466782,-9.4983918849898,-9.351908027208161,-6.474436860045483,-9.176495401948898,-1.3142220546104033,-4.659670743378916,-1.4865731006026062,-5.694001682384373,-9.091776632193833,-3.5028043620788396,-3.3445845762845594,-5.31156557504743,-8.935915315573357,-4.142045773981355,-4.6905793076729925,-7.894585651027994,-5.492900826474985,-3.622864632125544,-3.4573187743431633,-3.6868822692266123,-4.7041712363003025,-4.043172806325623,-8.838580605757535,-4.532120260152281,-1.8543865979164664,-0.6585895099646444,-5.1080692811008515,-6.1771116395180155,-3.0734859771132728,-9.065445851029068,-1.6711159880096238,-9.545620563602322,-1.427649993528557,-2.5401544065860038,-6.719163999458622,-4.073868724306351,-9.144681636655092,-8.917416420686967,-1.6751016328581358,-9.402398031734332,-7.4598721440546045,-4.029268398396537,-8.861849138557577,-7.072799160801151,-5.167796309554287,-6.138085901677666,-2.3529143702420274,-7.209073989017045,-4.46626485421632,-3.0891679367368585,-4.800689682380064,-5.747744265615586,-6.747174461057943,-0.5363933411446986,-8.028587501475242,-5.563595614293638,-4.538361328603311,-1.1189837900622024,-6.72991085853714,-6.544879124974421,-8.732953336538518,-7.613610201920027,-6.50649275462686,-3.9216335934040525,-2.034395615232585,-2.0646357659575454,-7.667050777036362,-0.08108548494250911,-6.8173490635264145,-4.577985856606663,-9.873760581254679,-2.81678376676485,-9.165496734741488,-4.320711608550553,-8.337794633154394,-6.865682120761334,-6.884809488758544,-9.88072696971949,-9.129526562391073,-2.007213860514736,-3.9830249668329065,-7.528093732795971,-7.672374815655192,-9.213453391596374,-6.064635135404403,-5.603516278491076,-6.138131637393385,-4.819969324628229,-7.851194720539043,-7.598832874756192,-7.102183992267069,-4.639320900146345,-6.366267040122713,-7.6877321090581745,-9.850733288713574,-9.307903415186626,-6.521630876197886,-1.2436984012406183,-5.897831925787045,-7.088449651657259,-0.6607748197661301,-6.159597209094145,-5.19542760226809,-9.462427896900074,-0.45598674664014016,-6.356958418431395,-3.2383037921143742,-0.6056044555391349,-4.653670493462205,-9.90857729006713,-7.213525170084097,-1.3492966034324927,-8.14412909187723,-9.947363667739015,-1.9339228935218533,-6.508760850726327,-2.777516757674463,-0.4819228446456236,-8.587075940714858,-4.848221686861704,-1.641781773362725,-0.34982064712117955,-3.7448360773186073,-0.26350247500510626,-1.42640260248303,-5.739226530604709,-3.7081632861011005,-4.131255020410158,-0.20064836226121985,-9.154234352876502,-2.28002042598781,-8.189441408411964,-5.030352954050919,-5.168013880599509,-0.646149529756046,-5.580352563294213,-1.9970609490762414,-1.2844307629687535,-7.0721729773422215,-8.016930482539697,-1.4009689609369191,-6.285372318960398,-6.403294956858543,-0.7844061210824993,-0.287841768457211,-0.019472034391112558,-9.330341456709503,-1.5320768268162888,-5.542280250428268,-1.5659510031422963,-8.191398183943313,-0.12880085631583382,-2.72490164616503,-0.6986337704549106,-7.873519266534248,-0.16642341314081044,-4.828551329874642,-2.538018973039091,-3.379090686977071,-1.731192223958684,-6.185039030022336,-4.369780228405173,-6.038517190793957,-8.566812963060588,-9.317037042236606,-6.902045635538199,-8.456535190153343,-1.609735226707305,-5.408694563250855,-6.793961462365379,-4.6827954429693985,-2.0357013090893994,-4.952459613101398,-3.920633764106336,-6.929597332690967,-8.013147642075003,-1.68713653410842,-5.079865369835391,-9.115306983194106,-4.224987013022401,-3.027949703792745,-8.374884560311237,-6.507893085162609,-5.109063489328481,-5.672293094661822,-1.033507613503084,-4.609254252885595,-3.909913568388792,-2.5195122391060565,-8.66267080670158,-7.026741749870046,-9.325438395098919,-8.85838202338137,-2.59032202198191,-8.063674453498457,-2.5739108624294627,-3.3603407827901677,-7.401870654831306,-6.895787156726567,-3.8791973220200804,-5.448373129875441,-2.134553507802792,-4.239519218605478,-3.6639303339243745,-3.595723024918378,-5.167480473913216,-2.737394141139504,-4.294855978970262,-3.8506202410112578,-8.285152213074117,-6.456569279221207,-5.6584400733978875,-4.035071831815564,-3.481944582359986,-6.930713613739181,-7.304227632658207,-1.2148280183825189,-9.146042504782844,-7.736759319457979,-0.8216963530500676,-9.4371990222019,-6.545892306621752,-5.128994908892541,-6.718334746644392,-7.677707402401617,-5.639988324630432,-6.58220752049332,-0.34988845140590863,-2.3918183419049166,-7.052102807154554,-0.8541154861709277,-3.7703134012376327,-9.613639817577745,-2.665205641325339,-6.986652813524106,-6.317586187425633,-7.881592493701806,-3.2346409983712854,-1.265071796797519,-9.796560817393047,-5.3618297041432434,-0.08771466011834761,-3.881296477136853,-4.864640403175131,-6.448906087145545,-9.72720588910869,-1.2072253642986475,-1.9713510632579645,-3.2700630400190933,-4.6324034847459705,-2.2589560039858014,-6.455027809282892,-8.491245199331988,-6.902495678766694,-8.902375931201918,-0.8791912088744724,-6.59909997519758,-4.58764439067628,-7.060942566409308,-5.042790376246156,-3.276420513216096,-7.566082976935629,-3.263388200937296,-3.130409184827818,-9.517595601701112,-5.903760876305004,-7.458235805341693,-0.6251673304394423,-7.6287383454671875,-9.351256825824878,-5.680888897752587,-4.164456150945471,-6.996159696918474,-1.8084666055127507,-1.799512896613129,-5.515881164888321,-2.4790172909549146,-4.740391631073571,-4.669284487852325,-1.0439347428640722,-7.276700941309606,-7.87810842172779,-2.360203374408494,-4.567180085484379,-2.853810927173146,-0.2129721522777217,-3.8251920235171477,-9.015718680208218,-3.123400654876125,-9.793178393479174,-6.122669698365004,-0.5802775076084754,-2.489098118522537,-5.187527458079888,-6.804342946828223,-5.857541328296945,-2.7374089374482025,-0.46371346459292084,-9.402975954356386,-2.026294146601173,-4.417683259184535,-1.4418282843524355,-3.522478743100217,-0.9363830727433964,-3.3849533101954865,-6.863637148132158,-7.457216359045633,-2.518554615329287,-0.5458263236492389,-7.941047372477397,-4.891105276480374,-1.54860914045712,-5.534847822735822,-4.476899463133018,-7.771597165876041,-8.789519316751369,-1.2625532236012882,-8.721166854972457,-2.5765807484365277,-0.12967450401628167,-5.269902255260124,-0.9751075238995011,-9.83507976399493,-8.250514082735897,-1.8482783112320833,-4.294131896754982,-9.019030846157396,-4.6836160092823125,-1.341502143843727,-6.2564286772891275,-8.911789602546795,-6.090270504785469,-2.820123255429683,-3.467910917447563,-6.248137617231322,-9.765458072375006,-8.099265736241668,-8.758209595217894,-6.230318908507135,-1.8541355297752138,-0.5991944616326506,-1.2633297679150712,-1.0291698189379783,-1.999990909530569,-3.002175536534959,-3.179702837551641,-7.039752662621495,-6.490157549692428,-7.558037991088476,-4.4968832790180375,-2.6173051015332804,-4.396822637880997,-0.8180156289649831,-2.6821349862926303,-9.353873437538066,-2.4303642199837183,-1.8263618980300578,-4.725241290594113,-6.901115540839675,-4.311151343030155,-1.971849283559859,-2.952846382132366,-7.244849505884144,-7.09149621644306,-5.145414196736519,-7.968452416973659,-3.33840025873416,-9.817992008200072,-3.8771534729471635,-3.564551764928625,-6.98210211633671,-2.6808821363040947,-8.959000122420854,-7.979017009603497,-5.680462822270442,-3.920828375525498,-3.7943087631624617,-8.39703585189105,-2.0307497559836163,-9.492700089884075,-5.11467976540856,-3.1719058553880464,-7.525983852275491,-1.6100419237616759,-3.3623380500271183,-6.634269711504279,-0.44505507482996753,-0.9925482282083831,-6.022551561186241,-2.1835136799346255,-6.755060203219108,-8.915310834750741,-9.55310444180692,-8.97142675746614,-8.768601882844326,-0.14012885820248622,-7.932454569018848,-8.832828716250884,-3.8460695228348984,-7.946645531429102,-9.80714846411179,-7.276388172458066,-8.645289854351606,-9.048851335017044,-1.5895564580185906,-8.651450474865507,-8.570809534591799,-0.9108473529746264,-8.68133079699001,-6.958352733370086,-6.957074412582327,-3.8010459570453725,-9.408606596724606,-4.317762764722046,-8.91176907387656,-9.049940661125007,-3.419018090702388,-5.549696668686124,-6.8253715184749275,-9.561004352639591,-8.38784777598473,-0.5779844211515006,-9.771469343122952,-0.431693098374728,-1.9762274290386705,-0.43703242142599574,-5.374366125515026,-9.64837604885954,-7.8219185217356895,-2.70510923643432,-6.071242093523157,-4.306992604202502,-8.785894602974995,-2.5245069879828796,-0.185822635310664,-2.9239921303536387,-8.319715548596825,-2.903494828022841,-5.27863245838514,-0.2670923659332547,-5.096872165855427,-5.134739541329171,-1.269150772211185,-6.755306939979713,-5.9601997895881205,-4.782680475462449,-1.1030324705289796,-9.904700312110183,-0.5020734828050188,-1.8025414269530038,-0.8386164127930651,-0.9171745030647149,-8.649088745889177,-6.261388874441947,-8.615301115575013,-8.962202122694125,-2.984857575049331,-3.4988482633865714,-2.6039803192856614,-4.443716190289882,-7.093953721720487,-4.416941118811102,-8.116604417129968,-1.2370730763065452,-4.028229955695595,-6.919242230057543,-0.9510481005392801,-1.5803481702731714,-2.8463138212887262,-5.570559114150497,-8.439366652071696,-0.8086113991748589,-5.935090320673755,-2.4898834438118445,-6.897504671744139,-8.046886754832547,-7.860506671443453,-5.986712021094016,-0.33618946273938466,-0.7916847507333546,-5.154847418310782,-9.795281054916869,-7.71361507695574,-9.504430323662392,-2.1384308186818535,-6.6876139312515,-9.04105367848061,-7.827616662864116,-9.662121711352098,-1.3649099142153576,-2.172075589599165,-2.9107074870229366,-6.493579217597127,-9.460789688216904,-8.846046574857676,-4.339786229940053,-6.457044509128442,-9.258797178564361,-9.200395997624398,-2.46405879312247,-0.9041005303581828,-8.822678898920946,-8.635677495604684,-9.377163177833982,-3.9581915684834224,-8.877648583507876,-3.3956664676611137,-5.302541065004604,-8.067276340269505,-7.90870386128468,-4.807544995169826,-9.124087468788357,-7.1254515825637155,-8.873894789827787,-2.174083170596064,-0.38920209992157284,-7.9132103574002555]}
},{}],47:[function(require,module,exports){
module.exports={"expected":[0.5868057469153486,0.23600300781343797,0.5155238205277729,0.344374832641973,0.4217284709119541,0.5925588986721444,0.0868856651598886,0.46326854111528903,1.6857558601473926e-8,0.6417232488496666,0.4762908207698965,0.6018835434226861,0.26800774090931895,0.2758150238936228,0.0013430503929712843,0.4530309038305924,0.47387157757738324,0.6166526064382789,0.14897814548946714,0.4227104993268465,0.03402298077874459,0.5103660765418894,0.5290797406067774,0.2628520506904239,0.17459556692912045,0.2148911142341406,0.45331107788608016,0.4731223914818104,0.24475853027451033,0.11271494096273701,0.5628100947677077,0.43374198980854434,0.34339545641153985,0.26145860309399227,0.4768274345714772,0.07412472988314449,0.3203992546176899,0.4576197134945976,0.4014366423374336,0.6000896295110486,0.40686469377954493,0.11596420999842275,0.407729509454853,0.44827951941995264,0.5298772646051645,0.5507553452963646,0.013499765562384804,0.4530350590851067,0.30842154267498156,0.38848308095092265,0.3895371439628214,0.4234895433891461,0.3440835333759896,0.2722442801748387,0.3115530066254183,0.7171022806693274,0.5207167554620638,0.39089508590138883,0.25807375622767215,0.09185082572063971,0.6276823834170201,0.3999220860708791,0.18508975570247507,0.14992951577506183,0.3374051354876394,9.096389797910486e-7,0.18034760307705286,0.26318570444382267,0.3727924120765296,0.40159104074085006,0.6499701178656316,0.497729243994882,0.3768995116814804,0.5793230516422158,0.25772687704237135,0.3832679834346448,0.6550628814476687,0.4533546884761067,0.0005590634213707725,0.2668888357348933,0.3453565458834614,0.4341909391653643,0.5236360958764922,0.47132305680947645,0.3570883477780128,0.5527721075722747,0.38261291466891173,0.4520258775970074,0.10375556061271249,0.006857454683185303,0.5165334753910626,0.395605684769485,0.6019913014878747,0.6967917423214103,0.4956301893663634,0.49967994988307113,0.626963312441362,0.42520609508856505,0.40639876300090083,0.4600765864973928,0.6984569548350761,0.39450643060088164,0.5274264827281593,0.4729788383410864,0.5494791987089797,0.6630226205725127,0.44012923694746575,0.3851956874618807,0.24373267711459407,0.3774615841435267,0.001548879151874077,0.42483838176834665,0.02366934782684472,0.6136860987719088,0.058200125746582246,0.009580647097707154,0.43383605314086626,0.34492824428603747,1.3850007133689618e-9,0.5877180511635662,0.37102841879364457,0.37744036040012263,0.333232209780864,0.43552692381107894,0.20593735410778619,0.6654563959637401,0.5189205959887093,0.017220311986097202,0.5343934074350103,0.276665317830386,0.20420659249001755,0.43982769313899084,0.5655283313180108,0.7055950958081108,0.3183754748086407,0.49176302645518727,0.2942102804861122,0.3434652008016535,0.5583852534105737,0.3474466395315003,0.4281002978078734,0.4027179028982344,0.6377234999973127,0.4530413273243516,0.49886207817821243,0.3932663465246383,0.3817447074976018,0.25303510624589487,0.0036729866217430386,0.4348833375751167,0.3805211833713924,0.4689134099766195,0.0033257805729756526,0.548657046198858,5.462617971564067e-16,0.7182591689124185,0.28058638245244716,0.0026134821604202082,0.5902696826828319,0.4687267661974189,0.16838800839677867,0.6025658390432403,0.02006026731333499,0.56834942637082,0.5521938563178289,0.24073826783761332,0.6536905226028958,0.6180607190679308,0.41820912377252245,0.6462661076240093,0.1708890040078743,0.47420032647246335,0.44244022680277395,0.446678261383437,0.10282705221617734,0.6642461187795459,0.09148002782763553,0.5038939514947626,0.14158914525497948,0.04343338902769046,0.4935714767298159,0.361260920759612,0.10208020740507094,0.512076612162242,0.4288641374337041,0.22881029998694535,0.31563573127470834,0.38670363820145837,0.1254660695815574,0.46997599537489243,0.472453776212226,0.43471691369971854,0.2002190930588177,0.4550677394214486,0.3801909792250165,0.43946736775419754,0.49619163932287824,0.46729169831235834,0.009708063089185955,0.011819693019833818,0.46812956188317423,0.09462097941303574,0.31633042397774513,0.2542741775241817,0.416618369470087,0.3292705440384148,0.10392689440575392,0.3809716599988205,0.41727333169195335,0.40235734513656085,0.1946299868353649,0.517860768742597,0.3607741418949496,0.22704802651868694,0.48083271529172505,0.43103454744640735,0.3711307965020103,2.8597966711048555e-12,0.15760344165112433,0.45190794430124487,0.3976744270912419,0.3620895270009847,0.3482652891239581,0.3944078966301605,0.10771260580598013,0.271312617463898,0.4159944430175152,0.2963404475019589,0.4504575354780185,0.48386685467399476,0.5834909606998699,0.24185681452468505,0.1352103620312262,0.3503257818695602,0.05462918203439543,0.5190583306187653,0.2643449086898404,0.23332480010360673,0.4095765087015697,0.6691408351173589,0.5866531153599621,0.17316617538011478,0.38494339662295024,0.5462183632557686,0.6041898287269237,0.44467972779557924,0.4370904233215957,0.4362643047026014,0.2014554302094868,0.6497098511529951,0.4315504787828991,0.4510437203495053,0.15236413197235418,0.5141168894638901,0.29594078710927285,0.4425527806761802,0.31472574085569655,0.1979483660131178,0.37055081988240407,0.2857229116216631,0.6180467179694366,0.007793544578384333,0.3317710397620184,0.46447182368150586,0.550977907292617,0.16992946471754275,1.684254475652639e-5,0.5014654145425158,0.3678952716673443,0.43884409527259494,0.12072604079681365,0.41298706002802144,0.060451666758751424,0.36486651245235047,0.08487406251802057,0.3496258787181598,0.6827752471347044,0.19361846478769273,0.007510517138770458,0.5977995265677172,0.6887178091158785,0.6146621267400509,0.2217582282901299,0.5493036385398059,0.5788613262297178,0.31791355364244633,0.16363565365748978,0.5984230102664105,0.4266930859707875,0.449100500582991,0.33318410322255254,0.5028523417968326,0.5299129572377761,0.3309876734386077,0.28385038608569463,0.628172252913503,0.4590790015294993,0.4537392932954041,0.602484441349667,0.4266647785030457,0.37252249086917916,0.2417799455585551,0.5905160301851151,0.5206040715031338,2.015204780788127e-23,0.02845689393281977,0.5119206635569357,0.4283265120719184,0.4463532818081602,0.6905108643674034,0.24397465411253333,0.7218204758163993,0.5778864070572908,0.15186361912122603,0.49705786299922383,0.28652233928825027,0.19510987279893127,0.002647505031864717,0.3347895139665005,0.21514057036648704,0.0003146090284176229,0.26397600699001705,0.4381594992646694,0.02604026995010464,0.47882808185710624,0.3471765093285606,0.11510095346342505,0.4786306337766666,0.3037977797944627,0.6206724256893745,0.086740659477132,0.3720085966798178,0.520902876222497,0.49513049792224084,0.031304746667131345,0.49096834574255516,0.3423261382652003,0.42692992229412424,0.5887243426680605,0.45930834135559734,0.04542078739609686,0.47012206151587976,0.4524668329228694,0.5411608710449839,0.3031356510050082,0.3750473269880426,0.4978957874866522,0.49139976407773106,0.3714522445147447,0.13390524482325633,1.0295388202800804e-6,0.39675435092384925,0.515913410802268,0.34147020514897114,0.2671477271307451,0.49086118320818195,0.3490421340880586,0.21284157933021636,0.5980746481746879,0.3875542131605011,0.5459539198603129,0.45486874877828165,0.2805046402928608,0.4206895141028353,0.372643670191491,0.06816051695788881,0.3108996162879969,0.18298692515617,0.12918475640573995,0.17163135764835089,0.0005821448004020419,0.43523797556322785,0.21778029022272055,0.5506007059072173,0.28007254450950325,0.4182920704196061,0.49318461694397947,0.43862703355668803,0.43798282610162487,0.634008216066466,0.6657297837865951,0.17622441530380162,0.7302077102677409,0.20867632564697447,0.46624052995647725,0.487546482761878,0.2633729468755831,0.5390101282992621,0.40079061630056084,0.4382798532204219,0.32184809260874603,0.5100054833447832,0.11428977403634143,0.19588135858232492,0.2468415758888497,0.21052370270625917,0.3840994512797909,0.6586504165619314,0.41248142105525526,0.56192207697224,0.06514914114667575,0.549145323079659,0.4612304147407175,0.5672589933125988,0.45811813211706837,0.4715326500849706,0.6290650077213039,0.4072754145490272,0.4979895560126793,0.03142695617989338,0.3306872092438859,0.5938562756169015,0.009245219825078603,0.4000819591329112,8.661519032056647e-120,0.620857987566801,0.5701917121907785,0.6714684485942959,0.5419613633412729,0.6702067287467381,0.6382958100345353,4.275940628689858e-5,0.4786949960515,0.3836830789675465,0.1721257061935778,0.3973009652739595,0.33222279214579586,0.5719148656278435,0.5869410378662725,0.0687918972241572,0.2736635267816182,0.16392411925368516,0.5537125208851624,0.7061617878349071,0.06769782580133682,0.05088788868133531,0.1451117562663657,0.30060638396660877,0.6891982424851659,0.1149528228888745,0.4849535356489056,0.4217708654085175,0.5432963726024718,0.4172371986565201,0.4529762010091851,0.24440743111043878,0.4197080513984702,0.03045241487796844,0.2742271421218089,0.022695957280804382,0.33391055682501314,0.2630784057910586,0.4626587547834975,0.49886780860669894,0.06245796425080054,0.15319587551875655,0.1763277761705325,0.3098549243435039,0.5676700805911928,0.32420812252110875,0.43667314119493417,0.7071423456582993,0.30874531638936886,0.12394602175096509,0.09811343903391583,0.3808005116175709,0.41776693650481966,0.41159277911022407,0.2574626799085788,0.49483143337043684,0.44214364034901354,0.2993041196583282,0.28557852886336266,3.0773962508749466e-22,0.6721584103125421,0.1754283747733327,0.264648566705133,0.3477605396161221,0.36394750462908937,0.09276209270069272,0.4771977883987208,0.36444432724317805,0.11422345262466396,0.6146193817996664,0.2889996948345665,0.3119279528157239,0.31067841447647593,0.049960486918562835,0.3517582404501932,0.593237955818651,0.5737057950989821,0.16594884302678792,0.6562861577068633,0.39254464876344863,0.38338611598348804,0.38142454524077063,0.5064696186487774,0.5302999879974005,0.025426771742045898,0.598383351157514,0.4848873644065612,0.5806814385323364,0.06507435349810228,0.32802682876078726,0.37213295327257634,0.46735783838317,0.3988614033453212,0.4625181265812083,0.38627702504147376,0.42078304561537605,0.0007973747108984599,0.15151481828221278,0.08769134718097829,0.42974835630821817,0.02795183077618463,0.6042439567234092,0.6696549142331234,0.3910110263238037,0.385336305637688,0.5232366154177549,0.18378597976317293,0.44673997756703154,0.6622615040587587,0.1975450065802752,0.0062739640896034695,0.431414390564216,0.35734628724797046,0.5172173664870315,0.3885361828017177,0.311339272613656,0.7047443778580142,0.5753239715575827,0.5352326603963351,0.023281032879389874,0.5976214184464339,0.4003482210436317,0.39952369764762335,0.562640123807494,0.6160393548964386,0.5288471335206848,0.5114298173762463,0.273591962900324,0.14080799909258987,0.5668529398443095,0.5757327997320734,0.09087354908778995,0.3256686893395294,0.10268742953299548,0.5662447409752447,0.16558302119481572,0.2889614745513053,0.6263810652923587,0.24013566185581126,0.2693420858889389,0.3819360733669116,0.4061650432252529,0.10463108422526357,0.6660571265709729,0.4086701965707471,0.6512574159843032,0.3899406929420739,0.3804688347548315,0.32284591665497503,0.577138295020094,0.39695753157191127,0.09346208037964888,0.7252082412851557,0.410558372907245,0.44766461465833807,0.010497640410647,0.22395404770586647,0.6017784543599503,0.44701695447332396,0.2664986522328705,0.5153835316474398,0.7279150575159081,0.4779781721284504,0.525275385550192,0.48558671286598293,0.5534927020556457,0.7219807553677542,0.2951885549440344,0.5779035771205057,0.5802584896851434,0.32264110858783307,0.5936639096635008,0.2778456777386715,0.4389369208868466,0.4263261865527902,0.39389175930300174,0.6246497319419231,0.5173081144967727,0.23802052430174875,0.040933016557268144,0.5933527744854773,0.3778931939763722,0.003043598975157262,0.49545907499070313,0.6979049052193144,0.2115486511095966,0.37154411064640713,0.2959825176210572,0.2290275585466063,0.008138468272527448,0.6707823818802341,0.30179702994951235,0.3504878288516606,0.5051985941025126,0.11947357610916787,0.6211008342166925,0.20911528550868225,0.5146628545785699,0.427964377346361,4.06362506748839e-6,0.1112472612263852,0.2330677894736896,0.66261014019381,0.4668031590270107,0.4900368703348414,0.6212801949449092,0.39526297693661855,0.6406711933822702,0.060755143894787804,0.008672276962090457,0.41213318490561257,0.42090411143780937,1.9125552999972207e-5,0.0010552511254912891,0.5999388335441359,0.46676891851923646,0.5910356009255515,0.5253247487762079,0.2571276903507832,0.35595477960969896,0.5162285434494145,0.6344784426982921,0.20540253893222626,0.5409935095075259,0.5086056998327325,0.41864486035282306,0.5954510845369573,0.1839979985247382,0.4954014070969535,0.5793840692913408,0.14464917571171926,0.13264077664290888,0.5860888246943241,0.4096281627708985,0.04808526897551187,0.5047184632954403,0.4430792068549016,0.0929668717483619,0.4585922700435125,0.4011342193279332,0.43324097931280287,0.3448916568041427,0.309334557611735,0.45469799648630777,0.05270017236195455,0.43226701132988066,0.3773224891699653,0.3680309565867118,0.501802314990984,0.25530794729055056,0.41649471807306027,0.6600864386461704,0.5264576541125767,0.4446593116920665,0.7366941301702881,0.06332091485672704,0.08074437405553704,0.5273954033455397,1.9632037343562105e-5,0.6078477960308748,0.3873455407713951,0.0023769013881665348,0.3691447083253101,0.5337576144215695,0.3824894778890114,0.42484679966043726,0.11341517493042781,0.45998427193620217,0.6153750951616614,0.3718491982958645,0.6209907782405514,0.02784307456003395,0.18295207298059893,0.17817664024472446,0.4647637819360703,0.4846428897938138,0.44765018107634874,0.5226991784230554,0.37502324219570593,0.4708881648624149,0.3302572076276953,0.07088624147600325,0.3477139465304333,0.46694824865043927,0.006608894435802903,0.4493680462467595,0.5698699277099382,0.3451477720525558,0.4641872879125358,0.6167888456256295,0.4697729330732067,0.44755818691971005,0.49345598514041994,0.40468034223018023,0.48336711426252715,0.5391898418688427,0.5258705199296093,0.5501594241704063,0.2774654521554436,0.3346860888572304,0.5506431554022804,0.47395309387175183,6.295019044266018e-5,1.547805047012034e-16,0.3325864499391562,0.12505025426389774,0.6220172213166728,0.40365748528734313,0.04331011164586161,0.46023377148120054,0.6673449361744045,0.5069274045746145,0.42214939623300407,0.10517531936139965,0.45016158741483414,0.00016118923603958095,0.530340469928892,0.28876690625761464,0.48630573807394123,0.317181363191014,0.6503994291165438,0.4908093507038615,0.45332643431700426,0.18402009699355729,0.6333943094772712,0.3930919838939647,0.03606727194804775,0.453547405075464,0.047607544771871194,0.3404824179229281,0.09279927184518395,0.004207054629342265,0.49228611637194436,0.5312616249879585,0.25358342931240835,0.5013765614068499,0.5815886315177383,0.6373634771242725,0.45042705878915307,0.3759799918881522,0.45034503089272115,0.21586839996309473,0.6765735534723651,0.0003402647630639992,0.004472402901892079,0.5480019671985074,0.35945322054253603,0.08470360873783804,0.1554570543111495,0.48565694727892206,0.6458160694039854,0.2334030604864022,0.47092542815745675,0.5049009655593442,0.12619532864869354,0.48346950615742645,0.38247414994753653,0.2997743414266121,0.46483894612564464,0.4867934371853781,0.41153021713446075,0.22425462312655314,0.3247278393872148,0.5784827652242839,0.3030916868008616,0.3872027318389962,0.3767614748944749,0.046810749642708684,0.47725265373207215,0.4746588219896686,0.1115728622377659,0.5949708407810766,0.6448295908255179,0.04562838498101276,0.4186705846041095,0.4176877767621364,0.472708645836047,0.026743422377930412,0.37565904584118215,0.2861666054173761,0.49128191494672735,0.36081759162041716,0.0054629424948976265,0.4610374771940109,9.545564224571886e-5,0.46060817680363964,0.5159542434526667,0.287788599376742,0.14679242582017868,0.557573961309905,0.41846237881920834,0.7477008601846749,1.428406439229824e-7,0.2027732929576324,0.6254787130720562,0.4089966996508425,0.5579017408730172,0.03363910044968315,0.04548594536320599,0.5661904244183361,0.7102035843605639,1.684010405906948e-5,0.27487719404775524,0.47991557340710633,0.025726478205595194,0.3992944401832497,0.415032406379331,0.31401279642373536,0.43790098585400167,0.3802518447711747,0.4042301986083333,0.002958477140677288,0.4102251369812812,0.5041874786887205,0.4391225241858891,0.499404418210163,0.3267556641157693,0.5986403600118909,0.35902117505817843,0.6508629223195406,0.5750091838114795,0.4213067320668889,0.317355522863986,0.425189025404466,0.16756875703318688,0.6412984088671383,1.0129752833584622e-5,0.08328581586601298,0.47210997975732794,0.22116226163119143,0.6839251258856811,0.30689302580525724,0.44092676864990904,0.4517953888745073,0.4619497928921147,0.5078779042248852,0.5104802112535047,0.25360676169785007,0.375398950377543,0.3819834839468135,0.542096462691247,0.4131590628849676,0.2107006273075663,0.504284950395338,0.4257387774129215,0.2525011836834022,0.6545933113182894,0.5186279533095004,0.2860925402115794,0.4399156924632758,0.5626326429234675,0.0006158893097658557,0.22561655763774624,0.17012736460191621,0.29282226267495803,0.44165624749358223,0.7153103853220326,0.3723395315894732,0.45214421577523667,0.05651155351221512,0.2629511366156153,0.577607001378199,0.25816777994917206,0.6468247398088554,0.2893428958943234,0.3982440022076861,0.6078837974699174,0.5751520179205635,0.4493715276602792,0.08352459655533458,0.45555694687082526,0.0908799919826076,0.3898677334651317,0.15043138603312298,0.5422357904493768,0.4212176020514732,3.1575052924447537e-31,0.011078298298571662,0.02487205488034689,0.3718228544837743,0.46715941071081823,0.47447438583267376,0.3573088065851422,0.5864812011502011,0.005304391785856778,0.2232891113402662,0.32873503297449114,0.006873808970701982,1.2266100778635737e-92,0.21735756848062257,0.005495814673193289,0.4220250732373011,0.28167489016783437,0.43519011952730957,0.11449181812675083,0.482927803641424,0.3523975347684305,0.006084954651551794,0.19152891401384609,0.4355607873793913,0.2485407027911723,0.247321362762851,0.5613597098597906,0.35818798857479595,0.5196750779072762,0.29977785464227125,0.4476005663036149,0.44427105117874377,0.41064557213048913,0.6459636000550918,0.3909873325276621,0.5371782413198337,0.0034690920636655125,0.49578908215872275,0.41915424588709294,0.1288372182942406,0.17507420721621567,0.6143348980555042,0.43333668046695306,0.4600005264262683,0.09306958468878633,0.03548374674748165,0.3556292940028696,0.5013891760616715,0.17580925610666695,0.3932042472009097,0.16847829152620686,0.22309241464857602,0.6856906600105686,0.5407866251603152,0.12129875083848277,0.561897214247799,0.155110528828658,0.7039267162665536,0.34240331477110764,0.37604285045647223,0.5648513021191695,0.3052713600995518,0.5248239149463947,0.5276900558695485,0.47017640275818284,0.3896398119821846,0.2923220344516471,0.0003260572263338863,0.381949014329654,0.4016178463349875,0.5898102938315407,0.3748363069919625,0.4849584000407282,0.6900267713682611,0.2907976516541736,0.33217137747966796,0.004426931850574251,0.22796255980996816,0.46980743958502486,0.45885435467596136,0.4059596006507471,0.51815978234048,0.7227486520583776,0.3949681070652108,0.02513552279145057,0.44415594594997865,0.5875528185231754,0.11785417796737353,0.5453822364013914,0.5375553136439116,0.56533525553021,0.5951609330395395,0.558912487265968,0.16330446404106966,0.29214551371126274,0.56112818026646,0.5538803106937489,0.04791945429379557,0.7172873728255547,0.3683359761810439,0.4458023806282565,0.18623913805669673,0.4240645896723833,0.6723846560963312,0.6530830933103182,0.45498930159380313,0.685233628136624,0.2553809523346319,0.006427986496314279,0.44844159072398315],"c":[2.7969497189408323,4.261690963767251,2.2334670601871145,4.811970443304728,4.817978539807929,2.069021481810135,4.2588659540194245,4.3072862263135345,4.398712841387425,1.0740954559780471,3.213727165840993,1.4169819329286761,5.133092340823298,3.7093307576452954,3.104617829036368,3.7157226641449284,5.128734753676494,1.5956128547569761,1.5241105241575172,4.341497209798387,5.427306059579015,2.3125494387187775,2.7905715054570734,2.7423410030116715,2.256502490646766,1.3739681160304265,2.84777172323356,2.411800420953772,5.163194795904395,3.4039753954182954,3.004578729175397,4.869102057644613,4.8979446550529895,1.8740440954350615,3.384365819686096,5.246623337687085,2.958027734856217,5.1059216930551905,5.068978884070004,1.563214122282707,4.675361074232546,2.1540909790416256,5.37102438220964,3.869904885913257,1.682949712865234,1.8824891060836082,2.472047038344307,1.8508911189358415,5.7554293474596845,5.935882607370205,1.0566320322179814,5.315715187468877,3.5823347528763185,2.5240845726755303,4.787555834423431,1.1266478553263883,1.8424923651168326,2.679260017394071,5.9949959850737535,2.1975600718765222,1.9059796363966743,4.095373486655133,2.942216478237835,5.2665921879590485,4.208950365076735,1.9965267568300584,4.677135304253452,5.515064605165301,3.740936070338982,5.174888016293016,1.4686843382183026,4.353765269151145,3.4065051772987136,3.0204724281466255,3.7166452353382455,5.851663644154841,1.2254280429046518,1.0350612703007824,5.598687486944616,5.625601928727468,5.709700679970047,5.642696426405148,3.64241045142803,2.383591334965696,3.4786118762949085,3.1304350788149398,2.8601976568877343,3.915841957124247,2.287532227283833,5.094881691324158,3.2233341722294195,2.34489715571821,2.1699306432987266,1.0154516839246333,4.414460939027753,3.927529041655813,1.8081707775301494,1.5895939050653276,5.1483717004284335,3.8426988477005075,1.4701270319686024,5.79342992697371,2.7315569777980855,4.216089490691242,3.0019918433979123,1.3819362715433716,3.3679844150256466,4.030035157940181,3.8354619512090338,4.9683602766392125,3.2238452222816916,4.590791207079494,5.704641205197289,1.8226336286139868,5.649716600170816,5.530452680561793,3.239888969011056,3.214620611779444,5.210744886710417,2.6052253185382304,3.3597775905180085,3.496569195318865,3.1220798655038617,2.9497321105339793,2.399966067938788,1.0376642498964086,3.8716263266409814,5.18419113469006,2.3757189675706405,2.814538906019415,3.4851263205125127,5.152538915223191,2.7714670588412327,1.2795128831196314,5.363409569737241,3.6025022618526137,4.866840973807286,4.308756700470901,3.3025867840574534,4.63819922904296,2.983721137226585,5.9772575375661345,1.7634092898127287,2.4818865227069034,4.377189425316475,2.3889229167726356,5.964040039898421,5.435529462726635,5.426328590453924,4.069816631221819,4.7673364548213675,2.4467868663128423,5.291317880773744,1.7301239374232216,5.5918891918947855,1.2068102175980124,2.4068063570868317,2.660636688502355,2.455362062160689,4.150151470139956,1.1084964052649662,2.1699559153024905,5.9469645521413295,2.536629738184555,2.996058143630952,4.992940378120982,1.9820065532397848,1.6980675508546608,1.001139115981229,1.833313036103206,4.843056955666851,1.7395089628875606,5.649376502241459,4.282620988441302,3.702484708796087,1.8038173708401097,4.313732031697975,3.678713541475519,1.9495007987901072,4.606693288169734,2.991174562247058,4.851315215059352,2.7167189501273503,3.758256554145734,2.837150235233216,4.387417110096593,2.569554975385159,5.335627952591531,5.902012744997575,5.14127749675417,4.350012116075725,4.73080866773498,4.4044489381374525,3.3788677271172896,5.343370538212027,5.848996077507852,3.918038986766789,5.211452212445364,5.244649182308651,1.1977653306454863,2.261114103753248,2.625866619822247,5.190684711643135,5.374324950166219,5.097082476154332,5.641957121289054,3.855037235494181,2.5973781171202175,4.638554910689925,5.931739237603402,5.220647536635404,2.6784884146597037,1.5975380293126953,5.3614430009497465,4.017486932520481,5.068653526296927,2.935646279186327,1.2903264054256038,5.799283922469018,5.4229541448277505,4.342833298983058,4.900803332690677,2.892010662028365,5.418881034309593,4.8529104753371755,4.650890545493183,2.058873394153561,5.619195622597565,2.5450479795556205,4.406580932932686,2.6941213231618093,4.807975750142228,3.471843030402531,4.097105319921328,5.084711025603268,1.5418510072744342,5.653910842630139,4.480207795689383,2.8300707749444567,1.7828142698778617,1.7752673275022492,5.488269771516801,5.868712870855712,1.4740547800158545,2.6595837184788187,3.9561677078483015,5.285584456251771,3.1303660218850284,5.206607339745344,2.0496163000195824,4.08103456878672,5.3595683724242305,4.294580650862224,3.5141092704424906,3.260559695890927,1.564179870527054,5.091305183255431,2.98558106457585,1.364355948952868,4.344366450378827,2.3240075770542745,1.859835639358929,4.26268405958344,4.860341320313873,2.801877586895251,4.923680003747885,5.791761310523689,2.5450943609939003,4.112143208518426,4.93097187089968,4.506299623470736,5.59577541301543,5.675988712030779,5.854343742943059,5.139926963641311,2.678792309498638,1.1873413143913405,3.9660430385314775,5.915108294786336,2.5395961171487826,1.1004081154481518,1.7901409498427192,4.18863381966795,2.887050788009057,1.602502397900947,4.579899793439431,4.132857282486786,2.1670111758582538,5.630087444523588,5.1465266169967645,1.365834822912554,3.9762597083528153,2.9166544253135998,4.798855882198656,3.736088559243277,2.276576565462595,4.87551707596545,4.763410416975473,2.0323627983939634,5.537736925656239,4.512034904523807,5.450020116226359,2.6217670702718645,1.126146054616797,4.015040494153273,4.761264747291559,1.7525279589660394,5.3957993798855,4.566695102429267,1.0887181295541262,5.462835983726563,1.20682500396069,1.747725203987717,4.824759911260156,2.1735508286572003,2.351780175622671,4.951306607422325,3.3301565260438295,5.626945268959014,5.602676508997127,5.944672977187883,5.9516607965151715,5.3205530484175725,5.886319870853567,3.797740205318121,2.3188412542628356,4.350476116113066,1.1296841557469697,2.588762472699452,2.211736452366229,2.729405377557429,5.867777388870027,1.4548560788628953,2.4351474138616114,4.981830918744681,4.021304035762281,4.645959221744319,3.386107729283725,2.8040493443622063,2.056147753829598,5.663405898080775,3.827767027968032,5.2478350183377085,1.6679312050793518,5.955068831351076,5.544192333386979,3.123906531653339,2.749337492304013,4.750953699274122,1.272406509851496,2.5559243730852623,3.2256264697374437,3.623915528087374,2.0197399746769698,1.7807673395484305,4.32115912893773,5.428554872098788,4.9679151539064375,2.31393822008145,5.8650953562746535,1.5249376585013643,1.324659316583913,4.765268145876922,5.222260831497197,3.999690269877214,5.695016443189771,4.763200298057527,3.1605253231250843,4.728264096104704,5.176227899363539,4.620001519809957,5.356374930416753,5.664861544182413,2.754004509654361,4.647204893625572,3.472503132664446,3.033305838679158,4.4435278829051565,3.32418346872197,1.726380755774939,1.736520339977278,5.325104587329241,1.0150363853629976,4.121872678111689,2.9264411819148206,3.2494834783271545,4.704050931072516,2.8875168954042456,3.6879831320184957,4.031816965054521,5.774244456977024,3.6695217852079423,5.887681652558937,5.716837477389725,5.360216001716553,4.4775127884437556,5.095501281857357,1.175563997941185,5.139896051232358,2.4393148903814046,5.636775830510302,1.4418938424970953,5.128922000423297,2.095945213658942,1.715128839964485,5.00223696244955,2.013877096659229,1.5090672719014055,2.29441182867424,5.506033177776365,5.322737688316314,1.3362297432221184,2.5292550610149314,5.596952286502098,3.692703262473274,1.5248727379570495,2.699119334123491,1.7500725293698962,2.4688472667577535,1.4787881363165636,1.7177292290441084,3.1580342788614093,1.354036966057829,5.367411753499807,5.651111340387461,4.949320387096361,3.527594978680666,2.5336076662871445,1.2803255481115163,5.752010208437397,5.590515117812454,5.39733261012918,3.0168699034054436,1.2864888213732653,3.873362057970348,4.818004301935495,3.7311386407139384,4.576990732462429,1.4773153061903423,4.569942554181164,4.302667693000752,5.373869589205926,1.2564042688821844,3.0312516204121964,3.9649023436549693,4.538556937133411,4.6472754816643915,3.2808136717019822,5.2740611043840175,4.156210644056625,4.629240843658109,4.1491780889596175,3.3098405306677083,2.73243814431847,3.6284711202326205,4.551757125085675,5.841515658447916,1.3833925637225843,3.046773957020984,3.617332551627529,4.20511925818815,1.391147269284533,3.787529962492339,4.7845581398427885,3.926301968174323,3.741674943060243,5.441093961693207,3.461303641257323,4.0827285601257834,4.325134871822199,4.393374141808038,1.0293471255328115,5.013149743398734,2.0478213972896566,1.0616734135804087,4.519539684655849,5.603337345542351,2.842934707781081,5.808500118028371,4.588384773838497,4.950438241849294,3.9089225560670684,4.36426854417423,1.9307641028387004,5.146808417930053,5.318445266158375,2.3631916361159946,3.8329870260946355,3.2000536423006576,2.3653366193924885,3.0066614247971373,4.18908786289804,1.741165329031449,3.1746721493086927,4.509336821714255,4.835544997434944,2.1263253244684632,3.901123931981103,4.1877504879643395,2.4801525764397425,3.9852107632354565,2.825736431443805,4.66148434411011,4.638700334893886,4.138869161032444,4.1700061920751335,5.6987816961916735,3.8417426109696367,5.962169487246372,3.8891818690704985,5.3244999303835305,5.297617783935142,4.764961564284457,2.3097214376282684,3.186461318771803,2.0029616574408218,1.6433923031086375,5.70821156912678,3.1886343782793127,3.8518033510143557,5.461527943711357,5.536517430580692,1.8838043876427581,3.569419587372359,5.453759011966758,4.9121832115529696,5.5644360234653805,2.4366092277649543,3.338077494679763,4.438053602935408,1.3603050164808752,2.3159075195727477,2.0872286630080685,3.9517385691347076,2.7581161353841646,4.131207696220033,4.10924333721244,2.7842807560723006,1.1395178648749684,3.786274174418606,2.9044074364999153,5.347696268750911,3.995729654408723,1.987480664816126,1.1203685646416008,4.488849165134389,4.806869848041553,1.939944985509581,2.5053529250238054,3.9262736158578018,5.6972129330108725,1.9719127034626018,5.024296984602518,5.262539894076239,3.9402708297007427,4.16085288697979,5.479606362485207,1.203569903307781,4.363875280052823,1.430980214660035,1.6753556015146156,5.6760181188460335,3.8764527253026695,1.7005627978767637,1.3911468288423159,3.5398980942634486,1.1590372046192168,4.40350962270327,3.180530415801938,5.080457100827523,2.981890206282053,1.867856300941815,1.849212734328375,4.711173445956466,3.7155832829947935,1.006975476962039,3.948450320900209,1.21171735897889,3.9915943200668305,2.359719369883563,1.2190911689918718,5.043799656977022,2.9326459998106627,2.7633672297208083,2.9648777005805207,2.238360907519853,2.3096439598874356,5.872427380957637,5.724488664479893,5.149399324948262,1.8426642831273212,3.0603400541101227,4.535864212508174,5.2219988767671515,1.5705971616820893,5.495344924546655,3.924581327063528,1.8770780207929507,1.461200586405749,3.6871022700120895,5.286396912059889,5.280247740129971,4.493153486360337,4.47111311921393,1.6624179251040785,2.6650695841250887,5.184253005380451,3.0926670831321434,1.9026466735903615,2.0140864211855583,4.933313820045741,4.209688298505794,3.4944544963212234,4.918866374558259,5.087678351888008,4.180668996717596,1.1501153609504124,4.714025031237584,4.030982344183833,2.226475142168415,4.357223366242364,1.949879888604891,5.249013251628371,4.012854983994883,2.7881551774009017,1.6881605159351178,4.464157039954701,4.472143771957935,1.7335715407190535,3.577336935712091,2.044422957150606,2.675746707630622,4.939084966057789,5.064733229840696,2.8683001888262862,2.238541361833473,3.0745955595857914,3.348259205503033,2.9754148970863894,4.1951453949405115,2.450663461596772,3.9552259032238393,4.510141583266329,2.9149755910522623,4.4535086857789645,5.5117363960152765,2.8200380824224958,4.211702042848818,3.7343940397962863,2.9809693686627106,5.693929261963366,3.1604169716363364,4.25853376520131,5.48570331778098,4.316325159508261,4.356822287761632,5.385032531081472,2.6820620929011754,4.009626947972237,3.432812220872016,4.436874123231661,2.3037102813809662,3.8048120217921824,5.3366787803704545,3.8044974540287395,1.4633856842587936,2.7115696041072415,4.565181940789594,1.1022126361444964,5.501445023104512,4.603637769495938,2.1844548709872305,3.9758357850247474,1.6601520581890796,1.4727292046630638,5.521302473912478,5.808587127089377,3.555838988294028,4.254178890306848,4.819824489919553,3.523863907381335,5.001071299799789,2.3407036986318754,5.76646673657679,2.2268748674186956,4.302852147929107,5.422053722032626,5.423894757124218,2.8071283568250007,4.576744062336445,2.431846138149054,3.006632949226399,4.402235838837902,2.605119339858454,3.8491552724810942,4.58558658471167,4.994260296853886,5.214068754705497,1.9063116035915175,5.011544907773655,2.3733821582213936,1.8683789845288337,4.4434043438874715,1.5622893176620625,3.2048376770126543,3.839928492885455,2.987927744313027,4.737063202648724,3.8683326139976373,3.7330504432035383,3.422120482735796,1.7838781931133643,5.376340675008721,5.857239256839457,2.510246600943291,4.91106466590603,4.211290186216999,5.979903695332197,4.037696834167603,4.163904420455898,2.1937281703319846,4.907392865131324,5.4853621081252175,3.9555751546907505,1.316099775462394,4.310686840473391,3.8922647463275384,4.9951005440823115,4.8663092862744435,3.1730356035078593,2.8090367649741044,5.823938983498736,2.826461519126111,4.473239125354052,1.6315256426957205,3.521814409928904,2.610181541406596,5.855081965642408,1.9336562427742279,5.450640221195297,4.7012932499607265,5.149741425642014,4.906455848099139,5.4175183350873715,5.071992310142089,5.8334529674366165,3.8811838811294055,3.2450933158304176,3.3955537812024685,3.869921136678978,1.3705062552378835,1.1691492294055852,3.469541715881899,2.788983567920024,5.599940034573646,4.665480247052773,1.530124393960375,3.040657012286653,4.6550359864225355,1.468864103668506,4.570301484845536,2.25462444907836,5.277918322450082,4.307508530664265,1.2820309701788193,3.5871987885745993,4.554316465654885,3.929497914802054,3.6428877285548102,2.8882974069441607,4.028511944869441,4.750827588973051,2.9159807537546736,3.4886077916541427,5.971202837518499,4.62684541556164,4.200281696120591,2.6939626987839693,2.893851692375643,3.98703252927666,3.9953404613336154,2.654542294891501,4.297442978258149,1.905762192878976,4.9044357042338955,1.4975927662563473,1.9913851245649952,5.828040118010567,2.003586517917917,4.271236216317145,4.053643319044682,5.489037481986456,4.319732756246687,5.717906014676716,1.083721691984464,2.5165370865613714,4.820023443737195,5.225694642541703,3.2089856185160004,4.204227384838246,3.787287708404093,4.676023937797752,3.470517742993791,2.7005501233581946,4.101481874705873,1.0114886785600465,2.1341988224123334,4.929354353549918,1.7741855856005941,4.109595379889123,2.6454254073384424,5.290465329542526,4.198390258925264,1.672945260132879,1.002739564556542,4.5993484373100095,2.7255266610924735,3.462483781989052,4.448903385053626,4.588771828228786,2.466458217256905,5.807827304001577,3.0169771267350467,4.24762968156106,5.1381165475563595,5.774180576171851,5.531102397255156,3.0860683798105306,5.483550619938309,1.8037241603538992,5.886055246604534,1.788998909217986,5.133065841902479,1.407481305983599,1.8690196441461384,4.152068376117063,1.1808885715619346,5.773510781248821,1.173628388517384,1.875360387695402,2.2601249738438645,5.83134418466555,2.0941123217467785,3.9745445637310084,1.236584455370874,5.278166805033623,3.347003964656703,3.6876813532507415,1.3875207453274365,1.5865286667678904,3.477837284333888,3.425373083068836,5.963207529927049,4.687891908927362,2.7897069310249836,5.3170314516786235,5.968126787425148,3.999201666153919,1.164630762192034,5.088145789057151,1.6288965869639473,3.154509939336257,5.889525456655672,5.735751774050444,2.277747733152026,5.666526056489255,3.6573484567834305,2.120541461799923,4.358125038056775,3.015544598622273,1.1567020049065393,1.7797258912424898,4.85460402380267,3.0731050034678478,5.914110042552212,1.8332861211183662,5.571997290405112,1.8387084862971184,2.5339616743750737,5.821631265671052,2.624752109672578,2.4674424686234255,2.2232107091435838,4.583923347799459,5.4779011988413835,4.333868954639114,3.3401284858144344,2.703496427492739,2.9283796562424325,1.4368203500617784,4.104835305417356,4.601882525370658,5.879522428988846,1.9645860227848535,3.6780602656984884,4.467016627415518,4.69778516922484,2.8321985388044726,4.117662483202278,5.849175577184219,3.4341245870109205,4.5814769804298034,2.545326470997206,3.524143249846953,3.096474374712465,3.440011697588309,2.725628165055235,4.07767820201788,2.6385124235151096,3.489533900322529,5.350028842552663,4.12645768037068,1.8014883348696344,4.382209887782971,5.34109083347825,4.344773338643647,2.9695898727501717,5.193733033786765,1.8613167731678295,2.812602302508912,4.152027898167198,2.695481844078338,4.357269998227826,1.1884682867737664,1.221958305666844,2.9527498034141813,4.6936339448637225,3.4969803538190547,4.096798068309413,4.795498774229836,5.885896181904272,1.9474714288116026,4.576672357161947,3.1189048766452654,4.395675187492358,5.1756927996969795,3.330450875652108,3.9691287216795867,4.523139641173887,5.658862953423355,2.6895927446928427,5.582057459500124,1.1996885335578935,2.99527463399505,3.366147120718629,1.6174850969438594,5.400914935185462,1.20913354416622,3.837650312853955,3.7158479632789945,1.8031379602551458,3.6821830282854475,3.737139457299863,1.077287247696456,4.50825212636116,2.3633875247080542,5.7039644921229,3.0104836257333325,5.605542991532867,4.168604170209641,1.7952474284212008,5.232713217068579,2.932109620860772,1.5479784959878375,3.7874094213823053,4.363668493816584,5.974326343342201,2.6534288736126257,2.910202482885511,4.587073820505578,1.3497936370389343,4.099758962607796,1.066932029997483,5.3631166531024865,5.323694545142528,2.4810538972443945,2.5422879701611816,1.0488891817621906,1.8199736183662154,1.9363625139484355,1.576448571542466,2.500001281602569,2.2004796344770527,4.924898311232912,1.0248022649967083,1.7224685681035503,3.0478611748326916,3.215237098432593,1.3094446784744487,2.588266461673399,5.487086852050703,2.323350640431201,3.2667924742593213,1.2833677259418121,1.2708962738617604,3.0023265180199856,1.241525531913418,3.4221496523011368,2.6984588590724092,4.441566469364438],"x":[18.263956777683774,12.576457208936887,7.427662406942801,13.357292815280166,13.7243302734836,11.41653369383311,3.2851537268228226,12.497450632254159,2.1201202599320546,8.983695532161523,6.993285249378849,9.570028832097448,4.374724680681705,5.631844022255555,6.211581622361974,8.639545419632253,16.325615236754565,6.44068934605289,7.452638165508681,12.06628444491471,2.6267792655233313,10.658086541190706,13.57363368457704,7.988464108928499,7.180459055035332,10.855876153261296,5.130922366342954,6.886401502538844,9.301333369230719,1.416322970685291,10.945063829626282,17.250056863201397,8.492857832150236,10.31464673641272,16.572334106522902,4.831593144854363,9.702794088872038,11.82346352518937,11.953222711994535,8.334563846752431,12.263217433360373,10.304307050569584,15.078488201695375,7.269567143104287,11.506550461473747,10.177182360062563,5.03738728186374,12.553778578511274,6.660696495790623,16.772121616428798,8.260382247361381,12.647141650781554,6.0714132442005075,5.380514792501485,9.789477581198684,15.772621704726765,6.5131021065317745,8.10245093223094,5.325531030348925,5.9184125792541575,12.292946059752483,9.615384559479121,7.522659654616817,11.467201277681474,14.163033607091169,8.595688558081145,10.263299161819369,5.064785986926507,5.454891092314805,16.842059604633786,7.675602675569704,11.429640766069939,11.367024128419217,17.666081948931215,3.369077125124096,13.276227989245392,8.938572601284957,8.39462595012575,1.27369244542769,8.049885193461012,10.645103367673201,16.98893438515666,12.402548255350343,5.545622029166202,5.522611685629042,17.792134197784357,7.988607071550247,9.024573118724813,8.70049541762752,6.918742231050821,16.974759672948238,8.617034189434893,12.512587829456628,10.592617466581569,16.49950251898425,14.58784877077623,16.893152615839576,10.234142073978163,17.021825420748513,8.214572685483937,12.108285842693396,17.543562403121197,16.032998547766503,12.657255308620554,10.526277783874168,12.772317958804004,6.081108071272105,8.098248849816787,4.735841593816648,7.489729116859243,6.404033635162132,16.33123068732732,10.146056243799375,8.288488835669401,2.0397865329358034,2.3517659780145594,12.817762022158226,5.259021232326773,7.528671469073704,18.68102151193101,7.1614268402500425,8.857600335101004,9.755766904587382,12.469785565186868,6.431164160543015,9.015499010032809,15.53182171736363,6.33412836998106,13.824048914608358,8.332179199867095,7.330318621390526,13.288174418848055,15.378595543779955,15.983122102712048,14.820153066652425,9.743313684503956,14.017947975664995,13.912891436136924,12.110925935342353,8.536535633517218,5.327839125632456,14.438314573287474,16.012707202643206,9.556951138975233,10.089970960638414,7.3652869351293715,8.16073089540995,12.598527436975901,9.020676766462966,10.662601837876295,15.173663959876098,10.672511633659617,6.57893681916355,12.415000538500752,7.878325811725879,10.860775451267429,7.733943025335789,2.114294471150835,12.893894380276999,9.326098086694557,5.089323735788061,10.190961993984548,3.1039048078743847,15.33079412170746,11.103713650728569,12.206006259306694,11.363592189818167,13.879297069207357,4.6190132271273825,10.423701102541358,11.664868467576044,13.166539001142741,15.619448897751468,12.72496572222439,3.324590223728292,9.91988000950264,7.9743150053158285,13.995486386234361,9.207795679108441,7.035306916647799,15.276931377309882,14.990389073391867,1.5875835062836408,11.686379591323409,13.36012881576599,12.138954977336809,8.69101183837801,11.707816073372008,4.30790010608934,15.65958487691121,14.752546387550806,14.035955151260339,3.7329253583470123,6.288215644779524,11.58432416064549,15.417742634115823,15.02495276981852,10.980028262105456,6.202053014885198,4.2832760443728635,6.435980023308995,1.581589557927623,5.98935218959006,8.20520275270323,17.644250213496505,11.668810708545532,2.779381513905539,5.042488568894916,11.322246429527919,9.628659303229938,8.203682338353069,16.37573984356155,10.461535101413936,4.378687813418594,9.162916235526925,13.976989128506048,7.214755129168886,4.21338589831033,3.0797419790911196,15.185635263095028,13.63939905231804,8.276357748704164,9.368941574828792,10.176626597204736,9.349429022489764,6.099043573367289,5.281062172723612,11.6855822512596,10.859576623176224,17.403635211476974,9.408427005077675,5.749123915729237,4.334055081345387,7.9557115332305655,6.147700996973189,10.98652057835857,12.558770880302042,9.867501249093749,13.827506837681028,14.481789696776657,9.221095468703586,10.608723149120074,13.344285220906922,7.202339817678061,10.236334909281942,12.479600279664385,16.31774205055634,7.508531119172119,8.820059201937404,13.263613781754117,9.199823854504569,11.414229728165266,3.3296227701287706,17.895203494535608,3.9643628172029954,6.0209656910815745,10.702844219671551,4.743805867698345,11.490518238679138,9.898576083669807,15.011885989813887,2.811405246744314,10.770701560493453,13.577225448013497,16.768857930758053,7.4977462258954475,3.532742598201506,6.489481229655299,13.992931568082579,17.888361599355832,11.704962901422675,12.571279051730844,8.522659422480942,7.7402007472390455,3.3031856950864236,9.156759369062028,15.198719522578468,2.537646144230401,4.962962249792334,14.157496785733466,9.666568748150276,8.962427557157234,9.427164609047415,16.686448162839874,13.368546346173476,7.268306506254703,5.120409302360745,8.618627124252367,18.76278637923732,12.952296455983085,2.5218351205069545,16.71363698671713,8.387099686284937,8.534666947808596,12.181697610633663,11.277721301353747,10.156502177088274,9.227177568215257,16.99296134181614,13.974609370967192,9.746351339757997,13.141719335616495,15.771515047018047,8.090086076183313,5.6584667768606245,8.73735048838515,9.897437600040682,9.655050892109752,10.623739251697186,9.36714061307341,12.188182035695265,11.644220908638957,7.321114470707441,3.4524601627134444,5.680135383261364,11.148965688468603,11.069265392643322,1.3907722017934865,13.502260133601656,12.959725658407692,6.979844505114512,8.6120291539165,10.284875060579946,4.109408844188474,15.578559331338095,7.64748626533674,2.672936740748142,4.1199737517793045,6.687997698235501,13.883578623548932,2.5895984117678617,9.967007065394318,4.383554884996672,7.27675653668439,3.4795495609270244,9.671470156222597,7.775804202699746,10.38304104108654,15.148840503405184,10.222090070106123,11.06806208374311,12.336753512099651,13.037756960356639,10.949780204944947,8.943652269398005,8.957434240443172,10.42682536999825,9.105676986939738,6.084421632992965,7.155363733754252,3.4614615542454685,10.306022089999681,13.186711426530353,5.05140771917776,9.783333535279716,13.133190233567344,12.545791147800244,9.992736762627622,10.758355865572064,15.959210252066105,8.302017774518793,9.07477243371873,10.128123794208616,13.140047658323649,6.234553992546985,5.660646740729389,6.018348853752737,10.580608604430108,9.391580972774594,7.472077949289622,4.904510286729669,10.611191800181297,10.66136929849813,8.414886857437109,8.23837832435949,5.7201601330826835,9.066587149078716,11.701747957174092,14.947744050778738,17.00979868402112,18.812280049786164,11.181051265491291,13.702602964007392,6.193954482405455,13.892804512343398,12.932392557561553,11.431175343747757,12.562968261832346,8.357543310092264,15.613087968909298,7.177140106156732,12.694177192269485,2.649685181452286,9.991455876135474,6.900476305990873,7.183644665317724,15.52802956654803,9.7531770917067,17.60705206263932,10.526748213636113,10.342126905199027,6.816635961700435,18.539959680443978,10.479662305535573,7.28175221357564,12.195862730572198,15.936305282888593,10.672721920856052,6.384782684619118,7.243957372988179,8.492486652148948,11.574025050785389,2.48368601139078,8.277300361799512,9.869367968770511,10.13818126257184,17.346135824331846,19.155663467860798,7.656166558402678,15.89797050396359,9.556832843593144,8.850709862753796,9.670719463471148,12.189895224394942,11.384300447492748,9.277507523233746,4.914094778662312,9.31541135147104,4.695804907779377,7.06208585626458,9.292489653433663,3.2252956793861887,14.074161197173353,18.120389985286256,6.945061650750956,2.8565203545189144,8.44070005026579,10.444226349781516,15.845310965013528,10.784745554027898,15.70089841278094,12.102706447925474,4.688229544622928,9.30391572192071,9.733639945837,6.0315961502253685,11.229759429402009,4.497632011175665,7.404613857343783,7.998357428089871,12.29034599220547,6.04622981715258,15.650857468981753,12.845854940226985,3.02538027868394,9.019822921810775,8.404489089569458,3.407355560571006,11.62807534092387,12.249386099460091,11.847671607761757,12.106210227197014,11.322771400228495,10.25958051985237,9.580653951177142,11.958198981425234,9.838421020863505,13.303552086571674,9.94308006417727,10.226480500710107,8.874659293165294,6.858149914435421,6.055110720935515,6.228471979196086,11.061831005773957,2.6778493742458354,6.089867731724976,8.434750660732465,7.440126047718099,5.660982981633332,11.746071864595265,12.774925256716653,10.761242963276496,10.731200813471174,13.467979815219797,8.473334449830318,5.746296140128273,5.519583668489756,8.671383965118308,12.966007543472955,9.705286381418626,8.74616625930436,11.958250713573461,10.927957455420955,6.795997993509575,7.158117836909899,9.888311049080912,17.283005829302162,2.8395193384903172,13.6656804318414,9.245216659667626,14.799838099819402,10.90720657535324,6.405280711282593,8.59555755169007,10.632179383019032,13.353146229396948,13.878682337203552,11.867506178419076,13.668387945909991,5.963664171708547,11.515221069186346,8.200123522035357,13.20420793351257,10.106968986139425,14.924981513850845,18.054455585345224,9.920425482793178,5.779970262967288,18.42211571980785,11.257182989896084,10.571504580932858,12.74459760909014,2.45190560818217,3.767206151766558,13.506273044623022,14.164666070846863,8.468049832673014,13.498995480437884,9.131371595146021,18.28822574426844,10.186994283911714,6.831169076064715,9.912844275586025,9.991168023745137,10.611918820404638,15.60563100222316,13.545405554028513,5.960928762774163,19.126853150198208,8.852097382232621,4.54669609256899,10.956047104516513,11.7204083787144,11.476043439126999,2.6390886279621806,8.542745307548111,10.468492442477574,15.0896962315515,11.469022982352726,7.568990444729906,15.597838628881018,12.165931734083278,6.5389120354744135,5.74005180998884,11.438927277869476,7.583170448763304,14.851485242579118,7.048274645560418,14.122152105501948,9.190592695721003,15.138353492138673,10.027701920714296,7.516529270881012,10.358774412557443,3.742243143137771,11.68973364845897,12.176145709017383,8.572436757489532,5.184790086273011,5.909376894769689,7.768720492276733,3.643160489490538,5.304447341706611,12.8802071279955,10.72308008897806,16.448176698039195,11.345059088566094,13.974468836752314,16.042966780563262,12.233884206218395,12.75047085782169,12.247367719698952,9.750444724889228,6.806537984513346,12.493827037031542,11.155856199791351,17.008496447348946,9.242895751621493,8.567174060743861,13.591148215769396,16.009801760840695,5.700949199066416,2.791320217076021,14.646657185524935,14.491121850464792,7.8740215303492,13.519107539401926,11.67618905710884,5.514247900073865,9.607715044189476,6.456035905502345,3.217522552654708,8.020401481738686,11.54951108189575,7.982486528895394,6.250554494013471,7.487676754465063,5.471700555319348,11.299958154881704,3.542586393182272,11.344999834423836,10.51517222718845,9.564968825352285,4.874021191321088,4.674893084643184,10.171444224287491,12.628692552403198,12.490381167644378,18.566165939599063,10.426596461333348,14.237524342293476,6.731973102511098,5.727496643129961,12.534881444355776,5.417206593633875,6.229023752132582,7.272971206865815,15.252252653728624,15.997359456200057,8.364655896505708,12.445528455540067,12.451535583917032,15.21045113153814,14.680279784385267,10.265687644923592,3.9194957569548428,10.384737944841724,10.40200994564556,12.8428043700556,16.068991590840422,6.45767645791439,17.79942245316882,14.551703715637831,4.800342517298497,6.112731354903362,10.264972032792583,8.796594200127384,7.342348519102416,7.472872081982153,13.565049781822879,9.610683268406978,13.331724656726461,13.68132623896918,9.021280512117205,8.715119969443467,14.290058641638343,11.969790369174216,5.2392391542995576,13.483549733796579,11.030420865685313,12.483070428594711,18.339574403876572,5.408688925106693,13.003979702940168,11.451901576211494,15.16152508329335,12.571621609603545,15.567518351465106,9.19157251536691,1.6011073576009904,14.15270862623421,1.9958676006856813,15.174136201583046,11.503467126552922,2.1035229560194613,14.10702696286946,10.646110182749688,14.142033624252022,15.556611094371394,5.6246709914202775,17.001168852559616,17.80735418664549,11.757370636913954,15.907000553185542,6.050078069495591,5.264483449910418,10.788858967556392,8.051699258099426,14.60225689645436,14.080221593670672,13.440565949653395,9.524720877365954,5.088640611024495,13.120924303468495,6.9680388830752475,9.916213344465397,14.087328858141635,9.595397606434247,10.399724374380048,14.10010322377489,9.189843090234074,8.345031531467765,16.208640259954397,6.207959132410743,6.90908982678359,13.15911244891259,7.121765040601005,15.195296070506675,10.129074238627428,12.694256646945243,6.485111670650825,11.441242726352906,12.767196883149015,17.03790610992781,13.18953883398033,5.1379555639599355,1.7475528797802542,13.319576147954198,7.501382644705384,12.850561028810635,9.687243707998972,6.9874000010919985,13.979180430495687,11.126221723207156,10.748897008178211,13.226710709102322,8.124487975454613,11.360881718534703,4.693409377781457,8.762686654861437,11.976204019452732,7.033822544392169,7.497071776014317,12.015250967355882,16.33245986632921,8.436466593010863,10.325091704395174,18.13741428172617,17.259908526861302,1.384176300800517,16.516435140984143,7.786914600084486,12.665257020087912,8.597465893077018,5.405236901518706,17.95915854332923,9.727623389218916,10.868856323578546,16.250342329161537,13.664741494831876,11.101239999333544,7.168738667259769,4.030330715717856,18.312862021770087,11.19803204943472,9.858962644988571,7.273671127022081,9.750420563094181,4.8163540106919704,14.517521417019681,3.600033854477682,5.168364566758569,17.130511296118115,14.683709944933451,12.119284611170432,18.638776732935575,16.531461449095268,7.756955212281607,12.07203825797514,6.014236290790164,5.666058640089368,7.058096050199591,16.414725108760166,9.063036066896785,8.95594379759671,7.01597186964336,12.43671637281443,8.50123065684196,11.885232791847201,13.086451341777124,3.5961816570824423,8.900602632008159,7.123678300554639,8.494697699514326,13.070487429036117,14.889545460549645,2.196526702100454,4.45159741513714,13.833473543124953,8.73229784569883,3.800614230928072,12.381295774767704,14.575612915754505,11.7087706552836,10.398090951347779,8.891931088238302,11.012624234854293,0.3615657101578651,12.428175734716046,16.096820782441437,12.298732937845632,7.204455980528001,10.68486678331648,11.813390508437937,18.617032553186647,2.5321613910989904,9.683900214184778,15.215283612761734,7.9254732802925965,17.05030246851623,4.885664745706936,3.4722636013681574,10.219169598838429,16.940665640066385,8.141936968668142,9.761709437695131,8.444813793212694,7.802469580945806,15.83774044737654,6.43732021233607,14.241563027346361,5.2963137727167915,5.647035760462032,9.115898233085986,10.588458859359921,11.134493230841802,15.844011401624234,10.195009524195791,7.741183008419171,6.305089603842107,10.590365677242785,12.658176730155928,10.35422317742201,14.008853168078222,9.294770445556946,10.544754412807212,16.762619800675715,10.537813188225293,14.85315723165056,5.580248730550553,5.5181628442873665,12.091586591032844,11.807870680099679,11.324990691261485,13.269521584932704,7.8634647996990275,16.44895337082827,4.879087645323972,11.96040730175412,10.28538342605471,9.9929335525974,8.521575334144323,11.211620928083498,8.476901780672453,10.83642154045489,6.294707314154038,9.69213398846296,2.7595035642324794,10.65680295562484,10.127305722129382,16.866555926121364,8.791997348425063,10.168022961568665,7.313001935733245,3.3173724724768006,8.519313151844228,6.174031246902217,12.63152629919224,5.457097826875594,18.567908868686395,7.5513392006961055,8.876686764474677,9.647144584628458,11.698798500416741,12.147179725146932,6.616851406027988,13.812212633992905,6.682656362853512,8.932033359333804,17.03623067208088,12.685612720354218,8.574160042595622,7.363399743274022,15.964113019182886,3.601690309488097,12.551931180994892,7.467717593065826,17.430510593957976,3.6742159764473903,7.49621580104383,7.731119127570842,5.789045016658485,4.102322953201465,12.3520067325444,16.553007918519654,6.007886521561516,13.671123264939043,1.227452059347649,3.9482219576759148,11.686188835478431,3.559344929822066,4.621730118518627,5.504398053524778,3.6589893803799645,10.818240955692918,11.463684801881936,6.971838399116799,4.595133229296701,14.885214286371067,13.488018589657234,1.2512895039849248,6.562768541999342,13.041961412310911,8.500672314953501,10.164100846763816,14.95202601741786,8.40146683156709,6.4337268412699755,9.114373224918126,8.990117250049803,6.7022461083415985,15.936552412901332,15.172505614079272,7.574245800565803,14.525520649788323,7.607145434886686,8.310210317190004,8.420088170734768,7.1670884114336,9.0685078156977,9.622897106527502,12.21740827286662,7.091182233109958,9.22283780065431,4.957672604931713,5.193509340206837,10.49993251602157,9.420327044023297,12.320970742552776,6.358713410600391,11.760706720512848,9.296541385062293,15.313701181662642,4.233899901283829,12.9694763464273,7.601563427779072,10.970753684589813,7.86545342865365,8.67418268965972,5.966763354864198,11.94531727283767,10.489634047374812,4.955572797814516,18.07421574747211,8.241416503955993,7.549167570385946,8.186753239337877,7.925199299422024,12.020821294827094,6.251934536127132,13.831827202324975,9.3847183467154,10.512443066232088,8.921109778445482,7.126388919506783,6.789681090105242,11.250737707685838,8.129868387886276,17.506627614700896,6.761744298503705,11.238055347695623,17.19147171335149,13.137931836230079,9.53095028576076,6.245418827230453,14.69691458447766,7.95153925266094,13.004830139214855,13.463054362386359,7.670715011055114,18.465513718938702,12.275784520888905,4.429041630611281,5.30203392980878,13.620412199572383,14.612436205720273,8.861613105389145,14.022497527218686,9.030992786734355,17.976927506067973,4.950269570325596,7.422245551009579,16.890492571569265,7.461031416222452,5.394628199871347,10.413141081553096,11.971152528802266,9.878918685875906,9.889378766431841],"mu":[8.794340945089242,9.541738202910297,2.1455881665031784,7.9752398347756355,6.260307684902542,4.191433138062677,1.8321853689432532,4.491135951392511,1.981911200338855,4.022412336902721,0.658872615431414,4.363683573208885,0.1909871946444519,2.5084493689652088,5.90964652721262,2.0403579966239405,6.3267917366978725,0.07353030645417702,6.7208365678510695,5.311900127162743,1.418979737546584,5.321226339874563,6.529559641225077,5.801019457298335,5.956118933912629,9.962624835206457,0.06695323252938978,2.200329588362717,5.485157038938755,0.0632500223676824,1.972475926445354,9.304170064318441,3.036837815295099,8.828510120354077,9.885325056261658,3.1864886906157053,6.706764703505215,2.568748085709449,4.75315975263801,2.6472687477323342,5.4670781256959415,9.432557966600045,7.242283773052625,0.5392782843969401,7.241890345949158,4.88878259405102,4.632293711194537,9.266503619647802,1.1128836513157303,8.790402437917479,6.833246226247047,4.3492617208642415,2.0695081174807184,3.286540684655148,5.114498530230948,7.190998086170454,2.046166155254725,4.462922676964602,0.6385009241192274,5.14506848683447,4.189867990751528,3.8355349240088654,5.847400573928621,8.926596393144425,9.589409999299757,8.512881133469559,7.657300435730587,0.6595078312833369,0.7453739869684828,9.486738759419522,0.5439137400320204,1.9602975998532202,7.004130949052807,7.837983941659214,0.46754778378524264,5.578630109693934,2.7984313562340057,6.553702200798002,0.8035135239905888,3.486123731782931,4.232920749571447,7.76261441880608,3.4471017160338935,0.9518315762448681,1.4209936468533835,8.908301890123902,4.2364933443790616,2.100827395124587,7.836247140931802,6.221761445507807,9.314915021760745,5.367645013184685,4.534989429229639,3.9045760075866265,6.991328302492549,5.967589355267517,9.237941114925835,7.73431500584822,9.552961378811444,1.1729011949360046,2.312797497614667,9.55270128024291,9.192946442233476,4.470804352451314,2.14670055163094,5.494091310969891,0.42960971736371034,2.7537585310515156,1.913312638294833,1.1114737201343394,6.082277912304814,9.123118536157884,9.03158544341214,1.136475576281708,0.46514853431741,1.527709124119776,7.528423810674154,1.6553008716752227,7.386649965128238,9.81736226316659,2.96284510831633,4.369192548346121,6.421266405183365,7.618567775023164,4.930959486929092,3.465394265855304,6.225880359533815,5.420418067835479,7.669821250797629,5.953825555737642,5.168370672244711,4.653577783482592,6.985859320087191,7.017714691957413,9.433085878000892,2.121655238999749,9.594570105073307,9.111804333437057,2.4685555599968922,3.2823383758442826,0.5764764429466851,5.901763302806158,8.059815580889078,5.148874553103231,0.5193390360366745,4.0874858018223925,0.3653728400905698,8.438051494223187,8.377655368803739,3.987995637314541,8.97440743155774,6.0078369029057965,5.965061206941449,7.6054738187874165,7.79311214745251,1.5895148958220062,5.666679550542424,1.8206064014382406,4.424888876707788,1.4206855600485824,4.505054663240447,2.1879776290764386,2.003968027387424,7.536621103859398,2.6259416915584843,8.578116278029029,1.5165268824252176,7.048848700710845,3.091354873709944,1.7201711056534807,9.082080026447725,9.770198381377435,6.043348551164893,5.329239457934316,1.933274642731082,0.34581283397727924,6.459733450360233,5.760650095146154,8.305500775253236,5.905787343369857,8.895502417384979,9.170011149461532,0.5711285049897064,2.942615752424542,8.827197842030916,9.109476417130576,6.139180449304316,4.586828636690541,1.7939705874306178,5.811005914720663,6.326066366543406,6.282924612959859,1.0485551876309485,0.2328825735998974,4.645641422289453,5.631456847678596,6.5639859779260945,1.1168209324880207,5.417829308599707,4.094286007674497,2.1404492615924164,0.6417479042650687,0.8196494558568013,4.070045334500145,9.919461179592785,5.740919277678477,1.3214727837827334,1.6585653693242253,4.2725764201711725,1.170090188567523,5.100251396611748,9.970197054674756,8.548766481795699,0.7046023595296158,1.0790197687803227,5.802193497483358,3.5446230333291773,4.186935299922901,0.1758481312481508,5.602107764075955,7.568452769215071,2.3762757931607736,6.081698382294556,2.7054942796637493,7.473882689851363,2.2556452124792603,2.169117302131711,6.5331474093567055,6.390662749417537,8.413099574315545,0.4466884119812953,2.2389826170948424,2.7783181460370443,3.2586868999133545,4.770987317283161,7.278044102552162,8.020607296566276,6.7134862646850095,9.665819614766251,4.718762479278176,3.215485486262395,7.650593831721686,5.569664159766594,3.1542465739298597,0.3392071933658758,5.707392571484076,7.5654564172289795,2.343666402806186,5.629328546737227,3.3268571412143833,2.603115318764586,1.9788301262169483,1.233090614129646,9.639898609253317,0.9795865947052618,3.3682596343308657,5.665636174703133,2.9424928180300713,9.788936958067925,6.0866115262453935,5.664349376821005,2.548728167280674,6.245427909257717,4.494122095794079,8.888857390941219,4.883725022724841,3.2199561317402225,0.8566698257061955,8.920978485701344,9.66051683018992,9.833479931080486,4.221682903203014,6.9124267908022325,0.6100907442271475,1.571990354634063,6.094633424688835,8.089679875043794,0.19069081075122618,4.1352837416216985,5.033008474703005,2.8094572771291393,1.8990992375222504,6.621568886024221,8.63479360604034,8.16695232070371,2.6769783254924273,2.990403021057959,0.8062256256057587,9.851705927159706,3.969336809760462,1.063361677870418,7.856077922762705,0.9949014084864105,3.456672296994374,8.928857346747677,1.5714708011453893,1.2618330887623053,0.7406991133740948,9.500794650642739,5.210770704533232,4.0724978324766825,9.164142202449412,6.716548135504857,5.361334392568176,5.618092959194387,7.745455898984954,5.8231099218896905,1.054204856357157,2.7487082363116366,2.499681198466508,8.163934916203912,2.123302230691624,1.6771749529541258,1.1028512053916062,0.9674467272105414,9.078537296063562,8.119610412878977,1.0222187609834577,7.453619066948827,9.313320177158515,6.5219050048888665,3.8422473731877527,1.4334806899766273,2.9210558529090402,8.006268852730061,5.0236220279931505,0.9206545232027064,1.8695252627279868,4.239876798406323,4.85326711339253,1.6592817189953957,2.604160485458056,0.8532529515235154,2.0439089876539884,2.404992711260987,1.1949202724579866,2.6233628671085163,5.018150079242165,5.557128464792031,6.467115268315984,9.65325289150909,4.999496016270017,3.7407486540948787,6.482814745136274,3.327510700694498,1.9115805372186823,3.627130912483618,3.2987696967562075,0.13681175957489966,6.589002886309839,3.354394060113659,5.814388590418263,4.600353172707912,2.8194136867760666,8.337123922115756,4.029074437719311,6.355428293521966,6.791744412109577,2.432128447260553,8.103490857946445,4.119702543910229,6.702919461837553,6.036512064893101,5.08582879621871,1.2024200188916945,3.948772278319137,1.379697252224934,8.798220406865841,7.33784437663507,4.702021440992259,4.514050957252103,1.813018431382909,6.931880742771908,0.6841770215395626,4.255302789408734,0.4195086477428145,2.606848048572956,4.294282538477814,9.421820367745958,9.393337546941522,9.50805492760999,8.269853781913671,5.167219146290954,3.586141272695944,8.380285870919968,6.189836869397278,7.670763554592426,4.911433110006611,3.1334230365136406,8.902138454529176,1.293588562171606,4.240145889980285,0.28883161083229636,6.5739689945625805,2.903570728154532,4.32776248088397,8.801650959531049,3.729806005463665,9.954264493991897,3.275238307031463,8.684834940420101,2.79854548935371,9.092815113781139,4.0757303580050745,4.166103817579556,2.546152636800696,7.305310031921706,8.475286108035236,1.3884397185273056,6.0546176050909235,2.8671320792194233,6.87498242679588,2.110354967930177,0.3728931388845069,9.862549238829992,3.905650932565956,8.97318649315686,9.427051626806085,1.0179935233586068,7.74410610407454,1.783525328746931,8.662111896057938,6.972547218170977,5.116974403738633,8.35312754425009,2.3696798447087253,1.1621886349981159,1.3852252595421422,0.3578775103777465,5.32516536639643,4.62708260732589,0.4397886510689841,5.471938358651432,9.069595963994008,5.78466930957283,1.5926022969679976,6.68313140203167,6.17266181872441,6.609474421692738,8.945567572322165,6.878595223340156,3.7759754983608174,1.287619520524026,4.6977379812539795,2.6936100469257096,2.6820860113115685,4.092540709012587,3.797137674726061,2.992942227407631,7.197797113549842,7.332244491605362,2.733472831418964,9.515328762382559,6.871277336723907,1.979977368586645,6.788718967681158,5.209446244952849,2.065941292866489,2.299213346773461,8.527447001762301,4.897167125438813,2.2502667466833626,7.666979556360998,8.237994825995811,8.145573292467656,7.086962218741508,1.5515041358879622,8.169573675624758,6.759291863424943,0.9451483669803507,1.4372470402837045,5.902655008534485,1.6589579775775953,6.206698098536558,5.1335999420499645,0.21613660424537162,1.5865761239701937,5.21005018186222,0.3929073434823338,4.037221568290093,1.948277538828982,8.02255294411026,9.011891426601235,3.1148582735861985,8.890090696448986,3.2718948106509216,3.447000792552821,4.522133232542478,4.980877476513166,4.675770421657692,0.2062035037050136,6.5633993203635015,3.167433485447706,6.585308472995292,0.8612231083104516,0.8462653565863842,5.07057991109537,7.377066856239452,2.001060944962205,4.726295541065852,1.0763117898125185,5.539206076830345,9.537427226563832,1.556491319101323,3.3994311368105334,2.7376706231083037,5.346498039631918,6.761628682934713,3.924612776222045,7.6677421230565805,5.490263094874283,8.939728027455434,6.566189951946962,9.49978342205089,9.4473876101641,7.469114250753233,9.025127503341146,2.162549030618164,1.5488126207848163,8.970043519010897,8.16588131401597,1.0078077693310838,2.870792714012984,0.30221227917457405,3.0371064608405307,5.570760886578377,7.5966175486716025,2.6588325986269057,9.009425124332996,4.801503271830462,8.814249113240486,2.808093280865378,1.402002271617595,9.145130756078048,0.0911931211839967,4.7709408741303765,9.816002359845879,5.237927929421815,1.4295675161535004,9.580171112315938,2.115530170425175,0.08525791662608917,9.113938785782596,5.660584901077248,7.898695946583729,1.0689188517671533,3.5669180612246176,9.740093723711755,7.474789931717627,9.426731630463745,2.5023408006980397,7.277544099946988,8.524602207197226,2.2256892263350814,0.585739088910151,5.40868867998465,5.502436006290859,8.389327227794443,0.6558732191846639,7.118478365149452,6.923924409544688,7.759105199976,6.0615440357132595,2.0464396351571046,8.419956641463795,2.484153378926355,2.3091438880280446,5.67345975736597,3.056027358769793,4.408962514404495,3.893023712008603,0.9097192000591559,0.4449621395067882,1.4887459359317767,4.098846282628172,2.403349184031651,8.605746205114794,8.342213736838174,5.766218074567053,9.321980291915118,2.604621682862418,8.147645380736483,2.7761011723027806,0.7144274208803258,3.775616750906501,4.630510799830505,9.194537224199511,7.205759116943236,0.1967650510937924,1.4830627664453466,5.893696502672128,8.710361471051067,2.4430801963305937,1.5416751925173289,9.138469616049873,7.423557976663258,7.427088834714994,9.479334214799858,1.9775617057287964,3.1519267886327484,2.9872533945865953,1.6215647969702718,0.1121365050525891,7.381921696163101,2.3490381620692347,5.482976318651618,0.30319691825208217,0.5221947541878058,4.686847807568109,3.05643089124229,0.41536838521614605,1.4299422695777486,4.953776989605176,9.333324869870047,2.868165509926137,1.7349851722132348,4.129921129563858,3.7264657806960555,4.029845987560597,9.443972818967524,4.397422456105717,5.287596212293828,5.239355496047409,5.145003550165446,8.389780009763971,2.811173940434044,5.984739641306163,6.856105616453836,8.950376424813859,9.242755871239005,1.283909999738686,5.812984350579812,8.605364057377333,9.266728913896443,7.874031187905414,0.3622346762038564,2.002113389959801,1.4250224420485624,3.5922616069904345,6.429348568821109,7.37596729878822,4.216796983411593,8.09546979127457,5.063822155090394,2.707321750561018,3.6753358487688237,0.753686735722825,2.6018185134609695,6.3865279542229425,0.7740810269233056,3.8863517093655697,8.490855546563163,5.579468728096037,5.899343557020183,1.9928019487641868,3.831685889618195,9.079652108649865,7.171090765591122,4.170974205709179,7.917351206519174,5.337794579962014,9.64004392463117,9.905477474888297,1.2845889758630502,7.241202986843261,3.8860025175863844,8.403286343332585,4.757597908315141,5.818045072731081,7.596115682612272,0.09164593905686136,8.683470242168115,1.7777106842861778,8.86946294164926,9.532624560462057,1.5055272414822007,6.905182500669982,1.4634170472556152,8.564137936799128,7.988613126545301,4.2184869768103965,7.840572458893467,8.534361168519403,4.5264700687767,6.79828911201372,5.1606469887727595,2.2071860218300388,7.796806318877345,2.7988176075582083,5.23132146693845,9.862621256764534,6.0815433269564885,3.930690338148941,0.07774575282170515,9.060158617617093,5.562442719890981,4.252389658848301,4.234376324845622,9.336960284701911,1.6420388826110366,6.749899563418342,7.093407154220872,0.051680137198357734,9.969632867669889,0.07441627895450109,0.25212108703811076,6.788016444204857,0.29970930714885435,7.320940083524543,0.2282224579360248,4.189236130068343,1.4886968564949243,6.882945375024121,6.473697091659045,9.989942783134012,3.6115472243350077,4.87494327045728,1.6597525821878034,9.018666876555946,5.731691623409287,3.8244529723713683,2.6505829291360428,5.644020741970173,6.72558421108678,4.0015221198606294,0.9608742559648076,7.185859013853204,6.22178051214854,2.8271645895441377,4.470533422200267,1.6284282711438713,6.8010323251625575,1.2023353829804417,3.026219471949072,4.071968895108022,8.914232447010884,3.7946698291724057,7.007492263347775,9.637298821119913,9.786686209722573,0.3142223631892005,7.34946510543568,6.53647547413483,6.702859347911618,6.802154168985075,4.693164090191031,9.728039918035769,1.448854824244179,8.263811563935768,7.6889761305623665,9.151648853007444,5.83970614374647,1.0773027682981318,0.4720681520298009,8.48466977996578,8.151938102279948,1.0655779019445766,7.036760545956993,9.174395853939139,0.7464497191176656,9.075407710851323,2.841477464089033,2.5527759442863385,8.269767223811568,8.613944115088222,9.593091984018713,9.877168402613757,7.693582112390429,6.199296107280022,6.189883200068578,0.7325656103159006,1.2474969503772138,1.5996852194105582,9.20098655052421,0.20861910571580822,5.823210026545073,2.6849313645768147,3.709745569627274,5.772576126663704,6.552896741020174,7.972365029076367,2.924515951369402,0.3930827305722828,3.3950036506763004,6.55756390621121,7.772050269528512,5.5174914131516655,0.7377884347440533,1.3882150294990647,7.330489678659109,0.8708739619315797,2.6820687790192843,6.877466286547945,9.549187070566418,9.421074341518057,7.384438601344831,8.26753019672639,1.3955143675466908,0.15078833202627484,4.705727355873941,7.121628997849763,8.160430991670768,5.555965450180054,2.8326542790982367,5.548041601150269,8.841659848512776,2.4550699209509896,6.64537710352147,7.768295125702456,1.8971568894420976,9.345559840288942,3.7133803475251703,2.422805219141211,5.135751069983831,9.67831491541996,7.893550958197711,7.475663520262645,1.50673540872571,6.908093424495831,9.378775877472417,2.7246681497438274,8.512352308784042,0.28286313831224374,0.12982778229651437,1.7304307443752354,9.9347460454658,2.9783071386497606,8.926300784137016,1.0339899271592246,3.787397646944488,0.18470316052638047,4.133084724675797,6.556929715398761,3.4822232123306174,8.06361957648405,2.8740524620751584,9.363646134313894,7.683751137193839,9.921593080382593,6.212857262432379,5.46426634640201,3.5741129262109506,8.041339397036996,9.152534024057093,3.8640391438925104,8.213805696453695,2.2275380003851475,9.935269045344185,2.3151422310962944,8.341804554596074,2.2549591504161692,7.364753307205641,0.9320459544749582,5.078114955965338,0.9709909064307864,2.896902111662576,2.4851165432779454,0.7234498688809832,0.9237616126722026,6.770977371347517,1.9892534562494668,9.29490149100362,3.6162978009445967,0.5523816668958204,0.5171306574482659,2.8341826372935475,6.028414091788075,5.047174935898491,8.693223709504956,0.3630610666118139,9.872894687521185,5.315058081310394,0.288587357992518,8.802168851359905,6.97941440529168,6.235628085177245,2.258810561410489,5.053407190109882,4.425584075393334,0.77416962661496,7.066345984056282,4.83096594656772,4.689034887813406,5.832847820524767,6.125732165004689,2.085671115171499,8.034303319493423,6.160336054790627,9.546052761356545,1.4531837651687263,7.465829568722501,7.017949059064879,4.6207977654183185,1.639088215337603,5.395034997048127,7.820464147560129,0.46366414344479967,4.098784089666221,0.6976873246684567,0.004354456877118107,8.086003928948642,2.9322307964960426,4.615622970353456,3.1885217343383943,3.2572988551929294,5.482152297286098,9.111959815446104,0.275398544490737,3.535956779538114,7.79618814023423,7.301619419353662,0.702920895053929,5.506683577709945,5.833784373833744,4.489301957165166,6.917787429686218,6.149470589609301,2.2494771765742727,1.9436288161561999,6.498442161695954,1.79074388781288,2.096366310882858,9.499750477453127,9.540676521419666,5.913681321212076,6.771342546675507,7.057713786840569,0.7726141752847826,2.1432530163139996,5.087928166187252,5.8678225864316325,1.9529857673328554,4.76189193783166,1.3777866164470587,7.664343317027598,3.7871632952500045,1.2903413594667512,1.7185732055535752,6.9523040819561155,4.558577491124572,4.9404746097693515,8.000144072709404,1.9719981435915224,7.306739302884644,2.831613601764593,8.161684541464327,4.929508051812603,2.598362740155067,3.6080780979739724,3.9321521126274317,0.5253605405165773,8.44189308535917,1.2485144695297823,2.2545070002709977,9.43045426213109,5.047933389695734,2.4053453378496004,7.9536433243452525,0.5921265700538902,6.095106003497632,0.07507120977992221,7.187691743600375,3.3725095752864065,0.7801804400764256,5.5271449489379805,2.4862323585443935,6.052094799222787,9.425229495486738,2.5593442983429737,9.146547759654952,4.807227656262811,1.4195573507445158,8.715301480824458,5.726137927565363,8.469295507255108,2.008082632198751,6.055034074499652,7.522652454736889,8.027533101416903,8.368564117170887,2.9015504689379723,9.611448992073504,5.83392365105362,1.8948199290148926,4.378545396335484,8.520648878209707,5.9144864767654415,8.039892055536878,4.034867901441088,5.83272220028406,8.537624618474155,3.6204524984438224,2.310083008725057,9.713838660433204,1.1705614302735956,0.01597332677639285,2.8564045309459885,9.325757443446921,9.515550086399543,2.1593737245422084]}
},{}],48:[function(require,module,exports){
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

var positiveMean = require( './fixtures/julia/positive_mean.json' );
var negativeMean = require( './fixtures/julia/negative_mean.json' );
var largeVariance = require( './fixtures/julia/large_variance.json' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.equal( typeof cdf, 'function', 'main export is a function' );
	t.end();
});

tape( 'if provided `NaN` for any parameter, the function returns `NaN`', function test( t ) {
	var y = cdf( NaN, 0.0, 1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );
	y = cdf( 0.0, NaN, 1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );
	y = cdf( 0.0, 1.0, NaN );
	t.equal( isnan( y ), true, 'returns NaN' );
	t.end();
});

tape( 'if provided `+infinity` for `x` and a finite `mu` and `c`, the function returns `1`', function test( t ) {
	var y = cdf( PINF, 0.0, 1.0 );
	t.equal( y, 1.0, 'returns 1' );
	t.end();
});

tape( 'if provided `-infinity` for `x` and a finite `mu` and `c`, the function returns `0`', function test( t ) {
	var y = cdf( NINF, 0.0, 1.0 );
	t.equal( y, 0.0, 'returns 0' );
	t.end();
});

tape( 'if provided a `x` smaller than `mu`, the function returns `0`', function test( t ) {
	var y = cdf( -1.0, 0.0, 1.0 );
	t.equal( y, 0.0, 'returns 0' );

	y = cdf( 3.0, 4.0, 1.0 );
	t.equal( y, 0.0, 'returns 0' );

	t.end();
});

tape( 'if provided a nonpositive `c`, the function returns `NaN`', function test( t ) {
	var y;

	y = cdf( 2.0, 2.0, 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = cdf( 2.0, 2.0, -1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = cdf( 0.0, 2.0, -1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = cdf( 2.0, 1.0, NINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = cdf( 2.0, PINF, NINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = cdf( 2.0, NINF, NINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = cdf( 2.0, NaN, NINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'the function evaluates the cdf for `x` given positive `mu`', function test( t ) {
	var expected;
	var delta;
	var tol;
	var mu;
	var c;
	var i;
	var x;
	var y;

	expected = positiveMean.expected;
	x = positiveMean.x;
	mu = positiveMean.mu;
	c = positiveMean.c;
	for ( i = 0; i < x.length; i++ ) {
		y = cdf( x[i], mu[i], c[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', mu:'+mu[i]+', c: '+c[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 1.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. mu: '+mu[i]+'. c: '+c[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the function evaluates the cdf for `x` given negative `mu`', function test( t ) {
	var expected;
	var delta;
	var tol;
	var mu;
	var c;
	var i;
	var x;
	var y;

	tol = EPS;

	expected = negativeMean.expected;
	x = negativeMean.x;
	mu = negativeMean.mu;
	c = negativeMean.c;
	for ( i = 0; i < x.length; i++ ) {
		y = cdf( x[i], mu[i], c[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', mu:'+mu[i]+', c: '+c[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 1.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. mu: '+mu[i]+'. c: '+c[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the function evaluates the cdf for `x` given large variance ( = large `b` )', function test( t ) {
	var expected;
	var delta;
	var tol;
	var mu;
	var c;
	var i;
	var x;
	var y;

	expected = largeVariance.expected;
	x = largeVariance.x;
	mu = largeVariance.mu;
	c = largeVariance.c;
	for ( i = 0; i < x.length; i++ ) {
		y = cdf( x[i], mu[i], c[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', mu:'+mu[i]+', c: '+c[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 1.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. mu: '+mu[i]+'. c: '+c[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

}).call(this,"/lib/node_modules/@stdlib/math/base/dists/levy/cdf/test/test.cdf.js")
},{"./../lib":44,"./fixtures/julia/large_variance.json":45,"./fixtures/julia/negative_mean.json":46,"./fixtures/julia/positive_mean.json":47,"@stdlib/constants/math/float64-eps":26,"@stdlib/constants/math/float64-ninf":32,"@stdlib/constants/math/float64-pinf":33,"@stdlib/math/base/assert/is-nan":40,"@stdlib/math/base/special/abs":52,"tape":175}],49:[function(require,module,exports){
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

var positiveMean = require( './fixtures/julia/positive_mean.json' );
var negativeMean = require( './fixtures/julia/negative_mean.json' );
var largeVariance = require( './fixtures/julia/large_variance.json' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.equal( typeof factory, 'function', 'main export is a function' );
	t.end();
});

tape( 'the function returns a function', function test( t ) {
	var cdf = factory( 0.0, 1.0 );
	t.equal( typeof cdf, 'function', 'returns a function' );
	t.end();
});

tape( 'if provided `NaN` for any parameter, the created function returns `NaN`', function test( t ) {
	var cdf;
	var y;

	cdf = factory( 0.0, 1.0 );
	y = cdf( NaN );
	t.equal( isnan( y ), true, 'returns NaN' );

	cdf = factory( NaN, 1.0 );
	y = cdf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	cdf = factory( 1.0, NaN );
	y = cdf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	cdf = factory( NaN, NaN );
	y = cdf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	cdf = factory( NaN, NaN );
	y = cdf( NaN );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'if provided a valid `mu` and `c`, the function returns a function which returns `1` when provided `+infinity` for `x`', function test( t ) {
	var cdf;
	var y;

	cdf = factory( 0.0, 1.0 );
	y = cdf( PINF );
	t.equal( y, 1.0, 'returns 1' );

	t.end();
});

tape( 'if provided a valid `mu` and `c`, the function returns a function which returns `0` when provided `-infinity` for `x`', function test( t ) {
	var cdf;
	var y;

	cdf = factory( 0.0, 1.0 );
	y = cdf( NINF );
	t.equal( y, 0.0, 'returns 0' );

	t.end();
});

tape( 'the created function returns `0` for `x < mu`', function test( t ) {
	var cdf;
	var y;

	cdf = factory( 0.0, 1.0 );
	y= cdf( -1.0 );
	t.equal( y, 0.0, 'returns 0' );

	cdf = factory( 4.0, 1.0 );
	y = cdf( 3.0 );
	t.equal( y, 0.0, 'returns 0' );

	t.end();
});

tape( 'if provided a nonpositive `c`, the created function always returns `NaN`', function test( t ) {
	var cdf;
	var y;

	cdf = factory( 0.0, -1.0 );

	y = cdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = cdf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	cdf = factory( 0.0, 0.0 );

	y = cdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = cdf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	cdf = factory( 0.0, NINF );
	y = cdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	cdf = factory( PINF, NINF );
	y = cdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	cdf = factory( NINF, NINF );
	y = cdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	cdf = factory( NaN, NINF );
	y = cdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'the created function evaluates the cdf for `x` given positive `mu`', function test( t ) {
	var expected;
	var delta;
	var cdf;
	var tol;
	var mu;
	var c;
	var i;
	var x;
	var y;

	expected = positiveMean.expected;
	x = positiveMean.x;
	mu = positiveMean.mu;
	c = positiveMean.c;
	for ( i = 0; i < x.length; i++ ) {
		cdf = factory( mu[i], c[i] );
		y = cdf( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', mu:'+mu[i]+', c: '+c[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 1.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. mu: '+mu[i]+'. c: '+c[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the created function evaluates the cdf for `x` given negative `mu`', function test( t ) {
	var expected;
	var delta;
	var cdf;
	var tol;
	var mu;
	var c;
	var i;
	var x;
	var y;

	expected = negativeMean.expected;
	x = negativeMean.x;
	mu = negativeMean.mu;
	c = negativeMean.c;
	for ( i = 0; i < x.length; i++ ) {
		cdf = factory( mu[i], c[i] );
		y = cdf( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', mu:'+mu[i]+', c: '+c[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 1.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. mu: '+mu[i]+'. c: '+c[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the created function evaluates the cdf for `x` given large variance ( = large `b`)', function test( t ) {
	var expected;
	var delta;
	var cdf;
	var tol;
	var mu;
	var c;
	var i;
	var x;
	var y;

	expected = largeVariance.expected;
	x = largeVariance.x;
	mu = largeVariance.mu;
	c = largeVariance.c;
	for ( i = 0; i < x.length; i++ ) {
		cdf = factory( mu[i], c[i] );
		y = cdf( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', mu:'+mu[i]+', c: '+c[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 1.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. mu: '+mu[i]+'. c: '+c[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

}).call(this,"/lib/node_modules/@stdlib/math/base/dists/levy/cdf/test/test.factory.js")
},{"./../lib/factory.js":43,"./fixtures/julia/large_variance.json":45,"./fixtures/julia/negative_mean.json":46,"./fixtures/julia/positive_mean.json":47,"@stdlib/constants/math/float64-eps":26,"@stdlib/constants/math/float64-ninf":32,"@stdlib/constants/math/float64-pinf":33,"@stdlib/math/base/assert/is-nan":40,"@stdlib/math/base/special/abs":52,"tape":175}],50:[function(require,module,exports){
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

}).call(this,"/lib/node_modules/@stdlib/math/base/dists/levy/cdf/test/test.js")
},{"./../lib":44,"tape":175}],51:[function(require,module,exports){
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

},{}],52:[function(require,module,exports){
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

},{"./abs.js":51}],53:[function(require,module,exports){
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

},{}],54:[function(require,module,exports){
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

},{"./ceil.js":53}],55:[function(require,module,exports){
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

},{"@stdlib/number/float64/base/from-words":80,"@stdlib/number/float64/base/get-high-word":84,"@stdlib/number/float64/base/to-words":92}],56:[function(require,module,exports){
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

},{"./copysign.js":55}],57:[function(require,module,exports){
'use strict';

/*
* The following copyright, license, and long comment were part of the original implementation available as part of [FreeBSD]{@link https://svnweb.freebsd.org/base/release/9.3.0/lib/msun/src/s_erf.c?revision=268523&view=co}.
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
var exp = require( '@stdlib/math/base/special/exp' );
var setLowWord = require( '@stdlib/number/float64/base/set-low-word' );
var PINF = require( '@stdlib/constants/math/float64-pinf' );
var NINF = require( '@stdlib/constants/math/float64-ninf' );
var polyvalPP = require( './polyval_pp.js' );
var polyvalQQ = require( './polyval_qq.js' );
var polyvalPA = require( './polyval_pa.js' );
var polyvalQA = require( './polyval_qa.js' );
var polyvalRA = require( './polyval_ra.js' );
var polyvalSA = require( './polyval_sa.js' );
var polyvalRB = require( './polyval_rb.js' );
var polyvalSB = require( './polyval_sb.js' );


// VARIABLES //

var TINY = 1.0e-300;

// 2**-56 = 1/(2**56) = 1/72057594037927940
var SMALL = 1.3877787807814457e-17;

var ERX = 8.45062911510467529297e-1;  // 0x3FEB0AC1, 0x60000000

var PPC = 1.28379167095512558561e-1;  // 0x3FC06EBA, 0x8214DB68
var QQC = 1.0;

var PAC = -2.36211856075265944077e-3; // 0xBF6359B8, 0xBEF77538
var QAC = 1.0;

var RAC = -9.86494403484714822705e-3; // 0xBF843412, 0x600D6435
var SAC = 1.0;

var RBC = -9.86494292470009928597e-3; // 0xBF843412, 0x39E86F4A
var SBC = 1.0;


// MAIN //

/**
* Evaluates the complementary error function.
*
* ```tex
* \operatorname{erf}(x) = \frac{2}{\sqrt{\pi}} \int^{x}_{0} e^{-t^2}\ \mathrm{dt}
* ```
*
* Note that
*
* ```tex
* \begin{align*}
* \operatorname{erfc}(x) &= 1 - \operatorname{erf}(x) \\
* \operatorname{erf}(-x) &= -\operatorname{erf}(x) \\
* \operatorname{erfc}(-x) &= 2 - \operatorname{erfc}(x)
* \end{align*}
* ```
*
* ## Method
*
* 1.  For \\(|x| \in [0, 0.84375)\\),
*
*     ```tex
*     \operatorname{erf}(x) = x + x \cdot \operatorname{R}(x^2)
*     ```
*
*     and
*
*     ```tex
*     \operatorname{erfc}(x) = \begin{cases}
*     1 - \operatorname{erf}(x) & \textrm{if}\ x \in (-.84375,0.25) \\
*     0.5 + ((0.5-x)-x \mathrm{R}) & \textrm{if}\ x \in [0.25,0.84375)
*     \end{cases}
*     ```
*
*     where \\(R = P/Q\\) and where \\(P\\) is an odd polynomial of degree \\(8\\) and \\(Q\\) is an odd polynomial of degree \\(10\\).
*
*     ```tex
*     \biggl| \mathrm{R} - \frac{\operatorname{erf}(x)-x}{x} \biggr| \leq 2^{-57.90}
*     ```
*
*     <!-- <note> -->
*
*     The formula is derived by noting
*
*     ```tex
*     \operatorname{erf}(x) = \frac{2}{\sqrt{\pi}}\biggl(x - \frac{x^3}{3} + \frac{x^5}{10} - \frac{x^7}{42} + \ldots \biggr)
*     ```
*
*     and that
*
*     ```tex
*     \frac{2}{\sqrt{\pi}} = 1.128379167095512573896158903121545171688
*     ```
*
*     is close to unity. The interval is chosen because the fix point of \\(\operatorname{erf}(x)\\) is near \\(0.6174\\) (i.e., \\(\operatorname{erf(x)} = x\\) when \\(x\\) is near \\(0.6174\\)), and, by some experiment, \\(0.84375\\) is chosen to guarantee the error is less than one ulp for \\(\operatorname{erf}(x)\\).
*
*     <!-- </note> -->
*
* 2.  For \\(|x| \in [0.84375,1.25)\\), let \\(s = |x|-1\\), and \\(c = 0.84506291151\\) rounded to single (\\(24\\) bits)
*
*     ```tex
*     \operatorname{erf}(x) = \operatorname{sign}(x) \cdot \biggl(c + \frac{\operatorname{P1}(s)}{\operatorname{Q1}(s)}\biggr)
*     ```
*
*     and
*
*     ```tex
*     \operatorname{erfc}(x) = \begin{cases}
*     (1-c) - \frac{\operatorname{P1}(s)}{\operatorname{Q1}(s)} & \textrm{if}\ x > 0 \\
*     1 + \biggl(c + \frac{\operatorname{P1}(s)}{\operatorname{Q1}(s)}\biggr) & \textrm{if}\ x < 0
*     \end{cases}
*     ```
*
*     where
*
*     ```tex
*     \biggl|\frac{\mathrm{P1}}{\mathrm{Q1}} - (\operatorname{erf}(|x|)-c)\biggr| \leq 2^{-59.06}
*     ```
*
*     <!-- <note> -->
*
*     Here, we use the Taylor series expansion at \\(x = 1\\)
*
*     ```tex
*     \begin{align*}
*     \operatorname{erf}(1+s) &= \operatorname{erf}(1) + s\cdot \operatorname{poly}(s) \\
*     &= 0.845.. + \frac{\operatorname{P1}(s)}{\operatorname{Q1}(s)}
*     \end{align*}
*     ```
*
*     using a rational approximation to approximate
*
*     ```tex
*     \operatorname{erf}(1+s) - (c = (\mathrm{single})0.84506291151)
*     ```
*
*     <!-- </note> -->
*
*     Note that, for \\(x \in [0.84375,1.25)\\), \\(|\mathrm{P1}/\mathrm{Q1}| < 0.078\\), where
*
*     -   \\(\operatorname{P1}(s)\\) is a degree \\(6\\) polynomial in \\(s\\)
*     -   \\(\operatorname{Q1}(s)\\) is a degree \\(6\\) polynomial in \\(s\\)
*
* 3.  For \\(x \in [1.25,1/0.35)\\),
*
*     ```tex
*     \begin{align*}
*     \operatorname{erfc}(x) &= \frac{1}{x}e^{-x^2-0.5625+(\mathrm{R1}/\mathrm{S1})} \\
*     \operatorname{erf}(x) &= 1 - \operatorname{erfc}(x)
*     \end{align*}
*     ```
*
*     where
*
*     -   \\(\operatorname{R1}(z)\\) is a degree \\(7\\) polynomial in \\(z\\), where \\(z = 1/x^2\\)
*     -   \\(\operatorname{S1}(z)\\) is a degree \\(8\\) polynomial in \\(z\\)
*
* 4.  For \\(x \in [1/0.35,28)\\),
*
*     ```tex
*     \operatorname{erfc}(x) = \begin{cases}
*     \frac{1}{x} e^{-x^2-0.5625+(\mathrm{R2}/\mathrm{S2})} & \textrm{if}\ x > 0 \\
*     2.0 - \frac{1}{x} e^{-x^2-0.5625+(\mathrm{R2}/\mathrm{S2})} & \textrm{if}\ -6 < x < 0 \\
*     2.0 - \mathrm{tiny} & \textrm{if}\ x \leq -6
*     \end{cases}
*     ```
*
*     and
*
*     ```tex
*     \operatorname{erf}(x) = \begin{cases}
*     \operatorname{sign}(x) \cdot (1.0 - \operatorname{erfc}(x)) & \textrm{if}\ x < 6 \\
*     \operatorname{sign}(x) \cdot (1.0 - \mathrm{tiny}) & \textrm{otherwise}
*     \end{cases}
*     ```
*
*     where
*
*     -   \\(\operatorname{R2}(z)\\) is a degree \\(6\\) polynomial in \\(z\\), where \\(z = 1/x^2\\)
*     -   \\(\operatorname{S2}(z)\\) is a degree \\(7\\) polynomial in \\(z\\)
*
* 5.  For \\(x \in [28, \infty)\\),
*
*     ```tex
*     \begin{align*}
*     \operatorname{erf}(x) &= \operatorname{sign}(x) \cdot (1 - \mathrm{tiny}) & \textrm{(raise inexact)}
*     \end{align*}
*     ```
*
*     and
*
*     ```tex
*     \operatorname{erfc}(x) = \begin{cases}
*     \mathrm{tiny} \cdot \mathrm{tiny} & \textrm{if}\ x > 0\ \textrm{(raise underflow)} \\
*     2 - \mathrm{tiny} & \textrm{if}\ x < 0
*     \end{cases}
*     ```
*
*
* ## Special Cases
*
* ```tex
* \begin{align*}
* \operatorname{erf}(0) &= 0 \\
* \operatorname{erf}(-0) &= -0 \\
* \operatorname{erf}(\infty) &= 1 \\
* \operatorname{erf}(-\infty) &= -1 \\
* \operatorname{erfc}(0) &= 1 \\
* \operatorname{erfc}(\infty) &= 0 \\
* \operatorname{erfc}(-\infty) &= 2 \\
* \operatorname{erf}(\mathrm{NaN}) &= \mathrm{NaN} \\
* \operatorname{erfc}(\mathrm{NaN}) &= \mathrm{NaN}
* \end{align*}
* ```
*
*
* ## Notes
*
* -   To compute \\(\exp(-x^2-0.5625+(\mathrm{R}/\mathrm{S}))\\), let \\(s\\) be a single precision number and \\(s := x\\); then
*
*     ```tex
*     -x^2 = -s^2 + (s-x)(s+x)
*     ```
*
*     and
*
*     ```tex
*     e^{-x^2-0.5626+(\mathrm{R}/\mathrm{S})} = e^{-s^2-0.5625} e^{(s-x)(s+x)+(\mathrm{R}/\mathrm{S})}
*     ```
*
* -   `#4` and `#5` make use of the asymptotic series
*
*     ```tex
*     \operatorname{erfc}(x) \approx \frac{e^{-x^2}}{x\sqrt{\pi}} (1 + \operatorname{poly}(1/x^2))
*     ```
*
*     We use a rational approximation to approximate
*
*     ```tex
*     g(s) = f(1/x^2) = \ln(\operatorname{erfc}(x) \cdot x) - x^2 + 0.5625
*     ```
*
* -   The error bound for \\(\mathrm{R1}/\mathrm{S1}\\) is
*
*     ```tex
*     |\mathrm{R1}/\mathrm{S1} - f(x)| < 2^{-62.57}
*     ```
*
*     and for \\(\mathrm{R2}/\mathrm{S2}\\) is
*
*     ```tex
*     |\mathrm{R2}/\mathrm{S2} - f(x)| < 2^{-61.52}
*     ```
*
* @param {number} x - input value
* @returns {number} function value
*
* @example
* var y = erfc( 2.0 );
* // returns ~0.0047
*
* @example
* var y = erfc( -1.0 );
* // returns ~-1.8427
*
* @example
* var y = erfc( 0.0 );
* // returns 1.0
*
* @example
* var y = erfc( Infinity );
* // returns 0.0
*
* @example
* var y = erfc( -Infinity );
* // returns 2.0
*
* @example
* var y = erfc( NaN );
* // returns NaN
*/
function erfc( x ) {
	var sign;
	var ax;
	var z;
	var r;
	var s;
	var y;
	var p;
	var q;

	// Special case: NaN
	if ( isnan( x ) ) {
		return NaN;
	}
	// Special case: +infinity
	if ( x === PINF ) {
		return 0.0;
	}
	// Special case: -infinity
	if ( x === NINF ) {
		return 2.0;
	}
	// Special case: +-0
	if ( x === 0.0 ) {
		return 1.0;
	}
	if ( x < 0.0 ) {
		sign = true;
		ax = -x;
	} else {
		sign = false;
		ax = x;
	}
	// |x| < 0.84375
	if ( ax < 0.84375 ) {
		if ( ax < SMALL ) {
			return 1.0 - x; // raise inexact
		}
		z = x * x;
		r = PPC + ( z*polyvalPP( z ) );
		s = QQC + ( z*polyvalQQ( z ) );
		y = r / s;

		// x < 1/4
		if ( x < 0.25 ) {
			return 1.0 - ( x + (x*y) );
		}
		r = x * y;
		r += x - 0.5;
		return 0.5 - r;
	}
	// 0.84375 <= |x| < 1.25
	if ( ax < 1.25 ) {
		s = ax - 1.0;
		p = PAC + ( s*polyvalPA( s ) );
		q = QAC + ( s*polyvalQA( s ) );
		if ( sign ) {
			return 1.0 + ERX + (p/q);
		}
		return 1.0 - ERX - (p/q);
	}
	// |x| < 28
	if ( ax < 28.0 ) {
		s = 1.0 / (ax*ax);

		// |x| < 1/0.35 ~ 2.857143
		if ( ax < 2.857142857142857 ) {
			r = RAC + ( s*polyvalRA( s ) );
			s = SAC + ( s*polyvalSA( s ) );
		}
		// |x| >= 1/0.35 ~ 2.857143
		else {
			// x < -6
			if ( x < -6.0 ) {
				return 2.0 - TINY; // raise inexact
			}
			r = RBC + ( s*polyvalRB( s ) );
			s = SBC + ( s*polyvalSB( s ) );
		}
		z = setLowWord( ax, 0 ); // pseudo-single (20-bit) precision x
		r = exp( -(z*z) - 0.5625 ) * exp( ((z-ax)*(z+ax)) + (r/s) );
		if ( sign ) {
			return 2.0 - (r/ax);
		}
		return r/ax;
	}
	if ( sign ) {
		return 2.0 - TINY; // raise inexact; ~2
	}
	return TINY * TINY; // raise inexact; ~0
}


// EXPORTS //

module.exports = erfc;

},{"./polyval_pa.js":59,"./polyval_pp.js":60,"./polyval_qa.js":61,"./polyval_qq.js":62,"./polyval_ra.js":63,"./polyval_rb.js":64,"./polyval_sa.js":65,"./polyval_sb.js":66,"@stdlib/constants/math/float64-ninf":32,"@stdlib/constants/math/float64-pinf":33,"@stdlib/math/base/assert/is-nan":40,"@stdlib/math/base/special/exp":69,"@stdlib/number/float64/base/set-low-word":89}],58:[function(require,module,exports){
'use strict';

/**
* Evaluate the complementary error function.
*
* @module @stdlib/math/base/special/erfc
*
* @example
* var erfc = require( '@stdlib/math/base/special/erfc' );
*
* var y = erfc( 2.0 );
* // returns ~0.0047
*
* y = erfc( -1.0 );
* // returns ~-1.8427
*
* y = erfc( 0.0 );
* // returns 1.0
*
* y = erfc( Infinity );
* // returns 0.0
*
* y = erfc( -Infinity );
* // returns 2.0
*
* y = erfc( NaN );
* // returns NaN
*/

// MODULES //

var erfc = require( './erfc.js' );


// EXPORTS //

module.exports = erfc;

},{"./erfc.js":57}],59:[function(require,module,exports){
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
		return 0.41485611868374833;
	}
	return 0.41485611868374833 + (x * (-0.3722078760357013 + (x * (0.31834661990116175 + (x * (-0.11089469428239668 + (x * (0.035478304325618236 + (x * -0.002166375594868791))))))))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

},{}],60:[function(require,module,exports){
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
		return -0.3250421072470015;
	}
	return -0.3250421072470015 + (x * (-0.02848174957559851 + (x * (-0.005770270296489442 + (x * -0.000023763016656650163))))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

},{}],61:[function(require,module,exports){
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
		return 0.10642088040084423;
	}
	return 0.10642088040084423 + (x * (0.540397917702171 + (x * (0.07182865441419627 + (x * (0.12617121980876164 + (x * (0.01363708391202905 + (x * 0.011984499846799107))))))))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

},{}],62:[function(require,module,exports){
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
		return 0.39791722395915535;
	}
	return 0.39791722395915535 + (x * (0.0650222499887673 + (x * (0.005081306281875766 + (x * (0.00013249473800432164 + (x * -0.000003960228278775368))))))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

},{}],63:[function(require,module,exports){
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
		return -0.6938585727071818;
	}
	return -0.6938585727071818 + (x * (-10.558626225323291 + (x * (-62.375332450326006 + (x * (-162.39666946257347 + (x * (-184.60509290671104 + (x * (-81.2874355063066 + (x * -9.814329344169145))))))))))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

},{}],64:[function(require,module,exports){
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
		return -0.799283237680523;
	}
	return -0.799283237680523 + (x * (-17.757954917754752 + (x * (-160.63638485582192 + (x * (-637.5664433683896 + (x * (-1025.0951316110772 + (x * -483.5191916086514))))))))); // eslint-disable-line max-len
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
		return 19.651271667439257;
	}
	return 19.651271667439257 + (x * (137.65775414351904 + (x * (434.56587747522923 + (x * (645.3872717332679 + (x * (429.00814002756783 + (x * (108.63500554177944 + (x * (6.570249770319282 + (x * -0.0604244152148581))))))))))))); // eslint-disable-line max-len
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
		return 30.33806074348246;
	}
	return 30.33806074348246 + (x * (325.7925129965739 + (x * (1536.729586084437 + (x * (3199.8582195085955 + (x * (2553.0504064331644 + (x * (474.52854120695537 + (x * -22.44095244658582))))))))))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

},{}],67:[function(require,module,exports){
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

},{"./expmulti.js":68,"@stdlib/constants/math/float64-ninf":32,"@stdlib/constants/math/float64-pinf":33,"@stdlib/math/base/assert/is-nan":40,"@stdlib/math/base/special/trunc":76}],68:[function(require,module,exports){
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

},{"./polyval_p.js":70,"@stdlib/math/base/special/ldexp":73}],69:[function(require,module,exports){
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

},{"./exp.js":67}],70:[function(require,module,exports){
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

},{}],72:[function(require,module,exports){
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

},{"./floor.js":71}],73:[function(require,module,exports){
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

},{"./ldexp.js":74}],74:[function(require,module,exports){
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

},{"@stdlib/constants/math/float64-exponent-bias":27,"@stdlib/constants/math/float64-max-base2-exponent":30,"@stdlib/constants/math/float64-max-base2-exponent-subnormal":29,"@stdlib/constants/math/float64-min-base2-exponent-subnormal":31,"@stdlib/constants/math/float64-ninf":32,"@stdlib/constants/math/float64-pinf":33,"@stdlib/math/base/assert/is-infinite":38,"@stdlib/math/base/assert/is-nan":40,"@stdlib/math/base/special/copysign":56,"@stdlib/number/float64/base/exponent":78,"@stdlib/number/float64/base/from-words":80,"@stdlib/number/float64/base/normalize":86,"@stdlib/number/float64/base/to-words":92}],75:[function(require,module,exports){
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

},{}],76:[function(require,module,exports){
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

},{"./trunc.js":77}],77:[function(require,module,exports){
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

},{"@stdlib/math/base/special/ceil":54,"@stdlib/math/base/special/floor":72}],78:[function(require,module,exports){
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

},{"@stdlib/constants/math/float64-smallest-normal":34,"@stdlib/math/base/assert/is-infinite":38,"@stdlib/math/base/assert/is-nan":40,"@stdlib/math/base/special/abs":52}],89:[function(require,module,exports){
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

},{"./main.js":91}],90:[function(require,module,exports){
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

},{"@stdlib/assert/is-little-endian":18}],91:[function(require,module,exports){
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

},{"./low.js":90,"@stdlib/array/float64":2,"@stdlib/array/uint32":7}],92:[function(require,module,exports){
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

},{"./main.js":94}],93:[function(require,module,exports){
arguments[4][81][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":18,"dup":81}],94:[function(require,module,exports){
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

},{"./to_words.js":95}],95:[function(require,module,exports){
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

},{"./indices.js":93,"@stdlib/array/float64":2,"@stdlib/array/uint32":7}],96:[function(require,module,exports){
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

},{}],97:[function(require,module,exports){
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

},{"./constant_function.js":96}],98:[function(require,module,exports){
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

},{}],99:[function(require,module,exports){
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

},{"./define_read_only_property.js":98}],100:[function(require,module,exports){
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

},{"./float64array.js":101,"@stdlib/assert/is-float64array":15}],101:[function(require,module,exports){
'use strict';

// EXPORTS //

module.exports = ( typeof Float64Array === 'function' ) ? Float64Array : null;

},{}],102:[function(require,module,exports){
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

},{"./detect_float64array_support.js":100}],103:[function(require,module,exports){
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

},{}],104:[function(require,module,exports){
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

},{"./detect_symbol_support.js":103}],105:[function(require,module,exports){
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

},{"@stdlib/utils/detect-symbol-support":104}],106:[function(require,module,exports){
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

},{"./has_tostringtag_support.js":105}],107:[function(require,module,exports){
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

},{"./uint16array.js":109,"@stdlib/assert/is-uint16array":20,"@stdlib/constants/math/uint16-max":35}],108:[function(require,module,exports){
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

},{"./detect_uint16array_support.js":107}],109:[function(require,module,exports){
'use strict';

// EXPORTS //

module.exports = ( typeof Uint16Array === 'function' ) ? Uint16Array : null;

},{}],110:[function(require,module,exports){
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

},{"./uint32array.js":112,"@stdlib/assert/is-uint32array":22,"@stdlib/constants/math/uint32-max":36}],111:[function(require,module,exports){
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

},{"./detect_uint32array_support.js":110}],112:[function(require,module,exports){
'use strict';

// EXPORTS //

module.exports = ( typeof Uint32Array === 'function' ) ? Uint32Array : null;

},{}],113:[function(require,module,exports){
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

},{"./uint8array.js":115,"@stdlib/assert/is-uint8array":24,"@stdlib/constants/math/uint8-max":37}],114:[function(require,module,exports){
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

},{"./detect_uint8array_support.js":113}],115:[function(require,module,exports){
'use strict';

// EXPORTS //

module.exports = ( typeof Uint8Array === 'function' ) ? Uint8Array : null;

},{}],116:[function(require,module,exports){
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

},{"./native_class.js":117,"./polyfill.js":118,"@stdlib/utils/detect-tostringtag-support":106}],117:[function(require,module,exports){
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

},{"./tostring.js":119}],118:[function(require,module,exports){
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

},{"./tostring.js":119,"./tostringtag.js":120,"@stdlib/assert/has-own-property":14}],119:[function(require,module,exports){
'use strict';

// MAIN //

var toStr = Object.prototype.toString;


// EXPORTS //

module.exports = toStr;

},{}],120:[function(require,module,exports){
'use strict';

// MAIN //

var toStrTag = ( typeof Symbol === 'function' ) ? Symbol.toStringTag : '';


// EXPORTS //

module.exports = toStrTag;

},{}],121:[function(require,module,exports){
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

},{}],122:[function(require,module,exports){

},{}],123:[function(require,module,exports){
arguments[4][122][0].apply(exports,arguments)
},{"dup":122}],124:[function(require,module,exports){
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

},{}],125:[function(require,module,exports){
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

},{"base64-js":121,"ieee754":144}],126:[function(require,module,exports){
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
},{"../../is-buffer/index.js":146}],127:[function(require,module,exports){
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

},{"./lib/is_arguments.js":128,"./lib/keys.js":129}],128:[function(require,module,exports){
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

},{}],129:[function(require,module,exports){
exports = module.exports = typeof Object.keys === 'function'
  ? Object.keys : shim;

exports.shim = shim;
function shim (obj) {
  var keys = [];
  for (var key in obj) keys.push(key);
  return keys;
}

},{}],130:[function(require,module,exports){
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

},{"foreach":140,"object-keys":150}],131:[function(require,module,exports){
module.exports = function () {
    for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] !== undefined) return arguments[i];
    }
};

},{}],132:[function(require,module,exports){
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

},{"./helpers/isFinite":133,"./helpers/isNaN":134,"./helpers/mod":135,"./helpers/sign":136,"es-to-primitive/es5":137,"has":143,"is-callable":147}],133:[function(require,module,exports){
var $isNaN = Number.isNaN || function (a) { return a !== a; };

module.exports = Number.isFinite || function (x) { return typeof x === 'number' && !$isNaN(x) && x !== Infinity && x !== -Infinity; };

},{}],134:[function(require,module,exports){
module.exports = Number.isNaN || function isNaN(a) {
	return a !== a;
};

},{}],135:[function(require,module,exports){
module.exports = function mod(number, modulo) {
	var remain = number % modulo;
	return Math.floor(remain >= 0 ? remain : remain + modulo);
};

},{}],136:[function(require,module,exports){
module.exports = function sign(number) {
	return number >= 0 ? 1 : -1;
};

},{}],137:[function(require,module,exports){
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

},{"./helpers/isPrimitive":138,"is-callable":147}],138:[function(require,module,exports){
module.exports = function isPrimitive(value) {
	return value === null || (typeof value !== 'function' && typeof value !== 'object');
};

},{}],139:[function(require,module,exports){
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

},{}],140:[function(require,module,exports){

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


},{}],141:[function(require,module,exports){
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

},{}],142:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

module.exports = Function.prototype.bind || implementation;

},{"./implementation":141}],143:[function(require,module,exports){
var bind = require('function-bind');

module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);

},{"function-bind":142}],144:[function(require,module,exports){
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

},{}],145:[function(require,module,exports){
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

},{}],146:[function(require,module,exports){
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

},{}],147:[function(require,module,exports){
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

},{}],148:[function(require,module,exports){
var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};

},{}],149:[function(require,module,exports){
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

},{}],150:[function(require,module,exports){
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

},{"./isArguments":151}],151:[function(require,module,exports){
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

},{}],152:[function(require,module,exports){
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
},{"_process":124}],153:[function(require,module,exports){
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
},{"_process":124}],154:[function(require,module,exports){
module.exports = require('./lib/_stream_duplex.js');

},{"./lib/_stream_duplex.js":155}],155:[function(require,module,exports){
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
},{"./_stream_readable":157,"./_stream_writable":159,"core-util-is":126,"inherits":145,"process-nextick-args":153}],156:[function(require,module,exports){
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
},{"./_stream_transform":158,"core-util-is":126,"inherits":145}],157:[function(require,module,exports){
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
},{"./_stream_duplex":155,"./internal/streams/BufferList":160,"./internal/streams/destroy":161,"./internal/streams/stream":162,"_process":124,"core-util-is":126,"events":139,"inherits":145,"isarray":148,"process-nextick-args":153,"safe-buffer":168,"string_decoder/":174,"util":122}],158:[function(require,module,exports){
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
},{"./_stream_duplex":155,"core-util-is":126,"inherits":145}],159:[function(require,module,exports){
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
},{"./_stream_duplex":155,"./internal/streams/destroy":161,"./internal/streams/stream":162,"_process":124,"core-util-is":126,"inherits":145,"process-nextick-args":153,"safe-buffer":168,"util-deprecate":181}],160:[function(require,module,exports){
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
},{"safe-buffer":168}],161:[function(require,module,exports){
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
},{"process-nextick-args":153}],162:[function(require,module,exports){
module.exports = require('events').EventEmitter;

},{"events":139}],163:[function(require,module,exports){
module.exports = require('./readable').PassThrough

},{"./readable":164}],164:[function(require,module,exports){
exports = module.exports = require('./lib/_stream_readable.js');
exports.Stream = exports;
exports.Readable = exports;
exports.Writable = require('./lib/_stream_writable.js');
exports.Duplex = require('./lib/_stream_duplex.js');
exports.Transform = require('./lib/_stream_transform.js');
exports.PassThrough = require('./lib/_stream_passthrough.js');

},{"./lib/_stream_duplex.js":155,"./lib/_stream_passthrough.js":156,"./lib/_stream_readable.js":157,"./lib/_stream_transform.js":158,"./lib/_stream_writable.js":159}],165:[function(require,module,exports){
module.exports = require('./readable').Transform

},{"./readable":164}],166:[function(require,module,exports){
module.exports = require('./lib/_stream_writable.js');

},{"./lib/_stream_writable.js":159}],167:[function(require,module,exports){
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
},{"_process":124,"through":180}],168:[function(require,module,exports){
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

},{"buffer":125}],169:[function(require,module,exports){
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

},{"events":139,"inherits":145,"readable-stream/duplex.js":154,"readable-stream/passthrough.js":163,"readable-stream/readable.js":164,"readable-stream/transform.js":165,"readable-stream/writable.js":166}],170:[function(require,module,exports){
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

},{"es-abstract/es5":132,"function-bind":142}],171:[function(require,module,exports){
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

},{"./implementation":170,"./polyfill":172,"./shim":173,"define-properties":130,"function-bind":142}],172:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

var zeroWidthSpace = '\u200b';

module.exports = function getPolyfill() {
	if (String.prototype.trim && zeroWidthSpace.trim() === zeroWidthSpace) {
		return String.prototype.trim;
	}
	return implementation;
};

},{"./implementation":170}],173:[function(require,module,exports){
'use strict';

var define = require('define-properties');
var getPolyfill = require('./polyfill');

module.exports = function shimStringTrim() {
	var polyfill = getPolyfill();
	define(String.prototype, { trim: polyfill }, { trim: function () { return String.prototype.trim !== polyfill; } });
	return polyfill;
};

},{"./polyfill":172,"define-properties":130}],174:[function(require,module,exports){
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
},{"safe-buffer":168}],175:[function(require,module,exports){
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
},{"./lib/default_stream":176,"./lib/results":178,"./lib/test":179,"_process":124,"defined":131,"through":180}],176:[function(require,module,exports){
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
},{"_process":124,"fs":123,"through":180}],177:[function(require,module,exports){
(function (process){
module.exports = typeof setImmediate !== 'undefined'
    ? setImmediate
    : process.nextTick
;

}).call(this,require('_process'))
},{"_process":124}],178:[function(require,module,exports){
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
},{"_process":124,"events":139,"function-bind":142,"has":143,"inherits":145,"object-inspect":149,"resumer":167,"through":180}],179:[function(require,module,exports){
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
},{"./next_tick":177,"deep-equal":127,"defined":131,"events":139,"has":143,"inherits":145,"path":152,"string.prototype.trim":171}],180:[function(require,module,exports){
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
},{"_process":124,"stream":169}],181:[function(require,module,exports){
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
},{}]},{},[48,49,50]);
