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
} // end FUNCTION hasOwnProp()


// EXPORTS //

module.exports = hasOwnProp;

},{}],2:[function(require,module,exports){
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

},{"./has_own_property.js":1}],3:[function(require,module,exports){
'use strict';

var ctors = {
	'uint16': Uint16Array,
	'uint8': Uint8Array
};


// EXPORTS //

module.exports = ctors;

},{}],4:[function(require,module,exports){
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

},{"./is_little_endian.js":5}],5:[function(require,module,exports){
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

	// Set the uint16 view to a value having distinguishable lower and higher order words.
	// 4660 => 0x1234 => 0x12 0x34 => '00010010 00110100' => (0x12,0x34) == (18,52)
	uint16view[ 0 ] = 0x1234;

	// Create a uint8 view on top of the uint16 buffer:
	uint8view = new ctors[ 'uint8' ]( uint16view.buffer );

	// If little endian, the least significant byte will be first...
	return ( uint8view[ 0 ] === 0x34 );
} // end FUNCTION isLittleEndian()


// EXPORTS //

module.exports = isLittleEndian();

},{"./ctors.js":3}],6:[function(require,module,exports){
'use strict';

// MODULES //

var isPrimitive = require( './primitive.js' );
var isObject = require( './object.js' );


// MAIN //

/**
* Tests if a value is a number.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating whether value is a number
*
* @example
* var bool = isNumber( 3.14 );
* // returns true
*
* @example
* bool = isNumber( new Number( 3.14 ) );
* // returns true
*
* @example
* bool = isNumber( NaN );
* // returns true
*
* @example
* bool = isNumber( null );
* // returns false
*/
function isNumber( value ) {
	return ( isPrimitive( value ) || isObject( value ) );
} // end FUNCTION isNumber()


// EXPORTS //

module.exports = isNumber;

},{"./object.js":8,"./primitive.js":9}],7:[function(require,module,exports){
'use strict';

/**
* Test if a value is a number.
*
* @module @stdlib/assert/is-number
*
* @example
* var isNumber = require( '@stdlib/assert/is-number' );
*
* var bool = isNumber( 3.14 );
* // returns true
*
* bool = isNumber( new Number( 3.14 ) );
* // returns true
*
* bool = isNumber( NaN );
* // returns true
*
* bool = isNumber( null );
* // returns false
*
* @example
* // Use interface to check for number primitives...
* var isNumber = require( '@stdlib/assert/is-number' ).isPrimitive;
*
* var bool = isNumber( 3.14 );
* // returns true
*
* bool = isNumber( NaN );
* // returns true
*
* bool = isNumber( new Number( 3.14 ) );
* // returns false
*
* @example
* // Use interface to check for number objects...
* var isNumber = require( '@stdlib/assert/is-number' ).isObject;
*
* var bool = isNumber( 3.14 );
* // returns false
*
* bool = isNumber( new Number( 3.14 ) );
* // returns true
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-read-only-property' );
var isNumber = require( './generic.js' );
var isPrimitive = require( './primitive.js' );
var isObject = require( './object.js' );


// MAIN //

setReadOnly( isNumber, 'isPrimitive', isPrimitive );
setReadOnly( isNumber, 'isObject', isObject );


// EXPORTS //

module.exports = isNumber;

},{"./generic.js":6,"./object.js":8,"./primitive.js":9,"@stdlib/utils/define-read-only-property":103}],8:[function(require,module,exports){
'use strict';

// MODULES //

var hasToStringTag = require( '@stdlib/utils/detect-tostringtag-support' )();
var nativeClass = require( '@stdlib/utils/native-class' );
var test = require( './try2serialize.js' );


// MAIN //

/**
* Tests if a value is a number object.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating if a value is a number object
*
* @example
* var bool = isNumber( 3.14 );
* // returns false
*
* @example
* var bool = isNumber( new Number( 3.14 ) );
* // returns true
*/
function isNumber( value ) {
	if ( typeof value === 'object' ) {
		if ( hasToStringTag ) {
			return test( value );
		}
		return ( nativeClass( value ) === '[object Number]' );
	}
	return false;
} // end FUNCTION isNumber()


// EXPORTS //

module.exports = isNumber;

},{"./try2serialize.js":11,"@stdlib/utils/detect-tostringtag-support":107,"@stdlib/utils/native-class":108}],9:[function(require,module,exports){
'use strict';

/**
* Tests if a value is a number primitive.
*
* @param {*} value - value to test
* @returns {boolean} boolean indicating if a value is a number primitive
*
* @example
* var bool = isNumber( 3.14 );
* // returns true
*
* @example
* var bool = isNumber( NaN );
* // returns true
*
* @example
* var bool = isNumber( new Number( 3.14 ) );
* // returns false
*/
function isNumber( value ) {
	return ( typeof value === 'number' );
} // end FUNCTION isNumber()


// EXPORTS //

module.exports = isNumber;

},{}],10:[function(require,module,exports){
'use strict';

// eslint-disable-next-line no-redeclare
var toString = Number.prototype.toString; // non-generic


// EXPORTS //

module.exports = toString;

},{}],11:[function(require,module,exports){
'use strict';

// MODULES //

var toString = require( './tostring.js' ); // eslint-disable-line no-redeclare


// MAIN //

/**
* Attempts to serialize a value to a string.
*
* @private
* @param {*} value - value to test
* @returns {boolean} boolean indicating if a value can be serialized
*/
function test( value ) {
	try {
		toString.call( value );
		return true;
	} catch ( err ) { // eslint-disable-line no-unused-vars
		return false;
	}
} // end FUNCTION test()


// EXPORTS //

module.exports = test;

},{"./tostring.js":10}],12:[function(require,module,exports){
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

},{"./is_even.js":13}],13:[function(require,module,exports){
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
} // end FUNCTION isEven()


// EXPORTS //

module.exports = isEven;

},{"@stdlib/math/base/assert/is-integer":16}],14:[function(require,module,exports){
'use strict';

/**
* Test if a numeric value is infinite.
*
* @module @stdlib/assert/is-infinite
*
* @example
* var isInfinite = require( '@stdlib/math/base/assert/is-infinite' );
*
* var bool = isInfinite( Number.POSITIVE_INFINITY );
* // returns true
*
* bool = isInfinite( Number.NEGATIVE_INFINITY );
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

},{"./is_infinite.js":15}],15:[function(require,module,exports){
'use strict';

// MODULES //

var PINF = require( '@stdlib/math/constants/float64-pinf' );
var NINF = require( '@stdlib/math/constants/float64-ninf' );


// MAIN //

/**
* Tests if a numeric value is infinite.
*
* @param {number} x - value to test
* @returns {boolean} boolean indicating whether the value is infinite
*
* @example
* var bool = isInfinite( Number.POSITIVE_INFINITY );
* // returns true
*
* @example
* var bool = isInfinite( Number.NEGATIVE_INFINITY );
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
} // end FUNCTION isInfinite()


// EXPORTS //

module.exports = isInfinite;

},{"@stdlib/math/constants/float64-ninf":95,"@stdlib/math/constants/float64-pinf":97}],16:[function(require,module,exports){
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

},{"./is_integer.js":17}],17:[function(require,module,exports){
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
} // end FUNCTION isInteger()


// EXPORTS //

module.exports = isInteger;

},{"@stdlib/math/base/special/floor":36}],18:[function(require,module,exports){
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

},{"./is_nan.js":19}],19:[function(require,module,exports){
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
	return (x !== x);
} // end FUNCTION isnan()


// EXPORTS //

module.exports = isnan;

},{}],20:[function(require,module,exports){
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

},{"./is_odd.js":21}],21:[function(require,module,exports){
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
} // end FUNCTION isOdd()


// EXPORTS //

module.exports = isOdd;

},{"@stdlib/math/base/assert/is-even":12}],22:[function(require,module,exports){
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
} // end FUNCTION abs()


// EXPORTS //

module.exports = abs;

},{}],23:[function(require,module,exports){
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

},{"./abs.js":22}],24:[function(require,module,exports){
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

},{}],25:[function(require,module,exports){
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

},{"./ceil.js":24}],26:[function(require,module,exports){
'use strict';

// MODULES //

var toWords = require( '@stdlib/math/base/utils/float64-to-words' );
var getHighWord = require( '@stdlib/math/base/utils/float64-get-high-word' );
var fromWords = require( '@stdlib/math/base/utils/float64-from-words' );


// VARIABLES //

// 10000000000000000000000000000000 => 2147483648 => 0x80000000
var SIGN_MASK = 0x80000000;

// 01111111111111111111111111111111 => 2147483647 => 0x7fffffff
var MAGNITUDE_MASK = 0x7fffffff;


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
	x = toWords( x );
	hx = x[ 0 ];

	// Turn off the sign bit of `x`:
	hx &= MAGNITUDE_MASK;

	// Extract the higher order word from `y`:
	hy = getHighWord( y );

	// Leave only the sign bit of `y` turned on:
	hy &= SIGN_MASK;

	// Copy the sign bit of `y` to `x`:
	hx |= hy;

	// Return a new value having the same magnitude as `x`, but with the sign of `y`:
	return fromWords( hx, x[ 1 ] );
} // end FUNCTION copysign()


// EXPORTS //

module.exports = copysign;

},{"@stdlib/math/base/utils/float64-from-words":66,"@stdlib/math/base/utils/float64-get-high-word":70,"@stdlib/math/base/utils/float64-to-words":82}],27:[function(require,module,exports){
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

},{"./copysign.js":26}],28:[function(require,module,exports){
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

var getHighWord = require( '@stdlib/math/base/utils/float64-get-high-word' );
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
} // end FUNCTION cos()


// EXPORTS //

module.exports = cos;

},{"@stdlib/math/base/special/kernel-cos":37,"@stdlib/math/base/special/kernel-sin":39,"@stdlib/math/base/special/rempio2":51,"@stdlib/math/base/utils/float64-get-high-word":70}],29:[function(require,module,exports){
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

},{"./cos.js":28}],30:[function(require,module,exports){
'use strict';

/*
* Notes:
*	=> cos(-x) = cos(x)
*	=> sin(-x) = -sin(x)
*	=> cos(π/2) = 0
*	=> cos(0) = 1
*	=> cos(π) = -1
*/


// MODULES //

var isnan = require( '@stdlib/math/base/assert/is-nan' );
var isInfinite = require( '@stdlib/math/base/assert/is-infinite' );
var abs = require( '@stdlib/math/base/special/abs' );
var cos = require( '@stdlib/math/base/special/cos' );
var sin = require( '@stdlib/math/base/special/sin' );
var floor = require( '@stdlib/math/base/special/floor' );
var PI = require( '@stdlib/math/constants/float64-pi' );
var MAX_INTEGER = require( '@stdlib/math/constants/float64-max-safe-integer' );


// VARIABLES //

MAX_INTEGER += 1;


// MAIN //

/**
* Computes the value of `cos(πx)`.
*
* @param {number} x - input value
* @returns {number} function value
*
* @example
* var y = cospi( 0.0 );
* // returns 1.0
*
* @example
* var y = cospi( 0.5 );
* // returns 0.0
*
* @example
* var y = cospi( 0.1 );
* // returns ~0.951
*
* @example
* var y = cospi( NaN );
* // returns NaN
*/
function cospi( x ) {
	var ax;
	var ix;
	var rx;
	var y;
	if ( isnan( x ) ) {
		return NaN;
	}
	if ( isInfinite( x ) ) {
		return NaN;
	}
	ax = abs( x );
	if ( ax > MAX_INTEGER ) {
		// Always even integer...
		return 1.0;
	}
	// Argument reduction (reduce to [0,1))...
	ix = floor( ax );
	rx = ax - ix;
	if ( rx === 0.5 ) {
		return 0.0;
	}
	if ( rx < 0.25 ) {
		y = cos( PI*rx );
	}
	else if ( rx < 0.75 ) {
		rx = 0.5 - rx;
		y = sin( PI*rx ); // recall sin(-x) = -sin(x), thus returned result will be properly signed
	}
	else {
		rx = 1.0 - rx;
		y = -cos( PI*rx );
	}
	// If the integer of `x` is odd, we need to flip the sign...
	return ( ix%2 === 1 ) ? -y : y;
} // end FUNCTION cospi()


// EXPORTS //

module.exports = cospi;

},{"@stdlib/math/base/assert/is-infinite":14,"@stdlib/math/base/assert/is-nan":18,"@stdlib/math/base/special/abs":23,"@stdlib/math/base/special/cos":29,"@stdlib/math/base/special/floor":36,"@stdlib/math/base/special/sin":57,"@stdlib/math/constants/float64-max-safe-integer":93,"@stdlib/math/constants/float64-pi":96}],31:[function(require,module,exports){
'use strict';

/**
* Compute cos(πx).
*
* @module @stdlib/math/base/special/cospi
*
* @example
* var cospi = require( '@stdlib/math/base/special/cospi' );
*
* var y = cospi( 0.0 );
* // returns 1.0
*
* y = cospi( 0.5 );
* // returns 0.0
*
* y = cospi( 0.1 );
* // returns ~0.951
*
* y = cospi( NaN );
* // returns NaN
*/

// MODULES //

var cospi = require( './cospi.js' );


// EXPORTS //

module.exports = cospi;

},{"./cospi.js":30}],32:[function(require,module,exports){
module.exports={"expected":[1.0,0.9511534530228996,0.8093857823947705,0.5885467104819188,0.3102106894855472,0.0015692264556667226,-0.30722553916178263,-0.58600649131677,-0.8075386562578029,-0.950179871381357,-0.9999950750566616,-0.9521176659107179,-0.811224936173504,-0.5910811325286653,-0.31319278426917446,-0.0047076639102974095,0.3042373627012731,0.5834605000541262,0.8056835759565839,0.9491969305757587,0.9999803002751568,0.9530725005474241,0.8130560994785208,0.5936097324932398,0.31617179413936874,0.007846054994972068,-0.3012461895372182,-0.5809087617716404,-0.8038205597634447,-0.9482046402879605,-0.9999556758010154,-0.9540179475280053,-0.8148792542731221,-0.596132485469219,-0.31914768975322033,-0.010984368796894167,0.2982520491323346,0.5783513016036816,0.8019496260288834,0.9472030102919091,0.9999212018767856,0.9549539975399158,0.8166943825994136,0.5986493666077721,0.3221204417984948,0.014122574404028403,-0.2952549709786086,-0.5757881447409429,-0.8000707931813853,-0.9461920504535466,-0.9998768788420318,-0.9558806413631561,-0.8185014665785871,-0.6011603511179051,-0.3250900209939213,-0.017260640905405175,0.29225498459683513,0.5732193164302286,0.798184079727241,0.9451717707307128,0.9998227071333307,0.9567978698704157,0.8203004884110702,0.6036654142667051,0.3280563980894813,0.020398537391425064,-0.28925211953658264,-0.5706448419742066,-0.7962895042503644,-0.9441421811730474,-0.9997586872842676,-0.9577056740270846,-0.8220914303767015,-0.6061645313795839,-0.3310195438666966,-0.023536232954118646,0.2862464053757318,0.5680647467311586,0.7943870854121091,0.9431032919218906,0.9996848199254319,0.9586040448913948,0.8238742748349058,0.6086576778405213,0.333979429138917,0.026673696687629467,-0.2832378717202264,-0.5654790561147303,-0.792476841951085,-0.9420551132101841,-0.9996011057844066,-0.9594929736144951,-0.8256490042248672,-0.6111448290923069,-0.336936024751608,-0.029810897688250668,0.280226548203782,0.5628877955936812,0.7905587926829739,0.9409976553623693,0.9995075456857675,0.9603724514405382,0.8274156010657022,0.6136259606367831,0.339889301582596,0.032947805054907915,-0.277212464487594,-0.5602909906916338,-0.7886329565003436,-0.9399309287943014,-0.9994041405510709,-0.9612424697067672,-0.8291740479566323,-0.6161010480350851,-0.34283923054252285,-0.03608438788941912,0.27419565026004544,0.5576886669868222,0.7866993523724624,0.9388549440130859,0.9992908913988456,0.9621030198436008,0.8309243275771547,0.6185700669078826,0.3457857825748805,0.03922061529679882,-0.2711761352364146,-0.5550808501118398,-0.7847579993451116,-0.9377697116170661,-0.9991677993445831,-0.9629540933747177,-0.8326664226872137,-0.6210329929355844,-0.34872892865646543,-0.04235645638556246,0.26815394915858226,0.5524675657533876,0.7828089165404264,0.936675242295658,0.9990348656007261,0.96379568191714,0.8344003161273698,0.6234898018587186,0.3516686397976222,0.04549188026803067,-0.2651291217947388,-0.5498488396520201,-0.7808521231565962,-0.9355715468292605,-0.9988920914766568,-0.964627777181316,-0.8361259908189689,-0.6259404694779603,-0.3546048870425292,-0.04862685606063354,0.262101682939091,0.5472246976018927,0.7788876384678417,0.9344586360891488,0.9987394783786844,0.9654503709712016,0.8378434297642868,0.6283849716545113,0.35753764146948386,0.05176135288421477,-0.2590716624115685,-0.5445951654505448,-0.7769154818241144,-0.9333365210373676,-0.9985770278100303,-0.9662634551843411,-0.8395526160467932,-0.6308232843103022,-0.36046687419118745,-0.05489533986433586,0.25603909005753006,0.5419602690984952,0.7749356726509338,0.932205212726623,0.9984047413708145,0.9670670218119474,0.8412535328311724,0.6332553834282297,0.36339255635502954,0.058028786131580204,-0.2530039957474698,-0.5393200344992116,-0.7729482304491959,-0.9310647223001737,-0.9982226207580387,-0.96786106293898,-0.8429461633635869,-0.635681245052393,-0.36631465914337236,-0.06116166082185717,0.2499664093767659,0.5366744876587057,0.7709531747949812,0.929915060991721,0.9980306677655703,0.9686455707442129,0.8446304909718177,0.6381008452883301,0.36923315377383464,0.0642939330767061,-0.24692636086521347,-0.5340236546353143,-0.7689505253393617,-0.9287562401252987,-0.9978288842841246,-0.9694205375003553,-0.8463064990654289,-0.6405141603032528,-0.372148011499575,-0.06742557204360021,0.24388388015698906,0.531367561539442,0.7669403018082076,0.9275882711151608,0.9976172723012461,0.9701859555740613,0.8479741711359305,0.6429211663262817,0.3750592036095751,0.07055654687620605,-0.24083899722018282,-0.5287062345333049,-0.764922524001993,-0.92641116546567,-0.9973958339012919,-0.9709418174260496,-0.8496334907569417,-0.6453218396486803,-0.3779667014289227,-0.0736868267348654,0.23779174204654666,0.5260396998306723,0.7628972117956005,0.9252249347711833,0.9971645712653989,0.9716881156111666,0.8512844415843522,0.6477161566240883,0.3808704763190936,0.07681638078663186,-0.23474214465119866,-0.5233679836966091,-0.7608643851381259,-0.9240295907159387,-0.996923486671481,-0.9724248427784598,-0.8529270073564835,-0.650104093668755,-0.38377049967819304,-0.07994517820575266,0.23169023507232764,0.5206911124472162,0.7588240640526814,0.9228251450739569,0.9966725824941941,0.9731519916712501,0.854561171894249,0.6524856272617711,0.38666674294140213,0.0830731881739278,-0.22863604337089707,-0.5180091124493722,-0.7567762686361985,-0.9216116097088566,-0.9964118612049159,-0.9738695551272032,-0.856186919101313,-0.6548607339453004,-0.3895591775810116,-0.08620037988061353,0.2255795996303491,0.515322010120473,0.75472101905923,0.9203889965738408,0.9961413253717215,0.9745775260784005,0.8578042329642498,0.6572293903247778,0.392447775106868,0.08932672252332598,-0.22252093395630818,-0.5126298319281722,-0.7526583355657805,-0.9191573177115103,-0.9958609776593583,-0.9752758975514083,-0.8594130975527011,-0.6595915730692735,-0.39533250706661316,-0.09245218530794436,0.21946007647628463,0.5099326043901199,0.7505882384729903,0.9179165852537624,0.9955708208292194,0.9759646626673468,0.8610134970195331,0.6619472589115217,0.39821334504596406,0.09557673744901445,-0.21639705733937772,-0.5072303540737015,-0.7485107481711102,-0.9166668114216711,-0.9952708577393169,-0.9766438146419576,-0.8626054156009698,-0.6642964246482838,-0.40109026066899317,-0.09870034817005174,0.21333190671597888,0.5045231075958151,0.7464258851231844,0.915408008525367,0.9949610913442529,0.9773133467856706,0.864188837616839,0.6666390471405432,0.4039632255984075,0.10182298670384461,-0.21026465479747436,-0.5018108916224547,-0.7443336698648776,-0.9141401889639159,-0.9946415246951916,-0.9779732525036703,-0.8657637474705903,-0.6689751033137342,-0.40683221153582827,-0.10494462229275738,0.20719533179594798,0.49909373286867864,0.742234123004273,0.9128633652251971,0.9943121609398281,0.9786235252959509,0.8673301296495403,0.671304570157968,0.4096971902220689,0.10806522418903322,-0.20412396794392718,-0.49637165809819284,-0.7401272652216693,-0.9115775498857795,-0.9939730033223582,-0.9792641587574173,-0.868887968725002,-0.6736274247282602,-0.41255813343741415,-0.11118476165509714,0.20105059349391047,0.4936446941231253,0.7380131172693769,0.9102827556107986,0.9936240551834458,0.9798951465778981,0.8704372493524369,0.6759436441447565,0.4154150130018772,0.11430320396383638,-0.1979752387183097,-0.49091286780376203,-0.7358916999715134,-0.9089789951538405,-0.9932653199601932,-0.9805164825422256,-0.8719779562716067,-0.6782532055929582,-0.4182678007755587,-0.11742052039899199,0.1948979339090865,0.4881762060482828,0.733763034223799,0.9076662813567794,0.9928968011860967,0.9811281605303109,0.8735100743067227,0.6805560863239468,0.4211164686588021,0.12053668025532817,-0.1918187093772789,-0.4854347358124958,-0.7316271409933499,-0.9063446271497066,-0.9925185024910269,-0.9817301745172043,-0.8750335883665958,-0.6828522636545916,-0.42396098859255155,-0.12365165283902345,0.1887375954529215,0.4826884840995721,0.7294840413184877,0.9050140455507666,0.9921304276011831,0.9823225185731316,0.8765484834447852,0.6851417149678389,0.42680133255860797,0.12676540746792872,-0.18565462248463727,-0.47993747795977987,-0.7273337563084709,-0.903674549666037,-0.9917325803390618,-0.9829051868635711,-0.8780547446197461,-0.6874244177128364,-0.4296374725799053,-0.1298779134719581,0.18256982083936055,0.4771817444902179,0.7251763071433783,0.9023261526894006,0.9913249646234078,0.983478173649306,0.8795523570549659,0.6897003494052205,0.43246938072078567,0.13298914019325794,-0.17948322090203797,-0.4744213108345682,-0.7230117150738399,-0.9009688679024149,-0.9909075844691926,-0.9840414732864815,-0.8810413059991534,-0.6919694876273221,-0.4352970290872748,-0.1360990569865977,0.17639485307532915,0.4716562041827501,0.7208400014208419,0.899602708674191,0.9904804439875632,0.98459508022666,0.8825215767863192,0.694231810028387,0.43812038982733664,0.1392076332196493,-0.1733047477793072,-0.4688864517707705,-0.7186611875755181,-0.8982276884612228,-0.9900435473858052,-0.985138989016872,-0.883993154835964,-0.6964872943247957,-0.4409394351312281,-0.14231483827328917,0.1702129354511811,0.4661120808803767,0.7164752949989377,0.8968438208073135,0.9895968989673004,0.9856731942996854,0.8854560256532107,0.6987359183002837,0.44375413723165225,0.14542064154189963,-0.16711944654490793,-0.4633331188388077,-0.7142823452219105,-0.8954511193434026,-0.9891405031314853,-0.9861976908132347,-0.8869101748289475,-0.7009776598061435,-0.4465644684041123,-0.14852501243367047,0.1640243115310248,0.4605495930185245,0.7120823598447122,0.8940495977874416,0.9886743643738104,0.9867124733912886,0.88835558803997,0.7032124967615073,0.4493704009671648,0.15162792037087813,-0.1609275608962609,-0.4577615308369411,-0.709875360536965,-0.8926392699442591,-0.9881984872856829,-0.9872175369632974,-0.8897922510491216,-0.7054404071534685,-0.4521719072826919,-0.15472933479027517,0.157829225143259,0.45496895975617396,0.707661369037362,0.8912201497054245,0.9877128765544417,0.9877128765544417,0.8912201497054245,0.707661369037362,0.45496895975617396,0.157829225143259,-0.15472933479027517,-0.4521719072826919,-0.7054404071534685,-0.8897922510491216,-0.9872175369632974,-0.9881984872856829,-0.8926392699442591,-0.709875360536965,-0.4577615308369411,-0.1609275608962609,0.15162792037087813,0.4493704009671648,0.7032124967615073,0.88835558803997,0.9867124733912886,0.9886743643738104,0.8940495977874416,0.7120823598447122,0.4605495930185245,0.1640243115310248,-0.14852501243367047,-0.4465644684041123,-0.7009776598061435,-0.8869101748289475,-0.9861976908132347,-0.9891405031314853,-0.8954511193434026,-0.7142823452219105,-0.4633331188388077,-0.16711944654490793,0.14542064154189963,0.44375413723165225,0.6987359183002837,0.8854560256532107,0.9856731942996854,0.9895968989673004,0.8968438208073135,0.7164752949989377,0.4661120808803767,0.1702129354511811,-0.14231483827328917,-0.4409394351312281,-0.6964872943247957,-0.883993154835964,-0.985138989016872,-0.9900435473858052,-0.8982276884612228,-0.7186611875755181,-0.4688864517707705,-0.1733047477793072,0.1392076332196493,0.43812038982733664,0.694231810028387,0.8825215767863192,0.98459508022666,0.9904804439875632,0.899602708674191,0.7208400014208419,0.4716562041827501,0.17639485307532915,-0.1360990569865977,-0.4352970290872748,-0.6919694876273221,-0.8810413059991534,-0.9840414732864815,-0.9909075844691926,-0.9009688679024149,-0.7230117150738399,-0.4744213108345682,-0.17948322090203797,0.13298914019325794,0.43246938072078567,0.6897003494052205,0.8795523570549659,0.983478173649306,0.9913249646234078,0.9023261526894006,0.7251763071433783,0.4771817444902179,0.18256982083936055,-0.1298779134719581,-0.4296374725799053,-0.6874244177128364,-0.8780547446197461,-0.9829051868635711,-0.9917325803390618,-0.903674549666037,-0.7273337563084709,-0.47993747795977987,-0.18565462248463727,0.12676540746792872,0.42680133255860797,0.6851417149678389,0.8765484834447852,0.9823225185731316,0.9921304276011831,0.9050140455507666,0.7294840413184877,0.4826884840995721,0.1887375954529215,-0.12365165283902345,-0.42396098859255155,-0.6828522636545916,-0.8750335883665958,-0.9817301745172043,-0.9925185024910269,-0.9063446271497066,-0.7316271409933499,-0.4854347358124958,-0.1918187093772789,0.12053668025532817,0.4211164686588021,0.6805560863239468,0.8735100743067227,0.9811281605303109,0.9928968011860967,0.9076662813567794,0.733763034223799,0.4881762060482828,0.1948979339090865,-0.11742052039899199,-0.4182678007755587,-0.6782532055929582,-0.8719779562716067,-0.9805164825422256,-0.9932653199601932,-0.9089789951538405,-0.7358916999715134,-0.49091286780376203,-0.1979752387183097,0.11430320396383638,0.4154150130018772,0.6759436441447565,0.8704372493524369,0.9798951465778981,0.9936240551834483,0.9102827556107986,0.7380131172693769,0.4936446941231253,0.2010505934938886,-0.11118476165507495,-0.41255813343741415,-0.6736274247282602,-0.868887968725002,-0.9792641587574219,-0.9939730033223606,-0.9115775498857795,-0.7401272652216693,-0.49637165809819284,-0.20412396794390533,0.10806522418901103,0.4096971902220689,0.671304570157968,0.8673301296495514,0.9786235252959554,0.9943121609398304,0.9128633652251971,0.742234123004273,0.4990937328686593,0.2071953317959698,-0.10494462229273517,-0.40683221153582827,-0.6689751033137342,-0.8657637474706015,-0.9779732525036656,-0.9946415246951916,-0.9141401889639159,-0.7443336698648776,-0.5018108916224354,-0.21026465479749618,0.10182298670384461,0.4039632255984075,0.6666390471405432,0.8641888376168502,0.977313346785666,0.994961091344254,0.915408008525367,0.746425885123177,0.5045231075957959,0.21333190671598978,-0.09870034817004063,-0.40109026066899317,-0.6642964246482921,-0.8626054156009811,-0.9766438146419552,-0.9952708577393169,-0.9166668114216711,-0.7485107481711027,-0.5072303540737207,-0.21639705733938863,0.09557673744901445,0.39821334504597433,0.6619472589115301,0.8610134970195218,0.9759646626673444,0.9955708208292194,0.917916585253758,0.7505882384729755,0.5099326043901391,0.2194600764762955,-0.09245218530794436,-0.3953325070666234,-0.6595915730692903,-0.8594130975526897,-0.9752758975514059,-0.9958609776593583,-0.9191573177115059,-0.7526583355657658,-0.5126298319281818,-0.22252093395631906,0.08932672252332598,0.3924477751068783,0.6572293903247945,0.857804232964244,0.9745775260784005,0.9961413253717215,0.9203889965738364,0.7547210190592446,0.5153220101204826,0.2255795996303491,-0.08620037988062465,-0.3895591775810219,-0.6548607339452835,-0.8561869191013072,-0.9738695551272032,-0.996411861204915,-0.9216116097088523,-0.7567762686362132,-0.5180091124493816,-0.22863604337089707,0.08307318817393891,0.3866667429414227,0.6524856272617542,0.8545611718942432,0.9731519916712501,0.9966725824941932,0.9228251450739483,0.7588240640526888,0.5206911124472257,0.23169023507232764,-0.07994517820576379,-0.38377049967821364,-0.6501040936687466,-0.8529270073564835,-0.9724248427784598,-0.9969234866714801,-0.9240295907159473,-0.7608643851381333,-0.5233679836966091,-0.2347421446511878,0.07681638078664299,0.38087047631907295,0.6477161566240799,0.8512844415843522,0.9716881156111692,0.997164571265398,0.9252249347711918,0.7628972117956078,0.5260396998306723,0.2377917420465358,-0.07368682673488768,-0.377966701428902,-0.6453218396486717,-0.8496334907569417,-0.9709418174260522,-0.9973958339012903,-0.9264111654656743,-0.7649225240020002,-0.5287062345333049,-0.240838997220172,0.07055654687622831,0.3750592036095648,0.6429211663262817,0.8479741711359305,0.970185955574064,0.9976172723012476,0.9275882711151651,0.7669403018082076,0.5313675615394325,0.24388388015697823,-0.06742557204357794,-0.3721480114995646,-0.6405141603032528,-0.8463064990654348,-0.969420537500358,-0.9978288842841261,-0.9287562401253028,-0.7689505253393617,-0.5340236546353049,-0.24692636086519185,0.06429393307668381,0.36923315377382426,0.6381008452883301,0.8446304909718237,0.9686455707442184,0.998030667765571,0.9299150609917252,0.7709531747949812,0.5366744876586964,0.24996640937674428,-0.061161660821846035,-0.36631465914337236,-0.635681245052393,-0.8429461633635928,-0.9678610629389743,-0.9982226207580394,-0.9310647223001737,-0.7729482304491959,-0.5393200344992022,-0.2530039957474914,0.05802878613156907,0.36339255635502954,0.6332553834282384,0.8412535328311784,0.9670670218119417,0.998404741370815,0.932205212726623,0.7749356726509268,0.5419602690984764,0.25603909005755165,-0.05489533986432472,-0.36046687419118745,-0.6308232843103109,-0.8395526160468053,-0.9662634551843382,-0.9985770278100309,-0.9333365210373676,-0.7769154818241074,-0.5445951654505261,-0.25907166241157925,0.05176135288421477,0.35753764146948386,0.62838497165452,0.8378434297642989,0.9654503709711987,0.9987394783786846,0.9344586360891468,0.7788876384678312,0.5472246976019114,0.26210168293910174,-0.04862685606063354,-0.3546048870425344,-0.6259404694779733,-0.8361259908189598,-0.964627777181313,-0.9988920914766568,-0.9355715468292566,-0.7808521231565857,-0.5498488396520341,-0.26512912179474957,0.04549188026803067,0.35166863979763263,0.6234898018587317,0.8344003161273605,0.9637956819171385,0.9990348656007261,0.9366752422956541,0.7828089165404125,0.5524675657534015,0.26815394915858765,-0.042356456385568036,-0.34872892865647587,-0.621032992935602,-0.8326664226872075,-0.9629540933747162,-0.9991677993445829,-0.9377697116170602,-0.7847579993451254,-0.5550808501118492,-0.2711761352364146,0.039220615296804394,0.3457857825748962,0.6185700669078694,0.8309243275771485,0.9621030198436008,0.9992908913988454,0.9388549440130801,0.7866993523724727,0.5576886669868315,0.27419565026004544,-0.036084387889430275,-0.34283923054253856,-0.6161010480350719,-0.8291740479566292,-0.9612424697067672,-0.9994041405510704,-0.9399309287942939,-0.7886329565003539,-0.5602909906916385,-0.27721246448758863,0.032947805054919066,0.339889301582617,0.6136259606367743,0.8274156010656991,0.9603724514405397,0.9995075456857669,0.9409976553623769,0.7905587926829808,0.5628877955936812,0.2802265482037766,-0.029810897688267404,-0.336936024751587,-0.6111448290922982,-0.8256490042248672,-0.9594929736144967,-0.9996011057844062,-0.9420551132101898,-0.7924768419510918,-0.5654790561147303,-0.2832378717202157,0.026673696687646204,0.33397942913890116,0.6086576778405168,0.8238742748349058,0.958604044891398,0.9996848199254315,0.9431032919218952,0.7943870854121124,0.5680647467311564,0.28624640537571844,-0.02353623295414096,-0.33101954386668336,-0.6061645313795795,-0.8220914303767047,-0.9577056740270887,-0.9997586872842681,-0.944142181173051,-0.7962895042503662,-0.5706448419742021,-0.28925211953656665,0.020398537391405534,0.32805639808947074,0.6036654142667051,0.820300488411075,0.9567978698704206,0.9998227071333311,0.9451717707307156,0.798184079727241,0.5732193164302217,0.2922549845968164,-0.017260640905388435,-0.3250900209939134,-0.6011603511179073,-0.8185014665785936,-0.9558806413631618,-0.9998768788420319,-0.9461920504535485,-0.8000707931813836,-0.5757881447409338,-0.2952549709785873,0.014122574404014453,0.32212044179848953,0.5986493666077767,0.8166943825994217,0.9549539975399092,0.9999212018767858,0.94720301029191,0.8019496260288792,0.5783513016036692,0.29825204913235326,-0.010984368796883007,-0.31914768975321905,-0.5961324854692258,-0.8148792542731318,-0.9540179475279998,-0.9999556758010154,-0.9482046402879605,-0.8038205597634389,-0.5809087617716256,-0.3012461895372342,0.007846054994965093,0.31617179413937,0.5936097324932488,0.8130560994785322,0.9530725005474194,0.9999803002751568,0.9491969305757576,0.8056835759565766,0.5834605000541087,0.30423736270128643,-0.004707663910292526,-0.3131927842691791,-0.5910811325286766,-0.8112249361734913,-0.952117665910714,-0.9999950750566616,-0.950179871381355,-0.8075386562577938,-0.5860064913167861,-0.3072255391617929,0.0015692264556651531,0.3102106894855545,0.5885467104819324,0.8093857823947597,0.9511534530228968,1.0,0.9511534530228968,0.8093857823947597,0.5885467104819324,0.3102106894855545,0.0015692264556651531,-0.3072255391617929,-0.5860064913167861,-0.8075386562577938,-0.950179871381355,-0.9999950750566616,-0.952117665910714,-0.8112249361734913,-0.5910811325286766,-0.3131927842691791,-0.004707663910292526,0.30423736270128643,0.5834605000541087,0.8056835759565766,0.9491969305757576,0.9999803002751568,0.9530725005474194,0.8130560994785322,0.5936097324932488,0.31617179413937,0.007846054994965093,-0.3012461895372342,-0.5809087617716256,-0.8038205597634389,-0.9482046402879605,-0.9999556758010154,-0.9540179475279998,-0.8148792542731318,-0.5961324854692258,-0.31914768975321905,-0.010984368796883007,0.29825204913235326,0.5783513016036692,0.8019496260288792,0.94720301029191,0.9999212018767858,0.9549539975399092,0.8166943825994217,0.5986493666077767,0.32212044179848953,0.014122574404014453,-0.2952549709785873,-0.5757881447409338,-0.8000707931813836,-0.9461920504535485,-0.9998768788420319,-0.9558806413631618,-0.8185014665785936,-0.6011603511179073,-0.3250900209939134,-0.017260640905388435,0.2922549845968164,0.5732193164302217,0.798184079727241,0.9451717707307156,0.9998227071333311,0.9567978698704206,0.820300488411075,0.6036654142667051,0.32805639808947074,0.020398537391405534,-0.28925211953656665,-0.5706448419742021,-0.7962895042503662,-0.944142181173051,-0.9997586872842681,-0.9577056740270887,-0.8220914303767047,-0.6061645313795795,-0.33101954386668336,-0.02353623295414096,0.28624640537571844,0.5680647467311564,0.7943870854121124,0.9431032919218952,0.9996848199254315,0.958604044891398,0.8238742748349058,0.6086576778405168,0.33397942913890116,0.026673696687646204,-0.2832378717202157,-0.5654790561147303,-0.7924768419510918,-0.9420551132101898,-0.9996011057844062,-0.9594929736144967,-0.8256490042248672,-0.6111448290922982,-0.336936024751587,-0.029810897688267404,0.2802265482037766,0.5628877955936812,0.7905587926829808,0.9409976553623769,0.9995075456857669,0.9603724514405397,0.8274156010656991,0.6136259606367743,0.339889301582617,0.032947805054919066,-0.27721246448758863,-0.5602909906916385,-0.7886329565003539,-0.9399309287942939,-0.9994041405510704,-0.9612424697067672,-0.8291740479566292,-0.6161010480350719,-0.34283923054253856,-0.036084387889430275,0.27419565026004544,0.5576886669868315,0.7866993523724727,0.9388549440130801,0.9992908913988454,0.9621030198436008,0.8309243275771485,0.6185700669078694,0.3457857825748962,0.039220615296804394,-0.2711761352364146,-0.5550808501118492,-0.7847579993451254,-0.9377697116170602,-0.9991677993445829,-0.9629540933747162,-0.8326664226872075,-0.621032992935602,-0.34872892865647587,-0.042356456385568036,0.26815394915858765,0.5524675657534015,0.7828089165404125,0.9366752422956541,0.9990348656007261,0.9637956819171385,0.8344003161273605,0.6234898018587317,0.35166863979763263,0.04549188026803067,-0.26512912179474957,-0.5498488396520341,-0.7808521231565857,-0.9355715468292566,-0.9988920914766568,-0.964627777181313,-0.8361259908189598,-0.6259404694779733,-0.3546048870425344,-0.04862685606063354,0.26210168293910174,0.5472246976019114,0.7788876384678312,0.9344586360891468,0.9987394783786846,0.9654503709711987,0.8378434297642989,0.62838497165452,0.35753764146948386,0.05176135288421477,-0.25907166241157925,-0.5445951654505261,-0.7769154818241074,-0.9333365210373676,-0.9985770278100309,-0.9662634551843382,-0.8395526160468053,-0.6308232843103109,-0.36046687419118745,-0.05489533986432472,0.25603909005755165,0.5419602690984764,0.7749356726509268,0.932205212726623,0.998404741370815,0.9670670218119417,0.8412535328311784,0.6332553834282384,0.36339255635502954,0.05802878613156907,-0.2530039957474914,-0.5393200344992022,-0.7729482304491959,-0.9310647223001737,-0.9982226207580394,-0.9678610629389743,-0.8429461633635928,-0.635681245052393,-0.36631465914337236,-0.061161660821846035,0.24996640937674428,0.5366744876586964,0.7709531747949812,0.9299150609917252,0.998030667765571,0.9686455707442184,0.8446304909718237,0.6381008452883301,0.36923315377382426,0.06429393307668381,-0.24692636086519185,-0.5340236546353049,-0.7689505253393617,-0.9287562401253028,-0.9978288842841261,-0.969420537500358,-0.8463064990654348,-0.6405141603032528,-0.3721480114995646,-0.06742557204357794,0.24388388015697823,0.5313675615394325,0.7669403018082076,0.9275882711151651,0.9976172723012476,0.970185955574064,0.8479741711359305,0.6429211663262817,0.3750592036095648,0.07055654687622831,-0.240838997220172,-0.5287062345333049,-0.7649225240020002,-0.9264111654656743,-0.9973958339012903,-0.9709418174260522,-0.8496334907569417,-0.6453218396486717,-0.377966701428902,-0.07368682673488768,0.2377917420465358,0.5260396998306723,0.7628972117956078,0.9252249347711918,0.997164571265398,0.9716881156111692,0.8512844415843522,0.6477161566240799,0.38087047631907295,0.07681638078664299,-0.2347421446511878,-0.5233679836966091,-0.7608643851381333,-0.9240295907159473,-0.9969234866714801,-0.9724248427784598,-0.8529270073564835,-0.6501040936687466,-0.38377049967821364,-0.07994517820576379,0.23169023507232764,0.5206911124472257,0.7588240640526888,0.9228251450739483,0.9966725824941932,0.9731519916712501,0.8545611718942432,0.6524856272617542,0.3866667429414227,0.08307318817393891,-0.22863604337089707,-0.5180091124493816,-0.7567762686362132,-0.9216116097088523,-0.996411861204915,-0.9738695551272032,-0.8561869191013072,-0.6548607339452835,-0.3895591775810219,-0.08620037988062465,0.2255795996303491,0.5153220101204826,0.7547210190592446,0.9203889965738364,0.9961413253717215,0.9745775260784005,0.857804232964244,0.6572293903247945,0.3924477751068783,0.08932672252332598,-0.22252093395631906,-0.5126298319281818,-0.7526583355657658,-0.9191573177115059,-0.9958609776593583,-0.9752758975514059,-0.8594130975526897,-0.6595915730692903,-0.3953325070666234,-0.09245218530794436,0.2194600764762955,0.5099326043901391,0.7505882384729755,0.917916585253758,0.9955708208292194,0.9759646626673444,0.8610134970195218,0.6619472589115301,0.39821334504597433,0.09557673744901445,-0.21639705733938863,-0.5072303540737207,-0.7485107481711027,-0.9166668114216711,-0.9952708577393169,-0.9766438146419552,-0.8626054156009811,-0.6642964246482921,-0.40109026066899317,-0.09870034817004063,0.21333190671598978,0.5045231075957959,0.746425885123177,0.915408008525367,0.994961091344254,0.977313346785666,0.8641888376168502,0.6666390471405432,0.4039632255984075,0.10182298670384461,-0.21026465479749618,-0.5018108916224354,-0.7443336698648776,-0.9141401889639159,-0.9946415246951916,-0.9779732525036656,-0.8657637474706015,-0.6689751033137342,-0.40683221153582827,-0.10494462229273517,0.2071953317959698,0.4990937328686593,0.742234123004273,0.9128633652251971,0.9943121609398304,0.9786235252959554,0.8673301296495514,0.671304570157968,0.4096971902220689,0.10806522418901103,-0.20412396794390533,-0.49637165809819284,-0.7401272652216693,-0.9115775498857795,-0.9939730033223606,-0.9792641587574219,-0.868887968725002,-0.6736274247282602,-0.41255813343741415,-0.11118476165507495,0.2010505934938886,0.4936446941231253,0.7380131172693769,0.9102827556107986,0.9936240551834483,0.9798951465778981,0.8704372493524369,0.6759436441447565,0.4154150130018772,0.11430320396383638,-0.1979752387183097,-0.49091286780376203,-0.7358916999715134,-0.9089789951538405,-0.9932653199601932,-0.9805164825422256,-0.8719779562716067,-0.6782532055929582,-0.4182678007755587,-0.11742052039899199,0.1948979339090865,0.4881762060482828,0.733763034223799,0.9076662813567794,0.9928968011860967,0.9811281605303109,0.8735100743067227,0.6805560863239468,0.4211164686588021,0.12053668025532817,-0.1918187093772789,-0.4854347358124958,-0.7316271409933499,-0.9063446271497066,-0.9925185024910269,-0.9817301745172043,-0.8750335883665958,-0.6828522636545916,-0.42396098859255155,-0.12365165283902345,0.1887375954529215,0.4826884840995721,0.7294840413184877,0.9050140455507666,0.9921304276011831,0.9823225185731316,0.8765484834447852,0.6851417149678389,0.42680133255860797,0.12676540746792872,-0.18565462248463727,-0.47993747795977987,-0.7273337563084709,-0.903674549666037,-0.9917325803390618,-0.9829051868635711,-0.8780547446197461,-0.6874244177128364,-0.4296374725799053,-0.1298779134719581,0.18256982083936055,0.4771817444902179,0.7251763071433783,0.9023261526894006,0.9913249646234078,0.983478173649306,0.8795523570549659,0.6897003494052205,0.43246938072078567,0.13298914019325794,-0.17948322090203797,-0.4744213108345682,-0.7230117150738399,-0.9009688679024149,-0.9909075844691926,-0.9840414732864815,-0.8810413059991534,-0.6919694876273221,-0.4352970290872748,-0.1360990569865977,0.17639485307532915,0.4716562041827501,0.7208400014208419,0.899602708674191,0.9904804439875632,0.98459508022666,0.8825215767863192,0.694231810028387,0.43812038982733664,0.1392076332196493,-0.1733047477793072,-0.4688864517707705,-0.7186611875755181,-0.8982276884612228,-0.9900435473858052,-0.985138989016872,-0.883993154835964,-0.6964872943247957,-0.4409394351312281,-0.14231483827328917,0.1702129354511811,0.4661120808803767,0.7164752949989377,0.8968438208073135,0.9895968989673004,0.9856731942996854,0.8854560256532107,0.6987359183002837,0.44375413723165225,0.14542064154189963,-0.16711944654490793,-0.4633331188388077,-0.7142823452219105,-0.8954511193434026,-0.9891405031314853,-0.9861976908132347,-0.8869101748289475,-0.7009776598061435,-0.4465644684041123,-0.14852501243367047,0.1640243115310248,0.4605495930185245,0.7120823598447122,0.8940495977874416,0.9886743643738104,0.9867124733912886,0.88835558803997,0.7032124967615073,0.4493704009671648,0.15162792037087813,-0.1609275608962609,-0.4577615308369411,-0.709875360536965,-0.8926392699442591,-0.9881984872856829,-0.9872175369632974,-0.8897922510491216,-0.7054404071534685,-0.4521719072826919,-0.15472933479027517,0.157829225143259,0.45496895975617396,0.707661369037362,0.8912201497054245,0.9877128765544417,0.9877128765544417,0.8912201497054245,0.707661369037362,0.45496895975617396,0.157829225143259,-0.15472933479027517,-0.4521719072826919,-0.7054404071534685,-0.8897922510491216,-0.9872175369632974,-0.9881984872856829,-0.8926392699442591,-0.709875360536965,-0.4577615308369411,-0.1609275608962609,0.15162792037087813,0.4493704009671648,0.7032124967615073,0.88835558803997,0.9867124733912886,0.9886743643738104,0.8940495977874416,0.7120823598447122,0.4605495930185245,0.1640243115310248,-0.14852501243367047,-0.4465644684041123,-0.7009776598061435,-0.8869101748289475,-0.9861976908132347,-0.9891405031314853,-0.8954511193434026,-0.7142823452219105,-0.4633331188388077,-0.16711944654490793,0.14542064154189963,0.44375413723165225,0.6987359183002837,0.8854560256532107,0.9856731942996854,0.9895968989673004,0.8968438208073135,0.7164752949989377,0.4661120808803767,0.1702129354511811,-0.14231483827328917,-0.4409394351312281,-0.6964872943247957,-0.883993154835964,-0.985138989016872,-0.9900435473858052,-0.8982276884612228,-0.7186611875755181,-0.4688864517707705,-0.1733047477793072,0.1392076332196493,0.43812038982733664,0.694231810028387,0.8825215767863192,0.98459508022666,0.9904804439875632,0.899602708674191,0.7208400014208419,0.4716562041827501,0.17639485307532915,-0.1360990569865977,-0.4352970290872748,-0.6919694876273221,-0.8810413059991534,-0.9840414732864815,-0.9909075844691926,-0.9009688679024149,-0.7230117150738399,-0.4744213108345682,-0.17948322090203797,0.13298914019325794,0.43246938072078567,0.6897003494052205,0.8795523570549659,0.983478173649306,0.9913249646234078,0.9023261526894006,0.7251763071433783,0.4771817444902179,0.18256982083936055,-0.1298779134719581,-0.4296374725799053,-0.6874244177128364,-0.8780547446197461,-0.9829051868635711,-0.9917325803390618,-0.903674549666037,-0.7273337563084709,-0.47993747795977987,-0.18565462248463727,0.12676540746792872,0.42680133255860797,0.6851417149678389,0.8765484834447852,0.9823225185731316,0.9921304276011831,0.9050140455507666,0.7294840413184877,0.4826884840995721,0.1887375954529215,-0.12365165283902345,-0.42396098859255155,-0.6828522636545916,-0.8750335883665958,-0.9817301745172043,-0.9925185024910269,-0.9063446271497066,-0.7316271409933499,-0.4854347358124958,-0.1918187093772789,0.12053668025532817,0.4211164686588021,0.6805560863239468,0.8735100743067227,0.9811281605303109,0.9928968011860967,0.9076662813567794,0.733763034223799,0.4881762060482828,0.1948979339090865,-0.11742052039899199,-0.4182678007755587,-0.6782532055929582,-0.8719779562716067,-0.9805164825422256,-0.9932653199601932,-0.9089789951538405,-0.7358916999715134,-0.49091286780376203,-0.1979752387183097,0.11430320396383638,0.4154150130018772,0.6759436441447565,0.8704372493524369,0.9798951465778981,0.9936240551834458,0.9102827556107986,0.7380131172693769,0.4936446941231253,0.20105059349391047,-0.11118476165509714,-0.41255813343741415,-0.6736274247282602,-0.868887968725002,-0.9792641587574173,-0.9939730033223582,-0.9115775498857795,-0.7401272652216693,-0.49637165809819284,-0.20412396794392718,0.10806522418903322,0.4096971902220689,0.671304570157968,0.8673301296495403,0.9786235252959509,0.9943121609398281,0.9128633652251971,0.742234123004273,0.49909373286867864,0.20719533179594798,-0.10494462229275738,-0.40683221153582827,-0.6689751033137342,-0.8657637474705903,-0.9779732525036703,-0.9946415246951916,-0.9141401889639159,-0.7443336698648776,-0.5018108916224547,-0.21026465479747436,0.10182298670384461,0.4039632255984075,0.6666390471405432,0.864188837616839,0.9773133467856706,0.9949610913442529,0.915408008525367,0.7464258851231844,0.5045231075958151,0.21333190671597888,-0.09870034817005174,-0.40109026066899317,-0.6642964246482838,-0.8626054156009698,-0.9766438146419576,-0.9952708577393169,-0.9166668114216711,-0.7485107481711102,-0.5072303540737015,-0.21639705733937772,0.09557673744901445,0.39821334504596406,0.6619472589115217,0.8610134970195331,0.9759646626673468,0.9955708208292194,0.9179165852537624,0.7505882384729903,0.5099326043901199,0.21946007647628463,-0.09245218530794436,-0.39533250706661316,-0.6595915730692735,-0.8594130975527011,-0.9752758975514083,-0.9958609776593583,-0.9191573177115103,-0.7526583355657805,-0.5126298319281722,-0.22252093395630818,0.08932672252332598,0.392447775106868,0.6572293903247778,0.8578042329642498,0.9745775260784005,0.9961413253717215,0.9203889965738408,0.75472101905923,0.515322010120473,0.2255795996303491,-0.08620037988061353,-0.3895591775810116,-0.6548607339453004,-0.856186919101313,-0.9738695551272032,-0.9964118612049159,-0.9216116097088566,-0.7567762686361985,-0.5180091124493722,-0.22863604337089707,0.0830731881739278,0.38666674294140213,0.6524856272617711,0.854561171894249,0.9731519916712501,0.9966725824941941,0.9228251450739569,0.7588240640526814,0.5206911124472162,0.23169023507232764,-0.07994517820575266,-0.38377049967819304,-0.650104093668755,-0.8529270073564835,-0.9724248427784598,-0.996923486671481,-0.9240295907159387,-0.7608643851381259,-0.5233679836966091,-0.23474214465119866,0.07681638078663186,0.3808704763190936,0.6477161566240883,0.8512844415843522,0.9716881156111666,0.9971645712653989,0.9252249347711833,0.7628972117956005,0.5260396998306723,0.23779174204654666,-0.0736868267348654,-0.3779667014289227,-0.6453218396486803,-0.8496334907569417,-0.9709418174260496,-0.9973958339012919,-0.92641116546567,-0.764922524001993,-0.5287062345333049,-0.24083899722018282,0.07055654687620605,0.3750592036095751,0.6429211663262817,0.8479741711359305,0.9701859555740613,0.9976172723012461,0.9275882711151608,0.7669403018082076,0.531367561539442,0.24388388015698906,-0.06742557204360021,-0.372148011499575,-0.6405141603032528,-0.8463064990654289,-0.9694205375003553,-0.9978288842841246,-0.9287562401252987,-0.7689505253393617,-0.5340236546353143,-0.24692636086521347,0.0642939330767061,0.36923315377383464,0.6381008452883301,0.8446304909718177,0.9686455707442129,0.9980306677655703,0.929915060991721,0.7709531747949812,0.5366744876587057,0.2499664093767659,-0.06116166082185717,-0.36631465914337236,-0.635681245052393,-0.8429461633635869,-0.96786106293898,-0.9982226207580387,-0.9310647223001737,-0.7729482304491959,-0.5393200344992116,-0.2530039957474698,0.058028786131580204,0.36339255635502954,0.6332553834282297,0.8412535328311724,0.9670670218119474,0.9984047413708145,0.932205212726623,0.7749356726509338,0.5419602690984952,0.25603909005753006,-0.05489533986433586,-0.36046687419118745,-0.6308232843103022,-0.8395526160467932,-0.9662634551843411,-0.9985770278100303,-0.9333365210373676,-0.7769154818241144,-0.5445951654505448,-0.2590716624115685,0.05176135288421477,0.35753764146948386,0.6283849716545113,0.8378434297642868,0.9654503709712016,0.9987394783786844,0.9344586360891488,0.7788876384678417,0.5472246976018927,0.262101682939091,-0.04862685606063354,-0.3546048870425292,-0.6259404694779603,-0.8361259908189689,-0.964627777181316,-0.9988920914766568,-0.9355715468292605,-0.7808521231565962,-0.5498488396520201,-0.2651291217947388,0.04549188026803067,0.3516686397976222,0.6234898018587186,0.8344003161273698,0.96379568191714,0.9990348656007261,0.936675242295658,0.7828089165404264,0.5524675657533876,0.26815394915858226,-0.04235645638556246,-0.34872892865646543,-0.6210329929355844,-0.8326664226872137,-0.9629540933747177,-0.9991677993445831,-0.9377697116170661,-0.7847579993451116,-0.5550808501118398,-0.2711761352364146,0.03922061529679882,0.3457857825748805,0.6185700669078826,0.8309243275771547,0.9621030198436008,0.9992908913988456,0.9388549440130859,0.7866993523724624,0.5576886669868222,0.27419565026004544,-0.03608438788941912,-0.34283923054252285,-0.6161010480350851,-0.8291740479566323,-0.9612424697067672,-0.9994041405510709,-0.9399309287943014,-0.7886329565003436,-0.5602909906916338,-0.277212464487594,0.032947805054907915,0.339889301582596,0.6136259606367831,0.8274156010657022,0.9603724514405382,0.9995075456857675,0.9409976553623693,0.7905587926829739,0.5628877955936812,0.280226548203782,-0.029810897688250668,-0.336936024751608,-0.6111448290923069,-0.8256490042248672,-0.9594929736144951,-0.9996011057844066,-0.9420551132101841,-0.792476841951085,-0.5654790561147303,-0.2832378717202264,0.026673696687629467,0.333979429138917,0.6086576778405213,0.8238742748349058,0.9586040448913948,0.9996848199254319,0.9431032919218906,0.7943870854121091,0.5680647467311586,0.2862464053757318,-0.023536232954118646,-0.3310195438666966,-0.6061645313795839,-0.8220914303767015,-0.9577056740270846,-0.9997586872842676,-0.9441421811730474,-0.7962895042503644,-0.5706448419742066,-0.28925211953658264,0.020398537391425064,0.3280563980894813,0.6036654142667051,0.8203004884110702,0.9567978698704157,0.9998227071333307,0.9451717707307128,0.798184079727241,0.5732193164302286,0.29225498459683513,-0.017260640905405175,-0.3250900209939213,-0.6011603511179051,-0.8185014665785871,-0.9558806413631561,-0.9998768788420318,-0.9461920504535466,-0.8000707931813853,-0.5757881447409429,-0.2952549709786086,0.014122574404028403,0.3221204417984948,0.5986493666077721,0.8166943825994136,0.9549539975399158,0.9999212018767856,0.9472030102919091,0.8019496260288834,0.5783513016036816,0.2982520491323346,-0.010984368796894167,-0.31914768975322033,-0.596132485469219,-0.8148792542731221,-0.9540179475280053,-0.9999556758010154,-0.9482046402879605,-0.8038205597634447,-0.5809087617716404,-0.3012461895372182,0.007846054994972068,0.31617179413936874,0.5936097324932398,0.8130560994785208,0.9530725005474241,0.9999803002751568,0.9491969305757587,0.8056835759565839,0.5834605000541262,0.3042373627012731,-0.0047076639102974095,-0.31319278426917446,-0.5910811325286653,-0.811224936173504,-0.9521176659107179,-0.9999950750566616,-0.950179871381357,-0.8075386562578029,-0.58600649131677,-0.30722553916178263,0.0015692264556667226,0.3102106894855472,0.5885467104819188,0.8093857823947705,0.9511534530228996,1.0],"x":[-100.0,-99.9000999000999,-99.8001998001998,-99.7002997002997,-99.6003996003996,-99.5004995004995,-99.4005994005994,-99.3006993006993,-99.2007992007992,-99.1008991008991,-99.000999000999,-98.9010989010989,-98.80119880119881,-98.7012987012987,-98.6013986013986,-98.5014985014985,-98.4015984015984,-98.3016983016983,-98.2017982017982,-98.1018981018981,-98.001998001998,-97.9020979020979,-97.8021978021978,-97.7022977022977,-97.6023976023976,-97.5024975024975,-97.40259740259741,-97.3026973026973,-97.2027972027972,-97.1028971028971,-97.002997002997,-96.90309690309691,-96.8031968031968,-96.7032967032967,-96.6033966033966,-96.5034965034965,-96.40359640359641,-96.3036963036963,-96.2037962037962,-96.1038961038961,-96.00399600399601,-95.90409590409591,-95.8041958041958,-95.7042957042957,-95.6043956043956,-95.50449550449551,-95.4045954045954,-95.3046953046953,-95.2047952047952,-95.1048951048951,-95.00499500499501,-94.9050949050949,-94.8051948051948,-94.7052947052947,-94.60539460539461,-94.50549450549451,-94.4055944055944,-94.3056943056943,-94.2057942057942,-94.10589410589411,-94.00599400599401,-93.9060939060939,-93.8061938061938,-93.7062937062937,-93.60639360639361,-93.50649350649351,-93.4065934065934,-93.3066933066933,-93.20679320679321,-93.10689310689311,-93.00699300699301,-92.9070929070929,-92.8071928071928,-92.70729270729271,-92.60739260739261,-92.5074925074925,-92.4075924075924,-92.3076923076923,-92.20779220779221,-92.10789210789211,-92.007992007992,-91.9080919080919,-91.80819180819181,-91.70829170829171,-91.60839160839161,-91.5084915084915,-91.4085914085914,-91.30869130869131,-91.20879120879121,-91.10889110889111,-91.008991008991,-90.9090909090909,-90.80919080919081,-90.70929070929071,-90.60939060939062,-90.5094905094905,-90.40959040959041,-90.30969030969031,-90.20979020979021,-90.10989010989012,-90.00999000999,-89.91008991008991,-89.81018981018981,-89.71028971028971,-89.6103896103896,-89.5104895104895,-89.41058941058941,-89.31068931068931,-89.21078921078922,-89.1108891108891,-89.01098901098901,-88.91108891108891,-88.81118881118881,-88.71128871128872,-88.6113886113886,-88.51148851148851,-88.41158841158841,-88.31168831168831,-88.21178821178822,-88.1118881118881,-88.01198801198801,-87.91208791208791,-87.81218781218782,-87.71228771228772,-87.61238761238761,-87.51248751248751,-87.41258741258741,-87.31268731268732,-87.21278721278722,-87.11288711288711,-87.01298701298701,-86.91308691308691,-86.81318681318682,-86.7132867132867,-86.61338661338661,-86.51348651348651,-86.41358641358642,-86.31368631368632,-86.21378621378621,-86.11388611388611,-86.01398601398601,-85.91408591408592,-85.81418581418582,-85.71428571428571,-85.61438561438561,-85.51448551448551,-85.41458541458542,-85.31468531468532,-85.21478521478521,-85.11488511488511,-85.01498501498502,-84.91508491508492,-84.81518481518482,-84.71528471528471,-84.61538461538461,-84.51548451548452,-84.41558441558442,-84.31568431568432,-84.21578421578421,-84.11588411588411,-84.01598401598402,-83.91608391608392,-83.81618381618381,-83.71628371628371,-83.61638361638362,-83.51648351648352,-83.41658341658342,-83.31668331668331,-83.21678321678321,-83.11688311688312,-83.01698301698302,-82.91708291708292,-82.81718281718281,-82.71728271728271,-82.61738261738262,-82.51748251748252,-82.41758241758242,-82.31768231768231,-82.21778221778222,-82.11788211788212,-82.01798201798202,-81.91808191808192,-81.81818181818181,-81.71828171828172,-81.61838161838162,-81.51848151848152,-81.41858141858143,-81.31868131868131,-81.21878121878122,-81.11888111888112,-81.01898101898102,-80.91908091908093,-80.81918081918081,-80.71928071928072,-80.61938061938062,-80.51948051948052,-80.41958041958041,-80.31968031968032,-80.21978021978022,-80.11988011988012,-80.01998001998003,-79.92007992007991,-79.82017982017982,-79.72027972027972,-79.62037962037962,-79.52047952047953,-79.42057942057941,-79.32067932067932,-79.22077922077922,-79.12087912087912,-79.02097902097903,-78.92107892107892,-78.82117882117882,-78.72127872127872,-78.62137862137862,-78.52147852147853,-78.42157842157842,-78.32167832167832,-78.22177822177822,-78.12187812187813,-78.02197802197803,-77.92207792207792,-77.82217782217782,-77.72227772227772,-77.62237762237763,-77.52247752247752,-77.42257742257742,-77.32267732267732,-77.22277722277722,-77.12287712287713,-77.02297702297702,-76.92307692307692,-76.82317682317682,-76.72327672327673,-76.62337662337663,-76.52347652347652,-76.42357642357642,-76.32367632367632,-76.22377622377623,-76.12387612387613,-76.02397602397602,-75.92407592407592,-75.82417582417582,-75.72427572427573,-75.62437562437563,-75.52447552447552,-75.42457542457542,-75.32467532467533,-75.22477522477523,-75.12487512487513,-75.02497502497502,-74.92507492507492,-74.82517482517483,-74.72527472527473,-74.62537462537462,-74.52547452547452,-74.42557442557442,-74.32567432567433,-74.22577422577423,-74.12587412587412,-74.02597402597402,-73.92607392607393,-73.82617382617383,-73.72627372627373,-73.62637362637362,-73.52647352647352,-73.42657342657343,-73.32667332667333,-73.22677322677323,-73.12687312687312,-73.02697302697302,-72.92707292707293,-72.82717282717283,-72.72727272727273,-72.62737262737262,-72.52747252747253,-72.42757242757243,-72.32767232767233,-72.22777222777223,-72.12787212787212,-72.02797202797203,-71.92807192807193,-71.82817182817183,-71.72827172827172,-71.62837162837162,-71.52847152847153,-71.42857142857143,-71.32867132867133,-71.22877122877122,-71.12887112887113,-71.02897102897103,-70.92907092907093,-70.82917082917083,-70.72927072927072,-70.62937062937063,-70.52947052947053,-70.42957042957043,-70.32967032967034,-70.22977022977022,-70.12987012987013,-70.02997002997003,-69.93006993006993,-69.83016983016984,-69.73026973026973,-69.63036963036963,-69.53046953046953,-69.43056943056943,-69.33066933066934,-69.23076923076923,-69.13086913086913,-69.03096903096903,-68.93106893106894,-68.83116883116882,-68.73126873126873,-68.63136863136863,-68.53146853146853,-68.43156843156844,-68.33166833166833,-68.23176823176823,-68.13186813186813,-68.03196803196803,-67.93206793206794,-67.83216783216783,-67.73226773226773,-67.63236763236763,-67.53246753246754,-67.43256743256744,-67.33266733266733,-67.23276723276723,-67.13286713286713,-67.03296703296704,-66.93306693306694,-66.83316683316683,-66.73326673326673,-66.63336663336663,-66.53346653346654,-66.43356643356644,-66.33366633366633,-66.23376623376623,-66.13386613386614,-66.03396603396604,-65.93406593406593,-65.83416583416583,-65.73426573426573,-65.63436563436564,-65.53446553446554,-65.43456543456543,-65.33466533466533,-65.23476523476523,-65.13486513486514,-65.03496503496504,-64.93506493506493,-64.83516483516483,-64.73526473526474,-64.63536463536464,-64.53546453546454,-64.43556443556443,-64.33566433566433,-64.23576423576424,-64.13586413586414,-64.03596403596404,-63.93606393606394,-63.836163836163834,-63.73626373626374,-63.63636363636363,-63.536463536463536,-63.43656343656344,-63.336663336663335,-63.23676323676324,-63.136863136863134,-63.03696303696304,-62.93706293706294,-62.837162837162836,-62.73726273726274,-62.637362637362635,-62.53746253746254,-62.437562437562434,-62.33766233766234,-62.23776223776224,-62.137862137862136,-62.03796203796204,-61.938061938061935,-61.83816183816184,-61.73826173826174,-61.63836163836164,-61.53846153846154,-61.438561438561436,-61.33866133866134,-61.23876123876124,-61.13886113886114,-61.03896103896104,-60.93906093906094,-60.83916083916084,-60.739260739260736,-60.63936063936064,-60.53946053946054,-60.43956043956044,-60.33966033966034,-60.23976023976024,-60.13986013986014,-60.03996003996004,-59.94005994005994,-59.84015984015984,-59.74025974025974,-59.64035964035964,-59.54045954045954,-59.44055944055944,-59.34065934065934,-59.24075924075924,-59.14085914085914,-59.04095904095904,-58.94105894105894,-58.841158841158844,-58.74125874125874,-58.64135864135864,-58.54145854145854,-58.44155844155844,-58.341658341658345,-58.24175824175824,-58.141858141858144,-58.04195804195804,-57.94205794205794,-57.84215784215784,-57.74225774225774,-57.642357642357645,-57.54245754245754,-57.442557442557444,-57.34265734265734,-57.24275724275724,-57.142857142857146,-57.04295704295704,-56.943056943056945,-56.84315684315684,-56.743256743256744,-56.64335664335665,-56.54345654345654,-56.443556443556446,-56.34365634365634,-56.243756243756245,-56.14385614385614,-56.043956043956044,-55.94405594405595,-55.84415584415584,-55.744255744255746,-55.64435564435564,-55.544455544455545,-55.44455544455545,-55.344655344655344,-55.24475524475525,-55.14485514485514,-55.044955044955046,-54.94505494505494,-54.845154845154845,-54.74525474525475,-54.645354645354644,-54.54545454545455,-54.44555444555444,-54.345654345654346,-54.24575424575425,-54.145854145854145,-54.04595404595405,-53.946053946053944,-53.84615384615385,-53.74625374625375,-53.646353646353646,-53.54645354645355,-53.446553446553445,-53.34665334665335,-53.246753246753244,-53.14685314685315,-53.04695304695305,-52.947052947052946,-52.84715284715285,-52.747252747252745,-52.64735264735265,-52.54745254745255,-52.44755244755245,-52.34765234765235,-52.247752247752246,-52.14785214785215,-52.047952047952045,-51.94805194805195,-51.84815184815185,-51.74825174825175,-51.64835164835165,-51.548451548451546,-51.44855144855145,-51.34865134865135,-51.24875124875125,-51.14885114885115,-51.04895104895105,-50.94905094905095,-50.84915084915085,-50.74925074925075,-50.64935064935065,-50.54945054945055,-50.44955044955045,-50.34965034965035,-50.24975024975025,-50.14985014985015,-50.04995004995005,-49.95004995004995,-49.85014985014985,-49.75024975024975,-49.65034965034965,-49.55044955044955,-49.45054945054945,-49.35064935064935,-49.25074925074925,-49.15084915084915,-49.05094905094905,-48.95104895104895,-48.85114885114885,-48.75124875124875,-48.65134865134865,-48.55144855144855,-48.451548451548454,-48.35164835164835,-48.25174825174825,-48.15184815184815,-48.05194805194805,-47.952047952047955,-47.85214785214785,-47.752247752247754,-47.65234765234765,-47.55244755244755,-47.45254745254745,-47.35264735264735,-47.252747252747255,-47.15284715284715,-47.052947052947054,-46.95304695304695,-46.85314685314685,-46.753246753246756,-46.65334665334665,-46.553446553446555,-46.45354645354645,-46.353646353646354,-46.25374625374625,-46.15384615384615,-46.053946053946056,-45.95404595404595,-45.854145854145855,-45.75424575424575,-45.654345654345654,-45.55444555444556,-45.45454545454545,-45.354645354645356,-45.25474525474525,-45.154845154845155,-45.05494505494506,-44.955044955044954,-44.85514485514486,-44.75524475524475,-44.655344655344656,-44.55544455544455,-44.455544455544455,-44.35564435564436,-44.255744255744254,-44.15584415584416,-44.05594405594405,-43.956043956043956,-43.85614385614386,-43.756243756243755,-43.65634365634366,-43.556443556443554,-43.45654345654346,-43.35664335664335,-43.256743256743256,-43.15684315684316,-43.056943056943055,-42.95704295704296,-42.857142857142854,-42.75724275724276,-42.65734265734266,-42.557442557442556,-42.45754245754246,-42.357642357642355,-42.25774225774226,-42.15784215784216,-42.05794205794206,-41.95804195804196,-41.858141858141856,-41.75824175824176,-41.658341658341655,-41.55844155844156,-41.45854145854146,-41.35864135864136,-41.25874125874126,-41.158841158841156,-41.05894105894106,-40.95904095904096,-40.85914085914086,-40.75924075924076,-40.65934065934066,-40.55944055944056,-40.45954045954046,-40.35964035964036,-40.25974025974026,-40.15984015984016,-40.05994005994006,-39.96003996003996,-39.86013986013986,-39.76023976023976,-39.66033966033966,-39.56043956043956,-39.46053946053946,-39.36063936063936,-39.260739260739264,-39.16083916083916,-39.06093906093906,-38.96103896103896,-38.86113886113886,-38.76123876123876,-38.66133866133866,-38.561438561438564,-38.46153846153846,-38.36163836163836,-38.26173826173826,-38.16183816183816,-38.061938061938065,-37.96203796203796,-37.862137862137864,-37.76223776223776,-37.66233766233766,-37.562437562437566,-37.46253746253746,-37.362637362637365,-37.26273726273726,-37.162837162837164,-37.06293706293706,-36.96303696303696,-36.863136863136866,-36.76323676323676,-36.663336663336665,-36.56343656343656,-36.463536463536464,-36.36363636363637,-36.26373626373626,-36.163836163836166,-36.06393606393606,-35.964035964035965,-35.86413586413586,-35.764235764235764,-35.66433566433567,-35.56443556443556,-35.464535464535466,-35.36463536463536,-35.264735264735265,-35.16483516483517,-35.064935064935064,-34.96503496503497,-34.86513486513486,-34.765234765234766,-34.66533466533467,-34.565434565434565,-34.46553446553447,-34.365634365634364,-34.26573426573427,-34.16583416583416,-34.065934065934066,-33.96603396603397,-33.866133866133865,-33.76623376623377,-33.666333666333664,-33.56643356643357,-33.46653346653347,-33.366633366633366,-33.26673326673327,-33.166833166833165,-33.06693306693307,-32.967032967032964,-32.86713286713287,-32.76723276723277,-32.667332667332666,-32.56743256743257,-32.467532467532465,-32.36763236763237,-32.26773226773227,-32.16783216783217,-32.06793206793207,-31.96803196803197,-31.86813186813187,-31.768231768231768,-31.668331668331668,-31.568431568431567,-31.46853146853147,-31.36863136863137,-31.26873126873127,-31.16883116883117,-31.068931068931068,-30.969030969030968,-30.86913086913087,-30.76923076923077,-30.66933066933067,-30.56943056943057,-30.46953046953047,-30.369630369630368,-30.26973026973027,-30.16983016983017,-30.06993006993007,-29.97002997002997,-29.87012987012987,-29.77022977022977,-29.67032967032967,-29.57042957042957,-29.47052947052947,-29.37062937062937,-29.27072927072927,-29.170829170829172,-29.070929070929072,-28.97102897102897,-28.87112887112887,-28.77122877122877,-28.67132867132867,-28.571428571428573,-28.471528471528472,-28.371628371628372,-28.27172827172827,-28.17182817182817,-28.07192807192807,-27.972027972027973,-27.872127872127873,-27.772227772227772,-27.672327672327672,-27.57242757242757,-27.47252747252747,-27.372627372627374,-27.272727272727273,-27.172827172827173,-27.072927072927072,-26.973026973026972,-26.873126873126875,-26.773226773226774,-26.673326673326674,-26.573426573426573,-26.473526473526473,-26.373626373626372,-26.273726273726275,-26.173826173826175,-26.073926073926074,-25.974025974025974,-25.874125874125873,-25.774225774225773,-25.674325674325676,-25.574425574425575,-25.474525474525475,-25.374625374625374,-25.274725274725274,-25.174825174825173,-25.074925074925076,-24.975024975024976,-24.875124875124875,-24.775224775224775,-24.675324675324674,-24.575424575424574,-24.475524475524477,-24.375624375624376,-24.275724275724276,-24.175824175824175,-24.075924075924075,-23.976023976023978,-23.876123876123877,-23.776223776223777,-23.676323676323676,-23.576423576423576,-23.476523476523475,-23.376623376623378,-23.276723276723278,-23.176823176823177,-23.076923076923077,-22.977022977022976,-22.877122877122876,-22.77722277722278,-22.677322677322678,-22.577422577422578,-22.477522477522477,-22.377622377622377,-22.277722277722276,-22.17782217782218,-22.07792207792208,-21.978021978021978,-21.878121878121878,-21.778221778221777,-21.678321678321677,-21.57842157842158,-21.47852147852148,-21.37862137862138,-21.278721278721278,-21.178821178821178,-21.07892107892108,-20.97902097902098,-20.87912087912088,-20.77922077922078,-20.67932067932068,-20.579420579420578,-20.47952047952048,-20.37962037962038,-20.27972027972028,-20.17982017982018,-20.07992007992008,-19.98001998001998,-19.88011988011988,-19.78021978021978,-19.68031968031968,-19.58041958041958,-19.48051948051948,-19.38061938061938,-19.280719280719282,-19.18081918081918,-19.08091908091908,-18.98101898101898,-18.88111888111888,-18.781218781218783,-18.681318681318682,-18.581418581418582,-18.48151848151848,-18.38161838161838,-18.28171828171828,-18.181818181818183,-18.081918081918083,-17.982017982017982,-17.882117882117882,-17.78221778221778,-17.68231768231768,-17.582417582417584,-17.482517482517483,-17.382617382617383,-17.282717282717282,-17.182817182817182,-17.08291708291708,-16.983016983016984,-16.883116883116884,-16.783216783216783,-16.683316683316683,-16.583416583416582,-16.483516483516482,-16.383616383616385,-16.283716283716284,-16.183816183816184,-16.083916083916083,-15.984015984015985,-15.884115884115884,-15.784215784215784,-15.684315684315685,-15.584415584415584,-15.484515484515484,-15.384615384615385,-15.284715284715285,-15.184815184815184,-15.084915084915085,-14.985014985014985,-14.885114885114884,-14.785214785214785,-14.685314685314685,-14.585414585414586,-14.485514485514486,-14.385614385614385,-14.285714285714286,-14.185814185814186,-14.085914085914085,-13.986013986013987,-13.886113886113886,-13.786213786213786,-13.686313686313687,-13.586413586413586,-13.486513486513486,-13.386613386613387,-13.286713286713287,-13.186813186813186,-13.086913086913087,-12.987012987012987,-12.887112887112886,-12.787212787212788,-12.687312687312687,-12.587412587412587,-12.487512487512488,-12.387612387612387,-12.287712287712287,-12.187812187812188,-12.087912087912088,-11.988011988011989,-11.888111888111888,-11.788211788211788,-11.688311688311689,-11.588411588411589,-11.488511488511488,-11.38861138861139,-11.288711288711289,-11.188811188811188,-11.08891108891109,-10.989010989010989,-10.889110889110889,-10.78921078921079,-10.68931068931069,-10.589410589410589,-10.48951048951049,-10.38961038961039,-10.289710289710289,-10.18981018981019,-10.08991008991009,-9.99000999000999,-9.89010989010989,-9.79020979020979,-9.69030969030969,-9.59040959040959,-9.49050949050949,-9.390609390609391,-9.290709290709291,-9.19080919080919,-9.090909090909092,-8.991008991008991,-8.89110889110889,-8.791208791208792,-8.691308691308691,-8.591408591408591,-8.491508491508492,-8.391608391608392,-8.291708291708291,-8.191808191808192,-8.091908091908092,-7.992007992007992,-7.892107892107892,-7.792207792207792,-7.6923076923076925,-7.592407592407592,-7.492507492507492,-7.392607392607393,-7.292707292707293,-7.192807192807193,-7.092907092907093,-6.993006993006993,-6.893106893106893,-6.793206793206793,-6.693306693306694,-6.593406593406593,-6.4935064935064934,-6.393606393606394,-6.293706293706293,-6.193806193806194,-6.093906093906094,-5.994005994005994,-5.894105894105894,-5.794205794205794,-5.694305694305695,-5.594405594405594,-5.4945054945054945,-5.394605394605395,-5.294705294705294,-5.194805194805195,-5.094905094905095,-4.995004995004995,-4.895104895104895,-4.795204795204795,-4.695304695304696,-4.595404595404595,-4.495504495504496,-4.395604395604396,-4.2957042957042955,-4.195804195804196,-4.095904095904096,-3.996003996003996,-3.896103896103896,-3.796203796203796,-3.6963036963036964,-3.5964035964035963,-3.4965034965034967,-3.3966033966033966,-3.2967032967032965,-3.196803196803197,-3.096903096903097,-2.997002997002997,-2.897102897102897,-2.797202797202797,-2.6973026973026974,-2.5974025974025974,-2.4975024975024973,-2.3976023976023977,-2.2977022977022976,-2.197802197802198,-2.097902097902098,-1.998001998001998,-1.898101898101898,-1.7982017982017982,-1.6983016983016983,-1.5984015984015985,-1.4985014985014986,-1.3986013986013985,-1.2987012987012987,-1.1988011988011988,-1.098901098901099,-0.999000999000999,-0.8991008991008991,-0.7992007992007992,-0.6993006993006993,-0.5994005994005994,-0.4995004995004995,-0.3996003996003996,-0.2997002997002997,-0.1998001998001998,-0.0999000999000999,0.0,0.0999000999000999,0.1998001998001998,0.2997002997002997,0.3996003996003996,0.4995004995004995,0.5994005994005994,0.6993006993006993,0.7992007992007992,0.8991008991008991,0.999000999000999,1.098901098901099,1.1988011988011988,1.2987012987012987,1.3986013986013985,1.4985014985014986,1.5984015984015985,1.6983016983016983,1.7982017982017982,1.898101898101898,1.998001998001998,2.097902097902098,2.197802197802198,2.2977022977022976,2.3976023976023977,2.4975024975024973,2.5974025974025974,2.6973026973026974,2.797202797202797,2.897102897102897,2.997002997002997,3.096903096903097,3.196803196803197,3.2967032967032965,3.3966033966033966,3.4965034965034967,3.5964035964035963,3.6963036963036964,3.796203796203796,3.896103896103896,3.996003996003996,4.095904095904096,4.195804195804196,4.2957042957042955,4.395604395604396,4.495504495504496,4.595404595404595,4.695304695304696,4.795204795204795,4.895104895104895,4.995004995004995,5.094905094905095,5.194805194805195,5.294705294705294,5.394605394605395,5.4945054945054945,5.594405594405594,5.694305694305695,5.794205794205794,5.894105894105894,5.994005994005994,6.093906093906094,6.193806193806194,6.293706293706293,6.393606393606394,6.4935064935064934,6.593406593406593,6.693306693306694,6.793206793206793,6.893106893106893,6.993006993006993,7.092907092907093,7.192807192807193,7.292707292707293,7.392607392607393,7.492507492507492,7.592407592407592,7.6923076923076925,7.792207792207792,7.892107892107892,7.992007992007992,8.091908091908092,8.191808191808192,8.291708291708291,8.391608391608392,8.491508491508492,8.591408591408591,8.691308691308691,8.791208791208792,8.89110889110889,8.991008991008991,9.090909090909092,9.19080919080919,9.290709290709291,9.390609390609391,9.49050949050949,9.59040959040959,9.69030969030969,9.79020979020979,9.89010989010989,9.99000999000999,10.08991008991009,10.18981018981019,10.289710289710289,10.38961038961039,10.48951048951049,10.589410589410589,10.68931068931069,10.78921078921079,10.889110889110889,10.989010989010989,11.08891108891109,11.188811188811188,11.288711288711289,11.38861138861139,11.488511488511488,11.588411588411589,11.688311688311689,11.788211788211788,11.888111888111888,11.988011988011989,12.087912087912088,12.187812187812188,12.287712287712287,12.387612387612387,12.487512487512488,12.587412587412587,12.687312687312687,12.787212787212788,12.887112887112886,12.987012987012987,13.086913086913087,13.186813186813186,13.286713286713287,13.386613386613387,13.486513486513486,13.586413586413586,13.686313686313687,13.786213786213786,13.886113886113886,13.986013986013987,14.085914085914085,14.185814185814186,14.285714285714286,14.385614385614385,14.485514485514486,14.585414585414586,14.685314685314685,14.785214785214785,14.885114885114884,14.985014985014985,15.084915084915085,15.184815184815184,15.284715284715285,15.384615384615385,15.484515484515484,15.584415584415584,15.684315684315685,15.784215784215784,15.884115884115884,15.984015984015985,16.083916083916083,16.183816183816184,16.283716283716284,16.383616383616385,16.483516483516482,16.583416583416582,16.683316683316683,16.783216783216783,16.883116883116884,16.983016983016984,17.08291708291708,17.182817182817182,17.282717282717282,17.382617382617383,17.482517482517483,17.582417582417584,17.68231768231768,17.78221778221778,17.882117882117882,17.982017982017982,18.081918081918083,18.181818181818183,18.28171828171828,18.38161838161838,18.48151848151848,18.581418581418582,18.681318681318682,18.781218781218783,18.88111888111888,18.98101898101898,19.08091908091908,19.18081918081918,19.280719280719282,19.38061938061938,19.48051948051948,19.58041958041958,19.68031968031968,19.78021978021978,19.88011988011988,19.98001998001998,20.07992007992008,20.17982017982018,20.27972027972028,20.37962037962038,20.47952047952048,20.579420579420578,20.67932067932068,20.77922077922078,20.87912087912088,20.97902097902098,21.07892107892108,21.178821178821178,21.278721278721278,21.37862137862138,21.47852147852148,21.57842157842158,21.678321678321677,21.778221778221777,21.878121878121878,21.978021978021978,22.07792207792208,22.17782217782218,22.277722277722276,22.377622377622377,22.477522477522477,22.577422577422578,22.677322677322678,22.77722277722278,22.877122877122876,22.977022977022976,23.076923076923077,23.176823176823177,23.276723276723278,23.376623376623378,23.476523476523475,23.576423576423576,23.676323676323676,23.776223776223777,23.876123876123877,23.976023976023978,24.075924075924075,24.175824175824175,24.275724275724276,24.375624375624376,24.475524475524477,24.575424575424574,24.675324675324674,24.775224775224775,24.875124875124875,24.975024975024976,25.074925074925076,25.174825174825173,25.274725274725274,25.374625374625374,25.474525474525475,25.574425574425575,25.674325674325676,25.774225774225773,25.874125874125873,25.974025974025974,26.073926073926074,26.173826173826175,26.273726273726275,26.373626373626372,26.473526473526473,26.573426573426573,26.673326673326674,26.773226773226774,26.873126873126875,26.973026973026972,27.072927072927072,27.172827172827173,27.272727272727273,27.372627372627374,27.47252747252747,27.57242757242757,27.672327672327672,27.772227772227772,27.872127872127873,27.972027972027973,28.07192807192807,28.17182817182817,28.27172827172827,28.371628371628372,28.471528471528472,28.571428571428573,28.67132867132867,28.77122877122877,28.87112887112887,28.97102897102897,29.070929070929072,29.170829170829172,29.27072927072927,29.37062937062937,29.47052947052947,29.57042957042957,29.67032967032967,29.77022977022977,29.87012987012987,29.97002997002997,30.06993006993007,30.16983016983017,30.26973026973027,30.369630369630368,30.46953046953047,30.56943056943057,30.66933066933067,30.76923076923077,30.86913086913087,30.969030969030968,31.068931068931068,31.16883116883117,31.26873126873127,31.36863136863137,31.46853146853147,31.568431568431567,31.668331668331668,31.768231768231768,31.86813186813187,31.96803196803197,32.06793206793207,32.16783216783217,32.26773226773227,32.36763236763237,32.467532467532465,32.56743256743257,32.667332667332666,32.76723276723277,32.86713286713287,32.967032967032964,33.06693306693307,33.166833166833165,33.26673326673327,33.366633366633366,33.46653346653347,33.56643356643357,33.666333666333664,33.76623376623377,33.866133866133865,33.96603396603397,34.065934065934066,34.16583416583416,34.26573426573427,34.365634365634364,34.46553446553447,34.565434565434565,34.66533466533467,34.765234765234766,34.86513486513486,34.96503496503497,35.064935064935064,35.16483516483517,35.264735264735265,35.36463536463536,35.464535464535466,35.56443556443556,35.66433566433567,35.764235764235764,35.86413586413586,35.964035964035965,36.06393606393606,36.163836163836166,36.26373626373626,36.36363636363637,36.463536463536464,36.56343656343656,36.663336663336665,36.76323676323676,36.863136863136866,36.96303696303696,37.06293706293706,37.162837162837164,37.26273726273726,37.362637362637365,37.46253746253746,37.562437562437566,37.66233766233766,37.76223776223776,37.862137862137864,37.96203796203796,38.061938061938065,38.16183816183816,38.26173826173826,38.36163836163836,38.46153846153846,38.561438561438564,38.66133866133866,38.76123876123876,38.86113886113886,38.96103896103896,39.06093906093906,39.16083916083916,39.260739260739264,39.36063936063936,39.46053946053946,39.56043956043956,39.66033966033966,39.76023976023976,39.86013986013986,39.96003996003996,40.05994005994006,40.15984015984016,40.25974025974026,40.35964035964036,40.45954045954046,40.55944055944056,40.65934065934066,40.75924075924076,40.85914085914086,40.95904095904096,41.05894105894106,41.158841158841156,41.25874125874126,41.35864135864136,41.45854145854146,41.55844155844156,41.658341658341655,41.75824175824176,41.858141858141856,41.95804195804196,42.05794205794206,42.15784215784216,42.25774225774226,42.357642357642355,42.45754245754246,42.557442557442556,42.65734265734266,42.75724275724276,42.857142857142854,42.95704295704296,43.056943056943055,43.15684315684316,43.256743256743256,43.35664335664335,43.45654345654346,43.556443556443554,43.65634365634366,43.756243756243755,43.85614385614386,43.956043956043956,44.05594405594405,44.15584415584416,44.255744255744254,44.35564435564436,44.455544455544455,44.55544455544455,44.655344655344656,44.75524475524475,44.85514485514486,44.955044955044954,45.05494505494506,45.154845154845155,45.25474525474525,45.354645354645356,45.45454545454545,45.55444555444556,45.654345654345654,45.75424575424575,45.854145854145855,45.95404595404595,46.053946053946056,46.15384615384615,46.25374625374625,46.353646353646354,46.45354645354645,46.553446553446555,46.65334665334665,46.753246753246756,46.85314685314685,46.95304695304695,47.052947052947054,47.15284715284715,47.252747252747255,47.35264735264735,47.45254745254745,47.55244755244755,47.65234765234765,47.752247752247754,47.85214785214785,47.952047952047955,48.05194805194805,48.15184815184815,48.25174825174825,48.35164835164835,48.451548451548454,48.55144855144855,48.65134865134865,48.75124875124875,48.85114885114885,48.95104895104895,49.05094905094905,49.15084915084915,49.25074925074925,49.35064935064935,49.45054945054945,49.55044955044955,49.65034965034965,49.75024975024975,49.85014985014985,49.95004995004995,50.04995004995005,50.14985014985015,50.24975024975025,50.34965034965035,50.44955044955045,50.54945054945055,50.64935064935065,50.74925074925075,50.84915084915085,50.94905094905095,51.04895104895105,51.14885114885115,51.24875124875125,51.34865134865135,51.44855144855145,51.548451548451546,51.64835164835165,51.74825174825175,51.84815184815185,51.94805194805195,52.047952047952045,52.14785214785215,52.247752247752246,52.34765234765235,52.44755244755245,52.54745254745255,52.64735264735265,52.747252747252745,52.84715284715285,52.947052947052946,53.04695304695305,53.14685314685315,53.246753246753244,53.34665334665335,53.446553446553445,53.54645354645355,53.646353646353646,53.74625374625375,53.84615384615385,53.946053946053944,54.04595404595405,54.145854145854145,54.24575424575425,54.345654345654346,54.44555444555444,54.54545454545455,54.645354645354644,54.74525474525475,54.845154845154845,54.94505494505494,55.044955044955046,55.14485514485514,55.24475524475525,55.344655344655344,55.44455544455545,55.544455544455545,55.64435564435564,55.744255744255746,55.84415584415584,55.94405594405595,56.043956043956044,56.14385614385614,56.243756243756245,56.34365634365634,56.443556443556446,56.54345654345654,56.64335664335665,56.743256743256744,56.84315684315684,56.943056943056945,57.04295704295704,57.142857142857146,57.24275724275724,57.34265734265734,57.442557442557444,57.54245754245754,57.642357642357645,57.74225774225774,57.84215784215784,57.94205794205794,58.04195804195804,58.141858141858144,58.24175824175824,58.341658341658345,58.44155844155844,58.54145854145854,58.64135864135864,58.74125874125874,58.841158841158844,58.94105894105894,59.04095904095904,59.14085914085914,59.24075924075924,59.34065934065934,59.44055944055944,59.54045954045954,59.64035964035964,59.74025974025974,59.84015984015984,59.94005994005994,60.03996003996004,60.13986013986014,60.23976023976024,60.33966033966034,60.43956043956044,60.53946053946054,60.63936063936064,60.739260739260736,60.83916083916084,60.93906093906094,61.03896103896104,61.13886113886114,61.23876123876124,61.33866133866134,61.438561438561436,61.53846153846154,61.63836163836164,61.73826173826174,61.83816183816184,61.938061938061935,62.03796203796204,62.137862137862136,62.23776223776224,62.33766233766234,62.437562437562434,62.53746253746254,62.637362637362635,62.73726273726274,62.837162837162836,62.93706293706294,63.03696303696304,63.136863136863134,63.23676323676324,63.336663336663335,63.43656343656344,63.536463536463536,63.63636363636363,63.73626373626374,63.836163836163834,63.93606393606394,64.03596403596404,64.13586413586414,64.23576423576424,64.33566433566433,64.43556443556443,64.53546453546454,64.63536463536464,64.73526473526474,64.83516483516483,64.93506493506493,65.03496503496504,65.13486513486514,65.23476523476523,65.33466533466533,65.43456543456543,65.53446553446554,65.63436563436564,65.73426573426573,65.83416583416583,65.93406593406593,66.03396603396604,66.13386613386614,66.23376623376623,66.33366633366633,66.43356643356644,66.53346653346654,66.63336663336663,66.73326673326673,66.83316683316683,66.93306693306694,67.03296703296704,67.13286713286713,67.23276723276723,67.33266733266733,67.43256743256744,67.53246753246754,67.63236763236763,67.73226773226773,67.83216783216783,67.93206793206794,68.03196803196803,68.13186813186813,68.23176823176823,68.33166833166833,68.43156843156844,68.53146853146853,68.63136863136863,68.73126873126873,68.83116883116882,68.93106893106894,69.03096903096903,69.13086913086913,69.23076923076923,69.33066933066934,69.43056943056943,69.53046953046953,69.63036963036963,69.73026973026973,69.83016983016984,69.93006993006993,70.02997002997003,70.12987012987013,70.22977022977022,70.32967032967034,70.42957042957043,70.52947052947053,70.62937062937063,70.72927072927072,70.82917082917083,70.92907092907093,71.02897102897103,71.12887112887113,71.22877122877122,71.32867132867133,71.42857142857143,71.52847152847153,71.62837162837162,71.72827172827172,71.82817182817183,71.92807192807193,72.02797202797203,72.12787212787212,72.22777222777223,72.32767232767233,72.42757242757243,72.52747252747253,72.62737262737262,72.72727272727273,72.82717282717283,72.92707292707293,73.02697302697302,73.12687312687312,73.22677322677323,73.32667332667333,73.42657342657343,73.52647352647352,73.62637362637362,73.72627372627373,73.82617382617383,73.92607392607393,74.02597402597402,74.12587412587412,74.22577422577423,74.32567432567433,74.42557442557442,74.52547452547452,74.62537462537462,74.72527472527473,74.82517482517483,74.92507492507492,75.02497502497502,75.12487512487513,75.22477522477523,75.32467532467533,75.42457542457542,75.52447552447552,75.62437562437563,75.72427572427573,75.82417582417582,75.92407592407592,76.02397602397602,76.12387612387613,76.22377622377623,76.32367632367632,76.42357642357642,76.52347652347652,76.62337662337663,76.72327672327673,76.82317682317682,76.92307692307692,77.02297702297702,77.12287712287713,77.22277722277722,77.32267732267732,77.42257742257742,77.52247752247752,77.62237762237763,77.72227772227772,77.82217782217782,77.92207792207792,78.02197802197803,78.12187812187813,78.22177822177822,78.32167832167832,78.42157842157842,78.52147852147853,78.62137862137862,78.72127872127872,78.82117882117882,78.92107892107892,79.02097902097903,79.12087912087912,79.22077922077922,79.32067932067932,79.42057942057941,79.52047952047953,79.62037962037962,79.72027972027972,79.82017982017982,79.92007992007991,80.01998001998003,80.11988011988012,80.21978021978022,80.31968031968032,80.41958041958041,80.51948051948052,80.61938061938062,80.71928071928072,80.81918081918081,80.91908091908093,81.01898101898102,81.11888111888112,81.21878121878122,81.31868131868131,81.41858141858143,81.51848151848152,81.61838161838162,81.71828171828172,81.81818181818181,81.91808191808192,82.01798201798202,82.11788211788212,82.21778221778222,82.31768231768231,82.41758241758242,82.51748251748252,82.61738261738262,82.71728271728271,82.81718281718281,82.91708291708292,83.01698301698302,83.11688311688312,83.21678321678321,83.31668331668331,83.41658341658342,83.51648351648352,83.61638361638362,83.71628371628371,83.81618381618381,83.91608391608392,84.01598401598402,84.11588411588411,84.21578421578421,84.31568431568432,84.41558441558442,84.51548451548452,84.61538461538461,84.71528471528471,84.81518481518482,84.91508491508492,85.01498501498502,85.11488511488511,85.21478521478521,85.31468531468532,85.41458541458542,85.51448551448551,85.61438561438561,85.71428571428571,85.81418581418582,85.91408591408592,86.01398601398601,86.11388611388611,86.21378621378621,86.31368631368632,86.41358641358642,86.51348651348651,86.61338661338661,86.7132867132867,86.81318681318682,86.91308691308691,87.01298701298701,87.11288711288711,87.21278721278722,87.31268731268732,87.41258741258741,87.51248751248751,87.61238761238761,87.71228771228772,87.81218781218782,87.91208791208791,88.01198801198801,88.1118881118881,88.21178821178822,88.31168831168831,88.41158841158841,88.51148851148851,88.6113886113886,88.71128871128872,88.81118881118881,88.91108891108891,89.01098901098901,89.1108891108891,89.21078921078922,89.31068931068931,89.41058941058941,89.5104895104895,89.6103896103896,89.71028971028971,89.81018981018981,89.91008991008991,90.00999000999,90.10989010989012,90.20979020979021,90.30969030969031,90.40959040959041,90.5094905094905,90.60939060939062,90.70929070929071,90.80919080919081,90.9090909090909,91.008991008991,91.10889110889111,91.20879120879121,91.30869130869131,91.4085914085914,91.5084915084915,91.60839160839161,91.70829170829171,91.80819180819181,91.9080919080919,92.007992007992,92.10789210789211,92.20779220779221,92.3076923076923,92.4075924075924,92.5074925074925,92.60739260739261,92.70729270729271,92.8071928071928,92.9070929070929,93.00699300699301,93.10689310689311,93.20679320679321,93.3066933066933,93.4065934065934,93.50649350649351,93.60639360639361,93.7062937062937,93.8061938061938,93.9060939060939,94.00599400599401,94.10589410589411,94.2057942057942,94.3056943056943,94.4055944055944,94.50549450549451,94.60539460539461,94.7052947052947,94.8051948051948,94.9050949050949,95.00499500499501,95.1048951048951,95.2047952047952,95.3046953046953,95.4045954045954,95.50449550449551,95.6043956043956,95.7042957042957,95.8041958041958,95.90409590409591,96.00399600399601,96.1038961038961,96.2037962037962,96.3036963036963,96.40359640359641,96.5034965034965,96.6033966033966,96.7032967032967,96.8031968031968,96.90309690309691,97.002997002997,97.1028971028971,97.2027972027972,97.3026973026973,97.40259740259741,97.5024975024975,97.6023976023976,97.7022977022977,97.8021978021978,97.9020979020979,98.001998001998,98.1018981018981,98.2017982017982,98.3016983016983,98.4015984015984,98.5014985014985,98.6013986013986,98.7012987012987,98.80119880119881,98.9010989010989,99.000999000999,99.1008991008991,99.2007992007992,99.3006993006993,99.4005994005994,99.5004995004995,99.6003996003996,99.7002997002997,99.8001998001998,99.9000999000999,100.0]}

},{}],33:[function(require,module,exports){
module.exports={"expected":[1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0,-1.0,1.0],"x":[-1000.0,-999.0,-998.0,-997.0,-996.0,-995.0,-994.0,-993.0,-992.0,-991.0,-990.0,-989.0,-988.0,-987.0,-986.0,-985.0,-984.0,-983.0,-982.0,-981.0,-980.0,-979.0,-978.0,-977.0,-976.0,-975.0,-974.0,-973.0,-972.0,-971.0,-970.0,-969.0,-968.0,-967.0,-966.0,-965.0,-964.0,-963.0,-962.0,-961.0,-960.0,-959.0,-958.0,-957.0,-956.0,-955.0,-954.0,-953.0,-952.0,-951.0,-950.0,-949.0,-948.0,-947.0,-946.0,-945.0,-944.0,-943.0,-942.0,-941.0,-940.0,-939.0,-938.0,-937.0,-936.0,-935.0,-934.0,-933.0,-932.0,-931.0,-930.0,-929.0,-928.0,-927.0,-926.0,-925.0,-924.0,-923.0,-922.0,-921.0,-920.0,-919.0,-918.0,-917.0,-916.0,-915.0,-914.0,-913.0,-912.0,-911.0,-910.0,-909.0,-908.0,-907.0,-906.0,-905.0,-904.0,-903.0,-902.0,-901.0,-900.0,-899.0,-898.0,-897.0,-896.0,-895.0,-894.0,-893.0,-892.0,-891.0,-890.0,-889.0,-888.0,-887.0,-886.0,-885.0,-884.0,-883.0,-882.0,-881.0,-880.0,-879.0,-878.0,-877.0,-876.0,-875.0,-874.0,-873.0,-872.0,-871.0,-870.0,-869.0,-868.0,-867.0,-866.0,-865.0,-864.0,-863.0,-862.0,-861.0,-860.0,-859.0,-858.0,-857.0,-856.0,-855.0,-854.0,-853.0,-852.0,-851.0,-850.0,-849.0,-848.0,-847.0,-846.0,-845.0,-844.0,-843.0,-842.0,-841.0,-840.0,-839.0,-838.0,-837.0,-836.0,-835.0,-834.0,-833.0,-832.0,-831.0,-830.0,-829.0,-828.0,-827.0,-826.0,-825.0,-824.0,-823.0,-822.0,-821.0,-820.0,-819.0,-818.0,-817.0,-816.0,-815.0,-814.0,-813.0,-812.0,-811.0,-810.0,-809.0,-808.0,-807.0,-806.0,-805.0,-804.0,-803.0,-802.0,-801.0,-800.0,-799.0,-798.0,-797.0,-796.0,-795.0,-794.0,-793.0,-792.0,-791.0,-790.0,-789.0,-788.0,-787.0,-786.0,-785.0,-784.0,-783.0,-782.0,-781.0,-780.0,-779.0,-778.0,-777.0,-776.0,-775.0,-774.0,-773.0,-772.0,-771.0,-770.0,-769.0,-768.0,-767.0,-766.0,-765.0,-764.0,-763.0,-762.0,-761.0,-760.0,-759.0,-758.0,-757.0,-756.0,-755.0,-754.0,-753.0,-752.0,-751.0,-750.0,-749.0,-748.0,-747.0,-746.0,-745.0,-744.0,-743.0,-742.0,-741.0,-740.0,-739.0,-738.0,-737.0,-736.0,-735.0,-734.0,-733.0,-732.0,-731.0,-730.0,-729.0,-728.0,-727.0,-726.0,-725.0,-724.0,-723.0,-722.0,-721.0,-720.0,-719.0,-718.0,-717.0,-716.0,-715.0,-714.0,-713.0,-712.0,-711.0,-710.0,-709.0,-708.0,-707.0,-706.0,-705.0,-704.0,-703.0,-702.0,-701.0,-700.0,-699.0,-698.0,-697.0,-696.0,-695.0,-694.0,-693.0,-692.0,-691.0,-690.0,-689.0,-688.0,-687.0,-686.0,-685.0,-684.0,-683.0,-682.0,-681.0,-680.0,-679.0,-678.0,-677.0,-676.0,-675.0,-674.0,-673.0,-672.0,-671.0,-670.0,-669.0,-668.0,-667.0,-666.0,-665.0,-664.0,-663.0,-662.0,-661.0,-660.0,-659.0,-658.0,-657.0,-656.0,-655.0,-654.0,-653.0,-652.0,-651.0,-650.0,-649.0,-648.0,-647.0,-646.0,-645.0,-644.0,-643.0,-642.0,-641.0,-640.0,-639.0,-638.0,-637.0,-636.0,-635.0,-634.0,-633.0,-632.0,-631.0,-630.0,-629.0,-628.0,-627.0,-626.0,-625.0,-624.0,-623.0,-622.0,-621.0,-620.0,-619.0,-618.0,-617.0,-616.0,-615.0,-614.0,-613.0,-612.0,-611.0,-610.0,-609.0,-608.0,-607.0,-606.0,-605.0,-604.0,-603.0,-602.0,-601.0,-600.0,-599.0,-598.0,-597.0,-596.0,-595.0,-594.0,-593.0,-592.0,-591.0,-590.0,-589.0,-588.0,-587.0,-586.0,-585.0,-584.0,-583.0,-582.0,-581.0,-580.0,-579.0,-578.0,-577.0,-576.0,-575.0,-574.0,-573.0,-572.0,-571.0,-570.0,-569.0,-568.0,-567.0,-566.0,-565.0,-564.0,-563.0,-562.0,-561.0,-560.0,-559.0,-558.0,-557.0,-556.0,-555.0,-554.0,-553.0,-552.0,-551.0,-550.0,-549.0,-548.0,-547.0,-546.0,-545.0,-544.0,-543.0,-542.0,-541.0,-540.0,-539.0,-538.0,-537.0,-536.0,-535.0,-534.0,-533.0,-532.0,-531.0,-530.0,-529.0,-528.0,-527.0,-526.0,-525.0,-524.0,-523.0,-522.0,-521.0,-520.0,-519.0,-518.0,-517.0,-516.0,-515.0,-514.0,-513.0,-512.0,-511.0,-510.0,-509.0,-508.0,-507.0,-506.0,-505.0,-504.0,-503.0,-502.0,-501.0,-500.0,-499.0,-498.0,-497.0,-496.0,-495.0,-494.0,-493.0,-492.0,-491.0,-490.0,-489.0,-488.0,-487.0,-486.0,-485.0,-484.0,-483.0,-482.0,-481.0,-480.0,-479.0,-478.0,-477.0,-476.0,-475.0,-474.0,-473.0,-472.0,-471.0,-470.0,-469.0,-468.0,-467.0,-466.0,-465.0,-464.0,-463.0,-462.0,-461.0,-460.0,-459.0,-458.0,-457.0,-456.0,-455.0,-454.0,-453.0,-452.0,-451.0,-450.0,-449.0,-448.0,-447.0,-446.0,-445.0,-444.0,-443.0,-442.0,-441.0,-440.0,-439.0,-438.0,-437.0,-436.0,-435.0,-434.0,-433.0,-432.0,-431.0,-430.0,-429.0,-428.0,-427.0,-426.0,-425.0,-424.0,-423.0,-422.0,-421.0,-420.0,-419.0,-418.0,-417.0,-416.0,-415.0,-414.0,-413.0,-412.0,-411.0,-410.0,-409.0,-408.0,-407.0,-406.0,-405.0,-404.0,-403.0,-402.0,-401.0,-400.0,-399.0,-398.0,-397.0,-396.0,-395.0,-394.0,-393.0,-392.0,-391.0,-390.0,-389.0,-388.0,-387.0,-386.0,-385.0,-384.0,-383.0,-382.0,-381.0,-380.0,-379.0,-378.0,-377.0,-376.0,-375.0,-374.0,-373.0,-372.0,-371.0,-370.0,-369.0,-368.0,-367.0,-366.0,-365.0,-364.0,-363.0,-362.0,-361.0,-360.0,-359.0,-358.0,-357.0,-356.0,-355.0,-354.0,-353.0,-352.0,-351.0,-350.0,-349.0,-348.0,-347.0,-346.0,-345.0,-344.0,-343.0,-342.0,-341.0,-340.0,-339.0,-338.0,-337.0,-336.0,-335.0,-334.0,-333.0,-332.0,-331.0,-330.0,-329.0,-328.0,-327.0,-326.0,-325.0,-324.0,-323.0,-322.0,-321.0,-320.0,-319.0,-318.0,-317.0,-316.0,-315.0,-314.0,-313.0,-312.0,-311.0,-310.0,-309.0,-308.0,-307.0,-306.0,-305.0,-304.0,-303.0,-302.0,-301.0,-300.0,-299.0,-298.0,-297.0,-296.0,-295.0,-294.0,-293.0,-292.0,-291.0,-290.0,-289.0,-288.0,-287.0,-286.0,-285.0,-284.0,-283.0,-282.0,-281.0,-280.0,-279.0,-278.0,-277.0,-276.0,-275.0,-274.0,-273.0,-272.0,-271.0,-270.0,-269.0,-268.0,-267.0,-266.0,-265.0,-264.0,-263.0,-262.0,-261.0,-260.0,-259.0,-258.0,-257.0,-256.0,-255.0,-254.0,-253.0,-252.0,-251.0,-250.0,-249.0,-248.0,-247.0,-246.0,-245.0,-244.0,-243.0,-242.0,-241.0,-240.0,-239.0,-238.0,-237.0,-236.0,-235.0,-234.0,-233.0,-232.0,-231.0,-230.0,-229.0,-228.0,-227.0,-226.0,-225.0,-224.0,-223.0,-222.0,-221.0,-220.0,-219.0,-218.0,-217.0,-216.0,-215.0,-214.0,-213.0,-212.0,-211.0,-210.0,-209.0,-208.0,-207.0,-206.0,-205.0,-204.0,-203.0,-202.0,-201.0,-200.0,-199.0,-198.0,-197.0,-196.0,-195.0,-194.0,-193.0,-192.0,-191.0,-190.0,-189.0,-188.0,-187.0,-186.0,-185.0,-184.0,-183.0,-182.0,-181.0,-180.0,-179.0,-178.0,-177.0,-176.0,-175.0,-174.0,-173.0,-172.0,-171.0,-170.0,-169.0,-168.0,-167.0,-166.0,-165.0,-164.0,-163.0,-162.0,-161.0,-160.0,-159.0,-158.0,-157.0,-156.0,-155.0,-154.0,-153.0,-152.0,-151.0,-150.0,-149.0,-148.0,-147.0,-146.0,-145.0,-144.0,-143.0,-142.0,-141.0,-140.0,-139.0,-138.0,-137.0,-136.0,-135.0,-134.0,-133.0,-132.0,-131.0,-130.0,-129.0,-128.0,-127.0,-126.0,-125.0,-124.0,-123.0,-122.0,-121.0,-120.0,-119.0,-118.0,-117.0,-116.0,-115.0,-114.0,-113.0,-112.0,-111.0,-110.0,-109.0,-108.0,-107.0,-106.0,-105.0,-104.0,-103.0,-102.0,-101.0,-100.0,-99.0,-98.0,-97.0,-96.0,-95.0,-94.0,-93.0,-92.0,-91.0,-90.0,-89.0,-88.0,-87.0,-86.0,-85.0,-84.0,-83.0,-82.0,-81.0,-80.0,-79.0,-78.0,-77.0,-76.0,-75.0,-74.0,-73.0,-72.0,-71.0,-70.0,-69.0,-68.0,-67.0,-66.0,-65.0,-64.0,-63.0,-62.0,-61.0,-60.0,-59.0,-58.0,-57.0,-56.0,-55.0,-54.0,-53.0,-52.0,-51.0,-50.0,-49.0,-48.0,-47.0,-46.0,-45.0,-44.0,-43.0,-42.0,-41.0,-40.0,-39.0,-38.0,-37.0,-36.0,-35.0,-34.0,-33.0,-32.0,-31.0,-30.0,-29.0,-28.0,-27.0,-26.0,-25.0,-24.0,-23.0,-22.0,-21.0,-20.0,-19.0,-18.0,-17.0,-16.0,-15.0,-14.0,-13.0,-12.0,-11.0,-10.0,-9.0,-8.0,-7.0,-6.0,-5.0,-4.0,-3.0,-2.0,-1.0,0.0,1.0,2.0,3.0,4.0,5.0,6.0,7.0,8.0,9.0,10.0,11.0,12.0,13.0,14.0,15.0,16.0,17.0,18.0,19.0,20.0,21.0,22.0,23.0,24.0,25.0,26.0,27.0,28.0,29.0,30.0,31.0,32.0,33.0,34.0,35.0,36.0,37.0,38.0,39.0,40.0,41.0,42.0,43.0,44.0,45.0,46.0,47.0,48.0,49.0,50.0,51.0,52.0,53.0,54.0,55.0,56.0,57.0,58.0,59.0,60.0,61.0,62.0,63.0,64.0,65.0,66.0,67.0,68.0,69.0,70.0,71.0,72.0,73.0,74.0,75.0,76.0,77.0,78.0,79.0,80.0,81.0,82.0,83.0,84.0,85.0,86.0,87.0,88.0,89.0,90.0,91.0,92.0,93.0,94.0,95.0,96.0,97.0,98.0,99.0,100.0,101.0,102.0,103.0,104.0,105.0,106.0,107.0,108.0,109.0,110.0,111.0,112.0,113.0,114.0,115.0,116.0,117.0,118.0,119.0,120.0,121.0,122.0,123.0,124.0,125.0,126.0,127.0,128.0,129.0,130.0,131.0,132.0,133.0,134.0,135.0,136.0,137.0,138.0,139.0,140.0,141.0,142.0,143.0,144.0,145.0,146.0,147.0,148.0,149.0,150.0,151.0,152.0,153.0,154.0,155.0,156.0,157.0,158.0,159.0,160.0,161.0,162.0,163.0,164.0,165.0,166.0,167.0,168.0,169.0,170.0,171.0,172.0,173.0,174.0,175.0,176.0,177.0,178.0,179.0,180.0,181.0,182.0,183.0,184.0,185.0,186.0,187.0,188.0,189.0,190.0,191.0,192.0,193.0,194.0,195.0,196.0,197.0,198.0,199.0,200.0,201.0,202.0,203.0,204.0,205.0,206.0,207.0,208.0,209.0,210.0,211.0,212.0,213.0,214.0,215.0,216.0,217.0,218.0,219.0,220.0,221.0,222.0,223.0,224.0,225.0,226.0,227.0,228.0,229.0,230.0,231.0,232.0,233.0,234.0,235.0,236.0,237.0,238.0,239.0,240.0,241.0,242.0,243.0,244.0,245.0,246.0,247.0,248.0,249.0,250.0,251.0,252.0,253.0,254.0,255.0,256.0,257.0,258.0,259.0,260.0,261.0,262.0,263.0,264.0,265.0,266.0,267.0,268.0,269.0,270.0,271.0,272.0,273.0,274.0,275.0,276.0,277.0,278.0,279.0,280.0,281.0,282.0,283.0,284.0,285.0,286.0,287.0,288.0,289.0,290.0,291.0,292.0,293.0,294.0,295.0,296.0,297.0,298.0,299.0,300.0,301.0,302.0,303.0,304.0,305.0,306.0,307.0,308.0,309.0,310.0,311.0,312.0,313.0,314.0,315.0,316.0,317.0,318.0,319.0,320.0,321.0,322.0,323.0,324.0,325.0,326.0,327.0,328.0,329.0,330.0,331.0,332.0,333.0,334.0,335.0,336.0,337.0,338.0,339.0,340.0,341.0,342.0,343.0,344.0,345.0,346.0,347.0,348.0,349.0,350.0,351.0,352.0,353.0,354.0,355.0,356.0,357.0,358.0,359.0,360.0,361.0,362.0,363.0,364.0,365.0,366.0,367.0,368.0,369.0,370.0,371.0,372.0,373.0,374.0,375.0,376.0,377.0,378.0,379.0,380.0,381.0,382.0,383.0,384.0,385.0,386.0,387.0,388.0,389.0,390.0,391.0,392.0,393.0,394.0,395.0,396.0,397.0,398.0,399.0,400.0,401.0,402.0,403.0,404.0,405.0,406.0,407.0,408.0,409.0,410.0,411.0,412.0,413.0,414.0,415.0,416.0,417.0,418.0,419.0,420.0,421.0,422.0,423.0,424.0,425.0,426.0,427.0,428.0,429.0,430.0,431.0,432.0,433.0,434.0,435.0,436.0,437.0,438.0,439.0,440.0,441.0,442.0,443.0,444.0,445.0,446.0,447.0,448.0,449.0,450.0,451.0,452.0,453.0,454.0,455.0,456.0,457.0,458.0,459.0,460.0,461.0,462.0,463.0,464.0,465.0,466.0,467.0,468.0,469.0,470.0,471.0,472.0,473.0,474.0,475.0,476.0,477.0,478.0,479.0,480.0,481.0,482.0,483.0,484.0,485.0,486.0,487.0,488.0,489.0,490.0,491.0,492.0,493.0,494.0,495.0,496.0,497.0,498.0,499.0,500.0,501.0,502.0,503.0,504.0,505.0,506.0,507.0,508.0,509.0,510.0,511.0,512.0,513.0,514.0,515.0,516.0,517.0,518.0,519.0,520.0,521.0,522.0,523.0,524.0,525.0,526.0,527.0,528.0,529.0,530.0,531.0,532.0,533.0,534.0,535.0,536.0,537.0,538.0,539.0,540.0,541.0,542.0,543.0,544.0,545.0,546.0,547.0,548.0,549.0,550.0,551.0,552.0,553.0,554.0,555.0,556.0,557.0,558.0,559.0,560.0,561.0,562.0,563.0,564.0,565.0,566.0,567.0,568.0,569.0,570.0,571.0,572.0,573.0,574.0,575.0,576.0,577.0,578.0,579.0,580.0,581.0,582.0,583.0,584.0,585.0,586.0,587.0,588.0,589.0,590.0,591.0,592.0,593.0,594.0,595.0,596.0,597.0,598.0,599.0,600.0,601.0,602.0,603.0,604.0,605.0,606.0,607.0,608.0,609.0,610.0,611.0,612.0,613.0,614.0,615.0,616.0,617.0,618.0,619.0,620.0,621.0,622.0,623.0,624.0,625.0,626.0,627.0,628.0,629.0,630.0,631.0,632.0,633.0,634.0,635.0,636.0,637.0,638.0,639.0,640.0,641.0,642.0,643.0,644.0,645.0,646.0,647.0,648.0,649.0,650.0,651.0,652.0,653.0,654.0,655.0,656.0,657.0,658.0,659.0,660.0,661.0,662.0,663.0,664.0,665.0,666.0,667.0,668.0,669.0,670.0,671.0,672.0,673.0,674.0,675.0,676.0,677.0,678.0,679.0,680.0,681.0,682.0,683.0,684.0,685.0,686.0,687.0,688.0,689.0,690.0,691.0,692.0,693.0,694.0,695.0,696.0,697.0,698.0,699.0,700.0,701.0,702.0,703.0,704.0,705.0,706.0,707.0,708.0,709.0,710.0,711.0,712.0,713.0,714.0,715.0,716.0,717.0,718.0,719.0,720.0,721.0,722.0,723.0,724.0,725.0,726.0,727.0,728.0,729.0,730.0,731.0,732.0,733.0,734.0,735.0,736.0,737.0,738.0,739.0,740.0,741.0,742.0,743.0,744.0,745.0,746.0,747.0,748.0,749.0,750.0,751.0,752.0,753.0,754.0,755.0,756.0,757.0,758.0,759.0,760.0,761.0,762.0,763.0,764.0,765.0,766.0,767.0,768.0,769.0,770.0,771.0,772.0,773.0,774.0,775.0,776.0,777.0,778.0,779.0,780.0,781.0,782.0,783.0,784.0,785.0,786.0,787.0,788.0,789.0,790.0,791.0,792.0,793.0,794.0,795.0,796.0,797.0,798.0,799.0,800.0,801.0,802.0,803.0,804.0,805.0,806.0,807.0,808.0,809.0,810.0,811.0,812.0,813.0,814.0,815.0,816.0,817.0,818.0,819.0,820.0,821.0,822.0,823.0,824.0,825.0,826.0,827.0,828.0,829.0,830.0,831.0,832.0,833.0,834.0,835.0,836.0,837.0,838.0,839.0,840.0,841.0,842.0,843.0,844.0,845.0,846.0,847.0,848.0,849.0,850.0,851.0,852.0,853.0,854.0,855.0,856.0,857.0,858.0,859.0,860.0,861.0,862.0,863.0,864.0,865.0,866.0,867.0,868.0,869.0,870.0,871.0,872.0,873.0,874.0,875.0,876.0,877.0,878.0,879.0,880.0,881.0,882.0,883.0,884.0,885.0,886.0,887.0,888.0,889.0,890.0,891.0,892.0,893.0,894.0,895.0,896.0,897.0,898.0,899.0,900.0,901.0,902.0,903.0,904.0,905.0,906.0,907.0,908.0,909.0,910.0,911.0,912.0,913.0,914.0,915.0,916.0,917.0,918.0,919.0,920.0,921.0,922.0,923.0,924.0,925.0,926.0,927.0,928.0,929.0,930.0,931.0,932.0,933.0,934.0,935.0,936.0,937.0,938.0,939.0,940.0,941.0,942.0,943.0,944.0,945.0,946.0,947.0,948.0,949.0,950.0,951.0,952.0,953.0,954.0,955.0,956.0,957.0,958.0,959.0,960.0,961.0,962.0,963.0,964.0,965.0,966.0,967.0,968.0,969.0,970.0,971.0,972.0,973.0,974.0,975.0,976.0,977.0,978.0,979.0,980.0,981.0,982.0,983.0,984.0,985.0,986.0,987.0,988.0,989.0,990.0,991.0,992.0,993.0,994.0,995.0,996.0,997.0,998.0,999.0,1000.0]}

},{}],34:[function(require,module,exports){
(function (__filename){
'use strict';

// MODULES //

var tape = require( 'tape' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var incrspace = require( '@stdlib/math/utils/incrspace' );
var PINF = require( '@stdlib/math/constants/float64-pinf' );
var NINF = require( '@stdlib/math/constants/float64-ninf' );
var EPS = require( '@stdlib/math/constants/float64-eps' );
var abs = require( '@stdlib/math/base/special/abs' );
var pow = require( '@stdlib/math/base/special/pow' );
var cospi = require( './../lib/' );


// FIXTURES //

var integers = require( './fixtures/julia/integers.json' );
var decimals = require( './fixtures/julia/decimals.json' );


// TESTS //

tape( 'main export is a function', function test( t ) {
	t.ok( true, __filename );
	t.equal( typeof cospi, 'function', 'main export is a function' );
	t.end();
});

tape( 'the function returns `NaN` if provided either positive or negative infinity', function test( t ) {
	var y;

	y = cospi( PINF );
	t.equal( isnan( y ), true, 'returns NaN when provided +infinity' );

	y = cospi( NINF );
	t.equal( isnan( y ), true, 'returns NaN when provided -infinity' );

	t.end();
});

tape( 'if provided `NaN`, the function returns `NaN`', function test( t ) {
	var y = cospi( NaN );
	t.equal( isnan( y ), true, 'returns NaN when provided NaN' );
	t.end();
});

tape( 'if provided an integer, the function returns `+-1.0`', function test( t ) {
	var expected;
	var x;
	var y;
	var i;

	x = integers.x;
	expected = integers.expected;
	for ( i = 0; i < x.length; i++ ) {
		y = cospi( x[i] );
		t.equal( y, expected[ i ], 'returns '+expected[i] );
	}
	t.end();
});

tape( 'if provided a value exceeding `2**53` (max (unsafe) float64 integer), the function always returns `+1.0`', function test( t ) {
	var x;
	var y;
	var i;

	x = pow( 2.0, 53 ) + 1.0;
	for ( i = 0; i < 100; i++ ) {
		y = cospi( x+i );
		t.equal( y, 1.0, 'returns 1.0' );
	}
	t.end();
});

tape( 'the function returns `0` for any value with fractional part equal to 1/2', function test( t ) {
	var x;
	var y;
	var i;

	x = incrspace( 0.5, 100.5, 1.0 );
	for ( i = 0; i < x.length; i++ ) {
		y = cospi( x[i] );
		t.equal( y, 0.0, 'x: '+x[i]+'. E: 0' );
	}
	t.end();
});

tape( 'the function computes `cos(πx)`', function test( t ) {
	var expected;
	var delta;
	var tol;
	var x;
	var y;
	var i;

	x = decimals.x;
	expected = decimals.expected;
	for ( i = 0; i < x.length; i++ ) {
		y = cospi( x[i] );
		if ( y === expected[ i ] ) {
			t.equal( y, expected[ i ], 'x: '+x[i]+'. E: '+expected[i] );
		} else {
			delta = abs( y - expected[i] );
			tol = 1.0 * EPS * abs( expected[i] );
			t.ok( delta <= tol, 'within tolerance. x: '+x[i]+'. y: '+y+'. E: '+expected[i]+'. tol: '+tol+'. Δ: '+delta+'.' );
		}
	}
	t.end();
});

}).call(this,"/lib/node_modules/@stdlib/math/base/special/cospi/test/test.js")
},{"./../lib/":31,"./fixtures/julia/decimals.json":32,"./fixtures/julia/integers.json":33,"@stdlib/math/base/assert/is-nan":18,"@stdlib/math/base/special/abs":23,"@stdlib/math/base/special/pow":43,"@stdlib/math/constants/float64-eps":87,"@stdlib/math/constants/float64-ninf":95,"@stdlib/math/constants/float64-pinf":97,"@stdlib/math/utils/incrspace":101,"tape":167}],35:[function(require,module,exports){
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

},{}],36:[function(require,module,exports){
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

},{"./floor.js":35}],37:[function(require,module,exports){
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

},{"./kernel_cos.js":38}],38:[function(require,module,exports){
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

var evalpoly = require( '@stdlib/math/base/tools/evalpoly' ).factory;


// VARIABLES //

var C13 = [
	4.16666666666666019037e-02,  // 0x3FA55555, 0x5555554C
	-1.38888888888741095749e-03, // 0xBF56C16C, 0x16C15177
	2.48015872894767294178e-05   // 0x3EFA01A0, 0x19CB1590
];
var C46 = [
	-2.75573143513906633035e-07, // 0xBE927E4F, 0x809C52AD
	2.08757232129817482790e-09,  // 0x3E21EE9E, 0xBDB4B1C4
	-1.13596475577881948265e-11  // 0xBDA8FAE9, 0xBE8838D4
];


// FUNCTIONS //

// Create polynomial functions based on above coefficients...
var polyval13 = evalpoly( C13 );
var polyval46 = evalpoly( C46 );


// MAIN //

/**
* Computes the cosine on \\( [-\pi/4, \pi/4] \\), where \\( \pi/4 \approx 0.785398164 \\).
*
* ## Method
*
* * Since \\( \cos(-x) = \cos(x) \\), we need only to consider positive \\(x\\).
*
* * If \\( x < 2^{-27} \\), return \\(1\\) which is inexact if \\( x \ne 0 \\).
*
* * \\( cos(x) \\) is approximated by a polynomial of degree \\(14\\) on \\( [0,\pi/4] \\).
*
*   ``` tex
*   \cos(x) \approx 1 - \frac{x \cdot x}{2} + C_1 \cdot x^4 + \ldots + C_6 \cdot x^{14}
*   ```
*
*   where the Remez error is
*
*   ``` tex
*   \left| \cos(x) - \left( 1 - \frac{x^2}{2} + C_1x^4 + C_2x^6 + C_3x^8 + C_4x^{10} + C_5x^{12} + C_6x^{15} \right) \right| \le 2^{-58}
*   ```
*
* * Let \\( C_1x^4 + C_2x^6 + C_3x^8 + C_4x^{10} + C_5x^{12} + C_6x^{14} \\), then
*
*   ``` tex
*   \cos(x) \approx 1 - \frac{x \cdot x}{2} + r
*   ```
*
*   Since
*
*   ``` tex
*   \cos(x+y) \approx \cos(x) - \sin(x) \cdot y \approx \cos(x) - x \cdot y
*   ```

*   a correction term is necessary in \\( \cos(x) \\). Hence,
*
*   ``` tex
*   \cos(x+y) = 1 - \left( \frac{x \cdot x}{2} - (r - x \cdot y) \right)
*   ```
*
*   For better accuracy, rearrange to
*
*   ``` tex
*   \cos(x+y) \approx w + \left( t + ( r - x \cdot y ) \right)
*   ```
*
*   where \\( w = 1 - \frac{x \cdot x}{2} \\) and \\( t \\) is a tiny correction term (\\( 1 - \frac{x \cdot x}{2} = w + t \\) exactly in infinite precision). The exactness of \\(w + t\\) in infinite precision depends on \\(w\\) and \\(t\\) having the same precision as \\(x\\).
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
} // end FUNCTION kernelCos()


// EXPORTS //

module.exports = kernelCos;

},{"@stdlib/math/base/tools/evalpoly":62}],39:[function(require,module,exports){
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

},{"./kernel_sin.js":40}],40:[function(require,module,exports){
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
* * Since \\( \sin(-x) = -\sin(x) \\), we need only to consider positive \\(x\\).
*
* * Callers must return \\( \sin(-0) = -0 \\) without calling here since our odd polynomial is not evaluated in a way that preserves \\(-0\\). Callers may do the optimization \\( \sin(x) \approx x \\) for tiny \\(x\\).
*
* * \\( \sin(x) \\) is approximated by a polynomial of degree \\(13\\) on \\( \left[0,\tfrac{pi}{4}\right] \\)
*
*   ``` tex
*   \sin(x) \approx x + S_1 \cdot x^3 + \ldots + S_6 \cdot x^{13}
*   ```
*
*   where
*
*   ``` tex
*   \left| \frac{\sin(x)}{x} \left( 1 + S_1 \cdot x + S_2 \cdot x + S_3 \cdot x + S_4 \cdot x + S_5 \cdot x + S_6 \cdot x \right) \right| \le 2^{-58}
*   ```
*
* * We have
*
*   ``` tex
*   \sin(x+y) = \sin(x) + \sin'(x') \cdot y \approx \sin(x) + (1-x*x/2) \cdot y
*   ```
*
*   For better accuracy, let
*
*   ``` tex
*   r = x^3 * \left( S_2 + x^2 \cdot \left( S_3 + x^2 * \left( S_4 + x^2 \cdot ( S_5+x^2 \cdot S_6 ) \right) \right) \right)
*   ```
*
*   then
*
*   ``` tex
*   \sin(x) = x + \left( S_1 \cdot x + ( x \cdot (r-y/2) + y ) \right)
*   ```
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
} // end FUNCTION kernelSin()


// EXPORTS //

module.exports = kernelSin;

},{}],41:[function(require,module,exports){
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
* x = ldexp( Number.POSITIVE_INFINITY, 11 );
* // returns Number.POSITIVE_INFINITY
*
* x = ldexp( Number.NEGATIVE_INFINITY, -118 );
* // returns Number.NEGATIVE_INFINITY
*/

// MODULES //

var ldexp = require( './ldexp.js' );


// EXPORTS //

module.exports = ldexp;

},{"./ldexp.js":42}],42:[function(require,module,exports){
'use strict';

// NOTES //

/*
* => ldexp: load exponent (see [The Open Group]{@link http://pubs.opengroup.org/onlinepubs/9699919799/functions/ldexp.html} and [cppreference]{@link http://en.cppreference.com/w/c/numeric/math/ldexp}).
*/


// MODULES //

var PINF = require( '@stdlib/math/constants/float64-pinf' );
var NINF = require( '@stdlib/math/constants/float64-ninf' );
var BIAS = require( '@stdlib/math/constants/float64-exponent-bias' );
var MAX_EXPONENT = require( '@stdlib/math/constants/float64-max-base2-exponent' );
var MAX_SUBNORMAL_EXPONENT = require( '@stdlib/math/constants/float64-max-base2-exponent-subnormal' );
var MIN_SUBNORMAL_EXPONENT = require( '@stdlib/math/constants/float64-min-base2-exponent-subnormal' );
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var isInfinite = require( '@stdlib/math/base/assert/is-infinite' );
var copysign = require( '@stdlib/math/base/special/copysign' );
var normalize = require( '@stdlib/math/base/utils/float64-normalize' );
var floatExp = require( '@stdlib/math/base/utils/float64-exponent' );
var toWords = require( '@stdlib/math/base/utils/float64-to-words' );
var fromWords = require( '@stdlib/math/base/utils/float64-from-words' );


// VARIABLES //

// 1/(1<<52) = 1/(2**52) = 1/4503599627370496
var TWO52_INV = 2.220446049250313e-16;

// Exponent all 0s: 1 00000000000 11111111111111111111
var CLEAR_EXP_MASK = 0x800fffff; // 2148532223


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
* var x = ldexp( Number.POSITIVE_INFINITY, 11 );
* // returns Number.POSITIVE_INFINITY
*
* @example
* var x = ldexp( Number.NEGATIVE_INFINITY, -118 );
* // returns Number.NEGATIVE_INFINITY
*/
function ldexp( frac, exp ) {
	var high;
	var tmp;
	var w;
	var m;
	if (
		frac === 0.0 || // handles +-0
		isnan( frac ) ||
		isInfinite( frac )
	) {
		return frac;
	}
	// Normalize the input fraction:
	tmp = normalize( frac );
	frac = tmp[ 0 ];
	exp += tmp[ 1 ];

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
	w = toWords( frac );
	high = w[ 0 ];

	// Clear the exponent bits within the higher order word:
	high &= CLEAR_EXP_MASK;

	// Set the exponent bits to the new exponent:
	high |= ((exp+BIAS) << 20);

	// Create a new floating-point number:
	return m * fromWords( high, w[ 1 ] );
} // end FUNCTION ldexp()


// EXPORTS //

module.exports = ldexp;

},{"@stdlib/math/base/assert/is-infinite":14,"@stdlib/math/base/assert/is-nan":18,"@stdlib/math/base/special/copysign":27,"@stdlib/math/base/utils/float64-exponent":64,"@stdlib/math/base/utils/float64-from-words":66,"@stdlib/math/base/utils/float64-normalize":74,"@stdlib/math/base/utils/float64-to-words":82,"@stdlib/math/constants/float64-exponent-bias":88,"@stdlib/math/constants/float64-max-base2-exponent":92,"@stdlib/math/constants/float64-max-base2-exponent-subnormal":91,"@stdlib/math/constants/float64-min-base2-exponent-subnormal":94,"@stdlib/math/constants/float64-ninf":95,"@stdlib/math/constants/float64-pinf":97}],43:[function(require,module,exports){
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

},{"./pow.js":46}],44:[function(require,module,exports){
'use strict';

// MODULES //

var evalpoly = require( '@stdlib/math/base/tools/evalpoly' ).factory;
var getHighWord = require( '@stdlib/math/base/utils/float64-get-high-word' );
var setLowWord = require( '@stdlib/math/base/utils/float64-set-low-word' );
var setHighWord = require( '@stdlib/math/base/utils/float64-set-high-word' );
var BIAS = require( '@stdlib/math/constants/float64-exponent-bias' );


// VARIABLES //

// 0x000fffff = 1048575 => 0 00000000000 11111111111111111111
var HIGH_SIGNIFICAND_MASK = 0x000fffff;

// 0x00100000 = 1048576 => 0 00000000001 00000000000000000000 => biased exponent: 1 = -1022+1023 => 2^-1022
var HIGH_MIN_NORMAL_EXP = 0x00100000;

// 0x3ff00000 = 1072693248 => 0 01111111111 00000000000000000000 => biased exponent: 1023 = 0+1023 => 2^0 = 1
var HIGH_BIASED_EXP_0 = 0x3ff00000;

// 0x20000000 = 536870912 => 0 01000000000 00000000000000000000 => biased exponent: 512 = -511+1023
var HIGH_BIASED_EXP_NEG_512 = 0x20000000;

// 0x00080000 = 524288 => 0 00000000000 10000000000000000000
var HIGH_SIGNIFICAND_HALF = 0x00080000;

// TODO: consider making an external constant
var HIGH_NUM_SIGNIFICAND_BITS = 20;

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

// Polynomial coefficients...
var L = [
	5.99999999999994648725e-01, // 0x3FE33333, 0x33333303
	4.28571428578550184252e-01, // 0x3FDB6DB6, 0xDB6FABFF
	3.33333329818377432918e-01, // 0x3FD55555, 0x518F264D
	2.72728123808534006489e-01, // 0x3FD17460, 0xA91D4101
	2.30660745775561754067e-01, // 0x3FCD864A, 0x93C9DB65
	2.06975017800338417784e-01  // 0x3FCA7E28, 0x4A454EEF
];


// FUNCTIONS //

// Compile a function for evaluating a polynomial based on the above coefficients...
var polyvalL = evalpoly( L );


// MAIN //

/**
* Computes \\(\operatorname{log2}(ax)\\).
*
* @private
* @param {number} ax - absolute value of `x`
* @param {number} ahx - high word of `ax`
* @returns {NumberArray} tuple comprised of high and low parts
*
* @example
* var t = log2ax( 9.0, 1075970048 ); // => [ t1, t2 ]
* // returns [ 3.169923782348633, 0.0000012190936795504075 ]
*/
function log2ax( ax, ahx ) {
	var tmp;
	var ss;  // `hs + ls`
	var s2;  // `ss` squared
	var hs;
	var ls;
	var ht;
	var lt;
	var bp;  // `BP` constant
	var dp;  // `DP` constant
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

	n = 0;

	// Check if `x` is subnormal...
	if ( ahx < HIGH_MIN_NORMAL_EXP ) {
		ax *= TWO53;
		n -= 53;
		ahx = getHighWord( ax );
	}
	// Extract the unbiased exponent of `x`:
	n += (ahx >> HIGH_NUM_SIGNIFICAND_BITS) - BIAS;

	// Isolate the significand bits of `x`:
	j = (ahx & HIGH_SIGNIFICAND_MASK);

	// Normalize `ahx` by setting the (biased) exponent to `1023`:
	ahx = (j | HIGH_BIASED_EXP_0);

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
		n += 1;
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
	return [ t1, t2 ];
} // FUNCTION log2ax()


// EXPORTS //

module.exports = log2ax;

},{"@stdlib/math/base/tools/evalpoly":62,"@stdlib/math/base/utils/float64-get-high-word":70,"@stdlib/math/base/utils/float64-set-high-word":77,"@stdlib/math/base/utils/float64-set-low-word":79,"@stdlib/math/constants/float64-exponent-bias":88}],45:[function(require,module,exports){
'use strict';

// MODULES //

var evalpoly = require( '@stdlib/math/base/tools/evalpoly' ).factory;
var setLowWord = require( '@stdlib/math/base/utils/float64-set-low-word' );


// VARIABLES //

// 1/LN2
var INV_LN2 = 1.44269504088896338700e+00; // 0x3FF71547, 0x652B82FE

// High (24 bits): 1/LN2
var INV_LN2_HI = 1.44269502162933349609e+00; // 0x3FF71547, 0x60000000

// Low: 1/LN2
var INV_LN2_LO = 1.92596299112661746887e-08; // 0x3E54AE0B, 0xF85DDF44

// Polynomial coefficients for `x - x^2/2 + x^3/3 - x^4/4`...
var W = [
	0.5,
	-0.3333333333333333333333,
	0.25
];


// FUNCTIONS //

// Compile a function for evaluating a polynomial based on the above coefficients...
var polyvalW = evalpoly( W );


// MAIN //

/**
* Computes \\(\operatorname{log}(x)\\) assuming \\(|1-x|\\) is small and using the approximation \\(x - x^2/2 + x^3/3 - x^4/4\\).
*
* @private
* @param {number} ax - absolute value of `x`
* @returns {NumberArray} tuple comprised of high and low parts
*
* @example
* var t = logx( 9.0 ); // => [ t1, t2 ]
* // returns [ -1265.7236328125, -0.0008163940840404393 ]
*/
function logx( ax ) {
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
	return [ t1, t2 ];
} // end FUNCTION logx()


// EXPORTS //

module.exports = logx;

},{"@stdlib/math/base/tools/evalpoly":62,"@stdlib/math/base/utils/float64-set-low-word":79}],46:[function(require,module,exports){
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
var toWords = require( '@stdlib/math/base/utils/float64-to-words' );
var getHighWord = require( '@stdlib/math/base/utils/float64-get-high-word' );
var getLowWord = require( '@stdlib/math/base/utils/float64-get-low-word' );
var setLowWord = require( '@stdlib/math/base/utils/float64-set-low-word' );
var uint32ToInt32 = require( '@stdlib/math/base/utils/uint32-to-int32' );
var NINF = require( '@stdlib/math/constants/float64-ninf' );
var PINF = require( '@stdlib/math/constants/float64-pinf' );
var xIsZero = require( './x_is_zero.js' );
var yIsHuge = require( './y_is_huge.js' );
var yIsInfinite = require( './y_is_infinite.js' );
var log2ax = require( './log2ax.js' );
var logx = require( './logx.js' );
var pow2 = require( './pow2.js' );


// VARIABLES //

// 0x7fffffff = 2147483647 => 0 11111111111 11111111111111111111
var ABS_MASK = 0x7fffffff;

// 0x3fefffff = 1072693247 => 0 01111111110 11111111111111111111 => biased exponent: 1022 = -1+1023 => 2^-1
var HIGH_MAX_NEAR_UNITY = 0x3fefffff;

// 0x41e00000 = 1105199104 => 0 10000011110 00000000000000000000 => biased exponent: 1054 = 31+1023 => 2^31
var HIGH_BIASED_EXP_31 = 0x41e00000;

// 0x43f00000 = 1139802112 => 0 10000111111 00000000000000000000 => biased exponent: 1087 = 64+1023 => 2^64
var HIGH_BIASED_EXP_64 = 0x43f00000;

// 0x40900000 = 1083179008 => 0 10000001001 00000000000000000000 => biased exponent: 1033 = 10+1023 => 2^10 = 1024
var HIGH_BIASED_EXP_10 = 0x40900000;

// 0x3ff00000 = 1072693248 => 0 01111111111 00000000000000000000 => biased exponent: 1023 = 0+1023 => 2^0 = 1
var HIGH_BIASED_EXP_0 = 0x3ff00000;

// 0x4090cc00 = 1083231232 => 0 10000001001 00001100110000000000
var HIGH_1075 = 0x4090cc00;

// 0xc090cc00 = 3230714880 => 1 10000001001 00001100110000000000
var HIGH_NEG_1075 = 0xc090cc00;

var HIGH_NUM_NONSIGN_BITS = 31;

var HUGE = 1.0e300;
var TINY = 1.0e-300;

// -(1024-log2(ovfl+.5ulp))
var OVT = 8.0085662595372944372e-17;


// MAIN //

/**
* Evaluates the exponential function.
*
* #### Method
*
* 1. Let \\(x = 2^n (1+f)\\).
*
* 2. Compute \\(\operatorname{log2}(x)\\) as
*
*   ``` tex
*   \operatorname{log2}(x) = w_1 + w_2
*   ```
*
*   where \\(w_1\\) has \\(53 - 24 = 29\\) bit trailing zeros.
*
* 3. Compute
*
*   ``` tex
*   y \cdot \operatorname{log2}(x) = n + y^\prime
*   ```
*
*   by simulating multi-precision arithmetic, where \\(|y^\prime| \leq 0.5\\).
*
* 4. Return
*
*   ``` tex
*   x^y = 2^n e^{y^\prime \cdot \mathrm{log2}}
*   ```
*
* #### Special Cases
*
* ``` tex
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
*
* #### Notes
*
* - \\(\operatorname{pow}(x,y)\\) returns \\(x^y\\) nearly rounded. In particular, \\(\operatorname{pow}(<\mathrm{integer}>,<\mathrm{integer}>)\\) __always__ returns the correct integer, provided the value is representable.
* - The hexadecimal values shown in the source code are the intended values for used constants. Decimal values may be used, provided the compiler will accurately convert decimal to binary in order to produce the hexadecimal values.
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
	var w;
	var t;
	var z;   // y prime
	var j;
	var i;
	if ( isnan( x ) || isnan( y ) ) {
		return NaN;
	}
	// Split `y` into high and low words:
	hy = getHighWord( y );
	ly = getLowWord( y );

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
	hx = getHighWord( x );
	lx = getLowWord( x );

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
	ahx = (hx & ABS_MASK);
	ahy = (hy & ABS_MASK);

	// Extract the sign bits:
	sx = (hx >>> HIGH_NUM_NONSIGN_BITS);
	sy = (hy >>> HIGH_NUM_NONSIGN_BITS);

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
		t = logx( ax );
	}
	// Case 2: `|y|` is not huge...
	else {
		t = log2ax( ax, ahx );
	}
	// Split `y` into `y1 + y2` and compute `(y1+y2) * (t1+t2)`...
	y1 = setLowWord( y, 0 );
	lp = ( (y-y1)*t[0] ) + ( y*t[1] );
	hp = y1 * t[0];
	z = lp + hp;

	// Note: *can* be more performant to use `getHighWord` and `getLowWord` directly, but using `toWords` looks cleaner.
	w = toWords( z );
	j = uint32ToInt32( w[0] );
	i = uint32ToInt32( w[1] );

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
} // end FUNCTION pow()


// EXPORTS //

module.exports = pow;

},{"./log2ax.js":44,"./logx.js":45,"./pow2.js":47,"./x_is_zero.js":48,"./y_is_huge.js":49,"./y_is_infinite.js":50,"@stdlib/math/base/assert/is-infinite":14,"@stdlib/math/base/assert/is-integer":16,"@stdlib/math/base/assert/is-nan":18,"@stdlib/math/base/assert/is-odd":20,"@stdlib/math/base/special/abs":23,"@stdlib/math/base/special/sqrt":59,"@stdlib/math/base/utils/float64-get-high-word":70,"@stdlib/math/base/utils/float64-get-low-word":72,"@stdlib/math/base/utils/float64-set-low-word":79,"@stdlib/math/base/utils/float64-to-words":82,"@stdlib/math/base/utils/uint32-to-int32":85,"@stdlib/math/constants/float64-ninf":95,"@stdlib/math/constants/float64-pinf":97}],47:[function(require,module,exports){
'use strict';

// MODULES //

var evalpoly = require( '@stdlib/math/base/tools/evalpoly' ).factory;
var getHighWord = require( '@stdlib/math/base/utils/float64-get-high-word' );
var setHighWord = require( '@stdlib/math/base/utils/float64-set-high-word' );
var setLowWord = require( '@stdlib/math/base/utils/float64-set-low-word' );
var uint32ToInt32 = require( '@stdlib/math/base/utils/uint32-to-int32' );
var ldexp = require( '@stdlib/math/base/special/ldexp' );
var LN2 = require( '@stdlib/math/constants/float64-ln-two' );
var BIAS = require( '@stdlib/math/constants/float64-exponent-bias' );


// VARIABLES //

// 0x7fffffff = 2147483647 => 0 11111111111 11111111111111111111
var ABS_MASK = 0x7fffffff;

// 0x000fffff = 1048575 => 0 00000000000 11111111111111111111
var HIGH_SIGNIFICAND_MASK = 0x000fffff;

// 0x00100000 = 1048576 => 0 00000000001 00000000000000000000 => biased exponent: 1 = -1022+1023 => 2^-1022
var HIGH_MIN_NORMAL_EXP = 0x00100000;

// 0x3fe00000 = 1071644672 => 0 01111111110 00000000000000000000 => biased exponent: 1022 = -1+1023 => 2^-1
var HIGH_BIASED_EXP_NEG_1 = 0x3fe00000;

// TODO: consider making into an external constant
var HIGH_NUM_SIGNIFICAND_BITS = 20;

// High: LN2
var LN2_HI = 6.93147182464599609375e-01; // 0x3FE62E43, 0x00000000

// Low: LN2
var LN2_LO = -1.90465429995776804525e-09; // 0xBE205C61, 0x0CA86C39

// Polynomial coefficients...
var P = [
	1.66666666666666019037e-01,  // 0x3FC55555, 0x5555553E
	-2.77777777770155933842e-03, // 0xBF66C16C, 0x16BEBD93
	6.61375632143793436117e-05,  // 0x3F11566A, 0xAF25DE2C
	-1.65339022054652515390e-06, // 0xBEBBBD41, 0xC5D26BF1
	4.13813679705723846039e-08   // 0x3E663769, 0x72BEA4D0
];


// FUNCTIONS //

// Compile a function for evaluating a polynomial based on the above coefficients...
var polyvalP = evalpoly( P );


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

	i = (j & ABS_MASK);
	k = (i>>HIGH_NUM_SIGNIFICAND_BITS) - BIAS;
	n = 0;

	// `|z| > 0.5`, set `n = z+0.5`
	if ( i > HIGH_BIASED_EXP_NEG_1 ) {
		n = j + (HIGH_MIN_NORMAL_EXP>>(k+1));
		k = ((n & ABS_MASK)>>HIGH_NUM_SIGNIFICAND_BITS) - BIAS; // new k for n
		tmp = ((n & ~(HIGH_SIGNIFICAND_MASK >> k)));
		t = setHighWord( 0.0, tmp );
		n = ((n & HIGH_SIGNIFICAND_MASK)|HIGH_MIN_NORMAL_EXP) >>
			(HIGH_NUM_SIGNIFICAND_BITS-k);
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
	j += (n << HIGH_NUM_SIGNIFICAND_BITS);

	// Check for subnormal output...
	if ( (j>>HIGH_NUM_SIGNIFICAND_BITS) <= 0 ) {
		z = ldexp( z, n );
	} else {
		z = setHighWord( z, j );
	}
	return z;
} // end FUNCTION pow2()


// EXPORTS //

module.exports = pow2;

},{"@stdlib/math/base/special/ldexp":41,"@stdlib/math/base/tools/evalpoly":62,"@stdlib/math/base/utils/float64-get-high-word":70,"@stdlib/math/base/utils/float64-set-high-word":77,"@stdlib/math/base/utils/float64-set-low-word":79,"@stdlib/math/base/utils/uint32-to-int32":85,"@stdlib/math/constants/float64-exponent-bias":88,"@stdlib/math/constants/float64-ln-two":90}],48:[function(require,module,exports){
'use strict';

// MODULES //

var isOdd = require( '@stdlib/math/base/assert/is-odd' );
var copysign = require( '@stdlib/math/base/special/copysign' );
var NINF = require( '@stdlib/math/constants/float64-ninf' );
var PINF = require( '@stdlib/math/constants/float64-pinf' );


// MAIN //

/**
* Evaluates the exponential function when  \\(|x| = 0\\).
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
* // returns Number.NEGATIVE_INFINITY
*
* @example
* var v = pow( 0.0, -9 );
* // returns Number.POSITIVE_INFINITY
*
* @example
* var v = pow( -0.0, 9 );
* // returns Number.POSITIVE_INFINITY
*
* @example
* var v = pow( 0.0, Number.NEGATIVE_INFINITY );
* // returns Number.POSITIVE_INFINITY
*
* @example
* var v = pow( 0.0, Number.POSITIVE_INFINITY );
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
} // end FUNCTION pow()


// EXPORTS //

module.exports = pow;

},{"@stdlib/math/base/assert/is-odd":20,"@stdlib/math/base/special/copysign":27,"@stdlib/math/constants/float64-ninf":95,"@stdlib/math/constants/float64-pinf":97}],49:[function(require,module,exports){
'use strict';

// MODULES //

var getHighWord = require( '@stdlib/math/base/utils/float64-get-high-word' );


// VARIABLES //

// 0x7fffffff = 2147483647 => 0 11111111111 11111111111111111111
var ABS_MASK = 0x7fffffff;

// 0x3fefffff = 1072693247 => 0 01111111110 11111111111111111111 => biased exponent: 1022 = -1+1023 => 2^-1
var HIGH_MAX_NEAR_UNITY = 0x3fefffff;

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
* // returns Number.POSITIVE_INFINITY
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
} // end FUNCTION pow()


// EXPORTS //

module.exports = pow;

},{"@stdlib/math/base/utils/float64-get-high-word":70}],50:[function(require,module,exports){
'use strict';

// MODULES //

var abs = require( '@stdlib/math/base/special/abs' );
var PINF = require( '@stdlib/math/constants/float64-pinf' );


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
* var v = pow( -1.0, Number.POSITIVE_INFINITY );
* // returns NaN
*
* @example
* var v = pow( -1.0, Number.NEGATIVE_INFINITY );
* // returns NaN
*
* @example
* var v = pow( 1.0, Number.POSITIVE_INFINITY );
* // returns 1.0
*
* @example
* var v = pow( 1.0, Number.NEGATIVE_INFINITY );
* // returns 1.0
*
* @example
* var v = pow( 0.5, Number.POSITIVE_INFINITY );
* // returns 0.0
*
* @example
* var v = pow( 0.5, Number.NEGATIVE_INFINITY );
* // returns Number.POSITIVE_INFINITY
*
* @example
* var v = pow( 1.5, Number.NEGATIVE_INFINITY );
* // returns 0.0
*
* @example
* var v = pow( 1.5, Number.POSITIVE_INFINITY );
* // returns Number.POSITIVE_INFINITY
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
} // end FUNCTION pow()


// EXPORTS //

module.exports = pow;

},{"@stdlib/math/base/special/abs":23,"@stdlib/math/constants/float64-pinf":97}],51:[function(require,module,exports){
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

},{"./rempio2.js":53}],52:[function(require,module,exports){
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
* ``` tex
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
} // end FUNCTION zero()

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
} // end FUNCTION compute()


// MAIN //

/**
* Returns the last three binary digits of `N` with `y = x - Nπ/2` so that `|y| < π/2`.
*
* ## Method
*
* * The method is to compute the integer (`mod 8`) and fraction parts of `2x/π` without doing the full multiplication. In general, we skip the part of the product that is known to be a huge integer (more accurately, equals `0 mod 8` ). Thus, the number of operations is independent of the exponent of the input.
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
} // end FUNCTION kernelRempio2()


// EXPORTS //

module.exports = kernelRempio2;

},{"@stdlib/math/base/special/floor":36,"@stdlib/math/base/special/ldexp":41}],53:[function(require,module,exports){
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

var getHighWord = require( '@stdlib/math/base/utils/float64-get-high-word' );
var getLowWord = require( '@stdlib/math/base/utils/float64-get-low-word' );
var fromWords = require( '@stdlib/math/base/utils/float64-from-words' );
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
var ABS_MASK = 0x7fffffff;

// Exponent mask: 0x7ff00000 = 2146435072 => 01111111111100000000000000000000
var EXPONENT_MASK = 0x7ff00000;

// High word significand mask: 0xfffff = 1048575 => 00000000000011111111111111111111
var SIGNIFICAND_MASK = 0xfffff;

// High word significand for π and π/2: 0x921fb = 598523 => 00000000000010010010000111111011
var PI_HIGH_WORD_SIGNIFICAND = 0x921fb;

// High word for π/4: 0x3fe921fb = 1072243195 => 00111111111010010010000111111011
var PIO4_HIGH_WORD = 0x3fe921fb;

// High word for 3π/4: 0x4002d97c = 1073928572 => 01000000000000101101100101111100
var THREE_PIO4_HIGH_WORD = 0x4002d97c;

// High word for 5π/4: 0x400f6a7a = 1074752122 => 01000000000011110110101001111010
var FIVE_PIO4_HIGH_WORD = 0x400f6a7a;

// High word for 6π/4: 0x4012d97c = 1074977148 => 01000000000100101101100101111100
var THREE_PIO2_HIGH_WORD = 0x4012d97c;

// High word for 7π/4: 0x4015fdbc = 1075183036 => 01000000000101011111110110111100
var SEVEN_PIO4_HIGH_WORD = 0x4015fdbc;

// High word for 8π/4: 0x401921fb = 1075388923 => 01000000000110010010000111111011
var TWO_PI_HIGH_WORD = 0x401921fb;

// High word for 9π/4: 0x401c463b = 1075594811 => 01000000000111000100011000111011
var NINE_PIO4_HIGH_WORD = 0x401c463b;

// 2^20*π/2 = 1647099.3291652855 => 0100000100111001001000011111101101010100010001000010110100011000 => high word => 0x413921fb = 1094263291 => 01000001001110010010000111111011
var MEDIUM = 0x413921fb;

// Arrays for storing temporary values (note that, in C, this would not be thread-safe):
var TX = new Array( 3 );
var TY = new Array( 2 );


// MAIN //

/**
* Computes `x - nπ/2 = r`.
*
* ## Notes
*
* * Returns `n` and stores the remainder `r` as two numbers `y[0]` and `y[1]`, such that `y[0]+y[1] = r`.
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
	ix = hx & ABS_MASK;

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
} // end FUNCTION rempio2()


// EXPORTS //

module.exports = rempio2;

},{"./kernel_rempio2.js":52,"./rempio2_medium.js":54,"@stdlib/math/base/utils/float64-from-words":66,"@stdlib/math/base/utils/float64-get-high-word":70,"@stdlib/math/base/utils/float64-get-low-word":72}],54:[function(require,module,exports){
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
var getHighWord = require( '@stdlib/math/base/utils/float64-get-high-word' );


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
var EXPONENT_MASK = 0x7ff;


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
	j = ix >> 20;
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
} // end FUNCTION rempio2Medium()


// EXPORTS //

module.exports = rempio2Medium;

},{"@stdlib/math/base/special/round":55,"@stdlib/math/base/utils/float64-get-high-word":70}],55:[function(require,module,exports){
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
* v = round( Number.POSITIVE_INFINITY );
* // returns Number.POSITIVE_INFINITY
*
* v = round( Number.NEGATIVE_INFINITY );
* // returns Number.NEGATIVE_INFINITY
*
* v = round( NaN );
* // returns NaN
*/

// MODULES //

var round = require( './round.js' );


// EXPORTS //

module.exports = round;

},{"./round.js":56}],56:[function(require,module,exports){
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
* var v = round( Number.POSITIVE_INFINITY );
* // returns Number.POSITIVE_INFINITY
*
* @example
* var v = round( Number.NEGATIVE_INFINITY );
* // returns Number.NEGATIVE_INFINITY
*
* @example
* var v = round( NaN );
* // returns NaN
*/
var round = Math.round;


// EXPORTS //

module.exports = round;

},{}],57:[function(require,module,exports){
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

},{"./sin.js":58}],58:[function(require,module,exports){
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

var getHighWord = require( '@stdlib/math/base/utils/float64-get-high-word' );
var kernelCos = require( '@stdlib/math/base/special/kernel-cos' );
var kernelSin = require( '@stdlib/math/base/special/kernel-sin' );
var rempio2 = require( '@stdlib/math/base/special/rempio2' );


// VARIABLES //

// Absolute value mask: 0x7fffffff = 2147483647 => 01111111111111111111111111111111
var ABS_MASK = 0x7fffffff;

// Exponent mask: 0x7ff00000 = 2146435072 => 01111111111100000000000000000000
var EXPONENT_MASK = 0x7ff00000;

// High word for PI/4: 0x3fe921fb = 1072243195 => 00111111111010010010000111111011
var PIO4_HIGH_WORD = 0x3fe921fb;

// 2^-26 = 1.4901161193847656e-8 => 0011111001010000000000000000000000000000000000000000000000000000 => high word => 00111110010100000000000000000000 => 0x3e500000 = 1045430272
var SMALL_HIGH_WORD = 0x3e500000;

// Array for storing remainder elements: (note that, in c, this is not thread safe)
var Y = [ 0.0, 0.0 ];


// MAIN //

/**
* Computes the sine of a number.
*
* ## Method
*
* * Let \\(S\\), \\(C\\), and \\(T\\) denote the \\(\sin\\), \\(\cos\\), and \\(\tan\\), respectively, on \\([-\pi/4, +\pi/4]\\).
*
* * Reduce the argument \\(x\\) to \\(y1+y2 = x-k\pi/2\\) in \\([-\pi/4, +\pi/4]\\), and let \\(n = k \mod 4\\).
*
* * We have
*
*   | n   |  sin(x)  |  cos(x)  |  tan(x)  |
*   |:---:|:--------:|:--------:|:--------:|
*   |  0  |     S    |     C    |    T     |
*   |  1  |     C    |    -S    |   -1/T   |
*   |  2  |    -S    |    -C    |    T     |
*   |  3  |    -C    |     S    |   -1/T   |
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
} // end FUNCTION sin()


// EXPORTS //

module.exports = sin;

},{"@stdlib/math/base/special/kernel-cos":37,"@stdlib/math/base/special/kernel-sin":39,"@stdlib/math/base/special/rempio2":51,"@stdlib/math/base/utils/float64-get-high-word":70}],59:[function(require,module,exports){
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

},{}],60:[function(require,module,exports){
'use strict';

// MAIN //

/**
* Evaluates a polynomial.
*
* #### Notes
*
* * The implementation uses [Horner's rule]{@link http://en.wikipedia.org/wiki/Horner's_method} for efficient computation.
*
*
* @param {NumericArray} c - polynomial coefficients sorted in ascending degree
* @param {number} x - value at which to evaluate the polynomial
* @returns {number} evaluated polynomial
*
* @example
* var v = evalpoly( [3.0,2.0,1.0], 10.0 ); // 3*10^0 + 2*10^1 + 1*10^2
* // returns 123.0
*/
function evalpoly( c, x ) {
	var p;
	var i;

	i = c.length;
	if ( i < 2 || x === 0.0 ) {
		if ( i === 0 ) {
			return 0.0;
		}
		return c[ 0 ];
	}
	i -= 1;
	p = ( c[ i ] * x ) + c[ i-1 ];
	i -= 2;
	while ( i >= 0 ) {
		p = ( p * x ) + c[ i ];
		i -= 1;
	}
	return p;
} // end FUNCTION evalpoly()


// EXPORTS //

module.exports = evalpoly;

},{}],61:[function(require,module,exports){
'use strict';

// MODULES //

var evalpoly = require( './evalpoly.js' );


// MAIN //

/**
* Generates a function for evaluating a polynomial.
*
* #### Notes
*
* * The compiled function uses [Horner's rule]{@link http://en.wikipedia.org/wiki/Horner's_method} for efficient computation.
*
*
* @param {NumericArray} c - polynomial coefficients sorted in ascending degree
* @returns {Function} function for evaluating a polynomial
*
* @example
* var polyval = evalpoly.factory( [3.0,2.0,1.0] );
*
* var v = polyval( 10.0 ); // => 3*10^0 + 2*10^1 + 1*10^2
* // returns 123.0
*
* v = polyval( 5.0 ); // => 3*5^0 + 2*5^1 + 1*5^2
* // returns 38.0
*/
function factory( c ) {
	var f;
	var n;
	var m;
	var i;

	// Avoid exceeding the maximum stack size on V8 :(. Note that the choice of `500` was empirically determined...
	if ( c.length > 500 ) {
		return polyval;
	}
	// Code generation. Start with the function definition...
	f = 'return function evalpoly(x){';

	// Create the function body...
	n = c.length;

	// If no coefficients, the function always returns 0...
	if ( n === 0 ) {
		f += 'return 0.0;';
	}
	// If only one coefficient, the function always returns that coefficient...
	else if ( n === 1 ) {
		f += 'return ' + c[ 0 ] + ';';
	}
	// If more than one coefficient, apply Horner's method...
	else {
		// If `x == 0`, return the first coefficient...
		f += 'if(x===0.0){return ' + c[ 0 ] + ';}';

		// Otherwise, evaluate the polynomial...
		f += 'return ' + c[ 0 ];
		m = n - 1;
		for ( i = 1; i < n; i++ ) {
			f += '+x*';
			if ( i < m ) {
				f += '(';
			}
			f += c[ i ];
		}
		// Close all the parentheses...
		for ( i = 0; i < m-1; i++ ) {
			f += ')';
		}
		f += ';';
	}
	// Close the function:
	f += '}';

	// Add a source directive for debugging:
	f += '//# sourceURL=evalpoly.factory.js';

	// Create the function in the global scope:
	return ( new Function( f ) )(); // eslint-disable-line no-new-func

	/*
	* returns
	*    function evalpoly( x ) {
	*        if ( x === 0.0 ) {
	*            return c[ 0 ];
	*        }
	*        return c[0]+x*(c[1]+x*(c[2]+x*(c[3]+...+x*(c[n-2]+x*c[n-1]))));
	*    }
	*/

	/**
	* Evaluates a polynomial.
	*
	* @private
	* @param {number} x - value at which to evaluate a polynomial
	* @returns {number} evaluated polynomial
	*/
	function polyval( x ) {
		return evalpoly( c, x );
	} // end FUNCTON polyval()
} // end FUNCTION factory()


// EXPORTS //

module.exports = factory;

},{"./evalpoly.js":60}],62:[function(require,module,exports){
'use strict';

/**
* Evaluate a polynomial.
*
* @module @stdlib/math/base/tools/evalpoly
*
* @example
* var evalpoly = require( '@stdlib/math/base/tools/evalpoly' );
*
* var v = evalpoly( [3.0,2.0,1.0], 10.0 ); // 3*10^0 + 2*10^1 + 1*10^2
* // returns 123.0
*
* @example
* var evalpoly = require( '@stdlib/math/base/tools/evalpoly' );
*
* var polyval = evalpoly.factory( [3.0,2.0,1.0] );
*
* var v = polyval( 10.0 ); // => 3*10^0 + 2*10^1 + 1*10^2
* // returns 123.0
*
* v = polyval( 5.0 ); // => 3*5^0 + 2*5^1 + 1*5^2
* // returns 38.0
*/

// MODULES //

var setReadOnly = require( '@stdlib/utils/define-read-only-property' );
var evalpoly = require( './evalpoly.js' );
var factory = require( './factory.js' );


// MAIN //

setReadOnly( evalpoly, 'factory', factory );


// EXPORTS //

module.exports = evalpoly;

},{"./evalpoly.js":60,"./factory.js":61,"@stdlib/utils/define-read-only-property":103}],63:[function(require,module,exports){
'use strict';

// MODULES //

var getHighWord = require( '@stdlib/math/base/utils/float64-get-high-word' );
var EXP_MASK = require( '@stdlib/math/constants/float64-high-word-exponent-mask' );
var BIAS = require( '@stdlib/math/constants/float64-exponent-bias' );


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
	return high - BIAS;
} // end FUNCTION exponent()


// EXPORTS //

module.exports = exponent;

},{"@stdlib/math/base/utils/float64-get-high-word":70,"@stdlib/math/constants/float64-exponent-bias":88,"@stdlib/math/constants/float64-high-word-exponent-mask":89}],64:[function(require,module,exports){
'use strict';

/**
* Return an integer corresponding to the unbiased exponent of a double-precision floating-point number.
*
* @module @stdlib/math/base/utils/float64-exponent
*
* @example
* var exponent = require( '@stdlib/math/base/utils/float64-exponent );
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

var exponent = require( './exponent.js' );


// EXPORTS //

module.exports = exponent;

},{"./exponent.js":63}],65:[function(require,module,exports){
'use strict';

// MODULES //

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
* #### Notes
*
* ``` text
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
* ``` text
*                         <-- lower      higher -->
* |   f7       f6       f5       f4       f3       f2    e2 | f1 |s|  e1  |
* ```
*
* If big endian (more significant bits first):
*
* ``` text
*                         <-- higher      lower -->
* |s| e1    e2 | f1     f2       f3       f4       f5        f6      f7   |
* ```
*
*
* In which Uint32 should we place the higher order bits? If little endian, the second; if big endian, the first.
*
*
* #### References
*
* * [Open Group]{@link http://pubs.opengroup.org/onlinepubs/9629399/chap14.htm}
*
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
* // returns Number.POSITIVE_INFINITY
* @example
* var v = fromWords( 4293918720, 0 );
* // returns Number.NEGATIVE_INFINITY
*/
function fromWords( high, low ) {
	UINT32_VIEW[ HIGH ] = high;
	UINT32_VIEW[ LOW ] = low;
	return FLOAT64_VIEW[ 0 ];
} // end FUNCTION fromWords()


// EXPORTS //

module.exports = fromWords;

},{"./indices.js":67}],66:[function(require,module,exports){
'use strict';

/**
* Create a double-precision floating-point number from a higher order word (unsigned 32-bit integer) and a lower order word (unsigned 32-bit integer).
*
* @module @stdlib/math/base/utils/float64-from-words
*
* @example
* var fromWords = require( '@stdlib/math/base/utils/float64-from-words' );
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
* // returns Number.POSITIVE_INFINITY
*
* v = fromWords( 4293918720, 0 );
* // returns Number.NEGATIVE_INFINITY
*/

// MODULES //

var fromWords = require( './from_words.js' );


// EXPORTS //

module.exports = fromWords;

},{"./from_words.js":65}],67:[function(require,module,exports){
'use strict';

// MODULES //

var isLittleEndian = require( '@stdlib/assert/is-little-endian' );


// MAIN //

var HIGH;
var LOW;

if ( isLittleEndian === true ) {
	HIGH = 1; // second index
	LOW = 0; // first index
} else {
	HIGH = 0; // first index
	LOW = 1; // second index
}


// EXPORTS //

module.exports = {
	'HIGH': HIGH,
	'LOW': LOW
};

},{"@stdlib/assert/is-little-endian":4}],68:[function(require,module,exports){
'use strict';

// MODULES //

var HIGH = require( './high.js' );


// VARIABLES //

var FLOAT64_VIEW = new Float64Array( 1 );
var UINT32_VIEW = new Uint32Array( FLOAT64_VIEW.buffer );


// MAIN //

/**
* Returns an unsigned 32-bit integer corresponding to the more significant 32 bits of a double-precision floating-point number.
*
* #### Notes
*
* ``` text
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
* ``` text
*                         <-- lower      higher -->
* |   f7       f6       f5       f4       f3       f2    e2 | f1 |s|  e1  |
* ```
*
* If big endian (more significant bits first):
*
* ``` text
*                         <-- higher      lower -->
* |s| e1    e2 | f1     f2       f3       f4       f5        f6      f7   |
* ```
*
* In which Uint32 can we find the higher order bits? If little endian, the second; if big endian, the first.
*
*
* #### References
*
* * [Open Group]{@link http://pubs.opengroup.org/onlinepubs/9629399/chap14.htm}
*
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
} // end FUNCTION getHighWord()


// EXPORTS //

module.exports = getHighWord;

},{"./high.js":69}],69:[function(require,module,exports){
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

},{"@stdlib/assert/is-little-endian":4}],70:[function(require,module,exports){
'use strict';

/**
* Return an unsigned 32-bit integer corresponding to the more significant 32 bits of a double-precision floating-point number.
*
* @module @stdlib/math/base/utils/float64-get-high-word
*
* @example
* var getHighWord = require( '@stdlib/math/base/utils/float64-get-high-word' );
*
* var w = getHighWord( 3.14e201 ); // => 01101001110001001000001011000011
* // returns 1774486211
*/

// MODULES //

var getHighWord = require( './get_high_word.js' );


// EXPORTS //

module.exports = getHighWord;

},{"./get_high_word.js":68}],71:[function(require,module,exports){
'use strict';

// MODULES //

var LOW = require( './low.js' );


// VARIABLES //

var FLOAT64_VIEW = new Float64Array( 1 );
var UINT32_VIEW = new Uint32Array( FLOAT64_VIEW.buffer );


// MAIN //

/**
* Returns a 32-bit unsigned integer corresponding to the less significant 32 bits of a double-precision floating-point number.
*
* #### Notes
*
* ``` text
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
* ``` text
*                         <-- lower      higher -->
* |   f7       f6       f5       f4       f3       f2    e2 | f1 |s|  e1  |
* ```
*
* If big endian (more significant bits first):
*
* ``` text
*                         <-- higher      lower -->
* |s| e1    e2 | f1     f2       f3       f4       f5        f6      f7   |
* ```
*
* In which Uint32 can we find the lower order bits? If little endian, the first; if big endian, the second.
*
*
* #### References
*
* * [Open Group]{@link http://pubs.opengroup.org/onlinepubs/9629399/chap14.htm}
*
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
} // end FUNCTION getLowWord()


// EXPORTS //

module.exports = getLowWord;

},{"./low.js":73}],72:[function(require,module,exports){
'use strict';

/**
* Returns an unsigned 32-bit integer corresponding to the less significant 32 bits of a double-precision floating-point number.
*
* @module @stdlib/math/base/utils/float64-get-low-word
*
* @example
* var getLowWord = require( '@stdlib/math/base/utils/float64-get-low-word' );
*
* var w = getLowWord( 3.14e201 ); // => 10010011110010110101100010000010
* // returns 2479577218
*/

// MODULES //

var getLowWord = require( './get_low_word.js' );


// EXPORTS //

module.exports = getLowWord;

},{"./get_low_word.js":71}],73:[function(require,module,exports){
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

},{"@stdlib/assert/is-little-endian":4}],74:[function(require,module,exports){
'use strict';

/**
* Returns a normal number `y` and exponent `exp` satisfying \\(x = y \cdot 2^\mathrm{exp}\\).
*
* @module @stdlib/math/base/utils/float64-normalize
*
* @example
* var normalize = require( '@stdlib/math/base/utils/float64-normalize' );
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
*/

// MODULES //

var normalize = require( './normalize.js' );


// EXPORTS //

module.exports = normalize;

},{"./normalize.js":75}],75:[function(require,module,exports){
'use strict';

// MODULES //

var FLOAT64_SMALLEST_NORMAL = require( '@stdlib/math/constants/float64-smallest-normal' );
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
* @param {number} x - input value
* @returns {NumberArray} a two-element array containing `y` and `exp`
*
* @example
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
* var out = normalize( 0 );
* // returns [ 0.0, 0 ];
*
* @example
* var out = normalize( Number.POSITIVE_INFINITY );
* // returns [ Number.POSITIVE_INFINITY, 0 ]
*
* @example
* var out = normalize( Number.NEGATIVE_INFINITY );
* // returns [ Number.NEGATIVE_INFINIY, 0 ]
*
* @example
* var out = normalize( NaN );
* // returns [ NaN, 0 ]
*/
function normalize( x ) {
	if ( isnan( x ) || isInfinite( x ) ) {
		return [ x, 0 ];
	}
	if ( x !== 0.0 && abs( x ) < FLOAT64_SMALLEST_NORMAL ) {
		return [ x*SCALAR, -52 ];
	}
	return [ x, 0 ];
} // end FUNCTION normalize()


// EXPORTS //

module.exports = normalize;

},{"@stdlib/math/base/assert/is-infinite":14,"@stdlib/math/base/assert/is-nan":18,"@stdlib/math/base/special/abs":23,"@stdlib/math/constants/float64-smallest-normal":98}],76:[function(require,module,exports){
arguments[4][69][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":4,"dup":69}],77:[function(require,module,exports){
'use strict';

/**
* Set the more significant 32 bits of a double-precision floating-point number.
*
* @module @stdlib/math/base/utils/float64-set-high-word
*
* @example
* var setHighWord = require( '@stdlib/math/base/utils/float64-set-high-word' );
*
* var high = 5 >>> 0; // => 0 00000000000 00000000000000000101
*
* var y = setHighWord( 3.14e201, high ); // => 0 00000000000 0000000000000000010110010011110010110101100010000010
* // returns 1.18350528745e-313
*
* @example
* var setHighWord = require( '@stdlib/math/base/utils/float64-set-high-word' );
* var PINF = require( '@stdlib/math/constants/float64-pinf' ); //  => 0 11111111111 00000000000000000000 00000000000000000000000000000000
*
* var high = 1072693248 >>> 0; // => 0 01111111111 00000000000000000000
*
* // Set the higher order bits of `+infinity` to return `1`:
* var y = setHighWord( PINF, high ); => 0 01111111111 0000000000000000000000000000000000000000000000000000
* // returns 1.0
*/

// MODULES //

var setHighWord = require( './set_high_word.js' );


// EXPORTS //

module.exports = setHighWord;

},{"./set_high_word.js":78}],78:[function(require,module,exports){
'use strict';

// MODULES //

var HIGH = require( './high.js' );


// VARIABLES //

var FLOAT64_VIEW = new Float64Array( 1 );
var UINT32_VIEW = new Uint32Array( FLOAT64_VIEW.buffer );


// MAIN //

/**
* Sets the more significant 32 bits of a double-precision floating-point number.
*
* #### Notes
*
* ``` text
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
* ``` text
*                         <-- lower      higher -->
* |   f7       f6       f5       f4       f3       f2    e2 | f1 |s|  e1  |
* ```
*
* If big endian (more significant bits first):
*
* ``` text
*                         <-- higher      lower -->
* |s| e1    e2 | f1     f2       f3       f4       f5        f6      f7   |
* ```
*
* In which Uint32 can we find the higher order bits? If little endian, the second; if big endian, the first.
*
*
* #### References
*
* * [Open Group]{@link http://pubs.opengroup.org/onlinepubs/9629399/chap14.htm}
*
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
* var PINF = require( '@stdlib/math/constants/float64-pinf' ); // => 0 11111111111 00000000000000000000 00000000000000000000000000000000
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
} // end FUNCTION setHighWord()


// EXPORTS //

module.exports = setHighWord;

},{"./high.js":76}],79:[function(require,module,exports){
'use strict';

/**
* Set the less significant 32 bits of a double-precision floating-point number.
*
* @module @stdlib/math/base/utils/float64-set-low-word
*
* @example
* var setLowWord = require( '@stdlib/math/base/utils/float64-set-low-word' );
*
* var low = 5 >>> 0; // => 00000000000000000000000000000101
*
* var x = 3.14e201; // => 0 11010011100 01001000001011000011 10010011110010110101100010000010
*
* var y = setLowWord( x, low ); // => 0 11010011100 01001000001011000011 00000000000000000000000000000101
* // returns 3.139998651394392e+201
*
* @example
* var setLowWord = require( '@stdlib/math/base/utils/float64-set-low-word' );
* var PINF = require( '@stdlib/math/constants/float64-pinf' );
* var NINF = require( '@stdlib/math/constants/float64-ninf' );
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

var setLowWord = require( './set_low_word.js' );


// EXPORTS //

module.exports = setLowWord;

},{"./set_low_word.js":81}],80:[function(require,module,exports){
arguments[4][73][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":4,"dup":73}],81:[function(require,module,exports){
'use strict';

// MODULES //

var LOW = require( './low.js' );


// VARIABLES //

var FLOAT64_VIEW = new Float64Array( 1 );
var UINT32_VIEW = new Uint32Array( FLOAT64_VIEW.buffer );


// MAIN //

/**
* Sets the less significant 32 bits of a double-precision floating-point number.
*
* #### Notes
*
* ``` text
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
* ``` text
*                         <-- lower      higher -->
* |   f7       f6       f5       f4       f3       f2    e2 | f1 |s|  e1  |
* ```
*
* If big endian (more significant bits first):
*
* ``` text
*                         <-- higher      lower -->
* |s| e1    e2 | f1     f2       f3       f4       f5        f6      f7   |
* ```
*
* In which Uint32 can we find the lower order bits? If little endian, the first; if big endian, the second.
*
*
* #### References
*
* * [Open Group]{@link http://pubs.opengroup.org/onlinepubs/9629399/chap14.htm}
*
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
* var PINF = require( '@stdlib/math/constants/float64-pinf' );
* var NINF = require( '@stdlib/math/constants/float64-ninf' );
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
} // end FUNCTION setLowWord()


// EXPORTS //

module.exports = setLowWord;

},{"./low.js":80}],82:[function(require,module,exports){
'use strict';

/**
* Split a floating-point number into a higher order word (unsigned 32-bit integer) and a lower order word (unsigned 32-bit integer).
*
* @module @stdlib/math/base/utils/float64-to-words
*
* @example
* var toWords = require( '@stdlib/math/base/utils/float64-to-words' );
*
* var w = toWords( 3.14e201 );
* // returns [ 1774486211, 2479577218 ]
*/

// MODULES //

var toWords = require( './to_words.js' );


// EXPORTS //

module.exports = toWords;

},{"./to_words.js":84}],83:[function(require,module,exports){
arguments[4][67][0].apply(exports,arguments)
},{"@stdlib/assert/is-little-endian":4,"dup":67}],84:[function(require,module,exports){
'use strict';

// MODULES //

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
* #### Notes
*
* ``` text
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
* ``` text
*                         <-- lower      higher -->
* |   f7       f6       f5       f4       f3       f2    e2 | f1 |s|  e1  |
* ```
*
* If big endian (more significant bits first):
*
* ``` text
*                         <-- higher      lower -->
* |s| e1    e2 | f1     f2       f3       f4       f5        f6      f7   |
* ```
*
* In which Uint32 can we find the higher order bits? If little endian, the second; if big endian, the first.
*
*
* #### References
*
* [Open Group]{@link http://pubs.opengroup.org/onlinepubs/9629399/chap14.htm}
*
*
* @param {number} x - input value
* @returns {NumberArray} two-element array containing a higher order word and a lower order word
*
* @example
* var w = toWords( 3.14e201 );
* // returns [ 1774486211, 2479577218 ]
*/
function toWords( x ) {
	FLOAT64_VIEW[ 0 ] = x;
	return [ UINT32_VIEW[ HIGH ], UINT32_VIEW[ LOW ] ];
} // end FUNCTION toWords()


// EXPORTS //

module.exports = toWords;

},{"./indices.js":83}],85:[function(require,module,exports){
'use strict';

/**
* Convert an unsigned 32-bit integer to a signed 32-bit integer.
*
* @module @stdlib/math/base/utils/uint32-to-int32
*
* @example
* var float64ToUint32 = require( '@stdlib/math/base/utils/float64-to-uint32' );
* var uint32ToInt32 = require( '@stdlib/math/base/utils/uint32-to-int32' );
*
* var y = uint32ToInt32( float64ToUint32( 4294967295 ) );
* // returns -1
*
* y = uint32ToInt32( float64ToUint32( 3 ) );
* // returns 3
*/

// MODULES //

var uint32ToInt32 = require( './uint32_to_int32.js' );


// EXPORTS //

module.exports = uint32ToInt32;

},{"./uint32_to_int32.js":86}],86:[function(require,module,exports){
'use strict';

// MAIN //

/**
* Converts an unsigned 32-bit integer to a signed 32-bit integer.
*
* @param {uinteger32} x - unsigned 32-bit integer
* @returns {integer32} signed 32-bit integer
*
* @example
* var float64ToUint32 = require( '@stdlib/math/base/utils/float64-to-uint32' );
* var y = uint32ToInt32( float64ToUint32( 4294967295 ) );
* // returns -1
*
* @example
* var float64ToUint32 = require( '@stdlib/math/base/utils/float64-to-uint32' );
* var y = uint32ToInt32( float64ToUint32( 3 ) );
* // returns 3
*/
function uint32ToInt32( x ) {
	// NOTE: we could also use typed-arrays to achieve the same end.
	return x|0; // asm type annotation
} // end FUNCTION uint32ToInt32()


// EXPORTS //

module.exports = uint32ToInt32;

},{}],87:[function(require,module,exports){
'use strict';

/**
* Difference between one and the smallest value greater than one that can be represented as a double-precision floating-point number.
*
* @module @stdlib/math/constants/float64-eps
* @type {number}
*
* @example
* var FLOAT64_EPSILON = require( '@stdlib/math/constants/float64-eps' );
* // returns 2.220446049250313e-16
*/


// MAIN //

/**
* Difference between one and the smallest value greater than one that can be represented as a double-precision floating-point number is
*
* ``` tex
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

},{}],88:[function(require,module,exports){
'use strict';

/**
* The bias of a double-precision floating-point number's exponent.
*
* @module @stdlib/math/constants/float64-exponent-bias
* @type {integer32}
*
* @example
* var FLOAT64_EXPONENT_BIAS = require( '@stdlib/math/constants/float64-exponent-bias' );
* // returns 1023
*/


// MAIN //

/**
* The bias of a double-precision floating-point number's exponent. The bias can be computed via
*
* ``` tex
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

},{}],89:[function(require,module,exports){
'use strict';

/**
* High word mask for the exponent of a double-precision floating-point number.
*
* @module @stdlib/math/constants/float64-high-word-exponent-mask
* @type {uinteger32}
*
* @example
* var FLOAT64_HIGH_WORD_EXPONENT_MASK = require( '@stdlib/math/constants/float64-high-word-exponent-mask' );
* // returns 2146435072
*/


// MAIN //

/**
* The high word mask for the exponent of a double-precision floating-point number is an unsigned 32-bit integer with the value \\( 2146435072 \\), which corresponds to the bit sequence
*
* ``` binarystring
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

},{}],90:[function(require,module,exports){
'use strict';

/**
* Natural logarithm of `2`.
*
* @module @stdlib/math/constants/float64-ln-two
* @type {number}
*
* @example
* var LN2 = require( '@stdlib/math/constants/float64-ln-two' );
* // returns 0.6931471805599453
*/


// MAIN //

/**
* Natural logarithm of `2`.
*
* ``` tex
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

},{}],91:[function(require,module,exports){
'use strict';

/**
* The maximum biased base 2 exponent for a subnormal double-precision floating-point number.
*
* @module @stdlib/math/constants/float64-max-base2-exponent-subnormal
* @type {integer32}
*
* @example
* var FLOAT64_MAX_BASE2_EXPONENT_SUBNORMAL = require( '@stdlib/math/constants/float64-max-base2-exponent-subnormal' );
* // returns -1023
*/


// MAIN //

/**
* The maximum biased base 2 exponent for a subnormal double-precision floating-point number.
*
* ``` text
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

},{}],92:[function(require,module,exports){
'use strict';

/**
* The maximum biased base 2 exponent for a double-precision floating-point number.
*
* @module @stdlib/math/constants/float64-max-base2-exponent
* @type {integer32}
*
* @example
* var FLOAT64_MAX_BASE2_EXPONENT = require( '@stdlib/math/constants/float64-max-base2-exponent' );
* // returns 1023
*/


// MAIN //

/**
* The maximum biased base 2 exponent for a double-precision floating-point number.
*
* ``` text
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

},{}],93:[function(require,module,exports){
'use strict';

/**
* Maximum safe double-precision floating-point integer.
*
* @module @stdlib/math/constants/float64-max-safe-integer
* @type {number}
*
* @example
* var FLOAT64_MAX_SAFE_INTEGER = require( '@stdlib/math/constants/float64-max-safe-integer' );
* // returns 9007199254740991
*/


// MAIN //

/**
* The maximum safe double-precision floating-point integer is given by
*
* ``` tex
* 2^{53} - 1
* ```
*
* @constant
* @type {number}
* @default 9007199254740991
* @see [Safe Integers]{@link http://www.2ality.com/2013/10/safe-integers.html}
* @see [IEEE 754]{@link https://en.wikipedia.org/wiki/IEEE_754-1985}
*/
var FLOAT64_MAX_SAFE_INTEGER = 9007199254740991;


// EXPORTS //

module.exports = FLOAT64_MAX_SAFE_INTEGER;

},{}],94:[function(require,module,exports){
'use strict';

/**
* The minimum biased base 2 exponent for a subnormal double-precision floating-point number.
*
* @module @stdlib/math/constants/float64-min-base2-exponent-subnormal
* @type {integer32}
*
* @example
* var FLOAT64_MIN_BASE2_EXPONENT_SUBNORMAL = require( '@stdlib/math/constants/float64-min-base2-exponent-subnormal' );
* // returns -1074
*/


// MAIN //

/**
* The minimum biased base 2 exponent for a subnormal double-precision floating-point number.
*
* ``` text
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

},{}],95:[function(require,module,exports){
'use strict';

/**
* Double-precision floating-point negative infinity.
*
* @module @stdlib/math/constants/float64-ninf
* @type {number}
*
* @example
* var FLOAT64_NINF = require( '@stdlib/math/constants/float64-ninf' );
* // returns Number.NEGATIVE_INFINITY
*/


// MAIN //

/**
* Double-precision floating-point negative infinity has the bit sequence
*
* ``` binarystring
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

},{}],96:[function(require,module,exports){
'use strict';

/**
* The mathematical constant `π`.
*
* @module @stdlib/math/constants/float64-pi
* @type {number}
*
* @example
* var PI = require( '@stdlib/math/constants/float64-pi' );
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

},{}],97:[function(require,module,exports){
'use strict';

/**
* Double-precision floating-point positive infinity.
*
* @module @stdlib/math/constants/float64-pinf
* @type {number}
*
* @example
* var FLOAT64_PINF = require( '@stdlib/math/constants/float64-pinf' );
* // returns Number.POSITIVE_INFINITY
*/


// MAIN //

/**
* Double-precision floating-point positive infinity has the bit sequence
*
* ``` binarystring
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

},{}],98:[function(require,module,exports){
'use strict';

/**
* Smallest positive double-precision floating-point normal number.
*
* @module @stdlib/math/constants/float64-smallest-normal
* @type {number}
*
* @example
* var FLOAT64_SMALLEST_NORMAL = require( '@stdlib/math/constants/float64-smallest-normal' );
* // returns 2.2250738585072014e-308
*/


// MAIN //

/**
* The smallest positive double-precision floating-point normal number has the value
*
* ``` tex
* \frac{1}{2^{1023-1}}
* ```
*
* which corresponds to the bit sequence
*
* ``` binarystring
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

},{}],99:[function(require,module,exports){
'use strict';

/**
* Maximum unsigned 32-bit integer.
*
* @module @stdlib/math/constants/uint32-max
* @type {uinteger32}
*
* @example
* var UINT32_MAX = require( '@stdlib/math/constants/uint32-max' );
* // returns 4294967295
*/


// MAIN //

/**
* The maximum unsigned 32-bit integer is given by
*
* ``` tex
* 2^{32} - 1
* ```
*
* which corresponds to the bit sequence
*
* ``` binarystring
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

},{}],100:[function(require,module,exports){
'use strict';

// MODULES //

var ceil = require( '@stdlib/math/base/special/ceil' );
var isNumber = require( '@stdlib/assert/is-number' ).isPrimitive;
var isnan = require( '@stdlib/math/base/assert/is-nan' );
var MAX_LENGTH = require( '@stdlib/math/constants/uint32-max' );


// MAIN //

/**
* Generates a linearly spaced numeric array using a provided increment.
*
* @param {number} x1 - first array value
* @param {number} x2 - array element bound
* @param {number} [increment=1] - increment
* @throws {TypeError} first argument must be numeric
* @throws {TypeError} second argument must be numeric
* @throws {TypeError} third argument must be numeric
* @throws {RangeError} length of created array must be less than `4294967295` (`2**32 - 1`)
* @returns {Array} linearly spaced numeric array
*
* @example
* var arr = incrspace( 0, 11, 2 );
* // returns [ 0, 2, 4, 6, 8, 10 ]
*/
function incrspace( x1, x2, increment ) {
	var arr;
	var len;
	var inc;
	var i;
	if ( !isNumber( x1 ) || isnan( x1 ) ) {
		throw new TypeError( 'invalid input argument. Start must be numeric. Value: `' + x1 + '`.' );
	}
	if ( !isNumber( x2 ) || isnan( x2 ) ) {
		throw new TypeError( 'invalid input argument. Stop must be numeric. Value: `' + x2 + '`.' );
	}
	if ( arguments.length < 3 ) {
		inc = 1;
	} else {
		inc = increment;
		if ( !isNumber( inc ) || isnan( inc ) ) {
			throw new TypeError( 'invalid input argument. Increment must be numeric. Value: `' + inc + '`.' );
		}
	}
	len = ceil( ( x2-x1 ) / inc );

	if ( len > MAX_LENGTH ) {
		throw new RangeError( 'invalid input arguments. Generated array exceeds maximum array length.' );
	}
	if ( len <= 1 ) {
		return [ x1 ];
	}
	if ( len > 64000 ) {
		// Ensure fast elements...
		arr = [];
		arr.push( x1 );
		for ( i = 1; i < len; i++ ) {
			arr.push( x1 + (inc*i) );
		}
	} else {
		arr = new Array( len );
		arr[ 0 ] = x1;
		for ( i = 1; i < len; i++ ) {
			arr[ i ] = x1 + (inc*i);
		}
	}
	return arr;
} // end FUNCTION incrspace()


// EXPORTS //

module.exports = incrspace;

},{"@stdlib/assert/is-number":7,"@stdlib/math/base/assert/is-nan":18,"@stdlib/math/base/special/ceil":25,"@stdlib/math/constants/uint32-max":99}],101:[function(require,module,exports){
'use strict';

/**
* Generate a linearly spaced numeric array using a provided increment.
*
* @module @stdlib/math/utils/incrspace
*
* @example
* var incrspace = require( '@stdlib/math/utils/incrspace' );
*
* var arr = incrspace( 0, 11, 2 );
* // returns [ 0, 2, 4, 6, 8, 10 ]
*/

// MODULES //

var incrspace = require( './incrspace.js' );


// EXPORTS //

module.exports = incrspace;

},{"./incrspace.js":100}],102:[function(require,module,exports){
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
} // end FUNCTION setReadOnly()


// EXPORTS //

module.exports = setReadOnly;

},{}],103:[function(require,module,exports){
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

},{"./define_read_only_property.js":102}],104:[function(require,module,exports){
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
} // end FUNCTION hasSymbolSupport()


// EXPORTS //

module.exports = hasSymbolSupport;

},{}],105:[function(require,module,exports){
'use strict';

/**
* Tests for native `Symbol` support.
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

},{"./detect_symbol_support.js":104}],106:[function(require,module,exports){
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
} // end FUNCTION hasToStringTagSupport()


// EXPORTS //

module.exports = hasToStringTagSupport;

},{"@stdlib/utils/detect-symbol-support":105}],107:[function(require,module,exports){
'use strict';

/**
* Tests for native `toStringTag` support.
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

},{"./has_tostringtag_support.js":106}],108:[function(require,module,exports){
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

var hasToStringTag = require( '@stdlib/utils/detect-tostringtag-support' )();


// MAIN //

var nativeClass;
if ( hasToStringTag ) {
	nativeClass = require( './polyfill.js' );
} else {
	nativeClass = require( './native_class.js' );
}


// EXPORTS //

module.exports = nativeClass;

},{"./native_class.js":109,"./polyfill.js":110,"@stdlib/utils/detect-tostringtag-support":107}],109:[function(require,module,exports){
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
} // end FUNCTION nativeClass()


// EXPORTS //

module.exports = nativeClass;

},{"./tostring.js":111}],110:[function(require,module,exports){
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
} // end FUNCTION nativeClass()


// EXPORTS //

module.exports = nativeClass;

},{"./tostring.js":111,"./tostringtag.js":112,"@stdlib/assert/has-own-property":2}],111:[function(require,module,exports){
'use strict';

// EXPORTS //

module.exports = Object.prototype.toString; // eslint-disable-line no-redeclare

},{}],112:[function(require,module,exports){
'use strict';

// EXPORTS //

module.exports = ( typeof Symbol === 'function' ) ? Symbol.toStringTag : '';

},{}],113:[function(require,module,exports){
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

},{}],114:[function(require,module,exports){

},{}],115:[function(require,module,exports){
arguments[4][114][0].apply(exports,arguments)
},{"dup":114}],116:[function(require,module,exports){
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

},{}],117:[function(require,module,exports){
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
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

},{"base64-js":113,"ieee754":136}],118:[function(require,module,exports){
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
},{"../../is-buffer/index.js":138}],119:[function(require,module,exports){
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

},{"./lib/is_arguments.js":120,"./lib/keys.js":121}],120:[function(require,module,exports){
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

},{}],121:[function(require,module,exports){
exports = module.exports = typeof Object.keys === 'function'
  ? Object.keys : shim;

exports.shim = shim;
function shim (obj) {
  var keys = [];
  for (var key in obj) keys.push(key);
  return keys;
}

},{}],122:[function(require,module,exports){
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

},{"foreach":132,"object-keys":141}],123:[function(require,module,exports){
module.exports = function () {
    for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] !== undefined) return arguments[i];
    }
};

},{}],124:[function(require,module,exports){
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

},{"./helpers/isFinite":125,"./helpers/isNaN":126,"./helpers/mod":127,"./helpers/sign":128,"es-to-primitive/es5":129,"has":135,"is-callable":139}],125:[function(require,module,exports){
var $isNaN = Number.isNaN || function (a) { return a !== a; };

module.exports = Number.isFinite || function (x) { return typeof x === 'number' && !$isNaN(x) && x !== Infinity && x !== -Infinity; };

},{}],126:[function(require,module,exports){
module.exports = Number.isNaN || function isNaN(a) {
	return a !== a;
};

},{}],127:[function(require,module,exports){
module.exports = function mod(number, modulo) {
	var remain = number % modulo;
	return Math.floor(remain >= 0 ? remain : remain + modulo);
};

},{}],128:[function(require,module,exports){
module.exports = function sign(number) {
	return number >= 0 ? 1 : -1;
};

},{}],129:[function(require,module,exports){
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

},{"./helpers/isPrimitive":130,"is-callable":139}],130:[function(require,module,exports){
module.exports = function isPrimitive(value) {
	return value === null || (typeof value !== 'function' && typeof value !== 'object');
};

},{}],131:[function(require,module,exports){
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

},{}],132:[function(require,module,exports){

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


},{}],133:[function(require,module,exports){
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

},{}],134:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

module.exports = Function.prototype.bind || implementation;

},{"./implementation":133}],135:[function(require,module,exports){
var bind = require('function-bind');

module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);

},{"function-bind":134}],136:[function(require,module,exports){
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

},{}],137:[function(require,module,exports){
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

},{}],138:[function(require,module,exports){
/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
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

},{}],139:[function(require,module,exports){
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

},{}],140:[function(require,module,exports){
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

},{}],141:[function(require,module,exports){
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

},{"./isArguments":142}],142:[function(require,module,exports){
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

},{}],143:[function(require,module,exports){
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
},{"_process":116}],144:[function(require,module,exports){
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
},{"_process":116}],145:[function(require,module,exports){
module.exports = require('./lib/_stream_duplex.js');

},{"./lib/_stream_duplex.js":146}],146:[function(require,module,exports){
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
},{"./_stream_readable":148,"./_stream_writable":150,"core-util-is":118,"inherits":137,"process-nextick-args":144}],147:[function(require,module,exports){
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
},{"./_stream_transform":149,"core-util-is":118,"inherits":137}],148:[function(require,module,exports){
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
},{"./_stream_duplex":146,"./internal/streams/BufferList":151,"./internal/streams/destroy":152,"./internal/streams/stream":153,"_process":116,"core-util-is":118,"events":131,"inherits":137,"isarray":154,"process-nextick-args":144,"safe-buffer":161,"string_decoder/":155,"util":114}],149:[function(require,module,exports){
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
},{"./_stream_duplex":146,"core-util-is":118,"inherits":137}],150:[function(require,module,exports){
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
},{"./_stream_duplex":146,"./internal/streams/destroy":152,"./internal/streams/stream":153,"_process":116,"core-util-is":118,"inherits":137,"process-nextick-args":144,"safe-buffer":161,"util-deprecate":173}],151:[function(require,module,exports){
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
},{"safe-buffer":161}],152:[function(require,module,exports){
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
},{"process-nextick-args":144}],153:[function(require,module,exports){
module.exports = require('events').EventEmitter;

},{"events":131}],154:[function(require,module,exports){
var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};

},{}],155:[function(require,module,exports){
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
},{"safe-buffer":161}],156:[function(require,module,exports){
module.exports = require('./readable').PassThrough

},{"./readable":157}],157:[function(require,module,exports){
exports = module.exports = require('./lib/_stream_readable.js');
exports.Stream = exports;
exports.Readable = exports;
exports.Writable = require('./lib/_stream_writable.js');
exports.Duplex = require('./lib/_stream_duplex.js');
exports.Transform = require('./lib/_stream_transform.js');
exports.PassThrough = require('./lib/_stream_passthrough.js');

},{"./lib/_stream_duplex.js":146,"./lib/_stream_passthrough.js":147,"./lib/_stream_readable.js":148,"./lib/_stream_transform.js":149,"./lib/_stream_writable.js":150}],158:[function(require,module,exports){
module.exports = require('./readable').Transform

},{"./readable":157}],159:[function(require,module,exports){
module.exports = require('./lib/_stream_writable.js');

},{"./lib/_stream_writable.js":150}],160:[function(require,module,exports){
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
},{"_process":116,"through":172}],161:[function(require,module,exports){
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

},{"buffer":117}],162:[function(require,module,exports){
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

},{"events":131,"inherits":137,"readable-stream/duplex.js":145,"readable-stream/passthrough.js":156,"readable-stream/readable.js":157,"readable-stream/transform.js":158,"readable-stream/writable.js":159}],163:[function(require,module,exports){
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

},{"es-abstract/es5":124,"function-bind":134}],164:[function(require,module,exports){
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

},{"./implementation":163,"./polyfill":165,"./shim":166,"define-properties":122,"function-bind":134}],165:[function(require,module,exports){
'use strict';

var implementation = require('./implementation');

var zeroWidthSpace = '\u200b';

module.exports = function getPolyfill() {
	if (String.prototype.trim && zeroWidthSpace.trim() === zeroWidthSpace) {
		return String.prototype.trim;
	}
	return implementation;
};

},{"./implementation":163}],166:[function(require,module,exports){
'use strict';

var define = require('define-properties');
var getPolyfill = require('./polyfill');

module.exports = function shimStringTrim() {
	var polyfill = getPolyfill();
	define(String.prototype, { trim: polyfill }, { trim: function () { return String.prototype.trim !== polyfill; } });
	return polyfill;
};

},{"./polyfill":165,"define-properties":122}],167:[function(require,module,exports){
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
},{"./lib/default_stream":168,"./lib/results":170,"./lib/test":171,"_process":116,"defined":123,"through":172}],168:[function(require,module,exports){
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
},{"_process":116,"fs":115,"through":172}],169:[function(require,module,exports){
(function (process){
module.exports = typeof setImmediate !== 'undefined'
    ? setImmediate
    : process.nextTick
;

}).call(this,require('_process'))
},{"_process":116}],170:[function(require,module,exports){
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
},{"_process":116,"events":131,"function-bind":134,"has":135,"inherits":137,"object-inspect":140,"resumer":160,"through":172}],171:[function(require,module,exports){
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
},{"./next_tick":169,"deep-equal":119,"defined":123,"events":131,"has":135,"inherits":137,"path":143,"string.prototype.trim":164}],172:[function(require,module,exports){
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
},{"_process":116,"stream":162}],173:[function(require,module,exports){
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
},{}]},{},[34]);
