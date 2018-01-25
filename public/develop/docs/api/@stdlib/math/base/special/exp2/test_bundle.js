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

},{"./float64array.js":1,"./polyfill.js":3,"@stdlib/utils/detect-float64array-support":78}],3:[function(require,module,exports){
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

},{"./polyfill.js":5,"./uint16array.js":6,"@stdlib/utils/detect-uint16array-support":84}],5:[function(require,module,exports){
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

},{"./polyfill.js":8,"./uint32array.js":9,"@stdlib/utils/detect-uint32array-support":87}],8:[function(require,module,exports){
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

},{"./polyfill.js":11,"./uint8array.js":12,"@stdlib/utils/detect-uint8array-support":90}],11:[function(require,module,exports){
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

},{"@stdlib/utils/native-class":92}],17:[function(require,module,exports){
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

},{"@stdlib/utils/native-class":92}],22:[function(require,module,exports){
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

},{"@stdlib/utils/native-class":92}],24:[function(require,module,exports){
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

},{"@stdlib/utils/native-class":92}],26:[function(require,module,exports){
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
* The minimum biased base 2 exponent for a normal double-precision floating-point number.
*
* @module @stdlib/constants/math/float64-min-base2-exponent
* @type {integer32}
*
* @example
* var FLOAT64_MIN_BASE2_EXPONENT = require( '@stdlib/constants/math/float64-min-base2-exponent' );
* // returns -1022
*/


// MAIN //

/**
* The minimum biased base 2 exponent for a normal double-precision floating-point number.
*
* ```text
* 1 - BIAS = -1022
* ```
*
* where `BIAS = 1023`.
*
* @constant
* @type {integer32}
* @default -1022
* @see [IEEE 754]{@link https://en.wikipedia.org/wiki/IEEE_754-1985}
*/
var FLOAT64_MIN_BASE2_EXPONENT = -1022|0; // asm type annotation


// EXPORTS //

module.exports = FLOAT64_MIN_BASE2_EXPONENT;

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

},{"@stdlib/constants/math/float64-ninf":33,"@stdlib/constants/math/float64-pinf":34}],41:[function(require,module,exports){
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

},{"@stdlib/number/float64/base/from-words":63,"@stdlib/number/float64/base/get-high-word":67,"@stdlib/number/float64/base/to-words":72}],46:[function(require,module,exports){
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

// TODO: replace with TOMS (Openlibm) algo

/*
* The original C code, long comment, copyright, license, and constants are from [Cephes]{@link http://www.netlib.org/cephes/}.
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

var FLOAT64_MAX_BASE2_EXPONENT = require( '@stdlib/constants/math/float64-max-base2-exponent' ); // eslint-disable-line id-length
var FLOAT64_MIN_BASE2_EXPONENT = require( '@stdlib/constants/math/float64-min-base2-exponent' ); // eslint-disable-line id-length
var round = require( '@stdlib/math/base/special/round' );
var ldexp = require( '@stdlib/math/base/special/ldexp' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var PINF = require( '@stdlib/constants/math/float64-pinf' );
var polyvalP = require( './polyval_p.js' );
var polyvalQ = require( './polyval_q.js' );


// MAIN //

/**
* Evaluates the base `2` exponential function.
*
* ## Method
*
* -   Range reduction is accomplished by separating the argument into an integer \\( k \\) and fraction \\( f \\) such that
*
*     ```tex
*     2^x = 2^k 2^f
*     ```
*
* -   A Pade' approximate
*
*     ```tex
*     1 + 2x \frac{\mathrm{P}\left(x^2\right)}{\mathrm{Q}\left(x^2\right) - x \mathrm{P}\left(x^2\right)}
*     ```
*
*     approximates \\( 2^x \\) in the basic range \\( [-0.5, 0.5] \\).
*
*
* ## Notes
*
* -   Relative error:
*
*     | arithmetic | domain      | # trials | peak    | rms     |
*     |:----------:|:-----------:|:--------:|:-------:|:-------:|
*     | IEEE       | -1022,+1024 | 30000    | 1.8e-16 | 5.4e-17 |
*
*
* @param {number} x - input value
* @returns {number} function value
*
* @example
* var v = exp2( 3.0 );
* // returns 8.0
*
* @example
* var v = exp2( -9.0 );
* // returns ~0.002
*
* @example
* var v = exp2( 0.0 );
* // returns 1.0
*
* @example
* var v = exp2( NaN );
* // returns NaN
*/
function exp2( x ) {
	var px;
	var xx;
	var n;
	if ( isnan( x ) ) {
		return x;
	}
	if ( x > FLOAT64_MAX_BASE2_EXPONENT ) {
		return PINF;
	}
	if ( x < FLOAT64_MIN_BASE2_EXPONENT ) {
		return 0.0;
	}
	// Separate into integer and fractional parts...
	n = round( x );
	x -= n;

	xx = x * x;
	px = x * polyvalP( xx );
	x = px / ( polyvalQ( xx ) - px );
	x = 1.0 + ldexp( x, 1 );

	// Scale by power of 2:
	return ldexp( x, n );
}


// EXPORTS //

module.exports = exp2;

},{"./polyval_p.js":49,"./polyval_q.js":50,"@stdlib/constants/math/float64-max-base2-exponent":30,"@stdlib/constants/math/float64-min-base2-exponent":32,"@stdlib/constants/math/float64-pinf":34,"@stdlib/math/base/assert/is-nan":41,"@stdlib/math/base/special/ldexp":57,"@stdlib/math/base/special/round":59}],48:[function(require,module,exports){
'use strict';

/**
* Evaluate the base `2` exponential function.
*
* @module @stdlib/math/base/special/exp2
*
* @example
* var exp2 = require( '@stdlib/math/base/special/exp2' );
*
* var v = exp2( 3.0 );
* // returns 8.0
*
* v = exp2( -9.0 );
* // returns ~0.002
*
* v = exp2( 0.0 );
* // returns 1.0
*
* v = exp2( NaN );
* // returns NaN
*/

// MODULES //

var exp2 = require( './exp2.js' );


// EXPORTS //

module.exports = exp2;

},{"./exp2.js":47}],49:[function(require,module,exports){
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
		return 1513.906801156151;
	}
	return 1513.906801156151 + (x * (20.202065669316532 + (x * 0.023093347705734523))); // eslint-disable-line max-len
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
		return 4368.211668792106;
	}
	return 4368.211668792106 + (x * (233.1842117223149 + (x * 1.0))); // eslint-disable-line max-len
}


// EXPORTS //

module.exports = evalpoly;

},{}],51:[function(require,module,exports){
module.exports={"expected":[2.2250738585072014e-308,4.509024350626222e-308,9.137359875406772e-308,1.851649913602667e-307,3.752295465315533e-307,7.603878657404727e-307,1.5408959974230883e-306,3.122564919631273e-306,6.327754562032691e-306,1.2822944863562256e-305,2.5985191644526246e-305,5.265796523242857e-305,1.0670928813425766e-304,2.1624216058974492e-304,4.382062033596222e-304,8.880075751146613e-304,1.7995123013213353e-303,3.646640651898644e-303,7.389773348209625e-303,1.4975084015881007e-302,3.0346416691795603e-302,6.149581565321938e-302,1.2461884318212988e-301,2.5253516700433415e-301,5.1175254837425754e-301,1.0370463404134605e-300,2.101533476641207e-300,4.2586746429121814e-300,8.630036074024242e-300,1.7488427476587974e-299,3.5439608013281894e-299,7.181696683801074e-299,1.4553424868240537e-298,2.949194107198371e-298,5.97642545358131e-298,1.2110990292240295e-297,2.4542443806582765e-297,4.973429368407604e-297,1.0078458313880236e-296,2.042359797644902e-296,4.1387615180105725e-296,8.387036859380077e-296,1.6995999159289054e-295,3.4441721464415434e-295,6.9794789133303015e-295,1.4143638537914504e-294,2.866152524783957e-294,5.808144964468308e-294,1.1769976523082646e-293,2.3851392863194186e-293,4.8333906223071564e-293,9.794675322235316e-293,1.9848522944791877e-292,4.022224832665716e-292,8.150879866230324e-292,1.6517436333784776e-291,3.347193278740002e-291,6.78295506568788e-291,1.3745390717461054e-290,2.785449175852737e-290,5.644602813219422e-290,1.1438564808583534e-289,2.317980010457815e-289,4.6972950005494335e-289,9.518882916435854e-289,1.928964051996223e-288,3.9089695151819434e-288,7.921372435536129e-288,1.605234858413854e-287,3.252945081974985e-287,6.591964814918772e-287,1.3358356512660376e-286,2.7070182218734235e-286,5.485665580649173e-286,1.1116484780030597e-285,2.2527117639210503e-285,4.56503147507959e-285,9.250856102510989e-285,1.8746494760558636e-284,3.7989031708344776e-284,7.698327333033286e-284,1.560035648750406e-283,3.1613506676042733e-283,6.406352349426966e-283,1.2982220177463026e-282,2.6307956781551392e-282,5.331203604307392e-282,1.080347368158634e-281,2.1892813002757532e-281,4.4364921441020384e-281,8.990376221730838e-281,1.821864256329401e-280,3.6919360064910926e-280,7.481562596484116e-280,1.516109130458873e-279,3.072335312065634e-279,6.225966244862933e-279,1.2616674856401405e-278,2.5567193616489533e-278,5.181090872698935e-278,1.0499276155929524e-277,2.12763687236867e-277,4.311572144053168e-277,8.737230772222712e-277,1.77056533015137e-276,3.587980757359316e-276,7.270901387231013e-276,1.473419467883273e-275,2.985826395816652e-275,6.050659340590264e-275,1.2261422334253293e-274,2.48472884021712e-274,5.035204922482346e-274,1.020364403593232e-273,2.067728190110861e-273,4.1901695640526915e-273,8.491213235609459e-273,1.720710847387757e-272,3.486952615794694e-272,7.066171845929848e-272,1.4319318344058468e-271,2.901753344091046e-271,5.88028861963067e-271,1.1916172792759024e-270,2.4147653833328347e-270,4.893426738563149e-270,9.916336142203294e-270,2.0095063794505872e-269,4.072185362763818e-269,8.252122908532593e-269,1.6722601362948656e-268,3.3887691621139374e-268,6.867206952345538e-268,1.3916123840351839e-267,2.8200475693231222e-267,5.714715091988975e-267,1.158064457417923e-266,2.3467719141671175e-266,4.7556406570002385e-266,9.637118086331049e-266,1.95292394250141e-265,3.957523287594109e-265,8.019764738912565e-265,1.6251736703387849e-264,3.293350297356189e-264,6.673844389095413e-264,1.3524282237943523e-263,2.740642415193414e-263,5.553803681265619e-263,1.1254563951519807e-262,2.2806929630250137e-262,4.621734270646178e-262,9.365762079668015e-262,1.8979347187929804e-261,3.846089796172988e-261,7.79394916682624e-261,1.5794130359492842e-260,3.2006181779375588e-260,6.4859264092292046e-260,1.3143473868865072e-259,2.6634731022496343e-259,5.397423114457347e-259,1.0937664905221948e-258,2.21647462209291e-258,4.491598337444419e-258,9.10204674749838e-258,1.84449384761276e-257,3.737793980037121e-257,7.574491969861474e-257,1.534940901181669e-256,3.1104971521456144e-256,6.303299707537642e-256,1.2773388066160856e-255,2.5884766750598516e-255,5.245445814865338e-255,1.0629688906140943e-254,2.1540645014600447e-254,4.365126691308634e-254,8.845756948438574e-254,1.7925577314088247e-253,3.6325474904677334e-253,7.361214112826797e-253,1.4917209852610384e-252,3.022913698422022e-252,6.1258152954846535e-252,1.2413722910442121e-251,2.515591950851594e-251,5.097747798016499e-251,1.033038470463573e-250,2.093411686378339e-250,4.2422161555114446e-250,8.596683598922949e-250,1.7420840002217006e-249,3.530264466414593e-249,7.153941601692846e-249,1.4497180289840974e-248,2.9377963653829833e-248,5.95332837966116e-248,1.2064184983582346e-247,2.4447594695992405e-247,4.954208570515794e-247,1.0039508125597146e-246,2.0344666957256803e-246,4.1227664585119086e-246,8.354623502630845e-246,1.6930314771191539e-245,3.4308614644497834e-245,6.952505341646459e-245,1.4088977659543748e-244,2.855075713528545e-244,5.785698243660826e-244,1.1724489129338085e-243,2.375921445515772e-243,4.814711031746633e-243,9.756821869247632e-243,1.9771814416387674e-242,4.006680152153074e-242,8.11937918471981e-242,1.6453601446035248e-241,3.334257390693786e-241,6.756740999141567e-241,1.3692268946273846e-240,2.774684258593217e-240,5.622788133284163e-240,1.1394358220719889e-239,2.3090217199105963e-239,4.679141378339116e-239,9.482095317549898e-239,1.9215091902825927e-238,3.893862532162576e-238,7.89075873071982e-238,1.5990311119650854e-237,3.240373434658354e-237,6.566488867834387e-237,1.3306730511429196e-236,2.696556416491478e-236,5.464465144970426e-236,1.107352293390856e-235,2.2440057153747746e-235,4.547389011328195e-235,9.21510434606662e-235,1.867404523724552e-234,3.784221560893258e-234,7.668575629970374e-234,1.5540065835546434e-233,3.1491330049521915e-233,6.381593738293521e-233,1.2932047829223186e-232,2.6206284498145348e-232,5.3106001173755394e-232,1.0761721528538322e-231,2.1808203912562705e-231,4.4193464459260354e-231,8.95563114111767e-231,1.8148233028819345e-230,3.67766779223615e-230,7.452648623462721e-230,1.5102498279495045e-229,3.0604616667969986e-229,6.20190477137868e-229,1.2567915230090649e-228,2.5468384158314667e-228,5.161067526000612e-228,1.0458699634166627e-227,2.1194142003889017e-227,4.294909223834933e-227,8.70346402208572e-227,1.7637226315134314e-226,3.5741142986507674e-226,7.242801555967099e-226,1.4677251479876413e-225,2.974287081302893e-225,6.027275375184736e-225,1.221403565132383e-224,2.4751261159566455e-224,5.015745380787906e-224,1.0164210042756415e-223,2.059737047039688e-223,4.173975828029281e-223,8.458397268724589e-223,1.7140608212231202e-222,3.4734766002485105e-222,7.038863232323678e-222,1.426397851645622e-221,2.890538946453684e-221,5.857563085450235e-221,1.1870120394719874e-220,2.4054330466389613e-220,4.874515126600232e-220,9.87801250700154e-220,2.0017402460402942e-219,4.056447599937052e-219,8.220230953333465e-219,1.6657973574512715e-218,3.3756725958731973e-218,6.840667277779992e-218,1.3862342237365398e-217,2.8091489397538427e-217,5.6926294493356115e-217,1.1535888891062239e-216,2.337702351634087e-216,4.7372615465025776e-216,9.599873544330811e-216,1.9453764830692245e-215,3.9422286589529196e-215,7.988770777650005e-215,1.6188928664220552e-214,3.2806224961221915e-214,6.64805200226088e-214,1.3472014984048543e-213,2.7300506624901698e-213,5.5323399124692855e-213,1.1211068471228734e-212,2.2718787756206366e-212,4.6038726677670795e-212,9.329566246430774e-212,1.890599776052364e-211,3.831225824219233e-211,7.763827914342749e-211,1.5733090830220528e-210,3.188248758253473e-210,6.460860268460252e-210,1.3092678323957068e-209,2.6531795855639827e-209,5.376563709178856e-209,1.0895394143745562e-208,2.2079086191223654e-208,4.474239670524646e-208,9.066870094131835e-208,1.8373654376502385e-207,3.723348538606328e-207,7.545218852963374e-207,1.5290088195832262e-206,3.09847602292556e-206,6.278939363647028e-206,1.2724022790769008e-205,2.5784729968463776e-205,5.225173755810794e-205,1.0588608378604837e-204,2.1457396946996455e-204,4.348256798988709e-204,8.811570777506694e-204,1.7856300388022558e-203,3.618508794836466e-203,7.332765250237181e-203,1.4859559355448797e-202,3.0112310527186697e-202,6.1021408750806965e-202,1.2365747631922595e-201,2.505869950017979e-201,5.078046547054435e-201,1.0290460897169248e-200,2.085321284374477e-200,4.2258212751786885e-200,8.563460021033676e-200,1.7353513732959988e-199,3.516621063686363e-199,7.12629378456903e-199,1.444115307969857e-198,2.926442672386957e-198,5.93032056893484e-198,1.2017560563263477e-197,2.4353112148481528e-197,4.935062055185217e-197,1.0000708467992464e-196,2.0266040982542934e-196,4.1068332150727714e-196,8.322335413686365e-196,1.6864884233356034e-195,3.417602224211673e-195,6.925636014645982e-195,1.40345280289093e-194,2.844041710793101e-194,5.763338272629406e-194,1.1679177530590702e-193,2.366739228874441e-193,4.796103632144958e-193,9.719114708388676e-193,1.969540234320819e-192,3.991195547121299e-192,8.088000243800733e-192,1.639001326078916e-191,3.3213714959361574e-191,6.730628242021345e-191,1.3639352474639927e-190,2.7639609444778535e-190,5.601057760478461e-190,1.1350322477926688e-189,2.3000980504425786e-189,4.661057914379305e-189,9.445449891589448e-189,1.9140831393511602e-188,3.8788139330561706e-188,7.860263338598717e-188,1.59285134111702e-187,3.227850372950231e-187,6.541111377567973e-187,1.3255304029053545e-186,2.6861350428183176e-186,5.443346642553261e-186,1.1030727122307212e-185,2.2353333130687786e-185,4.52981473035471e-185,9.179490759330512e-185,1.860187570939118e-184,3.7695966909269134e-184,7.63893890822702e-184,1.5480008188694582e-183,3.1369625598651237e-183,6.356930811691901e-183,1.2882069381910421e-182,2.6105005147314756e-182,5.2900762566791964e-182,1.072013073491372e-181,2.1723921810870578e-181,4.40226701067948e-181,8.921020339715631e-181,1.8078095605866037e-180,3.663454720306987e-180,7.4238463941880515e-180,1.5044131698693571e-179,3.0486339095704045e-179,6.177936288200425e-179,1.2519344044965662e-178,2.5369956568762977e-178,5.14112156347154e-178,1.0418279928368367e-177,2.111223306545415e-177,4.278310700755588e-177,8.669827770208253e-177,1.7569063778328478e-176,3.560301429604516e-176,7.214810322038647e-176,1.4620528349134073e-175,2.9627923627440874e-175,6.00398178172172e-175,1.2166832103568888e-174,2.4655605033164534e-174,4.996361044327173e-174,1.0124928450018268e-173,2.0517767873157023e-173,4.15784467588998e-173,8.42570812561068e-173,1.707436495395095e-172,3.460052665420079e-172,7.01166015823641e-172,1.420885256052338e-171,2.8793678890659764e-171,5.834925378575548e-171,1.1824245975248343e-170,2.396136776599334e-170,4.855676602288596e-170,9.839836981040338e-170,1.994004126383012e-169,4.04077065879612e-169,8.188462250880048e-169,1.6593595552901172e-168,3.362626643893593e-168,6.814230171016892e-168,1.3808768483982265e-167,2.7982924300862914e-167,5.670629161000627e-167,1.1491306175102511e-166,2.328667840212775e-166,4.7189534656993466e-166,9.562772941202793e-166,1.937858192281368e-165,3.926993139418177e-165,7.957896598658624e-165,1.6126363359097994e-164,3.26794388398429e-164,6.622359295188092e-164,1.3419949727256379e-163,2.7194998437027447e-163,5.5109590946372604e-163,1.116774108779276e-162,2.2630986523804673e-162,4.586080094572236e-162,9.293510299124074e-162,1.883293180643442e-161,3.816419297014287e-161,7.73382307137538e-161,1.5672287200237945e-160,3.1759271426293576e-160,6.435891000732005e-160,1.3042079088442473e-159,2.6429258502020726e-159,5.355784919182758e-159,1.0853286745957062e-158,2.1993757211583746e-158,4.456948089594e-158,9.031829387874374e-158,1.83026457683279e-157,3.7089589244306607e-157,7.516058867794284e-157,1.523099663683137e-156,3.0865013517283414e-156,6.254673165105994e-156,1.267484829721117e-155,2.568507979818752e-155,5.2049800421234135e-155,1.0547686614863e-154,2.137447060795515e-154,4.3314521036919784e-154,8.777516725768993e-154,1.778729119629053e-153,3.604524354511025e-153,7.304426333883369e-153,1.4802131659994486e-152,2.999593556901781e-152,6.078557949139592e-152,1.2317957763321727e-151,2.4961855217724693e-151,5.058421435459177e-151,1.0250691383124377e-150,2.077262149323508e-150,4.209489756091699e-150,8.530364842209429e-150,1.7286447659338964e-149,3.503030388576637e-149,7.098752817882954e-149,1.4385342397750865e-148,2.9151328579748345e-148,5.907401676426914e-148,1.1971116332205524e-147,2.4258994747394878e-147,4.915989535336277e-147,9.962058759310717e-147,2.018771887340212e-146,4.090961548792657e-146,8.290172108424847e-146,1.679970656472818e-145,3.4043942269204184e-145,6.89887052945475e-145,1.3980288829602097e-144,2.8330503511355514e-144,5.741064716112671e-144,1.1634041047446548e-143,2.35759249871883e-143,4.777568144505942e-143,9.681553274283687e-143,1.961928557954301e-142,3.97577078539764e-142,8.0567425729829e-142,1.6326670824616072e-141,3.308535401258201e-141,6.704616402796971e-141,1.3586640509138183e-140,2.7532790727229896e-140,5.579411368981021e-140,1.1306456919939494e-139,2.291208868253779e-139,4.643044337529617e-139,9.408946089098848e-139,1.906685787856905e-138,3.863823492226743e-138,7.829885801930094e-138,1.5866954532112245e-137,3.2153757090819583e-137,6.515831963613495e-137,1.3204076294452964e-136,2.6757539445975286e-136,5.422309756750655e-136,1.098809670355343e-135,2.2266944269705366e-135,4.512308368653354e-135,9.14401480831824e-135,1.8529985094901638e-134,3.755028341652778e-134,7.609416723435256e-134,1.5420182646454353e-133,3.1248391498614854e-133,6.332363199830126e-133,1.2832284086155879e-132,2.6004117210495267e-132,5.269631714487085e-132,1.0678700677107243e-131,2.1639965433969638e-131,4.3852535822760513e-131,8.886543298575898e-131,1.8008229242806196e-130,3.649296577595218e-130,7.395155476804376e-130,1.4985990687045718e-129,3.036851863042351e-129,6.15406043594856e-129,1.2470960572757847e-128,2.5271909372028914e-128,5.121252686045348e-128,1.0378016432488542e-127,2.1030640680253387e-127,4.261776325939533e-127,8.636321512255778e-127,1.7501164669079388e-126,3.5465419431127514e-126,7.186927265749852e-126,1.4564024436108732e-125,2.951342067790263e-125,5.9807782109408e-125,1.2119810983226974e-124,2.4560318588713734e-124,4.977051622454701e-124,1.0085798668736353e-123,2.0438472915840416e-123,4.1417758657668715e-123,8.393145316132609e-123,1.7008377705796671e-122,3.446680610033204e-122,6.984562215789774e-122,1.4153939649710737e-121,2.8682400044308747e-121,5.812375159580448e-121,1.1778548846511647e-120,2.386876433827261e-120,4.836910883166608e-120,9.80180899192234e-120,1.9862979044845993e-119,4.025154304283473e-119,8.15681632483814e-119,1.6529466332840917e-118,3.349631110566337e-118,6.787895235662753e-118,1.3755401776926142e-117,2.7874778775396975e-117,5.648713897115662e-117,1.1446895757834382e-116,2.3196682444412523e-116,4.7007161400822934e-116,9.525815720666484e-116,1.9303689574097902e-115,3.9118165005512457e-115,7.927141739016229e-115,1.6064039849926623e-114,3.255314270841528e-114,6.596765882644964e-114,1.3368085686908892e-113,2.7089898006338465e-113,5.489660907189412e-113,1.1124581151568462e-112,2.25435246165683e-112,4.5683562842828275e-112,9.257593697130804e-112,1.8760148230122914e-111,3.801669992551749e-111,7.703934188036614e-111,1.5611718557865807e-110,3.1636531463170027e-110,6.411018231659252e-110,1.299167540364444e-109,2.6327117424212433e-109,5.335086432915408e-109,1.0811342080505286e-108,2.1908758002601165e-108,4.439723335385281e-108,8.996924103331247e-108,1.8231911586913865e-107,3.6946249217546897e-107,7.487011577134342e-107,1.5172133448805213e-106,3.0745729590077744e-106,6.230500748071037e-106,1.262586384817584e-105,2.5585814745633046e-105,5.1848643710220885e-105,1.0506923001341461e-104,2.1291864754093095e-104,4.31471235345204e-104,8.743594282625499e-104,1.7718548704178663e-103,3.5905939598110907e-103,7.276196938856464e-103,1.474492590518635e-102,2.988001036480958e-102,6.055066164063437e-102,1.2270352588085375e-101,2.4865385209083926e-101,5.038872168975135e-101,1.021107556620378e-100,2.06923416038805e-100,4.1932213533787857e-100,8.497397566225371e-100,1.721964077577526e-99,3.4894922373091424e-99,7.071318288690046e-99,1.4329747407181976e-98,2.9038667525694112e-98,5.884571358495869e-98,1.1924851594030637e-97,2.416524108155214e-97,4.896990724998852e-97,9.923558420044743e-97,2.010969945548756e-96,4.0751512216948206e-96,8.258133104594503e-96,1.673478078804509e-95,3.391237274537553e-95,6.872208484755628e-95,1.3926259248369913e-94,2.822101469753542e-94,5.718877240144245e-94,1.158907900313549e-93,2.3484811179044223e-93,4.759104290911636e-93,9.644137003742527e-93,1.9543462984111873e-92,3.960405635705214e-92,8.025605703593474e-92,1.6263573187770265e-91,3.295748914197695e-91,6.678705091451348e-91,1.3534132259415429e-90,2.7426384831666723e-90,5.557848634229087e-90,1.1262760889045585e-89,2.28235404006131e-89,4.625100377697542e-89,9.372583362747029e-89,1.8993170248853464e-88,3.848890984909866e-88,7.799625665238329e-88,1.5805633559473616e-87,3.202949256010546e-87,6.490650246936234e-87,1.315304653952855e-86,2.665412966176478e-86,5.401354172138478e-86,1.094563103845396e-85,2.2180889275500586e-85,4.494869663736714e-85,9.108675961110147e-85,1.8458372315858314e-84,3.740516294635201e-84,7.580008632944461e-84,1.5360588311811735e-83,3.1127625931649267e-83,6.3078905343460995e-83,1.2782691195488315e-82,2.590361917498825e-82,5.249266184257215e-82,1.0637430733923646e-81,2.1556333523032243e-81,4.368305905619641e-81,8.852199500756279e-81,1.7938632892074027e-80,3.635193151816058e-80,7.366575441124955e-80,1.4928074372795037e-79,3.0251153505550746e-79,6.130276856633102e-79,1.2422764088012663e-78,2.517424109800648e-78,5.101460595811465e-78,1.0337908542823144e-77,2.094936362490397e-77,4.2453058514734986e-77,8.602944745839788e-77,1.7433527969317616e-76,3.5328356328680713e-76,7.15915196902691e-76,1.4507738893590033e-75,2.9399360247579335e-75,5.95766431493205e-75,1.2072971585270203e-74,2.4465400397505785e-74,4.9578168256483e-74,1.0046820112205184e-73,2.035948440951397e-73,4.1257691567272757e-73,8.360708352048318e-73,1.6942645478367112e-72,3.433360233589559e-72,6.957568998681826e-72,1.4099238960663162e-71,2.8571551256989943e-71,5.789912090350324e-71,1.1733028323333643e-70,2.3776518794747367e-70,4.8182176878642674e-70,9.763927969462149e-70,1.9786214647994313e-69,4.0095983022504625e-69,8.1252927007133e-69,1.6465584952789644e-68,3.336685801038612e-68,6.761662076855897e-68,1.3702241316027056e-67,2.7767051199627187e-67,5.626883329086416e-67,1.1402656973375825e-66,2.3107034293811098e-66,4.682549296203966e-66,9.48900132859254e-66,1.922908666162329e-65,3.896698514795795e-65,7.896505737589838e-65,1.6001957202238337e-64,3.242733467327633e-64,6.571271380888092e-64,1.3316422085366532e-63,2.698520375697461e-63,5.468445030783796e-63,1.1081588015423091e-62,2.2456400723108272e-62,4.5507009711509675e-62,9.221815901924272e-62,1.8687645940286022e-61,3.786977689682681e-61,7.674160816177769e-61,1.555138399494818e-60,3.1514265852821315e-60,6.386241588304556e-60,1.2941466513819708e-59,2.6225371090726383e-59,5.314467940027328e-59,1.0769559518479046e-58,2.1824087289811783e-58,4.4225651496338895e-58,8.962153717139264e-58,1.8161450771682538e-57,3.680346315656888e-57,7.458076545453412e-57,1.5113497749169164e-56,3.062690665911505e-56,6.206421750105537e-56,1.2577068709196517e-55,2.5486933322434497e-55,5.164826440895864e-55,1.0466316926837531e-54,2.1209578146831737e-54,4.298037297275752e-54,8.70980293944852e-54,1.7650071880974078e-53,3.5767174018667623e-53,7.248076641889716e-53,1.468794123329073e-52,2.9764533176398604e-52,6.031665167620159e-52,1.2222931392429882e-51,2.4769288027803075e-51,5.019398454483931e-51,1.0171612852414434e-50,2.0612371971980045e-50,4.177015823114118e-50,8.464557698776108e-50,1.7153092080578167e-49,3.476006406895141e-49,7.043989785641638e-49,1.4274367274409786e-48,2.892644187248502e-48,5.861829272827565e-48,1.1878765655053437e-47,2.407184974522678e-47,4.878065339308011e-47,9.885206872926806e-47,2.0031981558988958e-46,4.059401996721744e-46,8.226217921808123e-46,1.667010592982103e-45,3.37813116978997e-45,6.845649480782313e-45,1.3872438475102106e-44,2.8111949024812936e-44,5.696775512049002e-44,1.1544290723505879e-43,2.339404949816722e-43,4.740711794518158e-43,9.606865335752947e-43,1.9467933420042896e-42,3.945099867661734e-42,7.994589168771687e-42,1.6200719404176494e-41,3.283011843036227e-41,6.652893919474547e-41,1.3481826938171358e-40,2.7320390162656022e-40,5.53636923291479e-40,1.12192337300741e-39,2.273533433097383e-39,4.607225765834304e-39,9.336361167317173e-39,1.8919767399504294e-38,3.834016187210178e-38,7.769482474808153e-38,1.5744549573818077e-37,3.190570827415838e-37,6.465565849965615e-37,1.310221399914831e-36,2.6551119525043723e-36,5.380479574513002e-36,1.0903329490285837e-35,2.209516685777927e-35,4.4774983541317255e-35,9.07347368784129e-35,1.8387036298511918e-34,3.726060332283093e-34,7.5507141958147986e-34,1.5301224291219258e-33,3.100732708701549e-33,6.283512448300647e-33,1.2733289966319846e-32,2.5803509533943765e-32,5.228979360632339e-32,1.0596320286568417e-31,2.1473024824095314e-31,4.351423726599537e-31,8.817988431311355e-31,1.7869305510154216e-30,3.6211442315051734e-30,7.338105858625591e-30,1.4870381887554015e-29,3.013424196133241e-29,6.106585193646861e-29,1.2374753868080578e-28,2.5076950282277665e-28,5.081744996010654e-28,1.0297955658001187e-27,2.086840068075237e-27,4.228899030401862e-27,8.569696970514981e-27,1.7366152664911362e-26,3.519182293360425e-26,7.131484015411671e-26,1.4451670877642693e-25,2.9285740626265683e-25,5.934639747129406e-25,1.2026313207397564e-24,2.437084903635226e-24,4.9386563655046965e-24,1.0007992195987404e-23,2.0280801169835627e-23,4.1098243087691535e-23,8.328396747004224e-23,1.687716728608359e-22,3.420091336365684e-22,6.93068010218079e-22,1.4044749673208373e-21,2.8461130866654344e-21,5.767535834077907e-21,1.1687683723188273e-20,2.36846297523036e-20,4.799596736098932e-20,9.726193345678538e-20,1.9709746922282072e-19,3.99410241945286e-19,8.093890905846307e-19,1.6401950454919992e-18,3.3237905212106305e-18,6.7355303012611e-18,1.3649286304204871e-17,2.7659739958303348e-17,5.605137129589537e-17,1.1358589158417466e-16,2.301773260615434e-16,4.664452661674002e-16,9.452329212991423e-16,1.915477206680569e-15,3.881638955475664e-15,7.865988135028103e-15,1.5940114485176468e-14,3.230201284808144e-14,6.545875407657474e-14,1.326495814799358e-13,2.6880914119168915e-13,5.447311147313602e-13,1.1038761034724924e-12,2.2369613537103636e-12,4.53311389045607e-12,9.186176377057974e-12,1.8615423849835907e-11,3.772342168113488e-11,7.644502509381586e-11,1.549128260683881e-10,3.139247276201898e-10,6.361560699170569e-10,1.2891451666144178e-9,2.612401797599756e-9,5.293929131368088e-9,1.072793843339771e-8,2.173974380367835e-8,4.405473275072534e-8,8.927517707956807e-8,1.8091262266156934e-7,3.6661228920460993e-7,7.429253338904565e-7,1.5055088658749356e-6,3.050854294278564e-6,6.182435810172875e-6,1.2528462148647585e-5,2.5388434045982612e-5,5.144865951299455e-5,0.00010425867782510564,0.00021127609552380514,0.0004281426685140188,0.0008676142189576355,0.0017581859699947664,0.0035628944726151125,0.0072200650213521496,0.01463117678988978,0.02964950227233812,0.060083546089391836,0.12175693465330449,0.2467356223301618,0.5],"x":[-1022.0,-1020.9810379241517,-1019.9620758483034,-1018.943113772455,-1017.9241516966068,-1016.9051896207585,-1015.8862275449102,-1014.8672654690619,-1013.8483033932135,-1012.8293413173652,-1011.810379241517,-1010.7914171656687,-1009.7724550898204,-1008.753493013972,-1007.7345309381237,-1006.7155688622754,-1005.6966067864272,-1004.6776447105789,-1003.6586826347306,-1002.6397205588822,-1001.6207584830339,-1000.6017964071856,-999.5828343313374,-998.5638722554891,-997.5449101796407,-996.5259481037924,-995.5069860279441,-994.4880239520958,-993.4690618762475,-992.4500998003992,-991.4311377245509,-990.4121756487026,-989.3932135728543,-988.374251497006,-987.3552894211576,-986.3363273453094,-985.3173652694611,-984.2984031936128,-983.2794411177645,-982.2604790419161,-981.2415169660678,-980.2225548902196,-979.2035928143713,-978.184630738523,-977.1656686626746,-976.1467065868263,-975.127744510978,-974.1087824351298,-973.0898203592815,-972.0708582834332,-971.0518962075848,-970.0329341317365,-969.0139720558882,-967.9950099800399,-966.9760479041917,-965.9570858283433,-964.938123752495,-963.9191616766467,-962.9001996007984,-961.88123752495,-960.8622754491018,-959.8433133732535,-958.8243512974052,-957.8053892215569,-956.7864271457086,-955.7674650698602,-954.748502994012,-953.7295409181637,-952.7105788423154,-951.6916167664671,-950.6726546906187,-949.6536926147704,-948.6347305389221,-947.6157684630739,-946.5968063872256,-945.5778443113772,-944.5588822355289,-943.5399201596806,-942.5209580838323,-941.5019960079841,-940.4830339321358,-939.4640718562874,-938.4451097804391,-937.4261477045908,-936.4071856287425,-935.3882235528943,-934.3692614770459,-933.3502994011976,-932.3313373253493,-931.312375249501,-930.2934131736527,-929.2744510978044,-928.2554890219561,-927.2365269461078,-926.2175648702595,-925.1986027944112,-924.1796407185628,-923.1606786427145,-922.1417165668663,-921.122754491018,-920.1037924151697,-919.0848303393213,-918.065868263473,-917.0469061876247,-916.0279441117765,-915.0089820359282,-913.9900199600798,-912.9710578842315,-911.9520958083832,-910.9331337325349,-909.9141716566867,-908.8952095808384,-907.87624750499,-906.8572854291417,-905.8383233532934,-904.8193612774451,-903.8003992015969,-902.7814371257485,-901.7624750499002,-900.7435129740519,-899.7245508982036,-898.7055888223553,-897.6866267465069,-896.6676646706587,-895.6487025948104,-894.6297405189621,-893.6107784431138,-892.5918163672654,-891.5728542914171,-890.5538922155689,-889.5349301397206,-888.5159680638723,-887.497005988024,-886.4780439121756,-885.4590818363273,-884.4401197604791,-883.4211576846308,-882.4021956087824,-881.3832335329341,-880.3642714570858,-879.3453093812375,-878.3263473053893,-877.307385229541,-876.2884231536926,-875.2694610778443,-874.250499001996,-873.2315369261477,-872.2125748502993,-871.1936127744511,-870.1746506986028,-869.1556886227545,-868.1367265469062,-867.1177644710579,-866.0988023952095,-865.0798403193613,-864.060878243513,-863.0419161676647,-862.0229540918164,-861.003992015968,-859.9850299401197,-858.9660678642715,-857.9471057884232,-856.9281437125749,-855.9091816367265,-854.8902195608782,-853.8712574850299,-852.8522954091817,-851.8333333333334,-850.814371257485,-849.7954091816367,-848.7764471057884,-847.7574850299401,-846.7385229540918,-845.7195608782436,-844.7005988023952,-843.6816367265469,-842.6626746506986,-841.6437125748503,-840.624750499002,-839.6057884231537,-838.5868263473054,-837.5678642714571,-836.5489021956088,-835.5299401197605,-834.5109780439121,-833.4920159680639,-832.4730538922156,-831.4540918163673,-830.435129740519,-829.4161676646706,-828.3972055888223,-827.378243512974,-826.3592814371258,-825.3403193612775,-824.3213572854291,-823.3023952095808,-822.2834331337325,-821.2644710578842,-820.245508982036,-819.2265469061877,-818.2075848303393,-817.188622754491,-816.1696606786427,-815.1506986027944,-814.1317365269462,-813.1127744510978,-812.0938123752495,-811.0748502994012,-810.0558882235529,-809.0369261477045,-808.0179640718563,-806.999001996008,-805.9800399201597,-804.9610778443114,-803.942115768463,-802.9231536926147,-801.9041916167664,-800.8852295409182,-799.8662674650699,-798.8473053892216,-797.8283433133732,-796.8093812375249,-795.7904191616766,-794.7714570858284,-793.7524950099801,-792.7335329341317,-791.7145708582834,-790.6956087824351,-789.6766467065868,-788.6576846307386,-787.6387225548903,-786.6197604790419,-785.6007984031936,-784.5818363273453,-783.562874251497,-782.5439121756488,-781.5249500998004,-780.5059880239521,-779.4870259481038,-778.4680638722555,-777.4491017964071,-776.4301397205588,-775.4111776447106,-774.3922155688623,-773.373253493014,-772.3542914171657,-771.3353293413173,-770.316367265469,-769.2974051896208,-768.2784431137725,-767.2594810379242,-766.2405189620758,-765.2215568862275,-764.2025948103792,-763.183632734531,-762.1646706586827,-761.1457085828343,-760.126746506986,-759.1077844311377,-758.0888223552894,-757.0698602794412,-756.0508982035929,-755.0319361277445,-754.0129740518962,-752.9940119760479,-751.9750499001996,-750.9560878243512,-749.937125748503,-748.9181636726547,-747.8992015968064,-746.8802395209581,-745.8612774451097,-744.8423153692614,-743.8233532934132,-742.8043912175649,-741.7854291417166,-740.7664670658683,-739.7475049900199,-738.7285429141716,-737.7095808383234,-736.6906187624751,-735.6716566866268,-734.6526946107784,-733.6337325349301,-732.6147704590818,-731.5958083832336,-730.5768463073853,-729.557884231537,-728.5389221556886,-727.5199600798403,-726.500998003992,-725.4820359281437,-724.4630738522955,-723.4441117764471,-722.4251497005988,-721.4061876247505,-720.3872255489022,-719.3682634730538,-718.3493013972056,-717.3303393213573,-716.311377245509,-715.2924151696607,-714.2734530938123,-713.254491017964,-712.2355289421158,-711.2165668662675,-710.1976047904192,-709.1786427145709,-708.1596806387225,-707.1407185628742,-706.121756487026,-705.1027944111777,-704.0838323353294,-703.064870259481,-702.0459081836327,-701.0269461077844,-700.0079840319361,-698.9890219560879,-697.9700598802395,-696.9510978043912,-695.9321357285429,-694.9131736526946,-693.8942115768463,-692.875249500998,-691.8562874251497,-690.8373253493014,-689.8183632734531,-688.7994011976048,-687.7804391217564,-686.7614770459082,-685.7425149700599,-684.7235528942116,-683.7045908183633,-682.685628742515,-681.6666666666666,-680.6477045908183,-679.6287425149701,-678.6097804391218,-677.5908183632735,-676.5718562874251,-675.5528942115768,-674.5339321357285,-673.5149700598803,-672.496007984032,-671.4770459081836,-670.4580838323353,-669.439121756487,-668.4201596806387,-667.4011976047905,-666.3822355289421,-665.3632734530938,-664.3443113772455,-663.3253493013972,-662.3063872255489,-661.2874251497007,-660.2684630738523,-659.249500998004,-658.2305389221557,-657.2115768463074,-656.192614770459,-655.1736526946107,-654.1546906187625,-653.1357285429142,-652.1167664670659,-651.0978043912176,-650.0788423153692,-649.0598802395209,-648.0409181636727,-647.0219560878244,-646.002994011976,-644.9840319361277,-643.9650698602794,-642.9461077844311,-641.9271457085829,-640.9081836327346,-639.8892215568862,-638.8702594810379,-637.8512974051896,-636.8323353293413,-635.8133732534931,-634.7944111776447,-633.7754491017964,-632.7564870259481,-631.7375249500998,-630.7185628742515,-629.6996007984031,-628.6806387225549,-627.6616766467066,-626.6427145708583,-625.62375249501,-624.6047904191616,-623.5858283433133,-622.5668662674651,-621.5479041916168,-620.5289421157685,-619.5099800399202,-618.4910179640718,-617.4720558882235,-616.4530938123753,-615.434131736527,-614.4151696606787,-613.3962075848303,-612.377245508982,-611.3582834331337,-610.3393213572855,-609.3203592814372,-608.3013972055888,-607.2824351297405,-606.2634730538922,-605.2445109780439,-604.2255489021956,-603.2065868263473,-602.187624750499,-601.1686626746507,-600.1497005988024,-599.1307385229541,-598.1117764471057,-597.0928143712575,-596.0738522954092,-595.0548902195609,-594.0359281437126,-593.0169660678642,-591.9980039920159,-590.9790419161677,-589.9600798403194,-588.9411177644711,-587.9221556886228,-586.9031936127744,-585.8842315369261,-584.8652694610779,-583.8463073852296,-582.8273453093813,-581.8083832335329,-580.7894211576846,-579.7704590818363,-578.751497005988,-577.7325349301398,-576.7135728542914,-575.6946107784431,-574.6756487025948,-573.6566866267465,-572.6377245508982,-571.61876247505,-570.5998003992016,-569.5808383233533,-568.561876247505,-567.5429141716567,-566.5239520958083,-565.5049900199601,-564.4860279441118,-563.4670658682635,-562.4481037924152,-561.4291417165668,-560.4101796407185,-559.3912175648702,-558.372255489022,-557.3532934131737,-556.3343313373254,-555.315369261477,-554.2964071856287,-553.2774451097804,-552.2584830339322,-551.2395209580839,-550.2205588822355,-549.2015968063872,-548.1826347305389,-547.1636726546906,-546.1447105788424,-545.125748502994,-544.1067864271457,-543.0878243512974,-542.0688622754491,-541.0499001996008,-540.0309381237525,-539.0119760479042,-537.9930139720559,-536.9740518962076,-535.9550898203593,-534.9361277445109,-533.9171656686626,-532.8982035928144,-531.8792415169661,-530.8602794411178,-529.8413173652694,-528.8223552894211,-527.8033932135728,-526.7844311377246,-525.7654690618763,-524.746506986028,-523.7275449101796,-522.7085828343313,-521.689620758483,-520.6706586826348,-519.6516966067865,-518.6327345309381,-517.6137724550898,-516.5948103792415,-515.5758483033932,-514.556886227545,-513.5379241516966,-512.5189620758483,-511.5,-510.4810379241517,-509.4620758483034,-508.4431137724551,-507.42415169660677,-506.4051896207585,-505.3862275449102,-504.36726546906186,-503.3483033932136,-502.3293413173653,-501.31037924151696,-500.2914171656687,-499.27245508982037,-498.25349301397205,-497.2345309381237,-496.21556886227546,-495.19660678642714,-494.1776447105788,-493.15868263473055,-492.13972055888223,-491.1207584830339,-490.10179640718565,-489.0828343313373,-488.063872255489,-487.04491017964074,-486.0259481037924,-485.0069860279441,-483.98802395209583,-482.9690618762475,-481.9500998003992,-480.9311377245509,-479.9121756487026,-478.8932135728543,-477.874251497006,-476.8552894211577,-475.83632734530937,-474.81736526946105,-473.7984031936128,-472.77944111776446,-471.76047904191614,-470.7415169660679,-469.72255489021956,-468.70359281437123,-467.68463073852297,-466.66566866267465,-465.6467065868263,-464.62774451097806,-463.60878243512974,-462.5898203592814,-461.57085828343315,-460.55189620758483,-459.5329341317365,-458.51397205588825,-457.4950099800399,-456.4760479041916,-455.45708582834334,-454.438123752495,-453.4191616766467,-452.40019960079843,-451.3812375249501,-450.3622754491018,-449.34331337325347,-448.3243512974052,-447.3053892215569,-446.28642714570856,-445.2674650698603,-444.248502994012,-443.22954091816365,-442.2105788423154,-441.19161676646706,-440.17265469061874,-439.1536926147705,-438.13473053892216,-437.11576846307383,-436.09680638722557,-435.07784431137725,-434.0588822355289,-433.03992015968066,-432.02095808383234,-431.001996007984,-429.98303393213575,-428.96407185628743,-427.9451097804391,-426.92614770459085,-425.9071856287425,-424.8882235528942,-423.8692614770459,-422.8502994011976,-421.8313373253493,-420.812375249501,-419.7934131736527,-418.7744510978044,-417.75548902195607,-416.7365269461078,-415.7175648702595,-414.69860279441116,-413.6796407185629,-412.6606786427146,-411.64171656686625,-410.622754491018,-409.60379241516966,-408.58483033932134,-407.5658682634731,-406.54690618762476,-405.52794411177643,-404.50898203592817,-403.49001996007985,-402.4710578842315,-401.4520958083832,-400.43313373253494,-399.4141716566866,-398.3952095808383,-397.37624750499003,-396.3572854291417,-395.3383233532934,-394.3193612774451,-393.3003992015968,-392.2814371257485,-391.2624750499002,-390.2435129740519,-389.2245508982036,-388.2055888223553,-387.186626746507,-386.16766467065867,-385.1487025948104,-384.1297405189621,-383.11077844311376,-382.0918163672655,-381.0728542914172,-380.05389221556885,-379.0349301397206,-378.01596806387226,-376.99700598802394,-375.9780439121756,-374.95908183632736,-373.94011976047904,-372.9211576846307,-371.90219560878245,-370.8832335329341,-369.8642714570858,-368.84530938123754,-367.8263473053892,-366.8073852295409,-365.78842315369263,-364.7694610778443,-363.750499001996,-362.7315369261477,-361.7125748502994,-360.6936127744511,-359.6746506986028,-358.6556886227545,-357.6367265469062,-356.6177644710579,-355.5988023952096,-354.57984031936127,-353.560878243513,-352.5419161676647,-351.52295409181636,-350.50399201596804,-349.4850299401198,-348.46606786427145,-347.44710578842313,-346.42814371257487,-345.40918163672654,-344.3902195608782,-343.37125748502996,-342.35229540918164,-341.3333333333333,-340.31437125748505,-339.2954091816367,-338.2764471057884,-337.25748502994014,-336.2385229540918,-335.2195608782435,-334.20059880239523,-333.1816367265469,-332.1626746506986,-331.1437125748503,-330.124750499002,-329.1057884231537,-328.08682634730536,-327.0678642714571,-326.0489021956088,-325.02994011976045,-324.0109780439122,-322.99201596806387,-321.97305389221555,-320.9540918163673,-319.93512974051896,-318.91616766467064,-317.8972055888224,-316.87824351297405,-315.85928143712573,-314.84031936127747,-313.82135728542914,-312.8023952095808,-311.78343313373256,-310.76447105788424,-309.7455089820359,-308.72654690618765,-307.70758483033933,-306.688622754491,-305.66966067864274,-304.6506986027944,-303.6317365269461,-302.6127744510978,-301.5938123752495,-300.5748502994012,-299.55588822355287,-298.5369261477046,-297.5179640718563,-296.49900199600796,-295.4800399201597,-294.4610778443114,-293.44211576846305,-292.4231536926148,-291.40419161676647,-290.38522954091815,-289.3662674650699,-288.34730538922156,-287.32834331337324,-286.309381237525,-285.29041916167665,-284.27145708582833,-283.25249500998007,-282.23353293413174,-281.2145708582834,-280.1956087824351,-279.17664670658684,-278.1576846307385,-277.1387225548902,-276.11976047904193,-275.1007984031936,-274.0818363273453,-273.062874251497,-272.0439121756487,-271.0249500998004,-270.0059880239521,-268.9870259481038,-267.96806387225547,-266.9491017964072,-265.9301397205589,-264.91117764471056,-263.8922155688623,-262.873253493014,-261.85429141716565,-260.8353293413174,-259.81636726546907,-258.79740518962075,-257.7784431137725,-256.75948103792416,-255.74051896207584,-254.72155688622755,-253.70259481037925,-252.68363273453093,-251.66467065868264,-250.64570858283435,-249.62674650698602,-248.60778443113773,-247.5888223552894,-246.56986027944112,-245.55089820359282,-244.5319361277445,-243.5129740518962,-242.49401197604791,-241.4750499001996,-240.4560878243513,-239.437125748503,-238.41816367265469,-237.3992015968064,-236.38023952095807,-235.36127744510978,-234.34231536926148,-233.32335329341316,-232.30439121756487,-231.28542914171658,-230.26646706586826,-229.24750499001996,-228.22854291417167,-227.20958083832335,-226.19061876247505,-225.17165668662673,-224.15269461077844,-223.13373253493015,-222.11477045908183,-221.09580838323353,-220.07684630738524,-219.05788423153692,-218.03892215568862,-217.01996007984033,-216.000998003992,-214.98203592814372,-213.96307385229542,-212.9441117764471,-211.9251497005988,-210.9061876247505,-209.8872255489022,-208.8682634730539,-207.84930139720558,-206.8303393213573,-205.811377245509,-204.79241516966067,-203.77345309381238,-202.75449101796409,-201.73552894211576,-200.71656686626747,-199.69760479041915,-198.67864271457086,-197.65968063872256,-196.64071856287424,-195.62175648702595,-194.60279441117765,-193.58383233532933,-192.56487025948104,-191.54590818363275,-190.52694610778443,-189.50798403193613,-188.4890219560878,-187.47005988023952,-186.45109780439122,-185.4321357285429,-184.4131736526946,-183.39421157684632,-182.375249500998,-181.3562874251497,-180.3373253493014,-179.3183632734531,-178.2994011976048,-177.2804391217565,-176.26147704590818,-175.2425149700599,-174.22355289421156,-173.20459081836327,-172.18562874251498,-171.16666666666666,-170.14770459081836,-169.12874251497007,-168.10978043912175,-167.09081836327346,-166.07185628742516,-165.05289421157684,-164.03393213572855,-163.01497005988023,-161.99600798403193,-160.97704590818364,-159.95808383233532,-158.93912175648703,-157.92015968063873,-156.9011976047904,-155.88223552894212,-154.86327345309383,-153.8443113772455,-152.8253493013972,-151.8063872255489,-150.7874251497006,-149.7684630738523,-148.74950099800398,-147.7305389221557,-146.7115768463074,-145.69261477045907,-144.67365269461078,-143.6546906187625,-142.63572854291417,-141.61676646706587,-140.59780439121755,-139.57884231536926,-138.55988023952096,-137.54091816367264,-136.52195608782435,-135.50299401197606,-134.48403193612774,-133.46506986027944,-132.44610778443115,-131.42714570858283,-130.40818363273453,-129.38922155688624,-128.37025948103792,-127.35129740518963,-126.33233532934132,-125.31337325349301,-124.2944111776447,-123.27544910179641,-122.2564870259481,-121.2375249500998,-120.2185628742515,-119.1996007984032,-118.18063872255489,-117.16167664670658,-116.14271457085829,-115.12375249500998,-114.10479041916167,-113.08582834331337,-112.06686626746507,-111.04790419161677,-110.02894211576846,-109.00998003992017,-107.99101796407186,-106.97205588822355,-105.95309381237524,-104.93413173652695,-103.91516966067864,-102.89620758483034,-101.87724550898204,-100.85828343313374,-99.83932135728543,-98.82035928143712,-97.80139720558883,-96.78243512974052,-95.76347305389221,-94.7445109780439,-93.72554890219561,-92.7065868263473,-91.687624750499,-90.6686626746507,-89.6497005988024,-88.63073852295409,-87.61177644710578,-86.59281437125749,-85.57385229540918,-84.55489021956087,-83.53592814371258,-82.51696606786427,-81.49800399201597,-80.47904191616766,-79.46007984031937,-78.44111776447106,-77.42215568862275,-76.40319361277444,-75.38423153692615,-74.36526946107784,-73.34630738522954,-72.32734530938124,-71.30838323353294,-70.28942115768463,-69.27045908183632,-68.25149700598803,-67.23253493013972,-66.21357285429141,-65.19461077844312,-64.17564870259481,-63.156686626746506,-62.137724550898206,-61.1187624750499,-60.0998003992016,-59.08083832335329,-58.06187624750499,-57.04291417165668,-56.02395209580838,-55.00499001996008,-53.986027944111775,-52.967065868263475,-51.94810379241517,-50.92914171656687,-49.91017964071856,-48.89121756487026,-47.87225548902195,-46.85329341317365,-45.83433133732535,-44.815369261477045,-43.796407185628745,-42.77744510978044,-41.75848303393214,-40.73952095808383,-39.72055888223553,-38.70159680638722,-37.68263473053892,-36.66367265469062,-35.644710578842314,-34.625748502994014,-33.60678642714571,-32.58782435129741,-31.568862275449103,-30.5499001996008,-29.530938123752495,-28.51197604790419,-27.493013972055888,-26.474051896207584,-25.45508982035928,-24.436127744510976,-23.417165668662676,-22.398203592814372,-21.37924151696607,-20.360279441117765,-19.34131736526946,-18.322355289421157,-17.303393213572853,-16.28443113772455,-15.265469061876248,-14.246506986027944,-13.22754491017964,-12.208582834331338,-11.189620758483034,-10.17065868263473,-9.151696606786427,-8.132734530938123,-7.11377245508982,-6.094810379241517,-5.075848303393213,-4.0568862275449105,-3.0379241516966067,-2.0189620758483033,-1.0]}
},{}],52:[function(require,module,exports){
module.exports={"expected":[2.0,4.055725693462558,8.224455450306175,16.678067642272467,33.820833727035485,68.58401216053144,139.07897014010788,282.03307630877373,571.9243969958904,1159.784235807156,2351.883362017962,4769.296889681674,9671.47996761651,19612.434899235366,39771.328066095295,80650.79855039569,163548.75793955644,331654.44985467324,672549.7368133944,1.3638386238627834e6,2.765677674268456e6,5.608415001683165e6,1.1373096410963643e7,2.3063079664086044e7,4.676876238200371e7,9.484063562206888e7,1.9232380133837268e8,3.900062912762137e8,7.908792680704898e8,1.603794683970175e9,3.252275653408253e9,6.59516896487528e9,1.3374098111785812e10,2.712083666942935e10,5.499733705420297e10,1.1152705648137605e11,2.2616157424388303e11,4.5862465376742737e11,9.300278959699655e11,1.8859690166611526e12,3.8244864989734883e12,7.755534079093708e12,1.5727159415552389e13,3.189252226341881e13,6.467366098653705e13,1.3114931427669245e14,2.659528217959896e14,5.3931584630343106e14,1.0936585673721629e15,2.2177895757833735e15,4.49737308259902e15,9.120055782091906e15,1.849422228062092e16,3.750374624206093e16,7.605245361751342e16,1.5422394509370906e17,3.1274500833185683e17,6.342039828968388e17,1.2860786941654966e18,2.6079912018708854e18,5.288648462876041e18,1.0724653727288793e19,2.1748126837627036e19,4.410221840002322e19,8.94332501518364e19,1.8135836524533324e20,3.677698908249319e20,7.457868977502969e20,1.5123535415268037e21,3.066845557984701e21,6.219142163700023e21,1.2611567332307233e22,2.5574528832235704e22,5.186163684154858e22,1.0516828652164631e23,2.132668608916382e23,4.324759436411604e23,8.770018982149583e23,1.7784395659029177e24,3.6064315208514245e24,7.313348490415245e24,1.4830467688911335e25,3.0074154425991942e25,6.098626040732801e25,1.2367177164109907e26,2.507893909004194e26,5.085664881613321e26,1.0313030864349666e27,2.091341212700762e27,4.240953145073805e27,8.600071317623323e27,1.7439765104247796e28,3.5365451710624697e28,7.171628558184486e28,1.4543079103699305e29,2.94913697914658e29,5.980445309932658e29,1.2127522850920865e30,2.459295301226698e30,4.987113570498422e30,1.0113182322043105e31,2.050814669309074e31,4.1587708734234e31,8.433416942283489e31,1.7101812888250764e32,3.4680130967833815e32,7.032654910944495e32,1.426125960778659e33,2.891987850622015e33,5.864554715474622e33,1.1892512620133694e34,2.4116384496651934e34,4.890472011824659e34,9.91720649575848e34,2.0110734596110687e35,4.078181150792617e35,8.269992037932145e35,1.6770409596486064e36,3.4008090545179733e36,6.896374330484383e36,1.3984901281940556e37,2.835946172485184e37,5.75090987851247e37,1.1662056477535313e38,2.36490510472759e38,4.795703197922216e38,9.725028339016732e38,1.9721023652100994e39,3.999153116360473e39,8.10973402305692e39,1.644542832222985e40,3.334907309323184e40,6.762734629869118e40,1.3713898298214703e41,2.7809904842800587e41,5.639467280184804e41,1.143606617284333e42,2.3190773704669545e42,4.7027708382652453e42,9.536574259609294e42,1.93388646261557e43,3.9216565073346476e43,7.952581528865948e43,1.6126744617988503e44,3.2702826249542765e44,6.631684633455673e44,1.3448146879423345e45,2.7270997414168012e45,5.530184244949545e45,1.1214455165911946e46,2.274137697728668e46,4.611639345574921e46,9.351772091415607e46,1.8964111175279963e47,3.8456616473632e47,7.798474375787302e47,1.581423644784479e48,3.206910254200835e48,6.503174157295359e48,1.318754525940236e49,2.674253307112947e49,5.423018924242537e49,1.0997138593592157e50,2.2300688774299947e50,4.522273822192054e50,9.170551066768614e50,1.859661979235212e51,3.771139435169873e51,7.647353550424078e51,1.550778414072365e52,3.144765929410168e52,6.377153989917292e52,1.2931993644037518e53,2.6224309444908428e53,5.31793028045144e53,1.0784033237234602e54,2.186854033970347e54,4.434640046712925e54,8.9928417893557e54,1.8236249751167009e55,3.698061333410368e55,7.49916118295648e55,1.5207270344566956e56,3.083825853194535e56,6.2535758734826365e56,1.2681394173050398e57,2.5716128088283643e57,5.2148780712012464e57,1.0575057490822768e58,2.144476618768697e58,4.3487044608849075e58,8.818576207643152e58,1.7882863052547763e59,3.6263993577445414e59,7.353840524980387e59,1.4912579981394399e60,3.0240666893178576e60,6.132392485305274e60,1.2435650882524758e61,2.5217794399593203e61,5.1138228339442586e61,1.0370131329721706e62,2.1029204039266438e62,4.26443415675601e62,8.647687588817415e62,1.753632437150183e63,3.55612606611971e63,7.211335927776735e63,1.4623600203237e64,2.965465553759595e64,6.013557419730531e64,1.2194669668156858e65,2.4729117548215863e65,5.014725870847786e65,1.0169176280034265e66,2.062169476014265e66,4.181796864072671e66,8.480110493230246e66,1.7196501005397817e67,3.4872145482622914e67,7.071592821001959e67,1.4340220348921625e68,2.9080000059517687e68,5.897025170363978e68,1.1958358249220164e69,2.4249910401496273e69,4.917549233975709e69,9.972115388551085e69,2.0222082299760165e70,4.1007609379225384e70,8.315780749340096e70,1.6863262823149782e71,3.419638415373054e71,6.934557691790098e71,1.4062331901695593e72,2.851648040185274e72,5.782751112645715e72,1.1726626133228307e73,2.3779989453081958e73,4.8222557107566013e73,9.778873193281129e73,1.9830213631551034e74,4.021295346616682e74,8.154635429137417e74,1.6536482215386157e75,3.353371790021441e75,6.800178064261166e75,1.3789828447672359e76,2.7963880771833072e76,5.670691486762284e76,1.1499384581280687e77,2.331917475265336e77,4.728808809733927e77,9.58937569455526e77,1.9445938694336337e78,3.943369659805837e78,7.996612824047841e78,1.6216034045581322e79,3.2883892962363494e79,6.668402479426697e79,1.3522605635079984e80,2.742198955837742e80,5.5608033808886e80,1.127654657408199e81,2.2867289837015493e81,4.637172746591894e81,9.403550326688805e81,1.9069110334859788e82,3.866954036828118e82,7.841652421301187e82,1.5901795602137497e83,3.2246660497889107e83,6.539180475482573e83,1.3260561134302057e84,2.689059925105962e84,5.453044714756313e84,1.1058026778619e85,2.242416166252078e85,4.5473124304521276e85,9.221325930193076e85,1.8699584251438813e86,3.792019215281367e86,7.689694880760094e86,1.559364655139354e87,3.1621776486629935e87,6.412462568487686e87,1.3003594598691058e88,2.6369506360641868e88,5.347374223538917e88,1.0843741515482966e89,2.198962053880605e89,4.459193450436333e89,9.042632724527191e89,1.8337218938705645e90,3.718536499817792e90,7.540682012194587e90,1.5291468891544088e91,3.1009001637110253e91,6.288200233412456e91,1.275160762614393e92,2.5858511341153236e92,5.243751442050346e92,1.0633608726827342e93,2.1563500063811263e93,4.372782062488992e93,8.867402281374298e93,1.7981875633418918e94,3.646477751155372e94,7.39455675300012e94,1.4995146907454652e95,3.040810129490557e95,6.16634588555796e95,1.2504503721417128e96,2.535741851347452e96,5.1421366892492305e96,1.042754794494218e97,2.1145637060057103e97,4.288045176455502e97,8.695567498439283e97,1.763341826132887e98,3.5758153753022677e98,7.25126314634585e98,1.4704567126346335e99,2.981884535278352e99,6.046852862333705e99,1.2262188259177067e100,2.4866035990409388e100,5.0424910530435424e100,1.0225480261441765e101,2.073587151216156e101,4.204950343410549e101,8.527062573752422e101,1.7291713385065133e102,3.506522312989914e102,7.110746319746673e102,1.4419618274345288e103,2.9241008162591873e103,5.9296754053887775e103,1.2024568447763998e104,2.4384175603197538e104,4.9447763753894986e104,1.0027328297047203e105,2.0334046505559016e105,4.123465743232865e105,8.361822980471339e105,1.6956630153041442e106,3.4385720293115666e106,6.972952464050498e106,1.4140191233871167e107,2.867436844884233e107,5.81476864308903e107,1.1791553293658626e108,2.3911652829461897e108,4.848955237680208e108,9.833016171955005e108,1.9940008166415152e109,4.043560172419112e109,8.199785442170946e109,1.6628040249346937e110,3.3719385035602576e110,6.837828812832434e110,1.386617900185193e111,2.8118709223980613e111,5.702088573334974e111,1.156305356663728e112,2.3448286722547074e112,4.754990946415501e112,9.642469476779485e112,1.955360560270206e113,3.965203032135562e113,8.040887908613829e113,1.630581784460921e114,3.306596219265054e114,6.70532362218964e114,1.3597476648747819e115,2.757381770529261e115,5.591592046710337e115,1.1338981765601872e116,2.2993899842228115e116,4.662847519151408e116,9.455615244060147e116,1.917469084641602e117,3.888364316500494e117,7.885069531986925e117,1.5989839547808894e118,3.2425201544197035e118,6.57538615092501e118,1.3333981278372066e119,2.7039485233421908e119,5.48323674995947e119,1.111925208507425e120,2.2548318186762005e120,4.572489670720934e120,9.272381920317415e120,1.8803118796914298e121,3.8130146010938115e121,7.73227064360194e121,1.5679984359031147e122,3.1796857719007717e122,6.447966641117569e122,1.3075591988484845e123,2.651550719246528e123,5.376981189783784e123,1.0903780382335357e124,2.2111371126255e124,4.483882799722051e124,9.092699338653672e124,1.843874716535364e125,3.7391250316893375e125,7.582432731045636e125,1.5376133623126454e126,3.118069010071338e126,6.323016299068021e126,1.2822209832156207e127,2.600168293162178e127,5.272784676952412e127,1.0692484145205663e128,2.168289133732557e128,4.396992975267351e128,8.916498691883336e128,1.8081436420198058e129,3.6666673132053035e129,7.435498415773244e129,1.5078170984275673e130,3.0576462735673885e130,6.200487276613824e130,1.257373777987504e131,2.5497815688349734e131,5.1706073107205765e131,1.0485282460447683e132,2.1262714739024743e132,4.311786923991334e132,8.743712506184015e132,1.7731049733789997e133,3.5956136988696855e133,7.291411431136068e133,1.4785982341432405e134,2.9983944242615192e134,6.0803326528060886e134,1.2330080682392848e135,2.5003712513023223e135,5.070409963550919e135,1.0282095982781294e136,2.0850680430006882e136,4.2282320173077434e136,8.57427461525792e136,1.7387452929953153e137,3.5259369795940513e137,7.150116600834597e137,1.4499455804629428e138,2.9402907724029858e138,5.962506415942761e138,1.209114523428754e139,2.4519184195043387e139,4.972154266128869e139,1.0082846904499045e140,2.0446630626913666e140,4.146296258915563e140,8.408120134995668e140,1.7050514432611378e141,3.457610473554767e141,7.011559817790573e141,1.4218481652131276e142,2.8833130679288194e142,5.846963445947566e142,1.1856839938232823e143,2.4044045190382606e143,4.8758025926704225e143,9.88745892567228e143,2.005041060395294e144,4.065948272546256e144,8.245185438627682e144,1.672010521540263e145,3.390608015975382e145,6.875688023425653e145,1.3942952288419945e146,2.827439491943446e146,5.733659497092811e146,1.1627075069962328e147,2.357811355053275e147,4.781318046513613e147,9.69585722493062e147,1.9661868633647622e148,3.987157289948622e148,8.085408132360491e148,1.639609875227259e149,3.3249039491071593e149,6.742449187344438e149,1.3672762202989132e150,2.7726486483633055e150,5.622551181055802e150,1.1401762643908002e151,2.312121085282937e151,4.6886644459894014e151,9.507968430811693e151,1.928085592873671e152,3.9098931391064773e152,7.928727031483466e152,1.6078370969019119e153,3.2604731124036287e153,6.6117922874098e153,1.3407807929942597e154,2.71891955572393e154,5.513595950303609e154,1.11808163795086e155,2.2673162132131545e155,4.597806310566358e155,9.323720593664027e155,1.8907226585194364e156,3.834126232684512e156,7.775082136938599e156,1.576680019578164e157,3.19729083288632e157,6.4836672902046e157,1.3147988008372625e158,2.666231639144692e158,5.406752081800897e158,1.0964151668170912e159,2.223379581381206e159,4.50870884726384e159,9.143043158094849e159,1.854083752636095e160,3.7598275566988e160,7.62441461234585e160,1.5461267120451038e161,3.1353329156952677e161,6.358025131872013e161,1.289320294350685e162,2.6145647224503602e162,5.301978661031303e162,1.0751685540867309e163,2.1802943648062458e163,4.421337937328457e163,8.965866935951783e163,1.818154844815282e164,3.686968659405342e164,7.476666761470638e164,1.5161654742976807e165,3.074575634824939e165,6.23481769932715e165,1.2643355168607972e166,2.5638990204447696e166,5.199235566330608e166,1.0543336636365579e167,2.1380440645466243e167,4.335660123168382e167,8.792124079828114e167,1.782922176533466e168,3.615521640405441e168,7.331782006131036e168,1.4867848330565879e169,3.014995724038987e169,6.113997811832745e169,1.2398349007611817e170,2.514215131334334e170,5.09848345352244e170,1.033902517007222e171,2.096612501380875e171,4.25164259554256e171,8.621748057081481e171,1.7483722558832923e172,3.5454591399614406e172,7.189704864531556e172,1.4579735373746516e173,2.9565703679594e173,5.995519202931424e173,1.2158090638489385e174,2.4654940292983713e174,4.999683740851909e174,1.0138672903479925e175,2.0559838096127847e175,4.169253180994753e175,8.454673624355363e175,1.714491852407028e176,3.4767543285196596e176,7.050380930017091e176,1.4297205543284217e177,2.8992771933306217e177,5.87933650273044e177,1.1922488057318874e178,2.4177170572034048e178,4.90279859421121e178,9.942203114207143e178,2.0161424309956452e179,4.088460329534503e179,8.290836802597645e179,1.6812679920301247e180,3.4093808964363506e180,6.913756850238578e180,1.4020150647932521e181,2.84309426045175e181,5.76540522052498e181,1.1691451043053028e182,2.370865919458649e182,4.8077909126515316e182,9.749540566618197e182,1.9770731087744236e183,4.0092331025551155e183,8.130174852556601e183,1.6486879520928295e184,3.3433130439027526e184,6.779780306722375e184,1.374846459300254e185,2.788000054775001e185,5.653681727762929e185,1.1464891122973817e186,2.324922675009942e186,4.714624314175707e186,9.560611483012742e186,1.938760881843375e187,3.931541160986106e187,7.97262625075839e187,1.6167392564787246e188,3.278525471065379e188,6.64839999483557e188,1.3482043339735323e189,2.7339734786669836e189,5.544123241337383e189,1.1242721538807342e190,2.2798697304692658e190,4.623263121806191e190,9.375343515373532e190,1.901191079016879e191,3.855354753675236e191,7.818130665946742e191,1.5854096708363686e192,3.2149933683375015e192,6.519565604139509e192,1.322078486546152e193,2.68099384332963e193,5.436687807203393e193,1.1024857213504581e194,2.2356898333783018e194,4.5336723499226495e194,9.193665717661649e194,1.8643493134112905e195,3.780644705995681e195,7.666628935979854e195,1.5546871978948322e196,3.1526924068996535e196,6.3932277991240495e196,1.2964589124533094e197,2.6290408608776756e197,5.331334284312194e197,1.0811214718661267e198,2.192366065600729e198,4.445817690866097e198,9.015508518648611e198,1.8282214769356658e199,3.7073824086739795e199,7.518063045174996e199,1.5245600728693619e200,3.091598729381674e200,6.269338200314656e200,1.2713358010012086e201,2.578094636569672e201,5.228022328856756e201,1.060171224257003e202,2.149881836844367e202,4.359665501799038e202,8.840803695274246e202,1.792793734889245e203,3.635539806834464e203,7.372376102092135e203,1.4950167589562034e204,3.0316889407278624e204,6.147849365748067e204,1.2466995316101803e205,2.528135661189543e205,5.126712378822632e205,1.039626955889163e206,2.1082208783079476e206,4.275182791823823e206,8.669484346524334e206,1.758052520663628e207,3.565089389256004e207,7.229512317748074e207,1.4660459429147287e208,2.9729400992378696e208,6.028714772802008e208,1.2225406701305055e209,2.479144803575779e209,5.027365638838179e209,1.0194807995933286e210,2.067367236451184e210,4.192337209348827e210,8.50148486780748e210,1.723984530547477e211,3.496004177836929e211,7.089416984252759e211,1.4376365307351711e212,2.9153297077814704e212,5.911888800381932e212,1.1988499652301132e213,2.4311033032953958e213,4.9299440653183605e213,9.99725040652235e213,2.0273052668855613e214,4.1110970296998223e214,8.336740925835491e214,1.6905767186325722e215,3.428257717264103e215,6.95203645385958e215,1.409777643390315e216,2.858835705183565e216,5.797326711450501e216,1.175618344851316e217,2.3839927634596768e217,4.834410351896435e217,9.803521138463755e217,1.988019628383515e218,4.0314311429714076e218,8.175189433987038e218,1.6578162918172235e219,3.361824064881929e219,6.817318118421647e219,1.382458612669509e220,2.8034364577761323e220,5.684984635896096e220,1.1528369127371706e221,2.337795143680071e221,4.7407279151375735e221,9.613546005569968e221,1.9494952770037008e222,3.953309042113862e222,8.01676852814943e222,1.625690704907864e223,3.2966777807590027e223,6.685210389246156e223,1.3556689770934075e224,2.749110751113887e224,5.574819553733307e224,1.1304969450246692e225,2.2924927531587132e225,4.648860880531202e225,9.427252259252318e225,1.9117174603301066e226,3.876700811250856e226,7.861417543028529e226,1.5941876558148866e227,3.232793917944603e227,6.555662677338632e227,1.329398477907881e228,2.695837781850474e228,5.466789278628976e228,1.1085898869040462e229,2.2480682439147198e229,4.558774068751038e229,9.244568560662109e229,1.874671711822801e230,3.8015771142235407e230,7.709076988917741e230,1.5632950808417147e231,3.170148012916648e231,6.428625374032587e231,1.3036370551555533e232,2.643597149772091e232,5.360852441747466e232,1.087107349342822e233,2.204504604140804e233,4.4704329821851315e233,9.065424953375237e233,1.8383438452781516e234,3.7279091833566355e234,7.559688528917176e234,1.5330011500651604e235,3.1087160762134247e235,6.304049831989375e235,1.2783748438233666e236,2.592368849985481e236,5.256968475908989e236,1.0660411058733272e237,2.1617851516888213e237,4.383803791725052e237,8.889752836598836e237,1.802719949396257e238,3.655668808442207e238,7.413194956594271e238,1.5032942628053045e239,3.048474583247129e239,6.181888346571401e239,1.2536021700653057e240,2.5421332652573106e240,5.1550976000549124e240,1.0453830894424817e241,2.119893527681546e241,4.2988533238114636e241,8.717484938904435e241,1.7677863824543593e242,3.5848283259369275e242,7.2695401740772995e242,1.4741630431831619e243,2.989400465295418e243,6.0620941375737055e243,1.229309547497307e244,2.4928711585018008e244,5.055200804014103e244,1.0251253893226172e245,2.078813690248249e245,4.215549047730721e245,8.548555292466454e245,1.7335297670820564e246,3.515360608368389e246,7.128669170573403e246,1.4455963357644318e247,2.9314711006675326e247,5.94462133131007e247,1.2054876735649786e248,2.444563665414916e248,4.957239833564084e248,1.0052602480821632e249,2.0385299083816635e249,4.133859063157646e249,8.382899207800665e249,1.6999369851391846e250,3.447239053948095e250,6.990528001302894e250,1.4175832012876642e251,2.874664306041609e251,5.829424943046267e251,1.1821274259811992e252,2.397192287249326e252,4.861177175783628e252,9.85780058615037e252,1.999026755913993e253,4.053752087939697e253,8.220453248992165e253,1.666995172692245e254,3.380437576382957e254,6.85506376684125e254,1.3901129124752076e255,2.818958327969851e255,5.716460859773723e255,1.1592198592328542e256,2.3507388837313412e256,4.766976044685292e256,9.666773612275217e256,1.9602891056096547e257,3.975197446117862e257,8.061155209403384e257,1.6346917150883238e258,3.3149305948870066e258,6.7222245928641e258,1.3631749499253324e259,2.7643318345483214e259,5.605685823316993e259,1.136756201155264e260,2.3051856661141215e260,4.674600367130268e260,9.479448407819758e260,1.9223021233724957e261,3.8981650561796865e261,7.904944087852844e261,1.6030142421244678e262,3.2506930243852695e262,6.591959610279347e262,1.3367589980838535e263,2.710763907248158e263,5.497057413768591e263,1.1147278495729927e264,2.2605151903657e264,4.584014769014234e264,9.295753238951325e264,1.885051262565112e265,3.822625419539937e265,7.751760065255517e265,1.5719506233106718e266,3.1877002659077503e266,6.464218935749671e266,1.3108549412943415e267,2.658234032905086e267,5.3905340332448135e267,1.0931263690057544e268,2.21671035048901e268,4.4951845617212836e268,9.115617761914515e268,1.8485222584389964e269,3.748549609244488e269,7.601544481715864e269,1.5414889632246598e270,3.1259281971695705e270,6.338953652589787e270,1.2854528599238216e271,2.6067220958639547e271,5.286074889956361e271,1.0719434874381514e272,2.1737543719713597e272,4.408075728840354e272,8.938972996093156e272,1.8127011226711287e273,3.6759092588928177e273,7.454239814064757e273,1.5116175969566824e274,3.065353163333638e274,6.21611579203441e274,1.2605430265646012e275,2.556208370276525e275,5.1836399825872175e275,1.05117109315201e276,2.1316308053608407e276,4.3226549131390736e276,8.76575129759505e276,1.7775741380079296e277,3.604676551776618e277,7.309789653831714e277,1.482325085642586e278,3.0059519679523266e278,6.095658314869226e278,1.2361159023091755e279,2.5066735125464595e279,5.083190084978299e279,1.0308012316200998e280,2.0903235199672202e280,4.238889403790025e280,8.595886333348596e280,1.743127853012258e281,3.534824210225979e281,7.168138685643416e281,1.4536002120834443e282,2.9477018640846906e282,5.977535093417809e282,1.212162133097422e283,2.4580985539227693e283,4.98468673110381e283,1.0108261024599688e284,2.0498166976848937e284,4.1567471238445505e284,8.429313055701369e284,1.7093490769123516e285,3.4663254851649256e285,7.029232666043647e285,1.4254319764500725e286,2.890580545585804e286,5.861700893877615e286,1.1886725461345805e287,2.41046489323576e287,4.888092200342821e287,9.912380564472039e287,2.0100948269355425e288,4.07619661794928e288,8.265967677510942e288,1.6762248745505886e289,3.3991541458678982e289,6.893018402718026e289,1.3978095920706708e290,2.8345661385649092e290,5.748111358998259e290,1.1656381463786477e291,2.3637542897739485e291,4.793369503034216e291,9.72029592585775e291,1.9711426967280123e292,3.997207040300706e292,8.105787647718405e292,1.6437425614301296e293,3.333284469915028e293,6.759443734126973e293,1.3707224813006473e294,2.77963719300908e294,5.636722991095469e294,1.1430501130958377e295,2.317948856299009e295,4.700482366311966e295,9.531933552359452e295,1.932945390834081e296,3.919748142833168e296,7.948711627395219e296,1.6118896988575503e297,3.268691233342058e297,6.628457509530525e297,1.344160271471374e298,2.7257726745689975e298,5.527493135394191e298,1.1208997964827938e299,2.2730310521960833e299,4.6093952202148905e299,9.347221312974411e299,1.8954882820755353e300,3.8437902636354326e300,7.794679466254246e300,1.5806540891796e301,3.2053497009811435e301,6.5000095694008e301,1.318112790918551e302,2.6729519565049732e302,5.4203799636940545e302,1.099178714354255e303,2.2289836767568214e303,4.5200731840655886e303,9.166088474472855e303,1.8587570267235075e304,3.7693043155932564e304,7.64363217961595e304,1.5500237711122634e305,3.1432356169888305e305,6.374050726214044e305,1.292570065086984e306,2.6211548117868955e306,5.315342458353503e306,1.0778785488949093e307,2.1857898625925857e307,4.432482053113321e307,8.98846567431158e307],"x":[1.0,2.0199600798403194,3.039920159680639,4.059880239520958,5.079840319361278,6.099800399201597,7.119760479041916,8.139720558882235,9.159680638722556,10.179640718562874,11.199600798403194,12.219560878243513,13.239520958083832,14.259481037924152,15.27944111776447,16.29940119760479,17.31936127744511,18.339321357285428,19.35928143712575,20.37924151696607,21.39920159680639,22.419161676646706,23.439121756487026,24.459081836327346,25.479041916167663,26.499001996007983,27.518962075848304,28.538922155688624,29.55888223552894,30.57884231536926,31.59880239520958,32.6187624750499,33.63872255489022,34.65868263473054,35.678642714570856,36.69860279441118,37.7185628742515,38.73852295409181,39.75848303393214,40.778443113772454,41.79840319361278,42.818363273453095,43.83832335329341,44.858283433133735,45.87824351297405,46.89820359281437,47.91816367265469,48.93812375249501,49.958083832335326,50.97804391217565,51.99800399201597,53.01796407185629,54.03792415169661,55.057884231536924,56.07784431137725,57.097804391217565,58.11776447105788,59.137724550898206,60.15768463073852,61.17764471057884,62.19760479041916,63.21756487025948,64.2375249500998,65.25748502994011,66.27744510978044,67.29740518962076,68.31736526946108,69.3373253493014,70.35728542914171,71.37724550898204,72.39720558882236,73.41716566866268,74.437125748503,75.45708582834331,76.47704590818363,77.49700598802396,78.51696606786427,79.53692614770459,80.55688622754491,81.57684630738522,82.59680638722556,83.61676646706587,84.63672654690619,85.6566866267465,86.67664670658682,87.69660678642714,88.71656686626747,89.73652694610779,90.7564870259481,91.77644710578842,92.79640718562874,93.81636726546907,94.83632734530939,95.8562874251497,96.87624750499002,97.89620758483034,98.91616766467065,99.93612774451098,100.9560878243513,101.97604790419162,102.99600798403193,104.01596806387225,105.03592814371258,106.0558882235529,107.07584830339322,108.09580838323353,109.11576846307385,110.13572854291417,111.1556886227545,112.17564870259481,113.19560878243513,114.21556886227545,115.23552894211576,116.2554890219561,117.27544910179641,118.29540918163673,119.31536926147704,120.33532934131736,121.35528942115768,122.37524950099801,123.39520958083833,124.41516966067864,125.43512974051896,126.45508982035928,127.47504990019961,128.49500998003992,129.51497005988023,130.53493013972056,131.5548902195609,132.5748502994012,133.59481037924152,134.61477045908183,135.63473053892216,136.6546906187625,137.6746506986028,138.69461077844312,139.71457085828342,140.73453093812375,141.75449101796409,142.7744510978044,143.79441117764472,144.81437125748502,145.83433133732535,146.85429141716565,147.874251497006,148.89421157684632,149.91417165668662,150.93413173652695,151.95409181636725,152.97405189620758,153.99401197604791,155.01397205588822,156.03393213572855,157.05389221556885,158.07385229540918,159.0938123752495,160.11377245508982,161.13373253493015,162.15369261477045,163.17365269461078,164.1936127744511,165.2135728542914,166.23353293413174,167.25349301397205,168.27345309381238,169.29341317365268,170.313373253493,171.33333333333334,172.35329341317365,173.37325349301398,174.39321357285428,175.4131736526946,176.43313373253494,177.45309381237524,178.47305389221557,179.49301397205588,180.5129740518962,181.53293413173654,182.55289421157684,183.57285429141717,184.59281437125748,185.6127744510978,186.63273453093814,187.65269461077844,188.67265469061877,189.69261477045907,190.7125748502994,191.7325349301397,192.75249500998004,193.77245508982037,194.79241516966067,195.812375249501,196.8323353293413,197.85229540918164,198.87225548902197,199.89221556886227,200.9121756487026,201.9321357285429,202.95209580838323,203.97205588822357,204.99201596806387,206.0119760479042,207.0319361277445,208.05189620758483,209.07185628742516,210.09181636726547,211.1117764471058,212.1317365269461,213.15169660678643,214.17165668662673,215.19161676646706,216.2115768463074,217.2315369261477,218.25149700598803,219.27145708582833,220.29141716566866,221.311377245509,222.3313373253493,223.35129740518963,224.37125748502993,225.39121756487026,226.4111776447106,227.4311377245509,228.45109780439122,229.47105788423153,230.49101796407186,231.5109780439122,232.5309381237525,233.55089820359282,234.57085828343313,235.59081836327346,236.61077844311376,237.6307385229541,238.65069860279442,239.67065868263472,240.69061876247505,241.71057884231536,242.7305389221557,243.75049900199602,244.77045908183632,245.79041916167665,246.81037924151696,247.8303393213573,248.85029940119762,249.87025948103792,250.89021956087825,251.91017964071855,252.93013972055888,253.95009980039922,254.97005988023952,255.99001996007985,257.00998003992015,258.02994011976045,259.0499001996008,260.0698602794411,261.0898203592814,262.1097804391218,263.1297405189621,264.1497005988024,265.16966067864274,266.18962075848304,267.20958083832335,268.22954091816365,269.249500998004,270.2694610778443,271.2894211576846,272.309381237525,273.3293413173653,274.3493013972056,275.3692614770459,276.38922155688624,277.40918163672654,278.42914171656685,279.4491017964072,280.4690618762475,281.4890219560878,282.50898203592817,283.5289421157685,284.5489021956088,285.5688622754491,286.58882235528944,287.60878243512974,288.62874251497004,289.6487025948104,290.6686626746507,291.688622754491,292.7085828343313,293.72854291417167,294.748502994012,295.7684630738523,296.78842315369263,297.80838323353294,298.82834331337324,299.8483033932136,300.8682634730539,301.8882235528942,302.9081836327345,303.92814371257487,304.94810379241517,305.96806387225547,306.98802395209583,308.00798403193613,309.02794411177643,310.0479041916168,311.0678642714571,312.0878243512974,313.1077844311377,314.12774451097806,315.14770459081836,316.16766467065867,317.187624750499,318.20758483033933,319.22754491017963,320.24750499001993,321.2674650698603,322.2874251497006,323.3073852295409,324.32734530938126,325.34730538922156,326.36726546906186,327.3872255489022,328.4071856287425,329.4271457085828,330.44710578842313,331.4670658682635,332.4870259481038,333.5069860279441,334.52694610778445,335.54690618762476,336.56686626746506,337.58682634730536,338.6067864271457,339.626746506986,340.6467065868263,341.6666666666667,342.686626746507,343.7065868263473,344.72654690618765,345.74650698602795,346.76646706586826,347.78642714570856,348.8063872255489,349.8263473053892,350.8463073852295,351.8662674650699,352.8862275449102,353.9061876247505,354.92614770459085,355.94610778443115,356.96606786427145,357.98602794411175,359.0059880239521,360.0259481037924,361.0459081836327,362.0658682634731,363.0858283433134,364.1057884231537,365.125748502994,366.14570858283435,367.16566866267465,368.18562874251495,369.2055888223553,370.2255489021956,371.2455089820359,372.2654690618763,373.2854291417166,374.3053892215569,375.3253493013972,376.34530938123754,377.36526946107784,378.38522954091815,379.4051896207585,380.4251497005988,381.4451097804391,382.4650698602794,383.4850299401198,384.5049900199601,385.5249500998004,386.54491017964074,387.56487025948104,388.58483033932134,389.6047904191617,390.624750499002,391.6447105788423,392.6646706586826,393.68463073852297,394.7045908183633,395.7245508982036,396.74451097804393,397.76447105788424,398.78443113772454,399.8043912175649,400.8243512974052,401.8443113772455,402.8642714570858,403.88423153692617,404.90419161676647,405.92415169660677,406.94411177644713,407.96407185628743,408.98403193612774,410.00399201596804,411.0239520958084,412.0439121756487,413.063872255489,414.08383233532936,415.10379241516966,416.12375249500997,417.1437125748503,418.16367265469063,419.18363273453093,420.20359281437123,421.2235528942116,422.2435129740519,423.2634730538922,424.28343313373256,425.30339321357286,426.32335329341316,427.34331337325347,428.3632734530938,429.3832335329341,430.40319361277443,431.4231536926148,432.4431137724551,433.4630738522954,434.48303393213575,435.50299401197606,436.52295409181636,437.54291417165666,438.562874251497,439.5828343313373,440.6027944111776,441.622754491018,442.6427145708583,443.6626746506986,444.68263473053895,445.70259481037925,446.72255489021956,447.74251497005986,448.7624750499002,449.7824351297405,450.8023952095808,451.8223552894212,452.8423153692615,453.8622754491018,454.8822355289421,455.90219560878245,456.92215568862275,457.94211576846305,458.9620758483034,459.9820359281437,461.001996007984,462.0219560878244,463.0419161676647,464.061876247505,465.0818363273453,466.10179640718565,467.12175648702595,468.14171656686625,469.1616766467066,470.1816367265469,471.2015968063872,472.2215568862275,473.2415169660679,474.2614770459082,475.2814371257485,476.30139720558884,477.32135728542914,478.34131736526945,479.3612774451098,480.3812375249501,481.4011976047904,482.4211576846307,483.4411177644711,484.4610778443114,485.4810379241517,486.50099800399204,487.52095808383234,488.54091816367264,489.560878243513,490.5808383233533,491.6007984031936,492.6207584830339,493.64071856287427,494.6606786427146,495.6806387225549,496.70059880239523,497.72055888223554,498.74051896207584,499.76047904191614,500.7804391217565,501.8003992015968,502.8203592814371,503.84031936127747,504.86027944111777,505.88023952095807,506.90019960079843,507.92015968063873,508.94011976047904,509.96007984031934,510.9800399201597,512.0,513.0199600798403,514.0399201596806,515.0598802395209,516.0798403193613,517.0998003992016,518.1197604790419,519.1397205588822,520.1596806387225,521.1796407185628,522.1996007984031,523.2195608782436,524.2395209580839,525.2594810379242,526.2794411177645,527.2994011976048,528.3193612774451,529.3393213572855,530.3592814371258,531.3792415169661,532.3992015968064,533.4191616766467,534.439121756487,535.4590818363273,536.4790419161677,537.499001996008,538.5189620758483,539.5389221556886,540.5588822355289,541.5788423153692,542.5988023952095,543.61876247505,544.6387225548903,545.6586826347306,546.6786427145709,547.6986027944112,548.7185628742515,549.7385229540918,550.7584830339322,551.7784431137725,552.7984031936128,553.8183632734531,554.8383233532934,555.8582834331337,556.878243512974,557.8982035928144,558.9181636726547,559.938123752495,560.9580838323353,561.9780439121756,562.9980039920159,564.0179640718563,565.0379241516966,566.057884231537,567.0778443113772,568.0978043912176,569.1177644710579,570.1377245508982,571.1576846307386,572.1776447105789,573.1976047904192,574.2175648702595,575.2375249500998,576.2574850299401,577.2774451097804,578.2974051896208,579.3173652694611,580.3373253493014,581.3572854291417,582.377245508982,583.3972055888223,584.4171656686626,585.437125748503,586.4570858283433,587.4770459081836,588.497005988024,589.5169660678642,590.5369261477045,591.556886227545,592.5768463073853,593.5968063872256,594.6167664670659,595.6367265469062,596.6566866267465,597.6766467065868,598.6966067864272,599.7165668662675,600.7365269461078,601.7564870259481,602.7764471057884,603.7964071856287,604.816367265469,605.8363273453094,606.8562874251497,607.87624750499,608.8962075848303,609.9161676646706,610.9361277445109,611.9560878243512,612.9760479041917,613.996007984032,615.0159680638723,616.0359281437126,617.0558882235529,618.0758483033932,619.0958083832336,620.1157684630739,621.1357285429142,622.1556886227545,623.1756487025948,624.1956087824351,625.2155688622754,626.2355289421158,627.2554890219561,628.2754491017964,629.2954091816367,630.315369261477,631.3353293413173,632.3552894211576,633.375249500998,634.3952095808384,635.4151696606787,636.435129740519,637.4550898203593,638.4750499001996,639.4950099800399,640.5149700598803,641.5349301397206,642.5548902195609,643.5748502994012,644.5948103792415,645.6147704590818,646.6347305389221,647.6546906187625,648.6746506986028,649.6946107784431,650.7145708582834,651.7345309381237,652.754491017964,653.7744510978044,654.7944111776447,655.814371257485,656.8343313373254,657.8542914171657,658.874251497006,659.8942115768463,660.9141716566867,661.934131736527,662.9540918163673,663.9740518962076,664.9940119760479,666.0139720558882,667.0339321357285,668.0538922155689,669.0738522954092,670.0938123752495,671.1137724550898,672.1337325349301,673.1536926147704,674.1736526946107,675.1936127744511,676.2135728542914,677.2335329341317,678.253493013972,679.2734530938123,680.2934131736527,681.3133732534931,682.3333333333334,683.3532934131737,684.373253493014,685.3932135728543,686.4131736526946,687.4331337325349,688.4530938123753,689.4730538922156,690.4930139720559,691.5129740518962,692.5329341317365,693.5528942115768,694.5728542914171,695.5928143712575,696.6127744510978,697.6327345309381,698.6526946107784,699.6726546906187,700.692614770459,701.7125748502993,702.7325349301398,703.7524950099801,704.7724550898204,705.7924151696607,706.812375249501,707.8323353293413,708.8522954091817,709.872255489022,710.8922155688623,711.9121756487026,712.9321357285429,713.9520958083832,714.9720558882235,715.9920159680639,717.0119760479042,718.0319361277445,719.0518962075848,720.0718562874251,721.0918163672654,722.1117764471057,723.1317365269462,724.1516966067865,725.1716566866268,726.1916167664671,727.2115768463074,728.2315369261477,729.251497005988,730.2714570858284,731.2914171656687,732.311377245509,733.3313373253493,734.3512974051896,735.3712574850299,736.3912175648702,737.4111776447106,738.4311377245509,739.4510978043912,740.4710578842315,741.4910179640718,742.5109780439121,743.5309381237525,744.5508982035929,745.5708582834332,746.5908183632735,747.6107784431138,748.6307385229541,749.6506986027944,750.6706586826348,751.6906187624751,752.7105788423154,753.7305389221557,754.750499001996,755.7704590818363,756.7904191616766,757.810379241517,758.8303393213573,759.8502994011976,760.8702594810379,761.8902195608782,762.9101796407185,763.9301397205588,764.9500998003992,765.9700598802395,766.9900199600798,768.0099800399202,769.0299401197605,770.0499001996008,771.0698602794412,772.0898203592815,773.1097804391218,774.1297405189621,775.1497005988024,776.1696606786427,777.189620758483,778.2095808383234,779.2295409181637,780.249500998004,781.2694610778443,782.2894211576846,783.3093812375249,784.3293413173652,785.3493013972056,786.3692614770459,787.3892215568862,788.4091816367265,789.4291417165668,790.4491017964071,791.4690618762475,792.4890219560879,793.5089820359282,794.5289421157685,795.5489021956088,796.5688622754491,797.5888223552894,798.6087824351298,799.6287425149701,800.6487025948104,801.6686626746507,802.688622754491,803.7085828343313,804.7285429141716,805.748502994012,806.7684630738523,807.7884231536926,808.8083832335329,809.8283433133732,810.8483033932135,811.8682634730538,812.8882235528943,813.9081836327346,814.9281437125749,815.9481037924152,816.9680638722555,817.9880239520958,819.0079840319361,820.0279441117765,821.0479041916168,822.0678642714571,823.0878243512974,824.1077844311377,825.127744510978,826.1477045908183,827.1676646706587,828.187624750499,829.2075848303393,830.2275449101796,831.2475049900199,832.2674650698602,833.2874251497007,834.307385229541,835.3273453093813,836.3473053892216,837.3672654690619,838.3872255489022,839.4071856287425,840.4271457085829,841.4471057884232,842.4670658682635,843.4870259481038,844.5069860279441,845.5269461077844,846.5469061876247,847.5668662674651,848.5868263473054,849.6067864271457,850.626746506986,851.6467065868263,852.6666666666666,853.6866267465069,854.7065868263473,855.7265469061877,856.746506986028,857.7664670658683,858.7864271457086,859.8063872255489,860.8263473053893,861.8463073852296,862.8662674650699,863.8862275449102,864.9061876247505,865.9261477045908,866.9461077844311,867.9660678642715,868.9860279441118,870.0059880239521,871.0259481037924,872.0459081836327,873.065868263473,874.0858283433133,875.1057884231537,876.125748502994,877.1457085828343,878.1656686626746,879.185628742515,880.2055888223553,881.2255489021956,882.245508982036,883.2654690618763,884.2854291417166,885.3053892215569,886.3253493013972,887.3453093812375,888.3652694610779,889.3852295409182,890.4051896207585,891.4251497005988,892.4451097804391,893.4650698602794,894.4850299401197,895.5049900199601,896.5249500998004,897.5449101796407,898.564870259481,899.5848303393213,900.6047904191616,901.624750499002,902.6447105788424,903.6646706586827,904.684630738523,905.7045908183633,906.7245508982036,907.7445109780439,908.7644710578842,909.7844311377246,910.8043912175649,911.8243512974052,912.8443113772455,913.8642714570858,914.8842315369261,915.9041916167664,916.9241516966068,917.9441117764471,918.9640718562874,919.9840319361277,921.003992015968,922.0239520958083,923.0439121756488,924.0638722554891,925.0838323353294,926.1037924151697,927.12375249501,928.1437125748503,929.1636726546906,930.183632734531,931.2035928143713,932.2235528942116,933.2435129740519,934.2634730538922,935.2834331337325,936.3033932135728,937.3233532934132,938.3433133732535,939.3632734530938,940.3832335329341,941.4031936127744,942.4231536926147,943.443113772455,944.4630738522955,945.4830339321358,946.502994011976,947.5229540918164,948.5429141716567,949.562874251497,950.5828343313374,951.6027944111777,952.622754491018,953.6427145708583,954.6626746506986,955.6826347305389,956.7025948103792,957.7225548902196,958.7425149700599,959.7624750499002,960.7824351297405,961.8023952095808,962.8223552894211,963.8423153692614,964.8622754491018,965.8822355289421,966.9021956087824,967.9221556886228,968.942115768463,969.9620758483034,970.9820359281437,972.0019960079841,973.0219560878244,974.0419161676647,975.061876247505,976.0818363273453,977.1017964071856,978.121756487026,979.1417165668663,980.1616766467066,981.1816367265469,982.2015968063872,983.2215568862275,984.2415169660678,985.2614770459082,986.2814371257485,987.3013972055888,988.3213572854291,989.3413173652694,990.3612774451097,991.38123752495,992.4011976047905,993.4211576846308,994.4411177644711,995.4610778443114,996.4810379241517,997.500998003992,998.5209580838323,999.5409181636727,1000.560878243513,1001.5808383233533,1002.6007984031936,1003.6207584830339,1004.6407185628742,1005.6606786427145,1006.6806387225549,1007.7005988023952,1008.7205588822355,1009.7405189620758,1010.7604790419161,1011.7804391217564,1012.8003992015969,1013.8203592814372,1014.8403193612775,1015.8602794411178,1016.8802395209581,1017.9001996007984,1018.9201596806387,1019.9401197604791,1020.9600798403194,1021.9800399201597,1023.0]}
},{}],53:[function(require,module,exports){
module.exports={"expected":[0.5,0.5003446252630009,0.5006894880591457,0.5010345885521541,0.5013799269058588,0.5017255032842054,0.5020713178512526,0.5024173707711721,0.5027636622082485,0.5031101923268803,0.5034569612915785,0.5038039692669679,0.504151216417787,0.5044987029088875,0.5048464289052347,0.5051943945719078,0.5055426000740997,0.5058910455771172,0.5062397312463808,0.5065886572474254,0.5069378237458998,0.5072872309075669,0.507636878898304,0.5079867678841026,0.5083368980310687,0.5086872695054228,0.5090378824734999,0.5093887371017496,0.5097398335567365,0.5100911720051395,0.510442752613753,0.5107945755494858,0.5111466409793622,0.5114989490705214,0.5118514999902176,0.5122042939058207,0.5125573309848157,0.5129106113948031,0.513264135303499,0.5136179028787348,0.5139719142884579,0.5143261697007315,0.5146806692837342,0.5150354132057611,0.5153904016352228,0.515745634740646,0.5161011126906743,0.5164568356540664,0.5168128037996983,0.5171690172965617,0.5175254763137652,0.517882181020534,0.5182391315862094,0.5185963281802498,0.5189537709722307,0.519311460131844,0.5196693958288987,0.5200275782333209,0.5203860075151536,0.5207446838445575,0.52110360739181,0.5214627783273064,0.5218221968215588,0.5221818630451975,0.5225417771689701,0.5229019393637417,0.5232623498004956,0.5236230086503326,0.5239839160844715,0.5243450722742493,0.5247064773911208,0.5250681316066592,0.5254300350925559,0.5257921880206207,0.5261545905627816,0.5265172428910853,0.526880145177697,0.5272432975949006,0.5276067003150989,0.5279703535108132,0.528334257354684,0.5286984120194704,0.5290628176780513,0.5294274745034239,0.5297923826687052,0.5301575423471314,0.530522953712058,0.5308886169369602,0.5312545321954324,0.531620699661189,0.5319871195080639,0.5323537919100111,0.5327207170411041,0.5330878950755368,0.5334553261876228,0.5338230105517962,0.5341909483426109,0.5345591397347415,0.5349275849029828,0.53529628402225,0.5356652372675793,0.5360344448141269,0.5364039068371701,0.5367736235121071,0.5371435950144567,0.537513821519859,0.5378843032040749,0.5382550402429864,0.5386260328125971,0.5389972810890314,0.5393687852485356,0.5397405454674772,0.5401125619223452,0.5404848347897504,0.5408573642464253,0.5412301504692241,0.5416031936351231,0.5419764939212204,0.5423500515047363,0.5427238665630131,0.5430979392735154,0.5434722698138302,0.5438468583616668,0.544221705094857,0.5445968101913553,0.5449721738292387,0.5453477961867069,0.5457236774420825,0.5460998177738111,0.5464762173604613,0.5468528763807246,0.5472297950134156,0.5476069734374724,0.5479844118319566,0.5483621103760525,0.5487400692490687,0.549118288630437,0.5494967686997128,0.5498755096365754,0.550254511620828,0.5506337748323975,0.5510132994513351,0.551393085657816,0.5517731336321394,0.5521534435547291,0.5525340156061329,0.5529148499670233,0.5532959468181974,0.5536773063405765,0.5540589287152071,0.5544408141232601,0.5548229627460315,0.5552053747649421,0.5555880503615379,0.5559709897174899,0.5563541930145945,0.5567376604347731,0.557121392160073,0.5575053883726662,0.5578896492548509,0.5582741749890509,0.5586589657578153,0.5590440217438195,0.5594293431298647,0.5598149300988777,0.5602007828339122,0.560586901518147,0.5609732863348882,0.5613599374675675,0.5617468550997434,0.5621340394151009,0.5625214905974513,0.5629092088307329,0.5632971942990108,0.5636854471864768,0.5640739676774497,0.5644627559563753,0.5648518122078268,0.5652411366165041,0.5656307293672349,0.5660205906449741,0.566410720634804,0.5668011195219347,0.5671917874917036,0.5675827247295763,0.5679739314211457,0.5683654077521331,0.5687571539083875,0.5691491700758862,0.5695414564407345,0.5699340131891661,0.5703268405075432,0.570719938582356,0.5711133076002236,0.5715069477478938,0.5719008592122428,0.5722950421802757,0.5726894968391267,0.5730842233760588,0.5734792219784642,0.5738744928338639,0.5742700361299088,0.5746658520543785,0.5750619407951822,0.575458302540359,0.575854937478077,0.5762518457966346,0.5766490276844595,0.5770464833301094,0.5774442129222723,0.5778422166497658,0.5782404947015377,0.5786390472666663,0.5790378745343601,0.5794369766939579,0.5798363539349292,0.5802360064468738,0.5806359344195225,0.5810361380427368,0.5814366175065089,0.5818373730009619,0.5822384047163505,0.5826397128430597,0.5830412975716064,0.5834431590926383,0.5838452975969352,0.5842477132754076,0.584650406319098,0.5850533769191807,0.5854566252669614,0.585860151553878,0.5862639559715,0.5866680387115293,0.5870723999657997,0.5874770399262773,0.5878819587850606,0.5882871567343801,0.5886926339665995,0.5890983906742144,0.5895044270498535,0.589910743286278,0.5903173395763822,0.5907242161131933,0.5911313730898714,0.5915388106997098,0.5919465291361351,0.5923545285927072,0.5927628092631193,0.5931713713411982,0.5935802150209044,0.5939893404963319,0.5943987479617086,0.5948084376113959,0.59521840963989,0.5956286642418203,0.5960392016119507,0.5964500219451795,0.596861125436539,0.5972725122811963,0.5976841826744526,0.5980961368117439,0.5985083748886412,0.5989208971008496,0.5993337036442099,0.5997467947146974,0.6001601705084224,0.6005738312216308,0.6009877770507032,0.6014020081921561,0.6018165248426411,0.6022313271989456,0.6026464154579922,0.6030617898168398,0.6034774504726826,0.6038933976228512,0.6043096314648119,0.604726152196167,0.6051429600146553,0.6055600551181517,0.6059774377046676,0.6063951079723509,0.6068130661194857,0.6072313123444935,0.6076498468459317,0.6080686698224952,0.6084877814730156,0.6089071819964615,0.609326871591939,0.6097468504586908,0.6101671187960974,0.6105876768036768,0.6110085246810839,0.611429662628112,0.6118510908446916,0.612272809530891,0.6126948188869169,0.6131171191131134,0.6135397104099628,0.613962592978086,0.6143857670182415,0.6148092327313269,0.6152329903183779,0.6156570399805684,0.6160813819192118,0.6165060163357596,0.6169309434318024,0.6173561634090696,0.6177816764694297,0.6182074828148907,0.6186335826475992,0.6190599761698414,0.6194866635840431,0.6199136450927696,0.6203409208987256,0.6207684912047555,0.6211963562138437,0.6216245161291146,0.6220529711538323,0.6224817214914011,0.6229107673453655,0.6233401089194106,0.6237697464173614,0.6241996800431836,0.6246299100009837,0.6250604364950083,0.6254912597296454,0.6259223799094237,0.6263537972390126,0.6267855119232228,0.6272175241670063,0.627649834175456,0.6280824421538065,0.6285153483074335,0.6289485528418546,0.629382055962729,0.6298158578758575,0.6302499587871827,0.6306843589027894,0.6311190584289044,0.6315540575718963,0.6319893565382764,0.632424955534698,0.632860854767957,0.6332970544449917,0.6337335547728834,0.6341703559588556,0.6346074582102751,0.6350448617346512,0.6354825667396367,0.635920573433027,0.6363588820227611,0.6367974927169212,0.6372364057237331,0.6376756212515657,0.638115139508932,0.6385549607044883,0.6389950850470348,0.6394355127455162,0.6398762440090203,0.6403172790467796,0.6407586180681707,0.6412002612827145,0.6416422089000762,0.6420844611300655,0.642527018182637,0.6429698802678898,0.6434130475960679,0.6438565203775599,0.6443002988228999,0.6447443831427667,0.6451887735479847,0.6456334702495231,0.646078473458497,0.6465237833861668,0.6469694002439383,0.6474153242433637,0.6478615555961401,0.6483080945141111,0.6487549412092662,0.649202095893741,0.6496495587798173,0.6500973300799232,0.6505454100066332,0.6509937987726684,0.6514424965908964,0.6518915036743317,0.6523408202361354,0.6527904464896156,0.6532403826482276,0.6536906289255735,0.654141185535403,0.6545920526916128,0.6550432306082471,0.6554947194994979,0.6559465195797043,0.6563986310633537,0.656851054165081,0.6573037890996692,0.6577568360820493,0.6582101953273001,0.6586638670506492,0.6591178514674724,0.6595721487932935,0.6600267592437854,0.6604816830347696,0.6609369203822159,0.6613924715022435,0.66184833661112,0.6623045159252626,0.6627610096612376,0.6632178180357601,0.6636749412656952,0.6641323795680567,0.6645901331600089,0.6650482022588651,0.6655065870820887,0.6659652878472927,0.6664243047722405,0.6668836380748451,0.6673432879731703,0.6678032546854296,0.6682635384299873,0.668724139425358,0.6691850578902071,0.6696462940433505,0.6701078481037551,0.6705697202905386,0.6710319108229699,0.6714944199204687,0.6719572478026061,0.6724203946891049,0.6728838607998386,0.6733476463548332,0.6738117515742653,0.6742761766784642,0.6747409218879103,0.6752059874232366,0.6756713735052277,0.6761370803548206,0.6766031081931044,0.6770694572413211,0.6775361277208645,0.6780031198532813,0.6784704338602712,0.6789380699636861,0.6794060283855312,0.6798743093479648,0.6803429130732981,0.6808118397839955,0.6812810897026749,0.6817506630521076,0.6822205600552185,0.6826907809350857,0.6831613259149419,0.683632195218173,0.6841033890683189,0.6845749076890739,0.6850467513042863,0.6855189201379587,0.6859914144142479,0.6864642343574657,0.6869373801920782,0.6874108521427058,0.6878846504341246,0.688358775291265,0.6888332269392125,0.6893080056032079,0.6897831115086472,0.6902585448810818,0.6907343059462183,0.6912103949299193,0.6916868120582027,0.6921635575572425,0.6926406316533681,0.6931180345730654,0.6935957665429763,0.6940738277898988,0.6945522185407871,0.695030939022752,0.6955099894630611,0.6959893700891381,0.6964690811285638,0.6969491228090756,0.6974294953585684,0.6979101990050934,0.6983912339768598,0.6988726005022334,0.6993542988097379,0.6998363291280542,0.700318691686021,0.7008013867126345,0.701284414437049,0.7017677750885767,0.7022514688966877,0.7027354960910103,0.7032198569013312,0.7037045515575954,0.7041895802899064,0.7046749433285262,0.7051606409038758,0.7056466732465346,0.7061330405872412,0.7066197431568934,0.7071067811865476,0.7075941549074198,0.7080818645508856,0.7085699103484797,0.7090582925318966,0.7095470113329901,0.7100360669837744,0.7105254597164233,0.7110151897632706,0.7115052573568103,0.7119956627296965,0.712486406114744,0.7129774877449278,0.7134689078533835,0.7139606666734074,0.7144527644384567,0.7149452013821495,0.7154379777382646,0.7159310937407424,0.7164245496236843,0.7169183456213531,0.717412481968173,0.7179069588987299,0.7184017766477713,0.7188969354502064,0.7193924355411067,0.7198882771557051,0.7203844605293973,0.7208809858977407,0.7213778534964554,0.7218750635614241,0.7223726163286914,0.7228705120344653,0.7233687509151163,0.7238673332071779,0.7243662591473465,0.7248655289724818,0.7253651429196067,0.7258651012259075,0.7263654041287338,0.7268660518655992,0.7273670446741805,0.7278683827923186,0.7283700664580183,0.7288720959094485,0.7293744713849422,0.7298771931229966,0.7303802613622734,0.7308836763415988,0.7313874382999634,0.7318915474765229,0.7323960041105974,0.7329008084416723,0.7334059607093979,0.7339114611535897,0.7344173100142286,0.7349235075314609,0.735430053945598,0.7359369494971176,0.7364441944266628,0.7369517889750423,0.7374597333832315,0.737968027892371,0.7384766727437684,0.7389856681788972,0.7394950144393974,0.7400047117670755,0.7405147604039047,0.7410251605920253,0.741535912573744,0.7420470165915347,0.7425584728880386,0.7430702817060638,0.7435824432885861,0.7440949578787485,0.7446078257198618,0.7451210470554044,0.7456346221290223,0.7461485511845299,0.7466628344659094,0.7471774722173111,0.7476924646830536,0.7482078121076241,0.748723514735678,0.7492395728120396,0.7497559865817017,0.7502727562898261,0.7507898821817438,0.7513073645029544,0.7518252034991272,0.7523433994161004,0.7528619524998821,0.7533808629966494,0.7539001311527496,0.7544197572146994,0.754939741429186,0.7554600840430657,0.7559807853033659,0.7565018454572835,0.7570232647521863,0.7575450434356125,0.7580671817552705,0.7585896799590401,0.7591125382949715,0.7596357570112859,0.7601593363563758,0.7606832765788046,0.7612075779273074,0.7617322406507905,0.7622572649983316,0.7627826512191804,0.7633083995627584,0.7638345102786587,0.7643609836166466,0.7648878198266598,0.7654150191588077,0.7659425818633726,0.7664705081908092,0.7669987983917447,0.767527452716979,0.768056471417485,0.7685858547444087,0.7691156029490689,0.7696457162829577,0.7701761949977409,0.7707070393452572,0.7712382495775193,0.7717698259467134,0.7723017687051995,0.7728340781055117,0.7733667544003582,0.773899797842621,0.7744332086853567,0.7749669871817965,0.7755011335853456,0.7760356481495844,0.7765705311282677,0.7771057827753254,0.7776414033448623,0.7781773930911586,0.7787137522686696,0.7792504811320256,0.7797875799360331,0.7803250489356737,0.7808628883861051,0.7814010985426605,0.7819396796608495,0.7824786319963575,0.7830179558050462,0.7835576513429537,0.7840977188662946,0.7846381586314601,0.785178970895018,0.785720155913713,0.7862617139444669,0.7868036452443782,0.787345950070723,0.7878886286809548,0.788431681332704,0.7889751082837791,0.7895189097921661,0.7900630861160288,0.790607637513709,0.7911525642437264,0.7916978665647791,0.7922435447357434,0.7927895990156741,0.7933360296638046,0.7938828369395465,0.794430021102491,0.7949775824124076,0.795525521129245,0.7960738375131313,0.7966225318243736,0.7971716043234585,0.7977210552710522,0.7982708849280005,0.7988210935553292,0.7993716814142435,0.7999226487661293,0.8004739958725522,0.8010257229952582,0.8015778303961737,0.8021303183374057,0.8026831870812418,0.8032364368901505,0.8037900680267808,0.8043440807539634,0.8048984753347095,0.8054532520322121,0.8060084111098452,0.8065639528311647,0.8071198774599077,0.8076761852599935,0.8082328764955231,0.8087899514307797,0.8093474103302284,0.8099052534585167,0.8104634810804747,0.8110220934611148,0.8115810908656319,0.8121404735594043,0.8127002418079925,0.8132603958771405,0.8138209360327754,0.8143818625410073,0.81494317566813,0.815504875680621,0.8160669628451409,0.8166294374285347,0.8171922996978309,0.8177555499202424,0.8183191883631659,0.8188832152941826,0.8194476309810582,0.8200124356917429,0.8205776296943715,0.8211432132572637,0.8217091866489242,0.8222755501380425,0.8228423039934937,0.8234094484843377,0.8239769838798205,0.8245449104493732,0.8251132284626126,0.8256819381893415,0.8262510398995487,0.8268205338634091,0.8273904203512836,0.8279606996337197,0.8285313719814511,0.8291024376653984,0.8296738969566687,0.8302457501265561,0.8308179974465416,0.8313906391882935,0.8319636756236671,0.8325371070247052,0.8331109336636381,0.8336851558128836,0.8342597737450476,0.8348347877329236,0.8354101980494932,0.8359860049679261,0.8365622087615805,0.8371388097040027,0.8377158080689278,0.8382932041302794,0.8388709981621699,0.839449190438901,0.8400277812349628,0.8406067708250352,0.8411861594839871,0.8417659474868769,0.8423461351089527,0.8429267226256523,0.8435077103126031,0.8440890984456226,0.8446708873007187,0.8452530771540893,0.8458356682821224,0.8464186609613971,0.8470020554686825,0.847585852080939,0.8481700510753174,0.8487546527291602,0.8493396573200003,0.8499250651255623,0.8505108764237623,0.8510970914927077,0.8516837106106977,0.8522707340562233,0.8528581621079676,0.8534459950448056,0.8540342331458044,0.8546228766902237,0.8552119259575157,0.855801381227325,0.8563912427794891,0.8569815108940383,0.8575721858511959,0.8581632679313784,0.8587547574151956,0.8593466545834506,0.8599389597171402,0.8605316730974548,0.8611247950057784,0.8617183257236894,0.8623122655329599,0.8629066147155564,0.8635013735536397,0.8640965423295648,0.8646921213258819,0.8652881108253354,0.865884511110865,0.866481322465605,0.8670785451728853,0.8676761795162306,0.8682742257793614,0.8688726842461938,0.8694715552008391,0.870070838927605,0.8706705357109947,0.8712706458357079,0.8718711695866401,0.8724721072488836,0.8730734591077268,0.8736752254486552,0.8742774065573504,0.8748800027196917,0.8754830142217547,0.8760864413498127,0.8766902843903362,0.877294543629993,0.8778992193556485,0.8785043118543661,0.8791098214134067,0.8797157483202293,0.8803220928624911,0.8809288553280477,0.8815360360049528,0.8821436351814588,0.8827516531460168,0.8833600901872767,0.8839689465940874,0.8845782226554967,0.8851879186607517,0.8857980348992992,0.886408571660785,0.8870195292350548,0.8876309079121539,0.888242707982328,0.8888549297360221,0.889467573463882,0.8900806394567536,0.8906941280056833,0.8913080394019179,0.8919223739369054,0.8925371319022943,0.8931523135899342,0.8937679192918758,0.8943839493003714,0.8950004039078743,0.8956172834070397,0.8962345880907244,0.896852318251987,0.8974704741840882,0.8980890561804907,0.8987080645348596,0.8993274995410624,0.8999473614931691,0.9005676506854522,0.9011883674123875,0.9018095119686532,0.9024310846491311,0.903053085748906,0.9036755155632661,0.904298374387703,0.9049216625179124,0.9055453802497934,0.9061695278794492,0.9067941057031869,0.9074191140175182,0.908044553119159,0.9086704233050295,0.9092967248722549,0.9099234581181648,0.9105506233402942,0.9111782208363829,0.9118062509043758,0.9124347138424235,0.9130636099488817,0.9136929395223121,0.9143227028614821,0.9149529002653648,0.9155835320331397,0.9162145984641922,0.9168460998581143,0.9174780365147042,0.9181104087339671,0.9187432168161148,0.919376461061566,0.9200101417709464,0.9206442592450891,0.9212788137850344,0.9219138056920302,0.9225492352675317,0.9231851028132025,0.9238214086309137,0.9244581530227443,0.925095336290982,0.9257329587381224,0.9263710206668699,0.9270095223801375,0.9276484641810467,0.9282878463729284,0.928927669259322,0.9295679331439768,0.9302086383308507,0.9308497851241118,0.9314913738281373,0.9321334047475145,0.9327758781870407,0.9334187944517229,0.9340621538467788,0.9347059566776362,0.9353502032499333,0.9359948938695193,0.936640028842454,0.9372856084750081,0.9379316330736635,0.9385781029451132,0.939225018396262,0.9398723797342258,0.9405201872663322,0.9411684413001209,0.9418171421433434,0.9424662901039633,0.9431158854901565,0.9437659286103113,0.9444164197730286,0.945067359287122,0.9457187474616179,0.9463705846057556,0.9470228710289879,0.9476756070409804,0.9483287929516125,0.9489824290709772,0.9496365157093809,0.9502910531773442,0.9509460417856015,0.9516014818451016,0.9522573736670076,0.9529137175626967,0.9535705138437612,0.9542277628220079,0.9548854648094586,0.95554362011835,0.9562022290611344,0.9568612919504789,0.9575208090992666,0.958180780820596,0.9588412074277816,0.9595020892343534,0.9601634265540581,0.9608252197008582,0.9614874689889329,0.9621501747326777,0.962813337246705,0.963476956845844,0.9641410338451407,0.9648055685598584,0.9654705613054778,0.966136012397697,0.9668019221524314,0.9674682908858147,0.9681351189141979,0.9688024065541504,0.9694701541224597,0.9701383619361317,0.9708070303123908,0.9714761595686799,0.9721457500226609,0.9728158019922145,0.9734863157954406,0.9741572917506582,0.9748287301764059,0.9755006313914418,0.9761729957147435,0.9768458234655087,0.9775191149631551,0.9781928705273203,0.9788670904778626,0.9795417751348604,0.9802169248186129,0.9808925398496401,0.9815686205486828,0.9822451672367029,0.9829221802348835,0.9835996598646294,0.9842776064475663,0.9849560203055422,0.9856349017606265,0.9863142511351108,0.9869940687515089,0.9876743549325566,0.9883551100012125,0.9890363342806574,0.9897180280942953,0.9904001917657529,0.9910828256188797,0.991765929977749,0.9924495051666569,0.9931335515101234,0.9938180693328919,0.9945030589599296,0.9951885207164283,0.9958744549278031,0.996560861919694,0.997247742017965,0.9979350955487051,0.9986229228382277,0.9993112242130715,1.0],"x":[-1.0,-0.9990059642147118,-0.9980119284294234,-0.9970178926441352,-0.9960238568588469,-0.9950298210735586,-0.9940357852882704,-0.9930417495029821,-0.9920477137176938,-0.9910536779324056,-0.9900596421471173,-0.989065606361829,-0.9880715705765407,-0.9870775347912525,-0.9860834990059643,-0.9850894632206759,-0.9840954274353877,-0.9831013916500994,-0.9821073558648111,-0.9811133200795229,-0.9801192842942346,-0.9791252485089463,-0.9781312127236581,-0.9771371769383698,-0.9761431411530815,-0.9751491053677932,-0.974155069582505,-0.9731610337972167,-0.9721669980119284,-0.9711729622266402,-0.9701789264413518,-0.9691848906560636,-0.9681908548707754,-0.967196819085487,-0.9662027833001988,-0.9652087475149106,-0.9642147117296223,-0.963220675944334,-0.9622266401590457,-0.9612326043737575,-0.9602385685884692,-0.9592445328031809,-0.9582504970178927,-0.9572564612326043,-0.9562624254473161,-0.9552683896620279,-0.9542743538767395,-0.9532803180914513,-0.952286282306163,-0.9512922465208747,-0.9502982107355865,-0.9493041749502982,-0.94831013916501,-0.9473161033797217,-0.9463220675944334,-0.9453280318091452,-0.9443339960238568,-0.9433399602385686,-0.9423459244532804,-0.941351888667992,-0.9403578528827038,-0.9393638170974155,-0.9383697813121272,-0.937375745526839,-0.9363817097415507,-0.9353876739562624,-0.9343936381709742,-0.9333996023856859,-0.9324055666003976,-0.9314115308151093,-0.9304174950298211,-0.9294234592445328,-0.9284294234592445,-0.9274353876739563,-0.9264413518886679,-0.9254473161033797,-0.9244532803180915,-0.9234592445328031,-0.9224652087475149,-0.9214711729622267,-0.9204771371769384,-0.9194831013916501,-0.9184890656063618,-0.9174950298210736,-0.9165009940357853,-0.915506958250497,-0.9145129224652088,-0.9135188866799204,-0.9125248508946322,-0.911530815109344,-0.9105367793240556,-0.9095427435387674,-0.9085487077534792,-0.9075546719681908,-0.9065606361829026,-0.9055666003976143,-0.904572564612326,-0.9035785288270378,-0.9025844930417495,-0.9015904572564613,-0.9005964214711729,-0.8996023856858847,-0.8986083499005965,-0.8976143141153081,-0.8966202783300199,-0.8956262425447317,-0.8946322067594433,-0.8936381709741551,-0.8926441351888668,-0.8916500994035785,-0.8906560636182903,-0.889662027833002,-0.8886679920477137,-0.8876739562624254,-0.8866799204771372,-0.885685884691849,-0.8846918489065606,-0.8836978131212724,-0.882703777335984,-0.8817097415506958,-0.8807157057654076,-0.8797216699801192,-0.878727634194831,-0.8777335984095428,-0.8767395626242545,-0.8757455268389662,-0.8747514910536779,-0.8737574552683897,-0.8727634194831014,-0.8717693836978131,-0.8707753479125249,-0.8697813121272365,-0.8687872763419483,-0.8677932405566601,-0.8667992047713717,-0.8658051689860835,-0.8648111332007953,-0.8638170974155069,-0.8628230616302187,-0.8618290258449304,-0.8608349900596421,-0.8598409542743539,-0.8588469184890656,-0.8578528827037774,-0.856858846918489,-0.8558648111332008,-0.8548707753479126,-0.8538767395626242,-0.852882703777336,-0.8518886679920478,-0.8508946322067594,-0.8499005964214712,-0.8489065606361829,-0.8479125248508946,-0.8469184890656064,-0.8459244532803181,-0.8449304174950298,-0.8439363817097415,-0.8429423459244533,-0.841948310139165,-0.8409542743538767,-0.8399602385685885,-0.8389662027833003,-0.8379721669980119,-0.8369781312127237,-0.8359840954274353,-0.8349900596421471,-0.8339960238568589,-0.8330019880715706,-0.8320079522862823,-0.831013916500994,-0.8300198807157058,-0.8290258449304175,-0.8280318091451292,-0.827037773359841,-0.8260437375745527,-0.8250497017892644,-0.8240556660039762,-0.8230616302186878,-0.8220675944333996,-0.8210735586481114,-0.820079522862823,-0.8190854870775348,-0.8180914512922465,-0.8170974155069582,-0.81610337972167,-0.8151093439363817,-0.8141153081510935,-0.8131212723658051,-0.8121272365805169,-0.8111332007952287,-0.8101391650099403,-0.8091451292246521,-0.8081510934393639,-0.8071570576540755,-0.8061630218687873,-0.805168986083499,-0.8041749502982107,-0.8031809145129225,-0.8021868787276342,-0.8011928429423459,-0.8001988071570576,-0.7992047713717694,-0.7982107355864811,-0.7972166998011928,-0.7962226640159046,-0.7952286282306164,-0.794234592445328,-0.7932405566600398,-0.7922465208747514,-0.7912524850894632,-0.790258449304175,-0.7892644135188867,-0.7882703777335984,-0.7872763419483101,-0.7862823061630219,-0.7852882703777336,-0.7842942345924453,-0.7833001988071571,-0.7823061630218688,-0.7813121272365805,-0.7803180914512923,-0.7793240556660039,-0.7783300198807157,-0.7773359840954275,-0.7763419483101391,-0.7753479125248509,-0.7743538767395626,-0.7733598409542743,-0.7723658051689861,-0.7713717693836978,-0.7703777335984096,-0.7693836978131213,-0.768389662027833,-0.7673956262425448,-0.7664015904572564,-0.7654075546719682,-0.76441351888668,-0.7634194831013916,-0.7624254473161034,-0.7614314115308151,-0.7604373757455268,-0.7594433399602386,-0.7584493041749503,-0.757455268389662,-0.7564612326043738,-0.7554671968190855,-0.7544731610337972,-0.7534791252485089,-0.7524850894632207,-0.7514910536779325,-0.7504970178926441,-0.7495029821073559,-0.7485089463220675,-0.7475149105367793,-0.7465208747514911,-0.7455268389662028,-0.7445328031809145,-0.7435387673956262,-0.742544731610338,-0.7415506958250497,-0.7405566600397614,-0.7395626242544732,-0.7385685884691849,-0.7375745526838966,-0.7365805168986084,-0.73558648111332,-0.7345924453280318,-0.7335984095427436,-0.7326043737574552,-0.731610337972167,-0.7306163021868787,-0.7296222664015904,-0.7286282306163022,-0.7276341948310139,-0.7266401590457257,-0.7256461232604374,-0.7246520874751491,-0.7236580516898609,-0.7226640159045725,-0.7216699801192843,-0.7206759443339961,-0.7196819085487077,-0.7186878727634195,-0.7176938369781312,-0.7166998011928429,-0.7157057654075547,-0.7147117296222664,-0.7137176938369781,-0.7127236580516899,-0.7117296222664016,-0.7107355864811133,-0.709741550695825,-0.7087475149105368,-0.7077534791252486,-0.7067594433399602,-0.705765407554672,-0.7047713717693836,-0.7037773359840954,-0.7027833001988072,-0.7017892644135189,-0.7007952286282306,-0.6998011928429424,-0.6988071570576541,-0.6978131212723658,-0.6968190854870775,-0.6958250497017893,-0.694831013916501,-0.6938369781312127,-0.6928429423459245,-0.6918489065606361,-0.6908548707753479,-0.6898608349900597,-0.6888667992047713,-0.6878727634194831,-0.6868787276341949,-0.6858846918489065,-0.6848906560636183,-0.68389662027833,-0.6829025844930418,-0.6819085487077535,-0.6809145129224652,-0.679920477137177,-0.6789264413518886,-0.6779324055666004,-0.6769383697813122,-0.6759443339960238,-0.6749502982107356,-0.6739562624254473,-0.672962226640159,-0.6719681908548708,-0.6709741550695825,-0.6699801192842942,-0.668986083499006,-0.6679920477137177,-0.6669980119284294,-0.6660039761431411,-0.6650099403578529,-0.6640159045725647,-0.6630218687872763,-0.6620278330019881,-0.6610337972166997,-0.6600397614314115,-0.6590457256461233,-0.658051689860835,-0.6570576540755467,-0.6560636182902585,-0.6550695825049702,-0.6540755467196819,-0.6530815109343936,-0.6520874751491054,-0.6510934393638171,-0.6500994035785288,-0.6491053677932406,-0.6481113320079522,-0.647117296222664,-0.6461232604373758,-0.6451292246520874,-0.6441351888667992,-0.643141153081511,-0.6421471172962226,-0.6411530815109344,-0.6401590457256461,-0.6391650099403579,-0.6381709741550696,-0.6371769383697813,-0.6361829025844931,-0.6351888667992047,-0.6341948310139165,-0.6332007952286283,-0.6322067594433399,-0.6312127236580517,-0.6302186878727635,-0.6292246520874751,-0.6282306163021869,-0.6272365805168986,-0.6262425447316103,-0.6252485089463221,-0.6242544731610338,-0.6232604373757455,-0.6222664015904572,-0.621272365805169,-0.6202783300198808,-0.6192842942345924,-0.6182902584493042,-0.617296222664016,-0.6163021868787276,-0.6153081510934394,-0.614314115308151,-0.6133200795228628,-0.6123260437375746,-0.6113320079522863,-0.610337972166998,-0.6093439363817097,-0.6083499005964215,-0.6073558648111332,-0.6063618290258449,-0.6053677932405567,-0.6043737574552683,-0.6033797216699801,-0.6023856858846919,-0.6013916500994035,-0.6003976143141153,-0.5994035785288271,-0.5984095427435387,-0.5974155069582505,-0.5964214711729622,-0.595427435387674,-0.5944333996023857,-0.5934393638170974,-0.5924453280318092,-0.5914512922465208,-0.5904572564612326,-0.5894632206759444,-0.588469184890656,-0.5874751491053678,-0.5864811133200796,-0.5854870775347912,-0.584493041749503,-0.5834990059642147,-0.5825049701789264,-0.5815109343936382,-0.5805168986083499,-0.5795228628230616,-0.5785288270377733,-0.5775347912524851,-0.5765407554671969,-0.5755467196819085,-0.5745526838966203,-0.5735586481113321,-0.5725646123260437,-0.5715705765407555,-0.5705765407554672,-0.5695825049701789,-0.5685884691848907,-0.5675944333996024,-0.5666003976143141,-0.5656063618290258,-0.5646123260437376,-0.5636182902584493,-0.562624254473161,-0.5616302186878728,-0.5606361829025845,-0.5596421471172962,-0.558648111332008,-0.5576540755467196,-0.5566600397614314,-0.5556660039761432,-0.5546719681908548,-0.5536779324055666,-0.5526838966202783,-0.55168986083499,-0.5506958250497018,-0.5497017892644135,-0.5487077534791253,-0.547713717693837,-0.5467196819085487,-0.5457256461232605,-0.5447316103379721,-0.5437375745526839,-0.5427435387673957,-0.5417495029821073,-0.5407554671968191,-0.5397614314115308,-0.5387673956262425,-0.5377733598409543,-0.536779324055666,-0.5357852882703777,-0.5347912524850894,-0.5337972166998012,-0.532803180914513,-0.5318091451292246,-0.5308151093439364,-0.5298210735586482,-0.5288270377733598,-0.5278330019880716,-0.5268389662027833,-0.525844930417495,-0.5248508946322068,-0.5238568588469185,-0.5228628230616302,-0.5218687872763419,-0.5208747514910537,-0.5198807157057654,-0.5188866799204771,-0.5178926441351889,-0.5168986083499006,-0.5159045725646123,-0.5149105367793241,-0.5139165009940357,-0.5129224652087475,-0.5119284294234593,-0.510934393638171,-0.5099403578528827,-0.5089463220675944,-0.5079522862823062,-0.5069582504970179,-0.5059642147117296,-0.5049701789264414,-0.5039761431411531,-0.5029821073558648,-0.5019880715705766,-0.5009940357852882,-0.5,-0.4990059642147117,-0.49801192842942343,-0.4970178926441352,-0.4960238568588469,-0.49502982107355864,-0.49403578528827036,-0.49304174950298213,-0.49204771371769385,-0.49105367793240556,-0.49005964214711734,-0.4890656063618291,-0.4880715705765408,-0.48707753479125254,-0.48608349900596426,-0.485089463220676,-0.48409542743538775,-0.48310139165009947,-0.4821073558648112,-0.4811133200795229,-0.48011928429423467,-0.4791252485089464,-0.4781312127236581,-0.4771371769383698,-0.4761431411530816,-0.4751491053677933,-0.47415506958250503,-0.47316103379721675,-0.47216699801192846,-0.47117296222664024,-0.47017892644135195,-0.46918489065606367,-0.4681908548707754,-0.46719681908548716,-0.4662027833001989,-0.4652087475149106,-0.4642147117296223,-0.463220675944334,-0.4622266401590458,-0.4612326043737575,-0.46023856858846923,-0.45924453280318095,-0.4582504970178927,-0.45725646123260444,-0.45626242544731616,-0.4552683896620279,-0.45427435387673964,-0.45328031809145136,-0.4522862823061631,-0.4512922465208748,-0.4502982107355865,-0.4493041749502983,-0.44831013916501,-0.4473161033797217,-0.44632206759443344,-0.4453280318091452,-0.4443339960238569,-0.44333996023856864,-0.44234592445328036,-0.44135188866799213,-0.44035785288270385,-0.43936381709741557,-0.4383697813121273,-0.437375745526839,-0.43638170974155077,-0.4353876739562625,-0.4343936381709742,-0.4333996023856859,-0.4324055666003977,-0.4314115308151094,-0.43041749502982113,-0.42942345924453285,-0.42842942345924456,-0.42743538767395634,-0.42644135188866805,-0.42544731610337977,-0.4244532803180915,-0.42345924453280326,-0.422465208747515,-0.4214711729622267,-0.4204771371769384,-0.4194831013916502,-0.4184890656063619,-0.4174950298210736,-0.41650099403578533,-0.41550695825049705,-0.4145129224652088,-0.41351888667992054,-0.41252485089463226,-0.411530815109344,-0.41053677932405575,-0.40954274353876746,-0.4085487077534792,-0.4075546719681909,-0.40656063618290267,-0.4055666003976144,-0.4045725646123261,-0.4035785288270378,-0.40258449304174954,-0.4015904572564613,-0.400596421471173,-0.39960238568588474,-0.39860834990059646,-0.39761431411530823,-0.39662027833001995,-0.39562624254473167,-0.3946322067594434,-0.3936381709741551,-0.39264413518886687,-0.3916500994035786,-0.3906560636182903,-0.389662027833002,-0.3886679920477138,-0.3876739562624255,-0.38667992047713723,-0.38568588469184895,-0.3846918489065607,-0.38369781312127244,-0.38270377733598415,-0.38170974155069587,-0.3807157057654076,-0.37972166998011936,-0.3787276341948311,-0.3777335984095428,-0.3767395626242545,-0.3757455268389663,-0.374751491053678,-0.3737574552683897,-0.37276341948310143,-0.3717693836978132,-0.3707753479125249,-0.36978131212723664,-0.36878727634194836,-0.3677932405566601,-0.36679920477137185,-0.36580516898608356,-0.3648111332007953,-0.363817097415507,-0.36282306163021877,-0.3618290258449305,-0.3608349900596422,-0.3598409542743539,-0.35884691848906564,-0.3578528827037774,-0.3568588469184891,-0.35586481113320084,-0.35487077534791256,-0.35387673956262433,-0.35288270377733605,-0.35188866799204777,-0.3508946322067595,-0.34990059642147125,-0.34890656063618297,-0.3479125248508947,-0.3469184890656064,-0.3459244532803181,-0.3449304174950299,-0.3439363817097416,-0.34294234592445333,-0.34194831013916505,-0.3409542743538768,-0.33996023856858854,-0.33896620278330025,-0.33797216699801197,-0.33697813121272374,-0.33598409542743546,-0.3349900596421472,-0.3339960238568589,-0.3330019880715706,-0.3320079522862824,-0.3310139165009941,-0.3300198807157058,-0.32902584493041753,-0.3280318091451293,-0.327037773359841,-0.32604373757455274,-0.32504970178926446,-0.3240556660039762,-0.32306163021868795,-0.32206759443339966,-0.3210735586481114,-0.3200795228628231,-0.31908548707753487,-0.3180914512922466,-0.3170974155069583,-0.31610337972167,-0.3151093439363818,-0.3141153081510935,-0.3131212723658052,-0.31212723658051694,-0.31113320079522866,-0.31013916500994043,-0.30914512922465215,-0.30815109343936387,-0.3071570576540756,-0.30616302186878736,-0.30516898608349907,-0.3041749502982108,-0.3031809145129225,-0.3021868787276343,-0.301192842942346,-0.3001988071570577,-0.29920477137176943,-0.29821073558648115,-0.2972166998011929,-0.29622266401590464,-0.29522862823061635,-0.29423459244532807,-0.29324055666003984,-0.29224652087475156,-0.2912524850894633,-0.290258449304175,-0.2892644135188867,-0.2882703777335985,-0.2872763419483102,-0.2862823061630219,-0.28528827037773363,-0.2842942345924454,-0.2833001988071571,-0.28230616302186884,-0.28131212723658056,-0.28031809145129233,-0.27932405566600405,-0.27833001988071576,-0.2773359840954275,-0.2763419483101392,-0.27534791252485097,-0.2743538767395627,-0.2733598409542744,-0.2723658051689861,-0.2713717693836979,-0.2703777335984096,-0.2693836978131213,-0.26838966202783304,-0.2673956262425448,-0.26640159045725653,-0.26540755467196825,-0.26441351888667997,-0.2634194831013917,-0.26242544731610346,-0.26143141153081517,-0.2604373757455269,-0.2594433399602386,-0.2584493041749504,-0.2574552683896621,-0.2564612326043738,-0.25546719681908553,-0.25447316103379725,-0.25347912524850896,-0.2524850894632207,-0.25149105367793245,-0.25049701789264417,-0.2495029821073559,-0.24850894632206763,-0.24751491053677935,-0.2465208747514911,-0.2455268389662028,-0.24453280318091455,-0.24353876739562627,-0.242544731610338,-0.24155069582504973,-0.24055666003976145,-0.2395626242544732,-0.2385685884691849,-0.23757455268389666,-0.2365805168986084,-0.23558648111332015,-0.23459244532803186,-0.2335984095427436,-0.23260437375745532,-0.23161033797216704,-0.23061630218687879,-0.2296222664015905,-0.22862823061630225,-0.22763419483101396,-0.2266401590457257,-0.22564612326043743,-0.22465208747514917,-0.2236580516898609,-0.22266401590457263,-0.22166998011928435,-0.2206759443339961,-0.2196819085487078,-0.21868787276341953,-0.21769383697813127,-0.216699801192843,-0.21570576540755473,-0.21471172962226645,-0.2137176938369782,-0.2127236580516899,-0.21172962226640166,-0.21073558648111337,-0.20974155069582512,-0.20874751491053684,-0.20775347912524855,-0.2067594433399603,-0.20576540755467201,-0.20477137176938376,-0.20377733598409548,-0.20278330019880722,-0.20178926441351894,-0.20079522862823068,-0.1998011928429424,-0.19880715705765414,-0.19781312127236586,-0.19681908548707758,-0.19582504970178932,-0.19483101391650104,-0.19383697813121278,-0.1928429423459245,-0.19184890656063625,-0.19085487077534796,-0.1898608349900597,-0.18886679920477142,-0.18787276341948317,-0.18687872763419489,-0.18588469184890663,-0.18489065606361835,-0.18389662027833006,-0.1829025844930418,-0.18190854870775353,-0.18091451292246527,-0.179920477137177,-0.17892644135188873,-0.17793240556660045,-0.1769383697813122,-0.1759443339960239,-0.17495029821073566,-0.17395626242544737,-0.1729622266401591,-0.17196819085487083,-0.17097415506958255,-0.1699801192842943,-0.168986083499006,-0.16799204771371776,-0.16699801192842947,-0.16600397614314122,-0.16500994035785294,-0.16401590457256468,-0.1630218687872764,-0.16202783300198814,-0.16103379721669986,-0.16003976143141158,-0.15904572564612332,-0.15805168986083504,-0.15705765407554678,-0.1560636182902585,-0.15506958250497024,-0.15407554671968196,-0.1530815109343937,-0.15208747514910542,-0.15109343936381717,-0.15009940357852888,-0.1491053677932406,-0.14811133200795235,-0.14711729622266406,-0.1461232604373758,-0.14512922465208752,-0.14413518886679927,-0.14314115308151099,-0.14214711729622273,-0.14115308151093445,-0.1401590457256462,-0.1391650099403579,-0.13817097415506963,-0.13717693836978137,-0.1361829025844931,-0.13518886679920483,-0.13419483101391655,-0.1332007952286283,-0.13220675944334,-0.13121272365805176,-0.13021868787276347,-0.12922465208747522,-0.12823061630218693,-0.12723658051689868,-0.12624254473161037,-0.1252485089463221,-0.12425447316103384,-0.12326043737574557,-0.1222664015904573,-0.12127236580516902,-0.12027833001988075,-0.11928429423459248,-0.11829025844930421,-0.11729622266401594,-0.11630218687872768,-0.1153081510934394,-0.11431411530815114,-0.11332007952286287,-0.1123260437375746,-0.11133200795228633,-0.11033797216699806,-0.10934393638170979,-0.10834990059642152,-0.10735586481113325,-0.10636182902584498,-0.10536779324055671,-0.10437375745526845,-0.10337972166998018,-0.10238568588469191,-0.10139165009940364,-0.10039761431411537,-0.0994035785288271,-0.09840954274353883,-0.09741550695825055,-0.09642147117296228,-0.09542743538767401,-0.09443339960238574,-0.09343936381709747,-0.0924453280318092,-0.09145129224652093,-0.09045725646123266,-0.0894632206759444,-0.08846918489065612,-0.08747514910536786,-0.08648111332007959,-0.0854870775347913,-0.08449304174950303,-0.08349900596421476,-0.0825049701789265,-0.08151093439363823,-0.08051689860834996,-0.07952286282306169,-0.07852882703777342,-0.07753479125248515,-0.07654075546719688,-0.07554671968190861,-0.07455268389662033,-0.07355864811133206,-0.07256461232604379,-0.07157057654075552,-0.07057654075546725,-0.06958250497017898,-0.06858846918489071,-0.06759443339960244,-0.06660039761431417,-0.0656063618290259,-0.06461232604373764,-0.06361829025844937,-0.06262425447316108,-0.061630218687872815,-0.060636182902584546,-0.05964214711729627,-0.058648111332008,-0.05765407554671973,-0.05666003976143146,-0.05566600397614319,-0.054671968190854923,-0.05367793240556665,-0.05268389662027838,-0.05168986083499011,-0.05069582504970184,-0.04970178926441357,-0.0487077534791253,-0.047713717693837025,-0.046719681908548756,-0.045725646123260494,-0.044731610337972225,-0.043737574552683955,-0.04274353876739568,-0.04174950298210741,-0.04075546719681914,-0.03976143141153087,-0.0387673956262426,-0.03777335984095433,-0.03677932405566606,-0.03578528827037779,-0.03479125248508952,-0.03379721669980125,-0.03280318091451298,-0.03180914512922471,-0.030815109343936435,-0.029821073558648166,-0.028827037773359893,-0.027833001988071624,-0.026838966202783355,-0.025844930417495082,-0.024850894632206813,-0.02385685884691854,-0.02286282306163027,-0.021868787276342002,-0.02087475149105373,-0.01988071570576546,-0.01888667992047719,-0.01789264413518892,-0.01689860834990065,-0.01590457256461238,-0.01491053677932411,-0.01391650099403584,-0.012922465208747569,-0.0119284294234593,-0.010934393638171029,-0.009940357852882758,-0.008946322067594489,-0.007952286282306218,-0.006958250497017948,-0.005964214711729677,-0.0049701789264414075,-0.0039761431411531375,-0.002982107355864866,-0.0019880715705765965,-0.0009940357852883258,-5.551115123125783e-17]}
},{}],54:[function(require,module,exports){
module.exports={"expected":[1.0,1.0006892505260019,1.0013789761182914,1.0020691771043082,1.0027598538117175,1.0034510065684108,1.0041426357025052,1.0048347415423442,1.005527324416497,1.0062203846537605,1.006913922583157,1.007607938533936,1.008302432835574,1.008997405817775,1.0096928578104696,1.0103887891438157,1.0110852001481994,1.0117820911542343,1.0124794624927618,1.0131773144948508,1.0138756474917996,1.0145744618151338,1.015273757796608,1.0159735357682051,1.0166737960621375,1.0173745390108457,1.0180757649469998,1.0187774742034992,1.019479667113473,1.020182344010279,1.020885505227506,1.0215891510989716,1.0222932819587245,1.0229978981410428,1.0237029999804352,1.0244085878116416,1.0251146619696316,1.0258212227896064,1.026528270606998,1.0272358057574698,1.027943828576916,1.028652339401463,1.0293613385674685,1.0300708264115221,1.0307808032704455,1.0314912694812923,1.0322022253813485,1.032913671308133,1.0336256075993966,1.0343380345931235,1.0350509526275307,1.035764362041068,1.0364782631724188,1.0371926563604998,1.0379075419444617,1.038622920263688,1.0393387916577974,1.0400551564666418,1.0407720150303073,1.041489367689115,1.04220721478362,1.0429255566546127,1.0436443936431177,1.044363726090395,1.0450835543379402,1.0458038787274835,1.0465246996009914,1.0472460173006652,1.0479678321689432,1.0486901445484986,1.0494129547822415,1.0501362632133184,1.0508600701851118,1.0515843760412413,1.0523091811255632,1.0530344857821705,1.053760290355394,1.0544865951898015,1.0552134006301979,1.0559407070216265,1.056668514709368,1.057396824038941,1.0581256353561026,1.0588549490068477,1.0595847653374104,1.0603150846942628,1.061045907424116,1.0617772338739204,1.0625090643908648,1.063241399322378,1.0639742390161278,1.0647075838200222,1.0654414340822083,1.0661757901510736,1.0669106523752458,1.0676460211035923,1.0683818966852219,1.0691182794694831,1.0698551698059655,1.0705925680445003,1.0713304745351586,1.0720688896282538,1.0728078136743404,1.0735472470242142,1.0742871900289135,1.075027643039718,1.0757686064081498,1.0765100804859729,1.0772520656251943,1.0779945621780629,1.0787375704970714,1.0794810909349544,1.0802251238446905,1.0809696695795008,1.0817147284928506,1.0824603009384484,1.0832063872702462,1.083952987842441,1.0847001030094725,1.0854477331260262,1.086195878547031,1.0869445396276605,1.0876937167233336,1.0884434101897142,1.0891936203827108,1.0899443476584774,1.0906955923734138,1.091447354884165,1.0921996355476224,1.0929524347209227,1.093705752761449,1.0944595900268312,1.0952139468749449,1.0959688236639131,1.096724220752105,1.0974801384981376,1.098236577260874,1.0989935373994255,1.0997510192731508,1.100509023241656,1.101267549664795,1.1020265989026703,1.102786171315632,1.1035462672642788,1.1043068871094581,1.1050680312122658,1.105829699934047,1.106591893636395,1.107354612681153,1.1081178574304142,1.1088816282465204,1.109645925492063,1.1104107495298843,1.1111761007230758,1.11194197943498,1.112708386029189,1.1134753208695465,1.114242784320146,1.1150107767453323,1.115779298509702,1.1165483499781017,1.1173179315156305,1.118088043487639,1.1188586862597294,1.1196298601977557,1.1204015656678243,1.1211738030362943,1.1219465726697766,1.1227198749351353,1.123493710199487,1.1242680788302017,1.1250429811949025,1.1258184176614658,1.1265943885980216,1.1273708943729537,1.1281479353548993,1.1289255119127508,1.1297036244156535,1.1304822732330082,1.1312614587344698,1.1320411812899482,1.1328214412696083,1.1336022390438694,1.1343835749834073,1.1351654494591525,1.1359478628422914,1.1367308155042661,1.137514307816775,1.1382983401517723,1.1390829128814692,1.1398680263783325,1.1406536810150865,1.141439877164712,1.1422266152004474,1.1430138954957876,1.1438017184244855,1.1445900843605514,1.1453789936782535,1.1461684467521178,1.1469584439569285,1.147748985667728,1.1485400722598176,1.149331704108757,1.1501238815903645,1.150916605080718,1.1517098749561543,1.1525036915932694,1.1532980553689192,1.154092966660219,1.1548884258445447,1.1556844332995315,1.1564809894030754,1.1572780945333327,1.1580757490687201,1.1588739533879158,1.1596727078698583,1.1604720128937476,1.161271868839045,1.1620722760854736,1.1628732350130178,1.1636747460019239,1.164476809432701,1.1652794256861194,1.1660825951432128,1.1668863181852769,1.1676905951938703,1.1684954265508152,1.169300812638196,1.1701067538383616,1.170913250533923,1.171720303107756,1.172527911943,1.1733360774230588,1.1741447999315995,1.1749540798525548,1.175763917570121,1.1765743134687605,1.177385267933199,1.1781967813484289,1.179008854099707,1.179821486572556,1.1806346791527647,1.1814484322263867,1.1822627461797428,1.1830776213994196,1.1838930582722702,1.1847090571854144,1.1855256185262386,1.1863427426823965,1.1871604300418088,1.1879786809926638,1.188797495923417,1.189616875222792,1.19043681927978,1.1912573284836405,1.1920784032239016,1.192900043890359,1.1937222508730783,1.1945450245623925,1.1953683653489051,1.196192273623488,1.1970167497772823,1.1978417942016992,1.1986674072884198,1.1994935894293948,1.2003203410168448,1.2011476624432615,1.2019755541014063,1.2028040163843121,1.2036330496852823,1.2044626543978911,1.2052928309159845,1.2061235796336796,1.2069549009453655,1.2077867952457024,1.2086192629296237,1.209452304392334,1.2102859200293106,1.2111201102363034,1.2119548754093352,1.2127902159447017,1.2136261322389716,1.214462624688987,1.2152996936918634,1.2161373396449904,1.2169755629460313,1.2178143639929233,1.218653743183878,1.2194937009173816,1.220334237592195,1.2211753536073535,1.2220170493621678,1.222859325256224,1.2237021816893832,1.2245456190617823,1.2253896377738338,1.2262342382262268,1.2270794208199256,1.227925185956172,1.228771534036483,1.2296184654626539,1.2304659806367557,1.231314079961137,1.2321627638384238,1.2330120326715193,1.2338618868636049,1.2347123268181392,1.2355633529388597,1.2364149656297814,1.2372671652951983,1.2381199523396829,1.2389733271680865,1.2398272901855394,1.2406818417974512,1.241536982409511,1.2423927124276877,1.2432490322582292,1.2441059423076646,1.2449634429828023,1.2458215346907313,1.2466802178388212,1.2475394928347228,1.2483993600863672,1.2492598200019673,1.2501208729900166,1.250982519459291,1.2518447598188474,1.2527075944780253,1.2535710238464457,1.2544350483340125,1.2552996683509121,1.256164884307613,1.257030696614867,1.2578971056837094,1.258764111925458,1.259631715751715,1.2604999175743654,1.261368717805579,1.2622381168578087,1.2631081151437926,1.2639787130765527,1.264849911069396,1.265721709535914,1.2665941088899837,1.2674671095457668,1.2683407119177115,1.2692149164205502,1.2700897234693025,1.2709651334792733,1.271841146866054,1.2727177640455223,1.2735949854338426,1.2744728114474662,1.2753512425031315,1.276230279017864,1.2771099214089765,1.27799017009407,1.2788710254910325,1.2797524880180406,1.2806345580935594,1.2815172361363416,1.282400522565429,1.2832844178001523,1.2841689222601311,1.285054036365274,1.2859397605357796,1.2868260951921358,1.2877130407551198,1.2886005976457997,1.2894887662855334,1.2903775470959693,1.2912669404990462,1.292156946916994,1.2930475667723336,1.293938800487877,1.2948306484867274,1.2957231111922802,1.2966161890282222,1.2975098824185325,1.298404191787482,1.2992991175596347,1.3001946601598464,1.3010908200132665,1.3019875975453368,1.302884993181793,1.3037830073486634,1.3046816404722708,1.3055808929792314,1.3064807652964552,1.3073812578511472,1.308282371070806,1.3091841053832256,1.3100864612164942,1.3109894389989958,1.3118930391594086,1.3127972621267074,1.313702108330162,1.3146075781993385,1.3155136721640985,1.3164203906546001,1.3173277341012986,1.3182357029349447,1.319144297586587,1.320053518487571,1.3209633660695392,1.3218738407644317,1.322784943004487,1.32369667322224,1.3246090318505255,1.3255220193224753,1.3264356360715204,1.3273498825313903,1.3282647591361136,1.3291802663200178,1.3300964045177301,1.3310131741641773,1.3319305756945854,1.332848609544481,1.3337672761496904,1.3346865759463407,1.3356065093708593,1.3365270768599746,1.3374482788507163,1.3383701157804142,1.339292588086701,1.3402156962075102,1.3411394405810773,1.3420638216459397,1.3429888398409373,1.3439144956052123,1.3448407893782097,1.3457677215996775,1.3466952927096665,1.3476235031485309,1.3485523533569284,1.3494818437758207,1.3504119748464731,1.3513427470104553,1.3522741607096411,1.353206216386209,1.3541389144826421,1.355072255441729,1.3560062397065629,1.3569408677205423,1.3578761399273722,1.3588120567710624,1.3597486186959298,1.3606858261465962,1.361623679567991,1.36256217940535,1.3635013261042153,1.364441120110437,1.3653815618701717,1.3663226518298839,1.367264390436346,1.3682067781366378,1.3691498153781478,1.3700935026085725,1.3710378402759174,1.3719828288284959,1.3729284687149317,1.3738747603841563,1.3748217042854118,1.3757693008682492,1.37671755058253,1.3776664538784251,1.3786160112064159,1.3795662230172945,1.3805170897621637,1.3814686118924369,1.3824207898598386,1.3833736241164054,1.384327115114485,1.3852812633067362,1.3862360691461308,1.3871915330859526,1.3881476555797976,1.3891044370815742,1.3900618780455043,1.3910199789261222,1.3919787401782762,1.3929381622571275,1.3938982456181512,1.3948589907171367,1.3958203980101869,1.3967824679537197,1.3977452010044669,1.398708597619476,1.3996726582561085,1.400637383372042,1.401602773425269,1.402568828874098,1.4035355501771534,1.4045029377933753,1.4054709921820205,1.4064397138026623,1.4074091031151907,1.4083791605798128,1.4093498866570524,1.4103212818077515,1.4112933464930693,1.4122660811744825,1.4132394863137867,1.4142135623730951,1.4151883098148397,1.4161637291017712,1.4171398206969594,1.4181165850637931,1.4190940226659803,1.4200721339675488,1.4210509194328467,1.4220303795265412,1.4230105147136205,1.4239913254593932,1.424972812229488,1.4259549754898557,1.4269378157067671,1.4279213333468148,1.4289055288769135,1.429890402764299,1.4308759554765293,1.431862187481485,1.4328490992473686,1.4338366912427063,1.4348249639363462,1.4358139177974598,1.4368035532955425,1.4377938709004128,1.4387848710822133,1.4397765543114103,1.4407689210587946,1.4417619717954815,1.4427557069929111,1.4437501271228481,1.4447452326573829,1.4457410240689306,1.4467375018302326,1.4477346664143558,1.448732518294693,1.4497310579449638,1.4507302858392135,1.451730202451815,1.4527308082574677,1.4537321037311983,1.454734089348361,1.4557367655846372,1.4567401329160368,1.4577441918188971,1.4587489427698843,1.4597543862459934,1.4607605227245468,1.4617673526831976,1.4627748765999269,1.4637830949530457,1.4647920082211947,1.4658016168833445,1.4668119214187958,1.4678229223071795,1.4688346200284572,1.4698470150629217,1.470860107891196,1.4718738989942353,1.4728883888533255,1.4739035779500846,1.474919466766463,1.475936055784742,1.4769533454875368,1.4779713363577944,1.4789900288787947,1.480009423534151,1.4810295208078097,1.4820503211840508,1.4830718251474881,1.4840940331830696,1.4851169457760771,1.4861405634121276,1.4871648865771723,1.4881899157574972,1.4892156514397237,1.4902420941108088,1.4912692442580449,1.49229710236906,1.4933256689318188,1.4943549444346222,1.4953849293661075,1.4964156242152484,1.497447029471356,1.4984791456240791,1.4995119731634035,1.5005455125796523,1.5015797643634878,1.502614729005909,1.5036504069982544,1.504686798832201,1.5057239049997642,1.5067617259932988,1.5078002623054994,1.5088395144293991,1.509879482858372,1.5109201680861315,1.5119615706067318,1.5130036909145672,1.5140465295043728,1.515090086871225,1.516134363510541,1.5171793599180803,1.5182250765899432,1.5192715140225719,1.5203186727127516,1.5213665531576095,1.5224151558546148,1.523464481301581,1.5245145299966634,1.5255653024383609,1.5266167991255168,1.5276690205573173,1.5287219672332935,1.5297756396533195,1.5308300383176154,1.5318851637267454,1.5329410163816184,1.5339975967834893,1.535054905433958,1.53611294283497,1.5371717094888175,1.5382312058981378,1.5392914325659155,1.5403523899954819,1.5414140786905144,1.5424764991550386,1.5435396518934268,1.544603537410399,1.5456681562110235,1.5467335088007164,1.547799595685242,1.5488664173707136,1.549933974363593,1.5510022671706913,1.5520712962991687,1.5531410622565354,1.5542115655506508,1.5552828066897249,1.5563547861823175,1.5574275045373391,1.558500962264051,1.5595751598720662,1.5606500978713473,1.5617257767722101,1.5628021970853212,1.563879359321699,1.5649572639927152,1.5660359116100924,1.5671153026859075,1.5681954377325895,1.5692763172629203,1.5703579417900362,1.571440311827426,1.5725234278889337,1.5736072904887566,1.5746919001414463,1.5757772573619098,1.576863362665408,1.5779502165675583,1.5790378195843324,1.5801261722320576,1.581215275027418,1.582305128487453,1.5833957331295583,1.584487089471487,1.5855791980313483,1.5866720593276091,1.5877656738790933,1.5888600422049821,1.5899551648248154,1.5910510422584903,1.5921476750262626,1.5932450636487472,1.594343208646917,1.5954421105421044,1.5965417698560012,1.5976421871106583,1.598743362828487,1.5998452975322586,1.6009479917451044,1.6020514459905164,1.6031556607923474,1.6042606366748116,1.6053663741624837,1.606472873780301,1.6075801360535618,1.6086881615079267,1.6097969506694192,1.6109065040644244,1.6120168222196904,1.6131279056623293,1.6142397549198153,1.615352370519987,1.6164657529910462,1.6175799028615594,1.6186948206604568,1.6198105069170337,1.6209269621609494,1.6220441869222295,1.623162181731264,1.6242809471188087,1.6254004836159852,1.626520791754281,1.6276418720655508,1.6287637250820146,1.62988635133626,1.631009751361242,1.6321339256902818,1.6332588748570696,1.634384599395662,1.6355110998404847,1.6366383767263317,1.6377664305883652,1.6388952619621167,1.640024871383486,1.641155259388743,1.6422864265145276,1.6434183732978485,1.644551100276085,1.6456846079869873,1.6468188969686757,1.647953967759641,1.6490898208987463,1.6502264569252252,1.651363876378683,1.6525020797990975,1.6536410677268183,1.6547808407025673,1.6559213992674393,1.6570627439629022,1.6582048753307967,1.6593477939133374,1.6604915002531122,1.6616359948930834,1.6627812783765872,1.6639273512473343,1.6650742140494104,1.6662218673272762,1.6673703116257672,1.6685195474900953,1.6696695754658473,1.6708203960989865,1.6719720099358524,1.673124417523161,1.6742776194080053,1.6754316161378555,1.6765864082605588,1.67774199632434,1.678898380877802,1.6800555624699256,1.6812135416500704,1.6823723189679742,1.683531894973754,1.6846922702179055,1.6858534452513045,1.6870154206252062,1.6881781968912453,1.6893417746014376,1.6905061543081785,1.6916713365642448,1.6928373219227941,1.694004110937365,1.695171704161878,1.696340102150635,1.6975093054583204,1.6986793146400005,1.6998501302511246,1.7010217528475247,1.7021941829854155,1.7033674212213954,1.704541468112447,1.7057163242159354,1.7068919900896111,1.7080684662916088,1.7092457533804475,1.7104238519150314,1.7116027624546502,1.7127824855589782,1.7139630217880766,1.7151443717023918,1.7163265358627569,1.7175095148303912,1.7186933091669012,1.7198779194342806,1.7210633461949096,1.7222495900115569,1.7234366514473791,1.72462453106592,1.7258132294311128,1.7270027471072793,1.7281930846591298,1.7293842426517638,1.730576221650671,1.73176902222173,1.73296264493121,1.7341570903457706,1.7353523590324613,1.736548451558723,1.7377453684923876,1.7389431104016784,1.74014167785521,1.7413410714219895,1.7425412916714158,1.7437423391732803,1.7449442144977674,1.7461469182154539,1.7473504508973103,1.7485548131147008,1.7497600054393834,1.7509660284435096,1.7521728826996257,1.7533805687806725,1.754589087259986,1.7557984387112973,1.7570086237087321,1.7582196428268133,1.7594314966404585,1.7606441857249824,1.7618577106560953,1.7630720720099056,1.7642872703629175,1.7655033062920336,1.7667201803745536,1.7679378931881748,1.7691564453109934,1.7703758373215037,1.7715960697985984,1.77281714332157,1.7740390584701096,1.7752618158243079,1.776485415964656,1.7777098594720442,1.778935146927764,1.7801612789135073,1.7813882560113665,1.782616078803836,1.783844747873811,1.7850742638045887,1.7863046271798684,1.7875358385837516,1.788767898600743,1.7900008078157488,1.7912345668140794,1.7924691761814489,1.793704636503974,1.7949409483681764,1.7961781123609815,1.7974161290697193,1.798654999082125,1.7998947229863382,1.8011353013709044,1.802376734824775,1.8036190239373064,1.8048621692982623,1.806106171497812,1.8073510311265322,1.8085967487754062,1.8098433250358248,1.8110907604995867,1.8123390557588983,1.813588211406374,1.8148382280350366,1.816089106238318,1.817340846610059,1.8185934497445098,1.8198469162363298,1.8211012466805885,1.8223564416727658,1.8236125018087517,1.824869427684847,1.8261272198977634,1.8273858790446242,1.8286454057229642,1.8299058005307298,1.8311670640662796,1.8324291969283844,1.8336921997162285,1.8349560730294086,1.8362208174679344,1.8374864336322299,1.838752922123132,1.8400202835418928,1.8412885184901784,1.8425576275700688,1.8438276113840604,1.8450984705350637,1.846370205626405,1.8476428172618273,1.8489163060454887,1.850190672581964,1.851465917476245,1.8527420413337399,1.8540190447602751,1.8552969283620935,1.8565756927458568,1.8578553385186443,1.8591358662879536,1.8604172766617015,1.8616995702482235,1.8629827476562746,1.8642668094950292,1.8655517563740813,1.8668375889034459,1.8681243076935579,1.8694119133552725,1.870700406499867,1.8719897877390388,1.873280057684908,1.8745712169500162,1.875863266147327,1.8771562058902267,1.878450036792524,1.8797447594684515,1.8810403745326645,1.882336882600242,1.8836342842866869,1.8849325802079266,1.8862317709803131,1.8875318572206228,1.8888328395460574,1.890134718574244,1.8914374949232358,1.8927411692115113,1.894045742057976,1.8953512140819608,1.896657585903225,1.8979648581419544,1.8992730314187618,1.9005821063546884,1.9018920835712032,1.9032029636902033,1.9045147473340152,1.9058274351253934,1.9071410276875225,1.9084555256440159,1.9097709296189171,1.9110872402367003,1.9124044581222688,1.913722583900958,1.9150416181985335,1.9163615616411922,1.9176824148555631,1.9190041784687069,1.9203268531081161,1.9216504394017166,1.922974937977866,1.9243003494653554,1.9256266744934103,1.926953913691688,1.9282820676902814,1.9296111371197169,1.9309411226109559,1.9322720247953942,1.933603844304863,1.9349365817716293,1.9362702378283958,1.9376048131083008,1.9389403082449195,1.9402767238722636,1.9416140606247816,1.9429523191373599,1.944291500045322,1.9456316039844292,1.9469726315908813,1.9483145835013165,1.949657460352812,1.9510012627828837,1.9523459914294872,1.9536916469310175,1.9550382299263103,1.9563857410546408,1.9577341809557252,1.9590835502697208,1.960433849637226,1.9617850796992802,1.9631372410973655,1.964490334473406,1.965844360469767,1.967199319729259,1.9685552128951327,1.9699120406110846,1.9712698035212532,1.9726285022702217,1.973988137503018,1.9753487098651132,1.976710220002425,1.9780726685613148,1.9794360561885906,1.9808003835315058,1.9821656512377597,1.983531859955498,1.984899010333314,1.9862671030202468,1.9876361386657837,1.9890061179198595,1.9903770414328565,1.9917489098556063,1.993121723839388,1.99449548403593,1.9958701910974102,1.9972458456764555,1.9986224484261432,2.0],"x":[5.551115123125783e-17,0.0009940357852883258,0.0019880715705765965,0.002982107355864866,0.0039761431411531375,0.0049701789264414075,0.005964214711729677,0.006958250497017948,0.007952286282306218,0.008946322067594489,0.009940357852882758,0.010934393638171029,0.0119284294234593,0.012922465208747569,0.01391650099403584,0.01491053677932411,0.01590457256461238,0.01689860834990065,0.01789264413518892,0.01888667992047719,0.01988071570576546,0.02087475149105373,0.021868787276342002,0.02286282306163027,0.02385685884691854,0.024850894632206813,0.025844930417495082,0.026838966202783355,0.027833001988071624,0.028827037773359893,0.029821073558648166,0.030815109343936435,0.03180914512922471,0.03280318091451298,0.03379721669980125,0.03479125248508952,0.03578528827037779,0.03677932405566606,0.03777335984095433,0.0387673956262426,0.03976143141153087,0.04075546719681914,0.04174950298210741,0.04274353876739568,0.043737574552683955,0.044731610337972225,0.045725646123260494,0.046719681908548756,0.047713717693837025,0.0487077534791253,0.04970178926441357,0.05069582504970184,0.05168986083499011,0.05268389662027838,0.05367793240556665,0.054671968190854923,0.05566600397614319,0.05666003976143146,0.05765407554671973,0.058648111332008,0.05964214711729627,0.060636182902584546,0.061630218687872815,0.06262425447316108,0.06361829025844937,0.06461232604373764,0.0656063618290259,0.06660039761431417,0.06759443339960244,0.06858846918489071,0.06958250497017898,0.07057654075546725,0.07157057654075552,0.07256461232604379,0.07355864811133206,0.07455268389662033,0.07554671968190861,0.07654075546719688,0.07753479125248515,0.07852882703777342,0.07952286282306169,0.08051689860834996,0.08151093439363823,0.0825049701789265,0.08349900596421476,0.08449304174950303,0.0854870775347913,0.08648111332007959,0.08747514910536786,0.08846918489065612,0.0894632206759444,0.09045725646123266,0.09145129224652093,0.0924453280318092,0.09343936381709747,0.09443339960238574,0.09542743538767401,0.09642147117296228,0.09741550695825055,0.09840954274353883,0.0994035785288271,0.10039761431411537,0.10139165009940364,0.10238568588469191,0.10337972166998018,0.10437375745526845,0.10536779324055671,0.10636182902584498,0.10735586481113325,0.10834990059642152,0.10934393638170979,0.11033797216699806,0.11133200795228633,0.1123260437375746,0.11332007952286287,0.11431411530815114,0.1153081510934394,0.11630218687872768,0.11729622266401594,0.11829025844930421,0.11928429423459248,0.12027833001988075,0.12127236580516902,0.1222664015904573,0.12326043737574557,0.12425447316103384,0.1252485089463221,0.12624254473161037,0.12723658051689868,0.12823061630218693,0.12922465208747522,0.13021868787276347,0.13121272365805176,0.13220675944334,0.1332007952286283,0.13419483101391655,0.13518886679920483,0.1361829025844931,0.13717693836978137,0.13817097415506963,0.1391650099403579,0.1401590457256462,0.14115308151093445,0.14214711729622273,0.14314115308151099,0.14413518886679927,0.14512922465208752,0.1461232604373758,0.14711729622266406,0.14811133200795235,0.1491053677932406,0.15009940357852888,0.15109343936381717,0.15208747514910542,0.1530815109343937,0.15407554671968196,0.15506958250497024,0.1560636182902585,0.15705765407554678,0.15805168986083504,0.15904572564612332,0.16003976143141158,0.16103379721669986,0.16202783300198814,0.1630218687872764,0.16401590457256468,0.16500994035785294,0.16600397614314122,0.16699801192842947,0.16799204771371776,0.168986083499006,0.1699801192842943,0.17097415506958255,0.17196819085487083,0.1729622266401591,0.17395626242544737,0.17495029821073566,0.1759443339960239,0.1769383697813122,0.17793240556660045,0.17892644135188873,0.179920477137177,0.18091451292246527,0.18190854870775353,0.1829025844930418,0.18389662027833006,0.18489065606361835,0.18588469184890663,0.18687872763419489,0.18787276341948317,0.18886679920477142,0.1898608349900597,0.19085487077534796,0.19184890656063625,0.1928429423459245,0.19383697813121278,0.19483101391650104,0.19582504970178932,0.19681908548707758,0.19781312127236586,0.19880715705765414,0.1998011928429424,0.20079522862823068,0.20178926441351894,0.20278330019880722,0.20377733598409548,0.20477137176938376,0.20576540755467201,0.2067594433399603,0.20775347912524855,0.20874751491053684,0.20974155069582512,0.21073558648111337,0.21172962226640166,0.2127236580516899,0.2137176938369782,0.21471172962226645,0.21570576540755473,0.216699801192843,0.21769383697813127,0.21868787276341953,0.2196819085487078,0.2206759443339961,0.22166998011928435,0.22266401590457263,0.2236580516898609,0.22465208747514917,0.22564612326043743,0.2266401590457257,0.22763419483101396,0.22862823061630225,0.2296222664015905,0.23061630218687879,0.23161033797216704,0.23260437375745532,0.2335984095427436,0.23459244532803186,0.23558648111332015,0.2365805168986084,0.23757455268389666,0.2385685884691849,0.2395626242544732,0.24055666003976145,0.24155069582504973,0.242544731610338,0.24353876739562627,0.24453280318091455,0.2455268389662028,0.2465208747514911,0.24751491053677935,0.24850894632206763,0.2495029821073559,0.25049701789264417,0.25149105367793245,0.2524850894632207,0.25347912524850896,0.25447316103379725,0.25546719681908553,0.2564612326043738,0.2574552683896621,0.2584493041749504,0.2594433399602386,0.2604373757455269,0.26143141153081517,0.26242544731610346,0.2634194831013917,0.26441351888667997,0.26540755467196825,0.26640159045725653,0.2673956262425448,0.26838966202783304,0.2693836978131213,0.2703777335984096,0.2713717693836979,0.2723658051689861,0.2733598409542744,0.2743538767395627,0.27534791252485097,0.2763419483101392,0.2773359840954275,0.27833001988071576,0.27932405566600405,0.28031809145129233,0.28131212723658056,0.28230616302186884,0.2833001988071571,0.2842942345924454,0.28528827037773363,0.2862823061630219,0.2872763419483102,0.2882703777335985,0.2892644135188867,0.290258449304175,0.2912524850894633,0.29224652087475156,0.29324055666003984,0.29423459244532807,0.29522862823061635,0.29622266401590464,0.2972166998011929,0.29821073558648115,0.29920477137176943,0.3001988071570577,0.301192842942346,0.3021868787276343,0.3031809145129225,0.3041749502982108,0.30516898608349907,0.30616302186878736,0.3071570576540756,0.30815109343936387,0.30914512922465215,0.31013916500994043,0.31113320079522866,0.31212723658051694,0.3131212723658052,0.3141153081510935,0.3151093439363818,0.31610337972167,0.3170974155069583,0.3180914512922466,0.31908548707753487,0.3200795228628231,0.3210735586481114,0.32206759443339966,0.32306163021868795,0.3240556660039762,0.32504970178926446,0.32604373757455274,0.327037773359841,0.3280318091451293,0.32902584493041753,0.3300198807157058,0.3310139165009941,0.3320079522862824,0.3330019880715706,0.3339960238568589,0.3349900596421472,0.33598409542743546,0.33697813121272374,0.33797216699801197,0.33896620278330025,0.33996023856858854,0.3409542743538768,0.34194831013916505,0.34294234592445333,0.3439363817097416,0.3449304174950299,0.3459244532803181,0.3469184890656064,0.3479125248508947,0.34890656063618297,0.34990059642147125,0.3508946322067595,0.35188866799204777,0.35288270377733605,0.35387673956262433,0.35487077534791256,0.35586481113320084,0.3568588469184891,0.3578528827037774,0.35884691848906564,0.3598409542743539,0.3608349900596422,0.3618290258449305,0.36282306163021877,0.363817097415507,0.3648111332007953,0.36580516898608356,0.36679920477137185,0.3677932405566601,0.36878727634194836,0.36978131212723664,0.3707753479125249,0.3717693836978132,0.37276341948310143,0.3737574552683897,0.374751491053678,0.3757455268389663,0.3767395626242545,0.3777335984095428,0.3787276341948311,0.37972166998011936,0.3807157057654076,0.38170974155069587,0.38270377733598415,0.38369781312127244,0.3846918489065607,0.38568588469184895,0.38667992047713723,0.3876739562624255,0.3886679920477138,0.389662027833002,0.3906560636182903,0.3916500994035786,0.39264413518886687,0.3936381709741551,0.3946322067594434,0.39562624254473167,0.39662027833001995,0.39761431411530823,0.39860834990059646,0.39960238568588474,0.400596421471173,0.4015904572564613,0.40258449304174954,0.4035785288270378,0.4045725646123261,0.4055666003976144,0.40656063618290267,0.4075546719681909,0.4085487077534792,0.40954274353876746,0.41053677932405575,0.411530815109344,0.41252485089463226,0.41351888667992054,0.4145129224652088,0.41550695825049705,0.41650099403578533,0.4174950298210736,0.4184890656063619,0.4194831013916502,0.4204771371769384,0.4214711729622267,0.422465208747515,0.42345924453280326,0.4244532803180915,0.42544731610337977,0.42644135188866805,0.42743538767395634,0.42842942345924456,0.42942345924453285,0.43041749502982113,0.4314115308151094,0.4324055666003977,0.4333996023856859,0.4343936381709742,0.4353876739562625,0.43638170974155077,0.437375745526839,0.4383697813121273,0.43936381709741557,0.44035785288270385,0.44135188866799213,0.44234592445328036,0.44333996023856864,0.4443339960238569,0.4453280318091452,0.44632206759443344,0.4473161033797217,0.44831013916501,0.4493041749502983,0.4502982107355865,0.4512922465208748,0.4522862823061631,0.45328031809145136,0.45427435387673964,0.4552683896620279,0.45626242544731616,0.45725646123260444,0.4582504970178927,0.45924453280318095,0.46023856858846923,0.4612326043737575,0.4622266401590458,0.463220675944334,0.4642147117296223,0.4652087475149106,0.4662027833001989,0.46719681908548716,0.4681908548707754,0.46918489065606367,0.47017892644135195,0.47117296222664024,0.47216699801192846,0.47316103379721675,0.47415506958250503,0.4751491053677933,0.4761431411530816,0.4771371769383698,0.4781312127236581,0.4791252485089464,0.48011928429423467,0.4811133200795229,0.4821073558648112,0.48310139165009947,0.48409542743538775,0.485089463220676,0.48608349900596426,0.48707753479125254,0.4880715705765408,0.4890656063618291,0.49005964214711734,0.49105367793240556,0.49204771371769385,0.49304174950298213,0.49403578528827036,0.49502982107355864,0.4960238568588469,0.4970178926441352,0.49801192842942343,0.4990059642147117,0.5,0.5009940357852882,0.5019880715705766,0.5029821073558648,0.5039761431411531,0.5049701789264414,0.5059642147117296,0.5069582504970179,0.5079522862823062,0.5089463220675944,0.5099403578528827,0.510934393638171,0.5119284294234593,0.5129224652087475,0.5139165009940357,0.5149105367793241,0.5159045725646123,0.5168986083499006,0.5178926441351889,0.5188866799204771,0.5198807157057654,0.5208747514910537,0.5218687872763419,0.5228628230616302,0.5238568588469185,0.5248508946322068,0.525844930417495,0.5268389662027833,0.5278330019880716,0.5288270377733598,0.5298210735586482,0.5308151093439364,0.5318091451292246,0.532803180914513,0.5337972166998012,0.5347912524850894,0.5357852882703777,0.536779324055666,0.5377733598409543,0.5387673956262425,0.5397614314115308,0.5407554671968191,0.5417495029821073,0.5427435387673957,0.5437375745526839,0.5447316103379721,0.5457256461232605,0.5467196819085487,0.547713717693837,0.5487077534791253,0.5497017892644135,0.5506958250497018,0.55168986083499,0.5526838966202783,0.5536779324055666,0.5546719681908548,0.5556660039761432,0.5566600397614314,0.5576540755467196,0.558648111332008,0.5596421471172962,0.5606361829025845,0.5616302186878728,0.562624254473161,0.5636182902584493,0.5646123260437376,0.5656063618290258,0.5666003976143141,0.5675944333996024,0.5685884691848907,0.5695825049701789,0.5705765407554672,0.5715705765407555,0.5725646123260437,0.5735586481113321,0.5745526838966203,0.5755467196819085,0.5765407554671969,0.5775347912524851,0.5785288270377733,0.5795228628230616,0.5805168986083499,0.5815109343936382,0.5825049701789264,0.5834990059642147,0.584493041749503,0.5854870775347912,0.5864811133200796,0.5874751491053678,0.588469184890656,0.5894632206759444,0.5904572564612326,0.5914512922465208,0.5924453280318092,0.5934393638170974,0.5944333996023857,0.595427435387674,0.5964214711729622,0.5974155069582505,0.5984095427435387,0.5994035785288271,0.6003976143141153,0.6013916500994035,0.6023856858846919,0.6033797216699801,0.6043737574552683,0.6053677932405567,0.6063618290258449,0.6073558648111332,0.6083499005964215,0.6093439363817097,0.610337972166998,0.6113320079522863,0.6123260437375746,0.6133200795228628,0.614314115308151,0.6153081510934394,0.6163021868787276,0.617296222664016,0.6182902584493042,0.6192842942345924,0.6202783300198808,0.621272365805169,0.6222664015904572,0.6232604373757455,0.6242544731610338,0.6252485089463221,0.6262425447316103,0.6272365805168986,0.6282306163021869,0.6292246520874751,0.6302186878727635,0.6312127236580517,0.6322067594433399,0.6332007952286283,0.6341948310139165,0.6351888667992047,0.6361829025844931,0.6371769383697813,0.6381709741550696,0.6391650099403579,0.6401590457256461,0.6411530815109344,0.6421471172962226,0.643141153081511,0.6441351888667992,0.6451292246520874,0.6461232604373758,0.647117296222664,0.6481113320079522,0.6491053677932406,0.6500994035785288,0.6510934393638171,0.6520874751491054,0.6530815109343936,0.6540755467196819,0.6550695825049702,0.6560636182902585,0.6570576540755467,0.658051689860835,0.6590457256461233,0.6600397614314115,0.6610337972166997,0.6620278330019881,0.6630218687872763,0.6640159045725647,0.6650099403578529,0.6660039761431411,0.6669980119284294,0.6679920477137177,0.668986083499006,0.6699801192842942,0.6709741550695825,0.6719681908548708,0.672962226640159,0.6739562624254473,0.6749502982107356,0.6759443339960238,0.6769383697813122,0.6779324055666004,0.6789264413518886,0.679920477137177,0.6809145129224652,0.6819085487077535,0.6829025844930418,0.68389662027833,0.6848906560636183,0.6858846918489065,0.6868787276341949,0.6878727634194831,0.6888667992047713,0.6898608349900597,0.6908548707753479,0.6918489065606361,0.6928429423459245,0.6938369781312127,0.694831013916501,0.6958250497017893,0.6968190854870775,0.6978131212723658,0.6988071570576541,0.6998011928429424,0.7007952286282306,0.7017892644135189,0.7027833001988072,0.7037773359840954,0.7047713717693836,0.705765407554672,0.7067594433399602,0.7077534791252486,0.7087475149105368,0.709741550695825,0.7107355864811133,0.7117296222664016,0.7127236580516899,0.7137176938369781,0.7147117296222664,0.7157057654075547,0.7166998011928429,0.7176938369781312,0.7186878727634195,0.7196819085487077,0.7206759443339961,0.7216699801192843,0.7226640159045725,0.7236580516898609,0.7246520874751491,0.7256461232604374,0.7266401590457257,0.7276341948310139,0.7286282306163022,0.7296222664015904,0.7306163021868787,0.731610337972167,0.7326043737574552,0.7335984095427436,0.7345924453280318,0.73558648111332,0.7365805168986084,0.7375745526838966,0.7385685884691849,0.7395626242544732,0.7405566600397614,0.7415506958250497,0.742544731610338,0.7435387673956262,0.7445328031809145,0.7455268389662028,0.7465208747514911,0.7475149105367793,0.7485089463220675,0.7495029821073559,0.7504970178926441,0.7514910536779325,0.7524850894632207,0.7534791252485089,0.7544731610337972,0.7554671968190855,0.7564612326043738,0.757455268389662,0.7584493041749503,0.7594433399602386,0.7604373757455268,0.7614314115308151,0.7624254473161034,0.7634194831013916,0.76441351888668,0.7654075546719682,0.7664015904572564,0.7673956262425448,0.768389662027833,0.7693836978131213,0.7703777335984096,0.7713717693836978,0.7723658051689861,0.7733598409542743,0.7743538767395626,0.7753479125248509,0.7763419483101391,0.7773359840954275,0.7783300198807157,0.7793240556660039,0.7803180914512923,0.7813121272365805,0.7823061630218688,0.7833001988071571,0.7842942345924453,0.7852882703777336,0.7862823061630219,0.7872763419483101,0.7882703777335984,0.7892644135188867,0.790258449304175,0.7912524850894632,0.7922465208747514,0.7932405566600398,0.794234592445328,0.7952286282306164,0.7962226640159046,0.7972166998011928,0.7982107355864811,0.7992047713717694,0.8001988071570576,0.8011928429423459,0.8021868787276342,0.8031809145129225,0.8041749502982107,0.805168986083499,0.8061630218687873,0.8071570576540755,0.8081510934393639,0.8091451292246521,0.8101391650099403,0.8111332007952287,0.8121272365805169,0.8131212723658051,0.8141153081510935,0.8151093439363817,0.81610337972167,0.8170974155069582,0.8180914512922465,0.8190854870775348,0.820079522862823,0.8210735586481114,0.8220675944333996,0.8230616302186878,0.8240556660039762,0.8250497017892644,0.8260437375745527,0.827037773359841,0.8280318091451292,0.8290258449304175,0.8300198807157058,0.831013916500994,0.8320079522862823,0.8330019880715706,0.8339960238568589,0.8349900596421471,0.8359840954274353,0.8369781312127237,0.8379721669980119,0.8389662027833003,0.8399602385685885,0.8409542743538767,0.841948310139165,0.8429423459244533,0.8439363817097415,0.8449304174950298,0.8459244532803181,0.8469184890656064,0.8479125248508946,0.8489065606361829,0.8499005964214712,0.8508946322067594,0.8518886679920478,0.852882703777336,0.8538767395626242,0.8548707753479126,0.8558648111332008,0.856858846918489,0.8578528827037774,0.8588469184890656,0.8598409542743539,0.8608349900596421,0.8618290258449304,0.8628230616302187,0.8638170974155069,0.8648111332007953,0.8658051689860835,0.8667992047713717,0.8677932405566601,0.8687872763419483,0.8697813121272365,0.8707753479125249,0.8717693836978131,0.8727634194831014,0.8737574552683897,0.8747514910536779,0.8757455268389662,0.8767395626242545,0.8777335984095428,0.878727634194831,0.8797216699801192,0.8807157057654076,0.8817097415506958,0.882703777335984,0.8836978131212724,0.8846918489065606,0.885685884691849,0.8866799204771372,0.8876739562624254,0.8886679920477137,0.889662027833002,0.8906560636182903,0.8916500994035785,0.8926441351888668,0.8936381709741551,0.8946322067594433,0.8956262425447317,0.8966202783300199,0.8976143141153081,0.8986083499005965,0.8996023856858847,0.9005964214711729,0.9015904572564613,0.9025844930417495,0.9035785288270378,0.904572564612326,0.9055666003976143,0.9065606361829026,0.9075546719681908,0.9085487077534792,0.9095427435387674,0.9105367793240556,0.911530815109344,0.9125248508946322,0.9135188866799204,0.9145129224652088,0.915506958250497,0.9165009940357853,0.9174950298210736,0.9184890656063618,0.9194831013916501,0.9204771371769384,0.9214711729622267,0.9224652087475149,0.9234592445328031,0.9244532803180915,0.9254473161033797,0.9264413518886679,0.9274353876739563,0.9284294234592445,0.9294234592445328,0.9304174950298211,0.9314115308151093,0.9324055666003976,0.9333996023856859,0.9343936381709742,0.9353876739562624,0.9363817097415507,0.937375745526839,0.9383697813121272,0.9393638170974155,0.9403578528827038,0.941351888667992,0.9423459244532804,0.9433399602385686,0.9443339960238568,0.9453280318091452,0.9463220675944334,0.9473161033797217,0.94831013916501,0.9493041749502982,0.9502982107355865,0.9512922465208747,0.952286282306163,0.9532803180914513,0.9542743538767395,0.9552683896620279,0.9562624254473161,0.9572564612326043,0.9582504970178927,0.9592445328031809,0.9602385685884692,0.9612326043737575,0.9622266401590457,0.963220675944334,0.9642147117296223,0.9652087475149106,0.9662027833001988,0.967196819085487,0.9681908548707754,0.9691848906560636,0.9701789264413518,0.9711729622266402,0.9721669980119284,0.9731610337972167,0.974155069582505,0.9751491053677932,0.9761431411530815,0.9771371769383698,0.9781312127236581,0.9791252485089463,0.9801192842942346,0.9811133200795229,0.9821073558648111,0.9831013916500994,0.9840954274353877,0.9850894632206759,0.9860834990059643,0.9870775347912525,0.9880715705765407,0.989065606361829,0.9900596421471173,0.9910536779324056,0.9920477137176938,0.9930417495029821,0.9940357852882704,0.9950298210735586,0.9960238568588469,0.9970178926441352,0.9980119284294234,0.9990059642147118,1.0]}
},{}],55:[function(require,module,exports){
module.exports={"expected":[1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0],"x":[-5.551115123125783e-17,-5.540079108964499e-17,-5.529043094803215e-17,-5.5180070806419313e-17,-5.506971066480647e-17,-5.495935052319363e-17,-5.484899038158079e-17,-5.473863023996796e-17,-5.462827009835512e-17,-5.451790995674228e-17,-5.440754981512944e-17,-5.4297189673516605e-17,-5.4186829531903765e-17,-5.4076469390290925e-17,-5.3966109248678085e-17,-5.3855749107065245e-17,-5.374538896545241e-17,-5.363502882383957e-17,-5.352466868222673e-17,-5.341430854061389e-17,-5.330394839900106e-17,-5.319358825738822e-17,-5.308322811577538e-17,-5.297286797416254e-17,-5.28625078325497e-17,-5.2752147690936863e-17,-5.2641787549324023e-17,-5.2531427407711183e-17,-5.2421067266098343e-17,-5.231070712448551e-17,-5.220034698287267e-17,-5.208998684125983e-17,-5.197962669964699e-17,-5.1869266558034155e-17,-5.1758906416421315e-17,-5.1648546274808475e-17,-5.1538186133195635e-17,-5.1427825991582795e-17,-5.131746584996996e-17,-5.120710570835712e-17,-5.109674556674428e-17,-5.098638542513144e-17,-5.087602528351861e-17,-5.076566514190577e-17,-5.065530500029293e-17,-5.054494485868009e-17,-5.0434584717067253e-17,-5.0324224575454413e-17,-5.0213864433841573e-17,-5.0103504292228733e-17,-4.9993144150615893e-17,-4.988278400900306e-17,-4.977242386739022e-17,-4.966206372577738e-17,-4.955170358416454e-17,-4.9441343442551705e-17,-4.9330983300938865e-17,-4.9220623159326025e-17,-4.9110263017713185e-17,-4.8999902876100345e-17,-4.888954273448751e-17,-4.877918259287467e-17,-4.866882245126183e-17,-4.855846230964899e-17,-4.844810216803616e-17,-4.833774202642332e-17,-4.822738188481048e-17,-4.811702174319764e-17,-4.8006661601584803e-17,-4.7896301459971963e-17,-4.7785941318359123e-17,-4.7675581176746283e-17,-4.7565221035133443e-17,-4.745486089352061e-17,-4.734450075190777e-17,-4.723414061029493e-17,-4.712378046868209e-17,-4.7013420327069256e-17,-4.6903060185456416e-17,-4.6792700043843575e-17,-4.6682339902230735e-17,-4.65719797606179e-17,-4.646161961900506e-17,-4.635125947739222e-17,-4.624089933577938e-17,-4.613053919416654e-17,-4.602017905255371e-17,-4.590981891094087e-17,-4.579945876932803e-17,-4.568909862771519e-17,-4.5578738486102354e-17,-4.5468378344489514e-17,-4.5358018202876674e-17,-4.5247658061263834e-17,-4.5137297919650993e-17,-4.502693777803816e-17,-4.491657763642532e-17,-4.480621749481248e-17,-4.469585735319964e-17,-4.4585497211586806e-17,-4.4475137069973966e-17,-4.4364776928361126e-17,-4.4254416786748286e-17,-4.414405664513545e-17,-4.403369650352261e-17,-4.392333636190977e-17,-4.381297622029693e-17,-4.370261607868409e-17,-4.359225593707126e-17,-4.348189579545842e-17,-4.337153565384558e-17,-4.326117551223274e-17,-4.3150815370619904e-17,-4.3040455229007064e-17,-4.2930095087394224e-17,-4.2819734945781384e-17,-4.270937480416855e-17,-4.259901466255571e-17,-4.248865452094287e-17,-4.237829437933003e-17,-4.226793423771719e-17,-4.2157574096104356e-17,-4.2047213954491516e-17,-4.1936853812878676e-17,-4.1826493671265836e-17,-4.1716133529653e-17,-4.160577338804016e-17,-4.149541324642732e-17,-4.138505310481448e-17,-4.127469296320164e-17,-4.116433282158881e-17,-4.105397267997597e-17,-4.094361253836313e-17,-4.083325239675029e-17,-4.0722892255137454e-17,-4.0612532113524614e-17,-4.0502171971911774e-17,-4.0391811830298934e-17,-4.02814516886861e-17,-4.017109154707326e-17,-4.006073140546042e-17,-3.995037126384758e-17,-3.984001112223474e-17,-3.9729650980621906e-17,-3.9619290839009066e-17,-3.9508930697396226e-17,-3.9398570555783386e-17,-3.928821041417055e-17,-3.917785027255771e-17,-3.906749013094487e-17,-3.895712998933203e-17,-3.88467698477192e-17,-3.873640970610636e-17,-3.862604956449352e-17,-3.851568942288068e-17,-3.840532928126784e-17,-3.8294969139655004e-17,-3.8184608998042164e-17,-3.8074248856429324e-17,-3.7963888714816484e-17,-3.785352857320365e-17,-3.774316843159081e-17,-3.763280828997797e-17,-3.752244814836513e-17,-3.741208800675229e-17,-3.7301727865139456e-17,-3.7191367723526616e-17,-3.7081007581913776e-17,-3.6970647440300936e-17,-3.68602872986881e-17,-3.674992715707526e-17,-3.663956701546242e-17,-3.652920687384958e-17,-3.641884673223675e-17,-3.630848659062391e-17,-3.619812644901107e-17,-3.608776630739823e-17,-3.597740616578539e-17,-3.5867046024172554e-17,-3.5756685882559714e-17,-3.5646325740946874e-17,-3.5535965599334034e-17,-3.54256054577212e-17,-3.531524531610836e-17,-3.520488517449552e-17,-3.509452503288268e-17,-3.4984164891269846e-17,-3.4873804749657006e-17,-3.4763444608044166e-17,-3.4653084466431326e-17,-3.4542724324818486e-17,-3.443236418320565e-17,-3.432200404159281e-17,-3.421164389997997e-17,-3.410128375836713e-17,-3.39909236167543e-17,-3.388056347514146e-17,-3.377020333352862e-17,-3.365984319191578e-17,-3.354948305030294e-17,-3.3439122908690104e-17,-3.3328762767077264e-17,-3.3218402625464424e-17,-3.3108042483851584e-17,-3.299768234223875e-17,-3.288732220062591e-17,-3.277696205901307e-17,-3.266660191740023e-17,-3.2556241775787396e-17,-3.2445881634174556e-17,-3.2335521492561716e-17,-3.2225161350948876e-17,-3.2114801209336036e-17,-3.20044410677232e-17,-3.189408092611036e-17,-3.178372078449752e-17,-3.167336064288468e-17,-3.156300050127185e-17,-3.145264035965901e-17,-3.134228021804617e-17,-3.123192007643333e-17,-3.1121559934820494e-17,-3.1011199793207654e-17,-3.0900839651594814e-17,-3.0790479509981974e-17,-3.0680119368369134e-17,-3.05697592267563e-17,-3.045939908514346e-17,-3.034903894353062e-17,-3.023867880191778e-17,-3.0128318660304946e-17,-3.0017958518692106e-17,-2.9907598377079266e-17,-2.9797238235466426e-17,-2.9686878093853586e-17,-2.957651795224075e-17,-2.946615781062791e-17,-2.935579766901507e-17,-2.924543752740223e-17,-2.91350773857894e-17,-2.902471724417656e-17,-2.891435710256372e-17,-2.880399696095088e-17,-2.8693636819338045e-17,-2.8583276677725205e-17,-2.8472916536112364e-17,-2.8362556394499524e-17,-2.8252196252886684e-17,-2.814183611127385e-17,-2.803147596966101e-17,-2.792111582804817e-17,-2.781075568643533e-17,-2.7700395544822493e-17,-2.7590035403209657e-17,-2.7479675261596817e-17,-2.736931511998398e-17,-2.725895497837114e-17,-2.7148594836758303e-17,-2.7038234695145463e-17,-2.6927874553532623e-17,-2.6817514411919786e-17,-2.6707154270306946e-17,-2.659679412869411e-17,-2.648643398708127e-17,-2.6376073845468432e-17,-2.6265713703855592e-17,-2.6155353562242755e-17,-2.6044993420629915e-17,-2.5934633279017078e-17,-2.5824273137404238e-17,-2.5713912995791398e-17,-2.560355285417856e-17,-2.549319271256572e-17,-2.5382832570952884e-17,-2.5272472429340044e-17,-2.5162112287727207e-17,-2.5051752146114367e-17,-2.494139200450153e-17,-2.483103186288869e-17,-2.4720671721275853e-17,-2.4610311579663013e-17,-2.4499951438050173e-17,-2.4389591296437336e-17,-2.4279231154824496e-17,-2.416887101321166e-17,-2.405851087159882e-17,-2.3948150729985982e-17,-2.3837790588373142e-17,-2.3727430446760305e-17,-2.3617070305147465e-17,-2.3506710163534628e-17,-2.3396350021921788e-17,-2.328598988030895e-17,-2.317562973869611e-17,-2.306526959708327e-17,-2.2954909455470434e-17,-2.2844549313857594e-17,-2.2734189172244757e-17,-2.2623829030631917e-17,-2.251346888901908e-17,-2.240310874740624e-17,-2.2292748605793403e-17,-2.2182388464180563e-17,-2.2072028322567726e-17,-2.1961668180954886e-17,-2.1851308039342046e-17,-2.174094789772921e-17,-2.163058775611637e-17,-2.1520227614503532e-17,-2.1409867472890692e-17,-2.1299507331277855e-17,-2.1189147189665015e-17,-2.1078787048052178e-17,-2.0968426906439338e-17,-2.08580667648265e-17,-2.074770662321366e-17,-2.063734648160082e-17,-2.0526986339987984e-17,-2.0416626198375144e-17,-2.0306266056762307e-17,-2.0195905915149467e-17,-2.008554577353663e-17,-1.997518563192379e-17,-1.9864825490310953e-17,-1.9754465348698113e-17,-1.9644105207085276e-17,-1.9533745065472436e-17,-1.94233849238596e-17,-1.931302478224676e-17,-1.920266464063392e-17,-1.9092304499021082e-17,-1.8981944357408242e-17,-1.8871584215795405e-17,-1.8761224074182565e-17,-1.8650863932569728e-17,-1.8540503790956888e-17,-1.843014364934405e-17,-1.831978350773121e-17,-1.8209423366118374e-17,-1.8099063224505534e-17,-1.7988703082892694e-17,-1.7878342941279857e-17,-1.7767982799667017e-17,-1.765762265805418e-17,-1.754726251644134e-17,-1.7436902374828503e-17,-1.7326542233215663e-17,-1.7216182091602826e-17,-1.7105821949989986e-17,-1.699546180837715e-17,-1.688510166676431e-17,-1.677474152515147e-17,-1.6664381383538632e-17,-1.6554021241925792e-17,-1.6443661100312955e-17,-1.6333300958700115e-17,-1.6222940817087278e-17,-1.6112580675474438e-17,-1.60022205338616e-17,-1.589186039224876e-17,-1.5781500250635924e-17,-1.5671140109023084e-17,-1.5560779967410247e-17,-1.5450419825797407e-17,-1.5340059684184567e-17,-1.522969954257173e-17,-1.511933940095889e-17,-1.5008979259346053e-17,-1.4898619117733213e-17,-1.4788258976120376e-17,-1.4677898834507536e-17,-1.45675386928947e-17,-1.445717855128186e-17,-1.4346818409669022e-17,-1.4236458268056182e-17,-1.4126098126443342e-17,-1.4015737984830505e-17,-1.3905377843217665e-17,-1.3795017701604828e-17,-1.368465755999199e-17,-1.3574297418379151e-17,-1.3463937276766311e-17,-1.3353577135153473e-17,-1.3243216993540634e-17,-1.3132856851927796e-17,-1.3022496710314957e-17,-1.2912136568702119e-17,-1.280177642708928e-17,-1.2691416285476442e-17,-1.2581056143863603e-17,-1.2470696002250765e-17,-1.2360335860637926e-17,-1.2249975719025086e-17,-1.2139615577412248e-17,-1.202925543579941e-17,-1.1918895294186571e-17,-1.1808535152573732e-17,-1.1698175010960894e-17,-1.1587814869348055e-17,-1.1477454727735217e-17,-1.1367094586122378e-17,-1.125673444450954e-17,-1.1146374302896701e-17,-1.1036014161283863e-17,-1.0925654019671023e-17,-1.0815293878058184e-17,-1.0704933736445346e-17,-1.0594573594832507e-17,-1.0484213453219669e-17,-1.037385331160683e-17,-1.0263493169993992e-17,-1.0153133028381153e-17,-1.0042772886768315e-17,-9.932412745155476e-18,-9.822052603542638e-18,-9.7116924619298e-18,-9.60133232031696e-18,-9.490972178704121e-18,-9.380612037091282e-18,-9.270251895478444e-18,-9.159891753865606e-18,-9.049531612252767e-18,-8.939171470639929e-18,-8.82881132902709e-18,-8.718451187414252e-18,-8.608091045801413e-18,-8.497730904188575e-18,-8.387370762575735e-18,-8.277010620962896e-18,-8.166650479350058e-18,-8.056290337737219e-18,-7.94593019612438e-18,-7.835570054511542e-18,-7.725209912898704e-18,-7.614849771285865e-18,-7.504489629673027e-18,-7.394129488060188e-18,-7.28376934644735e-18,-7.173409204834511e-18,-7.063049063221671e-18,-6.952688921608833e-18,-6.842328779995995e-18,-6.731968638383156e-18,-6.621608496770317e-18,-6.511248355157479e-18,-6.40088821354464e-18,-6.290528071931802e-18,-6.180167930318963e-18,-6.069807788706124e-18,-5.9594476470932854e-18,-5.849087505480447e-18,-5.7387273638676084e-18,-5.62836722225477e-18,-5.5180070806419315e-18,-5.407646939029092e-18,-5.297286797416254e-18,-5.186926655803415e-18,-5.076566514190577e-18,-4.966206372577738e-18,-4.8558462309649e-18,-4.7454860893520605e-18,-4.635125947739222e-18,-4.5247658061263835e-18,-4.414405664513545e-18,-4.3040455229007065e-18,-4.193685381287867e-18,-4.083325239675029e-18,-3.97296509806219e-18,-3.862604956449352e-18,-3.752244814836513e-18,-3.641884673223675e-18,-3.5315245316108356e-18,-3.4211643899979974e-18,-3.3108042483851586e-18,-3.20044410677232e-18,-3.0900839651594816e-18,-2.9797238235466427e-18,-2.8693636819338042e-18,-2.7590035403209657e-18,-2.648643398708127e-18,-2.5382832570952884e-18,-2.42792311548245e-18,-2.317562973869611e-18,-2.2072028322567725e-18,-2.0968426906439336e-18,-1.986482549031095e-18,-1.8761224074182567e-18,-1.7657622658054178e-18,-1.6554021241925793e-18,-1.5450419825797408e-18,-1.4346818409669021e-18,-1.3243216993540634e-18,-1.213961557741225e-18,-1.1036014161283863e-18,-9.932412745155476e-19,-8.828811329027089e-19,-7.725209912898704e-19,-6.621608496770317e-19,-5.518007080641931e-19,-4.414405664513544e-19,-3.3108042483851586e-19,-2.207202832256772e-19,-1.103601416128386e-19,0.0,1.103601416128386e-19,2.207202832256772e-19,3.3108042483851586e-19,4.414405664513544e-19,5.518007080641931e-19,6.621608496770317e-19,7.725209912898704e-19,8.828811329027089e-19,9.932412745155476e-19,1.1036014161283863e-18,1.213961557741225e-18,1.3243216993540634e-18,1.4346818409669021e-18,1.5450419825797408e-18,1.6554021241925793e-18,1.7657622658054178e-18,1.8761224074182567e-18,1.986482549031095e-18,2.0968426906439336e-18,2.2072028322567725e-18,2.317562973869611e-18,2.42792311548245e-18,2.5382832570952884e-18,2.648643398708127e-18,2.7590035403209657e-18,2.8693636819338042e-18,2.9797238235466427e-18,3.0900839651594816e-18,3.20044410677232e-18,3.3108042483851586e-18,3.4211643899979974e-18,3.5315245316108356e-18,3.641884673223675e-18,3.752244814836513e-18,3.862604956449352e-18,3.97296509806219e-18,4.083325239675029e-18,4.193685381287867e-18,4.3040455229007065e-18,4.414405664513545e-18,4.5247658061263835e-18,4.635125947739222e-18,4.7454860893520605e-18,4.8558462309649e-18,4.966206372577738e-18,5.076566514190577e-18,5.186926655803415e-18,5.297286797416254e-18,5.407646939029092e-18,5.5180070806419315e-18,5.62836722225477e-18,5.7387273638676084e-18,5.849087505480447e-18,5.9594476470932854e-18,6.069807788706124e-18,6.180167930318963e-18,6.290528071931802e-18,6.40088821354464e-18,6.511248355157479e-18,6.621608496770317e-18,6.731968638383156e-18,6.842328779995995e-18,6.952688921608833e-18,7.063049063221671e-18,7.173409204834511e-18,7.28376934644735e-18,7.394129488060188e-18,7.504489629673027e-18,7.614849771285865e-18,7.725209912898704e-18,7.835570054511542e-18,7.94593019612438e-18,8.056290337737219e-18,8.166650479350058e-18,8.277010620962896e-18,8.387370762575735e-18,8.497730904188575e-18,8.608091045801413e-18,8.718451187414252e-18,8.82881132902709e-18,8.939171470639929e-18,9.049531612252767e-18,9.159891753865606e-18,9.270251895478444e-18,9.380612037091282e-18,9.490972178704121e-18,9.60133232031696e-18,9.7116924619298e-18,9.822052603542638e-18,9.932412745155476e-18,1.0042772886768315e-17,1.0153133028381153e-17,1.0263493169993992e-17,1.037385331160683e-17,1.0484213453219669e-17,1.0594573594832507e-17,1.0704933736445346e-17,1.0815293878058184e-17,1.0925654019671023e-17,1.1036014161283863e-17,1.1146374302896701e-17,1.125673444450954e-17,1.1367094586122378e-17,1.1477454727735217e-17,1.1587814869348055e-17,1.1698175010960894e-17,1.1808535152573732e-17,1.1918895294186571e-17,1.202925543579941e-17,1.2139615577412248e-17,1.2249975719025086e-17,1.2360335860637926e-17,1.2470696002250765e-17,1.2581056143863603e-17,1.2691416285476442e-17,1.280177642708928e-17,1.2912136568702119e-17,1.3022496710314957e-17,1.3132856851927796e-17,1.3243216993540634e-17,1.3353577135153473e-17,1.3463937276766311e-17,1.3574297418379151e-17,1.368465755999199e-17,1.3795017701604828e-17,1.3905377843217665e-17,1.4015737984830505e-17,1.4126098126443342e-17,1.4236458268056182e-17,1.4346818409669022e-17,1.445717855128186e-17,1.45675386928947e-17,1.4677898834507536e-17,1.4788258976120376e-17,1.4898619117733213e-17,1.5008979259346053e-17,1.511933940095889e-17,1.522969954257173e-17,1.5340059684184567e-17,1.5450419825797407e-17,1.5560779967410247e-17,1.5671140109023084e-17,1.5781500250635924e-17,1.589186039224876e-17,1.60022205338616e-17,1.6112580675474438e-17,1.6222940817087278e-17,1.6333300958700115e-17,1.6443661100312955e-17,1.6554021241925792e-17,1.6664381383538632e-17,1.677474152515147e-17,1.688510166676431e-17,1.699546180837715e-17,1.7105821949989986e-17,1.7216182091602826e-17,1.7326542233215663e-17,1.7436902374828503e-17,1.754726251644134e-17,1.765762265805418e-17,1.7767982799667017e-17,1.7878342941279857e-17,1.7988703082892694e-17,1.8099063224505534e-17,1.8209423366118374e-17,1.831978350773121e-17,1.843014364934405e-17,1.8540503790956888e-17,1.8650863932569728e-17,1.8761224074182565e-17,1.8871584215795405e-17,1.8981944357408242e-17,1.9092304499021082e-17,1.920266464063392e-17,1.931302478224676e-17,1.94233849238596e-17,1.9533745065472436e-17,1.9644105207085276e-17,1.9754465348698113e-17,1.9864825490310953e-17,1.997518563192379e-17,2.008554577353663e-17,2.0195905915149467e-17,2.0306266056762307e-17,2.0416626198375144e-17,2.0526986339987984e-17,2.063734648160082e-17,2.074770662321366e-17,2.08580667648265e-17,2.0968426906439338e-17,2.1078787048052178e-17,2.1189147189665015e-17,2.1299507331277855e-17,2.1409867472890692e-17,2.1520227614503532e-17,2.163058775611637e-17,2.174094789772921e-17,2.1851308039342046e-17,2.1961668180954886e-17,2.2072028322567726e-17,2.2182388464180563e-17,2.2292748605793403e-17,2.240310874740624e-17,2.251346888901908e-17,2.2623829030631917e-17,2.2734189172244757e-17,2.2844549313857594e-17,2.2954909455470434e-17,2.306526959708327e-17,2.317562973869611e-17,2.328598988030895e-17,2.3396350021921788e-17,2.3506710163534628e-17,2.3617070305147465e-17,2.3727430446760305e-17,2.3837790588373142e-17,2.3948150729985982e-17,2.405851087159882e-17,2.416887101321166e-17,2.4279231154824496e-17,2.4389591296437336e-17,2.4499951438050173e-17,2.4610311579663013e-17,2.4720671721275853e-17,2.483103186288869e-17,2.494139200450153e-17,2.5051752146114367e-17,2.5162112287727207e-17,2.5272472429340044e-17,2.5382832570952884e-17,2.549319271256572e-17,2.560355285417856e-17,2.5713912995791398e-17,2.5824273137404238e-17,2.5934633279017078e-17,2.6044993420629915e-17,2.6155353562242755e-17,2.6265713703855592e-17,2.6376073845468432e-17,2.648643398708127e-17,2.659679412869411e-17,2.6707154270306946e-17,2.6817514411919786e-17,2.6927874553532623e-17,2.7038234695145463e-17,2.7148594836758303e-17,2.725895497837114e-17,2.736931511998398e-17,2.7479675261596817e-17,2.7590035403209657e-17,2.7700395544822493e-17,2.781075568643533e-17,2.792111582804817e-17,2.803147596966101e-17,2.814183611127385e-17,2.8252196252886684e-17,2.8362556394499524e-17,2.8472916536112364e-17,2.8583276677725205e-17,2.8693636819338045e-17,2.880399696095088e-17,2.891435710256372e-17,2.902471724417656e-17,2.91350773857894e-17,2.924543752740223e-17,2.935579766901507e-17,2.946615781062791e-17,2.957651795224075e-17,2.9686878093853586e-17,2.9797238235466426e-17,2.9907598377079266e-17,3.0017958518692106e-17,3.0128318660304946e-17,3.023867880191778e-17,3.034903894353062e-17,3.045939908514346e-17,3.05697592267563e-17,3.0680119368369134e-17,3.0790479509981974e-17,3.0900839651594814e-17,3.1011199793207654e-17,3.1121559934820494e-17,3.123192007643333e-17,3.134228021804617e-17,3.145264035965901e-17,3.156300050127185e-17,3.167336064288468e-17,3.178372078449752e-17,3.189408092611036e-17,3.20044410677232e-17,3.2114801209336036e-17,3.2225161350948876e-17,3.2335521492561716e-17,3.2445881634174556e-17,3.2556241775787396e-17,3.266660191740023e-17,3.277696205901307e-17,3.288732220062591e-17,3.299768234223875e-17,3.3108042483851584e-17,3.3218402625464424e-17,3.3328762767077264e-17,3.3439122908690104e-17,3.354948305030294e-17,3.365984319191578e-17,3.377020333352862e-17,3.388056347514146e-17,3.39909236167543e-17,3.410128375836713e-17,3.421164389997997e-17,3.432200404159281e-17,3.443236418320565e-17,3.4542724324818486e-17,3.4653084466431326e-17,3.4763444608044166e-17,3.4873804749657006e-17,3.4984164891269846e-17,3.509452503288268e-17,3.520488517449552e-17,3.531524531610836e-17,3.54256054577212e-17,3.5535965599334034e-17,3.5646325740946874e-17,3.5756685882559714e-17,3.5867046024172554e-17,3.597740616578539e-17,3.608776630739823e-17,3.619812644901107e-17,3.630848659062391e-17,3.641884673223675e-17,3.652920687384958e-17,3.663956701546242e-17,3.674992715707526e-17,3.68602872986881e-17,3.6970647440300936e-17,3.7081007581913776e-17,3.7191367723526616e-17,3.7301727865139456e-17,3.741208800675229e-17,3.752244814836513e-17,3.763280828997797e-17,3.774316843159081e-17,3.785352857320365e-17,3.7963888714816484e-17,3.8074248856429324e-17,3.8184608998042164e-17,3.8294969139655004e-17,3.840532928126784e-17,3.851568942288068e-17,3.862604956449352e-17,3.873640970610636e-17,3.88467698477192e-17,3.895712998933203e-17,3.906749013094487e-17,3.917785027255771e-17,3.928821041417055e-17,3.9398570555783386e-17,3.9508930697396226e-17,3.9619290839009066e-17,3.9729650980621906e-17,3.984001112223474e-17,3.995037126384758e-17,4.006073140546042e-17,4.017109154707326e-17,4.02814516886861e-17,4.0391811830298934e-17,4.0502171971911774e-17,4.0612532113524614e-17,4.0722892255137454e-17,4.083325239675029e-17,4.094361253836313e-17,4.105397267997597e-17,4.116433282158881e-17,4.127469296320164e-17,4.138505310481448e-17,4.149541324642732e-17,4.160577338804016e-17,4.1716133529653e-17,4.1826493671265836e-17,4.1936853812878676e-17,4.2047213954491516e-17,4.2157574096104356e-17,4.226793423771719e-17,4.237829437933003e-17,4.248865452094287e-17,4.259901466255571e-17,4.270937480416855e-17,4.2819734945781384e-17,4.2930095087394224e-17,4.3040455229007064e-17,4.3150815370619904e-17,4.326117551223274e-17,4.337153565384558e-17,4.348189579545842e-17,4.359225593707126e-17,4.370261607868409e-17,4.381297622029693e-17,4.392333636190977e-17,4.403369650352261e-17,4.414405664513545e-17,4.4254416786748286e-17,4.4364776928361126e-17,4.4475137069973966e-17,4.4585497211586806e-17,4.469585735319964e-17,4.480621749481248e-17,4.491657763642532e-17,4.502693777803816e-17,4.5137297919650993e-17,4.5247658061263834e-17,4.5358018202876674e-17,4.5468378344489514e-17,4.5578738486102354e-17,4.568909862771519e-17,4.579945876932803e-17,4.590981891094087e-17,4.602017905255371e-17,4.613053919416654e-17,4.624089933577938e-17,4.635125947739222e-17,4.646161961900506e-17,4.65719797606179e-17,4.6682339902230735e-17,4.6792700043843575e-17,4.6903060185456416e-17,4.7013420327069256e-17,4.712378046868209e-17,4.723414061029493e-17,4.734450075190777e-17,4.745486089352061e-17,4.7565221035133443e-17,4.7675581176746283e-17,4.7785941318359123e-17,4.7896301459971963e-17,4.8006661601584803e-17,4.811702174319764e-17,4.822738188481048e-17,4.833774202642332e-17,4.844810216803616e-17,4.855846230964899e-17,4.866882245126183e-17,4.877918259287467e-17,4.888954273448751e-17,4.8999902876100345e-17,4.9110263017713185e-17,4.9220623159326025e-17,4.9330983300938865e-17,4.9441343442551705e-17,4.955170358416454e-17,4.966206372577738e-17,4.977242386739022e-17,4.988278400900306e-17,4.9993144150615893e-17,5.0103504292228733e-17,5.0213864433841573e-17,5.0324224575454413e-17,5.0434584717067253e-17,5.054494485868009e-17,5.065530500029293e-17,5.076566514190577e-17,5.087602528351861e-17,5.098638542513144e-17,5.109674556674428e-17,5.120710570835712e-17,5.131746584996996e-17,5.1427825991582795e-17,5.1538186133195635e-17,5.1648546274808475e-17,5.1758906416421315e-17,5.1869266558034155e-17,5.197962669964699e-17,5.208998684125983e-17,5.220034698287267e-17,5.231070712448551e-17,5.2421067266098343e-17,5.2531427407711183e-17,5.2641787549324023e-17,5.2752147690936863e-17,5.28625078325497e-17,5.297286797416254e-17,5.308322811577538e-17,5.319358825738822e-17,5.330394839900106e-17,5.341430854061389e-17,5.352466868222673e-17,5.363502882383957e-17,5.374538896545241e-17,5.3855749107065245e-17,5.3966109248678085e-17,5.4076469390290925e-17,5.4186829531903765e-17,5.4297189673516605e-17,5.440754981512944e-17,5.451790995674228e-17,5.462827009835512e-17,5.473863023996796e-17,5.484899038158079e-17,5.495935052319363e-17,5.506971066480647e-17,5.5180070806419313e-17,5.529043094803215e-17,5.540079108964499e-17,5.551115123125783e-17]}
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
var exp2 = require( './../lib' );


// FIXTURES //

var mediumNegative = require( './fixtures/julia/medium_negative.json' );
var mediumPositive = require( './fixtures/julia/medium_positive.json' );
var smallNegative = require( './fixtures/julia/small_negative.json' );
var smallPositive = require( './fixtures/julia/small_positive.json' );
var tiny = require( './fixtures/julia/tiny.json' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.equal( typeof exp2, 'function', 'main export is a function' );
	t.end();
});

tape( 'the function accurately computes `2**x` for negative medium numbers', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var v;
	var i;

	x = mediumNegative.x;
	expected = mediumNegative.expected;

	for ( i = 0; i < x.length; i++ ) {
		v = exp2( x[ i ] );
		delta = abs( v - expected[ i ] );
		tol = EPS * abs( expected[ i ] );
		t.ok( delta <= tol, 'within tolerance. x: ' + x[ i ] + '. Value: ' + v + '. Expected: ' + expected[ i ] + '. Delta: ' + delta + '. Tolerance: ' + tol + '.' );
	}
	t.end();
});

tape( 'the function accurately computes `2**x` for positive medium numbers', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var v;
	var i;

	x = mediumPositive.x;
	expected = mediumPositive.expected;

	for ( i = 0; i < x.length; i++ ) {
		v = exp2( x[ i ] );
		delta = abs( v - expected[ i ] );
		tol = EPS * abs( expected[ i ] );
		t.ok( delta <= tol, 'within tolerance. x: ' + x[ i ] + '. Value: ' + v + '. Expected: ' + expected[ i ] + '. Delta: ' + delta + '. Tolerance: ' + tol + '.' );
	}
	t.end();
});

tape( 'the function accurately computes `2**x` for negative small numbers', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var v;
	var i;

	x = smallNegative.x;
	expected = smallNegative.expected;

	for ( i = 0; i < x.length; i++ ) {
		v = exp2( x[ i ] );
		delta = abs( v - expected[ i ] );
		tol = EPS * abs( expected[ i ] );
		t.ok( delta <= tol, 'within tolerance. x: ' + x[ i ] + '. Value: ' + v + '. Expected: ' + expected[ i ] + '. Delta: ' + delta + '. Tolerance: ' + tol + '.' );
	}
	t.end();
});

tape( 'the function accurately computes `2**x` for positive small numbers', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var v;
	var i;

	x = smallPositive.x;
	expected = smallPositive.expected;

	for ( i = 0; i < x.length; i++ ) {
		v = exp2( x[ i ] );
		delta = abs( v - expected[ i ] );
		tol = EPS * abs( expected[ i ] );
		t.ok( delta <= tol, 'within tolerance. x: ' + x[ i ] + '. Value: ' + v + '. Expected: ' + expected[ i ] + '. Delta: ' + delta + '. Tolerance: ' + tol + '.' );
	}
	t.end();
});

tape( 'the function accurately computes `2**x` for very small `x`', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var v;
	var i;

	x = tiny.x;
	expected = tiny.expected;

	for ( i = 0; i < x.length; i++ ) {
		v = exp2( x[ i ] );
		delta = abs( v - expected[ i ] );
		tol = EPS * abs( expected[ i ] );
		t.ok( delta <= tol, 'within tolerance. x: ' + x[ i ] + '. Value: ' + v + '. Expected: ' + expected[ i ] + '. Delta: ' + delta + '. Tolerance: ' + tol + '.' );
	}
	t.end();
});

tape( 'the function returns `+infinity` for very large `x`', function test( t ) {
	t.equal( exp2( 1100.0 ), PINF, 'equals +infinity' );
	t.equal( exp2( 1200.0 ), PINF, 'equals +infinity' );
	t.equal( exp2( 1300.0 ), PINF, 'equals +infinity' );
	t.end();
});

tape( 'the function returns `0.0` for negative large `x`', function test( t ) {
	t.equal( exp2( -1100.0 ), 0.0, 'equals 0' );
	t.equal( exp2( -1200.0 ), 0.0, 'equals 0' );
	t.equal( exp2( -1300.0 ), 0.0, 'equals 0' );
	t.end();
});

tape( 'the function returns `0.0` if provided `-infinity`', function test( t ) {
	t.equal( exp2( NINF ), 0.0, 'equals 0' );
	t.end();
});

tape( 'the function returns `+infinity` if provided `+infinity`', function test( t ) {
	t.equal( exp2( PINF ), PINF, 'equals +infinity' );
	t.end();
});

tape( 'the function returns `1` if provided `0`', function test( t ) {
	var v = exp2( 0.0 );
	t.equal( v, 1.0, 'equals 1' );
	t.end();
});

tape( 'the function returns `NaN` if provided `NaN`', function test( t ) {
	var val = exp2( NaN );
	t.equal( isnan( val ), true, 'equals NaN' );
	t.end();
});

}).call(this,"/lib/node_modules/@stdlib/math/base/special/exp2/test/test.js")
},{"./../lib":48,"./fixtures/julia/medium_negative.json":51,"./fixtures/julia/medium_positive.json":52,"./fixtures/julia/small_negative.json":53,"./fixtures/julia/small_positive.json":54,"./fixtures/julia/tiny.json":55,"@stdlib/constants/math/float64-eps":26,"@stdlib/constants/math/float64-ninf":33,"@stdlib/constants/math/float64-pinf":34,"@stdlib/math/base/assert/is-nan":41,"@stdlib/math/base/special/abs":44,"tape":151}],57:[function(require,module,exports){
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

},{"./ldexp.js":58}],58:[function(require,module,exports){
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

},{"@stdlib/constants/math/float64-exponent-bias":27,"@stdlib/constants/math/float64-max-base2-exponent":30,"@stdlib/constants/math/float64-max-base2-exponent-subnormal":29,"@stdlib/constants/math/float64-min-base2-exponent-subnormal":31,"@stdlib/constants/math/float64-ninf":33,"@stdlib/constants/math/float64-pinf":34,"@stdlib/math/base/assert/is-infinite":39,"@stdlib/math/base/assert/is-nan":41,"@stdlib/math/base/special/copysign":46,"@stdlib/number/float64/base/exponent":61,"@stdlib/number/float64/base/from-words":63,"@stdlib/number/float64/base/normalize":69,"@stdlib/number/float64/base/to-words":72}],59:[function(require,module,exports){
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

},{"./main.js":62}],62:[function(require,module,exports){
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

},{"@stdlib/constants/math/float64-exponent-bias":27,"@stdlib/constants/math/float64-high-word-exponent-mask":28,"@stdlib/number/float64/base/get-high-word":67}],63:[function(require,module,exports){
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

},{"./main.js":65}],64:[function(require,module,exports){
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

},{"@stdlib/assert/is-little-endian":18}],65:[function(require,module,exports){
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

},{"./indices.js":64,"@stdlib/array/float64":2,"@stdlib/array/uint32":7}],66:[function(require,module,exports){
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

},{"@stdlib/assert/is-little-endian":18}],67:[function(require,module,exports){
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

},{"./main.js":68}],68:[function(require,module,exports){
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

},{"./high.js":66,"@stdlib/array/float64":2,"@stdlib/array/uint32":7}],69:[function(require,module,exports){
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

},{"./main.js":70}],70:[function(require,module,exports){
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

},{"./normalize.js":71}],71:[function(require,module,exports){
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

},{"@stdlib/constants/math/float64-smallest-normal":35,"@stdlib/math/base/assert/is-infinite":39,"@stdlib/math/base/assert/is-nan":41,"@stdlib/math/base/special/abs":44}],72:[function(require,module,exports){
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

},{"./main.js":74}],73:[function(require,module,exports){
arguments[4][64][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":18,"dup":64}],74:[function(require,module,exports){
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

},{"./to_words.js":75}],75:[function(require,module,exports){
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

},{"./indices.js":73,"@stdlib/array/float64":2,"@stdlib/array/uint32":7}],76:[function(require,module,exports){
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

},{"./float64array.js":77,"@stdlib/assert/is-float64array":15}],77:[function(require,module,exports){
'use strict';

// EXPORTS //

module.exports = ( typeof Float64Array === 'function' ) ? Float64Array : null;

},{}],78:[function(require,module,exports){
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

},{"./detect_float64array_support.js":76}],79:[function(require,module,exports){
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

},{}],80:[function(require,module,exports){
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

},{"./detect_symbol_support.js":79}],81:[function(require,module,exports){
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

},{"@stdlib/utils/detect-symbol-support":80}],82:[function(require,module,exports){
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

},{"./has_tostringtag_support.js":81}],83:[function(require,module,exports){
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

},{"./uint16array.js":85,"@stdlib/assert/is-uint16array":20,"@stdlib/constants/math/uint16-max":36}],84:[function(require,module,exports){
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

},{"./detect_uint16array_support.js":83}],85:[function(require,module,exports){
'use strict';

// EXPORTS //

module.exports = ( typeof Uint16Array === 'function' ) ? Uint16Array : null;

},{}],86:[function(require,module,exports){
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

},{"./uint32array.js":88,"@stdlib/assert/is-uint32array":22,"@stdlib/constants/math/uint32-max":37}],87:[function(require,module,exports){
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

},{"./detect_uint32array_support.js":86}],88:[function(require,module,exports){
'use strict';

// EXPORTS //

module.exports = ( typeof Uint32Array === 'function' ) ? Uint32Array : null;

},{}],89:[function(require,module,exports){
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

},{"./uint8array.js":91,"@stdlib/assert/is-uint8array":24,"@stdlib/constants/math/uint8-max":38}],90:[function(require,module,exports){
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

},{"./detect_uint8array_support.js":89}],91:[function(require,module,exports){
'use strict';

// EXPORTS //

module.exports = ( typeof Uint8Array === 'function' ) ? Uint8Array : null;

},{}],92:[function(require,module,exports){
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

},{"./native_class.js":93,"./polyfill.js":94,"@stdlib/utils/detect-tostringtag-support":82}],93:[function(require,module,exports){
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

},{"./tostring.js":95}],94:[function(require,module,exports){
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

},{"./tostring.js":95,"./tostringtag.js":96,"@stdlib/assert/has-own-property":14}],95:[function(require,module,exports){
'use strict';

// MAIN //

var toStr = Object.prototype.toString;


// EXPORTS //

module.exports = toStr;

},{}],96:[function(require,module,exports){
'use strict';

// MAIN //

var toStrTag = ( typeof Symbol === 'function' ) ? Symbol.toStringTag : '';


// EXPORTS //

module.exports = toStrTag;

},{}],97:[function(require,module,exports){
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

},{}],98:[function(require,module,exports){

},{}],99:[function(require,module,exports){
arguments[4][98][0].apply(exports,arguments)
},{"dup":98}],100:[function(require,module,exports){
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

},{}],101:[function(require,module,exports){
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

},{"base64-js":97,"ieee754":120}],102:[function(require,module,exports){
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
},{"../../is-buffer/index.js":122}],103:[function(require,module,exports){
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

},{"./lib/is_arguments.js":104,"./lib/keys.js":105}],104:[function(require,module,exports){
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

},{}],105:[function(require,module,exports){
exports = module.exports = typeof Object.keys === 'function'
  ? Object.keys : shim;

exports.shim = shim;
function shim (obj) {
  var keys = [];
  for (var key in obj) keys.push(key);
  return keys;
}

},{}],106:[function(require,module,exports){
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

},{"foreach":116,"object-keys":126}],107:[function(require,module,exports){
module.exports = function () {
    for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] !== undefined) return arguments[i];
    }
};

},{}],108:[function(require,module,exports){
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

},{"./helpers/isFinite":109,"./helpers/isNaN":110,"./helpers/mod":111,"./helpers/sign":112,"es-to-primitive/es5":113,"has":119,"is-callable":123}],109:[function(require,module,exports){
var $isNaN = Number.isNaN || function (a) { return a !== a; };

module.exports = Number.isFinite || function (x) { return typeof x === 'number' && !$isNaN(x) && x !== Infinity && x !== -Infinity; };

},{}],110:[function(require,module,exports){
module.exports = Number.isNaN || function isNaN(a) {
	return a !== a;
};

},{}],111:[function(require,module,exports){
module.exports = function mod(number, modulo) {
	var remain = number % modulo;
	return Math.floor(remain >= 0 ? remain : remain + modulo);
};

},{}],112:[function(require,module,exports){
module.exports = function sign(number) {
	return number >= 0 ? 1 : -1;
};

},{}],113:[function(require,module,exports){
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

},{"./helpers/isPrimitive":114,"is-callable":123}],114:[function(require,module,exports){
module.exports = function isPrimitive(value) {
	return value === null || (typeof value !== 'function' && typeof value !== 'object');
};

},{}],115:[function(require,module,exports){
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

},{}],116:[function(require,module,exports){

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


},{}],117:[function(require,module,exports){
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

},{}],118:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

module.exports = Function.prototype.bind || implementation;

},{"./implementation":117}],119:[function(require,module,exports){
var bind = require('function-bind');

module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);

},{"function-bind":118}],120:[function(require,module,exports){
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

},{}],121:[function(require,module,exports){
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

},{}],122:[function(require,module,exports){
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

},{}],123:[function(require,module,exports){
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

},{}],124:[function(require,module,exports){
var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};

},{}],125:[function(require,module,exports){
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

},{}],126:[function(require,module,exports){
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

},{"./isArguments":127}],127:[function(require,module,exports){
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

},{}],128:[function(require,module,exports){
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
},{"_process":100}],129:[function(require,module,exports){
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
},{"_process":100}],130:[function(require,module,exports){
module.exports = require('./lib/_stream_duplex.js');

},{"./lib/_stream_duplex.js":131}],131:[function(require,module,exports){
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
},{"./_stream_readable":133,"./_stream_writable":135,"core-util-is":102,"inherits":121,"process-nextick-args":129}],132:[function(require,module,exports){
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
},{"./_stream_transform":134,"core-util-is":102,"inherits":121}],133:[function(require,module,exports){
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
},{"./_stream_duplex":131,"./internal/streams/BufferList":136,"./internal/streams/destroy":137,"./internal/streams/stream":138,"_process":100,"core-util-is":102,"events":115,"inherits":121,"isarray":124,"process-nextick-args":129,"safe-buffer":144,"string_decoder/":150,"util":98}],134:[function(require,module,exports){
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
},{"./_stream_duplex":131,"core-util-is":102,"inherits":121}],135:[function(require,module,exports){
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
},{"./_stream_duplex":131,"./internal/streams/destroy":137,"./internal/streams/stream":138,"_process":100,"core-util-is":102,"inherits":121,"process-nextick-args":129,"safe-buffer":144,"util-deprecate":157}],136:[function(require,module,exports){
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
},{"safe-buffer":144}],137:[function(require,module,exports){
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
},{"process-nextick-args":129}],138:[function(require,module,exports){
module.exports = require('events').EventEmitter;

},{"events":115}],139:[function(require,module,exports){
module.exports = require('./readable').PassThrough

},{"./readable":140}],140:[function(require,module,exports){
exports = module.exports = require('./lib/_stream_readable.js');
exports.Stream = exports;
exports.Readable = exports;
exports.Writable = require('./lib/_stream_writable.js');
exports.Duplex = require('./lib/_stream_duplex.js');
exports.Transform = require('./lib/_stream_transform.js');
exports.PassThrough = require('./lib/_stream_passthrough.js');

},{"./lib/_stream_duplex.js":131,"./lib/_stream_passthrough.js":132,"./lib/_stream_readable.js":133,"./lib/_stream_transform.js":134,"./lib/_stream_writable.js":135}],141:[function(require,module,exports){
module.exports = require('./readable').Transform

},{"./readable":140}],142:[function(require,module,exports){
module.exports = require('./lib/_stream_writable.js');

},{"./lib/_stream_writable.js":135}],143:[function(require,module,exports){
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
},{"_process":100,"through":156}],144:[function(require,module,exports){
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

},{"buffer":101}],145:[function(require,module,exports){
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

},{"events":115,"inherits":121,"readable-stream/duplex.js":130,"readable-stream/passthrough.js":139,"readable-stream/readable.js":140,"readable-stream/transform.js":141,"readable-stream/writable.js":142}],146:[function(require,module,exports){
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

},{"es-abstract/es5":108,"function-bind":118}],147:[function(require,module,exports){
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

},{"./implementation":146,"./polyfill":148,"./shim":149,"define-properties":106,"function-bind":118}],148:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

var zeroWidthSpace = '\u200b';

module.exports = function getPolyfill() {
	if (String.prototype.trim && zeroWidthSpace.trim() === zeroWidthSpace) {
		return String.prototype.trim;
	}
	return implementation;
};

},{"./implementation":146}],149:[function(require,module,exports){
'use strict';

var define = require('define-properties');
var getPolyfill = require('./polyfill');

module.exports = function shimStringTrim() {
	var polyfill = getPolyfill();
	define(String.prototype, { trim: polyfill }, { trim: function () { return String.prototype.trim !== polyfill; } });
	return polyfill;
};

},{"./polyfill":148,"define-properties":106}],150:[function(require,module,exports){
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
},{"safe-buffer":144}],151:[function(require,module,exports){
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
},{"./lib/default_stream":152,"./lib/results":154,"./lib/test":155,"_process":100,"defined":107,"through":156}],152:[function(require,module,exports){
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
},{"_process":100,"fs":99,"through":156}],153:[function(require,module,exports){
(function (process){
module.exports = typeof setImmediate !== 'undefined'
    ? setImmediate
    : process.nextTick
;

}).call(this,require('_process'))
},{"_process":100}],154:[function(require,module,exports){
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
},{"_process":100,"events":115,"function-bind":118,"has":119,"inherits":121,"object-inspect":125,"resumer":143,"through":156}],155:[function(require,module,exports){
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
},{"./next_tick":153,"deep-equal":103,"defined":107,"events":115,"has":119,"inherits":121,"path":128,"string.prototype.trim":147}],156:[function(require,module,exports){
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
},{"_process":100,"stream":145}],157:[function(require,module,exports){
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
},{}]},{},[56]);
