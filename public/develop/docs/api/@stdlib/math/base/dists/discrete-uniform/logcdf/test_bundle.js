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

},{"./float64array.js":1,"./polyfill.js":3,"@stdlib/utils/detect-float64array-support":66}],3:[function(require,module,exports){
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

},{"./polyfill.js":5,"./uint16array.js":6,"@stdlib/utils/detect-uint16array-support":72}],5:[function(require,module,exports){
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

},{"./polyfill.js":8,"./uint32array.js":9,"@stdlib/utils/detect-uint32array-support":75}],8:[function(require,module,exports){
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

},{"./polyfill.js":11,"./uint8array.js":12,"@stdlib/utils/detect-uint8array-support":78}],11:[function(require,module,exports){
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

},{"@stdlib/utils/native-class":80}],17:[function(require,module,exports){
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

},{"@stdlib/utils/native-class":80}],22:[function(require,module,exports){
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

},{"@stdlib/utils/native-class":80}],24:[function(require,module,exports){
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

},{"@stdlib/utils/native-class":80}],26:[function(require,module,exports){
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

},{"./is_integer.js":34}],34:[function(require,module,exports){
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

},{"@stdlib/math/base/special/floor":49}],35:[function(require,module,exports){
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

},{"./is_nan.js":36}],36:[function(require,module,exports){
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

},{}],37:[function(require,module,exports){
'use strict';

// MODULES //

var constantFunction = require( '@stdlib/utils/constant-function' );
var isInteger = require( '@stdlib/math/base/assert/is-integer' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var floor = require( '@stdlib/math/base/special/floor' );
var ln = require( '@stdlib/math/base/special/ln' );
var NINF = require( '@stdlib/constants/math/float64-ninf' );


// MAIN //

/**
* Returns a function for evaluating the natural logarithm of the cumulative distribution function (CDF) for a discrete uniform distribution with minimum support `a` and maximum support `b`.
*
* @param {integer} a - minimum support
* @param {integer} b - maximum support
* @returns {Function} logCDF
*
* @example
* var logcdf = factory( 0, 10 );
* var y = logcdf( 0.5 );
* // returns ~-2.398
*
* y = logcdf( 8.0 );
* // returns ~-0.201
*/
function factory( a, b ) {
	var logn;
	var am1;
	if (
		isnan( a ) ||
		isnan( b ) ||
		!isInteger( a ) ||
		!isInteger( b ) ||
		a > b
	) {
		return constantFunction( NaN );
	}
	am1 = a - 1.0;
	logn = ln( b - a + 1.0 );
	return logcdf;

	/**
	* Evaluates the natural logarithm of the cumulative distribution function (CDF) for a discrete uniform distribution.
	*
	* @private
	* @param {number} x - input value
	* @returns {number} evaluated logCDF
	*
	* @example
	* var y = logcdf( 2.0 );
	* // returns <number>
	*/
	function logcdf( x ) {
		if ( isnan( x ) ) {
			return NaN;
		}
		if ( x < a ) {
			return NINF;
		}
		if ( x >= b ) {
			return 0.0;
		}
		return ln( floor( x ) - am1 ) - logn;
	}
}


// EXPORTS //

module.exports = factory;

},{"@stdlib/constants/math/float64-ninf":28,"@stdlib/math/base/assert/is-integer":33,"@stdlib/math/base/assert/is-nan":35,"@stdlib/math/base/special/floor":49,"@stdlib/math/base/special/ln":50,"@stdlib/utils/constant-function":61}],38:[function(require,module,exports){
'use strict';

/**
* Natural logarithm of the cumulative distribution function (CDF) for a discrete uniform distribution.
*
* @module @stdlib/math/base/dists/discrete-uniform/logcdf
*
* @example
* var logcdf = require( '@stdlib/math/base/dists/discrete-uniform/logcdf' );
*
* var y = logcdf( 3.0, 0, 4 );
* // returns ~-0.223
*
* var mylogcdf = logcdf.factory( 0, 10 );
* y = mylogcdf( 0.5 );
* // returns ~-2.398
*
* y = mylogcdf( 8.0 );
* // returns ~-0.201
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-read-only-property' );
var logcdf = require( './logcdf.js' );
var factory = require( './factory.js' );


// MAIN //

setReadOnly( logcdf, 'factory', factory );


// EXPORTS //

module.exports = logcdf;

},{"./factory.js":37,"./logcdf.js":39,"@stdlib/utils/define-read-only-property":63}],39:[function(require,module,exports){
'use strict';

// MODULES //

var isInteger = require( '@stdlib/math/base/assert/is-integer' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var floor = require( '@stdlib/math/base/special/floor' );
var ln = require( '@stdlib/math/base/special/ln' );
var NINF = require( '@stdlib/constants/math/float64-ninf' );


// MAIN //

/**
* Evaluates the natural logarithm of the cumulative distribution function (CDF) for a discrete uniform distribution with minimum support `a` and maximum support `b` at a value `x`.
*
* @param {number} x - input value
* @param {integer} a - minimum support
* @param {integer} b - maximum support
* @returns {number} evaluated logCDF
*
* @example
* var y = logcdf( 9.0, 0, 10 );
* // returns ~-0.095
*
* @example
* var y = logcdf( 0.5, 0, 2 );
* // returns ~-1.099
*
* @example
* var y = logcdf( +Infinity, 2, 4 );
* // returns 0.0
*
* @example
* var y = logcdf( -Infinity, 2, 4 );
* // returns -Infinity
*
* @example
* var y = logcdf( NaN, 0, 1 );
* // returns NaN
*
* @example
* var y = logcdf( 0.0, NaN, 1 );
* // returns NaN
*
* @example
* var y = logcdf( 0.0, 0, NaN );
* // returns NaN
*
* @example
* var y = logcdf( 2.0, 1, 0 );
* // returns NaN
*/
function logcdf( x, a, b ) {
	if (
		isnan( x ) ||
		isnan( a ) ||
		isnan( b ) ||
		!isInteger( a ) ||
		!isInteger( b ) ||
		a > b
	) {
		return NaN;
	}
	if ( x < a ) {
		return NINF;
	}
	if ( x >= b ) {
		return 0.0;
	}
	return ln( floor( x ) - a + 1.0 ) - ln( b - a + 1.0 );
}


// EXPORTS //

module.exports = logcdf;

},{"@stdlib/constants/math/float64-ninf":28,"@stdlib/math/base/assert/is-integer":33,"@stdlib/math/base/assert/is-nan":35,"@stdlib/math/base/special/floor":49,"@stdlib/math/base/special/ln":50}],40:[function(require,module,exports){
module.exports={"expected":[-1.4759065198095778,-0.4754236967150746,-0.5108256237659905,-3.713572066704308,-3.0757749812275272,-0.04000533461369913,-0.7915872533731978,-0.2876820724517809,-1.0986122886681098,-0.5978370007556204,-0.43286408229627876,-0.04652001563489282,-0.5050949490570057,-0.5292593254548288,-0.32208349916911333,-0.6744550475477927,-0.025317807984289783,-1.5353299402803784,-1.55814461804655,-0.15415067982725836,-0.20585205420414873,-0.2682639865946794,-0.9932517730102834,-0.33897536683933144,-2.4277482359480516,-1.349926716949016,-3.56953269648137,-0.17693070815907808,-0.4317824164255378,-0.916290731874155,-0.2513144282809062,-0.48550781578170077,-0.08004270767353637,-1.2181574393178924,-0.903711949667295,-0.8754687373539001,-0.5596157879354228,-0.7444404749474958,-1.5040773967762742,-0.06899287148695143,-0.6085897925318824,-3.091042453358316,-2.995732273553991,-1.3480731482996928,-1.791759469228055,-0.4382549309311553,-0.5306282510621704,-0.5500463369192721,-2.063693184711697,-0.06899287148695143,-1.7578579175523736,-0.33647223662121306,-1.0628942060660305,-0.2876820724517809,-1.9459101490553135,-0.815036998168982,-0.2087548138621101,-0.2363887780642304,-0.2411620568168881,-0.17327172127403667,-0.8472978603872037,-1.5040773967762742,-0.6931471805599453,-0.7435780341868372,-0.7282385003712155,-0.40546510810816444,-0.5663954749208016,-0.4700036292457356,-0.14732471475685857,-2.5257286443082556,-1.0296194171811583,-0.025001302205417384,-1.0986122886681098,-1.3083328196501787,-2.1546649629174235,-0.4307829160924542,-0.49247648509779424,-0.07898841131863032,-1.6094379124341003,-1.637608789400797,-0.9873866535578852,-0.9765095918672098,-1.1314021114911006,-1.0459685551826876,-0.40546510810816444,-0.16705408466316607,-0.013986241974739952,-1.1631508098056809,-2.614959778036198,-1.1631508098056809,-1.4816045409242153,-0.21936282847430363,-1.5686159179138452,-0.4340384805522204,-0.3746934494414107,-1.349926716949016,-1.0185695809945732,-2.3826278006675823,-0.8979415932059586,-3.1780538303479458,-1.906169820405799,-0.6549259677397474,-0.38193461069797024,-0.030305349495328922,-0.8622235106038794,-1.9459101490553135,-1.4434527749598391,-3.1354942159291497,-0.028573372444056,-3.828641396489095,-0.5768873744440832,0.0,-0.7969439742415888,-0.5465437063680698,-1.791759469228055,-0.38484582090542885,-0.16705408466316607,-0.6118015411059929,-1.1592369104845446,-0.2231435513142097,-0.13353139262452263,-0.3294792011302423,-0.06351340572232586,-0.8421827597204331,-0.587786664902119,-0.46430560813109784,-0.060624621816434854,-0.5108256237659905,-0.2876820724517809,-2.7568403652716422,-0.8527773261518291,-0.8675005677047232,-0.5108256237659907,-0.9249487946172696,-0.17934092865581686,-0.6061358035703156,-0.02197890671877523,-0.1112256351102245,-0.2776317365982795,-2.0149030205422647,-0.40546510810816444,-0.5020919437972361,-3.2321210516182215,-1.791759469228055,-0.10536051565782628,-1.9661128563728327,-0.3117796240308415,-0.2411620568168881,-1.0986122886681098,-1.3350010667323402,-1.236762627148927,-0.4700036292457356,-0.6528732814220054,-0.5212969236332861,-0.02298951822469872,-0.8850381883700507,-1.6739764335716716,-0.9509762898620451,-0.3184537311185346,-0.2231435513142097,-0.8174448972375223,-0.33897536683933144,-1.7578579175523736,-0.8109302162163288,-1.0986122886681098,-0.09531017980432477,-0.2818511521409879,-0.6190392084062233,-1.0116009116784799,-1.7707060600302227,0.0,-0.33314444652853825,-0.6523251860396904,-0.2231435513142097,-0.3364722366212129,-0.6523251860396904,-2.4849066497880004,-1.276293465905562,-0.14994014729091476,-0.8472978603872037,-1.6739764335716716,-0.02564243061333767,-0.6332490389788765,-0.09237332013101517,-1.1700712526502546,-0.1431008436406733,-0.8602012652231115,-0.6931471805599453,-1.6094379124341005,-1.8458266904983307,-2.120263536200091,-1.3350010667323402,-0.6931471805599453,-1.971552579668651,-0.5596157879354228,-0.6061358035703156,-0.13976194237515874,-1.0986122886681096,-2.772588722239781,-0.8979415932059586,-0.1941560144409575,-0.09156719352549039,-1.589235205116581,-2.1102132003465894,-0.3011050927839216,-0.7213180575266417,-0.03509131981127017,-0.5172565140962812,-2.0149030205422647,-0.2578291093020998,-1.8382794848629478,-2.379546134130174,-0.8183103235139514,-0.5645298027378518,-1.3083328196501787,-1.9459101490553135,-0.2876820724517809,-0.6505875661411494,-0.20763936477824452,-0.8421827597204331,-0.9694005571881035,-0.18232155679395473,-1.0152306797290587,-0.6539264674066639,-0.6603573577369546,-0.3429447511268303,-1.341173925839421,-0.3726752852851735,-1.4816045409242153,-0.045120435280469655,-0.11506932978478723,-0.3958956570920136,-0.31237468504215243,-0.7537718023763802,-0.08576682175742519,-0.051959738930711104,-1.466337068793427,-1.2321436812926325,-1.2992829841302609,-0.6466271649250526,-1.270462545594769,-0.2876820724517809,-0.17185025692665928,-0.6190392084062233,-0.6190392084062235,-1.0986122886681098,-0.8472978603872037,-1.1370785694959058,-0.0472528848505455,-0.18232155679395473,-0.10354067894084033,-0.3968813644167729,-0.6931471805599453,-0.12783337150988489,-1.6094379124341003,-3.245193133185574,-0.37948962170490386,-2.740840023925201,-1.5869650565820417,-1.2992829841302609,-1.3862943611198906,-2.0794415416798357,-0.2231435513142097,-0.6190392084062233,-2.624668592163159,-0.7339691750802004,-1.0986122886681098,-0.0779615414697118,-1.5105920777974677,-1.0459685551826876,-0.5753641449035618,-0.8718389693033213,-0.4700036292457356,-0.05406722127027582,-1.128465251817791,-1.5125880864441827,-0.06453852113757118,-2.001480000210124,-0.3101549283038396,-0.09531017980432477,-3.295836866004329,-1.9740810260220096,-1.3545456628053103,-0.9808292530117262,-0.23995066963059092,-0.6592456288842639,-2.772588722239781,-1.0986122886681098,-0.014598799421152636,-0.8241754429663495,-0.17520408902509077,-0.31666960932503324,-0.2102954088363608,-0.43286408229627876,-3.367295829986474,-0.9490805546971459,-0.07696104113612844,-0.1112256351102245,-1.0986122886681098,-0.579818495252942,-0.48097266061630956,-0.4700036292457356,-0.661398482245365,-1.1631508098056809,-0.18492233849401193,-0.6632942174102642,-0.2231435513142097,-3.4011973816621555,-1.133098464739279,-0.5465437063680698,-0.45198512374305727,-0.21905356606268464,-0.6795415285041666,-0.7404000654104909,-0.03125254350410431,-2.456735772821304,-1.0414538748281612,-1.3862943611198906,-0.2318016140573243,-0.7817005779013904,-1.0986122886681098,-0.8873031950009028,-1.085189268335969,-0.37156355643248296,-0.7731898882334817,-2.0794415416798357,-0.2513144282809062,-0.5596157879354228,-0.49643688631389105,-2.120263536200091,-0.017699577099400975,-0.5389965007326871,-0.5725191927713306,-0.02298951822469872,-0.6061358035703156,-0.1296778233085326,-0.8649974374866046,-0.12516314295400605,-0.09180754925312286,-1.0826119473216687,-0.5232481437645479,-0.5819215454497209,-0.40546510810816444,-1.9459101490553135,-0.5559460590464603,-0.42845462633286313,-0.1431008436406733,-0.40546510810816444,-2.7880929087757464,-0.2231435513142097,-0.02985296314968116,-0.5260930958967791,-0.12783337150988489,-0.5108256237659905,-2.159484249353372,-0.17645643734155653,-1.916922612182061,-0.07410797215372196,-0.13976194237515874,-0.14518200984449783,-1.3862943611198906,-0.5108256237659905,-1.8458266904983307,-0.7086513670959105,-1.0986122886681098,-1.0788096613719298,-0.7389567165912395,-0.3677247801253174,-1.466337068793427,-0.6931471805599453,-0.40546510810816444,-0.18232155679395473,-0.9718605830289657,-1.4586150226995167,-3.270835563798912,-0.6931471805599453,-1.6094379124341003,-0.5108256237659905,-0.3677247801253174,0.0,-0.2006706954621511,-0.2231435513142097,-0.5596157879354228,-0.02985296314968116,-2.1546649629174235,-1.7272209480904839,-0.9985288301111273,-3.828641396489095,-1.8718021769015913,-0.8472978603872037,-0.2363887780642304,-2.5257286443082556,-0.5937747067467416,-1.0340737675305385,-0.15415067982725836,-0.30010459245033816,-2.9444389791664407,-0.050010420574661305,-0.31365755885504165,-2.751535313041949,-0.6286086594223741,-1.7676619176489945,-1.0986122886681098,-0.025317807984289783,-2.1546649629174235,-0.1865859555804122,-0.1941560144409575,-0.9480394301887354,-0.18232155679395473,-0.037740327982847086,-1.2264456601779945,-0.5108256237659905,-1.8458266904983307,-0.04652001563489282,-0.6190392084062233,-1.9459101490553135,-0.9808292530117262,-0.10536051565782628,-0.262364264467491,-0.3953127366441464,-0.2682639865946794,-2.772588722239781,-0.6623755218931916,-0.5108256237659905,-1.3862943611198906,-2.2512917986064953,-1.2729656758128873,-0.5322168137473084,-0.17958557697507987,-0.7166776779701395,-1.8245492920510458,-1.1921383466789333,-0.14571181118139365,-3.2188758248682006,-0.22825865198098033,-0.6190392084062233,-0.20633643299782845,-0.09531017980432477,-2.3513752571634776,-0.49643688631389105,-0.23995066963059092,-0.6931471805599453,-0.11778303565638351,-1.791759469228055,-0.03922071315328127,-1.3862943611198906,-0.06351340572232586,-0.6802437757240373,-2.5455312716044354,-1.791759469228055,-0.16579225484274407,-0.8729402910005413,-0.3566749439387323,-2.3978952727983707,-0.8472978603872037,-0.11778303565638351,-0.6931471805599453,-1.6094379124341003,-2.2335922215070942,-1.1420974006078484,-0.5920510636885765,-0.8266785731844679,-1.4586150226995167,-0.44468582126144574,-0.16126814759612226,-0.5695332245927687,-1.0986122886681098,-3.091042453358316,-0.3184537311185346,-2.1400661634962708,-3.5263605246161616,-0.6931471805599453,-1.5841201044498106,-0.09038406146826906,-0.6931471805599453,-0.43936665978384565,-0.6286086594223741,-1.749199854809259,-0.10354067894084033,-1.3256697393034558,-0.2776317365982795,-0.8690378470236096,-0.2336148511815052,-0.2231435513142097,-1.0986122886681098,-0.3184537311185346,-0.503905180921417,-1.791759469228055,-1.7404661748405046,-0.12136085700426748,-0.3101549283038396,-1.0647107369924282,-2.538973871058276,-1.0414538748281612,-1.3862943611198906,-0.20479441264601328,-0.4389130421757044,-0.01626052087178029,-2.890371757896165,-0.34409616173187224,-0.5717863235556779,-0.33647223662121306,-0.9162907318741551,-0.1743533871447778,-1.0296194171811583,-0.5978370007556204,-1.0826119473216687,-0.055569851154810654,-0.6931471805599453,-0.20661424936299916,-0.10763066419236557,-1.3862943611198906,-0.07550755250814517,-2.6100697927420065,-1.0986122886681096,-0.7308875085427924,-3.4011973816621555,-1.213022639845854,-0.6931471805599453,-0.06453852113757118,-0.7435780341868372,-1.575536360758419,-2.5455312716044354,-0.03448617607116932,-0.5014797613477531,-4.060443010546419,-0.9765095918672098,-0.6931471805599453,-0.8472978603872037,-0.18232155679395473,-0.6931471805599453,-0.169076330043934,-0.44802472252696035,-0.2231435513142097,-0.1941560144409575,-3.367295829986474,-0.1643030512912763,-0.2318016140573243,-1.3682758556172123,-3.4965075614664802,-0.21217451994363576,-1.2809338454620642,-2.0794415416798357,-0.21936282847430363,-0.09844007281325252,-0.7308875085427924,-1.6094379124341003,-0.15415067982725836,-0.5653138090500603,-0.5108256237659907,-0.45198512374305727,-0.05715841383994864,-0.40546510810816444,-3.4965075614664802,-1.157452788691043,-1.9459101490553135,-0.13657553500575087,-0.09531017980432477,-1.5260563034950494,-0.192371892647456,-1.3156767939059373,-1.5125880864441827,-0.17693070815907808,-0.8938178760220964,-0.40546510810816444,-0.43721380642274477,-0.7419373447293773,-0.9315582040049435,-0.10536051565782628,-0.33024168687057687,-0.3468709438421116,-0.16941815195804666,-1.6094379124341003,-0.5371429320833639,-0.4144337780909248,-0.44468582126144574,-3.4339872044851463,-1.0691984034618165,0.0,-0.3321338350226148,-1.270462545594769,-0.1941560144409575,-0.07696104113612844,-0.5187937934151676,-0.22957444164450025,-0.3184537311185346,-0.050010420574661305,-1.292768303109067,-1.8718021769015913,-0.5108256237659905,-0.1431008436406733,-0.16989903679539747,-0.6061358035703156,-1.3862943611198906,-0.36624439495488303,-0.7640989165322298,-1.1430640512389434,-0.2513144282809062,-0.587786664902119,-0.6799019538099246,-0.8472978603872037,-0.3541718137206139,-2.0243817644968085,-0.17185025692665928,-0.6931471805599453,-1.927891643552635,-0.6505875661411494,-2.3978952727983707,-2.917770732084279,-0.40546510810816444,-0.9420432279765697,-0.08004270767353637,-2.890371757896165,-0.06669137449867228,-0.24362208265775043,-0.09237332013101517,-0.9279867716373464,-0.2876820724517809,-1.1856236656577395,-0.45198512374305727,-1.3862943611198906,-1.1741198411762548,-0.2513144282809062,-0.7259370033829362,-0.39204208777602373,-0.6931471805599453,-0.6623755218931916,-0.456758402495715,-1.6094379124341003,-0.10919929196499197,-0.48835276791393206,-1.0033021088637848,-1.252762968495368,-0.025975486403260677,-0.3101549283038396,-0.2876820724517809,-0.9650808960435872,-0.3334916084830752,-0.5108256237659905,-0.9420432279765697,-0.26236426446749117,-2.1972245773362196,-0.5389965007326871,-0.719122666963206,-0.6931471805599453,-0.13353139262452263,-0.4403118394383327,-0.6286086594223741,-2.0281482472922856,-0.25423413838424086,-0.5389965007326871,-0.2411620568168881,-1.037987666851675,-1.1977031913123406,-0.3364722366212129,-0.2876820724517809,-0.4554755286828257,-1.0986122886681098,-1.2237754316221157,-0.3886579897917832,-1.0986122886681098,-1.9810014688665833,-0.15963014559188382,-0.4769240720903093,-0.9098182173685375,-1.455287232606842,-1.4816045409242153,-0.1743533871447778,-0.3074846997479607,-0.8823891801984738,-0.7922380832041762,-1.9588135538912212,-0.2288415724288474,-0.1112256351102245,-0.2876820724517809,-0.832909122935104,-0.2231435513142097,-3.6109179126442243,-0.6931471805599453,-0.20972053098206903,-0.27369583047704105,-1.0986122886681098,-0.2876820724517809,-0.2113090936672069,-2.4849066497880004,-1.0986122886681098,-0.7248958788745257,-0.150282203049338,-0.40546510810816444,-0.5108256237659907,-2.10684051586795,-0.6791609385852054,-1.425008873300581,-0.9808292530117262,-0.5232481437645479,-1.178654996341646,-0.17185025692665928,-0.7621400520468967,-1.9459101490553135,-1.2039728043259361,-0.23001643060197186,-1.3040562628829186,-0.17185025692665928,-1.578185368929996,-0.42845462633286313,-0.06899287148695143,-0.2754119798599667,-0.07410797215372196,-0.1776811772374525,-1.157452788691043,-2.0243817644968085,-0.40546510810816444,-0.6931471805599453,-0.2876820724517809,-0.37156355643248296,-3.58351893845611,-0.3101549283038396,-0.2787134024690205,-0.796331416795176,-0.06317890162153168,-0.750305594399894,-0.3340061441260195,-2.0794415416798357,-0.18232155679395473,-1.2110902720948,-1.2862109025629083,-0.04445176257083381,-0.2876820724517809,-0.6061358035703156,-1.3862943611198906,-0.4382549309311553,-0.09684982598991754,-0.5179430915348547,-0.18232155679395473,-0.02666824708216141,-0.40546510810816444,-0.2411620568168881,-1.3083328196501787,-0.07410797215372196,-1.1271856611121658,-0.7457909140453673,-1.540445040947149,-0.6931471805599453,-0.5596157879354228,-0.23967285326542034,-1.8458266904983307,-0.25593337413720063,-0.1431008436406733,-0.40546510810816444,-0.45198512374305727,-1.749199854809259,-0.6171612735820232,-0.3813675565291038,-1.6835458845878222,-0.8690378470236096,-1.7255100836868544,-0.3677247801253174,-0.6241543090729939,-1.2396908869280152,-1.0986122886681098,-0.03448617607116932,-1.9459101490553132,-0.5232481437645479,-0.78845736036427,-2.9444389791664407,-0.8855190732074013,-0.36000273403140703,-0.7691330875378672,-0.5179430915348547,-1.0531499145913523,-0.017094433359300068,-0.3690974639372896,-2.9704144655697013,-3.4011973816621555,-0.6931471805599453,-0.025317807984289783,-0.916290731874155,-0.5389965007326869,-0.3496737484797488,-1.466337068793427,-0.07696104113612844,-0.7077459799810979,-0.34830669426821587,-0.6931471805599453,-1.0986122886681098,-0.3022808718729337,-1.3099213823353166,-0.44468582126144574,-3.091042453358316,-1.0826119473216687,-0.09531017980432477,-0.2972515234679316,-3.2834143460057716,-0.043802622658393,-0.13976194237515874,-0.8109302162163288,-1.3217558399823195,-0.6931471805599453,-0.8472978603872037,-0.40546510810816444,-0.1466034741918754,-2.0541237336955462,-0.15180601286800421,-0.78845736036427,-0.04959694113937218,-2.3025850929940455,-2.2512917986064953,-0.8938178760220964,-2.1465808445174646,-0.8303483020734304,-1.6094379124341003,-0.2231435513142097,-0.10008345855698265,-2.0794415416798357,-0.3276874070654801,-0.05129329438755046,-0.15415067982725836,-0.29849298855599654,-0.037740327982847086,-1.4534336639575192,-0.45425527227759643,-0.8109302162163288,-0.6143663027068309,-0.19105523676270922,-0.3697470255060851,-0.6241543090729939,-1.1526795099383855,-0.16551443847757344,-0.3980301296206464,-0.8472978603872037,-0.48770320634513664,-0.3513978868378886,-0.2876820724517809,-0.2954642128938359,-0.6567795363890705,-0.4403118394383327,-0.2567198468478141,-0.03822121282019774,0.0,-1.5198257537444133,-0.1823215567939546,-1.0986122886681098,-2.3978952727983707,-0.4432054360910115,-0.519300250756963,-0.48285177172358457,-1.2163953243244932,-0.570544858467613,-0.26236426446749117,-0.9267620317414506,-3.1780538303479458,-0.27029032973991185,-0.7375989431307791,0.0,-0.13353139262452263,-0.084557388028063,-0.2876820724517809,-4.219507705176107,-0.6931471805599453,-0.16705408466316607,-0.9932517730102834,-2.4423470353692043,-1.0986122886681098,-1.55814461804655,-0.8472978603872037,-0.13976194237515874,-2.0794415416798357,-0.9382696385929304,-0.05826890812397576,-0.07410797215372196,-0.8023464725249373,-0.39204208777602373,-0.10536051565782628,-4.143134726391533,-0.8056251639866356,-1.9810014688665833,-1.2443240998495033,0.0,-1.203972804325936,-1.203972804325936,-0.78845736036427,-1.3862943611198906,-1.8325814637483102,-1.0986122886681098,-0.9044562742271522,-0.5679840376059393,-0.2025242641114741,-0.8898574748059995,-1.5314763709643884,-0.13657553500575087,0.0,-0.750305594399894,-0.6493445579015524,-2.0794415416798357,-1.8458266904983307,-0.03333642026759172,-2.9444389791664407,-0.45953232937844024,-0.8472978603872037,-0.8979415932059586,-1.457246097092175,-0.24231346742193,-2.772588722239781,-1.890850371872286,-0.34830669426821587,-3.1354942159291497,-1.0986122886681098,-0.9267620317414506,-1.8382794848629478,-1.717651497074333,-0.29849298855599654,-0.3150810466398952,-1.815289966638249,-0.8472978603872037,-0.7985076962177716,-2.833213344056216,-2.181224235989778,-1.4816045409242153,-0.4700036292457356,-0.15415067982725836,-0.22314355131420985,-0.6931471805599453,-1.0296194171811583,-0.4895482253187058,-2.1832383353614793,-0.18232155679395473,-0.6554068525770982,-0.03509131981127017,-0.916290731874155,-0.15634607039069398,-0.3973017974690033,-0.661398482245365,-2.614959778036198,-0.027398974188114388,-0.587786664902119,-0.4700036292457356,-1.0185695809945732,-0.45198512374305727,-0.7472144018302211,-0.18232155679395473,-0.11778303565638351,-0.7198154276421067,-0.2231435513142097,-0.6061358035703156,-1.2039728043259361,-3.6635616461296463,-0.714653385780909,-0.2411620568168881,-0.2006706954621511,-1.2862109025629083,-0.06899287148695143,-1.0986122886681098,-0.6931471805599453,-0.15762894420358317,-0.2876820724517809,-0.028170876966696335,-0.3184537311185346,-0.17185025692665928,-1.791759469228055,-0.4626235219481132,-0.6931471805599453,-1.7047480922384253,-0.5389965007326871,-0.06899287148695143,-1.8325814637483102,-0.2006706954621511,-0.6143663027068309,-0.8754687373539001,-1.0116009116784799,-0.262364264467491,-2.2407096892759584,-0.5596157879354228,-0.06187540371808741,-0.4131871542020745,-0.18232155679395473,-0.44183275227903934,-0.05505977718302743,-1.0216512475319814,-2.833213344056216,-0.4700036292457356,-0.40546510810816444,-2.093234863812172,-1.6094379124341003,-0.587786664902119,-0.1112256351102245,-0.20409535634351528,-0.1743533871447778,-0.6632942174102642,-2.995732273553991,-0.16989903679539747,-1.2992829841302607,-0.20763936477824452,-0.49247648509779424,-0.40546510810816444,-0.14107859825990562,-0.5596157879354228,-1.7272209480904839,-0.2513144282809062,-0.18759861389479848,-0.3493756414571209],"x":[23.023975266135924,32.17149771822628,5.678148387035282,11.419448664932407,9.363948795600109,54.819445668194085,32.537272944233905,9.92299089885525,17.72476540182207,21.95909670792713,24.928449284765513,30.597572152678627,42.36734045495122,43.49595344831808,68.76498892946125,43.16791099766816,45.454948469621606,18.38498815181792,5.299706964786003,79.1623832440316,37.32908381557742,22.99623207134802,36.0815295588879,63.34023486075812,21.046543309344067,18.219483784525917,6.488437086630505,39.908208017694086,66.34851228220283,25.332819448095897,26.80156286418937,33.160222710963225,25.108659050044867,23.809110832181233,39.33173670836308,11.194201254442527,37.93627140830361,53.39857917844934,16.573142243072603,65.04829971081946,55.36774706011142,14.931282308811202,17.688774557952932,27.856524796474552,4.897711646200655,25.610109668557346,34.07920006512447,51.77450618579036,8.715508458353339,15.299035207416324,9.930992042063036,21.557015320241163,25.863262699350685,35.69171634005309,0.6474361332782781,36.809030635833366,68.52166836984594,61.2856644264198,12.429177441946797,47.05873465695897,18.446022040839633,25.364451971293164,4.203137503120825,31.08519629677424,25.79966222031905,9.09060358032524,43.59372376906483,17.839518145352283,63.94034587107297,17.294369023553784,32.98885456758631,83.61840500323488,9.033606767696309,25.842243965130052,10.051554440110628,39.28720719933228,29.580399141979413,76.3699964858736,5.4983976441381435,29.69123293229118,29.62883093769101,28.891652112368206,14.863408223774384,30.881394205829736,66.28660743584808,20.47070828889177,72.99330941572708,9.48559210149801,11.058960977152093,9.202362578705209,33.09723265320619,65.63100335303025,17.542175959059293,62.75990313914252,11.63576005838116,32.66379720212588,32.375778103999764,12.740364072913692,28.64250658780005,17.190757815437664,17.8392575940286,41.63073470962133,55.719314338564885,81.8593902336836,33.21850514797072,11.0986942054952,22.23521138560344,10.10866307315096,78.72052193650222,3.326416461411554,53.294314844878755,18.0,41.46028519743079,12.512158010413202,11.963732453181843,62.519098315162125,55.21531197363231,37.223038426359466,22.851310817771335,50.73520019829503,54.233360123816794,49.55762901694393,71.06918508758075,39.869381036764366,16.0135611655084,36.00297275984499,34.43617646185851,14.475585280021665,9.63369073942292,22.340014652315936,26.92825778205154,23.72257439445418,32.37723231656271,30.885118301347887,62.55430559708834,37.628853459246926,57.55393623424158,22.618461651681795,35.548559254826145,5.837261777423963,12.83440211459135,47.76266531132007,2.8154575686724415,6.3913358576528285,15.751360384809974,23.87463826334928,58.43357855216591,41.66193317330818,12.093759050545698,21.57171933710703,11.708866046098349,65.23114398156508,45.545994878685086,56.205440412545975,46.13414544921233,34.42850478906554,6.986265416760356,27.51203755038692,48.870614856875136,22.509102839545207,47.51022752381887,64.99908357113932,28.822065111042292,13.396330674717946,6.164540407467831,23.53438820703453,55.12899910345924,17.330094805585794,37.656364073530355,20.115036906541526,15.0,49.624683155483986,41.71989876546774,32.049208308627215,41.8227835227695,29.254294110208527,6.187709125621452,17.726826211714947,67.00750045412487,21.99315391563785,11.939078212613785,77.1564280294346,61.5608899780668,39.92974984742277,33.00018918984907,13.886935482373527,44.69165225736841,15.053149368203393,21.788865990496685,17.569912714814063,19.452730434898875,7.536494478020801,38.614889851193965,15.947765342640349,18.21319804375717,24.697527419310877,25.931946367194946,30.84556522167165,14.284143744942341,13.291291181203345,28.18188213286081,74.22590446198701,13.937775119522183,14.389285636774531,49.26000341142129,47.169646254898566,46.47766394191109,40.62031032947921,14.833659815281912,26.454810724224792,12.37967538616488,5.601390378746954,29.200606241670584,33.321327173772936,33.57578529289181,22.20586825848984,20.313638158096406,26.325409021884596,52.48074261601498,32.7372396549725,23.898681960028455,35.89334503105137,38.302564957360836,27.655417410139208,39.57279656329136,50.75509445601375,27.14398601573616,34.86105836829423,16.12407989307141,78.12567813137542,54.65545972414692,45.57310160495314,45.87158333436052,26.713076091728187,79.6415517469222,80.94115367610846,22.08428442803592,16.673505424339062,17.172644641816124,26.79531194009537,16.210288785173983,74.73344657785884,71.93019451047851,25.171345535859274,43.474356907899086,13.41272270528924,19.460821233507794,28.341851561180455,76.74158157569735,10.217695223902574,63.126858733935364,42.24717287951495,31.345505990338008,25.755495919994825,8.198620398343436,7.426642206961905,57.18359307408188,22.916612826534653,10.835762556440582,11.488280567167322,8.631368025537366,14.602160135432445,32.12220952914524,13.72948067373397,17.32848680167147,23.138159725846457,12.433955455040913,55.56360763898876,16.38250505849234,32.77910514717823,16.52989286281958,35.07080155240838,24.674346601364213,20.681276066707863,23.989574168653277,27.99435333673444,29.848378841908268,14.387852274325525,30.666612704218995,55.916823985879276,7.181912586895276,7.866984665159152,21.469025610557225,31.192377250110727,76.02668473358864,45.34813493966419,11.168593055619809,23.31074740762583,84.35517512188243,26.335046312881488,61.77977702743401,57.03726451237862,62.58403859766687,32.42076177772206,11.79552437946606,14.961592120535611,32.98697701086434,86.09794488034342,34.58414988210049,31.44537888097877,52.889355748371614,21.171185561415232,27.847188364356313,21.326517474979795,76.78906855685489,30.635525998110282,20.764806730504112,2.048353057397038,28.348603351927444,35.28647286090812,22.733120859680376,57.557347343783015,36.25736819493004,39.93159860998726,80.31372267669434,6.802871587498148,12.586060928414259,25.793361365420086,27.012984131263554,39.663932625539005,11.630376479779612,24.699203313177417,26.483497587094,51.01199541567489,7.582343670992862,20.910133979818756,54.22799016788376,7.824744926340738,17.63577680278972,8.654542563389063,67.08197151527732,38.79184713073919,62.090354012771456,61.36249182788497,17.784612901217457,84.36984187649502,48.585067720315976,47.186057005893616,68.76888223114042,36.37752366451345,28.234366346084457,38.081810702541176,11.939347482894654,9.25882136843898,46.585949193172745,56.21242195935066,18.826394358955177,53.78525979038221,20.432956970756777,5.983102858311244,43.484312477800295,48.46521613412314,67.03819521830148,39.513011733821386,3.2260893572767393,58.49358680423591,13.619163034630741,24.174861209472557,62.66887152504943,43.05574802833294,14.913116670434732,24.663268206589713,12.745521494919473,38.817127102499455,10.101967802363124,24.785073795705543,32.89977562190601,27.159236203802664,19.79696100168194,6.51019405923317,19.718900387757266,19.86927751791454,33.956800078924054,14.942792344836779,22.786117975519865,2.5289091850958663,3.6609598156718532,10.82311715699265,60.96598738689784,9.0,46.014129469398945,7.498598124242082,11.106499689778971,35.75660647424314,21.625678605029183,22.736435001242,18.054818286241932,10.936697110468657,6.430374390984568,18.030589434049162,58.15279371218997,22.250582488453034,45.15016126793165,30.648919923915603,13.437416426357482,37.18391045948297,13.527485856451158,56.423295504415975,66.70862088409021,20.827029992996355,37.751784175559735,7.174948633689734,32.83099841086233,83.63348407144497,7.654664066045792,44.13451979370761,20.366115710710172,35.39411885144142,21.648782214990383,41.801900723798624,23.341765673950917,20.254566665411158,20.489336901096426,49.72061691792279,23.019704733042992,13.837379567694992,10.317617736713899,30.60882498924608,22.064683265116432,38.42813968800942,48.04557116326072,11.70219509950073,46.096300576506216,18.511197219971773,3.6698531772305865,7.4161791052815875,29.343671694310547,52.70090283647365,74.58889281867886,37.45758115697416,20.784645728045014,24.41222847457873,54.436607841204584,15.518558330969611,56.757522469041405,39.09836291721436,50.73001696649807,36.88203209581242,19.716715123319975,15.600991362721793,72.78544427707939,10.67354835320186,25.13542758588148,19.675037683476102,39.40767278980469,21.702254756752808,64.28758738039676,41.98929823018473,16.413061817989604,10.001353793892426,76.32854191698492,45.75804622313011,9.26729707419354,4.611293693922997,20.35476218634182,11.03870280148678,17.67826248037827,30.267291971634577,7.488299440251993,30.64767813561749,30.602238078499852,8.364415274457727,14.661991501818422,25.99744918927371,55.545342203462944,54.057533764526504,6.266714787090949,11.047586832231307,29.564395460085166,19.98457352853825,16.50322430521125,9.610454006412391,25.910988369002595,85.28212075993363,9.328914305332006,45.79183350622482,7.514864728551843,16.400331119821065,55.05244156978328,21.293838136104362,29.078913536943503,23.778401660884978,47.45540310426448,28.91713793590676,10.523654046573544,8.446448647394178,36.745036015287944,1.194800658179335,9.298539634806813,31.814691035887705,29.646131670421987,24.398044606245044,15.796741984752057,15.964239142133103,18.310565861514522,38.1747076820228,57.293540559089756,71.22676730086891,14.849236477134255,58.32284305497129,41.9939577784111,19.49321102935646,16.033772329923373,34.75782195056284,22.084891988321473,18.72403468288183,34.559800305165766,70.77251311174612,20.82688991748438,74.90199366337748,58.91183345202311,12.014368358541844,68.12588313994763,10.47405321829097,23.457882806651476,40.480912013713585,15.443975792356348,21.452328573292732,18.607927949605806,33.79921987874004,43.2878590120379,19.401978887519217,6.578772579137457,63.67824116452283,55.9171820644051,17.48700804153326,39.79302877091275,19.485360279685352,12.885829365435958,41.77196855438834,11.387728765129138,40.23450093681896,53.992772405498535,29.3511594221956,34.156080965845746,8.715077600880749,28.283959003835697,30.21415280840636,20.54697994747119,3.780595908631697,72.66603725549892,10.155955089690162,15.764362802061816,53.820027676130664,71.15733737571183,16.51537981202864,13.929772447272102,61.32830550266273,29.60223847823366,30.26440820092293,12.934696311529214,16.688441550507097,23.362160060961617,1.3596469593168052,35.82542512208168,9.856466847800416,47.134989440382064,23.633700245046874,7.902177114203013,81.0156287387532,26.871190557903255,13.704936266286541,37.965727154561094,36.79167408721265,20.252715584683425,32.47605661507476,28.779278482717785,16.947723393662372,13.317167840093425,48.65209813922578,49.499254172546145,81.09462554694434,5.067344699964505,57.81692163051776,45.60302934401572,36.01005585743191,7.881785996009228,35.37656469917202,2.0,38.24719275656639,19.508139927420476,41.230262359590625,74.99778169503271,25.032454634494755,47.04262901403625,24.31946848585597,54.59928402020869,14.190817566449676,22.72966554502184,4.104066367918658,44.22639243677503,31.070538810926625,10.222589319312558,31.662498556880745,52.96043245371367,35.36361325144261,40.9887231162607,23.540665477805966,12.768337033831815,40.51149515099672,19.172830377523148,50.95289605325481,7.895015025163396,23.98737735019027,11.249319934789511,13.678428225834521,33.54158832611864,11.535577308457459,17.02778425813692,19.317173246586712,38.369867336852806,23.473795792134222,5.0149920796412655,35.21723424392847,66.62492675594046,64.4491434707551,20.605018030495096,12.812446926698053,11.440444977461866,19.70057508289682,11.04005642179694,25.66467245468843,18.15638044017341,48.213866737606985,67.21327440387083,35.18558364851694,39.73482680744476,54.11932713122213,6.781219096655136,58.51415609490976,44.31406131940432,27.37858561944617,13.61157367175409,81.31573781308475,23.43472688929426,6.0013573712987665,29.041012069807394,53.72547502472368,19.94402010327324,26.597058939286367,36.89013263427766,5.851868857365599,21.10849802303651,21.206827710473238,19.931122116702706,15.428953706039062,66.08058765564803,31.823114078736854,28.0034452297242,41.444814685995205,33.25906464891142,61.62988305205805,34.7349004894096,18.59044303205219,61.039316687727705,35.184277504642175,39.18864788527011,20.205270586904742,34.7972999111897,50.77926255491073,23.29284803304362,19.303387055107557,61.731043223577345,19.45163037191895,40.41563765127257,31.684148628064868,13.708164621359114,58.79612506073835,41.36086547594708,18.48502059141985,34.246007304235874,30.82428607338043,48.777660457306325,76.59641854039128,16.685736836428532,23.636767147658126,63.79497413298746,5.683681467129636,31.88367506108474,73.67472254944147,54.26631274111235,11.50415225216238,23.004072896658986,23.2991021941229,2.7699644899351306,9.265362003839149,36.023103017066234,36.147324589111996,15.570190143246434,16.49907489114396,9.327112974495348,45.795460953103536,21.283283819286993,28.270857506722336,30.386287742570488,22.353825376699724,72.16278594255039,6.515008768021724,6.118804042892357,22.361418396720072,76.58276277575227,21.329476674590797,67.70516464443234,30.411074211559303,57.31154118664559,30.411323395920313,51.80250198126158,63.71267726906321,52.79261889701017,35.303559796706665,23.07353840029287,61.69451776532847,4.143637814576625,21.2116025123654,31.560981540412985,5.994056414598865,21.6945679865199,34.06372892743071,42.56678558178593,56.793894959012455,44.62150426951863,63.76639856362925,8.013614133898127,18.041442163331027,20.412436554108613,25.1751258539954,57.19081066255989,39.16583430127527,18.659797662262147,2.9386257962402054,29.076135481506896,62.31602748052583,34.050732986331795,75.97852260315783,85.22916367075555,43.58283120999225,40.9454531890322,13.316686790484372,27.62840276273249,28.748327487136297,37.33300209698285,7.454519956469747,35.10176094157235,22.6936606936643,57.94239273073912,21.77781181763863,39.44361683734613,15.660281340214292,57.8691984476328,39.92100302916339,8.662475779113946,55.582007407390655,35.24279101031958,21.751243868865934,21.168511655252864,18.127368878773357,10.540747456728509,32.77034906193636,21.375771820686502,10.586855858074195,74.1553018132173,29.156994592313207,34.24555170872691,15.778594376489657,4.2064377758818114,39.30218679372594,30.225698421577736,25.164749334976833,29.102959665898936,30.421713222211984,58.30843467775015,60.64106093851013,21.737307974846107,14.052993836363903,8.184183278031504,45.961188551183376,41.989777102802115,45.88230559555756,48.18353307930661,15.721684976599558,93.65792996041493,50.87942356032474,49.005952930636,19.00591636068479,2.9078415671700957,40.81590952170391,22.04760917776307,65.72344296544466,17.52480046660794,25.54561814167442,40.05711289615064,55.41134824925938,2.1274082327891977,75.26767978790014,34.782886447627725,4.037880217405819,17.145213906895556,8.641239115967101,18.914865496195418,32.27672438097413,30.821680340747232,17.165743914922807,79.98678122852542,27.612432849523692,60.751888583551356,2.638518870152553,4.528387389406863,28.208799110868902,28.222793087841463,18.388945924513184,15.46269535503015,26.353859966973076,76.57206341931273,1.9510379329390382,63.49618552963035,19.582329152980023,27.60560846818181,53.509399668336805,29.265471892279475,22.98425475471234,44.63599858407892,3.483341322822435,47.92719628187004,19.142762117520036,43.49187604913666,18.367347214433657,20.258831676221746,66.57543338773816,45.50835271409144,13.277883676081592,45.13698590991625,24.302395095299268,14.007323869795183,43.9314416311386,39.073816382241915,50.8509350176188,49.284413752058384,85.90094955105832,13.0,20.01983139777358,43.20103440196763,41.8568909775192,4.763458439631028,57.471881829279624,66.64112815266282,28.181731271000185,32.34363683906966,17.10358589882273,79.51154516140329,34.80091588310172,4.998151636897802,62.45519325001932,11.443062210465403,11.0,16.97074249297575,39.599852775748225,32.13888912705771,14.08645359333448,5.820806534689536,15.328619622835737,20.44586976384856,18.563414081033752,18.62599583401103,16.187445582302697,7.23554525747188,48.155680178161624,7.19717064945547,18.665519451049747,69.78188527049278,14.957582726941682,31.134489493079567,28.470225105454922,37.228469500737454,9.559647284939551,30.02432230461456,6.781918506906799,17.918671181784468,3.0,17.766194387244866,14.700398272830979,13.463951321121986,5.84126809500191,9.850715708482676,20.600673434560804,22.732322082438298,24.98295670614311,63.10803501740543,41.25786946535654,12.14346054856455,55.40496774018115,16.0,23.547521464704914,52.165095724469666,4.196404739903445,18.09656255294393,66.05242329986734,17.112482707207718,13.342701893467822,15.089152274620684,35.41537643438837,29.54934493883269,66.59555284907341,8.019013156631384,21.47678108409035,17.09637805122228,6.107431476296274,10.55914807672794,19.41342041544705,18.19265607455919,20.73266136045219,27.04133236130718,32.31093463759648,20.793254450230535,20.772571793081653,40.717628433435124,17.15570757106327,17.759903792373393,12.732328854324468,27.18154653509824,30.093755900923476,39.5539978880832,32.67854608406779,11.796994442075128,19.113930069214973,12.341889324588237,11.792379674739028,42.563295075599356,30.320771923580956,12.442111294842984,82.73718154507354,46.696898057458895,39.96658904286477,17.441302794667834,46.224532524233275,32.25148991818449,20.370620633965437,33.84750146630119,13.362079241496597,26.011741861433876,24.27643572677662,41.63479735346637,38.8583120005719,11.509058921297374,18.364410989362245,16.41996025626989,4.8712765263245235,27.043503042607576,15.268275135069507,25.6939511194494,37.63274118334727,73.45833387198503,29.26610599311982,15.431318147581582,43.89171591386639,64.84339840230845,49.19982471361403,34.41121790752689,31.01345169217958,12.787349648750357,37.15669452345776,8.378766662998812,12.271302471129506,29.229661216020972,26.692739676388328,19.09462549105261,40.763962084674795,46.898192175141254,24.535424502692333,12.33861432469839,14.708600706320581,17.045813335144633,8.75403070230118,65.47529165491004,53.14269632613687,24.899913003171882,42.43055553820227,71.6189861229733,16.638015722762816,10.978883337983579,20.12606158988899,16.12962255890121,27.458201381209083,21.729345842714828,26.650506959227137,48.06368724234006,64.32987598495788,39.871714659692074,51.25347020257755,21.128517225767713,36.46041971475462,21.213188319630056,68.12970188937012,23.557022506073167,9.550346155550985,35.17961620850834,33.31302779374525,23.952053116574746,23.89114555035841,82.09318848583202,67.48322039617562],"b":[77,46,7,51,71,56,67,11,23,30,37,31,65,73,87,69,46,69,20,89,45,26,70,86,83,38,75,45,93,37,28,48,26,73,86,25,52,95,44,69,86,56,36,84,14,36,55,84,63,16,33,23,61,42,6,70,81,77,15,54,26,74,5,63,40,10,75,20,73,86,59,85,11,52,71,60,36,82,9,87,61,76,35,54,90,22,73,20,49,31,84,78,36,87,16,72,55,71,44,63,80,78,75,83,59,41,77,54,80,48,85,18,80,20,16,85,65,64,57,59,61,65,75,76,20,49,35,16,10,81,61,52,50,65,73,52,58,24,43,18,13,77,75,31,16,66,73,50,16,77,33,95,80,82,47,71,32,54,60,24,90,87,76,18,10,24,69,23,86,59,15,66,64,36,51,52,28,48,78,25,50,79,99,42,73,15,89,24,77,81,85,21,59,83,24,44,28,52,44,29,31,81,52,43,62,84,47,61,27,31,49,54,67,55,87,46,21,37,64,69,41,41,82,39,68,68,75,48,67,81,59,62,56,44,85,84,42,50,25,46,57,93,83,31,79,41,23,64,79,11,69,61,43,28,12,81,81,80,45,19,11,63,36,19,81,36,16,58,76,80,23,67,33,21,46,73,31,46,38,59,85,38,67,66,92,73,26,43,85,58,70,76,73,45,67,33,34,94,74,42,73,24,42,32,89,46,23,60,68,51,26,69,72,73,82,38,23,70,33,71,13,34,75,69,14,62,68,10,26,30,68,58,96,62,22,93,92,51,73,77,39,68,12,15,75,79,20,73,81,6,44,75,76,55,26,69,71,25,71,48,17,28,28,71,14,57,67,31,39,8,28,21,56,47,98,4,11,12,80,9,54,8,14,36,82,59,30,55,39,26,70,68,75,59,14,44,31,58,87,64,58,41,80,85,68,52,23,84,23,42,76,22,52,51,35,31,20,32,28,54,60,86,77,20,6,58,65,78,86,59,46,63,62,39,66,69,61,38,38,24,88,15,27,54,40,30,68,79,63,15,87,91,12,54,24,12,18,78,57,62,51,17,47,39,62,87,12,74,35,34,82,10,56,92,10,61,14,35,61,68,37,41,57,32,12,11,55,6,56,35,33,43,85,26,42,43,84,72,31,81,68,23,37,38,40,27,75,74,36,88,63,27,72,73,45,68,73,47,19,34,75,42,53,65,83,74,87,20,16,48,15,47,79,32,40,36,33,36,61,67,85,23,22,66,77,30,17,70,48,50,16,17,25,33,83,69,53,24,25,95,56,59,43,62,21,49,50,36,14,66,66,93,9,89,64,50,37,79,2,51,60,47,80,42,55,27,56,51,44,6,48,36,15,82,75,74,87,29,16,77,27,67,53,26,17,60,55,81,52,21,74,24,56,37,82,70,46,15,36,23,35,63,20,80,91,57,70,76,10,64,61,46,18,83,27,7,55,72,21,62,45,13,26,41,20,17,92,52,94,52,48,73,65,55,83,47,54,56,82,69,33,44,70,30,86,77,47,66,50,35,63,97,57,84,20,36,78,41,43,87,71,27,29,27,24,13,69,42,16,26,74,80,81,48,41,49,84,14,12,71,91,72,76,80,80,31,64,67,59,83,69,85,8,26,40,75,25,43,70,59,82,86,43,19,53,80,59,49,23,5,40,68,53,88,87,61,46,40,28,76,78,18,65,28,70,69,46,17,77,55,27,90,48,78,39,78,14,58,48,22,76,95,45,21,58,86,43,47,48,58,59,85,58,43,9,46,77,70,66,25,99,85,64,20,4,52,68,93,59,66,43,73,79,78,37,9,50,15,22,41,33,51,89,39,63,20,21,54,96,40,23,29,82,15,82,20,31,69,30,81,67,8,75,23,60,31,33,75,67,17,67,32,15,54,65,76,61,88,13,45,48,89,24,86,98,46,70,27,97,63,27,80,23,11,18,42,37,81,6,17,54,39,20,31,11,54,14,32,72,15,63,40,39,71,56,31,59,3,45,21,25,14,30,22,47,37,74,74,41,61,16,42,84,11,50,68,71,20,23,67,85,83,53,66,22,28,24,48,55,84,35,42,56,36,73,33,72,29,33,34,46,50,20,31,75,13,67,31,15,93,66,69,55,47,48,29,79,17,36,25,45,77,12,23,37,42,51,18,27,92,78,57,16,50,79,50,43,34,37,57,16,66,39,27,40,46,74,31,33,17,59,11,68,75,28,57,74,32,26,26,22,91,33,42,52,76,43,83,78,41,77,80,30,10,40,48,60,25,95,90],"a":[8,10,3,11,7,6,4,4,15,11,1,10,8,1,19,17,7,5,2,20,3,10,17,7,16,12,5,9,17,18,20,10,14,3,8,2,18,16,9,10,19,13,17,8,3,6,5,7,1,2,5,17,7,15,0,10,13,2,2,11,13,12,4,3,12,8,2,13,1,12,18,5,9,16,3,1,19,4,5,16,11,0,5,18,19,10,2,5,9,0,19,13,13,17,1,19,20,7,18,16,7,2,13,17,15,7,6,9,10,3,13,18,10,2,11,14,1,6,7,15,6,9,11,12,12,15,19,12,7,19,1,3,6,8,7,20,13,6,11,4,11,2,0,2,7,17,18,9,11,2,3,16,8,19,4,9,1,11,17,15,14,8,19,10,5,14,13,11,10,13,15,7,17,17,17,5,5,6,0,19,3,1,19,9,16,1,12,7,8,6,11,3,18,5,11,1,6,20,13,3,15,2,4,11,13,13,19,10,13,10,6,1,0,5,14,19,18,15,1,5,13,6,14,15,9,7,11,4,2,14,14,11,16,11,13,6,17,3,15,5,1,18,8,19,2,0,17,12,15,6,9,4,20,4,8,5,6,19,2,9,8,8,17,7,13,12,11,19,0,7,8,13,10,3,13,15,0,10,9,16,5,3,6,11,18,16,11,14,17,2,15,7,16,9,10,3,8,19,15,18,19,17,12,17,13,14,9,1,10,14,16,9,0,9,18,4,7,11,5,13,11,18,2,12,2,15,6,4,4,6,12,11,19,19,12,20,17,18,17,16,13,1,10,9,8,14,6,14,17,2,11,10,2,16,1,2,4,12,3,12,14,19,10,7,9,8,1,19,14,5,2,10,20,5,20,1,2,8,16,9,11,4,8,3,14,15,12,10,1,13,14,19,9,15,8,18,13,18,10,18,14,1,9,6,0,6,7,5,12,16,2,18,15,8,10,11,5,13,3,6,10,7,14,16,3,2,16,16,14,17,16,8,4,15,18,5,3,17,18,2,14,6,10,13,15,19,4,3,13,10,16,13,3,0,18,4,17,19,2,16,5,2,5,1,16,12,4,9,14,18,15,9,18,12,9,17,0,13,1,5,5,11,10,13,10,1,8,1,0,1,19,15,10,10,11,17,9,11,14,3,7,10,3,14,13,8,14,1,5,14,15,8,18,6,13,15,14,11,18,19,15,14,3,7,13,17,11,19,10,7,8,3,8,18,7,8,1,8,7,2,18,6,15,1,14,4,13,8,5,1,6,0,20,1,14,0,7,14,3,16,16,1,7,19,19,2,9,4,5,3,9,17,5,13,9,12,7,13,2,6,4,14,0,1,17,17,16,1,19,2,19,5,5,15,1,2,19,3,8,3,14,11,1,8,6,6,10,5,16,16,16,12,3,7,9,3,4,4,1,13,4,9,12,19,18,14,7,17,6,7,18,17,12,6,13,4,14,6,17,4,7,5,15,3,19,2,20,8,19,4,13,18,18,3,7,0,14,3,15,11,19,16,10,2,10,18,4,17,17,7,11,20,14,9,5,14,4,5,20,14,1,4,6,7,1,8,6,0,14,2,1,10,3,17,15,11,9,0,6,2,19,3,20,18,15,17,11,12,17,14,17,14,1,7,12,4,11,7,20,11,11,6,4,14,7,5,14,10,13,2,10,4,7,11,12,8,19,4,15,6,1,5,6,15,10,13,16,3,18,12,5,15,8,9,9,6,2,3,11,5,18,19,19,11,2,7,1,7,2,16,1,5,20,14,8,7,18,11,6,13,19,17,14,19,2,7,6,16,16,5,11,4,0,9,15,1,6,2,16,15,12,13,19,18,2,1,3,11,20,2,14,15,20,0,15,1,4,8,4,5,5,0,15,1,6,4,15,17,1,11,11,6,12,12,12,4,9,9,13,14,19,18,3,6,20,0,17,5,20,16,4,5,1,11,3,6,18,14,5,5,1,17,18,13,5,9,7,10,20,2,6,4,20,9,10,3,1,3,6,12,4,3,6,20,6,8,15,19,5,15,16,7,18,4,13,8,15,2,10,14,13,5,6,14,6,6,4,1,12,7,5,6,14,9,14,17,11,8,18,7,12,15,7,1,5,2,16,3,11,18,6,8,15,11,13,6,8,7,18,20,10,2,8,13,8,4,5,5,17,17,4,16,15,3,20,15,11,16,8,4,1,1,16,13,16,14,14,20,1,5,13,5,19,11,5,16,19,8,10,11,5,19,19,7,15,12,19,18,19,10,1,17,13,8,3,14,16,17,20,13]}
},{}],41:[function(require,module,exports){
module.exports={"expected":[-0.916290731874155,-1.1939224684724346,-2.917770732084279,-2.6026896854443837,-1.3862943611198906,-1.8870696490323797,-0.6931471805599453,-1.0986122886681098,-0.6931471805599453,-0.8472978603872037,-2.001480000210124,-0.7801585575495751,-1.1451323043030026,-0.7731898882334817,-0.6931471805599453,-1.4469189829363254,-0.13976194237515874,-0.2318016140573243,-0.13353139262452263,-0.2513144282809062,-0.12783337150988489,-1.252762968495368,-0.09531017980432477,-0.6931471805599453,-0.40546510810816444,-0.9028677115420143,-0.916290731874155,-0.2513144282809062,-2.6026896854443837,-0.12260232209233227,-0.2876820724517809,-1.3609765531356008,-1.1939224684724346,-0.12516314295400605,-1.0296194171811583,-1.9459101490553135,-1.3217558399823195,-0.4626235219481132,-1.8325814637483102,-0.45198512374305727,-0.9007865453381898,-2.367123614131617,-0.38566248081198456,-3.044522437723423,0.0,-0.2876820724517809,-1.7578579175523736,-0.3184537311185346,-1.3862943611198906,-0.19782574332991992,-1.2992829841302609,-0.5978370007556204,-2.456735772821304,-0.7537718023763802,-1.3862943611198906,-0.7472144018302211,-0.2231435513142097,-0.08004270767353637,-0.6286086594223741,-0.5596157879354228,-0.6931471805599453,0.0,-1.6094379124341003,-0.18232155679395473,-0.5108256237659905,-0.05715841383994864,-0.1112256351102245,-2.2512917986064953,-1.5040773967762742,-1.0498221244986776,-0.40546510810816444,-0.4769240720903093,-2.3025850929940455,-0.08338160893905101,-0.09844007281325252,-0.6690496289808848,-0.9985288301111273,-0.2595111954850847,-0.6931471805599453,-0.2006706954621511,-0.7731898882334817,-0.2006706954621511,-0.5389965007326871,-1.178654996341646,-0.40546510810816444,-1.9459101490553135,-1.3862943611198906,-1.9459101490553135,-0.2231435513142097,-0.3150810466398952,-0.33647223662121306,-1.2809338454620642,-0.22314355131420985,-1.1895840668738362,-0.7205461547480597,-1.8718021769015913,-2.3978952727983707,-0.2363887780642304,-1.791759469228055,-0.6931471805599453,-0.13353139262452263,-1.897119984885881,-0.07696104113612844,-0.8232003088081431,-0.6931471805599453,-1.128465251817791,-1.056052674249314,-1.6863989535702286,-0.2876820724517809,-2.001480000210124,-0.7308875085427924,-0.2231435513142097,-0.916290731874155,-0.6931471805599453,-1.791759469228055,-1.3862943611198906,-0.6225296133459919,-0.9903987040278769,-0.2411620568168881,-2.6026896854443837,-0.44802472252696035,-0.4462871026284195,-0.7537718023763802,-0.832909122935104,-0.33647223662121306,-0.8574502318512216,-1.6094379124341003,-0.33024168687057687,-0.5725191927713306,-0.916290731874155,-0.9903987040278769,-1.8562979903656263,-0.7282385003712155,-0.13353139262452263,-0.6931471805599453,-0.23052365861183238,-0.2876820724517809,-1.1856236656577395,-0.8209805520698302,-3.367295829986474,-0.5108256237659907,-0.534082485930258,-0.2876820724517809,-0.2451224580329851,-0.8472978603872037,-0.6443570163905132,-1.6094379124341003,-0.37948962170490386,-0.34484048629172964,-2.6741486494265287,-1.4759065198095778,-0.6931471805599453,-0.6931471805599453,-0.13353139262452263,-0.08701137698962981,-0.9808292530117262,-1.6094379124341003,-0.2876820724517809,-0.7221347174331976,-0.9007865453381898,-1.916922612182061,-1.6739764335716716,-0.40546510810816444,-0.027398974188114388,-2.4849066497880004,-0.07410797215372196,-0.3677247801253174,-0.40546510810816444,-0.9343092373768334,-1.791759469228055,-0.1466034741918754,-0.916290731874155,-0.40546510810816444,-0.4353180712578455,-0.1758906664636643,-1.0116009116784799,-2.772588722239781,-0.40546510810816444,-0.7419373447293773,-0.5596157879354228,-1.0986122886681098,-0.40546510810816444,-0.048790164169432056,-1.157452788691043,-3.044522437723423,-0.6931471805599453,-0.1758906664636643,-0.05406722127027582,-0.8873031950009028,-0.9382696385929304,-1.6094379124341003,-0.2876820724517809,-1.252762968495368,-0.3813675565291038,-0.2744368457017603,-0.16705408466316607,-0.6931471805599453,-1.0414538748281612,-1.5198257537444133,-2.0794415416798357,-0.2231435513142097,-0.2231435513142097,-3.6375861597263857,-0.3184537311185346,-0.7621400520468967,-0.7537718023763802,-0.7205461547480597,-0.5533852381847865,-1.466337068793427,-2.0794415416798357,-0.6931471805599453,-0.084557388028063,-0.6931471805599453,-0.9808292530117262,-0.10008345855698265,-2.1972245773362196,-0.6931471805599453,-2.995732273553991,-0.40546510810816444,-0.6931471805599453,-1.0986122886681098,-0.5753641449035618,-0.9444616088408515,0.0,-0.6286086594223741,-0.7444404749474958,-0.8556661100577201,-0.6466271649250526,-3.295836866004329,-0.6931471805599453,-3.58351893845611,-0.916290731874155,-0.2336148511815052,0.0,-0.21622310846963608,-0.5819215454497209,-0.09531017980432477,-0.40546510810816444,-1.0986122886681098,-3.5553480614894135,-0.2876820724517809,-1.3350010667323402,-0.2231435513142097,-1.0116009116784799,-0.1112256351102245,-2.639057329615259,-3.367295829986474,-0.661398482245365,-0.23841102344499823,-0.1112256351102245,-0.2231435513142097,-1.2809338454620642,-0.5108256237659905,-0.6931471805599453,-0.40546510810816444,-0.7472144018302211,-0.33647223662121306,0.0,-0.40546510810816444,-1.6650077635889111,-0.9555114450274362,-1.203972804325936,-0.08701137698962981,-1.252762968495368,-0.6286086594223741,-1.1939224684724346,-0.3136575588550415,-0.09844007281325252,-1.8325814637483102,-0.2876820724517809,-0.2876820724517809,-0.3877655310087636,-0.2876820724517809,-0.3053816495511819,-0.5978370007556204,-0.7801585575495751,-0.6061358035703156,-1.203972804325936,-0.78845736036427,-2.3513752571634776,-0.5663954749208016,-0.1431008436406733,-1.9459101490553135,-0.5596157879354228,-1.1451323043030026,-0.5108256237659905,-0.8823891801984738,-0.6931471805599453,-0.916290731874155,-0.03509131981127017,-0.08004270767353637,-0.9808292530117262,-0.6931471805599453,-0.48550781578170077,-0.15415067982725836,-0.22957444164450025,-1.0116009116784799,-0.6567795363890705,-0.4700036292457356,-1.0986122886681098,-1.5686159179138452,-0.8472978603872037,-0.40546510810816444,-0.48550781578170077,-0.8472978603872037,-0.916290731874155,-0.40546510810816444,-0.21357410029805904,-0.3417492937220567,-0.8023464725249373,-0.40546510810816444,-0.18232155679395473,-0.06899287148695143,-0.8472978603872037,-1.540445040947149,-0.6061358035703156,-0.6061358035703156,-0.6931471805599453,-0.12260232209233227,-2.3025850929940455,-0.8109302162163288,-2.03688192726104,-0.5108256237659905,-0.027398974188114388,-0.7621400520468967,-1.791759469228055,-0.15415067982725836,-0.2876820724517809,-2.0794415416798357,-2.5649493574615367,-1.5841201044498106,-1.7047480922384253,-0.2876820724517809,-1.0986122886681098,-0.2744368457017603,-0.3053816495511819,-1.0296194171811583,-0.3566749439387323,-1.791759469228055,-0.048790164169432056,-0.35667494393873245,-0.2513144282809062,-0.040821994520255166,-0.6931471805599453,-1.1394342831883648,-1.252762968495368,-0.262364264467491,-0.5978370007556204,-0.7621400520468967,-0.7472144018302211,-0.06899287148695143,-0.11778303565638351,-0.2876820724517809,-0.3184537311185346,-0.48550781578170077,-0.25593337413720063,-0.08004270767353637,-1.6094379124341003,-2.772588722239781,-0.40546510810816444,-0.570544858467613,-0.5389965007326871,-1.126011262856224,-0.8649974374866046,-0.38299225225610567,-0.24362208265775043,-0.8979415932059586,-0.587786664902119,-1.9810014688665833,-2.0794415416798357,-0.2876820724517809,-0.9343092373768334,-2.70805020110221,-1.2729656758128873,-1.4469189829363254,-0.6931471805599453,-0.8574502318512216,-1.0986122886681098,-0.27958486221916157,-2.4849066497880004,-0.20359895524123955,-0.40546510810816444,-0.8303483020734304,-1.8325814637483102,-0.35667494393873245,-1.3121863889661687,-1.0296194171811583,-0.6931471805599453,-1.2809338454620642,-1.8458266904983307,-0.3646431135879093,-0.3894647667617233,-1.4469189829363254,-0.10536051565782628,-0.8266785731844679,-0.15415067982725836,-0.15415067982725836,-0.6931471805599453,-0.6061358035703156,-1.7429693050586228,-0.1625189294977748,-0.8754687373539001,-1.349926716949016,-0.4754236967150746,-0.6931471805599453,-0.34830669426821587,-1.0986122886681098,-0.12516314295400605,-0.2876820724517809,-0.07696104113612844,-0.6505875661411494,-0.31237468504215243,-1.0986122886681098,-0.192371892647456,-0.6931471805599453,-0.7537718023763802,-0.3894647667617233,-0.37156355643248296,-0.44802472252696035,-0.916290731874155,-0.1431008436406733,-0.18232155679395473,-2.3978952727983707,-0.9555114450274362,-1.5040773967762742,-0.6931471805599453,-0.6931471805599453,-0.916290731874155,-0.1292117314800062,-3.295836866004329,-0.26236426446749117,-0.13976194237515874,-0.2513144282809062,-0.9808292530117262,-0.40546510810816444,-0.33024168687057687,-1.6094379124341003,-0.5753641449035618,-2.6026896854443837,-0.18232155679395473,-0.2876820724517809,-0.4307829160924542,-0.050010420574661305,-1.3350010667323402,-1.0414538748281612,-2.3025850929940455,-0.05406722127027582,-1.0116009116784799,-0.37948962170490386,-0.916290731874155,-1.8870696490323797,-0.13353139262452263,-1.3862943611198906,-0.262364264467491,-1.2992829841302609,-0.6931471805599453,-0.2006706954621511,-0.3566749439387323,-0.6931471805599453,-2.277267285009756,-0.78845736036427,-1.637608789400797,-1.0986122886681098,-0.6418538861723948,-0.3610133455373305,-0.3746934494414107,-0.40546510810816444,-0.8690378470236096,-0.6931471805599453,-0.18232155679395473,-3.295836866004329,-1.0116009116784799,-0.6466271649250526,-0.5533852381847865,-0.40546510810816444,-0.7205461547480597,-2.2512917986064953,-0.40546510810816444,-1.203972804325936,-0.2876820724517809,-0.060624621816434854,-0.916290731874155,-0.2876820724517809,-0.5520685823000397,-0.8472978603872037,-0.9808292530117262,-0.5108256237659905,-2.8622008809294686,-1.0116009116784799,-0.9694005571881035,-1.3862943611198906,-2.639057329615259,-0.30010459245033816,-0.45953232937844024,-0.8266785731844679,-1.8245492920510458,-0.40546510810816444,-0.14842000511827333,-0.9808292530117262,-0.8873031950009028,-0.6931471805599453,-2.159484249353372,-0.37948962170490386,-0.6931471805599453,-0.4700036292457356,-0.6931471805599453,-0.03278982282299084,-0.09531017980432477,-1.074514737089049,-1.749199854809259,-0.060624621816434854,-0.2231435513142097,-0.2231435513142097,-0.6931471805599453,-0.2411620568168881,-1.5198257537444133,-2.456735772821304,-0.06252035698133393,-0.4895482253187058,-0.3566749439387323,-0.7537718023763802,-0.42488319396526597,-0.9903987040278769,-0.1431008436406733,-0.78845736036427,-1.3862943611198906,-0.3184537311185346,-0.5389965007326871,-0.661398482245365,-0.3877655310087636,-1.2992829841302609,-0.4274440148269396,-0.78845736036427,-1.2321436812926325,-0.1743533871447778,-0.2411620568168881,-1.1526795099383855,-1.0986122886681098,-0.07598590697792199,-0.2336148511815052,-0.4626235219481132,-0.6931471805599453,-1.3862943611198906,-1.1631508098056809,-0.1758906664636643,-1.3862943611198906,-0.27625337662815824,-0.5020919437972361,-0.6931471805599453,-0.6931471805599453,-1.252762968495368,-2.833213344056216,-0.2231435513142097,-0.78845736036427,-0.025317807984289783,-0.6931471805599453,-0.5108256237659905,-0.42121346507630353,0.0,-1.6739764335716716,0.0,-0.11778303565638351,-2.1400661634962708,-0.6931471805599453,-2.120263536200091,-0.19105523676270922,-1.3862943611198906,-0.2231435513142097,-0.2231435513142097,-0.40546510810816444,-0.8472978603872037,-0.579818495252942,-0.6931471805599453,0.0,-1.3862943611198906,-0.6931471805599453,-0.2578291093020998,-0.03278982282299084,-0.9903987040278769,-0.37948962170490386,-0.8754687373539001,-0.40546510810816444,-1.0986122886681098,0.0,-1.6094379124341003,-1.0116009116784799,-0.08004270767353637,-0.4382549309311553,-1.7047480922384253,-0.10536051565782628,-2.0794415416798357,-0.08223809823697212,-2.0476928433652555,-1.4170660197866443,-0.137201121513485,-2.3513752571634776,-0.4795730802618862,-1.0986122886681098,-0.13353139262452263,-0.2513144282809062,-0.2006706954621511,-0.456758402495715,-0.916290731874155,-0.7444404749474958,-1.488077055429833,-2.833213344056216,-1.540445040947149,-1.2878542883066382,-1.8718021769015913,-0.20972053098206903,-0.6931471805599453,-0.22957444164450025,-1.8325814637483102,-0.40546510810816444,-0.7621400520468967,-0.44183275227903934,-2.9444389791664407,-0.40546510810816444,-0.5725191927713306,-1.5314763709643884,-0.2876820724517809,-0.40546510810816444,-1.3545456628053103,-0.6931471805599453,-2.772588722239781,-0.05129329438755046,-1.178654996341646,-1.252762968495368,-0.8109302162163288,-0.456758402495715,-0.8754687373539001,-0.9490805546971459,-0.3566749439387323,-0.6592456288842639,-0.6931471805599453,-0.2231435513142097,-0.4274440148269396,-1.6739764335716716,-0.10536051565782628,-0.587786664902119,-0.1112256351102245,-1.252762968495368,-0.1625189294977748,-0.7375989431307791,-0.3313571359544425,-0.1466034741918754,-1.2685113254635072,-1.5260563034950494,-0.5389965007326871,-1.6094379124341003,-0.25593337413720063,-0.5389965007326871,-0.5389965007326871,0.0,-0.8023464725249373,-2.512305623976115,-0.3930425881096072,-1.2321436812926325,-1.0986122886681098,-0.11778303565638351,-2.2512917986064953,-0.37156355643248296,-0.5596157879354228,-0.916290731874155,-0.7375989431307791,-2.3978952727983707,-0.08223809823697212,-0.5108256237659905,-0.7375989431307791,-0.7731898882334817,-1.0216512475319814,-0.6592456288842639,-0.11778303565638351,-0.6325225587435105,-1.3862943611198906,-0.055569851154810654,-0.916290731874155,-1.6094379124341003,-1.9459101490553135,-1.0986122886681098,-0.40546510810816444,-0.2876820724517809,0.0,-0.7621400520468967,-1.178654996341646,-0.6931471805599453,-0.39204208777602373,-0.08004270767353637,-0.456758402495715,-0.262364264467491,-2.538973871058276,-0.33647223662121306,-0.40546510810816444,-1.0986122886681098,-0.2006706954621511,-0.15415067982725836,-0.8602012652231114,-1.126011262856224,-0.2876820724517809,-0.78845736036427,-0.2682639865946794,-1.3862943611198906,-2.5649493574615367,-0.3813675565291038,-1.329135947279942,-0.8472978603872037,-1.252762968495368,-0.322773392263051,-0.4353180712578455,-1.7635885922613586,-0.15415067982725836,-3.5553480614894135,-0.6931471805599453,-3.091042453358316,-0.3746934494414107,-0.2231435513142097,-1.413693335308005,-1.203972804325936,-0.5108256237659905,-1.791759469228055,-0.916290731874155,-0.8109302162163288,-1.5314763709643884,-0.587786664902119,-0.34830669426821587,-2.0149030205422647,-0.6505875661411494,-0.6931471805599453,-0.5596157879354228,-1.5314763709643884,-2.3978952727983707,-0.9808292530117262,-1.0986122886681098,-2.159484249353372,-1.55814461804655,0.0,-0.5232481437645479,-0.23841102344499823,-1.1700712526502546,-1.6094379124341003,-0.6664789334777839,-0.6931471805599453,-0.8109302162163288,-0.9808292530117262,-0.6931471805599453,-1.329135947279942,-0.40546510810816444,-0.5108256237659905,-1.0986122886681098,-0.6286086594223741,-0.5596157879354228,-0.44183275227903934,-2.0476928433652555,-0.4228568508200336,-0.7985076962177716,-0.8602012652231114,-0.14842000511827333,-3.1780538303479458,-0.2113090936672069,-0.4626235219481132,-0.6931471805599453,-0.3429447511268303,-0.2876820724517809,-0.45198512374305727,-2.995732273553991,-1.0414538748281612,-0.2876820724517809,-0.32542240043462795,-0.916290731874155,-0.15415067982725836,-1.0414538748281612,-1.4469189829363254,-0.02985296314968116,-0.17185025692665928,-0.5596157879354228,-0.5306282510621704,-1.4816045409242153,-1.2685113254635072,-1.9740810260220096,-0.2231435513142097,-0.32158362412746216,-0.6931471805599453,-1.0986122886681098,-2.2335922215070942,-0.38566248081198456,-0.27625337662815824,-1.6094379124341003,-1.9459101490553135,-1.9459101490553135,-1.791759469228055,-1.1700712526502546,-0.21357410029805904,-0.7537718023763802,-0.916290731874155,-0.2231435513142097,-0.10536051565782628,-0.028987536873252298,-1.0296194171811583,-0.6225296133459919,-0.37948962170490386,-0.3677247801253174,-0.5465437063680698,-0.2231435513142097,-0.2876820724517809,-3.6375861597263857,-0.42121346507630353,-2.3025850929940455,-0.587786664902119,-0.14953173397096384,-1.8325814637483102,-1.178654996341646,-0.916290731874155,-0.37948962170490386,-0.05406722127027582,-1.2396908869280152,-0.2876820724517809,-0.20479441264601328,-0.10919929196499197,-2.1400661634962708,-1.0116009116784799,-3.58351893845611,-0.578077850775158,-0.5389965007326871,0.0,-2.639057329615259,-0.8266785731844679,-0.40546510810816444,-0.3677247801253174,-0.6649763035932491,-0.08701137698962981,-1.7047480922384253,-1.3862943611198906,-0.456758402495715,-1.8718021769015913,-0.3877655310087636,-1.6094379124341003,-0.9382696385929304,-0.14842000511827333,0.0,-0.916290731874155,-0.40546510810816444,-2.614959778036198,-0.2363887780642304,-1.5841201044498106,-1.0986122886681098,-0.025975486403260677,-0.916290731874155,-2.0794415416798357,-1.9095425048844386,-1.550597412411167,-0.11778303565638351,-1.4350845252893227,-0.0317486983145803,-1.0986122886681098,-0.15415067982725836,-0.40546510810816444,-0.4187103348581851,-1.5314763709643884,-0.916290731874155,-0.4700036292457356,-0.613104472886409,-2.0794415416798357,-0.11778303565638351,-1.0986122886681098,-0.6061358035703156,-0.37948962170490386,-0.8754687373539001,-1.0986122886681098,-0.322773392263051,-0.9808292530117262,-2.3978952727983707,-0.42488319396526597,-0.40546510810816444,-0.11778303565638351,-0.1941560144409575,-2.0794415416798357,-0.1743533871447778,-1.540445040947149,-0.6931471805599453,-1.0986122886681098,-1.2237754316221157,-0.8556661100577201,-1.0726368022648491,-0.20479441264601328,-1.6094379124341003,-0.2006706954621511,-0.9808292530117262,-0.6061358035703156,-0.6592456288842639,-1.4759065198095778,-0.9808292530117262,-1.252762968495368,-2.772588722239781,-0.8602012652231114,-0.6190392084062233,-2.890371757896165,-0.08004270767353637,-0.6931471805599453,-1.3350010667323402,-0.5232481437645479,-0.2876820724517809,-0.9555114450274362,-0.3566749439387323,-0.13353139262452263,-1.056052674249314,-3.5553480614894135,-1.3862943611198906,-0.21357410029805904,-0.2876820724517809,-1.9810014688665833,-0.2513144282809062,-0.10536051565782628,-0.587786664902119,-0.40546510810816444,-0.10178269430994236,-1.9924301646902063,-2.5257286443082556,-0.5947071077466928,-0.8472978603872037,-2.70805020110221,-1.3862943611198906,-3.0204248861443626,-2.0476928433652555,-0.4795730802618862,-0.7621400520468967,-2.772588722239781,-2.5902671654458267,-0.10536051565782628,-1.0986122886681098,-0.09531017980432477,-0.6592456288842639,-1.791759469228055,-0.2876820724517809,-0.34484048629172964,-2.9704144655697013,-1.9095425048844386,-0.6931471805599453,-1.0986122886681098,-0.12783337150988489,-0.17185025692665928,-0.6931471805599453,-0.5978370007556204,-0.8472978603872037,-0.27029032973991185,-1.575536360758419,-0.5020919437972361,0.0,-1.0986122886681098,-1.178654996341646,-0.3101549283038396,-2.995732273553991,-0.2411620568168881,-2.772588722239781,-0.03509131981127017,-1.916922612182061,-0.5978370007556204,-1.749199854809259,-0.09531017980432477,-0.3629054936893685,-0.5212969236332861,-0.5389965007326871,-2.0794415416798357,-0.7777045685880083,-0.6931471805599453,-2.1972245773362196,-0.1941560144409575,-0.40546510810816444,-1.8245492920510458,-2.0794415416798357,-0.06899287148695143,-1.791759469228055,-0.916290731874155,-0.6061358035703156,-0.18232155679395473,-0.7419373447293773,-0.060624621816434854,-0.7537718023763802,-0.587786664902119,-0.15415067982725836,-1.6739764335716716,-0.15415067982725836,-0.5978370007556204,-0.18232155679395473,-0.5306282510621704,-0.2513144282809062,-1.1314021114911006,-3.5553480614894135,-0.916290731874155,-0.3184537311185346,-2.6741486494265287,-0.2513144282809062,-0.2876820724517809,-0.33647223662121306,-0.613104472886409,-0.7537718023763802,-1.0459685551826876,-1.0986122886681098,-0.025975486403260677,-0.08701137698962981,-1.203972804325936],"x":[14.56638357492802,14.175822935272038,7.504630098178406,15.133313109401364,8.580326825038615,22.348764936749554,27.485637889215347,16.332943035490473,2.11138295905611,24.061489314619262,9.96378762373586,17.252628645713425,9.819408046095209,8.723998890084445,17.416675926824155,9.504467175699862,29.166125745149216,27.844247629314207,25.70601776292263,18.023938487206493,40.00855055044712,23.152695761954234,37.403154128028376,26.6224911252905,8.455793637094548,23.284060942328395,23.64463627335881,31.11995816861699,12.157747696368682,41.33002303299689,17.47747519763198,10.240337218249811,20.60932302794661,20.747885138162708,9.53811281812387,5.817673857285119,23.99532319901523,36.15424406626048,22.16308026714511,8.540554389687333,30.80752983998401,19.889990080024813,19.066902090802017,2.119865926514131,1.0,25.948438192937644,17.734369424287916,21.460757048488414,23.45858431260841,42.31756956874686,13.59713004605688,26.419615045429435,11.180323915182449,17.671577987381955,21.54694800877779,33.80266634160536,30.03779277568004,18.978769506719512,25.514488312490542,13.563855501751721,3.146695378946591,18.0,22.445981872143804,22.859705507787492,7.458523976659893,44.63312703384583,17.645765312381403,21.40506114235437,22.452071394734922,23.06975052830306,9.801830576864806,36.132145995289804,12.662447255826066,34.81777213346512,31.68370471846502,31.993891802767592,13.82116645893554,28.036128238946134,20.50670293912992,8.296820051113965,9.39507697304183,37.294046632294894,14.440439717058368,17.255051569789575,19.084772326706364,18.950101132906962,5.936946177847499,12.02880897742429,26.04345473050178,39.11872292352619,4.710800357326562,7.755647096424366,40.656027786622744,11.411523361553677,35.037987188603225,12.060684395659846,8.862891016203646,31.043006442874063,15.795986531117759,19.391473172566464,19.891448013329473,6.991823909714906,36.008262797406545,26.85799138918863,7.914944853323939,10.839674784518095,8.68055765157567,14.57765878841542,25.29646937837257,6.466477682052858,17.82262699226564,46.68303644613442,21.936243083311087,16.926175380805972,13.960964093716218,19.082063046807647,28.01245605126568,24.456123941469443,20.095953561775996,2.8569818356721557,22.73682856517088,20.16960549372067,17.823631122708353,12.093228717447776,21.13835079293214,26.952507112435782,15.366636254561264,26.705421508634085,29.110778095795762,20.49015326044426,24.1390477675845,22.29995848277207,27.18958744317682,30.969403422588414,4.080567224848945,41.01860200793428,23.84668019232906,26.49838343616213,17.49599900433165,17.725580991964108,21.277157561141514,27.418849654109003,22.321896390956876,24.55642069826021,28.41531797985992,20.886134959273672,5.096926105318511,45.953201581981645,20.179034635444182,11.797712938244377,15.809322055284238,16.1456448371218,12.133489151721161,18.996487327550362,34.169748290637514,19.642524471946274,10.351761240464887,20.735837761504694,21.541046568567857,31.514468897291017,12.927178658799047,16.011687039605654,24.377358931117957,47.25134675263719,2.7112145377320456,23.894137044260443,23.079771386620045,10.627636798031972,29.590016763087323,14.14870277919229,18.92855214566895,13.922039548350526,1.1762675188532596,20.150428129136184,40.16270239229881,4.3913819966451175,17.379134897240327,4.589437769444276,23.54666067071523,27.96723045111682,6.117093683023985,4.870098341894191,37.38547262935227,25.273784760665908,10.30984165555524,15.778395536392454,44.39149479122266,30.243767756014705,24.348147714230713,22.849667283494618,5.531360987872832,35.68818892553044,20.123600298832336,39.89121559515052,30.38806819737001,36.094864851426564,23.009142208273296,7.849677158343422,23.099022102751974,11.919536289375763,35.80787304438428,16.141434295614715,4.086008706913986,8.888864107748809,24.267188578260196,18.746143220433474,24.7924853149677,29.03937057525284,10.018013394160697,9.038613652750309,25.643398589249745,45.382764676520225,9.679362639878338,10.738592533512401,36.506249243196436,20.729158705976474,7.020185260982574,2.551797220256735,9.11281628087122,1.3917466537731975,15.140169687367452,13.586779924734042,30.580073239933565,20.0,17.553562076260434,24.283636216224636,24.193904820400093,23.265507852506474,1.2171682782873714,16.175608227063297,12.116174949808256,14.96833873398592,38.19974011912834,7.0,36.97640124974042,27.036694158520152,11.786772824352262,7.315566127639062,19.975692462417324,9.89338338550425,40.18819524114798,22.693034494079058,10.087170280491728,19.771486537522136,26.09633418981681,6.68325194364237,19.594458224117165,22.643062211038185,40.642569881231424,29.310466144938378,13.770941324025143,6.588731904220514,42.737261879490646,19.0845851413592,10.266046742167795,25.89121317550844,24.755959482193113,4.0,18.79143851951232,17.299236830955316,14.010285329004027,13.813962882388967,22.068108957707476,10.546116751285535,25.585414810122415,19.798511470107748,27.264720191378565,40.936465367121734,11.624841482919447,24.20496500702647,19.5889491085403,32.45074847171924,8.506258948007698,28.66618551522542,40.728155807218094,20.441082089652358,17.729001951791716,16.777501070208714,30.235572920627753,2.2387702913344167,33.0599274802605,13.206116980631979,9.98541892435487,20.918089716039685,14.379069214714791,12.29203347918581,17.282225441814873,10.035831923396337,5.374974793194392,44.311587623371715,41.77387911496154,18.085324987630482,21.62954940527328,32.12088981924822,7.718344179200788,36.01358271391633,24.28544664137214,15.825258591032783,15.534644499516826,18.169090268345645,22.109699424289875,22.142732851670115,42.698421590901134,27.17956697673821,30.748476399406393,14.973044916731348,2.6113854317107585,33.29559983105903,29.653541079070443,18.63439678120838,22.88929115189423,13.697184171658748,43.37944414136503,12.861225622724513,10.689011179975767,18.87434119392885,8.613610362634303,21.968706120722935,32.284143390043994,22.594838135113278,12.198222989400275,9.801156012073069,14.262909974785103,45.69870064039935,11.506689727794802,11.686949299669353,8.344580564177257,18.189324544737303,17.06629883079255,8.505552200861963,14.466643066597376,3.082726003053842,5.6220940932595305,14.455702708954673,27.386791474237587,20.173391866021536,17.43808810949524,28.91157242535521,11.638938586065436,32.430084439457296,34.8818691364185,35.15449590013171,27.532980680675625,20.189714533254875,9.481900424756152,11.38128466313594,28.40254506097554,10.852881590692213,22.858662787990383,22.929050286222783,33.851148958210516,15.096985803803113,18.01578161554553,9.105933620652785,25.784891375956892,35.467560148234085,15.827571265692512,13.569141544431432,12.449094436063664,9.679022780303498,26.792554088002163,25.110043316998947,12.701409438444355,14.70654218194524,22.84145617959804,39.76373629579682,18.270081275705245,17.395787695200518,3.315447974438821,4.536726260922515,26.30010298747667,16.69457709821539,4.077500560305893,19.270128164982573,5.820615047470795,21.012708459056054,22.798402962399656,19.534490879006523,39.359187243263705,11.692521902718754,36.006923804888444,14.24395536759293,32.15373878002791,4.154907999946214,36.5692117681155,8.712016481321864,14.350336322118984,6.172601249665233,7.948917967861041,19.17905721684897,32.970833132492416,31.78919317260219,12.041114515278956,26.77221718547832,26.934601029484696,19.08485637770184,11.809919350212267,1.4544202615799298,24.91420195360417,23.643051244362148,29.73699046752208,16.38293727042701,16.536312910154624,39.862233486119464,7.571014439911669,20.96207812808278,19.148834202773788,19.498134093785183,7.583775252871382,27.568884964046127,25.202162514021477,42.24780044883378,18.464503573594932,37.255727458286415,15.561708576048456,22.924774689504343,27.99419529412964,33.700150704728976,31.286383085094318,31.98456454265025,23.729823366779,17.27787040624532,5.576808741897281,20.12463663875281,5.943675555438575,13.758889181128776,7.75611510503642,6.353292531503844,37.09006120218938,12.524791333355514,30.51213274977687,39.662652840309,23.44537729409702,15.690579960272562,24.364863856602994,30.46573336795847,5.98793633817124,19.162496406169478,6.183094719938026,22.869975340862997,19.233681691871855,42.498379878052546,42.321349389068764,10.807682422092517,18.01639525871943,14.165101258095866,33.2131966476902,11.522495334999903,30.341528928803207,10.026271901148524,7.1114994051432205,31.950997331417724,15.080326744990721,11.85286719046504,10.486598664357764,6.280409634941874,25.528959952254517,32.37218547404619,5.536455958757289,5.560550367235139,17.05430812248968,17.559220847665287,19.03587123519576,17.94515242580401,37.42450719691904,25.992995194557068,31.71117414148857,14.59477485229354,19.681328592880487,23.513379214122335,6.459858340150179,21.912531516821115,14.131362757175877,27.11355555552108,9.685878743777682,19.83387222163125,6.943393786069816,6.718715055098317,17.73848253046252,28.16251765238356,19.47848434944878,14.00748861238879,3.3296819131415027,19.20125969307717,14.116623384416387,12.445485119186797,17.821040103839266,4.6793640391597044,28.448365529571888,23.093064932727536,15.497854310230808,8.902562475577444,29.531805118523735,27.095567567522558,20.42820327677328,16.606154576529782,3.0778690657337173,24.862129189621058,18.271859860453947,20.321887244983884,6.63808723663704,19.334723089915606,29.459788548522397,11.96470643043339,21.857025433731245,4.398482169652484,36.19840396143912,35.91386198245179,28.56671112399723,6.8634410095484375,22.78623041247025,9.763241075653971,19.884220981058675,12.277308140858645,31.54597077992684,19.791482033307005,11.951450274704664,43.846766214947074,27.667994406509752,17.54448318236001,17.372322952408176,36.33926612741618,29.131264526250213,31.70774156093143,14.146024092529615,18.670272535888035,42.403837906333585,37.8073521670149,35.382268643205414,30.186797098359882,16.057112920535385,23.277456464997027,8.891958905052912,24.715264407980644,36.26708812799325,15.065408725375216,19.662967444706428,17.488569874125506,55.115619200397596,33.057660370026724,29.615668782908507,18.987587860210983,8.076974006212442,14.514790307388855,39.53091521107653,9.222871262472342,22.731445570643874,25.14890161357354,28.732103609902325,16.64289333960725,26.65038039636779,1.035547909782192,8.743421303497229,11.248256804687339,56.15296227654488,14.590735359464023,14.194672208324288,20.958093581402093,16.0,15.055021747327785,6.0,12.561313869903504,17.332132986212873,9.671115187607706,8.564965219936479,36.70381235250183,21.69689309080077,12.578835640648943,14.292892570087101,18.871756765071808,16.676245267063273,23.07402262358982,1.5371322655649395,13.0,13.015827498685862,19.697519843262203,32.096512362424974,39.07517844846379,13.716341923347091,31.901244167138316,27.964689277165963,13.583289522675116,7.784521487578731,17.0,1.7320210532655276,10.999605160801178,25.022929707497063,25.351473895528205,16.90191552263793,42.145421908438585,10.044297993900988,47.65652281017664,15.47442401960671,25.143328485249242,42.41229202856787,6.8583457609522025,21.03659557455228,22.121031128817577,29.640012537879798,29.989547527872254,33.135276793742314,23.606866047670472,18.09098295612731,23.912119618918716,24.52496345816738,5.095297330060443,17.040279078869577,26.340451734095154,10.388567122632857,48.3659250613848,6.531038172138727,31.053439718123528,9.555345522782211,15.392657493408572,25.51027808946495,21.270886941777782,12.788516138605463,19.58337024947915,22.346518314007483,12.181152124766122,21.945239987761806,14.837574511746796,15.077833496352097,6.223478517863883,12.447788833129188,29.911456794546417,29.501034102419624,17.528927682998486,15.837369136294367,21.38735450632352,21.54343982087824,19.551055108267516,23.527275297475185,21.43581998223435,8.94533287122568,31.15666897845098,22.957670015311678,3.174004926424299,41.425494929872656,24.77767565053405,21.671229421974232,16.47688041055109,25.481212792149652,26.679704527884738,29.110857738129276,37.96419986039244,11.903668384119541,11.971780087671505,8.499114637361231,2.973731709773972,41.8837883697808,24.217848840347408,21.07593016831853,6.0,16.654903447314872,7.177875264355099,27.713627187950767,9.070069988644953,20.028448017445236,33.79276179661677,13.024066063289565,32.73919649330205,21.816058774972383,28.928369697233222,15.693060090329153,11.112357537335601,43.18714095403507,25.996479436405693,27.708037976714778,20.574619647094643,12.848047504696913,22.739152816613142,16.885634355564896,22.959352888918755,10.716739038417806,50.502685750914935,9.879029585651365,1.6620832658628704,2.3930533058001426,21.562643173026615,11.788412959056302,10.329572324288314,3.0,8.683216284403736,8.425069579530131,2.334780053947042,37.99970959602828,25.677153334632955,29.094786097507843,28.93879816834021,11.500230496710317,19.81115591981615,16.217843859213545,6.41996445427845,31.28715317420345,5.088878266744965,14.438767316041014,29.465402371763357,25.386168837756593,24.680931866326084,44.73551082402126,9.03514300758566,20.683906843778104,29.789434459234464,18.214040027297877,20.770440956897065,23.953505445365565,39.031136704448016,41.454269167270496,9.121432837403923,33.38684258241446,12.885653425757058,18.1706973254483,13.618356212767958,25.27088055435229,34.00008005229322,13.34820686693661,25.57548745308405,15.683905366362811,11.394834412856977,29.19014423915994,22.433341924955293,10.719896324375036,11.781562081059151,19.368772199866637,8.320724112420994,18.460468183407546,7.190639447180489,29.80574389299792,13.10359282615891,1.4726089680221432,10.813204550399288,14.171756193458089,4.8197875822844995,10.428165968182409,6.0,21.224190981741337,26.800789068925177,19.96057615880125,14.662466587781466,18.40151170925779,16.594190669378072,20.46514238232602,12.555582330130667,4.233906651938577,16.33029744480131,11.842331168817394,31.44179862415085,5.912907718112038,29.73392408439856,38.4266067598081,21.210359954281984,17.412630423503025,30.308934269033912,34.36900112165051,29.394869753859425,25.35706994544489,3.1720024613934124,27.852712420961563,20.802091457776452,11.100679463068744,31.171697106488608,22.64922909500248,23.021463779685952,1.9282478988034562,5.29227208789921,21.07536614640864,20.553001116210268,12.726306350856412,15.782255270206738,23.124867616216047,7.989908601641492,51.16180852054634,24.594749354383552,20.004435298692,17.825732678726872,12.498072314062473,26.457677542927776,10.548415488213351,17.23357975273663,29.197081458846505,16.391284078384313,15.471528959414776,13.224932135326053,29.873864677422617,23.13757384538888,11.184143712198413,6.1266869451955746,6.268075526477089,13.718710339530112,28.33740803820679,30.473116062694892,33.89475801608781,12.911732792705955,19.70552057599691,12.482771463925014,35.2774392113771,24.075869804115317,33.99234129139824,45.9235370107682,25.007416977308324,11.835999960754842,13.197291047086528,12.83971884880017,7.876019815212263,23.207383696597343,9.755739606888445,21.59556855094896,46.30505492679386,21.76707190407889,8.560443731119882,14.386928048031683,26.175965189703295,54.628622968920396,23.192831382778294,32.93934995539673,32.74285746520829,45.013741476062535,8.73951645620923,16.71668301618748,13.45931520402076,42.46560071684976,32.891201919190216,14.0,18.239289781211493,20.056021700314297,24.473462197306375,27.24237884390729,32.28554261847481,22.549220792440806,7.33690360767734,16.6581976668101,21.472949474901046,14.314126343909113,27.187338863191496,10.581481882916975,12.001759289418347,33.26403822681237,10.0,28.874907876750314,7.57108056020289,3.4782692367026993,19.27530314014883,10.462230165097495,6.884931845272531,45.41054720820068,6.81451702601737,10.715175510453825,4.781551574270502,10.79990064964781,9.197627852612582,19.44248720180196,36.530144756238776,3.256848277477674,21.53777544978702,18.93964315727679,31.307477330419964,9.339197630895551,17.771676626971995,14.434950262401463,23.78270238760192,16.745704482285497,26.388550290455296,18.63350028179465,31.055305790021848,23.26797949306063,13.114539250647693,6.601768338433925,24.352422768157698,22.282959594790714,19.019677702153484,30.73767205287751,9.737828562059882,12.418739004006166,14.719863244147177,4.263413624462142,37.28616794351543,13.830338492388865,10.173916804708876,18.76850340927275,17.383444517983715,24.67733007978395,25.8267718777195,22.16133072974117,21.60369225680415,22.256989227848926,31.37982141851348,20.077797433070437,17.891330834105382,23.218093267700404,10.676773789357883,14.336601194125631,14.258891945806159,25.818378507344768,13.162074424511022,4.270845377665137,28.708645126563916,7.712820211484393,4.055750792150876,18.90990888317319,17.166807939120254,20.14486495242665,24.29052898713428,50.28857852339092,23.27239607531637,5.807809323728062,5.758796483262678,37.19271661314502,12.538236453688967,6.448909357916313,7.03556125304733,22.93232726881165,15.836222809076538,5.808390411546717,32.8605339392312,14.329288254076932,11.204064175047074,34.01751002487621,6.275520254588536,8.432956355705816,7.055675423784551,14.978345851113508,12.76672561540973,26.116542155526645,25.618275091433077,3.542400368155005,17.831976876112055,25.340717278080398,17.4864512714268,12.657942923279364,28.586439332790903,20.603278358023413,17.051699475885965,32.93401404215972,5.131885823655874,5.968730799302168,15.600843293234457,18.824826683139428,30.24618607447431,47.206292263847736,8.074999493463954,19.88836413788873,20.088918153743258,37.63491091389976,12.440417257402446,38.559427318823765,2.0,11.949507771276501,14.861577408197311,18.988918652701507,18.133373834935284,36.71629902722418,6.236490181289905,37.59714966219345,18.434863040942734,19.38063918269315,5.056800915922661,14.0335815626516,24.750763605713466,33.57284344444283,23.690511486503205,5.698692163783458,17.161420508747455,0.23358699815539197,16.199848422930764,32.72157419252622,10.545615302915966,19.35986800315172,3.4843302713117392,29.72308478606001,11.452174140346663,10.904478596250046,9.882475878989045,5.806238823328649,28.763325202155457,22.629474774224146,9.703511141406132,19.915327851000864,35.422402126630445,13.781194258981953,31.209061526402508,30.86536703747948,22.328931982111378,15.96057307525668,14.489068450868881,20.25465554576645,7.102007446102531,14.185611663749238,32.69724177030427,17.11210058672755,32.132047510073676,22.109151946076615,36.72587013813958,18.671491851664072,9.061505886955317,13.468345476585757,15.040518839616247,41.44601119477854,20.875910103612433,15.30978211497526],"b":[20,37,42,40,14,50,46,24,3,36,41,30,24,15,18,35,32,33,26,22,43,48,40,33,9,45,35,35,37,44,21,39,43,22,27,29,45,46,43,12,49,48,27,22,1,29,41,27,35,49,21,35,43,35,30,53,34,19,32,19,5,18,34,24,9,46,19,55,43,36,11,47,21,36,34,51,25,36,22,10,16,41,24,26,20,24,11,18,31,49,6,20,47,27,54,34,18,35,20,24,20,40,38,49,9,33,23,36,28,38,31,54,27,17,18,46,47,46,23,27,35,29,26,25,23,45,19,35,46,29,46,49,42,32,6,48,25,51,31,45,27,39,24,29,40,39,21,57,27,38,42,23,13,20,36,24,22,24,39,50,41,42,28,48,13,24,31,11,46,34,21,16,2,26,45,11,32,6,34,39,10,5,38,49,30,16,49,31,34,36,17,41,25,52,36,40,28,18,48,18,40,18,41,11,32,27,43,46,20,44,32,48,11,15,38,52,8,21,12,2,31,20,52,20,24,45,47,33,27,21,47,17,43,7,43,42,12,8,25,43,50,50,12,33,28,19,47,37,47,31,15,19,58,22,11,45,28,4,20,47,22,20,23,15,32,42,34,43,32,28,20,41,9,33,58,33,32,23,48,21,49,15,21,23,29,20,34,13,8,45,43,23,33,42,8,44,45,28,18,20,41,26,54,37,50,26,3,38,40,34,24,15,45,28,32,23,13,35,35,49,27,29,16,46,19,21,9,19,31,20,45,12,6,18,33,25,26,34,36,33,43,43,28,37,26,26,31,19,30,32,35,16,19,12,30,42,16,17,42,13,36,30,37,25,29,47,34,21,28,11,29,33,18,37,18,34,41,27,49,22,43,18,54,25,45,27,32,11,20,51,43,41,38,27,44,21,12,2,39,56,32,30,36,53,8,25,21,21,9,29,36,53,28,44,23,31,37,42,44,55,25,19,15,28,19,14,14,12,41,38,39,42,25,20,27,39,13,26,31,25,25,56,44,38,29,23,34,32,36,22,35,33,24,14,18,13,27,38,9,40,29,46,23,26,47,35,39,32,20,24,32,35,24,44,10,38,23,7,45,35,20,23,4,33,30,17,19,37,49,41,21,21,36,34,29,42,4,28,23,40,8,42,35,12,27,5,37,37,55,25,23,10,20,13,37,44,43,45,39,23,35,45,51,33,32,24,51,52,50,39,24,31,14,41,40,18,32,19,58,38,39,25,14,36,44,12,29,40,39,19,46,17,9,17,57,15,16,31,16,41,6,13,47,16,30,40,51,13,16,26,24,34,2,13,19,21,37,40,35,37,41,14,9,17,5,24,26,36,43,45,17,50,42,50,47,25,29,40,31,33,37,34,21,44,48,21,28,47,32,55,7,39,30,16,33,26,30,22,39,41,23,16,38,7,42,30,56,37,30,32,28,38,26,35,12,36,30,16,45,28,23,26,28,38,40,40,34,29,13,6,48,29,26,6,32,41,40,26,24,37,30,41,24,43,27,21,46,33,39,34,28,36,18,37,22,52,21,5,14,29,12,13,3,16,26,3,49,27,40,31,46,25,17,12,35,6,29,54,28,30,52,24,32,42,43,28,33,47,53,38,36,46,23,34,35,38,41,53,19,16,53,27,39,15,24,34,29,9,38,42,21,20,32,27,25,6,32,33,39,18,36,27,35,22,7,41,12,39,11,43,53,26,44,40,56,44,29,26,31,30,13,40,28,35,20,16,25,25,30,17,45,20,52,27,26,24,29,49,41,18,40,17,21,38,37,30,15,18,12,18,48,35,51,18,22,13,36,42,52,57,29,19,15,15,44,34,27,29,51,42,17,17,32,56,50,38,37,48,23,30,48,60,42,14,44,29,31,31,49,23,16,22,32,36,36,22,26,37,10,52,8,41,23,41,8,46,9,17,27,36,10,35,37,5,23,20,44,38,20,20,34,23,28,30,46,29,20,8,32,37,29,39,10,13,17,11,41,24,11,28,41,47,50,27,37,24,56,30,31,50,20,29,44,40,25,21,29,12,18,29,18,28,27,55,38,39,8,42,16,31,9,23,23,7,35,33,34,47,10,36,13,53,39,34,33,33,54,26,19,13,42,25,21,39,42,28,17,20,33,53,16,28,24,46,35,53,2,13,23,22,37,42,36,38,47,28,24,15,31,46,28,40,37,1,24,35,12,45,17,30,26,19,14,6,39,23,18,23,39,26,35,48,23,22,16,41,41,20,41,44,38,25,44,29,18,37,17,42,21,22],"a":[11,5,6,14,7,18,9,13,2,16,5,7,3,3,17,2,10,5,19,5,19,14,8,20,7,9,16,18,11,19,6,1,11,6,0,2,16,20,19,2,18,17,3,2,1,14,13,6,20,11,11,16,9,2,19,16,15,7,18,6,2,18,20,13,5,11,1,18,17,17,6,19,12,12,3,11,7,2,19,0,4,20,1,14,18,18,4,12,7,13,0,3,13,5,18,9,8,17,15,15,13,1,12,9,6,0,1,10,17,2,5,15,18,16,13,11,7,12,10,1,0,5,10,3,17,13,15,4,8,15,12,18,14,17,3,15,18,16,7,17,13,11,17,7,20,0,2,20,4,10,8,10,12,5,13,17,8,9,5,19,8,11,17,12,2,11,6,9,19,11,0,12,0,10,15,1,17,1,14,12,5,3,18,15,10,15,19,13,18,14,3,18,19,12,12,15,19,2,17,11,16,9,4,1,18,11,7,7,8,5,19,12,8,8,18,17,7,2,4,1,8,5,17,20,10,6,8,13,1,12,12,13,20,7,8,9,2,6,17,9,11,13,3,12,10,6,19,7,15,13,6,2,19,17,9,8,15,4,15,11,10,11,12,9,18,10,9,12,8,13,17,14,6,15,19,10,0,14,16,1,13,1,8,17,8,1,6,8,4,17,18,16,10,17,2,6,13,2,11,18,18,20,19,12,16,7,1,13,3,6,19,4,16,1,5,13,3,8,10,20,1,7,12,10,5,10,3,16,16,8,7,2,3,13,9,7,13,15,7,13,14,8,4,4,2,6,19,0,16,14,6,8,16,2,18,12,4,13,11,2,14,19,1,7,8,11,8,13,0,4,18,6,4,13,2,9,9,16,9,11,6,7,16,1,16,2,5,2,3,14,8,11,5,18,13,8,6,1,7,17,13,7,10,17,7,9,19,5,2,3,14,13,14,5,8,15,7,14,9,16,11,8,5,16,2,13,1,3,9,12,1,20,17,13,19,8,4,11,5,8,2,17,4,1,13,14,16,0,18,3,3,18,13,2,8,0,17,19,2,2,8,11,18,8,15,4,16,2,19,19,6,14,4,5,8,2,5,5,6,8,4,9,1,1,3,10,15,3,17,13,14,8,10,16,14,12,2,0,16,7,5,17,17,11,12,4,7,16,15,3,7,6,16,12,10,13,9,13,9,4,2,20,17,19,0,17,19,17,20,12,14,9,4,18,16,5,14,17,18,15,13,12,7,5,14,9,1,3,18,14,19,1,5,7,18,14,12,0,16,10,6,5,14,3,6,18,12,9,7,3,11,10,1,13,12,18,16,10,1,19,18,12,7,17,1,3,14,6,11,16,10,13,12,18,9,5,9,14,16,16,16,5,17,5,18,5,15,19,7,19,6,1,6,14,19,13,12,14,1,5,16,11,8,6,11,11,18,10,4,3,17,8,17,7,5,12,8,1,6,20,5,13,9,16,2,19,3,7,2,2,18,18,15,6,4,5,1,3,19,2,12,13,18,19,5,11,9,14,17,9,4,8,1,6,7,16,2,1,1,18,10,2,3,2,1,2,13,2,11,19,9,5,15,4,14,0,4,18,17,20,19,5,20,2,10,15,20,19,20,4,16,12,14,13,4,19,5,14,10,11,14,19,3,7,8,5,7,6,18,6,0,5,6,2,7,6,6,1,11,14,0,6,9,7,2,8,10,20,3,14,19,13,14,12,17,19,1,3,11,4,10,10,5,3,1,0,10,8,1,4,12,4,19,9,13,8,8,18,6,14,1,16,13,11,13,2,11,5,6,13,20,10,18,9,8,4,2,15,12,20,17,1,6,4,7,3,8,12,16,18,5,13,14,19,13,15,11,20,7,9,13,20,19,14,17,14,11,19,15,12,6,15,3,11,9,8,4,9,10,13,6,1,5,3,6,8,5,10,1,4,2,15,6,3,10,15,7,2,16,5,11,16,11,13,14,11,9,6,4,14,19,14,8,5,1,4,17,11,10,14,8,8,13,1,18,14,17,9,3,16,5,9,13,15,0,4,17,3,0,3,15,16,18,16,16,5,5,17,1,3,1,14,6,2,5,12,10,19,4,7,6,13,9,14,19,2,15,17,17,3,14,20,6,16,4,2,14,18,9,16,1,9,18,9,7,16,2,11,11,8,18,15,5,10,14,9,2,5,9,15,17,1,1,0,16,19,7,15,2,16,9,5,4,1,19,7,2,15,12,11,8,9,18,6,8,11,7,11,9,16,12,14,17,6,2,1,15,4,10,13]}
},{}],42:[function(require,module,exports){
module.exports={"expected":[-0.6931471805599453,-0.40546510810816444,-0.8472978603872037,-1.0986122886681098,-1.9459101490553135,-2.833213344056216,-1.6094379124341003,-1.3862943611198906,-0.6061358035703156,-0.11778303565638351,-0.9808292530117262,-1.0116009116784799,-0.2876820724517809,-1.9459101490553135,-1.3217558399823195,-0.2876820724517809,-1.203972804325936,-0.2006706954621511,-0.48550781578170077,-1.2992829841302609,-0.6931471805599453,-1.8458266904983307,-2.70805020110221,-0.262364264467491,-1.2992829841302609,-0.5306282510621704,-0.916290731874155,-1.9459101490553135,-0.13353139262452263,-1.0986122886681098,-0.916290731874155,-1.0116009116784799,-0.2876820724517809,-1.3862943611198906,-2.0794415416798357,-0.2513144282809062,-1.0414538748281612,-1.0116009116784799,-0.6931471805599453,-0.40546510810816444,-1.203972804325936,-0.8109302162163288,-0.2006706954621511,-0.4353180712578455,-1.3862943611198906,-0.8109302162163288,-2.0149030205422647,-0.2876820724517809,0.0,-1.3862943611198906,-0.40546510810816444,-0.9555114450274362,-2.0149030205422647,-1.6094379124341003,-0.6931471805599453,-0.40546510810816444,-0.18232155679395473,-0.5596157879354228,-1.9459101490553135,-0.6931471805599453,-0.6931471805599453,-1.0986122886681098,-0.15415067982725836,-0.6931471805599453,-1.6094379124341003,-1.0986122886681098,-1.0986122886681098,-0.3566749439387323,-0.5596157879354228,-0.16705408466316607,-0.15415067982725836,-1.252762968495368,-1.0414538748281612,-2.3025850929940455,-0.6931471805599453,-1.0986122886681098,-0.49247648509779424,-0.15415067982725836,-1.791759469228055,-0.3184537311185346,-0.07410797215372196,-0.40546510810816444,-0.587786664902119,-1.5040773967762742,-0.1625189294977748,-0.5596157879354228,-0.5306282510621704,-0.6931471805599453,-2.0149030205422647,-0.40546510810816444,-1.5040773967762742,-0.4700036292457356,-0.40546510810816444,-1.897119984885881,-0.8472978603872037,-0.7621400520468967,-0.10536051565782628,-1.0986122886681098,-0.37948962170490386,-0.3746934494414107,-0.6931471805599453,-1.3862943611198906,-0.5465437063680698,-0.6931471805599453,-2.0794415416798357,-0.6931471805599453,-0.05406722127027582,-1.0986122886681098,-0.6931471805599453,-0.40546510810816444,-0.2006706954621511,-1.3862943611198906,-1.2237754316221157,-0.3566749439387323,-0.2411620568168881,-1.897119984885881,-0.6931471805599453,-0.8472978603872037,-0.18232155679395473,-2.0794415416798357,-1.9459101490553135,-0.11778303565638351,-0.6190392084062233,-1.7346010553881066,-1.7047480922384253,-1.791759469228055,-0.6931471805599453,-0.8472978603872037,-1.6094379124341003,-1.0986122886681098,-0.40546510810816444,-0.8109302162163288,-1.4469189829363254,-0.4700036292457356,-0.6931471805599453,-1.9459101490553135,-0.40546510810816444,-0.15415067982725836,-0.5389965007326871,-0.6931471805599453,-0.33647223662121306,-0.6931471805599453,-1.791759469228055,-0.9808292530117262,-2.4849066497880004,-0.40546510810816444,-0.3053816495511819,-0.6418538861723948,-0.2876820724517809,-0.5306282510621704,-1.791759469228055,-1.2237754316221157,-0.2231435513142097,-1.5040773967762742,-0.3746934494414107,-2.3025850929940455,-1.0986122886681098,-0.8266785731844679,-0.5108256237659905,0.0,-1.6094379124341003,-0.6931471805599453,-0.18232155679395473,-1.252762968495368,-0.5108256237659905,-1.252762968495368,-0.40546510810816444,-1.252762968495368,-1.0986122886681098,-0.587786664902119,-1.3862943611198906,-0.6286086594223741,-0.5108256237659905,-0.08701137698962981,-0.2231435513142097,-0.05715841383994864,-0.8754687373539001,-0.3746934494414107,-1.466337068793427,-0.060624621816434854,-0.09531017980432477,-1.0986122886681098,-0.07410797215372196,-0.2876820724517809,-2.5649493574615367,-0.2876820724517809,-0.6931471805599453,-0.5108256237659905,-1.0414538748281612,-0.4353180712578455,-0.13353139262452263,-0.10536051565782628,-0.1431008436406733,-0.15415067982725836,0.0,-1.9459101490553135,-1.5040773967762742,-1.7346010553881066,-0.6286086594223741,-0.40546510810816444,-1.791759469228055,-0.8754687373539001,-2.3025850929940455,-0.6418538861723948,-0.8109302162163288,-1.3862943611198906,-2.833213344056216,-2.0149030205422647,-0.45198512374305727,-0.8472978603872037,-0.8649974374866046,-0.6931471805599453,-0.07410797215372196,-2.0794415416798357,-0.11778303565638351,-0.18232155679395473,-0.6931471805599453,-1.203972804325936,-0.6931471805599453,-0.6931471805599453,-1.6094379124341003,-0.40546510810816444,-0.48550781578170077,-0.916290731874155,-1.1631508098056809,-0.37948962170490386,-0.6931471805599453,-0.37948962170490386,-1.0986122886681098,-0.2231435513142097,-1.540445040947149,-0.9985288301111273,-0.5596157879354228,-0.4700036292457356,-0.40546510810816444,-1.0986122886681098,-0.2682639865946794,-0.5108256237659905,-0.33647223662121306,-0.17185025692665928,-0.6931471805599453,-0.32542240043462795,-0.8472978603872037,-1.6094379124341003,-0.5596157879354228,-0.6286086594223741,-0.40546510810816444,-1.0986122886681098,-0.40546510810816444,-1.466337068793427,-0.10536051565782628,-2.5649493574615367,-0.40546510810816444,-1.8458266904983307,-1.55814461804655,-0.6931471805599453,-0.916290731874155,-0.6931471805599453,-0.2231435513142097,-1.3862943611198906,-0.40546510810816444,-0.2682639865946794,-2.0794415416798357,-0.08701137698962981,-0.1941560144409575,-0.09531017980432477,-0.1941560144409575,0.0,-0.48550781578170077,-0.40546510810816444,-0.10536051565782628,-1.0986122886681098,-1.0986122886681098,-1.3862943611198906,-0.10536051565782628,-1.3862943611198906,-0.2876820724517809,-0.3053816495511819,-2.3978952727983707,-0.09531017980432477,-0.2113090936672069,-0.18232155679395473,-0.2876820724517809,-0.2876820724517809,-2.3978952727983707,-0.2231435513142097,-0.40546510810816444,-0.4353180712578455,-0.4353180712578455,-0.40546510810816444,-0.06899287148695143,-0.15415067982725836,-0.06453852113757118,-2.833213344056216,-0.45953232937844024,-2.0794415416798357,-1.3862943611198906,-0.33647223662121306,-0.2231435513142097,-1.0986122886681098,-0.15415067982725836,-0.13353139262452263,-0.5389965007326871,-0.8472978603872037,-2.3025850929940455,-0.916290731874155,-1.6582280766035324,-0.33647223662121306,-0.8472978603872037,-0.6931471805599453,-0.8266785731844679,-0.06899287148695143,-0.9808292530117262,-0.40546510810816444,-0.6931471805599453,0.0,-0.6931471805599453,-0.6931471805599453,-1.0986122886681098,-0.16705408466316607,-0.1431008436406733,-0.33647223662121306,-1.0986122886681098,-0.5596157879354228,-0.18232155679395473,-1.0986122886681098,-0.6931471805599453,-0.40546510810816444,-0.5596157879354228,-0.16705408466316607,-0.12516314295400605,-0.262364264467491,-1.9459101490553135,-1.3862943611198906,-0.2231435513142097,-0.6190392084062233,-0.48550781578170077,-0.2411620568168881,-2.3978952727983707,-0.37948962170490386,-0.40546510810816444,-1.0986122886681098,-0.6931471805599453,-1.6094379124341003,-0.916290731874155,-0.45198512374305727,-0.2513144282809062,-0.06453852113757118,-0.40546510810816444,-0.2411620568168881,-0.6286086594223741,-0.18232155679395473,-0.18232155679395473,-0.8754687373539001,-0.2231435513142097,-1.0986122886681098,-1.9459101490553135,-1.9459101490553135,-2.0149030205422647,-1.6094379124341003,-1.5040773967762742,-0.10536051565782628,-2.1972245773362196,-0.10008345855698265,-0.6931471805599453,0.0,-2.1972245773362196,-0.05715841383994864,-2.9444389791664407,-0.6931471805599453,-1.791759469228055,-1.1526795099383855,-0.5108256237659905,-0.40546510810816444,-0.10536051565782628,-0.8873031950009028,-0.2513144282809062,-1.252762968495368,-0.18232155679395473,-0.1112256351102245,-0.2876820724517809,-0.587786664902119,-0.33647223662121306,-0.40546510810816444,-1.3862943611198906,-0.1625189294977748,0.0,0.0,-0.11778303565638351,-1.3862943611198906,-1.0986122886681098,-1.0986122886681098,-0.37948962170490386,-0.40546510810816444,-1.0296194171811583,-0.40546510810816444,-2.70805020110221,-0.33647223662121306,-2.70805020110221,-1.252762968495368,-0.2231435513142097,-0.2876820724517809,-0.6931471805599453,-0.6931471805599453,-0.40546510810816444,-1.7047480922384253,-0.4700036292457356,-1.3862943611198906,-0.2231435513142097,-0.6931471805599453,-0.6931471805599453,-0.10536051565782628,-0.6931471805599453,-0.6931471805599453,-0.6931471805599453,0.0,-0.2513144282809062,-1.1526795099383855,-0.44183275227903934,-1.0986122886681098,-2.0794415416798357,-2.70805020110221,0.0,-1.0986122886681098,-0.18232155679395473,-0.18232155679395473,-0.5306282510621704,-0.7621400520468967,-2.3978952727983707,-1.0116009116784799,-0.45953232937844024,-0.916290731874155,-0.6931471805599453,-0.6931471805599453,-0.40546510810816444,-0.40546510810816444,-0.587786664902119,-1.0116009116784799,-2.1972245773362196,-0.2006706954621511,-0.13353139262452263,-0.8754687373539001,-0.8109302162163288,-1.0414538748281612,-0.2876820724517809,-0.40546510810816444,-0.05406722127027582,-0.6931471805599453,-0.34830669426821587,-2.0149030205422647,-0.7472144018302211,-0.916290731874155,-0.2682639865946794,-2.1972245773362196,-1.791759469228055,-0.2876820724517809,-1.178654996341646,-0.3677247801253174,-0.2231435513142097,-1.9459101490553135,-0.2006706954621511,-0.09531017980432477,-1.1631508098056809,-2.3978952727983707,-0.6931471805599453,-0.06899287148695143,-0.40546510810816444,-0.8472978603872037,-0.9808292530117262,-0.1431008436406733,-1.0986122886681098,-1.203972804325936,-1.3862943611198906,-0.15415067982725836,-1.252762968495368,-0.060624621816434854,-0.8109302162163288,-1.8718021769015913,-1.0986122886681098,-0.08701137698962981,-0.16705408466316607,-1.791759469228055,-0.2513144282809062,-2.639057329615259,-0.6931471805599453,-0.40546510810816444,-0.9808292530117262,-0.9808292530117262,-0.33647223662121306,-0.6931471805599453,-0.3746934494414107,0.0,-0.07410797215372196,-0.2876820724517809,0.0,-0.7419373447293773,-0.5108256237659905,-2.0794415416798357,-0.8109302162163288,-0.16705408466316607,-0.40546510810816444,-0.9444616088408515,-0.262364264467491,-1.55814461804655,-0.40546510810816444,-0.2876820724517809,-0.6931471805599453,-0.6931471805599453,-1.3862943611198906,-1.0986122886681098,-1.6739764335716716,-0.916290731874155,-0.05129329438755046,-0.6931471805599453,-1.0986122886681098,-0.8266785731844679,-0.5306282510621704,-0.916290731874155,-0.15415067982725836,-0.15415067982725836,-0.6931471805599453,-0.5108256237659905,-0.8649974374866046,-1.3862943611198906,-0.8472978603872037,-1.203972804325936,-2.2512917986064953,-1.5040773967762742,-0.40546510810816444,-0.2876820724517809,-0.08004270767353637,-0.6931471805599453,-1.203972804325936,-0.6931471805599453,-0.1431008436406733,-0.6061358035703156,-0.40546510810816444,-0.18232155679395473,-1.6094379124341003,-0.2876820724517809,-2.9444389791664407,-0.8109302162163288,-0.9444616088408515,-0.2876820724517809,-1.0986122886681098,-1.6739764335716716,-0.6931471805599453,-0.40546510810816444,-2.3978952727983707,-1.3350010667323402,-0.2231435513142097,-0.2231435513142097,-1.178654996341646,-0.8472978603872037,-0.7731898882334817,-2.1972245773362196,0.0,-1.5040773967762742,-0.6931471805599453,-0.6931471805599453,-0.18232155679395473,-0.40546510810816444,-2.70805020110221,-0.40546510810816444,-0.40546510810816444,-2.2512917986064953,-0.33647223662121306,-0.916290731874155,-0.6061358035703156,-1.0986122886681098,-1.3862943611198906,-1.0986122886681098,-1.0986122886681098,-1.466337068793427,-1.540445040947149,-0.5753641449035618,-1.0986122886681098,-2.1972245773362196,-0.6931471805599453,-0.17185025692665928,-1.3862943611198906,-1.0986122886681098,-0.40546510810816444,-1.252762968495368,-0.5978370007556204,-0.15415067982725836,-0.6931471805599453,-0.2231435513142097,-1.0986122886681098,-2.833213344056216,-1.791759469228055,-0.2876820724517809,-1.6094379124341003,-1.0296194171811583,-0.916290731874155,-0.2411620568168881,-0.6931471805599453,-0.10008345855698265,-1.0986122886681098,-0.13353139262452263,-1.791759469228055,-2.3978952727983707,0.0,-0.916290731874155,-2.3025850929940455,-0.40546510810816444,-0.1112256351102245,-0.78845736036427,-0.2876820724517809,-1.178654996341646,-0.6931471805599453,-1.6094379124341003,-0.6931471805599453,-1.0986122886681098,-0.2876820724517809,-1.6094379124341003,-0.6931471805599453,-0.2876820724517809,-0.587786664902119,-0.10536051565782628,-1.0986122886681098,-1.252762968495368,-0.40546510810816444,-2.0794415416798357,-1.2237754316221157,-0.8754687373539001,-0.6931471805599453,-1.203972804325936,-0.7731898882334817,-0.2876820724517809,-2.1400661634962708,-1.0986122886681098,-2.1972245773362196,-0.8649974374866046,-0.9808292530117262,-0.10536051565782628,-0.4700036292457356,-2.4849066497880004,-0.48550781578170077,-0.6931471805599453,-1.540445040947149,-0.1112256351102245,-0.7419373447293773,-1.252762968495368,-0.8472978603872037,-0.2513144282809062,-0.4700036292457356,-0.587786664902119,-0.16705408466316607,-0.33647223662121306,-1.9459101490553135,-0.5108256237659905,-0.9555114450274362,-1.6094379124341003,-0.40546510810816444,-0.6931471805599453,-0.2231435513142097,-0.2876820724517809,-1.3862943611198906,-1.203972804325936,-1.0116009116784799,-0.4700036292457356,-1.55814461804655,-0.587786664902119,-0.08701137698962981,-0.8649974374866046,-0.5108256237659905,-0.6931471805599453,-0.6931471805599453,-1.0986122886681098,-1.203972804325936,-1.2237754316221157,-1.4469189829363254,-0.13353139262452263,-0.7537718023763802,-2.833213344056216,-2.833213344056216,-2.772588722239781,-0.6931471805599453,-0.8649974374866046,-0.13353139262452263,-0.6931471805599453,-1.252762968495368,-0.8109302162163288,-0.40546510810816444,-0.262364264467491,-1.3862943611198906,0.0,-2.995732273553991,-0.6931471805599453,-0.40546510810816444,-0.9555114450274362,-0.4700036292457356,-1.0986122886681098,-0.9985288301111273,-0.40546510810816444,-1.252762968495368,-0.13353139262452263,-0.48550781578170077,-0.33647223662121306,-0.33647223662121306,-0.5108256237659905,0.0,-1.3862943611198906,-0.2876820724517809,-0.2231435513142097,-1.4350845252893227,-0.587786664902119,-1.0986122886681098,-0.6931471805599453,-0.2411620568168881,-2.3025850929940455,-1.6094379124341003,-0.18232155679395473,-0.15415067982725836,-0.2231435513142097,-1.8458266904983307,-0.7419373447293773,-2.995732273553991,-1.540445040947149,-0.6931471805599453,-0.5108256237659905,-1.3862943611198906,-0.6931471805599453,-0.09531017980432477,-0.262364264467491,-0.6931471805599453,-2.3025850929940455,0.0,0.0,-0.4700036292457356,0.0,-0.40546510810816444,-0.6931471805599453,-1.791759469228055,-1.252762968495368,-0.5108256237659905,-0.2876820724517809,-0.18232155679395473,-0.44183275227903934,-1.0986122886681098,-0.6931471805599453,-1.203972804325936,-1.3862943611198906,-0.10536051565782628,-1.0986122886681098,-1.0986122886681098,-1.3862943611198906,-0.2876820724517809,-0.16705408466316607,-1.4469189829363254,-1.9459101490553135,-0.6931471805599453,-0.40546510810816444,-1.0986122886681098,-0.916290731874155,-1.252762968495368,-1.7346010553881066,-0.6931471805599453,-0.40546510810816444,-2.70805020110221,-0.07410797215372196,0.0,-0.40546510810816444,-1.3862943611198906,-0.1941560144409575,-1.3862943611198906,-1.203972804325936,-1.3862943611198906,-0.2231435513142097,-0.2513144282809062,-0.3184537311185346,-0.4700036292457356,-1.0986122886681098,-0.5108256237659905,-0.8109302162163288,-1.8718021769015913,-1.9459101490553135,-0.1431008436406733,0.0,-0.1431008436406733,-0.6931471805599453,-0.6931471805599453,-0.6931471805599453,-1.3862943611198906,-1.0116009116784799,-0.6931471805599453,-1.0986122886681098,-0.7731898882334817,-0.4353180712578455,-1.791759469228055,-1.252762968495368,-1.3862943611198906,-0.6190392084062233,-1.0986122886681098,-0.40546510810816444,-0.5596157879354228,-0.6190392084062233,-0.6931471805599453,-0.6931471805599453,-0.587786664902119,-1.2992829841302609,-0.40546510810816444,-0.2876820724517809,-0.33647223662121306,-0.8472978603872037,-0.32542240043462795,-1.0986122886681098,-0.5108256237659905,-0.33647223662121306,-1.3862943611198906,-2.70805020110221,-0.5753641449035618,-0.1431008436406733,0.0,-1.0986122886681098,-2.9444389791664407,-0.8472978603872037,-0.6931471805599453,-2.639057329615259,-0.8109302162163288,-0.1941560144409575,-0.40546510810816444,-1.203972804325936,-0.5389965007326871,-1.540445040947149,-0.6931471805599453,-1.55814461804655,-0.11778303565638351,-0.1431008436406733,-0.6931471805599453,-0.5108256237659905,-0.587786664902119,-0.6931471805599453,-1.8718021769015913,0.0,-0.3101549283038396,-0.3101549283038396,-0.40546510810816444,-0.6931471805599453,-0.40546510810816444,-1.1526795099383855,-0.49247648509779424,-1.0986122886681098,-1.3217558399823195,-2.3025850929940455,-0.40546510810816444,-1.3862943611198906,-0.08004270767353637,-0.48550781578170077,-0.9808292530117262,-1.6094379124341003,-0.6931471805599453,-0.40546510810816444,-2.639057329615259,-0.5108256237659905,-1.6094379124341003,-0.18232155679395473,-0.4353180712578455,-0.07410797215372196,0.0,-0.916290731874155,-1.0116009116784799,-0.4700036292457356,-0.2231435513142097,-0.2876820724517809,-0.2231435513142097,-0.44183275227903934,-0.6359887667199967,-1.178654996341646,-0.40546510810816444,-0.6931471805599453,-0.7731898882334817,-0.40546510810816444,-0.7731898882334817,0.0,-0.916290731874155,-1.6094379124341003,-0.2231435513142097,-0.2231435513142097,-1.6094379124341003,-0.2231435513142097,-0.10536051565782628,-0.09531017980432477,-0.7419373447293773,-0.9444616088408515,-0.08004270767353637,-0.40546510810816444,-0.6931471805599453,-0.45198512374305727,-2.1400661634962708,-2.3025850929940455,-0.40546510810816444,-0.2231435513142097,-0.15415067982725836,-0.15415067982725836,-0.40546510810816444,-0.8109302162163288,-0.9808292530117262,-0.6931471805599453,-1.791759469228055,-0.1625189294977748,-1.9459101490553135,-0.3677247801253174,-0.4307829160924542,-2.2512917986064953,-1.2237754316221157,-0.2719337154836418,-0.5596157879354228,-0.8109302162163288,-2.3978952727983707,-0.2513144282809062,-0.5753641449035618,-0.6931471805599453,-1.791759469228055,-0.11778303565638351,-0.6931471805599453,-0.6931471805599453,-0.05715841383994864,-2.995732273553991,-0.2231435513142097,-0.6931471805599453,-0.9808292530117262,-1.6094379124341003,-0.9808292530117262,-0.44183275227903934,-1.1526795099383855,-0.18232155679395473,-1.9459101490553135,-0.40546510810816444,-0.2876820724517809,-0.6931471805599453,-1.9459101490553135,-0.08004270767353637,-0.4700036292457356,-1.3862943611198906,-0.6931471805599453,-0.07410797215372196,-0.13353139262452263,-1.8458266904983307,-0.6418538861723948,-0.2876820724517809,-0.7472144018302211,-0.40546510810816444,-1.0986122886681098,-0.8109302162163288,-0.33647223662121306,-0.3746934494414107,-0.916290731874155,-0.40546510810816444,-2.2512917986064953,-0.8873031950009028,-0.2363887780642304,-0.40546510810816444,-0.2876820724517809,-0.9555114450274362,-0.5306282510621704,-0.3184537311185346,-1.3862943611198906,-0.05715841383994864,-2.3978952727983707,-0.7537718023763802,-0.05406722127027582,-0.3566749439387323,-2.0794415416798357,-1.252762968495368,-1.0116009116784799,-1.203972804325936,-1.3862943611198906,-0.3101549283038396,-0.9444616088408515,-1.9459101490553135,0.0,-0.060624621816434854,-1.0986122886681098,-1.9459101490553135,-1.55814461804655,-0.6931471805599453,-2.1972245773362196,-0.2363887780642304,-0.78845736036427,-2.5649493574615367,-0.5389965007326871,-0.6931471805599453,-0.1431008436406733,-0.18232155679395473,-0.4700036292457356,-0.4700036292457356,-0.34830669426821587,-0.07410797215372196,-1.791759469228055,-1.3862943611198906,-0.5108256237659907,0.0,-0.8472978603872037,-0.09531017980432477,-0.6466271649250526,-0.2876820724517809,-0.6931471805599453,-0.8109302162163288],"x":[11.960591594201151,21.50761005780032,11.42312088029656,18.82769519940212,4.8667219472987675,1.972413729440781,3.4335748209260206,5.5207664574901445,14.789451007575758,15.357271160667572,8.12457510941108,5.162144312168329,34.976844923076584,11.306276926735478,21.271810066046292,25.123798031855124,12.856796577262887,22.21484604654431,8.145725819134192,14.582979267319711,3.8724317644479664,10.294291800842334,6.684192159167541,11.549620351026054,12.547202003875737,17.423111414961173,22.815072866958797,20.341164692427196,11.900426927175728,8.027297725998004,20.547493294888692,16.58345927117603,18.67007088064672,6.699505102698534,19.974904235062333,21.33861888588879,21.926408373699413,7.481924800675483,14.660045022690644,27.785311048373444,14.761316794923774,7.134757291852356,20.574406357691924,23.66443373473668,19.78852091500241,11.464028643381594,12.201122858596174,3.0616094430384813,14.0,15.385153342200962,1.7958666805852928,6.450315267751401,20.94259772512788,8.281202192705036,16.445435344104208,6.134384289979174,21.297025179230385,25.02261948876984,12.041906262557664,18.806545849262694,16.283475814216693,6.365356212208434,21.22079686577179,8.135386503328185,19.419584420352933,0.35955855939103243,10.777102068037845,24.23450113636759,9.853271292765577,16.47692265433514,9.827910262914905,3.3679995594707135,19.133744326443445,13.165061738477016,27.48122094826932,21.276307808766777,21.651431415223463,28.012690721761942,11.999957398527343,24.997665573934757,19.77873172202143,19.374118261449254,4.962321188247463,16.764698741503874,26.534070904737764,21.956415756299457,21.595936675767927,20.1400434682507,5.612224992004554,5.5743144640040025,6.208071195018199,21.05836069195258,1.665720570723595,13.027470819458015,7.435588971109118,8.6965392574979,27.876593892433156,6.206235884525062,25.806413461709546,20.95939473044963,4.75830048840646,7.088341020985602,23.622103563695177,8.961820968742362,10.200060908253867,12.507013229919231,17.107597268560024,17.585089102676164,8.35897231033352,21.66424456903197,25.883245255720794,11.222847758779135,5.440205983700178,19.35573381272823,23.850115985312165,16.903439038572976,5.318304235839451,28.9148450655459,17.791738830336158,14.57176288425051,19.638866947806317,34.4715595821636,18.076705394407636,5.759291367165336,16.896184429819865,13.109237789295452,15.83149814863184,14.257324663267866,11.253109219988657,13.868539226475015,10.64089148804222,8.84256754490478,15.640314800674734,10.66769160385016,10.049042110991358,20.752429131664947,11.505781976469466,19.273014396089852,11.607965835783501,3.628422698486902,7.766525207016718,10.939928776395288,21.488341393444507,15.769720734523183,1.0650324629075227,17.343193216593395,27.204911823329493,22.23419195889378,28.222524807004298,14.762999912158492,17.610445491687024,11.921319898049664,7.995729422764277,16.98672167701143,25.625186320196732,17.36232255331726,10.563695238268046,7.790716114177375,9.43687525762929,1.0,18.397691721765426,13.764484380361482,9.006999782074281,6.295240841042253,17.89063595456433,16.19597422416196,11.87291820315763,11.474437360858882,15.366005509124594,12.848876335067192,1.2521207990930554,27.43558959436774,18.04165947105834,20.43669739868918,21.5092533578461,23.378696707643204,19.970403940446353,19.637341912036533,21.047032526217095,31.233910774453985,20.998346059232638,14.29542234593469,20.703752533384176,11.144996403931513,11.906106745147989,21.975705734358662,5.521377646064746,17.099683888404133,9.37121552477884,24.422874342177636,14.947627920030882,29.32713769279057,26.652401717595726,8.754289789733471,10.0,15.776329001209989,17.74254709650149,12.647505713107641,12.485797755692582,9.304793926473298,5.5367020902307384,18.22954485101153,8.520001882534983,18.5816494390541,7.789283520241927,2.0309303913500667,0.9949526629485064,5.5542085641443455,24.156205872655214,19.392591652471328,19.109490719745413,15.940248206045615,17.63475643388528,6.9684285656542615,18.455072247070838,23.08153933829707,28.010334397677546,20.448115398226218,12.134897267773024,20.854448328273843,17.959961113786086,15.475573182580682,26.28041855339643,20.818589526763336,12.78694051214908,26.49487808063706,17.82478905124776,18.105428310851046,12.301662011546355,12.649680695025403,21.47781279157821,13.950502809588624,6.159537194451138,13.058825064643957,1.1467346403931993,15.84651975198788,17.267672206865733,19.13487376191276,23.91385962395596,19.538099566165897,11.305858473972036,28.011735943247952,20.995870090414968,14.482540658853084,22.76321268220645,19.30937712302406,14.732205990656281,18.338917943094106,16.06332402870384,9.9251118321165,12.281642666118127,4.330016990516858,21.2027410390117,3.469788270903499,12.395067361961624,18.223571655828177,12.788902452002613,13.159790136802737,15.863726604612738,10.390529820964513,9.07051624928845,31.588492687161295,1.277853105421495,18.531031572347665,23.936918870025607,20.39137964870154,23.511830467472667,7.0,18.11175320650694,21.39773011154132,16.968180034102772,1.098720379018091,11.273531156294656,6.864743689508128,10.855686903890495,14.269734820811792,11.151993017251709,25.42177489973676,6.838016520931544,10.65435047377869,32.69742754730609,15.891240149685453,18.77574857523509,21.479180877305346,19.068373420587825,10.697864202616664,14.809782510944881,30.637698917662316,28.024991694917638,22.666524400787825,13.148522320257305,19.944686083604587,27.414197803568577,19.715784658418947,14.207753340653612,17.666706212958623,10.66758059556691,20.59272923584285,4.45118603282817,16.66694452979817,7.83201893971655,22.694411185661554,20.981444357090247,21.977071237607607,2.663081523995383,2.672771271603569,6.780308074598588,19.267514948001757,22.291437071105708,14.973275692702298,22.391517831298472,13.670245123760191,12.798492776822037,27.598573418699132,20.69561599568463,12.0,8.854641243093257,15.872834716253955,17.836621758428247,13.973839138757635,28.94346074182105,7.203892978780362,16.726413089789283,23.29497152430065,34.06824139837661,22.347049329842505,17.960735963607675,13.473108104889878,17.153104247240776,28.980142721868276,28.253736079676386,10.63424251341944,17.325059275517837,16.561245977428232,12.35285890579239,15.057269660773589,16.78813063298544,22.63802343547563,6.000876296244858,16.615857302665766,18.036672605245002,19.266957781005544,13.372603881441659,4.15222848346891,6.9285034747220955,21.672072987634422,18.130482178154438,31.131364148258257,8.071496951359634,15.151540161518096,15.237853218049533,26.599655482902257,23.26062948304603,15.49731762202758,25.093243321879843,19.801255929401247,17.297441871095774,4.567278992167728,13.962776525864374,1.4385521273364787,4.0273870747441265,25.394553802690588,11.133843103849845,36.293466035106604,14.733729619064986,1.0,3.157244930687849,18.554527791482894,13.987468583459721,18.109238944845234,1.3966754374926085,22.50072724358839,6.954113829987547,16.970533008769582,14.551195598132743,21.963356764288985,15.028857348618105,11.297393773851308,12.499465580115622,33.09428257191972,9.47612887887788,7.172593240948407,26.474433788612334,2.822182211863023,13.832809111320667,36.667299113164944,8.0,8.0,25.687791640662002,15.712945228027447,9.55743975122777,4.456032896153274,25.415483141157683,20.401303341421034,19.7295075630958,18.088925556700588,2.232558653318407,28.434747869083836,16.653158341226753,11.1940147127209,23.740382234692166,22.052941613384213,17.73621362875688,19.634276660810073,14.795941570550601,4.710490436283781,17.879762496705155,17.042352988699125,26.183050585433943,6.813108649734931,11.807579256888376,26.54027321493882,9.882923701735569,4.705865911701011,12.097354787335124,6.0,15.95200400643651,11.614633314980654,20.484059003482553,0.18180840101465634,3.3683798098486135,2.898054058698062,2.0,17.70431789271565,25.632660031210364,22.52134405931266,24.160863710176525,9.42273228974398,10.543500590291393,6.726706824671955,16.945282704262432,21.123806859918,12.141380952980802,17.316451132828234,11.72404113392788,8.314161269812347,19.78664285466378,15.182886671760246,13.63558782955475,25.80500254209732,17.31547086720962,7.567056344686432,16.632022578928773,21.83402873023795,23.979181499846582,6.4750805504895395,35.41728285823281,11.796857646918228,30.461005804994148,12.119551588158679,22.10902018063976,2.7192435287938235,26.011369557191326,12.639650107865334,15.58838812345007,19.50327702932521,19.541755329836352,8.097203683906411,19.13970240405018,5.807124520289679,19.61612410819709,13.843273960764936,18.56373977789982,19.78717754760296,21.781916902269817,27.125517377125156,4.59849485923861,7.109286521949099,19.52478955195886,20.131856771442607,20.309007027881105,20.787066842875014,7.6855586122992605,10.450592006450274,8.632466366723582,33.10666114955021,15.061755915398738,18.750935162165472,6.248609538707422,19.305969743099972,27.307064085755755,18.955901736472754,20.656501029604506,19.010502430708275,12.269085556271637,13.915900058140615,8.826593402882185,21.94591213350175,15.777661933387876,11.94854242733625,15.481799603792712,18.0,31.74194446321046,11.007508034185697,2.0,19.42541077074011,20.680494758275728,2.296954996942636,27.232070625484635,21.587625896008188,15.03133464541848,14.485544006488322,22.55537326204862,17.619921522286194,20.65830012960663,5.263807463453798,3.8309009871198354,18.65286724221774,13.35843107829887,15.039228666994374,21.124398987096434,19.521699930855004,38.412287095539696,5.565340921825241,9.245015668940802,7.144043412104664,18.536028015023106,5.104214665331383,31.902794917409913,17.004341525235155,11.454448734550454,6.116745312772676,27.821053569392454,6.7478844473552995,24.43073282815883,13.422553950158335,17.39717846919576,11.42538380960783,3.069435091366841,17.39818783755146,21.23438363466205,8.821707493297525,5.730292087548625,10.563408168218393,25.99731451734481,21.421105844415877,8.627090499459193,18.78297016276298,11.41521295805675,19.438393238309168,18.217484672787414,15.137534179063168,23.443789152108458,16.496341696968344,17.35802607518388,15.652686181284933,15.868387157071162,15.319457034441161,6.004459807923256,5.246422300918673,7.386104649495955,19.87137393386279,7.519071098559733,18.30890683842217,6.191354021417131,14.38205268773756,14.0,3.1332471502995958,5.382773913674319,12.62093933875811,6.015265746195898,15.89373397395029,6.932097831964626,18.553716130475735,16.870006483035702,8.796516944325873,22.587910040920747,10.704674675083432,11.183731419737834,19.337938503311168,11.04697745503069,15.612090445384338,11.875128201539388,17.195987426766564,4.124468540592082,21.045866519991776,15.944830428049366,13.475676377046485,14.870300300433062,34.49325841388136,2.236786618362425,15.171261237698966,5.095448154876108,18.553743897156046,18.102604427859085,21.600556435853598,18.818587044927796,23.702340092562864,5.991872859969721,4.582348252510215,6.6700787113943765,26.229037950566525,7.376026351436172,17.291621150643415,15.245926875859716,19.875557364729335,2.3463137362714073,37.42664059705034,23.06991929803793,24.688415443475858,12.007062290646445,6.944247656507011,2.0,11.149184835458883,9.44342478868529,13.728401614271698,28.72900666182941,9.699300316822939,19.418442152380347,7.265700122478692,12.64886068899251,10.561370269539372,8.408887135323708,17.087455904968795,14.015560528070388,13.67737247178411,10.616466634453674,21.744001029151903,4.631499743592434,13.9855477230488,2.2552399601733657,3.02687114586412,10.7147169112739,5.0864455823624155,20.78909041999602,18.440975690715938,3.0296316682050155,19.857514942793472,10.539314812205397,12.29337043434919,20.60957356005565,3.9431667009875464,16.24646491914834,26.087929945858242,12.403693261300205,28.400599915614638,16.915499824065275,20.769944070271453,19.114522748574572,19.447831587378122,3.714921181195323,33.267163079635566,26.861921216791085,11.11952410457769,10.240433460001285,22.86797631026171,13.108747876551902,12.014526296646668,11.277080108393744,28.959363731429658,18.788317688842106,12.394035624549819,12.732146916573146,7.851950544066463,20.55889970325776,12.964771164657018,11.967065699088652,17.09721242024226,13.373897171614274,12.327541491962762,20.977267012435497,10.60974702985116,13.172885209308392,6.246591950037351,20.18246876630648,12.576545939784328,10.271129678674281,25.056064552739503,13.208650061894778,8.298558532693992,13.84428804946188,6.280548829883635,12.3498122233221,18.04542108237272,19.375861865933324,11.318212611739106,15.41315641020267,15.18610658761996,2.0273761676974287,11.953164624923875,24.684762949531002,18.320806466069303,9.585098038531003,5.9341060994673605,21.25102027438771,16.64122229975693,2.483552172343842,11.0,15.597567226359672,20.148829874468905,20.271653309909777,12.420948492932602,15.15536593443804,2.3554011891324578,21.73717989368246,12.465222533123022,7.165555234870553,25.312557106461707,12.03086616560974,11.018773042268077,17.835573764659372,31.039173500766964,5.0,9.156189105145742,25.09561698366982,15.429394481266936,5.000294308162187,10.576253096417192,13.506137294581393,7.010761448753665,22.88841038712055,12.24194426529977,17.390437962062045,6.251097911368912,8.058379608473523,19.86063358491256,4.376172176430443,22.124674764029447,18.262374270034783,18.380656849749826,16.246263565959747,16.057380663072994,2.1263173903268,8.975125316739458,14.675469735631827,10.443609525508826,5.55315866833501,16.081906313720726,2.0,14.0,22.186404952119858,6.0,16.03969991389095,11.066093233422723,3.7377501524403773,20.819151290746927,15.509233202301598,32.573846603598085,17.896107626029718,19.312329128171644,1.5296850610732715,16.798702803490958,21.182771215934103,4.060422821857156,21.692720755195438,4.330913951926648,1.8415876423011173,12.730544387533204,16.81416283295793,18.126198340866246,5.682664438249777,2.377643945535597,23.49755903042425,7.944606573104714,23.605384749102512,5.974693100639481,9.866897643276527,4.461357866325098,17.02492075402037,4.058213142018128,1.6584700054271022,18.607142367688542,12.0,10.470174621445,14.355351942598194,15.408963821545587,1.3538513168193282,18.952119790486066,19.06856623393582,25.733849384841356,21.90788216916541,15.003303164265958,10.833120147414837,4.296326336442092,10.11459490867355,16.73844616581228,13.325464528785677,17.68665867925417,16.734340512468926,15.0,25.488036186161914,7.4179606757346885,15.009561843784153,26.742656368094902,0.14105164119249736,5.72102963236252,6.250980529596941,18.628192302159942,20.43325716519341,20.331155705817526,18.629821299505423,14.344455462604813,18.41138817947436,20.87403527850759,17.771357939947574,17.60729895148951,23.82133787550076,26.04466620774518,13.08075122864675,3.274944891117382,27.383793194617173,8.981615922798724,17.88934474534347,25.65531860405458,17.304376235523186,12.462367660526994,23.23748136824753,0.795730366631564,10.8901448556765,28.664497591326686,22.99201708862625,7.049289619162432,16.828574933735965,23.202533682017187,17.0,18.059188460214,16.881760028179286,14.517596925387359,7.071754598382944,17.982029798043012,15.251057557117994,16.5883997443417,11.600795722601754,6.747898258945668,19.644419722302857,8.432265418744574,3.120988388771311,7.106866139757397,27.164101588426263,14.837111853206483,13.325841624864779,2.4650960279432477,19.846216320225327,20.402933306176678,3.8994277561811748,6.0,29.274716675309694,19.903962086300496,22.79261856641837,11.163101848284457,12.433319913874275,15.608600449870414,16.03818833751403,19.762490966463375,23.819949908607583,18.395671201480393,5.541587527635322,5.469065952567608,11.534063754608574,20.722544288488393,22.644099267968286,20.122569370022816,1.129789314354004,5.438939998639404,2.0644973689154735,20.115491031111375,6.175275494501305,14.596987027979548,29.3841996448835,23.12921967804614,19.0,22.504345937219114,17.810060193529377,18.4269283088693,17.66202906014417,18.811472631292805,10.192874103566327,26.962516313556655,16.828683521627955,8.296824388528528,19.66519608376823,19.156501761275532,8.929689370830076,1.1401468350174477,8.214813932789992,14.0,22.095522547126144,11.52268907512193,10.550761923134866,4.723994279606533,19.402182347761066,19.22073235931359,24.721900517310427,29.507477308660658,28.260794708799178,15.702102897626583,24.540513550925883,21.045602866324124,10.264338750082338,20.665063262653987,8.553661035566147,6.368180322748356,20.766975941558155,31.49404819358226,17.907732795831866,19.73187534721374,26.23364384389037,10.368770584845661,11.991633754174433,5.480321792728191,2.771667768498354,34.70010687979129,5.6653774820448355,13.575539265665965,23.382244415939525,3.0393353793328854,11.28780737628389,23.82060196838505,30.260759630762088,15.65553396139277,11.110837762478148,19.52536019661109,25.434540095305106,13.106765942867318,16.49586431576931,9.731976398902624,7.148006636537406,19.99025610435229,34.32215923579352,18.982376740447194,16.005864855919796,11.212556688842115,6.797856218093057,3.6621774528187716,13.133997542489734,22.50910684116288,14.765574343687755,15.96627567476666,7.053109122053615,25.21292033963518,21.643060856045196,13.21334064343006,2.79868991913238,21.60067642251275,20.15183873410476,7.104304061167895,0.1787973581678497,31.06272569606199,21.445127474189597,18.76309919410197,15.763061803879609,19.262012573343252,17.729780677477326,5.394885854235699,10.939676707468298,23.24673244198537,24.947174337204796,12.31278146535323,10.878715170230874,10.11548903478696,13.730936542360414,11.315868934294286,18.622277073843808,19.630746053494654,4.303951790413387,9.020640805488785,27.108171363869925,25.038459727422683,1.1092111344601798,32.043606851806004,17.138687720287724,8.058534321843155,21.51135264840527,18.137015890719525,14.357786441901304,4.204413286943286,16.652548330888653,20.233015574141632,6.09899201711956,21.82600651592715,18.727884957372762,12.917709815681478,8.0,30.944397856372763,23.821252644732464,0.5967039728291592,12.944135541444599,10.789967488651847,13.83856239035549,26.368537516366043,12.437654962284661,19.890642550104992,14.096159787950105,19.012034008239105,28.595674290479412,27.20685429096617,12.670247230061804,10.115580251632617,20.836325268386364,29.06078532835881,10.896887639468508,13.66592708082681,26.998620073145958,12.0,12.65810576455729,11.405713780563785,13.117663294332214,21.859251337443794,2.340788958665381,10.329490018711908],"b":[12,26,15,20,16,17,7,8,19,16,18,12,39,17,32,30,19,24,13,22,4,26,20,14,20,24,28,32,12,18,23,23,19,9,33,23,32,14,15,34,28,12,22,29,34,21,25,4,14,21,2,14,33,24,17,9,22,31,18,19,17,16,22,10,23,2,16,27,12,18,10,8,30,22,36,29,28,31,16,27,20,26,8,23,29,30,28,22,18,8,13,24,2,30,11,16,28,18,31,25,7,22,31,13,24,13,18,21,10,27,27,26,17,25,26,33,7,40,18,28,25,36,24,19,25,18,16,18,27,17,11,13,28,13,17,26,12,21,16,4,9,15,31,20,12,18,32,31,31,21,27,23,8,30,30,35,12,16,11,1,22,14,10,16,19,21,12,16,17,16,4,34,20,21,24,24,26,24,31,32,21,16,21,12,23,22,6,19,20,30,15,31,28,9,10,21,31,26,19,11,20,25,17,27,12,8,16,18,28,23,30,16,18,13,19,26,38,27,16,23,25,18,31,29,23,32,19,24,14,14,32,25,9,19,2,23,21,21,25,22,12,33,24,22,28,26,18,24,19,19,13,16,23,19,27,20,15,22,19,16,10,35,8,19,26,21,26,7,23,23,17,5,19,9,11,17,12,30,16,11,36,17,23,25,29,11,19,36,34,24,14,20,28,35,21,24,16,22,5,18,8,23,25,29,11,5,23,23,30,15,31,14,17,31,24,12,11,16,27,15,30,9,20,32,37,36,21,14,26,30,30,13,23,25,13,21,21,25,16,22,21,25,14,20,12,25,20,32,9,18,22,28,26,22,27,21,35,10,26,9,11,26,19,38,15,1,11,19,31,19,6,35,10,17,15,31,17,16,13,35,11,11,30,3,16,39,8,8,26,24,15,6,31,21,28,21,16,32,30,16,25,24,19,20,15,13,23,20,28,7,15,27,12,6,14,6,17,24,25,2,10,16,2,19,27,24,31,17,20,13,23,30,13,25,12,11,23,22,29,27,18,14,26,32,25,7,36,12,35,25,32,5,30,20,25,22,28,12,22,23,21,14,29,29,24,28,5,15,24,22,24,34,10,11,13,34,20,29,8,20,29,23,24,32,13,14,18,31,17,12,20,18,32,12,2,30,28,9,37,23,16,25,25,32,22,6,5,19,19,19,34,25,39,6,11,16,25,8,33,19,19,8,38,9,36,20,34,18,4,18,22,12,12,11,27,26,9,19,19,22,36,20,34,21,25,28,16,17,16,19,8,21,16,30,13,22,14,10,9,13,7,16,20,22,17,25,24,13,16,23,20,17,13,27,15,28,19,29,15,37,8,17,6,33,27,23,19,24,7,20,21,31,19,26,21,22,3,39,31,25,17,16,2,17,18,14,30,15,20,16,13,14,9,21,15,21,12,22,8,14,4,8,11,12,32,25,5,33,17,16,35,5,24,37,17,29,19,31,24,20,14,35,37,16,14,24,16,20,13,32,24,14,20,19,21,13,12,19,25,19,27,13,28,10,21,23,12,31,14,10,20,18,25,19,28,27,31,30,3,22,25,20,14,10,26,19,5,11,34,21,23,20,18,4,33,16,12,26,17,13,19,39,5,12,29,18,21,14,25,8,25,21,25,7,9,20,20,33,37,29,20,18,5,11,15,13,6,25,2,14,25,6,19,16,8,30,19,37,18,24,3,17,28,7,23,12,3,18,17,20,18,8,29,8,33,14,14,18,19,5,15,19,12,12,23,18,4,25,28,29,23,18,13,8,12,21,24,23,18,15,27,15,16,34,3,12,7,22,27,26,28,19,30,26,27,19,32,32,18,5,35,16,18,28,19,20,28,2,12,32,37,21,23,25,17,22,34,22,10,30,20,19,13,20,24,19,5,22,29,16,15,4,23,23,14,6,33,23,24,14,14,28,23,23,34,36,6,17,12,25,32,24,2,7,15,22,22,15,35,24,19,31,24,21,21,19,12,31,24,17,22,20,15,2,15,14,28,27,11,5,31,20,25,30,39,26,25,23,17,24,23,15,22,34,18,20,31,15,16,7,7,37,11,17,30,20,23,28,39,25,21,21,32,14,21,10,8,20,35,37,19,12,16,7,18,27,27,16,13,29,23,14,8,22,23,10,1,32,22,34,24,22,27,7,14,28,26,17,19,11,30,21,22,23,5,17,34,28,4,33,27,17,22,24,21,14,23,27,12,25,29,24,8,31,33,6,27,13,21,30,18,31,19,26,30,30,18,13,25,30,20,28,32,12,16,12,23,26,3,15],"a":[11,12,9,18,3,1,3,5,9,8,3,2,20,11,18,11,10,14,1,12,3,8,6,2,10,8,19,19,5,4,19,13,16,6,18,15,16,4,14,14,9,4,12,13,15,4,11,1,14,14,0,2,19,5,16,1,17,18,12,18,16,2,16,7,19,0,8,18,6,6,4,2,14,13,19,18,11,11,11,17,7,6,0,15,10,10,12,19,4,0,5,17,0,11,5,2,19,1,13,10,2,3,13,4,9,12,0,16,7,10,17,7,1,6,13,14,4,20,13,13,19,19,12,3,15,13,15,12,8,12,9,5,12,6,4,20,10,8,5,3,3,6,20,13,1,16,14,13,20,5,16,7,4,13,15,16,10,1,7,1,18,13,5,3,15,15,10,10,15,8,1,20,16,10,10,7,15,9,19,16,11,14,8,9,11,19,5,15,4,14,8,12,14,3,10,15,14,10,5,6,3,14,8,9,4,1,0,4,18,17,12,15,5,6,11,9,19,18,9,18,16,10,19,15,8,14,16,6,12,5,19,7,3,4,0,12,5,17,19,4,11,16,18,13,15,12,7,16,11,7,4,4,18,1,9,17,11,5,0,9,8,19,1,8,10,11,10,7,11,18,8,0,8,6,2,14,9,12,6,1,16,6,4,10,19,7,5,20,18,19,0,14,13,19,3,17,9,16,1,16,2,16,14,16,2,1,3,10,17,14,16,0,10,20,17,12,6,15,13,3,16,3,15,12,20,16,14,12,6,18,14,1,17,14,9,9,9,12,6,4,13,17,13,1,3,15,12,17,7,5,8,17,9,11,18,19,15,4,12,0,3,17,11,18,14,1,3,2,13,18,1,17,1,15,6,15,9,10,8,17,4,3,17,1,13,20,8,8,18,13,7,4,13,19,15,13,2,19,16,10,16,17,16,19,13,3,8,17,19,6,8,18,7,3,11,6,9,6,12,0,3,2,2,17,16,13,15,3,10,3,5,16,12,10,10,3,15,12,12,17,11,3,9,16,18,5,18,11,19,11,14,1,14,12,14,11,16,0,8,3,11,4,14,19,19,14,3,2,17,8,19,15,7,5,7,18,12,17,6,9,17,18,7,19,12,12,3,16,11,11,5,18,19,9,2,10,9,2,20,11,14,8,13,14,17,3,2,18,12,14,19,16,20,5,9,1,9,4,20,6,4,4,20,6,16,11,16,10,2,15,10,5,3,10,13,16,7,14,10,11,18,12,17,2,14,13,15,12,6,1,4,12,4,10,1,14,14,2,2,12,2,14,6,11,15,7,18,9,6,18,9,15,11,15,2,13,14,12,14,19,1,15,4,13,8,10,18,20,5,4,4,12,5,13,12,9,2,19,20,18,12,6,2,8,9,12,12,5,17,4,12,10,8,16,12,12,9,19,0,5,2,2,9,5,16,14,2,14,5,1,19,3,16,19,10,20,12,20,12,19,1,17,17,10,8,16,9,3,1,19,18,10,8,5,19,12,8,12,10,10,17,6,10,2,10,5,8,20,13,8,11,2,9,12,12,11,15,15,2,4,18,17,8,2,12,7,2,11,15,20,15,8,11,2,15,5,6,19,5,7,13,20,5,9,14,4,1,6,8,7,12,12,16,2,3,16,2,13,18,16,13,14,2,6,5,1,5,16,2,14,18,6,11,7,3,17,10,18,13,11,1,16,19,4,4,1,1,11,14,8,2,2,18,6,19,0,8,2,16,3,1,6,12,7,12,2,1,16,17,10,15,8,6,3,8,13,12,17,4,15,13,0,15,19,0,2,6,17,15,10,17,13,15,14,13,14,12,20,9,2,18,6,16,17,13,7,11,0,8,19,18,7,8,11,17,17,16,9,5,17,12,3,8,1,13,6,2,4,12,2,12,0,15,18,2,6,19,9,19,9,9,10,6,18,20,17,4,2,0,13,17,20,1,2,2,18,3,10,19,11,19,17,14,14,2,16,3,18,8,5,14,19,3,0,3,14,19,8,7,1,17,16,16,20,19,9,13,18,4,14,7,6,17,20,12,14,17,7,9,4,2,18,5,5,11,2,7,8,19,8,11,13,17,13,16,2,7,19,18,18,5,11,1,3,11,14,9,11,7,18,16,13,2,10,16,7,0,19,15,16,6,11,9,2,9,20,20,2,5,9,12,5,4,12,2,5,18,18,1,16,17,1,4,5,14,1,13,18,5,11,12,11,8,15,19,0,9,8,13,12,8,19,8,13,16,13,3,6,9,17,9,9,18,12,10,2,3,7,2,7]}
},{}],43:[function(require,module,exports){
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

var smallRange = require( './fixtures/julia/small_range.json' );
var mediumRange = require( './fixtures/julia/medium_range.json' );
var largeRange = require( './fixtures/julia/large_range.json' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.equal( typeof factory, 'function', 'main export is a function' );
	t.end();
});

tape( 'the function returns a function', function test( t ) {
	var logcdf = factory( 0, 1 );
	t.equal( typeof logcdf, 'function', 'returns a function' );
	t.end();
});

tape( 'if provided a non-integer value for `a` or `b`, the created function returns `NaN`', function test( t ) {
	var logcdf;
	var y;

	logcdf = factory( 0, 1 );
	y = logcdf( NaN );
	t.equal( isnan( y ), true, 'returns NaN' );

	logcdf = factory( NaN, 1 );
	y = logcdf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	logcdf = factory( 1, NaN );
	y = logcdf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	logcdf = factory( NaN, NaN );
	y = logcdf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	logcdf = factory( NaN, NaN );
	y = logcdf( NaN );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'if provided `NaN` for any parameter, the created function returns `NaN`', function test( t ) {
	var logcdf;
	var y;

	logcdf = factory( 0, 3.5 );
	y = logcdf( 1.4 );
	t.equal( isnan( y ), true, 'returns NaN' );

	logcdf = factory( -2.2, 1 );
	y = logcdf( 1.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'if provided a finite `a` and `b`, the function returns a function which returns `0` when provided `Infinity` for `x`', function test( t ) {
	var logcdf;
	var y;

	logcdf = factory( 0, 1 );
	y = logcdf( PINF );
	t.equal( y, 0.0, 'returns 0' );

	t.end();
});

tape( 'if provided a finite `a` and `b`, the function returns a function which returns `-Infinity` when provided `-Infinity` for `x`', function test( t ) {
	var logcdf;
	var y;

	logcdf = factory( 0, 1 );
	y = logcdf( NINF );
	t.equal( y, NINF, 'returns -Infinity' );

	t.end();
});

tape( 'if provided a `a > b`, the created function always returns `NaN`', function test( t ) {
	var logcdf;
	var y;

	logcdf = factory( 2, 1 );

	y = logcdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = logcdf( 0.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	logcdf = factory( 0, NINF );
	y = logcdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	logcdf = factory( PINF, NINF );
	y = logcdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	logcdf = factory( -1, -2 );
	y = logcdf( 2.0 );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'the created function evaluates the logcdf for `x` given a small range `b - a`', function test( t ) {
	var expected;
	var logcdf;
	var delta;
	var tol;
	var a;
	var b;
	var i;
	var x;
	var y;

	expected = smallRange.expected;
	x = smallRange.x;
	a = smallRange.a;
	b = smallRange.b;
	for ( i = 0; i < x.length; i++ ) {
		logcdf = factory( a[i], b[i] );
		y = logcdf( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', a: '+a[i]+', b: '+b[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 110.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. a: '+a[i]+'. b: '+b[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the created function evaluates the logcdf for `x` given a medium range `b - a`', function test( t ) {
	var expected;
	var logcdf;
	var delta;
	var tol;
	var a;
	var b;
	var i;
	var x;
	var y;

	expected = mediumRange.expected;
	x = mediumRange.x;
	a = mediumRange.a;
	b = mediumRange.b;
	for ( i = 0; i < x.length; i++ ) {
		logcdf = factory( a[i], b[i] );
		y = logcdf( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', a: '+a[i]+', b: '+b[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 80.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. a: '+a[i]+'. b: '+b[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the created function evaluates the logcdf for `x` given a large range `b - a`', function test( t ) {
	var expected;
	var logcdf;
	var delta;
	var tol;
	var a;
	var b;
	var i;
	var x;
	var y;

	expected = largeRange.expected;
	x = largeRange.x;
	a = largeRange.a;
	b = largeRange.b;
	for ( i = 0; i < x.length; i++ ) {
		logcdf = factory( a[i], b[i] );
		y = logcdf( x[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', a: '+a[i]+', b: '+b[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 150.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. a: '+a[i]+'. b: '+b[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

}).call(this,"/lib/node_modules/@stdlib/math/base/dists/discrete-uniform/logcdf/test/test.factory.js")
},{"./../lib/factory.js":37,"./fixtures/julia/large_range.json":40,"./fixtures/julia/medium_range.json":41,"./fixtures/julia/small_range.json":42,"@stdlib/constants/math/float64-eps":26,"@stdlib/constants/math/float64-ninf":28,"@stdlib/constants/math/float64-pinf":29,"@stdlib/math/base/assert/is-nan":35,"@stdlib/math/base/special/abs":47,"tape":139}],44:[function(require,module,exports){
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

}).call(this,"/lib/node_modules/@stdlib/math/base/dists/discrete-uniform/logcdf/test/test.js")
},{"./../lib":38,"tape":139}],45:[function(require,module,exports){
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

var smallRange = require( './fixtures/julia/small_range.json' );
var mediumRange = require( './fixtures/julia/medium_range.json' );
var largeRange = require( './fixtures/julia/large_range.json' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.equal( typeof logcdf, 'function', 'main export is a function' );
	t.end();
});

tape( 'if provided a non-integer value for `a` or `b`, the function returns `NaN`', function test( t ) {
	var y = logcdf( 0.4, 0, 1.5 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = logcdf( 1.0, -2.2, 3 );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'if provided `NaN` for any parameter, the function returns `NaN`', function test( t ) {
	var y = logcdf( NaN, 0, 1 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = logcdf( 0.0, NaN, 1 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = logcdf( 0.0, 1, NaN );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'if provided `Infinity` for `x` and a valid `a` and `b`, the function returns `0`', function test( t ) {
	var y = logcdf( PINF, 2, 4 );
	t.equal( y, 0.0, 'returns 0' );
	t.end();
});

tape( 'if provided `-Infinity` for `x` and a valid `a` and `b`, the function returns `-Infinity`', function test( t ) {
	var y = logcdf( NINF, 2, 4 );
	t.equal( y, NINF, 'returns -Infinity' );
	t.end();
});

tape( 'if provided `a > b`, the function returns `NaN`', function test( t ) {
	var y;

	y = logcdf( 0.0, 3, 2 );
	t.equal( isnan( y ), true, 'returns NaN' );

	y = logcdf( 0.0, -2, -3 );
	t.equal( isnan( y ), true, 'returns NaN' );

	t.end();
});

tape( 'the function evaluates the logcdf for `x` given a small range `b - a`', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var a;
	var b;
	var y;
	var i;

	expected = smallRange.expected;
	x = smallRange.x;
	a = smallRange.a;
	b = smallRange.b;
	for ( i = 0; i < x.length; i++ ) {
		y = logcdf( x[i], a[i], b[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', a: '+a[i]+', b: '+b[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 110.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. a: '+a[i]+'. b: '+b[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the function evaluates the logcdf for `x` given a medium range `b - a`', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var a;
	var b;
	var y;
	var i;

	expected = mediumRange.expected;
	x = mediumRange.x;
	a = mediumRange.a;
	b = mediumRange.b;
	for ( i = 0; i < x.length; i++ ) {
		y = logcdf( x[i], a[i], b[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', a: '+a[i]+', b: '+b[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 80.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. a: '+a[i]+'. b: '+b[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

tape( 'the function evaluates the logcdf for `x` given a large range `b - a`', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var a;
	var b;
	var y;
	var i;

	expected = largeRange.expected;
	x = largeRange.x;
	a = largeRange.a;
	b = largeRange.b;
	for ( i = 0; i < x.length; i++ ) {
		y = logcdf( x[i], a[i], b[i] );
		if ( y === expected[i] ) {
			t.equal( y, expected[i], 'x: '+x[i]+', a: '+a[i]+', b: '+b[i]+', y: '+y+', expected: '+expected[i] );
		} else {
			delta = abs( y - expected[ i ] );
			tol = 150.0 * EPS * abs( expected[ i ] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[ i ]+'. a: '+a[i]+'. b: '+b[i]+'. y: '+y+'. E: '+expected[ i ]+'. Δ: '+delta+'. tol: '+tol+'.' );
		}
	}
	t.end();
});

}).call(this,"/lib/node_modules/@stdlib/math/base/dists/discrete-uniform/logcdf/test/test.logcdf.js")
},{"./../lib":38,"./fixtures/julia/large_range.json":40,"./fixtures/julia/medium_range.json":41,"./fixtures/julia/small_range.json":42,"@stdlib/constants/math/float64-eps":26,"@stdlib/constants/math/float64-ninf":28,"@stdlib/constants/math/float64-pinf":29,"@stdlib/math/base/assert/is-nan":35,"@stdlib/math/base/special/abs":47,"tape":139}],46:[function(require,module,exports){
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

},{}],47:[function(require,module,exports){
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

},{"./abs.js":46}],48:[function(require,module,exports){
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

},{}],49:[function(require,module,exports){
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

},{"./floor.js":48}],50:[function(require,module,exports){
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

},{"./ln.js":51}],51:[function(require,module,exports){
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

},{"./polyval_p.js":52,"./polyval_q.js":53,"@stdlib/constants/math/float64-exponent-bias":27,"@stdlib/constants/math/float64-ninf":28,"@stdlib/math/base/assert/is-nan":35,"@stdlib/number/float64/base/get-high-word":55,"@stdlib/number/float64/base/set-high-word":58}],52:[function(require,module,exports){
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

},{}],53:[function(require,module,exports){
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

},{}],54:[function(require,module,exports){
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

},{"@stdlib/assert/is-little-endian":18}],55:[function(require,module,exports){
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

},{"./high.js":54,"@stdlib/array/float64":2,"@stdlib/array/uint32":7}],57:[function(require,module,exports){
arguments[4][54][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":18,"dup":54}],58:[function(require,module,exports){
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

},{"./main.js":59}],59:[function(require,module,exports){
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

},{"./high.js":57,"@stdlib/array/float64":2,"@stdlib/array/uint32":7}],60:[function(require,module,exports){
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

},{}],61:[function(require,module,exports){
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

},{"./constant_function.js":60}],62:[function(require,module,exports){
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

},{}],63:[function(require,module,exports){
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

},{"./define_read_only_property.js":62}],64:[function(require,module,exports){
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

},{"./float64array.js":65,"@stdlib/assert/is-float64array":15}],65:[function(require,module,exports){
'use strict';

// EXPORTS //

module.exports = ( typeof Float64Array === 'function' ) ? Float64Array : null;

},{}],66:[function(require,module,exports){
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

},{"./detect_float64array_support.js":64}],67:[function(require,module,exports){
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

},{}],68:[function(require,module,exports){
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

},{"./detect_symbol_support.js":67}],69:[function(require,module,exports){
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

},{"@stdlib/utils/detect-symbol-support":68}],70:[function(require,module,exports){
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

},{"./has_tostringtag_support.js":69}],71:[function(require,module,exports){
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

},{"./uint16array.js":73,"@stdlib/assert/is-uint16array":20,"@stdlib/constants/math/uint16-max":30}],72:[function(require,module,exports){
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

},{"./detect_uint16array_support.js":71}],73:[function(require,module,exports){
'use strict';

// EXPORTS //

module.exports = ( typeof Uint16Array === 'function' ) ? Uint16Array : null;

},{}],74:[function(require,module,exports){
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

},{"./uint32array.js":76,"@stdlib/assert/is-uint32array":22,"@stdlib/constants/math/uint32-max":31}],75:[function(require,module,exports){
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

},{"./detect_uint32array_support.js":74}],76:[function(require,module,exports){
'use strict';

// EXPORTS //

module.exports = ( typeof Uint32Array === 'function' ) ? Uint32Array : null;

},{}],77:[function(require,module,exports){
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

},{"./uint8array.js":79,"@stdlib/assert/is-uint8array":24,"@stdlib/constants/math/uint8-max":32}],78:[function(require,module,exports){
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

},{"./detect_uint8array_support.js":77}],79:[function(require,module,exports){
'use strict';

// EXPORTS //

module.exports = ( typeof Uint8Array === 'function' ) ? Uint8Array : null;

},{}],80:[function(require,module,exports){
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

},{"./native_class.js":81,"./polyfill.js":82,"@stdlib/utils/detect-tostringtag-support":70}],81:[function(require,module,exports){
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

},{"./tostring.js":83}],82:[function(require,module,exports){
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

},{"./tostring.js":83,"./tostringtag.js":84,"@stdlib/assert/has-own-property":14}],83:[function(require,module,exports){
'use strict';

// MAIN //

var toStr = Object.prototype.toString;


// EXPORTS //

module.exports = toStr;

},{}],84:[function(require,module,exports){
'use strict';

// MAIN //

var toStrTag = ( typeof Symbol === 'function' ) ? Symbol.toStringTag : '';


// EXPORTS //

module.exports = toStrTag;

},{}],85:[function(require,module,exports){
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

},{}],86:[function(require,module,exports){

},{}],87:[function(require,module,exports){
arguments[4][86][0].apply(exports,arguments)
},{"dup":86}],88:[function(require,module,exports){
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

},{}],89:[function(require,module,exports){
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

},{"base64-js":85,"ieee754":108}],90:[function(require,module,exports){
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
},{"../../is-buffer/index.js":110}],91:[function(require,module,exports){
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

},{"./lib/is_arguments.js":92,"./lib/keys.js":93}],92:[function(require,module,exports){
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

},{}],93:[function(require,module,exports){
exports = module.exports = typeof Object.keys === 'function'
  ? Object.keys : shim;

exports.shim = shim;
function shim (obj) {
  var keys = [];
  for (var key in obj) keys.push(key);
  return keys;
}

},{}],94:[function(require,module,exports){
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

},{"foreach":104,"object-keys":114}],95:[function(require,module,exports){
module.exports = function () {
    for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] !== undefined) return arguments[i];
    }
};

},{}],96:[function(require,module,exports){
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

},{"./helpers/isFinite":97,"./helpers/isNaN":98,"./helpers/mod":99,"./helpers/sign":100,"es-to-primitive/es5":101,"has":107,"is-callable":111}],97:[function(require,module,exports){
var $isNaN = Number.isNaN || function (a) { return a !== a; };

module.exports = Number.isFinite || function (x) { return typeof x === 'number' && !$isNaN(x) && x !== Infinity && x !== -Infinity; };

},{}],98:[function(require,module,exports){
module.exports = Number.isNaN || function isNaN(a) {
	return a !== a;
};

},{}],99:[function(require,module,exports){
module.exports = function mod(number, modulo) {
	var remain = number % modulo;
	return Math.floor(remain >= 0 ? remain : remain + modulo);
};

},{}],100:[function(require,module,exports){
module.exports = function sign(number) {
	return number >= 0 ? 1 : -1;
};

},{}],101:[function(require,module,exports){
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

},{"./helpers/isPrimitive":102,"is-callable":111}],102:[function(require,module,exports){
module.exports = function isPrimitive(value) {
	return value === null || (typeof value !== 'function' && typeof value !== 'object');
};

},{}],103:[function(require,module,exports){
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

},{}],104:[function(require,module,exports){

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


},{}],105:[function(require,module,exports){
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

},{}],106:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

module.exports = Function.prototype.bind || implementation;

},{"./implementation":105}],107:[function(require,module,exports){
var bind = require('function-bind');

module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);

},{"function-bind":106}],108:[function(require,module,exports){
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

},{}],109:[function(require,module,exports){
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

},{}],110:[function(require,module,exports){
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

},{}],111:[function(require,module,exports){
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

},{}],112:[function(require,module,exports){
var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};

},{}],113:[function(require,module,exports){
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

},{}],114:[function(require,module,exports){
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

},{"./isArguments":115}],115:[function(require,module,exports){
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

},{}],116:[function(require,module,exports){
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
},{"_process":88}],117:[function(require,module,exports){
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
},{"_process":88}],118:[function(require,module,exports){
module.exports = require('./lib/_stream_duplex.js');

},{"./lib/_stream_duplex.js":119}],119:[function(require,module,exports){
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
},{"./_stream_readable":121,"./_stream_writable":123,"core-util-is":90,"inherits":109,"process-nextick-args":117}],120:[function(require,module,exports){
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
},{"./_stream_transform":122,"core-util-is":90,"inherits":109}],121:[function(require,module,exports){
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
},{"./_stream_duplex":119,"./internal/streams/BufferList":124,"./internal/streams/destroy":125,"./internal/streams/stream":126,"_process":88,"core-util-is":90,"events":103,"inherits":109,"isarray":112,"process-nextick-args":117,"safe-buffer":132,"string_decoder/":138,"util":86}],122:[function(require,module,exports){
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
},{"./_stream_duplex":119,"core-util-is":90,"inherits":109}],123:[function(require,module,exports){
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
},{"./_stream_duplex":119,"./internal/streams/destroy":125,"./internal/streams/stream":126,"_process":88,"core-util-is":90,"inherits":109,"process-nextick-args":117,"safe-buffer":132,"util-deprecate":145}],124:[function(require,module,exports){
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
},{"safe-buffer":132}],125:[function(require,module,exports){
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
},{"process-nextick-args":117}],126:[function(require,module,exports){
module.exports = require('events').EventEmitter;

},{"events":103}],127:[function(require,module,exports){
module.exports = require('./readable').PassThrough

},{"./readable":128}],128:[function(require,module,exports){
exports = module.exports = require('./lib/_stream_readable.js');
exports.Stream = exports;
exports.Readable = exports;
exports.Writable = require('./lib/_stream_writable.js');
exports.Duplex = require('./lib/_stream_duplex.js');
exports.Transform = require('./lib/_stream_transform.js');
exports.PassThrough = require('./lib/_stream_passthrough.js');

},{"./lib/_stream_duplex.js":119,"./lib/_stream_passthrough.js":120,"./lib/_stream_readable.js":121,"./lib/_stream_transform.js":122,"./lib/_stream_writable.js":123}],129:[function(require,module,exports){
module.exports = require('./readable').Transform

},{"./readable":128}],130:[function(require,module,exports){
module.exports = require('./lib/_stream_writable.js');

},{"./lib/_stream_writable.js":123}],131:[function(require,module,exports){
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
},{"_process":88,"through":144}],132:[function(require,module,exports){
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

},{"buffer":89}],133:[function(require,module,exports){
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

},{"events":103,"inherits":109,"readable-stream/duplex.js":118,"readable-stream/passthrough.js":127,"readable-stream/readable.js":128,"readable-stream/transform.js":129,"readable-stream/writable.js":130}],134:[function(require,module,exports){
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

},{"es-abstract/es5":96,"function-bind":106}],135:[function(require,module,exports){
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

},{"./implementation":134,"./polyfill":136,"./shim":137,"define-properties":94,"function-bind":106}],136:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

var zeroWidthSpace = '\u200b';

module.exports = function getPolyfill() {
	if (String.prototype.trim && zeroWidthSpace.trim() === zeroWidthSpace) {
		return String.prototype.trim;
	}
	return implementation;
};

},{"./implementation":134}],137:[function(require,module,exports){
'use strict';

var define = require('define-properties');
var getPolyfill = require('./polyfill');

module.exports = function shimStringTrim() {
	var polyfill = getPolyfill();
	define(String.prototype, { trim: polyfill }, { trim: function () { return String.prototype.trim !== polyfill; } });
	return polyfill;
};

},{"./polyfill":136,"define-properties":94}],138:[function(require,module,exports){
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
},{"safe-buffer":132}],139:[function(require,module,exports){
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
},{"./lib/default_stream":140,"./lib/results":142,"./lib/test":143,"_process":88,"defined":95,"through":144}],140:[function(require,module,exports){
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
},{"_process":88,"fs":87,"through":144}],141:[function(require,module,exports){
(function (process){
module.exports = typeof setImmediate !== 'undefined'
    ? setImmediate
    : process.nextTick
;

}).call(this,require('_process'))
},{"_process":88}],142:[function(require,module,exports){
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
},{"_process":88,"events":103,"function-bind":106,"has":107,"inherits":109,"object-inspect":113,"resumer":131,"through":144}],143:[function(require,module,exports){
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
},{"./next_tick":141,"deep-equal":91,"defined":95,"events":103,"has":107,"inherits":109,"path":116,"string.prototype.trim":135}],144:[function(require,module,exports){
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
},{"_process":88,"stream":133}],145:[function(require,module,exports){
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
},{}]},{},[43,44,45]);
