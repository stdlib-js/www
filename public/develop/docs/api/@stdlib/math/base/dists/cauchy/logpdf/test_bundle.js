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
* Natural logarithm of the mathematical constant `π`.
*
* @module @stdlib/constants/math/float64-ln-pi
* @type {number}
*
* @example
* var LN_PI = require( '@stdlib/constants/math/float64-ln-pi' );
* // returns 1.1447298858494002
*/


// MAIN //

/**
* Natural logarithm of the mathematical constant `π`.
*
* @constant
* @type {number}
* @default 1.1447298858494002
* @see [Wikipedia]{@link https://en.wikipedia.org/wiki/Pi}
*/
var LN_PI = 1.1447298858494002;


// EXPORTS //

module.exports = LN_PI;

},{}],30:[function(require,module,exports){
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

},{}],31:[function(require,module,exports){
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

},{}],32:[function(require,module,exports){
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

},{}],33:[function(require,module,exports){
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

},{}],34:[function(require,module,exports){
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

},{}],35:[function(require,module,exports){
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

},{}],36:[function(require,module,exports){
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

},{}],37:[function(require,module,exports){
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

},{}],38:[function(require,module,exports){
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

},{}],39:[function(require,module,exports){
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

},{}],40:[function(require,module,exports){
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

},{"./is_even.js":41}],41:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-integer":44}],42:[function(require,module,exports){
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

},{"./is_infinite.js":43}],43:[function(require,module,exports){
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

},{"@stdlib/constants/math/float64-ninf":34,"@stdlib/constants/math/float64-pinf":35}],44:[function(require,module,exports){
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

},{"./is_integer.js":45}],45:[function(require,module,exports){
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

},{"@stdlib/math/base/special/floor":64}],46:[function(require,module,exports){
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

},{"./is_nan.js":47}],47:[function(require,module,exports){
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

},{}],48:[function(require,module,exports){
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

},{"./is_odd.js":49}],49:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-even":40}],50:[function(require,module,exports){
'use strict';

// MODULES //

var constantFunction = require( '@stdlib/utils/constant-function' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var log1p = require( '@stdlib/math/base/special/log1p' );
var pow = require( '@stdlib/math/base/special/pow' );
var ln = require( '@stdlib/math/base/special/ln' );
var LNPI = require( '@stdlib/constants/math/float64-ln-pi' );


// MAIN //

/**
* Returns a function for evaluating the natural logarithm of the probability density function (logPDF) for a Cauchy distribution with location parameter `x0` and scale parameter `gamma`.
*
* @param {number} x0 - location parameter
* @param {PositiveNumber} gamma - scale parameter
* @returns {Function} logPDF
*
* @example
* var logpdf = factory( 4.0, 2.0 );
*
* var y = logpdf( 10.0 );
* // returns ~-4.141
*
* y = logpdf( 3.0 );
* // returns ~-2.064
*/
function factory( x0, gamma ) {
	if (
		isnan( gamma ) ||
		isnan( x0 ) ||
		gamma <= 0.0
	) {
		return constantFunction( NaN );
	}
	return logpdf;

	/**
	* Evaluates the natural logarithm of the probability density function (logPDF) for a Cauchy distribution.
	*
	* @private
	* @param {number} x - input value
	* @returns {number} evaluated logPDF
	*
	* @example
	* var y = logpdf( 2.3 );
	* // returns <number>
	*/
	function logpdf( x ) {
		if ( isnan( x ) ) {
			return NaN;
		}
		return -( LNPI + ln( gamma ) + log1p( pow( (x-x0)/gamma, 2.0 ) ) );
	}
}


// EXPORTS //

module.exports = factory;

},{"@stdlib/constants/math/float64-ln-pi":29,"@stdlib/math/base/assert/is-nan":46,"@stdlib/math/base/special/ln":67,"@stdlib/math/base/special/log1p":71,"@stdlib/math/base/special/pow":74,"@stdlib/utils/constant-function":110}],51:[function(require,module,exports){
'use strict';

/**
* Cauchy distribution logarithm of probability density function (logPDF).
*
* @module @stdlib/math/base/dists/cauchy/logpdf
*
* @example
* var logpdf = require( '@stdlib/math/base/dists/cauchy/logpdf' );
*
* var y = logpdf( 2.0, 0.0, 1.0 );
* // returns ~-2.765
*
* @example
* var factory = require( '@stdlib/math/base/dists/cauchy/logpdf' ).factory;
*
* var logpdf = factory( 10.0, 2.0 );
*
* var y = logpdf( 10.0 );
* // returns ~-1.839
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-read-only-property' );
var logpdf = require( './logpdf.js' );
var factory = require( './factory.js' );


// MAIN //

setReadOnly( logpdf, 'factory', factory );


// EXPORTS //

module.exports = logpdf;

},{"./factory.js":50,"./logpdf.js":52,"@stdlib/utils/define-read-only-property":112}],52:[function(require,module,exports){
'use strict';

// MODULES //

var isnan = require( '@stdlib/math/base/assert/is-nan' );
var log1p = require( '@stdlib/math/base/special/log1p' );
var pow = require( '@stdlib/math/base/special/pow' );
var ln = require( '@stdlib/math/base/special/ln' );
var LNPI = require( '@stdlib/constants/math/float64-ln-pi' );


// MAIN //

/**
* Evaluates the natural logarithm of the probability density function (logPDF) for a Cauchy distribution with location parameter `x0` and scale parameter `gamma` at a value `x`.
*
* @param {number} x - input value
* @param {number} x0 - location parameter
* @param {PositiveNumber} gamma - scale parameter
* @returns {number} evaluated logPDF
*
* @example
* var y = logpdf( 2.0, 1.0, 1.0 )
* // returns ~-1.839
*
* @example
* var y = logpdf( 4.0, 3.0, 0.1 )
* // returns ~-3.458
*
* @example
* var y = logpdf( 4.0, 3.0, 3.0 )
* // returns ~-2.354
*
* @example
* var y = logpdf( NaN, 1.0, 1.0 )
* // returns NaN
*
* @example
* var y = logpdf( 2.0, NaN, 1.0 )
* // returns NaN
*
* @example
* var y = logpdf( 2.0, 1.0, NaN )
* // returns NaN
*
* @example
* // Negative scale parameter:
* var y = logpdf( 2.0, 1.0, -2.0 )
* // returns NaN
*/
function logpdf( x, x0, gamma ) {
	if (
		isnan( x ) ||
		isnan( gamma ) ||
		isnan( x0 ) ||
		gamma <= 0.0
	) {
		return NaN;
	}
	return -( LNPI + ln( gamma ) + log1p( pow( (x-x0)/gamma, 2.0 ) ) );
}


// EXPORTS //

module.exports = logpdf;

},{"@stdlib/constants/math/float64-ln-pi":29,"@stdlib/math/base/assert/is-nan":46,"@stdlib/math/base/special/ln":67,"@stdlib/math/base/special/log1p":71,"@stdlib/math/base/special/pow":74}],53:[function(require,module,exports){
module.exports={"expected":[-4.184338225480311,-4.819926198982851,-4.481555533572589,-1.8288874925115466,-4.739145775128443,-3.923948496890544,-4.261804634104969,-3.5576941561911086,-4.718132725998832,-5.04268273000107,-4.055798293456282,-4.062703968200828,-3.3461680474844107,-4.2869607452371365,-4.444821383721447,-4.527346283379668,-4.029797753563632,-4.571308367112915,-4.398837661637632,-4.892790518268399,-4.635516239375697,-5.052812516671991,-4.667813760525369,-2.384629278576833,-4.978928866412058,-3.739504767175905,-3.536565151280756,-4.958776841504546,-3.137983708951121,-2.445960483341529,-3.9256377252261934,-4.440623778471474,-4.83197280855325,-4.397382030784705,-4.912393758998968,-4.130771016112972,-3.1271961541764743,-4.95410945463176,-4.897479207972067,-4.958141513924597,-4.760149699229474,-3.9017472804459707,-3.492559633462297,-2.589795102754869,-3.0303624177679716,-4.366637612693945,-3.5291467116451956,-4.9961348528285985,-3.0761332120712197,-5.022778378019552,-4.638105112065919,-2.239654731722866,-4.325525417390102,-4.101347891507223,-4.01005082592736,-3.8188502414728447,-4.076330575534466,-3.76050267639628,-4.712613669418958,-5.043232680598091,-4.6117440280529145,-2.664411184219018,-4.206734664888557,-3.7804860858069453,-3.970072128047197,-4.949562275304165,-5.023716185568764,-4.977010654002477,-5.029494555019909,-1.9440641679584494,-3.6028384278378898,-4.862206745792195,-5.015215160024441,-2.043928880795822,-3.08835361983793,-4.836491304467113,-4.857066626404384,-3.6926256961434207,-4.498123645453233,-4.997440438210934,-4.892809916030118,-4.98782358937466,0.0240721534768642,-2.818403798047889,-4.661355820677926,-2.6160762986442476,-4.482202216739492,-3.690848266587036,-4.25769932584205,-4.9038082466387864,-4.913535830320556,-4.4280742259952115,-4.4808100759792255,-4.693474538983191,-2.387137553042866,-3.8672194564934257,-3.7092230722086916,-4.8146801775442345,-4.496676560183642,-4.92173664987985,-4.483926815375335,-3.5911508084960166,-3.313455125665164,-4.7154739431865895,-4.931251272405391,-4.806768165232384,-4.620745116627891,-4.96659750498116,-4.3621564809010085,-4.785249437445971,-4.7485472816531225,-4.994643379939017,-3.911256300366034,-4.152600100255717,-2.375961036572666,-4.7209263751468935,-4.894309180990578,-4.2792770286053265,-4.875143344090871,-2.750682320957527,-4.710311802713047,-4.662417837418726,-3.5632598135611615,-4.541757210706662,-3.193947987141203,-2.703297298662236,-5.028255569305113,-4.121347149867392,-3.653795409220491,-3.501560051044962,-4.474975686794289,-4.876919576040031,-3.7975669289118477,-4.138132439902377,-4.808544820217424,-4.821461440830885,-3.905858688059501,-3.153182544222757,-3.612930008104548,-3.144766285695601,-4.92646889116854,-4.944244296086513,-4.831381278971791,-4.81749633642208,-4.883178838132762,-2.1107324335688094,-4.988935996023889,-4.580710426854693,-4.017041321430331,-4.4743491062635155,-5.04169949897651,-3.4125348880623685,-3.677788953585183,-4.862388134317533,-4.4191837217683165,-3.9731695747640696,-3.9326058342445513,-3.6238608253731623,-4.395214992982812,-3.7582219521974123,-4.943658738807715,-4.92626591330694,-4.852678352544292,-4.11640377554359,-4.684039717932562,-4.1871264909530534,-3.5967521320787883,-4.699715673864074,-4.669299110603127,-4.283903542207709,-4.125436533547376,-4.96927605969489,-4.573090043181526,-4.5705443930384515,-5.018548588067894,-4.5528053806950375,-4.996676721821632,-0.9530987341774451,-4.539358009198703,-4.885696544670658,-3.9100894969042823,-3.1334731629339108,-4.860838565140539,-2.029758358580348,-4.844600931451753,-4.164759159829453,-4.875074865858263,-3.2739566542150706,-4.588618552440757,-4.575389572214038,-4.711954263114464,-4.960567179609145,-4.900087232360438,-4.105420453948669,-4.564075612737181,-4.50776951527569,-3.9484156304066755,-3.68082069264956,-3.1856479842588703,-3.6418225630987218,-5.030809774803215,-4.780782764444503,-3.137861692888124,-3.2569032338774138,-4.478545781214373,-4.826567442439879,-4.738647668073076,-4.872983711028093,-3.7461460769639605,-2.999355062056101,-4.935896132597511,-3.2402802939706152,-2.6526867454768546,-4.254919244452067,-4.8175597561562675,-4.451378059990495,-4.961794566860274,-4.7179922975829,-4.86140121095792,-4.882174259757961,-4.9382441816245,-4.91303207594715,-4.353325787776173,-4.878951152491506,-4.55124261394276,-4.667408718048114,-3.5068592158772542,-4.481494756854189,-2.99748108675643,-4.629111140303534,-5.005068499431715,-4.618588529702586,-2.6757873975108373,-4.694928603272123,-4.515670482113269,-4.241332829626692,-4.6264008021753416,-3.935733709626547,-4.099831407684849,-4.173373790051019,-4.303770023213336,-4.364912697362248,-4.56409759896141,-5.0332908327260855,-4.733159862134203,-4.56627673262227,-4.993428368971625,-4.963693521264438,-4.662507439096906,-4.315509881841026,-4.145474125518989,-4.754022389511796,-4.566698534687548,-4.5561890880530544,-3.9688128991222493,-4.647336599720187,-2.666927318000142,-4.799449324619696,-4.896215707167473,-4.8201161826059735,-5.012431584124776,-4.3510152790090775,-4.9733714766016375,0.06749611367196429,-4.541749354760434,-2.5374794125188513,-4.607720106883431,-4.188281870314988,-4.780526340438506,-4.929563707534141,-4.402807319038105,-4.695466586046147,-4.710436011620724,-4.097615799196253,-4.515393816563311,-3.8572998109632843,-4.611061923984417,-4.927990588523405,-4.752369520942788,-4.4915567949306485,-4.204285737476611,-4.118893489760467,-4.746959786880978,-3.864411304262518,-4.68515200475112,-3.357794781593289,-3.926780791925336,-4.112482355553543,-3.9148034549102304,-3.3969590800651073,-5.039548048459813,-3.5961092851982914,-4.6530916432314475,-3.9329858796502952,-4.00129155970448,-3.675148350923232,-4.036986452814833,-3.1258474554875564,-4.90810422146652,-4.564466385487176,-4.825892869254304,-4.534373611723895,-3.045319493187575,-4.335591838155257,-3.204304495044254,-4.98629932220285,-4.177444583697647,-4.4397675210638345,-4.445203544722809,-4.376262260216258,-3.7361987189051886,-4.427368184791188,-3.485787716721622,-4.247354375997947,-1.8652945384663333,-4.200119742513476,-4.097960206502465,-4.406606673765732,-4.530653012320642,-2.6293256648892784,-4.551187063398897,-4.0635240558875,-4.810826356547489,-4.916959031226239,-4.965457473945023,-4.419229404380112,-4.212374043595672,-4.6086251480361415,-2.738265865568372,-2.5920323724717607,-4.675975322968879,-2.243738235406612,-3.6304062366909062,-4.196180259076685,-5.03301218371838,-4.21146087882304,-3.294165301775636,-4.629821497160325,-3.7975613700715654,-4.593996711689183,-4.905416297790856,-4.292277623964564,-4.1549388096962785,-4.872807967273873,-4.864097061695409,-4.033781132859222,-3.359139558403243,-4.4908228842601705,-2.9140633623392627,-4.356909152301238,-3.680875758248156,-4.437857286829684,-3.3506254756811282,-2.659216612463272,-4.546066871641272,-4.79328427479982,-4.719228045167262,-4.246355218715973,-1.349151117538665,-4.901614237892178,-4.90542676441632,-3.4825598880997912,-3.8657744229384523,-4.735995955927606,-1.7053157875662697,-4.06832557632663,-5.041764359578397,-3.6750868924832245,-4.94793234031168,-4.787310012228009,-3.2527865111601106,-4.101877550660973,-3.7096431884772723,-4.395042898390944,-4.505476998314332,-1.9490840399212708,-4.6712205198982195,-5.0263352560758845,-4.660980546742188,-4.537436612241693,-3.096768984485043,-2.48852698152351,-4.869303244083069,-4.148740125054054,-4.269103745992676,-3.781841369374212,-4.3152335388685215,-3.143170615766186,-4.904156515486049,-3.765803602372782,-4.159260677488864,-4.855204132173017,-4.5964560988543255,-3.43294061298222,-4.738204173365055,-4.241783284674137,-4.370566887186188,-4.433128743736415,-4.474264040243197,-4.6885522239541215,-2.450419318543174,-5.013928682553059,-5.012124027228737,-4.897524219963605,-4.850408290319807,-4.466603425262858,-4.79439407067117,-4.080549193376982,-4.745155322431216,-4.582592224423808,-4.456873004879737,-4.799747361668167,-4.56806671420964,-4.668662134934541,-3.947980870427882,-2.1120954935620366,-4.450496041081834,-4.801998661512304,-4.208224959254163,-4.337685426955807,-4.076463201710504,-4.408509897132032,-4.153346339901518,-4.0014820955150245,-4.753351543394974,-3.4709654937039414,-4.602235077817595,-1.9394834079063954,-4.444160252213177,-4.914776945906063,-4.393303000356392,-3.060161721996346,-4.434094623196114,-4.477917412261291,-4.54859859703889,-4.914156821620001,-2.892629117188415,-3.5974614562055756,-4.265855374326257,-4.474923601973813,-4.9832395240263985,-4.501362965966528,-4.856941354582268,-4.846089507313085,-4.458082658368835,-4.367985913413417,-4.4999198401261715,-2.9481040265395384,-4.898304767206664,-2.718773797508221,-2.0734483912816106,-4.306252405164731,-3.888140896387579,-5.0497598482221235,-4.345001907829046,-4.013691555010061,-4.472209503268514,-4.22208734665104,-4.6622652293045945,-4.75809518376204,-5.033997809377437,-4.3164826606374636,-4.867574035622336,-2.292592020003541,-4.6319749335593094,-2.6407436042764223,-4.632549656379067,-4.690777348999184,-4.148447831066919,-4.883961331289145,-4.03452764175309,-4.7585972416821205,-4.113859279517257,-4.620555013202559,-4.952521669529374,-2.9586370945324374,-2.1742938100444666,-4.522333664472335,-4.891123561270829,-4.5946807261281135,-3.967058139811896,-2.8350510731043883,-3.244851435528353,-4.929620156431222,-4.984217378368456,-3.5446961723492807,-4.642689451493395,-4.036504479028325,-2.1258127154975575,-3.8225346742000363,-2.4165420598070018,-4.967527600035773,-4.737234846615579,-4.114705050474568,-2.3185997920259815,-4.094560249245296,-2.003347996967313,-3.604972134635251,-4.501857696149621,-2.2434004326175243,-4.957699044881363,-4.202460232619666,-4.505802297011287,-4.840073783674047,-4.809255096953638,-3.6437175124052423,-4.428915318087899,-4.649740633227516,-4.1977809544583735,-4.656159435521605,-4.3291547503985,-4.891639468387501,-3.4684583726661256,-4.949181034047804,-3.3294493456377063,-2.4874941989637644,-3.978283357075542,-4.286964749452307,-4.625534428053466,-4.582110785036481,-3.809145114464803,-4.487618223301852,-3.2441821013763787,-4.630932633660946,-4.707558941416707,-3.3361442853116063,-4.833410482871549,-4.881508220408206,-4.735898464710441,-4.668131485686413,-1.844245571118451,-4.151698796965271,-4.933432773545206,-4.452756359702969,-3.2618398839919838,-1.909436034466324,-3.787068052332388,-3.680486490108809,-4.228342214950298,-4.570043180547019,-3.4349218970392323,-4.601708179268133,-5.0392484359130005,-4.637586419053667,-5.016964441036745,-2.482031718653869,-4.622119180158533,-2.424022147710872,-3.913799073901661,-4.557819086556789,-3.6799365341025667,-4.850228936495062,-4.918201773465149,-3.182095214477863,-4.718314127524495,-5.04854519702023,-3.763049277939567,-2.6099282136914157,-4.891474501336524,-4.709332854704689,-4.031233640231047,-2.9892971666809016,-4.5482452293544995,-3.758012235764305,-4.244779464406587,-2.3165540578952606,-2.0295386530428683,-4.714800610774582,-3.17657814316195,-4.196174863442927,-4.935961752641325,-4.523811531790508,-2.2821846454265313,-4.5902658625822745,-4.097489850462427,-4.337317442632472,-3.8385899322931443,-3.717504633070531,-4.717685117754917,-4.84832095407586,-4.958285858470361,-4.301121347222138,-4.193699421846792,-4.1695858973022,-2.7829315190765795,-4.230179916112249,-4.609404035814931,-3.932828228458634,-4.575246657686889,-3.347755378278343,-3.6247471963401567,-3.378059619547461,-4.7265804040938315,-3.7962658550816744,-4.929238688839758,-4.8750831525750895,-4.054641417373922,-4.7309129844854425,-4.85944763460435,-4.575425605380496,-4.850711651113934,-4.791804101506004,-4.108785139752811,-4.258427047700463,-3.9088992090839962,-4.213312689668736,-4.934086672234009,-4.898503683229993,-2.026155264200659,-3.925708709895752,-3.1647474768277792,-3.286123007894446,-3.789134134862885,-4.864724187980469,-4.123248951638692,-4.862610490301467,-3.0434495600510463,-4.997185133612319,-4.543672926304084,-4.970406895943814,-4.79682839361286,-3.2549549338441905,-4.863282444306815,-3.7324952274610323,-3.707197695022092,-4.947389057090302,-4.608145679361196,-4.033318846044857,-4.46799445243874,-3.3383493401239934,-4.387897469138009,-4.854987978658458,-2.9031134796728315,-4.101043080080538,-4.713692094387968,-2.949227650399647,-4.330928275200229,-3.562818543325281,-4.83504691028898,-4.6184865979319705,-2.747303558068373,-3.9084753015051206,-4.372108923756598,-3.2786542735806323,-1.3621437559349014,-3.9423636970842555,-4.966086178567121,-3.6885032462673095,-4.831191191191079,-1.7855582209883991,-4.84742791035422,-3.941806819642907,-4.9034374272985195,-4.987556305136303,-4.1138988286253575,-4.799503379575631,-4.465463495600995,-3.9922678909406324,-3.386273707983551,-4.780194723260266,-4.070362841045512,-4.172103597005822,-3.493232156160264,-4.183506911652159,-4.967679321903946,-4.539315060612251,-3.715154485395895,-4.387861433132505,-4.988158992351998,-4.28573587446048,-4.01773870904246,-5.034697218468212,-3.518525778230804,-4.179522706467101,-3.0277371460081017,-2.2531937230798413,-4.956970030539681,-1.0059419558298404,-4.938048143018658,-5.013992349540481,-3.3930784330137045,-4.852340371067344,-4.280559165938332,-4.66073919357194,-4.388974284383765,-3.110849547348936,-1.8594618994749568,-2.8239701795139047,-4.42795852069929,-4.613676233580085,-4.411943126553773,-4.426950060684476,-4.584971751755424,-3.846495426555707,-3.90684551567169,-4.52898829850458,-4.861567520840509,-4.31270243596616,-4.01427652523403,-4.716377729254324,-4.552049784502512,-3.8885427916908384,-3.415548871015946,-4.981908663992749,-3.123105257812526,-3.5793331050384096,-4.997724502436607,-4.962724099108001,-3.376098916858548,-4.732523900596522,-3.9403927005030956,-4.816316802867442,-3.232525474900581,-1.0672771776122234,-4.259003043518599,-4.785081489507205,-3.2012355117129996,-4.155498441806895,-3.894354664520918,-4.5277171351870225,-4.271137174279586,-4.8660802954802715,-3.503839338355406,-4.705555169962376,-4.258035816279802,-3.984315218127346,-5.0321191504962925,-4.838173413372671,-2.642618824022072,-3.58907992808947,-4.071759358095366,-1.5520932236851452,-3.069792619110303,-2.8637725491456063,-4.256771454685709,-4.892669616484548,-2.800768174019536,-3.1855327548237455,-4.566114627575356,-4.7619432712551415,-4.104999798145841,-2.7207364842051205,-4.631445410340989,-4.751217826095903,-4.983862959310297,-2.7913414203795006,-4.243880525188702,-3.1297021998297914,-3.6468399737731847,-3.4866503008845617,-4.942334068777869,-4.835185142933156,-1.7840723840061883,-4.669338363644897,-2.714686076144721,-4.026635361278508,-4.528260083311251,-4.315039966720608,-4.53932737544663,-4.668352602568058,-4.678135289565283,-4.198387211871683,-3.7031698198738714,-4.31588613699696,-4.02306240650445,-2.7190796935608086,-5.049075067301528,-4.127535654422372,-3.438952665039163,-3.898724214592221,-4.718314360037837,-5.021398776481063,-4.171099058749035,-4.698808004572532,-4.243203395218833,-5.049505066968341,-4.881049061538635,-4.4517579996776915,-4.778461785717672,-4.714877516462061,-4.760531879453652,-4.1807912103724,-3.146518246506409,-3.778775212829678,-3.587091777033995,-2.1695320069853863,-3.8347420337272,-4.620813768496346,-3.7604919514605744,-4.519955936241617,-1.8200481919301257,-3.735284021680332,-3.7405892253104325,-4.898907567296186,-3.4942767261784446,-4.55742639555631,-4.540439565286295,-5.015374877900093,-4.5944145299766195,-4.7317342182093585,-4.748793140883434,-4.132460106856788,-4.86701619448613,-2.4218430715384587,-3.8070026623555675,-4.094227004012589,-3.8246753850861817,-4.4496213858456315,-4.854365507637857,-4.58235805415222,-4.925983309439729,-3.855898398372871,-4.865901761508223,-4.221039160181297,-4.164602959279658,-5.053847821732782,-4.912181093435009,-3.4999910611522083,-4.675654641241605,-3.838101391027233,-4.850970280052169,-2.670008617092077,-3.8959744993823433,-3.7487682507425477,-4.01442642688137,-2.976387761945806,-4.681991066262382,-3.804155595680325,-4.075657966279463,-4.702144391096765,-4.508183960797882,-4.990280524259009,-4.365587022371421,-4.910502781854782,-3.5317068868180783,-3.4909622006497836,-4.279854876654445,-4.845924305387939,-4.60700545175777,-3.9663097415886357,-3.849312068862596,-4.269380009606252,-5.037132097285975,-1.848197498246457,-5.026583863000658,-4.913436350901396,-4.358953873195016,-5.011701079473024,-3.5867996964079945,-3.635990506051492,-3.8523823008245706,-4.74246118882324,-4.91515552856972,-3.0439681721834306,-4.907921156261598,-4.641442898700413,-4.987930887413907,1.1759953966292942,-4.699496179570645,-4.670872776236235,-4.6270817226599705,-3.8399123228830923,-4.447978543707322,-2.439264982524846,-5.033697436280541,-2.0253141984030747,-4.074293028093672,-4.565098185380446,-2.7059292122559535,-4.79787356658125,-4.265529467849379,-4.192391647304568,-3.1028771730059015,-4.401107400371907,-4.109655273545183,-0.5955722434300224,-4.095668699105579,-4.1932191674669,-4.723678798518917,-4.873199119291836,-4.912703059475729,-4.948183468031303,-3.7807214760172667,-4.5452466212037494,-3.2039302389075184,-4.161018749151376,-3.6969370186718127,-4.9931607745064825,-4.509285943278042,-2.393734530840575,-4.803709127561382,-4.755584147760132,-4.914787822085732,-4.597049226553763,-4.435271871480167,-4.755795285326935,-4.913187528350863,-3.969419184484007,-4.989112599542166,-4.608671397039798,-4.289552119583302,-4.8336648034596825,-3.215244975069754,-4.359806112270778,-4.754516927975881,-3.7734647199356695,-4.924420849996125,-5.044236233575915,-4.071143206296654,-3.536126922576879,-3.6640664465003265,-4.67439532020752,-3.9201616917508773,-4.968784312163148,-4.511817540711454,-3.911817032941176,-3.8778486449768996,-4.618773587403023,-4.707022886600599,-4.419560979917495,-3.1680862592638857,-2.027451067077849,-2.7126753156936685,-4.677997144121644,-3.094168597111277,-4.721043567445522,-4.735221091248404,-4.546684227959975,-4.705392537285488,-4.193876561944958,-4.311079204670558,-4.923462589706217,-4.920089153874553,-4.869223566883126,-3.576274114140732,-3.7641223633800047,-4.508861521723347,-5.011436941897931,-3.197091569426961,-3.28397737970226,-3.1607476315799445,-4.704514044593144,-4.2473518240244035,-2.392635698758675,-2.7138798446224213,-2.0219461241839847,-4.774816353312682,-4.41230504170916,-4.393959621207074,-4.3799460004696025,-4.99544036582483,-3.344749929913068,-2.5714629874151687,-4.947313987324133,-2.6106409779711384,-4.561756067511007,-3.1416273135916004,-4.914191088020562,-4.704856293250881,-2.7865971218608427,-2.5322104443110423,-4.807959416216164,-5.027113154262047,-4.883865622510699,-3.7966166991097605,-4.811353279354384,-2.6967442015759757,-4.010186009277794,-4.39696711855835,-4.228235372951914,-4.383758864237269,-3.7202571906578217,-5.03327947788425,-2.841229254978696,-3.2851934286658864,-4.897272132206529,-5.016927550007494,-2.908638405751165,-4.31062777372588,-5.029896652166994,-4.599906190038975,-4.471901259071561,-3.2152372101265776,-2.7414560311166536,-2.426525205160101,-4.624778525203927,-3.6170606786786434,-4.5072344103741475,-3.867803923774013,-4.7933776331202,-4.548902793720741,-2.9402877826180625,-4.926935980554365,-2.458730012085197,-4.332317529145618,-3.2711404178074046,-3.9686708406365394,-4.953865392952228,-4.978524835622313,-4.890654796160012],"x0":[0.15278575744293832,0.29237762848863813,0.016983714643576286,0.9328668731872485,0.1753364554093111,0.1146879021123024,0.8178270892358994,0.09526049382772683,0.42221866170255185,0.6475061026136264,0.9073723026689413,0.7292020927252805,0.5040919373330421,0.9627874563569658,0.13263465722429313,0.12770337630675077,0.8131600980680462,0.0873143420450333,0.3920327940897137,0.35424595285153115,0.4618742074529625,0.06085659730565607,0.2200023098841246,0.2331654390903073,0.06387630295169244,0.8829225811701649,0.2740728399459933,0.48403224123998023,0.2935037422788813,0.2876941655824914,0.6495561128874643,0.7607470408963561,0.567000433630829,0.10830812160658176,0.38103872736689204,0.2376041181068178,0.6582820818083668,0.8124751293570658,0.21213573043685208,0.781611426944727,0.10418256278369786,0.4047760526702824,0.49426755235040076,0.32967706846414546,0.6183684415083777,0.024072924013628594,0.18598821699590884,0.6118567046901044,0.21064059236848487,0.8074639718180221,0.29144675067423265,0.521255949503769,0.00026597014409102115,0.9267987936665452,0.5371848483930799,0.6238301517282625,0.11460688756898674,0.8679114054707848,0.5499541032454471,0.9699027307850019,0.20345990133594594,0.5607009089197665,0.028146800686745133,0.6704550822441218,0.4282547852405503,0.898443297584115,0.7897689269548798,0.5527511579727742,0.9285153286117958,0.29321822205970083,0.23705660399931916,0.09048194245745433,0.8092594100243737,0.4017136744364054,0.6445637412487857,0.2532827934810664,0.3614738050597768,0.895016662403606,0.2917228108141301,0.634334536723963,0.1838682057381662,0.49705803348418875,0.3987413223401539,0.5260979235081324,0.8708939387404349,0.43427714713939003,0.016147819165645227,0.18764197136551886,0.31867799405944797,0.1853396791161901,0.44327250829098386,0.27796466774143047,0.09629177239515663,0.7576976379846341,0.04136409101145455,0.8119967649229343,0.6848144027805507,0.7906188157099483,0.049350482584819444,0.533184558224123,0.2068671218218061,0.2792841400189148,0.7156263634655906,0.6315075863053414,0.7785612194720859,0.7297359754924624,0.35534983554155364,0.008418519450575923,0.7122830539302862,0.7902090125248531,0.26419415810117775,0.17957963195290172,0.3521480314026564,0.10130780446653698,0.12275250044035824,0.5239660993754622,0.27584993670577407,0.8035498465285305,0.5766998312561054,0.06867486879084228,0.44322532848912743,0.07594523528312891,0.12633675298994418,0.11759106824197674,0.1358421974713131,0.5189095859846948,0.5994178290440484,0.04102923450050433,0.22335827491721272,0.341856379605723,0.8286807460036334,0.980935312169015,0.4162324290594821,0.17576418458776577,0.44768618786840597,0.2407051715690034,0.11228524905635395,0.8008351245179322,0.4523007797144689,0.16758220793091416,0.43089027510139233,0.8306185211155375,0.5963517025865477,0.27557794913086964,0.07845528456987605,0.9506553961799733,0.4369042190869812,0.5097786853478883,0.7778662496307016,0.9281926327620349,0.1716404180625013,0.6556337269837329,0.4542935722106789,0.6502968039537373,0.36716482703148157,0.4679314876517502,0.9897120436106441,0.19507437931833915,0.10333939433872175,0.12914932338735885,0.9815165292437147,0.6145875686531594,0.31606720058614446,0.28399903435685836,0.9823266460847622,0.6778525096216628,0.9949058136095943,0.3882296276432231,0.5738658007651449,0.12131126641346723,0.9534240042726727,0.9873183373886061,0.4515880959546461,0.9330613562452368,0.6324066101812913,0.18196537931447954,0.9683608822821284,0.6049014160891482,0.03624348834182456,0.2937098381941079,0.786749822442169,0.6566883857395216,0.809172220020679,0.42699710805980606,0.9861604704051916,0.45665704159748266,0.7522717365929421,0.28899962962628245,0.8908200924311611,0.720902931538923,0.19625272760653822,0.7924091568525526,0.6613103262143307,0.5235357634434299,0.8507481386414617,0.9240778376737782,0.2455722975737442,0.03517083402392007,0.36715349598130853,0.313496047363661,0.38073623526480693,0.7961997996009658,0.8568184489945991,0.055270297905605004,0.509673139175074,0.005766984282211451,0.28808764827144073,0.6919925333666066,0.7218066586678429,0.3875711336821521,0.22275047706472462,0.9663380502309395,0.5425038729249001,0.20299854204843637,0.5804055421622865,0.9261082145470643,0.943891952644436,0.26077880433032674,0.09427667785731653,0.3950371381279083,0.9582315581811545,0.8517845760430507,0.3465104928978333,0.5990930573389108,0.047508343290715516,0.9873550641309392,0.5839189219435517,0.673589439929879,0.5693064898126765,0.7323903504089904,0.26948164340657743,0.2708980490417703,0.07574668253311856,0.02065069482652726,0.5939435808263016,0.9019751289638651,0.6506004308661564,0.4595350648925476,0.41413589800231376,0.02058557779250436,0.8265337094202336,0.5532526336425705,0.5657547420610936,0.5756455810970098,0.7267796135570246,0.9566580191590162,0.8122770175493361,0.837151581793657,0.9118234123925186,0.7802915049502257,0.2227380267983512,0.708261586891318,0.36001751717341324,0.8443409360290444,0.6607786253622521,0.501815666528824,0.6254452284442085,0.18888693676905732,0.5523655537525385,0.459777775189566,0.9380489109662027,0.7989452589525685,0.0026398977147017444,0.12872941043592445,0.3452374756940313,0.8573930769279026,0.7890718776053678,0.5194710080486702,0.5191883080987678,0.9356980470502216,0.26703541945454345,0.5869661720196726,0.25477207528369217,0.16437186145603655,0.5130561831366347,0.020240219810273796,0.335531793030591,0.8101451855282613,0.6542935159377108,0.14683987814681743,0.5858040004312641,0.3635198221224969,0.8431739442081323,0.38102501321485516,0.4056937294388785,0.8455138142531109,0.05957454629918035,0.4565267872941694,0.3472640362847377,0.06947786691646352,0.4913588160616964,0.7730230860257461,0.6883810381717135,0.4628955999063,0.657025314314869,0.9137968252138668,0.6782323521028031,0.43566208738421897,0.8341937019615351,0.1461150001511935,0.5467264384292729,0.9308075856676203,0.6140517136107437,0.5171353530434177,0.07720199500850788,0.7923706437817379,0.7866830298081542,0.6531066946898803,0.4157041848601388,0.1843246100560807,0.20155319832290508,0.7807968067082716,0.687610098062676,0.7631290402959596,0.8180857199055807,0.19212027415416189,0.42530382800683464,0.800084657090256,0.7379979936250971,0.8332509177130203,0.5957506888032562,0.7372548802865893,0.4199420300467793,0.241650824934863,0.5435305771485288,0.7325641221094037,0.8838974423920107,0.7109050824205481,0.5751050701871645,0.28449319022117203,0.7249914822998955,0.2935091866391266,0.7227288649098638,0.4834338559140192,0.4860947586111122,0.474248341506339,0.76758133635736,0.7716406508228992,0.9265427765992953,0.9926822633328771,0.03891045290386752,0.6596638675979776,0.8088370976060859,0.4287336177188845,0.7797306226625644,0.033147935401714346,0.47317995633335697,0.6437238451245919,0.6868266812836463,0.5108278962075279,0.7771843587801377,0.13618963941536943,0.3446651018834448,0.040977710710150106,0.366493602151333,0.23266948286973155,0.18405906514847326,0.7523635326706228,0.7246644363503605,0.25595305704507587,0.7317739133877883,0.5452177466262813,0.7013870613359994,0.07374571346906889,0.6990344781802054,0.8328413507700221,0.8143039933954335,0.03475862096081861,0.537206815152643,0.28099154609645494,0.2102033855125136,0.6166773470153393,0.12447865172243389,0.40516627049624,0.4640243101516641,0.9221748497761024,0.783307611827055,0.8348904044951277,0.6626454628056937,0.9476192918721378,0.32183423955388557,0.3870403338432573,0.5768457203752835,0.9208606691125611,0.03274352005134995,0.49510189197638055,0.1301952176561436,0.779472819979987,0.7530422939960375,0.3674403817833489,0.8102649608801136,0.4975303930417241,0.24750489767855055,0.09847249779386202,0.5936691066644646,0.6599870906099832,0.632652157809148,0.09486149523253018,0.40656333569855807,0.9910507206097785,0.011751759315605792,0.011157629698450355,0.49884313167235095,0.3958596603215905,0.2645774039592472,0.5268151392520644,0.9082791683654077,0.6326713225392264,0.11819940750671565,0.8477423594253974,0.6538240330391822,0.9494208800881314,0.1864938887149219,0.6557560737509105,0.21286201043555097,0.9383341178834144,0.007528932605435745,0.35652677545500566,0.15295009710639795,0.6884598148753847,0.7543495159712739,0.7449663930556172,0.7966256430183285,0.9818043876679696,0.48835481001704983,0.2430373175251872,0.9626959401070103,0.13299258736584885,0.29429559753945167,0.4048095719776914,0.9575720847842684,0.8451065435011678,0.6460237095057497,0.2495600331102965,0.09304003437129227,0.07834561227226322,0.9017260729555399,0.01564062976666203,0.718906666191756,0.1922827705616128,0.8999071159878496,0.8863512878305382,0.7761238514302582,0.47264860221393823,0.12151230768212562,0.40480675242344955,0.6639273910345238,0.09001667292790594,0.03327615594340716,0.8107152109585067,0.7865135021107963,0.6057548620234983,0.028388990458740437,0.7317098699125086,0.1550745579785453,0.8198040046859776,0.5304282172908543,0.9061057999601474,0.29609835952520136,0.0861271541437505,0.5972719300095233,0.04652152853564684,0.18974048147396716,0.6466584732545322,0.8704295315533894,0.19549048754891496,0.17479599642520194,0.1358462607872477,0.10127911942581669,0.9149620912548424,0.7812906727379405,0.307179374706692,0.7111496277441767,0.7265166956129658,0.3583681562032981,0.6045007925854635,0.8378246823713531,0.884727031570123,0.25668496155500087,0.966158742075925,0.06556645050309196,0.19643821690377994,0.35147030571245086,0.9485958896890676,0.11209367780810608,0.04982412617657972,0.9934028560351826,0.7165259867475635,0.20221482647540379,0.7573779756111549,0.9478441101616182,0.59321074230913,0.9359643191591869,0.4284440969978027,0.5844133618783958,0.8369782101531993,0.12897140941672958,0.6721594237309787,0.8435300020431458,0.9537988095280852,0.9394934623289926,0.7485464919765983,0.6288874539115386,0.8576617047797337,0.25380795037226545,0.5566843766636835,0.4722873095281692,0.558834189044713,0.4402400203963355,0.9341746970710547,0.6478380294761397,0.08568539921813212,0.8857286701460767,0.7247068443342548,0.6371095974565808,0.9064507724067679,0.3773693062635799,0.05006570821740297,0.16634203908593248,0.994462099189301,0.5141042536382725,0.005346460776204598,0.013662907468968699,0.797275723223863,0.5023104506307243,0.8523931615717855,0.8052516297321546,0.7740068637336055,0.3591032082231762,0.9208620452869338,0.35940411379397563,0.9664742645351216,0.2731370285719512,0.9393142172822868,0.4306345821892843,0.8985848875694211,0.9044904809109828,0.26643862031885446,0.5168932254706584,0.967693613008016,0.8324009529670024,0.8459064860813792,0.7885477895348896,0.4624185301895636,0.476112264891666,0.5443491775150442,0.6335429919424498,0.46682020738986396,0.2243400912240694,0.13152444800482477,0.3581780442666933,0.2222445470089247,0.49178991343577905,0.8616516234786396,0.5656915455092715,0.9001488175761991,0.3481126559198011,0.20487555380098987,0.1030164427137068,0.28714045823627954,0.2491912962063283,0.5280556945351205,0.7860948187826446,0.02693578538203023,0.749736557252382,0.40574358839332847,0.1710804137428128,0.5931482624192037,0.1109074457183028,0.7571664397896536,0.6475026519608138,0.6025980312731698,0.6971998365172984,0.5947961400074222,0.6944213845254519,0.31291517466421714,0.6172350401211426,0.6324941798382377,0.9601159855939216,0.0667863568321867,0.1716667755870136,0.8456790055245738,0.9247924707950121,0.153150538526162,0.766949387321018,0.8155574059384267,0.43008167525186214,0.05176070678789091,0.5374047700685856,0.1500483716970329,0.9662219615401157,0.7791880809217464,0.6569308704426624,0.0659013335619929,0.24798966183102888,0.19551010843483962,0.21956057488502445,0.620677348836826,0.09940984117581175,0.17015540106131288,0.6767461861706303,0.10492215691843176,0.08281961946492822,0.2274190764037627,0.508393193245471,0.8154031908418942,0.7544603351546579,0.08400874236589662,0.7567772862269002,0.3551883008671335,0.7702857963989609,0.0909839791310938,0.48571968457027914,0.26073011535794244,0.7723288838674871,0.3468832164178459,0.20709285229062968,0.2855378064849823,0.200013484570992,0.9275840912592441,0.5678804375242434,0.29721356867716886,0.18211048459152734,0.4992460024400083,0.8417090984938744,0.3993353970839102,0.11417449291440729,0.42689756904761045,0.36323791919971193,0.7577987832850688,0.7282405635930334,0.598707410160233,0.6797092199234906,0.5628552392360451,0.08345028479492678,0.3807429705388603,0.32279309138215173,0.6156991229399407,0.12972969386916722,0.6138479793927274,0.16608637739306653,0.8818080805499102,0.5024585026587316,0.9569909027684935,0.7602007572063261,0.6268292914316562,0.5386620488880325,0.5328880444253115,0.6698153214627038,0.9653568559283257,0.4687851724634857,0.024295936053772227,0.46749257066087857,0.4995737766173982,0.9030311868314473,0.8276780076721599,0.12876863090894375,0.017388769557055372,0.2550928590041128,0.14781812151145246,0.5874351452257662,0.010628831100516045,0.5940731691966008,0.6965022569834638,0.615555038001323,0.838473170011844,0.5815066641485547,0.7023272358644865,0.5753198720410837,0.4224182093158455,0.6592683701121007,0.3094612855705767,0.9585035432914708,0.4071910571358177,0.7509439270797642,0.2964651721180842,0.5647449351614691,0.6986737426259,0.21404533314779006,0.7304304019414305,0.3027690738374478,0.9202370887228715,0.7736005480286232,0.029154327423648985,0.12650555826484333,0.031886419769884045,0.22605867104894428,0.5226255168832936,0.7600662914538818,0.27852964320165396,0.3437347444537979,0.06667672884355791,0.8975435649576518,0.7588809253962501,0.3429899321392167,0.28867497609755044,0.9047342994772685,0.07711678993394422,0.0011710180428110561,0.9092683541201338,0.39669325184684334,0.9452419975777464,0.6215399983388643,0.758579580173107,0.659602068004238,0.527936292712625,0.7038025040490816,0.6676692329992735,0.8567026679229124,0.44538023651841696,0.6588940095942564,0.30850303465293494,0.26115158845809106,0.3188109409873119,0.1577742809295859,0.25620665668839804,0.4429379524464141,0.5712952177274258,0.9458482369423531,0.35962077554923955,0.6417032869519985,0.1509457275022803,0.3395084772971897,0.5864468857167595,0.1794404947684789,0.9464961412059907,0.1341529845253575,0.5691962978983589,0.05580070053027342,0.7404039220772476,0.5323053024994022,0.3570082827965111,0.1974270785038812,0.6809344666116273,0.46049357790483714,0.44347774137646145,0.6643562579848659,0.5506507849673206,0.6141047367307921,0.7501607028910977,0.6763723584447443,0.483741325045691,0.38696318268839613,0.5711880770117528,0.9632098580438344,0.29648205969167574,0.4020380138927191,0.8714375479681431,0.755876209112591,0.2354027748949037,0.6173373809143365,0.6213419780707721,0.05705517459946341,0.942170795082401,0.544348224088635,0.9447829468018676,0.5672824715169231,0.6235568702137084,0.3677908325326704,0.2569600164757482,0.009645427502147363,0.3366410957239909,0.6407386825286494,0.1807421529149389,0.7164315351763262,0.3231585375621093,0.18312772962201262,0.7130898674063828,0.9092274898986721,0.24243333167703396,0.8428611150195202,0.8274295761301382,0.21456014196037132,0.6114856094227858,0.28806451206371,0.554703008941021,0.624374305391812,0.19458950072093306,0.18679456811224893,0.9941913701180558,0.7176404509411565,0.11325401285476056,0.9321638662039073,0.4755290645874177,0.35797335034708344,0.12900875751272056,0.296553987885932,0.3466868548664037,0.7312217268927972,0.2964518482104652,0.17390449247023199,0.3148858741362295,0.3591970772444837,0.49689613672061306,0.5763668618070095,0.36429322845144396,0.8180899710877594,0.40803364516071916,0.56760826998732,0.0851673032238267,0.22112781267357695,0.06144704086244812,0.5564269461406255,0.6856438030696146,0.849946439818045,0.7243398382283719,0.546084696183899,0.027340190749060245,0.5143167517183986,0.35507585127892605,0.18198202683794484,0.36686347125498964,0.3452946077259107,0.33603907648831655,0.7469774407942669,0.040858546236723026,0.07875356955353885,0.13213000851990864,0.7721770663883369,0.2454498856023224,0.5427853885541356,0.8998953742129845,0.42733705122771193,0.003544891802964134,0.9737753020308793,0.5347731801713833,0.8964098678514765,0.03639370137618947,0.25987250637447157,0.3521374433806106,0.36305219050112214,0.09450904632253976,0.7013736558977226,0.33677846051375937,0.4274095659658659,0.1686433471083426,0.8861399530206677,0.3942216933435052,0.9601090915080939,0.2705114024317068,0.057312319548219026,0.24282449832773656,0.1511696085052674,0.7087374324072946,0.5184602797538831,0.5748549985883511,0.5279631265039784,0.7832875169893185,0.9953444462163314,0.7078968023530505,0.7010850533852941,0.4408560507364456,0.693955391353412,0.3777381432966893,0.10898303319422431,0.5162311116534384,0.7607702912623182,0.9359236393997037,0.8447327866868923,0.02600234371829835,0.7788994932040489,0.38235549577311834,0.0325882714902912,0.20978689209965617,0.2253664571504168,0.6771185487982385,0.41074930850905833,0.6324422046386806,0.6332096584551397,0.25048992856729946,0.28999193443242177,0.28622503875781424,0.5606917562956537,0.9591226066911942,0.2459350888891536,0.7236476474290525,0.1186750898303015,0.3863062647051312,0.7881009587163019,0.9069884451456685,0.3948285740026316,0.028664189716403055,0.40951789910949965,0.9646872294845679,0.9266112181970976,0.36404990172587626,0.9418787278974012,0.9112906002794405,0.08185463616356148,0.05382996230314352,0.2370707738111213,0.6273223484193173,0.24078298592676606,0.8786019964504077,0.9806856351281716,0.7885037290877863,0.9604048777132212,0.30481869641283765,0.4720466348928567,0.6421714848515454,0.9297825189613116,0.0896968095943751,0.7964356332446012,0.9524186458942978,0.03113647676457787,0.2601812460775299,0.6515066356575223,0.9195361362559438,0.4100674748484938,0.6113634205306333,0.04780625817142159,0.6872648517241875,0.3634659593244214,0.6338034358152262,0.7667187478469009,0.1428517966623828,0.8074841724523756,0.5857911136865057,0.12817591572493625,0.621921823808224,0.5445034956237687,0.5546249930313873,0.1103214645149524,0.10142120367518848,0.7660737287971173,0.18886963903672438,0.24569940786300815,0.7272195599986728,0.9291385442378117,0.1708119573294422,0.5988148695999658,0.96282531565521,0.7281892698668826,0.7724413271708666,0.8080822648628871,0.30907979703694366,0.6531183564038159,0.212940312738636,0.9949813009171617,0.08079511488605973,0.08906613833699084,0.4304347882170956,0.9371828712093382,0.001177846995994658,0.003330607377661332,0.6578471708894313,0.835646968003418,0.1520929374598743,0.0033935435932659352,0.37367550554199047,0.5854271751199553,0.2447478236006826,0.6704093763150234,0.741089866982751,0.9251144023498052,0.9501160257770871,0.45144008998708585,0.17020554866159876,0.507414478113027,0.6050328109106138,0.014943348793617028,0.9900888681170263,0.802676237963758,0.6642579337578529,0.30291725009207604,0.993059553384267,0.2832492523583059,0.4342986587638513,0.924670762532434,0.7079004138901102,0.9736784434188361,0.8373340398888873,0.6220128839985279,0.3619410409635384,0.332945968821863,0.02132449408578818,0.5236506819348432,0.9338464925900141,0.9509156380678261,0.3576658967790882,0.12488239721148786,0.703229948688062,0.5102869617350132,0.07570056263214453,0.28478151414227093,0.105662632858323,0.14610583552094747,0.25133286572051916,0.968341564042615,0.2377215448974075,0.5038712315676612,0.14653101730391405,0.3168885549765339,0.5995397982332964,0.07911792612051172,0.26243821994330596,0.5655838487991549,0.46242190983916376,0.11056249072918001,0.5816306397486222],"x":[1.0974123947015606,0.4883551543897138,0.30585115443032596,0.5848648406324934,0.8561901307213962,1.787416977054717,1.8303454473135692,1.7367124083558414,1.5927875643274443,1.4448598649885849,0.7270545526003369,1.882290117247944,0.8928645967634705,1.8540603566501659,0.26945623572389854,0.2464340174919495,0.5822005203352307,0.7456801991952933,0.7190770885676612,0.1705211089333334,1.0349151960693925,1.2883764395135113,1.7580346100500854,1.6341963752264945,1.3873981229769008,1.9614968375944497,1.7157139518079845,0.8757927507846843,0.9640582540052645,1.5023191689557098,1.441153158303477,1.3929031003712082,1.6915794783839728,1.7669671996414582,1.630443713802404,1.7937497715298933,1.1748435206869066,0.5452949296212588,1.4874863205137818,0.8215293911004955,0.1784161242593023,1.2885033181655556,1.6971768696637062,1.3947501127700184,1.8174444120694022,0.24230223603600365,0.8334519817815731,1.8008024710091188,1.8389707782815559,0.9329723083466539,1.896864446546858,1.233509716903777,1.724808065397641,1.875191359911026,1.0049659789267689,1.0014015661848505,0.9146377208378564,1.6798816471766793,1.6857948069362285,0.9294047157361582,1.4022795697801382,1.1836451505977963,0.15760979114178308,1.2767088503644355,1.5307339558955158,1.0076099575599553,0.013490241671115122,0.3071900646795571,0.7313235082410925,0.5115618219605857,1.3856191713138437,1.634129822499208,1.9051977086547889,1.6068349596736522,0.14449531717102282,1.5244723206421398,1.92565416527487,1.4819045946426677,1.392165049581172,1.4103278031233635,1.0470838849495614,0.08896094722908288,0.3111551077654311,0.2911267844606815,1.378957083270755,0.4227506141716648,1.736615848485934,1.034387453224341,1.715529206564462,1.081127536063951,0.873917258182439,1.827064625198516,1.287198915528899,1.9930827148977355,1.4556870212167357,0.2751519897203525,1.5361699301660532,0.6670540993938356,0.6285466863405418,1.3581061096529425,1.2050147282988823,1.0758668932853919,0.9983191532655229,1.5083330577953866,1.0750082189155044,0.729463381072736,1.9591807282377456,1.2089725124392827,1.4179757336466179,1.8553538171626336,1.3670383558884698,0.39012059236440155,0.54809730527505,0.05514179372590933,1.6506758227575484,1.8322861725712638,0.4044096150104184,0.04756502904088977,0.9116112062865369,1.964402044314462,1.5277164122269262,1.7954978316596168,0.29033092944474914,1.167401982890936,1.0579931186043399,0.5351323915207282,1.8771996535269877,1.7406010442013988,0.8211551096500065,0.5872513938981334,1.4566363681029073,0.4890513710163633,1.1373752229742697,1.9980059921620188,0.3249554253869511,1.601659381375347,1.4151817706648218,0.03137706638716731,0.5413802394123834,0.9028398616661648,1.5438950633614126,1.8122393993487957,1.096827633706876,0.9271545713256679,0.6757489168713544,1.5027022019573915,0.5880263041118923,1.404146996966836,1.1909706644714873,1.5094811073206693,0.860013377100052,0.9964469756808527,0.8907378649472437,0.5127665201958522,1.2828386888727912,0.4381959354352185,1.499723008036098,0.5059250584362198,0.302013885232121,0.19377473837831483,1.170193494388272,1.725813796015189,1.5074795278867668,1.2335400916637616,1.4732412760508353,1.0138746979154662,0.03666356900112877,1.6081747460216222,1.3334687752678742,0.11491880925804843,1.3984074482465627,0.6114162664607319,1.1460574765348723,1.0347437692652082,1.2134887961522618,1.3358357871548017,1.0363193045514816,0.21034985340598666,1.9559619233892072,1.3275893666850433,1.5897248496232126,0.286409628369126,0.1663291521647352,0.2769088300966138,0.2871089683559269,0.3191444850586378,1.0526413240826904,1.3098311984153552,0.8456245699643548,1.6417564642837283,0.8223754560657084,0.7541590496663946,1.1275312113513274,0.06582235064626207,1.0037094986524497,1.3180892733656338,1.3752438098012143,0.7449810178320813,1.2270106852599754,0.8766384177122091,0.6354753181588948,1.5622616079411857,0.5716886994001893,1.2989321549029205,1.5945963260246874,1.9988142409250065,1.51034608296517,0.2068807602585898,0.10591269469703235,0.413674939983006,1.0640900714228136,0.10904106947509806,0.6782561852768785,1.3868796279676032,1.0961358032603075,0.3813053218043492,1.0634085503996324,0.5387072838292148,0.3807424387566951,0.4616891800369114,0.2904507236492666,0.14594325888847237,0.5661875156044527,0.05940157695294834,1.540917169427558,0.30717958264831324,1.005507844581731,0.9625476281818748,1.3558390454497884,0.3247289445435806,1.6449861599231852,0.6256303931717673,1.1136006806368228,0.05686106996083984,1.9595209025544058,1.9935684720557196,1.7566714050519971,0.6790956703271358,1.6253049555447778,0.6931947867581076,1.1433251255829493,0.09266298332177225,1.9317335448213742,0.19079956968551892,0.08703083659318578,0.9310532457306024,0.7422897368142003,1.4517629023204912,1.2522706307420393,1.4349871499981264,0.07616318718139814,1.883736610958076,0.10817409826334634,1.03392340589506,1.7373150544939797,0.2298401507572323,1.068014061006874,0.5956705240955564,1.4572385066733395,0.4965832690171337,0.9143306470743577,0.48579399679161694,0.1994447046143879,0.0702233011644049,0.5115363605790342,1.8391434257283463,0.627817301277318,0.4809023475110341,1.4642883812093728,0.34607659855516903,0.7278843008548224,0.41500231235968865,0.3244452492898722,0.7720024307100313,1.6204196125578298,1.2872217402592199,1.1858939574829028,0.43195807235995876,0.9345782800010123,1.9586032325444425,1.136327624952048,0.10370610543663084,0.6460110416103189,1.382941046633762,0.34534430830445606,1.618770794246649,0.4753181135937914,1.765376464345544,0.7099429451997481,0.6829900647957308,1.5747520919310154,0.3232777011146326,1.0349488509064946,1.0289992724314936,1.945083975750344,0.8358717004898537,1.9175887172637545,1.934427136367896,1.609761868268126,1.9077158910578698,1.4969072941117667,1.093183695176259,0.1428400212833436,1.3989663719687333,1.4346949288651962,0.47837317904898624,1.270830448484602,1.8511521192016542,1.4957784646156553,0.15128316182826218,0.9922117243044921,0.249729918244892,1.3936164167175393,1.2292028368741303,1.3782249258607981,1.4455372636551593,0.18497942605273998,0.8497800685496073,0.2662948000945451,0.9733234498484302,0.08542457956512273,1.7589845135962903,1.5120028394566365,1.864973214117323,1.4137702582566885,0.17937625678143343,0.9445957522356694,0.5233209468441729,1.3496526393515178,1.7072185122983563,0.4375792810639294,1.5367531145343447,1.7225130281762646,1.9857683596296436,0.3097016473411469,1.748451916622034,1.3468003870945577,0.5432301389814733,1.1986649384547632,0.7243340896859296,1.9554501099736399,0.8465615951308183,0.39321344951215087,0.25650298449842746,1.70146133789991,0.6626287002122693,1.9210525111662755,0.9938615751176667,0.6271194425538069,0.0395290851146366,1.4104475075178953,0.11276485739853825,0.7579313462012607,1.0492916163682087,1.5719740325871712,1.832642303851907,0.7049254877092705,0.300404381854833,0.3539411192208948,0.3705782279067793,0.11293876324590535,1.3799756896155722,1.0275761582515677,1.3416637789886168,1.37640380371526,0.29161576847952553,1.5133618899113008,1.9983652643907948,0.5996589088658566,0.4486327031764126,0.10633795836734228,1.7715106880387084,0.913149138655863,1.9100173111984615,1.4066311164886498,0.8708674802934255,0.6330889011722234,0.33869801784976694,1.278160555286033,0.1863062112807934,0.06678780381820859,0.3069990621456231,1.4622904050029542,1.7467254431786037,0.5232484563993611,0.798984432666185,0.1772892746487864,0.8549182425350512,1.3209682779285723,0.9622550443578288,1.694525740919837,1.149160658670127,0.3859888675742411,0.7215829817260242,1.6614872140468404,1.0826885556527612,0.4786207536965734,1.0877723702160633,1.0585432086850237,1.0489032612807367,0.016079437490341686,0.6136727894224197,1.671434314687409,1.1893468540698895,1.6633792682813642,0.3522509591110774,1.9819009535488727,0.8747593810782313,0.965144813427897,0.5468695522112785,1.5513333904883364,1.5680407324468488,0.6342227162429039,1.8349692264719208,1.4527195185163042,1.5526795478082165,0.10116853404247017,1.4707375616006826,0.9217268954402904,1.1097661719515992,0.4684733246884907,1.7864456812213554,0.5117831198899734,1.058157527634625,0.0716726228704041,1.1058588781790717,1.6156683141086825,1.0814361062868243,1.2953594799794619,0.42685399213233843,1.7926579534456435,1.1770093312607397,1.6097270125294378,0.6096514311185435,1.2885238251469167,0.601492158673214,0.19256072334610908,0.9471807852110947,0.9242642467481073,1.113733638975455,0.06385878367770825,0.8299056812400489,0.4120269604676121,0.051629897705427474,0.9811790117141936,0.839478087939217,0.025373825238214742,1.055662312155357,1.5901965824851274,0.5165301028757381,1.5435597793253448,0.43217821864483996,0.5162504486545889,1.0426589312915153,1.1295770902362388,1.862151315064576,1.7965181342483367,1.5149517993193125,1.3116081965204054,0.7172252891172461,1.5911543255125813,1.1371699861826814,0.8503569005319482,1.19705532221005,0.820553434699081,0.3461110332935551,0.6465634028084142,0.5898048172291182,1.3469530249817327,0.8463951435336239,0.47026791869040574,1.5950314366603373,1.6179401829874056,0.9625933140907179,0.9272491790941171,0.8662480713767073,0.007743981642591713,0.5049796992889402,0.2609894552531524,0.9691106789286081,0.07692724126200945,0.4480017877610738,0.7032327424975233,1.8000487703250148,1.073349140767756,1.2118021005518194,0.8894446116110748,1.1940409217152208,1.2757567019358032,1.7499334860023184,0.9049772563100786,1.9324090072701785,0.01684792653868561,1.1262614846324142,1.9140066997993843,0.22331244400242056,0.38914987246756283,0.3411779050472701,1.5979815681652219,1.7841493129019006,0.2292736133151858,1.8378103310576401,0.3982755569272287,0.9066205069911337,0.6303485876992223,1.4478297734054326,0.37912705430582605,0.43659876905390194,1.2215745275374843,0.8572527422258491,0.41457414162573203,0.8706584526998995,0.9085229839753413,1.99130146787242,0.17663651214080067,1.6759888956871376,0.4537430481674054,1.2811625860495512,1.8625904737527033,1.2013614025114787,0.44847436724433987,0.5292367779363563,1.9653544375681005,1.332685131662716,1.5717034686734879,1.6165359518955063,1.9811648582626171,1.8579161045241026,0.19681622662148568,1.9806085523488979,1.3270332386256625,0.31447614579750605,1.4299641910595087,0.039636411881611266,0.8949366350583103,1.0944960067460112,0.45799794688261874,0.8812872394794198,0.48575243354974784,0.7954413944170904,1.9201779056999646,1.3787871369243225,0.004056491071029011,0.23423584983192614,0.7143973274254192,1.9260376875016942,0.5536367236877626,1.9265883251197695,0.31430665213342124,1.7616438841326914,0.7719564148748912,1.4304720180763661,1.8617877048936213,1.1162717267878977,1.4295833515852712,0.28240660168075626,1.0605603543348896,1.04007620655843,1.4673135232214287,0.07983537237421023,1.2247694055160716,0.3053180805309572,1.6267787438894525,0.7958842131135571,0.27289221207756187,1.8528731637752056,0.10185154075741787,0.6701957280739745,0.21251946802639354,0.46003809877986956,0.8628629679068895,0.44972764969757595,1.8726300638880113,1.0043705119759014,0.036051068666326014,1.9810969665642508,0.827501901783839,0.5253703018619849,0.7205961180360343,0.7628626198685065,1.9776067387959482,0.7475597410504333,1.5847212550413334,1.8775920502609216,1.4136562928603142,0.30432542207835134,0.5398492154124872,1.8844566226100774,0.215521776883977,1.5748722813285139,0.4656783416252672,0.5874860162490521,0.14131978692161073,1.8904441963883585,0.5238867326259182,0.08654013211144651,0.17990960848569904,0.8918558806275811,1.7040495273099325,1.9823633646537901,1.9043080282661995,0.7993789256936323,0.8385094316204733,1.1459880057664398,1.445410684505084,0.996363997745723,0.5394340185473521,0.5927217815224388,1.1964384940291146,0.24322466272058785,0.7512434534880565,0.17958763564902736,0.6526044836110882,0.8542600966730873,1.9032721444714462,1.3472097907089169,1.7487162673684136,1.7090516489717844,1.4453533143762773,0.04571227714959525,1.2574659725431774,1.855117119659051,0.5300402918973144,0.5574971909329509,1.8960783092239084,1.1202220689605698,1.389325830570685,0.07772887585942101,1.9466549049400288,0.3153053484227004,1.3079763004174874,1.4281819865809906,0.7763266811972227,1.8076425361733022,1.3147122964993683,1.408721471752982,1.5777499813372882,1.698142267623009,0.8887262680871255,1.1363017633725083,1.2416582675828374,1.128714300730322,0.26266118445070186,1.3266645409409294,1.3341674986656922,0.19237676261902825,1.877317059050219,0.33944511582192405,1.9984960528666718,0.7243521258912078,1.8066705259362146,1.6682665458172767,0.6927248075141774,0.48565492946045996,0.4974234683149059,1.5575115085935631,0.775640838520999,0.3802841130478827,1.3071600926168583,0.6968082967159641,0.7954041839758212,1.4157959232798913,1.6322291160232107,0.23447084376532956,0.25012341096702473,0.406487913415694,1.3098894126562035,1.4700808633884672,1.180412821843709,1.7705496812707984,0.5542558431369686,1.1090529175294224,1.9085223036100905,0.018972264089343494,0.4278964709113886,1.4801184337813358,0.206452336832343,1.1336352642177676,0.7357843635276393,1.5238554362604946,0.8388589293087083,0.6887811956252103,1.248813049122008,1.3248137417517207,1.476052945248754,0.22055919850191108,0.09199662424458754,0.37020847590305683,1.3943281391162072,1.6736200309046723,0.6580534186163334,0.6583674818212732,1.331715897291264,0.32488642631046316,0.8224384218001202,1.2810958125265857,1.0730221880503428,0.4905443735239041,1.1854909247126733,0.9025630335288328,1.2269548549918081,0.8001862669571116,1.942764856930788,0.941740422633182,1.8634731217206069,0.846334981351831,1.6290061241648215,0.30145845550817985,1.141239153633781,1.6738437925306657,1.1283947247790493,1.6450845810666515,1.6230365208738506,0.6922893566495074,0.8186213884032645,1.3057935796156852,1.459252832262247,0.18699937365864994,1.9105133425839989,1.957169714131659,0.1947962059310142,0.9290467335172217,0.7082276782731647,1.2826012261689548,1.8651277031697782,0.029097920492626717,0.8907797552046421,1.4725804124394815,0.5377332358142648,1.5014378756550242,0.08460349895458474,0.582300034397381,1.725791759381642,0.32889514389636787,1.6574732290532697,0.11716432051979853,1.3308856648963925,0.7220540450965793,1.3226496889600003,1.818922678906803,0.6551997120205812,0.9189884184464256,0.09664246335333182,1.638354596857353,0.3940037617297696,1.348173937402028,1.2063143765329682,0.8109560334489752,1.8835625766580115,0.5006564724934579,1.5591128502202047,0.38848718568545015,0.24105143505514848,0.38935468614549107,1.570781981383334,1.9132385671032028,1.3538813433946584,1.4223393712673005,0.7180966986071966,0.2568558680004216,1.8838504725336356,1.3214004856669241,0.79514634424502,0.14532706895681002,0.8785257400979765,1.9153653133824706,1.7744389454334675,1.8535075500424067,0.01344512565086875,1.9779896718635501,0.773366912732484,1.5759251801656498,0.13722819308468148,1.2936875450085434,1.0977581129938039,1.8600280665102082,0.1938191008441934,1.8212098574848703,0.3203605066526616,1.2598856900662976,1.5776108240016047,0.794027029086251,1.2918751291992647,0.07141117154005716,0.8288121267463668,0.7976970586656855,0.3426224985423483,0.9820774899877645,0.6718042675523961,1.6260888300939023,1.155625106806185,0.4083562866196453,0.9030463849452688,0.13498228022936942,1.0931529200724608,0.06120856977538036,1.7448856813657172,1.1722588099422473,1.1802116621326446,0.07585674549865074,0.17207707334474032,0.16736385843527524,1.9311874121631698,1.1898070638670966,1.9435285922579029,0.05955385978499894,1.5129830018798627,0.8319135135690607,1.004761416155941,0.8203059386864182,0.8646098905761774,0.04509124360258365,0.7137419564318379,0.5542706245088973,1.5833585770652179,1.1297893767388132,0.6623269417447459,0.8589305451094931,0.41763400023983577,0.24020081970440277,0.6609063893265801,1.2226298584604338,0.3905918436737146,1.2224666848106156,0.5758372810879524,0.9717616970051788,0.43068643111086,0.25973066401460354,1.873283637293257,1.4268345388375208,1.810334198686308,0.8817798777548922,1.9770009164934437,1.4308129878388351,0.9698969383395344,0.817747596936846,1.6529289154175868,0.9339915868645865,0.9828654245267412,1.0228742662968346,0.9194643422312239,0.2335134573618256,1.980455341113962,1.527020167347127,0.4556723793451418,0.023969912013378725,1.7429766745859472,0.11452863781085121,1.443406225894619,1.3898539279808722,1.06525086426478,0.01633128081628543,0.12973120203548927,1.2805457873792556,0.47263995759286725,0.7972613735864806,0.3016075097667654,0.8868277860078528,0.18474674951415215,0.9282919504529037,0.6700992754467294,1.9595403237056233,0.5743259748093079,0.09918634224258227,0.9951900122321611,0.4198359392587747,0.3495945863298866,1.7312436417025063,0.7953036364683554,1.7917639342801248,1.6939395567175657,1.1615362501460083,0.9556492764538334,1.8865493870349117,1.7499408135551984,0.7753769233392012,0.8210492927416753,0.005296274746460217,0.41199728835409344,1.1325475396953268,1.3514773323468154,1.3433108602759738,1.5827809553243037,0.22134855838602308,1.377503590118517,0.7381241101766864,1.8823284581978137,0.1666731919241191,0.25472272491085546,1.0705598504641878,1.7112652995468922,1.6312113905994559,1.899742083605286,0.48978612585801073,0.9621191594180503,1.2455975108641257,1.4582540451871733,0.3200290991131842,0.5156139233636212,1.216892319751493,0.7712980356446999,1.1684468466870683,0.5862675433383617,0.8513568689188529,1.0846880773144552,1.1940560689749447,1.9935623958385151,1.1446979238035948,0.36129698961499157,0.4054592894132334,1.94599086929767,1.8619764967950667,1.1609519195646132,0.8105597970581031,1.551953565440337,0.0013297675911458917,0.6798926400898933,0.9289330798246316,1.7037532764827255,1.9786320374886701,1.9055012176867137,1.7609708003620503,1.989145818939456,1.3007761020290136,0.18878602152201873,1.3002164042318105,0.9110872162648147,0.21860001242603566,0.5144502068282963,0.9270804733176932,1.8631924134653657,1.7823441568636076,0.6378915040152706,1.7415386540329423,1.7235261713209704,1.314589163368363,1.4654042398056784,0.8339603731918293,1.6488150266258024,1.8177408289225263,0.3435152914047035,1.0183666507227453,0.2959555244450969,0.773165760557899,1.3130801884658516,1.591986284099412,1.111759879776535,1.1248450708930604,0.7939542713579777,0.20317130583663934,1.0565257500571459,1.2086959969750692,1.5617951079845844,0.3255984841133941,0.13927398248402767,1.5117770862006759,0.6119318700533123,1.5318449104009835,1.8952482382442892,1.248580356368108,0.5259080285377653,0.6509714390344672,1.2980141850825424,1.0961600195197039,0.5862266286214308,0.2411184780146085,1.845860485762668,0.5201865129032468,0.5201824406829498,0.6412550637363887,0.7093690703468374,1.7300994296148806,0.472408760938718,0.35022072669777415,1.932278422000699,0.2499903559767187,0.08166221374724003,1.7405478933223781,0.680503605304875,1.211133596518494,1.191145654025783,1.187708760520009,0.35342636489396906,0.6580963017673729,1.5894107492224259,0.9490762610268249,1.2903914327660813,0.3664352240437365,1.243640049006442,0.11759960518895118,1.8785663925408769,1.3562357592898806,1.5389127267503628,1.8459418037751876,0.5828873989458523,1.4195442219460337,0.18369202483931701,0.20322813327758604,0.24995773097180063,1.5031518633147987],"gamma":[20.854268745779848,39.455428474486176,28.126724551164106,1.9189925729116264,36.38169377786905,15.930794546773686,22.534736163460302,10.920283930418096,35.59916575080335,49.28851903294545,18.374652061457287,18.431624826857995,9.021248022427963,23.12110906795265,27.11442937029528,29.447238623935135,17.90180299285431,30.75708572064535,25.892367871477408,42.437902511285394,32.80172825594938,49.77309544110115,33.81882869751707,0.7167779305750521,46.21845992302982,13.306144417527133,10.740029064394907,45.330145178393536,7.277591344326073,3.21491869765278,16.094727461894575,26.98673169734458,39.90289839020128,25.751997934649708,43.242742943488125,19.684090624791462,7.223688593441069,45.12085272254378,42.599965771590085,45.304703256150724,37.166797564724575,15.703054575630615,10.322661935287748,3.9553308934055953,6.364619377920244,25.07401323273544,10.813966237926032,47.02907550428731,6.490682913423706,48.3294810489872,32.81826014804759,2.808313910252247,23.941670650174306,19.185935749290884,17.54221243819468,14.489751055369016,18.723447251904133,13.629409336879949,35.405072581114105,49.328505594219926,31.99601269891431,4.484229521603633,21.36957276558086,13.927470549442855,16.794343303210457,44.9174554814698,48.36269210713795,46.166409952166944,48.6546917794814,2.202413620096777,11.56866144585168,41.10243608223133,47.94060341092364,1.4689701458662885,6.948022065695425,40.07512251177477,40.88954706343419,12.753175564444042,28.55722425626296,47.10783047135888,42.42195613646731,46.66606451196199,0.2836984852179869,5.321344662991367,33.66296167373582,4.355064443648482,28.042333099082583,12.7010374972776,22.40061684867132,42.890152166436316,43.324016893462314,26.574498650349064,28.058182500816287,34.725692633751,0.7322634127572725,15.199200135897573,12.938049838684885,39.24956575905642,28.546521592102568,43.66950321610877,28.161095307713325,11.491727798156159,8.73798071198344,35.52138542230472,44.10072409491587,38.94063392460371,32.25087668497757,45.65789116145403,24.94383055212419,38.08184056142455,36.705075231844184,46.988054851714146,15.90088177952741,20.244132812273786,2.486587244413696,35.689393540067236,42.50280807789471,22.95332871088105,41.69365406512022,4.107717731180427,35.326731351224616,33.61845394479863,11.226943739370398,29.838222829290796,7.650681192177544,4.7519533163252525,48.56162310396384,19.472994566671943,12.264298441645794,10.551726036702714,27.93109192164146,41.7646793234243,14.157518362284648,19.78563275192936,39.00949335974754,39.47009697641123,15.709630674840835,7.371459319979423,11.800514589920663,7.3154259059879045,43.864063022450985,44.65790641684908,39.90469991318718,39.34985549337738,42.024255410431046,2.5058003565402442,46.72108902515164,31.036082004705978,17.66817327466901,27.915601168521185,49.24334441164332,9.646136380508963,12.57682135023882,41.16741674999197,26.397023706631373,16.91898898992017,16.2304486521747,11.922786751770975,25.80132420350887,13.646316604077258,44.65253134193089,43.85523928257449,40.73523341279791,19.478285351285617,34.436141056777615,20.95001539427156,11.53218180920227,34.94473358653495,33.922140879222255,23.0847812410897,19.691678381659017,45.80892035816181,30.810397998037352,30.747342593522177,48.118796638267426,30.16291379310595,47.08454204492959,0.5342041227859973,29.679397215395674,42.11332255362091,15.844056610710865,7.287532112282991,41.09407700708616,2.4137206980125225,40.43000194818421,20.490968723537286,41.69132505890539,8.282544208895025,31.308404714525494,30.869548864844454,35.40707710209716,45.414733752506066,42.7444083093871,19.300448170211414,30.54865491751011,28.871455371822318,16.427686021091816,12.59018271804897,7.6003947581559705,12.12096324855395,48.7181937530182,37.92630651524864,7.327385293048416,8.0746373209864,28.003122046287963,39.6190527556632,36.3351967505641,41.60073570662719,13.454625835215662,6.389196288831056,44.2920627969458,8.038484576063375,4.513408391345298,22.36261553230484,39.356382794781155,27.28260986260015,45.470227550851035,35.6304841893591,41.125271278130086,41.99043500383641,44.40216095860049,43.294968832549976,24.74236795241911,41.84845861923142,30.085754508306927,33.86138988797255,10.596754312353662,28.12501292782361,6.278813629081936,32.59715014015762,47.44154557896514,32.2570852360311,4.376970375397848,34.82019853168619,29.041679868357228,22.068677536794677,32.476334602044,16.294412792078607,19.126977896976516,20.64727314556406,23.543719677429397,25.024218527561803,30.488893217418468,48.83751914287831,36.16591551145242,30.616716399858934,46.93183638244266,45.548676955396616,33.70598905807396,23.80805792614372,20.09942204495595,36.90246564931602,30.627583891184074,30.308253742137037,16.776409838949537,33.19965901806427,4.539132603809648,38.6523929780434,42.56507137598388,39.46386436294439,47.832314774670714,24.683239517943413,45.99916691798608,0.28554682795560726,29.873998345448506,3.770263209229796,31.91144384352327,20.979559462743925,37.90848964871655,44.02045584998173,25.991332028336632,34.838125087032964,35.364279048437275,19.141883166265494,29.05563594972349,14.96065169036276,31.996482164356067,43.955892162275035,36.87677200887669,28.29643166940875,21.303860311394928,19.569796060792143,36.67887611813979,15.109047464603442,34.48136577630439,9.077831319750484,16.141405435531485,19.35967269060508,15.951562151718912,9.469159631839318,49.123221955692365,11.586885823940118,33.38991909553969,16.232908144758195,17.305721866194556,12.55827690812863,17.94837956563997,6.92653887544723,43.07963051178311,30.459480181350497,39.669770008877435,29.654495835348104,6.656480621777927,24.277340998819817,7.600166237972006,46.596434618165716,20.74219508161892,26.925121818912046,27.082409634228867,25.31838144461238,13.302370499155591,26.635391486165773,10.344037275211814,22.246521663888885,1.8895451930572515,21.155197088689548,19.164758230517155,26.09837787746796,29.53772126454669,4.40873082022325,30.14957156244449,18.462399645224902,39.06845773551181,43.416177459821355,45.62080121523388,26.418410979586803,21.49104164872575,31.94005199160397,4.796031607948359,3.7053538014297116,34.16407543342079,0.6602802701458854,11.925421684904169,21.03871292086271,48.82630705492984,21.395712905674237,8.540731159266436,32.62381664986198,14.188953492889201,31.47501762963033,42.89228038958822,23.27740791934245,20.283122300642663,41.598368148831035,41.21767705174173,17.95417663820841,8.921014063601774,28.387271966156103,5.8663339062334785,24.824197514349766,12.599066435626549,26.926923082980046,9.05952656468797,4.311263185224867,29.95567730921277,38.35233958375189,35.6691062236621,22.22486875361507,1.1021127102320838,42.81451516232332,42.96945394097883,10.291022200542843,15.189181997538903,36.23561421833834,0.3206171247762235,18.59232102690812,49.24623862753587,12.243054882801163,44.844480494120056,38.189509479613506,8.230916755414007,19.17344929404875,12.951505904468409,25.71033347288583,28.77983510525588,2.2340740874632226,34.00376038599047,48.49693954667516,33.64673645328233,29.72686121918856,7.03378635771843,3.8319004319125716,41.43462148733538,20.132368044597538,22.735066121447424,13.966172622784656,23.819384976743642,7.376771929918114,42.916292123582764,13.724701113247184,20.3410861687627,40.862794480651324,31.554207881787345,9.81773704958464,36.32879591406418,22.124563109148156,25.173694065586826,26.76308179253073,27.910099531901867,34.59881878102406,3.690227308501126,47.89641049876744,47.788845857433515,42.6252951869516,40.62947554253631,27.71112223756157,38.431755359205575,18.83381827698298,36.59420606887955,31.11745309469366,27.41449488240939,38.65829755635997,30.665053168865086,33.87649133951464,16.40448614170239,2.478741339587165,27.26910465112834,38.723288715259365,21.37457845628542,24.353030494359796,18.755762206337835,26.10664301411828,20.25534516105878,17.40457259381979,36.910432104483924,10.166094262321845,31.724258234291526,1.6777259894129148,27.060165686065783,43.382095150422586,25.72645924777128,6.773607233176682,26.79115147419018,28.022910851722106,30.03265944421205,43.34889891637302,5.653570906117833,11.544879707133571,22.67002198885849,27.91333619709716,46.44113548159814,28.6923119324523,40.94101542739863,40.49795785445486,27.45017317565379,25.102218453422363,28.63680737139568,5.912379197856765,42.61648242275683,4.8081254968169285,2.2798823109918653,23.60523358641623,15.52457045983645,49.64962013546086,24.500443758194677,17.55683058653481,27.810375284185707,21.683885525152824,33.67063609836358,37.079922901118856,48.85487400487999,23.79926898962833,41.371374585816035,3.0521962947041015,32.69567220488074,4.458771284639418,32.707740039864476,34.670044156497504,20.08308865862277,42.065536228305625,17.984292059734397,37.064542524585974,19.432643385812643,32.32276511723153,45.04366222181025,6.1231800300108,0.2726474963940295,29.295553975115663,42.36801291312386,31.498843519661246,16.81594927289447,5.409522981730397,8.151983832045728,44.014367557242,46.481756869069656,10.898921600305433,33.047623919417624,18.012609816772475,2.1249915488343762,14.485098637728822,3.5667961099956402,45.69272422969141,36.301683683720235,19.466420687933518,2.5379250707925793,19.08297882037393,2.330855266054277,11.698282843081287,28.686779702233444,2.7493992876099993,45.273555485925556,21.223300559869873,28.81823586612565,40.25935579487555,39.03396485035571,12.104560279444343,26.686911686548996,33.28135259755541,21.151004065535883,33.49594129024489,24.151139957550438,42.375335880088016,10.21363411941898,44.864841909962735,8.864234383055791,3.668175505010729,17.00544014048495,23.08991957769859,32.39703539158986,31.10400699002026,14.359250070718288,28.29104954922058,7.6647334120147566,32.65290816526244,35.23035594854225,8.882119604904126,39.957440388559064,41.934566273461215,36.27571702685549,33.86638367373161,0.7297801728929909,20.204960649762636,44.16873340779552,27.30148602950124,8.281062787440552,2.1303465869799143,14.03179973220795,12.595967418651178,21.83709863097416,30.73130610926804,9.75554305127655,31.71202566875706,49.11986380219865,32.87815209959844,48.04845405238009,3.214943796835701,32.37489259665184,2.845120578559779,15.943278760188239,30.271101192299056,12.605455865266514,40.634413262638645,43.487778186933326,7.661912123071469,35.6231715135271,49.58359864192492,13.675542585601141,4.160749062101743,42.338922526733235,35.324208726571825,17.87727228066882,6.31750899034339,30.04609734005633,13.6002853500652,22.18880431699155,2.328508240890381,2.4205410959408757,35.51893801795442,7.626818386736245,21.1417017947768,44.30990513901669,29.343014308246364,2.5841653884246085,31.35473711417377,19.13610734615426,24.23653686724783,14.785660560925095,13.101253235393262,35.62009756294192,40.58087483386622,45.23918560078233,23.485283868743178,21.072930418713998,20.44559516486538,5.063306824000424,21.865357008709264,31.965665007064594,16.040697510280786,30.889248854500607,8.822245855891286,11.920453142939458,9.326943605244576,35.932588240085565,13.936936960416602,44.01231618296134,41.69354980394399,18.35508898619571,36.09400024282516,40.98417396025332,30.791475639901055,40.652908060694415,38.349686391625205,19.34687154038377,22.46653535872839,15.810321663465999,21.50987278693308,44.22689767543406,42.67578704224886,2.3314271634027883,16.134029375281155,7.538409439570981,8.510364158308303,14.073078361674929,41.25562008473275,19.59340312271456,41.152715539555274,6.300107714019143,47.06552991669917,29.88054355849953,45.84687719925766,38.54315265628052,7.944599201509717,41.20177141025751,13.299762242464874,12.881478091015808,44.80861306648707,31.874830183227097,17.961150313887686,27.660153806374986,8.945724708804747,25.601602338770235,40.84750814150993,5.801440652211454,19.1460244753103,35.43697310296139,5.897741612563456,24.131002300408756,11.119008568636069,40.04315779211808,32.24923397506926,4.720738279956683,15.855285943390463,25.211205860014097,8.431747269172952,0.38323511583496783,16.394268522963674,45.626827862328746,12.724665562828308,39.859100077268906,1.86694098101724,40.512397069188324,16.230128263702547,42.89177004035607,46.65715679876381,19.46727644173135,38.64498032995456,27.665524812783293,17.237631904686523,9.288683480387627,37.91152536093074,18.64370453556836,20.54684980303636,10.365904550068683,20.869463323477945,45.73599376473457,29.796025210887432,13.030658502656568,25.59077361302229,46.677445109474334,23.048266325896826,17.68954138515054,48.89621317044273,10.653357174485933,20.78941926707848,6.557327651796941,2.4602267565050018,45.24885869802227,0.4206118782709156,44.39736705723528,47.893895742914026,9.441641408475476,40.754987807436564,22.997888303556692,33.59991143482309,25.571103284329478,7.137918664623088,2.034806340539075,5.357144829018868,26.64661767496711,32.04215818654389,26.2343521354646,26.621690255027964,31.188458059961942,14.893379060175981,15.818773429305333,29.462681962394655,41.13341863755432,23.752068668518977,17.549098974058776,35.57516591873961,30.161384073267218,15.544794649644256,9.503650869602154,46.39367762185478,7.024669225769864,11.402399122263674,47.11583233169733,45.50988084020368,9.303904772114945,36.11244263928596,16.360003968861015,39.268751906957334,7.8302448112071765,0.7359348078714079,22.497646293704054,38.07630006785983,7.684182447475663,20.295721347622518,15.577023060506722,29.371748357941673,22.783181002331453,41.305497944399086,10.56866003747814,35.17845239559742,22.36825491312675,17.05933481637585,48.771621628073525,40.16266024594195,4.419686926906852,11.472574427973193,18.66134133988172,1.468281491131851,6.495987745481758,5.556882371634164,22.402911062213814,42.431057807197966,5.152290173780926,7.692967277114226,30.595366199281248,37.2029639863976,19.303157995200728,4.796107982446207,32.675860252906496,36.80551131774562,46.47818683263921,0.22269563323455976,22.1499014567908,7.278343271623666,12.10315741656226,10.39442303204573,44.57431879322584,40.06172836277996,1.8771997079177427,33.931476008600534,4.576210847063244,17.795545646802047,29.45363178268573,23.788045303804893,29.798537053304507,33.90704184002151,34.13747456531474,21.146853577353475,12.913806100619919,23.83497508665019,17.78311550069125,4.227998260713717,49.566490387553564,19.67703873943636,9.835137854501575,15.511044389625916,35.64399441147953,48.25156614902786,20.62193078255452,34.94226111413039,22.134473041017067,49.60456976765979,41.938899504274,27.20660893369663,37.85334872536292,35.51984943784922,37.16125193855909,20.800785707084223,7.384760704531623,13.918273924365753,11.480861390150476,2.615590633746123,14.731710816231125,32.32036333595227,13.67737754090349,29.17028330675896,1.0168998372180549,13.336505056184066,13.386008912667446,42.696025342130476,10.455275328658987,30.343937611522207,29.807002767800693,47.961141152816055,31.478538175154537,36.125690698694804,36.747179459080655,19.84003213171459,41.31309779165837,3.5139368754156686,14.24486371424506,19.073177326502055,14.519911502043891,27.221805146199117,40.833032281594775,31.106117519737563,43.86037204222069,15.039963526073974,41.30949293966789,21.67604898449813,20.45449145868764,49.83116154446796,43.26176681296163,10.49052761618794,34.151857890568195,14.781425800081838,40.70015787079819,4.573651166681558,15.662026827093555,13.407402288975934,17.622681056163923,6.21349731430505,34.366338310396515,14.28458940459214,18.605106353168978,35.03943820047483,28.81611346409806,46.771186919272075,24.98445239308357,43.16935385668954,10.853437130273857,10.405646605170482,22.965907731826675,40.48844835640243,31.889444342652105,16.769622143813546,14.898177409060775,22.75192952936508,48.96017494434028,1.6030531480618615,48.51399447221336,43.31698158421376,24.82450637245811,47.78803876349325,11.479323577083678,12.037856815078229,14.98518453785509,36.51036208417059,43.39119645767031,6.55648992584299,43.08263535278709,33.004387637397556,46.670123709442436,0.0498235568204608,34.9671871837883,33.96863423316686,32.535788055351134,14.638288184345916,27.19006819609452,3.6459439152704887,48.84828254010226,2.3845491486992665,18.7192511838413,30.541143399057134,4.759011057892948,38.534161169266476,22.577190971669914,21.02959646266136,7.06410395874113,25.922162892667455,19.275905918309533,0.5727640756370556,19.09806768916872,21.076581493368618,35.83190672226213,41.61413339924318,43.27108016956779,44.81726742614468,13.857811781482543,29.961145260025134,7.813679336902157,20.408530112851608,12.766121288943422,46.907563540025876,28.919622013352285,3.159707462871364,38.76563383242525,36.97038552527066,43.3190461945428,31.568748399008793,26.857403210553432,36.99981050188138,43.307485722070794,16.855693355504776,46.72978914319141,31.932287066000097,23.21446619619143,39.97310648714033,7.923331405962131,24.904780171038343,36.92812383557143,13.792999043155085,43.76134546068883,49.37704074365976,18.66045333676505,10.924870416307952,12.123145024910276,34.07205195597322,16.005819526123933,45.788800235352724,28.972681649554787,15.910957707210027,15.37972273713738,32.26330739142463,35.17334146544502,26.36895528654648,7.310284084890418,1.13278031423506,3.8891295070250242,34.193573855476046,6.976977739485257,35.70695332855196,36.23966164494637,30.01409833280688,35.181617847927704,21.07018926999945,23.653142035892394,43.74519620784167,43.61298736494722,41.42757071143423,11.302288740900012,13.65332989329806,28.88554122654702,47.77670187754758,7.73097123696701,8.121566509087764,7.499732209332688,35.145773147641115,22.237739452661344,3.302587087279474,4.413919979040736,1.958687048179697,37.71405620631491,26.21151531731767,25.746207292406808,25.410718988980474,47.021742911700784,8.921036538506355,3.964657159527629,44.812993966755556,4.183887004450348,30.468288352815165,7.362668137842155,43.3138928026231,35.11278815311029,5.083331586409978,3.9384564297268443,38.98409969906663,48.53470526180611,42.05718675810277,14.175107548933397,39.10513227957991,4.129704073303353,17.556639397534834,25.841772247254312,21.834606619607435,25.50620106543858,13.077295571073321,48.83953894215918,5.454793440836914,8.191104984119402,42.628091978859594,48.04379704271914,5.721458395722001,23.70693897918603,48.66008985062184,31.62792403167234,27.850998530670612,7.925740119939261,4.867154915703031,3.0439400369146052,32.43937244129314,11.738487970032285,28.860925433337147,15.222080026877883,38.42229819371866,30.02646134517697,5.769178090583371,43.87877739547776,3.2418163632889407,24.21942719126716,8.221870600916981,16.83443465842163,45.109934217281456,46.237255115089624,42.32809500094511]}
},{}],54:[function(require,module,exports){
module.exports={"expected":[-13.518858130837593,-7.4786147796183995,-8.188624085908717,-7.484910313702101,-6.64520022760928,-9.076149442659029,-8.183056719479358,-7.252954111111322,-8.610669196915419,-8.964447318116445,-9.500060634209472,-8.356163679767612,-8.631603723738477,-8.102400338887083,-8.600132440900857,-7.48874550318879,-9.69463846153774,-8.803606058126089,-8.67163542218583,-8.989145396700145,-10.65213434810007,-9.806659891771021,-8.114308766702676,-9.95457977948266,-7.46339724834529,-6.931123895389264,-7.443439132574117,-7.415164613753689,-9.7530839701365,-9.404298442972946,-9.162095449592544,-10.083773046964867,-7.578580629135995,-9.268043791534765,-8.662085538560378,-13.095052192371517,-7.790246287129575,-9.09184914562732,-8.992897803671475,-7.198909695169716,-7.751396822158746,-8.74991609358067,-8.900054205397266,-7.7899121109803,-7.457740635634114,-7.575501838328934,-8.019317087784747,-7.144482694498212,-8.189325257186525,-8.103103053976863,-8.372091088111295,-8.520706106558277,-7.371447196261588,-11.170487889549966,-10.025876485987546,-9.480352979181284,-7.973969432700542,-7.837933336054164,-11.838473075664227,-7.6500806603854175,-9.990089509297919,-8.342266024129737,-8.277916478101867,-10.119558401266891,-8.018970517037115,-7.910464743042175,-8.31841082927516,-7.672616269649051,-9.03871413639086,-8.72278938259255,-7.675953691764197,-8.493095121666178,-7.256210233948927,-8.803597617995496,-8.411644387883758,-8.101748616586107,-9.821399207997707,-9.452602228968242,-9.311142039936632,-8.659459044004167,-7.387393568146532,-7.553181087639586,-8.907263769959915,-10.231666088377818,-10.293811505263752,-7.578092030810873,-8.04457903660343,-9.708584639624624,-9.719571924299057,-7.79497860167911,-9.382062375372563,-8.100224574486077,-8.592978401435388,-7.710717418149336,-8.51222037597558,-9.555524624282008,-8.252389310765643,-8.859190607157108,-8.548908659821617,-8.058914313578608,-9.250754323132881,-8.150065942712642,-10.776202696912323,-6.921755754446856,-8.675885285450091,-7.345268254255631,-7.939608186106096,-7.9824258281226435,-8.094305419933065,-7.6839020972475875,-7.773369301529435,-8.397843312203953,-8.732147063547535,-7.956458452978474,-7.888379224457498,-9.05358344046978,-11.145901727773612,-8.707690456279156,-10.629243086069266,-7.496491638133987,-9.173428634205047,-9.010774137799398,-7.309183573460555,-8.287865150894298,-8.849758679174919,-9.711291576159471,-7.52647769713764,-8.078396788351446,-9.088767494927453,-8.019496840917231,-7.454626967005049,-8.997728495403459,-9.03096795736605,-7.795686833525159,-10.290907810988337,-9.44233746376905,-8.674344635232625,-7.358253672957728,-9.633277390855397,-7.805558010903152,-8.404146008418781,-8.75218715160053,-8.54775063777107,-7.644765323878925,-8.116907653656584,-10.349711720247157,-8.049950264891553,-9.202082363358558,-8.28517612058594,-7.01268861488184,-9.663188396479685,-8.785647688666648,-7.589365870567178,-12.509810506389067,-8.507893375778417,-10.589628085069132,-8.550772710259118,-7.656911167146461,-7.672467366818076,-9.403564378691165,-8.633336952349751,-6.79273197839268,-8.01737030601361,-8.205870537597896,-7.968212559480568,-10.221391651764815,-8.419022879886304,-9.277066192193168,-10.114453120588799,-8.57589625545242,-7.994497424171984,-6.697233607912537,-9.226361339938865,-8.350112568968576,-9.397900279233873,-10.189589901989466,-8.907362070972834,-12.641542636226118,-9.733671862117745,-7.8024531622509485,-8.564806071802309,-7.88445716859121,-9.869944262855709,-9.20078548292344,-9.282142017468011,-8.385974170667831,-8.676900638069341,-8.148479333963373,-8.258314042315105,-8.294320867207619,-8.336055962819007,-9.111514300143877,-8.25518321766441,-8.507049710751144,-8.355945551550043,-8.471210800671772,-8.809020251076316,-8.104272041029752,-9.45677948702635,-8.543820905699143,-9.605385978248226,-8.638265461406345,-10.359576829355296,-7.012093779643232,-10.144688748221018,-10.069535378147828,-9.870926117118612,-8.941524113306782,-8.107520233738704,-7.957406976283963,-7.844169406919878,-7.422387604613091,-8.767444786031747,-11.0122854272575,-8.861143361109914,-10.076592258018898,-9.826180310554722,-8.308387617858692,-8.97969541954507,-9.08636259912268,-9.614620115709812,-7.864876337488852,-7.908780731411189,-8.577707100294846,-8.643221081992404,-9.3821595832739,-9.726565711197535,-8.858881707040165,-8.768992433548952,-8.335498525450053,-8.615594359907178,-8.648390552064232,-7.687432813254128,-7.075160387907071,-7.470285071127195,-8.974041321131027,-8.675174882871064,-7.474448229659949,-7.290582738520007,-9.063729316441307,-8.78240262006412,-7.768614627715112,-10.131416038422623,-8.678925077964275,-8.327613251926849,-10.379374408843953,-8.283529838050733,-8.785198171875583,-7.900754155695502,-7.911593168330998,-10.546638814017891,-7.904439785249426,-7.836202470098389,-8.064072326354509,-9.615774006478766,-8.235706176484307,-8.00900697763016,-8.675679817687934,-8.757601831391682,-10.739042176665457,-9.216592904533549,-7.993694650334092,-8.351724383115807,-8.605777490378536,-8.590973174219629,-9.834662924543096,-7.289009336739458,-7.3229653356845805,-8.026892182180148,-10.782393854163583,-8.95923418116518,-9.436886107247663,-9.405893119461192,-8.4746314466928,-8.215447987378028,-8.77647158416146,-8.026406898389398,-8.674745619958982,-7.784047822044354,-9.411718176619209,-7.9424118270912505,-9.118849161091848,-7.9192504567435655,-9.060579994738053,-7.466011028621017,-7.675861470421693,-8.759505280171133,-8.293093532188713,-9.524872251103057,-8.297292644959063,-8.37466548844293,-9.906763182203687,-8.762624877759944,-9.287162840270549,-7.7456123844968205,-8.90208202527117,-8.483029896325636,-8.458111988025436,-9.025967411462261,-9.428155718024087,-8.740642910501503,-7.842937210777434,-10.037442628535263,-8.70454706291358,-8.111113227619906,-7.31296441045545,-8.272912291020594,-9.403229737831495,-8.57640214544968,-7.086008736924333,-13.141498494924504,-10.956408137824974,-11.81996424567349,-7.921548528193392,-8.63486627703519,-7.616025395342287,-6.630872229121586,-8.389782348449632,-8.624859318242482,-8.853688090722983,-9.00671508315275,-9.17463498247875,-8.027037811015655,-8.702109879823942,-10.38980275771928,-8.328839841633815,-7.84183539361565,-8.310886489856953,-8.24507683555179,-8.31614459570805,-8.0613221467,-8.072955615253083,-9.565414626301665,-9.554317748133071,-6.95321428496324,-8.934922281612964,-8.868022545326852,-8.802934078494257,-8.430878830833429,-10.014903797949316,-9.14649833837865,-7.229851994956897,-9.892229357017722,-10.642499407413792,-8.987304016633772,-8.480023645560614,-8.750022529919265,-9.3736044588357,-9.142270305736762,-7.89146320205154,-8.285317736382751,-11.262349996641445,-9.344822107389188,-8.524207407109737,-10.617141915244515,-8.746300522313508,-7.974121720428709,-7.483274104254036,-11.008692599027828,-9.84237592529131,-7.996486962280876,-8.785220447065765,-7.756836950800219,-9.977628849425365,-8.731468284431632,-6.907817431735577,-7.047484857516309,-7.58146913085994,-7.898446832523861,-7.746789364779817,-7.748781094357107,-9.863401200837963,-10.101958286984278,-8.543220050902073,-7.517084976253031,-9.278959732852432,-8.457417644224604,-8.986559196995346,-7.551200822011946,-9.359589378441635,-7.874544050800516,-8.728321072447681,-8.384158690765343,-9.282077245348894,-8.581032599773735,-11.948087532311696,-8.722757898078253,-8.48612052530536,-10.70316855593809,-8.734266423758164,-8.155595799425965,-9.07424685102476,-8.640772556515982,-9.189552842482213,-9.081440335499058,-8.259905499517586,-8.434142513397472,-10.24794312256077,-9.176968902939086,-8.182352644953506,-8.968990660785309,-7.450590088264942,-7.8937093703235295,-7.075051822447303,-7.408606181303665,-10.683132732405722,-9.787635302284144,-10.098589668379322,-9.05065722300663,-7.968646127724382,-10.679177563680808,-8.203081622819674,-8.52859143388494,-8.584129276597553,-8.838021896904797,-9.17569933497557,-8.747826133614806,-7.095080539551489,-9.167791936838798,-10.31012809616356,-8.507047434369625,-7.543983755061456,-10.082518864585586,-8.873623504668137,-7.916950112379073,-11.046869482261778,-8.492746450747882,-8.249736478888133,-8.11729369021254,-8.203620831940526,-8.51604711230385,-10.602073104616816,-8.870731057382725,-10.796461486722128,-9.850859926652538,-8.666177889076963,-8.818059919486949,-9.098661319876266,-8.27366483464972,-10.9392516884502,-8.856199081984037,-8.902431035019898,-8.19141339264646,-9.109979480388633,-9.569229876216381,-8.247099284438963,-13.311060626519913,-8.18216005238706,-7.984722031322331,-10.681433602534687,-8.319246904329752,-9.015894565535682,-7.448678830231886,-8.781326411771904,-9.290746910397859,-9.261637626373108,-9.916786255031807,-7.492149904770966,-9.379562092919736,-9.262317890519274,-8.111053913953185,-7.867012517766972,-8.868646271989705,-8.446710410042618,-7.788423272696426,-16.31927371530204,-8.202885004895606,-8.538671507120043,-8.020981334273959,-9.20175382216087,-9.21857241580643,-9.362594428816914,-6.976914659184739,-8.61869164032986,-8.443259104875349,-8.660136757307683,-7.230860690635183,-12.658002956593386,-6.840011588259741,-8.043015191990738,-8.960273119363281,-8.293558068673537,-8.168918647705299,-8.292381983927454,-8.831664355194683,-7.321420843948278,-8.26674540723549,-7.317031064877051,-10.584240911167628,-8.520997092270335,-8.43230457764022,-9.186856325756025,-12.056521542552494,-8.525054901519148,-8.762106392252768,-8.719389478703802,-8.46889499957401,-8.156909479424716,-7.056845688144824,-9.243742026408144,-8.93826528143476,-10.256247530835946,-10.688027317944142,-8.888524675906488,-7.517542281470492,-9.66345961587756,-10.8713599616554,-8.787178931369922,-8.403078823634115,-7.43379973639032,-8.70156718328607,-7.8148713126803715,-9.580883400997472,-7.092547692712155,-8.230230570233005,-9.942632024051672,-8.434113157031215,-8.483253267127612,-7.645824209119935,-8.39354984757309,-7.9120590573157275,-9.434402346696452,-8.292843879379705,-7.7122355589943545,-10.028749329962649,-8.769464675940949,-9.105139925479989,-8.111476692489031,-12.08352038235179,-7.091347558901109,-8.82106335640244,-8.651702825994342,-8.768492896327222,-8.33316750853209,-9.532255912400984,-7.110274526331661,-8.230539861154254,-8.330371232462053,-8.44339055273247,-8.426335681677445,-9.32730248454934,-8.450679134345457,-12.130669979849921,-8.069953447252434,-7.69321078584153,-7.729680852385201,-11.987061470923454,-8.545413974406548,-7.203151387771477,-7.819900397750408,-7.006891484624641,-12.387395979214878,-8.099856203086272,-8.107243330541918,-8.174355692473949,-8.465391742976799,-10.956968003759394,-8.243129872074277,-6.960069308274609,-7.119022110658026,-7.277384970039456,-10.470770848168023,-8.577458099608023,-9.837775181764819,-7.797177066161557,-9.739929725824103,-8.090912600051201,-8.997568543875264,-9.546717752547455,-8.85293121660926,-9.09434035203722,-8.997369621371785,-7.397125298634414,-9.288521789434386,-8.821409877399732,-11.836635008848807,-7.407299130050766,-8.483605110216072,-8.796272954950172,-8.283048345839592,-9.284242993267057,-8.518156682431574,-7.168030939767928,-8.29341588157623,-8.01118881693349,-9.214053186310448,-10.908520828758347,-10.166648476462893,-8.505824242397287,-8.006978371346262,-8.665341730375058,-9.298579972970261,-8.539263835678902,-12.487617010608492,-9.903961522218545,-8.672580557488573,-7.804336844411395,-10.296680193406765,-7.909799388099593,-8.392690434560206,-10.756702665793371,-8.795911744031011,-7.95620720290988,-11.39579772351631,-6.763936535294464,-8.00669378413352,-8.259731434325417,-6.7507274702460744,-8.88496311099958,-7.486109865608775,-7.848015440026049,-7.411561547437364,-7.653796960945712,-7.90389243572154,-8.70904809133641,-10.808354799242135,-7.396850347684392,-9.128293328237033,-9.61645249327569,-9.427540857768841,-8.356936660344449,-9.192231196974712,-10.072509398020598,-8.827290525437816,-7.188801968928346,-7.700407481469647,-7.539154380029345,-8.451258170175556,-8.133619385182005,-7.623748006069546,-8.60806455521578,-7.33504719602281,-8.855777248714373,-7.547728550361713,-10.108032855869052,-9.065919627193384,-12.87698533380003,-9.031259774281676,-8.72849700750152,-11.347289113251355,-8.589790393917188,-11.088023257791116,-8.374075970628656,-9.221592114931791,-7.841286583370387,-9.479936511821084,-9.064875654259442,-7.5733408964196975,-9.441998508910071,-7.850125694969229,-7.604707791749377,-7.98815504687517,-8.33348966184679,-10.499674684718121,-9.116668974697433,-7.086039232559218,-8.537437060268882,-8.311603662687803,-11.318059930564557,-9.47118870042848,-8.601914267861437,-8.614468682324791,-8.082524313017561,-7.787124997289491,-8.444782128419838,-7.227461619280785,-8.187333636786743,-9.454760141867363,-9.823471725774471,-7.845900439660497,-7.436975944645939,-10.222908025375537,-8.601179839270266,-9.191469954764727,-7.4524378856804345,-8.029236643225241,-10.144112816924936,-8.004910499576006,-9.627715805695496,-8.11993539777743,-8.142930770885924,-9.088768977348378,-8.200933930993733,-8.146783740996662,-10.921675728262988,-7.77802839614575,-7.488489850357221,-9.89900463380188,-8.377616498714112,-8.518986367172461,-7.931943490403029,-8.904732967913432,-9.092546927546657,-8.047076870462304,-6.908570198934476,-9.411783386044132,-8.275835739985439,-8.264975827077325,-8.45174532603242,-11.290366897456611,-9.17324734698056,-8.819622353984458,-7.943584301320759,-8.28887314273985,-8.36466343179137,-8.378014385470532,-8.434480995294013,-8.265997689380121,-9.362624729725756,-8.133249044972743,-8.864435438847726,-8.141933774980366,-7.956517382102106,-9.271472738195651,-7.7869886415261025,-9.728709444610004,-8.881025740732648,-8.188365928881746,-7.355759672299144,-8.24605762227529,-8.835604871377395,-10.235548372593966,-8.009779977163786,-10.398771426092262,-7.024380369514527,-10.09146340638964,-7.33458655264472,-11.21143312006556,-8.146061433042831,-6.790151530491821,-8.442921790833957,-8.950243917318035,-8.197600929405338,-8.022907213872713,-7.4753473338576235,-8.164240822508098,-8.698504906547988,-7.836839494827483,-9.331539998498135,-8.627045917710168,-8.771352691128357,-9.222988088925835,-8.930703082367344,-10.030669043564648,-9.507464251045972,-7.954819421975898,-8.911643662540634,-7.681232402260562,-6.7378251645256135,-7.8183255216862255,-8.208272622292407,-8.22083263879905,-8.086545753522302,-7.667960439055023,-6.672475868785931,-9.68444459640557,-7.761730252561971,-6.929231502579518,-7.672529056137423,-8.308758859007565,-8.844450832790255,-8.834936545795541,-8.424946842031796,-8.514158677164781,-8.075882330398029,-7.804988956150678,-7.955984527490054,-9.940010531528676,-10.542228303384082,-9.07954072931293,-7.478603370739172,-8.399384445362779,-8.85228264655752,-10.947139491580055,-8.386426045369987,-6.976230161026296,-8.295695586606373,-9.51163937245517,-8.32192699569959,-9.042273896673782,-8.115538285055576,-8.782941202934351,-8.95880442367903,-7.748621309550963,-9.818846958068844,-10.482652076098388,-12.8349305232555,-8.664221058260136,-10.509878477924152,-11.085241357920182,-7.953099309090166,-8.14698444615609,-8.167789772316937,-8.474288220475147,-8.370546818249435,-8.33367075158065,-8.901442105722777,-8.628123046143344,-8.161898226279598,-7.782211795220626,-9.547591633405451,-9.13660183225036,-8.672921815328385,-10.207834167764103,-7.283434776131588,-8.687690672491232,-8.622954858695968,-8.40914617791245,-7.892489609253497,-9.20412357456651,-7.296417651248966,-7.456565418506635,-8.93078825893534,-9.635578829064933,-8.132873418305405,-11.814313629470726,-8.382612260002507,-7.999353649600813,-10.426069372146038,-8.89687377479255,-8.097606831762507,-7.751975453241537,-12.076949873401654,-7.268478807061438,-8.307214254262787,-9.235433010402181,-7.305258954855183,-7.994806654419067,-8.640771346486233,-8.516847063453874,-8.500145209283517,-9.079241282980078,-8.928896962326295,-8.434242638405378,-8.004816567862331,-7.539469533061704,-6.79555868789184,-10.125251249068427,-8.529913466568246,-8.435577817378778,-8.038098679914382,-8.21616301901441,-8.374835246032877,-7.820895894579072,-7.732868597336058,-8.447554015001176,-7.572136854035932,-7.234054079774722,-8.269742426781377,-8.92590443146176,-9.741336920861798,-8.715890268482886,-7.191174212860105,-8.05727608963488,-8.231268960376967,-7.99737465147015,-8.841943868115997,-8.548079482376998,-8.526572382209824,-7.939278060071732,-11.301259881829791,-7.841146484011487,-9.20128944512549,-8.7146474088223,-8.822011223187964,-9.38870557626756,-9.817418326062864,-7.353170431154121,-9.02515115575168,-7.440463867695959,-8.645747229233393,-8.204713015667043,-8.30034925654107,-10.366851167338423,-10.587926735603464,-8.704006099956716,-8.27698320570834,-9.828563592870351,-7.857052019918015,-7.0298409933862915,-7.41559553684889,-9.653041662127437,-7.9418069387330235,-7.764626651015334,-8.49300690009078,-8.780258730333557,-8.864346297148519,-7.961626578749213,-8.865964587730362,-9.337350300938784,-8.491979468625832,-8.362878791359574,-7.683899034665027,-8.911320607054563,-8.682668180137298,-7.379988100737055,-7.525990887641008,-8.901937857826368,-9.373651352770146,-9.28491587702103,-8.19309642535486,-7.726686218932979,-8.717342856273994,-8.607777064089976,-9.143309008609098,-7.9923135297580945,-8.40781935029767,-7.613564371332789,-9.956673436602188,-7.411081181176591,-9.394056830516197,-7.993951389051388,-8.813938960041316,-8.169739161242463,-7.875558064358249,-7.835062980449587,-7.734718443052934,-8.560042925581342,-7.9304661166979455,-7.984040133100373,-9.209752337856484,-8.946804771707187,-7.423982648922198,-8.402436574206696,-7.00331528052302,-8.112010112503581,-7.4114063235588965,-8.954346552102432,-10.681719195206188,-8.896655098507516,-7.308584635379944,-8.71863389272494,-9.14116943260706,-7.62934813717532,-8.67060415200026,-8.474708707296633,-10.745399999172209,-7.694121847880002,-8.295646072991419,-8.915118569912572,-9.553932943999115,-9.115010209684133,-9.085250535221231,-7.815648261980871,-8.903205412634367,-8.577732660004942,-10.0166893261058,-9.88642537748398,-8.34179503375926,-7.353887077859587,-10.212712237559996,-8.78052614806262,-7.991527036951614,-9.397651609089966,-9.386140687425195,-6.478549334555513,-8.757017791356963,-7.326894325199996,-7.837058044531187,-9.14463912255564,-12.150774584028841,-8.307118376476271,-8.102031001778176,-9.765379578639175,-8.854050679998515,-8.699138392486725,-9.377799586716392,-7.890636156701191,-9.264262284660523,-8.635682553864852,-7.703488783425944,-11.122482370819592,-9.638923361802636,-8.105470022539027,-9.251419915298515,-8.65777543859857,-8.567586797203523,-8.80985342321065,-8.193833561897343,-8.361555622428693,-6.96304033530133,-11.14107105236197,-8.243321775101043,-8.870253563599388,-10.28526640481976,-8.670799746106255,-8.411576003688374,-9.13435600270093,-8.480201898873558,-7.316122274146846,-8.51600765467768,-10.143141354694166,-7.2645673803656905,-7.6254595717062985,-8.001263012599221,-9.062972012939184,-8.151874952238634,-7.956484625890813,-6.668767526626184,-10.936954706194456],"x0":[-12.657913445878544,-6.533342913369911,-41.33822982948859,-27.03224443187482,-49.31639988817283,-26.969605044461844,-33.00540613816827,-47.26048756330956,-12.825080269496137,-12.038693230287523,-30.738466235962935,-25.359850242258553,-44.57055628708706,-34.313169213427344,-19.705970145251893,-45.89876068222192,-12.392340883187526,-38.55922421641217,-18.84073104912233,-32.430384780649526,-15.450088505913095,-14.590883136510968,-12.541366222949279,-26.179315485834632,-19.03414123300773,-46.31382315655435,-21.090229897888246,-14.309492278078363,-5.736660745488676,-41.16261293871328,-0.5454133570997999,-34.51591454217269,-19.64846105425,-0.01887008865116835,-5.972021000517225,-31.816841058635468,-18.66524120062354,-12.057554084482158,-37.336110217448706,-38.766325700210935,-26.388770726947907,-22.047289412704142,-4.901600500266512,-28.198501984519396,-38.262208333383974,-30.504072591539476,-33.33956444610791,-29.440771561576263,-15.644783760085712,-18.098758114331616,-31.42205069138717,-43.61976937644204,-8.617469054999527,-46.91557928892528,-5.212482615064873,-40.387259397023115,-23.194342367404573,-23.600747422489242,-16.10156137812695,-29.95722729706003,-44.2860199876344,-11.726378436957264,-13.642383748998476,-8.01741899888504,-26.670154253556998,-37.34625394499511,-39.682626326314164,-49.6619652614264,-46.96460248780583,-27.85286039043723,-42.62129385115141,-15.344882473138199,-21.438890860996672,-25.037774914519606,-1.9736785650530275,-41.75719443322442,-8.350596377851815,-2.298467355664946,-0.23090918962440643,-20.050274219419016,-36.50219708968623,-44.571845212701334,-9.386865379356301,-23.461785836104298,-31.38023068668542,-35.56214738426866,-47.76333889383708,-49.33107195436367,-11.854318778980444,-17.39864614105847,-20.03427082604208,-33.65294969268342,-43.93296551845125,-31.563578089083133,-29.288429327676567,-20.917552398635554,-16.433082435895862,-13.808909143358573,-23.12987777656883,-3.6085307254718146,-25.959492442412913,-49.11458245552407,-47.838796125393436,-45.69282452911051,-8.249476812097766,-25.428408145720805,-42.43484857450781,-49.12264238699496,-48.170442961304836,-31.211346083151458,-31.522519717384533,-36.96221916441274,-28.75007682675963,-21.270656535976695,-38.20644903357295,-28.281006195293912,-28.28622307359705,-16.62763746851388,-49.9581663401142,-1.674918758990085,-19.324465846629845,-33.03642881164205,-20.484663450759953,-12.220323394814436,-22.516487144021102,-34.90246865976855,-36.579341650002895,-6.365295905410062,-22.3763358747743,-37.92498373527615,-41.3085036078452,-7.417456931271915,-16.197569662452203,-32.76370427823145,-31.30303248900993,-21.50714500674643,-28.293744057659577,-22.9865502727278,-0.03287778111625839,-37.08682913347325,-2.43442890096941,-37.771176787574845,-36.37415950239965,-17.933108918299624,-48.25023515971849,-3.4679927659997944,-28.162655633395183,-42.65701501391887,-20.619396910938427,-27.181875948822587,-5.218538732797972,-16.222249501411625,-32.670856044065246,-8.559553972790768,-22.224335466783383,-43.123554758567,-8.953403325130138,-8.18462965408424,-36.672105021203016,-30.469276536861123,-2.183360139973034,-34.52243942753521,-48.46286830072971,-27.83600190261358,-25.827564523673463,-3.148244895786856,-31.67582320623016,-47.557194103877876,-4.970106751912939,-19.692198667213834,-26.05486323837648,-49.26500741831548,-8.187450646110205,-37.44753499721186,-29.208356367804466,-25.63056767880991,-12.009783714259736,-7.08106480632118,-44.36476208333375,-10.411430409297395,-26.00143262240945,-46.19651098587719,-32.13221507479048,-47.77976356687277,-6.436668878704454,-31.72664933641014,-38.217067628224,-45.325625981889914,-22.072468536188715,-35.31633922213588,-29.578834838947255,-23.618901043249053,-49.78637691066812,-36.93943964959777,-7.666726145973435,-8.731804020384947,-32.746088325810405,-32.48341307681187,-21.756957812582844,-2.0872498638779047,-44.28165237361995,-8.449555343899274,-19.73709654883088,-45.98938557590202,-39.92616974785614,-34.01187466707226,-17.311239580735204,-12.335515388663975,-25.94832283784446,-13.48886772820289,-26.38012674299407,-33.12271344991342,-13.76790353018742,-2.020668849041374,-17.363146877308676,-6.967104731690366,-18.930074800051898,-0.9019736104115217,-26.48583224796994,-15.735558910133818,-13.077291200604325,-10.405400472441539,-32.78994155080888,-22.497769458557805,-20.127327760193182,-44.90832769325016,-7.933473509660994,-14.051495322885376,-17.39839638337021,-15.33819217264214,-23.823343595319745,-37.16415040722024,-49.13004933111055,-31.990016265018195,-43.41340107673419,-45.64222493087565,-9.99872707119074,-41.18431100150306,-22.459783310443516,-30.2700891183581,-18.51327479608652,-21.721446482195926,-14.323358981997192,-6.82277335603133,-18.2308368138572,-31.01619877637276,-17.965827433824856,-11.333371164876338,-40.637542881034406,-25.537154424554252,-29.617393096175114,-21.789573992664334,-17.436359523000057,-20.782960550820405,-20.31636578335789,-21.936685560210478,-32.540126910145695,-14.096573324797202,-15.191609134169648,-22.354757072843846,-1.450139474444756,-38.26142844543614,-38.41116068750474,-8.305783944695499,-36.08821855763211,-21.626935238416834,-47.91399622825283,-44.622689272450664,-11.642710535138711,-33.696134537527776,-37.737456466745535,-40.24435212560883,-41.26234574438742,-0.783249727350599,-36.40015192308238,-11.482568125557291,-24.704734507779914,-45.811417215805115,-2.6387031842400543,-11.978614498734153,-27.427342714056902,-3.5266060374028907,-17.281774029695672,-8.18988276725281,-49.78489182795518,-29.302564426341547,-44.31357212418455,-32.40812297633722,-49.78193114609905,-19.14858328122271,-37.4780843438783,-14.38602257647662,-35.75377084398965,-8.30671562604659,-16.762437078765792,-2.3051097199961013,-14.222635377228855,-15.957031820710544,-7.728420233818579,-12.5781732007476,-2.4756898105903535,-24.65289528770058,-41.29179759911018,-25.355114462488547,-35.00572901565118,-18.081254719504702,-11.208660534549807,-0.5453297328392837,-29.732889711718403,-26.1452457682513,-11.540943991142516,-37.910814151965724,-1.642795632872418,-48.68681862640582,-15.886355372746797,-43.26648728466923,-49.260995607196364,-20.005857656803105,-14.617691375275577,-0.7549176963824955,-4.274300079515358,-35.08339494456062,-21.157007001522253,-9.73665993438958,-1.9082447487505538,-38.21226986026174,-38.84072591014919,-9.355370492880366,-13.979919224573756,-20.10006844333786,-26.722654137208202,-25.403863677919492,-2.7832641913484113,-18.383261399485097,-44.4242958041749,-2.2376691252904424,-18.76007423968018,-34.44742879351299,-27.02471905649666,-12.850053215140589,-33.68275904633897,-41.2007180743404,-18.810169461106284,-16.93779447611623,-37.95824389444056,-41.40490562163113,-10.772680238468658,-15.17679226361135,-28.59860242238582,-7.67918279380252,-28.85027258195364,-3.6332222187772323,-32.07495204735503,-39.54975206345015,-48.484597081501924,-19.276443848125435,-22.141238099824267,-27.78755302943732,-30.626210322276272,-15.42222582695113,-16.23505735076187,-10.396599119712679,-43.73146561998513,-27.068212215247577,-46.20692515717829,-35.79127328082774,-36.64501598076476,-42.737893897991576,-32.801263521525804,-10.58255251200977,-26.923091153110324,-47.56508046109945,-4.975054358385145,-16.101034826212878,-31.008245373032285,-3.097394019148636,-37.48014635963459,-19.835095196740603,-44.08946038678073,-44.33974268427712,-23.781092080376574,-10.774439464161134,-18.72712014478044,-6.992394480629994,-5.60052113544347,-7.037339571127266,-31.17850320738855,-19.68549304407472,-15.759164915053802,-37.218974104040946,-47.150224692115984,-15.089354516240972,-30.278314095641967,-2.2187044685634705,-9.858660270612418,-48.021054361201564,-18.63020165735374,-1.7067621950521472,-35.25495580340466,-21.35953089654733,-45.905318719543956,-23.149854119244708,-29.266537372456725,-32.16203203381583,-39.107016526946126,-13.026467215822112,-10.873640210386936,-18.83629958883085,-6.316688936743676,-10.442649927106718,-8.603782660701132,-21.130818180868317,-47.82548431643821,-4.203606094452594,-11.466649372393833,-37.2542272536907,-38.27015696981437,-30.867012272991257,-17.284469226246557,-36.23482120251994,-1.791224086719756,-8.264233136572752,-32.2718660533453,-0.5849014050201329,-20.192294842808778,-13.688843430533638,-4.330946778108502,-30.148390634075227,-29.74200384455994,-1.284745777558849,-11.667814938019749,-28.236202039718037,-25.422957423727375,-37.93169224569998,-49.528428647860544,-7.798694179012444,-22.876122264355914,-45.322660975455676,-4.915519886190345,-15.789831002262622,-9.678638542887963,-0.8172328545530183,-8.446841258174908,-18.917415813435547,-11.92953243619489,-1.2862057911414926,-26.17186514340939,-9.852704374111166,-7.84076442292494,-14.735133660246614,-37.698282484923375,-35.459021448171725,-41.493012819109445,-24.91359091417805,-8.526035985468827,-38.72044497857034,-4.157786837252475,-7.34065701132992,-20.014329377277264,-11.216621800649406,-12.511240462322071,-38.711324589459686,-8.189636204208162,-34.442126611832094,-32.37934394011782,-21.803521293164042,-8.547378617895996,-9.617355789357685,-33.00069343722954,-33.40825917468939,-1.9863206568782488,-6.152436952706353,-25.587639489761926,-47.26367981939896,-0.9879569466024307,-17.367968525702494,-42.44458214663279,-2.9336141129124194,-32.878647592258446,-9.665565734060044,-12.79074444068884,-11.200066860642533,-38.90869489849277,-34.860532702654545,-36.51425031208848,-10.308793498395442,-30.55618101832036,-31.066961375800204,-30.839896347604835,-47.822039030815,-0.9562640363611874,-0.5879891195823217,-1.850759373079247,-23.22221591851248,-17.684508635089202,-22.170811717763428,-28.052574685778332,-0.6984310009668593,-39.6876841747108,-27.140627840846776,-11.17369049066217,-12.750158692022895,-10.119327811982725,-7.413490254152954,-38.7117434864659,-46.652875735216895,-38.37582056197907,-16.47783574559698,-38.786413660926,-45.775704517959824,-27.17767919548404,-38.27945744944973,-13.746752337645962,-38.031626708688904,-1.548863097995512,-24.71809064513508,-29.863685170726328,-43.279855725099495,-44.37672598501569,-44.09161676784519,-35.80242193555032,-35.667022709117354,-43.56272919067844,-13.89696342216541,-16.042163466581982,-6.226194677887875,-43.12210232738062,-45.54703590309014,-49.435014834896485,-47.50550747039267,-8.097231970395768,-11.263462144051605,-14.74961262207869,-36.79151107533316,-20.15567034332706,-47.97991723716471,-28.22907025293555,-37.66829334084959,-28.647657116129153,-4.133610111053143,-2.285433311404317,-7.291601144655235,-32.37121318372126,-17.68177389944514,-3.164651865374035,-33.142847971620746,-44.475832386483084,-39.893747742729445,-45.401001360061514,-6.75075212749735,-39.61051500780199,-7.8939970157338895,-43.41466780713753,-1.762134393470316,-4.729453873310597,-6.495297775233189,-24.630548917202976,-45.631792949142024,-37.92316553061591,-39.10300637265139,-32.98476693817699,-25.67449619026401,-8.133028742680581,-6.7747908203576905,-48.30718009425393,-12.67501829902804,-25.412881699175195,-34.19819890729664,-28.756307044011066,-7.149170564049257,-0.3238726029709871,-15.696344571931087,-43.59227391217782,-28.124711638114896,-2.146457281139591,-3.999853941380316,-33.15587572026295,-47.3786439740588,-39.021831317505374,-45.496399139929224,-10.400151713507721,-31.253731438601783,-49.51030334219729,-23.338511358561753,-47.86156894703994,-21.14760337564232,-0.5140408911034067,-9.212993542169457,-3.513907672292116,-46.27972183615089,-28.628869609837395,-10.398584419767598,-33.47822494386119,-5.724609832565486,-6.008088561379033,-33.41162820352947,-36.75660205650699,-33.11212868681089,-6.056312311945444,-5.3733551839673215,-46.13831836512793,-40.9761375127755,-7.6011980688778795,-34.59537430058287,-34.459894309940374,-5.791537492746912,-13.640644992926054,-33.68707283777857,-23.55123310361964,-36.58532150239494,-10.737379709660932,-21.9508125875125,-47.989301139811715,-1.1870906962302419,-25.000325183486048,-27.66794637615273,-46.97914310571542,-14.983361851709764,-4.175672722185164,-18.703971472986215,-23.433169963545307,-7.157777173632718,-28.260431025574906,-6.401117411049462,-40.097237329641914,-37.97475696442271,-24.88436937451771,-31.758864690012135,-14.44064044369946,-11.01249032779059,-34.19829261485019,-33.274861284067704,-21.076233780241573,-44.990822055524696,-13.207593952835206,-6.881605846662708,-19.304729945136934,-36.57946703056246,-1.512390414731024,-5.147521744537132,-18.635575753690514,-13.626283106113956,-14.060141917404334,-16.44169065701241,-14.807680593553973,-13.897534490280162,-45.0415586023473,-43.23601617604756,-43.62217084255504,-37.95548713011573,-15.27759609345175,-48.095772017663386,-34.72583698174723,-30.420707454890984,-4.8228870587537,-47.902264539228604,-4.893043899786997,-32.09750402479665,-30.647134405723996,-40.347529196831225,-44.694974507004225,-3.993493090469402,-45.87287738481596,-49.016798917695596,-30.370205982650035,-36.99637882755984,-18.826179211666783,-38.00731266301505,-43.39781707333614,-42.74046466945065,-17.832007020236784,-12.697964122278849,-1.7759305788657032,-35.06212252713329,-48.04941309618026,-43.87221276121706,-37.314559924429346,-28.78268992633255,-23.309775175902093,-40.4767683699655,-3.3999943198284366,-14.735913290099012,-45.39310298748509,-43.63357206314463,-29.32616987267308,-36.36382741659848,-26.821620023550764,-22.750296488139988,-34.262049982678924,-6.926917301632763,-44.24361442874142,-7.5508042442543495,-4.554813331648056,-48.31602247977339,-40.65858241646166,-11.081478092584195,-20.786434098221353,-37.568823401087215,-8.131450767465198,-12.53900055353878,-23.660207332275963,-22.210762838207067,-47.59461515592698,-31.63500913888615,-39.19965226291796,-18.79987912133879,-48.70747530787891,-47.94488457925957,-10.304066554580004,-41.100465184328364,-44.10200341200466,-29.482459977228892,-49.25434957323771,-29.902394060337024,-28.05351848558617,-4.969968561361471,-11.228115462130406,-7.566930174545572,-20.466052389981904,-5.734849447425727,-26.00587298868967,-37.953560782094776,-9.965944826951823,-1.2468756415711546,-48.0327845543633,-31.76235262006729,-46.417825367137944,-33.06670103851368,-22.754891239420182,-45.020808992157,-46.59649883249942,-21.564442183046516,-12.01613214289855,-25.830136152612315,-49.65402623684116,-7.723942418778551,-40.613309383837404,-25.673000974222248,-15.162158633776768,-47.56390695591527,-19.45973669340535,-4.5475432068677435,-5.984365714419204,-2.8185114928065413,-20.122764230038705,-20.95502686031805,-16.902181426769015,-4.610938096101336,-43.7463094478358,-38.98947950494921,-44.18856636793843,-35.72853348927566,-12.951312353176315,-46.40065739530643,-39.23848494972656,-31.944944128210963,-32.89634286800944,-37.28597813924589,-15.35841025812359,-40.52637106125181,-28.243769132180873,-22.401385288040675,-41.21899223392407,-39.45568514243158,-45.5043634549557,-35.103524244626726,-46.353488044432844,-34.90173447493784,-14.109596511997625,-11.246602626891777,-8.582188304912087,-1.5863798295607467,-7.018003277973694,-40.43327951555068,-12.43181467390545,-38.21790431048853,-16.506280477405223,-8.43073186233344,-34.691140704672755,-0.23713979588804168,-17.37438590812689,-26.89202788901803,-37.2991506858832,-15.441949631421137,-39.590487920052134,-7.669453489031486,-33.4037267868171,-1.8856692184026858,-48.30927990749041,-0.5945062184331329,-40.601420026554614,-39.03209838088875,-7.975587999000522,-0.6561737351853836,-27.311928218833394,-35.98988273915774,-33.427625735481946,-7.48982522017635,-11.659048888533896,-45.79182524766949,-0.5106194909587747,-5.0180314488052264,-31.67671742698709,-17.47908514315448,-31.50381081088691,-20.37404998456207,-49.908630220349124,-21.125254263109195,-31.6773117383907,-23.516715569122514,-49.96893950571619,-32.01741549446261,-42.82530761035375,-3.333556054971465,-15.744778013942884,-14.468178538941745,-43.143314302887525,-1.7657989812380648,-41.54676556892236,-6.3465315062909315,-39.42662489680987,-4.620341646766768,-16.656842728696695,-46.678009085339056,-0.7935645516680689,-30.571488532000203,-44.70245668286482,-31.4154584839631,-28.227895154042127,-5.7874510489756,-22.469614637576395,-12.004539638094169,-16.31531063590621,-12.455464621450806,-24.38598088916103,-38.329091232781174,-49.657087923947515,-4.75520326479093,-11.053540591408662,-8.775564608977115,-49.628204575104895,-32.660516134795024,-2.5609208227675095,-41.852842163130376,-34.09624288999251,-13.88877344412145,-26.530268103821907,-20.927946424944842,-15.960158553167492,-18.064479302983717,-8.90033761473844,-33.43934058550485,-39.23371388346648,-37.99787036403449,-46.643913186000695,-47.46447524842128,-32.64065511149502,-26.55153984463664,-3.009056318539449,-46.947659618412295,-6.695938295622261,-13.266769696672466,-23.46812562319106,-26.46584230231713,-24.428734535035723,-46.89610281059235,-39.4634207311265,-33.32319840235822,-43.25100006544569,-17.425662731060033,-4.535688109006719,-26.144177044698512,-41.591622760036884,-12.425326825957717,-2.947352468848863,-28.391978369028593,-14.036410072610938,-23.740191077138928,-38.723142549285086,-45.58116277418806,-16.228122435069814,-13.665814949529087,-9.898110287199957,-44.02397135710927,-32.59517445066449,-18.196814997633737,-49.30159028664457,-40.92611554923329,-1.9451256521679894,-20.80523959738838,-43.03049178840694,-41.265402960663145,-25.615859721129553,-21.674280919266952,-9.286669382890867,-26.796147754440824,-4.2856541917541175,-32.53874791869289,-41.19397978038477,-16.004787580642777,-15.36127769998833,-45.25011786696441,-1.3814230089367552,-21.983701546828836,-45.726686021964994,-4.952277895262769,-36.81403491558343,-44.74069980785303,-14.630562054251062,-22.503702754518894,-18.897640230324132,-36.47411355353791,-11.35979799219885,-24.657191769792753,-26.355258557023163,-37.212691792886154,-19.92056851998788,-29.04725982176877,-0.6464335092833506,-5.7054289592573415,-9.514744364738458,-22.470203153041034,-8.145659523142267,-19.824417614114687,-37.621155261001526,-16.319905875025754,-40.36853034759989,-2.8559693269739173,-37.4697977283581,-39.43020875553748,-47.12502559135016,-24.90667630087048,-38.13734852085039,-36.07682986130485,-8.425194729422547,-13.599175396216168,-35.27038570303335,-45.52170211859613,-40.692820505563375,-37.074576260747506,-1.1280088688258805,-44.03470027255756,-2.548679785154151,-20.673267002800856,-0.7636171980553552,-20.553851068926686,-7.318262708914769,-16.47680832702425,-5.442519854823569,-37.35069897489057,-10.698313858232266,-11.463538633762383,-47.792687755275765,-39.56533315428498,-10.884175509227845,-47.664751542491345,-25.49308557565766,-39.706174891095515,-34.530435119799584,-6.816514665071183,-13.476867470816423,-10.496947985802784,-15.17425712417808,-48.839243255281936,-15.663821862080429,-29.83124169266279,-39.04085965699087,-2.229371719746187,-6.2120312268868165,-18.436032398930436,-17.737998007439725,-6.525608156361706,-18.474978260480523,-21.844725757243964,-23.897283696020434,-17.3544794468657,-48.461332086405285,-33.660267683948696,-13.51121981641209,-37.184565708965536,-35.267244330141864,-13.741730802444952,-45.456645879078074,-8.062249196677362,-14.763441354183549,-6.097363415246537,-18.227353167271154,-48.45892161904344,-42.09067012581404,-43.66484690487391,-26.8545236721183,-45.59509501874312,-14.874114993587606,-28.6311689764567,-44.22619696593246,-10.520573212065754,-9.905370554310833,-37.130397498290876,-37.08831157278688,-46.76240613876771],"x":[-125.22332635408708,-101.91776219008139,-107.87152149208478,-130.95996957067672,-111.09852158178501,-162.47650119088834,-180.36048324053377,-136.4360545488816,-157.54780586199016,-155.10601665134809,-180.1469919324441,-163.05139861087724,-153.0773076269494,-151.69105780571155,-153.73976945117838,-144.1570276729509,-135.00951841990042,-199.773690305718,-189.88197219761977,-135.15229606899243,-180.08498252221412,-171.86238937487164,-142.69347985153934,-154.27994094463327,-107.769484480201,-120.8884430653348,-102.58233225631328,-113.87599985867334,-197.64388651252696,-154.3154587608529,-172.51645809424014,-125.46492965935387,-127.42293670410663,-165.38813271114697,-168.7657678431361,-178.8668166444666,-136.6884399266228,-187.1416524070721,-194.79056975311087,-114.15036817056712,-100.09735575284652,-191.1016640647743,-161.9845744771572,-128.61806194189236,-126.80790421239551,-136.41104419390018,-111.67044283576273,-107.54242503514332,-148.16924393792402,-123.1043184561953,-113.3381811393267,-175.58954508445095,-103.93577857186224,-153.1777572085895,-166.1808635453864,-199.28231255291306,-140.8301890627093,-140.58472517220832,-188.7567430585017,-110.26053578551121,-183.8339992001694,-118.90668589513102,-166.13156612415278,-150.8442060788061,-101.0425857271139,-157.53921239853753,-132.74134879660508,-161.80181880100983,-165.06504704654714,-145.43269824849926,-137.18647153408708,-189.80951416434183,-102.07689082988844,-192.4621993808216,-131.56273427004066,-117.6393671859064,-183.13872763588077,-160.98522062363077,-143.63293755151864,-193.41570630483702,-129.5198088483495,-146.09681394671742,-151.64532544238133,-169.6472439213864,-100.7260780691877,-103.97303567260252,-146.3999143293137,-168.0760392750543,-184.27263623572262,-129.6308776938015,-174.52275499304562,-162.9669884344654,-177.9050152562,-138.41379056273354,-196.35008673532826,-150.11305039630756,-130.42548726778793,-150.79193509095325,-187.10657509596615,-121.47747010583755,-124.52887950511926,-155.6077400193139,-194.70264227362475,-109.64717838779589,-153.75029272530023,-115.54054522070325,-126.16895788426639,-133.15493829773555,-179.2826813937948,-131.03904884655685,-145.7147354680485,-141.80935342880426,-171.11234228224578,-138.90340772910542,-137.57169294335458,-171.50657159243832,-168.10095346629666,-194.95907111569215,-144.5288790028041,-102.00328932901483,-155.50721473681273,-112.32716369608849,-111.02891621405817,-168.3233689105375,-138.92997773161662,-138.78138668101016,-116.7562728061875,-115.74309989041214,-115.37784701283158,-168.83601645560222,-123.00640127981374,-193.31698267854486,-187.75455340034753,-131.71127598346652,-135.45610880027053,-103.32516554852971,-111.10777623099568,-108.9728988786473,-112.69996060293622,-146.1255693440168,-146.82274918440297,-173.47096144237622,-185.46911907735205,-125.38248604505209,-126.20521628332956,-165.3278360014116,-154.96593250675335,-173.31582929152708,-143.6433168498482,-108.01057225043567,-193.65427357296485,-179.83734557499622,-120.20855255718028,-130.1882934153455,-113.13774514383863,-180.2541509614814,-178.41760006476235,-109.73630396416749,-144.3059105979367,-122.27421331998241,-152.34437515201984,-102.30252192995823,-171.0819383694533,-174.1519451655108,-155.30259223219701,-188.6189514100687,-120.5380381697899,-184.5432924048182,-118.20310147247632,-132.90822305744345,-116.52635469940853,-111.42164279578675,-188.9591671805062,-150.54172282391153,-135.0864888577465,-165.61679061259247,-183.9996903102145,-120.51915536140987,-171.2852557334738,-113.17142724255969,-158.29417768813585,-171.91469983035762,-199.07971345517547,-195.51844583991112,-168.9550350425388,-169.04984963560992,-179.2013341883296,-181.7708790918936,-161.52305790944735,-172.831333721048,-168.05871593998953,-191.77168395640066,-156.5247655039036,-191.12941947795946,-142.79168615738726,-128.92662152548726,-179.10555346336443,-100.49561750726528,-168.63800688513325,-175.67951129134926,-134.75618336396266,-108.52264770983979,-160.14200069148416,-107.5150537986906,-130.48291031062053,-149.64541978960884,-196.78860585225232,-172.59901606639428,-138.4108412157293,-137.70414462612763,-124.85799450777483,-123.82380916905188,-179.4850970219956,-149.78208853596135,-177.12852989289578,-178.02649098509545,-109.00355103272112,-152.31684059956882,-185.63059600441008,-157.83983996473677,-152.806719521325,-120.08687200009993,-149.58826683880108,-171.14778041204374,-173.91630509704558,-155.82146094223617,-117.5364768412352,-194.48246224657845,-102.11122425273776,-130.23903099599158,-190.9579106545021,-128.66383562318367,-158.38645807546624,-100.65889432672294,-100.81028292228123,-188.1622683995189,-113.07248815829813,-114.08927470491301,-115.15357555568724,-197.79318972466191,-185.17912493949328,-118.13230740621643,-151.51672073270174,-166.7063638225838,-171.2013577700763,-118.31690154154029,-159.1102939549536,-199.13056371116014,-168.48634524144262,-142.3561394405606,-176.21713406002246,-125.704311785321,-104.09998837860046,-111.30268008667056,-171.7359424231601,-173.98512125881373,-131.71702468017105,-130.91384189350686,-114.15088122209114,-164.0862387896085,-182.7685672651079,-129.54437280843416,-199.35589125707608,-157.27714074239216,-164.77259413564678,-164.0267819190194,-131.22631621000272,-134.9509398015274,-141.87573691136956,-134.24364670961222,-152.02254254306328,-134.24152066212196,-164.70790239054145,-163.27991047704595,-174.65998373014608,-199.98398887069183,-104.95883548537965,-132.6569640974205,-120.09905132532683,-148.0672198040097,-128.1906550161541,-129.60392803136068,-125.23250607611665,-187.85750705946188,-120.76342644930497,-127.30307488040893,-188.09257505124006,-163.38703503776313,-164.84508763221163,-161.1421419644633,-114.9103205499197,-180.5729724768457,-160.85318386220035,-131.7462823997516,-125.33068020989174,-136.5364971649634,-123.10008090318784,-181.9559202741783,-194.62534369500676,-174.49665006922487,-162.51428739986656,-127.08303375868566,-154.67735630425537,-183.74688443689539,-128.36786147894173,-100.10215064409509,-133.03184613177257,-188.1553566933796,-145.2216422090013,-106.06501091547396,-187.85856889038288,-180.54746552788242,-174.22861764080926,-123.16340007935678,-161.61806661112976,-153.34721620569547,-109.05403455958758,-180.2715042348661,-190.4568705166495,-186.05680796731906,-168.3958076471048,-195.6221830693675,-138.25966023297497,-129.08158719499394,-139.57434368946755,-184.47332215136822,-132.01850283351354,-138.00027805537428,-151.0736073985407,-119.87806394088427,-152.202247225373,-128.00448079776694,-187.57715635616898,-180.03155010308154,-123.0946057771781,-194.89788999249816,-117.42537658124981,-159.82518931929445,-145.39997856372403,-150.3157236691379,-115.37739017135213,-109.57096865599016,-187.64047365855998,-160.06388579618735,-177.23133619552215,-187.12259322032787,-191.52010827065345,-180.88535070695508,-103.64795142646295,-111.20108283088595,-169.47082649396967,-194.71583761421712,-196.67905173198375,-162.0597538246697,-179.64622627656402,-182.19025705315102,-143.73076306914857,-116.34384053422686,-194.66692782935246,-198.59915839045914,-136.49440987994333,-177.22809131248698,-143.91662719881367,-190.76691265551705,-185.54899434310252,-112.20463709889181,-112.37786821189128,-115.67800985373037,-144.99445782121663,-105.59310243989238,-118.53010198334697,-193.3827303451732,-148.878801899147,-140.6539016796811,-136.43001960823776,-158.4164746466236,-143.2605565583187,-106.10309741038031,-109.36175879222185,-121.25955542506783,-120.34651576543851,-190.7000673798154,-142.93938075583202,-198.29622858944234,-146.92748141679974,-113.30303820381073,-197.6563829962662,-191.390170172362,-147.51932202448282,-168.4897935037961,-113.26020204204903,-146.95126929239282,-189.78564321506906,-131.87880944401968,-161.30989804590052,-124.22187667932315,-172.90301776948996,-176.43570887844336,-141.58125418517545,-159.18123961268304,-117.18526529354105,-114.42077204373629,-157.6722406947894,-115.16878770392384,-131.33179462525334,-165.97715945156656,-114.7906745797745,-121.13334607072173,-171.0498695569319,-115.75620729397906,-163.98997931458135,-151.11333436983819,-181.03933790876937,-118.03017407507477,-195.6508872539137,-187.81422072510216,-136.18274223857438,-101.84323092330074,-140.06071823483933,-174.17466532160665,-149.8550824548061,-106.1401924077011,-193.0907082922389,-109.39302115252212,-118.93452278538174,-106.74304414045201,-122.31941855940352,-182.67074241022922,-123.89608451524563,-135.29006665993688,-144.26816639355053,-130.6424721062101,-170.22674505847692,-158.7388554022325,-182.1150064589546,-198.81272654253326,-178.5917719745988,-194.72153118865634,-110.67736285547052,-159.76057631793046,-143.7847349896263,-199.89204616026942,-126.42348456370335,-178.12637621033323,-140.09344699285498,-149.69433403016745,-119.84801465550285,-109.21391605220339,-115.18165852685087,-186.6754996852224,-178.09605398425975,-178.50449046349632,-137.9359373083204,-150.63885018249084,-167.27074546574502,-161.79992803018857,-192.7519537477387,-105.8255630648385,-142.14077817951073,-193.16485546180914,-134.19696799249482,-150.888878774374,-146.98202839906872,-168.99929078976618,-125.04467299270247,-187.90031351185692,-144.34765228471377,-187.98277614522593,-170.32664100271083,-153.793633402976,-145.18753958501776,-168.7009513764351,-104.42912226676306,-173.23198650264862,-144.88321150618884,-181.31159299648212,-116.51907680995946,-127.01278386605163,-100.77715546899837,-140.0541245144618,-163.50948093605786,-148.6808038361196,-177.23239953982628,-124.0819212341059,-193.49241095083772,-106.35871963423062,-171.36774966835983,-122.2347213786515,-146.35309847840088,-154.30946396195662,-130.19896710814328,-118.50430723355309,-177.5495217721823,-185.7051804826986,-191.4718720295035,-186.43689524358263,-113.9335851697033,-146.43807084692787,-113.63912281795392,-101.5994362824764,-122.52742190093807,-106.55363018486635,-150.72870753924428,-116.02688235718806,-129.9852310794151,-166.39775666594767,-185.0926629622252,-183.70733225276217,-192.03103359592478,-128.78045540089943,-198.62327733515258,-142.71599769020966,-159.79996776058292,-118.88529904527331,-142.56303355293133,-189.695066673064,-186.66218067854996,-196.0893284009282,-120.52438747693368,-182.62248878905805,-132.87115388722071,-174.59686233620243,-131.17564254525826,-128.94109987059358,-174.18559968812136,-154.02969095260664,-163.8085923701915,-169.42506360826627,-184.53113688130858,-119.8969577881827,-122.35119298308315,-194.4996111652103,-130.18707156493548,-195.53351230583863,-181.74865656488151,-131.01038567898104,-116.37459275408979,-179.29791724114153,-184.07054413791602,-141.98875651421304,-175.75967502516164,-144.28929086726993,-189.21761772650538,-132.6756682435115,-100.19745446815784,-109.69300642628983,-194.5394512763005,-186.32468548804647,-121.19590735702815,-128.8377343812184,-109.2074331559346,-175.79124351703177,-152.51058110553709,-140.1458274323011,-108.94762596308931,-108.20685625298128,-119.6000107267345,-159.03342488511456,-107.35507016888405,-120.85233862088253,-116.66792666782982,-192.48614888951906,-139.5109203055769,-138.81186824018974,-107.98051068302024,-159.59101723392803,-153.89119252526254,-150.45543479711154,-148.8280891941818,-123.40949210962344,-104.88288693391358,-193.24892294054774,-141.0672777697484,-198.84693666180326,-156.75302118725403,-188.21288158669785,-127.75064639762606,-192.34010700673895,-147.86044284865034,-169.91117370822474,-193.412166525711,-132.0993242286939,-116.28245709122045,-142.859777194365,-184.2874155481993,-189.66080048272025,-182.3212744710151,-199.06025377358688,-166.4770382292696,-111.43435195678317,-136.30538296171392,-170.42776884710236,-184.30725260930754,-107.49662782724825,-120.3201127870529,-162.9034465617583,-104.06492163716385,-149.12277605313923,-115.35945323378509,-170.7737339873844,-196.3818259840096,-188.89935868642254,-138.77900081862867,-135.7289509489833,-103.20378831894675,-127.82126974075831,-124.6541579349382,-100.8628567009048,-193.29284560247234,-128.63116625509514,-121.58944438391022,-101.77762738944622,-142.97268558624717,-128.9183643191002,-184.9482519788251,-193.73327475796606,-144.73483857121977,-188.0648661710786,-186.80810714085513,-116.45361128752158,-158.7255966875037,-155.09147010138844,-118.57058693224222,-185.10200776612282,-127.10578383464633,-147.64916172521924,-126.98042203547783,-186.76577913769933,-149.20440913340565,-119.99200957410781,-172.8522616807188,-110.02149755860017,-123.65183240018519,-114.49584380462052,-160.75433699153268,-164.93154306016805,-137.74327807485008,-191.21589215949334,-150.46589149835842,-192.35453394145225,-179.27092949105423,-196.61502423941653,-178.34864280563022,-142.12452382285508,-133.21553073915237,-138.937778094612,-107.97143911035877,-148.39109630876015,-145.01570707070255,-154.17810735778255,-100.21227207332726,-146.114662545035,-171.59588933726513,-165.8297287440724,-196.14025634584215,-115.28416302145854,-182.00822689185665,-126.17648755228423,-198.06377275004806,-184.7652229026789,-155.80293360024132,-117.75711225220458,-158.67673961204636,-119.2243064637486,-102.53102064635962,-121.62650083447078,-125.66397208401219,-193.7822210611438,-178.4105624417696,-122.71040765002424,-109.10973607212753,-137.55973227603212,-119.22547543161832,-110.34470444056058,-112.8741513466659,-137.55399267478109,-172.4067583354792,-161.56356761828255,-182.30730428746446,-130.45787426385465,-135.47791668586288,-134.37073899612005,-167.8191833068658,-187.67579923981293,-121.78704207776276,-139.70509875608582,-129.52612544751906,-155.85350562563355,-128.23228590971217,-183.56391181982883,-136.6771709487656,-138.79436812508862,-188.4149962349534,-144.75683998781207,-111.62327340339257,-194.76957926072785,-146.63602182181546,-181.27854716126336,-156.26057153844334,-166.5414607258551,-148.793798822808,-154.02537980972872,-163.48775683953002,-163.96457297462314,-150.04021672223513,-111.83266842662944,-136.1884352924323,-193.97524583961498,-162.71207946176565,-164.24724646376498,-136.80551088582837,-145.91165277999585,-148.69825951363785,-192.8640761665779,-137.0607410843975,-188.49802827878528,-132.06125666922094,-121.70216732745997,-111.12175311484566,-153.75095579111638,-137.09058650211807,-180.91365239858735,-127.36885919780944,-157.43517271100941,-129.86762963748424,-191.3774736396212,-121.88756948104864,-181.2922822163688,-169.45115531011507,-112.73704003399973,-168.92545126661722,-121.77139188916604,-110.41146667423234,-108.88432581971357,-139.12358405536511,-152.76563765461572,-180.15287685480217,-134.02391233696545,-163.00591223856287,-184.8761773270108,-149.58367006118107,-172.24410426738058,-188.63350498597904,-180.42102032518918,-183.67099783202772,-122.20734295411431,-176.70440707323948,-116.15095623640144,-108.51025009381536,-151.23285700617305,-177.24094704225743,-171.9728160215566,-148.24241298892719,-140.0281111066885,-100.42323133513989,-156.69813965580468,-119.75560904374332,-109.71530124531404,-101.37372009797296,-136.7908851871835,-132.35755746312924,-104.29721555952112,-138.6644092643529,-191.1418421064564,-151.70557266284953,-127.94961081551452,-173.71133123243993,-144.38558397213555,-191.06119395341602,-173.98954985722784,-101.97372118822743,-134.58199555555908,-189.25041743356226,-168.80409933613345,-171.48962924705873,-100.81374739114001,-137.8694643405321,-105.70186700541998,-178.49608945864324,-113.74034777742659,-115.46142919911591,-155.26387073481663,-173.63565949415073,-129.2369535232222,-163.6391052399659,-115.23366981116894,-190.09271932552645,-157.71815705219188,-175.90507596708517,-191.01667536778325,-127.36187875672988,-154.31353410937544,-153.0811157162257,-115.57941060995715,-184.60010115119852,-157.0746852407736,-148.26916704495252,-140.27087622124202,-140.67251135927955,-149.13384788690303,-114.62425066684428,-136.26801669094584,-124.06328714579257,-166.36396190557966,-112.28406089601455,-146.84098432479743,-161.6240596098125,-155.47749566376336,-155.65462362764006,-185.8710989148594,-135.32572773141487,-134.91336086134982,-198.38483275018515,-160.6712789663199,-160.51466758939938,-168.98268684849853,-178.2950505597347,-128.55251234338414,-150.15263485440468,-160.6010069974755,-170.82301254976218,-103.47101144386461,-198.5857655012377,-123.3471756139231,-129.57720077778458,-109.94562255270206,-109.81462506286171,-101.86751234371083,-198.0711902776496,-174.15170577944264,-156.56836361759056,-131.5992874978795,-153.83055098950416,-148.38962976978448,-130.31101231699415,-113.39010181116478,-102.09419487847255,-175.57961407601275,-173.49889332546408,-175.47858538400249,-154.18068294582878,-166.30159688656042,-158.28098557365132,-153.72701631277903,-102.41067589761228,-136.5866083179704,-127.03356170446285,-108.2313137842734,-143.48512094745777,-136.52975561592277,-155.47601704897295,-185.9385336248054,-128.24677988101377,-134.07991801391177,-186.027578971867,-165.76067112451318,-191.29667119748416,-196.0994454299971,-167.35573164804225,-147.94780831778377,-184.04909574107617,-117.74555211857644,-182.8973402041942,-112.24466850501248,-182.95128343961917,-156.46963507167882,-154.00253364369865,-102.17984229787795,-155.368487462373,-117.67951482936432,-130.10913260800143,-170.7708870994743,-184.12368300314955,-174.22187352516562,-119.42309237819731,-166.37385074495825,-168.8043439816551,-103.42160507283012,-153.3772837569735,-126.4434134305913,-110.62673075714426,-156.95099831580555,-132.03039357620133,-103.31409062028737,-174.13161576902849,-161.96500362824338,-115.87895488034185,-105.10548861110445,-189.0474699223783,-152.78500799267317,-191.41988525450694,-148.02895822597617,-139.53713934112784,-126.59432436234677,-121.97819209150813,-111.87063545756952,-109.11583060883929,-181.92773294721064,-165.8969625831634,-150.95616960527707,-118.61605334493672,-135.52809142731974,-133.77816535441178,-187.48850414805494,-190.6479766095106,-125.03720383814887,-161.1184023592143,-142.2107298314527,-145.80215460599362,-122.19295616583258,-159.26507253269818,-133.6479596725941,-173.97174164713556,-135.70165071461696,-132.88820173970203,-133.46094831523988,-117.59663139350027,-160.76904395455387,-128.58865714834923,-128.39084642684776,-151.78008990871274,-188.2507421920668,-108.07945642789905,-130.28708544088647,-111.32260176934277,-144.90925748955738,-138.00780894712014,-127.18507200307722,-190.5517605841905,-197.04508608920054,-126.3508966765685,-176.8741113435381,-195.70284415584945,-115.46701577338119,-156.6620164984165,-160.23722125733124,-167.02020155015904,-161.3417125469459,-153.6164881689569,-180.0876400296705,-175.1990615402319,-154.09526995715657,-134.23614136393218,-129.81395644898433,-130.10827363336284,-117.8133343652821,-158.6864475145662,-140.16480606231124,-145.3929963605047,-130.50710239798605,-164.60732305161912,-170.8574579045644,-151.44684725534123,-118.30481230800089,-184.77632252575634,-104.97490962675506,-192.60905824962424,-120.41417844593099,-147.86825589442446,-183.9351323262583,-156.04826980974883,-156.8004357053792,-124.93187763476756,-156.09166312449622,-190.47762392043975,-187.89143165962187,-148.50891843096628,-119.79474867666065,-158.03871631050035,-179.71767389887808,-111.18021682121493,-103.50967362263535,-181.1712066826763,-126.39334894550312,-152.9690280027076,-154.1763676113067,-199.92211698440596,-137.61503891491222,-129.68606538089287,-160.08328933208733,-112.98080822449535,-181.61317970358306,-178.26316308486182,-163.995588531858,-179.86383399305168,-147.47926769751655,-170.71526561114564,-198.16080051161853,-176.6699500787824,-139.3577315220613,-173.654979662316,-171.5557833508186,-100.19224912791924,-125.42612851193928,-177.78023981919122,-160.0264010986825,-142.34061756045764,-112.1258919693555,-100.00857246053687,-189.16762387126047],"gamma":[0.053554309070542594,16.64204694694408,3.8763710706789745,19.740116711909078,16.736158510616825,6.61278006076401,19.385442812361834,18.446792207035628,12.068881733055363,8.250163999416218,5.255496421216401,14.141174042934711,6.622474148625157,13.274369822632437,10.452535553045044,17.503914922027107,2.911852445053995,12.334892386091925,15.886889214920306,4.142337437953847,2.0141670152626023,4.283450265837794,16.16981094426164,2.450147077806073,14.574427821038007,18.07014967829366,12.497773152447355,19.467226655204716,6.732186013481329,3.316032201647916,9.781734288374704,1.0851273284177898,19.25255359124458,8.129191951509176,14.520136749098786,0.13962759908980438,18.55349330853783,10.883744727850617,9.717283610496782,13.789755018581307,7.416028461637065,14.3308560563408,10.6204861611476,13.343566116482158,14.597376634537271,18.63102919359378,6.384789734544376,15.737891977193783,15.526880626722539,10.588519349410861,4.891948349771624,10.979919029470784,18.638903180016673,0.49961520649500546,3.603012124296927,6.0636991956259445,15.219039022354156,17.33252659125277,0.6762888677334811,9.786599540975981,2.8062853185390413,8.653697248511811,18.84325702581297,2.5825146727727777,5.754015306802915,16.98331027892746,6.671919601205336,18.90910245692854,5.212359985961941,7.0980014802638625,13.288636110355888,19.844640917753928,14.910706727832368,13.309742180394153,11.823777470821959,5.5102168285536335,5.214114617608301,6.218485704889711,5.850664057125448,16.52911501022324,17.415636522795648,17.485826870417604,8.640317857535695,2.418359909237391,0.5112918447577641,7.614190121100126,9.905292588081025,2.6928915076138704,5.618509880608431,16.65437584341896,6.325453131591625,16.192547563576973,10.518751056869702,16.449451295153068,17.824150415184707,3.7161409885657326,10.734172148958855,8.40656075027261,16.53343728891668,13.998762155260081,2.9340469403944436,10.384235656634306,1.4157111560443303,13.211705994327883,11.419805540290838,17.060905009804912,7.919434659271989,7.636434531154372,16.75558722555308,14.720335609419003,17.65000328801254,7.825983110060575,10.32511374911373,15.496464767422363,11.798299253019673,7.559232624120686,0.8864812907346709,16.66010385933571,0.6799297214660882,18.124200382285803,6.05735468030161,2.4136122529664306,17.91474287798557,19.55978442537335,6.122867705948476,2.0550116825580433,11.085754820750356,11.793009652246514,3.071863182295562,18.049169117732106,12.416091951762684,13.499784184065264,11.109242061435683,12.871340595171144,1.156813032825199,1.668296657058126,3.6897675214265524,15.27021171450928,2.613957154933293,15.528172419619835,14.821495085206347,9.189004699259415,13.660462810773133,17.835372430124604,5.728598339814792,2.6346350484313996,16.38916814814532,5.417009013659699,12.109047504819372,19.562835388188056,7.102702034605128,12.940363432435582,12.421622379656565,0.1715068518342644,5.259271294590926,1.4874852068311784,17.637269266397716,15.682124076721337,17.382774279741863,2.183793126567193,12.704314769521407,17.239818056662784,15.832406302647875,18.66284036531914,18.614720228905824,3.9337055676220256,5.494219454270399,5.52369608997064,1.631303659637271,7.629020556540649,8.754982961005084,15.970469443143024,10.134817874869594,9.565739924946675,2.9217077161525573,2.312897237387248,12.649710095356719,0.13077238834430904,3.0003784219338936,13.803927307871838,10.551837212224369,19.129818834887608,4.530718874149118,6.938166519245299,7.740263005376606,13.643356719288171,10.706773994966362,17.18143384930722,16.038261113794047,15.025410751843932,14.602340349429506,9.839250836822803,9.374491846577424,15.237658808072085,13.616573936830395,9.5645075737141,10.100575188593872,4.410680784480836,5.304204361768257,18.649190770810762,1.7329887237500596,5.592262901959653,1.962873207186413,11.060158138402327,1.0121930450906458,1.7794128949979182,5.23177887032277,10.603802662762064,12.109336075413104,17.29748860803896,12.125006145293407,15.924195866009875,13.524308557034992,1.1316774512673877,11.42841895191706,3.8677397821114923,1.3771756830716075,18.00094044742485,10.060848938451512,7.199800558166083,4.097533216872233,14.775942650714985,16.047415839586275,13.171195589162483,13.197252197736029,3.2573926805803533,2.2531207013828425,14.630348397104477,3.511306262122238,10.023696620412515,16.05334876749432,4.625398547441626,17.64477266381912,12.978022745654258,5.96048104597386,8.108276661024338,5.717415257826426,9.640068645283364,19.19684799362591,10.246923652466373,13.474842789030795,12.555650321637293,2.354647495524742,13.764336044629356,18.018265741471655,0.7438953658238967,16.01556484029694,17.09018748666237,19.46438731119615,16.006389603759295,1.77473241712093,12.70858391745216,9.434542345652144,8.165328965070216,4.8069965283438565,19.567056135693292,10.385802103479396,7.346463534613434,4.849830411903451,1.3684100386023035,10.297142704030238,8.921552558764363,19.485668106926752,12.856909543653119,9.719858640035412,3.4141189623141655,15.402365038425746,17.5625955152439,17.722547775269348,0.659442691397909,5.285804030179029,2.2142812785704447,3.9410845067282274,17.513327824772652,16.47172056390361,17.373183763385995,6.65637073339814,4.0569300844327705,18.492546297872817,4.762859397766053,11.481849004656306,5.482497098859502,13.523113179848774,11.830650050960983,9.208865200014106,14.294370975797982,10.245560108446409,13.632877599927635,3.038965849502886,15.984073116028043,4.358088254382437,4.326985497215063,7.722404873179305,4.438704802693847,16.3855163617854,7.729844015119416,7.746140333930267,18.59800330901455,13.261955922290984,6.635527272821449,12.95456165433511,13.15108762303578,1.7667082659496591,13.16031168257236,8.284879580138039,14.536156749464922,12.020922527091678,9.139461579262012,7.935803910673616,17.6043947451884,0.19162914391364083,1.115144355047386,0.6883697293880653,6.36896682438028,11.942353902419285,19.32677540548058,15.856856699119316,18.577673381973618,17.619399514138905,15.518038938461128,10.415008426907256,8.414103505802268,14.275512443472028,7.4675217176146935,1.8308243633359567,16.431804033991586,10.863565548220784,12.909652288591724,15.70565919208649,7.693753645788632,15.85579623691569,10.419962765568513,7.5342430873967015,5.827316982417989,19.750276335614913,15.457281742684845,4.314945868014641,7.448266097366822,9.662096921480053,2.656336330504554,2.2366011480259473,10.912505538528308,4.5312997010888445,1.5369466964327172,7.639280251160292,13.974061744039862,16.397104323425395,7.341531582650882,1.895322344382433,12.78101543866763,15.866226522539066,1.4738103599533314,7.456185427873945,9.419691728284363,1.3238585116992363,13.350651637827369,16.275630426106765,14.213127460193702,1.3998141123719732,5.608009683842208,15.551043676674405,13.463325863455182,13.743655187905972,3.910740298612816,9.896257240702887,19.542334868449718,16.403885303848323,8.640616608030488,14.944065231987178,12.465743195051054,11.550603590633962,3.478535381002019,2.6682014790176156,9.552811653303284,19.6428151323766,7.090922423514638,7.501169424092242,2.927764978562104,7.116977108933558,1.601756778252752,11.293326041002585,16.60961452152484,11.162937134232887,10.735140261633607,11.856340815054773,0.22958822947353408,14.282430604416598,19.35176283792866,1.225825429477938,8.753249188282016,3.9564559329492788,6.272996600117331,14.240297784781797,5.401864313785207,8.22155625920825,4.737104407395183,16.4333938802042,3.3995294413395083,3.6765735821626144,16.933293428048138,2.0335496628068217,15.65515437739804,19.783959798835905,19.30145644614327,16.725634179166782,1.685310381852112,1.9052559295179838,1.352664905036769,10.038557364018832,12.2233684044172,1.746311479135465,14.719760896928303,11.100268658973235,7.648097814096921,15.575621262212994,7.390240343575747,4.79440087122994,13.604788014861935,4.949511869615351,1.9906184700841312,14.040153859210234,16.374968465419833,3.398093204653594,5.220418481363693,11.311766398515392,0.43354762113792855,9.015805334929361,19.407848729320996,8.374415195331935,15.649100057378828,11.138341462810981,0.8192357878073242,9.289316877445355,0.9386805444983093,2.911952737380714,19.967662428894222,11.336405444646239,7.8622564778204,9.031426521094023,1.155765486579754,8.080203636235591,17.064168523678674,12.243589357808249,8.830904323873972,3.607127940805035,18.408860243501035,0.04565494875413911,8.739030625280723,12.49702591191165,2.1334612239710316,15.274878232634004,7.8314940401522914,17.577731777253938,7.654559449059124,7.3206712534876806,4.527206212124053,5.517882469829094,17.523729476996902,3.960351489486791,9.902767565592342,14.154012344455417,15.435012496570888,8.549125815422558,12.309004929268198,11.349631654746947,0.007087643101346686,16.089303960922287,19.80594024432616,19.8694148201157,4.59896137588244,6.40229067945095,7.1421740740034245,19.317123454168282,9.054411926202661,14.143521659426677,14.756856662572453,12.85433036125244,0.15390313361106855,16.403075320691947,17.471084824870363,9.198176071720665,15.029572147104759,17.296772133415526,6.293725066735312,11.364636228982935,19.994701351792177,16.216102585920822,18.018906570576803,1.0611391643891643,7.12962940512516,11.515767875461638,4.47839789056427,0.5631329791089668,16.630575488361075,14.964424381701257,13.950312957286958,4.879208187697057,19.475633196001887,15.446875951158074,1.685381936904773,5.124351042337585,0.9714099769280704,1.417331029132427,5.1244241540226465,14.586971610875313,2.8650033785813056,1.2846104977205108,13.501247900458022,16.736280897943313,13.109867579894644,15.484174332193476,14.08402080525105,4.631095659014428,17.910126872922266,16.88552521353675,4.113734621206255,16.982824455612807,15.330980137778267,8.825069432251134,13.779919994057565,10.981667319869238,4.852455314043569,6.064932107485634,19.11268687473091,3.4676118336802775,10.72182028216076,5.092461174449738,14.669547916381074,0.32406483929152685,14.231819253933207,6.06984038634204,18.631702841687762,6.533172495439232,19.313751953527873,5.953575408287786,18.57273055778705,6.5381551377978475,15.371261357891974,16.52509265387836,13.19611673470793,8.430403019838003,12.712071849076505,0.41669571950881945,13.164922007464304,13.75658194411674,8.185049851455965,0.44034167717826644,13.204027510092926,13.882623468030042,19.277195591091004,14.368190300231195,0.3693698162145731,11.476882378040463,18.45195040130582,9.698487989957849,6.8769902835890795,0.4940590256332511,10.72280392165425,15.048176497971738,17.802842491606125,15.739692046837863,2.4791371711494703,10.27304262716084,2.9259265198722106,4.624232139412419,3.9958711337149744,16.134921363307466,5.2636236855966345,3.2378791812930086,6.087272020363614,3.862274879089993,12.313446259314453,18.992786080748836,8.488846094544233,11.1368856915619,0.7712814710883231,17.652292935747916,13.777729251210168,5.645598763496191,12.414065807870056,9.800704216127647,6.409529017257363,11.095143233552719,11.327629513773756,19.80550687649796,8.912888929423506,1.900681078531834,4.353790783119531,17.06203447344158,4.46362242541539,6.3032924094868426,7.381579983560824,14.104108301956483,0.12277335305263204,2.052285732085166,9.063650168498256,5.850265130935579,1.426986576796363,14.005728215474743,19.74556031613531,1.5108056570158501,10.456135875569736,19.35936774597181,0.3612551766313654,18.366279602524656,15.852062354774903,10.100104407029296,17.74452306656344,12.601525117544847,15.342032025815563,15.365724430875392,12.387431769064019,13.72189272681522,19.364027161964543,13.360891487909363,1.7528604641299728,19.11234942799237,10.25190994362088,6.991484903098741,2.4172230438795816,13.636893154506598,7.016567362115067,1.0820570231499271,14.81613454957789,18.794082460931413,17.542322179921012,17.954893914072212,16.304054622166674,17.012844967665988,18.775480260543937,11.100803214933922,12.38401322637138,4.722176716825972,8.111870098604097,2.7880546178604204,9.096954877156826,0.11265040087288458,9.016149049642488,11.350836981942717,1.2994212766309232,15.212877325218624,1.6090327101820012,19.853901900278863,4.914493366648851,17.704590465149312,3.754540233129924,1.4396782801932995,18.40135494030777,2.5635399443068563,16.886419367492287,11.495307869678598,10.360554184656095,14.298556576116003,1.5869159952033263,12.683650836930473,12.334535767958776,19.550565637049107,6.8668745302031065,1.0700248751563324,5.054023457737173,7.156062410841173,7.409326886559229,12.49977662125644,6.481830593376681,3.5258680638274997,17.00355768441912,10.062866026487946,5.9790759904346436,3.1034822017016106,7.94022326350758,15.885488668839379,1.7796906147839708,8.006098773676769,1.8154600247511432,7.767289786377916,9.066842809972258,2.2542345442209255,18.862959511413017,5.237665995053469,7.6228097106382675,16.175047960841404,5.086831620039041,13.067648799789694,19.217122091566132,0.4851257176544088,14.322047720575043,19.187506146489113,2.796633266727735,6.409045989615412,19.81506995892266,9.745655385292453,7.368793975879262,11.998526316673939,9.440882800281347,16.681656191498217,8.685528284394653,12.798894391726563,16.930710634402523,14.867485366828404,0.930844236638273,5.113657692574649,8.098412688412658,15.235326848417618,13.978843983194636,9.051208207105027,6.2787062994494125,5.2418537165363155,17.471558763693125,6.277190496466467,14.173798848995434,3.8221209627991692,12.539650463976532,11.018799290926339,7.866512506816004,15.822276652652953,6.308743392228937,6.393752261148089,11.486932941622264,17.081479679117372,18.329901805746907,5.653631793451126,2.3038282646048502,14.607507430433376,2.3356884566816705,19.82148834929618,3.3175588924767396,11.970608452815753,0.9331465828425367,19.960219500264508,17.255729567673015,10.197686848083016,4.0985470695439785,8.435411127847715,7.157847256850736,14.63760390169834,19.14030290745012,10.260625149474723,14.83844939453867,6.093356648666561,10.67846320558366,8.284589794340862,8.747530121526786,13.942912720381223,4.365622505458671,6.25225323560294,11.448341186145345,10.865280287268826,18.531920708940035,16.64988496363854,16.256671121869815,15.35078146286847,15.90007446237253,18.00403611763782,13.129897443601646,15.88326325546821,3.045166673969164,10.230309661739057,17.021525810092815,10.995207476755859,7.212155620133154,4.920840218719262,3.071281583351606,6.572582750692635,14.635719943260055,11.139080204176693,11.201846328343205,18.229246443962346,1.8158405701402192,2.5972922789546393,9.515728521663945,15.933435135304581,12.615616490348298,15.026103495635198,0.9116373929289923,18.358133227659913,11.911039637334895,11.655646325951805,2.200328453690319,15.990704756569144,4.796576594702446,9.111098758732744,7.96850231460593,7.532489593050817,17.985753045687126,2.6318317287478177,1.0185128020863,0.20563076687829085,13.267193749194565,1.3947368138996685,1.7472791741133609,8.391710084476053,12.227475383872765,19.08718986933443,8.711994275165665,18.24156827947202,11.16186534447079,5.656568813842577,9.970518374678289,15.124484139116486,14.260143050051646,2.9217508104996615,5.837553840214902,4.60088332537139,2.569060215229202,14.535981305168,8.512377401193977,7.082992251063964,12.749326677903795,18.436082479276404,8.354613047622305,16.067746356419494,19.934390391535473,10.09663690903842,5.08851309614867,19.697480120005565,0.5548847448950811,13.25651019089586,17.26644819975136,1.0987946097120238,10.272687237240877,16.772194303535642,13.440792271278244,0.5915688157609855,13.259601838561554,12.986368498563188,1.9313782544474467,9.126191658469796,5.287817241525321,16.163028947910426,18.02093061135452,11.5786779988031,5.132261259419244,7.897889128331954,12.724805760593746,11.916856895506985,9.56361832403227,10.016552594962311,3.673751773722209,16.54053612634822,19.196996480145323,11.217269675733487,15.363770548962101,17.79630373825212,16.104419615863076,6.482245140971785,10.211637013962722,16.784976138945,18.013972558938587,13.227703930478153,5.873911300595407,3.9717654796197177,12.05387839707518,19.66358513211878,9.27321857640476,16.47418291275067,15.025406788672804,11.490195903114104,17.703549806186057,16.99206959150095,11.573772895916292,1.221162631843895,13.717079926850957,8.078488503258573,3.8022376151454473,11.704213224591435,3.1583397257885304,2.2468495044492487,9.731723931555765,4.761082339203058,19.216282493462977,8.754897626479469,18.249274769276727,16.056687495836396,2.587814830108268,1.0749287038218291,9.975997916854693,19.438425621754188,1.0751079167808175,16.306159655085,19.206858714746463,17.421022136213402,4.146228328132171,16.9842548958796,4.7175975983845175,13.003820787515693,10.031522544478708,1.9699102239272648,4.533271457699888,15.627446843891413,4.8259762630593706,14.320622550089155,8.408712277448194,19.30078622982482,4.672938456690483,6.786875142256448,14.596914979884343,19.230968381694392,9.583144307449878,4.153939091311836,5.318520500962967,9.338814704762616,11.471292107570846,9.058132877724962,15.864752216152137,7.0722671601881215,15.572259369377171,10.914108854878233,15.088553938870737,2.563698735196649,19.603438249627967,5.158002783278519,10.120573579528278,12.420412405239398,11.075673385818853,13.772236501506523,11.683245670686237,13.35438234345383,10.510957492983298,18.89697531977554,16.406234022461042,6.374918874069553,11.289596926284794,19.431055568082453,8.651773293818517,16.264965976909917,15.815355659315674,18.7682310628537,6.28900560799472,1.690593435587,10.729612207168596,13.596004244107736,11.936236054303745,8.381850412277414,9.768447096445104,11.919705486169402,14.22965694148644,1.174942245046977,19.754033547546204,10.078885455103048,8.663740035105608,6.761411696364448,4.192223156045838,6.18760128245079,15.395255844205309,7.167462142511556,5.613011123901552,3.2153043600199327,2.445427163770688,14.830396882742418,18.11067513275095,2.7320598768170212,12.341132193403311,11.561575959381948,1.6157327990667003,7.985010428719184,17.29247253556877,13.901320351417294,13.853662173969369,16.261403192208476,10.562182408213987,0.33744484315838097,16.81205507581111,11.592300212547414,2.0752775006817137,13.795331263565815,13.17695242549162,3.186882245392786,16.572745310131786,6.875715141837939,14.637025217035685,12.603267683428694,0.436643226662623,5.423203443972611,10.470313790344346,5.030728364467341,10.277333021344809,13.819591064444804,5.079296687521304,11.839257216368972,11.180118234169596,19.029282573285506,1.2841722572550163,14.75319587903095,10.784450433440703,2.923801072653731,10.834276493025556,16.425930957395458,7.615993385355506,11.901025881795553,19.95461438543562,13.674186008093411,1.9616201724731441,16.61237497605019,14.690988672793885,19.160540705757278,8.16130514039697,16.114834926154337,6.233805047064829,16.939983103422236,1.1333658101198996]}
},{}],55:[function(require,module,exports){
module.exports={"expected":[-12.02920341002217,-9.185553246129198,-8.78180607980136,-8.746330863912672,-10.167997840774044,-10.09406239945065,-10.580449344887988,-7.8048869930850735,-10.76226281115734,-8.368811383056142,-10.036569173698359,-8.409572135052548,-9.852953892739256,-10.504209194620245,-8.957571259931681,-9.450539687367279,-8.651813747672108,-9.398983217043677,-8.490224224555536,-10.74166447559611,-8.859660451658623,-8.730151044362126,-8.292341625794265,-9.735324997841207,-9.158230547084159,-8.986843048310318,-9.976603895601539,-7.990451718082124,-9.305674389017188,-9.95133001812096,-11.191694712905218,-9.134885461942002,-9.191846317126423,-8.438438653937029,-9.75603601517046,-8.629851110422704,-8.254993180230969,-9.486443538635667,-9.364842650321883,-7.957453422492682,-9.60262993229758,-9.163710127742892,-9.481504373505201,-8.939432588736175,-8.605066483360371,-9.47471546562989,-8.648832268531217,-9.213733595006895,-8.928495501942585,-8.975394856985035,-10.035955478347471,-9.019998028945235,-9.47342851556058,-8.75859691085159,-8.041361460220747,-9.14838265689715,-9.240499856346517,-8.160200676350708,-9.937420735599265,-9.053611023955426,-9.780868191127217,-12.393553844951368,-7.943350549709237,-9.182503619779085,-8.154266418825538,-9.531004846410166,-9.098214785824702,-10.868763401933231,-8.354254187896277,-9.670898393740107,-9.015490635081308,-8.787175796009466,-8.480828121625688,-8.292110267880018,-8.686433959872627,-9.022646024416996,-11.580466576189039,-8.988091472312082,-9.268075552971073,-10.629882207255468,-10.297860314774372,-8.997195068731983,-9.474548408591161,-9.14392694150548,-11.69281680812509,-10.294721353128677,-10.110766945302238,-8.348893543403655,-10.060146762232938,-11.112653711540792,-9.853507917940934,-8.74512611963348,-9.725812104362182,-9.281480121338157,-8.460010414679179,-9.035042393875058,-8.409400060035042,-9.032595424482977,-9.161726440428083,-8.437036621638612,-9.804002498689801,-10.445499152243954,-11.105346069182428,-7.573999342954686,-9.0127208636265,-8.613026131474832,-9.894750987470465,-8.602037519027787,-9.957101807930115,-8.772018391025291,-11.481558597144675,-8.921588401169796,-9.100265223638447,-7.72443582770589,-8.745424822193993,-10.035373943599605,-10.267423124666927,-8.366413217198485,-8.47114465515964,-9.462800456597694,-9.021243765025089,-8.61987783608463,-11.464107533516986,-9.05813995146346,-10.694700183662095,-9.321990045268628,-9.452471417843483,-9.287323365262049,-8.566658817588102,-11.360345915310587,-8.883756614039218,-8.421542507039668,-8.365385875751693,-8.91695161922161,-9.189652569986968,-9.289986273131964,-9.117518528931733,-9.742555719993709,-14.021823360873269,-8.991365140764662,-8.646419003456487,-8.775237173216977,-9.01629661968262,-9.765626452650807,-8.73447545328472,-10.423867317165973,-9.357272033289895,-9.925278290896346,-9.580656394385949,-9.839771638526308,-8.278989316464193,-9.7456703049195,-12.502223328988121,-8.18827414672666,-9.102230800710974,-9.604029454788197,-9.202124443857961,-8.220280093068489,-10.12072312911692,-9.315469376620905,-8.987438006816292,-11.089520744033459,-8.735662678727008,-11.34360746024142,-9.624873291843752,-8.910173591650846,-10.170061419969253,-9.253521577033352,-9.007726805234352,-8.688491224703645,-8.697773699048934,-8.657614614845285,-9.465924991382392,-9.933631398093976,-8.873209381687953,-9.160775784163938,-8.197513796398516,-9.743448940868602,-8.659673618247776,-10.856715665476907,-8.294842715879525,-8.722650267077817,-10.43613159237824,-9.191844723425053,-8.76425870013397,-8.813350692987933,-9.128771567594331,-12.231927805073669,-9.027359971827078,-9.50599433488459,-11.220462167628574,-8.955594413867306,-9.500478793487478,-10.807395508608277,-9.561132858666944,-8.851700720635957,-9.103360933673839,-9.667954501895686,-10.553412629919174,-9.254755600980566,-9.134521915416032,-9.039774364593805,-9.101323693947528,-8.948277745850408,-8.84446782534024,-9.075357614370143,-8.537168989117646,-8.338866846584063,-8.569965900718538,-9.300010993858596,-9.165174346131344,-8.710322631599979,-9.063948740820823,-9.18958327731897,-9.047377454287206,-11.771474378999628,-8.89764159373807,-9.190204705785789,-9.31896824391634,-9.024326965963477,-8.49500863870189,-8.384095551526464,-9.860504860584337,-9.038765064669143,-8.920226653056783,-10.488573904599189,-9.172105259106077,-10.809293083764258,-8.185027807452935,-9.109853478192495,-9.768504451961974,-8.840480051172303,-8.983308210173867,-8.3130355804046,-9.776776696877288,-9.038165288716115,-10.889117758356434,-10.170582118590136,-9.088026876797706,-9.29682754031571,-9.26692022500053,-8.755790667684472,-9.132360648563546,-8.722162479738198,-8.680379409068074,-8.363627928902444,-9.037902432064838,-11.087641852359988,-10.020985261016975,-9.192694890106063,-8.435803234183123,-9.623685687522253,-9.188586227144397,-10.489517036676974,-8.414944101834006,-9.475793452789704,-8.032997521284038,-7.731929352743887,-8.636475556571687,-8.95608634641988,-8.709330558283085,-8.312510782505228,-10.936940267270499,-8.7041607230166,-9.256309258733292,-7.891052498686593,-8.530030043380261,-8.872402070539414,-9.181480682686692,-8.68371047413179,-10.096509229956936,-8.865988233780772,-9.146294623593551,-10.737878706866065,-8.847141458736509,-9.92099638707271,-8.91822001953793,-10.317562770901215,-9.190194039032878,-10.273603838286524,-9.014951435403951,-8.306118599663865,-9.986863240541705,-10.082464981652198,-9.62674989632681,-9.431929459139964,-9.171737066245615,-8.559529925556687,-9.087648465929291,-9.72232713083834,-8.53607057607859,-9.34073667723187,-8.75417561905439,-8.751654418574159,-9.048711397377271,-9.463782825209407,-10.051964107326647,-8.633681232189664,-9.240862259697447,-8.779014019177731,-8.59850010960095,-12.082554635905588,-8.607882964941192,-11.43416778686722,-10.101087826874384,-9.447221984959338,-9.858604515913377,-8.3605135610858,-8.643511944322796,-7.871027669107076,-9.584145286111593,-7.9465239168164965,-8.841949284021364,-9.260616353878685,-9.549988277499525,-9.057974192284737,-9.944963440216476,-9.284431653541347,-8.925330381943034,-9.177561669565996,-8.809140956035307,-8.795208627770526,-9.650129548524855,-9.488925765939392,-8.687405438676258,-9.099269804211156,-8.921137574419618,-8.735527954605676,-9.015660661379588,-9.521292462064956,-8.66614556490191,-9.39705518094907,-9.106373178520693,-10.706075374146495,-8.88818330322464,-8.08654190827345,-10.141322128407607,-10.815390200206814,-8.605258369678772,-9.289125958082705,-9.948902352428526,-10.480235950599258,-8.905220949432135,-8.89058895830221,-9.010508290186605,-9.661073008558612,-8.710007817681824,-8.495217339746393,-8.034547592835956,-9.010205788680647,-10.037453115169749,-9.34046898045683,-9.101116431520712,-9.23758511033352,-9.594097804832101,-11.45534662407701,-11.11791771448719,-8.741673321329838,-8.204393007446942,-8.574607942996794,-8.893391565819394,-9.86297932002128,-8.406372010219158,-9.107913116676968,-8.125849002471487,-8.24029667324075,-7.965134116515053,-8.661508825301606,-7.751399350234145,-10.317247803619448,-10.166308069355464,-11.888003084836374,-9.060779826240886,-10.091808809180456,-8.598014011817499,-8.31567469503156,-11.82119937117097,-9.223196324987612,-8.929391503389555,-9.415567244652221,-8.967406403139393,-9.528229490427739,-8.576089784588184,-8.89251470628196,-9.128837053679973,-9.10451901505138,-9.393189377780377,-8.69544723511167,-9.199090747708148,-8.090303354769741,-8.414750254450562,-8.696723873541057,-8.380534127780333,-9.674987162004783,-8.980589857816073,-9.159614217155163,-10.3944279566063,-11.008295637157785,-8.71235373776912,-9.16422280766516,-13.978763834773465,-8.347534711615133,-8.993250939153405,-8.696687382703368,-9.866555819236329,-8.559821082297224,-13.06613725336406,-9.9345685201755,-9.31916680987253,-10.119701696355373,-8.41463044164436,-8.238651978036756,-9.537647405586249,-10.790666958841816,-9.825506872686963,-12.653597516280332,-8.04076790517003,-9.371730219551818,-10.423783581829642,-9.20562486937711,-8.436792154733556,-11.049884094993349,-8.332778430863867,-8.718842819791785,-8.313914304267424,-8.24044230354304,-10.242681517941694,-9.147620646891866,-9.074136712644677,-8.748570176987595,-9.173805111237044,-8.9438642878298,-11.87033569000089,-9.603416139336526,-11.747775159813676,-9.05234021903092,-8.723353865551067,-9.43041536528706,-8.653874496145312,-9.210779556045598,-8.369101840323475,-9.811162788845529,-8.289849303748259,-11.860938036241468,-8.18629517726827,-8.73834616865245,-9.363001590327805,-8.398089251319456,-9.73912964998152,-9.063290724715806,-9.818689075945324,-9.65591960819363,-9.26740007384948,-9.189969003334378,-8.002116533651115,-8.887977963622527,-9.706909949734076,-9.195905869156878,-8.655805631223604,-8.644572157383793,-10.848707591777623,-9.994343192402235,-11.362206496146515,-9.991738896289117,-8.472020225823275,-11.310872527349954,-9.504652214669598,-8.76826696341476,-9.104344900116828,-8.191523833228455,-8.907050030066625,-9.122387781177473,-9.186251517051218,-12.719844748973456,-8.921803399179469,-8.8157817228841,-9.282205523095474,-10.497114589708488,-9.62496919527134,-8.849306977355077,-10.451204167478911,-8.029373841583073,-9.802863535079018,-8.378014478596569,-8.569677696218637,-9.599403973885574,-8.785716214999919,-9.305033725017303,-11.894087047573963,-9.574407160476486,-9.251261016346627,-8.60914093274435,-8.436083045577869,-8.796424283634924,-8.311433683774919,-11.316276238991383,-8.77832781299412,-10.577530686251974,-9.520101217142434,-9.392385249778476,-8.519824386434994,-9.229100662940226,-9.313523807939863,-9.231411569138045,-11.885520039333352,-9.076239017776484,-8.358055006523667,-11.011060708669369,-8.878497144134576,-8.49015859559749,-9.78391694410528,-9.801924276323014,-9.151842454111478,-10.718043700666865,-9.196876640431082,-8.293293973870876,-10.187307163947006,-8.66336938867759,-9.665435518149497,-8.892475731962332,-10.096629765864336,-9.058303730009607,-9.319423513623333,-8.94788622779395,-9.634412906051242,-9.372489240650742,-8.21623922790328,-9.105931528084087,-9.458748211417369,-9.180425260593047,-9.918467129737094,-9.58696456265951,-8.393402107467743,-11.138245702759127,-8.267759689276167,-8.369039492333215,-8.604236808510823,-9.458445825502423,-7.863523773325372,-8.96967728347092,-8.864424039896246,-9.145276671222128,-9.420772023852807,-7.9918374339300975,-10.540036682421626,-8.768531362343682,-9.730359424238127,-8.913523669419071,-8.763621809428468,-9.076675955916945,-9.005178418260414,-8.678278832448239,-9.003150348309731,-9.316901728744165,-8.70372806750862,-9.541153504959965,-10.2246534676846,-8.823072330013684,-8.07941764834488,-8.635166593385113,-8.71459977430463,-7.836192536894982,-9.406785202544803,-9.499052192665031,-8.398345219543227,-8.88193575253731,-9.194397510698193,-9.66184141050138,-9.41044610576395,-9.42943596124942,-8.806260765551517,-8.687535638753205,-10.24128863280811,-9.594722367772672,-8.713206818015244,-8.562825365470642,-9.158934108787996,-8.737937201578124,-8.869532403938292,-8.829111098632302,-10.405140338003193,-9.928891692930229,-8.808986747184163,-8.466829049804222,-9.261387573019181,-8.455980240035828,-8.760743038041175,-9.300153258247274,-9.699113200846504,-9.989901145663627,-10.265151450460511,-10.32754650348954,-9.490675909269846,-9.091992660209234,-10.255867771588179,-12.64815870853159,-9.137156087797038,-9.959875251051251,-8.252728748525547,-9.175269906361976,-8.337332268412286,-10.097237967548114,-9.326284944553949,-8.368177494554057,-9.218345688953358,-8.390023202196167,-10.087821579174758,-10.58868723249159,-9.635358957467314,-8.5726329975703,-9.143536677541421,-9.370837048626012,-8.639759572308648,-9.200252741038774,-9.85522285484692,-8.779690606579388,-7.834096839434605,-8.651723758178365,-9.802029883426178,-10.206820000142814,-8.575379335682626,-9.127906539689072,-8.98184896827161,-8.775625325712452,-10.192795023114094,-9.40391915882046,-8.927673529046414,-9.733269595984398,-8.477765450282511,-12.629720739771672,-9.435879919740461,-8.409540882100835,-9.32777674902376,-8.855824196209223,-12.00517856223241,-9.2034968169561,-12.789417411085264,-8.584166204406367,-9.010423996518728,-9.061988810861468,-8.805833394865928,-9.162989476525198,-10.819215218288283,-8.41058971895822,-9.151804106154202,-10.343587311024901,-9.124625656609924,-9.684768606319963,-9.561329967648252,-10.52117158440596,-9.248240148482179,-9.065210555876066,-10.248245670773876,-9.245041532036302,-9.444300697546007,-10.947524707432384,-10.036563733343836,-10.84646833092616,-8.929486957906445,-9.17940661592638,-10.540933240746469,-9.017124744530598,-9.206387660130911,-11.251813664561352,-9.8530997031217,-9.26313286971402,-8.998371841880957,-10.445638556040166,-9.389821597571785,-11.262264341931289,-10.70971663931994,-10.012748465573186,-9.016147905664607,-9.039173704916902,-9.001570476562438,-9.029344750773216,-8.429268417624971,-9.766424459332587,-8.611294057512728,-10.314193615310579,-8.609002370277103,-11.42731009461475,-9.088082715631938,-9.805277340034767,-9.437599950119417,-9.91746113498467,-8.731051087463065,-8.057166361661665,-8.787484000595859,-8.946815819254095,-8.606834529931113,-9.281150547568979,-8.41701510837628,-9.329391419934273,-8.582192658140809,-8.336295391990749,-8.69635108329519,-12.973040471727355,-9.562636965920728,-9.665752706563863,-9.210492626691298,-9.355290978306314,-10.440642562262381,-12.29429774218311,-8.713109860287446,-9.353409382528962,-8.258645063746748,-8.53218252616121,-9.54002094417472,-9.499573769966409,-8.54208989924139,-10.113979424399751,-8.401507749712714,-12.605823500036992,-8.265272500699513,-11.916581464477229,-9.684612347670956,-8.999243226159184,-8.415653638480201,-9.717378411255572,-9.091678908678976,-9.858662679631466,-8.081955575265383,-9.925270510647271,-9.957172890524605,-11.576816880646728,-9.77273841162234,-12.225328441776654,-9.609447839616708,-9.251659322629429,-10.453495719355729,-9.606377294163279,-9.97217053415728,-13.699343938077067,-8.499690758773806,-11.255996747280173,-9.069445013001127,-11.66934672427195,-8.833271956486264,-8.599558373045234,-8.680192781986822,-10.534754521653635,-9.272855881181624,-8.97300449211417,-8.203068172885013,-9.444843332448105,-10.175149504588365,-9.359593703769542,-8.342710851955704,-8.192698903219695,-7.843976029298023,-9.12883386617703,-14.977647137961316,-10.157083018659966,-10.050723763372883,-8.927808849028029,-9.315922612654237,-9.227037750722989,-9.144195995071065,-8.354147381609001,-9.293365861513921,-8.826689372166758,-9.439646254163755,-9.752212324576181,-10.383372770915045,-8.028333472809479,-9.18004840008474,-8.834669791634568,-9.56182648078375,-10.87805368737458,-9.28089201561582,-11.154534829399443,-9.34323863847438,-9.306049383223652,-9.785311213209365,-10.473136575454154,-9.648241660141966,-10.213548979529154,-7.979688861788535,-9.68307812943328,-8.225849506094988,-9.000239342553776,-9.855084512895047,-9.999993636541639,-9.789632460121473,-11.081408907679192,-9.046546733950661,-8.989524787911273,-8.357082308676572,-8.839707417182986,-10.436402375019252,-9.761461622479356,-10.927891151156853,-10.522228639351257,-9.240541313796243,-8.281886236545983,-8.22564513032803,-8.797699891633933,-7.72789135093946,-10.192231475821744,-8.126869243497648,-8.428724064905367,-9.965316967817351,-9.180204077792325,-8.170824717580434,-10.275396024562868,-8.600783239266505,-10.033103626466758,-8.151423685843948,-8.564569875306667,-9.2497224830602,-8.172457825527054,-10.102791906219968,-8.752310635075048,-10.498128241633834,-10.6576339058713,-8.982589458356175,-11.570279228625889,-10.908188596830511,-9.651413345863533,-9.159509210856893,-11.653219593214482,-11.664441333638901,-9.027859855670847,-8.277488556002695,-9.491940751666077,-13.075480890714815,-11.970156365533327,-9.022762122323556,-11.217400907851138,-9.767093350780247,-10.407263487529754,-8.027008165596992,-8.309525628735646,-8.522753580132504,-9.989301081481331,-9.623087746239111,-7.889571032951059,-9.908624421450547,-11.083599214080731,-8.7828454296326,-9.548501883740952,-10.019066768680709,-9.514737214456503,-8.919255027874271,-9.646553014090925,-8.830851480896081,-10.010154166893773,-8.104353698900967,-9.000679765124373,-12.319260050208943,-8.188732172251566,-8.587486292294905,-8.922042704684138,-10.206793737782249,-8.172257581676607,-9.147395703847291,-10.245875552027528,-8.782213132634196,-9.708613060093406,-9.85247200264284,-10.915365694311308,-10.396089463417434,-8.939597786593255,-11.779409404668607,-8.675637105804007,-9.377020524224182,-9.859940236812319,-9.030381709921086,-9.745121980825937,-8.141749419388264,-9.12901231848813,-8.963657206382573,-10.233181288750506,-10.145807523744152,-8.943954843781427,-8.694140417526825,-9.045484444346245,-9.505701392049406,-9.452506008930703,-9.449799266562188,-8.951567071116212,-9.325584550548454,-8.547870089884462,-10.09442283385765,-9.249500979022724,-9.023352513860065,-9.322922478808001,-9.5667907924107,-8.772434043931097,-8.329966942143358,-8.601546461103275,-8.944455042283186,-8.34363033306638,-8.956769991027858,-10.330069522371069,-9.70237943606306,-9.810209695627202,-9.141326224997607,-8.824499404764312,-8.392434479926685,-8.441741931364852,-8.494009931640424,-9.13536816943028,-9.789359482343151,-9.353629365831935,-10.323811276174666,-10.957141661375164,-9.352690479419904,-8.910161054939806,-9.174793786127406,-9.969948406324237,-8.962224100351998,-8.718232317244297,-9.361849345081723,-8.686537462503399,-11.405099350791946,-8.178670409451406,-9.291588595523024,-8.865051830591742,-10.429419782696751,-9.535314153074959,-9.371518510956278,-9.217242578853721,-8.384379176236115,-10.94303055443431,-10.521630330211154,-9.041447460924095,-8.982990165092218,-8.856611673037136,-10.152462106379962,-8.386470390470816,-8.391434028701942,-8.967052209345034,-9.60269115808672,-8.554734343640012,-8.713091895094601,-9.024344708223918,-9.37178897910889,-10.071654875686578,-9.754549074936843,-9.091180853685255,-12.014994903043124,-11.763489759448193,-9.442565080579882,-8.84344374145344,-8.604994659812377,-9.839140619798943,-9.165133713977903,-8.212424820413544,-10.447651276416185,-9.81795252340772,-9.274185946451874,-9.253840773712788,-9.712063866072405,-8.298871818842958,-8.344149243076405,-8.75788113644903,-10.295976610682127,-9.354448205212538,-9.544955705810096,-9.349125228299428,-10.071821255789287,-8.614394429973222,-8.940955598450417,-9.799739136488663,-8.424279934464913,-9.034225714433791,-8.872424968391742,-10.581831761632353,-8.62665452615391,-9.13708630427883,-8.615471528611824,-9.234539486503227,-8.098271094830476,-9.62601619518662,-8.968479488780027,-9.751557750915293,-8.741209679926364,-8.94706971901503,-15.355294785164617,-9.523787627132245,-9.282276218779698,-9.155598006456966,-11.279494608187877,-9.617900934341844,-12.769939938551277,-9.352589680743991,-9.997945290520736,-9.758093614289978,-8.741768497483532,-10.551661011069585,-8.430998842680996,-10.204062410299818,-8.415282863862801,-9.300977925108539,-10.085889012761857,-9.291517395968983,-9.219631590896388,-8.81244781938248],"x0":[13.336070260487642,8.656242872356435,22.566504021653323,29.409048536851877,21.035538379799256,25.911311293094098,31.052504523688206,7.9010963140547785,38.0825446095534,21.908844447952447,18.190213866377047,4.054779054579405,44.52024526848714,37.957564595582205,46.19943059509238,49.76046406528628,11.888067968923133,43.890464051829895,42.09659894316524,43.182811148374455,21.75422213785715,38.78160255299083,10.75737946549442,21.391624360891182,8.999184336793975,19.64648064427742,25.272482474520675,10.21844845327986,34.820910460979334,6.869280140026635,24.724246481331413,43.30742471441567,12.45679864008682,39.570410306493244,4.425000027117642,27.558489200870675,8.592125891913726,47.027702319020634,28.377120762047248,1.912240445759883,5.180926216484649,38.210743846556305,26.423996829869512,8.288529592499616,39.24446138072051,14.424535576628916,24.044285404423825,5.823420332129747,11.817797048206668,15.370464806604167,31.631562943681992,18.449876717659784,48.76790770326892,25.292269840871683,24.678430704435517,45.71543292933592,24.61673959023515,22.585491391094546,32.72632662393819,39.67338356880914,43.83940544390475,24.192809924120585,19.735818636571658,3.4589762207303143,27.909692138824717,46.81578014053789,41.0801520455535,30.751080997165246,24.795336856229046,32.53689982460213,40.63853166226543,30.343217387964817,42.32605188447327,36.57029148159513,3.1492400802775267,8.030642518855412,21.223015801767943,25.966524006546344,47.802396143980005,33.37747692936129,48.16811173402543,0.894885581231375,43.627497563442574,43.97114817159545,3.5767205444488193,23.688471771904894,12.106170653474035,25.88454549784972,6.932301863943047,30.76655422180068,20.2414143339532,37.73021468133834,44.44655347009024,12.652433167915456,20.091784715282014,36.67704308473698,27.46729273850519,38.180631803650556,48.40151646186421,12.500051475645568,16.515774136968332,48.85849876888466,11.745981795032822,5.339108393030956,37.59581023720919,13.684759829344218,27.805284927743358,3.888127579617029,41.24960054861675,35.4106811577466,35.73004975647785,29.67495540583328,3.2124736337636906,5.867914120240014,13.81449847702838,38.596631370317304,28.986161448209145,20.534764560556905,0.08671384960625694,15.44816331649982,48.668308442563266,33.59389865754342,11.131451588265707,16.790479181691442,46.43678979984607,27.474226672241564,1.3153993190930247,5.3594416708168335,29.03932414249324,16.505726457609615,17.306737161036267,17.441448952340867,8.885061510818637,21.320299723810233,33.67775886105496,11.912990076233566,49.21125312098042,24.859614301528797,13.452702816491978,18.21426835217065,8.640139118774536,13.909001250357756,14.846019714595249,48.37265522215405,3.2534182353295416,9.036511520047064,8.993481243655088,8.885039044832633,48.00655599342676,15.36513473872546,14.006849099766239,41.33526760021689,30.7118053220959,29.437064728100324,34.58742706808625,28.153021895185937,42.8239682654098,11.623184738904602,32.51283125703287,37.55749220960841,22.62254606598848,42.65626502008091,27.7454460555689,24.26510007266588,43.490750557840144,28.71503658051706,36.720319525913325,36.48844484618816,25.28436506247842,17.09244717962921,9.003369783122805,27.637309300117675,14.793687072244632,46.62478730603276,12.720568345624894,35.66130750890094,1.344084362569109,17.322461772641653,3.1987696815641398,31.91928544278425,2.1020891109583717,20.583196294950458,47.32075702918914,31.10247549540699,48.086654110570684,34.92729081414604,1.1328707232166613,5.759314463831444,40.75258173597045,49.44436657477868,2.286268650895784,48.814880626113634,39.44041527131164,36.11218521046838,11.166286470476827,14.257369014548427,12.53828626863881,18.36792314892355,28.951464331089195,3.555791505974959,8.310512745707177,45.11504680329117,17.82649273180833,21.67800892007994,37.62570775810742,10.414376135054603,37.3444177153752,10.412804802013875,1.1158894640616146,5.189224498541578,35.03364815135623,11.942069156979063,20.667338194915274,4.159808379744279,5.049149619842863,37.44048139778299,21.47247938835943,20.61969622885451,49.771392904103415,17.675704546937176,40.88154928147421,32.09302857300336,6.518163417148493,8.305075245145444,24.249236116431426,22.546402142839906,30.40804881780549,23.251883888121338,24.21334646955895,38.582791344928616,47.502321120878754,29.207355790211032,41.24742323074789,18.658518269171942,16.160219153348855,10.555978616889771,43.64905599312539,38.02195975152275,25.67320647504191,38.38846477799906,13.15235405826879,2.211148206966518,35.08036995138518,27.087504160174014,47.83659238524072,1.7988506649004088,46.65187713439618,37.961386499049254,34.242190411396145,35.50561852741772,2.6937910033440593,28.615777261146814,37.30507826381056,47.50439353828456,39.292313516122746,44.419277507048584,27.658520997539426,11.054168697970379,34.63374379290289,36.84912352146944,28.59354124220812,30.796784871551996,43.487708289717744,37.470897925724024,41.39257238460608,2.474565676443541,32.45281722200373,1.6973287741241516,10.617209660468452,22.887961709401072,39.892959606549184,39.06718680010598,19.340876997052025,24.843521649764355,36.46304958469045,3.2261661756052384,14.108203044826716,33.57984163224307,18.198507552960375,17.916171902648436,10.35263225278279,37.658267663729816,39.38738499727482,19.170726156272565,10.644686125843073,44.285739093919275,47.994052650751854,37.488769476003945,12.936917895691158,42.545675625900806,14.05746204143583,0.2858620500669651,43.753105931148504,22.11061729127365,23.19148042822834,33.584953768203064,9.819391027362768,0.863342713523263,28.27777452505329,11.364849916158793,8.799609538389996,31.555051603739738,15.421861652054702,49.719113146897776,3.7307542679770656,10.921408649380393,42.29707610560831,26.86829397694641,33.3573216559382,6.136178656675472,6.286730724134659,15.864844404257461,10.876957968928657,49.877377888864736,9.390791120004904,27.272859007221584,47.007251858937515,7.1990622103883855,23.81704284475483,27.54316303444626,35.3779537287185,35.90063531983701,49.64814292743186,23.820553022069813,34.524582969796505,26.197232405462888,44.65992324058664,17.10216868226827,41.79220545695473,23.75953798517093,0.559094842039598,43.9882248042569,18.43842260880465,31.338086721975866,44.96559142880461,29.93107844811027,13.999873696327004,1.3837120752553722,34.071461541344284,34.994541430373985,46.3598107760218,33.85286011618592,48.88471117178463,48.9346047158609,43.172689992761526,17.261238905039132,15.651627028323055,31.268677938468038,28.488537004895797,49.466234252847805,48.39348222006029,16.355695982481922,46.61084505107961,8.834328751899756,11.800841923647255,44.24688525295828,12.986930246496653,12.746929884474511,32.85946992126788,41.17453932520591,21.094000972779746,4.064719115475423,1.3680610576250363,40.315993588659126,3.0687414436369798,1.6610960834193333,5.126481049780274,12.998993900450229,15.602972182622143,23.119132041976663,7.628142230169955,40.12573810153264,38.89264521038297,0.5776229195805893,5.8359602263656445,35.79087403241134,20.442923107364507,17.278865520146446,47.15603583453165,11.399044760458043,13.527161823517586,21.127104140204757,44.46523490409942,15.59047047209916,23.554877855992395,46.7980133219291,12.810219876505169,38.95707337350657,24.36531724728016,13.422886348485719,10.053860016238648,18.519959537620046,31.053131325962713,25.01049653144316,11.998454570940497,3.6843881992958183,42.21065382057348,8.65464160992171,23.792623710873094,11.475177885551558,32.09894744544531,34.70554528594542,4.984137002820754,8.289509589205723,46.38743143185887,49.76076102664484,18.564192084287246,45.782224930606134,19.9120285441748,13.842303880436369,8.64204687601694,5.742406361271801,41.17143517936533,28.290833177339493,43.834788691230074,0.13052667361980186,6.109348488181965,28.467462544458712,45.58283551650856,23.42450419688671,29.107917486690837,38.71870617703057,37.44843211246726,9.990882503935916,11.875027429514052,21.905449152638013,16.48732726465575,14.523737080195643,21.22802745360278,18.91803636968844,18.04272036842658,24.699905500642615,2.6279299978113624,33.05993560753963,30.140709107933784,34.386701204857275,45.54088363288914,24.27233146925336,23.082836815395012,46.5871804011158,13.992613282650602,28.485126857826117,34.253711815786815,3.6103749069225533,26.032377366306992,20.255600229204205,42.2685153378827,33.20673318119941,37.24580340435283,39.71021994297601,32.883289146006234,25.11957685566416,13.495143085415162,1.6782422195664393,21.80317624792214,2.624086356139177,20.322180281459413,1.7513236675069987,44.42546973294438,49.274367710284594,25.45558720269717,38.2003450771945,42.48818213491292,44.00997418894011,26.386931633196554,5.788823968096535,19.863250298541846,11.934252341878192,10.858049856089114,18.260872391217564,49.92774782025293,27.45843408246984,7.017871187606717,38.723160548158596,6.73678280297495,7.721085256741933,34.589706925003014,33.076104713968434,31.492403585587336,16.97572158019176,40.1586811908663,14.176878739236521,31.469284445387046,43.905288113452976,6.412772181924275,38.44202071903412,22.221472317838973,15.275305062301825,32.182041278833054,13.25011940107117,30.954106529031566,18.883693590121375,43.047574192911554,26.114454612058214,4.644297584270984,16.827879789762857,32.91110270557055,29.88703157381668,28.98507802280166,25.377149701971792,13.08354626671776,41.202729948587724,12.613180062965979,32.99120799597467,47.323602370226034,19.029732624862618,13.462865689319969,33.92143770582612,17.278144831330177,42.97631585378235,35.97500447775344,20.41193572077481,32.94987514687631,38.74331319563402,36.13974282887747,20.471876603215268,25.34410902253287,12.838290200543344,44.03230109467717,6.1912460674341085,43.82617537159446,9.167085882534398,40.13018617708982,22.768871922298462,27.836930770636915,49.85296757382942,29.391383812061022,42.37394972025565,3.324708290908429,46.01850011505682,0.6943772789432479,36.16753813887239,16.2164455458057,37.635237469274095,21.16196899219378,16.183698815874724,39.026829731600266,41.05388008792692,18.078682337190667,1.135937701946288,42.98585618310775,46.443729164395656,35.12716514322298,28.88049581218781,45.61523593673819,36.583560772433145,44.96957114605598,22.392311539977094,30.782973763876242,27.42901980935457,12.62737321418127,11.441817082301398,33.51278160196763,33.25869468506383,21.59904401312699,40.732760018347726,18.930042239185408,4.228169953442807,15.923722716808497,0.8177127193009892,42.48431062181596,8.378271793398017,37.142528363034025,34.42526065338327,44.24814407271634,11.04237052137732,42.68135123138354,29.885728419833214,0.3626074068827867,38.488386011730334,25.224227238580255,28.495072094316775,14.578861819273847,41.475353443779504,22.358343381585055,10.755460204324896,22.5274353390057,49.015213634697496,16.795295452071024,22.516037987534844,46.919432941917506,0.1963850777242926,36.93654210371938,14.184509447627214,21.637807103694918,20.63571303719389,23.14470498361413,1.4482622175147841,48.942946626170084,35.81354136158781,8.071328982046433,31.19132091682929,17.216926599807447,2.1562901616337005,31.744762487095834,9.33098622855807,0.9254570543407059,33.203582763277275,12.247939100796955,18.549678523452805,15.495083142915,24.438941575311734,37.16876283895733,24.192828637883267,30.66818316410288,32.36177495892837,24.89591993959348,17.571481914018815,20.231266284668713,10.316885219498806,33.2935156999341,45.06248481402883,3.6679531845488,19.639294940532615,46.178490958311905,36.39764210562389,16.822594894876886,32.82887915585094,15.315888197188887,4.147942815107875,14.345779643573064,38.74266780858767,12.748572491819854,41.351139136109474,32.69962806563477,39.564293489678604,12.667485056302507,22.77832202797724,27.357787919540954,12.766136461149136,4.447347969104898,11.175452701698873,32.677543909312604,34.267094253795804,5.20187342300098,30.284047740523036,2.1795316867490255,1.6868468937160208,25.16230158789613,27.65375490282781,0.2977907974035632,34.9865773674809,45.94205448471029,35.73847084945214,37.570118415027295,20.54923734606057,43.74329291117579,2.703626823079641,25.140482769725768,39.388143204677526,9.106045982473077,21.89201062836713,24.96948516393438,8.438902121409097,0.6768747833640676,39.3669389154625,14.42952174180807,38.491746876090225,18.82248705946825,12.279923278929171,23.263057808607833,25.906134414374506,10.454010865306895,6.623450962025346,12.032590419653644,9.30737162113009,23.483148272296262,11.373255474756782,48.85510979875011,20.9798113269271,35.106000177176696,48.074877726918544,32.488665486686386,19.16689408892529,2.206557330380521,4.102974435592143,29.604926969304234,17.244161742715214,45.339917618001266,19.7829809497833,32.542996895142615,8.839729857437906,13.287189093108864,46.58130868278869,13.603645852737124,18.931829572812443,31.708016356469148,30.252678197976003,4.8513551854829196,46.89510462904172,20.83345496121464,48.39946453970341,9.450247618246532,10.269967399913016,30.20829479883367,10.688176858490506,21.787188309887018,49.18785711804743,1.6672519831727906,15.467356523988872,38.926296406417315,30.90952045183605,38.923232651167126,35.84396158965071,20.191929521129637,33.17803145677445,15.960498222141196,20.446611337845145,47.451577622069294,7.094337345825997,12.715803896209666,17.760732366617283,8.314534536139506,14.708917023268276,35.30412654554047,46.38330356747318,28.485807769359205,27.27083324823224,10.794807146635165,31.54404768127934,12.50519679690253,41.04559229754542,16.86644877386796,24.927630923625323,16.892471512524477,48.17105581847694,34.87497814255167,40.79682721199755,41.39732279748104,43.670794691671446,46.016631679662,16.134566484731327,39.302875054760314,22.932872339914667,25.32507008237377,33.32027490462126,17.00535274090872,39.290356847133545,13.791178553040883,19.018307641820474,34.76880973274006,17.719984845699777,16.113230742025173,12.194901750937992,11.824764009938338,36.71526194219247,40.49501864751376,45.37675598721762,11.81861517234527,2.165143327452701,7.429634788815798,13.814725666839045,0.19021320227191607,5.880275350346976,28.23784482317454,15.590569853369008,23.65043847027969,27.334685020514538,20.092356400327706,31.266821684657497,16.72546912042194,34.55107546628633,46.600769159282166,36.25191915217398,40.90532855618607,9.856725880985561,8.5786074316196,17.65779036086291,49.6162530588062,14.092360817711624,41.46882349741238,19.815176799937852,43.17956992803457,39.09646438253841,37.573220552999445,21.207367765987406,41.41952974363352,33.141748377358695,24.00508893120611,26.753493541357955,19.915540679520827,39.03060745382583,11.986001767040733,35.7173189485801,10.834425013538729,18.74896582997757,23.1691920483029,42.948492333755674,27.635780882373552,34.20006164058756,46.23082232588058,45.69777013439483,7.713976921938393,14.048954114671142,16.126320428436923,8.462611902262251,18.909349485506453,28.151769138469838,11.544683240479525,14.324469881081281,14.440985254889515,11.469634473681678,4.472430339817224,48.4534542821709,8.73844071029981,14.61548379794021,26.812417284799828,23.875821437604838,22.15899361329162,0.5438458559225201,40.7003688692401,15.197061782105925,24.74894223175088,46.774514018698945,44.52779093018575,8.347204994311886,48.185993740719454,28.9512375608733,8.690826789810014,24.16018301355902,46.06540625190435,6.049816885701187,19.151432516005652,30.299028401819996,17.05080223383083,47.556749388739696,28.4751943777935,36.301303382186376,6.391751586779648,3.561079399279188,6.142686857658919,23.7602450259211,5.371546468009458,36.39110032854688,45.35512644227001,11.359554086607837,11.083631566040776,18.691746775484773,16.906508587181268,3.6476814073901576,45.822120368390095,16.558091576420995,7.424994308496002,41.92600667093844,25.681454287939086,37.11755878272655,1.7084335986249588,32.66262872061705,3.8249858195111286,9.104093786220059,17.858206113057907,11.644035467408775,13.82957707321426,8.810173687973876,17.72277104649228,25.14212618023379,14.253418382613315,26.297427555533403,34.44759563377625,8.19316677066977,33.630678377619496,5.068556283403436,46.98269532141304,25.245285554205832,7.398296089414302,25.8392588387675,8.108725848515974,28.723001248196077,44.592620386491475,37.56296661347559,24.157751083744582,3.091074887406986,3.4787016438145746,42.915093053329876,5.393675110117446,46.25642888116066,41.09434497872378,10.265162526830574,32.95454756640225,17.62665666642175,21.053503512003314,21.656121549847008,25.57489636303648,16.67525381055689,45.10124574050683,45.01975210469904,6.28553697220643,29.168588109041238,41.655099029039356,29.39822328489823,2.9221825404747492,35.17036788838952,35.17724646938637,18.584647091772023,24.948837120684875,40.12537590233336,49.83672779392043,23.781328610479903,31.3066339925132,6.7098061624134,28.099873335658398,3.22938149204004,3.931557093096816,18.862429155710668,46.33770374618008,13.039416156212347,40.22565016300123,38.7267895577433,39.61330531584313,29.593374362529257,40.53939588067571,9.058151332435127,3.485580565461366,26.91637091250394,22.64419497842742,12.64382482064985,15.669999087752629,8.30906769100016,42.548601210488,14.238224581840475,27.485478844212363,37.03535613834206,9.249609080592268,15.586763148547877,14.012251649751606,44.004868483450764,11.463541795421017,30.518898079017376,11.599282697051594,20.85197121806607,34.51973014220962,12.97559137127562,15.534519850463047,22.536959380905387,27.694889877341367,13.611857773459645,7.3506094167882114,34.25050551510095,15.219060576973465,36.00304669709363,4.5627552443232355,36.911462592614306,35.23700757344458,7.87542062853529,24.93659859619384,37.583638365658004,30.54985161695518,24.551421502116668,45.65900481840526,16.173146437838103,25.392987444824154,49.37124535227263,11.229228418168823,2.775343171574962,28.128002044909472,14.40866825963355,25.558892633951924,29.58350009371503,49.49932471343076,40.88586380347179,14.72431626937033,24.88924092658077,48.355148005287404,43.397718626266915,40.420341544373414,40.82317527598611,4.901696630779339,5.447466971168879,38.03679526482087,28.274686644015468,4.183938800777886,9.513786354911801,14.62359771913052,46.986909264292855,34.85528268704302,2.827120313155096,37.38603615587844,30.330672584464047,10.858879932688792,22.434198986560837,27.504106553167198,43.10980531179359,21.499634259603084,34.24661935280196,5.869896272491893,18.284077866508287,42.72108219213659,23.290964734687503,44.52133315351629,27.249795478751913,9.650045232102766,20.646105673259164,41.51908610162971,7.8378290989004835,45.68804107851312,1.4325080708239568,6.80164897857779,5.941495808543095,36.64821383121798,27.305840902762103],"x":[-187.67685703020476,-179.3564803010828,-112.14872409541177,-161.2570456181037,-169.3237596499977,-191.42478575732005,-183.79737335256385,-107.46052739197907,-182.75589063255765,-129.9159685705803,-120.47521567334898,-132.10052883520797,-199.16896312012236,-189.5652271920475,-162.19502220660627,-111.38586930185252,-127.9170814956711,-186.0187967108223,-123.36115689383782,-168.78309067073678,-105.0930478247979,-127.89939365657534,-127.69523951321065,-175.82581063683008,-112.23042640568997,-158.0448243516753,-130.69748647129455,-121.36099395179329,-187.26183911084652,-165.27826023481015,-112.77749980828158,-120.99372138372225,-148.00140914849308,-107.16944604965724,-174.94719387612167,-142.36473600698378,-136.4651099053972,-190.79321477898844,-140.25578085603485,-125.30354263739551,-178.57638073497762,-140.26282397928918,-167.89498982688923,-165.39556602841355,-112.03493233476856,-117.21178089896445,-124.32823891375007,-186.69513641829707,-183.81105174568438,-168.29670970492566,-156.31823916146098,-160.29020252306213,-194.0932387214233,-172.34170706481277,-103.22749793530473,-186.41468534326532,-136.2276049833954,-114.21626858939986,-188.40368836171263,-132.8318878855696,-195.69856118290187,-177.68565483787103,-102.76385989770142,-179.5577432228455,-116.09927363338275,-112.7155692023419,-183.44820449030107,-171.3944866537318,-122.8739869697549,-143.48497711092733,-176.4991757409373,-128.27728096497253,-102.84860571738119,-107.20175945237726,-185.48757345607768,-177.86975760784082,-144.71918125307613,-162.18449379272664,-195.02999686864973,-199.28598303556657,-150.4422517463781,-192.70704377002392,-172.00488342780432,-122.64426042686677,-116.17553489136354,-170.48210869135795,-198.92688024996423,-118.63570022698524,-125.13839593381971,-199.59914238229433,-161.68117936177447,-151.0625696659427,-112.73257855127883,-111.57164277189648,-113.90194167108942,-188.0941174272231,-140.29240365387244,-140.5300157912407,-174.46418169666006,-147.3730231892025,-169.05432538914982,-119.71150155518382,-108.85107003055703,-102.21503641790856,-141.96307215196617,-139.11915423112907,-154.2243303422856,-129.64643518626448,-116.54709851033185,-166.07063012420696,-155.81594209453462,-139.87238830406045,-139.2512817243225,-101.46654755706062,-169.5151250508741,-151.0139268755579,-177.3181298339088,-124.9697088399939,-169.67063165503328,-163.04416769714842,-156.75276653128543,-152.4161648567053,-170.63566887998965,-132.56757596857327,-196.37525929733204,-167.78860420285463,-197.52517440304288,-154.58870038770675,-117.79341801480061,-172.4920132861268,-174.76869630785714,-129.82945943757863,-132.8623559612942,-134.27705955423934,-190.27160869413183,-138.42105560432236,-158.9187509147725,-192.6598389555882,-177.7027859086069,-173.65937137726448,-133.60774670872212,-105.80360876435562,-184.97866289516108,-192.544758617613,-152.77908376761235,-170.0357066951254,-192.08302357221052,-140.03475267022338,-161.5050281410813,-122.71947522040317,-101.62065389576851,-178.30260612859902,-164.4880828568011,-102.14242559500852,-190.98701641837704,-128.9535755681184,-138.97447062813754,-140.17481465595105,-149.35249037987927,-170.57428811527402,-171.19353612765457,-161.73319776073626,-158.36440668058276,-156.79918339912578,-166.51253458585455,-106.84068643651506,-167.75023869659583,-196.97697761079934,-101.13734338774269,-174.0068632999102,-172.04588636536153,-139.0052132514748,-187.0090769240312,-199.21494356875635,-105.03735561188294,-166.11403622899383,-144.4371309288279,-188.86836664846072,-132.84209982015807,-120.05301081906457,-107.25081209593048,-170.77662837996635,-191.16294439038623,-131.68315386884044,-134.89661816836468,-120.69194978922637,-187.05611329978913,-185.7523736661976,-166.11184882344642,-179.51614212990617,-170.80823903910056,-111.03860714761089,-194.90431100684066,-150.52695953669513,-132.3322983699826,-188.12915435985948,-167.31306167415875,-191.200680721695,-188.99234902730308,-180.14536083833843,-119.20118165331036,-141.00944816001578,-156.65183282584184,-144.6663487559044,-150.6036583231796,-184.75955950121664,-139.03658142313643,-114.63947459635435,-140.3302152232753,-193.04408541007658,-119.73459286575078,-157.87326652933956,-146.87781579088664,-164.66761473108744,-165.79287472011788,-126.06083444434203,-120.9572347114435,-175.78590485556862,-164.58025460253853,-192.89592859175332,-116.46665483405624,-129.36239998728746,-156.00298631254483,-199.12555990226392,-181.63511319073694,-117.69844240627219,-157.9772952825585,-166.28064392688506,-114.93586534524074,-112.98236889939774,-157.03771956430282,-161.05668214325704,-154.8962015175394,-102.93726436746174,-126.86293703474492,-167.23595364802821,-177.3859417307022,-168.8746071941983,-122.05581955385811,-161.74753994578182,-143.13006548229305,-176.3843840454053,-152.10913107812448,-148.90876264791493,-105.63406990856474,-160.15310247397406,-165.10089718994382,-191.73614481240318,-163.78461664591794,-151.31418931801403,-115.04462233639461,-118.20047297321193,-157.64040655635452,-183.30269233673175,-104.94696536440378,-152.2178405375382,-108.71806345773412,-103.23153949098528,-149.40057516099668,-126.06016999005345,-155.93849298495925,-124.70082221220169,-179.4930617448291,-103.07964447233743,-133.26995630757557,-124.93699766774775,-115.47529450520919,-172.33661363114405,-196.21424414249634,-139.12046334995463,-197.19187648854856,-106.7137586142849,-157.19831918199577,-128.88280966472695,-170.88303986921122,-166.93751364697516,-134.40477626103643,-166.61019445757694,-178.71249211342476,-160.53834817190085,-194.39359271221005,-111.3753406748925,-157.79967934113483,-175.85752919106747,-185.36206816060957,-142.4958289117336,-141.80969549787355,-138.23259221355056,-193.0257872871539,-137.0062606718656,-106.08827270843628,-187.3333876133825,-134.03013028567494,-175.9775931195659,-179.92999512783422,-158.86782453917303,-180.8408902634825,-154.96759890006308,-114.08145850262876,-165.67831603938293,-108.17797586248167,-136.53100375829578,-143.43984467452142,-187.48115391261854,-199.58782917813522,-183.81262412256734,-142.12851960134992,-125.7666765473177,-126.15078435498084,-107.43634759917022,-139.60337336569114,-111.25174880040444,-183.67505098958486,-143.67786369369844,-196.23687632073066,-173.45878961152894,-161.63828478282994,-190.85320731009358,-128.734279515722,-185.7338808492737,-110.55841950790169,-144.9670181322249,-197.69422663046015,-177.89205755955655,-119.31403765476243,-197.31601982836685,-170.8727125701219,-157.55108043629048,-130.18250800926984,-172.90369436286048,-158.63008628912544,-155.34897722386341,-198.8311496313092,-160.38725252722185,-143.30573106527032,-108.710549732423,-148.89343465642082,-164.87118329612707,-148.85964999798355,-179.60475450514423,-176.34066285014967,-103.32775671232388,-153.1892136035477,-153.29536284932624,-100.40835161118619,-117.81726103300217,-172.96696625324748,-109.47866446616273,-107.43192573965969,-117.19844248827688,-197.36753379630326,-165.29113790351838,-147.93091337329437,-162.81922011451292,-175.97530265424894,-197.0662918453675,-193.2641657933093,-148.01844161119425,-100.99433220494085,-115.70272434068715,-190.04729029282328,-107.74901879738452,-149.0380326362727,-186.9958328477905,-104.12909551881529,-108.91804118928083,-128.00427204940388,-155.4870285910242,-100.4721668265921,-175.00194749527788,-145.14502982157606,-175.7921884699178,-176.35087668744774,-141.24470655101774,-175.96283048893918,-118.31995262366166,-176.44864660988205,-151.84199048214805,-153.64511957380324,-108.04384437572648,-145.77213321922676,-174.39556753192647,-100.96861877455203,-131.63375039813783,-119.34897644666806,-186.73449730693028,-190.50057770813862,-114.78788414299666,-185.05438008067244,-115.7819808879345,-117.14833179604538,-131.10950504857382,-111.58652235457095,-147.2095342710704,-139.08663653070624,-199.1503758431917,-102.40040516587128,-162.85271406560076,-115.53173951910742,-128.6670130135915,-128.50144071586982,-121.3040490197717,-135.5649681498374,-170.57392328877367,-177.5300193318762,-104.48475092247926,-176.8791352236185,-106.46147846862797,-154.64739434511878,-173.0282661563893,-159.4934233716177,-139.36472359763502,-148.7200156372762,-123.79061004413121,-119.55343949876294,-195.6933970503099,-130.74876177706105,-194.99022057376837,-134.73949319883343,-187.62491861297775,-126.61468036251115,-158.7928413747498,-109.94935284438654,-165.5053444704029,-119.94884292325554,-127.12976491045767,-151.13512459903674,-190.63393112317567,-143.4237158122784,-134.82815646459233,-154.74258056963203,-138.4435172500442,-191.30228815811478,-179.5968535681534,-162.34536287803104,-117.65714523466771,-145.57457245145866,-196.4547744690591,-118.41315687562428,-187.98587206702766,-106.90737404127061,-114.07435137270521,-103.39969546700434,-194.81050018501762,-101.35556863615302,-108.44421740754619,-136.21769418591794,-107.93004775903208,-193.0044134762173,-114.0640460027642,-168.55969616466564,-104.46722536924544,-179.06692890798263,-117.63860366734895,-107.47758759564623,-108.2562092149574,-168.3086668616802,-126.71598822039908,-144.59683628790424,-107.07779691717569,-182.39661142018886,-149.67863799628188,-119.49597302580366,-173.15450896243638,-140.3286141177121,-143.53594913165,-113.88686197636994,-132.09545044789252,-104.5109867642291,-113.22761348972182,-123.93828645290206,-118.43772602197676,-139.62890538005428,-129.85593516619028,-182.8057376530304,-154.44297127523032,-190.48344572273456,-139.28118472728386,-172.10564247971564,-158.32994661450894,-177.10982074047746,-120.49843720006702,-169.72503440162598,-101.23988156773262,-166.1808218369554,-186.97048110071685,-177.89950394793703,-126.12552560236226,-167.51813035954706,-187.49078575290613,-159.5302109457661,-142.51282056006497,-115.17504853035099,-156.16301557824272,-132.38215689019106,-171.96431724949824,-155.60404962963736,-172.3228856521408,-192.02159213510132,-192.25661894378106,-145.95606045686486,-122.85816230506994,-105.78215400977538,-165.16262414217476,-112.81205291433128,-101.42471287485715,-109.94920764440327,-117.31338897933735,-189.02969598741416,-130.57700718248688,-157.83713890031706,-109.92811964276758,-127.71350095077298,-183.0739361476437,-137.57372626626244,-123.5315841949183,-197.63179377340006,-153.87061696435077,-119.38073566083047,-195.2423793793899,-167.27857247766184,-122.06404226098755,-161.58647447818882,-190.97182165716794,-179.54138565291035,-135.1833370756229,-101.60359065619255,-145.1952973515863,-122.75449831166623,-155.43024469124327,-187.89293588368167,-152.93964182400194,-136.7167087204022,-147.8387893216581,-121.49161897708431,-136.22821569381082,-141.06860349928388,-126.89272600277386,-105.29838408818773,-181.0160236034311,-155.43711787342184,-133.88801914760109,-156.76303049872152,-103.89174502507568,-172.03468783854203,-162.57295590295013,-117.46617702789874,-163.72039979961855,-125.76334835836957,-152.4053336514586,-138.09174690541843,-179.24447417409596,-191.70534906303666,-147.4013099799569,-119.68270479319125,-166.17085173973118,-114.40547036391597,-113.67213846792741,-115.0482318435905,-126.53606911742135,-109.36912359044393,-100.3856355481989,-151.44418910142883,-199.5434279533378,-105.94338681946076,-172.42239995451803,-190.2795158698456,-153.44477410417642,-117.66450547172815,-104.88297626314957,-175.6465596838815,-160.6352463251368,-110.84271355388427,-190.81690520130735,-136.99344816079048,-146.044454393705,-170.40200920123542,-120.92797616644535,-171.99392095673582,-117.45612487570531,-131.66115017491666,-121.40163177411382,-127.39229423695055,-126.32484590097874,-156.98161251189077,-129.51110763133468,-114.64388776678236,-186.748535450998,-121.8480736181661,-151.22503872259364,-136.58763251772803,-106.27698142250699,-145.8777136680379,-199.91047471819513,-107.99266702754964,-159.39309283712845,-166.16794388122128,-154.66183263562982,-128.01784759812315,-112.04214767931413,-102.64829853569589,-174.00200165286427,-193.6956877840183,-134.8156411252109,-187.26450821522042,-122.35594950410854,-165.84347667287165,-164.31396228404188,-179.69380741694388,-153.28737577809696,-102.66362284844632,-178.03141275346252,-129.68602206563594,-102.695927588597,-185.65390798755226,-146.48120818310778,-100.04887887399218,-140.73937882251246,-125.51484661661307,-199.68668813981353,-141.66780395014615,-117.96501513446493,-133.69468243593764,-128.49580508425015,-164.05650127782081,-167.90556420046863,-178.24838268743326,-161.07965076388217,-124.26156849585695,-197.0738086599248,-189.01472054295692,-111.16312767165195,-178.01631581353283,-174.59548623096563,-192.1904589279634,-141.29225342210523,-139.05523361503634,-155.74206170368478,-174.20443009230746,-173.1829682349372,-118.65116287102275,-194.1829590761869,-160.36470628660706,-122.50311842021048,-188.17196504317323,-147.3734447255284,-100.3357403804392,-103.4458077804072,-137.25553393727358,-173.5849434017368,-117.39411372145341,-155.51751691775314,-131.25867985020486,-191.86213663619787,-149.6452098837999,-143.9367910191179,-176.27199735449696,-188.4946102125697,-140.01088739030936,-185.17666979713746,-163.87033938559156,-133.0099682655893,-161.01078388790035,-169.6647923406803,-166.39346016249738,-197.59791722270305,-184.98544138743534,-199.23363701265032,-116.9614233519589,-181.78718847171007,-179.1968053738278,-161.5304786532594,-170.58892683179732,-140.6729108788859,-175.60995476213432,-189.23843296550882,-103.07764372411322,-144.50437953316018,-124.28349742822262,-103.8748359290765,-125.0698093621661,-177.26932449874795,-172.88203820429376,-157.40918642432644,-185.30501497875582,-187.2209795099129,-151.75690026930755,-101.1264860940579,-194.50660559947858,-172.6079688626131,-162.19541177314443,-160.4961056346844,-136.00735996076182,-149.58263026187618,-135.21604673295286,-145.4856097817865,-125.9468061082255,-158.19976266750655,-185.06546760637684,-175.367632635741,-184.9564288061769,-144.8974145688056,-165.44752088563882,-184.68639004800252,-101.45111685645433,-187.52887917429825,-123.37636200082449,-143.02025825864666,-180.12763001937364,-168.77708992548997,-126.20664519764819,-131.21305297132528,-120.70642124054677,-164.82425562759624,-116.78425941039556,-131.08278572944312,-194.28928188005676,-175.2015171190535,-107.94153787837458,-179.72154787988427,-125.94073609844241,-189.5244698800254,-122.08879419359245,-140.40048556611714,-175.8783626576656,-124.91735706003718,-126.76075219056409,-141.86502235319566,-126.24417287485848,-184.33758698434772,-141.51079466766834,-157.50169561942806,-159.02457570612347,-158.42694551500503,-142.50177860283364,-112.83464609054832,-193.5442401175249,-133.3452166629569,-125.45828303819479,-143.29834050652408,-131.48801000589665,-135.03553758112233,-108.70756633112752,-138.29875047126757,-135.32848376503787,-128.26537806514506,-131.76513673807702,-118.57523762017286,-146.01410027152153,-141.6942747227364,-107.60330488632862,-134.616519507314,-187.38626894798838,-188.04266728803606,-163.29707017308067,-182.80551982277302,-199.199599244605,-190.76253085252077,-148.48150869897606,-125.42369357161482,-168.6653434581272,-141.99495014831012,-127.17253540592823,-158.9873980879958,-128.908738771533,-118.46211073267597,-118.56344891404788,-106.48660580825313,-185.32280419615125,-162.23732596950688,-182.8749844951006,-160.9078613421915,-145.73440077785892,-145.27900777861797,-123.97511462650289,-171.88349745834904,-175.7631849826829,-108.22947443444319,-110.51659245251079,-125.3557190387964,-130.93811723205278,-158.8177684189716,-133.32856393361612,-154.7294094122662,-138.6704061839695,-174.12507613295602,-122.86256747493931,-177.1695783134537,-126.26250743420862,-133.07549244865118,-162.9637475145102,-143.99121561039618,-166.68828983251242,-107.71889526599696,-158.65816279176474,-132.104874546921,-106.40595781696325,-139.98659164123606,-106.32930510688838,-195.38903914108283,-124.74796177691859,-133.3772250063334,-161.8620867052303,-172.36825928106492,-132.96824138384716,-191.19051635258,-134.90829663071008,-165.65692810737454,-109.13436383026651,-121.79761753984555,-196.85207959620385,-111.87265961672443,-181.4305183912628,-118.35583676717367,-100.77015126218024,-147.81371006321234,-127.25773276539631,-186.56099568122505,-199.11819417284946,-185.7023543531129,-180.05782348734178,-150.3599448530568,-177.49035584719553,-144.90190997735564,-136.51873481219678,-118.19754374530736,-157.71783768338207,-146.72158169588909,-154.91508967815366,-157.71171531871386,-130.08902403928883,-195.83657158469452,-117.72765308494937,-104.7842059721625,-107.91422441159668,-170.1374877820934,-147.36027395366656,-108.05753232800308,-117.16481814816899,-180.07687153056332,-154.7199159809819,-126.08264115102705,-164.35519332302138,-116.7995391694965,-109.01351929628255,-100.52393921129108,-162.17767019780226,-158.99007842637835,-101.25788702395313,-130.2833629196837,-156.2406991923946,-101.02060249357814,-139.07124692380518,-126.88181728942827,-154.90520500482748,-110.73280300036697,-104.07891221951193,-171.71061898902275,-146.84086611253957,-156.984968808651,-193.08853142337148,-109.22315912802543,-199.7287629850697,-172.4049955192276,-152.70132082810744,-124.05960929254502,-168.22224246502833,-177.88597684963563,-123.79169261649167,-155.5748739132683,-114.62878717689384,-143.98815752777722,-124.82792076196286,-172.24689151708253,-185.819896745572,-140.74565626632662,-108.46199493546247,-186.11782158208956,-122.52333757148111,-143.90471592955384,-182.9402300154299,-174.62624075623287,-171.30887906999806,-109.33212446345411,-108.87158303486366,-162.44621693190572,-139.88209274297412,-163.92068271129673,-159.37777540949884,-125.51582047857394,-113.44564588938668,-123.79875204225141,-148.7479749282689,-109.67054759309364,-177.17037334002612,-184.01840388397505,-161.97929347722726,-151.5255461161089,-190.9814778975694,-193.1808419809137,-124.15472356650503,-140.92892780655473,-148.10190410726815,-195.21940536851397,-190.28445973996924,-188.12715689967652,-135.69940297991002,-148.0528754628006,-190.67403292242562,-180.4110029097078,-160.31082979091093,-195.23489767345276,-152.56413489438972,-121.14783973597902,-142.22934590073967,-103.25551214706965,-184.3203606288766,-102.51355123411867,-162.02300780981716,-171.05088745493399,-198.88978138804504,-187.131834819714,-136.33152686144044,-188.2811932292586,-103.33437213410788,-150.16161568467214,-156.5115265891957,-176.67860702322776,-109.54757463848286,-110.8945711852287,-161.65587831593814,-126.1742866737138,-106.24634106474682,-149.4463226395061,-116.73412673636354,-129.94974145949323,-134.37073949807666,-119.97456655508532,-178.67303151177416,-144.62356688834512,-196.93763312938782,-180.779625500207,-145.06047872707077,-109.905117458777,-155.52605314214514,-157.75391731540324,-125.48079545626867,-138.32861516826057,-140.24213618475767,-129.76777366717448,-198.6144337388734,-117.98728699780547,-174.68034174096144,-127.17377218159449,-176.32155794029404,-120.495671017457,-124.77560809532315,-159.1573001532858,-164.28421080871922,-176.30716887228908,-163.6441631632946,-158.62202341865043,-169.13364338502856,-135.1147585066667,-157.37448551415895,-153.73093005037515,-147.35993542554516,-166.31444570387166,-109.13719215360567,-131.1334851234855,-148.14941933817593,-167.4057815351405,-146.4945627103113,-199.54065230657505,-103.21670246451149,-186.2020790024747,-153.1134058679323,-197.02905082851618,-133.99292130351964,-110.9987154716088,-182.95940496729258,-187.72926549813263,-192.6901785081351,-178.08982696934464,-181.94277229501773,-163.37792522442518,-195.23018450464374,-169.94333926319047,-161.53557715932624,-165.73057916836615,-165.41793997857476,-176.7793077844404,-128.13216688954643,-103.0208477387347,-102.20971632930372,-198.1546121729325,-164.37579794429368,-149.32892779472496,-179.48527166071833,-129.52637155499212],"gamma":[0.7575082267372579,11.425895766560576,8.78896917267249,18.33200114746557,4.371411299373071,6.137113555290314,3.6856756619134234,17.43666215018164,3.2463974181874633,17.01080035489199,2.644951096841366,13.091361023816091,9.827537430927716,4.461146984809901,17.69367018749916,6.426338733022243,10.798024272406126,13.800609790605503,17.87752652357229,3.052996858395063,7.201250777888997,14.21055076721785,15.264447748356936,7.238142926254514,4.871908652134058,12.464580129106984,3.5536382418030232,18.79709879968585,14.1427603767485,4.440508163816244,0.8190123510297687,9.173869775242096,8.2614322106742,14.78653068530198,5.863153688636871,16.359329784423785,17.43243458914547,13.525155764815224,7.670659065785359,18.15994589717263,7.176816963857484,10.520963843408815,9.064824056966394,12.490040646807032,13.271070952598262,4.183339003197624,12.208068827207072,11.6468367366027,16.044673702771167,13.476602966818394,4.86367177930886,12.197651458869231,14.292551466795071,19.46503958309477,16.829319606571694,18.120034650465698,7.905168800526345,17.065109937812316,7.433078308314114,10.979360025018421,10.207264925230115,0.5307387717819978,17.061221061807338,10.857921000700417,19.059769283749006,5.8097136697314244,17.828609317212244,2.4451070875896663,16.32293294307334,6.148865519849687,18.12415498717865,12.138991545067178,13.857788914168086,16.479725096797004,19.069896235206848,13.16429186262389,0.8086137546986771,13.96595872363465,17.57756292039568,4.113796488407275,4.178707587137804,14.656113899855931,11.246399227257399,9.349503474657066,0.37635331695904384,4.006460965307568,5.690050893129257,15.712018867956594,2.343329133621741,2.4881236862787492,5.470052531188991,17.992325472342934,4.639287686374578,4.521064343106738,12.041376459249822,19.04890627664472,19.974822940501497,12.039570821294987,16.470800602575224,17.610843640093698,5.981259404547559,2.5965149837038437,0.6868261523187691,19.265186284348324,12.40095920774706,13.432984176020915,5.254846048713797,10.35435911470695,3.7091228605140225,19.9628654834884,1.189419935413376,12.115665299091214,7.135952407759563,16.365495463659286,16.952079516144536,4.952946253021633,4.648379901041895,15.646180315083576,19.20248404425426,7.790647279056793,16.11491394965302,19.841336024636004,1.0899272238023183,8.184821728734821,4.199242342009977,10.745171478721547,9.773535440084418,7.457927448894153,12.99363728717994,1.3072189222999553,16.180732838853725,15.154045916241564,14.85536328147614,10.243529533708333,16.169337750682082,6.56906000262182,15.010122880265232,8.743979122870368,0.09339486737720559,14.479259338059226,11.242262059981725,6.980179650269376,15.320240973126126,10.484562745712047,12.38722740308512,2.99432996796694,10.999133791362334,3.410270352536773,9.54200534642359,3.1938475241360553,10.752066931240849,8.887590346778715,0.44510723812403175,15.319750117128045,17.923144901260248,5.236534137428621,10.50378072805319,19.815161208664666,4.18316663516292,12.293691049348197,14.83445231997829,2.004430384516329,17.649270140754414,1.2200258869713299,9.17064951811318,7.819683255138856,5.033533838778026,16.481650083059336,6.163368635053015,19.535259552262012,17.350768130979844,15.290024061955467,9.932438723759205,9.224519309043995,6.119494261346179,13.500554263168798,18.68506625399544,7.848582933233907,10.140197638659965,1.3986330985242157,9.454540298449086,18.918055936419222,5.247145474519672,8.503506034870796,16.56719663990854,11.376315496687353,12.121636917234607,0.561416826675809,16.242698095775303,12.289083102944257,1.261115016527441,10.400722361523167,12.947274707038234,2.216278561870877,4.5596986190573,18.574235576608547,11.35443082297455,8.746187728437299,3.8966275587374,10.172178034335397,5.520656923166216,12.96989864995897,10.705578203302487,11.349992649444633,16.166383623707844,13.764820865257526,19.392164963120383,11.849256750165274,12.010554213467287,11.323336334239329,7.893272235224611,15.054224162272005,10.247366191734915,9.169162877375946,10.835694295365137,0.6485042739288405,8.745583179161486,12.414640365421743,12.996326778972605,16.88565586583372,16.07108363582023,18.968910879469636,4.3342660830048585,16.14480628694123,17.93387427840007,1.7213109502987756,11.627888218616258,2.2812030940595562,17.218627758576808,8.001997422178832,7.531602950833953,16.587464086543097,15.258696517393613,11.49598070867976,3.6495987091286297,11.848770213881338,2.86458122626307,5.1510749057878735,7.769646674028503,11.57952734580293,7.266674863427607,15.912316745322146,11.94937422586285,15.985937301303084,12.656197765131969,19.49358638332423,16.843648272858033,2.5363769919721912,5.48115185278887,11.19997732859403,9.510158024051982,4.4832123735674045,12.249981227226092,4.658924773042896,14.628416269755053,9.336282958123462,19.346210936741905,18.466869590505794,19.09071732066124,10.79858231702981,17.820115054706292,18.919147309389935,2.7790690818772656,10.35130801533169,9.178739328171535,19.525793727032827,13.690211014146065,13.42014864300939,13.895443587273931,14.066934727302458,7.28633590238188,9.460778749723744,10.475465642485045,1.611731392654856,19.59468039716898,4.472491668678198,9.31645423327954,4.162573724392651,12.47900639005794,3.4561962377865374,16.110859869437316,17.472105750456556,5.623674989209966,4.998863346830955,7.971965415914388,8.801287587922818,11.8087096723109,18.81007352889732,15.147965647220417,6.076789648557623,8.949552483396603,9.732881185528672,15.792644488321343,19.694445926322906,15.322172825268785,9.050843598420988,4.925468332188689,13.684644465503514,6.1870725824326644,15.270379095716313,7.963095260496229,0.5021463538665083,14.604519800520084,1.9125485940389186,5.332808512554843,9.422645396912447,5.593117935882783,17.34217537503104,14.200857547797439,15.763003100919097,4.605669231317293,18.338721087075385,17.323730318376942,11.230127771080141,9.47823591640882,14.822277459733835,6.566823120929297,11.481248951337125,9.761910694048893,14.837839175931698,10.040761666326382,15.68245134259843,12.411982295162707,9.696842861391918,12.627125341539859,17.64789157836523,19.650343167431515,15.528563469270162,11.337329041012577,8.92163178234918,13.822282915222015,10.385192988893603,16.550566135268888,2.5882044661224857,15.472213729558565,18.92402885348192,3.287100135982195,1.744545453576536,19.471601144479486,13.424138245553614,7.452893018005935,1.6606969020744167,17.536405713476945,17.82661127602418,7.933300102469154,3.6550177560652575,18.613122733078736,12.829142533034045,19.183411469585888,10.703899315263818,8.307326971007068,9.124009788155224,13.3242690364029,9.032836738933288,7.559101807981312,1.9379658947483502,1.983957075905547,13.059630489115506,15.60085998799373,14.729113055561731,19.39067220883066,2.04572881239685,16.060673143173663,18.097629641797766,10.786627908075875,10.220573342306167,19.768066836745128,15.571334254188676,18.67845416095615,4.078227379429773,2.8198142390035974,1.0065667320382943,17.00852841241918,2.618003297889353,19.37157796699325,18.517832334493455,0.894811236437052,8.895303012584993,16.89508915378471,3.653825387581535,10.206139954050016,8.757031823374835,12.623865177600976,9.39514214141115,6.976991396629484,19.174325617661594,10.846629085284167,12.509284547593786,13.996069105837513,16.331162417618184,11.35285763894144,11.82907380876002,14.813916852181537,5.861739144358333,9.055865281297425,13.659342854288465,2.010917030600967,1.5307628703377274,10.086655382344212,6.4750392262573,0.0688245113159569,18.37152833612176,7.7339222976169575,16.949312096089706,8.183039232226829,14.4506399725495,0.2538873086830229,3.5312938264639016,8.606532201199077,4.421240335073806,19.95802518332929,17.74065976759724,8.181227169302838,1.4962950706602784,4.536936671444685,0.38503079910957805,19.328909219257078,13.397012452328223,3.0365492751195466,14.122330777042102,16.70199322296858,1.9474817154904844,16.624234714754003,15.948208371771994,13.520590739806075,18.69518171109881,3.145046339082911,14.145686169601003,9.79420131736337,11.854331254718051,9.759190393656514,10.964156382539741,0.8264706661113541,9.60911895623826,0.92037432582456,8.532409911380384,18.85576156367208,12.32068607463319,11.039355807355985,17.373656986581445,10.733899604524533,3.503244010281863,15.125159514876003,0.8733595398311866,14.376058860324669,8.377734561724894,8.611305913860452,14.242515385666064,9.833113603788991,8.632699070377425,6.946528365164197,3.3810715416237347,11.039149514242856,4.571277346625848,17.914419455068217,5.3440003248774515,6.812145430467171,5.269069608839074,19.757243724146885,13.625532084193267,2.6375165897895236,5.066801864002675,0.9584436043412925,6.788825029369243,18.495366259563223,0.8573899590741352,4.1912776846124045,10.19090730341873,4.65659647095761,15.247286289966638,12.932812952122287,7.3202662049820955,6.936287727405284,0.2670545717863648,15.157998184099162,12.328683129918137,14.875775548543512,2.5779078238117137,8.617940543615505,13.940367048531774,4.289556220082504,18.92815406779428,7.040170844545304,15.384433669614301,17.951827827129648,10.842799019173306,19.41856115134997,5.723212708926444,0.8558119627020355,8.813446596907832,10.978345731519315,15.059145256349748,17.26160732307008,15.91012351940067,14.658539822748544,1.3631519474571663,17.342962618154655,3.274201599913451,11.286632963652155,12.443968673323408,16.011328388121843,8.320090060089807,3.9764605250991503,12.123453556867979,0.5550286542009308,5.222164296135556,11.31470592434328,1.1869634447257127,18.788236264802357,19.69443393253617,6.657679261007612,2.9553387542213505,8.622596965684046,3.4233925387948316,9.638267608025464,16.513446376897086,5.88405563834852,15.213024482150423,5.3276948665438795,17.651550374113107,5.775108909639277,6.313297319526039,11.499217176639473,18.80421231221382,8.857184761454867,9.16871385856179,14.752488821262677,12.322180956528953,3.899148955823737,13.192574840668993,5.508198838684719,7.721890286946889,16.83352573399857,1.5720582235159153,16.63168901758539,17.140293692870046,18.885670677982162,6.92595180803397,18.81563312791073,13.330797243561289,17.618706639887506,10.943278342481175,9.395199116608648,19.119074187356123,3.9384861864490484,19.569848000743498,4.932555436727624,14.734018894841313,12.10689655477665,11.661848211243214,8.791488698604436,19.65393525253587,19.75452225679923,9.24123009554246,10.464463946785013,9.682012885104978,2.025961634171791,6.451587884344159,16.978435335240746,9.102937115832912,11.967001020195912,14.964017386632339,9.202164478505646,12.924167065624971,16.146422961316098,14.780502443405062,17.420534288921168,6.73162732019065,3.5859922151167023,5.193884369212065,19.160490724632233,19.149297843802387,1.762970457514248,11.57072517348361,13.204994027570152,14.892018434494702,12.360938820827418,14.660183651872561,15.855050772614096,9.04920433751046,3.0342312120840687,2.265117090182245,12.749391033758632,13.160011498359703,9.55163721540738,15.213623227852615,9.393944339205177,10.201010780703314,5.627036944210144,5.043929922637691,2.2900805374621314,1.942876945121963,6.32314835275543,14.513498635428054,2.1568107661063562,0.2873953467070445,9.467690654692777,5.244003132459789,16.322257491588612,5.559029981304224,10.582341564259142,5.099462540561266,14.973835945403472,18.693843256706227,14.870837062747073,17.293442683845658,4.75570966359145,2.619554273405469,8.22309433532836,16.06419355735621,6.221208781340528,13.365289003267842,9.939578055971205,4.7565268427966645,8.872886398378643,16.29064203682553,17.367948579072937,16.699220362400705,3.4501489888042247,4.821510725547027,14.55452731140018,8.401902429822762,8.495329840347692,14.09418536369369,4.555799021294087,11.175008601516216,15.288708088619902,6.302597458312342,15.175445751198854,0.45280394053434314,9.406247268827478,10.550612412245544,12.44411482779251,19.709971342128895,0.7482278447939894,9.339454169822767,0.17484787361740306,14.690210612291184,15.340573766046944,14.777786773464738,6.682125946023003,17.398989396978788,2.6762359512024725,17.72279379003146,17.071574361653834,2.853192453007849,7.122573222437878,2.2035900241311213,5.840218475998196,3.842854448855899,4.847408231549384,11.480150572711128,2.7167101092807577,12.219659533536703,5.6259473779387825,1.8581789369838297,5.004179470189438,3.1526213175549334,10.541814202838324,12.685756828006816,2.9086284182643007,9.660511226861207,9.300198889411595,1.2677057043045847,5.263775729855822,12.806373331054942,16.98879500584387,4.052963147253994,7.232413737988712,1.6597178411755475,3.2220547014054146,6.192301479257254,15.828546236542733,9.558878160157448,12.297987616172176,14.148965234616249,12.179714560706127,4.717322943458098,16.612296885436816,1.5931905968261484,14.357524961358132,1.1854542025673798,12.358653292587874,7.2199734412589045,9.92750602474436,6.5898158557956465,17.22745588997746,17.48414143477243,19.23469825739643,19.861850450412284,19.461254051971437,12.820013703492648,14.847771846950462,7.1408819219700215,16.26782771098376,18.624824815923073,11.533802734930706,0.3137593168454966,7.714911313996993,7.2662778737921885,15.8229998780368,8.41909581595238,3.8355429816546094,0.6994317017761187,7.6735035597589585,13.311426120577927,16.00632066713501,16.712660722330682,11.732465737048576,7.289090508492366,11.915032557133841,2.825402418404712,11.840894637623517,0.3394698831063314,18.988798601813457,0.6608168058893993,9.721553502293382,16.005344810150135,9.87273587899244,8.45861455233084,6.796568380629542,8.746158833766039,19.10212603488674,4.203719979856859,5.536628600250504,0.8829771735842717,4.681039868933832,0.5141103332637131,5.930973832771356,15.746107607149593,3.18793488659618,6.3829369782778445,5.773308405448758,0.11606003960658029,18.221904575756994,0.8677103732949432,16.128338841633784,0.8007314931235587,8.918120559976872,15.382187983481167,14.873421560816539,1.9499735451924893,4.60430587478978,9.05375821896456,18.93540158827522,6.774921164313126,3.5538006486632012,7.288207670912277,18.903229886910818,18.278375850346368,16.641568374504804,7.528599685187443,0.034577784000600076,4.586548837351598,4.976970282250877,16.51647997276865,14.094683411115758,14.763318404194683,9.568713479488382,18.408937941377882,9.966025415135897,14.46738153156636,7.557014745661634,6.974390748479218,2.8039747346326527,17.17026511797154,5.243508942243524,7.0723372458895195,12.234549592158913,1.8431874552720062,14.798697842751874,1.4684280007905492,9.843249571007835,9.7319206072175,4.617456778996147,3.314177998696586,9.582236001061318,2.3030277936532295,19.887941221089804,4.534603372006045,19.45283076401937,15.26291603457556,3.483444054052849,5.176969967086018,3.9371145215672643,1.7994529541692739,7.915040671341411,19.126117947161116,17.69650342275764,12.809076019255876,4.03589947345901,6.522263323046014,1.7154312311899123,1.2546292593658581,9.338508151187334,15.910007938818689,13.357095258432432,13.504659940912225,19.762625305761258,5.178900557950135,18.295501255971743,14.547160600802655,4.0878475727787045,15.869331048486215,18.131722682596898,4.58916879870602,15.24940611398263,4.960143016370142,15.841414003953322,9.017892167777536,17.132412983334802,14.507926296475011,5.474695794265982,13.635614030649773,1.8300313215526876,1.8021909539973446,12.202033234498462,1.3778535383091661,2.4841316301702188,8.917592335716261,16.99662560238287,0.6679693521966179,1.0440258200509023,11.624673073299165,19.123859352952998,6.5231000850012055,0.22828016351954528,0.6661830270608826,9.898099553629706,1.0980874166475108,3.343282158777443,4.579031605560933,15.800535467452717,15.601194153109086,14.81544615449418,4.752129471842177,5.225395235940367,19.348521589843557,2.810292677494002,1.6291926492073072,19.55828153604713,4.5626741100120904,4.131633309245291,5.84567037459967,7.6501172194804035,3.8507355503004037,12.402932697827339,5.1897137566413365,10.59075150015162,7.549599005726839,0.42516536886421985,11.185718441180548,13.803744193266713,7.742407433809935,3.4577392232617044,16.62318766984534,4.692189571897414,4.3752243323145334,15.96536058354706,5.213030565833567,8.508706664251044,0.7459587045543126,5.8453154171222454,16.196958501671936,0.6168852716501183,12.128275404451738,8.286609377029524,7.011816325730349,10.706821314235814,6.873558431166189,17.91021061221709,7.390401751849889,6.636536772192221,5.232672760969073,4.509834408210418,14.424772709712435,11.848397108574783,14.363847266778773,5.65963666845021,6.444409703739069,10.315659498959672,15.779527679911304,10.88542419046533,9.732675665383205,3.077934876926638,13.054265868535468,8.117032997654086,10.49672738410026,8.906996611948625,11.749048288292908,10.341257546117966,14.719009177571527,13.944215729797627,12.40949309904838,16.650474207893534,5.153955026856667,8.631737978230504,5.304265326228514,16.72657085987279,18.62331188956739,16.699210111676322,14.217764155348398,15.008540742010954,15.601630127779774,9.875331793080866,11.049437317943571,3.194288513103114,1.910857708904512,14.507355483249377,18.856461512712475,13.188662806553353,6.139819037892855,9.843647192117624,11.331994010659784,7.353861268931419,7.152325598986451,1.3996438922601273,10.931003787482512,12.16431897505544,15.338129714813288,4.759488374303538,11.436379150065852,5.675719344590036,13.020211594044873,9.952083074541278,2.0943590942965873,2.389138798670194,16.064642389887783,5.801038890805192,7.794137948660627,4.715551368069986,14.005387883049401,10.647849987047708,11.908533898462753,4.4306915871523955,12.568061754339116,10.430832397374044,9.030738559377202,10.07686152508295,4.334102617223978,7.412113501584554,16.872625002301547,0.618142116340632,0.3392203148238737,8.12738079581095,17.4385384329709,14.125798232696273,4.447590633815373,11.401910620141464,18.440484872150563,4.576132497836807,4.796445998865644,10.217281521156991,5.087091831512702,7.9631488071124545,14.386618376103936,17.101457604370115,17.75032481501707,4.851054079527919,12.875973785354535,7.164147958144733,9.23208074850169,6.284195278382851,18.360011705803334,16.19851069954666,6.603254558870422,16.165170472488228,11.099387196808399,9.580835040808884,2.0258627974974663,13.166298404662506,10.618842506008232,14.91044875329067,18.74454091575155,18.53901002258494,7.419086475310515,14.605673843866885,9.46851304429535,10.593887146463148,7.299795216804861,0.02983896208542447,12.270591866482693,13.465398073034706,15.036462306597382,1.3995921236244158,6.907234103981623,0.5060733055261402,10.203507086377241,6.073638288467356,6.773680206253521,15.504383673796372,3.2028907286088737,19.985418268532054,1.4295306327991808,15.382789828271184,11.467874580038732,3.837206729997802,6.997675726992636,14.6062177684659,11.565875199308827]}
},{}],56:[function(require,module,exports){
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

var largeGamma = require( './fixtures/julia/large_gamma.json' );
var negativeMedian = require( './fixtures/julia/negative_median.json' );
var positiveMedian = require( './fixtures/julia/positive_median.json' );


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

	logpdf = factory( 0.0, 1.0 );
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

tape( 'if provided a valid `x0` and `gamma`, the function returns a function which returns `-Infinity` when provided `+infinity` for `x`', function test( t ) {
	var logpdf;
	var y;

	logpdf = factory( 0.0, 1.0 );
	y = logpdf( PINF );
	t.equal( y, NINF, 'returns -Infinity' );

	t.end();
});

tape( 'if provided a valid `x0` and `gamma`, the function returns a function which returns `-Infinity` when provided `-infinity` for `x`', function test( t ) {
	var logpdf;
	var y;

	logpdf = factory( 0.0, 1.0 );
	y = logpdf( NINF );
	t.equal( y, NINF, 'returns -Infinity' );

	t.end();
});

tape( 'if provided a nonpositive `gamma`, the created function always returns `NaN`', function test( t ) {
	var logpdf;
	var y;

	logpdf = factory( 0.0, 0.0 );
	y = logpdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = logpdf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

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

tape( 'the created function evaluates the logpdf for `x` given `x0` and `gamma` (large gamma)', function test( t ) {
	var expected;
	var logpdf;
	var delta;
	var gamma;
	var tol;
	var x0;
	var i;
	var x;
	var y;

	expected = largeGamma.expected;
	x = largeGamma.x;
	x0 = largeGamma.x0;
	gamma = largeGamma.gamma;
	for ( i = 0; i < x.length; i++ ) {
		logpdf = factory( x0[i], gamma[i] );
		y = logpdf( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', x0: '+x0[i]+', gamma: '+gamma[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 6.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. x0: '+x0[i]+'. gamma: '+gamma[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the created function evaluates the logpdf for `x` given `x0` and `gamma` (`x0 < 0`)', function test( t ) {
	var expected;
	var logpdf;
	var delta;
	var gamma;
	var tol;
	var x0;
	var i;
	var x;
	var y;

	expected = negativeMedian.expected;
	x = negativeMedian.x;
	x0 = negativeMedian.x0;
	gamma = negativeMedian.gamma;
	for ( i = 0; i < x.length; i++ ) {
		logpdf = factory( x0[i], gamma[i] );
		y = logpdf( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', x0: '+x0[i]+', gamma: '+gamma[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 1.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. x0: '+x0[i]+'. gamma: '+gamma[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the created function evaluates the logpdf for `x` given `x0` and `gamma` (`x0 > 0`)', function test( t ) {
	var expected;
	var logpdf;
	var delta;
	var gamma;
	var tol;
	var x0;
	var i;
	var x;
	var y;

	expected = positiveMedian.expected;
	x = positiveMedian.x;
	x0 = positiveMedian.x0;
	gamma = positiveMedian.gamma;
	for ( i = 0; i < x.length; i++ ) {
		logpdf = factory( x0[i], gamma[i] );
		y = logpdf( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', x0: '+x0[i]+', gamma: '+gamma[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 1.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. x0: '+x0[i]+'. gamma: '+gamma[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

}).call(this,"/lib/node_modules/@stdlib/math/base/dists/cauchy/logpdf/test/test.factory.js")
},{"./../lib/factory.js":50,"./fixtures/julia/large_gamma.json":53,"./fixtures/julia/negative_median.json":54,"./fixtures/julia/positive_median.json":55,"@stdlib/constants/math/float64-eps":26,"@stdlib/constants/math/float64-ninf":34,"@stdlib/constants/math/float64-pinf":35,"@stdlib/math/base/assert/is-nan":46,"@stdlib/math/base/special/abs":60,"tape":188}],57:[function(require,module,exports){
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

}).call(this,"/lib/node_modules/@stdlib/math/base/dists/cauchy/logpdf/test/test.js")
},{"./../lib":51,"tape":188}],58:[function(require,module,exports){
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

var largeGamma = require( './fixtures/julia/large_gamma.json' );
var negativeMedian = require( './fixtures/julia/negative_median.json' );
var positiveMedian = require( './fixtures/julia/positive_median.json' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.equal( typeof logpdf, 'function', 'main export is a function' );
	t.end();
});

tape( 'if provided `NaN` for any parameter, the function returns `NaN`', function test( t ) {
	var y;

	y = logpdf( NaN, 0.0, 1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = logpdf( 0.0, NaN, 1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = logpdf( 0.0, 1.0, NaN );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = logpdf( 0.0, NaN, NaN );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = logpdf( NaN, 1.0, NaN );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = logpdf( NaN, NaN, 1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = logpdf( NaN, NaN, NaN );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'if provided `+infinity` for `x` and a finite `x0` and `gamma`, the function returns `-Infinity`', function test( t ) {
	var y = logpdf( PINF, 0.0, 1.0 );
	t.equal( y, NINF, 'returns -Infinity' );
	t.end();
});

tape( 'if provided `-infinity` for `x` and a finite `x0` and `gamma`, the function returns `-Infinity`', function test( t ) {
	var y = logpdf( NINF, 0.0, 1.0 );
	t.equal( y, NINF, 'returns -Infinity' );
	t.end();
});

tape( 'if provided a nonpositive `gamma`, the function always returns `NaN`', function test( t ) {
	var y;

	y = logpdf( 2.0, 0.0, 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = logpdf( 2.0, 0.0, -1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = logpdf( 0.0, 0.0, -1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = logpdf( 2.0, 0.0, NINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = logpdf( 2.0, PINF, NINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = logpdf( 2.0, NINF, NINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = logpdf( 2.0, NaN, NINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'the function evaluates the logpdf for `x` given `x0` and `gamma` (large `gamma`)', function test( t ) {
	var expected;
	var delta;
	var gamma;
	var tol;
	var x0;
	var x;
	var y;
	var i;

	expected = largeGamma.expected;
	x = largeGamma.x;
	x0 = largeGamma.x0;
	gamma = largeGamma.gamma;
	for ( i = 0; i < x.length; i++ ) {
		y = logpdf( x[i], x0[i], gamma[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', x0 :'+x0[i]+', gamma: '+gamma[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 6.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. x0: '+x0[i]+'. gamma: '+gamma[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the function evaluates the logpdf for `x` given `x0` and `gamma` (`x0 < 0`)', function test( t ) {
	var expected;
	var gamma;
	var delta;
	var tol;
	var x0;
	var x;
	var y;
	var i;

	expected = negativeMedian.expected;
	x = negativeMedian.x;
	x0 = negativeMedian.x0;
	gamma = negativeMedian.gamma;
	for ( i = 0; i < x.length; i++ ) {
		y = logpdf( x[i], x0[i], gamma[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', x0 :'+x0[i]+', gamma: '+gamma[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 1.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. x0: '+x0[i]+'. gamma: '+gamma[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the function evaluates the logpdf for `x` given `x0` and `gamma` (`x0 > 0`)', function test( t ) {
	var expected;
	var delta;
	var gamma;
	var tol;
	var x0;
	var x;
	var y;
	var i;

	expected = positiveMedian.expected;
	x = positiveMedian.x;
	x0 = positiveMedian.x0;
	gamma = positiveMedian.gamma;
	for ( i = 0; i < x.length; i++ ) {
		y = logpdf( x[i], x0[i], gamma[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', x0 :'+x0[i]+', gamma: '+gamma[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 1.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. x0: '+x0[i]+'. gamma: '+gamma[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

}).call(this,"/lib/node_modules/@stdlib/math/base/dists/cauchy/logpdf/test/test.logpdf.js")
},{"./../lib":51,"./fixtures/julia/large_gamma.json":53,"./fixtures/julia/negative_median.json":54,"./fixtures/julia/positive_median.json":55,"@stdlib/constants/math/float64-eps":26,"@stdlib/constants/math/float64-ninf":34,"@stdlib/constants/math/float64-pinf":35,"@stdlib/math/base/assert/is-nan":46,"@stdlib/math/base/special/abs":60,"tape":188}],59:[function(require,module,exports){
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

},{}],60:[function(require,module,exports){
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

},{"./abs.js":59}],61:[function(require,module,exports){
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

},{"@stdlib/number/float64/base/from-words":88,"@stdlib/number/float64/base/get-high-word":92,"@stdlib/number/float64/base/to-words":103}],62:[function(require,module,exports){
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

},{"./copysign.js":61}],63:[function(require,module,exports){
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

},{}],64:[function(require,module,exports){
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

},{"./floor.js":63}],65:[function(require,module,exports){
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

},{"./ldexp.js":66}],66:[function(require,module,exports){
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

},{"@stdlib/constants/math/float64-exponent-bias":27,"@stdlib/constants/math/float64-max-base2-exponent":32,"@stdlib/constants/math/float64-max-base2-exponent-subnormal":31,"@stdlib/constants/math/float64-min-base2-exponent-subnormal":33,"@stdlib/constants/math/float64-ninf":34,"@stdlib/constants/math/float64-pinf":35,"@stdlib/math/base/assert/is-infinite":42,"@stdlib/math/base/assert/is-nan":46,"@stdlib/math/base/special/copysign":62,"@stdlib/number/float64/base/exponent":86,"@stdlib/number/float64/base/from-words":88,"@stdlib/number/float64/base/normalize":94,"@stdlib/number/float64/base/to-words":103}],67:[function(require,module,exports){
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

},{"./ln.js":68}],68:[function(require,module,exports){
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

},{"./polyval_p.js":69,"./polyval_q.js":70,"@stdlib/constants/math/float64-exponent-bias":27,"@stdlib/constants/math/float64-ninf":34,"@stdlib/math/base/assert/is-nan":46,"@stdlib/number/float64/base/get-high-word":92,"@stdlib/number/float64/base/set-high-word":98}],69:[function(require,module,exports){
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
		return 0.6666666666666735;
	}
	return 0.6666666666666735 + (x * (0.2857142874366239 + (x * (0.1818357216161805 + (x * 0.14798198605116586))))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

},{}],71:[function(require,module,exports){
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

},{"./log1p.js":72}],72:[function(require,module,exports){
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

},{"./polyval_lp.js":73,"@stdlib/constants/math/float64-exponent-bias":27,"@stdlib/constants/math/float64-ninf":34,"@stdlib/constants/math/float64-pinf":35,"@stdlib/math/base/assert/is-nan":46,"@stdlib/number/float64/base/get-high-word":92,"@stdlib/number/float64/base/set-high-word":98}],73:[function(require,module,exports){
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

},{}],74:[function(require,module,exports){
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

},{"./pow.js":80}],75:[function(require,module,exports){
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

},{"./polyval_l.js":77,"@stdlib/constants/math/float64-exponent-bias":27,"@stdlib/number/float64/base/get-high-word":92,"@stdlib/number/float64/base/set-high-word":98,"@stdlib/number/float64/base/set-low-word":100}],76:[function(require,module,exports){
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

},{"./polyval_w.js":79,"@stdlib/number/float64/base/set-low-word":100}],77:[function(require,module,exports){
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

},{}],78:[function(require,module,exports){
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

},{}],79:[function(require,module,exports){
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

},{}],80:[function(require,module,exports){
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

},{"./log2ax.js":75,"./logx.js":76,"./pow2.js":81,"./x_is_zero.js":82,"./y_is_huge.js":83,"./y_is_infinite.js":84,"@stdlib/constants/math/float64-ninf":34,"@stdlib/constants/math/float64-pinf":35,"@stdlib/math/base/assert/is-infinite":42,"@stdlib/math/base/assert/is-integer":44,"@stdlib/math/base/assert/is-nan":46,"@stdlib/math/base/assert/is-odd":48,"@stdlib/math/base/special/abs":60,"@stdlib/math/base/special/sqrt":85,"@stdlib/number/float64/base/set-low-word":100,"@stdlib/number/float64/base/to-words":103,"@stdlib/number/uint32/base/to-int32":107}],81:[function(require,module,exports){
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

},{"./polyval_p.js":78,"@stdlib/constants/math/float64-exponent-bias":27,"@stdlib/constants/math/float64-ln-two":30,"@stdlib/math/base/special/ldexp":65,"@stdlib/number/float64/base/get-high-word":92,"@stdlib/number/float64/base/set-high-word":98,"@stdlib/number/float64/base/set-low-word":100,"@stdlib/number/uint32/base/to-int32":107}],82:[function(require,module,exports){
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

},{"@stdlib/constants/math/float64-ninf":34,"@stdlib/constants/math/float64-pinf":35,"@stdlib/math/base/assert/is-odd":48,"@stdlib/math/base/special/copysign":62}],83:[function(require,module,exports){
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

},{"@stdlib/number/float64/base/get-high-word":92}],84:[function(require,module,exports){
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

},{"@stdlib/constants/math/float64-pinf":35,"@stdlib/math/base/special/abs":60}],85:[function(require,module,exports){
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

},{}],86:[function(require,module,exports){
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

},{"@stdlib/constants/math/float64-smallest-normal":36,"@stdlib/math/base/assert/is-infinite":42,"@stdlib/math/base/assert/is-nan":46,"@stdlib/math/base/special/abs":60}],97:[function(require,module,exports){
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

},{"./uint16array.js":122,"@stdlib/assert/is-uint16array":20,"@stdlib/constants/math/uint16-max":37}],121:[function(require,module,exports){
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

},{"./uint32array.js":125,"@stdlib/assert/is-uint32array":22,"@stdlib/constants/math/uint32-max":38}],124:[function(require,module,exports){
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

},{"./uint8array.js":128,"@stdlib/assert/is-uint8array":24,"@stdlib/constants/math/uint8-max":39}],127:[function(require,module,exports){
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
},{}]},{},[56,57,58]);
