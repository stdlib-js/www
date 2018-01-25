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

},{"./float64array.js":1,"./polyfill.js":3,"@stdlib/utils/detect-float64array-support":185}],3:[function(require,module,exports){
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

},{"./polyfill.js":5,"./uint16array.js":6,"@stdlib/utils/detect-uint16array-support":191}],5:[function(require,module,exports){
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

},{"./polyfill.js":8,"./uint32array.js":9,"@stdlib/utils/detect-uint32array-support":194}],8:[function(require,module,exports){
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

},{"./polyfill.js":11,"./uint8array.js":12,"@stdlib/utils/detect-uint8array-support":197}],11:[function(require,module,exports){
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

},{"@stdlib/utils/native-class":199}],17:[function(require,module,exports){
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

},{"@stdlib/utils/native-class":199}],22:[function(require,module,exports){
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

},{"@stdlib/utils/native-class":199}],24:[function(require,module,exports){
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

},{"@stdlib/utils/native-class":199}],26:[function(require,module,exports){
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
* The Euler-Mascheroni constant.
*
* @module @stdlib/constants/math/float64-eulergamma
* @type {number}
*
* @example
* var GAMMA = require( '@stdlib/constants/math/float64-eulergamma' );
* // returns 0.5772156649015329
*/


// MAIN //

/**
* The Euler-Mascheroni constant.
*
* @constant
* @type {number}
* @default 0.5772156649015329
* @see [OEIS]{@link http://oeis.org/A001620}
* @see [Mathworld]{@link http://mathworld.wolfram.com/Euler-MascheroniConstant.html}
*/
var GAMMA = 0.577215664901532860606512090082402431042;


// EXPORTS //

module.exports = GAMMA;

},{}],28:[function(require,module,exports){
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

},{}],29:[function(require,module,exports){
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

},{}],30:[function(require,module,exports){
'use strict';

/**
* Natural logarithm of the square root of `2π`.
*
* @module @stdlib/constants/math/float64-ln-sqrt-two-pi
* @type {number}
*
* @example
* var LN_SQRT_TWO_PI = require( '@stdlib/constants/math/float64-ln-sqrt-two-pi' );
* // returns 0.9189385332046728
*/


// MAIN //

/**
* Natural logarithm of the square root of `2π`.
*
* ```tex
* \ln \sqrt{2\pi}
* ```
*
* @constant
* @type {number}
* @default 0.9189385332046728
*/
var LN_SQRT_TWO_PI = 9.18938533204672741780329736405617639861397473637783412817151540482765695927260397694743298635954197622005646625e-01; // eslint-disable-line max-len


// EXPORTS //

module.exports = LN_SQRT_TWO_PI;

},{}],31:[function(require,module,exports){
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

},{}],32:[function(require,module,exports){
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

},{}],33:[function(require,module,exports){
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

},{}],34:[function(require,module,exports){
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

},{}],35:[function(require,module,exports){
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

},{}],36:[function(require,module,exports){
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

},{}],37:[function(require,module,exports){
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

},{}],38:[function(require,module,exports){
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

},{}],39:[function(require,module,exports){
'use strict';

/**
* Square root of the mathematical constant `π` times `2`.
*
* @module @stdlib/constants/math/float64-sqrt-two-pi
* @type {number}
*
* @example
* var SQRT_TWO_PI = require( '@stdlib/constants/math/float64-sqrt-two-pi' );
* // returns 2.5066282746310007
*/


// MAIN //

/**
* Square root of the mathematical constant `π` times `2`.
*
* @constant
* @type {number}
* @default 2.5066282746310007
* @see [Wikipedia]{@link https://en.wikipedia.org/wiki/Pi}
*/
var SQRT_TWO_PI = 2.506628274631000502415765284811045253e+00;


// EXPORTS //

module.exports = SQRT_TWO_PI;

},{}],40:[function(require,module,exports){
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

},{}],41:[function(require,module,exports){
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

},{}],42:[function(require,module,exports){
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

},{}],43:[function(require,module,exports){
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

},{"./is_even.js":44}],44:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-integer":47}],45:[function(require,module,exports){
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

},{"./is_infinite.js":46}],46:[function(require,module,exports){
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

},{"@stdlib/constants/math/float64-ninf":35,"@stdlib/constants/math/float64-pinf":37}],47:[function(require,module,exports){
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

},{"./is_integer.js":48}],48:[function(require,module,exports){
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

},{"@stdlib/math/base/special/floor":91}],49:[function(require,module,exports){
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

},{"./is_nan.js":50}],50:[function(require,module,exports){
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

},{}],51:[function(require,module,exports){
'use strict';

/**
* Test if a numeric value is negative zero.
*
* @module @stdlib/math/base/assert/is-negative-zero
*
* @example
* var isNegativeZero = require( '@stdlib/math/base/assert/is-negative-zero' );
*
* var bool = isNegativeZero( -0.0 );
* // returns true
*
* bool = isNegativeZero( 0.0 );
* // returns false
*/

// MODULES //

var isNegativeZero = require( './is_negative_zero.js' );


// EXPORTS //

module.exports = isNegativeZero;

},{"./is_negative_zero.js":52}],52:[function(require,module,exports){
'use strict';

// MODULES //

var NINF = require( '@stdlib/constants/math/float64-ninf' );


// MAIN //

/**
* Tests if a numeric value is negative zero.
*
* @param {number} x - value to test
* @returns {boolean} boolean indicating whether the value is negative zero
*
* @example
* var bool = isNegativeZero( -0.0 );
* // returns true
*
* @example
* var bool = isNegativeZero( 0.0 );
* // returns false
*/
function isNegativeZero( x ) {
	return (x === 0.0 && 1.0/x === NINF);
}


// EXPORTS //

module.exports = isNegativeZero;

},{"@stdlib/constants/math/float64-ninf":35}],53:[function(require,module,exports){
'use strict';

/**
* Test if a finite double-precision floating-point number is a nonnegative integer.
*
* @module @stdlib/math/base/assert/is-nonnegative-integer
*
* @example
* var isNonNegativeInteger = require( '@stdlib/math/base/assert/is-nonnegative-integer' );
*
* var bool = isNonNegativeInteger( 1.0 );
* // returns true
*
* bool = isNonNegativeInteger( 0.0 );
* // returns true
*
* bool = isNonNegativeInteger( -10.0 );
* // returns false
*/

// MODULES //

var isNonNegativeInteger = require( './is_nonnegative_integer.js' );


// EXPORTS //

module.exports = isNonNegativeInteger;

},{"./is_nonnegative_integer.js":54}],54:[function(require,module,exports){
'use strict';

// MODULES //

var floor = require( '@stdlib/math/base/special/floor' );


// MAIN //

/**
* Tests if a finite double-precision floating-point number is a nonnegative integer.
*
* @param {number} x - value to test
* @returns {boolean} boolean indicating whether the value is a nonnegative integer
*
* @example
* var bool = isNonNegativeInteger( 1.0 );
* // returns true
*
* @example
* var bool = isNonNegativeInteger( 0.0 );
* // returns true
*
* @example
* var bool = isNonNegativeInteger( -10.0 );
* // returns false
*/
function isNonNegativeInteger( x ) {
	return (floor(x) === x && x >= 0);
}


// EXPORTS //

module.exports = isNonNegativeInteger;

},{"@stdlib/math/base/special/floor":91}],55:[function(require,module,exports){
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

},{"./is_odd.js":56}],56:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-even":43}],57:[function(require,module,exports){
'use strict';

/**
* Test if a numeric value is positive zero.
*
* @module @stdlib/math/base/assert/is-positive-zero
*
* @example
* var isPositiveZero = require( '@stdlib/math/base/assert/is-positive-zero' );
*
* var bool = isPositiveZero( 0.0 );
* // returns true
*
* bool = isPositiveZero( -0.0 );
* // returns false
*/

// MODULES //

var isPositiveZero = require( './is_positive_zero.js' );


// EXPORTS //

module.exports = isPositiveZero;

},{"./is_positive_zero.js":58}],58:[function(require,module,exports){
'use strict';

// MODULES //

var PINF = require( '@stdlib/constants/math/float64-pinf' );


// MAIN //

/**
* Tests if a numeric value is positive zero.
*
* @param {number} x - value to test
* @returns {boolean} boolean indicating whether the value is positive zero
*
* @example
* var bool = isPositiveZero( 0.0 );
* // returns true
*
* @example
* var bool = isPositiveZero( -0.0 );
* // returns false
*/
function isPositiveZero( x ) {
	return (x === 0.0 && 1.0/x === PINF);
}


// EXPORTS //

module.exports = isPositiveZero;

},{"@stdlib/constants/math/float64-pinf":37}],59:[function(require,module,exports){
'use strict';

// MODULES //

var isNonNegativeInteger = require( '@stdlib/math/base/assert/is-nonnegative-integer' );
var constantFunction = require( '@stdlib/utils/constant-function' );
var binomcoefln = require( '@stdlib/math/base/special/binomcoefln' );
var degenerate = require( '@stdlib/math/base/dists/degenerate/pmf' ).factory;
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var log1p = require( '@stdlib/math/base/special/log1p' );
var exp = require( '@stdlib/math/base/special/exp' );
var ln = require( '@stdlib/math/base/special/ln' );
var PINF = require( '@stdlib/constants/math/float64-pinf' );


// MAIN //

/**
* Returns a function for evaluating the probability mass function (PMF) for a binomial distribution with number of trials `n` and success probability `p`.
*
* @param {NonNegativeInteger} n - number of trials
* @param {Probability} p - success probability
* @returns {Function} PMF
*
* @example
* var pmf = factory( 10, 0.5 );
* var y = pmf( 3.0 );
* // returns ~0.117
*
* y = pmf( 5.0 );
* // returns ~0.246
*/
function factory( n, p ) {
	if (
		isnan( n ) ||
		isnan( p ) ||
		!isNonNegativeInteger( n ) ||
		n === PINF ||
		p < 0.0 ||
		p > 1.0
	) {
		return constantFunction( NaN );
	}
	if ( p === 0.0 || n === 0 ) {
		return degenerate( 0.0 );
	}
	if ( p === 1.0 ) {
		return degenerate( n );
	}
	return pmf;

	/**
	* Evaluates the probability mass function (PMF) for a binomial distribution.
	*
	* @private
	* @param {number} x - input value
	* @returns {Probability} evaluated PMF
	*
	* @example
	* var y = pmf( 2.0 );
	* // returns <number>
	*/
	function pmf( x ) {
		var lnl;
		if ( isnan( x ) ) {
			return NaN;
		}
		if ( isNonNegativeInteger( x ) ) {
			if ( x > n ) {
				return 0.0;
			}
			lnl = binomcoefln( n, x );
			lnl += (x * ln( p )) + ((n - x) * log1p( -p ));
			return exp( lnl );
		}
		return 0.0;
	}
}


// EXPORTS //

module.exports = factory;

},{"@stdlib/constants/math/float64-pinf":37,"@stdlib/math/base/assert/is-nan":49,"@stdlib/math/base/assert/is-nonnegative-integer":53,"@stdlib/math/base/dists/degenerate/pmf":70,"@stdlib/math/base/special/binomcoefln":79,"@stdlib/math/base/special/exp":88,"@stdlib/math/base/special/ln":118,"@stdlib/math/base/special/log1p":122,"@stdlib/utils/constant-function":180}],60:[function(require,module,exports){
'use strict';

/**
* Binomial distribution probability mass function (PMF).
*
* @module @stdlib/math/base/dists/binomial/pmf
*
* @example
* var pmf = require( '@stdlib/math/base/dists/binomial/pmf' );
*
* var y = pmf( 3.0, 20, 0.2 );
* // returns ~0.205
*
* y = pmf( 21.0, 20, 0.2 );
* // returns 0.0
*
* y = pmf( 5.0, 10, 0.4 );
* // returns ~0.201
*
* y = pmf( 0.0, 10, 0.4 );
* // returns ~0.06
*
* @example
* var factory = require( '@stdlib/math/base/dists/binomial/pmf' ).factory;
*
* var pmf = factory( 10, 0.5 );
*
* var y = pmf( 3.0 );
* // returns ~0.117
*
* y = pmf( 5.0 );
* // returns ~0.246
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-read-only-property' );
var pmf = require( './pmf.js' );
var factory = require( './factory.js' );


// MAIN //

setReadOnly( pmf, 'factory', factory );


// EXPORTS //

module.exports = pmf;

},{"./factory.js":59,"./pmf.js":61,"@stdlib/utils/define-read-only-property":182}],61:[function(require,module,exports){
'use strict';

// MODULES //

var isNonNegativeInteger = require( '@stdlib/math/base/assert/is-nonnegative-integer' );
var binomcoefln = require( '@stdlib/math/base/special/binomcoefln' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var log1p = require( '@stdlib/math/base/special/log1p' );
var exp = require( '@stdlib/math/base/special/exp' );
var ln = require( '@stdlib/math/base/special/ln' );
var PINF = require( '@stdlib/constants/math/float64-pinf' );


// MAIN //

/**
* Evaluates the probability mass function (PMF) for a binomial distribution with number of trials `n` and success probability `p` at a value `x`.
*
* @param {number} x - input value
* @param {NonNegativeInteger} n - number of trials
* @param {Probability} p - success probability
* @returns {Probability} evaluated PMF
*
* @example
* var y = pmf( 3.0, 20, 0.2 );
* // returns ~0.205
*
* @example
* var y = pmf( 21.0, 20, 0.2 );
* // returns 0.0
*
* @example
* var y = pmf( 5.0, 10, 0.4 );
* // returns ~0.201
*
* @example
* var y = pmf( 0.0, 10, 0.4 );
* // returns ~0.06
*
* @example
* var y = pmf( NaN, 20, 0.5 );
* // returns NaN
*
* @example
* var y = pmf( 0.0, NaN, 0.5 );
* // returns NaN
*
* @example
* var y = pmf( 0.0, 20, NaN );
* // returns NaN
*
* @example
* var y = pmf( 2.0, 1.5, 0.5 );
* // returns NaN
*
* @example
* var y = pmf( 2.0, -2.0, 0.5 );
* // returns NaN
*
* @example
* var y = pmf( 2.0, 20, -1.0 );
* // returns NaN
*
* @example
* var y = pmf( 2.0, 20, 1.5 );
* // returns NaN
*/
function pmf( x, n, p ) {
	var lnl;
	if (
		isnan( x ) ||
		isnan( n ) ||
		isnan( p ) ||
		p < 0.0 ||
		p > 1.0 ||
		!isNonNegativeInteger( n ) ||
		n === PINF
	) {
		return NaN;
	}
	if ( isNonNegativeInteger( x ) ) {
		if ( x > n ) {
			return 0.0;
		}
		if ( p === 0.0 ) {
			return ( x === 0 ) ? 1.0 : 0.0;
		}
		if ( p === 1.0 ) {
			return ( x === n ) ? 1.0 : 0.0;
		}
		lnl = binomcoefln( n, x );
		lnl += (x * ln( p )) + (( n - x ) * log1p( -p ));
		return exp( lnl );
	}
	return 0.0;
}


// EXPORTS //

module.exports = pmf;

},{"@stdlib/constants/math/float64-pinf":37,"@stdlib/math/base/assert/is-nan":49,"@stdlib/math/base/assert/is-nonnegative-integer":53,"@stdlib/math/base/special/binomcoefln":79,"@stdlib/math/base/special/exp":88,"@stdlib/math/base/special/ln":118,"@stdlib/math/base/special/log1p":122}],62:[function(require,module,exports){
module.exports={"expected":[0.0,0.0,0.0,0.0,0.0,5.620533240112763e-23,8.876394057554561e-17,0.04410395135891825,0.0,0.0,1.9308081606107018e-77,0.004245311581540837,2.7346212719079834e-99,2.0430514160629048e-35,0.0,3.908763212669477e-23,7.221868110795663e-17,0.0,0.0,3.7334476611880737e-20,1.4457428281910162e-17,8.937164478071438e-11,0.0,4.2107518601373146e-32,0.0004329918336706311,0.10879280048854009,0.1841710571078106,0.0,4.6580815347543286e-60,1.5002917887706523e-33,1.0332107504718433e-19,0.0,0.0,0.0,0.00010239882990974424,0.0,9.554645041063356e-74,1.239008998121378e-12,1.0532580233854545e-40,0.04946413625970375,0.04799975554102361,0.23138984489513792,8.455608630605744e-20,3.187640347444885e-175,5.801019945375192e-96,5.079626212191874e-34,0.0,2.011183e-318,0.0,0.0,3.043483305036425e-37,0.005483613494407769,1.44634961181783e-19,0.0,0.0,4.921116681369402e-9,0.0,0.129654315780563,1.824011489792308e-103,0.0,0.0,1.1547535933100564e-39,0.0,4.587118571220476e-19,1.386077342196204e-64,0.0,1.0879629917463169e-33,0.0,0.0,0.0,2.694859896585373e-7,0.0,1.6218783897948668e-7,4.092528307836451e-7,0.0,9.55622787361238e-13,0.12862846679449189,0.0,0.0,0.0,0.36600956197265266,0.05324476854480417,0.0022628370944851525,0.00024271328807359298,0.0,0.005781380024253971,5.1932726771534865e-104,0.0,2.4251243539500903e-54,0.0,0.30786097059050344,0.0,0.0,0.0,1.2904250466687738e-46,8.984106830613244e-49,0.0,0.054325314926194655,4.926648160138977e-62,0.0,0.0,3.691740182426016e-51,0.0,0.0,0.0,1.2502769454986476e-37,1.1943210389685065e-10,4.489964282924764e-14,0.10809898532956806,0.0,0.0,0.0,0.0,6.399246700546471e-19,3.281218307478237e-8,0.0,1.811605714229296e-29,0.18212648708343318,0.0,0.0,0.13735216231208716,0.0,0.0,4.108719534491891e-16,0.0014309237496419353,0.0,0.0,0.027608013134126416,0.37382794123556007,0.024686638955246826,1.2221966212097198e-20,0.0,0.0,0.0,0.0002712464985589889,8.0591725036904845e-16,0.0,0.0,0.0,1.4008120520624387e-18,0.0,1.1645327627767258e-51,1.4208758297057855e-8,0.04013974256052876,0.0022920616273710104,5.3676210321702826e-6,0.0,0.025785817670006043,2.110264623978399e-6,0.0,0.0,0.0,1.0111068928588042e-20,0.0,0.0012919584549264819,9.893679251448636e-127,3.434973066088735e-10,0.02189629990107104,6.715111452190042e-9,1.584546747592173e-20,0.0,4.58956880871374e-39,1.0127037017017293e-12,7.417900910745056e-32,0.0,3.532595640605251e-40,0.0030091711448812525,1.560386750623785e-71,0.22743490877009584,0.00012001104951802035,0.0001813209680841944,0.0,0.0,5.770252009464013e-6,0.0,6.720185433671747e-38,0.0,3.5160626893266186e-12,0.0001294189008829234,2.676160669125602e-170,7.951358079500101e-37,0.12214258494522452,5.39961671833445e-6,5.304545124703202e-110,0.0,0.0007998914181391132,0.0020328752039484328,1.110880209144032e-44,6.980510472173065e-7,1.0466978277941626e-40,0.0,0.0009376331023500992,3.7930948786721224e-15,0.0,0.007024579532960012,0.0,0.0,6.189101392273403e-80,6.314236409877117e-48,0.0,1.433277520393142e-43,6.804381232524929e-5,2.5744281250598528e-25,0.0,3.9400937692243614e-35,0.0,4.404390812370163e-14,0.0,2.369161249919685e-13,6.111921423835544e-20,3.2038321476940624e-13,1.7356344106368333e-22,0.0,2.9155495239390425e-21,7.497167483653959e-33,0.16248919983430313,0.0,0.09871373301892368,0.0,0.0,3.5298062135893376e-16,0.0,0.0003237636974338957,0.04966188083127388,4.2237088938011525e-38,0.004429365677817394,0.41850190944012094,0.0,0.0,0.0,0.0,2.005235580180679e-40,1.1423709724927557e-19,0.0,3.1304386184407207e-7,0.0,0.0,1.1972765221072055e-13,0.029373241521946515,2.908054557969413e-5,0.0,0.0,3.3880972672441965e-36,4.503334680725291e-15,9.41436386639934e-32,9.800022489473253e-5,1.2146361559579407e-9,3.249093862935096e-14,0.0006156325846241903,0.0014095214912080464,2.145544829189126e-18,4.867466301462508e-6,3.97990084072136e-99,8.014468310144654e-14,1.7692887112925392e-19,1.354045615239898e-40,2.359554396480601e-41,0.0,0.0,0.0,0.0,7.369260061541043e-44,9.064176853507801e-13,0.00034452867854758973,0.0,1.2973692308258782e-18,0.0,1.218889751361354e-22,0.0,0.0,2.09722971451542e-21,1.0452361479219224e-20,0.10807968843529515,3.5390289656730653e-13,1.5530043843535646e-30,0.0,0.0,2.3225499653976154e-21,0.0,1.3661486684342309e-6,1.610257422378187e-126,0.0,0.0,1.2975689185290395e-11,3.888815934868878e-24,0.2551437403025981,0.0001025165517214669,1.7994068128445866e-22,0.0,0.0,3.717474121989783e-23,1.593145887538826e-18,6.574929543873644e-16,1.0425498138229896e-13,0.00015958300413196748,0.0,0.0523525907730555,1.5525815400373026e-8,0.0,5.121042060008911e-38,3.4500063182150836e-51,7.886534165701539e-13,0.0,2.1501763828820385e-51,1.3274694678674481e-36,9.785469869806113e-16,1.0496089025629684e-25,5.376602631391306e-55,0.0,5.666829508696086e-32,5.757884601016957e-154,0.0,0.0,1.2814311351423056e-21,8.939542032315566e-36,0.0,8.271014871348442e-72,4.657698545035294e-13,0.0,0.0006943033007741514,0.009229902951860878,9.190869675967752e-31,0.0,3.525878608142311e-57,6.4588445297299316e-71,1.6843505655529586e-27,0.0,0.0,1.8829427044489348e-44,1.053696326788619e-135,0.0,0.0,0.0,0.0,0.0,0.0,9.505557650343069e-14,1.953399038674913e-72,0.0,5.432784604759106e-29,4.071956501042374e-47,0.0,0.08398593158890773,7.286875425790303e-9,4.5930051395722255e-17,0.0,3.3658058505711622e-6,0.0,0.0,0.00018084265985350104,0.0,0.0,5.55200694958781e-17,2.466700108881713e-72,0.0,0.0,0.0,0.0,3.0207107302870316e-44,0.0,0.0,0.0,1.7104178680118464e-6,4.595924825275109e-29,0.0,0.0,0.0,6.145199133773276e-24,1.233180106094485e-47,3.6419106241470854e-28,0.0,0.0,0.0,0.0,4.0825220352457544e-8,2.1318948242912678e-13,1.8062090395690084e-30,2.780558565830419e-30,8.277431105114404e-27,1.9956185038349214e-11,0.0,0.3879600865039165,2.1972087373185516e-12,0.0,0.0,0.0,0.0,1.0237907042296075e-20,0.0,4.84084881707947e-50,0.0,8.294262706998113e-56,8.175848894394158e-10,0.0,7.662263092731096e-48,0.0,1.164689853812689e-29,0.0,1.7469614995324767e-89,1.5667156430595507e-6,3.279335343062659e-33,1.554922856275833e-13,5.694510863079293e-6,0.0,6.07221382136371e-8,0.0,3.6072627109300076e-164,5.024425998513082e-9,3.3993017939156975e-6,0.0,0.0,7.839843837421643e-35,2.951862209732038e-14,6.7542326029157335e-49,0.010126798589702786,0.0,0.004599785496099782,4.192916354997113e-14,1.1388659735319068e-43,0.0,0.0,0.00012866776323539628,0.0,0.0745456550653289,0.0,6.596249938231566e-13,0.0,0.0,0.0,3.520163492078568e-30,0.0,0.0,9.927753877938494e-20,1.2638052878756768e-37,0.0,0.0,7.046359469302987e-26,8.216837836044234e-67,0.0,1.1202004572437904e-20,0.0,2.000875364920907e-139,0.012181267012038394,0.0,6.7775034329069265e-9,0.0,3.4969771748451096e-64,8.223778292333443e-64,1.461616145570132e-16,0.0,0.16363272433833648,4.873985586981115e-35,3.786208502097358e-29,0.0,2.3512633510539655e-58,6.035442149356421e-28,0.0,6.724631016588715e-20,1.5935751539753606e-5,0.0,0.0,0.0,1.1556119791517024e-5,0.0,1.2801869118257742e-47,0.17657905135159008,0.032544225191456215,4.193122808845585e-7,0.0,2.3308901647847146e-21,1.8909974027138692e-16,0.0,0.0,2.004249480683146e-25,0.003097012254801728,2.939178360206835e-10,3.817881862221746e-31,0.0,1.558355845365341e-33,0.08502186724557194,2.491450667593281e-53,5.856464567525091e-56,0.0,1.6438465084902019e-6,6.960701687532603e-44,9.620293473955409e-119,0.0,3.5540052420963643e-28,7.218064479882923e-29,1.419119221883661e-21,0.0,0.048652200250912235,2.850640886083009e-14,0.0,1.5106127389664264e-30,0.0,3.396420083701846e-73,2.7043293804789743e-12,0.0,1.6958704369479118e-29,0.0004153543443171984,1.3408584416724524e-20,0.0,1.8781857408425857e-39,0.0,3.472828222787702e-39,2.164607198978695e-20,1.6956371503755893e-51,3.801565258591668e-5,0.0,4.786275213921221e-13,0.3418219881313917,1.7323111386701739e-9,0.0,1.2582545002605442e-8,6.281773198109954e-56,2.798041957716845e-12,7.827062518143309e-19,1.4002036170056658e-10,3.7887181546395614e-6,0.0,0.019087567835509838,1.7874372582291094e-6,0.126821981936237,0.0,0.0012958193924685311,0.0,6.748314783097966e-53,1.345000545026392e-54,0.0,0.07129890098971248,4.150612753620971e-67,0.0,0.0,0.0,3.2649896679563554e-7,1.0162423581772632e-40,0.6300717118525273,0.0,0.0018971509968127766,0.12685475991680178,2.851687960274195e-38,0.0018167698391225815,4.928590364259738e-13,0.0,4.6540482704089046e-5,1.1361485964202578e-21,0.0,6.898952926182202e-29,2.6533834794526674e-38,0.0,0.0,4.6588542455688805e-48,0.0,0.0,0.0,5.68661330155584e-69,8.913180102410303e-53,0.0,0.0,0.0,0.0,0.0,0.004861683368876228,0.0,1.0084227695893928e-22,0.0234767656323622,8.203192464319662e-31,3.994325663057319e-11,0.033930220251356176,0.06986161005830907,0.0,0.0,1.0388099010863095e-5,3.490651082294246e-7,1.9624371013334554e-13,2.707820628598563e-7,2.9749274777571105e-29,0.0,6.186716184354733e-18,0.003816556363858976,0.12099046505616634,7.610289126208054e-8,0.0003453085558243595,0.0022040969911780724,0.10344648251849677,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0002080847333073604,8.01437142614642e-49,2.80465884814188e-42,4.91966565714761e-17,7.592832156872537e-48,0.0,0.20877862995891872,0.0,0.0,6.244181265468129e-32,0.0,0.10857119979045113,5.725958765742231e-43,3.8278137555301457e-28,0.014259933781090443,6.244347078305477e-11,0.0,0.10494180507043742,2.7769606579030448e-14,0.0,1.124655634521169e-8,0.17376734494120918,0.08813992448301754,0.0,0.0002519937978512189,1.563160029992608e-12,6.421923853233886e-52,0.0,0.0,0.11972122936475671,0.023011301990063952,2.745214326967807e-83,0.003450295772737498,5.903468765217872e-23,2.1473482444081415e-27,0.0,0.00047624724176751704,0.0,1.5484879071973805e-37,0.023446089001164034,9.579203325262413e-52,1.2528210681039624e-53,1.1395882760984099e-38,4.025792000553796e-6,0.0,2.4440885425336766e-37,6.175407830452912e-15,0.0,0.0,2.6565661780193056e-25,0.04761459289772294,2.7837556923105775e-5,0.0,0.0,0.07887815384787214,1.7580142473933808e-64,0.0028063255725663695,0.0,6.074481727266716e-5,0.0,1.161653947744902e-64,0.11904553840336408,3.690902834574073e-27,0.0016445643299268396,0.0,4.8671797942528704e-5,0.0,0.0,1.8093127146484244e-19,2.86788548786009e-5,8.604563648414455e-83,0.0,1.5648199319540947e-14,0.0,0.0,0.0,1.7191127419552612e-25,5.5971744685037815e-46,0.0,2.835520202000298e-34,0.0,1.9577034382048025e-13,7.678622365372782e-17,0.0,0.0,4.501810744850594e-133,0.0,0.0,2.378396279359985e-5,0.0,9.278214209051104e-17,0.0,0.0,0.0,0.0,3.902992971656376e-10,6.245395845011849e-5,0.0,0.0,1.5325356329460476e-96,6.553174606779932e-6,0.0,1.297389167945939e-58,0.0,1.125238104566045e-12,0.0,0.0,0.0,0.0020598103428382804,0.01857134027290385,3.76279085483396e-9,0.03087292977496668,6.502747659297452e-8,2.0252768085033398e-44,0.0,0.00693366603965807,1.3695815004497928e-10,0.010680204466392906,0.002308661977106888,0.003352876688602024,0.09450439827979756,7.290199348312155e-44,1.3325837150813548e-52,3.894813052205015e-28,0.0,0.0,0.0,5.823241860179225e-11,9.228142368059922e-7,1.2954536185776742e-8,9.708608338872877e-37,6.809171667474004e-95,0.0,0.0,0.08057393252339783,0.0,0.0,0.0,0.0,0.0,2.0368422394268253e-10,0.00139550472354726,7.834386298822917e-5,1.338328084725911e-41,3.9690693236408146e-5,1.0714017178117449e-54,0.0,0.002231696400287192,2.3545741676424043e-50,0.0065415975491389874,0.03393768701448205,0.0,0.0,0.0,5.05645635826434e-38,0.0,0.0,0.0,0.0,0.13886635608901465,0.0,4.950844175197656e-17,0.0,0.0,0.0,3.910165648547922e-59,7.720780760506714e-60,7.69792340178857e-41,0.17247660539803777,0.0,0.0,0.003820465415622455,3.594178125616471e-23,5.536665333309114e-22,0.0,2.565681050259686e-57,0.0,3.361891358882593e-16,0.0018089296880889822,4.891528291323602e-27,0.0,0.0,3.8664872630026916e-24,0.0,0.0,0.0,1.4153175200025473e-8,7.768621154487297e-15,5.995462391707771e-16,0.026612221387740352,0.0,0.0,1.422994388086662e-11,2.8798020830346485e-35,1.2750549804152488e-6,3.173829809259588e-33,0.0002004185244960655,5.36452103398616e-9,2.501575198940691e-25,0.0,2.9935196187461008e-21,0.0,0.0,0.0,1.3148793136245786e-71,0.2442981839316432,0.0,2.2958429156107962e-14,0.0,6.270065975984746e-44,3.3569075497706446e-16,0.05735343989768568,1.9322404901904136e-19,5.617876118376139e-5,8.59946922805275e-62,0.0,0.0,3.782854224173504e-17,0.0,4.515707674741113e-34,0.0007563217944998771,0.0,0.08382804029792425,9.638157210124046e-15,2.158362382603479e-61,0.0,2.5946789222853617e-26,1.578714940913951e-20,2.4137695825213143e-17,2.3191240740715686e-13,4.736556715143769e-47,1.8002102921889306e-13,9.036331136166716e-6,0.004757015877614589,2.3338983090277444e-9,0.28245245230502314,0.018087324109866628,0.1610963928122226,0.003729045245441781,0.0,4.619882179827523e-41,0.012764038936331934,0.0,3.2085774351389097e-65,0.0,2.1550014824850712e-10,0.0,0.0,0.0,0.0,0.0,1.5593328191723756e-27,0.0,0.0,0.0,1.6341527907382178e-14,7.38168157462727e-18,8.317349839011126e-94,0.0,0.0,7.469503992103846e-56,0.0,0.10474028080977699,0.0,4.773051413035286e-11,4.310631211066315e-36,1.6146534353455132e-53,0.0,0.0,0.012200611466769899,3.3847860276943697e-46,0.0,0.0,0.0,3.2222616669423884e-21,0.020415562395324258,0.0,0.0014472747415818945,0.0,0.0,0.0,0.000374192198601985,8.464458354555007e-24,6.546697257831778e-9,0.0,1.2431931386405823e-97,8.736435414461411e-27,1.1135195981827347e-156,0.0,0.0,0.09555785669809336,3.688487800247743e-22,0.0,6.172576285667188e-12,8.629308236979799e-66,0.0,3.1328120923478567e-6,3.617710900123299e-11,0.0,1.8318255535409741e-100,0.0,0.0,0.0,0.0,0.11240220891337467,1.1407420447389367e-9,0.0,5.904442555677849e-11,0.0,0.0,5.609420603768696e-14,1.2123217759544693e-14,9.133278321479972e-14,3.417972684773006e-81,0.0,0.0,0.0,0.0,1.5435617990202024e-11,0.0,0.08263847886965942,0.0,0.0,2.313954117421433e-23,5.801303432033612e-7,0.0,8.294713575275661e-17,7.625604859011191e-7,0.0,9.541517473642506e-8,0.0,0.0,0.0,9.115186751858215e-31,0.0,0.0,4.094501190121389e-13,0.0,0.0,0.0238595540889029,3.275065450178683e-84,0.003768909712096358,0.0,0.0,1.364873864003183e-82,0.0,5.909655818032984e-55,0.0,0.0018577358539828281,1.2932743438374513e-26,1.6681262342952003e-26,0.0,2.3776404798131092e-147,0.0,0.0,4.371598878647976e-37,0.0,0.04459637040984084,2.552237097435585e-50,1.5533807011818278e-9,0.0,0.0,3.6320177518188713e-19,1.7757868391467538e-7,0.0,0.0002858746878181877,7.449219931188806e-29,1.8843224720593827e-27,1.5563462019028857e-21,7.675293431461527e-103,0.11470006203740325,1.7992441904341613e-43,0.0,0.05938612858507865,1.9218253914224035e-70,5.339389044407205e-18,4.451268526561762e-19,3.4630469756127833e-13,0.06044412231329617,1.2058374336839579e-23,0.0,7.246679212335411e-5,0.0,2.7051259212322035e-33,6.946496767454019e-48,0.0,0.0,0.0,8.746474193794756e-9,0.0,1.0495745177105534e-49,3.0493431768573824e-10,5.784535428973789e-35,9.296812491903385e-12,0.0004911343012143929,0.0003591929380163982,0.0484027501469903,0.0026531538757923133,3.2848609443091193e-24,0.0,0.0,1.3417337815084245e-21,3.335391113150588e-28,4.340940469274284e-32,0.02262479868905319,8.101457227975533e-25],"x":[74.0,63.0,58.0,43.0,79.0,39.0,34.0,73.0,35.0,74.0,9.0,27.0,1.0,27.0,61.0,25.0,31.0,71.0,53.0,43.0,41.0,9.0,62.0,42.0,65.0,61.0,68.0,49.0,37.0,28.0,29.0,45.0,64.0,35.0,42.0,79.0,34.0,58.0,8.0,13.0,48.0,27.0,6.0,4.0,0.0,12.0,40.0,8.0,41.0,22.0,42.0,41.0,28.0,64.0,36.0,57.0,40.0,29.0,25.0,17.0,78.0,34.0,72.0,27.0,18.0,27.0,34.0,39.0,75.0,76.0,13.0,20.0,2.0,15.0,60.0,21.0,58.0,10.0,57.0,68.0,44.0,42.0,72.0,66.0,77.0,40.0,5.0,54.0,7.0,35.0,10.0,64.0,65.0,42.0,0.0,37.0,73.0,28.0,15.0,38.0,74.0,2.0,60.0,32.0,52.0,5.0,8.0,1.0,40.0,74.0,45.0,55.0,79.0,32.0,3.0,64.0,36.0,31.0,51.0,49.0,30.0,76.0,69.0,38.0,3.0,39.0,54.0,70.0,7.0,76.0,50.0,11.0,30.0,25.0,58.0,2.0,69.0,29.0,65.0,12.0,72.0,14.0,55.0,73.0,28.0,55.0,63.0,63.0,54.0,48.0,77.0,30.0,8.0,66.0,41.0,7.0,25.0,60.0,26.0,45.0,73.0,7.0,46.0,26.0,41.0,1.0,65.0,5.0,51.0,62.0,73.0,77.0,39.0,46.0,19.0,45.0,30.0,6.0,77.0,5.0,17.0,67.0,26.0,23.0,76.0,43.0,57.0,21.0,56.0,20.0,72.0,11.0,19.0,69.0,18.0,40.0,37.0,9.0,5.0,79.0,25.0,28.0,4.0,68.0,15.0,20.0,47.0,36.0,37.0,31.0,35.0,7.0,28.0,15.0,15.0,75.0,18.0,41.0,20.0,42.0,33.0,74.0,51.0,57.0,28.0,54.0,3.0,73.0,28.0,66.0,39.0,12.0,31.0,46.0,52.0,36.0,16.0,49.0,18.0,71.0,19.0,12.0,16.0,18.0,5.0,22.0,24.0,47.0,30.0,59.0,12.0,49.0,10.0,35.0,28.0,1.0,9.0,53.0,75.0,27.0,42.0,23.0,47.0,14.0,49.0,52.0,47.0,7.0,48.0,48.0,36.0,36.0,65.0,37.0,16.0,78.0,78.0,17.0,53.0,49.0,27.0,70.0,28.0,32.0,22.0,40.0,22.0,32.0,35.0,34.0,28.0,47.0,38.0,45.0,43.0,27.0,75.0,35.0,35.0,2.0,17.0,29.0,46.0,4.0,6.0,31.0,18.0,28.0,24.0,18.0,7.0,49.0,32.0,14.0,5.0,52.0,10.0,4.0,45.0,32.0,59.0,14.0,7.0,11.0,16.0,40.0,53.0,68.0,16.0,6.0,52.0,49.0,50.0,20.0,64.0,19.0,11.0,2.0,70.0,31.0,7.0,24.0,22.0,22.0,35.0,65.0,43.0,28.0,70.0,47.0,40.0,59.0,4.0,15.0,66.0,52.0,26.0,53.0,18.0,77.0,73.0,46.0,2.0,20.0,67.0,79.0,65.0,30.0,8.0,3.0,65.0,78.0,71.0,67.0,26.0,50.0,1.0,30.0,32.0,68.0,68.0,2.0,36.0,58.0,20.0,24.0,60.0,18.0,63.0,12.0,56.0,7.0,30.0,45.0,14.0,72.0,59.0,38.0,1.0,27.0,4.0,44.0,48.0,54.0,28.0,79.0,7.0,24.0,43.0,1.0,63.0,13.0,32.0,6.0,37.0,78.0,29.0,54.0,4.0,68.0,75.0,11.0,63.0,72.0,37.0,29.0,40.0,63.0,77.0,29.0,30.0,38.0,5.0,54.0,79.0,55.0,18.0,4.0,67.0,47.0,21.0,17.0,16.0,65.0,28.0,67.0,3.0,1.0,27.0,77.0,71.0,39.0,5.0,52.0,1.0,21.0,59.0,6.0,50.0,70.0,46.0,63.0,63.0,31.0,3.0,58.0,16.0,71.0,67.0,15.0,24.0,47.0,39.0,22.0,36.0,5.0,6.0,26.0,4.0,30.0,18.0,21.0,54.0,78.0,16.0,25.0,67.0,27.0,45.0,27.0,26.0,75.0,29.0,43.0,31.0,74.0,34.0,3.0,63.0,3.0,55.0,25.0,59.0,15.0,53.0,11.0,12.0,5.0,24.0,67.0,9.0,42.0,39.0,65.0,65.0,2.0,40.0,16.0,34.0,35.0,79.0,15.0,29.0,53.0,11.0,65.0,68.0,3.0,1.0,56.0,22.0,15.0,72.0,60.0,23.0,40.0,10.0,41.0,40.0,38.0,30.0,8.0,35.0,19.0,64.0,35.0,23.0,38.0,6.0,26.0,15.0,72.0,20.0,24.0,22.0,77.0,6.0,20.0,64.0,47.0,7.0,66.0,29.0,42.0,61.0,10.0,22.0,15.0,43.0,6.0,26.0,67.0,76.0,48.0,47.0,19.0,54.0,4.0,41.0,30.0,41.0,24.0,44.0,11.0,60.0,55.0,23.0,36.0,61.0,77.0,54.0,45.0,4.0,53.0,25.0,2.0,1.0,50.0,7.0,76.0,27.0,68.0,23.0,25.0,58.0,59.0,0.0,12.0,68.0,78.0,77.0,58.0,20.0,68.0,34.0,11.0,48.0,67.0,31.0,6.0,15.0,51.0,56.0,77.0,28.0,11.0,22.0,68.0,2.0,60.0,75.0,50.0,54.0,8.0,3.0,12.0,13.0,5.0,60.0,3.0,33.0,78.0,40.0,9.0,62.0,52.0,68.0,76.0,52.0,11.0,31.0,72.0,65.0,32.0,38.0,74.0,10.0,46.0,30.0,65.0,74.0,39.0,32.0,78.0,6.0,33.0,29.0,77.0,67.0,19.0,31.0,27.0,73.0,24.0,63.0,10.0,71.0,65.0,68.0,3.0,70.0,68.0,64.0,25.0,45.0,59.0,68.0,58.0,47.0,53.0,19.0,77.0,49.0,15.0,36.0,33.0,9.0,48.0,21.0,65.0,66.0,35.0,61.0,79.0,38.0,55.0,40.0,9.0,24.0,49.0,7.0,59.0,36.0,56.0,64.0,2.0,16.0,35.0,71.0,76.0,64.0,40.0,16.0,58.0,2.0,3.0,53.0,39.0,77.0,57.0,38.0,64.0,13.0,53.0,42.0,56.0,44.0,7.0,41.0,16.0,57.0,53.0,47.0,22.0,36.0,57.0,14.0,50.0,14.0,61.0,77.0,19.0,80.0,53.0,31.0,40.0,71.0,74.0,65.0,4.0,43.0,14.0,39.0,56.0,32.0,20.0,25.0,30.0,34.0,13.0,53.0,48.0,18.0,15.0,69.0,73.0,22.0,73.0,80.0,45.0,38.0,9.0,9.0,66.0,37.0,76.0,25.0,2.0,62.0,23.0,27.0,51.0,31.0,23.0,14.0,70.0,80.0,14.0,0.0,6.0,53.0,8.0,49.0,4.0,5.0,37.0,12.0,13.0,7.0,55.0,51.0,32.0,57.0,0.0,43.0,72.0,63.0,17.0,2.0,56.0,23.0,28.0,16.0,70.0,21.0,56.0,61.0,32.0,31.0,12.0,66.0,40.0,58.0,77.0,8.0,65.0,13.0,2.0,15.0,7.0,17.0,44.0,42.0,37.0,30.0,57.0,58.0,65.0,37.0,13.0,20.0,23.0,77.0,60.0,40.0,47.0,56.0,55.0,37.0,17.0,1.0,52.0,57.0,57.0,8.0,76.0,46.0,45.0,46.0,43.0,23.0,78.0,58.0,68.0,48.0,46.0,32.0,2.0,34.0,10.0,10.0,26.0,79.0,67.0,47.0,16.0,48.0,33.0,16.0,45.0,48.0,54.0,24.0,11.0,73.0,42.0,56.0,55.0,23.0,39.0,24.0,28.0,60.0,58.0,4.0,20.0,15.0,21.0,76.0,30.0,40.0,72.0,42.0,23.0,30.0,32.0,51.0,8.0,55.0,49.0,8.0,60.0,71.0,8.0,68.0,22.0,65.0,11.0,51.0,49.0,48.0,10.0,29.0,76.0,24.0,51.0,31.0,79.0,40.0,60.0,14.0,50.0,62.0,17.0,16.0,66.0,3.0,59.0,77.0,16.0,33.0,40.0,6.0,19.0,52.0,20.0,14.0,2.0,75.0,51.0,12.0,29.0,66.0,12.0,20.0,22.0,58.0,34.0,2.0,14.0,27.0,22.0,24.0,53.0,67.0,54.0,68.0,20.0,25.0,36.0,79.0,8.0,40.0,19.0,11.0,33.0,40.0,50.0,50.0,34.0,71.0,67.0,46.0,33.0,67.0,19.0,4.0,30.0,52.0,42.0],"p":[0.8917725494988915,0.8801150441067638,0.7528313189951288,0.8797753956259013,0.8840756426591387,0.880878987546509,0.8301162849059751,0.8530518787724588,0.846802548962496,0.9104803112542694,0.9037174028434491,0.888522550168142,0.9596877789052585,0.9857052639331425,0.7512171948780868,0.828613184650467,0.7850592726010406,0.7761825724059319,0.8232533180611648,0.9852298006517344,0.8642295474327366,0.7762831139398367,0.8943736567336478,0.9094705098613367,0.8423433268874603,0.9286582010322518,0.9401052891601984,0.8799125623759172,0.9970913761688665,0.8291066151429254,0.7680810918405996,0.8966185762337309,0.7550934171955985,0.7983439755968911,0.8035391173926614,0.9326997426509018,0.990827962635652,0.8713345005164875,0.7912776748738743,0.8050829877277219,0.8912821088068936,0.8886616996067647,0.8176911812476153,0.9912096467788301,0.9242172013790089,0.8112640113091827,0.8847317604054697,0.9997343622811182,0.8727677589713374,0.9060991097247793,0.9448957949282365,0.815233000371463,0.9235511136795614,0.9964077787391132,0.8554618732754551,0.8839937655018424,0.8667366979459192,0.8663858435882024,0.9900983790942404,0.8529579185407736,0.9823418122149712,0.9116144642891937,0.844123781613926,0.9185436169419028,0.9550324275814035,0.9522079553766435,0.887109928864183,0.8450079897226934,0.854075026447211,0.9028229090506974,0.8714965557737426,0.8141145238644445,0.7580799112188001,0.9560291755827915,0.9150138616609091,0.7729696073142951,0.8661311603765531,0.9946918873632393,0.7740770041054311,0.7941909222454564,0.9815162282065863,0.9204613547281106,0.7903091851658579,0.9387664898126786,0.8417627117346055,0.8108587291489353,0.9537229985349431,0.8890264274766269,0.9118300445044321,0.8502999837273447,0.9561999171905489,0.9825454970571533,0.8741689431514956,0.9460437616361397,0.9593167026446604,0.9864081543974501,0.8911795051175987,0.8564450483221605,0.9259987689211951,0.8913717262049947,0.8596293102168324,0.9830350057734096,0.9679660500265301,0.9923905253766583,0.8775166044544281,0.8055644465993688,0.9169101864021976,0.7541318253309066,0.7541722331693808,0.8130746017515434,0.8770975672569831,0.7841786405775064,0.8765372095075634,0.9359599278292636,0.9725845343335039,0.9536637916743247,0.8994504675693149,0.8563391394975728,0.8890926278424376,0.9700583886139378,0.873873888248066,0.8935784050591346,0.7945344035184818,0.8144417097864038,0.8232055064851345,0.9110680108005805,0.7699369558058141,0.8509372196139431,0.8688666110939489,0.8246316413712149,0.8885757075617953,0.7901605848179684,0.8623186487936239,0.8422955132349579,0.9672049340788195,0.8640179299627067,0.7909863043710016,0.8611923268656807,0.7531271362116352,0.9783890946656124,0.9598407926167977,0.9333860777584405,0.9650970806385684,0.9569095407757721,0.9819500560791158,0.8109323091791294,0.9876526787009172,0.8395342055540376,0.9407581470125894,0.9606035985208266,0.8534951782399307,0.7519786500232024,0.8132669722048615,0.9033882502844666,0.8909036008773958,0.9979507869386303,0.8194966627092444,0.7611103434834419,0.8013532318874499,0.8883530384507505,0.8598530546528056,0.7557964602695999,0.814248354492743,0.9125098875552469,0.8919713553314577,0.9325155259761038,0.8704788356939992,0.8502172913782888,0.9391825627475443,0.7799084103468963,0.876258387798386,0.8079403212422562,0.9491928758863599,0.7793005767345877,0.7902838249200949,0.9818753291967846,0.9644667624006407,0.9497688493405418,0.8045250756678041,0.9946239234103389,0.9121135296561123,0.8529791408069298,0.9408882550875235,0.9848145038414231,0.8494201020820894,0.7731783691521057,0.7984720418271548,0.962826211837375,0.8115709788680237,0.8789453143433178,0.9912738230443133,0.8294805366986979,0.7830886696695034,0.9346017416266915,0.77851901117304,0.9959662997926126,0.9082142303641171,0.9922550364050742,0.847773734742633,0.8013087876091094,0.9615313924860937,0.7596466422394361,0.8307524824801302,0.9313801815553031,0.7892445898235521,0.8431999828910643,0.8121277861288385,0.8283609421121341,0.7546840897446842,0.759460817808126,0.8700050752403152,0.7745204516907946,0.7552182743925979,0.82707363172361,0.7899495501222316,0.9240635981137488,0.9249496443644437,0.7550749270984101,0.7997302316331032,0.9138214594193486,0.8052092358626692,0.8559132517152728,0.7779506026974561,0.8680360273681205,0.9626476825280097,0.8268998592763597,0.776741792071333,0.8406049964422919,0.9662556585751968,0.9927531313337841,0.7671984466819939,0.7553831658254693,0.7985182189147582,0.9754440563930817,0.8447633236204843,0.837667172833147,0.814613208572234,0.8703468273138993,0.8644452716048345,0.8631913470539399,0.7737236473528797,0.9336490988651898,0.8216303465876136,0.7977708055973574,0.8861265325980274,0.8386180208711098,0.8224527686373875,0.8917662141126304,0.9796180687422655,0.8633607208456193,0.8819624708665376,0.8300953276356486,0.9636503304379362,0.779536456096416,0.9382420815309196,0.8465245103150807,0.7928977183551156,0.9154404765288607,0.9794365296529068,0.8171875817273646,0.7861690945007873,0.9023699964620095,0.7976024142693108,0.8147615892072773,0.8920670556876702,0.882544336748314,0.9519672930887537,0.7763673124467418,0.9842662177318097,0.7755735026057402,0.8506438127401119,0.9533927922504599,0.7915138040373608,0.8164213385786099,0.9506334613495965,0.7520455963212005,0.8121830507429764,0.8988793095449505,0.7751669596270134,0.833650253667642,0.9936261737553285,0.8235966122666254,0.9714207073355516,0.8104118158567969,0.7774022316422777,0.9377544062799271,0.9069177212407598,0.8626796691464906,0.9669044842892826,0.7998560533468082,0.8961108234334296,0.9856945200676821,0.8531518492750492,0.945046347633018,0.9429477119455361,0.9743162171307468,0.8857716892598204,0.8361617911134788,0.9521214305346435,0.8491702852138447,0.8519267883894245,0.8625532811455225,0.7678259489248986,0.7729805535089107,0.9288508865458394,0.7990064743227447,0.8394217059971549,0.9601980459224737,0.757715798803686,0.7840268388302758,0.9885664979339579,0.98654059551554,0.830543440308209,0.8971729248002756,0.833862570541944,0.8021527950166009,0.9512519898810515,0.9109878794246118,0.9517065549209314,0.8883117758679326,0.8605377491554193,0.8159426636319582,0.9469307369410624,0.9093819481504544,0.9144185950378589,0.9620929399907483,0.8824196281430968,0.907264186268486,0.8375846492168895,0.9863187210821251,0.8091066988183953,0.9530962149384643,0.970578062752905,0.892530346821711,0.9098979367624698,0.812861912199314,0.9425777688985431,0.8910900786301066,0.9290534234666633,0.8280112582419489,0.8579568973639851,0.853393228068436,0.925449256790293,0.9217733488118509,0.8826372341668659,0.7723013213823118,0.7748106360446407,0.9175793481055875,0.9826911136086995,0.7514385717912229,0.8831525959394461,0.8804301935023955,0.7929678396634299,0.948059466711448,0.9777562967151281,0.8378601455086709,0.8173765596162024,0.8002045858158664,0.8573638240407837,0.8900149311161567,0.9247017194687063,0.8752825609601527,0.7899380391367428,0.907694888359904,0.955572874062244,0.77640912097179,0.8981826094728054,0.8271291343095176,0.7869820127967557,0.79232964078409,0.9284721784037103,0.8598337065791697,0.9837414454764868,0.8093430061414495,0.8752510434076719,0.8995983510790612,0.9014990517069663,0.9974586634873903,0.8362121740644897,0.9903653037750207,0.8115371391366965,0.7957978891736452,0.9738908510694049,0.8741378858261233,0.9083962854362964,0.8932160882927247,0.7741270088923944,0.7766768703791695,0.9452276031156379,0.8543126073189157,0.9214299834229722,0.8855315826623176,0.9171479995011198,0.8487089686237576,0.8831586653879597,0.9628170428222103,0.9797870045077695,0.9840677381674787,0.90673458996678,0.9101169016864248,0.8474183941181586,0.9380843966357263,0.8262516165270655,0.7745413457382854,0.7835053433156889,0.909020406456654,0.9989294286410824,0.9371207168903857,0.8550003548665914,0.7944749307919893,0.8401071052991969,0.7816677200017059,0.9096142283701102,0.947901818770335,0.8355219461128425,0.9262800954907623,0.8494044822497294,0.9373709210080947,0.7583429772261445,0.8096519559257926,0.9191737388749829,0.9085578039919968,0.8211029445423579,0.8355318400594254,0.7714241656380034,0.976379052271892,0.8967733602470606,0.8279656660091259,0.9887392976678546,0.8223800143516683,0.9776823966845025,0.8274212615983091,0.8985057473439225,0.9907385856409636,0.784399778467622,0.7745490616190017,0.856578771590357,0.9031694172788516,0.9809440283615039,0.8924023271500764,0.7965746134142062,0.9974266856368961,0.7591992649452446,0.8066373733375205,0.8930202518968173,0.906003420742532,0.8125763862804687,0.9303873631690222,0.7824545033012105,0.9129447864578768,0.9155235997816973,0.9444476899133891,0.912542185250304,0.94871787158668,0.8231916944370379,0.80977037722528,0.9970031267563768,0.7532168630592062,0.7627682196902266,0.8094552322187256,0.8739299671996184,0.9316292156384129,0.816181430631746,0.7697778481214834,0.9307048661329721,0.9683658611036119,0.8760715428440514,0.9122809836854926,0.7881363769803262,0.7849374420094289,0.8219260692630886,0.9622746338666274,0.8841923093121964,0.7840700302361648,0.9157209008988711,0.9906532071116909,0.9597221288670648,0.8931784357358294,0.8979761749512553,0.7601298423942577,0.9301910709633884,0.941146957298052,0.990862490387907,0.9529016989143975,0.8530277722960449,0.9929842867227482,0.971898121026098,0.8616087028953076,0.9486289492247459,0.8523382594715359,0.8947812012330232,0.8969745791419788,0.9285435332551553,0.9489580421422534,0.9576057477008372,0.950353180566479,0.9738394150938505,0.7833082180521799,0.8700479224728537,0.8127247578953232,0.7860876614936196,0.982128225549827,0.8729836686988073,0.9026113868557915,0.8062615633776999,0.9585378876186934,0.7942267476314062,0.799235911332209,0.9684356441992001,0.887266084862141,0.918177107885426,0.9659694709252529,0.8951819912802415,0.9031856772112616,0.9701014301761717,0.8068565310759812,0.9568316183163994,0.8740719264321704,0.7650001984417769,0.9297049215085368,0.8005365939131177,0.8077209788019999,0.8645843808528417,0.9731484025217063,0.8007168497526909,0.7928822154037298,0.7750837007005981,0.8779812064838168,0.755789627165121,0.825782623804942,0.886885187749767,0.9025044425098039,0.7809877109349221,0.900758951715241,0.8768260065097606,0.7996633597025506,0.8066941452955363,0.988796846593766,0.959337092201672,0.7731630890343948,0.830412530082841,0.7920297660064075,0.8250618473854066,0.8845937856577781,0.9195732530871434,0.7520102143306207,0.7583190750430138,0.9415460383181009,0.9094807244521996,0.9238954041669495,0.8220978701434922,0.952474126315646,0.9240901930052218,0.9395824488669806,0.9498921361043152,0.8939451186968059,0.9245225044725078,0.9318319493776106,0.8894485019540702,0.9733016353090076,0.9424042623137918,0.9050449044455839,0.9317504709108095,0.8637546935656397,0.9403732597000336,0.9838068349295422,0.843214571498865,0.9278701181757092,0.8135664479428546,0.8073837424568338,0.786408541721102,0.8902726639438032,0.8589362256739755,0.8647856301844153,0.9354821629785864,0.9286733792892161,0.8257093317410741,0.8400836006017116,0.989855288718341,0.8187753656965282,0.9334317707808379,0.7784685411927028,0.9254741777582661,0.7663244299543297,0.923641176282485,0.8111647049733305,0.9499722895954295,0.990767335756001,0.9651316178996294,0.929479587365726,0.9717568962708867,0.9174045488178544,0.9318378367013713,0.9253281677951519,0.8422005247715104,0.8917170278467859,0.89549185628684,0.9493242190525082,0.9573065386015699,0.9600853472355722,0.866864346528901,0.9819070191901809,0.7692204302675842,0.802147244768527,0.7716501476131588,0.7816017961868013,0.8294071296204242,0.8996992109385011,0.7782277122127524,0.9856786286766472,0.920100430027413,0.7540457239892235,0.7902806851459276,0.9775967598656448,0.8132721490449994,0.811072996057871,0.7624837583060231,0.9201756283689474,0.8509528962076949,0.804505931672314,0.8884484848809682,0.9096317749578662,0.8325974619111254,0.8733613347842677,0.9099302345642479,0.9509604703215965,0.8392797640314249,0.9669634005951974,0.82388186809297,0.9726211169820986,0.903034687837387,0.9946474829508991,0.9651911669166973,0.8551901661530995,0.7829270462746589,0.9351104751694224,0.7638702577909982,0.8363668331006822,0.9659040373370276,0.9087295846708643,0.775436828392513,0.8374485806319126,0.8640754626613348,0.7948201859951313,0.8600396928618625,0.8012479838681026,0.9787866280833217,0.7940025592120977,0.7946751481541386,0.9049879023780125,0.80129179485337,0.888210539244693,0.8868550535708728,0.8976919377085714,0.9855080286913549,0.8487114069909718,0.9583590091437024,0.8316720443958906,0.9384576663606723,0.8194395637981295,0.8141664479243662,0.9032457724039258,0.8946160718519098,0.9624374184259421,0.9940506826073976,0.9787651016708336,0.8063821472659671,0.7978487357880575,0.8647898946041028,0.7530001015271949,0.7991652225883977,0.9284220605376621,0.8686023658845987,0.8844137398088453,0.7660581330621677,0.8246239704693586,0.9943961297956028,0.8758049178995821,0.9587295202959296,0.9655207052704666,0.9514819508207837,0.9896607495266629,0.9374343208780751,0.8433288591676427,0.8656495757034792,0.7587009738518542,0.9856586381907668,0.8308542612112713,0.9169798155323574,0.8463232360109394,0.7875476663259198,0.8827003183720599,0.8455924698593105,0.9971235797553977,0.9189020283065854,0.9545622566234232,0.9055216390306561,0.8692630087958161,0.9341350334611911,0.936983693477589,0.8891562323755164,0.8308233617827877,0.7898400910096072,0.9108617765767562,0.7938746297150167,0.7884201457587348,0.8912203558320029,0.8160708459550954,0.7668475419196461,0.7563903300025405,0.8268989690192152,0.9136463788875178,0.7612152958363719,0.8613106401248356,0.7794447370583486,0.9702754294591611,0.8742610135226112,0.9254745484063351,0.9527716162646421,0.9767821901620062,0.997125450804069,0.8203940716008546,0.8360147219150368,0.9030209988976179,0.9163107082373341,0.9253048782588069,0.9639805522320917,0.8075234034424159,0.8288467089973215,0.9284701924947447,0.9787232779984667,0.9396390832430244,0.8670634306084573,0.9936158741217193,0.7787009288144615,0.7654336096844327,0.8119176664865968,0.950509104070741,0.7861992516584424,0.9305631847915319,0.8992994942043236,0.8575427701034501,0.9695937081437389,0.7956332073834791,0.9038990690841366,0.9860250127026942,0.8690378868775761,0.8008735093594486,0.9564532060518098,0.7983947597722731,0.8930211964886132,0.9346212890582235,0.9004964847211391,0.9035176641731917,0.9077382500924455,0.852757115290633,0.7810690725227498,0.8675615913288747,0.9300199301749217,0.8504613384894192,0.9915162791668239,0.9020530959968668,0.8672429120468137,0.9732150386649607,0.7975334305862647,0.8809118882693504,0.8690515694440653,0.9120119278769556,0.9572755478507387,0.8524892941463769,0.8818307019777567,0.9171850580125929,0.7612695302985106,0.8755715645782272,0.849789507518666,0.9024297180799274,0.8015126994518678,0.8874530231567617,0.9381233085830739,0.918276386381832,0.9033128221431312,0.809604101197732,0.7557448475721931,0.7549959783839703,0.8698544556538004,0.9586347092438305,0.754226733555242,0.9713452139847645,0.9080294642587405,0.7962236109204125,0.8886805767621129,0.873636120009651,0.9509022978116237,0.9644875861425002,0.9326641162779791,0.7571491078186021,0.752440288159528,0.8698150084690124,0.8336255402819817,0.8454119203418666,0.9371500129865136,0.7638241268640436,0.8768537666903087,0.9334700733899494,0.8131833959455329,0.9263629318498015,0.7559597771242991,0.7701005730132886,0.848738928981126,0.8831291887049666,0.8741417860189495,0.9305783186861886,0.7791635834307602,0.7651211654014349,0.7719832102777591,0.780460144513671,0.982132572798467,0.7589233732223729,0.785241938713062,0.9928706267632172,0.786471794917555,0.9483139198562645,0.8160684336535922,0.9952676148566466,0.867872576582247,0.9483628800449496,0.7927434429132625,0.7587689300796323,0.9062656026495512,0.8524612938729721,0.8786356008182772,0.8475297732948581,0.9424368945631736,0.8606322597786054,0.8066697972935601,0.8326742735861219,0.870317966486093,0.8108049660190114,0.9895174903845491,0.7822915401089217,0.9133151970367686,0.8814870325702466,0.8164412139320978,0.9056184395170794,0.9143014006398713,0.9755051551431092,0.9293468061042686,0.9702448202865963,0.8948584406998944,0.8417762724178592,0.8597795965785491,0.9895071788407062,0.8080930041315211,0.9103538467604773,0.998137538840781,0.8755782328491899,0.8094396470438513,0.8014061680159053,0.8375442620396929,0.816612242792391,0.9457218888958433,0.9862973101507588,0.8128638904925034,0.8330621770644973,0.878327638202767,0.8408325839240143,0.911666565406773,0.8877817228736454,0.902300638736403,0.7609189655304316,0.8135292928635691,0.7600169503629861,0.75783016264628,0.8076627777012674,0.9494370075369521,0.9660602007430326,0.8186398376747461,0.9589098484786597,0.9015404512587684,0.9997033437472576,0.8517878368552662,0.998911885172583,0.8489137564757726,0.8742026639670697,0.9596582062790343,0.8342948951772707,0.9493658585271325,0.7579971937634942,0.9459648546675675,0.9495107637370515,0.8313447305558705,0.8497393921527732,0.7907303767729754,0.9928233730329576,0.7797243831898987,0.9199507100554661,0.9632295060541014,0.8042132885725839,0.7794159586279694,0.81785100841599,0.7838858867315617,0.8725203153933887,0.7682865229845313,0.8820714118913529,0.7832389761745089,0.788296154727675,0.8862017043768777,0.9766317096471961,0.945718992491005,0.8309754083337135,0.8463668788202154,0.8849840545850525,0.7626536128907533,0.8287904414425197,0.9434741231736625,0.9223344419165396,0.9866214464517649,0.7861718206633521,0.9532307291443007,0.9289197202777054,0.8677950700295869,0.8781350333687353,0.9917810760914381,0.7503227584488354,0.793018898161614,0.8856580525664449,0.8735378672826463,0.8108668052408792,0.8442214495559046,0.9914306117162626,0.804076710398112,0.95530533195375,0.9226775464434674,0.863471896048982,0.9715199437948159,0.8308924348000866,0.8451008936006928,0.9971657307744423,0.9956458726689618,0.9138700772102992,0.8586706492868096,0.9124679295195522,0.7772931999329917,0.9744898635023167,0.8862188834417528,0.8494379724849097,0.9936037256137604,0.9921065845267112,0.9822212811135735,0.8067542582460816,0.9775990146718629,0.8912567543430323,0.7762563356682195,0.892727386394661,0.7772178337918894,0.8819693523291192,0.9569264337597547,0.8050646227199385,0.8781624679837254,0.9055555834744082,0.795351429255351,0.8035436576103805,0.992810328808698,0.9635901932548647,0.7555638162344712,0.9874653296126019,0.9309902033160931,0.7767419798793316,0.8273359597079452,0.7577329255743556,0.9077851085533863,0.9403349985085008,0.8457697039806216,0.9648310723820454,0.846913307096193,0.7900492293830023,0.753194746529236,0.8262977873036697,0.9283398753072152,0.8799038142595275,0.9899917590456767,0.9139127962530926,0.788068229498079,0.9873288097199673,0.8490417694274071,0.8138938840261456,0.9303541765548187,0.9983169530732181,0.8475236544773584,0.824110643456414,0.7803963195332251,0.8602155089429835,0.9792270936067589,0.9657227617702469,0.8401868962489505,0.7852883154342494,0.763632109350202,0.9015781262084788,0.7521471408757578,0.9967770117616229],"n":[22.0,1.0,36.0,3.0,58.0,88.0,81.0,91.0,6.0,64.0,96.0,37.0,73.0,54.0,36.0,78.0,85.0,52.0,26.0,62.0,86.0,35.0,60.0,97.0,92.0,63.0,71.0,18.0,68.0,100.0,91.0,38.0,39.0,30.0,42.0,58.0,81.0,99.0,81.0,20.0,58.0,30.0,40.0,92.0,85.0,75.0,5.0,100.0,36.0,8.0,91.0,60.0,59.0,21.0,35.0,88.0,39.0,31.0,87.0,8.0,56.0,94.0,54.0,58.0,78.0,17.0,94.0,2.0,14.0,38.0,28.0,6.0,16.0,24.0,57.0,61.0,65.0,8.0,15.0,56.0,45.0,49.0,79.0,80.0,65.0,59.0,88.0,44.0,66.0,24.0,11.0,0.0,20.0,28.0,33.0,74.0,13.0,29.0,83.0,20.0,27.0,32.0,55.0,2.0,20.0,66.0,22.0,25.0,55.0,64.0,5.0,24.0,55.0,61.0,9.0,40.0,88.0,35.0,14.0,27.0,36.0,29.0,68.0,89.0,9.0,25.0,42.0,89.0,7.0,100.0,98.0,2.0,7.0,17.0,67.0,22.0,2.0,2.0,59.0,27.0,18.0,69.0,70.0,73.0,32.0,90.0,27.0,82.0,70.0,8.0,65.0,24.0,46.0,51.0,55.0,57.0,56.0,88.0,57.0,91.0,53.0,84.0,94.0,73.0,7.0,36.0,85.0,100.0,54.0,100.0,98.0,71.0,10.0,82.0,16.0,79.0,8.0,18.0,81.0,83.0,65.0,77.0,37.0,95.0,70.0,45.0,85.0,63.0,94.0,83.0,31.0,21.0,61.0,60.0,31.0,38.0,20.0,51.0,71.0,7.0,68.0,54.0,42.0,18.0,88.0,15.0,99.0,20.0,93.0,97.0,69.0,52.0,7.0,58.0,84.0,80.0,15.0,51.0,7.0,33.0,83.0,28.0,83.0,61.0,67.0,76.0,4.0,52.0,23.0,12.0,27.0,99.0,88.0,45.0,84.0,31.0,9.0,89.0,25.0,71.0,9.0,11.0,84.0,57.0,44.0,38.0,53.0,83.0,35.0,60.0,41.0,79.0,87.0,86.0,56.0,52.0,84.0,22.0,30.0,2.0,26.0,85.0,99.0,27.0,36.0,99.0,42.0,52.0,7.0,31.0,88.0,64.0,82.0,81.0,48.0,1.0,69.0,50.0,37.0,80.0,95.0,57.0,24.0,71.0,85.0,42.0,33.0,81.0,15.0,15.0,69.0,65.0,81.0,69.0,54.0,16.0,80.0,65.0,5.0,51.0,99.0,61.0,19.0,92.0,43.0,80.0,68.0,82.0,22.0,90.0,91.0,32.0,12.0,46.0,58.0,3.0,73.0,19.0,43.0,45.0,77.0,73.0,3.0,77.0,98.0,73.0,40.0,38.0,92.0,83.0,1.0,46.0,27.0,18.0,14.0,10.0,27.0,80.0,12.0,98.0,72.0,21.0,26.0,38.0,73.0,2.0,79.0,1.0,68.0,82.0,8.0,0.0,34.0,83.0,18.0,31.0,11.0,47.0,90.0,71.0,71.0,45.0,13.0,62.0,6.0,24.0,55.0,88.0,93.0,49.0,26.0,6.0,50.0,57.0,47.0,84.0,32.0,46.0,94.0,80.0,54.0,3.0,51.0,22.0,15.0,22.0,38.0,71.0,11.0,87.0,48.0,75.0,50.0,19.0,80.0,23.0,90.0,9.0,89.0,42.0,50.0,69.0,78.0,29.0,60.0,77.0,65.0,39.0,68.0,0.0,22.0,85.0,60.0,49.0,52.0,14.0,42.0,82.0,83.0,13.0,4.0,19.0,62.0,82.0,29.0,43.0,34.0,53.0,6.0,98.0,3.0,28.0,29.0,83.0,73.0,25.0,65.0,75.0,50.0,93.0,6.0,77.0,16.0,7.0,49.0,64.0,97.0,57.0,78.0,10.0,77.0,85.0,37.0,44.0,80.0,83.0,56.0,48.0,51.0,56.0,37.0,20.0,99.0,29.0,47.0,61.0,22.0,96.0,25.0,65.0,66.0,35.0,3.0,86.0,46.0,11.0,32.0,1.0,42.0,43.0,78.0,81.0,13.0,95.0,87.0,90.0,53.0,82.0,85.0,74.0,24.0,79.0,53.0,10.0,66.0,22.0,96.0,25.0,10.0,48.0,87.0,43.0,15.0,67.0,50.0,46.0,56.0,88.0,31.0,36.0,26.0,43.0,64.0,44.0,80.0,84.0,59.0,49.0,79.0,49.0,47.0,24.0,49.0,56.0,9.0,70.0,19.0,65.0,92.0,18.0,22.0,97.0,38.0,49.0,18.0,74.0,82.0,41.0,23.0,62.0,38.0,77.0,53.0,44.0,38.0,35.0,86.0,36.0,39.0,77.0,12.0,34.0,78.0,12.0,4.0,36.0,74.0,80.0,22.0,45.0,1.0,13.0,8.0,57.0,35.0,26.0,22.0,52.0,86.0,11.0,37.0,60.0,53.0,72.0,64.0,39.0,90.0,46.0,39.0,79.0,50.0,28.0,63.0,25.0,73.0,65.0,8.0,9.0,31.0,62.0,2.0,27.0,1.0,35.0,41.0,55.0,45.0,78.0,47.0,59.0,31.0,62.0,13.0,99.0,38.0,76.0,55.0,50.0,78.0,92.0,51.0,77.0,60.0,14.0,67.0,15.0,66.0,10.0,48.0,30.0,85.0,48.0,36.0,89.0,35.0,84.0,34.0,100.0,41.0,12.0,75.0,8.0,98.0,13.0,87.0,67.0,96.0,16.0,31.0,42.0,86.0,21.0,36.0,58.0,77.0,85.0,44.0,37.0,69.0,86.0,49.0,6.0,88.0,12.0,86.0,87.0,35.0,47.0,27.0,99.0,8.0,11.0,70.0,91.0,46.0,7.0,73.0,34.0,58.0,8.0,99.0,85.0,58.0,80.0,2.0,37.0,85.0,17.0,31.0,97.0,68.0,44.0,80.0,24.0,90.0,33.0,3.0,37.0,5.0,92.0,38.0,23.0,34.0,58.0,51.0,3.0,76.0,5.0,40.0,19.0,24.0,12.0,66.0,93.0,77.0,77.0,63.0,83.0,16.0,55.0,27.0,71.0,60.0,75.0,84.0,32.0,92.0,78.0,46.0,55.0,35.0,80.0,34.0,85.0,38.0,91.0,17.0,36.0,96.0,41.0,4.0,22.0,4.0,47.0,89.0,89.0,71.0,44.0,71.0,76.0,44.0,54.0,98.0,22.0,44.0,24.0,13.0,0.0,50.0,60.0,72.0,14.0,53.0,60.0,12.0,86.0,53.0,38.0,23.0,82.0,83.0,67.0,45.0,4.0,7.0,29.0,70.0,67.0,32.0,99.0,28.0,82.0,34.0,58.0,25.0,65.0,80.0,48.0,14.0,25.0,60.0,39.0,47.0,79.0,21.0,73.0,68.0,26.0,85.0,99.0,40.0,82.0,63.0,2.0,40.0,40.0,8.0,3.0,91.0,8.0,19.0,41.0,16.0,45.0,33.0,43.0,60.0,30.0,93.0,42.0,44.0,60.0,54.0,53.0,45.0,32.0,66.0,60.0,98.0,19.0,89.0,55.0,55.0,81.0,96.0,81.0,62.0,34.0,52.0,13.0,82.0,47.0,68.0,64.0,78.0,87.0,2.0,96.0,6.0,30.0,9.0,40.0,11.0,35.0,2.0,88.0,53.0,0.0,2.0,42.0,56.0,80.0,41.0,56.0,67.0,44.0,71.0,8.0,73.0,87.0,44.0,12.0,47.0,61.0,68.0,10.0,10.0,0.0,90.0,65.0,6.0,88.0,6.0,6.0,32.0,54.0,93.0,9.0,11.0,40.0,53.0,86.0,6.0,11.0,51.0,60.0,46.0,82.0,80.0,11.0,78.0,95.0,6.0,63.0,64.0,23.0,30.0,25.0,32.0,76.0,21.0,55.0,15.0,20.0,30.0,61.0,39.0,82.0,29.0,11.0,31.0,53.0,95.0,6.0,34.0,2.0,28.0,54.0,70.0,43.0,34.0,88.0,12.0,29.0,19.0,1.0,36.0,68.0,23.0,25.0,100.0,8.0,7.0,95.0,92.0,72.0,30.0,43.0,85.0,53.0,96.0,11.0,95.0,40.0,57.0,27.0,72.0,14.0,33.0,89.0,5.0,41.0,95.0,38.0,14.0,6.0,34.0,14.0,45.0,67.0,70.0,98.0,84.0,93.0,29.0,52.0,49.0,39.0,98.0,61.0,60.0,41.0,32.0,84.0,27.0,88.0,51.0,86.0,84.0,10.0,2.0,5.0,80.0,16.0,86.0,69.0,91.0,57.0,72.0,54.0,97.0,89.0,71.0,1.0,19.0,73.0,56.0,82.0,61.0,57.0]}
},{}],63:[function(require,module,exports){
module.exports={"expected":[0.0,2.6267941788167105e-20,2.437208486043972e-24,6.413490160931797e-7,4.125781581545535e-12,0.016836414015879465,0.0014183862202749346,0.0606161424103563,0.0,0.0,0.026711655042602887,1.1088334147656994e-24,0.034876606641048795,0.0,0.00015780050605989002,2.3544983173291146e-43,0.0016965063926432833,3.250893449169334e-16,0.2305042411383649,0.014866198351987766,2.681823942242179e-6,0.0,0.0038603152223095345,0.058218491912330986,1.900974330300905e-37,4.576269909597001e-11,9.769232245675024e-5,0.002419838281055246,6.303747885436538e-6,4.296470458583916e-7,0.00014580638664772686,4.557466477633272e-5,0.07743003918465366,3.1016811729844658e-30,2.8734067207285585e-9,9.355285485174416e-13,1.1209902294288332e-12,0.0,1.7181839824851062e-6,1.8896658985003796e-5,0.06057365418450611,7.232153995018336e-13,5.9587819652673716e-15,4.921832783527339e-8,0.0,0.00889303503314843,1.2090434621972024e-8,0.09674006787779636,5.653236597813848e-27,2.2224052374417054e-7,6.77729256310639e-35,0.0016204074745375127,0.0,7.065644968283641e-12,0.00045655622524535687,0.06200803876688962,9.868938506573673e-8,6.326939125514181e-16,1.4361948071835087e-13,2.892190953079055e-6,0.0,4.944748218906157e-41,5.9731815752629365e-30,0.14133554289824665,5.554860013362519e-26,2.753850858785636e-14,7.524965676352161e-14,0.0,0.01838908813099976,0.16353381471361186,4.559441873481953e-27,6.398696424096333e-25,2.1857828440795453e-9,0.2001620976058152,2.3355417852145985e-6,0.0,0.37124679325254034,6.175643868194937e-23,7.252462884403241e-10,6.20100818878108e-5,5.196409124691573e-34,8.560391233882305e-5,0.0,0.0,1.9376064922461316e-18,2.2091257985899468e-8,0.0,1.9854438027406436e-14,0.11960393822196379,1.1785367925747403e-5,8.198350050525053e-7,0.00024102956496947975,0.030120431572229052,9.999160437342672e-31,7.950108186396565e-11,1.057682602700572e-6,0.0008207710002523535,0.0005760973165374599,7.459880436515555e-7,1.5793802229214325e-9,0.006635981601797648,0.0,0.025849312324706657,6.725569557349073e-19,0.00016124863071674135,2.02611644808415e-5,1.318770272886379e-21,3.033943831577408e-7,1.2586582556637579e-18,1.901935328955688e-13,1.2456137254746434e-18,0.02024927550477607,0.0,0.0,1.4020233834108512e-15,6.6077326509500194e-12,1.0952610411352073e-23,3.424532909649494e-9,6.30628682945276e-6,0.012897291841988656,6.0592570145136234e-12,0.08826931069714325,0.05807318440756621,2.0672495774396378e-19,0.01755800854009295,0.029754191001013872,3.5960054521815594e-13,1.4523451496505844e-10,0.23495208519657762,0.10486570111033462,9.913317997962078e-7,0.0888327057502838,0.0,0.03288587796661988,3.121155169181672e-17,0.0,7.390527571420037e-11,0.0028962808241360023,0.0012407854106326265,6.083458672119177e-17,0.0,3.356728908113303e-22,0.0,1.223691685291598e-20,8.50543768886081e-9,2.7392673691424455e-66,5.277427448646708e-7,5.61582960771253e-7,0.0,0.2632634067288061,0.0,1.1308508962272601e-13,1.918722508172938e-30,1.1992180192271316e-12,0.004069804015477814,1.649775535427223e-15,5.124706779875963e-18,0.001283685223503922,3.200304695328962e-30,0.0,8.659071746515034e-29,0.0,0.0001310476098950512,2.2454835469417363e-28,0.11736054505144462,0.015365421800318337,1.0899655769437726e-20,1.5622980637884303e-17,2.9577696235170934e-16,7.226105292446832e-18,0.0,0.001497603075274435,0.0,1.8408890102627224e-36,1.1242716642082138e-13,0.0,0.003955947573998933,8.201268611420487e-27,5.526490405042729e-7,6.268835886862164e-32,8.092164318483281e-15,0.0,0.01325467455420592,0.013840527364642606,7.692299237245907e-17,1.5942443751763913e-7,9.49703765152272e-7,9.264102005347123e-8,0.0,0.0,0.0,0.7705084719885849,6.307838656756338e-39,0.008445670301739224,0.8141584179968697,0.0,0.07046762371695495,0.0,0.13606586160694817,4.211959867426472e-8,0.0011747916344898492,0.0,0.0,0.06107082312508669,7.946246284056139e-19,3.785565264276521e-9,3.2189225136785165e-21,5.483486616977508e-8,0.0,0.0,0.07070281633491,0.01975838411565494,0.0,0.0,0.0,4.9790640725778734e-14,0.04244526983316345,0.008572501996788167,2.3265842454680772e-8,3.2331770873939195e-26,2.0970670640816615e-35,2.9873631687135844e-6,0.0,4.608660165349161e-6,1.119942437970634e-35,0.0,2.9746810883908156e-18,1.2403007397637676e-30,0.0,5.899304020885964e-5,2.5296090467365036e-13,0.002133042944763806,1.0338507155870886e-9,1.4323997424053213e-12,2.2534727886995253e-17,0.1667798161440928,8.66476187613509e-5,4.1682653063855415e-23,0.0,8.196092393292473e-14,6.108427106458773e-9,2.1189171169356495e-33,0.10936480350317555,0.0,0.04818324760997423,3.8742026865151e-22,0.0,0.02181355543769933,0.0,0.14658698812377974,0.007204886866197545,0.0,0.0713689423714637,0.0,0.0,9.799939344693263e-29,2.906289328784105e-30,1.1869779132839457e-9,1.4591746224867103e-18,1.756207875983056e-7,0.0,0.005343685601486495,0.0034067239747500614,2.5575898994044884e-37,0.23059901411080366,0.00018434433052266224,2.7348497934760825e-8,1.1106568508704416e-16,0.14304443317374912,0.10503270432661439,4.975487478186118e-11,0.14048461597577672,0.0,4.1189023566425116e-8,4.958635003780138e-13,7.670764862859185e-6,1.635683193073607e-25,0.059369925238294444,1.2203928556039247e-13,0.0001629270822736909,0.0,0.0,0.024858288083288604,1.4789727455828901e-12,2.2431727647590993e-19,2.4094228279112566e-12,0.0,0.005338259836083528,0.3013596980691647,0.0234255274057248,3.506466297881655e-7,0.001029499559587209,0.1984171172379632,5.071693154381983e-14,1.820695318855256e-11,0.0,0.16538532760218025,0.0,0.0,0.05569015115538646,0.08588638787954063,0.07986962530583099,0.00014857123295481303,2.6069477576167975e-14,2.5262173861827744e-25,0.0,0.048092410947327295,2.1467727692630975e-57,0.006920670830913854,7.467933302959812e-9,2.8201048861185326e-6,0.0,1.043539837993861e-11,4.316486229224044e-25,1.489284368074125e-20,0.028064913730515974,3.559331607496348e-8,0.0053448127102554525,2.7692569242326347e-11,0.0015694964672577092,0.010140250732092246,0.04100194675346894,0.0010214587883000197,0.0001940747587807827,0.13394357598518777,1.1377274576607398e-29,0.09272142753348216,1.0055529352167024e-5,0.0006241104569469313,1.9109687662478616e-5,0.0,0.0,8.524734781801096e-25,1.934407788829788e-9,0.0958792001052765,0.11024975347310453,1.5709900447128632e-14,0.041191305859751795,7.873207824531681e-8,0.0,1.9779760140410976e-16,0.0,3.483452650399137e-6,2.3765555307568197e-37,2.5320472474747012e-21,0.015225339627519506,0.0020841556885628043,0.0885765216069016,0.13027115343106882,6.947677661171706e-8,2.570486089177175e-25,1.0094322994618664e-11,0.07089726961134486,0.12438584438238119,2.804457837512372e-10,3.2276821041629116e-11,7.917399237120547e-12,0.07319320754488876,7.238052173164933e-13,0.0,0.0,6.244599533531e-6,1.1725521741783435e-16,3.842628950074668e-17,0.002174579127605479,0.0,5.966577493638819e-17,0.0,0.0,4.5242045854476474e-29,0.13381844324489758,1.334170497264502e-7,5.797375988487945e-10,1.6610028760564313e-10,4.748789032352378e-5,7.284832456724992e-6,8.397403490083784e-36,3.0097835063050976e-67,3.6785193503496777e-20,0.024794962404956506,1.0995869743264583e-24,4.334153737145951e-11,1.1897499459697947e-36,3.9637864474407335e-19,0.0,0.010964887013285896,1.926569905839745e-17,0.0,4.500708862876516e-24,1.218726508157866e-32,4.424094380779724e-10,0.0,0.12340281034269396,3.292197902742107e-31,0.12499249913419143,0.0,7.454602822706364e-15,0.04037986200682638,0.09218150635159221,1.995455559007197e-23,6.60732054991469e-8,0.0,2.7147745301470424e-5,4.4251286215599365e-5,0.0002693288358893744,0.0,0.11965483437430198,0.0,6.380706710908539e-16,0.007899895284504957,0.005491604158096926,4.688053648090197e-9,1.3187420295025082e-51,0.009752528926777096,0.0,3.802554568559374e-6,2.1515565455231592e-33,7.683290791137446e-9,1.2346261328790537e-29,1.7361632209750834e-5,0.06608150637728319,0.0,1.6495541401356605e-13,0.0021266262645342772,2.514603542883695e-23,0.0,0.1700187359656961,7.639032254961677e-5,0.0,0.22403844694659095,0.0,0.0027385864202715323,0.23192568045945575,0.0,7.735732313042192e-19,1.9298027769385715e-14,0.008721219489743167,0.016744278202152848,0.0035119952859274167,0.0029698166381477817,4.589500347712018e-11,0.0001546293272375612,0.00025468996460925575,5.698188236336015e-7,7.2744893695957995e-9,0.06546052946619167,0.0,4.600432883068013e-8,5.321765871032598e-13,1.511300944016497e-11,0.0,0.0,0.051658043558843285,3.257072655958466e-10,0.0,0.001901240355218244,3.0002154566947185e-12,0.04031010413454081,0.12149946546075349,0.012951332092381954,1.728661644904741e-5,0.06129049111485131,1.6987076444134284e-9,8.59474226646117e-15,0.0,0.02576560576913828,0.03084680988466436,1.925910938089272e-15,0.0,0.0,0.3513823875220874,2.1087437139659173e-11,0.00017087290084929246,3.9807185236444144e-16,0.1057048166176992,2.2857051479946617e-14,0.08056942085947903,0.007491180260572179,4.3698690929103475e-9,0.0002660501188046766,0.0006984043215948653,7.638396564844171e-8,1.8381834319731593e-29,2.1892242272450835e-20,2.1308365512000685e-9,0.03012513104686057,0.10513246327783372,1.6072168664764375e-8,2.7701674113732883e-7,1.0922182750385311e-29,0.0,1.839281181278223e-12,1.3848328476640712e-6,1.8651110041213993e-7,0.0,1.2081564865350986e-12,6.758071119390375e-26,3.127122397708979e-11,1.4760582118995235e-5,0.055077072069707536,1.7547791139265971e-22,8.360853020918923e-50,0.15473172144278088,0.005175960453301347,0.0,2.0613870768014054e-23,0.0,1.2599535888303607e-11,0.009424750428925183,0.0,0.0005674439372843542,1.1489537054010001e-7,0.0857224000657457,5.8441830547301875e-12,8.01321031647983e-7,0.0,0.004689787902749553,0.014759537952195131,4.7919384865223985e-27,7.262315928429966e-77,0.0,2.590261476474668e-21,0.0,0.1395799372374943,0.037304316976522145,0.039482767762530964,0.0,0.16726412089205678,0.0002842293224662164,0.0013188090776543383,0.07769474077698423,1.4213975783299618e-12,7.326114535384908e-9,0.11072987853203321,7.397022488478932e-9,3.256011748408709e-13,3.3230729662482765e-7,2.233169266052535e-29,2.368889507837863e-5,3.761049022336528e-31,0.0,0.0,0.01585743176401139,0.0,0.008657041188419961,0.06476239781677216,8.604258565778137e-6,5.093129493801424e-32,1.8150250600784101e-81,0.1391431708132581,2.1817455029756232e-13,2.6395900885598356e-6,0.13162424579752668,2.0007866472710984e-7,0.0,0.05394918357966301,0.0,1.6494145857487129e-6,0.0,0.0,0.011574759264234161,4.0011832277245e-16,0.008746820194431397,1.0105526356408976e-7,1.4968713091922415e-8,0.16166455093756799,0.012431540078803127,0.02435133891873725,0.0,1.1795606902484784e-95,0.0,0.05789845260323704,1.3968817722975873e-27,0.0024554763245652014,6.643931930219162e-10,0.15465900951594244,2.4637364612919253e-20,0.10311727185337566,7.478938249955749e-21,2.0535479634678386e-10,0.0,5.7841049344376436e-11,3.944465689725929e-6,1.887062074697741e-33,4.965592804050054e-11,0.0,9.384246620153176e-41,1.0238127511573191e-7,7.420033037676233e-9,2.099394983752879e-15,8.452206073425049e-5,5.44217011560252e-15,0.0,0.002565987006383786,5.241181151508798e-12,0.10540833656100052,0.0,3.5630786499906243e-37,0.0060675004158235075,8.301987417449947e-8,0.06769312695286434,3.7034163506411193e-16,2.301234785457287e-9,1.7081714142313307e-9,1.0112325014569627e-18,3.9965887885002565e-42,7.713165844251411e-13,9.203033374717804e-5,8.913404456377175e-6,0.0,0.022419290130204488,9.590799663249872e-12,1.0176673300751034e-15,0.12410580580883498,0.07790961029089669,6.185699517565756e-9,0.17556543206067035,0.14765179608360982,0.08577120667142911,9.170800981415469e-10,1.0799012272999676e-32,0.15119119726818583,0.1510261890017826,0.18935121034109886,0.011495617275130774,0.0022543137637817635,0.17026178230867925,0.0,0.0,1.3652374250838576e-9,6.420085576062383e-8,0.0010911243284828333,0.0018217305268592322,0.33163404972561006,2.673400767160705e-22,0.1787541981710514,4.1692535721353364e-11,0.054441493760985664,0.0,3.398492995098638e-14,0.0,0.0,2.9016069746097808e-5,3.32384027451303e-53,0.020717557538781132,0.17346725158342433,0.11132128745487617,0.0,7.024595751643531e-5,0.1293807312070608,4.124290863794345e-6,4.940400892206843e-9,0.0,1.6584019229570884e-8,0.010353376937734436,2.2611202186727153e-18,1.0033921153017885e-14,5.065524731801362e-18,0.0,3.6035469943122294e-14,0.00047955450664845646,2.1639594306986016e-29,1.4726191400372897e-13,1.999365536818081e-10,0.2285485421481754,5.351082291506829e-15,0.058363795711364776,2.354465479860641e-10,4.393719641362107e-5,1.9608977895736307e-18,6.088447496284999e-20,3.1149056686909646e-20,7.004477846381882e-40,0.05270131205912355,0.0,1.2841517748819896e-10,0.056706141155543136,0.0,0.005101034529761895,2.6968814877084973e-16,0.0004411298823264506,0.0,4.5706290278439575e-23,0.0,2.1291283933775132e-16,1.0891717867814902e-24,0.1893650230914457,7.209520381310163e-21,2.9842313111214426e-12,6.508761369119269e-46,3.9650853048597014e-16,0.0,0.0,0.0,1.798851596401795e-27,0.0,0.0019531957000135007,0.12967677333770786,0.0,4.1990632902560583e-5,0.23102231529823877,0.0,9.396732337497198e-32,9.254587493952506e-7,3.593760319217077e-13,0.15056436627449432,0.0,5.988981446472397e-7,0.0028447930761064458,2.609431556712158e-27,5.2560942247279904e-11,0.0,0.0,6.5179859525184544e-21,1.6654106376103345e-7,0.0,2.5764574680823743e-15,0.00485588567671121,5.071702380791574e-21,0.0022510783352987815,0.006098033045662745,0.05111364256612402,1.6457506913656597e-5,7.368294690750088e-6,2.596894636536532e-9,8.464648215209435e-35,0.033956253564416235,0.09586116718628433,0.0,3.806316568657977e-5,0.0,2.757397219971251e-7,0.0,6.151122864953108e-103,5.260965036131784e-29,0.05229297022827069,0.04436665171147791,9.699978621977826e-32,0.002933930298610847,4.647168448025607e-13,0.0001359588675695144,7.39894035498787e-5,0.0,0.009600539686404825,0.001249979186549532,1.0448711340965179e-10,0.006392885335221216,5.391401855675356e-7,0.15786496063597422,1.824962302956259e-18,1.4848197588003412e-6,0.0,1.834025317772127e-23,0.0,5.287519746075686e-11,0.0,9.193412390341537e-14,5.2226847855832866e-24,5.754810030888423e-15,5.17235020223643e-7,6.405070606798211e-29,0.0,5.601302175656736e-13,0.0,0.00083989995601559,0.05709747466772951,2.859335264563266e-13,2.757484832811947e-9,1.5861982554032586e-20,7.034553210450217e-50,0.16951932506096734,0.0,0.002823648370663449,3.1828698696151644e-6,0.009167016548776425,1.7437917396099323e-27,0.00020424982412508896,0.0,0.0,0.10181503063464557,0.0,0.0,1.6480651812045561e-16,0.0,0.03746394928796877,1.3556896892685124e-11,0.01038558360409133,3.4593000490566075e-16,0.0,1.5823184929565868e-9,3.703127485081849e-5,2.6389128926065588e-19,4.392640144452897e-21,1.2628350132130148e-27,0.10658914360468193,2.387093381029577e-22,0.0,0.11392932206227076,4.263821846261629e-36,2.038535049647259e-5,5.329714137215099e-20,0.0006149406389200069,4.514733748885947e-38,8.392067794671965e-5,8.176106579256952e-5,2.68342756046337e-26,0.0,0.008947238653488695,4.00401196616921e-20,0.11131381617093687,0.013919461156395214,1.195618954639497e-13,0.010651094764695992,0.0005800456649291435,1.862862612055385e-15,0.11143048817143786,0.18472437207322623,3.3885051275799e-8,9.15012195006484e-26,1.7874614982901388e-6,5.669284907321383e-12,1.9671977642989795e-7,2.442477503306707e-5,3.5364850599115066e-14,5.8460606117984844e-27,0.18044289151885912,0.0041341370698690216,1.2377315305656926e-10,0.12741235188791888,2.3785057858027296e-31,0.0,2.0431249077237692e-16,8.248073519576985e-30,1.3148069695449228e-5,3.2514455849733273e-5,2.494298911065473e-16,2.5612842063411378e-21,0.04739059496277613,1.399370016195385e-29,9.647336034654498e-7,0.1378572768689356,0.042966112410904325,0.15220158859772706,2.103049438637922e-9,0.10515185573572891,5.900995951367677e-16,0.00013337437170764062,0.0,0.0,0.1908645404990172,1.8752461768696624e-27,8.25984448828326e-9,0.012332647972425217,0.07635874503556317,0.07448556242983694,2.1774029059955995e-32,1.6002819901594108e-12,0.0010716923136717023,7.487090519075787e-16,0.0026712644187930567,1.0489887625522092e-12,0.03791617206540546,0.0,0.0,1.5871983528123957e-14,0.0,0.1090701381117496,0.0,1.0922904839254399e-5,0.0,7.632237002344368e-7,0.0525227200006794,0.0,0.015611378900897706,9.250738546504423e-15,0.0002811562411693114,0.04676436235062283,5.674792716175263e-11,2.7589924942238216e-8,0.2186971859486604,0.0,1.4994574705909048e-16,2.3936387956604816e-13,4.606738492633023e-8,0.0,0.003977375286102057,0.0020485785225679873,0.0,0.08325820725418744,7.11682242895437e-23,1.9543677570308671e-22,1.0269478800545293e-15,5.554301086546904e-25,0.0,2.0937325893091984e-8,4.685358831330141e-14,1.261855974825021e-17,0.3746536341228893,0.10753045282389434,0.00010096974373227337,0.0,0.0,0.0,1.2908154619807874e-14,8.026272187463319e-15,0.0038950909425732962,8.09340594891639e-24,7.500699124646323e-44,4.857834657214949e-10,1.9221854642829835e-5,0.05351339993488678,9.39172395250674e-58,0.007295557930013761,1.14279462108814e-20,0.19036012738021701,0.001291509695058738,0.0003383655685895978,1.3277383117445095e-7,0.0,0.0,0.0,1.8631438203182145e-12,0.15781604484814948,4.08933458379981e-9,0.0007266397154764599,0.0016305616499109586,0.0,0.1546342699192279,0.0006162130492455045,1.1073666471875691e-16,0.017638101757721077,0.0,3.2527290620313603e-52,6.2983889563954e-10,1.0043790579086754e-51,2.7350481755655087e-28,0.11140285024855734,9.119123053955694e-17,0.05784077907325138,0.0956132981909337,0.035108613828181354,0.07264207168635453,0.0033055031770307373,0.0,0.0,5.0996760237848133e-36,0.0,0.0,4.014288273403264e-6,1.517223723863014e-7,6.573797218175788e-5,0.0,0.0,1.2818218255177064e-16,0.010485894327311866,2.2493592545374334e-22,0.01542182274483699,7.674156066696643e-27,0.013783064338157881,0.0,0.008826152681954589,0.18763883376087218,2.0993409087032356e-9,0.0,3.65736382898488e-14,4.547190473785741e-11,0.0,3.718062548961153e-6,3.945000103728607e-17,1.00401421349734e-10,0.11184312762502896,0.0,1.534121291003213e-8,0.0006951208967699786,0.00015969362905299297,0.06967714866499991,0.0,9.996134534359265e-9,1.9091937048072753e-22,0.00013990865741869674,0.08726460898155011,0.0,0.0021555173901365407,4.1812555886453925e-36,4.804243626154854e-11,0.0003031097637751855,0.0006657353926215579,7.283134087200558e-58,0.0,2.9620352864269833e-18,0.0,0.0005572692897339692,4.421425171441224e-28,6.431325673224926e-5,4.679691865380284e-6,0.00028532822713595783,6.136835101672325e-13,0.16564515464404259,0.0,0.16909975031474297],"x":[29.0,27.0,21.0,8.0,33.0,19.0,1.0,9.0,27.0,20.0,16.0,31.0,9.0,17.0,10.0,35.0,12.0,35.0,1.0,22.0,29.0,27.0,16.0,8.0,36.0,26.0,13.0,24.0,22.0,25.0,27.0,14.0,18.0,20.0,17.0,17.0,38.0,29.0,15.0,30.0,2.0,12.0,27.0,19.0,34.0,8.0,29.0,6.0,39.0,9.0,22.0,9.0,35.0,24.0,22.0,3.0,18.0,19.0,20.0,32.0,34.0,38.0,32.0,5.0,28.0,20.0,18.0,28.0,5.0,6.0,40.0,32.0,24.0,4.0,17.0,9.0,1.0,34.0,14.0,1.0,37.0,12.0,38.0,40.0,37.0,30.0,20.0,33.0,11.0,13.0,10.0,24.0,11.0,26.0,31.0,21.0,7.0,1.0,19.0,30.0,5.0,39.0,0.0,35.0,16.0,20.0,24.0,8.0,36.0,39.0,36.0,5.0,34.0,24.0,36.0,28.0,24.0,28.0,13.0,13.0,17.0,9.0,11.0,25.0,10.0,4.0,33.0,13.0,2.0,2.0,9.0,11.0,39.0,6.0,27.0,22.0,14.0,7.0,18.0,25.0,26.0,38.0,28.0,31.0,7.0,33.0,28.0,26.0,21.0,1.0,6.0,13.0,39.0,40.0,2.0,18.0,19.0,17.0,20.0,22.0,16.0,37.0,3.0,35.0,2.0,21.0,27.0,22.0,13.0,26.0,29.0,3.0,30.0,26.0,16.0,22.0,22.0,27.0,32.0,32.0,37.0,31.0,23.0,4.0,38.0,15.0,21.0,26.0,40.0,25.0,35.0,0.0,38.0,13.0,0.0,36.0,5.0,40.0,10.0,8.0,10.0,37.0,28.0,15.0,28.0,12.0,25.0,16.0,10.0,38.0,3.0,4.0,38.0,18.0,34.0,32.0,9.0,25.0,15.0,33.0,27.0,24.0,13.0,20.0,32.0,26.0,33.0,21.0,36.0,12.0,17.0,5.0,37.0,20.0,27.0,5.0,3.0,33.0,18.0,31.0,15.0,21.0,14.0,25.0,10.0,30.0,37.0,16.0,28.0,7.0,25.0,26.0,5.0,20.0,23.0,24.0,35.0,25.0,27.0,7.0,34.0,18.0,16.0,39.0,3.0,13.0,9.0,34.0,9.0,11.0,12.0,8.0,23.0,28.0,23.0,20.0,34.0,7.0,15.0,10.0,36.0,32.0,21.0,21.0,35.0,31.0,39.0,4.0,0.0,9.0,7.0,19.0,4.0,19.0,39.0,36.0,6.0,33.0,14.0,21.0,17.0,3.0,15.0,26.0,25.0,28.0,2.0,39.0,15.0,23.0,24.0,28.0,35.0,35.0,38.0,13.0,10.0,5.0,29.0,24.0,13.0,10.0,11.0,21.0,9.0,37.0,18.0,7.0,23.0,13.0,29.0,31.0,11.0,5.0,13.0,13.0,24.0,3.0,23.0,39.0,26.0,31.0,10.0,36.0,27.0,11.0,13.0,12.0,11.0,28.0,27.0,24.0,5.0,11.0,34.0,26.0,24.0,10.0,23.0,31.0,39.0,12.0,29.0,36.0,14.0,21.0,25.0,19.0,35.0,30.0,1.0,26.0,37.0,21.0,31.0,16.0,32.0,18.0,25.0,17.0,28.0,32.0,23.0,21.0,30.0,4.0,31.0,8.0,25.0,20.0,20.0,36.0,9.0,39.0,1.0,30.0,37.0,5.0,12.0,24.0,14.0,17.0,7.0,3.0,2.0,20.0,7.0,32.0,28.0,2.0,11.0,32.0,30.0,7.0,37.0,18.0,26.0,38.0,36.0,21.0,3.0,5.0,16.0,4.0,9.0,30.0,3.0,5.0,35.0,2.0,25.0,10.0,2.0,21.0,25.0,36.0,11.0,8.0,19.0,17.0,28.0,10.0,7.0,13.0,21.0,21.0,32.0,13.0,9.0,33.0,20.0,27.0,12.0,22.0,12.0,18.0,17.0,16.0,3.0,10.0,24.0,6.0,27.0,18.0,6.0,9.0,7.0,32.0,16.0,30.0,1.0,21.0,8.0,27.0,4.0,21.0,5.0,21.0,12.0,12.0,7.0,28.0,36.0,32.0,28.0,10.0,6.0,19.0,22.0,35.0,26.0,26.0,17.0,22.0,9.0,19.0,37.0,24.0,15.0,15.0,22.0,28.0,7.0,23.0,11.0,29.0,37.0,24.0,21.0,28.0,6.0,17.0,8.0,10.0,22.0,10.0,8.0,13.0,24.0,40.0,33.0,27.0,32.0,3.0,4.0,11.0,26.0,2.0,18.0,5.0,15.0,12.0,28.0,11.0,17.0,12.0,8.0,37.0,7.0,37.0,15.0,21.0,10.0,23.0,18.0,14.0,32.0,36.0,34.0,10.0,19.0,20.0,10.0,21.0,39.0,4.0,34.0,17.0,38.0,16.0,19.0,22.0,21.0,26.0,14.0,4.0,4.0,20.0,36.0,35.0,31.0,11.0,39.0,4.0,30.0,7.0,36.0,5.0,30.0,21.0,36.0,25.0,27.0,31.0,26.0,17.0,38.0,17.0,25.0,30.0,11.0,24.0,21.0,1.0,33.0,5.0,7.0,40.0,4.0,19.0,4.0,28.0,37.0,37.0,29.0,30.0,19.0,31.0,12.0,39.0,2.0,31.0,20.0,7.0,8.0,10.0,5.0,2.0,12.0,11.0,35.0,6.0,7.0,4.0,8.0,5.0,3.0,13.0,33.0,12.0,35.0,6.0,13.0,1.0,37.0,2.0,26.0,14.0,29.0,29.0,38.0,19.0,21.0,29.0,3.0,6.0,7.0,4.0,1.0,8.0,11.0,28.0,16.0,18.0,16.0,16.0,34.0,8.0,36.0,25.0,7.0,25.0,27.0,30.0,3.0,10.0,6.0,36.0,15.0,38.0,18.0,36.0,34.0,5.0,12.0,17.0,9.0,27.0,17.0,37.0,15.0,33.0,33.0,33.0,33.0,26.0,3.0,34.0,20.0,32.0,22.0,24.0,22.0,38.0,35.0,14.0,11.0,11.0,30.0,6.0,2.0,26.0,37.0,19.0,15.0,7.0,31.0,6.0,3.0,33.0,20.0,18.0,29.0,25.0,17.0,39.0,37.0,17.0,32.0,19.0,20.0,21.0,9.0,10.0,20.0,33.0,14.0,3.0,26.0,25.0,28.0,6.0,38.0,38.0,26.0,8.0,18.0,33.0,9.0,33.0,14.0,6.0,31.0,9.0,16.0,37.0,6.0,16.0,5.0,32.0,20.0,16.0,22.0,28.0,23.0,24.0,32.0,33.0,31.0,29.0,26.0,6.0,21.0,12.0,17.0,10.0,18.0,13.0,21.0,38.0,3.0,35.0,7.0,22.0,5.0,24.0,24.0,27.0,25.0,11.0,39.0,22.0,26.0,12.0,8.0,28.0,17.0,13.0,23.0,25.0,12.0,32.0,25.0,27.0,17.0,19.0,39.0,4.0,25.0,28.0,30.0,3.0,39.0,17.0,10.0,19.0,28.0,10.0,20.0,12.0,5.0,12.0,16.0,21.0,37.0,8.0,5.0,19.0,32.0,16.0,16.0,13.0,17.0,29.0,29.0,5.0,4.0,26.0,11.0,34.0,31.0,15.0,19.0,6.0,10.0,39.0,21.0,5.0,38.0,21.0,9.0,4.0,2.0,31.0,14.0,25.0,3.0,10.0,35.0,4.0,33.0,9.0,8.0,5.0,13.0,24.0,31.0,14.0,34.0,1.0,31.0,20.0,34.0,32.0,12.0,39.0,10.0,18.0,17.0,28.0,27.0,2.0,33.0,17.0,15.0,12.0,5.0,23.0,26.0,3.0,20.0,30.0,36.0,12.0,27.0,10.0,12.0,19.0,11.0,30.0,39.0,38.0,33.0,18.0,13.0,22.0,18.0,1.0,5.0,17.0,38.0,37.0,39.0,26.0,25.0,2.0,39.0,29.0,33.0,10.0,11.0,35.0,8.0,33.0,5.0,7.0,29.0,14.0,24.0,8.0,31.0,16.0,6.0,12.0,29.0,28.0,32.0,5.0,13.0,20.0,3.0,17.0,36.0,12.0,40.0,34.0,13.0,26.0,2.0,9.0,8.0,9.0,11.0,39.0,32.0,40.0,24.0,29.0,18.0,17.0,26.0,4.0,16.0,24.0,9.0,38.0,20.0,27.0,2.0,24.0,2.0,4.0,22.0,24.0,5.0,38.0,23.0,26.0,29.0,37.0,15.0,31.0,22.0,23.0,7.0,3.0,29.0,38.0,36.0,18.0,2.0,12.0,13.0,37.0,20.0,8.0,7.0,34.0,13.0,29.0,13.0,24.0,21.0,13.0,23.0,7.0,28.0,6.0,25.0,6.0],"p":[0.0926082545390779,0.1407553121433107,0.07508727060565845,0.07202431084115131,0.08643872366325685,0.19903791563385684,0.11202519181465674,0.19442962489645918,0.15827496368256577,0.12236074492348537,0.18372513617925265,0.12919008423163678,0.1457497712644658,0.07502689344249176,0.047250841873026195,0.029132890757384722,0.1009799330385825,0.07225521006307689,0.024148744960216153,0.17439481916961974,0.18202303537184653,0.12453416483982771,0.0959690422379747,0.1217166056883655,0.019309754233696366,0.07175278733983359,0.06872143260570751,0.17564414722213126,0.10614572497883419,0.14685044917156995,0.13868266512773314,0.04524905541675026,0.1705251356657892,0.0065156608079414815,0.15951159543636215,0.05434539495257704,0.11867874235721257,0.16597966677431028,0.05113331291568057,0.17706186046294087,0.09140588305871158,0.06762181744756872,0.18583616363323707,0.054006528932461606,0.17445058265308977,0.07990007007008014,0.15768264432924736,0.060971144984339844,0.19422642278075908,0.14359088952723872,0.013850356140998965,0.054624188118341625,0.11895266213555598,0.1874335348793298,0.1429948380773617,0.10356457435266951,0.10553321464006303,0.030426482822278222,0.07527909812150552,0.17187257036182038,0.19760640067644974,0.024596237845363335,0.05723680333153647,0.0373805885725623,0.08729375818143242,0.0886725074523854,0.09373015075241597,0.03890677384198571,0.19274164709436567,0.09603119962315368,0.13260394616792134,0.10214153113734077,0.12219642813103603,0.19555019308785823,0.08130388147015566,0.19373424345600518,0.04613086883154063,0.1330334629931469,0.02132240590986192,0.12107002187781882,0.030874317002089004,0.09255049531936264,0.18673214496791887,0.1610828397534675,0.09818618415828016,0.15215308365965585,0.08136796579914868,0.11449784881121952,0.18369165059749137,0.05462854519684455,0.06032046632676385,0.17077033838087585,0.08086717967782567,0.013769295913393,0.16285140914858426,0.07060322379452698,0.19276817483123976,0.11398846931818798,0.10788029568597107,0.15153430283582392,0.13237472911776665,0.13275122583058316,0.038954364367174324,0.05980052765305506,0.06390369574985533,0.0739028097903045,0.020359229612743904,0.01902567030886364,0.14031118961513284,0.16025457128916082,0.14026698515870104,0.11100032589284346,0.07069349610859872,0.19358223581310405,0.1072943257934615,0.15109819836407784,0.019696825643185492,0.11476982047720097,0.03128252287055666,0.07182735270327485,0.04285667875599435,0.13425194768693846,0.16266590468178346,0.037532362243330564,0.08809054595929196,0.01567456795933895,0.07898368023056604,0.14464112898970258,0.08319380941663593,0.018403915102718573,0.01648260839921716,0.1183808012552436,0.16180853547286508,0.11922744926883855,0.11396303263310169,0.007807666918937928,0.06335465674584713,0.035074077412866216,0.15021281555253962,0.09659704943952585,0.12976604082939888,0.05844416920796909,0.09792221689024379,0.08606665658777808,0.0032346534623041824,0.006933817742814119,0.1579550552591774,0.09784489784016169,0.12775024683170494,0.011581672916614716,0.048683530346345275,0.10095041382478619,0.09894729709112222,0.1517923051666512,0.1760220854137749,0.031462424663792544,0.07159305776642735,0.11307647066207359,0.003382913844234947,0.030758029887391916,0.004804263526107456,0.04833642858905188,0.15614265920129244,0.040752470246525264,0.06755596496096761,0.16079174291707612,0.030520561102189793,0.15045347474970053,0.017041420122494034,0.05917516831649708,0.10523327127204905,0.1920663392191509,0.07439304925717427,0.0075236529903372155,0.07386155977333685,0.1849876127741777,0.17129241366216652,0.02091943832262393,0.1684515337004967,0.10590393340294778,0.1684771206348685,0.0032423930681107385,0.19435432455443405,0.12659483164043026,0.13373482624355648,0.04282556592242912,0.14658084504122285,0.10228568954498632,0.02056415166997132,0.15892612135489623,0.14416696804244755,0.007421030839431442,0.04789365878333607,0.09128247614525486,0.0662377639371556,0.15142541660861233,0.15127545696712802,0.11536219980029885,0.18726879645647526,0.00564465666535563,0.1166749957272991,0.1810869085109526,0.13737286744081129,0.12784517075179488,0.036392891420883935,0.19869070991845203,0.03559701067674453,0.053147074011824814,0.16132041097854108,0.007025477148169657,0.15979700311418515,0.08271114782252775,0.18816814611784088,0.0689211490792895,0.17789685958985257,0.08103957158027675,0.18495038871129388,0.17156421293712595,0.06286078964668818,0.12257227489653211,0.013305716558501858,0.11005783042372452,0.008481473241516468,0.14760421342042326,0.0618213406357246,0.07826551724932154,0.1357980671532927,0.0038187892595799248,0.07493319297357247,0.04948775214357651,0.07866747184224195,0.14170880523026944,0.18151754986680949,0.060931961816278024,0.18174775789362824,0.1979799241595795,0.013780492670284916,0.13678897937383733,0.03542680118262114,0.1382898238069971,0.04030704850750149,0.015327768263457121,0.13240723171216362,0.07433407161880257,0.06983178485541078,0.07791817103298589,0.02428583525935877,0.19200616087609937,0.011088920058502927,0.08664481124441391,0.18480057759705876,0.17908001945458715,0.14096156042489236,0.11300814609357471,0.16135827251483864,0.027642174823484036,0.04149310098091159,0.18113155349329302,0.07891938567147544,0.08150824163158155,0.18331080984109588,0.17051500534281444,0.11093711860651899,0.040952314243597465,0.15199612104422422,0.066087037323019,0.0945967685311977,0.07635118101100319,0.1856898117747736,0.17909826951023156,0.034526325944589646,0.1104971296811133,0.17531207863450385,0.10163995597581446,0.07883601133283068,0.07049180928584456,0.18663416698982163,0.1414450047041858,0.07428678652580634,0.038363000092056065,0.10771342142800099,0.06753986900958489,0.15133218362861564,0.0659301613812735,0.05564473453288419,0.19044642096245024,0.0690601312252697,0.1668072767621449,0.03919296919223787,0.1881251799930476,0.02134705699708044,0.13992287038402434,0.09307154321803082,0.12734401319317898,0.14438416728257272,0.08645878516029906,0.07399670919156458,0.17702889557469137,0.17642407957269995,0.17991109499448854,0.1802083703027383,0.09255398485322736,0.13281541019665075,0.06301214387103858,0.1037764544413284,0.0899419624215673,0.1853097279973336,0.007600635851086945,0.12388700537628475,0.1500276251098064,0.09100003935838474,0.11256907790690081,0.17949219288605445,0.09962047715646288,0.07598392246425703,0.10896891180720858,0.0248360010878685,0.1972310214013584,0.0925882400431549,0.15697561220327483,0.07555615533522278,0.1722152527816202,0.1474489096517734,0.11472906427182013,0.14186058239756769,0.09639588710108998,0.1798268730074536,0.009481319072429795,0.12765355864812658,0.13379107554255124,0.16109444406032825,0.0745254269202901,0.005175801019046133,0.0014865101086979139,0.1253958442947174,0.18739072232439594,0.05306409678731963,0.08618629897343535,0.09283162826397194,0.004775340620874458,0.06486339413737667,0.10165738407242086,0.12554711450691733,0.0871372621043705,0.09483305472290567,0.19637168808000738,0.08852382859076152,0.1557544474436266,0.16456038455039904,0.11109246189405347,0.019558237329086882,0.17296763327855122,0.19984929512174268,0.16153832133694448,0.19388937232150766,0.10669247111776992,0.13471114962165723,0.1216336929442221,0.0682040158915775,0.11525956005913414,0.053323729962094606,0.03136011746756236,0.04718620570563159,0.17540030878742355,0.06816045786540355,0.09019030903254698,0.04294845225979121,0.03858947067765799,0.16106316231200346,0.039708286391231695,0.07210891762324466,0.1614448295359365,0.14688938751025368,0.058021355994702484,0.1784476573171833,0.18212299967531523,0.04830475729431836,0.00015058194917814128,0.08910377283988309,0.1779139794688144,0.0643573166982303,0.10607141603068714,0.00805983355323261,0.049245359240393465,0.09397269115074242,0.15942502401658284,0.1294879980417341,0.01729154604842269,0.07355530679370373,0.006060989958361684,0.06441800147180805,0.11861599513684662,0.1186123251442115,0.06712689602504489,0.05024098065800349,0.12073523885587255,0.11660635803574322,0.036206898933206326,0.19570816739851332,0.11328395926499968,0.1551621607980057,0.012384889836686465,0.037947493770089574,0.16683213840174732,0.18683667191333383,0.1742765539558561,0.14064795699691177,0.14546162326755005,0.18071078564062437,0.11986726169484806,0.1355232028976306,0.1506872896278318,0.014102127213421146,0.10630295347736994,0.11392658551346538,0.1523860866836162,0.019383309882743574,0.18665566812387888,0.04479198567886487,0.07861397681108317,0.12081458838983067,0.16359695979507732,0.03245596446193999,0.08076470112731476,0.003082769532421015,0.17483702460757564,0.11538574103442159,0.18917128282718024,0.05036636648493582,0.11722543279067468,0.07658563954989309,0.0376535174912803,0.05954785071211464,0.04321511338190667,0.04694458402425181,0.1272487803774279,0.16966907551502697,0.1755137785821539,0.15457395212507696,0.14227034324577956,0.07186919784903138,0.09321954632218583,0.017247495142606307,0.04445962035030862,0.14818378054905498,0.18434844000384834,0.04168145443493523,0.13277535744774807,0.007336429833438807,0.16035743237280986,0.03114217948695086,0.15396156978749187,0.16849469746566356,0.06687482912804828,0.008071615756236784,0.13644764957535704,0.08222584413367331,0.14351081207399546,0.07909520054287396,0.1855639130839758,0.15651498348693815,0.14863493592512309,0.17632838960883093,0.025433541474024504,0.04017783811326377,0.05705350153665241,0.036130732343082665,0.07200950316455694,0.10792221068538842,0.11799089022880423,0.019407351573926014,0.06479614779191337,0.0545805285441463,0.04598072227707837,0.1424645685822278,0.042480677000290436,0.04749132448675911,0.13540086604751794,0.012599689112975421,0.09894585552192524,0.06492793947142435,0.09638580783885714,0.06366554152636716,0.14321210035246623,0.14457877525044496,0.09151489291590789,0.043440772717044274,0.18727964775836267,0.11457304692809873,0.040720302212471984,0.1614254867097661,0.13936871654275482,0.05748448462067795,0.09232874163069625,0.13924309408133917,0.06406798979031528,0.17649025535970708,0.07740532855099103,0.12960603994361306,0.1482039193749851,0.037071331363253225,0.00795420029339553,0.07774073017559324,0.16807136181323182,0.082895231460811,0.05293861500848847,0.11782919150415494,0.04843813229839893,0.19678005674598473,0.151278266562767,0.19693815384333907,0.07704621354884936,0.07141472293499965,0.020242464515631123,0.10753105453180792,0.03350067387241586,0.04347893897024773,0.07656173053949528,0.019646284492945032,0.002884130452790057,0.16226153291785064,0.1398835939446031,0.10738821808677762,0.06123895155000501,0.11153576101639594,0.1829207515767841,0.08272791649893568,0.04316836178915753,0.11116597178160147,0.1669984435608449,0.18182940244375914,0.007643301567954008,0.1497016032487589,0.17145596818387587,0.13529098291566713,0.07401931418615675,0.03782491244673563,0.11824094425441643,0.038880495595420776,0.1505605019245162,0.16680705386142308,0.04478477084776036,0.09131901670684553,0.1440067579841129,0.16008599263883455,0.19727327798703925,0.18872497627876214,0.03549168947738362,0.0008075088150137244,0.19155220207995294,0.05635794115392008,0.08204677162914958,0.16009655721454347,0.14843837233905505,0.02467744907732086,0.0886069848501097,0.12624108454505453,0.07921065102170283,0.035214258396040775,0.08163651575176685,0.15642742771413456,0.050732742167684024,0.18937220202790095,0.09267408018187502,0.045224270904982426,0.12365144790266923,0.1883295905117125,0.1528912563801709,0.029852287005528222,0.000996801460581631,0.03992483140427679,0.15941536888099744,0.09935023601847043,0.009648482695169448,0.16186357317769293,0.077949345728937,0.06919325176628122,0.18051664624097086,0.16304033792182873,0.043537490827438546,0.07850589701802693,0.1988120612268802,0.14713836820417622,0.08797923868658875,0.17820048787355908,0.06032436792121514,0.07452545353897748,0.03880019460600979,0.07086461045288735,0.15499741153383284,0.029823485112422346,0.08206643452206093,0.0019234562868629013,0.14237163409577813,0.15113918392815717,0.1199914837960185,0.1630643838113661,0.028857695576046585,0.04145872506544142,0.06765007694370247,0.1171956545569095,0.06730474104174688,0.18981776007163936,0.17620833088650498,0.0993788354489015,0.008946749466634164,0.13667221239359253,0.1662437215752761,0.03386759750739015,0.18575282083284084,0.10703651564078803,0.1468137162931019,0.12492888423869136,0.12283258395541999,0.14747812668812826,0.017615645276024463,0.094171579489044,0.04715338643985012,0.1962237047831418,0.12173578418667122,0.047720814778529075,0.061092088662876125,0.08161059353758437,0.0763306943316203,0.09378993218312699,0.17622748176652833,0.0358620400599603,0.1753284905976424,0.09606050022227489,0.03927598546127951,0.16294435403585142,0.04145674417108483,0.11136275373618028,0.006424895216363736,0.09834630345470008,0.047554201072297755,0.07684007465738368,0.16939298309397294,0.08959950605152019,0.08306121079194746,0.00867264234185705,0.05416225566445472,0.08423604963823283,0.009486531773219965,0.11567696945042641,0.14748094871424514,0.1623538809400695,0.09910729724005513,0.18926413355926322,0.11491308154375957,0.10080014683298316,0.15323859442648288,0.0865351623495533,0.08028834761191748,0.13444447853053543,0.06639063857259205,0.10558243673304615,0.004284426193896573,0.013562905527159731,0.1769648669916932,0.184864005915376,0.02162291462607646,0.04879593905174602,0.12047388616939791,0.04640036531735832,0.016935484262805778,0.14669814527315622,0.13151601648601857,0.13777919698442448,0.07849521231790378,0.03512805102873489,0.19367403542667272,0.03624702671150133,0.1305379330951164,0.13627291342718464,0.05640175369736231,0.16365060941190368,0.07020070179182802,0.12341427672434575,0.08810434868202553,0.1433371698610873,0.0028495954915295665,0.04410468446017908,0.03456177169279955,0.07593473667849532,0.0960704497096113,0.06214319350506706,0.1539046457098365,0.05890239523096601,0.007610715199121554,0.09682593373353705,0.013314115212196677,0.10578322628012193,0.1607290445086089,0.03875371710255902,0.17684496578977035,0.06147675429254065,0.17903360586877282,0.1447013180417128,0.023979229741697153,0.036137406567098164,0.06786782768602709,0.08807612687308022,0.07941346345220493,0.07379956958707971,0.09613139272393122,0.09290280195045103,0.06715435620615882,0.15749253036929378,0.06160957058867758,0.06754812056291666,0.011846773205130213,0.08556927315772063,0.039251654193009515,0.09934682239503556,0.009746348008644469,0.1553176904367277,0.1026576310323648,0.06294046211391384,0.11832297292823801,0.1310310856533982,0.16798330479915316,0.03196480584443902,0.09548541776788683,0.08653115173819491,0.06684819573917937,0.16577342421077207,0.06658771772355343,0.17172495257539158,0.18551090093865566,0.1781917512924229,0.08067702757451643,0.15548539237314132,0.0012270444709977292,0.041383139305435135,0.17655273808381255,0.14086679740880448,0.03546446366550389,0.09315107016633198,0.09409043106619155,0.06652102899468688,0.03860987806560119,0.12601160244625215,0.12479909509088537,0.07389987684054948,0.14209133681937344,0.15448617625106628,0.08753302144896176,0.13984569519866633,0.09319461893961739,0.18866228218617734,0.1853109679882337,0.013927405574347818,0.04410640452220602,0.09914207565926768,0.19561528760208846,0.07194822681154754,0.059602195300396454,0.1360061989111828,0.15983881267292865,0.031079919512911936,0.14274223666754968,0.032764841837870096,0.1401120597984475,0.11362336365253448,0.17005475634874925,0.0806505954633901,0.07557124626756413,0.012954461248156203,0.035572709866774015,0.05169855603344545,0.16328732502035118,0.06395988025269671,0.13017899497892604,0.13683788903128744,0.014013261997671212,0.1833143215845731,0.042255905721994,0.04127936189778732,0.0992856799718024,0.167362073412752,0.12863369998244686,0.1181765520859425,0.012267163618119126,0.18974193131115974,0.06427025059006329,0.146458982381403,0.05300871142290129,0.18786900942171803,0.06790744583019688,0.17245855710634372,0.1913744000248476,0.053910249676149304,0.026836529080770524,0.19479922075495534,0.010438269358783493,0.057656129059264274,0.17161841523852195,0.02582156282810799,0.19729899949366547,0.08711969815083793,0.1932639365380681,0.09330280740580538,0.0970827355964036,0.0798916365370681,0.00552600171607689,0.1894768654167551,0.09734793057887936,0.0420368314061764,0.1760259172708426,0.02135851734927421,0.005021924174968451,0.17446170377981482,0.13763206115315857,0.14112769273098102,0.07980169362773744,0.09794099984720145,0.09246116548908936,0.16502304257924202,0.056700097924633486,0.06492952223043798,0.14984581486665075,0.086228866018894,0.1379168104495153,0.058195444643964714,0.060566479508411854,0.0332906722913866,0.09690169042850459,0.15358435290008965,0.06050311129597779,0.05085998578763942,0.058226093480472856,0.011051061494614878,0.02671740714365294,0.04613462493785852,0.12663338027047227,0.10458041721329457,0.16401778863373365,0.03855088650345073,0.0865592816610107,0.10655226876279703,0.11735774503242671,0.19128796909965182,0.11340177440622204,0.13531419989309942,0.03831520328631055,0.14984887406952474,0.0488868873162049,0.1888434892511345,0.09074696426203017,0.0868471726272258,0.05610314850116449,0.062386685380001874,0.14086477221066276,0.17497141481556705,0.017212516926632348,0.16696562934730796,0.06278195847976234,0.07702222908665131,0.09255577230558841,0.15193117426961203,0.1690315424815111,0.11971844488983181,0.1454733395044485,0.006955721595215714,0.154855913250027,0.1153595836451704,0.18358364409846628,0.05281653302541396,0.0668359829156286,0.15878716759159703,0.033439187769531656,0.031563008756367375,0.14766082179796758,0.008790376014757184,0.07324290345177413,0.037398705534343706,0.045334405953198154,0.13241436189516329,0.08204767115120988,0.09036385493394011,0.11254434887134179,0.12490566309697636,0.05209251320817674,0.08354582790392154,0.1696926489692827,0.09900206219873882,0.009129773022878807,0.086128810030334,0.18270181888999845,0.10788829188363001,0.16864923185044056,0.05316785182800019,0.15857289280579337,0.021504676500006915,0.06248584371383248,0.047586561668468176,0.04729369394756087,0.12107168159328766,0.0695499930689699,0.17106784448687434,0.08223901791118973,0.060953380576407805,0.04474934729491862,0.08325111100023502,0.12489684314094816,0.08501593824694585,0.004771315128295584,0.12740852744295755,0.0314304687238828,0.08448851357111585,0.0043090280277261256,0.03488517670410234,0.045004467590171876,0.19186310621458405,0.05030084439173113,0.1743564732170778,0.03451730214120992,0.051168103464934014,0.12074289440281682,0.04522426041284611,0.024446607344116123,0.13911794550078913,0.06205718136340393,0.17292639907209637,0.19584799503782305,0.1425246649276946,0.12472574515842921,0.10760280529527964,0.060523594646238445,0.10100256528541247,0.01100242419652,0.024260567156525383,0.07858106808049392,0.034097245519887354,0.13990519512251245,0.1839693137255876,0.11060612887756296,0.05362216887999405,0.16422267585816896,0.18145646858487538,0.14967790992562208,0.12256580799970546,0.01570890130084033,0.09363250201685186,0.13112592494526318,0.1588677671853844,0.15788313953736208,0.07819155687074653,0.038174602671305596,0.16015398260142308,0.11279828256366847,0.11448641442844139,0.02692260224228518,0.16539142785051292,0.07914257055693184,0.1734570874598267,0.025174424041066026,0.14001976111733289,0.1309356012322596,0.10068714573417221,0.05859423641579023,0.08220197650059734,0.1480610800111351,0.0011178513958173043,0.14959345300120117,0.19358547779112434,0.18042937616417065,0.13666571342248865,0.1620748822064928,0.19531870361556383,0.07725093492041163,0.13386555967281205,0.1418561966071523,0.03611558310592185,0.01445961771479709,0.15659055241797448,0.18842812853502613,0.1463273082773387,0.08809946959745459,0.006550568519668865,0.05091427944796343,0.09881990495438348,0.039991085674840665,0.06880022907617622,0.050581091447168006,0.05091855506419969,0.00395773633542329,0.03820560998839917,0.18948739187599145,0.0842211887475009,0.17567259054717807,0.006222677642747865,0.18159616132960205,0.16281377502208288,0.026444383315217836,0.1551297877002823,0.13577796763487093,0.11434527624518949,0.11894526963091101],"n":[25.0,30.0,21.0,13.0,99.0,63.0,74.0,30.0,7.0,1.0,58.0,34.0,35.0,11.0,54.0,48.0,48.0,97.0,95.0,85.0,69.0,11.0,85.0,40.0,91.0,82.0,58.0,80.0,76.0,61.0,97.0,91.0,89.0,53.0,24.0,36.0,93.0,26.0,70.0,81.0,59.0,14.0,33.0,82.0,29.0,40.0,63.0,63.0,40.0,10.0,30.0,53.0,31.0,32.0,76.0,10.0,43.0,53.0,37.0,84.0,14.0,74.0,45.0,97.0,32.0,31.0,25.0,21.0,56.0,56.0,49.0,40.0,53.0,24.0,59.0,7.0,25.0,42.0,76.0,95.0,81.0,38.0,20.0,31.0,74.0,70.0,3.0,67.0,67.0,59.0,25.0,70.0,80.0,68.0,58.0,92.0,94.0,81.0,52.0,64.0,95.0,1.0,92.0,96.0,92.0,98.0,80.0,36.0,54.0,73.0,54.0,98.0,9.0,8.0,77.0,48.0,69.0,74.0,94.0,98.0,48.0,89.0,94.0,64.0,58.0,81.0,99.0,14.0,15.0,34.0,64.0,72.0,7.0,94.0,39.0,9.0,26.0,57.0,59.0,38.0,10.0,96.0,27.0,51.0,79.0,38.0,69.0,94.0,2.0,33.0,3.0,13.0,49.0,83.0,49.0,47.0,24.0,71.0,93.0,17.0,33.0,14.0,92.0,76.0,10.0,87.0,83.0,23.0,28.0,55.0,27.0,59.0,5.0,73.0,23.0,15.0,76.0,72.0,80.0,32.0,60.0,11.0,80.0,80.0,67.0,69.0,48.0,83.0,32.0,0.0,3.0,35.0,52.0,73.0,3.0,2.0,56.0,32.0,56.0,88.0,30.0,32.0,10.0,89.0,90.0,12.0,58.0,60.0,0.0,32.0,39.0,14.0,14.0,15.0,19.0,86.0,29.0,96.0,43.0,37.0,57.0,81.0,8.0,48.0,35.0,21.0,48.0,97.0,23.0,65.0,26.0,100.0,76.0,48.0,30.0,31.0,7.0,39.0,10.0,54.0,58.0,27.0,98.0,4.0,90.0,47.0,11.0,54.0,14.0,91.0,88.0,10.0,60.0,17.0,17.0,37.0,68.0,41.0,46.0,8.0,4.0,60.0,73.0,65.0,16.0,64.0,11.0,85.0,51.0,73.0,28.0,80.0,10.0,91.0,50.0,96.0,34.0,78.0,20.0,66.0,20.0,19.0,98.0,50.0,99.0,47.0,29.0,68.0,30.0,81.0,23.0,67.0,48.0,23.0,89.0,27.0,85.0,30.0,3.0,94.0,81.0,66.0,42.0,69.0,25.0,19.0,30.0,92.0,65.0,44.0,96.0,22.0,62.0,48.0,85.0,74.0,40.0,64.0,79.0,86.0,90.0,88.0,28.0,82.0,70.0,46.0,90.0,79.0,92.0,28.0,8.0,2.0,12.0,34.0,87.0,77.0,66.0,84.0,73.0,4.0,57.0,7.0,16.0,37.0,35.0,94.0,63.0,61.0,65.0,86.0,85.0,34.0,42.0,62.0,61.0,58.0,40.0,58.0,57.0,18.0,31.0,80.0,92.0,50.0,91.0,11.0,70.0,14.0,11.0,51.0,2.0,57.0,89.0,69.0,88.0,29.0,39.0,20.0,33.0,64.0,40.0,85.0,44.0,35.0,29.0,65.0,46.0,2.0,30.0,45.0,60.0,6.0,64.0,60.0,64.0,21.0,79.0,58.0,49.0,24.0,20.0,3.0,25.0,93.0,62.0,13.0,64.0,31.0,34.0,67.0,37.0,74.0,34.0,25.0,30.0,39.0,44.0,82.0,71.0,99.0,53.0,2.0,43.0,8.0,9.0,22.0,39.0,96.0,28.0,26.0,2.0,98.0,21.0,5.0,56.0,72.0,32.0,84.0,68.0,62.0,94.0,29.0,74.0,55.0,38.0,95.0,31.0,19.0,29.0,62.0,12.0,23.0,99.0,69.0,4.0,67.0,28.0,79.0,67.0,95.0,65.0,22.0,48.0,61.0,1.0,82.0,92.0,86.0,14.0,8.0,70.0,57.0,31.0,84.0,46.0,60.0,57.0,95.0,98.0,40.0,25.0,98.0,56.0,40.0,60.0,62.0,92.0,28.0,60.0,71.0,10.0,43.0,78.0,71.0,8.0,41.0,39.0,65.0,36.0,75.0,37.0,40.0,92.0,84.0,5.0,53.0,29.0,94.0,68.0,17.0,87.0,51.0,77.0,22.0,67.0,5.0,64.0,94.0,53.0,89.0,13.0,29.0,31.0,26.0,77.0,38.0,5.0,86.0,69.0,88.0,100.0,80.0,61.0,54.0,28.0,13.0,20.0,42.0,24.0,37.0,6.0,2.0,55.0,22.0,67.0,91.0,81.0,75.0,88.0,52.0,42.0,78.0,67.0,44.0,26.0,90.0,13.0,59.0,25.0,1.0,76.0,49.0,70.0,91.0,48.0,44.0,6.0,91.0,18.0,46.0,27.0,96.0,54.0,60.0,59.0,92.0,83.0,42.0,33.0,90.0,8.0,35.0,76.0,31.0,40.0,3.0,40.0,94.0,96.0,43.0,93.0,45.0,20.0,53.0,63.0,63.0,1.0,90.0,19.0,69.0,64.0,66.0,75.0,79.0,45.0,72.0,24.0,97.0,77.0,6.0,63.0,59.0,23.0,72.0,77.0,46.0,60.0,84.0,76.0,12.0,55.0,82.0,93.0,62.0,36.0,79.0,52.0,12.0,13.0,32.0,87.0,30.0,50.0,94.0,61.0,20.0,77.0,60.0,4.0,69.0,18.0,12.0,96.0,35.0,71.0,39.0,31.0,1.0,58.0,82.0,23.0,59.0,10.0,49.0,69.0,17.0,74.0,10.0,11.0,31.0,10.0,47.0,99.0,72.0,61.0,15.0,68.0,91.0,37.0,93.0,28.0,42.0,45.0,18.0,2.0,45.0,81.0,16.0,75.0,91.0,43.0,4.0,84.0,4.0,82.0,28.0,67.0,42.0,51.0,82.0,31.0,6.0,14.0,17.0,83.0,10.0,68.0,64.0,4.0,28.0,81.0,4.0,45.0,69.0,21.0,80.0,14.0,7.0,68.0,52.0,52.0,9.0,10.0,55.0,42.0,16.0,62.0,89.0,67.0,84.0,90.0,99.0,48.0,21.0,51.0,37.0,56.0,87.0,11.0,62.0,26.0,6.0,31.0,46.0,35.0,27.0,95.0,61.0,35.0,86.0,70.0,20.0,20.0,32.0,97.0,87.0,90.0,45.0,45.0,58.0,37.0,4.0,73.0,7.0,50.0,21.0,97.0,63.0,51.0,72.0,42.0,4.0,87.0,3.0,68.0,84.0,29.0,24.0,90.0,43.0,87.0,3.0,32.0,61.0,11.0,67.0,65.0,17.0,13.0,91.0,38.0,5.0,37.0,0.0,69.0,99.0,69.0,14.0,17.0,93.0,21.0,36.0,43.0,56.0,89.0,66.0,30.0,13.0,29.0,67.0,49.0,64.0,41.0,65.0,31.0,75.0,23.0,47.0,32.0,77.0,71.0,97.0,54.0,75.0,66.0,77.0,51.0,50.0,32.0,72.0,30.0,19.0,66.0,47.0,41.0,85.0,21.0,66.0,75.0,47.0,9.0,18.0,31.0,21.0,46.0,75.0,21.0,14.0,91.0,76.0,88.0,71.0,20.0,87.0,93.0,84.0,96.0,0.0,30.0,52.0,42.0,14.0,54.0,59.0,57.0,40.0,51.0,91.0,89.0,83.0,54.0,88.0,20.0,27.0,61.0,7.0,71.0,4.0,98.0,3.0,66.0,12.0,4.0,72.0,96.0,53.0,59.0,98.0,63.0,44.0,8.0,50.0,78.0,33.0,15.0,25.0,50.0,16.0,97.0,30.0,63.0,60.0,65.0,12.0,82.0,50.0,28.0,23.0,62.0,90.0,23.0,19.0,35.0,90.0,49.0,71.0,70.0,95.0,83.0,62.0,87.0,94.0,86.0,96.0,28.0,35.0,91.0,72.0,5.0,3.0,18.0,63.0,36.0,24.0,96.0,86.0,21.0,51.0,46.0,33.0,84.0,8.0,42.0,18.0,47.0,35.0,63.0,38.0,8.0,71.0,24.0,84.0,38.0,8.0,16.0,40.0,9.0,10.0,70.0,98.0,77.0,1.0,4.0,98.0,25.0,75.0,76.0,62.0,52.0,7.0,79.0,81.0,63.0,21.0,7.0,85.0,22.0,60.0,40.0,78.0,80.0,14.0,46.0,84.0,34.0,74.0,23.0,82.0,45.0,81.0,84.0,1.0,57.0,61.0,51.0,36.0,31.0,89.0,9.0,32.0,3.0,72.0,81.0,24.0,55.0,50.0,44.0,39.0,7.0,53.0]}
},{}],64:[function(require,module,exports){
module.exports={"expected":[0.0,0.0032639453993920015,0.00027178487383326536,0.0,0.0,0.34328645998024915,0.0,0.0,2.762389789557496e-5,0.00014603534498035007,2.231160615629587e-9,0.0,0.0,0.08949027216317502,0.02736845667278876,0.13282473734156036,0.0032396642405567084,0.0,0.5869518995541031,4.0010719224707715e-5,0.15927852158134598,0.04458687797295302,1.0178782819535013e-11,0.2093341460515832,0.0,0.005463487170002664,0.003911132836042725,1.4428251602263439e-5,8.103248978133848e-11,5.567111040138901e-6,0.0,0.0,0.0,6.32417051710891e-13,9.175430803455957e-11,0.0,0.0,0.0,1.6311595887786588e-37,0.0,0.2137532607155733,0.1997302560394715,0.0,0.0011564872557575513,0.001804732324634107,5.2843158264637797e-14,4.3113159268263485e-6,0.09289151025862788,2.2613437888517572e-15,4.935446925986621e-17,1.7534985450231523e-5,1.628369457765265e-8,0.0,0.0,0.0,0.1639229138457791,0.0013822073378568522,0.38744495480925056,2.2854952437614276e-12,0.00032706522805945275,0.0,0.0001904407364913915,0.0,2.6611399730065404e-8,6.899240460379787e-22,0.0,0.0,0.1741137406721582,0.0,0.0,0.0,1.0301219305078241e-20,4.0763548761652845e-7,1.7457692871301158e-5,0.0,2.100009598946997e-14,0.04188370932814761,0.00017299824436094503,0.25956119805534444,6.8026879528548505e-9,6.101033619821856e-9,3.864794679794694e-12,0.0,1.1892503414997206e-6,0.003832111150226736,3.423472781973932e-9,0.00013358973397034187,5.110661034068279e-6,0.0,0.0,7.452654875655395e-8,1.0139720648611988e-6,0.0,0.38472181032189995,0.052686826906619265,0.025862323260694084,0.0,0.0,0.0,3.800214483917063e-18,0.020428507360813628,0.0,0.18320356691763817,0.011172433390417165,0.0001173404113095107,0.0,0.0,0.1122853935245303,2.7604210832270813e-6,0.0,0.022888592583294266,0.00019301482069599546,0.20520865866716034,0.0,2.2536737471079813e-6,0.0,1.1057730510860184e-14,0.3403178637504588,0.0,0.0,0.0,0.004507244072679313,0.0,0.0,0.13325522012053714,0.0,0.0005484065314804804,0.00019195504566735748,0.0,0.00029514109439283384,0.00022246460366721993,0.002204724900389894,2.9006931142182144e-8,0.0,0.0,0.0,0.24359013971552315,0.0,2.611447675834176e-19,0.0,0.0,0.0,4.558376244922851e-5,1.50318708884458e-9,7.090852257132767e-6,7.645345012472322e-5,0.04681733610290964,0.0,1.7838637706852615e-23,0.0539483350527131,0.26922119547123724,3.0359112072057855e-6,0.14345581147808226,2.2659116784386548e-13,0.3688796373384353,0.0,0.0007387264446959003,0.0017820201392902625,0.0,0.0005887733254488454,0.06992212599026727,0.00011091422189515584,0.0,0.041161980792011374,3.455075382818911e-8,0.0,0.0,8.837293143241195e-5,0.1599060716894864,0.0,0.0,0.1013691584669795,0.0,4.8297974527674475e-27,3.6240988419518845e-8,0.0,5.5195741400584476e-5,0.0,0.0,0.03566589033171901,0.00014498064770471463,0.0,2.073966973375401e-6,0.0,0.05626370174817082,0.0,0.0,1.2362417173400192e-8,0.0,0.2853272380822746,9.852496837883561e-9,0.007943030322853177,2.0804995229184398e-19,1.2945751085604444e-9,9.581572014866047e-6,0.0,0.08322670386784425,0.28032571722948574,0.35408397034957956,0.013141069099872837,0.0025037486422029554,6.406046301266092e-10,0.03773454981673424,1.4933351203571453e-8,3.982521417990337e-16,0.0,0.0,0.0001799379041284855,0.03441699242895159,1.7596561161483213e-13,1.5060760844664515e-15,0.00483022040326868,0.004027564203147799,0.0,0.2771034794210885,0.0001960049365362856,7.350914243594705e-17,2.7351678791784265e-7,2.426606268974044e-8,0.0,8.976572837608454e-6,3.294858184165722e-7,0.03141389624314536,0.0003290187154822564,0.004866554087201339,0.08793666495385052,1.3937637428196324e-7,0.0,0.0,5.699865977155713e-9,1.1170489764546621e-6,0.002512080226345513,1.6248547048941715e-6,0.002050252232228679,0.0,0.0014492585417187004,4.361309399694646e-6,0.4442294198247493,1.6483349068652087e-16,0.0,1.1375502819841183e-9,0.0,0.020100116513627638,0.18531900249149713,0.9429927282392336,8.777672671588519e-8,7.776546078035878e-7,0.006972068822470474,0.0012754833163105019,0.0,0.17142589839357092,0.0,0.0,0.0,0.0,0.3867394418010811,0.0005270721372496784,0.0,3.7776397358681274e-8,4.6251079277558116e-7,0.17167033752901822,0.0,0.0,0.0,3.436464960749028e-5,0.0,1.6352529662622064e-11,1.2844308932385114e-6,0.0,5.947072626920627e-14,0.19124489008798085,0.2252240612261019,0.10283759860882011,0.9196280330225868,0.07234022501293072,0.008009858325315743,2.939613793930465e-8,0.0,0.0,0.0,0.0,0.007959832413432675,0.18104467531268303,0.0,0.01812502310438653,0.02353378416363973,0.0,1.966709398516628e-24,0.00021136379310234937,1.0223180875836349e-7,0.0,0.0015426345458164647,0.0,1.7405181080867175e-6,0.6498168118585215,5.372140830785094e-6,0.0,1.0342219005594228e-13,0.000534636452736708,0.0,0.00016268912147030694,0.013588641446438733,1.868556124540662e-25,0.007971034535113178,5.109192174141998e-7,1.460629870385481e-5,0.0,0.0,0.0,0.0,0.0,0.08485552189026149,1.6980463682351385e-5,0.1588724829883608,2.0592508026811003e-5,2.8275210172070744e-8,0.0,3.109755848571163e-6,0.0,1.447146941017241e-5,0.006733187656503284,0.000591703351772786,1.613914050978269e-20,0.07210345294619394,0.15635187792473665,0.0,0.0,0.1641208494381587,0.0,0.004485587858550254,0.2082110959766165,2.8150212785024778e-6,3.337151377134685e-5,2.1614868133762e-5,4.7704530131158074e-8,2.816449022478433e-18,2.346673616214756e-7,0.0,0.0002516071757612129,0.0,1.9349064193367226e-7,0.0,0.004085229808269779,6.303568292710462e-7,0.0,0.1732628897599014,1.3243753898104942e-14,0.0,0.3630766694895518,0.00010249571729026402,0.008852448391244083,0.22340573452349616,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.010067559682543433,0.0,0.17110161324221188,2.3897819009500265e-12,0.03460419435227868,0.0,0.12278919423945771,3.490968616292718e-24,1.718893327628001e-5,0.0,0.0,0.03286053359570358,4.635274243561779e-7,0.0,0.06994291452444067,0.0,0.0003801769394017097,1.694404894641653e-16,0.0,0.0,1.403951707814131e-6,9.365983672300807e-9,0.0,0.00017048166599058814,0.04513649590942606,0.0009489097510158436,9.602393748866948e-8,1.0898763032586127e-9,0.008026951152249027,0.01821077423556159,0.003156574860487961,0.0,7.92146505243258e-6,0.03377273628696868,1.057873399288237e-14,0.1627634292304572,0.0012313645173405306,4.2599473522484854e-8,0.0,0.03588006640907789,0.0,0.0006320726079889291,0.0,1.1943142152181541e-8,0.2825648384688044,0.0,0.4011656552839198,2.358446409614801e-10,0.10834505484027837,0.0,0.301369191879325,0.1260966901717857,0.09381789810162558,6.2027903197883605e-25,0.0,0.0,0.00025630777583838583,0.0,9.572828005553712e-10,0.002068203195668971,0.08940533412838021,4.5703427849853465e-7,0.0,3.0735187345556154e-23,0.3834417449929143,0.0,0.0,0.0,0.22270024558228674,0.0,0.0015241949988460796,0.3614599030621195,0.0,1.291359672762904e-23,0.0,0.0013626632887746616,0.025176651639947607,0.0,0.09166598874523943,0.0,0.21453201869090305,0.10237291394839873,0.0,0.15784310315065483,0.0,5.127171262887411e-6,0.0015228850469488104,0.0,0.0002860289814455312,0.0,0.2883994817132505,0.0,8.274552379891808e-5,0.0,3.916330272847054e-8,0.0,0.01501775779147728,0.003436405798169049,0.024265453610410687,7.810001273547628e-12,0.3794967031827195,0.08932347879084357,0.11017088442026388,7.6315632218765e-10,0.8620615452177278,8.553950901704556e-6,0.00022603153315267643,0.0,0.00025851569597401026,0.0,0.0,0.0,0.14276109899606748,0.0033991702868958447,0.06781166081281616,7.94796732377286e-11,0.600211934095204,0.0006188640495103839,0.1306794666875335,0.0032653735964474763,0.17805444220240652,0.24176863053722308,7.455058592254373e-6,0.22390268991309506,0.18380048868882398,0.0,0.0,0.0,0.0,0.0,0.003971039734576825,0.0,0.0,0.018667912010639616,0.0576890729553415,4.738217801342495e-9,0.0,0.0,0.0,0.21925649846731854,2.0573209745028332e-8,0.00024468929363933277,0.07926539341120067,0.0,0.22109943682830324,0.010247843820231585,2.81899862035427e-17,0.019566444043372794,0.0,0.618384509378437,0.0005857110815702575,0.0,0.07178173990634011,0.17806854242964426,0.0,0.0,1.5283716119836464e-16,7.210170219113703e-7,3.124123726018429e-10,0.0015261127851697285,0.409112661924327,2.4079376549773273e-7,0.14549511356065248,0.0,9.290010078538726e-18,0.11218654123059882,1.824950576515838e-18,0.035602198086628296,0.0,1.645510911591987e-14,0.006224245708687828,0.0,0.0,1.326350317175005e-18,2.9917812965160744e-5,0.0,1.3660059072586133e-15,0.38939858182282683,0.0,1.8036959437528384e-6,0.0,0.0,3.93975759735703e-6,7.692974731397346e-5,0.0004509458098348141,0.0,0.0,2.7552516080256324e-7,0.0,0.0,2.161828042738356e-7,0.00910788071872066,0.3850053427367557,0.0,0.837615530703643,1.647404426578797e-11,3.381809240505477e-31,0.0,0.0006242262756420426,0.08610732124373338,0.0,0.0,0.8118466197886445,0.0,0.30927475233096885,0.00013756787561982893,0.0,0.0006417319382243764,0.11115765188447145,0.0,3.5798530710908e-6,0.3441326575581561,0.01705406175707871,0.2513362260328812,0.35158725938146607,1.1879253383276249e-8,0.0,0.020184528934912887,0.3762924319518211,0.0,4.05210187265999e-6,0.0,5.525522938442544e-14,0.0003610746388077583,0.013360065374883151,1.336081930399155e-8,0.04810062927938642,0.24519759769051921,0.051241511493291377,2.0906422864303153e-5,0.5460103471939253,0.0,6.587312483740612e-15,2.456104623010591e-10,0.0,0.24004441160513443,0.00819185551814922,1.2021111060045778e-15,0.0,0.0,1.8580599240133726e-11,0.0,0.0,0.0,3.0017644018942878e-6,0.0,1.0602850443874552e-15,0.0,0.0,0.1766681770925878,0.2475789302520572,0.0,0.06892701402866244,6.095225134626998e-8,0.3868669195831663,0.06596713812632594,0.0006109037849215654,0.0,0.012047547863524384,0.008587770902322085,1.0672174882402197e-7,1.3837610174479985e-21,0.12831913784150337,0.0,1.2129237478026549e-12,0.0,0.0,0.0,0.1288020393655898,0.004376651497027197,0.0,0.05360204653558917,0.0004671465715949364,0.0,3.7663980317218224e-16,0.002075389458233373,0.29280060711002603,2.829587523809335e-8,0.0,0.001363432754916763,0.0059879417141903415,0.05295156493239854,0.0,0.0,0.0,2.8313400732469465e-9,0.28980053810055467,0.0,0.07596767287192091,0.09788219867513344,0.0,5.1518114446542735e-12,0.0,2.2098528545420688e-8,0.07573537888716679,0.0,0.0,2.1691127172909654e-5,0.16890048314408745,0.059250870378025115,0.0045508246363025135,1.6776130324276666e-5,0.0007438425814294868,0.00012224834813202837,0.29480914536085273,0.0,1.7403963233431082e-12,0.11363229157281181,1.3784470078434502e-7,3.513438531976028e-10,0.01263282292600707,0.0,0.0,0.05114744526620522,8.087736767604151e-6,0.001699497298423784,1.4127470044212748e-13,0.28987952721075294,0.2519343332946316,0.0,0.0,0.0,0.00012477487198419098,0.0,2.3450155714151312e-9,0.09835046020429564,0.0,0.017070939313890927,2.367312019416319e-5,1.9669566481709436e-13,8.929682407528859e-13,0.0,0.21506517824949284,4.0957041683473414e-6,0.06095920956209233,4.678071203092855e-10,1.5463169915014846e-5,0.0,0.1951191697338885,0.04900934395137722,0.0,0.0,0.0,6.691436895000429e-5,2.3890287599249347e-12,0.0,0.0,0.22300047978750606,0.045803717159451286,0.0,5.0846221628626e-12,0.044502930712548835,0.003359439837123627,0.0,0.0,0.0,0.0,0.2873839048640506,0.0006204812881821022,6.930360302366636e-6,0.2623454653392235,0.0,0.6531747582146469,7.945754747613421e-8,0.000836846879568936,0.0008288688364091211,2.3565804706033784e-19,0.005575476361441542,3.2270673256004073e-24,0.5493133725132273,3.665628071416565e-15,2.402047120552915e-19,0.0,0.0,0.0,0.0023689979816900616,1.709422975873481e-6,0.0,0.03989899802786492,6.946053665021621e-7,0.0,3.67752995083279e-7,0.0,0.0036292138071184195,0.0005592694136064059,0.0,0.0,6.286758811745637e-10,1.624185871526294e-5,1.345482656737112e-10,0.0,0.21127794704516834,0.011365990936244708,0.0,0.0,2.484597548282443e-27,0.008624420147167005,0.5256588942840185,0.0,1.7049950818755564e-12,0.0002224326741181176,0.14099493782395986,0.0,0.04050660462481732,0.0,0.07241425433544352,8.8621001671084e-6,0.06148757638747854,0.10803463822146102,0.4424756343880314,9.952700960094723e-8,0.0002952281995557881,3.600853541031944e-5,0.0,7.046837269419643e-11,0.0005012504045678358,0.0,0.30168755200194336,0.2522178181565061,0.2019603044029918,0.08304351346734477,0.16362023932415184,0.0,0.0,5.496243407488074e-17,3.4188020534466127e-9,1.7539935319631838e-6,0.04990581441786399,0.36059587011706307,0.0,0.0,2.7479065620018076e-10,0.08462500132581185,0.9954436657087264,0.000607850370138974,3.5100338451472404e-9,2.1755290423022268e-11,0.0,0.0,1.4811576093091421e-10,5.320277512317491e-5,0.26853928327690224,0.0,1.4396615996783324e-5,0.0,4.206928578802697e-8,0.01735059539591297,0.24281696679506592,0.0,0.25029035711155695,0.0,5.808582879926452e-14,0.0,0.04241257490983215,0.27788880756342565,1.4374193597155217e-5,0.04641720533107449,0.003116620308144132,0.0,0.0,0.0004224431551363319,0.0,0.0,0.05635549564632966,0.17623437056009625,0.0009721135419723425,2.683374564222777e-14,0.8322435779110345,1.2057943061169328e-16,0.008699248857240365,2.913804635923346e-7,0.032967700793173696,2.199083423004118e-7,9.432407713378034e-10,6.016946318803153e-24,0.0,1.2609701535406654e-7,5.696774127980221e-15,5.729378573761841e-8,1.0594944347577191e-5,0.0,0.2034223567735424,3.577692249499694e-8,4.653980325319674e-16,5.560724999876882e-5,0.2599378747097083,5.647230897647681e-16,0.0,6.3684432918658505e-18,0.0,0.0,0.0,7.4130576411182e-8,1.2652938792267574e-9,0.0,0.21020156539981952,0.3847271547125472,0.0,0.0,4.0213344669279464e-17,0.01620837481056371,7.106888446466463e-13,2.9525141178315677e-14,0.0,0.001173763300076504,0.0,0.016981294168374544,0.0,0.012604178503509051,0.0,0.0032605795491912662,0.0,0.025016095157385614,0.0010081555403820357,0.02031844567532798,0.0,4.281586846532936e-6,0.0,0.0,9.094520147169694e-10,0.05272451698787505,0.0,0.04547172013628435,0.004260735197882366,5.519708220594227e-6,0.9448270753080231,0.21995585871682818,0.0,0.09389522912605956,0.004898786310893528,0.15575821253331137,0.0,2.0893932427898064e-5,0.0,2.7782292077885907e-6,1.8500094678476964e-7,0.0,0.0032861327043147027,0.21958749118475474,0.0,0.0009025019909393611,0.0,0.12902420997658542,0.24369979309318468,1.3609882249599359e-7,0.0,1.3274963401280132e-16,0.0,2.511036056031067e-9,0.0,1.9621874375918882e-20,0.22305874608066265,0.0,0.0,0.023230238049986873,0.7211566005054904,3.9383556817774163e-16,3.1528906098910726e-5,0.0,2.8357870609505313e-13,0.0,0.6496690165367018,0.21653245746874542,0.2026083029202618,0.0,0.0,0.08515326020094395,0.716235257760997,3.0996988097220515e-6,0.12478363014027644,9.79147886602315e-28,2.6554085264073196e-9,0.0,1.8043495254548532e-10,0.6637240024195663,2.935403111651971e-13,0.0,0.0,0.0,0.0,0.024239647664541397,7.6794719018137e-7,0.11715970144574722,0.21334484785425786,5.535654089300856e-35,1.636269493367643e-18,2.4972495612705437e-6,0.3653625942171736,0.0,0.00034826719084344156,0.20610373268625107,5.905340663297269e-30,0.07082009151744731,0.0,0.19160328492009918,0.12580666034741395,0.012741999157121464,0.049949616987280454,0.0,2.0422521066109924e-6,0.0,7.132206683591054e-5,0.08848177204389845,4.607723626637437e-5,0.0,2.7921305628881226e-9,0.15207226163799917,0.00020217288765681185,0.1172828737045538,0.13819955845072934,0.0,4.840478681136228e-10,0.0,1.0450198975990828e-19,0.010215908745826834,0.01704845625113974,6.771303236804468e-10,8.564511758132646e-16,0.0037712404988232,0.18995228545156306,0.01766752583682405,1.2274659648812836e-11,0.06799676868203937,0.0,0.0,0.0,0.022641672452600264,4.314029692347552e-8,1.2335088029738404e-5,0.002571714481193077,0.0,0.35780297890074286,6.556840136370553e-6,7.193032548717534e-7,0.12859542046319025,0.3637813875278876,0.0005243561351086279,0.0,0.05549469694232255,1.2048408822439067e-8,3.7089630345963226e-6],"x":[5.0,4.0,7.0,13.0,7.0,10.0,13.0,5.0,8.0,2.0,1.0,5.0,11.0,11.0,11.0,10.0,12.0,13.0,2.0,4.0,14.0,1.0,2.0,6.0,14.0,2.0,5.0,8.0,0.0,1.0,12.0,5.0,10.0,1.0,6.0,14.0,12.0,7.0,6.0,13.0,1.0,8.0,3.0,6.0,10.0,3.0,2.0,11.0,2.0,2.0,4.0,2.0,9.0,13.0,11.0,10.0,1.0,13.0,9.0,8.0,6.0,10.0,15.0,2.0,8.0,11.0,14.0,13.0,14.0,14.0,9.0,1.0,6.0,2.0,8.0,3.0,1.0,5.0,2.0,0.0,3.0,3.0,10.0,1.0,4.0,1.0,2.0,12.0,14.0,11.0,2.0,7.0,6.0,7.0,2.0,12.0,15.0,5.0,6.0,3.0,12.0,14.0,6.0,0.0,5.0,5.0,2.0,7.0,2.0,15.0,9.0,13.0,7.0,12.0,1.0,14.0,2.0,13.0,10.0,6.0,8.0,13.0,9.0,13.0,10.0,14.0,2.0,6.0,15.0,11.0,7.0,5.0,4.0,11.0,10.0,6.0,14.0,4.0,5.0,15.0,7.0,11.0,9.0,5.0,2.0,2.0,8.0,7.0,1.0,7.0,4.0,1.0,11.0,2.0,7.0,14.0,7.0,5.0,7.0,1.0,12.0,9.0,9.0,6.0,4.0,5.0,11.0,14.0,14.0,10.0,5.0,13.0,7.0,1.0,4.0,9.0,2.0,15.0,11.0,9.0,12.0,13.0,5.0,14.0,11.0,13.0,13.0,3.0,8.0,2.0,4.0,4.0,4.0,2.0,7.0,14.0,7.0,10.0,1.0,5.0,0.0,3.0,11.0,5.0,1.0,14.0,14.0,7.0,1.0,1.0,0.0,8.0,8.0,5.0,7.0,2.0,4.0,11.0,2.0,3.0,5.0,6.0,2.0,10.0,3.0,12.0,0.0,11.0,14.0,2.0,4.0,6.0,4.0,9.0,5.0,2.0,1.0,4.0,5.0,2.0,5.0,14.0,10.0,12.0,1.0,11.0,7.0,2.0,8.0,1.0,2.0,4.0,9.0,13.0,13.0,5.0,10.0,14.0,3.0,2.0,13.0,9.0,11.0,13.0,8.0,15.0,7.0,1.0,10.0,0.0,13.0,15.0,2.0,15.0,10.0,3.0,3.0,8.0,13.0,14.0,2.0,11.0,5.0,4.0,9.0,11.0,13.0,1.0,11.0,7.0,10.0,8.0,12.0,2.0,2.0,11.0,9.0,0.0,3.0,10.0,2.0,2.0,4.0,8.0,2.0,7.0,10.0,11.0,14.0,10.0,7.0,12.0,4.0,12.0,5.0,11.0,14.0,1.0,11.0,2.0,5.0,3.0,3.0,11.0,7.0,4.0,7.0,14.0,13.0,0.0,3.0,6.0,6.0,7.0,2.0,1.0,4.0,13.0,7.0,10.0,4.0,14.0,8.0,1.0,11.0,10.0,3.0,13.0,1.0,2.0,2.0,11.0,3.0,12.0,6.0,14.0,15.0,10.0,9.0,7.0,5.0,0.0,1.0,7.0,2.0,5.0,3.0,7.0,6.0,11.0,12.0,3.0,8.0,11.0,13.0,8.0,5.0,9.0,9.0,0.0,4.0,11.0,12.0,9.0,2.0,4.0,7.0,10.0,9.0,13.0,8.0,5.0,4.0,3.0,14.0,2.0,6.0,13.0,14.0,7.0,7.0,8.0,8.0,10.0,14.0,4.0,1.0,12.0,2.0,7.0,0.0,2.0,7.0,12.0,7.0,5.0,7.0,3.0,8.0,5.0,3.0,14.0,5.0,11.0,7.0,15.0,11.0,2.0,12.0,8.0,6.0,13.0,1.0,5.0,2.0,13.0,11.0,10.0,6.0,10.0,12.0,13.0,11.0,14.0,5.0,3.0,14.0,12.0,14.0,8.0,6.0,9.0,13.0,1.0,9.0,10.0,11.0,9.0,2.0,7.0,9.0,9.0,5.0,1.0,2.0,9.0,10.0,9.0,8.0,7.0,12.0,13.0,7.0,15.0,6.0,8.0,1.0,12.0,2.0,11.0,11.0,3.0,13.0,13.0,14.0,13.0,11.0,14.0,11.0,12.0,7.0,6.0,7.0,14.0,7.0,15.0,12.0,4.0,15.0,3.0,7.0,7.0,13.0,14.0,6.0,1.0,14.0,9.0,2.0,0.0,6.0,9.0,13.0,3.0,13.0,3.0,5.0,3.0,3.0,4.0,1.0,14.0,7.0,1.0,3.0,2.0,9.0,11.0,3.0,11.0,13.0,14.0,2.0,3.0,14.0,0.0,4.0,12.0,6.0,5.0,2.0,6.0,3.0,10.0,11.0,14.0,8.0,15.0,15.0,2.0,6.0,10.0,9.0,2.0,5.0,0.0,11.0,7.0,6.0,9.0,9.0,11.0,13.0,10.0,10.0,9.0,5.0,9.0,13.0,6.0,11.0,11.0,13.0,8.0,6.0,10.0,14.0,15.0,7.0,9.0,13.0,2.0,10.0,12.0,6.0,14.0,15.0,7.0,6.0,6.0,12.0,5.0,3.0,7.0,9.0,14.0,3.0,13.0,12.0,0.0,7.0,12.0,14.0,5.0,15.0,4.0,15.0,14.0,11.0,13.0,11.0,9.0,3.0,7.0,6.0,10.0,14.0,10.0,6.0,5.0,1.0,11.0,5.0,2.0,4.0,14.0,8.0,2.0,7.0,10.0,1.0,7.0,8.0,0.0,13.0,10.0,7.0,11.0,12.0,1.0,7.0,8.0,15.0,14.0,5.0,12.0,15.0,11.0,7.0,15.0,5.0,11.0,4.0,11.0,5.0,14.0,7.0,10.0,14.0,9.0,11.0,4.0,3.0,10.0,8.0,1.0,7.0,3.0,1.0,6.0,10.0,3.0,15.0,5.0,4.0,1.0,7.0,11.0,9.0,4.0,8.0,6.0,13.0,2.0,9.0,13.0,9.0,5.0,2.0,2.0,9.0,5.0,6.0,7.0,1.0,5.0,2.0,13.0,5.0,7.0,15.0,8.0,7.0,7.0,10.0,7.0,1.0,12.0,11.0,0.0,11.0,5.0,12.0,14.0,7.0,15.0,11.0,4.0,6.0,13.0,13.0,10.0,2.0,9.0,2.0,3.0,6.0,10.0,12.0,5.0,1.0,11.0,12.0,13.0,6.0,4.0,11.0,1.0,7.0,1.0,4.0,13.0,1.0,9.0,10.0,13.0,0.0,3.0,3.0,5.0,12.0,2.0,14.0,15.0,0.0,10.0,7.0,14.0,3.0,3.0,5.0,14.0,9.0,14.0,3.0,8.0,4.0,15.0,5.0,5.0,1.0,2.0,11.0,0.0,4.0,11.0,8.0,11.0,7.0,11.0,14.0,10.0,14.0,6.0,2.0,12.0,4.0,8.0,9.0,14.0,2.0,9.0,1.0,1.0,3.0,7.0,13.0,13.0,3.0,6.0,13.0,8.0,6.0,14.0,1.0,11.0,12.0,12.0,11.0,7.0,12.0,14.0,8.0,14.0,3.0,11.0,7.0,15.0,6.0,11.0,6.0,13.0,8.0,10.0,1.0,0.0,6.0,6.0,7.0,3.0,10.0,7.0,12.0,6.0,14.0,3.0,2.0,0.0,9.0,15.0,6.0,7.0,7.0,5.0,6.0,0.0,13.0,2.0,12.0,15.0,14.0,1.0,8.0,6.0,12.0,10.0,8.0,11.0,3.0,10.0,2.0,3.0,11.0,9.0,11.0,15.0,7.0,2.0,9.0,5.0,15.0,6.0,1.0,4.0,9.0,8.0,4.0,2.0,2.0,8.0,11.0,12.0,2.0,5.0,3.0,7.0,12.0,1.0,1.0,1.0,10.0,3.0,14.0,0.0,4.0,5.0,9.0,15.0,13.0,9.0,4.0,11.0,14.0,7.0,7.0,0.0,13.0,5.0,8.0,3.0,13.0,14.0,6.0,2.0,8.0,3.0,2.0,11.0,3.0,10.0,7.0,15.0,11.0,8.0,8.0,6.0,4.0,10.0,8.0,0.0,2.0,11.0,8.0,5.0,10.0,14.0,12.0,4.0,13.0,14.0,5.0,3.0,15.0,5.0,2.0,1.0,1.0,10.0,12.0,5.0,4.0,6.0,8.0,11.0,2.0,10.0,8.0,11.0,9.0,3.0,3.0,14.0,3.0,7.0,0.0,4.0,3.0,6.0,14.0,9.0,8.0,9.0,11.0,10.0,10.0,2.0,0.0,3.0,12.0,0.0,0.0,10.0,7.0,12.0,11.0,7.0,0.0,0.0,2.0,11.0,8.0,1.0,3.0,7.0,3.0,2.0,14.0,9.0,3.0,3.0],"p":[0.9337336451467102,0.7774022166683704,0.7844234583163839,0.9312100897256543,0.9236785587950767,0.8985984547134638,0.8116427176030032,0.8504492260296863,0.8213197065644433,0.8204025301844489,0.7981516057320823,0.9867041572121987,0.9299467721746577,0.9122832357666699,0.8790668564194363,0.8171991318286069,0.9585238558504569,0.8329754313554449,0.7661278611002886,0.8010670714507157,0.9464408560182687,0.8692406052530044,0.9611777557804041,0.7705603872929514,0.9281743682885426,0.9131445755845006,0.7567903789704253,0.9564067174806246,0.809809008868789,0.865309061861446,0.9895381702460624,0.880881354173294,0.7559385426309543,0.8537991378690863,0.9586070999095387,0.8137084162095081,0.757639375217958,0.9501541883529254,0.9993250209185858,0.799263875498364,0.878316494012901,0.8177524545475614,0.9986959343867433,0.7549807882030586,0.9084530254970962,0.9281782268071306,0.953138552841371,0.9105723349418715,0.9473313966015792,0.9510402600316878,0.8463240722569525,0.7743929047251923,0.8950139945158138,0.8015542952501549,0.7860513701200631,0.7511060394023479,0.8043899985285967,0.9296593615114054,0.9844182403968513,0.844952114104869,0.9030160972119663,0.9406135680292749,0.9064423450190129,0.9056967631266457,0.9985478641498259,0.8629541459730197,0.8893382861069385,0.762286255643559,0.9593030543847133,0.8706584252190936,0.9310661957506006,0.9338982309910617,0.8605522842521823,0.9044243209986608,0.7897938027918173,0.9328316833272301,0.8735816274059768,0.7871804692762181,0.8910210607080284,0.904701718590269,0.8511098235006274,0.901804531126139,0.9466213271941752,0.7634419004929125,0.7711942059463619,0.9538087869492988,0.7834451459263515,0.9977401194513349,0.922244411593886,0.9896393723468934,0.991568719680592,0.9183738592832322,0.775895262162122,0.8973917125137482,0.7976934201388215,0.9215501507328601,0.9158317090423467,0.7652472976330051,0.7789358692794426,0.9936161738358664,0.8329033494450822,0.8266904805133045,0.8821812196289074,0.7764459246605735,0.914247286433727,0.9305474232376763,0.9097645894445725,0.9272526699754593,0.7521974008942813,0.7669825710006495,0.7594824204186151,0.967828899593427,0.7975212069371233,0.8721475955830084,0.7802512628129381,0.8347199477674275,0.9007199034782591,0.8909660249811509,0.9326861509238861,0.9883199990303433,0.8271690161631295,0.9087833564388541,0.9014279948065278,0.9737299073886614,0.7766631577499064,0.7800118913222656,0.7798699169699034,0.887433367285717,0.8989218228792455,0.959705492291846,0.8145655754905906,0.8136400837437525,0.9459170277216653,0.900349236634465,0.8028002186386378,0.8256664009105019,0.9179865898619564,0.9861598786863357,0.9756745538014635,0.9295459006393925,0.8154767049769889,0.9833460211964411,0.8882189094237409,0.9074531134059054,0.7892987218076086,0.9153553185190381,0.8695855362842466,0.847373648512342,0.9536242870803227,0.9027344953181647,0.7795372162063043,0.8767162843809304,0.8854789259956033,0.9639622307123389,0.8298190024901654,0.7919006396380412,0.7855419808093607,0.8576769191749811,0.8464279005730808,0.8363634298173532,0.847618750063738,0.8518850197691242,0.7985486114671407,0.8486529049707013,0.9876422999203764,0.7650222819990427,0.7595827249173652,0.9744344281030068,0.7676769728496188,0.9965630202305249,0.989453927198287,0.8385543545651994,0.9118094662171772,0.9760792504371201,0.8857900290118295,0.754248556209533,0.9208857049312712,0.7982471180707069,0.9370648521914914,0.891056971477095,0.93204013517197,0.9360510892558842,0.9159098853313002,0.8066370527172513,0.8110445940386781,0.9085387743479061,0.9613758020202265,0.7816403342840434,0.7654859751710799,0.8760827688933338,0.8223078164691506,0.8831317482685934,0.9797730734577459,0.9134795913744966,0.9147976407144308,0.9002477566466884,0.9403753629185205,0.7957735755260882,0.7701074134954653,0.786594442043925,0.7763094271538544,0.8941906553185619,0.7963892274157035,0.9050903315070894,0.9681444464654667,0.9685675423972502,0.8985686318637593,0.8451980784175608,0.8862230437006834,0.9297043747677832,0.9859644038376766,0.8044252070249156,0.874407862733348,0.8254316847338341,0.8324869333317588,0.8542329410258402,0.9922064315978765,0.9607603641302545,0.8358887265135571,0.8462525440684789,0.8474166960867535,0.9219747085014313,0.7535684675424652,0.98913318479514,0.93309288422245,0.8759550002938852,0.8269214531318974,0.889406742114895,0.9215606576713771,0.7902076980834629,0.841057629513305,0.8994703732383779,0.9087342740779425,0.8137681173142726,0.9961601702318575,0.9454724431356172,0.989671865285733,0.816397806643022,0.952634217011845,0.9486178800505201,0.8599746819977095,0.9169303205168136,0.8811388422293107,0.803683306448632,0.9429927282392336,0.9662215566337791,0.8438048258493697,0.9646630076257756,0.9561782547088833,0.7737154660101826,0.7845531002879094,0.9226151328664631,0.7789105594719168,0.9938081804213208,0.8426711860549108,0.7884263289111859,0.9041706031300321,0.7525774290614697,0.8494612875501519,0.8416827989390303,0.7827798619125582,0.8911083337150851,0.7939978605134805,0.8779152262702208,0.8615543546308823,0.9359796457432643,0.9848139568758849,0.9236128233907392,0.8834502875597418,0.798668978535565,0.7735808489517045,0.8204252709729947,0.8450821724670168,0.9944298376952503,0.7690206212262679,0.8062688623639804,0.874586679905621,0.9337113924829104,0.9515223127884904,0.8060478042531491,0.810501707967903,0.7975874722641593,0.8675524745831864,0.9663918954054869,0.8386470487570987,0.8172471194873174,0.931132008858587,0.9781249834344405,0.978969001120866,0.9377618160868786,0.8840150240289132,0.7546343018758492,0.9887708636451049,0.9610421595833057,0.806112158361677,0.9569530655144216,0.8867757753457899,0.9639272457308734,0.9342093026267206,0.8095617047443593,0.777630660493271,0.8068600631159366,0.9903193174290204,0.7872434347262839,0.7607676463412629,0.7983501585776098,0.8044704514431746,0.9024470641830072,0.9889126026256918,0.9618874868082262,0.9968129240095471,0.836507136915429,0.8753083080405486,0.7823825721047354,0.8855808544266759,0.970874444869868,0.979849429687087,0.8408822703371088,0.8477096406456905,0.8050924251315608,0.773338210600631,0.9680508095064296,0.9906889855337884,0.7873681152712844,0.9769985204414378,0.8552660412637351,0.9719451222973596,0.84692597901873,0.7843761579797326,0.9330254685828243,0.7973259948117698,0.833556578338358,0.8893579740784769,0.8354784365706656,0.7791964604287396,0.9538825368040285,0.8633843994681284,0.9678564851876923,0.9687628283229079,0.9966683865532329,0.8009131221611558,0.7868874578913678,0.8097333243436313,0.8071935267787913,0.9630087603842035,0.7989939342415676,0.897163676582889,0.8301523024809495,0.7616518015516501,0.7541909784094282,0.8967456693162665,0.8363605657259495,0.8628356255558809,0.9231663293225439,0.778443096015526,0.946453008250365,0.9081770214888651,0.8297493788257244,0.7630201901240949,0.8731408576978676,0.8684348967090405,0.8288983867577882,0.8769878233497339,0.8238438288270444,0.87796914121838,0.8186658616495637,0.9933246853963706,0.9947024904592392,0.9665242391883008,0.9327525330241992,0.9148727158285973,0.7655111002743502,0.9663658825174606,0.879603590035709,0.8318904625000729,0.9684351247460155,0.9525456202878373,0.8715268066763915,0.8657637509464433,0.894182208088671,0.8419070407441531,0.9918166296105941,0.9302145806208304,0.7590259149372993,0.7601893861394935,0.8321177102243316,0.9239144260682584,0.9374618330707596,0.769770068880636,0.9806288305505995,0.9049663863297164,0.8008783223272442,0.8834246534793525,0.9239581912546082,0.896753709196451,0.7501470543392974,0.8680667926402239,0.8823437985179247,0.8594154759141228,0.8689904483147138,0.7631169094786879,0.7733930454543159,0.9418681668140856,0.9622601133912564,0.8900175135664101,0.8347745559860258,0.7872452873092322,0.9543209440831688,0.8895389445146742,0.752689951906927,0.8739033098282143,0.9665235362373918,0.9975415292821896,0.7824277231252408,0.9661697348948736,0.9011385455612824,0.9379614761667574,0.8526671880007952,0.7723948541321043,0.845359759511835,0.9354842973286781,0.9037011905979684,0.9907251486190098,0.9123145415021773,0.8519757408445829,0.9163374529339143,0.7593039221712835,0.91044444225964,0.9594393640873268,0.7812381726635396,0.794146564155219,0.797027689990943,0.9688544334350708,0.7826240489254622,0.896914192786382,0.9569774768965831,0.9030586851340839,0.7657983138162112,0.9203815075820718,0.7586131865377135,0.8240091657744186,0.7783542617063168,0.9348328578364147,0.7816771346124797,0.9051383776867896,0.9130480028805733,0.9948961698251706,0.991122510068928,0.9967903256517163,0.7910837654871676,0.9918634228291769,0.9018297708142224,0.9468746618299977,0.9087944233867199,0.910613366522891,0.7916618468166787,0.9931050458344042,0.8651114180881416,0.8836464919777041,0.8707367172706175,0.8459634413318979,0.9412176787742659,0.9572769367799956,0.8620615452177278,0.8494847939013932,0.8624666045334172,0.7984559806505197,0.8599985633537712,0.8184796443414271,0.8057030918732411,0.8168784342437985,0.8059124999813885,0.8005182240522986,0.7651792742647197,0.9471994016846192,0.9381841213409017,0.8914494231875715,0.8039338149983837,0.811826994684598,0.7838631541207842,0.7770285915820097,0.8434511653169621,0.7655853765166476,0.7686907071710463,0.794720923171541,0.9247823473712853,0.7864399201275933,0.8685873245379572,0.7953500094060705,0.9315495168865116,0.9985186142552093,0.8436929291019728,0.8512784887789888,0.81565533822173,0.968705685634053,0.9368037974455168,0.9932296932773488,0.9518452878332937,0.7948318035829065,0.7741712682522677,0.838882666214711,0.9422064615190473,0.9432830708407287,0.7811636767317873,0.9796519991984829,0.9098323719062549,0.7550316134664616,0.9971388438767134,0.7863742807203431,0.7742973344238674,0.7893901756678254,0.9557032501300731,0.7767117422538354,0.9830163023285086,0.7556060582265995,0.9323017834820986,0.8838985030421036,0.8283638292733435,0.8210647734254553,0.791176756423489,0.9146819870727663,0.904411863100728,0.8967039080867567,0.9497631830888957,0.8693232064477412,0.9523560713090315,0.9328756475933069,0.832293970892533,0.956883582191973,0.8606812981236132,0.947323940598361,0.7843477716167742,0.9338490922950717,0.9118305730929601,0.7774652829421907,0.9422851309277451,0.8526598502306695,0.821121716445234,0.8192441241838004,0.9666200862325943,0.9925346204993286,0.8066730032757938,0.7928770455823597,0.8587503452954156,0.9515781175925284,0.8488318749323909,0.9512436638394717,0.8601168236163589,0.9259072708139606,0.9548527060348202,0.7823328109873989,0.9044412326570972,0.8148077134086092,0.9152133798757769,0.9100507270821319,0.9700458186130578,0.84686291106525,0.8756042051605741,0.801798209930165,0.9699988236491301,0.8113729697068972,0.9812289711629181,0.8744766923413054,0.8408335219380894,0.8794379196734876,0.8888210361310986,0.8147134799926421,0.7792747990264453,0.7877003961045587,0.8518024387342719,0.9489867461720674,0.7990153515074234,0.8488279029786208,0.8775141760384715,0.9470168661509291,0.7647308492051692,0.8787205105528358,0.9289016106654616,0.7510593024562381,0.935378647833744,0.9306376855331882,0.9455501225100515,0.9330348152542415,0.8186326615957411,0.8800884469426311,0.9465617583214296,0.8331019175117353,0.7558327144706446,0.7762560032683505,0.904066018370673,0.8257808008481975,0.9885116017528048,0.9366249423682849,0.8057346433570541,0.7954812484203879,0.9912110374673884,0.9343683474138103,0.8482315660622817,0.841518558681449,0.7865401340959421,0.8548542211252541,0.9543939236297121,0.8686396344415543,0.75246704390318,0.981425848215495,0.9607606402266862,0.8983056613369382,0.9495485944399992,0.7830336537321145,0.8196277884123574,0.7618510334735588,0.9098163771436194,0.7989966561134051,0.8538529032061082,0.9419173510719896,0.8771853391096258,0.9387474556949231,0.8963052449580267,0.8653457379714113,0.9245863131500115,0.9498259577344724,0.8419816880352418,0.7617690291410979,0.8500321940819101,0.8575993081442714,0.7764526577615962,0.878577564449849,0.8216889287852623,0.7922321957888256,0.754516019068562,0.9724393894799686,0.771051566897637,0.8297504913731157,0.9208810629647599,0.9833574002755389,0.8168344329433417,0.9150867047018892,0.9513440373637194,0.9007523447451216,0.8035154859011157,0.8002302164984589,0.810735898416302,0.8143080879976978,0.9500824903610783,0.8678655521297163,0.8452036437052508,0.8997631334974461,0.7929662662515682,0.7548925499593642,0.928745228563294,0.975741207271239,0.804568457272856,0.8710743731393717,0.7908936214035748,0.8257469349795293,0.9277117827274215,0.9273142143560382,0.8023585973483637,0.973107513180686,0.8809644230750954,0.9486502258129252,0.7893985721173745,0.8506833345268991,0.8231419459839597,0.8718019222892672,0.9147982944999092,0.860613276564506,0.8783236915995978,0.7817836417276562,0.7683703005553937,0.8555389687966712,0.7928626867660973,0.9163752073192353,0.9235992335769823,0.7623828057622334,0.8670005774305789,0.7661469403935999,0.7794225781084148,0.8898589881693233,0.8338759631060597,0.7687854080563885,0.7861861326568311,0.7892040815426458,0.8870401646272728,0.7897080506001142,0.929809036461395,0.9145352983750548,0.935577782250026,0.925475664203448,0.884767247618028,0.8312898239855144,0.8465002483508205,0.9380464099765042,0.842713508782676,0.7985142773555767,0.8379845985623853,0.9617428884546322,0.7761213752866114,0.762601465134256,0.8033980022923447,0.8126595849528895,0.7900477151759833,0.8147384995382649,0.9446360082334815,0.7590560038811741,0.7510666470815268,0.8721555590156447,0.7983422712104917,0.9544458033561305,0.8233620920533948,0.7550986287265897,0.9202785979486434,0.7945409373186201,0.8304405245382234,0.7895098958669567,0.8371040802532215,0.8427514339544177,0.8309620205092527,0.8645947103851548,0.8237943945631221,0.8105943050308552,0.9583032021091783,0.7706398701314147,0.8103779206094321,0.8114307802622933,0.9550356067021791,0.8392228308159887,0.9993106012324757,0.9513018638324923,0.9892403723981802,0.9521534855840149,0.7980005081689432,0.9374618782436815,0.9103152336367324,0.9674804865192451,0.7868584264649972,0.9024362014887795,0.7645902692886264,0.8838732912070077,0.7739672822941945,0.8124760736351313,0.8292810769479951,0.8279270436292527,0.79555273023982,0.7775201103512164,0.8434773310286603,0.9991433391238258,0.7694196873400142,0.9403984385926314,0.8777929248916561,0.8552946699115441,0.8163738783872221,0.9371307696819001,0.8806217046470071,0.9602121640574391,0.9649422950311077,0.9122220672153312,0.8075037536129324,0.9221110586678398,0.8361476679464365,0.8905024812364557,0.8235526375692159,0.8436379478174008,0.8966507558095417,0.8105555393663697,0.9224070721939037,0.8501850478686989,0.7970119619541697,0.8495283414527981,0.9251963054609146,0.8581975064438829,0.8181599403655956,0.9252603631904346,0.7679937736741804,0.8366783282758825,0.9669073197374476,0.7942986369612312,0.7822386947455772,0.7957053683152313,0.7868821781268611,0.8787098641225093,0.7923168588267181,0.8504049499761022,0.9803394973850372,0.8830046810822889,0.9527382609780632,0.8630162424398728,0.9256869390863385,0.8786006079846271,0.77867423473481,0.8490935399620089,0.801152961954213,0.9954436657087264,0.945632661033967,0.8575570043339673,0.9458360200837019,0.7727083184380543,0.7769322718878076,0.819170608934068,0.855733103303227,0.8293580956518554,0.9336229962333665,0.9472400095725502,0.995559383307206,0.9336983895447669,0.8607260267941779,0.7740525000421004,0.9920888742879783,0.7714773484822172,0.7732666617930453,0.9948555930793659,0.8103041329537225,0.7854733286780244,0.8970475890309948,0.8922491918109816,0.8970449967404108,0.9903752037690078,0.7925683518929327,0.9777941271810848,0.9746910130590571,0.9851940827315904,0.7594592032412102,0.9933974863074249,0.8584874015488698,0.7618841321421477,0.9689489922327799,0.9698585723176731,0.9651821123560225,0.8391849083049467,0.8440013368572129,0.825848764264216,0.9769264059849503,0.993838398273917,0.9948673364688383,0.8579474965333227,0.9027352074299371,0.9434158397638199,0.8112831182255651,0.9963213052916293,0.9242631886635246,0.7783236708264604,0.9294126637167319,0.9717383616828931,0.8130628829080971,0.8337627923587501,0.8578064972892343,0.8260877376032127,0.9921163512816744,0.7810550848118906,0.7509508460056235,0.9924857721802192,0.9527589673900649,0.954031181803692,0.7823629748152559,0.8560500126897157,0.914628665932133,0.7552650252143249,0.7514694814292083,0.947820475330654,0.7886663807546181,0.8547694558343331,0.9184757938348033,0.9463543665349272,0.9094566881751769,0.7685503524060558,0.9877429362662993,0.9984823554595273,0.8826017393929928,0.9890014733077751,0.7635825458945921,0.803262196373796,0.822855750519763,0.8768577460489528,0.7892717623626156,0.8055931440156707,0.8905186024825911,0.9104903010372645,0.9869189648557535,0.8556347765874412,0.8166840232104791,0.7770820287314514,0.77293881193586,0.8600101554125912,0.9041973131940637,0.9812600324597396,0.875528165393619,0.823232861416207,0.8025147707991946,0.8137224358826187,0.914874551802523,0.8486901159851103,0.9715963849765542,0.946780452025533,0.7586535600726667,0.8445019318853846,0.9476866435700853,0.9188688009844823,0.7894414073985132,0.9230530869717026,0.8085520182506205,0.9439012457023448,0.8301411227191843,0.8089523130615142,0.9010882149869192,0.8837688553741497,0.9827855721616505,0.7690300090649538,0.9510551841524819,0.9542397073201054,0.9615546851608268,0.7635036774037112,0.8958314895884677,0.9368464631665656,0.8527187946160288,0.9599612395725816,0.9594704577273494,0.96116206777931,0.9280339065720771,0.9188446736752095,0.8224550078641452,0.940246523809786,0.852968017205551,0.785891281582102,0.9447037971089624,0.7609950861318466,0.8660744026611717,0.9199493650669405,0.9716799623018313,0.7709384422471073,0.9794917776137468,0.7807701982364791,0.9402462543606909,0.9624309104648958,0.9212924342074381,0.9831149393768635,0.8318704452416871,0.7987662291468505,0.9384112998084136,0.8460168281953395,0.9026454982549488,0.9463617853094055,0.8655943567967737,0.8761412493568368,0.9981677922085432,0.9431144234249136,0.7779179031110837,0.7594584800915423,0.7545196507169718,0.9418967787203145,0.7513836208698192,0.9934995108590494,0.7600753020703432,0.8493588723274592,0.8590762084209481,0.8243415731661877,0.9592802063717979,0.775916827717454,0.8620069313681711,0.9410875961793723,0.9150954915707199,0.862565691391578,0.8409598703802179,0.9048875852798259,0.7535415709621771,0.7550962648895118,0.7679781950560765,0.8385680335597213,0.8425590266163219,0.8037335437726674,0.8709767637073909,0.958394808755001,0.9877527009323852,0.9989571752612032,0.8364165245511166,0.7565449452250749,0.7616962737107804,0.9010277354478224,0.8886879792856553,0.7518783724211463,0.8670807544528482,0.7523525509298278,0.7871578383469108,0.7716174193983298,0.9411746953526943,0.8629616261503676,0.8879477202352271,0.8165624197208323,0.756559527856155,0.8214462252905674,0.9144676155561908,0.9272528301939137,0.934903853711398,0.9879171158085486,0.9817080962736566,0.8539627111752457,0.7813979730162217,0.8974877801732917,0.785504472981718,0.9256961541178879,0.8278516385378132],"n":[2.0,11.0,18.0,1.0,3.0,10.0,4.0,3.0,20.0,9.0,15.0,2.0,2.0,14.0,16.0,10.0,16.0,6.0,2.0,14.0,16.0,3.0,11.0,6.0,11.0,5.0,13.0,14.0,14.0,8.0,9.0,4.0,1.0,17.0,16.0,8.0,2.0,4.0,19.0,7.0,2.0,11.0,2.0,16.0,16.0,17.0,7.0,14.0,15.0,16.0,13.0,17.0,3.0,2.0,0.0,15.0,6.0,13.0,18.0,17.0,5.0,16.0,0.0,11.0,17.0,3.0,5.0,15.0,1.0,3.0,8.0,19.0,18.0,8.0,3.0,17.0,3.0,15.0,3.0,8.0,16.0,17.0,7.0,12.0,11.0,8.0,10.0,15.0,0.0,10.0,6.0,16.0,0.0,8.0,5.0,16.0,11.0,4.0,4.0,12.0,19.0,3.0,8.0,3.0,11.0,0.0,0.0,9.0,14.0,2.0,17.0,18.0,7.0,11.0,11.0,10.0,18.0,14.0,3.0,1.0,6.0,19.0,7.0,12.0,15.0,2.0,9.0,13.0,5.0,16.0,17.0,12.0,12.0,8.0,6.0,2.0,16.0,1.0,19.0,11.0,0.0,4.0,18.0,17.0,12.0,7.0,12.0,1.0,19.0,10.0,6.0,8.0,14.0,12.0,8.0,2.0,17.0,11.0,5.0,6.0,17.0,19.0,7.0,10.0,9.0,3.0,5.0,19.0,16.0,4.0,1.0,13.0,4.0,18.0,15.0,7.0,7.0,11.0,7.0,13.0,19.0,11.0,13.0,6.0,17.0,5.0,5.0,19.0,7.0,3.0,19.0,8.0,17.0,12.0,15.0,0.0,9.0,12.0,2.0,11.0,4.0,15.0,18.0,16.0,12.0,3.0,11.0,16.0,3.0,13.0,8.0,16.0,14.0,4.0,7.0,8.0,13.0,19.0,14.0,1.0,15.0,15.0,6.0,13.0,6.0,16.0,9.0,1.0,11.0,17.0,15.0,11.0,12.0,18.0,3.0,5.0,4.0,4.0,20.0,1.0,20.0,9.0,15.0,13.0,1.0,19.0,20.0,4.0,12.0,0.0,4.0,0.0,5.0,6.0,2.0,6.0,17.0,8.0,15.0,12.0,18.0,1.0,2.0,5.0,18.0,5.0,15.0,7.0,8.0,19.0,15.0,17.0,4.0,15.0,10.0,8.0,14.0,6.0,6.0,6.0,1.0,20.0,7.0,3.0,15.0,18.0,8.0,16.0,15.0,16.0,3.0,19.0,9.0,7.0,2.0,18.0,8.0,9.0,7.0,9.0,10.0,6.0,18.0,16.0,15.0,20.0,7.0,9.0,13.0,4.0,1.0,17.0,12.0,17.0,13.0,19.0,9.0,9.0,5.0,11.0,12.0,6.0,14.0,11.0,8.0,3.0,4.0,18.0,1.0,2.0,5.0,18.0,14.0,18.0,16.0,15.0,15.0,5.0,11.0,5.0,18.0,7.0,16.0,11.0,7.0,14.0,20.0,12.0,2.0,11.0,5.0,14.0,1.0,1.0,5.0,6.0,1.0,4.0,3.0,12.0,3.0,1.0,15.0,12.0,1.0,8.0,15.0,10.0,4.0,6.0,16.0,17.0,5.0,15.0,10.0,12.0,20.0,7.0,2.0,6.0,18.0,10.0,19.0,16.0,9.0,17.0,19.0,14.0,17.0,16.0,4.0,17.0,7.0,18.0,17.0,9.0,19.0,5.0,20.0,2.0,18.0,2.0,18.0,11.0,11.0,5.0,17.0,14.0,1.0,9.0,1.0,3.0,18.0,3.0,1.0,11.0,2.0,17.0,18.0,8.0,10.0,9.0,18.0,12.0,5.0,9.0,4.0,3.0,6.0,18.0,7.0,10.0,17.0,3.0,6.0,16.0,1.0,16.0,5.0,14.0,17.0,8.0,13.0,2.0,13.0,7.0,13.0,15.0,11.0,9.0,5.0,17.0,9.0,9.0,2.0,18.0,13.0,14.0,16.0,7.0,13.0,11.0,14.0,1.0,10.0,18.0,6.0,18.0,4.0,3.0,5.0,18.0,15.0,16.0,17.0,8.0,5.0,17.0,7.0,12.0,13.0,12.0,16.0,15.0,11.0,11.0,3.0,2.0,2.0,17.0,2.0,2.0,12.0,14.0,15.0,1.0,7.0,2.0,19.0,19.0,16.0,9.0,5.0,18.0,8.0,18.0,14.0,8.0,2.0,5.0,3.0,11.0,18.0,2.0,3.0,19.0,15.0,19.0,9.0,5.0,8.0,17.0,3.0,15.0,5.0,17.0,12.0,9.0,15.0,18.0,3.0,12.0,19.0,9.0,12.0,12.0,5.0,5.0,19.0,1.0,1.0,19.0,12.0,19.0,7.0,2.0,16.0,1.0,9.0,8.0,13.0,11.0,5.0,2.0,19.0,20.0,0.0,14.0,10.0,4.0,6.0,11.0,2.0,11.0,19.0,6.0,13.0,14.0,6.0,17.0,12.0,19.0,14.0,8.0,15.0,7.0,20.0,16.0,2.0,17.0,3.0,14.0,16.0,20.0,19.0,17.0,18.0,13.0,19.0,6.0,3.0,14.0,13.0,5.0,12.0,16.0,18.0,5.0,4.0,16.0,6.0,2.0,12.0,20.0,8.0,17.0,8.0,13.0,12.0,16.0,4.0,12.0,17.0,8.0,8.0,18.0,4.0,15.0,11.0,14.0,18.0,15.0,3.0,19.0,2.0,8.0,3.0,4.0,15.0,5.0,2.0,18.0,7.0,14.0,16.0,12.0,18.0,8.0,19.0,5.0,12.0,6.0,7.0,11.0,19.0,14.0,11.0,17.0,12.0,12.0,14.0,10.0,16.0,11.0,1.0,2.0,14.0,14.0,16.0,15.0,18.0,12.0,10.0,12.0,1.0,13.0,10.0,13.0,17.0,13.0,6.0,0.0,19.0,12.0,12.0,17.0,8.0,14.0,0.0,2.0,4.0,17.0,4.0,13.0,14.0,6.0,13.0,11.0,15.0,17.0,4.0,7.0,13.0,11.0,16.0,15.0,1.0,15.0,10.0,1.0,11.0,2.0,18.0,20.0,7.0,4.0,2.0,19.0,1.0,15.0,19.0,9.0,1.0,13.0,6.0,2.0,12.0,11.0,16.0,15.0,11.0,10.0,16.0,19.0,8.0,19.0,12.0,19.0,12.0,14.0,16.0,7.0,10.0,3.0,9.0,17.0,10.0,4.0,18.0,0.0,17.0,5.0,5.0,20.0,2.0,5.0,3.0,14.0,13.0,1.0,15.0,6.0,10.0,4.0,19.0,13.0,7.0,10.0,16.0,10.0,7.0,9.0,14.0,2.0,6.0,16.0,7.0,16.0,5.0,14.0,6.0,10.0,9.0,16.0,11.0,6.0,10.0,14.0,7.0,17.0,14.0,9.0,10.0,18.0,13.0,20.0,7.0,9.0,7.0,3.0,16.0,14.0,1.0,4.0,16.0,19.0,11.0,4.0,20.0,15.0,15.0,7.0,12.0,5.0,8.0,17.0,15.0,2.0,14.0,4.0,20.0,11.0,14.0,16.0,10.0,15.0,9.0,9.0,3.0,15.0,4.0,7.0,9.0,13.0,7.0,9.0,6.0,20.0,13.0,14.0,16.0,13.0,18.0,18.0,3.0,12.0,15.0,10.0,12.0,4.0,9.0,17.0,20.0,15.0,8.0,18.0,3.0,11.0,6.0,14.0,2.0,7.0,18.0,2.0,15.0,11.0,7.0,9.0,18.0,18.0,19.0,18.0,0.0,15.0,6.0,17.0,3.0,5.0,1.0,13.0,11.0,11.0,5.0,9.0,4.0,18.0,1.0,0.0,15.0,13.0,10.0,12.0,6.0,13.0,3.0,9.0,6.0,3.0,5.0,2.0,0.0,7.0,9.0,9.0,16.0,2.0,14.0,18.0,5.0,19.0,1.0,11.0,17.0,18.0,1.0,9.0,9.0,14.0,2.0,19.0,17.0,3.0,2.0,5.0,8.0,16.0,6.0,6.0,17.0,3.0,7.0,16.0,15.0,0.0,3.0,9.0,4.0,16.0,8.0,16.0,18.0,2.0,18.0,5.0,20.0,7.0,1.0,2.0,5.0,19.0,12.0,5.0,18.0,19.0,18.0,11.0,2.0,5.0,18.0,8.0,19.0,11.0,2.0,14.0,4.0,13.0,14.0,6.0,17.0,0.0,10.0,14.0,9.0,2.0,14.0,7.0,10.0,9.0,15.0,5.0,18.0,6.0,19.0,17.0,19.0,20.0,15.0,7.0,17.0,2.0,18.0,16.0,3.0,9.0,5.0,11.0,10.0,8.0,7.0,5.0,9.0,6.0,7.0,8.0,4.0,9.0,11.0,15.0,12.0,13.0]}
},{}],65:[function(require,module,exports){
module.exports={"expected":[7.324308933651425e-6,0.10744319526757287,0.0,0.0,0.20553136727177052,0.00016667550177414646,0.0,3.753523199588857e-24,0.0,0.0,0.0005971081345146296,0.0,0.031554137898782496,0.0,2.9735017288911404e-12,3.170074643990122e-10,1.2378885527692758e-7,7.979861650607442e-27,0.17339626256941312,1.3537967164671972e-17,0.3643646362133842,0.002582260900358403,1.063414646529675e-7,1.2720841510779364e-6,0.053863560185721186,0.1294085394905696,0.0,0.3864082223481113,0.03194150994401892,0.0002604621211340513,0.0,0.0,0.07914386429533442,8.891948813728556e-5,0.0,0.0,1.8586793134699617e-6,0.20968315636316837,0.3163049513160826,0.0,1.2035214011910154e-5,0.0,0.0005451991891137765,1.3941662683463917e-23,1.0423354400430963e-5,0.0,7.802545373980083e-19,0.0,0.01113147603117475,0.0,0.0,8.690007364340084e-7,6.101093079611302e-6,2.832318527501526e-11,7.054745317486257e-7,0.0,0.0,0.0,4.657319547534315e-12,1.5632193938740471e-12,0.14246507859094135,0.0,0.38169086723783746,0.0,0.028600358513412895,0.0,0.0,0.0,0.0,0.05924981111080702,0.09502093128958068,0.0,0.11462720097337338,0.02263440555105433,0.0,0.15825438819930587,0.07508700129216941,0.0,0.0,0.11992262418166912,0.23318976630668228,0.01830943482805374,0.0,0.0,2.844786272437627e-10,0.0059927324517683395,0.0,0.0,0.0004330235955609402,5.991851293321073e-5,0.08883483382429173,9.19828177755522e-8,2.8605878669892716e-9,0.0,0.00020160382591369024,0.0,3.7608454106458545e-13,0.01974127967028711,0.0,0.0,0.020606872182442476,0.0030528805839188807,3.5226973240317775e-5,8.960027499001156e-17,0.26753096916181823,0.38783477968966734,4.5623167922865237e-7,2.3802494985074757e-11,5.994298688711451e-10,0.0022592728537431635,0.22344262277867008,2.297267508807986e-9,0.0,0.00019259093538164537,0.008582680818630227,1.6779472443265183e-5,0.00143444518414974,0.2649381556683394,7.908058826036731e-26,1.03804262657313e-18,0.0,0.0,0.2676166198876258,0.240369785800746,0.12148913094204489,0.40623728108490265,2.8431570041582887e-11,0.0,0.00020848808768399616,0.0,0.0,0.4016478419257917,0.000360850126279022,0.00045435478967469377,0.10677081967161763,2.1327543837672912e-13,0.0,7.395147825892446e-8,6.471645132441017e-6,0.0,0.0,0.0,2.7411071282000395e-5,2.995976311333307e-11,0.11066576236607603,0.24224548560599327,0.826950728764842,0.2841994697321594,0.001926119386300891,8.543915585485486e-9,0.0,7.701661319976559e-7,1.1895197636895415e-8,0.2964258705089191,0.14259444787058498,0.0,0.0,0.0,0.0,9.467906225661164e-6,3.181421008018409e-7,2.1828749575630055e-7,0.10611099131992281,0.11459679082182089,0.08535455261941502,5.595718503532608e-7,8.301552449105852e-10,0.0,3.749131015281382e-17,2.450283016772424e-5,0.07329859763936639,0.00200472641185231,0.0,9.641235692534625e-6,0.17107086615863024,0.42840792518901966,8.428518693624212e-8,4.473783234555601e-10,0.0047114974395571435,0.3019775439112611,0.0,4.551846978906358e-12,0.0,0.2669780736063252,0.3520458571755562,2.3751607004744104e-12,0.0,0.0,0.15458048427794918,0.0,7.88988120136317e-6,0.0,0.26496420333617665,0.08393121715154252,0.0,1.5023066361418812e-5,1.8629056503147734e-12,1.080932061466003e-6,2.1887634642969815e-5,0.08677018852967872,5.174676568498276e-13,0.0,0.019714835071236694,7.978936640363721e-8,5.226717476652478e-7,0.0,0.0,3.879370085766268e-9,2.8230803910154855e-13,1.9251084492216032e-10,0.0,0.00031495859878439154,4.3066014601679176e-7,0.0,0.011649205802833741,0.2489295317287161,0.05101463600674352,0.0,0.0,0.018746544083215858,8.177176894196833e-26,0.0,0.0,0.16430600917252808,0.0,5.187918411083255e-13,0.0,6.000631536132113e-9,0.0,0.002578905991240573,4.116781594063642e-14,0.21576857945755135,0.23898019003513232,3.78371997899776e-10,0.10623288010038548,0.0,0.11882240781071376,2.2836811221228853e-5,4.90839485477064e-6,0.01009949798570435,1.596894544044239e-10,0.0,2.9742080605379878e-9,0.0,3.487117904206192e-23,0.0017401139109146624,6.043042206846631e-5,0.0,2.1783031477369407e-6,2.780371004759646e-6,0.3682268957031957,0.14885965651558025,0.0,0.03291658830551058,0.0015706326261297745,1.3446894042845098e-9,0.12602785626259377,0.0,0.0,0.2114254901211585,0.30179107060555616,0.2394614160041593,0.0,0.021054310577837576,0.0,0.0006394870082661273,0.004195076946183801,0.03382989901379583,0.03147896783381143,0.0,3.398251829525965e-5,0.0687715850919784,0.004065838006400021,0.0,0.28030583102346107,0.17410110349423408,0.28242579816743774,0.0007155574212962058,0.0,0.005335453230624991,0.0,0.22289838762257405,2.520985498157539e-5,0.009580155187500265,0.004214463461373929,2.3565581741511465e-16,0.0,0.0,0.3614800680692196,0.03943985002962569,7.263266882041203e-10,0.0,0.0013715469410934976,0.2633590272026654,0.001758768095807917,0.0020508836114569683,0.0932747163365492,0.0,0.8499645810795613,0.0,8.937237289063691e-8,0.18510355591180133,0.19052280378439101,0.0,1.3107974695958967e-8,0.0,0.21026396691562613,0.3513637713995675,0.03442737378261252,0.04050974397354888,0.032112720345080475,0.0,0.0,0.5304956486004747,0.0018458254776053896,0.0,0.15103931755561883,1.575461228119487e-11,0.0,5.649950112528806e-7,0.0,0.3693442370529914,4.081679619585804e-8,1.0037025401568833e-5,2.23288096718601e-5,0.024588557988667034,0.0,4.242526032747236e-9,0.0,0.0,7.343266028538505e-11,0.0,0.0,3.2455015455102947e-21,0.0,0.0,0.0034498789923023353,1.3660662101132612e-5,1.77183816943543e-5,0.0,2.520636902831981e-11,4.598218401531292e-8,2.4627597090997876e-9,0.7570123465642299,0.17456050154682368,0.216583608482635,0.0,0.0,1.6191230909351973e-8,6.438289034343309e-18,4.827198861064464e-6,0.0,1.583075525014135e-8,0.2969610741657614,0.31298733893089203,0.0,2.231492118099832e-6,0.0,0.02879523201502228,0.06773071274957906,0.0,0.0,0.21167901780058196,0.18745941601887725,0.0,5.797526045996259e-6,0.0,7.897388974029224e-29,0.08415559123235906,0.2257847241508666,0.0,0.00704418132715601,7.088980859400578e-5,0.0,0.0,0.0,0.9092722946586722,0.0,0.006256771158598364,0.043696728915811535,8.455189222637196e-10,0.0,0.0,0.824835033797688,0.0,0.00012166924841872688,0.004660023728093469,4.644705320115824e-12,0.0,0.0,0.0,2.120522976459344e-11,0.0015453637117299435,0.0,0.0,0.0005050737258604898,0.0005366571177314501,0.0,4.588355199054094e-9,0.0007734486697992927,0.21840563931172916,0.10039448551672683,0.24382250754221155,0.00027000828175931046,1.2276718567112335e-8,0.6449934914518985,0.000326827906293716,0.0019415531624419286,1.165238286173662e-12,2.1165086066718975e-6,6.669971355734633e-26,0.00044016087307156333,0.23013415816735353,0.0020437409111217835,0.07875804252010671,5.1393577566958426e-11,0.0,0.015886902498158852,8.545326847708934e-11,0.0,0.06105133197094447,0.20363117566096317,0.0,0.006264306394316906,6.296760394711481e-12,0.29768036196350395,0.6855125278422485,1.4890368780158383e-5,1.9021018234565462e-6,0.0,4.714658650534072e-13,0.286999526631999,0.0,0.00601499214816435,1.557711332353419e-7,0.0406392077037005,6.380429191046745e-7,0.2912975089254048,0.0,0.23317486186569955,0.058870574023542066,0.0,2.814171445835459e-6,0.08789471084278924,0.39002680920796123,1.1620287463377185e-6,0.0,1.54295242761794e-5,8.144126223633046e-7,2.467105932130067e-11,0.269412272646413,0.0,3.9507887582047165e-7,0.0,0.015443070145667695,0.0,0.3309268756986286,0.006924215874656568,1.486233478897643e-6,6.8408057367061445e-6,0.3478455199116116,0.0,0.0,1.0735942980376148e-5,0.0001544398201060342,0.9890576403794809,0.0,3.346177398690409e-5,0.0,0.14654228878391992,0.0003936350737161324,2.6079358331795128e-21,0.0,0.30375468620586427,6.129479129962763e-8,0.3795368228627299,0.3462484865063393,0.8788896412968964,0.3451663786425358,0.0,0.0005424636862554632,0.002165859660627276,5.199338503339216e-15,0.0,0.0,0.19958641391783058,0.0009705471292955408,0.02730085719878071,2.3468849695657148e-7,0.0,0.0,0.00614108587459891,0.01864010601590996,2.09050579297551e-19,2.0779638959785015e-12,0.0,1.320129444329014e-6,0.0,2.9984905345600225e-15,0.0032845660654118895,0.0,1.0330684775714463e-5,0.0,0.001454740332453191,0.0,0.1627683546552647,0.2896153774062328,0.0076538103148721705,0.0010687523363906114,0.34177039444052093,0.03195835298748255,0.12101276841889086,2.2484481860475476e-7,0.0,0.0,6.940386525086458e-10,0.0013569356690009426,0.0019450980489883719,0.22812965433872667,0.05056347346739452,1.0627066081432373e-6,0.6463128318847806,0.0,6.028502870889521e-5,2.3530031559549764e-11,0.0,3.235671543657221e-7,0.0,0.0,1.2642163605737804e-14,0.0,1.3861245194387086e-8,8.7641142755708e-5,0.0,0.0001801498495597934,1.1136689262431674e-5,2.3568876061580916e-13,3.3614368597258814e-18,0.0,0.0,0.0,0.058514433572269445,0.0,0.0,0.0,0.0,0.0,0.0003071999565291836,0.40045910457910977,0.0,0.6070656795511773,1.7091638129367576e-12,0.002448912230807696,0.05780117330066251,0.0,0.21555751863382844,0.0039803739565763725,0.0,1.3929686050767912e-7,0.0,5.540343644838712e-7,0.27972726296575046,1.6869860512661274e-6,3.471968982524981e-10,0.0,0.36384244731187876,0.0,7.789450615582519e-8,5.913164290654987e-15,0.0,0.0,5.817356261342136e-6,0.38159114478987805,0.0,4.387617173403341e-25,0.2937655121096275,0.0,0.013653565453511537,0.0,0.0,0.0,0.00017594921939353278,0.006723246926884316,0.0,0.21095283386475228,0.0,0.0,0.0,0.0,0.0,0.0,0.0,4.830507920019738e-13,6.736240584493285e-11,6.558316936510056e-6,1.023610921906451e-17,0.0,1.3011669705815551e-8,0.0,6.552325145917312e-6,4.652639312383476e-6,0.0,0.06047534356548313,0.0,3.6185226819531257e-6,1.0986437628945253e-14,0.0,8.469350082192751e-13,0.0,0.10703748296128947,0.00013747563135438673,0.3651079149633899,0.0,7.049359245690062e-8,1.20011642877298e-7,0.05684256423196143,0.19135929025973353,0.0,0.0,1.1422119132012084e-6,1.374806553799479e-13,2.1667507556209997e-5,1.5228868535604902e-10,2.7854777766674467e-5,1.3962193245837661e-10,3.984433872136071e-6,0.0,1.4996354076595064e-6,0.0,0.0,0.30603971969895116,4.878850881145914e-9,0.057738266233705766,3.1484762879563913e-10,3.107343785312788e-7,1.0757176509648261e-7,0.0740341448679217,8.171070853834453e-9,7.3777959977185534e-9,2.3662968317018885e-6,0.0,0.0,0.0,7.02651475169572e-5,0.0,0.000748944041908314,0.0,5.863842642052794e-9,0.0,0.0,0.0229387992968531,0.3081200800471791,1.5316262216195614e-11,0.0,0.0,0.0,4.86956784233405e-6,0.15637056465770635,0.054511568415634225,0.0,0.0,2.0934210708268715e-23,6.612113858411327e-9,3.2762414395283837e-28,0.3252453335911772,0.31261912534942876,0.001261443262882064,0.0,0.18301987485740895,0.0002420182535658654,0.0,0.0,0.016629128881154802,0.06610125115960577,0.0,0.3656358631489985,0.00356447432594922,0.000427282268591529,0.0,0.033956093344973626,3.797383164013507e-9,0.0,0.0327285252309929,7.90135611023524e-10,0.00021637306416682643,0.0,7.924741539325308e-6,0.37905577313955063,0.02673846427843418,0.0,0.0,0.09508107042176044,0.01075585381922011,7.80306115049984e-14,2.920107279112206e-13,0.0,0.0028711301340008225,0.0,0.0,0.0,0.7095287733615072,0.062470539228700946,0.0,5.8112337791048916e-8,0.2830292551708067,0.0004129043774819594,0.06045666310122849,0.0,0.00015631857206954589,0.0012032241689422143,0.04183868629553903,0.028074833781744794,0.018001521019996365,0.00040128977651737935,7.698856993547341e-10,0.28509289803618876,0.0,0.0,0.0,0.0,3.22887989043158e-13,2.9931241538358725e-15,1.3423061128744827e-15,0.0,0.8240394873280177,0.0,0.0,1.1475680566254259e-5,2.1560842048552393e-5,6.308094860417646e-6,0.37874377207029214,0.0,0.38171519267962695,3.412155174760113e-7,6.442528868309962e-12,0.26874194577286564,0.0,1.9714472093720488e-9,0.0,0.0,0.0,0.0,1.16723125640719e-11,0.0,3.7431858822599865e-7,0.0,0.014362487287525835,4.023291767923365e-6,0.0,2.338880312665943e-9,1.306825107614405e-7,0.1449289181816089,0.0,0.003055723620357303,3.5795533480061154e-12,0.24791864067536482,0.0,0.0,0.0,0.06512643887297336,0.21620218021616794,0.00018224196774368963,2.0617354812495002e-8,0.0,2.4469875824638358e-6,0.0,1.640057449672846e-6,8.909626410250162e-8,0.0,0.023116491565590126,0.0,0.284988874032903,0.39559199000205086,0.1305851149199199,0.00021042441416198614,9.175772854440345e-9,0.23228065680021914,0.0,0.023838257689940662,0.007388486333300147,0.011723482009092212,0.0,0.0002627317458091085,0.0,0.0011122891985369226,0.00015204683170742678,1.9185535384626343e-8,0.0,0.24650982706947205,0.39701234925706047,0.0,0.29372109127881046,2.386646645239039e-5,0.25072074558670737,0.03588620094990493,0.15229815701881405,9.233277121127685e-15,3.5465831357001414e-9,0.0,0.0,0.0,2.4915637970563494e-8,0.007621982414030885,0.0010166808568659734,0.0,1.1306162376700719e-8,0.0,1.899121693015421e-12,0.2878632722642284,0.24468864390171435,5.443966646160994e-20,0.009759032994942681,7.533443282005727e-10,0.0,0.0,1.5717907939016436e-10,0.0,0.011126064811462381,1.3591005394186729e-11,1.7850298298592187e-9,1.0702185006658734e-5,2.8775046600310623e-6,0.0001532054178340779,2.0757239851266167e-12,0.0,0.0,0.0,0.0,0.011834434013173394,0.01561138272884494,5.7420385478409896e-5,0.09403374920137857,0.0,4.991044267663676e-6,0.00021928005615646481,3.584381803959978e-8,0.0,0.003440391059978367,2.992710884918969e-17,0.31137069924373717,0.3527854515205681,1.682781470530896e-8,1.4486196090281332e-6,0.017793102586959837,0.0341281783656716,0.00020540802718245986,0.020541140491162322,3.7915248951211785e-12,7.707412204784581e-17,0.0,0.9897186506611281,6.679481617028672e-10,0.27419816464879193,0.0,0.06628679245087712,0.0,0.0,6.115268831122254e-5,2.1953052697607092e-8,0.0,0.00020585877127481678,0.12040835711194411,6.753988561904032e-11,0.00013397586432002147,1.9575725649529734e-13,4.645808574870018e-14,0.0,0.002597349508664838,0.0,0.0,0.32737694846670606,0.0,0.0,0.24648634185561422,0.0,0.14301345990809486,0.018518063543641942,1.9646758006815467e-7,0.0,0.0,2.8047698308934106e-7,0.37951869684468365,0.002923467509991475,8.432328018130387e-5,0.0,0.0,0.0,0.0,0.18526781595374434,0.0,0.00537142245672714,0.01083821665789667,0.09263956994234664,0.0,0.11427306172737797,8.035339127114351e-7,0.000545937835313602,1.505202934812603e-8,0.0,2.0674513915646416e-8,9.430737953314289e-15,2.4160423694385877e-5,0.38652014682855307,0.3410463940748873,7.141005841429799e-12,0.005518396139595965,0.0,0.0,0.0,0.0,0.001068814183713948,0.00013887403663613655,0.0499794828840903,2.273751625291052e-22,0.0,9.036781760300535e-7,0.0,6.749559753482934e-9,3.5435431475122884e-14,2.4214256917259338e-32,1.4382617129430829e-8,0.05028933755178512,1.1610172025743016e-6,4.3121513269639425e-14,0.0,0.0,0.0035108141595944563,2.367738281390943e-6,0.0,5.2376205418423127e-8,0.0,0.0,0.00012574503738135593,0.0,0.0,8.302484568498033e-6,0.28208466066813864,0.0,0.0,0.0,0.0,0.0,0.00018255321328419107,0.07639315402398494,7.090457598830944e-11,0.0,0.00020630479985812153,0.0,0.0,0.0,2.0731076038937345e-5,7.535111186050504e-11,0.0,0.0001532846864251074,3.890306229291125e-8,0.0,0.2297724704381415,0.09205685194454113,0.23696685120295322,0.0,1.1923181399751546e-6,0.05307464537434841,4.510436756132264e-5,0.011749376768719158,6.402328481329405e-22,0.0,0.0,3.4136129590573326e-15,0.0,0.0,1.641143225487535e-11,0.10400197328941041,0.0,5.501916416971989e-7,5.500095932400671e-13,0.0,0.00029625698311770005,0.001995053827772339,3.964599587022883e-8,0.0,0.0062443830834270535,0.04079069804376454,0.0,0.0,0.0,0.0,0.0,0.03407784784917773,0.0,0.0,0.2870934323515929,0.0,0.0,0.2749751777555745,9.14466296852086e-6,0.0,0.04691596903589639,0.0,4.521286957813894e-8,0.13511177459003335],"x":[7.0,1.0,11.0,8.0,2.0,4.0,5.0,8.0,12.0,14.0,4.0,10.0,5.0,12.0,9.0,11.0,9.0,12.0,2.0,10.0,1.0,7.0,7.0,10.0,3.0,2.0,4.0,1.0,0.0,3.0,10.0,14.0,2.0,11.0,4.0,10.0,11.0,2.0,1.0,7.0,13.0,13.0,8.0,12.0,5.0,15.0,15.0,9.0,2.0,14.0,12.0,9.0,9.0,9.0,6.0,10.0,14.0,12.0,10.0,9.0,2.0,11.0,1.0,11.0,3.0,6.0,10.0,6.0,12.0,3.0,4.0,15.0,4.0,2.0,1.0,1.0,4.0,6.0,7.0,0.0,3.0,6.0,8.0,7.0,13.0,7.0,4.0,11.0,9.0,11.0,4.0,9.0,14.0,12.0,9.0,9.0,15.0,2.0,10.0,7.0,6.0,5.0,5.0,12.0,1.0,1.0,6.0,13.0,12.0,6.0,2.0,10.0,12.0,4.0,6.0,9.0,7.0,1.0,14.0,14.0,6.0,12.0,2.0,3.0,3.0,1.0,9.0,12.0,7.0,13.0,13.0,1.0,10.0,5.0,1.0,11.0,13.0,11.0,8.0,12.0,14.0,11.0,7.0,14.0,4.0,3.0,0.0,2.0,5.0,4.0,14.0,8.0,8.0,1.0,0.0,7.0,15.0,12.0,13.0,11.0,12.0,10.0,1.0,1.0,2.0,11.0,7.0,13.0,14.0,9.0,6.0,5.0,14.0,7.0,4.0,0.0,11.0,10.0,4.0,2.0,11.0,10.0,14.0,2.0,0.0,14.0,10.0,15.0,2.0,14.0,7.0,12.0,1.0,2.0,8.0,9.0,15.0,9.0,10.0,4.0,10.0,10.0,3.0,8.0,12.0,15.0,7.0,10.0,7.0,6.0,10.0,10.0,7.0,7.0,6.0,0.0,3.0,11.0,11.0,2.0,10.0,14.0,12.0,1.0,15.0,10.0,13.0,11.0,10.0,5.0,13.0,1.0,2.0,8.0,0.0,11.0,5.0,12.0,8.0,3.0,14.0,9.0,10.0,14.0,14.0,5.0,10.0,7.0,7.0,8.0,1.0,2.0,14.0,4.0,3.0,6.0,2.0,8.0,14.0,3.0,2.0,3.0,7.0,5.0,14.0,3.0,6.0,3.0,4.0,13.0,7.0,5.0,4.0,11.0,1.0,0.0,2.0,8.0,10.0,1.0,11.0,1.0,7.0,3.0,5.0,13.0,12.0,12.0,1.0,1.0,11.0,14.0,7.0,2.0,7.0,8.0,2.0,3.0,0.0,14.0,11.0,1.0,3.0,10.0,13.0,13.0,2.0,1.0,4.0,2.0,2.0,12.0,4.0,0.0,4.0,9.0,2.0,12.0,14.0,7.0,10.0,1.0,10.0,7.0,9.0,7.0,4.0,10.0,14.0,10.0,11.0,6.0,8.0,12.0,11.0,10.0,5.0,8.0,6.0,13.0,14.0,7.0,12.0,0.0,1.0,4.0,12.0,7.0,8.0,10.0,9.0,5.0,5.0,2.0,0.0,10.0,11.0,9.0,3.0,3.0,12.0,7.0,4.0,3.0,12.0,11.0,5.0,11.0,3.0,3.0,2.0,6.0,6.0,14.0,12.0,10.0,0.0,13.0,5.0,2.0,13.0,6.0,13.0,0.0,12.0,7.0,5.0,11.0,6.0,8.0,8.0,11.0,4.0,9.0,14.0,7.0,9.0,14.0,8.0,8.0,2.0,2.0,3.0,7.0,12.0,0.0,6.0,6.0,8.0,7.0,10.0,8.0,3.0,4.0,1.0,8.0,10.0,5.0,14.0,8.0,2.0,1.0,14.0,5.0,15.0,2.0,0.0,11.0,3.0,14.0,9.0,2.0,12.0,3.0,9.0,5.0,8.0,2.0,11.0,2.0,3.0,10.0,3.0,2.0,1.0,10.0,5.0,8.0,13.0,6.0,2.0,8.0,13.0,5.0,4.0,11.0,1.0,6.0,11.0,6.0,1.0,10.0,6.0,8.0,5.0,0.0,11.0,6.0,13.0,4.0,9.0,14.0,6.0,0.0,9.0,1.0,1.0,0.0,1.0,12.0,3.0,2.0,13.0,5.0,14.0,1.0,6.0,5.0,4.0,5.0,10.0,6.0,0.0,15.0,13.0,15.0,7.0,13.0,15.0,4.0,11.0,8.0,12.0,4.0,8.0,1.0,1.0,5.0,8.0,1.0,3.0,2.0,8.0,9.0,11.0,10.0,4.0,7.0,3.0,7.0,13.0,0.0,12.0,8.0,8.0,11.0,7.0,7.0,3.0,13.0,12.0,11.0,8.0,11.0,7.0,6.0,14.0,14.0,12.0,10.0,13.0,5.0,5.0,6.0,8.0,11.0,5.0,7.0,1.0,14.0,0.0,10.0,4.0,3.0,4.0,1.0,7.0,3.0,9.0,12.0,10.0,2.0,9.0,6.0,5.0,1.0,11.0,14.0,14.0,11.0,9.0,3.0,1.0,13.0,12.0,2.0,11.0,7.0,8.0,6.0,10.0,6.0,3.0,4.0,3.0,11.0,12.0,9.0,12.0,7.0,12.0,11.0,12.0,11.0,7.0,13.0,12.0,13.0,13.0,6.0,12.0,5.0,3.0,14.0,9.0,15.0,1.0,8.0,9.0,4.0,6.0,1.0,6.0,8.0,7.0,6.0,3.0,9.0,12.0,13.0,14.0,7.0,13.0,7.0,11.0,10.0,12.0,8.0,13.0,6.0,1.0,13.0,3.0,10.0,12.0,7.0,0.0,9.0,9.0,9.0,11.0,9.0,11.0,9.0,12.0,6.0,14.0,7.0,10.0,14.0,4.0,1.0,11.0,6.0,14.0,10.0,7.0,1.0,4.0,12.0,13.0,12.0,14.0,11.0,1.0,1.0,5.0,12.0,1.0,11.0,8.0,8.0,2.0,5.0,9.0,1.0,4.0,3.0,10.0,5.0,11.0,15.0,5.0,5.0,5.0,14.0,7.0,1.0,5.0,13.0,10.0,2.0,2.0,15.0,11.0,9.0,4.0,13.0,10.0,11.0,0.0,2.0,9.0,9.0,2.0,6.0,5.0,9.0,2.0,7.0,4.0,6.0,5.0,6.0,13.0,1.0,11.0,4.0,10.0,11.0,13.0,11.0,10.0,10.0,0.0,12.0,11.0,5.0,6.0,8.0,1.0,13.0,1.0,10.0,9.0,2.0,3.0,10.0,14.0,10.0,14.0,5.0,12.0,11.0,10.0,13.0,4.0,5.0,9.0,15.0,3.0,1.0,14.0,6.0,12.0,2.0,8.0,8.0,12.0,4.0,1.0,6.0,10.0,12.0,8.0,9.0,11.0,12.0,7.0,2.0,7.0,2.0,1.0,4.0,8.0,8.0,1.0,7.0,2.0,5.0,7.0,13.0,9.0,13.0,5.0,8.0,11.0,13.0,3.0,1.0,14.0,2.0,8.0,2.0,5.0,2.0,13.0,11.0,8.0,11.0,9.0,11.0,2.0,10.0,13.0,8.0,14.0,7.0,2.0,2.0,12.0,7.0,14.0,12.0,2.0,8.0,14.0,2.0,12.0,6.0,7.0,7.0,6.0,10.0,10.0,8.0,11.0,13.0,5.0,4.0,7.0,3.0,7.0,7.0,8.0,14.0,14.0,2.0,14.0,1.0,1.0,9.0,7.0,4.0,2.0,10.0,2.0,11.0,14.0,7.0,0.0,5.0,2.0,11.0,0.0,2.0,14.0,8.0,12.0,9.0,5.0,3.0,11.0,4.0,9.0,12.0,14.0,5.0,12.0,12.0,1.0,11.0,8.0,3.0,3.0,1.0,3.0,8.0,15.0,8.0,10.0,1.0,6.0,8.0,8.0,8.0,6.0,13.0,1.0,14.0,5.0,4.0,6.0,8.0,4.0,7.0,5.0,11.0,9.0,7.0,12.0,7.0,1.0,1.0,9.0,6.0,14.0,13.0,11.0,12.0,4.0,3.0,5.0,15.0,11.0,5.0,10.0,11.0,12.0,14.0,14.0,6.0,6.0,8.0,11.0,15.0,9.0,5.0,6.0,7.0,10.0,14.0,7.0,15.0,13.0,4.0,1.0,10.0,8.0,10.0,7.0,9.0,8.0,3.0,13.0,6.0,6.0,5.0,7.0,12.0,7.0,12.0,3.0,6.0,10.0,8.0,3.0,5.0,2.0,14.0,9.0,3.0,7.0,1.0,14.0,9.0,8.0,14.0,10.0,4.0,9.0,3.0,10.0,13.0,11.0,14.0,7.0,6.0,10.0,14.0,3.0,6.0,3.0,14.0,13.0,11.0,9.0,5.0,4.0,11.0,2.0,10.0,2.0,2.0,9.0,5.0,4.0,11.0,11.0,1.0],"p":[0.14020203655010177,0.05696681572797102,0.06393827643814701,0.10800192430288057,0.1915564113357982,0.11362344240985074,0.1974215243885917,0.0007332177350855674,0.14767825863278916,0.16861199120071274,0.057329593662986914,0.1470880704280245,0.1260250893049358,0.1970241820673298,0.05239043708418248,0.05123664907691508,0.17081270563751141,0.005401740202318983,0.17606941983144098,0.007104388890206259,0.1748081119432876,0.1112601343822528,0.10088222739180344,0.09579246291802979,0.09719742568010643,0.08039407825356425,0.19763784474438872,0.14700685748440862,0.16577756480061587,0.0638628345832709,0.06423273450766387,0.061090307940016735,0.06505324674166175,0.1909640341660851,0.04599743370938994,0.025136358495500267,0.16706074280590047,0.07329256301541602,0.042501760329264296,0.11480156194280206,0.19820932391509782,0.10179567345702592,0.1132507104224358,0.008565026790975682,0.07151819938604911,0.010294586710861742,0.06206056906385023,0.06216810032811426,0.02888620586713855,0.17017549243208574,0.08632631714879319,0.0964257398311354,0.17616915610998465,0.06730011218138335,0.04616327979205814,0.19855221538163043,0.07852155706264502,0.038506560027079445,0.03051665913717332,0.031472922986934736,0.05586283132883674,0.17349692090953936,0.09236587909289945,0.15169352317271612,0.05630759022550574,0.0588505000680986,0.07274671947828874,0.11790239798962864,0.10388509228569598,0.09191807633951217,0.1080304890726688,0.17574494533274804,0.13194872610148792,0.04235768981563033,0.11910889809931119,0.185022247015147,0.12390658295904827,0.19471421949698745,0.006648151832785976,0.1006162092790802,0.18399340317246413,0.18962318326661498,0.13663660097224659,0.19923253055421508,0.15242535101088328,0.18451060939002017,0.10351327208159443,0.07412123706682698,0.18870408665916594,0.1831023336025259,0.13297802159051994,0.12995594840986216,0.1792629019811642,0.13142812946945912,0.187329865818022,0.13037110510155325,0.08024767972956322,0.08479450590498301,0.1359545912284116,0.17040820184341113,0.19486612533735276,0.07379292166152385,0.04455422712117856,0.037259589491044354,0.1590681660227504,0.11647876899268012,0.036901778986835956,0.10839437287310334,0.17040337741882064,0.1218230697309934,0.07380099476629867,0.13681104400879016,0.14393500108227233,0.11780370801577789,0.175940898083705,0.19832616861414323,0.10651904694958124,0.18398905644450367,0.007597712002808921,0.037091637075544706,0.034591951609575844,0.004733758829517987,0.14074363643269683,0.17193691382919016,0.1206620966662671,0.177703572105759,0.04356373630405344,0.00024893102111422927,0.14203094361496368,0.02615458187438731,0.013704685497073177,0.1615640371339938,0.17074912460765243,0.03887550580462804,0.10677081967161764,0.03707142350286472,0.18941331680493723,0.09320076146062806,0.1747938781079728,0.12881569454628067,0.04316035699690071,0.11129260487904201,0.052035422111411836,0.1771430710817272,0.18334936647866235,0.1944170379797793,0.04639194999098609,0.10536847434793165,0.061607594024680745,0.009614224016712926,0.13530716971450948,0.08274711461949807,0.03523581848483781,0.10140594884692611,0.14982456688676957,0.04840926780636395,0.05792786370271355,0.030638454352661573,0.1281960236582525,0.1782892390792284,0.18146439207374368,0.1464546524034669,0.18296070635342085,0.11459679082182089,0.11004218760834279,0.1136655564713939,0.01767260797260031,0.04937529674208734,0.03824440235366482,0.18039297322615522,0.19308491781417772,0.05147179578631849,0.13499471873303268,0.07056936625011678,0.14978183657199437,0.08988708482919541,0.11204989044966257,0.05361394879793573,0.06976249893406128,0.19885793517442696,0.06103895311354335,0.04877618495892984,0.05333119232274797,0.10632847047186691,0.050860687411094486,0.10670384240146942,0.03532470390615279,0.05198394336375083,0.1359841464793984,0.06134215239611969,0.052654880883871075,0.1878176289676267,0.021183129127234725,0.185312929348042,0.10779319794090832,0.13565259101122804,0.16520101982552277,0.11028024267261216,0.18610079369069657,0.19880730654673662,0.02440473546139037,0.03518795976253748,0.1819646509379781,0.07037896999497795,0.18960229280502272,0.1951013666085716,0.1052545499393426,0.08407792003963017,0.009685564378816292,0.013853805745785187,0.018185904675470967,0.17969666586032138,0.049220303427899875,0.07929852025399109,0.15754013055658397,0.15955450661262294,0.11994633955861361,0.07053180339357153,0.19581119727291874,0.0129459572109361,0.003099276614211499,0.11977875114955357,0.014179500848843542,0.14497693731615585,0.13225368585252403,0.04671299121745207,0.13238095436770211,0.1788806482286987,0.19054857639284647,0.05796040354166823,0.058205176147545015,0.19472530731789084,0.1445280238621672,0.024874249613341084,0.17042641873232758,0.07344334479972124,0.1773623779887395,0.17540261270138602,0.13998764238043832,0.03442288502063567,0.12905384782788998,0.12691689191809769,0.14039031052138157,0.04195160552602868,0.017720943044437967,0.13705261979567954,0.17264682389498415,0.195711988545539,0.05115477773257067,0.09796608688666537,0.07359248055288847,0.1931570251679721,0.02759810733572379,0.11540097980837882,0.03738814474905854,0.033222858549171265,0.17585463978251978,0.03533677037993854,0.07103920770943857,0.1292009694437681,0.1954357703980777,0.15478440926408302,0.06916940941621555,0.1535649366138767,0.16335546862107148,0.03281645601998693,0.16843678090240555,0.08897802612117199,0.0664791775207859,0.13085570383137934,0.07150798087709238,0.17225892115543473,0.13821848066528905,0.16510393446468857,0.024535953597322326,0.10350041009031044,0.09840025758948873,0.17110444258260454,0.05414379141566448,0.0008932243334283552,0.11856365826528728,0.05617974255445697,0.07440130661825864,0.023226924707659614,0.10256500946542309,0.04419893801547606,0.14991490288497153,0.1903499873399651,0.10435688795647646,0.010166919180031764,0.1476365263462733,0.14538145188216375,0.1719757320396653,0.1888177979675227,0.16229555488766395,0.17037875652098344,0.0966280275540536,0.10931724518553412,0.01077886054776891,0.19616799197556847,0.08806970109388322,0.16099220617532276,0.13147964104685114,0.08814202224342522,0.13014168523557404,0.10675218113832621,0.17319174584895156,0.07689974362610107,0.10762658495433702,0.01795399555969488,0.17920022417698164,0.17786225072648723,0.17814747954401056,0.11908021283978294,0.044396216696580164,0.08782195869095002,0.1977760861333644,0.06893688472003694,0.03778155818821319,0.06656250583619121,0.01992384931084681,0.07322684198580616,0.06618659863960295,0.12008498944439033,0.15823822963552514,0.19634725016401455,0.10676408237571083,0.11587015230981357,0.1643182654689763,0.12100944073065496,0.052410343784547966,0.14289972570143888,0.18678509678725097,0.01586196074580424,0.04079942932059169,0.1236305154331161,0.12116374862728,0.16003582520000625,0.029783804145716044,0.08296123937225844,0.10169325746621127,0.08949494667112022,0.09661446952412783,0.06722748507731154,0.17456050154682365,0.19520378648420783,0.02727387837097033,0.1572679681642295,0.028972667480320836,0.012589924988406366,0.14870912542846768,0.13864837889410056,0.006646894278927818,0.18938908742263894,0.05642518958417893,0.17662254512816997,0.18981948044513755,0.14233206715443353,0.12975425916254668,0.18404225597975718,0.1768738930912572,0.08248325044021221,0.18590757041054318,0.1893807907106374,0.1496001705685194,0.12482101820019276,0.11799641221272172,0.0010047330779683339,0.1331671804440385,0.16573790904616326,0.12218807570773996,0.1537448880376484,0.12191548064979232,0.026259430133040197,0.00222153832485823,0.15147302073603958,0.09072770534132775,0.06805332888880185,0.1393715949796945,0.09421588657657708,0.10421754911692852,0.14534163308683576,0.028177384833112874,0.047002470735852155,0.06413722579321939,0.08752304833863041,0.07607037045600595,0.06351799636646209,0.10928070645566441,0.06782201391138179,0.08262627843862758,0.08612415182118963,0.03363714660105659,0.02715730019977829,0.18634628934682307,0.14582890158281608,0.15442762180745442,0.06806986709664571,0.03797684277256455,0.1730870970315591,0.09449357278124554,0.05055020738104132,0.15748763365366295,0.1083770442519695,0.13651887358856038,0.02406759036417836,0.07687396874982722,0.10835323279242677,0.008567232928916414,0.05093299732876991,0.0030367734715625264,0.1953545339753446,0.1698295229729841,0.06142547013084232,0.016860244845481365,0.03241829199790369,0.09504042771486287,0.11153670089202042,0.19091399373620266,0.020821236718284553,0.03135788744024475,0.13613088693006242,0.16536056856240738,0.0642375566525967,0.1064343559691357,0.17217646096646236,0.026610148511673783,0.17124383994911924,0.0016214108950876938,0.16895572694231295,0.012149322924974816,0.11514535156450215,0.18257462451381776,0.036626728209445236,0.09966414904106645,0.1693611265865104,0.06498259474486749,0.14783676433667914,0.057029747853586304,0.08243277217011001,0.0586544133463828,0.017205508823809623,0.014118336129693532,0.07960400608619628,0.11987750074515482,0.15219348394483614,0.18107643270132653,0.16261523810192632,0.18317710657259695,0.017062053507426223,0.12350977914754702,0.11839116307137126,0.18864047641766601,0.13558808371366846,0.1420522282019174,0.08816620885002556,0.1336700205116755,0.11312229174781314,0.1357354619144926,0.03031060773086445,0.11176451243942638,0.18209609567424764,0.09253786637076984,0.060534101843047375,0.028857489781675263,0.005486229165487711,0.16713415127151046,0.13291213540810384,0.11881496220795928,0.14244204973023195,0.18635559083832975,0.017461217677837572,0.04083940017274466,0.11232845454814099,0.05404318070640928,0.07167988682374041,0.04815735636673005,0.008569466956544326,0.03946464038506381,0.024497509150966268,0.019364915554378293,0.009037845955923541,0.0561841968800588,0.17331699977122783,0.049257808306751194,0.02286647013897061,0.16449317764996865,0.09547342795470892,0.014773944991916999,0.0688243562539689,0.1643146750013215,0.11792678551518616,0.19848104240421188,0.05684384218159675,0.06456179815699646,0.19283678309195118,0.14457329324595275,0.12668795344342057,0.0631128786316527,0.05708516541712641,0.05393679944468373,0.10421790390854402,0.12633872555241293,0.03307502568848926,0.10160135926077284,0.01304027257677074,0.09898369973845562,0.0923475302424341,0.18163770674786583,0.1721669162065553,0.1351849060810409,0.0861379839032873,0.09398309014295014,0.19482785392857696,0.12317024881272176,0.1213775496541977,0.19192865270532497,0.10571267651802221,0.14199318685452098,0.19603558510893576,0.18733245586187797,0.03301736468388037,0.1081180371229173,0.14808176307350593,0.013485381214497362,0.017369437305308513,0.04235336467013906,0.0455281652345195,0.018918567746037243,0.03962567213906701,0.08182749637236159,0.19302714445481617,0.13962433286155926,0.19607158730962082,0.09323759042945384,0.08844474036337623,0.09023573554790892,0.02686717678575632,0.17575716022972718,0.034391403414066615,0.11220394001152299,0.16318646982428078,0.019827337988637384,0.15820168387472694,0.0003555177846795932,0.1337618047986697,0.1708007436403548,0.17233884123691823,0.17972044247347002,0.029635108360799613,0.028933084855734537,0.027555420741368852,0.038290770567217886,0.0709158325879018,0.11731674287686876,0.1678755467616215,0.15788618969508691,0.15184973169121874,0.06453787309191493,0.055320580547247915,0.16131683461495402,0.10476658330547811,0.15173151459808817,0.012749773534196507,0.13061055787479145,0.07200375912198834,0.03764561467644048,0.17013056917853084,0.055177770771307394,0.08408926276831097,0.0222553843673583,0.017984921798099674,0.07156307665701016,0.012559656492334615,0.009336534950813347,0.15344424346427,0.1610168875523081,0.15340016608006388,0.16965597384546072,0.07838643210443214,0.060269182176068095,0.10450904327149667,0.04750117607894198,0.027234725638288815,0.1288889740363238,0.06612205111893447,0.1380286153305514,0.0983732011646492,0.10456978391589429,0.053486205466337734,0.0856560941857346,0.11519678732290553,0.0653589614712136,0.09575852487751257,0.1379554810114215,0.030534877223413172,0.10052381628906543,0.15822443097627004,0.1140203735744688,0.13679364021466328,0.18954324946574821,0.05325712141962984,0.059402615143171515,0.1938261043787447,0.07619116719386239,0.06893452957857589,0.19982419050122338,0.03097285651432711,0.07374057331561494,0.18061711099314373,0.07904091427875098,0.07577332595412543,0.030507704139587546,0.048706671351298025,0.022734091879626384,0.18951971335529483,0.1922933165967476,0.012529618575327462,0.029617832840444037,0.17383773627051738,0.06324755515770404,0.04723042113472249,0.09980068829434532,0.08307758004450383,0.08694823066264289,0.15458420299375214,0.12426226787533619,0.08055594058519958,0.09063574510577643,0.16605342623721284,0.10768811366063416,0.12008231905109841,0.07088010067080619,0.11215277987315063,0.16283835995549129,0.027565198160597684,0.14198278045679258,0.03964375168454666,0.061890345736275165,0.13674596526886915,0.19413666672727944,0.0002693932587989334,0.12871001007063812,0.11048200827269934,0.06597179144202646,0.08297246306580482,0.18396958516042858,0.026191207671457262,0.12422455202608972,0.1835586467526667,0.18685236904522104,0.19591779458853745,0.07089736152614844,0.0127770869390897,0.04837459934410169,0.15322863336546338,0.10787098795831739,0.0448641657112514,0.15096380112376628,0.04509606672941313,0.06719451932176512,0.0062408207662614686,0.14089662280367482,0.0018569087152881638,0.08410842603981568,0.0952799883258229,0.12768243886793035,0.02823102909081432,0.07063201265497675,0.19844101563970537,0.1585513855296078,0.12766798763039544,0.05575371893748376,0.16995079046311337,0.17981759235389758,0.04051186247802563,0.03993753847708397,0.07531907138574234,0.19480148215949247,0.14841625840609055,0.11814567532112603,0.06923715992803224,0.11948239586750647,0.0028458152714526453,0.18494416722588483,0.13324132859331925,0.06848885863686559,0.05953889248978102,0.10014966331420867,0.1858393390778375,0.007888277804339473,0.04174959490453345,0.044302300632145825,0.13370603208371734,0.07252551153266858,0.06049918378695729,0.16178249809216516,0.1772530189951357,0.05998528147937537,0.10890721179363086,0.08221172956920371,0.11534172979330051,0.09148370072582789,0.12338814791627924,0.14574033681903106,0.10794657420233733,0.1649503060723109,0.1841104985068539,0.001550971538303969,0.16824817618869137,0.09915795635149621,0.17927661281831686,0.12432240284187071,0.07989798322496876,0.0950468040091736,0.11181945247872238,0.08047308553816301,0.059942021759114984,0.04930311895852446,0.0015871019879421411,0.06135965772652057,0.03828968083792814,0.03256755511580494,0.10063166501887798,0.09223379258312461,0.178241788946149,0.1795775954950238,0.05724699045735635,0.0719201948737997,0.08817801453489334,0.10814048314612804,0.011933402192417298,0.1545945796951117,0.18106677214417394,0.024877731124889692,0.13255646922044031,0.09874177090107748,0.1347344069864954,0.13790317664975085,0.10068154779200995,0.17695421002386974,0.04663483048899075,0.05567316966189045,0.19023667453106025,0.09064037133783175,0.033550270401106363,0.07473705279059195,0.025193338659975775,0.12133673474605403,0.1972829754891469,0.0011614185981474456,0.04109275504863663,0.10591694043335705,0.15814160552921602,0.06796628749105542,0.1183307537168945,0.02791105167686916,0.16803740867739922,0.022319604976413745,0.1612243714340807,0.027887650411732245,0.04836216661261386,0.07974695892356648,0.0869281387367848,0.07766360477139589,0.031144026925475556,0.13707184761003668,0.13251008025416944,0.06027299830657289,0.04285048737817121,0.02721400575941595,0.09756273444986846,0.13373399945058204,0.18337992558511884,0.19924586977277536,0.062471604439985874,0.038110757892853855,0.1911197347860188,0.15439643030180672,0.19011657561418904,0.17995038288012127,0.05549316372102973,0.14030241146766528,0.024836455625330347,0.08351504962182497,0.16823708959526137,0.0707118542354825,0.048425591457511935,0.19926776104079377,0.157895945347259,0.06463033618658294,0.1610858226514692,0.07194625036127054,0.17879604434464347,0.13091617292861316,0.0633216841988005,0.04645493403335719,0.13789602588266314,0.1770693012352255,0.1894615509898958,0.06850615108769952,0.09106153864709587,0.08730396562602918,0.19437589271648054,0.04014291738603735,0.06415219665199734,0.18585750652058486,0.006087794832220839,0.14547786250273817,0.07392527132169913,0.01012458069834854,0.15209697171787528,0.14473876918539763,0.19938411840409695,0.006583529521849352,0.04547741310534779,0.05350286406612064,0.06290997429206398,0.05640561357749743,0.014424846476545072,0.19495062700924756,0.1615960951767849,0.06677909347035786,0.04505750324692342,0.18628056500985932,0.01812440290612032,0.11690514185380732,0.010672788033556247,0.09621121151754389,0.08308999459545406,0.09298405222552152,0.1263521075551152,0.022365441129075236,0.1748230829226965,0.11297244310800814,0.160277908909849,0.14240590201348388,0.058654846858366,0.04181887625518699,0.09135445502757317,0.07811540907553063,0.04648260088756589,0.0665509073799702,0.14824238175820628,0.11326591154390826,0.17067795318631263,0.01547948948378637,0.06234255934015587,0.04477190783792904,0.02163196798531404,0.0017209453881541492,0.003511373997922718,0.10540953776615036,0.0012743894676906288,0.16549591496324015,0.07771836414607192,0.08019777179928203,0.10140006752922237,0.1890365831056151,0.012237972365580952,0.10407875342411038,0.11089852219074464,0.0570257188182159,0.1075862182310063,0.013859472083568214,0.07743223161926567,0.12413836264381942,0.17894217962470593,0.07544674265609488,0.1702735995691861,0.03287693447386286,0.08109527737614304,0.07183217484002631,0.1734066716813213,0.1113863239966591,0.14714907354050374,0.056295622075286204,0.03755951494001267,0.09750442412110388,0.10442813805358947,0.17747431448525988,0.10668848057210663,0.14106168768614072,0.15506199380703053,0.11647136929617918,0.06536531994342268,0.0010816867916000562,0.16662193312046591,0.18526781595374434,0.06859285395118934,0.1525665276129726,0.11166767951533854,0.18794999873829465,0.020262031775062184,0.13990224060596954,0.02844967858182215,0.03607535694206341,0.10504794858920095,0.07943954299282403,0.07983715343320688,0.04114077584116105,0.10168778047029853,0.09808873818260594,0.10750100038567992,0.019128247327151727,0.17802432362535617,0.10037859870674422,0.14164742096340555,0.010754602441532903,0.07773408146625119,0.06699910175873018,0.013854015188953196,0.19627353113957194,0.036067513373717344,0.14945001719703616,0.06183050004787183,0.010942768475403498,0.12465541786613904,0.03395458355571059,0.005517208130933771,0.18031319660923253,0.18296979131350796,0.03400582154552563,0.021346995038635044,0.11959409361167586,0.02501949405443864,0.17817551076015056,0.022586254280697427,0.130927703185376,0.021449816990146166,0.013143470155214533,0.11829262669881727,0.06640141939463273,0.18677794471265574,0.1188985920317871,0.007885550392565088,0.12004276457466681,0.19207514720593555,0.07156992420223798,0.11686775961064284,0.13751336160705346,0.08177984315402279,0.140359428241534,0.1141404942921279,0.16568478773181194,0.05742338212817804,0.10756310450685076,0.015625111349838728,0.10685782798757093,0.01896453900289301,0.13379494401365113,0.08809178434307668,0.17083043104901457,0.13957890034361867,0.08522884741276507,0.15001136794898018,0.19989667761309443,0.16867532219908352,0.0896613187196159,0.14526592896946391,0.1262067556096967,0.09656186394525999,0.11190184725518773,0.0008485542644053546,0.03063141058218002,0.11231979689666925,0.03914485601494531,0.06643706163022993,0.15249823828397813,0.09785619913154374,0.019474523642630272,0.19058977448069125,0.10858612896136677,0.17723883776940333,0.07682245927192413,0.08589599317104635,0.09354437119997888,0.07699662200698763,0.09486161913079126,0.16565433217227815,0.1841463773330191,0.14559552570682022,0.19493585997904775,0.10004729637170406,0.07342289294743956,0.007145970246208178,0.10929977095064386,0.19285080450089007,0.03065337173759284,0.06249242403982196,0.150600269693681,0.09170223052352733,0.1053161218835065,0.12608869208008255,0.18469841123885217,0.10455788472412549,0.08558513645017425,0.1357120489341712,0.13063212546817643,0.03793300608981962],"n":[8.0,2.0,7.0,6.0,17.0,4.0,2.0,10.0,8.0,11.0,8.0,8.0,16.0,8.0,9.0,19.0,9.0,13.0,5.0,18.0,8.0,19.0,7.0,18.0,10.0,9.0,1.0,8.0,19.0,3.0,5.0,6.0,8.0,18.0,3.0,3.0,15.0,15.0,12.0,5.0,20.0,5.0,19.0,14.0,6.0,12.0,15.0,4.0,6.0,2.0,7.0,14.0,11.0,9.0,9.0,7.0,13.0,6.0,16.0,11.0,14.0,6.0,12.0,3.0,13.0,1.0,0.0,4.0,0.0,11.0,19.0,0.0,17.0,6.0,0.0,15.0,15.0,2.0,4.0,20.0,13.0,13.0,2.0,5.0,14.0,14.0,3.0,9.0,15.0,18.0,15.0,10.0,16.0,10.0,14.0,8.0,20.0,3.0,7.0,3.0,13.0,15.0,10.0,13.0,2.0,7.0,10.0,15.0,12.0,13.0,16.0,10.0,8.0,4.0,12.0,11.0,18.0,11.0,20.0,16.0,2.0,8.0,18.0,15.0,12.0,5.0,11.0,6.0,11.0,1.0,8.0,6.0,19.0,18.0,1.0,15.0,12.0,18.0,9.0,1.0,7.0,10.0,19.0,14.0,12.0,17.0,4.0,17.0,16.0,4.0,7.0,12.0,15.0,18.0,12.0,6.0,10.0,7.0,2.0,16.0,15.0,12.0,18.0,1.0,5.0,18.0,13.0,5.0,18.0,12.0,18.0,19.0,11.0,13.0,19.0,9.0,16.0,15.0,11.0,10.0,9.0,12.0,13.0,14.0,20.0,16.0,2.0,11.0,6.0,3.0,16.0,8.0,18.0,3.0,6.0,14.0,15.0,13.0,14.0,10.0,16.0,9.0,4.0,11.0,15.0,7.0,1.0,13.0,9.0,8.0,7.0,18.0,12.0,5.0,14.0,8.0,8.0,1.0,8.0,17.0,10.0,8.0,2.0,19.0,4.0,11.0,6.0,11.0,3.0,18.0,16.0,12.0,20.0,14.0,12.0,0.0,18.0,20.0,10.0,14.0,17.0,8.0,10.0,2.0,16.0,8.0,16.0,5.0,14.0,12.0,17.0,20.0,2.0,12.0,7.0,6.0,4.0,3.0,8.0,17.0,10.0,17.0,6.0,12.0,2.0,6.0,11.0,9.0,20.0,11.0,15.0,15.0,6.0,5.0,17.0,16.0,18.0,14.0,8.0,6.0,0.0,5.0,14.0,20.0,12.0,15.0,4.0,2.0,13.0,4.0,11.0,10.0,12.0,14.0,13.0,16.0,6.0,2.0,15.0,3.0,19.0,16.0,15.0,7.0,18.0,6.0,6.0,8.0,13.0,19.0,2.0,8.0,1.0,5.0,13.0,3.0,4.0,16.0,9.0,10.0,3.0,10.0,18.0,9.0,13.0,17.0,0.0,11.0,8.0,7.0,17.0,5.0,2.0,13.0,10.0,4.0,10.0,10.0,20.0,10.0,18.0,7.0,17.0,4.0,1.0,19.0,6.0,1.0,18.0,12.0,12.0,2.0,13.0,9.0,20.0,1.0,14.0,7.0,6.0,6.0,11.0,6.0,19.0,10.0,8.0,20.0,2.0,19.0,9.0,14.0,0.0,13.0,8.0,8.0,3.0,2.0,1.0,7.0,10.0,4.0,18.0,1.0,1.0,4.0,7.0,15.0,16.0,13.0,5.0,4.0,7.0,12.0,16.0,3.0,0.0,12.0,18.0,9.0,13.0,14.0,12.0,12.0,18.0,14.0,15.0,18.0,14.0,14.0,18.0,14.0,10.0,12.0,14.0,10.0,5.0,10.0,7.0,15.0,14.0,2.0,14.0,18.0,6.0,20.0,19.0,11.0,14.0,17.0,15.0,11.0,19.0,16.0,5.0,11.0,12.0,13.0,14.0,12.0,1.0,15.0,17.0,9.0,3.0,7.0,7.0,13.0,1.0,10.0,18.0,6.0,12.0,3.0,17.0,2.0,8.0,4.0,12.0,17.0,17.0,17.0,5.0,8.0,5.0,20.0,19.0,2.0,4.0,7.0,12.0,18.0,15.0,19.0,2.0,10.0,17.0,12.0,13.0,15.0,16.0,8.0,9.0,8.0,15.0,1.0,1.0,11.0,9.0,20.0,5.0,4.0,4.0,16.0,18.0,15.0,18.0,13.0,7.0,8.0,19.0,12.0,6.0,13.0,9.0,16.0,2.0,15.0,4.0,15.0,14.0,9.0,6.0,8.0,10.0,4.0,9.0,10.0,4.0,19.0,17.0,20.0,18.0,13.0,8.0,12.0,17.0,10.0,13.0,6.0,2.0,19.0,8.0,11.0,13.0,7.0,15.0,8.0,16.0,20.0,4.0,3.0,11.0,15.0,1.0,0.0,0.0,10.0,4.0,10.0,6.0,1.0,17.0,16.0,16.0,14.0,2.0,14.0,15.0,1.0,16.0,10.0,12.0,16.0,11.0,9.0,0.0,18.0,8.0,19.0,18.0,4.0,3.0,3.0,14.0,2.0,12.0,12.0,5.0,19.0,6.0,2.0,9.0,10.0,9.0,3.0,17.0,3.0,4.0,2.0,6.0,6.0,4.0,3.0,14.0,12.0,8.0,16.0,9.0,16.0,3.0,6.0,17.0,1.0,17.0,9.0,19.0,19.0,0.0,8.0,7.0,12.0,12.0,17.0,1.0,14.0,19.0,17.0,10.0,6.0,5.0,19.0,19.0,20.0,17.0,13.0,13.0,14.0,1.0,13.0,0.0,1.0,4.0,18.0,14.0,10.0,16.0,16.0,17.0,18.0,13.0,12.0,1.0,8.0,8.0,19.0,0.0,15.0,9.0,12.0,3.0,7.0,7.0,9.0,13.0,4.0,9.0,9.0,9.0,4.0,11.0,7.0,0.0,17.0,19.0,14.0,6.0,18.0,8.0,1.0,3.0,19.0,6.0,0.0,4.0,15.0,2.0,19.0,17.0,3.0,1.0,14.0,13.0,1.0,17.0,16.0,5.0,3.0,13.0,17.0,19.0,0.0,5.0,14.0,4.0,15.0,11.0,1.0,5.0,10.0,1.0,1.0,4.0,4.0,2.0,10.0,11.0,11.0,15.0,1.0,12.0,12.0,15.0,15.0,14.0,14.0,19.0,17.0,7.0,3.0,2.0,4.0,17.0,12.0,10.0,4.0,2.0,8.0,10.0,7.0,10.0,14.0,11.0,3.0,8.0,11.0,14.0,11.0,2.0,10.0,3.0,0.0,2.0,3.0,18.0,2.0,17.0,12.0,14.0,11.0,4.0,17.0,9.0,4.0,6.0,11.0,15.0,11.0,4.0,1.0,2.0,11.0,10.0,19.0,15.0,4.0,14.0,0.0,17.0,17.0,0.0,6.0,6.0,20.0,7.0,13.0,11.0,10.0,8.0,2.0,2.0,8.0,16.0,12.0,18.0,11.0,11.0,12.0,20.0,4.0,16.0,5.0,1.0,11.0,19.0,7.0,16.0,13.0,17.0,12.0,0.0,7.0,2.0,17.0,2.0,19.0,7.0,10.0,11.0,15.0,15.0,18.0,19.0,18.0,17.0,4.0,1.0,9.0,13.0,3.0,18.0,10.0,7.0,7.0,14.0,12.0,0.0,6.0,7.0,8.0,16.0,13.0,13.0,10.0,6.0,7.0,17.0,19.0,9.0,2.0,17.0,5.0,18.0,17.0,11.0,8.0,3.0,18.0,15.0,13.0,17.0,4.0,6.0,13.0,15.0,2.0,15.0,0.0,1.0,16.0,13.0,4.0,7.0,13.0,16.0,4.0,16.0,12.0,1.0,7.0,6.0,8.0,17.0,10.0,6.0,17.0,2.0,20.0,11.0,19.0,2.0,0.0,11.0,7.0,12.0,12.0,5.0,1.0,1.0,3.0,1.0,11.0,9.0,9.0,20.0,1.0,16.0,20.0,20.0,15.0,4.0,7.0,15.0,11.0,9.0,5.0,17.0,11.0,5.0,6.0,6.0,3.0,8.0,8.0,12.0,15.0,1.0,5.0,0.0,13.0,18.0,14.0,17.0,17.0,12.0,8.0,1.0,4.0,20.0,11.0,1.0,18.0,5.0,8.0,19.0,8.0,1.0,17.0,16.0,3.0,5.0,0.0,4.0,4.0,14.0,10.0,13.0,5.0,10.0,2.0,4.0,5.0,9.0,15.0,1.0,8.0,15.0,5.0,18.0,17.0,14.0,3.0,12.0,10.0,11.0,14.0,14.0,7.0,3.0,16.0,7.0,1.0,18.0,7.0,2.0,18.0,11.0,12.0,16.0,19.0,14.0,12.0,3.0,20.0,2.0,6.0,5.0,10.0,4.0,11.0,0.0,9.0,11.0,1.0,0.0,19.0,11.0,1.0,18.0,5.0,14.0,4.0]}
},{}],66:[function(require,module,exports){
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

var smallSmall = require( './fixtures/julia/small_small.json' );
var smallHigh = require( './fixtures/julia/small_high.json' );
var highSmall = require( './fixtures/julia/high_small.json' );
var highHigh = require( './fixtures/julia/high_high.json' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.equal( typeof factory, 'function', 'main export is a function' );
	t.end();
});

tape( 'the function returns a function', function test( t ) {
	var pmf = factory( 20, 0.5 );
	t.equal( typeof pmf, 'function', 'returns a function' );
	t.end();
});

tape( 'if provided `NaN` for any parameter, the created function returns `NaN`', function test( t ) {
	var pmf;
	var y;

	pmf = factory( 20, 0.5 );
	y = pmf( NaN );
	t.equal( isnan( y ), true, 'returns NaN' );

	pmf = factory( NaN, 0.5 );
	y = pmf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	pmf = factory( 20, NaN );
	y = pmf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	pmf = factory( NaN, NaN );
	y = pmf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	pmf = factory( NaN, NaN );
	y = pmf( NaN );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'if provided a valid `n` and `p`, the function returns a function which returns `0` when provided a negative integer for `x`', function test( t ) {
	var pmf;
	var y;

	pmf = factory( 20, 0.5 );
	y = pmf( NINF );
	t.equal( y, 0.0, 'returns 0' );

	y = pmf( -20.0 );
	t.equal( y, 0.0, 'returns 0' );

	y = pmf( -10.0 );
	t.equal( y, 0.0, 'returns 0' );

	y = pmf( -1.0 );
	t.equal( y, 0.0, 'returns 0' );

	t.end();
});

tape( 'if provided a valid `n` and `p`, the function returns a function which returns `0` when provided a non-integer for `x`', function test( t ) {
	var pmf;
	var y;

	pmf = factory( 20, 0.5 );
	y = pmf( -2.5 );
	t.equal( y, 0.0, 'returns 0' );

	y = pmf( -1.5 );
	t.equal( y, 0.0, 'returns 0' );

	y = pmf( 0.5 );
	t.equal( y, 0.0, 'returns 0' );

	y = pmf( 1.2 );
	t.equal( y, 0.0, 'returns 0' );

	t.end();
});

tape( 'if provided a valid `n` and `p`, the function returns a function which returns `0` for all `x` larger than `n`', function test( t ) {
	var pmf;
	var y;

	pmf = factory( 20, 0.5 );
	y = pmf( 21.0 );
	t.equal( y, 0.0, 'returns 0' );

	y = pmf( 22.0 );
	t.equal( y, 0.0, 'returns 0' );

	y = pmf( 50.0 );
	t.equal( y, 0.0, 'returns 0' );

	y = pmf( PINF );
	t.equal( y, 0.0, 'returns 0' );

	t.end();
});

tape( 'if provided a success probability `p` outside `[0,1]`, the created function always returns `NaN`', function test( t ) {
	var pmf;
	var y;

	pmf = factory( 20, 1.2 );

	y = pmf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = pmf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	pmf = factory( 20, -0.1 );
	y = pmf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	pmf = factory( 20, NINF );
	y = pmf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	pmf = factory( 20, PINF );
	y = pmf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'if provided a `n` which is not a nonnegative integer, the created function always returns `NaN`', function test( t ) {
	var pmf;
	var y;

	pmf = factory( -1.0, 0.5 );

	y = pmf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = pmf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	pmf = factory( 1.5, 0.5 );
	y = pmf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	pmf = factory( NINF, 0.5 );
	y = pmf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	pmf = factory( PINF, 0.5 );
	y = pmf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'if `p` or `n` equals `0`, the created function evaluates a degenerate distribution centered at `0.0`', function test( t ) {
	var pmf;
	var y;

	pmf = factory( 8, 0.0 );

	y = pmf( 0.0 );
	t.equal( y, 1.0, 'returns 1 for x equal to 0' );

	y = pmf( 1.0 );
	t.equal( y, 0.0, 'returns 0' );

	y = pmf( PINF );
	t.equal( y, 0.0, 'returns 0' );

	y = pmf( NINF );
	t.equal( y, 0.0, 'returns 0' );

	y = pmf( NaN );
	t.equal( isnan( y ), true, 'returns NaN' );

	pmf = factory( 0.0, 0.5 );

	y = pmf( 0.0 );
	t.equal( y, 1.0, 'returns 1 for x equal to 0' );

	y = pmf( 1.0 );
	t.equal( y, 0.0, 'returns 0' );

	y = pmf( PINF );
	t.equal( y, 0.0, 'returns 0' );

	y = pmf( NINF );
	t.equal( y, 0.0, 'returns 0' );

	y = pmf( NaN );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'if `p` equals `1.0`, the created function evaluates a degenerate distribution centered at `n`', function test( t ) {
	var pmf;
	var y;

	pmf = factory( 8, 1.0 );

	y = pmf( 8.0 );
	t.equal( y, 1.0, 'returns 1 for x equal to 8' );

	y = pmf( 1.0 );
	t.equal( y, 0.0, 'returns 0' );

	y = pmf( PINF );
	t.equal( y, 0.0, 'returns 0' );

	y = pmf( NINF );
	t.equal( y, 0.0, 'returns 0' );

	y = pmf( NaN );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'the created function evaluates the pmf for `x` given large `n` and `p`', function test( t ) {
	var expected;
	var delta;
	var pmf;
	var tol;
	var x;
	var n;
	var p;
	var y;
	var i;

	expected = highHigh.expected;
	x = highHigh.x;
	n = highHigh.n;
	p = highHigh.p;
	for ( i = 0; i < x.length; i++ ) {
		pmf = factory( n[i], p[i] );
		y = pmf( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', n: '+n[i]+', p: '+p[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[i] );
			tol = 260.0 * EPS * abs( expected[i] );
			t.strictEqual( delta <= tol, true, 'within tolerance. x: '+x[i]+'. n: '+n[i]+'. p: '+p[i]+'. y: '+y+'. Expected: '+expected[i]+'. tol: '+tol+'. delta: '+delta+'.' );
		}
	}
	t.end();
});

tape( 'the created function evaluates the pmf for `x` given a large `n` and small `p`', function test( t ) {
	var expected;
	var delta;
	var pmf;
	var tol;
	var i;
	var n;
	var p;
	var x;
	var y;

	expected = highSmall.expected;
	x = highSmall.x;
	n = highSmall.n;
	p = highSmall.p;
	for ( i = 0; i < x.length; i++ ) {
		pmf = factory( n[i], p[i] );
		y = pmf( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', n: '+n[i]+', p: '+p[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[i] );
			tol = 270.0 * EPS * abs( expected[i] );
			t.strictEqual( delta <= tol, true, 'within tolerance. x: '+x[i]+'. n: '+n[i]+'. p: '+p[i]+'. y: '+y+'. Expected: '+expected[i]+'. tol: '+tol+'. delta: '+delta+'.' );
		}
	}
	t.end();
});

tape( 'the created function evaluates the pmf for `x` given small `n` and large `p`', function test( t ) {
	var expected;
	var delta;
	var pmf;
	var tol;
	var i;
	var n;
	var p;
	var x;
	var y;

	expected = smallHigh.expected;
	x = smallHigh.x;
	n = smallHigh.n;
	p = smallHigh.p;
	for ( i = 0; i < x.length; i++ ) {
		pmf = factory( n[i], p[i] );
		y = pmf( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', n: '+n[i]+', p: '+p[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[i] );
			tol = 80.0 * EPS * abs( expected[i] );
			t.strictEqual( delta <= tol, true, 'within tolerance. x: '+x[i]+'. n: '+n[i]+'. p: '+p[i]+'. y: '+y+'. Expected: '+expected[i]+'. tol: '+tol+'. delta: '+delta+'.' );
		}
	}
	t.end();
});

tape( 'the created function evaluates the pmf for `x` given small `n` and `p`', function test( t ) {
	var expected;
	var delta;
	var pmf;
	var tol;
	var i;
	var n;
	var p;
	var x;
	var y;

	expected = smallSmall.expected;
	x = smallSmall.x;
	n = smallSmall.n;
	p = smallSmall.p;
	for ( i = 0; i < x.length; i++ ) {
		pmf = factory( n[i], p[i] );
		y = pmf( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', n: '+n[i]+', p: '+p[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[i] );
			tol = 100.0 * EPS * abs( expected[i] );
			t.strictEqual( delta <= tol, true, 'within tolerance. x: '+x[i]+'. n: '+n[i]+'. p: '+p[i]+'. y: '+y+'. Expected: '+expected[i]+'. tol: '+tol+'. delta: '+delta+'.' );
		}
	}
	t.end();
});

}).call(this,"/lib/node_modules/@stdlib/math/base/dists/binomial/pmf/test/test.factory.js")
},{"./../lib/factory.js":59,"./fixtures/julia/high_high.json":62,"./fixtures/julia/high_small.json":63,"./fixtures/julia/small_high.json":64,"./fixtures/julia/small_small.json":65,"@stdlib/constants/math/float64-eps":26,"@stdlib/constants/math/float64-ninf":35,"@stdlib/constants/math/float64-pinf":37,"@stdlib/math/base/assert/is-nan":49,"@stdlib/math/base/special/abs":73,"tape":258}],67:[function(require,module,exports){
(function (__filename){
'use strict';

// MODULES //

var tape = require( 'tape' );
var pmf = require( './../lib' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.equal( typeof pmf, 'function', 'main export is a function' );
	t.end();
});

tape( 'attached to the main export is a factory method for generating `pmf` functions', function test( t ) {
	t.equal( typeof pmf.factory, 'function', 'exports a factory method' );
	t.end();
});

}).call(this,"/lib/node_modules/@stdlib/math/base/dists/binomial/pmf/test/test.js")
},{"./../lib":60,"tape":258}],68:[function(require,module,exports){
(function (__filename){
'use strict';

// MODULES //

var tape = require( 'tape' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var abs = require( '@stdlib/math/base/special/abs' );
var PINF = require( '@stdlib/constants/math/float64-pinf' );
var NINF = require( '@stdlib/constants/math/float64-ninf' );
var EPS = require( '@stdlib/constants/math/float64-eps' );
var pmf = require( './../lib' );


// FIXTURES //

var smallSmall = require( './fixtures/julia/small_small.json' );
var smallHigh = require( './fixtures/julia/small_high.json' );
var highSmall = require( './fixtures/julia/high_small.json' );
var highHigh = require( './fixtures/julia/high_high.json' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.equal( typeof pmf, 'function', 'main export is a function' );
	t.end();
});

tape( 'if provided `NaN` for any parameter, the function returns `NaN`', function test( t ) {
	var y = pmf( NaN, 20, 0.5 );
	t.equal( isnan( y ), true, 'returns NaN' );
	y = pmf( 0.0, NaN, 0.5 );
	t.equal( isnan( y ), true, 'returns NaN' );
	y = pmf( 0.0, 20, NaN );
	t.equal( isnan( y ), true, 'returns NaN' );
	t.end();
});

tape( 'if provided a negative integer for `x` and a valid `n` and `p`, the function returns `0`', function test( t ) {
	var y = pmf( NINF, 20, 0.5 );
	t.equal( y, 0.0, 'returns 0' );

	y = pmf( -20.0, 20, 0.5 );
	t.equal( y, 0.0, 'returns 0' );

	y = pmf( -100.0, 20, 0.5 );
	t.equal( y, 0.0, 'returns 0' );

	y = pmf( -1.0, 20, 0.5 );
	t.equal( y, 0.0, 'returns 0' );

	t.end();
});

tape( 'if provided a non-integer for `x` and a valid `n` and `p`, the function returns `0`', function test( t ) {
	var y = pmf( -1.5, 20, 0.5 );
	t.equal( y, 0.0, 'returns 0' );

	y = pmf( -0.5, 20, 0.5 );
	t.equal( y, 0.0, 'returns 0' );

	y = pmf( 1.5, 20, 0.5 );
	t.equal( y, 0.0, 'returns 0' );

	y = pmf( 2.5, 20, 0.5 );
	t.equal( y, 0.0, 'returns 0' );

	t.end();
});

tape( 'if provided `n` which is not a nonnegative integer, the function returns `NaN`', function test( t ) {
	var y;

	y = pmf( 2.0, 1.5, 0.5 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = pmf( 0.0, -1.0, 0.5 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = pmf( 2.0, NINF, 0.5 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = pmf( 2.0, PINF, 0.5 );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'if provided a success probability `p` outside of `[0,1]`, the function returns `NaN`', function test( t ) {
	var y;

	y = pmf( 2.0, 20, -1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = pmf( 0.0, 20, 1.5 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = pmf( 2.0, 20, NINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = pmf( 2.0, 20, PINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'if `p` or `n` equals `0`, the function evaluates a degenerate distribution centered at `0.0`', function test( t ) {
	var y;

	// Case: n = 8, p = 0.0
	y = pmf( 0.0, 8, 0.0 );
	t.equal( y, 1.0, 'returns 1 for x equal to 0' );

	y = pmf( 1.0, 8, 0.0 );
	t.equal( y, 0.0, 'returns 0' );

	y = pmf( PINF, 8, 0.0 );
	t.equal( y, 0.0, 'returns 0' );

	y = pmf( NINF, 8, 0.0 );
	t.equal( y, 0.0, 'returns 0' );

	y = pmf( NaN, 8, 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	// Case: n = 0, p = 0.5
	y = pmf( 0.0, 0, 0.5 );
	t.equal( y, 1.0, 'returns 1 for x equal to 0' );

	y = pmf( 1.0, 0, 0.5 );
	t.equal( y, 0.0, 'returns 0' );

	y = pmf( PINF, 0, 0.5 );
	t.equal( y, 0.0, 'returns 0' );

	y = pmf( NINF, 0, 0.5 );
	t.equal( y, 0.0, 'returns 0' );

	y = pmf( NaN, 0, 0.5 );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'if `p` equals `1.0`, the function evaluates a degenerate distribution centered at `n`', function test( t ) {
	var y;

	y = pmf( 8.0, 8, 1.0 );
	t.equal( y, 1.0, 'returns 1 for x equal to 8' );

	y = pmf( 1.0, 8, 1.0 );
	t.equal( y, 0.0, 'returns 0' );

	y = pmf( PINF, 8, 1.0 );
	t.equal( y, 0.0, 'returns 0' );

	y = pmf( NINF, 8, 1.0 );
	t.equal( y, 0.0, 'returns 0' );

	y = pmf( NaN, 8, 1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'the function evaluates the pmf for `x` given large `n` and `p`', function test( t ) {
	var expected;
	var delta;
	var tol;
	var i;
	var n;
	var p;
	var x;
	var y;

	expected = highHigh.expected;
	x = highHigh.x;
	n = highHigh.n;
	p = highHigh.p;
	for ( i = 0; i < x.length; i++ ) {
		y = pmf( x[i], n[i], p[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', n: '+n[i]+', p: '+p[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[i] );
			tol = 260.0 * EPS * abs( expected[i] );
			t.strictEqual( delta <= tol, true, 'within tolerance. x: '+x[i]+'. n: '+n[i]+'. p: '+p[i]+'. y: '+y+'. Expected: '+expected[i]+'. tol: '+tol+'. delta: '+delta+'.' );
		}
	}
	t.end();
});

tape( 'the function evaluates the pmf for `x` given large `n` and small `p`', function test( t ) {
	var expected;
	var delta;
	var tol;
	var n;
	var p;
	var i;
	var x;
	var y;

	expected = highSmall.expected;
	x = highSmall.x;
	n = highSmall.n;
	p = highSmall.p;
	for ( i = 0; i < x.length; i++ ) {
		y = pmf( x[i], n[i], p[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', n: '+n[i]+', p: '+p[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[i] );
			tol = 270.0 * EPS * abs( expected[i] );
			t.strictEqual( delta <= tol, true, 'within tolerance. x: '+x[i]+'. n: '+n[i]+'. p: '+p[i]+'. y: '+y+'. Expected: '+expected[i]+'. tol: '+tol+'. delta: '+delta+'.' );
		}
	}
	t.end();
});

tape( 'the function evaluates the pmf for `x` given small `n` and large `p`', function test( t ) {
	var expected;
	var delta;
	var tol;
	var i;
	var n;
	var p;
	var x;
	var y;

	expected = smallHigh.expected;
	x = smallHigh.x;
	n = smallHigh.n;
	p = smallHigh.p;
	for ( i = 0; i < x.length; i++ ) {
		y = pmf( x[i], n[i], p[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', n: '+n[i]+', p: '+p[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[i] );
			tol = 80.0 * EPS * abs( expected[i] );
			t.strictEqual( delta <= tol, true, 'within tolerance. x: '+x[i]+'. n: '+n[i]+'. p: '+p[i]+'. y: '+y+'. Expected: '+expected[i]+'. tol: '+tol+'. delta: '+delta+'.' );
		}
	}
	t.end();
});

tape( 'the function evaluates the pmf for `x` given small `n` and `p`', function test( t ) {
	var expected;
	var delta;
	var tol;
	var i;
	var n;
	var p;
	var x;
	var y;

	expected = smallSmall.expected;
	x = smallSmall.x;
	n = smallSmall.n;
	p = smallSmall.p;
	for ( i = 0; i < x.length; i++ ) {
		y = pmf( x[i], n[i], p[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', n: '+n[i]+', p: '+p[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[i] );
			tol = 100.0 * EPS * abs( expected[i] );
			t.strictEqual( delta <= tol, true, 'within tolerance. x: '+x[i]+'. n: '+n[i]+'. p: '+p[i]+'. y: '+y+'. Expected: '+expected[i]+'. tol: '+tol+'. delta: '+delta+'.' );
		}
	}
	t.end();
});

}).call(this,"/lib/node_modules/@stdlib/math/base/dists/binomial/pmf/test/test.pmf.js")
},{"./../lib":60,"./fixtures/julia/high_high.json":62,"./fixtures/julia/high_small.json":63,"./fixtures/julia/small_high.json":64,"./fixtures/julia/small_small.json":65,"@stdlib/constants/math/float64-eps":26,"@stdlib/constants/math/float64-ninf":35,"@stdlib/constants/math/float64-pinf":37,"@stdlib/math/base/assert/is-nan":49,"@stdlib/math/base/special/abs":73,"tape":258}],69:[function(require,module,exports){
'use strict';

// MODULES //

var constantFunction = require( '@stdlib/utils/constant-function' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );


// MAIN //

/**
* Returns a function for evaluating the probability mass function (PMF) of a degenerate distribution centered at a provided mean value.
*
* @param {number} mu - value at which to center the distribution
* @returns {Function} function to evaluate the probability mass function
*
* @example
* var pmf = factory( 5.0 );
*
* var y = pmf( 0.0 );
* // returns 0.0
*
* y = pmf( 5.0 );
* // returns 1.0
*/
function factory( mu ) {
	if ( isnan( mu ) ) {
		return constantFunction( NaN );
	}
	return pmf;

	/**
	* Evaluates the probability mass function (PMF) of a degenerate distribution.
	*
	* @private
	* @param {number} x - input value
	* @returns {number} evaluated PMF
	*
	* @example
	* var y = pmf( 10.0 );
	* // returns <number>
	*/
	function pmf( x ) {
		if ( isnan( x ) ) {
			return NaN;
		}
		return ( x === mu ) ? 1.0 : 0.0;
	}
}


// EXPORTS //

module.exports = factory;

},{"@stdlib/math/base/assert/is-nan":49,"@stdlib/utils/constant-function":180}],70:[function(require,module,exports){
'use strict';

/**
* Degenerate distribution probability mass function (PDF).
*
* @module @stdlib/math/base/dists/degenerate/pmf
*
* @example
* var pmf = require( '@stdlib/math/base/dists/degenerate/pmf' );
*
* var y = pmf( 2.0, 0.0 );
* // returns 0.0
*
* @example
* var factory = require( '@stdlib/math/base/dists/degenerate/pmf' ).factory;
*
* var pmf = factory( 10.0 );
*
* var y = pmf( 10.0 );
* // returns 1.0
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-read-only-property' );
var pmf = require( './pmf.js' );
var factory = require( './factory.js' );


// MAIN //

setReadOnly( pmf, 'factory', factory );


// EXPORTS //

module.exports = pmf;

},{"./factory.js":69,"./pmf.js":71,"@stdlib/utils/define-read-only-property":182}],71:[function(require,module,exports){
'use strict';

// MODULES //

var isnan = require( '@stdlib/math/base/assert/is-nan' );


// MAIN //

/**
* Evaluates the probability mass function (PMF) for a degenerate distribution centered at `mu`.
*
* @param {number} x - input value
* @param {number} mu - constant value of the distribution
* @returns {number} evaluated probability mass function
*
* @example
* var y = pmf( 2.0, 3.0 );
* // returns 0.0
* @example
* var y = pmf( 3.0, 3.0 );
* // returns 1.0
* @example
* var y = pmf( NaN, 0.0 );
* // returns NaN
* @example
* var y = pmf( 0.0, NaN );
* // returns NaN
*/
function pmf( x, mu ) {
	if ( isnan( x ) || isnan( mu ) ) {
		return NaN;
	}
	return ( x === mu ) ? 1.0 : 0.0;
}


// EXPORTS //

module.exports = pmf;

},{"@stdlib/math/base/assert/is-nan":49}],72:[function(require,module,exports){
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

},{}],73:[function(require,module,exports){
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

},{"./abs.js":72}],74:[function(require,module,exports){
'use strict';

/*
* The code is adapted from the Fortran routine from the FNLIB library of the [SLATEC Common Mathematical Library]{@link http://www.netlib.no/netlib/slatec/fnlib/albeta.f}.
*
* The original code was developed by W. Fullerton of Los Alamos Scientific Laboratory, a governmental institution, and is therefore public domain software.
*/

// MODULES //

var gammaln = require( '@stdlib/math/base/special/gammaln' );
var log1p = require( '@stdlib/math/base/special/log1p' );
var gamma = require( '@stdlib/math/base/special/gamma' );
var max = require( '@stdlib/math/base/special/max' );
var min = require( '@stdlib/math/base/special/min' );
var ln = require( '@stdlib/math/base/special/ln' );
var LN_SQRT_TWO_PI = require( '@stdlib/constants/math/float64-ln-sqrt-two-pi' );
var NINF = require( '@stdlib/constants/math/float64-ninf' );
var PINF = require( '@stdlib/constants/math/float64-pinf' );
var correction = require( './gamma_correction.js' );


// MAIN //

/**
* Evaluate the natural logarithm of the beta function.
*
* @param {NonNegativeNumber} a - first input value
* @param {NonNegativeNumber} b - second input value
* @returns {number} natural logarithm of beta function
*
* @example
* var v = betaln( 0.0, 0.0 );
* // returns Infinity
*
* @example
* var v = betaln( 1.0, 1.0 );
* // returns 0.0
*
* @example
* var v = betaln( -1.0, 2.0 );
* // returns NaN
*
* @example
* var v = betaln( 5.0, 0.2 );
* // returns ~1.218
*
* @example
* var v = betaln( 4.0, 1.0 );
* // returns ~-1.386
*
* @example
* var v = betaln( NaN, 2.0 );
* // returns NaN
*/
function betaln( a, b ) {
	var corr;
	var p;
	var q;

	p = min( a, b );
	q = max( a, b );

	if ( p < 0.0 ) {
		return NaN;
	}
	else if ( p === 0.0 ) {
		return PINF;
	}
	else if ( q === PINF ) {
		return NINF;
	}
	// Case: p and q are big
	if ( p >= 10.0 ) {
		corr = correction( p ) + correction( q ) - correction( p+q );
		return ( -0.5*ln( q ) ) + LN_SQRT_TWO_PI + corr + ( (p-0.5) * ln( p/(p+q) ) ) + ( q*log1p( -p/(p+q) ) ); // eslint-disable-line max-len
	}
	// Case: p is small, but q is big
	else if ( q >= 10.0 ) {
		corr = correction( q ) - correction( p+q );
		return gammaln( p ) + corr + p - (p*ln( p+q )) + ( (q-0.5)*log1p( -p/(p+q) ) ); // eslint-disable-line max-len
	}
	// Case: p and q are small
	return ln( gamma( p ) * ( gamma( q ) / gamma( p+q ) ) );
}


// EXPORTS //

module.exports = betaln;

},{"./gamma_correction.js":76,"@stdlib/constants/math/float64-ln-sqrt-two-pi":30,"@stdlib/constants/math/float64-ninf":35,"@stdlib/constants/math/float64-pinf":37,"@stdlib/math/base/special/gamma":93,"@stdlib/math/base/special/gammaln":99,"@stdlib/math/base/special/ln":118,"@stdlib/math/base/special/log1p":122,"@stdlib/math/base/special/max":125,"@stdlib/math/base/special/min":127}],75:[function(require,module,exports){
'use strict';

/*
* The code is adapted from the Fortran routine `dcseval` from the FNLIB library of the [SLATEC Common Mathematical Library]{@link http://www.netlib.org/slatec/fnlib/}.
*
* The original code was developed by W. Fullerton of Los Alamos Scientific Laboratory, a governmental institution, and is therefore public domain software.
*/

// VARIABLES //

var ALGMCS = [
	+0.1276642195630062933333333333333e-30,
	-0.3401102254316748799999999999999e-29,
	+0.1025680058010470912000000000000e-27,
	-0.3547598158101070547199999999999e-26,
	+0.1429227355942498147573333333333e-24,
	-0.6831888753985766870111999999999e-23,
	+0.3962837061046434803679306666666e-21,
	-0.2868042435334643284144622399999e-19,
	+0.2683181998482698748957538846666e-17,
	-0.3399615005417721944303330599666e-15,
	+0.6221098041892605227126015543416e-13,
	-0.1809129475572494194263306266719e-10,
	+0.9810825646924729426157171547487e-8,
	-0.1384948176067563840732986059135e-4,
	+0.1666389480451863247205729650822e+0
];
var LEN = ALGMCS.length;


// MAIN //

/**
* Evaluate the n-term Chebyshev series at `x`.
*
* ## References
*
* -   Broucke, Roger. 1973. "Algorithm: Ten Subroutines for the Manipulation of Chebyshev Series." *Communications of the ACM* 16 (4). New York, NY, USA: ACM: 254–56. doi:[10.1145/362003.362037](https://doi.org/10.1145/362003.362037).
* -   Fox, Leslie, and Ian Bax Parker. 1968. *Chebyshev polynomials in numerical analysis*. Oxford Mathematical Handbooks. London, United Kingdom: Oxford University Press. <https://books.google.com/books?id=F8NzsEtJCD0C>.
*
* @private
* @param {number} x - value at which the series is to be evaluated
* @returns {number} series value
*/
function dcseval( x ) {
	var twox;
	var b2;
	var b1;
	var b0;
	var i;

	if ( x < -1.1 || x > 1.1 ) {
		return NaN;
	}
	b1 = 0.0;
	b0 = 0.0;
	twox = 2.0 * x;
	for ( i = 0; i < LEN; i++ ) {
		b2 = b1;
		b1 = b0;
		b0 = (twox*b1) - b2 + ALGMCS[ i ];
	}
	return ( b0-b2 ) * 0.5;
}


// EXPORTS //

module.exports = dcseval;

},{}],76:[function(require,module,exports){
'use strict';

/*
* The code is adapted from the Fortran routine from [netlib]{@link http://www.netlib.no/netlib/fn/d9lgmc.f}.
*
* The original code was developed by W. Fullerton of Los Alamos Scientific Laboratory, a governmental institution, and is therefore public domain software.
*/

// MODULES //

var pow = require( '@stdlib/math/base/special/pow' );
var dceval = require( './dceval.js' );


// VARIABLES //

var XBIG = 94906265.62425156;
var XMAX = 3.745194030963158e306;


// MAIN //

/**
* Compute the log gamma correction factor for `x >= 10`.
*
* ```tex
* \log(\gamma(x)) = \log(\sqrt{2*\Pi}) + (x-0.5) \cdot \log(x) - x \operatorname{R9LGMC}(x).
* ```
*
* @private
* @param {number} x - input value
* @returns {number} correction value
*/
function gammaCorrection( x ) {
	if ( x < 10.0 ) {
		return NaN;
	}
	// Check for underflow...
	if ( x >= XMAX ) {
		return 0.0;
	}
	if ( x < XBIG ) {
		return dceval( (2.0*pow( 10.0/x, 2.0 )) - 1.0 ) / x;
	}
	return 1.0 / (x * 12.0);
}


// EXPORTS //

module.exports = gammaCorrection;

},{"./dceval.js":75,"@stdlib/math/base/special/pow":129}],77:[function(require,module,exports){
'use strict';

/**
* Evaluate the natural logarithm of the beta function.
*
* @module @stdlib/math/base/special/betaln
*
* @example
* var betaln = require( '@stdlib/math/base/special/betaln' );
*
* var v = betaln( 0.0, 0.0 );
* // returns Infinity
*
* v = betaln( 1.0, 1.0 );
* // returns 0.0
*
* v = betaln( -1.0, 2.0 );
* // returns NaN
*
* v = betaln( 5.0, 0.2 );
* // returns ~1.218
*
* v = betaln( 4.0, 1.0 );
* // returns ~-1.386
*
* v = betaln( NaN, 2.0 );
* // returns NaN
*/

// MODULES //

var betaln = require( './betaln.js' );


// EXPORTS //

module.exports = betaln;

},{"./betaln.js":74}],78:[function(require,module,exports){
'use strict';

// MODULES //

var isInteger = require( '@stdlib/math/base/assert/is-integer' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var betaln = require( '@stdlib/math/base/special/betaln' );
var abs = require( '@stdlib/math/base/special/abs' );
var ln = require( '@stdlib/math/base/special/ln' );
var NINF = require( '@stdlib/constants/math/float64-ninf' );


// MAIN //

/**
* Computes the natural logarithm of the binomial coefficient of two integers.
*
* @param {integer} n - input value
* @param {integer} k - second input value
* @returns {number} function value
*
* @example
* var v = binomcoefln( 8, 2 );
* // returns ~3.332
*
* @example
* var v = binomcoefln( 0, 0 );
* // returns 0.0
*
* @example
* var v = binomcoefln( -4, 2 );
* // returns ~2.302
*
* @example
* var v = binomcoefln( 88, 3 );
* // returns ~11.606
*
* @example
* var v = binomcoefln( NaN, 3 );
* // returns NaN
*
* @example
* var v = binomcoefln( 5, NaN );
* // returns NaN
*
* @example
* var v = binomcoefln( NaN, NaN );
* // returns NaN
*/
function binomcoefln( n, k ) {
	if ( isnan( n ) || isnan( k ) ) {
		return NaN;
	}
	if ( !isInteger( n ) || !isInteger( k ) ) {
		return NaN;
	}
	if ( n < 0.0 ) {
		return binomcoefln( -n + k - 1.0, k );
	}
	if ( k < 0 ) {
		return NINF;
	}
	if ( k === 0 ) {
		return 0.0;
	}
	if ( k === 1 ) {
		return ln( abs( n ) );
	}
	if ( n < k ) {
		return NINF;
	}
	if ( n - k < 2 ) {
		return binomcoefln( n, n - k );
	}
	// Case: n - k >= 2
	return -ln( n + 1 ) - betaln( n - k + 1, k + 1 );
}


// EXPORTS //

module.exports = binomcoefln;

},{"@stdlib/constants/math/float64-ninf":35,"@stdlib/math/base/assert/is-integer":47,"@stdlib/math/base/assert/is-nan":49,"@stdlib/math/base/special/abs":73,"@stdlib/math/base/special/betaln":77,"@stdlib/math/base/special/ln":118}],79:[function(require,module,exports){
'use strict';

/**
* Compute the natural logarithm of the binomial coefficient.
*
* @module @stdlib/math/base/special/binomcoefln
*
* @example
* var binomcoefln = require( '@stdlib/math/base/special/binomcoefln' );
*
* var v = binomcoefln( 8, 2 );
* // returns ~3.332
*
* v = binomcoefln( 0, 0 );
* // returns 0.0
*
* v = binomcoefln( -4, 2 );
* // returns ~2.302
*
* v = binomcoefln( 88, 3 );
* // returns ~11.606
*
* v = binomcoefln( NaN, 3 );
* // returns NaN
*
* v = binomcoefln( 5, NaN );
* // returns NaN
*
* v = binomcoefln( NaN, NaN );
* // returns NaN
*/

// MODULES //

var binomcoefln = require( './binomcoefln.js' );


// EXPORTS //

module.exports = binomcoefln;

},{"./binomcoefln.js":78}],80:[function(require,module,exports){
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

},{}],81:[function(require,module,exports){
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

},{"./ceil.js":80}],82:[function(require,module,exports){
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

},{"@stdlib/number/float64/base/from-words":155,"@stdlib/number/float64/base/get-high-word":159,"@stdlib/number/float64/base/to-words":173}],83:[function(require,module,exports){
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

},{"./copysign.js":82}],84:[function(require,module,exports){
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

},{"@stdlib/math/base/special/kernel-cos":110,"@stdlib/math/base/special/kernel-sin":114,"@stdlib/math/base/special/rempio2":140,"@stdlib/number/float64/base/get-high-word":159}],85:[function(require,module,exports){
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

},{"./cos.js":84}],86:[function(require,module,exports){
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

},{"./expmulti.js":87,"@stdlib/constants/math/float64-ninf":35,"@stdlib/constants/math/float64-pinf":37,"@stdlib/math/base/assert/is-nan":49,"@stdlib/math/base/special/trunc":151}],87:[function(require,module,exports){
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

},{"./polyval_p.js":89,"@stdlib/math/base/special/ldexp":116}],88:[function(require,module,exports){
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

},{"./exp.js":86}],89:[function(require,module,exports){
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

},{}],90:[function(require,module,exports){
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

},{}],91:[function(require,module,exports){
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

},{"./floor.js":90}],92:[function(require,module,exports){
'use strict';

/*
* The original C code, long comment, copyright, license, and constants are from [Cephes]{@link http://netlib.sandia.gov/cephes/cprob/gamma.c}.
*
* The implementation follows the original, but has been modified for JavaScript.
*/

/*
* COPYRIGHT
*
* Cephes Math Library Release 2.8:  June, 2000
* Copyright 1984, 1987, 1989, 1992, 2000 by Stephen L. Moshier
*
*
* LICENSE
*
* The README [file]{@link http://netlib.sandia.gov/cephes/} reads:
*   > Some software in this archive may be from the book _Methods and Programs for Mathematical Functions_ (Prentice-Hall or Simon & Schuster International, 1989) or from the Cephes Mathematical Library, a commercial product. In either event, it is copyrighted by the author. What you see here may be used freely but it comes with no support or guarantee.
*   > The two known misprints in the book are repaired here in the source listings for the gamma function and the incomplete beta integral.
*   > Stephen L. Moshier
*   > moshier@na-net.ornl.gov
*/

// MODULES //

var isnan = require( '@stdlib/math/base/assert/is-nan' );
var isInteger = require( '@stdlib/math/base/assert/is-integer' );
var isNegativeZero = require( '@stdlib/math/base/assert/is-negative-zero' );
var abs = require( '@stdlib/math/base/special/abs' );
var floor = require( '@stdlib/math/base/special/floor' );
var sin = require( '@stdlib/math/base/special/sin' );
var PINF = require( '@stdlib/constants/math/float64-pinf' );
var NINF = require( '@stdlib/constants/math/float64-ninf' );
var PI = require( '@stdlib/constants/math/float64-pi' );
var stirlingApprox = require( './stirling_approximation.js' );
var smallApprox = require( './small_approximation.js' );
var rateval = require( './rational_pq.js' );


// MAIN //

/**
* Evaluates the gamma function.
*
* ## Method
*
* 1.  Arguments \\(|x| \leq 34\\) are reduced by recurrence and the function approximated by a rational function of degree \\(6/7\\) in the interval \\((2,3)\\).
* 2.  Large negative arguments are made positive using a reflection formula.
* 3.  Large arguments are handled by Stirling's formula.
*
*
* ## Notes
*
* -   Relative error:
*
*     | arithmetic | domain    | # trials | peak    | rms     |
*     |:----------:|:---------:|:--------:|:-------:|:-------:|
*     | DEC        | -34,34    | 10000    | 1.3e-16 | 2.5e-17 |
*     | IEEE       | -170,-33  | 20000    | 2.3e-15 | 3.3e-16 |
*     | IEEE       | -33, 33   | 20000    | 9.4e-16 | 2.2e-16 |
*     | IEEE       | 33, 171.6 | 20000    | 2.3e-15 | 3.2e-16 |
*
* -   Error for arguments outside the test range will be larger owing to error amplification by the exponential function.
*
*
* @param {number} x - input value
* @returns {number} function value
*
* @example
* var v = gamma( 4.0 );
* // returns 6.0
*
* @example
* var v = gamma( -1.5 );
* // returns ~2.363
*
* @example
* var v = gamma( -0.5 );
* // returns ~-3.545
*
* @example
* var v = gamma( 0.5 );
* // returns ~1.772
*
* @example
* var v = gamma( 0.0 );
* // returns Infinity
*
* @example
* var v = gamma( -0.0 );
* // returns -Infinity
*
* @example
* var v = gamma( NaN );
* // returns NaN
*/
function gamma( x ) {
	var sign;
	var q;
	var p;
	var z;
	if (
		(isInteger( x ) && x < 0) ||
		x === NINF ||
		isnan( x )
	) {
		return NaN;
	}
	if ( x === 0.0 ) {
		if ( isNegativeZero( x ) ) {
			return NINF;
		}
		return PINF;
	}
	if ( x > 171.61447887182298 ) {
		return PINF;
	}
	if ( x < -170.5674972726612 ) {
		return 0.0;
	}
	q = abs( x );
	if ( q > 33.0 ) {
		if ( x >= 0.0 ) {
			return stirlingApprox( x );
		}
		p = floor( q );

		// Check whether `x` is even...
		if ( (p&1) === 0 ) {
			sign = -1.0;
		} else {
			sign = 1.0;
		}
		z = q - p;
		if ( z > 0.5 ) {
			p += 1.0;
			z = q - p;
		}
		z = q * sin( PI * z );
		return sign * PI / ( abs(z)*stirlingApprox(q) );
	}
	// Reduce `x`...
	z = 1.0;
	while ( x >= 3.0 ) {
		x -= 1.0;
		z *= x;
	}
	while ( x < 0.0 ) {
		if ( x > -1.0e-9 ) {
			return smallApprox( x, z );
		}
		z /= x;
		x += 1.0;
	}
	while ( x < 2.0 ) {
		if ( x < 1.0e-9 ) {
			return smallApprox( x, z );
		}
		z /= x;
		x += 1.0;
	}
	if ( x === 2.0 ) {
		return z;
	}
	x -= 2.0;
	return z * rateval( x );
}


// EXPORTS //

module.exports = gamma;

},{"./rational_pq.js":95,"./small_approximation.js":96,"./stirling_approximation.js":97,"@stdlib/constants/math/float64-ninf":35,"@stdlib/constants/math/float64-pi":36,"@stdlib/constants/math/float64-pinf":37,"@stdlib/math/base/assert/is-integer":47,"@stdlib/math/base/assert/is-nan":49,"@stdlib/math/base/assert/is-negative-zero":51,"@stdlib/math/base/special/abs":73,"@stdlib/math/base/special/floor":91,"@stdlib/math/base/special/sin":146}],93:[function(require,module,exports){
'use strict';

/**
* Evaluate the gamma function.
*
* @module @stdlib/math/base/special/gamma
*
* @example
* var gamma = require( '@stdlib/math/base/special/gamma' );
*
* var v = gamma( 4.0 );
* // returns 6.0
*
* v = gamma( -1.5 );
* // returns ~2.363
*
* v = gamma( -0.5 );
* // returns ~-3.545
*
* v = gamma( 0.5 );
* // returns ~1.772
*
* v = gamma( 0.0 );
* // returns Infinity
*
* v = gamma( -0.0 );
* // returns -Infinity
*
* v = gamma( NaN );
* // returns NaN
*/

// MODULES //

var gamma = require( './gamma.js' );


// EXPORTS //

module.exports = gamma;

},{"./gamma.js":92}],94:[function(require,module,exports){
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
		return 0.08333333333334822;
	}
	return 0.08333333333334822 + (x * (0.0034722222160545866 + (x * (-0.0026813261780578124 + (x * (-0.00022954996161337813 + (x * 0.0007873113957930937))))))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

},{}],95:[function(require,module,exports){
/* This is a generated file. Do not edit directly. */
'use strict';

// MAIN //

/**
* Evaluates a rational function, i.e., the ratio of two polynomials described by the coefficients stored in \\(P\\) and \\(Q\\).
*
* ## Notes
*
* -   Coefficients should be sorted in ascending degree.
* -   The implementation uses [Horner's rule][horners-method] for efficient computation.
*
* [horners-method]: https://en.wikipedia.org/wiki/Horner%27s_method
*
*
* @private
* @param {number} x - value at which to evaluate the rational function
* @returns {number} evaluated rational function
*/
function evalrational( x ) {
	var ax;
	var s1;
	var s2;
	if ( x === 0.0 ) {
		return 1.0;
	}
	if ( x < 0.0 ) {
		ax = -x;
	} else {
		ax = x;
	}
	if ( ax <= 1.0 ) {
		s1 = 1.0 + (x * (0.4942148268014971 + (x * (0.20744822764843598 + (x * (0.04763678004571372 + (x * (0.010421379756176158 + (x * (0.0011913514700658638 + (x * (0.00016011952247675185 + (x * 0.0))))))))))))); // eslint-disable-line max-len
		s2 = 1.0 + (x * (0.0714304917030273 + (x * (-0.23459179571824335 + (x * (0.035823639860549865 + (x * (0.011813978522206043 + (x * (-0.004456419138517973 + (x * (0.0005396055804933034 + (x * -0.000023158187332412014))))))))))))); // eslint-disable-line max-len
	} else {
		x = 1.0 / x;
		s1 = 0.0 + (x * (0.00016011952247675185 + (x * (0.0011913514700658638 + (x * (0.010421379756176158 + (x * (0.04763678004571372 + (x * (0.20744822764843598 + (x * (0.4942148268014971 + (x * 1.0))))))))))))); // eslint-disable-line max-len
		s2 = -0.000023158187332412014 + (x * (0.0005396055804933034 + (x * (-0.004456419138517973 + (x * (0.011813978522206043 + (x * (0.035823639860549865 + (x * (-0.23459179571824335 + (x * (0.0714304917030273 + (x * 1.0))))))))))))); // eslint-disable-line max-len
	}
	return s1 / s2;
}


// EXPORTS //

module.exports = evalrational;

},{}],96:[function(require,module,exports){
'use strict';

// MODULES //

var EULER = require( '@stdlib/constants/math/float64-eulergamma' );


// MAIN //

/**
* Evaluates the gamma function using a small-value approximation.
*
* @private
* @param {number} x - input value
* @param {number} z - scale factor
* @returns {number} function value
*/
function gamma( x, z ) {
	return z / ( ( 1.0 + ( EULER*x ) ) * x );
}


// EXPORTS //

module.exports = gamma;

},{"@stdlib/constants/math/float64-eulergamma":27}],97:[function(require,module,exports){
'use strict';

// MODULES //

var SQRT_TWO_PI = require( '@stdlib/constants/math/float64-sqrt-two-pi' );
var pow = require( '@stdlib/math/base/special/pow' );
var exp = require( '@stdlib/math/base/special/exp' );
var polyval = require( './polyval_s.js' );


// VARIABLES //

var MAX_STIRLING = 143.01608;


// MAIN //

/**
* Evaluates the gamma function using Stirling's formula. The polynomial is valid for \\(33 \leq x \leq 172\\).
*
* @private
* @param {number} x - input value
* @returns {number} function value
*/
function gamma( x ) {
	var w;
	var y;
	var v;

	w = 1.0 / x;
	w = 1.0 + ( w * polyval( w ) );
	y = exp( x );

	// Check `x` to avoid `pow()` overflow...
	if ( x > MAX_STIRLING ) {
		v = pow( x, ( 0.5*x ) - 0.25 );
		y = v * (v/y);
	} else {
		y = pow( x, x-0.5 ) / y;
	}
	return SQRT_TWO_PI * y * w;
}


// EXPORTS //

module.exports = gamma;

},{"./polyval_s.js":94,"@stdlib/constants/math/float64-sqrt-two-pi":39,"@stdlib/math/base/special/exp":88,"@stdlib/math/base/special/pow":129}],98:[function(require,module,exports){
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

},{"./polyval_a1.js":100,"./polyval_a2.js":101,"./polyval_r.js":102,"./polyval_s.js":103,"./polyval_t1.js":104,"./polyval_t2.js":105,"./polyval_t3.js":106,"./polyval_u.js":107,"./polyval_v.js":108,"./polyval_w.js":109,"@stdlib/constants/math/float64-pi":36,"@stdlib/constants/math/float64-pinf":37,"@stdlib/math/base/assert/is-infinite":45,"@stdlib/math/base/assert/is-nan":49,"@stdlib/math/base/special/abs":73,"@stdlib/math/base/special/ln":118,"@stdlib/math/base/special/sinpi":148,"@stdlib/math/base/special/trunc":151}],99:[function(require,module,exports){
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

},{"./gammaln.js":98}],100:[function(require,module,exports){
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

},{}],101:[function(require,module,exports){
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

},{}],102:[function(require,module,exports){
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

},{}],103:[function(require,module,exports){
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

},{}],104:[function(require,module,exports){
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

},{}],105:[function(require,module,exports){
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

},{}],106:[function(require,module,exports){
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

},{}],107:[function(require,module,exports){
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

},{}],108:[function(require,module,exports){
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

},{}],109:[function(require,module,exports){
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

},{}],110:[function(require,module,exports){
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

},{"./kernel_cos.js":111}],111:[function(require,module,exports){
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

},{"./polyval_c13.js":112,"./polyval_c46.js":113}],112:[function(require,module,exports){
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

},{}],113:[function(require,module,exports){
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

},{}],114:[function(require,module,exports){
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

},{"./kernel_sin.js":115}],115:[function(require,module,exports){
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

},{}],116:[function(require,module,exports){
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

},{"./ldexp.js":117}],117:[function(require,module,exports){
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

},{"@stdlib/constants/math/float64-exponent-bias":28,"@stdlib/constants/math/float64-max-base2-exponent":33,"@stdlib/constants/math/float64-max-base2-exponent-subnormal":32,"@stdlib/constants/math/float64-min-base2-exponent-subnormal":34,"@stdlib/constants/math/float64-ninf":35,"@stdlib/constants/math/float64-pinf":37,"@stdlib/math/base/assert/is-infinite":45,"@stdlib/math/base/assert/is-nan":49,"@stdlib/math/base/special/copysign":83,"@stdlib/number/float64/base/exponent":153,"@stdlib/number/float64/base/from-words":155,"@stdlib/number/float64/base/normalize":164,"@stdlib/number/float64/base/to-words":173}],118:[function(require,module,exports){
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

},{"./ln.js":119}],119:[function(require,module,exports){
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

},{"./polyval_p.js":120,"./polyval_q.js":121,"@stdlib/constants/math/float64-exponent-bias":28,"@stdlib/constants/math/float64-ninf":35,"@stdlib/math/base/assert/is-nan":49,"@stdlib/number/float64/base/get-high-word":159,"@stdlib/number/float64/base/set-high-word":168}],120:[function(require,module,exports){
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

},{}],121:[function(require,module,exports){
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

},{}],122:[function(require,module,exports){
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

},{"./log1p.js":123}],123:[function(require,module,exports){
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

},{"./polyval_lp.js":124,"@stdlib/constants/math/float64-exponent-bias":28,"@stdlib/constants/math/float64-ninf":35,"@stdlib/constants/math/float64-pinf":37,"@stdlib/math/base/assert/is-nan":49,"@stdlib/number/float64/base/get-high-word":159,"@stdlib/number/float64/base/set-high-word":168}],124:[function(require,module,exports){
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

},{}],125:[function(require,module,exports){
'use strict';

/**
* Return the maximum value.
*
* @module @stdlib/math/base/special/max
*
* @example
* var max = require( '@stdlib/math/base/special/max' );
*
* var v = max( 3.14, 4.2 );
* // returns 4.2
*
* v = max( 5.9, 3.14, 4.2 );
* // returns 5.9
*
* v = max( 3.14, NaN );
* // returns NaN
*
* v = max( +0.0, -0.0 );
* // returns +0.0
*/

// MODULES //

var max = require( './max.js' );


// EXPORTS //

module.exports = max;

},{"./max.js":126}],126:[function(require,module,exports){
'use strict';

// MODULES //

var isPositiveZero = require( '@stdlib/math/base/assert/is-positive-zero' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var NINF = require( '@stdlib/constants/math/float64-ninf' );
var PINF = require( '@stdlib/constants/math/float64-pinf' );


// MAIN //

/**
* Returns the maximum value.
*
* @param {number} [x] - first number
* @param {number} [y] - second number
* @param {...number} [args] - numbers
* @returns {number} maximum value
*
* @example
* var v = max( 3.14, 4.2 );
* // returns 4.2

* @example
* var v = max( 5.9, 3.14, 4.2 );
* // returns 5.9
*
* @example
* var v = max( 3.14, NaN );
* // returns NaN
*
* @example
* var v = max( +0.0, -0.0 );
* // returns +0.0
*/
function max( x, y ) {
	var len;
	var m;
	var v;
	var i;

	len = arguments.length;
	if ( len === 2 ) {
		if ( isnan( x ) || isnan( y ) ) {
			return NaN;
		}
		if ( x === PINF || y === PINF ) {
			return PINF;
		}
		if ( x === y && x === 0.0 ) {
			if ( isPositiveZero( x ) ) {
				return x;
			}
			return y;
		}
		if ( x > y ) {
			return x;
		}
		return y;
	}
	m = NINF;
	for ( i = 0; i < len; i++ ) {
		v = arguments[ i ];
		if ( isnan( v ) || v === PINF ) {
			return v;
		}
		if ( v > m ) {
			m = v;
		} else if (
			v === m &&
			v === 0.0 &&
			isPositiveZero( v )
		) {
			m = v;
		}
	}
	return m;
}


// EXPORTS //

module.exports = max;

},{"@stdlib/constants/math/float64-ninf":35,"@stdlib/constants/math/float64-pinf":37,"@stdlib/math/base/assert/is-nan":49,"@stdlib/math/base/assert/is-positive-zero":57}],127:[function(require,module,exports){
'use strict';

/**
* Return the minimum value.
*
* @module @stdlib/math/base/special/min
*
* @example
* var min = require( '@stdlib/math/base/special/min' );
*
* var v = min( 3.14, 4.2 );
* // returns 3.14
*
* v = min( 5.9, 3.14, 4.2 );
* // returns 3.14
*
* v = min( 3.14, NaN );
* // returns NaN
*
* v = min( +0.0, -0.0 );
* // returns -0.0
*/

// MODULES //

var min = require( './min.js' );


// EXPORTS //

module.exports = min;

},{"./min.js":128}],128:[function(require,module,exports){
'use strict';

// MODULES //

var isNegativeZero = require( '@stdlib/math/base/assert/is-negative-zero' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var NINF = require( '@stdlib/constants/math/float64-ninf' );
var PINF = require( '@stdlib/constants/math/float64-pinf' );


// MAIN //

/**
* Returns the minimum value.
*
* @param {number} [x] - first number
* @param {number} [y] - second number
* @param {...number} [args] - numbers
* @returns {number} minimum value
*
* @example
* var v = min( 3.14, 4.2 );
* // returns 3.14

* @example
* var v = min( 5.9, 3.14, 4.2 );
* // returns 3.14
*
* @example
* var v = min( 3.14, NaN );
* // returns NaN
*
* @example
* var v = min( +0.0, -0.0 );
* // returns -0.0
*/
function min( x, y ) {
	var len;
	var m;
	var v;
	var i;

	len = arguments.length;
	if ( len === 2 ) {
		if ( isnan( x ) || isnan( y ) ) {
			return NaN;
		}
		if ( x === NINF || y === NINF ) {
			return NINF;
		}
		if ( x === y && x === 0.0 ) {
			if ( isNegativeZero( x ) ) {
				return x;
			}
			return y;
		}
		if ( x < y ) {
			return x;
		}
		return y;
	}
	m = PINF;
	for ( i = 0; i < len; i++ ) {
		v = arguments[ i ];
		if ( isnan( v ) || v === NINF ) {
			return v;
		}
		if ( v < m ) {
			m = v;
		} else if (
			v === m &&
			v === 0.0 &&
			isNegativeZero( v )
		) {
			m = v;
		}
	}
	return m;
}


// EXPORTS //

module.exports = min;

},{"@stdlib/constants/math/float64-ninf":35,"@stdlib/constants/math/float64-pinf":37,"@stdlib/math/base/assert/is-nan":49,"@stdlib/math/base/assert/is-negative-zero":51}],129:[function(require,module,exports){
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

},{"./pow.js":135}],130:[function(require,module,exports){
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

},{"./polyval_l.js":132,"@stdlib/constants/math/float64-exponent-bias":28,"@stdlib/number/float64/base/get-high-word":159,"@stdlib/number/float64/base/set-high-word":168,"@stdlib/number/float64/base/set-low-word":170}],131:[function(require,module,exports){
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

},{"./polyval_w.js":134,"@stdlib/number/float64/base/set-low-word":170}],132:[function(require,module,exports){
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

},{}],133:[function(require,module,exports){
arguments[4][89][0].apply(exports,arguments)
},{"dup":89}],134:[function(require,module,exports){
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

},{}],135:[function(require,module,exports){
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

},{"./log2ax.js":130,"./logx.js":131,"./pow2.js":136,"./x_is_zero.js":137,"./y_is_huge.js":138,"./y_is_infinite.js":139,"@stdlib/constants/math/float64-ninf":35,"@stdlib/constants/math/float64-pinf":37,"@stdlib/math/base/assert/is-infinite":45,"@stdlib/math/base/assert/is-integer":47,"@stdlib/math/base/assert/is-nan":49,"@stdlib/math/base/assert/is-odd":55,"@stdlib/math/base/special/abs":73,"@stdlib/math/base/special/sqrt":150,"@stdlib/number/float64/base/set-low-word":170,"@stdlib/number/float64/base/to-words":173,"@stdlib/number/uint32/base/to-int32":177}],136:[function(require,module,exports){
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

},{"./polyval_p.js":133,"@stdlib/constants/math/float64-exponent-bias":28,"@stdlib/constants/math/float64-ln-two":31,"@stdlib/math/base/special/ldexp":116,"@stdlib/number/float64/base/get-high-word":159,"@stdlib/number/float64/base/set-high-word":168,"@stdlib/number/float64/base/set-low-word":170,"@stdlib/number/uint32/base/to-int32":177}],137:[function(require,module,exports){
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

},{"@stdlib/constants/math/float64-ninf":35,"@stdlib/constants/math/float64-pinf":37,"@stdlib/math/base/assert/is-odd":55,"@stdlib/math/base/special/copysign":83}],138:[function(require,module,exports){
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

},{"@stdlib/number/float64/base/get-high-word":159}],139:[function(require,module,exports){
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

},{"@stdlib/constants/math/float64-pinf":37,"@stdlib/math/base/special/abs":73}],140:[function(require,module,exports){
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

},{"./rempio2.js":142}],141:[function(require,module,exports){
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

},{"@stdlib/math/base/special/floor":91,"@stdlib/math/base/special/ldexp":116}],142:[function(require,module,exports){
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

},{"./kernel_rempio2.js":141,"./rempio2_medium.js":143,"@stdlib/number/float64/base/from-words":155,"@stdlib/number/float64/base/get-high-word":159,"@stdlib/number/float64/base/get-low-word":161}],143:[function(require,module,exports){
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

},{"@stdlib/math/base/special/round":144,"@stdlib/number/float64/base/get-high-word":159}],144:[function(require,module,exports){
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

},{"./round.js":145}],145:[function(require,module,exports){
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

},{}],146:[function(require,module,exports){
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

},{"./sin.js":147}],147:[function(require,module,exports){
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

},{"@stdlib/math/base/special/kernel-cos":110,"@stdlib/math/base/special/kernel-sin":114,"@stdlib/math/base/special/rempio2":140,"@stdlib/number/float64/base/get-high-word":159}],148:[function(require,module,exports){
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

},{"./sinpi.js":149}],149:[function(require,module,exports){
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

},{"@stdlib/constants/math/float64-pi":36,"@stdlib/math/base/assert/is-infinite":45,"@stdlib/math/base/assert/is-nan":49,"@stdlib/math/base/special/abs":73,"@stdlib/math/base/special/copysign":83,"@stdlib/math/base/special/cos":85,"@stdlib/math/base/special/sin":146}],150:[function(require,module,exports){
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

},{}],151:[function(require,module,exports){
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

},{"./trunc.js":152}],152:[function(require,module,exports){
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

},{"@stdlib/math/base/special/ceil":81,"@stdlib/math/base/special/floor":91}],153:[function(require,module,exports){
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

},{"./main.js":154}],154:[function(require,module,exports){
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

},{"@stdlib/constants/math/float64-exponent-bias":28,"@stdlib/constants/math/float64-high-word-exponent-mask":29,"@stdlib/number/float64/base/get-high-word":159}],155:[function(require,module,exports){
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

},{"./main.js":157}],156:[function(require,module,exports){
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

},{"@stdlib/assert/is-little-endian":18}],157:[function(require,module,exports){
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

},{"./indices.js":156,"@stdlib/array/float64":2,"@stdlib/array/uint32":7}],158:[function(require,module,exports){
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

},{"@stdlib/assert/is-little-endian":18}],159:[function(require,module,exports){
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

},{"./main.js":160}],160:[function(require,module,exports){
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

},{"./high.js":158,"@stdlib/array/float64":2,"@stdlib/array/uint32":7}],161:[function(require,module,exports){
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

},{"./main.js":163}],162:[function(require,module,exports){
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

},{"@stdlib/assert/is-little-endian":18}],163:[function(require,module,exports){
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

},{"./low.js":162,"@stdlib/array/float64":2,"@stdlib/array/uint32":7}],164:[function(require,module,exports){
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

},{"./main.js":165}],165:[function(require,module,exports){
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

},{"./normalize.js":166}],166:[function(require,module,exports){
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

},{"@stdlib/constants/math/float64-smallest-normal":38,"@stdlib/math/base/assert/is-infinite":45,"@stdlib/math/base/assert/is-nan":49,"@stdlib/math/base/special/abs":73}],167:[function(require,module,exports){
arguments[4][158][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":18,"dup":158}],168:[function(require,module,exports){
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

},{"./main.js":169}],169:[function(require,module,exports){
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

},{"./high.js":167,"@stdlib/array/float64":2,"@stdlib/array/uint32":7}],170:[function(require,module,exports){
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

},{"./main.js":172}],171:[function(require,module,exports){
arguments[4][162][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":18,"dup":162}],172:[function(require,module,exports){
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

},{"./low.js":171,"@stdlib/array/float64":2,"@stdlib/array/uint32":7}],173:[function(require,module,exports){
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

},{"./main.js":175}],174:[function(require,module,exports){
arguments[4][156][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":18,"dup":156}],175:[function(require,module,exports){
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

},{"./to_words.js":176}],176:[function(require,module,exports){
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

},{"./indices.js":174,"@stdlib/array/float64":2,"@stdlib/array/uint32":7}],177:[function(require,module,exports){
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

},{"./main.js":178}],178:[function(require,module,exports){
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

},{}],179:[function(require,module,exports){
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

},{}],180:[function(require,module,exports){
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

},{"./constant_function.js":179}],181:[function(require,module,exports){
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

},{}],182:[function(require,module,exports){
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

},{"./define_read_only_property.js":181}],183:[function(require,module,exports){
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

},{"./float64array.js":184,"@stdlib/assert/is-float64array":15}],184:[function(require,module,exports){
'use strict';

// EXPORTS //

module.exports = ( typeof Float64Array === 'function' ) ? Float64Array : null;

},{}],185:[function(require,module,exports){
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

},{"./detect_float64array_support.js":183}],186:[function(require,module,exports){
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

},{}],187:[function(require,module,exports){
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

},{"./detect_symbol_support.js":186}],188:[function(require,module,exports){
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

},{"@stdlib/utils/detect-symbol-support":187}],189:[function(require,module,exports){
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

},{"./has_tostringtag_support.js":188}],190:[function(require,module,exports){
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

},{"./uint16array.js":192,"@stdlib/assert/is-uint16array":20,"@stdlib/constants/math/uint16-max":40}],191:[function(require,module,exports){
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

},{"./detect_uint16array_support.js":190}],192:[function(require,module,exports){
'use strict';

// EXPORTS //

module.exports = ( typeof Uint16Array === 'function' ) ? Uint16Array : null;

},{}],193:[function(require,module,exports){
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

},{"./uint32array.js":195,"@stdlib/assert/is-uint32array":22,"@stdlib/constants/math/uint32-max":41}],194:[function(require,module,exports){
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

},{"./detect_uint32array_support.js":193}],195:[function(require,module,exports){
'use strict';

// EXPORTS //

module.exports = ( typeof Uint32Array === 'function' ) ? Uint32Array : null;

},{}],196:[function(require,module,exports){
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

},{"./uint8array.js":198,"@stdlib/assert/is-uint8array":24,"@stdlib/constants/math/uint8-max":42}],197:[function(require,module,exports){
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

},{"./detect_uint8array_support.js":196}],198:[function(require,module,exports){
'use strict';

// EXPORTS //

module.exports = ( typeof Uint8Array === 'function' ) ? Uint8Array : null;

},{}],199:[function(require,module,exports){
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

},{"./native_class.js":200,"./polyfill.js":201,"@stdlib/utils/detect-tostringtag-support":189}],200:[function(require,module,exports){
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

},{"./tostring.js":202}],201:[function(require,module,exports){
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

},{"./tostring.js":202,"./tostringtag.js":203,"@stdlib/assert/has-own-property":14}],202:[function(require,module,exports){
'use strict';

// MAIN //

var toStr = Object.prototype.toString;


// EXPORTS //

module.exports = toStr;

},{}],203:[function(require,module,exports){
'use strict';

// MAIN //

var toStrTag = ( typeof Symbol === 'function' ) ? Symbol.toStringTag : '';


// EXPORTS //

module.exports = toStrTag;

},{}],204:[function(require,module,exports){
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

},{}],205:[function(require,module,exports){

},{}],206:[function(require,module,exports){
arguments[4][205][0].apply(exports,arguments)
},{"dup":205}],207:[function(require,module,exports){
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

},{}],208:[function(require,module,exports){
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

},{"base64-js":204,"ieee754":227}],209:[function(require,module,exports){
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
},{"../../is-buffer/index.js":229}],210:[function(require,module,exports){
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

},{"./lib/is_arguments.js":211,"./lib/keys.js":212}],211:[function(require,module,exports){
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

},{}],212:[function(require,module,exports){
exports = module.exports = typeof Object.keys === 'function'
  ? Object.keys : shim;

exports.shim = shim;
function shim (obj) {
  var keys = [];
  for (var key in obj) keys.push(key);
  return keys;
}

},{}],213:[function(require,module,exports){
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

},{"foreach":223,"object-keys":233}],214:[function(require,module,exports){
module.exports = function () {
    for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] !== undefined) return arguments[i];
    }
};

},{}],215:[function(require,module,exports){
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

},{"./helpers/isFinite":216,"./helpers/isNaN":217,"./helpers/mod":218,"./helpers/sign":219,"es-to-primitive/es5":220,"has":226,"is-callable":230}],216:[function(require,module,exports){
var $isNaN = Number.isNaN || function (a) { return a !== a; };

module.exports = Number.isFinite || function (x) { return typeof x === 'number' && !$isNaN(x) && x !== Infinity && x !== -Infinity; };

},{}],217:[function(require,module,exports){
module.exports = Number.isNaN || function isNaN(a) {
	return a !== a;
};

},{}],218:[function(require,module,exports){
module.exports = function mod(number, modulo) {
	var remain = number % modulo;
	return Math.floor(remain >= 0 ? remain : remain + modulo);
};

},{}],219:[function(require,module,exports){
module.exports = function sign(number) {
	return number >= 0 ? 1 : -1;
};

},{}],220:[function(require,module,exports){
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

},{"./helpers/isPrimitive":221,"is-callable":230}],221:[function(require,module,exports){
module.exports = function isPrimitive(value) {
	return value === null || (typeof value !== 'function' && typeof value !== 'object');
};

},{}],222:[function(require,module,exports){
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

},{}],223:[function(require,module,exports){

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


},{}],224:[function(require,module,exports){
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

},{}],225:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

module.exports = Function.prototype.bind || implementation;

},{"./implementation":224}],226:[function(require,module,exports){
var bind = require('function-bind');

module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);

},{"function-bind":225}],227:[function(require,module,exports){
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

},{}],228:[function(require,module,exports){
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

},{}],229:[function(require,module,exports){
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

},{}],230:[function(require,module,exports){
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

},{}],231:[function(require,module,exports){
var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};

},{}],232:[function(require,module,exports){
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

},{}],233:[function(require,module,exports){
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

},{"./isArguments":234}],234:[function(require,module,exports){
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

},{}],235:[function(require,module,exports){
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
},{"_process":207}],236:[function(require,module,exports){
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
},{"_process":207}],237:[function(require,module,exports){
module.exports = require('./lib/_stream_duplex.js');

},{"./lib/_stream_duplex.js":238}],238:[function(require,module,exports){
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
},{"./_stream_readable":240,"./_stream_writable":242,"core-util-is":209,"inherits":228,"process-nextick-args":236}],239:[function(require,module,exports){
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
},{"./_stream_transform":241,"core-util-is":209,"inherits":228}],240:[function(require,module,exports){
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
},{"./_stream_duplex":238,"./internal/streams/BufferList":243,"./internal/streams/destroy":244,"./internal/streams/stream":245,"_process":207,"core-util-is":209,"events":222,"inherits":228,"isarray":231,"process-nextick-args":236,"safe-buffer":251,"string_decoder/":257,"util":205}],241:[function(require,module,exports){
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
},{"./_stream_duplex":238,"core-util-is":209,"inherits":228}],242:[function(require,module,exports){
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
},{"./_stream_duplex":238,"./internal/streams/destroy":244,"./internal/streams/stream":245,"_process":207,"core-util-is":209,"inherits":228,"process-nextick-args":236,"safe-buffer":251,"util-deprecate":264}],243:[function(require,module,exports){
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
},{"safe-buffer":251}],244:[function(require,module,exports){
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
},{"process-nextick-args":236}],245:[function(require,module,exports){
module.exports = require('events').EventEmitter;

},{"events":222}],246:[function(require,module,exports){
module.exports = require('./readable').PassThrough

},{"./readable":247}],247:[function(require,module,exports){
exports = module.exports = require('./lib/_stream_readable.js');
exports.Stream = exports;
exports.Readable = exports;
exports.Writable = require('./lib/_stream_writable.js');
exports.Duplex = require('./lib/_stream_duplex.js');
exports.Transform = require('./lib/_stream_transform.js');
exports.PassThrough = require('./lib/_stream_passthrough.js');

},{"./lib/_stream_duplex.js":238,"./lib/_stream_passthrough.js":239,"./lib/_stream_readable.js":240,"./lib/_stream_transform.js":241,"./lib/_stream_writable.js":242}],248:[function(require,module,exports){
module.exports = require('./readable').Transform

},{"./readable":247}],249:[function(require,module,exports){
module.exports = require('./lib/_stream_writable.js');

},{"./lib/_stream_writable.js":242}],250:[function(require,module,exports){
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
},{"_process":207,"through":263}],251:[function(require,module,exports){
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

},{"buffer":208}],252:[function(require,module,exports){
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

},{"events":222,"inherits":228,"readable-stream/duplex.js":237,"readable-stream/passthrough.js":246,"readable-stream/readable.js":247,"readable-stream/transform.js":248,"readable-stream/writable.js":249}],253:[function(require,module,exports){
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

},{"es-abstract/es5":215,"function-bind":225}],254:[function(require,module,exports){
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

},{"./implementation":253,"./polyfill":255,"./shim":256,"define-properties":213,"function-bind":225}],255:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

var zeroWidthSpace = '\u200b';

module.exports = function getPolyfill() {
	if (String.prototype.trim && zeroWidthSpace.trim() === zeroWidthSpace) {
		return String.prototype.trim;
	}
	return implementation;
};

},{"./implementation":253}],256:[function(require,module,exports){
'use strict';

var define = require('define-properties');
var getPolyfill = require('./polyfill');

module.exports = function shimStringTrim() {
	var polyfill = getPolyfill();
	define(String.prototype, { trim: polyfill }, { trim: function () { return String.prototype.trim !== polyfill; } });
	return polyfill;
};

},{"./polyfill":255,"define-properties":213}],257:[function(require,module,exports){
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
},{"safe-buffer":251}],258:[function(require,module,exports){
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
},{"./lib/default_stream":259,"./lib/results":261,"./lib/test":262,"_process":207,"defined":214,"through":263}],259:[function(require,module,exports){
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
},{"_process":207,"fs":206,"through":263}],260:[function(require,module,exports){
(function (process){
module.exports = typeof setImmediate !== 'undefined'
    ? setImmediate
    : process.nextTick
;

}).call(this,require('_process'))
},{"_process":207}],261:[function(require,module,exports){
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
},{"_process":207,"events":222,"function-bind":225,"has":226,"inherits":228,"object-inspect":232,"resumer":250,"through":263}],262:[function(require,module,exports){
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
},{"./next_tick":260,"deep-equal":210,"defined":214,"events":222,"has":226,"inherits":228,"path":235,"string.prototype.trim":254}],263:[function(require,module,exports){
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
},{"_process":207,"stream":252}],264:[function(require,module,exports){
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
},{}]},{},[66,67,68]);
