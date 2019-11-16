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

},{"./float64array.js":1,"./polyfill.js":3,"@stdlib/utils/detect-float64array-support":63}],3:[function(require,module,exports){
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

},{"./polyfill.js":5,"./uint16array.js":6,"@stdlib/utils/detect-uint16array-support":69}],5:[function(require,module,exports){
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

},{"./polyfill.js":8,"./uint32array.js":9,"@stdlib/utils/detect-uint32array-support":72}],8:[function(require,module,exports){
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

},{"./polyfill.js":11,"./uint8array.js":12,"@stdlib/utils/detect-uint8array-support":75}],11:[function(require,module,exports){
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

},{"@stdlib/utils/native-class":77}],17:[function(require,module,exports){
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

},{"@stdlib/utils/native-class":77}],22:[function(require,module,exports){
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

},{"@stdlib/utils/native-class":77}],24:[function(require,module,exports){
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

},{"@stdlib/utils/native-class":77}],26:[function(require,module,exports){
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

},{}],29:[function(require,module,exports){
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

},{}],30:[function(require,module,exports){
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

},{}],31:[function(require,module,exports){
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

},{}],32:[function(require,module,exports){
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

},{}],33:[function(require,module,exports){
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

},{"./is_nan.js":34}],34:[function(require,module,exports){
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

},{}],35:[function(require,module,exports){
'use strict';

// MODULES //

var constantFunction = require( '@stdlib/utils/constant-function' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var ln = require( '@stdlib/math/base/special/ln' );
var NINF = require( '@stdlib/constants/math/float64-ninf' );
var PINF = require( '@stdlib/constants/math/float64-pinf' );


// MAIN //

/**
* Returns a function for evaluating the natural logarithm of the probability density function (PDF) for an exponential distribution with parameter `lambda`.
*
* @param {PositiveNumber} lambda - rate parameter
* @returns {Function} logarithm of probability density function (logPDF)
*
* @example
* var logpdf = factory( 0.5 );
* var y = logpdf( 3.0 );
* // returns ~-2.913
*
* y = logpdf( 1.0 );
* // returns ~-1.193
*/
function factory( lambda ) {
	if ( isnan( lambda ) || lambda < 0.0 || lambda === PINF ) {
		return constantFunction( NaN );
	}
	return logpdf;

	/**
	* Evaluates the natural logarithm of the probability density function (PDF) for an exponential distribution.
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
		if ( x < 0.0 ) {
			return NINF;
		}
		return -( x*lambda ) + ln( lambda );
	}
}


// EXPORTS //

module.exports = factory;

},{"@stdlib/constants/math/float64-ninf":28,"@stdlib/constants/math/float64-pinf":29,"@stdlib/math/base/assert/is-nan":33,"@stdlib/math/base/special/ln":47,"@stdlib/utils/constant-function":58}],36:[function(require,module,exports){
'use strict';

/**
* Natural logarithm of the probability density function (PDF) for an exponential distribution.
*
* @module @stdlib/math/base/dists/exponential/logpdf
*
* @example
* var logpdf = require( '@stdlib/math/base/dists/exponential/logpdf' );
*
* var y = logpdf( 0.3, 4.0 );
* // returns ~0.186
*
* var mylogPDF = logpdf.factory( 0.5 );
*
* y = mylogPDF( 3.0 );
* // returns ~-2.193
*
* y = mylogPDF( 1.0 );
* // returns ~-1.193
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-read-only-property' );
var logpdf = require( './logpdf.js' );
var factory = require( './factory.js' );


// MAIN //

setReadOnly( logpdf, 'factory', factory );


// EXPORTS //

module.exports = logpdf;

},{"./factory.js":35,"./logpdf.js":37,"@stdlib/utils/define-read-only-property":60}],37:[function(require,module,exports){
'use strict';

// MODULES //

var isnan = require( '@stdlib/math/base/assert/is-nan' );
var ln = require( '@stdlib/math/base/special/ln' );
var NINF = require( '@stdlib/constants/math/float64-ninf' );
var PINF = require( '@stdlib/constants/math/float64-pinf' );


// MAIN //

/**
* Evaluates the natural logarithm of the probability density function (PDF) for an exponential distribution with rate parameter `lambda` at a value `x`.
*
* @param {number} x - input value
* @param {PositiveNumber} lambda - rate parameter
* @returns {number} evaluated logPDF
*
* @example
* var y = logpdf( 0.3, 4.0 );
* // returns ~0.186
*
* @example
* var y = logpdf( 2.0, 0.7 );
* // returns ~-1.757
*
* @example
* var y = logpdf( -1.0, 0.5 );
* // returns -Infinity
*
* @example
* var y = logpdf( 0, NaN );
* // returns NaN
*
* @example
* var y = logpdf( NaN, 2.0 );
* // returns NaN
*
* @example
* // Negative rate:
* var y = logpdf( 2.0, -1.0 );
* // returns NaN
*/
function logpdf( x, lambda ) {
	if (
		isnan( x ) ||
		isnan( lambda ) ||
		lambda < 0.0 ||
		lambda === PINF
	) {
		return NaN;
	}
	if ( x < 0.0 ) {
		return NINF;
	}
	return ( -x*lambda ) + ln( lambda );
}


// EXPORTS //

module.exports = logpdf;

},{"@stdlib/constants/math/float64-ninf":28,"@stdlib/constants/math/float64-pinf":29,"@stdlib/math/base/assert/is-nan":33,"@stdlib/math/base/special/ln":47}],38:[function(require,module,exports){
module.exports={"x":[30.25,21.25,35.25,20.75,37.75,30,39.5,30.25,26.75,38.25,35,38.25,20.25,38,29.25,33.5,36.25,23,36,26.25,33,30.5,25.25,33.75,20,29.75,36.25,30.5,35.75,27.25,28,29.75,35.25,22.25,40,23.25,28,20.25,38,31,29.25,29.25,34.5,39.5,23,26.25,35.75,21.75,37,27.5,24.25,30.75,20,25.5,34.25,22.25,28.25,23.75,29.25,20.75,25,37.75,24.25,35.75,23.5,27.5,24.25,39,32,33.75,21.25,26.75,22.25,31.25,39.75,25.25,37.75,38.75,29.75,25.25,32.75,36,22.25,28.5,20,36.5,29.25,26.75,34,25.75,39,38.75,33,37.25,23.75,37.5,25.5,32.5,24.25,28.25,21.25,21.75,34.25,34.75,34,33.75,24,30.5,21.75,23.5,36,38,25.5,39.5,27.5,21.5,28,35.5,39,39.5,39.75,39.75,33.25,32,33.25,20.75,28,21.25,32.5,36.5,21.5,38,22.5,38,34,31.75,20.75,36.5,30.25,20.75,27.75,21,31,38.5,21.25,30.25,26.25,29.25,22,29.75,23,34.75,32,37.5,24,36,30.5,23.75,21.5,20.25,30.5,39,23,39,30.75,27,40,32.25,35.5,29.75,26.5,32.25,27.25,28.25,23.25,34.75,36.75,32.25,32.75,24.5,35.75,35.25,39.5,32.5,30.25,31.5,22.75,23.75,26.5,36,33,40,26.5,30.75,21.25,20.5,31.25,37.5,33.25,20,33,20.5,33.75,30.25,28,24.25,35.75,29.5,28.25,40,23,34.25,24,35.25,30,37.5,35,34.25,36.75,31,33,32.5,25.75,21,34.75,31.5,23.5,28.25,26.5,36,26.75,22.75,37.5,27.25,39,28.75,36.5,26,27.5,24.5,39.75,22.25,32.5,38.25,22.25,25,35,23.5,26.25,34.5,22.75,37.25,33.25,32.5,32.25,25.25,30,25,38.25,24,22.75,37.5,28.5,31.25,39.75,24.5,39.75,24.75,24.5,30.25,22.75,35.5,26.25,38.75,24.25,32,20,29.25,20.5,37,34.25,36,34.25,23.25,22.5,35.75,34.25,32.75,20.75,37.25,32,35,40,20.75,20.25,22.25,29.75,34.25,27.25,35,33.5,38.25,37.75,29.5,40,31.25,32.25,34.5,30,20.25,20.75,38.25,38,36.25,32,25.75,22.75,23.75,25.5,28,20.25,28.25,29.5,36,28.75,20.25,28,36.5,36,29.75,27,38.5,36,30.25,29,32.5,30,22.5,33.75,22.25,22.5,26.75,36.5,31.25,24.75,23.25,33.75,32.5,22.75,36.75,20,26.25,27.25,36.5,38.25,28.25,30,34.25,34.25,36.5,27.5,39.5,20.75,38,26.75,31.5,23.75,33.25,34,24,32.5,34.5,38.25,34.75,36.5,27.5,37.5,39.75,28.5,35.75,27,35.5,25,38,33.5,23.5,20.75,20.5,20.5,30.5,26.25,24.75,38.75,24,31,23.75,22.5,36.5,33,37.75,26.25,20.5,20.5,21,39.5,29.5,25.75,40,25.5,39.25,20.75,37,39.25,26,34,25.5,29,32.5,26.75,31.75,38,39.75,37.75,29,22,31.25,35.75,39,39,39.5,35,39.25,36.5,35.25,28.25,20.25,36,38.5,20.25,21.25,31,29.25,36.5,25,20.75,34.25,28.25,24.5,37.25,34,39.5,35,28.5,29.5,31,33.75,25.25,39.75,32.75,26.75,30.25,40,25.25,26.5,38.25,34.75,38,30.5,34.25,28.75,30,33.75,24.5,30.75,38,38.75,31,35.5,24.5,30,29.75,31.75,29.5,32.75,37.25,22.25,39.5,23.5,22.5,36.75,26,28.25,24,35.75,30.5,22,21.75,29.25,21.25,38.25,31.75,23.5,33.25,37.25,33.25,28.25,34,26.25,25.75,20.75,37.5,30,25.75,22.5,20,24.5,32,39.75,26.75,23.75,22.25,33.25,22.25,28.25,33.75,36.5,39.25,36,39.75,34,26.25,27,31.5,30.5,38.5,37,38.75,20,28,21.75,31,32.75,36.25,29.5,26,32,39.25,24,26,21.75,39.5,21.75,24.5,39.75,39.75,27.5,31,21.25,22.5,39.25,30.5,36,26,38,29.5,28.5,35,35.25,27,27.25,21.75,31.25,25.5,31.5,22.75,38,22.25,24.5,39.25,22,39.25,35.75,20.75,26.25,20.25,25,28.75,22.25,23.25,27,25,26.25,27.25,32.5,33.25,38,31.25,25.75,37.5,31.75,25.5,31,31.25,20.5,35.5,38.25,33.25,33.5,20,39.5,33.75,28.75,39.75,20,26.75,25.75,22,28,20.5,39.5,36.5,38.75,21.5,24.25,22.5,38.5,39,39.25,32.5,37.75,34,36.5,25.25,25.5,26.75,25.75,24,26.75,34.25,35.5,29.5,28.75,38.75,28,27.25,25.25,26,32.75,35.5,20.5,27,35.5,38,33.25,21.75,36,37.25,34.25,21.25,25.5,22.75,27.75,31.75,37.75,25.5,27.75,39.25,22,34,33.75,26.5,23.5,26,38.5,32.5,23.75,34.75,30.25,22.5,26.5,30.25,35,27,31.75,21.25,33,28.5,31.75,29.5,23.5,38.75,38.25,34.5,22,34,32,32.5,24,39.5,30.75,21.5,39.25,38.25,33,27,24.75,27,27.75,37,31.5,39,21.75,27.75,26,21.5,39.75,30.25,26.25,27.5,37.75,23,29.75,22,34.5,40,36.75,30.5,30.75,39.25,29,33,22.5,27.5,40,31.5,27,23,38.5,26.25,25.5,38.25,27,29.5,38,33.5,35.5,37.5,33,22.75,27,39.75,36.25,28.25,37,30.5,39,22.5,21.75,31,36.25,33.5,39.5,32,24.5,34.75,25.75,39.5,36.5,24.75,31.5,29.75,20.25,31.75,38,38.25,27.75,33.5,29.75,31.75,34.5,38.75,39.5,35.25,21.25,33.5,26.25,32.25,32.75,37.75,25.5,23.75,39.75,28.25,25.25,23.75,23.75,27,37.75,24.5,20.5,25.25,37.5,40,39.5,28.5,21.5,24,24.25,26.25,30.25,31.25,27.75,37.75,36.25,40,35.25,36,37,27.5,26.5,28.25,38.75,28.5,21.5,23.5,24.75,28,40,26.75,26,24.25,22.5,34,21.75,39.75,26.25,38,28.75,32,38.5,24.5,32.25,26.75,21.75,22.25,36.25,21.25,37,32.5,27,29.5,34.25,29.75,20.25,28,29.25,22.75,33.75,37.75,22,21.5,31.25,21.25,36.75,39.5,21.75,38.25,31,36.5,23.25,20.5,31.75,27,21,36,31,25.75,33.5,27.25,31.5,23,32,32.25,24.25,25.75,23.75,22.75,37.75,37,22,21.75,30,30.5,24.5,30.5,28.25,36.5,35.25,27.75,25.5,35.5,23.5,36.25,32.25,23,28.75,37,26.5,33.75,32.75,36.25,26.5,25.25,39.25,33.25,34.75,31.75,32.25,26.5,37.25,24,36.75,30.25,20,34.75,39.25,37.5,32.5,23,23.75,31.75,35.25,25.25,30.25,27,36.5,22.5,34.5,29.5,38.75,34.25,36.75,31.75,30.25,32.25,27,36.25,35.5,21,30.5,20,25.75,25.75,21,30.5,36.5,35.5,35.5,34,30.5,33,32,23.75,34.5,28.75,28.75,35.5,26.75,25.5,23,20.25,21.75,32.75,25.75,24.25,25.5,39.5,22.5,23,38.5,28.75,28.75,24.75,36,23,29.5,21.5,28,29.25,38.5,29.75,20.25,26,31.5,32,30.25,23.5,26.75,29.25,23.25],"lambda":[33,25.5,24,20.5,25.25,27,29.75,35,31.75,38.75,20.25,25.25,23.5,38,23.25,36.75,23.25,27,21.5,38.5,38.5,34.5,28.5,24.75,24,39,25.75,35.5,26.75,21.75,31.75,38.5,38,30.25,38.5,34,24.25,35.25,24,34,21.75,37.75,25.75,37.5,29.5,38.5,33,29,29.25,21.25,20.75,29.25,31.25,31.75,30.5,22.75,39.75,39.25,29.25,26.5,34.75,31.25,33.75,33,36.5,35,35.5,21.5,30.5,20.5,39.25,22.75,25.25,37.75,20,33,20.75,31.75,27.5,30.25,21,36.5,27.25,35.25,23.25,24.5,30.75,24.5,24.25,20.25,21,29.25,32.5,33.5,21.5,31,31.25,30,31.5,33,23.5,23,24.5,33,24,24,26.75,37,38,26.25,25,31,34.75,38.5,28.25,33,21.5,22.5,34,23.75,21,22.25,29,37.25,24.5,21,28,37.5,29.75,27,37.25,27.75,37.75,24.5,36.75,36.5,24.75,32.5,20.5,23,33.5,24,33.25,32.5,30.5,38.25,37.5,30,31.75,24.75,32.5,24.5,29,21.25,39.75,39.75,29,21.25,28.25,28.75,35.75,37,31.75,22,38.5,30.25,31.75,37.25,24.5,27.25,24.25,37.25,30.25,24,27.25,30,25.25,31,35.5,36.5,33.75,34,38.75,22.25,32,35,26.5,28.75,24.75,33.5,33,33.75,27.5,38,28.5,37.75,33.5,25.75,32.25,22.5,38,36.25,27.75,30.75,38.75,30.25,31.75,20.25,20,30.5,22.5,30.5,27.5,20.5,30,31.25,30.25,24.5,25.25,36,23,34.5,33,23.25,31,32.5,26.25,37.25,23,37,36.25,25,31.5,29.75,27,22.25,27.75,32,25.75,31.75,27,29.5,26,23.5,23.5,29.75,36,35,31.75,29.5,29.5,20.5,35.5,26,35.75,38,25,28.5,35,26,27.25,25.25,24.5,36,30.75,34.75,36.75,30,31.25,23.25,35.25,28,37.5,29.25,31.5,27.5,34,31.25,33,33,33.5,25,20.75,20.5,38,36,29.25,33.75,25.5,25.5,30.75,37,22.75,33,39.25,30.25,39,34.5,35,36.75,20.25,21.5,33.75,27.5,23.5,22.5,27.25,40,38.5,20.25,37,20.75,30.5,33.25,27.75,35.5,34,35.25,29.75,39.5,39.5,37.25,36.75,22.5,31.25,32.5,22,34,38.75,31,27,34.25,23.75,26,23.75,31.25,31.5,36.5,31.5,21.5,33,26.25,26.25,31,34,37.75,20.75,28,29.25,34,25.25,26.25,30,21.75,39.25,23.25,27.75,35.5,40,29.75,39,40,30.75,37.5,37.25,20.5,35,38.5,26.75,25.5,32.5,30.25,32.75,39.5,36.75,31,24.5,34.25,36.5,28.25,24,35.25,36,37.5,29.5,29,39.5,21.5,33.5,30.5,37.75,24,20.25,21.25,31.5,35,20.75,26.5,36.5,30,29,25.25,27.25,28,22,38.25,28.25,27.5,29.75,37.75,34.5,36.25,22,28.5,39.75,32,39.25,38.5,32.25,30.5,32.75,25.25,24.75,22.75,25,29.5,24.5,34.5,30.25,36.25,28.75,23.75,32.5,23,33,35.25,20,25.75,26.5,39.5,22.25,28.5,25.25,23.25,37,36.75,24,39.25,34.25,25,21,34.5,20.5,33.75,22.5,26.25,36.25,33.75,29.25,31.75,25.25,37.5,23.25,29,35.75,31,36.5,36,20.25,20.25,33.5,29,21.25,39.25,39.5,21.75,20.5,27,26,24.25,25.25,26.75,39.25,35.25,30.5,20.5,39,34.25,32.5,35.75,26,29,35.25,35.75,24,24.75,25.25,36.25,28.5,34.75,20.5,39.25,32,39.75,29,26.25,39,27.25,30.75,24.75,26,35.25,31.25,25,26.75,40,31.25,34.5,34.75,20.5,39.25,25.5,36.25,33.5,21.5,33.5,28.25,37.25,26,39.25,28.5,30,25.75,32.25,38,33,35,35,28.25,39.75,36.5,39.5,20.75,30.25,31.5,30.75,35.5,28.75,32.5,24,25.5,30.25,22.75,37.25,29.75,39.5,37.5,36.5,26,29.25,25,30,26.5,34.5,37,28.75,32,26.75,21.75,27.5,25.5,30.75,37,38.75,35.75,39,27.5,32.75,28.5,37.75,32.25,25.25,22.25,22,36.25,22.25,32.5,22,22.5,33.25,35,33.75,30,26,34.25,39.5,33.75,24.25,34.25,23.25,35.25,28,28.75,24.75,38.25,28,20,32,31,20.75,36,40,22.25,32,30.75,24.25,27.75,20.5,25,36,25.75,21.75,30.25,32.25,29.5,39,21.5,27.75,32.75,26,39,25.25,36,36.5,22.75,39.25,26.75,20.75,31.75,26.75,24.5,23.75,40,23.25,20.75,31.5,36.5,37,24.25,25.75,32.5,35.25,25,31.75,32.75,33,22.75,29.5,24,24.25,23,31.75,23.25,37.5,25.5,22.75,33.5,26.75,33.5,26.75,24.5,32,32,26.25,29.25,27.25,27.75,22,37.25,33.25,40,38,33,21.75,25.25,30.5,35.25,24.5,39.5,23.5,21.5,29.75,30.5,23.5,39.25,29.25,33.5,32.5,24,37.5,21,22,23.25,22.75,34.25,21,28.75,30.5,27.75,27.25,23,36,21.5,40,21.25,36.25,25.5,39,26,25.25,38.75,30,39,22,35.5,31.5,33.5,26,27.75,29.75,38,22.75,20.75,37,31.5,35.75,23.25,20.5,27.75,34.75,30.75,23,37.25,28.75,27,23.5,34.5,20,23.5,26.25,30.25,35,22.5,25.25,25.25,22.25,36.5,24.5,23.25,31.75,22.75,29.25,30.75,38,25.25,23.25,23.75,28,36.5,28,28,35.25,29.5,23.25,26,35.5,22.25,22.75,29,26.25,36.25,21,24.75,29.25,25.25,30.75,28.75,39.5,36,22,36.5,26.75,31.75,31.5,25,39.5,20.75,24,25.5,23.5,38.75,30.5,24.75,23,37.75,24.5,30.75,35.25,33,22.25,37.75,32.5,36.5,31.75,32.25,25.75,25.5,25.75,39.5,24.75,33.5,39.75,20,24.25,21,32,29.25,23.25,25.5,21.75,28.75,39,34,35.75,32,20.75,39.25,32,22.5,33.25,36.25,24.25,25.75,34.75,20.25,25.75,31,27.25,30,32.75,21.25,20.5,29.25,26.5,30.5,37.75,35,22.25,28.25,20.25,20.25,29.75,21.75,35.25,35.25,31.75,36.75,34.75,33.25,34,39.25,20.5,28.5,34.75,32.25,22.75,35.25,28.5,32.25,33.5,25.25,24,39.25,36,34.25,38.25,38,27.75,29,39,26.5,20.25,38.25,33,38,27.75,38.5,30.75,31,23.25,20,34,29.5,35.75,33.75,32.5,26.5,34.75,39,22.25,21,24.75,24,22.75,28.75,37.75,23.75,39.25,31.25,31.25,25.25,20.75,29.75,24.5,34.25,25.25,31.5,33.75,37,22,27.25,30.25,33,24.5,26.75,37.75,25,21.25,23.25,32,28,20.75,25,38,25.25,30.25,32.25,30,23.75,26,23.75,37,24,37.75,21.25,28.75,28,35.5,37.5,25.75,30,38.5,38.5,26.75,24.75,36,30,34.25,33.75,33,33.75,31.75,23,32.25,21.5,38.75,28.5,38.5,33.25,32.25,20,26.75,23,36.5,27.5,22,40,36.75,30.25,28.75,39,27,22.75,30.5,21.5,37.5,30.75,31.25,23.25,39.5],"expected":[-994.753492438533,-538.636321547836,-842.821946169652,-422.354575113856,-949.958673844279,-806.704163133996,-1171.73217086801,-1055.19465193851,-845.854607274661,-1478.5303692442,-705.741845206447,-962.583673844279,-472.71799957885,-1440.36241384027,-676.916194867967,-1227.52086177434,-839.666194867967,-617.704163133996,-770.931947064866,-1006.97434175871,-1266.84934175871,-1048.70904067596,-716.275095912725,-832.103674510985,-476.821946169652,-1156.58643835387,-930.18906537289,-1079.18046730352,-953.025965526658,-589.607886242465,-885.542107274661,-1141.72434175871,-1335.86241384027,-669.653003815523,-1536.34934175871,-786.973639475384,-675.811583382617,-710.250034470742,-908.821946169652,-1050.47363947538,-633.107886242465,-1100.5565145243,-885.12656537289,-1477.62565906702,-675.115609736654,-1006.97434175871,-1176.25349243853,-627.382704170014,-1078.87412042632,-581.31864310463,-500.154953753323,-896.061620426322,-621.557980623818,-806.167107274661,-1041.20727331639,-503.062934854603,-1119.2548901589,-928.517548555772,-852.186620426322,-546.597855267008,-865.201820427989,-1176.24548062382,-814.918519582681,-1176.25349243853,-854.152687739412,-958.944651938511,-857.305467303519,-835.431947064866,-972.582273316387,-688.854575113856,-830.392548555772,-605.437934854603,-558.583673844279,-1176.0565145243,-792.004267726446,-829.753492438533,-780.279953753323,-1226.85460727466,-814.810813995328,-760.403003815523,-684.705477562277,-1310.40268773941,-603.007446478891,-1001.06253447074,-461.853694867967,-891.051326882449,-896.011610005747,-652.176326882449,-821.311583382617,-518.429345206447,-815.955477562277,-1130.06162042632,-1069.01875991066,-1244.36345456117,-507.556947064866,-1159.06601279551,-793.432980623818,-971.598802618338,-760.425012454168,-928.753492438533,-496.21799957885,-497.114505784071,-835.926326882449,-1143.25349243853,-812.821946169652,-806.821946169652,-638.713465526658,-1124.88908208736,-822.862413840274,-613.607334010962,-896.781124175132,-1174.56601279551,-882.576820427989,-1517.09934175871,-773.533906542408,-706.003492438533,-598.931947064866,-795.63648469079,-1322.47363947538,-934.957417469519,-831.705477562277,-881.335157991388,-960.882704170014,-1188.38234805517,-811.426326882449,-432.705477562277,-780.667795489825,-793.250659067024,-963.482170868008,-982.204163133996,-797.257348055174,-1051.17676415981,-845.744014524305,-927.801326882449,-1245.89586177434,-1155.27768773941,-510.353674510985,-1182.76875991066,-617.104575113856,-474.114505784071,-926.113454561169,-500.821946169652,-1027.2459452329,-1247.76875991066,-644.707273316387,-1153.41835643973,-980.750659067024,-874.098802618338,-695.042107274661,-733.103674510985,-744.018759910664,-848.176326882449,-924.632704170014,-793.81864310463,-950.3173901589,-1427.3173901589,-881.132704170014,-501.63114310463,-604.033906542408,-578.828862232757,-1086.79844973086,-1439.38908208736,-726.792107274661,-854.908957546642,-1180.22434175871,-813.340503815523,-1266.54210727466,-1197.69484805517,-866.551326882449,-807.382446478891,-639.436583382617,-1197.69484805517,-820.903003815523,-674.821946169652,-630.257446478891,-1039.09880261834,-924.708673844279,-996.316012795515,-1159.05546730352,-890.652687739412,-1203.04351958268,-1194.97363947538,-1526.9678692442,-720.022657991388,-964.5342640972,-1098.94465193851,-599.597855267008,-679.453862232757,-652.666174510985,-1202.48845456117,-1085.50349243853,-1346.48101958268,-725.435813995328,-1164.86241384027,-602.275095912725,-770.244014524305,-1043.36345456117,-962.37656537289,-1068.83898195676,-446.88648469079,-1250.36241384027,-739.534560618699,-933.239264159808,-926.761610005747,-1081.3428692442,-730.153003815523,-1131.60460727466,-594.366845206447,-562.004267726446,-1216.58227331639,-514.38648469079,-1041.20727331639,-656.685813995328,-719.604575113856,-896.598802618338,-1168.43298062382,-1055.34050381552,-835.926326882449,-924.708673844279,-1112.41648106154,-755.864505784071,-1117.70904067596,-846.253492438533,-485.103694867967,-1073.81601279551,-1020.26875991066,-613.607334010962,-1048.69484805517,-606.364505784071,-1328.38908208736,-966.097060618699,-565.531124175132,-1177.80001245417,-807.294670868008,-1049.704163134,-636.585157991388,-1009.55176415981,-828.5342640972,-704.87656537289,-774.417107274661,-1069.954163134,-652.990609736654,-841.741903461978,-895.71799957885,-519.71799957885,-740.357170868008,-1256.41648106154,-818.944651938511,-829.979607274661,-1014.36560973665,-667.740609736654,-760.604575113856,-1176.80546730352,-841.741903461978,-1149.36094973086,-955.862413840274,-746.781124175132,-709.150095912725,-1335.19465193851,-620.741903461978,-616.632446478891,-943.646173844279,-695.051326882449,-1121.41648106154,-1218.88661000575,-847.826820427989,-1457.20836177434,-739.098802618338,-762.182980623818,-700.166194867967,-798.375034470742,-990.667795489825,-980.750659067024,-1130.06162042632,-760.425012454168,-876.685813995328,-676.473639475384,-910.620480623818,-673.003492438533,-1217.50349243853,-1143.86345456117,-896.781124175132,-707.654953753323,-473.604575113856,-851.362413840274,-1283.41648106154,-998.436620426322,-1101.79351958268,-525.886321547836,-946.636321547836,-980.574110005747,-1291.38908208736,-906.875434854603,-681.253492438533,-791.142548555772,-669.653003815523,-1156.58643835387,-1178.08404067596,-950.194651938511,-1282.64586177434,-675.366845206447,-819.306947064866,-1270.54351958268,-807.935813995328,-936.84299957885,-700.01148469079,-875.507446478891,-1376.31112054589,-1151.34934175871,-407.054345206447,-764.139082087356,-790.654953753323,-1155.58227331639,-1201.8084452329,-884.676764159808,-910.555467303519,-769.973639475384,-833.625034470742,-755.232170868008,-1102.32369932809,-796.198699328093,-1048.69484805517,-1080.52086177434,-806.88648469079,-894.995480623818,-654.643759910664,-612.908957546642,-1237.47363947538,-1391.3428692442,-918.816012795515,-725.704163133996,-1315.09131343529,-851.832417469519,-783.241903461978,-685.582417469519,-1012.18298062382,-941.550012454168,-817.652687739412,-1059.67501245417,-475.306947064866,-739.003492438533,-698.919834010962,-954.857334010962,-965.316012795515,-837.973639475384,-874.056514524305,-697.279953753323,-906.667795489825,-662.061620426322,-1245.97363947538,-501.771173844279,-685.794834010962,-814.098802618338,-790.795386242465,-1497.64254855577,-653.666194867967,-829.176764159808,-1212.30546730352,-1366.31112054589,-1082.48217086801,-1068.83643835387,-1576.31112054589,-634.636610005747,-1421.37565906702,-992.819848055174,-642.729575113856,-827.694651938511,-1276.47434175871,-906.213465526658,-608.761321547836,-1052.76875991066,-1040.21550381552,-1249.19859703792,-1368.94869932809,-1337.77086177434,-849.066012795515,-915.551326882449,-1357.90381343529,-1036.65268773941,-1006.59640654241,-644.821946169652,-1247.81253447074,-896.416481061544,-1421.37565906702,-984.865609736654,-678.132704170014,-815.948699328093,-437.681947064866,-683.238454561169,-926.832273316387,-987.306514524305,-590.821946169652,-781.679345206447,-506.94364310463,-973.050012454168,-827.694651938511,-463.842453753323,-963.972855267008,-1200.90268773941,-1129.09880261834,-757.882704170014,-514.396173844279,-555.319946478891,-584.667795489825,-865.908957546642,-1124.73085643973,-724.096406542408,-1096.68581399533,-755.232170868008,-1478.0565145243,-712.334040675963,-1337.6595606187,-860.408957546642,-737.650095912725,-1347.8173901589,-812.5342640972,-1134.58004855577,-1247.59934175871,-859.213981956758,-964.957273316387,-1241.01109703792,-1000.45867384428,-931.103674510985,-656.625434854603,-546.781124175132,-918.490609736654,-872.676326882449,-1341.95904067596,-1176.34050381552,-1428.2845606187,-1002.89136223276,-929.019917469519,-1182.76875991066,-807.614505784071,-928.753492438533,-710.250034470742,-717.004267726446,-988.12656537289,-533.347855267008,-835.698699328093,-686.647657991388,-830.275095912725,-918.396173844279,-578.103694867967,-764.139082087356,-1255.08336177434,-674.821946169652,-957.955048555772,-1272.27881343529,-846.781124175132,-826.455477562277,-1203.95904067596,-581.229575113856,-992.106019582681,-694.38648469079,-882.669834010962,-911.722060618699,-1338.04351958268,-954.561620426322,-845.854607274661,-760.583673844279,-1496.37565906702,-583.916194867967,-765.132704170014,-1363.86094973086,-1073.81601279551,-1383.40268773941,-1094.41648106154,-690.554345206447,-579.179345206447,-1001.48845456117,-975.382704170014,-517.56864310463,-1203.26754855577,-1497.32369932809,-839.732886242465,-632.479575113856,-955.204163133996,-633.741903461978,-724.311583382617,-747.958673844279,-846.025965526658,-1154.20504855577,-1150.87503447074,-1132.70727331639,-453.104575113856,-1536.83643835387,-801.341313435292,-727.768759910664,-1310.23594973086,-672.741903461978,-815.882704170014,-842.437534470742,-1274.48594973086,-728.821946169652,-541.291174510985,-545.958673844279,-1056.7220606187,-602.275095912725,-1325.63932042799,-647.854575113856,-918.705048555772,-1060.5342640972,-1477.0048901589,-960.882704170014,-738.294834010962,-1322.33643835387,-712.007446478891,-788.386610005747,-510.353674510985,-971.741903461978,-1053.93753447074,-801.245480623818,-559.281124175132,-531.713465526658,-976.311120545886,-996.557980623818,-1367.83404067596,-926.014320427989,-483.854575113856,-869.642548555772,-844.636321547836,-802.972060618699,-942.863454561169,-722.556947064866,-1219.23845456117,-1105.47140654241,-1337.38234805517,-1030.24190346198,-1330.83004855577,-744.775095912725,-806.598802618338,-807.87656537289,-980.151481956758,-1459.36241384027,-1217.50349243853,-1352.69465193851,-696.444651938511,-787.658906542408,-860.8798901589,-1127.90268773941,-1289.94869932809,-749.154953753323,-888.965503815523,-815.550012454168,-980.574110005747,-1389.80546730352,-686.641362232757,-841.518759910664,-518.821946169652,-1004.01132154784,-654.528003815523,-554.250434854603,-1477.06984805517,-1179.16967086801,-1082.57369932809,-1158.87565906702,-772.027687739412,-581.741903461978,-1144.68662042632,-759.281124175132,-1076.59880261834,-685.722855267008,-1307.45904067596,-1087.88908208736,-816.016362232757,-1116.5342640972,-939.650965526658,-584.170386242465,-746.060813995328,-551.386321547836,-957.511610005747,-939.889082087356,-1216.9678692442,-809.73594973086,-1478.33643835387,-608.560813995328,-798.886097037919,-1115.27509591273,-826.869014524305,-1262.33898195676,-899.458673844279,-458.585157991388,-574.408957546642,-730.472060618699,-553.147657991388,-930.893759910664,-486.408957546642,-520.01148469079,-894.245945232898,-871.444651938511,-882.418519582681,-814.098802618338,-841.741903461978,-1135.27881343529,-1497.32369932809,-1051.16851958268,-621.249083382617,-1280.84131343529,-735.041194867967,-895.312534470742,-864.667795489825,-895.078862232757,-504.166174510985,-1354.23085643973,-1067.66779548982,-662.004267726446,-1068.5342640972,-616.566012795515,-816.592453753323,-1211.41648106154,-1146.31112054589,-881.335157991388,-636.5342640972,-819.136610005747,-621.249083382617,-607.176764159808,-570.979575113856,-509.281124175132,-1418.41648106154,-936.62656537289,-839.732886242465,-646.965503815523,-778.588981956758,-660.365609736654,-1497.83643835387,-835.431947064866,-1085.86426415981,-1060.88609703792,-978.241903461978,-1322.33643835387,-918.396173844279,-905.416481061544,-927.152687739412,-605.437934854603,-1007.01754855577,-638.713465526658,-552.029953753323,-1083.97960727466,-946.338465526658,-719.551326882449,-679.644917469519,-1546.31112054589,-647.853694867967,-562.404953753323,-791.925012454168,-945.402687739412,-1208.13908208736,-857.686583382617,-524.62656537289,-874.018759910664,-1247.81253447074,-946.781124175132,-1052.22960727466,-708.823597037919,-1184.50349243853,-844.312934854603,-1006.99060973665,-506.821946169652,-615.186583382617,-520.114505784071,-877.604607274661,-735.041194867967,-1412.00065906702,-647.011321547836,-628.187934854603,-1311.36345456117,-585.213465526658,-1135.48845456117,-899.525965526658,-646.051326882449,-748.5342640972,-828.5342640972,-1007.35733401096,-947.249120426322,-643.882446478891,-960.989264159808,-662.408957546642,-834.507348055174,-877.620945232898,-1206.31112054589,-1326.36241384027,-887.503492438533,-687.482886242465,-533.333673844279,-1003.08227331639,-1001.06253447074,-774.676326882449,-1161.57369932809,-549.09299957885,-830.056947064866,-1134.54467086801,-1048.83227331639,-513.84299957885,-1330.83004855577,-932.624120426322,-1085.23845456117,-776.518759910664,-944.821946169652,-1149.50065906702,-448.455477562277,-860.408957546642,-886.166194867967,-747.625434854603,-921.216313435292,-516.705477562277,-772.891362232757,-842.957273316387,-1023.42676415981,-855.069946478891,-893.864505784071,-779.416481061544,-593.556947064866,-1036.31112054589,-453.81864310463,-1437.3470606187,-768.136321547836,-1020.08643835387,-711.741903461978,-949.958673844279,-887.592869244201,-889.098802618338,-854.33643835387,-755.908957546642,-1416.43046730352,-1154.17501245417,-1018.23845456117,-796.241903461978,-1085.86426415981,-859.357170868008,-1250.36241384027,-508.750434854603,-567.592453753323,-1476.38908208736,-988.800012454168,-961.67344973086,-531.603694867967,-786.229575113856,-725.114264159808,-882.576820427989,-1172.76161000575,-617.864505784071,-1095.25734805517,-1089.14136223276,-901.204163133996,-831.09299957885,-1290.20904067596,-657.004267726446,-531.46799957885,-705.482334010962,-1199.02800381552,-1265.19465193851,-632.51148469079,-931.021173844279,-766.896173844279,-864.647657991388,-817.652687739412,-529.676326882449,-717.603694867967,-1147.47960727466,-759.000434854603,-1151.99912042632,-980.574110005747,-927.362413840274,-874.208673844279,-595.541194867967,-934.957417469519,-1018.66779548982,-899.777687739412,-878.667795489825,-829.667795489825,-710.250034470742,-933.240609736654,-880.353694867967,-991.241903461978,-981.555467303519,-742.272657991388,-673.687934854603,-917.382704170014,-902.357334010962,-1401.0970606187,-826.455477562277,-869.228674510985,-618.186620426322,-842.646173844279,-803.761610005747,-923.828862232757,-1289.94869932809,-1355.41648106154,-557.908957546642,-863.277687739412,-1060.02596552666,-893.479607274661,-791.925012454168,-590.531124175132,-934.448699328093,-557.217453753323,-902.821946169652,-621.511321547836,-478.59299957885,-974.780369244201,-1140.33227331639,-986.791174510985,-905.364505784071,-1072.2440145243,-523.551326882449,-734.574110005747,-851.250034470742,-862.753492438533,-669.960157991388,-1176.0565145243,-898.393759910664,-1374.27768773941,-1147.47960727466,-1286.52648195676,-904.43906537289,-914.761321547836,-949.50156537289,-1082.57369932809,-652.666174510985,-942.863454561169,-1536.6298901589,-567.004267726446,-518.186583382617,-490.455477562277,-788.5342640972,-815.624120426322,-926.853694867967,-678.886321547836,-562.420386242465,-693.828862232757,-873.83643835387,-1152.47363947538,-773.98594973086,-1268.5342640972,-541.654953753323,-1487.83004855577,-916.5342640972,-716.88648469079,-1276.6209452329,-884.534560618699,-778.874083382617,-685.56406537289,-752.264320427989,-447.554345206447,-930.18906537289,-655.316012795515,-1004.94494647889,-971.598802618338,-880.761097037919,-623.81864310463,-699.104575113856,-866.811620426322,-533.347855267008,-850.582273316387,-1100.5565145243,-792.694651938511,-747.835157991388,-1063.09640654241,-442.491845206447,-432.366845206447,-926.294670868008,-459.107886242465,-1291.87503447074,-1388.81253447074,-687.104607274661,-1402.08336177434,-1073.70182042799,-1210.1209452329,-786.973639475384,-800.955048555772,-647.854575113856,-766.150095912725,-726.201820427989,-1157.52648195676,-702.125434854603,-904.125034470742,-951.400095912725,-875.338981956758,-1051.73845456117,-577.521173844279,-764.821946169652,-1262.14254855577,-869.416481061544,-878.403813435292,-904.793356439727,-860.862413840274,-1044.23926415981,-1069.63270417001,-854.33643835387,-573.097855267008,-604.491845206447,-1162.98085643973,-805.003492438533,-1155.36241384027,-780.614264159808,-1401.59934175871,-1080.51161000575,-856.816012795515,-589.728694867967,-707.004267726446,-795.473639475384,-1065.99060973665,-1149.36094973086,-772.731019582681,-930.893759910664,-977.222855267008,-917.326820427989,-1312.58643835387,-725.585157991388,-758.205477562277,-652.666174510985,-602.821946169652,-889.812934854603,-952.578862232757,-1308.1815145243,-750.894917469519,-1262.14254855577,-824.682980623818,-1160.62048062382,-602.771173844279,-759.529953753323,-896.544670868008,-486.801326882449,-1186.65381343529,-987.833673844279,-1177.80001245417,-1093.35601958268,-847.389082087356,-519.408957546642,-861.882446478891,-1062.90300381552,-829.753492438533,-737.926326882449,-718.963465526658,-1374.2440145243,-559.281124175132,-730.06864310463,-682.728694867967,-1236.5342640972,-955.667795489825,-759.529953753323,-790.531124175132,-1145.86241384027,-811.083673844279,-813.340503815523,-1165.58898195676,-1061.59880261834,-495.582417469519,-789.741903461978,-471.832417469519,-949.139082087356,-614.821946169652,-789.119014524305,-645.06864310463,-1046.01636223276,-990.667795489825,-1256.68046730352,-1271.37565906702,-782.12656537289,-986.598802618338,-1228.34934175871,-910.724341758706,-919.588465526658,-708.353674510985,-1031.41648106154,-1061.59880261834,-912.653813435292,-857.106019582681,-755.503492438533,-679.918519582681,-687.104607274661,-750.114505784071,-826.963981956758,-518.306947064866,-984.467869244201,-1122.40009591273,-862.599341758706,-761.245945232898,-1238.15148195676,-572.004267726446,-765.775965526658,-566.114505784071,-1310.40268773941,-629.185813995328,-645.908957546642,-856.311120545886,-1025.39586177434,-881.403003815523,-1103.51636223276,-1156.58643835387,-543.454163133996,-588.375434854603,-957.332273316387,-684.931947064866,-1130.75065906702,-719.199110005747,-832.495480623818,-676.916194867967,-914.698699328093]}

},{}],39:[function(require,module,exports){
module.exports={"x":[32.5,25.75,32.5,32.75,27.25,39,23.75,32,27.5,31.5,31.25,33,35,33.25,21.75,20,32.5,39.75,31,23,22,21,29,21,22,24.25,38.25,21.25,37.25,34.75,30.5,36.5,21.5,37.75,29.5,33.75,36.25,25.25,27.5,34.25,29.5,23.75,24.75,23.25,23.5,27.25,39.25,39.75,22.75,34.75,25.5,30.75,39,32,27.5,21.75,38.5,37.75,26.5,32,31.5,33.75,33.5,29.25,38.25,23,24.25,32.25,36.5,26,28,38.5,37.25,31.75,23.25,34,20.75,30.75,27.5,22.75,33.25,30.75,27.25,31.25,39,25,27,39.75,30.75,37.5,39.5,34.5,26.75,40,22,39.5,29,38.75,30,30,20,34.75,29.5,36.25,27,28.25,33.25,32.75,35.75,26.5,23,25,29.5,27,27,26,35,40,36.5,39.25,30.5,28.5,28.5,24.25,27.25,34,27,26.25,21.25,20.75,21,25.25,21.25,30,35,24.5,36.75,31.25,34.75,35.25,25.5,35.75,40,24.5,26.25,25.5,34.75,39.75,40,30.25,28.5,28.25,33.75,37.25,38.75,27,25.75,35.25,36.25,27.5,39,39,28.5,21,39.5,37,22.25,26.75,40,24.5,29.25,35.5,40,25.25,22.75,36.25,26.25,27.5,32.75,29.5,37.5,29.75,26.5,24.75,28,21.5,32,39.75,29.25,22,29.25,39.75,29.75,22,38.25,22,29.5,24.25,24.75,21.25,29.5,34.5,22.5,32.5,31.75,32.5,38.25,39,24.75,32.5,28.5,23.75,23.75,36.5,30,35.5,27,31.25,28,23.25,36.25,38.75,33.25,28.5,29.75,34.5,31,27.75,29.25,30.75,27,26,34,21.25,22.75,29,27,21.75,39.5,20,39.75,38.25,35,26.5,34.5,20.5,34.25,25.75,28.75,23.75,25,32.75,40,30.5,31,35.25,30.25,29,29.75,32.5,31.5,37.25,38.25,25,36.5,22.75,20.5,21.25,26.25,23,20.25,37,31.5,30.75,38.5,23,28.5,24.75,36.25,28.75,38.75,31,33,20.25,28,33.5,28,21.5,35.25,38,35,21.5,23.75,31.75,35.25,22.5,28.25,36.25,24,39.5,28.25,27,20.75,30.5,22.5,23,28,32.25,34,31.25,40,24,21.75,31.75,33.25,27.75,20,23.5,22,30.75,25.25,28.75,22.5,20,30.5,35,36,25.5,36.75,39.75,38,26.75,31.25,23.25,27,36.75,24,23,20.75,20.5,23.75,32.5,21.5,33.5,39.5,23,39.5,29,38,31.75,31.75,27.25,25.75,33,37.75,30.75,23.75,37.5,29.25,38.5,36,25.25,33.5,20,38.25,27.75,36.25,34.25,23.75,22.75,28.5,32,30.75,20.75,31.75,36,23.75,31.75,27.75,28.5,36,27,37,20.5,26,37.75,21.75,30,36.25,39,30.75,36.75,33.25,36.25,30,23.75,37.25,25,36,36.5,31.75,35,32,29,35.5,23.75,21.5,33,35.75,23.25,33.75,31.5,39.75,30,21,35.5,30,30,30.5,31.75,31.25,38.5,34,35.25,24.75,39.5,26.5,32.5,20.5,28.75,37,25.75,23.75,26.5,37.25,36,23.25,21.5,35.5,39,28.25,23.25,21.25,20,30,33,28.75,38,22.75,28,25,32.5,36.75,30.5,30.25,33,35.75,36.75,34.25,29.5,28.75,20.75,21.5,27.25,35.75,23.25,29.75,32.75,28.25,33.5,39.75,39.5,21.25,29.75,38.75,22.75,31.75,33.25,31.75,20.25,29.75,31.5,39.75,22.5,39.5,39,32,32,30.75,21.25,20,34,21.5,24.25,37.75,21.25,33.5,33.75,28.25,32.75,36.25,33.25,34.75,23,26.25,24,35,35.25,34.25,25.75,38.5,33.5,35.75,27.25,38,20.5,23.25,35,22.75,20.75,26.25,22.5,26,31,31,38.5,22.75,39.25,22,21.25,22.5,38.75,36.25,33,33,29.5,21.75,37.75,32,25.25,35.5,39.75,32.25,32.25,27,38.5,26.75,32.25,21.5,31,21,27.5,31,20,20.25,37.25,27.5,39,30,26.25,36.5,39.5,28,34,32.5,31.75,36.75,30,24.75,30,33.5,34.25,24.5,26,39,22.5,34.75,31,26,35,32.25,27,25.25,36.25,23.25,39,29.5,27.25,32,28.25,29.75,27.25,40,35.75,24.5,21.5,33,38.5,31,34.75,31.75,31.5,36.75,21.75,22.25,35.5,26.75,25,33.5,25.25,29.75,22.25,35.75,28.75,22.75,33,24.25,22.75,34.25,38.25,39.75,32.75,37,26.25,35.5,33.25,34.75,37.5,21.25,22.5,31.25,34.25,26,23.75,25.75,34.25,36.25,38.25,32,28.75,36.5,20.5,31.75,39.5,22.75,36,38.75,38.75,25.5,26.75,25.75,35,26,26.5,33,33.5,35.75,40,23,32.5,26.5,33.5,30.25,31.25,38.25,28.5,27.5,28.25,35.25,35.25,26.25,35.25,30.75,23.75,26.25,27.75,29.5,39,35.75,40,21.25,36,24,32.25,33.5,38.75,30.75,22.25,33.75,29.25,27,24,36.25,25,22,22,23.75,22.5,33,31.25,20.75,34.5,22.75,26.75,29.75,33.5,39.25,20,34.25,20,35.75,21.5,23.25,40,39.5,21.75,23.25,24.75,27.5,29,38,34.75,37.75,21.25,33.5,36.25,21.5,26,33.25,29.5,36.25,38.75,28.75,22,30.5,39.25,38.5,22.75,22.5,20.5,32.5,27.5,33.25,36,31,39.5,27.75,22,23.25,27.5,31.25,28.25,22.75,31,22.25,21.25,31,33.5,21.75,24,32,32.75,33.75,26.5,27.75,35,38.25,26.75,33,38.25,38.5,30.5,40,36.75,23.75,30.75,27.75,33.25,32.5,24.25,31.5,23.25,33,29.5,20.25,24.5,27.75,37,33.5,31.25,20.25,28.75,36.5,34.25,20,38,27.25,37.75,29,37,39.75,33.75,32.25,40,34.25,36,20.5,30.25,26.75,35,37.25,25,36.5,22.5,20.75,25.75,29,28.5,22.5,22.25,22,35.75,20.75,39,34.5,24,26.25,28,32,28.25,29.75,36.75,26.25,37.25,35.75,35.75,27.25,39.5,35.25,28.75,33.75,38,28,32.25,29.5,34.75,23.25,31,24,39.75,20.75,28,27.5,31.25,36.25,26.75,24,38.5,34.5,30.5,30,29.75,26,29.75,23.75,27,39,24.5,22,24.75,36.75,23.5,22.75,33.75,34.25,35,25.25,37.5,33.25,33,20.5,36,25.5,33.5,30.75,22.5,36.25,38.25,38.75,22.25,28,40,33,24.75,33.75,23.5,25.25,24.25,28.5,20.75,33.75,36.25,27.75,26.75,37.5,36.75,35.25,24.5,20.75,33.25,32.5,30.75,26.75,21,31,39.5,27,30.75,24.25,21.25,38.25,31.5,30.25,29,37.75,21.5,35.75,26.5,23.25,34.5,32.25,37,32.25,35.25,36.75,28.25,39.25,30.25,21.5,20.25,36.5,24.25,34.75,23.25,24.5,27.25,32,22.5,36.25,23.5,38.75,34.5,36.75,20.5,39.25,33.25,38.25,37.5,25.5,32.25,25.25,24.5,34.75,34.75,32.25,31.5,23.75,32.75,32,32.75,23.75,37,30.75,21.5,26.25,29.25,23.5,20,37,32.25,37,34.75,31.5,30.25,35,27.75,20.5,24.25,36.5,25.5,31.75,35.25,21,35.5,23,27,22.5,37.5,34.75,35.5],"lambda":[4.5,14.75,5.5,9.75,17.25,11.25,18,5,19,15.75,14,13,6,5,16,18.25,17.75,4.5,10.25,8.25,18.75,18,2.5,4,13,9.25,3.25,4.75,18.75,7.75,3.5,19.75,1.75,5.75,6.25,10.75,2.5,2.25,13,5.25,8,4.75,11.5,3.5,0.5,15.75,8,18,4.5,15.25,6.25,4.5,19,8.25,1,12.5,7,14.25,15.5,13.5,15.75,13.25,2.75,15.25,15.25,8.5,0.5,18.25,7.5,17.75,10.25,10.25,4.5,4,7.25,18.75,15.5,10.25,8,5,1.75,2,2,6,1,18,11,16.75,5.25,2,16.5,14.5,10.25,15.5,10,12.25,17.25,12,5,14.75,16,8.5,0.75,19,3.5,15.25,9.25,3.5,4,7.25,15.25,9,13.75,14.25,2.75,12.75,19.5,19.25,1.5,11.75,16.25,3.75,11.5,10,12.75,14.25,18.5,1,7,10,2.25,18,2.75,16.5,2.25,13.25,2.5,17.75,17.25,19.5,9.5,10.75,4.25,2.5,6.25,13.75,8.5,20,19.5,16.75,11.25,10,4,18.5,12.5,19.5,14.5,8.25,12.25,16,8,14.5,13,3.5,14.25,9.25,19.5,10.5,17.25,14.25,12.75,12.75,10.25,19.25,1.25,14.5,0.75,13.25,16.75,12.25,17.5,8.5,17.5,4.5,17.75,1.5,4,2,9.75,3.75,15.25,6.25,17,5.75,6.75,2,4,14.5,18.75,5.25,18.75,16.25,13.5,6,7.25,12,7.25,8,10.75,14.75,13,9.75,14.5,4.75,4.75,16.75,17.75,9.25,17,14.5,9.25,3.5,0.75,8.25,13.75,18,10.25,5.5,15.5,7.25,15,14.25,5,5.5,9.75,19.5,2,0.5,10.25,8.25,20,14.25,4,14.25,7.5,4,14.25,4.75,6,8.75,0.75,2.25,4.5,19.25,3,13.5,4,4.5,4.5,17.75,2.25,7.75,5.25,18.5,16.5,14,9,18.75,9.25,8,14.25,6.25,3,4.75,10.75,18.75,1.5,5.75,3,13.25,0.75,4.75,17.75,6.5,20,4,11.75,10.5,15.25,19,3.75,7.25,1.75,1,6.5,12.5,6.25,8.5,0.5,10.25,16.75,0.75,8.25,11.75,4.75,16.75,16.5,12.25,14,8.75,8.5,9.25,2.75,19,13.5,16.5,15.5,10.5,6.25,4.75,4.25,8.25,16.75,16.5,18.5,7,4,9.5,4.75,19.5,18.5,18.5,18.75,9.5,2,11.75,4.25,6,5.25,5.25,8.75,11.75,0.5,9.5,1.5,13.75,2,12.75,8.75,14.25,13.5,12,9.75,7.75,12.5,18,5.75,20,14.5,4,13.75,8.5,19.5,15.5,6,12.75,19.25,10.5,7.75,1.25,13.75,13.25,18.75,10.25,16.5,15.5,3,8,12.75,9,3,7,6.75,9.25,2,10.5,11,5.25,5,20,13,3.5,12.5,6.75,15.5,19.5,14.5,1.25,13.25,16.5,17,13.75,13.5,15.75,4.75,18.25,15,2,18.75,13.5,16.25,15,11,5.75,8.75,6.75,1,11,2.5,16.5,2.25,6.5,16.5,0.75,5.5,18,18.5,10,16,6.25,10.5,9.75,4.25,6.5,18.75,6.75,2,4.75,5.5,16.75,15.25,13.75,11,8.5,9.5,8.75,9.5,10,15.25,9.75,6,9.5,2.75,14,1,10.5,2.5,5.25,5.75,0.5,7.5,11.5,18,16.5,7.75,6,9.25,7.5,14,5.25,6.25,14,4.5,9.5,9.5,17.75,1,13,11,18.5,14.75,10.75,10.75,0.75,10.25,3.75,20,1,15,19.75,19.25,9.5,7.5,4.5,13.25,10,19,4.25,7.5,6.25,11.5,3.25,15.5,10.25,14.25,8.25,9,15,6.5,6,18.75,7.25,11.75,10,3.75,14.5,5.5,4.25,5,16.25,13.25,13.25,6.25,17.25,16.25,15,5.75,15.25,1.5,11.25,20,3.5,14.5,19,18.5,1,7.25,2.75,11.5,19.25,13,11,18.25,18.5,10.25,11.5,16,16.25,2.5,2.75,11,16.25,19.5,17.75,19,15.5,13.75,16.75,8.75,1.75,16.75,5.75,10.75,15.75,6.5,18.75,19.25,20,3.75,4.75,12.5,6,11.5,15.25,10,16,0.5,18.5,5.25,3.25,5.25,11,9.25,1.5,12.5,9.25,13,19.25,8,12.75,9.25,16,7,15.25,2.5,11.25,15.75,1,2.5,15.5,18,4.75,20,13.25,19.5,6.5,3.5,2.5,11.25,12.75,19.5,19.25,9.75,15.25,3,8.25,19.25,5.25,19,3.25,12,4.25,10.75,3.25,3.75,18.5,9.25,14.25,15,10.25,10.5,11.75,3.25,6.75,5.75,18.25,4.5,18.25,16.25,0.75,13,4,5.5,11.25,13.5,6.25,13.5,10.5,10.25,18.75,4.25,11.25,15.75,11.5,8.25,13.5,4.75,16,8.25,17.25,8.75,11.75,14.25,3.5,14.5,9.25,11.5,1,17.25,3.75,9.5,6.5,12,1,18,19.5,17.25,1.75,17,1,19,11.25,19.75,17,9.25,9.5,2.75,10.75,1.75,11.25,15.75,20,11,6,18,7.5,5,3.25,19.75,18.25,15.25,8.25,4,18.75,2,8.5,4,0.75,15,2.25,3.75,16.75,18,13.5,15.5,10.25,17,9.5,18.5,1.75,2.75,14.25,17,0.5,19.5,7.75,10,7.75,6.5,3.25,16.5,14.25,4.25,14.75,17.25,4.5,6.5,5,1.25,16.5,17.5,19,2,16.25,12,8.25,1.25,16.25,3.5,3,4.75,10,4.75,14.75,17,8.75,3.75,19.75,11,19.25,10.25,5.5,15.5,2.25,4.25,0.5,13,16.75,9.5,2.25,0.5,11,6,6.75,1,11.5,19.5,3,9,19.75,7,5,12.25,4.75,13.75,9.25,5.75,10.25,2.5,14,14.5,12.75,8.25,6.5,15.5,19.25,14,3,17.5,10.25,2,1.5,2,14.75,1.25,0.5,7,9.25,9.75,13.75,19.25,1.75,3.25,13.75,15.5,14,16.25,13.75,1.5,20,14.5,1.5,6,18.5,3.25,13,10.5,15.5,6,16.25,15.5,12.25,13.25,17.25,12.5,4.75,12,14.25,1.5,5,8.25,2.5,1.25,18.5,2.5,7.5,15,15,2.5,14,13,1.5,19.5,12.75,7.25,1.5,7.75,5,10.25,18.5,12.5,9.25,6.5,16,9.75,17,6,11.5,12.25,12.25,6.75,19,16.5,14.5,14.75,19.25,10.25,2,4.75,1.5,12.25,5.5,15.5,1.5,20,13.75,1,2.75,0.75,10,14,2.25,10.25,12.5,13.25,8.25,7.25,13,11.25,18.5,10.5,9.5,10.5,5.5,4.75,19.25,3.5,20,8.5,8.25,16.5,19.5,17.25,9.25,3.75,8.75,1.75,18.25,14.5,15,6.75,10.75,18.75,13.75,7.75,9.5,2.25,6.25,6,14.5,20,9.25,15.25,4.75,17.75,16.25,11,2.25,18,6.25,17.5,6.25,2.25,11,10.75,18.75,16.25,0.75,1,20,16.5,11.75,11.75,16,19.5,10.5,14.75,18.5,19,15.5,7.5,19,18.5,8,7.25,7.75,18,19,11,11.25,17.25,2.75,17.5,7.75,19.25,14.75,8,7.75,17.5,11.25,8.5,9.25,20,9.25,5,15.75,9.75,10.5,7,3.5,9,13,11,12.25,16.5,13.25,9.5,2.25,6,12.75],"expected":[-144.745922603224,-377.121256917214,-177.045251907762,-317.03523271499,-467.214687856523,-436.32963187135,-424.609628242104,-158.390562087566,-519.555561020834,-493.368159634728,-434.860942670385,-426.435050642538,-208.208240530772,-164.640562087566,-345.22741127776,-362.095834919971,-573.998614484079,-177.370922603224,-315.422722294416,-187.639786799653,-409.568806247584,-375.109628242104,-71.5837092681258,-82.6137056388801,-283.435050642538,-222.087876448476,-123.133845003658,-99.3793553819534,-695.506306247584,-267.264807156635,-105.497237031505,-717.891846508653,-37.0653842120646,-215.313300145191,-182.542418536252,-360.437594245426,-89.7087092681258,-56.0015697837837,-354.935050642538,-178.154271923396,-233.92055845832,-111.254355381953,-282.182652964631,-80.1222370315046,-12.4431471805599,-426.430659634728,-311.92055845832,-712.609628242104,-100.870922603224,-527.212920496947,-157.542418536252,-136.870922603224,-738.055561020834,-261.889786799653,-27.5,-269.349271355692,-267.554089850945,-535.280743093285,-408.009159976075,-429.397310314556,-493.368159634728,-444.603502447568,-91.1133990883215,-443.337920496947,-580.587920496947,-193.359933836504,-12.8181471805599,-585.658334919971,-271.735096979458,-458.623614484079,-284.672722294416,-392.297722294416,-166.120922603224,-125.61370563888,-166.581498531133,-634.568806247584,-318.884159976075,-312.860222294416,-217.92055845832,-112.140562087566,-57.6278842120646,-60.8068528194401,-53.8068528194401,-185.708240530772,-39,-447.109628242104,-294.602104727202,-662.994101741729,-159.779271923396,-74.3068528194401,-648.946639619094,-497.575851350573,-271.860222294416,-617.259159976075,-217.697414907006,-481.369474063009,-497.402187856523,-462.515093350212,-148.390562087566,-439.808756917214,-317.22741127776,-293.234933836504,-22.4126820724518,-685.805561020834,-93.2472370315046,-428.087920496947,-305.337876448476,-113.372237031505,-141.61370563888,-190.143998531133,-348.025420496947,-222.802775422664,-403.003961175887,-382.093243093285,-73.2383990883215,-328.954468728396,-679.52958553443,-767.042488939266,-54.3445348918918,-458.72364675941,-492.836907091224,-105.553244160018,-325.307652964631,-240.197414907006,-344.891968728396,-481.843243093285,-496.582229267916,-26.25,-146.804089850945,-205.197414907006,-46.4390697837837,-451.609628242104,-57.4258990883215,-492.196639619093,-77.9390697837837,-322.041002447568,-90.9587092681258,-551.811114484079,-596.589687856523,-684.40458553443,-239.998708201393,-381.937594245426,-168.553081017064,-60.3337092681258,-162.229918536252,-348.003961175887,-293.234933836504,-792.004267726446,-777.02958553443,-503.869101741729,-318.20463187135,-280.197414907006,-133.61370563888,-686.207229267916,-481.849271355692,-523.52958553443,-370.700851350573,-288.702286799653,-441.556974063009,-437.22741127776,-309.92055845832,-562.825851350573,-367.935050642538,-72.2472370315046,-560.218243093285,-340.025376448476,-430.90458553443,-278.523624742837,-687.152187856523,-346.468243093285,-370.391968728396,-450.079468728396,-407.672722294416,-483.104988939266,-28.2143564486858,-522.950851350573,-19.9751820724518,-361.791002447568,-545.744101741729,-358.869474063009,-653.387799119071,-250.734933836504,-460.887799119071,-109.870922603224,-494.123614484079,-31.8445348918918,-126.61370563888,-78.8068528194401,-282.91023271499,-81.1782441600177,-443.337920496947,-246.604918536252,-502.916786655944,-124.750800145191,-256.277957495116,-43.3068528194401,-116.61370563888,-348.950851350573,-461.131306247583,-109.904271923396,-550.193806247584,-557.836907091224,-301.147310314556,-193.208240530772,-228.206498531133,-387.515093350212,-275.331498531133,-309.92055845832,-263.687594245426,-476.683756917214,-367.935050642538,-229.28523271499,-341.700851350573,-171.816855381953,-140.941855381953,-591.806601741729,-476.373614484079,-286.837876448476,-473.166786655944,-334.450851350573,-333.087876448476,-134.372237031505,-25.2251820724518,-233.014786799653,-406.441461175887,-618.109628242104,-315.422722294416,-150.920251907762,-450.634159976075,-220.956498531133,-402.291949798898,-367.843243093285,-168.390562087566,-115.170251907762,-219.53523271499,-562.52958553443,-53.3068528194401,-11.5681471805599,-402.547722294416,-162.889786799653,-792.004267726446,-542.405743093285,-138.61370563888,-374.968243093285,-256.735096979458,-80.6137056388801,-485.405743093285,-120.754355381953,-170.708240530772,-205.64344629963,-19.0376820724518,-72.8765697837837,-178.495922603224,-584.167488939266,-91.9013877113319,-473.272310314556,-119.61370563888,-128.995922603224,-132.370922603224,-573.998614484079,-70.0640697837837,-286.639807156635,-199.154271923396,-459.582229267916,-599.446639619094,-315.860942670385,-182.302775422664,-395.506306247584,-240.587876448476,-181.92055845832,-285.905743093285,-229.417418536252,-93.4013877113319,-144.504355381953,-411.500094245426,-428.318806247584,-42.3445348918918,-140.563300145191,-107.651387711332,-378.353502447568,-29.3501820724518,-145.691855381953,-582.873614484079,-129.753197823098,-557.004267726446,-132.61370563888,-326.53614675941,-223.398624742837,-534.837920496947,-719.055561020834,-129.928244160018,-153.893998531133,-41.0028842120646,-31.75,-227.253197823098,-278.724271355692,-174.729918536252,-305.984933836504,-12.6931471805599,-402.547722294416,-470.369101741729,-20.5376820724518,-169.077286799653,-355.91114675941,-105.316855381953,-382.431601741729,-459.196639619093,-392.556974063009,-473.360942670385,-271.26844629963,-337.859933836504,-219.775376448476,-58.8008990883215,-600.305561020834,-446.272310314556,-455.071639619093,-307.259159976075,-244.398624742837,-135.667418536252,-144.504355381953,-105.865581017064,-235.077286799653,-374.056601741729,-327.196639619093,-561.332229267916,-243.054089850945,-142.61370563888,-239.998708201393,-173.004355381953,-772.15458553443,-700.082229267916,-491.957229267916,-583.006306247584,-218.623708201393,-53.3068528194401,-429.34864675941,-100.553081017064,-136.208240530772,-107.279271923396,-105.966771923396,-205.64344629963,-379.41114675941,-11.4431471805599,-315.998708201394,-58.8445348918918,-313.628961175887,-78.3068528194401,-367.204468728396,-330.33094629963,-449.780743093285,-426.022310314556,-324.515093350212,-248.78523271499,-253.702307156635,-469.349271355692,-550.609628242104,-134.813300145191,-747.004267726446,-421.450851350573,-152.61370563888,-492.378961175887,-212.484933836504,-650.27958553443,-307.259159976075,-227.708240530772,-351.266968728396,-694.854988939266,-357.273624742837,-182.014807156635,-28.2143564486858,-389.253961175887,-421.416002447568,-573.631306247584,-210.360222294416,-521.071639619094,-555.259159976075,-70.1513877113319,-251.92055845832,-351.266968728396,-254.302775422664,-106.901387711332,-187.054089850945,-247.840457495116,-187.400376448476,-51.3068528194401,-394.023624742837,-236.852104727202,-155.841771923396,-179.640562087566,-777.004267726446,-397.185050642538,-127.372237031505,-413.099271355692,-242.777957495116,-462.259159976075,-460.15458553443,-537.450851350573,-31.0268564486858,-474.416002447568,-599.446639619094,-536.916786655944,-478.628961175887,-429.397310314556,-453.993159634728,-167.066855381953,-430.533334919971,-319.791949798898,-65.3068528194401,-667.381306247584,-311.272310314556,-545.649407091224,-469.791949798898,-434.852104727202,-170.750800145191,-181.58094629963,-237.715457495116,-30,-327.602104727202,-75.3337092681258,-521.071639619094,-69.5015697837837,-248.378197823098,-558.196639619094,-26.7251820724518,-134.420251907762,-708.109628242104,-487.332229267916,-322.697414907006,-325.22741127776,-177.854918536252,-386.148624742837,-248.78523271499,-99.4905810170637,-170.378197823098,-695.506306247584,-241.090457495116,-45.8068528194401,-100.566855381953,-193.545251907762,-650.431601741729,-428.087920496947,-317.066461175887,-231.352104727202,-167.859933836504,-282.748708201394,-286.58094629963,-270.873708201394,-377.697414907006,-344.212920496947,-270.72273271499,-148.208240530772,-306.498708201394,-100.050899088322,-424.360942670385,-30.25,-344.148624742837,-88.4587092681258,-191.279271923396,-195.188300145191,-15.4431471805599,-213.610096979458,-236.182652964631,-384.109628242104,-446.821639619093,-275.014807156635,-137.708240530772,-272.962876448476,-243.610096979458,-392.860942670385,-174.216771923396,-246.604918536252,-550.360942670385,-94.1209226032237,-280.373708201394,-365.873708201394,-400.936114484079,-31.75,-429.685050642538,-346.852104727202,-371.707229267916,-436.121256917214,-336.250094245426,-424.937594245426,-17.1626820724518,-402.547722294416,-144.928244160018,-637.004267726446,-32,-458.541949798898,-416.704346508653,-382.042488939266,-320.748708201394,-159.235096979458,-107.620922603224,-497.603502447568,-210.197414907006,-633.555561020834,-141.990581017064,-209.860096979458,-202.854918536252,-414.432652964631,-106.883845003658,-535.884159976075,-233.422722294416,-371.405743093285,-195.889786799653,-312.802775422664,-526.041949798898,-220.753197823098,-152.708240530772,-718.943806247584,-240.893998531133,-417.59864675941,-270.197414907006,-141.178244160018,-294.575851350573,-126.170251907762,-147.303081017064,-112.140562087566,-334.399407091224,-345.228502447568,-295.541002447568,-160.667418536252,-531.902187856523,-500.961907091224,-574.791949798898,-129.063300145191,-595.837920496947,-32.5945348918918,-236.64213187135,-447.004267726446,-134.372237031505,-522.950851350573,-624.055561020834,-607.582229267916,-29.5,-155.706498531133,-102.800899088322,-365.557652964631,-483.104988939266,-458.935050642538,-434.852104727202,-585.658334919971,-593.707229267916,-274.422722294416,-440.307652964631,-425.22741127776,-521.274407091224,-52.8337092681258,-84.2383990883215,-228.602104727202,-444.086907091224,-601.52958553443,-352.123614484079,-381.805561020834,-574.634159976075,-375.503961175887,-650.431601741729,-260.33094629963,-45.3778842120646,-608.556601741729,-225.375800145191,-298.625094245426,-532.743159634728,-209.378197823098,-592.381306247584,-704.479988939266,-597.004267726446,-91.4907441600177,-140.941855381953,-416.224271355692,-203.708240530772,-279.307652964631,-393.775420496947,-387.697414907006,-357.22741127776,-18.0681471805599,-570.582229267916,-134.841771923396,-112.571345003658,-167.654271923396,-294.602104727202,-231.337876448476,-53.9695348918918,-288.099271355692,-358.525376448476,-380.935050642538,-521.604988939266,-253.92055845832,-357.641968728396,-272.962876448476,-433.22741127776,-278.054089850945,-542.462920496947,-60.3337092681258,-239.45463187135,-516.993159634728,-38.5,-76.5837092681258,-535.884159976075,-568.609628242104,-148.066855381953,-732.004267726446,-285.603502447568,-430.90458553443,-228.878197823098,-92.3722370315046,-61.5837092681258,-374.45463187135,-319.391968728396,-577.15458553443,-425.354988939266,-346.28523271499,-435.712920496947,-67.1513877113319,-270.139786799653,-463.854988939266,-117.779271923396,-647.805561020834,-123.133845003658,-474.515093350212,-137.740581017064,-395.375094245426,-84.1338450036584,-131.803244160018,-612.207229267916,-319.212876448476,-531.718243093285,-316.041949798898,-228.297722294416,-325.773624742837,-399.97364675941,-83.3213450036584,-158.402957495116,-146.313300145191,-622.158334919971,-161.620922603224,-695.158334919971,-517.211907091224,-21.8501820724518,-471.935050642538,-80.6137056388801,-172.920251907762,-441.95463187135,-304.522310314556,-223.167418536252,-520.522310314556,-404.523624742837,-259.047722294416,-498.631306247583,-107.990581017064,-391.32963187135,-406.743159634728,-302.307652964631,-270.139786799653,-449.647310314556,-168.254355381953,-637.22741127776,-187.639786799653,-557.777187856523,-229.70594629963,-391.16114675941,-428.405743093285,-108.122237031505,-551.950851350573,-261.400376448476,-313.807652964631,-28.25,-605.214687856523,-130.865744160018,-247.123708201393,-227.253197823098,-366.515093350212,-23.75,-469.609628242104,-538.15458553443,-506.027187856523,-67.6903842120646,-604.916786655944,-40,-400.805561020834,-402.57963187135,-471.016846508653,-545.416786655944,-307.650376448476,-365.873708201394,-83.5508990883215,-236.812594245426,-58.5028842120646,-326.64213187135,-422.493159634728,-477.004267726446,-396.352104727202,-148.208240530772,-393.109628242104,-162.985096979458,-117.140562087566,-71.9463450036584,-648.766846508653,-567.408334919971,-313.712920496947,-282.514786799653,-89.6137056388801,-498.631306247583,-58.8068528194401,-282.609933836504,-155.61370563888,-15.2876820724518,-511.041949798898,-44.1890697837837,-132.740744160018,-357.306601741729,-415.609628242104,-537.397310314556,-609.509159976075,-220.610222294416,-392.416786655944,-232.873708201393,-505.832229267916,-50.1903842120646,-103.488399088322,-492.530743093285,-638.916786655944,-11.3181471805599,-650.27958553443,-278.889807156635,-212.697414907006,-199.452307156635,-214.253197823098,-94.6963450036584,-595.321639619094,-549.530743093285,-120.740581017064,-321.808756917214,-523.277187856523,-175.120922603224,-248.378197823098,-112.140562087566,-27.9018564486858,-335.446639619093,-565.887799119071,-519.555561020834,-65.8068528194401,-582.211907091224,-369.515093350212,-323.764786799653,-34.4643564486858,-354.711907091224,-80.1222370315046,-81.4013877113319,-146.879355381953,-280.197414907006,-106.504355381953,-454.558756917214,-375.416786655944,-183.76844629963,-114.928244160018,-658.641846508653,-236.852104727202,-459.042488939266,-325.672722294416,-178.420251907762,-520.384159976075,-58.8140697837837,-116.490581017064,-18.1931471805599,-494.685050642538,-445.244101741729,-311.248708201394,-85.2515697837837,-19.9431471805599,-333.102104727202,-238.208240530772,-246.152957495116,-23.75,-351.182652964631,-538.15458553443,-98.6513877113319,-290.302775422664,-475.954346508653,-218.554089850945,-114.640562087566,-401.744474063009,-138.566855381953,-275.816461175887,-224.400376448476,-157.813300145191,-376.922722294416,-82.8337092681258,-434.860942670385,-290.950851350573,-364.016968728396,-299.014786799653,-220.753197823098,-307.259159976075,-728.542488939266,-378.860942670385,-112.151387711332,-504.637799119071,-376.922722294416,-78.8068528194401,-50.2195348918918,-63.8068528194401,-587.308756917214,-42.5893564486858,-18.6931471805599,-141.554089850945,-277.587876448476,-258.53523271499,-478.628961175887,-714.104988939266,-43.1903842120646,-117.446345003658,-306.753961175887,-318.884159976075,-357.860942670385,-468.461907091224,-389.253961175887,-33.3445348918918,-442.004267726446,-316.325851350573,-53.2195348918918,-122.708240530772,-718.582229267916,-110.946345003658,-309.435050642538,-273.273624742837,-431.259159976075,-190.208240530772,-456.274407091224,-458.384159976075,-447.681974063009,-345.228502447568,-639.714687856523,-444.349271355692,-168.254355381953,-324.515093350212,-560.218243093285,-52.4695348918918,-142.140562087566,-276.327286799653,-94.0837092681258,-34.7768564486858,-593.707229267916,-72.8337092681258,-258.610096979458,-346.041949798898,-462.291949798898,-59.0837092681258,-553.860942670385,-267.185050642538,-41.5945348918918,-533.27958553443,-395.891968728396,-260.831498531133,-39.7195348918918,-183.952307156635,-190.890562087566,-351.297722294416,-561.332229267916,-372.474271355692,-272.962876448476,-167.128197823098,-473.22741127776,-229.28523271499,-456.166786655944,-232.208240530772,-279.307652964631,-266.994474063009,-300.681974063009,-246.152957495116,-443.555561020834,-372.571639619093,-486.700851350573,-502.496256917214,-670.792488939266,-256.485222294416,-74.3068528194401,-156.379355381953,-49.0945348918918,-248.619474063009,-196.295251907762,-392.509159976075,-49.8445348918918,-612.004267726446,-306.753961175887,-36.25,-104.175899088322,-29.3501820724518,-220.197414907006,-389.360942670385,-89.1890697837837,-335.922722294416,-306.849271355692,-444.603502447568,-191.764786799653,-181.081498531133,-312.685050642538,-318.20463187135,-380.957229267916,-352.023624742837,-342.123708201394,-289.023624742837,-145.420251907762,-176.566855381953,-704.479988939266,-122.122237031505,-487.004267726446,-174.234933836504,-272.202286799653,-533.446639619094,-596.65458553443,-458.589687856523,-192.025376448476,-114.928244160018,-343.45594629963,-46.6903842120646,-558.283334919971,-348.950851350573,-316.041949798898,-256.277957495116,-336.250094245426,-564.256306247584,-396.128961175887,-290.514807156635,-201.998708201393,-79.6265697837837,-163.792418536252,-137.708240530772,-497.575851350573,-642.004267726446,-340.025376448476,-489.087920496947,-165.879355381953,-649.436114484079,-456.274407091224,-429.352104727202,-67.2515697837837,-384.109628242104,-124.729918536252,-635.887799119071,-149.729918536252,-77.3765697837837,-253.352104727202,-261.000094245426,-508.006306247583,-517.211907091224,-17.1626820724518,-36.25,-467.004267726446,-636.571639619094,-402.91114675941,-429.34864675941,-325.22741127776,-762.40458553443,-346.773624742837,-561.496256917214,-690.832229267916,-481.555561020834,-497.134159976075,-187.360096979458,-462.555561020834,-639.957229267916,-275.92055845832,-231.831498531133,-242.077307156635,-424.609628242104,-619.305561020834,-349.602104727202,-366.01713187135,-406.839687856523,-100.738399088322,-535.262799119071,-164.577307156635,-502.354988939266,-428.746256917214,-185.92055845832,-152.952307156635,-644.637799119071,-360.39213187135,-312.359933836504,-319.212876448476,-627.004267726446,-277.587876448476,-173.390562087566,-434.305659634728,-197.59773271499,-252.273624742837,-253.554089850945,-87.9972370315046,-283.552775422664,-455.685050642538,-228.602104727202,-432.369474063009,-376.696639619093,-355.166002447568,-211.498708201393,-83.5640697837837,-206.708240530772,-450.079468728396]}

},{}],40:[function(require,module,exports){
module.exports={"x":[20,13.5,9.25,8.5,16.25,4.25,7,0.75,6.5,16.25,14.25,9.25,12.25,10.25,11.5,8,2,8.75,2,7.5,13,8.25,5,8.25,12.75,19.25,8.25,10.75,20,7.25,9.5,0.5,4.25,7.25,14.25,18.5,7,6.5,1.5,6,3.75,14,11.5,6.5,20,2.25,6,1,2.5,8.5,6.25,3.25,4.5,4,7,19,5.75,8,11.5,11.25,12,15.75,19,5.75,18.5,12.5,18.75,3,6.5,9.5,11.25,2.75,10.75,14.5,14.5,7.25,17,2.5,9.25,0.5,3.75,18.25,1.5,13.25,14.5,18,10,12.5,17.5,3.75,4.5,6.75,8.75,7.5,18.25,1.5,16,16.5,19.75,13.5,1.5,2.75,6.5,17,7.75,19.25,5.75,19.5,6.25,5.5,10.5,4.25,13.25,13.75,11.5,8.75,2.25,10.5,1,18.5,12.5,18.25,1.5,18.25,15.75,19,10,4.5,17.75,10.75,4.25,12,19.25,3.5,15,17.5,8.5,17.25,9.5,14.25,19,5.25,2.25,10.5,17.25,19.75,13,19,17.25,17,7.75,1,4.25,17.5,3.75,17.25,19,6.25,8.5,10,3.5,11.75,1.75,1.75,7.25,14.75,7.25,15.25,6,18,11,8,12.25,7.25,15.5,6.75,17.5,16.75,6.75,10.5,4.5,0.75,11.5,15.25,1.5,12.75,17.75,19.5,3,6.25,7.75,19.75,16.25,5.75,18.75,3.5,5.25,5.75,3.75,17.25,13,19.25,6.25,4,16,16,8.25,15.5,2.5,15.5,2.75,13.75,9.25,4,2.25,5,19.5,6.25,19.5,18.5,4.5,10.5,11.75,0.5,14,1.25,6.5,8.25,0.75,17.75,7.5,3.25,11.5,15.75,7,12,15,8.25,5.25,5.75,16,2.5,9.25,14.5,1,14,7.25,3.5,4,7.25,6,10,2.25,1.5,18.5,17,7.75,18.75,9.5,10.75,19.25,13,19.25,1.25,2,3.75,6.5,5.5,18.5,5.5,5.75,1.25,16.5,17.5,7.25,17.75,8.75,0.5,14.75,4.75,2,16.75,14.5,7.5,5,9.25,11,8.5,1.75,18.25,6,18.25,6.5,13.75,11.5,5.5,9.5,3.5,19.25,0.5,16.75,13.75,9,10.25,6.25,4.5,18.5,16.25,0.75,1,12,12.75,15.25,1.75,6.5,2.75,12,13.25,18.75,17.75,13,9.25,18,10.75,5.25,5,14,13.5,16.25,11,18,10.25,19.5,4.75,12,5.5,9,1.25,2.75,14.5,16.75,0.5,2.5,16,0.75,12.75,0.75,3.75,5.75,20,5.25,18.25,14,9.5,2.25,19.25,0.5,4,4.5,15,9.25,18.25,19.75,7,5.75,5.75,19,0.75,15.75,0.5,14.5,16.25,10.5,14.25,0.5,12,4.5,5.25,12,19.5,2.25,5.75,5.5,4.75,6.25,17.5,5.75,2.25,3.5,17.25,13,3.25,9.25,7.25,13.75,13.75,6.75,10,8.75,11.5,18.25,3.75,12.75,9.25,19.5,1,18.75,6.5,17.75,2.5,1.5,20,1.25,18.5,12.75,19.25,2.75,10.25,3.25,5.75,15.5,11.75,7,7,4.75,6.5,2.75,13,14.5,17.5,17.25,13.5,15.75,4.25,2.75,1.25,7.5,8,1.5,6.5,10.5,6.75,5.5,19.25,18.75,12.5,5.75,12.5,4,2.75,8.25,7,16.25,10.75,6.25,10.5,10.75,2.75,7,10.75,14.75,17.25,6,9,18.5,7.75,4.25,6.25,14,14.75,9,17.75,15.75,13,15.25,4.75,10,8,8.25,9.25,12.25,9.75,17.5,1,1.25,10,12.75,8.75,15.5,8.5,8.25,8,1.5,10.25,0.75,18.5,11.5,9,17.75,6.5,14.5,8.25,8.5,7,12,5.25,10.5,10.25,11,13.25,18.5,17.5,13,4.25,16.25,5.75,13,8.5,19.75,16,14.75,8.25,15.75,6.75,17.5,5.75,15.75,2.25,5.25,1.75,4.25,20,7,4.75,10.75,15.25,6.5,13.25,9.25,15.75,8,10.5,3.5,8.5,6.5,7,10.75,16.5,15.25,8,2.75,4,18,19.5,13,15.25,12.75,18.5,2.75,3.75,12.75,18.5,10,3.5,2.25,14.25,13,8.75,6,16,7.25,6.75,9.75,8.25,1,16.5,18.5,15,7,19,5.5,9.75,9.75,12.25,9.75,5.5,17.5,11.75,12.75,7.75,5.75,7,12.5,17.5,19,12.25,7.5,13.75,3,14.75,11.25,14.25,5,10,13.75,13.25,4.5,17.5,3.5,9,9.25,15.25,10.5,12.25,8.75,18.5,11.25,2.75,12.25,6.25,9,8.25,5.25,4,18.75,10.75,1.5,17.5,14.75,20,17.25,3.5,9,14.75,3.25,2.5,1.75,9.75,12.25,12.5,16,3.5,7.75,10.5,12,8.5,19.25,6,8.25,5.75,5.5,4,19,16,18.75,15.25,2.5,1.25,18.25,2.75,5.5,18,14.25,10.5,4.25,13.75,10.5,16.75,7,7.5,19,0.75,17,9.75,11.25,17.5,8.75,9.25,5,14.75,15.5,11,15.75,4.75,19.5,1.75,17,12,17.25,2.5,4.5,15.75,5,17.75,13.75,2,14.25,10.25,16.5,13.75,15.25,12,17.25,18,3.75,5.25,15.75,1,3.25,18.25,1,16,7,8.25,0.5,7.75,12.25,10.25,1.5,11,0.5,8.5,11.5,12.5,5.25,7,17.25,6.25,19,17.5,2.25,19.75,8.25,0.75,3.5,10.5,7.5,10.75,3.25,9.5,14.25,16,10.25,3,3.75,11.5,14.5,2.25,6.25,4,17.25,5.75,14,1.5,1,0.5,9,13.75,16.75,18.5,16.5,3.25,19,19.5,17.5,11.5,3.25,2,20,8,11.5,13.5,11.25,4,10.25,7.5,11.25,16.25,13.75,14.5,16.75,12.5,4.5,12.25,10.25,17.5,16,5.25,3.5,3.75,15,3.75,17,1.25,19.75,10.75,10.75,3.5,10.25,13.25,2.25,11,4.25,19.75,8.75,1.5,5.25,3.75,8.25,3.75,5.75,19.5,11.5,16.5,4.5,10.75,9,3.25,7,5.75,3.5,6,6.25,7.5,3.25,8.75,18.25,12,3.25,3.75,11.5,16,0.75,1,10.5,13.25,18.5,11.25,11.75,2.25,1.5,5,7.25,1.5,5.25,5,13,12.75,12.75,19.5,9.5,7,4,15.25,3,17,0.5,9.5,11,4.25,8.25,9.5,13.75,18.25,17.25,16.25,6,16,0.75,3.25,19,20,13.5,8.25,13.75,6.75,12.75,15.5,3,18.25,13.5,7.5,8,4.5,12.25,15,7.5,10.75,17.5,14,19,15.75,6.75,14.25,16.75,7.75,9.25,1.5,16.5,7.5,15.75,14.25,3.25,12.75,5,2.5,3,14.75,1,14.75,3.25,8,1.25,3.25,18,18.75,13.75,8.25,17,15.25,19.75,4.5,19,8.25,7,16,15.75,17.75,19.5,19.5,9.25,4,14.75,11.5,6.75,4.75,13.25,6.5,2,6.5,12.75,14,4,1.5,11,8.75,7.5,12.75,16.5,19.5,2.25,10.25,10.5,16,16.25,2.25,19,19,12,8.5,17.5,3.5,19.5,14,10,14.5,12,13.75,6,2.5,4.25,19,16.75,11.25,15.75,12,13.5,13.75,12.25,11,14.25,11,19.25,8.75,10.75,3.75,9.25,17,16.75,12,14,1,2.75,15.5,2.75,19.25,3.25,16.5,9.25,16],"lambda":[40,38.25,25,31.5,27.75,26.75,33.25,34.5,30.25,29.5,23.5,28.5,34,36.25,20.25,22.5,23,22,29.75,29,30.25,26.5,21.25,30.5,36.75,35.75,33.5,27,30.25,26,31,21.5,32.75,30.75,30.25,20.75,26.5,22.75,25.25,30.25,29.25,34.5,36.75,26.5,39.5,31.25,20.5,31.5,39.25,25.75,25.75,20.25,22,23.75,38.75,21.75,26.75,27,34,37,36.25,30.75,33.25,33.5,35.25,29,22,35.75,39.25,35,32,22.25,24.5,37.75,20.75,20.75,29.75,25.25,39.5,33.5,24.75,34.5,37,35,28.75,31.25,34.75,22.5,36.75,33.25,20,34.25,22.5,27.75,39.5,27.75,20,33.75,34,23.5,21.25,21.75,37.5,21,23.25,34,35.25,20.75,33,26.5,21.25,39.75,31.75,25.25,27.25,32.75,38.75,40,22.25,25,23.5,21.5,33.25,33.25,33,28.5,21.25,24.25,24.5,22.75,34,34,32,31.5,36.75,33.25,33,38.5,31.75,26.75,22.5,20.75,22.5,33.25,21,29,33.75,33,27,39,26,36.5,26.5,23.5,32.75,27.5,36.5,33.75,26.75,28.25,37.25,34.75,40,35.5,36.5,31.75,32,20.75,24.25,34.5,24,38.5,20,21.5,31,25,36.5,26.75,25,26.75,36,22.75,28.25,33.75,22.75,25,21.5,27.25,31.25,38.75,21.75,37.75,37,26.25,22.5,32.25,20,29,32.25,39.25,29.5,21.75,21.5,34,32.75,20,23,35.5,29.25,23.25,35.75,28.75,39.75,21.75,27.75,39.75,33.25,37.25,31.75,40,25,22.25,23.75,38,30.25,28,29,38.75,22.25,38,39.25,21.75,28,26,24.75,36.5,25,38,34,29.75,32.5,28.25,39.25,31.25,32,35.75,21.5,35.25,39.25,34,20.5,22.25,27.75,40,26.75,21.25,28.5,31.75,39.5,35.5,35.25,34.5,35,40,34,25.5,39.25,39,27.5,26.75,39.5,26.25,26.75,36.75,34.5,20.5,28.25,34.75,26.5,24,38.75,34.75,28.5,28.25,26,21,26.5,36.75,37,28,32.75,20.75,38,20.25,20.5,31.75,24.75,32,31.5,32.25,30,31.25,22.25,20.5,23,28.5,37.5,35.75,36.5,22.25,23.5,28.75,40,31,39.75,24.75,26,20.75,22,31.75,24.25,36.5,27,31.25,33.5,25,36.75,35.5,23.25,26.5,22.5,26.75,40,35.5,23,37,39,37.75,37,30.75,25.25,24,33.75,28,33.5,21.5,28.75,34.25,28,31.5,32.25,37,35.5,27.5,22.75,36.5,39.25,20,29.5,34,22,34.5,35.25,32.25,27,34.25,28.75,39,24.25,37.75,39.5,25.5,26.5,31.5,29.25,40,36.75,38.5,33.25,25.5,35.5,27.75,26.75,25.75,25.25,33.5,35.75,36.75,32,29.75,27.75,34,35.5,23.25,38.75,31.25,31.75,21.25,37,25.25,23.5,32.25,35,32,23,38.5,33.75,30,37.75,20,30,35.25,30,33,35.25,29.25,33,37,25.75,20.75,34.5,21.5,26,21,25.5,23.25,23.5,37.25,30,40,34.75,33.25,37.25,36,28,35,27.75,33.25,25,38.25,30.5,39.25,21.25,24.5,33.5,32.75,30.25,33.25,25,35.5,23.75,35.25,30.75,31.5,37.25,28.5,35.25,29.75,22.25,25,26,38,24.5,26.25,28.75,31.75,23.5,36,23.75,30,39.5,38.25,33.25,34.5,21.25,28.25,23,31,26.75,21.5,38.25,36,31,22.75,28.25,32.75,30.75,33,35.75,29.75,25.25,33,38.5,28.5,31.75,26,33,30.5,37.5,35,23.5,31.25,22,24.5,22.25,27.75,28,39.5,32,39.25,22.25,36,26.5,25.75,23.25,29,34,26.5,30,39.5,20.75,38.75,34.75,23.5,37.25,36,21.75,36.25,38.75,23.25,29,26.75,37.5,29.25,38.5,38.5,33.5,26.25,28.25,33,31.75,20.5,39.5,20.5,33.5,20,34,39.5,28.5,39.5,34.75,31.25,35,21.25,37.5,33.25,23,37.25,20.5,33.5,22.75,35.75,25.5,31,29.75,39.5,29,23.75,33.5,27.75,32.5,24.25,20,24.75,20.5,30.75,34.75,34.5,32.25,25,26.75,31.75,32,34,38.75,39,22.25,39,30.5,35.75,38.25,21,35.5,23.25,37,36.75,34.5,27.25,24.75,27,39,39.75,38.25,38,27.25,26,22.25,35.25,27.5,24.5,38.75,25.75,24.75,37.25,34,36,28.75,39.5,39.75,32.25,26.5,32.75,25.25,21.5,35.25,37,33.25,34,20,38.5,28.75,28.75,29.75,20,24,30,29.75,35.75,29.5,30.25,32,39,35.5,38,37.75,37.75,31.75,24.5,24,25.25,24.75,20,37,23,23.75,35.5,35,37.25,38.5,25.25,38.5,23.75,28.5,24.25,22.25,26.25,25.5,34.75,34,24.25,40,34.25,25.5,33.25,25.75,32.75,39,34.5,20,26.5,34.75,20.75,34.25,30.5,28,39,35.25,25.75,21.5,28.25,38,35.5,33.5,22.25,33.75,28.25,34.75,39.25,32.25,25,25,31.75,32.75,36.25,38.75,38.75,25.75,31.25,28.5,21,29,23.25,33,36.25,34,20.5,31,35.25,27.5,24.25,29.75,20.5,28.75,29.25,21.25,33.5,24.75,32,36,25.75,20,34.5,22.75,20,27.25,27.75,39,26.75,36.5,38.5,24.5,34,25,21.5,32.25,26.75,23.75,38.75,39,29.75,22.5,39.5,23.75,35,38.75,27.75,35.25,20.25,30,37.5,23.5,33.5,24,24,36.25,29,29.25,26,34.5,23.25,26,35.75,24,39.75,36.75,25.75,31.5,23.5,22.75,40,21.25,28.5,22.25,34,32.25,27.75,29.5,32,28.75,28,20.5,39.5,35.75,26.5,37.5,36.25,32.25,32.25,24,21.75,27,30.25,30.5,37.75,23.25,23,36.5,29.5,31.75,22,33.5,26.75,24.5,25,28.75,26,30.5,39,23.5,37.5,22.75,37,22,30.5,34.25,23.25,29.75,20.5,34.5,29.75,30.5,24.25,33,31.25,37.5,37.5,37.75,40,26.25,20.75,29.75,20.5,30.5,39.25,21.75,27.25,23,27.5,24.75,29.75,29.5,26.25,25.75,26.5,33.5,34,38,39.25,29,32.25,34,23.75,30,34.5,31.75,25,24.75,33.75,34.5,39.5,24.25,35.25,28.25,23.25,30.25,34.75,38,27.5,33.25,22.75,31.75,23,29.25,23,20.5,32.75,24.5,30,36.5,28.5,20.25,35,34,28.75,28,30.5,33,28,40,21.5,33.5,28.25,23,23,33.5,34.75,32.5,30.25,29.5,22,34.25,34.5,36,32.25,35.75,29.75,31.25,23.25,26.25,25.5,35.5,33.5,24,29.25,32.25,26.5,24.5,35.5,23,39.75,29.5,38,24,35,20.25,32.75,30,24.25,37.5,22.25,29,34,34.5,28.75,20.5,37.25,32.5,30.25,25.75,28,28,28.75,37.25,27,37.75,39.75,24.25,22.5,39.25,28.75,33.75,22,33.25,22.25,30.25,23,21.5,31.25,30.5,20.75,25.75,25.75,38,38.25,23.75,25.25,29,24.25,31.75,29.25,29.5,37.5,36.5,25.25,27.25,34.5,27.5,29.25,36,21.75,27.75,27,32.75,33,33.75,27.75,38,32.5,20.75,24.5],"expected":[-796.311120545886,-512.730856439727,-228.031124175132,-264.300012454168,-447.614264159808,-110.400965526658,-229.245945232898,-22.3340406759627,-193.215503815523,-475.990609736654,-331.71799957885,-260.275095912725,-412.973639475384,-367.972060618699,-229.866845206447,-176.88648469079,-42.8645057840709,-189.408957546642,-56.1071708680084,-214.132704170014,-389.840503815523,-215.347855267008,-103.19364310463,-248.207273316387,-464.958361774341,-684.61094973086,-272.863454561169,-286.954163133996,-601.590503815523,-185.241903461979,-291.066012795515,-7.68194706486638,-135.698597037919,-219.511610005747,-427.653003815523,-380.842453753323,-182.222855267008,-144.750434854603,-34.6461738442786,-178.090503815523,-106.311620426322,-479.459040675963,-419.020861774341,-168.972855267008,-786.323699328093,-66.8704806238176,-119.979575113856,-28.0500124541684,-94.4550485557716,-215.62656537289,-157.68906537289,-62.8043452064475,-95.9089575466417,-91.8324174695194,-267.592869244201,-410.170386242465,-150.525965526658,-212.704163133996,-387.473639475384,-412.639082087356,-431.409560618699,-480.886610005747,-628.245945232898,-189.113454561169,-648.562534470742,-359.132704170014,-409.408957546642,-103.67344973086,-251.455048555772,-328.944651938511,-356.5342640972,-58.0851579913878,-260.176326882449,-543.744014524305,-297.842453753323,-147.404953753323,-502.357170868008,-59.8961738442786,-361.698699328093,-13.238454561169,-89.6036745109853,-626.084040675963,-51.8890820873558,-460.194651938511,-413.516362232757,-559.057980623818,-343.951820427989,-278.13648469079,-639.520861774341,-121.183445232898,-87.004267726446,-227.653813435292,-193.76148469079,-204.801764159808,-717.198699328093,-38.3017641598076,-317.004267726446,-553.356019582681,-667.973639475384,-314.09299957885,-28.8186431046296,-56.7328862424653,-240.125659067024,-353.955477562277,-177.041194867967,-650.973639475384,-199.125034470742,-401.592453753323,-202.753492438534,-142.472855267008,-220.06864310463,-165.2548901589,-417.229607274661,-343.958673844279,-310.069946478891,-283.073597037919,-83.5303692442006,-416.311120545886,-19.1476579913877,-459.281124175132,-290.59299957885,-389.306947064866,-46.3709452328981,-603.308445232898,-516.253492438533,-538.150095912725,-209.44364310463,-105.936583382617,-431.676326882449,-241.437934854603,-140.973639475384,-404.473639475384,-612.5342640972,-106.800012454168,-547.645861774341,-578.370945232898,-277.003492438533,-660.474341758706,-298.167107274661,-377.900965526658,-424.38648469079,-105.904953753323,-47.5114846907896,-345.620945232898,-359.205477562277,-569.382704170014,-435.231019582681,-623.503492438533,-462.454163133996,-659.33643835387,-198.241903461979,-32.9026877394116,-109.347855267008,-408.09299957885,-119.323597037919,-471.060813995327,-689.902687739412,-207.418519582681,-224.088465526658,-279.158906542408,-126.757348055174,-404.764320427989,-66.3111205458861,-58.5554673035186,-261.027687739412,-464.854607274661,-228.5342640972,-313.404953753323,-142.311583382617,-617.459040675963,-260.821946169652,-304.349341758706,-242.004267726446,-152.806947064866,-477.066012795515,-165.531124175132,-635.152687739412,-444.775965526658,-165.531124175132,-277.588465526658,-158.416481061544,-13.937934854603,-321.533906542408,-511.168519582681,-31.000434854603,-315.531124175132,-378.556947064866,-528.069946478891,-90.3079806238176,-238.530369244201,-165.482886242465,-741.931514524305,-597.639082087356,-147.669834010962,-418.76148469079,-109.401481956758,-102.004267726446,-163.382704170014,-117.463981956758,-673.392548555772,-380.115609736654,-415.607886242465,-131.306947064866,-132.473639475384,-520.511097037919,-317.004267726446,-186.614505784071,-546.680467303519,-69.7491204263221,-357.228694867967,-94.73594973086,-391.953862232757,-364.0048901589,-83.9203862424653,-59.1142641598076,-195.0673901589,-644.870945232898,-229.194848055174,-615.667107274661,-736.311120545886,-109.281124175132,-230.522657991388,-275.894917469519,-15.3624138402736,-420.090503815523,-31.6677954898248,-185.132704170014,-316.030369244201,-13.5851579913878,-670.862413840274,-290.705048555772,-67.6078862424653,-318.667795489825,-406.241903461978,-170.041174510985,-434.402687739412,-371.781124175132,-309.862413840274,-174.973639475384,-167.669670868008,-516.518759910664,-67.2839065424075,-359.392548555772,-449.682980623818,-28.5342640972003,-496.92344973086,-152.806947064866,-119.812534470742,-153.330048555772,-242.973639475384,-119.979575113856,-219.397657991388,-59.1142641598076,-56.3111205458861,-491.588465526658,-358.19364310463,-217.525095912725,-591.854607274661,-371.573699328093,-378.055467303519,-675.000034470742,-444.959040675963,-670.194651938511,-46.3111205458861,-64.4736394753838,-92.3863215478356,-251.455048555772,-210.83643835387,-505.435813995327,-143.838465526658,-223.448699328093,-29.5448340109624,-438.088465526658,-639.520861774341,-246.584040675963,-360.854575113856,-243.846406542408,-13.8268204279892,-387.597855267008,-110.821946169652,-73.8428692442006,-578.514320427989,-409.900095912725,-208.533906542408,-126.741903461979,-191.205477562277,-288.222855267008,-308.770861774341,-61.1390820873558,-507.667795489825,-193.011097037919,-375.654953753323,-243.362413840274,-275.429345206447,-232.729575113856,-171.167107274661,-231.916174510985,-108.5342640972,-602.925012454168,-12.6514819567582,-499.098802618338,-426.245480623818,-197.147657991388,-207.104575113856,-140.614505784071,-124.900095912725,-690.125659067024,-577.36094973086,-23.7776877394116,-19.1476579913877,-278.84299957885,-363.203862232757,-606.311120545886,-50.8160127955149,-254.6923901589,-64.8536745109853,-308.741903461978,-271.904953753323,-409.408957546642,-560.104607274661,-312.061583382617,-334.027687739412,-482.704163133996,-332.495480623818,-172.363454561169,-121.781124175132,-510.895861774341,-475.680467303519,-374.666194867967,-288.222855267008,-401.88648469079,-270.900965526658,-776.311120545886,-165.055467303519,-272.864505784071,-199.889082087356,-347.33643835387,-43.556514524305,-98.1390820873558,-442.449110005747,-419.708673844279,-8.82194616965205,-80.8560195826815,-444.667795489825,-21.613454561169,-271.056947064866,-18.2038622327566,-124.903813435292,-157.667795489825,-626.550012454168,-165.838981956758,-671.639082087356,-493.430467303519,-257.935813995327,-48.062934854603,-699.027687739412,-15.9550485557716,-77.004267726446,-129.365609736654,-506.473639475384,-200.408957546642,-626.084040675963,-692.625034470742,-222.276481956758,-151.954163133996,-193.403813435292,-542.891362232757,-25.5864383538704,-378.749083382617,-15.244014524305,-569.073699328093,-411.136321547836,-274.972855267008,-445.425012454168,-11.2491204263221,-476.311120545886,-161.770861774341,-198.474341758706,-395.495945232898,-494.011321547836,-76.3054673035186,-156.239264159808,-143.838465526658,-119.06406537289,-154.583673844279,-582.738454561169,-201.98594973086,-79.0833617743412,-108.5342640972,-509.794670868008,-357.426764159808,-106.973639475384,-324.805467303519,-165.416194867967,-529.155369244201,-426.245480623818,-210.854607274661,-209.44364310463,-320.139082087356,-287.146173844279,-425.71799957885,-117.463981956758,-442.694651938511,-292.5342640972,-445.364505784071,-34.8493417587063,-629.293519582681,-191.598802618338,-666.431514524305,-47.004267726446,-41.5988026183378,-701.437534470742,-34.0988026183378,-607.003492438533,-445.875034470742,-559.686620426322,-87.2534924385335,-375.639082087356,-80.4390653728903,-116.279953753323,-531.209040675963,-249.556947064866,-178.741903461979,-143.955477562277,-117.886321547836,-147.978694867967,-61.4679995788499,-480.632348055174,-431.598802618338,-696.311120545886,-595.889320427989,-445.370945232898,-583.069848055174,-149.416481061544,-73.6677954898248,-40.1946519385106,-204.801764159808,-262.495945232898,-34.2811241751318,-244.980856439727,-316.832273316387,-261.267548555772,-113.81864310463,-468.426326882449,-624.613454561169,-405.886097037919,-170.528003815523,-412.120945232898,-96.7811241751318,-94.0554673035186,-192.769917469519,-243.187534470742,-496.261610005747,-335.175012454168,-229.194848055174,-295.900095912725,-375.375034470742,-78.4196708680084,-152.647657991388,-265.531124175132,-380.241903461978,-651.862413840274,-143.801326882449,-232.982334010962,-528.516362232757,-242.604607274661,-96.7179995788499,-221.416481061544,-329.332417469519,-439.098802618338,-351.823699328093,-675.293356439727,-520.183445232898,-444.959040675963,-321.00614310463,-130.846406542408,-226.864505784071,-244.566012795515,-217.400965526658,-195.806947064866,-464.918356439727,-347.416481061544,-539.066012795515,-19.625434854603,-31.9714065424075,-324.011097037919,-388.636610005747,-285.253492438533,-550.54844973086,-249.482170868008,-205.083673844279,-260.503492438533,-54.0993417587063,-288.775095912725,-20.3546072746613,-477.741903461978,-376.003492438533,-271.082273316387,-662.000659067024,-223.944651938511,-337.59299957885,-254.370480623818,-183.908957546642,-168.301326882449,-263.897657991388,-142.364264159808,-290.667795489825,-401.198699328093,-348.5342640972,-516.392548555772,-408.522657991388,-626.416481061544,-341.222855267008,-106.18906537289,-374.666194867967,-163.382704170014,-438.473639475384,-221.972855267008,-589.098802618338,-628.323699328093,-303.029953753323,-316.030369244201,-543.764320427989,-155.46799957885,-648.257348055174,-203.416481061544,-339.482886242465,-77.9720606186993,-199.780369244201,-37.5411948679666,-119.882704170014,-531.713465526658,-258.875659067024,-135.561620426322,-410.224341758706,-583.474341758706,-214.238454561169,-344.544834010962,-257.971406542408,-516.253492438533,-250.542107274661,-212.229575113856,-134.573699328093,-171.229575113856,-214.238454561169,-137.004267726446,-361.973639475384,-648.073699328093,-431.275095912725,-312.323699328093,-92.0143204279892,-121.557980623818,-626.444651938511,-411.31864310463,-483.875659067024,-503.558445232898,-290.114505784071,-685.507348055174,-53.3545751138556,-122.113454561169,-286.937934854603,-657.79844973086,-251.761321547836,-105.066012795515,-63.5446708680084,-559.198699328093,-373.632704170014,-204.644917469519,-197.488454561169,-440.676764159808,-232.143759910664,-160.499083382617,-192.004267726446,-200.978674510985,-17.4795751138556,-503.949110005747,-639.326820427989,-513.959040675963,-222.276481956758,-471.781124175132,-143.838465526658,-306.104607274661,-308.5342640972,-412.973639475384,-374.155369244201,-210.83643835387,-386.272657991388,-454.58643835387,-385.457273316387,-273.48594973086,-216.293356439727,-143.955477562277,-440.180467303519,-403.728694867967,-699.389082087356,-446.583361774341,-255.209040675963,-371.382446478891,-71.0411745109853,-394.954163133996,-435.08643835387,-562.7548901589,-187.605856439727,-376.362413840274,-371.382446478891,-341.241903461978,-97.0226579913877,-613.312534470742,-92.9358139953275,-217.301326882449,-354.780369244201,-389.43906537289,-256.666174510985,-452.694848055174,-293.973639475384,-662.416481061544,-320.078862232757,-104.948699328093,-483.2548901589,-198.088981956758,-235.222855267008,-266.698597037919,-129.333673844279,-82.9319470648664,-657.375034470742,-394.139082087356,-46.3709452328981,-591.473639475384,-292.004267726446,-766.349341758706,-492.578862232757,-97.2663622327566,-264.357170868008,-292.004267726446,-74.8219461696521,-71.5988026183378,-48.6696708680084,-344.98594973086,-357.990609736654,-374.715503815523,-508.5342640972,-132.83643835387,-271.555467303519,-395.362413840274,-449.369014524305,-317.244014524305,-607.729607274661,-143.801326882449,-194.821946169652,-141.958673844279,-132.916174510985,-77.004267726446,-699.389082087356,-364.864505784071,-442.144917469519,-537.805467303519,-83.9446519385106,-42.9448480551744,-698.974341758706,-66.2086738442786,-208.099341758706,-424.332417469519,-402.775095912725,-251.436583382617,-91.4601579913877,-357.669834010962,-264.511321547836,-578.514320427989,-234.473639475384,-178.686583382617,-756.311120545886,-22.1538134352918,-430.261321547836,-320.683445232898,-286.43906537289,-569.636097037919,-337.58643835387,-315.584040675963,-97.004267726446,-387.597855267008,-535.076820427989,-225.217453753323,-535.903813435292,-141.457273316387,-542.667795489825,-64.5864383538703,-595.687534470742,-305.75156537289,-367.806947064866,-67.2839065424075,-167.362413840274,-555.555467303519,-163.988454561169,-391.835157991388,-460.543519582681,-53.1589065424075,-491.639320427989,-398.642548555772,-528.651481956758,-340.531124175132,-378.031124175132,-377.542107274661,-561.448597037919,-648.909560618699,-141.655369244201,-199.780369244201,-402.31406537289,-27.8079806238176,-89.2750959127254,-380.205477562277,-25.6327041700135,-368.853694867967,-227.503492438534,-295.472060618699,-13.4736394753838,-155.854575113856,-376.316012795515,-357.750034470742,-37.9358139953275,-263.561583382617,-11.4821708680084,-171.229575113856,-327.266362232757,-362.249120426322,-108.50614310463,-230.988454561169,-423.728674510985,-196.5342640972,-680.416481061544,-447.37656537289,-42.004267726446,-677.834040675963,-184.562934854603,-12.004267726446,-92.0699464788907,-288.051764159808,-288.83643835387,-284.275965526658,-115.027687739412,-362.099341758706,-345.926326882449,-540.473639475384,-253.031124175132,-61.4319470648664,-117.463981956758,-304.338465526658,-341.207417469519,-83.5303692442006,-240.08643835387,-115.607170868008,-385.01148469079,-223.448699328093,-329.332417469519,-48.9446519385106,-35.0928692442006,-10.5517641598076,-313.687534470742,-275.429345206447,-499.098802618338,-690.125659067024,-384.59299957885,-105.363454561169,-452.821946169652,-464.821946169652,-630.784560618699,-330.132704170014,-91.6866204263221,-48.7419034619785,-686.459040675963,-182.853694867967,-295.741903461978,-479.04844973086,-266.821946169652,-155.3173901589,-373.083361774341,-189.87656537289,-350.925012454168,-378.71799957885,-309.687934854603,-576.311120545886,-352.88114310463,-352.900095912725,-97.0226579913877,-412.973639475384,-327.088981956758,-482.301764159808,-468.615609736654,-164.5342640972,-97.2663622327566,-101.667795489825,-304.479575113856,-144.448699328093,-604.17344973086,-29.8478552670078,-737.000659067024,-386.097060618699,-343.213981956758,-109.401481956758,-242.821946169652,-285.107886242465,-57.4541631339957,-329.340503815523,-126.207273316387,-741.931514524305,-200.291194867967,-31.3645057840709,-188.027687739412,-107.240609736654,-258.479607274661,-79.4089575466417,-189.113454561169,-518.338465526658,-278.551326882449,-409.281124175132,-126.016362232757,-276.241903461978,-271.082273316387,-123.08643835387,-161.34299957885,-212.000659067024,-76.500434854603,-218.389082087356,-134.408957546642,-225.332273316387,-107.778813435292,-200.291194867967,-539.544670868008,-242.979575113856,-108.584040675963,-108.169670868008,-347.332273316387,-384.811583382617,-21.2534924385335,-27.8079806238176,-390.125659067024,-493.250659067024,-694.744014524305,-446.311120545886,-305.169834010962,-43.6549537533233,-41.2321708680084,-99.4795751138556,-217.707273316387,-55.2050485557716,-111.107886242465,-132.944946478891,-295.864505784071,-347.310813995327,-312.353674510985,-576.732170868008,-276.865609736654,-180.482334010962,-99.7515653728903,-400.847855267008,-96.988454561169,-574.473639475384,-15.3624138402736,-369.205048555772,-315.632704170014,-133.588981956758,-276.973639475384,-222.457417469519,-409.098802618338,-626.084040675963,-544.229607274661,-403.031124175132,-145.291174510985,-536.481019582681,-22.3340406759627,-124.698699328093,-457.561583382617,-701.437534470742,-378.033906542408,-188.666194867967,-412.528003815523,-231.014320427989,-480.862413840274,-422.935813995327,-96.2459452328981,-412.062934854603,-425.167107274661,-169.364505784071,-230.624120426322,-100.364505784071,-248.104575113856,-487.761097037919,-180.551326882449,-319.098802618338,-635.152687739412,-395.650095912725,-381.741845206447,-547.694651938511,-225.973639475384,-406.328862232757,-465.667795489825,-232.957273316387,-301.753492438533,-38.6677954898248,-656.311120545886,-158.181947064866,-524.113454561169,-399.221406542408,-71.6145057840708,-290.114505784071,-163.988454561169,-83.3268204279892,-94.0187599106643,-442.778003815523,-26.1156097366542,-321.408957546642,-107.778813435292,-272.459040675963,-41.4164810615439,-101.338981956758,-639.92344973086,-554.419670868008,-426.245480623818,-188.666194867967,-442.982334010962,-385.636321547836,-697.555467303519,-147.238454561169,-452.821946169652,-237.936620426322,-222.276481956758,-420.722855267008,-382.676326882449,-626.555467303519,-445.364505784071,-771.4423901589,-269.490609736654,-148.362413840274,-350.821946169652,-398.944651938511,-133.679345206447,-152.073597037919,-394.098802618338,-154.436583382617,-71.3756590670236,-141.522657991388,-366.382704170014,-472.473639475384,-134.459040675963,-39.7663622327566,-222.479575113856,-322.319848055174,-240.268759910664,-382.278003815523,-421.62656537289,-542.667795489825,-59.6677954898248,-291.328862232757,-387.507348055174,-428.704163133996,-609.806514524305,-85.7548901588997,-457.561583382617,-424.38648469079,-467.330048555772,-241.016362232757,-587.106019582681,-73.9089575466417,-644.870945232898,-308.397657991388,-299.090503815523,-330.364505784071,-254.931947064866,-426.245480623818,-179.582273316387,-48.8424537533233,-106.18906537289,-486.00156537289,-632.862413840274,-426.668356439727,-370.894917469519,-299.771173844279,-388.132704170014,-330.249083382617,-385.479607274661,-318.374120426322,-416.990609736654,-408.875659067024,-699.027687739412,-217.708673844279,-289.632446478891,-125.834040675963,-251.060813995327,-493.874120426322,-599.416481061544,-257.920386242465,-385.176764159808,-23.7041631339957,-86.5735970379187,-508.003492438533,-89.2935195826815,-530.864264159808,-119.862413840274,-532.768759910664,-188.904953753323,-388.801326882449]}

},{}],41:[function(require,module,exports){
module.exports={"x":[9,4.5,12.75,13,8.25,19.5,3.25,12.25,10.75,13.75,2.75,11.75,9,6.75,9.25,4.5,14.75,12,7.5,3.5,14.25,5,8.75,16,19,8,1.25,9.75,9.75,14.75,2,5,2.5,10.75,6,0.5,2,11.5,14,17,12.75,3.25,5.5,15.75,16.75,5,2.5,12.25,14.5,16.25,9.75,14.25,12.75,5.25,10.25,11.75,10.25,9.5,9,16,17.5,16.5,5.75,0.5,2.25,17,9.5,11.25,1.75,10.75,6.25,3.75,18.25,18,10.25,10.5,5.5,19.75,3.75,9.75,7,13,17.25,4.75,16.25,5.5,18.75,6,11.25,3.75,7.75,15.5,19,7.75,17.75,3.5,13.25,9.75,19,6,15.25,4,3.25,9.25,2.5,11.25,17.25,1,11,15.75,0.5,17,2.25,1.25,11,1.5,5.5,2.25,18.75,1.75,16.75,2,13.75,4.25,8.25,13,5.5,4.5,16,15,0.5,5.5,5.75,10,10.5,6.5,1.25,19.25,18,5.75,17,6,11,1.25,16,5,3.25,7.5,6,4.25,11.5,2,12.25,14,16.75,3.5,1.75,16.5,8.25,10.25,19,12.75,19.5,15.75,5.25,5,7,0.5,19,19.5,6.5,12.25,7.75,15.25,4.75,15.25,15.5,16.75,3.25,19.25,8.5,14.25,8.75,8.75,5.75,7.75,15.5,18.25,3.75,19,4,8,11.25,15.75,7.75,9.5,10.75,18.75,15.75,12.25,15.5,2.5,14.5,10.25,14.75,13,19.5,7.5,1.25,17.25,16.5,1,12,9.25,14.25,15.25,6.5,2.25,18.25,11.5,2,8.75,18.75,11.75,13,17.5,19.75,3.5,5.25,1.75,1.25,14.75,14.75,3.25,8,17.25,1,15.25,0.5,4.75,3.25,12.5,6.5,0.5,12.5,9.25,4.5,13,8,1.25,8,10.75,13.5,10.5,10,8.5,2.25,13,12,1.25,6.75,18.25,10,16.25,18,19,11.5,4.25,5,11,17.5,2.5,19,13.75,14.25,2.25,14.75,10.25,20,5.5,17.25,13.75,10.5,1.75,3.5,9.5,5.25,9.25,14.25,15,10.5,9.5,7.5,0.75,8.25,2.5,5.25,14.75,3,16,3.25,5.75,20,6.5,15.25,15,17.5,10,19.5,10.5,18.5,4.5,17.75,1.75,7.25,2.25,18.25,10.75,7.25,1.75,9.25,16.75,5.25,0.75,19.25,12.75,0.5,8.75,5.25,19,18.25,19.75,15.5,19.75,17.25,13,6,14,2.5,15.75,12.25,1,6,1.5,16.25,12.5,11.25,18.5,3,19,16.5,8.75,1,9.5,14.75,7.75,7.75,20,15.25,8,1.25,5.5,11.75,7.5,12.25,0.75,3,7,9.5,14.25,10.75,4.5,10,8.5,6,16.25,17,8,16.5,7.75,4,16.25,6.25,1.25,15.25,14.75,8.5,18.5,5.25,5.25,11.25,19.25,10,17.75,9.5,4.25,15.75,2.5,8,16.25,18,17.75,15.25,0.5,9.5,19.75,13.25,17,1.5,2.25,15.75,8.5,19.25,0.75,11,12.75,6.25,15,8.75,15.5,4.75,6.75,12.75,13.5,18.75,6.5,13,11,9.5,10.75,7,7,9,18.5,12.75,7.75,15.25,3.25,2,12.5,5.75,6,11.5,14.5,19.25,19.75,18,1.75,17.5,4,10,12,2.25,14.5,1.25,10.5,13.25,17,9.5,13.5,8,12,12.5,15.5,11.5,19.75,13.25,5.5,11.5,10,1.25,3.25,1,10.5,1.75,15.75,16.75,14,16.25,3.75,9,3.25,10.25,2.25,18,17.5,5.25,18.5,15.5,10.75,8.5,0.5,12.25,12.5,17,15.75,4.25,14,11.5,17.25,2.75,1,5.25,14,15.25,18.25,17,14.5,15.75,5.75,18.5,7,7.25,6.25,13.75,10.75,14,15.75,7.5,7.75,17,1.25,18.25,6.75,6.75,19.5,3.25,1.75,2.5,9,5.25,0.75,4,5.25,5.25,13.25,6.25,19,12.25,7.75,4,5.75,19.5,1,4.75,17,1,9.75,1.25,19,5.25,14,9,17,19,2.75,15.75,0.75,10.75,0.5,14.75,3.5,10.25,1,14.25,6,6.25,3.5,12.5,4.75,3.75,19.25,19,12.5,5,17.5,5.75,3.25,4.5,16,0.5,17.75,0.5,18.25,5,14,4.25,10.75,10.5,12.25,13.75,4.75,5,17.5,13.5,6.25,0.5,13.75,9,8,7.75,7.25,3.75,9.25,1.5,10,16.75,17.75,7.75,17.25,12,10.75,19.75,9.25,6.75,15.75,0.5,17,14,2.75,10.75,1,2.75,6,4,3,1.25,4.75,12.5,0.75,11.5,1,14.75,15.75,18.5,15,5,13,15.5,11.5,12.5,2,8.75,19.5,14.5,18,5,3.75,1.25,3.25,8.75,7.5,19,14,15,19.75,5.5,15.5,11.75,4.5,8.75,5.5,13.75,17.5,18,9.25,3.75,19,1,16,1,1.25,5.25,6.75,4,18,18.75,11,3.75,14.25,6.5,18.25,13,15.75,19.25,0.5,15.5,18.75,15,11.25,17.25,17,7,12,14.5,18.75,1.5,5,17.25,2.5,14.5,3.25,9.25,15,12.25,9.75,14.5,11.5,15,13,4.75,16.5,17.75,3.75,12.25,11.75,5.5,7.25,11,6.5,7.75,7.5,17.25,6,11.5,11.5,17.75,17.75,18.25,7.25,12.75,18,16,11.75,9.25,14.75,9.75,4.5,19,20,17.5,3.25,2,8.25,13,9.5,13.25,9.5,4.25,10.5,1,1.75,11,18,4.75,6.75,1.25,20,16.25,13.5,4.5,5.25,8.5,8,18.5,1.75,15.5,13.5,3.25,13.75,13.25,15.5,7.75,17.75,11.75,7.25,8.25,8,7.75,14,20,14.75,11,12.25,20,2.75,5.25,18.75,19.5,12.75,19.5,6,4.5,14,2.25,15.25,0.75,13,16.75,6.5,10.75,2,6.5,7.5,7.5,11.25,6.75,10,0.5,14.75,14.5,16.75,5,11.75,8.5,19,8.5,7.25,14,15.5,4.25,14,13.75,19.5,1.5,15.25,16,11,8.25,2.25,11.5,20,18.75,3.25,4.25,17.25,11.25,6,13.75,11,10.5,7.25,18.75,10.25,4,8,1.25,3.25,5,16.75,3.75,2.5,6.75,11.75,6.75,16.75,9.5,4.25,13.5,15.25,16.5,15.75,18.25,16.25,19,10,6.75,14.25,20,20,2,14,10,8,9.75,1,7.75,11,12.5,9.25,1.75,14.5,12,16.5,16,3,1.75,9.75,19,4.5,19.5,19.75,5,2,9.5,1,11,6,9.5,8.5,10.25,13,1.25,11.75,7.5,17,7.5,8.25,16.5,15.25,17,12.25,11.75,3.25,8.5,13.75,12,7.25,5,17.5,0.5,8,10.75,7.25,20,14.5,9,14.75,5,12.25,8.25,3,7.75,9.5,18.5,4.75,17.5,18.75,10.75,8.5,19.5,12.25,4,1.75,13.5,4,2.25,3.25,9.5,2.75,12.5,15.75,6.5,19.5,5.5,4.25,11.75,9.5,18.75,15.75,11.25,10.25,11.5,13,14,11.5,10,19.25,20,2,10,13,7.25,5,4,1.75,1.5,10.25,4.5,11.25,7.75,4.75,18.75,1.25,16.75,6,13.5,5.75,5,1.5,6.75,5.25,8,14,0.75,19.25,11.25,6.25,15,12],"lambda":[9,18.5,5.75,8.75,16,12.5,2.5,6,15,12.75,19,9.25,7.25,3.75,14,16.75,3.5,8.25,17.5,11.5,12.25,10.25,12.5,9.25,0.5,6.5,8.25,20,10.5,13.25,10.75,13.25,16,19.5,2.5,17.25,7.25,4.75,14.75,7.25,12.75,14,1.75,7,2.25,10.25,6.25,8.5,13.75,4.25,3.25,10.25,4.75,14.75,8.25,10.5,19,7.5,6,10,3.25,17,12.5,14,7,2.75,9.5,8.75,2.75,19,1.25,17.25,6.75,8.5,6.25,5,3.5,16.75,15,8.5,10,13,1.75,18.75,5.25,6,8.5,13.5,10.25,17.75,2.75,19,0.75,6,17.5,8.5,16,4.25,11.25,3.25,9,8.25,14.75,7.75,13.25,7.75,3.5,19.25,13.25,1.25,4.25,18.75,17.25,4.5,9.5,4.75,19,9,19.75,14.25,10,8.5,10,15.5,14.75,19,18,17.75,1.75,3.75,11,2,11.5,2.25,2.5,7,7,7,5,14,9,5.75,18.25,12.25,15,18.5,6.5,9,19.5,3,7.5,11,12.5,16.25,12,0.5,5.5,8.25,19.5,3.5,12.75,6.5,16,18.5,4.75,5.25,8.5,2.25,11.5,1.75,11.75,12,5,19,1.75,19.75,15.25,12.5,17.5,9.25,12.5,18.5,8.25,9.5,13.25,8.25,11,15,3.75,11.5,3.5,8,5.75,5.5,2,5.25,13.25,16.75,14.5,14.75,9,10,1.75,2.25,13,15.25,11.25,2.5,0.5,7.25,7.75,10.75,15.75,14.25,10,19.25,15.75,18.25,5.5,17.75,17.75,8.25,3.75,6.25,17.5,2.25,2,4.75,9.5,12,14.5,5.75,7.25,14.75,11.25,16.75,1.75,16.75,4.25,2,10,2.25,10.5,6,15.5,1.75,8.5,6.5,13.5,11.75,10.25,8.5,19.25,6.25,1.75,11.5,7.75,10.25,9.25,4,13.75,8.75,1,2.25,2,6.5,4.25,14.5,3,7,14.5,10.75,0.5,18.75,9,16.25,3.25,1.75,19.25,1,19.5,1.5,16.5,2,12.75,2,15.75,14.25,8.25,8,17,2.75,17.75,8,11.5,16.75,12,17,15.25,3.5,18.5,13.25,14.75,17.25,15,8.25,2.25,7.25,1,8.25,5.5,16.5,2.25,11.75,6.25,18.5,14.75,15.5,2.5,9.25,7,3.75,3.75,9.75,14.75,16.25,7.75,1,20,16.75,10.75,5.5,13,6.75,16.25,17.75,10.25,3.25,13.5,15.75,8.75,17.25,12.75,3.75,2,18.5,1.5,4,5.25,16.25,4.5,11,6.25,3,16.75,6.25,9.75,18,18,10.25,8,1.75,4.25,10.75,9.25,14.75,16.5,18,16,1.5,12.25,1.75,2.25,11.75,3.25,12.25,20,7.25,7.5,6,5.5,6,3,0.5,0.5,20,5.5,17.75,19.25,14.5,9.5,19.75,20,1,7,16.25,17.75,19.5,5.75,0.75,7.5,11,4,7.5,7.75,6.75,6,8.5,11,19.75,15.25,13.5,15.5,18.5,1,3.75,13.5,8,7.25,5.25,17.75,7.75,11.25,6.75,13.75,18.5,12.75,5.5,11.75,2,13,13.25,9.5,18.5,5,9.5,11.75,4.75,7,13.5,8.25,9.5,14,12.5,6.25,3.75,7.5,8.75,1,9.5,17.75,7,8.5,12.75,12,9,13.25,16,14,4.5,8.75,19,8.75,7,14,0.75,12,6,19,13,17,12.5,19,11.25,11.75,0.5,2.75,4.75,13.5,17,17,19.5,11.25,4,4.75,0.5,12.75,11.5,2.75,12.5,8,1.75,10.5,6.75,2,13.25,3,14,16.5,4,18,7.75,1.75,10.25,3,19.5,1.25,5.25,10,20,14.75,2.75,14.75,19.25,7.25,18.75,6,0.5,3,2.75,5.25,1.75,17.75,11,6,12.5,5.75,2.5,2.25,19.25,12.25,6.75,7.25,9,9.5,7,18.25,4.5,4,14.25,10.75,17.5,15.5,18.75,7.25,16.75,19.25,12,0.5,8.75,10.75,1,5.5,8.75,20,12.25,9.5,9.5,19.75,6.75,3,2.25,4,14.75,18.25,6,4.75,1.5,15.5,14.75,4.75,3,14.25,10.75,14.75,5.75,3,10.5,5.25,13,7.5,16.25,9.5,15.5,3.5,17,0.75,17,12.5,5.25,17.25,8.75,5,13.25,19.25,6.5,15.5,6.75,2.25,9.75,11.75,1.75,10.75,3,6.75,5.75,12,7.5,8,6.5,8,5,5.75,7,9.75,6.5,7.25,9.5,12.75,6.75,15.25,16.25,6.25,13,9,18.75,16,17.25,13.5,2,3.5,4.25,3.5,16.75,20,3.25,6.5,15.5,9.25,3.25,5.75,1,0.5,6,3.75,9.75,16.25,4.75,4.75,8.75,16.75,10.5,15.75,9.75,8,5.5,6,2,7.25,10.5,2.5,6.25,7.5,8.75,13,16.75,8,10.25,0.75,6.5,5.75,7.25,11,1.75,8.25,5.5,12,9.25,12.5,0.75,6,12,15.75,5.5,11.25,16.75,9.25,4.75,3,10.25,9.25,19.25,3,1,0.5,5.5,12.25,15.75,1.75,10.25,18.25,12.25,7,19.25,14.5,17.5,13.5,17.5,15.25,4.25,5.5,7,18.5,13,10,5.5,19.75,12,20,1.25,13,15,17.25,4.5,17.5,16.5,2.25,12.5,5,5.25,11.75,11.75,9.5,12,13,6,16.5,11.25,8.25,19.75,1.75,8.5,8.75,9.5,11.75,18.75,10.75,4,5,6.5,17.75,7.5,2.5,17.25,4.25,6.25,1.25,17,4.5,13.25,10.25,16,7.5,3.5,11.5,1.75,11,8.25,11.5,2.75,20,3,14.25,7.5,16.75,11.25,4.75,13,17.5,4.25,4.75,16.25,9.5,1,4,5.75,0.75,7,14.25,5.75,13.5,3.25,8.5,18,5.75,9.25,8,3.75,14,10.75,18.75,10.25,14.75,16.75,4.25,5.25,12.75,14.25,19,3.75,5,8.5,3,14.5,14.75,15,9.5,1.75,16,13.75,10.5,7.5,14,5.5,14,0.75,0.5,10.5,12,17.25,0.75,12,20,4.25,11.5,16,18,15.25,18.5,16.75,20,16.5,15.5,11.75,14.25,3.75,5.5,1,11.5,8.25,16.5,15,1.75,8.25,10.5,2.5,5.5,2.5,13.25,13.25,6,4.25,13.75,12,18.5,14.5,15.5,8.5,2,11.5,4.75,18.75,11.5,3,11,19.25,19.75,8,16.5,3.5,15,11.5,11.75,14.75,14.5,6,8.75,16.5,9.25,6.5,15.25,15.25,17.75,4.5,8,8.25,1.25,16.25,1,5.25,1.5,9,2.25,12.5,13.5,14.5,1.75,18.75,14.75,1.75,16,11.25,14.25,19.5,7,3.75,8.75,8.5,7.5,5.75,14.5,13,18.25,19.25,17.25,3.75,5,17.25,8.75,9.25,10.25,8.25,7.75,12,3,3.75,12.25,20,17,15,4.5,10.5,8.75,15.75,18.75,15.75,3,6.75,19.25,9,3,14.75,0.5,15.25,1.75,12.25,16.5,9.25,11.25,1.5,10.75,14,10.75,16.75,16,11.5,2.25,10.5,13.25,15,2.75,10.5,8,3,9.25,0.75,12.75,2.75,2.75,3.25,12,3.5,12,7,5.25,10.25,14.5,11.75,13,5.5,13,18.25,11.75,20,15.75,5,5.5,10,9.75,15.25],"expected":[-78.8027754226638,-80.3322292679157,-71.5633001451907,-111.58094629963,-129.22741127776,-241.224271355692,-7.20870926812584,-71.7082405307719,-158.541949798898,-172.766968728396,-49.3055610208336,-106.462876448476,-63.2689985311334,-23.9907441600177,-126.860942670385,-72.5566017417289,-50.3722370315046,-96.8897867996534,-128.387799119071,-37.8076529646308,-172.056974063009,-48.9227222944156,-106.849271355692,-145.775376448476,-10.1931471805599,-50.1281978230984,-8.20228679965341,-192.004267726446,-100.023624742837,-192.853502447568,-19.1250942454263,-63.6660024475678,-37.2274112777602,-206.65458553443,-14.0837092681258,-5.77718785652263,-12.5189985311334,-53.0668553819535,-203.808756917214,-121.268998531133,-160.016968728396,-42.8609426703847,-9.06538421206458,-108.304089850945,-36.8765697837837,-48.9227222944156,-13.7924185362517,-101.984933836504,-196.753961175887,-67.6155810170637,-30.5088450036584,-143.735222294416,-59.0043553819535,-74.7462569172142,-82.4522867996534,-121.023624742837,-191.805561020834,-69.2350969794577,-52.2082405307719,-157.697414907006,-55.6963450036584,-277.666786655944,-69.3492713556917,-4.36094267038474,-13.8040898509447,-45.7383990883215,-87.9987082013935,-96.2684462996305,-3.80089908832152,-201.305561020834,-7.58935644868579,-61.8396878565226,-121.277957495116,-150.859933836504,-62.2299185362517,-50.8905620875659,-17.9972370315046,-327.994101741729,-53.5419497988978,-80.7349338365037,-67.6974149070059,-166.435050642538,-29.6278842120646,-86.1313062475836,-83.6542719233965,-31.2082405307719,-157.234933836504,-78.3973103145556,-112.985222294416,-63.6861144840786,-20.3008990883215,-291.555561020834,-14.5376820724518,-44.7082405307719,-307.762799119071,-27.6099338365037,-209.22741127776,-39.9905810170637,-211.32963187135,-18.3213450036584,-135.052775422664,-30.8897867996534,-45.2462569172142,-69.6398071566347,-30.5410024475678,-85.1398071566347,-59.1222370315046,-16.2924889392662,-143.166002447568,-19.4643564486858,-0.678081017063675,-315.818806247584,-35.9646878565226,-4.12092260322373,-102.248708201393,-5.56685538195345,-101.555561020834,-18.0527754226638,-367.329346508653,-22.2807430932853,-165.197414907006,-14.8599338365037,-135.197414907006,-63.1341599760748,-118.996256917214,-244.055561020834,-96.1096282421038,-76.9986144840786,-27.4403842120646,-54.9282441600177,-3.10210472720163,-10.3068528194401,-63.6826529646308,-21.6890697837837,-25.3337092681258,-43.5540898509447,-6.80408985094469,-132.804089850945,-88.3905620875659,-77.8609426703847,-150.802775422664,-32.7508001451907,-197.845834919972,-12.8069740630093,-237.291949798898,-89.5822292679157,-19.2531978230984,-65.3027754226638,-114.02958553443,-11.6513877113319,-84.2350969794577,-19.6021047272016,-150.599271355692,-224.711907091224,-198.515093350212,-2.44314718055995,-7.92025190776157,-134.014786799653,-157.90458553443,-34.6222370315046,-239.704468728396,-81.0031978230984,-309.22741127776,-288.457229267916,-23.3793553819534,-24.5917719233965,-57.3599338365037,-0.314069783783671,-216.057652964631,-33.5653842120646,-73.9111467594098,-144.515093350212,-37.1405620875659,-286.805561020834,-7.75288421206458,-298.204346508653,-233.650420496947,-206.849271355692,-54.0127991190705,-175.837876448476,-103.724271355692,-260.707229267916,-70.0772867996534,-80.8737082013935,-73.6035024475678,-61.8272867996534,-168.102104727202,-271.041949798898,-12.7407441600177,-216.057652964631,-12.7472370315046,-61.9205584583202,-62.9383001451907,-84.9202519077616,-14.8068528194401,-48.2167719233965,-139.853502447568,-311.244101741729,-225.700851350573,-177.996256917214,-137.302775422664,-22.697414907006,-24.8153842120646,-22.2515697837837,-189.185050642538,-195.525420496947,-216.95463187135,-17.8337092681258,-1.31814718055995,-123.081498531133,-125.827307156635,-8.37509424542633,-186.243159634728,-129.155743093285,-140.197414907006,-290.604988939266,-99.6181596347284,-38.1583349199715,-98.6702519077616,-201.248614484079,-32.6236144840786,-70.0772867996534,-68.9907441600177,-71.6049185362517,-224.637799119071,-38.5640697837837,-38.8068528194401,-15.0668553819535,-47.6237082013935,-18.515093350212,-15.4508513505735,-83.0633001451907,-104.956498531133,-45.2462569172142,-87.5796318713496,-286.119101741729,-1.19038421206458,-252.619101741729,-0.678081017063675,-8.80685281944005,-30.197414907006,-27.3140697837837,-65.8986247428365,-1.20824053077195,-191.009159976075,-15.6278842120646,-36.1099338365037,-82.6281978230984,-105.397310314556,-12.2236467594098,-79.6727222944156,-89.2349338365037,-256.917488939266,-63.7924185362517,-16.9403842120646,-95.3076529646308,-15.3898071566347,-130.922722294416,-108.775376448476,-3.61370563888011,-90.1914611758874,-157.51844629963,-10,-35.7515697837837,-35.3068528194401,-121.628197823098,-47.4280810170637,-58.9508513505735,-13.9013877113319,-75.0540898509447,-251.075851350573,-24.5000942454263,-10.1931471805599,-254.881306247584,-126.052775422664,-33.7744070912243,-46.7588450036584,-17.3778842120646,-382.042488939266,-5.5,-333.40458553443,-20.2195348918918,-170.446639619093,-2.80685281944005,-42.0794687283956,-18.3068528194401,-79.9306596347284,-129.155743093285,-115.452286799653,-117.92055845832,-175.666786655944,-25.1133990883215,-130.248614484079,-3.92055845832016,-92.4326529646308,-39.0566017417289,-60.515093350212,-247.916786655944,-43.0254204969466,-54.7472370315046,-57.2072292679157,-73.6035024475678,-292.308756917214,-109.277187856523,-226.041949798898,-121.639786799653,-38.5640697837837,-70.5189985311334,-19.5,-84.5147867996534,-100.045251907762,-71.4466396190935,-39.1265697837837,-18.0986467594098,-43.4799185362517,-38.7072292679157,-266.496256917214,-163.884159976075,-17.2087092681258,-13.9628764484757,-62.8040898509447,-61.4907441600177,-18.3657441600177,-5.03523271499024,-281.246256917214,-204.399407091224,-1.82730715663474,-8.75,-102.004267726446,-315.431601741729,-193.812594245426,-106.920251907762,-198.935050642538,-131.402957495116,-277.524407091224,-227.873614484079,-59.1727222944156,-44.3213450036584,-31.1473103145556,-245.305659634728,-105.01844629963,-14.4021878565226,-73.9544687283956,-4.30324416001768,-31.8068528194401,-228.332229267916,-16.4695348918918,-72.6137056388801,-14.0917719233965,-305.961907091224,-72.7459226032237,-93.8521047272016,-4.41741853625169,-27.4013877113319,-244.244101741729,-46.6049185362517,-73.2852327149902,-357.109628242104,-271.609628242104,-79.6727222944156,-7.92055845832016,-9.06538421206458,-48.4905810170637,-78.2500942454263,-111.087876448476,-8.37125691721417,-46.6966396190935,-123.109628242104,-149.22741127776,-20.9695348918918,-129.181974063009,-7.31538421206458,-21.6890697837837,-97.4111467594098,-18.3213450036584,-196.556974063009,-337.004267726446,-56.0189985311334,-121.735096979458,-44.7082405307719,-20.2952519077616,-95.7082405307719,-17.6513877113319,-1.31814718055995,-8.31814718055995,-292.004267726446,-45.0452519077616,-325.498614484079,-98.1049889392662,-73.4508513505735,-104.623708201393,-377.204346508653,-197.004267726446,-17.75,-64.5540898509447,-66.2744070912242,-276.686114484079,-45.7795855344303,-44.2508001451907,-12.4751820724518,-132.985096979458,-192.852104727202,-59.6137056388801,-1.73509697945774,-71.5773071566347,-131.402957495116,-77.7082405307719,-142.359933836504,-14.1021047272016,-41.4543465086529,-237.462920496947,-112.147310314556,-295.634159976075,-10.9572292679157,-11,-46.4907441600177,-81.7723103145556,-117.92055845832,-61.4564985311334,-79.7167719233965,-81.4361144840786,-50.2648071566347,-141.01713187135,-89.2154574951156,-255.191461175887,-117.332229267916,-163.204468728396,-58.7952519077616,-109.16114675941,-20.8068528194401,-88.4350506425385,-90.1660024475678,-83.2487082013935,-339.332229267916,-62.1405620875659,-71.3737082013935,-176.72364675941,-13.8793553819535,-12.0540898509447,-166.147310314556,-45.3272867996534,-54.7487082013935,-158.360942670385,-178.724271355692,-118.479918536252,-72.7407441600177,-132.985096979458,-13.1434462996305,-17.5,-35.7487082013935,-174.623614484079,-82.0540898509447,-16.9849338365037,-182.329468728396,-12.515093350212,-92.3027754226638,-172.978502447568,-269.22741127776,-130.360942670385,-59.2459226032237,-67.8309462996305,-225.055561020834,-107.20594629963,-106.554089850945,-158.360942670385,-15.1001820724518,-156.515093350212,-31.2082405307719,-215.555561020834,-127.435050642538,-18.4167866559438,-38.0992713556917,-16.0555610208336,-115.70463187135,-18.0986467594098,-8.56814718055995,-45.0508990883215,-64.9418553819534,-216.772310314556,-60.9167866559438,-150.166786655944,-60.4045855344303,-112.89213187135,-7.61370563888011,-83.9418553819534,-9.44314718055995,-64.3919687283956,-210.307652964631,-41.6133990883215,-131.849271355692,-65.9205584583202,-0.315384212064577,-126.273624742837,-82.4654574951156,-33.3068528194401,-206.103502447568,-11.6513877113319,-193.360942670385,-186.946639619093,-67.6137056388801,-46.6096282421038,-5.70230715663474,-8.62788421206458,-141.172722294416,-44.6513877113319,-352.90458553443,-21.0268564486858,-74.4667719233965,-155.197414907006,-112.004267726446,-270.183756917214,-18.2383990883215,-104.246256917214,-117.354988939266,-97.7064985311334,-198.631306247584,-82.2082405307719,-8.56814718055995,-21.4013877113319,-20.3008990883215,-87.5917719233965,-1.62788421206458,-321.061114484079,-71.8521047272016,-38.7082405307719,-241.224271355692,-16.9383001451907,-3.45870926812584,-4.81406978378367,-170.292488939266,-61.8069740630093,-3.15295749511556,-27.0189985311334,-45.0527754226638,-47.6237082013935,-90.8040898509447,-111.158334919971,-83.9959226032237,-47.6137056388801,-107.780743093285,-40.6250942454263,-97.7627991190705,-299.509159976075,-15.8188062475836,-32.4564985311334,-281.931601741729,-16.2924889392662,-114.515093350212,-1.31814718055995,-164.08094629963,-54.0625942454263,-14,-47.7952519077616,-146.58094629963,-377.004267726446,-31.1819740630093,-147.373708201393,-4.87370820139351,-209.329346508653,-1.46545749511556,-43.1513877113319,-7.06406978378367,-39.6137056388801,-12.0587569172142,-257.158334919971,-34.2082405307719,-28.1293553819534,-4.84453489189184,-191.009159976075,-67.3712569172142,-16.2543553819534,-56.6513877113319,-268.093243093285,-132.000094245426,-71.0587569172142,-98.8758001451907,-16.1513877113319,-31.7736247428365,-21.9667719233965,-205.435050642538,-1.73509697945774,-285.649407091224,-2.4987082013935,-280.134159976075,-16.2472370315046,-235.166786655944,-3.47518207245178,-179.916786655944,-128.724271355692,-62.6542719233965,-234.339687856523,-39.3934462996305,-23.3905620875659,-229.291002447568,-256.917488939266,-38.7531978230984,-5.0091599760748,-90.9029574951156,-19.4390697837837,-75.7227327149902,-88.5986467594098,-12.1278842120646,-37.9375942454263,-26.6513877113319,-8.21545749511556,-55.7508001451907,-198.515093350212,-131.110096979458,-59.9205584583202,-110.253197823098,-93.9205584583202,-52.1405620875659,-111.813300145191,-62.8040898509447,-63.5352327149902,-100.503197823098,-1.64399853113342,-159.248708201393,-175.954468728396,-16.6529574951156,-161.212920496947,-13.4619070912243,-15.3549185362517,-75.4350506425385,-33.8027754226638,-53.3188062475836,-17.2274112777602,-79.0896878565226,-166.147310314556,-0.806852819440055,-38.9972370315046,-2.80308101706367,-50.3722370315046,-260.994101741729,-367.004267726446,-47.5713450036584,-30.6281978230984,-198.759159976075,-141.150376448476,-36.1963450036584,-70.1258001451907,-2,-5.06814718055995,-115.208240530772,-53.0532441600177,-173.22273271499,-78.4619070912242,-16.2543553819534,-4.37935538195345,-26.2684462996305,-143.744101741729,-76.3986247428365,-296.493159634728,-134.22273271499,-117.92055845832,-106.920251907762,-31.2082405307719,-30.3068528194401,-83.2064985311334,-44.8986247428365,-20.9587092681258,-32.5424185362517,-101.110096979458,-150.95594629963,-231.435050642538,-152.119101741729,-27.9205584583202,-192.422722294416,-1.03768207245178,-102.128197823098,-4.00080014519074,-7.08149853113342,-55.3521047272016,-11.2528842120646,-30.8897867996534,-97.2952519077616,-222.515093350212,-99.5253764484757,-44.3492713556917,-10.9751820724518,-37.2082405307719,-216.515093350212,-201.993159634728,-84.9202519077616,-214.14213187135,-5.55660174172892,-141.150376448476,-87.5043553819534,-43.9013877113319,-112.985222294416,-157.337876448476,-324.292488939266,-19.9013877113319,-12,-7.94314718055995,-101.420251907762,-15.8694740630093,-75.9931596347284,-29.6278842120646,-23.2977222944156,-261.720834919971,-37.3069740630093,-62.8040898509447,-285.792488939266,-174.950851350573,-167.762799119071,-193.147310314556,-198.387799119071,-226.025420496947,-53.8030810170637,-24.4202519077616,-113.554089850945,-325.457229267916,-46.1850506425385,-120.197414907006,-62.9202519077616,-105.641846508653,-84.515093350212,-217.004267726446,-7.90185644868579,-98.1850506425385,-109.791949798898,-294.714687856523,-25.4959226032237,-198.387799119071,-186.946639619093,-39.1265697837837,-219.349271355692,-89.6405620875659,-36.4042719233965,-147.34864675941,-209.03614675941,-149.748708201393,-138.515093350212,-117.685050642538,-86.7082405307719,-158.071639619093,-48.2046318713496,-154.639786799653,-392.016846508653,-30.0653842120646,-25.4849338365037,-15.3309462996305,-76.1237082013935,-150.28614675941,-175.193806247584,-140.062594245426,-36.6137056388801,-19.6405620875659,-66.3781978230984,-14.8736144840786,-11.1100969794577,-26.5837092681258,-307.652187856523,-18.7405810170637,-40.3549185362517,-1.33935644868579,-337.166786655944,-71.6209226032237,-176.291002447568,-43.7977222944156,-81.2274112777602,-61.7350969794577,-26.7472370315046,-210.307652964631,-2.50288421206458,-168.102104727202,-109.264786799653,-34.9326529646308,-36.8008990883215,-262.004267726446,-45.4013877113319,-107.780743093285,-131.110096979458,-193.994101741729,-79.1421318713496,-37.6293553819535,-101.435050642538,-132.762799119071,-58.0530810170637,-93.4418553819534,-236.899407091224,-102.248708201393,-12.25,-78.6137056388801,-14.0633001451907,-4.22518207245178,-129.304089850945,-275.218243093285,-71.5633001451907,-260.647310314556,-18.3213450036584,-36.1099338365037,-249.109628242104,-11.1883001451907,-138.837876448476,-3.92055845832016,-47.4282441600177,-231.860942670385,-67.5000942454263,-198.631306247584,-18.1727222944156,-93.1837569172142,-122.806601741729,-30.4280810170637,-57.4042719233965,-83.5169687283956,-139.843243093285,-6.55556102083356,-53.9907441600177,-70.8905620875659,-140.234933836504,-13.9013877113319,-167.700851350573,-122.683756917214,-282.291949798898,-78.4987082013935,-12.1278842120646,-221.22741127776,-210.503961175887,-42.2736247428365,-102.985096979458,-189.860942670385,-105.545251907762,-18.3609426703847,-11.7251820724518,-8.69314718055995,-113.148624742837,-96.515093350212,-35.9646878565226,-8.91268207245178,-237.515093350212,-372.004267726446,-12.3655810170637,-46.4326529646308,-273.22741127776,-199.609628242104,-88.7754204969466,-251.457229267916,-181.431601741729,-207.004267726446,-116.821639619093,-287.884159976075,-117.97364675941,-54.3432430932853,-28.6782441600177,-5.17025190776157,-3.25,-55.0576529646308,-136.077286799653,-59.0716396190935,-34.7919497988978,-11.2528842120646,-94.8272867996534,-68.5236247428365,-40.9587092681258,-50.5452519077616,-9.70870926812585,-176.291002447568,-199.478502447568,-97.2082405307719,-65.4905810170637,-248.316461175887,-192.515093350212,-348.582229267916,-142.325851350573,-101.884159976075,-118.984933836504,-39.3068528194401,-227.557652964631,-7.94185538195345,-259.568806247584,-112.557652964631,-22.9013877113319,-104.852104727202,-16.2924889392662,-150.079346508653,-85.9205584583202,-203.446639619093,-31.1222370315046,-23.5419497988978,-164.307652964631,-138.53614675941,-240.683756917214,-229.325851350573,-16.2082405307719,-13.1434462996305,-158.071639619093,-173.525376448476,-27.3781978230984,-294.650420496947,-298.462920496947,-85.8736144840786,-7.49592260322373,-73.9205584583202,-6.13978679965341,-13.5268564486858,-94.7119070912242,-9.5,-42.9667719233965,-14.9695348918918,-114.802775422664,-2.00156978378367,-144.349271355692,-98.6473103145556,-243.825851350573,-12.5653842120646,-151.756306247584,-240.683756917214,-26.1278842120646,-269.22741127776,-135.39213187135,-164.780743093285,-60.4045855344303,-57.5540898509447,-50.2407441600177,-102.83094629963,-59.4849338365037,-35.4850969794577,-98.8758001451907,-4.57585135057347,-101.435050642538,-193.283334919972,-136.604988939266,-342.152187856523,-53.0532441600177,-43.3905620875659,-251.589687856523,-41.5809462996305,-111.087876448476,-82.2352222944156,-22.6397867996534,-58.0148071566347,-111.515093350212,-54.4013877113319,-16.4907441600177,-211.869474063009,-372.004267726446,-179.916786655944,-124.791949798898,-86.2459226032237,-126.273624742837,-32.8309462996305,-24.8056596347284,-250.193806247584,-60.2431596347284,-5.65138771133189,-20.0279574951156,-179.917488939266,-22.5527754226638,-36.4013877113319,-229.621256917214,-3.94314718055995,-294.650420496947,-9.06538421206458,-49.5569740630093,-191.071639619093,-85.6503764484757,-208.51713187135,-23.2195348918918,-118.562594245426,-140.860942670385,-121.250094245426,-214.931601741729,-221.22741127776,-129.807652964631,-21.6890697837837,-199.773624742837,-262.416002447568,-27.2919497988978,-26.4883990883215,-134.148624742837,-55.9205584583202,-13.9013877113319,-34.7753764484757,-1.60018207245178,-16.5794687283956,-27.1758990883215,-11.3633990883215,-35.3838450036584,-90.515093350212,-15.3722370315046,-222.515093350212,-6.80408985094469,-86.2792719233965,-59.1727222944156,-193.075851350573,-65.0986467594098,-62.4350506425385,-6.54525190776157,-85.1850506425385,-92.9083349199715,-91.5361467594098,-277.004267726446,-9.05565963472836,-94.6405620875659,-60.1702519077616,-60.197414907006,-143.97273271499,-180.275420496947]}

},{}],42:[function(require,module,exports){
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

var smallSmall = require( './fixtures/r/small_small.json' );
var smallLarge = require( './fixtures/r/small_large.json' );
var largeSmall = require( './fixtures/r/large_small.json' );
var largeLarge = require( './fixtures/r/large_large.json' );


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

	logpdf = factory( 1.0 );
	y = logpdf( NaN );
	t.equal( isnan( y ), true, 'returns NaN' );

	logpdf = factory( NaN );
	y = logpdf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'if provided a finite `lambda`, the function returns a function which returns `-Infinity` when provided `Infinity` for `x`', function test( t ) {
	var logpdf;
	var y;

	logpdf = factory( 1.0 );
	y = logpdf( PINF );
	t.equal( y, NINF, 'returns -Infinity' );

	t.end();
});

tape( 'if provided a finite `lambda`, the function returns a function which returns `-Infinity` when provided `-Infinity` for `x`', function test( t ) {
	var logpdf;
	var y;

	logpdf = factory( 1.0 );
	y = logpdf( NINF );
	t.equal( y, NINF, 'returns -Infinity' );

	t.end();
});

tape( 'if provided `+infinity` for `lambda`, the function returns a function which returns `NaN` for any `x`', function test( t ) {
	var logpdf;
	var y;

	logpdf = factory( PINF );

	y = logpdf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = logpdf( NaN );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = logpdf( PINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = logpdf( NINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'if provided a negative `lambda`, the created function always returns `NaN`', function test( t ) {
	var logpdf;
	var y;

	logpdf = factory( -1.0 );

	y = logpdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = logpdf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'the created function evaluates the logpdf for `x` given parameter `lambda` (when `x` and `lambda` are small)', function test( t ) {
	var expected;
	var logpdf;
	var lambda;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	expected = smallSmall.expected;
	x = smallSmall.x;
	lambda = smallSmall.lambda;
	for ( i = 0; i < x.length; i++ ) {
		logpdf = factory( lambda[i] );
		y = logpdf( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+'. lambda: '+lambda[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 30.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. lambda: '+lambda[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the function evaluates the logpdf for `x` given parameter `lambda` (when `x` is large and `lambda` small)', function test( t ) {
	var expected;
	var logpdf;
	var lambda;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	expected = largeSmall.expected;
	x = largeSmall.x;
	lambda = largeSmall.lambda;
	for ( i = 0; i < x.length; i++ ) {
		logpdf = factory( lambda[i] );
		y = logpdf( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+'. lambda: '+lambda[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 22.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. lambda: '+lambda[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the function evaluates the logpdf for `x` given parameter `lambda` (when `x` is small and `lambda` large)', function test( t ) {
	var expected;
	var logpdf;
	var lambda;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	expected = smallLarge.expected;
	x = smallLarge.x;
	lambda = smallLarge.lambda;
	for ( i = 0; i < x.length; i++ ) {
		logpdf = factory( lambda[i] );
		y = logpdf( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+'. lambda: '+lambda[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 22.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. lambda: '+lambda[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the function evaluates the logpdf for `x` given parameter `lambda` (when `x` and `lambda` are large)', function test( t ) {
	var expected;
	var logpdf;
	var lambda;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	expected = largeLarge.expected;
	x = largeLarge.x;
	lambda = largeLarge.lambda;
	for ( i = 0; i < x.length; i++ ) {
		logpdf = factory( lambda[i] );
		y = logpdf( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+'. lambda: '+lambda[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 30.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. lambda: '+lambda[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

}).call(this,"/lib/node_modules/@stdlib/math/base/dists/exponential/logpdf/test/test.factory.js")
},{"./../lib/factory.js":35,"./fixtures/r/large_large.json":38,"./fixtures/r/large_small.json":39,"./fixtures/r/small_large.json":40,"./fixtures/r/small_small.json":41,"@stdlib/constants/math/float64-eps":26,"@stdlib/constants/math/float64-ninf":28,"@stdlib/constants/math/float64-pinf":29,"@stdlib/math/base/assert/is-nan":33,"@stdlib/math/base/special/abs":46,"tape":136}],43:[function(require,module,exports){
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

}).call(this,"/lib/node_modules/@stdlib/math/base/dists/exponential/logpdf/test/test.js")
},{"./../lib":36,"tape":136}],44:[function(require,module,exports){
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

var smallSmall = require( './fixtures/r/small_small.json' );
var smallLarge = require( './fixtures/r/small_large.json' );
var largeSmall = require( './fixtures/r/large_small.json' );
var largeLarge = require( './fixtures/r/large_large.json' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.equal( typeof logpdf, 'function', 'main export is a function' );
	t.end();
});

tape( 'if provided `NaN` for any parameter, the function returns `NaN`', function test( t ) {
	var y = logpdf( NaN, 1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );
	y = logpdf( 0.0, NaN );
	t.equal( isnan( y ), true, 'returns NaN' );
	t.end();
});

tape( 'if provided `Infinity` for `x` and a finite `lambda`, the function returns `-Infinity`', function test( t ) {
	var y = logpdf( PINF, 1.0 );
	t.equal( y, NINF, 'returns -Infinity' );
	t.end();
});

tape( 'if provided `-Infinity` for `x` and a finite `lambda`, the function returns `-Infinity`', function test( t ) {
	var y = logpdf( NINF, 1.0 );
	t.equal( y, NINF, 'returns -Infinity' );
	t.end();
});

tape( 'if provided `+infinity` for `lambda`, the function returns `NaN`', function test( t ) {
	var y;

	y = logpdf( 0.0, PINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = logpdf( NaN, PINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = logpdf( PINF, PINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = logpdf( NINF, PINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'if provided a negative `lambda`, the function always returns `NaN`', function test( t ) {
	var y;

	y = logpdf( 2.0, -1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = logpdf( 0.0, -1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = logpdf( 2.0, NINF );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'the function evaluates the logpdf for `x` given parameter `lambda` (when `x` and `lambda` are small)', function test( t ) {
	var expected;
	var lambda;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	expected = smallSmall.expected;
	x = smallSmall.x;
	lambda = smallSmall.lambda;
	for ( i = 0; i < x.length; i++ ) {
		y = logpdf( x[i], lambda[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+'. lambda: '+lambda[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[i] );
			tol = 30.0 * EPS * abs( expected[i] );
			t.strictEqual( delta <= tol, true, 'within tolerance. x: '+x[i]+'.  lambda: '+lambda[i]+'. y: '+y+'. Expected: '+expected[i]+'. tol: '+tol+'. delta: '+delta+'.' );
		}
	}
	t.end();
});

tape( 'the function evaluates the logpdf for `x` given parameter `lambda` (when `x` is large and `lambda` small)', function test( t ) {
	var expected;
	var lambda;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	expected = largeSmall.expected;
	x = largeSmall.x;
	lambda = largeSmall.lambda;
	for ( i = 0; i < x.length; i++ ) {
		y = logpdf( x[i], lambda[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+'. lambda: '+lambda[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[i] );
			tol = 22.0 * EPS * abs( expected[i] );
			t.strictEqual( delta <= tol, true, 'within tolerance. x: '+x[i]+'.  lambda: '+lambda[i]+'. y: '+y+'. Expected: '+expected[i]+'. tol: '+tol+'. delta: '+delta+'.' );
		}
	}
	t.end();
});

tape( 'the function evaluates the logpdf for `x` given parameter `lambda` (when `x` is small and `lambda` large)', function test( t ) {
	var expected;
	var lambda;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	expected = smallLarge.expected;
	x = smallLarge.x;
	lambda = smallLarge.lambda;
	for ( i = 0; i < x.length; i++ ) {
		y = logpdf( x[i], lambda[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+'. lambda: '+lambda[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[i] );
			tol = 22.0 * EPS * abs( expected[i] );
			t.strictEqual( delta <= tol, true, 'within tolerance. x: '+x[i]+'.  lambda: '+lambda[i]+'. y: '+y+'. Expected: '+expected[i]+'. tol: '+tol+'. delta: '+delta+'.' );
		}
	}
	t.end();
});

tape( 'the function evaluates the logpdf for `x` given parameter `lambda` (when `x` and `lambda` are large)', function test( t ) {
	var expected;
	var lambda;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	expected = largeLarge.expected;
	x = largeLarge.x;
	lambda = largeLarge.lambda;
	for ( i = 0; i < x.length; i++ ) {
		y = logpdf( x[i], lambda[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+'. lambda: '+lambda[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[i] );
			tol = 30.0 * EPS * abs( expected[i] );
			t.strictEqual( delta <= tol, true, 'within tolerance. x: '+x[i]+'.  lambda: '+lambda[i]+'. y: '+y+'. Expected: '+expected[i]+'. tol: '+tol+'. delta: '+delta+'.' );
		}
	}
	t.end();
});

}).call(this,"/lib/node_modules/@stdlib/math/base/dists/exponential/logpdf/test/test.logpdf.js")
},{"./../lib":36,"./fixtures/r/large_large.json":38,"./fixtures/r/large_small.json":39,"./fixtures/r/small_large.json":40,"./fixtures/r/small_small.json":41,"@stdlib/constants/math/float64-eps":26,"@stdlib/constants/math/float64-ninf":28,"@stdlib/constants/math/float64-pinf":29,"@stdlib/math/base/assert/is-nan":33,"@stdlib/math/base/special/abs":46,"tape":136}],45:[function(require,module,exports){
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

},{}],46:[function(require,module,exports){
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

},{"./abs.js":45}],47:[function(require,module,exports){
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

},{"./ln.js":48}],48:[function(require,module,exports){
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

},{"./polyval_p.js":49,"./polyval_q.js":50,"@stdlib/constants/math/float64-exponent-bias":27,"@stdlib/constants/math/float64-ninf":28,"@stdlib/math/base/assert/is-nan":33,"@stdlib/number/float64/base/get-high-word":52,"@stdlib/number/float64/base/set-high-word":55}],49:[function(require,module,exports){
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

},{}],50:[function(require,module,exports){
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

},{}],51:[function(require,module,exports){
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

},{"@stdlib/assert/is-little-endian":18}],52:[function(require,module,exports){
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

},{"./main.js":53}],53:[function(require,module,exports){
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

},{"./high.js":51,"@stdlib/array/float64":2,"@stdlib/array/uint32":7}],54:[function(require,module,exports){
arguments[4][51][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":18,"dup":51}],55:[function(require,module,exports){
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

},{"./main.js":56}],56:[function(require,module,exports){
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

},{"./high.js":54,"@stdlib/array/float64":2,"@stdlib/array/uint32":7}],57:[function(require,module,exports){
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

},{}],58:[function(require,module,exports){
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

},{"./constant_function.js":57}],59:[function(require,module,exports){
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

},{}],60:[function(require,module,exports){
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

},{"./define_read_only_property.js":59}],61:[function(require,module,exports){
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

},{"./float64array.js":62,"@stdlib/assert/is-float64array":15}],62:[function(require,module,exports){
'use strict';

// EXPORTS //

module.exports = ( typeof Float64Array === 'function' ) ? Float64Array : null;

},{}],63:[function(require,module,exports){
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

},{"./detect_float64array_support.js":61}],64:[function(require,module,exports){
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

},{}],65:[function(require,module,exports){
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

},{"./detect_symbol_support.js":64}],66:[function(require,module,exports){
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

},{"@stdlib/utils/detect-symbol-support":65}],67:[function(require,module,exports){
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

},{"./has_tostringtag_support.js":66}],68:[function(require,module,exports){
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

},{"./uint16array.js":70,"@stdlib/assert/is-uint16array":20,"@stdlib/constants/math/uint16-max":30}],69:[function(require,module,exports){
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

},{"./detect_uint16array_support.js":68}],70:[function(require,module,exports){
'use strict';

// EXPORTS //

module.exports = ( typeof Uint16Array === 'function' ) ? Uint16Array : null;

},{}],71:[function(require,module,exports){
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

},{"./uint32array.js":73,"@stdlib/assert/is-uint32array":22,"@stdlib/constants/math/uint32-max":31}],72:[function(require,module,exports){
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

},{"./detect_uint32array_support.js":71}],73:[function(require,module,exports){
'use strict';

// EXPORTS //

module.exports = ( typeof Uint32Array === 'function' ) ? Uint32Array : null;

},{}],74:[function(require,module,exports){
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

},{"./uint8array.js":76,"@stdlib/assert/is-uint8array":24,"@stdlib/constants/math/uint8-max":32}],75:[function(require,module,exports){
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

},{"./detect_uint8array_support.js":74}],76:[function(require,module,exports){
'use strict';

// EXPORTS //

module.exports = ( typeof Uint8Array === 'function' ) ? Uint8Array : null;

},{}],77:[function(require,module,exports){
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

},{"./native_class.js":78,"./polyfill.js":79,"@stdlib/utils/detect-tostringtag-support":67}],78:[function(require,module,exports){
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

},{"./tostring.js":80}],79:[function(require,module,exports){
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

},{"./tostring.js":80,"./tostringtag.js":81,"@stdlib/assert/has-own-property":14}],80:[function(require,module,exports){
'use strict';

// MAIN //

var toStr = Object.prototype.toString;


// EXPORTS //

module.exports = toStr;

},{}],81:[function(require,module,exports){
'use strict';

// MAIN //

var toStrTag = ( typeof Symbol === 'function' ) ? Symbol.toStringTag : '';


// EXPORTS //

module.exports = toStrTag;

},{}],82:[function(require,module,exports){
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

},{}],83:[function(require,module,exports){

},{}],84:[function(require,module,exports){
arguments[4][83][0].apply(exports,arguments)
},{"dup":83}],85:[function(require,module,exports){
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

},{}],86:[function(require,module,exports){
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

},{"base64-js":82,"ieee754":105}],87:[function(require,module,exports){
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
},{"../../is-buffer/index.js":107}],88:[function(require,module,exports){
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

},{"./lib/is_arguments.js":89,"./lib/keys.js":90}],89:[function(require,module,exports){
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

},{}],90:[function(require,module,exports){
exports = module.exports = typeof Object.keys === 'function'
  ? Object.keys : shim;

exports.shim = shim;
function shim (obj) {
  var keys = [];
  for (var key in obj) keys.push(key);
  return keys;
}

},{}],91:[function(require,module,exports){
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

},{"foreach":101,"object-keys":111}],92:[function(require,module,exports){
module.exports = function () {
    for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] !== undefined) return arguments[i];
    }
};

},{}],93:[function(require,module,exports){
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

},{"./helpers/isFinite":94,"./helpers/isNaN":95,"./helpers/mod":96,"./helpers/sign":97,"es-to-primitive/es5":98,"has":104,"is-callable":108}],94:[function(require,module,exports){
var $isNaN = Number.isNaN || function (a) { return a !== a; };

module.exports = Number.isFinite || function (x) { return typeof x === 'number' && !$isNaN(x) && x !== Infinity && x !== -Infinity; };

},{}],95:[function(require,module,exports){
module.exports = Number.isNaN || function isNaN(a) {
	return a !== a;
};

},{}],96:[function(require,module,exports){
module.exports = function mod(number, modulo) {
	var remain = number % modulo;
	return Math.floor(remain >= 0 ? remain : remain + modulo);
};

},{}],97:[function(require,module,exports){
module.exports = function sign(number) {
	return number >= 0 ? 1 : -1;
};

},{}],98:[function(require,module,exports){
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

},{"./helpers/isPrimitive":99,"is-callable":108}],99:[function(require,module,exports){
module.exports = function isPrimitive(value) {
	return value === null || (typeof value !== 'function' && typeof value !== 'object');
};

},{}],100:[function(require,module,exports){
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

},{}],101:[function(require,module,exports){

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


},{}],102:[function(require,module,exports){
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

},{}],103:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

module.exports = Function.prototype.bind || implementation;

},{"./implementation":102}],104:[function(require,module,exports){
var bind = require('function-bind');

module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);

},{"function-bind":103}],105:[function(require,module,exports){
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

},{}],106:[function(require,module,exports){
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

},{}],107:[function(require,module,exports){
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

},{}],108:[function(require,module,exports){
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

},{}],109:[function(require,module,exports){
var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};

},{}],110:[function(require,module,exports){
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

},{}],111:[function(require,module,exports){
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

},{"./isArguments":112}],112:[function(require,module,exports){
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

},{}],113:[function(require,module,exports){
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
},{"_process":85}],114:[function(require,module,exports){
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
},{"_process":85}],115:[function(require,module,exports){
module.exports = require('./lib/_stream_duplex.js');

},{"./lib/_stream_duplex.js":116}],116:[function(require,module,exports){
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
},{"./_stream_readable":118,"./_stream_writable":120,"core-util-is":87,"inherits":106,"process-nextick-args":114}],117:[function(require,module,exports){
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
},{"./_stream_transform":119,"core-util-is":87,"inherits":106}],118:[function(require,module,exports){
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
},{"./_stream_duplex":116,"./internal/streams/BufferList":121,"./internal/streams/destroy":122,"./internal/streams/stream":123,"_process":85,"core-util-is":87,"events":100,"inherits":106,"isarray":109,"process-nextick-args":114,"safe-buffer":129,"string_decoder/":135,"util":83}],119:[function(require,module,exports){
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
},{"./_stream_duplex":116,"core-util-is":87,"inherits":106}],120:[function(require,module,exports){
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
},{"./_stream_duplex":116,"./internal/streams/destroy":122,"./internal/streams/stream":123,"_process":85,"core-util-is":87,"inherits":106,"process-nextick-args":114,"safe-buffer":129,"util-deprecate":142}],121:[function(require,module,exports){
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
},{"safe-buffer":129}],122:[function(require,module,exports){
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
},{"process-nextick-args":114}],123:[function(require,module,exports){
module.exports = require('events').EventEmitter;

},{"events":100}],124:[function(require,module,exports){
module.exports = require('./readable').PassThrough

},{"./readable":125}],125:[function(require,module,exports){
exports = module.exports = require('./lib/_stream_readable.js');
exports.Stream = exports;
exports.Readable = exports;
exports.Writable = require('./lib/_stream_writable.js');
exports.Duplex = require('./lib/_stream_duplex.js');
exports.Transform = require('./lib/_stream_transform.js');
exports.PassThrough = require('./lib/_stream_passthrough.js');

},{"./lib/_stream_duplex.js":116,"./lib/_stream_passthrough.js":117,"./lib/_stream_readable.js":118,"./lib/_stream_transform.js":119,"./lib/_stream_writable.js":120}],126:[function(require,module,exports){
module.exports = require('./readable').Transform

},{"./readable":125}],127:[function(require,module,exports){
module.exports = require('./lib/_stream_writable.js');

},{"./lib/_stream_writable.js":120}],128:[function(require,module,exports){
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
},{"_process":85,"through":141}],129:[function(require,module,exports){
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

},{"buffer":86}],130:[function(require,module,exports){
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

},{"events":100,"inherits":106,"readable-stream/duplex.js":115,"readable-stream/passthrough.js":124,"readable-stream/readable.js":125,"readable-stream/transform.js":126,"readable-stream/writable.js":127}],131:[function(require,module,exports){
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

},{"es-abstract/es5":93,"function-bind":103}],132:[function(require,module,exports){
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

},{"./implementation":131,"./polyfill":133,"./shim":134,"define-properties":91,"function-bind":103}],133:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

var zeroWidthSpace = '\u200b';

module.exports = function getPolyfill() {
	if (String.prototype.trim && zeroWidthSpace.trim() === zeroWidthSpace) {
		return String.prototype.trim;
	}
	return implementation;
};

},{"./implementation":131}],134:[function(require,module,exports){
'use strict';

var define = require('define-properties');
var getPolyfill = require('./polyfill');

module.exports = function shimStringTrim() {
	var polyfill = getPolyfill();
	define(String.prototype, { trim: polyfill }, { trim: function () { return String.prototype.trim !== polyfill; } });
	return polyfill;
};

},{"./polyfill":133,"define-properties":91}],135:[function(require,module,exports){
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
},{"safe-buffer":129}],136:[function(require,module,exports){
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
},{"./lib/default_stream":137,"./lib/results":139,"./lib/test":140,"_process":85,"defined":92,"through":141}],137:[function(require,module,exports){
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
},{"_process":85,"fs":84,"through":141}],138:[function(require,module,exports){
(function (process){
module.exports = typeof setImmediate !== 'undefined'
    ? setImmediate
    : process.nextTick
;

}).call(this,require('_process'))
},{"_process":85}],139:[function(require,module,exports){
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
},{"_process":85,"events":100,"function-bind":103,"has":104,"inherits":106,"object-inspect":110,"resumer":128,"through":141}],140:[function(require,module,exports){
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
},{"./next_tick":138,"deep-equal":88,"defined":92,"events":100,"has":104,"inherits":106,"path":113,"string.prototype.trim":132}],141:[function(require,module,exports){
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
},{"_process":85,"stream":130}],142:[function(require,module,exports){
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
},{}]},{},[42,43,44]);
