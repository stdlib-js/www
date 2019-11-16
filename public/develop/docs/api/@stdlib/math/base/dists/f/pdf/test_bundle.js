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

},{"./float64array.js":1,"./polyfill.js":3,"@stdlib/utils/detect-float64array-support":146}],3:[function(require,module,exports){
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

},{"./polyfill.js":5,"./uint16array.js":6,"@stdlib/utils/detect-uint16array-support":152}],5:[function(require,module,exports){
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

},{"./polyfill.js":8,"./uint32array.js":9,"@stdlib/utils/detect-uint32array-support":155}],8:[function(require,module,exports){
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

},{"./polyfill.js":11,"./uint8array.js":12,"@stdlib/utils/detect-uint8array-support":158}],11:[function(require,module,exports){
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

},{"@stdlib/utils/native-class":160}],17:[function(require,module,exports){
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

},{"@stdlib/utils/native-class":160}],22:[function(require,module,exports){
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

},{"@stdlib/utils/native-class":160}],24:[function(require,module,exports){
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

},{"@stdlib/utils/native-class":160}],26:[function(require,module,exports){
'use strict';

/**
* Euler's number.
*
* @module @stdlib/constants/math/float64-e
* @type {number}
*
* @example
* var E = require( '@stdlib/constants/math/float64-e' );
* // returns 2.718281828459045
*/


// MAIN //

/**
* Euler's number.
*
* @constant
* @type {number}
* @default 2.718281828459045
* @see [OEIS]{@link https://oeis.org/A001113}
* @see [Wikipedia]{@link https://en.wikipedia.org/wiki/E_(mathematical_constant)}
*/
var E = 2.718281828459045235360287471352662497757247093699959574966;


// EXPORTS //

module.exports = E;

},{}],27:[function(require,module,exports){
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
* Arbitrary constant `g` to be used in Lanczos approximation functions.
*
* @module @stdlib/constants/math/float64-gamma-lanczos-g
* @type {number}
*
* @example
* var FLOAT64_GAMMA_LANCZOS_G = require( '@stdlib/constants/math/float64-gamma-lanczos-g' );
* // returns 10.900511
*/


// MAIN //

/**
* Arbitrary constant `g` to be used in Lanczos approximation functions.
*
* @constant
* @type {number}
* @default 10.900511
* @see [Lanczos Approximation]{@link https://en.wikipedia.org/wiki/Lanczos_approximation}
*/
var FLOAT64_GAMMA_LANCZOS_G = 10.90051099999999983936049829935654997826;


// EXPORTS //

module.exports = FLOAT64_GAMMA_LANCZOS_G;

},{}],30:[function(require,module,exports){
'use strict';

/**
* One half times the natural logarithm of 2.
*
* @module @stdlib/constants/math/float64-half-ln-two
* @type {number}
*
* @example
* var HALF_LN2 = require( '@stdlib/constants/math/float64-half_ln2' );
* // returns 3.46573590279972654709e-01
*/


// MAIN //

/**
* One half times the natural logarithm of 2.
*
* ```tex
* \frac{\ln 2}{2}
* ```
*
* @constant
* @type {number}
* @default 3.46573590279972654709e-01
*/
var HALF_LN2 = 3.46573590279972654709e-01; // 0x3FD62E42 0xFEFA39EF


// EXPORTS //

module.exports = HALF_LN2;

},{}],31:[function(require,module,exports){
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

},{}],32:[function(require,module,exports){
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

},{}],33:[function(require,module,exports){
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

},{}],34:[function(require,module,exports){
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

},{}],35:[function(require,module,exports){
'use strict';

/**
* Natural logarithm of the maximum double-precision floating-point number.
*
* @module @stdlib/constants/math/float64-max-ln
* @type {number}
*
* @example
* var FLOAT64_MAX_LN = require( '@stdlib/constants/math/float64-max-ln' );
* // returns 709.782712893384
*/


// MAIN //

/**
* Natural logarithm of the maximum double-precision floating-point number.
*
* ## Notes
*
* The natural logarithm of the maximum is given by
*
* ```tex
* \ln \left( 2^{1023} (2 - 2^{-52}) \right)
* ```
*
* @constant
* @type {number}
* @default 709.782712893384
* @see [IEEE 754]{@link http://en.wikipedia.org/wiki/IEEE_754-1985}
*/
var FLOAT64_MAX_LN = 709.782712893384;


// EXPORTS //

module.exports = FLOAT64_MAX_LN;

},{}],36:[function(require,module,exports){
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

},{}],37:[function(require,module,exports){
'use strict';

/**
* Natural logarithm of the smallest normalized double-precision floating-point number.
*
* @module @stdlib/constants/math/float64-min-ln
* @type {number}
*
* @example
* var FLOAT64_MIN_LN = require( '@stdlib/constants/math/float64-min-ln' );
* // returns -708.3964185322641
*/


// MAIN //

/**
* Natural logarithm of the smallest normalized double-precision floating-point number.
*
* ## Notes
*
* The number has the value
*
* ```tex
* -\ln \left( 2^{1023-1} \right)
* ```
*
* @constant
* @type {number}
* @default -708.3964185322641
* @see [IEEE 754]{@link http://en.wikipedia.org/wiki/IEEE_754-1985}
*/
var FLOAT64_MIN_LN = -708.3964185322641;


// EXPORTS //

module.exports = FLOAT64_MIN_LN;

},{}],38:[function(require,module,exports){
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

},{}],39:[function(require,module,exports){
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

},{}],40:[function(require,module,exports){
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

},{}],41:[function(require,module,exports){
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

},{}],42:[function(require,module,exports){
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

},{}],43:[function(require,module,exports){
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

},{}],44:[function(require,module,exports){
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

},{"./is_even.js":45}],45:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-integer":48}],46:[function(require,module,exports){
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

},{"./is_infinite.js":47}],47:[function(require,module,exports){
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

},{"@stdlib/constants/math/float64-ninf":38,"@stdlib/constants/math/float64-pinf":39}],48:[function(require,module,exports){
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

},{"./is_integer.js":49}],49:[function(require,module,exports){
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

},{"@stdlib/math/base/special/floor":86}],50:[function(require,module,exports){
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

},{"./is_nan.js":51}],51:[function(require,module,exports){
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

},{}],52:[function(require,module,exports){
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

},{"./is_negative_zero.js":53}],53:[function(require,module,exports){
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

},{"@stdlib/constants/math/float64-ninf":38}],54:[function(require,module,exports){
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

},{"./is_odd.js":55}],55:[function(require,module,exports){
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

},{"@stdlib/math/base/assert/is-even":44}],56:[function(require,module,exports){
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

},{"./is_positive_zero.js":57}],57:[function(require,module,exports){
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

},{"@stdlib/constants/math/float64-pinf":39}],58:[function(require,module,exports){
'use strict';

// MODULES //

var constantFunction = require( '@stdlib/utils/constant-function' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var PINF = require( '@stdlib/constants/math/float64-pinf' );
var ibetaDerivative = require( './ibeta_derivative.js' );


// MAIN //

/**
* Returns a function for evaluating the probability density function (PDF) for a F distribution with numerator degrees of freedom `d1` and denominator degrees of freedom `d2`.
*
* @param {PositiveNumber} d1 - numerator degrees of freedom
* @param {PositiveNumber} d2 - denominator degrees of freedom
* @returns {Function} PDF
*
* @example
* var pdf = factory( 6.0, 7.0 );
* var y = pdf( 7.0 );
* // returns ~0.004
*
* y = pdf( 2.0 );
* // returns ~0.166
*/
function factory( d1, d2 ) {
	var d1d2;
	var d1by2;
	var d2by2;
	var zeroVal;
	if (
		isnan( d1 ) ||
		isnan( d2 ) ||
		d1 <= 0.0 ||
		d2 <= 0.0
	) {
		return constantFunction( NaN );
	}
	d1d2 = d1 * d2;
	d1by2 = d1 / 2.0;
	d2by2 = d2 / 2.0;
	zeroVal = 0.0;
	if ( d1 < 2.0 ) {
		zeroVal = PINF;
	}
	else if ( d1 === 2.0 ) {
		zeroVal = 1.0;
	}
	return pdf;

	/**
	* Evaluates the probability density function (PDF) for a F distribution.
	*
	* @private
	* @param {number} x - input value
	* @returns {number} evaluated PDF
	*
	* @example
	* var y = pdf( 2.3 );
	* // returns <number>
	*/
	function pdf( x ) {
		var v1x;
		var y;
		var z;
		if ( isnan( x ) ) {
			return NaN;
		}
		if ( x < 0.0 || x === PINF ) {
			return 0.0;
		}
		if ( x === 0.0 ) {
			return zeroVal;
		}
		v1x = d1 * x;
		if ( v1x > d2 ) {
			y = d1d2 / ( ( d2 + v1x ) * ( d2 + v1x ) );
			return y * ibetaDerivative( d2 / ( d2 + v1x ), d2by2, d1by2 );
		}
		z = d2 + v1x;
		y = ((z * d1) - (x * d1 * d1)) / ( z * z );
		return y * ibetaDerivative( d1 * x / ( d2 + v1x ), d1by2, d2by2 );
	}
}


// EXPORTS //

module.exports = factory;

},{"./ibeta_derivative.js":59,"@stdlib/constants/math/float64-pinf":39,"@stdlib/math/base/assert/is-nan":50,"@stdlib/utils/constant-function":141}],59:[function(require,module,exports){
'use strict';

// MODULES //

var ibetaPowerTerms = require( './ibeta_power_terms.js' );


// MAIN //

/**
* Computes the partial derivative with respect to x of the incomplete beta function.
*
* @private
* @param {Probability} x - input value (not equal to 0.0 or 1.0)
* @param {PositiveNumber} a - first parameter
* @param {PositiveNumber} b - second parameter
* @returns {number} value of the partial derivative
*/
function ibetaDerivative( x, a, b ) {
	var f1;
	var y;

	f1 = ibetaPowerTerms( a, b, x, 1.0 - x, true );
	y = ( 1.0 - x ) * x;
	f1 /= y;
	return f1;
}


// EXPORTS //

module.exports = ibetaDerivative;

},{"./ibeta_power_terms.js":60}],60:[function(require,module,exports){
'use strict';

/*
* The original C++ code and copyright notice is from the [Boost library]{@link http://www.boost.org/doc/libs/1_62_0/boost/math/special_functions/beta.hpp}.
*
* The implementation has been modified for JavaScript.
*/

/*
* (C) Copyright John Maddock 2006.
* Use, modification and distribution are subject to the
* Boost Software License, Version 1.0. (See accompanying file
* LICENSE or copy at http://www.boost.org/LICENSE_1_0.txt)
*/

// MODULES //

var lanczosSumExpGScaled = require( '@stdlib/math/base/special/gamma-lanczos-sum-expg-scaled' );
var expm1 = require( '@stdlib/math/base/special/expm1' );
var log1p = require( '@stdlib/math/base/special/log1p' );
var sqrt = require( '@stdlib/math/base/special/sqrt' );
var abs = require( '@stdlib/math/base/special/abs' );
var exp = require( '@stdlib/math/base/special/exp' );
var pow = require( '@stdlib/math/base/special/pow' );
var max = require( '@stdlib/math/base/special/max' );
var min = require( '@stdlib/math/base/special/min' );
var ln = require( '@stdlib/math/base/special/ln' );
var MAX_LN = require( '@stdlib/constants/math/float64-max-ln' );
var MIN_LN = require( '@stdlib/constants/math/float64-min-ln' );
var G = require( '@stdlib/constants/math/float64-gamma-lanczos-g' );
var E = require( '@stdlib/constants/math/float64-e' );


// MAIN //

/**
* Computes the leading power terms in the incomplete beta function.
*
* When normalized,
*
* ```tex
* \frac{ x^a y^b }{ \operatorname{Beta}(a,b) }
* ```
*
* and otherwise
*
* ```tex
* x^a y^b
* ```
*
* ## Notes
*
* -   Almost all of the error in the incomplete beta comes from this function, particularly when \\( a \\) and \\( b \\) are large. Computing large powers are _hard_ though, and using logarithms just leads to horrendous cancellation errors.
*
* -   For \\( l1 * l2 > 0 \\) or \\( \operatorname{min}( a, b ) < 1 \\), the two power terms both go in the same direction (towards zero or towards infinity). In this case if either term overflows or underflows, then the product of the two must do so also. Alternatively, if one exponent is less than one, then we can't productively use it to eliminate overflow or underflow from the other term.  Problems with spurious overflow/underflow can't be ruled out in this case, but it is _very_ unlikely since one of the power terms will evaluate to a number close to 1.
*
* -   If \\( \max( \abs(l1), \abs(l2) ) < 0.5 \\), both exponents are near one and both the exponents are greater than one, and, further, these two power terms tend in opposite directions (one toward zero, the other toward infinity), so we have to combine the terms to avoid any risk of overflow or underflow. We do this by moving one power term inside the other, we have:
*
*     ```tex
*     (1 + l_1)^a \cdot (1 + l_2)^b \\
*     = ((1 + l_1) \cdot (1 + l_2)^(b/a))^a \\
*     = (1 + l_1 + l_3 + l_1*l_3)^a
*     ```
*
*     and
*
*     ```tex
*     l_3 = (1 + l_2)^(b/a) - 1 \\
*     = \exp((b/a) * \ln(1 + l_2)) - 1
*     ```
*
*     The tricky bit is deciding which term to move inside. By preference we move the larger term inside, so that the size of the largest exponent is reduced.  However, that can only be done as long as l3 (see above) is also small.
*
* @private
* @param {NonNegativeNumber} a - function parameter
* @param {NonNegativeNumber} b - function parameter
* @param {Probability} x - function parameter
* @param {Probability} y - probability equal to `1-x`
* @param {boolean} normalized - boolean indicating whether to evaluate the power terms of the regularized or non-regularized incomplete beta function
* @returns {number} power terms
*/
function ibetaPowerTerms( a, b, x, y, normalized ) {
	var result;
	var smallA;
	var ratio;
	var agh;
	var bgh;
	var cgh;
	var l1;
	var l2;
	var l3;
	var p1;
	var b1;
	var b2;
	var c;
	var l;

	if ( !normalized ) {
		// Can we do better here?
		return pow( x, a ) * pow( y, b );
	}
	c = a + b;

	// Combine power terms with Lanczos approximation:
	agh = a + G - 0.5;
	bgh = b + G - 0.5;
	cgh = c + G - 0.5;
	result = lanczosSumExpGScaled( c );
	result /= lanczosSumExpGScaled( a ) * lanczosSumExpGScaled( b );

	// Combine with the leftover terms from the Lanczos approximation:
	result *= sqrt( bgh / E );
	result *= sqrt( agh / cgh );

	// `l1` and `l2` are the base of the exponents minus one:
	l1 = ( ( x * b ) - ( y * agh ) ) / agh;
	l2 = ( ( y * a ) - ( x * bgh ) ) / bgh;
	if ( min( abs(l1), abs(l2) ) < 0.2 ) {
		// When the base of the exponent is very near 1 we get really gross errors unless extra care is taken:
		if ( l1 * l2 > 0 || min( a, b ) < 1 ) {
			if ( abs(l1) < 0.1 ) {
				result *= exp( a * log1p( l1 ) );
			} else {
				result *= pow( ( x*cgh ) / agh, a );
			}
			if ( abs(l2) < 0.1 ) {
				result *= exp( b * log1p( l2 ) );
			} else {
				result *= pow((y * cgh) / bgh, b);
			}
		}
		else if ( max( abs(l1), abs(l2) ) < 0.5 ) {
			smallA = a < b;
			ratio = b / a;
			if (
				(smallA && (ratio * l2 < 0.1)) ||
				(!smallA && (l1 / ratio > 0.1))
			) {
				l3 = expm1( ratio * log1p( l2 ) );
				l3 = l1 + l3 + ( l3 * l1 );
				l3 = a * log1p( l3 );
				result *= exp( l3 );
			}
			else {
				l3 = expm1( log1p( l1 ) / ratio );
				l3 = l2 + l3 + ( l3 * l2 );
				l3 = b * log1p( l3 );
				result *= exp( l3 );
			}
		}
		else if ( abs(l1) < abs(l2) ) {
			// First base near 1 only:
			l = ( a * log1p( l1 ) ) + ( b * ln( ( y*cgh ) / bgh ) );
			if ( l <= MIN_LN || l >= MAX_LN ) {
				l += ln(result);
				if ( l >= MAX_LN ) {
					return NaN;
				}
				result = exp( l );
			} else {
				result *= exp( l );
			}
		}
		else {
			// Second base near 1 only:
			l = ( b * log1p( l2 ) ) + ( a * ln( (x*cgh) / agh ) );
			if ( l <= MIN_LN || l >= MAX_LN ) {
				l += ln(result);
				if ( l >= MAX_LN ) {
					return NaN;
				}
				result = exp( l );
			} else {
				result *= exp( l );
			}
		}
	}
	else {
		// General case:
		b1 = (x * cgh) / agh;
		b2 = (y * cgh) / bgh;
		l1 = a * ln(b1);
		l2 = b * ln(b2);
		if (
			l1 >= MAX_LN ||
			l1 <= MIN_LN ||
			l2 >= MAX_LN ||
			l2 <= MIN_LN
		) {
			// Oops, under/overflow, sidestep if we can:
			if ( a < b ) {
				p1 = pow( b2, b / a );
				l3 = a * ( ln(b1) + ln(p1) );
				if ( l3 < MAX_LN && l3 > MIN_LN ) {
					result *= pow( p1 * b1, a );
				} else {
					l2 += l1 + ln(result);
					if ( l2 >= MAX_LN ) {
						return NaN;
					}
					result = exp( l2 );
				}
			}
			else {
				p1 = pow( b1, a / b );
				l3 = ( ln(p1) + ln(b2) ) * b;
				if ( l3 < MAX_LN && l3 > MIN_LN ) {
					result *= pow( p1 * b2, b );
				} else {
					l2 += l1 + ln( result );
					if (l2 >= MAX_LN) {
						return NaN;
					}
					result = exp( l2 );
				}
			}
		}
		else {
			// Finally the normal case:
			result *= pow( b1, a ) * pow( b2, b );
		}
	}
	return result;
}


// EXPORTS //

module.exports = ibetaPowerTerms;

},{"@stdlib/constants/math/float64-e":26,"@stdlib/constants/math/float64-gamma-lanczos-g":29,"@stdlib/constants/math/float64-max-ln":35,"@stdlib/constants/math/float64-min-ln":37,"@stdlib/math/base/special/abs":73,"@stdlib/math/base/special/exp":80,"@stdlib/math/base/special/expm1":83,"@stdlib/math/base/special/gamma-lanczos-sum-expg-scaled":88,"@stdlib/math/base/special/ln":92,"@stdlib/math/base/special/log1p":96,"@stdlib/math/base/special/max":99,"@stdlib/math/base/special/min":101,"@stdlib/math/base/special/pow":103,"@stdlib/math/base/special/sqrt":114}],61:[function(require,module,exports){
'use strict';

/**
* Evaluates the probability density function (PDF) for a F distribution.
*
* @module @stdlib/math/base/dists/f/pdf
*
* @example
* var pdf = require( '@stdlib/math/base/dists/f/pdf' );
*
* var y = pdf( 2.0, 0.5, 1.0 );
* // returns ~0.057
*
* y = pdf( 0.1, 1.0, 1.0 );
* // returns ~0.915
*
* var mypdf = pdf.factory( 6.0, 7.0 );
* y = mypdf( 7.0 );
* // returns ~0.004
*
* y = mypdf( 2.0 );
* // returns ~0.166
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-read-only-property' );
var pdf = require( './pdf.js' );
var factory = require( './factory.js' );


// MAIN //

setReadOnly( pdf, 'factory', factory );


// EXPORTS //

module.exports = pdf;

},{"./factory.js":58,"./pdf.js":62,"@stdlib/utils/define-read-only-property":143}],62:[function(require,module,exports){
'use strict';

// MODULES //

var isnan = require( '@stdlib/math/base/assert/is-nan' );
var PINF = require( '@stdlib/constants/math/float64-pinf' );
var ibetaDerivative = require( './ibeta_derivative.js' );


// MAIN //

/**
* Evaluates the probability density function (PDF) for a F distribution with numerator degrees of freedom `d1` and denominator degrees of freedom `d2` at a value `x`.
*
* @param {number} x - input value
* @param {PositiveNumber} d1 - numerator degrees of freedom
* @param {PositiveNumber} d2 - denominator degrees of freedom
* @returns {number} evaluated PDF
*
* @example
* var y = pdf( 2.0, 0.5, 1.0 );
* // returns ~0.057
*
* @example
* var y = pdf( 0.1, 1.0, 1.0 );
* // returns ~0.915
*
* @example
* var y = pdf( -1.0, 4.0, 2.0 );
* // returns 0.0
*
* @example
* var y = pdf( NaN, 1.0, 1.0 );
* // returns NaN
*
* @example
* var y = pdf( 0.0, NaN, 1.0 );
* // returns NaN
*
* @example
* var y = pdf( 0.0, 1.0, NaN );
* // returns NaN
*
* @example
* var y = pdf( 2.0, 1.0, -1.0 );
* // returns NaN
*
* @example
* var y = pdf( 2.0, -1.0, 1.0 );
* // returns NaN
*/
function pdf( x, d1, d2 ) {
	var v1x;
	var y;
	var z;
	if (
		isnan( x ) ||
		isnan( d1 ) ||
		isnan( d2 ) ||
		d1 <= 0.0 ||
		d2 <= 0.0
	) {
		return NaN;
	}
	if ( x < 0.0 || x === PINF ) {
		return 0.0;
	}
	if ( x === 0.0 ) {
		if ( d1 < 2.0 ) {
			return PINF;
		}
		if ( d1 === 2.0 ) {
			return 1.0;
		}
		return 0.0;
	}
	v1x = d1 * x;
	if ( v1x > d2 ) {
		y = ( d2 * d1 ) / ( ( d2 + v1x ) * ( d2 + v1x ) );
		return y * ibetaDerivative( d2 / ( d2+v1x ), d2/2.0, d1/2.0 );
	}
	z = d2 + v1x;
	y = ((z * d1) - (x * d1 * d1)) / ( z * z );
	return y * ibetaDerivative( v1x / ( d2+v1x ), d1/2.0, d2/2.0 );
}


// EXPORTS //

module.exports = pdf;

},{"./ibeta_derivative.js":59,"@stdlib/constants/math/float64-pinf":39,"@stdlib/math/base/assert/is-nan":50}],63:[function(require,module,exports){
module.exports={"x":[1,1.0490490490490489,1.0980980980980981,1.1471471471471471,1.1961961961961962,1.2452452452452452,1.2942942942942943,1.3433433433433433,1.3923923923923924,1.4414414414414414,1.4904904904904905,1.5395395395395395,1.5885885885885886,1.6376376376376376,1.6866866866866865,1.7357357357357357,1.7847847847847849,1.8338338338338338,1.8828828828828827,1.9319319319319319,1.9809809809809811,2.03003003003003,2.079079079079079,2.1281281281281279,2.1771771771771773,2.2262262262262262,2.2752752752752752,2.3243243243243246,2.3733733733733731,2.4224224224224224,2.4714714714714714,2.5205205205205203,2.5695695695695697,2.6186186186186182,2.6676676676676676,2.7167167167167166,2.7657657657657655,2.8148148148148149,2.8638638638638638,2.9129129129129128,2.9619619619619622,3.0110110110110111,3.06006006006006,3.109109109109109,3.1581581581581579,3.2072072072072073,3.2562562562562563,3.3053053053053052,3.3543543543543541,3.4034034034034031,3.4524524524524525,3.5015015015015014,3.5505505505505504,3.5995995995995993,3.6486486486486487,3.6976976976976976,3.7467467467467466,3.7957957957957955,3.8448448448448449,3.8938938938938938,3.9429429429429428,3.9919919919919917,4.0410410410410407,4.0900900900900901,4.1391391391391394,4.1881881881881879,4.2372372372372364,4.2862862862862858,4.3353353353353352,4.3843843843843846,4.4334334334334331,4.4824824824824825,4.531531531531531,4.5805805805805804,4.6296296296296298,4.6786786786786791,4.7277277277277276,4.7767767767767761,4.8258258258258255,4.8748748748748749,4.9239239239239243,4.9729729729729728,5.0220220220220222,5.0710710710710707,5.1201201201201201,5.1691691691691686,5.218218218218218,5.2672672672672673,5.3163163163163158,5.3653653653653652,5.4144144144144146,5.4634634634634631,5.5125125125125125,5.561561561561561,5.6106106106106104,5.6596596596596598,5.7087087087087083,5.7577577577577577,5.8068068068068062,5.8558558558558556,5.9049049049049049,5.9539539539539534,6.0030030030030028,6.0520520520520522,6.1011011011011007,6.1501501501501501,6.1991991991991986,6.248248248248248,6.2972972972972974,6.3463463463463459,6.3953953953953953,6.4444444444444446,6.4934934934934931,6.5425425425425425,6.591591591591591,6.6406406406406404,6.6896896896896898,6.7387387387387383,6.7877877877877877,6.8368368368368362,6.8858858858858856,6.934934934934935,6.9839839839839835,7.0330330330330328,7.0820820820820822,7.1311311311311307,7.1801801801801801,7.2292292292292286,7.278278278278278,7.3273273273273274,7.3763763763763759,7.4254254254254253,7.4744744744744738,7.5235235235235232,7.5725725725725725,7.621621621621621,7.6706706706706704,7.7197197197197198,7.7687687687687683,7.8178178178178177,7.8668668668668662,7.9159159159159156,7.964964964964965,8.0140140140140126,8.063063063063062,8.1121121121121114,8.1611611611611607,8.2102102102102101,8.2592592592592595,8.3083083083083089,8.3573573573573583,8.4064064064064059,8.4554554554554553,8.5045045045045029,8.5535535535535523,8.6026026026026017,8.6516516516516511,8.7007007007007005,8.7497497497497498,8.7987987987987992,8.8478478478478486,8.8968968968968962,8.9459459459459456,8.994994994994995,9.0440440440440444,9.093093093093092,9.1421421421421414,9.1911911911911908,9.2402402402402402,9.2892892892892895,9.3383383383383372,9.3873873873873865,9.4364364364364359,9.4854854854854853,9.5345345345345347,9.5835835835835841,9.6326326326326317,9.6816816816816811,9.7307307307307305,9.7797797797797799,9.8288288288288292,9.8778778778778769,9.9269269269269262,9.9759759759759756,10.025025025025025,10.074074074074074,10.123123123123122,10.172172172172171,10.221221221221221,10.27027027027027,10.31931931931932,10.368368368368367,10.417417417417417,10.466466466466466,10.515515515515515,10.564564564564565,10.613613613613612,10.662662662662662,10.711711711711711,10.76076076076076,10.80980980980981,10.858858858858859,10.907907907907907,10.956956956956956,11.006006006006006,11.055055055055055,11.104104104104104,11.153153153153152,11.202202202202201,11.251251251251251,11.3003003003003,11.34934934934935,11.398398398398397,11.447447447447447,11.496496496496496,11.545545545545545,11.594594594594595,11.643643643643642,11.692692692692692,11.741741741741741,11.790790790790791,11.83983983983984,11.888888888888889,11.937937937937937,11.986986986986986,12.036036036036036,12.085085085085085,12.134134134134134,12.183183183183182,12.232232232232231,12.281281281281281,12.33033033033033,12.37937937937938,12.428428428428427,12.477477477477477,12.526526526526526,12.575575575575575,12.624624624624625,12.673673673673672,12.722722722722722,12.771771771771771,12.820820820820821,12.86986986986987,12.918918918918918,12.967967967967967,13.017017017017016,13.066066066066066,13.115115115115115,13.164164164164164,13.213213213213212,13.262262262262261,13.311311311311311,13.36036036036036,13.40940940940941,13.458458458458457,13.507507507507507,13.556556556556556,13.605605605605605,13.654654654654655,13.703703703703702,13.752752752752752,13.801801801801801,13.850850850850851,13.8998998998999,13.948948948948948,13.997997997997997,14.047047047047046,14.096096096096096,14.145145145145145,14.194194194194194,14.243243243243242,14.292292292292291,14.341341341341341,14.39039039039039,14.43943943943944,14.488488488488487,14.537537537537537,14.586586586586586,14.635635635635635,14.684684684684685,14.733733733733732,14.782782782782782,14.831831831831831,14.880880880880881,14.92992992992993,14.978978978978978,15.028028028028027,15.077077077077076,15.126126126126126,15.175175175175175,15.224224224224223,15.273273273273272,15.322322322322321,15.371371371371371,15.42042042042042,15.46946946946947,15.518518518518517,15.567567567567567,15.616616616616616,15.665665665665665,15.714714714714715,15.763763763763762,15.812812812812812,15.861861861861861,15.910910910910911,15.95995995995996,16.009009009009006,16.058058058058059,16.107107107107105,16.156156156156158,16.205205205205203,16.254254254254253,16.303303303303302,16.352352352352352,16.401401401401401,16.45045045045045,16.4994994994995,16.548548548548546,16.597597597597598,16.646646646646644,16.695695695695697,16.744744744744743,16.793793793793792,16.842842842842842,16.891891891891891,16.940940940940941,16.98998998998999,17.039039039039039,17.088088088088089,17.137137137137138,17.186186186186184,17.235235235235233,17.284284284284283,17.333333333333332,17.382382382382382,17.431431431431431,17.48048048048048,17.52952952952953,17.578578578578579,17.627627627627628,17.676676676676674,17.725725725725724,17.774774774774773,17.823823823823822,17.872872872872872,17.921921921921921,17.970970970970971,18.02002002002002,18.069069069069069,18.118118118118119,18.167167167167168,18.216216216216214,18.265265265265263,18.314314314314313,18.363363363363362,18.412412412412412,18.461461461461461,18.51051051051051,18.55955955955956,18.608608608608609,18.657657657657658,18.706706706706704,18.755755755755754,18.804804804804803,18.853853853853852,18.902902902902902,18.951951951951951,19.001001001001001,19.05005005005005,19.099099099099099,19.148148148148149,19.197197197197195,19.246246246246244,19.295295295295293,19.344344344344343,19.393393393393392,19.442442442442442,19.491491491491491,19.54054054054054,19.58958958958959,19.638638638638639,19.687687687687689,19.736736736736734,19.785785785785784,19.834834834834833,19.883883883883883,19.932932932932932,19.981981981981981,20.031031031031031,20.08008008008008,20.129129129129129,20.178178178178179,20.227227227227225,20.276276276276274,20.325325325325323,20.374374374374373,20.423423423423422,20.472472472472472,20.521521521521521,20.57057057057057,20.61961961961962,20.668668668668669,20.717717717717719,20.766766766766764,20.815815815815814,20.864864864864863,20.913913913913913,20.962962962962962,21.012012012012011,21.061061061061061,21.11011011011011,21.159159159159159,21.208208208208209,21.257257257257255,21.306306306306304,21.355355355355353,21.404404404404403,21.453453453453452,21.502502502502502,21.551551551551551,21.6006006006006,21.64964964964965,21.698698698698699,21.747747747747749,21.796796796796794,21.845845845845844,21.894894894894893,21.943943943943943,21.992992992992992,22.042042042042041,22.091091091091091,22.14014014014014,22.189189189189189,22.238238238238239,22.287287287287285,22.336336336336334,22.385385385385383,22.434434434434433,22.483483483483482,22.532532532532532,22.581581581581581,22.63063063063063,22.67967967967968,22.728728728728729,22.777777777777779,22.826826826826824,22.875875875875874,22.924924924924923,22.973973973973973,23.023023023023022,23.072072072072071,23.121121121121121,23.17017017017017,23.219219219219219,23.268268268268269,23.317317317317315,23.366366366366364,23.415415415415413,23.464464464464463,23.513513513513512,23.562562562562562,23.611611611611611,23.66066066066066,23.70970970970971,23.758758758758759,23.807807807807805,23.856856856856854,23.905905905905904,23.954954954954953,24.004004004004003,24.053053053053052,24.102102102102101,24.151151151151151,24.2002002002002,24.24924924924925,24.298298298298299,24.347347347347345,24.396396396396394,24.445445445445444,24.494494494494493,24.543543543543542,24.592592592592592,24.641641641641641,24.69069069069069,24.73973973973974,24.788788788788789,24.837837837837835,24.886886886886884,24.935935935935934,24.984984984984983,25.034034034034033,25.083083083083082,25.132132132132131,25.181181181181181,25.23023023023023,25.27927927927928,25.328328328328329,25.377377377377375,25.426426426426424,25.475475475475474,25.524524524524523,25.573573573573572,25.622622622622622,25.671671671671671,25.72072072072072,25.76976976976977,25.818818818818819,25.867867867867865,25.916916916916914,25.965965965965964,26.015015015015013,26.064064064064063,26.113113113113112,26.162162162162161,26.211211211211211,26.26026026026026,26.30930930930931,26.358358358358359,26.407407407407405,26.456456456456454,26.505505505505504,26.554554554554553,26.603603603603602,26.652652652652652,26.701701701701701,26.75075075075075,26.7997997997998,26.848848848848849,26.897897897897895,26.946946946946944,26.995995995995994,27.045045045045043,27.094094094094093,27.143143143143142,27.192192192192191,27.241241241241241,27.29029029029029,27.33933933933934,27.388388388388389,27.437437437437435,27.486486486486484,27.535535535535534,27.584584584584583,27.633633633633632,27.682682682682682,27.731731731731731,27.780780780780781,27.82982982982983,27.878878878878879,27.927927927927925,27.976976976976974,28.026026026026024,28.075075075075073,28.124124124124123,28.173173173173172,28.222222222222221,28.271271271271271,28.32032032032032,28.36936936936937,28.418418418418419,28.467467467467465,28.516516516516514,28.565565565565564,28.614614614614613,28.663663663663662,28.712712712712712,28.761761761761761,28.810810810810811,28.85985985985986,28.908908908908909,28.957957957957955,29.007007007007005,29.056056056056054,29.105105105105103,29.154154154154153,29.203203203203202,29.252252252252251,29.301301301301301,29.35035035035035,29.3993993993994,29.448448448448445,29.497497497497495,29.546546546546544,29.595595595595594,29.644644644644643,29.693693693693692,29.742742742742742,29.791791791791791,29.840840840840841,29.88988988988989,29.938938938938939,29.987987987987985,30.037037037037035,30.086086086086084,30.135135135135133,30.184184184184183,30.233233233233232,30.282282282282281,30.331331331331331,30.38038038038038,30.42942942942943,30.478478478478475,30.527527527527525,30.576576576576574,30.625625625625624,30.674674674674673,30.723723723723722,30.772772772772772,30.821821821821821,30.870870870870871,30.91991991991992,30.968968968968969,31.018018018018015,31.067067067067065,31.116116116116114,31.165165165165163,31.214214214214213,31.263263263263262,31.312312312312311,31.361361361361361,31.41041041041041,31.45945945945946,31.508508508508505,31.557557557557555,31.606606606606604,31.655655655655654,31.704704704704703,31.753753753753752,31.802802802802802,31.851851851851851,31.900900900900901,31.94994994994995,31.998998998998999,32.048048048048045,32.097097097097091,32.146146146146144,32.195195195195197,32.244244244244243,32.293293293293289,32.342342342342342,32.391391391391394,32.44044044044044,32.489489489489486,32.538538538538532,32.587587587587585,32.636636636636638,32.685685685685684,32.734734734734729,32.783783783783782,32.832832832832835,32.881881881881881,32.930930930930927,32.97997997997998,33.029029029029026,33.078078078078079,33.127127127127125,33.176176176176178,33.225225225225223,33.274274274274276,33.323323323323322,33.372372372372368,33.421421421421421,33.470470470470467,33.51951951951952,33.568568568568566,33.617617617617618,33.666666666666664,33.715715715715717,33.764764764764763,33.813813813813809,33.862862862862862,33.911911911911908,33.960960960960961,34.010010010010006,34.059059059059059,34.108108108108105,34.157157157157158,34.206206206206204,34.255255255255257,34.304304304304303,34.353353353353349,34.402402402402402,34.451451451451447,34.5005005005005,34.549549549549546,34.598598598598599,34.647647647647645,34.696696696696698,34.745745745745744,34.794794794794797,34.843843843843842,34.892892892892888,34.941941941941941,34.990990990990987,35.04004004004004,35.089089089089086,35.138138138138139,35.187187187187185,35.236236236236238,35.285285285285283,35.334334334334336,35.383383383383382,35.432432432432428,35.481481481481481,35.530530530530527,35.57957957957958,35.628628628628626,35.677677677677679,35.726726726726724,35.775775775775777,35.824824824824823,35.873873873873869,35.922922922922922,35.971971971971968,36.021021021021021,36.070070070070066,36.119119119119119,36.168168168168165,36.217217217217218,36.266266266266264,36.315315315315317,36.364364364364363,36.413413413413409,36.462462462462462,36.511511511511507,36.56056056056056,36.609609609609606,36.658658658658659,36.707707707707705,36.756756756756758,36.805805805805804,36.854854854854857,36.903903903903903,36.952952952952948,37.002002002002001,37.051051051051047,37.1001001001001,37.149149149149146,37.198198198198199,37.247247247247245,37.296296296296298,37.345345345345343,37.394394394394389,37.443443443443442,37.492492492492488,37.541541541541541,37.590590590590587,37.63963963963964,37.688688688688686,37.737737737737739,37.786786786786784,37.835835835835837,37.884884884884883,37.933933933933929,37.982982982982982,38.032032032032028,38.081081081081081,38.130130130130127,38.179179179179179,38.228228228228225,38.277277277277278,38.326326326326324,38.375375375375377,38.424424424424423,38.473473473473469,38.522522522522522,38.571571571571567,38.62062062062062,38.669669669669666,38.718718718718719,38.767767767767765,38.816816816816818,38.865865865865864,38.914914914914917,38.963963963963963,39.013013013013008,39.062062062062061,39.111111111111107,39.16016016016016,39.209209209209206,39.258258258258259,39.307307307307305,39.356356356356358,39.405405405405403,39.454454454454449,39.503503503503502,39.552552552552548,39.601601601601601,39.650650650650647,39.6996996996997,39.748748748748746,39.797797797797799,39.846846846846844,39.895895895895897,39.944944944944943,39.993993993993989,40.043043043043042,40.092092092092088,40.141141141141141,40.190190190190187,40.23923923923924,40.288288288288285,40.337337337337338,40.386386386386384,40.435435435435437,40.484484484484483,40.533533533533529,40.582582582582582,40.631631631631627,40.68068068068068,40.729729729729726,40.778778778778779,40.827827827827825,40.876876876876878,40.925925925925924,40.974974974974977,41.024024024024023,41.073073073073068,41.122122122122121,41.171171171171167,41.22022022022022,41.269269269269266,41.318318318318319,41.367367367367365,41.416416416416418,41.465465465465464,41.514514514514509,41.563563563563562,41.612612612612608,41.661661661661661,41.710710710710707,41.75975975975976,41.808808808808806,41.857857857857859,41.906906906906904,41.955955955955957,42.005005005005003,42.054054054054049,42.103103103103102,42.152152152152148,42.201201201201201,42.250250250250247,42.2992992992993,42.348348348348345,42.397397397397398,42.446446446446444,42.495495495495497,42.544544544544543,42.593593593593589,42.642642642642642,42.691691691691688,42.74074074074074,42.789789789789786,42.838838838838839,42.887887887887885,42.936936936936938,42.985985985985984,43.03503503503503,43.084084084084083,43.133133133133128,43.182182182182181,43.231231231231227,43.28028028028028,43.329329329329326,43.378378378378379,43.427427427427425,43.476476476476478,43.525525525525524,43.574574574574569,43.623623623623622,43.672672672672668,43.721721721721721,43.770770770770767,43.81981981981982,43.868868868868866,43.917917917917919,43.966966966966964,44.016016016016017,44.065065065065063,44.114114114114109,44.163163163163162,44.212212212212208,44.261261261261261,44.310310310310307,44.35935935935936,44.408408408408405,44.457457457457458,44.506506506506504,44.555555555555557,44.604604604604603,44.653653653653649,44.702702702702702,44.751751751751748,44.800800800800801,44.849849849849846,44.898898898898899,44.947947947947945,44.996996996996998,45.046046046046044,45.09509509509509,45.144144144144143,45.193193193193189,45.242242242242241,45.291291291291287,45.34034034034034,45.389389389389386,45.438438438438439,45.487487487487485,45.536536536536538,45.585585585585584,45.634634634634629,45.683683683683682,45.732732732732728,45.781781781781781,45.830830830830827,45.87987987987988,45.928928928928926,45.977977977977979,46.027027027027025,46.076076076076077,46.125125125125123,46.174174174174169,46.223223223223222,46.272272272272268,46.321321321321321,46.370370370370367,46.41941941941942,46.468468468468465,46.517517517517518,46.566566566566564,46.61561561561561,46.664664664664663,46.713713713713709,46.762762762762762,46.811811811811808,46.860860860860861,46.909909909909906,46.958958958958959,47.008008008008005,47.057057057057058,47.106106106106104,47.15515515515515,47.204204204204203,47.253253253253249,47.302302302302301,47.351351351351347,47.4004004004004,47.449449449449446,47.498498498498499,47.547547547547545,47.596596596596598,47.645645645645644,47.694694694694689,47.743743743743742,47.792792792792788,47.841841841841841,47.890890890890887,47.93993993993994,47.988988988988986,48.038038038038039,48.087087087087085,48.136136136136138,48.185185185185183,48.234234234234229,48.283283283283282,48.332332332332328,48.381381381381381,48.430430430430427,48.47947947947948,48.528528528528525,48.577577577577578,48.626626626626624,48.67567567567567,48.724724724724723,48.773773773773769,48.822822822822822,48.871871871871868,48.920920920920921,48.969969969969966,49.019019019019019,49.068068068068065,49.117117117117118,49.166166166166164,49.21521521521521,49.264264264264263,49.313313313313309,49.362362362362362,49.411411411411407,49.46046046046046,49.509509509509506,49.558558558558559,49.607607607607605,49.656656656656658,49.705705705705704,49.75475475475475,49.803803803803802,49.852852852852848,49.901901901901901,49.950950950950947,50],"d1":[77.293239404447377,39.923926973016933,90.411779674934223,79.826154470909387,32.591701752506196,38.72916494589299,22.534130872692913,69.080114238196984,31.031041258247569,80.863249590620399,42.151238184887916,97.922639803029597,36.550530805252492,57.30124370707199,93.546432737028226,17.307475686306134,15.566923893289641,87.103438236517832,63.747341171139851,41.699071350507438,25.498002181760967,36.002124750986695,85.618113241391256,59.736883229343221,25.912922947434708,42.55257674260065,55.695854787714779,64.441048716427758,99.94032352254726,28.64475885941647,42.631236764136702,42.873333858791739,15.189916380215436,30.142867916030809,30.015792230376974,37.527719827834517,46.407682022545487,41.845187586266547,40.696468438254669,17.811823711264879,31.434625306166708,27.359877647133544,94.314695600885898,42.976306047290564,71.803801770322025,53.498643501428887,96.628127929987386,76.804716839687899,49.979612323222682,84.586498138960451,94.689962575677782,38.723082956625149,11.519254405517131,81.178119420772418,65.317325247917324,96.298164745327085,82.295742353657261,15.972674501594156,31.735356544610113,18.18549878615886,93.989712558453903,21.082103217253461,78.93038710183464,61.931966145755723,84.554008747218177,57.773035615682602,62.038259375374764,95.84119303477928,81.539768566610292,29.928150082239881,40.28466646769084,75.431270524626598,30.888115722686052,75.970193478977308,38.802384777693078,18.480908447178081,63.022589920088649,33.317597890039906,84.862358713056892,50.425256226444617,36.851161728845909,71.937724560964853,46.827340401010588,91.022884914185852,87.723099746042863,11.134820568142459,65.711819539545104,77.019048934802413,99.215712745441124,97.416304213693365,29.129199743270874,30.897711239056662,84.621608419343829,96.662414099322632,71.151683941250667,94.503636849112809,33.156503078527749,33.743692582007498,53.344920391216874,83.37650068779476,46.517695542657748,31.679584886413068,64.350003986386582,88.3719191623386,82.246526118600741,85.623738291440532,20.351120592560619,79.214279598556459,84.108355042524636,98.129155214177445,85.856683443300426,35.07937357830815,42.551055525196716,71.986329623498023,49.276182319037616,24.748551242984831,61.929290406173095,79.33832084806636,73.373401600401849,19.039110688958317,77.079807842848822,90.347494060639292,78.451689341571182,80.734313490334898,45.632460238179192,59.56826229672879,49.207921451656148,25.36747283465229,96.114674980286509,21.206215501530096,61.994451812002808,22.044719088589773,86.625262482324615,59.836364767747,35.594733048928902,55.232014752924442,66.386801383690909,73.879236713750288,63.364190103951842,60.046276668552309,96.748693366302177,53.74314912641421,18.645339861977845,59.73475081869401,55.544401868246496,19.686446560313925,57.421481115277857,40.176330035319552,19.024773892015219,95.902561644092202,91.515316794859245,55.657240657368675,89.710614929674193,99.566140988375992,50.070080071920529,72.776977556524798,80.573312880704179,13.844930761959404,24.213387577794492,16.956962317693979,66.16361779300496,58.629896758124232,34.195507889613509,20.907441407674924,50.663403203710914,25.997159115271643,86.115956238936633,87.831551267998293,28.462238113861531,47.893462837906554,38.042794620618224,51.791331337532029,54.01321661635302,85.407375260954723,41.065272451145574,12.727057425305247,82.065238825045526,89.193412015680224,98.886393888387829,79.542826812481508,25.155232700984925,50.052796886302531,32.082300809910521,38.922288687201217,73.499060610774904,42.599879991495982,44.41697792080231,55.112597663654014,97.659736256347969,80.375276529928669,97.535194074967876,64.959113766206428,68.289125947514549,74.312167507363483,87.548800135031343,20.49783455231227,46.767622106708586,64.539283727295697,67.24184061284177,96.240754915168509,98.686060884967446,36.330626542447135,60.793489535572007,37.606168692931533,94.089680233271793,84.292257277527824,75.110545195871964,54.579417646396905,54.079427484190091,99.202766970032826,67.87376763834618,44.911861723521724,89.999681422254071,49.158160229912028,28.687571190064773,17.085907929344103,46.187598618678749,12.61035590316169,99.303601463790983,89.198302349075675,46.809293322265148,89.521966316504404,69.638226546812803,97.12386112450622,91.219983224757016,29.75733979512006,99.588977919891477,58.778266192646697,69.131531867198646,64.538368315435946,20.65084194787778,98.149076798465103,14.214149068342522,25.442450093105435,66.010119847254828,82.341483894502744,61.475848323665559,73.474328182404861,96.614854292245582,81.036621812498197,77.403386353049427,95.886116080218926,69.963932763785124,55.088912334991619,57.57488539791666,67.016644798684865,34.130590463755652,98.31151859741658,96.617445216979831,77.362875834805891,59.078159477794543,61.862737895920873,13.694044421426952,60.874716672347859,72.971987573429942,33.479676972376183,57.254737527109683,92.971622388577089,16.253719515400007,16.683949330123141,90.213225213810802,16.479630546877161,40.387999217724428,79.5955792858731,31.443406264297664,90.845469243358821,21.141429038252681,85.51789174368605,38.67212152085267,27.317082536406815,31.33047675457783,35.815228135325015,69.027748187305406,50.720900273183361,16.88825095561333,65.092806564178318,35.513392956927419,13.210514121223241,36.082000900991261,99.09574300237,89.325896870344877,88.420137242879719,50.545401898678392,31.117232415592298,78.276356825372204,88.55316298129037,64.693377179792151,88.658749551745132,80.710668652318418,58.896238072542474,21.139827150385827,53.097645695088431,98.092186156194657,43.8432398699224,86.525104227941483,79.638436210108921,15.507537750760093,86.516289721010253,52.491962741827592,92.952338252216578,39.983141102828085,71.456311026355252,67.08825609087944,15.576594091486186,31.496625519823283,57.505996552528813,62.609762379899621,65.748823099536821,64.680912049487233,96.287176073063165,64.389239608775824,39.246851240284741,50.910081377718598,35.651653551496565,14.152687832014635,47.555967087624595,56.7295202834066,79.666372600710019,47.28798441006802,95.567425893386826,20.616096891462803,60.301116753835231,51.928930985508487,18.049550302792341,51.128564613638446,81.555071627022699,60.051489911740646,71.593527670949697,82.680984470527619,59.968263191869482,73.375656643416733,49.980192723684013,88.628959771245718,65.938984744949266,15.645101736299694,21.540873611811548,30.551636610878631,55.578857688000426,51.908138935221359,36.85455761756748,96.30949014890939,54.085369082400575,81.314036427531391,84.934894555481151,51.216840396868065,43.624972432153299,40.675108420662582,67.776469983858988,16.259482656372711,64.699931297451258,76.940571867162362,48.160094735911116,56.104712628293782,62.759810166200623,28.793361850781366,75.171273083193228,49.020225839922205,86.210944227408618,26.013434199849144,95.055855489335954,77.900819118600339,22.962108213920146,43.783225376391783,17.257183340843767,94.821783665567636,70.368918256368488,12.528355942107737,48.827094493666664,84.785976134939119,52.052663395414129,66.766597177134827,14.898381926817819,58.948439819272608,31.676437225658447,68.895179512444884,88.195409599225968,75.670028177089989,93.225581273902208,19.409482543589547,44.054850533604622,89.104080201592296,65.716787331504747,12.278230675496161,40.337886427761987,37.192933324491605,92.856305464170873,27.012424057582393,31.13492927304469,93.440190006745979,23.188685310306028,17.06805895222351,39.922518814448267,62.717296832241118,78.797714775893837,67.706458859611303,53.698470558272675,68.96296479087323,13.935310318134725,87.95135962869972,19.992650625528768,15.97977516008541,44.18485549162142,83.700110239442438,58.078452061163262,58.074099586112425,74.969479204621166,72.797200064640492,71.722064604749903,29.904036016901955,63.957084395457059,59.351915574399754,15.771925919922069,73.524303834652528,82.411782804876566,96.122676006518304,33.800557632697746,50.564253008924425,19.996412152657285,18.600406538462266,84.674342636717483,16.103273246437311,40.029341510031372,67.021093547809869,22.816325124586001,81.859936889959499,45.405973696615547,72.516028895741329,38.54654757399112,41.73239977308549,75.708034160314128,95.266683071386069,91.007568052969873,57.296938540181145,67.776793846860528,95.889359538443387,26.919652590062469,17.550011857878417,13.571392639307305,29.425842918455601,72.746596289332956,79.977475598920137,40.32250161934644,92.36271611880511,40.602238105610013,80.64700761763379,98.273828975856304,37.302543305791914,42.644482261501253,24.514269091654569,87.145643000258133,86.464036501012743,86.850174944847822,80.852058755233884,13.393350814003497,35.104003557469696,90.172347606625408,31.275153125170618,30.090511998161674,39.571066410979256,85.130751891992986,84.831000469159335,66.361263286788017,84.174215378239751,25.364319910528138,61.790773812914267,64.421485849423334,61.892837593564764,62.415514349704608,36.45562599459663,73.420302719576284,73.222886534640566,90.918578337179497,81.866957085207105,15.379347225418314,50.301426029764116,84.539058726280928,50.713189229601994,64.340014898451045,52.443954636575654,52.453828179044649,35.834487384650856,76.767913494957611,71.108402859885246,80.878519164398313,91.426142819691449,64.641228729858994,91.858804642688483,97.560213356977329,77.500528365140781,29.669284513918683,34.185524230822921,64.276243063621223,72.377767845289782,14.344110220205039,22.732929458841681,46.675766589818522,21.99157443200238,21.686462536687031,27.990353785455227,31.576181163778529,23.970156703609973,36.904534223023802,63.0688813587185,84.182307456620038,17.529190714005381,43.470794765744358,84.187033817404881,30.271614742232487,75.338364240247756,67.651894668117166,93.401365341618657,38.878766899928451,54.844834990799427,47.547366658924147,69.284577660495415,76.501262367004529,90.220989284804091,86.781336930347607,58.928776554530486,17.686288514407352,36.116259903879836,12.50149456365034,97.860219224356115,71.018767283065245,14.241870614001527,94.220222075702623,40.035766944522038,43.795177929103374,97.598212543409318,92.162738745100796,43.487903327681124,65.682733475696295,38.514316211687401,51.964554713806137,21.761202114634216,59.547200882108882,92.503148122690618,26.724093317752704,23.057559669017792,96.447821653913707,40.558491920586675,88.372119771316648,90.875710906926543,18.440127466339618,55.468741117743775,78.696761835599318,65.760653579374775,94.234455946832895,62.898834695341066,19.789183409884572,73.144599611405283,64.311907924944535,13.610578280407935,46.725288701243699,57.981558815808967,99.894508978351951,13.854483425384387,62.351521784905344,84.615666676079854,38.032207580748945,41.258772564819083,27.498424017801881,86.357275598216802,26.454510306473821,32.900191964348778,31.196242741309106,62.752720987657085,77.280559449922293,94.453242531046271,38.371691579231992,15.253068505087867,83.196380556793883,15.804011275526136,80.116313775768504,12.835004596272483,72.891637367894873,71.651587402913719,87.204592656111345,64.277938490267843,78.702322233235464,21.148673278978094,24.924309884896502,81.865835718112066,91.543762882705778,65.988702782196924,15.387701974948868,17.249003670876846,70.131872442318127,17.165828424273059,37.366380849853158,23.104657397838309,72.570332819828764,81.211327448952943,61.132405732525513,19.223463211441413,19.298360814806074,32.170322314370424,84.453944964101538,32.684664234751835,34.439698479138315,20.329176983330399,31.203864141833037,87.393395626917481,37.738505717366934,73.139779628952965,38.300984488334507,76.303050107788295,16.737903882516548,68.897225782042369,47.379606287227944,56.948080563452095,44.06155623216182,40.048543566837907,94.46302796388045,69.898081317776814,62.272132517304271,21.463328036246821,32.10644645546563,24.155749827157706,54.635826897574589,12.759055127156898,34.17255893535912,96.821964422706515,26.12961035897024,97.363188339862972,30.668411447200924,22.023585064336658,87.377478596521541,52.599492034409195,85.589756174944341,69.445766487391666,21.212834665318951,36.826515586581081,51.215187988942489,78.153761220397428,53.317333227256313,60.672506137983873,83.017774535575882,49.073541245190427,31.446565425721928,34.780271124793217,37.917606868315488,78.082510593347251,44.978336650878191,90.955493393819779,31.580840199021623,75.831518943188712,29.954232150455937,47.207882328890264,42.618095684563741,94.510110171977431,31.048334141727537,33.733043645741418,70.681107270065695,58.451528458856046,82.879381900886074,95.9731836093124,55.397731921868399,34.829531290335581,12.654236656380817,33.257531073642895,62.911628558300436,93.562871711328626,85.591331352246925,17.103829163825139,11.35754402843304,37.646634265314788,68.540371068520471,63.650934165809304,89.024341810960323,29.093623861903325,46.072160015115514,67.593605192145333,31.289344827178866,82.054953019833192,20.678884289693087,55.651393571868539,45.13456209958531,68.922280519269407,32.530965244863182,81.839993547648191,77.893839496886358,31.770264765480533,93.357459763530642,64.474665857618675,29.747825695201755,21.009151547914371,92.175210713641718,56.903143655043095,24.562850717687979,85.567820854485035,95.955234027234837,92.950319957220927,34.181009005755186,55.342285328544676,74.870151567971334,35.707390376133844,19.709222009871155,69.074276291066781,64.959384436020628,92.6395934142638,41.548659852938727,56.375711299479008,19.5003375436645,97.703041789587587,63.771081703016534,28.557825981406495,45.758507888298482,20.895463470602408,92.156207856722176,37.464531667530537,70.361390664009377,46.281249897787347,27.036212436389178,48.447255598613992,87.728862679796293,38.721306590130553,85.032973198685795,72.752041576663032,99.184675090480596,19.176592802163213,75.871697972761467,46.785886517027393,91.261082763783634,37.271091025788337,88.084214929258451,38.27821351471357,39.501242447178811,20.394940692698583,22.783561581745744,63.850656473310664,91.838567815721035,36.162748594535515,88.737455679569393,24.814724376192316,37.608949575573206,11.058621358359233,88.15545706031844,36.23999192006886,60.081075394758955,60.022168239578605,28.573400354012847,88.510294742882252,51.392236322164536,14.760554917855188,77.6026902848389,91.520256197778508,84.342097366927192,22.656693861354142,37.593948744470254,85.20187659189105,27.456788982730359,82.241684958338737,65.717591445893049,92.691327840089798,57.679463556502014,23.220026147784665,18.359734490746632,55.921175783034414,92.05543861631304,47.041304764803499,23.075237462297082,26.447922453517094,25.706247790949419,62.191341659985483,68.695831567281857,64.953396130586043,62.867078176001087,30.08567106584087,16.154024002375081,57.273970666807145,98.895656838547438,99.037536662770435,94.627868450246751,54.602449591970071,12.057036306941882,72.843715921742842,69.16990297078155,47.61654260661453,93.021864359034225,14.095130378846079,14.865670147351921,37.062008478678763,22.463341805851087,82.328314570942894,26.029651408083737,41.838676984654739,92.955979260616004,18.415119001176208,84.018580255797133,56.488466827897355,88.810552920447662,43.648173054214567,60.522385099669918,76.813676255056635,15.322140801697969,57.701874217251316,63.923145691398531,82.602358246454969,37.795881169848144,83.70509506482631,49.254807796096429,27.862961510196328,81.542576947249472,22.008717495948076,77.643274428090081,84.068686684127897,20.449544400908053,67.772888323059306,33.654261572053656,12.434662825427949,27.415253143524751,90.739961540559307,56.647300794254988,56.868380384054035,31.87172821117565,59.462452799780294,47.578049740986899,64.973356444155797,42.543393136700615,78.678823712747544,50.820553803583607,87.125871339114383,81.774996570311487,45.075292207067832,33.95973355229944,18.533777626464143,79.819023827789351,76.314723660470918,82.403585852822289,40.547050453489646,95.112774458480999,85.7377082076855,69.733913278672844,44.083374370122328,86.349759195698425,84.711159036261961,85.655000095488504,26.710157966706902,40.271710227709264,22.527267418103293,53.626434093574062,89.309638611972332,40.959930047160015,14.923042698763311,53.288738065864891,72.118081709370017,69.082411201670766,76.305788966361433,25.965058114612475,49.90834731515497,35.136857510078698,44.805663421051577,49.565716008190066,98.189511847449467,81.710845814319327,46.510414375457913,70.619029328459874,50.176635641139001,58.042312605539337,24.955902079353109,46.483256590552628,40.017051024129614,87.317624490708113,38.951511826599017,57.088696039281785,90.610559031134471,82.531150016468018,32.985152259934694,20.067688537063077,38.650432107504457,69.123375157127157,47.389332641847432,89.966240417445078,74.012969380710274,64.446803879458457,23.783745664870366,70.11995030939579,88.547664024168625,22.720920749707147,18.400874955579638,58.35262539377436,52.094667384400964,64.168762343237177,13.704623151803389,74.362480491865426,78.034847321687266,31.342917515896261,73.303797662025318,65.051511907484382,30.091590242926031,38.439375465270132,71.511517266044393,24.12818918726407,60.599048418458551,49.557623432483524,86.710422143572941,61.122747470159084,60.712329247733578,33.159749189158902,91.25785604887642,42.924228279851377,48.337075660703704,18.869931569788605,42.873423273907974,86.091695731738582,54.519889019895345,64.670130472164601,33.780630660708994,12.720343583030626,93.69606527662836,29.830648544710129,52.541356978239492,22.734008801868185,33.606698470190167,64.036584939807653,49.378442108398303,34.616228080354631,73.525170425651595,96.627246937248856,46.807358122197911,81.105440638493747,27.183767312671989,30.388645618688315,87.206349378218874,47.19378913892433,62.993909363634884,15.638690392719582,44.248511801706627,50.186844112118706,30.730814495123923,44.574726120335981,30.49047607043758,93.293573067057878,57.478687124559656,99.178713619941846,49.574620987055823,88.245085280854255,76.976055411621928,16.942564204568043,17.270017031347379,63.470371124334633,86.412675960920751,72.557939118007198,71.509341028518975,46.107777133118361,23.1619855214376,81.930297261569649,87.397794871358201,52.052040701499209,28.785236969590187,27.881836989428848,65.053252984536812,48.637236362323165,59.3310033576563,91.80213197437115,25.446897806134075,43.298304406926036,11.503122488735244,96.459083731286228,79.662177778081968,67.807530432939529,79.06609262060374,29.090488675748929,48.475172199774534,82.595447545871139,16.05637361924164,17.295305947074667,63.131482632597908,89.601675489218906,26.499816666124389,31.222609818913043,75.846348590450361,51.743251202860847,58.551903506042436,83.429932819679379,33.522721740882844,76.854023484513164,92.618051043711603,28.974359120242298,78.47931324550882,25.278415938373655,89.945735303685069,59.578006824478507,17.123037437209859,30.232553391251713,27.334009574260563,49.064093994209543,76.599466398591176,17.189125569071621,73.007621496915817,63.198538478463888,80.152368375100195,53.362346475245431,55.669404428685084,63.88799802865833,48.86921777878888,57.789020344614983,65.400104539934546,96.597139303106815],"d2":[87.163697746116668,95.090321690775454,70.700942568248138,92.550161637598649,57.599692052230239,67.960569864604622,37.594571479829028,49.799795581959188,73.653247912880033,39.374682696070522,44.96336802165024,78.223261383362114,61.523964742431417,66.589448156068102,90.019625096116215,28.95864441874437,86.022486463189125,45.546511900378391,90.993071676464751,19.319512431975454,94.571275354130194,57.185024094069377,83.57372886268422,96.56677133939229,11.120846653589979,72.82599463313818,11.275071897543967,46.964733327040449,18.78472426882945,81.946541615528986,34.204734182683751,73.843065470689908,13.029081753455102,79.96132986061275,48.743548511061817,87.488097259076312,41.354782683076337,31.237473077140749,59.180499916896224,97.545702495845035,93.429048468824476,11.724852684885263,37.566450684797019,63.825720472726971,41.089546344708651,91.284001111751422,87.493729437468573,33.293764586094767,41.302569497842342,38.075073208194226,23.292715477524325,72.216592819197103,56.194107250543311,17.069781338097528,87.242426896002144,11.434954766416922,45.203911738470197,67.218148300889879,72.916492304299027,63.436278912238777,66.883471830980852,23.883240796858445,51.084545831661671,81.775359079707414,53.151997030945495,22.440756127703935,95.523866019211709,14.062398478388786,18.431283285608515,14.284421205986291,35.904773509595543,88.529884196119383,50.783650413388386,51.788452232955024,63.293842662824318,19.146987322485074,89.10943887126632,17.517882323125377,52.749946281313896,13.559373071882874,49.930243968497962,99.457826500525698,77.410460031591356,38.700370253063738,52.644031081814319,66.904225545702502,87.613634383073077,34.072927411645651,52.519569384399801,45.403047864092514,55.331299287965521,61.571161770727485,54.381327708717436,99.394289755960926,31.422720849048346,63.832411437993869,18.614148761145771,34.075174435274675,16.997114781755954,33.935205379966646,90.066793134436011,86.228726397035643,31.751924057025462,12.210392493987456,87.682022545253858,42.998622837709263,74.344423197209835,21.803850514115766,88.68035618099384,90.663156628841534,94.482178920414299,31.309184622019529,23.432345480658114,63.741814695298672,46.057113057002425,55.568759768502787,98.270092004211619,25.738883127225563,68.386668410850689,28.419983078725636,90.780469800112769,96.020639599533752,53.918506053043529,45.731890220427886,12.254283711779863,58.383945405716076,66.436350516509265,68.484716634266078,31.567486968357116,63.341925864340737,57.941622958052903,24.698558681644499,75.524284355808049,88.57528459187597,65.060005514649674,50.052821503952146,63.364613867364824,63.160560221178457,49.575700972462073,52.409964625025168,32.731387953506783,11.50719911349006,49.177471884991974,18.668273627059534,11.905793155543506,96.168904036050662,65.185108659323305,68.707759274402633,96.259791797492653,32.379740349482745,19.494740716880187,58.733004198642448,14.167560145724565,60.405985019402578,89.874925141921267,21.321279121097177,32.977781055960804,97.083984427852556,11.793439922621474,63.98304300243035,83.527904351241887,40.806018015136942,23.504449975444004,25.13815053878352,89.308113229461014,60.694619335466996,19.488533836556599,58.438089211471379,42.377849099459127,79.800771560519934,63.814430690137669,42.764729491900653,63.081165482988581,98.568352836649865,70.423677379032597,48.012946320232004,68.674413217464462,16.800244039390236,49.569846986560151,64.726169629720971,23.438529856968671,21.181749204872176,77.921726507134736,26.715053418418393,32.519024793757126,19.515649328008294,68.890879836864769,48.328813393134624,87.306291482178494,54.728896118467674,18.508971303701401,94.123301435960457,97.515934991417453,73.168475768296048,13.799934360897169,17.565613914979622,85.351004863390699,75.219758186489344,85.378487858222798,86.71816194918938,15.437317749485373,60.338257410097867,59.583872766932473,73.643592385808006,94.942115254933015,99.704757399158552,39.611103288130835,15.551031397655606,82.775545670185238,21.018108518095687,64.524489286588505,60.133351077325642,81.276221376145259,83.189454128267244,82.127467684447765,69.317109656520188,15.411264049587771,31.003648693906143,36.204678896348923,29.408371329074726,69.157657637959346,34.201122330036014,54.579325599595904,95.820810304721817,97.583849035901949,93.886366774328053,77.615601972676814,24.17631459934637,61.537861675024033,98.473695839522406,37.607810574118048,79.765460940543562,33.793770331190899,94.01006426778622,89.904177706455812,29.954947119113058,50.765276798512787,70.73210575664416,83.622865546261892,30.079595313873142,19.752019835170358,30.385598625056446,87.503817596938461,40.292104271939024,13.458981281379238,73.503488845191896,91.024922252632678,75.299884222215042,91.094259396195412,31.217781962128356,57.64543429762125,85.936986879445612,21.697756857378408,54.984307196456939,26.823674756567925,16.002659586258233,73.843575893202797,16.205744337290525,84.991018279222772,69.108389183646068,14.100210027769208,33.620263914112002,78.447645250242203,90.962038766825572,96.182983466656879,97.547857493394986,41.515475945081562,57.374947685981169,67.803690121043473,63.44558388646692,41.527516959700733,79.837249923264608,30.265954174799845,97.562157736858353,80.971855635987595,92.187141839880496,75.355006393045187,56.372654338600114,35.816662963014096,35.793694820255041,62.836397331906483,17.809328003786504,48.469514678465202,51.060261328471825,19.194115098100156,68.001785798696801,13.138431384461001,97.536780566442758,54.711976499063894,93.871350277448073,35.765764894895256,30.768273170804605,41.2383873895742,68.3230274557136,36.574114845134318,76.041260012425482,26.210387332597747,94.930071774404496,46.534434798406437,92.577704746741802,73.090812160633504,12.655362292192876,29.127203081967309,67.834619483212009,70.303057651268318,45.823936669155955,50.432881522690877,88.805871878517792,49.563278757268563,19.786665923660621,26.596310268389061,83.462860542349517,28.195006025955081,40.265628549270332,65.861498744925484,66.56828655092977,34.941943953745067,64.103176324395463,60.811336295446381,45.997158056125045,95.085774968378246,84.338998464867473,74.587975551374257,70.689391875872388,71.450548900756985,96.433464300818741,96.384871215559542,92.021718943025917,80.004753343062475,81.450477636884898,65.087700101081282,70.103611173341051,95.372210087021813,82.944216024596244,16.3081046694424,29.855453043943271,34.915398916229606,52.299503532005474,98.814523447770625,79.171655526617542,79.726399485953152,22.388878616970032,53.306532627204433,23.047549278941005,71.600060382857919,41.496860816143453,48.107193023199216,58.27076868340373,44.833279471378773,38.886709780432284,29.98106470471248,17.350199782988057,45.081480955705047,88.116131028160453,13.640430330298841,29.027369830291718,53.036575004924089,32.549077929230407,40.670169079909101,64.883146849228069,97.850187801523134,54.454055519076064,60.43447485123761,80.938342643203214,86.321023539640009,52.068698209244758,47.317651247372851,19.754502363502979,52.119616833515465,32.045274103526026,84.541297917021438,73.579308512154967,99.217084557749331,53.07144673448056,57.631341273430735,17.684118555625901,93.363883146550506,76.301056658383459,76.772945856442675,28.426501098787412,61.501274439273402,94.509377361740917,97.221211682073772,87.303871409734711,84.380448349518701,88.02183693414554,96.405225929571316,28.338455577613786,68.524800011422485,47.101608101278543,44.7820401545614,84.410461263731122,53.415146360406652,90.217373474268243,92.158193100243807,83.997130097821355,12.321993085788563,79.815127939684317,24.945752686588094,25.891615936532617,52.969540937803686,98.720248853089288,59.326260647270828,64.844968708232045,16.312501634471118,77.642987781669945,69.56469700508751,62.312669787555933,90.177542096469551,25.963198363082483,20.757302382728085,38.367736239917576,49.961807255866006,79.51573537918739,35.940477887634188,95.04549786192365,98.686921963933855,62.404493123292923,65.179525156738237,64.279013378079981,33.583679579431191,14.061221493640915,22.802711025578901,40.986576808616519,59.505435754777864,33.091928144684061,84.674549835268408,92.123045251006261,85.49355810880661,12.640777288004756,85.168029872467741,14.278243232751265,29.130673445295542,77.702183448243886,59.453175427159294,71.178032866446301,88.869902426609769,30.184010411612689,21.769007256487384,69.161231155041605,87.215218197321519,57.647189921466634,91.080065497662872,97.686760260490701,30.389995424309745,95.122041718801484,17.851138180587441,89.629740272881463,53.205149644752964,48.649870956549421,85.31744491471909,34.896882858825848,52.77602157345973,44.999640221940354,47.825524776708335,25.308110170066357,55.744417349575087,37.20474685379304,22.164156588958576,49.409249895019457,22.773393787909299,84.574392596259713,88.472307347226888,81.239418425131589,64.662565891165286,49.405934324488044,34.611853557173163,91.582321954891086,87.967429690528661,52.276411078404635,16.17174149886705,51.773830944672227,51.740095501998439,50.300180434715003,75.276658568065614,61.794603743124753,41.170924337115139,92.98265463905409,46.708567038411275,66.636992193758488,57.901198145700619,14.701751123648137,90.586978265317157,90.377663321793079,80.274099150439724,21.982320640934631,17.17371674394235,13.406582303345203,35.811823128955439,13.943019434576854,44.763915430754423,36.213636840460822,87.955856659915298,67.916023833910003,48.376472541131079,67.278682251693681,32.349095167824998,54.651010661851615,64.191252037417144,39.656455712625757,53.666991671314463,86.174244222929701,90.970727864652872,28.479296321514994,94.189122234238312,33.55287322262302,83.791928146034479,63.976517895469442,74.092899096896872,56.123207756550983,77.146630567032844,43.267579963896424,91.074170689564198,88.318340319208801,16.806342917028815,44.886472244281322,40.896094160852954,31.279532227898017,11.385821564123034,64.06784755201079,84.70050850440748,48.513521462446079,56.161748614162207,50.912501906044781,43.588457101490349,34.039626715006307,31.170934450579807,97.934212149819359,58.600021727615967,93.27616782928817,36.764153609517962,16.089998158160597,17.08500955090858,56.961047723889351,18.562396638793871,48.064845443936065,17.082212878158316,23.96500098449178,47.473668419988826,47.747594933724031,21.980942653492093,83.184738356387243,50.428476828383282,58.474987234687433,91.005636810790747,20.279667968163267,42.473871381487697,42.315479952609167,21.695852719480172,25.387090034550056,61.650880744913593,83.517620411003008,88.877912383992225,51.799557942664251,42.023173234425485,52.343739562667906,14.730969869997352,14.055539582623169,23.668234803946689,76.901606479426846,17.816762761911377,35.759076416259632,76.906866284785792,41.220316397724673,51.630736608291045,43.366357744205743,70.474188734544441,85.689327625790611,73.232900468166918,62.652752110967413,61.850791849894449,93.191589832538739,66.953707352979109,96.960850259987637,89.120989169925451,77.389449489302933,69.949304699432105,67.045341953402385,88.911811965052038,15.103762066457421,52.60901492042467,17.212209381628782,23.578906761249527,65.102277272380888,17.063966868910939,15.296137020923197,74.567574482411146,19.725264884531498,38.410756307886913,96.303339362842962,70.733593383803964,46.473815411096439,69.065454655792564,31.491202467121184,58.263346254825592,59.034977198578417,74.644525981042534,18.116478791693226,55.928145251004025,90.425602775299922,54.431942922528833,25.598601129371673,55.307609607698396,77.693809738149866,94.301824528025463,31.53653234615922,45.646070172078907,12.510003608651459,21.425919134635478,99.122349770506844,32.397696624742821,26.28175050043501,71.956856391159818,14.295154211111367,85.693571455776691,49.188615743769333,97.342872147914022,51.848176039289683,30.150095434160903,61.302541210083291,78.670558171113953,51.59937666519545,62.985153541201726,48.938055337406695,46.86269024759531,31.970871671335772,56.393589971121401,39.673420837381855,55.112335324054584,98.391718113096431,68.971783069195226,13.290182699682191,77.189847058150917,13.752851116703823,37.873858445324004,63.329795268829912,18.975462646922097,41.661593817872927,84.51092783967033,52.425852893386036,45.673243975033984,28.424900019075722,80.002131894929335,92.267414006637409,26.963849725667387,50.376345784869045,20.733147785300389,19.869120627408847,91.559092135634273,66.083469398319721,88.995239397510886,71.252743993187323,99.981538399821147,52.925065175164491,87.918667265679687,44.458219135645777,14.282099728472531,33.713757893070579,59.47673679725267,86.445699045900255,99.787840060191229,45.59548152377829,56.479725427925587,51.261632231064141,88.742583299754187,67.464168408652768,17.249710806645453,53.170433889143169,98.89094761479646,61.644882824504748,93.121495509753004,20.687382849399,61.219221718143672,66.880684752482921,49.400122839258984,61.052230047062039,41.068166102515534,96.962792008183897,75.144385595107451,11.180671417154372,12.215345739154145,22.757379323011264,44.291357453214005,29.655565727734938,93.118984177941456,94.679229570552707,59.636688317870721,78.348847328219563,53.175930939847603,98.857435181504115,55.191820990061387,77.59473432879895,38.498426016187295,58.968359911581501,95.624542218167335,86.177674572216347,98.397402158472687,17.233791704056785,56.707116129342467,94.848111661616713,99.340494078584015,35.141603453084826,51.570089598651975,12.273310502525419,48.917638726998121,17.092593797016889,29.976115189492702,27.578760505421087,28.199204122647643,28.835403118515387,85.11512755881995,89.007730368059129,75.670702074887231,63.464392081601545,58.147366974735633,51.389674822567031,84.78818540321663,92.499474725918844,56.556824839673936,28.400605362141505,60.124604144599289,95.280377281364053,29.982355142012239,90.346559480996802,63.316035411786288,94.355067489435896,23.705926953582093,77.587970484513789,15.647894223220646,33.502446785569191,71.814403957920149,92.593332395423204,65.16179367294535,59.532948734238744,30.5493784181308,56.215880421921611,47.158914860570803,81.101526970975101,67.061807161662728,28.37009503878653,60.422378571238369,76.123701143311337,22.354536270489916,86.396054509328678,26.058651393046603,69.402419634629041,11.088947816053405,66.976788886124268,48.216459725052118,83.885958284139633,54.47522495710291,98.16072490462102,25.228326605632901,91.626251135254279,70.348633313085884,80.217563764890656,12.594913322012872,30.489312306279317,21.651106867240742,51.014634607825428,95.739152462687343,75.872315859189257,97.851003022864461,85.608422487042844,13.751394282327965,23.659500739537179,54.955483845202252,97.244317128323019,87.782268867827952,94.136555595090613,32.61597865074873,31.043815580429509,85.250044318148866,92.214746327372268,83.409616296179593,43.496021867962554,66.978606903692707,11.190345428185537,11.199199472554028,93.382664817618206,44.795430560363457,51.70486936531961,91.492106951540336,79.839027906069532,71.551298248115927,75.613906919257715,44.715258376905695,92.872302253264934,67.24396943859756,52.773447039769962,32.65098770451732,64.190630566095933,61.855763268191367,30.595693769864738,98.373860619263723,58.036271604243666,86.621700237970799,19.895684749819338,36.22653238591738,66.001628851052374,71.738732307683676,26.903823006199673,42.87308287480846,90.162803812185302,98.836482246173546,79.232579298317432,18.474779792129993,82.158321763854474,33.277224198682234,44.151933094486594,83.209848959930241,40.198237588396296,18.513656593626365,28.196991020813584,58.281602956587449,11.39395303488709,82.255445022601634,32.878804738866165,76.755268187494949,93.257315662223846,23.608005651971325,42.853526597376913,49.972588833188638,46.622981935273856,42.183853420894593,57.380545051535591,53.586276904912665,93.552863414166495,63.27890262985602,80.787643483839929,23.976706801215187,23.622391062555835,91.574424268910661,28.194698926992714,67.977287776768208,54.593858405249193,25.501622261013836,18.125375834060833,61.36604270664975,80.008793144952506,93.913836486404762,35.316212608246133,80.696067692246288,66.239760038210079,72.026155219879001,68.328875204315409,52.493516575545073,27.034968768479303,34.168310795212165,42.830695281503722,61.66486719623208,59.475881230318919,33.140589384362102,25.764352178666741,39.417841621674597,25.303979005198926,92.061399112921208,34.628269032808021,89.784583444707096,71.727961733704433,81.718458988238126,29.188838693313301,93.397072442108765,89.147017195355147,26.916755415964872,88.320546458475292,57.061162482947111,16.590050859143957,66.803473608102649,12.10169935435988,92.273228807374835,74.77112628496252,70.093174802605063,54.999115064973012,45.638161379145458,51.581747858552262,76.860674912342802,35.960136199835688,83.769502731272951,29.129709875676781,64.430687068961561,24.953313537640497,18.564738361630589,89.695778941502795,93.089862472377717,38.494645673548803,15.770205253968015,99.782131749438122,57.905220603337511,77.542058754479513,21.577941368333995,78.039966818876565,44.832726423861459,52.409372122958302,83.342095077270642,84.493792235618457,32.724536766298115,28.987972369650379,89.713616708060727,90.677976329578087,74.425564607372507,69.655929123517126,44.655211474280804,29.345921345986426,33.153845429187641,68.184099511476234,33.50398337864317,29.005238915560767,79.284680481534451,18.116302986862138,15.437707777600735,93.310562498634681,71.990682637318969,61.626953384140506,66.204752973746508,36.206034462666139,77.454931774176657,61.456146557582542,97.975752257741988,81.854921499732882,45.168302515521646,48.184825651580468,34.158298602327704,78.232324056094512,89.094788675894961,56.659660615725443,82.742542416090146,51.648476235801354,52.039776138728485,69.823482690379024,19.095590208191425,18.852827380178496,61.21992541407235,74.136389013845474,27.677077285014093,68.636566129978746,58.320373475318775,30.584615350933746,42.597965306136757,83.331755187828094,39.015731441555545,83.994204410351813,75.679990740958601,81.438974004006013,56.903784729307517,27.264735093805939,81.367395763285458,86.881821223534644,29.199839943787083,69.994031487498432,71.351441165199503,17.50301243388094,15.671213726978749,36.429317539324984,82.304340585833415,29.929171030875295,71.392608775757253,99.499901545001194,95.19479626044631,35.640504077076912,19.148674729745835,92.573759872000664,91.851015435997397,22.305235635023564,56.385820470983163,12.778297488112003,65.726416997611523,51.245640145847574,39.130336609203368,52.753915131324902,17.896385897183791,74.852329653687775,86.704651646316051,41.603500578552485,23.862894827499986,18.60920606344007,43.973235316574574,41.820751543622464,66.392837743274868,17.659830757649615,99.782118798233569,91.671041518915445,57.043628064682707,25.094585608458146,99.155498202424496,87.183511845767498,31.16156660602428,89.137170632835478,46.422461439855397,86.96484503429383,72.994613141287118,91.29488729336299,16.753027014434338,88.434124626684934,77.541880483739078,91.074083408806473,48.415638537844643,75.99566982453689,83.207250368082896,84.974016331601888],"expected":[1.8000344862929194,1.3964038284135361,1.4793566669664335,1.3110131626129984,0.90250234998471612,0.82745647970953651,0.638446070957159,0.60613304041014338,0.50447553359222241,0.43043420505040586,0.36981207313093117,0.16683080825351781,0.2382815631186509,0.14564377052492586,0.051456388899582491,0.22543946332512405,0.16113076045820132,0.065317551348484909,0.019818515847381812,0.14250882780885984,0.044983528006834805,0.037068282799363708,0.0035024759726346947,0.0034203547983747812,0.12491830537073251,0.0072839217714671389,0.10031825261166336,0.006962729421673931,0.041735532395404278,0.004985468794780539,0.012917849777917861,0.0013292826869097788,0.065455980158152988,0.0017011917629878174,0.0043349421487629035,0.00038463734088808925,0.0022938324927912423,0.005252779645149688,0.00053282605391043549,0.0016728750594933934,0.00015499021120265587,0.032586813483009389,0.00044723176925330648,9.8963795260944453e-05,0.00025543917595557757,3.1234125603794668e-06,2.019958843225623e-07,0.00042813427310228188,0.0002085196779431378,0.00012311565491537153,0.0014087601920438125,1.0540461066662342e-05,0.0017954393829921968,0.0037776951236082263,8.328004198550161e-08,0.010452347976620731,9.4387395220065983e-06,0.00019315377993294296,4.7923863328303185e-06,9.5438990435521253e-05,5.0351552533017322e-08,0.0014012969732392015,9.8368441167285893e-07,1.3642502840577135e-08,3.5493749282505528e-07,0.00041784525914635435,8.7768967666415814e-10,0.0023835712480937805,0.00070445902241405558,0.0029166518559024042,2.1963996633950636e-05,1.3363973395603536e-10,3.3423761921250542e-06,9.7623993155101542e-08,1.4688429573553752e-07,0.0010491378451858084,9.2814038600433041e-11,0.00072300691558469334,2.0742817960808441e-08,0.001478753161787966,4.9506857791154369e-07,1.2667228295772149e-12,9.9750545897968971e-10,3.3761039333020776e-07,6.0009685407893416e-09,1.9139002009602616e-05,5.2505004410581147e-12,1.0251766111677463e-06,2.0287529798209324e-09,1.5246753059408431e-08,1.1719817205111611e-07,2.6934290293678047e-08,9.155930972747815e-10,2.5089095845366744e-15,1.1468468802767362e-06,2.1284923822932521e-11,0.00013832211766606921,1.7735489094732171e-06,0.00014239476248262164,2.1587948479771086e-07,1.6798195995932664e-12,9.1166327743132522e-11,4.9781094696069696e-07,0.0005467123553670294,7.5584046829286965e-15,3.9845580200099965e-09,7.8126886091596259e-09,9.5541079536471781e-06,1.7298332706089826e-15,2.2798195376809894e-16,1.7588060763017292e-16,8.0554287347599741e-07,6.6700485948954658e-06,2.2335242552721855e-12,2.3650581808721754e-09,7.0577742746053114e-09,3.2722929082927048e-16,8.6679104599551827e-07,1.8369813866194968e-13,4.5037475862044384e-06,9.9946006754185133e-17,3.9384324109767804e-18,8.6886039118234222e-12,1.449427484938458e-10,0.00025096448793445034,4.2073886153618514e-12,1.0212648390635559e-12,9.9883340086363056e-11,2.080930082668138e-08,7.9935074917454361e-10,1.8051513604187684e-12,3.6123179936994401e-06,3.7997357959170678e-16,1.0475256285514568e-16,4.3879548053220987e-12,2.4097602953136934e-11,7.281315565009689e-14,3.6027036769263047e-14,1.074438896998611e-11,4.1015691883649948e-12,3.9398622597795942e-09,0.00017176747856422625,5.7086310852887267e-09,4.5797789092877255e-06,0.00012508132757118315,1.4455920617211039e-12,1.9553486447742736e-14,8.387636208416741e-14,1.3726924142727695e-12,2.1251494012071391e-09,1.5422314723480993e-06,1.1387094948556456e-13,2.422733543746015e-05,2.0263343207123421e-15,6.7161011754893417e-18,5.2823311893750067e-07,1.1576112877644655e-09,2.1266858316451786e-11,0.00011891010649156077,1.1247069016624799e-10,8.8137622311616349e-19,4.0029782409557057e-11,3.2395219984929831e-07,4.6690958023553726e-07,1.0402480565495249e-18,2.4795683007612448e-12,6.8997281349884948e-07,1.2276030761573255e-15,2.311095986357566e-10,1.6340932822540279e-17,2.172980866655189e-14,9.8643419094677617e-12,1.4680243151930622e-15,1.6526548730183543e-23,7.3845778594576265e-16,4.3332208462037935e-09,4.45098971515785e-18,1.9123322184923867e-06,1.6140675154666258e-14,2.1518521846564871e-17,2.2702153438415335e-07,2.0595326410720708e-07,3.1502523306344398e-16,1.6003443498720741e-08,1.9299155543396322e-10,5.0619445930389396e-07,1.1603886007361795e-16,1.2245310381644405e-13,3.0792174938356393e-23,7.3264935358304094e-16,3.6909298498860868e-07,7.0154566364996808e-23,8.3568659834315031e-24,9.4452799102124709e-20,6.3767679940016392e-06,2.4407461608291766e-06,4.2215488654575814e-20,6.8197764966210514e-20,4.9514774831479356e-22,6.8339717418429451e-24,1.7396072909239234e-06,2.4921277689101e-15,6.9482047728737083e-17,1.1284207177064365e-17,6.8314118056517924e-26,2.1864800173139499e-26,6.2896013746122233e-13,1.694742829913721e-06,3.2679948314364997e-21,3.1450673299494538e-08,1.1689901290594749e-18,1.6473114659600848e-16,2.2679229773086284e-23,3.9677009330121177e-21,4.6603891488783223e-18,7.7536168109074269e-14,1.5260739655102518e-06,1.8419400263784671e-08,1.0087832436384705e-12,8.8418102349957854e-11,8.3159177699233472e-19,3.5999679461870375e-12,4.6150272513251559e-17,1.1222695671025966e-27,7.8302288301103892e-28,2.060901859543724e-20,9.0397467866666193e-24,3.0321284652045064e-09,5.9642723065669885e-19,1.7732885802098713e-26,6.4366853819204503e-11,1.5234383142534746e-24,1.7612063182565228e-09,8.3841008395162828e-20,2.8968301588400283e-25,2.7911197091274091e-11,1.9254806990171549e-16,9.8741927010514678e-22,7.531745771614968e-26,2.1087162071248157e-11,2.4602978604264072e-08,1.1683040307673608e-11,1.433360518890206e-25,7.2798104363005204e-14,2.1205939937338801e-06,1.864534961090434e-22,3.1323465075465249e-22,2.2970237363032727e-24,2.7042883859243187e-28,6.1097629350000628e-12,1.4507166793316475e-18,3.6552267290203516e-25,1.0049161628900901e-07,4.0499041860857477e-18,1.0538019083705549e-10,4.0729815681505754e-07,1.8464912003467599e-22,1.596569055816038e-07,5.2620616466092858e-17,1.4998882488195276e-15,7.2048611850090285e-07,1.8252099319680362e-10,5.1173264099578036e-22,2.7176754651778596e-28,1.8957743943876975e-23,1.1366823396883706e-30,1.1279112288430691e-12,3.884185412770652e-20,5.0198799608199126e-20,1.164118419854886e-17,8.1325992263017277e-14,4.7659327539508055e-22,4.3630595385761094e-12,1.1576044523180139e-27,1.4305673342812293e-17,3.2208909832354325e-28,2.0170183823350706e-21,1.6427155128397972e-13,6.0046355844342599e-13,2.6834685619490175e-14,2.6093542004952503e-22,2.3247214823046643e-08,5.0143279797689121e-17,2.7757280629364509e-16,7.8652808406562478e-09,5.8844770460072452e-24,8.9861229809948444e-07,6.2048501186529801e-32,4.8157294516359812e-20,8.2270650343234891e-29,4.0958331392581164e-12,2.1908258817332024e-12,2.2541882441045426e-16,9.1771919091033844e-22,8.6997082954397929e-15,2.9178331167956172e-26,1.4795275263724719e-09,9.8541491299796518e-32,4.3716759171366709e-17,1.36527726953418e-31,1.1541662630673809e-22,9.0853316006974922e-07,2.559852689912817e-12,1.2100487705137318e-16,5.0580949851385834e-21,2.7598241611252593e-17,7.8650304318895483e-19,2.9513387238818018e-29,1.0306113781668994e-18,1.9205801670257585e-09,1.3265424392228005e-11,3.2662205126082638e-25,5.9010864209586046e-12,6.2926735011209618e-15,3.2741992156148372e-16,1.3933197685563841e-22,2.8259562204911051e-14,7.7731449501531085e-24,3.1658463026531524e-21,1.2216446108901838e-18,8.3574702444060101e-23,2.2234254390736638e-28,3.0594865762003712e-25,1.2906372276043389e-18,1.8114129009141894e-24,2.2062770416573037e-33,1.4947535138706629e-31,1.3843543378804796e-31,4.7281260695425124e-29,5.428282622083346e-28,2.31610839160693e-24,2.6482274198610056e-24,6.2722043936739655e-34,4.7732197860427309e-29,1.2403374633272888e-07,1.1874158767750606e-11,1.1285377309565162e-13,5.0871568094405375e-20,9.5771308095787195e-32,3.6951462770138921e-25,3.9942758929148988e-30,1.5467180573154866e-10,2.0893440607701895e-21,4.8329351841485192e-11,2.645818704968812e-25,1.7878468662684074e-16,3.2189463056266878e-18,1.1489300029131024e-22,1.6872764275476459e-14,1.8760521833817445e-16,1.3346879896974347e-13,7.9769405276709849e-09,2.8813637245832698e-18,4.459149535065952e-31,2.4085306963219972e-07,2.513023587012209e-13,1.9704031725267764e-20,9.5523784919194156e-15,2.7660748452204073e-15,3.9887663878549569e-26,2.4259961021473646e-35,3.7211871367410908e-18,2.6652016373247938e-22,3.2097048885533408e-21,3.6336185958295803e-33,2.4032698332188003e-21,2.4954043198930044e-14,7.1865313321984353e-10,7.4143050864694025e-22,2.9602838898571283e-14,3.4080699478162459e-31,2.126371538274484e-19,1.7888911945686212e-34,1.8988234327855038e-19,2.3737675199214919e-23,2.1000880654547759e-09,1.126526687637174e-34,1.8259167676292032e-30,5.9346435290842959e-22,5.449921288845281e-13,1.6117298886976153e-25,2.2263520250444876e-34,5.1339729849959443e-21,2.163056175453844e-29,3.3590098497765878e-28,1.5474429243762026e-34,2.9487325298345622e-28,1.2181019763689162e-12,2.6754947620902574e-28,3.2683086671948492e-17,1.381236728920909e-15,5.8568813171441729e-29,3.095442985193824e-22,9.7354530633764295e-35,1.729062538348087e-34,7.273814842056165e-31,2.0896639840369099e-07,1.3475985926515489e-20,1.5744927256869647e-12,2.1208306482105668e-11,3.3529636103353732e-17,1.5523062347381848e-33,2.828539704685353e-25,5.9882308957361927e-26,5.1153309877582318e-09,4.4598613745694434e-31,2.1305564627573715e-28,5.4300129432604575e-26,8.4148932193686895e-29,7.1785338504239667e-13,7.9493365637459203e-11,2.7275631810275487e-14,6.0195039258994858e-22,2.1608518788843923e-32,3.6764214984192791e-17,4.1066718465739622e-31,3.0207270897562847e-35,1.1661163761252831e-20,7.9784269062529804e-21,1.5444410444855331e-27,2.4164551953497973e-13,3.765914669427939e-08,7.8920955119663511e-12,2.7015978412638642e-16,6.6403845869679497e-26,2.2901845908464174e-15,6.1947802314745545e-34,5.5919684765023314e-32,6.1147725424271029e-31,8.8363625035952472e-08,1.4431290970261269e-35,1.6322247017565192e-08,2.6709609909847838e-14,1.218808319033067e-31,1.4391520969682314e-26,7.8688200804714515e-25,4.274458769193996e-25,2.604553188360999e-12,5.3049917381161334e-11,2.5513594001800138e-29,8.5308488738270606e-36,2.0720751950191058e-23,6.7062350144515361e-38,2.1914200634462364e-34,2.8154919118744818e-15,1.0232568004149567e-39,8.5038819201255835e-10,7.0924202524582622e-33,2.7249544448175671e-20,1.1816333485565114e-22,6.3147175068367273e-36,2.8589864389717081e-17,3.901178802660465e-24,6.472060983120994e-16,3.2156892006645834e-20,2.1096390637160726e-13,3.4017613405694562e-22,1.6668897712890377e-16,1.2921533399016549e-11,4.031696870805319e-23,2.336370391305292e-12,1.0118602341158342e-34,2.584836285960547e-37,1.4776329369975972e-27,6.6201471555168897e-28,1.1810801434993481e-22,5.3121748728292169e-17,8.72071629303913e-37,4.7600727831824881e-32,4.0766705314404165e-24,1.4252851512278442e-09,1.9544496775627406e-24,3.1669848668491128e-24,4.9112497565070799e-18,1.0023457053124838e-30,3.3261660896837143e-28,2.5300728473855769e-19,8.5516785121550373e-38,1.8999367170001874e-21,2.5596751664393348e-28,5.8267459240709679e-24,5.0437115674121099e-09,7.9186660837602083e-38,1.5755949194305588e-38,1.384613391362547e-35,3.8488363840518208e-12,3.4033043359583907e-10,1.5739964581671292e-08,4.2586448971113961e-18,1.8326529579590031e-08,7.3480328482424353e-20,4.5612992254854684e-18,2.0708863696823937e-37,1.3281251695285719e-21,1.225637790944127e-19,1.9594911441213909e-28,8.0654163879321217e-15,3.5663945215852998e-21,5.1670915519928486e-25,4.1912939491641855e-18,1.9567425333483555e-21,8.8119172290315176e-33,6.1914175953915087e-38,2.7586865164704096e-15,3.4088241985378129e-28,1.1896276726556019e-16,3.2528699200332898e-37,1.3664672466678077e-25,2.9313695507223173e-33,3.0080224241168204e-26,2.5000997569796242e-35,4.475424784009369e-20,2.148192586516425e-37,1.3343126820951974e-35,3.6396206207894598e-10,3.0782742071398481e-22,7.441143843250751e-21,1.0662847222082883e-16,1.0094318174447478e-07,8.4159155583521882e-23,8.0028422629913744e-33,1.4802830273589874e-17,1.746174729148501e-27,1.1838046118511936e-24,4.7663757056164972e-17,4.3966177349102599e-18,6.9745105116197676e-16,2.9576224642488675e-38,1.2940416268179195e-28,6.3785914518564013e-42,3.1294992185083732e-18,6.0072297718626037e-10,3.5112850434320501e-10,2.9484095707127396e-26,2.1279168214738756e-10,2.395195915756812e-23,1.5719864425640244e-10,1.0829512340595473e-12,3.1266817487932979e-20,2.8595559577426426e-24,2.418515475801981e-12,2.4920903453115539e-38,2.3526902942207863e-25,2.970884384853722e-22,1.6013949926908373e-38,5.068140376329272e-12,1.6613304446727016e-21,4.9808205614175843e-22,1.3960256612952508e-12,6.6685929396385097e-13,1.5514668551447617e-29,3.9534997691915918e-37,2.8033264382991482e-26,1.981684813192062e-24,3.2647666813291171e-21,1.3234976758682369e-26,9.8878829993752533e-09,3.6225704960015801e-09,1.0074989160648502e-13,4.9093013316160276e-32,9.8760359939483522e-11,2.5235267520363369e-17,2.0236002494910295e-36,3.9581656920449123e-19,2.3068043581528422e-23,2.2152842384005822e-20,1.0419335936190226e-32,2.1258293948767247e-39,1.8230291512273193e-35,8.6556662377234459e-28,1.8080405044717021e-22,9.8588149805129876e-43,7.2170665133854493e-24,5.7839888120424715e-44,2.4462171773848072e-26,3.2518439047852069e-36,2.5999260633853689e-33,6.8023141148484423e-33,7.5919210096128568e-40,7.6442985890245087e-10,4.2920862224295612e-22,2.6458540856625083e-10,6.9934853902212305e-14,2.1983514889527688e-32,9.389526725251059e-11,3.3819622408658122e-09,1.7520426660729379e-26,4.7891489434945438e-12,3.0853991466374575e-17,1.7166052563304051e-38,9.044495481447051e-28,4.2259879653499173e-24,7.9670575198909458e-34,2.3225170839128682e-17,2.0044407807212278e-23,1.1390315138159248e-23,3.2197946567231827e-31,2.0244228704627718e-11,2.0832183851566479e-25,2.0319469754371523e-36,8.9282632005468171e-23,4.0151716151923855e-14,1.6973765108488337e-28,2.2531847731273568e-33,2.0698004718332756e-43,6.9719979561641587e-17,4.4279726725036147e-24,2.9234090070442368e-08,5.3515529877476984e-13,5.1724322280588992e-42,7.225153171840502e-18,6.7055909827342842e-15,4.3658684876609017e-32,1.1138908397481326e-09,3.2295416692244886e-40,2.647901781268431e-25,3.075226591181655e-34,2.813000246335313e-24,1.1443071681999557e-15,7.4561128603446496e-30,1.3181736244847396e-25,1.7057415253643338e-24,1.7045593284029628e-32,1.3956238140411939e-22,2.4532037316542525e-25,6.7865748171390884e-17,3.3151664941588368e-24,6.4559786076406224e-22,1.8404074221729059e-27,9.6656836688918306e-47,4.6160772202896113e-34,7.8884855413604221e-09,9.1176599281115497e-34,2.1875814578088481e-09,4.9604994787794401e-21,7.2510472599761439e-31,5.6533170744721367e-12,6.7879719704920387e-23,2.8754166657794692e-38,9.1278941963911796e-25,1.1183961583286044e-22,6.2365865523579487e-16,2.5822752509039208e-39,2.1346127779286144e-40,4.0814315690018738e-16,3.740971524407368e-24,5.4068427219949574e-13,5.08452445980356e-12,1.126837144361394e-40,3.5423285089058302e-31,3.7775150058087195e-44,3.328721711966081e-31,1.6685660944059493e-40,7.5250664578492928e-28,4.6384692829973135e-41,1.9832855378359474e-24,6.6933409118257465e-10,6.1193559696594844e-19,5.0680722192882446e-28,7.9877058801609495e-28,1.5207404240862986e-40,1.6938647364015075e-24,2.7965557379072478e-30,1.0056052222746444e-27,2.4017081045011723e-31,1.9531812632307304e-23,4.1527846239456898e-11,4.1324024548668991e-28,4.3791076632490116e-46,1.324305864817798e-32,1.1452268471626689e-37,7.0767437019194206e-13,1.2867518156213549e-31,2.7443364631371697e-30,5.8494237866020542e-27,4.3017615458445603e-26,1.8705599700922724e-22,6.1856008422831723e-43,1.3004926540313274e-37,3.1221871869809639e-08,6.211602279468949e-09,2.9252794767162898e-14,1.8420493825062484e-22,8.0787089521513878e-18,1.8004061440699163e-44,1.030755500386174e-38,5.8710277425915718e-26,1.8439137943511356e-40,6.2496229017358062e-28,4.8945996000710402e-38,5.8386521571556381e-30,2.1733374006296269e-40,2.9493336653250506e-22,2.2600724556046611e-28,1.4029977051192941e-44,6.0645270755483094e-43,7.883427221469373e-42,7.9086127876524781e-11,3.3655874707439585e-30,1.3582639789909399e-45,9.3908557747005474e-50,1.3751620482191304e-19,1.9578014784972906e-27,1.1662670591321276e-08,1.6103634671237856e-27,1.7397134925407279e-11,9.3740145258931938e-17,2.2436519706497034e-16,1.7669935824007405e-15,1.2287016182598833e-17,2.369063607632813e-38,3.9088306670525424e-44,1.7912589236780207e-36,4.5389076106258135e-29,6.9476714784881142e-30,1.197507479262358e-28,1.2427412795039713e-38,7.537242286871837e-47,1.2904089042482421e-30,1.4892867307147626e-17,3.8596377224501705e-26,2.1027869814988508e-47,1.1917658885106624e-17,1.7471917658466358e-46,6.2964597536807425e-31,4.7624563349805024e-48,1.5642393266538743e-14,1.6325170434153366e-36,2.5421937540603637e-10,6.3152126146763356e-18,5.4283941936563107e-37,1.0820459727495616e-47,1.3417361247997266e-31,8.7636650623957636e-33,5.5784741160431969e-17,1.9032802211910403e-28,9.2788176122984072e-20,1.2744716039640295e-42,2.0428497662362584e-32,2.6253809928463942e-17,4.5038717659921568e-32,4.4509607875808355e-34,1.511922782942536e-14,7.1941422374586783e-42,2.8744080067557672e-14,4.5819172688293561e-37,1.2879104171769054e-08,2.5913070975482566e-36,1.4813607142871716e-23,7.3899006407824413e-39,1.4221211323090726e-30,1.2808234506037681e-40,4.5313531073707234e-16,8.2753804259553111e-46,2.5247083940191596e-38,1.8945444165397433e-40,4.2132397400061483e-09,1.6441802864052058e-16,4.7875939865754945e-14,3.2644927346588566e-29,4.5481126339056803e-45,8.4604255005128294e-33,2.0275902053696689e-40,1.2602576852362946e-36,4.8553465787424173e-10,3.0357544139732124e-15,2.5704105424252322e-30,4.3218702976771994e-48,8.9590031529805137e-39,2.1605011240647678e-34,1.3391550583533831e-19,2.2738291879806332e-19,8.1089875609106175e-46,9.4664936912255434e-49,8.2338627604388718e-42,1.2491596218544644e-19,2.5883782247478761e-36,9.5239194179115098e-09,1.0752617737339174e-08,2.5376258110355748e-49,9.0165053256972773e-21,4.0480515934027383e-23,4.1651149283299603e-42,3.4644453496933664e-34,5.1789455997523913e-39,4.2746754495022402e-34,9.3508003658526274e-25,2.7528473636396955e-49,4.4255998680942313e-29,2.695657794089766e-30,8.8471593656789723e-20,5.7608068207139356e-36,2.9815207803557161e-32,7.1798018006931738e-19,1.1423684822426621e-50,2.5323349895688596e-25,6.1209792232576003e-44,1.8979505711399134e-13,3.9971742473859329e-22,2.5622993878223023e-33,1.8280661001086459e-39,7.147272927403757e-17,5.8850543200017397e-23,1.011592764209735e-47,9.8072773023970385e-40,1.1875748568159056e-42,7.5798190160114374e-13,1.6259815203539902e-34,1.7604344371688352e-20,3.7436058668734875e-24,3.8355649251493468e-30,6.4468639433056303e-22,6.3558036069299731e-13,9.4099463004550771e-18,4.1047366524986193e-32,7.8759818008627739e-09,9.3393598352537071e-43,6.9079718168280132e-20,6.2406870824963762e-41,9.4884021520752707e-45,1.1590179407274029e-15,8.4242846939371017e-25,1.940577623502947e-29,1.1990690071151161e-27,3.0430915118145664e-24,8.2215790211977089e-30,1.8412969519455268e-25,1.2163617540263934e-49,1.1867378217688395e-35,3.9499491028796816e-44,2.0105196893939858e-15,7.7346387507056493e-16,2.6503202758300397e-49,4.2704755401731269e-18,1.6723376942359339e-35,6.7356963729575706e-32,7.9262467024086815e-17,8.0617943032286137e-13,2.6461747980634312e-30,8.1841365077839002e-40,1.9211237361862351e-39,1.7784747152336086e-21,1.001502034407272e-44,1.4650708250348867e-34,9.9724337608808856e-30,8.9149247031594972e-37,1.4513972113858894e-30,1.4031879807427529e-17,1.9724624157408778e-21,3.2135563928402364e-23,1.1771063146422542e-33,3.4982419190710633e-31,3.2050897266323878e-20,1.1427972695319969e-16,1.498389950269872e-24,7.9634522185750404e-17,7.4573482319396421e-46,1.1726710694001838e-21,1.3804381071758889e-45,6.5017362587298799e-39,3.9085460916100992e-37,2.1648112317033498e-18,3.0669893952054467e-45,5.5593221235091387e-49,4.6078128892841385e-17,4.7074666730944548e-46,1.1044355573647469e-33,4.2381176497467207e-12,5.3739139726463098e-34,3.3201858590925387e-09,1.0584917613224461e-44,2.4728403212932545e-41,2.1304881953590819e-37,1.0224598434189538e-32,1.5018566591050434e-27,3.3802140656592903e-30,1.8406576992574566e-35,1.6201681662866419e-22,7.543358293772551e-47,2.3373714149412613e-17,1.1743021963042853e-29,1.4389407744523768e-16,4.395945269608447e-13,8.4909059783450443e-48,9.7076943540493247e-35,5.4071629031126225e-24,1.0455324320233055e-11,1.0705589131677985e-45,7.9668471087896561e-34,1.2883773460306748e-42,2.7071734819451623e-14,1.0585575197791455e-39,2.8631736525306432e-27,3.4076310541000895e-27,6.8500361662606808e-45,4.196487756055869e-44,3.3770750694470275e-21,7.4118233946537822e-19,9.5477839507073866e-48,2.1845329380623963e-43,6.9354632904268023e-43,3.7333391037444686e-37,2.0677411643526367e-26,3.0872676370321757e-17,1.397434039085446e-20,1.1364558643716748e-39,3.8317701347482768e-21,5.4234605938888324e-19,1.452813686248271e-39,8.2884430652052557e-12,1.1711401922204389e-11,1.4759854143478491e-43,2.0273800301504474e-39,1.5530896621640042e-30,1.4240172905036238e-34,7.52108074161353e-23,1.6384209658783892e-41,7.5156013959604149e-33,4.0645916883601985e-53,4.0121508253015635e-47,9.1964737731011212e-27,1.4378286243507529e-29,2.6358775857203885e-20,1.2000280494998574e-38,3.2531832245257638e-50,3.1147558048192849e-32,1.8452496578433576e-45,3.8252234483035271e-25,6.511021776322637e-30,1.6992079610158247e-38,2.9345846883406417e-13,2.1854778922163286e-13,2.6499716156964429e-32,2.1698617489814105e-43,2.3799064026754301e-18,7.4874752573144074e-41,2.4932657875715695e-33,2.3905629853346608e-20,1.0278487051317205e-26,1.6146737543819055e-35,3.4768275867777061e-21,2.3954777601459087e-46,5.3481398819590069e-44,5.8172946908439262e-46,5.3676015689145957e-34,5.6761479887166188e-18,6.3789727068893271e-38,2.8719847921278329e-49,1.2096242883600608e-19,4.5616050807361514e-39,3.8153333444503204e-36,1.8631510603916099e-12,7.2615865575571253e-12,7.6985574888792054e-23,2.042214490495429e-45,3.8605879428089903e-20,2.1446435530588972e-35,2.7786420778802388e-50,1.4828456015209046e-34,2.0316860692297177e-23,5.8804288498738549e-14,4.9411324523094449e-51,1.0438412832544656e-51,5.1926617354597986e-15,1.0679231955814635e-32,2.7194258944150632e-10,2.6355382287247705e-30,5.6202754668706147e-26,8.0168493804985632e-25,9.771621817349213e-33,1.0571859299688355e-12,2.2973563269717872e-38,3.1886354173099039e-49,9.1551975531538608e-26,1.5843305158026252e-16,9.9381172996425335e-14,8.2719719955592375e-26,1.1445574586100054e-26,4.1091384876291094e-40,1.1057271339305979e-12,9.7994492180168204e-56,9.4904106589148552e-43,3.5231192657094686e-35,2.841087481047396e-17,9.6573372083050079e-41,5.9699103485037551e-43,2.1108363877675056e-19,1.0180292743235792e-47,3.0892339549821164e-29,1.5356078961439248e-37,1.0165470317594811e-42,1.4672328368165592e-50,1.0472291104442929e-12,3.8445164213545561e-48,1.4425560259386815e-43,1.30681284689986e-50,2.985062731226649e-29,4.1175650569328994e-43,3.4787727635296808e-47,3.8795347040415035e-50]}
},{}],64:[function(require,module,exports){
module.exports={"x":[1,1.0490490490490489,1.0980980980980981,1.1471471471471471,1.1961961961961962,1.2452452452452452,1.2942942942942943,1.3433433433433433,1.3923923923923924,1.4414414414414414,1.4904904904904905,1.5395395395395395,1.5885885885885886,1.6376376376376376,1.6866866866866865,1.7357357357357357,1.7847847847847849,1.8338338338338338,1.8828828828828827,1.9319319319319319,1.9809809809809811,2.03003003003003,2.079079079079079,2.1281281281281279,2.1771771771771773,2.2262262262262262,2.2752752752752752,2.3243243243243246,2.3733733733733731,2.4224224224224224,2.4714714714714714,2.5205205205205203,2.5695695695695697,2.6186186186186182,2.6676676676676676,2.7167167167167166,2.7657657657657655,2.8148148148148149,2.8638638638638638,2.9129129129129128,2.9619619619619622,3.0110110110110111,3.06006006006006,3.109109109109109,3.1581581581581579,3.2072072072072073,3.2562562562562563,3.3053053053053052,3.3543543543543541,3.4034034034034031,3.4524524524524525,3.5015015015015014,3.5505505505505504,3.5995995995995993,3.6486486486486487,3.6976976976976976,3.7467467467467466,3.7957957957957955,3.8448448448448449,3.8938938938938938,3.9429429429429428,3.9919919919919917,4.0410410410410407,4.0900900900900901,4.1391391391391394,4.1881881881881879,4.2372372372372364,4.2862862862862858,4.3353353353353352,4.3843843843843846,4.4334334334334331,4.4824824824824825,4.531531531531531,4.5805805805805804,4.6296296296296298,4.6786786786786791,4.7277277277277276,4.7767767767767761,4.8258258258258255,4.8748748748748749,4.9239239239239243,4.9729729729729728,5.0220220220220222,5.0710710710710707,5.1201201201201201,5.1691691691691686,5.218218218218218,5.2672672672672673,5.3163163163163158,5.3653653653653652,5.4144144144144146,5.4634634634634631,5.5125125125125125,5.561561561561561,5.6106106106106104,5.6596596596596598,5.7087087087087083,5.7577577577577577,5.8068068068068062,5.8558558558558556,5.9049049049049049,5.9539539539539534,6.0030030030030028,6.0520520520520522,6.1011011011011007,6.1501501501501501,6.1991991991991986,6.248248248248248,6.2972972972972974,6.3463463463463459,6.3953953953953953,6.4444444444444446,6.4934934934934931,6.5425425425425425,6.591591591591591,6.6406406406406404,6.6896896896896898,6.7387387387387383,6.7877877877877877,6.8368368368368362,6.8858858858858856,6.934934934934935,6.9839839839839835,7.0330330330330328,7.0820820820820822,7.1311311311311307,7.1801801801801801,7.2292292292292286,7.278278278278278,7.3273273273273274,7.3763763763763759,7.4254254254254253,7.4744744744744738,7.5235235235235232,7.5725725725725725,7.621621621621621,7.6706706706706704,7.7197197197197198,7.7687687687687683,7.8178178178178177,7.8668668668668662,7.9159159159159156,7.964964964964965,8.0140140140140126,8.063063063063062,8.1121121121121114,8.1611611611611607,8.2102102102102101,8.2592592592592595,8.3083083083083089,8.3573573573573583,8.4064064064064059,8.4554554554554553,8.5045045045045029,8.5535535535535523,8.6026026026026017,8.6516516516516511,8.7007007007007005,8.7497497497497498,8.7987987987987992,8.8478478478478486,8.8968968968968962,8.9459459459459456,8.994994994994995,9.0440440440440444,9.093093093093092,9.1421421421421414,9.1911911911911908,9.2402402402402402,9.2892892892892895,9.3383383383383372,9.3873873873873865,9.4364364364364359,9.4854854854854853,9.5345345345345347,9.5835835835835841,9.6326326326326317,9.6816816816816811,9.7307307307307305,9.7797797797797799,9.8288288288288292,9.8778778778778769,9.9269269269269262,9.9759759759759756,10.025025025025025,10.074074074074074,10.123123123123122,10.172172172172171,10.221221221221221,10.27027027027027,10.31931931931932,10.368368368368367,10.417417417417417,10.466466466466466,10.515515515515515,10.564564564564565,10.613613613613612,10.662662662662662,10.711711711711711,10.76076076076076,10.80980980980981,10.858858858858859,10.907907907907907,10.956956956956956,11.006006006006006,11.055055055055055,11.104104104104104,11.153153153153152,11.202202202202201,11.251251251251251,11.3003003003003,11.34934934934935,11.398398398398397,11.447447447447447,11.496496496496496,11.545545545545545,11.594594594594595,11.643643643643642,11.692692692692692,11.741741741741741,11.790790790790791,11.83983983983984,11.888888888888889,11.937937937937937,11.986986986986986,12.036036036036036,12.085085085085085,12.134134134134134,12.183183183183182,12.232232232232231,12.281281281281281,12.33033033033033,12.37937937937938,12.428428428428427,12.477477477477477,12.526526526526526,12.575575575575575,12.624624624624625,12.673673673673672,12.722722722722722,12.771771771771771,12.820820820820821,12.86986986986987,12.918918918918918,12.967967967967967,13.017017017017016,13.066066066066066,13.115115115115115,13.164164164164164,13.213213213213212,13.262262262262261,13.311311311311311,13.36036036036036,13.40940940940941,13.458458458458457,13.507507507507507,13.556556556556556,13.605605605605605,13.654654654654655,13.703703703703702,13.752752752752752,13.801801801801801,13.850850850850851,13.8998998998999,13.948948948948948,13.997997997997997,14.047047047047046,14.096096096096096,14.145145145145145,14.194194194194194,14.243243243243242,14.292292292292291,14.341341341341341,14.39039039039039,14.43943943943944,14.488488488488487,14.537537537537537,14.586586586586586,14.635635635635635,14.684684684684685,14.733733733733732,14.782782782782782,14.831831831831831,14.880880880880881,14.92992992992993,14.978978978978978,15.028028028028027,15.077077077077076,15.126126126126126,15.175175175175175,15.224224224224223,15.273273273273272,15.322322322322321,15.371371371371371,15.42042042042042,15.46946946946947,15.518518518518517,15.567567567567567,15.616616616616616,15.665665665665665,15.714714714714715,15.763763763763762,15.812812812812812,15.861861861861861,15.910910910910911,15.95995995995996,16.009009009009006,16.058058058058059,16.107107107107105,16.156156156156158,16.205205205205203,16.254254254254253,16.303303303303302,16.352352352352352,16.401401401401401,16.45045045045045,16.4994994994995,16.548548548548546,16.597597597597598,16.646646646646644,16.695695695695697,16.744744744744743,16.793793793793792,16.842842842842842,16.891891891891891,16.940940940940941,16.98998998998999,17.039039039039039,17.088088088088089,17.137137137137138,17.186186186186184,17.235235235235233,17.284284284284283,17.333333333333332,17.382382382382382,17.431431431431431,17.48048048048048,17.52952952952953,17.578578578578579,17.627627627627628,17.676676676676674,17.725725725725724,17.774774774774773,17.823823823823822,17.872872872872872,17.921921921921921,17.970970970970971,18.02002002002002,18.069069069069069,18.118118118118119,18.167167167167168,18.216216216216214,18.265265265265263,18.314314314314313,18.363363363363362,18.412412412412412,18.461461461461461,18.51051051051051,18.55955955955956,18.608608608608609,18.657657657657658,18.706706706706704,18.755755755755754,18.804804804804803,18.853853853853852,18.902902902902902,18.951951951951951,19.001001001001001,19.05005005005005,19.099099099099099,19.148148148148149,19.197197197197195,19.246246246246244,19.295295295295293,19.344344344344343,19.393393393393392,19.442442442442442,19.491491491491491,19.54054054054054,19.58958958958959,19.638638638638639,19.687687687687689,19.736736736736734,19.785785785785784,19.834834834834833,19.883883883883883,19.932932932932932,19.981981981981981,20.031031031031031,20.08008008008008,20.129129129129129,20.178178178178179,20.227227227227225,20.276276276276274,20.325325325325323,20.374374374374373,20.423423423423422,20.472472472472472,20.521521521521521,20.57057057057057,20.61961961961962,20.668668668668669,20.717717717717719,20.766766766766764,20.815815815815814,20.864864864864863,20.913913913913913,20.962962962962962,21.012012012012011,21.061061061061061,21.11011011011011,21.159159159159159,21.208208208208209,21.257257257257255,21.306306306306304,21.355355355355353,21.404404404404403,21.453453453453452,21.502502502502502,21.551551551551551,21.6006006006006,21.64964964964965,21.698698698698699,21.747747747747749,21.796796796796794,21.845845845845844,21.894894894894893,21.943943943943943,21.992992992992992,22.042042042042041,22.091091091091091,22.14014014014014,22.189189189189189,22.238238238238239,22.287287287287285,22.336336336336334,22.385385385385383,22.434434434434433,22.483483483483482,22.532532532532532,22.581581581581581,22.63063063063063,22.67967967967968,22.728728728728729,22.777777777777779,22.826826826826824,22.875875875875874,22.924924924924923,22.973973973973973,23.023023023023022,23.072072072072071,23.121121121121121,23.17017017017017,23.219219219219219,23.268268268268269,23.317317317317315,23.366366366366364,23.415415415415413,23.464464464464463,23.513513513513512,23.562562562562562,23.611611611611611,23.66066066066066,23.70970970970971,23.758758758758759,23.807807807807805,23.856856856856854,23.905905905905904,23.954954954954953,24.004004004004003,24.053053053053052,24.102102102102101,24.151151151151151,24.2002002002002,24.24924924924925,24.298298298298299,24.347347347347345,24.396396396396394,24.445445445445444,24.494494494494493,24.543543543543542,24.592592592592592,24.641641641641641,24.69069069069069,24.73973973973974,24.788788788788789,24.837837837837835,24.886886886886884,24.935935935935934,24.984984984984983,25.034034034034033,25.083083083083082,25.132132132132131,25.181181181181181,25.23023023023023,25.27927927927928,25.328328328328329,25.377377377377375,25.426426426426424,25.475475475475474,25.524524524524523,25.573573573573572,25.622622622622622,25.671671671671671,25.72072072072072,25.76976976976977,25.818818818818819,25.867867867867865,25.916916916916914,25.965965965965964,26.015015015015013,26.064064064064063,26.113113113113112,26.162162162162161,26.211211211211211,26.26026026026026,26.30930930930931,26.358358358358359,26.407407407407405,26.456456456456454,26.505505505505504,26.554554554554553,26.603603603603602,26.652652652652652,26.701701701701701,26.75075075075075,26.7997997997998,26.848848848848849,26.897897897897895,26.946946946946944,26.995995995995994,27.045045045045043,27.094094094094093,27.143143143143142,27.192192192192191,27.241241241241241,27.29029029029029,27.33933933933934,27.388388388388389,27.437437437437435,27.486486486486484,27.535535535535534,27.584584584584583,27.633633633633632,27.682682682682682,27.731731731731731,27.780780780780781,27.82982982982983,27.878878878878879,27.927927927927925,27.976976976976974,28.026026026026024,28.075075075075073,28.124124124124123,28.173173173173172,28.222222222222221,28.271271271271271,28.32032032032032,28.36936936936937,28.418418418418419,28.467467467467465,28.516516516516514,28.565565565565564,28.614614614614613,28.663663663663662,28.712712712712712,28.761761761761761,28.810810810810811,28.85985985985986,28.908908908908909,28.957957957957955,29.007007007007005,29.056056056056054,29.105105105105103,29.154154154154153,29.203203203203202,29.252252252252251,29.301301301301301,29.35035035035035,29.3993993993994,29.448448448448445,29.497497497497495,29.546546546546544,29.595595595595594,29.644644644644643,29.693693693693692,29.742742742742742,29.791791791791791,29.840840840840841,29.88988988988989,29.938938938938939,29.987987987987985,30.037037037037035,30.086086086086084,30.135135135135133,30.184184184184183,30.233233233233232,30.282282282282281,30.331331331331331,30.38038038038038,30.42942942942943,30.478478478478475,30.527527527527525,30.576576576576574,30.625625625625624,30.674674674674673,30.723723723723722,30.772772772772772,30.821821821821821,30.870870870870871,30.91991991991992,30.968968968968969,31.018018018018015,31.067067067067065,31.116116116116114,31.165165165165163,31.214214214214213,31.263263263263262,31.312312312312311,31.361361361361361,31.41041041041041,31.45945945945946,31.508508508508505,31.557557557557555,31.606606606606604,31.655655655655654,31.704704704704703,31.753753753753752,31.802802802802802,31.851851851851851,31.900900900900901,31.94994994994995,31.998998998998999,32.048048048048045,32.097097097097091,32.146146146146144,32.195195195195197,32.244244244244243,32.293293293293289,32.342342342342342,32.391391391391394,32.44044044044044,32.489489489489486,32.538538538538532,32.587587587587585,32.636636636636638,32.685685685685684,32.734734734734729,32.783783783783782,32.832832832832835,32.881881881881881,32.930930930930927,32.97997997997998,33.029029029029026,33.078078078078079,33.127127127127125,33.176176176176178,33.225225225225223,33.274274274274276,33.323323323323322,33.372372372372368,33.421421421421421,33.470470470470467,33.51951951951952,33.568568568568566,33.617617617617618,33.666666666666664,33.715715715715717,33.764764764764763,33.813813813813809,33.862862862862862,33.911911911911908,33.960960960960961,34.010010010010006,34.059059059059059,34.108108108108105,34.157157157157158,34.206206206206204,34.255255255255257,34.304304304304303,34.353353353353349,34.402402402402402,34.451451451451447,34.5005005005005,34.549549549549546,34.598598598598599,34.647647647647645,34.696696696696698,34.745745745745744,34.794794794794797,34.843843843843842,34.892892892892888,34.941941941941941,34.990990990990987,35.04004004004004,35.089089089089086,35.138138138138139,35.187187187187185,35.236236236236238,35.285285285285283,35.334334334334336,35.383383383383382,35.432432432432428,35.481481481481481,35.530530530530527,35.57957957957958,35.628628628628626,35.677677677677679,35.726726726726724,35.775775775775777,35.824824824824823,35.873873873873869,35.922922922922922,35.971971971971968,36.021021021021021,36.070070070070066,36.119119119119119,36.168168168168165,36.217217217217218,36.266266266266264,36.315315315315317,36.364364364364363,36.413413413413409,36.462462462462462,36.511511511511507,36.56056056056056,36.609609609609606,36.658658658658659,36.707707707707705,36.756756756756758,36.805805805805804,36.854854854854857,36.903903903903903,36.952952952952948,37.002002002002001,37.051051051051047,37.1001001001001,37.149149149149146,37.198198198198199,37.247247247247245,37.296296296296298,37.345345345345343,37.394394394394389,37.443443443443442,37.492492492492488,37.541541541541541,37.590590590590587,37.63963963963964,37.688688688688686,37.737737737737739,37.786786786786784,37.835835835835837,37.884884884884883,37.933933933933929,37.982982982982982,38.032032032032028,38.081081081081081,38.130130130130127,38.179179179179179,38.228228228228225,38.277277277277278,38.326326326326324,38.375375375375377,38.424424424424423,38.473473473473469,38.522522522522522,38.571571571571567,38.62062062062062,38.669669669669666,38.718718718718719,38.767767767767765,38.816816816816818,38.865865865865864,38.914914914914917,38.963963963963963,39.013013013013008,39.062062062062061,39.111111111111107,39.16016016016016,39.209209209209206,39.258258258258259,39.307307307307305,39.356356356356358,39.405405405405403,39.454454454454449,39.503503503503502,39.552552552552548,39.601601601601601,39.650650650650647,39.6996996996997,39.748748748748746,39.797797797797799,39.846846846846844,39.895895895895897,39.944944944944943,39.993993993993989,40.043043043043042,40.092092092092088,40.141141141141141,40.190190190190187,40.23923923923924,40.288288288288285,40.337337337337338,40.386386386386384,40.435435435435437,40.484484484484483,40.533533533533529,40.582582582582582,40.631631631631627,40.68068068068068,40.729729729729726,40.778778778778779,40.827827827827825,40.876876876876878,40.925925925925924,40.974974974974977,41.024024024024023,41.073073073073068,41.122122122122121,41.171171171171167,41.22022022022022,41.269269269269266,41.318318318318319,41.367367367367365,41.416416416416418,41.465465465465464,41.514514514514509,41.563563563563562,41.612612612612608,41.661661661661661,41.710710710710707,41.75975975975976,41.808808808808806,41.857857857857859,41.906906906906904,41.955955955955957,42.005005005005003,42.054054054054049,42.103103103103102,42.152152152152148,42.201201201201201,42.250250250250247,42.2992992992993,42.348348348348345,42.397397397397398,42.446446446446444,42.495495495495497,42.544544544544543,42.593593593593589,42.642642642642642,42.691691691691688,42.74074074074074,42.789789789789786,42.838838838838839,42.887887887887885,42.936936936936938,42.985985985985984,43.03503503503503,43.084084084084083,43.133133133133128,43.182182182182181,43.231231231231227,43.28028028028028,43.329329329329326,43.378378378378379,43.427427427427425,43.476476476476478,43.525525525525524,43.574574574574569,43.623623623623622,43.672672672672668,43.721721721721721,43.770770770770767,43.81981981981982,43.868868868868866,43.917917917917919,43.966966966966964,44.016016016016017,44.065065065065063,44.114114114114109,44.163163163163162,44.212212212212208,44.261261261261261,44.310310310310307,44.35935935935936,44.408408408408405,44.457457457457458,44.506506506506504,44.555555555555557,44.604604604604603,44.653653653653649,44.702702702702702,44.751751751751748,44.800800800800801,44.849849849849846,44.898898898898899,44.947947947947945,44.996996996996998,45.046046046046044,45.09509509509509,45.144144144144143,45.193193193193189,45.242242242242241,45.291291291291287,45.34034034034034,45.389389389389386,45.438438438438439,45.487487487487485,45.536536536536538,45.585585585585584,45.634634634634629,45.683683683683682,45.732732732732728,45.781781781781781,45.830830830830827,45.87987987987988,45.928928928928926,45.977977977977979,46.027027027027025,46.076076076076077,46.125125125125123,46.174174174174169,46.223223223223222,46.272272272272268,46.321321321321321,46.370370370370367,46.41941941941942,46.468468468468465,46.517517517517518,46.566566566566564,46.61561561561561,46.664664664664663,46.713713713713709,46.762762762762762,46.811811811811808,46.860860860860861,46.909909909909906,46.958958958958959,47.008008008008005,47.057057057057058,47.106106106106104,47.15515515515515,47.204204204204203,47.253253253253249,47.302302302302301,47.351351351351347,47.4004004004004,47.449449449449446,47.498498498498499,47.547547547547545,47.596596596596598,47.645645645645644,47.694694694694689,47.743743743743742,47.792792792792788,47.841841841841841,47.890890890890887,47.93993993993994,47.988988988988986,48.038038038038039,48.087087087087085,48.136136136136138,48.185185185185183,48.234234234234229,48.283283283283282,48.332332332332328,48.381381381381381,48.430430430430427,48.47947947947948,48.528528528528525,48.577577577577578,48.626626626626624,48.67567567567567,48.724724724724723,48.773773773773769,48.822822822822822,48.871871871871868,48.920920920920921,48.969969969969966,49.019019019019019,49.068068068068065,49.117117117117118,49.166166166166164,49.21521521521521,49.264264264264263,49.313313313313309,49.362362362362362,49.411411411411407,49.46046046046046,49.509509509509506,49.558558558558559,49.607607607607605,49.656656656656658,49.705705705705704,49.75475475475475,49.803803803803802,49.852852852852848,49.901901901901901,49.950950950950947,50],"d1":[87.03065843321383,39.48339028749615,93.405435387976468,88.450601284857839,38.889076830819249,97.820743976626545,93.93630989594385,45.472382993903011,74.265147498808801,51.571693525183946,36.827828113455325,68.305441744159907,49.494875287637115,43.186738318763673,68.281706331763417,99.501691125333309,97.025478074792773,99.752292772755027,97.542197366710752,97.738645575009286,41.032915355172008,80.808727422263473,97.941494521219283,98.677678408566862,97.001686482690275,37.690322543494403,63.976295385509729,85.867409964557737,86.019633123651147,50.792061456013471,39.932044157758355,30.334843907039613,59.523290002252907,37.872516117058694,94.101486657746136,74.783434981945902,85.454512757714838,91.490145165007561,97.16446976410225,65.256387423723936,75.901848720386624,85.855003050528467,32.499817556235939,55.290580093860626,89.439051381777972,44.83470325358212,95.379527199547738,77.69516768399626,77.511461072135717,57.911696382798254,83.041808786801994,81.845307114999741,82.019272977486253,63.233107631094754,57.455891375429928,59.546137670986354,75.883452547714114,42.170562029350549,41.983068282715976,51.133918878622353,79.423225859645754,85.809594055172056,32.228299113921821,52.15853113681078,49.384608753025532,91.070017400197685,33.231997331604362,40.437978347763419,36.799224314745516,99.584794600959867,87.642047700937837,87.533228523097932,78.63800355931744,38.762793506029993,52.196963515598327,83.462500874884427,96.515543179120868,64.341232758015394,32.41122561506927,76.452386435121298,60.712105208076537,38.812764335889369,56.709092066157609,44.714635210111737,83.58617543708533,33.585149792488664,85.663993288762867,32.550887598190457,43.081082236021757,58.611181264277548,64.283507645595819,62.059240872040391,61.19103395845741,64.129824873525649,75.241910798940808,85.578247997909784,79.655538038350642,94.461235369089991,82.828067447990179,86.527171768248081,49.321755429264158,79.404197612311691,77.579187541268766,30.197290268260986,75.856860266067088,79.749271245673299,41.382821241859347,75.077266953885555,38.329837552737445,61.922297712881118,64.885483495891094,84.174199015833437,97.18207681318745,70.162826646119356,53.827000735327601,91.373019050806761,70.968742277473211,86.572284300345927,45.666836048476398,31.244172686710954,82.588694212026894,87.487219397444278,47.856657735537738,87.458854888100177,65.41699317516759,95.805182007607073,78.935370484832674,58.886656032409519,92.363227815367281,59.621558135841042,97.150399477686733,70.666967420838773,68.305087340995669,41.064030909910798,39.703710828907788,83.32118495600298,40.450580432079732,46.110924514941871,48.025577431544662,86.681418407242745,88.850207501091063,99.196512042544782,47.799752517603338,53.271379759535193,86.999937912914902,50.988219394348562,47.046747852582484,30.947738862596452,95.048453852068633,45.206648746971041,54.498863553162664,93.515530237928033,43.761667103972286,89.392745434306562,47.57586972322315,96.851230140309781,73.123127005528659,84.522839693818241,63.130219022277743,99.122173872310668,54.616165834013373,34.731676673982292,88.158004044089466,85.551830693148077,70.968486429192126,71.615249272435904,68.480652507860214,81.295910759363323,94.203556512948126,78.666301849298179,50.008731239940971,77.587385345250368,83.00401609390974,57.462432831525803,82.761036371812224,69.30902095278725,56.631209228653461,44.564763987436891,69.747514885384589,66.916002093348652,35.309800531249493,58.294596266932786,33.776508383452892,54.693368566222489,67.155828743707389,71.497671487741172,84.541706182062626,54.94416122790426,95.380747490562499,97.547646032180637,39.093434691894799,40.810689218342304,69.817656120285392,57.64357473468408,62.857344704680145,57.110713352449238,30.833144893404096,80.886830512899905,53.598585247527808,57.199886518064886,41.352761203888804,94.924498912878335,85.599917832296342,60.52822953555733,51.785052705090493,90.387473087757826,66.997319504152983,73.425200916826725,41.595411507878453,38.368302674498409,72.13873578235507,63.036976112052798,48.407989772967994,53.815378935541958,75.785536682233214,67.088939184322953,78.245014878921211,80.127049665898085,82.370611357036978,99.18655782006681,61.537911959458143,80.434542286675423,35.867496456485242,93.880424436647445,46.028387791011482,65.384895363822579,93.933615307323635,69.078812929801643,40.666461195796728,65.223301472142339,87.807188215665519,62.373194436077029,67.683970280922949,68.261437322944403,99.729430077131838,61.330908127129078,35.472287007141858,89.811569070443511,60.987478960305452,72.296203896403313,37.465694125276059,64.898093044757843,97.332865442149341,98.594792317599058,30.324395801872015,32.402211925946176,84.2437325255014,98.390142410062253,87.211225647479296,55.42305224807933,90.808629493694752,77.56637855200097,35.910509494133294,54.236337514594197,57.984785169828683,89.911259543150663,48.190928453113884,33.154168082401156,86.004793336614966,76.208364593330771,60.198967792093754,82.495868110563606,93.745331671088934,39.309722175821662,42.729291648138314,98.765239459462464,48.466204220894724,36.674862198997289,40.187728935852647,49.787130348850042,39.524798707570881,86.147802844643593,90.850454673636705,35.428992044180632,70.579321261029691,73.916903648059815,68.490214319899678,30.566573818214238,40.146835879422724,77.620094157755375,89.712178092449903,67.375317541882396,73.543859187047929,60.706678219139576,54.566666998434812,43.968585142865777,65.927468028385192,39.660092820413411,58.126562538091093,56.763305580243468,35.317668281495571,83.369489936158061,46.794130874332041,32.83297779969871,38.632325371727347,47.706918185576797,42.873545323964208,65.333969625644386,46.796676709782332,87.582346617709845,59.208694682456553,98.720618560910225,33.475809742230922,87.64187901513651,93.190127748530358,51.127911561634392,96.135103630367666,33.356099964585155,64.360486620571464,47.349332172889262,64.247684665024281,68.083927119150758,53.640358501579612,92.140829293057323,93.003769412171096,54.068767500575632,55.847274726256728,32.328799767419696,37.784192785620689,41.401048647239804,84.617644341196865,91.415474007371813,57.2817188850604,44.72113081952557,46.91838993690908,49.092712560668588,58.273849934339523,64.470939198508859,36.751817150507122,45.63939596991986,39.238130617886782,64.321104744449258,95.943540872540325,96.846036182250828,96.929417655337602,75.637807019520551,70.264601553790271,83.025254516396672,34.184568105265498,60.46719801845029,46.434593696612865,68.701684577390552,54.721100381575525,33.720679918769747,87.483582824934274,52.575752078555524,31.078240864444524,58.348696851171553,33.011665903031826,93.59035303350538,41.829301917459816,86.63960701553151,75.438083421904594,48.080712833907455,81.220567205455154,39.089256743900478,75.342217341531068,64.532879532780498,61.564659595023841,56.495030012447387,68.290622297208756,80.292896477039903,50.742456552106887,50.146348897833377,82.128496365621686,73.640490383841097,43.226850824430585,86.831178655847907,78.074280612636358,51.875558570027351,42.845780765637755,56.99973652837798,55.793921656440943,54.075082608032972,73.793299037497491,87.103834513109177,84.615920567885041,76.849959588143975,35.678803655318916,56.559318567160517,95.057017973158509,62.094783019274473,84.299887474626303,51.252977985423058,64.07541400520131,93.739549024030566,60.510100978426635,64.203240014612675,61.274862457066774,82.905292736832052,51.44446321297437,37.564334084745497,65.595606095157564,57.551289633847773,65.754009217489511,90.913073564879596,87.233939752914011,55.260249930433929,85.638198817614466,94.198254090733826,75.102269318886101,68.066385213751346,56.502657185774297,39.810068644583225,86.810632334090769,43.991100899875164,67.297791177406907,96.424756057094783,54.550897108856589,99.307696830946952,95.730109459254891,46.805316470563412,91.315996844787151,31.156440896447748,68.510944028384984,57.203062048647553,73.573256020899862,84.57825570134446,71.093129101209342,63.364665003027767,44.541960551869124,67.80966040212661,51.087243549991399,31.291559038218111,62.964633926749229,93.012823879253119,46.13417147193104,43.614676855504513,89.101615222170949,92.019868323113769,43.633500430732965,60.885642494540662,45.814524965826422,40.348030694294721,41.94956332212314,46.765172444283962,45.936500641983002,85.975722253788263,60.498908048029989,63.111054212786257,51.777160246856511,36.287620945367962,94.636575116310269,75.118537344969809,60.114517128095031,74.314456542488188,42.937142397277057,70.906756324693561,93.34166775457561,80.865806671790779,98.582386544439942,54.824669307563454,60.72089807363227,77.62846511323005,37.77834540233016,79.51250665821135,48.06452895514667,41.362996276002377,58.610389337409288,39.361546919681132,71.642725190613419,61.46892505697906,48.35482232272625,32.943788773845881,72.199015987571329,85.815487448126078,79.785104542970657,41.728905278723687,45.522270980291069,88.18500011228025,38.219235797878355,52.747447495348752,50.767310962546617,75.904592822771519,52.314480948261917,59.413296608254313,59.691672902554274,84.733640619087964,65.550079932436347,37.92347751557827,35.986105310730636,99.54743025591597,48.373756839428097,42.710108535829931,86.071023407857865,83.405199171975255,32.045419632922858,48.614445792045444,95.019790010992438,47.089678486809134,81.123160771094263,37.051694397814572,64.202628377825022,54.102954310365021,70.496754124760628,49.713913865853101,46.609850095119327,97.804826279170811,62.119418007787317,44.964091700967401,97.416197825223207,72.414974689017981,68.276400421746075,45.858592379372567,66.479508399497718,43.293385116849095,46.211607006844133,58.110003476031125,64.222841989248991,58.930344139225781,73.684206132311374,41.91065950319171,77.539487949106842,50.933627078775316,57.686065139714628,74.552799784578383,55.720565759111196,40.610191083978862,99.158739934209734,83.847022522240877,32.641720420215279,91.877802053932101,91.961760546546429,97.145512364804745,93.930077974218875,31.264638903085142,85.732871042564511,70.799246914684772,36.90985944820568,83.679785984568298,48.330983188934624,52.945843560155481,53.474979121237993,39.034631489776075,77.580956623423845,50.437254880089313,39.558719352353364,89.29767542053014,80.485925253015012,46.153507477138191,37.473330474458635,65.138206982519478,75.763014780823141,30.111853273119777,64.592175574507564,30.877716229297221,84.533620704896748,50.061060395091772,80.052595909219235,36.908932931255549,93.260439396835864,56.932864473201334,92.364575134124607,54.874408410396427,53.391413413919508,80.397965500596911,78.91220826189965,34.581154519692063,43.846688072662801,65.970143042504787,32.137866020202637,59.678483319003135,82.085198077838868,78.286088143941015,65.001570521853864,47.776017431169748,63.594549752306193,58.106369136366993,93.330556657165289,48.513358600903302,72.690665032714605,95.397541034035385,73.236647138837725,63.076766892336309,90.160961288493127,72.764133599121124,86.384259755723178,64.188131992705166,70.370506232138723,66.016369683202356,42.804572861641645,47.151347424369305,46.795241038780659,53.310366845689714,92.055835330393165,65.16536632552743,32.007190589793026,71.724055346567184,64.293097311165184,51.710919842589647,41.754900070372969,97.40982647286728,98.507645663339645,46.268024812452495,79.888612758368254,82.283294436056167,65.033013913780451,52.577307133469731,62.976186540909111,52.276249867863953,34.173320299014449,96.673042373731732,77.738033011555672,67.430473186541349,32.970179447438568,91.0263606836088,35.001182164996862,95.422185491770506,66.515488673467189,76.697985806968063,36.771101995836943,50.27825839119032,87.270399159751832,34.586712301243097,87.228296569082886,46.232203119434416,80.570771310012788,79.330660414416343,40.490581344347447,43.657518078107387,76.172367956023663,59.555287205148488,66.301645797211677,95.523854477796704,98.108219150453806,39.955204294528812,75.429404284805059,75.02267031930387,86.023140435572714,63.091249749995768,61.765839513391256,60.585303732659668,60.267405495978892,47.10237480700016,87.771965919528157,65.414359052665532,35.84288687678054,93.486086514312774,39.32197057409212,35.355278141796589,42.137202660087496,79.973274434451014,57.365646346006542,73.204344166442752,88.196581981610507,43.235893605742604,86.235507677774876,57.788726422004402,34.232982690446079,49.436484004836529,57.948043576907367,90.066951094195247,66.881307873409241,93.625560221262276,59.175962531007826,73.209535940550268,75.98019240424037,42.657309179194272,73.958135053981096,66.051660366356373,50.438885297626257,87.724219444207847,60.215582104865462,55.152710629627109,31.084098597057164,87.12819145526737,98.884460797999054,50.537177047226578,41.701789060607553,42.048246765043586,37.435144213959575,64.495271106716245,56.068681702017784,43.672733847051859,43.868287890218198,90.501524459104985,64.278134994674474,44.293801670428365,53.764539121184498,73.139059322420508,96.614132190588862,91.463538540992886,94.423242600169033,57.472836051601917,33.687389572151005,96.260407860390842,81.650067006703466,41.668878786731511,48.838359504006803,98.031418037135154,59.598492837976664,69.477542615495622,68.350962935946882,71.885823823977262,95.991588961333036,39.18552951188758,59.242087022867054,69.674417672213167,98.813672608230263,68.806618945673108,51.101846524979919,51.734297233633697,79.076913094613701,38.445425154641271,76.643719519488513,81.64535739691928,67.738852475304157,46.990655667614192,78.867386195342988,87.600140296854079,76.656954167410731,42.983317975886166,42.469271922018379,51.887385693844408,38.96100758574903,91.720779025927186,99.935627297963947,77.194906210061163,41.978474291972816,81.75082896836102,32.282057746779174,34.378026826307178,69.283985812216997,39.209309304133058,91.730655457358807,36.296703591942787,76.842271622736007,30.582011160440743,43.330328627489507,61.955728826578707,55.824158366303891,74.401232446543872,62.250815380830318,67.083409451879561,98.714656406082213,64.850859977304935,40.948346839286387,53.505852892994881,89.886596293654293,47.697634436190128,75.133517768699676,46.357280886732042,56.339054873678833,42.121412218548357,43.364658746868372,71.718672118149698,59.977709504310042,80.88252006098628,63.741544287186116,91.430116489063948,38.442812920548022,79.50118086533621,71.265523920301348,46.433592224493623,45.833137577865273,63.459702241234481,56.923338989727199,31.274823402054608,70.809046679642051,82.313183897640556,47.626428231596947,75.830650697462261,50.330846654251218,35.464685959741473,73.196361970622092,63.093837047927082,48.569663313683122,99.753254689276218,87.706338504794985,67.246826535556465,98.786437804810703,92.960520426277071,81.117415169719607,84.103064897935838,54.071390605531633,44.263178710825741,70.884852954186499,93.497603549621999,37.543830936774611,56.236879292409867,93.441570559516549,89.366222142707556,91.575760901905596,52.868947200477123,87.243239311501384,52.87156619830057,48.250959932338446,76.144743382465094,71.604937289375812,71.073548754211515,31.575881612952799,33.428824162110686,59.76815240457654,83.897596579045057,51.890322244726121,64.422651967033744,41.30393207538873,64.172881052363664,42.513632995542139,60.038859948981553,59.601998422294855,57.6309400703758,36.596053496468812,84.351766100153327,71.896656320896,98.23280704440549,62.964697685092688,82.395361149683595,78.716451746877283,74.415140256751329,78.992149652913213,35.052618100307882,74.697152781300247,74.335430772043765,32.352268509566784,67.024444278795272,34.816427207551897,50.731735583394766,52.371981618925929,52.772950832732022,67.160499563906342,74.17839468922466,75.81119941547513,99.615379569586366,58.53334398008883,66.123347871471196,87.398685314692557,80.711773945949972,80.285126401577145,47.190232370048761,97.805453285109252,53.263738080859184,67.193373509217054,82.402638075873256,52.760197860188782,77.807653977070004,37.394044154789299,77.688995935022831,72.76710610371083,35.518966051749885,84.516156851314008,62.125540112610906,59.641704387031496,78.870280142873526,36.357630100101233,34.751938201952726,48.653004595544189,34.839803702197969,40.755969972815365,66.892997245304286,49.670371448155493,48.343415902927518,60.805959803983569,63.836261364631355,66.899992083199322,39.156382496003062,62.01970582595095,36.610853793099523,91.2760118721053,38.426717719994485,66.263647340238094,97.888604400213808,96.053583421744406,82.939715168904513,74.639637067448348,48.772346491459757,97.038575557526201,80.743418831843883,46.849492592737079,59.10337574314326,77.328561136964709,63.230288117192686,50.234519988298416,33.880899844225496,77.026571601163596,72.962090005166829,78.659834826830775,64.3433429277502,34.759493451565504,93.313240692950785,47.83531084889546,95.464998909737915,45.682801825460047,94.279363374225795,76.748290830291808,51.267768975812942,89.107450903393328,85.307124361861497,54.112368917558342,45.835918546654284,84.636375962290913,61.426630360074341,77.27324458071962,65.707623898051679,30.470072207972407,46.144234777893871,72.151933824643493,79.831654587760568,57.073983184527606,98.911682676989585,94.119386926759034,75.864927358925343,30.080574019812047,49.086688798852265,62.371441000141203,62.831089419778436,59.704433290753514,30.210084361024201,62.264145715162158,61.249675303697586,83.911180805880576,97.966090508271009,52.573026784230024,51.326445003505796,84.931750618852675,45.057633111719042,62.995000809896737,47.330955036450177,32.503391185309738,86.45157186081633,42.311209333129227,64.045976898632944,80.523062222637236,58.525134082883596,63.144019786268473,45.094050583429635,40.690483960788697,67.817646085750312,53.878722377121449,80.611696620471776,72.517245125491172,49.858574115205556,43.422167713288218,68.000346808694303,81.689878811594099,82.914727928582579,46.999471937306225,53.238410046324134,94.219703949056566,86.123408123385161,48.834310881793499,89.995070227887481,83.585001514293253,31.042419008444995,43.206338109448552,91.945986566133797,50.124872212763876,71.516085849143565,36.377942739054561,36.03520603151992,70.334656604100019,94.741315960418433,77.835426602978259,93.960370032582432,68.261517819482833,98.652974250726402,59.801018559373915,93.001547649037093,75.110994547139853,96.480020866729319,75.333233640994877,95.416536815464497,77.531172847375274,30.582698958460242,74.505069574806839,84.445582167245448,96.162187953013927,31.817121426574886,44.62544476846233,71.151393470354378,79.649718867149204,75.484653937164694,46.536140413954854,52.976551840547472,38.35773732047528,37.775555339176208,72.511275946162641,38.699086029082537,61.509638295974582,98.174054122064263,62.110784554388374,67.326062934007496,76.336132499855012,76.361019718460739,83.919985943939537,79.5780342631042,54.51526103541255,34.811700582504272,76.340672071091831,44.416890477295965,59.131101088132709,60.340077360160649,88.935040812939405,30.783481039106846,88.30417757621035,34.848376787267625,47.950869651976973,54.014326692558825,72.942251414060593,51.856105625629425],"d2":[17.8852257526014,29.789535829797387,16.681440833257511,8.8028657464310527,26.228289759950712,25.854920991696417,8.6785917652305216,11.312716534826905,10.224148135632277,22.656280111288652,4.457221528282389,25.500831820070744,28.255054687615484,7.2970200704876333,19.721004246734083,28.98361319093965,14.904433531686664,21.653586936416104,19.540191853651777,29.497368165990338,16.796767135616392,23.03707114001736,19.772032934008166,6.6045508666429669,16.772692036814988,11.225095821311697,21.910352096194401,6.6927099039312452,16.152363816043362,25.129969886271283,29.817433967953548,28.62524823890999,7.3416223358362913,23.253731499426067,4.0681499000638723,25.997095468919724,4.181226474000141,14.214248383883387,2.8441498214378953,10.647831341717392,12.732819901313633,25.309538936242461,14.002814336912706,17.074954896932468,11.6086691764649,4.5051016085781157,23.141634660307318,7.1533281558658928,19.208995091728866,15.245938403531909,23.387431234354153,12.879989128094167,28.052753515774384,23.025833193212748,29.209484729450196,11.354862545616925,6.5688219869043678,23.381795617053285,5.0273516969755292,29.464671750552952,21.191723599331453,25.53868993720971,3.7207806704100221,25.204027139116079,16.236727693350986,11.648639961378649,16.379982504760846,2.4681523772887886,25.973054454661906,29.291286398423836,15.060746497707441,25.435089507838711,12.410234368406236,26.214351261267439,20.471503142267466,3.1894545392133296,22.49648042069748,1.938905977178365,16.081521617481485,18.804022375727072,11.083667490398511,22.334728282643482,5.3499204239342362,18.850306323030964,17.996669894317165,20.216272300109267,8.6022140828426927,28.586668364005163,2.2891686726361513,8.7107379259541631,22.89306465908885,27.662186063593253,8.0407754322513938,4.4334998810663819,13.829667049925774,10.078905468806624,20.946086320560426,26.291346590965986,11.417618098435923,7.775667189154774,22.353862175950781,24.433696339605376,12.446516750613227,17.13942123320885,20.819060052977875,28.364177002105862,21.417375580174848,15.60740041709505,13.826857019681484,20.326087925815955,1.567751239053905,5.4360062459018081,10.594878491479903,29.223634467227384,13.30497539951466,19.379240310750902,8.8378422544337809,6.1808437041472644,6.7145602232776582,3.1501413199584931,24.829914256930351,15.354268623748794,13.467720722546801,23.793417310575023,26.745357755338773,14.475712423445657,12.344306799117476,26.607918166788295,23.304317269939929,19.773698080098256,12.506953838746995,27.193988112732768,24.446908975252882,1.1732348210643977,22.897235721349716,21.113292437978089,11.944470829097554,17.967599688097835,7.2645485738757998,4.0554774787742645,23.921809228602797,29.719276998192072,28.529813414206728,7.6697687269188464,10.49939761753194,10.654327175114304,20.466666648164392,20.992102682590485,13.720704287290573,28.881201628828421,25.17151735140942,7.5713736987672746,23.296773255802691,27.803000764688477,5.8503527515567839,26.411139541771263,25.99743399838917,13.520591339096427,29.706292394082993,14.655734842410311,15.918280144222081,17.300971915945411,26.644149503204972,25.290846946882084,18.052755686687306,5.3009574909228832,5.4878181214444339,19.53906730003655,6.7960217895451933,29.872216924559325,12.801690152380615,19.542428996181116,22.712465767050162,13.746031412389129,24.941930658416823,1.8232621443457901,23.908927890937775,3.4113761396147311,10.237203211290762,16.380648368736729,16.487859612563625,23.678043892141432,3.6085696804802865,22.362711530877277,4.2394667228218168,6.5146680548787117,4.9524839234072715,8.5929906419478357,20.680916883284226,14.115098276408389,15.360133562237024,14.340779655845836,6.5016018315218389,20.535477149998769,15.355168893234804,6.1316390936262906,5.280638450756669,6.4470942250918597,2.5942503474652767,3.7981175612658262,25.670667551923543,10.392363602528349,17.25622627674602,5.9394683504942805,27.958657204871997,1.7172881059814245,21.203348683891818,25.088646549964324,17.900938058737665,8.1000231399666518,24.646519183181226,5.1190152100753039,26.491403226740658,5.5078170585911721,29.678436861606315,9.7873110100626945,1.0151488780975342,1.9735972094349563,26.097719091456383,12.869392069289461,18.764427540358156,23.710585711756721,29.70855591702275,13.85778543446213,16.302722189342603,1.507158116903156,14.906178129604086,9.2877465959172696,24.239080354571342,28.590504326857626,7.6074452402535826,5.9681357000954449,15.444734626915306,3.7303450985345989,27.124722256790847,8.9434406876098365,17.665175331523642,6.8395541391801089,25.510167338885367,22.840374296298251,22.420568456873298,24.225503200665116,17.993624108145013,17.996441423892975,8.1553011529613286,15.412841068580747,20.326070302864537,18.138224097667262,3.4210015728604048,17.494954163441435,19.152833858272061,6.3678421718068421,20.167392073431984,27.148042559856549,22.162803832674399,1.7094022470992059,26.831811512121931,8.6669177482835948,29.48679349035956,23.692942639114335,23.30184335866943,18.39136144798249,17.861948197009042,17.130247656488791,27.921078786253929,3.7994496403262019,17.822620589053258,27.876824158942327,1.4925051999744028,12.553348196204752,4.5049276747740805,2.1571852713823318,26.01861091167666,17.968386549502611,15.044598884414881,12.983233134960756,25.500814710278064,4.7564690136350691,7.0727474873419851,18.6592302757781,17.016448919661343,2.6067860592156649,19.26661801058799,25.600576975615695,1.9277395620010793,14.109853638801724,18.826689144130796,15.065416971454397,11.509932533139363,2.9559587717521936,2.4364449537824839,7.4091706292238086,15.197529573924839,19.686577061656862,6.5828012817073613,29.299122926546261,4.5694285547360778,28.530927961226553,6.9593308984767646,22.357702237321064,5.248932350659743,13.204754755133763,6.4830930533353239,20.886281200917438,2.2369198019150645,20.90026642405428,19.420739748282358,7.7067216995637864,9.1741387811489403,29.848467836854979,16.619303629966453,13.632199090672657,21.15972817898728,22.5699863655027,15.474364425987005,10.803465608041734,16.538230659905821,11.52455728710629,13.910311707993969,29.706614299910143,4.5940359882079065,22.027270061662421,15.220361336367205,25.287692897720262,25.736946418881416,12.543027311330661,26.343894768273458,25.699176511028782,8.8385358019731939,5.9764845361933112,7.0453794084023684,28.474433458177373,17.384407522855327,11.176002728287131,19.56904298835434,12.161480366019532,13.09383972059004,12.592170795192942,6.9732898897491395,21.832626386312768,28.490060512442142,25.241608353098854,3.3800648881588131,28.575353072024882,4.0655734110623598,2.8554623180534691,5.1191925806924701,20.271244551520795,5.8273529026191682,6.1130345370620489,19.007800695253536,11.757783977081999,17.637583225034177,5.8835972947999835,2.5102589693851769,4.2828780547715724,28.004840147681534,5.4246298340149224,22.131188696715981,12.46998676774092,22.397407928481698,12.497778709046543,2.83873061533086,1.8109704328235239,25.952776264632121,14.050935757113621,28.097748550120741,3.8577697393484414,29.547551059629768,27.564516520360485,25.909225610084832,14.523193502565846,23.781210668617859,22.724735054885969,15.887945089489222,22.15054908208549,6.1504712090827525,22.352901448262855,12.559095412027091,20.039900364121422,4.8840063130483031,7.2582946948241442,1.8957969159819186,2.4932867437601089,28.235109463334084,2.7022576828021556,9.7378758697304875,13.220797893358395,9.5704810381866992,24.501902050105855,10.65515225334093,10.187754688318819,14.544977286830544,26.638657853938639,19.797753739636391,12.864135541254655,1.7316172264982015,6.8454426829703152,25.423991781659424,1.7394901821389794,17.211943918606266,2.9267728279810399,25.768898511072621,20.615507077658549,11.088496638229117,3.3511890408117324,13.934772911481559,10.55293449643068,2.5729450499638915,11.717813509516418,6.1361185035202652,24.108866797294468,20.221433778991923,6.1180713116191328,10.5940409488976,3.6886029706802219,27.056098193628713,2.7288213921710849,4.4265008009970188,9.3202923857606947,29.664119881344959,21.763591093942523,16.65948092751205,15.312713535502553,21.500605120090768,27.248611260903999,29.985256956191733,12.73203873867169,9.3476309985853732,2.9539127808529884,13.021153546869755,11.875714836874977,14.480358252068982,25.608778467634693,23.154755271738395,11.576534710358828,24.727917306823656,5.135724212275818,3.9064247771166265,13.229287098627537,6.1653915019705892,26.199914174852893,11.42941247811541,29.914200588129461,2.6444360769819468,16.477082171710208,16.134684592718259,12.442424289416522,10.739620214095339,10.635724029736593,6.0944019053131342,2.2479216484352946,7.0594534147530794,25.838944597868249,27.249453286873177,6.2401000680401921,20.58634423953481,10.666168630355969,14.585577778285369,13.509566292399541,27.451841891510412,10.496360804885626,4.0163356410339475,8.3251183975953609,22.620836223708466,4.8153864901978523,22.351756226504222,3.6251297721173614,17.293981215218082,28.612151036970317,6.3416288755834103,9.1067881686612964,18.319129163166508,17.76660873205401,9.6981726565863937,11.237289533019066,4.8895650915801525,10.191908620530739,7.1654444886371493,23.525463311932981,26.953308703610674,11.735205958131701,3.0721316509880126,6.5531077226623893,8.0321103485766798,1.3197128432802856,2.5588773230556399,12.375959902070463,13.809939560247585,27.293526492314413,1.3852127487771213,29.631212037755176,27.018549072323367,21.558779853396118,6.7030875738710165,19.50063052889891,3.7077449192292988,19.010581077076495,9.9136399624403566,27.827748358016834,14.225672229193151,26.54168967041187,3.9484124851878732,1.5641173054464161,29.866301946341991,21.891750436276197,10.630692184204236,18.1412278926,9.6230576822999865,2.6388234100304544,2.7993113815318793,19.524569708155468,9.6490751544479281,9.5976749064866453,2.3441867032088339,14.472239392111078,15.657416075002402,28.490063645411283,23.081350790569559,17.006041250191629,19.301029902184382,15.598899078322574,3.6068580260034651,4.8667578189633787,3.3450102179776877,21.680635195923969,23.53997544106096,27.827903683064505,27.248907394008711,27.202915704110637,16.479386598803103,19.452478481223807,4.1654721428640187,10.917102024657652,24.948456768179312,20.245947702787817,10.804833898553625,20.12870139000006,9.5252185738645494,8.8427084847353399,22.643089332152158,19.626123376889154,1.2997618527151644,13.448359857778996,2.4049727933015674,24.264168057357892,20.369567629415542,10.633323311107233,18.500571451848373,21.604692077962682,16.25697152200155,19.974060524720699,22.161574027501047,7.9790028957650065,21.510351017350331,27.654400027589872,23.659934520255774,18.511281810700893,9.3513323788065463,12.114118967670947,21.083427551435307,23.623639383353293,17.14342530281283,15.35513748251833,12.499102921923622,26.666757649974898,2.7861292855814099,12.541640459327027,23.625090386951342,9.0601953403092921,10.789932200917974,8.033264962490648,18.628111465601251,1.043247492518276,22.496367525774986,12.454629871295765,4.0395841288845986,6.8579236217774451,4.7087629684247077,23.39016799768433,16.93666312051937,18.645245586056262,15.071652775164694,23.59265132737346,26.823794770753011,15.482373962877318,24.169848198303953,12.150824901647866,22.295891274698079,25.091196516761556,2.4886247033718973,4.7107586832717061,3.1136737819761038,8.2402860536240041,3.5672963771503419,15.591425420949236,24.152175072114915,4.7181313631590456,28.347235917113721,29.381912149256095,20.827751530567184,22.079210132360458,4.830405748449266,7.4785716417245567,21.959011509316042,20.794733533402905,4.2002509362064302,14.012532739667222,4.4072926887311041,20.489708839450032,19.580819677561522,27.371601042104885,10.535612208768725,25.324102023383602,19.960548818809912,7.1447927528060973,22.724812339292839,28.581035015406087,17.912386022508144,26.458856916986406,22.460937446216121,21.56303981365636,7.809980371966958,29.150688864756376,22.313768698833883,13.264372733887285,29.147357046604156,25.281015730230138,26.140978514915332,3.7062596555333585,3.500801342073828,20.529372465098277,11.626662034308538,3.852747610071674,11.706765296403319,21.227256452431902,20.865825856337324,7.2625881927087903,18.340307453880087,23.557070487178862,23.891554442699999,3.3413615918252617,11.661934553878382,12.753733773482963,6.9748079078271985,7.017222753027454,3.5133298898581415,3.4659474317450076,23.386083618737757,16.056293491506949,6.9645609853323549,29.376131949480623,12.259877433301881,5.8166161633562297,17.001577282324433,27.635759907774627,7.6396442495752126,9.8378050804603845,19.616278068628162,17.845791873522103,15.04993066447787,25.472453162772581,5.4035202187951654,12.254095268668607,23.676027218811214,1.1743927232455462,3.9175834679044783,1.2876747429836541,9.5279238251969218,6.7528118386399001,7.8838175944983959,12.408080276567489,16.395295445108786,6.6990971839986742,3.6534632174298167,25.22249119146727,12.754147163359448,23.612430855398998,4.0405413049738854,3.2388986328151077,4.256235028617084,9.4511766077484936,23.748408900341019,8.9889261058997363,9.4555391322355717,19.02947375876829,18.502469727303833,27.713964563561603,28.96825738158077,7.537132608005777,13.542064891895279,9.2590711370576173,21.14781376067549,3.4543789566960186,22.984879040857777,10.506115162512287,13.546627548290417,2.5108663197606802,20.009443022310734,18.715646407334134,4.1828965086024255,16.792609753087163,28.079035649541765,11.089209935627878,6.4363633196335286,16.282030771486461,8.7191863148473203,29.995977598475292,24.137077449122444,25.802231574198231,15.14050929248333,27.185940176714212,23.299789656884968,4.7353589122649282,12.484195640310645,18.858724097954109,8.9152248704340309,25.079903695732355,2.079804350156337,29.64709401037544,20.525552396662533,19.722938841674477,13.457369338488206,22.759636695729569,14.100437716115266,22.963785596890375,18.685857832897455,20.33268117159605,2.7226956272497773,16.660797564545646,10.158531662076712,22.177386487368494,23.408941721078008,23.612511941231787,21.196556730894372,15.170763977104798,4.6346332589164376,18.219001373508945,4.7743918860796839,29.048021520022303,3.6782178936991841,3.2729524206370115,1.2267886274494231,2.0199052954558283,13.270172116346657,11.794128910638392,20.011622231919318,3.2594888503663242,21.964753093896434,23.741434884024784,16.405069599859416,14.836477553937584,4.1557201754767448,13.778919668169692,19.32122491998598,9.1720006579998881,4.6684961516875774,15.987345280824229,4.8947958603966981,11.667957275174558,3.8592287104111165,4.4188531558029354,5.1187900819350034,18.360124867875129,5.8792876661755145,1.4808981840033084,6.6912187659181654,14.565538234077394,10.206913523841649,4.0887342973146588,10.176441016839817,10.823144381400198,7.3093359612394124,3.5198674916755408,8.2802135711535811,6.9495808149222285,26.894749702187255,16.015591732226312,21.393473415868357,14.826596952509135,17.116400378523394,2.0205163054633886,6.3485762751661241,25.741033107042313,7.1488943630829453,28.567801974946633,3.2430573725141585,25.735128405503929,27.5002118088305,29.428709241794422,21.49474113364704,26.006915207020938,17.175879952963442,24.817903648363426,10.089440516429022,27.640100710792467,5.8199033974669874,18.348720765672624,19.052420347230509,24.976459023542702,29.650107224471867,16.590577888302505,5.9425285118632019,27.481016667326912,8.4759752370882779,5.8656868529506028,12.507180283544585,1.5477698775939643,3.145848308224231,25.838503956561908,20.838785827625543,25.39992473134771,12.669261612929404,23.857422209111974,29.502220824593678,22.156037490349263,12.663335412740707,22.301876791985705,18.999486504122615,18.007438192842528,5.476724399253726,17.333667068742216,12.059010904747993,27.80274332780391,5.6728850866202265,18.5518781428691,22.985260520363227,3.9383424201514572,26.26222261111252,18.951422085054219,11.172525483649224,22.280783699126914,20.88053554482758,9.437961183488369,9.5303104049526155,10.240121038630605,16.388249897165224,17.642891757655889,25.140278178500012,19.596648545004427,18.327215660363436,2.607228510081768,10.724028581287712,29.417528714751825,9.6775255594402552,23.982980356551707,14.125183614669368,19.536227040691301,13.256723920581862,10.405464497860521,11.428583112312481,29.207692252472043,17.191256734309718,15.651813867036253,22.533815467031673,27.721858619479463,13.305708784377202,17.518742453772575,13.451317785773426,13.944051564205438,4.621309936279431,28.969498996157199,1.708586446242407,4.4857054641470313,9.4153724759817123,29.562791279982775,10.208096854388714,7.6691246721893549,19.957013938343152,18.312881955178455,28.751141749089584,17.540084482636303,28.136195172555745,23.174666938139126,14.278703795280308,12.953295717481524,7.973873637849465,2.6206592246890068,23.153040281729773,15.674049534834921,23.020494080381468,5.9891968690790236,22.478793905116618,16.34175323206,22.56696182815358,16.500994227826595,4.0716919985134155,20.797863585641608,20.765252395067364,14.700404675910249,14.434556788764894,10.593618295155466,7.1527328782249242,11.860933812567964,3.8570435454603285,4.9998506964184344,24.883659755112603,22.152302160626277,6.0752823736984283,10.549682656768709,5.743527281563729,20.154696303419769,20.313629410695285,2.8485637428238988,26.937291749985889,27.314184595365077,15.980188107350841,4.0350862722843885,21.378367055673152,3.8782908425200731,5.4541209992021322,12.383086697896942,28.650254882872105,20.304412269499153,16.685638336697593,15.372353674611077,20.712283150758594,14.409372065216303,2.060327484505251,7.1273041274398565,24.466911747585982,12.875581688713282,22.709947406779975,4.1240106385666877,4.4854235306847841,15.190311969257891,16.226309922756627,4.242867365013808,10.449175203917548,11.39936390100047,16.847033883444965,9.4292094164993614,12.567541836062446,10.506303370231763,13.03770816931501,8.5118333653081208,6.241395030869171,16.81100919470191,8.4062155873980373,3.0193218369968235,1.595537670655176,1.5029038486536592,27.786592898890376,4.9126565190963447,19.957296648295596,26.999656680971384,28.045793435769156,22.527354920050129,5.7418587459251285,18.506232916144654,27.711820383789018,28.633675682824105,24.045078681316227,27.510722602950409,17.744431679137051,8.0281927327159792,13.761032244190574,27.15996289299801,8.4707983769476414,13.850873868213966,22.806445395108312,17.31778616970405,7.6314150942489505,11.182974867522717,2.8614256344735622,2.0636645152699202,23.252555744722486,17.349716736236587,20.46486338134855,11.068483251612633,21.741162829566747,23.379934235010296,19.619763949187472,19.27549402276054,13.152400457300246,26.885652241762727,12.332100305706263,25.997812817571685,24.668063004966825,10.790750317741185,10.205408003879711,20.249675443163142,24.621653266251087,20.846480521373451,23.883131988579407,12.602350291330367,25.715652957791463,1.5333710755221546,15.66346196946688,1.1184939907398075,19.434180354699492,12.318657126743346,28.575937904184684,29.998305745655671,13.874960621120408,6.801871434552595,2.7405458404682577,19.213239137316123,26.135746821062639,27.664994770428166],"expected":[1.0761446480444663,1.0892357026777306,0.92804175821543844,0.65829834750620375,0.81780462659226327,0.80398844856279106,0.53276782668767197,0.51686442278164857,0.47633230783972724,0.4671211498182879,0.31510959358914248,0.35022356963970003,0.29893846406679686,0.30001019005471058,0.25195133900884026,0.16493705995512811,0.21931664740459206,0.15381241960952191,0.14596909067546182,0.079073047172247987,0.13916452447711133,0.082624233689605475,0.084315214318438803,0.15751451283088896,0.08021267809697985,0.11195278584799404,0.045972105948269539,0.12290891880509459,0.054221370952559002,0.025730911679913798,0.018226518249700355,0.020888043809741162,0.087432257787744813,0.020188693380647632,0.098814055120719169,0.0080924202894640061,0.090455920560318981,0.026797436030726429,0.088094748933410419,0.038092049837991263,0.025943895335331788,0.0034503138937933284,0.021926511832508731,0.011118524126133953,0.022163345479128974,0.061584146381346606,0.0023876358997837778,0.038781969073104716,0.0041611740142049299,0.0084809249531638195,0.0014763605112993548,0.010484699902483852,0.00046987755858359773,0.001293205443364075,0.00039773519354758364,0.011327417222122275,0.02816801982181566,0.0010518534174131548,0.035352000086562217,0.0002206398569320421,0.0007694698054553044,0.00023833704910894351,0.038964792398325773,0.00030753674599320419,0.0021150304038667846,0.0052473034785568166,0.0021577823812960655,0.041018075907134827,0.00022476989815818212,3.0245174066104798e-05,0.0014841668371651732,7.4850086082860719e-05,0.0028280191598721973,0.00011639222310890332,0.00030929848468959738,0.03058120386763399,9.6660832789235372e-05,0.035539195740769448,0.00098387621576658435,0.00025705311654050428,0.0028007400544632437,0.00013420851907352044,0.014783765682068106,0.00025683882855312212,0.00021506179405489796,0.00019498520748476088,0.0045014906747629594,2.1058881261775306e-05,0.027792092744853867,0.0039880420481771496,3.0998193134887962e-05,6.3768807281267638e-06,0.0044373854240879387,0.014360727982768912,0.00049042458205059733,0.0018160061013253312,3.1117029381904658e-05,3.5532007378226894e-06,0.00096002523963536449,0.003682637774313284,2.0695440909855143e-05,5.6944668598318376e-06,0.00053764815757099634,0.00015185992493254506,1.8177908205310605e-05,9.0132916267032172e-07,2.1798033513562087e-05,0.00011758417023617791,0.00030324433023881214,1.7760443717197163e-05,0.022442084770388279,0.0064016291242403904,0.00070649955119555521,3.566509224344114e-07,0.0002369924430904331,1.3460144681855033e-05,0.0013529544227159033,0.0040427586192808354,0.0032784930142493052,0.013003768883612576,9.5734712048162628e-07,5.7353932784342583e-05,0.00015969813270459661,1.1327886589230613e-06,4.018298738387008e-07,6.8308469308461407e-05,0.00018671281326819808,3.8599911334429645e-07,9.3452023495371752e-07,6.1742502959330789e-06,0.00013916966773124421,1.6935834228404363e-07,5.5337844010582025e-07,0.017955395795222248,1.8800170226685027e-06,1.7649081969700551e-06,0.00018664070212028576,1.0803775241434763e-05,0.0014982484346415497,0.0063983368815725555,3.0812481930245862e-07,1.4910561909295963e-08,7.529386993319126e-08,0.0010674306810968693,0.00022995212096237945,0.00023081275805915104,2.0664084210291529e-06,2.6774172900033003e-06,3.5687057594541196e-05,4.2483180342978961e-08,1.5020216241486315e-07,0.0008652007889519063,4.3327689105733357e-07,1.7189688619638221e-08,0.0020765933403477628,2.8062365475728799e-08,4.4785171592979105e-08,2.872748777388202e-05,7.6714991530163645e-09,1.3445866657346447e-05,8.4954855920678521e-06,5.8587158361870433e-06,1.6928641329450507e-08,3.3899207436114528e-08,1.9110924575502973e-06,0.0021923751589750184,0.0019501718379087798,6.6237081211346716e-07,0.00089290842157678128,2.1471928776165133e-09,3.2180761917866378e-05,5.5889966018297213e-07,8.3927203587223977e-08,1.6081445742184557e-05,2.1347656359428055e-08,0.010450512383403226,5.3121449142696098e-08,0.0049938868733688489,9.797978659280179e-05,2.6146843512875671e-06,3.8371705525173442e-06,4.3648625415344074e-08,0.0042532820824659184,8.7520578511949173e-08,0.0028997039580368087,0.00076024406311640228,0.0018634955721695263,0.0002166950819872361,1.0728274103414347e-07,5.9894926971168178e-06,4.4109433000240993e-06,7.3505618668184752e-06,0.00067327517991843332,1.414685440310234e-07,2.792829340895221e-06,0.0008109843506002892,0.0013903409184382299,0.00062954723749961627,0.0059660069716544733,0.0030615223725722427,9.099633278512762e-09,4.5474174340032271e-05,5.3198185663473027e-07,0.00079389073621974695,1.3191855221456992e-09,0.0084240213125972244,4.4549106788652589e-08,3.4601943651264124e-09,4.9051393004658621e-07,0.00019514873576005406,3.9768007866951324e-09,0.001171441148579684,2.2117470299218448e-09,0.0008969821015938522,1.3016560784478822e-10,5.1380287585233696e-05,0.0096219426571483024,0.0068404591599079412,8.828383062057081e-10,5.2591521960996943e-06,1.2468686458821522e-07,3.6858130365475078e-09,4.3627237819952124e-10,2.4029981780680829e-06,6.6663613637797311e-07,0.0078898541236766557,1.0580904737723305e-06,5.4981375337331725e-05,5.1166702299836713e-09,1.4148068205398791e-10,0.00016101054472696824,0.00050249397520722413,6.9966704549032772e-07,0.0021524199304757221,1.5232477735456927e-10,6.0525679351131713e-05,2.4278395945844861e-07,0.00024454511744991236,7.2088204743719059e-10,3.2551408183728802e-09,1.0375912598837682e-08,1.336529631169277e-09,6.8492075632427763e-08,6.55506652206217e-08,0.00010301581005787843,8.2890918676522723e-07,1.2207574932192105e-08,5.1514691814634042e-08,0.0022527843357913204,1.1243129599029771e-07,2.3208763337808102e-08,0.00027936412179064109,2.8151453287412186e-08,1.4773945601679003e-10,3.593487032484549e-09,0.0059115786976868491,1.9926125452394854e-10,5.6184955739842156e-05,1.0387096130340657e-11,7.1986642845300903e-10,1.2230245030957333e-09,2.9540768068220757e-08,3.9260279383164044e-08,1.2751420001492268e-07,8.917002329736906e-11,0.0014772550607638863,5.8217316505899989e-08,1.1745980019416063e-10,0.0060264450031366325,2.3274054182432673e-06,0.00087366916184253979,0.0041580387605175519,6.1194654426395523e-11,5.9770843483508534e-08,2.6934730600635119e-07,1.2428780607066504e-06,1.0986360118022349e-10,0.00068868844551288138,0.00012129637403465621,1.4000901837802405e-08,4.4049722467854345e-08,0.0029215551928942702,8.3377469645506127e-09,9.1819862406014117e-11,0.0043661398668951336,5.4134838852023344e-07,1.122880415609163e-08,2.7576243129667594e-07,3.1727904301078075e-06,0.0021755325931190686,0.0030672006567665816,7.0964372865184712e-05,1.9332448777990909e-07,1.1065753359745605e-08,0.00014208367008070771,6.5684586325365565e-12,0.00063627335071658471,5.2274855888671452e-12,9.8146359124178033e-05,3.6395697956785277e-10,0.00035672483948779568,5.2316702584802519e-07,0.00014163027725748128,1.0242414203280452e-09,0.0031839428965487995,1.668143448642236e-09,2.8438193788863965e-09,5.1679079657712288e-05,1.3745565334665664e-05,2.4513154363474776e-12,3.2097585730814585e-08,3.379218478122204e-07,1.0275103687054256e-09,1.7969430653173782e-10,6.0260098797477202e-08,3.3969424371194326e-06,3.2453128762946558e-08,2.3279504921326902e-06,3.273852321389866e-07,2.5368588780090665e-12,0.00048378275097056572,2.1597278178122585e-10,7.9296499997061919e-08,4.2591753912890543e-11,2.670821036214454e-11,7.125684794531105e-07,1.031276186068071e-11,1.3816690280026762e-11,1.5243118127727429e-05,0.00014871195198481706,6.2639723367318865e-05,1.3485311287696765e-12,7.5135064030808178e-09,1.543975539093226e-06,1.0923564409611599e-09,6.7985758556747621e-07,3.0894488855563806e-07,4.388899967126423e-07,6.184499874527687e-05,2.2186874773655314e-10,1.9184874851458844e-12,1.09201154389434e-11,0.0010739568644385728,3.9022272145139732e-12,0.00060416561972138482,0.0015812258368250046,0.00026213298659593769,6.5504850933825572e-10,0.00014286553192611104,0.00010146946568863699,2.5066988777539213e-09,6.9438156690997524e-07,4.2205161608711011e-09,0.00012439289362018994,0.0019399737253692996,0.000473993165610471,5.6341428520410172e-13,0.00017334700691979161,9.5348924326618493e-11,3.7398504597898157e-07,6.3141971762328756e-11,3.0821223344442509e-07,0.0014403268707697239,0.0030439089504647313,2.1084767361580946e-12,7.4185353280601629e-08,1.1728643716095006e-12,0.00060276042328798239,9.2379088040775898e-14,1.0388520079111052e-12,5.704507869585736e-12,4.9616294610098893e-08,1.8128039582523056e-11,4.4572587616444281e-11,1.1987280577236726e-08,3.8726873498882802e-11,7.5037140671747519e-05,3.4768715623465991e-11,3.1820394745050559e-07,3.4686110029574506e-10,0.00022328877144833296,2.7003013545968538e-05,0.0026259309868742376,0.0016717758899415136,2.2781067639457946e-13,0.0013982790566406155,2.6984554658598924e-06,1.1014623350922566e-07,3.0488415908584902e-06,3.318896776707874e-12,1.1654896420261901e-06,1.9627704202002394e-06,2.9870186676136415e-08,8.0150471514519048e-13,2.4997430802005954e-10,1.1689375756237067e-07,0.0027637048830021966,3.3628383676842105e-05,1.0556386685469685e-12,0.0027133235949173,2.0370228394929415e-09,0.0010638240181054855,1.312287110446402e-12,1.855589681582837e-10,5.4654478872762992e-07,0.00072883050656683413,3.9952689468151792e-08,8.5150050930500297e-07,0.0013740056008417062,2.6981104758516932e-07,5.4719483548120343e-05,5.9093411521208844e-12,8.1468402948004402e-11,6.0387513257671156e-05,8.0295290293679231e-07,0.00050770184573080347,1.7249217438591174e-13,0.0011499341864770008,0.00025438386825205441,2.5602851093115349e-06,4.7926490992947866e-14,2.0680209502396625e-11,2.8792764115949125e-09,1.5130301931075646e-08,2.6646225506129727e-11,7.6530095584774415e-14,2.7220553911221907e-14,1.0794794521766711e-07,2.0961027805209694e-06,0.00088914527637763447,7.8870143538251103e-08,1.9357376111003463e-07,1.9233087301878078e-08,1.2140195433790388e-12,8.8366243417513857e-12,2.7075137870765408e-07,1.7911373515783568e-12,0.00011334673808484187,0.00036048302668710113,4.6154863752189422e-08,4.280318602288197e-05,7.6778811884833647e-13,2.2348849397992351e-07,5.1868424726627645e-15,0.0010794429690980433,1.6531723960487703e-09,3.4453758818060068e-09,8.3526139529097719e-08,4.102781791533811e-07,4.6350107371810317e-07,4.0171600986890603e-05,0.0014620771261350069,1.5955456022812603e-05,1.6402163385721823e-13,1.9754154148972238e-13,3.3832830489048866e-05,4.1077591626219701e-11,5.0407135808386149e-07,9.5246989956471764e-09,3.4103415820411848e-08,3.3272091127971391e-14,4.9103898989696397e-07,0.00028263405541126908,4.7694357763854065e-06,2.9520992954088632e-12,0.00012634131201990189,3.258686968680164e-12,0.00039775956429722415,7.3371052263215425e-10,5.9496956024682105e-15,2.9164815132687335e-05,1.8011814001595493e-06,2.2922584703912211e-10,2.6955968339329972e-10,9.7150669368426579e-07,1.9929090575758154e-07,0.00011068589663613542,5.0749412011097938e-07,1.1250927316502416e-05,2.5442667106493661e-12,1.408451075871488e-13,9.5619357407510293e-08,0.00061253161447654,2.0981521592400037e-05,4.2776289688724248e-06,0.0026188198936842135,0.00096130584877289157,5.9697572083055358e-08,1.031203750593341e-08,4.0588350472758296e-14,0.0024646699103703287,9.5015017051156367e-15,2.5076022825210103e-14,6.1536371333681181e-12,1.5560931480004169e-05,4.8038378765422568e-11,0.00031277007613651997,4.0298604429222173e-11,5.7020407492490293e-07,2.1345833662225311e-14,5.5438043781034551e-09,2.5438181487576283e-14,0.00023712352853121578,0.002069076521176006,1.0838100426876307e-15,4.8795120572356805e-12,2.7600141318428655e-07,1.2277661928140391e-10,6.8461286573838091e-07,0.00080649170615161678,0.0006907191036074294,4.3070300447124562e-11,6.1314652022005576e-07,7.0830785803415245e-07,0.0010337472124551004,3.8432580021951897e-09,1.3334714220372119e-09,9.5205802200263808e-15,3.7645333605604672e-13,2.3981622798917626e-10,6.597679060572324e-11,9.7171892974203258e-10,0.00029770649229995093,8.216933646630819e-05,0.00038205279494250307,7.2720599048217161e-12,2.280499347957483e-13,3.7596492760879816e-15,2.8916231169791223e-14,5.0673444166716933e-15,5.2240969418204508e-10,2.3396154999641047e-11,0.00016306163061482039,1.6339491985292474e-07,5.0498118882678925e-14,1.0414106953778346e-11,1.7610256716298062e-07,6.1996038994781874e-12,5.3168877710627678e-07,1.2294372561302822e-06,1.4974114461189413e-12,1.2979830550525638e-11,0.0022298370728711528,1.3656778210494392e-08,0.00086958175928191796,4.7037087221373545e-13,4.2404020719206715e-12,1.6929916909211022e-07,3.1120090622356571e-11,3.4542980822365052e-12,3.040989081385334e-10,8.7363329218950668e-12,5.1631593000868608e-13,2.6001161565820409e-06,1.8685007690413043e-12,1.7708017752791897e-15,1.1540660799852372e-13,6.6225477943888281e-11,6.1184718898425301e-07,2.7571087836893441e-08,6.0127954303860462e-12,1.5925975932899993e-13,1.0395573002903108e-10,7.2953342913458166e-10,1.7257203266892103e-08,1.053828779665362e-14,0.00055339866742052854,1.6697346055557535e-08,7.650034039733325e-14,7.3122758183134566e-07,9.960063239831201e-08,1.9505460335236589e-06,1.9368762400101042e-11,0.0024249595318320844,2.3746224067561777e-13,1.5215719642708641e-08,0.00014599659643378354,7.0618562751049211e-06,7.1341192224553962e-05,1.2039994361027836e-13,1.6972370985633821e-10,2.5550450299313957e-11,1.0639383426125329e-09,1.2543715121254026e-13,1.7432929744554736e-15,5.1849024445491154e-10,1.9648398867914497e-13,1.8615055061370723e-08,3.3193727752463817e-13,2.526113611761241e-14,0.00067781757666003498,6.5644216407120356e-05,0.00035699175800523754,1.4603825845337565e-06,0.00022108805729330664,3.4956246723715019e-10,3.8982864145407408e-14,6.4596666850197433e-05,4.8452741545165499e-16,2.5390294489220739e-16,3.3039764836540207e-12,2.0871322054126847e-13,5.4726961312816978e-05,2.9307233904562552e-06,1.0849548771604006e-12,8.5407825430272741e-13,0.00010971961485483294,1.6475995783446904e-09,8.4601387856433031e-05,1.3067450750120901e-12,8.5878156165180411e-12,1.6249507188195237e-15,8.2986238512462215e-08,3.057928397709041e-14,1.9244351617102459e-12,4.1162825416280868e-06,9.3060920564984548e-14,1.5505515695551418e-16,3.7041975660179838e-11,4.8390130033315536e-15,1.2334929607451128e-13,4.3863345844425389e-13,1.7597237293218698e-06,5.2836598998068727e-17,1.0362918947986409e-13,4.8324067031536671e-09,7.5043447298845785e-17,4.9639004582658896e-15,1.5461319714144039e-15,0.00016431542738151513,0.00020421811834078388,1.1119904232476595e-12,2.2054427036169505e-08,0.00013888395782794905,1.7447661288610621e-08,4.4094641373771539e-13,1.5728129999828331e-12,2.8362641453437396e-06,1.8211646850486211e-11,1.0002794800046551e-13,4.7410062691320733e-14,0.00023099846299877753,1.953968789670531e-08,5.0567226922444997e-09,3.7877810712241076e-06,3.9145886212279974e-06,0.00018773465946950521,0.00019808058771507959,1.0863010819454258e-13,1.4377073880980252e-10,3.851458643042346e-06,2.3885490812539635e-17,8.3996165673546398e-09,1.3546208603409827e-05,4.0181060243681691e-11,2.1769986022115362e-16,1.6450992312337006e-06,1.4976726754822713e-07,1.6200874035777041e-12,1.3175361769955548e-11,3.7773917148593971e-10,1.6379357221982569e-15,2.1234988097932997e-05,8.2047222794243394e-09,7.7136018466095409e-14,0.0017812571062146181,0.00011028543887310147,0.0016211651714250421,1.9561482995467105e-07,4.54969218767324e-06,1.2815759616543686e-06,5.9185662519983821e-09,6.566558388861332e-11,4.6919857282211891e-06,0.00014578179243836413,1.5997504964603919e-15,3.7696139672235979e-09,2.9309406970349157e-14,9.2634943628706553e-05,0.00022364301718167431,7.082053861162995e-05,1.5860775859580687e-07,7.3503584149788799e-15,2.9502414093962306e-07,2.0250872608977669e-07,1.7285641241358144e-12,3.5668644784076313e-12,3.7127160013314372e-16,6.310688504078052e-17,1.445106739987548e-06,1.3520808894260444e-09,1.9385893086897846e-07,1.8024258194922046e-13,0.00016724015417741563,1.4316760613108254e-14,5.2615921763458937e-08,1.2663699344437519e-09,0.0004628166413081038,4.3963806967675841e-13,2.6732847528315661e-12,7.1997510181733132e-05,3.0999629364336084e-11,4.3854989520043653e-17,2.5446727377120166e-08,4.9814889679657404e-06,3.806799408995592e-11,3.3062171597604285e-07,1.5854103820002206e-17,3.6857973946815997e-15,4.5271688950554845e-16,1.4452900405333108e-10,3.7183946819661338e-16,2.4544168613514745e-14,3.6014201341720488e-05,4.6281224279462261e-09,1.435320809613962e-12,2.2841049657893388e-07,1.0853044557430161e-15,0.00068301137128458323,4.8312818586841879e-18,7.3914603777719676e-13,1.5372484231586382e-12,9.953139231771499e-10,4.3358282735803526e-14,3.9835305759457543e-10,3.9685351793530902e-14,1.7399445037790426e-12,9.122739436782063e-13,0.00033557112050626019,2.1929234598608236e-11,5.1919931572787004e-08,2.6830241803270789e-14,7.9898913570586847e-15,5.5597213785634418e-15,6.2130624353558999e-14,1.1609305634836961e-10,3.7107864996615997e-05,3.6589387457382886e-12,3.0082138257666405e-05,2.1969748650888032e-17,0.0001088095032828714,0.0001740988983818046,0.0014421568302393313,0.00067955956920752697,1.3007285286575239e-09,5.8760395780329005e-09,3.5245587008927244e-13,0.00017185817894795934,3.219058292293168e-14,2.4682777412944923e-15,3.6241169375213571e-11,1.3035095185254027e-10,5.9538090733034575e-05,6.2522202558439272e-10,9.8602912195455836e-13,1.3705126769841918e-07,3.2161521933278131e-05,6.8664121096046506e-11,2.4091293855676575e-05,5.8156355576594098e-09,8.2804991277543586e-05,4.1956852951379519e-05,1.8443134352023328e-05,3.7621829718183541e-12,7.1085797170124844e-06,0.001098533028543821,2.7342300569109587e-06,1.3924075494458656e-10,3.2514083882947593e-08,6.0469747469111007e-05,3.2498862281480412e-08,1.4564475406523634e-08,1.1666049390533315e-06,0.00011625169423093592,3.7106347813876433e-07,1.9315166188812586e-06,5.249754742076307e-17,2.1211916018436633e-11,9.3120538617813359e-14,1.2072966481247377e-10,5.217791715297715e-12,0.00061708938117041535,3.5940243094191972e-06,3.1394515599682361e-16,1.3205751901803502e-06,1.1966263097296773e-17,0.00015521779718877384,1.5355683932100065e-16,2.0383419841488907e-17,2.0778721827156495e-18,9.9921676705582835e-14,6.3549390587971982e-16,5.814979075174736e-12,3.6707847896194362e-16,3.5637059629908862e-08,1.8736030704911665e-17,6.8988447399783321e-06,1.2368028410222107e-12,8.4684294099465304e-13,4.623190326084497e-16,1.9480692361693382e-18,1.1038388029273778e-11,5.8670254984879933e-06,1.2088040852262158e-17,2.289007329999833e-07,5.8358725509649561e-06,1.5152366933579024e-09,0.00094222224751675182,0.00016129272153414691,9.7861936967333788e-17,4.0422491656991912e-14,7.7808105956950255e-16,1.0957445911875803e-09,1.0218360462599118e-15,1.1462822996230027e-17,9.0526522278487752e-15,1.6185070875272882e-09,1.1097469498884998e-14,5.3944927911772344e-13,1.7519135345698334e-12,9.0537856453003722e-06,2.9018683481294654e-12,2.1650826832191029e-09,4.4726073569058039e-18,7.0359161409899905e-06,6.7086145044598885e-13,2.0261855420444584e-15,5.8528197745913075e-05,3.8085159575788196e-17,5.687388311379879e-13,5.8613279081692281e-09,8.6582488367465176e-15,3.4172853458868365e-14,5.4914244951926169e-08,5.3857386201991836e-08,1.9677329309331887e-08,1.4862882293886105e-11,1.5915687246240869e-12,1.5005841406238338e-16,3.5819745055225986e-13,6.0898960258720637e-13,0.00027596648397438622,1.0906756849112734e-08,6.3848589446194788e-19,4.7763664823991966e-08,2.3019313495441895e-15,1.6513956592352338e-10,3.6043099618934147e-13,5.3593787004636847e-10,1.5021912684028913e-08,4.5437915468675454e-09,2.2511174656712288e-18,2.8925055957551955e-12,1.9022310345803357e-11,3.3295045619992466e-15,2.105232298622092e-17,3.6534160944251846e-10,3.1892667118918408e-12,2.5229325321264968e-10,2.1999773346027097e-10,2.2461562362985966e-05,5.5691017039608448e-19,0.00071354088703408152,2.6133990706018472e-05,4.721275731903026e-08,1.1426262246716349e-18,1.5816005403153572e-08,4.3765878004982649e-07,1.0708822533906087e-13,6.0753174421335204e-13,9.4587609049937709e-19,1.4733199721127372e-12,4.9907830427839847e-18,4.1366868689948046e-15,8.0834241998774532e-11,4.5447747980047701e-10,2.8188413142916442e-07,0.00024746281870318554,3.730897078552533e-15,1.1509975433160869e-11,2.1907369555719201e-15,3.5462259871207284e-06,4.4511150343883359e-15,4.6116322763929951e-12,1.7929953874253594e-15,5.6750501042653873e-12,4.0575752290190331e-05,1.4757044150885757e-14,2.5548095139690039e-14,5.7308124939225067e-11,5.4842024428808743e-11,9.0686018781206614e-09,7.561415435826264e-07,1.6920904006593114e-09,5.3578346273390184e-05,1.2474262561573203e-05,8.8667174553299572e-17,2.4522267210431374e-15,3.0623758263219706e-06,8.0613939219479604e-09,4.5029788596034987e-06,3.1909342426486123e-14,1.0034807591093941e-13,0.00017677524792203102,7.8635036596741898e-18,4.7912533622848228e-18,7.8846745083936795e-12,4.1279231633199894e-05,7.7147740019930821e-15,4.8519422956307274e-05,6.3377513530094941e-06,6.5274682247236183e-10,1.2636276596741802e-18,3.616081678486095e-14,2.3001313991622823e-12,1.9791454527772279e-11,1.6054170561983321e-14,6.3182606905069878e-11,0.00043095269047751763,6.7826541057715059e-07,2.8754595685600595e-16,3.6937662420772499e-10,8.6067454307553705e-16,3.4056185405031369e-05,2.1327133627334117e-05,2.2756640619060141e-11,6.7731971588597306e-12,2.8749563621792032e-05,8.9539351716188685e-09,2.2395441410181155e-09,1.7684465204229088e-12,3.4073673897976562e-08,6.227114986759025e-10,7.4774162540663381e-09,2.4371554203919826e-10,1.0014672341092386e-07,2.1444517543912937e-06,2.2279260532380186e-12,1.1148878957788175e-07,0.00013002991883100508,0.00068852021567592577,0.00075876066730306961,8.8588261281621131e-19,1.2098645488031713e-05,5.0241775542086841e-14,2.0211260773942829e-18,1.7520183612120677e-18,9.2045327725113351e-16,4.0275557382918091e-06,3.7597212954079548e-13,1.1789156228889501e-18,2.0997642799380945e-19,1.0815994989871738e-16,8.9334713209380319e-19,4.5245922523663922e-13,1.6863845868257623e-07,9.1141023377586686e-11,1.3532362651619906e-18,9.5041950536336831e-08,6.3361086630209245e-11,5.1091021912256442e-16,5.8750055280951904e-13,2.8559645124182532e-07,3.6471349126268284e-09,0.00014876030742697139,0.00038926866171981562,1.9885996468688858e-16,1.564191745631808e-12,1.9460244724419473e-14,2.7666439607362645e-09,1.7154969875649524e-15,2.1027931765853068e-16,5.0846451702665653e-14,6.5977744931583857e-14,2.3397622893800004e-10,1.0006570233213625e-17,4.8039681414631734e-10,2.6282561711076731e-17,4.9453354880843295e-17,3.4791456826523949e-09,8.5604914636678913e-09,1.2956749624574326e-14,3.5479509563311453e-17,5.0447129817502963e-15,8.0469594934803299e-17,3.0246208789738537e-10,1.4729269483464553e-17,0.00067492911382414282,4.8431222504911172e-12,0.0010171703913584734,3.9581675467211538e-14,4.7489937118824471e-10,1.3560283891393281e-19,4.1637589076971216e-19,4.831171058824443e-11,8.4084590906221017e-07,0.00016082688126660443,5.4557376975299688e-14,4.2598887517634828e-18,1.1885500142274203e-18]}
},{}],65:[function(require,module,exports){
module.exports={"x":[1,1.0490490490490489,1.0980980980980981,1.1471471471471471,1.1961961961961962,1.2452452452452452,1.2942942942942943,1.3433433433433433,1.3923923923923924,1.4414414414414414,1.4904904904904905,1.5395395395395395,1.5885885885885886,1.6376376376376376,1.6866866866866865,1.7357357357357357,1.7847847847847849,1.8338338338338338,1.8828828828828827,1.9319319319319319,1.9809809809809811,2.03003003003003,2.079079079079079,2.1281281281281279,2.1771771771771773,2.2262262262262262,2.2752752752752752,2.3243243243243246,2.3733733733733731,2.4224224224224224,2.4714714714714714,2.5205205205205203,2.5695695695695697,2.6186186186186182,2.6676676676676676,2.7167167167167166,2.7657657657657655,2.8148148148148149,2.8638638638638638,2.9129129129129128,2.9619619619619622,3.0110110110110111,3.06006006006006,3.109109109109109,3.1581581581581579,3.2072072072072073,3.2562562562562563,3.3053053053053052,3.3543543543543541,3.4034034034034031,3.4524524524524525,3.5015015015015014,3.5505505505505504,3.5995995995995993,3.6486486486486487,3.6976976976976976,3.7467467467467466,3.7957957957957955,3.8448448448448449,3.8938938938938938,3.9429429429429428,3.9919919919919917,4.0410410410410407,4.0900900900900901,4.1391391391391394,4.1881881881881879,4.2372372372372364,4.2862862862862858,4.3353353353353352,4.3843843843843846,4.4334334334334331,4.4824824824824825,4.531531531531531,4.5805805805805804,4.6296296296296298,4.6786786786786791,4.7277277277277276,4.7767767767767761,4.8258258258258255,4.8748748748748749,4.9239239239239243,4.9729729729729728,5.0220220220220222,5.0710710710710707,5.1201201201201201,5.1691691691691686,5.218218218218218,5.2672672672672673,5.3163163163163158,5.3653653653653652,5.4144144144144146,5.4634634634634631,5.5125125125125125,5.561561561561561,5.6106106106106104,5.6596596596596598,5.7087087087087083,5.7577577577577577,5.8068068068068062,5.8558558558558556,5.9049049049049049,5.9539539539539534,6.0030030030030028,6.0520520520520522,6.1011011011011007,6.1501501501501501,6.1991991991991986,6.248248248248248,6.2972972972972974,6.3463463463463459,6.3953953953953953,6.4444444444444446,6.4934934934934931,6.5425425425425425,6.591591591591591,6.6406406406406404,6.6896896896896898,6.7387387387387383,6.7877877877877877,6.8368368368368362,6.8858858858858856,6.934934934934935,6.9839839839839835,7.0330330330330328,7.0820820820820822,7.1311311311311307,7.1801801801801801,7.2292292292292286,7.278278278278278,7.3273273273273274,7.3763763763763759,7.4254254254254253,7.4744744744744738,7.5235235235235232,7.5725725725725725,7.621621621621621,7.6706706706706704,7.7197197197197198,7.7687687687687683,7.8178178178178177,7.8668668668668662,7.9159159159159156,7.964964964964965,8.0140140140140126,8.063063063063062,8.1121121121121114,8.1611611611611607,8.2102102102102101,8.2592592592592595,8.3083083083083089,8.3573573573573583,8.4064064064064059,8.4554554554554553,8.5045045045045029,8.5535535535535523,8.6026026026026017,8.6516516516516511,8.7007007007007005,8.7497497497497498,8.7987987987987992,8.8478478478478486,8.8968968968968962,8.9459459459459456,8.994994994994995,9.0440440440440444,9.093093093093092,9.1421421421421414,9.1911911911911908,9.2402402402402402,9.2892892892892895,9.3383383383383372,9.3873873873873865,9.4364364364364359,9.4854854854854853,9.5345345345345347,9.5835835835835841,9.6326326326326317,9.6816816816816811,9.7307307307307305,9.7797797797797799,9.8288288288288292,9.8778778778778769,9.9269269269269262,9.9759759759759756,10.025025025025025,10.074074074074074,10.123123123123122,10.172172172172171,10.221221221221221,10.27027027027027,10.31931931931932,10.368368368368367,10.417417417417417,10.466466466466466,10.515515515515515,10.564564564564565,10.613613613613612,10.662662662662662,10.711711711711711,10.76076076076076,10.80980980980981,10.858858858858859,10.907907907907907,10.956956956956956,11.006006006006006,11.055055055055055,11.104104104104104,11.153153153153152,11.202202202202201,11.251251251251251,11.3003003003003,11.34934934934935,11.398398398398397,11.447447447447447,11.496496496496496,11.545545545545545,11.594594594594595,11.643643643643642,11.692692692692692,11.741741741741741,11.790790790790791,11.83983983983984,11.888888888888889,11.937937937937937,11.986986986986986,12.036036036036036,12.085085085085085,12.134134134134134,12.183183183183182,12.232232232232231,12.281281281281281,12.33033033033033,12.37937937937938,12.428428428428427,12.477477477477477,12.526526526526526,12.575575575575575,12.624624624624625,12.673673673673672,12.722722722722722,12.771771771771771,12.820820820820821,12.86986986986987,12.918918918918918,12.967967967967967,13.017017017017016,13.066066066066066,13.115115115115115,13.164164164164164,13.213213213213212,13.262262262262261,13.311311311311311,13.36036036036036,13.40940940940941,13.458458458458457,13.507507507507507,13.556556556556556,13.605605605605605,13.654654654654655,13.703703703703702,13.752752752752752,13.801801801801801,13.850850850850851,13.8998998998999,13.948948948948948,13.997997997997997,14.047047047047046,14.096096096096096,14.145145145145145,14.194194194194194,14.243243243243242,14.292292292292291,14.341341341341341,14.39039039039039,14.43943943943944,14.488488488488487,14.537537537537537,14.586586586586586,14.635635635635635,14.684684684684685,14.733733733733732,14.782782782782782,14.831831831831831,14.880880880880881,14.92992992992993,14.978978978978978,15.028028028028027,15.077077077077076,15.126126126126126,15.175175175175175,15.224224224224223,15.273273273273272,15.322322322322321,15.371371371371371,15.42042042042042,15.46946946946947,15.518518518518517,15.567567567567567,15.616616616616616,15.665665665665665,15.714714714714715,15.763763763763762,15.812812812812812,15.861861861861861,15.910910910910911,15.95995995995996,16.009009009009006,16.058058058058059,16.107107107107105,16.156156156156158,16.205205205205203,16.254254254254253,16.303303303303302,16.352352352352352,16.401401401401401,16.45045045045045,16.4994994994995,16.548548548548546,16.597597597597598,16.646646646646644,16.695695695695697,16.744744744744743,16.793793793793792,16.842842842842842,16.891891891891891,16.940940940940941,16.98998998998999,17.039039039039039,17.088088088088089,17.137137137137138,17.186186186186184,17.235235235235233,17.284284284284283,17.333333333333332,17.382382382382382,17.431431431431431,17.48048048048048,17.52952952952953,17.578578578578579,17.627627627627628,17.676676676676674,17.725725725725724,17.774774774774773,17.823823823823822,17.872872872872872,17.921921921921921,17.970970970970971,18.02002002002002,18.069069069069069,18.118118118118119,18.167167167167168,18.216216216216214,18.265265265265263,18.314314314314313,18.363363363363362,18.412412412412412,18.461461461461461,18.51051051051051,18.55955955955956,18.608608608608609,18.657657657657658,18.706706706706704,18.755755755755754,18.804804804804803,18.853853853853852,18.902902902902902,18.951951951951951,19.001001001001001,19.05005005005005,19.099099099099099,19.148148148148149,19.197197197197195,19.246246246246244,19.295295295295293,19.344344344344343,19.393393393393392,19.442442442442442,19.491491491491491,19.54054054054054,19.58958958958959,19.638638638638639,19.687687687687689,19.736736736736734,19.785785785785784,19.834834834834833,19.883883883883883,19.932932932932932,19.981981981981981,20.031031031031031,20.08008008008008,20.129129129129129,20.178178178178179,20.227227227227225,20.276276276276274,20.325325325325323,20.374374374374373,20.423423423423422,20.472472472472472,20.521521521521521,20.57057057057057,20.61961961961962,20.668668668668669,20.717717717717719,20.766766766766764,20.815815815815814,20.864864864864863,20.913913913913913,20.962962962962962,21.012012012012011,21.061061061061061,21.11011011011011,21.159159159159159,21.208208208208209,21.257257257257255,21.306306306306304,21.355355355355353,21.404404404404403,21.453453453453452,21.502502502502502,21.551551551551551,21.6006006006006,21.64964964964965,21.698698698698699,21.747747747747749,21.796796796796794,21.845845845845844,21.894894894894893,21.943943943943943,21.992992992992992,22.042042042042041,22.091091091091091,22.14014014014014,22.189189189189189,22.238238238238239,22.287287287287285,22.336336336336334,22.385385385385383,22.434434434434433,22.483483483483482,22.532532532532532,22.581581581581581,22.63063063063063,22.67967967967968,22.728728728728729,22.777777777777779,22.826826826826824,22.875875875875874,22.924924924924923,22.973973973973973,23.023023023023022,23.072072072072071,23.121121121121121,23.17017017017017,23.219219219219219,23.268268268268269,23.317317317317315,23.366366366366364,23.415415415415413,23.464464464464463,23.513513513513512,23.562562562562562,23.611611611611611,23.66066066066066,23.70970970970971,23.758758758758759,23.807807807807805,23.856856856856854,23.905905905905904,23.954954954954953,24.004004004004003,24.053053053053052,24.102102102102101,24.151151151151151,24.2002002002002,24.24924924924925,24.298298298298299,24.347347347347345,24.396396396396394,24.445445445445444,24.494494494494493,24.543543543543542,24.592592592592592,24.641641641641641,24.69069069069069,24.73973973973974,24.788788788788789,24.837837837837835,24.886886886886884,24.935935935935934,24.984984984984983,25.034034034034033,25.083083083083082,25.132132132132131,25.181181181181181,25.23023023023023,25.27927927927928,25.328328328328329,25.377377377377375,25.426426426426424,25.475475475475474,25.524524524524523,25.573573573573572,25.622622622622622,25.671671671671671,25.72072072072072,25.76976976976977,25.818818818818819,25.867867867867865,25.916916916916914,25.965965965965964,26.015015015015013,26.064064064064063,26.113113113113112,26.162162162162161,26.211211211211211,26.26026026026026,26.30930930930931,26.358358358358359,26.407407407407405,26.456456456456454,26.505505505505504,26.554554554554553,26.603603603603602,26.652652652652652,26.701701701701701,26.75075075075075,26.7997997997998,26.848848848848849,26.897897897897895,26.946946946946944,26.995995995995994,27.045045045045043,27.094094094094093,27.143143143143142,27.192192192192191,27.241241241241241,27.29029029029029,27.33933933933934,27.388388388388389,27.437437437437435,27.486486486486484,27.535535535535534,27.584584584584583,27.633633633633632,27.682682682682682,27.731731731731731,27.780780780780781,27.82982982982983,27.878878878878879,27.927927927927925,27.976976976976974,28.026026026026024,28.075075075075073,28.124124124124123,28.173173173173172,28.222222222222221,28.271271271271271,28.32032032032032,28.36936936936937,28.418418418418419,28.467467467467465,28.516516516516514,28.565565565565564,28.614614614614613,28.663663663663662,28.712712712712712,28.761761761761761,28.810810810810811,28.85985985985986,28.908908908908909,28.957957957957955,29.007007007007005,29.056056056056054,29.105105105105103,29.154154154154153,29.203203203203202,29.252252252252251,29.301301301301301,29.35035035035035,29.3993993993994,29.448448448448445,29.497497497497495,29.546546546546544,29.595595595595594,29.644644644644643,29.693693693693692,29.742742742742742,29.791791791791791,29.840840840840841,29.88988988988989,29.938938938938939,29.987987987987985,30.037037037037035,30.086086086086084,30.135135135135133,30.184184184184183,30.233233233233232,30.282282282282281,30.331331331331331,30.38038038038038,30.42942942942943,30.478478478478475,30.527527527527525,30.576576576576574,30.625625625625624,30.674674674674673,30.723723723723722,30.772772772772772,30.821821821821821,30.870870870870871,30.91991991991992,30.968968968968969,31.018018018018015,31.067067067067065,31.116116116116114,31.165165165165163,31.214214214214213,31.263263263263262,31.312312312312311,31.361361361361361,31.41041041041041,31.45945945945946,31.508508508508505,31.557557557557555,31.606606606606604,31.655655655655654,31.704704704704703,31.753753753753752,31.802802802802802,31.851851851851851,31.900900900900901,31.94994994994995,31.998998998998999,32.048048048048045,32.097097097097091,32.146146146146144,32.195195195195197,32.244244244244243,32.293293293293289,32.342342342342342,32.391391391391394,32.44044044044044,32.489489489489486,32.538538538538532,32.587587587587585,32.636636636636638,32.685685685685684,32.734734734734729,32.783783783783782,32.832832832832835,32.881881881881881,32.930930930930927,32.97997997997998,33.029029029029026,33.078078078078079,33.127127127127125,33.176176176176178,33.225225225225223,33.274274274274276,33.323323323323322,33.372372372372368,33.421421421421421,33.470470470470467,33.51951951951952,33.568568568568566,33.617617617617618,33.666666666666664,33.715715715715717,33.764764764764763,33.813813813813809,33.862862862862862,33.911911911911908,33.960960960960961,34.010010010010006,34.059059059059059,34.108108108108105,34.157157157157158,34.206206206206204,34.255255255255257,34.304304304304303,34.353353353353349,34.402402402402402,34.451451451451447,34.5005005005005,34.549549549549546,34.598598598598599,34.647647647647645,34.696696696696698,34.745745745745744,34.794794794794797,34.843843843843842,34.892892892892888,34.941941941941941,34.990990990990987,35.04004004004004,35.089089089089086,35.138138138138139,35.187187187187185,35.236236236236238,35.285285285285283,35.334334334334336,35.383383383383382,35.432432432432428,35.481481481481481,35.530530530530527,35.57957957957958,35.628628628628626,35.677677677677679,35.726726726726724,35.775775775775777,35.824824824824823,35.873873873873869,35.922922922922922,35.971971971971968,36.021021021021021,36.070070070070066,36.119119119119119,36.168168168168165,36.217217217217218,36.266266266266264,36.315315315315317,36.364364364364363,36.413413413413409,36.462462462462462,36.511511511511507,36.56056056056056,36.609609609609606,36.658658658658659,36.707707707707705,36.756756756756758,36.805805805805804,36.854854854854857,36.903903903903903,36.952952952952948,37.002002002002001,37.051051051051047,37.1001001001001,37.149149149149146,37.198198198198199,37.247247247247245,37.296296296296298,37.345345345345343,37.394394394394389,37.443443443443442,37.492492492492488,37.541541541541541,37.590590590590587,37.63963963963964,37.688688688688686,37.737737737737739,37.786786786786784,37.835835835835837,37.884884884884883,37.933933933933929,37.982982982982982,38.032032032032028,38.081081081081081,38.130130130130127,38.179179179179179,38.228228228228225,38.277277277277278,38.326326326326324,38.375375375375377,38.424424424424423,38.473473473473469,38.522522522522522,38.571571571571567,38.62062062062062,38.669669669669666,38.718718718718719,38.767767767767765,38.816816816816818,38.865865865865864,38.914914914914917,38.963963963963963,39.013013013013008,39.062062062062061,39.111111111111107,39.16016016016016,39.209209209209206,39.258258258258259,39.307307307307305,39.356356356356358,39.405405405405403,39.454454454454449,39.503503503503502,39.552552552552548,39.601601601601601,39.650650650650647,39.6996996996997,39.748748748748746,39.797797797797799,39.846846846846844,39.895895895895897,39.944944944944943,39.993993993993989,40.043043043043042,40.092092092092088,40.141141141141141,40.190190190190187,40.23923923923924,40.288288288288285,40.337337337337338,40.386386386386384,40.435435435435437,40.484484484484483,40.533533533533529,40.582582582582582,40.631631631631627,40.68068068068068,40.729729729729726,40.778778778778779,40.827827827827825,40.876876876876878,40.925925925925924,40.974974974974977,41.024024024024023,41.073073073073068,41.122122122122121,41.171171171171167,41.22022022022022,41.269269269269266,41.318318318318319,41.367367367367365,41.416416416416418,41.465465465465464,41.514514514514509,41.563563563563562,41.612612612612608,41.661661661661661,41.710710710710707,41.75975975975976,41.808808808808806,41.857857857857859,41.906906906906904,41.955955955955957,42.005005005005003,42.054054054054049,42.103103103103102,42.152152152152148,42.201201201201201,42.250250250250247,42.2992992992993,42.348348348348345,42.397397397397398,42.446446446446444,42.495495495495497,42.544544544544543,42.593593593593589,42.642642642642642,42.691691691691688,42.74074074074074,42.789789789789786,42.838838838838839,42.887887887887885,42.936936936936938,42.985985985985984,43.03503503503503,43.084084084084083,43.133133133133128,43.182182182182181,43.231231231231227,43.28028028028028,43.329329329329326,43.378378378378379,43.427427427427425,43.476476476476478,43.525525525525524,43.574574574574569,43.623623623623622,43.672672672672668,43.721721721721721,43.770770770770767,43.81981981981982,43.868868868868866,43.917917917917919,43.966966966966964,44.016016016016017,44.065065065065063,44.114114114114109,44.163163163163162,44.212212212212208,44.261261261261261,44.310310310310307,44.35935935935936,44.408408408408405,44.457457457457458,44.506506506506504,44.555555555555557,44.604604604604603,44.653653653653649,44.702702702702702,44.751751751751748,44.800800800800801,44.849849849849846,44.898898898898899,44.947947947947945,44.996996996996998,45.046046046046044,45.09509509509509,45.144144144144143,45.193193193193189,45.242242242242241,45.291291291291287,45.34034034034034,45.389389389389386,45.438438438438439,45.487487487487485,45.536536536536538,45.585585585585584,45.634634634634629,45.683683683683682,45.732732732732728,45.781781781781781,45.830830830830827,45.87987987987988,45.928928928928926,45.977977977977979,46.027027027027025,46.076076076076077,46.125125125125123,46.174174174174169,46.223223223223222,46.272272272272268,46.321321321321321,46.370370370370367,46.41941941941942,46.468468468468465,46.517517517517518,46.566566566566564,46.61561561561561,46.664664664664663,46.713713713713709,46.762762762762762,46.811811811811808,46.860860860860861,46.909909909909906,46.958958958958959,47.008008008008005,47.057057057057058,47.106106106106104,47.15515515515515,47.204204204204203,47.253253253253249,47.302302302302301,47.351351351351347,47.4004004004004,47.449449449449446,47.498498498498499,47.547547547547545,47.596596596596598,47.645645645645644,47.694694694694689,47.743743743743742,47.792792792792788,47.841841841841841,47.890890890890887,47.93993993993994,47.988988988988986,48.038038038038039,48.087087087087085,48.136136136136138,48.185185185185183,48.234234234234229,48.283283283283282,48.332332332332328,48.381381381381381,48.430430430430427,48.47947947947948,48.528528528528525,48.577577577577578,48.626626626626624,48.67567567567567,48.724724724724723,48.773773773773769,48.822822822822822,48.871871871871868,48.920920920920921,48.969969969969966,49.019019019019019,49.068068068068065,49.117117117117118,49.166166166166164,49.21521521521521,49.264264264264263,49.313313313313309,49.362362362362362,49.411411411411407,49.46046046046046,49.509509509509506,49.558558558558559,49.607607607607605,49.656656656656658,49.705705705705704,49.75475475475475,49.803803803803802,49.852852852852848,49.901901901901901,49.950950950950947,50],"d1":[19.304473305353895,25.730690446682274,11.297135826898739,25.007419375702739,29.913094785064459,27.784723927499726,7.5009734649211168,9.000219683162868,19.921081057749689,19.705281994771212,18.544728700537235,13.127456776564941,12.230117393191904,29.769335255026817,5.1234275649767369,14.651621044613421,1.7289145949762315,20.584742198465392,13.212255231803283,28.066574258031324,6.3389083105139434,17.56198645546101,22.047482850961387,13.711927179712802,11.740517914062366,10.281338009284809,25.40524237928912,27.548453058348969,22.292660866165534,29.481135037494823,17.559750359505415,9.1114474744535983,6.1287967951502651,1.5735391227062792,28.76413679192774,10.752661063103005,8.69433887838386,26.698277493705973,27.812846045941114,4.2266927501186728,7.4893418510910124,10.050243905745447,11.833350477041677,16.219920529285446,3.5375102672260255,4.4618780252058059,19.563379829283804,23.06541792745702,6.2378897380549461,10.066943907411769,2.3064821758307517,9.3806218793615699,21.972030859673396,10.44849995453842,11.075691666686907,12.938056563958526,20.157887894194573,8.637279934482649,12.132189528550953,15.106132673798129,19.193048528628424,7.5745495436713099,1.6278445986099541,28.007726132171229,27.406529779080302,2.2918621280696243,24.216200996655971,29.3177740117535,22.629577079322189,23.706872886745259,24.580271639162675,14.065189882181585,12.115883274935186,7.2049162131734192,18.90109776891768,3.9898419305682182,17.689350820379332,16.804722959641367,16.371499369619414,16.546528281411156,8.9770228015258908,20.370112340664491,8.2102399275172502,3.3441664364654571,14.097524216864258,19.756542366463691,7.6036720380652696,5.226532242493704,24.329037932213396,12.689676553010941,29.597022958332673,27.634746317984536,1.8697665000800043,13.279948836890981,16.534261464839801,19.627148256171495,3.5252392441034317,18.853970911120996,24.260651664109901,24.189764989539981,29.685202285647392,13.839598994236439,2.9414415515493602,21.307161635253578,28.242552405456081,24.752858124673367,1.5271484181284904,8.6954656061716378,20.831319813616574,2.615456233965233,23.728357810061425,21.517119094962254,16.489989403635263,24.219301582779735,26.675423881504685,29.051854714518413,27.071142022730783,29.769502706825733,19.152191153960302,2.2248933867085725,4.9982006547506899,27.774621513206512,7.3162464066408575,2.8217931292019784,6.2820911183953285,12.063198185525835,2.2127761761657894,4.7038507226388901,4.1013081381097436,13.735656119184569,18.876861166907474,1.2494741801638156,28.250169119331986,26.346095868153498,11.279216094175354,26.72340955096297,12.908243519952521,16.036365404026583,29.546133087249473,9.8675533921923488,28.421796565176919,12.495468529174104,20.6226956686005,12.67656658962369,29.660765680018812,7.5235299717169255,23.238110191188753,16.987686608685181,10.764278774382547,9.2909616434480995,20.209073932142928,11.765714885899797,8.0807934345211834,2.4343315972946584,9.5697102737613022,24.610148281091824,20.725172698963434,19.017658055992797,16.307558136526495,10.013557890430093,12.936211933847517,7.6438080938532948,18.476508304243907,13.493601674214005,22.765081512508914,22.010985407978296,17.922461975365877,25.99997704429552,17.001982839778066,20.781237391056493,17.923547900281847,17.739223988959566,15.842777606798336,24.257083819946274,3.3951891143806279,5.8456009759102017,21.867533962242305,19.48733536247164,29.888527195667848,29.755847606807947,11.281494721537456,27.37193866004236,29.166505706729367,14.742770352400839,11.047014060663059,18.694309591082856,26.70977193210274,27.036617641337216,14.186151025351137,21.661937838653103,12.989391363924369,13.34162205690518,7.3142300033941865,16.30206913407892,4.6439830786548555,7.6290873792022467,9.9585230269003659,26.942859684349969,22.057028569048271,4.1547648832201958,23.70328992465511,28.547335118055344,21.11984076211229,12.544323138426989,1.2842653635889292,1.8129009089898318,25.453186732716858,13.964932519942522,27.747628046898171,6.9715971478726715,23.357672213809565,26.835078584495932,2.2371357337106019,28.271877388237044,11.967398099834099,3.2033331468701363,21.425849080085754,5.0173929063603282,22.155878303106874,15.90583555190824,7.5040349632035941,26.145511063747108,8.8025871417485178,24.381843857001513,20.517903691390529,25.361332844477147,14.847273698076606,27.582156419521198,19.087775856722146,24.911502208793536,7.8569029790814966,20.029105226043612,6.1365887932479382,27.204221017891541,25.059658260084689,9.078167489496991,23.240728367585689,24.903009458677843,28.099869779543951,20.8156309844926,4.1287780925631523,21.788096894975752,6.2845975747331977,23.645548236556351,3.8737630809191614,20.205560820410028,15.203150134067982,22.773405602201819,6.604114695219323,6.8620885058771819,26.980855577858165,17.494702688651159,3.8735997749026865,19.809663478750736,2.2808014978654683,21.236354601569474,17.161559414351359,19.488113540690392,23.402356861392036,24.464777716202661,10.046261510346085,23.890818654093891,6.1904918919317424,22.035934807732701,10.829714703839272,1.7861252245493233,7.0942233628593385,28.639847935875878,15.794423084240407,4.9546425121370703,27.284565484849736,7.0585255697369576,19.238794381730258,4.7910392957273871,3.9444827155675739,26.270401902263984,12.334787792293355,26.779060657368973,2.5838820494245738,1.1847165047656745,15.537204481195658,21.165346234105527,13.519913996569812,24.77423332654871,29.929250082233921,19.977945879101753,24.536474810214713,14.343718522693962,15.083898295648396,22.260420061415061,26.938984869979322,17.441691399086267,4.9888513211626559,13.869391545653343,12.310142594389617,16.244737439556047,27.893330436432734,17.411248992895707,27.607321075862274,19.586215318879113,21.693646416766569,18.285007199505344,18.931783972773701,23.248835208825767,10.955348832532763,20.665096206124872,28.144792640814558,4.8922252997290343,4.6184472262393683,8.2740970903541893,22.186975580872968,10.609285402810201,19.747845669509843,6.3205217451322824,25.161407597595826,18.26141910860315,12.55018447805196,23.454744588816538,22.744844199623913,10.985422048019245,25.221394773805514,9.5658712657168508,10.351351469988003,27.214249942451715,17.015586975030601,14.813712205039337,29.394744838122278,17.642755514010787,16.929947439115494,8.9091577001381665,10.582284806296229,5.6097589589189738,18.964675118448213,21.20105945575051,11.458460550988093,6.6151638536248356,22.938776839524508,5.035295907407999,13.003121864516288,4.0941909234970808,15.278008076595142,9.7716063810512424,21.147553845774382,9.5385644822381437,29.209282747469842,1.1166301509365439,10.504893973004073,5.006490025203675,25.296292263315991,22.575259652221575,22.433094567153603,6.0040247596334666,28.671059242915362,19.876024451106787,1.9257562845014036,24.310482665896416,11.349200568161905,16.053441524039954,20.216961364261806,3.5670345851685852,9.1635451389010996,21.223672869149595,7.6811089206021279,26.085610145470127,21.62272795336321,14.205294202780351,19.112614461453632,26.786059730686247,18.127650853479281,16.428409335436299,20.152700986946002,10.379121109144762,2.3790856904815882,6.2526482306420803,11.11475932598114,17.214920124504715,14.088876884430647,8.2369294215459377,7.986244855215773,11.941926480038092,21.73630549851805,3.967935683671385,25.829286410240456,29.620579496724531,9.163723272504285,8.3465387101750821,22.200474012177438,13.123028054600582,4.9951238359790295,13.663653020514175,25.264960519270971,22.23632161389105,5.0194498288910836,12.131400742800906,18.058072159765288,9.5623730220831931,11.61854719184339,25.615522750886157,24.396026869071648,4.6751159264240414,15.609642704715952,14.830980989150703,15.198235781630501,23.768220021389425,26.434412762522697,29.943191193975508,11.24111253186129,24.039561110781506,14.033863303484395,1.7916863257996738,28.942378259729594,28.820078751305118,2.2266360737849027,10.729299362981692,29.215791747439653,2.3636039816774428,6.4869984209071845,18.572194664506242,20.346488531213254,29.247658040840179,18.006748743820935,21.050594629021361,20.578260105568916,20.560050735250115,11.469639383256435,6.823536881711334,18.988074373686686,7.0579490561503917,24.5233754881192,26.037130702519789,1.5584668605588377,26.100583982421085,3.4323316316585988,21.912480084458366,29.26924846554175,1.5848762914538383,19.889136480633169,11.864881238900125,7.7058966415934265,10.084570255130529,12.701243144227192,15.450853362912312,4.5385949595365673,22.146317500853911,8.7847258551046252,21.733292797580361,8.4775390613358468,4.6544440085999668,10.618291824823245,24.217785252723843,5.4147865041159093,10.592836126452312,11.092222184175625,12.997122620232403,4.5280953063629568,10.546069917967543,26.640438609290868,18.846953303320333,3.7340732575394213,10.103316693333909,27.971178129548207,23.731495687970892,12.571578970644623,20.443003548309207,2.3746424920391291,16.585495739709586,10.928831604542211,21.927424191962928,22.343018463347107,22.163697235286236,24.045782492030412,19.544974580872804,16.802271114196628,19.449771028710529,20.90048047201708,3.9582922358531505,26.91534827882424,4.3269627455156296,2.5889618415385485,17.126314038177952,9.8061799716670066,14.541931865271181,2.3395550539717078,22.564526856178418,6.6688261323142797,3.6599219278432429,21.884808195289224,24.114878161577508,21.930844867601991,16.823508722009137,26.456173063023016,29.143581798532978,17.890555972931907,6.9683424858376384,3.0498456733766943,27.122798762284219,27.759592538699508,22.318378045922145,24.210790602024645,23.909181573661044,9.2924588853493333,12.527017852524295,16.766233596485108,27.363975010346621,29.558511029696092,4.3229606272652745,21.754664002219215,5.3258324353955686,25.330118431476876,7.2265177383087575,13.564556355820969,4.7842743915971369,14.648116778116673,3.0113255477044731,17.260689103510231,3.596382660092786,8.803654653718695,18.305564034730196,22.721535543911159,28.751362636918202,15.612745478516445,4.5045193962287158,19.757480231579393,25.81155400746502,9.9246217147447169,24.844684531912208,5.0230144928209484,14.689026413951069,14.791615110356361,20.505496033001691,11.511319121811539,5.7561761650722474,23.855289393104613,23.21236710366793,23.628578900825232,8.0061518761795014,20.386854124255478,16.583440498448908,4.8716118144802749,21.966193706030026,1.6251207317691296,6.9588517365045846,17.235380512895063,17.939611011184752,9.7237515603192151,5.1898553897626698,28.242881718324497,14.259543940192088,29.446205395739526,13.097301692003384,9.3119912059046328,12.480053733568639,24.223788379458711,14.077347814571112,26.987229259219021,19.104515459388494,18.328270707977936,17.24309044610709,26.636485173599795,23.701998391887173,28.368214778136462,9.7358883586712182,16.92558448924683,24.383417046396062,22.12321781553328,21.363483521156013,17.725990610895678,10.965831274632365,1.7498667717445642,1.5975363361649215,13.94939840817824,12.22314868401736,19.742756870109588,10.209178755059838,16.114885692950338,4.9029218032956123,11.797067136038095,13.628363917814568,28.176905250409618,22.645674524595961,25.056452003773302,1.2717737969942391,25.623478703200817,29.921018982306123,11.803492997540161,9.1641711115371436,18.202352647203952,29.143655706895515,26.304024353157729,23.839484819676727,28.071546570397913,29.366905470145866,20.385464038001373,5.46462198253721,6.9965173515956849,12.250183939002454,19.961667072726414,27.624767001019791,3.0894949305802584,15.607626402750611,12.795080539537594,14.332556334324181,20.341014464385808,4.4413437014445662,28.078044206602499,18.387129799230024,24.517550778575242,25.607854390284047,15.051899992162362,5.4085455350577831,22.945726987207308,19.582846033386886,13.094376174034551,21.576639404753223,29.181793792638928,3.3561626023147255,29.651266362285241,21.899751350749284,26.060278374934569,1.0980803673155606,12.277629315853119,25.911791295744479,14.187512806849554,29.593312307493761,8.1539287976920605,6.6164290059823543,23.748269753297791,10.756693363189697,26.602290591225028,18.815205191727728,27.497638756642118,27.396061097737402,17.190262779593468,1.731823496054858,18.367175047751516,4.5457213637419045,5.3174250249285251,5.5181199559010565,27.091690931003541,22.615148851647973,14.061413823859766,3.9264399125240743,6.9644979815930128,4.3436398305930197,27.089878555620089,28.23327361093834,23.114980641752481,15.509543186053634,26.592102938564494,5.9409499680623412,9.2635562727227807,25.835488514276221,20.523553697392344,10.633243845775723,20.264117154758424,16.284390369895846,4.5616348753683269,13.920318512711674,12.812234220793471,10.141619199188426,8.9833216562401503,5.4555175134446472,21.783422457752749,10.133111121831462,9.2181469302158803,25.734702760586515,26.989766781916842,12.673559155315161,24.970787856495008,28.233398909447715,12.310768830357119,12.880072097759694,15.439185233786702,23.305834781611338,21.149350623833016,11.530027167638764,25.196701089153066,19.596631441963837,18.679261008510366,26.219034192617983,17.667377579258755,27.8922111291904,10.455223056487739,12.989896778017282,14.236313358880579,27.95922214537859,21.700071994680911,13.701600393513218,26.647746307076886,24.451754139037803,21.904814559733495,11.235969324130565,1.5397704958450049,10.730989660602063,20.568517496576533,10.448930893093348,13.716755888657644,3.8123065489344299,13.696785195497796,21.887241357704625,4.3940677980426699,1.185468781972304,24.625768927624449,12.901180484099314,10.420807579532266,27.141480339923874,8.1406153331045061,2.8066432382911444,10.9386834083125,26.947117720264941,11.895071960985661,14.326800307026133,16.850059926509857,10.783929087687284,17.295684409327805,13.266678585670888,12.478844583034515,7.3164893467910588,12.545795613666996,3.8227908411063254,15.945649317000061,8.199401022400707,20.068385711172596,14.070924647152424,28.576540798181668,13.521978960838169,21.948106913128868,13.099154505645856,12.602312594419345,13.799193523358554,25.12426894926466,5.4417599302250892,4.8958119079470634,1.2933295429684222,2.7535364066716284,22.728479810524732,3.4431643586140126,28.618751824833453,5.7530512376688421,27.367791743250564,10.402377740014344,3.1520423637703061,9.7500765833538026,15.881927580805495,1.3387488380540162,3.6187680081930012,16.657247782219201,1.9315811831038445,3.7658081485424191,4.4147084536962211,5.2489308652002364,5.3477520919404924,19.303094866452739,25.729023153427988,25.920292060589418,8.1339073625858873,29.252427216619253,27.486103954259306,17.554314279928803,23.921868370147422,29.908656063256785,28.740300555014983,17.052705583162606,11.095346834743395,15.948295122943819,20.924715136177838,10.589779962319881,18.039231874281541,13.470052178250626,13.071995842736214,15.262381285661831,29.271706840256229,3.0600756008643657,1.189714373787865,26.744437330868095,17.393800738267601,2.8743740811478347,22.556532335933298,13.649363649543375,22.635611947625875,24.972255686298013,9.0083099412731826,12.441505762282759,28.113700217800215,18.790771557018161,24.418921972857788,24.740581274498254,15.818536406615749,26.700816056225449,13.092254856834188,28.002237318782136,5.5157961908262223,6.532754787011072,29.798859343398362,8.4988853777758777,9.3100196770392358,27.038104917155579,8.7844411937985569,18.207493991358206,23.703425742918625,15.61136247520335,2.7637212639674544,18.771478071343154,21.593564629089087,24.763245092239231,19.125813208054751,16.424785867566243,26.437274979660287,6.8601778335869312,10.979222800116986,14.162910558981821,21.812883427599445,13.409416754264385,13.894951752852648,29.015529902186245,6.2511865587439388,18.981596615631133,18.420643737306818,21.166308676823974,13.193447099765763,21.884773833910003,1.3205863137263805,11.059960501966998,9.5414041203912348,15.992722117574885,19.579479516251013,17.144144359743223,21.255351488245651,5.5383613402955234,22.8181280142162,17.299625292886049,13.875011261785403,21.149295303970575,26.260860201669857,13.367210670141503,3.7854773204308003,25.251842088764533,25.846593904076144,22.210224953247234,9.9563697250559926,11.440900272456929,14.868514945264906,14.172158847562969,17.809975061332807,12.205307086464018,10.024561384459957,23.491084627108648,1.6588707633782178,22.293862130260095,16.695225418079644,13.478057353291661,23.463085673516616,21.118824606528506,9.5377576076425612,28.411191140534356,21.958529308903962,23.742745322640985,17.187831278191879,21.461583813885227,22.43362116930075,4.1706929253414273,7.4253994161263108,12.307988941436633,26.551620534388348,18.136237133527175,12.00424675270915,14.322021340718493,10.470565152354538,2.4598595092538744,19.781924237497151,7.6319398058112711,28.521091626491398,25.191482831956819,15.427799747092649,1.4536961591802537,4.1605958587024361,26.047614987939596,28.74467391660437,3.2640024393331259,27.828620734624565,20.40223507839255,11.90346947289072,15.506128465756774,14.481543034315109,7.3218201950658113,12.203710973728448,17.576856013154611,28.631453023524955,4.5434854635968804,7.4725248964969069,20.46382068330422,27.159614188130945,18.387980913510546,1.3096838241908699,2.6233085889834911,20.336030140053481,2.6339473419357091,28.188985662069172,5.422518557170406,1.493704728782177,1.5690109627321362,1.0641771578229964,13.620090846903622,1.7135465778410435,25.134422821225598,18.552770654205233,18.904314963612705,3.9608319462276995,16.083753128768876,12.280310009839013,26.052178555866703,6.0328547873068601,3.8332397050689906,18.572806336218491,27.333513799589127,18.896553059574217,4.132484253263101,8.9200948278885335,15.992906132247299,8.3989890767261386,5.1515248019713908,1.9736870729830116,17.221746661700308,10.80172992288135,1.132809073664248,21.917820648988709,23.233777760760859,28.65078022913076,25.612567706033587,4.1281764139421284,27.587816735962406,26.39039083244279,29.622080033645034,14.036726438906044,15.648859943030402,8.5698895724490285,8.8712269980460405,23.022257989272475,3.9217647055629641,24.342250034445897,15.727616095915437,8.0005061712581664,17.982664684997872,11.085403330856934,23.123725784942508,22.276074394118041,3.4059167788363993,8.9018744179047644,20.186289596371353,26.781325740041211,15.992391298990697,23.548848819918931,5.9603926411364228,9.4439216167666018,28.218178094597533,5.2674119463190436,18.124012213665992,14.290627700276673,13.778405712684616,22.162033297820017,28.315649004885927,23.810551160946488,20.021500713191926,21.842702805064619,14.106425562873483,9.0120491331908852,25.351225197315216,1.4771689716726542,16.446081610862166,12.063765360973775,17.062724987277761,16.633652304532006,20.721900393720716,10.828225375385955,11.648507201811299,25.250733159482479,7.9394276009406894,15.356171308318153,17.788781119277701,25.466855850070715,26.139724476495758,27.411918134894222,12.796526033431292,17.219362803036347,4.2658390374854207,11.63665989250876,13.87152924342081,23.844783953391016,9.7053476555738598,10.047133319778368,12.640218826942146,17.473431698512286,25.1675434501376,3.4552425015717745,12.70523138018325,3.1214003388304263,12.315102003514767,28.148598934989423,11.453017820604146,16.353649716824293],"d2":[39.817875081207603,76.267799625638872,48.209113255143166,74.657948571257293,36.077057076618075,71.601212820969522,60.057813175953925,99.503485274035484,48.009794699028134,87.772652658168226,50.828876830637455,73.045122209005058,59.740088449325413,81.847843774594367,38.344508376903832,66.444222524296492,64.654684420675039,80.431272960267961,79.448506238404661,38.600929016247392,47.050135976169258,77.777414855081588,84.954905475024134,80.256929893512279,35.186270028352737,77.232848829589784,57.571839964948595,76.643605839926749,30.237588523887098,63.097538014408201,45.447382503189147,34.014640857931226,30.091039987746626,56.327135388273746,43.242576660122722,73.729061170015484,39.973884087521583,38.000877080485225,48.765319709200412,67.35686712898314,42.242444395087659,75.821743956767023,39.705427968874574,96.968627667520195,71.921992716379464,96.882766725029796,93.07405307656154,92.802160428836942,95.756583400070667,93.430805634707212,45.482912345323712,40.154139746446162,63.78699648892507,56.343923667445779,56.320778019726276,77.75156291667372,66.664602488745004,67.332051540724933,48.541081224102527,80.089143211953342,34.785005329176784,87.679284708574414,60.542895682156086,30.298154435586184,42.169712684117258,77.672069023828954,31.827497640624642,81.884113210253417,96.827478837221861,94.262746241874993,60.141756185330451,70.616651331074536,97.309100187849253,31.462691435590386,83.369013671763241,88.60218457877636,30.51440647104755,71.794626363553107,77.602704770397395,49.233809171710163,79.416553089395165,52.062004394829273,75.159015369135886,30.408780311699957,68.661689287982881,63.730255165137351,45.267610996961594,41.79344454780221,84.06563482247293,56.257367641665041,45.9619827917777,65.931084880139679,55.960530063603073,98.317826481070369,92.36501746578142,41.745118461549282,89.946383284404874,90.686696143820882,58.170348189305514,80.885470872744918,52.261338303796947,58.76837891060859,72.604480246081948,77.609093203209341,93.713665858376771,55.436480371281505,93.636873350478709,50.688621464651078,71.411608529742807,62.274149679578841,53.279998446814716,78.323814682662487,89.714454144705087,40.63928535906598,60.967852766625583,35.318053585942835,93.304883525706828,71.35361268883571,32.322558523155749,63.829895406961441,67.269853516481817,86.573969202581793,80.154814044944942,97.609281004406512,42.551129159983248,37.277998966164887,53.557304865680635,78.874783841893077,43.139906625729054,63.176725339144468,52.534903190098703,37.577629117295146,58.269970046821982,45.320930639281869,68.399640899151564,59.69178739702329,33.411701477598399,43.240713162813336,68.691249478142709,37.550976320635527,49.236798577476293,57.004429318476468,46.905122008174658,35.851672717835754,47.020162530243397,68.786973275709897,40.791161938104779,31.213722031097859,96.949144799727947,99.756734995171428,95.496296042110771,99.943503555841744,87.31001062784344,75.002240415196866,80.978329260833561,72.270377953536808,42.306820633821189,80.742647391743958,55.225968428421766,84.304480324499309,43.215298487339169,43.799687530845404,30.083888166118413,37.077910925727338,52.149366200901568,45.963272040244192,78.973189140670002,56.909379253629595,73.767862457316369,79.270302092190832,68.014352489262819,53.617257184814662,60.732604134827852,96.231681010685861,50.119908531196415,86.472861263900995,65.116137224249542,67.663516483735293,83.308232966810465,86.535231901798397,83.36856335401535,38.213404729031026,70.323913421016186,50.990178789943457,82.33639866579324,56.481283667962998,75.187415457330644,81.689077643677592,38.625366161577404,85.633871301542968,65.307850267272443,85.279910794924945,54.308291689958423,59.105662161018699,36.450337551068515,92.650086951907724,40.349462877493352,77.973331694956869,43.871879056096077,32.490013684146106,77.058916443493217,91.14896010607481,60.205782551784068,70.297896529082209,78.608274064026773,35.052466201595962,47.974919162224978,76.731405120808631,30.683105278294533,87.115350163076073,67.259815114084631,61.545852741692215,49.557437559124082,85.839549899101257,96.23611097689718,55.937503930181265,93.451028242707253,85.430969174485654,57.487920441199094,72.552204777020961,31.739866833668202,31.089720625896007,77.000576043501496,53.208762172143906,88.601944344118237,74.003727990202606,98.004974916111678,44.487167426850647,33.985301931388676,67.212229762226343,61.522667049430311,30.656707824673504,70.772921238094568,66.856323941610754,78.064647153951228,59.440550366416574,80.360292501281947,65.155468233861029,75.502852266654372,88.158631278201938,80.884018805809319,63.154553635977209,56.169336650054902,52.900188528001308,70.710745607502759,89.803644749335945,38.128295831847936,97.47930642683059,34.035805515013635,56.008603838272393,98.583565519656986,53.482763131614774,49.937660619616508,64.980729040689766,71.648200796917081,72.323198758531362,97.351272306405008,68.672818737104535,43.004478672519326,59.853944242931902,43.512787078507245,65.978223124984652,53.915087124332786,65.704562552273273,95.302853032480925,32.287842920050025,57.34672776889056,41.77194056333974,49.125169436447322,85.957616351079196,40.636295448057353,88.329461964312941,57.797618934419006,74.921476326417178,56.230572969652712,40.132560594938695,39.178029675967991,36.068844669498503,60.452850256115198,82.040799045935273,36.405921943951398,56.975250504910946,73.023887029848993,91.043429633136839,30.768536324612796,87.594254955183715,70.128227134700865,43.581334550399333,85.281090014614165,49.45862231310457,46.475673839449883,67.730076885782182,61.361380361486226,32.82491487916559,69.855072619393468,84.509781848173589,34.298101293388754,35.614042617380619,64.740221665706486,76.356601715087891,74.962066237349063,61.207805254962295,45.488601212855428,70.734479324892163,88.593951049260795,52.893134283367544,97.975266429129988,49.690183489583433,89.246102499309927,31.888383550103754,65.419962012674659,53.720592884346843,49.521292364224792,94.576703472994268,82.263205538038164,43.961724177934229,46.585126575082541,89.485771236941218,97.014169411268085,72.730722515843809,73.418202444445342,86.808950544800609,72.018350169528276,56.210744695272297,42.082315152511001,33.760564429685473,36.324271513149142,94.805618450045586,47.868354164529592,91.816866304725409,90.099937496706843,32.335489764809608,93.774693463928998,97.3894620873034,78.974363682791591,76.838590181432664,80.762764811515808,35.384992382023484,46.092025788966566,44.215740808285773,70.323742355685681,37.979960318189114,86.743967346847057,65.497771133668721,58.269036000128835,56.066343260463327,99.190748741384596,79.667429556138813,36.299916983116418,62.916275684256107,52.465872445609421,45.676945510786027,65.798625389579684,89.30407511536032,34.24244549125433,87.618724973872304,80.798154717776924,53.475261877756566,68.9589026523754,35.413089031353593,67.055193060077727,58.373508576769382,88.098770570941269,51.518693375401199,90.113132605329156,61.681448516901582,85.232024448923767,58.943913436960429,52.248313820455223,54.810542759951204,61.654521960299462,32.01127263950184,82.655958351679146,35.470872393343598,37.690319593530148,67.804311481304467,37.681965685915202,56.460861130617559,48.891856796108186,41.670452551916242,66.724614198319614,66.613088371232152,98.085575469303876,78.207094098906964,79.728607919532806,78.265207840595394,51.830196268856525,50.433454820886254,50.40199902607128,63.75987735344097,89.525013307575136,86.738582521211356,93.815319556742907,99.117071493528783,74.74933068966493,33.639067462645471,47.875920871738344,43.215038955677301,36.206608847714961,72.024113715160638,88.677891092374921,60.978609167505056,70.930303330533206,71.777392933145165,96.367611582390964,55.326509582810104,34.272025092504919,45.294403012376279,70.924891482573003,60.189720583148301,49.957565756049007,64.407260813750327,87.941251802258193,79.890947679523379,43.369051276240498,40.444803049322218,60.977097433060408,36.915784899611026,57.538805271033198,68.759955384302884,87.860178456176072,64.372768071480095,77.38097665598616,51.712621271144599,44.532212370540947,72.027081444393843,52.267330985050648,72.696536667644978,39.366769171319902,60.515835513360798,77.002402283251286,62.343947610352188,69.969375340733677,89.978845424484462,41.883694662246853,92.391090064775199,40.33590410836041,95.476630749180913,63.325580242089927,39.291666194330901,93.567169117741287,39.44107630988583,68.652251781895757,68.089705284219235,32.305792572442442,69.58164889132604,33.770404777023941,72.672804058529437,86.354426115285605,60.34643963444978,61.596239858772606,63.223885912448168,56.785235924180597,69.151285451371223,85.275058967527002,88.711485741659999,55.50008081831038,97.514639729633927,67.264495077542961,84.355100553948432,79.815969741903245,43.493872412946075,91.003356389701366,47.552756525110453,53.008272480219603,92.709419941529632,75.508261800277978,51.051516500301659,98.238530056551099,97.004130047280341,35.317715366836637,74.453782474156469,71.091341536957771,92.88114189170301,58.972054710611701,56.671222087461501,51.639549743849784,86.163901223335415,48.468382940627635,73.594887782819569,83.113638949580491,42.747750161215663,99.665118542034179,89.956833117175847,43.060000960249454,53.963343780487776,84.680168963968754,42.648019383195788,43.70585897937417,41.227655501570553,99.465127964504063,81.843587644398212,86.158309949096292,40.883343822788447,59.695869837887585,41.209579489659518,81.020470624789596,57.380304734688252,64.884750682394952,71.088013015687466,86.629318534396589,74.629810769110918,54.955625766888261,34.447039756923914,35.12704071123153,55.769716303329915,71.369402087293565,57.6082728873007,93.713148050010204,78.550580048467964,43.563615158200264,80.125283566303551,60.26574520394206,74.80871400795877,82.441180923487991,82.122262911871076,32.742913940455765,83.947945525869727,96.242749243974686,35.692053851671517,83.457132689654827,60.545106329955161,69.117438620887697,75.437169910874218,42.86900601349771,52.051851758733392,64.856417058035731,72.849473636597395,66.249191961251199,94.274739525280893,99.597010484430939,97.79669753042981,89.839617754332721,77.698449788149446,97.368276177439839,44.447279314044863,77.525870343670249,76.96475081378594,58.245097268372774,75.511615257710218,95.448536071926355,77.203401862643659,63.563918513245881,52.81327995704487,46.225412969943136,64.08173056319356,57.740317492280155,84.847621386870742,79.355422903317958,84.153055171482265,69.099132202100009,70.081336279399693,82.964149119798094,72.636271570809186,99.683673800900578,96.242517484351993,97.370198331773281,61.49572285823524,67.454697478096932,43.651277942117304,97.470908677205443,95.230775822419673,38.093811466824263,86.119778412394226,33.60138057731092,31.878515903372318,51.30442633992061,30.17754832515493,70.613428079523146,75.399897813331336,67.167511580046266,60.912590401712805,93.084566504694521,75.578289681579918,67.838529730215669,95.504894878249615,60.23864318151027,39.046526397578418,67.986689207609743,38.00172173185274,79.869036192540079,73.864159558434039,31.167230203282088,36.012314292602241,86.064461790956557,36.829224897082895,39.975652729626745,86.705945795401931,63.493212824687362,76.131390866357833,47.97847458627075,79.564601250458509,55.836417928803712,92.842904780991375,76.32354405708611,39.94159275200218,41.87261663377285,71.342974954750389,49.514881276991218,87.822146995458752,43.87552542379126,92.981123644858599,43.65500726737082,99.642291245982051,52.878775536082685,31.529688953887671,91.623650474939495,64.473417575936764,62.977130170911551,98.528351739514619,58.277856002096087,52.005910058505833,42.546203224919736,68.614841541275382,97.824749669525772,70.970878964290023,58.521901753265411,57.190198265016079,89.114117692224681,77.645052794832736,73.072756610345095,66.279736217111349,56.362775650341064,46.322928944136947,91.402722354978323,60.736348438076675,84.939669708255678,72.364886349532753,62.546799832489341,67.124157194048166,86.978384903632104,83.362961665261537,92.891089546028525,87.906526566948742,60.046698444057256,31.883152318187058,53.403059595730156,37.367706808727235,71.765297264792025,84.34937646612525,93.139356598258018,31.503417957574129,79.144651249516755,81.665792255662382,56.421857404056937,45.53717102156952,81.446914833504707,64.394777249544859,96.787195168435574,49.504480469040573,67.996917564887553,83.855597481597215,67.807408096268773,78.917607788462192,51.777674404438585,99.058357605244964,34.986420185305178,57.913915195968002,42.738632685504854,89.066326837055385,36.509224802721292,64.561838549561799,62.444247356615961,85.095415776595473,30.653275647200644,69.26299259532243,94.051813709083945,95.401437610853463,74.991921277251095,94.204973522573709,30.099333722610027,83.74784073093906,32.126969113014638,46.725013472605497,44.592915365938097,80.938487076200545,61.847630157135427,50.937003663275391,38.908622201997787,89.113019425421953,30.605338222812861,31.361530853901058,80.895572332665324,39.89110644441098,54.788152726832777,66.505290793720633,84.631216165143996,79.827324072830379,60.565964744891971,54.947929114568979,60.558835105039179,32.627820710185915,33.444922622293234,47.857128833420575,33.474233124870807,34.077661889605224,36.377012131270021,69.503909200429916,71.582591994665563,79.580616476014256,46.875883983448148,39.92689651902765,88.895837189629674,49.327100813388824,90.004893657751381,72.618874539621174,97.452853983268142,49.933919755276293,64.222985152155161,66.271348018199205,45.421707252971828,40.764140167739242,45.834604818373919,87.937978156842291,67.575146181043237,67.787374905310571,83.347679399885237,75.994262006133795,54.329700884409249,48.246666120830923,62.286223149858415,87.887878050096333,74.752663203980774,87.316693209577352,94.213523154612631,45.236417928244919,41.310080045368522,84.227063793223351,80.094478589016944,31.660402538254857,70.4417211888358,53.787292570341378,60.330928689800203,48.601220613345504,91.896994896233082,49.960029073990881,57.51362279523164,71.517072163987905,42.528260711114854,54.790320950560272,74.333350900560617,45.167056820355356,73.680038875900209,76.938040240202099,52.955912228208035,34.370879225898534,86.207571972627193,55.950169691350311,99.963449910283089,56.069023506715894,98.668471244163811,98.455172774847597,38.892585870344192,82.742273539770395,46.256810042541474,81.896613643039018,31.654272626619786,98.733191080391407,72.520282627083361,91.687232374679297,37.756652571260929,54.106832323595881,58.522165734320879,57.960576654877514,91.885376633144915,55.736463491339236,68.369294470176101,32.466600795742124,55.830215474124998,70.687008809763938,44.584218903910369,61.579412089195102,60.866029111202806,82.637931364588439,96.933730959426612,34.717200628947467,38.681814118754119,82.193241806235164,62.953427436295897,50.03178374376148,89.982743174768984,47.252848197240382,33.037332873791456,65.739554946776479,78.413760086987168,73.16125376150012,98.528982738498598,35.750037175603211,49.8287527798675,82.566447390709072,39.364635059610009,83.196883909404278,77.96957821585238,50.049953828565776,93.66181883495301,43.43531756196171,72.760828759055585,94.480566061101854,92.998796049505472,42.341356598772109,43.54036238277331,79.26463664509356,82.809720952063799,49.229265167377889,54.238250118214637,78.04784886771813,59.303778908215463,99.353819049429148,40.900388113223016,88.434535535052419,87.330040901433676,72.373374048620462,73.744647118728608,35.689045083709061,81.699229464866221,84.551227281335741,86.357869098428637,92.430726941674948,34.705586114432663,55.777629835065454,96.555322501808405,36.004459531977773,64.830390517599881,94.709775985684246,82.86021345295012,74.618601084221154,81.968354622367769,88.935699127614498,88.179070162586868,52.779076718725264,40.955129263456911,50.903136737179011,62.011610276531428,62.689787875860929,73.267034769523889,48.30224804347381,95.252834514249116,99.568272780161351,88.456176358740777,75.941346525214612,92.679646115284413,97.286877993028611,70.776296469848603,92.919847753364593,70.79227652400732,54.439491545781493,89.844815786927938,39.576981440186501,32.440599305555224,33.189394013024867,91.979406548198313,67.90593525627628,58.54115683818236,39.505753999110311,32.546742344275117,62.671439033001661,82.230356121435761,73.829165485221893,40.838013906031847,88.747239096555859,40.073582855984569,94.051262228749692,72.417133704293519,57.870093428064138,47.81365905655548,79.566790107637644,52.690794279333204,94.226936772465706,58.125364428851753,38.712116868700832,58.446132459212095,94.279115316458046,57.033380072098225,43.396519632078707,72.686127694323659,52.805057640653104,41.682350703049451,73.437913795933127,43.166444781236351,80.335315561387688,36.624020771123469,94.127527442760766,52.623039272148162,47.556364689953625,83.871785206720233,52.589665267150849,46.388260025996715,56.176163649652153,81.825583099853247,45.58350601233542,78.497289090882987,59.47409349726513,87.685474678874016,64.463436738587916,87.95842838473618,63.635721099562943,50.535755327437073,69.946221788413823,51.655846959911287,88.174381332937628,66.612086100503802,45.622757731471211,52.770929504185915,78.53036516578868,88.228975343517959,86.787936124019325,86.720634971279651,87.671159985475242,68.989878646098077,39.013569364324212,48.407482428010553,40.708395051769912,77.639634215738624,59.882416906766593,46.355720323044807,52.493132853414863,61.949775749817491,60.796043572481722,56.919682321604341,89.174668919295073,67.702100581955165,57.970583911519498,99.419260714203119,49.366168722044677,82.865427995566279,61.671203665900975,98.631839680019766,50.798885440453887,46.434784955345094,72.25254918448627,66.999135899823159,98.550266958773136,33.600524060893804,47.292566744145006,82.981283245608211,36.614015062805265,72.138583736959845,67.202901078853756,90.001809413079172,75.575302019715309,99.179399919230491,48.589459529612213,95.063913506455719,37.017152272164822,58.666045123245567,96.376031285617501,30.023902435787022,49.818151374347508,67.861482733860612,72.399444528855383,44.541143591050059,38.423654548823833,45.349850670900196,99.547341887373477,52.806438386905938,54.665083396248519,36.716459025628865,78.999682443682104,82.327356194145977,77.742490521632135,82.395626727957278,75.428351408336312,68.030960038304329,67.265994376502931,53.669262104667723,50.106469406746328,88.263356704264879,30.043967082165182,68.680052522104234,50.345887870062143,97.028018091805279,73.447649264708161,92.498332511167973,72.109248037450016,54.955253256484866,66.019790288992226,68.248132397420704,75.658916865941137,54.267722184304148,99.475029201712459,73.596195105928928,68.802967639639974,85.763727880548686,53.156554014421999,82.211243058554828,75.99068233044818,38.787536257877946,82.788839377462864,87.567580465693027,37.560866149142385,31.760535081848502,41.185602946206927,59.010021516587585,87.064425044227391,81.19852285599336,71.549228697549552,84.696180457249284,32.471777298487723,55.710014160722494,33.873321760911494],"expected":[1.0070374495007577,1.1582955689380532,0.74983378125106037,0.96548419228896043,0.82955184923938718,0.78547211542238204,0.48876009455374964,0.48714058740223198,0.50366104711947879,0.43581408469008343,0.38951775705915459,0.34077264471843532,0.30613970942878987,0.19271442356709031,0.24188141016797388,0.2004961169678785,0.15752515441492157,0.11451566623495917,0.13389915321452164,0.0973502329065081,0.15107111674176177,0.066090311554177189,0.038893943918491609,0.061725546026255719,0.08535992449862316,0.063645681347835339,0.020376591806039564,0.0097189935886664892,0.037214597835405414,0.0073835687439511525,0.022515207575789817,0.048873417960604661,0.06098983524713656,0.073838801378600979,0.006105900206527794,0.015992498837132486,0.028180217642081333,0.0055164141622206127,0.0023570075650870392,0.038604338501520508,0.021931729942291468,0.0079932381546341264,0.0094958749306731528,0.001069351527173062,0.031531535279191135,0.021445596764063379,0.0002924011599872619,0.0001112466961179298,0.0090564776667249221,0.0022208146695550227,0.03250298350223569,0.0052497677281840875,0.00015276671548297084,0.0020732225909063798,0.0015464887089538843,0.00045831933315288495,8.8950789519212669e-05,0.0017910806629287215,0.00092768895020768909,0.00011339348920642718,0.00052547093523826703,0.0013288161207027605,0.022934605514222689,0.00028935108710548502,5.4077705415456948e-05,0.014645635171620144,0.00021538158870187208,4.7869653960093389e-07,8.8448860491658771e-07,5.7704843035765666e-07,4.501989589108785e-06,3.2894257843282601e-05,2.7391838524387359e-05,0.0017877127770394598,1.8411913753090904e-06,0.0027013372448651532,0.00017349296366850648,4.438560025876682e-06,3.170928913851073e-06,1.8914231965284673e-05,7.4616991779264853e-05,4.2559166215828309e-06,0.00010275697762777485,0.0045547876953380816,5.1769688333389907e-06,8.4227027529174835e-07,0.00025955990402293119,0.00093408070863655558,1.7432145875939399e-08,1.0540163647380341e-05,5.2963913924052165e-07,2.8905287552608366e-08,0.0060685868481044425,4.7215474844448659e-07,8.2068224775482654e-08,3.0540350997489349e-06,0.00090016208636045994,1.6594373966836565e-08,6.1189322901574745e-08,2.9949586785742112e-09,3.8737594440718511e-08,1.1839737470462103e-06,0.0012546589724404724,6.176977729575818e-09,5.8494621567816421e-11,2.9443678321107906e-08,0.0044680419850461183,1.5463781208023019e-05,6.5428163926231401e-09,0.001318834371010871,2.7191912714180099e-08,1.3405770218407882e-09,4.7866309578037318e-09,2.0132009591910688e-07,1.8609782807747205e-09,2.9988912802947239e-07,8.2653541669720911e-12,7.7487856932059423e-11,1.9114083439795634e-06,0.0012711814980841862,4.6408115547699311e-05,6.0692294362161063e-12,2.4515046024529722e-06,0.00037794790737408771,3.1568077199603996e-05,2.5323276493377922e-06,0.0010406418255639199,2.9221780876820329e-05,0.00014527231232913342,2.620322884705763e-08,1.0517123890589297e-08,0.0033543979512349839,1.628641392652378e-10,4.900839248569174e-09,4.32633217488721e-08,1.1823852349554395e-10,1.5450092755345133e-06,7.47641953759412e-08,4.7807567397706484e-12,2.0306544443164039e-06,5.2535443281544026e-10,2.9558568090895435e-08,4.9878699712072347e-09,6.0887254256718738e-07,4.8503947536440413e-10,3.6537887443518139e-07,8.0877878308525427e-09,3.8320209961778457e-07,1.5707805842494968e-09,6.2616490684953911e-09,4.8963712396928386e-13,3.0332624581016716e-10,3.5845720469395847e-08,0.00017689198314919875,7.9113238651587815e-09,1.0494618412627114e-12,3.8267018173553314e-09,2.9123142125885149e-12,8.4499071440451338e-10,2.2323084334013075e-09,3.4026751997162623e-08,7.1516863868169646e-07,1.3652764547239125e-07,7.6393045107068914e-08,7.1995894059158385e-11,4.3029838484672477e-10,2.2368065614737198e-12,5.3607019447628953e-12,7.2360911585744052e-12,2.4632186320991925e-13,8.7847672542494723e-12,1.6056222802715854e-10,8.8887615358210024e-11,7.8775215180202035e-16,2.1624541433944603e-05,9.8405695169871379e-08,1.0784020383471902e-12,1.7402652876960351e-12,3.24817530309024e-16,1.3409704044033229e-16,5.907773506434423e-11,4.0837053514858424e-10,7.4043857133204698e-15,3.9380746094808021e-10,5.4502236568907991e-11,1.3204181515613014e-11,3.1136261572977664e-15,4.5939056290881065e-16,6.4995617669815014e-09,2.7127974130826096e-15,4.3908576044788255e-11,1.6024772294385293e-12,3.2243572164540256e-08,1.122781300536511e-11,3.7818003536354215e-06,6.9273789937311981e-10,2.1558049274847199e-08,3.1461128810455644e-16,4.4287708435705831e-11,7.9180712054327882e-06,1.3209612762405069e-15,2.7024311441906254e-18,2.9950029036564314e-13,7.9586471959293216e-12,0.00030738761961137881,0.00016443535880422417,2.120878326658111e-12,5.1142698268756362e-13,1.3659229362028483e-09,8.1842970153399925e-10,6.4337748774110164e-15,8.0675102882024723e-15,3.4435650322625989e-05,2.2812526259801991e-18,1.376584909975494e-13,3.2012996214546847e-06,1.5838302350970517e-17,1.8574904010029295e-08,8.8357678935124038e-14,6.0570375394458678e-14,1.7403562440230658e-07,6.4945392686773668e-10,3.7408828665879261e-11,1.0139601818903122e-13,3.1532757002996806e-17,6.397685564797903e-17,8.1213024796230148e-16,8.7949146862265888e-13,4.6462967511276279e-10,4.1420352754629781e-16,4.4864441179191135e-10,1.2726096127139069e-09,1.9288023289496333e-09,1.1615765998928527e-16,7.8350137257100076e-18,9.5879264079160097e-11,9.0378172092050038e-18,3.5812896194840957e-16,2.4691085441727543e-18,4.3578895244930667e-18,3.6340948683589494e-08,1.9754311100793019e-15,3.415398776474885e-09,2.6383327587940987e-14,8.4671824938312767e-08,2.2979657950948567e-18,1.1734160230981935e-10,3.6184105000756173e-20,5.7690818422561098e-08,9.8269605566548503e-10,8.7855930055019915e-22,1.6476442382685054e-13,2.1250447536647718e-07,1.0517276714800339e-15,3.3797290430596498e-06,3.971658319385814e-17,1.958722774836373e-18,2.8935992792100219e-16,5.1231862379713025e-13,3.5975556718389926e-16,1.8751901920031427e-10,4.1549509464719388e-17,1.5798499500911818e-09,9.6487304997509969e-17,3.8240479076573149e-15,3.6165297748336e-05,2.0062903243012375e-10,1.4512803705229282e-13,4.9654188117909339e-13,5.9927536770151569e-10,2.7867115500430909e-13,3.8239517425132435e-12,2.9629803602130471e-15,1.4378921232874447e-09,3.8668898878637289e-08,3.2686224269926056e-13,5.9486987191071721e-11,2.0992547898837503e-12,7.6305543082234538e-07,5.4279911199496187e-05,2.9995252435457135e-11,7.4405736404117624e-16,1.2367023540697815e-15,5.9508629289471326e-22,1.7499047817569411e-11,5.2777759152715488e-20,6.4347309275091399e-19,2.263839851422157e-12,7.90815520512486e-18,5.5251599131811432e-15,4.6997716125323271e-15,7.5622732742709621e-17,1.0210452049253324e-09,1.3556730477699339e-10,3.5296895654153578e-15,1.4007022865117437e-18,1.6837108138253291e-12,9.0976520832912599e-12,4.6642543388543691e-19,5.0147782370188594e-19,1.6320815232620452e-19,1.6340801823891052e-16,4.9104082477835944e-14,2.1942791597937242e-19,2.119012044963228e-16,8.2672175053824062e-16,4.000678357656251e-25,2.3896274231978987e-09,1.0184723410443477e-10,1.9390576078782164e-09,1.679131883121731e-18,3.692171983314608e-13,3.286107467973592e-15,4.8281397982576312e-13,3.3364388902573975e-22,5.9084712410279813e-14,4.6293487157575561e-13,6.192676025134357e-23,8.5046160007761334e-24,1.3482246687661707e-15,5.6168671066899827e-21,7.0076079608813494e-16,3.0071293071793444e-15,3.8130796546497727e-18,1.420029475966273e-13,1.4861335081080673e-11,9.1026948390678288e-14,9.1113983973271089e-22,9.7574494600030207e-15,5.8022955920429577e-16,3.2095071908898352e-17,8.4047391753363075e-09,1.8015307535739445e-22,6.0555089395598188e-24,5.5643199669654567e-17,3.827767260359242e-13,3.131524049773791e-22,6.7846870481340554e-09,1.2052557523991102e-13,6.3164453493671959e-09,4.1451849543293383e-18,2.106257942789124e-11,8.3184304943877868e-23,9.5825381589683774e-15,1.5282405727923094e-19,2.0456024766555467e-05,1.8926085614300589e-18,7.199954223314791e-12,6.9882017298580922e-14,1.924933138361425e-19,2.4507713573118103e-17,9.8781319431253545e-11,2.3015540448800969e-21,3.8731336577597701e-23,2.2679945837885996e-06,1.4657070197920373e-24,7.9291610066078856e-18,2.942041040619989e-16,3.2120735259133074e-20,3.5937857332009927e-08,3.9818301830588904e-15,1.3236206198505321e-18,1.1674729210868183e-15,4.5402213564774551e-18,2.1438934880897712e-24,3.430113055544909e-17,9.7227336795901724e-23,5.364388815936269e-20,7.4130108380655214e-17,6.4927162111345409e-17,3.0600897316158333e-19,4.4545401248248998e-11,1.6998786662106838e-08,3.7962000855279987e-10,2.2225256922136279e-12,1.3950125398240034e-19,3.6460621554269991e-13,7.7586389740395513e-14,7.7883854094698794e-13,1.9519510181616025e-13,6.186198052688563e-21,9.6840253830290976e-11,5.523401735808771e-28,2.7893326913129344e-25,5.2481398785268059e-17,3.1906021413673813e-16,4.413109447777177e-18,1.5821565011591279e-15,4.9508775566193261e-11,6.0880629944692387e-18,1.3096976089983431e-26,4.0063900433713737e-25,1.3316855839641123e-13,1.7162173300151523e-21,1.2171414536288694e-21,1.5991332424294787e-11,9.6254825055488333e-15,9.9537872158725978e-17,1.0381664060786113e-14,2.7212354167343751e-12,8.2881672359804763e-23,2.7308248090301091e-18,4.3314841824488396e-20,3.3501813771523333e-23,8.2337817735816886e-29,1.2002070492384674e-20,2.7262911159712084e-12,2.8045347242892809e-17,1.0068988462493187e-19,1.7298585967283525e-07,3.204866349613583e-19,6.591806639155963e-23,6.4731579043527751e-09,4.5008807065937869e-19,1.6363254744175532e-17,6.8305152075956009e-08,7.9573518654345296e-14,1.5985528563526171e-14,9.5529592061758689e-20,2.864592857301422e-24,1.308740259639384e-24,1.8168071663656337e-21,6.2991630450773615e-24,1.3285687976515423e-18,1.1858774627461319e-14,2.5933440261007762e-15,1.904128667401428e-18,1.1953942605970292e-15,3.8061205640413535e-16,6.0648824435806336e-22,1.7313092185577088e-07,1.8776344361663395e-22,4.7441240218556354e-11,4.1299397662018709e-27,1.7771943676101703e-17,8.9259048041365272e-08,6.1271615530864748e-16,2.0241075918366947e-22,1.4393577465721315e-15,1.9340996477543097e-13,6.1065824287038775e-23,5.4256812519921602e-15,8.4822155721447824e-13,3.6052474621901558e-23,1.0144051002998396e-11,1.9837512589502791e-23,6.400191757587539e-12,2.7032194978198224e-13,9.7696861568826304e-21,4.7555059809287583e-22,1.6460571116933255e-13,7.5410896297901527e-18,3.6817013089124653e-17,3.8299382871820041e-20,6.3084171392367444e-14,3.8142915020594078e-21,1.9432333675311516e-21,7.1507608223047857e-28,7.3824359456437457e-12,2.1235122689301363e-20,7.3983193997682086e-28,8.2059357136027092e-18,3.1512548306800965e-23,2.095240302945597e-18,4.6428411613715683e-09,3.7140300192893359e-26,3.8664731034821414e-20,1.1378378615124208e-19,4.6951694559184789e-30,8.7331685526410754e-30,1.3762927996723303e-15,1.8716918911892894e-24,9.3494611183975006e-23,6.0587224259398805e-28,1.4802344456676576e-21,7.9253681341937792e-12,7.3076812685864557e-21,3.9979417818163725e-14,2.1961490227671974e-09,1.4894119225331191e-23,1.4155034410090784e-20,3.1410956866367679e-16,1.7366383985503868e-10,4.4730165553834014e-29,4.1534665806517443e-13,2.1650008057223559e-11,7.6327619246039852e-28,4.4119082946300574e-18,4.3239279589267659e-18,1.6153896578990979e-16,9.7954353974387302e-33,1.3133740457186344e-29,1.3432456928624779e-26,4.2640992291557877e-13,6.16428225525154e-11,3.9085351851363425e-18,3.3553851080474791e-29,5.1254703937311038e-22,2.2012328818366597e-24,7.4060103088526918e-26,4.9318479171773532e-21,5.8852973217133739e-22,4.434423766660315e-20,4.4436736027111694e-16,1.72218280314048e-16,1.0556575977076715e-12,1.7656415066435228e-25,4.4536732962527908e-14,1.0026888921835786e-31,2.8388057049679547e-18,1.2685469632990446e-16,3.1499121792666287e-15,1.0931039100228744e-20,7.6758889886220093e-12,3.0099660800746251e-26,2.4070952815305378e-13,9.967933039116811e-13,4.0475433171513005e-27,1.4639840908397943e-31,7.791216470632228e-17,9.6766696996616258e-26,1.3788290602947051e-13,1.014543997791633e-24,4.450937241397815e-28,2.1572142607547875e-15,1.2339635504264661e-21,1.0296720148828111e-14,1.6591025670698029e-23,2.6275362485966216e-22,1.5860199959321374e-30,1.7193773982340139e-25,2.3226513778591135e-18,4.2246660064288873e-31,3.9473845511286078e-28,1.0568007875669087e-32,6.6562293647294505e-15,3.470029004012279e-27,1.7564044732725321e-25,3.9982719894121872e-14,2.2962045785449249e-27,3.1861402679952634e-09,1.5462117934786325e-18,4.8995727563433898e-23,1.0740994015962017e-20,2.8429719095336253e-16,3.4615824814435962e-15,2.6445588908358272e-24,6.5542817530318533e-26,1.0503771484547346e-30,4.4386636362025181e-25,5.4834633763816822e-20,2.4269642166663297e-22,3.114942035997931e-30,9.2311535743712285e-24,3.4755163371098374e-35,5.1828175315710407e-31,7.8570282894913271e-31,7.0568308268332608e-23,4.6947454504411111e-27,1.6485074919377474e-19,2.3993348629012036e-35,4.4888368181134444e-24,9.3962433986481772e-17,2.3841775939010382e-31,4.1772215500069121e-16,1.8729509331187817e-15,1.1660096883347055e-20,2.5813035058251734e-13,1.7822027776372925e-09,3.7326450012084699e-09,5.2809530060356112e-23,6.8659844606712333e-21,3.2229713460795044e-31,3.6716539059889975e-22,3.0713893116501858e-24,1.0408778375819883e-17,1.2600369500739283e-20,1.7327324466234696e-16,5.296379447737054e-28,7.8832464072019832e-18,1.7389325366125885e-30,3.0735500406143541e-08,8.9388210882250643e-16,6.7989446919913924e-18,2.6180904459118748e-25,1.3412431160376076e-14,7.0892479219544751e-18,1.1460244152930038e-33,1.6294095365863399e-26,2.2406088502529099e-29,5.2844567377344789e-22,6.9373274240682932e-32,4.8570539405548779e-23,6.5985492756856283e-19,1.4163863514232654e-19,1.4510853928857964e-16,6.5449742294834921e-19,2.7834634047056579e-29,1.0592344278142017e-11,1.2006727330582296e-28,8.2867108187347292e-18,8.5822170440224756e-29,1.2866698179538586e-19,1.2959776234326881e-17,7.3818085755367222e-24,1.94156575767802e-15,6.1871266308900065e-34,4.8162174506747044e-27,2.199184032657695e-23,1.4605797717664013e-19,1.1058614656330499e-24,4.3210197938001039e-22,9.9521511337345163e-18,2.9455119885696478e-27,2.207049574269554e-37,6.6345018437837824e-14,3.681327687576455e-26,2.9963705133818961e-24,3.4089715890948944e-34,4.9531848701063734e-08,3.0266353014488195e-24,6.1962251736355138e-28,9.9833399664446207e-22,3.8664006850003671e-22,2.338216258778598e-23,9.4081089428180987e-18,1.5921186066956728e-32,3.3723315027298223e-23,4.1964623039626594e-27,2.7774429291033256e-26,2.0359949479260968e-34,2.0041558571241005e-33,1.8681919391765847e-31,1.5012353852276541e-10,2.2242196960480466e-24,1.2669591619430075e-11,1.4933599073665096e-15,2.5470278670727724e-13,3.3819388292678674e-30,2.7902448126707371e-32,1.2344362175121531e-29,4.1124162390335449e-11,8.3613192209211903e-21,5.2483966663511801e-17,1.491242439413929e-25,5.0361830508020936e-22,6.8412489116163602e-32,1.18156160545938e-24,3.4533091649237519e-37,8.3233175060041114e-16,1.0277485430381645e-21,1.4100650242489413e-33,1.6454247516562234e-27,9.3406252076056932e-25,7.0428984719592184e-23,1.0373800125469808e-32,2.3684894189921975e-12,1.4082508419959691e-22,2.7229758651100525e-18,4.7605302211213233e-26,2.6809287735992593e-15,1.8226007936553816e-17,1.4279613633762878e-26,1.6036228275076288e-25,6.5398058037703841e-14,1.1025859720969596e-29,4.149156531132531e-37,1.35689768937668e-29,3.1867086822562052e-31,1.1666012501210893e-37,1.2940640033833038e-14,9.1079112917751643e-28,6.8888006351680764e-16,3.8822098196728776e-22,4.5954808627954884e-21,2.6608331072038862e-26,1.7360065288414965e-27,8.1364346113783598e-23,8.8287883930110589e-19,7.7297087484486732e-36,8.9170511362866347e-16,4.7962517905429809e-17,1.5549177181714428e-25,7.427270879739467e-18,2.3321271555470612e-22,9.7181745571130513e-30,4.0335805858586448e-33,6.5675629141148335e-28,1.3527473981210436e-27,2.4888597430140164e-25,1.5278103681613679e-26,2.5399420285649256e-15,1.5552254741466984e-08,3.12373841500029e-19,2.5477028797832567e-17,1.5059846691313474e-15,3.8083963679779468e-17,7.0353197359137659e-16,2.3118215799109997e-26,3.7348701375573062e-32,2.0711867323404426e-14,4.3972205075349127e-08,8.9690504174835248e-36,1.1220935005085828e-20,1.8132906041954942e-27,7.0582073718182682e-32,6.8153887203707884e-26,1.9378951162528353e-12,3.0205634954597926e-23,6.790409411031752e-30,2.4591569486348978e-19,8.1715587087614761e-19,4.7843858749747425e-21,1.1271074794756524e-27,1.9236359579196711e-27,1.431300071282303e-25,2.3721362258340713e-28,3.3112958068980804e-22,5.0494895321081565e-22,4.7688827484824124e-14,1.363969381678394e-25,5.0023037884506915e-25,1.2550310017414943e-30,1.8006472688440871e-30,3.3276773792163064e-39,4.6291603965706907e-20,1.0394497237258674e-20,3.1934438296815485e-29,4.8530322831748588e-28,5.781378060166625e-16,3.6550990569517158e-31,5.4594871904699363e-17,3.3201016971299287e-17,5.7399776626044681e-09,3.1737726044152981e-15,5.3273371713913976e-24,1.2717457499777982e-14,1.6295582415465077e-32,1.6845390681956611e-15,1.3933047711654967e-26,2.0281688635533964e-25,6.5711925940940575e-13,8.962162464572892e-25,1.0909542132966589e-29,2.3468235979338574e-09,3.889350583690856e-12,2.1673915655994051e-32,2.8613430390472176e-11,1.0744882084458956e-18,3.3583677849531023e-16,4.4707070621135925e-22,2.8137880874269292e-22,1.0429904366448047e-19,1.4563918141595715e-35,1.8854290567902762e-23,9.9963495147354267e-25,5.8598371535398366e-18,6.0612222759339669e-41,1.1451477308038722e-29,1.2963821239095422e-37,1.2923073205190296e-20,6.9977848911680867e-27,1.2537449037957241e-25,8.4535848383122015e-23,1.2194768076037734e-33,5.7961999044088322e-26,8.0409681931831945e-25,2.6500115035261475e-17,1.5143667301616797e-23,4.5859358447199214e-27,6.1263630268685692e-21,7.6674970026076264e-30,1.4024145543516443e-14,8.8396698114313195e-10,1.4489520894486425e-40,4.1392024534503925e-18,4.9495889949772648e-12,8.7521565383095684e-35,1.2028479796911645e-25,1.3460577851787491e-24,5.0743823550048455e-38,2.9157564522095239e-19,1.366249408424106e-16,2.7940805041858433e-31,2.6913170168549099e-32,7.5984641610266537e-33,1.7106860958836985e-40,2.6294781727443405e-18,2.4208779720127064e-25,4.1460372145453405e-30,2.0406618396647463e-21,9.1740022699017334e-22,1.0094056904409922e-22,6.2281075058700448e-26,1.1118777810987087e-27,1.236267543815343e-18,1.2095736012966317e-33,3.109698001903617e-28,4.7101985693452356e-36,3.5105440840029005e-22,4.8639265257002474e-21,1.706776970951912e-15,8.0376253650167422e-34,2.0610059054177719e-24,7.5540480785235449e-27,9.5948932722457387e-33,2.801735720252866e-26,6.167343159497363e-42,1.0433182957138356e-16,6.7592996564401883e-30,2.3831846174783072e-32,3.0867852469280765e-32,9.8374484932092009e-29,4.1512016584789957e-18,1.7632300979123272e-37,1.5012752670846116e-23,3.7527264208079751e-35,1.9105263902555749e-36,4.8395816616395227e-19,4.1913343194217556e-24,1.986065254827207e-39,5.2877853697736419e-09,3.019996063938029e-25,1.0009411856839106e-29,9.1634903469299996e-33,2.5333938769912095e-32,3.1588672931677192e-33,3.5084011580619477e-37,5.6980584639652023e-23,2.8900451533169451e-26,7.0728390494625118e-21,3.8212639940240095e-23,4.5323916686762637e-29,1.3130339000234178e-30,5.8216698507652281e-29,3.4632674465786188e-15,6.3941885550593529e-41,1.8484413564663841e-42,1.0662249879699108e-37,4.8725098976658399e-27,9.2260650090458134e-32,9.8494943949441978e-36,5.9758099320570234e-29,9.2907440885183128e-37,9.1569274853772338e-28,2.1670022375523193e-22,8.2103035980516091e-39,2.7125420146608883e-10,1.6787049708491481e-18,4.5174388652191636e-18,1.2170388854488818e-33,5.4679739229457919e-32,3.463267093178021e-28,2.9872120513459276e-18,3.9579366108161349e-19,7.3142556877058652e-30,8.5569233347699899e-37,1.3670865973796383e-31,7.0352967102820538e-22,2.632120857103262e-38,1.2005796805454361e-14,1.8112269793902463e-27,1.6546630785676991e-28,2.4303747803478608e-29,7.3989324415766435e-24,5.4647214442111411e-30,2.7831080974436042e-24,1.4425749072106947e-31,6.013082211412762e-14,6.9135898960901132e-21,8.6404758147359915e-22,1.3232036817700946e-42,7.0315745972699696e-29,1.0268157217912113e-21,1.6205023688545437e-11,8.7685830050576387e-17,4.9003332393735579e-23,1.0000847648260376e-35,4.5987037206794186e-14,6.2985836890705408e-38,2.9526372422349496e-20,2.6835775485337071e-33,6.8228823565818604e-25,6.4016663598054435e-23,3.4298676225810039e-26,1.447615202049015e-23,1.8588198940324538e-23,2.1864909899480281e-29,3.2092703098663452e-21,5.1084669460978382e-19,5.5554807281085196e-35,1.896756015613624e-30,1.1040119046408976e-36,8.4305633759777591e-11,1.0399931409640265e-16,2.7980547911788664e-30,6.3091544771544738e-14,1.1672805044624787e-34,1.6415177491304859e-18,2.2139361825618517e-12,5.7952200668085262e-12,3.6072122615091796e-09,1.8869582933857254e-24,4.8468265977810063e-13,4.0486471018781809e-40,9.1050882474781932e-37,5.9404597738622848e-37,1.0106596468808864e-20,1.771955125454462e-30,1.2153293825223652e-19,3.7623713231311171e-26,5.4694562856397175e-17,1.5557627313106305e-19,1.0596952637894128e-28,1.547009912126719e-25,2.7401763354540668e-26,2.0234921369999921e-18,5.2630261884062191e-24,6.9596466748350738e-27,4.1726329634378584e-29,5.3698274634667074e-21,4.6984759483646497e-13,1.1894619709262142e-39,2.2635597099313979e-22,9.8268290227444317e-11,1.7116474801263e-30,5.808569322857813e-43,1.0400788424899959e-27,1.7903669350931518e-25,7.9988444262820673e-20,6.2173462786987863e-34,1.963678650053355e-44,2.5574098287750962e-20,3.2842809421276722e-23,1.4500119502725536e-34,1.146996820177844e-17,1.079858110677284e-26,6.2884238172425052e-33,2.908702312939648e-21,2.8514819008465258e-36,7.2178466541679651e-39,1.200757573773815e-20,2.0753922437711551e-39,7.2542078619325032e-19,5.7710724109513735e-30,3.2615369382507104e-42,1.5161004005935401e-12,1.2153080038324708e-21,2.1272823045294289e-32,5.1310630942210078e-36,4.9183174136964068e-23,4.7981541039916897e-22,2.4996563063911044e-18,6.7897411396540563e-33,8.7528151231011603e-29,1.8857868944476745e-19,1.4209887307871822e-20,5.1712325981267061e-33,1.5275716378599197e-33,1.4352276542620549e-36,3.1535124183462036e-40,2.1218075983209905e-36,1.348934440885205e-32,5.8035964070897124e-33,1.2155727656038441e-25,5.66173557994406e-22,2.259579859144758e-41,1.0650380531187601e-09,2.0052433881597366e-31,9.240993543656237e-24,7.1792374315775608e-40,5.2534646982132838e-33,8.501589430478219e-41,5.6339239872135734e-29,5.515280705714134e-25,1.2058380155428105e-33,1.8695179952651692e-25,4.6721693516618672e-33,2.5573921101761663e-27,2.5505438720105605e-45,9.4067040993382481e-37,2.5900482561824293e-35,4.9176093969037862e-34,8.3601957882913519e-27,6.0367255545598412e-22,9.5124804937045384e-31,1.0928572721805196e-20,2.4114493166167648e-39,1.5241996553400467e-31,5.0234010335663288e-19,8.801782546456731e-18,1.6340655291895556e-22,3.6372737429737249e-31,1.8859163834534423e-20,5.0225809922955826e-33,3.8742856419914789e-18,1.3361409239249214e-33,3.6708283926342016e-20,2.3101891860400598e-25,1.9424289513267296e-19]}
},{}],66:[function(require,module,exports){
module.exports={"expected":[0.0001172921420082579,1.8712451170811452e-10,0.013576347518024414,4.8060744659477626e-5,7.320355429837868e-5,0.3635550511594103,0.0009508886259451578,0.0008642906363532737,0.006404179036427038,0.0008698653381960467,0.00011055556414934367,0.003042134818368842,3.5947078637073315e-8,2.8442337706511605e-6,1.4876346698803915e-7,4.447073166421793e-8,2.0452103927666893e-6,6.672551385882621e-9,0.3480638658721525,0.12067031934141947,0.0004497869235407615,4.751628836351162e-6,2.622961423799198e-6,0.0006626466230953972,0.0025646013309183224,0.06101732459027001,6.567270976365092e-5,0.17145174488707657,0.07197283202679253,0.01050448835964527,9.636373012044093e-9,1.7710499190479956e-6,0.00011630987484712972,7.344445868961143e-6,0.0046365967601665736,0.006925035733414816,0.000626017823196905,0.09563242059540927,0.00011370203775295203,3.8456630035345874e-5,5.137768173173164e-7,0.00025038404152584025,0.01490224072083158,0.01714151693645945,0.0015172428892971978,0.6734238685281836,4.930094838178124e-9,3.7399184297033234e-5,0.00042654487382064513,6.118754211911758e-5,0.0009409737725730495,0.20045277254503507,0.0018798304136666544,1.1769272120583933e-6,0.0013602263990012365,1.68057230075635e-7,3.300697648945645e-5,0.00048346122349197186,0.5287395321695739,0.03600735845144714,5.794357728282628e-7,2.963634961989001e-5,0.0004950033128056987,4.039318818611268e-7,0.00015001949218838026,0.1378773526914875,0.00014343878756786673,1.3952632477649941e-7,0.0010367451819303208,1.7552045190468853e-8,0.0006896503706519241,1.1777106641217747e-5,0.3912244821564181,0.0004738727410679425,5.039954385613872e-7,0.0036712061200789626,1.912179609638247e-6,0.09142301766524472,2.797653824004034e-7,4.805222496252688e-8,2.6788828755679607e-6,2.4612385582465205e-5,0.014673694099496933,4.5578283529071914e-5,5.100603901221421e-6,0.0024019179594491485,0.38295314419409127,1.0031365678425684e-7,2.2163658478179394e-5,0.6671189585375287,0.0002545667129204047,0.004360692200181727,0.012663419582852057,0.0061123120321256354,1.7666473389984357e-5,2.1064094588504567e-5,0.022416196593738294,2.8643977860420523e-7,3.5360171439337485e-5,1.070627033299093e-6,6.876443644223369e-5,1.7823783243706182e-5,0.026988480528285837,0.0001588475739691828,5.420805134648177e-10,6.37657579786936e-5,5.596074022028098e-6,7.24021598878587e-7,0.00047494700241431065,0.7008781544719582,2.959748604833626e-5,0.7379676066724175,7.215180431333698e-5,1.126477631656175e-5,0.00577292296354198,0.008047848680065615,0.03054407208682569,1.6407738566098902e-8,1.0697082171575708e-7,0.06392308602078704,7.45443293735825e-6,1.1967791338095045e-5,0.013137874106049123,1.4908616666549715e-5,0.0008014434934093502,4.6956552669845216e-6,0.05139782516588412,0.004455225307128552,0.0013736049717183404,0.019734001672455724,1.7018584515632413e-8,0.0032505422618250607,3.5836281246189844e-5,2.1974351189821663e-5,1.3174215871393864e-7,3.2086470922565006e-5,0.6804746245518668,0.21936881148549214,0.585299981114849,1.4991851472969973e-6,2.1820311511592774e-5,5.351990517016222e-9,0.0004314116877724296,0.008399436358010581,0.12207727675888372,0.7752212539435072,1.2831699709378301e-5,0.0017920803875491615,0.11911684038056979,0.04792732554032233,2.503708109328052e-6,1.156208496227577e-8,0.0010939269968212734,2.3271245414058204e-6,0.44099466714789554,0.00021583038800424386,0.0009848090925775772,0.008008414833267573,0.052186193343329,0.716941483059195,8.545200127051062e-7,2.7879686768772133e-6,0.01344340157847268,0.15818734393398212,2.7811436200142644e-7,5.285303712280901e-5,1.8095069578077117e-5,2.16565383333998e-6,0.0021371325065638273,1.1922315725630426e-5,6.103605208103189e-5,0.033426864282519425,1.5872002717133185e-6,0.0009733514167793649,0.48401161176805213,0.0915394548232804,4.029798842906952e-6,0.00037001821751228353,0.23136725463494412,3.01448012609938e-5,6.667993851603316e-6,0.004294848011526155,0.0009346102218581876,0.01194720655124249,7.90820425659462e-5,3.372434865189502e-8,3.4036026749678506e-5,0.06741387176290568,0.0035024766282151687,0.0041674156665401415,0.08371619469519205,0.030851111073495495,0.0001896117045374592,1.1328510449559292e-5,2.107481216408122e-8,6.700946252354533e-6,0.7845060532857818,0.00015359830144654607,6.403895687834648e-8,0.48319267320601206,0.014989027772276467,0.0010903072562480137,0.0012168809606510715,0.6937711467186723,1.9245923558839593e-5,9.490827285683949e-9,0.0035403005632689156,0.003341797571698465,0.0051995044751292985,0.0030457461676471212,5.028211947115183e-6,0.3472064736393701,1.0883460090106475e-5,4.107910441456693e-5,0.39521935790386503,2.4934561765713973e-7,0.6710923405498436,0.009596936920147457,4.8498270895564344e-5,0.7426890153401656,0.0009595703368824487,0.0005878427137367961,0.01630564548381865,0.07426532989648728,9.280046225671003e-7,4.764553124278496e-8,0.0035907078391800317,4.167487785413052e-5,0.0136312900607637,5.296119828623904e-6,0.0022241279308377795,0.2834784262241836,4.7214020260440595e-5,0.0005319202179596655,1.1727357313604204e-8,0.20715384739581547,1.0630467894324271e-5,0.00046609173716706504,4.6886679163625144e-5,5.5242306507625804e-8,1.998770017623786e-8,0.0011249000357625707,0.0032810749729664697,2.9181525228974007e-6,0.02946189510178201,0.0005330624712366406,9.435074391129607e-8,9.611283762490744e-6,0.024898806662584587,0.0001907147106915415,0.013489168367082392,0.005655627302805767,0.10318972703316755,3.557002644594176e-7,0.0004348702030545196,0.022741523233900163,2.6794968228136584e-5,0.00015316849203307845,0.00020575609642341222,0.7267828325983049,0.0022751420992941454,0.2743384078381817,6.0962661462823015e-5,0.027038795005757784,8.220216624895531e-5,0.0002211683568027197,0.0064187854495438654,1.9624701574995464e-9,0.012397907656127949,3.680949680850378e-6,2.1999937851943067e-6,0.1371298633068912,1.3940644231739396e-8,9.393050861851019e-8,6.575403594900389e-7,0.00018598816344388635,4.1050853187310743e-7,1.1248168428122437e-6,9.60125919910047e-6,4.039334687019735e-5,0.001901902283683604,8.417104592535552e-5,0.005540365772294126,0.0017248493088231399,0.6107631825853876,0.0027500864945379355,1.587722671451706e-5,0.039874879069477044,9.465451801807168e-6,0.003539925443779371,1.928537573199716e-5,0.0024312514428671446,0.1939254860283448,8.71865092315443e-6,0.0022418237954072574,5.2114634326325335e-8,5.482346889039188e-6,0.0008037380729336978,0.08545199483068462,0.00748076106283132,0.43489967846643285,0.0003448569962183642,0.0004727788660613591,1.0261466033202757e-5,2.7839940860475254e-7,2.2588457687900286e-5,1.8944202795634296e-5,0.0005339815314244559,0.005148526035746959,0.003847565567455241,3.191481854218207e-6,0.0017050719830291822,0.892488640606471,0.005588322753251384,0.0015950627881440415,0.0005420993726230249,9.717173729537461e-5,0.00025088553662622876,0.0030461504914467484,3.874827990920936e-7,4.781386182805115e-6,0.0021196508043586017,9.049747840809627e-8,0.1716484033090601,4.174791502365616e-6,0.005130570877813155,0.26969810896481766,5.2087475512982205e-5,8.757451094470953e-5,4.563625703069424e-5,6.786813213805174e-6,2.7560381012764688e-5,0.7780893285497653,0.006212332319450347,0.0001447157274120695,4.204909316850135e-5,2.1253143205136353e-8,0.038877205330756816,4.164195118623444e-6,0.006015109673496302,0.0024346762903895416,9.764939777912545e-6,0.022918926652981203,0.010316052511975997,0.03447878752376504,0.6478221093342205,2.762854127137559e-6,0.48939564444584976,1.2853918105310614e-5,7.153939927067177e-6,0.0006572072379327252,0.005067299719127935,1.8788469957481944e-7,1.656663651917573e-5,0.7716943738118264,2.525794699708948e-5,0.13114303436857458,0.0041963676572649945,0.0006321430226495281,6.250696286086015e-8,9.90863820567316e-5,0.046705522243742734,0.08050546463706552,0.003960000503411808,2.327599111920542e-6,8.804746755699175e-6,1.0004734935581782e-7,2.3000957946910362e-7,3.475046500517189e-9,0.00039504258556976614,1.7355664106022136e-7,7.736578040027271e-5,2.509329765411901e-8,2.864456992296818e-7,0.035264514817539366,5.368355479253568e-8,0.0009154943316189579,1.4120401216790743e-6,9.765489364105937e-6,0.007610072003840181,0.009511853309053164,1.992873003128943e-7,1.8594198756492629e-7,6.0256760539400975e-5,3.6758477531979796e-5,2.814642258437852e-5,0.015411515651335708,1.3890446555910308e-6,0.03490521531250496,0.017493760416512814,0.0026529151964452017,2.158013118059951e-7,3.959288656568159e-7,0.09352077604646515,4.493379968478158e-6,0.00027871838583412855,7.853133539018112e-7,4.852556401745534e-5,7.398677036110818e-5,2.7755428400950017e-5,0.00011963931347606062,8.266753891678944e-7,3.1129823416357986e-5,2.8271339633404344e-7,0.0055025446547012045,3.1066860041721483e-7,0.00025384834240781894,0.21082827626003195,1.1846527331486382e-8,0.0005127823487191609,0.007414381536523241,0.09187572388865971,0.0002734999783304293,0.00010111186295751887,0.00010942541781597933,0.0017227838198359535,0.0019246118882512411,0.0007327705794801462,0.02263769284684154,0.000263591757500093,3.4562058995186334e-10,0.007943094907191101,0.0007602080549219934,0.7109977307091538,0.004380111266893883,1.768902157212932e-7,0.0007259256340988261,1.163893032006707e-9,0.21965372543126593,4.266586162925017e-6,8.016441581943167e-6,0.022002918234262554,5.038505699912136e-7,0.02509379265276681,0.0002324472479252626,0.0029463287473358276,0.001603966132639018,0.006635446207995987,0.000556871681011996,7.503384274411199e-7,3.31282569783803e-8,1.530934846067411e-7,1.7129401505310273e-8,0.24841815009374574,3.8000960286815776e-6,0.05759638451764994,0.00412043282714719,0.546658929639997,0.0002963024853882397,0.05317881526432418,0.007722704013682837,0.5972692040537289,0.0003011756557160168,4.366112211516607e-7,0.008185059577854259,0.004412620398681757,2.8150828654036264e-6,0.00306822873683528,6.484689846253463e-7,1.3422184813347944e-5,0.0004212550199774151,7.41727655908608e-6,0.038626846935089006,0.05941546526336749,1.5619674512044774e-5,0.0009187880164576852,0.003171781357172811,4.355334320652939e-7,0.3271297213328808,0.00024221735979438813,3.267733817653946e-5,1.568924421679762e-6,0.00011490582514737775,9.166690225567582e-7,0.01008688942925476,0.44501592095602005,0.1375105535247858,0.001381938539354114,4.732799921662586e-9,6.498768767132974e-7,2.9511723719862643e-5,1.8099581941517233e-6,5.0890977107892064e-8,0.00018125999904889105,1.9490107187403204e-7,2.2896437209851037e-7,0.005574445916417497,2.0268933637202236e-9,0.000900498732816776,6.35658312409242e-6,0.01739109988108015,0.21758432977881836,0.0007138325340317548,2.757344198673546e-5,0.009225482169075266,0.00010646454415537048,0.0012957743669517255,0.00462232340585064,0.0008634090041157652,1.2255280788697298e-6,1.3549597917902325e-5,3.763560713032932e-5,0.2916343724399288,0.00046175051085613943,0.10785944774165737,6.664200518444509e-6,0.0016709890078278368,0.0007210319292171859,1.8686148671754076e-7,0.0060935555110440045,0.004724768185893156,1.2298791000123033e-5,0.0005247621932241627,0.23822585583021846,2.615861418830756e-7,2.001775424213863e-5,0.566065791846689,0.6686929988006641,0.0014662109212391537,0.0001829232358597281,4.410118653400671e-6,1.9139979629820092e-7,1.6968420461822243e-8,0.0006153729415331211,0.0007683879692590581,0.007300045222397691,0.10422089079252139,0.06573440730043419,0.002065093479342817,1.3302603670411579e-6,0.6543317159093871,0.00013994542453999863,1.7156592010954606,1.5791268582708823e-5,1.6112953240453847e-5,0.007502673048393125,0.6484884144789971,2.13240233958407e-7,3.6988809887546606e-7,0.13401745551046368,1.1536123978529777e-7,0.004617436114315414,1.6332980794473982e-7,0.6322872644250447,5.344640287248178e-7,4.131061672331845e-7,0.021045958681683324,0.00011212329588279125,2.6798910537630417e-7,6.560534150335997e-6,5.121424472984811e-7,4.8652039019898703e-8,0.0011027158208999003,0.00019891796501079724,4.3304725653463727e-7,3.940333831977241e-6,1.3915228312768741e-8,3.939808100145438e-7,2.2665274213273298e-5,0.00020559329195742816,0.00021733219937941523,1.4199644646876453e-6,0.0003276601963170022,8.943557359387293e-5,0.0005779283576198574,2.0200043961864222e-5,0.0008165768459133983,0.2119418374806356,3.0859549718365704e-6,0.00021919055562532214,0.00035883089708003925,2.8219060946675426e-5,5.924229819790743e-7,0.20982956733284583,8.173088374685123e-8,0.00025704599061688487,1.0179992219226159e-6,1.941097818550659e-5,7.5332297038199e-9,0.00576040097748026,0.011830924850583287,0.0037288902926472184,1.3619580882880783e-6,0.006572162915518784,5.509882335304355e-6,0.1585596439022499,3.6531074032299085e-6,6.823860411809099e-8,4.352486463387351e-7,2.3934217290477606e-6,0.007231021780569977,1.1599077709451302e-7,0.08406489036851064,4.5706369425433567e-7,0.004911130025471091,0.6922788065078358,0.01806192762569721,3.6406619445639974e-7,0.002098761620458996,9.905925321470075e-6,0.00011587688625014655,0.004584088070667333,7.828243248892547e-5,0.005393474299594612,0.0004011157896325607,1.436003282029409e-5,0.0330699665558678,0.009332738122599276,1.7072063514040813e-5,9.260393924813009e-5,0.0004554982785061987,0.0001638802496984918,0.7103662070212099,1.3629265255590428e-7,0.00020415710167669972,4.095980567011663e-7,0.007174650582236619,7.13750950876142e-6,3.0719048204850643e-6,1.1121498431449483e-7,3.842202474090471e-8,0.1961315587726188,2.123539415470373e-6,5.365240326197974e-6,1.327541113170963e-6,0.0011474798638790367,1.7607465260460794e-6,9.06767277574265e-5,0.001017113269191804,0.044270177699092424,5.246961358601353e-9,0.0008492555193424916,3.819176042960274e-6,6.478740584739526e-5,6.904032021637991e-6,3.946433342385162e-5,8.505485925050223e-5,0.21462451586922437,0.0005486796382771806,0.03515716479230423,0.004500014022618122,0.006153448173065423,0.04041612390488511,2.2497370253370174e-7,0.0003503859314589357,1.4870441978661001e-6,2.2185428805748673e-7,9.526688321426119e-5,8.748786718514072e-8,1.105444497905694e-6,0.06513707288595419,0.0012116021406747865,0.7225910608623379,4.5695301126574695e-6,3.764784903068241e-9,5.704225467157489e-5,1.7998758906097552e-6,0.0020983758467306404,0.08368536750690084,0.002780994723988466,0.7826445568854047,0.0008111507680369397,0.0009955340675449939,3.438196006386898e-9,0.00966541399586181,0.0002567166319730991,5.165267010310858e-7,0.004365914359137871,0.0007162025184638179,1.7228354659936932e-5,0.09857631779344403,0.0007443486919095981,3.0334117605116016e-5,1.749642318697979e-7,0.6396975645122528,0.27419107643729645,5.888769889265379e-9,1.0020494362811428e-5,0.7590734860788573,0.24741089696779558,2.5271419163815503e-8,5.0729086559843604e-5,0.0024832590181816674,0.00998426580289115,0.008078343470433756,0.01729229988046724,2.1248911435823025e-5,0.07989403296604242,0.10022135691479865,0.6778715194494508,1.3539229881036142e-6,2.790574870081096e-7,3.74370454356147e-9,0.0059988974549064905,0.05394136417191173,0.00024017228903770477,0.00010592240410763498,3.124711923447306e-7,2.00367371307136e-5,0.009638009388580232,0.0002599556052929961,5.964095838041608e-5,0.0507010789101604,0.00046422044406094415,1.1231954884729782e-5,9.43615158769416e-6,0.0006897179373526522,0.009284119029142576,1.2571539999099895e-5,0.3126652874569172,0.5142618848992407,0.008867707182300405,0.1579718270022628,1.514361906214871e-6,0.0004195333989504788,0.17747792827201048,1.6965293835575728e-5,5.284087866002193e-5,0.0025518651591181904,8.224579127824906e-5,1.1360842720003551e-5,0.00039950527298070117,2.6717433844290532e-8,4.468777853203715e-5,0.2952246377342538,0.00012844995019217992,2.7076494519719606e-7,2.610663268850376e-6,0.0004498063357822948,0.030692938407234603,4.8483097688638425e-5,0.001694726744405162,2.633790588250217e-5,0.0076695569819973846,6.274442326532122e-6,0.0017529124532078583,0.0009099610573092255,6.233054543766419e-6,2.105622527177055e-5,0.014237785661658143,1.5018670037952163e-7,0.001705095850611719,0.0002495941931986149,4.514105635363768e-6,0.689172094716745,1.5578933074495387,7.232575833360937e-6,0.6292918956722808,9.487237196114505e-9,2.5261360111255173e-8,0.000121044165251778,4.927394135076395e-7,1.4937255831299614e-5,0.00201947725173548,1.8544325587397247e-5,0.43012951526818527,0.029640649440141362,0.012931290626391657,0.00022887226066281222,0.010451893377036732,0.35718560149355866,9.564266693866154e-8,0.0016725661672956941,1.1230924776543262e-6,9.779065535620611e-5,7.621442332096818e-5,2.2434761900401227e-6,6.955342986551608e-7,0.016916966105010145,1.106674488487609e-5,0.7196564004644461,4.634718553854937e-5,0.003455156105605282,0.13886837481905193,2.3463163789061577e-7,0.010030235127408181,0.0015302362367670655,1.3484679357608117e-5,0.5836560460933786,6.325994051384232e-7,0.011239577681664737,2.2423737725750652e-8,0.0017116250876733272,0.0016760063322603497,1.8925861158200667e-5,0.0006084990262832117,0.0005809778837943962,0.00444166088127521,0.24866624702537188,8.023890301363712e-5,0.0008670447531919105,0.7611578208461027,0.0005011646897341083,7.569021585165127e-6,3.736762397829725e-5,0.11539303052551998,1.4724962630144843e-8,0.002704041011141305,1.255681564439012e-5,7.738603675975109e-8,9.372212983066508e-7,7.00083373264175e-5,4.441206265638534e-9,0.00047138260874271553,1.5881065355969693e-6,1.228321045293945e-5,0.08754557235001159,0.006293424496149651,1.2332790836637766e-7,0.022090743779655243,9.56155664461482e-7,0.0033063540725933953,2.3414719713638396e-6,0.003932892349228278,0.0004621990946332176,6.279384868860505e-7,1.9742906545159285e-5,8.813549755941657e-8,0.003944579576195269,0.020209413045130898,0.001060071957190002,0.00825754664520479,3.846767075842238e-5,0.04936698831816679,0.00025369187204154814,0.0012510070585585874,4.4338362467896573e-5,1.592613975866885e-5,2.9788716093541506e-8,5.032142422745528e-6,5.670537903577607e-9,1.3666891553599755e-5,4.505639344267537e-6,0.00522757755486313,4.919405074225683e-8,0.2550728721286915,0.5802026578905762,0.0004479840857083528,0.005256353451630139,0.2520730921942384,0.00022810706022222352,7.26151535877027e-5,0.00019800047984028856,0.0068162326179568725,1.04866713574429e-6,0.09112725127589827,0.0031887522916076915,1.1076765424894159e-5,0.001203004328956891,0.0002834114483958523,0.0005855705464395302,0.23604020015755187,5.956291532613271e-6,0.0018432539243041157,0.00027498656728635826,5.980539303155214e-7,3.877887918756186e-6,1.3847714952884692e-5,0.25879115806314185,3.553791121920589e-5,8.469581648084694e-6,0.0025475613701640256,0.0006032790718921305,0.0018827150794658684,0.0008500611860321836,0.005173279284788804,0.0001425564596139829,3.43926347798627e-8,1.6227283848393186e-6,6.834682077803869e-5,0.019005587104244343,0.002824297773564458,4.6086049112059737e-7,3.427739672087825e-6,2.349934827278581e-5,0.0022538239599201077,1.3198155486897088e-5,0.04378836818044918,1.4778185608164975e-9,0.012690237657596736,2.73473199972267e-5,0.009988114753921805,0.00011199616554999787,8.850260111378975e-5,0.0025685161702953003,2.972465988043794e-6,7.947573875918642e-7,2.1866556554600413e-6,1.0066033490492183e-6,1.0492423049642255e-7,5.8348299739233757e-5,5.857036982497127e-5,0.02943874013343301,3.617798319262337e-6,0.0029908614068593475,0.007815571484542417,0.0034612686653417352,4.5219875835383585e-6,0.077909721018032,0.05839563919350801,0.04871051153112642,0.21157016033282317,0.00013051895613010864,0.7072629497990033,2.3029284981639525e-7,5.226593791255398e-8,8.161989188465144e-7,1.0689627293906254e-5,3.947667624456551e-7,0.19245776015458405,0.005208878385685421,0.01692242116820533,0.00048818323051717246,2.7652606135713382e-8,0.012002177073566756,0.00019201831601423398,0.00699175354534602,0.10766461962460001,0.0008361715625220364,0.7666999236217535,0.0003993115012171594,0.0017427868322275003,0.09068006136692824,7.367833328458439e-5,0.030513719700865014,0.10512810441859353,0.0006549686953826618,1.1696574413068926e-6,5.1579256339002415e-5,0.000931744967095626,2.4836233150092247e-5,0.014479882895074505,7.37128544262049e-6,6.640785853758219e-8,0.376346586016176,0.01712761380752074,0.7096893851895294,7.848306454549337e-8,0.00037780164833167164,5.262941692659464e-5,0.008818104109692708,0.00013066604063762715,0.4965036019215334,0.00013812151686850606,0.002177465783323979,5.358918034443218e-5,0.0003702477516416804,0.014020018073326104,3.698352254350471e-5,0.504647857877485,0.0008976615854894073,3.6416178509564986e-6,1.49308350448008e-7,0.009934532534960475,5.926083981207031e-6,0.5347942059128756,0.00019659250992984698,3.668899636341162e-6,0.03653518929283548,1.2175354080322006e-5,0.00011423209543943846,9.483649779870013e-5,4.080645586663254e-7,0.015676909715487013,0.0008466960529149367,2.968187628707614e-5,0.06546470427963143,0.002354509947847759,8.028967913786919e-7,6.616519593027163e-6,0.15074700670103064,0.23872590988075307,1.801343922919694e-5,0.04045268654416211,0.00031217624888594213,0.7120225922456992,1.9328893441635405e-6,0.0010789276343232735,6.365847872751456e-5,0.00035442555395311565,0.00043781769787532633,1.118402816325623e-6,2.6815602487521258e-5,0.0009273920235631854,2.097151947549824e-6,1.671518790585946e-5,0.00012960825836429916,4.614551298954264e-5,0.12697482128914112,5.705647453892497e-6,8.446657344782182e-8,0.00010022994241857945,0.00017986420360320186,0.023993619933519447,0.0015700471903474403,9.015640345902856e-6,0.0021864391125895138,0.0010269380517748357,1.4617456444180594e-8,1.2466629591807698e-5],"d1":[4.0595553105558295,9.397419523609823,1.120671931517303,2.573778025412843,6.1052909563533,3.954573180166714,8.626723690903166,1.126438687827196,1.7316687314486257,1.0662401371623242,9.608880887447494,0.4196356194726336,9.153494287573258,4.7993587772282,9.66337770589005,7.457393049259955,5.166535570200425,9.621424880858463,4.978272841922178,7.991834219247296,0.5823412659342919,7.563465573956655,2.951722359805593,4.877788297418166,0.010641594239086949,1.833866306341505,7.196213568219989,7.1455547518091915,6.871746142865927,3.8684064845766075,6.523825952515208,9.827406988557597,7.007665736158392,8.969360899233529,1.0161915066113902,3.6343598295501556,8.238306893744994,5.61385850849355,0.8439763701816982,5.22385960512098,2.7120357462525435,6.375868459284153,8.058526530186116,1.4977261971010214,8.161387791308359,8.856791159946898,9.772189350567992,1.234083806801256,1.2442188417075317,2.4533329403050574,6.438789890231176,5.195902475181691,0.24698053562431266,4.279682222969998,0.21468058407390522,6.23114768120076,5.418701848742497,1.0019697166229014,0.6682273994243415,2.233240416527018,4.014055220106116,6.601368611611845,1.9124382377444138,8.048038360121964,1.1345691664682245,0.7404068978470657,5.4096894952130725,8.569038160641343,3.8612855555383185,6.170688987168611,4.052702323395092,3.6110874549813166,7.766889971683546,2.2104195099992197,4.8846618721255535,1.7343853503057494,6.880090270900412,1.2182309693355764,8.260175780467824,6.708974622970625,5.918601688409071,4.947025942074874,9.767475776994,8.31756116494855,4.169979272461393,0.35422823749118315,9.357453970342867,9.420467746009283,3.931327013718262,7.673839166251892,9.724249583879992,1.164183091561748,8.967830114545913,4.749826136164533,3.965196676706151,2.834034600075903,6.782226312747611,5.441122655162278,3.922089789568295,4.658163240199986,9.001429994891652,5.375945879673843,0.7166003562677203,5.364906402295855,8.089677647277139,3.0474604319573717,4.932468762301021,8.553953975512716,7.641604302812272,3.843675396330488,4.362850969978558,9.898946899929303,2.419920421526136,4.675627307226826,1.589907215076365,6.664316248385402,7.438340098405858,8.324538209530491,4.718486462625444,2.8469137000966938,6.158008534409268,3.6326577998918053,1.4532349880939988,8.280309057005478,0.029067853131692356,4.769183338592809,7.101723027162549,3.589752215619346,0.0773523389217523,1.0998462907176232,9.678573464658475,5.021906639165286,3.395707099747378,3.1119482722354475,3.8872805853880887,9.389267592042254,4.60495570849001,4.579987971725075,7.269984990902321,2.7766720559060754,8.032852981440113,9.476885916150994,2.2703228712141432,1.4136846166038897,0.4733712554516756,6.973903170259685,3.7076153020379543,6.435878552345644,1.3669447713616534,1.695320035640866,6.117346900622627,7.803498952683972,0.299760612916804,3.8458039737818472,4.230245287283418,0.9420484381042638,0.23468218514762773,6.350931377055931,7.301605031042346,0.997299900612858,6.1536747227018695,6.064301665437483,5.146945427111458,1.0449572389331974,7.130056546954815,2.699310210453918,8.166034506832144,3.6201152165773465,0.802753221876249,4.006378320747997,9.030994289527655,6.191083333479199,5.743310206221059,9.358079849414231,1.236687528363809,9.816261672789839,3.8543249559090564,2.145904000212866,0.365105723838377,8.056180148662387,5.2301153194785694,0.7686858366586979,4.91746101926791,3.6663424756537055,9.327216948380137,5.604757348380334,2.5840166340867876,1.9867919008442692,0.9628056414476527,1.9375655821630322,1.069431858652714,6.6054114451094526,5.613913923453691,4.776827229724034,8.133599428943954,8.317230335117195,7.500337860274524,7.8711285363311685,8.129040054968364,3.290134327661698,0.071209186989305,9.456466207106589,2.5234185163033263,6.4901880375930325,8.991649381211278,7.022778879636351,8.640673220294426,0.4299560328291263,9.72259710974704,0.4992016176928282,3.014577842342989,3.6620628352354467,2.2453901212308724,8.072726457299668,7.254492140426832,7.070868791101788,4.707212717532244,9.646281641222338,7.053102975827448,8.045359439882485,9.53560710056929,9.009515726857142,3.1013393459307648,2.6878963927490873,5.959498005802306,7.2661926528450245,5.176073808568338,2.997490557428384,9.415823039502449,6.337988673094879,5.606899838767667,9.227644562982562,9.809140718324041,3.392328395403703,6.886071287819522,7.859890219435471,9.009596455864429,5.146113139580364,5.339213652915296,4.237465332019889,7.757706980831546,6.951012878649614,9.17015847514904,8.014497265989299,9.66830036144184,2.7471627819237243,8.186970714600621,9.547121780166352,0.21178875784117812,5.081605873742571,3.0247896639833716,0.3418329059762071,0.7924288072192964,5.291727887581581,4.89132529637887,5.046603046236351,2.006804697371687,8.12249301739141,0.8047124323017352,9.149504800216645,0.04358676872561418,5.119498174029513,4.859018357969928,6.942512738568802,9.59050321465446,0.9265915160021088,1.2252543391590676,7.996110611255858,4.870490048894435,7.517312047273881,1.8303248720317522,4.679659737672939,7.710506888907595,9.910557566772422,7.508337525951485,3.003403297214755,5.252941660026947,6.0673221524436,7.165753249346041,8.494868719651489,8.559898079345427,3.718808353597667,0.519793666855275,6.390671195527792,5.791936538392313,4.046200361911392,3.617389100210877,1.2607948406508718,3.046691774192727,3.202370874687508,5.745532012566548,4.002725542429966,2.128660920740897,4.3731242062205204,0.38583256708208724,6.8253920747675885,4.456476256582651,6.303875106473171,1.2997765566693498,3.5491450059107277,3.8655496614592266,2.461864575781909,0.46290502183230053,2.6851956671423993,7.938005155788632,4.5205878759907066,9.93660253014365,8.287928591926232,4.974769564788124,9.060899348174393,7.427705526256705,0.22961755979072462,2.0826600216532287,5.624649892354667,0.07934396192712301,0.8885795375140115,6.957354038706618,4.286865299194047,0.06010541664239977,9.285472881347934,7.900737800124331,0.15418669128651752,6.736454245027483,4.925483466629139,3.871110711413932,0.29894400444407054,9.78778072131277,1.1357356083251635,5.993984510157944,8.632458965229699,1.6738868872205481,1.6429346709030024,8.473435336132809,0.08147353079781983,5.467348211909728,1.0333138108060003,9.111512072568733,8.686407217524994,6.619256140487804,4.05384725901091,6.6783192176574495,9.501475988360784,2.8016956635605617,0.9387473262736479,1.4007412203690928,4.545636006572145,9.809665329216365,3.752861112824073,8.04264272409319,6.892513863010851,6.810435525460683,1.1539769929632993,8.802398490247343,5.336677719044185,6.8793641067401285,1.8136255065458107,4.145670075549743,4.605178116538289,8.875532735978659,4.334583777298022,8.03699479280796,3.1505851477142777,3.905323263527467,1.807196437251568,3.5867567664880173,5.691229162248288,8.89172063722883,8.807957409224318,6.959727662032225,2.820877021862409,9.68865192375459,1.334734791345984,9.536746255894172,4.776559242026039,2.240375077696024,6.431520681134424,2.121019117766203,7.374908097572006,4.260636701905149,0.37783764184135205,2.215363584944199,7.646160688775856,7.307350889044297,3.3324592870365777,5.575904236292875,4.768047735850507,0.18727960711202973,6.569077232037515,1.985006132691991,9.101867292786048,9.619851623710481,6.299622728675891,9.557446958729201,6.5269708660172725,8.721863557573602,1.2238016718392886,3.3562826955424874,3.0616891123247125,3.8228423389511335,9.22021952630254,1.456822450338917,8.783860752406786,9.203795427293624,4.467254709326425,2.3240483957322455,6.325545611195505,2.2395232966306566,7.10047052247832,9.527715940963382,5.338565781439217,2.950605037931875,7.20592335367815,3.9531225964021877,1.1234234933185117,9.32537767952487,7.699210266727934,5.238014528650448,3.2422644621258745,1.0794351095970423,8.532548605505546,9.21811771067409,0.1683847273835526,2.962073148261384,4.7963876382165305,1.1135178602207207,7.693372655337633,5.375359629041809,9.83130453664656,7.5077456223979695,4.735248061153648,6.575819358436441,9.219593860885542,8.288351874059877,2.2678075496887007,8.983530769508903,9.324312316773163,9.633458631092344,2.3211389679346595,1.461446299751521,5.501700570363655,6.803713079645187,4.276749705777039,4.581692188500948,8.970171009396836,6.841394744288156,1.706810771901992,6.334950646260664,5.9328408124487915,1.4049167164452703,1.575614448075806,7.034181208181396,5.062299828090846,7.819674073987026,6.546001747809418,5.0106802666821215,6.107505230126624,5.720675874907368,8.949121959712276,6.8361273023245435,7.880257874471857,3.686376436381036,4.660544068947468,4.815102852547486,5.2421191282607165,9.606030310234656,0.6730714224778755,4.875228548010795,5.811963752327658,6.1302408442467815,8.828058975471013,2.3610346307717123,4.663117228855751,2.254646044797912,4.7299977662498165,0.5798613207903869,5.399391515811405,4.173351076348208,8.025337102788928,8.141914471085695,6.780874541203019,6.802777450494255,5.1954554283371435,7.601196660391018,9.751922374496074,7.365945107518536,4.423851710331559,3.9505005851704067,7.638619042558911,0.5842086961849646,4.777615809679048,5.793645091675903,0.935582879340835,0.5328553498064981,2.827034799295023,0.8294381897766345,2.176559141708634,1.9948646171186613,4.079438369078163,2.847730074854513,7.672978614276779,7.096275538444878,8.118925899545195,6.986193480537624,5.935190702030826,2.8507194947743075,5.670266672473582,1.6982785245109033,0.8837746207920438,9.889160763848789,2.5592262662038334,0.9204581889911134,7.441079617542103,0.5913470581534086,6.214633597732386,4.031196571614714,2.191677863070829,3.193480772772608,2.741551610513564,1.8401587447932855,2.1481260699040106,2.7091112619244595,4.681363209870435,8.351756957335056,1.826003182572129,0.0400252937275658,0.1148044176042462,1.069132170739655,0.47415715853121876,6.45042969564294,5.9197801954701434,2.3932471900191077,4.646732683079351,1.370168744254383,6.1728888583364805,7.795340625654346,1.3439931229586266,3.6550078620427584,5.286758991857803,3.183617710870814,8.867582228481552,6.732185453750505,4.044881326271373,6.855966710388239,9.409772855073946,5.653567316934094,8.98979314412496,0.4442971017735675,9.305857047772681,9.773211244447618,4.657249813710964,4.584085760236798,6.665962995665842,0.7105722007426274,4.290598138962302,8.355981351661422,4.635246580255357,9.369052689689246,7.395264914356288,2.6351051304519646,7.451955247404287,7.0142910049822245,8.985619500877247,0.9611769191968866,2.3424537425508096,5.173393656982038,2.9065128027959686,0.9044630586737812,2.885372559691677,3.949044755229394,3.6524035461189786,3.2328606040666252,4.845745618049035,3.1035464283509384,5.938957208894793,8.327559627471743,2.2734405847094563,6.145710378833447,4.27421913157853,7.1890747631520195,3.2813924133993333,9.26789789289428,9.784188095736328,4.97434951492502,1.4045291068277832,8.743876979887261,0.8365729205334649,6.025699099810091,9.487572930766898,7.465256919147514,8.18508855027706,0.17573897764208146,9.477752626306728,0.9504312152246475,9.16392212336746,1.1017252035858416,6.3041432843004745,4.212938264295936,4.232584191987767,0.09338471098140566,4.605921726614286,8.368631136875583,3.9378815074010087,5.4812691590251195,1.722015989308554,7.415986414332362,4.884540171721614,8.69520165326076,2.9906182643581714,2.4681527119883473,2.8921218009080496,1.0075182577982589,0.9820884959275866,9.891316969107143,7.603334470168992,0.8088599561581367,4.8250116934536535,0.15412984832404497,4.8381199087700155,6.676621639458464,7.352899806978261,7.974887644581665,0.5011979337448613,2.145792146977259,4.095342082177176,8.203566904894448,1.3444903957775933,9.919932400155236,7.737806674940337,1.7962164972616046,8.986312272399662,9.889365614417112,2.8937377155501154,6.6815232176082695,1.7025508044858295,9.515419355646666,9.25376825905329,7.983891890920136,1.661045074661478,0.010275266778907444,0.41423544038578175,7.669658899182952,0.13822521450659764,4.599955689535962,5.008677429697467,3.74023839096161,8.008206960562275,3.637250866952735,1.3769152100830895,6.269456161402367,8.761093767764807,1.2694908333954724,8.712179053987914,5.918987558558067,4.429258475323068,7.000245590526292,9.721471282943043,3.343782644993256,2.842898921023378,5.813453376227962,4.8983497106088425,8.941569102693926,0.02919372467689474,5.12524431347444,7.753585966403442,6.375782470563502,9.306677052981378,7.52933495988422,5.528572120287468,1.8556064453276844,6.328099033033922,0.9518503293174829,2.550943241658028,3.941742749582011,8.757366873988959,2.578956965083863,9.105436358583425,8.635700677842241,9.255052850937602,9.40822711312168,5.622431017504519,7.708610088440353,1.6422663538187932,2.6533115623839176,7.86343408287129,4.841853599611278,1.5463065074649585,1.8000621623447977,3.0883472751953778,7.655668296143007,5.277511207360412,3.513615669509038,8.39492638414259,8.887841012813556,0.3765035007906703,8.002190233644919,7.677892827779463,1.474600574217928,9.95734719435381,8.172915897436026,1.769348747082582,5.000993433800975,1.403527955065118,2.3663789699118243,0.692707882817778,3.5382887008169406,7.561975738859941,0.36883893831891834,1.4297395002742253,5.822507069897862,7.076425728575986,3.2926379290391794,5.6335176861547005,2.3680996654985287,4.149888374398469,8.326404757614029,5.429767129581096,9.706624862455126,7.754266057914299,3.379468163538244,1.3828568265931152,3.442072599962407,6.129922789777171,9.820726766758835,5.645554600936816,0.5423278099066553,5.031288926071356,3.8300434616515666,3.816254516992401,8.519503413034409,5.269351373932221,3.520619683066024,2.7690428221696894,8.450329700913954,0.6009021904004297,2.9452369808339784,3.241001117749276,1.5143575101113171,8.592025970839705,9.151599987529508,1.5534182993906454,4.580182937977226,9.53757108181309,0.555065572708362,6.277252345438608,4.174254484190307,1.1017731651121765,5.746778026614631,6.230135575714188,6.613943045663982,6.104014932470221,1.4153238462749762,6.0074746258863065,6.647121182303792,0.5266073894265011,3.152130064090073,1.2482757211917406,0.5196958888339553,2.8306126595815484,9.449169462690236,2.4381594680420893,6.351852462698313,4.021547327707015,0.04293885973330136,5.191542629952153,4.82201741062118,1.8074101269153942,2.639787579892836,9.63005214420422,1.458342254986309,1.9995382460105526,8.434698511047882,1.4477045745647499,1.1524902349059518,1.4272571425963099,5.616106794116488,7.590070030102815,1.3656079285265044,1.8339299006802778,7.447586635571632,4.289416343776193,3.836721184775229,7.907669006043198,4.074702620409793,4.933422931430124,1.4916833964897247,0.5194083930694648,5.566320205154405,1.7578957410449858,1.7319386071028897,1.8136939730300017,8.928372302919165,6.2752053102691345,8.943940672770106,4.310283418305165,2.4925336010487342,3.022806351219567,9.627613696215152,0.07530648716482347,3.4781980447030936,9.976826718502384,3.315001560824198,3.357898495829117,6.142328415352598,2.974391153624225,8.536998308485096,9.71946252904846,2.5372849710563017,6.857903610745765,8.650105594188421,1.139365926286282,7.288465854442585,2.4029858716020636,8.228411931521077,2.0586111195650836,7.233874592286567,3.8537380241678143,5.538739985126135,7.492519139255589,0.2601951137122227,0.12556075622425888,7.983313308020459,0.9690928574168933,3.2440610431829753,8.088130391412601,1.2162948543189778,8.505703901729976,9.862048395119745,6.225473508593966,9.615431646584343,5.179734155078643,9.93111620230601,2.4345707363958202,8.57813315856949,1.3339992240678167,5.754922878266289,8.936094860819173,5.91773184011176,1.3305489379617907,1.9519803624055077,3.7373292992162943,0.6213398486987964,9.260543621579366,1.741040180598652,0.8787384899669992,8.569137727797564,4.631516357431376,2.02532216481061,5.097268731851361,7.520878697819253,1.492775289762136,3.327094727204216,7.313374169051745,3.5722961600818315,7.440287831266401,5.260813158276962,4.813774317806702,5.6194206809482905,6.373859006045777,7.907404605945645,2.534417521868275,7.295366043276363,0.5354269703774328,9.521899634096036,1.1771125741558852,1.5636309764356415,0.2627674189278717,8.728240528912403,9.393678352374899,6.331227335246514,2.6691411551532696,1.5177758737660185,0.6699522436163985,8.409777018145164,2.96451250552779,9.878270290490132,5.652463224485924,3.328366406795029,9.74011906131745,7.524963752294487,3.87617260588605,2.7361358010035386,2.2631591251616645,3.7222139993385417,4.344627899105131,7.99597338017453,9.172357866838084,4.114399229685716,6.4538333138493975,6.833820650923641,7.694928392071438,7.478083545150012,1.9179322031602197,6.268549644133388,6.156801724596146,6.901744321967149,8.813555901381495,0.5357169941681716,7.691259618939268,2.1640702385471244,6.707137257327802,2.867917271029472,1.885495767697165,2.2264199811726315,5.140050962235807,9.232881662081597,6.209313593325259,7.105596836317747,2.7549149877211287,2.611561049293065,9.58358414059057,4.986716575480001,0.7973642630707856,8.819150473185534,8.290250896986981,3.7379250361325567,3.5216156269955,0.8293889891277528,7.700387578833698,0.3494605386217109,9.209749693293825,1.0062246808345954,8.366413824915835,5.328709252039932,6.832806728445188,0.13670711343295672,2.7663703752283575,7.562678260190722,8.085043821478228,1.186052312889323,1.0598033751372804,4.327500190816497,0.21302572889300153,7.750704796855532,8.483601654820491,3.9830539488522154,1.2185666843381204,3.0810465923942765,8.702138270906193,5.723777459976378,3.4908294326594547,5.709034217082061,1.9028090834742772,6.97309003955864,4.0886901671577665,9.862867387975548,8.73319495865582,0.6805072240107513,5.1989851534962135,1.6813577568684646,8.990701740752696,7.506363997675038,6.823964052708737,5.040252447341027,2.7928817045347487,8.27565873536036,6.421825897411395,8.704314183429993,9.929476677943372,8.453251260355598,2.859116737506391,5.880805247092842,1.2540487808703782,9.819029081419067,2.0228678006296708,2.33342926847933,5.536345123329136,9.278349451963013,0.14829196331983763,5.0626501738378815,8.89282106512924,1.4385083813860766,5.7420632389221264,7.616291380356694,3.6379174013618765,8.847054017003133,8.315376237119185,9.115439438656129,2.5904894150600954,4.652255744491005,0.6758294762189965,7.5995248144777765,4.314567378732992,6.853474530070319,1.1699060091941882,9.086789306233818,5.455914785064473,1.5925912857365288,2.5053008817902422,4.445843897719204,2.2568089192559704,7.588335695926873,2.1341852380131576,6.220588599480436,0.3361920052344569,0.0975176108150122,5.448137185221265,8.418866988168574,4.58069438421248,6.579453735871203,6.9875332292026755],"x":[9.011609590746076,19.91985415506443,5.387175797345245,12.119078939324543,12.510347829058146,1.2763927759969373,5.721949377717999,13.343038562889507,5.8552028221646335,11.154903681225004,6.074554973693975,10.803374100777763,19.299201238681366,15.66309986929892,19.270347133499342,17.906110601367477,19.427996973939038,19.781384042469977,1.382676138284733,2.2073502791719246,18.795151300004832,16.546914919124504,18.32933881389153,6.361431129967263,2.0087682025473796,2.908430871449328,7.351118024279066,1.9486760863201846,2.4762632438590293,4.207559572526454,17.01315140177066,16.4410276953109,8.948285721405371,18.392147358232577,7.654685649807225,5.1582320382816205,7.6216650290001775,0.07292700984724121,18.847024994371985,9.035484882185667,18.484324514175597,9.51819754163672,3.6123491817229914,4.807469635432571,6.016552429756907,1.0622928779098961,16.516350358647692,19.73506869908133,12.871117838888747,18.328111285420196,5.6384637704796114,1.8228387658008138,14.125939057599615,15.231562723253056,16.508973844514347,13.322635994275714,12.042368832259207,13.286071185124593,0.2878661514011682,3.4223959947856386,15.160799885302719,11.20045740667656,9.969751392717953,12.997343876834396,15.069164637938082,1.386553213642876,10.048028114322305,17.983926789822235,6.784553193086023,17.508383300851445,6.76931159708857,17.89800693458977,0.2669364875950686,11.67694696080062,18.528448168147097,7.825790298908419,16.194525446599055,2.2713974055213937,11.328654415761035,15.916644281552879,15.423914340465416,10.313392629869536,3.3331451405144286,10.013463912273043,19.259447182897674,12.42466651651882,1.4605653397112217,19.086876744462277,13.535750625027628,1.012030222352216,5.633329643599705,8.251243424856654,3.3372325148034054,4.65591199307966,10.955947261224157,17.17217994221139,3.459238887761109,19.53658287318096,11.917738253147823,19.682551799688078,7.033912086440393,16.661589216289233,4.111976932068644,7.3021830104510155,19.79123295450937,12.210689907628641,16.348554765735894,11.802461963364458,7.540220385596044,0.4320835530697176,16.575038678516783,0.5428513833015103,14.427865345941537,17.843784839637884,6.670405771147392,4.4628395004079024,3.2560987537208463,18.24758781951001,17.557969830877962,2.7971343327382447,16.908038708720973,18.02927988402603,5.156220578230526,15.62460748416516,14.49581994936561,11.513142169852252,2.6476740773917395,5.004027527274437,15.60548490157975,4.684710931518148,15.825197642483172,6.079775108511942,16.070444852725593,11.509973202920598,19.867540400881847,13.208528858732912,0.39105747323483264,1.7364334692065686,0.3711790892679945,19.54452386112308,8.166320844853022,15.28981032180106,11.847766548334949,5.796833871203355,1.179075624467365,0.5957119571136893,18.571869120407275,6.100251468048596,1.9896798120001158,3.1684967967180278,11.355770388957964,19.01371767323446,16.698229877755892,18.62902764095734,0.14959160460204846,15.588018912617398,18.571510370839498,5.000608872786674,2.6915352669766612,0.23569530753501766,13.962608252445428,11.131511677798812,3.6921190778270363,1.4727274673047974,17.72856956660017,12.876253123281373,8.24392888184275,15.305052947174186,10.866878062301012,19.413869267403527,12.01992140818132,3.2236712822303737,11.779305733056153,6.461304175845832,0.4937446924658939,2.3805046009601982,15.924262845394699,12.862711418238044,0.4961769298009777,12.303720427867685,14.162366457666824,8.500794041306259,5.964548394881546,4.231869890770876,8.523329995218756,16.359635278487936,17.714790308646172,2.7801682471051103,8.264009373434735,6.5679381506419166,2.325964456958136,3.256755796376436,8.422278957558937,11.250568858977928,17.046836605069537,17.10219110948302,0.7860985181555735,9.004164744185772,15.25281322115854,0.8835071486689028,2.0485603209750813,4.7390623994866266,8.547514347438758,0.881756878747213,11.567990526705216,17.84598204224489,4.26780876116529,10.315896872796548,5.0445299897303775,10.273213240598832,16.566395339700428,1.277091157739636,19.55909707871828,8.095787243027086,1.4032825240997626,14.287206925983135,0.7290130469523204,3.7522382267782817,9.787646940605587,0.7652321745973101,4.728589342420624,6.81538472970598,4.063723018945833,2.674795296866783,15.95747912385999,18.812898340816893,6.094085332244772,13.033882355478813,3.7866463979362486,10.476353809000486,6.249326377531577,1.6359687671553846,7.642541420508415,9.741684162935815,19.52675824508092,1.8280026813680816,11.105481756675172,7.663836695057404,15.190949119300106,18.587804262408497,18.443691335661512,5.516214534996622,5.5792873223957695,9.984264986349318,2.7864268290324246,8.895748794545595,18.157911188351868,13.176718286137321,2.8944948565140294,7.497837646256942,4.299781722653875,8.794910966428668,1.8187721229398024,13.925028904993688,9.407906226965071,3.539741846478157,14.014245151204632,6.897683276230175,16.764901534044053,0.5207326954989577,7.861517086217362,1.5728717586857632,11.626025905596315,3.46382833671107,7.36252719234848,19.7457369845033,6.943072831313448,19.76921592107534,3.941561355444718,10.718579317454143,19.98204185950788,2.085718844136042,15.547852711740475,12.405042413723919,18.486717869257077,9.994970727539144,13.778922517011715,18.817089248399682,14.808893806150344,12.151525240173825,6.383550520437207,9.670619602448287,8.458684689278524,5.283620873940449,0.3550980945618676,5.217536132994907,11.069160690171302,3.4583805425213576,18.819784974231595,6.806196265638551,9.075171588905611,5.489159489421573,1.6300667239773992,12.7625441784391,12.401048764342356,18.2231049347236,12.55213136365693,6.531235110944622,2.3894392291971966,5.307268006140489,1.0530466477450773,10.661264310945832,19.11586742489113,13.620518628325037,12.820479709215409,11.002345763303207,15.028585134637304,6.077471158645733,5.716909266288317,4.629170377925851,9.699676142422188,14.850554941404521,0.04677147954002869,4.564505904242697,14.243963867007906,15.477583176735772,9.480702587927997,7.689931219157922,7.632626188782008,12.55383981006501,15.756322124038832,13.705787663588431,14.038175435707295,1.9356091725408708,15.542013875976547,9.054906607835406,1.668631171700592,18.756708748624213,7.4061275695058715,8.111396308115006,19.77058855406819,19.122703810754622,0.5714440653749087,5.105639971764351,10.087207244725231,19.515970013317492,15.241000757160093,3.030503400342033,17.470637400782522,5.570934760480006,5.31272955001393,15.586598609281417,3.7730989729575093,6.285186534191403,3.6647723653027198,0.3327561302363735,12.134634969971332,0.13967964419739687,17.41690790255153,19.137530860486677,8.729936415158907,7.148450756683915,16.012514396366697,16.17015188987771,0.6391746098613593,18.17108277204252,2.1716318808579427,5.019758858771963,6.91081883834662,17.843336834270183,8.27824395234629,3.1862072777219064,2.509860372659465,7.356536416304675,14.437427525098915,11.136697521107015,19.41088433033343,17.726367491254827,17.674016646103382,8.172465561886426,13.56022111771248,17.38441020899712,15.303970452590544,15.089034282317595,3.4424326196133848,19.476431261725537,9.808714171955447,16.926161950266902,19.888410797573698,7.622905716237489,5.753682107737812,13.10078329056668,15.57408844778565,10.229643989886581,13.83592710314717,11.788700036252987,3.9937318163559876,11.073682161752334,3.5867830054070193,3.394873386936119,4.966410387545754,13.235387620221108,14.19425261419196,2.445436951154343,9.212025331866682,13.385323588076394,19.097492575519603,12.38049033873927,9.268182954347441,7.94158003679903,13.380684886281564,11.141529000449637,7.058518838663996,16.276769509528094,6.124168501528695,15.195588648247265,9.703348119271617,1.8036584203385297,14.301808720231346,7.863937734094835,5.790039571931342,2.3117648619555053,9.032545951914543,16.98716994066501,10.370152746435766,0.027082704417029646,5.56103839026445,8.127675034429904,4.46147484518983,6.475698812356474,18.57943858430131,6.2263965969726165,7.407724740892814,0.5349650214855517,7.59436714024559,19.70508480542515,5.948177853624754,18.205962818484483,1.776299935169301,11.589824407505525,10.453757165838159,3.266889549886973,12.211718426242602,3.9494007090778904,5.96775666697642,4.037580128788978,4.887208368799336,5.846950421890202,13.182138519618366,14.252635132751319,15.331732574500245,18.954816534577144,19.33945614027257,1.7164576633261808,18.277103473008857,2.9615073618481924,5.87448384294607,0.9938119316482963,15.015886145401467,3.112703546912745,4.457038615530675,0.30953996080075097,6.612902302386812,16.02261673705189,4.170919356066589,4.591403128839819,15.489478932264099,5.789232908157644,12.594325800931983,8.650156211605978,8.699078211024652,10.660691240828086,3.1740061608430636,2.848204274105317,9.550397482246652,13.823147658344164,5.004523914991328,14.448766840157369,1.485629204375245,7.856623622638699,14.52135199441928,12.999837380312638,11.385329149733302,17.692598201026797,6.43363857512425,0.22694763971806253,2.085208143423918,4.6529524291685,16.376775621474735,15.781952477456414,7.888803860925808,15.788653861374735,19.129425566526773,10.622005946702014,13.983815766715995,18.385250526871996,4.660100718576543,19.486245249622527,15.842847282248309,16.753587263953932,3.465254590988356,1.0276320420081664,17.01127430345684,16.242558646675676,6.373890666540647,11.715607155173595,8.319650669453464,5.075775497773072,7.295599423635255,15.428406622672357,17.591445835180505,11.081074267247594,1.5934026462949413,7.724640826934364,2.282386864015944,12.192000093941076,9.85760820586143,12.562339905544121,13.842705933077792,5.478756821922146,7.836369323454244,8.597052700405081,16.43199353220531,1.7170012700303117,18.497699840823195,15.061513678852991,0.7623124602240416,0.4641545263280422,8.222210611013775,10.565358806694686,14.96691230632039,15.97589897299808,17.06266189304757,9.944213469929295,18.053338995117834,5.5282233816434845,2.0189755566807133,2.032954416326249,5.042470546399427,14.392280858246945,0.4521818383500831,8.431673766454884,0.02955129334801132,12.807868831407351,15.173027949434514,6.5412312979654,0.25436735369221974,19.51422945298639,18.645721559693634,2.0593706697335667,15.182683522251374,5.705217443572659,15.528462553482804,1.100467321716927,14.997248105964873,16.004060154438328,4.406579523596519,9.067200973521064,0.00505243342395989,17.545610744064195,17.7369615332457,18.794941992284024,12.898290566658158,9.587750468014757,16.872008830327367,12.480159145933305,18.436581881553703,11.715087849538822,14.005733346769688,6.476447792403972,8.275906060799931,16.991934180645963,14.967268110128007,12.184888852438727,6.064121506879925,16.081201974447616,12.299052013109062,1.6602802672434747,15.132719868576183,11.388236393117385,9.423467593612965,12.922660922013964,16.99352259627513,0.13787895392815663,15.336481581258363,12.871985301344658,11.684736766329,18.98342029260103,17.021325940108753,5.003117689116197,3.874329898067188,4.404578087427171,12.323380203157557,6.269177801187582,10.487321984379175,1.3105977448938466,10.733557084054626,12.188716253171954,11.701397860265889,13.192832388833896,6.749700963401497,18.221274801409145,2.2490516881464018,14.272105218884965,7.240465129878109,0.45579513720174436,3.78824330077717,15.530893939653879,12.539025817714524,10.822910423992269,6.204419508700951,6.1558910057242056,10.517166828570389,6.09496663276607,5.798510597108955,14.140913519175609,3.103185424991226,5.127542931682649,14.357821206142717,10.12174162575889,13.15294732662744,16.60680674383757,0.5165374769888231,13.35726489049831,18.121596509729365,17.73534730943527,6.4598197588643025,19.948978092936546,14.894857450322778,18.83111013661653,18.104978052795072,0.7610211790358079,19.000761412650302,15.457262410018817,13.478561079597657,9.87863295887966,12.946049737654217,6.694729211448784,10.846482394116311,3.0401980373349025,15.396271790951443,7.285602527283879,9.729632799152466,19.49276637700441,15.93757616413317,9.570008210163685,10.609438669162747,1.4058735873256545,8.832085441880775,3.0879472327531765,4.29655500641728,6.911112976722995,3.0198309377718013,16.53316171948408,8.602199042786193,11.34823222774381,18.69830916195594,14.604286700504145,14.149772366967586,14.760918597547473,2.7664311951562626,5.174850156427926,0.7794233234107439,11.624267401663024,18.98098356676749,7.045344184135978,15.42019313596759,7.935253512464708,2.4164317130348056,6.297989285566836,0.861711668305376,14.394941316527067,6.293405005449273,18.89640089318153,3.7650696204202427,5.78858823683587,16.53682616074248,4.711355621577038,10.976472472146469,10.430811055939909,2.0036226123938317,10.558883863329775,14.617332083630995,13.85091274450474,0.058574018691248675,1.655956515085939,15.922557717512822,15.909991597001603,0.5948421234460888,1.6801784635664863,16.26765653533068,14.6379057846049,6.982661389792515,3.7499957566568343,4.359816919249124,4.633350055961416,18.738067117966963,2.60765545207458,2.3381348206522556,0.4290922256972607,16.175533732929168,15.559869189583463,16.42169348177009,8.270407820365854,2.571528282266047,6.814528822623123,15.28877678568029,19.87446583110156,7.882254905137414,5.395558974283254,8.809609857194332,17.850225806097995,3.0421513674859124,15.702129155019406,12.599053158201748,15.513532200607951,18.162901793892686,5.914229627634984,11.37137062341445,1.5413664927348725,0.8865595175405172,3.994500519682993,1.8879100612279132,18.52893831063186,6.864583543493112,1.9068523285097827,16.5302146130237,12.681359591870729,7.290209642333405,15.75807766341573,17.656732017894697,6.380621639467505,13.159248837473815,11.536928973158943,0.5080210795229156,7.927766215154817,16.6717523547198,18.53807907286914,5.479751282463474,3.3058802769960804,12.14560665319311,6.7464888439975335,9.384698897649791,7.132426509320968,18.961999585663683,7.182868293691325,11.170044132566247,11.612997871439731,7.721788557555134,4.833528134858569,15.775314837767755,6.058595751056304,19.474256265345865,12.408661862379082,0.3819303832674903,0.054460066573107646,10.115031641119474,0.9222398674305721,18.156508896177293,16.055856032040083,15.362232133628755,14.99470634742217,8.837312108546955,12.012034180342162,16.07145407494876,0.5756679707841172,3.7068917366826115,4.778643026718217,5.741998190434199,5.024246463819688,0.21455623294017734,19.45221406537804,10.12662659506033,12.416525819280263,9.11624078219797,16.043478621480673,16.328200728175688,18.14103954221496,4.83050228628723,18.684031745242784,0.9688897091894599,17.28277359176088,7.937001413406364,1.8260366036987419,16.457428059332244,3.5383575933183975,10.50836726362264,16.913605734437034,0.3771136608682646,19.357561259588856,4.250524680659331,18.518419393025674,5.911586459379103,6.383845866931659,17.514085832333727,16.840230896463538,8.534668353342232,6.332190982866579,1.2757377468898534,12.682926789668896,5.833353219642841,0.6550986758778654,8.15004726732353,12.321709030831038,14.522543284227854,2.2256281240957954,13.607947210393903,9.56386998662698,15.090395935544908,14.717230934756461,15.790967599891768,14.286786064346138,19.465993138951468,10.417112851269522,16.83193874877197,16.63841842926949,2.5339454865064326,4.887946583305753,19.632894317214692,4.430735402958654,12.50681232246528,6.159841869851972,10.898419818221345,7.214647989038987,7.037213986776547,17.57530053167166,12.037575091441877,17.812776970935044,10.439662038040645,2.443153424834694,6.347093769387242,6.345617500176379,13.236729191407385,2.5992445773898076,13.500984201217921,4.904059785274479,9.03345791762642,10.044982634676147,14.73834592784395,13.57506768856183,18.18552338177664,19.277750228373574,8.644521089966739,7.537516437666043,17.06142279857223,1.6991504998986118,0.9769866359833301,12.575403029373916,6.161247692278682,1.5788771273787683,19.82849313236994,10.54568682376965,12.276571747543358,6.931109279640872,18.198297826870693,2.486820773588474,6.885864569702238,13.214187515170202,5.0636390467431935,15.627841023682766,7.862820907046344,1.7361874318284354,13.133054304564968,6.577940203689354,10.084105535365353,14.210292884875413,13.260088598921914,14.612455204477657,1.6759885191576407,13.367483473609774,19.063246780608107,10.871688600583859,5.531627486036217,9.170467038827246,9.46136091683531,8.904342968605485,9.64030925711253,13.531193670598004,15.297376048361793,13.399127320952747,4.757774813337652,9.69979842531786,12.82342189099818,17.969222845231055,13.373530270532644,4.963440649296862,16.842870749642135,0.1392892593673789,19.850076175229823,4.204730306013684,16.252986912010105,5.151657502397118,9.767252325418148,14.542514267850066,4.390349364904833,10.058096252759054,15.78835375486069,13.748120277299037,11.976473868995402,17.369529339502744,8.550993328304681,15.504875513950847,3.221379290016455,17.659190612909562,6.08677716080035,4.112224657413885,10.32256734886678,10.290871289641942,2.60092085885967,2.6205467570545693,3.076179328292974,1.499547877402998,10.93237972535482,0.45006668780396275,11.306357174631728,15.646603031089992,18.942575003168184,17.91194494430549,19.74017181478811,1.8778807546610432,4.3973331463234855,5.190648341266444,5.179476816914121,18.18094446788531,4.150249058643194,10.604688509756436,6.964637912207237,2.3083016058861094,17.98513391193108,0.6654974443888317,13.496209694625826,4.857253097833563,2.365847333668727,12.204870573355077,1.7701270248882395,2.31883083640966,5.373359934664812,12.383773036346298,19.638443120501123,13.170184155955141,11.669129147708205,4.458981288349251,11.956891387804056,14.772285468702284,1.2593174045870592,4.941038026223539,0.29436256274875117,14.90247917707424,6.897624274370129,11.418482204248054,3.9331600097720676,16.167279658836154,1.2299391027243445,10.781386289238188,5.095734762541353,9.99716266138536,19.558248347040063,4.021492797092279,15.494821773247782,1.2516214514515278,6.997621146902899,15.78389683362127,16.44330899225482,4.846517862589943,12.702054462019031,1.0542368996564244,5.866071542426434,8.876452283250696,2.7355340254715355,16.40231896790715,8.043516431629278,19.985279547177257,17.818384897369263,4.582747169194428,8.345111478482359,8.82225319032341,2.7398306913305825,13.094930858004258,14.452718625143826,12.274703824814184,1.7244150666234903,1.7079913407790182,9.424695401679028,3.294829721058017,5.525499587292382,0.7881184637187033,12.78914103085079,8.417453703513074,15.153011970507864,17.539982037806404,5.536093288053632,14.012659625620962,8.239254390799848,10.896745433648217,15.327260265703512,13.357982197932255,12.776156555253424,12.617640451990177,2.147531300734986,19.069430817981573,14.753341353319446,15.256061387627614,8.32162618700616,3.7340114416512282,15.30093771041297,9.731512732778075,4.9053194636445685,6.676996120176626,18.93679097972797,13.752089983877607],"d2":[22.558833790301847,28.957516471983133,17.380413447888227,24.382504000609067,11.370852900444767,18.8821997894846,17.833701149143696,10.102318611574992,27.804071419015504,24.7650421204192,28.30543785270299,22.950480750958953,19.116950308013998,17.805907382940983,16.310270578243475,21.675205242818688,14.089135868136452,21.53389023802238,17.498201625635744,14.605688102362082,12.649111194510652,12.938068176853776,19.727537039920367,24.88629632044111,10.712698687086242,17.10593361946282,26.133356928892514,18.719205312978207,24.07481894832752,26.31735427372645,29.17487456185961,13.993734818801817,15.594221426212096,10.599556614627188,20.442038959132795,15.054630352112085,11.948665852823567,16.644112216804977,23.018487910859516,24.913712119850402,29.970696136806584,12.015642037567552,17.246209672311288,15.266822661733874,13.752321332242229,28.906063664115727,26.2422384567001,19.201775209020955,17.95932910906973,10.350452573670683,23.139433146679025,22.304149302098224,29.045445251627132,23.378256718194855,26.03265538547192,29.982791893698835,14.967082512248115,21.33641525811801,13.262482588357102,28.725470111310507,28.42139981315198,15.5299105045221,21.60598368313626,23.43976230828174,25.84529039620774,19.4354761664039,13.795963162624595,18.09331639493456,20.589646476663425,27.178133633962265,24.74854815237926,13.196499009075788,10.290856681937308,11.598439894848,18.737245994775037,10.882055122623848,15.568866758313478,27.873939849024005,29.602782066483133,25.994238363467428,16.574833514517614,22.094513183436447,21.608425717143934,15.152224480793688,13.304282699956552,16.253362401600768,26.247909627008067,17.256809243418303,16.355416451717907,27.510036256425536,26.59405205015033,10.500062698631574,26.4664098006671,20.082623715349705,26.101473254474833,13.976629093934175,15.910806737304615,18.104780284248253,18.180178943319483,15.97923264034732,24.074347120568092,11.345613693256817,15.889814041514478,26.700366235140752,28.637504858948525,17.881389105183683,14.776825557011769,23.889939218164223,13.617227289660242,18.919114924846767,11.047638396942997,17.324271108985037,14.8009601834254,12.013054491229148,14.47143436625061,14.22465763096909,13.98831210189012,22.529491402276772,25.653442432107127,21.596518233328105,12.501387736374667,12.994748438873248,19.94334819023932,11.169729857913682,20.44398602830984,27.03844281737457,26.688939689406205,29.311738195114962,22.755769796567513,18.529162404677454,24.517112494303124,11.942737529338562,12.217220412222929,29.04731423618481,23.932993514011113,11.26461876412398,14.612318164736022,17.187740059006636,10.650865437541341,20.94966261482846,25.097912786197153,28.77890471136415,11.511161292318892,26.319621897067492,20.820256191298576,25.25004769495345,12.239162939190296,13.963019497404243,29.59407484565746,29.557426618674214,25.580536604016608,22.95811875497829,24.661297122112195,16.541011746677746,11.260270615059188,24.959516091407643,20.98373090297395,10.305463187164353,21.328250699692827,19.83356639200847,22.079902759097077,26.15209233784809,28.50545917324741,21.902559941773717,18.05139522093604,19.00980953184543,25.366385693568763,23.6503596127108,12.966171100261331,11.443252379739466,11.13873391385166,14.786270651013806,27.366811277525677,13.256180396111032,23.604311521589164,14.19955147899557,18.58942460569829,10.78704118147611,11.760707671863537,12.792726616251372,16.74581975119692,18.532416338689007,25.895529212524337,22.6789852814459,16.309238126071932,29.39735670155558,12.445212179127116,19.476701535587967,25.03262936701073,19.09454672778898,29.742796777207584,14.93054334663662,17.162351566132415,23.112230175001287,23.83006023662417,11.634758200922416,27.543695626963544,13.734720170340715,23.976098966795366,12.303259758279399,24.932132262217095,26.460122023829136,13.878322505372829,25.29434700050733,14.439021853573673,26.3846794843605,23.036220798385116,26.718371553510426,11.085520143118991,29.33070321545435,19.974161178779116,16.03511843484882,15.775087517487982,22.078907336754167,28.38904884100794,23.61070144360714,21.96975265427033,18.37320185468753,16.560221991375688,13.912888126919638,27.911051313576003,14.312403725207519,24.083959758018626,17.82583478630861,18.637678928038536,20.64932034591571,11.033097035612451,18.106534429205198,14.08191591049846,24.9449833034975,12.825558961430644,24.880869673915804,21.291776986077473,12.144263835982683,23.5547131253103,17.836668224748664,16.793319385354252,16.38913941332167,10.36886642320388,28.10118058962331,22.481516919625356,21.29074271638018,11.224894424922965,25.77070434062451,29.817526937684736,18.384860067009413,18.998154543734938,13.765335587755189,12.709382242996782,24.504593494218305,22.994003118226498,10.684749248521692,18.326172991037154,28.210120075281143,11.521576985095505,17.966995233070257,29.420873558283592,21.77378134823293,27.136670964245226,28.115788930417118,20.629512747106418,15.025850394025863,14.421016916786167,12.482649647038166,20.349533400018395,10.651959224153028,13.601837161212309,25.773121340304588,22.225682024353347,22.9506338547258,29.51858697419634,29.330990936420257,28.499786242577024,26.9293391704748,15.296573773793313,19.73478453156855,28.226134459289298,14.999993512991988,13.171807367079452,12.101477845544423,10.992328584511132,23.24438472674604,16.073371409832955,21.323940205469643,24.28259607084041,29.96078435940656,29.349455732937344,24.64091251125591,14.12159802610879,10.899774006505227,27.140938032614955,25.959891076578117,17.28616820887894,20.802886909305435,19.37455112773019,21.721824595557667,23.39706015523482,16.826013323235887,12.968043785427433,12.651656526463588,11.653912443242277,15.409859766154238,17.354035609404153,28.82374856911229,25.27614066031497,21.3510523462756,10.740295247906229,19.435875263422673,10.683916351922417,16.470117048176242,28.14341767880572,29.253699097500405,18.16800532132607,19.63445254928051,26.199255588121765,12.060133529828136,14.910031711343645,24.665133656227546,23.457477405170174,23.0205563585604,13.409345842615421,22.466614197418284,28.486372150282815,20.237405191054098,19.109572527815153,16.28036146216506,22.343721013114262,21.752430467185107,27.97673967539673,20.66941506560772,24.133470279480456,16.49341277639011,26.64725661744637,28.72960958358215,13.606788174244313,25.81382444496329,25.65345844263994,13.635856382495778,12.985563877815466,11.638619117586945,16.93663251561441,11.637538334803526,26.72774325682347,12.041180547276614,23.405418698715742,12.450729274449014,18.020735485981373,14.590093842573179,10.401607925030207,10.839752356609957,10.057150049555057,22.230722782978276,19.459107197186537,11.91651851109,21.522261130273353,17.124137223599895,10.675685701411574,20.512179092905484,13.729021693149885,28.895833104707144,17.312439465705232,13.359858496025625,27.586613076690657,12.420688397434727,26.30107152472008,21.803039093854537,17.285123404912444,17.19815855603307,29.762625109277536,29.327756044722697,22.712161796107154,17.352750763803122,24.607528845204296,27.741039345793453,28.958309268296333,20.68774717432975,13.067983552240246,15.164393194881445,11.32655932916764,10.310229673566443,10.028895319145906,26.190926397847406,21.662496572590896,25.743366833664595,12.019489218567788,17.188468011186565,25.566328077539513,28.17878481678468,18.32247854390851,18.02380176935563,15.761104235992725,28.966915725721535,19.66964399434286,12.268251751231919,25.978817640606792,22.479407696534754,21.14419698627586,18.885535036492694,26.57606976655258,23.016698861412273,29.717636740605712,25.083338222107248,28.41335552132206,25.90771237087043,14.568926335036352,22.45437493314879,29.10096830221115,24.69565241444016,28.74760733315049,14.609996391518298,10.514135446204765,24.55623601130344,16.760495318120505,21.158730528236475,11.645423995138039,20.75858804233726,20.456939979273425,16.954503131808746,16.928134740852446,20.690073290758882,29.885243360093867,28.8769735947607,26.27002315342438,16.8894344021992,20.13487788268982,16.731789411645707,26.75462309535365,26.85452322445707,27.926608228203392,27.433529626670765,22.495667484105134,17.204402850053114,24.367367830508847,17.401802809984144,25.098757559230318,29.459882852204856,20.302161255257168,14.520723344007465,11.147595818710393,23.427721286591602,28.337741395752833,23.392444557716438,29.173498610872027,11.831037205275665,12.485372715679098,21.61245296265658,10.220344569509017,11.903570161482179,11.967945387945313,12.264757632292355,14.231215284347506,20.26242159610481,20.047335988572762,19.73673818775943,24.843129625459184,21.009494484613267,16.604047101767545,10.789176911250857,25.109551075479693,25.2435249587773,16.318125747440213,29.460334339229256,15.707329866679958,12.737890940139899,18.762819673648497,18.175661557855484,24.203613488748466,24.10464083471787,18.95381246388846,14.507023755466598,19.55284518306684,27.293140344225346,24.43431722943309,18.440492659473406,23.904386228678945,18.35009341334412,29.71309807641434,29.774829193810216,29.003834655498792,18.74191085241162,28.798501737574455,18.230878573055612,19.812943457713747,10.01327474078428,24.540589057956744,22.490946987074114,29.42457622987805,26.64448545849122,11.295107370588422,14.219105267197794,25.753230310011126,12.750584932439954,12.960011479002326,14.255629374219062,23.20177775109422,24.385349257322048,19.88916099557576,20.901679938993546,27.574703405846574,16.802407791361954,10.48817951735025,13.886574666923682,22.5303352458129,14.806444218645565,29.682570873629963,19.91287387522016,10.303054073593092,25.01458995366208,21.816886399570276,20.634600623205177,19.87584117102054,27.14915582248841,20.784983751094316,19.971130660111328,23.291312171317667,23.17178057801936,27.899364197124005,26.013593795070506,21.668177547845026,27.132069890569696,28.715776846602324,27.3626080173468,24.059812831557963,19.997288518349926,23.756011621643232,20.435408090423127,20.027216225791005,13.480529685997173,22.49438342748224,20.207672952106073,28.79737800440082,21.936207449261925,23.072759069667686,15.091813529327073,11.506512659846289,12.758622314097563,18.12761392803356,19.093605930344623,26.410343988153336,24.79063898006651,24.75743320313091,13.21870125547536,22.790814743363125,21.316165158178784,22.546985153471265,17.62821654942237,16.20980451728965,13.815858197755935,23.956381888739422,13.532953981346445,20.46187572275666,21.391169137983425,18.39802247427516,15.534520794672687,17.023293791477276,24.56237879626436,21.686707258044073,28.770100465647943,21.26906919513204,24.631975483205863,15.081492618433598,14.277090123582653,19.28128226003677,21.032586882208506,29.52097410333867,15.421976834148904,22.242571184001022,20.102447546959365,20.895625515876958,12.01433250759977,16.066701079439266,14.769204966204263,29.604025180363912,17.113897030834487,22.920285967427063,12.121678778376923,28.47042219238169,10.421275028622645,28.256657646560207,25.328984003821418,14.528070919892464,18.483408156485524,29.341934729406695,23.53740798329269,20.47407127843011,19.551275961661418,26.685590593044264,29.287771039406532,28.21748284791039,17.81018897060796,24.71147958049854,17.685533846250703,24.35296648435882,19.505163829246335,24.663441883540962,16.483333665094726,20.566895516615297,28.14384726537198,19.460504347822383,26.77751406172416,29.780862553711064,10.66364572283851,14.929684957526064,28.719181828395257,26.532675661231263,14.962497999198948,14.774620574984612,13.525814201303689,23.729992631125654,27.271531659848293,23.923841338174434,21.31737977073271,18.556711401987908,26.87664939598763,18.06253186273123,20.538308042442466,28.670431839802603,11.454172446697992,16.093633653383247,18.69807952551723,21.17869851573371,23.34997030236588,26.86551585031954,17.668631416389932,18.87756761933529,20.260479058624725,17.755843802850364,28.17121560651085,10.67023395920598,11.07998961556718,28.034091325769396,27.264135672381432,29.426113140139236,11.456777766725153,12.009889366111327,15.965568046656568,12.473097306595484,19.859640871852907,29.76001494174257,23.7018111321747,21.62501287329743,12.483911123228658,23.67644598593825,24.11587035228817,17.937027558228067,23.53656510963855,25.49124299836482,26.73730513015142,29.734929732273674,17.07260849916107,13.259987998487187,20.821100037175036,27.685470671231943,28.71500572531071,27.019849409069177,23.88769218931556,26.188020948839235,10.93868517894403,24.38831863166137,12.065971723751844,22.32525333826701,16.07084159208599,19.91066586371588,26.038000958212635,26.721905613142912,25.585254580611707,17.609734816491912,21.15862790321712,12.56631238818037,19.79509834849031,10.961445814371205,10.514572571742482,13.493273152820917,23.11040794168686,10.483651147926402,18.949310565870054,28.468287607338976,11.432694120566559,12.919231152986029,24.10813404815496,25.278168282906467,26.86134175905314,15.634091038084449,20.922210339707547,20.688558100879835,22.563314098556123,17.12832327241218,15.604744526524561,14.832496406263594,10.522298672073397,24.193033810392627,19.478899705999197,28.28039998810507,26.495757346907535,27.276700126696753,20.35143150644304,18.75069963927393,14.56578675989585,27.136884321878373,20.45045663062193,15.257203078873696,17.10773048487431,27.615687875159942,21.79710335550648,24.21081021935866,12.394326124547765,22.963017934391967,15.144895117212407,19.2907351698494,18.221862709310127,28.456447071694875,24.699540720503975,24.65178138291421,17.203924976501458,16.189154783452537,27.58299915113479,10.067916566880829,11.199229910014438,10.813297596022885,21.631914834514333,13.862353189066802,24.115196270415563,28.857204127882163,14.605603555044283,12.903608327281692,24.53045670175937,28.64408329975795,16.378920963362763,26.41121405623717,16.612542694827653,17.43561762602583,23.986016482901405,18.45550121031542,26.874473658889094,15.579370232684123,14.817951567827308,12.488336905664026,17.637289229670937,25.828195544152663,29.81157209781887,29.581027156559326,12.223948010065332,25.71871510072365,19.66157020209003,17.58787934051281,10.397096656272264,27.07105146023361,16.936244453634707,26.70301071882088,29.490044358982143,18.241582003569448,22.032585618272087,26.8929119420841,17.300863288661454,14.94585396494636,15.32725052580506,16.488817122043077,13.15895825046869,26.74946628840917,16.634993056711295,12.554515906602056,25.23429929300816,14.901425126132901,28.842737706291434,19.883780703662296,15.064903421401556,28.877816250675885,14.464796200462256,15.944174739151595,18.966209490303413,26.445630853749268,20.139199800144514,22.030923243115144,28.482174591442387,22.472047775034728,29.106866090801105,11.12374574000972,25.169565880872188,12.39733213734793,18.383467033412366,22.374396338066447,21.954316558690333,23.591176182314037,15.180071004636787,27.9345306524904,19.381204734433886,11.698235462223007,28.83845991814072,21.776544136043302,29.776179403166875,17.309661730585432,23.897782408876076,11.203270260523098,23.195025378595034,17.69896843443623,27.993389189036733,29.75442479617758,27.86669808047638,16.987401725088702,22.41939918796244,29.04721214687362,12.256373804862474,27.73360488070429,12.088860050529092,14.384254561144427,10.537650740398066,11.680319472947733,12.422643163173834,16.86779181649401,22.815111028627175,23.043241621243503,25.78490410557581,22.929211913339543,11.78666884287859,16.05114644162375,22.523798773010068,16.545288201775335,20.16764808374098,10.889567010986578,25.016566323753242,14.205481897939261,28.89986308091702,16.84678530965625,29.18054201352256,23.76054235518168,24.51622598418531,16.529976654575584,21.70129436550954,25.131318486889263,18.8291752581725,23.369111551779632,14.376185852931002,29.49565456074889,10.722968985043098,25.935650234860095,12.9498908385388,15.73827451758583,16.916636378118515,19.91700567437,19.12064458880634,18.77106162122388,12.456371036521325,21.061961960341492,26.374624533368415,14.10918584983403,12.781415190234311,19.162021343761207,16.967223749924457,25.179841918267158,10.567411549042358,20.661921781889827,21.113438850919085,25.81177345936438,11.010515513080644,11.522844004726318,26.984871538077236,19.503777795475155,13.017818973458809,12.409236890310726,21.38818415091819,10.461890931393242,22.27706409712684,21.380873111430205,21.914673184576372,26.094021591744255,22.54463690880401,12.271031103036822,27.71938264160569,17.56732425573514,16.134530598739033,11.347899267969602,29.655617567246285,22.93745934999615,19.188399630094356,11.619290378223521,26.39769851816514,14.594140410204247,24.10868678075744,27.076531641327023,19.79123979496082,14.58737067684947,17.093304626850014,20.414449731262295,10.071900831141708,26.7668263980114,23.490525253814415,24.397976939486977,19.001899344715696,25.345092196780907,20.090003595120727,19.269948865013887,16.99419726680302,17.823854150251712,13.419376994223082,10.737384204600623,16.124898461399013,11.871047903257148,23.305516315777616,27.04085597901809,23.495951091881007,19.94594422587334,28.886867972855065,27.048403305749105,22.21119105068563,28.457024527602385,27.60883878548448,14.783291941799327,15.738205803625792,28.880930886373616,17.405963564890882,29.62585508664744,12.641932042174847,29.415982075789117,21.49359190596512,25.164371947212203,14.700151741312894,26.245810803078896,13.245301675302423,16.623425284055383,12.17912548238289,24.103630224634248,22.036818204594745,27.052873074883998,11.310392169709175,11.49894461011096,20.494763446653295,27.052354214051185,21.501750677890424,17.68015815402553,10.530790605401133,19.260530709539093,22.796290656636348,17.219026720576835,24.3095815834945,22.29670272215785,15.353653687850999,28.506138175554412,23.341555898342744,21.15216082138192,19.45409104126376,26.681246145895663,11.51734794265864,27.9241271217583,14.381803297480182,15.89676240608544,14.4427505039403,10.596097456670218,15.995148535071975,24.736948235963037,19.252688374410795,12.769906205204414,14.582141946435797,25.69121462233579,18.69411821934889,16.157726071329446,12.735198346923177,28.393824077818785,26.47975139436172,29.97140457874327,17.15903381237606,21.35819002050148,12.016437186733619,15.565679389361215,19.871780174896877,21.620733930760064,26.798066955104257,10.485552831246903,11.2452967319132,24.006053816784192,16.128837897420635,19.226998105078405,27.49737920977222,20.85088042341905,13.365423051953037,28.391127195762913,11.165230322497335,18.299202599650336,15.326594113021311,10.134361526465089,17.443802935163095,28.875272243002087,27.156389283073395,26.521706040280208,20.630114034450052,14.919409292649526,14.891041746650977,28.148324168202766,22.919584458979205,27.257094808441458,19.40284228286348,25.017515709895093,13.052258843620734,16.770442581687778,29.80969549261852,15.492769165116268,29.445890764153013,19.17396768985749,18.221719842235107,24.342638861521042,13.78968491908486]}
},{}],67:[function(require,module,exports){
module.exports={"expected":[0.010339604083205656,0.0874004632081569,0.019368522084811532,0.41966050414840544,0.020245024015046444,0.008836225859695516,0.012200433605044901,0.17288269211592044,0.0027115106255431354,0.008376757500812331,0.0037008101514247375,0.00552820452708846,0.03645164892785857,0.029909711333930573,0.019487975530424632,0.003979740194770579,0.0014374941848964051,0.004320132737021442,0.4795020211809061,0.0032498128354150617,0.011696403535080797,0.06625377372162992,0.5831702098564246,0.3892882037926642,0.0015969908648141929,0.02049087660809809,0.00811822393249634,0.011216124400307472,0.08179222682176715,0.0017043043207442584,0.04584713205170338,0.019600234334818268,0.3102507637709461,0.19424878180136762,0.04211699321128667,0.2034303569612887,0.0687316402313568,0.123354035255771,0.03684067501605395,0.00516633624335812,0.003885759937124968,0.02399509994840384,0.6383366078491397,0.6607423095292085,0.030129470146013148,0.005846359934266718,0.12351445702188307,0.00516628810279322,0.0007954105228487032,0.3647870111721813,0.005096206316704224,0.030316476425936094,0.001341807802417342,0.5511061639868727,0.0023066284636535975,0.011635857362531187,0.00034102160768885594,0.012451715748840426,0.0004202127864460233,0.005429364471228231,0.015793987558358997,0.6924684006795939,0.12236161954057682,0.05397093416308622,0.16235429988541228,0.0025338204657942617,0.06401464937135855,0.026760203435526222,0.1306938451575117,0.0013037014764595745,0.018293996794297194,0.0029498626915480265,0.03212919137876402,0.08168605089414988,0.0021882847329456174,0.016789352933400333,0.0035497066370078576,0.006930923980968539,0.012021041642892564,0.05922942397478113,0.17226074720551765,0.0017570004566945612,0.04823341551012309,0.0032891631093253,0.016821737986362606,0.3335042805850347,0.21631170951655984,0.009187951943326628,0.03255165766811346,0.0036508814352814857,0.020823976349280664,0.01669462653962275,0.08613720807077324,0.7764098654149436,0.17252389012724076,0.025655847707051305,0.046321189880517005,0.026839953833646825,0.026066578320942266,0.011957204449540378,0.0060052909342799944,0.004527415305338245,0.04406018804328263,0.00081569287101003,0.012512680796666073,0.038432221274906045,0.03572661391769604,0.00770880957263146,0.5594820465967613,0.13411192191675572,0.0022790153396795108,0.023146726904962046,0.053272028180368136,0.012970086979002385,0.04124528437541547,0.07852186277344228,0.1553456402341777,0.06546843356351253,0.0018623715627930696,0.0006943411101476328,0.017409681798571722,0.6532422440419391,0.018739468304655442,0.0005737197345963938,0.00865706131940702,0.004398507676162759,0.04543125553293343,0.0021234260676815647,0.01805358333821364,0.2551154081291005,0.04254407108362275,0.08259863836270794,0.0004432021479612196,0.07815884544630482,0.0017864704530232563,0.03271086191735836,0.04818327574068208,0.007491260035149978,0.0022498698570513746,0.040586560160139715,0.014157092784595498,0.01948051821525475,0.6553801088113184,0.03567127744507835,0.0018675868444152604,0.6535115222208173,0.08383963117061716,0.28581572227081875,0.38393147826968577,0.003843651582249352,0.004196453855152544,0.0044446847458573515,0.00646117854598846,0.0008848535329363275,0.10247629522931499,0.0013778677642471418,0.02573418197709257,0.029966393731172786,0.0035170032075846442,0.014215921587711094,0.0016517951087036526,0.006553639588677745,0.0005947147396109856,0.008311663034404062,0.003319990120764696,0.036586308769349464,0.015392883517280397,0.0006305592897263999,0.04789427216503901,0.008551619567419231,0.0029850964615981907,0.523052454585808,0.1296099831519613,0.019306316984123512,0.0039918999195543755,0.08834942760472371,0.0016646184148697125,0.00876118932175403,0.03413426972446486,0.014728932530070822,0.11121119525591941,0.042632130971715435,0.2822503851932451,0.1410041139905429,0.028453125192726428,0.003553249665098581,0.00604644092444311,0.010330551615122498,0.4438884108276639,0.03328388553175354,0.035588934274175525,0.04705111357838069,0.28749832304472916,0.04970396537996898,0.1571833946208586,0.010331583619916172,0.007083109540040379,0.010487939031044283,0.0030793504511021407,0.009292850020989025,0.7311326358376858,0.5161293502491918,0.015923486672068766,0.025908367949833252,0.018081527759947806,0.029797531964044405,0.02815261522746503,0.29893184847228754,0.012692884041463178,0.0030857084739045752,0.18136916576974063,0.00347646535367272,0.11873609471698147,0.06517492094242051,0.022071280440094466,0.011996987163165386,0.5213622316626589,0.2974050396190391,0.019905677690958426,0.0029404572052678783,0.0008190818533174932,0.0225604767339296,0.005772066490185082,0.009302338467796059,0.016296517626324496,0.007280268114032955,0.3779153707213111,0.00596534999077196,0.035432715992917814,0.02258085218927374,0.007141151895613332,0.0031288503805344398,0.7470967083505211,0.01817650828414232,0.1127047755333029,0.006955340696135177,0.09400608804049766,0.21469163118612575,0.008162456063787342,0.010620571310689757,0.00524358044649537,0.04454141087001982,0.003397610774813191,0.6915449113454967,0.015074778978102414,0.019223903318786404,0.0037773113124803747,0.120983138511551,0.00373237201774713,0.001019311314077426,0.17126227432329935,0.04089484728441836,0.000983010565023298,0.13309668244380196,0.015244349640085577,0.052968000044258834,0.41104302443284196,0.018658433553961636,0.013173226723898706,0.016682430544671993,0.022025462911378236,0.03770170936304547,0.001255990601020262,0.07655625690776376,0.0006898227215481081,0.03279897396320492,0.21409624732233976,0.01753202459621048,0.006987738648955993,0.0069623305433151655,0.0053459439600552945,0.025952523369492986,0.0039365680149692295,0.03549870342367241,0.010274190602315231,0.006096869446221015,0.05823159780329964,0.11208430712570505,0.015537606609416624,0.005290962345006828,0.02497353943853336,0.001287327860750332,0.2212620709290725,0.11337990661387538,0.007536362978918896,0.11944323572782907,0.035428382412291855,0.09946653204673044,0.0014119044765330431,0.00468714638239387,0.0007224759622655015,0.12360301621579019,0.3149101157103637,0.005805331788363295,0.002253714671703122,0.016027212812277654,0.012169047929914216,0.06940401683132368,0.03039184346287082,0.005820125398093742,0.04813334651536549,0.035905101208684564,0.04755722438760504,0.00934411475718928,0.49306302251499273,0.14828097584496994,0.0029625745520825454,0.10721746931890738,0.7091833771875554,0.023768546531777072,0.014035961429969197,0.06718316626055292,0.0011739938296641639,0.18042408323565995,0.4160653769598727,0.032046008100512724,0.04079910540441678,0.042283429688711925,0.4905203204393587,0.010901175425373368,0.011834728068561421,0.027661048314683717,0.038949783009371144,0.09341646027234153,0.15899363934797495,0.007745635356261788,0.25727976934803365,0.0026633552079290803,0.0541530653595514,0.3152476571796098,0.001715196856696545,0.043964796832161285,0.20906942394840558,0.26224438988797544,0.010383056611924058,0.0053673383670391215,0.04515761293576212,0.009149333550441008,0.03742786205634176,0.013699189927239787,0.02924474867634327,0.01755987071451989,0.07294722269426954,0.001539819874683345,0.09820898488430502,0.020820764057560448,0.20208212485842736,0.031878757790241956,0.011169572337191618,0.012273671416891254,0.017412207478359473,0.13517780018303327,0.24502466943773277,0.20516905619316264,0.004818323743475318,0.8015998407087339,0.08235124319810475,0.5526926576852299,0.012530546258735294,0.06878648165513566,0.007574535969017018,0.008951361641031217,0.0006901704728382619,0.2562774195103388,0.031975107617409834,0.004075663594564254,0.013086413290779482,0.009566787855879619,0.019824488249102754,0.010696235307598357,0.011481309841763454,0.01260845660153649,0.33335765892740515,0.0042332360104117,0.6773539662765923,0.013883216202626402,0.0017097611322273855,0.5064765100171876,0.03247429416251485,0.4536213132035676,0.010120749733640744,0.004588232343846444,0.012226518376252129,0.017571264634104123,0.6253537306984361,0.11478719369328605,0.33305679177044833,0.0018323295905874391,0.13017157312985675,0.015127083149381042,0.0009318609441524563,0.03275222862527627,0.007599344436594249,0.02122267788079402,0.7340234966752431,0.2959980949169261,0.005175147809624046,0.3521449489285886,0.01788303065095121,0.04800120907623025,0.12463940077267883,0.005544345466564103,0.0038976060966308,0.27473971905193095,0.4346733609217935,0.2097495643176652,0.13152857678717195,0.005755701613596766,0.03860483660859181,0.682769899008666,0.0072087371842971424,0.002826994446737484,0.3608230396123451,0.08805626273864262,0.005380200790300905,0.07176679940150325,0.013588952298243246,0.05577926194869308,0.00023121359048292162,0.005098612897974048,0.017543725642413598,0.01658522518422544,0.07162910192480916,0.007349600789451149,0.12236733115121083,0.012539518197150337,0.006731605525236499,0.0028615904396199084,0.02325743417934317,0.018972024695614768,0.0051526754191327994,0.0030234561174424844,0.06576563238627578,0.006085646093537721,0.04047587953578449,0.012372121740276713,0.11563055510936526,0.009933110509351948,0.00688880109029666,0.019095226869886874,0.05503952934261269,0.08961668350852607,0.0021391391350666293,0.003166169206723326,0.2732536342433725,0.31946642615612497,0.0017718305106280297,0.12407589369526466,0.0015312757963386171,0.022410384240388086,0.0009572429140674047,0.0012929859334367799,0.021671798241136943,0.007595912785794327,0.04816099686026204,0.004518059597492261,0.5472591935391209,0.00875357633541216,0.7339070189803725,0.0045875661032378934,0.009554351263597032,0.01169459161440048,0.003972462185943565,0.010823845467334873,0.018933002699759043,0.002501239412847511,0.03543365119221367,0.303533112011897,0.0037053329351534447,0.007590435702810319,0.0009242359586669093,0.0005991042994064307,0.008896695668377802,0.13277900681352756,0.002005659187926451,0.04935229227599486,0.030311714473761617,0.0051586899537736895,0.0009674355750939277,0.6941642867590309,0.04211943450340958,0.0009719412012227901,0.03249858909508098,0.05290771079713585,0.00037060064176676235,0.001908770141880406,0.0053025485424634524,0.0014753167045879428,0.06339034353200725,0.0063737001399244856,0.01874064330603769,0.02169814926951113,0.157882928532788,0.07959495984380031,0.08866442286191402,0.01732195495898651,0.008491443738096635,0.009147240334464894,0.012907030081769244,8.58296659597762e-6,0.007822207618640007,0.01704341352030157,0.009475037803719997,0.6306974178588606,0.22341893674968596,0.02342913843693834,0.0006594775476717092,0.08277798398022121,0.5140038216468585,0.0028088020246523396,0.48323724738395807,0.004030631372738837,0.011220822057891716,0.08429185217656172,0.02185370430558414,0.028121555322434544,0.27048147852900406,0.007907142153660767,0.044023535843536965,0.022672710818249404,0.022916080839104156,0.007699328448297683,0.011274633876135568,0.007561549179426482,0.07262770569183444,0.012564318740801862,0.002048464763423843,0.021568256443142815,0.058024024741148705,0.1129605550806572,0.0012743094475580906,0.0060425826276509316,0.06323194149026504,0.00040745605057583453,0.36389732912891176,0.0004304043923429314,0.5831419976196562,0.06043817415152914,0.007560025259821364,0.009275880541021657,0.0006507064528593993,0.003114265121483731,0.07815061504611012,0.1062729309145885,0.012233051454759995,0.06091698606180393,0.015974512943945758,0.027940998212846565,0.01393383465220523,0.5398622473847159,0.0021152658300767667,0.007022722649334381,0.6072395420483945,0.05103173358473959,0.049305854352645825,0.000652477601952774,0.05008460055647792,0.008977885066926462,0.0183236175949291,0.02320935384556022,0.06960195889710359,0.08998930735795456,0.01983096164907417,0.5413246342171543,0.004049743545544896,0.008581085215255337,0.0003121865776691306,0.03986569769038014,0.015573600275899033,0.06273494483957112,0.0002037614845504459,0.003928080160570529,0.0007024417601188036,0.016570557007179583,0.000871812629714874,0.3114107945866739,0.0017373001155890843,0.009232277806369309,0.08826036620826302,0.005361859180061828,0.041419101253402396,0.007154122631698338,0.012816368733706748,0.0005782785158732521,0.0941163154647356,0.0004263123514831254,0.0022795106524332036,0.0043432699742437285,0.0004958469653589179,0.012996014976419938,0.004957128388263476,0.008511452214818383,0.013140881979951422,0.009381842086056955,0.01243286516440063,0.10059577021876731,0.01911863042866496,0.01875862545534857,0.01806702898966679,0.012257738312290973,0.008262326719621455,0.004174384024490609,0.672156087796823,0.003192134814790242,0.017974702932828282,0.00025093979118240745,0.016555884346260052,0.029644006925931374,0.022284163478985455,0.01514994368732354,0.012553207380226142,0.004152343463871386,0.06561117229833653,0.30539496792494014,0.001353254413827046,0.011759250579838808,0.027015963335595056,0.013452378221272588,0.010677858775705143,0.0005613292382546385,0.1673459895462592,0.009537462031765087,0.10961281254798273,0.01462698341064848,0.018146599787758608,0.009357738610034609,0.03737281072283943,0.021903627454321305,0.013356948864156679,0.012580820010832546,0.0035654761725205483,0.27923020340393007,0.4860504877359781,0.01251385811256386,0.009914427885572737,0.5932016819136912,0.006891849733150956,0.20183774903105345,0.07278219244955654,0.0007358805588858303,0.3913398241066106,0.0010573921588147533,0.046738195224669064,0.0016409320851894762,0.008740016113527645,0.01993121583500332,0.015252864149204329,0.10670381799004801,0.6310762670054383,0.003956410894185133,0.004377122950791893,0.03246739171120164,0.048354489871840045,0.00010471626908295075,0.009369688155828042,0.025588259802348436,0.6425135772672874,0.5341616351987946,0.049580860852127484,0.1780963372517989,0.00036842802744282765,0.2083098613685748,0.008698887024654912,0.051888680235685304,0.01151683927106038,0.009002821829653722,0.0017925280933248958,0.01303608322805505,0.03360935637904842,0.04009930274198749,0.0698464134409708,0.048104531688337004,0.40195579582962215,0.03903773708709277,0.0031800070200232126,0.0043407579017942,0.0636765361329722,2.6032361747345526e-5,0.7652151160744035,0.0003442090250640344,0.002976883375996864,0.3037170719708362,0.0009616516671022376,0.0324001947201014,0.025124492457860345,0.024525127580792276,0.016316709773546774,0.6557614848971244,0.03376628286504449,0.020276800044802413,0.0025286175855597746,0.0055120168163108945,0.12689610696614384,0.07083347738239393,0.0009374685641895401,0.08563662733983973,0.034139097765651764,0.0051597962314109255,0.6143347955092934,0.0137683568197924,0.0007376606876527084,0.007141189548269477,0.771500520892415,0.06521598625940608,0.022134898230493,0.24703257435860734,0.001173240545256548,0.0035534101465977126,0.02559085816306554,0.0268793837517809,0.0015324329751489703,0.03594510633232576,0.002637928698258796,0.015038014904063169,0.45036680398593104,0.0027385617425389475,0.0407980537465438,0.0063662028931623345,0.013716403172430813,0.05569907295260898,0.0010904424521403708,0.0005655881880954369,0.35219629648139017,0.0035199019945024823,0.008137495159939511,0.01824131393934093,0.1219933673855698,0.03378783977907049,0.01420208383631634,0.07995607927743104,0.12786484158334258,0.2276053023545872,0.0004045912368249594,0.5713427314786749,0.0033279095110315946,0.011936359141642284,0.5979479345235116,0.017995614662583648,0.0213963524610914,0.2154491067620825,0.010969482949461418,0.004764828776399304,0.01909368565470315,0.51065084308974,0.00010742181719881566,0.007203470086928645,0.0052578433673007045,0.0316551321747227,0.02023154079616281,0.047064087394822096,0.2253091500061571,0.013962711402420808,0.01565238925133222,0.011409190144310615,0.1975779988035359,0.13341452359046202,0.03330132589880613,0.023602760156705687,0.021657080538015287,0.47574469363216476,0.3619176308431928,0.013900115321967051,0.2502121690361735,0.0016955190397367167,0.0007645052678556529,0.0924145058435568,0.02846740900705179,0.03660144821722285,0.0031604455744228266,0.03552173452567395,0.07406087642682742,0.008320109915357126,0.2298892605637926,0.037631450395898935,0.01619032840849358,0.04505846571455566,0.013565099956565298,0.011094184002545618,0.038852500348063264,0.007783917501833473,0.04517331437042428,0.009433434333686272,0.03300793600563903,0.01932356755994456,0.03612189523127322,0.02102576529162598,0.011411295679542091,0.4144425073953609,0.004701821999409135,0.19813370569907532,0.006940055739226812,0.0649210766960626,0.0018493814557426443,0.012922241171146383,0.006117024434434954,0.012299072723023004,0.020066589200079223,0.0005811985481329843,0.013168394065131223,0.012281517187200544,0.1652554421333806,0.015814545731880344,0.05607202172210553,0.011380558461100532,0.15858003549475513,0.008223256602153431,0.04758071103644146,0.004080583308758073,0.0023780828334015276,0.0008931078947285858,0.0008491757288936992,0.08078211844191523,0.014276338626084295,0.05817017052867318,0.18950736662458392,0.10416253680444182,0.03270771381333269,0.45613218556061363,0.06338607955706803,0.07569695085285107,0.007804952983163343,0.0042212798153347065,0.006613185592595861,0.03708870578657686,0.004040803814490103,0.01131703666868579,0.007211718900055002,0.00045161790090370767,0.0011263672811878446,0.024474035334921374,0.0033447723068203267,0.1196845900130817,0.09021503040257815,0.03891904423755214,0.028440361279438876,0.7675181641128074,0.03295893837622539,0.002191167186459719,0.03624434795233453,0.002052540455729102,0.060283788137131596,0.009693597426982205,0.18124180052288102,0.019066705809944184,0.10785717548310281,0.00035759307081674555,0.006617030059626524,0.01125618139329017,0.0012455868076793719,0.21121345976416872,0.004814158549869057,0.02883606490676544,0.007295248640107944,0.029796298396609293,0.1388503025644361,0.6188328623725967,0.10034667030121153,0.07141713057090729,0.020797153514995528,0.0014622256191696111,0.06745412489943776,0.08303191814641686,0.6562556509473875,0.015971343477177515,0.028627170361770125,0.006749073586482725,0.01706663711909974,0.014873288578456977,0.002275939663527478,0.025783935824590484,0.0017740197359170898,0.0133335098651373,0.3871083689511896,0.003437052498168882,0.001745258588011194,0.03222489743526477,0.006207988123410122,0.008686465116301976,0.06088861143081781,0.005457839996118327,0.031195599943310736,0.0019469376574014266,0.005141733077517603,0.17832309613686592,0.5646267228792005,0.4904802587139746,0.0354147024205069,0.06524876649688788,0.007478362137751334,0.02162633570477173,0.008322161933874916,0.03481974476643205,0.012241452169079136,0.016564402044665763,0.06461914406356199,0.006340905022122613,0.0038389633208917523,0.00047185081738744083,0.032829753477282744,0.15267756144603217,0.02555994770642845,0.015677643110714286,0.05993452262823414,0.004112955861838514,0.0004822845946166495,0.05664270435103438,0.0007415465169205144,0.015701896410736202,0.09174887983860047,0.10947381626258018,0.019141017551446034,0.019606812186945318,0.11037544961023277,0.008355739893210408,0.00814458506083405,0.4846323955589876,0.00949909517874957,0.04434457303425079,0.0038496941960617704,0.031192433790255263,0.010499799576921778,0.023413527215223447,0.0011425326962466184,0.07501571835135407,0.05369497846947984,0.05065378197091451,0.7443274104102648,0.011072157246917173,0.02636109667145862,0.0006035331635608372,0.039002884056413306,0.0022642970994573544,0.4352145145821893,0.003021035953351763,0.007839290929553336,0.05046095554634504,0.013441759746337064,0.001934626427083152,0.2391062971870856,0.014820212574205476,0.010714700744841307,0.20396120324129854,0.0331752315545933,0.003070245247750567,0.7136432384722963,0.0002986509294672225,0.00038339431033363006,0.003910835993058577,0.0704133735267651,0.40822001878058733,0.010450752536283818,0.5581985747626895,0.012177224188056265,0.026408948304334653,0.42845836297923756,0.014204960833316427,0.04290448001511332,0.006540877462443408,0.013316215152770141,0.0006152199181104557,0.04246883011910638,0.24770874219908268,0.031489566309698236,0.003348118792733859,0.0031629108286681303,0.018688168227270565,0.011073666536036936,0.32340130076438006,0.0009143088683827251,0.0008398499857347703,0.0030482510615404083,0.005132316179923742,0.016726807642273273,0.2044115613193167,0.41413030862439,0.1601810355014494,0.009109005600288982,0.000496657716118127,0.0022404501067344357,0.009264527081007118,0.002034395268334274,0.0007362866414054031,0.08422271894438153,0.16525986747967533,0.02259375581191063,0.008769293474122405,0.09423080114942994,0.1444369925430366,0.015580959097580047,0.017655228876760937,0.04346554100355823,0.07213529232495307,0.035353853944612094,0.02782808335411315,0.008813518261668617,0.026516264750427062,0.062337893285659356,0.0024350371791677546,0.3160985315766972,0.004025462606253693],"d1":[11.414506434624458,13.828650505527406,12.676313347625527,13.177078745201491,16.053785781332365,11.620079304127955,11.53720323848237,16.11756213555851,10.392941020194325,11.216798609139708,10.821913665009095,18.367441109977094,17.7259007376,12.087854954838175,18.895518644009048,17.352510351774292,17.845084746452265,10.38308749199153,10.244932073940205,12.201815857628088,12.484376502703983,17.47610505336761,19.61335915673879,17.721967383670602,17.004913463005963,14.343407676441265,17.38540348718639,16.888569642213888,14.068135403932867,14.514654217854373,11.205477870907263,12.977877097741779,15.675517024818328,12.717555634696073,12.754058031453198,13.907502627293473,12.981215008686888,17.42670659170657,15.056619033342857,13.811504420794074,16.083987257889017,15.586300948580899,17.022344317564876,12.344596664485136,17.681784386908323,12.766170595620082,13.02340434354646,18.663226397256626,17.014746283065584,18.449125580024653,11.74249597871972,15.13941537859205,16.106627698132748,13.137767224205257,15.035430007835298,17.545317239629803,16.177950978956197,19.602612717807943,15.327918221714398,10.041565029045262,17.663310406047945,16.8284793001716,19.79202501896232,14.651863584849377,16.182795026194153,19.605910326639247,15.354406793669328,12.89534126820663,18.870671463006882,16.246947476655922,15.454059378635026,12.761552888096183,17.827021570926824,18.022300037562626,12.978371058501729,11.720578117341327,13.218105763276768,19.861254960890193,18.217151356707706,10.97028422479774,18.25567651892625,10.221546001446448,16.826647407420836,13.318715117867795,13.991403856204066,18.30564778958326,11.967604642262897,13.407556033585346,17.17055850667629,11.991051892377694,19.317077308377602,15.173419171251535,10.258966065731945,14.771502107607766,16.64403710899078,18.46957918544505,19.65666643103244,13.574816969953305,15.125187024157857,18.06370360352365,14.223502241279824,15.112679264709358,17.034173242326947,12.247300825703329,16.211838189007366,11.674666452856028,15.297944043975251,16.7398778665505,12.743764646103777,10.157887515852494,18.025530268664443,18.925145473039148,14.525527652938546,14.807030279735562,14.03728941913714,18.35611505836086,14.420377479799,13.657762164492098,19.600810402664973,18.651986303199845,16.638833576368825,14.266171276178017,10.668911407058062,19.8760750120168,13.378568324319463,15.147873986036462,15.257345787961075,19.613953654233804,17.639522601057614,10.506641589159473,14.088406718778401,10.203872452022091,16.733259788889413,15.182608789199817,15.216677653249995,19.93406467684884,18.114906917542054,14.228948668216312,19.548664520899973,19.336767025211728,16.271949203900757,11.156096963701849,11.434061167271954,17.214618042919504,13.822865879480737,15.415734955246027,13.869240166661722,12.272389666791332,12.025433734901721,16.351049133696407,10.71591597705389,19.736611753868054,14.798677762220363,16.89918824736266,18.878198592471755,17.905686997426137,16.70646217567787,10.819011352233085,11.231928897117564,14.613744235781084,13.947761968270884,16.493465246025988,13.449639527001743,15.472695901141806,13.415428067223406,13.481257205396371,10.80367110971482,10.56616312479456,14.549047106382604,18.965456780663423,18.060976760079036,18.96459811372553,16.32731271499948,16.186608543239473,11.774767540276308,19.503491835450827,19.76661563892248,14.365957094183857,18.64166418969263,19.455750606753448,19.27312183172964,16.754850862448418,13.768890849657234,12.685911291243652,11.837364933148102,10.584376921516313,11.025183188393937,13.33642208618809,18.575786283503163,11.371496743077454,15.639716414079688,18.102083276359874,15.741856630555963,18.13262566263265,13.242994956654208,16.128450381302503,17.201775955098228,16.79666250042199,14.588889137587556,11.759472250888729,17.665844291164046,16.406541548997254,17.844928537049448,18.79788457810846,14.702691670617405,16.14666608221554,17.444247447369605,16.211069421026306,15.089215757847814,15.286972891476065,16.11592157626509,15.963932895332352,13.894656513593294,17.716040543810998,13.728470073178299,19.04008768740305,12.44981717275294,16.171419838576824,10.904923987187487,12.90793842857367,15.36267376977458,10.27368036171741,18.04929400997962,12.607145942868778,10.410813863827368,16.082031854673488,13.138354261980732,17.069367735292165,12.541598602120443,16.656133311959863,12.402811344578295,19.057957447570047,12.949059158358185,15.243880217238745,15.403839160779455,16.078308882854095,12.062825556389354,19.203211385443453,16.958564846357845,10.297280726455353,18.480556196959583,13.82178041921351,14.892352879986968,11.088593554937454,10.283178430079092,19.236464121020845,13.575894327542429,18.841062136371498,14.070225256709055,11.329746858725338,11.305164159444217,12.931412770217579,19.208943928098947,13.758033867969502,16.911295353250253,10.131351629325769,18.37886072545645,11.479425854529655,15.88298014338966,15.7742260488112,10.160481100364134,18.555765629077946,18.28830018439075,16.681799293704238,18.761722187093365,12.77564370367454,18.54300023014524,18.825974588614624,11.967726233891419,16.356242520668452,11.009255426718381,18.29346496674823,19.59001665246656,16.215739650272006,15.35128621524209,10.426138915921207,19.83219988152129,12.327050139049847,11.059618614071105,16.67996393408748,11.58720793043508,14.955987929255931,16.680511368885508,16.174989096780664,15.928732021554488,16.60023672986994,12.347335638484369,17.497763931120875,16.32182801118082,18.175761526984797,19.545866646956355,17.878579614413773,16.82819431118436,19.340271906648532,11.050349205676259,11.861423363725208,13.90921254048285,11.83898103634079,11.674561301886781,10.08129513970626,19.444799981259223,10.065579824897712,19.617450006773435,12.052391169543927,10.507447457203057,11.62497009895354,18.554447208560095,15.161767562301979,11.752089287132943,19.493893088162316,15.240570791880447,14.327386182397335,15.994315226833002,16.58387691383231,11.973905053115534,15.335210919045064,15.381682976060935,15.084497507962533,17.861053823926383,13.621299675765869,10.459796234050536,16.5231586730351,18.205860848387708,19.28020422200587,11.245412911920727,15.003695701365466,16.164053731215418,14.700346942538637,12.260955535697633,13.818320332499566,19.53228420593832,16.10651999591937,11.29491138698127,16.918584207338228,11.97353074806063,18.760170478666993,14.129317594156777,16.676617734508017,14.782796753156706,16.668991013289535,14.056804205905566,10.357266848718103,12.773377132927969,14.53500590576336,13.800536784905596,11.091628974349025,18.756881075501873,10.074413442745955,10.654424987420901,11.376689293394328,11.21031081201739,10.73149001747495,10.019983224130222,11.073120908067036,11.80864591633468,18.85610752867661,15.081127480153512,18.372137205521526,12.352711083996743,15.97055557742878,10.785000604803528,18.149778005051605,16.251755138917847,17.524548609241677,10.0435035995561,19.830429392813578,11.31703446701076,17.446078436251227,17.669550186538984,18.345733501151003,17.229328780547345,19.210365587731967,10.43014474632085,13.784776332963142,19.277067188796643,11.491593458983917,15.075368024951395,14.598972668087226,14.475727641078786,14.014808372028995,14.688812210282421,12.203692797924466,17.963867784827425,19.001217657679135,11.572256713976222,13.951100230254482,12.286816989909736,19.51465619120547,16.894770565395564,13.993377383715007,15.303365968158975,13.932912081512256,12.49147279401437,18.18607304727159,10.443817321482559,11.376684973029938,14.020493864327106,19.098939794527837,14.443761397128354,18.879753054528727,15.442335017755372,18.75043709968749,13.99522771557028,12.401950618836647,13.232599688099832,16.67166716636596,12.710330881240075,15.74763376979876,15.05860276146948,18.346041688079907,10.216932446010777,11.63545009133765,11.780914891672028,12.20726597754706,11.02675305268684,19.958975547771253,17.9263833642702,16.245620227987697,15.382020548220908,11.68115157415895,15.128194168596291,19.846757839677426,18.18534369417303,17.19803424169378,18.18501341104193,11.459124756580364,12.205848894793148,19.760277036148167,13.47681676752616,10.395493592684549,11.308073238916585,10.073015336098905,15.990439642588107,10.00678312560694,17.76886508697819,18.105149893289543,15.319518209218066,18.833601112483233,14.080268831619227,10.413115421988476,17.238870668534933,14.1957318415814,16.093394481950735,18.112768505199234,14.543687465704359,11.692443758918893,13.07050240413524,14.49865097603121,17.468848877887485,14.700429406311288,16.48365024342173,16.76321595198172,16.17460043067326,11.9617651443441,18.466798366252654,19.248839143771413,11.377820611444927,14.761445293459953,18.438663214305393,19.1288547705459,16.82595304353928,13.521756654665163,14.44906531422258,18.001073191440234,15.899425393875795,14.235507574335456,18.228843781430662,14.495484837416628,16.632669381827455,10.095827440267255,13.6272536184634,10.880547247536622,11.72336482698867,16.32283667215094,14.975914909118737,14.6288469774823,12.85580307748716,12.61920718358963,13.555638796496412,19.15846524484508,17.64155957431523,14.64767573703876,19.092495289663184,18.121413576771985,15.81701641845893,18.78599903729708,16.57756505579892,18.35200289901146,14.642468037900077,16.39706086081686,19.838831092807094,13.814209342482439,18.64125395680917,14.332518188171662,10.230093240204683,17.001670203822634,18.27319188951606,16.433362497936344,18.493045340189404,16.440460807698145,14.642370182898583,18.531520651564485,12.265553490503496,12.778462892580079,16.797830724828373,11.930927116429384,15.43358822370151,10.71631212018641,19.12900282296718,10.588384529637382,12.223021900924493,16.4375904007489,16.216664940583833,10.548544371296895,12.024404367308595,16.440772003387416,12.584319916904134,18.79305065494938,16.490156652182865,18.258459464073837,11.396994434351244,19.239613528414218,15.218073046711956,11.017180712215842,17.151878042704347,12.683131327358218,12.818550384079062,12.83908037219021,10.38322134265481,12.545015847236641,14.876743183662459,11.822088333597822,13.78474618282713,15.614178430070329,15.388975339814245,11.614293315497985,15.93873204262425,10.757034148224333,17.458237615806876,15.622109241840292,18.113534906739837,17.147365832617197,10.087307337874288,16.624668250482774,17.78944961918473,12.409654696428305,12.00641909748236,18.679488108502863,18.879026124593125,12.004120965977222,11.708502397021297,17.77082590991446,12.22241843822954,11.406948529396617,19.958465719280177,16.42786484459459,12.239707105026179,14.233246589425823,12.183702651170488,19.69315192832161,14.817664185946992,13.750597267069786,19.999701943247842,12.832397807443991,19.6169583211287,19.30458589626241,15.186701615120112,19.560447209021163,11.67882823661179,14.905197590068099,17.626274573187736,13.119274563173986,11.679683178050308,13.358333613013023,13.505721038719765,17.818957518300383,18.383169655862133,12.132335758271608,11.24113674175243,15.892081626994827,10.966631116966898,10.168405151952435,10.651566116782607,14.911574599384,19.27081686708636,18.000763014772943,19.430979799099283,19.345963471597134,12.77076179522458,18.547068532666714,10.590247495173333,10.362294134074236,11.312915739798282,19.35262002022279,11.712162541931875,19.41062188861908,15.53228791025807,11.564309343382547,19.9900938179024,16.775704415594237,11.410095132181786,12.221000056824177,19.25860727542929,13.3501667934289,13.845524194915148,16.490218876104166,15.812223739056675,15.229692703067846,12.464810718607982,15.248676015489524,13.353695865592442,11.245583261983107,12.059509882374826,13.540894097907492,19.673211002194094,18.34491747039258,19.883259755219864,18.705643561995004,19.087405829416408,11.652443173778945,17.080803249762695,12.260402262082845,12.303035784376375,10.698854762878202,13.36879732673976,14.27779071010735,18.544375716706206,12.368545603737612,10.264602451097309,15.870499519316708,11.62153980017389,16.859204587514526,10.789334556272063,10.604087638536582,13.003625472634283,17.992068615092393,19.828534884273175,19.15121025149109,11.77859957147382,11.05421415094919,12.90882875082016,19.719114883319513,15.866052498863919,17.535956478759466,11.236614724792762,11.52212249585003,13.03111877814915,17.557121513872076,16.746865439589776,15.259548377181762,19.61619884961748,11.552599934863018,17.007588649266744,17.04952483976452,10.545422304164715,18.696632998990566,11.762366488662883,13.330661722723,11.566256286477845,17.44485784602085,12.75364096454714,12.772139495198713,19.20327243426552,14.214048034200655,14.122346222956772,14.919793677034644,13.395427585673769,17.12317883570026,17.370417831434864,11.0479142783902,12.23288395463155,14.248823611333467,12.696365568253889,18.822410348204205,14.435620072453277,14.040525684499517,13.161233532794563,18.285034400245717,17.103115205053324,12.147424594881764,16.26619955838845,14.55553968002042,17.77873098415126,14.43656693150276,18.05562336945425,17.113173616407046,13.756801414196843,14.982406463198519,13.548012863804257,11.850419170238464,14.809207691806893,15.205019986104944,19.89195314768495,19.618191465431387,10.680617610314806,18.561641510562207,19.234476415853567,18.520576178126504,19.605423313207886,15.084676035777186,15.394148777465995,19.860225435531767,16.310493648506963,13.14913873849805,18.93727249521113,14.492822003163766,14.450651636666603,13.554562142921252,18.232508447820795,16.377154895611426,15.374353773838795,11.487793903948901,12.87074164922222,11.805136111051562,11.832448882456887,11.66284533612096,15.55840346396748,12.598178419597673,10.78600282230014,12.403683935925681,12.7358274492497,11.558707398143188,12.96480061099504,16.22949921185465,18.847383015828377,18.642282852822348,16.74882711090989,18.629872513709433,18.690933639969103,17.01130582461265,16.93312742008394,11.94981057206973,13.065811325600542,15.900037646761145,17.4096908948865,13.904053450567908,17.284983971485424,15.669809034266851,11.887982939776276,11.977605053126215,13.295388214643019,14.398349922771922,14.95011239830632,19.240372674872773,12.066068963559026,17.980689705955765,15.117732787689517,17.127828075556717,16.425450697027138,19.698323672538905,15.599531687211385,14.071448063146772,17.108249041926562,15.678568129060555,15.624346485290864,11.291193500545676,11.536010367659436,16.317751828149504,12.578575750376164,12.614333932137903,16.158100708104307,10.078041400642244,15.647861044452709,18.69811049922886,19.97811281533971,19.36887781169197,15.952273226929407,18.58101955323614,12.498605413843178,11.477883049036448,16.54961559744205,12.376995787514268,11.830805494545567,16.823359009441425,18.212969527870666,16.42914866896639,17.35333255598502,15.373976992222955,16.107533797899677,10.946790077960324,10.0442122056546,16.983554851646485,10.388247768688954,14.53940506771984,12.185968346398475,13.572978952418245,13.735076739250793,14.81998515122018,17.534882785950614,12.268571486599294,19.784239917732787,18.18696267315766,19.74964333457482,13.608751705939726,19.214334367017603,11.441734928801047,11.062049469433388,16.450384431762494,18.401481427838053,18.67808990394878,17.615555256789236,14.13781205644208,11.428088703206283,13.701186840501375,10.240724703985508,10.518836103201787,11.951405254561866,14.609335284231985,12.41328407991804,17.546400470220306,10.498284998060317,17.072302531452223,14.930962733366771,17.144149665302944,15.287979534837348,18.041805172894264,18.43329471234683,11.28371413480436,17.294567165305764,15.037148495386106,13.824998053282137,10.350206060289533,11.50061050093697,11.454024959212493,16.54570619082152,19.07121585569378,16.022900154202947,15.328188770393226,18.214528075430735,13.523257139169644,12.184973806375856,15.90018404201402,17.082347184172903,10.416696381852562,15.806645131498204,15.206322170274111,10.810528758962704,14.593059171347125,13.948587581462156,16.629024474488855,11.702303569581138,13.05441872349128,18.478164038002063,15.232141851748231,19.624082928996458,11.46767371315805,18.649169294273946,11.565484460930993,10.577112544850678,13.119284796743958,17.52568880472169,13.327363847371597,10.862901302046266,15.35125289266017,13.351817649358175,11.658899950679462,14.193779577273151,17.089491884436548,12.791757641611913,11.006197007334727,17.27553125905554,13.428180633098968,17.086832848651234,14.685248187378917,13.666138827569291,11.909958332771335,10.068159797774012,15.878926167163348,16.47081557552394,16.76753412661656,18.247194355870608,13.821963344144644,19.444447184187382,15.559817874374566,19.178932908030227,12.986249501950855,14.286827810747448,16.657106308841694,10.845480615889292,17.00603090550762,13.425770210578975,13.029146708098668,17.639021330921704,19.184145111093923,18.67096375807222,18.60775353444037,14.771329626216579,18.107951424586645,12.232186609653123,19.110723918135797,15.237806486566463,17.433870235108056,12.467159990572283,16.61155168271086,19.040117045947227,10.944012602910885,16.379080800414364,14.382742452116634,12.388162617963328,16.544906427720843,10.738939362429106,14.452011988968279,12.65295413548731,13.241095821654284,19.730500734290665,12.324669806722428,11.240345378298667,18.956163978570252,15.69896394000121,19.102847692479223,19.32099096764884,14.137992923592401,16.649394386544643,10.858365448237858,15.2618507740865,17.19040406442642,15.892772458796404,10.707441246129134,14.825076098001063,17.83871578513118,19.204132403617784,19.610609361929306,10.160365480858793,12.207292599456029,12.709600607675293,18.649378238390938,11.154535378123045,10.728113348861976,16.24546518159726,16.278676123753016,10.877543752969654,17.14997987613044,10.391182773227301,17.11142401720018,18.415386254931036,12.000226788920735,12.101262538468788,10.610595944209946,15.21026381559549,16.652777232753287,17.99392789200475,11.395336963299203,12.189016264087257,14.536289460371892,13.93556643030224,19.97318663689629,10.251355417717017,12.298702088096267,17.64132297368106,12.692879983786993,14.200755715964508,13.264061641549281,15.63746879880685,17.174144061399122,19.760870366222857,19.903308152014755,14.699945661655079,12.810258108056116,13.686220780478088,17.758948029808305,13.971814264356698,16.36835533023835,15.63133921402219,10.988003550246255,17.52348613279487,15.53868059378007,15.775770144380378,10.126293226010239,15.650423219046097,10.712325189006588,12.308612009050659,18.75255523840881,18.996140234906967,16.0120541263581,12.378919043506912,14.54628544157229,16.55426310530042,11.794991965570938,18.997142149265823,17.43095139646875,18.22973431434907,13.652758294685718,19.61462713142683,18.869517370336254,16.56037064448228,11.90159984609645,10.232539989968132,19.60957821580609,10.196035631242621,19.017326118618595,18.643081228224055,19.76888199158243,18.311862941694088,10.70714726517846,16.92768866207434,17.69133617227214,16.57256962883575,14.541412308210766,14.621745579000722,17.185348157776694],"x":[8.152550511274884,2.518130695543086,4.633797431049942,0.2279382917512751,4.496548125218707,8.903981986313312,4.580149464064989,1.672581978615788,6.408875230915372,7.524849465822117,9.594906875350492,9.156730638417894,4.100637733936409,3.4523483934961186,4.9862989412013885,5.919534613236486,6.970499273821011,9.359787936888331,0.36281592575803323,8.50004685164551,4.910400084358626,3.0925931336465218,0.8228536019647059,0.33677355790797225,8.567553623137174,6.474404623114934,5.509519101718457,5.524158710852866,2.9269877846191172,8.005019510894346,3.92948413607777,3.002010998654403,1.5529567402343636,1.9195079346091415,3.5762318466089704,1.759981171854248,2.9900388533575994,2.3796356199538238,4.458324279390555,6.05416759729372,6.147456541533871,0.10842171026859582,0.5173766061976481,0.6714364836980402,5.234091042533821,3.7626544843993814,2.298831184070167,7.638176496885205,8.278905421003904,1.4606935574509938,8.439413752564144,5.27180004832158,9.336093614973569,0.4235530260667275,8.14302197102126,8.32724879326328,9.696403736070078,8.694397757044568,8.577984465631737,8.39736155182641,5.349791547318709,0.5630248883026212,0.20384808343635097,3.109642141859834,1.3083196101892858,9.252265279129936,3.3095913133217603,4.791494833855026,2.174701263542287,6.910809142829022,5.706974914440255,5.922282618832875,4.3948692960940505,2.8381114698647525,7.2103171493227425,6.908580298922398,5.7292522928944045,8.165172849306435,6.310242302630995,3.3575034206746746,2.0089512032698287,7.521346596505952,3.7045872441968486,8.68725428415301,4.463665356877351,1.4871441297417043,1.8097314775512685,9.440342016798022,3.8646498340522206,6.173788834398318,6.100379679530157,5.018623531134974,2.5855500787997676,0.7384388692915733,2.023905879220116,5.896193709875,4.071837737043462,4.394118997781538,5.348388012642735,9.022435054125369,5.67113881135751,6.091428601451421,4.1874887552303885,9.225852406771963,7.663970186463023,4.497645121977323,4.196418202899177,7.945178964773669,0.3881063748541447,2.254849490501374,6.177751692964084,6.209912363029688,2.6371508732698135,9.352466673829454,3.0947810628395978,2.561495302797565,2.097544700902616,3.2456177912148143,6.281997221016913,8.24211924271578,0.13302411678859372,0.49956993623558654,5.819047350140599,7.753140838590746,9.628912035496892,7.725002534171271,3.829259506679268,9.35333328144388,5.30322557749485,1.4553841618935137,3.068669117200735,2.7458707503768953,9.183396075879156,2.8929511680766584,9.433363269440374,5.044931316846979,3.7689056770186125,4.779805189730244,8.066444631869004,3.897194423954209,6.579826985864741,6.058470375581897,0.850463146486502,3.809016542677748,8.672520312505563,0.8858025128137337,2.673935566190322,1.6296470955910558,1.4044212776437681,4.981250967735853,6.610037427292967,8.75696136155737,9.763053650419211,8.239697575445252,1.1474851485054582,7.825417770543142,0.16556501798712375,5.25227320425172,6.3041999318425646,0.09701164463278511,7.630197968565935,7.359734512420085,8.496909292092043,8.778695872253838,7.827814507820641,4.340894165826508,5.766585693591361,8.37780297550214,0.13384951343430096,9.516709327054969,2.652488025823958,1.2128238204311814,2.311356216344169,7.108371306949344,9.428177398212732,2.7037414871151455,7.397893963015885,4.898756288717674,3.6350190515408154,7.680924630390276,2.3741458679615057,4.087819996637352,0.6797809860684589,2.2077956639847685,5.1262764088945145,6.7618986556124465,5.5123717578712705,4.541027594077782,1.3525885477455124,3.4311509705988885,4.712818552669821,2.965470172112288,1.2214028118636011,2.955202246303612,2.061897701201596,6.886315220827002,5.536283086092837,9.285595195637484,9.020493238392412,9.693033777436046,0.6782936413168383,0.9513243968123986,4.009441115944419,4.669659172803701,7.069137855439516,5.202792580567188,5.508960789011494,1.159358827569359,4.341578465575681,4.442435808650636,1.882391563171224,8.446602134449497,2.347138720024584,3.1546445103701015,4.990169998889645,9.538009736070084,0.43529367387733053,0.9806961669743375,4.02552293295761,5.59144675098485,0.034044796717120906,5.854171692166026,5.274639494523779,8.737174900910558,4.559466292954211,8.553419184834148,0.9674198511789012,6.519438496206929,3.712129675481528,3.813664490766513,7.991312800715955,6.264989872506275,0.6613932803068967,6.799963005198251,1.2565569267170007,0.09190564902236131,2.5194734515452533,0.29125522524693137,7.77977969235967,8.3135337554022,5.2626323743259995,4.054223327090498,9.381391653555545,0.6450783364809154,8.097795526957723,6.748883325999966,6.597850340506239,2.3891993761113506,7.374533381101118,8.296563442175003,2.0025122595901634,4.328715182853724,3.830042377537235,2.0697785557804527,6.576627712778265,3.672944622096843,0.9151519538779751,6.791479528297703,7.820506457680589,6.712476224301032,4.613124350284698,4.538889080897648,9.224464352061126,2.6081753161977517,8.95559600137221,4.995625796206515,1.822714379388013,4.872706298940033,7.231855515875805,9.735415400013848,7.457443437341209,5.690422314861136,7.205055232891868,3.653726249314837,8.227492901491988,8.480630996499814,2.8608113757111897,2.3385638574393064,7.724633742777551,8.258018813819048,5.335956252543912,9.789282861357805,1.830454914690498,2.4722818835525784,9.659489722202254,2.3136141254166076,4.110278893035786,1.8015195552799446,9.314935938322218,8.142069109333313,8.134242951018502,2.2789233951420163,1.5633438019913237,5.657638790801549,8.164300050993825,5.9428150392013945,8.591029252193387,3.1122495241665127,4.174407527754338,8.299372789301732,3.2511058907453783,3.3127523939983794,3.668784371208458,7.560572985882265,1.050891216982428,2.1067265387675715,9.578618271182895,2.5327457655324626,0.5403275752473524,4.847115159769293,7.0861549802762465,3.0464188916899326,9.227355043677372,1.9900874793018741,0.7900619107288431,5.008519072010564,4.03922664759609,3.827170042446335,1.259683191650205,8.248749781024316,4.385930025324376,5.383248096872711,4.43665683431874,2.525101840048296,2.089101181819184,5.290846155183182,1.6701762409410792,7.984178873937566,3.0229703141893527,1.4621425001087385,7.942316198790862,3.770476720145741,1.6800244407114895,0.9199012746398738,9.386515644617939,9.788169545009008,3.7613372834625536,5.215472059569743,4.26794378237632,8.30633295804068,4.8398027008988524,7.530689309611547,3.107232517821228,8.27007759143662,2.513597268224985,3.5996426966048545,1.906430138819748,3.547959153490392,8.557291209823418,9.635577612740292,4.616669624568129,2.074211841887319,1.6966924674006534,1.8669493217748379,6.858876842627188,0.7259722625854637,2.8939017640422215,1.046353171952079,8.064701297784545,3.0137595752719593,9.596182129001479,7.279632508529296,7.978765320653489,1.61734318237859,4.968104534575435,5.596735138612821,4.544399850498964,6.8414140710349525,4.989438730444702,8.753551831852178,9.004233141903267,9.463344478788294,1.4760018316562684,9.343986548319695,0.668163953971499,8.524173647222707,9.691739613774288,0.3157181120353503,3.6199114431519486,0.34875902904224265,5.56111907290939,7.238713397262968,9.674302833334565,6.645243347322549,0.45819666585363406,2.433733274784604,1.0961266060369046,8.587643670050785,2.2421849625574874,6.761615787205324,8.40776642944923,1.078419355936533,6.849036971091536,5.483071616622106,0.6412540015703327,1.5644887969753585,6.794687519500322,1.4702463280270073,7.050073978358624,2.8856202123105956,2.2789628429390962,6.959700490803112,6.378929913274741,1.6540186357675668,1.2320346864950271,1.7311246921367252,2.2271087013184343,7.988353637287988,3.6997005415058837,0.6767726593223067,6.154539619750354,6.18839274014986,1.2046644084218028,2.785208170329847,6.3542208090107355,2.7958104617572888,6.1125464118164725,3.578101221164789,9.888627374023887,5.947039302799797,5.056146835627347,7.499717071931615,2.7419230090556246,8.34812348557782,2.3305240625854284,8.150720842127905,7.440212269226447,6.530079971261542,6.262222386627299,7.0484778495239215,7.3084922147320475,6.1980820207295295,3.0601812240597304,6.682192174218851,4.345770435569629,8.161765609079907,2.29212158897657,4.3951482727547315,8.819415467644287,5.904591985424801,2.9757344868106173,2.528475979548066,7.320142815659565,5.913381002551108,0.18949270560403297,1.518085206478783,8.270061382468693,2.3630012990053273,8.895546879180891,5.780718419909365,9.003353254398462,6.690901781943285,0.1563756194173993,7.773003660030698,2.916535204402577,1.6990694095439918,0.37488653978862807,6.986544395153558,0.7773667094103387,8.528875019064039,5.885514846238551,9.865295687686578,0.07306235558174778,6.013453251154806,5.280884378911459,6.20264998037908,2.6335242485308497,1.6010337451844947,7.690733157273623,5.093136774671489,7.908389774541487,9.760093687858722,9.29733481515532,2.2726717628972115,6.24786850778664,3.2766237874690085,4.537475528830095,7.180814244594003,8.25379618347226,0.7173223465431899,3.319984587670526,8.159461864040601,4.134454471996083,3.5025626550820532,9.620442638155943,9.261355794972717,7.346832067934472,8.316183688610202,2.9191458517669377,4.82172595292214,4.059465041372283,6.503047368806967,2.1192565963648846,2.9694315386097614,2.758607138651603,6.105387310547139,7.782512203228467,5.7853833689533225,9.066094871244294,0.034878688269228686,9.350118339894939,6.161164877819942,4.9677160161094625,0.4957514851306577,1.8258310291056956,6.1998551250051825,9.760294118141044,2.6118117293234966,0.9329240479032008,6.85198219598687,1.1099044931975244,9.839091256669779,9.80777848348196,2.6591482989641313,4.332333948012447,4.231677225095205,1.5130565852619693,4.9478653809480715,3.0234887752070905,6.292361854337134,4.965191067298676,9.664513844961093,5.052774737033454,4.8054448474151235,3.124037781876501,5.335580136219489,9.327191332424917,6.198381398843198,3.494958920616582,2.4637338646611173,6.944072447575975,5.0340127239491705,3.312858441510693,8.86155145005625,1.131044224960549,9.78514702800286,1.020349427243572,3.4138862837668404,5.448446233398762,4.746816516706744,8.66037444366404,8.742387542772752,2.810347334563401,2.5559775870424883,4.5673069814418366,3.395886107689703,6.0936137204146075,3.9385240754415296,4.210653244914062,0.8183784395733684,8.192992758671672,8.770746963718336,0.8319680657573314,3.2896432499922446,3.7905287169232915,8.755359123069743,3.8411199595185663,5.94906754847917,4.620732318243377,5.098559963604348,3.185723364869484,2.722920113304317,0.11574024941557903,0.3860676615641512,9.239090710202529,4.5568261472752125,9.19200912024211,3.858729348241494,6.55202755137897,2.8605297056514245,9.884429443866164,7.443573156564023,9.337750417182324,5.040506135923684,8.669816107830568,1.4255672066521985,6.266489794363439,5.755098565675423,2.7089779292633165,6.447224795171911,3.5971899531913976,9.343821003469852,6.66501798243178,9.385993900117995,2.626012472026935,8.419517969927135,8.456922573015667,8.256974208646037,9.223578582554016,9.105363714816871,5.49792709806213,6.080855738430748,0.09299218303457701,6.097688547289952,5.230083066215037,2.6282803150184475,5.9154989382753165,4.810071034243391,7.388127307961776,8.893575614421625,7.753125084853949,7.816101723271885,0.5328469752154108,8.775374564925764,6.793130633843973,9.90607717733156,7.891614008186297,5.344787842132936,5.314160830528705,0.10062498954270804,4.914773932041525,6.948603299482294,3.292269310181739,1.5497926427284225,8.707970560683254,8.927777733683914,5.592468956440484,5.367744943831769,9.314352933502384,9.082133767732989,1.8057890943801524,6.514538542861519,0.16434543495492893,4.912787864757453,7.2042593804519335,4.914455333003421,4.624504770422886,4.282923360124215,7.708949723405755,7.3220124573450835,8.208897846634425,1.4067515645834416,0.3073337063299242,7.427617566876997,9.668846026438473,1.0027280709946917,9.922221107991405,1.8952830249868202,3.000115553907714,9.157823095309592,1.3745616528250015,7.093472221305395,3.281364578687642,6.6625379946261525,4.789697872181651,5.586482820641088,4.2525505445937135,2.557301538105532,0.7026064022734624,8.01557699954882,0.11459887469820185,4.813425213729172,3.384622923064502,0.059085355212338264,5.776952853199102,4.9526004296889115,0.6026980252149627,0.9004969416419883,3.71948518308308,1.9958643994883252,9.495825471842938,1.8645577879993525,5.909584193504232,3.670816985527172,5.59634265576284,7.215482907543751,8.178058001950292,9.333285398172766,3.910867284027124,4.401131382424821,2.703198171768404,3.9358266200904324,1.1569961547357255,3.279530721311257,6.993393672344066,7.842590263399865,3.2033192203905703,0.0528600197694562,0.704046875990072,9.946621970411297,6.171613936763903,1.0861478260366053,9.399735905631733,3.37153381624967,5.977035708959784,5.695438037715892,6.670660550426348,1.0060463999542724,4.322592085700818,4.230822383230796,9.962111789959987,8.622184204307404,2.2069483408129176,0.22079725996620114,8.336874641724421,2.677668590790787,4.184557520820052,7.473654746657328,0.48915601501357653,4.764368041707976,8.917459973354351,8.400116908437301,0.7160245406823673,3.010615322274184,6.448495036908508,0.7329990740759951,9.095690316341383,7.158708154720044,5.353312789893094,3.505672925258896,6.982436387439559,3.5316884362812595,8.82973252329914,4.285679358131354,1.2336638184989979,9.63099767330377,4.022178903252658,6.6255206466031735,5.886770323486354,3.295409242542724,7.39388918903543,8.322098862701672,1.4402331297621584,6.796051806081644,4.636826156231373,4.5288695445787,2.044981694032817,4.623838706604335,5.978456177559625,2.8166466238394827,2.2547383137931876,1.7935616822864997,8.9713840171435,1.0894177675845929,7.873323410976301,9.499382589034544,0.45728273310478906,6.797770188651633,3.7079083017765435,1.7643631936492343,7.755473808025053,5.1712382423717385,6.832810524826067,1.104203034572686,0.025378007248759715,9.228771294171645,8.235319956120513,5.074725670265668,4.976951435859083,3.5953673687949506,1.6879914339696755,8.731307874123209,6.1537622962119,8.85997122166035,1.872346691710185,2.1842255421425194,3.839542239946858,5.979457541946081,4.7909576538161724,0.7238607411506703,1.4336834224490658,8.323160786849728,1.6494375695759578,7.048989297853239,9.934502937956402,2.704859208927415,3.973882292201727,4.021486055879784,6.7558624993238485,3.614858910435854,3.0472977187138572,5.884377728542313,1.7849941504958666,4.462932992684403,8.010172633524974,3.9031458629795956,4.336312999944061,6.886850076915065,3.3188704365167387,8.302636353198443,3.886670671644601,5.376910908204035,4.468739788298189,6.070362799644893,3.9719604516455154,3.326024653657784,4.490296087240619,0.901852610075562,5.638189559446629,1.900338209809116,5.907829709990946,2.7591591579168373,8.985772042061345,4.500517551215113,7.640282569365803,6.2201214272983485,5.039139527826988,9.272932065567062,7.694842353466422,8.015218413542112,2.0591021604367077,3.979624809552398,3.5546391342621186,6.049534698844521,2.079603349665582,4.211854338381295,3.870547263656683,7.0601362418641145,8.226163634035697,7.566516440191917,8.384700417658543,0.10660953895236691,5.330940666676918,3.373847575072757,1.9413516830852262,1.7236402985079846,3.9881734127032886,1.2713908905002258,3.3624235518997314,3.054574517294366,5.63208135833682,6.197680571838515,7.472509398940392,4.6076696983999765,5.835522237506026,6.216151476340899,7.091822124284544,9.093802740046684,7.326534784556742,4.1505277914122125,6.619352266834397,2.398644595902466,2.515473035141036,3.8303501244926896,3.6505792969898243,0.6563824710867361,4.212750302696966,9.938606837215573,3.8597128429494676,7.0099508289337535,3.2524355158603324,5.916416017704263,0.26086545384891746,4.535737684899348,2.548702798896363,9.41479788195647,9.304893177367754,8.629063969788165,7.991923700834609,1.8253869248679133,9.591045982462074,3.945607672396949,8.607110018725068,4.130643204666238,2.2360207953083666,0.9840988111561111,2.467725746432974,2.994761462086233,6.466806952880956,9.58166004527355,1.553028900371376,2.7085091001301365,0.8354408203159136,6.061974764094529,2.2565547480929715,5.682589233138902,5.0356662852025575,8.403971696206503,7.016510063531891,4.751388826288208,9.254207211333016,4.6860641467066655,1.4047832645459901,9.320691795400073,9.560100849171784,3.997208426729597,8.61667088594838,8.876261719993877,3.4261416256473587,9.926360104067067,3.9767715745768806,9.539440228010408,5.826471248197491,1.3409777762089448,1.0599070621777384,0.49572789583907095,3.9920564161638894,2.6472443011457503,9.125432071394151,3.9032219582782,7.2600454191539,4.7297518707322705,8.537374453628539,6.710616862359286,0.026255034315307846,7.980600690482542,9.096190392567781,9.520396158579851,4.98423595828428,2.1326227582775736,4.677294646187846,7.47686525869411,0.0728139062553379,5.628549411940691,8.642268568579789,3.056539240740208,9.266294727228857,5.612166881680154,2.681171707004526,2.381279929358231,4.61262191731318,6.532901547811156,1.8622000470189848,5.384766873871061,5.278090930103003,0.5052229348760284,4.829964543449181,3.8097950327868246,8.095517439030946,3.868443678251945,4.48061044890107,3.9764313851894584,9.769948225729667,2.849018030715107,3.5820235268126943,2.9060948011974896,0.6252816244703796,8.137375053951136,3.4989691726665706,9.930619042899501,3.835178764251479,6.734932364832719,0.3342040100695298,9.467650990194056,6.908238215672908,3.0876764540861146,8.700205856398425,7.046177188232923,1.74447797064756,7.859479367862243,6.8368030913887505,1.875165761309654,4.57412685102855,9.427051598868822,0.7944713794480984,9.357517781976645,9.63607107158702,5.93869064174779,2.861498067661319,1.3596761249614708,7.234759893772913,1.060224034858237,9.749897066294618,4.678868350817414,0.214350141122559,8.038517303093862,4.246372970659438,7.337832758891121,8.587796170871538,9.1254907260094,2.6297554579759486,0.8158541669077635,5.10916833918883,7.6377363262732505,0.10720898950748126,6.39917271750604,5.535536998908341,0.915493023719669,7.263404758360929,9.938134105394706,9.906047960553128,5.36114655372854,5.5971785104449,1.7964676683626513,0.33345828648709386,1.9773810843311557,6.875012732731564,8.561645711263754,7.274546451248667,4.826491472164003,7.524313334168815,7.67433358854134,2.8855113187367065,0.9622728323809149,1.7467056565804095,6.60289121887967,2.6489549830604853,1.5799371470797374,8.098668088921075,4.673749498850515,3.943214422738417,1.3908867734245134,4.141091632579926,5.40146487128202,8.864338882510845,4.609189362155428,3.2397564262235212,6.667078579746177,0.22314847498548174,5.500356229694199],"d2":[2.6963014005389763,1.2524566076923715,5.6381095338084775,0.4773550917781977,5.75427891432356,2.6122878831432406,8.265833282055572,1.67707000662783,9.028326791832264,3.7954070295412934,4.197932383743856,3.5324219735492957,3.9349993830874253,9.299379883797915,4.543635603000689,8.168092039014773,9.045127368289714,4.016958182484178,1.0887641818315075,5.2786285603257905,7.121940620651737,4.704079034102362,4.062655562120905,5.488158356824073,6.682347103444348,1.8897364892761859,6.6893224780008325,5.532198987573533,2.815933955924532,7.250011255746946,1.1997106465349772,0.15493638297036982,6.808682621665543,8.394379942344333,5.463206139818515,3.18001770767969,1.2513156929736358,4.1262020128252725,2.61536991319393,7.222708621646929,7.818827249945015,4.026342219484869,4.3751334006852645,5.065087541724149,1.0796441326212247,0.0495663687115111,2.544652240149794,4.8427232103880495,8.594246924132694,7.648475863448589,4.271651193274706,1.3034952591242588,6.387447803079693,8.674876007245004,6.340066205154216,2.246389872201513,8.885203380724722,1.7955515915033593,9.821449286773717,4.186364313684927,4.618767562776531,6.287292810314311,4.511523949465932,6.788795667751404,0.869448968312776,5.085012286932349,3.1099903110664484,3.602425500748534,2.101353136826174,9.550116074968386,3.4506361949982334,9.621492957377322,3.7006334787619655,1.6934392547928145,7.8068230003941474,0.5211387871611262,9.422704305780075,3.6789854633899988,0.23430092894024535,3.6869945269898974,9.23581982443033,8.229769268500338,3.6175408607580795,5.059006646124167,6.863640557004973,6.133947210884125,5.664359083805406,2.2091935381596883,5.611545254764712,8.302429029307456,2.359626874650651,5.1628018572662775,1.374177879894125,9.091238298028166,7.7423754515436505,1.3270303017120355,1.8296411103038213,4.7203846847974,2.517574040430053,0.4956619267125095,7.536959218330042,7.500644084669641,1.6938263542860188,7.760444506302957,0.35960026346817386,1.9373183426037577,3.7204384383035127,3.6038414652945416,3.081918440459548,5.183774349449102,9.313549279901077,1.6093490768500684,0.5209704121604819,0.9659338517161054,9.787075978938184,9.704832063337705,3.645894523736146,3.357641223570438,9.591561776774517,8.869909734730024,6.726175858050542,7.75052298932785,0.4259030658729279,9.96570113243386,2.2603114959605675,5.207756923111628,3.490847358250335,5.369577132410466,4.197311324498161,2.890139153553972,9.782612582916059,5.879392908104015,8.84265225827354,4.643505450145731,5.742957513905709,1.549723734314572,3.296998520532599,9.487575345343362,6.353908645201467,4.0328522693057405,3.178847898825501,2.6759387037835314,7.111606260292755,5.294065795392024,6.341814310241984,6.584989402135031,6.793546690134433,9.109893093812886,8.931015141065618,0.04275191892796126,7.063301558091652,4.256188351397093,2.8692664166263815,8.401137798516917,0.3574619610224139,7.833563366058769,9.483619832904996,1.676950062304221,8.224804585998722,4.634628630822533,7.861353400563241,4.546347879425781,9.276525720254817,2.8381467215556477,5.849850001084851,0.8599769448904748,4.050374262819936,9.701195324704337,4.651176071209424,2.352911008040053,0.016593125295256694,8.527690431881915,3.4926144624440547,1.0588539211793968,4.122606862689406,1.707747722390589,7.879911174462684,8.29509162725907,6.460868416879277,0.5101072270886209,1.9167424572118374,2.8628831640993213,0.7647600699679047,3.9021419420818626,2.47109084266689,7.336536139990882,8.253026798512744,9.073962825947788,9.31641832273705,8.657951294781798,1.9883256912343406,9.582549262697276,2.129092905197958,9.140200461672451,3.350554991412815,0.21603072796221756,0.0973122729502629,1.9465848831995158,4.9172758572015045,2.0425718089706946,6.555339585853974,4.144355634444787,9.002770785957345,4.045092422000794,1.7425496493308046,2.0117821601129027,1.623983502095463,2.035432070270684,8.746465036542194,0.02971837069245975,3.019316443869473,5.079878873998192,6.941959039183749,4.331357221322813,4.046921237139864,1.3542425554000825,1.6698533917894176,1.452958802312443,8.294649785179658,0.0362841780651002,2.1239293062922604,2.3120808123416703,8.503357063664566,2.5833727749564384,6.939107572047156,0.1830554985852939,2.2853073963379855,5.82898393771478,5.980557243593196,8.156257835218828,3.7917788368415306,8.096458426825528,8.151716700714733,2.0389544527347248,0.46667308775181215,4.932272416820025,7.93557406630764,7.466444377395163,3.592714173545306,2.5047474444981543,8.872723655826436,1.2560530663894909,4.451048221507845,6.144689013837626,1.4605853726880347,0.6850729893278129,7.194104909571042,3.0636916169513317,0.06492055185752355,8.423692993700344,9.729077640450374,1.373415558079234,0.007725550831989558,1.8500340208857158,2.938062102798371,2.630153982814618,2.3288251002283067,1.9052256653547772,0.4176685366328381,2.47334425267993,5.159724759690092,1.1971795936064256,6.557218300257945,9.289288685250664,8.043979902912701,1.630123588204071,4.680031548526362,5.254972454397356,4.585670568806128,2.7162126888973637,5.1022775827690126,1.8715836647988482,5.9780408677100745,6.161124360004142,2.658986269275476,3.825813963107103,8.548678366660997,1.9372529215663215,0.6197925709386953,4.261801807205163,2.7455147265387514,6.14974908189992,9.594876095721576,3.236283811421796,0.23545184679509612,7.870721916040047,4.1068381924776,0.7019087384892586,6.293207725017204,4.6235009429031315,8.876899191312146,2.2539583487913184,7.5875216076573455,7.4298600749519395,6.571691372890946,3.602507957916714,0.45054946819348407,3.8068271031833922,4.837710478632262,4.091784840065857,6.441501779628238,9.409368656743096,0.9386630103997273,3.451595883953198,5.562268772085314,3.143072307402628,4.564989652301337,4.316223417142975,9.711753157504008,4.005209980070667,2.6783828302813917,4.994556806581643,6.76303773952208,5.187089553307707,1.9664627832853943,1.9569770761467953,0.8865214954122536,4.063773046867478,8.665022374607743,0.32682361445790065,9.614363999147358,2.1059105697941094,2.2342233014001645,1.4751688476703029,5.194082997550911,7.5237036485930116,5.35363453647008,6.177365221175865,7.882919041133709,5.024943699866117,7.114730119257844,0.8465867193786747,2.9040599679000345,1.0474514191051743,1.9032947257392618,3.242664640146622,3.8723198373263856,6.999903439290726,3.158455286906141,1.7359265093259912,3.009968639131446,1.0638505786064045,2.3520343444921132,7.18072800830223,1.7543683682396893,0.21586032299567792,6.866690830702358,8.222540192910015,2.193322343933075,1.063869644896942,6.3062083209120985,2.035454172292923,6.3536445693367565,7.118713647454187,6.142018245887426,9.129069449121971,3.615707484645714,5.9332337232925685,0.4085019336455753,5.032102882139224,2.5987448371717936,3.789811083589698,9.405807708910817,4.099034036140492,1.0796896191457384,8.747896819192357,8.078000218445421,4.062222735167921,4.476722499778112,2.207703471282585,1.8475932848355558,0.75532543953025,7.862539364119074,4.022358406611155,4.874111060190587,1.468808084199713,5.645523344879868,1.8186393202291407,7.073623703440628,0.8908460910603533,5.884148162001949,5.739556985624019,0.7535170384753442,0.5103686275625852,7.302365262671751,5.085913890335265,2.3202203613689343,0.03481800293965387,7.95091765459881,2.760802803596165,8.161968466436353,0.08233951126623618,4.7855408130326555,3.2245963949643053,8.467345415519645,6.990312314297514,5.927759671269035,6.864449908613645,1.8164414350311375,0.5182286967360694,2.391347309351841,5.40360126941329,7.4737786280866985,8.4459618922394,6.1340558543154655,3.099513723665701,8.289322649578372,4.293422904472548,5.351309053678519,5.085315891688222,6.128726064096963,9.224105208338598,3.5777154397222266,2.373438989568901,6.691565906740966,6.980978941223404,3.8902975352783176,1.5098226498588807,9.551140082470258,7.679466058916518,0.28711357798349324,0.6574517891222631,7.8238959821357,3.415803702946747,2.522413159361405,0.42125786469862536,4.459912586158714,7.826354968922848,1.2327240053880262,0.8758624092608747,5.367253595245975,9.227876880377497,5.105646944357909,5.799731259189642,2.22409038615202,2.1821115018214554,1.878872130895377,9.408855966303861,3.264385930830578,2.984333428953936,7.88307242088075,8.522015814776507,7.504971775351368,8.885723682570386,2.3137741663440936,7.570247335973108,6.922240113140655,3.7847333065895783,6.451322358929808,2.4950851235563998,7.387556651481666,9.986411171963443,9.643138101982423,3.82348765445345,9.95759759511438,0.016035775373388628,4.403742938273963,0.17470484169004763,7.040307955267329,0.0991769188385172,5.403426321353186,1.1881924478485129,4.87373805280675,4.7702513029528815,4.065881332742034,9.278201995408635,0.2799917423850884,9.287751054739871,5.634630433964265,8.80820006663827,8.996574852171202,8.039031325414621,2.366375833529921,5.972775092118954,9.822109488817638,6.161713486568754,3.6171530615890446,5.471088910306319,8.39350971018945,5.48687656651393,7.0625962920654235,8.422932911895435,4.490690338738064,3.9423044560170406,8.812767178031859,5.664285685968076,5.106861683676442,7.076500432414541,7.1128805254021295,9.80615649742994,7.740171942617771,0.9744715548979355,5.84865315011397,2.5110172480393267,4.015108563403203,3.070659978024759,3.484182821842965,5.73813400729488,0.6425893574152397,7.4382773595938705,2.6524043623696714,3.0542539317806394,7.90533436167337,4.259071165600274,8.336408361377114,1.098845625280016,7.50934104142674,8.509391242951965,3.8205792402802774,7.922818196699324,5.8217482338501725,3.810953533671979,0.5587623340709547,7.1290675081145505,6.112008637074268,4.976088924641344,3.7875716592190245,8.25701382005439,9.689349870699333,1.5937208713491957,3.955794647130735,2.5239269507350226,6.683884431130831,9.863954195731912,2.899474688053232,5.639091642272458,5.606586061261427,2.019951439064369,1.7196339482908773,4.318397128909006,9.678244217290096,9.813314682650882,3.236597481420047,9.489901510104271,2.8944284111452157,8.675381280135358,6.684016114932032,2.82609187244808,7.0821495209748235,8.4935059507457,8.525133790584455,5.06336373569694,1.4748488451484287,3.914760076492201,7.77935202423844,2.9703072633804584,3.3933756572822693,6.146725305431517,8.603462539651414,3.7568410956979426,6.655116111293474,0.18061143456644668,5.246689858339531,5.8595331265319235,1.2272164405079833,8.497516886288246,1.6590973809198828,5.562512049730208,5.976209690059296,3.560957280134822,2.0272294267657798,4.627543575812714,3.7305373817985577,4.812923996150989,4.133797874580045,9.336698825656086,9.715313493916437,4.318488381803835,0.38860419835158533,7.99682115144555,9.654747970206973,5.869475253146874,8.03357610705121,5.185694295339632,8.126254616212641,3.997110511757198,9.9247649186529,5.918364909301344,5.231254819362798,6.287432203352978,5.532365371740687,2.8742787211750476,3.428740737227598,8.16651140841791,5.569690459555579,9.797726034319487,5.946887696647655,4.690539347596713,8.85453225846801,0.6772776697851901,9.216891742039707,5.6711802336524215,8.484266546114581,0.15733219476775195,5.984556188118968,2.709690817378736,2.9638296691124433,5.303406106070945,1.3352172247934102,1.7062961942122534,3.623100596993871,5.32394414696763,9.170736871483516,5.054169452506596,2.087006872453858,9.282433298208106,1.1102283639846644,1.5354852111764794,3.3305854030312854,4.506634675128689,6.731841198072319,6.485226128758763,2.532052134528928,6.693948158661609,6.831670721407487,1.823890548981184,1.8071916128855947,5.163020617664453,1.883824815756987,8.85510347394029,1.968822917283548,4.538775615687594,5.211149878399201,0.21097531999651364,1.5367861188662624,7.957494553622324,1.7984969952273833,6.279017659270936,0.42042464722363393,2.799588535850861,5.345830401487211,2.9181825358601543,3.4106751115352685,2.722376425349091,1.8843120635284882,6.3744264952291125,2.645074523938118,9.73565729427174,4.367923897801209,8.187523988531636,7.80999504708241,9.539692225665025,6.564239501865883,9.283522129871663,9.135314546276934,3.3205429383508633,8.397736585633764,3.6066162495755716,4.1989377343263286,5.178114854538429,6.8530708357315895,2.398222467805624,5.479405882981823,8.78671955829352,5.9080790537428385,3.4301370604936965,4.336490719815926,4.245027976673885,3.21949051015211,8.21477096992602,9.219129024836397,7.284865696142893,5.619264770865144,3.068554912583774,5.361775865178631,3.8580415509001353,6.981085815192632,0.9043805232170166,5.200608034099236,1.6718444669527166,9.392608809923818,2.25942832932154,4.039196900907029,7.953042478742532,6.998869247284103,5.146880589678786,4.1480816342276094,8.900233016769025,7.916172031760547,8.941788713313528,8.604111390286295,1.850157843266531,6.9664975609196595,9.023138205613176,1.2746541616320384,2.2011397199131433,2.5958868627255294,9.248889520856904,3.64412513813521,6.982547791477232,4.688972857522393,3.906367307230183,9.930356683274518,8.333112584381725,8.6714795775849,6.288310501080067,4.028658876333742,5.012362238622328,7.41637514628481,6.701197494080362,8.100284298774874,3.438750507946553,8.351783712569599,5.757126422319208,0.9886065979168057,0.6836363067724704,6.946556492033031,6.492513054801257,0.6660345942175483,9.13917651428942,9.02137399784893,7.1272579647248735,5.452118040872542,8.466385511420382,7.328393260068237,4.800070885372305,3.476978047663095,5.615214380107309,4.28090994189426,4.894209625869612,9.508899059927987,9.913924611899676,7.0902057368418525,6.936391904512953,9.271530694220244,6.069659083392085,1.3964054229070877,2.7338459503457657,3.9291427148080205,5.31284728960687,8.013575761548283,8.176127227682983,9.61228575167397,7.759179823212701,5.686888076977654,1.3786572583966472,4.103664155598534,0.584029779775308,9.857412199287495,4.223890803856172,2.833665790095705,9.936240608619437,1.7678447140833597,5.613299505775706,4.879282160251948,2.9064957852407614,0.11240837934236803,1.8727263305669961,4.431929023391882,4.397346805156637,3.472200947197155,1.2595910430110124,3.3639421578193263,0.4214256330499633,4.227205124776063,2.5607833939155844,5.76855735350361,1.905655636730994,0.36665677253757023,2.271132648689451,6.836397697281091,1.6214691855838792,4.376228447664161,8.414513511280514,6.923725441526893,4.520773659093429,5.952354390883825,4.206184404821702,7.535366148329842,6.632461917877361,1.826338197088837,6.017538924794117,8.15003344621693,2.4417662698610965,0.9262163816332514,1.0396884479959012,8.25449399379833,3.597179944232891,7.814907447331549,3.3407053887369753,1.0805364994967803,6.471601480256108,3.309258811790281,0.49777192796643055,4.551458939655766,0.19481759035947288,8.745123811881468,2.3707060593246676,8.275490040425325,9.173023215166047,6.324465079811798,8.819413688560122,5.929350750500779,8.075872934395559,4.421068744476178,4.136823980518023,4.404663950314854,8.183849148591879,2.347205367405305,2.311608476274043,4.108183128583221,9.605974153974572,2.806099180665844,4.6144634626830054,7.4700622169649495,0.08320848592168195,2.788641714268598,6.203089461768836,6.2881502043883515,9.305730022621468,8.893827799738297,1.9183036651515706,5.084324747926523,3.851010354277886,8.90509688610102,0.6959889588321788,5.021456809605991,9.434678808547975,1.8465753453638634,2.400411040146515,6.705797657350054,7.936228174838648,4.489989594194512,1.3926351026969086,8.364067649543863,0.20942477097023238,4.583091460808964,8.9968073197983,9.05726803055746,6.146610140649362,7.63703559320942,4.8855434526396895,8.490611130332297,4.716776846948583,7.724195312721367,8.728076923352548,4.199585777203032,4.9919438375968195,5.007944433892866,8.069251150485844,1.2147674814993792,5.398273987193418,6.584265968015277,5.937782252285253,3.464935128199178,9.546741474379894,3.053312434538349,0.38619537834221784,8.420470558558717,5.093893811417301,3.578140234198397,6.104758378825695,3.2860465356330604,5.045727721809927,4.552462468943466,8.478377495809324,7.69710050667622,1.3887880710463185,1.8062788673495378,6.2131589987016405,0.3112817280902025,1.4506077712010934,5.781701406781863,3.425992209290818,0.17100938331355175,7.2566949083419345,5.188693269613376,1.2495305584392224,7.7838776677736,0.4902539801334882,5.828235001197248,7.183261591936154,7.093014053246158,4.458243541863034,5.618471546310575,5.17421767557715,3.6421337021987066,2.6698943132697095,2.4223166128352225,3.142286048754137,5.4584019793001985,5.545944163781186,7.522497419758871,1.0572985007558722,6.45817320066098,1.5138518017740643,4.5614972822372035,0.7489947683066567,2.889267525787116,7.77044118001778,4.026208896641668,2.1715551611116535,1.9347091006045192,2.502583968732779,0.33525610369755654,0.13735759309080553,4.365209155869792,8.501217969946453,1.673416330808437,6.929456166184275,4.164788007099243,1.9276731037731087,1.611342014825905,9.15465409996797,9.129187202042736,6.956876786814245,8.028736893360184,4.151658055599297,1.9494357780159022,7.887186948360436,5.580431220947029,0.6492027100456754,0.9001133923191351,7.295328106534593,0.10856253747614453,1.4981405256490765,8.064122648014065,0.9259372666616117,5.17725176288778,5.840575272099144,8.74397696494829,6.9398044809485455,6.654596770398371,5.865547623462232,1.3076565814423047,9.541158022662417,8.980980210084644,0.32858849365740683,9.353226102315261,7.5032928198076725,4.666141893828439,8.242029026088192,9.287062000914354,4.610711167812635,4.534398668722144,7.946009464903603,1.4694104298216804,8.736191243696162,5.8879228868190125,0.5616213310840723,3.738847229793032,7.442239726813198,2.9624849692129485,4.6380021068388455,7.45493046587886,9.308529729415334,9.298369176397394,8.598109423426285,6.437425032404862,8.688909246256395,3.4251692033323544,7.246322944535761,1.0403523373053414,3.9366087675214056,0.5037092180344827,1.8258132184317022,1.745209516402384,0.12728232191887123,0.5725633854467804,8.15187927526964,0.3635775678168307,0.796064939789185,1.7754884968167461,6.164552313369544,8.380596840184065,2.406133159220163,5.581154632760816,1.5749424569607173,9.925607728383298,7.1396147660845415,4.386688706983321,8.643686120707553,3.948014540158291,3.525332557565366,7.274600837830299,2.6312090234350594,4.17127287764891,9.848250490623228,7.3331690037049775,8.08616085662341,7.262906646601075,9.99116013530517,3.33362893530023,0.5448401209182618,0.09395642282105099,4.689290955611511,2.2509140715984866,1.0181456065375083,0.8370892621948278,5.762576601581202,3.339455825045994,0.2913976641794602,3.975385982068418,1.940638142097313,0.25973945520322284,4.098217861118252,1.2880363926057203,8.327394342875298,2.724491611650517,9.227248919833741]}
},{}],68:[function(require,module,exports){
module.exports={"expected":[0.4110394233025141,0.004442776928545197,0.0028742102334047824,0.0023373376356414363,0.10035220833976957,0.0015671887939601268,0.00899677067074207,0.009057732762317604,0.0024089919325469525,0.06777672155576439,0.0055270965097324555,0.09303468046877457,0.002591440951624748,0.0015119566812669713,0.0023616448970793413,0.00015093218909252874,0.002500823725349519,1.197595015901262e-5,0.003605625475201466,0.7672033775028854,0.004034415577794613,0.1805780749708213,0.2204303337757161,0.10398783014340028,0.007133430268790125,0.0046645729843527274,0.018331088108776806,0.043699640393501465,0.01512617035918901,0.19271948138134692,0.06200162881553166,0.03873876109157341,0.00020262540040849874,6.965139355591373e-5,0.00832950981482859,0.260307920135968,0.0017311826383558922,0.030345283879158656,0.06906013758910094,0.0001638016897628213,0.001452941263234815,0.019889757225566986,0.08098601778850757,0.0015686175671234099,0.04458910119584282,0.007302417813535179,0.030114472555686382,0.0029236330168479793,0.07052633640391859,0.01001928304092712,0.5282257235737873,0.4133454963992143,0.010249169395424227,0.08403328964613473,0.019373624040162844,0.00015210593811784486,0.7128617088004457,0.003109184442515726,0.05081670457182427,0.1464836767294262,0.020065665772860914,0.0014052830886114322,0.2809871230734189,0.002304869480932458,0.0036430131949847988,0.02150058949780669,0.00018329150470670585,0.1640886426971114,0.6905124371635415,0.0004567314074100584,0.004282166758888908,0.0002299661186916581,0.3885367544101457,0.001770139149100383,0.0023733072444152917,0.11422450044671284,0.0043365257938814475,0.18809948631998627,0.18727409969170009,0.0013622201786606183,0.06704135233435668,0.0015413356057782002,7.02764742107e-5,0.010870155863542279,0.0008511414218148301,0.013540104714443847,0.313879589375057,0.02883496134285398,0.0035868675924393065,0.0004925035343858288,0.0008514062068400508,0.03205076019546169,0.00018656466188750093,0.5640138611927666,0.1138467142961293,0.01615941863175065,4.759811048219579e-5,0.5348645380937207,0.0005834989233029451,0.0003214321499228612,9.248402605346862e-5,0.0002472338921438681,0.006382209217908323,0.07469769605512316,0.20214059324051079,0.0016037750877097644,0.5771689584905895,0.024085343913512136,0.12282896449684873,0.0005343726912144396,0.04092940890615806,0.005084655800236009,0.002507063013795683,0.7109547433025368,0.07957913192100648,0.06787151460618071,0.0004604345436266623,0.6317291766980008,0.07794998321746885,0.32393142859622226,0.5566009859176174,0.004563463870976518,0.004629788831106352,0.004223112340973525,0.0040000823612528005,0.0004889714348718698,1.4901830842838633e-7,0.0024118287975385057,0.0029262752754805224,0.0024425431839530947,0.7114947078514003,0.6903420360186341,0.005525403256185787,0.6494410004402168,0.000495097206876961,0.00011890219902628422,0.0016751309121549398,0.00048216698217816347,0.6455058751339957,0.027685794892795913,0.00516359191323685,0.7437039488513755,0.0011007519935873618,0.00175189980424528,0.19394202248151196,0.0023725260627282065,0.037477134091654006,0.00025429111102224307,0.0015230201642902272,0.2250283639226906,0.0006238711312398454,0.02866061331555658,0.06545020303581524,0.28633973369235144,0.09934671796827549,0.09545854259609049,0.007956993262485846,0.0007371234182440369,0.01506665210269354,0.03242363226895284,0.00024461715660773045,0.003137922172700102,0.003393827728838907,0.006215077219131084,0.001372562098930001,0.17217052668359795,0.005245210592055816,0.07015425283889361,0.057122973390595896,0.022143908450969835,0.007237059360930367,0.030256438581432666,0.39184645261408624,0.0005443360779917268,0.002518655840221539,0.0040671775110750884,0.0006043285799118009,0.0014871968611583199,0.013698254734429736,0.7008675980068555,0.06919803003116684,0.009039454010641159,0.00011642230387440175,0.6428719190161104,0.0002738635002093856,0.0011261325816851106,0.127087832404002,0.010887718092474423,0.21476106627254563,0.3794833164468113,0.008709332771850393,0.0006203583105403746,0.0003082579137174544,0.0003410346289810013,0.0004110079561885785,0.011255954455159227,0.00020626052527168617,0.00013276909866723668,0.7211559540097899,0.0011133656684866888,0.015806543636862888,0.49922285177530656,0.000668644782397466,0.010825077555564376,0.00023043333563931037,0.015810525248161584,0.0732790709984728,0.02346286886990531,0.7983611733195594,0.008828660199228927,0.6859254451237985,0.009760280203888137,0.03219839574267857,6.156468920446803e-5,0.1492361805574532,0.0003474756048670749,0.16845457204362554,0.013768343787657103,0.08432788125696969,0.00012034650785808392,0.2356495282603089,0.0002727241605251505,0.01521829229540331,0.02795200181073176,0.4947393088945171,0.019654988237697537,0.007663948758034697,0.00029784815597126035,0.3492657690026181,0.026173691648297585,0.0006901046579629246,0.024191510560830184,0.028297571203493334,0.0007324295692929947,0.0024178609071476022,0.012247163130689997,0.7886296214766867,0.004866245186533109,0.0005329035554687231,0.26690742940284423,0.09522993858205878,0.042376770391509215,2.4768383557614673e-5,0.032623179431596205,6.103925450204397e-5,0.0027011110999826263,0.004335436997941676,0.0672704260249981,0.006066898270081816,0.00012478463793103156,0.00045080995717186774,0.024314139044462082,0.05068658570186355,0.00039729803712615667,0.00014526227527471397,0.22410426312915493,0.0010780480016371729,0.0006395335589078515,0.026472694836345116,0.0046071149499537,0.014700165047952567,0.00494009429062145,0.12329991971676428,0.0005649200420948042,0.024039144047369943,0.010454228688467395,0.010691460565520006,0.07515041256677578,0.5726939356288905,0.0034605853528241297,1.1122155200936203,0.0034362129802347546,0.0015727616351893434,0.02816040373384377,7.410729949714574e-5,0.0011601036968480458,0.08825052123650597,0.0002761653423674898,0.5680515184370722,0.0013410125426835374,0.19377966526654655,0.050911728436805574,0.03767835243136632,0.00011074774838259273,0.010406836011142843,0.000902915449186836,0.01002409446768363,0.0013675295603358107,0.0023779651568030797,0.19873210756808102,0.049745157059680495,0.01684341699822889,0.001441345654311745,0.0006252951504734817,0.3171001866842096,0.0003136646457884982,0.0004201771618905147,0.0015437641317438764,0.03319478455222158,0.22755940060363938,0.0004533369488882867,0.14910858903905674,0.024130255757913836,0.00998967476576888,0.016329614191454504,0.46977359352349396,0.3301543403752894,0.10098144193457562,0.040428463638669206,0.0018800825752324616,0.0007077911805442241,0.010758426796738402,0.053051489220517695,0.504662715513586,0.011382640023238093,0.037869814869570265,7.019646803856276e-5,0.5514522177892582,0.002941308448853773,0.22806113300250289,0.17218587555514125,0.029856274433506316,0.0011976818918216076,0.05036851599302506,0.0076703674006233374,0.0067866326178136465,0.048028913874207116,0.15403053162452215,0.03881384744063442,0.0001037534322950242,0.03543526282310185,0.003279418553740465,0.0007837876168759112,0.006206039912866442,0.4125255966133353,0.05880923814236231,0.4593547977694881,0.2570077440338627,0.5284459217680918,0.0016298240018556719,0.00013017336553176884,0.0003223705120257812,0.002012731474484067,0.02787831664220789,0.056246170056689464,0.003090403129487163,0.0010618012686878385,0.08124165612130305,0.014777325859139236,0.034472169139038986,0.6550533457360311,0.07916982888945352,0.00014693264897908985,0.0004325713966024437,0.00015096976745252998,0.001037865331039489,0.07481026441736356,0.15098148504195244,0.006683726474785974,0.0006427292823853916,0.030455228036639147,0.05520080381726771,0.00032364736816016694,0.4031927824765597,0.00018947056175429224,0.5412722911518798,0.0002654053478758652,0.07780572688698913,0.0032595662463953986,0.7113287207073744,0.0012354313752100672,0.022836645298483324,0.7856745962369844,0.4786874643038919,0.0006807338448250774,0.322936993185737,0.11228044192120297,0.0025820033252743325,0.006437861163007001,0.004597240719738012,0.030785319644968084,0.6367789236784702,0.03847264016632818,0.6213386195894072,0.002610406244030982,0.00024953553515214314,0.025131464437852444,0.2609807886235609,0.027567393741308226,0.6303618203912762,0.002504274970338734,0.01658274584271529,0.0003961368903694275,0.0230225909104601,6.64070301774519e-5,0.003907054699153118,0.00039248523673911055,0.0009366509779130466,0.05419686605714426,0.0042589138735882395,0.1966710499993945,0.008607140190111731,0.00017587630046012552,0.00018851363686893792,0.002528880325422211,0.13263294206160037,0.0014883644828443926,0.00015015982165984799,9.144887868437177e-5,0.0029369667751863566,0.0010597822416425647,0.0008624908576213969,0.508584990591505,0.006102293754820823,0.00011110216152926508,0.012036475265013748,0.019943234124806763,0.2859958117370258,0.7444059626899006,0.0008682380494204536,0.0004106399786991851,0.049282582315444176,0.05110451364348812,0.002022454715235606,0.0035942177357608483,0.394012133370347,0.2785664352437087,0.00523359650909804,0.0009628714710243439,0.0007047831495860086,0.004584617053344735,0.003949894453792382,0.0009613916491158968,0.20831251887345223,0.013077711492350546,0.000738875896326677,0.000710976613188084,0.007795566515443908,0.2009286052343492,0.0025335107378791637,0.38296600788695895,0.009305535727250213,0.08180857644421076,0.026303485861145504,0.04882226188883343,0.008109961365740373,0.25909430426921154,0.00010938200525819323,0.10560911440122248,0.005250812559236138,0.23978854413957107,0.0009303451011625693,0.0005967668194229446,0.6431964699827226,0.6206312556459135,0.0008596260381842607,0.02290125392751483,0.06052987508499871,0.0021205313861919987,0.012159106406446223,0.0008341797272841694,0.0003299889524399058,0.008842622507623365,0.0011893533456959478,0.7554786861680425,0.01370284774134344,0.7092075075772115,0.0015087050071689138,0.023092641078119838,0.7672758628351855,0.0013408671859291338,0.017701973998608803,0.0008178321483706386,0.5306746054051226,0.02277066845845912,0.007861158138164752,0.00044997765537872954,0.0007060597646909358,0.0008944739576652625,0.01702056952413389,0.001847325508055551,0.041291728279867594,0.005521845325780616,0.00013777086873656834,0.004196820673685826,0.0027417550519264295,0.49509194948669566,0.06503472066685871,0.008760666322391225,0.020362143534414484,0.0006427019371335018,0.002593671696586658,0.033677381104427764,0.6738268724533465,0.01538091084615448,0.42776604105943977,0.04264989213448147,0.00016434811274470634,0.00283802978452632,0.00016327729135022615,0.7086663004359521,0.020351440886904236,0.006416649630590276,0.010534565724218852,0.007017570252076571,0.007940638811205105,0.04672253472646623,0.023069704339888655,0.015455508152562527,0.0006696073675070222,0.0025340213230648835,2.3243176292450552e-5,0.008304138759099963,0.11119443224763667,0.22232334769972623,0.007944712463750286,0.012163699417448886,0.0024923621549086624,0.07157620192786748,0.0076810002223776245,0.0667785356363659,0.03685502159515461,0.005741792905957041,0.004965336438977721,0.004624655066163644,0.004383937071286681,0.007741128073791907,0.01457219166136982,0.0013772468618537105,0.0018956177461995707,0.03392554849393764,0.09691126538900334,0.008490237139864082,0.08162381046028243,0.010470709534467252,0.005693307499753829,0.0008846538092563409,0.0007933373073933722,0.2166906668878844,0.12680763687099317,0.6662342480302198,0.29959489501972103,0.001228597667295815,0.0029165158981864035,0.6994919460122346,0.0064935469678858194,0.03681662823258425,0.008546562343015549,0.000396762891899296,0.0004760898453128409,0.6732152227693817,0.13437071324713362,0.0043948450822510355,0.0014197674851395019,0.35534888703866857,0.010912003402352386,0.44687709854137475,0.0014987817997878594,0.05151215771010237,0.5914831572966269,0.006155902597815255,0.00023293372164883628,0.17575299723123688,0.09733605032142244,0.00015733799047373505,0.007851162141912746,0.14845193079792393,0.012396501151644585,0.00106388570827995,0.003670911865574218,0.07733133048935818,0.00011215531103676786,0.05185810810722632,0.006683702412876973,0.0004164849221517822,0.0007599057938203411,0.0005505728914833185,0.008398983168640725,0.3419672958874494,0.4289865418033215,9.25923390143566e-5,0.0655655172536411,0.0010399722418287746,0.016842521056133715,0.00019121027842298674,0.007790585365750533,0.003375952661941364,0.029366191846162962,0.000539773384066977,0.09891595518668632,0.02160947018980679,0.02759155693598794,0.09649110157496128,0.0024719653158610357,0.013204226871754729,0.6340922449059477,0.0011332246107821967,0.004301767963078023,0.01826783922024296,0.0038352180660225707,0.2550871796741456,0.021642860069702827,0.0018665540237860977,0.029570819195502043,0.0034500412900645904,0.15068402402563663,0.3230980250095992,0.40404749253066385,0.08388476407492014,0.011189224974395359,0.02122488138644874,0.007445062255163075,0.32425477798455266,0.0002575124189872445,0.14743667615978598,0.0198627321693726,0.009673264967598476,0.0007898778568684418,0.005594962443438869,0.030735172398613494,0.0012112963145869263,0.00561942191767732,0.005205896516393992,0.0022707150719667103,0.07062883766579912,0.14101468902725176,0.46678756837194496,0.047608201456181276,0.00682657467252325,0.00010113663619808631,0.00035173919888275694,0.016158448447689686,0.0038968876263070725,0.43622154780274347,0.002926347535016466,0.0459148657875893,0.0014803968759357245,0.09364243652963117,0.0022846471149630832,0.02309064004428461,0.04494157465235791,0.0043611939251266075,0.004156733425360253,0.1719936763651912,0.004139603298099273,0.0013548646850798964,0.00021994923296505967,0.1839052749104123,0.0015583586379168631,8.157805166818237e-5,0.06448115471077807,0.15165310429508483,0.7129811458362453,0.28716474791438756,0.00044832913192036224,0.003504920778453709,0.034710492364836525,0.001563154781463554,0.002844894232305509,0.0007715254802229131,0.19640550686112235,0.0018030275866429161,0.16169301323106833,0.0018208161537210097,0.27960684120196727,5.0933289150521243e-5,3.172840766095733e-5,0.6700787847122496,0.02574296916284304,0.1023258985997647,0.003728141537418998,0.00845054611130415,0.00660547597954165,0.00021871652078827536,0.15280486135450722,0.00021877883704725387,0.0001284242347033489,0.0008341467292334522,0.001152751513430626,0.0003379406491100063,0.007624387030652267,0.022981645778101963,0.0003324944737236456,0.0008561830994906862,0.4896439874962079,0.0012038180441533003,0.07453374070565484,0.2535875024131542,0.2576334006459488,0.0001500299846857187,0.021093208617783663,0.0002763670635991887,0.0028129173938053454,0.032598098831095795,0.02400444023536202,0.725198088919422,0.0069316742004813725,8.541197070526217e-5,0.14853975395070088,0.08092564768768487,0.010808676593699239,0.03564999915315539,0.0005294057550321123,0.00430090409774911,0.11260511804164354,7.205059002650254e-5,0.010051434716588332,0.029500502014445793,0.0017204388077502793,0.008285869384825789,0.11563385465240679,0.19583545316238865,0.03853099838034142,0.0008006107531674395,0.7633667048916375,0.0028619043804399996,4.0261623791227385e-5,0.011479430838961456,0.00125059748074472,0.1487378054794377,0.5938174888604101,0.14315040868994808,0.0003647599039513977,0.023496427463347475,0.004412143675061866,0.019639418603239533,0.0028200850660427376,0.6821421031193043,0.0013711212261879437,0.00011368409388011648,0.10530764865123793,0.09712033815823122,0.050672697765392294,0.049263801936731993,0.011398024821565815,0.010489650101767454,0.012211066058316785,0.03974276043244944,0.6988424426706987,0.019371689822247476,0.05529823937982158,0.07215668849534493,0.013312071517714647,0.00064955873721271,0.6973750213880159,0.15285771631542408,0.6502783581466924,0.013440131281538573,0.00020093509264117808,0.0035751924035049547,0.0013179514592309622,0.06301503717377595,0.03156394767768164,0.030160088495519894,0.5607473191035555,0.002319846364771241,0.3429848732084474,0.4730452493765785,0.17702552757769108,0.0007437370301143435,0.0004820822203892591,0.5568297225120281,0.0017903959572574109,0.00017092870194885125,0.28119489519962915,0.008975656321265686,0.0005899114115445724,0.0038429915185082615,0.002457836854763144,0.00957771064158562,1.512192623934897e-5,0.871712442628673,0.04234606162079524,0.016677736761224603,0.00026195187074373765,6.26868142134029e-5,0.0019282221154699694,0.17055713573061068,0.7570501108099259,0.23563610147125,0.043159861013881216,3.601064246724577e-5,0.08731752337110882,0.6749515933442506,0.2775042929124836,0.03581826970809766,0.00018168378863861226,0.40273568641890783,0.01813747331536982,0.005596742792887302,0.0009879028200568444,0.22919541366141669,0.0008481206852921287,0.0002326099135460972,0.04089126920424886,0.22592442041601785,0.0012054998603084764,0.0060639403343697735,0.00282186886899919,0.00037489180216410215,0.0003823628278512533,0.5645067824200989,0.28058911008207377,0.0008851321507152782,0.000307618798425449,0.06460082898032384,0.7422049326234469,0.0008347427206008723,0.00014905028207323913,0.004573571119813259,0.0007397845718523907,0.022201239195844557,0.0007488519855561904,0.0024547217701208256,0.004210621841448193,0.0017242530234619666,0.6253643077313915,3.323440053177894e-5,0.005667063034814565,0.009161453337766147,0.0002194787241656301,0.1110891261635218,0.0011423122472185815,0.050126453134883536,0.0029969362608672583,0.00038525126749957395,0.0007545062849657572,0.00024146355735175194,0.0001833222054851943,0.0004679986488082676,0.8106659177909812,0.004598396317593727,0.00201609600622453,0.004625630851885237,0.10983936007936256,0.2134138653064348,0.0007881560694533769,0.004297019731536057,0.0010337331372765627,0.6974967387658573,0.003698555874342802,0.05468029886281616,0.038713934992101094,0.004542249987264697,0.0512640427932043,0.0036249220260568685,0.04055537264554105,0.055635498070626045,0.01118306963355871,0.004273558271689435,0.0009550213139435557,0.00020464923841881597,0.009754068028779027,0.0005250418886226111,0.007643894713959899,0.005269432369978656,0.6995260657878385,0.06341940320765534,0.0007561909632697196,0.0025332059060516918,0.0017338589114782139,0.015900076010081837,0.0025077683092393243,0.009103719059312303,0.00520477410609675,0.0046275773560513125,0.21457080953009058,0.0013129347911732534,0.00258251881405124,0.0014768756952229477,0.6303868345214475,0.043678815213726754,0.024913314427179607,0.0014605459197336668,0.00193934679769125,0.09069329499862279,0.000998369171692669,5.5342057793812765e-5,0.006007485782585844,0.07894463341866861,0.024670183191655086,0.7936934198864992,0.6891179115702479,0.13855868745471156,0.16629016319962373,0.007967269675428242,0.00045183454989966803,0.14151546162702533,0.17197638490192332,0.0006616779956699676,0.0002636350730562311,0.32271220147712787,0.00014960509165384467,0.029730072216808325,0.004654092423985295,0.1098200359195749,0.004667526595095072,0.00024227961400718234,0.5676347262091038,0.00010158446402157573,0.0008354710135594461,0.20333972530037034,0.1604935879371075,0.0007768462119722941,0.009169692292249966,0.0006557129490058185,6.492644097006479e-5,0.021071141351637897,0.0010005548569307742,0.0006077678103946082,0.0010742689327140212,0.033959988335042934,0.005673326136323356,0.0704121014643895,0.006077808313380596,0.33640202152694276,0.0038508213025713538,0.36852843202287827,0.015690090864585546,0.6884941416682143,0.004413247758872589,0.00020575554872800085,0.0004453072758889887,0.0029411063752288556,0.006117342115179539,0.0007237480156741967,0.07546328880273102,0.00011559674477339521,0.004847065505307639,0.01970561509931736,0.0014127056094768104,0.01644414202187789,6.941023804745905e-5,0.08276236852818238,0.000167921056478023,0.020575012209868227,0.0011335795871734017,0.0005773694552346763,0.6501906194810674,0.010991108944244318,0.006098245206799839,0.007359145536332075,0.0008310523581961795,0.13454140823526706,0.4889024878303069,0.0007599677312069111,0.06946031306177623,0.00280521379876892,0.0016139175315829676,0.0027945540594498937,0.0040983631990407264,0.24131356914619811,0.00021543670328124035,0.0008879234718610281,2.5094632886033447e-5,0.00017118981378834818,0.000307963794478951,0.6200362284336838,0.0054320541118023065,0.6779758203474804,0.006866116651518542,0.011996811213401144,2.084004953574809e-5,0.5759185345972961,0.763819247762333,0.18935445461220765,8.064813867313388e-5,0.01134126144714015,0.3189965703308744,0.0025899952487351413,0.0027660909351788034,0.00042752627090162005,0.016835045520294443,0.00012682306945077058,0.5007197748659398,0.0007195086466036229,0.1529968748508191,0.0014336496991698292,0.0011619109966560341,0.0032356467957813896,0.08375200205511331,0.017272272493135638,0.0008270053438743527,0.6624199334678026,0.006758776429979776,0.0032857609187069013,0.07073198463254961,0.001139390136102443,0.00524348424468263,0.00715269686359768,0.002781005488489942,0.0011014235876119474,0.04961806104599652,0.029362524226747483,0.05093135953202061,0.10787380773715746,0.00012187711927207114,0.00010063224516051007,0.356149671261416,0.5549550962773103],"d1":[4.0595553105558295,9.397419523609823,1.120671931517303,2.573778025412843,6.1052909563533,3.954573180166714,8.626723690903166,1.126438687827196,1.7316687314486257,1.0662401371623242,9.608880887447494,0.4196356194726336,9.153494287573258,4.7993587772282,9.66337770589005,7.457393049259955,5.166535570200425,9.621424880858463,4.978272841922178,7.991834219247296,0.5823412659342919,7.563465573956655,2.951722359805593,4.877788297418166,0.010641594239086949,1.833866306341505,7.196213568219989,7.1455547518091915,6.871746142865927,3.8684064845766075,6.523825952515208,9.827406988557597,7.007665736158392,8.969360899233529,1.0161915066113902,3.6343598295501556,8.238306893744994,5.61385850849355,0.8439763701816982,5.22385960512098,2.7120357462525435,6.375868459284153,8.058526530186116,1.4977261971010214,8.161387791308359,8.856791159946898,9.772189350567992,1.234083806801256,1.2442188417075317,2.4533329403050574,6.438789890231176,5.195902475181691,0.24698053562431266,4.279682222969998,0.21468058407390522,6.23114768120076,5.418701848742497,1.0019697166229014,0.6682273994243415,2.233240416527018,4.014055220106116,6.601368611611845,1.9124382377444138,8.048038360121964,1.1345691664682245,0.7404068978470657,5.4096894952130725,8.569038160641343,3.8612855555383185,6.170688987168611,4.052702323395092,3.6110874549813166,7.766889971683546,2.2104195099992197,4.8846618721255535,1.7343853503057494,6.880090270900412,1.2182309693355764,8.260175780467824,6.708974622970625,5.918601688409071,4.947025942074874,9.767475776994,8.31756116494855,4.169979272461393,0.35422823749118315,9.357453970342867,9.420467746009283,3.931327013718262,7.673839166251892,9.724249583879992,1.164183091561748,8.967830114545913,4.749826136164533,3.965196676706151,2.834034600075903,6.782226312747611,5.441122655162278,3.922089789568295,4.658163240199986,9.001429994891652,5.375945879673843,0.7166003562677203,5.364906402295855,8.089677647277139,3.0474604319573717,4.932468762301021,8.553953975512716,7.641604302812272,3.843675396330488,4.362850969978558,9.898946899929303,2.419920421526136,4.675627307226826,1.589907215076365,6.664316248385402,7.438340098405858,8.324538209530491,4.718486462625444,2.8469137000966938,6.158008534409268,3.6326577998918053,1.4532349880939988,8.280309057005478,0.029067853131692356,4.769183338592809,7.101723027162549,3.589752215619346,0.0773523389217523,1.0998462907176232,9.678573464658475,5.021906639165286,3.395707099747378,3.1119482722354475,3.8872805853880887,9.389267592042254,4.60495570849001,4.579987971725075,7.269984990902321,2.7766720559060754,8.032852981440113,9.476885916150994,2.2703228712141432,1.4136846166038897,0.4733712554516756,6.973903170259685,3.7076153020379543,6.435878552345644,1.3669447713616534,1.695320035640866,6.117346900622627,7.803498952683972,0.299760612916804,3.8458039737818472,4.230245287283418,0.9420484381042638,0.23468218514762773,6.350931377055931,7.301605031042346,0.997299900612858,6.1536747227018695,6.064301665437483,5.146945427111458,1.0449572389331974,7.130056546954815,2.699310210453918,8.166034506832144,3.6201152165773465,0.802753221876249,4.006378320747997,9.030994289527655,6.191083333479199,5.743310206221059,9.358079849414231,1.236687528363809,9.816261672789839,3.8543249559090564,2.145904000212866,0.365105723838377,8.056180148662387,5.2301153194785694,0.7686858366586979,4.91746101926791,3.6663424756537055,9.327216948380137,5.604757348380334,2.5840166340867876,1.9867919008442692,0.9628056414476527,1.9375655821630322,1.069431858652714,6.6054114451094526,5.613913923453691,4.776827229724034,8.133599428943954,8.317230335117195,7.500337860274524,7.8711285363311685,8.129040054968364,3.290134327661698,0.071209186989305,9.456466207106589,2.5234185163033263,6.4901880375930325,8.991649381211278,7.022778879636351,8.640673220294426,0.4299560328291263,9.72259710974704,0.4992016176928282,3.014577842342989,3.6620628352354467,2.2453901212308724,8.072726457299668,7.254492140426832,7.070868791101788,4.707212717532244,9.646281641222338,7.053102975827448,8.045359439882485,9.53560710056929,9.009515726857142,3.1013393459307648,2.6878963927490873,5.959498005802306,7.2661926528450245,5.176073808568338,2.997490557428384,9.415823039502449,6.337988673094879,5.606899838767667,9.227644562982562,9.809140718324041,3.392328395403703,6.886071287819522,7.859890219435471,9.009596455864429,5.146113139580364,5.339213652915296,4.237465332019889,7.757706980831546,6.951012878649614,9.17015847514904,8.014497265989299,9.66830036144184,2.7471627819237243,8.186970714600621,9.547121780166352,0.21178875784117812,5.081605873742571,3.0247896639833716,0.3418329059762071,0.7924288072192964,5.291727887581581,4.89132529637887,5.046603046236351,2.006804697371687,8.12249301739141,0.8047124323017352,9.149504800216645,0.04358676872561418,5.119498174029513,4.859018357969928,6.942512738568802,9.59050321465446,0.9265915160021088,1.2252543391590676,7.996110611255858,4.870490048894435,7.517312047273881,1.8303248720317522,4.679659737672939,7.710506888907595,9.910557566772422,7.508337525951485,3.003403297214755,5.252941660026947,6.0673221524436,7.165753249346041,8.494868719651489,8.559898079345427,3.718808353597667,0.519793666855275,6.390671195527792,5.791936538392313,4.046200361911392,3.617389100210877,1.2607948406508718,3.046691774192727,3.202370874687508,5.745532012566548,4.002725542429966,2.128660920740897,4.3731242062205204,0.38583256708208724,6.8253920747675885,4.456476256582651,6.303875106473171,1.2997765566693498,3.5491450059107277,3.8655496614592266,2.461864575781909,0.46290502183230053,2.6851956671423993,7.938005155788632,4.5205878759907066,9.93660253014365,8.287928591926232,4.974769564788124,9.060899348174393,7.427705526256705,0.22961755979072462,2.0826600216532287,5.624649892354667,0.07934396192712301,0.8885795375140115,6.957354038706618,4.286865299194047,0.06010541664239977,9.285472881347934,7.900737800124331,0.15418669128651752,6.736454245027483,4.925483466629139,3.871110711413932,0.29894400444407054,9.78778072131277,1.1357356083251635,5.993984510157944,8.632458965229699,1.6738868872205481,1.6429346709030024,8.473435336132809,0.08147353079781983,5.467348211909728,1.0333138108060003,9.111512072568733,8.686407217524994,6.619256140487804,4.05384725901091,6.6783192176574495,9.501475988360784,2.8016956635605617,0.9387473262736479,1.4007412203690928,4.545636006572145,9.809665329216365,3.752861112824073,8.04264272409319,6.892513863010851,6.810435525460683,1.1539769929632993,8.802398490247343,5.336677719044185,6.8793641067401285,1.8136255065458107,4.145670075549743,4.605178116538289,8.875532735978659,4.334583777298022,8.03699479280796,3.1505851477142777,3.905323263527467,1.807196437251568,3.5867567664880173,5.691229162248288,8.89172063722883,8.807957409224318,6.959727662032225,2.820877021862409,9.68865192375459,1.334734791345984,9.536746255894172,4.776559242026039,2.240375077696024,6.431520681134424,2.121019117766203,7.374908097572006,4.260636701905149,0.37783764184135205,2.215363584944199,7.646160688775856,7.307350889044297,3.3324592870365777,5.575904236292875,4.768047735850507,0.18727960711202973,6.569077232037515,1.985006132691991,9.101867292786048,9.619851623710481,6.299622728675891,9.557446958729201,6.5269708660172725,8.721863557573602,1.2238016718392886,3.3562826955424874,3.0616891123247125,3.8228423389511335,9.22021952630254,1.456822450338917,8.783860752406786,9.203795427293624,4.467254709326425,2.3240483957322455,6.325545611195505,2.2395232966306566,7.10047052247832,9.527715940963382,5.338565781439217,2.950605037931875,7.20592335367815,3.9531225964021877,1.1234234933185117,9.32537767952487,7.699210266727934,5.238014528650448,3.2422644621258745,1.0794351095970423,8.532548605505546,9.21811771067409,0.1683847273835526,2.962073148261384,4.7963876382165305,1.1135178602207207,7.693372655337633,5.375359629041809,9.83130453664656,7.5077456223979695,4.735248061153648,6.575819358436441,9.219593860885542,8.288351874059877,2.2678075496887007,8.983530769508903,9.324312316773163,9.633458631092344,2.3211389679346595,1.461446299751521,5.501700570363655,6.803713079645187,4.276749705777039,4.581692188500948,8.970171009396836,6.841394744288156,1.706810771901992,6.334950646260664,5.9328408124487915,1.4049167164452703,1.575614448075806,7.034181208181396,5.062299828090846,7.819674073987026,6.546001747809418,5.0106802666821215,6.107505230126624,5.720675874907368,8.949121959712276,6.8361273023245435,7.880257874471857,3.686376436381036,4.660544068947468,4.815102852547486,5.2421191282607165,9.606030310234656,0.6730714224778755,4.875228548010795,5.811963752327658,6.1302408442467815,8.828058975471013,2.3610346307717123,4.663117228855751,2.254646044797912,4.7299977662498165,0.5798613207903869,5.399391515811405,4.173351076348208,8.025337102788928,8.141914471085695,6.780874541203019,6.802777450494255,5.1954554283371435,7.601196660391018,9.751922374496074,7.365945107518536,4.423851710331559,3.9505005851704067,7.638619042558911,0.5842086961849646,4.777615809679048,5.793645091675903,0.935582879340835,0.5328553498064981,2.827034799295023,0.8294381897766345,2.176559141708634,1.9948646171186613,4.079438369078163,2.847730074854513,7.672978614276779,7.096275538444878,8.118925899545195,6.986193480537624,5.935190702030826,2.8507194947743075,5.670266672473582,1.6982785245109033,0.8837746207920438,9.889160763848789,2.5592262662038334,0.9204581889911134,7.441079617542103,0.5913470581534086,6.214633597732386,4.031196571614714,2.191677863070829,3.193480772772608,2.741551610513564,1.8401587447932855,2.1481260699040106,2.7091112619244595,4.681363209870435,8.351756957335056,1.826003182572129,0.0400252937275658,0.1148044176042462,1.069132170739655,0.47415715853121876,6.45042969564294,5.9197801954701434,2.3932471900191077,4.646732683079351,1.370168744254383,6.1728888583364805,7.795340625654346,1.3439931229586266,3.6550078620427584,5.286758991857803,3.183617710870814,8.867582228481552,6.732185453750505,4.044881326271373,6.855966710388239,9.409772855073946,5.653567316934094,8.98979314412496,0.4442971017735675,9.305857047772681,9.773211244447618,4.657249813710964,4.584085760236798,6.665962995665842,0.7105722007426274,4.290598138962302,8.355981351661422,4.635246580255357,9.369052689689246,7.395264914356288,2.6351051304519646,7.451955247404287,7.0142910049822245,8.985619500877247,0.9611769191968866,2.3424537425508096,5.173393656982038,2.9065128027959686,0.9044630586737812,2.885372559691677,3.949044755229394,3.6524035461189786,3.2328606040666252,4.845745618049035,3.1035464283509384,5.938957208894793,8.327559627471743,2.2734405847094563,6.145710378833447,4.27421913157853,7.1890747631520195,3.2813924133993333,9.26789789289428,9.784188095736328,4.97434951492502,1.4045291068277832,8.743876979887261,0.8365729205334649,6.025699099810091,9.487572930766898,7.465256919147514,8.18508855027706,0.17573897764208146,9.477752626306728,0.9504312152246475,9.16392212336746,1.1017252035858416,6.3041432843004745,4.212938264295936,4.232584191987767,0.09338471098140566,4.605921726614286,8.368631136875583,3.9378815074010087,5.4812691590251195,1.722015989308554,7.415986414332362,4.884540171721614,8.69520165326076,2.9906182643581714,2.4681527119883473,2.8921218009080496,1.0075182577982589,0.9820884959275866,9.891316969107143,7.603334470168992,0.8088599561581367,4.8250116934536535,0.15412984832404497,4.8381199087700155,6.676621639458464,7.352899806978261,7.974887644581665,0.5011979337448613,2.145792146977259,4.095342082177176,8.203566904894448,1.3444903957775933,9.919932400155236,7.737806674940337,1.7962164972616046,8.986312272399662,9.889365614417112,2.8937377155501154,6.6815232176082695,1.7025508044858295,9.515419355646666,9.25376825905329,7.983891890920136,1.661045074661478,0.010275266778907444,0.41423544038578175,7.669658899182952,0.13822521450659764,4.599955689535962,5.008677429697467,3.74023839096161,8.008206960562275,3.637250866952735,1.3769152100830895,6.269456161402367,8.761093767764807,1.2694908333954724,8.712179053987914,5.918987558558067,4.429258475323068,7.000245590526292,9.721471282943043,3.343782644993256,2.842898921023378,5.813453376227962,4.8983497106088425,8.941569102693926,0.02919372467689474,5.12524431347444,7.753585966403442,6.375782470563502,9.306677052981378,7.52933495988422,5.528572120287468,1.8556064453276844,6.328099033033922,0.9518503293174829,2.550943241658028,3.941742749582011,8.757366873988959,2.578956965083863,9.105436358583425,8.635700677842241,9.255052850937602,9.40822711312168,5.622431017504519,7.708610088440353,1.6422663538187932,2.6533115623839176,7.86343408287129,4.841853599611278,1.5463065074649585,1.8000621623447977,3.0883472751953778,7.655668296143007,5.277511207360412,3.513615669509038,8.39492638414259,8.887841012813556,0.3765035007906703,8.002190233644919,7.677892827779463,1.474600574217928,9.95734719435381,8.172915897436026,1.769348747082582,5.000993433800975,1.403527955065118,2.3663789699118243,0.692707882817778,3.5382887008169406,7.561975738859941,0.36883893831891834,1.4297395002742253,5.822507069897862,7.076425728575986,3.2926379290391794,5.6335176861547005,2.3680996654985287,4.149888374398469,8.326404757614029,5.429767129581096,9.706624862455126,7.754266057914299,3.379468163538244,1.3828568265931152,3.442072599962407,6.129922789777171,9.820726766758835,5.645554600936816,0.5423278099066553,5.031288926071356,3.8300434616515666,3.816254516992401,8.519503413034409,5.269351373932221,3.520619683066024,2.7690428221696894,8.450329700913954,0.6009021904004297,2.9452369808339784,3.241001117749276,1.5143575101113171,8.592025970839705,9.151599987529508,1.5534182993906454,4.580182937977226,9.53757108181309,0.555065572708362,6.277252345438608,4.174254484190307,1.1017731651121765,5.746778026614631,6.230135575714188,6.613943045663982,6.104014932470221,1.4153238462749762,6.0074746258863065,6.647121182303792,0.5266073894265011,3.152130064090073,1.2482757211917406,0.5196958888339553,2.8306126595815484,9.449169462690236,2.4381594680420893,6.351852462698313,4.021547327707015,0.04293885973330136,5.191542629952153,4.82201741062118,1.8074101269153942,2.639787579892836,9.63005214420422,1.458342254986309,1.9995382460105526,8.434698511047882,1.4477045745647499,1.1524902349059518,1.4272571425963099,5.616106794116488,7.590070030102815,1.3656079285265044,1.8339299006802778,7.447586635571632,4.289416343776193,3.836721184775229,7.907669006043198,4.074702620409793,4.933422931430124,1.4916833964897247,0.5194083930694648,5.566320205154405,1.7578957410449858,1.7319386071028897,1.8136939730300017,8.928372302919165,6.2752053102691345,8.943940672770106,4.310283418305165,2.4925336010487342,3.022806351219567,9.627613696215152,0.07530648716482347,3.4781980447030936,9.976826718502384,3.315001560824198,3.357898495829117,6.142328415352598,2.974391153624225,8.536998308485096,9.71946252904846,2.5372849710563017,6.857903610745765,8.650105594188421,1.139365926286282,7.288465854442585,2.4029858716020636,8.228411931521077,2.0586111195650836,7.233874592286567,3.8537380241678143,5.538739985126135,7.492519139255589,0.2601951137122227,0.12556075622425888,7.983313308020459,0.9690928574168933,3.2440610431829753,8.088130391412601,1.2162948543189778,8.505703901729976,9.862048395119745,6.225473508593966,9.615431646584343,5.179734155078643,9.93111620230601,2.4345707363958202,8.57813315856949,1.3339992240678167,5.754922878266289,8.936094860819173,5.91773184011176,1.3305489379617907,1.9519803624055077,3.7373292992162943,0.6213398486987964,9.260543621579366,1.741040180598652,0.8787384899669992,8.569137727797564,4.631516357431376,2.02532216481061,5.097268731851361,7.520878697819253,1.492775289762136,3.327094727204216,7.313374169051745,3.5722961600818315,7.440287831266401,5.260813158276962,4.813774317806702,5.6194206809482905,6.373859006045777,7.907404605945645,2.534417521868275,7.295366043276363,0.5354269703774328,9.521899634096036,1.1771125741558852,1.5636309764356415,0.2627674189278717,8.728240528912403,9.393678352374899,6.331227335246514,2.6691411551532696,1.5177758737660185,0.6699522436163985,8.409777018145164,2.96451250552779,9.878270290490132,5.652463224485924,3.328366406795029,9.74011906131745,7.524963752294487,3.87617260588605,2.7361358010035386,2.2631591251616645,3.7222139993385417,4.344627899105131,7.99597338017453,9.172357866838084,4.114399229685716,6.4538333138493975,6.833820650923641,7.694928392071438,7.478083545150012,1.9179322031602197,6.268549644133388,6.156801724596146,6.901744321967149,8.813555901381495,0.5357169941681716,7.691259618939268,2.1640702385471244,6.707137257327802,2.867917271029472,1.885495767697165,2.2264199811726315,5.140050962235807,9.232881662081597,6.209313593325259,7.105596836317747,2.7549149877211287,2.611561049293065,9.58358414059057,4.986716575480001,0.7973642630707856,8.819150473185534,8.290250896986981,3.7379250361325567,3.5216156269955,0.8293889891277528,7.700387578833698,0.3494605386217109,9.209749693293825,1.0062246808345954,8.366413824915835,5.328709252039932,6.832806728445188,0.13670711343295672,2.7663703752283575,7.562678260190722,8.085043821478228,1.186052312889323,1.0598033751372804,4.327500190816497,0.21302572889300153,7.750704796855532,8.483601654820491,3.9830539488522154,1.2185666843381204,3.0810465923942765,8.702138270906193,5.723777459976378,3.4908294326594547,5.709034217082061,1.9028090834742772,6.97309003955864,4.0886901671577665,9.862867387975548,8.73319495865582,0.6805072240107513,5.1989851534962135,1.6813577568684646,8.990701740752696,7.506363997675038,6.823964052708737,5.040252447341027,2.7928817045347487,8.27565873536036,6.421825897411395,8.704314183429993,9.929476677943372,8.453251260355598,2.859116737506391,5.880805247092842,1.2540487808703782,9.819029081419067,2.0228678006296708,2.33342926847933,5.536345123329136,9.278349451963013,0.14829196331983763,5.0626501738378815,8.89282106512924,1.4385083813860766,5.7420632389221264,7.616291380356694,3.6379174013618765,8.847054017003133,8.315376237119185,9.115439438656129,2.5904894150600954,4.652255744491005,0.6758294762189965,7.5995248144777765,4.314567378732992,6.853474530070319,1.1699060091941882,9.086789306233818,5.455914785064473,1.5925912857365288,2.5053008817902422,4.445843897719204,2.2568089192559704,7.588335695926873,2.1341852380131576,6.220588599480436,0.3361920052344569,0.0975176108150122,5.448137185221265,8.418866988168574,4.58069438421248,6.579453735871203,6.9875332292026755],"x":[1.1711867335331139,4.952101175656683,9.088936038775444,7.730418929781999,2.3401755118211565,7.114586134296294,4.13940035311067,6.3290110460810345,8.331421182365695,2.6309460542582697,4.403538771408158,1.3980262645376174,5.581106691684818,6.988238532717466,4.964832816723144,9.934143425270406,6.199649327292887,9.566308745164127,5.2765885504464265,0.7456131183813142,9.60387325133926,1.9123049741970788,0.008886108107737378,2.3232216076689904,0.7233210421436853,6.630509220154557,3.7417370124244886,2.876916755370895,3.8754109978818474,1.8084912107734907,0.07970363078663834,2.798709392412768,8.367364171304052,9.298245539485357,6.413244987919169,1.5036109856399404,5.772957603266486,3.556441555959984,2.4671700948667197,9.294065957700363,7.972437261969887,3.532519087936339,2.5612732335337896,9.424512205194857,3.082150514899371,0.05944878486842775,3.19720080044108,9.242008682142227,2.646549052571241,5.511748924391043,1.1177575907904447,1.2633350427638512,5.990845978195576,2.567888322282621,3.5828760628193956,9.905590418370608,0.5843579403048738,9.008609240966258,2.816194020029852,1.9348543976717902,4.043782306435846,7.16343877248293,1.190958539881064,5.108666187772735,8.006463781797859,4.627943857025711,8.246980070019674,2.024709847599413,0.36630039343717335,6.712115135016825,6.086181117777096,9.350783855098257,1.3874449270414657,7.675659889757518,6.307201911725883,2.1335784906873068,4.786339069451946,1.3491555826341894,1.9075614227037163,6.105350532204101,2.750812053894993,7.067269711380133,8.366940883901353,4.422772370437011,7.140922056354803,5.471115514932199,1.5644465431224686,3.3765915915455746,5.8756211198495905,8.614269890446408,6.776830454010129,3.917126947818399,9.31261715649944,0.9075336083400476,2.263040320267302,4.674993494225086,8.93826603462565,1.0102087031512008,9.057256566957308,7.789418121072151,9.696500022137812,8.825228265755069,7.662777303013302,2.7063413432459305,1.8550104949487767,6.865755143556608,0.8843108984709502,3.1925483985522862,2.199198659872552,7.8903162339530635,3.208932646733369,4.742286433131921,7.405813018833978,0.49126097916975864,2.5555878577323954,2.6763153696417707,6.368766194461067,1.0021863599714487,2.541609542264056,1.2115805849165961,0.9961327693087485,5.855950096777535,7.0248079734911295,0.04019667990057041,3.336356936604692,7.542543565589774,0.0005033969183054765,7.178953275731709,9.146693452028687,9.373254968601072,0.9633105011540977,0.5952121902447316,5.7703924903576524,0.5205719059108271,7.805538336030448,8.755015056144488,6.900768938646779,8.705024664745629,0.8529479899783299,3.804623214039551,5.3895257968818555,0.8854396554477684,8.755259307059795,9.132535748034755,0.7333785431204132,5.578378057392952,3.493394330581654,7.483417781266217,9.248939833818477,1.3618765563041402,6.612343023690201,3.475340120237216,1.5492702540994685,1.428472027636083,2.3933375974827342,2.0534876047295647,6.896761273846652,8.554638960156677,4.215539431528184,3.883368309494337,9.753157978628945,5.57019520450053,5.1081049677646035,7.313602591416046,5.432163234965404,1.8213708557087815,4.420254093136274,2.7970705381503747,2.74388402945539,4.064207712810313,4.539225917357774,3.3639998610618016,1.2949537403888356,7.59402084327477,8.710498411765059,4.84067951431872,8.43967906835746,8.986492470268402,5.488675183393266,0.7627093696208265,2.7314516454889715,6.850396268264052,9.030039197381821,0.24858575079732104,9.328646354056612,7.200957869379543,2.12802541183553,5.239587253411495,1.06440561378087,0.8925277975372037,6.318508911029797,6.92820828073228,8.392325733710093,9.943862865195614,8.210984489604868,4.26081779954925,8.6637668837532,7.836788420560417,0.785959984264597,8.468288776660325,1.9431702280875962,1.2593965515051209,8.689440080807708,3.967053792638957,7.1197542071739655,3.923472184881851,2.4677868090516464,4.088000964005952,0.6534741414165812,7.0110826838843305,0.21379759106003648,5.009742184981867,3.6285517694917813,8.334292166237518,2.0342525918117316,7.73058142953424,1.957679915121311,0.07909548441424219,2.513749187194567,7.631418003462533,1.7501851898078624,7.10329104164437,4.382226515369842,3.962139120880399,1.127452556091677,3.7233882892555625,5.25693405943424,9.335757293920764,1.501082607882367,3.3351792354021037,7.89674533388313,3.2609551135151627,3.1520942160720944,7.8495757167239315,5.137245721750219,3.744062248860993,0.692775585548242,5.128997420634582,7.083437892001188,1.5449450102495055,2.3693906105692952,2.878844367846478,8.963518721397179,3.098473147215115,8.99757197519591,7.671999356226118,4.382519517357517,2.5498496383851355,7.981730067353685,9.195748965145947,8.970592593296159,3.725191854045351,2.943039378244192,8.757209426198326,9.010009539864015,0.1089373216540257,9.684832595245865,6.125046959707774,4.164043127012329,4.9854922298082505,1.3477447800988718,5.453783354641888,2.1927596454101828,8.979057767803141,3.0968863368106203,6.314792364297423,5.8764839618115206,2.4547173152936708,0.9352164043291666,5.7091282684371265,0.03523483461449706,6.304451712886687,5.549997901413766,3.3793297762886687,8.385419361051678,7.560027844239794,2.5312373074884476,8.105407933931934,1.0262446658536684,5.338976197435703,1.8948173319936923,3.081641905521575,3.182275002831032,9.930013928998884,4.051935783119436,8.55340147064529,4.946609797576993,9.945414248872167,6.525453088411545,1.743720519944787,0.051069858902741405,3.908304755112284,8.703676896968549,8.371014889449226,0.36316471229094427,7.019936379660933,9.529552580123081,5.679819749118005,3.7926357912975295,1.6419365306912548,8.25024485104036,1.9526525704307773,4.10565176394758,5.284663229814878,3.8876210534339295,1.090502823507049,1.5461648680031947,2.2713324939861623,3.1665217119934264,6.007496734848781,7.199402315800716,5.679728197566405,3.086045780470199,1.0931783535438644,2.906672367848806,3.5105472181309194,9.915115985746592,0.8457458801865902,7.860514598863082,1.7797025847607406,1.963941331734953,1.9847406387413136,6.369842310311345,2.9930865436147025,4.7053791405918455,7.867879361602112,2.8565943787542336,1.5484928179017765,2.9981965963352564,8.751526915603769,3.646943518191059,7.966269783039143,6.09415670619078,5.107772245543711,0.21336436855540875,2.84110468986593,1.3106559122056316,1.6937536335832126,1.126671734626985,6.316822474625255,9.495239489027687,6.692288899435108,7.5059197364837456,4.113994323819526,3.008852318312225,5.833392630975089,5.5351121252614055,2.6414678796783253,3.7488499697734423,3.322169197872795,0.8559846319728504,2.44211885060704,7.342838182546054,8.035356597852495,8.921122889492732,9.929641425288569,2.6471723308916495,2.0369814062004576,4.702257105029071,8.429132372291592,3.103319374320359,2.9659592324738604,8.338856452634737,0.8044581758078162,9.590886246911358,0.9579832813552036,9.050329375294723,2.553150146213452,5.948457811789001,0.26595297656178296,5.394189088977994,4.362664332355619,0.6424881438463981,1.0799129338386582,9.347113840817835,1.4679871909032438,2.2135436885834836,5.489526635638438,5.104882024421798,9.563596744789082,3.7742630018439294,0.4259888097125719,3.224361099149662,0.5852663512009015,6.1108620990237705,9.50927457160055,2.662046870079755,1.6468012415517808,3.953227257693228,1.0736650309277862,4.886577103764875,4.024435734524394,8.605290836309095,3.3400387600844517,9.177314640210659,7.716981411791892,8.832180235232673,8.801113897196416,2.905816910969703,4.940266093740176,1.4135951957797865,4.403196739717112,7.167981817280733,8.80377330325122,7.448921997891144,2.183257632396214,8.259096962839802,9.35802569846505,9.899210652129781,5.851995174188984,7.896353363101449,7.4340681715542845,0.16744913200795297,7.160326618283726,8.39762499766069,3.775934435076853,3.802354003755588,1.4070615076026782,0.2279499762745929,7.3984026997580195,6.157842969161997,1.316983696043399,3.090304962039656,5.8728928552048405,8.279897525513988,1.3526650962730669,1.5661995699979303,4.2110281893004515,7.1766678861527495,7.599755760863198,4.996368692190563,5.587451526694885,6.8420780855989705,1.586072804888079,3.8086687182821666,7.781565685925591,6.058649102844731,5.702395099543791,1.405548255932374,6.093942714237119,0.24691270001337084,4.5871642237273,2.631754903613488,3.4029104459742743,2.8169058095297617,5.836937967380839,1.6545817059623524,9.177569238810424,2.146882673578916,6.747638597569088,1.7193558510112439,8.455846925323252,8.130624206267857,0.8185934560053898,0.8098577725802958,7.227600637727425,3.6636523531332665,2.6561086105419296,6.483768535155963,3.738414135268684,7.863897603895316,9.325864515604035,4.449234202243499,6.064448819869881,0.6098197453537724,5.6513323650851754,0.6187143974332576,7.455271256597289,3.654883468348431,0.5877991533696969,8.4046725293091,4.054843332809826,8.73314830027283,0.975333640166256,4.413290476213721,4.308065547376776,7.842446253389279,7.7758382037897755,7.79689852951182,3.7986558736061804,5.469048866201913,3.055761228818228,4.68972019722205,9.011262393937132,5.243713694090346,6.805263964859898,0.9840662800691069,2.636862579729129,6.951995074260342,4.094317069351985,7.769988696449048,9.330836469391201,3.448478084338198,0.14280915395339377,5.322655476838294,0.8251331344306267,3.3832432546585545,9.04436873150189,6.9217917848989075,9.315526609388025,0.6979621130228586,3.3485201877879445,4.387203555408736,4.387361464877204,5.524318609352674,4.648238675678393,3.2370169673346916,4.4736569824984525,3.508626474249472,9.147756095648491,9.719050113368287,9.878796058160562,7.104795902189293,2.296386228669951,1.6833098442199246,5.5160468181324385,4.456189976935572,7.691544708600848,2.7083380117050693,6.05993548253124,2.791243568804689,3.199914780670594,4.150031098032205,7.162988884926385,3.843835078128144,8.147978983651695,6.682894457246025,5.443365062185839,6.76956675244864,6.718941348824781,3.5668759458543375,2.3817683957836566,6.495804594543467,2.5248957288900353,4.125337603960104,7.324890893181612,8.490257978585278,7.488478675700594,1.6549233771809058,2.216497522036809,0.4406999827035274,1.45400282899246,7.130741225355934,5.296413871379806,0.6971551386164365,4.262749355545779,3.0671447544321895,3.8301696144025854,6.5767933406137935,9.048606690739327,0.560536179484501,2.1668569684633,8.890569213184401,7.98564854200402,1.472759435294826,4.530334960108615,1.2716885340886885,6.563666177198,3.1128821955685226,1.0361145592614407,4.942921543177789,6.7247281172827105,1.286100490250226,2.4002049629696187,8.58234895532817,5.541178812542653,1.4444757112940843,4.560474731735152,6.797371171163031,6.009978918385217,2.669559791220939,9.901762689646144,3.0601089353652267,4.8607745423659825,6.896158558485017,9.041019921274149,8.637830417897032,4.6931670026332934,1.4572279278908917,0.9896456703149226,8.98236110993597,2.719048202551153,6.609354273824701,4.818972341509369,8.574404459247432,7.153776895788095,5.6977826734598676,3.0916270499957954,6.938027949797836,2.347707784670501,2.910781267712439,3.4945504494135182,2.044780036647511,4.917457199016075,5.47860507648452,0.9305099196097566,7.017955886694331,5.559226970527648,2.1245074460495994,5.8417978518704405,0.23009027196968956,3.8775504250900594,7.14051397905985,3.927116505703878,4.7128312266172445,0.06951745527109754,1.5489025767114506,1.0416544703281705,2.5856049792941227,4.764379012860398,4.61086056317172,6.715635387125706,1.5266231933769392,7.510864954235188,1.367949598622078,3.9580630217180013,5.186852495314556,8.719794326590653,4.3846827438874865,3.1624177329601877,5.510810224728726,8.507857092023736,6.41745749259454,6.16241333407925,2.6647843015892136,1.7464046335398375,1.303228191898318,0.09355468892391361,6.489134123515356,8.96197510562478,6.3189318132715915,4.500857363381572,4.9324930466541,0.6768456870341222,5.175593698994907,2.716963739440701,5.881372912772067,2.3611337274736544,2.178535085277278,4.103886539699733,3.0086761339808787,8.755467697625916,5.3392346952435314,1.9447455243175882,6.066449687328166,6.4765259719210055,9.359459000450132,1.4515598115785422,5.830380693967938,7.646377293888942,2.775626719326636,2.047075650110093,0.5699020932448939,1.5089182904196674,6.897462557142616,4.347682298690609,3.57870423316178,7.723266341956498,5.311283674316083,7.514008117786859,1.8886171795543683,7.11456820700064,1.9847079302288306,5.67582183774046,1.6068670942863483,8.132382494442535,9.778473825768284,0.7845316430421523,4.175052791795273,2.3629439728353097,8.718000876779913,5.331671014345199,5.096996532858727,6.731590772250955,1.9400979882146596,7.626053293474753,7.228380226950868,5.98589738905051,6.137258639396618,9.69827309146115,4.317971987269837,4.390043375123922,9.950579698650504,5.808077606985984,1.0470324601996817,9.563147656516264,2.6526831870902567,1.477337024147114,1.682195657899217,8.285030531619258,4.126426812650088,7.322052446947311,4.705471033486464,3.137993455471002,3.6532109215745723,0.8289868760830865,6.198190648546735,9.091098956347727,2.0499153378874535,2.566570535019337,4.130003117667933,3.6667596148632753,9.911186847636777,8.790974711587346,2.299450922549986,8.900858370029566,6.5776716009078084,3.930338131196429,5.973969406210933,4.077716428243683,2.2464681427675814,1.8521726235057234,3.4903992395955408,8.262817656293162,0.6704181446276714,5.351164149110121,8.41631094362893,4.11878650993295,7.551973770727147,1.7120648430530716,0.6873197840501177,2.1092920879809562,6.665009545145342,3.646745171401,9.107213133596911,3.9664232818607514,5.956199996863303,0.4813429467109298,5.774495844281711,8.913147434431693,2.3496296004334805,2.4325253896727195,2.8467053990006153,2.7822177090115385,4.616575375364588,4.755166200343501,5.484640032815628,0.09995294183387626,0.9211388596162218,4.724470407579178,2.996292386130226,2.6127589781673777,5.748197774280792,6.49879734464079,0.4321262414034055,1.5207694824736118,0.38967007694487243,4.367975578347998,7.816483796568132,5.102926236438479,9.798327087870149,2.8051660962380076,3.216123108790876,3.6753736646365054,0.11284262848653581,8.685999898996366,0.416404719310548,0.8341928219612682,1.9254336308506348,8.805959219465562,8.917147274305453,0.8514896794319249,9.562515088464759,8.81275043087047,1.533312736201835,5.72062784592696,9.921266380795553,4.539387786247948,8.855240899778668,5.762248421550186,9.984166788235873,0.1772657324517546,3.395846284249686,4.932456449594262,8.647831558647646,8.748917902222628,9.749315829362482,1.6790714085853686,0.7095266619947083,1.6686447573741336,3.2412513115318475,9.551000851322692,2.481612097063366,0.3967937443411951,1.0472779029207313,3.2896894331327364,8.442888975716823,0.759664070266246,4.6574420778078025,6.5364243237071395,7.356687300027652,1.7448631846775475,6.920319828799977,9.902341201237846,3.3715367563342924,1.5967073340858784,6.9608896240908935,4.9337455598235325,6.647748148534447,9.022868077424693,8.579857698633058,0.7680569657047975,0.171788975387559,8.448907401721641,6.509203976143345,2.5304604193012348,0.2255529451523164,6.985842805168905,8.558843283477069,7.888184763175239,6.833127289407774,4.037841873192178,6.93186684315833,7.433690301740401,4.706914869395447,6.6395844048086206,0.8363343419971936,9.978245190233004,8.566492486985034,4.846346528935599,9.893403180836229,1.8455363967620508,8.178394567452997,2.734347576220404,8.248096312481499,7.641089528310503,7.4541495632542265,8.313072375880612,8.025671285522396,7.205549802559823,0.7154763331111025,6.63994333115636,5.652590700565748,7.86886577114587,0.08594614037060744,0.22495909509599565,6.569318986506669,7.306428916324572,8.926508573917625,0.39250000801852813,9.653786276445208,2.910630315334397,3.525449827509306,8.16391040467909,2.9276508266452583,5.830200624690587,3.393230673084473,2.8687184357444417,3.850173443597247,7.700635814085775,7.532374355372779,9.00574635233176,5.181157941972019,7.050435162572619,4.504473935752495,5.269182597062871,0.5657101154347566,2.684049701784561,7.167753082555725,7.247653874705113,6.135489078994693,5.281765081468929,6.187181786445164,6.192541928736635,6.70349658592214,9.471435713992484,1.8154197752710677,5.317658539439689,5.495817561059059,7.702228515320004,0.35769715464943896,3.1020981095850764,3.3738437145542655,8.443802703226233,5.3235626204228765,0.0729588380402868,7.684185356048998,8.93128918378624,4.289561726860254,2.592980357369532,3.820907956769901,0.06671760963145257,0.33924576334551704,2.09663812887505,1.997004630468644,4.512089045805833,9.245360356291506,2.133763309971284,1.9522930437277375,7.789639152970418,9.921281211404098,1.0230626623492167,7.995212607657233,3.210839032732151,4.6156452845288864,2.2094662128600873,8.908015381643617,8.449379640557444,0.5429418687000753,8.76292794345793,8.054828077024363,1.524821342970113,1.847657612891791,7.96832485994763,3.768144365668349,6.35727784776059,8.742167948806808,4.026340948909186,8.327934922443323,5.983152069993121,6.677868250038628,3.677293818103582,4.535098780398606,2.6833536199980434,5.512597536934047,1.2531982809422604,8.700749019086416,1.4135678914341887,5.014540250006345,0.4923691109249284,7.868460929947325,9.705543564661227,9.392463742779334,6.2340586228221255,6.90593359299148,8.806084747307546,2.5322795727534864,8.16692185756314,7.453341490598541,4.8781945516203855,7.645858354171089,4.051459975770452,8.894083087092639,2.5306535378877526,9.760035758112007,4.557296391531349,8.575275039593057,6.718454737282169,0.8518893674474537,5.093354083398943,4.902573610478759,6.096639752539888,6.877666220085061,2.1420021847194137,1.243697621407207,6.316482944611758,2.2906270526343664,6.108161849414486,8.765012127694066,4.970041435168788,5.725781444244477,1.7135850306102496,8.383644426901924,8.908254976034819,9.604420009023567,8.89343963107345,7.66530579314034,1.039520493906947,4.165562463459764,0.4173864919604031,4.559875545547085,5.5779215995761895,8.99575428128574,0.49271240789424686,0.21295221878088189,1.87080193440339,7.942961278802891,4.484926418150916,1.4497118217174165,5.6634552509156695,9.055939663045955,7.199134580001538,3.6538681591390576,9.90990241369375,1.2540505485205933,6.693358762768991,0.19438295929598226,8.437143602250659,7.947401149391586,9.735314646160626,2.4043914622743356,3.8615342851024925,7.446064903595657,0.28713367569004333,4.007847204398917,5.476689945985802,2.7274799183526155,8.024646804032843,5.661868578948825,5.512609037283562,5.903366063056172,9.924828654230941,2.8599280993103537,3.2280425845396765,0.8048418682696656,2.283156889048974,7.716595188067332,9.361184303373173,1.4242026158401688,1.0487874371894756],"d2":[17.88743797093214,12.65835979804085,12.816022850120019,11.839390722251801,16.835133548165444,13.782215735179955,14.58175642228725,13.429148351988259,13.244680128833412,18.488196877934723,15.259941596621452,13.061774312246337,12.42388128136906,12.910391187932792,16.545106073289247,12.195366674853789,12.909142288979872,19.602661719794867,17.3714222553417,16.639899791111635,11.94331790688679,19.44992699479151,11.908728087480519,18.57582356285366,15.578544869170297,16.788286194939467,13.234975412603449,17.98211052913511,14.127308976779918,12.807759293383175,17.44430889228685,19.885875173565772,15.092827312516263,14.971793739065863,19.718508449910974,10.476812610039508,14.222358374422225,10.561257505880107,19.090013391974914,15.497936504485864,14.299081997141565,17.267957453357333,11.234086487751291,14.844147370016232,10.601352053157584,13.556905205939199,13.398775914024162,10.186877619314638,10.109210203816039,10.4795090016225,18.492969279962885,19.977118882773226,11.820677549961609,12.591669091970335,19.80970409307807,13.04761273764619,14.160857748529818,14.258485223242348,15.157444509088238,12.21143932755776,12.29329447629638,10.877838277242336,16.757903642238002,17.18885904841128,18.821574354661788,14.030057501336504,18.58930086626969,10.141525218069757,16.961055336313578,19.8513484228357,11.367312779364038,17.838032058094583,14.753284457392969,18.168267071800347,13.13593190773496,14.015301409020351,16.564193318318704,12.17330461611504,13.974794402516565,15.341559452742352,11.57713125630931,12.247972771422212,16.89918963969639,10.671148711873366,17.940940943755855,16.263401503925245,14.332151987428363,11.293141996447162,14.767760172414668,10.82632033375171,12.54587733118764,10.69082626446228,11.976640702740838,15.02573468938893,18.0034212821536,10.408057117610223,19.771877393897693,14.099358081348733,12.445759880429733,19.668964412792093,13.288122528609525,14.812884423101327,15.19139579486788,10.060449292590732,13.48882412732218,19.90532718905409,13.603538085423333,18.53148596245011,14.482907520007712,18.272531911518954,13.820327212863177,12.911409566188814,13.747423819594884,18.156996940297248,15.123200878577713,13.316370295330165,19.65089061659,14.486055162574843,19.914628680405166,11.508101403494027,12.392589762819892,13.296463380711113,18.005883334910152,10.721495028925359,13.304875857442134,17.685260578207128,19.99808542155956,11.227374986143248,11.756689820230921,14.32867395870375,17.092321936282016,12.17327405132325,12.625863786862691,14.939560138805065,19.31702159975051,14.288129210427677,12.983688246607546,13.270022546773962,10.305619268920939,14.032410349155416,10.161441562108703,15.923303396197204,15.392456009451777,16.729884807945048,14.32217981798981,14.628734141896253,10.05051821050968,18.319602792132038,19.91809898128582,17.889949160474075,18.411317972833757,10.862067867291307,16.145042537515117,10.093117178329853,15.169655602169376,16.002037807904692,19.47942438560552,10.222061619587441,10.14087438544572,10.228459635163716,11.807998032316371,13.809653084097848,19.78578811492455,12.855940130379423,19.944758940318117,11.262232274612218,17.026443849503575,10.232462802113506,19.33390991565049,10.353270744748631,12.415103282459473,13.406062882780375,12.764716033664826,12.037846535709175,17.022467945263173,13.719510477221558,14.50050963920296,12.116265140736584,12.061579226396832,10.015270345689553,11.992405968742954,10.656624535080745,18.93932921654703,15.385307293383036,10.769360424607196,12.630714729277667,14.082632839605767,15.703091225677028,14.973697816098143,15.828558929301247,17.36698657621716,15.76909753365793,14.834871762735295,11.484232379742387,12.058943243164098,11.635409993017245,13.774692268294848,17.906136486453306,12.248736477765274,12.053292281136097,11.90034019861942,17.31447862221249,19.363476944697567,18.053571551860003,17.28038232166052,12.761603344915164,18.869600198735935,19.75607602158044,15.824868038077291,14.145987337620493,11.101836638071196,11.884946051897368,18.95006078100336,19.09850751041302,19.927806556552177,14.813732954165879,10.972534209746392,10.020130722571059,12.558876374153186,19.062264464775218,19.3862221683816,16.566228198746543,15.344822823474493,10.15950874102779,15.337284877255497,12.550871647849089,10.085346626540586,19.372074150130164,16.637247198346497,16.884729738327234,12.667628750577185,15.801363082797959,15.214325787829676,17.972015703080427,18.368120668608036,17.829323984343706,15.303746999871828,15.152409228719272,18.283135344343005,13.48538588778284,15.047534728246823,19.39157564202565,19.30201888697839,15.953962228259977,15.699593129316039,10.369572131485176,19.52936990500409,16.06533721005888,14.0325745313175,17.44844113174008,17.57510774400467,10.163777380992654,14.956267219030607,13.002662638466393,17.830699180173944,18.84100812208379,12.870764524344496,18.17088655213262,19.442383704236157,12.360231728126386,17.622412150095176,12.370443664204501,18.3747610725384,10.04917390688846,19.89472532166196,11.050641822786272,13.876196022268974,19.959037936747293,19.70568694050941,11.168607835809496,14.95745829735063,10.93039709733505,16.817189237375164,11.314807906480706,18.804073702705093,17.72402823700627,11.151183009371374,15.730330567831912,12.280000442669776,18.697103374508906,10.924418684023722,12.250897761721578,15.409028437066315,13.946036751267808,18.909067501716628,11.464992976000804,12.300240406022251,17.953760277929927,17.948282226401872,16.219016888221383,15.476857329746698,19.912439274077435,13.871987590436612,13.375966203798304,11.053572594169953,18.939066292676628,11.908738166197711,18.26046044012049,15.299768108659567,14.167114177065141,17.35686640929182,16.878115042383655,11.532257600476886,11.875749361082066,12.068385934667313,17.95587897436757,17.82209524549292,19.332417419038137,14.097680842412911,12.188740324135011,13.18810184482983,10.129468575300248,15.613438036229928,15.80539951605882,16.02847978030237,19.450701648508876,15.030567858991695,11.277345196618128,14.880009709463698,12.416576436354308,14.21914942813515,14.042218567650021,14.626971501625148,13.383395488671221,19.58237714124066,14.964381305636191,13.26048815944652,15.0573586268596,19.447494374103606,15.196320724531633,15.732460791413477,12.190571090811662,16.73366455245763,14.225059161362761,18.362222720883352,12.303752972504453,17.10437827278512,17.640975742815904,18.505758612456944,18.986349785341666,14.083537444326574,17.241545252677398,13.436342110305478,14.394561326513937,13.0586162962692,14.829301229951302,17.278445557350743,10.2734985161213,14.936337709918977,11.22736951784068,12.537406975012185,18.708094464924944,18.555554206964892,14.853000654944857,14.785305119068056,13.609970428591732,14.880998638128638,17.087347657100125,11.904383748122596,13.104921944680042,17.225072677464443,16.27355601929184,19.335695981240278,17.979061492157456,18.19295182729366,10.074475660684218,11.446990593303836,12.26971798702668,10.801452793313949,12.522796903767938,17.464555982036806,17.45779644358825,14.517403794899053,15.607527326794843,17.346777897365126,11.34350971829672,19.98077136977464,14.20279409223083,14.481412221669924,12.919965685634144,14.096269103036738,17.094655787328332,10.896345743057081,11.401752893893093,12.538765358615072,13.74265108443236,17.66997863501659,12.579930884510695,14.691998418994803,18.495801581806475,16.838391189083474,11.734624068398077,10.859596474452024,19.315135266874776,15.5703256275779,18.152093304157667,17.639610800400003,12.6213567987268,18.58291377292202,13.095314254790633,14.162123656131119,12.322274542695187,18.11855673170743,18.44482287131474,13.956243619038183,10.65967214155769,15.372837909918315,13.550377695514797,12.75322174620251,13.521507381602957,16.550143606109096,11.773958555120444,14.638485009011891,14.06650182952607,15.468075077806308,17.730579364659036,13.854949038455944,15.250843233228311,16.75143325186049,11.19392668112783,19.291142565470004,11.937976397342197,14.093453758927684,17.9875809369303,15.619867842665125,11.975962276902997,13.88757315705651,17.725509129110034,11.892920957917772,15.015919638451734,14.45709206557706,10.27344410094507,12.518381392243995,18.717241281047492,14.571884270549663,10.601249821304062,16.438623607253405,13.262900295947146,19.796467532380547,12.920263218340345,14.879960635361943,16.019699264700648,10.014673839714643,12.260227357151557,17.83391260162101,16.840613713749782,15.304438172317807,16.523329221397148,17.84732349476569,16.13115628248517,12.306073544267807,10.416023951905345,11.108055372563078,10.392322201096375,14.072033994951205,13.352858411886528,13.151207674028857,15.111446372235255,11.0237103073388,18.015075943753914,15.445275451015297,13.157106996883723,17.23333277764398,19.985880781327786,11.420787643173052,17.330772254587508,19.64991807414254,10.274967917944638,12.594917104367378,16.110622364333587,14.698967809590034,12.798534359224949,19.435260663973857,15.660080789115243,13.501488724837083,19.83400770507439,18.576512879979106,11.231470935213427,10.319175860732893,13.841025985235436,17.642236196861724,17.104489552555318,14.372347441843393,13.118517001435364,12.524308089540718,10.585154325632693,18.48617473191199,15.287037788572597,15.063650936114644,10.124728612978762,13.200885757560304,18.609941794391766,12.619944437272292,17.35719464595787,16.821817539895903,14.096849880225882,14.074710806962532,19.66220187523799,13.428245735343445,12.983626741082258,10.682411789090375,18.106271399945694,17.128062815750425,13.188211775197589,14.058107900147531,13.857359385511277,19.800378107194053,15.433811697291961,16.51829744880945,16.038938297638236,14.96489721608709,18.587299644023883,14.957436537688329,13.41946658830092,11.30595968399585,16.96590133164508,19.19069165349849,10.91499828157855,18.191233898040956,10.866181142197215,16.749518000064292,16.776962363950986,19.662793687295796,10.511195637730042,11.859770625925343,15.964247681189578,14.462748310426196,19.383990729451583,12.382472372660729,11.40545523592853,17.059975237212452,18.757711127823608,10.014726071799462,14.325877046908973,14.025722743135113,10.758773362601055,12.496668400608948,13.808975269211807,13.848115094162306,10.71395166041132,10.187352843034096,19.340306679148576,11.394181241483547,13.116621662023672,14.952432832541477,15.905962018018638,16.579738354713843,18.853356622967,16.592027530593896,12.25805656141648,10.23529738422329,11.344417573079538,12.964919308989112,10.477963743296655,16.558970905183177,13.395735397517727,10.374653119874273,12.034459911873538,13.541790038585695,15.075706543251187,12.068727829702484,19.224670573504838,17.430130551241863,12.591995717136866,18.501479661648702,11.95717226111233,18.844707104040452,18.532880599341187,19.635037505039545,14.321695888825971,12.246659220570134,16.110604297001466,14.370436368310555,13.13872758149677,16.080974536806313,17.765548269400384,11.214439819361324,16.032840870596697,12.967861961399896,10.903349855846882,14.622556973171069,10.781049803356385,17.358375088845165,18.074458518420474,13.491497463931307,11.056668317801838,12.546230780270882,16.36448390728745,15.4489811333164,14.291489232943249,18.349981736291593,10.294324078878498,16.35866187424608,17.10004685885258,16.310248573227163,18.303347786545423,16.156171989858134,14.69064549897096,14.906511980544664,12.725002367640649,15.473854127306963,14.141360269144963,10.44557712677064,13.876098032061766,18.814639745492176,12.977853988326764,19.675083947272626,15.199404096743262,10.819939329262798,16.3728325819422,16.05686413190743,19.105109472001146,10.504721062822618,16.46869390921369,16.601773874608014,12.134654630848157,14.913147108394176,10.69093570084325,19.585303886697858,16.371760899504622,18.68964005397957,14.313926110194028,13.704697894530497,16.558296462486513,11.347741622211112,11.170115417657072,15.240822524154892,13.79888027472643,11.018831637486372,14.541718077067472,18.44990911325806,12.669274455617227,16.372532949207148,10.825768571441184,13.745840100431595,19.911099824219036,14.740808091857655,16.37951934424646,13.11308462820109,11.348684583219438,12.290574185229364,19.696157996269093,16.178687688283514,13.425817498024582,12.432384319631558,12.450460514055946,17.99339076751769,12.788738596304626,16.968958020727737,19.95823030426586,16.10222129610144,14.656606898909018,12.019496806089569,17.217316718346964,17.21911857780072,19.9108864535297,10.83548285415074,14.384462574223015,17.268674112190737,14.51692276876934,10.324125751549204,13.169048832005261,18.9208784776011,14.915643613775018,19.375556902158813,19.33743903758132,17.612999505583907,16.93924192154629,11.324830422040321,13.178950177890517,13.553452226679664,15.168374177872066,15.297762191364505,19.805710950576564,16.525475467952226,15.452708871929682,19.98614610457393,16.293460842411562,13.779050753287219,11.216093884166655,15.090178752845183,11.674822377468686,17.52277792776624,18.92018959507883,13.636931656744927,17.318137244358844,19.813702839257882,10.833855246401178,16.97539257897866,19.99516224102432,11.288349292936326,16.132130659589542,18.532612825456457,17.769311046443676,10.612775503678726,16.323537917549853,19.978945185266795,14.29116730866818,16.542767098175098,12.453560837390674,19.369859227603634,15.925496043710922,15.71669866543688,16.577249148135014,11.601130703745866,17.035503632502717,10.118129032189493,17.910583107465605,15.955660114025758,18.61351015688138,17.571151659097286,13.255491307231015,13.08818705593351,12.817059707452305,13.413431723064683,17.77632586296879,18.846881270297395,13.213633928142041,15.035867244476249,15.742576074151204,14.22075482776366,12.101544882173314,16.53920477168948,13.144706318835723,17.81647252054165,11.850541409824181,17.20755635553366,12.870041584536445,15.332890361791517,18.631057075269574,14.111108591013863,10.981126330632938,13.422190623852693,12.485944957399589,19.042074525922235,15.723495927328955,12.544823560784765,11.943455525576974,14.121615281913849,11.07901881018141,10.82222343516129,11.78250847514651,17.114337827471985,18.571200361182417,15.854211247796275,10.330145881750017,13.940260009301344,10.613320871044671,17.692510967173853,16.51610319443708,16.34814514013056,11.485526212582126,15.467075637708474,19.683149412182978,14.366582432018589,19.457433428674708,18.43523882748165,12.009430724767538,18.23141068304245,18.038235404229717,10.979014951086128,15.817235182656546,11.72290801997487,17.01959663826296,13.60919028990504,14.364533705756212,13.328423805236337,16.843155737573007,12.403402478166822,10.820528635210657,18.728385656363514,18.07905085971358,15.516096261483137,13.715806038054561,14.753342655367733,18.071274880350423,11.747932061713835,10.635281541638102,15.973469486730904,19.13521412444388,12.33831187681739,17.384513051398343,18.652334175127628,13.497852620279474,11.500215290513777,13.695993230418722,17.399322729165643,10.083731664530717,13.935344060956275,14.093175266815638,10.692056866012651,17.098674706040505,12.448973985707035,13.81250263669558,14.793515895975231,13.32389140725118,10.741450040860332,12.221243900704376,12.93650384242258,10.229844018830809,19.649315460831478,19.726376280675368,12.757008066939303,14.859036229885703,19.533430987545586,18.13753835254694,18.836221120106153,13.671947881397934,14.427465392526083,12.934070412320652,14.490633454230569,18.561092734597125,13.320686290185172,16.979977808273517,17.169067960834433,16.33477012105192,13.267201657784701,16.95735669375219,14.066133137054067,13.757000058181186,10.95705368706307,10.057764176880404,13.117524272294027,18.42410259962204,18.895990416736304,13.577679993809939,11.093394591329757,15.402638059405673,14.581156567073965,18.895502181654088,16.199434163063877,11.837578109773554,13.75939939178746,10.419840051190823,19.505365436068494,16.74095147898671,17.455914264600125,18.83998785383457,18.441813269709453,17.777270740558148,13.630311662178245,10.051633146084466,14.952974064317237,16.635941533586802,11.097666138288027,13.225216910412561,18.4065686445709,14.587439923498113,17.683760761674243,11.408258970101153,18.00804233580112,13.12093163016981,10.586795487327997,15.126706146540377,17.123697533523906,13.738240205908816,10.721202414284585,15.888154946309893,12.688310056584832,14.046331822692569,13.135697109731911,14.807682715402574,10.130731236392496,15.057312876833445,17.407353248186194,18.006069572303552,14.429904104353835,17.953269011057223,15.467597886305352,16.150695934640797,14.778565470683436,14.362479092600973,13.879305788497618,11.251945215440667,15.032882036181745,19.432946798338325,16.475417551518063,16.143962057484895,18.35310927370169,16.296904475867663,19.14322184821932,11.600745753101602,19.63489316875544,19.919708920359113,12.661117546036799,11.857500803838317,12.82608928970429,10.205660759896606,16.94928035965991,11.58801113797371,10.603172287445373,10.843308998413598,19.067004052454013,18.252117774238766,17.849081392971286,19.546486965692207,18.85777059718952,13.601768776608665,14.427179741160991,17.095152918342905,18.56634418358098,17.532416456889038,18.81710267927103,12.425604208995399,19.22029758537807,19.741788254131496,18.58887083707117,17.567366356502944,16.524057866793804,17.782502502583444,16.586876873910043,18.72968716780758,14.433754222208837,10.818200471557146,12.703746361621738,10.723830347250018,16.996700234497542,13.02015326186134,11.129126563069631,15.934203315487936,18.405505988296376,11.27757249762277,11.05539388713886,10.31958493567307,13.266913111490384,15.835737130586756,15.33271852135027,17.015458053319346,15.934046445002739,10.014208504295263,11.490610592747284,11.239172603842277,17.004462966785553,11.522712278000105,16.725383291203563,19.0692799641222,12.122619980199921,14.991713922602948,17.822319571679337,10.113249065034696,13.967808432181235,12.802201112602935,14.019699240017351,11.897010186187915,12.704098062165611,15.458553010736196,16.131913905138582,12.563921741814594,16.716127106924567,15.901486693777347,10.213468273324938,13.611948480534446,17.909584502013363,13.551446415009053,18.164645083161886,14.838168552585733,14.247653249072878,12.264097924136095,19.89558900174861,14.702786346306347,16.168894896983623,15.294381928994055,19.244000929362407,11.373039858271976,17.80599274641856,19.8299304715516,18.204779109711637,10.725022978421467,15.44163818685176,12.171777355930688,10.072254965029177,18.104710439540487,15.296097625008825,19.265134437563276,19.317329994130432,14.350774123377029,15.352960378513231,12.664924507315803,11.133290132669085,16.15068209835642,19.299996608400804,18.74986511409025,12.143967320367695,15.528238733620833,18.920631777837837,15.130560248601817,10.198738477409414,18.16763214833205,11.556739163893807,19.37260307090257,11.449269605447023,11.182313252941627,16.642599586245886,12.642628518699556,18.803297121132672,18.940672648719804,18.178940762528974,19.38780274359697,15.641215026102122,12.868287410743967]}
},{}],69:[function(require,module,exports){
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

var largeD1 = require( './fixtures/julia/large_d1.json' );
var largeD2 = require( './fixtures/julia/large_d2.json' );
var bothLarge = require( './fixtures/julia/both_large.json' );
var cppLargeD1 = require( './fixtures/cpp/large_d1.json' );
var cppLargeD2 = require( './fixtures/cpp/large_d2.json' );
var cppBothLarge = require( './fixtures/cpp/both_large.json' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.equal( typeof factory, 'function', 'main export is a function' );
	t.end();
});

tape( 'the function returns a function', function test( t ) {
	var pdf = factory( 0.0, 1.0 );
	t.equal( typeof pdf, 'function', 'returns a function' );
	t.end();
});

tape( 'if provided `NaN` for any parameter, the created function returns `NaN`', function test( t ) {
	var pdf;
	var y;

	pdf = factory( 2.0, 1.0 );
	y = pdf( NaN );
	t.equal( isnan( y ), true, 'returns NaN' );

	pdf = factory( NaN, 1.0 );
	y = pdf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	pdf = factory( 1.0, NaN );
	y = pdf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	pdf = factory( NaN, NaN );
	y = pdf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	pdf = factory( NaN, NaN );
	y = pdf( NaN );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'if provided a finite `d1` and `d2`, the function returns a function which returns `0` when provided `+infinity` for `x`', function test( t ) {
	var pdf;
	var y;

	pdf = factory( 0.5, 1.0 );
	y = pdf( PINF );
	t.equal( y, 0.0, 'returns 0' );

	t.end();
});

tape( 'if provided a finite `d1` and `d2`, the function returns a function which returns `0` when provided `-infinity` for `x`', function test( t ) {
	var pdf;
	var y;

	pdf = factory( 0.5, 1.0 );
	y = pdf( NINF );
	t.equal( y, 0.0, 'returns 0' );

	t.end();
});

tape( 'if provided `d1 < 2.0`, the function returns a function which returns `+Infinity` when provided `0.0` for `x`', function test( t ) {
	var pdf;
	var y;

	pdf = factory( 1.0, 1.0 );
	y = pdf( 0.0 );
	t.equal( y, PINF, 'returns +Infinity' );

	pdf = factory( 1.5, 1.0 );
	y = pdf( 0.0 );
	t.equal( y, PINF, 'returns +Infinity' );

	t.end();
});

tape( 'if provided `d1 = 2.0`, the function returns a function which returns `1.0` when provided `0.0` for `x`', function test( t ) {
	var pdf;
	var y;

	pdf = factory( 2.0, 1.0 );
	y = pdf( 0.0 );
	t.equal( y, 1.0, 'returns 1' );

	pdf = factory( 2.0, 3.0 );
	y = pdf( 0.0 );
	t.equal( y, 1.0, 'returns 1' );

	t.end();
});

tape( 'if provided `d1 > 2.0`, the function returns a function which returns `0.0` when provided `0.0` for `x`', function test( t ) {
	var pdf;
	var y;

	pdf = factory( 3.0, 1.0 );
	y = pdf( 0.0 );
	t.equal( y, 0.0, 'returns 0' );

	pdf = factory( 3.5, 1.0 );
	y = pdf( 0.0 );
	t.equal( y, 0.0, 'returns 0' );

	t.end();
});

tape( 'if provided `d2 <= 0`, the created function always returns `NaN`', function test( t ) {
	var pdf;
	var y;

	pdf = factory( 1.0, 0.0 );

	y = pdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	pdf = factory( 1.0, -1.0 );

	y = pdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = pdf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	pdf = factory( 1.0, NINF );
	y = pdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	pdf = factory( PINF, NINF );
	y = pdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	pdf = factory( NINF, NINF );
	y = pdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	pdf = factory( NaN, NINF );
	y = pdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'if provided `d1 <= 0`, the created function always returns `NaN`', function test( t ) {
	var pdf;
	var y;

	pdf = factory( 0.0, 0.5 );

	y = pdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	pdf = factory( -1.0, 0.5 );

	y = pdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = pdf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	pdf = factory( NINF, 1.0 );
	y = pdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	pdf = factory( NINF, PINF );
	y = pdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	pdf = factory( NINF, NINF );
	y = pdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	pdf = factory( NINF, NaN );
	y = pdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'the created function evaluates the pdf for `x` given large `d1` and `d2` (tested against Julia)', function test( t ) {
	var expected;
	var delta;
	var pdf;
	var tol;
	var d1;
	var d2;
	var x;
	var y;
	var i;

	expected = bothLarge.expected;
	x = bothLarge.x;
	d1 = bothLarge.d1;
	d2 = bothLarge.d2;
	for ( i = 0; i < x.length; i++ ) {
		pdf = factory( d1[i], d2[i] );
		y = pdf( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', d1: '+d1[i]+', d2: '+d2[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 2300.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. d1: '+d1[i]+'. d2: '+d2[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the created function evaluates the pdf for `x` given a large parameter `d1` (tested against Julia)', function test( t ) {
	var expected;
	var delta;
	var pdf;
	var tol;
	var d1;
	var d2;
	var x;
	var y;
	var i;

	expected = largeD1.expected;
	x = largeD1.x;
	d1 = largeD1.d1;
	d2 = largeD1.d2;
	for ( i = 0; i < x.length; i++ ) {
		pdf = factory( d1[i], d2[i] );
		y = pdf( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', d1: '+d1[i]+', d2: '+d2[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 150.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. d1: '+d1[i]+'. d2: '+d2[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the created function evaluates the pdf for `x` given a large parameter `d2` (tested against Julia)', function test( t ) {
	var expected;
	var delta;
	var pdf;
	var tol;
	var d1;
	var d2;
	var x;
	var y;
	var i;

	expected = largeD2.expected;
	x = largeD2.x;
	d1 = largeD2.d1;
	d2 = largeD2.d2;
	for ( i = 0; i < x.length; i++ ) {
		pdf = factory( d1[i], d2[i] );
		y = pdf( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', d1: '+d1[i]+', d2: '+d2[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 1800.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. d1: '+d1[i]+'. d2: '+d2[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the created function evaluates the pdf for `x` given large `d1` and `d2` (tested against the Boost C++ library)', function test( t ) {
	var expected;
	var delta;
	var pdf;
	var tol;
	var d1;
	var d2;
	var x;
	var y;
	var i;

	expected = cppBothLarge.expected;
	x = cppBothLarge.x;
	d1 = cppBothLarge.d1;
	d2 = cppBothLarge.d2;
	for ( i = 0; i < x.length; i++ ) {
		pdf = factory( d1[i], d2[i] );
		y = pdf( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', d1: '+d1[i]+', d2: '+d2[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 150.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. d1: '+d1[i]+'. d2: '+d2[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the created function evaluates the pdf for `x` given a large parameter `d1` (tested against the Boost C++ library)', function test( t ) {
	var expected;
	var delta;
	var pdf;
	var tol;
	var d1;
	var d2;
	var x;
	var y;
	var i;

	expected = cppLargeD1.expected;
	x = cppLargeD1.x;
	d1 = cppLargeD1.d1;
	d2 = cppLargeD1.d2;
	for ( i = 0; i < x.length; i++ ) {
		pdf = factory( d1[i], d2[i] );
		y = pdf( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', d1: '+d1[i]+', d2: '+d2[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 100.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. d1: '+d1[i]+'. d2: '+d2[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the created function evaluates the pdf for `x` given a large parameter `d2` (tested against the Boost C++ library)', function test( t ) {
	var expected;
	var delta;
	var pdf;
	var tol;
	var d1;
	var d2;
	var x;
	var y;
	var i;

	expected = cppLargeD2.expected;
	x = cppLargeD2.x;
	d1 = cppLargeD2.d1;
	d2 = cppLargeD2.d2;
	for ( i = 0; i < x.length; i++ ) {
		pdf = factory( d1[i], d2[i] );
		y = pdf( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', d1: '+d1[i]+', d2: '+d2[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 1150.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. d1: '+d1[i]+'. d2: '+d2[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

}).call(this,"/lib/node_modules/@stdlib/math/base/dists/f/pdf/test/test.factory.js")
},{"./../lib/factory.js":58,"./fixtures/cpp/both_large.json":63,"./fixtures/cpp/large_d1.json":64,"./fixtures/cpp/large_d2.json":65,"./fixtures/julia/both_large.json":66,"./fixtures/julia/large_d1.json":67,"./fixtures/julia/large_d2.json":68,"@stdlib/constants/math/float64-eps":27,"@stdlib/constants/math/float64-ninf":38,"@stdlib/constants/math/float64-pinf":39,"@stdlib/math/base/assert/is-nan":50,"@stdlib/math/base/special/abs":73,"tape":219}],70:[function(require,module,exports){
(function (__filename){
'use strict';

// MODULES //

var tape = require( 'tape' );
var pdf = require( './../lib' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.equal( typeof pdf, 'function', 'main export is a function' );
	t.end();
});

tape( 'attached to the main export is a factory method for generating `pdf` functions', function test( t ) {
	t.equal( typeof pdf.factory, 'function', 'exports a factory method' );
	t.end();
});

}).call(this,"/lib/node_modules/@stdlib/math/base/dists/f/pdf/test/test.js")
},{"./../lib":61,"tape":219}],71:[function(require,module,exports){
(function (__filename){
'use strict';

// MODULES //

var tape = require( 'tape' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var abs = require( '@stdlib/math/base/special/abs' );
var PINF = require( '@stdlib/constants/math/float64-pinf' );
var NINF = require( '@stdlib/constants/math/float64-ninf' );
var EPS = require( '@stdlib/constants/math/float64-eps' );
var pdf = require( './../lib' );


// FIXTURES //

var largeD1 = require( './fixtures/julia/large_d1.json' );
var largeD2 = require( './fixtures/julia/large_d2.json' );
var bothLarge = require( './fixtures/julia/both_large.json' );
var cppLargeD1 = require( './fixtures/cpp/large_d1.json' );
var cppLargeD2 = require( './fixtures/cpp/large_d2.json' );
var cppBothLarge = require( './fixtures/cpp/both_large.json' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.equal( typeof pdf, 'function', 'main export is a function' );
	t.end();
});

tape( 'if provided `NaN` for any parameter, the function returns `NaN`', function test( t ) {
	var y = pdf( NaN, 0.0, 1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );
	y = pdf( 0.0, NaN, 1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );
	y = pdf( 0.0, 1.0, NaN );
	t.equal( isnan( y ), true, 'returns NaN' );
	t.end();
});

tape( 'if provided `+infinity` for `x` and a finite `d1` and `d2`, the function returns `0`', function test( t ) {
	var y = pdf( PINF, 1.0, 1.0 );
	t.equal( y, 0.0, 'returns 0' );
	t.end();
});

tape( 'if provided `-infinity` for `x` and a finite `d1` and `d2`, the function returns `0`', function test( t ) {
	var y = pdf( NINF, 1.0, 1.0 );
	t.equal( y, 0.0, 'returns 0' );
	t.end();
});

tape( 'if provided `d1 <= 0`, the function returns `NaN`', function test( t ) {
	var y;

	y = pdf( 2.0, -1.0, 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = pdf( 0.0, -1.0, 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = pdf( 2.0, NINF, 1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = pdf( 2.0, NINF, PINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = pdf( 2.0, NINF, NINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = pdf( 2.0, NINF, NaN );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'if provided `d2 <= 0`, the function returns `NaN`', function test( t ) {
	var y;

	y = pdf( 2.0, 2.0, -1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = pdf( 0.0, 2.0, -1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = pdf( 2.0, 1.0, NINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = pdf( 2.0, PINF, NINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = pdf( 2.0, NINF, NINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = pdf( 2.0, NaN, NINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'if provided `d1 < 2.0`, the function returns `+Infinity` when provided `0.0` for `x`', function test( t ) {
	var y;

	y = pdf( 0.0, 1.0, 1.0 );
	t.equal( y, PINF, 'returns +Infinity' );

	y = pdf( 0.0, 1.5, 1.0 );
	t.equal( y, PINF, 'returns +Infinity' );

	t.end();
});

tape( 'if provided `d1 = 2.0`, the function returns `1.0` when provided `0.0` for `x`', function test( t ) {
	var y;

	y = pdf( 0.0, 2.0, 1.0 );
	t.equal( y, 1.0, 'returns 1' );

	y = pdf( 0.0, 2.0, 3.0 );
	t.equal( y, 1.0, 'returns 1' );

	t.end();
});

tape( 'if provided `d1 > 2.0`, the function returns `0.0` when provided `0.0` for `x`', function test( t ) {
	var y;

	y = pdf( 0.0, 3.0, 1.0 );
	t.equal( y, 0.0, 'returns 0' );

	y = pdf( 0.0, 3.5, 1.0 );
	t.equal( y, 0.0, 'returns 0' );

	t.end();
});

tape( 'the function evaluates the pdf for `x` given large `d1` and `d2` (tested against Julia)', function test( t ) {
	var expected;
	var delta;
	var tol;
	var d1;
	var d2;
	var x;
	var y;
	var i;

	expected = bothLarge.expected;
	x = bothLarge.x;
	d1 = bothLarge.d1;
	d2 = bothLarge.d2;
	for ( i = 0; i < x.length; i++ ) {
		y = pdf( x[i], d1[i], d2[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', d1: '+d1[i]+', d2: '+d2[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 2300.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. d1: '+d1[i]+'. d2: '+d2[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the function evaluates the pdf for `x` given large parameter `d1` (tested against Julia)', function test( t ) {
	var expected;
	var delta;
	var tol;
	var d1;
	var d2;
	var x;
	var y;
	var i;

	expected = largeD1.expected;
	x = largeD1.x;
	d1 = largeD1.d1;
	d2 = largeD1.d2;
	for ( i = 0; i < x.length; i++ ) {
		y = pdf( x[i], d1[i], d2[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', d1: '+d1[i]+', d2: '+d2[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 150.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. d1: '+d1[i]+'. d2: '+d2[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the function evaluates the pdf for `x` given large parameter `d2` (tested against Julia)', function test( t ) {
	var expected;
	var delta;
	var tol;
	var d1;
	var d2;
	var x;
	var y;
	var i;

	expected = largeD2.expected;
	x = largeD2.x;
	d1 = largeD2.d1;
	d2 = largeD2.d2;
	for ( i = 0; i < x.length; i++ ) {
		y = pdf( x[i], d1[i], d2[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', d1: '+d1[i]+', d2: '+d2[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 1800.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. d1: '+d1[i]+'. d2: '+d2[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the function evaluates the pdf for `x` given large `d1` and `d2` (tested against the Boost C++ library', function test( t ) {
	var expected;
	var delta;
	var tol;
	var d1;
	var d2;
	var x;
	var y;
	var i;

	expected = cppBothLarge.expected;
	x = cppBothLarge.x;
	d1 = cppBothLarge.d1;
	d2 = cppBothLarge.d2;
	for ( i = 0; i < x.length; i++ ) {
		y = pdf( x[i], d1[i], d2[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', d1: '+d1[i]+', d2: '+d2[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 150.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. d1: '+d1[i]+'. d2: '+d2[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the function evaluates the pdf for `x` given large parameter `d1` (tested against the Boost C++ library)', function test( t ) {
	var expected;
	var delta;
	var tol;
	var d1;
	var d2;
	var x;
	var y;
	var i;

	expected = cppLargeD1.expected;
	x = cppLargeD1.x;
	d1 = cppLargeD1.d1;
	d2 = cppLargeD1.d2;
	for ( i = 0; i < x.length; i++ ) {
		y = pdf( x[i], d1[i], d2[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', d1: '+d1[i]+', d2: '+d2[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 100.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. d1: '+d1[i]+'. d2: '+d2[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the function evaluates the pdf for `x` given large parameter `d2` (tested against the Boost C++ library)', function test( t ) {
	var expected;
	var delta;
	var tol;
	var d1;
	var d2;
	var x;
	var y;
	var i;

	expected = cppLargeD2.expected;
	x = cppLargeD2.x;
	d1 = cppLargeD2.d1;
	d2 = cppLargeD2.d2;
	for ( i = 0; i < x.length; i++ ) {
		y = pdf( x[i], d1[i], d2[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', d1: '+d1[i]+', d2: '+d2[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 1150.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. d1: '+d1[i]+'. d2: '+d2[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

}).call(this,"/lib/node_modules/@stdlib/math/base/dists/f/pdf/test/test.pdf.js")
},{"./../lib":61,"./fixtures/cpp/both_large.json":63,"./fixtures/cpp/large_d1.json":64,"./fixtures/cpp/large_d2.json":65,"./fixtures/julia/both_large.json":66,"./fixtures/julia/large_d1.json":67,"./fixtures/julia/large_d2.json":68,"@stdlib/constants/math/float64-eps":27,"@stdlib/constants/math/float64-ninf":38,"@stdlib/constants/math/float64-pinf":39,"@stdlib/math/base/assert/is-nan":50,"@stdlib/math/base/special/abs":73,"tape":219}],72:[function(require,module,exports){
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

},{}],75:[function(require,module,exports){
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

},{"./ceil.js":74}],76:[function(require,module,exports){
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

},{"@stdlib/number/float64/base/from-words":119,"@stdlib/number/float64/base/get-high-word":123,"@stdlib/number/float64/base/to-words":134}],77:[function(require,module,exports){
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

},{"./copysign.js":76}],78:[function(require,module,exports){
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

},{"./expmulti.js":79,"@stdlib/constants/math/float64-ninf":38,"@stdlib/constants/math/float64-pinf":39,"@stdlib/math/base/assert/is-nan":50,"@stdlib/math/base/special/trunc":115}],79:[function(require,module,exports){
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

},{"./polyval_p.js":81,"@stdlib/math/base/special/ldexp":90}],80:[function(require,module,exports){
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

},{"./exp.js":78}],81:[function(require,module,exports){
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

},{}],82:[function(require,module,exports){
'use strict';

/*
* The original C code, long comment, copyright, license, and constants are from [netlib]{@link http://www.netlib.org/fdlibm/s_expm1.c}.
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
var highWord = require( '@stdlib/number/float64/base/get-high-word' );
var setHighWord = require( '@stdlib/number/float64/base/set-high-word' );
var PINF = require( '@stdlib/constants/math/float64-pinf' );
var NINF = require( '@stdlib/constants/math/float64-ninf' );
var BIAS = require( '@stdlib/constants/math/float64-exponent-bias' );
var LN2_HALF = require( '@stdlib/constants/math/float64-half-ln-two' );
var polyval = require( './polyval_q.js' );


// VARIABLES //

var OVERFLOW_THRESHOLD = 7.09782712893383973096e+02; // 0x40862E42 0xFEFA39EF

// High and low words of ln(2):
var LN2_HI = 6.93147180369123816490e-01; // 0x3FE62E42 0xFEE00000
var LN2_LO = 1.90821492927058770002e-10; // 0x3DEA39EF 0x35793C76

// 1 / ln(2):
var LN2_INV = 1.44269504088896338700e+00; // 0x3FF71547 0x652B82FE

// ln(2) * 56:
var LN2x56 = 3.88162421113569373274e+01; // 0x4043687A 0x9F1AF2B1

// ln(2) * 1.5:
var LN2_HALFX3 = 1.03972077083991796413e+00; // 0x3FF0A2B2 0x3F3BAB73


// MAIN //

/**
* Computes `exp(x) - 1`.
*
* ## Method
*
* 1.  Given \\(x\\), we use argument reduction to find \\(r\\) and an integer \\(k\\) such that
*
*     ```tex
*     x = k \cdot \ln(2) + r
*     ```
*
*     where
*
*     ```tex
*     |r| \leq \frac{\ln(2)}{2} \approx 0.34658
*     ```
*
*     <!-- <note> -->
*
*     A correction term \\(c\\) will need to be computed to compensate for the error in \\(r\\) when rounded to a floating-point number.
*
*     <!-- </note> -->
*
* 2.  To approximate \\(\operatorname{expm1}(r)\\), we use a special rational function on the interval \\([0,0.34658]\\). Since
*
*     ```tex
*     r \frac{e^r + 1}{e^r - 1} = 2 + \frac{r^2}{6} - \frac{r^4}{360} + \ldots
*     ```
*
*     we define \\(\operatorname{R1}(r^2)\\) by
*
*     ```tex
*     r \frac{e^r + 1}{e^r - 1} = 2 + \frac{r^2}{6} \operatorname{R1}(r^2)
*     ```
*
*     That is,
*
*     ```tex
*     \begin{align*}
*     \operatorname{R1}(r^2) &= \frac{6}{r} \biggl(\frac{e^r+1}{e^r-1} - \frac{2}{r}\biggr) \\
*     &= \frac{6}{r} \biggl( 1 + 2 \biggl(\frac{1}{e^r-1} - \frac{1}{r}\biggr)\biggr) \\
*     &= 1 - \frac{r^2}{60} + \frac{r^4}{2520} - \frac{r^6}{100800} + \ldots
*     \end{align*}
*     ```
*
*     We use a special Remes algorithm on \\([0,0.347]\\) to generate a polynomial of degree \\(5\\) in \\(r^2\\) to approximate \\(\mathrm{R1}\\). The maximum error of this polynomial approximation is bounded by \\(2^{-61}\\). In other words,
*
*     ```tex
*     \operatorname{R1}(z) \approx 1 + \mathrm{Q1} \cdot z + \mathrm{Q2} \cdot z^2 + \mathrm{Q3} \cdot z^3 + \mathrm{Q4} \cdot z^4 + \mathrm{Q5} \cdot z^5
*     ```
*
*     where
*
*     ```tex
*     \begin{align*}
*     \mathrm{Q1} &= -1.6666666666666567384\mbox{e-}2 \\
*     \mathrm{Q2} &= 3.9682539681370365873\mbox{e-}4 \\
*     \mathrm{Q3} &= -9.9206344733435987357\mbox{e-}6 \\
*     \mathrm{Q4} &= 2.5051361420808517002\mbox{e-}7 \\
*     \mathrm{Q5} &= -6.2843505682382617102\mbox{e-}9
*     \end{align*}
*     ```
*
*     where \\(z = r^2\\) and the values of \\(\mathrm{Q1}\\) to \\(\mathrm{Q5}\\) are listed in the source. The error is bounded by
*
*     ```tex
*     \biggl| 1 + \mathrm{Q1} \cdot z + \ldots + \mathrm{Q5} \cdot z - \operatorname{R1}(z) \biggr| \leq 2^{-61}
*     ```
*
*     \\(\operatorname{expm1}(r) = e^r - 1\\) is then computed by the following specific way which minimizes the accumulated rounding error
*
*     ```tex
*     \operatorname{expm1}(r) = r + \frac{r^2}{2} + \frac{r^3}{2} \biggl( \frac{3 - (\mathrm{R1} + \mathrm{R1} \cdot \frac{r}{2})}{6 - r ( 3 - \mathrm{R1} \cdot \frac{r}{2})} \biggr)
*     ```
*
*     To compensate for the error in the argument reduction, we use
*
*     ```tex
*     \begin{align*}
*     \operatorname{expm1}(r+c) &= \operatorname{expm1}(r) + c + \operatorname{expm1}(r) \cdot c \\
*     &\approx \operatorname{expm1}(r) + c + rc
*     \end{align*}
*     ```
*
*     Thus, \\(c + rc\\) will be added in as the correction terms for \\(\operatorname{expm1}(r+c)\\). Now, we can rearrange the term to avoid optimization screw up.
*
*     ```tex
*     \begin{align*}
*     \operatorname{expm1}(r+c) &\approx r - \biggl( \biggl( r + \biggl( \frac{r^2}{2} \biggl( \frac{\mathrm{R1} - (3 - \mathrm{R1} \cdot \frac{r}{2})}{6 - r (3 - \mathrm{R1} \cdot \frac{r}{2})} \biggr) - c \biggr) - c \biggr) - \frac{r^2}{2} \biggr) \\
*     &= r - \mathrm{E}
*     \end{align*}
*     ```
*
* 3.  To scale back to obtain \\(\operatorname{expm1}(x)\\), we have (from step 1)
*
*     ```tex
*     \operatorname{expm1}(x) = \begin{cases}
*     2^k  (\operatorname{expm1}(r) + 1) - 1 \\
*     2^k (\operatorname{expm1}(r) + (1-2^{-k}))
*     \end{cases}
*     ```
*
* ## Special Cases
*
* ```tex
* \begin{align*}
* \operatorname{expm1}(\infty) &= \infty \\
* \operatorname{expm1}(-\infty) &= -1 \\
* \operatorname{expm1}(\mathrm{NaN}) &= \mathrm{NaN}
* \end{align*}
* ```
*
*
* ## Notes
*
* -   For finite arguments, only \\(\operatorname{expm1}(0) = 0\\) is exact.
*
* -   To save one multiplication, we scale the coefficient \\(\mathrm{Qi}\\) to \\(\mathrm{Qi} \cdot {2^i}\\) and replace \\(z\\) by \\(\frac{x^2}{2}\\).
*
* -   To achieve maximum accuracy, we compute \\(\operatorname{expm1}(x)\\) by
*
*     -   if \\(x < -56 \cdot \ln(2)\\), return \\(-1.0\\) (raise inexact if \\(x\\) does not equal \\(\infty\\))
*
*     -   if \\(k = 0\\), return \\(r-\mathrm{E}\\)
*
*     -   if \\(k = -1\\), return \\(\frac{(r-\mathrm{E})-1}{2}\\)
*
*     -   if \\(k = 1\\),
*
*         -   if \\(r < -0.25\\), return \\(2((r+0.5)- \mathrm{E})\\)
*         -   else return \\(1+2(r-\mathrm{E})\\)
*
*     -   if \\(k < -2\\) or \\(k > 56\\), return \\(2^k(1-(\mathrm{E}-r)) - 1\\) (or \\(e^x-1\\))
*
*     -   if \\(k \leq 20\\), return \\(2^k((1-2^{-k})-(\mathrm{E}-r))\\)
*
*     -   else return \\(2^k(1-((\mathrm{E}+2^{-k})-r))\\)

* -   For IEEE 754 double, if \\(x > 7.09782712893383973096\mbox{e+}02\\), then \\(\operatorname{expm1}(x)\\) will overflow.
*
* -   The hexadecimal values listed in the source are the intended ones for the implementation constants. Decimal values may be used, provided that the compiler will convert from decimal to binary accurately enough to produce the intended hexadecimal values.
*
*
* ## Accuracy
*
* According to an error analysis, the error is always less than \\(1\\) ulp (unit in the last place).
*
*
* @param {number} x - input value
* @returns {number} function value
*
* @example
* var v = expm1( 0.2 );
* // returns ~0.221
*
* @example
* var v = expm1( -9.0 );
* // returns ~-0.999
*
* @example
* var v = expm1( 0.0 );
* // returns 0.0
*
* @example
* var v = expm1( NaN );
* // returns NaN
*/
function expm1( x ) {
	var halfX;
	var sign;
	var hi;
	var lo;
	var hx;
	var r1;
	var y;
	var z;
	var c;
	var t;
	var e;
	var k;

	if ( x === PINF || isnan( x ) ) {
		return x;
	}
	if ( x === NINF ) {
		return -1.0;
	}
	if ( x === 0.0 ) {
		return x; // handles +-0 (IEEE 754-2008)
	}
	// Set y = |x|:
	if ( x < 0.0 ) {
		sign = true;
		y = -x;
	} else {
		sign = false;
		y = x;
	}
	// Filter out huge and non-finite arguments...
	if ( y >= LN2x56 ) { // if |x| >= 56*ln(2)
		if ( sign ) { // if x <= -56*ln(2)
			return -1.0;
		}
		if ( y >= OVERFLOW_THRESHOLD ) { // if |x| >= 709.78...
			return PINF;
		}
	}
	// Extract the more significant bits from |x|:
	hx = highWord( y )|0; // asm type annotation

	// Argument reduction...
	if ( y > LN2_HALF ) { // if |x| > 0.5*ln(2)
		if ( y < LN2_HALFX3 ) { // if |x| < 1.5*ln(2)
			if ( sign ) {
				hi = x + LN2_HI;
				lo = -LN2_LO;
				k = -1;
			} else {
				hi = x - LN2_HI;
				lo = LN2_LO;
				k = 1;
			}
		} else {
			if ( sign ) {
				k = (LN2_INV*x) - 0.5;
			} else {
				k = (LN2_INV*x) + 0.5;
			}
			k |= 0; // use a bitwise OR to cast `k` to an integer (see also asm.js type annotations: http://asmjs.org/spec/latest/#annotations)
			t = k;
			hi = x - (t*LN2_HI); // t*ln2_hi is exact here
			lo = t * LN2_LO;
		}
		x = hi - lo;
		c = (hi-x) - lo;
	}
	// if |x| < 2**-54 => high word: 0 01111001001 00000000000000000000 => 0x3c900000 = 1016070144  => exponent = 01111001001 = 969 = 1023-54
	else if ( hx < 1016070144 ) {
		return x;
	}
	else {
		k = 0;
	}
	// x is now in primary range...
	halfX = 0.5 * x;
	z = x * halfX;

	r1 = 1.0 + ( z * polyval( z ) );

	t = 3.0 - (r1*halfX);
	e = z * ( (r1-t) / (6.0 - (x*t)) );
	if ( k === 0 ) {
		return x - ( (x*e) - z );	// c is 0
	}
	e = ( x * (e-c) ) - c;
	e -= z;
	if ( k === -1 ) {
		return ( 0.5*(x-e) )- 0.5;
	}
	if ( k === 1 ) {
		if ( x < -0.25 ) {
			return -2.0 * ( e - (x+0.5) );
		}
		return 1 + ( 2.0 * (x-e) );
	}
	if ( k <= -2 || k > 56 ) { // suffice to return exp(x)-1
		y = 1.0 - (e-x);

		// Add k to y's exponent:
		hi = (highWord( y ) + (k<<20))|0; // asm type annotation
		y = setHighWord( y, hi );

		return y - 1.0;
	}
	t = 1.0;
	if ( k < 20 ) {
		// 0x3ff00000 - (0x200000>>k) = 1072693248 - (0x200000>>k) => 0x200000 = 0 00000000010 00000000000000000000
		hi = (1072693248 - (0x200000>>k))|0; // asm type annotation
		t = setHighWord( t, hi ); // t=1-2^-k
		y = t - (e-x);
	} else {
		hi = ( (BIAS-k)<<20 )|0; // asm type annotation
		t = setHighWord( t, hi ); // t=2^-k
		y = x - (e+t);
		y += 1.0;
	}
	// Add k to y's exponent:
	hi = (highWord( y ) + (k<<20))|0; // asm type annotation
	return setHighWord( y, hi );
}


// EXPORTS //

module.exports = expm1;

},{"./polyval_q.js":84,"@stdlib/constants/math/float64-exponent-bias":28,"@stdlib/constants/math/float64-half-ln-two":30,"@stdlib/constants/math/float64-ninf":38,"@stdlib/constants/math/float64-pinf":39,"@stdlib/math/base/assert/is-nan":50,"@stdlib/number/float64/base/get-high-word":123,"@stdlib/number/float64/base/set-high-word":129}],83:[function(require,module,exports){
'use strict';

/**
* Compute `exp(x) - 1`.
*
* @module @stdlib/math/base/special/expm1
*
* @example
* var expm1 = require( '@stdlib/math/base/special/expm1' );
*
* var v = expm1( 0.2 );
* // returns ~0.221
*
* v = expm1( -9.0 );
* // returns ~-0.999
*
* v = expm1( 0.0 );
* // returns 0.0
*
* v = expm1( NaN );
* // returns NaN
*/

// MODULES //

var expm1 = require( './expm1.js' );


// EXPORTS //

module.exports = expm1;

},{"./expm1.js":82}],84:[function(require,module,exports){
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
		return -0.03333333333333313;
	}
	return -0.03333333333333313 + (x * (0.0015873015872548146 + (x * (-0.0000793650757867488 + (x * (0.000004008217827329362 + (x * -2.0109921818362437e-7))))))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

},{}],85:[function(require,module,exports){
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

},{}],86:[function(require,module,exports){
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

},{"./floor.js":85}],87:[function(require,module,exports){
'use strict';

/*
* The original C++ code and copyright notice is from the [Boost library]{@link http://www.boost.org/doc/libs/1_64_0/boost/math/special_functions/lanczos.hpp}.
*
* The implementation has been modified for JavaScript.
*/

/*
* Copyright John Maddock 2006.
* Use, modification and distribution are subject to the
* Boost Software License, Version 1.0. (See accompanying file
* LICENSE or copy at http://www.boost.org/LICENSE_1_0.txt)
*/

// MAIN //

/**
* Calculates the Lanczos sum for the approximation of the gamma function (scaled by `exp(-g)`, where `g = 10.900511`.
*
* @name gammaLanczosSumExpGScaled
* @type {Function}
* @param {number} x - input value
* @returns {number} Lanczos sum approximation
*
* @example
* var v = gammaLanczosSumExpGScaled( 4.0 );
* // returns ~0.018
*
* @example
* var v = gammaLanczosSumExpGScaled( -1.5 );
* // returns ~25.337
*
* @example
* var v = gammaLanczosSumExpGScaled( -0.5 );
* // returns ~-12.911
*
* @example
* var v = gammaLanczosSumExpGScaled( 0.5 );
* // returns ~1.772
*
* @example
* var v = gammaLanczosSumExpGScaled( 0.0 );
* // returns Infinity
*
* @example
* var v = gammaLanczosSumExpGScaled( NaN );
* // returns NaN
*/
var gammaLanczosSumExpGScaled = require( './rational_pq.js' );


// EXPORTS //

module.exports = gammaLanczosSumExpGScaled;

},{"./rational_pq.js":89}],88:[function(require,module,exports){
'use strict';

/**
* Calculate the Lanczos sum for the approximation of the gamma function (scaled by `exp(-g)`, where `g = 10.900511`.
*
* @module @stdlib/math/base/special/gamma-lanczos-sum-expg-scaled
*
* @example
* var gammaLanczosSumExpGScaled = require( '@stdlib/math/base/special/gamma-lanczos-sum-expg-scaled' );
*
* var v = gammaLanczosSumExpGScaled( 4.0 );
* // returns ~0.018
*
* v = gammaLanczosSumExpGScaled( -1.5 );
* // returns ~25.337
*
* v = gammaLanczosSumExpGScaled( -0.5 );
* // returns ~-12.911
*
* v = gammaLanczosSumExpGScaled( 0.5 );
* // returns ~1.772
*
* v = gammaLanczosSumExpGScaled( 0.0 );
* // returns Infinity
*
* v = gammaLanczosSumExpGScaled( NaN );
* // returns NaN
*/

// MODULES //

var gammaLanczosSumExpGScaled = require( './gamma_lanczos_sum_expg_scaled.js' );


// EXPORTS //

module.exports = gammaLanczosSumExpGScaled;

},{"./gamma_lanczos_sum_expg_scaled.js":87}],89:[function(require,module,exports){
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
		return Infinity;
	}
	if ( x < 0.0 ) {
		ax = -x;
	} else {
		ax = x;
	}
	if ( ax <= 1.0 ) {
		s1 = 709811.662581658 + (x * (679979.8474157227 + (x * (293136.7857211597 + (x * (74887.54032914672 + (x * (12555.290582413863 + (x * (1443.4299244417066 + (x * (115.24194596137347 + (x * (6.309239205732627 + (x * (0.22668404630224365 + (x * (0.004826466289237662 + (x * 0.00004624429436045379))))))))))))))))))); // eslint-disable-line max-len
		s2 = 0.0 + (x * (362880.0 + (x * (1026576.0 + (x * (1172700.0 + (x * (723680.0 + (x * (269325.0 + (x * (63273.0 + (x * (9450.0 + (x * (870.0 + (x * (45.0 + (x * 1.0))))))))))))))))))); // eslint-disable-line max-len
	} else {
		x = 1.0 / x;
		s1 = 0.00004624429436045379 + (x * (0.004826466289237662 + (x * (0.22668404630224365 + (x * (6.309239205732627 + (x * (115.24194596137347 + (x * (1443.4299244417066 + (x * (12555.290582413863 + (x * (74887.54032914672 + (x * (293136.7857211597 + (x * (679979.8474157227 + (x * 709811.662581658))))))))))))))))))); // eslint-disable-line max-len
		s2 = 1.0 + (x * (45.0 + (x * (870.0 + (x * (9450.0 + (x * (63273.0 + (x * (269325.0 + (x * (723680.0 + (x * (1172700.0 + (x * (1026576.0 + (x * (362880.0 + (x * 0.0))))))))))))))))))); // eslint-disable-line max-len
	}
	return s1 / s2;
}


// EXPORTS //

module.exports = evalrational;

},{}],90:[function(require,module,exports){
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

},{"./ldexp.js":91}],91:[function(require,module,exports){
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

},{"@stdlib/constants/math/float64-exponent-bias":28,"@stdlib/constants/math/float64-max-base2-exponent":34,"@stdlib/constants/math/float64-max-base2-exponent-subnormal":33,"@stdlib/constants/math/float64-min-base2-exponent-subnormal":36,"@stdlib/constants/math/float64-ninf":38,"@stdlib/constants/math/float64-pinf":39,"@stdlib/math/base/assert/is-infinite":46,"@stdlib/math/base/assert/is-nan":50,"@stdlib/math/base/special/copysign":77,"@stdlib/number/float64/base/exponent":117,"@stdlib/number/float64/base/from-words":119,"@stdlib/number/float64/base/normalize":125,"@stdlib/number/float64/base/to-words":134}],92:[function(require,module,exports){
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

},{"./ln.js":93}],93:[function(require,module,exports){
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

},{"./polyval_p.js":94,"./polyval_q.js":95,"@stdlib/constants/math/float64-exponent-bias":28,"@stdlib/constants/math/float64-ninf":38,"@stdlib/math/base/assert/is-nan":50,"@stdlib/number/float64/base/get-high-word":123,"@stdlib/number/float64/base/set-high-word":129}],94:[function(require,module,exports){
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

},{}],95:[function(require,module,exports){
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

},{}],96:[function(require,module,exports){
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

},{"./log1p.js":97}],97:[function(require,module,exports){
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

},{"./polyval_lp.js":98,"@stdlib/constants/math/float64-exponent-bias":28,"@stdlib/constants/math/float64-ninf":38,"@stdlib/constants/math/float64-pinf":39,"@stdlib/math/base/assert/is-nan":50,"@stdlib/number/float64/base/get-high-word":123,"@stdlib/number/float64/base/set-high-word":129}],98:[function(require,module,exports){
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

},{}],99:[function(require,module,exports){
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

},{"./max.js":100}],100:[function(require,module,exports){
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

},{"@stdlib/constants/math/float64-ninf":38,"@stdlib/constants/math/float64-pinf":39,"@stdlib/math/base/assert/is-nan":50,"@stdlib/math/base/assert/is-positive-zero":56}],101:[function(require,module,exports){
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

},{"./min.js":102}],102:[function(require,module,exports){
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

},{"@stdlib/constants/math/float64-ninf":38,"@stdlib/constants/math/float64-pinf":39,"@stdlib/math/base/assert/is-nan":50,"@stdlib/math/base/assert/is-negative-zero":52}],103:[function(require,module,exports){
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

},{"./pow.js":109}],104:[function(require,module,exports){
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

},{"./polyval_l.js":106,"@stdlib/constants/math/float64-exponent-bias":28,"@stdlib/number/float64/base/get-high-word":123,"@stdlib/number/float64/base/set-high-word":129,"@stdlib/number/float64/base/set-low-word":131}],105:[function(require,module,exports){
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

},{"./polyval_w.js":108,"@stdlib/number/float64/base/set-low-word":131}],106:[function(require,module,exports){
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

},{}],107:[function(require,module,exports){
arguments[4][81][0].apply(exports,arguments)
},{"dup":81}],108:[function(require,module,exports){
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

},{}],109:[function(require,module,exports){
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

},{"./log2ax.js":104,"./logx.js":105,"./pow2.js":110,"./x_is_zero.js":111,"./y_is_huge.js":112,"./y_is_infinite.js":113,"@stdlib/constants/math/float64-ninf":38,"@stdlib/constants/math/float64-pinf":39,"@stdlib/math/base/assert/is-infinite":46,"@stdlib/math/base/assert/is-integer":48,"@stdlib/math/base/assert/is-nan":50,"@stdlib/math/base/assert/is-odd":54,"@stdlib/math/base/special/abs":73,"@stdlib/math/base/special/sqrt":114,"@stdlib/number/float64/base/set-low-word":131,"@stdlib/number/float64/base/to-words":134,"@stdlib/number/uint32/base/to-int32":138}],110:[function(require,module,exports){
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

},{"./polyval_p.js":107,"@stdlib/constants/math/float64-exponent-bias":28,"@stdlib/constants/math/float64-ln-two":32,"@stdlib/math/base/special/ldexp":90,"@stdlib/number/float64/base/get-high-word":123,"@stdlib/number/float64/base/set-high-word":129,"@stdlib/number/float64/base/set-low-word":131,"@stdlib/number/uint32/base/to-int32":138}],111:[function(require,module,exports){
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

},{"@stdlib/constants/math/float64-ninf":38,"@stdlib/constants/math/float64-pinf":39,"@stdlib/math/base/assert/is-odd":54,"@stdlib/math/base/special/copysign":77}],112:[function(require,module,exports){
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

},{"@stdlib/number/float64/base/get-high-word":123}],113:[function(require,module,exports){
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

},{"@stdlib/constants/math/float64-pinf":39,"@stdlib/math/base/special/abs":73}],114:[function(require,module,exports){
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

},{}],115:[function(require,module,exports){
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

},{"./trunc.js":116}],116:[function(require,module,exports){
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

},{"@stdlib/math/base/special/ceil":75,"@stdlib/math/base/special/floor":86}],117:[function(require,module,exports){
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

},{"./main.js":118}],118:[function(require,module,exports){
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

},{"@stdlib/constants/math/float64-exponent-bias":28,"@stdlib/constants/math/float64-high-word-exponent-mask":31,"@stdlib/number/float64/base/get-high-word":123}],119:[function(require,module,exports){
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

},{"./main.js":121}],120:[function(require,module,exports){
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

},{"@stdlib/assert/is-little-endian":18}],121:[function(require,module,exports){
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

},{"./indices.js":120,"@stdlib/array/float64":2,"@stdlib/array/uint32":7}],122:[function(require,module,exports){
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

},{"@stdlib/assert/is-little-endian":18}],123:[function(require,module,exports){
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

},{"./main.js":124}],124:[function(require,module,exports){
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

},{"./high.js":122,"@stdlib/array/float64":2,"@stdlib/array/uint32":7}],125:[function(require,module,exports){
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

},{"./main.js":126}],126:[function(require,module,exports){
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

},{"./normalize.js":127}],127:[function(require,module,exports){
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

},{"@stdlib/constants/math/float64-smallest-normal":40,"@stdlib/math/base/assert/is-infinite":46,"@stdlib/math/base/assert/is-nan":50,"@stdlib/math/base/special/abs":73}],128:[function(require,module,exports){
arguments[4][122][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":18,"dup":122}],129:[function(require,module,exports){
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

},{"./main.js":130}],130:[function(require,module,exports){
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

},{"./high.js":128,"@stdlib/array/float64":2,"@stdlib/array/uint32":7}],131:[function(require,module,exports){
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

},{"./main.js":133}],132:[function(require,module,exports){
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

},{"@stdlib/assert/is-little-endian":18}],133:[function(require,module,exports){
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

},{"./low.js":132,"@stdlib/array/float64":2,"@stdlib/array/uint32":7}],134:[function(require,module,exports){
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

},{"./main.js":136}],135:[function(require,module,exports){
arguments[4][120][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":18,"dup":120}],136:[function(require,module,exports){
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

},{"./to_words.js":137}],137:[function(require,module,exports){
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

},{"./indices.js":135,"@stdlib/array/float64":2,"@stdlib/array/uint32":7}],138:[function(require,module,exports){
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

},{"./main.js":139}],139:[function(require,module,exports){
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

},{}],140:[function(require,module,exports){
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

},{}],141:[function(require,module,exports){
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

},{"./constant_function.js":140}],142:[function(require,module,exports){
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

},{}],143:[function(require,module,exports){
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

},{"./define_read_only_property.js":142}],144:[function(require,module,exports){
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

},{"./float64array.js":145,"@stdlib/assert/is-float64array":15}],145:[function(require,module,exports){
'use strict';

// EXPORTS //

module.exports = ( typeof Float64Array === 'function' ) ? Float64Array : null;

},{}],146:[function(require,module,exports){
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

},{"./detect_float64array_support.js":144}],147:[function(require,module,exports){
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

},{}],148:[function(require,module,exports){
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

},{"./detect_symbol_support.js":147}],149:[function(require,module,exports){
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

},{"@stdlib/utils/detect-symbol-support":148}],150:[function(require,module,exports){
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

},{"./has_tostringtag_support.js":149}],151:[function(require,module,exports){
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

},{"./uint16array.js":153,"@stdlib/assert/is-uint16array":20,"@stdlib/constants/math/uint16-max":41}],152:[function(require,module,exports){
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

},{"./detect_uint16array_support.js":151}],153:[function(require,module,exports){
'use strict';

// EXPORTS //

module.exports = ( typeof Uint16Array === 'function' ) ? Uint16Array : null;

},{}],154:[function(require,module,exports){
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

},{"./uint32array.js":156,"@stdlib/assert/is-uint32array":22,"@stdlib/constants/math/uint32-max":42}],155:[function(require,module,exports){
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

},{"./detect_uint32array_support.js":154}],156:[function(require,module,exports){
'use strict';

// EXPORTS //

module.exports = ( typeof Uint32Array === 'function' ) ? Uint32Array : null;

},{}],157:[function(require,module,exports){
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

},{"./uint8array.js":159,"@stdlib/assert/is-uint8array":24,"@stdlib/constants/math/uint8-max":43}],158:[function(require,module,exports){
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

},{"./detect_uint8array_support.js":157}],159:[function(require,module,exports){
'use strict';

// EXPORTS //

module.exports = ( typeof Uint8Array === 'function' ) ? Uint8Array : null;

},{}],160:[function(require,module,exports){
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

},{"./native_class.js":161,"./polyfill.js":162,"@stdlib/utils/detect-tostringtag-support":150}],161:[function(require,module,exports){
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

},{"./tostring.js":163}],162:[function(require,module,exports){
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

},{"./tostring.js":163,"./tostringtag.js":164,"@stdlib/assert/has-own-property":14}],163:[function(require,module,exports){
'use strict';

// MAIN //

var toStr = Object.prototype.toString;


// EXPORTS //

module.exports = toStr;

},{}],164:[function(require,module,exports){
'use strict';

// MAIN //

var toStrTag = ( typeof Symbol === 'function' ) ? Symbol.toStringTag : '';


// EXPORTS //

module.exports = toStrTag;

},{}],165:[function(require,module,exports){
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

},{}],166:[function(require,module,exports){

},{}],167:[function(require,module,exports){
arguments[4][166][0].apply(exports,arguments)
},{"dup":166}],168:[function(require,module,exports){
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

},{}],169:[function(require,module,exports){
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

},{"base64-js":165,"ieee754":188}],170:[function(require,module,exports){
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
},{"../../is-buffer/index.js":190}],171:[function(require,module,exports){
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

},{"./lib/is_arguments.js":172,"./lib/keys.js":173}],172:[function(require,module,exports){
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

},{}],173:[function(require,module,exports){
exports = module.exports = typeof Object.keys === 'function'
  ? Object.keys : shim;

exports.shim = shim;
function shim (obj) {
  var keys = [];
  for (var key in obj) keys.push(key);
  return keys;
}

},{}],174:[function(require,module,exports){
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

},{"foreach":184,"object-keys":194}],175:[function(require,module,exports){
module.exports = function () {
    for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] !== undefined) return arguments[i];
    }
};

},{}],176:[function(require,module,exports){
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

},{"./helpers/isFinite":177,"./helpers/isNaN":178,"./helpers/mod":179,"./helpers/sign":180,"es-to-primitive/es5":181,"has":187,"is-callable":191}],177:[function(require,module,exports){
var $isNaN = Number.isNaN || function (a) { return a !== a; };

module.exports = Number.isFinite || function (x) { return typeof x === 'number' && !$isNaN(x) && x !== Infinity && x !== -Infinity; };

},{}],178:[function(require,module,exports){
module.exports = Number.isNaN || function isNaN(a) {
	return a !== a;
};

},{}],179:[function(require,module,exports){
module.exports = function mod(number, modulo) {
	var remain = number % modulo;
	return Math.floor(remain >= 0 ? remain : remain + modulo);
};

},{}],180:[function(require,module,exports){
module.exports = function sign(number) {
	return number >= 0 ? 1 : -1;
};

},{}],181:[function(require,module,exports){
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

},{"./helpers/isPrimitive":182,"is-callable":191}],182:[function(require,module,exports){
module.exports = function isPrimitive(value) {
	return value === null || (typeof value !== 'function' && typeof value !== 'object');
};

},{}],183:[function(require,module,exports){
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

},{}],184:[function(require,module,exports){

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


},{}],185:[function(require,module,exports){
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

},{}],186:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

module.exports = Function.prototype.bind || implementation;

},{"./implementation":185}],187:[function(require,module,exports){
var bind = require('function-bind');

module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);

},{"function-bind":186}],188:[function(require,module,exports){
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

},{}],189:[function(require,module,exports){
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

},{}],190:[function(require,module,exports){
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

},{}],191:[function(require,module,exports){
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

},{}],192:[function(require,module,exports){
var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};

},{}],193:[function(require,module,exports){
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

},{}],194:[function(require,module,exports){
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

},{"./isArguments":195}],195:[function(require,module,exports){
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

},{}],196:[function(require,module,exports){
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
},{"_process":168}],197:[function(require,module,exports){
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
},{"_process":168}],198:[function(require,module,exports){
module.exports = require('./lib/_stream_duplex.js');

},{"./lib/_stream_duplex.js":199}],199:[function(require,module,exports){
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
},{"./_stream_readable":201,"./_stream_writable":203,"core-util-is":170,"inherits":189,"process-nextick-args":197}],200:[function(require,module,exports){
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
},{"./_stream_transform":202,"core-util-is":170,"inherits":189}],201:[function(require,module,exports){
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
},{"./_stream_duplex":199,"./internal/streams/BufferList":204,"./internal/streams/destroy":205,"./internal/streams/stream":206,"_process":168,"core-util-is":170,"events":183,"inherits":189,"isarray":192,"process-nextick-args":197,"safe-buffer":212,"string_decoder/":218,"util":166}],202:[function(require,module,exports){
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
},{"./_stream_duplex":199,"core-util-is":170,"inherits":189}],203:[function(require,module,exports){
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
},{"./_stream_duplex":199,"./internal/streams/destroy":205,"./internal/streams/stream":206,"_process":168,"core-util-is":170,"inherits":189,"process-nextick-args":197,"safe-buffer":212,"util-deprecate":225}],204:[function(require,module,exports){
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
},{"safe-buffer":212}],205:[function(require,module,exports){
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
},{"process-nextick-args":197}],206:[function(require,module,exports){
module.exports = require('events').EventEmitter;

},{"events":183}],207:[function(require,module,exports){
module.exports = require('./readable').PassThrough

},{"./readable":208}],208:[function(require,module,exports){
exports = module.exports = require('./lib/_stream_readable.js');
exports.Stream = exports;
exports.Readable = exports;
exports.Writable = require('./lib/_stream_writable.js');
exports.Duplex = require('./lib/_stream_duplex.js');
exports.Transform = require('./lib/_stream_transform.js');
exports.PassThrough = require('./lib/_stream_passthrough.js');

},{"./lib/_stream_duplex.js":199,"./lib/_stream_passthrough.js":200,"./lib/_stream_readable.js":201,"./lib/_stream_transform.js":202,"./lib/_stream_writable.js":203}],209:[function(require,module,exports){
module.exports = require('./readable').Transform

},{"./readable":208}],210:[function(require,module,exports){
module.exports = require('./lib/_stream_writable.js');

},{"./lib/_stream_writable.js":203}],211:[function(require,module,exports){
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
},{"_process":168,"through":224}],212:[function(require,module,exports){
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

},{"buffer":169}],213:[function(require,module,exports){
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

},{"events":183,"inherits":189,"readable-stream/duplex.js":198,"readable-stream/passthrough.js":207,"readable-stream/readable.js":208,"readable-stream/transform.js":209,"readable-stream/writable.js":210}],214:[function(require,module,exports){
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

},{"es-abstract/es5":176,"function-bind":186}],215:[function(require,module,exports){
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

},{"./implementation":214,"./polyfill":216,"./shim":217,"define-properties":174,"function-bind":186}],216:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

var zeroWidthSpace = '\u200b';

module.exports = function getPolyfill() {
	if (String.prototype.trim && zeroWidthSpace.trim() === zeroWidthSpace) {
		return String.prototype.trim;
	}
	return implementation;
};

},{"./implementation":214}],217:[function(require,module,exports){
'use strict';

var define = require('define-properties');
var getPolyfill = require('./polyfill');

module.exports = function shimStringTrim() {
	var polyfill = getPolyfill();
	define(String.prototype, { trim: polyfill }, { trim: function () { return String.prototype.trim !== polyfill; } });
	return polyfill;
};

},{"./polyfill":216,"define-properties":174}],218:[function(require,module,exports){
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
},{"safe-buffer":212}],219:[function(require,module,exports){
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
},{"./lib/default_stream":220,"./lib/results":222,"./lib/test":223,"_process":168,"defined":175,"through":224}],220:[function(require,module,exports){
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
},{"_process":168,"fs":167,"through":224}],221:[function(require,module,exports){
(function (process){
module.exports = typeof setImmediate !== 'undefined'
    ? setImmediate
    : process.nextTick
;

}).call(this,require('_process'))
},{"_process":168}],222:[function(require,module,exports){
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
},{"_process":168,"events":183,"function-bind":186,"has":187,"inherits":189,"object-inspect":193,"resumer":211,"through":224}],223:[function(require,module,exports){
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
},{"./next_tick":221,"deep-equal":171,"defined":175,"events":183,"has":187,"inherits":189,"path":196,"string.prototype.trim":215}],224:[function(require,module,exports){
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
},{"_process":168,"stream":213}],225:[function(require,module,exports){
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
},{}]},{},[69,70,71]);
